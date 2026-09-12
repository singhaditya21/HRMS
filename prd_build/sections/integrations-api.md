## 16. Integrations & External Interfaces

This section specifies **every external system the product talks to**, and — because in
this market most of those systems are hostile, undocumented, or have no API at all — it
specifies the *fallback* for each one with the same weight as the happy path. That is the
governing design stance of the whole section:

> **In an Indian statutory HRMS, the integration is judged by its fallback, not its API.**
> The government portals that carry the unit of delivery (§01 — the filing, not the
> payslip) offer no submission API we are aware of, so every statutory submission is an
> attended portal session (K-13); the two incumbents (§21 — Tally for accounting and the
> statutory artefacts, greytHR for the HRMS job; K-23) are file-import sources, not live
> connections; and the device fleet (§09) speaks an undocumented, reverse-engineered
> protocol (port 4370) on the long tail (r2/04). A design that assumes clean APIs
> everywhere ships a demo, not a product. Every integration below therefore carries a
> **contract, a data-exchange spec, an enumerated failure taxonomy, and a fallback that
> keeps the filing on time when the primary path is down.**

Three framing rules from earlier in this PRD govern this section and are not restated per-integration:

- **The filing is the unit of delivery (§01, [Verified]).** An integration is "working"
  only when the artefact it feeds — an ECR that reaches FILED, a settled bank batch, a
  filed Form 138 — completes (FR-PAY-711). A green API call that does not produce a
  filing that reaches FILED is a red status here.
- **Rules-first, LLM-last (§12.1 P1, [Verified]).** No integration may allow a model to
  generate a statutory or monetary figure that crosses a system boundary. The assistant
  may draft an email to a bank RM or explain a portal rejection; it never computes the
  amount on a challan or a NEFT line. Every outbound file is produced by the deterministic
  engine (§08) and reconciled to the rupee before it leaves the system.
- **Own the data and the tools, not the assistant (§12.7, [Verified]).** The
  public API and MCP posture (§16.11) are built so that when an enterprise buyer's
  assistant (Microsoft Copilot, Glean, or another vendor's assistant) wants our data, we are the
  governed source of tools it calls — not a competitor for the chat surface.

<!-- DIAGRAM: integrations-api-topology -->

---

### 16.1 Integration taxonomy and posture

Not all integrations are the same kind of thing, and conflating them is the most common
architectural error in this category. We classify every external interface on four axes,
because the axis determines the engineering, the SLA, and the fallback.

| Axis | Values | Why it matters |
| --- | --- | --- |
| **Direction** | Inbound (we ingest) · Outbound (we emit) · Bidirectional | Determines who owns the schema and who breaks whom on a change |
| **Transport** | Live API (REST/SOAP) · File exchange (upload/download) · Device push (ADMS) · Attended portal session (no API; a named human present, optionally automation-assisted) · Manual/human-in-loop | Determines reliability, monitorability, and legal exposure |
| **Cadence** | Real-time · Event/webhook · Scheduled batch · One-time (migration) | Determines idempotency and retry design |
| **Criticality to the filing** | On the filing path (blocks a return) · On the pay path (blocks disbursement) · Convenience | Determines on-call priority and the fallback investment |

Applying the taxonomy to the full integration surface. This is the master register; each
row is detailed in the subsection named.

| # | Integration | Direction | Transport | Cadence | Filing-critical? | Phase | Detail |
| --- | --- | --- | --- | --- | --- | --- | --- |
| A | **Tally** (accounting + migration) | Bi | File (XML/CSV) or local connector | Batch + one-time | Pay path (GL) | GL journal export: **P1, R2**, first in the integration queue (§05.17 PR-13). Import: **P1**, first named-source importer (§05.5 item 17) | §16.2 |
| B | **Banks — salary disbursement** | Out | File (the floor) + aggregator API / connected banking (the upsell) | Batch | Pay path | File, separate-approver release and credit reconciliation: **P0, R1** (§05.5 item 33; C-22; §05.17 PR-01). Aggregator payout API: **P1**. Connected banking: a BD track | §16.3 |
| C | **Biometric / attendance devices** | In | Device push (ADMS) + SDK pull | Real-time + batch | Pay path (LOP) | Push receiver: **P0, R1** (§05.5 item 11; C-24). Pull path via connectors: **P1** | §16.4 |
| D | **EPFO** (ECR return; challan reconciliation; UAN and KYC status) | Out | File + attended portal session | Batch (monthly) | **Filing path** | ECR Regular, Supplementary and Revised, submitted in Mode A or B: **P0, R1** (A-01 to A-04; C-09, C-10, C-21). Part-payment file: R2 (A-05). Arrear return: fenced (A-06). Operator-attended submission: R2, fenced on counsel (A-23) | §16.5 |
| E | **ESIC** (contribution, IP) | Out | Template + attended portal session | Batch (monthly) | **Filing path** | Computation: **P0, R1** (A-07; C-11). Upload file: **P0, R1** only if the template capture (F-05) finishes before the gate, otherwise R2 by rule (A-08; C-12). Post-lapse periods: fenced (A-09) | §16.5 |
| F | **Income-tax portal / TRACES** (Form 138 ex-24Q; Form 130 ex-16 is TRACES-generated) | Out | Statement file; deductor runs FVU and uploads in an attended session | Batch (quarterly/annual) | **Filing path** | Q1–Q3 regular and correction generation: **P0, R1** (A-11, A-12; C-14), correction *submission* held while F-02 is open. Form 130 distribution: **P0, R1** (A-14; C-15). Q4 and Tax Year 2026-27 Form 130: fenced, R3 (A-13; EV-046) | §16.5 |
| G | **State PT portals** (per-state) | Out | File + attended portal session, one portal per state | Batch (per-state cadence, §06.4) | **Filing path** | Computation for each state whose row is state-primary-sourced — Maharashtra at R1 entry: **P0, R1** (A-15; C-16). Every return leg, Maharashtra's included: fenced per state, R2 (A-15, A-16) | §16.5 |
| H | **State LWF portals** | Out | File + attended portal session | Batch (per-state periodicity, parameter `lwf.<state>.periodicity`, §06.8) | Filing path | The per-state machinery is built under §05.5 item 7 so a published state pack switches it on without a deploy; **no state's remittance ships in R1** — R2 per state as F-07 ships (A-17; §05.17 PR-03) | §16.5 |
| I | **Accounting systems** (Zoho Books, Busy, ERP GL) | Out | API + file | Batch | Pay path (GL) | P1 | §16.6 |
| J | **HRIS migration importers** (Excel/CSV; Zoho/Kredily/Frappe/greytHR) | In | File + API | One-time | Onboarding | Excel/CSV import with the YTD tie-out and parallel-run month: **P0, R1** (§05.5 item 32; C-05). Named-source importers: **P1** (§05.5 item 17) | §16.7 |
| K | **Recruiting / job boards** (Naukri, LinkedIn, foundit, apna, Indeed) | Bi | API + posting | Event | Convenience | P1 | §16.8 |
| L | **Communication** (WhatsApp, email, SMS-DLT, e-sign) | Out | API | Real-time/event | Pay path (payslip delivery) | Email and DLT-SMS: R1 as infrastructure under C-31, not a separate capability (§05.17 PR-14). WhatsApp and e-sign: **P1** | §16.9 |
| M | **Identity / SSO / SCIM** | Bi | OIDC/SAML/SCIM | Real-time | Convenience | P2 (§05.5 item 24; FR-CHR-092) | §16.10 |
| N | **Public API + webhooks + MCP** | Bi | REST + MCP | All | Platform | REST API and webhooks: **P1**. External MCP server: **P3** (§05.5 item 30). Per-tenant and per-user rate limits: **P0**, under §05.5 item 13 | §16.11 |

Every cell above carries one bare priority per leg, and "P0" appears only on legs that are
on §05.17's closed R1 list; a fenced leg carries its fence and release instead (§05.17
lint L1, L2, L5). Where this register and §05.17 ever disagree, §05.17 wins and this table
is relabelled.

Two posture decisions apply across the whole register:

**[Verified]** — **No statutory surface offers a submission API we are aware of (as of
September 2026); every one is an attended portal, and that is the base case, not the
exception** (K-13). EPFO requires an interactive employer login with a CAPTCHA, then
upload → validate → return statement → approve/reject → Due Deposit Balance Summary →
challan with TRRN → pay → receipt (EV-036; r3/05). For TDS the product produces the
statement `.txt`; the *deductor* runs Protean's File Validation Utility against it with
the `.csi` challan file and uploads the output on the income-tax portal (EV-051, EV-052;
r3/05). ESIC is a template upload on its portal (the template is described by
practitioners and not yet confirmed from ESIC, §16.5.2); state PT is one manual portal
per state (r3/05). The deliverable is therefore **a portal-accepted artefact plus attended,
assisted filing under written authority to act**: **(1) generate the artefact** +
**(2) submit it in an attended session — by the employer, or by our operator under the
employer's written authority (§22)** + **(3) capture and reconcile the acknowledgement and
receipt**. §22 FR-OPS-001 owns the four delivery modes — A employer-attended, B
co-attended, C operator-attended, D CA-attended — and this section uses its letters. In
every mode the **statutory payment leg and any DSC-bound act stay with the employer**: for
no statutory portal act do we hold a bank credential, an OTP-generating factor or a
Digital Signature Certificate (§22; §08 FR-PAY-301 M10). The employer's and deductor's
statutory liability is **non-delegable** and stays with the customer. No vendor in the
six-vendor set claims to submit any filing (EV-030), so attended submission is a
differentiator, not a gap to hide. Whether and how we may act
on these portals under employer credentials is under counsel review (Part D-17, §23), and
operator-attended submission is itself a fenced artefact: until counsel clears the four
attended-filing questions plus liability allocation (§20 V-25), every artefact ships
portal-ready and the employer submits it in Mode A or B (§05.7 A-23, R2 on clearance).
A roadmap that promises "one-click government filing via API" promises something we are
not aware exists: CBDT's Form 138 guidance note speaks of "integration with APIs &
Databases" and the income-tax portal lists "API Specifications" for e-Return
Intermediaries, but neither is evidence that a TDS statement can be filed by API (r5/02;
r3/05) — both are watcher items, not capabilities.

**[Verified]** — **Schema-driven, never hard-coded.** Every file format below — ECR text,
the ESI contribution template, the Form 138 statement (a breaking layout change, EV-051),
each bank's salary template, each state's PT return — is a **versioned schema object**, not
code. Field numbers, column orders and delimiters change by gazette and by bank release.
Form 138 alone remapped challan sub-headings 301–312 → A–K (303 removed) and Annexure I
313–327 → C–N (313, 321, 322 and 325 removed), with the Q4 regular and correction formats
still unpublished (EV-051, EV-046; Source: Protean "Key Features — RPU and FVU version
1.2"; Q1–Q3 regular format published 22 Jul 2026, labelled "Version 1.2" on Protean's page
while the workbook itself says "Version 1.1" — versions are pinned to the downloaded
artefact, r5/02). A hard-coded layout is a guaranteed production incident on the next
notification.

**The schema object, concretely.** Every file-schema integration is described by a
declarative record the runtime interprets — never by branching code:

| Schema-object field | Example (EPFO ECR return file) |
| --- | --- |
| `schema_id` / `version` | `epfo.ecr.return` / internal version, pinned to the source artefact it was built from |
| `effective_from` / `effective_to` | wage month `2025-09` (the revamped ECR applies from it; the file layout did not change, EV-035) / `null` (open) |
| `source_ref` | EPFO User Manual ReECR v3.0 p.8 (Help File) and circular Compliance/ECR Revamp/2025/12997 of 26.09.2025, linked from www.epfo.gov.in/revamped-ecr/ and served from pmvbry.epfindia.gov.in (the URLs printed in the circular itself are dead, r5/02) — URL + capture date (EV-035, EV-045) |
| `delimiter` / `header_row` | `#~#` — **three** characters, 10 per line / `false` — no header row (EV-035) |
| `line_terminator` / `encoding` | not stated in EPFO's published material — named parameters `ecr.line_terminator` and `ecr.encoding`, captured from a portal-accepted upload and routed to §20 V-23 |
| `packaging` | no filename pattern is mandated (EV-035); letters and digits only in the filename, lower-case `.txt`, at most 8 MB per upload, compress with zip above 2 MB, and a zip may contain only the one text file (EPFO User Manual ReECR v3.0 p.7, r5/02 finding 5) |
| `columns[]` (ordinal, name, type, rule) | 11 columns, ordered (see §16.5.1) |
| `portal_controls[]` | Wage Month, Return Type, Contribution Rate, Remark — entered in the portal's form, **never** written into the file (EV-035) |
| `validators[]` | EPFO's own checks at EPFO's own severity — age-58 EPS **block**; post-01.09.2014 high-earner EPS **flag**; date-of-joining to date-of-leaving window; rate at or above statutory (EV-040); arithmetic ties (employer EPS at most ₹1,250) |
| `blocked` (bool) + `blocked_reason` | `false` (contrast Q4 Form 138 = `true`, EV-046; ECR arrear return = `true`, EV-043) |

A gazette change edits the schema object's data and mints a new `version` with a new
`effective_from`; the prior version stays live for in-flight (arrear/retro) periods, and
every artefact routes by its **period**, never by today's date (EV-052).
This is the same effective-dating discipline the wage engine uses for the 50% add-back
(§06.10, "or such other per cent as may be notified" — [Verified]).

#### 16.1.1 The integration register as a governed object

The master table above is a reading aid. The build artefact behind it is a **register row
per integration leg** — not per vendor, because one vendor can be two legs with different
risk (Tally is an import leg and an export leg; a payout provider is an initiation leg and
a status leg). The register is maintained the way §22's rule objects are maintained: data
with an owner, a provenance and a review state, never a wiki page.

| Register field | Meaning | Why it is a field and not prose |
| --- | --- | --- |
| `leg_id` | `<integration>.<direction>.<purpose>`, e.g. `epfo.out.ecr_return`, `bank.out.salary_file`, `device.in.punch` | Every error code, metric and runbook step keys on this, so it must be stable and enumerable |
| `mechanism` | Live API · file exchange · device push · attended portal session · manual | Determines the reliability design and the legal posture (K-13) |
| `auth_model` | What authenticates us, and to whom | The rails differ irreconcilably: HTTP Basic plus a required idempotency header for RazorpayX, client-id and client-secret with an RSA-signature alternative for Cashfree, OAuth 2.0 bearer for Zoho Books, a per-device secret for a terminal, and an interactive human login with a CAPTCHA for EPFO (r3/05) |
| `credential_holder` | Us · the tenant · neither | The only value permitted for a statutory payment leg or a DSC-bound act is **the tenant** (§16.1; §22) |
| `onboarding` | Self-serve · gated on a third party | The single most predictive field for schedule risk (r3/05) |
| `gate_holder` | Named party that controls entry when `onboarding` is gated | Without a name, "partner onboarding" is not a plan |
| `expiry_behaviour` | Session or token lifetime, re-authentication trigger, lockout rule | A monthly-cadence product with a 30-day-expiring bank connection fails on payday unless expiry is managed ahead of time (r3/05, finding 2) |
| `rotation` | How the secret rotates and whether an overlap window exists | Device secrets rotate without re-enrolling users (§09 FR-DEV-008 AC6); portal passwords rotate under §22's vault policy |
| `filing_or_pay_path` | Filing path · pay path · convenience | Sets on-call priority and the fallback investment |
| `fallback_leg_id` | The leg that carries the job when this one is unavailable | IG1 is only testable if the fallback is named, not assumed |
| `schema_refs[]` | Schema objects this leg emits or consumes, by `schema_id` and version | Makes a gazette or bank-release change a bounded change |
| `error_codes[]` | The canonical codes this leg can raise (§16.12.1) | An unnamed failure is an unhandled failure |
| `subprocessor` | Whether the counterparty is a sub-processor, and its DPA state | Wired to the sub-processor gate (§12.8, Part E-7); silently adding one can put a regulated tenant in breach (EV-087) |
| `data_classes_sent[]` | The allowed-field allowlist for this leg | Enforces minimisation structurally rather than by convention (§16.12) |
| `owner` | Named engineer, and a named BD owner where `onboarding` is gated | A gated leg without a BD owner never ships |
| `evidence_status` | Verified · documentation read · unverified · blocked, with capture date | Mirrors the PRD's own marker discipline (Part A-1) |

**The third-party gate register.** Every leg whose `onboarding` is `gated` inherits a date
we do not control. This table is the whole set as of September 2026, and it is the
gate on committing any of them to a release date.

| Gated leg | Gate holder | What the gate is | Evidence | What may be promised |
| --- | --- | --- | --- | --- |
| `bank.out.connected_banking` | Each bank | The employer must already hold a corporate current account at that bank and complete document verification through its relationship manager, which ICICI may charge a processing fee for, then approve activation inside the bank portal; Tally's equivalent is gated on its own partner programme and an active subscription (r3/05, findings 1 and 5) | Documentation read, Sep 2026 | Nothing dated. A BD track with a named owner (§16.13 P1) |
| `bank.out.payout_api` | The aggregator | RazorpayX requires a current account at a named partner bank and KYC activation, and live-key generation itself requires an OTP; Cashfree requires either an IPv4 allowlist capped at 25 addresses or a single RSA public key (r3/05, findings 8, 9 and 12) | Documentation read, Sep 2026 | A date, once the tenant qualifies — the gate is on the *tenant*, not on us, for Cashfree; on the tenant's bank for RazorpayX |
| `comm.out.whatsapp` | Meta and the BSP | WABA creation, template approval, and INR billing migration by 31 December 2026 or Meta stops delivering the messages of non-INR WABAs from 1 January 2027 (EV-088; r3/05, finding 33) | [Verified] | A date for the migration, because it is ours to do. No date for template approval |
| `idp.in.scim_listing` | Microsoft and Okta | Entra gallery listing and Okta Integration Network publication are third-party review gates; schema discovery is available only to gallery applications (r3/05, findings 19 and 20) | Documentation read, Sep 2026 | The SCIM server itself is self-serve and datable. The listings are not |
| `recruit.out.linkedin` | LinkedIn | Restricted to approved developers under a signed API agreement; Recruiter System Connect requires the Job Posting API first and a customer-held Recruiter Corporate or RPS licence (r2/08) | Documentation read, Apr 2026 page date | Nothing dated until the partner review completes |
| `epfo.out.ecr_return`, `esic.out.contribution`, `tds.out.form138`, `pt.*`, `lwf.*` — **operator-attended** | Counsel, then each portal's terms | The four attended-filing questions plus liability allocation (Part D-17, §20 V-25) | Open | Mode A and Mode B ship without the gate. Mode C carries a fence, not a date (§05.7 A-23) |
| `esic.out.contribution` — **file leg** | ESIC | The contribution template itself 404s and its column list is unconfirmed from an ESIC source (r3/05, finding 31); the capture is §20 V-23 | Unverified | R1 only if the capture lands before the gate, else R2 by rule (§05.17) |
| `tds.out.form138` — **Q4 leg** | CBDT and Protean | The Q4 regular and correction formats are unreleased (EV-046) | [Verified — negative] | BLOCKED, with the escalation date as `form138_q4_escalation_date` (§20 R-4) |
| `pt.<state>.*`, `lwf.<state>.*` | Each state | No state's return or remittance field list is captured, Maharashtra's included (§06.4, §06.8) | Unverified | Per-state, as each state pack publishes (§20 V-09) |

**Decision table — may this leg carry a committed date?** Applied at every release-planning
review. It is the mechanical form of §05.17's lint rules as they bear on integrations.

| # | `onboarding` | Open fence? | Counsel item open? | Schema captured? | Verdict |
| --- | --- | --- | --- | --- | --- |
| D1 | Self-serve | No | No | Yes | **Datable.** Normal estimate |
| D2 | Self-serve | No | No | No | **Not datable.** The capture task is datable, the leg is not — this is the ESIC file leg's exact shape |
| D3 | Self-serve | Yes | No | Either | **Not datable.** The leg carries its fence and its release, never a priority (§05.17 lint L2) |
| D4 | Gated | No | No | Yes | **Not datable.** A BD milestone is datable, the leg is not — the gate holder's queue is not ours |
| D5 | Either | Either | Yes | Either | **Not datable, and not buildable past the artefact.** Build the artefact, hold the act (Mode A or B stands in) |
| D6 | Gated | Yes | Yes | No | **Do not plan it at all this release.** Track it as a watcher item with a named owner |

**Acceptance criteria (register).** These extend the section's `AC-<domain>-<n>` scheme with
a new domain; numbering starts at 1 for the new domain, as for every other domain here.

- **AC-REG-1:** Every leg named anywhere in §16 exists as exactly one register row with all
  fields populated or explicitly marked unknown; a leg that appears in a roadmap, a release
  plan or sales collateral and not in the register is a lint failure, not an oversight.
- **AC-REG-2:** No release plan may contain a date for a leg whose register row resolves to
  D2–D6. The planning tool reads the register; the verdict is computed, not argued.
- **AC-REG-3:** Every leg whose `credential_holder` is `us` for a statutory payment or a
  DSC-bound act fails validation at commit time — the value is unrepresentable for those
  purposes, not merely discouraged (§16.1; §22).
- **AC-REG-4:** Adding or changing a `subprocessor` value triggers the sub-processor-change
  gate before the leg can be enabled for any tenant, and is refused outright for a tenant
  whose sectoral profile forbids it without consent (EV-085–087; §12.8).
- **AC-REG-5:** A leg with an `expiry_behaviour` shorter than the pay cycle raises a
  re-authentication prompt at a lead time set by `integration.reauth_lead_days` (owner: Eng;
  routed to §20) — the prompt fires before the cycle in which the connection would lapse,
  never on payday.

#### 16.1.2 Hostnames, transport and certificate policy at the boundary

A surprising share of Indian integration breakage is not protocol breakage — it is name
and certificate breakage, and it is live right now.

**[Verified, captured September 2026 — r3/05 findings 13, 26 and 30].** The Indian banking
`.bank.in` migration is **uneven**: `developer.hdfcbank.com` 301-redirects to
`developer.hdfc.bank.in` and `www.icicibank.com` 301-redirects to `www.icici.bank.in`, but
`www.kotak.com` redirects to its own `/en.html` and `www.sbi.co.in` to its own
`/redirect/` — *not* to `kotak.bank.in` or `sbi.bank.in`, both of which resolve and serve
independently. `apiportal.axisbank.com` presents a certificate whose subject is
`apiportal.axis.bank.in` with a valid chain. On the statutory side, EPFO's move from
`epfindia.gov.in` to `www.epfo.gov.in` took the entire legacy document tree with it
(EV-045), so printed manual URLs 404 — including the URLs printed inside EPFO's own
revamped-ECR circular, whose artefacts are served from a different host than the circular
names (r5/02). And `esic.gov.in` serves an **incomplete certificate chain**: a standard
verification returns "unable to verify the first certificate", which breaks conforming HTTP
clients while a verification-disabled fetch succeeds.

Four rules follow, and they are testable.

| # | Rule | Mechanism | Anti-pattern it forbids |
| --- | --- | --- | --- |
| N1 | **No hostname is a constant.** Every external host is a register field with a capture date, resolved at runtime, redirects followed and the final host logged | `leg.hostnames[]` in the §16.1.1 register | Hard-coding either the legacy or the `.bank.in` form, or assuming the migration is uniform |
| N2 | **No global verification disable, ever.** A host with a known-incomplete chain is handled by supplying the missing intermediate for that named host only, under a register entry with a reason, an owner and an expiry date | `leg.tls_exception` with `host`, `reason`, `owner`, `expires_on` | A blanket "skip certificate verification" flag, which is how one government host's misconfiguration becomes an interception risk on every host |
| N3 | **Capture the artefact, not the URL.** Every schema object stores the *file* it was built from alongside the URL and capture date, because the URL is the thing that rots | `schema.source_artefact` + `schema.source_ref` (§16.1) | Re-fetching a manual at filing time and finding a 404 — EPFO's exact failure mode (EV-045) |
| N4 | **A watcher hit on a moved or dead source is an incident, not a log line.** A source URL that stops resolving opens a worklist item against the owning schema | §16.12 watcher; §22 pipeline | Silent decay, where a schema's provenance quietly becomes unverifiable |

**Acceptance criteria (network and transport).**

- **AC-NET-1:** No hostname for any external system appears as a literal in application
  code; a build-time check fails the build on a literal host for any registered leg.
- **AC-NET-2:** Certificate verification is enabled on every outbound call. A named-host
  chain exception is visible in the register with its owner and expiry, and its expiry
  raises a worklist item; there is no configuration that disables verification globally.
- **AC-NET-3:** Every schema object can be rebuilt from a stored source artefact with no
  network access, and a schema whose stored artefact is missing cannot be published.
- **AC-NET-4:** A 301, a 404 or a chain failure on a registered source host opens an
  exception against the owning schema within one watcher cycle, naming the leg, the host and
  the last successful capture.

---

### 16.2 Tally — accounting export and the migration wedge

Tally is not a peer integration; it is one of **two incumbents with two jobs** — Tally owns
accounting and the statutory artefacts, greytHR owns the HRMS job (K-23, §21). It appears
twice here: as a **one-time migration source**, and as the **ongoing GL export target**
that lets the customer keep Tally as their book of record. **[Reversed]** An earlier
version of this section put the GL journal export in P0. §05.17 PR-13 rules it **P1,
R2**: it is neither a filing nor a payslip, and in R1 a design partner's accountant can
post the month's journal from the payroll register. It stays first in the integration
queue because Tally owns the accounting job (EV-032).

**[Hypothesis]** — **Tally import is the first migration importer (§05.5, item 17), not
because Tally has a good API but because Tally owns the accounting and statutory-artefact
job** (EV-032). How many beachhead firms run Tally *payroll* — as distinct from what it can
do — is unknown (K-23, §20 V-02). **[Reversed]** Earlier text called TallyPrime
"statutorily complete and ₹0-incremental" and concluded that a feature-parity pitch loses.
TallyPrime does ship PF Forms 3A/5/6A/10/12A + ECR, ESI 3/5/6, a PT statement, Form 16,
24Q annexures, 12BA, 27A, NPS and gratuity — but **no state PT slab table** (slabs are
hand-entered), **no LWF engine**, **no leave module**, no leave-encashment calculation,
manual attendance vouchers only, and multi-user access only at Gold, at 3× Silver's price
(EV-032). A search of five TDL add-on catalogues found **no** payroll, PT or LWF add-on
(EV-032). **[Killed]** — the "Payroll Plus ₹5,999" Tally add-on is not evidence of
anything: it is sold on a lookalike domain and cannot be used (K-20). The artefact list is
where we must match; the PT, LWF, leave and attendance gaps are where we win. We win by
making leaving Tally-for-payroll costless while letting the customer keep Tally-for-accounts.

| Facet | Specification |
| --- | --- |
| **Contract** | No live API dependency. TallyPrime's XML gateway is an HTTP server inside the TallyPrime process on port 9000 by default, enabled via F1 > Settings > Advanced Configuration — a LAN endpoint on the customer's machine that a cloud HRMS cannot reach without a local connector (r3/05). The envelope structure (ENVELOPE / HEADER / BODY / TALLYMESSAGE / VOUCHER) is published; only the payroll voucher and ledger payload needs a spike (r3/05). We treat Tally as a **file-and-XML boundary**, not a service. Two flows: (1) **import** — parse a customer's Tally export (masters + vouchers) during onboarding; (2) **export** — emit a payroll journal voucher Tally can import, as a file or through a local connector. |
| **Data exchange — import** | Ingest: ledger masters (employee ledgers, salary/PF/ESI/PT/TDS payable ledgers), cost centres/categories (often used as departments), opening balances, and — where the Tally Payroll module is enabled — pay heads, attendance/production types, and employee masters with PF/ESI/UAN numbers. Format: Tally XML export or CSV per ledger. |
| **Data exchange — export** | Emit a **payroll journal voucher** per pay run: debit salary/wages and employer-contribution expense heads, credit net-pay-payable, PF payable (EE+ER), ESI payable, PT payable, TDS payable, and any recovery ledgers. Delivered as Tally-importable XML with a stable ledger-mapping table the customer confirms once, then reuses. |
| **Failure modes** | (1) **Ledger-name mismatch** — customer's ledger names don't match our mapping → voucher import fails or posts to a suspense ledger. (2) **Duplicate voucher** on re-export → double-counted GL. (3) **Tally release drift** — XML dialect differences between Tally releases, captured by the voucher/ledger-schema spike rather than assumed (r3/05). (4) **Character/encoding** — special characters (`&`, non-ASCII) in employee names corrupt XML unless entity-escaped. (5) **Split company data** — customer runs multiple Tally companies; the request targets the wrong company. (6) **Financial-year boundary** — voucher dated in a year Tally hasn't opened is silently rejected. |
| **Fallback** | Every export is also downloadable as a **CSV/Excel journal** the customer's accountant can post by hand — the same reconciled totals, human-readable. Import failures never block a pay run or a filing; the GL post is downstream of disbursement. A **dry-run diff** shows the voucher before it is emitted. Idempotency: each voucher carries a deterministic `payrun_id` external key (in a voucher reference or narration field confirmed by the schema spike) so re-export updates rather than duplicates. |

**Worked example — the payroll journal voucher (50-employee run).** **[Reversed]** An
earlier version of this example did not balance (debits ₹44,71,100 against credits
₹45,71,100, with a stated total of ₹45,54,200) and its net pay was ₹1,00,000 above gross
less deductions; it is recomputed here. For a monthly run with gross ₹42,00,000 — all 50
members contributing to EPF at the ₹15,000 wage ceiling (EPF wages ₹7,50,000), eight
ESI-covered employees on ₹20,000 each (ESI wages ₹1,60,000), PT ₹200 for 49 employees and
TDS ₹61,700 (both illustrative) — the emitted voucher must balance to the rupee and tie to
§16.3 (rates per §06.2 and §06.3; the EPF admin-charge rate of 0.50% and the nil EDLI
admin charge are the values §06.2 carries as **[Hypothesis]**, and the admin-charge
minimum is the parameter `epf.admin_charge.minimum`, so the ₹7,500 line moves if either
does; the admin charge's wage basis is itself the unsettled parameter
`epf.admin_charge.wage_basis`, but both readings §06.2 names give ₹7,50,000 here, because
every member's EPF wages sit at the ceiling):

| Dr / Cr | Ledger (mapped) | Amount (₹) |
| --- | --- | --- |
| Dr | Salaries & Wages (expense) | 42,00,000 |
| Dr | Employer PF Contribution (expense) — 12% of ₹7,50,000 (EPS ₹62,500 + EPF ₹27,500) | 90,000 |
| Dr | Employer ESI Contribution (expense) — 3.25% of ₹1,60,000 | 5,200 |
| Dr | EDLI + EPF admin charges (expense) — 0.50% + 0.50% of ₹7,50,000 | 7,500 |
| Cr | Net Pay Payable (→ bank batch, §16.3) — 42,00,000 − 90,000 − 1,200 − 9,800 − 61,700 | 40,37,300 |
| Cr | EPF Payable (EE ₹90,000 + ER ₹90,000 + EDLI and admin ₹7,500) | 1,87,500 |
| Cr | ESI Payable (EE ₹1,200 + ER ₹5,200) | 6,400 |
| Cr | Professional Tax Payable | 9,800 |
| Cr | TDS Payable (s.392, ex-s.192) | 61,700 |
| **—** | **Σ Dr = Σ Cr** | **43,02,700** |

`Net Pay Payable ₹40,37,300` must equal the bank disbursement batch total (§16.3) and
Σ payslip net — the three-way tie is checked before the voucher is offered for download.
The EPF payable must also reconcile to the portal's Due Deposit Balance Summary once the
return is approved, including any s.7Q interest the portal computes (EV-036, EV-039).

> **[Hypothesis]** — *Most Tally seats that matter enable the Payroll module.* Kill/validate
> criterion: §20 V-02 (15–25 Tally-partner interviews). If <~5% enable
> payroll, the "import from Tally Payroll" path is low-value and we import from Tally
> *accounts* + a spreadsheet instead; at ~40% the Tally Payroll importer is the single
> highest-leverage onboarding asset. Do not over-build the Payroll-module importer until
> this reports.

> **[Hypothesis]** — *A Tally export carries every field needed to rebuild the year's Form
> 138 salary data.* Kill/validate criterion: §20 V-15 on a design partner's real Tally
> export (§05.5 item 17). If the export omits fields the §16.7 tie-out needs, Tally
> migration degrades to an assisted, services-led import for those heads, and the
> "migration is a product surface" thesis weakens for Tally sources specifically.

**Acceptance criteria (Tally).**

- **AC-TLY-1:** For a 50-employee run, the emitted journal voucher's debits = credits to
  the rupee, and Σ(net-pay-payable) = the bank disbursement total (§16.3) = Σ payslips.
- **AC-TLY-2:** Re-exporting the same `payrun_id` produces zero new vouchers in Tally
  (idempotent by external key), verified against a live TallyPrime instance.
- **AC-TLY-3:** Onboarding import of a real customer Tally export maps ≥95% of employee
  and statutory ledgers automatically (a **[Hypothesis]** target, recalibrated on the first
  §20 V-15 dataset); the residue is surfaced in a mapping UI, never silently dropped.
- **AC-TLY-4:** A ledger-name mismatch routes the line to a named suspense ledger and
  raises a reconciliation exception — it never posts to the wrong head silently.
- **AC-TLY-5:** A voucher dated outside Tally's open financial year is caught pre-emission
  with an actionable message, not left as a silent Tally-side rejection.

#### 16.2.1 The local connector — reaching a book of record that is not on the internet

**[Verified — vendor documentation, r3/05 finding 14].** TallyPrime's XML surface *is*
published: the nested `ENVELOPE` containing `HEADER` and `BODY`, the header elements
`VERSION`, `TALLYREQUEST` (Import, Export, Execute), `TYPE` (DATA, COLLECTION, OBJECT,
FUNCTION, ACTION), `ID` and `STATUS` (1 success, 0 failure), the body's `DESC`, `DATA` and
`TALLYMESSAGE` wrapping entity records such as `VOUCHER`, and the gateway itself as an HTTP
server **inside the TallyPrime process on port 9000 by default**, enabled through
F1 > Settings > Advanced Configuration. **[Reversed]** An earlier research pass called this
undocumented and proposed a transport spike; that was over-caution, and the spike narrows to
the **payroll voucher and ledger-master payload only** — the field names and attribute values
for a payroll journal (r3/05). The transport needs no spike; the payload does.

What does not change is the topology: `http://<Tally-IP>:9000` is a **LAN endpoint on the
customer's own machine**. A cloud HRMS cannot reach it, and asking a 20–200 person company to
expose its accounting software to the internet is not an integration design.

| Facet | Connector specification |
| --- | --- |
| **Shape** | A small installable agent on a machine that can reach the TallyPrime host. It **pulls** the journal from us and **pushes** it into Tally over the local gateway — outbound-only from the customer's network, exactly like the device push receiver's posture (§16.4) |
| **Auth** | Tenant-scoped credential for the pull leg, rotatable from the admin console; nothing inbound is opened to the customer's network |
| **Payload** | The §16.2 payroll journal voucher, rendered into the voucher and ledger schema the spike fixes, with entity-escaping applied so `&` and non-ASCII names cannot corrupt the XML (a §16.2 failure mode) |
| **Idempotency** | The deterministic `payrun_id` external key travels in whichever voucher field the spike confirms carries it; a re-push updates rather than duplicates (AC-TLY-2) |
| **Company targeting** | The connector names the Tally company explicitly on every request, because a customer running several Tally companies is the normal case, not an edge case (§16.2 failure mode 5) |
| **Version tolerance** | The connector reports the TallyPrime release it is talking to and refuses a payload whose schema version is not registered as compatible with it, rather than posting and hoping |
| **Failure** | Every connector failure raises an `INT.TALLY.*` code (§16.12.1) with the downloadable journal as the named fallback — the GL post is downstream of disbursement and filing and never blocks either |
| **Absence** | The connector is optional at every point. A tenant that will not install one downloads the CSV or Excel journal and posts it by hand, which is the R1 behaviour in any case (§05.17 PR-13) |

- **AC-TLY-6:** The connector opens no inbound port on the customer's network; a network
  capture during a full posting cycle shows only outbound connections from the agent.
- **AC-TLY-7:** A payload whose schema version is not registered against the reported
  TallyPrime release is refused with a named code, and the downloadable journal is offered in
  the same response.
- **AC-TLY-8:** A voucher naming a Tally company that is not open, or a period not open in
  Tally, fails **before** posting with an actionable message (AC-TLY-5 extended to the
  connector path).
- **AC-TLY-9:** Employee names containing `&` or non-ASCII characters round-trip through the
  connector with no corruption and no silent substitution, proved against a fixture of real
  Indian name forms.

---

### 16.3 Banks — salary disbursement and reconciliation

Salary disbursement is on the **pay path**: if it fails, employees are not paid, which is
a same-day escalation. India offers four disbursement mechanisms with materially different
contracts. We support a tiered posture: the file first (universal), an aggregator payout
API or connected banking as the upsell where the tenant qualifies.

Per-rail limits and processing windows differ by provider and by bank, so they are data
(`rail.limits`, `rail.windows`, per provider and bank), never constants (r3/05). The
figures below are one provider's published values, not rail-wide rules.

| Rail | What it is | Published limit and window (RazorpayX, r3/05) | When we use it |
| --- | --- | --- | --- |
| **NEFT** | Batched settlement | Above ₹1 per transaction; processed within 2 hours on working days, in bank-specific windows | Default for bulk salary |
| **RTGS** | Gross settlement for high value | Above ₹2 lakh per transaction; within 30 minutes on working days, in bank-specific windows. Cashfree does not list RTGS (r3/05) | High-value single transfers (e.g. F&F, directors) |
| **IMPS** | Instant | Up to ₹5 lakh per transaction, 24×7 | Off-cycle / urgent single payouts |
| **Connected banking / payout API** | Partner-brokered bank channel, or an aggregator's payout API | Bank or provider SLA | Tenants with a qualifying current account (below) |

**[Verified]** — **The file is the floor; the integration is the upsell** (r3/05). Zoho
Payroll, the closest comparable, ships direct deposit for ICICI, YES Bank, HSBC, Axis and
its own payouts rail, and a downloadable bank advice for every other bank (documentation
read, not executed; r3/05, captured September 2026). We found no Indian bank publishing its salary-file column specification
on a public site — HDFC's ENet pages are marketing copy, and neither the HDFC nor the Axis
developer portal surfaces a bulk-salary API (r3/05). Therefore the **bank file generator is
a per-bank versioned schema** (§16.1), captured from a customer-supplied sample and proven
by a first accepted upload, exactly like the ECR and Form 138 generators.

| Facet | Specification |
| --- | --- |
| **Contract — file** | Per-bank bulk salary upload template: beneficiary account, IFSC, name, amount, narration, debit account, value date, and (for salary-account banks) employee code — the exact columns per bank are captured, not assumed. We ship templates for the banks design partners use, starting with ICICI, HDFC (ENet), Axis, SBI and Kotak (r3/05), and a **configurable generic template builder** (column mapping, delimiter, fixed-width vs CSV, header/trailer, record-count and hash-total checksum) for the long tail so onboarding never blocks on "my bank isn't supported." |
| **Contract — connected banking / payout API** | **Connected banking is partner-brokered, not a public API:** the employer must already hold a corporate current account at that bank, complete document verification through its relationship manager (ICICI may charge a processing fee) and approve activation inside the bank portal; Tally's Connected Banking lists payment initiation for Axis, SBI and Kotak only, ICICI for balance and statement (r3/05). It is a post-launch BD track, not a v1 engineering item. **Payout aggregators:** RazorpayX Payouts requires a current account at a named partner bank (IDFC First, RBL, ICICI, Yes, Axis, Slice) and a mandatory `X-Payout-Idempotency` header; Cashfree Payouts offers API, dashboard and Excel channels without an equivalent partner-bank constraint, with IP allowlisting (at most 25 IPv4 addresses) or a single RSA key (r3/05) — so payout calls run from documented static egress IPs, never from rotating egress. RazorpayX's create-payout call takes the amount in paise (minimum 100), a `reference_id` of at most 40 characters and a `narration` of at most 30 characters drawn from a-z, A-Z, 0-9 and space (r3/05); these are pre-flight rules on the provider's schema object, not code. Credentials stored per §16.12 (secrets vault, per-tenant). **Bank-side maker-checker is a tracked stage:** where the corporate has approval workflows enabled, a payment initiated from the HRMS lands in the bank's own approval queue, so the run shows `pending-bank-approval` naming who must approve in which portal, and an API acknowledgement is never treated as settlement (r3/05). |
| **Data exchange** | Outbound: the disbursement batch (net-pay lines) generated *only* from a LOCKED payroll month (FR-PAY-301 M8; the file itself is §08's FR-PAY-901), and released only by a payment approver distinct from the payroll processor (FR-PAY-904). Inbound: settlement status per line (success / failed / returned) via API status, the bank's downloadable statement in whatever format that bank provides (a per-bank schema object `bank.<bank>.statement_schema`, captured from a customer-supplied sample exactly like the upload template — no statement format is assumed), or manual entry, feeding auto-reconciliation. |
| **Failure modes** | (1) **Invalid IFSC / account** → line rejected or credited wrong (IFSC validated pre-emission against a maintained IFSC directory; account validated through the provider's validation call where one exists, e.g. Cashfree Validate Payout V2, r3/05). (2) **Name-mismatch return** (beneficiary name vs account) — the bank returns the credit later with a reason code. (3) **Partial batch** — some lines settle, some fail; the batch is *not* atomic. (4) **Cut-off missed** — file uploaded after the bank's salary cut-off pays next working day. (5) **Duplicate upload** — same batch uploaded twice → double payment. (6) **Insufficient balance** in the disbursement account → whole batch held. (7) **Holiday/RTGS-NEFT window** and value-date edge cases. (8) **Beneficiary not pre-registered** — a corporate portal may require beneficiary registration or approval before a first credit; whether and for how long is not captured in this PRD's research, so it is recorded per bank at onboarding as `bank.<bank>.beneficiary_registration` and routed to §20, never assumed. (9) **Connection expiry and OTP lockout** — Zoho Payroll's Axis integration expires every 30 days and allows five OTP attempts before it goes inactive and must be set up again (documentation read, r3/05): connection health is tracked, re-authentication is prompted before lapse, a pay run whose bank connection is stale is held before disbursement rather than failing on payday, and OTP entry is never auto-retried. |
| **Fallback** | Universal downloadable bank file is always available even if the API path fails — the customer uploads it in net-banking themselves. **Partial-batch handling is first-class:** each line has an independent status; failed lines are re-queued into a *new* batch without re-paying settled lines (idempotency key per line = `payrun_id + employee_id`). A **pre-flight validation** (IFSC exists, account format, amount > 0, name present, no zero/negative net, batch hash-total matches) blocks a bad batch before it reaches the bank. Reconciliation exceptions (returns, mismatches) open a worklist item, never silently close. |

<!-- DIAGRAM: bank-reconciliation-flow -->

**Worked example — partial-batch return.** A 50-line NEFT batch of ₹40,37,300 (from
§16.2) is uploaded and approved in the bank portal. Settlement status: 48 lines credited,
1 line returned by the beneficiary bank (account closed — reason code captured as the bank
reports it), 1 line failed pre-network (IFSC decommissioned after a bank merger). The run
moves to `disbursed-with-exceptions`. The engine re-queues **exactly the 2 failed lines**
(₹1,54,300 combined) into a new batch keyed on the same `payrun_id + employee_id` pair —
the 48 settled employees cannot be paid twice. The run cannot reach `complete` until
Σ credited (₹40,37,300) = Σ net; the two exceptions carry a reason code and an assignee.
This is the pay-path analogue of "FILED, not SUBMITTED."

**Reconciliation — the load-bearing part.** Disbursement is not "done" when the file
uploads; it is done when **Σ credited = Σ net-pay = Σ payslips** and every exception is
cleared. The reconciliation engine matches bank settlement lines back to pay-run lines by
UTR/reference, flags returns for re-issue, and holds the pay run in a
`disbursed-with-exceptions` state until cleared. This is the integration edge of §08's
FR-PAY-903. The priority conflict an earlier version of this section flagged — §08 rated
FR-PAY-903 **P1** while this section carried reconciliation in P0 — is settled by §05:
credit reconciliation is **P0, R1**, under §05.5 item 33 and capability C-22, because
"paid" is not true until credits reconcile (§05.17 PR-01, routed to the §08 owner to
relabel). The per-line idempotency that stops a re-issue paying anyone twice was never in
conflict (FR-PAY-901 AC-901.3, AC-BNK-2).

**Cut-off awareness (edge cases that cause real incidents).** The engine surfaces the
deadline clock rather than hiding it: a batch scheduled after the tenant bank's salary
cut-off is flagged as "will credit next working day" (Zoho's Axis integration, for
example, documents a 6:45 PM same-day cut-off — documentation read, r3/05; cut-offs are
per-bank data under `rail.windows`, never this figure as a constant); a value date falling on a bank
holiday or outside the rail's processing window is warned pre-emission; a line below the
provider's RTGS minimum is routed to NEFT. None of these silently slip a payday.

**Acceptance criteria (banking).**

- **AC-BNK-1:** Every net-pay line is validated (IFSC in directory, account non-empty,
  amount = payslip net) before the batch is emitted; a single invalid line surfaces as a
  blocking pre-flight error, not a silent drop.
- **AC-BNK-2:** Re-emitting a batch for an already-settled `payrun_id` pays no employee
  twice (per-line idempotency), proven with a returned-line re-issue test.
- **AC-BNK-3:** A partial settlement (e.g. 48/50 lines succeed) leaves the run in
  `disbursed-with-exceptions`, re-queues exactly the 2 failed lines, and the run cannot be
  marked complete until Σ credited = Σ net.
- **AC-BNK-4:** For a supported bank, the generated file imports into that bank's corporate
  net-banking bulk-upload without manual edits (validated per bank release).
- **AC-BNK-5:** A batch whose emitted hash-total / record-count trailer does not match the
  line body is rejected in-product before upload (guards silent truncation).

#### 16.3.1 The per-bank disbursement file template as a versioned artefact

**[Verified]** — **We found no Indian bank publishing its salary-file column specification
on a public site** (r3/05, captured September 2026): HDFC's developer portal is retail and
lending oriented with no bulk-salary or ENet API surfaced and its ENet pages carry marketing
copy only; Axis runs a self-serve developer portal whose payment product is generic with no
bulk or salary payment API named. The column list for every bank therefore arrives the same
way the ESIC template and the ECR layout do — **captured from a real artefact on a real
registration, then proved by a first accepted upload.** That is not a gap to apologise for;
it is the reason the template must be data.

**The bank template object.** It is a §16.1 schema object with a disbursement-specific
payload. Nothing in it is a constant, and every field with no captured value is a named
parameter rather than a guess.

| Field | Meaning | Default / route |
| --- | --- | --- |
| `schema_id` | `bank.<bank_code>.salary_file` | — |
| `version` | Monotonic, pinned to the captured artefact, never to a page label | See EV-051's lesson: Protean's page said "Version 1.2" while the workbook said "1.1" (r5/02) — pin to the artefact |
| `channel` | Corporate net-banking bulk upload · host-to-host · connected banking · aggregator Excel upload | Determines who uploads and where maker-checker lives |
| `account_type` | The corporate account product the template is valid for | Captured; a bank may run more than one |
| `file_form` | Delimited · fixed-width · spreadsheet | Captured |
| `delimiter` / `quote` / `escape` | For delimited forms | Captured |
| `field_widths[]` | For fixed-width forms, with pad character and alignment per field | Captured |
| `encoding` / `line_terminator` | — | `bank.<bank_code>.encoding`, `bank.<bank_code>.line_terminator` (owner: Eng), routed to §20; set from the first accepted upload, never assumed |
| `header_record` / `trailer_record` | Presence, and the fields each carries | Captured |
| `control_totals[]` | Record count, sum of amounts, hash total — which of these the bank requires, and how each is formatted | Captured; where the bank requires none, we still compute and compare ours internally (AC-BNK-5) |
| `columns[]` | Ordinal, name, type, length, required, transform, validation | Captured |
| `amount_representation` | Rupees with decimals · paise integer · rupees with implied decimals | Captured. The aggregator rails differ from the file rails here: RazorpayX takes the amount in **paise** with a minimum of 100 (r3/05) |
| `narration_rules` | Maximum length and permitted character set | Captured. RazorpayX publishes a `narration` maximum of 30 characters from a-z, A-Z, 0-9 and space, and a `reference_id` maximum of 40 characters (r3/05) |
| `value_date_rule` | How the value date is expressed and what the bank does with a past or holiday date | Captured |
| `beneficiary_registration` | Whether a first credit needs prior beneficiary registration or approval, and for how long | `bank.<bank_code>.beneficiary_registration` (owner: Ops), routed to §20 — recorded per bank at onboarding, never assumed (§16.3) |
| `cut_off` / `windows` | Same-day cut-off and per-rail processing windows | `rail.windows`, `rail.limits` per provider and bank (§16.3). One published value exists in this PRD's evidence: a 6:45 PM same-day cut-off documented for one product's Axis integration (r3/05) — an instance, not a rule |
| `proving_artefact` | The accepted-upload evidence that moved this version to PUBLISHED | Stored; a version with none cannot be PUBLISHED |
| `source_artefact` / `source_ref` | The captured template or specification, and where it came from, with a date | Per AC-NET-3 |

<!-- DIAGRAM: integrations-api-bank-template-lifecycle -->

**Template lifecycle — the transition table.** The diagram illustrates it; this table is
normative. "Proved" means *a real batch generated from this version was accepted by that
bank and settled*, not that it parsed.

| From | Event | Guard | To | Side effect | Who may trigger |
| --- | --- | --- | --- | --- | --- |
| — | Tenant onboarding names a bank with no PUBLISHED version | — | REQUESTED | Capture task opened against the onboarding owner | System |
| REQUESTED | Sample template or specification supplied | The artefact is stored, not just linked (AC-NET-3) | CAPTURED | `source_artefact` written | Onboarding owner |
| CAPTURED | Fields mapped onto `columns[]` | Every column has a type and a source expression, or is marked unknown | DRAFT | Generator can emit into a sandbox only | Integrations engineer |
| DRAFT | Dry-run emission reviewed against the sample | Byte-level diff against the supplied sample, where one exists | PROVING | Emission permitted for one named tenant, one batch | Integrations engineer |
| PROVING | Bank rejects the upload | — | DRAFT | Rejection reason recorded as a template defect with the bank's own message verbatim | Bank, through the tenant |
| PROVING | Bank accepts and the batch settles | Reconciliation closes: Σ credited = Σ net (AC-BNK-3) | PUBLISHED | `proving_artefact` stored; the version becomes selectable for every tenant on that bank and account type | System, on reconciliation |
| PUBLISHED | Bank release changes the layout | A new artefact is captured | DRAFT (new version) | Prior version stays PUBLISHED for in-flight batches | Integrations engineer |
| PUBLISHED | Successor version reaches PUBLISHED | — | DEPRECATED | Warning on selection; new batches route to the successor | System |
| DEPRECATED | No open batch routes to this version | — | RETIRED | Read-only, retained as evidence for any batch that used it | System |
| CAPTURED or DRAFT | No tenant needs it and the artefact cannot be validated | — | WITHDRAWN | Capture task closed with a reason | Onboarding owner |

- **AC-BNK-6:** No batch is ever emitted from a version that is not PUBLISHED, except the
  single PROVING batch for the one named tenant that is proving it; the guard is in the
  emitter, not in a runbook.
- **AC-BNK-7:** A PUBLISHED version has a stored `source_artefact` and a stored
  `proving_artefact`. A version missing either cannot reach PUBLISHED, and a reviewer can
  check this mechanically across every bank the product supports.
- **AC-BNK-8:** A bank-release layout change is a data change: a new version, a new
  `effective_from`, and no application deploy. Regression is the golden batch of the prior
  version re-emitted under the new version and diffed field by field.
- **AC-BNK-9:** Where the bank publishes no control totals, the generator still emits its
  own record count and amount total into an accompanying manifest and refuses a batch whose
  body disagrees with it (the §16.3 truncation guard, generalised).
- **AC-BNK-10:** The generic template builder can express every PUBLISHED bank version in
  the product without code — proved by rebuilding two PUBLISHED bank templates in the
  builder and diffing their output byte for byte against the native version.

#### 16.3.2 Rails, providers and the rail-selection decision table

The engine never speaks "NEFT" to a provider; it speaks a **rail intent** and lets the
provider adapter resolve it, because eligibility and limits are provider data. Two published
provider surfaces are in this PRD's evidence base and they disagree about what exists at
all: one lists IMPS, NEFT, RTGS and UPI with per-rail limits and per-partner-bank windows,
while the other's payout page does not list RTGS among its methods (r3/05, findings 8 and
10). A product that treats "RTGS" as a universal constant mis-routes a director's final
settlement the first time it changes provider.

| Rail intent | Meaning to the engine | Resolution rule |
| --- | --- | --- |
| `BULK_SALARY` | The monthly batch | The provider's cheapest batch rail that carries the whole batch inside the tenant's value-date window |
| `HIGH_VALUE_SINGLE` | One line above the tenant's high-value threshold `rail.high_value_threshold` (owner: Finance; routed to §20) | The provider's gross-settlement rail if it offers one; otherwise the batch rail with a warning naming the amount and the provider's own published limit |
| `URGENT_SINGLE` | Off-cycle, same-day, outside banking hours | The provider's instant rail, subject to its published per-transaction cap |
| `CORRECTION` | A re-issue of a returned or failed line | Inherits the original line's intent, never upgraded silently — an upgrade changes the cost and is an explicit choice |

**Rail-selection decision table.** Evaluated per line at pre-flight, before the batch is
built, so the answer is visible before anyone approves anything.

| # | Amount vs provider caps | Value date | Provider offers the rail | Outcome |
| --- | --- | --- | --- | --- |
| R1 | Within the batch rail's per-transaction limits | Today, before the bank's cut-off | Yes | Batch rail, same-day credit expected |
| R2 | Within limits | Today, after the cut-off | Yes | Batch rail, flagged **"will credit next working day"** before release (§16.3) |
| R3 | Within limits | A bank holiday or outside the rail's processing window | Yes | Warned pre-emission with the next eligible value date offered |
| R4 | Above the batch rail's per-transaction limit | Any | Gross-settlement rail offered | Line split out to `HIGH_VALUE_SINGLE` in the same release, tracked as its own line |
| R5 | Above the batch rail's per-transaction limit | Any | Gross-settlement rail **not** offered by this provider | **Pre-flight block** naming the line, the amount, the provider and the limit — never silently truncated, never silently split into two credits |
| R6 | Below the provider's minimum | Any | — | Pre-flight block. The minimum is provider data: one published rail takes the amount in paise with a minimum of 100 (r3/05) |
| R7 | Any | Any | Provider's instant rail requested but the tenant's account type is not eligible | Fall back to the batch rail with the reason shown; one published rail is available only on two of six partner banks' current accounts (r3/05) |

**Provider capability matrix — what differs, and therefore what the adapter must carry.**
Captured September 2026 from each provider's own documentation, documentation read and not
executed.

| Capability | RazorpayX Payouts | Cashfree Payouts | Consequence for us |
| --- | --- | --- | --- |
| Bank prerequisite | A current account at one of six named partner banks | No equivalent partner-bank constraint published | The tenant's existing bank decides which provider is even possible — this is an onboarding question, not a technical one |
| Auth | HTTP Basic with key id and secret; live-key generation itself requires an OTP | Client id and client secret headers, with an RSA signature header as the alternative | Two credential shapes in the vault, two rotation procedures (§22) |
| Idempotency | A required idempotency header on payout creation | Not published in the same form | Our per-line key (`payrun_id + employee_id`) is the invariant; the provider header is populated from it where the provider has one, so idempotency never depends on the provider having it |
| Egress | Allowlisting instructed | IPv4 allowlist capped at 25 addresses, no IPv6, or a single RSA public key at a time | **Payout calls run from documented static egress, never rotating egress** — an infrastructure constraint that must be in the deployment design from the start, not discovered at integration time |
| Channels | API | API, dashboard and Excel bulk upload | The Excel channel is a real fallback for a tenant whose approvals live in the provider's dashboard |
| Validation | — | A published beneficiary-validation operation | Bank-account validation belongs at onboarding and at pre-flight, not at disbursement time |

- **AC-BNK-11:** Rail selection is computed and displayed **before** release, per line, with
  the reason; no line's rail is decided inside the provider adapter at send time.
- **AC-BNK-12:** A provider swap changes no engine code and no pay-run state: the same
  locked run releases through either adapter in a staging test, producing per-line
  idempotency keys that are identical across providers.
- **AC-BNK-13:** Payout calls originate only from the documented static egress set; a
  deployment change that would move them raises a release-blocking check, because an egress
  change silently breaks an allowlist-gated provider.

#### 16.3.3 Bank-side maker-checker as a tracked stage

**[Verified — documentation read, r3/05 finding 3].** Payment initiated from an HRMS lands
in the **bank's own approval queue** where the corporate has approval workflows enabled:
one bank's flow requires separate in-portal approval under a "pending on me" queue, and
another's multi-user setup requires that the user who connects the integration hold maker
privileges, with an approver authorising inside the bank portal. **A product that reports
"paid" on an API acknowledgement is wrong for most corporates.** This is why IG4's "FILED,
not submission" has a pay-path twin: settled, not acknowledged.

There are therefore **two independent maker-checker systems** on the same money, and
conflating them is the failure. Ours is §08's (FR-PAY-904: the payment approver is distinct
from the payroll processor). The bank's is the corporate's own, configured in the bank
portal, invisible to us except through status.

| Control | Whose | Where it happens | What it gates | Our visibility |
| --- | --- | --- | --- | --- |
| Payroll approval | Ours | In-product | The month reaching LOCKED (FR-PAY-301 M8) | Complete |
| Payment release | Ours | In-product | The batch leaving DRAFT for RELEASED, by an approver distinct from the processor (FR-PAY-904) | Complete |
| Bank maker | The corporate's | Bank portal or our initiation call | Whether a transaction is created at the bank at all | Partial — we know we initiated |
| Bank checker | The corporate's | Bank portal only | Whether the bank executes | **Status only.** We never hold the approver's factor, and we never approve |

<!-- DIAGRAM: integrations-api-disbursement-states -->

**Disbursement transition table.** This is the pay-path analogue of FR-PAY-711 and it is
owned here, because every transition after RELEASED is an integration event.

| From | Event | Guard | To | Side effect | Who may trigger |
| --- | --- | --- | --- | --- | --- |
| DRAFT | Pre-flight run | Every line valid, control totals agree, rail resolved | READY | Batch manifest written, per-line idempotency keys minted | System |
| DRAFT | Pre-flight run | Any line invalid | PREFLIGHT_FAILED | Blocking error naming the line, the field and the value (AC-BNK-1) | System |
| PREFLIGHT_FAILED | Line corrected | The pay month is still LOCKED and the net is unchanged, or the run is re-approved | DRAFT | Correction audited against the employee and the approver | Payroll processor |
| READY | Connection health check | Token or session expiring inside the cycle, or OTP lockout state | HELD | Re-authentication prompt naming who must act and by when | System |
| HELD | Re-authentication completed | Connection healthy | READY | — | Tenant bank user |
| READY | Release | Approver distinct from the processor (FR-PAY-904) and the run is LOCKED | RELEASED | File emitted or payouts initiated; release audited | Payment approver |
| RELEASED | Initiation acknowledged, bank approval configured | — | PENDING_BANK_APPROVAL | The run shows **who must approve in which portal**, with the batch total and line count | System |
| RELEASED | Initiation acknowledged, no bank approval configured | — | ACCEPTED_BY_BANK | — | System |
| PENDING_BANK_APPROVAL | Bank approver authorises | — | ACCEPTED_BY_BANK | Approval time captured against the batch | Bank, through status |
| PENDING_BANK_APPROVAL | Bank approver rejects, or the bank's approval window lapses | — | REJECTED_BY_BANK | Exception with the bank's reason verbatim; **no automatic re-initiation** | Bank, through status |
| REJECTED_BY_BANK | Batch re-prepared | The run is still LOCKED | DRAFT | The prior batch is retained, never deleted; the successor references it | Payment approver |
| ACCEPTED_BY_BANK | Settlement status received, all lines credited | — | SETTLED | Per-line UTR or reference captured | System |
| ACCEPTED_BY_BANK | Settlement status received, some lines failed or returned | — | PARTIALLY_SETTLED | Exactly the failed lines re-queued into a successor batch under the same per-line keys (AC-BNK-3) | System |
| PARTIALLY_SETTLED | Successor batch settles | — | SETTLED | — | System |
| SETTLED | Reconciliation | Σ credited = Σ net = Σ payslips and every exception cleared | RECONCILED | The pay run may reach `complete`; the GL journal becomes offerable (§16.2) | System |
| Any state after RELEASED | Re-emission of the same batch | — | Unchanged | **Zero additional credits.** Per-line idempotency is the guard, not operator care | — |

**Connection health as a first-class state.** **[Verified — documentation read, r3/05
finding 2]:** one product's bank integration **expires every 30 days** and allows **five OTP
attempts** before going inactive and requiring full re-setup. A monthly product with a
30-day-expiring connection fails on payday by construction unless expiry is managed a cycle
ahead.

| Health state | Trigger | Product behaviour |
| --- | --- | --- |
| `HEALTHY` | Last successful authenticated call inside the freshness window | Normal |
| `EXPIRING` | Expiry falls inside the next pay cycle, computed from `integration.reauth_lead_days` | Prompt on the payroll cockpit and to the named bank user; the run may still be prepared |
| `STALE` | Expired, or authentication failing | **The batch holds at READY.** It does not fail at disbursement time — this is the whole point of tracking it |
| `LOCKED_OUT` | The provider's OTP attempt budget is exhausted | Hard stop with the recovery procedure named. **OTP entry is never auto-retried**, because a retry loop burns the attempt budget and converts a recoverable state into a full re-setup |

**Worked example — the maker-checker month that would otherwise have been reported "paid".**
The ₹40,37,300 batch of §16.3 (50 lines, from the §16.2 voucher) is released on the 29th by
the payment approver. The corporate has bank-side approval workflows enabled.

1. **RELEASED, 16:20.** Initiation acknowledged by the bank. A product that stopped here
   would show "paid".
2. **PENDING_BANK_APPROVAL, 16:20.** The run shows the named bank approver, the portal, the
   batch total ₹40,37,300 and the line count 50. The same-day cut-off for this tenant's bank
   is the captured `cut_off` for its template.
3. **Cut-off passes with no approval, 18:45.** The value-date warning of decision-table row
   R2 fires on the *batch*, not on a line: expected credit moves to the next working day, and
   the notice names the approver who has not acted. Nothing is re-initiated.
4. **ACCEPTED_BY_BANK, next morning 09:12.** Approval captured with its timestamp.
5. **PARTIALLY_SETTLED.** 48 lines credit; 2 fail exactly as in §16.3's worked example
   (₹1,54,300 combined). Σ credited so far = ₹40,37,300 − ₹1,54,300 = **₹38,83,000.**
6. **Successor batch** carries only those 2 lines, under the same `payrun_id + employee_id`
   keys. Re-emitting the original batch at any point in this sequence credits **zero**
   additional rupees.
7. **SETTLED then RECONCILED** when Σ credited returns to ₹40,37,300 and equals Σ net and
   Σ payslips. Only then does the run reach `complete` and the §16.2 journal — whose
   `Net Pay Payable` credit is the same ₹40,37,300 — become offerable.

The elapsed time between steps 1 and 4 is the number that matters operationally, and it
belongs to the customer's own approver, not to us. The product's obligation is to make the
wait visible, attributed and un-mistakable for settlement.

- **AC-BNK-14:** A batch in PENDING_BANK_APPROVAL is never described as paid, settled or
  disbursed in any surface — cockpit, payslip, webhook, API, report or notification — and the
  state names the approver and the portal.
- **AC-BNK-15:** An initiation acknowledgement never advances a run past ACCEPTED_BY_BANK;
  only per-line settlement status does (IG4).
- **AC-BNK-16:** A REJECTED_BY_BANK batch is never re-initiated automatically, and the
  bank's reason is stored verbatim alongside our mapped code (§16.12.1).
- **AC-BNK-17:** A run whose bank connection is STALE holds at READY with a named owner and
  a due date; it never reaches payday in that state undetected. Tested by expiring a sandbox
  connection and running a full cycle.
- **AC-BNK-18:** OTP entry is never retried by the system under any condition, including a
  transient network failure on submission; the attempt budget is displayed to the user before
  each attempt.

#### 16.3.4 Negative cases and the disbursement test corpus

Run against every PUBLISHED bank template version and every provider adapter. A case that
cannot be run in a provider's sandbox is run against a recorded fixture and marked as such.

| # | Input | Expected |
| --- | --- | --- |
| B1 | The same batch file uploaded twice in the bank portal | Second upload produces zero additional credits, or is rejected by the bank as a duplicate; either way the reconciliation shows Σ credited = Σ net exactly once |
| B2 | A line whose IFSC is syntactically valid but absent from the maintained directory | Pre-flight block naming the employee and the IFSC; batch not emitted |
| B3 | A line whose beneficiary name differs from the account holder's | Emitted — we cannot know — then handled as a name-mismatch return with the bank's reason code, re-queued, and never auto-corrected |
| B4 | Net pay of exactly ₹0 for an employee on full LOP | Line excluded from the batch by construction with a reason; a zero-amount line is never sent |
| B5 | A negative net (recovery exceeds earnings) | Pre-flight block; recovery routing is §08's, and a negative line never reaches a bank file |
| B6 | Batch emitted, then the pay month is re-opened | Refused. The month cannot leave LOCKED once a batch is RELEASED (FR-PAY-301); the correction path is a diff, never a mutation (Part E-1) |
| B7 | Two runs for the same month released in error | The second batch's per-line keys collide with the first's; no employee is credited twice, and the collision raises an exception naming both runs |
| B8 | Bank returns a settlement file with more lines than we sent | Reconciliation refuses to close, raises an exception, and never marks the extra lines as ours |
| B9 | Bank returns a settlement file in a format we have not captured | Statement schema `bank.<bank>.statement_schema` is missing; the file is stored raw, an exception is raised, and reconciliation falls back to manual entry — never to guessing |
| B10 | Amount field truncated by a fixed-width template with too narrow a width | Caught before emission by the control-total comparison (AC-BNK-9): the sum of the emitted fields disagrees with the manifest |
| B11 | A non-ASCII character in an employee name for a template whose captured encoding cannot represent it | Pre-flight block naming the employee and the character, with the substitution offered explicitly; never a silent replacement |
| B12 | Provider returns a 5xx after the payout was created on their side | Retry under the same idempotency key; the provider deduplicates, and the reconciliation proves one credit |
| B13 | Our egress IP changes and the provider rejects every call | The pre-release connection check fails at READY, not at RELEASED; the batch holds (AC-BNK-13, AC-BNK-17) |
| B14 | A director's final settlement above the batch rail's per-transaction limit on a provider with no gross-settlement rail | Decision-table row R5: pre-flight block naming the provider's own published limit. Never split into two credits without an explicit instruction |
| B15 | The tenant switches bank between two pay months with an unsettled prior batch | The prior batch stays on its own template version until RECONCILED; the new month routes to the new bank's PUBLISHED version. Both are visible on the run |

---

### 16.4 Biometric and attendance devices

Attendance feeds loss-of-pay, overtime and statutory registers (§09), so it is on the pay
path. §09.3 names the device-push receiver **the best-evidenced call in the corpus.**

**[Verified]** — **Build the ADMS/WDMS push receiver in v1** (§09.3, FR-DEV-001). The dominant
device-to-cloud path in India is **outbound**: the terminal HTTP-POSTs punch packets to a
tenant-scoped URL. No on-premise middleware, no static IP, no port-forwarding. eSSL and
ZKTeco both support it; corroborated across four independent sources and unshaken by
hostile re-check (Source: r2/04, via §09.3). The vendor protocol specification itself has
not been captured; it is taken from vendor documentation at the §20 V-11 bench test. The
receiver is R1 capability C-24 (§05.17), whose evidence is that bench result.

<!-- DIAGRAM: device-push-ingest -->

| Facet | Specification |
| --- | --- |
| **Contract — push (P0)** | We expose a **tenant-scoped ingest endpoint** implementing the vendor's push semantics — device handshake, heartbeat, attendance-log upload, command poll (§09.3 FR-DEV-001 AC2). Exact endpoint paths and packet field names come from the vendor protocol documentation at the §20 V-11 bench test; this PRD does not assert them. The logical packet contract every vendor adapter maps onto — handshake, heartbeat, attendance-log upload, command poll, command result and the consent-gated template upload, with the receiver's obligation and failure handling for each — is §09's FR-DEV-008 and is not restated here. The admin enters the endpoint URL + per-device secret into the device's cloud-server config once; punches then flow with no middleware. Device serial → tenant → location mapping is registered at setup. |
| **Contract — pull (P1)** | For devices without ADMS or on segregated plant networks, a **pull path** via the vendor SDK / port-4370 protocol through a lightweight on-prem agent, or a **third-party connector**. **[Verified]** (§09.3 FR-DEV-005; r2/04): a paid connector market exists at ~**$345 one-time to $588/year** — cheap enough that we **partner/buy for the long tail** rather than build for every SDK-bound brand and firmware. |
| **Data exchange** | Inbound punch packet: device serial, user id (device-local), timestamp, punch direction/verify mode. We map device-user-id → employee, dedup, and keep per-day IN and OUT times, because Form IX requires them (EV-055); shift, OT and LOP derive per §09 — OT at not less than twice the ordinary rate against wage-period normal hours (§09.6 FR-OT-001). **[Reversed]** An earlier version cited a 144-hour quarterly OT ceiling here as [Verified]; it is **[Hypothesis]** (K-04) — never confirmed against gazette text, warn-only, never a block, routed to §20 V-17 (§09.6). Outbound (push protocol): user-sync commands queued to the device. Biometric templates never enter business tables — they sit in the separate template keyspace, as an entity separate from the attendance event (Part E-6, §09.2-C); template sync runs only for employees whose written consent is on file, because the SPDI Rules require consent in writing before biometric data is collected (EV-060; enrolment under written consent and the ~May 2027 regime switch are §09.2-B, and who owes that duty is under counsel review, Part D-4, §23); template erasure is two-phase over the command channel, with a documented exception state (§09.3 FR-DEV-007; §09.3-B). |
| **Failure modes** | (1) **Clock drift** on the device → punches land in the wrong day/shift (CERT-In also requires NTP sync, EV-062, §16.12). (2) **Device offline** — punches buffered locally, arrive in a burst on reconnect (must be idempotent). (3) **Duplicate punches** (double-tap, retry). (4) **Unmapped device-user-id** (new joiner enrolled on device but not in HRMS, or vice-versa). (5) **Firmware quirks** on legacy port-4370 — the protocol is undocumented and reverse-engineered, with confirmed enrolment and data-restore limitations (r2/04, [Verified]). (6) **Shared-device identity** — nine in ten people who do not use a phone live in a household that owns one; worker identity ≠ device identity (§09 FR-ATT-013 [Verified]). (7) **Serial spoofing** — an unregistered serial POSTing to the endpoint (mitigated by per-device secret + serial allowlist, §09.3 FR-DEV-001 AC3). |
| **Fallback** | If a device is down or unsupported, attendance falls back to **web/mobile check-in (with GPS/geofence), bulk CSV upload, and manual muster** — none block payroll. Buffered bursts are handled by **idempotent ingest** keyed on `(device_sn, device_user_id, device_timestamp, direction)` + `payload_hash` (§09.3 FR-DEV-001 AC4). Unmapped punches go to an **exceptions worklist** and are held out of pay until mapped, never dropped. A punch that cannot be mapped by pay-run lock is treated per the tenant's configured policy (present-assumed vs LOP), surfaced explicitly. |

**Worked example — buffered burst after reconnect.** A plant terminal (serial
`T-PLANT-01`, an illustrative label, not a vendor serial format) loses WAN for 6 hours across a shift change and buffers 214 punches. On
reconnect it POSTs them in one attendance-log upload. Idempotent ingest keyed on
`(device_sn, device_user_id, device_timestamp, direction)` + `payload_hash` writes each
punch exactly once even though the device retries the POST twice (it did not receive our
first acknowledgement in time). Two punches carry a
device-user-id (`00042`, `00119`) with no HRMS mapping — they land in the exceptions
worklist and are excluded from that day's LOP/OT computation until an admin maps them,
rather than being counted as absent. Net result: 212 attributed, 2 held, 0 duplicated,
0 dropped.

**Highest-leverage cheap artefact (§09.3 FR-DEV-004, carried into this section):** ship a
**public, model-level device compatibility matrix and a self-serve verification tool**
before the first enterprise sales call (P1, §05.5 item 21). It neutralises deal-gating risk, and we are not
aware of any incumbent publishing one as of September 2026. This is an integration
deliverable, not just marketing: it is the self-serve front door to §16.4.

> **[Killed]** — Do not size device work from the retracted "85–98% success / 1-in-7
> devices won't integrate" figure — it was marketing from the vendor selling the fix
> (§09.3; §20.4 banned-numbers table). Device integration effort is **currently
> unsized**; it needs a hardware spike (§20 V-10) before any completion date is committed.

**Acceptance criteria (devices).**

- **AC-DEV-1:** A factory-config eSSL or ZKTeco terminal pointed at the tenant ingest URL
  streams punches with zero on-prem software, mapped to employees within one poll cycle.
- **AC-DEV-2:** A device reconnecting after 6 hours offline delivers its buffered punches
  and produces **no duplicate** attendance rows (idempotent ingest).
- **AC-DEV-3:** An unmapped device-user-id raises an exception and is excluded from LOP/OT
  computation until resolved — it is never silently counted as absent or present.
- **AC-DEV-4:** The public compatibility matrix returns a supported/partner/unsupported
  verdict for a given make+model+firmware, self-serve, before any sales contact.
- **AC-DEV-5:** A POST from an unregistered serial (no per-device secret match) is rejected and
  logged as a security event (§16.12), not silently ingested.

#### 16.4.1 The ingest boundary — routing, admission control and backpressure

**Division of ownership, stated once.** §09 owns the *logical* device contract: the six
message classes and each class's receiver obligation (FR-DEV-008), the field dictionary with
its null reason codes (FR-DEV-009), verify-mode semantics, and the consent and erasure
behaviour. The vendor *wire* format — endpoint paths, parameter names, encodings, batch
sizes — is not captured in research and comes from vendor documentation at the §20 V-11
bench test. **This subsection owns what sits between those two: the ingest boundary itself** —
how a POST is routed to a tenant, what is admitted, what happens under load, and what
happens to bytes we cannot parse. None of it depends on the wire format, so all of it can be
built before V-11 reports.

<!-- DIAGRAM: integrations-api-adms-admission -->

| Boundary property | Specification | Why it is here and not in §09 |
| --- | --- | --- |
| **Tenant routing** | The ingest URL carries an opaque `tenant_route_token` (§09 FR-DEV-009). The edge resolves it to exactly one tenant *before* any parsing, and a request that resolves to none is rejected without reaching an adapter | Tenant resolution at the edge is the same choke point §15.2.3 applies to every inbound request; a device is not an exception to it |
| **Admission order** | Route → serial and secret → size and rate caps → durable raw write → adapter parse. Parsing never precedes authentication, and a parse failure can therefore never be used to probe whether a serial exists | An unauthenticated parser is an attack surface; a spoofed-serial flood is an Annexure I IoT-class incident candidate (EV-062, §16.12) |
| **Size cap** | `device.ingest.max_payload_bytes` (owner: Eng; routed to §20), set from the V-11 bench test's observed burst sizes. Over-cap payloads are rejected with the vendor's own retry semantics preserved, so the device keeps its buffer | A device that discards its buffer on our 413 loses punches permanently; the buffer is the fallback |
| **Rate cap** | Per device and per tenant, `device.ingest.rate_per_device`, `device.ingest.rate_per_tenant` (owner: Eng; routed to §20). A device that exceeds it is throttled, never blocked, and the throttle raises a device-class exception rather than a security event | A reconnecting fleet after a site-wide outage looks exactly like an attack; the response must differ |
| **Durability before acknowledgement** | The raw bytes and the `payload_hash` are written durably before any acknowledgement, per §09 FR-DEV-008 AC2. Where the vendor acknowledges whole batches only, the batch is written atomically | This is the property that makes device retries safe; it is an ingest-boundary guarantee, enforced in the edge |
| **Quarantine** | Unparseable records are stored with their raw bytes, the adapter version that failed, the device serial and the receipt time, and raise one exception per device and adapter version — never one per record | A firmware change produces thousands of identical failures; one worklist item with a count is actionable, ten thousand are not |
| **Clock** | Server time is NTP-synced to NIC or NPL (EV-062), and `clock_offset` is computed per device at handshake and heartbeat (§09 FR-DEV-003) | One control serves two obligations: device drift and CERT-In clock sync (§16.12) |
| **Observability** | Per device: last seen, offset, records accepted, records quarantined, adapter version, secret age. Per tenant: devices unseen beyond `device_unseen_alert_h`, quarantine depth, unmapped-user count | These are the signals §16.12.3's health board reads; a device integration with no per-device visibility cannot be supported remotely |

**What the boundary never does.** Four hard bars, each enforced structurally rather than by
convention:

1. **It never writes a template or an image to a business table.** An attendance record
   carrying either has it stripped before persistence, the strip is logged, and the punch is
   kept (§09 FR-DEV-008 AC4; Part E-6: no image column, no image bucket).
2. **It never rejects a punch for how the worker was verified.** A consent failure is a
   data-handling fault that opens an erasure item; it is never a wage loss (§09's
   verify-mode table).
3. **It never accepts a punch into a tenant other than the one the route token resolved to**,
   even if the serial is registered elsewhere. A serial registered in two tenants is a
   configuration incident, surfaced as one.
4. **It never sends a device command that could stop a worker entering a site.** Physical
   write-back that gates entry is adverse action and is outside this contract (§09
   FR-DEV-009 AC3).

- **AC-DEV-6:** A POST whose route token does not resolve is rejected before any parsing,
  and the rejection is indistinguishable — in timing and in response — from a POST whose
  serial is unregistered, so the endpoint cannot be used to enumerate tenants or devices.
- **AC-DEV-7:** An over-cap or throttled upload leaves the device's buffer intact: after the
  throttle clears, the same punches arrive and are written exactly once (idempotent ingest),
  proved by a burst test at twice the cap.
- **AC-DEV-8:** Quarantined records are re-parseable: after an adapter version is corrected,
  a named re-parse run converts them into punches with their original device timestamps, and
  the re-parse is audited against the adapter version that produced it.
- **AC-DEV-9:** Per-device secret rotation completes with no lost punches: during the
  rotation overlap both secrets authenticate, and after it the old secret is refused and the
  refusal is a security event.

#### 16.4.2 The adapter registry, versioning and re-parse

An adapter is a named, versioned artefact in the §16.1.1 register, not a code branch. It has
an evidence status, because the evidence behind the device families differs sharply and
pretending otherwise is how an unsized risk enters a roadmap.

| Adapter field | Meaning |
| --- | --- |
| `adapter_id` / `version` | `device.<family>` plus a monotonic version; stamped on every punch it parses (§09 FR-DEV-008 AC5) |
| `families[]` | Makes, models and firmware ranges this version claims, and the matrix entry each maps to (§09 FR-DEV-004) |
| `evidence_status` | ADMS/WDMS push for the two best-evidenced brands is corroborated by four independent sources (§09, r2/04). Other families rest on a single competitor's blog, and one vendor publishes no API documentation at all (§09 FR-DEV-009 AC2) — those get an adapter only after a per-brand spike (§20 V-10), and the public matrix shows them as unverified until then |
| `null_reason_codes[]` | Which §09 FR-DEV-009 reason codes this version can emit, so a new code is a version change and not a surprise |
| `bench_artefact` | The V-11 or V-10 capture the version was built from, stored (AC-NET-3) |

**Re-parse is a first-class operation, not a recovery hack.** Because the raw bytes are
retained with the punches they produced (§09 FR-DEV-009 AC1), a firmware change discovered
late is recoverable:

| Step | Action | Guard |
| --- | --- | --- |
| 1 | Identify the affected set by adapter version and device serial | The set is computable because the version is stamped on every punch |
| 2 | Publish the corrected adapter version | Contract test corpus (§09 FR-DEV-008) passes on the new version |
| 3 | Dry-run re-parse into a shadow set | Diff against the existing punches, per device, per day |
| 4 | Apply | **Only into open pay periods.** A re-parse that would change a LOCKED month's attendance produces a diff for §08's correction path, never a mutation (Part E-1, Part E-2) |
| 5 | Audit | The re-parse run, its version, its operator and its diff are retained |

- **AC-DEV-10:** Every punch names the adapter version that parsed it, and a query by
  adapter version returns the exact affected set — the precondition for step 1 above.
- **AC-DEV-11:** A re-parse never mutates attendance in a LOCKED month; it emits a diff that
  enters §08's post-lock correction path with its own approval.
- **AC-DEV-12:** The public compatibility matrix (§09 FR-DEV-004, §16.4) renders each
  family's evidence status honestly — corroborated, single-source, or unverified — and a
  family with no adapter version cannot show as supported.

#### 16.4.3 The pull path and the third-party connector contract

**[Verified, §09.3 FR-DEV-005; r2/04]** — a paid connector market exists at roughly **$345
one-time to $588 per year**, cheap enough that the long tail is bought, not built. Buying it
has a consequence this section owns: **a connector that reads a customer's terminals and
posts to us is a sub-processor.** It is therefore a register row with a DPA, a data-class
allowlist and a place in the sub-processor gate (§16.1.1; §12.8; Part E-7).

| Contract term | Requirement | Rationale |
| --- | --- | --- |
| Data classes the connector may carry | Punch records only: the §09 FR-DEV-009 attendance-log fields. **Never** a template blob, never an enrolment image, never an employee master field beyond the device user id | The template keyspace is separate by design (Part E-6); a connector that can read templates widens the biometric perimeter to a third party |
| Direction | Inbound punches, plus the command channel where the connector supports it. A connector that cannot carry a delete-template command is recorded as such | Two-phase erasure with per-device acknowledgement must still terminate (§09 FR-DEV-007); a connector that cannot carry it forces the documented exception state, and the matrix must say so before a tenant buys it |
| Authentication to us | The same tenant-scoped ingest boundary as a terminal, with its own device-class credential — never a shared or tenant-wide API key | A compromised connector must be revocable to one site |
| Residency | The connector's own processing location is recorded per tenant, because it is a sub-processor location | Regulated tenants' sectoral profiles bind their sub-processors (EV-085–087) |
| Exit | The punch stream must be reproducible without the connector — by ADMS push after a firmware upgrade, by SDK pull through our own agent, or by CSV | IG1: no pay-path leg is single-point-dependent on a vendor we do not control |
| Incident | An incident on the connector enters the same six-hour triage as our own ingest, as a possible IoT-class event (EV-062) | The terminals are the customer's and the connector is a third party's — whose report it is, is a triage question, and where unclear a counsel question (§16.12, §23) |

**When the pull path is the *only* path** — a plant network with no outbound HTTP, or a
pre-ADMS firmware — the on-prem agent is ours and the same rules apply to it, minus the
sub-processor terms. The agent holds no biometric data, stores punches only until
acknowledged, and is updatable without a site visit; the legacy port-4370 protocol it speaks
on old firmware is undocumented and reverse-engineered, with confirmed enrolment and
data-restore limitations (r2/04, [Verified]), so the agent's failure modes are recorded per
firmware in the matrix rather than assumed uniform.

> **[Killed]** — The retracted device-success figure (§16.4) prices and schedules connector
> coverage no better than it sizes the push path. Coverage stays **unsized** pending V-10 and
> V-11, which is why the register's `evidence_status` and the public matrix carry the
> uncertainty instead of a roadmap date.

---

### 16.5 Government statutory portals — the filing path

These are the integrations that carry the unit of delivery (§01). They share one brutal
property: **there is no submission API we are aware of** (K-13, §16.1). The
"integration" is *generate a portal-accepted artefact → submit it in an attended session,
by the employer or by our operator under written authority to act (§22) → capture and
reconcile the acknowledgement and receipt.* We are candid about this rather than
pretending an API exists. The operator path (Mode C) is fenced on counsel (Part D-17,
§23; §05.7 A-23; §20 V-25): until it clears, the employer is the one in the session
(Mode A, or Mode B with our operator guiding and never operating the portal, §22
FR-OPS-001), and everything below still holds for that session. In every mode the
statutory payment and any DSC-bound act are the employer's (§16.1).

**[Verified]** — **The corrigendum discipline applies to every file schema here.** Two
adversarial research rounds reached *opposite* conclusions on the Nov-2026 EPF cliff
because one read a notification without checking for a corrigendum (§02.4 standing
rule; the uncorrected S.O. 5319(E) enumeration is still reproduced on indiacode.nic.in —
verifying there alone reproduces the error). Every statutory file schema carries a
gazette/notification source (URL + date), and the statutory-change watcher (§16.12;
§02.4; §13.13; operated by §22's compliance data pipeline) must **catch amendments, not
just new instruments** — a watcher keyed only to new notifications would have missed the
corrigendum that inverted the entire Nov-2026 analysis.

<!-- DIAGRAM: integrations-api-portal-filing-map -->

**The filing lifecycle is §08's filing-instance state machine (FR-PAY-711), not a second
machine here.** **[Reversed]** An earlier version of this section specified its own
lifecycle (draft → validated → file-generated → upload-assisted → submitted →
acknowledged → paid → filed, with a flat five-year retention). It had no REJECTED, REVISED
or SUPPLEMENTARY state and no payment-initiation step, so it could not represent the rule
that a Revised ECR is impossible once payment is initiated (EV-037, Part E-1), and its
retention figure contradicted the per-rule-set wording of EV-054. This section owns only
the portal edge of FR-PAY-711: what the attended session does at VALIDATED → SUBMITTED,
what is captured at SUBMITTED → ACCEPTED or REJECTED, and which receipt closes
PAYMENT_INITIATED → FILED — per portal, in §16.5.1–§16.5.4. Only FILED counts as done;
the statutory verification gate sits immediately before PAYMENT_INITIATED (FR-PAY-301
M10); a stuck state raises the deadline clock, never hides it; and an unpublished format
or unresolved regime short-circuits to BLOCKED with its reason (FR-PAY-711 F2).

#### 16.5.1 EPFO — ECR, UAN, KYC

| Facet | Specification |
| --- | --- |
| **Contract** | Attended upload on the EPFO employer portal — interactive login with a CAPTCHA (r3/05) — by the employer, or by our operator under written authority to act (§22). Primary artefact: the monthly **ECR (Electronic Challan-cum-Return)** return file. Flow: upload → validate → return statement → approve/reject → Due Deposit Balance Summary → challan with TRRN → pay → receipt; return submission is separate from payment, an approved return can never be cancelled, and multiple challans are permitted (EV-036). Return types Regular, Supplementary and Revised, with the EV-037 guards (a Revised return only while no payment is initiated); strict month-wise chronological filing (EV-038); s.7Q interest auto-calculated and mandatory with the contribution (EV-039). **UAN:** since 1 August 2025 the employee allots and activates their own UAN through Aadhaar face authentication in the UMANG app; the employer route survives only for International Workers and citizens of Nepal and Bhutan (EPFO circular of 30.07.2025, r4/04; §10.8 FR-T-O07) — the product prompts, tracks and chases, never collects. What EPF Scheme 2026 para 25 says about Aadhaar, seeded bank account, PAN and UAN is known only from a secondary reproduction (§20 V-24), so no EPF onboarding step is conditioned on it. Supporting: KYC-seeding status, and the EPF forms and registers — whose catalogue under Scheme 2026 is not captured (`epf.form_catalogue`, §06.13), so the legacy Form 3A/6A/5/10/12A labels TallyPrime ships (EV-032) are carried as display names until it is. **Build against the Employees' Provident Funds Scheme, 2026** (12% re-notified retrospective to 21.11.2025 by S.O. 3582(E) — §06.2 [Verified]), not the repealed 1952 scheme. |
| **Data exchange** | Outbound: the ECR return file — UAN, Member Name as per UAN, Gross Wages, EPF Wages, EPS Wages, EDLI Wages, Employee PF Contribution, Employer EPS Contribution, Employer PF Contribution, NCP Days, Refund of Advance (EV-035); the part-payment contribution file is a separate 6-field export (EV-044; R2, §05.7 A-05). A NIL month uses no file: admin and inspection charges are paid through Direct Challan Entry, enabled only when there are no active members, as an attended task (EV-042; FR-PAY-712 AC-712.4). Inbound: the return file ID, return statement and Due Deposit Balance Summary; the **TRRN** at challan; after payment, the **receipt** — captured and stored as the proof-of-filing artefact (EV-036). On a failed upload EPFO returns a downloadable error file whose schema is undocumented and must be captured from a real rejection (r5/02; §20 V-23); until it is, an unmapped error is recorded as SA-PORT-UNMAPPED with the raw file attached and routed to §22 (FR-PAY-713 AC-713.4). |
| **Failure modes** | (1) **Wage-base error** — the 50% add-back (§06.10, §08) mis-computed → wrong EPF wages → wrong challan. (2) **UAN not allotted / KYC incomplete** → the member is flagged before file generation; the default is **exclude-and-flag** with notices to the operator and the employee — never a payroll block, because the product treats Aadhaar as optional everywhere, EPF flows included, and ships no hard-block configuration (Part E-11, Part D-10) — and the member follows on a Supplementary return (Part E-11, EV-037, FR-PAY-701 AC-701.2; final choice with counsel, §23). (3) **Delimiter/format drift** on an EPFO release → upload rejected (the September 2025 revamp did not change the layout, EV-035). (4) **Portal downtime / maintenance windows** near due dates. (5) **Arrears routed into the monthly file** — arrears use a separate File Arrear Return flow whose layout is unpublished and fenced (EV-043); PF liability on arrears dates from the disbursal date (Part E-9). (6) **The cliff:** the one-year saving of the EPF Scheme 1952, EDLI 1976 and EPS 1995 expires on or about 21 Nov 2026; the EPF side has a named successor (Scheme 2026, §06.9), but research captures no EPS or EDLI successor instrument, and we are not aware of one as of September 2026 (§06.13; §20 V-22), so the EPS/EDLI split on post-cliff ECR lines is watched, and any field or form change arrives through the watcher. (7) **NCP-days error** — non-contributory (loss-of-pay) days wrong → contribution mismatch. (8) **Chronology gap** — a skipped month blocks later Regular returns under the M−4 rule, and a wrongly recorded exit date needs a joint declaration (EV-038, EV-041; FR-PAY-712). |
| **Fallback** | The attended session is the primary path; the ECR file is also always downloadable so the employer or their CA can run the session without us — the product never becomes a single point of failure for a statutory deadline. A **pre-upload validator** mirrors EPFO's documented checks at EPFO's own severity — the age-58 EPS rule blocks, the post-01.09.2014 high-earner EPS rule only flags (EV-040) — and adds no block EPFO does not impose. Status runs on FR-PAY-711: FILED needs the approved return's file ID, the TRRN and the payment receipt, and the verification gate sits immediately before payment initiation (EV-037, FR-PAY-301 M10). The challan payment itself is always made by the employer, in every delivery mode (§22 FR-OPS-001). |

**The ECR return-file line layout (the schema object, concretely).** The ECR return file
is a `#~#`-delimited text file — three characters, 10 delimiters per line — with one line
per member, **no header row** and 11 fields; Gross Wages is mandatory (EV-035; Source:
EPFO User Manual ReECR v3.0 p.8, r5/02). Wage Month, Return Type, Contribution Rate and
Remark are portal form controls, never file content (EV-035). The EPFO Help File sample
line is the golden fixture (§06.14 TV16).

| # | Field (EV-035) | Rule / worked value |
| --- | --- | --- |
| 1 | UAN | the member's UAN; EPFO validates UAN and member details and rejects invalid rows before approval (r3/05) |
| 2 | Member Name as per UAN | as held against the UAN |
| 3 | Gross Wages | ₹30,000 |
| 4 | EPF Wages | ₹15,000 (statutory ₹15,000 wage ceiling, §06.2) |
| 5 | EPS Wages | ₹15,000 (EPS wage ceiling ₹15,000) |
| 6 | EDLI Wages | ₹15,000 |
| 7 | Employee PF Contribution | ₹1,800 (12% × 15,000) |
| 8 | Employer EPS Contribution | ₹1,250 (8.33% × 15,000, capped at ₹1,250) |
| 9 | Employer PF Contribution | ₹550 (balance of the employer's 12% after EPS: 1,800 − 1,250) |
| 10 | NCP Days | 0 |
| 11 | Refund of Advance | 0 |

**Worked example — the 50% add-back that drives EPF wages (§06.10 [Verified]).** This is
the hardest single calculation in the build (§06.10), and it is what makes field 4 above
correct. **[Reversed]** An earlier version of this example reached its 60% by treating a
₹10,400 "special allowance" as excluded; special allowance is not an excluded head, and
relabelling universal pay does not move it out of wages (§06.10, *Vivekananda
Vidyamandir*, §06.2). Consider instead an employee at ₹30,000/month structured as Basic
₹12,000, HRA ₹9,000, Conveyance ₹3,000, Commission ₹6,000.

- **Excluded components** (HRA + conveyance + commission, all among the excluded heads
  (a)–(i) of s.2(y)/s.2(88)) = ₹9,000 + ₹3,000 + ₹6,000 = **₹18,000 = 60% of total**.
- The proviso caps exclusions at **50%** of total remuneration = ₹15,000. Excess =
  ₹18,000 − ₹15,000 = **₹3,000 is deemed wages and added back.**
- **Add-back wage base** = (₹30,000 − ₹18,000) + ₹3,000 = ₹12,000 + ₹3,000 = **₹15,000**.
- EPF wages = min(₹15,000 add-back base, ₹15,000 ceiling) = **₹15,000** → fields 4–6.

The engine runs **at least four concurrent wage bases per employee-period** (§06.10); two
of them matter to this file: the add-back base (₹15,000, drives PF/EPS/EDLI/gratuity) and
the equal-pay/payment-of-wages base (₹30,000, includes HRA and conveyance). The rule
version is effective-dated because "50%" is a notified variable, not a constant — an
arrear run recomputes against the version in force for the corrected period, not today's.

**EPF amounts for this member (what the portal's Due Deposit Balance Summary must
reconcile to, and what ties to the Tally voucher, §16.2).** The challan itself is
generated by the portal after the return is approved (EV-036); these are the computed
amounts it is reconciled against, plus any s.7Q interest the portal calculates (EV-039).

| Head | Rate | Amount (₹) |
| --- | --- | --- |
| A/c No. 1 — EPF (employee 12% + employer balance after EPS) | 12% + balance | 1,800 + 550 = 2,350 |
| EPS (employer 8.33%, capped at ₹1,250) | 8.33% × 15,000 | 1,250 |
| EPF admin charges | 0.50% of PF wages **[Hypothesis]**; establishment-level minimum = parameter `epf.admin_charge.minimum` | 75 for this member; the minimum applies once per establishment per wage month |
| EDLI (employer 0.50%) | 0.50% × 15,000 | 75 |
| EDLI admin charges | nil **[Hypothesis]** | 0 |

(EPF, EPS and EDLI rates per §06.2 **[Verified]**. The admin-charge rate and the nil EDLI
admin charge rest on pre-Code EPFO circulars that were not re-verified, and the minimum is
unset data — both are §06.2 **[Hypothesis]** items routed through §06.13 to §20; v0.3's
rupee minimums are not carried. The amount the product reconciles against is always the
portal's own Due Deposit Balance Summary, whose account-head numbering is read, never
hard-coded. Rates re-verify against notification — the watcher owns this.)

#### 16.5.2 ESIC — contribution and IP management

| Facet | Specification |
| --- | --- |
| **Contract** | Attended template upload on the ESIC employer portal (K-13; §22): monthly **contribution upload** → challan generated on the portal → payment by the employer. We are not aware of any published API, file specification or bulk machine interface as of September 2026 (r3/05); whether employer login carries a CAPTCHA is not captured (§20 V-23). IP (Insured Person) registration for new joiners; wage-ceiling gate at ₹21,000 (₹25,000 for a person with disability) (§06.3). |
| **Data exchange** | Outbound: the monthly contribution template. Practitioner sources describe an Excel template of roughly six columns — IP number, IP name, number of days, total monthly wages, reason for zero wages, last working day — but the template itself 404s and the column list is **unconfirmed** from an ESIC primary source (r3/05, low), so the upload file waits on a capture task (§05.7 A-08; fence F-05): the schema object — columns, order, file type, and whether a DSC is needed — is captured from the ESIC portal inside an attended session on a design partner's registration (§20 V-23) and versioned as `esic_mc_template_version` before the generator is written. If the capture finishes before the R1 gate the file ships in R1 (C-12); if not, it moves to R2 by rule (§05.17). Until then ESI is computed and shown as a worksheet the operator keys into the portal's template. EE 0.75% + ER 3.25% (§06.3 [Verified]); the rates and ceiling predate the 8 May 2026 Rules and are re-baselined against them and against the post-cliff position (§05.7 A-07). Inbound: challan + payment confirmation as proof-of-filing. |
| **Failure modes** | (1) **Ceiling-crossing mid-cycle** — an employee crossing ₹21k mid-contribution-period must be handled per the "continue to period end" rule; a naive cutoff mis-files. (2) **IP not registered** → member rejected. (3) **Applicability by area** — ESI applies in notified areas only; a location not in a notified area shouldn't file. (4) **Portal timeout on large files.** (5) **The ESI side of the Nov-2026 cliff is unresolved** — we are not aware of any successor instrument for the ESI rules, regulations and schemes after the one-year saving expires on or about 21 Nov 2026, as of September 2026 (§06.9, where it is an ungraded open item, EV-004, not a [Verified] fact); this is §20 V-08, fence A-09, and a hard dependency. (6) **Incomplete TLS chain** — esic.gov.in serves an incomplete certificate chain, which breaks naive HTTP clients and any automation built against it (r3/05). |
| **Fallback** | Downloadable contribution worksheet — and, once `esic_mc_template_version` is captured, the filled template — for the employer or their CA to upload; pre-validation of ceiling and IP status; area-applicability check per location; **BLOCKED-pending-regime** for post-cliff ESI rather than emitting a guessed file (FR-PAY-711 F2; §08.13 G7 — blocked states are honest). |

**Worked example — the two contribution periods and mid-cycle ceiling crossing.** ESI runs
on fixed contribution periods **April–September** and **October–March**, with benefit
periods lagging (§06.3; Source: ESIC contribution/benefit-period rules). An employee earning
₹20,000 in April gets a raise to ₹23,000 effective July (mid-period). The **"continue to
period end" rule** means: because they were covered at the start of the April–September
period, contribution continues on the *full ₹23,000* until 30 September — they do **not**
drop out on crossing ₹21,000. From the next period (October) they are out of ESI. A naive
"stop at ₹21k the month they cross" cutoff under-files three months and creates a
recoverable default. Contribution at ₹23,000 for July, before rounding: EE 0.75% =
₹172.50 and ER 3.25% = ₹747.50. The rounding of each share is the parameter
`esi.rounding_rule` (§06.3 — v0.3's "round up to the next rupee" is carried, not
re-captured, **[Hypothesis]**, routed through §06.13 to §20); the upload never carries an
assumed ₹173 or ₹748 until that parameter is set from an ESIC source.

#### 16.5.3 TRACES / Income-Tax e-filing — TDS (Form 138 ex-24Q, Form 130 ex-16)

This is the most volatile file schema in the product because the format is a **breaking
layout change on a dual FVU stack** (EV-051, EV-052; §06.5).

| Facet | Specification |
| --- | --- |
| **Contract** | Quarterly TDS statement **Form 138 (ex-24Q)**, governed by Rule 219 of the Income-tax Rules 2026 (EV-049), for **Q1–Q3**. The product generates the statement `.txt`; the **deductor** runs Protean's Java File Validation Utility against it together with the `.csi` file from the TIN Challan Status Inquiry, and uploads the resulting `.fvu` on the income-tax portal — or our operator does so in an attended session under written authority (K-13, §22; r3/05). Two of the four attended-filing questions bite here specifically — whether filing a TDS statement for a deductor engages the e-Return Intermediary route, and how the authorised signatory's personal DSC is handled — and whether a DSC or EVC is needed at `.fvu` upload is itself unconfirmed (r3/05 open question); all are under counsel review (Part D-17, §23), and until they clear the deductor uploads (§05.7 A-23). **Form 130 (ex-Form 16)** is **TRACES-generated only** and has Parts A, B and C; a certificate not generated from TRACES is invalid (EV-048). TRACES builds it from Annexure I (quarterly) and Annexure II (Q4) of Form 138, so the product prepares the Form 138 data and distributes the signed certificate the deductor requests and downloads from TRACES (r5/02; FR-PAY-707). **[Reversed]** An earlier version had us download Part A from TRACES and generate Part B ourselves; that is invalid on both counts. Also: TDS deposit tracking (challan identification captured on payment) and challan-to-deductee mapping; the deposit due dates sit in Rule 218, which has not been read, so deposit timing is judged only once fence F-10 clears (§05.7 A-10; §20 V-20). |
| **Data exchange** | Outbound: the Form 138 statement — ASCII `.txt`, `^`-delimited variable-width fields, every record CRLF-terminated, record types FH / BH / CD / DD, file type `SL1` (EV-051); challan sub-headings remapped to A–K with 303 removed and Annexure I remapped to C–N with 313, 321, 322 and 325 removed; Interest Allocation and Others Allocation added; Surcharge, Education Cess and Penalty/Others removed (EV-051; Source: Protean RPU/FVU 1.2 key features; Q1–Q3 regular format 22 Jul 2026, Q1–Q3 correction format 4 Aug 2026, r5/02). Form 138 has three annexures: Annexure I every quarter; Annexures II and III in Q4 only (EV-047). Tax Year field is six digits (202627 for Tax Year 2026-27), and labels, search and imports accept both vocabularies (EV-050). Inbound: the FVU validation result; the Return Receipt Number (which replaces Token No., EV-051); the TRACES-downloaded, deductor-signed Form 130 for distribution (EV-048). |
| **Failure modes** | (1) **The Q4 regular and correction formats are unpublished** ("Expected to be released soon", no link; re-checked September 2026, EV-046) → Q4 and Tax Year 2026-27 Form 130 preparation are blocked until they land (fence F-01; the release watch is §20 V-19, keyed on Protean's Q4 anchors, never its client-side "Updated As On" footer). (2) **PAN missing or inoperative** → higher-rate deduction (1961-Act s.206AA for FY 2025-26 and earlier; the 2025-Act successor is unmapped, §06.13, FR-PAY-205 AC-205.3) and statement defects. (3) **Challan mismatch** — a deposit not yet reflected in the `.csi` from the TIN Challan Status Inquiry; the TAN and TAN name must match it (r5/02; AC-706.2). (4) **Regime mis-election** (old vs new; the new regime is the default under 1961-Act s.115BAC, its 2025-Act successor unmapped, §06.13) at employee level → wrong TDS. (5) **FVU stack mixing** — RPU 1.2 + FVU 1.2 serve Tax Year 2026-27 onward and RPU 6.0 + FVU 9.5 serve FY 2010-11 to FY 2025-26; mixing them, or replacing only the FVU jar in an old folder, causes rejection (EV-052; r5/02). (6) **Correction filing not yet open** — the Q1–Q3 correction format is published (4 Aug 2026, r5/02) and generation and FVU validation are buildable, but in September 2026 the e-filing portal said Tax Year 2026-27 correction statements "will be enabled shortly" (r3/05), so correction *submission* is held while fence F-02 is open (§05.7 A-12). (7) **Legacy correction layout not held** — a correction to a FY 2025-26 or earlier 24Q statement would go through the legacy RPU 6.0 + FVU 9.5 stack (EV-052), but the legacy correction layout itself is not in this PRD's evidence base, so that artefact is deferred (§05.7 A-28): the product flags it and routes it to the prior vendor or the tenant's CA rather than generating it. |
| **Fallback** | The statement `.txt` is always downloadable for the deductor or their CA to validate through the FVU and upload — the path Zoho Payroll's own documentation describes (r3/05). **Q4 Form 138 (Annexures II and III) and Tax Year 2026-27 Form 130 preparation render BLOCKED-pending-layout** (EV-046; FR-PAY-711 F2), never silently emitted with guessed field mapping, and the legacy 24Q Q4 layout is never used as a proxy (§08.13 G7). The mandatory `.csi` import flags un-reflected challans before generation (AC-706.2). |

**Worked example — the challan-head remap that breaks a hard-coded layout.** **[Reversed]**
An earlier version of this example applied the new layout to a "Q2 FY26" return and
mapped sub-heading 304 to TDS and 305 to surcharge; FY 2025-26 statements stay on the legacy
24Q stack (EV-052), and the published remap sends 304 to C ("Total Interest") and 305 to
D ("Total Fee") (r5/02). Correctly: in October 2026 the same deductor may owe a **Q2
statement for Tax Year 2026-27**, generated as Form 138 — challan sub-headings 301 → A,
302 → B, 303 removed, 304 → C, 305 → D; Surcharge, Education Cess and Penalty/Others gone;
Interest Allocation and Others Allocation added (EV-051) — and a **correction to a Q2
FY 2025-26 statement**, which belongs on the legacy 24Q layout and the RPU 6.0 / FVU 9.5
stack (EV-052). A vendor who hard-coded column ordinals, or who switches layout by today's
date, mis-files one of the two. Our schema object routes by **period**: the Form 138
layout covers Tax Year 2026-27 onward, with the Protean release (22 Jul 2026) recorded as
its source, and the watcher (§16.12) routes each new release to it before any statement
is generated. The FY 2025-26 correction resolves to the legacy stack — and, because the
legacy correction layout is not held, to a deferred artefact that the product flags and
hands to the prior vendor or the tenant's CA (§05.7 A-28), never to the Form 138 writer.

#### 16.5.4 State Professional Tax (PT) and Labour Welfare Fund (LWF)

| Facet | Specification |
| --- | --- |
| **Contract** | Per-state PT return + payment on each state's portal, at a cadence that is per-state data (Maharashtra assigns frequency per registration each financial year and publishes it on MAHAGST — ingested, never derived; Odisha is annual; every other state is not captured, §06.4); per-state LWF contribution on each state's labour-welfare portal at a periodicity that is also data (`lwf.<state>.periodicity`; Karnataka's calendar-year cycle due 15 January is the one verified, §06.8). Each is an attended session on a manual portal — Maharashtra's MAHAGST offers e-Return PT and e-Payment for PTRC/PTEC with no API (r3/05) — so state PT is N portals, not one integration (K-13). These are the most fragmented interfaces in the product — **one schema and cadence per state.** |
| **Data exchange** | Outbound: the state's PT return and LWF remittance, each a per-state schema object — `pt.<state>.return_schema` and `lwf.<state>.remittance_schema` — captured from that state's portal or instrument and published in the state onboarding pack (§22 FR-RULE-017) before the leg ships (§20 V-09). No state's return or remittance field list is captured in this PRD's research, Maharashtra's included (its return format and due day are open, `pt.MH.due_day`; §05.7 A-15), so none is assumed here. Inbound: challan/receipt. **[Reversed]** Earlier text said Frappe HR "already ships PT across 15+ states and LWF across 14, free" and concluded this was parity. That is false from source code: Frappe HR v16's whole India payroll is three files and 549 lines with no Indian state name anywhere in the tree and no PT slabs or LWF (EV-031), and TallyPrime has no state PT slab table and no LWF engine (EV-032). **Multi-state PT and LWF are a genuine differentiator — greenfield in both incumbents** (K-01). |
| **Failure modes** | (1) **Slab drift** — states revise PT slabs and gender variants; a stale slab mis-computes (Maharashtra and Odisha are verified at state primary sources, Karnataka's effect is verified with its instrument not retrieved, every other state is unverified — §06.4). (2) **Registration-not-done** per state/location — MAHAGST runs PTRC (employer deduct-and-remit) and PTEC (the entity's own liability) as separate e-return and e-payment flows (r3/05); the two-registration structure is **[Hypothesis]** as a general rule elsewhere (§06.4). (3) **Cadence confusion** — filing monthly where the state wants annual, or vice-versa. (4) **Portal-per-state** availability and format variance. (5) **Gender/exemption variants** — Maharashtra's threshold for women differs from men's (nil up to ₹25,000, §06.4); every other state's variants are captured per state (§20 V-09), never assumed. |
| **Fallback** | Downloadable per-state file/return; **effective-dated per-state slab tables** with state-primary provenance (a build dependency — the verified PT/LWF dataset for every state is undone work, §20 V-09, maintained by §22's compliance data pipeline). Where a state has no usable portal export, produce the **filled human-readable return** for manual entry. Phasing follows §05.5 and §05.17: in R1 only computation ships, and only for states whose row is state-primary-sourced — Maharashtra at R1 entry (C-16); every PT return leg and every LWF remittance is R2 per design-partner state as its fence ships (A-15, A-16, A-17; PR-03); the all-states dataset is P2 (item 23). |

**Worked example — same salary, four states, one national table cannot represent them.**
An employee earning ₹30,000 gross/month triggers different PT depending on the state of
the place of work, which is why PT must be effective-dated *per state* and never a single
national table (rows per §06.4):

| State | Monthly PT on ₹30,000 | Cadence | Status |
| --- | --- | --- | --- |
| Karnataka | ₹200 (₹300 in February) | Unverified | **[Verified]** effect on the state PT portal — ₹200/month at ₹25,000 or above, ₹300 in February, ₹2,500 a year |
| Maharashtra (man) | ₹200 (₹300 in February) | Assigned per registration each financial year | **[Verified]** at state primary source; PTRC and PTEC are separate MAHAGST flows (r3/05) |
| Odisha | ₹200 for the first 11 months and ₹300 for "the last month" — because the slab tests **annual** income (₹3.6 lakh here, above ₹3 lakh), not the monthly figure | Annual, online only | **[Verified]** at state primary source; which month is "the last month" (February or March) is **[Hypothesis]**, and a reported April 2026 repeal ordinance is unconfirmed (§06.4) |
| West Bengal, Tamil Nadu and every other state | Not captured — parameter `pt.<state>.slabs` (Tamil Nadu: `pt.TN.<local_body>.slabs`, a local-body levy) | Not captured | **[Hypothesis]** — v0.3's figures are not shipped (§06.4) |

**[Reversed]** An earlier version of this table gave West Bengal a slab (₹25,001–40,000 =
₹150) that contradicted its own ₹200 answer at ₹30,000, gave Karnataka no February
top-up, and said only Telangana was verified; its West Bengal ₹200 answer and Tamil Nadu
half-yearly cadence are not captured at any state source (§06.4) and are removed, with
Odisha — verified, and structurally different — in their place. Kill/validate criterion for the
[Hypothesis] rows: each state's slab must be replaced with a state-primary-sourced,
effective-dated entry before that state ships; until then the state renders its PT with a
"slab unverified — confirm before filing" banner rather than emitting a silent figure
(§20 V-09). Evidence status is not ship status: Karnataka and Odisha are [Verified] in
effect above, yet both stay fenced (§05.7 A-16) — Karnataka because its amending
notification was not retrieved, Odisha because a reported repeal from 1 April 2026 is
unconfirmed — and only Maharashtra's computation is in R1 (C-16).

**Master acceptance criteria (statutory portals).**

- **AC-GOV-1:** Every generated statutory file passes an **in-product pre-validator** that
  mirrors the portal's/FVU's documented checks at the portal's own block/flag severity
  (EV-040) and adds no block the portal does not impose, so the modal outcome of an upload
  is acceptance, not rejection.
- **AC-GOV-2:** Filing status runs on the FR-PAY-711 machine: only **FILED** — the
  acknowledgement stored (return file ID and TRRN for the ECR; Return Receipt Number for
  Form 138) and, for a payment-bearing filing, the payment receipt — counts as done; a
  SUBMITTED or ACCEPTED filing is not "done", and a REJECTED one is counted, never hidden
  (§01, §08.13 G5).
- **AC-GOV-3:** Every file schema is a versioned object with a gazette/notification source
  (URL + date); a format change is a data update, not a code deploy (§16.1).
- **AC-GOV-4:** Formats that **are not yet published** (Q4 Form 138 and Tax Year 2026-27
  Form 130 preparation, EV-046; the ECR arrear return, EV-043) and regimes that are
  **unresolved** (post-cliff ESI) render as explicit BLOCKED states, never as
  silently-emitted guessed files.
- **AC-GOV-5:** The statutory-change watcher fires on **amendments/corrigenda**, not only
  new notifications, and routes each hit to the owning schema for review.
- **AC-GOV-6:** The 50% add-back is one of at least four concurrent wage bases per
  employee-period (§06.10), and an arrear/retro run recomputes against the rule version in
  force for the corrected period (§06.10 [Verified]), verified by a retro-recompute test.

> **[Hypothesis]** — *Automation inside the attended session (browser assistance that
> fills and uploads while a named human is present for login, CAPTCHA and OTP) is worth
> building for the top three portals.* It never makes submission unattended: EPFO's
> CAPTCHA on login makes unattended automation impossible by design (r3/05), and no CAPTCHA
> is ever bypassed. Every such session runs under the employer's written authority to act
> and is logged (§22). Whether portal terms of use permit third-party credential use, and
> the other attended-filing questions, are under counsel review (Part D-17, §23) — no
> automation ships before that clears. Kill/validate criterion: if portal anti-automation
> (CAPTCHA, session fingerprinting, terms of use) makes it fragile or non-compliant, drop it
> and stay at generate-file-plus-guided-attended-upload. It is never the *only* path — the
> downloadable file is always available.

#### 16.5.5 Attended automation — the capability ladder, and what never automates

§22 owns the runbooks: who acts, on whose credentials, what the customer approves and what
the audit entry says. This subsection owns the **technical ladder** — what software is
permitted to do inside a portal session at each rung, what evidence each rung produces, and
where the rungs stop. It exists because "attended automation" is not one thing, and a
roadmap that does not distinguish the rungs will drift upward without anyone deciding to.

| Rung | What the software does | What the human does | Evidence produced | Status |
| --- | --- | --- | --- | --- |
| **L0 — Artefact only** | Generates the portal-accepted file and the pre-validation report | Everything on the portal | The file, its schema version, the validation report | **Ships in R1 for every portal.** This is the floor and it is never removed |
| **L1 — Guided session** | Renders a step-by-step checklist keyed to the portal's actual flow, with the values to enter, and captures what came back | Logs in, enters, uploads, pays, downloads | L0 plus a per-step record of what was entered and what was returned | R1. Mode A and Mode B both run here (§22 FR-OPS-001) |
| **L2 — Assisted field entry** | Fills form fields the human has opened, from the engine's own computed values | Logs in, solves the CAPTCHA, reviews every filled field, submits | L1 plus the field-fill log with before-and-after values | Fenced on counsel (Part D-17) and on each portal's terms |
| **L3 — Assisted navigation and upload** | Navigates within an authenticated session the human opened, attaches the file, reads back the response | Logs in, solves the CAPTCHA, holds the OTP factor, presses every irreversible control | L2 plus the full session transcript | Fenced. Never reached for a payment step |
| **L4 — Unattended submission** | — | — | — | **Forbidden. Not a roadmap item, at any priority, for any portal.** |

**The five hard bars.** Each is a property of the software, not a policy in a handbook:

1. **No CAPTCHA is solved, bypassed, outsourced or re-used.** EPFO's establishment sign-in
   serves a CAPTCHA (r3/05), and that makes unattended automation impossible *by design* —
   which is a feature of the design, not an obstacle to route around.
2. **No OTP is entered, stored, forwarded or requested by us**, on any portal or any bank.
   The factor stays with the employer's authorised person.
3. **No Digital Signature Certificate is held, mounted, or invoked by us.** How the
   authorised signatory's personal DSC is handled is one of the four open attended-filing
   questions (Part D-17), and whether a DSC or EVC is even required at `.fvu` upload is
   itself unconfirmed (r3/05 open question).
4. **No statutory payment leg is ours in any mode** (§16.1; §22). The challan is paid by the
   employer.
5. **No irreversible control is pressed by software at L2 or L3.** Submit, approve, pay and
   confirm are human acts. At L2 and L3 the software prepares; the human commits.

**Per-portal ladder position, and what would move it.** Captured September 2026.

| Portal | Rung today | What blocks the next rung | Where it is tracked |
| --- | --- | --- | --- |
| EPFO employer portal | L1 | Counsel on credential use under employer authority (Part D-17); the portal's terms of use | §05.7 A-23, §20 V-25 |
| ESIC employer portal | L1, and the artefact itself is incomplete until the template is captured | The template capture (§20 V-23) before L0 is even complete; then counsel as above. An incomplete TLS chain on the host also constrains any tooling built against it (r3/05) | §05.7 A-08, F-05 |
| Income-tax portal and Protean FVU | L1, and the FVU step is structurally human | The FVU is a Java desktop utility the *deductor* runs (EV-052; r3/05) — an automation would need a job runner with a JRE under the deductor's own control, which is a different arrangement, not a different rung. Plus two of the four counsel questions bite here specifically | §05.7 A-12, A-23; Part D-17 |
| TRACES | L0 only | Form 130 is TRACES-generated and deductor-downloaded (EV-048); there is no artefact for us to submit | §08 FR-PAY-707 |
| State PT and LWF portals | L1 per state, where the state's schema is captured | No state's return or remittance field list is captured (§06.4, §06.8), so L0 is not yet complete for any state | §20 V-09; §05.7 A-15 to A-17 |

**The escalation test.** Before any rung above L1 is built for a portal, three questions are
answered in writing and filed: (a) does the portal's terms of use permit a third party to
act under the employer's credentials; (b) does the act engage a registered-intermediary
route that we do not hold; (c) is there a step at which a human's absence would make the
filing invalid? Any unanswered question keeps the portal at L1. This is the integration-side
expression of §22's four counsel questions, and it fails closed.

#### 16.5.6 The portal evidence pack — what a filing must leave behind

A filing that reached FILED but cannot prove it is not a filing. Each portal leg therefore
has a defined **evidence pack**: the exact artefacts that must exist, hashed and stored,
before FR-PAY-711 permits FILED. The pack is also what an inspection, a migration tie-out
(§16.7) and a dispute are answered from.

| Portal leg | Artefacts required for FILED | Captured at |
| --- | --- | --- |
| **EPFO ECR — Regular, Supplementary, Revised** | (1) the emitted `.txt` with its schema version; (2) the pre-upload validation report; (3) the return file id; (4) the approved return statement; (5) the Due Deposit Balance Summary; (6) the challan carrying the TRRN; (7) the payment receipt (EV-036) | Upload, approval, challan generation, payment |
| **EPFO NIL month** | The Direct Challan Entry record and its receipt — **no file exists**, and an absent file is the correct state, not a gap (EV-042) | Attended session |
| **EPFO part-payment** | The 6-field part-payment file (EV-044) plus the resulting challan and receipt | R2 leg (§05.7 A-05) |
| **ESIC contribution** | The contribution worksheet, the uploaded template once `esic_mc_template_version` is captured, the portal challan and the payment confirmation | Attended session |
| **TDS Form 138 Q1–Q3** | (1) the statement `.txt` with its RPU/FVU stack version; (2) the `.csi` used; (3) the `.fvu` the FVU produced; (4) the FVU validation report; (5) the Return Receipt Number (EV-051) | Generation, FVU run, upload |
| **Form 130** | The TRACES-generated, deductor-signed certificate as distributed, with its distribution record per employee (EV-048) | Distribution |
| **State PT / LWF** | The state's return as filed, the challan and the receipt, each against that state's captured schema version | Per state |

**Five properties of the pack**, each testable:

| # | Property | Mechanism |
| --- | --- | --- |
| P1 | **Content-addressed.** Every artefact is stored with a hash; the hash is what the filing record references | A re-generated file that differs from the one filed is detectable, which is the whole point |
| P2 | **Verbatim, including failures.** A portal's rejection message, its error file, and its own wording are stored as received — never normalised away. Where the error file's schema is undocumented, as EPFO's is, the raw file is attached and the error is recorded as `SA-PORT-UNMAPPED` (FR-PAY-713 AC-713.4; §20 V-23) | The first real rejection is how the mapper gets built |
| P3 | **Schema-version stamped.** Every artefact names the schema object version that produced or parsed it | Makes a later layout change auditable against the periods it touched (EV-051, EV-052) |
| P4 | **Retention by rule-set, not by a flat figure.** Filing artefacts inherit §14.7's retention classes, which follow each rule-set's own wording — Wages r.51(4) "five years after the date of last entry" against OSH r.72(1)(vii) and SS r.53(1)(e) "five **calendar** years", which are not identically worded (EV-054). State-sphere periods are unknown and go to counsel (Part D-11) | No flat retention constant appears in this section |
| P5 | **Access-controlled and minimal.** The pack is readable by the tenant's authorised roles and by the operator who ran the session, under §22's "what we did on your behalf" log. It carries no Aadhaar number (Part E-6) | An evidence pack is a concentration of statutory identifiers by construction; minimisation is not optional in it |

- **AC-GOV-7:** FR-PAY-711 cannot reach FILED for a leg whose evidence pack is incomplete;
  the missing artefact is named on the filing record, and the deadline clock keeps running
  and stays visible.
- **AC-GOV-8:** Every artefact in a pack is content-addressed, and re-generating the file
  after FILED produces a detectable difference rather than silently replacing the record.
- **AC-GOV-9:** A portal rejection is stored verbatim, with its raw error file where one is
  returned, and carries exactly one §08 family code plus one §16.12.1 canonical code.
- **AC-GOV-10:** A NIL month closes with a Direct Challan Entry record and no file, and the
  absence of a file never renders as a missing-artefact exception (EV-042).
- **AC-GOV-11:** No evidence pack contains an Aadhaar number, and a pack that would is
  refused at write time rather than redacted afterwards (Part E-6).
- **AC-GOV-12:** Each artefact names the schema version that produced it, and a query by
  schema version returns every filing that used it — the precondition for assessing the blast
  radius of a layout correction.

---

### 16.6 Accounting systems beyond Tally

For tenants whose book of record is not Tally, the payroll journal must post to their GL.

| Facet | Specification |
| --- | --- |
| **Contract** | Zoho Books, Busy, and generic ERP (SAP/Oracle/MS Dynamics/NetSuite) GL. Zoho Books has a real REST API — OAuth 2.0, an India data centre and a full journals operation set (r3/05); we found no public API or developer documentation for Busy (r3/05); ERP targets are treated as file/DI (data-interchange) until a customer's ERP is scoped. **[Reversed]** QuickBooks India is removed from this list: per Intuit's India page, new sign-ups ended in July 2022 and there has been no access to QuickBooks products in India since 1 July 2023 (r3/05). |
| **Data exchange** | Same payroll journal voucher as §16.2 (debits/credits by expense and payable head), mapped once to the target chart of accounts. Zoho Books: one consolidated create-journal call per pay run (optionally split per department or cost centre, never one call per employee), against the India data centre — Zoho publishes 100 requests per minute per organisation and a daily cap as low as 1,000 requests on its free plan (r3/05), so per-employee posting would breach it. ERP/Busy: emit the DI file (CSV/XML/IDoc-style) to the customer's mapping. |
| **Failure modes** | (1) **Chart-of-accounts mismatch** — target account codes don't match our mapping. (2) **API auth expiry** (OAuth token refresh). (3) **Period locked** in the accounting system (closed month) → post rejected. (4) **Rounding** — GL posts must tie to the payslip and bank totals to the rupee. (5) **Duplicate journal** on retry. (6) **GST/TDS interplay** — a payroll journal must not accidentally touch GST input ledgers. (7) **Rate limit** — HTTP 429 on breach of Zoho's per-minute or daily cap (r3/05) → backoff and retry under the same `payrun_id` key. |
| **Fallback** | Universal downloadable journal (CSV/Excel) for any accounting system; idempotent posts keyed on `payrun_id`; a closed-period rejection opens an exception rather than failing silently. GL posting is downstream of disbursement and filing, so an accounting-integration failure never blocks pay or filing. |

**Acceptance criteria.**

- **AC-ACC-1:** A journal posted to Zoho Books balances and ties to the bank
  disbursement and payslip totals to the rupee.
- **AC-ACC-2:** Token expiry triggers a silent refresh; a hard auth failure raises an
  actionable reconnect prompt, never a lost journal.
- **AC-ACC-3:** A post to a locked accounting period opens an exception with the target
  period surfaced, never a silent drop or a mis-dated re-post.

#### 16.6.1 The journal abstraction — one posting, three delivery modes

The design error this subsection forecloses is modelling GL posting as "an accounting API
integration". It is not one, because the three targets in this market are structurally
different: one cloud GL publishes a clean OAuth 2.0 REST surface with a full journals
operation set and an India data centre; one incumbent's documented gateway is an HTTP server
inside the customer's own process on a LAN port; and one publishes **no API at all**, its
integration story being data migration rather than programmatic posting (r3/05, findings 16,
15 and 18). One abstraction, three deliveries.

| Layer | Responsibility |
| --- | --- |
| **The journal** | A balanced set of debit and credit lines with amounts, heads and a `payrun_id`, produced once per pay run from the LOCKED month. It is the same object in all three modes, and §16.2's worked voucher is its canonical instance |
| **The mapping** | Tenant-confirmed map from our heads to the target's chart of accounts, versioned, with a named suspense head for anything unmapped (AC-TLY-4). Confirmed once at onboarding, reused every month, re-confirmed when the target's chart changes |
| **The delivery** | API push · file export · local connector. Selected per tenant, swappable without changing the journal or the mapping |

| Mode | Mechanics | Constraint that shapes it |
| --- | --- | --- |
| **API push** | One consolidated create-journal call per pay run against the tenant's region, optionally split per department or cost centre | Published limits of 100 requests per minute per organisation, a daily cap as low as 1,000 on a free plan, and a concurrency of 5 to 10 (r3/05) make **per-employee posting a breach by arithmetic**, not a style preference: a 200-person run is 200 write calls against a published ceiling of 100 a minute, so it breaches the per-minute limit on any plan, and consumes a fifth of the free plan's whole daily budget on one pay run before a single other call is made |
| **File export** | CSV or Excel journal, human-readable and human-postable | The universal floor. Available in every mode, including as the dry-run preview before an API push |
| **Local connector** | §16.2.1 | For a book of record that is not internet-reachable |

**Three invariants across all modes.** (1) The journal balances to the rupee and ties to the
bank disbursement total and Σ payslips before it is offered in *any* mode — the three-way tie
of AC-TLY-1 is a property of the journal, not of a delivery. (2) Idempotency is the
`payrun_id` external key in every mode, so a retry after a timeout cannot double-post. (3) GL
posting is downstream of disbursement and filing, so no accounting failure in any mode blocks
pay or a filing — which is why the whole layer is P1, R2 (§05.17 PR-13).

- **AC-ACC-4:** The same pay run, posted through all three modes into three targets, produces
  journals whose debits, credits and per-head totals are identical to the rupee.
- **AC-ACC-5:** A tenant switching delivery mode mid-year changes no journal content and
  re-uses the existing mapping version; the switch is recorded against the tenant.
- **AC-ACC-6:** No posting path issues more than one write call per pay run per target
  organisation by default, and a configuration that would issue one per employee is refused
  with the counterparty's own published cap named in the message.

---

### 16.7 HRIS migration and importers

**[Hypothesis]** — **Migration is a first-class product surface, not a services task**
(§18.9; §20 R-28). Implementation friction is the most-cited churn trigger in the market,
and mid-year cutover is where it concentrates. Importers from Zoho Payroll, Kredily and
Frappe are **acquisition infrastructure, not integrations** — budget them as such; they
are P1, with Tally first among them (§05.5 item 17), behind the universal Excel/CSV
onboarding import, which is P0 in R1 together with the YTD tie-out and the parallel-run
month below (§05.5 item 32; C-05).
The churn-driver claim is not yet validated; kill/validate criterion: §20 V-15 and the
buyer interviews. If implementation friction is not a top-three churn trigger in field
interviews, migration is still worth building but is not the primary GTM wedge.

**The mid-year cutover problem** is the hard part, because a company switching in (say)
August must carry forward: opening balances, YTD earnings and TDS already deducted,
previous-employer income, investment declarations mid-cycle, **certificate continuity
across two systems** (one TRACES-generated Form 130 built from Form 138 data that two
payroll systems prepared, EV-048), EPF UAN and ESI IP continuity, leave balances, and
gratuity accrual (§05.6 Example D; FR-CHR-098, §07.7). It must **not** carry consent:
consent cannot be backfilled, is never imported unless the source held it, and is never
synthesised; every migrated employee goes through the migration consent flow (FR-CHR-102,
Part E-12), and no employee record completes import without a consent-flow status
(§05.5 items 32 and 35).

| Facet | Specification |
| --- | --- |
| **Contract** | One-time import from: **Excel/CSV** (universal), **Zoho Payroll / Kredily / Frappe HR / greytHR** exports (acquisition importers), and Tally (§16.2). Format: guided template + validation. |
| **Data exchange** | Ingest: employee master (with UAN/ESI-IP/PAN/bank), compensation structure and pay heads, **YTD earnings + YTD TDS + YTD statutory** (for mid-year), investment declarations and proof status, leave balances and accrual rules, gratuity/PF opening balances, and org structure. |
| **Failure modes** | (1) **YTD not carried** → wrong TDS projection for the rest of the year and Form 138 data from which TRACES cannot build a continuous Form 130. (2) **UAN/IP discontinuity** → duplicate member accounts at EPFO/ESIC. (3) **Pay-head semantics differ** across source systems (what counts as "basic" for add-back). (4) **Declaration state lost** → employees re-declare mid-year. (5) **Silent data loss** on unmapped columns. (6) **Regime carry-forward** — the employee's old/new regime election must carry, or projected TDS inverts. |
| **Fallback** | A **staged migration** with a mandatory **parallel-run / reconciliation month** for mid-year cutovers: the first live run is diffed against the source system's last run and must reconcile before go-live. Unmapped columns are surfaced, never dropped (§08.13 G9 migration parity). A **YTD import validator** checks that carried-forward TDS + projected TDS is internally consistent, so the year's Form 138 data — and therefore the TRACES-generated Form 130 — is continuous. |

**Worked example — the mid-year TDS continuity check.** An employee joins the new system
in August (month 5 of the Tax Year). Source system YTD (Apr–Jul): taxable ₹4,00,000, TDS deducted
₹18,000. On import, the YTD validator recomputes annualised liability on the *full-year*
projection (₹4,00,000 actual + ₹5,00,000 projected Aug–Mar = ₹9,00,000) under the carried
regime election, subtracts the ₹18,000 already deducted, and spreads the balance over the
remaining 8 months. If the import dropped the ₹18,000-already-deducted figure, the engine
would re-deduct it, over-withholding ~₹2,250/month and producing Form 138 data — and so a
TRACES-generated Form 130 — that does not reconcile to the two systems' combined challans. The validator blocks go-live until
`YTD-carried + YTD-projected` is internally consistent.

**YTD tie-out criteria — the go-live gate for a mid-year cutover.** Internal consistency
is necessary, not sufficient: each carried head is also tied out against an **independent
record** — never against the import file itself. Tolerance per head is the named parameter
`migration.tieout_tolerance.<head>`, shipped at **₹0** for the heads §20 V-15 names (YTD
taxable salary, TDS deducted, statutory contribution totals); any non-zero value is a
tenant-level override with a recorded reason and approver. Zero is the default because
§20 grades a V-15 cutover that only "reconciles within a small, scripted tolerance" as
inconclusive, not as a pass.

| Head carried (per employee unless stated) | Tied out against | Tolerance | On breach |
| --- | --- | --- | --- |
| YTD gross and YTD taxable salary, by month | The source system's payroll register for the same months | ₹0 (V-15) | Go-live blocked for that employee; per-month diff shown |
| YTD TDS deducted, by month | The source register, and the deductee rows of the quarterly statements already filed for those months — Form 138 for Tax Year 2026-27 onward, legacy 24Q for FY 2025-26 and earlier (EV-050, EV-052) | ₹0 (V-15) | Blocked; the TDS projection is not run |
| TDS deposited, per TAN | Challan identification in the `.csi` from the TIN Challan Status Inquiry (AC-706.2) | ₹0 | Blocked; the un-reflected challan is named |
| EPF — employee share, employer EPS and employer EPF, by UAN and wage month | The source's ECR lines, and EPFO's approved return statements and receipts for the months already filed (EV-036) | ₹0 (V-15) | Blocked; those months stay open in the establishment ledger (FR-PAY-712) |
| ESI — employee and employer shares, by IP and month | The source's contribution records and the ESIC challans for the months filed | ₹0 (V-15) | Blocked |
| PT deducted, by state | The source register and the state receipts for periods filed | ₹0 | Blocked for that state; the carried figure feeds the annual ₹2,500 cap check (§06.4) |
| Regime election and previous-employer income and TDS (Form 122, ex-12B, EV-050) | The employee's own declaration captured in the new system | Exact match | Blocked until the employee confirms |
| UAN and ESI IP numbers | The source master, then continuity checks before the first ECR or ESI file (AC-MIG-4) | Exact match | Blocked for that member; never a new UAN or IP |
| Leave balances and gratuity service start date | The source register | Exact (days) | Flagged, not blocked — no filing depends on it at cutover |

<!-- DIAGRAM: integrations-api-ytd-tieout -->

The gate reads the same way for every source system (Tally, Zoho Payroll, Kredily,
Frappe HR, greytHR, Excel). What differs per source is only the importer's field map —
and for Frappe HR, whose repository has no ECR, ESI, 24Q or Form 16 generator (EV-031,
K-01), the "independent record" for EPF, ESI and TDS is the portal-side record the
customer holds (approved returns, challans, receipts), not anything the source system
produced.

**Acceptance criteria.**

- **AC-MIG-1:** A mid-year import produces a first in-product payslip whose YTD figures
  continue the source system's YTD (verified by diff), and year-end Form 138 data from
  which the TRACES-generated Form 130 spans both systems correctly (checked once the Q4
  format is released, EV-046, EV-048).
- **AC-MIG-2:** The Zoho/Kredily/Frappe/greytHR importers map ≥90% of fields automatically
  from a real export (a **[Hypothesis]** target, recalibrated on the first §20 V-15
  dataset); the parallel-run reconciles to the rupee before go-live.
- **AC-MIG-3:** No import silently drops a column; every unmapped field is reported.
- **AC-MIG-4:** UAN/ESI-IP carried from the source are validated for continuity so the
  first ECR/ESI file does not create a duplicate member account.
- **AC-MIG-5:** Go-live for a mid-year cutover is refused while any head in the YTD
  tie-out table is outside `migration.tieout_tolerance.<head>`; the refusal names the
  employee, the head, the month and both figures, and a tolerance override is recorded
  with its reason and approver.

#### 16.7.1 The importer contract — one pipeline, six source profiles

There is **one import pipeline**. A source system contributes a *profile*: an extraction
mechanism, a field map, a set of known gaps, and the independent records its figures are tied
out against. Building six importers is how a migration team drowns; building one pipeline and
six profiles is how the seventh source costs a week.

| Stage | What happens | Failure disposition |
| --- | --- | --- |
| 1 **Extract** | Obtain the source artefacts. Mechanism is per profile and is never assumed to be an API | A source that cannot be extracted degrades to the universal Excel/CSV profile — the migration still happens |
| 2 **Profile** | Inspect the artefact: column inventory, row counts, date ranges, encoding, duplicate keys | An artefact that profiles as out of range (e.g. periods before the tenant's first registration) is rejected here, cheaply |
| 3 **Map** | Bind source columns to our fields through the profile's map, with every unmapped column **reported** (AC-MIG-3) | An unmapped column is a worklist item, never a silent drop |
| 4 **Normalise** | Convert to canonical types: dates, money to the rupee, identifiers to their canonical form, periods to both vocabularies — Tax Year six-digit **and** the legacy financial-year label (EV-050) | An unparseable value is quarantined with its raw text, per row and per column |
| 5 **Validate** | Structural and referential checks: every assignment resolves to an establishment and a work location; every statutory identifier is well-formed; no employee has two live assignments in one period | Blocking, with a per-row report |
| 6 **Stage** | Write into a staging tenant that is fully functional and fully separate — payslips can be produced, nothing is filed, nothing is paid | — |
| 7 **Tie out** | The §16.7 head-by-head table against independent records | Blocking per head, per employee |
| 8 **Parallel run** | Re-run the source system's last closed month in the staging tenant and diff | Blocking: the diff must be zero on every blocking head |
| 9 **Cut over** | Promote staging to live, with the source system still readable | Reversible up to promotion, never after (see §16.7.2) |

**The source profile object.**

| Field | Meaning |
| --- | --- |
| `profile_id` | `migrate.<source>` |
| `extraction[]` | The supported mechanisms, each with what it yields |
| `field_map` | Source column to our field, with a transform and a confidence |
| `independent_records[]` | Per carried head, what the figure is tied out against — **never the import file itself** |
| `known_gaps[]` | Heads this source is known not to carry, so the pipeline asks the customer for them up front rather than discovering it at stage 7 |
| `capture_task` | The §20 item that will replace an assumed field map with a captured one |
| `evidence_status` | What we actually know about this source, with a date |

**The six profiles.** What each source is known to hold is stated from this PRD's evidence
base only; where the field-level export is not captured, that is said, and the capture is a
§20 task rather than an assumption. Field maps are built from a design partner's real export
(§20 V-15) before the profile leaves draft.

| Profile | Extraction | Known to hold | Known gaps and consequences | Independent record for the statutory heads |
| --- | --- | --- | --- | --- |
| **Excel / CSV** (universal, **P0 R1**) | A guided template the customer fills | Whatever the customer has | Everything is a gap by construction — which is why the tie-out, not the file, is the gate | Portal-side records the customer holds |
| **Tally** (first named importer, P1) | Tally XML or CSV export of masters and vouchers; the XML gateway is an HTTP server **inside the customer's TallyPrime process on port 9000 by default**, a LAN endpoint a cloud HRMS cannot reach without a local connector (r3/05) | Ledger masters, cost centres often used as departments, opening balances; where the Payroll module is enabled, pay heads, attendance and production types, employee masters with PF/ESI/UAN numbers. TallyPrime ships the statutory artefact set, so a Tally seat usually *does* hold filed artefacts (EV-032) | **No state PT slab table, no LWF engine, no leave module, no leave-encashment calculation** (EV-032) — so PT history is only as good as what was hand-entered, LWF history does not exist, and leave balances arrive from outside Tally. Whether a Tally export carries everything the Form 138 salary data needs is a live [Hypothesis] (§16.2; §20 V-15) | The customer's filed artefacts and portal records |
| **Zoho Payroll** (P1) | Customer-initiated export | It generates the TDS statement text file and a downloadable bank advice, and its direct-deposit integrations are documented per bank (r3/05) — so the tenant holds statement files and bank advices | Its export **field list is not captured** in this PRD's research; the field map is a §20 V-15 capture, not an assumption | The tenant's own filed statements, challans and receipts |
| **Kredily** (P1) | Customer-initiated export | Computation | **[Verified] the freemium paywall is on the outputs** — bank payout files, PF/ESI challans, the annual certificate, Form 124 (ex-12BB) (EV-029). A tenant on a free plan may never have held the very artefacts the tie-out uses as independent records | Portal-side records only: EPFO approved returns and receipts, ESIC challans, the `.csi` |
| **Frappe HR** (P1) | Database or API export from a self-hosted instance | A genuinely strong gross-to-net salary structure (EV-031) | **Zero ECR, EDLI, EPS, UAN, LWF, 24Q, 12BB, 12BA or 27A matches in the repository, and no Indian state name anywhere in the tree** (EV-031, K-01). There is no source-side statutory record to tie out against, by construction | Portal-side records only — stated in §16.7 and repeated in the profile because it changes the customer conversation |
| **greytHR** (P1) | Customer-initiated export | The HRMS job, including compliance-forward generation language (EV-030) | Export field list not captured; a §20 V-15 capture | The tenant's filed artefacts and portal records |

- **AC-MIG-6:** Every profile names, per carried head, the independent record used for its
  tie-out; a profile in which any blocking head's independent record is the import file itself
  cannot leave draft.
- **AC-MIG-7:** A source whose extraction fails degrades to the Excel/CSV profile with the
  already-extracted data pre-filled — a failed importer never becomes a failed migration.
- **AC-MIG-8:** Every profile's `known_gaps[]` is surfaced to the customer **before** stage 1,
  as the list of things they must produce from elsewhere; discovering a gap at stage 7 is a
  profile defect and is logged as one.

#### 16.7.2 Migration run states, the cutover calendar and rollback

<!-- DIAGRAM: integrations-api-migration-cutover -->

| From | Event | Guard | To | Side effect | Who may trigger |
| --- | --- | --- | --- | --- | --- |
| — | Migration opened | Tenant and establishments exist; registrations recorded | PROFILING | Staging tenant created, isolated | Onboarding owner |
| PROFILING | Artefacts loaded | Profile inspection passes | MAPPING | Unmapped-column report produced | Onboarding owner |
| MAPPING | Map confirmed | Every blocking head mapped or explicitly sourced elsewhere | STAGED | Data written to staging only | Onboarding owner |
| STAGED | Consent flow run | Every migrated employee has a consent-flow status; **consent is never imported, never synthesised** (FR-CHR-102, Part E-12) | STAGED | Non-responders tracked on the non-responder path, not defaulted to consented | System |
| STAGED | Tie-out run | Every blocking head within `migration.tieout_tolerance.<head>` | TIED_OUT | Per-head report retained as the go-live evidence | System |
| STAGED | Tie-out run | Any blocking head outside tolerance | TIE_OUT_FAILED | Refusal names the employee, the head, the month and both figures (AC-MIG-5) | System |
| TIE_OUT_FAILED | Correction at source, or an override | An override carries a reason and an approver | STAGED | Override recorded against the head and the employee | Onboarding owner |
| TIED_OUT | Parallel run executed | The source system's last closed month re-run in staging | PARALLEL_RUN | Diff produced per employee, per component | Onboarding owner |
| PARALLEL_RUN | Diff reviewed | Diff is zero on every blocking head | READY_TO_CUT | Go-live date set inside an open window | Onboarding owner |
| PARALLEL_RUN | Diff non-zero | — | TIE_OUT_FAILED | The diff is the defect list | System |
| READY_TO_CUT | Promotion | No pay month is mid-processing in staging; the source system's last month is closed | LIVE | Staging becomes the tenant's live data; the **source system stays readable and is not decommissioned** | Onboarding owner + tenant approver |
| LIVE | Post-cutover correction | Within the first filed month | LIVE | A correction is a diff into the open month, never a re-import (Part E-1) | Payroll processor |
| Any pre-LIVE state | Abandon | — | ABANDONED | Staging retained for the retention window, then erased per §14.7 | Onboarding owner |

**Cutover windows.** The migration calendar is not a preference; two dates dominate it.

| Window | Property | What it means for the pipeline |
| --- | --- | --- |
| **Start of the Tax Year** | No YTD to carry for income tax, no mid-year projection, no previous-employer reconciliation inside our system | The cheapest cutover, and the reason migration demand is seasonal — a risk §20 tracks, because a product that can only onboard in one month of twelve has a capacity problem, not a product problem |
| **Mid-year** | Everything in the §16.7 tie-out table applies | The parallel-run month is **mandatory**, not optional |
| **Never: mid-quarter, after a statement is filed but before the quarter closes** | The TDS tie-out has no filed statement for the open months | Handled, not forbidden: months inside an unfiled quarter tie out against the challan in the `.csi`, not against deductee rows (§16.7.3) |
| **Never: with an EPF chronology gap open** | A skipped wage month blocks later Regular returns under the M−4 rule (EV-038) | The establishment filing ledger is checked at stage 7; an open gap blocks READY_TO_CUT, because cutting over does not clear it — it inherits it |

**Rollback.** Up to promotion, rollback is free: staging is discarded and the source system
was never stopped. **After promotion there is no rollback**, because a filing or a payment
may have occurred; the recovery path is a correction diff in the live system. This asymmetry
is why the gate sits at promotion and why the source system is contractually kept readable
for `migration.source_readable_months` (owner: Ops; routed to §20) after cutover.

#### 16.7.3 The tie-out, worked — a three-employee mid-year cutover

A 3-employee establishment cuts over in **August of Tax Year 2026-27**, month 5. Rates are
§06's: EPF 12% on wages capped at the ₹15,000 ceiling, employer EPS 8.33% capped at ₹1,250
with the balance of the employer's 12% to EPF, EDLI 0.50%, EPF admin charges 0.50%
**[Hypothesis]** with the establishment minimum as `epf.admin_charge.minimum`; ESI employee
0.75% and employer 3.25% up to the ₹21,000 wage ceiling; Maharashtra PT ₹200 a month with
₹300 in February, ₹2,500 a year (§16.5.4).

| Employee | Monthly gross | EPF wages | EE PF | ER EPS | ER EPF | ESI EE | ESI ER | PT |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| A | ₹30,000 (the §16.5.1 structure: Basic 12,000, HRA 9,000, Conveyance 3,000, Commission 6,000 — add-back base ₹15,000) | ₹15,000 | ₹1,800 | ₹1,250 | ₹550 | — | — | ₹200 |
| B | ₹20,000 (ESI-covered, below the ₹21,000 ceiling) | ₹15,000 | ₹1,800 | ₹1,250 | ₹550 | ₹150 | ₹650 | ₹200 |
| C | ₹60,000 | ₹15,000 | ₹1,800 | ₹1,250 | ₹550 | — | — | ₹200 |

**Carried YTD for April to July — four months.** These are the figures the import file
claims; the tie-out's job is to disbelieve them until an independent record agrees.

| Head | Carried figure | Arithmetic |
| --- | --- | --- |
| EPF employee share | ₹21,600 | ₹1,800 × 3 employees × 4 months |
| Employer EPS | ₹15,000 | ₹1,250 × 3 × 4 |
| Employer EPF | ₹6,600 | ₹550 × 3 × 4 |
| EDLI | ₹900 | 0.50% × ₹15,000 × 3 × 4 |
| EPF admin charges | ₹900, subject to `epf.admin_charge.minimum` | 0.50% × ₹15,000 × 3 = ₹225 a month, × 4 |
| ESI employee share | ₹600 | ₹150 × 1 × 4 |
| ESI employer share | ₹2,600 | ₹650 × 1 × 4 |
| PT | ₹2,400 | ₹200 × 3 × 4 |

**Head 1 — EPF, and the failure the tie-out is for.** The independent record is EPFO's own
approved return statements and receipts for April to July (EV-036). Their employee-share
lines sum to **₹19,800**, not ₹21,600. Difference **₹1,800** — exactly one member-month at
this wage. Reading the returns month by month shows June's return carries two members, not
three: employee C is absent from it.

Three consequences, and only the third is a data-entry fix:

1. **Go-live is blocked for employee C** on the EPF head at ₹0 tolerance (§16.7's table), and
   the refusal names the employee, the head, the month (June) and both figures (AC-MIG-5).
2. **The omission is a filing defect, not an import defect.** June's Regular return was
   approved and **an approved return can never be cancelled** (EV-036). Because employee C is
   absent from *every* prior return for that month, the correct instrument is a
   **Supplementary** return for June (EV-037) — which is filed by the tenant on their own
   registration, before or after cutover, and enters the establishment filing ledger
   (FR-PAY-712) either way. The employer's liability for it is non-delegable (K-13).
3. **Only after the Supplementary return is approved and its receipt captured** does the
   independent record sum to ₹21,600 and the head tie out. Overriding the head instead would
   record a reason and an approver, and would leave a real ₹1,800 contribution unremitted —
   which is why the default tolerance is ₹0 and not "a small scripted tolerance" (§20 V-15).

**Head 2 — TDS, and the quarter boundary.** Carried YTD TDS for one employee is ₹18,000 over
four months. The independent record differs by month, because a quarter that has not been
filed has no deductee rows:

| Months | Inside a filed statement? | Independent record | Tie-out |
| --- | --- | --- | --- |
| April, May, June | Yes — Q1, due 31 July (EV-049) | The deductee rows of the filed Q1 statement, on the stack for that period (EV-052) | Sum must equal the carried Apr–Jun figure, ₹13,500, at ₹0 tolerance |
| July | No — Q2 is not due until 31 October (EV-049) | The **challan** for July's deposit, identified in the `.csi` from the TIN Challan Status Inquiry, matched by TAN and month | The deposit must exist and cover the carried ₹4,500. A deposit not yet reflected in the `.csi` blocks and names itself (AC-706.2) |

The rule generalises: **tie a month to the deductee rows where a statement covering it has
been filed, and to the challan where it has not.** An importer that tied every month to
statements would block every cutover that is not on a quarter boundary; one that tied every
month to challans would miss a deposit that was made but mis-allocated across deductees.

**Head 3 — PT, and why the carried figure is not just history.** Employee C's carried PT is
₹800 for four months at Maharashtra's ₹200. The rest of the year is August to January at
₹200 = ₹1,200, February at ₹300 and March at ₹200 = **₹1,700**, so the year totals
₹800 + ₹1,700 = **₹2,500** — exactly the annual figure, and the carried figure is what proves
the annual cap does not bind. Now suppose the source register carried **₹1,200** for those
four months instead. The year would total ₹1,200 + ₹1,700 = **₹2,900**, which is ₹400 above
the ₹2,500 annual cap (§06.4), so the engine must stop deducting once the cap is reached:
February falls from ₹300 to ₹100 and March from ₹200 to ₹0. Whether the ₹1,200 is a genuine
prior deduction or a source-system defect changes the employee's take-home in two specific
months, which is why PT is a blocking head despite its size — and why the carried figure is
stored **per state**, not as one number, since the cap is a state's cap.

The same head carries a second trap for a state whose slab tests **annual** income rather
than the monthly figure. Odisha's ₹200 for eleven months and ₹300 for the last month follows
from the annual income of ₹3.6 lakh crossing the ₹3 lakh line, not from the ₹30,000 monthly
figure (§16.5.4, [Verified] at a state primary source). For an Odisha work location, the
carried **gross** — not merely the carried PT — decides which annual slab applies for the
remainder of the year, so dropping carried gross can put the employee in the wrong slab for
eight months. Which month is "the last month" is itself [Hypothesis] and a reported April
2026 repeal ordinance is unconfirmed (§06.4), so the state renders its banner and the tenant
confirms before filing.

**Head 4 — ESI, and the ceiling the carried figure does not decide.** Employee B's carried
ESI is ₹600 employee and ₹2,600 employer. It ties out against the ESIC challans for those
months. What it does **not** do is decide coverage going forward: ESI runs on fixed
contribution periods April–September and October–March with the "continue to period end" rule
(§16.5.2), so B's coverage through 30 September follows from the period, not from the import.
A migration that treated the carried figure as the coverage decision would drop B on the
first month their gross moved.

#### 16.7.4 Migration negative cases and the test corpus

| # | Input | Expected |
| --- | --- | --- |
| M1 | The same import file loaded twice | One set of staged records; the second load is a no-op diff, and nothing is duplicated in staging or live |
| M2 | An employee present in the master with no assignment or work location | Blocked at stage 5 — jurisdiction is on the work location, not the employee (Part E-5), so a missing location makes PT, LWF and the applicable regime undecidable |
| M3 | Two employees sharing one UAN in the source | Blocked at stage 5 with both rows named; **never** resolved by minting a new UAN (AC-MIG-4) |
| M4 | One employee with two UANs in the source | Not an error: the identifier placement model admits the multi-value case (§07). Both are carried, one is marked current, and the ECR uses the current one |
| M5 | Carried YTD present, filed statements absent because the source is Frappe HR | Tie-out proceeds against portal-side records only, per the profile (EV-031); the customer is told at stage 1, not stage 7 |
| M6 | Carried YTD present, but the tenant was on a free plan and never held challans or the annual certificate | The `known_gaps[]` path: the tenant retrieves them from the portals, or the head is overridden with a reason and an approver — the paywall is a known property of the freemium sources (EV-029) |
| M7 | Consent artefacts present in the source export | **Not imported.** Consent cannot be backfilled and is never synthesised; every migrated employee runs the migration consent flow, with the SPDI written-consent set for biometrics and financial data separated from everything else (Part E-12, FR-CHR-102) |
| M8 | Biometric templates present in the source export | Never imported into business tables, never imported at all without a live written consent and a biometric election; the enrolment happens on our side under §09's rules |
| M9 | Aadhaar numbers present in the source export | Accepted only into the token store, never into business tables, never into staging reports; a staging report that would print one is refused (Part E-6) |
| M10 | Source rows dated before the tenant's registration effective date | Rejected at stage 2, naming the registration and the date — a contribution cannot be represented for a period the establishment was not registered |
| M11 | Mid-year cutover with an open EPF chronology gap | READY_TO_CUT refused; the gap is named with its month and the M−4 consequence (EV-038) |
| M12 | Regime election missing for an employee | Blocked: the projection inverts without it (§16.7); the employee confirms it in their own name |
| M13 | Leave balance mismatch of 1.5 days | **Flagged, not blocked** — no filing depends on it at cutover (§16.7 table) |
| M14 | Parallel-run diff of ₹1 on one employee's net | Blocked. The parallel run reconciles to the rupee, and a ₹1 diff is a rounding-policy difference worth finding before go-live, not after (§08's rounding policy) |
| M15 | Cutover completed, then the customer asks to reverse it | Refused as a rollback; handled as corrections in the live system, with the source system still readable for `migration.source_readable_months` |

---

### 16.8 Recruiting and job-board integrations

**[Verified, §10.1; r2/08]** — **A new entrant can build recruiting in India, but inbound
only.** Info Edge owns the passive-candidate graph (Resdex, "over 50 million profiles" per
Naukri's own FAQ) and does not licence database search to third-party ATSs; Resdex-in-ATS
is available only through Info Edge's own ATS (Zwayam markets this as exclusive — the
incumbent's own marketing, documentation read, r2/08). We found no published Naukri
developer API, self-serve key or partner documentation as of September 2026 — its
recruiter support corpus has no API or developer folder (r2/08, documentation read).
**Forbid scraping explicitly** — the only working Resdex extraction for a non-partner
replays a live authenticated recruiter session (r2/08), a terms-of-service risk for the
customer and for us; whether it creates further legal exposure is a counsel question
(§23), and the answer does not change the prohibition.

| Facet | Specification |
| --- | --- |
| **Contract** | **Inbound (posting + application sync) only.** Multi-post a requisition to Naukri, LinkedIn, foundit, apna and Indeed against **the customer's own job-board contract** ("bring your own contract"), with application ingest and dedup. **LinkedIn is the one large passive graph with a documented, certifiable partner path** — do it properly and early. |
| **Data exchange** | Outbound: job posting (title, description, location, comp band) to each board on the customer's account. Inbound: applications (candidate profile, resume, source) → dedup → ATS pipeline. No candidate-database *search* against any board (not licensed). |
| **Failure modes** | (1) **No customer contract** on a board → cannot post there. (2) **API/posting-quota limits** per board. (3) **Duplicate candidates** across boards → must dedup on email/phone. (4) **LinkedIn partner-review** gating the integration — the APIs are restricted to LinkedIn-approved developers and need a signed API agreement with data restrictions; Recruiter System Connect requires the Job Posting API to be implemented first, and its real-time features need the customer to hold a Recruiter Corporate or RPS licence (Microsoft Learn LTS docs, page dated 1 April 2026, documentation read, r2/08). (5) **Temptation to scrape** — explicitly architected out and forbidden in sales collateral. |
| **Fallback** | Where a board has no API for a tenant, provide **assisted manual posting** + an email/careers-page application capture (a public application form and an inbound-email parser) so the ATS pipeline is never empty even with zero board integrations. |

> **[Verified] Right-size the moat.** Naukri's "118M" is total resumes (an investor
> metric); Resdex — what recruiters actually buy — is "over 50 million profiles" per
> Naukri's own FAQ (§10.1; r2/08). Do not overstate the graph we cannot reach; compete on
> inbound funnel quality, multi-post ergonomics, and the LinkedIn certified path.

**Acceptance criteria.**

- **AC-REC-1:** One requisition multi-posts to every board where the tenant has a contract,
  and ingests + dedups applications back into one pipeline.
- **AC-REC-2:** No code path performs candidate-database search or scraping against any job
  board; this is enforced architecturally and asserted in sales collateral.

#### 16.8.1 The candidate-data boundary

§10 owns hiring, its discrimination controls and its decision records. This subsection owns
only the **boundary**: what crosses it from a job board into our system, and what can never
cross it back out.

| Direction | Permitted | Forbidden |
| --- | --- | --- |
| Board → us | The application the candidate submitted to the tenant's own posting: profile fields the board passes, the résumé document, and the source board | Any candidate record not attached to an application to this tenant. No database search, no bulk profile pull, no replay of an authenticated recruiter session — the only working extraction for a non-partner is exactly that replay (r2/08), and it is forbidden in architecture and in collateral |
| Us → board | The requisition content the tenant authored, on the tenant's own board contract | Employee data of any kind. A job board has no business receiving a UAN, a PAN, a bank account or an Aadhaar token, and the per-integration allowlist enforces it (§16.12) |
| Us → us | Dedup on the contact identifiers the candidate supplied, within the tenant | Cross-tenant candidate matching. A candidate who applied to two customers is two records, not one graph — building the graph would be a product we were not asked for and a disclosure we cannot justify |

**Three properties the boundary must have.** (1) **Dedup is within-tenant and deterministic**,
keyed on the normalised contact identifiers, so the same person applying twice through two
boards is one pipeline entry with both sources recorded. (2) **Candidate data is an erasable
class** (Part E-2): a candidate record has a defined retention with an erasure mechanism, and
what a replay returns after erasure is §14.7's answer, not an ad-hoc one. (3) **No attribute
that §10 bars as a scoring feature may be ingested as a structured field at all** — where a
board passes something that maps to one, it is stored as inert document text under §10's
walling rules, never as a queryable field, because a field that exists will eventually be
used.

- **AC-REC-3:** No code path can issue a candidate-database search or a bulk profile fetch
  against any board; the absence is enforced architecturally and asserted by a build check on
  the boards' client surfaces, not by a policy note.
- **AC-REC-4:** No outbound payload to any board contains an employee or candidate statutory
  identifier, proved by the same recorded-corpus scan as AC-API-9.
- **AC-REC-5:** A candidate erasure removes the candidate's record and its board-sourced
  document from every downstream cache within the window §14.7 sets, and the pipeline entry's
  audit trail records that an erasure occurred without reconstructing what was erased.

---

### 16.9 Communication channels

Payslip delivery and workflow notifications ride these; e-sign carries the
prescribed-format appointment letter. **[Reversed]** Earlier text implied that letter is
owed from employee one; the OSH Code s.6(1)(f) duty attaches to an "establishment" of 10
or more workers, and the form is prescribed by the appropriate Government — state-sphere,
so the template is configuration per state (K-18, EV-057; §05.5).

| Channel | Contract & use | Failure modes | Fallback |
| --- | --- | --- | --- |
| **Email (SMTP/API)** | Transactional email (payslips, filing confirmations, approvals) via a provider (SES/SendGrid-class) with per-tenant sender domain (SPF/DKIM/DMARC). | Bounce, spam-foldering, domain not verified. | In-app inbox + downloadable payslip; delivery status tracked. |
| **SMS (DLT-registered)** | OTP and critical alerts via a **TRAI DLT-registered** sender header + pre-approved template. The DLT header-and-template registration requirement is not captured in this PRD's research; its instrument and current text are to be confirmed before customer use (routed to §20). | Template not DLT-approved → blocked/scrubbed; carrier delay; header mismatch. | Email/WhatsApp/in-app fallback for the same alert. |
| **WhatsApp Business (P1)** | Frontline/deskless reach (§09). **[Verified]** A new WhatsApp business portfolio reaches only **250 unique users / rolling 24h** (Source: Meta WhatsApp Business Platform messaging-limit tiers, r2/04), so a 5,000-worker site cannot be push-onboarded day one; design **worker-initiated**, not employer-push. Meta charges per message since 1 July 2025, and employee-initiated conversations are free inside the 24-hour window (EV-088). | Tier limits; template rejection; **WABA billing** — an India WABA must migrate to INR billing by 31 Dec 2026, or Meta stops delivering its messages from 1 Jan 2027 (EV-088); **[Killed]** the "Meta charges for service messages in India from 1 Oct 2026" claim is false (applies to nine other markets — §20.4); **Meta's India rate card is unresolved** — BSP sources disagree (marketing ₹0.8631 vs ₹0.95, utility ₹0.1150 vs ₹0.15), leaving the marketing-to-utility multiple a 6.3–7.5× range (r2/04; §20 V-12) — download the rate card before committing any per-worker price. | Ramp within the 250/24h tier; fall back to SMS/IVR/email; never gate a payslip on WhatsApp. |
| **E-sign (P1)** | Appointment letters, policy acknowledgements via **Aadhaar eSign through a licensed eSign Service Provider** or a DSC/DocuSign-class provider. The statutory basis of each signature type is not captured in this PRD's research: capturing the instruments is routed to §20, and any "legally valid signature" statement is a customer-facing legal claim that needs counsel clearance and a named owner before use (Part D-20, §23) — counsel required. Aadhaar eSign is never the only path: Aadhaar is optional everywhere, and no signature, letter or benefit is conditional on it (Part E-11, Part D-10). | Aadhaar OTP failure; ESP downtime; consent capture; name-in-Aadhaar mismatch. | A non-Aadhaar signature path (DSC-class provider) or a downloadable PDF for wet-signature; signature status tracked as an exception until complete. |

**Acceptance criteria.**

- **AC-COM-1:** Payslip delivery is tracked to a per-employee delivery status; a bounce
  opens the in-app copy, never a silent non-delivery.
- **AC-COM-2:** SMS uses only DLT-approved headers + templates; WhatsApp onboarding respects
  the 250/24h new-portfolio cap and degrades to SMS/email.
- **AC-COM-3:** No per-worker WhatsApp price is hard-committed until the Meta India rate
  card is downloaded (§20 V-12).

#### 16.9.1 The notification channel abstraction and the routing table

Channels are pluggable; **email is the floor**, because it is the only channel with no
approval gate, no per-message cost, no deprecation migration and no distribution review
(r3/05). Every other channel sits above it and falls through to it.

| Channel | Gate it carries | Consequence |
| --- | --- | --- |
| Email | None | The guaranteed-available channel behind the abstraction; every notification type must be deliverable on it |
| SMS via a DLT-registered header and pre-approved template | Registration and template approval, whose instrument and current text are not captured in this PRD's research and are routed to §20 | A template not yet approved blocks that message, never the event behind it |
| WhatsApp through a BSP | WABA onboarding, template approval, per-message cost since 1 July 2025, a 250-unique-user rolling-24-hour cap for a new business portfolio, and INR billing migration by 31 December 2026 (EV-088; r2/04) | Designed **worker-initiated**: employee-initiated conversations are free inside the 24-hour window (EV-088), so a pull design is structurally cheaper than a push design at the same utility |
| Microsoft Teams | **[Verified — vendor documentation, r3/05 finding 36]** the older Microsoft 365 connector webhooks are nearing deprecation with new creation to be blocked; the supported paths are a Workflows webhook trigger or a Teams app with a proactive bot, under a 28 KB message limit and throttling above four requests per second — and a Workflows flow can become an orphan when its owner leaves, which in an HR product is the departing HR admin | Build on the supported path only, size messages under the limit, and treat orphan-flow risk as a designed-for failure mode, not a surprise |
| Slack | App distribution work; the Web API is bearer-token authenticated over OAuth 2.0 and its documentation moved host, which is why an earlier pass wrongly called it unverifiable (r3/05 finding 37) | A later-phase channel, no different in kind from Teams |
| E-sign | An ESP dependency, and any "legally valid signature" statement is a customer-facing legal claim needing a named owner and clearance (Part D-20, §23) | Never Aadhaar-only: Aadhaar is optional everywhere and no letter or benefit is conditional on it (Part E-11, Part D-10) |

**Routing table.** Per event class, the ordered channel list and the floor. The floor is the
channel that must succeed for the notification to be considered delivered; everything before
it is best-effort reach.

| Event class | Ordered channels | Floor | Never |
| --- | --- | --- | --- |
| Payslip available | In-app, email, WhatsApp if opted in | **In-app** — the payslip is always retrievable in product | Gated on WhatsApp, SMS or any paid channel |
| Statutory document available (Form 130, filing receipt) | In-app, email | In-app | Gated on any external channel |
| Approval required (leave, expense, pay run) | In-app, email, Teams or Slack if configured | In-app | — |
| Filing deadline approaching or blocked | In-app, email to the named actor | In-app | Suppressed because a channel failed |
| Disbursement pending bank approval | In-app, email to the named bank approver | In-app | Described as paid (AC-BNK-14) |
| OTP and security | SMS on a DLT-approved template, email | SMS or email, whichever the tenant's policy names | WhatsApp as the sole factor channel |
| Employee query answered | The channel the employee initiated on | That channel | A paid push where a free reply inside an open window would do |

- **AC-COM-4:** Every notification type is deliverable on email and in-app alone, proved by
  disabling every other channel for a tenant and running a full cycle with nothing lost.
- **AC-COM-5:** A channel gate that is not satisfied — a template not approved, a tier cap
  reached, a WABA not migrated — raises `INT.COMM.*` with the event still delivered on the
  floor channel; the event is never dropped with the channel.
- **AC-COM-6:** Teams messages are emitted only on a supported path and are size-checked
  against the published limit before send; an over-size message is split or degraded to a link,
  never truncated silently.
- **AC-COM-7:** No paid outbound message is sent where a free reply inside an already-open
  conversation window would carry the same content, and per-tenant message spend is metered as
  a COGS line (EV-088, §13).

---

### 16.10 Identity, SSO and provisioning

**Phase: P2** (§05.5 item 24; FR-CHR-092 — deferred to the bands where procurement
expects it). Until then login runs on the local-credential path with MFA that the
fallback row below already requires. Which identity provider 20–200
employee firms actually use was not established by desk research (r3/05) — whether plain
Google Workspace or Microsoft Entra ID sign-in is pulled forward ahead of SAML and SCIM is
a customer-discovery question, not a decision this section takes. When built, one SCIM 2.0
server serves both Entra ID and Okta; Entra's gallery listing and Okta's Integration
Network are separate third-party review gates (r3/05).

| Facet | Specification |
| --- | --- |
| **Contract** | Employee/admin login via **Google Workspace and Microsoft Entra ID** (OIDC), enterprise **SAML 2.0** for larger tenants, and **SCIM 2.0** for automated user provisioning/deprovisioning. |
| **Data exchange** | Inbound identity assertions (OIDC/SAML) and user lifecycle events (SCIM create/update/deactivate → HRMS user, but **HRMS remains the system of record for employee master**; SCIM governs *login accounts*, not employment records). |
| **Failure modes** | (1) **IdP mis-mapping** — SSO identity ≠ employee record. (2) **Orphaned accounts** on deprovision failure. (3) **SAML clock-skew / cert-rotation** breaking login. (4) **SCIM loop** if HRMS also pushes to the IdP. |
| **Fallback** | Local password login (with MFA) remains available as a break-glass for admins so an IdP outage never locks out payroll on a due date. Clear precedence: employee master is authoritative; SSO/SCIM never mutates statutory fields (UAN, PAN, bank). |

**Acceptance criteria.** SSO login maps deterministically to an employee/admin record; a
deprovision event disables the login without deleting the employment record (retention per
EV-054 and §14.7; §16.12); an IdP outage does not lock out the payroll admin; SCIM never
overwrites UAN/PAN/bank.

#### 16.10.1 The SCIM 2.0 server contract, and the precedence rule that protects payroll

**One SCIM 2.0 implementation serves both Microsoft Entra ID and Okta** (r3/05, findings 19 and 20), which
is why this is one contract and not two integrations. The requirements below are the two
vendors' own published requirements, documentation read, September 2026.

| Requirement | Specification |
| --- | --- |
| Endpoints | `/Users` and `/Groups`, SCIM 2.0 |
| Authentication | A single bearer token accepted for the provisioning service |
| Query | Users retrievable by `id` and queryable by `userName` and `externalId`; groups queryable by `displayName`, which must be unique |
| Mutation | `PATCH` with JSON Patch `add` and `replace` |
| Deletion | **Soft delete via `active = false`, with the user still returned** — a hard delete would sever the employment record, which is not SCIM's to sever |
| Attribute mapping | The vendor's own mapping is honoured: login name to `userName`, soft-delete state to `active`, directory object id to `externalId` |
| Schema discovery | `/Schemas` implemented from the start even though it pays off only once listed, because Microsoft states schema discovery is the sole route to extend an existing gallery application's schema and is unavailable to a custom non-gallery one — retrofitting after listing is worse than building it now |
| Rate limits | Inbound pressure is relaxed by the vendors themselves: Okta doubles its wait on each 429 with a maximum of 10 attempts before permanent task failure. We still answer 429 with `Retry-After`, and a permanent task failure on their side raises `INT.IDP.*` on ours |
| SAML | SP support for both IdP-initiated and SP-initiated flows for Entra ID and Okta, plus Google Workspace's custom-SAML path, which any service provider can use with no vendor-side listing — noting its cap of 75 mapped groups, a design constraint on any group-driven role model |
| Listing | Gallery and network listings are separate third-party review gates and a GTM workstream, not an engineering dependency (§16.1.1 gate register) |

**The precedence rule.** SCIM governs **login accounts**. It does not govern employment
records, and it never touches statutory fields.

| Object | System of record | What SCIM may do |
| --- | --- | --- |
| Login account | The IdP | Create, update, deactivate |
| Employee master, assignment, service record | **This product** (§07, §14) | Nothing |
| UAN, ESIC IP, PAN, bank account, Aadhaar token, PT enrolment | **This product**, under §07's identifier placement rules | Nothing — a SCIM payload carrying one is rejected, not merged |
| Group membership | The IdP, where the tenant maps groups to roles | Propose a role; the role model's own guards still apply |

- **AC-IDP-1:** A SCIM deactivation disables the login and leaves the employment record
  intact and retained per §14.7; no SCIM operation can delete an employment record.
- **AC-IDP-2:** A SCIM payload containing any statutory identifier is rejected with a named
  code and is never partially applied.
- **AC-IDP-3:** The same server passes both vendors' provisioning conformance without
  vendor-specific branches, proved against both in staging.
- **AC-IDP-4:** An IdP outage never locks out the payroll admin: the local credential path
  with MFA remains available as break-glass, and its use is audited as a security event.
- **AC-IDP-5:** A group-to-role mapping that would exceed the third vendor's 75-group cap is
  refused at configuration time with the cap named, rather than silently truncating the
  mapping.

---

### 16.11 Public API posture, webhooks and MCP

The platform interface. The strategic frame (§12.7): **own the data and the
tools the assistant calls, not the assistant itself.**

**REST API.**

| Facet | Specification |
| --- | --- |
| **Contract** | Versioned REST API (`/v1`), OAuth2 client-credentials + scoped API keys per tenant, **ACL-inheriting** (an API caller can never exceed the granting user's permissions). Documented, self-serve keys — consistent with §18's "publish the price card / be evaluable without a demo" posture. |
| **Surface** | Read: employees, attendance, leave, pay-run summaries, filing status, documents. Write: **idempotent, audited, approval-gated** (create employee, submit declaration, initiate approvals). No write endpoint ever emits a statutory figure the engine didn't compute. |
| **Failure modes** | Auth/scoping errors, rate-limit breaches, schema-version drift for consumers, partial writes. |
| **Fallback / guarantees** | Idempotency keys on all writes; `Retry-After` on 429; deprecation policy (N-version support, sunset headers); no breaking change without a version bump. |

**Webhooks.** Event delivery (pay-run locked, filing accepted, disbursement settled,
device offline, filing-due-approaching) with signed payloads (HMAC), at-least-once
delivery, consumer-side idempotency (event id), exponential-backoff retry, and a
dead-letter + replay console.

**Rate limits (P0 even before the public API, per §13.7 [Verified]).** Per-tenant
**and** per-user limits are P0 because the product is priced per employee but consumed per
user — one heavy user can exceed the ARPU for that seat; even Microsoft Copilot Studio
disables agents at 125% of prepaid capacity (Source: §12.1 P5, §13.7 [Verified]; r2/03). Budget, meter, and
**degrade gracefully** (throttle, don't error-storm).

**MCP server.** Phasing has two parts. The tool layer the in-product assistant calls
ships in v1 as read and draft tools, with approval-gated write tools in v2 (§12 layer
table). The server exposed to *external* assistants matures at **P3** (§05.5 item 30) —
never on the critical path. Either way it is split three ways per §12.7:

1. **ACL-inheriting read tools** — the assistant sees only what the calling user may see.
2. **Idempotent, audited, approval-gated write tools** — a write proposes an action into
   the same approval workflow a human uses; it never bypasses segregation of duties (§08.13 G8).
3. **Per-tenant admin controls** to disable specific tools per assistant — a tenant can
   turn off, say, "initiate disbursement" for any external assistant. Write tools default
   off for external assistants, and AI features default off for RBI-, SEBI- and
   IRDAI-regulated tenants (§12.7, §12.8; Part E-7).

> **[Killed, §12.7; §20.4]** — **No revenue forecast may depend on the MCP server.** We are
> not aware of any evidence, as of September 2026, that shipping an MCP server has changed a
> buying decision, and the round-one MCP
> adoption stats are banned (§20.4). Keka already advertises a "Keka MCP Server" (EV-090,
> claim posture, not tested), so external-assistant access is an expected feature rather than
> a differentiator. We build it because if enterprise assistants converge on
> Copilot/Glean, we want to be the **governed data-and-tools source**, not because it sells.
> Design it to own the data and the tools; assume we do **not** own the chat surface.

**Acceptance criteria (API/MCP).**

- **AC-API-1:** Every write is idempotent (same key ⇒ one effect) and audited (who/what/when).
- **AC-API-2:** API and MCP callers can never exceed the granting user's ACL; a scope test
  proves an under-privileged token cannot read another user's payslip.
- **AC-API-3:** Per-tenant and per-user rate limits are enforced from v1 and degrade
  gracefully (429 + Retry-After), not with data loss.
- **AC-API-4:** A tenant admin can disable a named MCP write tool for an external assistant,
  and the disablement takes effect without a deploy.
- **AC-API-5:** A webhook consumer that is down receives buffered events on recovery
  (dead-letter replay) with no duplicate side-effects (consumer idempotency on event id).

#### 16.11.1 The resource model and the endpoint catalogue

The public API exists for a specific reason found in the research: four of the expense and
benefits vendors an Indian HRMS would be asked to integrate with **cannot be scoped from
public documentation at all** — one serves an empty documentation shell, one returns 401, two
publish no developer surface whatsoever (r3/05, finding 39). A public API converts an
unbounded set of unscopeable partner integrations into one documented self-service surface.
That is its job; it is not a platform ambition.

**Scope shape.** `<resource>:<action>` — `employee:read`, `payrun:write`. Three rules make
scopes safe rather than decorative: a token's effective permission is the **intersection** of
its scopes and the granting user's ACL (AC-API-2); no scope grants cross-tenant access, since
tenant resolution happens at the edge before any handler runs (§15.2.3); and a CA or bureau
token carries the `(ca_org_id, acting_on tenant_id)` pair, so an action on one client's data
can never be replayed against another's.

| Resource | Read | Write | Scope | Rate class | Filing- or pay-path? | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| `employees` | List, get, history-as-of | Create, update | `employee:*` | Standard | Both | `as_of` is a first-class query parameter: employee data is bitemporal for the classes §14 lists (Part E-2) |
| `assignments` | List, get | Create, update, end | `employee:*` | Standard | Both | Carries the work location that decides jurisdiction (Part E-5) |
| `establishments`, `registrations` | List, get | — | `org:read` | Standard | Filing | Read-only over the API: a registration is created with evidence, in-product |
| `attendance/punches` | List, get | Create (bulk) | `attendance:*` | Bulk | Pay | The device path is §16.4's, not this one; this is for non-device sources |
| `leave` | List, get, balances | Apply, approve | `leave:*` | Standard | Pay | Approval writes route into the same workflow a human uses (IG8) |
| `payruns` | List, get, register, variance | Create, advance state | `payrun:*` | Heavy | Pay | State transitions are guarded by FR-PAY-301's machine; the API cannot skip a state |
| `payslips` | List, get, document | — | `payslip:read` | Standard | Pay | A payslip is never generated by the API; it is fetched |
| `filings` | List, get, evidence-pack manifest | — | `filing:read` | Standard | **Filing** | Status is FR-PAY-711's. The API never marks a filing FILED — only a captured acknowledgement and receipt do (IG4) |
| `disbursements` | List, get, per-line status | Release | `disbursement:write` | Heavy | Pay | Release requires an approver distinct from the processor (FR-PAY-904); a token cannot be both |
| `documents` | List, get, download URL | Upload | `document:*` | Bulk | Both | Download URLs are short-lived and single-tenant |
| `exceptions` | List, get | Assign, resolve | `exception:*` | Standard | Both | The worklist is the product's honest surface for everything that failed (§16.12) |
| `webhooks` | List, get, deliveries | Create, update, delete, replay | `webhook:*` | Standard | — | §16.11.5 |
| `reports` | Async create, poll, fetch | — | `report:read` | Heavy | — | Long reports are jobs, never synchronous requests |

**What has no endpoint, deliberately.** No endpoint emits a statutory figure the engine did
not compute; no endpoint creates a consent record (consent is captured in the employee's own
name, in a surface they see — Part E-12); no endpoint reads or writes an Aadhaar number (the
token store is reachable only through §07's controls, and never over this API); no endpoint
reads a biometric template; no endpoint submits anything to a government portal, because no
such submission API is available to us (K-13) and inventing one in our own surface would
misrepresent what happens next.

#### 16.11.2 Request and response contract

| Concern | Contract |
| --- | --- |
| **Base and version** | `/v1` in the path. The API version and a schema object's version are independent: an ECR layout change mints a new schema version and no API version (§16.1) |
| **Auth** | OAuth 2.0 client credentials, or a scoped API key, per tenant. Keys are issued and revoked self-serve — consistent with §18's publish-and-be-evaluable posture |
| **Idempotency** | `Idempotency-Key` on every write. The key is stored with the response for `api.idempotency_retention_hours` (owner: Eng; routed to §20); a replay inside the window returns the original response, and a replay with a *different* body under the same key is a 409, never a silent second effect |
| **Correlation** | `Request-Id` echoed on every response and stamped into the audit record, so a customer's log line and our audit row join |
| **Money** | An object: integer minor units plus currency — `{"minor": 403730000, "currency": "INR"}` is ₹40,37,300, because the INR minor unit is the paisa and the §16.2 batch total is 40,37,300 × 100 paise. **The API never rounds.** Rounding is §08's, with its statutory exceptions, and a client that re-rounds an API figure will disagree with the payslip |
| **Periods — the dual vocabulary (EV-050)** | Every period accepts and returns **both**: `tax_year: "202627"` (the six-digit file field) and `financial_year: "2026-27"`, and search accepts either. Historical periods keep the old forms, and practitioners still use them, so refusing one vocabulary breaks real use (EV-050) |
| **Forms — the dual vocabulary** | Form identifiers accept both the 2026 and the legacy names — 130 and 16, 138 and 24Q, 124 and 12BB, 123 and 12BA, 122 and 12B (EV-050) — and responses carry both fields rather than picking a winner |
| **Dates and time** | Dates are calendar dates with no zone. Timestamps are UTC with an offset, and every portal or bank timestamp is stored as received *and* normalised, because a cut-off argument is settled by the counterparty's clock, not ours |
| **Pagination** | Cursor-based with a stable sort key. No offset pagination: payroll data mutates under the reader, and offsets silently skip or repeat rows |
| **Filtering** | An enumerated filter set per resource, with `updated_since` on every list endpoint so a consumer can build an incremental sync without polling everything |
| **Concurrency** | `ETag` on every mutable resource and `If-Match` required on update; a stale write is a 409 with the current version, never a last-writer-wins overwrite |
| **Partial failure** | A bulk write returns per-item status with the canonical error code per item (§16.12.1); it never returns a single aggregate failure that hides which items succeeded |
| **Field selection** | Absent by design. Data minimisation at the boundary is a per-integration allowlist (§16.12), not a client's choice of fields |

#### 16.11.3 The error envelope and the status-code decision table

One envelope for every error the API returns, and its `code` is the same canonical code the
integration error taxonomy uses (§16.12.1) — so a support conversation, a log line, a webhook
failure and an API 4xx all name the same thing.

| Envelope field | Meaning |
| --- | --- |
| `code` | Canonical code in §16.12.1's grammar, e.g. `INT.API.PERMANENT.VALIDATION_FIELD_INVALID` — the second segment is always one of the five classes, so an envelope code and a worklist code are the same string |
| `message` | One sentence, safe to show a user, no internal identifiers |
| `detail[]` | Per-field or per-item detail: `field`, `value_shown` (redacted for restricted classes), `reason` |
| `retryable` | Boolean, and the only thing a client should branch on for retry |
| `retry_after_s` | Present whenever `retryable` is true and a wait is known |
| `request_id` | Echo of the correlation id |
| `doc_url` | Stable link to the code's documentation |

| Condition | Status | `retryable` | Notes |
| --- | --- | --- | --- |
| Malformed body or unknown field | 400 | false | Unknown fields are rejected, not ignored — silent field-dropping is how an integration loses data for months |
| Authentication missing or invalid | 401 | false | — |
| Authenticated, but scope or ACL insufficient | 403 | false | The message never reveals whether the object exists |
| Object not visible to this caller | 404 | false | Same response whether absent or invisible, so the API is not an enumeration oracle |
| Method not allowed for this state — e.g. releasing a batch whose run is not LOCKED | 409 | false | The response names the current state and the states from which the action is legal |
| `If-Match` stale | 409 | true after re-read | — |
| Idempotency key replayed with a different body | 409 | false | — |
| Validation failed on a business rule | 422 | false | Includes every pre-flight rule that would fail at a bank or portal, so the client learns it here rather than at the counterparty |
| Rate limit exceeded | 429 | true | `Retry-After` always present (AC-API-3) |
| Internal error | 500 | true | No detail leaks; `request_id` is the handle |
| Dependency unavailable — bank, portal, provider | 503 | true | Names which dependency, because the client's retry decision depends on it |
| Feature disabled for this tenant — AI off for a regulated tenant, a disabled MCP tool | 403 with a distinct code | false | A disabled feature is never a 404: the caller must be able to tell "not permitted here" from "does not exist" |

#### 16.11.4 Versioning, deprecation and what counts as breaking

| Change | Breaking? | Handling |
| --- | --- | --- |
| Adding an optional response field | No | Ships any time; clients must tolerate unknown fields |
| Adding an optional request field | No | — |
| Adding a new enum value to a response | **Yes, in effect** | Enums that can grow are documented as open, and a client contract test asserts unknown-value tolerance before the value ships |
| Removing or renaming a field | Yes | New API version |
| Tightening a validation | Yes | New API version, or a per-tenant opt-in with a deadline |
| Changing a default | Yes | New API version |
| Changing a **schema object** — ECR layout, a bank template, a Form 138 layout | **No** to the API | The API exposes the artefact and its schema version; the layout is data (§16.1, IG5). This separation is the point: a gazette change must never force a client migration |
| Changing a canonical error code's meaning | Yes | Codes are append-only; a code is retired, never repurposed |

Support is **N and N−1**. A deprecated version returns `Sunset` and `Deprecation` headers
from the day the successor ships, the sunset date is at least `api.sunset_notice_days`
(owner: Eng; routed to §20) away, and traffic on a sunsetting version is reported per tenant
so the sunset is a conversation and not a surprise.

#### 16.11.5 The webhook catalogue and the delivery contract

Events exist so a consumer never has to poll the filing and pay paths. Each carries a stable
`event_id` for consumer-side dedup, an `occurred_at`, the tenant, and a resource reference —
**never a full payroll payload**, because a webhook endpoint is an uncontrolled egress and
minimisation applies to it exactly as to any other leg (§16.12).

| Event | Fires when | Dedup key | Ordering guarantee |
| --- | --- | --- | --- |
| `payrun.locked` | The month reaches LOCKED (FR-PAY-301 M8) | `payrun_id` | Per pay run |
| `disbursement.released` | A batch leaves READY for RELEASED | `batch_id` | Per batch |
| `disbursement.pending_bank_approval` | The batch enters the bank's own approval queue (§16.3.3) | `batch_id` | Per batch |
| `disbursement.line_settled`, `disbursement.line_returned` | Per-line settlement status arrives | `batch_id + employee_id` | Per line |
| `disbursement.reconciled` | Σ credited = Σ net = Σ payslips and exceptions cleared | `batch_id` | Per batch |
| `filing.generated`, `filing.validated`, `filing.submitted` | FR-PAY-711 transitions | `filing_instance_id + state` | Per filing instance |
| `filing.rejected` | A portal rejects, with the mapped code and the raw artefact reference | `filing_instance_id + attempt` | Per filing instance |
| `filing.filed` | The evidence pack completes (§16.5.6) | `filing_instance_id` | Per filing instance |
| `filing.blocked` | A BLOCKED state is entered, with its reason — unpublished layout, unresolved regime, chronology gap, joint declaration pending | `filing_instance_id + reason` | Per filing instance |
| `filing.due_approaching` | The deadline clock crosses a configured threshold | `filing_instance_id + threshold` | Per filing instance |
| `device.offline` | A device passes `device_unseen_alert_h` | `device_sn + window` | Per device |
| `exception.opened`, `exception.resolved` | Worklist items | `exception_id + state` | Per exception |
| `schema.version_published` | A bank template, portal layout or state pack version publishes | `schema_id + version` | Global |

| Delivery property | Contract |
| --- | --- |
| **Signature** | HMAC over the raw body with a per-endpoint secret, plus a timestamp inside the signed material to make replay detectable. Two secrets are valid during rotation |
| **Semantics** | At-least-once. Consumers dedup on `event_id`; we do not promise exactly-once, and saying we did would be false |
| **Ordering** | Per-key ordering only, as the table says. No global order is promised — a consumer that needs a sequence reads the resource |
| **Retry** | Exponential backoff with jitter, bounded by `webhook.max_attempts` and `webhook.max_age_h` (owner: Eng; routed to §20), then dead-letter |
| **Dead letter and replay** | Every undelivered event is visible with its failure reason, and replayable by the tenant per event or per time range. A replay re-uses the original `event_id`, so a correct consumer is unharmed |
| **Circuit breaking** | An endpoint failing beyond a threshold is suspended and the tenant is told in-product; delivery resumes on repair with the buffered set, subject to `webhook.max_age_h` |
| **Egress minimisation** | The payload carries references, not statutory identifiers: no Aadhaar token, no PAN, no bank account, no biometric reference, ever |

#### 16.11.6 Rate limits, quotas and graceful degradation

Rate limiting is **P0 before the public API exists**, because the product is priced per
employee and consumed per user: one heavy user can exceed the ARPU of the seat they occupy
(§13.7 [Verified]). It is therefore a commercial control as much as a stability one.

| Class | Applies to | Limit dimension | Parameter (owner: Eng; values routed to §20) |
| --- | --- | --- | --- |
| Standard | Most reads and small writes | Per tenant and per user, per minute | `api.rate.standard_per_tenant`, `api.rate.standard_per_user` |
| Bulk | Bulk ingest and document upload | Per tenant, per minute, and a payload-bytes budget | `api.rate.bulk_per_tenant`, `api.rate.bulk_bytes_per_tenant` |
| Heavy | Pay-run operations, disbursement release, report jobs | Concurrency, not rate | `api.concurrency.heavy_per_tenant` |
| Burst allowance | All classes | Token-bucket depth | `api.rate.burst_multiplier` |
| Budget ceiling | Metered consumption overall | Percentage of the tenant's entitlement | `gateway.budget_hard_ceiling` (§15.2.3), with the documented precedent that one vendor disables agents at 125% of prepaid capacity (§13.7) |

**Degradation ladder**, applied in order, so the first response to pressure is never data
loss: (1) serve from cache where the resource permits it; (2) shed optional enrichment; (3)
queue writes that tolerate it and return 202 with a status URL; (4) 429 with `Retry-After`;
(5) suspend the *class*, never the tenant — a tenant that exhausts its bulk budget can still
read a filing status, because the filing path is never collateral damage of a reporting job.

**Outbound limits are the counterparty's, and they are asymmetric.** Our own limits are not
the constraint that bites first. One cloud GL publishes 100 requests per minute per
organisation with a daily cap as low as 1,000 on its free plan and a concurrency of 5 to 10
(r3/05), which is why the journal is one consolidated call per pay run rather than one per
employee (§16.6); one identity vendor doubles its wait on each 429 with a maximum of 10
attempts before permanent task failure (r3/05), which relaxes our inbound design because the
IdP retries for us; one messaging surface throttles above four requests a second with a
28 KB message limit (r3/05); and a new WhatsApp business portfolio reaches only 250 unique
users in a rolling 24 hours (r2/04), which is a ramp, not a rate limit, and is designed
around rather than retried through.

#### 16.11.7 The MCP tool catalogue and write staging

§12 owns the assistant. This subsection owns the **tool surface as an integration**: what a
tool is, how it is described, and what happens to a write. Two facts frame it —
**[Killed, §12.7]** no revenue forecast may depend on the MCP server, and a competitor
already advertises one (EV-090, claim posture, not tested), so it is expected furniture
rather than a differentiator.

| Tool class | Examples | ACL | Default for an **external** assistant | Default for a regulated tenant |
| --- | --- | --- | --- | --- |
| **Read** | Filing status, pay-run summary, leave balance, exception list, device health | Inherits the calling user's ACL exactly (AC-API-2) | On | **Off** — AI features default off for RBI, SEBI and IRDAI tenants (Part E-7, §12.8) |
| **Draft** | Draft a policy answer, draft a letter, explain a payslip line by citing the engine's own computation | Read ACL plus a draft-store write | On | Off |
| **Write** | Create an employee, submit a declaration, initiate an approval | Proposes into the same approval workflow a human uses; never bypasses segregation of duties (IG8) | **Off** | Off |
| **Forbidden** | Release a disbursement, advance a filing state, generate or alter a statutory artefact, write a consent record, read an Aadhaar number or a biometric template | — | Not exposed at any setting | Not exposed |

**Write staging.** A write tool never mutates. It creates a **proposal** carrying the tool
name, the calling assistant, the granting user, the inputs, a diff preview, and an
`Idempotency-Key`. The proposal enters the human approval queue for that object; approval
executes it under the *granting user's* identity, and the audit record names both the human
and the assistant. A proposal expires after `mcp.proposal_ttl_h` (owner: Eng; routed to §20)
rather than lingering as a latent write.

**Tool descriptions are a security surface.** Each tool's description and schema are
versioned artefacts in the §16.1.1 register, reviewed like any other external contract,
because a tool description is read by a model and can be manipulated by whoever can write
into the context. Two rules follow: tool output is data, never instruction, and no tool
returns free text that a subsequent tool call treats as a parameter without a human in
between.

- **AC-API-6:** Every write endpoint and every MCP write tool accepts an idempotency key,
  and a replay inside the retention window returns the original result with no second effect;
  a replay with a different body is a 409.
- **AC-API-7:** A stale `If-Match` produces a 409 carrying the current version; no update
  path performs last-writer-wins.
- **AC-API-8:** Both period vocabularies and both form vocabularies are accepted on input and
  returned on output for every endpoint that carries a period or a form (EV-050), proved by a
  paired-request test on each.
- **AC-API-9:** No API or webhook payload anywhere contains an Aadhaar number or token, a
  biometric reference, or a full bank account number; a contract test asserts this against a
  recorded corpus of every response shape.
- **AC-API-10:** A bulk write returns per-item status; a partial failure never returns a
  single aggregate error, and the successful items are not rolled back unless the endpoint
  documents itself as atomic.
- **AC-API-11:** Deprecated versions carry `Sunset` and `Deprecation` headers from the day
  the successor ships, and per-tenant traffic on a sunsetting version is reported.
- **AC-API-12:** Under load the degradation ladder is observed in order, and a filing-status
  read still succeeds while a reporting class is suspended.
- **AC-API-13:** An MCP write tool's proposal cannot execute without a human approval
  recorded against a named person, and the audit record names the assistant, the granting
  user and the approver.
- **AC-API-14:** Disabling a tool or a feature for a tenant produces a distinct
  "not permitted here" code rather than a 404, and takes effect without a deploy
  (AC-API-4 extended).

---

### 16.12 Cross-cutting: reliability, idempotency, DPDP/CERT-In, residency

The properties every integration above must share. Stated once, enforced everywhere.

<!-- DIAGRAM: failure-taxonomy -->

**Failure taxonomy and response (applies to all N integrations).**

| Failure class | Response |
| --- | --- |
| **Transient** (timeout, 5xx, portal maintenance) | Exponential backoff with jitter, bounded retries, then queue for later — the deadline clock is surfaced, not hidden. |
| **Permanent** (bad data, rejected file, invalid IFSC/PAN/UAN) | Pre-flight validation catches it before emission; if it slips through, it opens an **exception worklist** item — never a silent failure. |
| **Partial** (batch settles some lines; an ECR filed without members flagged under exclude-and-flag, who follow on a Supplementary return — EV-037, Part E-11) | Line-level status; re-queue only the failures with a per-line idempotency key; the parent object stays in a `*-with-exceptions` state until cleared. |
| **Schema drift** (bank release, FVU version, EPFO layout, PT slab) | Versioned schema object updated as data; the watcher (below) flags the change; old and new versions coexist for in-flight periods. |
| **External unavailable** (device offline, IdP down, portal down near due date) | Fallback path (manual upload / web check-in / break-glass login); the primary is never a single point of failure for pay or filing. |

These five classes describe **how an exchange failed**; they are not a second statutory
error scheme. Any failure that lands on a statutory artefact also carries exactly one
§08 family code — SA-FMT, SA-VER, SA-ID, SA-RULE, SA-REC, SA-SEQ, SA-PORT or SA-CALC
(FR-PAY-713) — so a rejected ECR upload is recorded as *Permanent* + *SA-PORT*, and a
portal outage the day before a due date as *External unavailable* with no SA code until
an artefact is affected.

**Idempotency is universal.** Every outbound artefact — bank batch line, GL journal, ECR
member row, webhook event — carries a **deterministic external key** so re-sends update
rather than duplicate. This is the single most important reliability property: in a
statutory/money system, a duplicate is worse than a miss.

| Artefact | Idempotency key |
| --- | --- |
| Bank NEFT line | `payrun_id + employee_id` |
| Tally / GL journal | `payrun_id` (voucher external key) |
| ECR member row | `establishment + wage_month + return_type + UAN` — a Supplementary return accepts only UANs absent from every prior return for the month; a Revised return supersedes the prior return's rows (EV-037) |
| Device punch | `device_sn + device_user_id + device_timestamp + direction` + `payload_hash` (§09.3 FR-DEV-001 AC4) |
| Webhook event | `event_id` (consumer-side dedup) |
| API write | client-supplied `Idempotency-Key` header |

**Data protection on integrations — what binds today, and what binds from ~May 2027.**
The legal analysis is §23's; this block states only what it means at the integration
boundary.

- **[Reversed]** Earlier text stated DPDP s.7(i) — "employers need no employee consent to
  process employee data for employment purposes" — as current law. It is **not in force**:
  DPDP's substantive provisions, s.7(i) included, commence on or about 13 May 2027
  (EV-058). **Today** the SPDI Rules 2011 require **consent in writing before collecting
  sensitive personal data** (r.5(1)), and r.3 lists biometric information and financial
  information as sensitive (EV-060) — which reaches the device integration (templates,
  §16.4) and the bank-account and payout integrations (financial information, §16.3). Who owes that duty is under counsel review; written-consent capture is built
  either way (Part D-4, §23; FR-CHR-102). When s.7(i) commences it disapplies consent and
  notice for employment purposes only; it does not disapply the s.8 duties (K-03). DPDP
  itself creates no sensitive category (s.2(t), EV-059) — but the SPDI Rules do, and they
  are live (K-06). Both consent regimes run concurrently across ~May 2027 (Part E-6).
- **Onward transfer to a sub-processor** (a BSP for WhatsApp, a payout aggregator, an
  e-sign ESP, an AI provider): SPDI r.7 restricts cross-border transfer of sensitive data
  today (EV-060); for regulated tenants, sub-contractor consent and contract terms bind
  through the customer — RBI para 16(r) where the arrangement is material for that entity
  (EV-087; materiality is a counsel question, Part D-14), SEBI's 20 mandatory contract terms
  (EV-085), IRDAI's regulator-access undertaking reaching sub-contractors where the
  arrangement is outsourcing (EV-086); and
  DPDP s.8(2) will require a "valid contract" with any processor once it commences
  (EV-058; r4/01). The product therefore keeps a **data processing agreement with every
  sub-processor and a maintained sub-processor register, wired to the sub-processor-change
  gate** (§12.8; Part E-7) — a product control, not a claim about which statute imposes it.
- **Data minimisation at the boundary:** each integration sends only the fields it needs
  (a job board does not need bank/UAN; a device ingest does not need PAN). Enforced as a
  per-integration allowed-field allowlist, not a convention. Three structural rules sit
  on top of the allowlist:
  - **No integration payload carries an Aadhaar number.** Business tables hold only an
    opaque token (Part E-6, §07). Where a portal flow asks for Aadhaar, the employer
    enters it from the token store under §07's access controls; whether that makes the
    employer a "requesting entity" is under counsel review (Part D-7, §23). Every
    transmission of it is encrypted (reg 6(4), EV-068).
  - **Every outbound model call passes the redaction chokepoint** — default-deny on
    Aadhaar, PAN, bank account and IFSC, and biometric templates — which is structural in
    the call graph, not a per-integration choice (Part E-7, §12.8.3).
  - **Bank-account details are SPDI "financial information"** (r.3(ii), EV-060; §05.5
    item 35), so every integration whose payload carries them — the bank file, the payout
    API, any journal that names an account — inherits the written-consent capture and the
    r.7 transfer constraint above.
- **Retention & deletion** propagate to integrations: a deprovisioned/erased employee's
  data must be removable from downstream caches, subject to statutory retention on
  registers and filings — per each rule-set's own wording, not a flat five years (EV-054).
  State-sphere periods are unknown and go to counsel (Part D-11, §23); neither immediate
  purge nor a one-year suppression is hard-coded (Part D-9); which classes are erasable,
  and what replay returns after an erasure, are §14.7's (Part E-2).

**CERT-In on integrations (binds from day one, not at enterprise scale — EV-062; §17.6
[Verified]).**

- **6-hour incident reporting** — an integration incident of a type listed in Annexure I
  is reportable within six hours of becoming aware (EV-062); whether a given event (a
  leaked bank-API credential, say) falls in a listed type is a triage decision inside the
  §17 pipeline, made against the clock, not after it. A **CERT-In point of contact** is
  designated and registered before the first paying customer (direction (iii), r4/02;
  §17.6) (Source: CERT-In Directions No. 20(3)/2022-CERT-In, 28.04.2022, EV-062).
- **180 days of ICT logs retained within Indian jurisdiction** — integration call logs,
  file-transfer logs, webhook delivery logs, and LLM prompt and completion logs (kept in
  India, Part E-7, §15) are in scope (EV-062).
- **The device ingest enters the same triage** — Annexure I covers IoT devices (item
  (xiii), EV-062), so an incident on the §16.4 ingest path (a spoofed-serial flood, say,
  AC-DEV-5) is triaged as a possible IoT-class incident. The terminals belong to the
  customer, so whose report it is — ours, the customer's, or both — is decided in triage
  and, where unclear, by counsel (§23).
- **Clock sync to NIC/NPL NTP** — the same NTP requirement that fixes device clock-drift
  (§16.4) is a CERT-In obligation; one control, two problems.
- **Attacks on AI/ML systems are an explicitly reportable class** (Annexure I item (xx),
  EV-062) — the MCP/AI integration surface *enlarges* the reportable perimeter; its
  incidents enter the same six-hour pipeline as an AI/ML incident class (Part E-8, §17).

**Residency and provider abstraction (segment-specific gate — §17.7; legal analysis §23).**

- **Neither a blanket localisation mandate nor none** (K-08). DPDP's cross-border rule is
  a negative list that is empty and not in force; the live constraints are CERT-In's 180
  days of ICT logs in India (EV-062), SPDI r.7's limits on cross-border transfer of
  sensitive data (EV-060), and sectoral rules for RBI, SEBI and IRDAI customers
  (EV-085–087).
- **RBI:** the Outsourcing of IT Services Directions (effective 1 October 2023) carry data
  localisation, a right to audit including by RBI, sub-contractor consent (para 16(r)) and
  regulator inspection (para 16(o)) — **materiality-gated, determined entity by entity**
  (EV-087, [Verified — mirror]; pull from the primary source before customer use).
  **[Reversed]** Earlier text said these bind any SaaS vendor with "no turnover threshold"
  (K-22). Whether our arrangement is material outsourcing for a given RBI entity is a
  counsel question (Part D-14, §23). Silently adding an LLM vendor can put a bank customer
  in breach of its own obligations (EV-087) — hence the sub-processor gate.
- **SEBI:** data must reside and be processed within India, and FAQ Q47/Q50 impose the
  MeitY-empanelled-infrastructure rule on PaaS/SaaS providers (EV-085).
- **IRDAI:** **[Reversed]** Earlier text said IRDAI "mandates records in Indian data
  centres". The IRDAI Information and Cyber Security Guidelines 2023 carry no localisation,
  MeitY or STQC requirement; IRDAI localisation exists only for policy records, and its
  outsourcing definition captures managed payroll but not a self-service licence (EV-086).
- **Procurement can be stricter than regulation:** SBI's HRMS RFP requires DC, DR and HA
  zones in India only and all data functions and processing within India (r2/06). Every
  integration touching a regulated tenant follows that tenant's sectoral profile (§17)
  and is exit-able.
- **At least three interchangeable backends with residency selectable per tenant** — this
  is the same abstraction the AI model-router needs for cost (§13.5), so it is one piece
  of work serving two constraints. Residency is a **per-provider matrix**, and data-at-rest
  residency ≠ in-country inference — track both per provider (§13.10: OpenAI offers India
  data-at-rest, while its first-party inference defaults to the US and in-country
  inference for its models runs through Amazon Bedrock; Anthropic's first-party API offers
  neither; Vertex has an India region; for a SEBI tenant no candidate backend is yet
  confirmed to meet the MeitY-empanelled-infrastructure rule — re-verify per provider,
  §20 V-13; do not rely on Sarvam hosting until verified).

**The statutory-change watcher (integration-facing).** Every file-schema integration
(§16.5, bank formats, PT/LWF slabs) subscribes to the watcher. **[Verified, §02.4]**
It must **catch amendments and corrigenda, not only new instruments** — the Nov-2026
inversion was a corrigendum, and a new-notifications-only watcher would have missed it.
Each hit routes to the owning schema object with its gazette source (URL + date) for a
review-and-version step before any period is filed against it. The watcher is not just a
product feature; it is the operating-model consequence (§05.15) — the company is a
**compliance-maintenance operation with a permanent statutory team**, and the watcher
(§13.13) is the tooling of §22's compliance data pipeline.

#### 16.12.1 The integration error taxonomy — one code space

The five failure classes above say **how** an exchange failed. They are not enough to act on:
two transient failures, one on a device and one on a bank, have nothing in common
operationally. Every integration failure therefore carries exactly one **canonical code** in
a single shared space, and the code — not a log message, not a screenshot — is what the
worklist, the metric, the alert, the API error envelope (§16.11.3), the webhook and the
support conversation all name.

**Code shape:** `INT.<FAMILY>.<CLASS>.<SPECIFIC>`

- `FAMILY` — the integration family: `BANK`, `DEV`, `EPFO`, `ESIC`, `TDS`, `PT`, `LWF`,
  `TALLY`, `GL`, `MIG`, `API`, `HOOK`, `COMM`, `IDP`, `RECRUIT`.
- `CLASS` — one of the five classes in §16.12: `TRANSIENT`, `PERMANENT`, `PARTIAL`,
  `DRIFT`, `UNAVAIL`.
- `SPECIFIC` — the named condition.

**Every code carries seven attributes**, and a code without all seven cannot be registered:

| Attribute | Values | Why |
| --- | --- | --- |
| `class` | The five classes | Selects the retry and fallback machinery (§16.12.2) |
| `disposition` | `auto_retry` · `worklist` · `block_emission` · `block_state` · `security_event` | What the system does without being asked |
| `actor` | `system` · `tenant_admin` · `employee` · `our_operator` · `counterparty` | Who can actually clear it. An exception with no actor is an exception nobody owns |
| `retryable` | Boolean | The only flag a client branches on (§16.11.3) |
| `sa_code` | One §08 family code, or none | A failure that lands on a statutory artefact carries exactly one of `SA-FMT`, `SA-VER`, `SA-ID`, `SA-RULE`, `SA-REC`, `SA-SEQ`, `SA-PORT`, `SA-CALC` (FR-PAY-713). A failure that does not touch an artefact carries none — and inventing one would corrupt the statutory error rate |
| `fallback_leg` | A `leg_id` from §16.1.1, or none | IG1 is testable only if each code's fallback is named |
| `message_key` | A localisable key | The customer-facing sentence is an owned artefact, not a developer's string |

<!-- DIAGRAM: integrations-api-error-triage -->

**The registered code set.** Not exhaustive for all time — codes are append-only and a code
is retired, never repurposed (§16.11.4) — but this is the set the five R1 legs must implement.

| Code | Class | Disposition | Actor | SA code | Fallback leg |
| --- | --- | --- | --- | --- | --- |
| `INT.BANK.PERMANENT.IFSC_UNKNOWN` | Permanent | `block_emission` | tenant_admin | — | — |
| `INT.BANK.PERMANENT.ACCOUNT_INVALID` | Permanent | `block_emission` | tenant_admin | — | — |
| `INT.BANK.PERMANENT.AMOUNT_BELOW_RAIL_MINIMUM` | Permanent | `block_emission` | system | — | Alternate rail |
| `INT.BANK.PERMANENT.AMOUNT_ABOVE_RAIL_LIMIT` | Permanent | `block_emission` | tenant_admin | — | `bank.out.salary_file` |
| `INT.BANK.PERMANENT.ENCODING_UNREPRESENTABLE` | Permanent | `block_emission` | tenant_admin | — | — |
| `INT.BANK.PARTIAL.LINE_RETURNED` | Partial | `worklist` | tenant_admin | — | Successor batch, same per-line key |
| `INT.BANK.PARTIAL.LINE_FAILED_PRE_NETWORK` | Partial | `worklist` | tenant_admin | — | Successor batch |
| `INT.BANK.PERMANENT.BANK_APPROVAL_REJECTED` | Permanent | `worklist` | tenant_admin | — | Re-prepared batch, never auto |
| `INT.BANK.TRANSIENT.PROVIDER_5XX` | Transient | `auto_retry` | system | — | Same key, bounded attempts |
| `INT.BANK.UNAVAIL.CONNECTION_STALE` | Unavailable | `block_state` | tenant_admin | — | `bank.out.salary_file` |
| `INT.BANK.UNAVAIL.OTP_LOCKED_OUT` | Unavailable | `block_state` | tenant_admin | — | `bank.out.salary_file` |
| `INT.BANK.DRIFT.TEMPLATE_REJECTED_BY_BANK` | Drift | `block_emission` | system | — | Prior PUBLISHED version, if the batch's period permits |
| `INT.BANK.DRIFT.STATEMENT_FORMAT_UNKNOWN` | Drift | `worklist` | our_operator | — | Manual reconciliation entry |
| `INT.DEV.PERMANENT.SERIAL_UNREGISTERED` | Permanent | `security_event` | tenant_admin | — | — |
| `INT.DEV.PERMANENT.SECRET_MISMATCH` | Permanent | `security_event` | tenant_admin | — | — |
| `INT.DEV.PERMANENT.USER_UNMAPPED` | Permanent | `worklist` | tenant_admin | — | Held out of LOP and OT until mapped, never counted absent |
| `INT.DEV.DRIFT.RECORD_UNPARSEABLE` | Drift | `worklist` | system | — | Quarantine plus re-parse (§16.4.2) |
| `INT.DEV.TRANSIENT.RATE_THROTTLED` | Transient | `auto_retry` | system | — | Device buffer |
| `INT.DEV.UNAVAIL.DEVICE_UNSEEN` | Unavailable | `worklist` | tenant_admin | — | Web or mobile check-in, CSV, manual muster |
| `INT.DEV.PERMANENT.TEMPLATE_WITHOUT_CONSENT` | Permanent | `worklist` | tenant_admin | — | Erasure item opened; punch kept and counted |
| `INT.EPFO.PERMANENT.VALIDATION_AGE58_EPS` | Permanent | `block_emission` | tenant_admin | `SA-RULE` | — |
| `INT.EPFO.PERMANENT.MEMBER_OUTSIDE_DOJ_DOL` | Permanent | `block_emission` | tenant_admin | `SA-RULE` | — |
| `INT.EPFO.PERMANENT.EXIT_DATE_JOINT_DECLARATION` | Permanent | `block_state` | tenant_admin | `SA-ID` | Member excluded and flagged; follows on a Supplementary return |
| `INT.EPFO.PERMANENT.UAN_MISSING_OR_KYC_INCOMPLETE` | Permanent | `worklist` | employee | `SA-ID` | Exclude-and-flag with operator and employee notices; **never** a payroll block (Part E-11) |
| `INT.EPFO.PERMANENT.CHRONOLOGY_GAP` | Permanent | `block_state` | tenant_admin | `SA-SEQ` | None — the gap must be filed (EV-038) |
| `INT.EPFO.PERMANENT.REVISION_AFTER_PAYMENT_INITIATED` | Permanent | `block_state` | system | `SA-SEQ` | Supplementary where the member qualifies (EV-037) |
| `INT.EPFO.DRIFT.LAYOUT_REJECTED` | Drift | `block_emission` | system | `SA-FMT` | Prior schema version for the period |
| `INT.EPFO.PERMANENT.PORTAL_ERROR_UNMAPPED` | Permanent | `worklist` | our_operator | `SA-PORT` | Raw error file attached and routed to §22 (FR-PAY-713 AC-713.4) |
| `INT.EPFO.UNAVAIL.PORTAL_DOWN` | Unavailable | `worklist` | our_operator | — | Attended queue; the deadline clock is surfaced |
| `INT.ESIC.PERMANENT.IP_NOT_REGISTERED` | Permanent | `block_emission` | tenant_admin | `SA-ID` | — |
| `INT.ESIC.PERMANENT.AREA_NOT_NOTIFIED` | Permanent | `block_emission` | tenant_admin | `SA-RULE` | The location does not file |
| `INT.ESIC.DRIFT.TEMPLATE_UNCAPTURED` | Drift | `block_state` | system | `SA-FMT` | Worksheet the operator keys in (§16.5.2) |
| `INT.ESIC.UNAVAIL.REGIME_UNRESOLVED` | Unavailable | `block_state` | system | — | BLOCKED-pending-regime, never a guessed file (IG6) |
| `INT.TDS.PERMANENT.PAN_MISSING_OR_INOPERATIVE` | Permanent | `worklist` | employee | `SA-ID` | Higher-rate deduction path (§08) |
| `INT.TDS.PERMANENT.CHALLAN_NOT_IN_CSI` | Permanent | `block_emission` | tenant_admin | `SA-REC` | — |
| `INT.TDS.PERMANENT.FVU_STACK_MISMATCH` | Permanent | `block_emission` | system | `SA-VER` | Route by period to the correct stack (EV-052) |
| `INT.TDS.UNAVAIL.Q4_LAYOUT_UNPUBLISHED` | Unavailable | `block_state` | system | — | None. BLOCKED-pending-layout (EV-046) |
| `INT.TDS.UNAVAIL.CORRECTION_WINDOW_CLOSED` | Unavailable | `block_state` | system | — | Generation proceeds, submission holds (F-02) |
| `INT.TDS.PERMANENT.LEGACY_CORRECTION_UNSUPPORTED` | Permanent | `worklist` | tenant_admin | — | Routed to the prior vendor or the tenant's CA (§05.7 A-28) |
| `INT.PT.DRIFT.SLAB_UNVERIFIED` | Drift | `block_state` | system | `SA-RULE` | The state renders with its "confirm before filing" banner (§16.5.4) |
| `INT.PT.PERMANENT.REGISTRATION_MISSING` | Permanent | `block_emission` | tenant_admin | `SA-ID` | — |
| `INT.LWF.DRIFT.PERIODICITY_UNKNOWN` | Drift | `block_state` | system | — | No remittance leg ships for that state (§05.17 PR-03) |
| `INT.MIG.PERMANENT.TIEOUT_BREACH` | Permanent | `block_state` | tenant_admin | — | Correct at source, or override with reason and approver |
| `INT.MIG.PERMANENT.COLUMN_UNMAPPED` | Permanent | `worklist` | tenant_admin | — | Reported, never dropped (AC-MIG-3) |
| `INT.MIG.PERMANENT.CONSENT_NOT_IMPORTABLE` | Permanent | `worklist` | employee | — | Migration consent flow (Part E-12) |
| `INT.GL.PERMANENT.PERIOD_LOCKED` | Permanent | `worklist` | tenant_admin | — | Downloadable journal |
| `INT.GL.TRANSIENT.RATE_LIMITED` | Transient | `auto_retry` | system | — | Backoff under the same `payrun_id` |
| `INT.TALLY.PERMANENT.LEDGER_UNMAPPED` | Permanent | `worklist` | tenant_admin | — | Named suspense ledger plus a reconciliation exception (AC-TLY-4) |
| `INT.TALLY.PERMANENT.PERIOD_NOT_OPEN` | Permanent | `block_emission` | tenant_admin | — | Downloadable journal (AC-TLY-5) |
| `INT.COMM.PERMANENT.TEMPLATE_NOT_APPROVED` | Permanent | `worklist` | our_operator | — | Email or in-app |
| `INT.COMM.UNAVAIL.TIER_CAP_REACHED` | Unavailable | `worklist` | system | — | SMS, IVR or email; never gate a payslip on it |
| `INT.IDP.PERMANENT.IDENTITY_UNMAPPED` | Permanent | `worklist` | tenant_admin | — | Local credential with MFA |
| `INT.API.PERMANENT.SCOPE_INSUFFICIENT` | Permanent | `worklist` | tenant_admin | — | None — the caller's grant is widened in-product, or the call is not made |
| `INT.API.PERMANENT.VALIDATION_FIELD_INVALID` | Permanent | `block_emission` | tenant_admin | — | None. The 422 carries the per-field detail so the client learns it here rather than at the counterparty (§16.11.3) |
| `INT.API.PERMANENT.IDEMPOTENCY_KEY_CONFLICT` | Permanent | `block_emission` | tenant_admin | — | None — a replayed key with a different body is a client defect, and inventing a second effect is the failure being prevented |
| `INT.API.PERMANENT.VERSION_STALE` | Permanent | `worklist` | tenant_admin | — | Re-read and re-submit under the current `ETag`; never last-writer-wins (AC-API-7) |
| `INT.API.PERMANENT.FEATURE_DISABLED_FOR_TENANT` | Permanent | `block_state` | tenant_admin | — | None. This is the distinct "not permitted here" code §16.11.3 requires in place of a 404 — a disabled MCP tool, or AI off for a regulated tenant (AC-API-14) |
| `INT.API.TRANSIENT.RATE_LIMITED` | Transient | `auto_retry` | counterparty | — | The degradation ladder (§16.11.6); `Retry-After` always present |
| `INT.RECRUIT.PERMANENT.BOARD_CONTRACT_MISSING` | Permanent | `worklist` | tenant_admin | — | Assisted manual posting plus the careers-page and inbound-email capture (§16.8) |
| `INT.RECRUIT.PERMANENT.BOUNDARY_VIOLATION_ATTEMPTED` | Permanent | `security_event` | system | — | None. A candidate-database search or bulk profile fetch is architecturally absent (AC-REC-3); reaching this code means the build check failed |
| `INT.HOOK.TRANSIENT.CONSUMER_5XX` | Transient | `auto_retry` | counterparty | — | Dead-letter and replay |
| `INT.HOOK.UNAVAIL.ENDPOINT_SUSPENDED` | Unavailable | `worklist` | tenant_admin | — | Dead-letter retained to `webhook.max_age_h`, replayable on repair under the original `event_id` (§16.11.5) |

**Triage decision table** — how an unclassified failure becomes a code. Applied in order; the
first matching row wins.

| # | Condition | Class | Disposition |
| --- | --- | --- | --- |
| T1 | The counterparty rejected our credential or our identity | Permanent | `security_event` if the identity was ours to prove and failed; `block_state` if it merely expired |
| T2 | The counterparty accepted the request and rejected the **content** | Permanent | `block_emission` — and if a pre-flight rule should have caught it, the missing rule is a defect, logged as one |
| T3 | The counterparty rejected the **layout** | Drift | `block_emission`, plus a watcher hit against the owning schema (AC-GOV-5) |
| T4 | Some items succeeded and some did not | Partial | `worklist`, per item, under the item's own idempotency key |
| T5 | The counterparty did not answer, or answered 5xx | Transient | `auto_retry` within bounds, then Unavailable |
| T6 | The counterparty is reachable but the capability is not available to us — an unpublished format, an unresolved regime, a closed correction window | Unavailable | `block_state`, with the reason rendered (IG6) |
| T7 | None of the above | Permanent | `worklist` with `SPECIFIC` = `UNCLASSIFIED`, which is itself an alertable condition — an unclassified failure is a gap in this table, not a normal outcome |

- **AC-ERR-1:** Every failure surfaced anywhere in the product carries exactly one canonical
  code with all seven attributes populated; `UNCLASSIFIED` is alertable and is reviewed within
  the next release cycle.
- **AC-ERR-2:** A failure that touches a statutory artefact carries exactly one §08 family
  code, and a failure that does not touch one carries none — checked by a report that joins
  the two code spaces.
- **AC-ERR-3:** Every code with `disposition = worklist` produces an exception with a named
  actor and a due date; an exception with no actor cannot be created.
- **AC-ERR-4:** Every code whose class is Transient or Unavailable names a fallback leg, or
  states explicitly that none exists — and where none exists, the deadline clock is shown
  rather than an indefinite "retrying".
- **AC-ERR-5:** Codes are append-only. A test asserts that no released code's `class`,
  `sa_code` or meaning has changed between versions.
- **AC-ERR-6:** The customer-facing sentence for a code is an owned artefact with an author,
  contains no internal identifier, and — where it touches a statutory or legal statement —
  clears the §23 representation rule before release (Part D-20).

#### 16.12.2 Retry, backoff, and the deadline clock

Retry policy is a property of the **class and the leg**, never a per-call decision, and it is
bounded in two dimensions — attempts and wall-clock — because an unbounded retry on a filing
path is indistinguishable from a missed deadline.

| Leg family | Transient policy | Bound | Why this bound |
| --- | --- | --- | --- |
| Bank and payout | Retry under the **same idempotency key**, exponential with jitter | `bank.retry.max_attempts`, `bank.retry.max_wall_minutes` (owner: Eng; routed to §20) | Bounded by the value-date window: a retry that crosses the cut-off has changed the outcome and must surface, not continue |
| Device ingest | Do not retry inbound; the device retries and its buffer is the queue | Throttle window only | Our retry would duplicate what the device is already doing |
| Statutory portal | **No automatic retry of a submission, ever.** A retry is a human act in an attended session | Zero | A duplicate submission on a statutory portal is not a technical event; an approved return can never be cancelled (EV-036) |
| Statutory file **generation** | Retry freely — generation is a pure function of inputs, rule-set version and evaluation context (Part E-3) | Standard | Regeneration is safe by construction |
| GL and accounting | Retry under `payrun_id` | `gl.retry.max_attempts` | Idempotent by external key |
| Webhook | Exponential with jitter, then dead-letter | `webhook.max_attempts`, `webhook.max_age_h` | Consumer-side dedup makes at-least-once safe |
| Communication | Retry the channel, then fall through the channel ladder | `comm.retry.max_attempts` | Email is the floor and always available |

**The deadline clock is surfaced, never hidden** — the operating rule behind §16.12's
transient row. Escalation is keyed to days remaining against the obligation's own due date
from the compliance calendar (§15.5.4), not to the failure's age:

| Days to due | Behaviour |
| --- | --- |
| Comfortable | Retry and queue silently; the exception exists but does not page |
| Approaching | The filing shows its blocked reason, its actor and its fallback on the tenant's cockpit; `filing.due_approaching` fires |
| Tight | The fallback leg is **offered by default** — the downloadable file, the worksheet, the manual entry — rather than waiting for the primary to recover |
| At risk | Named human ownership on both sides: our operator and the tenant's authorised person, with the artefact already generated and validated so the only remaining act is the attended session |
| Passed | The miss is recorded as a miss. It is never recoded as an open exception, never quietly retried into the next period, and it counts in the filing metrics (§19) including REJECTED and missed states |

The thresholds themselves are per-obligation data, not constants: `filing.escalation.<days>`
per obligation type (owner: Ops and Statutory; routed to §20), because a monthly ECR and an
annual state remittance do not share a sensible warning horizon.

#### 16.12.3 Observability — what "green" means for an integration

A green integration dashboard that coexists with a missed filing is worse than no dashboard.
Status is therefore defined against the **outcome**, per IG4, not against the call.

| Signal | Per | Green means |
| --- | --- | --- |
| Outcome completion | Leg | The artefact this leg exists for completed: the filing reached FILED with its evidence pack, or the batch reached RECONCILED. Not "200 OK" |
| Exception age | Leg | No open exception older than its actor's due date |
| Quarantine depth | Device family, adapter version | Zero, or a named re-parse in flight |
| Schema currency | Schema object | No unreviewed watcher hit against it; `source_artefact` present |
| Connection health | Bank, payout, GL, IdP | No connection `EXPIRING` inside the next cycle |
| Credential age | Leg | Within the rotation policy (§22) |
| Unmapped rate | Device, migration | Unmapped device users and unmapped columns both trending to zero |
| Deadline exposure | Tenant | No obligation inside the "tight" band without its fallback offered |

**Red is louder than yellow on exactly one axis:** anything on the filing path or the pay path
goes red when its outcome is at risk, regardless of how healthy the calls look. A portal that
returns 200 to every request while our ECR sits unapproved is a red integration.

- **AC-OBS-1:** Every leg's status is computed from its outcome, and a test proves that a leg
  with a 100% call-success rate and an unfiled return renders red.
- **AC-OBS-2:** Every alert names a leg, a canonical code, an actor and a due date; an alert
  missing any of these cannot be configured.
- **AC-OBS-3:** Integration call logs, file-transfer logs and webhook delivery logs are
  retained in India for the CERT-In window (`retention.ict_logs`, EV-062, §17), and a log
  that would leave India for a tenant pinned to India-only cannot be written to that sink.
- **AC-OBS-4:** No log line, alert body, exception message or dashboard tile contains an
  Aadhaar number, a biometric reference, a full bank account number or a model prompt
  containing either; asserted by a scanner over a recorded corpus.

#### 16.12.4 The integration conformance suite

One suite, run per release, that asserts the cross-cutting properties rather than any single
integration's behaviour. Each row is a property of the *whole* boundary, which is why it lives
here and not in a per-integration corpus.

| # | Scenario | Asserted property |
| --- | --- | --- |
| X1 | Every outbound artefact type is emitted twice with the same inputs | Byte-identical output, and zero duplicate effects at the counterparty (IG2) |
| X2 | Each filing-path and pay-path leg is disabled in turn for a full cycle | The named fallback carries the obligation to completion (IG1) |
| X3 | A counterparty returns a well-formed but wrong-layout response | The failure classifies as Drift, a watcher hit opens against the owning schema, and nothing is guessed (IG5) |
| X4 | A filing is submitted and acknowledged but its receipt is never captured | The filing does not reach FILED, the deadline clock keeps running, and no metric counts it as done (IG4) |
| X5 | A tenant pinned to India-only exercises every leg | No call, log or model invocation leaves the India plane (IG10, AC-OBS-3) |
| X6 | An under-privileged token and an external assistant attempt every read and write | Neither exceeds the granting user's ACL; no write bypasses approval (IG8) |
| X7 | Every schema object in the product is enumerated | Each has a source artefact, a capture date and a version; each blocked one renders BLOCKED with its reason (IG5, IG6) |
| X8 | A model call is attempted on every leg that touches employee data | The redaction chokepoint is traversed structurally; a leg that could bypass it fails the build (Part E-7) |
| X9 | A sub-processor is added to a leg | The sub-processor gate fires before the leg is enabled for any tenant, and is refused for tenants whose profile forbids it (AC-REG-4) |
| X10 | Every registered code is raised in a fixture | Each produces its documented disposition, actor, SA code and customer sentence (AC-ERR-1) |
| X11 | The clock on a device, a server and a log sink are compared | All are NTP-synced to NIC or NPL, and drift beyond the threshold raises an exception (EV-062) |
| X12 | An erasure is executed for an employee with punches, documents and a filed return | Erasable classes are erased, statutory artefacts are retained per their rule-set's own wording, and replay returns what §14.7 specifies (Part E-2) |

---

### 16.13 Integration phasing

Mapped to the module sequencing (§05.5) and to §05.17's closed R1 capability list, which
is the only place "P0" lives: P0 means R1, a fenced leg carries its fence and release
instead of a priority, and anything not on the R1 list is not in R1 whatever this section
calls it (§05.17 lint L1, L2, L5). Only what a beachhead tenant (20–200, §05) needs to
run its first correct filing is P0; the platform surface follows. All three segments are
the *vision*, but v1 ships the beachhead — the register above is deliberately not all P0.

<!-- DIAGRAM: integration-phasing-timeline -->

| Phase | Integrations | Rationale |
| --- | --- | --- |
| **P0 (R1) — first correct filing + first correct payslip** | Per-bank salary file (design-partner banks + generic template), release by a separate approver and credit reconciliation (§05.5 item 33; C-22; PR-01); **ADMS device-push receiver** (C-24); EPFO ECR Regular, Supplementary and Revised returns and the per-establishment ledger, with each statutory payment figure reconciled to the portal's challan (A-01 to A-04; C-09, C-10, C-23); ESIC contribution computation (C-11), and the upload file only if the template capture finishes before the gate (A-08; C-12); Form 138 Q1–Q3 regular and correction generation and FVU validation, with correction submission held while F-02 is open (A-11, A-12; C-14); Form 130 distribution (A-14; C-15); PT computation for each state whose row is state-primary-sourced — Maharashtra at R1 entry (A-15; C-16); the per-state PT and LWF machinery, switched on state by state without a deploy (§05.5 items 5 and 7); Excel/CSV onboarding import with the YTD tie-out and parallel-run month (§05.5 item 32; C-05); email and DLT-SMS as infrastructure under C-31 (PR-14); per-tenant/per-user rate limits (§05.5 item 13). Every statutory artefact ships **portal-ready for the employer to submit** in Mode A or B (C-21). | These carry the unit of delivery and the pay path. Nothing ships without them. |
| **R2 fenced legs (a release and a blocker, not a priority)** | Operator-attended submission, per portal, on counsel clearance (A-23, F-08); PT return legs, Maharashtra's included, and LWF remittance, per design-partner state as F-06 and F-07 ship (A-15, A-16, A-17; PR-03); the ESIC upload file if its capture slipped (A-08); the ECR part-payment file (A-05). Q4 Form 138 and Tax Year 2026-27 Form 130 are R3 on F-01 (A-13, A-14); the ECR arrear return is fenced on F-03 (A-06). | Each leg enters when its blocker clears; none is promised by date. |
| **P1 — reach, breadth, platform** | Tally GL journal export, first in the integration queue (R2; §05.17 PR-13); named-source migration importers — Tally first, then Zoho Payroll/Kredily/Frappe/greytHR (§05.5 item 17), gated by the §16.7 tie-out; device pull-path via third-party connectors; the public device compatibility matrix (§05.5 item 21); Zoho Books journal API and ERP GL files; recruiting job-board posting (LinkedIn certified path first, §05.5 item 19); WhatsApp Business; e-sign; public REST API + webhooks; payout aggregator API (Cashfree/RazorpayX); direct connected banking as a BD track (r3/05). | Widen device coverage and accounting reach, and open the platform. |
| **P2 — v2 surface** | SSO/SAML/SCIM (§05.5 item 24; FR-CHR-092); the all-states PT/LWF dataset (§05.5 item 23); automation inside the attended session (subject to the §16.5 kill criterion and counsel, Part D-17); deeper ERP connectors; benefits/insurer endorsement APIs (data model built in v1 per §11.1, monetisation deferred); approval-gated write tools in the in-product tool layer (§12). | Only after the core filing engine and platform API are proven and the validation programme (§20) has reported. |
| **P3 — vision** | The MCP server for external assistants, matured as a data-and-tools source (§05.5 item 30). | Never on the critical path; no revenue depends on it (§16.11). |

**What P0 explicitly excludes (and why that is a decision, not an omission).** The Tally
GL journal export (P1, R2 — §05.17 PR-13; the accountant posts from the payroll register
in R1); named-source migration importers (P1 — §05.5, with Tally first; how many
beachhead firms run Tally payroll is unknown, §20 V-02); every PT return leg and every
LWF remittance (R2 per state, fenced — A-15 to A-17); the public REST API (P1 — internal-first, rate limits ship
P0 as infra); SSO/SAML/SCIM (P2 — §05.5 item 24); the external MCP server (P3 — no revenue
may depend on it, §16.11 [Killed]); automation inside the attended session (P2 and
conditional on its kill criterion and counsel); benefits endorsement APIs (P2 — data
model only in v1 per §11.1); and operator-attended submission itself until counsel
clears it (§05.7 A-23). **[Reversed]** An earlier version excluded LWF from P0 as "low
value". The reason was wrong: multi-state PT and LWF are a differentiator, not a footnote
(K-01), and LWF's per-state machinery is built in R1 under a P0 module (§05.5 item 7).
But no state's LWF row is sourced (EV-015), so no LWF remittance ships in R1; each state
follows in R2 as its fence ships (§05.17 PR-03, A-17). An earlier version also placed
SSO/SCIM in P1, the MCP server at P2 GA and the Tally GL export in P0, against §05.5's
items 24 and 30 and §05.17 PR-13; all three now follow §05. Committing the exclusions to P0
would dilute the one thing that must be perfect at launch: the filing lands and the
salary credits.

#### 16.13.1 Integration readiness gates — what "this leg is in the release" means

Phase tables say *when*; this says *on what evidence*. A leg enters a release only when every
gate below is satisfied, and the gates are checked against artefacts, not assertions. They
are the §16 expression of §05.17's entry and exit criteria.

| Gate | Entry evidence | Exit evidence |
| --- | --- | --- |
| **G-a Register row** | The §16.1.1 row exists with all fields populated, an owner named, and a §16.1.1 decision-table verdict of D1 | Unchanged, plus the verdict re-checked at the release cut |
| **G-b Schema** | Every schema object the leg emits or consumes is PUBLISHED with a stored `source_artefact` and a capture date (AC-NET-3) | A golden fixture per schema version in the regression corpus |
| **G-c Proof against reality** | For a file leg, one real artefact accepted by the real counterparty — a bank upload that settled, a portal upload that was accepted (AC-BNK-7, AC-GOV-8). For a device leg, the V-11 bench result | The proving artefact stored against the version |
| **G-d Error codes** | Every code the leg can raise is registered with all seven attributes (AC-ERR-1) | Each code raised once in a fixture with its documented disposition (X10) |
| **G-e Fallback** | The named fallback leg exists and is itself releasable | The fallback exercised end to end with the primary disabled (X2) |
| **G-f Idempotency** | The leg's external key is defined in §16.12's key table | Double-emission test passes (X1) |
| **G-g Data protection** | The leg's allowed-field allowlist is set; sub-processor state resolved and gated (AC-REG-4); written-consent capture in place where the payload carries SPDI-sensitive data (EV-060) | A recorded-corpus scan shows no restricted identifier in payloads or logs (AC-API-9, AC-OBS-4) |
| **G-h Observability** | Outcome-based status defined for the leg (§16.12.3) | The red-status test passes (AC-OBS-1) |
| **G-i Counsel** | No open Part D item blocks the *act* this leg performs | Where one is open, the leg ships to its artefact boundary only, and the act stays with the employer (Mode A or B) |
| **G-j Runbook** | §22 has a runbook for any leg with an attended step, and the operator has run it once in a rehearsal | The "what we did on your behalf" log entry exists for the rehearsal |

**How a leg fails a gate without failing the release.** Three legitimate outcomes, and only
the first is "done": (1) all gates pass, the leg ships; (2) G-c or G-i fails, the leg ships
**to its artefact boundary** — the file generates, validates and downloads, and the act is the
employer's, which is the R1 shape for every statutory portal anyway (§16.5); (3) G-b fails,
the leg renders **BLOCKED** with its reason and its blocker, which is the honest state for the
Q4 statement layout, the ECR arrear return and every uncaptured state schema (IG6). What is
never an outcome is a leg shipping with a guessed schema, an unnamed fallback or an
unregistered error code.

---

### 16.14 Section acceptance summary — the integration guarantees

Fifteen guarantees that any integration in this section must satisfy to be called "done."
These are the §16 analogue of the payroll engine's G1–G13 (§08.13).

| # | Guarantee | Enforced by |
| --- | --- | --- |
| **IG1** | **Filing/pay is never single-point-dependent** on an external system — every filing-path and pay-path integration has a working manual/file fallback | §16.2–16.5 fallbacks; §16.12 |
| **IG2** | **Idempotency everywhere** — every outbound artefact (bank line, ECR row, GL journal, webhook, MCP write) has a deterministic external key; re-send never duplicates | §16.3, 16.6, 16.11, 16.12 (key table) |
| **IG3** | **Pre-flight validation** — files are validated against the portal's/bank's known checks before emission; the modal upload outcome is acceptance | AC-BNK-1, AC-GOV-1 |
| **IG4** | **FILED, not submission, is the completion state** — a filing is done only when its acknowledgement and, where payment-bearing, its receipt are captured (FR-PAY-711); a disbursement is done only when settlement is reconciled, never on an API acknowledgement | AC-GOV-2, AC-BNK-3, §08.13 G5 |
| **IG5** | **Schema-driven, versioned, gazette-sourced** — every file format is data with a source (URL + date), not code; amendments are data updates | §16.1, AC-GOV-3, §16.12 watcher |
| **IG6** | **Blocked states are honest** — unpublished formats (Q4 Form 138 and Tax Year 2026-27 Form 130 preparation, EV-046; the ECR arrear return, EV-043) and unresolved regimes (post-cliff ESI) render BLOCKED, never guessed | AC-GOV-4, §08.13 G7 |
| **IG7** | **No model-generated figure crosses a boundary** — the engine computes; the assistant explains, drafts, routes | §12.1 P1 [Verified], §08.13 G4; §16 framing rules |
| **IG8** | **ACL-inheriting, audited, approval-gated writes** — no external caller (API/MCP) exceeds the granting user or bypasses segregation of duties | AC-API-1/2, §16.11 |
| **IG9** | **Data protection and CERT-In at the boundary** — written consent for SPDI-sensitive data today (EV-060), sub-processor register + DPA wired to the sub-processor gate, data minimisation per integration, 6-hour incident path, 180-day logs in India, NTP sync (EV-062) | §16.12 |
| **IG10** | **Residency selectable per tenant across ≥3 backends** — each regulated tenant gets its sectoral profile (RBI materiality-gated, SEBI in-India with MeitY-empanelled infrastructure, IRDAI policy records only — EV-085–087), and the vendor is exit-able | §16.12, §17.7 |
| **IG11** | **Attended, never autonomous, submission** — every statutory submission is an attended portal session by the employer or by our operator under written authority to act, logged; the statutory payment and any DSC-bound act are always the employer's; the employer's and deductor's liability stays with them (K-13); the operator path (Mode C) does not launch until counsel clears Part D-17 (§05.7 A-23; §20 V-25) | §16.1, §16.5, §08.13 G13, §22 FR-OPS-001, §23 |
| **IG12** | **Every leg is registered, owned and honestly datable** — each integration leg is one register row with a named owner, an evidence status and a third-party-gate flag; a leg whose gate is held by someone else carries a blocker, never a date (§16.1.1 decision table) | AC-REG-1/2, §16.13.1 |
| **IG13** | **Every failure has one canonical code, one actor and a fallback** — the code space is shared by the worklist, the API envelope, the webhook, the metric and the alert; a failure touching a statutory artefact also carries exactly one §08 family code, and one that does not carries none | AC-ERR-1/2/3/4, §16.12.1 |
| **IG14** | **No hostname, certificate exception or file layout is a constant** — hosts resolve at runtime with redirects followed, certificate verification is never globally disabled, and every schema is rebuildable from a stored source artefact | AC-NET-1/2/3, AC-BNK-7 |
| **IG15** | **Attended automation stops at L1 until counsel and terms clear it, and never reaches L4** — no CAPTCHA is solved, no OTP is held, no DSC is mounted, and no software presses an irreversible control on a statutory portal | §16.5.5, Part D-17, §22 |

**Bottom line for the integration layer.** In this market the integration layer is where
the product differs from what Tally and Frappe ship today (no state PT slab table and no
LWF engine in either — EV-031, EV-032) and from what any vendor in the six-vendor set
claims (none claims to submit a filing — EV-030) — not because our APIs are cleverer,
but because **the government gives no submission API we are aware of, and we invest in
the attended path and the fallback anyway.** The device-push receiver (§16.4),
the reconciled bank file (§16.3), the portal-accepted statutory files submitted in
attended sessions with captured acknowledgements (§16.5), and the honest blocked states
where a format is not yet published are the concrete expression of this PRD's thesis
(§01): **the filing, not the payslip, is the unit of delivery — and the integration is
judged by whether that filing reaches FILED, not by whether an API returned 200.**
