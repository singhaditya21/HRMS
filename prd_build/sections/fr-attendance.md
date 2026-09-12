## 09. Functional Requirements — Attendance, Leave & Deskless

Attendance was in the original brief and received **zero research in round one**
(r1 critic). Round two researched devices and the deskless worker (r2), round four
the biometric-data regime (r4), and round five the notified registers (r5). This
section closes that gap and turns the one strong, hostile-checked finding in the corpus — build
the **ADMS/WDMS push receiver in v1** — into a full functional spec, alongside
the leave, shift, overtime and regularization surfaces that the beachhead
(manufacturing, retail, logistics, hospitality, clinics at 20–200 heads) will not
buy without.

The framing is the same one that runs through the whole document: **the statutory
filing, not the payslip, is the unit of delivery.** Attendance is not a
convenience feature here — it is a *filing input* and a *filing itself*. Worked
hours drive the **Form IX** attendance register-cum-muster roll, which must carry
**per-day IN and OUT timestamps** (EV-055) and, in the central sphere, is kept five
years from the date of last entry (EV-054, §09.10); overtime drives the wages base that feeds ECR, ESI and PT
(§06, §08); leave-without-pay and loss-of-pay drive the paid-days count that every
downstream challan reconciles against. A wrong punch is not a UX problem, it is a
wrong PF contribution and a wrong 24Q/Form 138 line. Attendance therefore inherits
the engine's cardinal rule (§12, Verified): **rules-first, LLM-last — no worked-hour,
overtime or leave-balance figure is ever model-generated.** The assistant explains,
nudges, translates and drafts regularizations; the deterministic engine computes.

A second framing, specific to this section: **the beachhead is more deskless than
it looks.** A 120-person auto-components firm in Pune, a 60-store QSR chain, a
3PL warehouse cluster — these are the 50–200 accounts that carry revenue (§05),
and their workforce is largely frontline, on shared or no devices, in low
connectivity, reading Hindi/Marathi/Tamil, not English. Draft 1's constraints,
re-verified in r2 — **worker-initiated not employer-push, shared-device reality, and
terminal integration as non-optional for frontline** — are load-bearing design
inputs, not accessibility niceties. They appear throughout as `FR-DSK-###`.

<!-- DIAGRAM: attendance-engine -->

**How to read the FRs.** Each requirement carries an ID (`FR-<area>-###`), a
priority (**P0** = required for v1 beachhead launch; **P1** = fast-follow within
v1.x; **P2** = expansion/v2), the requirement statement, a short rationale tied to
statute or evidence, and **acceptance criteria** as testable bullets. Confidence
markers apply to the *claim a requirement rests on*, not to the requirement itself.
The standing rule from §02 holds: **no statutory number ships without a
gazette/notified-rule citation and a "check for a corrigendum" pass** — several
figures below are marked **[Hypothesis]** precisely because leave-accrual,
spread-over and rest-interval values have not been read from the OSH&WC Code or
its Central Rules (notified 8 May 2026; the Wages Rules defer spread-over and rest
intervals to them, r3), and *state* rules — which may differ — are rolling out
unevenly (§20 risk: uneven state-rule notification). Where research does not give
a value, this section names a configurable parameter and ships **no default**; the
value arrives through the §22 compliance data pipeline. A [Hypothesis] figure may
raise a **warning** but may never stop a punch, a roster, a pay run or a filing
(§06.12 R17).

---

### 09.1 Scope, dependencies and the attendance data contract

**In scope for this section:** capture (biometric/ADMS, geo-mobile, kiosk, web,
WhatsApp-assisted), device integration, shifts and rosters, the attendance
processing engine (punch pairing → worked hours → exceptions), overtime per the
notified Rules, leave policy configuration and accrual, regularization and
approval workflows, deskless/frontline constraints, and the statutory attendance
register as an output.

**Out of scope here (owned by other sections):** the wage-base and add-back
computation (§06), PF/ESI/PT/TDS challan generation (§06, §08), the assistant
architecture and cost model (§12, §13), the opening-balance data model and the
migration importers with their YTD tie-out tolerances (§14.4.10, §16.7 — this
section owns only the leave-side tie-out, provenance and first-lock rules, §09.10-C),
and the pricing of location tracking as an add-on (§18 — noted in §09.11 for the
requirement it generates).

**Upstream dependencies (this module consumes):**

| Dependency | From | Why attendance needs it |
| --- | --- | --- |
| Employee master, DOJ, employment type | Core HR (§07) | Eligibility for leave accrual, OT, shift assignment |
| Work location → state, sphere (central/state), Code-regime commencement date | Core HR (§07.2) | State S&E vs OSH rule selection; PT/holiday calendar (jurisdiction sits on the work location, not the employee) |
| Effective-dated statutory rule set | §06 statutory engine | OT multiplier, wage-period normal hours, the [Hypothesis] quarterly OT ceiling (warn-only), leave accrual formula, national/festival holidays |
| Headcount time-series | §06 | Latching obligations — register format, the contract-labour chapter at 50+, crèche at 50 (EV-057; counting unit and sphere per §06.1) |
| Holiday calendar (national + state + optional) | §06 / tenant config | Present/absent/holiday classification, comp-off eligibility |

**Downstream consumers (this module produces):**

| Output | To | Contract |
| --- | --- | --- |
| Paid-days, LOP-days per employee per period | Payroll engine (§08) | Immutable once payroll is locked; recompute only via retro run with audit trail |
| Overtime hours (at each applicable multiplier) | Payroll engine (§08) | Split by multiplier band; an excluded head under s.2(y) — outside "wages" but counted in the 50% add-back test (§06.10) |
| Form IX rows — per-day IN/OUT timestamps (EV-055) | Statutory register store (§09.10, §06.9) | Electronic, tamper-evident; retention per EV-054 (central sphere: five years from last entry; state periods to counsel, §23) |
| Leave ledger transactions | Payroll + employee surface | Double-entry, effective-dated, recomputable |
| Location/geo-fence events (opt-in) | Location add-on (§09.11) | Metered separately (§18) |

**FR-ATT-001 — Attendance is an effective-dated, recomputable ledger, not a state flag. (P0)**
Every attendance-affecting fact (raw punch, regularization, leave application,
shift assignment, holiday) is stored as an append-only (never edited in place),
timestamped, source-tagged event. The day's status (`Present / Absent / Half-day /
Weekly-off / Holiday / On-leave / OD / LOP`) is a *derived* projection over the event
log for that date, recomputable against the rule version in force **for that date**
for as long as the underlying events are held. **[Reversed]** Earlier drafts implied
a never-forget log; bitemporality is scoped by entity class (§14). Rule-sets and shift
definitions are bitemporal. Punches, biometric templates, consent artefacts and
rendered documents are **erasable classes**, tombstoned when their retention class
expires. After an erasure, replay of that period returns the Form IX rows and the
attendance summary frozen at payroll lock, flagged `source-erased`. It never
returns a recomputation from punches that no longer exist.

- **AC1:** Re-running the engine over an unchanged event log for a past period
  yields byte-identical worked-hours and status output (deterministic replay); where
  any of the period's punches has been erased, the replay returns the lock-time
  snapshot and says so.
- **AC2:** Inserting a back-dated regularization for 15 days ago recomputes that
  day and *only* affected downstream days (e.g., comp-off eligibility), and emits
  an audit entry naming actor, timestamp, before/after values, and the rule
  version applied.
- **AC3:** Once a payroll period is locked, attendance for that period is
  read-only; a correction opens an explicit **retro/arrears run** that recomputes
  against the period's rule version, never today's (mirrors §06 wage-rule
  versioning). Rationale: **[Verified]** the wage-definition rule is versioned,
  effective-dated and retrospectively recomputable (Source: §06.10; Code on Wages
  s.2(y) / CoSS s.2(88)).

### 09.1-A Core attendance & leave data model (the entity contract)

§09.1 asserts a *contract*; this is its shape. The model is aligned to the
§14 data-model section and exists to make the invariants above enforceable, not to
prescribe storage. Every mutable-looking figure (day status, leave balance,
paid-days) is a **derived projection**, never a stored counter — the same rule as
the wage engine (§06).

<!-- DIAGRAM: attendance-entity-model -->

| Entity | Key fields | Mutability | Owner / source |
| --- | --- | --- | --- |
| **Punch** (raw event) | `punch_id, tenant_id, employee_id?, device_sn?/device_user_id?, ts_device, ts_utc, tz, direction, verify_mode?, source_channel, source_ref, adapter_version?, geo?, face_match_outcome?, skew_offset?, payload_hash` — no image, no template reference | Append-only; **erasable class** (not bitemporal) — tombstoned when its retention class expires (§14) | FR-ATT-010 |
| **BiometricTemplate** | `template_id, employee_id, modality, consent_id, key_ref (biometric keyspace), enrolled_at, erased_at?` — no image column | Separate keyspace; erasable (key destruction); never referenced by a Punch | FR-ATT-017 |
| **DeviceEnrolment** | `(employee_id, device_sn), origin(ticketed / brownfield), enrolled_at, erase_cmd_id?, ack_at?, exception_state?, attested_by?` | Per-device erasure ledger | FR-DEV-007, FR-ATT-035 |
| **AttendanceMethodElection** | `employee_id, method (card / PIN / geo-mobile / web / supervisor / biometric), elected_by, effective_from` | Effective-dated; set by the employee | FR-ATT-017 |
| **Device** | `device_sn, tenant_id, make, model, firmware, endpoint_secret, last_seen, clock_offset, health` | Config + telemetry | FR-DEV-001/003 |
| **DeviceUserMap** | `(device_sn, device_user_id) → employee_id, effective_from, effective_to` | Effective-dated | FR-DEV-002 |
| **ShiftDefinition** | `shift_id, start, end, breaks[], grace_in, grace_out, spread_over_cap, night_flag, version, effective_from` | Effective-dated, versioned | FR-SHF-001 |
| **RosterAssignment** | `employee_id, date, shift_id, site_id, published_at` | Effective-dated | FR-SHF-002 |
| **HolidayCalendar** | `establishment_id, date, type(national/festival/optional), source_gazette_ref` | Effective-dated | FR-SHF-004 |
| **DayStatus** (projection) | `employee_id, date, status, in_ts, out_ts, worked_min, ot_min_by_band, paid_flag, rule_version` | **Derived** — recomputable, never authored | FR-ATT-021 |
| **FormIXRow** (statutory record) | `establishment_id, employee_id, month, day[1..31]{cell_state, in_ts, out_ts, sessions[], explanation_code}, shift, place_of_work, days_worked, ot_hours, tour_details, register_version` | Frozen as values when every payroll cycle covering the month locks; corrections are new versions; retained per EV-054 | FR-STAT-001, FR-ATT-033 |
| **SubstitutedRestDayObligation** | `obligation_id, employment_id, rest_day_worked, ot_line_ref, substitute_date?, due_by?, state` | Append + state transitions; closes only as GRANTED or OPEN_AT_EXIT | FR-OT-009 |
| **LeaveType** | `type_code, accrual_rule, cap, encashment_rule, unit, eligibility, doc_req, paid_flag, statutory_floor_ref` | Config, effective-dated | FR-LV-001 |
| **LeaveLedgerTxn** | `txn_id, employee_id, type_code, delta, reason, source_ref, effective_date, reverses_txn?` | Immutable, double-entry | FR-LV-004 |
| **Regularization** | `reg_id, employee_id, date(s), before, after, reason, evidence_ref, approver_chain, decision, decided_at` | Append + decision | FR-REG-001 |
| **LeaveRequest** | `request_id, employment_id, type_code, span{start, end, units[]}, created_by, acting_for?, state, transitions[], validation_outcomes[], hold_txn?, avail_txn_ids[], decision_snapshot{balance, available, ledger_seq}` | Append + state transitions; state is derived from the transition log, never authored | FR-LV-011 |
| **RegularizationBatch** | `batch_id, actor, reason_code, preview_id, scope, rows[]{employment_id, date, before, after, outcome}, created_at` | Append-only; commit idempotent on `preview_id`; no aggregate-only record | FR-REG-008 |
| **CutoverRecord** | `establishment_id, cutover_date, predecessor_name, predecessor_register_custody, filing_ledger_seed[], dual_run_window?, readiness_gate[]{row, state, waived_by?, reason?}` | One per establishment; append plus amendments, each audited | FR-STAT-005, FR-DEV-020 |
| **ConsentRecord** (§07 FR-CHR-100 owns the record; earlier drafts of this section called it `ConsentArtefact`) | `consent_id, version, employee_id, purpose(biometric-enrolment/night-shift/location), data_classes (one biometric modality per class), regime(SPDI-r5-written / DPDP / OSH-s43), given_to_entity, artefact_owner, notice_text_version, capture_form, resolver_inputs, granted_at, effective_from, withdrawn_at?, withdrawal_ref?` | Versioned, append-only, revocable-forward; erasable class (§14) | FR-SHF-005, FR-ATT-017, FR-ATT-029, FR-LOC-001 |
| **SiteMethodCapability** | `site_id, methods_supported{card, PIN, kiosk PIN, geo-mobile, web, supervisor-attested, fingerprint, face}, biometric_enabled_by_modality, effective_from` | Effective-dated tenant configuration; EL-1 enforced at save | FR-ATT-023, FR-ATT-027 |
| **EnrolmentTicket** | `ticket_id, employment_id, modality, kind(enrol / adopt_existing), consent_id, consent_version, device_scope, issued_at, expires_at, state, consumed_evidence` | Append + state transitions | FR-ATT-028, FR-ATT-035 |
| **ErasureRequest** | `request_id, employment_id, modalities, template_ids, trigger, requested_at, due_at, phase1_done_at, items[], status, evidence_pack_ref` | Append + state transitions; cannot be cancelled | FR-DEV-013 |
| **TemplateAccessEvent** | `event_id, template_id, actor, operation, purpose_code, ts, outcome` | Immutable; ICT log (EV-062) | FR-ATT-032 |
| **DeviceCommand** | `command_id, device_serial, command_type, device_user_id?, payload_ref, source_ref, depends_on?, created_at, served_at?, result_at?, state, attempt` | Append + state transitions; payload values never logged | FR-DEV-017 |
| **WorkSession** (projection) | `session_id, employment_id, anchor_date, roster_ref?, in_ts, out_ts, raw_in_ts, raw_out_ts, in_source, out_source, minutes, flags[], rule_version` | **Derived** from punches; frozen into `FormIXRow` at lock | FR-ATT-037 |
| **OTLine** | `ot_line_id, employment_id, establishment_id, attribution_date, minutes, multiplier, test_applied, reckoning_stamp, approval_state, session_refs[], rule_version` | Immutable once its pay period locks; corrections are retro lines | FR-OT-011 |
| **ContractorLink** | `employee_id, contractor_entity_id, license_ref, pf_code, esi_code, effective_from` | Effective-dated | FR-CL-001 |
| **AuditEntry** | `actor, ts, action, before, after, rule_version, tenant_id` | Immutable | CC-5 |

- **AC1:** No field on `DayStatus` or any leave balance is directly writable; both
  are computed from the event entities and the rule version in force for the date
  (CC-1, CC-3).
- **AC2:** Every raw-capture entity (`Punch`, imported rows, supervisor-attested)
  is source-tagged and append-only; corrections are new dated events, never
  overwrites (CC-5, FR-STAT-001 AC2). Erasure at the end of a retention class is a
  tombstone, never an edit (FR-ATT-001).
- **AC3:** No entity carries an image column and no image object store exists for
  biometric data. A `Punch` never references a `BiometricTemplate`, so destroying a
  template leaves every attendance record and `FormIXRow` valid (FR-ATT-017).

---

### 09.2 Attendance capture — the multi-modal ingestion layer

The beachhead is a **mixed fleet by definition**: a factory floor on biometric
terminals, field sales on a mobile app, a back office on web/desktop, and
frontline stores on a shared kiosk tablet. The capture layer must accept all of
these into one normalized punch stream and let policy — not the capture channel —
decide what is valid.

**FR-ATT-010 — Unified punch model across all channels. (P0)**
Every capture channel emits a punch to a single normalized schema:
`{employee_id (or device_user_id → resolved), tenant_id, timestamp (device-local + UTC + tz),
direction (IN/OUT/AUTO), verify_mode (card / PIN / fingerprint / face / geo / web / supervisor),
source_channel, source_ref (device SN / kiosk id / app session), adapter_version (device channels),
geo (lat/lng/accuracy, optional), face_match_outcome (optional — never an image), payload_hash}`.
Direction may be `AUTO` where the device does not distinguish in/out; the engine
infers direction at pairing time (§09.5).

- **AC1:** A punch from any channel validates against one schema; unknown extra
  fields are preserved verbatim (forward-compat with new firmware).
- **AC2:** Device-local time and server time are both stored; clock skew per
  device is measured and surfaced (§09.3). No punch is silently rewritten to
  server time.
- **AC3:** `payload_hash` makes each raw punch tamper-evident and is the dedup key
  (§09.3, AC on idempotency).

**FR-ATT-011 — Biometric / access-control terminals via push (ADMS/WDMS). (P0)**
See §09.3 — this is the primary capture path for the frontline beachhead and is
the best-evidenced call in the corpus. **[Verified]** (Source: r2 — four independent
sources: a competitor HRMS vendor's integration blog, a commercial Odoo ADMS module
listing, CAMS, and the pyzk library for the legacy alternative; bench test §20 V-11). A terminal can
authenticate by card, PIN or biometric; the channel is not the biometric (FR-ATT-017).

**FR-ATT-012 — Mobile app punch with geo-fence and optional selfie. (P0 for field/deskless, P1 for others)**
Employees punch from a mobile app; the punch is stamped with GPS coordinates and
accuracy, evaluated against one or more configured geo-fences (site, client site,
route zone), and optionally a liveness/face-match selfie for identity assurance on
shared or personal devices. The selfie option is biometric capture and is governed
by FR-ATT-017; a geo punch without a selfie is a complete, non-biometric punch.

- **AC1:** A punch inside an active geo-fence (radius = tenant-set parameter
  `geofence_radius_m` per fence; the product ships no sourced default) is accepted;
  outside it is either **blocked** or **flagged-for-approval** per policy — never
  silently accepted or silently dropped.
- **AC2:** GPS accuracy worse than tenant parameter `gps_min_accuracy_m` marks the
  punch `low-confidence` and routes it to regularization rather than rejecting it
  outright (frontline GPS is noisy indoors).
- **AC3:** A selfie frame, if enabled, is used for liveness and face-match and then
  discarded — no image is persisted (FR-ATT-017 AC4); only the outcome is kept on the
  punch. Face-matching processes biometric information, which SPDI r.3 classifies as
  sensitive (EV-060) — DPDP itself creates no sensitive category (EV-059), and both
  halves apply — so it runs only for an employee who has given written consent and
  elected a biometric method. It is advisory and
  human-overridable — **it never deterministically blocks pay** (rules-first: an
  identity model error must not become a wage error). **[Hypothesis]** face-match
  on frontline cameras is accurate enough to be useful even as an advisory flag. No
  false-reject rate for these cameras is in research, so the kill line is parameter
  `face_match_false_reject_kill_rate`, fixed by Product before the first pilot and
  measured there (§20); above it, face-match is withdrawn as an anti-buddy-punch
  option. It never becomes a pay gate at any measured rate.
- **AC4:** Punches captured offline are queued locally and reconciled on
  reconnect (§09.9, FR-DSK).

**FR-ATT-013 — Kiosk / shared-device mode. (P0 for frontline)**
A tablet or phone mounted at a site entrance runs a kiosk app where any worker at
that site authenticates per-punch (PIN, employee code + selfie, or a bring-up
biometric) without a personal login session. This is the **shared-device**
answer, and it is not optional for frontline: **[Verified]** nine in ten people
who do not use a phone live in a household that owns one, so worker identity cannot
be assumed to equal device identity (Source: Comprehensive Annual Modular Survey
2023, re-verified r2).

- **AC1:** No persistent per-user session; the kiosk returns to a neutral
  "who's punching?" state within tenant parameter `kiosk_idle_reset_s` after each
  punch. A worker cannot see or edit another worker's data.
- **AC2:** Kiosk works with a **shared roster subset** cached locally (only the
  site's assigned workers) so authentication is fast and offline-tolerant.
- **AC3:** Anti-buddy-punch controls are configurable per tenant: selfie
  face-match, a device-bound biometric, a rotating site PIN, or supervisor
  attestation. The biometric options apply only to employees who have elected a
  biometric method with written consent (FR-ATT-017). **No configuration may make a
  biometric method the only way to punch** (a "biometric only" setting is not
  shipped — §23).

**FR-ATT-014 — Web / desktop punch and bulk import. (P0)**
Back-office staff punch from web; managers and admins can bulk-import attendance
(CSV/Excel, or a Tally export of attendance vouchers — TallyPrime records attendance
through manual vouchers only and has no leave module, EV-032) for migration and for
sites still on legacy systems mid-cutover (§14.4.10, §16.7 — migration is a
first-class surface).

- **AC1:** Bulk import validates against employee master, reports per-row errors
  without aborting the whole file, and stages for review before commit.
- **AC2:** Imported rows are source-tagged `import` and are distinguishable from
  device/app punches in the audit trail forever.

**FR-ATT-015 — WhatsApp-assisted punch and status. (P1, frontline)**
Given the deskless reality, a worker may check-in/out or query balance via a
WhatsApp flow — but **worker-initiated only**. **[Verified]** a new WhatsApp
Business portfolio can reach only **250 unique users per rolling 24 hours**, so
employer-push onboarding of a 5,000-worker site on day one is impossible
(Source: Meta WhatsApp Business Platform messaging-limit tiers, re-checked verbatim, r2).

- **AC1:** The system never assumes it can push to arrive; onboarding to WhatsApp
  is pull/worker-initiated and rate-aware (respects the 250/24 h cold-start tier
  and ramps).
- **AC2:** A WhatsApp punch is subject to the *same* geo/site validation as the
  app where location can be obtained; where it cannot, it is `flagged-for-approval`.
- **AC3:** **[Killed]** Do not price or plan on the claim that Meta begins
  charging for service messages in India on 1 Oct 2026 — that change applies to
  nine *other* markets (Source: Meta's updates-to-pricing page, r2; §20.4). And
  **[Hypothesis]** the Meta India rate card is unresolved: BSP aggregators disagree
  (marketing ₹0.8631 vs ₹0.95; utility ₹0.1150 vs ₹0.15), so the marketing-to-utility
  multiple is a 6.3–7.5× range, not a number (r2); no per-worker messaging price may be committed
  until the rate card is downloaded and captured (§20 V-12). Separately, the
  WhatsApp Business account must migrate to INR billing by 31 Dec 2026 or delivery
  stops on 1 Jan 2027 (EV-088) — a dated dependency for this flow.

**FR-ATT-016 — Manual/exception capture by supervisor. (P0)**
A shift supervisor can mark attendance for a worker on the supervisor's own device
(worker forgot phone, terminal down, new joiner not yet enrolled), tagged as a
supervisor-attested punch requiring the same downstream approval as a
regularization (§09.8).

- **AC1:** Supervisor-attested punches carry the supervisor's identity and are
  never indistinguishable from a first-party device punch.

**FR-ATT-017 — Biometric capture under the SPDI Rules today, DPDP from ~May 2027, and Aadhaar Act limits. (P0)**
The beachhead runs on fingerprint/face terminals and selfie punches, so the
capture layer collects biometric data on day one. Two halves, always stated
together: DPDP creates **no** sensitive category of personal data (s.2(t), EV-059)
— **and** the SPDI Rules 2011, live today, classify biometric information as
sensitive (r.3) and **require consent in writing before collection** (r.5(1))
(EV-060, **[Verified — provenance caveat]**: the text was read from a third-party
host; re-pull from the e-Gazette before quoting it to a customer). **[Reversed]**
Earlier drafts stated as current law that DPDP s.7(i) removes the consent requirement for employee data. s.7(i) is **not in force** until
on or about 13 May 2027 (EV-058); when it commences it disapplies consent and notice
for employment purposes only and leaves the s.8 duties in place. Whether it will
reach *biometric* capture — the most intrusive way to take attendance — is
unresolved, and this PRD does not say it does (statutory basis under counsel review,
§23). **We are not aware of any Indian law that requires biometric attendance, as
of September 2026** (EV-072): OSH Code s.33(a) requires an attendance *record*,
maintained "electronically or otherwise", and is device-neutral (r5).

Two citations are banned as authority. The Supreme Court order of 29 October 2025
(*Union of India v. Dillip Kumar Rout*) turned on the employees not opposing the
system and decided nothing about privacy (K-14, r4). The 2026 decision holding
biometric attendance unlawful even with consent is **Turkish** (KVKK Principle
Decision 2026/921) and has no force in India (K-15, r4). A foreign decision is
cited only with its jurisdiction named in the same sentence.

Aadhaar is a separate regime and never part of this flow. **[Verified]** A private
employer cannot simply perform Aadhaar authentication for attendance: s.57 was
omitted in 2019, and s.4(4) permits authentication only with UIDAI's satisfaction
plus a Parliamentary-law permission or a purpose prescribed by the Central
Government (Aadhaar Act 2016 ss.4(4), 8; r4). The prescribed route is the Good
Governance (SWIK) Rules 2020 as amended by G.S.R. 88(E) of 31.1.2025: r.3 lists
four purposes, none of which names attendance, and approval is **per entity and per
use case**, through a sponsoring Ministry, ending in a Gazette notification.
MeitY's SOP lists "staff attendance" as a candidate use case for some named sectors;
r4 reads the approval as attaching to the employer or sector participant, not to a
horizontal HR SaaS (r4's inference, not the instrument's words). The product
therefore builds no Aadhaar-authentication punch path; a customer asking for one is
routed to counsel (§23). A face template captured by the employer's own terminal is
not "core biometric information" and was not collected under the Aadhaar Act — but a
photograph *is* "biometric information" under s.2(g) (EV-071). An Aadhaar
identifier and a device template never share a record or a flow.

- **AC1 — Written consent before enrolment.** Enrolment is refused until a written
  `ConsentRecord` exists for that employee (§09.1-A), separate from the employment
  contract and any bundled notice, recording purpose, notice-text version, the legal
  entity it was given to, capture form, timestamp and enrolling device. r.5(1) names
  letter, fax or email; whether in-app capture suffices, and whether the employer or
  the SaaS owes the duty, are counsel questions (§23) — the capture machinery ships
  either way. Consent cannot be backfilled for migrated employees.
- **AC2 — Two consent regimes, one switch.** Parameter `consent_regime_switch_date`
  (default on or about 13 May 2027, EV-058; can be pulled forward) moves new
  enrolments from the SPDI regime to the DPDP regime; SPDI-regime artefacts stay on
  record. Whether written consent is still captured after the switch is a
  counsel-set configuration, defaulting to *yes*, because s.7(i)'s reach to
  biometrics and the SPDI Rules' survival are both unresolved (§23).
- **AC3 — A genuine non-biometric path, per employee.** Every employee can elect
  card, PIN, geo-mobile, web or supervisor-attested attendance
  (`AttendanceMethodElection`) at any time, without manager override or penalty
  flag. Withdrawing biometric consent moves the employee to the elected alternative
  and starts template erasure (FR-DEV-007). No tenant setting makes biometrics the
  only path. This is a risk-mitigation choice, not something r.5(7) compels: r.5(7)
  preserves the body corporate's option not to provide the service (r4), and whether
  that option has any bearing on an employer's action against a worker who refuses is
  counsel's question (CR-28, §23). The product supports no such action under any answer
  (FR-LEG-016).
- **AC4 — Template, not image; template, not event.** Enrolment and selfie images
  are deleted once a template or match outcome is extracted — no image column, no
  image bucket. A `BiometricTemplate` sits in a separate keyspace, independently
  access-controlled and logged, and is never referenced by a `Punch`. Templates are
  personal data throughout: they are not reliably irreversible (r4), so no vendor
  "it is only a hash" claim is accepted.
- **AC5 — Review, withdrawal, erasure.** A worker sees enrolment metadata (whether
  enrolled, when, on which devices — never the template), can withdraw consent and
  request deletion; the SPDI Rules give review and withdrawal rights today
  (r.5(6), r.5(7); r4; EV-060, with its provenance caveat). Whether DPDP access and erasure rights attach against an
  employer relying on s.7(i) is a counsel question (§23). Erasure timing is
  configuration, hard-coded neither as immediate nor as a one-year hold (§23).
  Form IX rows are not biometric data and keep their own retention (FR-STAT-001).

### 09.2-A The attendance-method election — a genuine non-biometric path, per employee

FR-ATT-017 AC3 commits every employee to a non-biometric path. This subsection specifies
that path as data, a decision table and invariants a build team can test. The path is an
attribute of the **employee**, not of the device or the site: one terminal authenticates by
card, PIN or biometric (FR-ATT-011), so it is the employee's election, not the hardware,
that decides which of those the system treats as a biometric act. It is the least
intrusive means under every counsel answer (§23.8.2, commitment 1). It is offered because
the proportionality question is open (Part D-2), not because a rule requires it — SPDI
r.5(7) does not itself guarantee an alternative (r4), and what an employer may do about a
refusal is CR-28 (§23).

**FR-ATT-023 — The election is an effective-dated attribute the employee owns. (P0)**
Biometric is opt-in and never the default. A joiner, and every migrated employee, starts
on the non-biometric methods their sites support, and moves to a biometric modality only
by their own election with written consent (FR-ATT-017 AC1; non-responders at migration,
§07 FR-CHR-102). The `AttendanceMethodElection` entity (§09.1-A) is specified as follows.

| Field | Type | Rule |
| --- | --- | --- |
| `election_id` | Identifier | Immutable; a change is a new row that closes the previous one |
| `employment_id` | Reference | §14's employment key, to which this section's `employee_id` resolves; one open election per employment |
| `biometric_modalities` | Set of {fingerprint, face} | Empty unless the employee elected; each member needs a live written `ConsentRecord` naming that modality in its data classes (§07 FR-CHR-100) |
| `non_biometric_methods` | Set of {card, PIN, kiosk PIN, geo-mobile, web, supervisor-attested} | Never empty (EL-1); drives provisioning of cards and PINs, never limits which non-biometric punches count |
| `elected_by` | employee · hr_on_written_request · joiner_default · migration_default | `hr_on_written_request` needs `evidence_ref`; no manager or supervisor value exists |
| `evidence_ref` | Document reference | The worker's written request, for a worker who cannot use a self-service surface |
| `effective_from`, `effective_to` | Timestamps | Forward-only; a change never re-derives a past day (EL-4) |

`SiteMethodCapability` records, per site, which methods its hardware and policy support.
It is effective-dated tenant configuration, and it is where invariant EL-1 is enforced.

- **AC1:** An employee can change their election from any worker surface — app, kiosk,
  WhatsApp flow (FR-ATT-015) — in their language (FR-DSK-003), at any time, with no
  approval step. A worker without a surface asks HR in writing; HR records the change as
  `hr_on_written_request` with the request attached.
- **AC2:** No role other than the employee can add a biometric modality. An attempt by
  HR, a manager or an API client is refused and audited as `election-change-refused`.
- **AC3:** A joiner's election is created with `elected_by = joiner_default` and empty
  `biometric_modalities` before the first roster naming them is published.

**FR-ATT-024 — One decision table for punch acceptance by verify mode, election and consent. (P0)**
A punch records how the worker was verified (`verify_mode`, FR-DEV-008 AC3). The table
below is the only place the election and consent state touch capture. No row rejects a
punch for the way the worker was verified: a worker who attended is recorded as
attending, and a consent failure is a data-handling fault for the tenant to fix, never a
wage loss.

<!-- DIAGRAM: fr-attendance-punch-method-decision -->

| # | Verify mode on the punch | Modality in the election? | Live written consent for it? | Outcome | Exception |
| --- | --- | --- | --- | --- | --- |
| M1 | Card, PIN, kiosk PIN, geo-mobile, web | n/a | n/a | Accepted and counted, whatever the election lists | None — a non-biometric method is never "wrong" |
| M2 | Supervisor-attested | n/a | n/a | Accepted, routed to approval (FR-ATT-016) | As FR-ATT-016 |
| M3 | Fingerprint or face at a terminal | Yes | Yes | Accepted and counted | None |
| M4 | Fingerprint or face at a terminal | Yes | No — withdrawn, or never captured for that modality | Accepted and counted | `biometric-without-consent`; erasure item opened for that device (FR-DEV-008 AC3) |
| M5 | Fingerprint or face at a terminal | No | Any | Accepted and counted | `biometric-without-consent`; unticketed enrolment recorded against the device (FR-ATT-028) |
| M6 | Selfie face-match, app or kiosk | Yes | Yes, and the match succeeds | Accepted and counted | None |
| M7 | Selfie face-match, app or kiosk | Yes | Yes, and the match fails or is low-confidence | Accepted as `flagged-for-approval` | `face-match-review` — advisory, never blocks pay (FR-ATT-012 AC3) |
| M8 | Selfie face-match requested | No, or consent not live | — | The camera is never opened for matching; the worker punches by a non-biometric method | None — no biometric data is captured |
| M9 | Missing, or a vendor code the adapter cannot map | n/a | n/a | Accepted; `verify_mode` null with a reason code (FR-DEV-008 AC1) | `verify-mode-unknown`, a device-class exception for the site admin |

- **AC1:** In every row, day status, worked minutes, OT and pay equal what the same times
  punched by card would produce. Tested by replaying one punch sequence under each verify
  mode and comparing the outputs byte for byte.
- **AC2:** A `biometric-without-consent` exception names the device and the employee to
  the tenant admin only, closes when the erasure item closes, and never appears on a
  supervisor's or manager's view of the worker (EL-5).
- **AC3:** M8 is enforced in the client. The app and the kiosk hold, per worker, a flag
  saying whether face-match may be offered, synced with the roster subset (FR-ATT-013
  AC2). The flag carries no reason, so a kiosk never shows who declined.

**FR-ATT-025 — Changing the election: transitions and side effects. (P0)**
An election change is a state change with device commands attached. §09.2-B covers the
enrolment half.

| From | Event | Guard | To | Side effect | Who may trigger |
| --- | --- | --- | --- | --- | --- |
| Non-biometric | Employee adds a modality | A live written `ConsentRecord` for it (FR-ATT-017 AC1) | Biometric pending enrolment | Enrolment ticket issued (FR-ATT-028) | Employee |
| Biometric pending enrolment | Ticket consumed | Enrolment evidence inside the ticket window | Biometric active | `DeviceEnrolment` rows written | Device evidence, through the receiver |
| Biometric pending enrolment | Ticket expires, or consent withdrawn | — | Non-biometric | Ticket closed; later evidence is unticketed (FR-ATT-028) | System or employee |
| Biometric active | Employee removes the modality, or withdraws consent in writing | — | Non-biometric | Erasure request, trigger `method_switch` or `consent_withdrawal`, command type delete-template (FR-DEV-014); card or PIN provisioned if not already held | Employee |
| Biometric active | Permanent transfer away from a site | The new site's roster is published | Unchanged election | Erasure request for the old site's devices, trigger `site_transfer`; enrolment at the new site only through a ticket the employee confirms | System |
| Any | Date of leaving reached | Exit recorded in §07 | Closed | Erasure request, trigger `exit`, command type delete-user | System |
| Any | HR, a manager or an API client sets a modality | — | Unchanged | `election-change-refused` audited | — |

- **AC1:** Provisioning a card or PIN is a user-sync command on the terminal's command
  channel (FR-DEV-008), queued in the same transaction as the election change, so the
  worker is never left without a working method at the terminal.
- **AC2:** Where a model supports only delete-user, not delete-template (recorded in the
  FR-DEV-004 matrix after V-11), a switch to card runs as delete-user followed by a user
  re-add without biometrics. The re-add is sent only after the delete result arrives;
  sending both at once risks the delete removing the new card (FR-DEV-014 AC1).
- **AC3:** A PIN reaches only the worker's own surface or a sealed printed slip handed
  over by the supervisor. It is never displayed on a shared kiosk (FR-DSK-002).

**FR-ATT-026 — The election is invisible to pay, performance and discipline. (P0)**
These invariants make "no penalty flag" testable. They sit alongside FR-LEG-016, under
which the product records method elections and never penalties for them.

| # | Invariant | How it is tested |
| --- | --- | --- |
| EL-1 | Every employment has at least one usable non-biometric method at every site it is rostered to, and every site offers at least one that does not depend on the worker's own phone — card, PIN, kiosk PIN, web on a shared workstation, or supervisor-attested | Save-time validation on `SiteMethodCapability` and elections; a configuration that would breach it is refused |
| EL-2 | No payroll rule, report filter, approval-routing condition, performance input or AI feature may read `biometric_modalities` or the election history | Read grant limited to the capture layer and the enrolment service; a static scan of rule definitions and report queries fails the build on any other reader |
| EL-3 | No tenant setting removes every non-biometric method from a site or makes a biometric method the only one (FR-ATT-013 AC3) | Configuration test across every site-capability combination |
| EL-4 | An election change never alters a past `DayStatus`, OT line or register cell | The prior period replays byte-identical before and after the change (CC-1) |
| EL-5 | The election is visible to the worker and to the HR admin who administers enrolment; a supervisor sees only which methods the worker can use at the supervisor's site, never whether the worker declined a biometric method | Role-based view test (§07 permissions matrix) |
| EL-6 | An extra anti-buddy-punch control — card plus PIN, rotating site PIN, supervisor attestation — applies to everyone using that method at that site, never only to workers without a biometric election | A control scoped by election is refused at configuration |

EL-1's phone-free clause rests on two findings. Worker identity cannot be assumed to be
device identity — nine in ten people who do not use a phone live in a household that
owns one (FR-ATT-013, **[Verified]**). And more than two-thirds of men against half of women
had used the internet (Comprehensive Annual Modular Survey 2023, via r2), so a
geo-mobile-only non-biometric path would leave many women frontline workers with the
biometric terminal as the only practical option — defeating the point of the path.

> **Worked example — one kitchen, three methods, one payroll.** A QSR kitchen of 35
> workers has one face terminal that also reads cards, and a kiosk tablet. 28 workers
> elect face and give written consent in their language; 5 elect card; 2 who carry no
> phone use the kiosk PIN. In month three one face user removes face from her election at
> the kiosk. In the same transaction the election closes, an erasure request
> (`method_switch`, delete-template) is created for the terminal, and a user-sync command
> adds a card number to her device user record. The terminal's next command poll serves
> both commands in order, and she punches by card the next morning. Her day status,
> worked hours and pay for the month are exactly what face punches at the same times would
> have produced (FR-ATT-024 AC1). Her supervisor's view shows "card" as her method at this
> site and nothing about the change (EL-5). The kiosk's face-match flag for her clears on
> the next roster sync (FR-ATT-024 AC3).

> **Test scenarios — election.**
>
> | # | Given | When | Then |
> | --- | --- | --- | --- |
> | T-EL-1 | A site configured with face as its only method | The admin saves it | Refused (EL-1, EL-3) |
> | T-EL-2 | A payroll rule that reads `biometric_modalities` | The rule is published | The publish fails the static scan (EL-2) |
> | T-EL-3 | A manager sets an employee's election to fingerprint through the API | The call is made | Refused; `election-change-refused` audited |
> | T-EL-4 | An employee removes face on the 14th | The month is replayed | Days 1–13 unchanged; from the 14th, face punches raise M4 and still count |
> | T-EL-5 | A model that supports only delete-user | An employee switches from fingerprint to card | Delete-user, then re-add with card only, in that order |
> | T-EL-6 | A tenant rule "card plus PIN for workers without biometrics" | It is saved | Refused (EL-6); "card plus PIN for all card users at site S" is accepted |
> | T-EL-7 | A site whose capability lists geo-mobile and face only | The admin saves it | Refused: no phone-free non-biometric method (EL-1) |
> | T-EL-8 | A supervisor opens a worker's profile | — | Usable methods at the site shown; election history and consent state not shown |

### 09.2-B Biometric enrolment under written consent, and the ~May 2027 regime switch

FR-ATT-017 AC1 and AC2 state the rule: written consent before enrolment, and two consent
regimes running concurrently across on or about 13 May 2027 (EV-058, EV-060). §07 owns the
consent record (FR-CHR-100) and the migration consent flow (FR-CHR-102). §23.8 owns the
legal posture, including the tenant acknowledgement at enablement (FR-LEG-015) and the
consent evidence export (FR-LEG-011). This subsection specifies the enrolment machinery
the consent gate sits in, and one problem the rule alone does not solve. Terminals hold
templates in their own flash — the eSSL X990 specification lists 10,000 fingerprint
templates (r4) — so on any model that lets a site admin enrol a user at the device itself,
a gate that lives only in the HRMS screen can be walked around. The product therefore
enforces the gate at three points: it enrols only against a ticket, it detects enrolment
evidence no ticket covers, and it remediates what it detects through the erasure protocol
(FR-DEV-007). Whether a model permits enrolment at the device is recorded per model after
the V-11 bench test (`matrix.local_enrolment_possible`, FR-DEV-004).

<!-- DIAGRAM: fr-attendance-biometric-enrolment-states -->

**FR-ATT-027 — Biometric capture is enabled per tenant, per site and per modality, and is off by default. (P0)**

- **AC1:** A tenant has no biometric capture until its admin records the FR-LEG-015
  acknowledgement. Enablement is then per site and per modality — fingerprint and face are
  separate switches — and each needs the site to satisfy EL-1.
- **AC2:** Fingerprint and face are separate data classes on the consent record, so
  consent to one never covers the other.
- **AC3:** Disabling a modality at a site first shows the admin the affected workers and
  devices, then creates one erasure request per affected worker (trigger
  `modality_disabled_at_site`, FR-DEV-013) and moves their elections for that site to
  non-biometric. Their other sites are untouched.
- **AC4:** The enablement screen shows, for each device model at the site, whether the
  model permits enrolment at the device, accepts a remote delete command and retains
  enrolment images — read from the FR-DEV-004 matrix, and "unknown" until V-11 or the
  vendor contract has answered for that model.
- **AC5:** A modality cannot be enabled on a device model whose matrix records no remote
  delete, or has no vendor-terms record — FR-LEG-017 AC1 and AC2 limit such a model to
  non-biometric modes. "Unknown" is treated as "no" for this check, so the switch stays off
  for a model until V-11 or the vendor contract answers.

**FR-ATT-028 — The enrolment ticket: no enrolment the product controls happens without one, and none it cannot control goes undetected. (P0)**

| Field | Type | Rule |
| --- | --- | --- |
| `ticket_id` | Identifier | Immutable |
| `employment_id`, `modality` | Reference, enum | One open ticket per employment per modality |
| `consent_id`, `consent_version` | Reference | Live and regime-resolved (FR-ATT-029) at issue |
| `device_scope` | Device serials, or a kiosk or app installation id | The only devices on which the ticket can be consumed |
| `issued_at`, `expires_at` | Timestamps | Validity is `enrolment_ticket_ttl_h`, a product parameter with no statutory basis (owner: Product) |
| `state` | ISSUED · CONSUMED · EXPIRED · REVOKED | REVOKED when consent is withdrawn before consumption |
| `consumed_evidence` | Reference | The command result, template upload or first biometric-verify punch that consumed it |

Enrolment runs in this order, in the worker's language (FR-DSK-003), on the worker's own
phone, at the kiosk, or with HR for a worker who uses neither.

1. **Choice.** The worker sees the notice for the purpose and regime — the counsel-cleared
   template version (FR-LEG-002) — and the biometric and non-biometric methods as equal
   options with nothing pre-selected: a visible choice, not a hidden fallback (r4).
   Declining ends the flow with the non-biometric election recorded (FR-ATT-023).
2. **Written consent.** A `ConsentRecord` is created per modality (FR-CHR-100) with its
   capture form: in-app, letter, email or fax. SPDI r.5(1) names letter, fax or email;
   whether in-app capture suffices is CR-27, so every in-app artefact is labelled and
   FR-LEG-011 AC2 can find it later. A signed paper letter is scanned and attached by HR;
   the scan is a consent artefact (an erasable class), not biometric data.
3. **Regime.** The resolver (FR-ATT-029) stamps the record with its regime.
4. **Ticket.** A ticket is issued for the devices at the worker's rostered sites that
   support the modality.
5. **Enrolment.** Where the model accepts a remote enrolment command, the product queues
   a user-sync command for the worker's device user id. Where enrolment happens at the
   device, the product first sends the user record, so the site admin enrols an identity
   the product already knows.
6. **Consumption.** The ticket is consumed by the first enrolment evidence for that
   (device serial, device user id) inside its validity: a command result for a remote
   enrolment, a template upload where server sync is enabled (FR-ATT-031), or the first
   punch with a biometric verify mode. Consumption writes the `DeviceEnrolment` rows and
   the `BiometricTemplate` entity (§09.2-C).
7. **Images.** Where the product's own kiosk or app captured the enrolment image, the image
   is deleted as soon as the template or match reference is extracted. No image column and
   no image bucket exist to receive it (FR-ATT-017 AC4).

- **AC1:** A biometric-verify punch or a template upload for a (device, device user id)
  pair that no ISSUED ticket covers is an **unticketed enrolment**. It raises
  `biometric-without-consent` (FR-ATT-024 M5), opens an erasure item for that device
  (trigger `unticketed_enrolment`) and alerts the tenant admin with the device and time.
  The punch counts.
- **AC2:** Unticketed enrolments are counted per device and per site. A device with repeat
  occurrences is listed on the compliance view, so the tenant can address how enrolment
  is being done there.
- **AC3:** Evidence that arrives after `expires_at`, or after REVOKED, is unticketed.
- **AC4:** A storage scan after any enrolment through the product's own kiosk or app finds
  no image object and no image-typed value (an automated test on every release).
- **AC5:** No ticket is issued while an erasure request for the same employment and
  modality is open, because a re-enrolment could race a queued delete command that would
  then remove the new template.

**FR-ATT-029 — The consent-regime resolver. (P0)**
The resolver decides which regime a new consent record belongs to and whether written
capture is required before enrolment. It reads three rule-store values, each with an owner
(§22): `consent_regime_switch_date` — on or about 13 May 2027 (EV-058), which can be pulled
forward if MeitY compresses the timeline, with 13 versus 14 May unresolved;
`post_switch_written_capture` — counsel-set, default *yes*, because whether s.7(i) reaches
biometric capture and whether the SPDI Rules survive the omission of IT Act s.43A are both
open (CR-02, CR-12); and the CR-27 answer on capture form, unset until counsel answers.

| # | Capture time vs switch date | `post_switch_written_capture` | Record created | Written capture before enrolment | Notice |
| --- | --- | --- | --- | --- | --- |
| R1 | Before | n/a | SPDI-regime record | Yes — r.5(1) (EV-060) | The SPDI-era biometric notice version |
| R2 | On or after | Yes (default) | DPDP-regime record, with the written artefact attached | Yes — counsel-set configuration | The DPDP-era notice version, counsel-cleared |
| R3 | On or after | No — only after counsel has answered CR-02 and CR-12 | DPDP-regime record on the basis counsel records | No | As counsel sets |
| R4 | The switch date is moved earlier after some captures | — | Earlier records keep their regime; the new date applies to later captures only | Unchanged for existing records | — |
| R5 | The switch date is moved later after some captures were labelled DPDP | — | No record is rewritten; a review task lists the affected records and a corrected version is appended to each, carrying the regime in force at capture under the new date (§14.4.15 invariant 3) | Already done — R2 captured it | — |

- **AC1:** Every consent record carries the resolver inputs as they stood at capture —
  switch-date value, configuration version, capture form — so an auditor can see why it
  got its regime without reconstructing configuration history.
- **AC2:** Nothing happens to existing enrolments at the switch: no automatic re-consent
  campaign, no re-dating, and SPDI-regime records stay as evidence of what was captured
  under them. Whether existing SPDI-regime enrolments need a DPDP-era notice after the
  switch is routed to §23 under CR-02; the notice engine (FR-LEG-002) can send one if
  counsel says so.
- **AC3:** Screens render the switch date as "on or about", never as a bare date, until
  the e-Gazette date question is closed (EV-058).
- **AC4 — The switch is data, not a deploy.** `consent_regime_switch_date` is a rule object
  (FR-LEG-008) and the resolver reads it at each capture. On the day nothing runs but that
  read; the compliance view counts captures per regime per tenant from then on, and the
  FR-LEG-009 drill proves beforehand that the change needs no code.
- **AC5 — In flight at the switch.** Each case is resolved at the capture time of the
  record it concerns.

| # | In flight at the switch | Handling |
| --- | --- | --- |
| S1 | Consent captured before the switch; its ticket consumed after | The record keeps its SPDI regime (R1 fixed it at capture); the enrolment proceeds |
| S2 | The notice shown before the switch; the consent submitted after | The resolver uses submission time (R2 or R3). The flow re-renders the notice for the new regime and asks again, rather than accept consent given to a superseded text |
| S3 | An SPDI-regime record withdrawn after the switch | The withdrawal is recorded on that record and erasure follows FR-ATT-030; the grievance clock is the one FR-LEG-010 sets for the regime then armed |
| S4 | A new counsel-cleared notice version after the switch, for a worker holding an SPDI-regime record | No re-consent unless counsel asks for one (AC2). If asked, the new consent is a new version under the new regime; the SPDI version stays as evidence |
| S5 | A brownfield window (FR-ATT-035) that spans the switch | Each worker's consent takes the regime of its own capture time |
| S6 | The switch date gazetted earlier than configured | R4 — earlier records keep their regime; FR-LEG-009's drill has already exercised the change |

**FR-ATT-030 — Withdrawal and re-enrolment. (P0)**
SPDI r.5(7) gives the worker an option to withdraw consent at any time, in writing (r4).
The product never refuses a withdrawal and never attaches a consequence to one
(FR-LEG-016). Whether an employer may act against a worker who refuses or withdraws is
CR-28; the product supports no such action under any answer.

- **AC1:** Withdrawal is accepted from any worker surface, and on paper through HR, and is
  recorded on the consent record with its capture form, like the consent it withdraws.
- **AC2:** At receipt the election moves to non-biometric for that modality, forward only,
  and an erasure request opens with trigger `consent_withdrawal` (FR-DEV-013). Its due time
  comes from `template_erasure_delay_days.consent_withdrawal`, tenant configuration within
  counsel's bound (CR-09), never hard-coded as immediate or as a one-year hold (Part D-9).
  The configuration screen says what a delay means in practice: until the delete command
  reaches the terminal, the terminal still holds the template and can still match it, and
  every such match raises M4.
- **AC3:** Re-enrolment after a withdrawal needs a new consent version and a new ticket,
  and FR-ATT-028 AC5 holds it until the earlier erasure request is complete.
- **AC4:** A grievance about biometric processing goes to the tenant's grievance contact
  under the SPDI one-month clock while that regime is armed (FR-LEG-010; r.5(9)). The
  worker's enrolment metadata view (FR-ATT-017 AC5) — enrolled or not, when, on which
  devices, and per-device erasure status — is the shared evidence.

> **Worked example — two workers either side of the switch.** Dates are scenario dates.
> On 20 November 2026 worker A consents in-app to fingerprint enrolment. R1 applies: an
> SPDI-regime record, labelled in-app. A ticket covers the plant's two terminals and is
> consumed by A's first fingerprint punch that shift. The rule store carries the switch
> date as on or about 13 May 2027. On 2 June 2027 worker B consents to face enrolment. R2
> applies: a DPDP-regime record with the written artefact attached, because
> `post_switch_written_capture` is still *yes* while CR-02 and CR-12 are open. On
> 16 August 2027 A withdraws in writing through HR. A's record gains `withdrawn_at` and is
> kept as evidence under its own retention class (§14.7); A's election moves to card; an
> erasure request queues delete-template on both terminals. If counsel later answers CR-27
> that in-app capture does not satisfy r.5(1), FR-LEG-011 AC2 lists A's 20 November record
> for follow-up. Nothing is re-dated, and the withdrawal stands.

> **Test scenarios — enrolment and regime.**
>
> | # | Given | When | Then |
> | --- | --- | --- | --- |
> | T-EN-1 | Biometric capture not enabled for the tenant | A worker opens enrolment | Only non-biometric methods are offered |
> | T-EN-2 | A live fingerprint consent and no face consent | A face-verify punch arrives | M5: counted, `biometric-without-consent`, unticketed enrolment recorded, erasure item queued |
> | T-EN-3 | A ticket scoped to terminal T1 | A fingerprint punch arrives from T2 | Unticketed on T2; T1's ticket stays ISSUED |
> | T-EN-4 | A ticket that expired an hour ago | The first fingerprint punch arrives | Unticketed (FR-ATT-028 AC3) |
> | T-EN-5 | Consent withdrawn while the ticket is ISSUED | A fingerprint punch arrives later | Ticket REVOKED; the punch is unticketed |
> | T-EN-6 | Switch date set to 13 May 2027 | Consent captured on 12 May and on 14 May | R1 and R2 respectively, each with its inputs stamped (FR-ATT-029 AC1) |
> | T-EN-7 | Switch date moved from 13 May to 1 August after captures on 2 June | The change is published | R5: a review task lists the 2 June records; corrected versions appended; originals untouched |
> | T-EN-8 | An open fingerprint erasure request | The worker asks to re-enrol | Ticket refused until the request completes (FR-ATT-028 AC5) |
> | T-EN-9 | Face enrolment through the product's kiosk | The release storage scan runs | No image object anywhere (FR-ATT-028 AC4) |
> | T-EN-10 | A supervisor looks for a deduction rule for workers who withdrew | They search configuration | No such rule type exists (FR-LEG-016, EL-2) |

### 09.2-C The biometric template entity — storage modes, access events and invariants

§14.4.15 fixes the entity's shape and §17.4 its encryption; this subsection specifies what
the attendance module does with it. The template is a separate entity from the attendance
event (Part E-6): a `Punch` carries an employee and a time, never a template reference, so
every attendance record survives template destruction (§09.1-A AC3).

**FR-ATT-031 — Three storage modes, and holding no copy is the default. (P0)**

| Mode | What the product holds | When used | Erasure reaches |
| --- | --- | --- | --- |
| `DEVICE_HELD` (default) | A `BiometricTemplate` row with metadata only — no payload, no `key_ref` | Terminals that enrol and match locally | Each device's flash, through the command channel (FR-DEV-007) |
| `SERVER_SYNCED` | The metadata row plus an encrypted payload in the biometric keyspace, under its own key | Only where the tenant enables `template_server_sync`, for example to copy an enrolment to a second terminal without re-enrolling | The server key (phase 1) and each device's flash (phase 2) |
| `KIOSK_CACHED` | An encrypted reference in the kiosk's local store, limited to consented workers in the site's roster subset (FR-ATT-013 AC2) | Offline face-match on a kiosk (FR-DSK-001) | The kiosk installation, treated as a device in the `DeviceEnrolment` ledger |

`DEVICE_HELD` is the default because a server-side breach then exposes no template. Its
cost is re-enrolment when a worker moves to another terminal, which the tenant weighs when
deciding whether to enable sync.

- **AC1:** Enabling `template_server_sync` is an audited tenant-admin action. Disabling it
  destroys the server-side key of every synced template (phase 1 only); device copies stay
  until each worker's own erasure trigger fires.
- **AC2:** A template upload from a device is accepted only under `SERVER_SYNCED`, and
  only for a worker with a live written consent and an election for that modality
  (FR-DEV-008, template-upload row). Otherwise the blob is discarded, written nowhere, and
  the discard is logged.
- **AC3:** The kiosk cache holds only workers whose election and consent are live. Each
  roster sync removes a worker whose consent was withdrawn, and the kiosk's
  acknowledgement confirms that worker's erasure item for the kiosk.
- **AC4:** A mobile selfie face-match compares against a reference held in the biometric
  keyspace, whatever the tenant's sync setting, because a personal phone is not a device
  the tenant controls. The match outcome, never the frame, is written to the punch
  (FR-ATT-012 AC3).

**FR-ATT-032 — Every template access is an event, and some operations do not exist. (P0)**

| Field of `TemplateAccessEvent` | Rule |
| --- | --- |
| `event_id`, `template_id` | Immutable |
| `actor` | A service identity — enrolment, sync-to-device, match, erasure — or a named human; no human role reads payloads (AC3) |
| `operation` | create · read-for-match · sync-to-device · key-destroy · discard |
| `purpose_code` | enrolment · attendance-match · erasure; no other value is accepted |
| `ts`, `outcome` | Time, and success or refusal |

- **AC1:** Access events are ICT logs, kept in India for at least 180 days (CERT-In,
  EV-062). Any longer period is `template_access_log_retention_days`, counsel-set. DPDP's
  detection-capable logging duty is not in force (EV-064); the events are built to support
  it.
- **AC2:** No export, download, report or API returns a template payload: exporting one
  would create a portable, invertible credential (r4). The worker sees enrolment metadata
  only (FR-ATT-017 AC5).
- **AC3:** No human role can read a template payload. Support tooling, analytics, backups
  outside the keyspace and every outbound model call exclude the keyspace; templates are
  default-deny at the redaction chokepoint (Part E-7, §12.8).
- **AC4:** The keyspace and every copy of it, backups included, stay in India. SPDI r.7
  restricts cross-border transfer of sensitive personal data (EV-060); any change goes to
  counsel (§23.6).
- **AC5:** Access outside the service identities' normal pattern — a read-for-match from a
  service that does not match, or a burst of reads — raises a security event that enters
  the six-hour CERT-In triage (EV-062, §17).

**FR-ATT-034 — The template row has four states, and none of them leads back to ACTIVE. (P0)**
The `BiometricTemplate` row carries a `state` alongside its storage mode (FR-ATT-031). The
state is what every service checks before touching the template, so erasure timing, the
M4 exception and re-enrolment all read one field instead of inferring from the request and
its items.

<!-- DIAGRAM: fr-attendance-template-lifecycle-states -->

| From | Event | Guard | To | Side effect | Who may trigger |
| --- | --- | --- | --- | --- | --- |
| — | Enrolment ticket consumed (FR-ATT-028 step 6) | Live written consent for the modality and the modality in the election | ACTIVE | Row created with its storage mode; `DeviceEnrolment` rows written; access event `create` | Enrolment service |
| ACTIVE | Sync to a further device (`SERVER_SYNCED` only) | Consent and election still live; the device's model can delete on command (FR-ATT-027 AC5) | ACTIVE | A `DeviceEnrolment` row; access event `sync-to-device` | Sync service |
| ACTIVE | An erasure request opens, any FR-DEV-013 trigger | — | SUSPENDED | Server copy unreadable to every service except the erasure job; sync refused; the kiosk cache drops the worker on its next roster sync (FR-ATT-031 AC3) | Erasure service |
| SUSPENDED | `due_at` reached (the same transaction when the delay is zero) | — | ERASING | Phase 1: server key destroyed (`SERVER_SYNCED`) or marked not applicable (`DEVICE_HELD`); device items enter QUEUED (T-ER-2); access event `key-destroy` | Erasure job |
| ERASING | The last open item closes | Every item `ERASED_CONFIRMED` or `CLOSED_BY_ATTESTATION` | CLOSED | Row tombstoned (FR-ATT-032 table); `erased_at` set; evidence pack rendered (FR-DEV-016) | System |
| CLOSED | An item reopens — a returning device or a restored backup (FR-DEV-015 AC1, AC3) | — | ERASING | Request REOPENED; nothing becomes readable, because the key is already gone | System |
| Any state but CLOSED | Re-enrolment requested for the same modality | — | Unchanged | Refused (FR-ATT-028 AC5) | — |

- **AC1:** No transition leads to ACTIVE from another state. Re-enrolment after CLOSED
  creates a new `template_id` under a new consent version and a new ticket; identifiers are
  never reused, so an evidence pack can never be read as covering a later enrolment.
- **AC2:** While a row is SUSPENDED, a device that still holds the template can still match
  it. Each such match counts for attendance and raises M4 (FR-ATT-024), as FR-ATT-030 AC2
  tells the configuration screen to say.
- **AC3:** Every transition writes an access event or an audit entry naming the request and
  the trigger (FR-ATT-032). A transition that no request explains is a security event.
- **AC4:** No transition changes a `Punch`, `WorkSession`, `DayStatus`, OT line or
  `FormIXRow` (T-BT-5, T-ER-10).

**What survives the destruction of a template.**

| Record | After the template key is destroyed and the devices acknowledge |
| --- | --- |
| `Punch`, `DayStatus`, OT lines, `FormIXRow` | Unchanged — they never referenced the template |
| `DeviceEnrolment` rows | Kept as erasure evidence, with the per-device outcome |
| `ConsentRecord` | Kept under its own retention class (§14.7, `retention.consent_evidence`) |
| `TemplateAccessEvent` | Kept for the log retention period (FR-ATT-032 AC1) |
| `BiometricTemplate` row | Tombstoned — identifier, modality, dates, erasure basis, actor; payload and key gone |
| Device copies | Gone where the device acknowledged; `closed-by-attestation` where it could not (FR-DEV-007 AC2) |

**Per-model facts the vendor contract must supply.** Indian terminal vendors' public
documentation is silent on template format, image retention, storage location, encryption
and deletion (r4). FR-LEG-017 makes these contract terms; the FR-DEV-004 matrix records the
answer per model so that product behaviour can depend on it. Each field reads "unknown"
until the vendor contract or the V-11 bench test answers it, and a vendor statement is
recorded as a claim, not a verified capability.

| Matrix field | What the product does with it |
| --- | --- |
| `matrix.template_format` | Records whether the template is in a portable format, which raises linkability risk (r4) |
| `matrix.images_retained` | A model that keeps enrolment images defeats "no image anywhere"; the enablement screen warns (FR-ATT-027 AC4) |
| `matrix.remote_delete`, `matrix.delete_granularity` | Selects the erasure path (FR-DEV-007 AC3) and the command type (FR-DEV-014) |
| `matrix.local_enrolment_possible` | Whether unticketed enrolment can happen at all (FR-ATT-028) |
| `matrix.template_upload_behaviour` | Whether the device pushes templates unasked, which the receiver discards (FR-ATT-031 AC2) |
| `matrix.user_store_backup_restore` | Whether a restore could bring back an erased template (FR-DEV-015 AC3) |
| `matrix.encrypted_transport` | Shown on the device page (FR-DEV-008 AC6) |
| `matrix.template_protection_claim` | Whether the vendor claims ISO/IEC 24745 template protection, which r4 recommends preferring where procurement allows — a claim, not a test result |
| `matrix.user_store_query` | Whether the adapter can list device users and whether each holds biometric data, without retrieving a template — decides a complete or partial brownfield inventory (FR-ATT-035) |
| `matrix.bulk_template_clear` | Whether one command clears biometric data for every user on the device and reports a result — the only way a partial inventory closes without a tenant attestation (FR-ATT-035 BF-6) |

> **Test scenarios — template store.**
>
> | # | Given | When | Then |
> | --- | --- | --- | --- |
> | T-BT-1 | Any release | The schema scan runs | No foreign key from any business table to `BiometricTemplate`; no image-typed column anywhere |
> | T-BT-2 | A `DEVICE_HELD` tenant | A device uploads a template | Discarded and logged; no payload stored (FR-ATT-031 AC2) |
> | T-BT-3 | A `SERVER_SYNCED` tenant; the worker withdrew consent yesterday | A device uploads that worker's template | Discarded; an erasure item opened for the device |
> | T-BT-4 | A support engineer with the highest support role | Opens the worker record | Enrolment metadata only; the keyspace is unreachable |
> | T-BT-5 | A template key destroyed | The worker's last three months are replayed | Byte-identical to the replay before destruction (CC-1) |
> | T-BT-6 | An assistant request that includes the worker's attendance history | It leaves for a model provider | No template and no template identifier crosses the chokepoint |
> | T-BT-7 | A backup restored in a test environment after key destruction | The template row is read | Tombstone and ciphertext only; no restore path recovers the key (§14 AC-DM-35) |

### 09.2-D Brownfield fleets — templates that were on the terminal before the product was

A tenant that already runs terminals brings them with it: the fleet is sunk capital the
buyer will not replace to suit the software (r2, FR-DSK-006). Those terminals hold
templates enrolled before the product existed in the tenant's life, usually with no
written consent on record. FR-CHR-102 bars importing source templates and synthesising
consent, but a terminal's flash is not an import: the templates are on the device the
moment it is pointed at the receiver, and the first fingerprint punch proves it. Consent
cannot be backfilled (Part E-12). Whether written consent captured now can cover a
template collected earlier is a question SPDI r.5(1)'s "before collection" wording leaves
to counsel (EV-060; §23). So the default is the conservative one: every template the
product did not ticket is erased, and a worker who wants biometric attendance re-enrols
under a fresh written consent and a ticket.

<!-- DIAGRAM: fr-attendance-brownfield-reconciliation -->

**FR-ATT-035 — Brownfield reconciliation when an existing terminal is registered. (P0)**
Registering a device (FR-DEV-010) asks the admin whether the terminal already holds
biometric enrolments: yes, no or unknown. Unknown is treated as yes. A yes puts the device
in reconciliation — a flag on the `Device`, not a lifecycle state, so FR-DEV-010 and ingest
run unchanged — until every template on it is accounted for. The product learns who holds
a template on the device from three sources, strongest first: a user-store listing where
`matrix.user_store_query` says the model supports one (V-11); the first biometric-verify
punch by each device user; and the tenant's declaration. A model that can list gives a
complete inventory at registration; one that cannot gives a `partial` inventory that fills
in as workers punch, and the compliance view says which.

| # | Inventory for the worker on this device | Model deletes on command? | Worker's response inside `brownfield_response_window_days` | Outcome |
| --- | --- | --- | --- | --- |
| BF-1 | No biometric data | — | — | Nothing to reconcile; the election is created as `migration_default`, non-biometric (FR-ATT-023) |
| BF-2 | Biometric data | Yes | Elects a non-biometric method | Erasure request, trigger `brownfield_unconsented`, delete-template; card or PIN provisioned in the same transaction (FR-ATT-025 AC1) |
| BF-3 | Biometric data | Yes | Elects the modality and gives written consent (FR-ATT-028 steps 1–3) | The old template is erased first, as BF-2; the ticket issues only once that request completes (FR-ATT-028 AC5); the worker re-enrols under the ticket |
| BF-4 | Biometric data | Yes | No response by the end of the window | As BF-2, with `elected_by = migration_default`; the worker can elect biometric later through the normal flow |
| BF-5 | Biometric data | No, or unknown | Any | The model stays in non-biometric modes (FR-LEG-017 AC2; FR-ATT-027 AC5); one `ONSITE_TASK` item per worker (FR-DEV-007 table); the site admin deletes at the device and attests |
| BF-6 | Unknown — partial inventory | Yes | — | Each worker enters BF-2 to BF-4 when a biometric-verify punch identifies them. The device leaves reconciliation only on a tenant attestation that biometric data was cleared on it, or on the result of a one-command clear where `matrix.bulk_template_clear` records one (V-11) |
| BF-7 | Biometric data | Yes | Written consent, where counsel has enabled `brownfield_adopt_with_new_consent` (ships off) | The template is kept; an `adopt_existing` ticket scoped to that device is consumed by the worker's next biometric-verify punch; the consent record is labelled `post_collection`, so FR-LEG-011 can list every such record if counsel's answer changes |

- **AC1 — Punches count.** Every punch from a reconciling device is accepted and counted
  (FR-ATT-024). A biometric-verify punch by a worker in BF-2 to BF-6 raises one
  reconciliation item per worker per device, not an M5 exception per punch; the item
  closes when that worker's erasure item closes.
- **AC2 — The clock.** The erasure clock starts at the worker's election for BF-2 and
  BF-3, and at the end of the window for BF-4, with delay `.no_consent` inside counsel's
  bound (FR-DEV-014 AC2). The window is tenant configuration inside a bound Legal sets,
  because every day of it is a day a template without written consent stays on the
  device; the configuration screen says so.
- **AC3 — The ledger.** Each (device, worker) found gets a `DeviceEnrolment` row with
  `origin = brownfield` and no `BiometricTemplate` row, because the product holds and
  ticketed nothing. The erasure request's `template_ids` is empty and its items are these
  rows. BF-7's adoption creates the `BiometricTemplate` row (`DEVICE_HELD`) when its
  ticket is consumed.
- **AC4 — No enrolment on a reconciling device.** No ticket other than a BF-7
  `adopt_existing` ticket issues for a device in reconciliation, so a fresh enrolment
  cannot be mistaken for an old template under the same device user id.
- **AC5 — No bulk shortcut past the worker.** A tenant can move every worker on a device
  to BF-4 in one action — the least intrusive choice. It cannot adopt in bulk: each BF-7
  needs that worker's own written consent.
- **AC6 — One request per worker.** Where the tenant is also migrating from another
  system, the reconciliation and the §07 FR-CHR-102 consent flow send each worker one
  combined request in their language (FR-DSK-003), never two.
- **AC7 — Evidence.** The per-device reconciliation report lists each worker found, the
  source that found them, the outcome and its erasure evidence. It is rendered from
  records and joins the device's evidence pack (FR-DEV-016).

> **Worked example — a warehouse brings two terminals and 48 enrolled workers.** The tenant
> sets `brownfield_response_window_days` to 14 and `template_erasure_delay_days.no_consent`
> to zero — tenant choices for the example, not recommendations — and, for the example,
> V-11 has recorded that the model can list users and delete on command. On Monday
> 12 October 2026 the admin registers both terminals and declares templates present. The
> listing finds the same 48 device users with fingerprint data on each: 96
> `DeviceEnrolment` rows, `origin = brownfield`. Each worker receives the choice flow. By
> Monday 26 October, 30 have given written consent and elected fingerprint (BF-3), 12 have
> elected card (BF-2) and 6 have not answered (BF-4 at the window's end). Every worker's
> old template is erased — 48 workers on two terminals, 96 delete-template items — and the
> 30 re-enrol under tickets once their own requests complete, creating 30 new template
> rows. The 18 who end on card or kiosk PIN are provisioned in the same transaction as
> their election. Across the fortnight every punch counted; fingerprint punches by those 18
> raised at most 36 reconciliation items, one per worker per terminal, rather than one
> exception per punch. No Form IX cell or pay figure differs from what card punches at the
> same times would have produced (FR-ATT-024 AC1).

> **Test scenarios — brownfield.**
>
> | # | Given | When | Then |
> | --- | --- | --- | --- |
> | T-BF-1 | A device registered with templates declared "unknown" | Registration completes | Device in reconciliation; inventory `partial` unless the model can list |
> | T-BF-2 | A reconciling device | A ticket is requested for a new joiner on it | Refused (AC4); the joiner is ticketed once reconciliation ends |
> | T-BF-3 | A worker in BF-3 | The ticket is requested before the old template's request completes | Held (FR-ATT-028 AC5); issued on completion |
> | T-BF-4 | A model with no remote delete and templates present | The admin tries to enable fingerprint at the site | Refused (FR-ATT-027 AC5); `ONSITE_TASK` items listed |
> | T-BF-5 | `brownfield_adopt_with_new_consent` off | A worker gives written consent and asks to keep the template | Treated as BF-3: erase, then re-enrol |
> | T-BF-6 | A worker in BF-2 punches by fingerprint 20 times before the delete lands | The day's exceptions are listed | One reconciliation item for that worker on that device; 20 punches counted |
> | T-BF-7 | A partial inventory | The tenant attests a device-level clear | Device leaves reconciliation; a later biometric-verify punch raises M5 as for any device |
> | T-BF-8 | A tenant selects "adopt all" | The action is attempted | No such action exists; "erase all" (BF-4 for every worker) is offered |

**FR-ATT-036 — A scheduled reconciliation proves consent, election, enrolment and template state agree. (P0)**
The transactional flows keep these four records in step; this job proves they are and
repairs drift. It runs per tenant on `consent_reconciliation_schedule` (Engineering-set, no
statutory basis), never changes attendance, and is idempotent.

| # | Drift found | Action | Exception |
| --- | --- | --- | --- |
| RC-1 | An election lists a modality with no live written consent for it | Election closed forward-only to non-biometric; erasure request, trigger `template_without_consent` | `consent-election-drift`, tenant admin |
| RC-2 | An active `DeviceEnrolment` whose worker's election excludes that modality, with no open erasure request | Erasure request, trigger `method_switch` | `enrolment-election-drift`, tenant admin |
| RC-3 | An ISSUED ticket whose consent is withdrawn or superseded | Ticket REVOKED (FR-ATT-028) | None |
| RC-4 | A kiosk cache holding a worker whose consent or election is not live | Forced roster sync to that kiosk; its item stays open until the kiosk acknowledges (FR-ATT-031 AC3) | `kiosk-cache-drift`, site admin |
| RC-5 | A `SERVER_SYNCED` row in ACTIVE whose key is absent from the keyspace | Security event (FR-ATT-032 AC5); erasure request so device copies go too; the worker's enrolment is reset and they may re-enrol | Security event |
| RC-6 | A `BiometricTemplate` row with no `DeviceEnrolment` row and not `SERVER_SYNCED` | Row closed — nothing holds a copy; audit entry | `orphan-template-row`, Engineering |
| RC-7 | A COMPLETE request, and a biometric-verify punch by that worker on a covered device since completion | Item reopened (FR-DEV-015 AC3) — normally caught at ingest; this catches a missed one | M4 or M5 |
| RC-8 | A device still reconciling after `brownfield_response_window_days`, with workers found but unresolved | Those workers moved to BF-4 | `brownfield-overdue`, tenant admin |

- **AC1:** A run that finds nothing leaves one invariant true: every active
  `DeviceEnrolment` has a live written consent and an election for its modality, or an
  open erasure request, or is a brownfield row still inside its response window
  (FR-ATT-035).
- **AC2:** Counts per drift class per tenant appear on the compliance view. RC-1, RC-2 or
  RC-6 found on consecutive runs is a defect in a transactional flow and is raised to
  Engineering as well as to the tenant.
- **AC3:** The job reads the keyspace for key presence only, never a payload
  (FR-ATT-032 AC3).

---

### 09.3 The ADMS/WDMS push receiver — device integration

<!-- DIAGRAM: adms-push-sequence -->

**FR-DEV-001 — Build the ADMS/WDMS push receiver in v1. (P0 — the single
best-evidenced requirement in the document.)**
The dominant device-to-cloud path in India is **outbound**: the terminal
HTTP-POSTs punch packets to a tenant-scoped URL. **No on-premise middleware, no
static IP, no port forwarding.** **[Verified]** eSSL and ZKTeco both support it;
corroborated across four independent sources and unshaken by hostile re-checking
(Source: r2 — see FR-ATT-011; the vendor protocol specification itself has not been
captured, §20 V-11).

- **AC1:** A tenant can register a device by serial number and receive a unique,
  tenant-scoped, secret-bearing push endpoint URL to enter into the terminal's
  cloud/ADMS settings — a self-serve flow with a vernacular step-by-step (§09.9).
- **AC2:** The receiver accepts eSSL/ZKTeco push semantics (device handshake,
  heartbeat, attendance-log upload, command poll) and ACKs correctly so the device
  marks records as delivered and does not re-flood. Exact endpoint paths and packet
  field names are taken from the vendor protocol documentation during the §20 V-11
  bench test; this PRD does not assert them.
- **AC3:** Endpoint is authenticated per device (serial + secret/token); a punch
  packet whose serial is unknown or unauthorized to the tenant is rejected and
  logged, never accepted into another tenant's stream (multi-tenant isolation).
- **AC4:** Ingestion is **idempotent**: re-delivery of the same record
  (device retries, overlapping polls, firmware re-sends) is de-duplicated on
  `(device_sn, device_user_id, device_timestamp, direction)` + `payload_hash` and
  counted once.
- **AC5:** Records arrive **out of order and late** (a terminal that was offline
  for two days dumps its buffer on reconnect); the engine ingests them and
  triggers recompute of the affected past dates (FR-ATT-001) rather than dropping
  them.

> **Worked example — the two-day buffer dump.** A Pune plant's eSSL terminal
> (serial `T-PUNE-01`, an illustrative label, not a vendor serial format) loses uplink Fri 18:00–Mon 09:00 over a long weekend. During
> the outage 42 workers punch normally against the terminal's local store. On
> reconnect Monday the device replays ~168 buffered attendance-log records, interleaved
> with fresh Monday punches, some duplicated because the device retried a partial
> POST Friday evening. The receiver must: (a) ACK each batch so the terminal marks
> it delivered and stops re-flooding (AC2); (b) de-dup the Friday retries on
> `(device_sn, device_user_id, device_timestamp, direction)` + `payload_hash` so a
> worker is not credited two Friday shifts (AC4); (c) attribute buffered punches to
> **Fri/Sat/Sun pay dates**, not to Monday's ingest date (AC1, capture-time not
> sync-time); (d) recompute Fri–Sun day-status and any weekend OT and
> substituted-rest-day lines those punches now create (AC5, FR-ATT-001, FR-SHF-002
> AC3). If payroll for the
> prior period has already locked, the recompute opens a retro run (FR-ATT-001 AC3)
> rather than mutating locked days.

**FR-DEV-002 — Device-user-to-employee resolution. (P0)**
Terminals key on a device-local enrollment number, not the HRMS employee ID. A
mapping layer resolves `(device_sn, device_user_id) → employee_id`, effective-dated
(a badge number gets reassigned after an exit).

- **AC1:** An unmapped device user surfaces as an **enrollment exception** (punch
  is retained, not lost) so a new joiner's punches are backfilled once mapped.
- **AC2:** Reassignment of a device user number is effective-dated so historical
  punches stay attributed to the correct person.

**FR-DEV-003 — Clock-skew and health monitoring per device. (P0)**
Frontline terminals drift; a device an hour fast silently corrupts shift pairing.
The system measures each device's clock offset (from heartbeat vs server time,
where server time is synced to NIC/NPL NTP as the CERT-In Directions require,
EV-062), last-seen, and delivery gaps. A suspected terminal compromise is treated
as falling within the CERT-In Annexure I incident types (IoT devices, item xiii)
and enters the six-hour pipeline (EV-062, §17).

- **AC1:** A device unseen for longer than tenant parameter
  `device_unseen_alert_h` raises an alert to the site admin **before** payroll
  lock, not after.
- **AC2:** Detected clock skew beyond a threshold is surfaced and can be corrected
  by applying a per-device offset to historical punches (audited), rather than
  requiring manual editing of thousands of rows.

**FR-DEV-004 — Model-level device compatibility matrix + self-serve verification
tool, published. (P0 — cheapest high-leverage artefact in the corpus.)**
**[Verified]** Research identifies a public, model-level compatibility matrix and a
self-serve verification tool, shipped *before the first enterprise sales call*, as
the highest-leverage cheap artefact — it neutralises deal-gating risk, and we are
not aware of any incumbent publishing one as of September 2026 (Source: r2, a review
of vendor documentation only, no product executed). The matrix also records, per model, whether the device accepts a remote
delete-template command — the precondition for FR-DEV-007.

- **AC1:** A prospect can enter a device brand/model and see supported/partial/
  unsupported + the integration path (push, pull-connector, or manual) before
  talking to sales.
- **AC2:** A running device, once pointed at a trial endpoint, self-reports its
  make/model/firmware and confirms end-to-end punch delivery within minutes.

**FR-DEV-005 — Long-tail via partner/paid connector, not in-house build. (P1)**
For SDK-bound brands, pre-ADMS firmware, and air-gapped plant networks, integrate
a third-party connector rather than building. **[Verified]** a paid connector
market exists at roughly **$345 one-time to $588/year** — cheap enough that
in-house build cannot be justified for the tail; the legacy port-4370 protocol is
**reverse-engineered, not documented, and behaves inconsistently across firmware**
(Source: r2 — an Odoo-style connector at $345.12 one-time; CAMS at $49 a month for up
to 25 devices, $588 a year; the pyzk README for port 4370).

- **AC1:** A connector-sourced punch enters the same normalized stream
  (FR-ATT-010) and is source-tagged with the connector identity.
- **AC2:** The port-4370 pull path, where used at all, is isolated behind the
  connector and never a v1 core dependency.

> **Sizing caveat, carried forward. [Killed]** The "85–98% success, ~1 in 7
> devices won't integrate" figure is banned — it was marketing from the vendor
> selling the integration fix, and round one applied a range floor as a mixed-fleet
> average (Source: r2; banned-numbers table, §20.4). **Device integration
> effort is currently unsized and needs a hardware spike** (§20 V-10) before any
> implementation estimate. This is an explicit build dependency, not a resolved cost.

**FR-DEV-006 — Device vendors are partners, not rivals. (P0 posture, informs
integrations)**
**[Verified]** eSSL's own software is time-office and access-control, not an
HRMS, and eSSL markets integration with six named HRMS vendors on its own site
(Source: eSSL's site, re-fetched, r2). The product treats the terminal fleet as an asset to
read from, and the dealer network as a distribution channel — **not** as something
to displace with own hardware (§09.12 non-goals; §20 NG-1).

**FR-DEV-007 — Two-phase device-side template erasure, with a documented exception state. (P0)**
Terminals hold biometric templates in their own flash, so a server-side delete
leaves the template live on every terminal the employee was enrolled on (r4:
eSSL's X990 specification lists 10,000 fingerprint templates in on-device flash).
Erasure — on exit, on consent withdrawal (FR-ATT-017 AC3) or at the end of the
configured retention — therefore runs in two phases over the `DeviceEnrolment`
ledger (§09.1-A). Phase 1 destroys the server-side template key in the biometric
keyspace and queues a delete command for every enrolled device. Phase 2 collects a
per-device acknowledgement through the command channel, retrying offline devices.

- **AC1:** An erasure is `complete` only when every enrolled device has
  acknowledged, or each device that has not is closed through the exception state;
  per-device status is visible to the HR admin.
- **AC2:** **Exception state.** A device that cannot acknowledge (decommissioned,
  lost, wiped, replaced) is closed by an admin attestation recording device, reason,
  actor and date. It shows as `closed-by-attestation`, never as `erased-confirmed`,
  so the compliance view does not stay permanently red and does not overstate
  what happened.
- **AC3:** A device model that does not support a remote delete command is flagged
  at enrolment (FR-DEV-004); its erasures route straight to an on-site deletion task
  plus attestation. Vendor contracts must cover deletion-on-command, because vendor
  documentation is silent on it (r4). No enrolment ticket is ever issued for such a model:
  FR-LEG-017 AC2 limits it to non-biometric modes, so the on-site path exists only for
  templates already in its flash — typically a brownfield fleet's (FR-ATT-035).
- **AC4:** Erasure never touches `Punch` or `FormIXRow` records — they never
  referenced the template (§09.1-A AC3).
- **AC5:** Each `DeviceEnrolment` erasure item follows the transition table below;
  the diagram illustrates it. Retry cadence and ceiling are tenant parameters
  (`erase_retry_interval_h`, `erase_retry_max`); no sourced default exists.

<!-- DIAGRAM: fr-attendance-device-erasure-states -->

| From | Event | Guard | To | Side effect | Who may trigger |
| --- | --- | --- | --- | --- | --- |
| — | Erasure requested (exit, consent withdrawal, retention end) | Enrolment exists on this device | `QUEUED` | Server-side template key destroyed once, for the employee, on the first item (phase 1); delete command queued | System, on the triggering event |
| — | Erasure requested | Device model flagged "no remote delete" (FR-DEV-004) | `ONSITE_TASK` | On-site deletion task raised to the site admin | System |
| `QUEUED` | Device command poll | Device authenticated (FR-DEV-008) | `SENT` | Command id recorded | Device |
| `SENT` | Command result: success | Result matches command id | `ERASED_CONFIRMED` | `ack_at` set; audit entry | Device |
| `SENT` | Command result: failure, or no result within one retry interval | Retries below `erase_retry_max` | `RETRYING` | Retry scheduled | System |
| `RETRYING` | Retry interval elapses | — | `QUEUED` | Command re-queued | System |
| `RETRYING` | Retry ceiling reached | — | `EXHAUSTED` | Alert to HR admin; compliance view shows the item open | System |
| `QUEUED` | Item age exceeds `erase_queued_alert_h` with no command poll from the device | — | `QUEUED` | Alert to HR admin; the compliance view marks the device silent. A device that never polls never reaches `SENT`, so it can never reach `EXHAUSTED` — without this row it would sit unnoticed (FR-DEV-015 AC4) | System |
| `EXHAUSTED` or `ONSITE_TASK` or `QUEUED` | Admin attestation | Reason in {decommissioned, lost, wiped, replaced, deleted on site}; actor and date recorded | `CLOSED_BY_ATTESTATION` | Item closed; never shown as confirmed (AC2) | HR admin (maker); a second admin confirms where the tenant enables maker-checker |
| `CLOSED_BY_ATTESTATION` | The same device serial authenticates again | Serial matches a closed item | `QUEUED` | Item re-opened as `REOPENED`, delete command re-queued, security event logged — a "lost" device that returns may still hold the template | System |

- **AC6:** The erasure request is `complete` (AC1) when every item is
  `ERASED_CONFIRMED` or `CLOSED_BY_ATTESTATION`; a re-opened item makes it
  incomplete again, and the compliance view says why.

**FR-DEV-008 — The device packet contract: the logical interface every push adapter implements. (P0)**
The ADMS/WDMS wire format — endpoint paths, parameter and field names, encodings,
batch sizes — is **not** captured in research; it is taken from vendor documentation
at the §20 V-11 bench test (FR-DEV-001 AC2, §09.14-A16). What this PRD fixes is the
*logical* contract each vendor adapter maps onto, so nothing downstream of the
adapter ever sees a vendor format. §16.4 owns the integration posture; this is the
attendance-side specification of the same contract. The only description of cadence
research found is a competitor blog saying the device posts "every few seconds" (r2) —
a description, not a specification; poll and batch intervals are adapter parameters
set from the bench test.

| Message class | Direction | Logical fields (adapter maps vendor names onto these) | Receiver obligation | On failure |
| --- | --- | --- | --- | --- |
| **Handshake** | Device → receiver | Device serial; per-device secret or token; self-reported make, model, firmware (FR-DEV-004 AC2); device clock | Authenticate serial + secret against the tenant's `Device` registry; record firmware; return the receiver's configuration where the protocol allows | Unknown serial or wrong tenant: reject, log a security event (§16.12), ingest nothing (FR-DEV-001 AC3) |
| **Heartbeat** | Device → receiver | Serial; device clock; buffered-record count where exposed | Update `last_seen`; compute `clock_offset` against NTP-synced server time (FR-DEV-003, EV-062) | Missed heartbeats beyond `device_unseen_alert_h`: alert before lock |
| **Attendance-log upload** | Device → receiver | Per record: device user id; device-local timestamp; direction (IN / OUT, or none → `AUTO`); **verify mode** (card, PIN, fingerprint, face, other); device record sequence where exposed | Durably write each raw record with `payload_hash` **before** acknowledging; dedup (FR-DEV-001 AC4); resolve user (FR-DEV-002); attribute to capture date | Malformed record: kept in a quarantine store with the raw bytes and surfaced as an exception, never silently dropped |
| **Command poll** | Device → receiver | Serial | Return queued commands: user sync (add, update or remove a device user), delete-template (FR-DEV-007), clock set where supported | No commands: empty response |
| **Command result** | Device → receiver | Command id; outcome; device-reported detail | Advance the matching FR-DEV-007 item or user-sync item | Unmatched command id: logged, ignored |
| **Template upload** (only if the model sends one) | Device → receiver | Employee's device user id; template blob | Accept only if the tenant has enabled server-side template sync **and** the employee has a live written `ConsentRecord` and a biometric `AttendanceMethodElection`; write only to the biometric keyspace, never to business tables (Part E-6) | No consent or no election: discard the blob, log `template-without-consent`, open an FR-DEV-007 erasure for that device |

- **AC1 — Map, never synthesise.** Every adapter maps into these classes. A logical
  field the vendor format does not carry is stored as null with a reason code; the
  adapter never invents a value (a missing direction becomes `AUTO`, resolved at
  pairing, FR-ATT-020).
- **AC2 — Acknowledge only what is durable.** An acknowledgement never covers a
  record that is not durably written. Where the vendor protocol acknowledges only
  whole batches, the batch is written atomically before the acknowledgement. With
  device retries this gives at-least-once delivery and, through the dedup key,
  exactly-once attendance rows (FR-DEV-001 AC4).
- **AC3 — Verify mode is evidence, and a consent check.** Verify mode is kept on the
  `Punch` (`verify_mode`), so a card or PIN punch is distinguishable from a biometric
  one in the audit trail and in any inspection. A punch whose verify mode is
  fingerprint or face, for an employee with no live written consent or no biometric
  election, raises a **`biometric-without-consent`** exception: the punch is kept
  and counts for attendance (the punch holds no template or image, and dropping it
  would turn a consent failure into a wage loss), and an FR-DEV-007
  erasure is opened for that device, because the terminal holds a template it
  should not.
- **AC4 — No images, no templates in attendance records.** If an attendance record
  arrives carrying an image or template payload, the adapter strips it before
  persistence and logs the strip. No image column, no image bucket (Part E-6,
  FR-ATT-017 AC4).
- **AC5 — Versioned adapters.** Each `Punch` records the adapter version that
  parsed it, so a firmware change that alters the format is traceable to the
  records it affected, and a re-parse of quarantined records uses a named version.
- **AC6 — Transport.** Per-device secrets are rotatable from the admin console
  without re-enrolling users. Whether each model supports an encrypted transport is
  recorded in the compatibility matrix after V-11 (FR-DEV-004); a tenant using a
  model without it sees that on the device's page.

> **Contract test corpus (runs against every adapter version).**
>
> | # | Input | Expected |
> | --- | --- | --- |
> | T1 | The same attendance-log batch posted twice | One set of `Punch` rows; second post acknowledged, zero new rows |
> | T2 | Upload from an unregistered serial | Rejected; security event; zero rows in any tenant |
> | T3 | Record with no direction field | Stored with direction `AUTO`; paired by FR-ATT-020 |
> | T4 | Fingerprint verify-mode punch for an employee who withdrew consent last week | Punch counted; `biometric-without-consent` exception; erasure item `QUEUED` for that device |
> | T5 | Command result "success" for a delete-template command | Item `ERASED_CONFIRMED`; request complete if it was the last open item |
> | T6 | Attendance record carrying an image payload | Image stripped before write; strip logged; punch stored |
> | T7 | Batch in which one record is malformed | Valid records written and acknowledged per AC2; malformed record quarantined as an exception |
> | T8 | Device clock 47 minutes fast at handshake | `clock_offset` recorded; punches skew-corrected at pairing, raw retained (FR-DEV-003, pathological case 10) |

### 09.3-A The device contract, field by field — device lifecycle, receiver outcomes and clock skew

FR-DEV-008 fixes the six message classes. This subsection fixes each logical field, the
device's own lifecycle, what the receiver answers and how it behaves under load, and how
clock skew is handled — enough for an adapter author to build against and a tester to
write fixtures for, without the vendor wire format, which stays with V-11 (§09.14-A16).
§16.4 carries the integration posture and points here for the contract.

**FR-DEV-009 — The logical field dictionary. (P0)**
Adapters map vendor fields onto these names. A field the vendor does not carry is null
with one of the listed reason codes; the adapter never infers a value (FR-DEV-008 AC1).

| Logical field | Message classes | Type | Required | Validation | Null reason codes |
| --- | --- | --- | --- | --- | --- |
| `tenant_route_token` | All | Opaque string in the tenant-scoped URL | Yes | Resolves to exactly one tenant | — (absent: REJECTED_AUTH) |
| `device_serial` | All | String | Yes | Registered to the route's tenant in PENDING, ACTIVE, STALE or ROTATING (FR-DEV-010) | — |
| `device_credential` | All, by the vendor's mechanism | Secret or token | Yes | Matches the current secret, or the previous one inside a rotation overlap | — |
| `device_clock` | Handshake, heartbeat | Device-local timestamp | No | Parseable; compared with NTP-synced server time (EV-062) | `NOT_EXPOSED` |
| `make`, `model`, `firmware` | Handshake | Strings | No | Looked up in the FR-DEV-004 matrix | `NOT_REPORTED` |
| `buffered_count` | Heartbeat | Integer | No | Non-negative | `NOT_EXPOSED` |
| `device_user_id` | Attendance-log upload, template upload | String | Yes | Resolved through `DeviceUserMap` (FR-DEV-002); an unmapped id is an enrolment exception, never a rejection | — (absent: quarantine) |
| `device_timestamp` | Attendance-log upload | Device-local timestamp | Yes | Parseable; skew-corrected under FR-DEV-012 | — (absent: quarantine) |
| `direction` | Attendance-log upload | IN · OUT | No | Vendor code mapped | `NOT_SENT` (stored as `AUTO`), `UNMAPPED_CODE` |
| `verify_mode` | Attendance-log upload | card · PIN · fingerprint · face · other | No | Vendor code mapped | `NOT_SENT`, `UNMAPPED_CODE` |
| `record_sequence` | Attendance-log upload | Integer | No | Monotonic per device where exposed (FR-DEV-011 AC4) | `NOT_EXPOSED` |
| `command_id`, `command_outcome`, `command_detail` | Command result | Strings | Id and outcome | The id matches a command queued for this serial | — (unmatched: logged and ignored) |
| `template_blob` | Template upload | Opaque bytes | Conditional | FR-ATT-031 AC2 | `STRIPPED` when removed from an attendance record (FR-DEV-008 AC4) |
| `raw_payload_hash` | All | Hash of the raw bytes as received | Computed by the receiver | — | — |

- **AC1:** The raw bytes of every attendance-log upload are kept with the `Punch` rows they
  produced, under the punch retention class, because a disputed punch is settled against
  what the device sent (§14.4.7).
- **AC2:** Adapter families are registered with their evidence status. ADMS/WDMS push for
  eSSL and ZKTeco is corroborated by four independent sources (r2). The REST-webhook
  mapping for Matrix COSEC and Realtime and the on-premise SDK mapping for Anviz and
  Secureye rest on one competitor's blog, and Matrix publishes no API documentation (r2).
  Those families get an adapter only after a per-brand spike (V-10); until then the
  compatibility matrix shows them as unverified.
- **AC3:** Pushing a blocked-worker list to a gate or turnstile is not part of this
  contract. One vendor ecosystem's contract-labour specification includes such a push (r3 —
  that ecosystem's requirement, not a standard). Physical write-back that stops a worker
  entering is adverse action and needs its own review (FR-LEG-016) before it is specified.

**FR-DEV-010 — The device lifecycle. (P0)**
A device is itself a state machine, and its state decides what the receiver accepts.

<!-- DIAGRAM: fr-attendance-device-lifecycle-states -->

| From | Event | Guard | To | Side effect | Who may trigger |
| --- | --- | --- | --- | --- | --- |
| — | Admin registers a serial | The serial is not live in any tenant | PENDING | Secret generated and shown once; endpoint URL issued; site recorded | Site or HR admin |
| PENDING | First authenticated handshake | Serial and secret match | ACTIVE | Firmware recorded; matrix looked up; first clock offset measured | Device |
| PENDING | `device_pending_expiry_h` passes with no handshake | — | EXPIRED | Secret revoked | System |
| ACTIVE | Unseen beyond `device_unseen_alert_h` | — | STALE | Alert to the site admin before lock (FR-DEV-003 AC1) | System |
| STALE | Authenticated heartbeat | — | ACTIVE | Gap recorded; a buffered upload is expected (FR-DEV-001 AC5) | Device |
| ACTIVE | Admin starts secret rotation | — | ROTATING | New secret shown once; old and new accepted for `device_secret_overlap_h` | Admin |
| ROTATING | The device authenticates with the new secret, or the overlap ends | — | ACTIVE | Old secret revoked | Device or system |
| ACTIVE, STALE or ROTATING | The serial appears on another tenant's route, or authentication failures exceed `device_auth_fail_threshold` | — | SUSPENDED | Ingest refused; security event; CERT-In IoT triage (EV-062) | System |
| SUSPENDED | Admin re-verifies the device and rotates the secret | Maker-checker where the tenant enables it | ACTIVE | Audit entry | Admin |
| ACTIVE, STALE or SUSPENDED | Admin decommissions | Every open erasure item for the device is listed and routed to attestation (FR-DEV-007 AC2) | DECOMMISSIONED | `DeviceUserMap` rows closed; secret revoked | Admin |
| DECOMMISSIONED | The same serial authenticates again | — | SUSPENDED | Security event; closed erasure items for the serial reopened (FR-DEV-007 table) | System |

- **AC1:** A SUSPENDED or DECOMMISSIONED device's uploads are refused, but its command
  polls are answered with delete-template and delete-user commands only, so erasure can
  finish on a device that comes back.
- **AC2:** A serial is live in one tenant at a time. Moving a terminal between tenants — a
  dealer re-selling it, say — needs decommissioning in the first tenant. The second
  registration shows, as a warning, that the serial has open erasure items elsewhere,
  without identities.
- **AC3:** Decommissioning never deletes the device's `Punch` rows or raw payloads; they
  keep their own retention class.

**FR-DEV-011 — Receiver outcomes, acknowledgement and backpressure. (P0)**

| Logical outcome | Meaning | Acknowledged to the device? | Consequence |
| --- | --- | --- | --- |
| ACCEPTED | Durably written | Yes | Punches enter pairing |
| DUPLICATE | Already held under the dedup key (FR-DEV-001 AC4) | Yes | No new row |
| QUARANTINED | Raw bytes durably held, record not parseable | Yes — the bytes are safe and the device must not re-flood | Exception to the site admin; re-parse under a named adapter version (FR-DEV-008 AC5) |
| DEFERRED | Load or a dependency outage prevented a durable write | No | The device retries; at-least-once delivery holds; nothing is dropped |
| REJECTED_AUTH | Unknown serial, wrong tenant route or bad credential | No | Security event (§16.12) |
| REJECTED_SUSPENDED | Device SUSPENDED or DECOMMISSIONED | No, for uploads | Command polls still served (FR-DEV-010 AC1) |

- **AC1:** Per-device and per-tenant ingest limits (`ingest_rate_limit.device`,
  `ingest_rate_limit.tenant`) are set from the V-11 bench results and the §17.9 scale
  targets. Exceeding one returns DEFERRED — never a silent drop — and is metered.
- **AC2:** Attribution uses the skew-corrected device timestamp; arrival order is kept for
  audit only. Records for a locked period open a retro run (FR-ATT-001 AC3).
- **AC3:** The ingest endpoint's logs are ICT logs, kept in India for at least 180 days
  (EV-062).
- **AC4:** Where a device exposes `record_sequence`, a gap raises `device-sequence-gap` with
  the missing range, as a warning on the pre-lock dashboard. The adapter asks for a
  re-send only where the vendor protocol allows one (V-11).
- **AC5:** A quarantined record moves QUARANTINED → REPARSED (under a newer adapter
  version) → ACCEPTED, or QUARANTINED → DISCARDED with an admin reason. A discarded
  record's raw bytes stay under the punch retention class, so the decision can be revisited.

**FR-DEV-012 — Clock skew: one decision table. (P0)**
Server time is NTP-synced to NIC/NPL, as the CERT-In Directions require (EV-062); a
terminal's clock is not. The offset measured at each heartbeat (FR-DEV-003) drives the
action. The thresholds are tenant parameters with no sourced default.

| Measured offset | Punch handling | Device action | Exception |
| --- | --- | --- | --- |
| Within `clock_skew_tolerance_s` | Raw and corrected times equal | None | None |
| Beyond tolerance, within `clock_skew_autocorrect_max_s` | Corrected time = device time minus the offset at the nearest earlier heartbeat; raw kept | Clock-set command where the model supports one | `clock-skew-corrected` (information) |
| Beyond `clock_skew_autocorrect_max_s` | Raw kept; the correction is proposed and applied only when an admin confirms the bulk offset (FR-DEV-003 AC2) | Clock-set command where supported | `clock-skew-review` on each affected day — lock-gating until confirmed or waived (FR-ATT-022) |
| The offset jumps between two heartbeats (a clock reset or battery failure) | Punches between the two heartbeats flagged | — | `clock-discontinuity` on the affected days |

> **Worked example — 47 minutes fast.** The heartbeat received at server time 08:50:00
> carries device time 09:37:00, an offset of +47 minutes. A punch the device stamps 09:47 is
> corrected to 09:00, and the raw 09:47 stays on the `Punch`. If the tenant's
> `clock_skew_autocorrect_max_s` is above 2,820 seconds (47 minutes), the correction
> applies and pairing uses 09:00 (pathological case 10). If it is below, the day carries
> `clock-skew-review` until the admin confirms the offset. Either way the terminal gets a
> clock-set command if its model supports one — a fact the FR-DEV-004 matrix records.

> **Contract test corpus, continued (T9–T20).**
>
> | # | Input | Expected |
> | --- | --- | --- |
> | T9 | Upload with the previous secret, inside the rotation overlap | ACCEPTED; after the overlap, REJECTED_AUTH |
> | T10 | Upload from a SUSPENDED device | REJECTED_SUSPENDED; the same device's command poll returns only queued delete commands |
> | T11 | A serial live in tenant A, registered by tenant B | Registration refused (FR-DEV-010 guard) |
> | T12 | Sequence numbers 1001–1010, then 1014 | Records written; `device-sequence-gap` for 1011–1013 |
> | T13 | The punch store is unavailable during an upload | DEFERRED, no acknowledgement; the device's retry is ACCEPTED once; no duplicates |
> | T14 | A buffered upload with punches in a period already locked | Punches written; retro run opened (FR-ATT-001 AC3); the locked period untouched |
> | T15 | The adapter version changes between two batches | Each `Punch` carries the version that parsed it (FR-DEV-008 AC5) |
> | T16 | A template upload while `template_server_sync` is off | Blob discarded and logged; nothing stored |
> | T17 | Offset +2 minutes, then −58 minutes at the next heartbeat | `clock-discontinuity` on the punches between the two heartbeats |
> | T18 | A user-sync command result reporting failure | Election change marked "provisioning pending"; site admin alerted; the worker's other methods keep working |
> | T19 | A command poll from a DECOMMISSIONED serial | Device moves to SUSPENDED; closed erasure items reopen; delete commands served |
> | T20 | A handshake reporting a firmware version the matrix has never seen | ACCEPTED; the matrix gains an "untested firmware" row for the model, shown on the device page |

### 09.3-B Two-phase erasure, end to end — the request, its timing, its commands and its evidence

FR-DEV-007 defines the per-device item machine. This subsection defines the request that
owns the items, when each trigger fires, which command each device receives, the ways a
device can bring a template back, and the evidence a tenant can produce afterwards.

<!-- DIAGRAM: fr-attendance-erasure-sequence -->

**FR-DEV-013 — The erasure request. (P0)**

| Field | Type | Rule |
| --- | --- | --- |
| `request_id` | Identifier | Immutable |
| `employment_id` | Reference | One open request per employment per modality |
| `modalities`, `template_ids` | Sets | The templates in scope |
| `trigger` | exit · consent_withdrawal · method_switch · site_transfer · modality_disabled_at_site · retention_end · unticketed_enrolment · template_without_consent · brownfield_unconsented | Fixes the delay parameter and the command type (FR-DEV-014) |
| `requested_at`, `due_at` | Timestamps | `due_at` = `requested_at` + `template_erasure_delay_days.<trigger>` |
| `phase1_done_at` | Timestamp | Server-side key destroyed (`SERVER_SYNCED`), or marked not applicable (`DEVICE_HELD`) |
| `items[]` | FR-DEV-007 items | One per `DeviceEnrolment` in scope, kiosk installations included (FR-ATT-031) |
| `status` | OPEN · COMPLETE · REOPENED | COMPLETE per FR-DEV-007 AC6 |
| `evidence_pack_ref` | Reference | FR-DEV-016 |

- **AC1:** Before `due_at` a server-held template is SUSPENDED: unreadable to every service
  except the erasure job and excluded from sync-to-device. It is not destroyed early.
- **AC2:** A request cannot be cancelled once created. A worker who changes their mind
  re-enrols through a new consent and ticket after it completes (FR-ATT-028 AC5).

**FR-DEV-014 — Trigger timing and command type. (P0)**
Every trigger's delay is a named parameter, set by the tenant within counsel's bound
(CR-09) and never hard-coded as immediate or as a one-year hold (Part D-9). The product
fixes the event that starts each clock and the command each device receives.

| Trigger | Clock starts at | Delay parameter | Command type | Election effect |
| --- | --- | --- | --- | --- |
| `exit` | The date of leaving recorded in §07 | `template_erasure_delay_days.exit` | delete-user — device user record, card, PIN and templates | Election closed |
| `consent_withdrawal` | Receipt of the written withdrawal (FR-ATT-030) | `.consent_withdrawal` | delete-template; user record and card kept | Modality removed |
| `method_switch` | The election change (FR-ATT-025) | `.method_switch` | delete-template | Modality removed |
| `site_transfer` | Publication of the roster at the new site | `.site_transfer` | delete-template on the old site's devices only | Other sites unaffected |
| `modality_disabled_at_site` | The tenant's disable action (FR-ATT-027 AC3) | `.site_disable` | delete-template for that modality on that site's devices | That site's modality removed |
| `unticketed_enrolment`, `template_without_consent` | Detection (FR-ATT-028 AC1; FR-DEV-008 AC3) | `.no_consent` | delete-template | None — the template should not exist |
| `brownfield_unconsented` | The worker's election, or the end of `brownfield_response_window_days` (FR-ATT-035 AC2) | `.no_consent` | delete-template; on-site task where the model cannot delete on command | None — the product never ticketed the template |
| `retention_end` | End of the tenant's configured template retention | — | delete-template, or delete-user if the worker has left | As configured |

- **AC1:** The command type is chosen per device from `matrix.delete_granularity`. Where a
  model supports only delete-user, a delete-template trigger becomes delete-user followed by
  a re-add of the user without biometrics, queued only after the delete result
  (FR-ATT-025 AC2).
- **AC2:** For `.no_consent`, the configuration screen states that the consent failure
  lasts as long as the template stays on the terminal. Legal owns the bound (CR-09), and
  the tenant cannot set a value above it.
- **AC3:** A trigger that fires while a request is OPEN for the same modality adds its
  devices to that request; it never opens a second one.

**FR-DEV-015 — Devices that come back, get replaced or get restored. (P0)**

- **AC1 — A returning device.** A decommissioned or attested device that authenticates again
  goes to SUSPENDED (FR-DEV-010), and every item closed by attestation for its serial is
  reopened and re-queued. The request shows REOPENED until the device acknowledges.
- **AC2 — Replacement.** A replacement terminal registers as a new serial and the old serial
  is decommissioned. The new device receives templates only through tickets
  (`DEVICE_HELD`), or through sync-to-device for workers whose written consent and election
  are live (`SERVER_SYNCED`). Each sync writes `DeviceEnrolment` rows and access events
  (FR-ATT-032).
- **AC3 — The restore hazard.** Where a model can back up and restore its user store
  (`matrix.user_store_backup_restore`, V-11), restoring a backup taken before an erasure
  could bring an erased template back. The product cannot see the restore, but it sees the
  consequence: a biometric-verify punch from a worker whose request is COMPLETE raises M4
  or M5 and reopens that device's item. Backups held outside the product, by the tenant or
  a dealer, are beyond its reach; the vendor terms (FR-LEG-017) and the tenant
  acknowledgement (FR-LEG-015) cover them.
- **AC4 — Offline for good.** A device that never polls leaves its item QUEUED, which never
  becomes EXHAUSTED. The `erase_queued_alert_h` row of the FR-DEV-007 table makes it
  visible, and only an attestation closes it (FR-DEV-007 AC2).

**FR-DEV-016 — The erasure evidence pack and the compliance view. (P0)**

- **AC1:** For each request the tenant admin can export: the worker (surrogate identifier,
  and name while it is held), the trigger and its time, the consent record reference,
  `due_at`, `phase1_done_at`, and per device the serial, model, command id, time sent,
  result, acknowledgement time or attestation (actor, reason, date), and every reopening.
  The export is rendered from the records, never typed.
- **AC2:** The worker's enrolment metadata view shows the same per-device status in their
  language (FR-ATT-017 AC5), never the template.
- **AC3:** The compliance view lists open requests by age, items QUEUED beyond
  `erase_queued_alert_h`, items EXHAUSTED, attestations in the period and reopenings. It
  reports request-to-complete time at the 50th and 90th percentile per tenant, and the
  share of items closed by attestation; a high attestation share points to fleet hygiene
  rather than a protocol fault, and the view says so.
- **AC4:** No erasure request touches `Punch`, `DayStatus`, OT lines or `FormIXRow`
  (FR-DEV-007 AC4); T-ER-10 asserts it on every release.

> **Worked example — an exit, three terminals, one lost in a storeroom.** The tenant has
> set `template_erasure_delay_days.exit` to zero and `erase_queued_alert_h` to 72 — tenant
> choices for the example, not recommendations. A worker enrolled by fingerprint on
> terminals T1, T2 and T3 (`DEVICE_HELD`) leaves on 30 September 2026. At 18:00 the request
> opens with trigger `exit`. Phase 1 is marked not applicable, because there is no server
> copy, and three items are QUEUED with command type delete-user. T1 polls at 18:01 and
> confirms at 18:02; T2 confirms at 18:07. T3 is unpowered in a storeroom and never polls,
> so its item stays QUEUED. At 18:00 on 3 October the queued-age alert reaches the HR admin.
> On 14 October the admin attests "decommissioned", with the date. The item becomes
> CLOSED_BY_ATTESTATION and the request COMPLETE — shown as two confirmed and one attested,
> never as three confirmed. On 3 February 2027 someone powers T3 on. It authenticates,
> moves to SUSPENDED and raises a security event; the item reopens; the delete-user command
> is served on its first poll even though its uploads are refused; T3 confirms. The
> evidence pack shows both the attestation and the later confirmation. At no point did the
> worker's punches, Form IX rows or pay records change.

> **Test scenarios — erasure.**
>
> | # | Given | When | Then |
> | --- | --- | --- | --- |
> | T-ER-1 | A request with three items: two confirmed, one attested | The compliance view renders | COMPLETE; 2 confirmed, 1 attested; never 3 confirmed |
> | T-ER-2 | `.consent_withdrawal` set to 5 days; template `SERVER_SYNCED` | Withdrawal received on day 0 | Template SUSPENDED from day 0; key destroyed on day 5; device commands queued on the same due time |
> | T-ER-3 | A delete-user-only model | A method switch to card | Delete-user, then re-add with card, in order (FR-DEV-014 AC1) |
> | T-ER-4 | A request OPEN for fingerprint | A second fingerprint trigger fires | Devices added to the open request; no second request |
> | T-ER-5 | A COMPLETE request | A fingerprint punch from the same worker arrives from T2 | M4 or M5 exception; T2's item reopened; request REOPENED |
> | T-ER-6 | A device QUEUED longer than `erase_queued_alert_h` | The alert job runs | Alert to the HR admin; the item stays QUEUED |
> | T-ER-7 | An OPEN request | The worker asks to cancel it | Refused; re-enrolment offered once it completes (FR-DEV-013 AC2) |
> | T-ER-8 | A kiosk holding a cached face reference | Consent is withdrawn | The next roster sync removes the reference; the kiosk's acknowledgement confirms its item |
> | T-ER-9 | A permanent site transfer | The new site's roster is published | Old-site devices get delete-template; new-site devices get nothing until the worker confirms a ticket |
> | T-ER-10 | Any request | The erasure job completes | The worker's Punch, DayStatus, OT and Form IX counts unchanged |

### 09.3-C The command channel — one queue, strict ordering, results that close the loop

FR-DEV-008 names the command poll and the command result. FR-DEV-007, FR-DEV-014,
FR-ATT-025 and FR-DEV-012 each put commands on the queue. This subsection specifies the
queue itself, because the one ordering hazard the section has already found — a re-add
racing a delete and the delete removing the new card (FR-ATT-025 AC2) — is a property of
the queue, not of any single flow, and fixing it once fixes it everywhere.

**FR-DEV-017 — The command record. (P0)**

| Field | Type | Rule |
| --- | --- | --- |
| `command_id` | Identifier | Immutable; the device returns it with the result (FR-DEV-009) |
| `device_serial` | Reference | Exactly one device; a command is never broadcast |
| `command_type` | user_sync_add · user_sync_update · user_remove · template_delete · clock_set | `user_remove` is delete-user and `template_delete` is delete-template (FR-DEV-014). The adapter maps each type to the vendor's command, or the matrix records it unsupported for the model (FR-DEV-004) |
| `device_user_id` | String | Required for every type except `clock_set` |
| `payload_ref` | Reference | The logical payload. User sync: the device user id, the display name where the model shows one, and the card number or PIN where the worker's election uses them. `clock_set`: the offset basis from FR-DEV-012. A template travels only as sync-to-device under `SERVER_SYNCED` (FR-ATT-031) |
| `source_ref` | Reference | The election change, erasure item, provisioning task or skew measurement that created it |
| `depends_on` | Command id | Optional; the command is served only after that one SUCCEEDED. If that one ends FAILED at its ceiling, this one is held, the site admin is alerted, and it is released only when the source item is closed by attestation (FR-DEV-007 AC2) |
| `created_at`, `served_at`, `result_at` | Timestamps | — |
| `state` | QUEUED · SERVED · SUCCEEDED · FAILED · SUPERSEDED · EXPIRED · CANCELLED | FR-DEV-019 |
| `attempt` | Integer | Incremented each time the command is served |

- **AC1:** Payload values — card numbers and PINs — never appear in a log, the audit trail
  or an export. The audit entry records that a value was set, by which command and for
  which source, never the value (FR-ATT-025 AC3).
- **AC2:** A user sync never sets or changes a device-administrator privilege. Where a
  model carries such a flag, the adapter sends the ordinary-user value, mapped at V-11;
  device administration stays with the site admin at the device, outside the product.
- **AC3:** A command type the model does not support is refused at queue time, citing the
  matrix row, so the calling flow takes its fallback — delete-user then re-add
  (FR-ATT-025 AC2), or an on-site task (FR-DEV-007 AC3) — instead of queuing a command that
  can never succeed.

**FR-DEV-018 — Ordering rules. (P0)**

| # | Rule | Why |
| --- | --- | --- |
| O1 | Per (device, device user id), commands are served in creation order, and a command is served only when every earlier one for that user is SUCCEEDED, SUPERSEDED, EXPIRED, CANCELLED or FAILED at its ceiling — so at most one is ever SERVED without a result | The re-add-after-delete race (FR-ATT-025 AC2) cannot occur in any flow, including while a delete waits to be retried |
| O2 | `user_remove` and `template_delete` are never superseded, cancelled or expired | An erasure outlives every other change; a device that returns after months still receives it (FR-DEV-010 AC1) |
| O3 | Of two QUEUED `user_sync_update` commands for one device user, only the later is served; the earlier becomes SUPERSEDED. Nothing is superseded across a delete | Only the record's current state reaches the device |
| O4 | At most one `clock_set` is QUEUED per device; a newer skew measurement replaces it; unserved after `clock_set_command_ttl_min` it EXPIRES | A stale correction moves the clock the wrong way (FR-DEV-012) |
| O5 | For a SUSPENDED or DECOMMISSIONED device only delete types are served; others stay QUEUED, and decommissioning CANCELs them | FR-DEV-010 AC1 |
| O6 | The number served per poll is the adapter's `command_batch_max`, set from V-11; O1 holds within and across batches | The vendor protocol, not this PRD, fixes batch size (FR-DEV-008) |
| O7 | A result for a command never served to that serial is logged and ignored | FR-DEV-008 |

**FR-DEV-019 — The command state machine. (P0)**
The erasure item of FR-DEV-007 is a view over its delete commands: an item is SENT while
its command is SERVED, RETRYING while it is FAILED below the ceiling, and
`ERASED_CONFIRMED` when it has SUCCEEDED.

<!-- DIAGRAM: fr-attendance-command-queue-states -->

| From | Event | Guard | To | Side effect | Who may trigger |
| --- | --- | --- | --- | --- | --- |
| — | A flow creates a command | Type supported by the model (FR-DEV-017 AC3) | QUEUED | Source linked | System |
| QUEUED | Device command poll | O1 and O5 allow it | SERVED | `served_at` set; `attempt` incremented | Device |
| SERVED | Result: success | Id and serial match | SUCCEEDED | Source advanced — erasure item confirmed, provisioning complete, clock set | Device |
| SERVED | Result: failure | Id and serial match | FAILED | Source told | Device |
| SERVED | No result within the source's timeout — one `erase_retry_interval_h` for a delete (FR-DEV-007), `command_result_timeout_s` otherwise | — | FAILED | As a failure | System |
| FAILED | The source's retry interval elapses | Below the source's ceiling — `erase_retry_max` for a delete, `user_sync_retry_max` for a sync | QUEUED | Same `command_id`, next attempt | System |
| FAILED, or QUEUED for a re-attempt | A late success for an earlier attempt arrives | Id and serial match | SUCCEEDED | Any queued re-attempt removed; the source advanced once | Device |
| QUEUED | A later `user_sync_update` for the same device user | No delete between them (O3) | SUPERSEDED | — | System |
| QUEUED | `clock_set` unserved past `clock_set_command_ttl_min`, or replaced (O4) | `clock_set` only | EXPIRED | — | System |
| QUEUED | The device is decommissioned | Not a delete type (O2) | CANCELLED | — | Admin |

- **AC1:** Retry ceilings belong to the source, not the queue: a delete that reaches
  `erase_retry_max` leaves its erasure item `EXHAUSTED` (FR-DEV-007), and a user sync that
  reaches `user_sync_retry_max` marks the election change "provisioning pending" and
  alerts the site admin (T18). Neither ever blocks a punch.
- **AC2:** The queue is tenant-scoped and each device's queue is readable on its device
  page, payload values masked (FR-DEV-017 AC1).
- **AC3:** Queue writes are durable before the flow that created them reports success, in
  the same transaction as the election change or erasure request (FR-ATT-025 AC1), so a
  crash cannot leave an election without its provisioning command or a request without
  its deletes.

> **Contract test corpus, continued (T21–T29).**
>
> | # | Input | Expected |
> | --- | --- | --- |
> | T21 | A `user_remove` then a `user_sync_add` for the same user; `command_batch_max` of 10 | First poll serves only the remove; the add is served on the poll after the remove's result (O1) |
> | T22 | Two `user_sync_update` commands for one user (card changed twice) | Only the second is served; the first SUPERSEDED (O3) |
> | T23 | Add, remove, add for one user, all QUEUED | None superseded; served one at a time in that order |
> | T24 | A `clock_set` for +47 minutes queued; the next heartbeat measures +46 | The first replaced; one `clock_set` served (O4) |
> | T25 | A SUSPENDED device polls with a `template_delete` and a `user_sync_add` queued | Only the delete is served (O5) |
> | T26 | A result quoting a command id served to a different serial | Logged and ignored; no state changes (O7) |
> | T27 | A card-provisioning sync on a model whose matrix records no card support, at a site whose capability lists card | Refused at queue time; the site's `SiteMethodCapability` flagged as inconsistent with the matrix; the worker offered the site's other phone-free methods (EL-1) |
> | T28 | A delete times out, is re-queued, then the first attempt's success arrives | SUCCEEDED; the re-attempt removed; the erasure item confirmed once |
> | T29 | An audit query on a PIN provisioning | Command id, source and "PIN set"; no PIN value anywhere in the result |

---

### 09.4 Shifts, rosters & scheduling

Frontline pay correctness is impossible without knowing *which shift* a worker was
on: night differentials, weekly-off placement, and — critically — the daily/weekly
boundary that defines overtime all depend on it.

<!-- DIAGRAM: roster-to-exception-flow -->

**FR-SHF-001 — Shift definition with tolerances and breaks. (P0)**
A shift is defined by start/end, break windows (paid/unpaid), grace periods
(late-in / early-out tolerance), a **spread-over** limit, half-day and short-leave
rules, and a night flag. Shifts are effective-dated and versioned.

- **AC1:** A worker punching within grace is on-time; beyond grace is late by
  policy (deduction / half-day / flagged), configurable, never hard-coded.
- **AC2:** Unpaid break duration is subtracted from worked hours; paid break is
  not. Break handling is auditable in the day's worked-hour computation.
- **AC3:** **[Verified]** Normal hours depend on the wage period: **8 hours a day**
  where the wage period is daily, **48 hours a week** otherwise — not a universal
  8-and-48 pair (Code on Wages (Central) Rules 2026 r.5, per the PRS review, r3;
  re-read r.5 in G.S.R. 343(E) before customer use). **[Reversed]** Earlier drafts
  marked spread-over as statutorily capped and [Verified]; the Wages Rules defer
  spread-over and rest intervals to the OSH Code and its rules, which have not been
  read for these limits (r3). **[Hypothesis]** the spread-over ceiling is parameter
  `spread_over_cap_min`, effective-dated per (state, sphere). **[Reversed]** Earlier
  drafts seeded it with legacy Factories Act figures; those were never captured in
  research, so no value ships — the parameter stays empty (and the spread-over test
  inactive) for a jurisdiction until the OSH Code/Rules text or the state rule is
  read and published through the §22 pipeline (§20 V-21, §09.14-A1).
- **AC4:** **[Hypothesis]** A maximum unbroken work stretch and a minimum rest
  interval exist in the OSH regime but have not been read (r3). Parameters
  `max_continuous_work_min` and `min_rest_interval_min` are effective-dated per
  (state, sphere) and ship empty, like `spread_over_cap_min`. Once populated, a
  roster or punch sequence that breaches them raises a **warning-class** exception —
  shown on the pre-lock dashboard, never lock-gating (§06.12 R17).

> **Worked example — spread-over vs worked hours.** A retail worker on a
> split-shift roster punches IN 10:00, OUT 14:00 (store lull), IN 17:00, OUT 21:30.
> **Worked hours = 8.5 h** (4.0 + 4.5). **Spread-over = 11.5 h** (10:00→21:30). If
> the state's published `spread_over_cap_min` is below 690 minutes (an illustrative
> condition, not a sourced value), this roster *exceeds spread-over even
> though worked hours are within normal hours* — the engine must flag the
> spread-over breach independently of the OT computation, because they are
> different tests against different limits. While the ceiling is [Hypothesis], the
> flag is a warning, not a block (AC3). The 3-hour unpaid gap is subtracted from
> worked hours (FR-SHF-001 AC2) but still counts toward spread-over.

**FR-SHF-002 — Rostering / shift scheduling. (P0 for frontline, P1 general)**
Managers build rosters assigning workers to shifts across days/weeks, per site,
with pattern support (rotating 6-day, 3-shift rotation, 4-on/2-off), copy-forward,
and bulk edit.

- **AC1:** A roster flags any worker without a **weekly rest day** in a week or
  rostered for more than **ten consecutive days** without a full rest day.
  **[Verified]** At least one weekly rest day (normally Sunday in a six-day week, the
  employer free to fix another day); no more than ten consecutive days without a
  full rest day; and work on a rest day requires **both** a substituted rest day
  **and** overtime wages (Code on Wages (Central) Rules 2026 r.6, per the PRS
  review, r3; re-read r.6 in G.S.R. 343(E) before customer use). State-sphere
  variations are **[Hypothesis]**; validate through the §09.14-A1 state-rules dataset.
- **AC2:** Publishing a roster notifies affected workers (in-app / WhatsApp,
  worker-initiated-aware per FR-ATT-015) in their language (§09.9).
- **AC3:** Roster + actual punches feed the exception engine: a worker who punches
  on a rostered weekly rest day generates **both** a substituted-rest-day obligation
  **and** an OT-wage line (AC1) — not an either/or (§09.5, §09.6, FR-OT-003); the
  obligation and the OT reckoning are specified in FR-OT-009 and FR-OT-006 AC3.

**FR-SHF-003 — Auto shift detection. (P1)**
Where a worker is eligible for multiple shifts, the engine can infer the actual
shift from the first punch of the day against candidate shift windows.

- **AC1:** Auto-detection is deterministic (nearest-window rule), logged, and
  overridable by the supervisor; it is **not** an LLM decision.

**FR-SHF-004 — Holiday and weekly-off calendars, national/festival/state. (P0)**
Per-establishment calendars combine national holidays, state festival holidays
(National & Festival Holidays Acts, state-specific), and optional/floating
holidays. **[Hypothesis]** — downgraded from the [Verified] earlier drafts gave it:
the claim that three national holidays (Republic Day, Independence Day, Gandhi
Jayanti) are near-universally mandatory under the state N&F Holidays Acts was not
re-captured in research, so it is carried, not verified. The count and list of
national and festival holidays per state per year, and any substitution rule, are
effective-dated, gazette-sourced data — kill/validate via the annual
gazette-sourced calendar refresh (§09.14-A6, the §22 compliance data pipeline);
do not ship a static national holiday list.

- **AC1:** A punch on a holiday classifies the day as holiday-worked → comp-off/OT
  candidate per policy.
- **AC2:** Floating/optional holidays are worker-selectable up to a configured
  count per year, with balance tracking.

**FR-SHF-005 — Night-shift rostering with the women-at-night consent gate. (P0
for frontline, where women work night shifts)**
The OSH&WC Code **permits women to be employed in all establishments including at
night** (before 06:00 or after 19:00), a change from the prior blanket bar — but only with
the woman's **consent** and subject to notified safety, transport and dignity
conditions. **[Verified]** the Code lifts the blanket prohibition and makes
night-work conditional on consent and safeguards (Source: OSH Code s.43, read via
the MoLE Compliance Handbook, r3). **[Hypothesis]** the exact safeguard checklist
(minimum group size, employer-provided transport, on-site facilities) is set by
*state* rules and must be effective-dated per state; kill/validate via the
§09.14-A1 state dataset.

- **AC1:** Rostering a worker flagged female into a night window requires a
  recorded, revocable consent artefact effective for the period; a night roster
  without valid consent is blocked, not merely warned.
- **AC2:** Night-shift assignment carries the safeguard-checklist state (transport
  arranged, minimum-group met) as roster metadata so an inspection query can be
  answered from the register, not reconstructed.
- **AC3:** Consent is time-bounded and withdrawable; withdrawal takes effect
  forward from its effective date and is audited (never retro-alters past rostered
  nights already worked).

---

### 09.5 The attendance processing engine — punch → worked hours → status

<!-- DIAGRAM: punch-pairing-state-machine -->

**FR-ATT-020 — Deterministic punch pairing. (P0)**
The engine pairs raw punches into work sessions, infers `AUTO` direction, handles
odd punch counts (missing in/out), overnight shifts crossing midnight, and
multiple in/out pairs (break punching), producing total worked hours per shift-day.

- **AC1:** An overnight shift (e.g. 22:00–06:00) attributes worked hours to the
  correct pay date per the shift's anchoring rule, not split arbitrarily at
  midnight.
- **AC2:** An odd/missing punch produces a **defined exception** (`missing-out`,
  `missing-in`) routed to regularization (§09.8) — never a silent zero and never a
  silent full day.
- **AC3:** Multiple break punches sum correctly against paid/unpaid break rules
  (FR-SHF-001).
- **AC4:** The pairing algorithm is deterministic and unit-tested against a fixed
  corpus of pathological punch sequences; identical input → identical output.

> **The pathological-sequence corpus (AC4).** These are the cases every Indian
> attendance engine gets wrong at least once; each must have a *defined,
> deterministic* outcome, and none may silently produce a full or zero day. Shift
> = general 09:00–18:00, 1 h unpaid lunch, grace 10 min, unless noted.
>
> | # | Raw punches (device-local) | Correct outcome |
> | --- | --- | --- |
> | 1 | IN 09:05 · OUT 18:02 | Present, 8.0 h (grace absorbs 09:05; 1 h lunch deducted) |
> | 2 | IN 09:05 (no OUT) | `missing-out` exception → regularization; **never** auto-full-day, **never** zero |
> | 3 | OUT 18:00 (no IN) | `missing-in` exception → regularization |
> | 4 | IN 09:00 · IN 09:01 · OUT 18:00 | The two INs carry different times, so `payload_hash` does not de-dup them (it catches exact re-sends only). Within `punch_debounce_s` the second IN is collapsed into the first and kept flagged `debounced`; paired 09:00–18:00. Outside it, rule D3 of FR-ATT-037 applies |
> | 5 | IN 13:30 · OUT 22:15, night shift 13:30–22:00 anchored to *start* date | 8.0 h to the 13:30 date; 15 min post-shift → OT candidate |
> | 6 | IN 22:00 · OUT 06:15 (crosses midnight) | Worked hours anchored to shift-start pay date (AC1); not split at 00:00 |
> | 7 | IN 09:00 · OUT 12:00 · IN 12:20 · OUT 18:00 | Two sessions; break 12:00–12:20 (20 min) < 60 min lunch rule → worked minutes per the shift's `break_deduction_mode` (FR-ATT-038; worked in rupees there) |
> | 8 | AUTO 09:03 · AUTO 13:00 · AUTO 13:40 · AUTO 18:05 (device gives no direction) | Ordered by time, alternated IN/OUT/IN/OUT; direction inferred at pairing |
> | 9 | IN 08:40 (before shift) · OUT 18:50 | Early-in not counted unless pre-approved OT; late-out → OT candidate per policy |
> | 10 | IN 09:00 device clock +47 min fast (FR-DEV-003) | Skew-corrected before pairing; corrected time used, raw retained |

**FR-ATT-021 — Day-status derivation and LOP. (P0)**
From worked hours, shift, leave ledger, roster and calendar, the engine derives
the day status and computes **loss-of-pay (LOP) days** and **paid days** for the
period — the figures payroll reconciles every challan against.

- **AC1:** Half-day, full-day-present, absent, on-leave (paid), on-leave (LOP),
  weekly-off, holiday, and on-duty (OD) are each derivable and mutually consistent
  for every calendar day of the period.
- **AC2:** Paid-days + LOP-days + weekly-offs + holidays reconcile exactly to the
  calendar days of the period for every employee (no gaps, no double counts) — a
  hard invariant checked before payroll lock.
- **AC3:** Sandwich-leave / prefix-suffix rules (whether a weekly-off/holiday
  bracketed by absence counts as LOP) are policy-configurable per tenant and
  clearly labelled where applied. **[Hypothesis]** sandwich rules have no single
  statutory basis and are contract/policy driven; default to *not* sandwiching
  unless the tenant opts in.

> **Worked example — the paid-days invariant (AC2) and why sandwich policy moves
> money.** September 2026 has 30 calendar days. A worker's month: 22 present, 4
> weekly-offs (Sundays), 1 festival holiday (from the state calendar), 1 EL (paid), and
> is **absent without leave** on Sat 12th and Mon 14th, with Sun 13th being a
> weekly-off in between.
>
> | Bucket | Sandwich OFF (default) | Sandwich ON (tenant opt-in) |
> | --- | --- | --- |
> | Present | 22 | 22 |
> | Paid leave (EL) | 1 | 1 |
> | Weekly-off | 4 | 3 |
> | Holiday | 1 | 1 |
> | LOP (unpaid) | 2 (12th, 14th) | 3 (12th, **13th**, 14th) |
> | **Total** | **30** ✓ | **30** ✓ |
>
> Both configurations satisfy the hard invariant (`paid + LOP + off + holiday =
> 30`), but the sandwiched Sunday moves the paid-days count from 28 to 27 — a full
> day's pay, and a different EPF/ESI/PT wage base for the month. This is exactly
> why sandwich behaviour is (a) explicit config, (b) labelled where applied, and
> (c) defaulted OFF absent a statutory mandate: it is a pay decision dressed as a
> calendar rule, and it must reconcile identically either way.

**FR-ATT-022 — Exception dashboard and pre-lock reconciliation. (P0)**
Before a period locks, admins see every unresolved exception (missing punches,
unmapped device users, low-confidence geo, offline devices, un-actioned
regularizations) and cannot lock until each is resolved or explicitly waived with
a reason.

- **AC1:** Locking with open exceptions is blocked; a forced lock requires a
  logged reason and lists exactly which employees/days were affected.
- **AC2:** The dashboard is filterable by site, supervisor, exception type, and
  age.
- **AC3:** Exceptions raised by a **[Hypothesis]** rule — the quarterly OT ceiling,
  spread-over, rest interval — are **warning-class**: listed, never lock-gating
  (§06.12 R17).

### 09.5-A Pairing, specified — windows, direction, sessions and breaks

FR-ATT-020 fixes what pairing must achieve, and the corpus fixes ten outcomes. This
subsection fixes the algorithm, so that two engineers implementing it produce the same
sessions from the same punches, and it names every tolerance as a parameter. Research
supplies none of the values. One published contract-labour requirements document — for
one device ecosystem, not a standard — uses a 05:00-to-05:00 working-day cut-off, so that
night shifts do not roll at midnight, and grace of plus or minus 15 minutes (r3). Those are
that ecosystem's examples; neither ships here as a default.

<!-- DIAGRAM: fr-attendance-pairing-pipeline -->

**FR-ATT-037 — The pairing algorithm. (P0)**
Pairing runs per employment over one window at a time. It is a pure function of the
punches, the roster, the shift definitions and the rule version (CC-1).

1. **Window.** A rostered day's window runs from the shift start less
   `early_in_window_min` to the shift end plus `late_out_window_min`. An unrostered day's
   runs from `working_day_cutoff_time` on that date to the same time the next day.
   Consecutive rostered shifts on one day form one window, first start to last end.
2. **Normalise.** Take the employment's punches (FR-DEV-002) whose skew-corrected time
   (FR-DEV-012) falls in the window, less exact re-sends (same `payload_hash`, FR-DEV-001
   AC4). Order them by corrected time, and break ties by source in a fixed order —
   terminal, kiosk, app, web, supervisor-attested, import — so that order never depends
   on arrival.
3. **Debounce.** A punch within `punch_debounce_s` of the previous kept punch, in the same
   direction or `AUTO`, is collapsed into it and kept, flagged `debounced`.
4. **Direction.** Apply the direction table below.
5. **Sessions.** Pair each IN with the next OUT. A session longer than `max_session_min`
   — usually a missed OUT and IN — is flagged `session-too-long` and routed to
   regularization. It is never split automatically.
6. **Anchor.** A session belongs to the date of its window: the shift-start date for a
   rostered window, overnight shifts included (FR-ATT-020 AC1), and the date on which an
   unrostered window opens. A session that runs from one rostered shift into the next
   consecutive one is split at the second shift's start, so each shift owns its minutes.
7. **Breaks.** Apply the shift's `break_deduction_mode` (FR-ATT-038) to produce worked
   minutes.
8. **Emit.** Write `WorkSession` rows (§09.1-A) and the exceptions below. `DayStatus` and
   the Form IX cell derive from the sessions (FR-ATT-021, FR-ATT-033).

A punch that falls in no window of the day is attributed to nothing. It raises
`off-window-punch`, is listed, and counts only if a regularization places it.

| # | Punch sequence after debounce | Result |
| --- | --- | --- |
| D1 | Explicit directions alternating IN, OUT | Paired as given |
| D2 | All `AUTO` | The first is IN, then alternate (corpus 8) |
| D3 | An explicit IN after an open IN, beyond the debounce | The earlier IN opens a session with no OUT (`missing-out`); the later IN opens a new session |
| D4 | An explicit OUT with no open session | `missing-in` for that OUT; it closes nothing |
| D5 | `AUTO` mixed with explicit punches | Explicit punches keep their direction; each `AUTO` punch takes the direction opposite to the punch immediately before it as resolved, or IN if it is first. Any conflict that creates falls to D3 or D4 |
| D6 | An odd count of `AUTO` punches | The last is an open IN, so `missing-out` (corpus 2) — never an assumed OUT |

| Exception | Raised when | Class | Resolution |
| --- | --- | --- | --- |
| `missing-out`, `missing-in` | D3, D4, D6 | Lock-gating: the cell is UNRESOLVED (FR-ATT-033) | Regularization, or a waiver with reason (FR-ATT-022) |
| `session-too-long` | Step 5 | Lock-gating | A regularization confirms or corrects the session |
| `off-window-punch` | A punch in no window | Warning | A regularization places it; otherwise it stays unattributed and appears in the provenance annex |
| `debounced` | Step 3 | Information | None; shown in the provenance annex (FR-STAT-003) |

- **AC1:** The window, debounce and session-length parameters are required tenant
  configuration per site or shift, effective-dated, with no shipped value. A site missing
  one gets a setup task on the pre-lock dashboard; its punches are ingested and held
  unpaired until the value is set — shown, never dropped, and re-paired when it is.
- **AC2:** The same punches produce the same sessions whatever their arrival order or
  batch boundaries. Tested by replaying the corpus with arrival order shuffled.
- **AC3:** A late punch (FR-DEV-001 AC5) re-pairs its own window, and the consecutive
  window where step 6 could move minutes — nothing else.
- **AC4:** An approved regularization adds a punch or replaces a pair; pairing re-runs for
  that window, and the resulting session carries the regularization id (FR-REG-001 AC1).

**FR-ATT-038 — Worked minutes from sessions: the break rule is explicit, because it moves money. (P0)**
`break_deduction_mode` is set on each shift definition (FR-SHF-001) and has no default.
Paid breaks are never deducted, in any mode (FR-SHF-001 AC2).

| Mode | Worked minutes |
| --- | --- |
| `scheduled` | The span from first IN to last OUT, less the shift's scheduled unpaid break, whatever gaps were punched |
| `punched` | The sum of session minutes; the punched gaps are the breaks |
| `greater_of` | The span, less the larger of the scheduled unpaid break and the total punched unpaid gap |

- **AC1:** The mode applied is stamped on each day's `DayStatus` and shown wherever worked
  hours reach the worker (FR-DSK-003), so a worker can see why identical punches at two
  sites pay differently.
- **AC2:** A change of mode is effective-dated and never re-reckons a locked period
  (FR-OT-004 AC1).
- **AC3:** A nursing break is never deducted in any mode and never read as a gap
  (FR-LV-003 AC4).
- **AC4:** Under `punched`, a day with no break punch deducts nothing and, once
  `min_rest_interval_min` is populated, raises FR-SHF-001 AC4's warning. Under `scheduled`,
  a day with no gap still deducts the break. Both are labelled configuration, and neither
  is an exception.
- **AC5:** The mode changes worked minutes, OT and Form IX column (9). It never changes a
  time in column (7), which always shows what was punched (FR-ATT-033).

> **Worked example — corpus case 7 in rupees.** Shift 09:00–18:00 with a scheduled unpaid
> lunch of 60 minutes. Punches 09:00–12:00 and 12:20–18:00: a span of 540 minutes and a
> punched gap of 20.
>
> | Mode | Worked minutes a day | Six such days | Weekly OT on a monthly wage period (48-hour test) |
> | --- | --- | --- | --- |
> | `scheduled` | 540 − 60 = 480 | 2,880 = 48 h | 0 |
> | `punched` | 180 + 340 = 520 | 3,120 = 52 h | 4 h |
> | `greater_of` | 540 − max(60, 20) = 480 | 2,880 = 48 h | 0 |
>
> Take an OT base of ₹15,000 a month — the figure EV-040 uses for EPS membership, borrowed
> only to make the arithmetic concrete, and supplied by the wage-base service, never
> computed here (FR-OT-001 AC4). The Wages Rules' conversions (daily × 26 for monthly,
> daily ÷ 8 for hourly, r3) give ₹15,000 ÷ 26 ÷ 8 = ₹72.1154 an hour, so the OT rate at
> twice is ₹144.2308. Under `punched` the 4 hours pay ₹576.92 for the week, before §08
> FR-PAY-209's rounding — ₹2,307.69 over four such weeks — and nothing under the
> other two modes. The daily test on the same week also gives 40 minutes × 6 = 4 hours,
> so a tenant's greater-of OT basis changes nothing here (FR-OT-001 AC5). The punches in
> column (7) are identical in all three rows (AC5).

> **Test scenarios — pairing.**
>
> | # | Given | When | Then |
> | --- | --- | --- | --- |
> | T-PR-1 | The ten-case corpus | Replayed with arrival order shuffled | Identical sessions and worked minutes (FR-ATT-037 AC2) |
> | T-PR-2 | Explicit IN 09:00, `AUTO` 13:00, `AUTO` 13:40, explicit OUT 18:05 | Pairing runs | Sessions 09:00–13:00 and 13:40–18:05 (D5) |
> | T-PR-3 | Consecutive shifts 06:00–14:00 and 14:00–22:00; IN 06:00, OUT 22:00 | Pairing runs | One window; the session split at 14:00 into 480 minutes per shift |
> | T-PR-4 | A punch at 03:00 on a day rostered 09:00–18:00, outside that day's window and the previous day's | Pairing runs | `off-window-punch` warning; not counted |
> | T-PR-5 | An unrostered worker: IN 06:00, OUT 04:00 the next day (1,320 minutes), with `max_session_min` set below that for the test | Pairing runs | `session-too-long`, lock-gating; never split |
> | T-PR-6 | Corpus case 7 | Run under each mode | 480, 520 and 480 minutes (FR-ATT-038) |
> | T-PR-7 | An unrostered worker; `working_day_cutoff_time` set to 05:00 for the test | IN 23:00, OUT 04:30 | One session anchored to the first date |
> | T-PR-8 | A buffered punch arrives two days late in a window with a consecutive neighbour | Ingest completes | Both windows re-paired; nothing else recomputed (FR-ATT-037 AC3) |

---

### 09.6 Overtime, per the notified Rules

Overtime is where attendance meets the wage engine most sharply. The multiplier and
the normal hours are verified; the quarterly ceiling is not.

**FR-OT-001 — Overtime computed at the statutory multiplier; quarterly ceiling warn-only. (P0)**
**[Verified]** Overtime is paid at **not less than twice the normal rate of
wages** — s.14's own words, "for every hour or for part of an hour so worked in
excess" (Code on Wages s.14, read verbatim, r1; MoLE Compliance Handbook, r3) — against normal hours of
**8 a day where the wage period is daily and 48 a week otherwise** (Wages (Central)
Rules 2026 r.5, per the PRS review, r3). **[Reversed]** Earlier drafts marked a
ceiling of 144 overtime hours per quarter as Verified and built blocking acceptance
criteria on it. It is reported only by secondary summaries of the Central Rules
(r2), has never been confirmed against gazette text, and may sit in the OSH rules
rather than the Wages rules (r3 critic). It is now **[Hypothesis]** (K-04): the
product may warn on it and must never block (§06.12 R17); the figure is routed to
§20 V-17 (§09.14-A13).

- **AC1:** Hours beyond normal hours accrue as OT at 2×. The statutory test follows
  the employee's wage period (daily → per day; otherwise → per week); a tenant basis
  (daily, weekly, or the greater-of) may be more generous, never less, and never
  double-counts the same hour.
- **AC2:** The quarterly ceiling is parameter `ot_quarterly_ceiling_hours`
  (hypothesised value 144, from secondary summaries of the Central Rules, r2; K-04),
  effective-dated per jurisdiction. It is the one [Hypothesis] statutory value this
  section seeds rather than leaves empty (CC-9), because it can only ever warn; every
  warning it raises carries the [Hypothesis] label, and V-17 either deletes the value
  or confirms it, never turning it into a block. The engine
  tracks OT per worker per quarter and raises an **advisory** warning at
  configurable thresholds (FR-OT-006, FR-OT-007). It never blocks a punch, a roster publication, an OT
  approval, a pay run or a filing, and it never suppresses OT wages for hours
  actually worked.
- **AC3:** OT hours are exported to payroll **split by multiplier band** as a
  distinct, labelled component, never folded into another head. OT is an excluded
  head under s.2(y) — outside "wages", but counted in the 50% test, so a heavy-OT
  month can trigger or raise the add-back (§06.10 counter-case; Code on Wages
  s.2(y) / CoSS s.2(88)).
- **AC4:** The "normal rate of wages" used for the 2× is the statutory OT base,
  which may differ from the add-back base and the equal-pay base — the engine
  requests the correct base from the multi-base wage service (§06.10, §08) and does
  not compute its own. **[Verified]** at least four concurrent wage bases per
  employee per period exist (§06.10; Code on Wages s.2(y) / CoSS s.2(88)).
- **AC5:** The **daily vs weekly OT tests do not double-count the same hour.** The
  engine computes OT once under the tenant's configured basis and, where "greater-of"
  is set, takes the larger of the two aggregations for the period — never their sum.

> **Worked example — OT in rupees, and the no-double-count rule.** A press-shop
> operator on a monthly wage period (statutory test: weekly, AC1; the tenant has
> configured greater-of): monthly statutory OT base (normal rate of wages, per §06) = ₹26,000
> (illustrative) on the Wages Rules' daily × 26 and daily ÷ 8 conversions (r1, r3)
> → normal hourly rate = ₹125.00 (₹26,000 ÷ 26 ÷ 8). OT
> rate at 2× = **₹250.00/h**.
> - **Week under test:** Mon–Sat, 6 days, punches yield 9 h, 9 h, 10 h, 8 h, 8 h,
>   9 h = **53 worked hours**.
> - **Daily basis:** hours over 8/day = 1 + 1 + 2 + 0 + 0 + 1 = **5 OT hours**.
> - **Weekly basis:** hours over 48/week = 53 − 48 = **5 OT hours**.
> - **Greater-of:** max(5, 5) = **5 OT hours** — *not* 10. Paying both aggregations
>   would double-count the same overtime hours; AC5 forbids it. OT pay = 5 × ₹250 =
>   **₹1,250**, handed to payroll as a distinct labelled component that counts as
>   an excluded head in the s.2(y) 50% test (AC3).
> - **Ceiling check (advisory):** those 5 h are added to the worker's quarterly
>   total and compared with `ot_quarterly_ceiling_hours` (hypothesised 144, K-04).
>   At, say, 120 h already booked, adding 5 crosses a configured warning threshold
>   and warns the site admin before the next roster is published. It is a warning
>   only: nothing is blocked, and every hour worked is paid (AC2, §06.12 R17).

**FR-OT-002 — Overtime requires eligibility and (optionally) pre-approval. (P0)**
Not every worker is within the statutory OT provision (its scope is set by the Code
on Wages, §06), and many tenants require OT to be pre-authorized to control cost.

- **AC1:** OT eligibility is an employee-master attribute; ineligible workers'
  excess hours do not generate OT pay (they may still generate comp-off per policy).
- **AC2:** Where pre-approval is enabled, unapproved excess hours are held as
  `OT-pending` until decided (§09.8 workflow), and every pending item is decided
  before lock (FR-ATT-022). A rejection carries a recorded reason; hours the record
  shows as worked are never dropped from OT pay by default (FR-OT-001 AC2).

**FR-OT-003 — Comp-off credit, never a substitute for statutory OT wages. (P1)**
**[Reversed]** Earlier drafts let comp-off replace cash OT and made the two
mutually exclusive. For an employee within the Code on Wages OT provision, hours
beyond normal hours earn OT wages at not less than twice the rate (s.14), and work
on a weekly rest day earns **both** a substituted rest day **and** OT wages (FR-SHF-002
AC1). Comp-off therefore applies only (a) to employees outside the OT provision
(FR-OT-002 AC1), (b) as a tenant benefit on top of OT pay, or (c) to holiday work
where the state holiday rule allows a substitute day **[Hypothesis — per state]**.

- **AC1:** Comp-off is credited to the leave ledger (§09.7) with an expiry (tenant
  policy parameter `compoff_expiry_days`; a policy term, not a statutory value), and
  its grant is auditable back to the specific worked day.
- **AC2:** For an employee within the OT provision, a comp-off credit never reduces
  the OT-wage line for the same hours; a policy that would do so is rejected at
  configuration time.

**FR-OT-004 — "The variable, not the constant" applies here too. (P0)**
The 2× multiplier, the wage-period normal hours and the [Hypothesis] quarterly
ceiling are **effective-dated configuration**, not hard-coded constants — because the statute permits "such
other per cent/limit as may be notified" and because state OSH rules diverge.
Mirrors §06's standing justification for effective-dating.

- **AC1:** A future notification changing the multiplier, the normal hours or the
  ceiling is applied by effective date; a retro run recomputes prior periods against
  the *then-current* value, not the new one.

**FR-OT-005 — Deterministic worked-hour and OT rounding. (P0)**
Rounding moves rupees and moves challans, so it cannot be an implicit
implementation choice. Worked minutes and OT minutes round by an explicit,
auditable, effective-dated rule.

- **AC1:** Rounding granularity (per punch-pair, per day, or per period) and
  direction are configuration, not hard-coded; the default reckons worked time to
  the minute and never silently rounds OT *down*. Code on Wages s.14 pays overtime
  "for every hour or for part of an hour" worked in excess (r1), so a configuration
  that discards fractional OT is rejected unless a published state rule for that
  jurisdiction supplies the block (AC2).
- **AC2:** **[Hypothesis]** some state OSH/Factories rules may reckon overtime in
  fixed blocks or set a minimum OT spell below which no OT is payable (parameters
  `ot_block_min` and `ot_min_spell_min`, empty until a state rule is read);
  effective-date per state and kill/validate via the §09.14-A1 state
  dataset — do **not** assume minute-level OT nationally, and check for a
  corrigendum (§02 standing rule).
- **AC3:** The rounding rule applied at recompute/retro is the version in force for
  the period; a period reprinted after correction rounds byte-identically (CC-1).

### 09.6-A The OT tests reckoned, the ceiling kept advisory, the rest day tracked

FR-OT-001 fixes the multiplier, the normal hours and the ceiling's status. Three things
it leaves open decide rupees: how a week and a quarter are reckoned, how rest-day work
and the weekly test combine without counting an hour twice, and how the product makes
"warn, never block" a property of the code rather than a promise. Research gives the
tests themselves — 8 hours a day where the wage period is daily, 48 a week otherwise, a
substituted rest day **and** OT wages for work on a rest day (Wages (Central) Rules 2026
rr.5–6, per the PRS review, r3) — and nothing about their reckoning, so the reckoning
choices below are product rules, each stamped on the OT line and each checked at the §20
V-21 desk read.

<!-- DIAGRAM: fr-attendance-ot-advisory-flow -->

**FR-OT-006 — Reckoning periods are configuration, stamped on every OT line. (P0)**

| Parameter | What it decides | Value at launch | Route |
| --- | --- | --- | --- |
| `ot_week_start_day` | The first day of the week for the 48-hour test | No statutory value is in research. Required tenant configuration: a tenant with any employee on a non-daily wage period cannot publish its first roster until it is set | §20 V-21 checks whether the Rules fix it |
| `ot_quarter_basis` | Calendar quarter or rolling three months for the advisory tracker | Both are computed and shown; a warning fires on whichever crosses first | §20 V-17, with the ceiling itself |
| `ot_rest_day_counts_in_weekly_test` | Whether minutes worked on a rostered weekly rest day also count toward the weekly 48 | `false` — the reading that pays at least as much (AC3) | §20 V-21; counsel if the text is ambiguous (§23) |

- **AC1:** Every OT line records the test applied (daily, weekly or greater-of), the
  week start, the quarter basis, the rest-day reading and the rule version. A change to
  any of them applies from an effective date and never re-reckons a locked period
  (FR-OT-004 AC1).
- **AC2:** The weekly test counts worked minutes as FR-ATT-020 anchors them. An overnight
  shift that crosses the week boundary counts in the week of its shift-start date, as it
  does for pay date.
- **AC3:** For one week, OT minutes = minutes worked on rostered weekly rest days + the
  larger of zero and (all other worked minutes − 48 hours), on a non-daily wage period.
  Counting rest-day minutes in the weekly total instead would give the larger of zero and
  (all minutes − 48 hours), which is never more. So the default pays at least as much
  under either reading and never counts a minute twice (FR-OT-001 AC5). On a daily wage
  period the second term is the sum of each other day's minutes beyond 8 hours.
- **AC4:** A weekly-test OT minute is attributed to the date on which the week's
  cumulative total first passes 48 hours — read minute by minute: each minute beyond the
  48th hour falls on the date it was worked — so a week that spans two pay months splits
  between them deterministically and the same way on every replay (CC-1).

**FR-OT-007 — The advisory warning: where it appears and what it says. (P0)**
Warning points are tenant configuration, `ot_quarter_warn_thresholds` — a list of
quarter-to-date hour values or fractions of `ot_quarterly_ceiling_hours`. Research
supplies none, so the list ships empty and the only warning at launch is at the ceiling
value itself.

- **AC1:** A warning appears in four places: the roster-publish screen, as a projection
  if the roster is worked as published; the OT approval screen (FR-OT-002); the pre-lock
  dashboard as a warning-class item (FR-ATT-022 AC3); and the audit log.
- **AC2:** The warning names the worker, the quarter-to-date hours on each basis, the
  ceiling value with its **[Hypothesis]** label and a pointer to V-17, and the sentence
  "This does not stop the roster, the approval or the pay run."
- **AC3:** The worker never sees a ceiling warning, and no worker-facing text suggests
  that hours worked beyond it may go unpaid.
- **AC4:** A tenant may set its own internal OT limit for cost control. It is labelled
  policy, never shown as statutory, and it can hold only an OT *pre-approval* (FR-OT-002
  AC2), never payment for hours the record shows as worked (FR-OT-001 AC2).

**FR-OT-008 — No guard reads the ceiling: a structural invariant. (P0)**
Read access to `ot_quarterly_ceiling_hours` and to the warning's output is granted to
the warning service only. Punch ingest, roster publication, OT approval, the pay-run
lock, register rendering and every filing generator are built with no read path to
either, so the rule "warn, never block" (§06.12 R17) cannot be broken by configuration.

| # | Given | When | Then |
| --- | --- | --- | --- |
| T-OT-1 | A validation guard on roster publication that references `ot_quarterly_ceiling_hours` | The rule is published | The publish fails the static scan (same mechanism as EL-2) |
| T-OT-2 | A worker at 150 quarter-to-date hours against a ceiling of 144 | A roster adding 10 OT hours is published | Published; projection warning shown; audit entry written |
| T-OT-3 | The same worker works the hours | The pay run locks | 160 hours paid at the OT rate in the quarter; nothing suppressed |
| T-OT-4 | The same worker | Form IX and Form IV render | Column (9) and the Form IV OT columns carry the hours actually worked (FR-STAT-001 AC3) |
| T-OT-5 | V-17 reports no cap in either rule-set | The value is deleted from the rule store | Warnings stop; no pay, roster or register output changes |
| T-OT-6 | `ot_quarter_basis` unresolved; a worker crosses on the rolling basis but not the calendar one | The tracker runs | One warning, naming the rolling basis |

**FR-OT-009 — The substituted rest day is a tracked obligation, separate from OT and from comp-off. (P0)**
Work on a rostered weekly rest day creates two things at once: an OT line (FR-OT-006
AC3) and a `SubstitutedRestDayObligation`. The window within which the substitute must
be given is not in research; it is parameter `substituted_rest_day_window_days`, empty
until the §20 V-21 read, and while it is empty no obligation is ever marked overdue.

| From | Event | Guard | To | Side effect | Who may trigger |
| --- | --- | --- | --- | --- | --- |
| — | A punch pairs on a rostered weekly rest day | — | OPEN | OT line written where the employee is within the OT provision (FR-OT-002 AC1); `due_by` set only if the window parameter is populated | System |
| OPEN | A roster assigns a substitute rest day | The substitute keeps the worker within ten consecutive days without a full rest day (FR-SHF-002 AC1) | SCHEDULED | Roster cell tagged with the obligation id | Manager or scheduler |
| SCHEDULED | The substitute day passes with no paired session | — | GRANTED | Obligation closed; evidence is the day's EXPLAINED Form IX cell (FR-ATT-033) | System |
| SCHEDULED | The worker works the substitute day | — | OPEN | Second OT line for that day, per FR-SHF-002 AC3; a new substitute is needed | System |
| OPEN | `due_by` passes | Window parameter populated | OVERDUE | Warning-class exception to HR (FR-ATT-022 AC3) | System |
| OPEN or OVERDUE | Date of leaving reached | — | OPEN_AT_EXIT | Listed for HR at full-and-final; whether anything is payable in lieu is not in research and goes to counsel (§23) | System |

- **AC1:** A substituted rest day never debits a leave balance and is never recorded as
  comp-off; comp-off stays a separate ledger credit under FR-OT-003.
- **AC2:** No worker, manager or tenant setting can close an obligation as waived.
- **AC3:** The obligation is visible to the worker in their language, with the scheduled
  substitute date once one is set (FR-DSK-003).

> **Worked example — a short week and a Sunday.** A monthly-paid operator, wage period
> monthly, week set to start Monday, weekly rest day Sunday. Punches: Monday to Thursday
> 8 hours each, Friday on paid leave, Saturday 8 hours, Sunday 6 hours. Other worked
> minutes = 40 hours; rest-day minutes = 6 hours.
>
> | Reading | Weekly OT | Rest-day OT | OT paid |
> | --- | --- | --- | --- |
> | Default (`ot_rest_day_counts_in_weekly_test` = false) | max(0, 40 − 48) = 0 | 6 | **6 hours** |
> | Alternative (true) | max(0, 46 − 48) = 0 | — | 0 hours |
>
> The default pays the 6 Sunday hours at the OT rate, which matches the plain words of
> the rest-day rule as the PRS review reports them — a substituted rest day **and**
> overtime wages (r3); the alternative would pay nothing, and the tenant can select it
> only after V-21 or counsel records that the gazette text supports it. The same Sunday opens an obligation; the manager rosters Wednesday of the
> next week as the substitute, and when that Wednesday passes unworked the obligation is
> GRANTED. The 6 hours join the quarter tracker (FR-OT-007). Had the operator worked
> all six weekdays at 8 hours, both readings would give 6 hours — they differ only in a
> short week.

### 09.6-B OT approval, the OT line, and the week that spans two pay months

**FR-OT-010 — Pre-approval decides authorisation, never whether worked hours are paid. (P0)**
FR-OT-002 AC2 holds pending OT for a decision before lock, and FR-OT-001 AC2 bars dropping
hours the record shows as worked. They meet in this table. An approver can dispute that
the hours were worked — only by correcting the record — or can record that they were
unauthorised, which never changes pay.

| From | Event | Guard | To | Side effect | Who may trigger |
| --- | --- | --- | --- | --- | --- |
| — | Pairing yields OT minutes for an employee within the OT provision (FR-OT-002 AC1) | Pre-approval enabled, and no approval covers the minutes | PENDING | Approval-queue item; quarter projection shown (FR-OT-007 AC1) | System |
| — | The same | A pre-approval covers them, or pre-approval is off | APPROVED | OT line written (FR-OT-011) | System |
| PENDING | The approver approves | — | APPROVED | OT line written | Approver |
| PENDING | The approver records the OT as unauthorised without disputing the hours | Reason recorded | APPROVED_UNAUTHORISED | OT line written and paid; the mark feeds only the tenant's cost report (FR-OT-007 AC4) | Approver |
| PENDING | The approver disputes that the hours were worked | A regularization raised with its evidence (§09.8) | DISPUTED | OT line held; the day shows the regularization pending | Approver |
| DISPUTED | The regularization is approved and reduces the worked time | — | CLOSED_BY_CORRECTION | OT recomputed from the corrected record; the reduced line, if any, written | The regularization's own chain (FR-REG-002) |
| DISPUTED | The regularization is rejected | — | APPROVED | OT line written as first computed | The regularization's own chain |
| PENDING or DISPUTED | Period lock attempted | — | Unchanged | Lock refused: the item is lock-gating (FR-ATT-022) | — |

- **AC1:** Only CLOSED_BY_CORRECTION removes minutes, and only through a regularization that
  changes the attendance record itself, with before and after on the audit entry
  (FR-REG-001 AC1).
- **AC2:** An approver who disputes hours cannot also approve the regularization that
  settles the dispute; it follows its own chain, so no one person both claims and decides
  that hours were not worked.
- **AC3:** APPROVED_UNAUTHORISED appears to the tenant's admins and in the cost report. It
  never appears on the payslip, and no payroll, performance or disciplinary rule may read
  it — the static scan that enforces EL-2 covers it too.
- **AC4:** An employee outside the OT provision gets no OT line; excess minutes follow
  FR-OT-003 and this table does not apply.

**FR-OT-011 — The OT line is the contract payroll consumes. (P0)**

| Field | Rule |
| --- | --- |
| `ot_line_id` | Immutable |
| `employment_id`, `establishment_id` | The establishment of the work location on the attribution date (Part E-5) |
| `attribution_date` | FR-OT-006 AC4 for weekly-test minutes; the session's anchor date for daily-test and rest-day minutes |
| `pay_period` | The payroll cycle containing the attribution date |
| `minutes` | Whole minutes, never rounded here — rounding is FR-OT-005 and §08 FR-PAY-209 |
| `multiplier` | 2 on the statutory line (FR-OT-001); any higher tenant band is a separate line labelled policy |
| `test_applied`, `reckoning_stamp` | daily · weekly · greater_of · rest_day; with the week start, quarter basis and rest-day reading in force (FR-OT-006 AC1) |
| `approval_state` | From FR-OT-010 |
| `session_refs[]` | The `WorkSession` rows that produced the minutes |
| `retro_of` | For a retro line, the line it corrects; the original is never edited |
| `rule_version` | The rule version in force on the attribution date |

- **AC1:** For each employment and calendar month, the minutes on statutory OT lines
  attributed to the month equal Form IX column (9) for that month (T-OT-4). A mismatch is a
  lock-gating reconciliation exception.
- **AC2:** The line carries minutes, never rupees. Payroll values it with the OT base the
  wage-base service returns for the attribution date (FR-OT-001 AC4), so a change of base
  is a payroll recompute, not an attendance one.
- **AC3:** A comp-off credit never reduces a line (FR-OT-003 AC2). After lock, minutes
  change only through a retro line.

**FR-OT-012 — A week that spans two pay months. (P0)**
A week can straddle a pay-month lock. The weekly test can be recognised as the week runs;
a greater-of comparison cannot, because it needs the whole week.

- **AC1:** Weekly-test minutes need no wait for the week's end. The running total can only
  grow, so a minute worked after it passes 48 hours is OT when it is worked, and is
  recognised in the month of its date (FR-OT-006 AC4). A month that locks mid-week carries
  exactly the weekly-test minutes worked in it, and nothing is provisional. A later
  correction that lowers the week's total is a retro line (FR-OT-011 AC3).
- **AC2:** Daily-test minutes are recognised day by day, in the month of their anchor date.
  Under a greater-of basis, the week-end comparison adds a top-up line only where the
  weekly figure exceeds the daily-test minutes already recognised for the week, attributed
  to the week's last anchored session date. It never claws back a minute already paid.
- **AC3:** An exit mid-week closes the week at the date of leaving; the partial week is
  reckoned then and reaches full-and-final settlement (§08).
- **AC4:** Rest-day minutes (FR-OT-006 AC3) are recognised on their own date, whatever the
  week does.

> **Worked example — one week, two months, the same rupees.** A monthly-paid operator;
> `ot_week_start_day` Monday; rest day Sunday; a calendar-month pay cycle; the OT base of
> ₹15,000 used in FR-ATT-038's example, so ₹144.2308 an OT hour. The operator works
> 9 hours a day from Monday 28 September to Saturday 3 October 2026, and September locks
> before the week ends.
>
> | Basis | September | October | Total |
> | --- | --- | --- | --- |
> | Weekly (the statutory test on a monthly wage period) | 0 — the running total was 27 hours when September ended | 6 h: the total reaches 45 hours on Friday and passes 48 three hours into Saturday 3 October, so the six hours worked after that are OT on 3 October = ₹865.38 | ₹865.38 |
> | Greater-of (tenant choice) | 3 h daily-test, one each on 28, 29 and 30 September = ₹432.69 | 3 h daily-test on 1, 2 and 3 October = ₹432.69; weekly 6 h equals daily 6 h, so no top-up | ₹865.38 |
>
> The rupees are the same; the month is not. The month decides which wage record and
> which Form IX column (9) carries the hours, and which month's s.2(y) 50% test counts them
> as an excluded head (FR-OT-001 AC3). Both results are deterministic and both are stamped
> on the lines.

> **Test scenarios — approval and the OT line.**
>
> | # | Given | When | Then |
> | --- | --- | --- | --- |
> | T-OT-7 | A PENDING item | The approver marks it unauthorised | APPROVED_UNAUTHORISED; the minutes paid; nothing on the payslip about the mark |
> | T-OT-8 | A DISPUTED item whose regularization cuts the session by 30 minutes | The regularization is approved | CLOSED_BY_CORRECTION; the OT line reduced by 30 minutes; audit shows both records |
> | T-OT-9 | The approver who disputed | Tries to approve the regularization | Refused (FR-OT-010 AC2) |
> | T-OT-10 | September's OT lines and September's Form IX | Month close | Minutes equal column (9); a one-minute difference blocks lock (FR-OT-011 AC1) |
> | T-OT-11 | An exit on Wednesday 30 September | Full-and-final runs | The partial week reckoned to 30 September (FR-OT-012 AC3) |

---

### 09.7 Leave policies & the accrual engine

<!-- DIAGRAM: leave-ledger-double-entry -->

**FR-LV-001 — Configurable leave-type catalogue with statutory + policy types. (P0)**
The tenant configures leave types, but the catalogue ships with the Indian
statutory and common-practice set pre-modelled: Earned/Privilege Leave (EL/PL),
Casual Leave (CL), Sick Leave (SL), Maternity Leave (ML), Compensatory Off,
Leave Without Pay (LWP), and policy types (bereavement, marriage, paternity —
non-statutory in the private sector, tenant-optional).

- **AC1:** Each leave type carries: accrual rule, opening balance, carry-forward
  cap, encashment rule, min/max application units (full/half/quarter day, hours),
  eligibility (post-confirmation? tenure gate?), documentation requirement (e.g.
  medical certificate over N days of SL), and paid/unpaid flag.
- **AC2:** Statutory minimums act as **floors**: a tenant policy that grants below
  a state statutory minimum is flagged, not silently accepted (compliance-by-default).

**FR-LV-002 — Earned-leave accrual per statute, effective-dated per state. (P0)**
**[Hypothesis]** The OSH&WC regime provides annual leave with wages, recorded in
the OSH **FORM-XX** register of leave with wages (OSH r.76(1), r5) — but the
accrual ratio (days worked per day of leave, adult and young-worker variants), the
eligibility threshold, the carry-forward cap, the encashment rule and the
calendar-vs-worked-day basis have **not** been read from the Code or its rules in
research, and state rules may differ. **[Reversed]** Earlier drafts stated a ratio
and a carry-forward cap as OSH figures with a section citation; neither was captured
in research, so none ships. They are parameters `el_worked_days_per_day_adult`,
`el_worked_days_per_day_young`, `el_eligibility_min_days`,
`el_carry_forward_cap_days`, `el_encashment_rule` and `el_worked_day_definition`,
effective-dated per (state, sphere, establishment type), **empty until populated**
through the §22 pipeline from the Code/Rules text or a state gazette, with a
corrigendum check (§09.14-A1). State S&E Acts continue alongside the Codes and may
impose their own leave grants (r1: S&E laws are not superseded by the Codes), so an
establishment may carry an S&E-Act rule and an OSH rule at once. Where they differ
the engine computes both and shows the difference; which prevails is a counsel
question (§23), and until it is answered the default grants the more generous so
that no worker is under-granted (FR-LV-001 AC2).

- **AC1:** Accrual runs on a defined cadence (monthly proportional, or on
  crossing the worked-day threshold) and is effective-dated by state and
  establishment type. A jurisdiction whose parameters are empty accrues nothing
  automatically and shows `accrual-rule-missing` on the pre-lock dashboard as a
  warning — the tenant may run a policy accrual meanwhile, labelled as policy.
- **AC2:** Carry-forward at year-end caps at the configured limit; excess is
  encashed or lapses per policy, with a ledger entry either way.
- **AC3:** Changing a state's accrual rule (new notification) recomputes accruals
  from the effective date forward, with an audit trail; it does **not** silently
  restate past balances.
- **AC4:** The ledger renders the FORM-XX leave-with-wages register per
  establishment, and an employee can obtain their own leave record on demand — OSH
  r.76(1) requires the employer to share it "once in a Calendar year, on demand"
  (r5). The self-service surface serves it at any time; the audit trail records
  each request so the statutory minimum is evidenced.

> **Worked example — EL accrual, with illustrative parameter values.** Suppose a
> state's published rule sets `el_worked_days_per_day_adult` = 20 and
> `el_worked_days_per_day_young` = 15 (**illustrative values only** — earlier
> drafts carried them, research has not captured them, and they must not ship). A
> worker completes **250 days actually worked** in the leave year. Accrual =
> 250 ÷ 20 = **12.5 days**; for a young worker, 250 ÷ 15 = 16.67. Two design traps
> the engine must handle deterministically: (a) **what counts as a "worked day"**
> (`el_worked_day_definition`) — paid holidays, weekly-offs and paid leave may be
> *excluded* from the numerator under a worked-day method and *included* under a
> calendar-day method, so the numerator definition is state/establishment config,
> not a constant; (b) **rounding** — the fractional entitlement (12.5, 16.67) is
> rounded by the rule's own rounding term, or by tenant policy where the rule is
> silent, and the rounding rule applied is on the ledger entry. Carry-forward then
> caps the closing balance at `el_carry_forward_cap_days`, encashing or lapsing the
> excess with a ledger entry either way (AC2).

**FR-LV-003 — Maternity, and other protected leaves. (P0)**
**[Verified]** Maternity benefit is Chapter VI of the Code on Social Security 2020,
applying to factories, mines and plantations and to every shop or establishment
with ten or more employees on any day of the preceding twelve months — it latches
(CoSS First Schedule, §06.1; r1). Read verbatim from the Code (r1): **six weeks'**
leave for miscarriage or medical termination of pregnancy and **two weeks** after a
tubectomy (s.65); **two nursing breaks** a day until the child is fifteen months old
(s.66); and a medical bonus of ₹3,500 or a notified amount, payable only where the
employer provides no free pre-natal confinement and post-natal care (s.64 — a
payroll component, §08/§11, signalled from here). The headline entitlement of
**26 weeks** at **80 days'** qualifying service is carried from r3's summary and is
consistent with CoSS s.54's 26-week ceiling on maternity leave counted toward
gratuity (r1) — re-read Ch. VI before customer use. **Not captured in research:**
the pre-natal share of the 26 weeks, the reduced entitlement for a third or later
child, the adopting and commissioning-mother variants, the look-back window for the
80 days, and the Ch. VI section numbers for each. **[Reversed]** Earlier drafts gave
all of these as figures with a legacy Maternity Benefit Act section number; they
are now parameters — `ml_weeks_standard`, `ml_prenatal_max_weeks`,
`ml_weeks_by_parity`, `ml_weeks_adoption`, `ml_weeks_commissioning`,
`ml_adoption_child_max_age`, `ml_qualifying_days`, `ml_qualifying_window` — each
populated from the Ch. VI text with its citation through the §22 pipeline
(§09.14-A15). The leave engine models ML as a special paid type with its own
eligibility and its ESI interaction (an ESI-covered woman draws maternity benefit
from ESIC, not from the employer, §06.3 — the engine must not double-pay).

- **AC1:** ML application blocks LOP/absence logic for the covered weeks and
  correctly signals payroll whether the employer pays or ESIC pays, per coverage.
- **AC2:** The entitlement variant (standard, by parity, adoption, commissioning) is
  derived from the employee's dependant/child records (§07 core HR, §11 benefits
  data model), not typed free-hand, so the entitlement is defensible. Until the
  variant parameters are published, a non-standard case raises a
  `maternity-variant-unconfigured` exception for HR to decide and record — the
  engine never guesses a shorter entitlement.
- **AC3:** **[Hypothesis]** The ESI-side treatment after the one-year saving lapses,
  on or about 21 November 2026, is unresolved (the open statutory question of §06.9
  and §06.13; gated in §20 V-08) — the ML↔ESI rule is effective-dated so it
  can be re-pointed when ESIC notifies. Kill/validate via the §09.14-A2 primary-
  source watch on ESIC/MoLE; until it resolves, the employer-vs-ESIC pay split is a
  configurable effective-dated rule, never a hard-coded assumption.
- **AC4:** Miscarriage/MTP leave (six weeks), post-tubectomy leave (two weeks) and
  nursing breaks (two, until the child is fifteen months old) are distinct leave or
  time-off types with their own ledger entries (s.65, s.66; r1). A nursing break is
  never treated as an unpaid break, a late-in or LOP by the pairing engine
  (FR-ATT-020); its duration and pay treatment are parameters
  (`nursing_break_min`, `nursing_break_paid`) populated from the Ch. VI text and
  rules, empty until then (§09.14-A15).

**FR-LV-004 — Leave balance is a double-entry, recomputable ledger. (P0)**
Every accrual, application, cancellation, encashment, lapse, comp-off credit and
adjustment is a ledger transaction; the balance is the sum, never a stored mutable
counter.

- **AC1:** Balance at any past date is reconstructable by replaying the ledger to
  that date.
- **AC2:** A cancelled/rejected leave reverses cleanly (compensating entry), and
  the net effect is auditable.
- **AC3:** Opening balances imported at migration (§14; migration is P0) are tagged
  `opening` and reconcile to the prior system's closing balance; discrepancies are
  surfaced, not absorbed.

**FR-LV-005 — Leave application, approval and holiday-aware validation. (P0)**
Workers apply for leave (app/web/kiosk/WhatsApp); the system validates against
balance, notice period, blackout dates, overlap, and team-availability limits,
then routes for approval (§09.8).

- **AC1:** An application exceeding balance is either blocked or allowed as
  LWP/negative-balance per policy — the outcome is explicit and shown to the
  worker in their language.
- **AC2:** Weekly-offs and holidays inside a leave span are handled per the
  sandwich policy (FR-ATT-021 AC3) consistently.
- **AC3:** A worker on the frontline with no smartphone can have leave applied on
  their behalf at the kiosk or by the supervisor (FR-ATT-016), preserving the
  approval trail.

**FR-LV-006 — Leave encashment and Full-and-Final interaction. (P1)**
Unused encashable leave is valued and passed to payroll for periodic encashment
and for Full-and-Final settlement on exit.

- **AC1:** Encashment value uses the correct wage base from §06 (not a local
  computation) and appears as a labelled payroll component.
- **AC2:** On exit, the leave ledger closes to zero via encashment/lapse entries;
  the F&F statement reconciles to the ledger.

**FR-LV-007 — Casual and Sick leave to state S&E floors, ESI-aware. (P0)**
Unlike earned leave (leave with wages under the OSH&WC regime, FR-LV-002), **Casual
Leave (CL) and Sick Leave (SL) are largely Shops & Establishments Act creatures and
vary by state** — state S&E laws are not superseded by the Labour Codes and overlap
them on leave (r1). **[Hypothesis]** the count, whether CL and SL are separate or a
combined pool, carry-forward and documentation thresholds diverge by state.
**[Reversed]** Earlier drafts gave a typical annual CL/SL figure and attributed
variants to named states; research captured no state S&E leave grant, so no figure
ships. Parameters `cl_days_per_year`, `sl_days_per_year`, `cl_sl_pooled`,
`cl_carry_forward_cap`, `sl_carry_forward_cap` and `sl_certificate_after_days` are
effective-dated per (state, establishment type), empty until gazette-sourced per
state through the §22 pipeline; kill/validate via the §09.14-A1/A12 state dataset
(carries a per-state kill criterion).

- **AC1:** CL/SL entitlements are configured per state S&E-Act floor and act as
  **floors** (FR-LV-001 AC2): a tenant policy below the state minimum is flagged,
  not silently accepted.
- **AC2:** SL documentation (medical certificate over N continuous days) is a
  per-type config with the threshold auditable; a short-leave / half-day SL unit is
  supported (FR-LV-001 unit field).
- **AC3:** **ESI interaction — no double pay.** For an ESI-covered worker, a
  certified sickness spell draws **sickness benefit from ESIC** (subject to any
  waiting period — parameter `esi_sickness_waiting_days`, not captured in research,
  populated from the ESI regulations through the §22 pipeline), so the employer's SL
  policy must not also pay for the same ESI-compensated days beyond what policy tops
  up. **[Verified]** sickness benefit is among the ESI benefits administered by ESIC
  (§06.3; Code on Social Security 2020, which repealed the ESI Act 1948; the ESI
  (General) Regulations 1950 continue under the CoSS saving provisions, and their
  position once the one-year saving lapses is the open question below — §06.9).
  **[Hypothesis]** the exact ESI sickness treatment
  after on or about 21 November 2026 is unresolved (same open question as FR-LV-003 AC3) — the
  employer-vs-ESIC split is effective-dated, killed/validated via §09.14-A2.

> **Worked example — CL half-day and the SL/ESI overlap.** A worker takes a
> **half-day CL** (0.5 unit) on the 10th and is **certified sick 20th–24th** (5
> days). CL ledger debits 0.5; SL ledger debits 5. If the worker is ESI-covered and
> the 20th–24th spell clears `esi_sickness_waiting_days`, ESIC pays sickness benefit for
> the qualifying days — so the *paid-days for payroll* on those days are marked
> **ESI-borne, not employer-borne**, and the engine must not credit employer SL pay
> on top unless the tenant runs an explicit top-up policy (AC3). The 0.5 CL day, by
> contrast, is fully employer-paid and does **not** reduce paid-days. Both ledgers
> reconcile independently, and the paid-days invariant (FR-ATT-021 AC2) still holds
> for the month.

### 09.7-A The leave ledger, specified — transaction classes, holds and reconstruction

FR-LV-004 fixes that the balance is a double-entry ledger and that it is
reconstructable. It does not fix the vocabulary, and the vocabulary is where two
implementations silently diverge: an engine that debits leave **on approval** and one
that debits it **on the leave day** show the same worker different balances for a
fortnight, approve different requests on the boundary, and hand payroll a different
F&F day count in a resignation month. This subsection fixes the transaction classes,
the moment each posts, what a hold is and is not, and how a balance is reconstructed
both for a date and for a decision time. It introduces **no statutory value**: every
entitlement figure it moves comes from the `el_*`, `cl_*`, `sl_*` and `ml_*`
parameters that FR-LV-002, FR-LV-003 and FR-LV-007 ship **empty** (CC-9), or from a
tenant policy labelled as policy.

<!-- DIAGRAM: fr-attendance-leave-ledger-posting -->

**FR-LV-008 — The leave transaction class catalogue. (P0)**
Every movement of a leave balance belongs to exactly one class below. No other
mechanism may change a balance, and no class may be posted by a surface not named in
its **Posted by** column. A leave type carries `balance_bearing` (true for EL, CL, SL,
comp-off; false for LWP and any other unpaid type, which records days for the register
and the paid-days projection without holding a balance).

| Class | Sign | Posts when | `effective_date` is | Posted by | Reversed by | Prices in payroll? |
| --- | --- | --- | --- | --- | --- | --- |
| `OPENING` | ± | Migration cutover (FR-LV-004 AC3, FR-LV-017) | The cutover date | Migration job, once per type per employment | `ADJUSTMENT` only, with a named approver | No |
| `ACCRUAL` | + | The accrual cadence runs, or a worked-day threshold is crossed (FR-LV-002 AC1) | The accrual period end, or the threshold-crossing date | Engine | `ACCRUAL_REVERSAL` | No |
| `ACCRUAL_REVERSAL` | − | A rule change or a corrected worked-day count invalidates a prior accrual, forward only (FR-LV-002 AC3) | The original accrual's effective date | Engine | Further `ADJUSTMENT` | No |
| `HOLD` | 0 on balance, − on available | A request reaches SUBMITTED (FR-LV-011) | The request's first leave day | Engine, from the request | `HOLD_RELEASE` | No |
| `HOLD_RELEASE` | 0 on balance, + on available | The request reaches any terminal state, or is approved and converted to `AVAIL` | Same as its `HOLD` | Engine | — | No |
| `AVAIL` | − | Final approval — **one row per leave day per type per unit** | That leave day | Engine, from the approval | `AVAIL_REVERSAL` | Days only, via `DayStatus` |
| `AVAIL_REVERSAL` | + | Cancellation, withdrawal or revocation of a day **not yet consumed** (FR-LV-010) | The cancelled leave day | Engine | Further `ADJUSTMENT` | Days only |
| `COMPOFF_CREDIT` | + | A rest-day or holiday-worked day is credited (FR-OT-003 AC1) | The worked day | Engine, on OT/comp-off decision | `ADJUSTMENT` | No |
| `COMPOFF_EXPIRY` | − | `compoff_expiry_days` elapses on an unused credit | The expiry date | Engine | `ADJUSTMENT`, with reason | No |
| `LAPSE` | − | Leave-year close, for balance above `el_carry_forward_cap_days` or the type's cap (FR-LV-014) | The close date | Close job | `ADJUSTMENT`, only via a reopened close | No |
| `CLOSE_OUT` | − | Leave-year close, for the carried balance | The close date | Close job | Reopen (FR-LV-014 AC4) | No |
| `OPENING_CF` | + | Leave-year close, in the new year, equal and opposite to `CLOSE_OUT` | The first day of the new leave year | Close job | Reopen | No |
| `ENCASHMENT` | − | An encashment is approved (FR-LV-015) | The encashment effective date | Engine, on approval | `ADJUSTMENT` before the payroll period locks; after lock, the retro path | Days only — §08 prices them |
| `ADJUSTMENT` | ± | An authorised human correction | Stated by the actor, never defaulted to today | HR, under maker-checker (§07 permissions matrix) | Further `ADJUSTMENT` | No |

- **AC1 — One writer per class.** A class posted by a surface other than the one
  named is refused at the API boundary, not merely audited. No screen, import or
  assistant path can write a balance directly (CC-2).
- **AC2 — Day-granular `AVAIL`.** A five-day approval posts five rows, a half-day
  posts one row of 0.5 on its day. Consequences the spec depends on: a partial
  cancellation reverses exactly the untaken days, the balance as at any date is exact
  without unpacking spans, the paid-days projection reads one row per day, and a span
  that crosses a leave-year boundary splits across the two years without special
  handling.
- **AC3 — Holds never move a balance.** A hold reduces `available` only. A balance
  reconstructed for a past date is identical whether or not requests were pending at
  that time, so the register and the paid-days figures never depend on approval
  latency.
- **AC4 — Invariants, checked before every payroll lock.**
  - **I1** `balance(type, as at D) = Σ delta` over non-void rows with
    `effective_date ≤ D`.
  - **I2** `available(type, now) = Σ delta` over **all** non-void rows, including
    future-dated approved `AVAIL`, minus the open `HOLD` rows. Committed future leave
    is therefore never offered twice.
  - **I3** Every row is immutable and carries `posted_at`, `effective_date`,
    `rule_version`, `source_ref`, `actor` and, where it reverses, `reverses_txn`.
  - **I4** No row may post into a closed leave year except through the reopen path
    (FR-LV-014 AC4).
  - **I5** A `balance_bearing` type goes below zero only where
    `leave_negative_balance_mode` permits it for that type; a negative balance open at
    exit routes to §08 recovery (FR-LV-016 AC3).
  - **I6** For every approval, `Σ |AVAIL|` for its rows equals the approved day count
    exactly — no rounding is ever applied to a leave day count (rounding applies to
    accrual entitlement, FR-LV-002, and to money, §08 FR-PAY-209).
  - **I7** The ledger holds **days, never rupees**. Every valuation — encashment,
    recovery, LOP — is §08's (FR-LV-015 AC1).
- **AC5 — Unpaid types.** A type with `balance_bearing = false` accepts `AVAIL` and
  `AVAIL_REVERSAL` rows only, never accrues, and never reports a balance; its rows
  exist so that the day has a named reason on the register and in the paid-days
  projection (FR-ATT-021).

**FR-LV-009 — Two clocks: entitlement as at a date, and what was known at a decision time. (P0)**
The ledger answers two different questions, and an audit that confuses them produces
an unanswerable dispute. *Entitlement view:* what was the balance **as at** 12
September. *Audit view:* what did the approver **see** when they decided on 12
September. A back-dated accrual posted on 20 September changes the first and must
never change the second.

- **AC1:** Every approval, rejection and validation outcome snapshots the figures it
  relied on — balance, available, open holds — together with the ledger high-water
  mark (`ledger_seq`) they were computed from. Re-running the decision against that
  mark reproduces the same figures byte-for-byte (CC-1).
- **AC2:** A posting whose `effective_date` precedes its `posted_at` is permitted but
  never silent: it raises an informational `ledger-backdated` item naming the rows and
  the reason.
- **AC3:** Where a back-dated posting would have changed an already-decided outcome
  (an approval that would now exceed balance, a rejection that would now pass V4), the
  engine raises a **warning-class** `decision-basis-changed` exception listing the
  affected requests. It never auto-reverses a decision a human made, and it never
  re-opens a consumed day.
- **AC4:** A back-dated posting whose `effective_date` falls inside a locked payroll
  period does not change that period's paid-days; it flows through the retro path
  (FR-REG-007) like any other locked-period correction, and the period's register gets
  a new version (FR-STAT-002).
- **AC5:** A reconstruction is addressed by the pair (`as_at_date`, `as_known_at`);
  replay for any pair is deterministic, and the two axes are queryable independently.

**FR-LV-010 — Reversal, cancellation and void semantics. (P0)**
Nothing in the ledger is edited or deleted. Correction is always a further row.

- **AC1:** A reversal names `reverses_txn`, carries its own reason and actor, and is
  itself correctable only by a further compensating row. A second reversal of the same
  row with the same reason class is refused by an idempotency key of
  (`reverses_txn`, `reason_class`) — the protection against a retried click producing
  a double credit.
- **AC2 — Consumed days do not come back.** Cancellation reverses only days that have
  not yet occurred as at the cancellation's effective date. A past day already counted
  in `DayStatus` is corrected through regularization (§09.8) and, if its period is
  locked, through retro — never by a silent credit to the balance.
- **AC3 — Mid-span revocation.** Where an approval is revoked while a span is running,
  the elapsed days stay consumed, the remaining days reverse, and the request moves to
  PART_CANCELLED (FR-LV-011). The worker is notified in their language with the exact
  days reversed (FR-DSK-003).
- **AC4 — ESI-borne days.** Cancelling a sickness leave whose days were marked
  ESI-borne (FR-LV-007 AC3) raises a reconciliation exception rather than
  re-crediting the balance, because the day's cost was not the employer's to return;
  the exception is resolved by a human with a recorded reason before lock
  (FR-ATT-022).
- **AC5 — Void is not a class.** A row posted in error is reversed, never voided; the
  word "void" appears in this module only as the audit state of a row that a reversal
  has fully offset, and both rows remain readable.

> **Worked example — one employment's EL ledger across a quarter, and where each
> view differs.** Accrual cadence and figures here are a **tenant policy accrual
> labelled as policy** (FR-LV-002 AC1), because the statutory `el_*` parameters ship
> empty; the arithmetic is what is being specified, not the entitlement.
>
> | Date | Event | Class and rows | Δ | Balance as at that date | Available then |
> | --- | --- | --- | --- | --- | --- |
> | 1 Jul | Migration cutover | `OPENING` | +6.0 | 6.0 | 6.0 |
> | 31 Jul | Policy accrual run | `ACCRUAL` | +1.0 | 7.0 | 7.0 |
> | 3 Aug | Request A submitted for 10–11 Aug | `HOLD` 2.0 | 0 | 7.0 | 5.0 |
> | 5 Aug | Request B submitted for 20 Aug | `HOLD` 1.0 | 0 | 7.0 | 4.0 |
> | 8 Aug | Request A approved | `AVAIL` −1.0 on 10 Aug, −1.0 on 11 Aug; `HOLD_RELEASE` 2.0 | −2.0 | **7.0** on 8 Aug — the debits are dated 10 and 11 Aug | 4.0 |
> | 11 Aug | Second leave day passes | — | — | 5.0 | 4.0 |
> | 14 Aug | Worker withdraws request B | `HOLD_RELEASE` 1.0 | 0 | 5.0 | 5.0 |
> | 18 Aug | Sunday 16 Aug worked, comp-off credited | `COMPOFF_CREDIT` +1.0 on the comp-off type, expiry stamped | +1.0 (comp-off) | EL 5.0, comp-off 1.0 | 5.0 / 1.0 |
> | 12 Sep | Request C for six days, Mon 21 to Sat 26 Sep, EL available 5.0 | V4 splits it: `AVAIL` 5.0 on EL, `AVAIL` 1.0 on LWP | −5.0 EL | 5.0 until 21 Sep | 0.0 EL |
> | 25 Sep | Comp-off unused past `compoff_expiry_days` | `COMPOFF_EXPIRY` −1.0 | −1.0 | comp-off 0.0 | 0.0 |
> | 30 Sep | Corrected worked-day count posts a back-dated accrual effective 1 Aug | `ACCRUAL` +0.5 effective 1 Aug, `ledger-backdated` raised | +0.5 | Balance **as at 8 Aug** is now 7.5 | 0.5 |
>
> Three things the table is asserting. **(a)** On 8 August the approval moved
> neither figure: the hold had already reserved the two days, and the debits are dated
> to the leave days themselves — so a balance certificate printed on 9 August
> legitimately reads 7.0 and is not wrong.
> **(b)** The 30 September back-dated accrual changes the *entitlement* view of 8
> August but not the *audit* view: request A's snapshot still records the 7.0 and 4.0
> the approver saw, and no decision is reversed (FR-LV-009 AC1, AC3). **(c)** Request
> C's sixth day is not refused and not silently unpaid: it is an `AVAIL` row on the
> LWP type, which carries no balance, produces one LOP day in `DayStatus`, and lands
> in the paid-days invariant (FR-ATT-021 AC2) where payroll can see it.

> **Test scenarios — the ledger.**
>
> | # | Given | When | Then |
> | --- | --- | --- | --- |
> | T-LL-1 | The quarter above | The balance is reconstructed for 9 Aug at `as_known_at` = 9 Aug | 7.0 — not 5.0, and not the post-back-dating 7.5 |
> | T-LL-2 | The same | Reconstructed for 9 Aug at `as_known_at` = 1 Oct | 7.5, and the difference is attributable to one named row |
> | T-LL-3 | An approval retried twice by a flaky client | Both calls land | One set of `AVAIL` rows — the approval is idempotent on its request id |
> | T-LL-4 | A cancellation of request A submitted on 11 Aug, after the 10th | It is processed | 10 Aug stays consumed, 11 Aug reverses only if the cancellation's effective date precedes it; otherwise the day is a regularization matter (AC2) |
> | T-LL-5 | An HR user attempts a direct balance write through the import API | The call is made | Refused at the boundary with the class-ownership error, and the attempt is audited (AC1) |
> | T-LL-6 | A sickness span marked ESI-borne | HR cancels it | Reconciliation exception, no credit, lock blocked until a human resolves it (AC4) |
> | T-LL-7 | A leave-year close, then a `LAPSE` reversal attempt | The reversal is posted | Refused — I4; the close must be reopened first (FR-LV-014 AC4) |
> | T-LL-8 | A comp-off credit and its expiry in the same closed month | The month is replayed | Both rows present, net zero, and the expiry reason is readable |

---

### 09.7-B The leave request lifecycle — states, ordered validation and span expansion

FR-LV-005 fixes that applications are validated and routed. What a build team needs
beyond that is the state machine, the **order** in which validations run and what each
does when it fails, and how a request becomes days. Part E-1's rule applies here as it
does to the payroll month: the machine is specified as a **transition table** with
event, guard, side effect and who may trigger, and the diagram illustrates it.

<!-- DIAGRAM: fr-attendance-leave-request-states -->

**FR-LV-011 — The leave request state machine. (P0)**

| From | Event | Guard | Side effect | Who may trigger |
| --- | --- | --- | --- | --- |
| — | `create` | The employment is active on the requested dates | Request in DRAFT, no ledger row | Worker; supervisor or HR on the worker's behalf (FR-LV-005 AC3), recorded as such |
| DRAFT | `submit` | No BLOCK outcome in V1–V12 (FR-LV-012) | `HOLD` posted; routed to approval level 1; worker notified in their language | Worker, or the person acting for them |
| DRAFT | `abandon` | — | Request closed, nothing posted | Creator |
| PENDING | `approve_level` | Approver is in the effective chain and is not the requester (FR-REG-009) | Level recorded with actor and time; if levels remain, stays PENDING | Approver at that level, or a time-bounded delegate (FR-REG-002 AC2) |
| PENDING | `approve_final` | As above, and it is the last level | `AVAIL` rows posted per day; `HOLD_RELEASE`; `DayStatus` re-derived for each day | Final approver |
| PENDING | `reject` | Reason recorded | `HOLD_RELEASE`; no `AVAIL`; the days remain whatever attendance makes them | Any approver in the chain |
| PENDING | `withdraw` | The first leave day has not passed | `HOLD_RELEASE` | Worker |
| PENDING | `timeout` | `leave_timeout_hours` elapsed at a level | Moves to ESCALATED, next level notified; **no auto-decision** | Engine |
| ESCALATED | `approve_final` / `reject` | As PENDING | As PENDING | Escalation approver |
| ESCALATED | `day_arrives` | The first leave day begins with no decision | Moves to UNDECIDED_AT_DAY; the day raises a lock-gating `leave-undecided` exception (FR-ATT-022) | Engine |
| UNDECIDED_AT_DAY | `approve_final` | — | `AVAIL` rows posted for every day of the span, including elapsed ones; the elapsed days' `DayStatus` re-derives from absent to on-leave with an audit entry | Final approver |
| UNDECIDED_AT_DAY | `reject` | Reason recorded | `HOLD_RELEASE`; the elapsed days stand as whatever attendance recorded — usually absence, hence LOP | Final approver |
| APPROVED | `cancel_all` | Every day of the span is still in the future | `AVAIL_REVERSAL` for every day | Worker or approver |
| APPROVED | `cancel_partial` | Some days elapsed | `AVAIL_REVERSAL` for future days only; state PART_CANCELLED (FR-LV-010 AC3) | Worker or approver |
| APPROVED / PART_CANCELLED | `span_ends` | The last day has passed | State CONSUMED | Engine |
| CONSUMED | `retro_amend` | The period is locked and a retro run carries the change | A retro diff, never a mutation: new `AVAIL`/`AVAIL_REVERSAL` rows dated to the original days, an arrears line to §08, a new register version | HR, through the retro path (FR-REG-007) |
| Any non-terminal | `employment_ends` | Exit date recorded | Pending requests for dates after the exit date are cancelled with reason `exit`; holds released; the close-out runs (FR-LV-016) | Engine |

- **AC1:** The engine **never** auto-approves and **never** auto-rejects a leave
  request. `leave_timeout_hours` escalates; it does not decide. A day that arrives
  undecided is an exception a human must close before the period locks — the
  alternative silently converts a queue delay into an LOP day.
- **AC2:** Every transition writes an audit entry with actor, time, before/after state
  and `rule_version` (CC-5), and every state change visible to the worker is delivered
  in their language (FR-DSK-003).
- **AC3:** A late approval of an elapsed day re-derives that day and, if its payroll
  period has locked, does so through retro (FR-REG-007) — the locked projection is
  never edited (Part E-1).
- **AC4:** State is derived from the transition log, not stored as an authored field;
  replaying the log reproduces the state (CC-1).

**FR-LV-012 — Ordered, collect-all validation with explicit outcome classes. (P0)**
Validations run in the fixed order below on every submission and again at final
approval, because balance and roster facts move between the two. Every check that
fires is reported — the engine does not stop at the first failure — and each has
exactly one outcome class: **BLOCK** (submission refused), **CONVERT** (the request is
reshaped and the worker is shown how), **ROUTE** (an extra approval level or a
different approver), **DOC** (approval permitted, evidence owed by a deadline) or
**WARN** (recorded, shown, not blocking).

| # | Check | Fails when | Outcome | Notes |
| --- | --- | --- | --- | --- |
| V1 | Employment active | The employment is not active on a requested date | BLOCK | Exit-dated employments cannot apply beyond the exit date |
| V2 | Type eligibility | Tenure gate, confirmation gate or type not available to the employment (FR-LV-001 AC1) | BLOCK | The gate and its parameter are named in the message |
| V3 | Unit legality | The request uses a unit the type does not allow — a half-day on a full-day-only type, or a fraction below `leave_min_unit` | BLOCK | Units are a type attribute, never per request |
| V4 | Balance | Requested days exceed `available` | CONVERT or BLOCK per `leave_negative_balance_mode` for that type | CONVERT splits the request: covered days on the type, the excess on LWP (FR-LV-008 AC5). The worker sees the split before submitting (FR-LV-005 AC1) |
| V5 | Overlap | Any day already has an open or approved request of any type | BLOCK | The colliding request is named |
| V6 | Locked period | Any day falls inside a locked payroll period | BLOCK at submission; the retro path is offered instead | FR-REG-007 |
| V7 | Notice period | Applied later than the type's notice rule | ROUTE to the configured higher approver, or WARN where the tenant has not set one | Notice rules are tenant policy, never statutory here |
| V8 | Blackout | The span intersects a configured blackout window | ROUTE to `blackout_override_role` | Never a silent BLOCK — someone must own the refusal |
| V9 | Team availability | The team's simultaneous-leave cap for those dates would be exceeded | ROUTE | The cap is a roster policy, visible to the approver |
| V10 | Documentation | The type requires evidence beyond a threshold — e.g. a certificate after `sl_certificate_after_days` continuous days (FR-LV-007 AC2) | DOC | Approval may proceed; the obligation is tracked with a deadline and appears on the exception dashboard when it passes. The deadline is `leave_doc_grace_days`, a tenant policy value |
| V11 | Statutory floor and coverage | A protected-leave request whose variant parameters are unpublished (FR-LV-003 AC2), or a policy value below a state floor (FR-LV-001 AC2) | WARN + ROUTE to HR | The engine never shortens a protected entitlement to fit an unpublished parameter |
| V12 | Roster and rest-day interaction | The span covers a rostered rest day or a holiday | CONVERT per span expansion (FR-LV-013) | Applies the sandwich setting and is labelled where applied (FR-ATT-021 AC3) |

- **AC1:** The check list, order and outcome class are data, not code paths: a tenant
  that disables a policy check cannot reorder the statutory-floor and balance checks,
  and the applied list is recorded on the request so a dispute can be re-run.
- **AC2:** Re-validation at final approval re-runs V1, V4, V5 and V6 only; a change in
  any of them since submission is shown to the approver rather than silently applied.
- **AC3:** Every outcome renders in the worker's language with the concrete numbers
  (days available, days requested, the split), never a generic refusal (FR-DSK-003,
  CC-6).

**FR-LV-013 — Span expansion: from a date range to ledger days and day statuses. (P0)**
Expansion is a pure function of (span, units, roster, holiday calendar, sandwich
setting, rule version). It runs once at approval and is replayed, never re-decided, on
recompute.

1. Enumerate calendar days from start to end inclusive.
2. Classify each day from the roster and calendar: working day, rostered weekly rest
   day, holiday (FR-SHF-004), or a day the employment does not cover.
3. Apply the type's `counts_non_working_days` rule and the tenant sandwich setting
   (FR-ATT-021 AC3) to decide which non-working days inside the span are debited.
4. Apply units: a boundary half-day debits 0.5 and leaves the other half of that day
   to attendance, which must then pair the actual punches for the worked half
   (FR-ATT-037) — the day is simultaneously a half `AVAIL` row and a half worked
   session, and both appear on the Form IX cell per `form_ix_half_day_rule`
   (FR-ATT-033 AC3, parameter empty until §09.14-A14 reports).
5. Emit one `AVAIL` row per debited day, and mark the non-debited non-working days
   inside the span as such so the register shows why they were not debited.
6. Re-derive `DayStatus` for every day touched.

- **AC1:** Expansion is idempotent: re-running it for an unchanged approval produces
  the identical row set (CC-1).
- **AC2:** A span crossing a leave-year boundary debits each day against the year its
  own date falls in, with no special case at the boundary (FR-LV-008 AC2).
- **AC3 — Punch on an approved leave day.** A punch arriving on a day with an approved
  `AVAIL` row is never discarded and never silently converts the day. It raises a
  `punch-on-leave` exception whose resolutions are exactly: cancel the leave for that
  day (an `AVAIL_REVERSAL` through the normal cancellation transition), record the day
  as on-duty (FR-REG-003), or keep the leave and retain the punch as an unreckoned
  event with a recorded reason. The choice is a human's and is audited.
- **AC4:** Where the span covers a rostered rest day that the worker in fact worked
  (the punch-on-leave case on a rest day), the rest-day consequences still apply — the
  substituted-rest-day obligation and the OT line (FR-SHF-002 AC3, FR-OT-009) are not
  suppressed by the presence of a leave row.

> **Worked example — a six-day span with a half-day boundary, a Sunday and a festival
> holiday.** Span: Thu 24 Sep to Tue 29 Sep 2026. Thursday is a **half-day** EL,
> Sunday 27 Sep is the rostered weekly rest day, Monday 28 Sep is a festival holiday
> on the establishment's state calendar. Roster: Mon–Sat six-day week.
>
> | Day | Classification | Sandwich OFF — debited? | Sandwich ON — debited? |
> | --- | --- | --- | --- |
> | Thu 24 | Working, half-day EL | 0.5 | 0.5 |
> | Fri 25 | Working | 1.0 | 1.0 |
> | Sat 26 | Working | 1.0 | 1.0 |
> | Sun 27 | Weekly rest day | 0 | 1.0 |
> | Mon 28 | Festival holiday | 0 | 1.0 |
> | Tue 29 | Working | 1.0 | 1.0 |
> | **EL debited** | | **3.5 days** | **5.5 days** |
>
> The half-day on Thursday leaves the other half to attendance: the worker punches IN
> 09:00 and OUT 13:30, pairing produces one session, and the day carries a 0.5 `AVAIL`
> row and a worked session at once. The paid-days invariant (FR-ATT-021 AC2) holds
> under both settings — what changes is which bucket Sunday and Monday sit in, and
> therefore the EL balance. The setting is labelled on the request, on the ledger rows
> and on the payslip's leave summary, because it is a pay decision (FR-ATT-021 AC3);
> this example differs from the one under FR-ATT-021 in that there the bracketing days
> were unauthorised absence, here they are approved leave — the two must not be
> configured by one switch unless the tenant says so explicitly.

> **Negative cases — requests that must not succeed.**
>
> | # | Attempt | Required behaviour |
> | --- | --- | --- |
> | N-LV-1 | Approver approves their own request | Refused — the requester is excluded from their own chain (FR-REG-009 AC1), whoever they are |
> | N-LV-2 | Request submitted for days inside a locked period | BLOCK at V6, with the retro path offered; the ledger is untouched |
> | N-LV-3 | Two overlapping requests submitted in the same second from two devices | One succeeds, the second fails V5; the hold is the serialisation point, not the screen |
> | N-LV-4 | An import attempts to create APPROVED requests without transitions | Refused — state is derived from transitions (FR-LV-011 AC4); migration uses `OPENING` rows and FR-LV-017 |
> | N-LV-5 | A maternity request for a variant whose parameters are empty | Not shortened and not guessed: V11 warns, routes to HR, and the case is recorded (FR-LV-003 AC2) |
> | N-LV-6 | A tenant sets an SL grant below a published state floor | Flagged at configuration, not at application time (FR-LV-001 AC2) |
> | N-LV-7 | The assistant submits a leave request it drafted | Refused — drafts require explicit human submission (FR-REG-005 AC1, CC-2) |
> | N-LV-8 | A cancellation posted for a day already consumed and locked | Refused as a cancellation; offered as a retro regularization (FR-LV-010 AC2) |

---

### 09.7-C The leave-year close, encashment, and the exit close-out

Three moments turn leave into money or lose it, and all three are where a leave module
is audited: the annual close, an encashment, and the last payslip. The rule that holds
all three together is FR-LV-008 I7 — **this module counts days, §08 prices them.**

**FR-LV-014 — The leave-year close is an ordered, idempotent, reopenable job. (P0)**
The leave year is per type (`leave_year_basis.<type>`: calendar, financial or
employment-anniversary — a tenant setting with no statutory source captured, so it
ships required-and-unset rather than defaulted). The close runs in this order and in no
other, because each step consumes the previous step's output:

1. **Finalise accrual** for the year, including any late-arriving worked-day
   corrections (FR-LV-002 AC1).
2. **Settle open requests** that span the boundary — days already split by FR-LV-013
   AC2 need nothing; requests still PENDING are listed for decision and block the
   close for that employment.
3. **Apply encashment elections** made under the type's `el_encashment_rule` where the
   parameter is published (FR-LV-015).
4. **Cap the carry-forward** at `el_carry_forward_cap_days` or the type's cap.
5. **Post `LAPSE`** for the excess with its reason.
6. **Post `CLOSE_OUT` and `OPENING_CF`** so that the closing year sums to zero and the
   new year opens with an explicit, attributable figure.

- **AC1:** The close is idempotent — re-running it for a closed year posts nothing and
  reports what it would have posted.
- **AC2:** A close cannot run for an employment with an unresolved step-2 request; the
  list is actionable, per employment, and visible before the close date.
- **AC3:** Where the type's cap parameter is empty (CC-9), the close **carries the full
  balance forward** and raises `leave-close-cap-missing` as a warning-class item. It
  never lapses a day on an assumed cap — lapsing on a guess destroys an entitlement
  and is not recoverable from the ledger's own evidence.
- **AC4 — Reopen.** A closed year reopens only through an explicit, maker-checker
  reopen that names the reason; the reopen reverses steps 6, 5 and 4 in that order,
  allows the correction, and re-runs the close. Every reopened close is listed in the
  §09.13-A instrumentation.

**FR-LV-015 — Encashment: the ledger counts, §08 values. (P1)**
Encashment removes days from the ledger and hands a **day count and a valuation basis
reference** to payroll. This module never computes a rupee figure for leave.

- **AC1:** An approved encashment posts `ENCASHMENT` rows and emits to §08: the day
  count, the leave type, the effective date, the basis reference (which wage base
  under §06.10) and the governing divisor rule. §08 prices it under the pay group's
  day-rate convention (§08 FR-PAY-109) and rounds under §08 FR-PAY-209.
- **AC2:** Where a published statutory encashment rule exists for the jurisdiction
  (`el_encashment_rule`, empty until §09.14-A1 reports), **that rule's divisor
  governs** and the pay-group convention does not apply; the payslip and the ledger
  row both name which rule was used, so the two can never be confused after the fact.
- **AC3:** An encashment is refused where the type's `el_encashment_rule` is empty
  **and** the tenant has not recorded an explicit policy basis — not because
  encashment is unlawful, but because an unlabelled valuation cannot be defended.
- **AC4:** Encashment days leave the balance at the encashment's effective date; they
  are never also available for application (I2 covers this, since the rows post
  immediately).

> **Worked example — the same 8.5 days, three different rupee answers, one ledger.**
> A worker with an **illustrative** monthly statutory base of ₹26,000 — the same
> illustrative figure used in FR-OT-001's example, not a sourced wage — encashes
> **8.5 EL days**. The ledger posts `ENCASHMENT` −8.5 and hands §08 the count.
>
> | Valuation route | Divisor | Arithmetic | Amount |
> | --- | --- | --- | --- |
> | Pay group on C1 · Fixed 30 (§08 FR-PAY-109) | 30 | ₹26,000 ÷ 30 × 8.5 | **₹7,366.67** |
> | Pay group on C2 · Calendar days, in a 31-day month | 31 | ₹26,000 ÷ 31 × 8.5 | **₹7,129.03** |
> | A published state encashment rule with its own divisor | That rule's | Not computed here — AC2 routes it to the rule | Governed by the rule |
>
> The point of the table is the invariant, not the rupees: **the day count is identical
> in all three rows.** Anything that changes the amount lives in §08 and §06, is
> printed on the payslip, and is versioned there. If this module ever carried its own
> divisor, a tenant switching pay-group convention would silently restate historical
> encashments — and §08's own warning about stored day rates (FR-PAY-109) would be
> defeated from the outside.

**FR-LV-016 — Exit close-out: the ledger closes to zero and the F&F reconciles. (P0)**
On an exit date being recorded, the module runs a close-out that must leave no open
leave object behind.

- **AC1 — Ordered close-out.** (i) Cancel pending requests dated after the exit date,
  reason `exit`, holds released. (ii) Truncate approved spans at the exit date,
  reversing only the days after it (FR-LV-010 AC3). (iii) Finalise accrual to the exit
  date. (iv) Expire unused comp-off, with its reason. (v) Apply encashment or lapse per
  type. (vi) Emit the residual: a positive balance as an encashment day count
  (FR-LV-015), a negative balance as a recovery day count.
- **AC2:** The F&F statement's leave lines reconcile **exactly** to the ledger's
  close-out rows — same day counts, same types, same effective dates. A mismatch is a
  hard exception, not a rounding note.
- **AC3:** A negative balance at exit is handed to §08 as a recovery day count with
  its basis reference; §08 decides whether the recovery can be taken from the final
  payment and applies its own negative-net guard (§08 FR-PAY-1004). This module never
  nets a recovery against an encashment itself — they are separate lines, both
  auditable.
- **AC4:** Open obligations that are not leave still surface at exit: an
  `OPEN_AT_EXIT` substituted-rest-day obligation (FR-OT-009) and any undecided OT line
  (FR-OT-010) are listed on the same close-out screen, because a departing worker is
  precisely when they stop being recoverable.
- **AC5:** After close-out, the employment's leave balance is zero for every type and
  the ledger is sealed against new rows except through retro (FR-LV-009 AC4), so a
  later correction is visible as a retro diff rather than a re-opened balance.

> **Test scenarios — close, encashment and exit.**
>
> | # | Given | When | Then |
> | --- | --- | --- | --- |
> | T-LC-1 | A year-end with `el_carry_forward_cap_days` empty | The close runs | Full balance carried, `leave-close-cap-missing` warning, zero `LAPSE` rows (AC3) |
> | T-LC-2 | The same close re-run | It runs again | Nothing posted, a report of what it would have posted (AC1) |
> | T-LC-3 | A request spanning 30 Dec–2 Jan on a calendar leave year | It is approved | Days debit to their own years; no boundary special case (FR-LV-013 AC2) |
> | T-LC-4 | An encashment where both a published statutory rule and a pay-group convention exist | §08 prices it | The statutory divisor governs and both the row and the payslip name it (AC2) |
> | T-LC-5 | An exit on the 14th with leave approved to the 20th | The exit is recorded | Days 15–20 reverse, days to the 14th stand, holds released (AC1) |
> | T-LC-6 | An exit with EL +4.0 and CL −1.5 | Close-out runs | Two separate lines to §08 — a 4.0-day encashment and a 1.5-day recovery — never one netted figure (AC3) |
> | T-LC-7 | An exit with an `OPEN_AT_EXIT` rest-day obligation | Close-out runs | The obligation is listed on the close-out screen and survives in the register (AC4) |
> | T-LC-8 | A retro correction two months after close-out | It is applied | A retro diff with an arrears line, not a reopened balance (AC5, FR-REG-007) |

---

### 09.8 Regularization & approval workflows

Regularization is the release valve that keeps attendance correct without turning
every missing punch into an LOP dispute. It is also, done well, a major deflection
and satisfaction lever for the frontline.

**FR-REG-001 — Employee-initiated regularization for exceptions. (P0)**
A worker (or supervisor on their behalf) can raise a regularization for a missing
punch, wrong shift, geo-flag, or on-duty/field day, attaching a reason and
optional evidence, routed to the configured approver.

- **AC1:** Every regularization names the specific date(s) and the exact before/
  after status/hours it proposes; approval applies exactly that, recomputes the
  day (FR-ATT-001), and writes the audit entry.
- **AC2:** A regularization cannot alter a locked period except via the retro run
  (FR-ATT-001 AC3).
- **AC3:** SLA/aging: un-actioned regularizations are visible to the next-level
  approver and block period-lock if unresolved (FR-ATT-022).

**FR-REG-002 — Configurable multi-level approval chains. (P0)**
Approval routing supports role-, hierarchy-, and site-based chains, delegation
(approver on leave), and auto-approval/auto-escalation on timeout, all
effective-dated.

- **AC1:** A change to the approval chain does not retro-alter the approver
  recorded on already-decided requests.
- **AC2:** Delegation is time-bounded and audited (who delegated to whom, when).

**FR-REG-003 — On-duty / field-work regularization. (P0 for field/deskless)**
Field staff who never touch a terminal mark on-duty (client visit, delivery route)
which counts as present without a site punch, subject to approval and optional
geo-trail.

- **AC1:** OD days are distinct from present-by-punch in the register and can be
  reported on separately (auditors and clients ask); they populate Form IX column
  (10), "brief details of tour or assignment outside the work place" (EV-055).

**FR-REG-004 — Bulk regularization for site-level events. (P0)**
When a terminal was down for a day or a whole shift was misrostered, a supervisor
regularizes many workers at once with one reason, individually auditable.

- **AC1:** A bulk action expands to per-employee ledger entries each carrying the
  shared reason plus the individual before/after — no aggregate-only records.

**FR-REG-005 — AI-assisted, human-decided. (P1)**
The assistant may draft a regularization from context (device-down window + the
worker's usual pattern), pre-fill the reason in the worker's language, and rank an
approver's queue — but the **decision and the resulting hours are human/rules
outputs**, never model-generated (§12). This is a deflection lever consistent with
"AI is cost-of-goods, not the revenue line" (§13).

- **AC1:** Any AI-drafted regularization is clearly labelled as a draft and
  requires explicit human submission and approval; the model never writes to the
  ledger directly.

### 09.8-A Regularization, specified — the transition table, the post-lock path and bulk semantics

FR-REG-001 to FR-REG-005 fix what regularization is for. This subsection fixes its
machine, because regularization is the one surface in the module that can change a
statutory figure **after** the fact: it moves paid days, which moves NCP days, which
moves the ECR (§09.10-A, EV-035). Part E-1 applies — event, guard, side effect, who may
trigger — and its post-lock rule applies twice over: a correction to a locked period is
**a diff, never a mutation**.

<!-- DIAGRAM: fr-attendance-regularization-states -->

**FR-REG-006 — The regularization state machine. (P0)**

| From | Event | Guard | Side effect | Who may trigger |
| --- | --- | --- | --- | --- |
| — | `raise` | The named day has an open exception, or the tenant permits unprompted raises for that reason code | Request in DRAFT with the exact before/after it proposes (FR-REG-001 AC1) | Worker; supervisor or HR on their behalf, recorded as such; the assistant may draft only (FR-REG-005 AC1) |
| DRAFT | `submit` | Reason code set, evidence attached where the code requires it, the day is not inside a locked period | State PENDING, routed to level 1, the day's exception marked `regularization-pending` | Creator |
| DRAFT | `submit_locked_day` | The day **is** inside a locked period | State PENDING_RETRO — the same approval chain, a different application path (FR-REG-007) | Creator, where the tenant permits retro raises |
| PENDING | `approve_level` | Approver in the effective chain, not the requester, not the subject (FR-REG-009) | Level recorded; stays PENDING while levels remain | Approver or time-bounded delegate |
| PENDING | `approve_final` | Last level | State APPLIED: the proposed before/after is written as a dated correction event, the day re-derives, the audit entry names actor, time, before, after and `rule_version` | Final approver |
| PENDING | `reject` | Reason recorded | State REJECTED; the day keeps its original derivation and its exception stays open | Any approver in the chain |
| PENDING | `withdraw` | Not yet applied | State WITHDRAWN; exception reverts to open | Creator |
| PENDING | `timeout` | `reg_approval_timeout_h` elapsed | State ESCALATED, next level notified; no auto-decision (FR-REG-002) | Engine |
| ESCALATED | `approve_final` / `reject` | As PENDING | As PENDING | Escalation approver |
| PENDING / ESCALATED | `lock_attempt` | The period is being locked with this item open | Lock is blocked (FR-REG-001 AC3, FR-ATT-022 AC1); a forced lock records the item and the forcing actor | Payroll admin |
| PENDING_RETRO | `approve_final` | Last level, and a retro run exists or is created | State APPLIED_RETRO: a retro diff is emitted (FR-REG-007), never an edit of the locked projection | Final approver, plus the retro run's own authority (§08) |
| APPLIED | `supersede` | A later regularization for the same employment-day is applied | State SUPERSEDED; both remain readable and the day shows its correction chain | Engine |
| APPLIED | `reverse` | An applied regularization was itself wrong and the period is still open | A compensating correction event, state REVERSED; the original is never deleted | HR under maker-checker |
| APPLIED_RETRO | `reverse` | — | A further retro diff, never a mutation of either the locked projection or the prior diff | HR under maker-checker, through §08 |
| Any non-terminal | `punches_erased` | The day's punches have passed their retention class and been tombstoned (FR-ATT-001) | The request is closed as `UNRESOLVABLE_SOURCE_ERASED`; the frozen register row stands and says so | Engine |

- **AC1:** The engine never auto-approves a regularization, on timeout or otherwise.
  Escalation moves the queue; only a human moves the hours.
- **AC2:** A regularization names exactly one employment and one or more specific
  dates, and carries the precise before/after for each — never "fix my month".
  Approval applies exactly what was shown to the approver, and the approval snapshot
  records it (FR-REG-001 AC1).
- **AC3:** State is derived from the transition log (CC-1, CC-5); an import cannot
  create an APPLIED regularization without its transitions.
- **AC4:** A regularization that would create or change overtime does not decide the
  OT itself: it changes the worked session, and the OT line is then produced and
  approved through the OT path (FR-OT-010), so an approver of attendance never becomes
  an approver of OT wages by side effect.

**FR-REG-007 — The post-lock path: a diff, never a mutation. (P0)**
Correcting a locked period is the mechanism that keeps the filing thesis honest — the
filed figures must stay exactly as filed while the corrected figures become visible and
payable.

- **AC1:** Approval of a PENDING_RETRO item produces four artefacts and nothing else:
  (i) a **retro attendance diff** — the day, the before, the after, the rule version in
  force *for that day*, never today's (FR-ATT-001 AC3, CC-3); (ii) an **arrears input
  to §08**, which decides the money and the wage month it lands in; (iii) a **new
  register version** for the affected month with its diff retrievable against the
  version originally produced (FR-STAT-002 AC1); (iv) an audit entry.
- **AC2:** The locked period's `DayStatus`, paid-days, NCP days and frozen `FormIXRow`
  values are **not** rewritten. Downstream consumers that already filed against them
  continue to reconcile against what was filed; the diff is what reconciles the
  difference (§09.10-A).
- **AC3:** Where the retro changes NCP days or paid days for a month whose EPF return
  has been **approved**, this module raises the correction to §08 as a filing-impact
  item rather than a quiet number change, because an approved return can never be
  cancelled and the available correction routes are constrained by return type
  (EV-036, EV-037, §08). This module states the impact; §08 and §22 own the route.
- **AC4:** Where the retro changes a wage-month figure for a month whose **payment has
  already been initiated**, the item is flagged as past the verification gate — the
  gate sits immediately before payment initiation (Part E-1, EV-037) — so the operator
  sees that the cheap correction window has closed before they choose a route.
- **AC5:** A retro diff is itself immutable; correcting a retro produces a further
  diff. There is no path by which any locked figure is edited in place, and an
  automated check asserts this over the write path (mirrors CC-2's scan).

**FR-REG-008 — Bulk regularization: preview, commit, per-row outcomes. (P0)**
FR-REG-004 fixes that bulk actions expand to per-employee entries. The failure modes
are partial application and silent skipping, both of which corrupt a month quietly.

- **AC1 — Two phases.** A bulk action is always **preview then commit**. The preview
  resolves the target set and shows, per employee-day, the proposed before/after and
  any row that will be skipped with its reason. The commit applies exactly the
  previewed set, identified by a preview id; a target set that has changed since the
  preview causes the commit to fail and re-preview rather than apply a different set.
- **AC2 — Skip rules, explicit and enumerated.** A row is skipped, never silently
  overwritten, when: the day is inside a locked period (it is offered as a retro batch
  instead); the day already has an APPLIED regularization (superseding is an explicit
  choice, not a bulk default); the employment was not active that day; the day belongs
  to a different establishment than the one the actor is acting for; or the day's
  punches have been erased (FR-REG-006, `punches_erased`).
- **AC3 — Per-row audit.** Each applied row writes its own audit entry with the shared
  reason plus its individual before/after; there is no aggregate-only record
  (FR-REG-004 AC1). The batch itself is an object with its own id, actor, reason,
  preview id and row outcomes, so "who changed 240 days on 14 September" has one
  answer.
- **AC4 — Idempotency and size.** A commit is idempotent on its preview id: a retried
  call applies nothing further. `bulk_reg_max_rows` bounds a single batch; above it the
  action is refused with a message to split it, so that one mis-scoped action cannot
  silently restate an establishment-month.
- **AC5 — Contract labour.** A bulk action never crosses a `ContractorLink` boundary
  by default: a supervisor acting for the principal cannot bulk-regularize another
  contractor's workmen, because their paid days route to a different EPF/ESI code
  (FR-CL-003) and a mis-scoped batch corrupts two establishments' returns at once.

**FR-REG-009 — Authority: who may raise, approve and apply, and the self-approval bar. (P0)**
The permissions model itself is §07's (roles × objects × actions, with maker-checker
points); this requirement states only the attendance-specific constraints that the
model must be able to express.

- **AC1:** The subject of a regularization and its creator are both excluded from its
  approval chain, at every level, including where the subject is the tenant's most
  senior user. Where exclusion empties the chain, the item routes to the tenant's
  configured fallback approver and the fact is recorded — it is never auto-approved.
- **AC2:** Applying to a **locked** period requires the retro authority (§08), not the
  attendance-approval authority. The two are separable roles, because the second is
  routinely delegated to site supervisors and the first must not be.
- **AC3:** Delegation is time-bounded and audited (FR-REG-002 AC2); a delegate's
  approval records both the delegate and the delegating approver, and delegation
  cannot be used to defeat AC1.
- **AC4:** A bulk action above a tenant-configured row count requires maker-checker —
  the second person sees the preview, not a summary.

**FR-REG-010 — Reason codes, and their link to the register's explanation. (P0)**
A regularization's reason is not free text at the bottom of a form: it is the value
that ends up explaining a day to an inspector. The reason-code set is tenant-extensible
but its mapping to the Form IX cell's `explanation_code` (FR-ATT-033) is fixed, so that
the register never carries an explanation the audit trail cannot support.

| Reason code | Typical trigger | Evidence required | Form IX effect |
| --- | --- | --- | --- |
| `device-down` | The terminal was offline or faulty for a window (FR-DEV-012) | The device's own health record — attached automatically, not typed | Cell becomes PAIRED with the approved times, explanation names the device window |
| `missed-punch` | The worker worked but did not punch one side | Supervisor attestation | PAIRED with approved times, explanation `missed-punch` |
| `off-site` | Client visit, delivery route, field day (FR-REG-003) | Per tenant policy; geo-trail where enabled (FR-LOC-001) | Column (10) tour or outside-assignment detail (EV-055) |
| `roster-error` | The worker was rostered to the wrong shift or site | The corrected roster reference | Shift and place-of-work columns re-derive |
| `kiosk-queue` | Shared-device queue at shift change (FR-DSK-002) | Site attestation | PAIRED, explanation names the queue window |
| `network` | Offline capture that failed to sync (FR-DSK-001) | The queued packet, where it later arrives | PAIRED from the recovered capture time, not the sync time |
| `leave-correction` | A day that should have been leave, or should not have been | The leave request reference | Cell becomes the leave state; the ledger moves through FR-LV-011, not through this path |
| `waiver` | A day an approver explicitly accepts as unexplainable | Reason text, mandatory | Cell becomes EXPLAINED with the waiver recorded (§09.10-B) |

- **AC1:** Every code maps to exactly one Form IX cell outcome; a tenant-added code
  must declare its mapping before it can be used, and a code with no mapping cannot be
  saved.
- **AC2:** `leave-correction` never moves the leave ledger from inside this workflow;
  it links to a leave transition, so the two logs stay reconcilable (FR-LV-008 AC1).
- **AC3:** `waiver` is the only code that resolves a cell without asserting a time, and
  its use is a reported figure in §09.13-A — a site whose waiver rate climbs is a site
  whose capture is failing.

> **Negative cases — regularizations that must not succeed.**
>
> | # | Attempt | Required behaviour |
> | --- | --- | --- |
> | N-RG-1 | A supervisor approves a regularization they raised for themselves | Refused at both ends by FR-REG-009 AC1; the attempt is audited |
> | N-RG-2 | A bulk commit replayed after a network timeout | Applies nothing further — idempotent on the preview id (FR-REG-008 AC4) |
> | N-RG-3 | A regularization that would add 3 OT hours, approved by a site supervisor without OT authority | The session changes; the OT line is created `OT-pending` and waits for OT approval (FR-REG-006 AC4, FR-OT-010) |
> | N-RG-4 | A regularization applied directly to a locked month by an attendance approver | Refused — retro authority is separable (FR-REG-009 AC2); the item is offered as PENDING_RETRO |
> | N-RG-5 | A retro that edits the frozen `FormIXRow` in place | Structurally impossible: the retro writes a new version with a diff (FR-REG-007 AC1, FR-ATT-033 AC6) |
> | N-RG-6 | A regularization raised for a day whose punches have been erased | Closed as `UNRESOLVABLE_SOURCE_ERASED`; the frozen row stands (FR-REG-006) |
> | N-RG-7 | A bulk action spanning two contractors' workmen | Rows outside the actor's `ContractorLink` scope are skipped with a reason (FR-REG-008 AC5) |
> | N-RG-8 | The assistant applies a regularization it drafted, unattended | Refused — model output never writes to the ledger (FR-REG-005 AC1, CC-2) |

> **Test scenarios — regularization.**
>
> | # | Given | When | Then |
> | --- | --- | --- | --- |
> | T-RG-1 | A `missing-out` exception on the 8th, period open | Approved on the 12th | Day re-derives, audit names before and after, exception closes, no retro created |
> | T-RG-2 | The same day, period locked and payment initiated | Approved as PENDING_RETRO | Retro diff + arrears input + new register version + the past-the-gate flag (FR-REG-007 AC4) |
> | T-RG-3 | A device-down window covering 140 workers | Bulk preview then commit | 140 per-row audit entries, one batch object, device health attached automatically (FR-REG-010) |
> | T-RG-4 | The same batch with 6 of the 140 already regularized | Preview runs | Those 6 shown as skips with reasons, and the commit applies 134 |
> | T-RG-5 | Two regularizations for the same employment-day, both approved | The second applies | First SUPERSEDED, both readable, the day shows its correction chain |
> | T-RG-6 | An approved regularization later found wrong, period still open | Reversed | Compensating correction event, REVERSED state, original intact |
> | T-RG-7 | A period lock attempted with 3 items PENDING | Lock is run | Blocked; a forced lock records the 3 items and the forcing actor (FR-ATT-022 AC1) |
> | T-RG-8 | A `waiver` code used on 11% of one site's cells in a month | The month closes | Permitted, and the waiver rate is reported (FR-REG-010 AC3, §09.13-A) |

---

### 09.9 Frontline / deskless constraints

These are not accessibility footnotes — they are the difference between winning
and losing the 50–200 revenue-core deals, which are disproportionately
manufacturing, retail, logistics and hospitality.

<!-- DIAGRAM: offline-capture-sync -->

**FR-DSK-001 — Offline-first capture. (P0)**
The mobile and kiosk apps capture punches and leave applications **offline**,
queue them durably on-device, and sync on reconnect with conflict-safe
reconciliation. Low-connectivity plant floors, basements, and rural sites are the
norm, not the exception.

- **AC1:** A punch made with no network is not lost; it syncs and is timestamped
  with the *capture* time (device-local + skew-corrected), not the sync time.
- **AC2:** The worker gets local confirmation of a successful offline punch (they
  will not trust an app that shows nothing).
- **AC3:** Sync is bandwidth-frugal (deltas, compressed) for 2G/3G and metered
  connections.

**FR-DSK-002 — Shared-device identity separation. (P0)**
On any shared device (kiosk, supervisor phone), no worker can view or modify
another worker's attendance, balance, payslip or personal data. Reinforces
FR-ATT-013. **[Verified]** worker identity ≠ device identity is the structural
reason (Source: Comprehensive Annual Modular Survey 2023, r2; FR-ATT-013).

- **AC1:** Each interaction on a shared device is scoped to the single authenticated
  worker and clears on completion/timeout.

**FR-DSK-003 — Vernacular UI, worker-facing surfaces. (P0)**
All worker-facing screens, prompts, notifications and the WhatsApp flow render in
the worker's chosen language (at minimum Hindi + the major state languages —
Marathi, Tamil, Telugu, Kannada, Bengali, Gujarati; expandable). Admin/CA
surfaces may remain English.

- **AC1:** Language is a per-worker setting, defaulting from establishment state,
  changeable by the worker at the kiosk without an admin.
- **AC2:** Static UI strings are professionally localized (not machine-translated);
  **[Hypothesis]** dynamic assistant text may be model-translated but statutory/
  monetary values in it are rendered by the deterministic engine, not the model
  (§12). Kill if worker comprehension testing shows model-translated statutory
  terms cause errors — then move those to reviewed static strings.
- **AC3:** Numerals, dates and currency render in Indian conventions
  (DD-MM-YYYY, lakh/crore where appropriate).

**FR-DSK-004 — Low-literacy and low-friction interaction. (P1)**
Frontline flows minimize typing: icon-driven punch, employee-code + selfie,
voice-note reasons for regularization, and confirmation by clear visual/haptic
signal rather than text.

- **AC1:** The core punch is completable in ≤ 2 taps by a first-time user without
  training.

**FR-DSK-005 — Worker-initiated engagement, rate-aware. (P0)**
No frontline onboarding flow assumes employer-push reach. **[Verified]** WhatsApp
cold-start is 250 unique users / 24 h (FR-ATT-015); onboarding sequences a large
site over days and prefers worker-initiated pull (poster QR at the gate, kiosk
enrolment) over broadcast (Source: Meta messaging-limit tiers, r2).

- **AC1:** A 500-worker site can be fully onboarded without ever requiring a
  same-day broadcast to all 500.

**FR-DSK-006 — Terminal-first for frontline, by design. (P0 posture)**
For frontline segments, terminal (ADMS push) capture is treated as the primary,
most-reliable path precisely because device ≠ worker identity and connectivity is
weak — the mobile app is complementary, not a replacement. This is why FR-DEV-001
is P0 and non-negotiable for these accounts. Terminal-first is not biometric-first:
card and PIN at the terminal are first-class, and each worker's method is their own
election (FR-ATT-017 AC3).

---

### 09.9-A Contract labour & principal-employer attendance

The revenue-core beachhead is precisely the segments that run heavily on
**contract labour** — auto-components lines, 3PL warehouses, QSR kitchens,
hospitality housekeeping. Ignoring it loses the deal, because the principal
employer's *own* statutory exposure depends on the contractor's attendance and
wage discharge. **[Verified]** the Contract Labour (Regulation & Abolition) Act
1970 is subsumed into the OSH&WC Code, which continues the principal-employer /
contractor / contract-workman construct; the CLRA Central Rules 1971 are superseded
by the OSH (Central) Rules 2026 (r5). **[Reversed]** Earlier drafts said the register
duties continue. The central rules prescribe **no** Register of Contractors or
Register of Workmen; the principal employer's surviving duties are an **annual
return in FORM-XVII Part III** (r.98(9)) and a **wage guarantee**: if the contractor
has not paid within seven days of the end of the wage period, the principal pays
within fifteen days and recovers from the contractor (r.98(8)) (r5, central
sphere). **[Verified]** the applicability threshold is **50 or more** contract
labour on any day of the preceding twelve months, raised from 20, and it latches
(OSH Code s.45, central-sphere text, EV-057, §06.1); the Code itself makes the
principal liable to pay if the contractor short-pays or delays (s.55, per the MoLE
handbook, r3), which r.98(8) operationalises. State-sphere values, forms and the counting
unit are per-state configuration **[Hypothesis]** — validate per state gazette
(§09.14-A9) and check for a corrigendum.

<!-- DIAGRAM: contract-labour-attendance -->

**FR-CL-001 — Model contractor, contract-workman and principal-employer links. (P0
for manufacturing/logistics/hospitality beachhead)**
A worker record carries an **employment type** (`direct` / `contract`) and, when
contract, the contractor entity and its licence/registration reference
(`ContractorLink`, §09.1-A).

- **AC1:** The muster/attendance register distinguishes **direct vs contract**
  labour and can roll up **contractor-wise**, because inspection queries and the
  FORM-XVII Part III contractor-wise table ask exactly that. This is a view over
  Form IX, not a separate contractor register (the central rules prescribe none, r5).
- **AC2:** Contract-workman records are effective-dated so a workman moving between
  contractors, or converting to direct, keeps a clean attributed history.

**FR-CL-002 — Contractor capture with principal-employer read-visibility. (P1)**
Contractors punch their workmen through the *same* capture layer (ADMS/kiosk/app,
§09.2), but the principal employer receives **read visibility** to discharge its
wage guarantee under OSH r.98(8) (the principal pays if the contractor has not paid
within seven days of the end of the wage period).

- **AC1:** A per-contractor, per-period **attendance-vs-wage verification report**
  shows whether contract workmen present on the muster were paid at least the
  applicable minimum wage for those days, and flags the r.98(8) trigger when payment
  is not evidenced within seven days of the end of the wage period.
- **AC2:** The module supplies the attendance-derived input to the principal's
  FORM-XVII Part III annual return — the maximum number of contract labour employed,
  per contractor per month (r.98(9), r5). The return covers the calendar year ending
  31 December and is due, electronically, on or before the last day of the
  following February (r.98(9), central sphere, r5); the other columns of the
  contractor-wise monthly table — contractor name and address, contractor LIN, name
  of the work, amount paid against the wage bill — come from Core HR and payroll,
  not from this module. r.98(9) excepts a contract that undertakes to produce a given
  result; that exception is a per-contract flag on `ContractorLink`, set by the
  principal, never inferred. State-sphere forms are **[Hypothesis]**; validate per
  state (§09.14-A9).

**FR-CL-003 — Contract paid-days route to the correct EPF/ESI code. (P0)**
Contract workmen may sit under the **contractor's own EPF/ESI code** or under the
principal's, per the engagement; attendance-derived paid-days and NCP days
(§09.10-A) must route to the correct code and never merge into the principal's
returns by default.

- **AC1:** Paid-days and NCP days for contract workmen are attributable to the
  correct establishment/PF-and-ESI code for *that* entity's ECR/ESI filing (§06,
  §09.10-A), with the routing driven by `ContractorLink.pf_code / esi_code`.
- **AC2:** A misrouted contract-labour paid-day is a **hard reconciliation
  exception** before lock (FR-ATT-022), because it corrupts two establishments'
  challans at once.

---

### 09.10 The attendance register as a statutory filing output

**FR-STAT-001 — The registers this module feeds, electronic, retained per EV-054. (P0)**
**[Reversed]** Earlier drafts said the regime requires "four registers in electronic
form with five-year retention". **[Verified — central sphere]** The notified rules
prescribe **six employer registers plus a wage slip** across three rule-sets,
reduced to one canonical set by non-duplication provisions (EV-053, §06.9). This
module is the source for **Form IX** Attendance Register-cum-Muster Roll (Wages
r.51(1); OSH FORM-XIV is its equivalent), the overtime columns of **Form IV**, and
the OSH **FORM-XX** register of leave with wages (§09.7). Form numbers are per-state
configuration (EV-053). Retention (EV-054): "five years after the date of last entry"
(Wages r.51(4)) or "five calendar years from the date of last entry" (OSH
r.72(1)(vii), SS r.53(1)(e)); OSH r.76(2) bars destroying the leave register even
after five years unless it has been transferred to a new register; OSH r.72(4) and
SS r.53(3) add a three-kilometre location constraint. State-sphere periods are
unknown and go to counsel (§23).

- **AC1:** **Form IX** renders per establishment per month with **per-day IN and
  OUT timestamps** for days 1–31, shift, place of work, total days worked, total OT
  hours, and tour or outside-assignment details (EV-055). A present/absent or
  day-total rendering fails this AC; the time model therefore keeps per-day IN/OUT
  as retained fields (`FormIXRow`, §09.1-A), not values re-derived from erasable
  punches. The cell states, the freeze and the render are specified in §09.10-B.
- **AC2:** Registers are **tamper-evident** (append-only source events; any
  correction is a new dated entry, never an overwrite) and retained under a
  retention rule keyed to (rule-set, sphere, state), counted from the date of last
  entry — central values from EV-054, state values populated by counsel, never
  below either.
- **AC3:** The OT columns carry OT hours actually worked. The quarterly ceiling is
  advisory and **[Hypothesis]** (FR-OT-001 AC2); the register is a record, never a
  cap enforcer.
- **AC4:** Register format is **effective-dated**: it follows the notified format
  for the period, and the format-selection rule latches per establishment as
  headcount thresholds are crossed (§06 obligation step function).
- **AC5:** **[Hypothesis]** State forms and layouts differ from the central forms;
  validate the notified form for each state/establishment before claiming
  inspection-parity, and check for a corrigendum (§02.4). Two Form IX points are
  unresolved and go to §20: how an electronic register satisfies the per-day
  signature row (the register-keeper signature is footnoted as needed only for a
  physical register), and how a day with several paired sessions fills the single
  IN/OUT cell (parameter `form_ix_multi_session_render`). The SS maternity schedule's
  "in ink" requirement for Form XXII contradicts its electronic permission (EV-054)
  — counsel (§23).

**FR-STAT-002 — Register content survives migration and retro. (P0)**
A register regenerated after a retro/arrears run reflects the corrected figures
*for that period* while preserving the audit trail of what changed.

- **AC1:** A period's register can be reprinted post-correction and the diff
  against the originally-filed version is retrievable.

---

### 09.10-A Attendance as a statutory-filing input — the downstream reconciliations

The section's thesis, made concrete: **attendance is not merely a filing itself
(the register, §09.10) — it is the input that decides five other filings.** A wrong
paid-days count is a wrong ECR, a wrong ESI eligibility flag, a wrong gratuity
year, a wrong maternity eligibility, and a wrong bonus eligibility. This is why
§12's rules-first invariant is absolute for these figures.

<!-- DIAGRAM: attendance-to-filing-map -->

| Attendance-derived quantity | Feeds this filing/right | Rule | Confidence |
| --- | --- | --- | --- |
| **Paid days + NCP (non-contributory) days** | EPF **ECR** (§06.2) | NCP days reduce the wage on which PF is due; "NCP Days" is field 10 of the 11-field ECR record | Field and position **[Verified]** (EV-035); the inclusion list for the count is **[Hypothesis]** — see FR-FIL-001 AC1 |
| **Days worked / wages in contribution period** | **ESI** half-yearly contribution & benefit eligibility (§06.3) | Contribution periods 1 Apr–30 Sep and 1 Oct–31 Mar, with benefit periods 1 Jan–30 Jun and 1 Jul–31 Dec; an employee crossing the wage ceiling mid-period keeps contributing to the end of that period; benefit eligibility is day-count driven | **[Verified]** (Source: esic.gov.in contribution-period table, captured Sep 2026, r1; the qualifying day-counts are parameters from §06.3) |
| **Continuous service (days worked / year)** | **Gratuity** accrual & payment (§06.6, §11.7) | "240 days in a twelve-month period" test (190 for underground mines or establishments working under six days a week; or 120 / 95 days in six months); counted days include lay-off, paid earned leave, temporary disablement from employment injury and maternity leave up to 26 weeks; seasonal establishments use a 75%-of-operating-days test | **[Verified]** (Source: CoSS s.54, read verbatim, r1; §06.6) |
| **4 years + 240 days → rounds to 5** | **Gratuity** *eligibility* | 4y240d treated as 5 completed years | **[Hypothesis]** case-law under the legacy Act, not on the bare Code; followed by some High Courts, not uniformly settled; the case citations earlier drafts gave are carried, not re-captured (§06.6); validate (§09.14-A10) |
| **80 days' qualifying service** within the look-back window `ml_qualifying_window` | **Maternity benefit** eligibility (FR-LV-003) | CoSS Ch. VI (section number not captured) | 80-day figure carried from r3's summary; window and section **[Hypothesis]** — §09.14-A15 |
| **30 days worked in the accounting year** | Statutory **bonus** eligibility (§06.7) | Code on Wages s.26 | **[Verified]** (Source: Code on Wages s.26, read verbatim, r1; §06.7) |
| **LOP / absent days** | Proportionate **payment of wages / minimum wages** (§06) | Paid-days is the pay base | **[Verified]** (Source: Code on Wages 2019) |

**FR-FIL-001 — Attendance publishes paid-days, NCP days and continuous-service
counters to every statutory consumer. (P0)**
There is a **single source of truth** for each derived quantity above; no consumer
re-derives its own paid-days from raw punches.

- **AC1:** NCP days are computed from `DayStatus` (LOP + unauthorised absence per
  EPFO's NCP definition, *not* every non-working day — weekly-offs and paid holidays
  are generally not NCP) and exported to the ECR service (§06.2) as field 10 of the
  ECR record (EV-035). **[Hypothesis]** the precise NCP inclusion list is
  EPFO-defined and occasionally re-clarified — EV-035 fixes the field, not its
  contents; validate against the current ECR help-file and check for a corrigendum
  (§09.14).
- **AC2:** A gratuity **continuous-service counter** is maintained per employee —
  the days CoSS s.54 treats as worked in each twelve-month period, including
  lay-off, paid earned leave, temporary disablement from employment injury and
  maternity leave up to 26 weeks (§06.6) — recomputable and audited, and handed to
  the benefits engine; the attendance module does not itself decide gratuity
  *quantum*.
- **AC3:** ESI **days-worked-in-contribution-period** and the maternity/bonus
  day-count flags are exported as labelled, recomputable figures; each is
  effective-dated against the rule version for the period (CC-3).

**FR-FIL-002 — Zero-attendance still files. (P0)**
A member with **zero paid days** in a period is a filing fact, not a skip: PF may
require a full-month NCP line, ESI a zero-wage treatment, and the register still
carries the worker. The absence of attendance must never become the absence of a
filing line.

- **AC1:** A zero-paid-days month produces the correct nil/NCP line for each
  statutory consumer (ECR, ESI) — the member is **never silently dropped** from a
  return, which is a common failure that triggers inspection queries. (This is the
  member case. An establishment with no active members uses no ECR file at all;
  its charges go through Direct Challan Entry — EV-042, §08.)
- **AC2:** A member on continuous long leave (e.g. maternity, extended sick) is
  carried with the correct paid/ESI-borne split (FR-LV-003, FR-LV-007) rather than
  disappearing from the period's filings.

### 09.10-B The Form IX time model — from punch to frozen cell

§06.9 fixes Form IX's columns, the register instance's lifecycle and its retention
clock, and its close guard requires "every Form IX cell paired or explained" (§06.9,
transition L2). This subsection defines those cell states, how a cell gets its values,
and why the register survives the erasure of the punches behind it (Part E-2: punches
are an erasable class; the register is not).

<!-- DIAGRAM: fr-attendance-form-ix-lineage -->

**FR-ATT-033 — Every Form IX day cell has exactly one state, derived, never keyed. (P0)**
A cell is one (establishment, employee, month, day). Its sessions come from pairing
(FR-ATT-020), anchored to the shift-start date. An employee with no roster for the day
is anchored by `working_day_cutoff_time`, the clock time at which one attendance day
ends for unrostered work — tenant configuration with no statutory source, required
before a site with unrostered employees takes its first punch.

| State | When | Column (7) In / Out | Counts in column (8)? | Column (10) |
| --- | --- | --- | --- | --- |
| PAIRED | At least one complete session anchored to the day | Per `form_ix_multi_session_render` (FR-STAT-001 AC5); every session is stored on the row whatever the render shows | Yes, subject to `form_ix_half_day_rule` for a half-day | The off-site note, where the punch or its regularization carries one |
| EXPLAINED | No session, and one code explains the day: weekly off, holiday, paid leave, LOP or absent, on duty without a punch (FR-REG-003), not yet joined or already left, assigned to another establishment that day (FR-STAT-004), waived | Blank, with `form_ix_non_working_marker` (§06.9) | Only for on-duty | The tour or assignment note for on-duty (EV-055) |
| UNRESOLVED | A session missing its IN or OUT, or a punch that could not be attributed to the employee | The known half; the other blank | No | — |

- **AC1:** A sheet cannot close (§06.9 L2) while any cell is UNRESOLVED; each one is a
  lock-gating item on the pre-lock dashboard (FR-ATT-022), resolved by regularization
  (§09.8) or by a waiver recorded with reason and actor (FR-ATT-022 AC1).
- **AC2:** A waived cell is EXPLAINED with the code `waived`. It renders blank and is
  listed in the provenance annex (FR-STAT-003); it never renders as present.
- **AC3:** Whether a half-day counts as one day or half a day in column (8) is not in
  research. `form_ix_half_day_rule` ships empty and goes to the §20 desk read of G.S.R.
  343(E) with §09.14-A14; until it is set, a month containing a half-day carries a
  warning-class `form-ix-rule-missing` item and column (8) shows the half-day separately
  rather than guessing.
- **AC4:** Cells freeze when every payroll cycle covering the calendar month is locked —
  for a tenant paying 26th to 25th, August freezes only when both the July–August and the
  August–September cycles have locked. Frozen cells hold values (times, sessions,
  explanation codes), never references to `Punch` rows.
- **AC5:** Erasing punches at the end of their retention class (§14.7) leaves every
  frozen cell unchanged. A replay of the month returns the frozen cells flagged
  `source-erased` (FR-ATT-001). The erasure job skips any punch that is still the only
  evidence for a cell in a month not yet frozen.
- **AC6:** A correction after freeze is a retro run (FR-ATT-001 AC3) that writes a new
  `FormIXRow` version with its diff to the prior one (FR-STAT-002) and an amendment entry
  on the register instance (§06.9 L3). The earlier version is never edited.

**FR-STAT-003 — Render in the state's form version, with a provenance annex. (P0)**
The renderer maps frozen cells onto the form version the register instance carries for
its rule-set, sphere and state (§06.9 L1, EV-053). Where that state's form has not been
read and configured, the render is labelled "central form — state form not confirmed"
and no inspection-parity claim is made (FR-STAT-001 AC5).

The **provenance annex** is a separate attachment, not part of the prescribed form. For
each cell it lists: the source of each punch (terminal serial, kiosk, app, web,
supervisor-attested or import), any clock-skew correction with the offset (FR-DEV-012),
the regularization or waiver with its approver and reason, every session where the form
shows fewer, and the adapter version that parsed a terminal punch (FR-DEV-008 AC5). It
answers an inspector's or a worker's question about any cell without reopening punch
data, and still answers it after the punches are erased.

- **AC1:** The annex is rendered from records, never typed, and its hash is carried in
  the §06.9 inspection export alongside the register's.
- **AC2:** The annex never shows verify mode, the method election, consent state or raw
  coordinates. It shows "inside geo-fence *name*" or "outside, approved by *name*". A
  register is not a place to disclose who uses a biometric method (EL-2, EL-5).
- **AC3:** A state form version published after a month has frozen does not re-render
  that month; the month renders in the version in force for it (FR-STAT-001 AC4).
- **AC4:** Electronic maintenance suppresses the register-keeper signature column (11),
  which the form footnotes as required only for a physically kept register (EV-055); the
  print-and-sign mode of §06.9 renders it.

> **Worked example — one worker's August 2026, cell by cell.** A tenant pays 26th to
> 25th; the worker is on a 09:00–18:00 general shift at a site with a face terminal
> that also reads cards. Day 3: sessions 08:00–12:00 and 14:00–19:30 — PAIRED, both
> sessions stored, rendered per `form_ix_multi_session_render`, both listed in the annex.
> Day 9: at a client site all day with no punch — EXPLAINED, on duty, counted in column
> (8), "client site visit" in column (10). Day 12: IN 09:05 and no OUT — UNRESOLVED; the
> worker's regularization for OUT 18:00 is approved on 14 August, and the cell becomes
> PAIRED with the regularization id in the annex. Day 20: the terminal is down and the
> supervisor attests 09:00–18:00 — PAIRED, source "supervisor-attested". Day 27: the
> terminal ran 47 minutes fast — PAIRED at the corrected times, with the raw times and
> the offset in the annex. The sheet freezes after the 26 August–25 September cycle
> locks. Years later the punches' retention class ends and they are erased: every cell,
> the annex and the register's retention clock are unchanged, and the annex still says
> which cell came from a regularization. Nowhere does the annex say the worker punches by
> face.

> **Test scenarios — Form IX cells.**
>
> | # | Given | When | Then |
> | --- | --- | --- | --- |
> | T-IX-1 | One UNRESOLVED cell in August | The operator closes the month | Refused (§06.9 L2); the cell is listed on the pre-lock dashboard |
> | T-IX-2 | A 26th-to-25th tenant; the July–August cycle locked, the August–September cycle open | The August sheet is requested | Rendered as provisional; not frozen (AC4) |
> | T-IX-3 | A frozen month whose punches are then erased | The month is replayed | Frozen cells returned, flagged `source-erased`; register unchanged |
> | T-IX-4 | A waived cell | The register renders | Blank cell; waiver reason and actor in the annex; never shown as present |
> | T-IX-5 | A worker who elected fingerprint | The annex renders | Terminal serial shown; verify mode absent (AC2) |
> | T-IX-6 | A day with three sessions and a single-cell render setting | The register renders | The configured render in column (7); all three sessions in the annex |
> | T-IX-7 | A half-day with `form_ix_half_day_rule` empty | Column (8) renders | The half-day shown separately; warning `form-ix-rule-missing` |
> | T-IX-8 | A state form version published in October for September onward | August is reprinted | Rendered in the August version; no re-render (AC3) |

**FR-STAT-004 — The `FormIXRow`, field by field. (P0)**
One row per employment per establishment per calendar month. It holds values, never
references to punches (FR-ATT-033 AC4), so every field below is readable after the
punches behind it are erased.

| Field | Type | Source | Rule |
| --- | --- | --- | --- |
| `establishment_id`, `register_instance_id` | References | §06.9 L1 | The instance whose rule-set, sphere and state form version the row renders under |
| `employment_id` | Reference | §14 | The row outlives the employment; cells after the date of leaving are EXPLAINED, not yet joined or already left |
| `month`, `register_version`, `form_version_ref` | — | §06.9 | The form version in force for the month (FR-STAT-003 AC3) |
| Columns (2)–(4) | Values | Employee master | As at the last day of the month the row covers, or the date of leaving if earlier |
| Columns (5) and (6), shift and place of work | Values per day | Roster and assignment for each day | Stored per day. Where the form gives one cell per row and the value changed in the month, every value is shown with its dates, under `form_ix_attribute_change_render` — set at the §20 desk read with §09.14-A14 |
| `cells[1..31]` | Structures | FR-ATT-033 | Each holds `cell_state`, `explanation_code`, `sessions[]` (times and source class), `render_in`, `render_out`, `off_site_note` and `provenance_refs[]` |
| Column (8), days worked | Number | Derived from the cells | The counting rules below; a half-day shown separately while `form_ix_half_day_rule` is empty (FR-ATT-033 AC3) |
| Column (9), OT hours | Whole minutes, rendered as hours | The statutory OT lines attributed to the month (FR-OT-011 AC1) | Stored in minutes and never rounded. Rendered per `form_ix_ot_display_format` — hours and minutes, or decimal hours — which ships empty; until it is set the render shows minutes with the unit written out and a `form-ix-rule-missing` warning |
| Column (10) | Text per day | The day's off-site note | FR-REG-003 AC1 |
| `frozen_at`, `freeze_basis[]` | Timestamp, cycle ids | FR-ATT-033 AC4 | The payroll cycles whose locks froze the row |
| `source_erased` | Flag | FR-ATT-033 AC5 | Set when any punch behind the row is erased |
| `prior_version_ref`, `diff_ref` | References | FR-STAT-002 | Set on every version after the first |
| `content_hash` | Hash | Computed at freeze | Carried in the §06.9 inspection export with the annex hash (FR-STAT-003 AC1) |

Counting rules for column (8):

| Cell | Counts as a day worked? |
| --- | --- |
| PAIRED on a working day | Yes, once, however many sessions or shifts |
| PAIRED on a rostered weekly rest day or a holiday | Yes — it is a day worked. A rest day also carries an OT line and an FR-OT-009 obligation; a holiday follows FR-SHF-004 AC1 |
| An overnight session | Once, on its anchor date; the next date's cell stands on its own sessions |
| EXPLAINED, on duty | Yes (FR-REG-003) |
| EXPLAINED, any other code | No |

- **AC1 — Transfers.** An employment that moves between two establishments mid-month
  appears on both sheets. Each sheet's cells outside that establishment's assignment
  period are EXPLAINED, assigned to another establishment, and render blank. Each
  column (8) counts only its own days, and the two sum to the month's days worked — the
  register follows the work location, as jurisdiction does (Part E-5).
- **AC2 — One truth per quantity.** Column (8) is never the paid-days figure and is never
  used as one; paid days come from `DayStatus` (FR-ATT-021), and the two are related,
  not equal (§06.9 reconciliation matrix).
- **AC3 — Cell transitions.** A cell is derived once the day's windows close
  (FR-ATT-037). While the month is provisional, a late punch, an approved regularization,
  a waiver or a leave change re-derives it with an audit entry; UNRESOLVED becomes PAIRED
  or EXPLAINED only through a regularization or a recorded waiver. At freeze the values
  are copied and `freeze_basis` set. After freeze, only a retro run writes, and it writes a
  new version with its diff (FR-ATT-033 AC6); an erasure sets `source_erased` and changes
  nothing else.

> **Test scenarios — the row.**
>
> | # | Given | When | Then |
> | --- | --- | --- | --- |
> | T-IX-9 | A transfer from establishment A to B on the 16th | Both sheets render | Days 16–31 blank on A and days 1–15 blank on B, each coded as assigned elsewhere; the two column (8) figures sum to the month's days worked |
> | T-IX-10 | A PAIRED cell on a rostered Sunday rest day | Column (8) is computed | Counted; the day's OT line and substituted-rest-day obligation exist |
> | T-IX-11 | Thursday 22:00 to Friday 06:15, and a separate Friday shift | Column (8) is computed | Thursday counted once for the overnight session; Friday counted on its own session |
> | T-IX-12 | `form_ix_ot_display_format` empty and 312 OT minutes in the month | Column (9) renders | "312 min", with a `form-ix-rule-missing` warning; nothing rounded |
> | T-IX-13 | A frozen August row; a retro run corrects one cell | The run completes | Version 2 written with its diff; version 1 unchanged; the content hashes differ |

### 09.10-C Cutover — the first lock on a live establishment

Every account this module serves is **already running**: workers are already punching
on installed terminals, a leave balance already exists somewhere, and a register is
already being kept. Go-live is therefore not an empty-database problem, it is a
**continuity** problem, and it is the moment the section's thesis is most exposed — the
first filing produced from our numbers reconciles against months of numbers produced
elsewhere. §16 owns the importers and their YTD tie-out criteria and tolerances; §14
owns the opening-balance data model. This subsection owns only what attendance must be
true before an establishment's **first lock**, and it is deliberately narrow.

Two evidence points shape it. **(a)** The incumbent may have nothing to import:
TallyPrime has **no leave module and cannot calculate leave encashment** by its own FAQ,
and its attendance is manual vouchers (EV-032), so a Tally-sourced tenant's opening
leave balances arrive as a spreadsheet with no system of record behind them. **(b)**
The EPF filing ledger is strictly month-wise chronological and a skipped month blocks
later months (EV-038, Part E-10), so a mid-year cutover must seed what was already
filed elsewhere rather than start counting from one.

<!-- DIAGRAM: fr-attendance-cutover-first-lock -->

**FR-STAT-005 — Register continuity across the cutover date. (P0)**
The statutory register does not restart because the software did.

- **AC1:** Each establishment records a **cutover date**. Register versions produced by
  this product begin at that date; the period before it is marked `register-predecessor`
  with the predecessor named and its custody recorded — who holds it, in what form, at
  which address, because the physical-location constraint is a live obligation (OSH
  r.72(4), SS r.53(3), three kilometres — EV-054) and the retention clock on those
  records runs from **their** last entry, not from ours.
- **AC2:** A cutover **mid-month** produces one month with two provenances. The
  establishment's Form IX for that month renders our cells for days on or after the
  cutover date and marks the earlier days `predecessor-record`, never blank and never
  fabricated from an import. Column (8)'s days-worked total for such a month is
  rendered as two figures with their sum, so an inspector reading one sheet can see
  where the boundary is.
- **AC3:** Imported day-level attendance, where a predecessor system can supply it, is
  loaded as a distinct source (`source_channel = import`, FR-ATT-010) and is **never**
  presented as a punch: it cannot be regularized into a punch, and a Form IX cell built
  from it carries its provenance. Where the predecessor has only day totals — the Tally
  case (EV-032) — the cells it can support are day-total cells, which do **not** satisfy
  Form IX's per-day IN/OUT requirement (EV-055); the month is therefore marked
  predecessor-recorded rather than re-rendered as if it were compliant.
- **AC4:** The **filing ledger is seeded, not started**: for each registration, the
  months already filed with the predecessor are recorded as filed-elsewhere entries with
  their evidence reference, so the per-establishment ledger is unbroken and the
  chronology guard (EV-038, §08) sees the real history rather than an apparent gap. The
  ledger itself belongs to §08 and §22; what this module owes it is the cutover date, the
  establishment's identity, and the attendance months it can and cannot support.
- **AC5:** Nothing in the cutover creates a register version for a period before the
  cutover date. A predecessor month is never re-rendered in our format and never
  re-signed, because we did not keep it.

**FR-LV-017 — Opening leave balances: tie-out, provenance and the unsupported case. (P0)**
Opening balances are the single most disputed figure in a leave migration, because the
worker remembers a number and the spreadsheet holds another.

- **AC1:** Every opening balance enters as an `OPENING` row (FR-LV-008) carrying its
  source file reference, the extraction date, the predecessor system named, and the
  person who signed it off. A balance with no named sign-off cannot be committed.
- **AC2 — Tie-out is exact or it is an exception.** The imported per-employee,
  per-type totals must equal the predecessor's stated closing totals **to the unit**
  (days or half-days — the ledger does not round, I6). Differences are listed per
  employee and per type and must be resolved by an `ADJUSTMENT` with a reason before
  the first lock; they are never absorbed into the `OPENING` row (FR-LV-004 AC3).
- **AC3 — The no-system-of-record case.** Where the predecessor cannot produce closing
  balances at all (EV-032), the tenant supplies a declared balance sheet and signs it;
  the `OPENING` rows are tagged `declared-not-reconciled`, that tag appears on the
  employee's own leave view and on any balance certificate for `declared_balance_tag_display_days`,
  and the §09.13-A instrumentation reports the proportion of an establishment's rows
  carrying it. The product does not pretend a declared figure was reconciled.
- **AC4 — Accrual does not back-fill.** The accrual engine starts at the cutover date.
  It never computes accrual for pre-cutover periods, even where worked-day history was
  imported, because the accrual rule in force then, the worked-day definition then and
  the leave year then are all facts we did not observe (CC-3, CC-9).
- **AC5 — Open requests at cutover.** Leave already approved by the predecessor for
  dates on or after the cutover date is imported as approved `AVAIL` rows with a
  `predecessor-approved` provenance and no transition history; such a request cannot be
  cancelled through the normal machine (it has no transitions) — cancelling it is an
  `ADJUSTMENT` with a reason, so the absence of an approval trail is visible rather
  than invented (FR-LV-011 AC4, N-LV-4).

**FR-DEV-020 — The dual-run window: two servers, one fleet. (P0 for terminal sites)**
A frontline site does not switch attendance systems on a Sunday night. For a bounded
window the same terminals are expected to serve the predecessor and this product at
once, and that window is where punches are lost.

- **AC1:** The receiver tolerates a device that is simultaneously pushing to another
  endpoint: ingest is idempotent on `payload_hash` (FR-ATT-010), and a device replaying
  its buffer to us after the predecessor has already consumed it produces no duplicate
  attendance and no duplicate exception.
- **AC2:** Where a device model cannot push to two endpoints, that fact is a per-model
  entry in the FR-DEV-004 compatibility matrix and the site's cutover plan must choose:
  a hard switch on a stated date, or a parallel capture channel (kiosk or app) for the
  window. The product states the constraint; it does not silently drop a channel.
  Whether a given model supports it is unknown until the bench test reports
  (§09.14-A16, §20 V-11), and unknown is treated as unsupported.
- **AC3:** A dual-run window is a declared object with a start, an end
  (`dual_run_window_days` from its start, tenant-set), and a per-device status.
  While it is open, the pre-lock dashboard shows dual-run devices as a distinct
  exception class, because their data is expected to be incomplete on one side.
- **AC4:** Brownfield templates are **not** adopted as part of a cutover: the
  brownfield flow (FR-ATT-035) runs on its own consent basis with its own window, and a
  device that arrives with templates on it goes through that flow whether or not a
  dual-run is open. Cutover pressure is precisely the circumstance in which a consent
  step gets skipped, so the two objects are kept separate and neither can complete the
  other.
- **AC5:** Closing a dual-run window requires every device in it to be either migrated
  or explicitly decommissioned (FR-DEV-010); a window cannot lapse quietly with devices
  still in it.

> **The first-lock readiness gate.** An establishment cannot run its first period lock
> until every row below is either satisfied or explicitly waived with a named actor and
> a reason, recorded on the establishment. The gate is the attendance half of the
> go-live checklist; §16 owns the payroll and YTD half.
>
> | # | Must be true before the first lock | Where it comes from | If unsatisfied |
> | --- | --- | --- | --- |
> | G1 | Cutover date recorded, predecessor named, custody of the prior register recorded | FR-STAT-005 AC1 | Hard block |
> | G2 | Opening leave balances loaded, tied out or tagged `declared-not-reconciled` with sign-off | FR-LV-017 AC1–AC3 | Hard block |
> | G3 | Every active employment has a work location, and therefore a state, sphere and rule set | §07.2, Part E-5 | Hard block — jurisdiction decides every figure below it |
> | G4 | Every site has its method capability set, and every employment an attendance-method election | FR-ATT-023, FR-ATT-017 AC3 | Hard block |
> | G5 | Devices registered, clock skew inside tolerance, brownfield inventory taken | FR-DEV-003, FR-ATT-035 | Hard block for terminal sites |
> | G6 | Consent records exist for every biometric election, under the regime in force at capture | FR-ATT-029 | Hard block for biometric elections |
> | G7 | Holiday calendar loaded for the establishment's state and year | FR-SHF-004 | Hard block — absent it, day classification is wrong |
> | G8 | Shift definitions and `working_day_cutoff_time` set for unrostered employments | FR-SHF-001, FR-ATT-033 | Hard block |
> | G9 | `ContractorLink` set for every contract workman, with the PF and ESI codes that will receive their paid days | FR-CL-001, FR-CL-003 | Hard block where contract labour exists |
> | G10 | Pay-group day-rate convention chosen in §08 | §08 FR-PAY-109 | Hard block, owned by §08 — listed here because attendance days are meaningless without it |
> | G11 | Filing ledger seeded with months filed elsewhere | FR-STAT-005 AC4 | Warning, and it becomes a hard block at the first statutory generation |
> | G12 | Statutory parameters for the jurisdiction present, or their absence acknowledged | CC-9 | Warning — empty parameters compute nothing and say so; they never stop the lock |
> | G13 | Dual-run windows either closed or declared open with per-device status | FR-DEV-020 AC3, AC5 | Warning while declared; hard block if undeclared devices are pushing |

> **Test scenarios — cutover.**
>
> | # | Given | When | Then |
> | --- | --- | --- | --- |
> | T-CO-1 | Cutover on 16 Sep, Form IX for September rendered | The month closes | Days 1–15 `predecessor-record`, days 16–30 our cells, two column (8) figures and their sum (FR-STAT-005 AC2) |
> | T-CO-2 | A predecessor that supplies only day totals | The import runs | Loaded as `import` source, cells not rendered as per-day IN/OUT, month marked predecessor-recorded (AC3) |
> | T-CO-3 | An imported day total | A supervisor tries to regularize it into a punch | Refused — imported rows are not punches (AC3) |
> | T-CO-4 | Opening balances differing from the predecessor's closing totals for 9 employees | Commit attempted | Blocked; the 9 are listed per type and need `ADJUSTMENT` rows with reasons (FR-LV-017 AC2) |
> | T-CO-5 | A Tally-sourced tenant with no closing balances | Cutover proceeds | Declared balances signed off and tagged; the tag shows on the worker's own view (AC3) |
> | T-CO-6 | Worked-day history imported for the prior year | Accrual runs | No pre-cutover accrual is computed (AC4) |
> | T-CO-7 | A terminal pushing to both systems for 9 days | Buffers replay to us | No duplicate punches, no duplicate exceptions (FR-DEV-020 AC1) |
> | T-CO-8 | A device arriving with 60 templates already on it during a dual-run | It is registered | The brownfield flow runs on its own consent basis; the dual-run does not shortcut it (AC4) |
> | T-CO-9 | First lock attempted with G3 unsatisfied for 2 employments | Lock is run | Blocked, naming the 2 employments |
> | T-CO-10 | First lock attempted with G12 unsatisfied | Lock is run | Permitted, with the `rule-missing` warnings listed on the lock record (CC-9) |

---

### 09.11 Location & geo — a monetizable surface, flagged not built into base

**FR-LOC-001 — Geo-fence and route/location events as an opt-in, metered layer. (P1)**
Geo-fenced punching (FR-ATT-012) is base; **continuous live location tracking** is
a separate, opt-in, separately-metered capability. **[Verified]** greytHR *lists*
GPS Live Tracking as an add-on at **₹140/user/month**, available on Growth or
above, where the marginal seat rate is ₹85 (Essential's is ₹45) (Source: greytHR
pricing page, captured 4 Sep 2026 — documentation read, product not executed; r1).
**[Reversed]** Earlier drafts called this a 3.1× uplift by comparing it with
Essential's ₹45, a tier on which the add-on cannot be bought; against Growth it is
about 1.6×. **[Hypothesis]** that the add-on represents realisable margin for us —
no realised ARPU or willingness-to-pay is validated; route to §20 commercial
validation (§09.14-A5), and commit no location ARPU to any model until it reports.

- **AC1:** Live tracking is off by default, requires explicit tenant enablement and
  worker notice, and its usage is metered per user for billing (§13.9). DPDP s.7(i)
  is not in force until on or about 13 May 2027 (EV-058); continuous tracking raises
  the same least-intrusive-means question as biometrics, so its statutory basis is
  under counsel review (§23).
- **AC2:** Base geo-fence punching does **not** require the paid tracking layer —
  the free capability is not held hostage to the paid one.

---

### 09.12 Non-goals and anti-requirements for this module

Consistent with Draft 1's discipline of recording what was deliberately declined.

| Non-goal | Why | Source |
| --- | --- | --- |
| **Selling attendance hardware** | Devices are roughly ₹4,000–25,000 one-time (review-site guide, not a vendor price list), already installed, no margin/moat, direct channel conflict with dealers who could distribute for us | Draft 1 [No] "Hardware"; r2 |
| **In-house build for the device long tail** | Paid connectors at ~$345 one-time / $588-yr are cheaper than building for SDK-bound/pre-ADMS/air-gapped brands | FR-DEV-005 [Verified] |
| **Face-match as a hard pay gate** | An identity-model error must never become a wage-denial error (rules-first, LLM-last) | §12, FR-ATT-012 AC3 |
| **Model-generated worked hours / OT / leave balances** | Wrong numbers are legal, not UX, problems | §12 Verified |
| **Employer-push mass onboarding on WhatsApp** | 250 unique users / 24 h cold-start; broadcast-first onboarding is architecturally impossible day one | FR-DSK-005 [Verified] |
| **Sizing implementation from the 85–98% device-success figure** | Banned marketing number; integration effort is unsized pending a hardware spike (§20 V-10) | §20.4 [Killed] |
| **Full workforce-management / labour-optimization suite (demand forecasting, auto-scheduling optimization) in v1** | Beachhead needs correct capture + rosters, not WFM optimization; defer to expansion | Scope discipline, §05 |
| **Requiring — or building — Aadhaar biometric authentication for attendance** | Aadhaar auth needs a Parliamentary law or a prescribed purpose (s.4(4)); s.57 omitted 2019; the Good Governance (SWIK) route is per entity and per use case through a sponsoring Ministry, and r4 reads the approval as attaching to the employer, not a horizontal SaaS (an inference, not the instrument's words) — device templates ≠ Aadhaar auth | FR-ATT-017 [Verified], Aadhaar Act ss.4(4), 8; SWIK Rules r.3, as amended 31.1.2025 (r4) |
| **A "biometric only" configuration** | We are not aware of any Indian law requiring biometric attendance as of September 2026 (EV-072); shipping a hard-block setting would manufacture every customer's exposure (Part D-10) | FR-ATT-013 AC3, FR-ATT-017 AC3, §23 |
| **Marketing face-match — or any biometric method — as legally required or as settled-lawful** | Whether s.7(i) will reach biometric means is unresolved (§23); face-match stays advisory-only, never a pay gate | FR-ATT-017, §09.14-A8 |

---

### 09.13 Cross-cutting acceptance criteria (module-level)

These apply across every FR above and are the gates for the module's v1
"done."

- **CC-1 — Determinism:** Given a fixed event log and rule version, every derived
  figure (worked hours, OT bands, LOP, leave balance, register content) is
  reproducible byte-for-byte. No non-determinism from ingestion order, retries, or
  time-of-computation. Where an erasable class has been erased, replay returns the
  lock-time snapshot and says so (FR-ATT-001).
- **CC-2 — Rules-first invariant:** No worked-hour, overtime, leave-balance,
  encashment or paid-day value in any output originates from an LLM. Automated
  scan of the compute path confirms model outputs never write to these fields.
- **CC-3 — Effective-dating everywhere:** OT multiplier and the [Hypothesis] advisory ceiling, leave accrual, shift
  rules, holiday calendars, register formats and geo policies are all effective-
  dated per (state × sphere × establishment type) of the work location and
  retro-recompute against the version in force for the period, not today's.
- **CC-4 — Multi-tenant isolation:** No punch, roster, balance or register crosses
  a tenant boundary; device push endpoints are tenant-scoped and authenticated
  (FR-DEV-001 AC3).
- **CC-5 — Auditability:** Every state-changing action (punch ingest,
  regularization, approval, lock, retro, accrual, adjustment) writes an immutable
  audit entry with actor, timestamp, before/after, and rule version.
- **CC-6 — Frontline-first:** Every worker-facing flow works offline, on a shared
  device, in the worker's language, in ≤ 2 taps for the core action.
- **CC-7 — Filing integrity:** Attendance outputs reconcile exactly to the
  calendar (paid + LOP + off + holiday = period days) before payroll can lock, and
  registers are retained per EV-054 (central sphere: five years from last entry;
  state periods from counsel), tamper-evident.
- **CC-8 — Metering-from-v1:** Per-tenant/per-user usage of paid surfaces
  (location tracking, WhatsApp messaging, connector calls) is attributed from v1,
  while the price is still being discovered (§13.9).
- **CC-9 — Empty, never assumed:** A statutory parameter with no captured source
  (the `el_*`, `ml_*`, `cl_*`/`sl_*`, spread-over, rest-interval, OT-block,
  substituted-rest-day window and Form IX half-day parameters above) ships empty; the one exception is the warn-only
  `ot_quarterly_ceiling_hours` (FR-OT-001 AC2). The engine then raises a `rule-missing`
  warning-class exception for that jurisdiction and computes nothing from an
  assumed value; a tenant policy value may fill the gap only when labelled as
  policy on every output it touches (§06.12 R17, §22).

---

### 09.13-A Module KPIs and instrumentation

These are the observable signals that the module is doing its job — correctness
first (the filing thesis), then frontline adoption, then AI deflection. They feed
the §19 metrics section. Research gives no baseline for any health or adoption figure,
so this section states no numeric target for them: each is a named parameter set by
Product from the first pilots' measured baseline (§19, §20) — the same rule the rest of
the PRD applies to unsized values. Only the invariants, whose target is fixed by
definition, carry one. Each KPI carries the instrumentation that must exist from v1.

| KPI | Definition | v1 target | Gate/type |
| --- | --- | --- | --- |
| **Paid-days invariant pass rate** | % employee-periods where `paid + LOP + off + holiday = period days` before lock | **100%** — by definition of the invariant | Hard gate (CC-7) |
| **Unresolved exceptions at lock** | Open exceptions when a period is locked | **0** (forced-lock logged, FR-ATT-022) | Hard gate |
| **Exception rate** | Exceptions raised per 100 worker-days | `kpi.att.exception_rate_target`, from pilot baseline | Health |
| **Device coverage** | % of active devices seen within the health threshold at lock time | `kpi.att.device_coverage_target`, from pilot baseline | Health (FR-DEV-003) |
| **Punch capture success by channel** | Accepted punches ÷ attempts, per channel | `kpi.att.capture_success_target.<channel>`, from pilot baseline | Health |
| **Offline-sync loss rate** | Offline punches lost vs captured | **0** — FR-DSK-001 AC1 forbids any loss | Hard (FR-DSK-001) |
| **Site onboarding time (frontline)** | Median hours from device/kiosk setup to first clean lock | `kpi.att.site_onboarding_target`, from pilot baseline | Adoption |
| **Vernacular coverage** | % worker-facing interactions served in the worker's chosen language | `kpi.att.vernacular_coverage_target`, from pilot baseline | Adoption (CC-6) |
| **Regularization deflection** | % regularizations resolved without a manager typing free-text (AI-drafted, human-approved) | `kpi.att.regularization_deflection_target`, from pilot baseline | AI COGS lever (§13) |
| **OT-ceiling warning coverage** | Warnings fired ÷ worker-quarters crossing the configured [Hypothesis] ceiling (K-04) | **100%** (no silent crossing) | Advisory — never a block (FR-OT-001 AC2, §06.12 R17) |
| **Statutory-filing input accuracy** | ECR/ESI reconciliation exceptions traced to attendance | Trend to zero over pilots; no interim figure committed | Filing thesis (FR-FIL-001) |
| **Waiver rate** | Cells resolved with the `waiver` reason code ÷ cells resolved by regularization, per site per month | `kpi.att.waiver_rate_target`, from pilot baseline | Health (FR-REG-010 AC3) — a climbing rate means capture is failing, not that approvals are efficient |
| **Leave undecided at the day** | Leave days that began with no decision ÷ leave days applied for | `kpi.att.leave_undecided_target`, from pilot baseline | Health (FR-LV-011 AC1) |
| **Declared-not-reconciled opening balances** | `OPENING` rows tagged `declared-not-reconciled` ÷ all `OPENING` rows, per establishment | Reported, no target — a migration fact, not a defect | Migration transparency (FR-LV-017 AC3) |
| **Reopened leave-year closes** | Closes reopened ÷ closes run, with reasons | Reported; no target committed | Control (FR-LV-014 AC4) |
| **Retro diffs after the return was approved** | Retro attendance diffs for a month whose EPF return is already approved ÷ locked employee-months | `kpi.att.post_filing_retro_target`, from pilot baseline | Filing thesis (FR-REG-007 AC3) — the expensive correction class (EV-036, EV-037) |

- **AC1:** Every KPI above is computable from the event log and audit trail
  (§09.1-A) without a separate analytics write-path — instrumentation is inherent,
  not bolted on (mirrors §13 attribution-from-v1).
- **AC2:** The two hard gates (paid-days invariant, zero-unresolved-at-lock) are
  enforced in the lock flow, not merely dashboarded.

---

### 09.14 Open questions, validation hooks and statutory watch items

Recorded here so they route into the §20 validation programme, the §22 compliance
data pipeline and the §23 counsel register rather than being silently assumed.

| # | Open question | Why it matters here | Resolution path |
| --- | --- | --- | --- |
| A1 | **Leave-with-wages accrual, eligibility, carry-forward and encashment; spread-over; maximum unbroken work and minimum rest interval** — central (OSH Code and Rules, not yet read) and per state | FR-LV-002 and FR-SHF-001 parameters ship **empty** (no seeded value) until the text is read | §20 V-21 (build-blocking desk work): read the OSH Code and OSH (Central) Rules 2026 text first, no field work; then each target state's rules, compiled alongside the §20 V-09 state dataset; gazette + corrigendum check per state |
| A2 | **ESI regime once the one-year saving lapses, on or about 21 Nov 2026** (§06.9) | Maternity↔ESI payment split (FR-LV-003), sickness/ESI interaction | §20 V-08 primary-source watch on ESIC/MoLE (§06.13); effective-dated so it re-points on notification |
| A3 | **Device integration real effort / failure profile** across a mixed fleet, incl. remote template deletion | FR-DEV-001/005/007 implementation sizing; the 85–98% figure is banned | §20 V-10 / V-11 hardware spike (explicit build dependency, currently unsized) |
| A4 | **Meta WhatsApp India rate card** (marketing/utility/service tiers) | FR-ATT-015/FR-DSK-005 per-worker messaging cost | §20 V-12 — capture the rate card before committing any per-worker price |
| A5 | **Willingness to pay for live location tracking** (greytHR lists ₹140 on Growth+, FR-LOC-001) | FR-LOC-001 monetisation | §20 commercial validation; no ARPU committed until it reports |
| A6 | **National & Festival holiday lists per state per year** | FR-SHF-004 calendar correctness | Annual gazette-sourced calendar refresh through the §22 compliance data pipeline |
| A7 | **Sandwich-leave and prefix/suffix norms** — statutory vs contractual | FR-ATT-021/FR-LV-005 LOP correctness | Policy-configurable default-off; confirm no state mandates it before enabling by default |
| A8 | **Biometric attendance legality** — whether s.7(i) will reach biometric means; who owes the SPDI r.5(1) written-consent duty and whether in-app capture suffices; whether the SPDI Rules survive the omission of IT Act s.43A; DPDP r.8(3) retention scope; DPDP access/erasure rights under s.7(i) | FR-ATT-017 consent regime, erasure timing, face-match posture | §23 counsel register; never cite *Dillip Kumar Rout* (K-14) or KVKK 2026/921 (K-15) as authority |
| A9 | **Contract-labour state-sphere threshold, counting unit and forms** (central: 50+, latching, FORM-XVII Part III — EV-057, r5) | FR-CL-001/002/003 for the manufacturing/3PL/QSR core | State OSH gazette per state (extends the A1 dataset); corrigendum check |
| A10 | **Gratuity 4y240d→5 rounding** (the 240-day test itself is CoSS s.54, verified) | FR-FIL-001 AC2 continuous-service counter | Re-capture the case citations (carried, not re-captured, §06.6) and confirm the controlling jurisdiction's position before wiring gratuity eligibility |
| A11 | **State OT rounding / minimum-OT-spell rules; the week and quarter reckoning of the OT tests** | FR-OT-005 AC2 rupee correctness; FR-OT-006 | Per-state gazette in the A1 dataset (§20 V-21); the quarter basis with §20 V-17; do not assume minute-level OT nationally |
| A12 | **State-wise CL/SL floors, pooling and carry-forward** under S&E Acts; the ESI sickness waiting period (`esi_sickness_waiting_days`) | FR-LV-007 statutory-floor enforcement and ESI interaction | Per-state S&E-Act gazette (extends the A1 dataset, §20 V-21); the ESI regulations with §20 V-08; corrigendum check |
| A13 | **144 OT hours per quarter** — secondary summaries only; never confirmed against gazette text; may sit in the OSH rules (K-04) | FR-OT-001 AC2 advisory ceiling | §20 V-17: read the Wages and OSH Central Rules text; warn-only until then (§06.12 R17) |
| A14 | **Form IX electronic signature row, multi-session days and half-days** (`form_ix_multi_session_render`, `form_ix_half_day_rule`) | FR-STAT-001 AC1/AC5, FR-ATT-033 AC3 inspection-parity | §20 desk validation against G.S.R. 343(E); counsel for the signature question (§23) |
| A15 | **Maternity variants not captured** — pre-natal share, third-child and adoption/commissioning entitlements, the 80-day look-back window, nursing-break duration and pay treatment, and the CoSS Ch. VI section numbers | FR-LV-003 parameters (`ml_*`, `nursing_break_*`) ship empty; non-standard cases raise an exception for HR | §20 V-21 (build-blocking desk work): read CoSS Ch. VI and the SS (Central) Rules 2026; publish through the §22 pipeline with citations |
| A16 | **Device packet wire format** — endpoint paths, field names, encodings, batch-ACK granularity, TLS support, and whether each model uploads templates or photos, per make/model/firmware | FR-DEV-008 adapter mapping; the logical contract is fixed, the wire format is not | §20 V-11 bench test against eSSL and ZKTeco; results recorded per model in the FR-DEV-004 compatibility matrix |
| A17 | **The substituted-rest-day window and the rest-day/weekly-test interaction** (`substituted_rest_day_window_days`, `ot_rest_day_counts_in_weekly_test`, `ot_week_start_day`) | FR-OT-006, FR-OT-009 — whether a short week with Sunday work pays OT, and when a substitute is overdue | §20 V-21: re-read Wages (Central) Rules 2026 rr.5–6 in G.S.R. 343(E), then each target state's rules; counsel if the text is ambiguous (§23) |
| A18 | **Templates collected before the product arrived** — whether written consent captured now can cover a template collected earlier, given r.5(1)'s "before collection"; and the bound on `brownfield_response_window_days` | FR-ATT-035 — BF-7 adoption ships off, and the default erases and re-enrols | §23 counsel register, alongside CR-27 (capture form) and CR-09 (erasure timing); `brownfield_adopt_with_new_consent` stays off until counsel answers |
| A19 | **Per-model facts the brownfield and command-channel specs depend on** — `matrix.user_store_query`, `matrix.bulk_template_clear`, per-type command support and results, batch size per poll | FR-ATT-035 inventory completeness; FR-DEV-017 AC3 fallbacks; FR-DEV-018 O6 | §20 V-11 bench test, recorded per model and firmware in the FR-DEV-004 matrix; "unknown" until then, and unknown is treated as unsupported |
| A20 | **Form IX render rules the form leaves open** — `form_ix_ot_display_format` (hours and minutes, or decimal hours) and `form_ix_attribute_change_render` (a shift or place of work that changes mid-month) | FR-STAT-004 column (5), (6) and (9) renders | §20 desk read of G.S.R. 343(E) with A14; each state form checked as it is onboarded (§22) |
| A21 | **Register continuity at cutover** — how a month rendered with two provenances satisfies the register duty, what an incoming employer owes for the predecessor's records given OSH r.76(2)'s bar on destruction and the three-kilometre constraint (EV-054), and whether a predecessor month held only as day totals leaves a gap someone must answer for | FR-STAT-005 AC1–AC3 and AC5; every mid-year go-live in the beachhead meets it | §20 desk read with A14, then the §23 counsel register — no retention or custody period is stated beyond EV-054's central-sphere figures (Part D-11) |

**Statutory-watch discipline (from §02.4 / §22):** the [Hypothesis] OT ceiling, the OT multiplier, leave
accrual and register formats above are all subject to the statutory-change watcher,
which must **catch amendments and corrigenda, not just new instruments** — the same
discipline that inverted the November 2026 EPF analysis twice applies to every
effective-dated attendance rule here.

---

### 09.15 Parameter register — who sets each value this section names but does not state

Every value above that research does not give is a named parameter (Part A rule 2). This
register gives each one an owner, a route and what ships, so that a build team can create
the configuration schema and a reviewer can check that nothing carries an unsourced value.
Tenant settings are the tenant's; statutory values reach the rule store only through the
§22 pipeline with a citation; counsel's values only from counsel. The last column names the
§20.13 family the parameter joins.

| Parameters | Decide | Owner | Route | Ships as | §20.13 family |
| --- | --- | --- | --- | --- | --- |
| `geofence_radius_m`, `gps_min_accuracy_m` | Geo-punch acceptance (FR-ATT-012) | Tenant admin | Tenant configuration | Required per fence | Not routed — tenant setting |
| `kiosk_idle_reset_s`, `enrolment_ticket_ttl_h` | Kiosk reset (FR-ATT-013); ticket validity (FR-ATT-028) | Product | Owner decision before the first pilot, logged with its reason | No value in this PRD | Not routed — product setting |
| `face_match_false_reject_kill_rate` | Withdrawal of face-match as an option (FR-ATT-012 AC3) | Product | Fixed before the first pilot, measured there (§20) | No value in this PRD | Not in §20.13 yet — measured, like V-14 |
| `consent_regime_switch_date`, `post_switch_written_capture`, the CR-27 answer | The regime of each new consent record (FR-ATT-029) | Legal lead | Rule object through the §22 two-person review (FR-LEG-008) | On or about 13 May 2027 (EV-058); written capture on | Not in §20.13 yet — V-27, the commencement watch |
| `brownfield_adopt_with_new_consent`; the bound on `brownfield_response_window_days` | BF-7, and how long an unconsented template may stay (FR-ATT-035) | Legal lead | Counsel (§09.14-A18) | Off; bound unset | Retention |
| `brownfield_response_window_days` | The worker's decision window (FR-ATT-035) | Tenant admin, inside Legal's bound | Tenant configuration | Required at brownfield registration | Not routed — tenant setting |
| `template_erasure_delay_days.<trigger>` | Erasure timing per trigger (FR-DEV-014) | Tenant admin, inside Legal's bound (CR-09) | Counsel sets the bound | Neither immediate nor a one-year hold hard-coded (Part D-9) | Retention |
| `template_access_log_retention_days` | Template access-log retention (FR-ATT-032 AC1) | Legal lead | Counsel | At least 180 days in India (EV-062) | Retention |
| `template_server_sync` | Storage mode (FR-ATT-031) | Tenant admin | Audited enablement | Off — `DEVICE_HELD` | Not routed — tenant setting |
| `erase_retry_interval_h`, `erase_retry_max`, `erase_queued_alert_h`, `device_unseen_alert_h`, `clock_skew_tolerance_s`, `clock_skew_autocorrect_max_s` | Erasure retries and alerts; device health; skew handling (FR-DEV-003, FR-DEV-007, FR-DEV-012) | Tenant admin | Tenant configuration | Required; no sourced default | Not routed — tenant setting |
| `device_pending_expiry_h`, `device_secret_overlap_h`, `device_auth_fail_threshold` | Registration expiry, secret rotation, suspension (FR-DEV-010) | Security lead | Owner decision, logged | No value in this PRD | Not routed — security setting |
| `ingest_rate_limit.device`, `ingest_rate_limit.tenant`, `command_batch_max`, `command_result_timeout_s`, `user_sync_retry_interval_h`, `user_sync_retry_max`, `clock_set_command_ttl_min` | Ingest backpressure and the command channel (FR-DEV-011, FR-DEV-017–019) | Engineering | V-11 bench results and the §17.9 scale targets | Set from V-11 | Not in §20.13 yet — §20 to add a device-protocol family on V-10/V-11 |
| `consent_reconciliation_schedule` | FR-ATT-036 cadence | Engineering | Owner decision | No value in this PRD | Not routed — engineering setting |
| `early_in_window_min`, `late_out_window_min`, `punch_debounce_s`, `max_session_min`, `working_day_cutoff_time`, `break_deduction_mode` | Pairing and worked minutes (FR-ATT-033, FR-ATT-037, FR-ATT-038) | Tenant admin | Tenant configuration at site and shift setup | Required; no shipped value (FR-ATT-037 AC1) | Not routed — tenant setting |
| `spread_over_cap_min`, `max_continuous_work_min`, `min_rest_interval_min`, `ot_block_min`, `ot_min_spell_min` | Working-time warnings; state OT reckoning (FR-SHF-001, FR-OT-005) | Statutory lead | V-21 desk read, then per-state rules, through §22 | Empty (CC-9) | Central labour reference values |
| `ot_week_start_day`, `ot_quarter_basis`, `ot_rest_day_counts_in_weekly_test`, `substituted_rest_day_window_days` | OT reckoning and the rest-day obligation (FR-OT-006, FR-OT-009) | Statutory lead; the week start is tenant-required until V-21 reads it | V-21, V-17 | As FR-OT-006's table | Central labour reference values |
| `ot_quarterly_ceiling_hours`, `ot_quarter_warn_thresholds` | The advisory ceiling and its warning points (FR-OT-001 AC2, FR-OT-007) | Statutory lead; thresholds by the tenant | V-17 | 144, labelled [Hypothesis] and warn-only (K-04); thresholds empty | Central labour reference values |
| `compoff_expiry_days` | Comp-off expiry (FR-OT-003) | Tenant admin | Tenant policy | Required where comp-off is used | Not routed — tenant policy |
| `el_*`, `cl_*`, `sl_*`, `esi_sickness_waiting_days` | Leave accrual and state floors; the ESI sickness overlap (FR-LV-002, FR-LV-007) | Statutory lead | V-21 and per-state gazettes; V-08 for ESI | Empty (CC-9) | Central labour reference values, with state values on the same route per state |
| `ml_*`, `nursing_break_min`, `nursing_break_paid` | Maternity variants and nursing breaks (FR-LV-003) | Statutory lead | V-21 (§09.14-A15) | Empty | Central labour reference values |
| `form_ix_multi_session_render`, `form_ix_half_day_rule`, `form_ix_non_working_marker`, `form_ix_ot_display_format`, `form_ix_attribute_change_render` | Form IX renders (FR-STAT-001, FR-ATT-033, FR-STAT-004) | Statutory lead | §20 desk read with §09.14-A14 and A20 | Empty; `form-ix-rule-missing` warnings until set | Central labour reference values |
| `leave_year_basis.<type>`, `leave_negative_balance_mode`, `leave_min_unit`, `leave_timeout_hours`, `leave_doc_grace_days`, `blackout_override_role` | The leave year, negative balances, units, escalation and evidence deadlines (FR-LV-011–FR-LV-015) | Tenant admin | Tenant configuration | Required and unset — no national convention is captured for any of them | Not routed — tenant setting |
| `reg_approval_timeout_h`, `bulk_reg_max_rows` | Regularization escalation and the ceiling on one batch (FR-REG-006, FR-REG-008) | Tenant admin, inside a Product ceiling | Tenant configuration | Required; no sourced default | Not routed — tenant and product setting |
| `dual_run_window_days`, `declared_balance_tag_display_days` | The cutover dual-run window, and how long a declared opening balance stays labelled (FR-DEV-020, FR-LV-017) | Tenant admin, inside a Product ceiling | Tenant configuration at cutover | Required at cutover | Not routed — tenant setting |
| `kpi.att.*` targets | Module health and adoption targets (§09.13-A) | Product | First pilots' measured baseline (§19, §20) | No value in this PRD | Not in §20.13 yet — measured |

- **AC1:** The configuration schema is generated from this register: a parameter missing
  from it cannot be read by any rule, and a parameter in it with no value behaves as its
  "Ships as" column says — required, empty with a warning, or off.
- **AC2:** Every change to a parameter records the actor, the time, the reason and, for a
  statutory or counsel value, the citation or opinion reference, the same way a rule object
  records its source (§14, §22).

---

**What this section commits to, and what it fences.**

Confidence markers above attach to the *statutory or evidentiary claim a requirement
rests on*, never to the requirement itself. Four things are settled enough to build
against and are stated as P0: the ADMS/WDMS push receiver and its logical packet
contract (FR-DEV-001, FR-DEV-008); overtime at not less than twice the normal rate of
wages against wage-period-dependent normal hours — 8 a day where the wage period is
daily, 48 a week otherwise (FR-OT-001); the Form IX time model with per-day IN and OUT
timestamps and central-sphere retention counted from the date of last entry (EV-053,
EV-054, EV-055, FR-STAT-001, FR-ATT-033); and the biometric architecture Part E-6
requires — template entity separate from the attendance event, its own keyspace, no
image column and no image bucket, two-phase device-side erasure with a documented
exception state, and versioned consent running under two regimes across on or about
13 May 2027 (FR-ATT-017, FR-ATT-031–036, FR-DEV-007, FR-DEV-013–016).

Four things are fenced and must not be read as decided. Every state-devolved numeric —
leave-with-wages accrual and carry-forward, CL and SL floors, spread-over, rest
intervals, OT rounding blocks, festival holidays, the substituted-rest-day window, the
maternity variants — ships as an **empty** named parameter under CC-9 and reaches the
rule store only through the §22 pipeline with a citation and a corrigendum check
(§09.15). The 144-hour quarterly OT ceiling is the single seeded [Hypothesis] value,
kept because it can only ever warn: FR-OT-008 makes "warn, never block" a read-access
invariant rather than a promise, and §20 V-17 either confirms the figure or deletes it
(K-04). The biometric legality question — whether DPDP s.7(i) will reach the most
intrusive way of taking attendance, who owes the SPDI r.5(1) written-consent duty, and
whether in-app capture satisfies it — is counsel's, not this section's (§23,
§09.14-A8); the machinery ships under either answer, and neither *Dillip Kumar Rout*
(K-14) nor the Turkish KVKK decision 2026/921 (K-15) is cited as authority for any of
it. And the device wire format stays with the §20 V-11 bench test: this section fixes
the logical contract, the adapter maps onto it, and "unknown" in the FR-DEV-004 matrix
is treated as unsupported (§09.14-A16, A19).

The thesis the whole section is built on is the one §06 and §08 also carry: **a punch
is a filing input.** Paid days and NCP days become an ECR line (EV-035), days worked in
a contribution period become ESI eligibility, the register is itself the filing, and a
correction after the return is approved is expensive because an approved return can
never be cancelled (EV-036, EV-037). That is why nothing here is model-generated
(CC-2), why every derived figure replays byte-identically (CC-1), and why a correction
to a locked period is a diff and never a mutation (FR-REG-007).
