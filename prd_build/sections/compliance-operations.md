## 22. Compliance Operations — Attended Filing & the Compliance Data Pipeline

This section specifies the two operations that turn the engine of §06 and §08 into the
thing the rest of this PRD sells. The first is the **attended filing operation**: a named
human carries a portal-accepted artefact through a government portal, in a session that
human attends, under the employer's written authority to act. The second is the
**compliance data pipeline**: the watch, authoring, review, regression and publish
machinery that keeps every rule, file format, due date and portal runbook current. §01 and
§05.15 say the company is "a compliance-maintenance operation with a permanent statutory
team" that happens to ship software. This section writes that operation down — who acts,
on whose credentials, with what software, what is recorded, what the customer approves,
what it costs per unit of work and how many people it needs — so that it can be built,
staffed, priced and audited.

Three findings frame everything below, and none is restated per requirement:

- **Every statutory surface is an attended portal (K-13).** EPFO has an interactive
  employer login with a CAPTCHA and no API or bulk channel in any EPFO document reviewed
  (r3/05; r5/02). For TDS the payroll product writes a statement file, and the deductor
  runs Protean's Java File Validation Utility (FVU) against it with the `.csi` challan file
  and uploads the output on the income-tax portal (EV-051, EV-052; r3/05). ESIC takes a
  contribution template upload. State PT is one manual portal per state (r3/05), and in
  Tamil Nadu and Kerala PT is a local-body levy rather than a state tax department's
  (r2/10 finding 22; §06.4). We are not aware of any submission API on any of these
  surfaces as of September 2026.
- **The deliverable is a portal-accepted artefact plus attended, assisted filing under
  written authority to act.** The employer's and deductor's statutory liability is
  **non-delegable** and stays with the customer whoever presses submit (K-13). Whether and
  how we may act on these portals under employer credentials is on the counsel register
  (Part D-17, §23), and the operator mode is fenced until counsel clears it (§05.7; fence
  F-08[portal], §05.18).
- **No priced competitor claims to submit.** No vendor in the six-vendor priced set claims to
  submit any filing; greytHR, the most compliance-forward, publishes only generation
  language — "ECR generation", "ESI computations and challans", "One-click Form 24Q
  generation with automatic FVU validation" (EV-030; r5/03 finding 32 — pricing, payroll and
  feature pages read September 2026; product documentation, trial accounts and the products
  themselves were not examined, so the absence of a claim is evidence of positioning, not
  proof of absent capability).
  Within that set, MYND/Qandle is the only bundle pairing self-serve HRMS with an outsourced
  operation, and its advisory add-ons are unpriced and demo-sold (EV-030, EV-034). Attended
  submission done well is unclaimed ground in the set we examined — and it is also the
  largest cost line and the largest unscoped legal exposure in the plan. Both halves are
  specified here.

> **[Killed] — "we file for you."** Any wording that implies automated or unattended
> submission is killed (K-13; EV-K24). The product generates, validates, assembles and
> reconciles; a named human submits in an attended session; the employer approves every
> irreversible act; the liability stays with the employer.
>
> **[Reversed] — the earlier risk response.** An earlier draft answered the credential
> exposure with "authority-to-act and the audit log must exist before the first paying
> customer". That is a build task, not a mitigation: it addresses authority, not the
> legality of acting on a government portal under someone else's credentials. The build
> task survives (FR-OPS-002, FR-OPS-008); the legality moves to the counsel register with
> four named questions (§22.2.3); the operator mode is fenced on it (FR-OPS-001).
>
> **[Reversed] — "the compliance data set is the moat" with nothing behind it.** Earlier
> drafts named the maintained rule set as the moat while conceding that nobody had
> designed the pipeline that maintains it, and gave it no schema, owner, cost or headcount
> (r5 engineer, CFO and counsel reviews). §22.8–§22.10 are that design. The moat is
> defended on **cost per state maintained** and on the maintenance record, never on a claim
> that a competitor's published data is wrong (Part A-9; §21).

**What this section owns, and what it does not.** It owns the per-portal runbooks, the
written authority to act, the credential vault, the "what we did on your behalf" log, the
supervised-minute cost model and its inputs, the compliance data pipeline's operations and
sizing, and the org design. It does not own the filing-instance state machine (§08
FR-PAY-711), the payroll-month machine and its verification gate (§08 FR-PAY-301 M10), the
portal-edge data exchange and file-schema objects (§16.1, §16.5), the rule storage schema
(§14.6), the rules-engine evaluation and certification contract (§15.4), prices (§18),
metric definitions (§19) or legal analysis (§23). Where those sections hand work to "§22",
this section is the receiving end; it cites them rather than restating them.

**Numbering and release tags.** Requirements are `FR-OPS-###` (the attended filing
operation, §22.1–§22.7) and `FR-RULE-###` (the compliance data pipeline, §22.8). Tags follow
§05.17's ledger rules: **P0** is reserved for requirements behind a capability on the closed
R1 list (lint L1), and a fenced leg carries **a release tag and its fence instead of a
priority** (lint L2, L5). An earlier draft of this section used the composite "P0 · fenced";
§05.17 ruling PR-06 rejects it, and every such leg is now tagged **R2 · F-08** — fence
`F-08[portal]`, operator-attended submission not cleared by counsel (§05.18). Other fenced
legs carry their own fence: F-01 (Form 138 Q4 and the Tax Year 2026-27 Form 130), F-02 (Tax
Year 2026-27 corrections not yet enabled on the portal), F-03 (the ECR arrear return), F-04
(ESI after the saving lapses), F-05 (the ESIC template), F-06/F-07 (a state's PT or LWF row).
P1 and P2 follow §05.5. Every [Hypothesis] carries its kill or validation criterion inline,
and every unsized quantity is a named parameter routed to §20.

**Release mapping.** Where §05.17 already cites a requirement as an R1 acceptance reference,
the capability is named; where this section tags a requirement P0 but §05.17 does not yet
cite it, the row says "proposed", and the addition is routed to the §05 owner (§22.12 O20).
Until §05 accepts it, a "proposed" row is not in R1, whatever its label here (§05.17).

| Requirement | Tag | R1 capability or fence (§05.17, §05.18) |
| --- | --- | --- |
| FR-OPS-001 | P0 (Modes A, B) · R2 · F-08 (Mode C) · P1, R2 (Mode D) | C-21; F-08[portal]; Mode D rides item 20a |
| FR-OPS-002, FR-OPS-003 | R2 · F-08 | F-08's on-clear work names the authority instrument (§05.18) |
| FR-OPS-004, FR-OPS-005 | P0 | Proposed under C-21 — the approver's reconciliation and the causation record apply in Modes A and B too |
| FR-OPS-006 | P0 (Modes A, B) · R2 · F-08 (Mode C vault states) | C-21 |
| FR-OPS-007, FR-OPS-008, FR-OPS-009, FR-OPS-011, FR-OPS-028 | P0 | C-21 |
| FR-OPS-010 | P0 | C-30 |
| FR-OPS-012 | P0 (Modes A, B) · R2 · F-08 (Mode C) | Proposed under C-09 and C-21 |
| FR-OPS-013 | P0 (Supplementary, Revised, NIL, 7Q/14B) · P1, R2 (part-payment, A-05) | Proposed under C-09 and C-10 |
| FR-OPS-014 | P0 while F-05 is being cleared by capture; R2 if the gate convenes with it open | C-12 |
| FR-OPS-015 | P0 (Modes A, B) · R2 · F-08 (Mode C); corrections held on F-02 | C-14 |
| FR-OPS-016 | P0 (distribution) · R3 · F-01 (the Tax Year 2026-27 leg) | C-15; PR-04 |
| FR-OPS-017 | R2 per state · F-06[state] (PT return), F-07[state] (LWF) | A-15's return leg, A-16, A-17 |
| FR-OPS-018 | P0 (exit marking) · P0 proposed (IP registration) · P1, R2 (the rest) | C-33; IP registration proposed under C-11 |
| FR-OPS-019 | P0 | Proposed under C-25 — runbook versions are a governed artefact of FR-RULE-001 |
| FR-OPS-020 to FR-OPS-025 | R2 · F-08 | F-08's on-clear work: vault, check-out and break-glass (§05.18) |
| FR-OPS-026 | P0 (roles and separation of duties for Mode B) · R2 · F-08 (Mode C certification) | Proposed under C-21; certification is F-08 on-clear work |
| FR-OPS-027 | P0 | Proposed under C-20 and C-21 |
| FR-OPS-029 | P1, R2 | Item 20a |
| FR-OPS-030 | P0 (offboarding hand-back and final log export) · R2 · F-08 (authority revocation and vault shredding) | Proposed under C-52 |
| FR-OPS-031 | P0 | Proposed under C-30 |
| FR-OPS-032 | P0 | Proposed under C-21 — the resolver governs Modes A and B as much as Mode C |
| FR-OPS-033 | P0 | Proposed under C-20 and C-21; it is the evidence the §18.3 remedy is adjudicated on |
| FR-OPS-034 | P0 | Proposed under C-21; the storage placement of these objects is routed to §14 (§22.12 O24) |
| FR-OPS-035 | P0 | Proposed under C-09 and C-21 — reconciliation runs in every mode, including Mode A hand-backs |
| FR-OPS-036 | P0 | Proposed under C-30 |
| FR-OPS-037 | P0 | Proposed under C-21 |
| FR-OPS-038 | P0 (levels, curriculum and records) · R2 · F-08 (the Mode C certification itself) | Proposed under C-21 |
| FR-OPS-039 | P0 | Proposed under C-30 — the ledger §13.19 and §19.8 both read |
| FR-RULE-001 to FR-RULE-014 | P0 | C-25 |
| FR-RULE-015 | P1, R2 | — |
| FR-RULE-016, FR-RULE-018 | P0 | Proposed under C-25 |
| FR-RULE-017 | P0 (the R1 state, Maharashtra PT computation) · R2 per further state | C-16; the pack is the clear condition of F-06[state] and F-07[state] |
| FR-RULE-019 | P0 | Proposed under C-25 — the pipeline's own failure containment |
| FR-RULE-020 | P0 (the R1 state) · R2 per further state | C-16; the stages FR-RULE-017's conditions are reached in |

**The decision record for this section.**

| Status | Item | Where |
| --- | --- | --- |
| **Decided** | Submission is always attended by a named human; no unattended automation, no CAPTCHA bypass, no model in the submission path | §22.1, FR-OPS-001 |
| **Decided** | The downloadable artefact plus a guided checklist (Mode A) exists for every filing, so the product is never a single point of failure for a statutory deadline | FR-OPS-001, FR-OPS-028 |
| **Decided** | We hold no bank credential, no OTP-generating factor, no Digital Signature Certificate (DSC) and no Aadhaar number for any portal act; money movement and signing stay with the employer | §22.1 P5–P6, FR-OPS-020 |
| **Decided** | Every irreversible portal act needs a named approver's instruction bound to the hash of the object it acts on | FR-OPS-004 |
| **Decided** | Rule, format, due-date and runbook changes reach production only through the two-person pipeline; there is no hotfix path | FR-RULE-001, FR-RULE-010 |
| **Decided** | The delivery mode is *resolved* from recorded state by a deterministic resolver; no person selects a mode, and there is no support override | §22.1.3, FR-OPS-032 |
| **Decided** | A miss is classified from the causation record by ordered rules, and authority-caused is the only class that must be affirmatively proved | §22.2.4, FR-OPS-033 |
| **Decided** | No tolerance band exists on any contribution line; portal-computed lines are carried at the portal's figure and never recomputed into the amount paid | §22.4.7, FR-OPS-035 |
| **Decided** | Remedial work — a Supplementary, a Revised, a refile after rejection — stays inside the original filing cycle as exception minutes, and never becomes a new cycle | §22.7.1, FR-OPS-039 |
| **Fenced** | Operator-attended submission (Mode C) on every portal, until counsel clears Part D-17 and liability allocation | F-08[portal] (§05.18); §22.2.3; §23.13 |
| **Fenced** | Mode C for the income-tax upload additionally, until the e-Return Intermediary question is answered | F-08[income-tax]; §22.2.3 Q3 (CR-17c) |
| **Fenced** | Automation inside the attended session (field fill, upload assistance) — P2, counsel plus portal terms plus the §16.5 kill criterion | §22.1 M3 |
| **Open** | Supervised minutes per filing type and mode, exception rates, operator capacity and loaded cost, customers per operator, `max_supervised_minutes_per_filing_cycle` | §22.7, routed to §20 |
| **Open** | Analyst effort per rule-change event per state, state onboarding cost, counsel retainer | §22.9, routed to §20 |
| **Open** | ESIC login, template and DSC facts; income-tax upload DSC/EVC facts; the EPFO error-file schema | §22.4, routed to §20 |
| **Open** | Session-record retention beyond the CERT-In 180-day in-India floor — no statutory period may be stated for it | §22.3.2 AC-034.4, routed to §23 (Part D-11) and §20 |

<!-- DIAGRAM: compliance-operations-overview -->

---

### 22.1 Operating principles and the mechanism decision

The r5 engineer review named the gap exactly: attended filing had been described as "a
supervised human step" without ever saying whether that step is browser automation, a
co-browsing session, a customer-side agent or a person with a checklist. This subsection
decides it, and states the principles every runbook below inherits.

#### 22.1.1 The ten operating principles

| # | Principle | Why it is a principle, not a preference | Source |
| --- | --- | --- | --- |
| P1 | **A named human attends every portal session.** No service, script or model logs in, solves a CAPTCHA, relays an OTP or clicks submit on its own. | EPFO's CAPTCHA on login makes unattended automation impossible by design, and we never bypass a CAPTCHA — a product rule that does not wait on any legal view; the other portals are manual (r3/05). | K-13; r3/05 |
| P2 | **Liability stays where the statute puts it.** Nothing in a runbook, contract or screen may say or imply that statutory liability moves to us. | The employer's and deductor's liability is non-delegable. | K-13; Part D-17 |
| P3 | **Artefact first, submission second.** Every filing's artefact is downloadable with a checklist the employer or their CA can run without us. | A statutory deadline must never depend on our desk being staffed or our authority being in force. | §16.5.1 fallback |
| P4 | **The customer approves every irreversible act, against the exact object.** | An approved EPFO return can never be cancelled (EV-036); a Revised return is impossible once payment is initiated (EV-037); a wrongly recorded exit date needs a joint declaration to undo (EV-041). | EV-036, EV-037, EV-041 |
| P5 | **Money moves only on the employer's own authentication.** The operator takes a portal to the point of payment; the employer's authorised payer completes it through their own bank channel. | Bank-side maker-checker and OTP are the customer's controls (§16.3); holding them would make us the payer. | §16.3; r3/05 findings 1–3 |
| P6 | **Possession factors and signatures stay with the employer.** OTPs are relayed per session by a person; a DSC is never held, copied or operated by us. | The authorised signatory's DSC is personal to a named individual (Part D-17); a standing OTP forward would be standing access. | Part D-17 |
| P7 | **Scope is enforced by the system, not remembered by the operator.** Every action is checked against the written authority's portal × registration × action × validity scope before it is offered. | An operator serving many clients must not be able to act outside any one client's grant by mistake. | FR-OPS-003 |
| P8 | **Everything we do on a customer's behalf is logged where the customer can read it.** | Authority without a readable record is not accountable, and the remedy in §18.3 needs a causation record. | §18.3; FR-OPS-008 |
| P9 | **Fail to BLOCKED or HANDED_BACK, never to a guess.** An unpublished format, an unresolved regime, an unknown portal behaviour or a failed login stops the session and hands the artefact back with the deadline visible. | A guessed statutory act is worse than a late one: it is irreversible and it is the employer's liability. | §08.13 G7; FR-PAY-711 F2 |
| P10 | **Rules change only through the pipeline.** No rule, format, due date or runbook changes in production except as a reviewed, certified, staged version. | A wrong rule mis-files for every tenant in its jurisdiction at once (§05.15). | §15.4.5; FR-RULE-001 |

#### 22.1.2 The mechanism decision

| Option | What it is | Verdict | Reason |
| --- | --- | --- | --- |
| **M1 — Artefact plus guided checklist** | The product generates and pre-validates the artefact, renders the portal form-control values and a step list, and captures the acknowledgement back | **Adopted, always on** | The universal floor; the path Zoho Payroll's own help documentation describes for Form 24Q, with the employer uploading the `.fvu` (r3/05 finding 28; captured September 2026, documentation read, product not executed) |
| **M2 — Managed operator workspace** | A named operator works the portal in a locked-down, recorded-by-event browser workspace; credentials are injected from the vault and never displayed; the runbook drives the step list and the evidence capture | **Adopted for Mode C, fenced on counsel** | Gives the scope enforcement, logging and credential hygiene of P6–P8 without automating any portal act |
| **M3 — In-session assistance** | Inside an M2 session, with the human present for login, CAPTCHA and OTP, the workspace fills known fields or attaches the file | **[Hypothesis], P2** | Saves minutes on the dominant COGS line, but portal terms of use are unknown (Part D-17 Q2). Kill criterion as §16.5: if portal anti-automation or terms make it fragile or non-compliant, drop it and stay at M2 |
| **M4 — Customer-side agent** | Software installed at the employer to perform a step locally | **Only where a step is physically bound to the employer** — the signatory's DSC token, or a desktop utility the portal requires to run at the deductor | The incumbent certificate flow drives an eToken through a desktop signer application (r3/02 finding 24; greytHR documentation captured September 2026, read, product not executed); a DSC is never moved to us |
| **M5 — Unattended robotic automation** | A service that logs in and submits without a present human | **[Killed]** | CAPTCHA on login (r3/05); K-13; no CAPTCHA is ever bypassed |

**FR-OPS-001 · Delivery modes, set per registration and per portal** · **P0** (Modes A, B) · **R2 · F-08** (Mode C) · **P1** (Mode D)
Every registration (PF establishment code, ESI code, PT registration, TAN) shall carry a
delivery mode per portal, and every session shall run in exactly one mode.

| Mode | Who is signed in to the portal | Whose credentials | What we do | Availability |
| --- | --- | --- | --- | --- |
| **A — Employer-attended** | The employer's own user | The employer's; never held by us | Artefact, pre-validation, form-control values, checklist, deadline clock, evidence import | Always; the launch posture while Mode C is fenced (§05.7) and the fallback for every session that cannot complete |
| **B — Co-attended** | The employer's user drives; our operator guides live and never operates the portal | The employer's; never held by us | Everything in A, plus live guidance and the reconciliation at each gate | Always; the first-submission protocol (FR-OPS-011) |
| **C — Operator-attended** | Our compliance operator, in the managed workspace (M2) | The employer's, checked out of the vault under written authority | Runs the runbook within scope; stops at every instruction-gated act for the named approver; hands the payment leg and any DSC-bound act to the employer | Per portal, once counsel clears Part D-17 Q1–Q4 and liability allocation (§22.2.3) |
| **D — CA-attended** | The customer's Chartered Accountant | Whichever credentials the client authorises the CA to use; if held in our vault, under a written authority naming the CA organisation and its named individuals | The CA console (§15.3.6), the same runbooks and the same log | P1; depends on the CA channel validating (§20 V-05) |

- **AC-001.1** — A session cannot open in Mode C for a portal whose fence `F-08[portal]`
  (§05.18) is not recorded as cleared. The fence clears only when the counsel register
  shows CR-17a to CR-17f answered for that portal (FR-LEG-040), an executed authority
  instrument covers the registration (FR-LEG-035) and the liability clause is in the
  customer's contract (FR-LEG-034) — plus CR-17c for the income-tax upload. Otherwise the
  request falls back to Mode A with the reason shown.
- **AC-001.2** — Switching a registration's mode is an audited event with actor, reason and
  effective date; a switch never strands an open filing instance — in-flight sessions
  complete or hand back first.
- **AC-001.3** — For every filing instance, whatever the mode, the artefact and its
  checklist are downloadable by the employer's authorised roles (P3).
- **AC-001.4** — The mode in which each filing was submitted is stored on the filing and
  shown on the filing calendar (§08 FR-PAY-710). §14.4.5 defines `submission_mode ∈
  {employer, operator_under_written_authority}`; until that field carries the delivery mode
  itself (§22.12 O19), the mapping is: Modes A and B, and a Mode D session in which the CA
  uses its own arrangement with the client, record `employer`; Mode C, and a Mode D session
  using credentials in our vault, record `operator_under_written_authority`. The session log
  (FR-OPS-008 `mode`) always holds the exact mode.

#### 22.1.3 The mode resolver

FR-OPS-001 sets a *configured* mode per registration and portal. What actually runs is the
**resolved** mode, and the difference matters: a configured Mode C whose fence is open, whose
authority has lapsed, whose credential is stale or whose runbook is suspended must not silently
become "the operator does it anyway", and must not silently become "nobody does it". The
resolver is the single place that decision is made, and it is a pure function of recorded
state — never an operator's judgement and never a support override.

<!-- DIAGRAM: compliance-operations-mode-decision -->

**FR-OPS-032 · The mode resolver** · **P0**
For every session request the product shall resolve a delivery mode from the inputs below by
the first matching rule, record the resolved mode with its reason code on the session and in
the on-behalf log, and offer no path by which a person selects a mode directly.

| Input | Source | Values |
| --- | --- | --- |
| `configured_mode` | The registration × portal setting (FR-OPS-001) | A, B, C, D |
| `instance_state` | The filing instance (FR-PAY-711) | including BLOCKED, VALIDATED, approved-artefact hash |
| `fence_state[portal]` | The fence register, derived from the counsel register (AC-001.1, AC-001.5) | open, cleared |
| `authority_state` | The written authority (FR-OPS-002) | none, DRAFT, SENT, SIGNED, ACTIVE, SUSPENDED, REVOKED, EXPIRED — with its registration, action and date scope |
| `credential_state` | The vault (FR-OPS-023) | absent, PROPOSED, VALIDATED, ACTIVE, STALE, SUSPECT, REVOKED |
| `runbook_state` | The runbook version (FR-OPS-019) | DRAFT, IN_REVIEW, PUBLISHED, SUSPENDED, RETIRED; plus whether `unknowns[]` is empty |
| `operator_roster` | Desk roster and certifications (FR-OPS-026) | whether a certified operator for this runbook version is rostered inside the window |
| `lead_minutes` | Due date minus now (FR-OPS-027) | against `ops.min_lead_minutes_for_mode_c` |
| `otp_contact_on_duty` | The authority's named OTP contacts and the roster (FR-OPS-022) | true, false |
| `guidance_elected` | A tenant setting: whether it accepts operator guidance when Mode C cannot run | true, false — false means the fallback is Mode A |
| `ca_grant` | The cross-tenant grant (§15.3.6; FR-OPS-029) | none, active with scopes |
| `first_submission_done` | Whether this tenant has filed this artefact type live (FR-OPS-011) | true, false |

**The resolution table. First match wins; evaluation stops there.**

| # | Condition | Resolved | Reason code |
| --- | --- | --- | --- |
| MR-1 | `instance_state` is BLOCKED, or the artefact hash is not the approved hash | *no session* | `instance_blocked` |
| MR-2 | `configured_mode` is A, or the tenant has elected employer-only for this portal | A | `configured_mode_a` |
| MR-3 | `fence_state[portal]` is open — including `F-08[income-tax]` without CR-17c | B if `guidance_elected`, else A | `fence_open` |
| MR-4 | No ACTIVE authority covering this registration, action code and date | B if `guidance_elected`, else A | `authority_not_in_force` |
| MR-5 | The authority is SUSPENDED | B or A as MR-4 | `authority_suspended` |
| MR-6 | `credential_state` is not ACTIVE and validated within `vault.credential_freshness_days` | B or A as MR-4 | `credential_not_usable` |
| MR-7 | The runbook is not PUBLISHED, or its `unknowns[]` is non-empty (AC-011.2, AC-019.1) | B | `runbook_not_publishable` |
| MR-8 | No operator certified on this runbook version is rostered in the window | B if a senior operator can guide, else A | `no_certified_operator` |
| MR-9 | `lead_minutes` below `ops.min_lead_minutes_for_mode_c` | A, with the desk lead escalation of AC-007.1 | `insufficient_lead` |
| MR-10 | No named OTP contact on duty across the window | A | `no_otp_contact` |
| MR-11 | `ca_grant` active and Mode D elected for this registration | D | `ca_channel` |
| MR-12 | This artefact type has no completed live submission for this tenant | B | `first_submission_protocol` |
| MR-13 | Otherwise | C | `resolved_mode_c` |

- **AC-032.1** — The resolver is deterministic and replayable: given the recorded inputs, a
  past resolution reproduces exactly, which is what lets a dispute be answered with "this is
  why your February ECR ran in Mode A".
- **AC-032.2** — There is no operator, support or admin action that sets a resolved mode.
  A configured mode can be changed only as AC-001.2 specifies, by an audited act with a
  reason, and it changes the *input*, never the output.
- **AC-032.3** — Every resolution below the configured mode notifies the tenant's designated
  contact and the filing desk with the reason code and the owner who can clear it, before the
  session would have started. A silent downgrade is a reportable defect.
- **AC-032.4** — The resolver re-runs at every step boundary of an open session. Re-running
  may only move a session *down* (C to B or A, B to A) or abort it; it can never promote a
  running session to a mode with more of our access in it.
- **AC-032.5** — Reason codes are a closed, versioned enumeration. They are the categories
  the mode-mix measure (`mode_mix`, §22.7) and the SLA narrative (§05.12) are reported in, so
  a new code is a schema change with an owner, not a free-text string.
- **AC-032.6** — Two sessions for the same registration × portal cannot be open at once: the
  second request is refused with the first session's identifier, whatever the modes. Whether
  any of these portals tolerates a concurrent sign-in is not established, and each portal's
  lockout policy is itself unknown (`portal.lockout_policy`, §22.12 O6) — so the product does
  not find out on a customer's account.

**A worked resolution.** A tenant with three registrations in the same mid-month window, all
configured Mode C, on the day `F-08[EPFO]` has cleared and `F-08[income-tax]` has not:

| Registration | Inputs that differ | Resolved | Reason code | What the tenant sees |
| --- | --- | --- | --- | --- |
| PF code, ECR for the wage month | All gates pass; the tenant filed its first ECR live in Mode B last month | C | `resolved_mode_c` | The session on the calendar with its named operator and backup |
| TAN, Form 138 Q2 statement | The income-tax fence is open on CR-17c | B | `fence_open` | "Your user uploads the `.fvu`; our operator guides and reconciles", with the counsel-register reference |
| Maharashtra PTRC return | The state runbook is PUBLISHED but the rostered operator is certified on the previous major version | B | `no_certified_operator` | The same guided session, and the desk's recertification task named as the thing that changes it next cycle |

The tenant's `mode_mix` for that window is therefore one Mode C and two Mode B instances —
and the three reason codes are the evidence for why the supervised minutes landed where they
did, which is exactly what §22.7's cost model needs to avoid mistaking a fence for an
efficiency.

---

### 22.2 The written authority to act, and liability allocation

#### 22.2.1 What the authority is

The written authority to act is the instrument under which our operator may sign in to a
portal as the employer and perform named acts. It is a customer-facing legal document, so
its wording is product surface with a named owner and requires counsel clearance
(Part D-20). The product specifies its **structure and lifecycle**; counsel owns its
**words** (§23).

**FR-OPS-002 · Written authority to act — instrument and lifecycle** · **R2 · F-08**
The product shall hold each written authority to act as a versioned object, generated only
from a counsel-cleared template version, signed by the employer's authorised signatory,
and enforced by the session gate (FR-OPS-003). The elements below are the product's
structure for the minimum content §23.13.4 requires (FR-LEG-035); where the two differ,
§23.13.4 governs the instrument and this table governs what the product enforces.

| Element | Specification |
| --- | --- |
| **Parties** | The employer legal entity (the `Employer` of §14.2, by PAN/TAN); its authorised signatory by name and designation; our contracting entity |
| **Registrations** | An explicit list — PF establishment codes, ESI codes, PT registrations by state (Maharashtra's PTRC and PTEC separately, §16.5.4), LWF registrations, TAN. A registration not listed is out of scope |
| **Portals and acts** | An explicit list of action codes per portal (FR-OPS-003). Acts not listed are out of scope |
| **Always-excluded acts** | Completing any payment through a bank channel; operating any DSC; entering or changing an Aadhaar number; changing the portal account's registered mobile, email, authorised-signatory details or password (other than a rotation the employer instructs, FR-OPS-023); accepting portal terms or declarations that the employer has not reviewed |
| **Instruction-gated acts** | Acts that are irreversible or legally declaratory, which the operator performs only on a named approver's hash-bound instruction (FR-OPS-004). Generating a payment challan (EPFO TRRN challan, ESIC or PT challan) is listed separately and is out of scope unless named, because §23.13.4 makes payment initiation the customer's act by default and whether challan generation initialises EPFO's "payment process" is unconfirmed (§22.4.1 step 13) |
| **Named contacts** | The named approver(s) for instruction-gated acts; the OTP contact(s) who receive portal OTPs on the registered mobile or email and relay them per session |
| **Validity** | Start date, end date, and automatic lapse on contract end; renewal creates a new version |
| **Non-delegation acknowledgement** | The employer's and deductor's statutory liability stays with them (K-13); our obligation is set by §22.2.2 |
| **Revocation** | By the signatory at any time, effective on receipt; an in-flight session is aborted at the next step boundary (FR-OPS-030), and Mode C is disabled for every covered surface within `authority_revocation_sla_minutes` (FR-LEG-035 AC2) |
| **Template version** | The counsel-cleared template version the instrument was generated from; the product refuses to generate from an uncleared version |

States: **DRAFT → SENT → SIGNED → ACTIVE → (SUSPENDED ↔ ACTIVE) → REVOKED or EXPIRED**.
SUSPENDED is set automatically when a named contact leaves the employer (§07 exit), when
credential validation fails `vault.suspend_after_failed_validations` times (FR-OPS-022), or
when a security event touches the tenant, and clears only on the signatory's confirmation.

- **AC-002.1** — No Mode C session can reach CHECKED_OUT (§22.3) without an ACTIVE
  authority whose registration list, action list and validity window cover the requested
  act.
- **AC-002.2** — Every authority version is retained with its signature evidence for the
  life of every filing submitted under it, and each filing records the authority version
  (`authority_to_act_document_id`, §14.4.5).
- **AC-002.3** — An authority generated from a template version that the counsel register
  does not mark cleared is refused at generation, not at use.
- **AC-002.4** — Revocation takes effect for new sessions immediately and for an open
  session at its next step boundary; the revocation and every abort it causes appear in the
  customer's log (FR-OPS-008).

**FR-OPS-003 · Scope enforcement on every action** · **R2 · F-08**
The managed workspace shall offer an operator only the runbook steps whose action code,
portal, registration and date fall inside the ACTIVE authority, and shall block any other.

| Action-code family | Examples (per-portal codes are runbook data, §22.4.6) | Gate |
| --- | --- | --- |
| `*.SIGN_IN` | Sign in to the EPFO establishment account; to the ESIC employer portal; to the income-tax portal as the deductor; to a state PT account | Authority ACTIVE; credential checked out |
| `*.UPLOAD` | Upload the ECR return file; the ESIC contribution template; the `.fvu`; a PT return | Artefact VALIDATED and approved in-product (AC-FP-2, §12.4) |
| `*.DECLARE` | Approve or reject an EPFO return statement; submit a PT return; mark a date of exit | Instruction-gated (FR-OPS-004) |
| `*.PAYMENT_HANDOFF` | Generate the EPFO challan with TRRN; generate an ESIC or PT challan | Instruction-gated; bank leg always the employer's (P5) |
| `*.DOWNLOAD` | Return statement, Due Deposit Balance Summary, receipt, acknowledgement, error file, TRACES certificate | Authority ACTIVE |

- **AC-003.1** — An operator attempt to open a portal, registration or action outside the
  authority is refused by the workspace, logged as a scope-breach attempt, and raised to the
  filing desk lead the same day.
- **AC-003.2** — The workspace binds each uploaded file to its registration: an ECR built
  for PF code X cannot be offered for upload in a session signed in to PF code Y (§22.11
  scenario 6).

**FR-OPS-004 · Instruction-gated acts, bound to the object** · **P0**
An act that is irreversible or declaratory shall be performed only after the named approver
instructs it against the exact object the portal rendered, identified by hash.

| Portal act | Why it is gated | Object the instruction is bound to |
| --- | --- | --- |
| Approve an EPFO return statement | An approved return can never be cancelled (EV-036) | The return statement as rendered, reconciled line for line to the locked snapshot |
| Generate the EPFO challan and hand off to payment | From payment initiation a Revised return is impossible (EV-037); s.7Q interest is mandatory with the contribution (EV-039) | The Due Deposit Balance Summary with its contribution, interest, damages and charges lines |
| Mark a member's date of exit | A wrongly recorded exit date needs a joint declaration by employer and employee to correct (EV-041) | The member, the date and the reason |
| Upload a Form 138 statement | A filed statement is corrected only by a correction statement on the period's format family (EV-052; FR-PAY-708) | The `.fvu` output and its FVU validation result |
| Submit a state PT or LWF return | Irreversibility is state-specific and unverified, so every state is treated as irreversible until its runbook says otherwise | The return values and the challan amount |
| Generate an ESIC or PT challan | Money is owed on the amount shown | The challan amount |

- **AC-004.1** — An instruction whose object hash does not match the object on screen at
  the moment of the act is void; the workspace re-captures and asks again.
- **AC-004.2** — The approver sees the product's reconciliation result for the object
  before instructing: every difference from the locked snapshot is itemised, with the
  s.7Q interest line shown as mandatory and s.14B damages as payable now or later at the
  employer's option (EV-039).
- **AC-004.3** — The approver cannot be the operator, and in a CA-attended session cannot
  be the CA user performing the act (NFR-SEC-202 maker ≠ checker).
- **AC-004.4** — Every instruction requires the approver's step-up re-authentication,
  whatever the age of their session, as approving a statutory return does (NFR-SEC-103).

#### 22.2.2 Liability allocation — what we owe, and what we never take on

The r5 counsel review found no contract term anywhere allocating liability for a rejected
or wrong filing back to the employer, and called it "the single most important commercial
term implied by the entire positioning". The allocation below is the product position; the
legal allocation, the cap, the indemnity and insurability are counsel's (Part D-17,
Part D-20, §23), and nothing here is a statement of law.

| Layer | Who bears it | What the product does about it |
| --- | --- | --- |
| **Statutory liability** — the obligation to deduct, deposit, return and certify, and the interest, damages, fees and penalties for failure | The employer and the deductor; non-delegable (K-13) | Makes the risk visible and small: pre-validation at the portal's own severity (EV-040), the verification gate before payment (EV-037), deadline warnings with lead time (§05.9) |
| **Our service obligation** | Us | A portal-accepted artefact in the period's notified format, plus best-efforts attended, assisted submission under the written authority, on or before the due date where the employer has approved and funded it (§05.9) |
| **The contractual remedy** | Us, capped | Where a miss is product-caused (§05.9 taxonomy), the remedy §18.3 defines, capped by `sla_remedy_cap_months` (§18.3; set in §20) |
| **Our own exposure from acting on portals** — including any direct exposure | Unresolved | Not stated either way; it is a counsel question (Part D-3, Part D-17, §23) |
| **Tenant-caused misses** — unfunded remittance, unapproved run, wrong data supplied | The employer | The product's duty is timely warning, not payment (§05.9) |
| **Authority-caused misses** — portal outage, unpublished format | Neither | File in the next available window; disclose (§05.9) |

**FR-OPS-005 · The causation record on every filing** · **P0**
Every filing instance shall carry a machine-readable causation record from which a penalty
claim can be adjudicated as product-caused, tenant-caused or authority-caused without
dispute — the acceptance criterion §18.3 sets for the remedy.

| Field | Meaning |
| --- | --- |
| `data_supplied_by`, `data_supplied_at` | Who supplied each input that drove a disputed figure (from the §08 audit trail, FR-PAY-1001) |
| `generated_at`, `format_version`, `rule_set_version` | When the artefact was generated, on which format and rule versions (FR-PAY-711 F4) |
| `approved_by`, `approved_at` | The in-product approval of the artefact (§12.4.1 step 5) |
| `instructions[]` | Each instruction-gated act: approver, timestamp, object hash (FR-OPS-004) |
| `submitted_by`, `submission_mode`, `authority_version`, `session_id` | Who submitted, in which mode, under which authority (§14.4.5) |
| `funded_at`, `payment_initiated_by` | When the employer funded and initiated payment (P5) |
| `ack_refs[]` | Return file ID and TRRN (EV-036); Return Receipt Number (EV-051); challan or receipt numbers |
| `blockers[]` | Every BLOCKED or HANDED_BACK episode, its reason, who owned it and when it cleared |
| `miss_class` | Product-caused, tenant-caused or authority-caused, set by the §05.9 root-cause review, never by default |

- **AC-005.1** — For any filing, the causation record renders as one signed statement the
  employer and we can both read; it is assembled from the audit trail and the session log,
  not typed afterwards.
- **AC-005.2** — `miss_class` cannot be set without a linked root-cause note by someone
  other than the operator who ran the session.

#### 22.2.3 The four counsel questions, and what each answer does to the product

Part D-17 lists four legality questions plus liability allocation and insurability. None is
answered in this PRD. Each is mapped here to the product consequence of a negative or open
answer, so fence F-08 (§05.7; §05.18) is operational rather than rhetorical.

§23.13.2 registers the same questions as CR-17a to CR-17f; the "#" column gives both
labels. §23.13.3 letters its two launch modes differently — its "Mode A" is any
employer-operated submission, which covers this section's Modes A and B, and its "Mode B"
is this section's Mode C (§05.17 ruling PR-10: §22's letters are canonical). Mode B here
never places a credential in our hands or a portal act in our operator's, so it sits on
the employer side of every row below.

| # | Question (Part D-17) | What depends on it | If negative or still open at launch |
| --- | --- | --- | --- |
| Q1 (CR-17a) | May our operator act on EPFO, ESIC, the income-tax portal and state PT portals under the employer's credentials? | Mode C on every portal | Mode C does not launch; Modes A and B carry v1; the SLA narrows to artefact readiness and warning lead time (§05.12) |
| Q2 (CR-17b) | Do each portal's own terms of use permit third-party use of the employer's credentials? | Mode C per portal; M3 on every portal | Mode C is disabled for that portal only; M3 is dropped for it |
| Q3 (CR-17c) | Does filing a TDS statement for a deductor engage the e-Return Intermediary route? The income-tax portal lists "API Specifications" under e-Return Intermediaries, but the pages were not readable and such schemes have historically covered income-tax returns, not TDS statements (r3/05 finding 29) | Mode C for the `.fvu` upload | The upload stays with the deductor (Mode A or B); if a registration route exists and is required, it becomes a corporate decision with its own §20 item |
| Q4 (CR-17d) | How must the authorised signatory's personal DSC be handled? | Every DSC-bound step (certificate signing; any portal step that demands a DSC) | Already decided conservatively: we never hold, copy or operate a DSC (P6); a DSC-bound step is always the signatory's, through M4 at their end |
| — (CR-17e, CR-17f) | Liability allocation and insurability | The remedy cap, the indemnity scope, the price of the SLA | The remedy stays capped and causation-bound (§18.3); if uninsurable as designed, the SLA is re-priced on submission and maintenance alone (§18.3 kill criterion) |

- **AC-001.5** (extends FR-OPS-001) — The counsel register (§23.16) holds CR-17a to
  CR-17f per portal, with owner and status, and answers flow through the rule pipeline
  (FR-LEG-040); the Mode C gate (AC-001.1) reads the `F-08[portal]` fence state derived
  from those rows, never a configuration flag an operator can edit.

Aadhaar sits beside these questions. Whether an employer entering Aadhaar into EPFO or
ESIC portals is a "requesting entity" is itself a counsel question (Part D-7, §23). The
product's position does not depend on the answer: our operator never enters an Aadhaar
number on any portal on an employer's behalf, UAN allotment has been employee-driven
through Aadhaar face authentication in the UMANG app since 1 August 2025 except for
International Workers and citizens of Nepal and Bhutan (EPFO circular of 30.07.2025, r4/04
finding 7 — a single-source finding the r4 critic asked to re-verify; §16.5.1; FR-T-O07), and
an employee who declines Aadhaar is excluded-and-flagged on the affected filing, never
blocked from payroll — the Part E-11 default, whose final choice among the alternatives is
counsel's (§23; AC-701.2).

#### 22.2.4 Adjudicating a miss from the causation record

§05.9 defines the three miss classes and the two boundary rules that decide when a line is
inside the SLA (SS-1) and when a tenant's own lateness makes a miss theirs (SS-3). §18.3
defines the remedy. Neither says **how a class is determined from the record**, and without
that the taxonomy is an opinion: every party to a missed deadline has a story, and the
expensive ones arrive months later. This subsection is the procedure, run off FR-OPS-005's
causation record and nothing else.

<!-- DIAGRAM: compliance-operations-miss-adjudication -->

**FR-OPS-033 · Miss adjudication** · **P0**
When a filing instance passes its due date without reaching FILED, the product shall open a
miss review automatically, assemble the evidence predicates below from the causation record
and the on-behalf log, propose a class by the ordered rules, and hold the instance
unclassified until a named person other than the session's operator confirms it
(AC-005.2).

**The predicates, and what each one is proved by.** A predicate that cannot be evaluated from
stored evidence is not assumed either way — it is reported as missing, which is itself a
finding about the record.

| Predicate | Proved by | Missing means |
| --- | --- | --- |
| `in_sla` | The coverage-statement version in force on the due date (§05.21) plus SS-1's lead rule | The line was never promised; the instance goes to the coverage-gap register, not to a class |
| `warned_in_time` | The stored notice and its send record, timestamped before `tenant_action_lead[family]` (§05.9 SS-3) | **Treated as not warned.** An unstored notice is no notice — the same rule §05.9 DC-4 applies to carve-outs |
| `tenant_action_late` | `approved_at`, `funded_at`, `payment_initiated_by`, instruction timestamps, input-supply timestamps in `data_supplied_at`, and the authority's own lifecycle events — a revocation or suspension is a tenant act like any other | The tenant's step cannot be shown late, so this predicate is false |
| `authority_evidence` | A captured portal error, an outage notice captured in session, a BLOCKED reason whose trigger is a named watch key (FR-RULE-006), or an unpublished format on a fence | **The class is not available.** Authority-caused is the only class requiring affirmative evidence |
| `queue_failure` | An approved and funded instance inside our queue at `ops.handback_cutoff_minutes_before_due` with no delivered hand-back package (AC-028.1) | Not established |
| `our_defect` | A wrong figure traced to a rule or engine version, a pack published after the effective date it needed (the §19.9 lead-time measure), a defective artefact, or a session error in the log | Not established |

**The ordered rules. First match wins.**

| # | Rule | Class | Note |
| --- | --- | --- | --- |
| AD-1 | `in_sla` is false | *not a class* | Coverage-gap register with its cause (§05.9 DC-6); never counted as a success anywhere |
| AD-2 | `tenant_action_late` is true **and** `warned_in_time` is false | Product-caused | SS-3 makes the warning the precondition for charging a tenant with its own lateness: without it, what the tenant did is irrelevant |
| AD-3 | `tenant_action_late` is true and `warned_in_time` is true | Tenant-caused | The warning evidence and the tenant's timestamps are attached to the statement |
| AD-4 | `authority_evidence` is true | Authority-caused | Next available window planned; disclosed (§05.9) |
| AD-5 | Authority cause asserted but not evidenced | `UNCLASSIFIED_PENDING_EVIDENCE` proposed | The proposal pauses here; the review does not. The reviewer continues down the list, and where AD-6 or AD-7 is satisfied on the evidence, that class is recorded (the third worked adjudication). AD-5 stands only if nothing below it is satisfied either |
| AD-6 | `queue_failure` is true | Product-caused | The hand-back is the promise that makes Mode C safe; failing to deliver it is our failure, not the portal's |
| AD-7 | `our_defect` is true | Product-caused | — |
| AD-8 | None of the above | `UNCLASSIFIED_PENDING_EVIDENCE` | Never resolves to a class by default or by elapsed time |

- **AC-033.1** — The class the rules propose is shown with the predicate values and the
  evidence references that produced it; the confirming reviewer either accepts it or records
  a different class with reasons, and the difference between proposed and confirmed classes
  is itself reported monthly. A review that only ever accepts the proposal is not a review.
- **AC-033.2** — `UNCLASSIFIED_PENDING_EVIDENCE` has no timeout to a class. It stays open,
  it appears in the desk's open-review list, and it is excluded from the product-caused miss
  rate's numerator *and* its denominator, so an unclassified miss can never flatter the
  metric (§19.1).
- **AC-033.3** — The review opens within `ops.miss_review_open_minutes` of the due date
  passing, and the tenant receives the statement — class, evidence, what happens next, and
  the remedy position — within `ops.miss_statement_days`. Both are routed to §20.
- **AC-033.4** — The statement is generated from the causation record, not written freehand
  (AC-005.1), and its figures come from the engine (§12.8.1). Where the tenant disputes the
  class, the signed export of AC-008.3 is the artefact the dispute runs on, and a liability
  dispute routes to counsel (Part D-17; §23), never to the desk.
- **AC-033.5** — An adjudication is never made by the operator who ran the session, by the
  author of the rule version in question, or by anyone whose work the class would assign
  blame to; the desk lead's own sessions are adjudicated by the statutory desk lead.
- **AC-033.6** — A warning that was late, missing or unstored is recorded as a product defect
  and reviewed as one **whatever class the miss takes** — including a miss classified
  authority-caused. AD-2's ordering decides who bears the miss; it does not decide whether our
  warning obligation was met.

**Three worked adjudications.** Each shows the trail, not the verdict alone.

| Case | The record shows | Rule | Class |
| --- | --- | --- | --- |
| An ECR whose challan was generated on the due date and paid two days later | Notice stored and sent with the family's full lead; `approved_at` inside the window; `funded_at` after the due date; no portal error captured | `warned_in_time` true, `tenant_action_late` true → AD-3 | Tenant-caused. The statement carries the notice, its send record and the funding timestamp |
| A Form 138 statement generated on a format version published after the quarter's effective date | The pipeline log shows the pack's DETECTED-to-PUBLISHED span crossing the date it was needed; the §19.9 lead-time measure records the same span; no tenant act was late | AD-2 and AD-3 do not fire — `tenant_action_late` is false; AD-4 false; AD-6 false; AD-7 true | Product-caused. The remedy runs, and the pipeline failure is a FR-RULE-019 containment review, not only a customer credit |
| A Mode C ECR session that could not sign in on the due date, the operator recording "portal down" | No captured portal message, no outage notice, no error file; the instance was approved and funded and still in our queue at the cut-off; no hand-back package was delivered | AD-4 unavailable → AD-5; then the desk lead's review finds AD-6 satisfied | `UNCLASSIFIED_PENDING_EVIDENCE` first, then **product-caused** on AD-6. An operator's assertion is not authority evidence, and the missing hand-back is our failure whatever the portal did |

The third case is the one the rules exist for. It is also the reason AC-012.5 says a portal
outage is authority-caused "only when the outage is evidenced": the class that costs us
nothing is the class that must be proved, not the class that is assumed.

---

### 22.3 The attended session — the protocol every runbook shares

Every portal runbook in §22.4 is an instance of one session protocol. The protocol exists so
that the four things every reviewer asked about — authority, credentials, approvals and the
record — are enforced once, identically, for every portal.

<!-- DIAGRAM: compliance-operations-attended-session -->

**FR-OPS-006 · The attended-session state machine** · **P0** (Modes A, B) · **R2 · F-08** (Mode C)
Every attended session — one registration × portal × runbook × occasion — shall move through
explicit, logged states. The diagram illustrates; the table specifies. Modes A and B use the
same machine without the vault states (they skip CHECKED_OUT and the employer
authenticates).

| # | From → To | Event | Guard | Side effect | Who may trigger |
| --- | --- | --- | --- | --- | --- |
| S1 | *(none)* → REQUESTED | A filing instance reaches VALIDATED with an in-product approval, or a portal task is raised (§22.4.5) | The registration's mode for this portal is set (FR-OPS-001) | Queue item with due date and window (FR-OPS-027) | System |
| S2 | REQUESTED → READY | Pre-checks pass | Artefact hash equals the approved hash; no earlier month blocks this one (FR-PAY-712); no BLOCKED reason on the instance; for Mode C, an ACTIVE authority covers the act and a named OTP contact is on duty; the operator is certified on this runbook version (FR-OPS-026) | Pre-check record stored | System |
| S3 | READY → CHECKED_OUT | Operator starts the session (Mode C) | Operator not suspended; inside the authority's scope and window; runbook version not suspended for drift (FR-OPS-019) | Credential handle bound to the session; employer contact notified that a session has started; session timer starts (FR-OPS-010) | Assigned operator |
| S4 | CHECKED_OUT → AUTHENTICATING | Sign-in begun | — | The attending human solves any CAPTCHA; any OTP is requested from the OTP contact through an in-product prompt (FR-OPS-022) | Operator (Mode C); employer's user (Modes A, B) |
| S5 | AUTHENTICATING → IN_SESSION | Portal sign-in succeeds | — | Session log opened on the portal host | Operator or employer's user |
| S6 | AUTHENTICATING → HANDED_BACK | Sign-in fails once, or the OTP is not relayed within `ops.otp_wait_minutes` | — | No retry loop; credential marked "confirm with employer"; artefact and checklist handed to Mode A with the deadline clock | System |
| S7 | IN_SESSION → AWAITING_INSTRUCTION | The next runbook step is instruction-gated | — | The portal-rendered object (return statement, Due Deposit Balance Summary, challan amount, the date of exit to be marked) is captured, hashed, reconciled by the product and presented to the named approver | System |
| S8 | AWAITING_INSTRUCTION → IN_SESSION | Named approver instructs | Approver is not the operator; the instruction is bound to the captured object's hash; for a payment hand-off, the month's verification gate has passed (FR-PAY-301 M10) | Instruction stored on the causation record (FR-OPS-005) | Named approver (customer) |
| S9 | AWAITING_INSTRUCTION → HANDED_BACK | Approver declines, asks for a change, or does not respond within `ops.instruction_wait_minutes` | — | Portal left at the last reversible point; reason recorded | Approver, or system on timeout |
| S10 | IN_SESSION → EVIDENCE_PENDING | The runbook's closing step is reached | — | Acknowledgement objects downloaded or captured | Operator or employer's user |
| S11 | EVIDENCE_PENDING → CLOSED | Evidence stored and reconciled | Each acknowledgement parses and ties to the artefact and the locked snapshot | The FR-PAY-711 transition for the instance is recorded; credential checked in; timer stops | System |
| S12 | Any active state → ABORTED | Operator abort; scope breach; authority revoked; security event; runbook drift detected mid-session | — | Credential checked in and the workspace session destroyed; incident triage opened when security-related (FR-OPS-025) | Operator, system or filing desk lead |
| S13 | Any active state → EXPIRED | `ops.max_session_minutes` exceeded | — | As S12, reason "expired" | System |
| S14 | HANDED_BACK or ABORTED → *(new session)* | Retry, or the employer takes it in Mode A | The instance's due date has not passed, or the late path is chosen with the late-exposure shown (FR-PAY-710 AC-710.3) | New session linked to the prior one | Filing desk lead, or employer |

- **AC-006.1** — No session skips a state; a Mode C session cannot reach IN_SESSION without
  CHECKED_OUT, and cannot reach CLOSED without stored evidence.
- **AC-006.2** — Every transition writes a log entry (FR-OPS-008) in the same transaction as
  the state change, on NIC/NPL-synced time (NFR-CERT-603).
- **AC-006.3** — The machine never advances a filing instance past its FR-PAY-711 guards: it
  records F6, F7, F9, F14 and F15/F16 transitions when the evidence exists; it has no power
  to mark FILED on an operator's say-so.

**FR-OPS-007 · Pre-session checks** · **P0**
Before a session reaches READY, the product shall evaluate, and show the operator and the
employer, every condition that would make the session fail or do harm.

| Check | Source | If it fails |
| --- | --- | --- |
| Artefact hash equals the approved artefact hash | AC-FP-2 (§12.4) | No session; the operator cannot upload an unapproved file |
| Chronology: no earlier wage month for this EPF establishment lacks a return, and the M−4 rule is satisfied | EV-038; FR-PAY-712 | No session; the earlier month is raised first |
| No pending joint declaration for any member whose exit date blocks this month | EV-041 | Session proceeds only for members not blocked; the blocked members are named |
| Exclude-and-flag list acknowledged by the operator and the approver | AC-701.2; Part E-11 | No session until acknowledged |
| Form-control values prepared — Wage Month, Return Type, Contribution Rate, Remark for the ECR | EV-035; AC-701.5 | No session |
| Packaging — alphanumeric filename, lowercase `.txt`, at most 8 MB, compressed above 2 MB, exactly one text file per zip | r5/02 finding 5 | Repackaged automatically; otherwise no session |
| For Form 138: `.csi` imported; TAN and TAN name match; FVU and RPU stack matches the statement's period | r5/02 finding 30; EV-052 | No session |
| Filing instance not BLOCKED (format unpublished, regime unresolved) | FR-PAY-711 F2 | No session; the blocker and its trigger are shown |
| For Mode C: authority ACTIVE; OTP contact on duty in the window; credential validated within `vault.credential_freshness_days` | FR-OPS-002, FR-OPS-022, FR-OPS-023 | Falls back to Mode A with the reason |
| Due-date window: time to due date exceeds `ops.min_lead_minutes_for_mode_c` | FR-OPS-027 | Escalated to the filing desk lead; Mode A handback prepared in parallel |

- **AC-007.1** — Each failed check names the owner who can clear it and the latest time it
  can be cleared without missing the due date.

#### 22.3.1 The "what we did on your behalf" log

r3/05 asked for "an operator-visible 'what we did on your behalf' log"; the r3 critic
called the credential exposure "existential and possibly criminal" if mishandled. The log is
the customer's view of every act performed under their authority, and it is the evidence
base for the causation record (FR-OPS-005).

**FR-OPS-008 · The on-behalf log** · **P0**
Every session event in every mode shall be written to an append-only, hash-chained log that
the employer's authorised roles can read, filter and export.

| Field | Content |
| --- | --- |
| `entry_id`, `prev_hash` | Chained per tenant, as NFR-SEC-401 chains the audit log |
| `tenant_id`, `employer_id`, `registration_ref`, `filing_id` | What the act was for (`filing_id` is null for a portal task, §22.4.5) |
| `session_id`, `runbook_id@version`, `mode` | Which session, under which runbook version, in which mode |
| `actor` | The named operator (shown to the customer by name and staff identifier), the employer's user, or the CA user with the CA organisation |
| `authority_version` | The written authority in force (Mode C, D) |
| `credential_handle` | The vault handle checked out — never the secret (FR-OPS-021) |
| `portal_host`, `action_code` | Where, and which scoped act (FR-OPS-003) |
| `object_hash` | Hash of the file uploaded or of the portal object acted on |
| `instruction_ref` | For an instruction-gated act: the approver, timestamp and hash bound (FR-OPS-004) |
| `outcome`, `portal_message` | Success, portal error, abort or handback, with the portal's own message text |
| `portal_refs[]` | Return file ID, TRRN, Return Receipt Number, challan or receipt number captured |
| `started_at`, `ended_at` | UTC and IST, on NIC/NPL-synced time (NFR-CERT-603) |
| `evidence_document_ids[]` | Stored acknowledgement documents (erasable class; their hashes stay on the filing, §14.6.1a) |

- **AC-008.1** — The employer's designated contact is notified when a Mode C session
  starts and when it ends, with a link to its log entries; there is no silent access.
- **AC-008.2** — No application path can update or delete a log entry; a chain break is
  detected by the chain-verification job (NFR-SEC-401), run at least nightly on this log,
  and raised as a security event.
- **AC-008.3** — An export of the log for a registration and period is a signed statement
  suitable for an inspection or a dispute, produced without engineering help.
- **AC-008.4** — The log never contains a credential, an OTP, a CAPTCHA image or an Aadhaar
  number (FR-OPS-009).

**FR-OPS-009 · Evidence capture** · **P0**
Each runbook shall name the evidence that closes it, and the workspace shall capture that
evidence in structured form.

- The primary evidence is the portal's own downloadable object — the return statement, the
  Due Deposit Balance Summary, the challan with TRRN, the payment receipt (EV-036), the
  Return Receipt Number (EV-051), a PT or LWF acknowledgement — stored as a `Document` with
  its hash on the filing (§14.4.5).
- Where a portal offers no downloadable acknowledgement, a screenshot of the acknowledgement
  region only is captured, with the reason recorded.
- The workspace records **structured events, not a continuous screen recording**: no
  keystroke capture, no video of the session. **[Hypothesis]** — event-level capture is
  enough for disputes and inspections. Kill criterion: if the first real dispute or
  inspection cannot be answered from the event log plus portal objects, add scoped screen
  capture of instruction-gated steps only, after a privacy review.
- Any captured region that would include an Aadhaar number is refused by the capture tool,
  and the operator records an attestation instead (Part E-6).
- A portal error file is captured raw. EPFO's error-file schema is undocumented and must be
  learned from a real rejection (r5/02), so the parser is built from captured files and
  routed to §20.

- **AC-009.1** — A session cannot reach CLOSED without the evidence its runbook names, or
  a filing-desk-lead-approved exception stating why the evidence could not be obtained.
- **AC-009.2** — Every stored acknowledgement is parsed and reconciled — return file ID
  and TRRN against the challan, the receipt against the bank debit where the employer
  shares it, the Return Receipt Number against the statement.

**FR-OPS-010 · Supervised-minute metering** · **P0**
Every session, in every mode, shall meter the human minutes it consumes, attributed per
registration × filing type × cycle — the unit on which the dominant COGS line scales
(EV-088).

- Session minutes run from CHECKED_OUT (Mode C) or the operator joining (Mode B) to CLOSED,
  HANDED_BACK or ABORTED; active minutes exclude waits on OTPs and instructions, which are
  metered separately as wait minutes.
- Preparation and exception minutes outside a session — reconciling a return statement,
  mapping an error file, chasing a joint declaration — are logged against the filing
  instance with a reason code.
- Mode A sessions meter any minutes our staff spend guiding or reconciling; a Mode A filing
  with no staff involvement meters zero.
- The meter emits events to the cost ledger (§15.6.4) and feeds the metric "Supervised
  Minutes per Filing Cycle" (§19.8).

- **AC-010.1** — For any registration and period, total supervised minutes reproduce from
  the event stream alone and reconcile to operator time records within
  `ops.minute_reconciliation_tolerance`.
- **AC-010.2** — Every minute is attributed to exactly one registration, filing type,
  cycle and reason code; unattributed minutes are a reportable defect.

#### 22.3.2 Session objects, their classes and what survives an erasure

The session protocol produces objects nobody else's section owns: §14 owns the employment,
rule and document model, §08 owns the filing instance, §16 owns what crosses the portal edge.
The objects below are this section's, and they are specified here as data so that §14 can
place them (routed, §22.12 O24) and so that Part E-2's rule — **bitemporality is scoped by
entity class, and erasable classes exist** — has a concrete answer for each one. The
governing constraint is that an act performed under someone's authority must remain provable
after the documents it produced are gone.

**FR-OPS-034 · Session objects and their retention classes** · **P0**

| Object | Key and cardinality | What it holds beyond FR-OPS-008's fields | Class (Part E-2) | Erasure and what replay returns |
| --- | --- | --- | --- | --- |
| `AttendedSession` | One per registration × portal × runbook version × occasion; 0..n per filing instance or portal task | Resolved mode and reason code, state (S1–S14), assigned operator and backup, timers, pre-check record | **Record of an act** — append-only, never erased, no personal data beyond references | Not erasable. Replay returns the session and its states in full |
| `SessionStep` | Ordered within a session | Action code, the FR-OPS-003 gate result, the portal object reference, portal message text, outcome | Record of an act | As above |
| `Instruction` | 0..n per session, 1..1 per instruction-gated act | Approver identity, timestamp, object hash, the act instructed, step-up re-authentication reference, the reconciliation result shown | Record of an act — the evidential core of FR-OPS-004 | Not erasable. If the object it bound to is later erased, the hash and the reconciliation summary remain, so the instruction stays verifiable against a hash the document no longer needs to exist to prove |
| `CredentialCheckout` | 0..n per session; Modes C and D only | Handle, checkout and checkin times, broker injection events, validation result | Record of an act; the secret itself lives only in the vault | Not erasable. Shredding the credential entry does not remove the record that it was used (FR-OPS-023) |
| `EvidenceCapture` | 0..n per session | A `Document` reference, its hash, the capture method, the runbook step it closes, the reason where a screenshot substituted for a download | **Erasable** — a rendered document, Part E-2 | Erasing the document leaves the capture row, its hash and its metadata. Replay returns "captured, erased on date D by process P", never a silent gap (§14.6.1a) |
| `HandbackPackage` | 0..1 per handed-back session | Artefact reference and hash, form-control values, checklist version, reconciliation so far, portal state text, delivery time and recipient | Record of an act, with an erasable document body | Erasing the body leaves the delivery record — which is the fact AD-6 turns on |
| `ModeResolution` | 1..1 per session request, plus one per step-boundary re-run | The input snapshot the resolver read, the matched rule, the reason code, the resolver version | Record of an act | Not erasable; this is what makes AC-032.1 replayable |
| `MissAdjudication` | 0..1 per missed instance | Predicate values with their evidence references, proposed class, confirmed class, reviewer, statement document reference | Record of an act | Not erasable; the statement body is erasable as a document |
| `OperatorCertification` | One per operator × runbook version | Certifier, date, scenario-test result, expiry, revocation with reason | Internal record | Retained for the life of every session it permitted |
| `ScopeBreachAttempt` | 0..n | The attempted portal, registration, action code, the authority that did not cover it, the raise to the desk lead | Security record | Not erasable; also an input to the access review (FR-OPS-026) |

- **AC-034.1** — No session object holds a credential, an OTP, a CAPTCHA, an Aadhaar number
  or a biometric template (AC-008.4, AC-022.1, FR-OPS-020). The lint that proves it is the
  one AC-020.1 already runs, extended to these tables.
- **AC-034.2** — The session log holds **references**, not employee records: a member blocked
  by a pending joint declaration is named on the filing instance (§08), and the log entry
  points at the instance. An employee-data erasure therefore never breaks the log chain.
- **AC-034.3** — For any erased evidence document, the on-behalf log, the causation record and
  the instruction that bound it still render; the export of AC-008.3 marks the document as
  erased with its hash and erasure date rather than omitting the row.
- **AC-034.4** — The retention floor for session records is the CERT-In requirement that ICT
  logs are retained **180 days within Indian jurisdiction** (EV-062; NFR-CERT-602). The
  retention period beyond that floor is `ops.session_record_retention_years`, unset here:
  Part D-11 bars stating any statutory retention period other than EV-054's central-sphere
  figures, and EV-054 governs statutory registers, not an operations log. The parameter is
  set with counsel against the life of the filings it evidences (§23; §20).
- **AC-034.5** — Every object above is reachable from the filing instance in one query, and
  from the registration and period in one query, because those are the two ways an inspection
  or a dispute asks for it (§22.4.8).

---

### 22.4 Portal runbooks

A runbook is the step-by-step specification of one attended act on one portal. §16.5 owns
what crosses the portal edge — the file layouts, the acknowledgements, the failure modes —
and §08 FR-PAY-711 owns the filing states. The runbook owns **who does what, in what order,
with which gate, and what is kept**. Each runbook below answers the same seven questions the
r5 reviews asked: who acts, on whose credentials, through what software, what is recorded,
what the customer sees and approves, what closes it, and what happens when it fails.

One rule governs every runbook's first use, and one list bounds which runbooks exist:

**FR-OPS-011 · The first-submission protocol** · **P0**
The first live submission of each artefact type for each tenant shall run in Mode B, with the
employer's user operating the portal and our operator guiding, and no runbook shall be
exercised against a production portal as a test.

- We are not aware of a sandbox on EPFO, ESIC, the income-tax portal or any state PT portal
  as of September 2026 (§05.8), and an approved ECR can never be cancelled (EV-036), so there
  is no such thing as a test submission.
- The first submission for each portal is also the capture session for any runbook fact
  still marked unknown (§22.4.2, §22.4.3): the operator records the observed screens as
  runbook evidence under the employer's consent, and the runbook moves to review
  (FR-OPS-019).
- **AC-011.1** — The once-per-artefact submission §05.8's pre-launch gate requires runs as
  this Mode B first submission, with its acknowledgement stored — under an ACTIVE written
  authority where Mode C has cleared, so the tenant can move to Mode C next. A Mode C
  session for that artefact type and tenant cannot open before it.
- **AC-011.2** — A runbook with any step marked "unknown — capture in session" can be run
  only in Mode B until the capture is reviewed and published.

**Runbook coverage at v1.** The portals and acts below are the v1 set, matching the
artefact register of §05.7 (rows A-01 to A-28) and the fence register of §05.18. A portal or
act absent from this list has no runbook, and the product offers Mode A only for it. A
runbook tagged R2 or R3 is authored when its fence clears (§05.18 on-clear work), never
earlier on a guessed portal flow.

| Portal | Runbook | Release tag (§05.7 artefact row) | Blocking facts |
| --- | --- | --- | --- |
| EPFO | ECR Regular return, approval, challan, payment hand-off, receipt | P0 in Modes A and B (A-01); Mode C R2 · F-08[EPFO] | EPFO error-file schema learned from a real rejection (r5/02; §20 V-23) |
| EPFO | Supplementary, Revised, NIL (Direct Challan Entry), 7Q/14B charges | P0 in Modes A and B (A-02, A-04); Mode C R2 · F-08[EPFO] | Post-payment upward revision unconfirmed (AC-708.2) |
| EPFO | Part-payment contribution file | P1, R2 (A-05) | — |
| EPFO | Arrear return | R3 · F-03 (A-06) | No public arrear layout (EV-043) |
| EPFO | Date-of-exit marking; establishment registration; UAN for International Workers | P0 (exit, C-33), P1 (others) | Registration and UAN screens captured in a live session |
| ESIC | Monthly contribution upload, challan, payment hand-off | P0 if F-05 clears before the gate, else R2 (A-08, C-12); Mode C R2 · F-08[ESIC] | Template columns, sign-in controls and DSC requirement unconfirmed (r3/05; F-05) |
| ESIC | Insured Person registration | P0, proposed (§22.12 O20) | As above |
| Income-tax portal | Form 138 Q1–Q3 statement `.fvu` upload (A-11) | P0 in Modes A and B; Mode C R2 · F-08[income-tax], which also needs CR-17c | Whether upload needs a DSC or EVC (r3/05) |
| Income-tax portal | Form 138 Q1–Q3 correction statement (A-12) | Generation P0; submission held on F-02 | The portal's own notice that Tax Year 2026-27 correction filing "will be enabled shortly" (r1/06 finding 33; r3/05 finding 29) |
| Income-tax portal | Legacy 24Q correction for FY 2025-26 and earlier (A-28) | **Deferred** — not in v1 unless its layout is captured through the pipeline (§05.22 re-entry) | The legacy correction layout is not in this PRD's evidence base; EV-052 names only its RPU 6.0 + FVU 9.5 stack |
| TRACES | Form 130 (ex-16) request, download, hand-off for signature | P0 for distribution (A-14, C-15); R3 · F-01 for Tax Year 2026-27 | Q4 format unpublished (EV-046) |
| State PT | Per state and per registration, only for states whose dataset row is state-primary-sourced (§20 V-09) | R2 per state · F-06[state] — including the Maharashtra return leg of A-15 | Each state's portal, return format and due day captured in a live session |
| State LWF | Per welfare board | R2 per state · F-07[state] (A-17) | As above |

#### 22.4.1 EPFO — the monthly ECR return, approval and challan

<!-- DIAGRAM: compliance-operations-ecr-session -->

| Facet | Specification |
| --- | --- |
| **Portal** | The EPFO employer establishment sign-in (unifiedportal-emp.epfindia.gov.in), with a CAPTCHA served on the sign-in form and no API, bulk upload interface or machine connectivity mentioned (r3/05 finding 27). EPFO's public site moved from epfindia.gov.in to www.epfo.gov.in, and URLs printed in EPFO's own circular and FAQ are dead (EV-045); hosts are resolved at run time and redirects followed, never hard-coded (r3/05). |
| **Portal stability** | The revamped ECR launched as a beta for wage month September 2025 onwards; no later circular declaring general availability was found across the EPFO circulars index (r5/02 finding 15). The runbook is pinned to the EPFO User Manual ReECR v3.0 and the revamped-ECR FAQ, and the watcher monitors www.epfo.gov.in/revamped-ecr/ (FR-RULE-004). |
| **Who acts** | Mode A/B: the employer's user. Mode C: our operator. The payment leg: always the employer's authorised payer (P5). |
| **Credentials** | The establishment's sign-in credentials; the CAPTCHA is solved by the attending human. Whether EPFO also prompts for an OTP, and on which registered channel, is not established in the evidence — the runbook carries it as `epfo.sign_in_otp` (unknown) and handles it by relay if prompted (FR-OPS-022). |
| **Software** | The product; the managed workspace (M2) in Mode C. No EPFO-side software. |
| **Customer approves** | The artefact in-product (§12.4.1 step 5); the return statement (instruction, FR-OPS-004); the Due Deposit Balance Summary and challan (instruction, after the verification gate, FR-PAY-301 M10); the payment, by paying it. |
| **Recorded** | One log entry per step (FR-OPS-008); the uploaded file's hash; the return statement; the return file ID; the Due Deposit Balance Summary; the TRRN of each challan; the receipt. |
| **Closes on** | The payment receipt stored and reconciled — FR-PAY-711 F15, FILED. Return file ID and TRRN are the ACCEPTED and PAYMENT_INITIATED evidence (EV-036). |

**The steps (Mode C; Modes A and B run the same list with the employer's user at the portal).**

*Before the session (READY, §22.3):*

1. The ECR artefact is VALIDATED and approved in-product; the approver has seen the diff
   against last month and the exclude-and-flag list for members with un-seeded or
   KYC-incomplete UANs (AC-701.2; Part E-11).
2. The per-establishment ledger shows every earlier month filed or NIL, and the M−4 rule is
   satisfied, so the portal will accept a Regular return for this month (EV-038;
   FR-PAY-712).
3. Members blocked by an exit date recorded in error are listed with their pending joint
   declarations (EV-041); they are absent from this return and follow later.
4. The portal form-control values are prepared: Wage Month; Return Type within the EV-037
   guards; Contribution Rate — 12% or 10%; Remark (EV-035; AC-701.5). None is in the file.
5. The file is packaged to the portal's upload notice: alphanumeric filename, lowercase
   `.txt`, at most 8 MB, compressed above 2 MB, one text file per zip (r5/02 finding 5).

*In the session:*

6. The operator checks out the credential (FR-OPS-021), signs in and solves the CAPTCHA;
   any OTP is relayed by the employer's OTP contact (FR-OPS-022).
7. The operator opens return filing, enters the form-control values from step 4 and uploads
   the file.
8. **Validation.** If the portal flags errors, the operator downloads the error file; the
   product captures it raw and maps what it can to employee records; the instance records
   F7 REJECTED; the session closes and the fix runs through identifier state or a correction
   run, never an edit of the locked snapshot (FR-PAY-711 F8). The portal's EPS checks follow
   EPFO's own severity — the age-58 rule is a block, the post-01.09.2014 high-earner rule a
   flag (EV-040) — and the product's pre-validation has already mirrored both (AC-701.6).
9. **Return statement.** On success, the portal renders the return statement. The workspace
   captures it; the product reconciles it line for line against the locked snapshot.
   Differences the portal is documented to make — the EPS component disallowed for a member
   over 58 not marked for deferred pension (EV-040) — are shown as explained lines. Any
   unexplained difference withholds approval: the return is not yet approved, so the fix is
   not a Revised return (which needs an approved Regular, EV-037) but the portal's reject
   option (EV-036), taken on the approver's instruction, followed by a regenerated attempt;
   the rejected attempt is counted like a portal rejection (§22.12 O17).
10. **Instruction 1 — approve the return.** The approver sees the reconciliation and
    instructs approval against the statement's hash. The operator approves. The return is
    now non-cancellable (EV-036); FR-PAY-711 F9 ACCEPTED is recorded with the return file
    ID.
11. **Due Deposit Balance Summary.** The portal generates it at approval, showing
    contributions, interest, damages and administrative and inspection charges (r3/05
    finding 24). The workspace captures it; the product reconciles contributions to the
    snapshot and shows the s.7Q interest line as mandatory with the contribution and any
    s.14B damages as payable now or later at the employer's option (EV-039).
12. **Verification gate.** The month's gate (FR-PAY-301 M10) is evaluated in the product:
    every statutory payment the month owes reconciles; no downward correction is pending.
    A downward difference found here is corrected by a Revised return **now**, before any
    payment is initiated (EV-037) — the runbook branches to the Revised variant.
13. **Instruction 2 — challan.** The approver instructs challan generation against the
    summary's hash. The operator generates the challan; the TRRN is captured. Multiple
    challans per wage month are permitted (EV-036), and EPFO only advises employers to
    avoid paying twice for the same employee (r5/02 finding 8), so a second payment
    covering the same member and month is shown to the approver as a potential duplicate —
    a flag, never a block (AC-701.8). EPFO's circular bars a Revised return once "a payment
    process" has been initialised for the wage month (r5/02 finding 9); whether generating
    the TRRN challan counts as initialising it is not established. The runbook therefore
    treats challan generation as the boundary: the verification gate and the Revised branch
    (step 12) sit before it, and no Revised return is attempted once a challan exists
    (§22.12 O21). Challan generation is performed by our operator only where the written
    authority names it as a separate act; otherwise the operator stops at the Due Deposit
    Balance Summary and the employer generates the challan — §23.13.4's product default
    that payment initiation is the customer's act.
14. **Payment hand-off.** The operator checks the credential in. The employer's authorised
    payer pays the TRRN challan through their own bank channel; the operator never proceeds
    past the portal's hand-off to a bank (P5). The payer's confirmation, or the challan
    status in a later session, records FR-PAY-711 F14 PAYMENT_INITIATED. From here a Revised
    return is impossible (EV-037).

*After the session:*

15. The receipt is downloaded — by the payer and imported, or by the operator in a short
    evidence session — stored, reconciled against the challan and, where shared, the bank
    debit; FR-PAY-711 F15 FILED is recorded and the month counts for the on-time metric
    (§19.1).

**FR-OPS-012 · EPFO ECR runbook** · **P0** (Modes A, B) · **R2 · F-08[EPFO]** (Mode C)
The product shall implement the steps above as runbook data (FR-OPS-019), with the two
instruction gates, the verification gate before the challan, and the payment hand-off.

- **AC-012.1** — A session cannot approve a return whose captured statement carries an
  unexplained difference from the locked snapshot. Before approval, the only route is the
  portal's reject option on the approver's instruction and a regenerated attempt; after
  approval and before payment initiation, a downward difference routes to the Revised
  variant (EV-037); explained differences (EV-040) are listed, never silently absorbed.
- **AC-012.2** — The session cannot reach the challan step while the month's verification
  gate fails (AC-301.3), and the failure names the reconciling item.
- **AC-012.3** — A session opened for a month whose predecessor lacks a return is refused
  at READY with the predecessor named (EV-038; AC-712.1).
- **AC-012.4** — The TRRN of every challan, the return file ID and the receipt are stored on
  the filing and ledger entry (AC-712.5); a receipt that does not reconcile to its challan
  holds the instance at PAYMENT_INITIATED with the difference named.
- **AC-012.5** — If the portal is unavailable inside the due-date window, the session hands
  back with the artefact and checklist, and the miss, if any, is classified
  authority-caused only when the outage is evidenced (§05.9).

**The EPFO variants.**

| Variant | Portal behaviour (evidence) | Runbook difference | Gate |
| --- | --- | --- | --- |
| **Supplementary** | Needs an approved Regular; may be filed repeatedly; may contain only members absent from every prior return for that month (EV-037) | The usual route for a member excluded-and-flagged this month whose UAN is later seeded | Instruction 1 and 2 as for Regular |
| **Revised** | Needs an approved Regular, no other return in process and no payment initiated; overwrites the portal's data (EV-037) | Only between step 10 and step 14; our ledger keeps the prior return and the diff (FR-PAY-711 F10) | Instruction bound to the revised statement; refused after PAYMENT_INITIATED (AC-711.3) |
| **NIL month** | No file; administrative and inspection charges through Direct Challan Entry, enabled only when there are no active members (EV-042) | Sign in, Direct Challan Entry, challan, payment hand-off | Instruction on the challan amount |
| **7Q interest and 14B damages** | 7Q interest auto-calculated and mandatory with the contribution; 14B damages may be deposited forthwith or at a later stage at the employer's option (EV-039) | 7Q rides the month's challan (step 11); a deferred 14B deposit runs as its own short session, whose portal screens are captured the first time it is used (AC-011.2) | Instruction on the amount |
| **Part-payment contribution file** | A separate 6-field `#~#` file on a screen with only Wage Month, Contribution File and Remark (EV-044; r5/02 finding 6) | Same as Regular minus Return Type and Contribution Rate | As for Regular |
| **Arrear return** | A separate "File Arrear Return" flow; no public arrear layout (EV-043); the arrear disbursal date sets the due month (Part E-9) | **No runbook.** The product surfaces the liability and its due month; the arrear flow is captured from a live session before any runbook is written (§05.7; fence F-03, §05.18) | — |

**FR-OPS-013 · EPFO variant runbooks** · **P0** (Supplementary, Revised, NIL, 7Q/14B) · **P1, R2** (part-payment, A-05) · **R3 · F-03** (arrear return)
- **AC-013.1** — A Supplementary session is refused if any member in it appears in a prior
  return for the month (EV-037).
- **AC-013.2** — A Revised session is offered only while the instance is ACCEPTED and no
  payment is initiated; after PAYMENT_INITIATED the operator is shown the remaining routes —
  Supplementary for absent members, the fenced arrear flow (AC-711.3).
- **AC-013.3** — Deferred 14B damages stay an open liability on the establishment's ledger
  until paid, with the deferral decision and its approver recorded (AC-701.8).

#### 22.4.2 ESIC — the monthly contribution and Insured Person registration

| Facet | Specification |
| --- | --- |
| **Portal** | The ESIC employer portal (portal.esic.gov.in employer login) and its monthly contribution e-challan flow with a challan print download; r3/05 (finding 30) found no published API, file specification or bulk interface, and we are not aware of one as of September 2026. esic.gov.in serves an incomplete TLS certificate chain, which breaks naive clients (r3/05). The workspace may trust the chain only through a logged exception scoped to the named ESIC hosts, never by disabling verification (r3/05; §16.5.2 failure mode 6). |
| **What is unknown** | The contribution template's columns and order, its file type, whether the sign-in carries a CAPTCHA or OTP, and whether a DSC is required. Practitioner sources describe an Excel template of roughly six columns, but the template itself 404s and nothing was confirmed from ESIC (r3/05 finding 31). Each unknown is a runbook field marked "capture in session" (AC-011.2). |
| **Who acts** | Mode A/B: the employer's user. Mode C: our operator, once counsel clears and the capture is reviewed. Payment: the employer (P5). |
| **Credentials** | The employer's ESIC portal credentials; any CAPTCHA by the attending human; any OTP by relay. |
| **Customer approves** | The contribution upload in-product; the challan amount (instruction); the payment. |
| **Recorded** | Log entries; the uploaded template's hash; the challan; payment confirmation. |
| **Closes on** | Challan and payment confirmation stored and reconciled — FILED. |
| **Regime** | For contribution periods after the ESI saving lapses on or about 21 November 2026, the instance is BLOCKED-pending-regime until a successor is confirmed (§06.9; §20 V-08, R-2; fence F-04, §05.18); no session opens against a lapsed rule. |

**FR-OPS-014 · ESIC runbooks and the capture spike** · **P0** (C-12; moves to R2 by rule if F-05 is still open at the gate) · **R2 · F-08[ESIC]** (Mode C)
Before the ESIC runbook is published, the capture spike r3/05 asked for shall be run in a
Mode B first submission with a design partner: sign-in mechanism, CAPTCHA and OTP presence,
the template's exact columns, order and file type, whether a DSC or EVC is required, and the
challan and payment sequence.

- **AC-014.1** — The ESIC contribution generator's schema object (§16.1) and the ESIC
  runbook are published only after the spike's captured evidence passes two-person review
  (FR-RULE-010).
- **AC-014.2** — Insured Person registration for a joiner is prepared in-product and run as
  an attended portal task; the product treats Aadhaar seeding at registration as optional
  (Part E-11; FR-CHR-042) and our operator never enters an Aadhaar number (§22.2.3).
- **AC-014.3** — An employee held in coverage to the end of a contribution period after
  crossing the wage ceiling appears in the correct months' uploads (§06.3 TV3), and the
  runbook's pre-check shows the operator which members are held and why.

#### 22.4.3 Income-tax portal, Protean and TRACES — Form 138 and Form 130

**The quarterly statement.**

| Facet | Specification |
| --- | --- |
| **What is filed** | Form 138 (ex-24Q) for Q1–Q3 of Tax Year 2026-27, under Rule 219 of the Income-tax Rules 2026, due 31 July, 31 October and 31 January (EV-049). FY 2025-26 and earlier periods — originals and corrections — stay on the legacy 24Q layout and stack (EV-052). They are outside v1: no §05.7 artefact row covers a legacy original, and legacy corrections are deferred (A-28) because the legacy correction layout is not in this PRD's evidence base. §08 AC-706.4 still specifies legacy routing; the scope conflict is routed in §22.12 O22. Q4 is fenced: its regular and correction formats are unpublished (EV-046; F-01). |
| **Software** | The product writes the statement `.txt` — ASCII, `^`-delimited, CRLF-terminated, record types FH/BH/CD/DD, file type `SL1` (EV-051). The **FVU** is Protean's Java utility; it validates the statement against the `.csi` file from the TIN Challan Status Inquiry, whose import is mandatory, and whose TAN and TAN name must match the statement (r5/02 finding 30). The product runs the FVU in a pinned validation environment holding both stacks — RPU 1.2 + FVU 1.2 for Tax Year 2026-27 onward, RPU 6.0 + FVU 9.5 for FY 2010-11 to FY 2025-26 — as complete folders, because Protean warns that replacing only the FVU jar may cause rejection at submission (EV-052; r5/02 finding 34). |
| **Who acts** | Validation: the product, which is the category practice — greytHR's payroll page advertises "automatic FVU validation" (r5/03 finding 32; read September 2026; claim posture, product not executed). Upload: the deductor in Mode A/B; our operator in Mode C only when `F-08[income-tax]` clears — which for this portal needs Q3 (CR-17c) as well as the questions every portal needs (§22.2.3). |
| **Credentials** | The deductor's income-tax portal account. Whether the `.fvu` upload requires a DSC or EVC is not established (r3/05 open question) and is carried as `it.fvu_upload_signature` (unknown). If a DSC is required, the upload step is the signatory's, in Mode A/B or through M4 at their end — never Mode C with a held DSC (P6). |
| **Customer approves** | The statement in-product; the upload (instruction, bound to the `.fvu` and its FVU result). |
| **Recorded** | Log entries; the `.txt`, `.csi` and `.fvu` hashes; the FVU and RPU versions used; the Return Receipt Number. |
| **Closes on** | The Return Receipt Number stored — it replaces the old Token No. (EV-051) — and the statement reconciled to deducted and deposited tax (AC-706.2): FR-PAY-711 F16, FILED. |
| **Corrections** | Legacy periods: deferred (A-28) — a migrating tenant's prior-year corrections stay with the prior vendor or its CA until the legacy correction layout is captured through the pipeline (FR-RULE-007) and a runbook version publishes. Tax Year 2026-27: Protean's correction page carries a Q1–Q3 correction format whose files are dated 4 August 2026 (r5/02 finding 20), but the e-filing portal stated in September 2026 that correction filing for Tax Year 2026-27 "will be enabled shortly" (r1/06 finding 33; r3/05 finding 29). Until the watcher confirms it is enabled, a Tax Year 2026-27 correction is generated and validated and then held, with an authority-caused blocker and its deadline exposure visible (§05.9). |

**FR-OPS-015 · Form 138 statement runbook** · **P0** (Modes A, B) · **R2 · F-08[income-tax]** (Mode C) · submission of Tax Year 2026-27 corrections held on **F-02**
- **AC-015.1** — A statement is never validated or offered for upload on an FVU/RPU stack
  that does not match its period (EV-052); the stack used is recorded on the filing.
- **AC-015.2** — A `.csi` mismatch — an un-reflected challan, or a TAN or TAN-name
  mismatch — stops generation before any session is requested (AC-706.2).
- **AC-015.3** — Until `it.fvu_upload_signature` is captured and reviewed, the runbook runs
  in Mode A/B only (AC-011.2).
- **AC-015.4** — A held Tax Year 2026-27 correction shows the portal notice, the date the
  watcher last checked it, and the exposure clock (AC-708.3); when the watcher records the
  portal function enabled (FR-RULE-006), fence F-02 clears (§05.18) and the held instance
  re-queues automatically.

**The annual certificate.**

| Facet | Specification |
| --- | --- |
| **What it is** | Form 130 (ex-Form 16), with Parts A, B and C; valid only if generated from TRACES and carrying the deductor's digital or physical signature; duplicates are re-downloadable from TRACES at any time (EV-048; r5/02 finding 24). TRACES builds it from Annexure I and the Q4 Annexure II of Form 138 (r5/02 finding 21), so for Tax Year 2026-27 it is **BLOCKED** behind the unpublished Q4 format (EV-046). The due date is 15 June of the year following the Tax Year (Rule 215; §06.11). |
| **The documented incumbent flow** | For Form 16 (FY 2025-26 and earlier), greytHR's documentation describes requesting the certificate on TRACES, receiving a request number, downloading with an authentication code "valid for the same calendar day", then signing through a desktop signer application driving a physical eToken, then publishing to employees (r3/02 finding 24; help article captured September 2026, documentation read, product not executed). Whether the Form 130 flow on TRACES follows the same steps is not established. |
| **Who acts** | Request and download: the deductor (Mode A/B) or our operator (Mode C, when Q1 and Q2 clear for TRACES). Signing: the authorised signatory only, through M4 at their end (P6; Part D-17 Q4). Distribution: the product (FR-PAY-707). |
| **Credentials** | The deductor's TRACES account. If the authentication code arrives on an employer channel, it is relayed per session like an OTP (FR-OPS-022). |
| **Customer approves** | The request (instruction); the signature is itself the signatory's act. |
| **Recorded** | Log entries; the request number; the downloaded certificate file hashes; the signed file hashes; the distribution record per employee. |
| **Closes on** | Every certificate distributed after reconciliation to the four quarterly statements and the year's payslips (AC-707.2). |

**FR-OPS-016 · TRACES certificate runbook** · **P0** (distribution; FY 2025-26 and earlier, including duplicates) · **R3 · F-01** (Tax Year 2026-27, until the Q4 format publishes)
- **AC-016.1** — The product never distributes a certificate that was not downloaded from
  TRACES, and never applies a signature on the deductor's behalf (EV-048; P6).
- **AC-016.2** — A request whose authentication code expires before download re-opens as a
  new request the next working day, with the delay shown against the 15 June due date.
- **AC-016.3** — The Tax Year 2026-27 runbook is authored only after the Q4 format publishes
  and a Mode B capture session records the Form 130 flow; the two due dates — Q4 on 31 May
  and Form 130 on 15 June — are planned as one milestone (EV-049; AC-706.3).

#### 22.4.4 State Professional Tax and Labour Welfare Fund — N portals, not one

State PT is one portal per state and per registration type, and in some states a local-body
levy rather than a state portal (§06.4; r2/10). LWF is one welfare board per state. The
runbook is therefore a **per-state, per-registration object**, and a state is not offered to a
tenant until both its rule rows (§20 V-09) and its runbook exist.

| Facet | Specification |
| --- | --- |
| **The one captured example** | Maharashtra's MAHAGST portal lists "e-Return PT", "e-Refund", "View/Verify e-Payment", "e-Track Status", "PTEC OTPT Payment" and "e-Payment - PTRC-Return / PTEC", with no API mentioned (r3/05 finding 32). PTRC and PTEC are separate registrations with separate flows (§16.5.4), so Maharashtra carries two runbooks. |
| **Portal banners are leads, not rules** | MAHAGST's "Important Updates" table showed monthly PTRC due dates of 15 September 2026 and 15 October 2026 with the caveat "Please check VAT/PT notification for latest updates" (r3/05). The watcher treats such banners as prompts to verify against the notification; the calendar reads only reviewed rule rows (FR-RULE-004). |
| **Every other state** | No runbook until the state's portal is captured in a live Mode B session and its dataset row is state-primary-sourced. Aggregator tables never seed a runbook (§20.12 rule 1). |
| **Who acts, credentials, approvals** | As the common protocol (§22.3): employer or operator; the employer's state credentials; instruction before submitting a return and before generating a challan (FR-OPS-004); payment by the employer. |
| **Closes on** | The state's acknowledgement and payment confirmation, stored and reconciled to the PT deducted from employees working in that state (AC-703.1). |

**FR-OPS-017 · Per-state PT and LWF runbooks** · **R2 per state** · **F-06[state]** (PT return) · **F-07[state]** (LWF)
- **AC-017.1** — A tenant cannot enable PT or LWF filing for a state whose runbook is not
  PUBLISHED; the state's liability still computes and shows, with the reason no session is
  offered (§14.6 `registration_pending` pattern).
- **AC-017.2** — Each state runbook records the registration type it covers (for example
  PTRC or PTEC), the portal or local body, and the cadence rule row it reads; a runbook
  without a cadence row cannot publish.
- **AC-017.3** — A multi-state tenant's queue shows one session per state registration per
  that state's cadence; no session batches two states.

**What a state runbook must record, beyond the generic fields of §22.4.6.** The generic
runbook object assumes one portal with one flow. PT and LWF break both assumptions — a levy
can sit with a local body rather than a state department (§06.4; r2/10 finding 22), a state
can assign different periodicities to different registrations of the same employer, and a
state's own return form is a fact to be captured, never inferred from a neighbour.

| Field | Content | Why it cannot be defaulted |
| --- | --- | --- |
| `levy_authority` | The state tax department, or the named local body where PT is a local-body levy | The authority decides who is filed with, what the acknowledgement looks like and where a registration is obtained |
| `registration_type` | The registration this runbook serves — Maharashtra's PTRC and PTEC are separate objects with separate flows (§16.5.4) | One instrument, two obligations; conflating them files the wrong return |
| `portal_or_office` | Pinned hosts, or the physical office where a state or local body has no portal | A runbook with no portal is still a runbook: it says what the employer must do and what we prepare |
| `return_form_identity` | Held as `pt.<state>.return_form` / `lwf.<state>.return_form`, from the state's own instrument | Form numbers are prescribed per state (EV-053's configurability rule); guessing one is the fabricated-precision failure mode (Part A-2) |
| `cadence_rule_ref` | The published due-date rule row this runbook reads (FR-RULE-001) | AC-017.2 — a runbook without a cadence row cannot publish, and a portal banner is not a cadence (§22.4.4) |
| `payment_channel` | Portal challan, bank counter, treasury, or local-body counter | It decides where the hand-off to the employer's payer sits (P5) and what the evidence is |
| `acknowledgement_type` | Downloadable object, reference number only, or none observed | It sets what FR-OPS-009 can require before CLOSED, and where an attestation substitutes |
| `irreversibility` | Default: **treated as irreversible** until a captured session shows otherwise | Irreversibility is state-specific and unverified everywhere except where captured (FR-OPS-004) |
| `portal_language` | The language the portal and its notices are served in, and the named reader | A state whose material is regional-language-only is the linearity kill criterion of §22.9 made concrete |
| `local_body_variants[]` | Where the levy is local, one entry per local body covered, each with its own hosts, form and cadence | A state-level runbook would be a fiction in a local-body state |

- **AC-017.4** — None of `return_form_identity`, `cadence_rule_ref`, `payment_channel` or
  `acknowledgement_type` may be defaulted or inherited from another state. An unset field is
  an `unknowns[]` entry, which forces Mode B until it is captured and reviewed (AC-011.2).
- **AC-017.5** — Where the levy is a local body, the runbook is per local body, and a tenant
  with work locations under two local bodies of one state carries two runbooks and two
  instance streams (CR-11).
- **AC-017.6** — A state whose portal or notices are served in a language no rostered analyst
  or operator reads records that on the runbook and cannot reach OFFERABLE until a named
  reader is assigned (FR-RULE-020 G9).

#### 22.4.5 Portal tasks that are not filings

Several statutory acts happen on these portals outside the monthly filing cycle. They run on
the same protocol and are logged the same way; they differ in trigger and evidence.

| Task | Portal | Trigger (owning requirement) | Gate | Evidence |
| --- | --- | --- | --- | --- |
| Mark a member's date of exit and reason | EPFO | Exit processing (FR-CHR-058) | Instruction-gated — a wrong exit date needs a joint declaration to undo (EV-041); needs no member-detail or Aadhaar update (EV-041) | Portal confirmation |
| Track a joint declaration correcting an exit date | EPFO, with an offline declaration by employer and employee | A blocked member (AC-712.3) | Employer's and employee's act; our role is preparation and tracking | The accepted correction |
| EPF establishment registration when headcount first crosses 20 | EPFO | The 20-crossing latch (AC-1004.2; EV-057) | Declaratory — instruction-gated; runbook captured in the first live session | Registration acknowledgement |
| UAN allotment for an International Worker or a citizen of Nepal or Bhutan | EPFO | Onboarding (FR-T-O07) | The only employer-route UAN case since 1 August 2025 (§16.5.1) | The UAN |
| Insured Person registration | ESIC | A joiner in ESI coverage (FR-CHR-042) | Aadhaar seeding optional in the product (Part E-11); never entered by us | The IP number |
| PT registration for a new state or establishment | State PT | A work location in a PT-levying state with no registration (§14.6.3 worked example) | The employer's act; our role is preparation | Registration and enrolment certificates |

**FR-OPS-018 · Portal-task runbooks** · **P0** (exit marking, C-33; IP registration, proposed) · **P1** (establishment registration, International Worker UAN, PT registration)
- **AC-018.1** — A portal task that is declaratory cannot run without an instruction bound to
  the values to be declared (FR-OPS-004).
- **AC-018.2** — A task whose portal screens have not been captured runs in Mode B only
  (AC-011.2).

#### 22.4.6 The runbook as a governed object

Portals change without notice, and the revamped ECR is itself still a beta (r5/02
finding 15). A runbook that lives in an operator's memory or a wiki drifts silently; one that
is data, versioned and reviewed, drifts loudly.

**FR-OPS-019 · Runbooks are versioned, reviewed, drift-detected data** · **P0**
Every runbook shall be a versioned object published through the compliance data pipeline
(FR-RULE-001), and the workspace shall execute only a PUBLISHED version.

| Field | Content |
| --- | --- |
| `runbook_id`, `version`, `status` | DRAFT, IN_REVIEW, PUBLISHED, SUSPENDED, RETIRED — the same publish states as a rule (FR-RULE-003) |
| `portal`, `hosts[]`, `registration_type`, `filing_type_or_task` | What it covers |
| `source_refs[]` | The portal's own manuals, FAQs and circulars with URL and capture date — for the ECR, the EPFO User Manual ReECR v3.0, the revamped-ECR FAQ and circular Compliance/ECR Revamp/2025/12997 of 26.09.2025 (r5/02) |
| `captured_sessions[]` | The live sessions in which steps were observed: date, portal, tenant consent reference, observer |
| `steps[]` | Ordered: action code (FR-OPS-003), instruction-gated flag, expected portal object, evidence to capture, known error classes |
| `unknowns[]` | Facts marked "capture in session"; any entry forces Mode B (AC-011.2) |
| `author`, `reviewer`, `last_verified_at`, `reverify_every` | Two people; `reverify_every` is `runbook.reverify_days`, per portal |
| `drift_signals[]` | What indicates the portal has changed: an unexpected page, field or button in session; a watcher hit on the portal's manual, FAQ or announcements |

- **AC-019.1** — When an operator reports an unexpected portal screen, or the watcher flags
  a change to a source the runbook cites, the runbook moves to SUSPENDED and every queued
  Mode C session for it falls back to Mode B until a reviewed version publishes.
- **AC-019.2** — Every session log entry carries the runbook version it executed, so a
  dispute can be replayed against the exact instructions the operator had.
- **AC-019.3** — A runbook past `reverify_every` without re-verification raises a stale
  alert to its owner and cannot be used for a first submission (FR-OPS-011).

#### 22.4.7 Reconciling what the portal renders

Every runbook above says the product "reconciles" a portal object against the locked
snapshot, and every instruction gate depends on that word meaning something exact. This
subsection defines it once: which objects are reconciled, to what, at what tolerance, how a
difference is decomposed, what classes a difference can take and which route each class
opens. Two asymmetries drive the design. The portal is the authority on **what was filed**;
the snapshot is the authority on **what we computed**. And some lines on a portal object are
computed by the portal from rules we hold only as [Hypothesis] — administrative and
inspection charges, s.7Q interest, s.14B damages — so reconciling them as though we were the
authority would manufacture a defect out of our own uncertainty.

<!-- DIAGRAM: compliance-operations-reconciliation-ladder -->

**FR-OPS-035 · Reconciliation of portal-rendered objects** · **P0**
Each ladder rung below shall be evaluated before the gate that follows it, and no gate shall
open on an unexplained difference.

| Rung | Object | Reconciled to | Fields tied | Tolerance |
| --- | --- | --- | --- | --- |
| Tie 1 | The ECR file as uploaded | The locked snapshot | All eleven fields per member (EV-035), member set, file hash | Exact. This is the generator's own self-check (§16.1) and never involves a portal |
| Tie 2 | The return statement the portal renders | The uploaded file | Member count, then the field totals for gross, EPF, EPS and EDLI wages and the three contribution fields, then the member lines — to the extent the statement renders them; the statement's exact content is a runbook field captured in the first live session (AC-011.2) | Exact, to the paisa |
| Tie 3 | The Due Deposit Balance Summary | The approved return statement | Contribution lines exact; EDLI against EDLI wages; s.7Q interest, s.14B damages and the administrative and inspection charge lines carried as portal-computed | Exact on contributions; portal-computed lines carried, with our forecast recorded beside them |
| Tie 4 | The challan and its TRRN | The summary | Amount equals the pay-now total: the summary's total less any s.14B damages the employer defers at its option (EV-039) | Exact |
| Tie 5 | The receipt | The challan | TRRN, amount, date; and the bank debit where the employer shares it | Exact on amount and TRRN; the debit's value date is a timing difference, not an amount difference |
| Tie 6 | The FVU validation result and the Return Receipt Number | The statement file and the `.csi` | The FVU result as returned, the TAN and TAN-name match against the `.csi` (r5/02 finding 30), and the FVU and RPU versions used (EV-052); the result's own field set is a runbook unknown until the first live run captures it | Exact; a mismatch stops the upload, it does not warn |
| Tie 7 | A state PT or LWF acknowledgement | The return values submitted and the challan amount | The state's own acknowledgement fields, per that state's runbook | Exact on amounts; field coverage is per state, because no state's acknowledgement layout is assumed |

**The decomposition ladder.** A difference is decomposed automatically, level by level, and the
process stops at the first level that explains it. An operator never types a difference, and
never characterises one.

| Level | What is compared | What it isolates |
| --- | --- | --- |
| L0 | Member count and total of each amount field | Whether the difference is structural or arithmetic |
| L1 | Each amount field's total | Which field or fields carry it |
| L2 | Member sets joined on UAN | A member present on one side and absent on the other |
| L3 | Field by field for the members that differ | The exact field on the exact member |

**Difference classes and their routes.**

| Class | Definition | Recognition | Route |
| --- | --- | --- | --- |
| `explained_by_rule` | The portal's own documented behaviour produces it — for example an EPS component treated under the age-58 rule or the post-01.09.2014 high-earner rule (EV-040) | Requires a citation to the published validator-severity row (FR-RULE-001), never an operator's note | Listed as an explained line on the approver's reconciliation and carried; the instruction may proceed |
| `membership` | The member set differs between our file and the portal's object | L2 | Approval withheld. Before approval the route is the portal's reject option on the approver's instruction and a regenerated attempt (EV-036); once the member is absent from every prior return for the month, the Supplementary return is the route (EV-037) |
| `portal_computed` | A line the portal computes and we do not hold as a verified rule — s.7Q interest, s.14B damages, administrative and inspection charges | The line is on the summary and not in the snapshot's contribution set | Carried at the portal's figure and paid at the portal's figure; our forecast, where we have one, is recorded beside it as a reconciling item (FR-PAY-715 L2) |
| `timing` | The same amount at a different moment — a receipt's bank value date, a challan generated in a later window | Amount ties, timestamp does not | Recorded; no gate blocked |
| `unexplained` | Everything else, including every difference in our favour | The residue after the four above | The gate stays shut. If it cannot be explained inside the session, the session hands back with the portal left at its last reversible point (S9) |

- **AC-035.1** — There is no tolerance band on a contribution line anywhere in the ladder.
  Equality is to the paisa, and a configurable tolerance is not a feature that may be added.
- **AC-035.2** — Every difference carries a class, an evidence reference and a route before
  the reconciliation can be presented to an approver; a difference cannot be closed as
  "checked" or "accepted" by anyone.
- **AC-035.3** — A difference **in our favour** — the portal showing more members, or a
  higher contribution, than the snapshot — is `unexplained` like any other and withholds the
  gate. A statement that over-states liability is not a windfall to approve; it is a signal
  that one of the two sides is wrong about who was employed that month.
- **AC-035.4** — Portal-computed lines are never recomputed into the amount paid. Where our
  forecast differs from the portal's figure by more than
  `ops.portal_computed_variance_flag`, a review task is raised against the rule rows behind
  the forecast (`epf.admin_charge.minimum`, `epf.interest_base` and their kin are unset or
  [Hypothesis] parameters, §06.13) — a pipeline signal, not a filing blocker.
- **AC-035.5** — The reconciliation the approver sees is the object of the instruction hash
  (FR-OPS-004): re-rendering it must reproduce the same classes and the same figures, or the
  instruction is void (AC-004.1).

**Worked example — a forty-member establishment, with one member missing.**

Take an establishment filing a Regular ECR for one wage month, all forty members under the
ceiling election at PF wages of ₹15,000, which is EPFO's own Help File fixture line
(EV-035; §06.2's worked example). Each member's fields 7, 8 and 9 are therefore
**₹1,800 · ₹1,250 · ₹550** — employee 12%, employer EPS 8.33% capped at ₹1,250, and the
employer's balance of ₹1,800 − ₹1,250 = ₹550.

| Line | Snapshot, 40 members | Return statement rendered | Difference |
| --- | --- | --- | --- |
| Field 7 — employee PF | 40 × ₹1,800 = **₹72,000** | ₹70,200 | ₹1,800 |
| Field 8 — employer EPS | 40 × ₹1,250 = **₹50,000** | ₹48,750 | ₹1,250 |
| Field 9 — employer PF | 40 × ₹550 = **₹22,000** | ₹21,450 | ₹550 |
| Total contributions | **₹1,44,000** | ₹1,40,400 | ₹3,600 |
| Member count | 40 | 39 | 1 |

The ladder resolves it in two levels. L0 shows a member-count difference of one and a total
difference of ₹3,600. L1 shows each field short by exactly one member's value. L2 joins the
member sets on UAN and names the missing member. The class is `membership`, and because the
return is not yet approved, the route is the reject option on the approver's instruction and
a regenerated attempt — not a Revised return, which needs an approved Regular (EV-037). Had
the difference instead been discovered after approval, and had the member appeared in no
prior return for that month, the Supplementary route is the one EV-037 leaves open, and its
shortfall rides its own challan, which EPFO permits (EV-036).

**The same establishment at the payment gate.** With the fortieth member restored, the
summary's contribution lines tie at ₹1,44,000. EDLI wages are ₹15,000 per member, and EDLI
at 0.50% is ₹75 a member, so 40 × ₹75 = **₹3,000** (§06.2). The summary's remaining lines —
administrative and inspection charges, and any s.7Q interest — are `portal_computed`: they
are carried at the portal's figures and the approver instructs against the summary's hash
showing them, because our own administrative-charge rate is [Hypothesis] and its
establishment minimum is an unset parameter (§06.13). s.14B damages, if any, are shown with
the employer's deferral choice, which is recorded with its approver (EV-039; AC-013.3). The
challan must equal the pay-now total exactly (Tie 4), and a receipt that does not tie holds
the instance at PAYMENT_INITIATED with the difference named (AC-012.4).

#### 22.4.8 The period evidence pack

An inspection, a dispute or a customer's own auditor asks the same question — *show me what
was filed for this registration and this period, and who did it* — and the answer must not
require an engineer, a screenshot hunt or a support ticket. The pack is the assembled answer.

**FR-OPS-036 · The period evidence pack** · **P0**
For any registration and period the product shall assemble, on demand and without engineering
help, a signed pack containing the filing's evidence and the record of every act performed
under the employer's authority.

| Part | Content | Source |
| --- | --- | --- |
| 1 — What was owed | The obligation, its rule version and citation with capture date, and the due date the calendar read | FR-RULE-001 governed artefacts; §08 FR-PAY-710 |
| 2 — What was computed | The artefact as generated, its hash, its format-schema version, the rule-set version and the evaluation context | FR-PAY-711 F4; §08 I4 |
| 3 — Who approved | The in-product approval and every instruction with its approver, timestamp and object hash | §12.4.1; FR-OPS-004 |
| 4 — What we did | The session log entries for the period, with mode, reason code, runbook version, operator and portal action codes | FR-OPS-008; FR-OPS-032 |
| 5 — What the portal returned | Return statement, Due Deposit Balance Summary, challan and TRRN, receipt, Return Receipt Number, acknowledgements, error files — each with its hash | FR-OPS-009 |
| 6 — How it tied | The reconciliation result at each rung with its difference classes and routes | FR-OPS-035 |
| 7 — What went wrong | Every BLOCKED or HANDED_BACK episode, every rejection, and any miss adjudication with its class and evidence | FR-OPS-005; FR-OPS-033 |
| 8 — What is missing | Any evidence the runbook names that was not obtained, with the desk lead's exception and its reason | AC-009.1 |

- **AC-036.1** — The pack assembles within `ops.evidence_pack_minutes` for any registration
  and period inside the retention window, by an authorised customer role or by our staff on
  the customer's instruction, and every assembly is itself logged.
- **AC-036.2** — The pack carries no credential, OTP, CAPTCHA or Aadhaar number
  (AC-008.4), and an evidence document that was erased appears as an erased row with its hash
  and erasure date (AC-034.3), never as an omission.
- **AC-036.3** — Part 8 is mandatory and may be empty; it is never omitted. A pack that
  silently drops what could not be obtained is worse than no pack, because it invites
  reliance.
- **AC-036.4** — The pack is what deterministic replay (§08 FR-PAY-1002) and the session log
  produce **evidence** with. It **supports evidence production** for an inspection or a
  regulated customer's audit; it does not discharge that customer's own record-keeping
  obligations, and it does not discharge any contractual audit, access or inspection right a
  regulated customer's regulator imposes (K-21; §15; §23).
- **AC-036.5** — The pack is offered as a fixed structure whose parts are numbered as above,
  so that a second pack for a different period, registration or tenant is comparable without
  re-reading it.

---

### 22.5 The credential vault

r3/05 required "a per-establishment encrypted credential vault, explicit customer consent
and authority-to-act, a full audit trail of every automated portal action" before shipping,
and called portal credentials "the highest-risk surface in the product". Its word
"automated" predates the attended-only decision (K-13; §22.1 M5): read it as every portal
act performed under the authority. The r5 engineer
review found the vault had no specification — storage, access control, break-glass,
per-portal lifecycle, MFA and CAPTCHA handling. This subsection is that specification. The
vault exists only for Mode C (and Mode D where a CA uses it); in Modes A and B no credential
ever reaches us.

**What the vault holds, and what it never holds.**

| Holds | Never holds |
| --- | --- |
| The sign-in identifier and password for each portal account named in an ACTIVE written authority, one entry per registration and portal | Any bank credential, net-banking password or bank OTP (P5) |
| Any other static secret a portal's sign-in form requires, captured per portal in its runbook | Any OTP value, OTP seed or authenticator secret — OTPs are relayed per session and never stored (P6) |
| The metadata the gate needs: registration, portal, authority version, validation state, last validated time | Any DSC, its token, PIN or private key (P6; Part D-17 Q4) |
| — | Any Aadhaar number — those exist only in the Aadhaar token store, and we never enter one on a portal (Part E-6; §22.2.3) |
| — | Any CAPTCHA image or answer, and any password for the employer's own email or phone |

**Why the vault is built to the strictest class.** Both halves of the legal position, in one
breath (K-06): DPDP creates **no** sensitive category of personal data (s.2(t), EV-059) —
**and** the SPDI Rules 2011, live today, list "password" first among sensitive personal data
in r.3, restrict cross-border transfer in r.7 and name IS/ISO/IEC 27001 in r.8 (EV-060
[Verified — provenance caveat]; r4/01). Whether a credential for an establishment's portal
account is the personal information of a natural person — the authorised signatory it is
registered to, say — is a counsel question (Part D-4, §23). The vault does not wait for the
answer: it is built as Restricted-class data (§17.4). Holding its entries, keys and backups
in India is a **product decision**, not a claim that Indian law mandates localisation of
this data (K-08): the live constraints are narrower — the ICT logs about it must be kept
within India for 180 days (EV-062), and SPDI r.7 restricts cross-border transfer where the
contents are sensitive personal data (EV-060). The decision rests on exposure: an incident
in the vault goes to CERT-In within six hours of becoming aware (EV-062) and, where the
credentials are sensitive personal data, can engage IT Act s.43A compensation, which has
no statutory cap (EV-061). Who bears that exposure is itself a counsel question
(Part D-3, Part D-4). Nothing in this subsection describes anything as sensitive "under
DPDP" (Part D-19).

<!-- DIAGRAM: compliance-operations-credential-vault -->

**FR-OPS-020 · Vault storage and isolation** · **R2 · F-08** (in use only for Modes C and D)
- The vault is a **separate store in its own keyspace**, on the pattern of the Aadhaar
  token store (Part E-6): business tables, the session log and the causation record hold an
  opaque `credential_handle`, never a secret.
- Entries are envelope-encrypted under a per-tenant data key wrapped by an India-region KMS
  master key, with key rotation per NFR-SEC-302; decryption happens only inside the
  injection broker (FR-OPS-021) for an open session.
- The vault exposes **no read API that returns plaintext** to any person or service. It has
  no network path to the model gateway or the redaction chokepoint (§12.8.3): credentials
  are kept from every model structurally, by the absence of a route, not by redaction.
- Backups are encrypted under keys distinct from the primary, and an entry's data key is
  held outside the backed-up stores, so shredding an entry makes every backup copy
  unreadable (§14.6.1a; §17.14).
- Every check-out, check-in, failed validation and administrative act is an audit event
  (NFR-SEC-401) and an ICT log kept for 180 days within India (EV-062; NFR-CERT-602).

- **AC-020.1** — A schema lint finds zero columns outside the vault holding a portal
  password or any value derived from one (the same lint as NFR-SEC-303 for Aadhaar).
- **AC-020.2** — A database dump of any store other than the vault, and a vault dump without
  its KMS access, reveals no credential.
- **AC-020.3** — A request from any model-serving component to the vault fails at the
  network layer, and the attempt is a security event.

**FR-OPS-021 · Check-out and injection — the credential is never seen** · **R2 · F-08**
- A credential is checked out only by an open Mode C session in CHECKED_OUT (§22.3 S3), bound
  to that session, and checked in automatically at CLOSED, HANDED_BACK, ABORTED or EXPIRED.
- The workspace's broker injects the credential into the portal's sign-in fields; it is
  never displayed, never placed on a clipboard, never written to a log, a screenshot or a
  support ticket. The managed workspace disables developer tools, clipboard export,
  printing and screen capture outside the evidence tool.
- **[Hypothesis]** — injection works on every v1 portal's sign-in form. Kill criterion: where
  a portal's sign-in defeats injection (an on-screen keyboard, say), that portal runs Mode B
  only; the operator is never shown the password as a workaround.

- **AC-021.1** — An operator who leaves the company has never seen a customer credential,
  so an operator's exit triggers no customer rotation — but it does trigger an access
  review of every session they ran in the prior `ops.access_review_days` (FR-OPS-026).
- **AC-021.2** — The on-behalf log shows the handle checked out and the times; it never shows
  the secret.

**FR-OPS-022 · CAPTCHA, OTP and sign-in failure** · **R2 · F-08**
- **CAPTCHA** is solved by the attending human, in the session, every time. It is never sent
  to a solving service, never passed to a model, never automated and never logged (P1).
- **OTP** arrives on the employer's registered channel. The named OTP contact relays it
  through an authenticated in-product prompt that expires with the session; the product
  records only "OTP relayed at time T by contact X". The product never asks a customer to
  set up SMS or email forwarding to us, never registers our number or address as a portal
  contact, and never stores an OTP seed (P6).
- **Sign-in failure** halts the session after one failed attempt and hands back (§22.3 S6).
  The lesson is the same one the bank integrations teach — Zoho's help documentation says
  its Axis Bank integration allows five OTP attempts, after which it "can become inactive",
  and r3/05's recommendation is "never auto-retry OTP entry" (r3/05 finding 2; §16.3;
  documentation read, product not executed) — and each portal's
  own lockout policy is unknown and is captured per portal as
  `portal.lockout_policy`. An unexplained failure puts the credential in SUSPECT
  (FR-OPS-023).
- **OTP contacts are rostered.** A due-date window with no OTP contact on duty for a Mode C
  registration is a pre-check failure (FR-OPS-007) raised with enough lead time to fix it.

- **AC-022.1** — No log, event, evidence capture or analytics stream contains an OTP value
  or a CAPTCHA image or answer (verified by a log-content scanner in CI and in production).
- **AC-022.2** — An OTP relayed by anyone other than an authenticated, named OTP contact for
  that registration is rejected.
- **AC-022.3** — Zero automatic sign-in retries exist in the workspace code path.

**FR-OPS-023 · Credential lifecycle and rotation** · **R2 · F-08**
Credential states: **PROPOSED** (entered by the employer) → **VALIDATED** (a successful
sign-in in a session) → **ACTIVE** → **STALE** (not validated for
`vault.credential_freshness_days`) → **SUSPECT** (a failed sign-in or a security event) →
**REVOKED** (shredded).

- **Entry.** The employer's authorised user types the credential into the vault's own
  in-product form. Our staff never receive a credential by email, chat, phone or a shared
  document, and every customer is told so at onboarding — the rule is the defence against an
  attacker posing as our staff (§22.5 threat T5).
- **Rotation** is the employer's act on the portal, followed by an update in the vault. It
  is prompted when a named employer contact leaves (§07 exit), after any event in which the
  secret may have been exposed, and every `vault.rotation_reminder_days`. Each portal's own
  password-expiry rule is captured in its runbook.
- **Revocation** by the signatory, contract end or a security decision shreds the entry
  within `vault.shred_after_revocation_hours`; the log and the causation records remain.

- **AC-023.1** — A STALE or SUSPECT credential cannot be checked out; the session request
  falls back to Mode A with the reason.
- **AC-023.2** — Shredding is verified by a scheduled job that attempts to decrypt a sample
  of revoked entries from the primary store and from a restored backup, and must fail on
  both.

**FR-OPS-024 · Break-glass** · **R2 · F-08**
Break-glass is exceptional access that the normal gates do not grant, for three purposes
only: **incident response** (suspend or revoke credentials in bulk; stop every Mode C session
platform-wide), **continuity** (reassign an open due-date session when its assigned operator
is unavailable), and **vault recovery** (restoring service after a vault failure).

- It **cannot**: display a credential, act outside an authority's scope, pass an instruction
  gate, override a counsel fence, or undo a customer's revocation.
- It needs two named internal approvers — the filing desk lead and the security lead — both
  distinct from the person requesting it; it lasts at most `vault.break_glass_minutes`; the affected
  customers' designated contacts are notified at once with the reason; each use is reviewed
  within `ops.break_glass_review_days` and reported in the monthly security review.
- The platform-wide stop is one action that suspends every Mode C session and every
  check-out; restarting it needs the same two approvers.

- **AC-024.1** — A break-glass request by one person, or approved by the requester, is
  refused.
- **AC-024.2** — Every break-glass episode appears in each affected customer's on-behalf
  log (FR-OPS-008) and in the security audit.

**FR-OPS-025 · Vault and session incidents feed the six-hour pipeline** · **R2 · F-08** (the six-hour pipeline itself is R1, C-29)
- Detection signals — a check-out outside a session, check-out volume or timing outside the
  operator's pattern, clustered sign-in failures across tenants, a log-chain break, access
  from an unmanaged device — are detections in the §17 observability stack, access logging
  that can **detect**, not merely record, unauthorised access (EV-064 [Verified — not in
  force]; NFR-SEC-204).
- A confirmed or suspected credential compromise triggers the platform-wide stop for the
  affected tenants (FR-OPS-024), a rotation request to each affected employer, and the
  CERT-In report within six hours of becoming aware (EV-062; NFR-CERT-601).

- **AC-025.1** — A tabletop drill of a vault-compromise scenario reaches a CERT-In-format
  report inside six hours of the seeded detection, and every affected customer is notified
  with a rotation instruction in the same window.

**Threat model.** Stated as threats, not assets, so each row maps to a control and a test.

| # | Threat | How it happens | Preventive control | Detection |
| --- | --- | --- | --- | --- |
| T1 | Insider copies a customer credential | Operator reads the password in the workspace | Injection only; never displayed; developer tools, clipboard and capture disabled (FR-OPS-021) | Workspace tamper events; check-out anomaly (FR-OPS-025) |
| T2 | Operator acts outside the customer's grant | Wrong tenant, registration or act, by error or intent | System-enforced scope; file-to-registration binding (FR-OPS-003) | Scope-breach attempts logged and raised same day |
| T3 | Our operator's own account is taken over | Phishing, credential stuffing | Phishing-resistant MFA on every operator account — the standard NFR-SEC-101 sets for admin, payroll-approver and CA-console roles, applied to internal operators; managed devices; session bound to device | Device and location anomaly; failed-auth alerts |
| T4 | The vault store is breached | Infrastructure compromise | Separate keyspace; envelope encryption; KMS master in India; no plaintext read API (FR-OPS-020) | KMS usage anomaly; CERT-In pipeline |
| T5 | Attacker poses as our staff to the customer | "Please send your EPFO password so we can file" | We never take credentials outside the vault form, and say so at onboarding (FR-OPS-023) | Customer reports; unusual credential updates |
| T6 | Attacker poses as the customer's OTP contact | A call or message relaying or requesting an OTP | OTP accepted only through an authenticated named contact's product session (AC-022.2) | Rejected relays logged |
| T7 | Acting on a stale authority | The signatory or a named contact has left the employer | §07 exit events suspend the authority and contacts (FR-OPS-002) | Authority-state monitor |
| T8 | A revocation is not honoured | Queued sessions still run | Revocation is read at every step boundary; entry shredded (FR-OPS-030) | Revocation-to-last-action report |
| T9 | We lock the customer out of a portal | Repeated failed sign-ins | One failed attempt halts; no automatic retry (FR-OPS-022) | Failed sign-in count per credential |
| T10 | Hostile content from a portal page | A compromised or spoofed government page serves malware | Isolated workspace; hosts pinned per runbook; downloads limited to the runbook's evidence types and scanned; no model in the session, so no prompt-injection route | Endpoint detection on the workspace |
| T11 | A shredded credential comes back | Backup restore | Entry keys held outside backups (FR-OPS-020) | Shred-verification job (AC-023.2) |
| T12 | An action is hidden after the fact | Log deletion or edit | Append-only, hash-chained log (FR-OPS-008) | Nightly chain verification |
| T13 | Tampered workspace software | Supply-chain compromise of the browser or broker | Pinned, signed builds; no extensions; NFR-SEC-305 gates | SBOM and integrity checks at session start |
| T14 | Acting where a portal forbids it | Portal terms of use prohibit third-party credential use | Counsel fence per portal (§22.2.3 Q2; AC-001.1) | Counsel register status |

---

### 22.6 The filing desk — people, queue and fallbacks

**FR-OPS-026 · Desk roles, separation of duties and certification** · **P0** (roles and separation of duties for Mode B) · **R2 · F-08** (Mode C certification)

| Role | Does | May not |
| --- | --- | --- |
| **Compliance operator** | Runs Mode C sessions and guides Mode B sessions for assigned tenants; prepares reconciliations; handles exceptions | Approve anything for a customer; administer the vault; edit a runbook, rule or format |
| **Senior operator** | Everything an operator does; reviews evidence exceptions (AC-009.1); trains and certifies operators on runbook versions | Approve their own exceptions |
| **Filing desk lead** | Owns the queue, capacity and hand-back decisions; first break-glass approver; owns root-cause reviews and `miss_class` (AC-005.2) | Run a session they approve an exception for |
| **Security lead** | Second break-glass approver; owns vault administration, access reviews and incident response | Run customer sessions |
| **Runbook author and reviewer** | Statutory-desk roles (§22.8) that write and review runbooks | Approve their own runbook |

- An operator works solo in Mode C only after certification on the runbook version: a
  supervised session plus a scenario test on the version's instruction gates and failure
  branches; a new major runbook version requires recertification.
- Each tenant has a named primary operator and a named backup, both visible to the customer.
- Operator access is reviewed every `ops.access_review_days`, and on every role change.
- **AC-026.1** — The workspace refuses a Mode C session to an operator not certified on the
  runbook version, and refuses vault administration to anyone holding an operator role.

**FR-OPS-027 · The due-date queue and window capacity** · **P0**
- Sessions queue by due date, then by irreversibility risk (an ECR ahead of a PT return
  when both are due together, because of EV-036 and EV-037), then by the number of
  registrations waiting on the same tenant.
- The binding constraint is the **due-date window**, not the month: ECR and ESI cluster
  toward the same monthly date (§05.9 "the 15th of every month is the load spike"), and the
  product's due-date-window reliability metric exists for the same reason (§19.9). Capacity
  is planned against the window (FR-OPS-031).
- When forecast window demand exceeds window capacity, the desk slows new-tenant intake into
  Mode C before it breaches the SLA (§05.12), and existing tenants are offered Mode B or A
  for the affected cycle with the reason.
- **AC-027.1** — For every open filing instance the queue shows the latest safe start time
  for Mode C and the hand-back cut-off (FR-OPS-028).

**FR-OPS-028 · Hand-back and the always-available fallback** · **P0**
- Every instance carries a hand-back cut-off, `ops.handback_cutoff_minutes_before_due`: the
  last moment a failing Mode C or Mode B session is handed back so the employer can still
  file in Mode A before the due date.
- The hand-back package holds the artefact, the form-control values, the checklist, the
  reconciliation so far, what the log shows was done and what remains, and the portal state
  (for example, "return approved, challan not generated").
- **AC-028.1** — No instance reaches its due date inside our queue without either a
  completed session or a delivered hand-back package; the metric is zero, and every
  exception is a root-cause review.

**FR-OPS-029 · CA-attended sessions** · **P1, R2** (item 20a)
- A CA organisation acts through the cross-tenant grant model (§15.3.6): scopes for read,
  prepare and assisted submission, every action carrying both the CA identity and the tenant.
- A CA session uses the same runbooks, instruction gates and log. Where the CA uses
  credentials in our vault, the written authority names the CA organisation and its named
  individuals; where the CA uses its own arrangement with the client, the product records
  the submission as `submission_mode = employer` with the CA as actor.
- **AC-029.1** — A CA user cannot instruct an act they are performing (AC-004.3).

**FR-OPS-030 · Revocation and customer offboarding** · **P0** (offboarding hand-back and final log export) · **R2 · F-08** (authority revocation and vault shredding)
- A revocation or contract end suspends all sessions at the next step boundary, shreds the
  vault entries (FR-OPS-023), closes open sessions as ABORTED or HANDED_BACK with packages,
  and delivers a final signed export of the on-behalf log (AC-008.3).
- **AC-030.1** — After offboarding, no credential for the tenant decrypts from any store or
  backup (AC-023.2), and every filing instance that was open has a hand-back package.

#### 22.6.1 Desk incident classes and escalation

Not everything that goes wrong on the desk is a security incident, and treating the two alike
is how a real security incident gets lost in a queue of portal outages. §17.6.1 owns the
security-incident lifecycle and FR-OPS-025 the six-hour clock; this table owns the operational
classes, which have a different question at their centre — *whose deadline is now at risk,
and what do we do before it passes?*

**FR-OPS-037 · Desk incident classes** · **P0**

| # | Class | Trigger | First response | Escalation | What the affected tenant is told |
| --- | --- | --- | --- | --- | --- |
| DI-1 | **Window at risk** | Forecast window demand exceeds rostered capacity, or an instance passes its latest safe start time (AC-027.1) | Re-sequence by irreversibility risk (FR-OPS-027); prepare hand-back packages in parallel | Filing desk lead; then the intake rule (AC-031.1), never overtime as the default | Which of its instances move to Mode B or A this cycle, and why |
| DI-2 | **Correlated rejection** | The same root cause rejects instances across `ops.mass_rejection_threshold` tenants or registrations | Freeze further sessions for that artefact type; capture the error files raw (FR-OPS-009) | Statutory desk — a containment review under FR-RULE-019, because the cause is usually a rule, format or validator version | That its filing is held, the cause, and the deadline exposure |
| DI-3 | **Portal changed or unavailable** | Repeated step or sign-in failures across tenants on one portal; a screen the runbook does not describe | Suspend the runbook version (AC-019.1); queued Mode C falls back to Mode B or A | Statutory desk for a runbook version; the watcher registers the change as DETECTED (R1) | That the portal behaviour changed, and which mode its session now runs in |
| DI-4 | **Instruction stall** | A tenant's named approver is unreachable across instances approaching the cut-off | Escalate through the authority's named contacts, then its signatory (FR-OPS-002) | Filing desk lead, who decides hand-back before the cut-off | That an approval is outstanding, from whom, and by when |
| DI-5 | **Desk capacity loss** | An assigned operator is unavailable inside a window | Reassign to the named backup; if no backup is certified, break-glass continuity (FR-OPS-024) | Security lead as second break-glass approver | Only if the mode or the operator named to them changes |
| DI-6 | **Evidence gap pattern** | The same runbook step produces evidence exceptions more than `ops.evidence_exception_threshold` times | Runbook review; the step's evidence definition is re-specified | Statutory desk (FR-OPS-019) | Nothing routinely; the gap appears in Part 8 of its evidence pack |

- **AC-037.1** — Every desk incident has exactly one named owner, an acknowledgement inside
  `ops.desk_incident_ack_minutes` for its class, a list of the filing instances it touches,
  and a review inside `ops.desk_incident_review_days`. All three parameters are routed to §20.
- **AC-037.2** — A desk incident never suspends the hand-back cut-off. Capacity problems are
  resolved by moving work out of Mode C, not by letting an instance run past the moment the
  employer could still have filed it (AC-028.1).
- **AC-037.3** — The desk cannot classify an event touching credentials, the log chain,
  unauthorised access or an AI/ML surface as a desk incident. Those route to §17.6.1 with the
  CERT-In clock running from when it was noticed (EV-062); there is no downgrade path from
  that lifecycle into this table, and an attempt to open one is itself an event.
- **AC-037.4** — A DI-2 or DI-3 record is the evidence an authority-caused miss needs
  (AD-4): the captured portal messages, the error files and the timestamps attach to every
  instance the incident touched, so adjudication reads evidence rather than recollection.

#### 22.6.2 Operator certification

AC-026.1 says the workspace refuses a Mode C session to an operator not certified on the
runbook version. This is what certification is, because "trained" is not an auditable state
and the acts on the far side of it cannot be undone (EV-036, EV-037, EV-041).

**FR-OPS-038 · Certification levels, curriculum and lapse** · **P0** (levels and records) · **R2 · F-08** (the Mode C certification itself)

| Level | May | May not |
| --- | --- | --- |
| **Trainee** | Observe any session; prepare reconciliations; draft hand-back packages | Open a session in any mode; hold a credential handle |
| **Certified on `runbook_id@version`** | Guide Mode B and run Mode C solo for that runbook version | Act on a runbook version they are not certified on; certify anyone |
| **Senior** | Everything above; certify operators; review evidence exceptions (AC-009.1) | Certify themselves; approve their own exception |
| **Suspended** | Nothing; open sessions are reassigned | — |

**The curriculum is the runbook version, not a course.** Certification on a version tests
exactly the things that version can get irreversibly wrong:

| Curriculum item | Drawn from |
| --- | --- |
| The irreversibility facts this runbook turns on — an approved return can never be cancelled; a Revised return dies at payment initiation; a wrong exit date needs a joint declaration | EV-036, EV-037, EV-041 |
| The action codes in scope and the gate on each | FR-OPS-003 |
| Every instruction-gated step, the object each instruction binds to, and why | FR-OPS-004 |
| The reconciliation ladder for this portal, its difference classes and their routes | FR-OPS-035 |
| The failure branches: sign-in failure, OTP not relayed, approver silent, portal drift, scope breach | S6, S9, S12, AC-019.1 |
| The evidence the runbook closes on, and the exception path when it cannot be obtained | FR-OPS-009 |
| The never-list: no Aadhaar entry, no DSC, no bank leg, no acceptance of portal terms the employer has not reviewed, no CAPTCHA service, no password display | FR-OPS-002 always-excluded acts; P1, P5, P6 |

**Certification events and lapse.**

| Event | Effect |
| --- | --- |
| A supervised session on this runbook version, observed by a senior | Prerequisite |
| A scenario test on the version's instruction gates and failure branches, drawn from §22.11 and §22.11.1 | Prerequisite; the passed scenarios are recorded by ID |
| A new **major** runbook version publishes | Certification on the prior version does not carry; recertification precedes the first session |
| A minor version publishes | Certification carries; the diff is acknowledged before the next session |
| No session run on the version for `ops.certification_lapse_days` | Certification lapses to Trainee for that version |
| A scope-breach attempt, or a product-caused miss in which the operator was a proximate cause | Suspension pending review — a record and a retraining trigger, not a sanction decided on the desk floor |

- **AC-038.1** — Certification is per operator × runbook version and is stored as
  `OperatorCertification` (§22.3.2) for the life of every session it permitted, so a dispute
  can establish what the operator had been certified to do on the day.
- **AC-038.2** — No senior may certify themselves, and the certifier is recorded on every
  certification.
- **AC-038.3** — A lapsed or suspended certification changes the mode resolver's input, not
  the operator's discretion: the session resolves to Mode B with `no_certified_operator`
  (MR-8), visibly, rather than running anyway.
- **AC-038.4** — The scenario test uses the runbook's captured screens and the product's own
  test tenants. It is never run against a live portal: there is no test submission
  (FR-OPS-011).

---

### 22.7 The cost model — supervised minutes, registrations and customers per operator

The four-line COGS stack is settled (EV-088): inference is the smallest line; WhatsApp scales
per message; **supervised filing scales per registration × state × filing type and is the
dominant line, unsized**; compliance curation scales per state maintained. Revenue scales per
employee. §13 turns these into rupees and §18 into a price; this subsection produces the
inputs they depend on — minutes, instances and capacity — and the one derived engineering
target, `max_supervised_minutes_per_filing_cycle` (§13; §19.8). Every quantity below is a
named parameter, unsized until the first design-partner quarter is instrumented, and routed
to §20. None is estimated here.

<!-- DIAGRAM: compliance-operations-capacity-model -->

**The parameters.**

| Parameter | Meaning | Measured from |
| --- | --- | --- |
| `m_session[portal, filing_type, mode]` | Active supervised minutes per session | FR-OPS-010 session meter |
| `n_sessions[filing_type]` | Sessions per filing instance (an ECR may need the filing session and a later evidence session) | Session log |
| `m_prep[filing_type]` | Minutes outside the session per instance — reconciliations, instruction follow-up | Reason-coded time (FR-OPS-010) |
| `p_exception[filing_type]` | Share of instances needing exception work — a rejection, an error file, a hand-back | FR-PAY-711 REJECTED count; session outcomes |
| `m_exception[filing_type]` | Minutes per exception | Reason-coded time |
| `f_wait[portal]` | Share of wait minutes that block the operator from other work | Session meter |
| `operator_productive_minutes_per_month` | Minutes an operator can spend on sessions and preparation in a month | Desk records |
| `operator_window_minutes` | Minutes an operator can spend inside the binding due-date window | Desk roster |
| `window_share[filing_type]` | Share of a filing type's minutes that must fall inside the window | Due-date calendar (§06.11) and observed start times |
| `operator_loaded_cost_monthly` | Loaded monthly cost of one operator | Finance |
| `mode_mix[tenant]` | Share of the tenant's instances in Modes A, B, C, D | Filing records (`submission_mode`) |
| `target_supervised_cogs_share` | The share of revenue the supervised-filing line may take | Set by §13 and §18 |

**The formulas.**

- Minutes per filing instance:
  `M_i = n_sessions × m_session + m_prep + p_exception × m_exception`, with blocking waits
  added as `f_wait × wait minutes`.
- Minutes per tenant per month: `M_t = Σ over registrations Σ over filing types
  (instances per month × M_i)`, taken over Mode B and C instances plus any staff minutes on
  Mode A instances.
- Customers per operator, two ways, and the smaller binds:
  `C_month = operator_productive_minutes_per_month ÷ M_t` and
  `C_window = operator_window_minutes ÷ Σ over filing types (window_share × minutes of that
  type for one tenant)`. Because ECR and ESI crowd into the same monthly window (§05.9),
  `C_window` is expected to bind; sizing on `C_month` is the same error NFR-SCALE-902 warns
  against for compute — sizing for the mean instead of the peak (§17.9).
- The automation target, in §13.19's notation: `max_supervised_minutes_per_filing_cycle =
  target_supervised_cogs_share × R_inst(binding) ÷ c_min`. A filing cycle is one instance of
  one filing type on one registration (§19.8). `c_min`, the cost per operator minute, is
  `operator_loaded_cost_monthly ÷ operator_productive_minutes_per_month`. `R_inst(binding)`
  is the lowest revenue per supervised instance among the tenant profiles the price card
  admits, from §18's per-head fee, registration allowance
  (`included_registrations_per_tenant`) and multi-registration line (§18.3). §13.19 derives
  and versions the target; this section supplies its measured inputs (§20 V-26).

**Filing instances per registration — the counting rule.** Instance counts follow from
verified cadences; minutes do not, which is why the two are kept apart.

| Obligation | Attaches to | Supervised instances per registration per year | Cadence source |
| --- | --- | --- | --- |
| ECR return and challan | PF establishment code | 12, plus any Supplementary or Revised returns | Monthly (§06.2; FR-PAY-701) |
| ESI contribution | ESI code | 12 | Monthly (§06.3) |
| Form 138 statement | TAN | 4 in steady state; Q4 is fenced for Tax Year 2026-27 (EV-046) | Quarterly, Rule 219 (EV-049) |
| Form 130 request and download | TAN | 1 | Annual, Rule 215 (§06.11) |
| TDS deposit | TAN | 0 in v1 — no attended-deposit runbook exists (§22.4 coverage); the deposit is the employer's own payment (P5), and its `.csi` challan evidence is imported for Form 138 (FR-OPS-015). Staff minutes spent reconciling it are metered as preparation (FR-OPS-010) | Monthly; dates under r.218 still to be read (§06.13) |
| PT return | PT registration (Maharashtra's PTRC and PTEC separately) | The state's cadence for that registration, `pt.<state>.return_frequency` (per registration where the state assigns it; sized under §20 V-09) | §06.4 — Maharashtra assigns frequency per registration each year |
| LWF remittance | LWF registration | The state's periodicity, `lwf.<state>.periodicity` (§06.8; §20.13) | §06.8 — only Karnataka's periodicity is verified |
| Portal tasks | Event | Joiners, leavers and new registrations | §22.4.5 |

**Worked arithmetic — the two tenant profiles §18.3 contrasts, in instances.** The r5 CFO
review's example — a 60-person, three-state, two-entity tenant against a 150-person
single-registration tenant (§18.3) — is counted here in filing instances. The registration
structures are assumptions of the example, not statutory facts: how many PF and ESI codes a
group holds depends on how it registered (§14.3 notes a single PAN with offices in three
states "possibly" holds three ESI sub-codes).

| | Profile 1 | Profile 2 |
| --- | --- | --- |
| Headcount | 150 | 60 |
| Structure assumed | One legal entity, one establishment, one state: 1 PF code, 1 ESI code, 1 TAN, 1 PT registration | Two legal entities, establishments in three states: 2 PF codes (one per entity), 3 ESI codes (one per establishment), 2 TANs, PT registrations per state and type |
| ECR instances a year | 12 × 1 = 12 | 12 × 2 = 24 |
| ESI instances a year | 12 × 1 = 12 | 12 × 3 = 36 |
| Form 138 instances a year | 4 × 1 = 4 | 4 × 2 = 8 |
| Form 130 instances a year | 1 × 1 = 1 | 1 × 2 = 2 |
| **Central instances a year** | **29** | **70** |
| Central instances per employee a year | 29 ÷ 150 = 0.19 | 70 ÷ 60 = 1.17 |
| PT and LWF instances | One state's cadence | Three states' cadences, on three different portals |

Profile 2 carries 70 ÷ 29 = 2.4 times Profile 1's central instances on 60 ÷ 150 = 0.4 times
its headcount — about 6.0 times the supervised instances per employee before PT and LWF,
which widen the gap further. If minutes per instance were equal, Profile 2's supervised
cost per rupee of per-head revenue would be about six times Profile 1's; in practice its PT
sessions run on more portals, so minutes per instance are unlikely to be lower. This is the
arithmetic behind the registration allowance and the multi-registration line (§18.3); §13
prices it. It is not the binding case for the automation target: with no seat floor, the
20-person single-registration tenant earns the least revenue per supervised instance, and
a multi-registration line does nothing for it (§13.19).

**What moves the minutes.**

| Lever | Parameter it moves | Where specified |
| --- | --- | --- |
| Pre-validation at the portal's own severity | `p_exception` | AC-701.6; AC-GOV-1; AC-FP-3's rejection target |
| Reconciliation done by the product before the instruction gate | `m_prep` | FR-OPS-004; §12.4.1 step 6 |
| One sign-in for several acts on the same registration (ECR plus an exit marking) | `n_sessions` | FR-OPS-019 steps |
| In-session assistance (M3) | `m_session` | §22.1.2 — P2, fenced |
| A reliable OTP roster | `f_wait` | FR-OPS-022 |
| More Mode A, or the CA channel (Mode D) | `mode_mix` — minutes leave our books, and the SLA narrows with them | FR-OPS-001; §05.12 |

**FR-OPS-031 · Capacity forecast and cost reporting** · **P0**
- The desk shall forecast, per upcoming window, demand in minutes (from the calendar's open
  instances × `M_i` by filing type) against rostered `operator_window_minutes`, and report
  customers per operator by tenant profile.
- The cost ledger (§15.6.4) reports supervised minutes per registration × filing type ×
  cycle against `max_supervised_minutes_per_filing_cycle` (§19.8).
- **AC-031.1** — The forecast for a window is published before the window opens, and a
  forecast shortfall triggers the FR-OPS-027 intake rule, not overtime as a default.
- **[Hypothesis]** — per-head pricing with a registration allowance can carry attended
  submission for every single-registration tenant the card admits (§18 H-P13). Kill
  criterion: if, after the first full quarter of design-partner Mode B and C sessions,
  measured minutes per filing cycle exceed `max_supervised_minutes_per_filing_cycle` set on
  the binding profile at the File-tier target price — §13.19 shows the binding profile is
  the 20-person single-registration floor tenant, not Profile 1, unless §18 changes the card
  — attended submission cannot be bundled at that price: Mode A becomes the bundled default
  and Mode C a priced line, or the allowance shrinks (§20 V-26).

#### 22.7.1 The instance ledger — what counts as one of anything

Three sections divide by the same denominator and must therefore count it identically: §13.19
divides revenue by supervised instances to get `R_inst`, §19.8 measures minutes per filing
cycle, and §22.7 above multiplies instances by minutes. A counting rule that drifts between
them would silently move the automation target, and the easiest way to move it is to
reclassify remedial work as new work. The rules below fix the counts, and the awkward cases
are stated as rules rather than left to the implementer.

**The four units.**

| Unit | Definition | Owner |
| --- | --- | --- |
| **Filing instance** | One obligation × registration × period, with its own state machine | §08 FR-PAY-711 |
| **Supervised instance** | A filing instance on which our staff spent metered minutes in any mode — every Mode B, C and D instance, and a Mode A instance only where staff minutes are non-zero | This section (FR-OPS-010) |
| **Session** | One attended occasion on one portal for one registration (S1–S14) | FR-OPS-006 |
| **Filing cycle** | One instance of one filing type on one registration — the denominator of `max_supervised_minutes_per_filing_cycle` | §19.8, restated here only as the tie-point |

**The counting rules.**

| # | Case | Instances | Sessions | Minutes attributed to |
| --- | --- | --- | --- | --- |
| CR-1 | A Regular ECR generated, filed, paid and receipted | 1 | 1, plus a short evidence session where the operator rather than the payer retrieves the receipt | The cycle |
| CR-2 | A rejected upload, root-caused, regenerated and refiled | **1** — the instance does not restart | 2 or more | The cycle, with the second session's minutes flagged as exception minutes (`m_exception`) and the instance counted in `p_exception` |
| CR-3 | A **Supplementary** return for members absent from every prior return that month | **1** — §08 models it as state F12 on the same instance, not a new one | +1 or more | The **original cycle**, as exception minutes. Remedial work never becomes a new cycle: a target measured per cycle would otherwise improve every time we had to file twice |
| CR-4 | A **Revised** return before payment initiation | 1 — state F10 on the same instance | +1 | The original cycle, as exception minutes |
| CR-5 | A Form 138 correction statement for a period already filed | Per §08's routing for the period | +1 | The original period's cycle, as exception minutes, on the CR-3 rule |
| CR-6 | A NIL month closed by Direct Challan Entry (EV-042) | 1 — the obligation exists whether or not a file does | 1 | The cycle |
| CR-7 | A session that hands back, after which the employer files in Mode A | 1 | 1 (ours); the employer's own act is not our session | The cycle; `mode_mix` records our resolved mode and the employer's completion, so a hand-back is never reported as a Mode A efficiency |
| CR-8 | A portal task — exit marking, IP registration, establishment registration (§22.4.5) | **Not a filing instance** | 1 | The registration and a task type; excluded from filing-cycle counts and from §19.1's on-time denominator |
| CR-9 | A deferred s.14B damages deposit run later (EV-039) | Not a new filing instance | 1 | The original cycle, as exception minutes; the open liability sits on the ledger (AC-013.3) |
| CR-10 | Form 130 for a TAN | 1 per TAN per year; per-employee distribution is not an instance | 1 or more | The cycle |
| CR-11 | A state with two registration types, such as Maharashtra's PTRC and PTEC | 2 registrations, therefore separate instances at each one's cadence | Never batched (AC-017.3) | Each registration's own cycle |
| CR-12 | An instance BLOCKED for the whole cycle and never filed — a fenced format, an unresolved regime | 1 filing instance, **0 supervised instances** | 0 | Nothing. It appears in coverage-gap reporting (§05.9 DC-6), never as a supervised cycle we completed cheaply |

- **AC-039.1** — The instance ledger publishes both counts for every period — filing
  instances and supervised instances — and their difference is reported as the Mode A share.
  A single blended count is not permitted, because the two denominators answer different
  questions: obligation coverage, and the cost of attending to it.
- **AC-039.2** — Exception minutes are visible as such wherever minutes per cycle are
  reported, so a cycle that needed a Supplementary is not indistinguishable from one that
  went straight through.
- **AC-039.3** — A change to any rule in the table above is a schema change with an owner and
  a version, and it re-versions the automation target computed under the old rule (§13.19),
  because the target's denominator has moved.

**FR-OPS-039 · The instance ledger** · **P0**
The desk shall maintain, per registration and period, the instance and session counts above
with their minute attributions, reconcile them to the filing calendar's open and closed
instances, and expose them to the cost ledger (§15.6.4), to §13.19's target computation and
to §19.8's measure from one source.

**A worked quarter, to show the counting and nothing else.** Profile 2 of the table above —
two legal entities, three establishments, 2 PF codes, 3 ESI codes, 2 TANs — carries 70
central instances a year. In one quarter that is 3 × 2 = 6 ECR, 3 × 3 = 9 ESI and
1 × 2 = 2 Form 138 instances: **17 filing instances**, with no Form 130 falling in it. Now
stipulate an event mix — one ECR rejected and refiled, one Supplementary for a member whose
UAN seeded late, and three receipts retrieved by our operator rather than by the payer:

| Line | Count | Rule |
| --- | --- | --- |
| Filing instances | 17 | The cadences above |
| Supervised instances | 17 | All in Mode B or C in this example |
| Sessions | 17 + 1 rejection refile + 1 Supplementary + 3 evidence = **22** | CR-1, CR-2, CR-3 |
| Sessions per instance — the measured form of `n_sessions` | 22 ÷ 17 = **1.29** | — |
| Instances carrying exception work — the measured form of `p_exception` | 2 ÷ 17 = **0.12** | CR-2, CR-3 |
| Filing cycles for the automation target | 17 | CR-3 keeps the Supplementary inside its cycle |

The event mix is **stipulated to demonstrate the counting rules**; it is not an estimate of
rejection or supplementary rates, which are measured in the first instrumented quarter and
are unsized until then (§20 V-26). What the arithmetic does establish is structural: had CR-3
counted the Supplementary as a new cycle, the same quarter would show 18 cycles and a lower
minutes-per-cycle figure for identical work — the target improving because we had to file
twice. That is why the rule is written down rather than left to a reporting query.

---

### 22.8 The compliance data pipeline

Four subsystems consume maintained compliance data: the rules engine's rule packs (§15.4.4),
the calendar derived from registrations and due-date rules (§08 FR-PAY-710; §15.5.4), the
filing orchestrator's file-schema objects (§16.1), and replay against past rule versions
(§08 FR-PAY-1002). §14.6 stores the rules and §15.4.5 states the certification contract —
"watcher detects → statutory analyst verifies against primary source (and checks for a
corrigendum — non-negotiable, §02 standing rule) → drafts new rule version with citation →
certification test suite runs against gazette-derived fixtures → staged to a canary tenant
cohort → promoted to all tenants for the effective date". This
subsection specifies the operation that runs that flow every day: what it governs, where it
watches, who writes, who reviews, what it tests against, how it publishes and how it takes a
mistake back.

The standing rule behind all of it is §02.4's: **check for a corrigendum.** Two careful
research rounds reached opposite conclusions on the November 2026 EPF cliff because one read
a notification without checking whether a corrigendum had amended it, and indiacode.nic.in
still reproduces the uncorrected S.O. 5319(E) enumeration (§06.9). A pipeline keyed only to
new instruments would have shipped the wrong answer to every tenant at once.

#### 22.8.1 What the pipeline governs

**FR-RULE-001 · One pipeline for everything the engine and the desk read** · **P0**
Every artefact type below shall reach production only as a PUBLISHED version through the
publish-state machine (FR-RULE-003). There is no administrative screen, database script or
hotfix that edits a live version (P10).

| Governed artefact | Examples | Consumer | Storage and schema owner |
| --- | --- | --- | --- |
| **Rule version** | `pf_rate`, `addback_percent`, `esi_wage_ceiling`, `pt_slab`, `lwf_schedule`, `threshold` rows with counting unit and sphere | Rules engine (§15.4) | `EffectiveDatedRule`, §14.6.1b |
| **Due-date rule** | `filing_due_date` per filing type and jurisdiction | Calendar (FR-PAY-710; §15.5.4) | §14.6.2 |
| **File-format schema version** | The ECR return file (EV-035), the part-payment file (EV-044), Form 138 Q1–Q3 regular and correction (EV-051), the ESIC template once captured (F-05), a legacy 24Q layout only if captured (A-28) | Filing orchestrator | The schema object, §16.1 |
| **Validator severity set** | EPFO's block and flag split (EV-040) | Pre-validation (AC-701.6) | §16.1 `validators[]` |
| **Register specification** | `statutory_register_spec` per state (EV-053, EV-055) | Registers (FR-PAY-709) | §14.6.2 |
| **Runbook version** | The EPFO ECR runbook, each state PT runbook | The filing desk (FR-OPS-019) | §22.4.6 |
| **Holiday calendar** | National and festival holidays per state per year | Shifts and due-date rolling (§09) | §09 |
| **Watch dependency** | The Form 138 Q4 anchors; the ESI successor | The watcher (FR-RULE-006) | §22.8.4 |

- **AC-RULE-001.1** — A write to any live governed row outside the publish path fails at the
  database layer (the rows are append-only to a single service identity), and the attempt
  is a security event.
- **AC-RULE-001.2** — Every computation, artefact and session records the version of every
  governed artefact it used (§08 I4; AC-019.2), so any output can be traced to the exact
  published versions behind it.

#### 22.8.2 The rule object — who fills each field, and when

§14.6.1b holds the complete rule-object schema (`EffectiveDatedRule`) with its invariants
RO1–RO6, and §15.4.3 requires a version id and citation on every rule. The field names below
are §14.6.1b's and are not redefined here. What this section owns is **the pipeline stage
that fills each field group, who fills it, and what the pipeline checks before the version
may move on** — the facts that make a version reviewable, certifiable and reversible.

**FR-RULE-002 · Rule-version fields, filled by pipeline stage** · **P0**

| Field group (§14.6.1b) | Fields | Filled at, by | Pipeline check |
| --- | --- | --- | --- |
| **Identity** | `rule_id`, `rule_key`, `rule_type`, `version`, `rule_pack_id` | DRAFTING, by the author; `rule_pack_id` at CERTIFYING, by the system (§15.4.4) | `version` monotonic per `rule_key` |
| **Jurisdiction scope** | `jurisdiction_id` (Central, a state or UT, or a local body where PT is levied locally), `applies_to_sphere`, `regime`, `registration_type`, `establishment_class`; for `threshold` rows `counting_unit` and `latch_rule` | DRAFTING, by the author | State on the work location, never the employee (Part E-5); sphere and counting unit present on every threshold row (EV-057) |
| **Effective range** | `effective_from`, `effective_to`, `retro_effective` | DRAFTING, by the author, from the instrument | `retro_effective = true` forces the impact list (FR-RULE-009; §15.4.5) |
| **Decision-time range** | `recorded_at`, `superseded_at` | STAGED (canary cohort) or PUBLISHED, by the system; `superseded_at` at R12 or R13 | Never typed by a person (RO2) |
| **Payload** | `payload` under `payload_schema_version`, with units; `rounding_method`, or the named parameter that stands in for an unstated one; `enforcement_mode` | DRAFTING, through the structured form (FR-RULE-008) | Validates against its schema; no guessed rounding (AC-R4; §15.4.6) |
| **Citation and capture** | `source_ref`, `source_url`, `source_captured_at`, `capture_method`, `archive_hash`, `legacy_citation` and `successor_citation` (§06.12 R13; EV-050), `corrigendum_of`, `last_corrigendum_check_at`, `evidence_status` | TRIAGED (capture, FR-RULE-007) and DRAFTING (citation), by the analyst; re-checked at IN_REVIEW | Complete before IN_REVIEW (AC-RULE-002.3); R-3 requires the last corrigendum-check date on every implemented rule (§20.8) |
| **Author and reviewer** | `change_request_id`, `author`, `reviewer`, `certification_ref` | R1 (request), R5 (author), R8 (reviewer), R10 (certification) | `reviewer ≠ author` as a data constraint (AC-DM-43) |
| **Publish state** | `publish_state`, `canary_cohort`, `published_at` | Every FR-RULE-003 transition, by the system | Only the FR-RULE-003 table moves it |

The enforcement rule rides on `evidence_status`: a `[Hypothesis]` rule may warn, never
block (§06.12 R17; RO5). The "144 overtime hours a quarter" cap — reported by secondary
summaries only and never confirmed against gazette text — is the standing example (K-04;
EV-012, EV-K15).

- **AC-RULE-002.1** — A version with `[Hypothesis]` evidence cannot publish with
  `enforce`; the pipeline forces `warn_only` or blocks publication.
- **AC-RULE-002.2** — A `[Verified — mirror]` version publishes with a visible flag, an open
  task to pull the primary source, and no use in customer-facing copy until the task closes
  (Part A-1).
- **AC-RULE-002.3** — A version without a complete citation or a recorded corrigendum check
  cannot leave DRAFTING (AC-R6).

#### 22.8.3 The publish-state machine

<!-- DIAGRAM: compliance-operations-rule-publish -->

**FR-RULE-003 · Publish states for every governed artefact** · **P0**
The diagram illustrates; the table specifies. Each change request moves through explicit,
logged states; one request may produce several versions, all published together in one pack.

| # | From → To | Event | Guard | Side effect | Who may trigger |
| --- | --- | --- | --- | --- | --- |
| R1 | *(none)* → DETECTED | A watcher hit, an operator's drift report, a customer or CA report, a portal rejection pattern | — | Change request opened with its source | Watcher (A6), or any staff member |
| R2 | DETECTED → TRIAGED | Classified | Source captured raw and rendered, archived with hash (FR-RULE-007) | Class recorded — new instrument, amendment, corrigendum, clarification, portal behaviour; affected rule types and jurisdictions; urgency from the effective date | Statutory analyst |
| R3 | TRIAGED → NO_CHANGE | No product impact | For an amendment or corrigendum, a second analyst concurs | Closed with reasons; the watcher subscription stays | Analyst plus concurring reviewer |
| R4 | TRIAGED → DRAFTING | Change needed | — | Draft versions opened | Statutory analyst |
| R5 | DRAFTING → IN_REVIEW | Draft submitted | Citation complete; corrigendum check recorded; impact analysis generated (FR-RULE-009); golden cases added or updated (FR-RULE-011) | Reviewer assigned from the qualified pool | Author |
| R6 | IN_REVIEW → DRAFTING | Returned | Reasons recorded | — | Reviewer |
| R7 | IN_REVIEW → REJECTED | Rejected — for example, the instrument was misread | Reasons recorded | Request closed | Reviewer |
| R8 | IN_REVIEW → CERTIFYING | Approved | Reviewer is not the author; reviewer is qualified in the domain; reviewer attests to reading the primary source independently | — | Reviewer |
| R9 | CERTIFYING → DRAFTING | Certification fails | Any golden case or portal-validator fixture diverges (AC-R4) | Failure report | System |
| R10 | CERTIFYING → STAGED | Certification passes | Every golden case and portal fixture reproduces exactly | Signed rule pack built (§15.4.4) | System |
| R11 | STAGED → PUBLISHED | Promoted | Canary cohort clean (FR-RULE-013); live before the first run or session that needs it, with `rule.publish_lead_days` of lead where the effective date allows | Tenant-scoped impact attached (AC-RULE-009.1), with the drafted notice once FR-RULE-015 ships; open months prompted to reprocess; affected filed periods enqueued (FR-RULE-009) | Statutory desk lead |
| R12 | PUBLISHED → SUPERSEDED | A newer version for the same scope publishes | — | The old version stays queryable forever (§15.4.3) | System |
| R13 | PUBLISHED → ROLLED_BACK | A defect is found | Two approvers | A superseding version restores the prior payload (FR-RULE-014) | Statutory desk lead plus a reviewer |
| R14 | Any state before PUBLISHED → WITHDRAWN | The triggering instrument is withdrawn or stayed | — | Request closed with the source | Analyst plus reviewer |
| R15 | STAGED → DRAFTING | The canary cohort shows a defect — a divergence, a portal-validator failure on canary data, or a calendar error | Defect recorded with the canary evidence | Pack withdrawn from the canary; a golden case reproducing the defect is added before redrafting (FR-RULE-011) | System, or statutory desk lead |

- **AC-RULE-003.1** — Every published version reproduces its full state history from the
  log: who detected, triaged, drafted, reviewed, certified and promoted it, and when.
- **AC-RULE-003.2** — No state transition in R5, R8, R11 or R13 can be made by the same
  person who made the preceding one in the same request.

#### 22.8.4 The watcher — sources, cadence and the corrigendum procedure

The watcher is the front end of the pipeline: the A6 cost class (§13.13) and the
watch/notify task class (§12.4). It flags; it never edits a rule. A human confirms against
the primary source, including the corrigendum check, before any version changes (§12.4).

**FR-RULE-004 · The watch-source register** · **P0**
Each source below shall be a registered watch source with a cadence, a fetch method, known
traps and the watch keys that point at it.

| Source | What it catches | Fetch method and known traps |
| --- | --- | --- |
| EPFO revamped-ECR page (www.epfo.gov.in/revamped-ecr/), with the manual and FAQ PDFs it links | ECR workflow, validation and format changes; the beta's status | The circular and the FAQ are image-only scans with no extractable text, read as images (r5/02); URLs printed in EPFO's own circular and FAQ are dead after the domain move (EV-045) |
| EPFO circulars index (www.epfo.gov.in/circulars/) | New circulars, any arrear-return layout, successor schemes | Enumerate the index, do not sample it — r5/02 enumerated every PDF to confirm the arrear-layout null |
| Protean TIN regular and correction download pages | Form 138 formats; RPU and FVU versions; the Q4 anchors | Static server-rendered HTML — no browser needed. The "Updated As On" footer is client-side script printing the visitor's own date and proves nothing about freshness. Pin versions by the downloaded artefact: the page labels the Q1–Q3 format "Version 1.2" while the workbook says "Version 1.1" (r5/02 findings 19–20, 34–36) |
| CBDT FAQs and guidance notes on forms (incometaxindia.gov.in) | Form and section mapping; guidance notes | The edge block yields only to a complete browser header set (r5/02) |
| Income-tax e-filing portal announcements (incometax.gov.in) | Portal functions switching on — for example Tax Year 2026-27 correction filing (r1/06 finding 33) | Read as published; each announcement is a lead to confirm |
| ESIC (esic.gov.in and the employer portal) | Contribution rates, ceilings, the successor regime after the saving lapses | Incomplete TLS certificate chain (r3/05); named-host exception only |
| e-Gazette and ministry sites (MoLE, CBDT, MeitY) | Notifications, rules, corrigenda under the Codes and the Income-tax Act | Scripted fetches can be refused; a mirror read is marked `[Verified — mirror]` until pulled from the primary source (EV-058 is the standing example). indiacode.nic.in is never the only source, because its footnotes can reproduce an uncorrected enumeration (§06.9) |
| State gazettes, state PT portals and labour welfare boards | Slabs, periodicity, due dates, state Code rules and forms | Portal banners are leads, not rules (§22.4.4). Whether some states publish only in regional-language gazettes on no fixed calendar is unmeasured and is the kill criterion for linear state cost (§05.15) |
| Union Budget and Finance Act | TDS slabs and new-regime parameters, effective 1 April | The annual spike; the Budget-cycle trace is §05.15 |

- Cadence is `watch.cadence[source]`, raised near a dated dependency: ESIC and MoLE are
  watched at least as often as the weekly ESI-cliff review §20.10 runs from October 2026.
- **AC-RULE-004.1** — Every source records its last successful fetch; a source that fails
  `watch.max_consecutive_failures` fetches raises an alert, because a silent source is an
  uncaught amendment.

**FR-RULE-005 · The corrigendum and amendment procedure** · **P0**
The watcher's ingestion shall run §02.4's recipe continuously: index each gazette entry by
the base instrument it cites; scan the ministry and date window around every tracked
instrument; raise a re-verify task on any entry whose effective date precedes its
publication date; and flag every hit that touches a live rule with a check-for-corrigendum
marker that a human clears before the rules engine changes (§13.13).

- Every published rule version holds a watch subscription on its base instrument
  (`corrigendum_of` lineage, §14.6.1b), so an amendment to anything the engine already uses
  is a DETECTED change request, not a news item.
- **AC-RULE-005.1** — Replayed against the November 2026 episode — the successor EPF Scheme
  2026, the retrospective 12% re-notification by S.O. 3582(E), and corrigendum S.O. 5936(E)
  of 19.12.2025 amending the S.O. 5319(E) enumeration — the watcher raises the corrigendum as
  a change request against the rule rows it touches (§19.9.1). A watcher that would not
  have flagged it cannot go live, and no compliance SLA is sold before it passes (§19.9).
- **AC-RULE-005.2** — A seeded corrigendum in a test feed changes the emitted format or rule
  within one business day through the full pipeline, including review and certification
  (AC-01.1, §01; UC-W1, §12.9).

**FR-RULE-006 · Named watch dependencies** · **P0**
Dependencies that unblock a fenced capability shall be registered as explicit watch keys,
each with the instances it releases.

| Dependency | Watch key | Releases |
| --- | --- | --- |
| Form 138 Q4 regular format | The Q4 anchor on Protean's regular page stops being `#` (r5/02 finding 19) | Q4 generation (AC-706.3); Tax Year 2026-27 Form 130 preparation (AC-707.1); FR-OPS-016 — with the next row, clears F-01 |
| Form 138 Q4 correction format | The Q4 anchor on the correction page stops being empty (r5/02 finding 20) | Q4 corrections |
| Tax Year 2026-27 correction filing on the portal | The e-filing portal's announcement (r1/06 finding 33) | Held corrections (AC-015.4) — clears F-02 |
| The ESI regime after the saving lapses on or about 21 November 2026 | ESIC and MoLE notifications and any corrigendum (§20 V-08) | Post-cliff ESI instances (AC-702.2) — clears F-04 |
| TDS deposit dates under r.218 of the Income-tax Rules 2026 | The notified rule text (§06.13) | The deposit rows in the calendar — clears F-10 |
| Code-era bonus ceilings, payment deadline and return form | Central and state notifications (§06.7) | `bonus.payment_deadline`, `bonus.annual_return_form` (FR-PAY-705) — clears F-09 |
| Gratuity payable ceiling under CoSS s.53(3) | A Central notification (§06.6) | `gratuity.payable_ceiling` (§08) |
| Each state's Code-era commencement | The state's gazette | The state's `code_regime` rows (§14.6.2) |
| The EPFO arrear-return layout | The EPFO circulars index and revamped-ECR page (EV-043) | An arrear generator and runbook (§05.7) — clears F-03 |
| The revamped ECR leaving beta, or changing | The revamped-ECR page | EPFO runbook re-verification (FR-OPS-019) |

- **AC-RULE-006.1** — When a watch key fires, the dependent filing instances leave BLOCKED
  (FR-PAY-711 F3) only after the new version publishes through the pipeline — never on the
  watcher's hit alone (AC-1005.2).

**FR-RULE-007 · Source capture and provenance** · **P0**
- Every source is fetched both raw and rendered, because the two fail in opposite
  directions — rendering hides content in HTML comments, and a raw fetch misses content a
  script injects (the research-method finding of r5/00-synthesis item 18, first seen on
  vendor pricing pages). Image-only PDFs are transcribed by one analyst and checked by a
  second.
- Each capture stores the fetched bytes, their hash, the capture timestamp and method, and
  the analyst. A citation points at a stored capture, not only at a URL that may die — as
  EPFO's did (EV-045).
- **AC-RULE-007.1** — For any published version, its cited source reproduces from the
  archive byte-for-byte, with its capture record.

#### 22.8.5 Authoring and impact

**FR-RULE-008 · The authoring surface** · **P0**
- A structured form per artefact type, never free text for payload: slab tables with
  ordered bands, rates with units, dates with their governing instrument; plausibility
  checks against the prior version (a slab that stops being monotonic, a rate that moves by
  more than `rule.plausibility_delta` of itself) raise a mandatory reviewer note.
- The diff against the prior version is the review view: every changed field, its old and
  new value, its citation.
- A6 may pre-fill a draft summary from the source; it never commits a value, and every
  pre-filled field is marked as machine-drafted until a person edits or confirms it (§12.4
  watch/notify).
- **AC-RULE-008.1** — A payload value with no citation field populated cannot be saved.

**FR-RULE-009 · Impact analysis and the retrospective path** · **P0**
Before review, the pipeline shall compute and attach, for each draft version:

- the tenants, registrations, employments and periods it touches, resolved exactly as the
  engine will resolve them (§14.6.3);
- open payroll months that will need reprocessing before LOCK (FR-PAY-301 M5);
- locked months that need a correction run as a diff, never a mutation (FR-PAY-301 M12);
- filed instances that need a correction, with the route that remains open — a Revised ECR
  only if no payment has been initiated, a Supplementary return for absent members, a Form
  138 correction statement on the period's format family, or the fenced arrear flow
  (EV-037; EV-043; FR-PAY-708);
- the exposure the engine computes for any late deposit the change creates — interest from
  the effective rule, never a model estimate (§12.8.1).

- **AC-RULE-009.1** — A retrospective version (`retro_effective`) cannot publish without its
  impact list, and on publication the list scoped to each affected tenant is attached to
  that tenant's affected filing instances and open months, where its filing calendar shows
  it. The drafted tenant notice is FR-RULE-015 (P1, R2); this criterion does not depend on
  it.

#### 22.8.6 Two-person review

**FR-RULE-010 · Two-person review by a qualified reviewer** · **P0**
- The reviewer is not the author, holds the qualification for the domain — income tax and
  TDS formats; EPF, ESI and the Codes; state PT and LWF per state; portal runbooks per portal
  — and opens the primary source independently rather than reviewing the author's excerpt.
- The review checklist is fixed: effective date and retrospective effect; sphere and
  counting unit (EV-057); both vocabularies (EV-050); rounding stated or parameterised;
  enforcement mode matches evidence status; runbook and format schema impact; the corrigendum
  check re-done, not ticked.
- A disagreement the two cannot resolve on the text goes to counsel (FR-RULE-018); the
  version stays in review or publishes `warn_only`, never `enforce`, until it is resolved.
- **AC-RULE-010.1** — The qualified-reviewer pool holds at least two people per domain before
  the first paying customer — the two-person rule needs two, and R-11 requires a cross-trained
  second reviewer before that date (§20.8).

#### 22.8.7 The golden-case regression corpus

**FR-RULE-011 · The golden-case corpus** · **P0**
Every version shall be certified against a corpus of cases with exact expected outputs.

| Case source | Examples | Rule for the case |
| --- | --- | --- |
| Statutory test vectors | Every vector in §06.14, by ID, as that table stands at certification — the corpus imports the table, never a copied range | Re-baselined only when the underlying rule is re-verified |
| Portal fixtures | The EPFO Help File sample lines (TV16) and part-payment samples (EV-044); Protean's `138RQ1.txt` (AC-706.1) | Must round-trip byte-for-byte |
| Gazette-derived worked examples | Every rule version's own worked example from its instrument | Written by the author, checked by the reviewer |
| Boundary cases | The §20.9 edge cases — EPS cap, ESI period continuation, February PT top-up, LOP divisor | At least one boundary case per rule version (§20.9 standing rule) |
| Rejection-derived cases | Every portal rejection, once root-caused and fixed | Pseudonymised; added before the fix publishes |
| Tenant-derived cases | Real structures that exposed a defect | Pseudonymised under the tenant's agreement; never raw personal data |

- Each case is pinned to rule versions, period and evaluation context (§08 I6) and expects
  output to the paisa (AC-R4).
- **AC-RULE-011.1** — Changing an expected output needs two-person review and a reason; a
  change made to make a failing version pass is visible in the diff as such.
- **AC-RULE-011.2** — Coverage is reported per rule type and jurisdiction; a published
  version with no exercising case is a certification defect.

**FR-RULE-012 · The certification gate** · **P0**
A version certifies only when every golden case reproduces exactly; every affected file-schema
version passes its portal validator fixtures — the ECR fixtures, and the FVU run on the
period's stack for Form 138 (EV-052); and the calendar renders every affected due date.
- **AC-RULE-012.1** — Certification results are stored with the pack (`certification_ref`)
  and reproduce on re-run.

#### 22.8.8 Staged publish, rollback and notices

**FR-RULE-013 · Staged publish** · **P0**
- Packs publish first to a canary cohort — an internal tenant set with synthetic
  registrations in every affected jurisdiction, then design-partner tenants who opt in — and
  promote when the canary is clean.
- Publication is scheduled against the effective date so the version is live before the
  first run or session that needs it; a version effective inside an open month prompts
  reprocessing before LOCK.
- Non-urgent packs do not publish inside a due-date window (`rule.freeze_window_hours`); a
  pack effective inside the window publishes with the statutory desk lead's approval and a notice to
  the filing desk.
- **AC-RULE-013.1** — A pack promoted to all tenants without a clean canary record is
  impossible in the pipeline, not merely discouraged.

**FR-RULE-014 · Rollback** · **P0**
- A rollback is a new superseding version restoring the prior payload — rules are a
  bitemporal entity class, and the rule store never deletes (§15.4.3; §14.6.1a; bitemporality
  is scoped by entity class, Part E-2, K-24) — approved by two people.
- Unlocked periods recompute on the restored version. Locked and filed periods get
  correction runs through the routes FR-RULE-009 lists, as diffs. Filed artefacts never
  change.
- **AC-RULE-014.1** — A rolled-back version remains queryable, with the reason and the
  superseding version, and every output that used it is listed.

**FR-RULE-015 · Tenant change notices** · **P1, R2**
- Each published change produces a notice per affected tenant: what changed, from when, its
  citation, which of the tenant's registrations it touches, what happens to the open month,
  and any filed period that needs a correction.
- **AC-RULE-015.1** — A notice is drafted from the pack's diff and impact list, never
  composed freehand, and its figures come from the engine (§12.8.1).

#### 22.8.9 Pipeline measures, state onboarding and counsel

**FR-RULE-016 · Pipeline measures** · **P0**
The pipeline shall report the §19.9 measures — **Statutory-Change Lead Time** (notification
or corrigendum to live rule) and **Corrigendum-Catch Rate** — plus:

| Measure | Definition | Target |
| --- | --- | --- |
| Notification-to-certified latency | DETECTED to CERTIFYING-passed, per change class | Below the shortest effective-notice window observed (§15.4.5 A2 kill criterion) |
| Subscription coverage | Published rule versions with an active base-instrument subscription ÷ all published versions | 100% |
| Review cycle time | IN_REVIEW to CERTIFYING, per domain | `rule.review_cycle_target_hours` |
| Certification failure rate | CERT failures ÷ certifications | Tracked; a rising rate means weak drafting |
| Rollbacks | Count, with root cause | Each is a review |
| Runbook freshness | PUBLISHED runbooks past `reverify_every` | 0 |

**FR-RULE-017 · The state onboarding pack** · **P0** (the R1 state, C-16) · **R2** per further state (the clear condition of F-06[state] and F-07[state])
A state becomes offerable to tenants only when all of the following exist: its dataset row
to the §20.6 V-09 field specification — levy, slabs with effective dates, gender variants,
periodicity, special instalments, registration and threshold, return frequency and due date,
LWF levy, split and periodicity — each field with its gazette URL and date; its rule versions
PUBLISHED; its golden cases, including boundary cases; its PT and LWF runbooks PUBLISHED from
a captured session (FR-OPS-017); its watch sources registered; and a named analyst and
reviewer.
- **AC-RULE-017.1** — The state coverage register lists every state with its pack status;
  aggregator data never appears as a source (§20.12 rule 1).

**FR-RULE-018 · Counsel escalation** · **P0**
- An interpretive question — as opposed to a factual one the text answers — is raised as a
  counsel question with the instrument, the candidate readings and the product consequence of
  each, and recorded on the counsel register (§23).
- Until counsel answers, the affected version publishes `warn_only` or stays unpublished
  with its instances BLOCKED; it never publishes `enforce` on an analyst's reading alone.
- **AC-RULE-018.1** — Every version whose interpretation rests on counsel advice records the
  counsel-register reference; the citation stays the instrument itself.

#### 22.8.10 How the pipeline itself fails, and what contains each failure

The pipeline is a control; controls fail quietly. The publish-state machine protects against a
*wrong rule*, but not against a pipeline that has stopped seeing, stopped reviewing or
stopped testing what it thinks it is testing. Each mode below is named with the signal that
reveals it, because an unnamed failure mode is discovered by a customer.

**FR-RULE-019 · Named pipeline failure modes and their containment** · **P0**

| # | Failure mode | How it shows | Containment | Who decides | What the tenant sees |
| --- | --- | --- | --- | --- | --- |
| PF-1 | **A watch source goes silent** — the URL moved, as EPFO's did (EV-045), or the page stopped being updated | Consecutive fetch failures (AC-RULE-004.1); or a fetch that succeeds but the content has not changed for `watch.max_silent_days` | The source is marked SUSPECT, never healthy; a human re-resolves the host as a runbook does; every rule row citing it carries "source unverified since" on `last_corrigendum_check_at` | Statutory desk lead | Nothing at first; past the re-verify window the affected rows show as unverified in the coverage statement |
| PF-2 | **A fetch returns success and nothing useful** — an edge block or an error body with a 200 status, the trap r5/02 hit on CBDT pages | Content-shape assertion fails while the status code passes | Treated as PF-1, not as a healthy fetch; the fetch method for that source records the complete header set it needs | Analyst | As PF-1 |
| PF-3 | **An image-only source is mis-transcribed** — EPFO's revamped-ECR circular and FAQ have no extractable text (r5/02) | Two independent transcriptions diverge (FR-RULE-007) | DRAFTING is blocked until the divergence is resolved against the stored capture | Analyst plus the second transcriber | Nothing |
| PF-4 | **A review domain falls below two qualified people** | The qualified-reviewer roster (AC-RULE-010.1) | No version in that domain reaches R8; the domain's pending versions hold, or publish `warn_only` where they are already drafted and urgent; states depending on that domain stop being offerable (FR-RULE-017) | Statutory desk lead | The coverage statement, where a state or obligation stops being offered |
| PF-5 | **A state has one qualified person, who is also its author** | The state pack's author and reviewer resolve to the same person | The state cannot pass its authoring gate; it stays non-offerable until a second person is qualified (R-11 cross-training) | Statutory desk lead | The state is not offered; computation and carve-out continue (AC-017.1) |
| PF-6 | **The canary cohort does not exercise the change** — no tenant or synthetic registration in the affected jurisdiction | The promotion guard compares the pack's jurisdiction scope to the cohort's registrations | Promotion is refused until the cohort is extended with a synthetic registration in that jurisdiction. "Canary clean" on a cohort that never ran the change is a certification defect, not a pass | System, then statutory desk lead | Nothing; the pack publishes a cycle later if the cohort must be built |
| PF-7 | **The golden corpus is fitted to the code** — an expected output edited to make a failing version pass | AC-RULE-011.1 renders every expectation change in the diff, with its reason | A case whose expectation has changed more than once is re-derived from its instrument before it may certify anything; every expectation change is listed in the monthly pipeline review | Reviewer plus statutory desk lead | Nothing |
| PF-8 | **The certification environment drifts** — the FVU or RPU stack updated piecemeal, which Protean warns can cause rejection at submission (EV-052) | A hash manifest of the pinned stack folders is verified before every certification run | Certification blocks on a manifest mismatch; the stack is replaced as complete folders, per period family | System | Nothing, unless a Form 138 generation is held |
| PF-9 | **A pack lands inside a due-date freeze window** | `rule.freeze_window_hours` | Only the statutory desk lead may publish inside the window, with a notice to the filing desk (FR-RULE-013); an attempt without that approval is refused and logged | Statutory desk lead | A change notice where the pack touches its open month |
| PF-10 | **A rollback is itself defective** | A second ROLLED_BACK on the same `rule_key` within one effective period | A mandatory halt on that `rule_key`: no further version publishes until a root cause is recorded and a golden case reproducing both defects exists | Statutory desk lead plus a reviewer | The rule holds its last good version; affected months are listed by the impact analysis |
| PF-11 | **A corrigendum lands after promotion** | The base-instrument subscription fires (FR-RULE-005) | This is the mode the pipeline absorbs rather than prevents: a new change request, an impact list of filed periods, and the route that remains for each (FR-RULE-009) | Analyst, then the normal path | A change notice naming the filed periods that need a correction |

- **AC-RULE-019.1** — Every mode above has a detection that runs without a person
  remembering to look, and a named owner. A mode detected only by a customer report is a
  pipeline defect in its own right and is reviewed as one.
- **AC-RULE-019.2** — While a containment is active for a domain or jurisdiction, no version
  in that scope publishes with `enforce`; `warn_only` is the ceiling until the containment
  clears (the same discipline AC-RULE-002.1 applies to evidence).
- **AC-RULE-019.3** — Containments are visible in the FR-RULE-016 measures rather than
  hidden behind them: PF-1 and PF-2 move subscription coverage, PF-4 moves review cycle time,
  PF-7 and PF-8 move the certification failure rate. A measure that stays green while a
  containment is active is a measure defect.
- **AC-RULE-019.4** — Where a containment changes what a tenant may rely on — a state that
  stops being offerable, an obligation whose rows are unverified — it flows into that
  tenant's coverage statement (§05.21), not only into an internal dashboard.

---

### 22.9 Sizing the pipeline — analysts per state and the marginal state

The r5 CFO review, quoting the earlier draft's own description of statutory maintenance as
"the largest unsized cost in the plan", asked for headcount at launch and at 500 and 2,000
customers, state coverage per analyst, the counsel retainer and the marginal cost of a
state. The honest answer is structural: the
**pipeline's load scales with states, portals and instruments, not with customers**, and the
**desk's load scales with registrations under Modes B and C**. Headcount at a customer count
is therefore a function of which states and registrations those customers bring. The model
below is what gets instrumented; no figure is estimated.

| Work unit | Scales with | Examples | Measured from |
| --- | --- | --- | --- |
| **Central base load** | Nothing — fixed, org-wide | The Finance Act cycle, CBDT format releases, EPFO and ESIC changes | Change requests by source (FR-RULE-003) |
| **Per-state load** | States maintained | PT slabs, LWF schedules, state Code rules and forms, holidays | Change requests by jurisdiction |
| **Per-portal load** | Portals with runbooks | Runbook drift and re-verification | Runbook events (FR-OPS-019) |
| **State onboarding** | States added | The V-09 dataset, the captured runbooks, the golden cases | Onboarding effort per state (FR-RULE-017) |
| **Counsel load** | Interpretive questions | Part D items; state-sphere retention periods | Counsel register (§23) |

**The sizing formula.** Statutory-desk effort in hours a year =
`(E_central × h_central + Σ over states E_s × h_s + Σ over portals D_p × h_p + O × h_onboard)
× (1 + r_review)`, and analysts = that ÷ `analyst_productive_hours_per_year`, plus standby
for the dated spikes — the Budget window in particular (§05.15). Here `E` is change
requests a year, `h` hours per request, `D_p` runbook drift events, `O` states onboarded,
and `r_review` the reviewer's effort as a share of the author's. Every term is a named
parameter, measured from the pipeline log from its first month and routed to §20.

**The structural floor.** Before the first paying customer, at least two qualified people per
review domain (AC-RULE-010.1): income tax and TDS formats; EPF, ESI and the Codes; state PT
and LWF for the states offered. Domains split as state volume grows.

**The marginal state.** `cost_per_state_per_year = recurring (E_s × h_s × (1 + r_review) +
watch cost + Σ over its portals D_p × h_p) + share of counsel`, plus the one-time
`h_onboard`. Amortised per tenant, it is divided by the tenants using that state — which is
why the first tenants in a new state are the expensive ones, and why §05.5 sequences states
by design partners. **[Hypothesis]** — per-state cost is roughly linear in states. Kill
criterion (§05.15): if some states publish only in regional-language gazettes on no fixed
calendar, cost is super-linear and the all-states timeline is re-priced.

**What sets headcount at each stage.**

| Stage | Statutory desk driver | Filing desk driver | Must be measured first |
| --- | --- | --- | --- |
| Launch (design partners) | Central load plus the design-partner states; the two-per-domain floor | Registrations in Mode B first submissions (FR-OPS-011) | `h` per change class; `m_session` per portal |
| 500 customers | States those customers operate in | Registrations under Modes B and C, and their window concentration | `C_window` by profile (FR-OPS-031); `E_s` per state |
| 2,000 customers | States, plus the portal and local-body tail | As above, with `mode_mix` and the CA share | Whether per-state cost stayed linear |

**Defending the moat.** The moat is not that anyone else's data is wrong — no such claim is
made (Part A-9; §21). It is that we **contract** for maintenance under an SLA, publish the
maintenance record — lead time and corrigendum-catch rate (§19.9) — and hold a cost per state
maintained that the business can carry. An incumbent at scale amortises the same work across
its own base; greytHR, for instance, currently claims "30,000+ companies" (EV-091, captured
September 2026). The defence is therefore the record and the contract, not the claim of
uniqueness.

#### 22.9.1 Onboarding a state, as gated stages

FR-RULE-017 states the *conditions* a state pack must satisfy. Those conditions are reached in
an order, each stage has an owner and an exit gate, and the expensive discovery — that a
state's slabs cannot be sourced from its own gazette, or that its portal does something no
runbook describes — must happen before a tenant has been sold the state, not after. The stage
machine below is also the unit `h_onboard` is measured in: an unstaged onboarding produces one
undifferentiated number that tells the business nothing about which part of a new state is
expensive.

<!-- DIAGRAM: compliance-operations-state-onboarding -->

**FR-RULE-020 · The state onboarding stages** · **P0** (the R1 state) · **R2** per further state

| Stage | Entry | Work | Exit gate | Owner | Effort parameter |
| --- | --- | --- | --- | --- | --- |
| **CANDIDATE** | A design partner needs the state, or the roadmap calls it (§05.5) | Name the analyst and reviewer; register the watch sources — state gazette, PT portal, welfare board (FR-RULE-004) | G1: both people named, sources registering successful fetches | Statutory desk lead | — |
| **SOURCING** | G1 | Capture every §20 V-09 field from state-primary sources, raw and rendered, with URL, date and hash (FR-RULE-007) | G2: every field carries a state-primary citation. A field sourced only from an aggregator does not pass (§20.12 rule 1) | Analyst | `h_onboard.sourcing` |
| **BLOCKED_SOURCE** | G3 — a field has no primary source, or the gazette is unreadable | Escalate: a counsel reading, a regional-language transcription with two-analyst check (PF-3), or a decision to decline | G4 back to SOURCING, or G5 to DECLINED | Statutory desk lead; counsel where interpretive (FR-RULE-018) | Counted separately — this is where the linearity hypothesis dies if it dies |
| **AUTHORING** | G2 | Draft rule, due-date and register-specification versions with citations; generate impact (FR-RULE-009) | G6: the second qualified person reviews and approves (FR-RULE-010); PF-5 blocks a single-person state | Analyst, then reviewer | `h_onboard.authoring` |
| **CERTIFYING** | G6 | Build golden cases including at least one boundary case per rule version (FR-RULE-011) | G8: every case reproduces exactly; G7 returns to AUTHORING on any divergence | System | `h_onboard.certification` |
| **CAPTURE** | G8 | Capture the portal and return flow in a Mode B first submission with a design partner (FR-OPS-011); publish the PT and LWF runbooks (FR-OPS-017) | G9: runbooks PUBLISHED with an empty `unknowns[]` | Senior operator plus runbook author | `h_onboard.capture` |
| **PILOT** | G9 | One full live cycle for a design partner in that state, filed and reconciled end to end | G10: the cycle closes with evidence; G11 returns to AUTHORING if the live cycle contradicts a drafted rule | Filing desk lead | `h_onboard.pilot` |
| **OFFERABLE** | G10 | The state enters the coverage statement as offered; tenants may enable it (AC-017.1) | G12: the pack enters the normal watch and review cadence | Statutory desk lead | — |
| **MAINTAINED** | G12 | The recurring load: `E_s` change requests, runbook re-verification, watch | G13 to DEGRADED on a silent source or a stale runbook | Analyst | `E_s × h_s` |
| **DEGRADED** | G13 | Restore the source, re-verify the runbook | G14 back to MAINTAINED, or G15 to WITHDRAWN | Statutory desk lead | — |

- **AC-RULE-020.1** — A state cannot skip a stage, and cannot be offered before OFFERABLE.
  "Coming soon" is not a coverage state: a tenant is either offered a state or told, in the
  coverage statement, that it is not offered and what that means for its filings (§05.21).
- **AC-RULE-020.2** — A tenant with a work location in a non-offerable state still sees the
  obligation, its liability where the engine can compute it, and its deadline clock; what it
  does not get is a session (AC-017.1; §05.9 DC-1 to DC-6). The obligation never disappears
  because our pack is not ready.
- **AC-RULE-020.3** — DECLINED and WITHDRAWN are recorded states with reasons, not silence.
  A WITHDRAWN state moves its tenants to computation plus carve-out with a notice, and the
  notice is stored against the coverage-statement version (§05.9 DC-4).
- **AC-RULE-020.4** — Each stage's effort is logged against its own parameter, so
  `h_onboard` is reported as a decomposition rather than a single number. The first two states
  onboarded set the baseline the linearity hypothesis of §22.9 is tested against; a state
  whose BLOCKED_SOURCE time exceeds its sourcing time is the signal that the kill criterion
  is approaching.
- **AC-RULE-020.5** — A state's PILOT cycle is run for a real design partner, not a synthetic
  tenant: the canary cohort proves the pack computes, and only a live cycle proves the portal
  behaves as the runbook says (FR-OPS-011; PF-6).

---

### 22.10 Org design — the compliance-maintenance operation

§01 and §05.15 state the decision; this is its shape. The operation has three units and a
retained counsel, and the release of rules is decoupled from the release of code.

| Unit | Owns | Grows with |
| --- | --- | --- |
| **Statutory desk** — analysts, reviewers, statutory desk lead | The pipeline: watch, triage, authoring, review, certification, publish, rollback; runbook authoring | States, portals, instruments |
| **Filing desk** — operators, senior operators, filing desk lead | Attended sessions in Modes B and C; exceptions; hand-backs; root-cause reviews | Registrations under Modes B and C, and window concentration |
| **Trust and security** — security lead | The vault, workspace, access reviews, break-glass, incident response to six hours | Operators and tenants in Mode C |
| **Counsel (retained)** | The authority template, the four questions, interpretive escalations, the counsel register | Interpretive questions; `counsel_retainer_monthly` |

**Who does what — the load-bearing activities.** R = responsible, A = accountable, C =
consulted, I = informed.

| Activity | Statutory analyst | Statutory reviewer | Statutory desk lead | Operator | Filing desk lead | Security lead | Counsel | Customer approver |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Draft a rule, format or runbook version | R | C | I | C (runbooks) | I | — | C (interpretive) | — |
| Review and approve for certification | — | R/A | I | — | — | — | C | — |
| Promote a pack | C | C | R/A | I | I | — | — | I |
| Roll back a pack | C | R (second approver) | R/A | I | I | — | — | I |
| Run a Mode C session | — | — | — | R | A | I | — | C |
| Instruct an irreversible portal act | — | — | — | I | I | — | — | R/A |
| Pay a challan | — | — | — | I | I | — | — | R/A |
| Break-glass | — | — | — | — | R/A (first approver) | R/A (second approver) | I | I |
| Classify a miss | C | — | C | C | R/A | — | C (disputed cases) | I |
| Clear a Part D-17 question per portal | — | — | — | — | C | C | R/A | — |

- **Rules ship on the effective-date calendar, code on the engineering calendar.** A rule
  pack is the statutory desk's deliverable, not a code release (§15.4.4); engineering owns the
  engine, the generators and the workspace, and any code change on a statutory path needs
  maker-checker review (NFR-SEC-305).
- **The desk is the capacity constraint.** Tenant intake into Mode C slows before the SLA
  breaches (§05.12); the statutory desk's coverage decides which states are sold (FR-RULE-017).
- **Knowledge lives in the system.** Every rule carries its source, date and reasoning, and
  every runbook its captured sessions, so no interpretation lives only in one person's head
  (R-11).

---

### 22.11 Scenarios and edge cases

Each row is a test scenario for the requirements it names.

| # | Given | When | Then | Requirements |
| --- | --- | --- | --- | --- |
| 1 | An approved ECR artefact; Mode C; the approver unreachable in the due-date window | The session reaches the return-approval step | The session waits `ops.instruction_wait_minutes`, hands back before the cut-off with the portal state "uploaded, not approved"; the employer can approve on the portal themselves | FR-OPS-004, FR-OPS-028 |
| 2 | Mode C; the OTP contact does not relay the OTP | Sign-in prompts for an OTP | No retry; HANDED_BACK; credential marked "confirm with employer" | FR-OPS-022; S6 |
| 3 | The return statement shows one member with lower EPF wages than the snapshot, unexplained | The reconciliation runs at step 9, before approval | Approval is withheld; on the approver's instruction the return is rejected on the portal and a new attempt regenerated; no Revised return is possible or needed yet | FR-OPS-012, AC-012.1 |
| 4 | A return approved; payment not yet initiated; a downward error found | The verification gate runs | The gate fails; the Revised variant is offered; the challan step stays closed | AC-012.2; EV-037 |
| 5 | Payment initiated; a downward error then found | A correction is requested | Revised refused with the EV-037 reason; Supplementary for absent members or the fenced arrear flow shown | AC-013.2; AC-711.3 |
| 6 | An operator with two tenants' sessions open | They try to upload tenant A's ECR in tenant B's session | Refused; scope-breach attempt logged and raised | AC-003.2 |
| 7 | The EPFO portal down on the due date | The session cannot sign in | Hand-back with the artefact; the miss is authority-caused only if the outage is evidenced | AC-012.5; §05.9 |
| 8 | A member's exit date recorded in error last month | This month's session is requested | The member is listed as blocked pending a joint declaration; the session proceeds for everyone else | FR-OPS-007; EV-041 |
| 9 | A Tax Year 2026-27 Q2 correction needed in October 2026 | The correction is generated and validated | It is held with the portal's "will be enabled shortly" notice and the exposure clock, and re-queues when the watcher records the function enabled | AC-015.4; FR-RULE-006 |
| 10 | A corrigendum lands the day before a due date and changes a rate retrospectively | The watcher flags it | Change request DETECTED; impact analysis lists filed periods and their routes; the pack publishes with the statutory desk lead's approval inside the freeze window; each affected tenant's calendar shows the impact on its instances | FR-RULE-005, FR-RULE-009, FR-RULE-013 |
| 11 | The employer revokes the authority while a session is IN_SESSION | The operator's next step is an upload | ABORTED at the step boundary; entry shredded; hand-back package delivered | FR-OPS-030; AC-002.4 |
| 12 | The ESIC sign-in shows a screen the runbook does not describe | The operator reports drift | Runbook SUSPENDED; queued Mode C sessions fall back to Mode B | AC-019.1 |
| 13 | Protean's Q4 anchor starts resolving | The watcher fires | Change request DETECTED; the Q4 schema is drafted, reviewed and certified; Q4 instances leave BLOCKED only on publication | FR-RULE-006; AC-RULE-006.1 |
| 14 | Staff receive an email from a "customer" with an EPFO password | A support agent opens it | The agent follows the rule: the credential is not used or stored; the customer is told to rotate and to use the vault form; the event is a security report | FR-OPS-023; T5 |
| 15 | A reviewer is asked to approve their own draft | They open the review | Refused; the request routes to another qualified reviewer | FR-RULE-010; AC-RULE-003.2 |
| 16 | A draft PT slab from a state portal banner, no notification captured | The author submits it | Blocked at DRAFTING — no instrument citation; the banner stays a lead | FR-RULE-002; §22.4.4 |

#### 22.11.1 Negative and adversarial scenarios

The rows above are mostly the unhappy paths of a working system. These are the ones where a
person — a customer, an operator, an attacker, or a well-meaning colleague under deadline —
tries to get the system to make an exception. Every "Then" below is the specified behaviour,
not a policy aspiration, and each names the requirement that has to enforce it.

| # | Given | When | Then | Requirements |
| --- | --- | --- | --- | --- |
| 17 | A Mode C ECR session at the approval gate; the customer says "just approve it, we trust you" | The operator relays the request | Refused: the instruction gate takes an instruction only from a named approver in a customer role, with step-up re-authentication. The request is recorded, the artefact and checklist are offered, and the deadline clock is shown | AC-004.3, AC-004.4, P3 |
| 18 | A session is already open for a PF code | A second session is requested for the same registration and portal | Refused with the first session's identifier, whatever the modes; the portals' concurrency and lockout behaviour is unknown (O6), and the product does not discover it on a customer's account | AC-032.6, FR-OPS-022 |
| 19 | An operator's certification on the ECR runbook lapsed overnight | The window opens and the queue offers the session | The resolver yields Mode B with `no_certified_operator`; nothing runs in Mode C "just this once" | MR-8, AC-038.3 |
| 20 | A rule pack publishes while a Mode C session is IN_SESSION, changing a rate effective inside the open month | The operator reaches the upload step | The session's bound artefact hash no longer matches current generation: the session aborts before upload, the instance regenerates, and the impact list flags the month for reprocessing before LOCK. A session already past an approved upload completes, and the month follows the correction routes | AC-007.1, AC-032.4, FR-RULE-009 |
| 21 | The filing desk lead needs break-glass continuity and is also the only security approver on duty | They request and approve it themselves | Refused. Two named approvers, both distinct from the requester; if no second approver is available, there is no break-glass, and the session hands back instead | AC-024.1, FR-OPS-028 |
| 22 | An authority naming Maharashtra PTRC only | The operator opens a PTEC act for the same tenant | Refused as out of scope, logged as a scope-breach attempt and raised to the desk lead the same day | AC-003.1, §16.5.4 |
| 23 | A portal screen with no downloadable acknowledgement, whose visible region includes an Aadhaar number | The operator triggers the evidence capture | The capture is refused; an attestation is recorded instead, and the gap appears in Part 8 of the evidence pack | FR-OPS-009, AC-036.3, Part E-6 |
| 24 | A portal returns a success page with no reference number and no downloadable object | The runbook's closing step is reached | The session cannot reach CLOSED; a desk-lead exception records why; the instance holds at its prior state; a repeat raises DI-6 and a runbook review of that step's evidence definition | AC-009.1, FR-OPS-037 DI-6 |
| 25 | A Mode D session run by a CA user who also holds the approver role at the client | They instruct the act they are performing | Refused — maker and checker cannot be the same identity even across the CA grant | AC-029.1, AC-004.3 |
| 26 | A wage month for which a challan has already been paid covering the same members | A second challan is generated for the same month | Allowed — multiple challans are permitted — but the overlap is shown to the approver as a potential duplicate with EPFO's own advice, and recorded. A flag, never a block | EV-036, AC-701.8 |
| 27 | A watch source whose page has not changed for `watch.max_silent_days` while the ministry has notified an amendment elsewhere | The liveness check runs | The source is marked SUSPECT rather than healthy, and the amendment is caught independently by the ministry-and-date-window scan of the corrigendum procedure | PF-1, FR-RULE-005 |
| 28 | An operator wants a copy of a portal screen for a support ticket | They try an operating-system screenshot inside the workspace | Blocked: capture, clipboard export and printing are disabled outside the evidence tool, and the attempt is a workspace tamper event | FR-OPS-021, T1, T13 |
| 29 | An employer revokes the authority ten minutes before the ECR due time | The operator's next step boundary is reached | The session aborts, the vault entry is shredded, and the hand-back package is delivered before the cut-off. The miss adjudicates on AD-3 with the revocation as the tenant act; AD-6 is not satisfied because the package was delivered | FR-OPS-030, AC-002.4, FR-OPS-033 |
| 30 | A state pack in DEGRADED, whose silent source is the one behind that state's return due date | A session is requested for that state | The instance holds with the containment named and the tenant notified through its coverage statement; the obligation and its clock stay visible. Sessions for rows whose verification is current continue | AC-RULE-019.2, AC-RULE-019.4, §05.9 DC-1 |
| 31 | A wage month already filed as Regular | A second Regular return is requested | Blocked by the filing-state guards before any session is requested, with the remaining routes offered — Supplementary for absent members, Revised only before payment initiation | EV-037, §08 SA-SEQ, AC-013.2 |
| 32 | An operator asks the security lead for a customer password "to test the login" | The request is made | There is no path that displays a credential to any person, so the request cannot be granted; the request itself is a security event and an input to the access review | FR-OPS-021, T1, AC-021.1 |
| 33 | A signed authority scan arrives by email with a registration added by hand in the margin | Someone tries to load it as the tenant's authority | Refused: an authority version is generated only from a counsel-cleared template and enforced by scope; a hand-annotated scan is not a version of anything | AC-002.3, FR-OPS-003 |
| 34 | An approver is instructing a challan while the portal re-renders the summary with a different amount | The instruction is submitted | The object hash no longer matches; the instruction is void, the workspace re-captures and asks again | AC-004.1, AC-035.5 |

#### 22.11.2 Conformance drills

Several of this section's guarantees are only true if they are exercised: a six-hour clock, a
hand-back, a shred, a replay. Each drill below seeds a condition deliberately and passes only
on the acceptance criterion it names. A failed drill blocks the release of the capability it
covers (§05.20), and drills that touch a portal are always run against captured screens and
test tenants, never as a live submission (FR-OPS-011).

| # | Drill | Trigger or cadence | Seeded condition | Passes when | Owner |
| --- | --- | --- | --- | --- | --- |
| D1 | Vault-compromise tabletop | Before the first Mode C tenant, then `ops.drill_cadence[D1]` | A detection signal indicating credential misuse | A CERT-In-format report inside six hours of the seeded detection, every affected customer notified with a rotation instruction in the same window | Security lead |
| D2 | Corrigendum replay | Before any compliance SLA is sold, and after any change to the watcher | The November 2026 episode — the successor scheme, the retrospective re-notification and the corrigendum amending the enumeration | The watcher raises the corrigendum as a change request against the rule rows it touches | Statutory desk lead |
| D3 | Seeded corrigendum, end to end | `ops.drill_cadence[D3]` | A corrigendum injected into a test feed | The emitted format or rule changes within one business day through the full pipeline, review and certification included | Statutory desk lead |
| D4 | Revocation drill | Before the first Mode C tenant, then per `ops.drill_cadence[D4]` | A revocation raised during an open session | Abort at the next step boundary, entry shredded, hand-back package delivered, Mode C disabled across covered surfaces inside the revocation SLA | Filing desk lead |
| D5 | Hand-back drill | Each design-partner cycle during R1 | A Mode C sign-in failure inside the due-date window | The package reaches the employer before the cut-off with the portal state stated, and the employer can file from it unaided | Filing desk lead |
| D6 | Log-integrity drill | Nightly job, plus a quarterly tamper attempt | An out-of-band update to a log entry | The write fails, the chain verification detects any seeded break, and a security event is raised | Security lead |
| D7 | Certification reproducibility | Before each release, and after any change to the pinned validation stacks | Re-run a past pack's certification on its pinned FVU and RPU folders | Identical results, with the stack manifest verified | Statutory desk |
| D8 | Canary-coverage audit | Monthly | Sample published packs | Every sampled pack had a cohort registration inside its jurisdiction scope | Statutory desk lead |
| D9 | Evidence-pack drill | Quarterly | A random closed period for a random registration | A reviewer with no prior knowledge of the case answers what was owed, what was computed, who approved and what the portal returned, from the pack alone | Filing desk lead |
| D10 | Shred verification | Scheduled, plus after every offboarding | A sample of revoked entries, from the primary store and a restored backup | Decryption fails on both | Security lead |
| D11 | Adjudication calibration | Quarterly | A blind re-adjudication of closed miss reviews | The disagreement rate between original and blind classes is reported and reviewed; a rate that is always zero is itself investigated | Statutory desk lead |
| D12 | Scope-breach drill | Before the first Mode C tenant, then quarterly | An out-of-scope action code attempted in a test tenant | Refusal, a logged scope-breach attempt, and a same-day raise to the desk lead | Security lead |

---

### 22.12 Open items and where they are routed

Nothing below is assumed in the product. Each item names what it blocks, the parameter that
stands in for it, and the section that owns the answer — §20 for validation (with the V-item
where §20.6 already holds one), §23 for counsel, §05 for scope and release, §08 where a
filing-state change is proposed, §14 where a data-model field is.

| # | Open item | Blocks | Method | Parameter(s) | Routed to |
| --- | --- | --- | --- | --- | --- |
| O1 | May our operator act on each portal under employer credentials; do portal terms permit it; does the TDS upload engage the e-Return Intermediary route; how is the signatory's DSC handled; liability allocation and insurability | Mode C on every portal; M3; the SLA price | Qualified counsel opinion per portal | Counsel-register rows CR-17a to CR-17f (AC-001.5) | §23 (Part D-17); §20 V-25; fence F-08 |
| O2 | The written-authority template wording | FR-OPS-002 | Counsel drafting and clearance | Template version | §23 (Part D-20) |
| O3 | Whether an establishment's portal credential is a natural person's sensitive personal data; who owes which SPDI duty | Vault classification wording, not its controls | Counsel | — | §23 (Part D-4) |
| O4 | ESIC sign-in controls, template columns and file type, DSC requirement | The ESIC runbook and generator | Mode B capture session (FR-OPS-014) | `esic.*` runbook unknowns | §20 V-23 |
| O5 | Whether the `.fvu` upload needs a DSC or EVC | Mode C for Form 138 | Capture session | `it.fvu_upload_signature` | §20 V-23 |
| O6 | Whether EPFO sign-in prompts an OTP, and each portal's lockout policy | OTP roster sizing; failure handling | Capture sessions | `epfo.sign_in_otp`, `portal.lockout_policy` | §20 V-23 |
| O7 | The EPFO error-file schema | Error-file parsing | Capture from a real rejection | — | §20 V-23 |
| O8 | The EPFO arrear-return flow and layout | Arrear runbook and generator | Authenticated-portal capture | — | §20 V-23 |
| O9 | The Form 130 request and download flow on TRACES for Tax Year 2026-27 | FR-OPS-016 | Capture once Q4 publishes | — | §20 (F-01 on-clear work, §05.18) |
| O10 | Supervised minutes, exception rates and window concentration per filing type and mode | The COGS line, customers per operator, the price | First design-partner quarter, instrumented (FR-OPS-010) | `m_session`, `n_sessions`, `m_prep`, `p_exception`, `m_exception`, `f_wait`, `window_share`, `mode_mix` | §20 V-26; §13 |
| O11 | Operator capacity and loaded cost | Customers per operator | Desk records and finance | `operator_productive_minutes_per_month`, `operator_window_minutes`, `operator_loaded_cost_monthly` | §20 V-26 |
| O12 | The automation target | Build priority for M3 and pre-validation | Derived from O10, O11 and §18 | `max_supervised_minutes_per_filing_cycle`, `target_supervised_cogs_share` | §13.19; §18; §20 V-26 |
| O13 | Change requests and hours per request per state and centrally; onboarding hours per state | Statutory-desk headcount; cost per state | Pipeline log from month one | `E_*`, `h_*`, `D_p`, `h_onboard`, `r_review`, `analyst_productive_hours_per_year`, `cost_per_state_per_year` | §20.13 |
| O14 | Counsel retainer | Opex line | Quote | `counsel_retainer_monthly` | §20.13 |
| O15 | Operating timeouts and thresholds | Session and vault behaviour | Set from the first quarter's observations | `ops.otp_wait_minutes`, `ops.instruction_wait_minutes`, `ops.max_session_minutes`, `ops.handback_cutoff_minutes_before_due`, `ops.min_lead_minutes_for_mode_c`, `vault.credential_freshness_days`, `vault.rotation_reminder_days`, `vault.break_glass_minutes`, `vault.shred_after_revocation_hours`, `vault.suspend_after_failed_validations`, `rule.publish_lead_days`, `rule.freeze_window_hours`, `watch.cadence`; and, not yet in §20.13's register, `ops.access_review_days`, `ops.break_glass_review_days`, `ops.minute_reconciliation_tolerance`, `runbook.reverify_days`, `rule.plausibility_delta`, `rule.review_cycle_target_hours`, `watch.max_consecutive_failures` | §20.13 (compliance-operations controls); the last seven to be added there |
| O16 | Whether event-level evidence is enough for disputes and inspections | Evidence policy (FR-OPS-009) | First dispute or inspection | — | §20 |
| O17 | FR-PAY-711 F7 names only a portal rejection; the employer's rejection of an EPFO return statement at reconciliation (§22.4.1 step 9) needs to be a named F7 trigger so the attempt is counted | The rejection count in §19.1 | Proposal to the §08 owner | — | §08 |
| O18 | A Tax Year 2026-27 correction the portal cannot yet take is held as FR-PAY-711 F10's side effect (AC-708.3), not as an F2 BLOCKED reason, while §05.18 models it as fence F-02. The calendar's blocked view must show F-02-held corrections beside BLOCKED instances, or a held correction reads as done | The filing calendar's blocked view (FR-PAY-710) | Proposal to the §08 owner to surface held instances with their fence in the calendar's blocked view | — | §08 |
| O19 | §14.4.5's `submission_mode` has two values, `employer` and `operator_under_written_authority`; the metrics and SLA need the four delivery modes (FR-OPS-001) and the CA as a distinct actor | Mode-mix reporting (§22.7 `mode_mix`); causation records for CA sessions | Proposal to the §14 owner to add `delivery_mode ∈ {A, B, C, D}` beside the existing field; AC-001.4's mapping applies until then | — | §14 |
| O20 | Requirements this section tags P0 that §05.17's closed R1 list does not yet cite as acceptance references: FR-OPS-004, FR-OPS-005, FR-OPS-012, FR-OPS-013, FR-OPS-018 (IP registration), FR-OPS-019, FR-OPS-026 (Mode B leg), FR-OPS-027, FR-OPS-030 (offboarding leg), FR-OPS-031, FR-OPS-032 to FR-OPS-039, FR-RULE-016, FR-RULE-018, FR-RULE-019, FR-RULE-020 | Whether each is in R1 — until §05 accepts it, it is not (§05.17) | Proposal to the §05 owner to add each as an acceptance reference under the capability named in the release mapping (§22 preamble), or to relabel it here | — | §05 |
| O21 | Whether generating the EPFO TRRN challan "initialises the payment process" for the wage month, which the circular makes the end of the Revised-return window (r5/02 finding 9) | Nothing today — the runbook already treats challan generation as the boundary (§22.4.1 step 13); a clear answer would tell us whether the gate could move later | Read against EPFO's manual and FAQ, then confirm in a Mode B session | — | §20 V-23 |
| O22 | §05.7 row A-28 defers legacy 24Q corrections (the legacy correction layout is not in the evidence base), while §08 AC-706.4 specifies legacy generation and routing for FY 2025-26 and earlier | Whether the Form 138 runbook needs a legacy variant in v1 | This section follows §05 (A-28 deferred, no legacy runbook); the conflict is for the §05 and §08 owners to settle | — | §05; §08 |
| O23 | The operating parameters introduced by §22.1.3 to §22.11.2, none of them in §20.13's register yet: `ops.miss_review_open_minutes`, `ops.miss_statement_days`, `ops.portal_computed_variance_flag`, `ops.evidence_pack_minutes`, `ops.desk_incident_ack_minutes[class]`, `ops.desk_incident_review_days`, `ops.mass_rejection_threshold`, `ops.evidence_exception_threshold`, `ops.certification_lapse_days`, `ops.drill_cadence[drill]`, `watch.max_silent_days`, and the `h_onboard` stage split (`h_onboard.sourcing`, `.authoring`, `.certification`, `.capture`, `.pilot`) | Adjudication, evidence, desk-incident, certification, drill and onboarding behaviour | Set from the first design-partner quarter and the first two state onboardings | As listed | §20.13 |
| O24 | Where the session objects of §22.3.2 are stored, and which of §14's retention and erasure classes each takes | Nothing today — the objects are specified with their classes here | Proposal to the §14 owner to place `AttendedSession`, `SessionStep`, `Instruction`, `CredentialCheckout`, `EvidenceCapture`, `HandbackPackage`, `ModeResolution`, `MissAdjudication`, `OperatorCertification` and `ScopeBreachAttempt` in the model | — | §14 |
| O25 | The mode-resolution reason codes (MR-1 to MR-13) as a stored, reported dimension beside `submission_mode` and the O19 `delivery_mode` proposal | Mode-mix reporting and the SLA narrative; the ability to separate a fence from an efficiency | Proposal to the §14 and §19 owners | The reason-code enumeration and its version | §14; §19 |
| O26 | `ops.session_record_retention_years` — how long session records are kept above the CERT-In 180-day in-India floor | Nothing today; the floor is enforced regardless | Counsel, against the life of the filings the records evidence; Part D-11 bars stating a statutory period for it | `ops.session_record_retention_years` | §23 (Part D-11); §20 |
| O27 | Whether §13.19 and §19.8 adopt §22.7.1's counting rules verbatim — in particular CR-3, which keeps a Supplementary inside its original cycle | The comparability of `R_inst`, minutes per cycle and the automation target across three sections | Proposal to the §13 and §19 owners; if either counts differently, the target computed under the other rule is void | The instance-ledger rule version (AC-039.3) | §13; §19 |
