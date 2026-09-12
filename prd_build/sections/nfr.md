## 17. Non-Functional Requirements — Security, DPDP, Scale

This section specifies **how well the system must behave**, not what it does. Every
functional requirement in §07–§16 assumes the guarantees below; several would be
incorrect or non-compliant without them. Three facts make this section unusually
load-bearing for an India-first HRMS, and they are not restated per-NFR:

- **CERT-In binds from day one, not at enterprise scale (EV-062, [Verified — CERT-In
  domain]).** Six-hour incident reporting, 180 days of ICT logs retained *within Indian
  jurisdiction*, and clock sync to NIC/NPL NTP servers (CERT-In Directions No.
  20(3)/2022-CERT-In, 28.04.2022) are obligations on *every* body corporate — they apply
  to the 20-employee first customer, not only to the 2,000-seat prospect. Six hours is the
  live Indian breach clock; DPDP's timelines are not in force (K-07). Days of work now; a
  painful, un-fundable migration later if deferred.
- **The live data-protection regime is the SPDI Rules 2011, not DPDP (EV-058, EV-060).**
  DPDP's substantive provisions commence on or about 13 May 2027 (EV-058 **[Verified —
  mirror]** — pull G.S.R. 843(E) from the primary source before customer use). Until then
  the SPDI Rules require consent in writing before biometric or financial information is
  collected (r.5(1)) and restrict its cross-border transfer (r.7) (EV-060 **[Verified —
  provenance caveat]**: the text was read from a non-government copy — re-verify against a
  .gov.in copy before quoting it to a customer's counsel). This section builds to the live
  regimes and pre-stages DPDP; the legal analysis lives in §23.
- **ISO 27001:2022 has a seasoning clock (§01, §05.2, [Verified] — Indian Bank RFP).**
  Indian Bank's June 2026 RFP requires a qualifying certification — ISO 27001:2022 is one
  of four it accepts, with CMMI Level 3, ISO 20000:2018 and ISO 9001:2015 (criterion 14,
  r2/06) — to have been *held for at least one year prior to RFP publication*. Acquisition
  takes roughly 3–6 months; the seasoning adds twelve. It is also the standard SPDI r.8 names for reasonable security practices
  (EV-060). The security NFRs below are therefore written to the ISO 27001 Annex A
  control set from month zero, so the audit at month ~6 certifies a system already built
  to it — not a system retrofitted to pass.

**Numbering.** NFRs are numbered `NFR-<AREA>-###`. Each carries a **phase tag**
(P0 = beachhead launch, 20–200 seg; P1 = expansion 200–2,000; P2 = enterprise /
regulated), a one-line requirement, detail, and a **measurable target** with a
**verification method** (how we prove it in a test, an audit, or a dashboard). A
target with no way to measure it is a wish, not a requirement, and is rejected in review.
These are segment-phase tags, not §05.5's priority scale: a §17 P0 is required for the
v1 beachhead launch, P1 maps to v2 and P2 to the vision; where the two differ, §05
governs sequencing, and only the closed R1 capability list (§05.17) says what ships in
R1. A composite tag here ("P0/P1") names the phase in which each part of the target must
first hold; it is not a §05 priority label.

**The measurability rule.** Every NFR in this section states a number and the method
that reads that number. "Highly available" is banned; "≥ 99.95% successful-request ratio
measured at the load balancer across the 25th–2nd critical window, excluding declared
maintenance" is required (NFR-AVAIL-801).

<!-- DIAGRAM: nfr-control-map -->

---

### 17.1 The residency-first architecture premise

One architectural decision sits upstream of nearly every NFR below and cannot be
deferred, per §13.10: **residency is a per-provider matrix, and data-at-rest
residency is a different guarantee from in-country inference.** Regulated buyers ask
about both, separately. The system is therefore built on a **provider-abstraction
layer** from v1 that lets residency be selected *per tenant*, not per deployment.

Neither "India mandates data localisation" nor "India has no localisation requirement" is
true (K-08). DPDP's cross-border rule is a negative list — empty, and not in force (EV-058).
What binds is narrower and live: CERT-In's 180 days of ICT logs within India for every
tenant (EV-062); SPDI r.7's restriction on transferring sensitive personal data abroad
(EV-060); and sectoral rules that reach only customers regulated by RBI, SEBI or IRDAI
(EV-085–087). The legal analysis is in §23.6 (localisation) and §23.12 (sectoral
overlays); this section turns it into selectable
guarantees.

| Layer | What must be swappable per tenant | Why |
| --- | --- | --- |
| **Data at rest** (Postgres, object store, search index) | Region of the primary and its replicas | Every tenant: CERT-In ICT logs in India (EV-062); SPDI r.7 on sensitive data (EV-060). Sectoral overlays: RBI Outsourcing of IT Services Directions — localisation among the obligations a bank or NBFC must secure from its IT outsourcer, **materiality-gated, entity-by-entity, not turnover-gated** (EV-087 [Verified — mirror]); SEBI cloud framework — data resides and is processed in India, and the MeitY-empanelled-infrastructure rule reaches SaaS providers (EV-085); IRDAI — **no** localisation in its 2023 cyber-security guidelines, localisation only for policy records (EV-086); SBI HRMS RFP — "all data functions and processing" within India (r2/06) |
| **LLM inference** | Which of ≥3 backends serves each task class, and in which region it runs | Anthropic's first-party API offers only "us" and "global" inference geos and a US-only, immutable workspace geo; OpenAI offers India data-at-rest, with first-party inference defaulting to the US and OpenAI models on Amazon Bedrock offering in-country inference; Vertex has an India region (§13.10 — provider documentation read in r2, not tested; re-verify before any regulated-tenant commit, §20) |
| **Egress / sub-processors** | The list of third parties any tenant's data touches (email, SMS, WhatsApp BSP, e-sign, payment rails, model providers) | SPDI r.7 transfer conditions (EV-060); RBI prior consent before sub-contracting, para 16(r), and regulator inspection reaching sub-contractors, para 16(o), where the arrangement is material (EV-087); SEBI Principle 7(x) contract terms and audit rights over sub-contractors (EV-085); IRDAI reg 53 regulator-access undertaking reaching sub-contractors (EV-086) |

This is the **same abstraction the model router needs for cost** (§13.5) — one
piece of engineering serving two constraints (residency and margin). It is P0 because
retrofitting per-tenant region selection into a single-region monolith is a re-platform,
not a feature. **[Verified]**

> **Design note — the residency default.** The India-first thesis makes `region=ap-south-1`
> (Mumbai) and `region=ap-south-2` (Hyderabad) the defaults; the abstraction exists so a
> regulated tenant can *pin* both data-at-rest and inference to India and receive a
> written attestation, while an SMB tenant inherits the default without a decision.
> Whether a chosen India region is MeitY-empanelled — required for a SEBI-regulated
> tenant (EV-085) — is unverified and must be confirmed before any hosting decision is
> committed (§20).

**Worked example — onboarding a regulated tenant (an NBFC of 900 employees).** RBI's
Outsourcing of IT Services Directions (RBI/2023-24/102, 10 April 2023, effective
1 October 2023) are addressed to the NBFC — NBFCs are on the addressee list (r4/02) — not
to its IT service provider: where the NBFC determines the
arrangement is **material** — an entity-by-entity determination, not a turnover test —
it must secure data localisation, audit rights including RBI's own, prior consent to
sub-contractors (para 16(r)) and regulator inspection reaching sub-contractors
(para 16(o)) from its IT service provider (EV-087 **[Verified — mirror]**; pull from the
primary source before customer use). Whether our arrangement is material for a given
NBFC is a counsel question (§23). The tenant record is created with
`sector_profile=RBI`, `data_residency=india_pinned` and `inference_residency=india_only`.
Consequences that must be automatic, not manual:

1. Primary Postgres, replicas, object store, search index and **all backups** provision in
   `ap-south-1` with DR in `ap-south-2` — never a foreign region (§17.14).
2. AI features start **off** for the tenant — the per-tenant kill switch defaults off for
   RBI, SEBI and IRDAI profiles (§12, Part E-7). If the NBFC opts in, the model router
   marks every task class `india_inference_required`, so a task whose only capable
   backend is US-only (e.g., the Anthropic geo, §13.10) is **refused with a typed error**,
   not silently sent abroad (NFR-RES-701).
3. The sub-processor manifest for the tenant is generated and frozen; adding a new
   sub-processor — a model provider included — is blocked until the tenant's recorded
   consent exists, and updates the attestation document.
4. The tenant's residency attestation PDF is produced from live config, not hand-authored,
   so it can never drift from what the system actually does — an RBI inspector
   reconciling the attestation against a network-policy dump finds them identical. This
   **supports evidence production** for RBI inspections; it does not discharge the audit,
   access and inspection obligations, which remain contractual (K-21).

The point of the walkthrough: residency is a **property set at tenant creation that
propagates deterministically to every subsystem**, because a regulated buyer's auditor
tests the seams, not the brochure. Retrofitting this after a single-region launch is the
re-platform §17.1 exists to avoid. **[Reversed]** — earlier drafts said the RBI
obligations attach to any SaaS vendor "with no turnover threshold"; they are
materiality-gated and bind the regulated entity (EV-087). The automation of the
attestation is a design commitment, not a claim about the regulator.

<!-- DIAGRAM: residency-provider-matrix -->

---

### 17.2 Security — authentication

**NFR-SEC-101 · Authentication strength** · **P0**
All human logins require a verified factor beyond a password. Admin, payroll-approver
and CA-console roles require phishing-resistant MFA.

| Target | Value | Verification |
| --- | --- | --- |
| MFA coverage on privileged roles | 100% of admin / payroll-approver / CA seats; enforced, not opt-in | Access review, quarterly; login without a second factor is impossible by config |
| Supported second factors | TOTP (RFC 6238), WebAuthn/FIDO2 passkeys; SMS OTP **fallback only**, never sole factor | Config audit; SMS-only accounts = 0 for privileged roles |
| Password storage | Argon2id, per-user salt, memory cost ≥ 19 MiB, ≥ 2 iterations (Source: OWASP Password Storage Cheat Sheet, 2024) | Code review + hash-format inspection in DB |
| Password policy | ≥ 12 chars, screened against a breached-password corpus (HIBP-style k-anonymity), no forced periodic rotation (NIST 800-63B) | Registration test suite |
| Brute-force / credential-stuffing defence | ≥ 5 failed attempts → exponential backoff + CAPTCHA; account lock alert to user | Automated abuse-simulation test |

**NFR-SEC-102 · Employee self-service login for low-literacy / shared-device users** · **P0**
The frontline reality from §09 [Verified] — nine in ten people who do not use a phone
live in a household that owns one (Comprehensive Annual Modular Survey 2023, r2/04), so
worker identity ≠ device identity — forces an auth path that does not assume a personal
smartphone with a password manager.

- **Target:** OTP-to-phone login (with the SMS-fallback caveat above treated as
  acceptable for *non-privileged* employee self-service, since the blast radius is one
  employee's own payslip), plus optional employer-issued short PIN bound to a device.
- **Measurable:** median employee login completes in ≤ 20 seconds on a 3G connection
  (measured in synthetic RUM from a throttled device profile); ≤ 2 taps after OTP entry
  to reach the payslip.

**NFR-SEC-103 · Session management** · **P0**

| Target | Value | Verification |
| --- | --- | --- |
| Session token | Opaque, server-side revocable; not a long-lived stateless JWT for privileged sessions | Design review |
| Idle timeout | Admin/payroll 30 min; employee self-service 24 h; CA console 30 min | Automated session test |
| Absolute session lifetime | 12 h admin; re-auth for approval of any pay run or statutory return regardless of session age (step-up) | Test: approving a return for filing always prompts re-auth |
| Concurrent-session control | Admin can view and revoke all active sessions of any user in their tenant | Manual + API test |

**NFR-SEC-104 · SSO for expansion and enterprise** · **P1/P2**
SAML 2.0 and OIDC SSO with SCIM 2.0 provisioning. SCIM de-provisioning propagates a
disabled/terminated employee to *loss of all access* within **≤ 5 minutes** (measured
end-to-end in a provisioning test). This is a hard enterprise-procurement gate, not a
nicety, and the seasoning-clock logic applies: build the interface early even before a
customer asks.

#### 17.2.1 Shared devices and shared numbers — the cases an MFA policy usually breaks on

NFR-SEC-102 states the principle: worker identity is not device identity, because nine in
ten people who do not use a phone live in a household that owns one (§09 [Verified],
Comprehensive Annual Modular Survey 2023, r2/04). The cases below are where a conventional
"one person, one phone, one session" assumption produces either a lockout or a
privacy failure, and each needs a specified behaviour rather than a support ticket.

| Case | Wrong behaviour | Required behaviour | Control |
| --- | --- | --- | --- |
| Two employees of the same tenant share one household phone | The number resolves to whichever record was created first | The OTP succeeds and presents an explicit chooser; the session binds to exactly one employee record and the audit event names which; the other record is not readable in that session | Session binding; audit `actor_id` |
| An employee's number is also their manager's number | Silently treat them as the same principal | Same as above — identity is the employee record, never the MSISDN | Schema: MSISDN is not unique and is never a key |
| Employee changes their phone number | Self-service change takes effect immediately and can immediately be used to reach bank details | The change is reason-coded (A2) and approved by HR-Admin; for a cooling interval afterwards the new number cannot authorise a change to bank or Restricted-class data | `auth.number_change_cooldown` — a named parameter, owner Security lead, §17.16; unset behaviour is that the restriction applies until the next HR-Admin-approved session |
| Shared workplace kiosk or terminal | A remembered session on a device many people use | Kiosk mode: short idle timeout, explicit sign-out on the payslip screen, no persistent credential, no "remember me" offered | Session policy per device class |
| Employer-issued short PIN bound to a device | The PIN is treated as a password and reused for an admin role | The PIN authenticates a **non-privileged** employee self-service session on a bound device only; it is never accepted for any privileged role and never satisfies NFR-SEC-101 | Role-gated factor policy |
| Employee leaves; their number is reassigned by the carrier | Old payslips reachable by whoever now holds the number | Access ends on the §07 lifecycle event, not on the number; any post-exit access is a separately granted, time-boxed, audited path | SCIM/lifecycle de-provisioning (NFR-SEC-104 at P1; the lifecycle event at P0) |
| Employee has no phone at all | No path exists | The employer-issued PIN on a bound shared device, and the printed or HR-delivered payslip route, remain available; self-service is never the only route to a statutory document | §09; the payslip is a register obligation (EV-053), not a feature |

- **Measurable:** 0 sessions in which one authentication event grants access to more than one
  employee record; 0 privileged sessions authenticated by SMS OTP or a device PIN alone;
  100% of number changes carrying a reason code and an approver.
- **Negative:** the product never treats a phone number, a device identifier or a biometric
  as the employee's identity. Identity is the employee record; everything else is a factor
  that can be lost, shared or reassigned — and in this segment, will be.

---

### 17.3 Security — authorization

**NFR-SEC-201 · Tenant isolation** · **P0**
The single most important security property of a multi-tenant payroll system: **no
tenant can ever read or write another tenant's data**, and this must be enforced at the
data layer, not only in application code.

| Target | Value | Verification |
| --- | --- | --- |
| Isolation mechanism | Row-level security (Postgres RLS) keyed on `tenant_id`, enforced in the database; application `tenant_id` scoping is defence-in-depth, not the sole control | Code review + a mandatory automated "cross-tenant read" test in CI that must fail closed |
| Cross-tenant leakage incidents | 0, with a CI gate: every table holding tenant data has an RLS policy or an explicit annotated exemption | CI check counts unguarded tenant tables; build fails if > 0 |
| CA-console cross-client access | A CA sees only clients that have granted access; switching clients re-scopes the session token | Multi-client switch test (CA / bureau console, §15.2; tenancy model, §15.3) |

**NFR-SEC-202 · Role-based + attribute-based access control** · **P0**
RBAC with a small, auditable set of built-in roles (Employee, Manager, HR-Admin,
Payroll-Admin, Payroll-Approver, Auditor/CA-read-only, Owner) plus ABAC constraints
(department, location, cost-centre). **Separation of duties is enforced:** the user who
*prepares* a pay run or a return cannot be the user who *approves it for filing* (the
attended submission itself is §22's).

- **Measurable:** maker ≠ checker on every filing and every pay-run approval — a
  self-approval attempt is rejected 100% of the time (automated SoD test).
- **Least privilege:** default new admin role grants **read-only**; write and
  approve are explicit grants. Verified by a periodic "excess privilege" report that
  lists every seat with approve rights.

**NFR-SEC-203 · CA read-only audit access** · **P0**
Per §15.2, the CA / bureau console offers *read-only audit access*. This is a distinct
permission class that can view registers, payslips and filings but can never mutate a
monetary field. Verified: a CA-role write to any payroll figure returns 403 in 100% of
attempts.

**NFR-SEC-204 · Restricted-field access logging, detection-capable** · **P0**
Read access to Restricted-class fields (§17.4 — Aadhaar token, bank account, PAN,
health/disability, biometric template), and bulk reads or exports of Confidential-class
salary data, are themselves audited events, not only writes. See §17.5. The log must be
able to **detect** unauthorised access, not merely record it — the standard DPDP
r.6(1)(c) will set when it commences (EV-064 **[Verified — not in force]**). It is built
to that standard now because the CERT-In six-hour clock runs from the moment an incident
is noticed (EV-062), and an access log nobody reviews produces no noticing.

#### 17.3.1 Authority levels — who may do what, and what it costs them

§07 owns the permissions matrix (roles × objects × actions) and its maker-checker points.
What belongs here is the **authority ladder**: the small set of escalating controls this
section keeps referring to — step-up re-authentication, maker≠checker, two named approvers,
a recorded reason code — and which action sits on which rung. Scattering these across
fifteen subsections is how a build team ends up implementing four subtly different
"approval" mechanisms.

| Rung | Control | Meaning |
| --- | --- | --- |
| A0 | Authenticated session | The role's ordinary permission suffices |
| A1 | Step-up re-authentication | A fresh factor is demanded regardless of session age (NFR-SEC-103) |
| A2 | Reason-coded | A closed-vocabulary `reason_code` is mandatory and is written to the audit event (§17.5.1) |
| A3 | maker≠checker | A second, different user approves; self-approval is refused (NFR-SEC-202) |
| A4 | Two named approvers, one of them a lead | Both identities recorded; one must be the Security or Engineering lead |
| A5 | Counsel or customer instruction recorded | A document reference, not a click |

| Action | Rungs | Why this level |
| --- | --- | --- |
| Read a Confidential-class salary field | A0 | Ordinary payroll work; the read is audited (NFR-SEC-204) |
| Bulk-export Confidential-class salary data | A1 + A2 | Detection D-4's companion control: the export that matters most to an insider is the one that costs the most friction |
| Unmask a Restricted-class field | A1 + A2 | NFR-SEC-303; an unmask with no reason cannot complete (D-2) |
| Approve a pay run | A1 + A3 | Step-up because the session may be hours old; maker≠checker because it is the money gate |
| Approve a return for filing | A1 + A3 | The verification gate sits immediately before payment initiation (EV-037, Part E-1) — after it, downward correction is barred |
| Initiate payment on an approved return | A1 + A3 | **An approved return can never be cancelled** (EV-036); this is the last reversible moment |
| Change a tenant's `sector_profile` | A4 + A5 | §17.7.1; it voids an AI opt-in and re-freezes the manifest |
| Add a sub-processor for a regulated tenant | A4 + A5 | The tenant's recorded consent is the guard (Part E-7; EV-085, EV-086, EV-087) |
| Execute an erasure | A2 + A3 | The statement is produced first; the second approver checks that every retained class cites a basis or a counsel-review flag (NFR-DPDP-506) |
| Destroy an L3 per-subject key | A2 + A3 | It is irreversible (NFR-SEC-306) |
| Destroy an L1 tenant key at exit | A4 + A5 | Customer instruction plus resolved holds |
| Record a `NOT_REPORTABLE_RECORDED` incident decision | A2 + A4 | §17.6.1 — never on-call alone, and never without a reason |
| Deploy inside a frozen span | A4 | NFR-AVAIL-807; an incident reference is part of the record |
| Merge a change to payroll-compute or filing-generation code | A3 | NFR-SEC-305 — the runtime rule governs the source that produces the runtime |
| Publish a rule object (slab, wage definition, regime object) | A3 | The §22 compliance data pipeline's two-person review |
| Clear a broken audit chain | **Not available at any rung** | NFR-SEC-405 — the transition does not exist |
| Suppress an incident notification | **Not available at any rung** | §17.6.1 |
| Recover a destroyed key | **Not available at any rung** | NFR-SEC-306 |
| Configure "no Aadhaar, no payroll" or "biometric only" | **Not available at any rung** | Part D-10; the option does not exist in the schema |

- **Measurable:** every action in the table maps to exactly one rung set in the
  authorisation layer, asserted by a test that enumerates the mapping rather than by
  inspection; a new privileged action with no rung assignment fails the build.
- **Measurable:** the four "not available" rows are tested as absences (NT-204, NT-207,
  NT-316, and the key-recovery assertion in NT-402's companion) — the test looks for the
  interface and fails if it finds one.
- **Negative:** no rung may be satisfied by a service account acting for a human. Where a
  non-human actor performs the action, `on_behalf_of` names the human whose authority is
  being exercised, and that human is the one the rung applies to (NFR-SEC-406).

---

### 17.4 Security — encryption

Encryption strength is driven by a **data-classification scheme**, because AES-256 on
everything and application-layer envelope encryption on everything are not the same cost,
and the scheme decides where the expensive control applies. Four classes, each with a
default handling rule. The classes are a **product** classification, not a legal one.
The legal position needs both halves in one breath (K-06): DPDP creates **no** sensitive
or special category of personal data (s.2(t), EV-059) — **and** the SPDI Rules 2011,
live today, classify passwords, financial information such as bank account or card
details, health data and biometric information as sensitive personal data (r.3, EV-060).
Nothing in this PRD is described as sensitive "under DPDP" (Part D-19).

| Class | Examples | Handling rule |
| --- | --- | --- |
| **Restricted** | Aadhaar, bank account, PAN, health/disability, biometric attendance template | App-layer envelope encryption (KMS master); Aadhaar in a separate, separately-encrypted, separately-access-controlled token store referenced by an opaque token — never the number or a hash of it in a business table — and biometric templates in their own keyspace, with no image column and no image bucket (Part E-6; §07, §09, §14); masked by default; read is an audited event (§17.5); never in logs, never in a URL, never model input — the §12 redaction chokepoint default-denies Aadhaar, PAN, bank account/IFSC and biometric templates (Part E-7) |
| **Confidential** | Salary, CTC, PF/ESI/TDS figures, appraisal, disciplinary | RLS-scoped, storage-encrypted; write is audited; not exposed to the AI assistant except through approval-gated, ACL-inheriting tools (§12) |
| **Internal** | Org chart, leave balances, attendance summary | RLS-scoped, storage-encrypted |
| **Public** | Statutory form templates, holiday calendar | No special handling |

The classification is a **field-level tag in the data model**, the same tag that drives the
processing-purpose and legal-basis mapping (NFR-DPDP-501) and the Restricted-field access
log (NFR-SEC-204) — one annotation serving encryption, audit and privacy at once. A field
with no classification tag fails the build (a CI lint counts untagged columns; must be 0).

**NFR-SEC-301 · Encryption in transit** · **P0**

| Target | Value | Verification |
| --- | --- | --- |
| TLS floor | TLS 1.2 minimum, TLS 1.3 preferred; TLS 1.0/1.1 disabled | SSL Labs-style scan ≥ grade A; automated in CI |
| HSTS | `max-age ≥ 31536000; includeSubDomains; preload` | Header scan |
| Internal service-to-service | mTLS within the cluster for services carrying tenant data | Service-mesh config audit |
| Device ingest (ADMS/WDMS) | The attendance push receiver (§09 [Verified]) accepts device POSTs over TLS to a tenant-scoped URL; plaintext HTTP ingest is refused | Ingest endpoint test |

> **Device-ingest caveat, [Hypothesis].** Some legacy eSSL/ZKTeco firmware on the
> reverse-engineered port-4370 path (§09 [Verified]) does not do modern TLS. **Kill/validate:**
> during the hardware spike (§09, device integration currently unsized), measure the share
> of the target install base that cannot POST over TLS 1.2+. If it is material, the answer is
> a tenant-side lightweight relay, never downgrading the cloud endpoint. No plaintext ingest
> ships to the internet regardless.

**NFR-SEC-302 · Encryption at rest** · **P0**

| Target | Value | Verification |
| --- | --- | --- |
| Storage-level | AES-256 on all volumes, DB, object store, backups | Provider config attestation |
| Application-level field encryption | Bank account, PAN and health data encrypted at the application layer with envelope encryption (per-tenant data key wrapped by a KMS master key); the Aadhaar token store and biometric templates each under their own keyspace (Part E-6) — so a raw DB dump exposes none of them | Code review + DB dump inspection |
| Key management | Managed KMS (India-region), automatic key rotation ≤ 365 days, per-tenant data keys; erasable classes (biometric templates, consent artefacts, punches, rendered documents) keyed so that the §14 erasure mechanism — crypto-shredding per subject key, or tombstone — can act on one subject without touching the rest (Part E-2) | KMS policy audit |
| Backup encryption | Backups encrypted with keys distinct from primary; restore requires KMS access | Restore drill (§17.14) |

**NFR-SEC-303 · Aadhaar handling** · **P0**
Aadhaar sits under its own statute — the Aadhaar Act 2016 and its regulations — not
under a DPDP category. The product is built as though the criminal-penalty chain in
EV-067 holds, and this PRD says nothing about whether it does (Part D-8, §23.9).
Aadhaar is **optional everywhere**, including the EPF and ESI flows; by default an
employee who declines is excluded-and-flagged on the affected filing, with notices to the
operator and the employee, never blocked from payroll, and no "no Aadhaar, no payroll"
configuration exists (Part D-10, Part E-11; §07 — the final choice of behaviour is with
counsel, §23). Where an employee provides it, it is collected on the Aadhaar (Sharing of
Information) Regulations 2016 reg 5 basis — lawful purpose, disclosure, consent
(EV-068) — and stored **only** in the separate Aadhaar token store (Part E-6); business
tables hold the opaque token. Transmission is encrypted: reg 6(4) makes that a legal
requirement (EV-068). Display is masked (`XXXX XXXX 1234`) by default, grounded in reg
6(2) security and confidentiality and in risk — whether masking is a statutory duty on a
plain employer is under counsel review (Part D-5, §23). A Virtual ID is never stored
(AOVR reg 4A(4)), and the product never verifies Aadhaar on a customer's behalf
(AOVR reg 16A(2), EV-070). Aadhaar is never used as a login identifier or a key.
**[Reversed]** — earlier drafts cited masking as "a published UIDAI requirement" on a
plain employer. Withdrawn: reg 6(1) is a bar on *public* display, and the duty question
stays with counsel (Part D-5, §23.9).

Three further build choices follow the "build it, state nothing" posture of Part D:

- **Vault-ready, not vault-claimed.** UIDAI's current circular and FAQ scope the Aadhaar
  Data Vault and HSM regime to requesting entities, but that position rests on a circular
  and an FAQ, not a notified regulation, and has flipped once before (r4/04). Whether it
  binds a non-requesting entity is under counsel review (Part D-6, §23). The token store's
  keys are therefore held in a KMS key hierarchy that can be moved behind a dedicated HSM
  without a schema change, so a future vault requirement is a migration, not a rewrite.
- **India-only for every tenant, whatever the residency profile.** The Aadhaar token store
  is provisioned in an India region for every tenant, with no per-tenant override, and no
  sub-processor outside India can read it. Whether hosting Aadhaar abroad or exposing it to a foreign sub-processor would be lawful
  for a non-requesting entity is a counsel question (Part D-15, §23); the product does not
  need the answer because it never does either.
- **Portal entry is modelled as the employer's act on a government portal.** The product
  does not design toward requesting-entity (AUA/KUA) status for statutory filing. Whether
  an employer entering Aadhaar into the EPFO or ESIC portal is itself a requesting entity
  is under counsel review (Part D-7, §23).

- **Measurable:** 0 endpoints return an unmasked Aadhaar to any role below a named,
  audited privilege; unmasking is itself a logged, reason-coded event; 0 business-table
  columns holding an Aadhaar number or a hash of one (schema lint in CI); Aadhaar token
  store region = India for 100% of tenants (provider-config audit); 0 sub-processors
  outside India on the token store's egress allow-list (network-policy audit).

**NFR-SEC-304 · Secrets and key material** · **P0**
No secret (DB credential, KMS key, provider API key, BSP token) in source, in an image
layer, or in an environment file committed to a repo. Secrets live in a managed secrets
store with rotation. Verified by a secret-scanning gate in CI (build fails on a detected
secret) plus a quarterly rotation attestation.

**NFR-SEC-305 · Secure SDLC, dependency & supply-chain security** · **P0**
The ISO 27001 Annex A control set and the VAPT expectation of regulated procurement (§17.15)
are not runtime toggles — they are earned in the pipeline. This NFR makes the pipeline itself
a control surface, because a payroll system that ships a known-vulnerable dependency into a
statutory filing path is one CVE away from a CERT-In-reportable incident.

| Target | Value | Verification |
| --- | --- | --- |
| Dependency vulnerability gate | No `Critical`/`High` CVE in a shipped dependency without a logged, time-boxed exception | SCA scan (e.g., dependency audit) in CI; build fails on ungated High+ |
| SBOM | A software bill of materials generated per release | SBOM artefact exists per build tag |
| Static analysis | SAST on every PR; security-relevant findings block merge | CI gate |
| Change control on statutory paths | Any change to the payroll-compute or filing-generation code requires maker≠checker review (mirrors the runtime SoD, NFR-SEC-202) | Branch-protection config; 0 self-merged statutory-path PRs |
| VAPT cadence | Third-party penetration test before first customer, then annually and on major release (§17.15) | VAPT report on file; findings tracked to closure |
| AI-specific review | Prompt-injection and tool-abuse test cases in the release suite for any change to an approval-gated MCP write tool (§12) | Test suite present; ties to NFR-OBS-1105 |

> **Why change-control on statutory paths is a hard gate, not process theatre.** The payroll
> engine's determinism invariant (§08 I4) and the audit trail's completeness (NFR-SEC-401)
> are only trustworthy if the code that computes a statutory figure cannot change without a
> second reviewer. A single unreviewed commit that alters the PT slab lookup logic can
> silently produce a wrong PT figure, and so a wrong return artefact, for every tenant with
> a work location in that state — the maker≠checker rule that
> governs runtime approvals therefore governs the source that produces them. (Slab *data*
> is a published rule object under the two-person review of the §22 compliance data
> pipeline; this NFR governs the code that reads it.)

#### 17.4.1 The key hierarchy, and what each level exists to make possible

Encryption at rest is not one decision. The hierarchy below is shaped by two requirements
that pull in opposite directions: an audit chain that must be permanent (NFR-SEC-401) and
subject data that must be erasable (Part E-2). Keys are what reconcile them — erasure acts
on a key, not on a row, so a permanent record can point at a value that no longer decrypts.

| Level | Key | Scope | Rotation | Destroyed when | What it makes possible |
| --- | --- | --- | --- | --- | --- |
| L0 | KMS root (managed, India region) | Platform | Provider-managed, ≤ 365 days | Never | Storage-level AES-256 and the wrap of every level below (NFR-SEC-302) |
| L1 | Tenant data key | One tenant | ≤ 365 days, re-wrap only | Tenant exit, on the customer's instruction, subject to NFR-DPDP-506 holds | Tenant-level cryptographic separation; the SEBI profile's BYOK/BYOE re-wrap operates here (§17.7.1) |
| L2a | Aadhaar token-store key | The token store, per tenant | ≤ 365 days | Only with the tenant's Aadhaar data | A separately-encrypted, separately-access-controlled store whose keys can move behind a dedicated HSM without a schema change (NFR-SEC-303) |
| L2b | Biometric template keyspace | Templates, per tenant | ≤ 365 days | On template destruction | Templates destroyed independently of the attendance record they relate to — the record must survive the template (Part E-6, §09) |
| L3 | Per-subject key | One employee, for erasable classes | Not rotated — its lifetime is the subject's | **Crypto-shredded on erasure** | The §14 erasure mechanism: one subject's erasable data becomes undecryptable without touching any other subject and without rewriting the audit chain |
| L4 | Backup key set | Backups | Independent schedule | With the backup generation | Backups that a compromise of the primary's keys cannot read (NFR-DR-1402); the separation is tested by making a restore **fail** (NT-413) |

**Worked example — crypto-shredding one subject, and what replay returns afterwards.** An
employee left in March, their statutory holds have expired for the discretionary classes,
and an erasure request is honoured (NFR-DPDP-502, NFR-DPDP-506). The engine destroys the L3
per-subject key. What changes and what does not:

| Artefact | Before | After | Why |
| --- | --- | --- | --- |
| Discretionary data (wellness, optional-benefit marketing) | Readable | Undecryptable, then tombstoned | No statutory hold identified (NFR-DPDP-506) |
| Biometric template | Readable | Undecryptable; device-side two-phase erasure runs with per-device acknowledgement, a retry queue and the documented exception state (Part E-6, §09) | Erasable entity class |
| Punch records | Readable | Erasable class per Part E-2; retained only where a register hold applies (EV-054) | The Form IX register obligation is the constraint, not the punch (§06, §09) |
| Consent artefacts | Readable | Erasable class — **but their loss is not recoverable**, which is why they are also RPO class B (§17.14.1) | Consent cannot be backfilled (Part E-12) |
| Salary structure, assignments, statutory attributes | Readable | **Unchanged** | Bitemporal classes; not erased by an erasure request (Part E-2, K-24) |
| Filed-return reproducibility for a retained period | Works | **Still works** | The reproducibility guard in NFR-DPDP-506: erasing discretionary data must never break regeneration of a filed return |
| Audit chain | Intact | **Intact**, and still verifies | Restricted values were never in the payload — only tokens (§17.5.1) |
| Replay of a period containing the subject | Full detail | Returns the computation and its rule-version provenance, with the erased fields rendered as *erased*, carrying the erasure event reference and its date | §14 specifies what replay returns after an erasure (Part E-2) |

**NFR-SEC-306 · Key lifecycle and the shred path** · **P0**

| State | Event | Guard | Side effect | Who may trigger |
| --- | --- | --- | --- | --- |
| `ACTIVE` | Scheduled rotation due | Rotation is a re-wrap, never a re-encrypt-in-place of every row | New key version active for writes; prior versions retained for reads | Scheduler |
| `ACTIVE` | Erasure approved for a subject (L3) | The NFR-DPDP-506 statement has been produced and every retained class cites a basis or a counsel-review flag | Key destroyed; tombstones written; backups marked so a restore re-applies the tombstone | Erasure engine, on an approved request |
| `ACTIVE` | Tenant exit (L1) | Customer instruction recorded; statutory holds resolved; for a SEBI tenant, the expunging obligation from disks, backups and logs applies (Principle 7(vii), EV-085) | Key destroyed after the hold period; exit certificate generated from live config | Two named approvers |
| `ACTIVE` | Key material unavailable (provider fault) | — | System **fails closed** — no plaintext path exists; DR-G rehearses this annually | — |
| `DESTROYED` | Restore from a backup predating the destruction | — | Tombstone re-applied; the key is **not** reintroduced | Restore procedure |
| `DESTROYED` | Any request to recover the key | **No such transition exists** | — | — |

- **Measurable:** a shred test destroys one subject's L3 key and asserts all six outcomes in
  the table above, including that the audit chain still verifies and the period still
  replays (NT-402, NT-207).
- **Negative:** there is no key-escrow copy of an L3 key, no "soft shred", and no
  administrative recovery path. A shred that can be undone is not an erasure, and offering
  one would make every erasure statement the product produces untrue.
- **Negative:** rotation never rewrites the audit chain. A chain whose contents change on
  rotation cannot be tamper-evident.

<!-- DIAGRAM: encryption-key-hierarchy -->

---

### 17.5 Security — audit trail

**NFR-SEC-401 · Immutable audit log** · **P0**
Per the payroll engine invariant I5 (§08) and the retention and custody rules for the
six employer registers and wage slip (EV-053, EV-054; §06), every mutation of a monetary
or statutory field, every access to a Restricted-class field, every login/logout, every
permission change, and every filing action is recorded as an **append-only,
tamper-evident** event.

| Target | Value | Verification |
| --- | --- | --- |
| Fields per event | actor, tenant, timestamp (UTC + IST), source IP, action, entity, before-value, after-value, rule-version applied, evaluation context (disbursal date, as-of decision time, jurisdiction set, tax-regime election — §08 I6), authority/approval reference | Schema review |
| Restricted values in events | Before/after values of Restricted-class fields are recorded as tokens or masked references, never raw values, so the chain survives erasure of the underlying value — the audit chain is never erased; the Restricted values it points at can be (Part E-2, §14) | Schema lint: 0 raw Restricted values in audit payloads |
| Immutability | Append-only store; no application path can UPDATE or DELETE an audit row; tamper-evidence via hash-chaining (each event carries a hash of the prior event) | Attempt-to-mutate test returns error; chain-verification job |
| Retention | Register-linked events: at least the central-sphere register periods — "five years after the date of last entry" (Wages r.51(4)) or "five calendar years from the date of last entry" (OSH r.72(1)(vii), SS r.53(1)(e)) (EV-054); state-sphere periods are configuration pending counsel (§23). ICT/system logs: a rolling 180 days minimum, within India (EV-062). Whichever is longer per event class; anything beyond these is the configurable NFR-DPDP-506 schedule | Retention-policy audit |
| Clock accuracy | Timestamps sourced from NIC/NPL-synced NTP (§17.6); skew ≤ 100 ms | NTP monitoring |
| Completeness | 0 monetary mutations without a corresponding audit event — enforced by writing the audit event in the same DB transaction as the mutation | Transactional test; orphan-mutation detector = 0 |

> **Worked example — a PF recompute under the 50% add-back (§06 [Verified]).** A tenant
> corrects an employee's HRA mid-year; the excluded-components share now exceeds one-half of
> remuneration, so the Code on Wages s.2(y) / Code on Social Security s.2(88) add-back
> re-bases PF for prior periods (§06 [Verified]). The arrears recompute (§08 I3) writes, in
> the *same transaction* as the monetary change, an audit event:
>
> ```
> event_id      : 0x9f3c… (sha256 of this event's canonical form + prev_hash)
> prev_hash     : 0x71ab…            actor: payroll_admin:emp_4471
> tenant        : t_00912             ts: 2026-07-14T09:22:07Z / 14:52:07 IST
> action        : PAYROLL.RECOMPUTE   entity: pf_contribution:emp_88/2026-04
> before_value  : { pf_wages: 18000, ee_pf: 2160 }
> after_value   : { pf_wages: 24500, ee_pf: 2940 }
> rule_version  : wagedef@2025-11-21  approval_ref: run_approval:ra_5521
> eval_context  : { disbursal_date: 2026-07-31, as_of: 2026-07-14T09:22:07Z,
>                   jurisdiction_set: [central, state:MH], tax_regime: new }
> ```
>
> Three properties the schema forces and QA verifies: (1) `rule_version` names the
> effective-dated wage-definition rule *in force for the period being corrected* — here the
> Code's definition from its 21 November 2025 commencement (§06.9), not today's rule — and
> `eval_context` carries the disbursal date from which PF liability on the arrears runs
> (§08, Part E-9), so the recompute is reproducible; (2) `prev_hash` chains the event, so a
> tampered or deleted row breaks the chain and the nightly verification job flags it; (3) the
> event cannot exist without the mutation and the mutation cannot commit without the event
> (single transaction) — which is how "0 un-audited monetary mutations" is guaranteed rather
> than hoped for.

**NFR-SEC-402 · Audit log usability** · **P0**
An audit trail nobody can query is a liability, not a control. Admins and CA-auditors
can filter the log by employee, period, actor, and action, and export a signed
statement for a dispute or an inspection. **Target:** any single employee's full
change history for a tax year (the "financial year" of earlier periods — both labels
accepted, EV-050) returns in ≤ 3 seconds (P95).

**NFR-SEC-403 · Access review** · **P1**
Quarterly access-recertification workflow: owners attest to each privileged grant;
un-attested grants past 90 days are flagged. Verified by a recertification-coverage
report ≥ 95% each quarter.

#### 17.5.1 The audit event as a data definition

NFR-SEC-401 names the fields; a build team needs their types, their optionality and
their redaction rule, because the same record has to satisfy three different readers —
a tenant's approver reconstructing why a figure changed, a CERT-In report assembled
inside six hours (EV-062), and an inspection that must be answerable years later from
the register-linked retention classes (EV-054). One schema serves all three, so the
schema is specified once, here, and referenced everywhere else.

| Field | Type | Required | Populated by | Redaction rule | Notes |
| --- | --- | --- | --- | --- | --- |
| `event_id` | 32-byte hash | always | writer | none | SHA-256 over the canonical serialisation of this event **including** `prev_hash` |
| `prev_hash` | 32-byte hash | always | writer | none | Hash of the immediately preceding event in the same chain; the genesis event carries a fixed zero value |
| `chain_key` | string | always | writer | none | Chain partition. One chain per tenant per UTC day (see the sharding note below) |
| `seq` | int64 | always | writer | none | Monotonic within `chain_key`; a gap is a chain break (NFR-SEC-405) |
| `tenant_id` | uuid | always | session | none | Every audit query is RLS-scoped on it (NFR-SEC-201) |
| `actor_type` | enum | always | session | none | `human`, `assistant`, `importer`, `scheduler`, `operator` — see NFR-SEC-406 |
| `actor_id` | string | always | session | none | Employee id, service principal, or operator identity; never blank, never "system" |
| `on_behalf_of` | string | when `actor_type` ≠ `human` | session | none | The human whose authority the non-human actor is exercising; mandatory for `assistant` and `operator` |
| `authority_ref` | string | when `actor_type` = `operator` | session | none | The §22 written authority to act under which an attended filing step was taken; null for every other actor type |
| `session_id` | uuid | always | session | none | Joins to the session record revoked by NFR-SEC-103 |
| `source_ip` | inet | always | edge | none | Held as a distinct column so an impossible-travel detection can read it without parsing the payload |
| `ts_utc` | timestamptz | always | NTP-synced clock | none | NIC/NPL-traceable (NFR-CERT-603); skew ≤ 100 ms |
| `ts_ist` | timestamptz | always | derived | none | Rendered, not stored twice; present in exports because every Indian reader and every portal works in IST |
| `action` | enum | always | writer | none | Closed vocabulary; a new action value is a schema change and a reviewed PR (NFR-SEC-305) |
| `entity_type` / `entity_id` | enum / string | always | writer | none | The object mutated or read |
| `period_key` | string | when the entity is period-scoped | writer | none | Wage month, quarter or tax year; both the "Tax Year" and older "Financial Year" labels resolve to it (EV-050) |
| `before_value` / `after_value` | jsonb | on mutation | writer | **Restricted-class values replaced by the field's token or a masked reference** | Enforced by the serialiser, not by the caller — see the negative test NT-208 |
| `classification_touched` | enum[] | always | derived from the field tags (§17.4) | none | Drives which events are Restricted-read events for NFR-SEC-204 and which retention class applies |
| `rule_version` | string | on any statutory or monetary computation | engine | none | The rule-object version **in force for the period being computed**, not the version current at write time |
| `eval_context` | jsonb | on any statutory or monetary computation | engine | none | The enumerated four: disbursal date, as-of decision time, jurisdiction set, tax-regime election (§08, Part E-3) |
| `approval_ref` | string | on any approved action | workflow | none | The maker≠checker approval that authorised it (NFR-SEC-202) |
| `reason_code` | enum | on unmasking, on override, on a non-report decision | actor | none | A closed vocabulary; free text goes in `reason_note`, which is never the machine-read field |
| `retention_class` | enum | always | derived | none | One of the NFR-DPDP-506 classes; decides when, if ever, the event ages out |

Three schema decisions that are easy to get wrong and expensive to reverse:

- **Chain partitioning.** A single global hash chain serialises every write in the
  platform and becomes the throughput ceiling at the month-end peak (NFR-SCALE-902). The
  chain is therefore partitioned **per tenant per UTC day**, and the daily chain head is
  itself written as an event into a per-tenant *anchor* chain, so tamper-evidence composes
  without a global lock. The anchor design is what makes NFR-SEC-405's nightly verification
  parallelisable across tenants.
- **Restricted values never enter the payload.** `before_value`/`after_value` hold the
  Aadhaar token, not the number; the bank-account token, not the account. This is what lets
  the audit chain be permanent while the value it points at is erasable (Part E-2) — the
  chain is never rewritten to honour an erasure, because there is nothing in it to erase.
- **`actor_type` is not decorative.** It is the field that lets an inspection separate what
  a human did, what the assistant did under a named human's confirmation (§12), what a
  migration importer did (§16), and what an operator did under a §22 authority — four
  populations with four different liability stories.

**NFR-SEC-404 · Detection rules on Restricted-class access** · **P0**
EV-064 states the standard DPDP r.6(1)(c) will set when it commences — logging capable of
**detecting** unauthorised access, not merely recording it. That standard is met by a
named catalogue of detections over the audit stream, each with a defined signal, a tuning
parameter, an action and an owner. It is built now, before commencement, because the
CERT-In six-hour clock runs from the moment an incident is *noticed* (EV-062) and an
unreviewed log produces no noticing.

| # | Signal (computed over the audit stream) | Tuning parameter (§20; owner: Security lead) | Action | Why this one |
| --- | --- | --- | --- | --- |
| D-1 | Restricted-class reads by one actor within a rolling window exceeding the actor's own trailing baseline | `detect.restricted_read_zscore`, `detect.restricted_read_window` | Raise to the incident channel; do not auto-lock (a payroll admin legitimately reads many bank accounts on bank-file day) | Bulk exfiltration looks exactly like a busy day unless it is compared to the actor's own baseline |
| D-2 | Any unmasking event (§17.4) without a `reason_code` | none — a hard invariant | Reject the request; the unmask cannot complete | A reason-coded unmask is the only kind the schema permits |
| D-3 | Restricted-class read by an actor whose role has no business need for that classification | none — derived from the permissions matrix (§07) | Block, then raise | This is a permissions bug or an escalation, never a legitimate read |
| D-4 | Export of Confidential-class salary data above a volume threshold, or outside the tenant's usual hours | `detect.export_rows`, `detect.export_offhours_window` | Raise; require step-up re-auth before the export completes | Salary exports are the most common insider-risk path in a payroll system |
| D-5 | Impossible travel or a new-ASN privileged login | `detect.geo_velocity_kmh` | Raise; step-up re-auth | Feeds the CERT-In identity-theft/credential-compromise class (§17.6) |
| D-6 | Aadhaar token-store read that is not attributable to a live filing or a named employee request | none — the token store answers only enumerated call sites | Block, then raise | The token store has a closed set of callers by construction (Part E-6) |
| D-7 | Assistant (`actor_type = assistant`) tool-call touching a Restricted classification | none — the §12 chokepoint default-denies it | Block at the chokepoint; raise as an AI/ML-class candidate (NFR-OBS-1105) | Structural, not heuristic: the chokepoint is in the call graph (Part E-7) |
| D-8 | A monetary mutation with no paired audit event, detected by the orphan-mutation reconciler | none — the target is 0 | Page immediately; treat as an integrity incident | The completeness guarantee of NFR-SEC-401 is only as good as the job that tests it |

No detection in this catalogue carries a hard-coded numeric threshold in this PRD. The
tuning parameters are registered in §17.16 with a named owner and are set from production
traffic in the first three month-ends (§20) — a threshold guessed today and never revisited
produces either an unread alert stream or a detection that never fires, and both fail
EV-064's standard in the same way.

**Negative cases this catalogue must not produce.** A detection that fires on the
month-end bank-file run, on a CA-console audit read (NFR-SEC-203), or on an employee
reading their own record is a false page, and NFR-OBS-1104's ≥ 95% actionable-page target
is the control on it. Each of the three is an explicit exclusion in the rule definition and
an explicit negative assertion in the test (NT-205).

**NFR-SEC-405 · Chain verification and the break path** · **P0**
Hash-chaining is worthless without a job that reads the chain and a defined response to a
break. The verifier runs nightly per tenant chain-day, and on demand before any audit
export leaves the platform (NFR-SEC-402). A break is not a bug report — it is an integrity
incident on the CERT-In clock (unauthorised modification of an ICT system's records), so
the transition table is specified rather than left to on-call judgement.

| State | Event | Guard | Side effect | Who may trigger |
| --- | --- | --- | --- | --- |
| `VERIFIED` | Nightly verify passes | Every `seq` present, every `prev_hash` matches, anchor head matches | Verification receipt written as an event; export unblocked | Scheduler |
| `VERIFIED` | Verify finds a hash mismatch | — | State → `BROKEN`; page on-call; audit exports for that tenant-day blocked | Scheduler |
| `VERIFIED` | Verify finds a `seq` gap | — | State → `GAP`; page on-call | Scheduler |
| `GAP` | Gap explained by a known write failure with a recorded, reconciled transaction | Reconciler evidence attached by a named human | State → `VERIFIED_WITH_NOTE`; note carried into every later export | Security lead |
| `GAP` | Gap unexplained after the triage window | — | State → `BROKEN` | Scheduler |
| `BROKEN` | Incident opened | — | CERT-In runbook entered at `TRIAGE` (§17.6); the six-hour clock is running from the moment the break was noticed | Security lead |
| `BROKEN` | Root cause found and the chain re-anchored forward | Re-anchor never rewrites history — the broken span stays broken and stays visible | State → `VERIFIED_FROM_<seq>`; the break remains in every export of that period | Security lead + a second approver |
| any | Manual "mark verified" | **No such transition exists** | — | — |

The last row is the point of the table: there is no path by which a human marks a broken
chain clean. A tenant's export of a period containing a break says so, permanently. An
audit trail that can be quietly repaired is not evidence.

**NFR-SEC-406 · Non-human actors are first-class in the trail** · **P0**
Four actor types other than `human` write to tenant data, and each has a different
accountability story that the schema must carry rather than flatten:

| `actor_type` | Who it is | Mandatory extra fields | The question it must answer years later |
| --- | --- | --- | --- |
| `assistant` | The §12 AI layer executing an approval-gated tool call | `on_behalf_of` (the named confirmer), the disclosure-record reference, model and prompt-version identifiers | Which human confirmed this, and what was the model shown? (Part E-7) |
| `importer` | A §16 migration importer writing opening balances or history | `on_behalf_of`, source-file digest, importer version, tie-out reference | Which file produced this figure, and did it tie out? |
| `scheduler` | A platform job — accrual, recompute, retention sweep | The job's rule-object version | Which rule made this run behave the way it did? |
| `operator` | Our own §22 operator acting on a portal under written authority | `on_behalf_of` **and** `authority_ref`, plus the portal session reference | On whose written authority, and what exactly was done on the customer's behalf? (K-13) |

- **Measurable:** 0 audit events with `actor_type` ≠ `human` and a null `on_behalf_of`
  (schema constraint); 0 `operator` events with a null `authority_ref` (schema constraint);
  100% of assistant-written events resolvable to a disclosure record (join test).
- **Negative:** there is no `actor_type = system` and no "platform" actor. An event nobody
  can be named for is a gap in the trail, and the schema makes it unwritable.

<!-- DIAGRAM: nfr-access-detection-pipeline -->

---

### 17.6 Data protection — CERT-In and the SPDI Rules today, DPDP from ~May 2027

This is where an India-first HRMS diverges from a GDPR-shaped product, and the
divergence is one of **timing** before it is one of substance. Two regimes bind today:
the CERT-In Directions (six-hour reporting, 180-day in-India ICT logs, NTP sync —
EV-062) and the SPDI Rules 2011 under IT Act s.43A (written consent before collecting
biometric or financial information, a cross-border transfer restriction, ISO 27001 as
the named security standard — EV-060). DPDP's substantive provisions — ss.3–17, 27–34
and 44(2), and Rules 3, 5–16, 22 and 23 — commence on or about 13 May 2027 (EV-058
**[Verified — mirror]**; pull G.S.R. 843(E) from the primary source before customer
use). The November 2026 tranche commences only Consent Manager registration (s.6(9),
s.27(1)(d)); an HR SaaS is not a Consent Manager, so nothing new bites on this product in
November 2026 and the Data Protection Board cannot fine it then (K-05). A January 2026
proposal to compress the runway is not gazetted and its scope is unresolved (EV-058) —
a §20 watch item. Across ~May 2027 two consent regimes run concurrently (Part E-6).
The legal analysis is in §23.3 (DPDP), §23.4 (SPDI) and §23.5 (CERT-In); this subsection
states only the engineering consequences.

**Why the controls in this section are sized the way they are — the live exposure, not
the headline.** Today's exposure for a biometric or financial-data breach is compensation
under IT Act s.43A, which is live and has **no statutory cap** (EV-061) — larger in
practice than DPDP's ₹250 crore security-safeguards ceiling, which cannot be enforced
until the Board's powers commence on or about 13 May 2027 (EV-058). From commencement,
the DPDP Schedule caps penalties by head, the largest being failure to take reasonable
security safeguards (s.8(5)); the full schedule, and who bears it — including whether a
processor carries any direct exposure, a counsel question (Part D-3) — is set out in §23.
The consequence for this PRD is the same under both regimes: the security-safeguard NFRs
(SEC-201/301/302/305) are P0 and gated in CI rather than aspirational, and they are built
to the standard SPDI r.8 names for reasonable security practices, ISO 27001 (EV-060,
§17.15); whether that discharges any particular party's s.43A duty is for counsel (§23.4). Once in force, DPDP s.8(1) keeps the data fiduciary
responsible "irrespective of any agreement to the contrary", so the product is not sold
as a transfer of that risk.
**[Reversed]** — earlier drafts presented the DPDP penalty schedule as a live tariff and
the product as "a risk-transfer instrument for the buyer"; the schedule is not in force
and the fiduciary's responsibility cannot be contracted away.

**NFR-DPDP-501 · Processing basis per field; two consent regimes run concurrently** · **P0**
**[Reversed]** — earlier drafts stated, as current law, that DPDP s.7(i) lets an employer
process employee data without consent, and set a target of "0 consent gates" on it.
Withdrawn: s.7(i) is not in force until on or about 13 May 2027 (EV-058), and today the
SPDI Rules require consent in writing before sensitive personal data — biometric and
financial information included — is collected (r.5(1), EV-060).

Every personal-data field carries a **processing-purpose tag** and a **legal-basis tag**
(the same field-level annotation as §17.4). While the SPDI Rules are live — whether they
survive the omission of IT Act s.43A at DPDP commencement is a counsel question (Part
D-12, §23.4), so the product does not switch this gate off on a date of its own choosing —
fields in the SPDI sensitive set (r.3 — biometric information, financial information
such as bank account details, health data, passwords) are collected only after a
written-consent artefact is captured (r.5(1)). The set is SPDI's, not DPDP's: DPDP
creates no sensitive category (s.2(t), EV-059), so the tag never reads "sensitive under
DPDP" (Part D-19). Who owes that duty — the employer, the SaaS, or both — is under counsel
review (Part D-4, §23); the product captures the artefact either way, as the versioned
consent entity of §07. When s.7(i) commences it is expected to disapply consent and notice
for employment purposes only; it does **not** disapply the s.8 duties (security,
accuracy, breach intimation, erasure, grievance). Where the employment purpose ends —
dependants' data for insurance, wellness, optional-benefit marketing — is a counsel
question (§23); the product treats that processing as consent-based under either regime.
The regime switch is a rule change effective from a date set on counsel's opinion, not a
migration (Part E-6). Consent cannot be
backfilled: migrated employees go through §07's migration consent flow (Part E-12).

- **Measurable:** 0 SPDI-set fields stored without a linked, versioned consent artefact
  (schema constraint + flow audit); 0 flows in which a declined consent blocks payroll or
  employment — a declination routes to the non-biometric attendance path (§09) or manual
  payment handling and is recorded (Part D-10); no "biometric only" attendance
  configuration and no "no Aadhaar, no payroll" configuration exists (config-schema audit:
  0 such options).
- Every field's purpose and basis tags are populated (CI lint, untagged = build-fail), so
  the system can show which basis applied to any processing at any date.

**NFR-DPDP-502 · Data-principal rights machinery** · **P0/P1**
DPDP Chapter III contains exactly four rights — access (s.11), correction and erasure
(s.12), grievance (s.13), nomination (s.14) — none in force until on or about 13 May 2027
(EV-066, EV-058). ss.11–12 are textually tied to consent; whether they reach an employer
relying on s.7(i) is under counsel review, and both answers are dangerous to state (Part
D-1, §23). The product builds the machinery as a **capability** regardless — some
processing rests on consent under either regime (NFR-DPDP-503), and buyers ask for it in
security review. For an employee, the system provides:

| Right | Target | Verification |
| --- | --- | --- |
| Access (s.11 when in force) | Employee downloads their own record (profile, payslips, filings, declarations) as a machine-readable export — a product capability; DPDP Chapter III has no portability right (EV-066) | Self-service export test; completes ≤ 60 s |
| Correction | Employee raises a correction request routed to HR-Admin; tracked to closure | Workflow test |
| Erasure, bounded by statute | Erasure honoured **except** where retention is legally required — the six employer registers carry the EV-054 central-sphere periods, and PF, ESI and TDS records carry periods held as configuration pending counsel (NFR-DPDP-506). The system erases what it may and documents the statutory hold on the rest | Erasure test shows retained classes with a cited hold reason or a counsel-review flag |
| Grievance officer | A named grievance contact is configured per deployment; SLA to first response published | Config check |
| Nomination (s.14 when in force) | Employee records a nominee for their data-principal rights, held separately from statutory nominations (PF, gratuity) so neither overwrites the other | Workflow test: nominee record exists and is distinct from the PF and gratuity nomination records |

> **Erasure vs. retention is a real tension, not a checkbox.** A terminated employee's
> erasure request collides with the employer's duty to retain PF/ESI/TDS records and to be
> able to reproduce a filed return under inspection. The design rule: **erase discretionary
> data, retain statutorily-mandated data with a documented hold, and never let an erasure
> request silently break a filing's reproducibility.** Erasure acts on the erasable
> entity classes — punches, rendered documents, biometric templates, consent artefacts,
> discretionary data — through the §14 mechanism; the bitemporal classes (rules, salary
> structures, assignments, statutory attributes) are not erased by an erasure request, and
> what replay returns after an erasure is specified in §14 (Part E-2). The hold periods
> are enumerated in NFR-DPDP-506.

**NFR-DPDP-503 · Consent capture & notice; no Consent Manager dependency** · **P0 (capture) / P1 (notice template)**
Where consent is required — today, the SPDI written-consent set (NFR-DPDP-501), and any
processing outside the employment purpose — capture it with a clear notice, itemised
purpose, withdrawal path, and an audit record of consent version, timestamp and whose
artefact it is (§07 consent entity). An employee privacy notice ships as a configurable
template even where no statutory notice duty may attach — whether one attaches to
s.7(i) processing is a counsel question (§23). **Consent Managers are not a dependency.**
The DPDP Rules are notified (G.S.R. 846(E), 13.11.2025); Consent Manager registration
commences in the November 2026 tranche (s.6(9), s.27(1)(d), EV-058); an HR SaaS is not a
Consent Manager, and the product does not integrate one. **[Reversed]** — earlier drafts
treated the Consent Manager regime as unsettled pending notified rules; the rules are
notified and the regime does not reach this product.

**NFR-DPDP-504 · Data Protection Officer / Significant Data Fiduciary seam** · **P2**
Significant Data Fiduciary status arises **only** by Central Government notification
under s.10(1); no threshold of any kind triggers it, s.10 is not in force, and we are not
aware of any designation as of September 2026 (EV-065). If designated, additional
obligations attach (an India-based DPO, an independent data auditor, periodic DPIA and
audit). The design keeps a DPIA template and a DPO-role seam ready so designation, if it
comes, is a process step, not a re-architecture. **Kill/validate:** watch for a s.10(1)
notification naming this product, a customer, or a class either falls into (§20); do not
incur DPO/DPIA operating cost until a notification or a specific tenant's contract
requires it — but never let the *seam* be closed, since re-opening it is the expensive
part. **[Reversed]** — earlier drafts said SDF "turnover/volume thresholds" would be set by
notified rules; there is no threshold, only notification (EV-065).

**NFR-DPDP-505 · Breach notification — one pipeline to six hours, DPDP pre-staged** · **P0**
The **live Indian breach clock is six hours**, to CERT-In, from noticing the incident
(EV-062, NFR-CERT-601). DPDP r.7 — not in force until on or about 13 May 2027 — will add,
for any personal data breach: intimation without delay to each affected data principal
and to the Board, then a detailed report to the Board within 72 hours or such longer period
as the Board allows on request (r.7(2)(b); r4/02), with
**no materiality threshold** — every breach, a single misdirected payslip included
(EV-063). From commencement those intimations run **in addition to** the six-hour CERT-In
report, never instead of it. The incident runbook (§17.14) fires the CERT-In report today
and carries the DPDP r.7 content fields pre-staged, so commencement is a configuration
switch. Triage routes and prioritises; it never decides not to notify. **[Reversed]** —
earlier drafts treated the DPDP timeline as unknown and bound the runbook to "the stricter
of DPDP and CERT-In"; the Rules are notified and not in force, and any 72-hour figure is a
future DPDP follow-up report, never the Indian obligation (K-07).

**NFR-DPDP-506 · Statutory data-retention schedule (the erasure exceptions, enumerated)** · **P0**
An erasure engine that cannot cite *why* it retained a record is a liability under both the
data-protection regime (retention must be lawful) and inspection (the record must exist).
The system carries a machine-readable retention schedule keyed per data class, so an
erasure request produces an itemised "erased / retained-with-reason" statement
automatically. The only statutory periods this PRD states are EV-054's central-sphere
register periods; every other period is a **named configuration parameter** whose value
is set on counsel's opinion (Part D-11, §23.14) and whose validation sits in §20.

| Data class | Retention rule in the schedule | Basis and status |
| --- | --- | --- |
| Wages registers and wage slip — Forms I, IV, IX and Form V (Wages r.51(1)) | "Five years after the date of last entry" (Wages r.51(4)) | **[Verified — central sphere]** EV-053, EV-054 |
| OSH registers — Forms XIII, XIV, XV, XIX, XX and Form XVI | "Five calendar years from the date of last entry" (OSH r.72(1)(vii)); OSH r.76(2) bars destroying the leave register even after five years unless transferred to a new register, so the engine never auto-purges it | **[Verified — central sphere]** EV-054 |
| Register of Women Employees — Form XXII (SS r.53(1)(a)) | "Five calendar years from the date of last entry" (SS r.53(1)(e)); the maternity Schedule para 11(a)(2) "in ink" requirement contradicts r.53(1)(b)'s electronic permission — counsel (§23) | **[Verified — central sphere]** EV-054 |
| Industrial Relations Rules records | Electronic maintenance compulsory (r.47(1)); r.47(2) sets no period → `retention.ir_records` | EV-054; period under counsel review (§23) |
| State-sphere registers and forms (form numbers per state, EV-053) | `retention.state.<state>.<form>` | Unknown — counsel (§23); validation (§20) |
| Appointment letter — OSH Code s.6(1)(f), establishments of 10 or more workers, form prescribed by the appropriate Government (EV-057) | `retention.appointment_letter` | Statutory basis under counsel review (§23) |
| EPF records — ECR files, returns, challans, contribution records | `retention.epf` | Statutory basis under counsel review (§23) |
| ESI records | `retention.esi` | Statutory basis under counsel review (§23); the ESI position after 22 Nov 2026 per §06.9 |
| TDS records — Form 138 (ex-24Q) returns, challans, Form 130 (ex-Form 16) certificates, Form 124 (ex-12BB) proofs (EV-050) | `retention.income_tax` | Statutory basis under counsel review (§23) |
| Gratuity records and nominations | `retention.gratuity` | Statutory basis under counsel review (§23) |
| ICT/system logs, LLM prompt/completion logs included | A rolling 180 days minimum, within India; any longer period is `retention.ict_logs` | **[Verified — CERT-In domain]** EV-062 |
| DPDP r.8(3) one-year retention of personal data and processing logs | Not in force; whether it is a universal floor is a counsel question, so neither immediate purge nor one-year suppression is hard-coded (Part D-9) → `retention.dpdp_r8_3` | EV-058; counsel (§23) |
| Discretionary data (wellness, optional-benefit marketing, non-mandated survey) | **No statutory hold identified — erase on request** | Product capability today; DPDP s.12 when in force (EV-066) |

- **Measurable:** an erasure request on a terminated employee returns a statement listing
  every retained class with its cited hold — or the flag "statutory basis under counsel
  review" — and its expiry date where one is set, and erases everything with no hold,
  within the published response window; a retained class with *neither* a cited basis nor
  a counsel-review flag is a build-fail (the schedule must be complete).
- **Until counsel sets a period, a counsel-review class is held, never erased** — the
  engine never invents a period and never treats a parameter's absence as permission to
  delete.
- **Reproducibility guard:** erasing discretionary data must never break the ability to
  regenerate a filed return for a retained period (ties to NFR-SEC-401 rule-versioning).
- Every period, the EV-054 figures included, is re-checked for corrigenda before the
  erasure engine treats it as authoritative (the corrigendum standing rule, §02.4).
- **[Reversed]** — earlier drafts listed EPF records at 3 years after settlement, ESI at
  ≥ 5 years, TDS records and Form 130 at ≥ 7 years, and "four consolidated registers" at
  5 years. None of the non-register periods has a source in the evidence register, and the
  registers are six plus a wage slip under three differently worded rules (EV-053,
  EV-054); withdrawn.

<!-- DIAGRAM: erasure-vs-retention-decision -->

**CERT-In directions (2022) — binding from the first customer.** The four NFRs that follow
carry obligations that bind today on every tenant, at every size, with no threshold:
six-hour reporting, 180 days of in-India ICT logs, NTP sync, and assistant actions logged
with human-action fidelity (EV-062). The machinery that makes the first of them achievable
— the lifecycle, the classification table, the log register and the incident record — is
§17.6.1 to §17.6.3.

**NFR-CERT-601 · Six-hour incident pipeline** · **P0**
CERT-In requires reporting of the Annexure I cyber incidents **within six hours** of
noticing them or being brought to notice of them, for every body corporate (EV-062
**[Verified — CERT-In domain]**; CERT-In Directions No. 20(3)/2022-CERT-In, 28.04.2022,
under IT Act s.70B(6)). A manual process cannot meet six hours, so this is a pipeline —
detection tooling, pre-staged report fields, a registered point of contact — not a
procedure (Part E-8). The product has three reportable surfaces: attendance terminals
(IoT devices, Annexure I item xiii), the cloud layer (item xviii), and the AI layer
(item xx, attacks on AI/ML systems). An AI-first product *enlarges* the reportable
surface, so the AI/ML incident class is first-class, not a formality.

| Target | Value | Verification |
| --- | --- | --- |
| Detection-to-report capability | The pipeline and on-call produce a CERT-In-format report within six hours of noticing, for every incident class | Tabletop drill measures elapsed time; must be ≤ 6 h |
| CERT-In point of contact | Designated and registered **before the first paying customer** (CERT-In Directions direction (iii); r4/02) | Onboarding checklist gate |
| Reportable-class coverage | Runbook enumerates all 20 Annexure I classes; each maps to a detection signal | Runbook review |
| AI/ML incident class | A distinct class on the six-hour clock covering prompt injection, training- or retrieval-data poisoning, model or data extraction, and unauthorised access to the inference pipeline or vector store (Part E-8) | Each sub-class has a detection rule and a drill scenario |

The reportable classes most likely to fire for an AI-first payroll SaaS, and the detection
each maps to (a subset of the twenty in Annexure I; EV-062). Item numbers are given only
where our research read them from the Directions (iii, xi, xii, xiii, xviii, xx — r4/01,
r4/02); the identity-theft class and the server/database/application class are mapped to
their Annexure I items when the runbook is authored against the Directions text, not from
this list:

- **Unauthorised access to data / data breach / data leak (items iii, xi, xii)** →
  tenant-isolation alerts (NFR-SEC-201), surprise-egress detector (NFR-RES-703),
  Restricted-field access anomalies (NFR-SEC-204).
- **Identity theft, phishing, credential compromise** → brute-force/stuffing signals
  (NFR-SEC-101), impossible-travel and anomalous privileged-login detection.
- **Attacks on servers, databases and applications (SQL injection among them), and on
  cloud systems (item xviii)** → WAF + SAST/DAST signals.
- **Attacks on IoT devices (item xiii)** → anomalies on the ADMS/WDMS attendance-ingest
  endpoint (§09), which is the one internet-facing device surface in the product.
- **Attacks or malicious activity affecting *systems related to AI and Machine Learning*
  (item xx)** → the AI/ML incident class above: prompt-injection, tool-abuse, poisoning,
  extraction and inference-pipeline-access detection (NFR-OBS-1105).

> **Worked timeline — a prompt-injection escalation, today and after ~May 2027.** T+0:
> NFR-OBS-1105 raises a tool-abuse alert (an assistant tool-call attempts a payroll mutation
> outside its ACL). T+4 min: on-call acknowledges (MTTA ≤ 5 min target, NFR-OBS-1104),
> triages, confirms the approval gate held and no monetary field changed (§08 — the model
> never calculates). The incident is now noticed, and the **CERT-In six-hour clock** is
> running: an attack on the AI system is itself reportable whether or not data leaked, and
> the report goes to CERT-In through the registered point of contact. T+45 min: scope
> assessed — was any Restricted-class data (§17.4) exposed? **Today, of the two clocks
> in this runbook, only the CERT-In clock runs.** After DPDP commencement, a personal data breach additionally triggers the r.7
> intimations to each affected employee and to the Board (NFR-DPDP-505) — in addition to
> the CERT-In report, never instead of it, and with no materiality threshold. Tabletop
> drills (NFR-CERT-601, NFR-DR-1405) measure elapsed time against six hours.

**NFR-CERT-602 · 180-day log retention within Indian jurisdiction** · **P0**
ICT system logs are retained for a **rolling 180 days** and stored **within Indian
jurisdiction** (EV-062). This is a residency requirement on *logs*, not only on primary
data — a common miss, and the only express in-India storage requirement in this PRD's
evidence that reaches every tenant today (SPDI r.7 conditions transfers of sensitive data
on equivalent protection and on contract necessity or consent; it does not require
in-India storage, EV-060). LLM prompt/completion logs are treated as ICT logs and kept in
India (§12, §15, Part E-7); whether they are ICT logs in law is under counsel review (§23),
and the product is built as though they are.

The 180-day figure is a floor, not a hard-coded window. DPDP r.6(1)(e) — not in force
until on or about 13 May 2027 — will require logs and personal data to be retained for one
year "for enabling the detection of unauthorised access", unless another law requires
otherwise, with no location constraint of its own (r4/02, r4/03; EV-058). The log store
therefore carries its window as the configuration parameter `retention.ict_logs`
(NFR-DPDP-506), and is sized so that setting it to one year at commencement is a
configuration change, with every log still held in India. Whether that parameter is
set to one year, and how it interacts with the r.8(3) question, is decided on counsel's
opinion (Part D-9, §23) — this NFR hard-codes neither.

- **Measurable:** log store region = India, verified in provider config; retention window
  ≥ 180 days verified by querying the oldest available log; a log-shipping path — the AI
  layer's included — that egresses to a non-India region is a build-fail.

**NFR-CERT-603 · Time synchronisation to NIC/NPL** · **P0**
All systems sync clocks to **NIC or NPL NTP servers** (or servers traceable to them)
(EV-062). Skew tolerance ≤ 100 ms; monitored, alerts on drift. This underpins the
audit-trail timestamp integrity in §17.5.

**NFR-CERT-604 · Assistant actions logged with human-action fidelity** · **P0 (wherever the assistant is enabled)**
The AI assistant's tool-calls (§12; MCP write tools are approval-gated and audited) are
ICT-system events under the CERT-In log direction and are logged with the same fidelity
as human actions, so an AI-initiated change is as reportable and as reconstructable as a
human one. (Earlier drafts attributed "KYC expectations" to CERT-In for any user-facing
service; no such obligation is in the evidence register, and the claim is withdrawn.)

#### 17.6.1 The incident lifecycle as a transition table

Six hours is short enough that the runbook cannot be prose. The pipeline is a state
machine with explicit guards, because the two decisions that kill a six-hour obligation —
"is this an incident yet?" and "do we have enough to report?" — are exactly the two a
human under pressure will defer. The table is the contract; the diagram is illustration.

| From | Event | Guard | Side effect | Who may trigger |
| --- | --- | --- | --- | --- |
| — | A detection fires (D-1…D-8, NFR-OBS-1105, or a third-party/customer report) | — | `CANDIDATE` opened; incident record created; `noticed_at` stamped from the NTP-synced clock (NFR-CERT-603) | Any detection, any employee, any customer |
| `CANDIDATE` | On-call acknowledges | Within the MTTA target (NFR-OBS-1104) | `TRIAGE`; **the six-hour clock is already running from `noticed_at`, not from acknowledgement** | On-call |
| `TRIAGE` | Classified as an Annexure I class | Matches a class in the runbook's class map | `REPORTABLE` | On-call |
| `TRIAGE` | Classified as not an Annexure I class | A named approver records a `reason_code` and the evidence considered | `NOT_REPORTABLE_RECORDED` — the decision is itself an audit event and is reviewed in the post-incident review | Security lead (never on-call alone) |
| `TRIAGE` | Classification cannot be reached inside the triage budget | — | Auto-promote to `REPORTABLE` | Scheduler — the timer, not a person |
| `REPORTABLE` | Report assembled from the pre-staged incident record | Mandatory fields populated or explicitly marked "not yet known" | `REPORT_READY` | On-call |
| `REPORT_READY` | Report sent to CERT-In through the registered point of contact | Point of contact is registered and current (CERT-In direction (iii)) | `REPORTED`; submission receipt attached to the incident record | Security lead |
| `REPORTED` | New facts materially change scope | — | `SUPPLEMENTARY_DUE`; a follow-up is prepared — the initial report is never edited in place | On-call |
| `REPORTED` | Personal data confirmed involved, **on or after DPDP commencement** | s.7-era regime active (~13 May 2027, EV-058) | Clock B arms: r.7 intimations to each affected data principal and to the Board, then the detailed Board report (NFR-DPDP-505) — in addition, never instead (K-07) | Security lead |
| `REPORTED` | Containment and recovery complete | — | `RESOLVED` | Incident commander |
| `RESOLVED` | Post-incident review held | Review covers elapsed time against six hours, every `NOT_REPORTABLE_RECORDED` decision in the period, and false-page rate | `CLOSED` | Security lead |
| any | "Suppress notification" | **No such transition exists** | — | — |

Two properties the table is built to force. First, **the clock starts at `noticed_at`, not
at acknowledgement**: CERT-In direction (ii) runs from "noticing such incidents or being
brought to notice about such incidents" (EV-062), so a customer email at 02:00 that nobody
opens until 09:00 has already consumed seven hours, and the incident record stamps the
earlier time. This is why the intake path includes customer- and third-party-originated
reports as first-class triggers, and why the support inbox is monitored as an incident
surface, not only as a queue. Second, **indecision resolves toward reporting**: the
auto-promotion transition exists so that an unresolved classification cannot silently
consume the budget.

**Internal time budget inside the six hours.** Proposed allocation, to be replaced by
measured drill times (§20); the point of publishing it is that each hand-off has an owner
and a deadline rather than an aspiration:

| Phase | From → To | Internal budget | Cumulative | Measured by |
| --- | --- | --- | --- | --- |
| Acknowledge | `CANDIDATE` → `TRIAGE` | ≤ 5 min | 0:05 | Paging system (NFR-OBS-1104) |
| Classify | `TRIAGE` → `REPORTABLE` / `NOT_REPORTABLE_RECORDED` | ≤ 40 min | 0:45 | Incident record timestamps |
| Assemble | `REPORTABLE` → `REPORT_READY` | ≤ 75 min | 2:00 | Incident record timestamps |
| Review and send | `REPORT_READY` → `REPORTED` | ≤ 120 min | 4:00 | Submission receipt |
| **Reserve** | — | 120 min | **6:00** | — |

The two-hour reserve is not slack. It absorbs the gap between the moment an incident
becomes knowable and the moment the platform notices it — the interval the product cannot
measure from inside itself — and it is the first thing a drill should try to consume
(NFR-DR-1405). A drill that finishes at 5:55 has failed even though it met the obligation.

**NFR-CERT-605 · The incident record, and the shape of what is reported** · **P0**
The incident record is an internal data structure specified here; the **CERT-In report
format is not specified in this PRD** and is not invented. The runbook's report template is
authored directly against the CERT-In incident-reporting form at the time the runbook is
written, and re-checked before each drill — no field list is carried in this document,
because a field list guessed from secondary sources is exactly the fabricated precision
this PRD's evidence discipline exists to prevent (§02). What this NFR fixes is that every
datum the form is likely to want already exists, structured, before the clock starts.

| Incident-record field | Populated when | Source |
| --- | --- | --- |
| `noticed_at`, `noticed_via`, `first_reporter` | At `CANDIDATE` | Intake path |
| `annexure_class[]`, `class_rationale` | At `TRIAGE` | Runbook class map |
| `affected_tenants[]`, `affected_employee_count` | At `TRIAGE`, revised at scope | Tenant-isolation and access telemetry |
| `classifications_involved[]` | At scope | The §17.4 field tags — this is the field that decides whether Clock B can ever arm |
| `systems_involved[]` | At `TRIAGE` | Asset inventory; carries the three reportable surfaces (terminals, cloud layer, AI layer) |
| `containment_actions[]`, `recovery_actions[]` | Continuously | On-call |
| `evidence_refs[]` | Continuously | Audit-chain export, ICT log extract, egress-detector output (NFR-RES-703) |
| `certin_submission_ref`, `submitted_at`, `submitted_by` | At `REPORTED` | Submission receipt |
| `dpdp_r7_armed`, `principals_notified_at`, `board_report_at` | Only on or after commencement | NFR-DPDP-505 |

- **Measurable:** every incident record reaches `REPORTED` or `NOT_REPORTABLE_RECORDED`
  with a named approver and a `reason_code`; 0 records sitting in `TRIAGE` past the
  auto-promotion timer; the drill measures `noticed_at` → `submitted_at` and the figure is
  published in the post-incident review.
- **Negative:** the record has no field, flag or workflow that expresses "reportable but
  not reported". Suppression is not a state the machine can reach.

<!-- DIAGRAM: nfr-incident-lifecycle -->

#### 17.6.2 Classifying an event — the decision table

The classification decision is where a six-hour obligation is usually lost, so it is a
table rather than a judgement call. "Annexure I class" below means a class the runbook's
class map draws from the Directions' own Annexure I, which runs to twenty items (EV-062,
r4/02); the map is authored against the Directions text.

| # | Observed | In a runbook class? | Personal data involved? | Action **today** | Additional action **on or after ~13 May 2027** |
| --- | --- | --- | --- | --- | --- |
| C-1 | Cross-tenant read confirmed (NFR-SEC-201 breach) | Yes — unauthorised access / data breach | Yes | Report to CERT-In inside six hours | Clock B arms: r.7 intimations, no materiality threshold (EV-063) |
| C-2 | Attendance terminal compromised or exfiltrating (§09 ingest) | Yes — IoT devices, item xiii | Possibly — depends on whether templates or punches left | Report inside six hours **regardless** of the personal-data answer | Clock B arms only if personal data is confirmed involved |
| C-3 | Prompt injection that the §12 chokepoint blocked, no data moved | Yes — attacks on AI/ML systems, item xx | No | **Report inside six hours** — an attack on the AI system is reportable whether or not it succeeded | Clock B does not arm |
| C-4 | Model-provider (sub-processor) breach disclosed to us | Yes — cloud systems, item xviii, where our systems are affected | Depends on what the redaction chokepoint let through (§12) | Report inside six hours; the chokepoint's token map is the evidence of what could have been exposed | Clock B arms if personal data was in the exposed set |
| C-5 | One employee's payslip emailed to the wrong employee of the same tenant | Runbook class map decides; the misdirection is a disclosure | Yes | Classify against the class map; if in a class, report inside six hours | Clock B arms — **a single misdirected payslip is a breach with no materiality threshold** (EV-063) |
| C-6 | Credential-stuffing wave, all attempts failed | Yes — the identity/credential class | No | Report per the class map | Clock B does not arm |
| C-7 | Audit-chain break with no other indicator (NFR-SEC-405 `BROKEN`) | Treated as an integrity incident pending root cause | Unknown | Enter the runbook at `TRIAGE`; auto-promote if unresolved | Depends on root cause |
| C-8 | Planned failover drill (NFR-DR-1402) | No | No | Not an incident; recorded in the drill log | — |
| C-9 | Provider-side regional outage with no unauthorised access | No — an availability event (§17.8), not a security incident | No | SLO and status-page path, not the CERT-In path | — |

C-8 and C-9 are in the table on purpose: a runbook that cannot say what is *not* an
incident produces alert fatigue and, eventually, a real incident triaged by an exhausted
on-call. The discipline is that a non-report is a **recorded decision with a named
approver** (the `NOT_REPORTABLE_RECORDED` state), not an omission.

#### 17.6.3 The log register — what exists, where it lives, how long it stays

NFR-CERT-602 sets the rule; a build team needs the register the rule applies to, because
"all ICT system logs" (EV-062, direction (iv)) is a much wider surface than the application
log, and the component most likely to default to a foreign region is the one an AI-first
product adds (r4/00 — LLM prompt and completion logs). Each row states the store, the
residency constraint and the retention class from NFR-DPDP-506.

**NFR-CERT-606 · Log register and residency enforcement** · **P0**

| Log class | Contents | Residency | Retention | Who may read |
| --- | --- | --- | --- | --- |
| Application request log | Correlation id, route, status, latency, tenant, actor | India | `retention.ict_logs` (≥ 180 days, EV-062) | Engineering on-call; tenant-scoped extracts to a tenant on request |
| Audit event store | §17.5.1 schema | India | Register-linked classes per NFR-DPDP-506; never below `retention.ict_logs` | Tenant admins and CA-auditors (scoped), Security lead |
| Authentication and session log | Logins, MFA events, step-ups, revocations | India | `retention.ict_logs` | Security lead; tenant admins for their own tenant |
| Infrastructure and platform log | Host, container, network-flow, WAF, KMS key-use | India | `retention.ict_logs` | Engineering; Security lead |
| Database log | Slow queries, connection, DDL | India — **and scrubbed**: query text carrying Restricted values never reaches the log | `retention.ict_logs` | Engineering |
| Device-ingest log | ADMS/WDMS POSTs, device identity, packet-level outcomes (§09, §16) | India | `retention.ict_logs` | Engineering; tenant admins for their own devices |
| **LLM prompt/completion log** | Prompt, completion, model, task class, token counts, tenant, `on_behalf_of`, chokepoint token map references | **India, no exception, for every tenant regardless of `sector_profile`** | `retention.ict_logs`; the token map's own key material follows the §14 erasure mechanism | Security lead; AI owner; tenant-scoped extracts on request |
| Cost/usage attribution ledger (NFR-OBS-1101) | Per-call cost attribution, joined to employees | India — it links queries to employees, so it is an ICT log, not a billing artefact | `retention.ict_logs` | Finance; AI owner |
| Egress-detector output (NFR-RES-703) | Outbound destinations, allow-list decisions | India | `retention.ict_logs` | Security lead |
| Third-party observability (APM, error tracking) | Traces, exceptions | **India region or not adopted** — a US-region observability tenant is a procurement blocker, decided before the vendor is chosen, not after | `retention.ict_logs` | Engineering |

Whether an LLM prompt/completion log is an "ICT system" log in law is inference rather
than express text (r4/02) and is under counsel review (§23.5); the product is built as
though it is, because the cost of being right and having built for it is a region setting,
and the cost of being wrong and not having is a re-platform of the observability stack.

- **Measurable:** a CI check enumerates every log sink's configured region; a non-India
  sink fails the build. A quarterly egress review reconciles the register against actual
  network destinations; an unregistered sink is an integrity finding, not a documentation
  gap.
- **Negative:** no log class is exempt "because it contains no personal data". Direction
  (iv) reaches ICT system logs as such (EV-062); the product does not litigate the scope of
  its own obligation by leaving a sink abroad.

**Worked sizing — why the log register is also a capacity artefact.** The 180-day rolling
window is a storage commitment that scales with the platform, not with a tenant, and it is
sized before launch rather than discovered at month seven. The arithmetic is
`log_bytes_retained ≈ Σ(class) events_per_employee_month × employees_on_platform × 6 months
× bytes_per_event(class)`. Both per-class rates — `capacity.log_events_per_employee_month`
and `capacity.log_bytes_per_event` — are **unmeasured** and are registered as parameters in
§17.16 with the Engineering lead as owner; they are read from the first month-end's
telemetry (§20), not guessed here. What *is* fixed now is the multiplier: at the P0
employees-on-platform figure (NFR-SCALE-901, ~100,000, **[Hypothesis — provisional]**) the
window holds six months of every class in the register simultaneously, in India, and the
DPDP r.6(1)(e) one-year figure (not in force, EV-058) doubles it — which is why
`retention.ict_logs` is a parameter with headroom rather than a constant, and why the store
is chosen for cheap cold tiers rather than for query speed at 180 days.

<!-- DIAGRAM: incident-dual-clock -->

#### 17.6.4 The regime switch as a rule object, not a migration

Two consent regimes run concurrently across the DPDP commencement date (Part E-6), and the
engineering question is how the system behaves on the day the second one arrives. The answer
is that **the regime is a rule object with an effective range** (§14 — identity,
jurisdiction scope, effective range, decision-time range, payload, citation with capture
date, author, reviewer, publish state), resolved at evaluation time exactly like a PT slab
or a wage definition. It is not a feature flag, and it is not a data migration.

The consequence is that a question asked about a past date returns the regime that applied
*then*. An audit in 2029 asking "on what basis did you hold this employee's bank details in
March 2027?" resolves the rule object as at March 2027 and answers with the SPDI
written-consent artefact; the same question about March 2028 resolves the later object.
Neither answer is reconstructed by hand, and neither depends on anyone remembering the
switch.

| Field group | Basis today (SPDI live, EV-060) | What changes at commencement (~13 May 2027, EV-058) | What the product does either way |
| --- | --- | --- | --- |
| Biometric templates, enrolment records | Written consent before collection (r.5(1)); r.3 classes it sensitive | s.7(i) is expected to disapply consent and notice for employment purposes; the s.8 duties are untouched; whether the consent duty survives depends on whether the SPDI Rules survive the omission of s.43A (Part D-12) | Captures and versions the artefact under both regimes; the gate does not switch off on a date the product chooses (§17.20 item 12) |
| Bank account, financial information | Written consent (r.5(1), r.3) | As above | As above |
| Health and disability data | Written consent (r.5(1), r.3); disability data is walled off for accommodation and the RPwD Rule 9(1) register (§10) | As above | As above |
| Passwords and credentials | r.3 sensitive; never stored in recoverable form regardless (NFR-SEC-101) | No change of substance | Argon2id hashes only; the classification exists for completeness, not to license storage |
| Aadhaar | Its own statute — reg 5 basis, reg 6 duties (EV-068), never a DPDP or SPDI category question | Unchanged by DPDP commencement | Token store, encrypted transmission, masked display, optional everywhere (NFR-SEC-303) |
| Ordinary employment data (name, role, attendance, salary) | Not in the SPDI sensitive set | s.7(i) is expected to cover employment-purpose processing without consent; s.8 duties apply | Purpose and basis tags populated; no consent gate, and none added speculatively |
| Dependants' data for insurance, wellness, optional-benefit marketing | Consent-based | Where the employment purpose ends is a counsel question (§23) | Treated as consent-based under **both** regimes — the conservative branch, chosen because it is the one that does not have to be undone |

| State | Event | Guard | Side effect | Who may trigger |
| --- | --- | --- | --- | --- |
| `SPDI_ONLY` | A new rule-object version is authored for the DPDP regime | Two-person review in the §22 compliance data pipeline; citation and capture date attached | Published in `staged` state with a future effective date; nothing changes in evaluation | Rule author + reviewer |
| `SPDI_ONLY` → `DUAL` | The effective date arrives | Counsel's opinion recorded on which gates change and on the SPDI-survival question (Part D-12) | Evaluation for dates on or after the effective date resolves the new object; evaluation for earlier dates is unchanged, forever | The clock |
| `DUAL` | The commencement date moves (the January 2026 compression proposal is gazetted, or the 13-versus-14 May ambiguity resolves — EV-058) | Primary-source confirmation (§20 watch item) | The rule object's effective date is amended and re-published; no code change, no migration | Rule author + reviewer |
| `DUAL` | Counsel concludes the SPDI written-consent gate no longer binds | Opinion recorded against the object | A further rule-object version relaxes the gate from its own effective date; artefacts already captured are retained, never deleted as "no longer needed" | Counsel + rule author |
| any | Retrospective edit of an effective date already passed | **No such transition exists** — a correction is a new version with a correction reason, never a rewrite | — | — |

- **Measurable:** a replay of any past date returns the basis that applied on that date, and
  the answer is identical before and after commencement (regression corpus, §22).
- **Measurable:** 0 code paths branch on a hard-coded commencement date; a grep for the date
  literal in the codebase returns 0 (CI check). The date lives in a rule object, so a
  gazette change is an authoring task, not a release.
- **Negative:** the switch never deletes, invalidates or hides a consent artefact captured
  under the earlier regime. If the later regime makes it unnecessary, it remains as the
  evidence of what was done at the time.

---

### 17.7 Data residency & provider abstraction

Extends §17.1 into measurable NFRs. Per §13.10, residency is a *segment-specific
procurement gate*, not a general differentiator — so the requirement is **selectable
guarantees**, sized to who is buying, on top of the two live constraints that apply to
every tenant (CERT-In logs in India, EV-062; SPDI r.7 on sensitive data, EV-060).

**NFR-RES-701 · Per-tenant residency pinning** · **P0 (capability) / P1 (regulated attestation)**

| Target | Value | Verification |
| --- | --- | --- |
| Data-at-rest region control | A tenant can be pinned to India (Mumbai + Hyderabad DR); the default is India | Deploy a tenant with `region=india`; confirm no data object lands outside India |
| In-country inference control | A regulated tenant's task classes route only to backends with India-region inference; a task with no India-region backend is *refused*, not silently sent abroad | Router test: a pinned tenant + a US-only model = task blocked with a clear error |
| Sub-processor transparency | Per-tenant list of every third party its data touches, with region and purpose | Generated report; matches actual egress (verified against network policy) |
| Written attestation | Regulated tenants receive a residency attestation document (data-at-rest India + inference region stated per task class) | Document exists and is accurate for a pinned tenant |

**NFR-RES-702 · Three interchangeable inference backends** · **P0**
Per §13.10: **at least three interchangeable LLM backends**, re-pointable
per task class *without a deploy*. This single requirement serves cost (router), residency
(pin), and resilience (failover) — three constraints, one build.

- **Measurable:** re-pointing a task class from backend A to backend B is a config change
  applied in ≤ 60 seconds with no service restart; a synthetic "provider down" test fails
  over to a second backend within the task's latency budget.
- **Consent-gated for sectoral profiles:** for a tenant with an RBI, SEBI or IRDAI profile,
  re-pointing to a provider outside the tenant's consented sub-processor set is refused
  until the sub-processor-change gate records that tenant's consent (§12, §13.10, Part
  E-7; RBI para 16(r) where material, EV-087). Failover is only ever to a provider already
  in the consented set.
- **Correctness guardrail (rules-first, LLM-last — §12.1, §13.4):** no statutory or monetary figure is ever
  model-generated regardless of backend, so a backend swap can never change a payroll
  number — only the phrasing of an explanation. Verified by the deterministic-replay test
  (§08 I4): the same pay run produces byte-identical monetary output irrespective of which
  model explained it.

**NFR-RES-703 · Data-egress control** · **P0**
Default-deny egress: tenant data leaves the India perimeter only through an
allow-listed, per-tenant-configured sub-processor. Verified by a network-policy audit and
a "surprise egress" detector (any outbound destination not on the allow-list raises an
alert). The detector is a CERT-In detection signal (NFR-CERT-601) and its output supports
evidence production for a regulated customer's inspections (EV-087, K-21).

<!-- DIAGRAM: provider-abstraction-layer -->

**NFR-RES-704 · Sectoral NFR profiles — RBI, SEBI and IRDAI as selectable overlays** · **P0 (profile field, defaults, propagation) / P2 (evidence packs, contract riders)**
Every tenant carries a `sector_profile` ∈ {`none`, `RBI`, `SEBI`, `IRDAI`}, set at tenant
creation and resolved to a fixed bundle of NFR settings that propagates to every
subsystem, exactly as the §17.1 walkthrough shows for RBI. Each overlay's instrument is
addressed to the **regulated customer**, not to us: it is what that customer must secure
from its service provider, and whether it reaches a given arrangement is the customer's determination —
for RBI, materiality is decided entity by entity, never by turnover (EV-087, K-22), and
whether our arrangement is material for a given entity is a counsel question (Part D-14,
CR-14). The product's job is to make the overlay selectable, automatic and evidenced. What
each regulator requires, who it binds and the open legal points are §23.12's; the
questionnaire that sets the profile, the recorded RBI materiality decision, the SEBI lane
declaration and evidence pack, and the IRDAI licence-versus-managed-service record are
FR-LEG-030 to FR-LEG-033. This NFR fixes only the settings each profile resolves to and
how their propagation is verified.

The profile is not an enterprise-only concern. CSCRF reaches a wider population of
SEBI-regulated entities than the cloud circular, and small firms in the 20–200 band sit
inside it — non-individual investment advisers are "Small-size REs" (r5/01) — so a
beachhead tenant can arrive with a SEBI profile.

| Setting | `none` (default) | `RBI` | `SEBI` | `IRDAI` |
| --- | --- | --- | --- | --- |
| Data at rest, backups, DR | India (Mumbai primary, Hyderabad DR) | India-pinned; localisation is among the obligations the entity secures where the arrangement is material (EV-087 **[Verified — mirror]**) | India-pinned: data resides and is processed in India, with a copy-in-India limb (EV-085). On public cloud the underlying infrastructure must be MeitY-empanelled — FAQ Q47/Q50 via clause 2(ii) reach SaaS providers (EV-085); regions expose only region-level selection, so the data-centre assurance is contractual (FAQ Q48, r5/01) | India, as the product default. The 2023 guidelines impose **no** localisation, MeitY or STQC requirement; IRDAI localisation reaches policy records only (reg 3(7), EV-086), which the product does not hold |
| AI features | Per §12 defaults | **Off** until the tenant opts in (Part E-7) | **Off** until opt-in | **Off** until opt-in |
| Inference, once opted in | Router default | `india_only` | `india_only` — an HR/payroll AI feature does not fit the CSCRF offshore exemption, which is drawn for IT and cybersecurity data sent to SOCs and security SaaS (r5/01) | `india_only` as a conservative product default; no IRDAI rule in our evidence requires it (EV-086) |
| Sub-processor change | Notice to the tenant | Blocked until the tenant's recorded consent — para 16(r) where material (EV-087) | Blocked until recorded consent; Principle 7(x) terms include the RE's and SEBI's right to information about our supply chain and our contractual liability for sub-contractors' performance and risk management (items 14–15, EV-085, r5/01) | Blocked until recorded consent as a product default; IRDAI requires no prior sub-processor consent, but the reg 53 access undertaking reaches sub-contractors (EV-086, r5/01) |
| Regulator access (legal scope, §23.12) | — | Inspection-ready: audit and access logs, sub-processor manifest and configuration history for the tenant producible on request, including for sub-contractors (para 16(o), EV-087) | Inspection-ready as for RBI, and every sub-processor contract carries a flow-down access term, because Principle 7(iv) access reaches the provider and its sub-contractors (EV-085) | Inspection-ready for books, records, systems and audit reports scoped to the service (reg 53(1), EV-086) |
| Keys | Platform KMS, per-tenant data keys (NFR-SEC-302) | Platform KMS | BYOK or BYOE with a dedicated, fault-tolerant HSM (circular clause 6.2.9(ii)); key location in India per FAQ Q26 — a supervisory expectation under live consultation, so a change risk (r5/01) | Platform KMS |
| Offshore anything | Never | Never | Never | Never — offshore outsourcing needs Competent Authority permission (reg 53(2), r5/01) and is not offered |
| Exit erasure | §14 mechanism | §14 mechanism | Secure erasure from disks, backups and logs on the RE's instruction, leaving nothing recoverable (expunging clause, Principle 7(vii), r5/01), subject to the RE's own retention duties and NFR-DPDP-506 holds | §14 mechanism |
| Segregation | Tenancy per §15.3 | Tenancy per §15.3 | Demonstrably segregated from the RE's systems under SEBI purview — no shared identity plane, no data path into trading, KYC or reporting stacks — because FAQ Q27 limits audit coverage to properly segregated systems and draws in connected ones (r5/01) | Tenancy per §15.3 |
| Evidence pack | Residency attestation (NFR-RES-701) | Attestation + frozen sub-processor manifest; supports evidence production, does not discharge the audit, access and inspection obligations (K-21) | Attestation + a rider covering the 20 Principle 7(x) terms (EV-085) + the CSCRF PR.IP guideline 5 undertaking that the software is free of known vulnerabilities, malware, malicious code and covert channels (r5/01) + a segregation note | Attestation + the reg 53 undertaking + ISO 27001 statement of applicability covering the supplied services (s.2.14: the insurer *may* except the vendor from periodic audits — discretionary); a Cloud Security Alliance trust certification is the route under s.2.19 cl.3.7.1 where the vendor *shall* be exempt (r5/01) |

**Classification questions the profile cannot answer, routed out.** (1) For an insurer,
IRDAI's outsourcing definition (PPI Regs 2024 reg 2(14)) captures managed payroll but
not a self-service licence (EV-086); whether adding attended filing (§22) to an insurer
tenant's plan turns the arrangement into outsourcing is a counsel question (§23.12, CR-42;
FR-LEG-033), and the plan configurator flags the combination rather than deciding it.
(2) Whether an RE's own employee HR and payroll data is "Regulatory Data" under CSCRF is
unresolved on the text (r5/01) — §20; §23.12, CR-41. (3) Whether the chosen India regions are
MeitY-empanelled at the data-centre level is unverified (§17.20 item 8; CR-41); **no SEBI
profile is activated until it is confirmed in writing.**

- **Measurable:** 100% of tenants carry a non-null `sector_profile` (onboarding gate; the
  customer's authorised signatory confirms regulated status and the answer is recorded);
  a nightly profile-to-config drift check reports 0 drift across storage region, inference
  routing, sub-processor manifest, key mode and AI default; a profile change is a
  two-person action that re-runs propagation and regenerates the attestation; each
  profile's evidence pack is generated from live config, never hand-authored.
- Every sentence in an attestation, evidence pack or contract rider that characterises a
  regulator's requirement is customer-facing legal copy: it carries a named owner and
  clearance under §23.1's representation-control rule before first use (Part D-20), and
  the generator emits only cleared template text around the live-config values.

<!-- DIAGRAM: nfr-sectoral-profile-overlays -->

#### 17.7.1 Setting and changing `sector_profile` — the lifecycle

The overlay table above says what each profile resolves to. What a build team also needs is
how a tenant acquires a profile, what happens when it changes, and which changes are
migrations rather than flags — because two of the four settings (key mode, and the
sub-processor manifest) cannot be flipped by writing a column.

| From | Event | Guard | Side effect | Who may trigger |
| --- | --- | --- | --- | --- |
| — | Tenant created | The onboarding questionnaire is answered and the customer's **authorised signatory** confirms regulated status (FR-LEG-030) | `sector_profile` set, never null; propagation runs; attestation generated from live config | Onboarding, with the customer's confirmation recorded |
| `none` | Upgrade to `RBI` / `SEBI` / `IRDAI` | Two-person action on our side **and** a recorded customer instruction | Propagation re-runs; **AI features are set off and any prior opt-in is voided**; sub-processor manifest re-frozen against the new profile's consent gate; attestation regenerated | Two named approvers |
| `none` → `SEBI` | — | Additionally: the India regions are **confirmed MeitY-empanelled in writing** (§17.20 item 8) | Without the confirmation the transition is refused; the tenant stays `none` and the sale is blocked, not worked around | — |
| `none` → `SEBI` | Key-mode change to BYOK/BYOE with a dedicated HSM (circular clause 6.2.9(ii), EV-085) | — | A **key migration**, not a flag: every per-tenant data key is re-wrapped under the new root, with a verified dual-read window and a rollback point. Runs as a scheduled migration outside every frozen span (NFR-AVAIL-807) | Two named approvers + Security lead |
| any regulated | A new sub-processor is proposed | The tenant's recorded consent exists (Part E-7; RBI para 16(r) where material, EV-087; SEBI Principle 7(x), EV-085; IRDAI reg 53, EV-086) | Manifest updated; attestation regenerated; the model router's allowed backend set for that tenant is recomputed | Two named approvers |
| any regulated | A new sub-processor is proposed, consent not recorded | — | **Refused.** Failover targets are limited to the already-consented set (NFR-RES-702) | — |
| any regulated | Downgrade to `none` | Two-person action **and** a recorded customer instruction stating the regulated relationship ended | Propagation re-runs; the historical attestations, manifests and evidence packs are **retained**, never rewritten | Two named approvers |
| any | AI opt-in under a regulated profile | The tenant's opt-in is recorded against the *current* profile version | Router marks every task class `india_inference_required`; a task whose only capable backend is off-shore is refused with a typed error, never silently sent abroad | Tenant admin |
| any | Nightly drift check finds config ≠ profile | — | Drift raised as a P0 finding; the attestation is marked stale until reconciled | Scheduler |

**Why an upgrade voids a prior AI opt-in.** An opt-in recorded under `none` was given
against a different disclosure: a different sub-processor set, a different inference
geography and a different default. Carrying it forward would mean the tenant is running AI
under an overlay it never agreed to, and the sub-processor-change gate (Part E-7) would have
nothing to bite on. Re-consent is a small friction; a regulated customer discovering its
employee data reached a backend it never approved is a terminal one.

**NFR-RES-705 · Attestations and evidence packs are generated, never authored** · **P0 (generation) / P2 (contract riders)**
The residency attestation, the sub-processor manifest and each profile's evidence pack are
rendered from live configuration at the moment of request, with a generation timestamp, the
config revision they describe and the profile version they were produced under.

| Target | Value | Verification |
| --- | --- | --- |
| Provenance | Every value in an attestation traces to a live config key; no free-text value is interpolable | Generator test: an attestation produced for a deliberately drifted tenant reports the drift rather than the intended state |
| Staleness | An attestation older than the last config change for that tenant is marked stale and cannot be exported | Export test |
| Cleared language | Every characterising sentence — what a regulator requires, what a certification proves — is cleared template text under §23.1's representation-control rule with a named owner (Part D-20); the generator interpolates only values | Copy-clearance register; 0 uncleared strings in the template set |
| Reconciliation | An auditor comparing the attestation against a network-policy dump and the sub-processor manifest finds them identical | Reconciliation drill, per profile, annually |

- **Negative:** there is no hand-edited attestation, no "draft attestation" export path, and
  no field an account manager can type into. The document's value is precisely that nobody
  can write it.
- **Honest limit:** the profile is set from what the customer's authorised signatory
  confirms. The product records that confirmation as an evidence artefact; it does not
  verify regulated status against a regulator's register, and nothing in this section should
  be read as a claim that it does. Whether our arrangement is material for a given RBI
  entity remains that entity's determination and a counsel question (Part D-14, §23.12,
  K-22).

---

### 17.8 Availability & SLAs

Availability is specified as a **windowed SLO**, because both the load and the harm are
concentrated. A 20–200 employer runs one payroll a month: the product is near-idle for
most of the month and saturated from pay-run preparation to disbursal (§17.9). A flat
99.9% monthly target permits ~43 minutes of downtime and cannot tell a quiet mid-month day
from the day before salaries are paid. Over-promising uptime is paid for out of a price
band with a value floor near ₹50 PEPM and a mid-market clearing band of ₹80–200 (EV-027,
§18) — two anchors, not a single ceiling (K-09). **[Reversed]** — earlier drafts set a flat
99.9% monthly SLA for the beachhead with no source in the 20–200 segment (an earlier
version borrowed it from the PSU tender, a segment §05 excludes from launch), and priced
it against a single "realised ARPU" range that §20.4 treats as a shape, not a level.

**NFR-AVAIL-801 · Windowed availability SLO** · **P0 (windowed SLO) / P2 (contractual SLAs)** · **[Hypothesis]**

| Window | SLO | Error budget | Verification |
| --- | --- | --- | --- |
| **Critical window** — 25th of month M to the 2nd of month M+1 (pay-run, approval, lock, bank file, disbursal, payslips) | **99.95%** | 0.05% of window minutes — ≈ 5.8 min for an 8-day window | Successful-request ratio (non-5xx, within timeout) at the load balancer, per window, excluding declared maintenance |
| **All other days** | **99.5%** | 0.5% of non-window minutes — ≈ 158 min over 22 days | Same measure, per month |
| **P1 — expansion (200–2,000)** | The windowed SLO above, plus a published status page and a root-cause analysis on every SLO breach | As above | Same measure, plus external synthetic monitoring from ≥ 2 Indian regions |
| **P2 — regulated / enterprise** | Negotiated per contract, never below the windowed SLO; service credits contractual | Per contract | Contractual, third-party-verifiable monitoring |

The rationale is the segment's, not the tender's: the practitioner month runs processing
from about the 25th, lock and bank file around the 27th, and disbursal across the 28th–1st
(r3/02 — low confidence: a convention from two vendor-marketing write-ups with no survey
or employer-sourced evidence, usable to frame the proposal, not to fix it), so an outage inside that window delays salaries, and outside it
mostly delays self-service reads. The window boundaries and both SLO values are a
proposal (Part E-13), **[Hypothesis]**: they are replaced by measured values from §20 instrumentation
(per-tenant pay-run timestamps across the first three month-ends) and buyer interviews,
and the window is a configurable parameter (`critical_window = {start_day: 25,
end_day: 2}`), not a constant.

> **Why not 99.99% at launch, [Hypothesis].** Four-nines (~4.3 min/month) needs multi-AZ
> active-active plus a mature on-call, which a price structure anchored by a value floor near
> ₹50 PEPM and an ₹80–200 mid-market clearing band (EV-027, K-09) cannot fund
> and the beachhead buyer does not contractually require. **Kill/validate:** if beachhead
> churn interviews (§20) show uptime is a top-3 loss reason at the windowed SLO, raise it;
> until then spend the reliability budget on *correctness of filings*, which is the actual
> unit of value (§01).

**NFR-AVAIL-802 · Statutory due-date windows — internal objective and deploy freeze** · **P0**
The critical window covers the pay-run; statutory due dates fall outside it. The system
treats the days around each due date in the §06.11 consolidated filing calendar — EPF ECR
and ESI on the 15th; TDS deposit on the 7th (**[Hypothesis]** — a date carried from the
1962 Rules, not yet read against the Income-tax Rules 2026, §06.13, §20); state PT per state — as **statutory windows** with
an internal objective of **99.95%** and a freeze on non-emergency deploys. The width of each
window is a configurable parameter (`statutory_window_days`), set from §20 telemetry. A
missed filing because the platform was down is an existential failure, not an SLA line
item.

- **Measurable:** during declared statutory windows, availability ≥ 99.95% and
  change-freeze compliance = 100% (no non-emergency deploy in the window).

**NFR-AVAIL-803 · Graceful degradation** · **P0**
Per §13.7 (rate limits P0; degrade gracefully): under load or partial outage, the system
**sheds the AI assistant and non-critical features first, and protects the deterministic
payroll and statutory-artefact path last.** AI-off is a supported configuration, not an
error state (§12). A tenant hitting a rate limit gets a queued, explained response — never
a wrong number and never a dropped filing artefact.

- **Measurable:** in a load test at 3× peak, the payroll-compute and statutory-artefact
  generation paths maintain their latency SLA while the assistant is throttled; 0 payroll
  transactions lost.

**NFR-AVAIL-804 · Maintenance windows** · **P0**
Planned maintenance is scheduled in low-usage IST windows (published ≥ 48 h ahead),
never inside the critical window or a statutory window, and excluded from the SLO
denominator only if declared. Verified against the deploy calendar vs. the statutory
calendar (§06.11).

#### 17.8.1 The error budget, computed — and why February is the hardest month

A windowed SLO is only operable once the budget is arithmetic rather than a percentage.
The critical window runs from the 25th of month M (00:00 IST) to the end of the 2nd of
month M+1 (23:59:59 IST), so its length is `(days_in_M − 24) + 2` days and **varies with
the length of the month**, while the complement is invariant.

| Month M length | Critical-window days | Window minutes | Budget at 99.95% | Non-window days in a calendar month | Non-window minutes | Budget at 99.5% |
| --- | --- | --- | --- | --- | --- | --- |
| 31 days | 9 | 12,960 | **6.48 min** | 22 | 31,680 | 158.4 min |
| 30 days | 8 | 11,520 | **5.76 min** | 22 | 31,680 | 158.4 min |
| 29 days (leap February) | 7 | 10,080 | **5.04 min** | 22 | 31,680 | 158.4 min |
| 28 days (February) | 6 | 8,640 | **4.32 min** | 22 | 31,680 | 158.4 min |

Two consequences a build team must design to, neither of them obvious from the headline
percentages:

- **The non-window budget is a constant 158.4 minutes in every month**, because
  `days_in_M − ((days_in_M − 24) + 2) = 22` for every month length. Capacity planning for
  the quiet period does not vary by month.
- **The critical-window budget varies by 1.5× across the year**, and its tightest value —
  4.32 minutes — falls in February, which is also the month whose pay-run preparation is
  most compressed. The engineering target is therefore set to the **February figure**, not
  to the annual average: a system sized to spend 6.48 minutes will breach in February while
  reporting a healthy annual number. The SLO is nonetheless measured per window occurrence
  with calendar-day boundaries, because that is the definition a customer can verify
  against their own clock.

**The three objectives are not additive, and the composition is tighter than the
headline.** NFR-AVAIL-802 sets a 99.95% internal objective for the statutory windows around
the §06.11 due dates, and those days sit *inside* the 22 non-window days. Writing `S` for
the number of statutory-window days in a month (`statutory_window_days` × the number of due
dates in that month — an unset parameter, §17.16), the month's permitted downtime outside
the critical window is `S × 1440 × 0.0005 + (22 − S) × 1440 × 0.005`, not 158.4 minutes.
Illustratively, at `S = 4` the figure is 2.88 + 129.6 = **132.48 minutes** — the naive
reading over-states the available budget by 25.9 minutes, about 16%. The `S = 4` value is an
illustration of the arithmetic only; the parameter is unset until §20 telemetry fixes the
window width (§17.16, owner: Engineering lead).

**NFR-AVAIL-805 · The availability measurement, defined** · **P0**
"99.95%" is meaningless until numerator, denominator and exclusions are written down, and
the definition is what a customer's procurement will read. Measured at the load balancer,
per window occurrence:

| Element | Definition |
| --- | --- |
| **Denominator** | Every HTTP request reaching the load balancer for a tenant-facing route (application, API, employee self-service, device-ingest endpoint), minus the exclusions below |
| **Numerator** | Denominator requests answered with a non-5xx status **within the route class's timeout** (§17.10). A request that returns 200 after its timeout is a failure |
| **Excluded — declared maintenance** | Only windows declared ≥ 48 h ahead under NFR-AVAIL-804, and never inside a critical or statutory window |
| **Excluded — client-caused** | 4xx other than 408 and 429; client-aborted connections |
| **Excluded — correct refusals** | 429 rate-limit responses (§13.7) and the residency router's typed refusal of an off-shore inference route (NFR-RES-701) are *correct* behaviour, not downtime |
| **Not in this metric at all** | Wrong-but-successful output. A pay run that completes and produces a rejected statutory artefact is an OBS-1103 filing failure and an §08 correctness defect, never an availability number. The two are never netted against each other |
| **Independent check** | External synthetic probes from ≥ 2 Indian regions (P1), reported as a separate series; where the two series disagree by more than the agreed tolerance, the **lower** is published |

The "not in this metric at all" row is the one that matters commercially. The unit of value
is a correct, portal-accepted filing (§01, §19), and an availability percentage cannot see
correctness. Selling uptime as a proxy for compliance would be a claim this product cannot
support; the compliance SLA is specified separately, as a specification with covered
obligations, exclusions, a claim trigger, evidence and a remedy cap (§19).

**NFR-AVAIL-806 · Burn-rate alerting — and why the critical window cannot use it** · **P0**
Standard multi-window burn-rate alerting divides the budget by time. Applied to a
4.32-minute February budget, a conventional "2% of budget consumed in one hour" page fires
at **5.2 seconds** of downtime — below the resolution of the measurement and far below the
noise floor. The critical window therefore alerts on absolute degradation, and only the
quiet period uses burn-rate arithmetic.

| Period | Budget | Alerting mechanism | Page or ticket |
| --- | --- | --- | --- |
| Critical window (4.32–6.48 min) | Absolute minutes | Sustained elevated error ratio over a short fixed interval, plus any single failed synthetic transaction on the pay-run, approval, bank-file or payslip path | **Page immediately**, any hour |
| Statutory windows (§06.11 due dates) | Absolute minutes | As the critical window, scoped to the filing and artefact-generation paths | **Page immediately** |
| All other days (≈ 132–158 min composed) | Percentage of budget | Multi-window burn-rate: a fast pair and a slow pair | Fast pair pages; slow pair raises a ticket |
| Any period | Error budget exhausted for the window | — | Change freeze extends until the window closes; the next release requires the reliability review below |

The alerting thresholds (`alert.fast_burn_ratio`, `alert.slow_burn_ratio`,
`alert.critical_window_error_ratio`, `alert.critical_window_sustain_seconds`) are named
parameters in §17.16 with the Engineering lead as owner, set from the first three
month-ends of production traffic (§20). This NFR fixes the *mechanism* per period, which is
the part that cannot be tuned later without re-architecting the alert pipeline.

**Budget-exhaustion policy.** When a window's budget is spent: non-emergency deploys stop
until the window closes; the next release requires a written reliability review naming what
consumed the budget and what changed; and if two consecutive critical windows exhaust their
budget, the windowed SLO itself goes back to §20 as evidence that the target was set wrong
rather than as a demand for heroics. **[Hypothesis]** on the two-window trigger — it is a
proposal, not a measured threshold.

<!-- DIAGRAM: nfr-error-budget-composition -->

#### 17.8.2 Worked example — what a service credit is worth, and what it is not

The arithmetic below uses only the EV-027 price anchors, and is arithmetic about the
*shape* of a remedy, not a statement of this product's price (which is §18's). A
60-employee tenant, billed at the lower edge of the mid-market clearing band — ₹80.00
PEPM, Zimyo's entry-tier figure at 50 employees (EV-027) — pays **60 × ₹80.00 =
₹4,800.00** a month. At the band's upper edge, ₹200 PEPM (EV-027, K-09), the same tenant
pays **₹12,000.00**.

| Remedy or harm | Amount | Source |
| --- | --- | --- |
| 1% of one month's invoice, 60 employees at the ₹80.00 anchor | ₹48.00 | EV-027, arithmetic |
| 100% of one month's invoice at the ₹80.00 anchor | ₹4,800.00 | EV-027, arithmetic |
| 100% of one month's invoice at the ₹200 anchor | ₹12,000.00 | EV-027, arithmetic |
| One RPwD s.93 offence — failure to produce records | up to ₹25,000 | EV-079 |
| Each day of continued failure under s.93 | ₹1,000 | EV-079 |
| greytHR's 20-employee annual contract value, as a scale reference | ₹124.75 PEPM = ₹29,940 ACV | EV-027 |

Reading across: a **full month's fees credited at the ₹80.00 anchor covers 19.2% of a
single ₹25,000 offence** (4,800 ÷ 25,000), and is consumed entirely by **4.8 days** of the
₹1,000-per-day continuing-failure charge. At the ₹200 anchor a full month covers 48%. And a
single ₹25,000 offence is **83.5%** of an entire 20-employee annual contract at greytHR's
₹29,940 ACV (25,000 ÷ 29,940) — the whole year's software spend, against one record the
customer could not produce.

Three specification consequences, which is why the arithmetic is here rather than in §18:

1. **Service credits are not the remedy for a compliance failure, and must never be sold
   as one.** The remedy is that the artefact exists, is correct and is producible — which is
   why NFR-DR-1404 makes statutory artefacts exportable in a degraded state, why
   NFR-SEC-402 makes the audit trail exportable as a signed statement, and why the
   filings-on-time SLI (NFR-OBS-1103) is the headline business metric rather than uptime.
2. **The credit cap is a commercial parameter, not an NFR.** `sla.credit_pct` and
   `sla.credit_cap_pct_of_annual` are registered in §17.16 with the Commercial owner and
   routed to §18; this section states only that whatever they are set to, the arithmetic
   above means they cannot be positioned as indemnity.
3. **The uptime number a 20–200 buyer should care about is the one attached to the
   statutory window**, not the monthly average — which is what NFR-AVAIL-802 exists to
   express and what the change-freeze calendar below operationalises.

**NFR-AVAIL-807 · The change-freeze calendar as a generated artefact** · **P0**
A freeze policy that lives in a wiki page is a freeze policy that gets violated at 23:40 on
the 27th. The calendar is generated, published to the deploy pipeline, and enforced by the
pipeline rather than by memory.

| Input | Contribution to the freeze calendar |
| --- | --- |
| Default critical window (`critical_window`, 25th → 2nd) | Frozen |
| Per-tenant critical windows where a tenant overrides the default | The **union** across tenants is frozen — one tenant's overridden window freezes the platform, because deploys are not per-tenant |
| §06.11 consolidated filing calendar: EPF ECR and ESI on the 15th, TDS deposit on the 7th (**[Hypothesis]** — a date carried from the 1962 Rules and not yet read against the Income-tax Rules 2026, §06.13, §20), state PT per state | `statutory_window_days` either side of each date, frozen |
| Declared maintenance (NFR-AVAIL-804) | Permitted only outside every frozen span |
| Sectoral-profile tenants' own declared blackout periods | Merged on request; recorded per tenant |

| State | Event | Guard | Side effect | Who may trigger |
| --- | --- | --- | --- | --- |
| `OPEN` | Window start reached | — | `FROZEN`; pipeline rejects non-emergency deploys | Scheduler |
| `FROZEN` | Emergency deploy requested | A named production incident exists **and** two approvers sign, one of them the Security or Engineering lead | `FROZEN_WITH_EXCEPTION`; the deploy proceeds and is recorded as an audit event with the incident reference | Two named approvers |
| `FROZEN` | Routine deploy requested | — | Rejected by the pipeline; no human override path exists in the tool | — |
| `FROZEN_WITH_EXCEPTION` | Deploy completes | — | Post-hoc review scheduled within the next reliability review | Scheduler |
| `FROZEN` | Window end reached | Error budget for the window not exhausted | `OPEN` | Scheduler |
| `FROZEN` | Window end reached | Error budget exhausted | Stays `FROZEN` until the reliability review closes | Scheduler |

- **Measurable:** 0 non-emergency deploys inside a frozen span (pipeline log); 100% of
  `FROZEN_WITH_EXCEPTION` deploys carrying two named approvers and an incident reference;
  the calendar is regenerated whenever a tenant's `critical_window` changes and the change
  is visible in the pipeline within one scheduling cycle.
- **Negative:** a per-tenant window override must never be interpretable as a per-tenant
  deploy lane. The platform ships one build; the union is the only safe composition, and a
  tenant asking for a window that would freeze the platform permanently is a commercial
  conversation, not a configuration.

#### 17.8.3 The degradation ladder — a state table, not a slogan

NFR-AVAIL-803 states the principle: shed the assistant first, protect the deterministic
payroll and statutory path last. Under real load an on-call needs to know *which* rung is
current, what entering it costs a user, and what the exit condition is — so the ladder is a
state machine with named rungs, and every rung is a supported product state with copy, not
an error page.

| Rung | What still works | What is shed | Entry guard | Exit guard | Who may trigger |
| --- | --- | --- | --- | --- | --- |
| `NORMAL` | Everything | — | — | — | — |
| `SHED_AI` | All deterministic function; assistant returns a queued, explained response | Assistant generation, AI drafting, AI search (§12) | Saturation signal on shared capacity, or the per-tenant AI budget breached (§13.7) | Signal clears for a sustained interval | Autoscaler; on-call; per-tenant AI kill switch (§12) |
| `SHED_ANALYTICS` | Payroll, filing artefacts, self-service, approvals | Dashboards, ad-hoc reports, bulk exports, non-statutory analytics | Saturation persists after `SHED_AI` | Signal clears | Autoscaler; on-call |
| `SHED_NONCRITICAL_WRITES` | Pay-run compute, approvals, artefact generation, payslip reads, filing ledger | Profile edits, document uploads, non-payroll workflows, recruiting | Saturation persists after `SHED_ANALYTICS` | Signal clears | On-call |
| `PROTECT_STATUTORY` | Pay-run compute, approval, lock, bank file, statutory artefact generation and export only | Employee self-service writes; everything above | Saturation persists, or a dependency failure confined to non-statutory services | Signal clears; a reliability review is scheduled regardless | On-call (two-person for entry) |
| `READ_ONLY` | Reads, payslip views, artefact **export** of everything already generated | All writes | Data-layer failure, or an integrity signal (NFR-SEC-405 `BROKEN`) affecting write paths | Root cause addressed | Incident commander |
| `EXPORT_ONLY` | Download of previously generated statutory artefacts and registers | Everything else | Primary region failure before failover completes (§17.14) | Failover complete | Incident commander |

Four rules the ladder must obey, each of which is a test in §17.18:

1. **Monotone descent, explicit ascent.** The system may descend a rung automatically; it
   returns to `NORMAL` only when the signal has cleared for a sustained interval, so a
   flapping dependency cannot oscillate the estate.
2. **No rung drops a committed payroll transaction.** Entering any rung mid-pay-run leaves
   the run resumable from its last committed state; the payroll-month machine's states
   (§08, Part E-1) are the checkpoint boundaries, and a run interrupted at `PROCESSED`
   resumes at `PROCESSED`.
3. **`PROTECT_STATUTORY` and below never change a number.** Degradation removes features;
   it never substitutes an approximate figure, a cached total or a model-generated one. The
   determinism invariant (§08 I4) holds at every rung.
4. **Every rung is visible.** The tenant sees a banner naming the rung and what is affected,
   and the rung is published on the status page (P1). A degraded system that looks healthy
   generates support load and destroys trust faster than an outage that says so.

<!-- DIAGRAM: nfr-degradation-ladder -->

---

### 17.9 Scale targets

Scale is anchored on the government denominator, not an analyst projection. Per §04.2
[Verified]: **96.2 mean contributing employees per establishment** (a right-skewed mean,
used only for aggregate ceilings); the beachhead is 20–200; greytHR's current claim of
"30,000+ companies" (EV-091, captured September 2026) is ≈ 3.9% of 7,66,254 contributing
establishments — a marketing claim over a government count, not a measured share, and
not all of it Indian EPF-contributing establishments (§04.2) — which is the calibration
ceiling on share; the earlier 34,000 capture gave 4.4%, and every share figure carries its
capture date (K-16). So the scale targets below are
*deliberately* modest at P0 and headroom-tested at P2, rather than vanity numbers. They
are **provisional capacity assumptions [Hypothesis]**, stated so that instance classes,
queue depths and database sizing can be chosen now, and replaced by §20 instrumentation
after the first three month-ends.

**NFR-SCALE-901 · Tenant & headcount targets by phase** · **P0/P1/P2** · **[Hypothesis — provisional]**

| Dimension | P0 target | P1 target | P2 headroom (must not architect out) | Verification |
| --- | --- | --- | --- | --- |
| Active tenants | 1,000 | 10,000 | 50,000 | Load test at target tenant count |
| Employees / tenant (typical) | up to 200 | up to 2,000 | up to 30,000 (SBI RFP eligibility floor — a prior implementation at 30,000 employees, §01) | Single-tenant scale test |
| Total employees on platform | ~100,000 | ~1,000,000 | ~10,000,000 | Aggregate load test |
| Concurrent users at month-end peak | 5,000 | 50,000 | 200,000 | Peak-simulation test |
| Devices (attendance ingest) | 10,000 terminals | 100,000 | 500,000 | Ingest-throughput test |

**NFR-SCALE-902 · The month-end concurrency spike is the real scaling problem** · **P0**
Payroll load is not uniform — it concentrates in the 25th–2nd critical window
(NFR-AVAIL-801) and around the §06.11 statutory due dates (§05.9 expects the 15th to be a
load spike). The architecture is sized for the **peak-to-average ratio**, not the
average. **[Hypothesis — provisional]** — assume a peak of **≈ 10×** average daily load
across those windows; which day actually peaks is unmeasured. **Validate** with production
telemetry after the first three month-ends and re-size (§20). A system sized for the mean
will fall over exactly when the customer needs it most.

**NFR-SCALE-903 · Multi-state, effective-dated data at scale** · **P0**
Per the risk register (§20) — uneven state-rule notification under the four Codes — the
data model assumes **per-state, effective-dated rules**, resolved on the work location
(§14), as the norm, not the exception. A single tenant may span every state it has
establishments in; which states levy PT and LWF, and at what slabs, comes from the
gazette-sourced dataset (§06.4, §06.8; §20), never from a competitor's coverage.
**[Reversed]** — earlier drafts sized this from "Frappe HR ships PT across 15+ states and
LWF across 14"; false from source code — Frappe v16's India payroll has no state name,
PT slab or LWF anywhere in the repository (EV-031), and TallyPrime has no state PT slab
table and no LWF engine (EV-032). Multi-state PT and LWF is greenfield in both incumbents
(§21). Scale target: a pay run for a 200-employee tenant spanning 10 states completes
within the batch SLA (§17.10) with correct per-state slabs applied.

**NFR-SCALE-904 · Recruiting cost meters separately from headcount** · **P1**
Per §13.8: recruiting cost does not track headcount — a recruiting-heavy tenant's
résumé-screening inference (15% of headcount hired per month, 50 CVs per hire, 10,000
tokens per CV) costs ~15× a steady-state tenant's (3% per month, 40 CVs, 3,000 tokens) on
identical PEPM (r2/03; the ratio is FX-invariant, the per-CV token sizes are estimates). The scale model meters recruiting load
(requisitions, candidate volume, AI screening calls) on its own axis so a hiring-heavy
tenant does not degrade a hiring-light tenant's service. Verified by per-tenant, per-axis
resource metering (§17.11).

#### 17.9.1 The capacity model — workload classes, not a single "users" number

A tenant count and a headcount do not size a system whose load is driven by one monthly
event. The capacity model is defined over **workload classes**, each with its own arrival
pattern, its own unit of work and its own scaling axis, because they saturate different
resources and three of them peak on different days.

| Workload class | Unit of work | Arrival pattern | Scales with | Saturates |
| --- | --- | --- | --- | --- |
| W1 · Interactive HR/admin | Request | Business hours, IST, spiking 25th–2nd | Tenants × admin seats | App tier, DB reads |
| W2 · Employee self-service | Request | Diffuse, spiking on payslip release and on declaration deadlines | Employees on platform | App tier, CDN, DB reads |
| W3 · Device ingest | Device packet | Continuous, with shift-boundary spikes | Terminals, not employees | Ingest tier, write path (§09, §16) |
| W4 · Pay-run compute | Run | Bursty, concentrated in the critical window | Employees × states × components | CPU, engine, write path |
| W5 · Statutory artefact generation | Return file | Concentrated on the §06.11 due dates | **Registrations × states × filing types**, not employees | CPU, template rendering, validators |
| W6 · Assistant / AI | Call | Diffuse, correlated with W1 and W2 | Employees and recruiting volume (NFR-SCALE-904) | Provider quota, token budget, egress |
| W7 · Batch and scheduled | Job | Nightly and monthly | Tenants × employees | DB, object store |
| W8 · Reporting and export | Query | Ad hoc, spiking at close and at audit time | Data volume | DB reads, object store |

Two structural points follow, and both are already visible elsewhere in this PRD:

- **W5 scales on registrations, not on headcount** — the same mismatch that makes the
  dominant COGS line scale per registration × state × filing type while revenue scales per
  employee (EV-088, §13). A 60-person tenant with establishments in three states and two
  legal entities generates more W5 work than a 150-person single-registration tenant, and
  the capacity model must meter it on that axis or the busiest tenants will be the ones the
  autoscaler cannot see.
- **W3 scales on terminals** — a warehouse tenant with many terminals and few employees is
  an ingest-heavy, compute-light tenant. NFR-SCALE-901's device target (10,000 terminals at
  P0) is therefore an independent axis, not a derivative of the employee count.

**NFR-SCALE-905 · Per-class metering and admission control** · **P0**
Each workload class is metered per tenant and per class, and admission control is applied
per class rather than globally, so a hiring-heavy tenant's W6 load cannot consume the
headroom that W4 needs on the 27th (NFR-SCALE-904 states the recruiting case; this
generalises it).

- **Measurable:** a per-tenant, per-class utilisation series exists from v1 and is queryable
  for any tenant-day; a synthetic test that saturates one class for one tenant shows the
  other classes' latency SLAs (§17.10) unaffected for every other tenant.
- **Measurable:** the degradation ladder (§17.8.3) is driven by per-class saturation
  signals, so `SHED_AI` can fire on W6 pressure without touching W4.

**NFR-SCALE-906 · The sizing arithmetic is a formula with named parameters, not a guess** · **P0** · **[Hypothesis — provisional]**
Capacity is derived, not asserted. For each class the model is
`peak_units_per_second = tenants × units_per_tenant_per_cycle × peak_concentration_factor ÷
cycle_seconds`, and every term other than the tenant and employee counts in NFR-SCALE-901 is
**unmeasured today**. The parameters are registered in §17.16 with the Engineering lead as
owner and are read from the first three month-ends (§20):

| Parameter | What it multiplies | Why it cannot be guessed here |
| --- | --- | --- |
| `capacity.peak_to_average_ratio` | Every class | NFR-SCALE-902 proposes ≈ 10× as a provisional assumption; which day peaks is unmeasured, and the ratio almost certainly differs per class |
| `capacity.payrun_reruns_per_cycle` | W4 | The number of times a tenant re-runs a month before locking is the single largest driver of W4 cost and nobody has measured it |
| `capacity.registrations_per_tenant` | W5 | Drives the dominant cost line (EV-088); the distribution, not the mean, is what sizes the peak |
| `capacity.terminals_per_tenant` | W3 | Independent of headcount |
| `capacity.selfservice_sessions_per_employee_month` | W2 | Payslip-release day is the spike; its height is unknown |
| `capacity.ai_calls_per_employee_month` | W6 | Feeds the PERF-1004 ceiling and the §13 COGS model |
| `capacity.log_events_per_employee_month`, `capacity.log_bytes_per_event` | Log store (§17.6.3) | Sizes the 180-day in-India window (EV-062) |

- **The requirement is the instrumentation, not the number.** What ships at P0 is the meter
  for every parameter above and a documented re-sizing procedure; what is provisional is
  every value. An architecture chosen from a guessed constant and never re-derived is the
  failure mode NFR-SCALE-902 already names, and this NFR is the control on it.
- **Negative:** no autoscaling policy, instance class or queue depth is committed in this
  PRD. Committing one from unmeasured parameters would be exactly the fabricated precision
  the evidence discipline forbids (§02); §20 owns the measurement, and the re-size is a
  scheduled activity after the third month-end, not a reaction to an outage.

<!-- DIAGRAM: month-end-load-profile -->

---

### 17.10 Performance

**NFR-PERF-1001 · Interactive latency** · **P0**

| Interaction | Target (P95) | Target (P99) | Verification |
| --- | --- | --- | --- |
| Page/API interactive response | ≤ 500 ms | ≤ 1.5 s | RUM + synthetic, measured from Indian networks |
| Employee payslip view | ≤ 800 ms on 3G-throttled profile | ≤ 2 s | Throttled synthetic (frontline reality, §09) |
| Audit-history query (1 employee, 1 tax year) | ≤ 3 s | ≤ 5 s | Query benchmark |
| Assistant first-token | ≤ 2 s | ≤ 4 s | AI-path telemetry; independent of payroll SLA |

**NFR-PERF-1002 · Batch / pay-run throughput** · **P0**

| Batch job | Target | Verification |
| --- | --- | --- |
| Pay run, 200 employees, multi-state | ≤ 60 s end-to-end (compute → payslips → register update) | Batch benchmark |
| Pay run, 2,000 employees | ≤ 5 min | Batch benchmark (P1) |
| ECR / ESI / PT / Form 138 file generation (Form 138 Q1–Q3; the Q4 generator is fenced until its format is released, EV-046) | ≤ 30 s per return for a 200-employee tenant | File-gen benchmark |
| Retro / arrears recompute (§08 I3) | Recompute against period-version rules ≤ 2× the cost of a fresh run | Recompute benchmark |

**NFR-PERF-1003 · Front-end weight for low-bandwidth India** · **P0**
The self-service surface must work on entry-level Android over 3G. **Target:** initial
JS/CSS payload ≤ 200 KB gzipped for the employee app; Largest Contentful Paint ≤ 2.5 s on
a Moto-G-class device on 3G (measured in Lighthouse CI, gated in the build). This is a
first-class requirement, not polish, because the deskless worker (§09) is the user.

**NFR-PERF-1004 · AI cost-per-interaction budget** · **P0**
Model choice sets the **inference** line of cost of goods — the smallest of four lines
(inference, WhatsApp messaging, supervised filing, compliance curation); the dominant
line is supervised filing, which scales per registration × state × filing type and is
unsized (EV-088; §13, §22). This NFR governs inference only. Each task class carries a
**per-task cost ceiling**; a call that would exceed it is routed to a cheaper backend or
degraded. The 52.7× cheapest-to-dearest spread on identical workload (EV-089, FX-invariant)
is the lever. **Target:** median inference cost per assistant interaction stays inside the
per-task ceiling set by the router; breaches are logged and alert. The ₹0.15–3.27 PEPM
absolutes are placeholders pending prototype instrumentation (§13, §20) — the *ratio*
discipline is the requirement, the absolute number is not yet evidence. **[Hypothesis]** —
**kill/validate:** instrument real tokens-per-query against a real HR policy corpus (§20);
if measured inference cost per employee-month lands ≥ 5× the placeholder, PERF-1004's
per-task ceilings tighten or a task class drops to a cheaper model tier. The margin
question is not settled by inference in either direction. **[Reversed]** — earlier drafts
treated model choice as "the margin" and inference as the test of whether bundled AI is
affordable (K-02); inference is the smallest cost line.

#### 17.10.1 Route classes, timeouts and backpressure

NFR-AVAIL-805 counts a request as successful only if it answers "within the route class's
timeout". That phrase needs a table, because a single global timeout either kills a
legitimate pay run or hides a hung request behind a minute of spinner. Route classes also
decide what backpressure looks like: which requests may queue, which must fail fast, and
which must never be retried automatically.

| Route class | Examples | Timeout | Retry policy | Backpressure behaviour |
| --- | --- | --- | --- | --- |
| `read-interactive` | Payslip view, employee record, list screens | Interactive budget (NFR-PERF-1001) | Client retry safe — idempotent | Serve stale-but-labelled from cache before failing |
| `write-transactional` | Profile edit, leave apply, declaration submit | Interactive budget | **Retry only with an idempotency key**; the key is mandatory on the API (§16) | Queue briefly, then 429 with a retry hint |
| `write-monetary` | Pay-run approval, lock, arrears approval | Longer than interactive, bounded | **No automatic retry, ever.** The client shows the outcome and the user re-acts | Reject rather than queue: a queued approval whose outcome is unknown is worse than a refusal |
| `batch-compute` | Pay run, recompute, artefact generation | Batch budget (NFR-PERF-1002) | Resumable from the last committed payroll-month state (§08, Part E-1), not retried from the start | Admission control per tenant (NFR-SCALE-905); queue with a visible position |
| `external-ack` | Bank submission, portal upload acknowledgement capture | Bounded, with a mandatory durable pre-write | **Never auto-retried.** A retry risks a duplicate submission (§17.14.2, N-24) | Fail and surface; the duplicate-submission guard is the backstop, not the first line |
| `ingest` | ADMS/WDMS device POSTs | Short | Device re-delivers from its own buffer; ingest is idempotent on the packet key (§09, §16) | Shed to a queue; never drop a packet silently |
| `ai` | Assistant calls (§12) | Own budget, independent of the payroll SLA | Retry within the task's budget, to a backend in the consented set only (NFR-RES-702) | First rung of the degradation ladder (`SHED_AI`) |
| `export` | Register, audit and artefact exports | Long, asynchronous above a size threshold | Idempotent; a repeat export returns the same artefact reference | Queue; never blocks a `write-monetary` route |

**NFR-PERF-1005 · Idempotency and the no-auto-retry rule for money and filings** · **P0**
Every mutating public API call carries an idempotency key, and the two route classes that
touch money or a statutory portal are excluded from automatic retry at every layer — client
library, gateway, service mesh and job runner. This is not a performance nicety. An
automatically retried approval on the EPFO path can produce a second approved return, and
**an approved return can never be cancelled** (EV-036); a retried bank submission can
produce a duplicate disbursal. The system's correctness here depends on a *missing* feature,
so the requirement is written as an absence and tested as one.

- **Measurable:** 0 automatic retries observable on `write-monetary` and `external-ack`
  routes under an induced-timeout test at every layer (the test asserts the count, not the
  behaviour of a single layer); 100% of mutating API calls rejected without an idempotency
  key.
- **Measurable:** a repeated call with the same idempotency key returns the original
  outcome, never a second execution (NT-403).
- **Negative:** no gateway or mesh default retry policy may be inherited by these route
  classes. A framework default is exactly how this defect ships, so the configuration is
  asserted in CI rather than assumed from the platform.

---

### 17.11 Observability

**NFR-OBS-1101 · Cost & usage attribution from v1** · **P0**
Per §13.9: build full **token, cache and cost attribution per tenant, user,
agent and model from v1, while the price of AI is still zero** — retrofitting attribution
after pricing exists is far harder. This is the single most strategically important
observability requirement, because it is what lets AI be run as cost-of-goods (§13) and
what lets recruiting be metered separately (§17.9). The attribution stream links queries
to employees, so it is itself an ICT log held in India (NFR-CERT-602).

| Target | Value | Verification |
| --- | --- | --- |
| Attribution granularity | Every inference call tagged with tenant, user, agent, model, task-class, input/output tokens, cache state, INR cost at booked FX | Query the ledger for any dimension; totals reconcile to the provider invoice ± 2% |
| FX in the ledger | Costs booked at ₹94.43/USD baseline (EV-089, Sep 2026) with FX sensitivity at ₹90/95/100 (§13.12); the ₹83.3 figure is banned (§20.4) | Ledger config audit |
| Per-tenant / per-user rate limits | Enforced (§13.7, P0); one heavy user cannot exceed the tenant's budget; the per-user hard threshold degrades gracefully, and the tenant backstop is the named parameter `tenant_token_budget_pct_of_arpu` (§13.7; value routed to §20) | Abuse test: a runaway user is throttled, not billed through the roof |

**NFR-OBS-1102 · The three pillars** · **P0**

| Pillar | Target | Verification |
| --- | --- | --- |
| Metrics | RED (rate/errors/duration) per service + business metrics (filings-on-time, pay-runs-completed) | Dashboard exists; alerts wired |
| Logs | Structured, correlation-ID-linked, rolling 180-day India-resident retention (EV-062, NFR-CERT-602) | Log-store audit |
| Traces | Distributed tracing across the request path incl. assistant tool-calls | Trace sampling verified |

**NFR-OBS-1103 · The headline business SLI is "filings on time"** · **P0**
Per §01: the filing, not the payslip, is the unit of delivery. So the top-line
operational dashboard is not CPU — it is **% of due filings whose portal-accepted artefact
landed on time, per tenant, per statute**, as §19.1 defines it and computed off the filing
state machine, REJECTED included (§08, Part E-1). Submission is attended — by the
customer or by our operator under written authority — and the employer's liability stays
non-delegable (K-13, EV-030; §22). **Target:** ≥ 99% of due filings completed before the
statutory deadline across the tenant base; any tenant trending toward a miss raises an
alert to CS **before** the deadline, not after.

**NFR-OBS-1104 · Alerting & on-call** · **P0**
SLO-based alerting (error-budget burn-rate), not threshold spam. On-call rota with a
runbook per alert. Critical-window and statutory-window alerts (§17.8) page immediately.
**Target:** ≥ 95% of pages are actionable (post-incident review tracks false-page rate);
mean time to acknowledge ≤ 5 min for P0 alerts.

**NFR-OBS-1105 · AI-attack detection feeds the CERT-In clock** · **P0**
Because attacks on AI/ML systems are a reportable class (Annexure I item xx, EV-062;
§17.6), the observability stack has explicit detections for the AI/ML incident class
(Part E-8): prompt injection, tool abuse and anomalous assistant tool-call patterns,
training- or retrieval-data poisoning, model or data extraction, and unauthorised access
to the inference pipeline or vector store — each wired to the incident runbook.
**Target:** a simulated event in each sub-class is detected and raised to the incident
channel within the window that keeps the six-hour CERT-In report achievable.

#### 17.11.1 The operational SLI catalogue

§19 owns the product and business metrics, each as numerator · denominator · source ·
target · date; this catalogue is the **reliability** set that on-call and the error-budget
policy read, defined to the same discipline so the two cannot drift apart. The single
overlap — filings on time — is **defined in §19 and consumed here**, never redefined.

| SLI | Numerator | Denominator | Source | Window | Read by |
| --- | --- | --- | --- | --- | --- |
| Windowed availability | Eligible requests answered non-5xx within the route-class timeout | Eligible requests (NFR-AVAIL-805 exclusions applied) | Load-balancer logs | Per critical-window occurrence; per calendar month otherwise | Error-budget policy; status page (P1) |
| Synthetic journey success | Successful synthetic runs of the pay-run, approval, bank-file and payslip journeys | Attempted synthetic runs | External probes, ≥ 2 Indian regions (P1) | 5-minute buckets | Critical-window paging (NFR-AVAIL-806) |
| Pay-run completion | Runs reaching a terminal state without operator intervention | Runs started | Payroll-month state machine (§08, Part E-1) | Per window | On-call; CS |
| Statutory artefact generation success | Artefacts generated and passing their validator | Artefacts requested | Generator and validator telemetry (§08) | Per due date | On-call; CS pre-deadline alerting |
| Filing outcome mix | Filings by terminal state, REJECTED included | Due filings | Filing state machine (§08, Part E-1) | Per statute, per month | §19 (definition), CS, on-call |
| Ingest completeness | Device packets ingested and reconciled | Packets the device reports as sent | Device-ingest log; device buffers (§09, §16) | Daily per device | On-call; tenant-facing device health |
| Detection coverage | Detection rules with a passing synthetic event in the period | Rules in the catalogue (D-1…D-8, AI/ML sub-classes) | Detection test harness | Per release | Security lead |
| Incident time-to-report | `submitted_at` − `noticed_at` | Reportable incidents | Incident records (NFR-CERT-605) | Per incident; reviewed per quarter | Security lead; DR-F drill |
| Chain integrity | Tenant-days verifying clean | Tenant-days verified | NFR-SEC-405 verifier receipts | Nightly | Security lead |
| Log residency conformance | Log sinks in an India region | Configured log sinks | CI enumeration (NFR-CERT-606) | Per build | Engineering lead |
| Profile-to-config drift | Tenants whose live config matches their `sector_profile` bundle | Tenants with a non-null profile | Nightly drift check (NFR-RES-704) | Nightly | Engineering lead; attestation generator |
| Erasure statement latency | Erasure requests answered with a complete statement inside the published window | Erasure requests | Erasure engine (NFR-DPDP-506) | Per request | Privacy owner |
| Inference cost per interaction | INR cost at booked FX | Assistant interactions | Attribution ledger (NFR-OBS-1101) | Daily, per task class | AI owner; Finance |
| Page actionability | Pages judged actionable in review | Pages raised | Post-incident review (NFR-OBS-1104) | Monthly | On-call lead |

Three rules keep the catalogue honest and are asserted in review:

- **No SLI is computed from another SLI's output.** Each names a primary source. A metric
  derived from a metric acquires the other's exclusions silently, which is how an
  availability number ends up quietly absorbing a correctness failure (N-27).
- **Every SLI has exactly one owner** and appears on exactly one dashboard as its home.
  Where a second audience needs it, the dashboard embeds it by reference.
- **An SLI without a target is a diagnostic, not an objective**, and is labelled as such.
  Several rows above are deliberately diagnostics at P0: the targets arrive from §20
  telemetry (§17.16), and inventing them now would produce error-budget policy built on a
  guess.

**NFR-OBS-1106 · Tenant-visible operational state** · **P0 (in-product) / P1 (status page)**
A tenant can see, for their own tenancy: the current degradation rung (§17.8.3), the state
of their in-flight pay run and filings from the §08 machines, their device health, and
whether an incident affects them. This is a reliability requirement rather than a UX
preference: a practitioner who cannot tell whether the platform is degraded will re-run a
pay run, re-submit a file, or call support during the exact window the system is trying to
protect (§17.8.1). At P1 the same information is published externally on a status page with
an RCA on every SLO breach.

- **Measurable:** during NT-408's load test, the rung shown to a tenant matches the rung the
  platform is in, within one refresh interval; 0 cases of a degraded platform presenting as
  healthy.

<!-- DIAGRAM: observability-and-cost-ledger -->

---

### 17.12 Accessibility (WCAG)

**NFR-A11Y-1201 · WCAG 2.2 Level AA** · **P0 (employee self-service) / P1 (admin)**
The employee self-service surface targets **WCAG 2.2 AA**, adopted as the product standard
on its own merits. The India-specific reason it matters is defensibility, not a mandate:
RPwD s.3(3) is an actor-neutral non-discrimination duty that puts the onus on the
employer to show a proportionate means of achieving a legitimate aim (EV-075), so a
self-service surface a disabled employee cannot use to read a payslip or apply for leave
is an exposure for the customer, not only a UX gap; and every establishment needs an
Equal Opportunity Policy under s.21 (EV-077). (Reading RPwD s.20 as a private-sector duty
is wrong: it binds Government establishments only — K-11.) Whether any RPwD
accessibility standard binds a private SaaS directly, and whether GIGW (Guidelines for
Indian Government Websites) is a gate for public-sector-adjacent buyers, is **not
verified** — **[Hypothesis]**, routed to §20 and §23. WCAG conformance is
never represented to customers as a legal requirement. **[Reversed]** — earlier drafts
marked "the RPwD Act 2016 obliges accessibility" and GIGW as **[Verified]** with no
primary source in the evidence register.

| Target | Value | Verification |
| --- | --- | --- |
| Conformance | WCAG 2.2 AA on employee self-service (P0), admin console (P1) | Automated axe-core scan in CI (0 criticals) + manual audit per release |
| Colour contrast | ≥ 4.5:1 normal text, ≥ 3:1 large text/UI | Automated contrast check |
| Keyboard | 100% of flows operable without a mouse | Manual keyboard walkthrough |
| Screen reader | Payslip, leave, and filing-status flows pass with NVDA + TalkBack (Android) | Assistive-tech test matrix |
| Target size | ≥ 24×24 CSS px (WCAG 2.2 new criterion) — matters for shared low-end touch devices (§09) | Automated + manual |

**NFR-A11Y-1202 · Low-literacy & first-time-smartphone accessibility** · **P0**
Beyond WCAG, the frontline reality (§09) demands **icon-plus-vernacular-label** patterns,
minimal text entry, and voice/IVR fallbacks where feasible. Accessibility here overlaps
localization (§17.13): a payslip a worker cannot read in their language is inaccessible
regardless of contrast ratio. **Measurable:** core employee tasks (view payslip, apply
leave, submit a declaration) completable with ≤ 1 free-text field.

---

### 17.13 Localization & vernacular

**NFR-L10N-1301 · Multilingual employee surface** · **P0 (frame) / P1 (breadth)**
India's linguistic reality makes vernacular a functional requirement for the deskless
segment, not a translation afterthought. The system is built **i18n-ready from v1**
(externalised strings, locale-aware formatting) even though the *breadth* of languages
phases in.

| Target | Value | Verification |
| --- | --- | --- |
| Architecture | All UI strings externalised; no hard-coded English in the employee surface; ICU message format for plurals/gender | Pseudo-localization build passes (0 hard-coded strings) |
| P0 languages | English + Hindi on the employee self-service surface | Both ship at launch |
| P1 languages | Add the highest-headcount vernaculars in the customer base (e.g., Tamil, Telugu, Marathi, Bengali, Kannada, Gujarati) — driven by actual tenant geography, not a guess | Language coverage report vs. tenant-employee language distribution |
| Numerals & currency | Indian numbering (lakh/crore grouping, ₹ symbol, `1,00,000` grouping) everywhere a figure is shown to an Indian user | Formatting test |
| Dates | IST, `DD-MM-YYYY` default, tax-year aware (Apr–Mar; "Tax Year" and the older "Financial Year" labels both accepted in search, imports and help, and the six-digit tax-year field rendered correctly, e.g. 202627 — EV-050) | Formatting test |

> **Vernacular is where AI earns its keep as cost-of-goods (§12.6, §13), [Hypothesis].** LLM
> translation of *explanatory* text (not statutory figures — those are deterministic and
> pre-translated) is a natural fit: the assistant can explain a payslip in the worker's
> language cheaply. **Kill/validate:** measure translation quality for payroll terms of art
> in each target language before relying on model translation for anything an employee acts
> on; statutory labels ship as human-reviewed, locked translations, never model-generated.

**NFR-L10N-1302 · Vernacular does not touch the statutory layer** · **P0**
A hard invariant, consistent with rules-first, LLM-last (§12.1, §13.4): **statutory field
names, form labels, and filed-return content are in the language the statute/portal
requires**, regardless of the employee's UI language. Localization is a *presentation*
concern; it never alters what is filed. Verified: a Tamil-UI tenant's ECR / Form 138
(ex-24Q) output is byte-identical to an English-UI tenant's for the same data.

---

### 17.14 Disaster recovery & business continuity

**NFR-DR-1401 · RPO / RTO targets by phase** · **P0/P1/P2** · **[Hypothesis — provisional]**
For a system whose output is money and statutory filings, RPO and RTO are not optional,
so they are set now as **provisional assumptions** and replaced by §20 instrumentation
(measured restore-drill times, and the cost of data loss inside the 25th–2nd critical
window) rather than left blank (Part E-13).

| Phase / segment | RPO (max data loss) | RTO (max downtime) | Verification |
| --- | --- | --- | --- |
| P0 — beachhead | ≤ 15 min | ≤ 4 h | Restore drill, quarterly |
| P1 — expansion | ≤ 5 min | ≤ 1 h | Restore drill + failover test |
| P2 — regulated | ≤ 1 min (sync replica) | ≤ 30 min | Contractual; audited failover |

An RTO of 4 h consumes the whole critical-window error budget of NFR-AVAIL-801 many times
over; the P0 figure is a recovery ceiling for a disaster, not the availability plan, and
§20 instrumentation decides whether the critical window needs a tighter P0 RTO.

**NFR-DR-1402 · Backups** · **P0**

| Target | Value | Verification |
| --- | --- | --- |
| Frequency | Continuous WAL archiving + daily full; all in India region (DR in a second India region: Mumbai primary, Hyderabad DR) | Backup-catalog audit |
| Encryption | Distinct keys from primary (§17.4) | Restore drill confirms |
| Retention | Point-in-time restore for ≥ 35 days; long-term monthly snapshots aligned to the NFR-DPDP-506 retention classes; an erased subject must not be resurrected by a restore — the §14 erasure mechanism has to survive one (a shredded subject key stays shredded; a tombstone is re-applied on restore) | Restore-window test + restore-after-erasure test |
| **Restore is tested, not assumed** | ≥ 1 real restore drill per quarter, timed against RTO/RPO; a backup never restored is not a backup | Drill report with measured RTO/RPO |

**NFR-DR-1403 · DR stays inside India** · **P0**
The DR region is a *second Indian region*, never a foreign one. CERT-In log residency
(EV-062) applies to every tenant's logs, and the sectoral overlays — SEBI (EV-085), and RBI
where the arrangement is material (EV-087) — apply to backups and DR copies exactly as to
primary data; IRDAI's localisation reaches only policy records, which this product does not
hold (EV-086). A DR design that fails over to a non-India region is therefore non-compliant
for every sectoral-profile tenant and for every tenant's logs, and breaks the India-default
attestation for the rest. Verified in the failover drill: the failed-over stack serves
entirely from India.

**NFR-DR-1404 · Statutory-window continuity** · **P0**
Because a missed filing is an existential failure (§17.8), the BCP explicitly covers the
"platform down during a statutory window" scenario (the §06.11 due dates). Every statutory
surface is an attended portal and the employer's liability is non-delegable (K-13, EV-030,
EV-035–038; §22), so the deliverable is always a portal-accepted artefact plus attended,
assisted filing: the ECR, ESI challan data, PT return and Form 138 (ex-24Q) Q1–Q3 files are
exportable at all times, and in a degraded state the customer, the customer's CA or our
operator under written authority to act completes the attended filing from the export, so
a platform outage never becomes a customer's statutory default. (Operator-assisted
submission launches only once the attended-filing legality questions are cleared — Part
D-17, §22, §23; the export path does not depend on them.) **Target:** a tenant's due statutory artefacts are exportable
for attended submission even in a degraded state; drilled once before launch.

**NFR-DR-1405 · One incident runbook, every clock that applies** · **P0**
The single incident runbook drives, in parallel: (a) the CERT-In six-hour report (EV-062,
§17.6) — the clock that is live today; (b) the DPDP r.7 intimations to affected
employees and the Board, pre-staged and armed at commencement on or about 13 May 2027
(EV-063, NFR-DPDP-505); (c) technical containment/recovery; and (d) customer
communication. **Target:** a tabletop exercise, run before the first paying customer and
repeated ≥ annually, completes every armed track within its clock; the DPDP track is
rehearsed from the first exercise so commencement is a switch, not a project.

#### 17.14.1 RPO is per data class — the irreversibility frontier

A single global RPO is the wrong shape for this product. Most of what the platform holds is
**recomputable**: the engine is a pure function of inputs, rule-set version and evaluation
context (§08, Part E-3), so a pay run lost to a 15-minute RPO can be reproduced
byte-identically from the inputs that survived. What cannot be reproduced is the set of
facts that came into existence **outside** our database and cannot be re-created by replay
or by asking again. That set is the irreversibility frontier, and it needs RPO = 0
regardless of what NFR-DR-1401 says about the platform as a whole.

**NFR-DR-1406 · RPO classes** · **P0**

| Class | Examples | RPO | Why |
| --- | --- | --- | --- |
| **A — Externally acknowledged** | EPFO TRRN and challan references, the approved-return receipt, the ESIC upload acknowledgement, the TDS upload acknowledgement, a bank file's submission reference and UTRs | **0** — durable, cross-AZ acknowledged write *before* the UI confirms | **An approved ECR return can never be cancelled** (EV-036), and a Revised return is impossible once payment is initiated (EV-037). If the record of an approval is lost, the system's state and the portal's state diverge with no automated path back, and the per-establishment filing ledger (Part E-10) cannot be reconciled without a human reading the portal |
| **B — Consent and authority artefacts** | Written-consent artefacts for the SPDI sensitive set (EV-060, r.5(1)), biometric-enrolment consent, §22 written authority to act, AI disclosure records (Part E-7) | **0** | **Consent cannot be backfilled** (Part E-12). An erasable entity class (Part E-2) is not a losable one: if the artefact is gone, the lawful basis for processing already performed cannot be reconstructed, only re-requested prospectively |
| **C — Irreversibly communicated** | Payslips delivered, statutory notices sent, WhatsApp and email dispatch records | **0 for the dispatch record**; the content is class D | A message cannot be unsent. The dispatch record is what lets the system avoid sending it twice and answer "what did this employee receive?" |
| **D — Recomputable from surviving inputs** | Pay-run outputs, payslip renders, register views, generated ECR/PT/Form 138 files before submission, derived balances | Platform RPO (NFR-DR-1401) | Deterministic replay reproduces them (§08 I4); the cost of loss is compute time, not correctness |
| **E — Re-capturable at source** | Device punches still held on the terminal, un-submitted drafts, in-flight uploads | Platform RPO | The source still has them; the ingest path re-delivers (§09, §16) |
| **F — Erasable and not restored** | Subject data already crypto-shredded or tombstoned under the §14 mechanism | Must **not** be restored | A restore that resurrects an erased subject is a compliance failure, not a recovery (NFR-DR-1402) |

The class A and B commitment is an engineering constraint with teeth: the write path for
those records commits synchronously to a second availability zone and the acknowledgement
to the user is emitted only after that commit returns. Everything else may use the
platform's asynchronous replication budget.

- **Measurable:** a kill-the-primary test executed while a class A write is in flight shows
  either (a) the record present after failover and the user having been told it succeeded,
  or (b) the record absent and the user having been told it failed — never a confirmed
  success with an absent record. The test asserts the absence of the third outcome
  explicitly (NT-401).
- **Measurable:** a restore-after-erasure test confirms class F stays erased: a shredded
  subject key is not reintroduced by the restore, and a tombstone is re-applied
  (NFR-DR-1402).
- **Negative:** no class A record is ever written optimistically "and reconciled later".
  The reconciliation path in §17.14.2 exists for the case where the platform failed, not as
  a design shortcut.

#### 17.14.2 Worked example — fifteen minutes lost on the 27th, and how it is reconciled

The P0 RPO is ≤ 15 minutes (NFR-DR-1401, **[Hypothesis — provisional]**). Assume the worst
placement: a primary-region failure at 16:40 IST on the 27th — inside the critical window,
on the day a 200-employee tenant locks the run and produces the bank file. The last
replicated state is 16:25. What is actually lost, class by class, and what the operator
does about it:

| What happened between 16:25 and 16:40 | Class | State after recovery | Reconciliation action |
| --- | --- | --- | --- |
| Pay run recomputed after a late attendance correction | D | Absent | Re-run. The engine is pure and the rule-set version is pinned to the period, so the output is byte-identical (§08 I4). Elapsed cost is the PERF-1002 budget: ≤ 60 s for 200 employees |
| Approver clicked "approve run" | D plus a workflow fact | Absent | Re-approve. The maker≠checker record is re-created; the audit chain shows both the lost attempt (absent) and the new approval — no silent gap, because the chain for that tenant-day is verified before the export (NFR-SEC-405) |
| Bank file generated | D | Absent | Regenerate; byte-identical for the same inputs (§16) |
| **Bank file submitted to the bank portal; submission reference returned** | **A** | **Present** — the class A write committed cross-AZ before the UI confirmed | Nothing. The system knows the file went, and the duplicate-submission guard in §16 refuses a second submission for the same run |
| Punches pushed by two terminals | E | Absent | The ADMS ingest re-delivers from the terminals' own buffers (§09); the ingest is idempotent on the device packet key |
| An employee's biometric-enrolment **written consent** captured | **B** | **Present** — class B commits synchronously | Nothing. Had it been lost, the enrolment would have to be re-consented before any further processing, and the template would be unusable in the interim (EV-060, r.5(1)) |
| Payslips dispatched to 40 employees | C | Dispatch records **present** | Nothing. The dispatch record prevents a duplicate send on re-run |
| Assistant answered 11 questions | D (logs) | May be absent | Nothing. The LLM log is an ICT log with a retention floor (NFR-CERT-606), not a source of truth |

**The reconciliation ledger.** Any restore or failover that loses committed work opens a
**divergence ledger** entry per affected tenant, listing every class-D and class-E item the
system believes it lost, and the operator works it to zero before the tenant's window
closes. The ledger is itself an audit-chained artefact, so an inspection can see that a
recovery happened and what it touched. This is the mechanism that keeps a platform incident
from becoming a customer's statutory default: the filing ledger (Part E-10) refuses silent
abandonment, and the divergence ledger is how a recovery discharges it rather than
bypassing it.

**Negative case that must be designed out.** Had the bank submission been a class D write,
recovery would have produced a system that believes no file was sent, a bank that has one,
and a re-run that sends a second — a duplicate salary disbursal for 200 employees. There is
no post-hoc reconciliation that makes that safe, which is the whole argument for the class
A commitment. The same argument holds with more force on the EPFO path, where the approved
return **can never be cancelled** (EV-036) and a Revised return is barred once payment is
initiated (EV-037): a duplicate approval is not correctable by the product, only by the
portal's own rules and a human.

#### 17.14.3 The drill programme — types, cadence, pass criteria

"Restore is tested, not assumed" (NFR-DR-1402) is a slogan until the drill types are
enumerated with pass criteria, because the drill most organisations run — restore a
database to a staging box — exercises none of the properties this product actually depends
on.

**NFR-DR-1407 · Drill catalogue** · **P0**

| Drill | Cadence | Scope | Pass criteria | Failure means |
| --- | --- | --- | --- | --- |
| **DR-A · Point-in-time restore** | Quarterly | Primary Postgres to a nominated timestamp | Restore completes within RTO; data at the timestamp matches a pre-computed checksum set; measured RPO ≤ target | The RPO/RTO figures in NFR-DR-1401 are wrong and go back to §20 |
| **DR-B · Region failover** | Semi-annually | Full stack to the Hyderabad DR region | The failed-over stack serves **entirely from India** (NFR-DR-1403); class A and B records present; no log sink re-points abroad (NFR-CERT-606) | A residency finding, not only an availability one |
| **DR-C · Restore after erasure** | Quarterly, paired with DR-A | A subject erased under the §14 mechanism before the restore point | The subject stays erased: shredded key not reintroduced, tombstone re-applied | A compliance failure — a restore that resurrects an erased subject |
| **DR-D · Class A durability** | Quarterly | Kill the primary during an in-flight class A write | Confirmed-success-with-absent-record count = 0 | The irreversibility frontier is not actually protected |
| **DR-E · Statutory-window continuity** | Before launch, then annually and before each Q4 season | Platform degraded to `EXPORT_ONLY` during a simulated §06.11 due date | Every due artefact for every tenant is exportable for attended submission (NFR-DR-1404) | A missed filing is possible from a platform outage — the existential failure §17.8 names |
| **DR-F · Incident tabletop** | Before the first paying customer, then annually | The §17.6.1 machine end to end, including a `NOT_REPORTABLE_RECORDED` decision and, from commencement, the armed Clock B | `noticed_at` → `submitted_at` inside six hours **with the two-hour reserve intact**; every armed track completes (NFR-DR-1405) | The six-hour pipeline is procedural, not architectural, and needs rework |
| **DR-G · Key-loss rehearsal** | Annually | KMS key unavailability for the Aadhaar token store and one tenant's data key | Documented behaviour: the system fails closed (no plaintext path), and the recovery procedure is exercised without ever exporting key material | A silent plaintext fallback exists somewhere — a P0 defect |
| **DR-H · Backup-key separation** | Annually | Attempt a restore using only primary-system credentials | Restore **fails** — backup keys are genuinely distinct (NFR-DR-1402) | The backup encryption is decorative |

Every drill writes a dated report with the **measured** figure, not a pass/fail tick, and
the measured figures are what replace NFR-DR-1401's provisional RPO/RTO numbers in §20
(open question 7, §17.20). A drill that reports "passed" without a number has not been run.

<!-- DIAGRAM: nfr-rpo-classes -->

<!-- DIAGRAM: dr-topology-india-dual-region -->

---

### 17.15 Compliance-certification roadmap (the seasoning clock)

Not a runtime NFR, but the process wrapper that makes the above auditable, and an
evidence-register finding (§01, §05.2) too consequential to leave implicit.

| Certification | When to start | Why / gate | Source |
| --- | --- | --- | --- |
| **ISO 27001:2022** | **Month 0** | 3–6 mo to acquire + 12 mo seasoning before it counts in an RFP; must be in hand by ~month 6 to be useful at month 18. "The cheapest year you will ever buy" (§01). It is also the standard SPDI r.8 names for reasonable security practices (EV-060), so it earns its keep with the first tenant; SEBI's CSCRF mandates it only for MIIs and Qualified REs (EV-085); under IRDAI's 2023 guidelines, ISO 27001 with the supplied services inside the statement of applicability lets an insurer *except* the vendor from periodic audits — discretionary (s.2.14, r5/01; NFR-RES-704) | Indian Bank RFP, held-≥1-yr-prior clause **[Verified]** (r2/06); EV-060; EV-085 |
| **SOC 2 Type II** | Month 6–9 | Type II needs an observation period; private-sector enterprise expects it. Aparajitha/Simpliance reports SOC 2 Type 2 and ISO 27001 certification for its software suite (vendor's own site, read in research round 2, r2/07 — documentation read, not executed; re-capture with a dated snapshot before citing externally) | **[Hypothesis]** — validate which of SOC 2 / ISO the target accounts actually demand |
| **CERT-In-empanelled auditor** | Before first customer | Empanelment is held by audit firms, not by software vendors: we engage an empanelled auditor for security audits (SBI's RFP demands quarterly certificates from one). The CERT-In point of contact for the six-hour path (NFR-CERT-601) is a separate, internal designation | **[Verified]** (r2/06; CERT-In Directions direction (iii)) |
| **VAPT (annual + on major release)** | Before first customer, then continuous | Third-party penetration test; regulated buyers ask for recent VAPT reports — SEBI's CSCRF hosted-services specification requires VAPT report summaries to be available to the RE and SEBI on demand (r5/01), and Indian Bank ties a payment tranche to VAPT clearance (r2/06) | **[Hypothesis]** on cadence — confirm per RFP |

#### 17.15.1 The seasoning clock, in dates

The seasoning finding is usually stated as a principle and then not acted on, because a
principle has no deadline. Stated in dates, from the figures already in evidence —
acquisition roughly 3–6 months, seasoning twelve months, and Indian Bank's criterion 14
requiring a qualifying certification to have been **held for at least one year prior to RFP
publication** (r2/06, **[Verified]**) — it becomes a scheduling decision with a cost per
month of delay.

| Engagement starts | Certificate in hand (3 mo) | Certificate in hand (6 mo) | Qualifies for an RFP published on or after (best case) | Qualifies for an RFP published on or after (worst case) |
| --- | --- | --- | --- | --- |
| September 2026 (today, month 0) | December 2026 | March 2027 | December 2027 | March 2028 |
| December 2026 (3 months late) | March 2027 | June 2027 | March 2028 | June 2028 |
| March 2027 (6 months late) | June 2027 | September 2027 | June 2028 | September 2028 |
| September 2027 (12 months late) | December 2027 | March 2028 | December 2028 | March 2029 |

The slope is the point: **every month of delay in starting moves the first bidable RFP out
by exactly one month**, and no amount of money spent later compresses it, because the
twelve-month clause measures holding time, not effort. An RFP published before the
qualifying date cannot be bid on that criterion at any price — which is the precise sense in
which this is "the cheapest year the company will ever buy" (§01, §05.2).

Three riders that keep the table honest. First, the criterion is **one bank's RFP** read in
research round 2 — it is evidence that the clause exists and is priced into a real
procurement, not evidence that every regulated buyer uses it; the §17.20 open question on
which certifications target accounts actually demand is what generalises it. Second,
enterprise is the *vision* tier and is deliberately deferred behind a documentary gate
(§05); starting the engagement at month zero is a cheap option on that tier, not a decision
to pursue it now. Third, the same certificate earns its keep with the first 20-employee
tenant, because ISO 27001 is the standard SPDI r.8 names for reasonable security practices
(EV-060) — whether holding it discharges any particular party's s.43A duty is a counsel
question (§23.4), and that claim is never made in a customer document.

#### 17.15.2 Building to the control set from month zero — the mapping discipline

"Written to the ISO 27001 Annex A control set from month zero" is only meaningful if there
is an artefact that shows which NFR implements which control theme and where its evidence
lives. The clause-by-clause mapping is produced during the engagement, against the
standard's own text — **this PRD does not reproduce Annex A, enumerate its controls or
assert their numbering**, because a control list transcribed from a secondary source is
precisely the fabricated precision the evidence discipline forbids (§02). What this PRD
fixes is the shape of the mapping and the evidence each theme can already point at, so the
engagement starts from a populated matrix rather than a blank one.

| Annex A theme | NFRs that carry it | Evidence artefact that already exists by design |
| --- | --- | --- |
| Organisational | NFR-SEC-202 (roles, separation of duties), NFR-SEC-403 (access recertification), NFR-RES-704/705 (sector profiles, attestations), NFR-DPDP-506 (retention schedule), §17.16 (parameter ownership) | Access-review reports; generated attestations and manifests; the retention schedule as machine-readable configuration; the parameter register with named owners |
| People | NFR-SEC-101/103 (authentication, session), NFR-SEC-406 (actor attribution), §22 operator authority | Access reviews; the audit trail's `actor_type`, `on_behalf_of` and `authority_ref` fields; the §22 "what we did on your behalf" log |
| Physical | Provider attestations for the India regions; §17.7's residency pinning | Provider configuration audit; the residency attestation; the open MeitY-empanelment confirmation (§17.20 item 8) |
| Technological | NFR-SEC-201 (isolation), SEC-301/302/306 (crypto and keys), SEC-401/404/405 (audit, detection, verification), SEC-305 (secure SDLC), CERT-601/602/603/606 (incident, logs, time), RES-701/702/703 (residency, backends, egress), DR-1401–1407 (continuity) | CI gate outputs; KMS policy audit; chain-verification receipts; the log register; drill reports with measured figures |

The discipline this produces is worth more than the certificate. An auditor asking "show me
that privileged access is reviewed" receives a generated report rather than a screenshot; an
auditor asking "show me your incident process meets your stated timeline" receives DR-F's
measured `noticed_at` → `submitted_at` figures. Every row of the §17.19 acceptance summary
is, by construction, an audit exhibit.

**NFR-CERT-607 · The certification evidence pipeline** · **P0 (evidence generation) / P1 (audit readiness)**
Evidence is generated continuously, not assembled in the fortnight before an audit.

| State | Event | Guard | Side effect | Who may trigger |
| --- | --- | --- | --- | --- |
| `BUILDING` | An NFR's verification method runs (CI, REL, PER or DRILL per §17.18) | — | The evidence artefact is filed with its date, the config revision and the measured figure | Pipeline or drill owner |
| `BUILDING` | An artefact goes stale past its cadence | — | The control is marked `LAPSED`; a lapse is visible on the readiness dashboard, not buried | Scheduler |
| `LAPSED` | The verification runs again | — | Back to `BUILDING`; the lapse stays in the history | Pipeline or drill owner |
| `BUILDING` | Certification audit scheduled | Every control theme has current evidence | `AUDIT_READY` | Security lead |
| `AUDIT_READY` | Audit finding raised | — | Tracked to closure with an owner and a date; a finding never closes on assertion alone — it closes when its verification method runs clean | Security lead |
| `AUDIT_READY` | Certificate issued | — | `CERTIFIED`, with the issue date recorded; **the seasoning clock starts here, not at engagement start** | Security lead |
| `CERTIFIED` | A customer or RFP asks what the certificate covers | — | Only the scope on the certificate is stated; the deemed-compliance question under SPDI r.8(4) is not asserted (§23.4, FR-LEG-012) | Security lead + the §23.1 clearance rule |

- **Measurable:** the readiness dashboard shows, per control theme, the count of current,
  lapsed and missing evidence artefacts; the target before an audit is 0 lapsed and 0
  missing.
- **Negative:** no evidence artefact is produced by hand for an audit. An artefact that
  exists only because an auditor asked is evidence of the process not running.

<!-- DIAGRAM: certification-seasoning-timeline -->

---

### 17.16 The NFR configuration register — named parameters, owners and unset behaviour

Several targets in this section depend on a number nobody has measured yet. The discipline
this PRD applies everywhere (§02) is that such a number is **never invented**: it becomes a
named parameter with an owner, a source that will set it, and — the part usually left out —
a **defined behaviour while it is unset**. A parameter whose absence is silently treated as
zero, or as permission, is worse than a guessed constant, because nothing in review will
catch it.

**The parameter contract.** Every row below obeys four rules. (1) The name is the key in
configuration; code never reads a literal. (2) The owner is a named role, not a team. (3)
The "set from" column names the §20 activity or the counsel question (§23) that produces the
value. (4) The unset behaviour is **fail-safe in the direction that protects the customer**:
retention parameters hold rather than erase, detection parameters observe rather than page,
capacity parameters block a capacity commitment rather than assume one, and commercial
parameters block the commitment rather than default to a number.

| Parameter | Controls | Owner | Set from | Behaviour while unset |
| --- | --- | --- | --- | --- |
| `critical_window` (`{start_day, end_day}`) | The windowed SLO span (NFR-AVAIL-801) and the freeze calendar (NFR-AVAIL-807) | Engineering lead | §20: per-tenant pay-run timestamps across the first three month-ends | Ships with the proposed 25th → 2nd span, flagged **[Hypothesis]** in the SLO document |
| `statutory_window_days` | Width of the freeze and internal-objective span around each §06.11 due date (NFR-AVAIL-802) | Engineering lead | §20 telemetry on filing-day load | Freeze applies to the due date itself only; the composed budget arithmetic (§17.8.1) is reported as indicative |
| `alert.critical_window_error_ratio`, `alert.critical_window_sustain_seconds` | Absolute-degradation paging inside the critical window (NFR-AVAIL-806) | Engineering lead | First three month-ends | Alerts run in shadow: raised to a review queue, never paged, and the gap is a named launch risk |
| `alert.fast_burn_ratio`, `alert.slow_burn_ratio` | Burn-rate paging outside the windows | Engineering lead | First three month-ends | Shadow mode, as above |
| `detect.restricted_read_zscore`, `detect.restricted_read_window` | D-1, Restricted-class read anomaly (NFR-SEC-404) | Security lead | Production traffic baseline | Shadow mode; the detection still writes findings, so the baseline can be built from them |
| `detect.export_rows`, `detect.export_offhours_window` | D-4, salary-export anomaly | Security lead | Production traffic baseline | Shadow mode |
| `detect.geo_velocity_kmh` | D-5, impossible travel | Security lead | Production traffic baseline | Shadow mode |
| `capacity.peak_to_average_ratio` | Autoscale envelope (NFR-SCALE-902, 906) | Engineering lead | §20 telemetry, first three month-ends | The ≈ 10× provisional assumption is used and labelled **[Hypothesis — provisional]**; no capacity commitment is made to a customer on it |
| `capacity.payrun_reruns_per_cycle` | W4 sizing | Engineering lead | §20 telemetry | No W4 capacity commitment |
| `capacity.registrations_per_tenant` | W5 sizing and the §13 COGS model | Engineering lead + Finance | §20 telemetry; §22 operations data | No W5 capacity commitment; the registration cap in pricing stays open (§18) |
| `capacity.terminals_per_tenant` | W3 sizing | Engineering lead | §09 hardware spike; §20 telemetry | No W3 capacity commitment |
| `capacity.selfservice_sessions_per_employee_month` | W2 sizing | Engineering lead | §20 telemetry | No W2 capacity commitment |
| `capacity.ai_calls_per_employee_month` | W6 sizing; PERF-1004 ceilings | AI owner | §20 prototype instrumentation | Per-task ceilings enforced; aggregate forecast not published |
| `capacity.log_events_per_employee_month`, `capacity.log_bytes_per_event` | 180-day in-India log store sizing (§17.6.3) | Engineering lead | First month-end telemetry | Store provisioned with headroom and monitored; no cost forecast published |
| `retention.ict_logs` | ICT and LLM log window (NFR-CERT-602, 606) | Security lead + counsel | EV-062 floor today; counsel on DPDP r.6(1)(e) and r.8(3) (Part D-9, §23) | **≥ 180 days, in India.** Never below the floor; never auto-extended to one year without counsel |
| `retention.epf`, `retention.esi`, `retention.income_tax`, `retention.gratuity`, `retention.appointment_letter`, `retention.ir_records` | Statutory holds in the erasure engine (NFR-DPDP-506) | Counsel (§23.14) | Counsel opinion; corrigendum check (§02.4) | **Held, never erased.** Absence is never read as permission to delete |
| `retention.state.<state>.<form>` | State-sphere register periods (EV-053, EV-054) | Counsel (§23.14) | State gazettes; counsel | Held, never erased |
| `retention.dpdp_r8_3` | The DPDP r.8(3) question (Part D-9) | Counsel (§23.14) | Counsel; commencement | Neither immediate purge nor one-year suppression is hard-coded |
| `tenant_token_budget_pct_of_arpu` | Per-tenant AI budget backstop (§13.7, NFR-OBS-1101) | Finance + AI owner | §13, §20 | Per-user limits enforced; the tenant backstop is monitored and reported, not enforced as a hard cut |
| `sla.credit_pct`, `sla.credit_cap_pct_of_annual` | Service-credit commercial terms (§17.8.2) | Commercial owner, routed to §18 | §18 and counsel | **No service-credit commitment is made.** The SLO is published; the credit is not |
| `sector_profile` | The NFR overlay bundle (NFR-RES-704) | Onboarding, on the customer's authorised signatory's confirmation | Onboarding questionnaire (FR-LEG-030) | Tenant creation is blocked — the field is never null |
| `data_residency`, `inference_residency` | Storage region and inference routing (NFR-RES-701) | Engineering lead | Profile resolution | India default for both |
| `ai_enabled` (per tenant), per-feature opt-out | AI kill switch (§12, Part E-7) | Tenant admin | Tenant choice | Off for `RBI`, `SEBI`, `IRDAI`; §12 default otherwise |
| `mfa.privileged_factors` | Which factors satisfy NFR-SEC-101 for privileged roles | Security lead | Security policy | Phishing-resistant factors only; SMS never sole factor |
| `session.idle_timeout` per role class | NFR-SEC-103 | Security lead | Security policy | The stated defaults apply |
| `incident.triage_budget_minutes` | Auto-promotion timer in §17.6.1 | Security lead | Drill measurements (DR-F) | The proposed 40-minute budget applies and auto-promotion is active — the timer is never disabled while unset |
| `drill.cadence.<drill>` | §17.14.3 drill programme | Engineering lead + Security lead | Drill outcomes | The stated cadences apply |

- **Measurable:** a CI check enumerates every configuration key read by the codebase and
  fails the build on a key absent from this register, and on a register row with no owner.
- **Measurable:** a startup check asserts the unset behaviour for every unset parameter and
  logs it; a parameter whose unset behaviour is undefined prevents startup rather than
  defaulting silently.
- **Negative:** no parameter in this register has a "sensible default" chosen by an
  engineer at implementation time. That is the mechanism by which invented numbers enter a
  product and then get quoted back as evidence.

**Changing a parameter is a controlled act.** A value set from measurement is evidence; a
value changed quietly is a way of moving a target after failing it. Each change records the
prior value, the new value, the source that justifies it and the approver at the §17.3.1
rung below, and each change triggers the re-verification named in the last column — because
several of these parameters are inputs to a published figure or to a safety control.

| Parameter group | Authority rung | Re-verification a change triggers |
| --- | --- | --- |
| `critical_window`, `statutory_window_days` | A3 (maker≠checker) plus notice to affected tenants | Freeze calendar regenerated; the SLO series is re-based from the change date, never retrospectively restated |
| `alert.*`, `detect.*` | A3, with the measurement attached | The detection or alert leaves shadow mode only when its NT-205 run passes with the new value |
| `capacity.*` | A3 | The sizing model is re-derived and the re-size decision is recorded; no silent autoscale change |
| `retention.*` | A5 (counsel opinion or customer instruction recorded) | The erasure engine re-evaluates held classes; every affected erasure statement is re-issuable |
| `sla.*` | A4 plus the Commercial owner | Blocked until §18 and counsel clear the commitment |
| `auth.*`, `session.*`, `mfa.*` | A4 (Security lead) | The affected NT-1xx scenarios re-run on the release candidate |

---

### 17.17 Negative-case catalogue — what must never happen

Most of this section states what the system must do. This subsection states what it must
never do, because several of the failure modes below are the exact claims four research
rounds killed, and a control that exists only as a sentence in a PRD will not survive
contact with an engineer under deadline. Every row names a structural control — a schema
constraint, a CI gate, a missing code path — and a test from §17.18. "Structural" is the
operative word: a rule enforced only by review is a rule that fails on the day review is
skipped.

| # | This must never happen | Because | Structural control | Test |
| --- | --- | --- | --- | --- |
| N-01 | An Aadhaar number, or a hash of one, sits in a business table | Part E-6; the number lives only in the separate token store, referenced by an opaque token | Schema lint over every column; build fails on a match | NT-201 |
| N-02 | An unmasked Aadhaar is returned to a role below a named, audited privilege | NFR-SEC-303 | Endpoint audit enumerating every response shape | NT-202 |
| N-03 | An Aadhaar token store, or any replica or backup of it, is provisioned outside India | Part D-15 is a counsel question the product never needs answered, because it never does either | Provider-config audit; region is not a per-tenant override for this store | NT-203 |
| N-04 | A "no Aadhaar, no payroll" or "biometric only" configuration exists | Part D-10 forbids shipping the hard block; Part E-11 sets exclude-and-flag as the default | Config-schema audit: the option does not exist to be set | NT-204 |
| N-05 | A log sink, including the LLM prompt/completion log, egresses to a non-India region | EV-062, direction (iv) | CI enumeration of log-sink regions; build fails | NT-301 |
| N-06 | A runbook, status page or customer document presents 72 hours as the Indian breach clock | K-07 — the live clock is six hours | Copy lint over runbook and customer-facing templates; the DPDP r.7 follow-up report is labelled as such wherever it appears | NT-302 |
| N-07 | Any field, tag, label or help text describes data as sensitive "under DPDP" | Part D-19; DPDP has no sensitive category (s.2(t), EV-059) while SPDI r.3 does (EV-060) | Copy lint over the string catalogue and the field-tag vocabulary | NT-303 |
| N-08 | Sales, onboarding or in-product copy says the Data Protection Board can fine from November 2026 | K-05 — the November 2026 tranche commences only Consent Manager registration | Copy clearance under §23.1; claim register | NT-304 |
| N-09 | Any document states that India mandates data localisation, or that India has no localisation requirement | K-08 — both are wrong; the live constraints are CERT-In logs, SPDI r.7 and the sectoral rules | Copy clearance; the attestation generator emits only cleared template text (NFR-RES-705) | NT-305 |
| N-10 | An RBI overlay is described as applying to us "with no turnover threshold" | K-22 — materiality-gated, entity-by-entity, and addressed to the regulated entity | Copy clearance; the overlay table's own wording is the cleared source | NT-306 |
| N-11 | Replay or the audit trail is described as discharging a customer's right-to-audit obligation | K-21 — it supports evidence production; it does not discharge | Copy clearance; the evidence-pack template carries the qualifier | NT-307 |
| N-12 | A SEBI profile is activated before written confirmation of MeitY-empanelled regions | EV-085, FAQ Q47/Q50 via clause 2(ii) | The profile transition is guarded; the transition is refused, not warned | NT-308 |
| N-13 | A regulated tenant's inference call reaches a backend outside its consented sub-processor set | Part E-7; RBI para 16(r) where material (EV-087) | Router allow-list computed from the manifest; failover targets limited to the consented set | NT-309 |
| N-14 | A task with no India-region backend is silently sent abroad instead of refused | NFR-RES-701 | Typed refusal is the only path; there is no fallback branch | NT-310 |
| N-15 | A model swap changes a monetary or statutory figure | §12.1, §13.4 — rules-first, LLM-last; the engine is pure (§08 I4) | No model output enters a monetary path; the deterministic-replay test compares across backends | NT-311 |
| N-16 | An outbound model call carries Aadhaar, PAN, bank account or IFSC, or a biometric template | Part E-7 — the chokepoint is structural, in the call graph | Single egress path; the default-deny list is enforced there, not at call sites | NT-312 |
| N-17 | An audit row is updated or deleted by any application path | NFR-SEC-401 | Append-only store; no UPDATE/DELETE grant exists for the application role | NT-206 |
| N-18 | A broken audit chain is marked verified by a human | NFR-SEC-405 | The transition does not exist in the state machine | NT-207 |
| N-19 | A Restricted-class raw value appears in an audit payload, a log line, a URL, or an error message | NFR-SEC-401, §17.4 | Serialiser-level redaction plus a log lint; both fail the build | NT-208 |
| N-20 | A monetary mutation commits without its audit event | NFR-SEC-401 | Same transaction; orphan-mutation reconciler target 0 | NT-209 |
| N-21 | An erasure request deletes a class whose retention parameter is unset | NFR-DPDP-506; Part D-11 | The engine holds on unset; absence is not permission | NT-313 |
| N-22 | A restore resurrects an erased subject | NFR-DR-1402, class F | Shredded keys are not reintroduced; tombstones re-applied on restore | NT-402 |
| N-23 | A confirmed class A write is lost in a failover while the user was told it succeeded | §17.14.1 | Synchronous cross-AZ commit before acknowledgement | NT-401 |
| N-24 | A pay run is re-submitted to a bank or a portal after a recovery | §17.14.2 | Duplicate-submission guard keyed on the run and the external reference (§16) | NT-403 |
| N-25 | A degraded rung substitutes an approximate or cached monetary figure | §17.8.3 rule 3 | Degradation removes features; no alternative compute path exists | NT-404 |
| N-26 | A non-emergency deploy lands inside a frozen span | NFR-AVAIL-807 | Pipeline enforcement; no in-tool override | NT-405 |
| N-27 | An availability number is netted against a correctness failure, or sold as a compliance guarantee | NFR-AVAIL-805 | The two metrics have separate sources and separate dashboards; the compliance SLA is §19's specification | NT-406 |
| N-28 | An SPDI-set field is stored without a linked written-consent artefact | EV-060 r.5(1); NFR-DPDP-501 | Schema constraint on the field group | NT-314 |
| N-29 | A consent artefact is back-dated or created by an importer on an employee's behalf | Part E-12 — consent cannot be backfilled | Consent entities accept only `human` actor writes; importer writes are rejected | NT-315 |
| N-30 | An incident sits in `TRIAGE` past the auto-promotion timer, or reaches a "reportable but not reported" state | §17.6.1 | The timer is a scheduler transition; the suppression state does not exist | NT-316 |
| N-31 | An audit event carries `actor_type` other than `human` with a null `on_behalf_of`, or an `operator` event with a null `authority_ref` | NFR-SEC-406; K-13 | Schema constraints | NT-210 |
| N-32 | Product copy says "we file for you" or implies automated submission | K-13, EV-030 — every statutory surface is an attended portal and the employer's liability is non-delegable | Copy clearance; §19 and §22 own the permitted phrasing | NT-317 |
| N-33 | A tenant-facing screen or export attributes a competitor capability without a capture date | Part A-9; §21's competitor-claim clearance rule | Claim register; no competitor string ships uncleared | NT-501 |
| N-34 | A cross-tenant read succeeds anywhere | NFR-SEC-201 | Postgres RLS at the data layer; CI counts unguarded tenant tables | NT-101 |
| N-35 | A user approves their own pay run or return | NFR-SEC-202 | maker≠checker enforced in the workflow engine | NT-102 |
| N-36 | A capacity commitment — instance class, queue depth, autoscale envelope — is published or contracted from an unmeasured parameter | NFR-SCALE-906 | The register's unset behaviour blocks the commitment; the parameter, not the engineer, is the gate | NT-420 |
| N-37 | A configuration key exists in code but not in the §17.16 register, or a register row has no owner | §17.16 | CI enumerates every key read by the codebase against the register; build fails on either | NT-420 |
| N-38 | A certification claim states more than the certificate's scope, or asserts deemed compliance under SPDI r.8(4) | §17.15.2, §23.4, FR-LEG-012 | Claim clearance under §23.1; only the scope printed on the certificate is stated | NT-507 |

---

### 17.18 NFR test plan — scenarios, preconditions and pass criteria

Every NFR above ends in a verification method. This subsection turns those methods into
named, runnable scenarios so that "verification" is a scheduled artefact rather than an
intention. Test IDs are `NT-###`; they are test identifiers, not requirements, and they are
referenced from §17.17 and from the acceptance summary. Each scenario states its type
(`CI` runs on every pull request, `REL` on every release candidate, `PER` on a period
cadence, `DRILL` is a live exercise), its preconditions, its pass criteria and the evidence
it leaves behind. A scenario with no evidence artefact does not count as run.

**Access control and tenancy (NT-1xx)**

| ID | Covers | Type | Preconditions | Procedure and pass criteria | Evidence |
| --- | --- | --- | --- | --- | --- |
| NT-101 | NFR-SEC-201, N-34 | CI | Two seeded tenants with overlapping natural keys | Every data-layer read and write is attempted with tenant A's session against tenant B's rows. **Pass:** 0 rows returned, 0 rows written, and the RLS policy — not application code — is what refused. A separate lint asserts every tenant table has a policy or an annotated exemption; count of unguarded tables = 0 | CI report |
| NT-102 | NFR-SEC-202, N-35 | CI | A pay run prepared by user X | X attempts approval; a second user approves. **Pass:** self-approval refused 100%; the approval event records both identities | CI report |
| NT-103 | NFR-SEC-203 | CI | CA-role session on a granted client | Attempt a write to every monetary field reachable from the console. **Pass:** 403 on 100% of attempts; reads succeed | CI report |
| NT-104 | NFR-SEC-201 (CA console) | REL | A CA with two client grants | Switch client mid-session. **Pass:** the session token re-scopes; a request carrying the prior scope is refused | Test log |
| NT-105 | NFR-SEC-101, NFR-SEC-403 | PER, quarterly | Live privileged seats | Enumerate privileged seats and their factors. **Pass:** 100% have a second factor, SMS-only = 0 | Access-review report |
| NT-106 | NFR-SEC-103 | REL | Admin session at rest | Idle past the role's timeout; attempt an action. **Pass:** re-auth required. Approve a return in a fresh session. **Pass:** step-up re-auth demanded regardless of session age | Test log |
| NT-107 | NFR-SEC-104 | REL (P1) | SCIM-provisioned tenant | Terminate an employee in the IdP. **Pass:** all access lost within 5 minutes, measured end to end | Provisioning-test log |
| NT-108 | NFR-SEC-102 | REL | Throttled 3G device profile | Employee OTP login to payslip. **Pass:** median ≤ 20 s; ≤ 2 taps after OTP | Synthetic RUM report |

**Encryption, audit trail and detection (NT-2xx)**

| ID | Covers | Type | Preconditions | Procedure and pass criteria | Evidence |
| --- | --- | --- | --- | --- | --- |
| NT-201 | NFR-SEC-303, N-01 | CI | Full schema | Lint every column for an Aadhaar-shaped value or a hash of one outside the token store. **Pass:** 0 | CI report |
| NT-202 | NFR-SEC-303, N-02 | REL | Seeded Aadhaar token | Call every endpoint that can reach the identifier, at every role. **Pass:** masked for all roles below the named privilege; the unmask path emits a reason-coded audit event | Endpoint-audit report |
| NT-203 | NFR-SEC-303, N-03 | PER, quarterly | Live provider config | Enumerate the token store's regions, replicas, backups and egress allow-list. **Pass:** India for 100% of tenants; 0 non-India sub-processors on the allow-list | Config-audit report |
| NT-204 | NFR-DPDP-501, N-04 | CI | Config schema | Search the config schema for a hard-block option. **Pass:** no such option exists — the test asserts absence, not a default | CI report |
| NT-205 | NFR-SEC-404, NFR-SEC-204 | REL | Replayed month-end traffic including a bank-file run, a CA audit read and employee self-reads | Run every detection over the replay. **Pass:** the three named exclusions produce 0 alerts; the seeded anomaly in each rule produces exactly 1 | Detection-tuning report |
| NT-206 | NFR-SEC-401, N-17 | CI | Audit store | Attempt UPDATE and DELETE as the application role. **Pass:** refused at the grant level | CI report |
| NT-207 | NFR-SEC-405, N-18 | REL | A chain with an injected mismatch | Run the verifier; attempt to clear the break through every available interface. **Pass:** break detected, exports blocked, and no interface offers a clearing action | Verifier report |
| NT-208 | NFR-SEC-401, N-19 | CI | Restricted-class fields on a mutated entity | Mutate each and inspect the emitted audit payload, application log and error responses. **Pass:** 0 raw Restricted values anywhere; tokens or masked references only | CI report |
| NT-209 | NFR-SEC-401, N-20 | CI | Payroll mutation path | Force a failure after the mutation and before the audit write. **Pass:** the transaction rolls back; orphan-mutation reconciler finds 0 | CI report |
| NT-210 | NFR-SEC-406, NFR-CERT-604, N-31 | CI | Assistant, importer, scheduler and operator write paths | Write one event from each. **Pass:** schema rejects a null `on_behalf_of` on non-human actors and a null `authority_ref` on `operator`; `actor_type = system` is not an accepted value | CI report |
| NT-211 | NFR-SEC-402 | REL | One employee, one tax year of history | Query the full change history. **Pass:** P95 ≤ 3 s; the export is signed and verifies | Benchmark log |
| NT-212 | NFR-SEC-302 | PER, annually | Production-shaped dump | Inspect a raw dump. **Pass:** bank account, PAN and health fields are ciphertext; Aadhaar and biometric keyspaces are separate and absent | Dump-inspection report |
| NT-213 | NFR-SEC-304 | CI | Repository and images | Secret scan. **Pass:** 0 detected secrets; rotation attestation current | CI report |
| NT-214 | NFR-SEC-305 | CI | Dependency tree | SCA and SAST. **Pass:** 0 ungated High+ CVEs; SBOM emitted; statutory-path changes carry a second reviewer | CI report |
| NT-215 | NFR-SEC-301 | CI | Every public endpoint and the device-ingest receiver | Scan TLS configuration and headers. **Pass:** TLS 1.0/1.1 disabled, grade-A equivalent, HSTS with the stated max-age, mTLS on internal tenant-data paths, and plaintext HTTP ingest refused | Scan report |

**Data protection, CERT-In, residency (NT-3xx)**

| ID | Covers | Type | Preconditions | Procedure and pass criteria | Evidence |
| --- | --- | --- | --- | --- | --- |
| NT-301 | NFR-CERT-602, NFR-CERT-606, N-05 | CI | Every configured log sink | Enumerate sink regions, the LLM log and the attribution ledger included. **Pass:** 100% India; a non-India sink fails the build | CI report |
| NT-302 | K-07, N-06 | REL | Runbook and customer templates | Copy lint for a 72-hour clock presented as the Indian obligation. **Pass:** 0 hits; every r.7 reference is labelled as a future DPDP follow-up report | Copy-lint report |
| NT-303 | Part D-19, N-07 | CI | String catalogue and field-tag vocabulary | Lint for "sensitive" adjacent to "DPDP". **Pass:** 0 hits | CI report |
| NT-304 | K-05, N-08 | REL | Customer-facing corpus | Claim-register review for a November 2026 fining power. **Pass:** 0 uncleared claims | Claim register |
| NT-305 | K-08, N-09 | REL | Customer-facing corpus | Claim-register review for either localisation absolute. **Pass:** 0; the permitted formulation is the scoped one | Claim register |
| NT-306 | K-22, N-10 | REL | Overlay copy and riders | Review for "no turnover threshold". **Pass:** 0; materiality framing present | Claim register |
| NT-307 | K-21, N-11 | REL | Evidence-pack templates | Review for a discharge claim. **Pass:** every instance carries the "supports evidence production, does not discharge" qualifier | Claim register |
| NT-308 | NFR-RES-704, N-12 | REL | A tenant marked SEBI without written MeitY confirmation | Attempt the profile transition. **Pass:** refused; the tenant stays `none`; an override path does not exist | Transition-test log |
| NT-309 | NFR-RES-702, N-13 | REL | Regulated tenant with a frozen manifest | Attempt to re-point a task class to an unconsented backend, then force a provider failure. **Pass:** re-point refused; failover lands only inside the consented set | Router-test log |
| NT-310 | NFR-RES-701, N-14 | REL | Pinned tenant, a US-only-capable task class | Issue the task. **Pass:** typed refusal with a clear error; 0 bytes egress | Router-test log |
| NT-311 | NFR-RES-702, N-15 | REL | One pay run, three backends | Run the same pay run with each backend serving explanations. **Pass:** monetary output byte-identical across all three | Replay report |
| NT-312 | Part E-7, N-16 | CI | Every outbound model call site | Attempt to send each default-deny item through every call path. **Pass:** blocked at the single chokepoint; 0 call sites bypass it | CI report |
| NT-313 | NFR-DPDP-506, N-21 | REL | A terminated employee; at least one retention parameter unset | Raise an erasure request. **Pass:** an itemised erased/retained statement; every retained class cites a basis or a counsel-review flag; unset classes are **held**; no class is erased without a cited basis | Erasure-statement artefact |
| NT-314 | NFR-DPDP-501, NFR-DPDP-503, N-28 | CI | SPDI-set fields | Attempt to store each without a linked consent artefact. **Pass:** refused by the schema constraint | CI report |
| NT-315 | Part E-12, N-29 | CI | Importer path | Attempt an importer-written consent artefact and a back-dated one. **Pass:** both refused | CI report |
| NT-316 | NFR-CERT-605, N-30 | REL | An incident held in `TRIAGE` | Let the triage budget expire. **Pass:** auto-promotion to `REPORTABLE` fires; no interface offers suppression | State-machine test log |
| NT-317 | K-13, N-32 | REL | Product and marketing copy | Review for submission language. **Pass:** 0 instances of "we file for you" or equivalent; permitted phrasing is the §22 formulation | Claim register |
| NT-318 | NFR-DPDP-502 | REL | An employee with payslips, filings and declarations | Self-service export. **Pass:** completes ≤ 60 s, machine-readable, no portability claim in the copy | Test log |
| NT-319 | NFR-DPDP-502 (nomination) | REL | An employee with PF and gratuity nominations | Record a data-principal nominee. **Pass:** the record is distinct from both statutory nominations; neither is overwritten | Test log |
| NT-320 | NFR-CERT-601, NFR-DPDP-505, NFR-DR-1405 | DRILL (DR-F) | The incident machine end to end, with Clock B armed in rehearsal | Run the tabletop. **Pass:** `noticed_at` → `submitted_at` inside six hours with the two-hour reserve intact; every armed track completes; the DPDP r.7 content fields populate from the pre-staged record without a code change | Drill report with the measured elapsed time |
| NT-321 | NFR-CERT-603 | PER, monthly | Every host and service clock | Read the NTP monitor. **Pass:** all clocks traceable to NIC or NPL, skew ≤ 100 ms, drift alerting live; an untraceable source is a finding, not a note | NTP report |
| NT-322 | NFR-RES-703 | PER, quarterly | Live network policy and the per-tenant sub-processor manifests | Enumerate outbound destinations and compare with the allow-lists. **Pass:** 0 destinations off-list; the surprise-egress detector raises on a seeded unauthorised destination and its output reaches the incident channel | Egress-review report |
| NT-323 | NFR-DPDP-504 | PER, annual | The DPIA template, the DPO-role seam and the s.10(1) watch | Confirm the seam is open and unused. **Pass:** the template and role seam exist and are current; 0 DPO/DPIA operating cost incurred; the gazette watch has a dated last-checked entry | Readiness note |
| NT-324 | NFR-CERT-607 | PER, per release | The control-theme evidence set | Read the readiness dashboard. **Pass:** 0 lapsed and 0 missing artefacts before an audit; every artefact carries its date, config revision and measured figure; 0 artefacts produced by hand | Readiness dashboard export |

**Availability, DR, scale and performance (NT-4xx)**

| ID | Covers | Type | Preconditions | Procedure and pass criteria | Evidence |
| --- | --- | --- | --- | --- | --- |
| NT-401 | NFR-DR-1406 class A, §17.14.1, N-23 | DRILL, quarterly (DR-D) | In-flight class A write | Kill the primary mid-write. **Pass:** either present-and-confirmed or absent-and-failed; confirmed-but-absent count = 0 | Drill report with the measured count |
| NT-402 | NFR-DR-1402, NFR-DR-1406 class F, N-22 | DRILL, quarterly (DR-C) | A subject erased before the restore point | Restore. **Pass:** the subject stays erased; shredded key not reintroduced; tombstone re-applied | Drill report |
| NT-403 | NFR-PERF-1005, §17.14.2, N-24 | REL | A run whose bank file carries a submission reference | Force a recovery and re-run. **Pass:** the duplicate-submission guard refuses; the divergence ledger records the event | Test log |
| NT-404 | §17.8.3 rule 3, N-25 | REL | System driven to `PROTECT_STATUTORY` | Compute a pay run at that rung. **Pass:** byte-identical to the `NORMAL` result; no cached or approximate path is reachable | Replay report |
| NT-405 | NFR-AVAIL-807, N-26 | CI | Freeze calendar active | Attempt a routine deploy inside a frozen span, then an emergency deploy with one approver. **Pass:** both refused; a two-approver emergency deploy succeeds and is recorded with its incident reference | Pipeline log |
| NT-406 | NFR-AVAIL-805, N-27 | PER, monthly | One month of production data | Reconcile the availability series and the filings-on-time series. **Pass:** they are computed from separate sources and neither is adjusted by the other | Dashboard export |
| NT-407 | NFR-AVAIL-801 | PER, monthly | One closed window | Recompute the SLO from raw load-balancer data using the §17.8.1 arithmetic for that month's length. **Pass:** the published figure matches the recomputation; the February window is computed on its own 6-day span | SLO report |
| NT-408 | NFR-AVAIL-803, NFR-OBS-1106, §17.8.3 | REL | Load harness at 3× peak | Drive saturation and observe the ladder. **Pass:** rungs entered in order, payroll and artefact paths hold their latency SLA, 0 payroll transactions lost, the rung is visible to the tenant | Load-test report |
| NT-409 | NFR-DR-1401 | DRILL, quarterly (DR-A) | Nominated timestamp | Point-in-time restore. **Pass:** RTO and RPO **measured and reported as numbers**, not ticks; checksums match | Drill report |
| NT-410 | NFR-DR-1403 | DRILL, semi-annual (DR-B) | Full stack | Fail over to the second India region. **Pass:** the failed-over stack serves entirely from India; no log sink re-points abroad; class A and B records present | Drill report |
| NT-411 | NFR-DR-1404 | DRILL (DR-E) | Simulated §06.11 due date, platform at `EXPORT_ONLY` | Export every due artefact for every tenant. **Pass:** all exportable for attended submission; the ECR, ESI, PT and Form 138 Q1–Q3 artefacts are among them, with Q4 out of scope while its format is unreleased (EV-046) | Drill report |
| NT-412 | NFR-DR-1407 (DR-G), NFR-SEC-306 | DRILL, annual | KMS key made unavailable | Exercise the failure. **Pass:** the system fails closed; no plaintext fallback path is found; recovery runs without exporting key material | Drill report |
| NT-413 | NFR-DR-1407 (DR-H) | DRILL, annual | Primary-system credentials only | Attempt a restore. **Pass:** the restore **fails** — backup keys are genuinely separate | Drill report |
| NT-414 | NFR-SCALE-903 | REL | A 200-employee tenant spanning 10 states | Run payroll. **Pass:** completes inside the batch SLA with the correct per-state slabs from the gazette-sourced dataset (§06.4, §06.8) | Batch report |
| NT-415 | NFR-SCALE-905, NFR-SCALE-904 | REL | One tenant saturating W6 | Observe other classes and other tenants. **Pass:** W4 latency unaffected; `SHED_AI` fires on W6 pressure alone | Load-test report |
| NT-416 | NFR-PERF-1002 | REL | 200-employee multi-state tenant | Pay run end to end. **Pass:** ≤ 60 s; artefact generation ≤ 30 s per return | Benchmark log |
| NT-417 | NFR-PERF-1003 | CI | Employee app bundle | Lighthouse CI on a Moto-G-class 3G profile. **Pass:** ≤ 200 KB gzipped; LCP ≤ 2.5 s | CI report |
| NT-418 | NFR-PERF-1004 | REL | Instrumented assistant workload | Measure cost per interaction per task class. **Pass:** inside the router's per-task ceiling; breaches logged and alerting; the measured figure is reported to §20 rather than compared to a placeholder | Cost-ledger export |
| NT-419 | NFR-OBS-1101 | PER, monthly | One month of provider invoices | Reconcile the attribution ledger to the invoices. **Pass:** within ±2%; FX booked at the EV-089 baseline; the banned ₹83.3 figure absent | Reconciliation report |
| NT-420 | NFR-SCALE-906, §17.16, N-36, N-37 | CI | Codebase and the parameter register | Enumerate every configuration key read by the code and every register row. **Pass:** 0 unregistered keys, 0 rows without an owner, 0 unset parameters without a defined unset behaviour; startup asserts and logs each unset behaviour | CI report + startup log |
| NT-421 | NFR-AVAIL-802, NFR-AVAIL-804 | PER, monthly | One month of the freeze calendar and the §06.11 due dates | Reconcile declared maintenance and availability against every statutory window. **Pass:** availability ≥ 99.95% inside each declared statutory window; 0 declared maintenance windows inside a critical or statutory span; 48-hour notice evidenced for each | Window report |
| NT-422 | NFR-AVAIL-806 | REL | Alert configuration for both periods | Inspect the alert pipeline. **Pass:** the critical and statutory windows alert on absolute degradation, the quiet period on burn-rate pairs, and every unset `alert.*` parameter is in shadow mode with its findings routed to a review queue rather than a page | Alert-config audit |
| NT-423 | NFR-SCALE-901, NFR-SCALE-902 | PER, per release train | Seeded estate at the phase's tenant and employee targets | Drive the peak-simulation profile at the provisional peak-to-average factor. **Pass:** targets met at the phase figures; the measured peak factor and the measured peak day are reported to §20 rather than asserted from the provisional value | Load-test report |
| NT-424 | NFR-PERF-1001 | PER, monthly | Production RUM plus synthetic probes from Indian networks | Compare measured latency per interaction class against the targets. **Pass:** P95 and P99 within budget for every class; the assistant's first-token series is reported separately and never netted into the interactive series | Latency report |
| NT-425 | NFR-OBS-1102, NFR-OBS-1103 | REL | One month of production telemetry | Verify RED metrics exist per service, that logs carry correlation ids, that traces span assistant tool-calls, and that the filings-on-time series is computed off the filing state machine with REJECTED included. **Pass:** all four hold; the filings series reconciles to §19's definition | Dashboard export |
| NT-426 | NFR-OBS-1104, NFR-OBS-1105 | REL | A simulated event in each AI/ML sub-class; one month of pages | Fire each simulated attack and review the period's pages. **Pass:** every sub-class is detected and raised inside the window that keeps six hours achievable; ≥ 95% of pages judged actionable; MTTA ≤ 5 min on P0 | Detection report + review note |

**Accessibility, localisation and claim control (NT-5xx)**

| ID | Covers | Type | Preconditions | Procedure and pass criteria | Evidence |
| --- | --- | --- | --- | --- | --- |
| NT-501 | Part A-9, N-33 | REL | Any shipped competitor reference | Claim-register review. **Pass:** each carries a capture date and states whether the product was executed or only its documentation read; 0 uncleared | Claim register |
| NT-502 | NFR-A11Y-1201 | CI + REL | Employee self-service, then admin at P1 | axe-core scan plus a manual audit. **Pass:** 0 criticals; contrast, keyboard and target-size criteria met; screen-reader matrix passes on the payslip, leave and filing-status flows | CI report + audit note |
| NT-503 | NFR-A11Y-1202 | REL | Core employee tasks | Walk each task. **Pass:** completable with ≤ 1 free-text field | Usability-test note |
| NT-504 | NFR-L10N-1301 | CI | Full string catalogue | Pseudo-localisation build. **Pass:** 0 hard-coded strings in the employee surface; lakh/crore grouping and ₹ rendering correct; both "Tax Year" and "Financial Year" labels resolve, and the six-digit field renders as 202627 for Tax Year 2026-27 (EV-050) | CI report |
| NT-505 | NFR-L10N-1302 | REL | Identical data, two UI languages | Generate the ECR and the Form 138 Q1–Q3 artefacts from each. **Pass:** byte-identical output | Output-diff report |
| NT-506 | NFR-RES-705 | PER, annual per profile | A tenant with a deliberately drifted config | Generate the attestation. **Pass:** it reports the drift rather than the intended state, and is marked stale; an auditor reconciling it against the network-policy dump and the manifest finds them identical once reconciled | Reconciliation-drill note |
| NT-507 | §17.15.2, N-38 | REL | Certification and security copy | Claim-register review against the certificate's own scope statement. **Pass:** 0 claims beyond scope; 0 deemed-compliance assertions | Claim register |

**Coverage rule.** Every P0 NFR in §17.19's acceptance summary maps to at least one scenario
here, and every row of §17.17 maps to exactly one. A P0 NFR with no scenario, or a
negative case with no test, is a review defect and blocks the release candidate — which is
the only mechanism that keeps a measurable-looking table from decaying into an unmeasured
one.

---

### 17.19 NFR acceptance summary — the measurable targets in one table

Every target above, collapsed to a single verifiable list so review and QA have one
checklist. If a row cannot be measured, it does not ship.

| NFR | Target | Phase | Verification |
| --- | --- | --- | --- |
| SEC-101 MFA | 100% privileged, phishing-resistant | P0 | Access review |
| SEC-102 Employee login | OTP or employer-issued bound-device PIN; never sole factor for a privileged role; median ≤ 20 s on 3G, ≤ 2 taps to the payslip | P0 | Synthetic RUM NT-108 |
| SEC-103 Session | Role-class idle timeouts; step-up re-auth on every pay-run and filing approval regardless of session age; admin-revocable sessions | P0 | Session test NT-106 |
| SEC-104 SSO / SCIM | De-provisioning propagates to loss of all access ≤ 5 min, measured end to end | P1/P2 | Provisioning test NT-107 |
| SEC-201 Tenant isolation | 0 cross-tenant leaks; DB-level RLS; CI gate | P0 | CI cross-tenant test |
| SEC-202 Separation of duties | maker≠checker, 100% | P0 | SoD test |
| SEC-203 CA read-only | 403 on 100% of CA-role writes to any monetary field; reads succeed | P0 | CI test NT-103 |
| SEC-204 Access logging | Restricted-field reads audited; detection-capable, not record-only | P0 | Detection drill + log review |
| SEC-301 TLS | ≥ TLS 1.2, HSTS 1yr, grade A | P0 | SSL scan in CI |
| SEC-302 Encryption at rest | AES-256 + app-layer field encryption; separate Aadhaar and biometric keyspaces | P0 | DB-dump inspection |
| SEC-303 Aadhaar | Optional everywhere; token store only; masked default; 0 unmasked endpoints below privilege; 0 Aadhaar numbers or hashes in business tables | P0 | Endpoint audit + schema lint |
| SEC-304 Secrets | 0 secrets in source, images or committed env files; rotation attestation current | P0 | CI secret scan NT-213 |
| SEC-305 Secure SDLC | 0 ungated High+ CVEs; SBOM/SAST; maker≠checker on statutory-path code | P0 | CI gates + VAPT |
| SEC-306 Key lifecycle | Rotation is a re-wrap; L3 shred irreversible; fail closed on key loss; no escrow, no soft shred | P0 | Shred test + DR-G/DR-H drills |
| SEC-401 Audit log | Append-only, hash-chained, 0 un-audited monetary mutations; Restricted values tokenised | P0 | Transactional + chain test |
| SEC-402 Audit usability | One employee's full tax-year history P95 ≤ 3 s; the export is signed and verifies | P0 | Benchmark NT-211 |
| SEC-403 Access review | ≥ 95% recertification coverage per quarter; un-attested grants flagged past 90 days | P1 | Quarterly access review NT-105 |
| SEC-404 Detection catalogue | D-1…D-8 defined; thresholds named, not invented; shadow mode while unset | P0 | Replay-tuning run NT-205 |
| SEC-405 Chain verification | Nightly per tenant-day; a break blocks export; no human clean-up transition exists | P0 | Verifier report NT-207 |
| SEC-406 Non-human actors | 0 non-human events without `on_behalf_of`; 0 operator events without `authority_ref`; no `system` actor | P0 | Schema test NT-210 |
| DPDP-501 Processing basis | 0 SPDI-set fields without a written-consent artefact; 0 flows where a declined consent blocks payroll; 0 "biometric only" or "no Aadhaar, no payroll" configurations; purpose + basis tag on every field | P0 | Schema constraint + flow audit |
| DPDP-502 Rights machinery | Access ≤ 60 s; erasure honours statutory holds | P0/P1 | Rights test |
| DPDP-503 Consent capture | Versioned artefact carrying purpose, withdrawal path and whose artefact it is; no Consent Manager integration | P0/P1 | Consent-flow audit NT-314 |
| DPDP-504 SDF seam | DPIA template and DPO seam kept open; no DPO/DPIA operating cost incurred before a s.10(1) notification | P2 | Design review + §20 watch |
| DPDP-505 Breach notification | Six-hour CERT-In path live; DPDP r.7 fields pre-staged; no suppress-notification branch | P0 | Tabletop drill |
| DPDP-506 Retention schedule | Itemised erased/retained statement; every retained class cites a basis or a counsel-review flag; no invented period | P0 | Erasure statement audit |
| CERT-601 Six-hour pipeline | Reportable within 6 h for all 20 classes incl. the AI/ML class; PoC registered pre-launch | P0 | Tabletop drill |
| CERT-602 Log residency | 180 days, India region, AI-layer logs included | P0 | Config audit |
| CERT-603 NTP | NIC/NPL sync, skew ≤ 100 ms | P0 | NTP monitor |
| CERT-604 Assistant logging | Assistant tool-calls logged with human-action fidelity and resolvable to a disclosure record | P0 | Schema test NT-210 |
| CERT-605 Incident record | Every incident reaches REPORTED or NOT_REPORTABLE_RECORDED with a named approver; no suppression state | P0 | State-machine test NT-316 + DR-F |
| CERT-606 Log register | Every log class enumerated, India-resident, retention-classed; CI fails on a non-India sink | P0 | CI enumeration NT-301 |
| CERT-607 Evidence pipeline | Evidence generated continuously; 0 lapsed, 0 missing control-theme artefacts before an audit | P0/P1 | Readiness dashboard |
| RES-701 Residency pin | India default; regulated pin refuses off-shore inference | P0/P1 | Pinned-tenant test |
| RES-702 Three backends | Re-point ≤ 60 s, no deploy; deterministic monetary output | P0 | Failover + replay test |
| RES-703 Egress control | Default-deny egress; 0 destinations off the per-tenant allow-list; surprise-egress detector wired to the incident channel | P0 | Network-policy audit + NT-310 |
| RES-704 Sectoral profiles | 100% tenants profiled; 0 profile-to-config drift; no SEBI profile before written MeitY-empanelment confirmation | P0/P2 | Nightly drift check + onboarding gate |
| RES-705 Generated attestations | Every value traces to live config; stale attestations cannot be exported; 0 uncleared characterising strings | P0/P2 | Generator test NT-506 |
| AVAIL-801 Windowed SLO | 99.95% across the 25th–2nd window / 99.5% otherwise [Hypothesis] | P0 | LB success ratio, per window |
| AVAIL-802 Statutory windows | 99.95% internal objective + deploy freeze around §06.11 due dates | P0 | Window monitor |
| AVAIL-803 Degradation | AI shed first, payroll and statutory artefacts last; 0 lost pay txns at 3× load | P0 | Load test |
| AVAIL-804 Maintenance | Declared ≥ 48 h ahead; 0 declared windows inside a critical or statutory span | P0 | Deploy calendar vs §06.11 filing calendar |
| AVAIL-805 SLO definition | Numerator, denominator and exclusions fixed; correctness never netted into availability | P0 | Monthly recompute NT-406/NT-407 |
| AVAIL-806 Alerting mechanism | Absolute-degradation paging inside the windows, burn-rate outside; thresholds named, shadow while unset | P0 | Alert-config audit |
| AVAIL-807 Freeze calendar | Generated from the window union + §06.11 calendar; 0 non-emergency deploys in a frozen span | P0 | Pipeline log NT-405 |
| SCALE-901 Scale | 1k tenants / 100k emp P0; 30k emp/tenant headroom [Hypothesis — provisional] | P0→P2 | Load test |
| SCALE-902 Peak | Size for ~10× peak across the critical and statutory windows [Hypothesis — provisional] | P0 | Peak sim + telemetry |
| SCALE-903 Multi-state | 200-employee, 10-state run inside the batch SLA with gazette-sourced per-state slabs | P0 | Batch test NT-414 |
| SCALE-904 Recruiting axis | Recruiting load metered on its own axis; a hiring-heavy tenant cannot degrade a hiring-light one | P1 | Per-axis metering NT-415 |
| SCALE-905 Per-class metering | Per-tenant per-class utilisation from v1; one class saturating cannot breach another's SLA | P0 | Load test NT-415 |
| SCALE-906 Sizing formula | Every capacity term is a named parameter with an owner; no committed instance class or queue depth from an unmeasured constant | P0 | Parameter register + §20 telemetry |
| PERF-1001 Latency | P95 ≤ 500 ms interactive | P0 | RUM/synthetic |
| PERF-1002 Pay run | 200 emp ≤ 60 s | P0 | Batch benchmark |
| PERF-1003 FE weight | ≤ 200 KB gz, LCP ≤ 2.5 s on 3G | P0 | Lighthouse CI |
| PERF-1004 AI cost ceiling | Median inference cost per interaction inside the router's per-task ceiling; breaches logged and alerting; absolutes are placeholders [Hypothesis] | P0 | Cost-ledger export NT-418 |
| PERF-1005 Idempotency | Idempotency key mandatory on mutating calls; 0 automatic retries on write-monetary and external-ack routes at any layer | P0 | Induced-timeout test NT-403 |
| OBS-1101 Cost attribution | Per tenant/user/agent/model from v1; reconciles ±2% | P0 | Ledger vs invoice |
| OBS-1102 Three pillars | RED metrics per service, correlation-linked structured logs, traces spanning assistant tool-calls | P0 | Dashboard + log-store audit |
| OBS-1103 Filings-on-time SLI | ≥ 99% due filings on time | P0 | Business dashboard |
| OBS-1104 Alerting and on-call | ≥ 95% of pages actionable; MTTA ≤ 5 min on P0 alerts | P0 | Post-incident review |
| OBS-1105 AI-attack detection | Every AI/ML sub-class detected and raised inside the window that keeps the six-hour report achievable | P0 | Simulated-event drill |
| OBS-1106 Tenant-visible state | Degradation rung, run state, filing state and device health visible per tenant; 0 cases of degraded-presenting-as-healthy | P0/P1 | Load test NT-408 |
| A11Y-1201 WCAG | 2.2 AA, 0 axe criticals | P0/P1 | axe CI + manual |
| A11Y-1202 Low-literacy | Core employee tasks completable with ≤ 1 free-text field | P0 | Usability walk NT-503 |
| L10N-1301 Vernacular | EN+HI P0; i18n-ready; Indian numerals | P0 | Pseudo-loc build |
| L10N-1302 Statutory invariance | Filed output identical across UI languages | P0 | Output diff test |
| DR-1401 RPO/RTO | ≤ 15 min / ≤ 4 h P0 [Hypothesis — provisional] | P0 | Quarterly drill |
| DR-1402 Backups | PITR ≥ 35 days; backup keys distinct from primary; ≥ 1 timed restore drill per quarter | P0 | Drills NT-409, NT-413 |
| DR-1403 DR in India | Second India region only | P0 | Failover drill |
| DR-1404 Filing continuity | Statutory artefacts exportable for attended submission in a degraded state | P0 | Pre-launch drill |
| DR-1405 One runbook | Every armed clock completes inside its own limit in the tabletop; the DPDP track rehearsed before commencement | P0 | Tabletop DR-F |
| DR-1406 RPO classes | Class A and B at RPO 0; confirmed-success-with-absent-record count = 0; class F stays erased on restore | P0 | Drills DR-C, DR-D |
| DR-1407 Drill catalogue | Eight drill types on cadence; every report carries a measured figure, not a tick | P0 | Drill reports |

---

### 17.20 Open NFR questions to validate

Consistent with the evidence discipline that unvalidated claims carry a kill criterion
(§02); each item feeds the §20 validation plan, and legal items the §23 counsel register:

| # | Question | Method | Kill / re-size criterion |
| --- | --- | --- | --- |
| 1 | What is the real month-end **peak-to-average** load ratio, and which day peaks? | Production telemetry, first 3 month-ends | If > 10×, re-size SCALE-902 and the autoscale envelope |
| 2 | Do the **windowed SLO** boundaries and values match how 20–200 employers actually run the month? | Per-tenant pay-run timestamps (first 3 month-ends) + churn/loss interviews (§20) | Move the window to the measured pay-run span; if uptime is a top-3 loss reason at the windowed SLO, raise AVAIL-801 |
| 3 | Does the **DPDP timeline** move — is the January 2026 compression proposal gazetted, for all fiduciaries or only SDFs; 13 or 14 May 2027; any s.10(1) SDF notification? | Primary-source watch on the e-Gazette (§20); counsel (§23) | A gazetted compression re-dates DPDP-501/505 commencement switches; front-load the r.6 security work over the rights machinery |
| 4 | Real **tokens-per-query** and inference cost per interaction | Prototype instrumentation (§20) | If ≥ 5× the placeholder, PERF-1004 ceilings tighten or a task class drops a tier; margin is decided by the supervised-filing line, not this one (EV-088) |
| 5 | Which **certifications** do target accounts actually demand (SOC 2 vs ISO vs both), and VAPT cadence? | RFP corpus review + buyer interviews | Sets the §17.15 roadmap priorities |
| 6 | Share of device fleet that **cannot do TLS 1.2+** on ingest | Hardware spike (§09) | If material, build the tenant-side relay in SEC-301 caveat |
| 7 | What **RPO/RTO** does the data actually need — measured restore times, and the cost of lost data inside the critical window? | Quarterly restore drills + §20 instrumentation | Replace DR-1401's provisional figures |
| 8 | Are the chosen India regions **MeitY-empanelled** (needed for SEBI-profile tenants, EV-085)? | Written provider confirmation (§20) | If not, SEBI-profile tenants need a different hosting lane before any SEBI sale |
| 9 | What **retention periods** apply to EPF, ESI, TDS, gratuity and appointment-letter records, and to state-sphere registers? | Counsel opinion (§23); corrigendum check (§02.4) | Sets the NFR-DPDP-506 parameters; until set, those classes are held, never erased |
| 10 | Does adding **attended filing** to an insurer tenant's plan make the arrangement outsourcing under IRDAI PPI Regs reg 2(14), and is an RE's employee HR data **"Regulatory Data"** under CSCRF? | Counsel opinion (§23); regulated-buyer interviews (§20) | Sets the NFR-RES-704 IRDAI and SEBI overlays; until answered, the configurator flags the combination and the SEBI overlay treats HR data as in scope |
| 11 | Does SEBI harden the **FAQ Q26 India key-location** expectation into a circular? | Primary-source watch on SEBI circulars (§20) | If hardened, the SEBI overlay's India-HSM setting moves from supervisory expectation to binding; no design change, a status change |
| 12 | Do the **SPDI Rules survive** the omission of IT Act s.43A at DPDP commencement (Part D-12)? | Counsel opinion (§23.4) before ~May 2027 | Sets the date, if any, on which NFR-DPDP-501's written-consent gate stops being mandatory; until answered, the gate stays on |
| 13 | What are the TDS deposit due dates under the **Income-tax Rules 2026**? | Primary-source read (§06.13, §20) | Re-dates the 7th-of-month statutory window in NFR-AVAIL-802 and the month-end load profile |
| 14 | What does **normal** Restricted-class read and export behaviour look like, so the D-1…D-8 detections can be tuned? | Shadow-mode detections over the first three month-ends (§20) | Sets the `detect.*` parameters; until set, detections observe and never page — a named launch risk, not an accepted state |
| 15 | What is the measured `noticed_at` → `submitted_at` time, and does the two-hour reserve survive a drill? | DR-F tabletop before the first paying customer, then annually (§17.14.3) | If the reserve is consumed, the six-hour pipeline is procedural rather than architectural and is reworked before launch |
| 16 | How many times does a tenant re-run a month before locking, and how many registrations does a typical tenant carry? | §20 telemetry; §22 operations data | Sets `capacity.payrun_reruns_per_cycle` and `capacity.registrations_per_tenant`; until set, no W4/W5 capacity commitment is made and the §18 registration cap stays open |
| 17 | Should the critical window be calendar-day bounded — budget varying 4.32–6.48 min across the year (§17.8.1) — or a fixed duration anchored on each tenant's pay run? | §20 pay-run timestamps + buyer interviews | Calendar days are the customer-verifiable definition and the current choice; a fixed duration would stabilise the budget at the cost of a less checkable published SLO |
| 18 | Do the **measured** restore and failover figures (DR-A, DR-B) support the provisional RPO/RTO, and is a tighter RPO needed inside the critical window? | Quarterly drills with measured numbers (§17.14.3) | Replaces NFR-DR-1401's provisional figures; a measured RTO above the P0 ceiling re-opens the DR topology decision |
