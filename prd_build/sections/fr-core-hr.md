## 07. Functional Requirements — Core HR System of Record

The core HR system of record is the spine that every filing reads from. In a filing-first product this is not a "profile page" module — it is the authoritative, effective-dated source of the exact fields that ECR, ESI challans, PT returns and Form 138 (ex-24Q) are computed and filed against, and from which TRACES builds Form 130 (ex-Form 16). If a UAN is wrong, the ECR rejects; if a work-location is wrong, PT is remitted to the wrong state; if a date-of-joining is wrong, gratuity accrual and ESI contribution-period membership are wrong. **The system of record is therefore a compliance artefact, not an HR convenience**, and its requirements are written to that standard.

Two design commitments run through every FR below and are stated once here rather than repeated:

- **Every bitemporal-class fact that feeds a filing is effective-dated and retrospectively recomputable.** Bitemporality is scoped by entity class (Part E-2; the class list is owned by §14): rules, salary structures, assignments and statutory attributes are bitemporal — never forgotten, replayable. Punches, rendered documents, biometric templates and consent artefacts are **not** bitemporal; they are erasable, and §07.2a states what replay returns after an erasure. **[Reversed]** v0.3 made effective-dating "universal" across the master; that collides with the must-forget classes (K-24). Within the bitemporal classes this is the same requirement the dual wage base imposes (Code on Wages s.2(y) / Code on Social Security s.2(88), the 50% add-back — see §06), applied across the master. A designation change, a work-location transfer, a bank-account change, a CTC revision: each carries an effective date, and a retro run must recompute against the master *as it stood in the period being corrected*, never as it stands today. **[Verified]** the statutory basis for effective-dating (Code on Wages s.2(y) — r1/06 finding 5; "or such other per cent as may be notified" makes wage-definition itself a versioned variable).
- **Statutory-impacting fields are maker-checker gated and fully audited.** A change to PAN, UAN, ESI IP number, bank account, the Aadhaar token, date-of-birth, date-of-joining, PF/ESI eligibility flags or wage components must pass a second-person check and land in an immutable audit log. CERT-In requires 180 days of ICT logs retained *within Indian jurisdiction*, with clocks synced to NIC/NPL NTP (EV-062), so the audit trail is a regulatory obligation and not a nicety (see §17).

FR identifiers use the prefix `FR-CHR-`. Priority is MoSCoW (**Must** / **Should** / **Could** / **Won't-for-now**); phase maps to the roadmap in §05 (**v1** = files the beachhead, 20–200; **v2** = scales the filing, 200–1,999; **Vision** = enterprise/regulated). Where a MoSCoW "Won't" appears it means *not in the phase named*, with the phase it does land in stated. The employee-lifecycle diagram accompanies §07.3; the entity model below opens the section, and its invariants are specified in §07.2a.

A note on how to read the FR tables: every "Must" in v1 is there because a named filing rejects, a statutory register is incomplete, or a settlement is wrong without it — not because it is expected of an HRMS. Where a field is present only to satisfy a downstream computation, the computation is named. Where a requirement is parity with an incumbent rather than differentiation, it says so, so the roadmap does not over-invest in table stakes; the competitive frame, including the corrected Frappe/Tally parity table, is §21.

**Tax vocabulary.** The Income-tax Act 2025 governs from Tax Year 2026-27. This section uses the new form names with the old ones in brackets — Form 138 (ex-24Q), Form 130 (ex-Form 16), Form 124 (ex-12BB), Form 123 (ex-12BA), Form 122 (ex-12B), s.392 (ex-s.192) — and the product accepts both vocabularies in search, imports, labels and help (EV-050). The bare string "Form 16" is never used as a key: under the Income-tax Rules 2026 it now names a donation certificate (research r5/04, finding 29). Where this section cites a 1961-Act provision that the CBDT mapping does not cover (for example s.206AA, s.10(10), s.10(10AA), s.80C, Rule 26C), the citation is flagged "1961-Act numbering": the 2025-Act equivalent and any changed value are routed to §20 (V-20) before Tax Year 2026-27 computations rely on them.

<!-- DIAGRAM: core-hr-entity-model -->

---

### 07.1 Employee Master — the authoritative record

The employee master holds identity, statutory identifiers, employment terms and the eligibility flags that gate every payroll and filing computation. The non-obvious requirement is that **many of these fields are not free-text profile data but keys into external government systems** (EPFO, ESIC, Income Tax, state PT/LWF portals), each with its own format rule and each of which will reject a filing if malformed. The master must validate to those external formats at entry, not at filing time when the rejection is expensive — the difference between a red field on an onboarding form and a rejected ECR the day before the 15th-of-month deadline.

#### 07.1.1 Identity and statutory identifiers

| FR | Requirement | MoSCoW | Phase |
| --- | --- | --- | --- |
| **FR-CHR-001** | Maintain a single canonical employee record keyed by an internal immutable `employee_id`, distinct from any employment-instance number, so a rehire or an inter-entity transfer preserves lineage. | Must | v1 |
| **FR-CHR-002** | Capture and format-validate **PAN** (10-char `AAAAA9999A`, 4th char = holder type, 5th = surname initial), mandatory for any employee with taxable income; flag PAN-not-available for higher-rate handling under s.206AA (1961-Act numbering — see the vocabulary note). | Must | v1 |
| **FR-CHR-003** | Capture **UAN** (12 digits), **PF Member ID** (establishment-code-scoped), and the **PF eligibility flag**; support "UAN pending — employee to generate" and "UAN to be linked/transferred" states for new joiners (see FR-CHR-041). | Must | v1 |
| **FR-CHR-004** | Capture **ESI IP / Insurance Number** (10 digits) and the ESI eligibility flag; support "IP to be registered" pending state for new joiners crossing coverage. | Must | v1 |
| **FR-CHR-005** | Capture **Aadhaar only if the employee chooses to provide it** (FR-CHR-101), and only into the separate Aadhaar token store (FR-CHR-099). Business tables hold the opaque token and a `uan_seeding_status`, never the number or a hash of it. Every role, including the employee, sees at most the last four digits. That masking rests on the reg 6(2) security duty and on risk; it is not presented to customers as a statutory display duty on a plain employer (Part D-5; reg 6(1) is the *public*-display bar). Seeding status matters because EPFO receives contributions through the ECR only for Aadhaar-seeded UANs. That rule comes from an EPFO administrative circular (instruction of 01.06.2021), not a statute (research r4/04, finding 8), so an unseeded UAN is handled by FR-CHR-101 and is never a payroll block. **[Verified]** (EV-068; r4/04 findings 7–8). **[Reversed]** v0.3 presented seeding as a hard ECR precondition and stored the Aadhaar number, masked, on the employee record. | Must | v1 |
| **FR-CHR-006** | Capture **bank account number + IFSC + account-holder name**, but only once a written-consent record for financial information is on file. Bank details are sensitive under SPDI r.3, and r.5(1) requires consent in writing before collection (EV-060; FR-CHR-100). Who owes that duty, employer or vendor, is under counsel review, so capture supports either (Part D-4). Run **penny-drop / name-match verification** before the account is usable for salary or FnF disbursal, and block payout to an unverified account. | Must | v1 |
| **FR-CHR-007** | Flag **International Worker** status (country of origin; CoC/SSA applicability; the IW PF wage basis) and **disabled-employee** status (ESI wage ceiling ₹25,000 vs standard ₹21,000). Disabled-employee status is health information: SPDI r.3 lists physical, physiological and mental health condition as sensitive alongside financial and biometric information (rule text in research r4/01; EV-060). It is therefore captured only on a written-consent record for purpose `HEALTH_DISABILITY_STATUS` (FR-CHR-100, FR-CHR-114). An employee who withholds it is derived on the standard ceiling, and the notice says so before the choice is made. **[Verified]** ESI ceilings (ESIC coverage page, r1/06 finding 23; ESI parameters after 22 November 2026 fenced — §06.9). **[Hypothesis]** the IW "full wages, no ₹15,000 ceiling" rule: the paragraph references and the court history are carried, not re-captured, and a High Court is reported to have struck the IW provisions down, with the matter under challenge (§06.2). The IW PF basis is therefore parameter `epf.iw_wage_basis`, confirmed before uncapped IW contributions are applied. Separately, an IW who became a member after September 2014 with wages above ₹15,000 is **not** an EPS member (EPFO revamped-ECR FAQ, r5/02 finding 14). | Must | v1 |
| **FR-CHR-008** | Support alternate/secondary identifiers required for specific filings and states — e.g., date-of-birth as recorded against the UAN (a KYC mismatch there is a known defect class; its frequency is unmeasured — §20), and gender per statutory options, because a state PT slab can differ by gender (Maharashtra's women's slab is captured at a state primary source — §06.4; every other state's gender variant is a V-09 dataset field). | Should | v1 |
| **FR-CHR-009** | Capture a **personal contact channel** (personal email/mobile) distinct from work contact. It carries consent notices, data-principal requests and post-exit communications. **[Reversed]** v0.3 said DPDP s.7(i) already removes the consent requirement for employment processing. It does not: s.7(i) is not in force until on or about 13 May 2027 (EV-058). Today the SPDI Rules 2011 require consent in writing before collecting sensitive personal data, which includes financial and biometric information (EV-060), so the consent capture in FR-CHR-100 is live now. When s.7(i) commences, it disapplies consent and notice for employment purposes only; the s.8 duties still apply (EV-058). Whether DPDP access, correction and erasure rights reach s.7(i) processing at all is under counsel review (Part D-1, §23). | Should | v1 |
| **FR-CHR-009a** | Capture **name as-per-PAN** and **name as-per-UAN** as values stored separately from the display name. ECR field 2 is "Member Name as per UAN" (EV-035), and Form 138 (ex-24Q) is matched against the PAN name on TRACES. A single "full name" field guarantees mismatch defects. | Should | v1 |
| **FR-CHR-104** | **Place every statutory identifier at exactly one owning level** — person, employment, establishment mapping, establishment or legal entity — with a declared uniqueness scope, temporal class and multi-value rule, per the identifier placement table below. A filing reads each identifier from its owning level only, so a register, a return and a payslip cannot disagree (§06.9 reads Form I fields 18, 19 and 23 from this store). Uniqueness is enforced **within a tenant only**; the product never checks an identifier across tenants, because a cross-tenant match would disclose one customer's employee to another. A person holding **more than one UAN** is a first-class state, not a data error to be overwritten: every declared UAN is recorded, exactly one is marked `active_for_filing` per period, and the others are held as `declared_additional` with readiness reason `MULTIPLE_UAN_DECLARED`. The product never generates, merges or retires a UAN; consolidation is a member-side EPFO process whose steps are carried, not re-captured (§20). | Must | v1 |

**The statutory-identifier format dictionary (validate at entry, not at filing).** Every identifier below has a deterministic format the government system enforces; the master must reject malformed values on capture with a specific message and, where the value is well-formed but unverified, accept-but-flag-non-fileable. This table is the acceptance contract for FR-CHR-002 through 006. Several masks below were carried from v0.3 and no research round captured the issuer's own specification; those rows say so. Every mask ships as a versioned validation rule, parameter `id_format.<identifier>`, and the carried ones are desk-verified against the issuer's published specification before v1 GA (§20). A mask change is a rule-version change, never a code edit.

| Identifier | Format rule | Validated by | Failure mode if wrong |
| --- | --- | --- | --- |
| **PAN** | `[A-Z]{5}[0-9]{4}[A-Z]` — 4th char is holder type (`P` individual, `C` company, `H` HUF, `F` firm, `A` AOP, `T` trust, `B` BOI, `L` local authority, `J` artificial juridical person, `G` govt); 5th char = first letter of surname for individuals; 10th is an alphabetic check character. | Income Tax / TRACES on Form 138 (ex-24Q) | Invalid/structurally-wrong PAN → Form 138 line rejected; PAN reported but not `P` for an employee → validation warning; name mismatch vs PAN → TRACES flags, and the TRACES-generated Form 130 carries the defect. **[Hypothesis — carried, not re-captured]** the ten-character mask, the holder-type letters and the check-character position (`id_format.pan`). |
| **UAN** | 12 numeric digits (length carried, not re-captured — `id_format.uan`). It is field 1 of the ECR file (EV-035), so a member without one cannot appear in an ECR at all. EPFO receives contributions only for Aadhaar-seeded UANs (EPFO administrative circular; r4/04 finding 8). | EPFO Unified Portal on ECR upload | Wrong length → blocked at entry; no UAN → the member's line cannot be generated; unseeded → exclude-and-flag (FR-CHR-101), never a payroll block. **[Verified]** field position and the seeding instruction (EV-035; r4/04 finding 8). |
| **ESI IP number** | 10-digit Insurance Number issued by ESIC (`id_format.esi_ip`); Aadhaar seeding at registration is optional (research r4/04, finding 9; FR-CHR-101). | ESIC portal on monthly contribution | Missing/malformed → contribution line fails; IP not registered before first wage → coverage gap. **[Hypothesis]** the 10-digit length rests on practitioner descriptions of ESIC's upload template, not on ESIC's own documentation (r3/05). |
| **IFSC** | 11 chars: 4 alpha bank code + `0` (reserved) + 6 alphanumeric branch code (`id_format.ifsc`). | NPCI/bank on penny-drop | Malformed → penny-drop cannot route; valid-but-wrong branch → payment returns. **[Hypothesis — carried, not re-captured]** the IFSC structure; confirm against the RBI specification. |
| **Aadhaar** (optional — FR-CHR-101) | 12 numeric digits with a Verhoeff checksum (`id_format.aadhaar`); validated at the token-store boundary and written only to the token store (FR-CHR-099); never displayed beyond the last four digits. | UIDAI (indirectly, via UAN/IP seeding) | Wrong DOB/name vs the Aadhaar-seeded UAN record → a UAN KYC defect (FR-CHR-008). **[Hypothesis — carried, not re-captured]** the checksum rule; confirm against UIDAI's specification. |
| **PF Member ID** | Establishment-code-scoped member account number (region/office/establishment/extension/member serial — `id_format.pf_member_id`). It is not an ECR file field; the ECR keys on UAN (EV-035). | EPFO, via the establishment the ECR is uploaded under | Scoped to the wrong establishment code → contribution filed against the wrong establishment. **[Hypothesis — carried, not re-captured]** the segment structure. |

**Identifier placement — owning level, uniqueness scope and multi-value cases (FR-CHR-104).** The format dictionary says what a value must look like; this table says *where it lives*. Placing an identifier at the wrong level is the root of a whole defect class: a UAN stored per employment forks on rehire; a PT registration stored per employee invents an obligation no state imposes; a TAN stored per establishment splits one Form 138 series into several. "Bitemporal" and "erasable" are the Part E-2 classes (§07.2a).

| Identifier | Owning level | Uniqueness scope | Temporal class | Multi-value case and rule | Consumed by |
| --- | --- | --- | --- | --- | --- |
| **PAN** | `person` | One active PAN per person; the same PAN on two persons in a tenant raises a duplicate-person review (§07.2a merge rule), never an auto-merge | Bitemporal (statutory attribute) | A surrendered or corrected PAN is kept as history; only one is active at any date | Form 138 data; Form I field 19; TRACES name-match |
| **Name as per PAN / as per UAN** | `person` | Not unique | Bitemporal | One of each per period; a change is a maker-checker event | ECR field 2 (EV-035); TRACES match (FR-CHR-009a) |
| **UAN** | `person` — it follows the member across employers and survives exit | Unique per person within the tenant; one `active_for_filing` per period | Bitemporal | **Multiple UANs:** all declared UANs recorded; one active for filing, the rest `declared_additional` and flagged `MULTIPLE_UAN_DECLARED`; the product never generates or merges one (FR-CHR-041, FR-CHR-104) | ECR field 1 (EV-035); Form I field 18 |
| **`uan_seeding_status`** | `person`, per UAN | — | Bitemporal | One status per declared UAN | Exclude-and-flag (FR-CHR-101); readiness (FR-CHR-097) |
| **PF Member ID** | `establishment_mapping` (employment × establishment code) | Unique within the establishment code | Bitemporal (assignment) | One per establishment membership; an inter-establishment move opens a new one under the same UAN (§07.3.3) | ECR routing |
| **ESI IP number** | `person` | Unique per person within the tenant | Bitemporal | One active; whether an IP number carries across employers is the v2 portability decision (FR-CHR-026, FR-CHR-052), carried, not re-captured | ESI contribution; Form I field 23 |
| **Aadhaar number** | `aadhaar_token_store`, referenced from `person` by an opaque token (FR-CHR-099) | One per person; a second number for the same person is a data error routed to review | **Erasable** — deleted when the consented purpose is spent (reg 6(5), EV-068) | None; absence is a valid state (FR-CHR-101) | Rendered only into Form I field 24 at generation, once the counsel gate opens (§06 R24), and seeding status |
| **Bank account + IFSC** | `person` holds verified accounts; `employment` holds the disbursal instruction pointing at one | An account may be shared by persons only through an explicit, audited exception (joint account) | Bitemporal (disbursal instruction); the account record is gated by a written-consent record (FR-CHR-006) | One active salary account per employment per period; a change re-runs penny-drop and maker-checker | Payout file (§16); Form I fields 25–27 |
| **Employee code** | `employment` | Unique within the legal entity | Bitemporal | A rehire gets a new employment and may get a new code; lineage is by `person_id` (FR-CHR-001) | Form I field 1; Form IX; wage register |
| **PT employer registration (PTRC)** | `establishment`, per state | Unique per state per establishment | Bitemporal | An establishment with staff in two states holds two; there is **no per-employee PT enrolment** — the employee-level fact is the derived PT `eligibility` (FR-CHR-014) | State PT return |
| **PT enrolment (PTEC)** | `legal_entity`, per state | Per entity per state | Bitemporal | Covers the entity's own PT (corroborated at state primary sources — §06.4); the each-director limb is reported by compilations (r1/06 finding 30) and carried, not re-captured **[Hypothesis]** | Entity PT payment |
| **LWF registration** | `establishment`, per state | Per state per establishment | Bitemporal | Employee-level fact is the derived LWF `eligibility` (FR-CHR-015) | State LWF remittance |
| **EPFO establishment code** | `establishment` | As issued by EPFO; unique within the tenant | Bitemporal | Extensions/sub-codes are separate establishment rows under one parent (FR-CHR-021) | ECR upload scope |
| **ESIC employer code** | `establishment` | As issued by ESIC; unique within the tenant | Bitemporal | Sub-codes per state or branch are separate establishment rows (§14) | ESI contribution scope |
| **LIN** | `establishment` | As issued | Bitemporal | One per establishment | Form I header (r5/04 finding 16); FORM-XVII Part III (finding 20) |
| **TAN** | `legal_entity` | As issued | Bitemporal | Where an entity holds more than one TAN, each runs its own Form 138 series, and the employee's deductor TAN is an effective-dated attribute of the employment | Form 138; Form 130 |
| **PRAN** (corporate NPS) | `person` | Unique per person within the tenant | Bitemporal | One per person; the subscription state is per employment (FR-CHR-019) | Employer NPS contribution treatment in TDS (§14.4.2) |
| **Passport number and country of origin** | `person` | One active passport per person | Bitemporal | A renewed passport is a succession, not a second active value (§07.1.1a) | International Worker status (FR-CHR-007) |
| **Certificate of Coverage** | `employment`, held as a `document` with a validity window | Per employment per validity window | The certificate is an erasable document; the exemption it drives is a bitemporal `eligibility` range | Successive certificates for successive windows; an expired one leaves the history intact | IW PF exemption where a social security agreement applies (FR-CHR-007; §14.4.2) |
| **S&E registration** | `establishment` | As issued | Bitemporal | One per establishment | Threshold gating (FR-CHR-022) |
| **GSTIN, CIN** | `legal_entity` | As issued | Bitemporal | An entity holding more than one GSTIN records each | Invoicing and entity identity; never a payroll filing key (FR-CHR-022) |

**Edge cases the identity block must handle (not defer).**

- **No PAN at all.** An employee with taxable income and no PAN attracts a higher-rate deduction floor. v0.3 stated it as 1961-Act s.206AA — "the higher of the applicable rate or 20%", with no Form 124 (ex-12BB) benefit able to pull the deduction below it. That wording is carried, not re-captured, and is not stated as law (§06.5). The 2025-Act section and rate are not in the CBDT mapping we hold (EV-050). The floor is therefore rule parameter `no_pan_tds_floor`, with no shipped default, confirmed against the 2025 Act before Tax Year 2026-27 computations rely on it (§06.13, §20). The master stores a `pan_status` of `not-available` distinct from `pending`, and the TDS engine reads it. An *inoperative* PAN is a separate, counsel-gated branch that §06.5 owns (`tds.inoperative_pan_rule`).
- **Multiple/duplicate PAN** surrendered — store the active PAN and block a second active PAN on the same record.
- **UAN exists but Aadhaar seeded to a different name** — the record is accepted, marked non-fileable, and surfaced on the pre-ECR readiness report (FR-CHR-097) rather than silently carried into a rejecting ECR.
- **International worker with no Aadhaar** — Aadhaar is optional for every employee (FR-CHR-101), so this is the general rule, not an exception. For IWs the master captures passport, country of origin and CoC status (FR-CHR-007). IWs are also one of the residual cases where the employer, not the employee, still generates the UAN (research r4/04, finding 7).
- **Name with no surname** (common in parts of India) — PAN 5th-character logic and TRACES name-match must degrade gracefully; store name-as-per-PAN verbatim (FR-CHR-009a) rather than parsing.

**Acceptance criteria (identity block).**
- Given a PAN failing the `AAAAA9999A` mask or holder-type/check-position rules, the field is rejected at entry with a specific error, not accepted and deferred to filing.
- Given a UAN of any length other than 12 numeric digits, entry is blocked; given a valid UAN with `uan_seeding_status != verified`, the record is accepted, surfaced on the pre-ECR readiness report, and handled by the exclude-and-flag default (FR-CHR-101) — payroll is not blocked.
- Given an Aadhaar failing the Verhoeff checksum, entry is blocked. A valid Aadhaar is written only to the token store (FR-CHR-099) and is never rendered beyond the last four digits in any screen, export, log line or support view. A full-value read is an explicitly audited KYC action on the token store.
- Given an IFSC that is not 4-alpha + `0` + 6-alphanumeric, entry is blocked before penny-drop is attempted.
- A salary or FnF disbursal instruction referencing a bank account with `verification_status != passed` is refused with a blocking error, not a warning.
- Given an employee with `pan_status = not-available`, the TDS computation applies the `no_pan_tds_floor` parameter (2025-Act section and rate pending mapping), and the payslip and the Form 138 data behind Form 130 reflect it. While the parameter is unset, the employee is flagged `PAN_MISSING` on the readiness report and the run shows the floor as unconfirmed; no hard-coded rate is applied.
- Any change to PAN, UAN, ESI IP, the Aadhaar token, bank account, DOB or DOJ writes a before/after audit record with actor, NTP-synced timestamp, and the checker who approved it; the change does not take effect until checker approval (FR-CHR-084, FR-CHR-089). For Aadhaar the audit record carries the token, never the number.
- Given an employee who declares a second UAN, both are stored on the `person`, exactly one is `active_for_filing` for each period, the ECR for that period uses only that one, and `MULTIPLE_UAN_DECLARED` stays on the readiness report until an operator records the member's resolution. No path creates, merges or deletes a UAN (FR-CHR-104).
- A schema test asserts that PAN, UAN, IP number and the Aadhaar token exist only on `person`, PF Member ID only on `establishment_mapping`, PTRC/LWF/EPFO/ESIC codes and LIN only on `establishment`, and TAN and PTEC only on `legal_entity`; no per-employee PT enrolment field exists. The same test places PRAN and the passport on `person`, the Certificate of Coverage on `employment`, the S&E registration on `establishment`, and GSTIN and CIN on `legal_entity`. A uniqueness check never queries another tenant.

#### 07.1.1a Identifier lifecycle, change control and the multi-value cases

The placement table fixes where each identifier lives. This block fixes how it changes, and it specifies three things nowhere else in the PRD does: the four kinds of identifier change and what each does to periods already computed; the multiple-UAN workflow; and duplicate-person detection. The linkage states each identifier carries are §14.4.2's, and the correction runs a change can spawn are §08's (FR-PAY-306). This block is the system-of-record behaviour between them.

| FR | Requirement | MoSCoW | Phase |
| --- | --- | --- | --- |
| **FR-CHR-106** | **Every identifier change is typed.** A change to a statutory identifier is recorded as exactly one of four kinds — correction, succession, addition or retirement (table below) — and the kind, not the screen it came from, decides its valid-time semantics and its downstream effect. The maker chooses the kind and the checker approves it with the change (FR-CHR-084). A change without a kind cannot be submitted, and an identifier refuses the kinds the second table does not allow it. | Must | v1 |
| **FR-CHR-107** | **Multiple UANs are a workflow, not a field.** A further UAN, however it arrives, is recorded and never chosen silently. The UAN `active_for_filing` for a period is confirmed by a maker and a distinct checker with the member's evidence, and the ECR for a period reads only the UAN active in that period. Where evidence shows a submitted or filed line carried the wrong UAN, the product raises `WRONG_UAN_FILED` and offers only the routes EV-036 and EV-037 leave open; it never edits a filed attempt. The transition table below is the contract. | Must | v1 |
| **FR-CHR-108** | **Duplicate persons are detected inside the tenant and merged only by decision.** Every create, identifier change and import row is matched against the tenant's persons. A PAN, UAN, ESI IP or bank-account match, or a name-and-DOB match, opens a duplicate review; nothing merges automatically. A merge is a maker-checked change request (§07.6a) that keeps both `person_id`s and can be reversed. Matching never reads another tenant (FR-CHR-104). | Must | v1 |
| **FR-CHR-109** | **An approved identifier change re-validates everything that used the old value.** On approval the product lists every artefact carrying the old value for a period the change's valid time covers, grouped by the artefact's state, and applies the artefact table below. A filed artefact is never regenerated in place; a correction is a new linked attempt, a diff (Part E-1). | Must | v1 |

**The four change kinds (FR-CHR-106).**

| Kind | Meaning | Valid time of the new value | The old value | Typical case |
| --- | --- | --- | --- | --- |
| **Correction** | The recorded value was always wrong | From the date the wrong value became effective | Superseded in transaction time, kept and readable, never overwritten (§07.2a) | A mistyped PAN or UAN; a DOB keyed wrongly at joining |
| **Succession** | A right value is replaced from a date | From the stated `effective_from` | Stays effective for every period before that date | A new salary account; a new PF Member ID on an inter-establishment move (§07.3.3) |
| **Addition** | A further value is held alongside the existing one | From the declaration | Unchanged | A second declared UAN (FR-CHR-107); a second verified bank account |
| **Retirement** | A value stops being usable, with no successor | From the stated date | Stays effective for earlier periods | A closed bank account; a surrendered establishment registration |

**Which kinds each identifier admits, and what re-runs on approval.**

| Identifier | Correction | Succession | Addition | Retirement | Re-verification and re-derivation |
| --- | --- | --- | --- | --- | --- |
| PAN | Yes | No — one active PAN per person (FR-CHR-104) | Refused (§07.1.1 edge cases) | No | Mask `id_format.pan`; name as per PAN re-checked against the TRACES match (FR-CHR-009a) |
| UAN | Yes | No — a UAN follows the member; a "new UAN" is an addition | Yes, through FR-CHR-107 | Never inside the product (FR-CHR-104) | Mask `id_format.uan`; a corrected value's `uan_seeding_status` restarts at `pending` until evidence |
| ESI IP number | Yes | No | Recorded as `declared_additional`, one active, flagged `MULTIPLE_IP_DECLARED`; the ESIC-side treatment is not captured (FR-CHR-026) | No | Mask `id_format.esi_ip` |
| Name as per PAN / as per UAN | Yes | Yes, on a legal name change with evidence; the two may change on different dates | No | No | TRACES name match and ECR field 2 (EV-035) re-checked for open periods |
| Date of birth | Yes | No | No | No | Eligibility re-derives where DOB drives it, including the age-58 EPS block (EV-040); `DOB_MISMATCH_UAN` re-evaluated |
| Date of joining | Yes | No | No | No | Eligibility, the continuous-service ledger (FR-CHR-016) and the first contribution month re-derive; contributions run only between the valid DOJ and DOL (EV-040) |
| Bank account | Only before its first use in a payout file | Yes | Yes; exactly one salary account per employment per period | Yes | Penny-drop and name match (FR-CHR-006); a live `BANK_DISBURSAL` grant (FR-CHR-114) |
| PF Member ID | Yes | Yes — on every inter-establishment move | No | On exit | Mask `id_format.pf_member_id`; scope matches the establishment mapping for the period |
| Establishment and entity codes — EPFO, ESIC, PTRC, PTEC, LWF, LIN, TAN | Yes | Yes | Yes — a new state registration | Yes, only when the filing ledger of the establishment or entity shows no open month (§08 FR-PAY-712) | Format dictionary (FR-CHR-022) |

**What an approved change does to artefacts that used the old value (FR-CHR-109).** Wage figures always come from the period's locked snapshot; only the identifier is re-read.

| State of the artefact for a covered period | Effect |
| --- | --- |
| Not yet generated | The generator reads the identifier in force for the period as known at generation (§08 FR-PAY-711) |
| Generated, not submitted | The attempt is superseded and kept with its hash; a new attempt is generated from the same snapshot |
| EPFO return submitted, not approved | The operator is shown the portal's reject option, on the approver's instruction, and a regenerated attempt (§22 AC-012.1) |
| EPFO return approved, no payment initiated | Revised is the only route, and it needs no payment initiated (EV-037; §06.2 decision table row 4). Whether a Revised return may change a member's UAN is not captured, so the route is an approver decision recorded with its actor (§20 V-23) |
| EPFO payment initiated, or the month filed | The approved return can never be cancelled (EV-036) and Revised is closed (EV-037). No portal route for a line credited to the wrong identifier is captured (§06.2 row 5): the product records `WRONG_UAN_FILED` against the months, raises the task, and routes the procedure to §20 V-23. It never edits the filed attempt |
| ESI contribution uploaded | ESIC's correction path after upload is not established (§08 AC-305.2); a correction task names the months and waits on §20 |
| Form 138 statement filed | A correction statement (§08 FR-PAY-708); for Tax Year 2026-27 its submission is held until the portal function is enabled (§22.4.3) |
| Payout file released to the bank | Never recalled; a credit the bank returns follows §08 AC-903.1 |

**The identifier read contract, per artefact.** The placement table's "consumed by" column, inverted: for each artefact, which identifiers it reads, from which owning level, as of when, and which readiness reasons stop the line. A generator that reads an identifier from any other level fails the FR-CHR-104 schema test.

| Artefact | Identifiers read | Read from | As of | Readiness reasons that stop the line | Generator |
| --- | --- | --- | --- | --- | --- |
| ECR member line | UAN (field 1); name as per UAN (field 2) (EV-035) | `person` | The UAN `active_for_filing` for the wage month, as known at generation | `UAN_PENDING` and `AADHAAR_UAN_UNSEEDED` (exclude-and-flag); `MULTIPLE_UAN_DECLARED`; `DOE_JOINT_DECLARATION_PENDING` | §08 FR-PAY-701 |
| ECR upload scope | EPFO establishment code | `establishment` | The wage month | `ESTABLISHMENT_UNMAPPED` | §08; §22.4.1 |
| ESI contribution row | ESI IP number | `person` | The contribution month | `ESI_IP_UNREGISTERED`; `MULTIPLE_IP_DECLARED` | §08; §22.4.2 |
| ESI upload scope | ESIC employer code | `establishment` | The contribution month | `ESTABLISHMENT_UNMAPPED` | §08 |
| Form 138 deductee row | PAN; name as per PAN | `person` | The quarter | `PAN_MISSING`; `PAN_NAME_MISMATCH`; `NO_PAN_FLOOR_UNSET` | §08 |
| Form 138 deductor record | TAN | `legal_entity` — the employment's deductor TAN for the quarter | The quarter | — | §08 |
| PT return | PTRC for the state | `establishment` | The return period | `PT_STATE_UNVERIFIED`; `PT_REGISTRATION_MISSING`; `PT_TRANSFER_MONTH_RULE_UNSET` | §08 |
| LWF remittance | LWF registration for the state | `establishment` | The LWF period | — | §08 |
| Form I entry | Employee code (field 1), UAN (18), PAN (19), ESI IP (23), Aadhaar (24, dark), bank details (25–27); LIN in the header | `employment`, `person`, the token store, `establishment` | At generation | None stops the entry; an empty field carries a reason code | FR-CHR-045-onb; §06.9 |
| Bank file line | Account number, IFSC, account-holder name | `person`, through the `employment`'s disbursal instruction | At generation: the last EFFECTIVE verified account | `BANK_UNVERIFIED`; `BANK_CONSENT_MISSING`; `SHARED_ACCOUNT` | §08 FR-PAY-901 |
| Wage slip | The identifiers the state's configured form carries (EV-053) | `employment`, `person` | The wage period | — | FR-CHR-064 |

**PT and LWF registration coverage — which registration a liability is remitted under.** PT follows the work-location state (FR-CHR-014), and every employment maps to exactly one establishment (FR-CHR-021). The two meet in one rule: the liability is remitted under the mapped establishment's registration for the work-location state. That is why the placement table lets one establishment hold a PTRC per state, and why there is no per-employee PT enrolment.

| Work-location state | The mapped establishment's registration for that state | Result |
| --- | --- | --- |
| Levies PT; the state's rows are sourced | PTRC recorded | Computed on the state's slabs (`pt.<state>.slabs`) and remitted under that PTRC |
| Levies PT; the state's rows are sourced | No PTRC | The liability computes and shows (§22 AC-017.1); `PT_REGISTRATION_MISSING` and a registration task (§22.4.5). Deduction before registration follows the state's rule once sourced (§20 V-09) and, until then, the tenant's recorded decision |
| Levies PT; the state's rows are not sourced | Either | `PT_STATE_UNVERIFIED`; non-fileable, never a guessed slab (FR-CHR-014) |
| Levies no PT | — | Nothing computed |
| Not recorded for a remote employee | — | `ESTABLISHMENT_UNMAPPED` until the work location is recorded, maker-checked (`ASSIGN.ESTABLISHMENT`, §07.6a) |

LWF follows the same rule against the establishment's LWF registration for the state and the state's `lwf.<state>.*` rows; a missing LWF registration leaves the liability computed and the remittance waiting for its runbook (§22.4.4).

**Worked example — a remote employee in a second state.** Kavitha is mapped to the Bengaluru establishment and, from 1 October 2026, works from Pune. Maharashtra levies PT; at the top slab it is ₹200 a month with ₹300 in February, ₹2,500 for the year (§06.4). The Bengaluru establishment holds a Karnataka PTRC and no Maharashtra one. From October her Maharashtra liability — ₹200 a month at the top slab, subject to her salary's slab — computes and shows, `PT_REGISTRATION_MISSING` is raised and a registration task opens. The change is effective on the first of a month, so no month is split between the states. When the Maharashtra PTRC is recorded on the Bengaluru establishment as an addition (FR-CHR-106), the months since October are remitted under it on Maharashtra's return cadence (§06.4).

**Identity entry validation catalogue — the acceptance contract for the error messages.** Each code is shown at entry with a field-specific message. "Accept" means the value is saved but non-fileable for the reason shown, never silently carried into an artefact.

| Code | Field | Condition | At entry | Readiness reason if saved | Resolution |
| --- | --- | --- | --- | --- | --- |
| `ID-PAN-FORMAT` | PAN | Fails `id_format.pan` | Block | — | Re-key |
| `ID-PAN-HOLDER` | PAN | Fourth character is not the individual holder type | Warn | — | Confirm, or re-key (§07.1.1 format dictionary) |
| `ID-PAN-SECOND` | PAN | A second active PAN on the same person | Block | — | Keep one; the other becomes history |
| `ID-PAN-OTHER-PERSON` | PAN | Held by another person in the tenant | Accept into review, not activated | `PAN_MISSING` | FR-CHR-108 |
| `ID-UAN-FORMAT` | UAN | Fails `id_format.uan` | Block | — | Re-key |
| `ID-UAN-OTHER-PERSON` | UAN | Held by another person in the tenant | Accept into review, not activated | `UAN_PENDING` | FR-CHR-108 |
| `ID-UAN-SECOND` | UAN | A further UAN for this person | Accept as `declared_additional` | `MULTIPLE_UAN_DECLARED` | FR-CHR-107 |
| `ID-UAN-UNSEEDED` | UAN | Seeding status not verified | Accept | `AADHAAR_UAN_UNSEEDED` | FR-CHR-101 |
| `ID-IP-FORMAT` | ESI IP number | Fails `id_format.esi_ip` | Block | — | Re-key |
| `ID-IP-SECOND` | ESI IP number | A further IP number for this person | Accept as `declared_additional` | `MULTIPLE_IP_DECLARED` | Operator records the active one, checked |
| `ID-AAD-FORMAT` | Aadhaar | Fails `id_format.aadhaar`, which also refuses a Virtual ID | Refused at the store boundary; nothing stored | — | FR-CHR-110 |
| `ID-AAD-NO-GRANT` | Aadhaar | No live Sharing Regulation 5 grant for a catalogue purpose | The field accepts no input | — | FR-CHR-111 |
| `ID-IFSC-FORMAT` | IFSC | Fails `id_format.ifsc` | Block before penny-drop | — | Re-key |
| `ID-BANK-NO-GRANT` | Bank account | No live `BANK_DISBURSAL` grant | The field accepts no input | `BANK_CONSENT_MISSING` | FR-CHR-114 |
| `ID-BANK-UNVERIFIED` | Bank account | Penny-drop or name match not passed | Accept, not usable for payout | `BANK_UNVERIFIED` | FR-CHR-006 |
| `ID-BANK-SHARED` | Bank account | Held by another person in the tenant | Accept; the newer person's payout line is flagged | `SHARED_ACCOUNT` | FR-CHR-108 |
| `ID-NAME-PAN-EMPTY` | Name as per PAN | Empty while a PAN is present | Warn | `PAN_NAME_MISMATCH` | FR-CHR-009a |
| `ID-DOB-UAN` | Date of birth | Differs from the DOB recorded against the UAN, where that is recorded | Accept | `DOB_MISMATCH_UAN` | FR-CHR-008 |
| `ID-PFM-SCOPE` | PF Member ID | Scoped to an establishment code the employment is not mapped to for the period | Block | — | FR-CHR-104 |
| `ID-PRAN-FORMAT` | PRAN | Fails `id_format.pran` (carried, not re-captured — §14.4.2) | Block | — | Re-key |
| `ID-PASSPORT-SECOND` | Passport number | A second active passport on the same person | Block | — | Record the renewal as a succession |
| `ID-CHANGE-UNTYPED` | Any statutory identifier | Change submitted without a kind | Block submission | — | FR-CHR-106 |
| `ID-CHANGE-KIND` | Any statutory identifier | A kind the identifier does not admit, such as a correction to a bank account already used for pay | Block submission | — | Choose succession or retirement |

**"My identifiers" — the employee's side of the readiness report.** Many readiness reasons are the employee's to fix, and the fastest route to a clean filing is to tell the employee directly. ESS shows each identifier masked (FR-CHR-131), its state in plain language, any pending change and its status, and the tasks below. An employee never sees another employee's tasks, and a manager never sees these tasks at all.

| Readiness reason (FR-CHR-097) | An employee task? | What the employee can do | Channel |
| --- | --- | --- | --- |
| `UAN_PENDING` | Yes | Generate and activate the UAN in UMANG, then enter it in ESS (FR-CHR-041) | Own channel; ESS |
| `AADHAAR_UAN_UNSEEDED` | Yes | Seed the UAN in UMANG; the exclusion notice explains what was left out (FR-CHR-127) | Own channel |
| `MULTIPLE_UAN_DECLARED` | Yes | Supply evidence of which UAN to credit, and later of the EPFO-side outcome (FR-CHR-107) | ESS |
| `PAN_MISSING` | Yes | Enter the PAN, or confirm that none is available | ESS |
| `PAN_NAME_MISMATCH` | Yes | Enter the name exactly as it appears on the PAN (FR-CHR-009a) | ESS |
| `DOB_MISMATCH_UAN` | Yes | Supply evidence for a DOB correction, or correct the UAN record | ESS |
| `BANK_UNVERIFIED` | Yes | Re-enter or change the account; penny-drop runs again | ESS |
| `BANK_CONSENT_MISSING` | Yes | Read the notice, then grant or decline (FR-CHR-115) | ESS; paper |
| `DOE_JOINT_DECLARATION_PENDING` | Yes | Sign the joint declaration with the employer (EV-041) | Own channel; paper |
| Every other reason — `ESI_IP_UNREGISTERED`, `ESTABLISHMENT_UNMAPPED`, `WAGE_TAGGING_INCOMPLETE`, the PT reasons, `NO_PAN_FLOOR_UNSET`, `CHANGE_PENDING_CHECK`, `FOUR_EYES_GAP` | No — the employer's to fix | — | — |

**Multiple UANs — the workflow (FR-CHR-107).** A further UAN arrives in one of four ways: the employee declares it on the joining declaration or in ESS, a migration row carries it, HR keys it from a document the employee supplied, or the operator observes it during an attended session. Payroll never waits on the workflow.

<!-- DIAGRAM: fr-core-hr-multi-uan-states -->

| # | From | Event | Guard | To | Side effect | Who may trigger |
| --- | --- | --- | --- | --- | --- | --- |
| MU1 | *(none)* | UAN linked at joining (FR-CHR-041) or carried by migration (§16.7 AC-MIG-4) | Mask passes; no other person in the tenant holds it (FR-CHR-108) | SINGLE | `active_for_filing` from the DOJ or the cutover date | The joining declaration; the import |
| MU2 | SINGLE | A further UAN is declared | Mask passes; not held by another person in the tenant | DECLARED_MULTIPLE | `MULTIPLE_UAN_DECLARED` on the readiness report for every open period; the existing UAN stays active until MU3 | Employee (ESS); HR admin; import; operator |
| MU3 | DECLARED_MULTIPLE | Active UAN proposed from a date, with the member's evidence | Maker-checked (FR-CHR-084); the date is not inside a month already at PAYMENT_INITIATED | ACTIVE_CONFIRMED | Unsubmitted ECR attempts for the covered months regenerate (FR-CHR-109); the other UANs become `declared_additional` | HR admin or payroll proposes; compliance checker approves |
| MU4 | ACTIVE_CONFIRMED | The member's evidence of the EPFO-side outcome is recorded; what the member does at EPFO is carried, not re-captured (§20) | Evidence attached | RESOLUTION_RECORDED | `MULTIPLE_UAN_DECLARED` closes; the other UANs stay on the person as history | HR admin, checked |
| MU5 | RESOLUTION_RECORDED | — | Exactly one UAN is `active_for_filing` | SINGLE | — | System |
| MU6 | SINGLE or ACTIVE_CONFIRMED | Evidence that a submitted or filed line carried a UAN other than the one to credit | — | WRONG_UAN_FILED | The FR-CHR-109 route for each affected month; `WRONG_UAN_FILED` on the readiness report; the approver notified | HR admin; operator |
| MU7 | WRONG_UAN_FILED | A route is decided and recorded for each affected month | The approver's decision | ACTIVE_CONFIRMED | The establishment's filing ledger annotated against those months (§08 FR-PAY-712) | Approver |
| MU8 | any | An attempt to create, merge or retire a UAN inside the product | — | unchanged | Refused and audited | — |

**Worked example — a second UAN surfaces after two paid months.** Suresh joins a Pune establishment on 1 July 2026 at a PF wage of ₹15,000 and gives UAN-A on his joining declaration. Each month's line carries an employee share of ₹1,800 (12%) and an employer share of ₹1,800, of which ₹1,250 goes to EPS (8.33%, capped at the ₹15,000 ceiling) and ₹550 to EPF (§06.2). That is ₹3,600 a month, or ₹7,200 across July and August, credited to UAN-A. In September, before the September ECR is generated, he tells HR he also holds UAN-B from an earlier job (MU2). The September line waits on MU3; his September pay does not. What happens next depends on his evidence:

- **UAN-A is the one to keep.** MU3 confirms it, UAN-B becomes `declared_additional`, September is generated on UAN-A, and nothing filed changes.
- **UAN-B is the one to credit, from July.** MU3 makes UAN-B active from 1 September, and September is generated on UAN-B. July and August move to WRONG_UAN_FILED (MU6). Both months are paid, so Revised is closed (EV-037) and the approved returns stand (EV-036). The ₹7,200 stays recorded as credited to UAN-A, and moving it is a recorded member-side and EPFO-side task, not a product action (§06.2 row 5; §20 V-23).

**Worked example — a DOJ correction after the month is filed.** Nisha's DOJ was keyed as 21 June 2026; she joined on 11 June. Her PF wage is ₹15,000 a month. June's Regular return carried her on ₹5,000 earned over ten days, so an employee share of ₹600; the correct twenty days give ₹10,000 and ₹1,200. The correction is typed as a correction, so its valid time starts on 11 June and June re-derives. She is already in June's return, so a Supplementary cannot carry the difference (EV-037). Before June's payment is initiated, a Revised return carries it (§06.2 row 4). After payment initiation, the extra ₹600 employee share and the matching employer share follow §06.2 rows 6–8 — an upward Revised return is not offered until validated, and the choice between the fenced arrear flow and the belated-salary route is recorded with its basis. Separately, EPFO accepts contributions only from the valid date of joining (EV-040), so the DOJ on her EPFO member record must match; the portal route to correct it is not captured (§20 V-23).

**Duplicate-person detection (FR-CHR-108).**

| Match on create, change or import | Review code | While the review is open | Resolutions | Never |
| --- | --- | --- | --- | --- |
| Same PAN on another person in the tenant | `DUPLICATE_PERSON_PAN` | The incoming PAN is not activated; an onboarding proceeds with `pan_status = pending`, so the joiner is paid | Same human: merge. Different humans: a correction on the record whose evidence fails | Auto-merge; two active persons with one PAN |
| Same UAN | `DUPLICATE_PERSON_UAN` | The incoming UAN is not activated; the member follows `UAN_PENDING` exclude-and-flag (§08 AC-701.2) | Merge — typically a rehire keyed as a new person (Example L) — or a correction | Two persons sharing one active UAN |
| Same ESI IP number | `DUPLICATE_PERSON_IP` | The incoming IP number is not activated | As for UAN | Two persons sharing one active IP number |
| Same bank account | `SHARED_ACCOUNT` | The newer person's payout line is flagged before file generation (§08 AC-901.2) | A joint-account exception recorded with its approver (FR-CHR-104), or a correction | Two salaries into one account without a recorded exception |
| Same name and date of birth, no identifier match | `POSSIBLE_DUPLICATE` | Nothing is held | Dismiss with a reason, or merge | Blocking anything |

**The duplicate review record.**

| Field | Rule |
| --- | --- |
| `review_id` | Immutable |
| `trigger` | `create`, `identifier_change` or `import_row` |
| `match_basis` | PAN, UAN, ESI IP, bank account, or name and DOB |
| `incoming_ref` | The draft person, change request or import row that raised it |
| `existing_person_id` | The matched person, always in the same tenant |
| `held_values` | Which incoming values are held unactivated while the review is open |
| `resolution` | `merge`, `not_duplicate`, `correction` or `joint_account_exception` |
| `resolution_reason`, `evidence_refs` | Required for every resolution, including a dismissal |
| `maker_id`, `checker_id`, `decided_at` | The resolution is a change request, maker-checked (§07.6a) |
| `merge_record_id` | Set when the resolution is a merge |

A merge re-points every employment, identifier history and document link to the surviving `person_id`. The other `person_id` is retired with `merged_into` and is never reused (§07.2a). Artefacts generated before the merge keep the id they were generated under, and the merge record lists them. An un-merge restores the pre-merge links; artefacts generated between the merge and the un-merge are listed for review and never re-stamped.

**Edge cases.**

- **Concurrent employments in two legal entities of one tenant** (FR-CHR-018): one `person`, one UAN, two `establishment_mapping` rows and two PF Member IDs, with each establishment's ECR built from its own snapshot. Whether EPFO accepts concurrent contributions on one UAN is not captured, so the second concurrent mapping raises `CONCURRENT_PF_MEMBERSHIP` for operator review (§20 V-23). It is not blocked.
- **A PAN correction inside a quarter already filed** changes that quarter's deductee row. It is handled by a correction statement, never a regeneration (§08 FR-PAY-708).
- **A name change by marriage or deed** is a succession of name as per PAN and of name as per UAN, each with its own evidence. ECR field 2 follows the UAN record (EV-035), so until the UAN-side name changes, the ECR keeps the old UAN name.
- **A passport renewal** for an International Worker is a succession; the Certificate of Coverage references the employment, not the passport, so it survives the renewal.
- **A UAN declared on a migrated row that another migrated row also carries** opens `DUPLICATE_PERSON_UAN` inside the import; the load report lists both rows, and neither UAN activates until the review closes (§16.7 AC-MIG-4).
- **A correction whose evidence arrives after the employee has left** is still accepted and routed; the exit does not freeze the identifier, because FnF, Form 130 distribution and a later Supplementary may all read it.
- **An identifier changed while an attended portal session for the same establishment is open** does not reach that session. The session works on its bound object (§22 FR-OPS-004), and the change enters the next generation.
- **A bulk identifier update after go-live** — an employer's file of UANs or PANs — becomes one typed change request per row under one batch (FR-CHR-087, FR-CHR-128). The validation catalogue runs row by row, a row matching another person opens a duplicate review, and rows are approved item by item.

**What "verified" means for each identifier.** The linkage states in §14.4.2 carry a verified state for several identifiers; this is what moves an identifier into it. Where no verification source is captured, the product says so rather than implying one.

| Identifier | Verified when | Verified by | Not verified by |
| --- | --- | --- | --- |
| Bank account | Penny-drop succeeds and the returned name matches (FR-CHR-006) | The bank channel (§16.3) | A cancelled cheque alone |
| UAN seeding | Evidence of seeding is recorded and approved (FR-CHR-005) | The employer's user from the portal under §22.3, or the employee's evidence; the portal view that shows it is a §20 V-23 fact | The employee's say-so without evidence |
| UAN, as a number | An approved return carries it without a portal rejection for that line | EPFO, through the filing ledger | The format mask alone, which only makes it well-formed |
| ESI IP number | Recorded from the ESIC portal at registration (FR-CHR-042) | ESIC, through the attended task | The format mask alone |
| PAN | A Form 138 statement carrying it is accepted, or the checker reviews an evidence document | TRACES, through the filing ledger; the checker | No PAN verification service is captured, so the source is `pan.verification_source`, routed to §20 |
| Name as per PAN or UAN | The corresponding filing accepts it | TRACES or EPFO | Display-name equality |
| Aadhaar | Never verified by the product (EV-070) | — | Any product check beyond the format mask |

**Worked example — a rehire keyed as a new person, and the merge.** Anjali (Example L) is rehired 14 months after leaving, and onboarding keys her as a new person with her old UAN. The UAN match opens `DUPLICATE_PERSON_UAN`; her new UAN row stays inactive, and her first month's ECR line follows `UAN_PENDING` exclude-and-flag, while she is paid in full. The HR admin proposes a merge, and the compliance checker approves it with her joining declaration as evidence. The new employment moves under her original `person_id`, the UAN activates from her rehire date (MU1), and the retired `person_id` keeps `merged_into`. If her first month was excluded, the merge's activation of the UAN plays the part of EX4's evidence, and EX5 follows: a Supplementary for that month carries her line from the month's locked snapshot. Her gratuity clock is decided separately, as Example L requires.

**Acceptance criteria (identifier lifecycle).**
- A change to any statutory identifier cannot be submitted without a kind the identifier admits. The kind, `effective_from`, maker and checker are on the audit event.
- A corrected value takes valid time from the start of the wrong value, and a successor from its stated date. In both cases the old value stays readable in transaction time.
- Approving an identifier change lists every artefact that carried the old value for a covered period, by state, and applies the FR-CHR-109 table. No filed attempt's bytes change.
- A further UAN never becomes `active_for_filing` without a distinct checker's approval. The ECR for each period carries the UAN active in that period, and `MULTIPLE_UAN_DECLARED` stays open until MU4.
- No path creates, merges, retires or deletes a UAN, and every attempt is audited.
- A PAN, UAN, ESI IP or bank-account match against another person in the tenant opens a review and never merges. No match ever reads another tenant.
- A merge and an un-merge are maker-checked, keep both `person_id`s, and list every artefact generated under the retired id.
- Every generator reads each identifier from the owning level and at the time the read contract names; a read from any other level fails the FR-CHR-104 schema test.
- A PT liability for a work-location state with no PTRC on the mapped establishment computes and shows with `PT_REGISTRATION_MISSING`, and no return is offered for that state until the PTRC is recorded.
- An identifier reaches a verified state only through a source the "verified" table names.

**Test scenarios — identifier lifecycle.**

| # | Given | When | Then |
| --- | --- | --- | --- |
| T-ID-1 | A PAN keyed with a transposed digit in April, and Q1's Form 138 statement filed | The PAN is corrected in August | Q2 data carries the corrected PAN; Q1 gets a correction statement; Q1's filed attempt is byte-identical |
| T-ID-2 | A bank account used for July pay | A maker submits a correction to it | Refused with `ID-CHANGE-KIND`; succession or retirement offered |
| T-ID-3 | An employee declares a second UAN in ESS | Nobody acts before the month's ECR | The ECR uses the existing active UAN; `MULTIPLE_UAN_DECLARED` shows; payroll ran |
| T-ID-4 | The payroll user proposes the active UAN | The same user tries to approve it | Refused; a distinct compliance checker is required |
| T-ID-5 | Evidence that July and August lines went to the wrong UAN, both months paid | The operator records it | Both months show `WRONG_UAN_FILED`; no Revised return is offered; a routed task exists |
| T-ID-6 | A rehire keyed as a new person with the same UAN | Onboarding saves | `DUPLICATE_PERSON_UAN`; the new UAN row stays inactive; the joiner is paid; a merge is proposed |
| T-ID-7 | Two tenants each hold an employee with the same PAN | Either tenant creates or edits the record | No match is raised; no query touches the other tenant |
| T-ID-8 | An establishment code with an open month on its filing ledger | Its retirement is submitted | Refused, naming the open month |
| T-ID-9 | A DOJ corrected from 1 June to 1 May after May's Regular return was filed without the member | Approved | A Supplementary for May is offered, since the member is absent from May's returns (EV-037) |
| T-ID-10 | A spouse in the same tenant saves the same joint account | Saved | `SHARED_ACCOUNT`; the newer person's payout line is flagged until the exception is approved |
| T-ID-11 | A merged pair where the retired id carried three generated payslips | An un-merge is approved | Links restore; the three payslips keep their ids; artefacts generated since the merge are listed |
| T-ID-12 | An International Worker's passport renewed | Recorded as a succession | The Certificate of Coverage stays linked; the IW exemption range is unchanged |
| T-ID-13 | A value failing the Aadhaar mask, or a Virtual ID, typed into the Aadhaar field | Submitted | Refused at the store boundary; nothing is stored or logged beyond the refusal |
| T-ID-14 | A second concurrent employment in another entity of the tenant | The second mapping is saved | `CONCURRENT_PF_MEMBERSHIP` raised; both employments paid; neither ECR blocked |
| T-ID-15 | A remote employee whose work-location state has no PTRC on the mapped establishment | The month is processed | The liability computes and shows; `PT_REGISTRATION_MISSING`; no PT return is offered for that state |
| T-ID-16 | The missing PTRC recorded as an addition | Approved | The months since the work-location change are remitted under it; nothing filed under another state changes |
| T-ID-17 | A bulk UAN update file after go-live | Imported | Each row becomes a typed change request under one batch; a row matching another person opens a duplicate review; payroll is unaffected |
| T-ID-18 | A generator change that reads PAN from `employment` | The build runs | The FR-CHR-104 schema test fails, naming the read |
| T-ID-19 | A PRAN failing `id_format.pran` | Entered | Refused with `ID-PRAN-FORMAT` |

#### 07.1.2 Employment terms and statutory eligibility flags

Eligibility flags are computed, not typed. The master stores the inputs and the *derived* flag with its effective date, so that a mid-period crossing (e.g., an ESI-covered employee whose revised gross crosses ₹21,000) is handled by the statutory rule — not by an admin remembering to toggle a checkbox. A flag that an admin can flip is a flag an admin can forget; every forgotten flag is a rejected or under-remitted filing.

| FR | Requirement | MoSCoW | Phase |
| --- | --- | --- | --- |
| **FR-CHR-010** | Store **date of joining, date of confirmation, probation period, notice period, employment type** (permanent / fixed-term / apprentice / consultant / intern), and **worker vs employee** classification (the Codes distinguish "worker" for OT/registers). | Must | v1 |
| **FR-CHR-011** | Store **CTC structure and wage components** with each component tagged for its statutory treatment, feeding the **dual wage base** (PF/gratuity add-back base vs equal-pay/payment-of-wages base). The master holds the tagging; the engine (§08) computes. Retrofitting this tagging later is prohibitive — it is P0 for exactly that reason. **[Verified]** dual-base requirement (Code on Wages s.2(y) / CoSS s.2(88), both provisos read from the gazette — r1/06 findings 5–6). | Must | v1 |
| **FR-CHR-012** | **Derive PF eligibility**: mandatory if wages ≤ ₹15,000 at joining; existing-member continuation above ceiling; excluded-employee handling (wages above ₹15,000 at joining and never previously a member — §06.2; the legacy para 2(f) sub-classes are carried, not re-captured, and read as a scheme-versioned parameter `epf.excluded_employee_classes`); VPF election; employer/employee contribution basis (on ₹15,000 capped vs actual); the **EPS split** (8.33% to pension capped on ₹15,000 = ₹1,250, balance 3.67% to PF) and the **para 26(6) higher-wage joint option** (a joint written request — r5/02 finding 14). **[Verified]** the ₹15,000 wage ceiling, re-fixed under CoSS s.2(89) by S.O. 2702(E) of 29.05.2026 (r1/06 finding 13); the 12% rate, re-notified for the EPF Scheme 2026 by S.O. 3582(E) of 01.07.2026 (r2/10 finding 12); the 8.33% EPS share capped at the ceiling (EPFO EPS page, r1/06 finding 14; §06.2). The option's submission window is parameter `epf.higher_wage_option_window` (§06.13). | Must | v1 |
| **FR-CHR-013** | **Derive ESI eligibility**: covered if gross wages ≤ ₹21,000/month (₹25,000 disabled); apply **contribution-period stickiness** — once covered, coverage and contribution continue to the end of the running contribution period (Apr–Sep or Oct–Mar) even if wages later cross the ceiling. **[Verified]** contribution-period rule as ESIC publishes it (ESIC contribution page, r1/06 finding 26). The ESI (Central) Rules 1950 are superseded by the Social Security (Central) Rules 2026 (research r5/04, finding 26), so the provision is re-cited through §20. ESI parameters for periods after 22 November 2026 are fenced until a successor instrument is found (§06.9, §06.13). | Must | v1 |
| **FR-CHR-014** | **Derive PT liability by work-location state**, not by residence or HQ; hold the state PT employer registration (PTRC) against the establishment the employee is mapped to; apply gender/threshold variants where the state prescribes them. **[Hypothesis]** all-states PT dataset — §06.4 holds the few states captured at a state primary source (Maharashtra, Odisha, and Karnataka's effect) and treats every other state as uncaptured; aggregator tables demonstrably disagree (r1/06 findings 28–30). The gazette-sourced all-state PT/LWF dataset is a build dependency. **Kill/validate:** ship beachhead-state slabs verified against each state gazette before v1 GA; treat any unverified state as non-fileable rather than guess a slab (Source: §20 (V-09); state PT is a v1-for-beachhead-states / v2-for-all-states split — §05). | Must (beachhead states) | v1 |
| **FR-CHR-015** | **Derive LWF liability by state** (levy yes/no, employee/employer share, periodicity — monthly/half-yearly/annual, gender variants). **[Reversed]** v0.3 called this parity with Frappe HR, which it said ships "LWF across 14 states, free". The Frappe HR v16 source code has no LWF anywhere and no Indian state name in the repository (EV-031), and TallyPrime has no LWF engine and no state PT slab table (EV-032). Both are declared capability — Frappe's source repository and Tally's product documentation were read, and neither product was executed; capture dates are in §21. Multi-state LWF (and PT, FR-CHR-014) is greenfield in both incumbents, so this is a **differentiator**, not parity. **[Verified — structure only]** LWF is state-enacted, contributions are flat amounts in most states, and periodicity varies between monthly, half-yearly and annual; every rupee amount and due date in circulation is disputed between secondary sources (r1/06 finding 53; §06.8). | Must (beachhead states) | v1 |
| **FR-CHR-016** | **Track gratuity accrual inputs**: a continuous-service ledger from DOJ that counts days, not calendar time — 240 days actually worked in a twelve-month period (190 for underground mine workers or establishments working under six days a week), or 120 in six months (95), with lay-off, paid earned leave, temporary disablement from employment injury and maternity leave up to 26 weeks counted (CoSS s.54 **[Verified]**, r1/06 finding 44). Apply the 5-year condition, which does not apply on death, disablement or fixed-term expiry (CoSS s.53 **[Verified]**). The "4 years + 240 days satisfies the fifth year" reading is a High Court line under the repealed Act, not uniformly settled and untested under the Code, so it is a configurable eligibility test (`gratuity.four_years_240_days_rule`) that never auto-approves a claim at exactly 4y240d **[Hypothesis]** (§06.6). Accrue liability each period on the add-back wage base. | Must | v1 |
| **FR-CHR-016a** | Maintain the **applicable minimum wage** per state / employment category / skill category (unskilled/semi-skilled/skilled/highly-skilled) and a slot for the **national floor wage**, effective-dated, so the master can (a) validate that a component-tagged `basic+DA` is not below the applicable minimum wage, (b) supply the bonus-computation floor (FR-CHR-018a, Example H), and (c) supply the notice-pay/encashment floor. The Codes make "wages must not be below the floor" a live validation, not a payroll afterthought. **[Verified]** the structure: minimum rates are fixed by the appropriate Government and may not be below the floor wage the Centre fixes (Code on Wages ss.6, 8(4), 9 — r1/06 findings 51–52). No floor-wage notification has been located (r1/06 finding 51), so the floor-wage slot stays empty until one is, and the check reads only the state rate meanwhile. State rates are re-indexed through Variable Dearness Allowance, reported as twice a year from 1 April and 1 October **[Hypothesis — single secondary source]** (r1/06 finding 50); the ingest cadence is parameter `min_wage.vda_revision_dates`. **[Hypothesis]** the full state × employment × skill matrix is the same gazette-sourced build dependency as PT/LWF; **kill/validate:** ship beachhead-state minimum wages verified against each state notification before v1 GA, treating unverified states as validate-warn-only (Source: §20 (V-09) all-state dataset). | Should (beachhead states) | v1 |
| **FR-CHR-017** | Store **tax regime election** per Tax Year ("financial year" for periods before Tax Year 2026-27 — EV-050): the new regime is the default since AY 2024–25, and the old regime is an explicit opt-in. Also store the **Form 124 (ex-12BB)** investment-declaration and proof state, which drives TDS under s.392 (ex-s.192) (EV-050). **[Verified]** new regime default since FY 2023-24 (r1/06 finding 40, medium: long-established, re-read from vendor content; 1961-Act s.115BAC(6), 2025-Act section unmapped). | Must | v1 |
| **FR-CHR-018** | Support **multiple concurrent employments / dual-employment declarations** and previous-employer income (Form 122, ex-12B — EV-050) for correct annual TDS aggregation and mid-year-joiner handling. | Should | v1 |
| **FR-CHR-018a** | **Derive statutory bonus eligibility** and store its inputs; the engine computes at year-end. Code on Wages s.26 sets the minimum (8.33% of wages earned, or ₹100 if higher, for an employee with at least 30 days' work in the accounting year) and the maximum (20%) **[Verified]** (r1/06 finding 46). It delegates the calculation ceiling to the appropriate Government, and eligibility ceilings can therefore diverge by state, so both are **per-state rule parameters** (§06.7). The familiar ₹21,000 eligibility and ₹7,000-or-minimum-wage calculation ceiling are the Payment of Bonus (Amendment) Act 2015 figures, reported by a law-firm note (r1/06 finding 47, medium) — the legacy section numbers are carried, not re-captured — and **[Hypothesis]** for Code-era periods until a s.26 notification is located (§06.7). **[Reversed]** v0.3 said these figures were "carried into" the Codes. | Should | v1 |
| **FR-CHR-018b** | Hold **statutory leave and benefit entitlements** as effective-dated master facts the leave engine reads: earned/annual leave with the Code's accrual and carry-forward/encashment caps; **maternity benefit** under CoSS Chapter VI, which applies to every shop or establishment with 10 or more employees on any day of the preceding twelve months (First Schedule, r1/06 finding 55); the medical bonus of ₹3,500 or a notified amount, payable only where the employer provides no free pre- and post-natal care (s.64); six weeks' leave for miscarriage or MTP and two weeks after tubectomy (s.65); nursing breaks until the child is fifteen months old (s.66); and crèche linkage at the 50-employee gate, a number the Code makes prescribable (s.67; FR-CHR-023). **[Verified]** (r1/06 findings 55–56). The standard entitlement is held as parameter `maternity.weeks_standard`: 26 weeks is the figure CoSS s.54 uses when counting maternity leave toward continuous service (r1/06 finding 44). The reduced third-child entitlement and the adoption/commissioning-mother variants are carried from the repealed Maternity Benefit Act, not re-captured, and are parameters (`maternity.weeks_reduced`, `maternity.adoption_variants`) routed to §20. The master holds *entitlement and eligibility*; the attendance/leave section computes balances (§09). | Should | v1 |
| **FR-CHR-019** | Hold **NPS (corporate) subscription** (PRAN), and voluntary deductions (loans, salary advance, society) with their own schedules. | Could | v2 |

**Wage-component tagging model (FR-CHR-011) — the field that makes the dual base possible.** Each component of the CTC carries flags, not a single "type"; the same component can be included in one base and excluded from another. Storing a single statutory-type enum is the retrofit trap. Minimum tag set per component:

| Tag | Drives | Example values |
| --- | --- | --- |
| `pf_wage` | PF/EPS add-back base (Code on Wages s.2(y)) | Basic, DA → yes; HRA, conveyance → no (subject to 50% add-back) |
| `esi_wage` | ESI gross — ESIC's item-by-item treatment under legacy ESI Act s.2(22), which does not match the Code wage definition (r1/06 finding 27; §06.3) | most cash components → yes; washing allowance → no (ESIC wages page) |
| `pt_wage` | PT slab computation (state gross) | state-dependent |
| `equal_pay_wage` | Code on Wages payment-of-wages/equal-remuneration base — the s.2(88) second proviso adds back sub-clauses (d), (f), (g), (h) (r1/06 finding 6) | broadest — includes HRA, conveyance, OT |
| `esi_excluded` | components ESI excludes | e.g., statutory bonus, an annual payment at intervals exceeding two months (§06.3, §06.7) |
| `taxable` / `exempt_section` | TDS under s.392 (ex-s.192), exemptions (HRA 10(13A), LTA, etc. — 1961-Act numbering) | HRA → exempt-partial; children education → exempt-capped |
| `fbp_flexible` | FBP declaration surface (FR-CHR-072) | meal card, telephone, LTA |

**PF/EPS contribution decision logic (FR-CHR-012).** The single "12%" hides four sub-decisions the derivation must make, each effective-dated:

1. **Coverage.** Wages ≤ ₹15,000 at joining → mandatory member. Above ₹15,000 and never a member → excluded unless the employer opts to cover. Existing member joining above ceiling → continues.
2. **Contribution base.** Employer may contribute on capped ₹15,000 or on actual wages; store the establishment default and the per-employee override; the para 26(6) joint written request permits contribution on wages above ₹15,000 (r5/02 finding 14). EPS on actual wages above the ceiling (the higher-pension route) is a separate, per-member election whose operational rules have shifted repeatedly; the master stores the member's EPFO approval status and never infers it from wage level (**[Hypothesis]**, §06.2 kill criterion).
3. **EPS split.** Of the employer's 12%, **8.33% of the pension wage (capped at ₹15,000 → max ₹1,250)** goes to EPS; the balance to EPF. An employee — domestic or IW — who first joined EPF after September 2014 with wages above ₹15,000 is **not** an EPS member: full employer share to EPF. **[Verified]** the ₹1,250 cap and the post-2014 non-membership rule (EPFO EPS page, r1/06 finding 14; EPFO revamped-ECR FAQ, r5/02 finding 14; §06.2). EPFO's FAQ is inconsistent on whether 1 September 2014 itself is inside the rule, so the boundary reads parameter `epf.eps_closure_boundary_inclusive` (§06.2). The revamped ECR only *flags* this case before filing; it does not reject it (only the age-58 EPS rule is a hard system block — EV-040). The derivation here is therefore the control, and a wrong split is accepted by EPFO silently.
4. **VPF.** Employee voluntary contribution above 12% — stored as an election with effective date, employer share unchanged.

**Acceptance criteria (eligibility block).**
- Given an employee joining at PF wages (§06.10) of ₹14,000 later revised to ₹16,000, PF eligibility stays mandatory-member with the effective-dated basis change captured; the ECR for each period uses the basis in force for that period; the employer contribution base follows the establishment/override rule, not the raw gross.
- Given an employee joining at PF wages of ₹40,000 with no prior PF membership, the derivation marks them excluded-eligible (employer opt-in decision surfaced), and if covered, no EPS membership is created (post-01.09.2014 rule), so the full employer 12% routes to EPF.
- Given an ESI-covered employee revised above ₹21,000 gross in July, the derived flag keeps coverage through 30 September (end of the Apr–Sep contribution period) and drops it from 1 October, with both effective-dated transitions visible in history.
- Given a transfer changing work-location state (FR-CHR-050-tr), PT liability re-derives to the new state from the effective date, and the prior state's return for the pre-transfer portion is unaffected.
- Given a wage component re-tagged, both wage bases recompute for any open/retro period and the change is audited; a closed-and-filed period is *not* silently altered — it requires an explicit retro/arrears run against the historical rule version (FR-CHR-093).
- Given an employee with basic+DA ₹18,000, statutory bonus is derived on the calculation ceiling in force for the state and period (legacy: ₹7,000 or the minimum wage, whichever is higher), not on ₹18,000; under the legacy eligibility ceiling an employee at basic+DA ₹22,000 is derived bonus-ineligible, and an employee with fewer than 30 days' work in the accounting year is ineligible under s.26(1). Both ceilings are read from the per-state rule parameters (FR-CHR-018a), never hard-coded.
- Given a continuous-service ledger that reaches 4 years and 240 counted days, the gratuity derivation reports "eligible under `gratuity.four_years_240_days_rule` — jurisdiction confirmation required" with the day count, and does not auto-approve the claim (FR-CHR-016).
- Given a wage structure whose component-tagged `basic+DA` falls below the applicable state/skill minimum wage in force for the period (FR-CHR-016a), the master raises a minimum-wage validation before the structure is activated — a warning where the state minimum is unverified, a block where it is verified — so a sub-floor wage is never silently filed.

#### 07.1.2a Eligibility derivation — inputs, triggers, outcomes and the explainer

FR-CHR-012 to FR-CHR-016a say *what* is derived. This block says how the derivation behaves, because a derived flag nobody can explain is a flag nobody can defend in front of an inspector, a CA, or an EPFO field officer asking why a member's EPS line is zero. §06 owns the statutory rules and their sourcing state; §08 computes money from the derived ranges; §14 owns the `eligibility` entity. What is specified here is the machine between them: what it reads, when it runs, what it may output, what it may never output, and what it records about its own reasoning.

<!-- DIAGRAM: fr-core-hr-eligibility-derivation -->

| FR | Requirement | MoSCoW | Phase |
| --- | --- | --- | --- |
| **FR-CHR-133** | **Derivation is a pure function of (derivation inputs, rule-set version, evaluation context).** The context is closed and enumerated: the period being derived; the as-of decision time, which is a transaction time and not a wall clock (§07.2a); the jurisdiction set — the work-location state and its sphere for that period, resolved on the work location and never on the employee (Part E-5; §14); the mapped establishment's coverage facts; and the scheme version in force for the period. The derivation reads nothing else — not "today", not a newer rule version, not another employment's facts, not a tenant preference that the rule object does not expose. Engine purity is §15's rule (Part E-3); this is its application to the master. Re-running over an unchanged input set produces byte-identical ranges (§07.2a). | Must | v1 |
| **FR-CHR-134** | **Derivation runs only on the trigger catalogue below**, plus a re-derivation at each period open and at `INPUTS_CLOSED` (§08). Each trigger declares its blast radius — which schemes, which employments and which periods re-derive — so a rule publication for one state cannot silently churn another state's history. No screen, import or API writes an eligibility value; the only write path is the derivation itself (§07.6 permissions matrix, "derived facts have no make action"). | Must | v1 |
| **FR-CHR-135** | **Every derived range carries an explainer.** The explainer records the inputs and their values as at the decision, the rule version and its citation with capture date, the branch taken, any option applied with its approver, and the decision time. It is readable by the compliance checker, exportable alongside the artefact that consumed it as inspection evidence, and kept as a record of fact with the period. It is never regenerated later to agree with a newer rule version; a changed rule produces a new range with a new explainer, and both stay readable. | Must | v1 |
| **FR-CHR-136** | **`UNDETERMINED` is a first-class outcome, and it outranks every other.** Where the rule version for the period and jurisdiction cannot be resolved — an unsourced state PT or LWF row (FR-CHR-014, FR-CHR-015), ESI parameters for periods after 22 November 2026 while they are fenced (§06.9), an unset `no_pan_tds_floor`, an unset `transfer_month_rule` — the derivation returns `UNDETERMINED` with the readiness reason, and never a default, a guessed slab, a neighbouring state's value or a silent zero. Payroll still runs and the employee is still paid; the affected line is non-fileable until the row is sourced or an operator records a decision (§07.7b readiness item, state DISPOSED). | Must | v1 |
| **FR-CHR-137** | **Options are the only place a human enters a derivation, and an option is never an outcome.** The rule object declares which options it exposes; the master holds the tenant's or the member's recorded choice; the derivation applies it. The v1 option set is: the employer's decision to cover an excluded employee (FR-CHR-012); the employer contribution basis, capped ₹15,000 or actual wages, as an establishment default with a per-employee override; the para 26(6) higher-wage joint request and the member's EPFO approval status; `epf.iw_wage_basis` (FR-CHR-007); and a `gratuity.four_years_240_days_rule` confirmation (FR-CHR-016). Each option is a maker-checked change (§07.6a) with its own effective range, and each appears by name in the explainer. Nobody edits an outcome, and no option may be recorded for a scheme whose rule object does not expose it. | Must | v1 |

**What each derivation reads, and what it may return.** The inputs column is the complete read set for that scheme: an input not listed is not read, which is what makes the purity assertion testable.

| Derivation | Inputs read from the master | Rule object | Outcome domain | Consumed by |
| --- | --- | --- | --- | --- |
| EPF membership and basis (FR-CHR-012) | PF wage base from the tagged wage structure; DOJ; PF joining declaration (FR-CHR-045a); prior-membership evidence; establishment EPF coverage; recorded options | `epf.*` for the period (§06.2) | ELIGIBLE · NOT_ELIGIBLE · LATCHED_CONTINUING · NOT_COVERED_ESTABLISHMENT · OPTION_PENDING · UNDETERMINED | §08 ECR lines; readiness |
| EPS membership (FR-CHR-012) | First EPF membership date; PF wage at that date; DOB; International Worker status | `epf.eps_*`, incl. `epf.eps_closure_boundary_inclusive` (§06.2) | ELIGIBLE · NOT_ELIGIBLE · UNDETERMINED | §08 EPS split; the age-58 hard block (EV-040) |
| ESI coverage (FR-CHR-013) | ESI gross from the tagged structure; disabled-employee status where a `HEALTH_DISABILITY_STATUS` grant exists (FR-CHR-007); establishment ESI coverage and its notification state; the running contribution period | `esi.*` (§06.3, §06.9) | ELIGIBLE · NOT_ELIGIBLE · LATCHED_CONTINUING · NOT_COVERED_ESTABLISHMENT · UNDETERMINED | §08 contribution rows |
| PT liability (FR-CHR-014) | Work-location state for the period; PT wage base; gender where the state prescribes a variant; the mapped establishment's PTRC for that state | `pt.<state>.slabs` (§06.4) | ELIGIBLE · NOT_ELIGIBLE · UNDETERMINED | §08 PT return |
| LWF liability (FR-CHR-015) | Work-location state; LWF wage basis; periodicity for the state; the establishment's LWF registration | `lwf.<state>.*` (§06.8) | ELIGIBLE · NOT_ELIGIBLE · UNDETERMINED | §08 LWF remittance |
| Gratuity eligibility and clock (FR-CHR-016) | Continuous-service ledger; DOJ; exit type; the recorded `gratuity.four_years_240_days_rule` confirmation | `gratuity.*` (§06.6) | ELIGIBLE · NOT_ELIGIBLE · OPTION_PENDING · UNDETERMINED | §08 accrual; FnF (§07.3.4) |
| Statutory bonus eligibility (FR-CHR-018a) | Wages earned in the accounting year; days worked; the state's eligibility and calculation ceilings | `bonus.<state>.*` (§06.7) | ELIGIBLE · NOT_ELIGIBLE · UNDETERMINED | §08 year-end bonus |
| Minimum-wage validation (FR-CHR-016a) | Component-tagged basic plus DA; state; employment and skill category | `min_wage.<state>.*` | PASS · WARN where the state rate is unverified · FAIL | Structure activation; readiness `MIN_WAGE_BELOW_FLOOR` |
| Maternity and crèche entitlement (FR-CHR-018b) | Establishment headcount facts (§06.1); the employee's entitlement inputs | `maternity.*` | ELIGIBLE · NOT_ELIGIBLE · UNDETERMINED | Leave engine (§09); §11 |

**The outcome domain — what each value means and what it obliges.** These are the only values an `eligibility` range may hold. A scheme that needs a new one gets it through a rule-object change, not a code branch.

| Outcome | Meaning | What §08 does with it | Readiness | How it closes |
| --- | --- | --- | --- | --- |
| `ELIGIBLE` | The scheme's test is met for the period on the rule version named | Computes and includes the line | None | Re-derivation on any trigger |
| `NOT_ELIGIBLE` | The test is not met | Computes nothing; no line | None | Re-derivation |
| `LATCHED_CONTINUING` | Coverage continues although today's test would fail — the ESI running contribution period (Example A), or an existing PF member above the ceiling | Computes on the period's actual wage, not the ceiling test | None | The latch's own exit condition — the end of the contribution period, or exit |
| `NOT_COVERED_ESTABLISHMENT` | The employee's own test is met but the mapped establishment is not covered — below the line, or in a district where ESI is not notified (§07.3.1 edge cases) | Computes nothing; the derivation is retained so a later crossing or notification turns it on without re-keying | Informational on the establishment, not on the employee | A crossing (§07.2b) or a notification |
| `OPTION_PENDING` | The rule exposes an option that decides the outcome and none is recorded | Computes nothing for that scheme and flags the run | The scheme's reason code | The option is recorded and checked (FR-CHR-137) |
| `UNDETERMINED` | The rule version for the period and jurisdiction cannot be resolved | Computes nothing; the line is non-fileable; the employee is still paid | `PT_STATE_UNVERIFIED`, `NO_PAN_FLOOR_UNSET`, `PT_TRANSFER_MONTH_RULE_UNSET`, `ESI_CEILING_CHANGE_TIMING_UNSET` or the scheme's own reason | The row is sourced (§22 rule pipeline), or an operator records a decision (DISPOSED) |

**The trigger catalogue (FR-CHR-134).** "Open periods" means every period not yet LOCKED; a trigger reaching a LOCKED period does not rewrite it — it raises a correction candidate for §08 (FR-CHR-109, Part E-1).

| Trigger | Schemes re-derived | Period scope | Raised by |
| --- | --- | --- | --- |
| Wage structure or component tag change | EPF, ESI, PT, LWF, bonus, minimum wage | Every period the change's valid time covers | FR-CHR-011, FR-CHR-051 |
| Establishment mapping change (statutory transfer) | All | From the mapping's effective date | FR-CHR-050-tr |
| Work-location change without a mapping change | PT, LWF | From its effective date | FR-CHR-053 |
| DOB or DOJ correction | EPS, gratuity, EPF, bonus | From the corrected valid time | FR-CHR-106 |
| Engagement-type or worker/employee classification change | Gratuity, bonus, and the establishment's headcount series (§07.2b) | From its effective date | FR-CHR-010 |
| Employment status change (§07.3.5) | EPF, ESI, PT, LWF for the affected periods | The periods the status covers | FR-CHR-143 |
| `HEALTH_DISABILITY_STATUS` granted or withdrawn | ESI | From the grant or withdrawal date forward, never retrospectively into a filed period | FR-CHR-114, FR-CHR-116 |
| An option recorded, changed or withdrawn | The scheme that exposes it | The option's effective range | FR-CHR-137 |
| A rule version published for a jurisdiction | Every scheme the rule governs, for that jurisdiction only | Open periods in the rule's effective range | §22 rule pipeline |
| Establishment coverage fact changes — a threshold crossing or a notification | The scheme the fact governs | From the crossing or notification date | §07.2b, §06.1 |
| Migration load completes; a person merge or un-merge | All, for the loaded or merged employments | Open periods | FR-CHR-098, FR-CHR-108 |
| Period open; `INPUTS_CLOSED` | All | That period | §08 |

**The explainer record (FR-CHR-135).**

| Field | Rule |
| --- | --- |
| `explainer_id`, `eligibility_range_ref` | One explainer per derived range, immutable |
| `scheme`, `outcome`, `valid_from`, `valid_to` | The range it explains |
| `inputs` | Each input the read set names, with the value in force at the decision and the entity it was read from |
| `rule_version`, `citation`, `capture_date` | The rule object's version, its citation and the date the citation was captured (§22 FR-RULE-003) |
| `branch` | The named branch of the rule that decided the outcome, in the rule's own vocabulary |
| `option_ref` | The recorded option and its checker, where one was applied |
| `jurisdiction` | State and sphere for the period, and the establishment the mapping resolved to |
| `decided_at` | Transaction time, NTP-synced (EV-062) |
| `marker` | The rule object's own marker — **[Verified]**, **[Hypothesis]** or fenced — carried through, so an outcome resting on an unverified row says so wherever it is read |

**Precedence, in order.** The derivation applies these in sequence and stops at the first that fires; the order is part of the contract because two of them can be true at once.

1. **Rule resolution first.** If the rule version for the period and jurisdiction cannot be resolved, the outcome is `UNDETERMINED`. Nothing below runs.
2. **Establishment coverage before the employee test.** An uncovered establishment yields `NOT_COVERED_ESTABLISHMENT` even where the employee's own test passes.
3. **Latch before today's test.** A running latch yields `LATCHED_CONTINUING` even where the current test fails (Example A).
4. **Option before branch.** Where the rule exposes a deciding option, a recorded option is applied; an absent one yields `OPTION_PENDING`, never a default.
5. **A consent-gated input that is absent is not an error.** The derivation takes the non-declared branch and records that it did: without a `HEALTH_DISABILITY_STATUS` grant, ESI derives on the standard ceiling, and the explainer says the disabled ceiling was not considered because the input was not held (FR-CHR-007).
6. **Otherwise the statutory branch.**

**Worked example — the contribution basis is an option, and the explainer has to show it.** Deepak joins a covered establishment at a PF wage of ₹14,000, so EPF membership is mandatory and the derivation returns `ELIGIBLE`. From 1 August his PF wage is revised to ₹16,000. Membership does not change — he is an existing member — but the *basis* option now decides the money, and the two branches differ:

| Basis option in force | Employee share | Employer EPS share | Employer EPF share | Employer total |
| --- | --- | --- | --- | --- |
| Capped at ₹15,000 (establishment default) | 12% of ₹15,000 = **₹1,800** | 8.33% of ₹15,000 = **₹1,250** | ₹1,800 − ₹1,250 = **₹550** | ₹1,800 |
| Actual wages, per a recorded override | 12% of ₹16,000 = **₹1,920** | Capped on ₹15,000 = **₹1,250** | ₹1,920 − ₹1,250 = **₹670** | ₹1,920 |

The EPS share is identical in both rows because the pension wage is capped at ₹15,000 (§06.2), so the whole of the difference lands in EPF. Rounding is §08's policy, not the derivation's. Deepak's August explainer names the basis option, its approver and its effective range, so a later question — "why did the employer share rise by ₹120 in August" — is answered from the record rather than reconstructed. If the establishment default had been changed instead of a per-employee override, the same explainer would name the establishment-level option, and every member on the default would re-derive from the same trigger.

**Worked example — a consent-gated input changes the ceiling, and its absence is recorded, not guessed.** Meera's ESI gross is ₹23,000. The standard ceiling is ₹21,000 and the disabled-employee ceiling is ₹25,000 (FR-CHR-007).

- **She grants `HEALTH_DISABILITY_STATUS` and the status is recorded.** The derivation returns `ELIGIBLE` on the ₹25,000 ceiling. Her contribution is 0.75% of ₹23,000 = **₹172.50**, the employer's 3.25% = **₹747.50**.
- **She withholds it.** The derivation takes branch 5: ESI derives on the standard ₹21,000 ceiling, returns `NOT_ELIGIBLE`, and the explainer records that the disabled ceiling was not considered because the input was not held. Nothing is deducted, no ESI line is generated, and no screen shows a health attribute that was never collected.
- **She grants it in October, having withheld it at joining.** The trigger re-derives from the grant date forward and never retrospectively into a filed period; whether the earlier periods can be corrected at ESIC is not captured (§08 AC-305.2), so the months before the grant stay as filed and the case is recorded, not silently back-dated.

Contribution-period stickiness for an employee who crosses the ceiling mid-period is Example A; it is the `LATCHED_CONTINUING` outcome in this table, and it is not restated here.

**Negative cases — what the derivation must refuse.**

| Attempt | Outcome |
| --- | --- |
| An admin edits a PF or ESI eligibility flag directly | No such write path exists; the permissions matrix gives derived facts no make action (§07.6) |
| An import file carries an `esi_eligible` column | The column is ignored with a load-report line; eligibility is derived from the loaded inputs (§16.7) |
| A state's PT slab is missing and the run needs a number | `UNDETERMINED` with `PT_STATE_UNVERIFIED`; no neighbouring state's slab and no zero is substituted |
| A newly published rule version is applied to a LOCKED period | Refused; the trigger raises a correction candidate for §08 instead (Part E-1) |
| A tenant sets an option the rule object does not expose | Refused at save, naming the scheme and the option |
| A derivation reads a sibling employment's wage to decide a ceiling | Refused by the read set; concurrent employments derive independently (FR-CHR-018, `CONCURRENT_PF_MEMBERSHIP`) |
| An explainer is rewritten so an old period agrees with today's rule | Refused; a new range with a new explainer is the only path |
| The assistant is asked why a member has no EPS line | It reads the explainer's branch and citation and quotes them; it never computes an answer (§12) |

**Acceptance criteria (eligibility derivation).**
- Two runs of the derivation over an unchanged input set produce byte-identical ranges and explainers, and write no audit churn (§07.2a).
- Changing a rule version and re-deriving an open period changes the outcome; the same change against a LOCKED period leaves it untouched and raises a correction candidate.
- Every derived range has exactly one explainer naming its inputs, rule version, citation with capture date, branch and decision time; an artefact export carries the explainers of the ranges it consumed.
- An unsourced rule row yields `UNDETERMINED` and its readiness reason. The payroll run completes, the employee is paid, and no artefact carries a guessed value.
- A derivation whose deciding option is unrecorded yields `OPTION_PENDING` and never a default; recording the option is maker-checked and re-derives the affected periods.
- An absent consent-gated input produces the non-declared branch with an explainer line saying so, never an error and never an inferred attribute.
- No path in the product writes an eligibility outcome except the derivation; a build introducing one fails the FR-CHR-134 test.
- An outcome resting on a **[Hypothesis]** rule row carries that marker everywhere it is displayed, including in the payslip explanation surface and the readiness report.

**Test scenarios — eligibility derivation.**

| # | Given | When | Then |
| --- | --- | --- | --- |
| T-DV-1 | An existing PF member whose wage rises above ₹15,000 | The month is derived | Membership stays `ELIGIBLE`; the basis option decides the employer share; the explainer names the option |
| T-DV-2 | An establishment in a district where ESI is not notified | A joiner at ₹19,000 gross is activated | `NOT_COVERED_ESTABLISHMENT`; no contribution; the derivation is retained for a later notification |
| T-DV-3 | The same establishment is later notified | The coverage fact changes | ESI re-derives from the notification date forward; earlier periods are untouched |
| T-DV-4 | A work-location state whose PT rows are not sourced | The month is processed | `UNDETERMINED` with `PT_STATE_UNVERIFIED`; payroll completes; no PT return is offered |
| T-DV-5 | A PF wage of ₹40,000 at joining with no prior membership and no recorded employer decision | The month is derived | `OPTION_PENDING`; nothing computed for EPF; the decision is raised as a maker-checked change |
| T-DV-6 | That decision recorded and checked | Re-derivation runs | The outcome moves to `ELIGIBLE` or `NOT_ELIGIBLE` per the decision, from the option's effective date |
| T-DV-7 | An employee with no `HEALTH_DISABILITY_STATUS` grant at ₹23,000 gross | ESI is derived | `NOT_ELIGIBLE` on the ₹21,000 ceiling; the explainer records the unheld input |
| T-DV-8 | The grant is given in October | Re-derivation runs | ESI is derived from October forward only; filed months are unchanged and the case is recorded |
| T-DV-9 | A rule version published for Karnataka | The publication trigger fires | Only Karnataka-jurisdiction ranges re-derive; a Maharashtra employee's ranges and audit log are unchanged |
| T-DV-10 | A LOCKED August and a wage-tag change with valid time in August | The change is approved | August's ranges are untouched; a correction candidate is raised for §08 |
| T-DV-11 | An import row carrying `pf_eligible = N` for an employee whose wage is ₹12,000 | The load runs | The column is ignored and reported; the derivation returns `ELIGIBLE` |
| T-DV-12 | An `UNDETERMINED` PT line and an operator's recorded treatment for the month | The readiness re-scan runs | The item moves to DISPOSED with the decision reference; the outcome still shows `UNDETERMINED` with its explainer |

#### 07.1.3 Identity data, consent and Aadhaar optionality

This block applies Part E-6, E-11 and E-12 to the system of record. They are architectural negatives that live in the data model, not in a retention policy someone can quietly change. §14 owns the logical entities, §09 owns biometric capture and the device protocol, and §23 owns the legal analysis. This block specifies what the master does; §07.1.4 to §07.1.7 specify the operations, purposes, lifecycles and flows behind FR-CHR-099 to FR-CHR-102.

| FR | Requirement | MoSCoW | Phase |
| --- | --- | --- | --- |
| **FR-CHR-099** | **Aadhaar token store.** Hold any Aadhaar number the employee chooses to provide in a separate, separately encrypted and separately access-controlled store. Business tables reference it only by an opaque internal token — never the number and never a hash of it (Part E-6; UIDAI ADV FAQ Q23 via research r4/04, finding 14). The store: (a) accepts input only after the Sharing Regulation 5 steps — lawful purpose; a three-part disclosure (purpose, whether mandatory or voluntary, alternatives); and consent, recorded per purpose as a consent record (FR-CHR-100; EV-068); (b) transmits the number only in encrypted form — reg 6(4) makes this a legal requirement (EV-068); (c) deletes the number, and any uploaded Aadhaar document, once the consented purpose is spent (for example, seeding confirmed or IP number generated), with a configurable retention override and an audited deletion; reg 6(5) sets a ceiling, not a floor (EV-068); (d) never stores a Virtual ID (AOVR reg 4A(4) — EV-070); (e) is excluded by default from support tooling, analytics, exports, sub-processors and every outbound model call (§12 chokepoint); (f) serves only the last four digits for display, to every role; (g) takes a typed, validated number in preference to a document upload, and masks the first eight digits at ingestion where an image is unavoidable — risk mitigation under reg 6(2), not a statutory duty on a non-requesting entity (Part D-5; r4/04 finding 13). The product never performs offline verification or e-KYC on a customer's behalf (EV-070). The legal entity that stores Aadhaar numbers does not register as an OVSE (EV-069 — a corporate-structure decision, routed to counsel). Three questions stay with counsel (§23): whether the Aadhaar Data Vault / HSM regime binds a non-requesting entity (Part D-6); whether keying an Aadhaar number into the EPFO or ESIC portal makes the employer a requesting entity (Part D-7); and whether hosting outside India is lawful (Part D-15). | Must | v1 |
| **FR-CHR-100** | **Consent as a versioned, first-class record.** Each `consent_record` carries: data principal; purpose; data classes covered; regime (SPDI Rules 2011, Aadhaar Sharing Regulation 5, or DPDP once in force); notice-text version; capture form (written wherever the regime requires it); **whose artefact it is** — employer, vendor or both, because who owes the SPDI duty is under counsel review (Part D-4); and granted and withdrawn timestamps. Today SPDI r.5(1) requires consent in writing before collecting sensitive personal data, and r.3 classes financial information (bank details) and biometric information as sensitive (EV-060); DPDP itself creates no sensitive category (s.2(t), EV-059), so the written-consent gate rests on the SPDI Rules alone. So bank-account capture (FR-CHR-006), biometric enrolment (FR-CHR-103, §09) and health data such as disabled-employee status (FR-CHR-007; r.3's health limb, research r4/01) are gated on a written-consent record. The full purpose catalogue is FR-CHR-114. DPDP s.7(i) commences on or about 13 May 2027 and disapplies consent and notice for employment purposes only; the s.8 duties continue (EV-058). **The two regimes run concurrently across that date**: every record carries its regime, and no artefact is rewritten, re-dated or discarded at the switch (Part E-6). Whether the SPDI Rules survive the omission of IT Act s.43A (Part D-12), and whether one artefact can satisfy both Sharing Regulation 5 and a DPDP notice, are counsel questions (§23). Until counsel answers, they are separate records. Notice text is a versioned template cleared by counsel, never free text (Part D-20). Consent records are an erasable class (§07.2a). | Must | v1 |
| **FR-CHR-101** | **Aadhaar is optional everywhere, including the EPF and ESI flows, and its absence never blocks payroll.** No tenant configuration may make Aadhaar, or biometric enrolment, a condition of employment, payroll or any benefit. No "no Aadhaar, no payroll" and no "biometric only" switch ships (Part D-10). Code on Social Security s.142 is disclosed in the notice as the statutory context for social-security enrolment — it is drafted as an obligation on the employee — and not as a gate (research r4/04, findings 5–6). **Default behaviour when a filing needs seeding and the employee has not seeded: exclude-and-flag.** Payroll runs and the employee is paid. The member's line is left out of the affected artefact and recorded on an exception register with reason code `AADHAAR_UAN_UNSEEDED`. The operator sees the exclusion, its statutory consequence and a remediation task: route the employee to UMANG self-service seeding, so the employer never handles the number where avoidable. Once the member is seeded, the product prepares a Supplementary return for that wage month, since a Supplementary return may contain only members absent from all prior returns for the month (EV-037). It shows the system-computed s.7Q interest, which is mandatory and auto-calculated (EV-039). The employee gets a notice saying what was excluded, why, and how to fix it. Alternatives stay configurable pending counsel: (b) generate with the line included and warn; (c) block generation for the establishment until seeded — listed for completeness, not recommended, because it turns one employee's choice into an establishment-wide late filing. Blocking payroll is not an option. The final default, and when the employee share is deducted while the line is excluded, go to counsel (§23). One reported fact could change the counsel question but not the default: r1 reads EPF Scheme 2026 para 25, from a secondary reproduction at medium confidence, as requiring Aadhaar, an Aadhaar-seeded bank account, PAN and UAN. The gazette reading is routed to §20 (V-24) and §23 (§06.2), and no hard-block configuration ships whatever it says (Part D-10). A date of exit can be marked without any Aadhaar update (research r5/02, finding 13). | Must | v1 |
| **FR-CHR-102** | **Migration consent flow — consent cannot be backfilled.** An import never carries a consent artefact the source system did not hold, and the importer never synthesises one (Part E-12). Migration runs an onboarding consent flow for every migrated employee: (a) **what is captured** — the SPDI written-consent set (financial information such as bank details; biometric information — EV-060) as written consent, per purpose. Everything else is captured as a notice acknowledgement, not recorded as consent-as-basis. An Aadhaar number held by the source enters the token store only after a Sharing Regulation 5 consent is recorded (FR-CHR-099); otherwise it is left behind, and the migration report says so. Written-consent evidence the employer already holds may be attached with its original date and provenance, marked as imported evidence and never re-dated. (b) **In whose name** — every record states whose artefact it is (Part D-4). (c) **Which notice text** — the counsel-cleared template version for that purpose and regime (Part D-20). (d) **Non-responders** — reminders go out on a configurable cadence. For the SPDI set, the product neither collects nor accepts the data without consent or imported evidence. The import loads bank details only for employees whose status allows it; for the rest it drops those columns from the persisted record and lists them (FR-CHR-119, FR-CHR-120; §05 TO8). Those employees are paid by the tenant's configured alternative disbursal mode until consent exists. The permissible modes are a named parameter (`non_bank_disbursal_mode`) to be confirmed through §20, and the decision is recorded against the employee with its actor. Biometric templates from the source are never imported, and non-responders use the non-biometric attendance path (§09). Non-SPDI employment data continues to be processed; the statutory basis is under counsel review (§23). Payroll is never blocked. The migration reconciliation report lists non-responders per purpose (FR-CHR-098). | Must | v1 |
| **FR-CHR-103** | **Biometric identity boundary (the master's side).** The person record holds no biometric template, image or hash of either. Templates live in a separate keyspace, as a template entity distinct from the attendance event, so the attendance record survives template destruction (Part E-6; §09 owns capture and the device protocol). No image column or image bucket exists anywhere, and enrolment images are deleted after template extraction. On exit, on withdrawal of consent, or on a switch to the non-biometric path, the master triggers the two-phase device-side erasure specified in §09: a delete command per device, a per-device acknowledgement, a retry queue, and a documented exception state (admin attestation of decommission or loss). The person record shows erasure state per device. Enrolment requires a written SPDI consent record (FR-CHR-100; EV-060). Biometric data is never described as sensitive "under DPDP": DPDP has no sensitive category (EV-059), while SPDI r.3 does classify biometric information as sensitive (EV-060) — Part D-19. Whether s.7(i), once in force, authorises biometric capture is a counsel question (Part D-2). | Must (where biometric capture is enabled) | v1 |

**Biometric erasure as the person record shows it (FR-CHR-103).** §09.3-B owns the protocol and its states; the person record only shows them, to the HR admin who administers enrolment and never to a manager (§09 EL-5).

| §09 per-device state | Shown on the person record as | Effect on the exit checklist |
| --- | --- | --- |
| Delete command queued or sent | "Erasure requested" with the device and time | None; FnF and the relieving letter never wait for erasure |
| Acknowledged by the device (`erased-confirmed`) | "Erased" with the acknowledgement time | Item closed |
| No acknowledgement; in the retry queue | "Retrying" with the attempt count | Item open; visible on the enrolment admin's queue |
| Closed through the documented exception (`closed-by-attestation`) | "Closed by attestation" with the attesting admin — never "Erased" | Item closed, labelled as attested |
| The same device reports the template again after attestation | "Reopened" | Item reopened (§09.3-B) |

**Acceptance criteria (identity data and consent).**
- No business table, audit record, log line, export, analytics store or model-call payload contains an Aadhaar number or a hash of one; a schema and egress test asserts this on every build.
- An Aadhaar field refuses input until a Sharing Regulation 5 consent record exists for that purpose. When the purpose is spent, the number is deleted and the deletion audited, and the business-table token then resolves to a tombstone.
- An employee who declines Aadhaar, or whose UAN is unseeded, is paid in the same run. The ECR leaves out that member's line, and the exclusion appears on the exception register, as an operator task and in an employee notice. Once the member is seeded, the product offers the Supplementary return for the month with the 7Q interest shown.
- No tenant setting exists that blocks onboarding, payroll or a benefit for want of Aadhaar or biometric enrolment.
- Bank-account capture and biometric enrolment are refused without a written-consent record. Every consent record carries its regime, notice version and owner, and records survive the ~May 2027 regime switch unaltered.
- A migrated employee holds a consent record only if one was captured in the migration flow or attached as dated evidence; the migration report lists non-responders per purpose.
- On exit, template erasure goes to every device holding the template. A device that does not acknowledge stays in retry until it does, or until an admin attestation moves it to the exception state. Attendance history is unaffected.

#### 07.1.4 The Aadhaar token store — operations, purposes, reveals and purge

FR-CHR-099 says what the store is and what it refuses. This block says what may be done to it, for which purpose, by whom, and when a number leaves it for good. §14.4.15 holds the entity shape and §23.9 the legal analysis. One fact keeps the store small. Since 1 August 2025 the employee generates and activates the UAN through face authentication in UMANG, and the employer route survives only for International Workers and citizens of Nepal and Bhutan (research r4/04 finding 7). Seeding a UAN is also the employee's own act. For an ordinary employee the product therefore has **no purpose that needs the full number**, the store's normal state is empty (FR-CHR-101), and a held number is an exception with a named purpose and a short life.

| FR | Requirement | MoSCoW | Phase |
| --- | --- | --- | --- |
| **FR-CHR-110** | **The store exposes six operations and no others:** PUT, SHOW_LAST_FOUR, REVEAL_FOR_PURPOSE, MARK_PURPOSE_SPENT, PURGE and RESOLVE_TOKEN (table below). No other read or write path to the number exists — not a report, an export, a search index, a support tool, a restore into a business store, or a model call. Every operation writes an audit event that carries the token and the purpose, never the number. A new path fails the build until the FR-LEG-018 review records it (FR-LEG-018 AC1). | Must | v1 |
| **FR-CHR-111** | **Purposes are a closed catalogue.** A PUT names exactly one catalogue purpose and links a Sharing Regulation 5 grant for it (EV-068). A number held for two purposes is stored once under two grants and purged when the last purpose is spent. Tenants cannot add purposes. A purpose enters the catalogue only through the FR-LEG-018 review, with a counsel-cleared notice template (Part D-20). | Must | v1 |
| **FR-CHR-112** | **A reveal is purpose-bound, task-bound, human and recorded.** REVEAL_FOR_PURPOSE serves the full number only to a human holding the compliance-checker role in scope (the matrix's only full-value cell, FR-CHR-105). It needs an open portal task of the purpose's type on the same person, a live grant, and an unspent purpose. The number shows in the task view for `aadhaar.reveal_window_seconds` and is never written to a log, notification, export or the session evidence the product keeps (§22.3.1). The vendor operator never reveals or keys a number (§22 AC-014.2). | Must | v1 |
| **FR-CHR-113** | **Purge runs on the purpose, not on a calendar.** The triggers are in the table below. PURGE deletes the number and any uploaded Aadhaar document, and destroys the entry's key (§14.6.1a). Afterwards the token resolves to a tombstone and no digits are served. A retention override needs a named statutory basis and a counsel reference, recorded as a maker-checked change; reg 6(5) is a ceiling, not a floor (EV-068). | Must | v1 |

**The six operations (FR-CHR-110).**

| Operation | What it does | Caller | Guard | Returns |
| --- | --- | --- | --- | --- |
| PUT | Validates the value at the boundary (`id_format.aadhaar`), stores it encrypted under the store's own keys, links the grant and the purpose | The employee only, from ESS or a private kiosk session (§09.9); HR never keys a number | A live grant for a catalogue purpose (FR-CHR-111); received over an encrypted channel, a legal requirement under reg 6(4) (EV-068); the value is not a Virtual ID (EV-070) | The opaque token and the last four digits |
| SHOW_LAST_FOUR | Serves the last four digits for display | Any caller whose matrix cell shows the Aadhaar row (FR-CHR-105) | — | Four digits, or "not held" |
| REVEAL_FOR_PURPOSE | Serves the full number for one portal act | A human with the compliance-checker role in scope | FR-CHR-112's guards | The number, in the task view only, for `aadhaar.reveal_window_seconds` |
| MARK_PURPOSE_SPENT | Records that the purpose is complete | System, when the completing fact is approved — an IP number (FR-CHR-042) or an employer-route UAN (FR-CHR-041) | The completing fact passed maker-checker | — |
| PURGE | Deletes the number and any Aadhaar document; destroys the entry key | System | An FR-CHR-113 trigger; no active retention override | A tombstone |
| RESOLVE_TOKEN | Tells a business service what state the token is in | Business services: the readiness report, Form I generation, the exclusion register | — | `none`, `held`, `spent` or `tombstone` — or `unavailable` when the store cannot answer; never the number |

No operation is callable by support tooling, analytics, exports, sub-processors or API tokens (FR-CHR-099(e)). The AI assistant may state the last four digits to the employee who owns them and nothing more (§12).

**The purpose catalogue (FR-CHR-111).** The rows marked "not a purpose" are listed so no one adds them.

| Purpose code | What it enables | Full number needed? | Who acts at the portal | Spent when | Source |
| --- | --- | --- | --- | --- | --- |
| `AADHAAR_ESIC_IP_SEEDING` | The employer seeds Aadhaar while registering the employee as an Insured Person; the ESIC portal performs the UIDAI authentication. Optional: IP registration proceeds without it | Yes, keyed into the ESIC portal | The employer's user holding the compliance-checker role; never our operator | The IP number is recorded and approved | Research r4/04 finding 9; FR-CHR-042 |
| `AADHAAR_EPFO_EMPLOYER_ROUTE` | Employer-route UAN generation, which survives only for International Workers and citizens of Nepal and Bhutan | Only if the captured runbook shows the portal asks for it (§20 V-23) | The employer's user | The UAN is recorded and approved | Research r4/04 finding 7; §22.4.5 |
| `AADHAAR_FORM_I_FIELD_24` | Rendering Form I field 24 at register generation | Yes, at generation | — | Ships dark until CR-35 answers whether reg 6(5) permits holding the number for this | FR-CHR-045-onb; §06 R24 |
| *Not a purpose:* UAN seeding | The employee seeds in UMANG; the product records `uan_seeding_status` only | No | The employee | — | Research r4/04 findings 7–8 |
| *Not a purpose:* PAN–Aadhaar linkage | The individual's obligation; a non-blocking nudge; nothing collected | No | — | — | FR-LEG-020; CR-31 |
| *Not a purpose:* verifying joiners' Aadhaar for the tenant | The multi-tenant verification feature cannot be built; any verification design passes FR-LEG-018 first | No | — | — | EV-070 |
| *Not a purpose:* attendance, e-signature, benefits, ESS login | Each has an Aadhaar-free path. Where Aadhaar eSign is offered, the licensed eSign provider handles the authentication and the product never holds the number (§16.9); nothing else authenticates by Aadhaar | No | — | — | §09; §16.9; §11 BEN-03; FR-LEG-018 rule 5 |
| *Not yet a purpose:* a dependant's number | §11 BEN-03 carries an optional dependant token into this store. Code on Social Security s.142 speaks of establishing the identity of family members and dependants through Aadhaar, but no employer-side step that needs a dependant's number is captured. Until a purpose passes FR-LEG-018, every dependant token stays `none`. Who may grant for a minor dependant is a counsel question (§23) | — | — | — | Research r4/04 finding 5; §11 BEN-03 |

**The reveal protocol (FR-CHR-112).**

1. The compliance checker opens the portal task for the purpose — for `AADHAAR_ESIC_IP_SEEDING`, the IP-registration task of FR-CHR-042.
2. The reveal request names the task. The product checks: role and scope; an open task of the purpose's type on the same person; a live grant; an unspent purpose; the requester is not the vendor operator; and no earlier reveal exists on that task without a recorded reason for a second.
3. The number shows in the task view for `aadhaar.reveal_window_seconds`, then leaves the view.
4. The reveal event is written (fields below) and is exportable as due-diligence evidence (FR-LEG-018 AC2). That matters because Aadhaar Act s.43 reaches the officers in charge personally, with a due-diligence defence (EV-067).
5. The outcome — keyed on the portal, or abandoned — is recorded when the task closes. An abandoned reveal leaves the purpose unspent, and the FR-CHR-113 ceiling keeps running.

<!-- DIAGRAM: fr-core-hr-aadhaar-reveal-sequence -->

**The store's audit event.**

| Field | Rule |
| --- | --- |
| `event_id` | Append-only, in the §14 audit store |
| `operation` | One of the six operations, or a refused attempt with its reason |
| `token` | The opaque token; never the number, never a hash of it (research r4/04 finding 14) |
| `purpose`, `grant_id` | The catalogue purpose and its Sharing Regulation 5 grant |
| `task_id` | The portal task, for a reveal |
| `actor`, `role`, `scope` | Who called, as what, over which establishments |
| `ntp_time` | NIC/NPL-synchronised (EV-062) |
| `session_id` | The interactive session, for a reveal |
| `outcome` | `served`, `refused`, `keyed_on_portal`, `abandoned`, `purged` or `override_recorded` |
| `basis` | For a purge or an override: the trigger, or the statutory basis and counsel reference |

**Purge triggers (FR-CHR-113).**

| Trigger | Detected by | Result |
| --- | --- | --- |
| Purpose spent | MARK_PURPOSE_SPENT | PURGE within `aadhaar.purge_lag_hours` |
| Grant withdrawn for the last live purpose | The withdrawal record (FR-CHR-115) | PURGE within the same lag; any open reveal task closes as withdrawn |
| Purpose unspent after `retention.aadhaar_unspent_purpose_days` | A daily sweep | A task to the compliance checker to close the purpose, then PURGE. The reg 6(5) ceiling runs to the purpose stated at consent (EV-068), so an abandoned purpose does not justify holding the number |
| Exit | The exit record (FR-CHR-058) | Any unspent purpose the exit makes unattainable closes; PURGE |
| Retention override | A maker-checked change naming a statutory basis and a counsel reference | PURGE deferred; PURGE on release. The only candidate basis so far is Form I field 24 (CR-35) |

**Incident hooks.** The store's part in an incident is fixed here; the pipeline, the six-hour CERT-In clock from awareness (EV-062) and the AI/ML incident class are §17's and §12's.

| Event | What the store does | Owner of the rest |
| --- | --- | --- |
| A suspected unauthorised reveal — a detection signal (§07.6a) or a report | REVEAL_FOR_PURPOSE is suspended for the tenant; PUT, PURGE and RESOLVE_TOKEN keep running, so no purge is delayed | §17 incident pipeline |
| A suspected compromise of the store's keys | The store's keys are rotated and entries re-encrypted; entries whose purpose is already spent are purged first rather than re-encrypted | §17.4 key management; §17 incident pipeline |
| An Aadhaar number found outside the store — by the egress test, a log scan or a support attachment | Treated as an incident: the stray copy is deleted and the deletion logged, and the path that leaked it is closed before the next build ships | §12 chokepoint; §17 |
| A model call carrying anything that parses as an Aadhaar number | Blocked at the chokepoint and surfaced, never passed (Part E-7) | §12 |
| Tenant exit (§05 TO14–TO17) | Unspent purposes end with the tenancy and their entries are purged before the export is built; the export carries token states only, never digits | §05 C-52 |

**An uploaded document.** The store takes a typed number in preference to an image (FR-CHR-099(g)). Where an employee can only offer an image, it is taken by the same PUT, the first eight digits are masked at ingestion as a reg 6(2) risk control and not as a statutory duty on a plain employer (Part D-5; research r4/04 finding 13), and it lives in the store's own object space under the store's keys, never in the §07.4 repository. It is purged with the number.

**Worked example — one employee seeds at IP registration, one declines.** Asha joins a covered Bengaluru establishment on 1 September 2026 at a gross of ₹19,000, inside the ₹21,000 ESI ceiling (FR-CHR-013). At onboarding she chooses to let the employer seed her Aadhaar at IP registration. She reads the Regulation 5 notice — the purpose, that giving it is voluntary, and the alternative of registering without it — grants in writing, and types the number at the office kiosk in a private session (PUT). Her record now holds a token and the last four digits. On 2 September the compliance checker opens her IP-registration task, reveals the number (logged) and keys it into the ESIC portal, which performs the authentication. The IP number is recorded on 3 September and approved, MARK_PURPOSE_SPENT fires, the number is purged within `aadhaar.purge_lag_hours`, and her token resolves to a tombstone. Her September ESI is 0.75% of ₹19,000 = ₹142.50 from her and 3.25% = ₹617.50 from the employer (§06.3; rounding per §08). Imran joins the same day at a gross of ₹18,500 and declines. Nothing enters the store, and his IP registration runs without seeding. His September ESI is ₹138.75 and ₹601.25. The only difference his choice makes anywhere in the product is that Form I field 24 is empty, with a reason code (FR-CHR-045-onb).

**Negative cases.**

| Attempt | Outcome |
| --- | --- |
| A Virtual ID typed into the Aadhaar field | Refused at the boundary; nothing stored (EV-070) |
| A twelve-digit value failing `id_format.aadhaar` | Refused with `ID-AAD-FORMAT` |
| An integration asking for a hash of the number as a join key | No such value exists; UIDAI's FAQ says a hash should not be used as a reference key (research r4/04 finding 14) |
| A report or export template with an Aadhaar column | The column resolves to the last four digits or "not held"; a template asking for the number fails validation |
| An Aadhaar card image sent to support | Support tooling has no store access (FR-CHR-099(e)); the support intake tells the employee not to send it, and the §12 chokepoint default-denies it on any model path |
| Aadhaar numbers present in a migration file | Not imported unless the employee grants a catalogue purpose in the migration flow (FR-CHR-102, FR-CHR-120) |
| The assistant asked "what is my Aadhaar number" | The last four digits and the store state, to the owner only (§12) |
| HR asks to key a number for a worker without a phone | Refused; the worker uses a private kiosk session. Where none exists, the purpose waits and nothing else does |
| A reveal requested by the vendor operator in a Mode B or Mode C session | Refused and audited (§22 AC-014.2) |
| A reveal requested with no open task of the purpose's type | Refused and audited |
| An analytics or reporting job resolving tokens in bulk | Refused; only the business services named in the operations table call RESOLVE_TOKEN |
| An employee asking for their number to be e-mailed back | Refused; the employee sees the last four digits, and the number is never transmitted out of the store except into the portal task (reg 6(4), EV-068) |

**Acceptance criteria (the token store).**
- A static check finds no path to the number outside the six operations. Every operation, including every refusal, writes an audit event with the token and never the number.
- A PUT without a live grant for a catalogue purpose, or with a value failing `id_format.aadhaar`, stores nothing.
- A reveal succeeds only for a compliance-checker-role human with an open task of the purpose's type on the same person, and the number appears in no log, notification, export or session evidence.
- When the completing fact of a purpose is approved, the number and any Aadhaar document are purged within `aadhaar.purge_lag_hours`, and RESOLVE_TOKEN returns `tombstone` afterwards.
- An unspent purpose reaching `retention.aadhaar_unspent_purpose_days` raises a closure task; no number survives its purpose without a recorded override naming a statutory basis and a counsel reference.
- Restoring a backup never resurrects a purged number, because the entry key is destroyed (§14.6.1a).
- A suspected unauthorised reveal suspends reveals for the tenant without delaying any purge.
- No dependant token holds a number while the catalogue has no dependant purpose.
- A reveal is refused outside an interactive session meeting §17.2, including through an API token.

**Test scenarios — the token store.**

| # | Given | When | Then |
| --- | --- | --- | --- |
| T-AV-1 | An employee with no grant | They type a number in ESS | The field accepts no input until a grant for a catalogue purpose exists |
| T-AV-2 | A live `AADHAAR_ESIC_IP_SEEDING` grant | The payroll user requests a reveal | Refused: the payroll column shows last four only |
| T-AV-3 | A compliance checker with the IP task open | They reveal and key the number | Revealed for the window; the event records task, grant and time; no copy in any log |
| T-AV-4 | The IP number approved | The purge lag passes | The number and any document are purged; RESOLVE_TOKEN returns `tombstone` |
| T-AV-5 | A grant withdrawn with the IP task open | The withdrawal is recorded | The task closes as withdrawn; the number is purged; IP registration continues without seeding |
| T-AV-6 | A purpose open past `retention.aadhaar_unspent_purpose_days` | The sweep runs | A closure task is raised; after closure the number is purged |
| T-AV-7 | A purged entry | A backup from before the purge is restored to a test environment | The entry is unreadable; the key does not come back |
| T-AV-8 | An export template listing "Aadhaar number" | It is saved | Validation fails, naming the column |
| T-AV-9 | An employee exits with a held number and an unspent purpose | Exit is recorded | The purpose closes; the number is purged; FnF is unaffected |
| T-AV-10 | A retention override proposed without a counsel reference | Submitted | Refused at submission |
| T-AV-11 | The vendor operator guiding a Mode B ESIC session | The operator requests a reveal | Refused and audited; the employer's user keys the number |
| T-AV-12 | A Form I generated while `AADHAAR_FORM_I_FIELD_24` is dark | Generated | Field 24 is empty for every employee, with a reason code |
| T-AV-13 | A detection signal on a tenant's reveals | The incident hook fires | Reveals are suspended for the tenant; a purge due during the suspension still runs |
| T-AV-14 | A dependant record in §11 with a token field | A user tries to store a dependant's number | Refused; no catalogue purpose exists for a dependant |
| T-AV-15 | A log line containing a twelve-digit value that passes `id_format.aadhaar` | The log scan runs | An incident opens; the line is deleted and the deletion logged; the emitting path is closed |
| T-AV-16 | A tenant leaving the product with two held entries | TO14's export is built | Both entries are purged first; the export shows token states only |
| T-AV-17 | A compliance checker's API token | It calls REVEAL_FOR_PURPOSE | Refused; reveals run only in an interactive session |

#### 07.1.5 Consent records — purposes, lifecycle, withdrawal and notices

FR-CHR-100 makes consent a versioned, first-class record, and §14.4.15 fixes its fields. This block specifies the purposes a record may name, the states it moves through, what a decline or a withdrawal does, and how notice versions change. Who owes the SPDI duty, and whether one artefact can serve two regimes, stay with counsel (CR-04, CR-22). §23.4 and §23's regime diagram cover the switch on or about 13 May 2027, and neither is restated here. One scope point drives the catalogue: SPDI r.3 lists as sensitive not only financial information (bank account details) and biometric information but also physical, physiological and mental health condition, and medical records and history (rule text in research r4/01). A disabled-employee flag is therefore gated exactly as a bank account is.

| FR | Requirement | MoSCoW | Phase |
| --- | --- | --- | --- |
| **FR-CHR-114** | **A governed purpose catalogue, and no write path without a grant.** Every consent record names one catalogue purpose (table below). Each purpose names the fields it gates, and a gated field has no write path — screen, import, API or assistant — without a GRANTED record for that purpose (§05 item 35's schema scan). Tenants cannot add purposes. A new purpose, or a change to a purpose's gated fields, enters through the §22 pipeline's two-person review with a counsel-cleared template (Part D-20). DPDP creates no sensitive category (EV-059), so no purpose is labelled sensitive "under DPDP" (Part D-19). | Must | v1 |
| **FR-CHR-115** | **Consent moves through explicit states:** REQUESTED, PRESENTED, GRANTED, DECLINED, PENDING, WITHDRAWN and ERASED, per the transition table below. A decline is recorded, never inferred from silence; silence becomes PENDING. A withdrawal is accepted in writing from any worker surface with no approval step — SPDI r.5(7) provides that a withdrawal "shall be sent in writing" (research r4/03 finding 4). No role grants on the employee's behalf, except HR attaching a paper form the employee signed. | Must | v1 |
| **FR-CHR-116** | **A decline or withdrawal acts forward and never on pay.** Each purpose's effect is fixed in the effects table below. None blocks payroll, onboarding or a benefit (Part D-10). None creates a field that a pay, performance or discipline rule can read; FR-CHR-126 applies the same invariant to Aadhaar and §09 EL-2 to biometrics. SPDI r.5(7) itself lets a body corporate withhold the service when data is refused (research r4/03 finding 4). The product does not build that option: what an employer may do about a refusal is CR-28, and the product's posture is fixed. | Must | v1 |
| **FR-CHR-117** | **Notice templates are versioned per purpose, regime and language.** A consent can be requested only on a cleared template for that purpose, that regime and the employee's language (§09 FR-DSK-003). The template carries the elements in the notice table below and is recorded in the template registry. When a template changes, `consent.reconsent_required.<purpose>` decides whether existing grants need a fresh grant. It is set by counsel, with no shipped default, and while it is unset existing grants stand and new grants use the new version. A grant never lapses silently. | Must | v1 |
| **FR-CHR-118** | **Consent evidence is visible to its subject and exportable by the employer.** The employee sees every record about them in "My consents" (below) and can download each signed artefact. The tenant exports the evidence set per purpose, in the format FR-LEG-011 fixes, for an audit or for a customer's counsel. Every export is an audited event. | Should | v1 |

**The purpose catalogue (FR-CHR-114).**

| Purpose code | Data classes | Basis today | Gates — no write without a grant | Declined, pending or withdrawn means | Specified in |
| --- | --- | --- | --- | --- | --- |
| `BANK_DISBURSAL` | Bank account number, IFSC and account-holder name: financial information under SPDI r.3 (EV-060) | SPDI written consent, r.5(1) | The bank-account record and its use in a payout file (FR-CHR-006) | Pay by `non_bank_disbursal_mode`, recorded on the run (§05 item 35) | §07 |
| `NOMINEE_BANK_DISBURSAL` | A nominee's bank details for a death-in-service settlement (FR-CHR-061): the financial information of the nominee, a different data principal | SPDI written consent, from the nominee | The nominee's bank record and its use in the settlement payout | Settlement by `non_bank_disbursal_mode`; the settlement clocks keep running (§07.3.4) | §07 |
| `BIOMETRIC_FINGERPRINT`, `BIOMETRIC_FACE` | Biometric templates, per modality (EV-060) | SPDI written consent | An enrolment ticket for that modality (§09 FR-ATT-025) | The non-biometric path (§09.2-A) | §09 |
| `HEALTH_DISABILITY_STATUS` | The employee's disability status used for the ESI wage ceiling (FR-CHR-007): a health condition under SPDI r.3 (research r4/01). Disability data held for RPwD accommodation and the Rule 9(1) record is §10's (FR-T-D007), on its own basis (EV-078; §23) | SPDI written consent | The flag, and every derivation that reads it | Derivations use the standard ceiling; the notice says so before the choice | §07 |
| `DEPENDANT_DISABILITY` | A dependant's disability flag | SPDI written consent | BEN-03's flag | The flag stays empty; a manual exception (§11 BEN-03) | §11 |
| `FORM_I_THUMB_IMPRESSION` | A thumb impression for Form I field 35 — biometric information | SPDI written consent | Thumb capture in the biometric keyspace; dark until CR-35 | A specimen signature (FR-CHR-045-onb) | §07 |
| `PHOTO_ON_RECORD` | The photograph for Form I field 34 — "biometric information" under Aadhaar Act s.2(g) (EV-071) | Under counsel review (CR-35); a written record is captured by default | The photo document | Field 34 empty, with a reason code | §07 |
| `AADHAAR_ESIC_IP_SEEDING`, `AADHAAR_EPFO_EMPLOYER_ROUTE`, `AADHAAR_FORM_I_FIELD_24` | The Aadhaar number | Sharing Regulation 5 (EV-068) | A PUT for that purpose (FR-CHR-111) | Nothing is held, and the flow proceeds (FR-CHR-123) | §07 |
| Purposes outside the employment purpose — dependants for insurance, wellness, optional-benefit marketing | As the owning section lists | Consent under either regime (§17 NFR-DPDP-501) | As the owning section lists | As the owning section lists | §11, §12 |

**Consent lifecycle (FR-CHR-115).**

| # | From | Event | Guard | To | Side effect | Who may trigger |
| --- | --- | --- | --- | --- | --- | --- |
| CN1 | *(none)* | The purpose becomes applicable — joining, a site enabling a biometric modality, the employee opting in, a migration consent run | A cleared template exists for the purpose, regime and language (FR-CHR-117) | REQUESTED | Notice queued on the employee's own channel (FR-CHR-088); never shown on a shared screen's public view (§09.9) | System; the employee |
| CN2 | REQUESTED | The employee opens the notice | — | PRESENTED | Template version, channel and time recorded | Employee |
| CN3 | PRESENTED | Grant | The employee is authenticated as themselves; the capture form is written (table below) | GRANTED | The gated write path opens for the purpose | Employee; HR attaching a paper form the employee signed |
| CN4 | PRESENTED | Decline | — | DECLINED | FR-CHR-116 effects; no further reminder for the purpose unless the employee reopens it | Employee |
| CN5 | REQUESTED or PRESENTED | No response after `consent.reminder_limit` reminders at `consent.reminder_cadence_days` | — | PENDING | An HR task to offer the paper route in person; no manager notice (FR-CHR-122) | System |
| CN6 | GRANTED | Withdrawal in writing | — | WITHDRAWN | FR-CHR-116 effects; no approval step | Employee; HR attaching a written withdrawal the employee handed in |
| CN7 | DECLINED, PENDING or WITHDRAWN | The employee opts in later | A current template is presented | GRANTED, as a new version | The earlier record is kept | Employee |
| CN8 | GRANTED | The template changes and `consent.reconsent_required.<purpose>` is true | Counsel's setting recorded | REQUESTED, as a new version | The existing grant stays in force until the employee answers | System |
| CN9 | *(none)* or PENDING | Imported evidence accepted (FR-CHR-121) | A distinct checker approves | GRANTED, provenance `imported` | The original date and source kept, never re-dated | HR admin proposes; compliance checker approves |
| CN10 | DECLINED, WITHDRAWN, or a superseded version | `retention.consent_evidence` runs out (§14.7) | No retention hold | ERASED | Tombstone (§07.2a) | System |
| CN11 | any | A grant attempted by HR, a manager, an API client or the assistant without a form the employee signed | — | unchanged | Refused and audited | — |

**Capture forms.** Every GRANTED and WITHDRAWN record carries its form. SPDI r.5(1) asks for consent "in writing through letter or Fax or email" (research r4/03 finding 4), and whether in-app capture meets it is CR-27, so the form is labelled on every artefact rather than assumed equivalent.

| Form | How it is captured | Evidence kept |
| --- | --- | --- |
| `written_in_app` | The employee signs in ESS or a private kiosk session after reading the template | The rendered template version, the signature event, the authenticated session |
| `written_paper` | The employee signs a printed template; HR scans and attaches it | The scan, the template version printed, the HR user who attached it |
| `email` | The employee replies from their personal e-mail (FR-CHR-009) to a notice carrying the template | The message with headers, the template version |
| `imported_evidence` | A prior artefact the employer holds, accepted under FR-CHR-121 | The artefact, its original date and its provenance |

Every signed artefact is stored with a hash on the consent record and on its audit event, and the template version it was signed against re-renders byte for byte, so what the employee saw can be shown years later exactly as shown then (the §07.4 reproducibility rule applied to consent). A re-rendered template is marked as a re-rendering; the signed artefact is never regenerated.

**Decline and withdrawal effects (FR-CHR-116).**

<!-- DIAGRAM: fr-core-hr-consent-withdrawal-effects -->

| Purpose | Takes effect | The pay period in progress | Stored data | Derivations | The employee is told | The employer sees |
| --- | --- | --- | --- | --- | --- | --- |
| `BANK_DISBURSAL` | On receipt. A payout file already released to the bank is not recalled (§16.3) | Net pay unchanged; the next unreleased disbursal goes by `non_bank_disbursal_mode` | The account is closed to new use. Account details inside past payout files and run snapshots stay under their record's retention class, restricted (§14.7). SPDI r.5(4) limits retention to the purpose "or is otherwise required under any other law" (research r4/03 finding 4); whether that reaches these records is part of CR-11 | None | That pay continues, the mode used, and how to grant again | A task naming the employee and the mode, with no reason field |
| `BIOMETRIC_*` | On receipt | Punches continue by non-biometric methods (§09.2-A) | Two-phase device erasure (§09.3-B) | None | The method now in use | Erasure progress per device; no penalty field exists (§09 EL-2) |
| `HEALTH_DISABILITY_STATUS` | From the withdrawal date, forward only | Locked periods keep their snapshots | The live flag is cleared; values inside locked run snapshots stay under retention | ESI eligibility re-derives on the standard ceiling. FR-CHR-013's contribution-period rule is written for wages crossing the ceiling, not for the ceiling changing for the person, so the month the change bites is `esi.ceiling_change_timing` (§20 V-21). Until it is set, the operator records the treatment and `ESI_CEILING_CHANGE_TIMING_UNSET` shows | The ESI consequence, stated neutrally with the withdrawal form | The re-derivation on the readiness report |
| `AADHAAR_*` | On receipt | None | PURGE (FR-CHR-113) | None | That nothing else changes | Any open task for the purpose closes as withdrawn |
| `PHOTO_ON_RECORD`, `FORM_I_THUMB_IMPRESSION` | On receipt | None | The document or thumb template is erased; copies inside generated registers follow the register's retention and CR-35 | None | That the register field will be empty from now on | Field 34 or 35 empty from the next generation |

**Notice elements (FR-CHR-117).** The template text is counsel's; the elements it must carry are fixed here so a template missing one cannot be cleared.

| Element | Source | Purposes |
| --- | --- | --- |
| The purpose of use | SPDI r.5(1) (research r4/03 finding 4); Sharing Regulation 5(1)(b)(i) (EV-068) | All |
| Whether giving it is mandatory or voluntary, and if mandatory the provision | Sharing Regulation 5(1)(b)(ii) (research r4/04 finding 24) | Aadhaar purposes: always "voluntary", with Code on Social Security s.142 disclosed as context, never as a gate (FR-CHR-101) |
| The alternatives | Sharing Regulation 5(1)(b)(iii) | Aadhaar purposes; for biometrics, the non-biometric path as a product commitment, not as a duty under r.5(7) (research r4/03 finding 4) |
| The intended recipients | SPDI r.5(3)(c) (research r4/02) | SPDI purposes: for bank details, the banks and payout partners on the sub-processor register (§12; §16.3); for Aadhaar, the portal it is keyed into |
| The option not to give it, and to withdraw in writing | SPDI r.5(7) (research r4/03 finding 4) | All |
| What declining or withdrawing changes | FR-CHR-116 | All, stated neutrally and limited to the effects table |
| The grievance contact | SPDI r.5(9): a Grievance Officer who redresses within one month (research r4/03 finding 4); FR-CHR-076 | All |
| Whose artefact it is | Part D-4; CR-04, CR-22 | All |
| The language | The employee's language (§09 FR-DSK-003) | All |

**The template registry.**

| Field | Rule |
| --- | --- |
| `template_id`, `version` | Immutable; an edit is a new version |
| `purpose`, `regime`, `language` | One template per combination per version |
| `elements_present` | A checklist of the notice elements; a missing element blocks clearance |
| `artefact_owner` | Employer, vendor or both, as counsel settles (CR-04, CR-22) |
| `cleared_by`, `cleared_at`, `opinion_ref` | The counsel clearance, linked to the counsel register (FR-LEG-040) |
| `status` | `draft`, `cleared`, `retired` — only a cleared version can be requested (CN1) |
| `reconsent_required` | Mirrors `consent.reconsent_required.<purpose>` for the version change it introduces |
| `published_via` | The §22 pipeline publish record; templates ship as rule-like objects, never as free text (Part D-20) |

**Notice acknowledgements — everything outside the consent catalogue.** FR-CHR-102(a) separates the SPDI written-consent set from everything else, which is captured as a notice acknowledgement and never recorded as consent-as-basis. The employee privacy notice ships as a template even where no statutory notice duty may attach (§17 NFR-DPDP-503); whether one attaches to s.7(i) processing once it is in force is CR-25.

| Field | Rule |
| --- | --- |
| `ack_id` | Immutable |
| `person_id` | The data principal |
| `template_id`, `version`, `language` | The privacy-notice template from the registry (FR-CHR-117) |
| `channel` | One of the delivery channels below |
| `presented_at`, `acknowledged_at` | NTP time; `acknowledged_at` stays empty until the employee acknowledges |
| `superseded_by` | The acknowledgement of the next version, once given |
| Retention | `retention.notice_acknowledgement`, a counsel-set parameter |

| Aspect | Consent record (the catalogue) | Notice acknowledgement |
| --- | --- | --- |
| What it records | A grant, a decline or a withdrawal for one purpose | That a notice version was presented and acknowledged |
| Gates a field | Yes (FR-CHR-114) | Never |
| When it is absent | The gated data is not collected | Nothing changes; the processing's statutory basis is under counsel review (§23) |
| Withdrawal | In writing, at any time (FR-CHR-115) | Not applicable; the employee may raise a grievance or a data-principal request (FR-CHR-076) |
| Versioned by | Purpose, regime and language | Notice version and language |
| Counted as a legal basis | Where the regime makes it one | Never, in any report or response |
| Shown in "My consents" | Yes | Yes, in a separate list |

**The regime tag at capture.** Every consent record's regime is fixed when it is captured and never changes (Part E-6). The switch date is set by counsel through the §22 pipeline; the product never picks it.

| Captured | Purpose | Regime tag | Template |
| --- | --- | --- | --- |
| Before the switch, on or about 13 May 2027 (EV-058) | The SPDI set | `SPDI_2011` | The SPDI template for the purpose |
| Before the switch | Aadhaar purposes | `AADHAAR_REG5` | The Regulation 5 template |
| On or after the switch | The SPDI set | `SPDI_2011` while CR-12 is open, because SPDI behaviours stay armed; a `DPDP` record alongside only where counsel's rule for the purpose requires one | One template per regime, as separate records (CR-22) |
| On or after the switch | Aadhaar purposes | `AADHAAR_REG5`; a `DPDP` record alongside only if counsel requires | As above |
| On or after the switch | Purposes outside the employment purpose | `DPDP` (§17 NFR-DPDP-501) | The DPDP template |
| Any time | A notice acknowledgement | None — it records a notice version, not a regime | The privacy notice |

**Delivery channels for notices, grants and withdrawals.**

| Channel | Presents a notice | Carries a written grant or withdrawal | Constraint |
| --- | --- | --- | --- |
| ESS, web or app | Yes | Yes, `written_in_app` | Authenticated as the employee |
| A private kiosk session | Yes | Yes, `written_in_app` | The session is private; the public screen never lists who has or has not consented (§09.9) |
| E-mail to the personal address | Yes | Yes, `email` — a reply from that address | The address was verified when entered (§07.6a self-service edits) |
| SMS | A link to ESS only | No | — |
| WhatsApp | Only inside a conversation the worker started; never an employer push (FR-CHR-077) | No | The 250-unique-users-per-24-hours limit on a new business portfolio (FR-CHR-077) |
| Paper, in person | Yes, the printed template | Yes, `written_paper` | HR scans and attaches it; the employee keeps a copy |

**"My consents" — the employee's view (FR-CHR-118).** One row per purpose that applies to the employee, showing the state, the template version and date, the capture form and whose artefact it is. Each row offers the action its state allows: read the notice, grant, decline, withdraw, or download the signed artefact. Declined and withdrawn rows show what the employee's choice changed, in the words of the effects table. The view never shows another employee's state, and nothing in it is visible to the employee's manager (the §09 EL-5 rule applied to every purpose).

**Worked example — a bank withdrawal on the 20th.** Latha earns a gross of ₹20,000 with basic plus DA of ₹12,000, and withdraws her `BANK_DISBURSAL` grant in writing on 20 September 2026. Her September run is unchanged: PF 12% of ₹12,000 = ₹1,440; ESI 0.75% of ₹20,000 = ₹150; net pay before PT and TDS ₹18,410 (PT reads the state's slab parameter and is left out here). The September bank file is generated at LOCKED on 28 September. Her line is flagged before generation (§08 AC-901.2), and her ₹18,410 is paid by the tenant's `non_bank_disbursal_mode` as a disbursal exception recorded on the run. Her PF and ESI lines are filed as usual; a bank-details grant has nothing to do with contributions. On 5 October she grants again and enters a new account, penny-drop passes, and October pays into it.

**Worked example — withdrawing a disability flag.** Farida's gross is ₹23,000. She is ESI-covered only because she is a disabled employee, whose ceiling is ₹25,000 against the standard ₹21,000 (FR-CHR-007), and her contributions are 0.75% of ₹23,000 = ₹172.50 from her and 3.25% = ₹747.50 from the employer. She withdraws `HEALTH_DISABILITY_STATUS` on 10 August 2026, inside the April–September contribution period. The withdrawal form told her beforehand that her ESI coverage would end. When it ends is `esi.ceiling_change_timing`: on the contribution-period reading (FR-CHR-013) she stays covered to 30 September; if the parameter says the change bites from its month, August is her last covered month. Until the parameter is set, the operator records which applies, and the choice is on the audit log. July and earlier stay exactly as locked.

**Edge cases.**

- **A grant withdrawn between bank-file generation and release.** The unreleased file is regenerated without that employee's line, and the pay goes by the alternative mode. Regenerating a file that was never released is not a second payment (§08 AC-901.3). After release, nothing is recalled.
- **An employee who never opens any notice** stays PENDING for every purpose, is paid by the alternative mode, punches by a non-biometric method, and is derived on the standard ceiling. None of it blocks a run.
- **A worker on a shared device** reads and signs only inside a private session; the kiosk's public screen never shows a list of who has or has not consented (§09.9).
- **A paper grant whose scan is unreadable** is not a grant. The record stays PRESENTED, HR is asked to rescan the original, and the employee is never asked to sign again while the original exists.
- **A grant captured on one template version and a withdrawal presented on a newer one** is still a withdrawal of the purpose. The withdrawal record links both versions.
- **The regime switch on or about 13 May 2027.** No record is rewritten, re-dated or discarded (Part E-6), and SPDI behaviours stay armed until CR-12 is answered. Which purposes need a DPDP-regime record at all is counsel's (CR-12, CR-25), arriving as template and rule changes through the §22 pipeline — never as a date the product picks.
- **A grievance raised against an SPDI purpose** is given a tenant SLA no longer than the one-month SPDI r.5(9) window while the SPDI regime is armed (research r4/03 finding 4; FR-CHR-076).
- **A death-in-service settlement** (FR-CHR-061) pays the nominee. The nominee's bank details are the nominee's own financial information, so the written grant is the nominee's under `NOMINEE_BANK_DISBURSAL`, never inferred from the deceased employee's record; whose artefact it is follows CR-04. The gratuity clock under CoSS s.56 (§07.3.4) runs regardless, and without the grant the settlement goes by the alternative mode.
- **A rehire.** Grants belong to the person, not the employment. A grant still in force carries into the new employment; a grant withdrawn, erased, or superseded by a template needing a fresh grant is requested again at activation (CN1).

**Acceptance criteria (consent).**
- A schema scan finds no gated field populated for an employee without a GRANTED record for the gating purpose, across screens, imports, the API and the assistant.
- Every record carries its purpose, regime, template version, capture form, artefact owner, provenance and timestamps; a withdrawal links the grant it ends.
- A decline is recorded only from an explicit decline, never from silence, and silence reaches PENDING only after `consent.reminder_limit` reminders.
- A withdrawal is accepted with no approval step. Its effects follow the effects table from the time of receipt, and no run already locked changes.
- A template missing a notice element cannot be cleared, and a request cannot be sent on an uncleared template.
- No grant exists that the employee did not sign, except accepted imported evidence carrying its original date.
- An SPDI-purpose grievance cannot be configured with an SLA beyond one month while the SPDI regime is armed.
- Every signed artefact matches the hash on its record, and its template version re-renders byte for byte.
- A notice acknowledgement never gates a field and is never counted as a basis; a regime tag never changes after capture.
- No grant or withdrawal is accepted through a channel the delivery table does not allow to carry one.

**Test scenarios — consent.**

| # | Given | When | Then |
| --- | --- | --- | --- |
| T-CN-1 | An employee with no `BANK_DISBURSAL` grant | HR tries to key an account | The field accepts no input |
| T-CN-2 | The same employee | An API client posts an account | Refused with `ID-BANK-NO-GRANT`; audited |
| T-CN-3 | A notice presented and unanswered | Reminders reach the limit | State PENDING; HR task created; the manager is not notified |
| T-CN-4 | A GRANTED bank purpose | The employee withdraws on the 20th | The month's net pay is unchanged; the next disbursal uses the alternative mode; the account closes to new use |
| T-CN-5 | A GRANTED fingerprint purpose | Withdrawn at a kiosk | The election becomes non-biometric and device erasure starts (§09.3-B); punches continue by card |
| T-CN-6 | A disability flag used for the ESI ceiling | Withdrawn mid-period with `esi.ceiling_change_timing` unset | The operator is asked to record the treatment; `ESI_CEILING_CHANGE_TIMING_UNSET` shows; locked months unchanged |
| T-CN-7 | A template version missing the grievance contact | Submitted for clearance | Clearance refused, naming the element |
| T-CN-8 | A new template with `consent.reconsent_required.BANK_DISBURSAL` unset | Published | Existing grants stand; new grants use the new version |
| T-CN-9 | The same template with the parameter true | Published | Every existing grant gets a new REQUESTED version; each stays in force until answered |
| T-CN-10 | A manager asks the assistant whether a reportee consented to biometrics | Asked | Refused; no state is disclosed |
| T-CN-11 | A withdrawn record whose `retention.consent_evidence` has run out | The sweep runs | Erased to a tombstone; the purpose's gated data is already closed |
| T-CN-12 | An employee's own consent history | They open "My consents" | Every record shows with its form and owner; each signed artefact downloads |
| T-CN-13 | A tenant evidence export for `BANK_DISBURSAL` | Run | The export matches FR-LEG-011's format and is an audited event |
| T-CN-14 | An employee who never acknowledged the privacy notice | A payroll run and an ECR run | Neither is affected; the acknowledgement is listed as outstanding and counted nowhere as a basis |
| T-CN-15 | A death in service with the nominee's bank details offered by HR | HR tries to key them | The field accepts no input until the nominee's written grant exists; the settlement task shows the alternative mode |
| T-CN-16 | A record captured before the switch date | The switch date passes | The record's regime tag is unchanged; no DPDP record is created unless counsel's rule for the purpose requires one |
| T-CN-17 | A grant attempted by WhatsApp reply | Received | Not accepted as a written grant; the employee is sent the ESS link |
| T-CN-18 | A signed artefact whose stored bytes no longer match its hash | The integrity check runs | An integrity incident opens; the grant is flagged for the checker; nothing is re-signed on the employee's behalf |
| T-CN-19 | A paper grant whose scan is unreadable | HR attaches it | The record stays PRESENTED; HR is asked to rescan the original |

#### 07.1.6 The migration consent flow — staged import, statuses and non-responders

FR-CHR-102 states the rule: consent cannot be backfilled, so migration runs a consent flow for every migrated employee (Part E-12). §05's tenant lifecycle fixes the order — CONTRACTED → CONSENT_RUN (TO7) before CONSENT_RUN → LOADED (TO8) — and §16.7 owns the importers and the YTD tie-out. This block makes that order executable. An import runs in four stages, and an SPDI-set value reaches the tenant only for an employee whose status for that purpose allows it.

| FR | Requirement | MoSCoW | Phase |
| --- | --- | --- | --- |
| **FR-CHR-119** | **A migration import runs in four stages, in order:** R (roster), C (consent run), S (load) and T (tie-out), per the stage table below; no stage starts before its predecessor's exit test passes. Stage R carries only what is needed to reach each employee, and nothing in the SPDI set. At stage S the importer drops, from the persisted record, every SPDI-set column for an employee whose status for that purpose does not allow it, and lists what it dropped. The uploaded source file is held only in an import staging area, encrypted and access-logged, and purged within `migration.staging_purge_hours` of stage S completing. Whether holding it that long is itself collection is part of CR-04 and CR-22. | Must | v1 |
| **FR-CHR-120** | **Status is per employee per purpose, and the load rule reads it.** The statuses are CONSENTED, CONSENTED_IMPORTED, DECLINED, PENDING and NOT_APPLICABLE, derived from the consent records (FR-CHR-115). Every employee has a status for every applicable purpose before stage S (§05 TO7). A status can change after go-live: a newly consenting employee enters bank details in ESS, or the tenant re-imports that employee's row alone, and penny-drop runs either way. | Must | v1 |
| **FR-CHR-121** | **Imported written-consent evidence is accepted per purpose, by a checker, with its original date.** The acceptance rules are in the table below. Accepted evidence becomes a consent record with provenance `imported` (CN9); its original date and source are kept and never re-dated. Evidence that fails a rule is not discarded: it is attached to the employee's file as a document, and the status stays PENDING until the employee answers the stage-C notice. | Must | v1 |
| **FR-CHR-122** | **Non-responders are reminded, offered paper in person, reported — and paid.** Reminders go to the employee's own channels at `consent.reminder_cadence_days`, up to `consent.reminder_limit`; then an HR task offers the paper route in person. No reminder or task goes to the employee's manager, and no manager view shows a consent status. The migration report lists non-responders per purpose (FR-CHR-098). A PENDING status never blocks go-live, a payroll run or a filing. | Must | v1 |

<!-- DIAGRAM: fr-core-hr-migration-consent-flow -->

**The four stages (FR-CHR-119).**

| Stage | Tenant state (§05) | Loads | Never loads | Exit test |
| --- | --- | --- | --- | --- |
| **R — roster** | CONTRACTED; TO7 begins | Employee code, name, legal entity, establishment, employment status, date of joining, personal contact channel (FR-CHR-009), preferred language | Any SPDI-set value; Aadhaar; bank columns | Every employee in the source roster is present, or listed with a reason — a leaver whose FnF the source already settled, for instance |
| **C — consent run** | CONSENT_RUN (TO7) | Consent records; imported evidence proposed for checking (FR-CHR-121) | Any SPDI-set value | Every employee has a status for every applicable purpose — TO7's side effect |
| **S — load** | CONSENT_RUN → LOADED (TO8) | Registrations, the master with its identifiers, structures and YTD (§16.7); SPDI-set columns only where the status allows | SPDI-set columns for DECLINED and PENDING; Aadhaar without a catalogue purpose and a Regulation 5 grant; biometric templates, in any status; consent artefacts the source did not hold | A load report per employee per column (below); the staging copy purged |
| **T — tie-out** | LOADED → TIED_OUT (TO9) | Nothing new | — | §16.7 AC-MIG-5. No consent status enters any tie-out head |

**Status and the load rule (FR-CHR-120).**

| Status | Derived from | SPDI-set columns at stage S | Pay and attendance | On the migration report |
| --- | --- | --- | --- | --- |
| CONSENTED | A GRANTED record on the current template | Loaded. A bank account enters as `unverified` and penny-drop runs (FR-CHR-006) | Normal once verified | — |
| CONSENTED_IMPORTED | Imported evidence accepted by a checker (CN9) | Loaded, as above | As above | The evidence reference and its original date |
| DECLINED | A DECLINED record | Dropped | `non_bank_disbursal_mode`; the non-biometric path; the standard ESI ceiling | Listed |
| PENDING | A REQUESTED, PRESENTED or PENDING record | Dropped | As DECLINED until the status changes | Listed, with the reminders sent |
| NOT_APPLICABLE | The purpose does not apply — no biometric modality at the employee's sites; no source disability flag | Nothing to load. Source biometric columns never load in any status | — | — |

**Imported evidence — the acceptance rules (FR-CHR-121).**

| Rule | Why | If it fails |
| --- | --- | --- |
| The artefact is written and attributable to the employee: a signed letter or form, a fax, or an e-mail from the employee | SPDI r.5(1)'s "in writing through letter or Fax or email" (research r4/03 finding 4); whether other forms qualify is CR-27 | Status stays PENDING |
| It names the purpose it is imported for | Consent under r.5(1) is "regarding purpose of usage"; a blanket "HR data" consent is not read as a grant for a specific purpose unless counsel's acceptance rule under CR-04 says so | Held as a document; status stays PENDING |
| Its original date is known and precedes the source's collection of the data | Consent comes "before collection" (r.5(1)) | Status stays PENDING; the report flags data the source held without prior consent |
| Its source and provenance are recorded — which system, which export, who attached it | Consent cannot be synthesised (Part E-12) | Not accepted |
| The notice text the employee saw is attached, where the employer holds it | FR-CHR-117 | Accepted without it only if counsel's acceptance rule under CR-04 allows; until then PENDING |
| A checker distinct from the person who attached it approves | The consent-record **C** cell (FR-CHR-105) | Not accepted |

**The load report.**

| Field | Rule |
| --- | --- |
| `batch_id` | The §14 `MigrationBatch` |
| `employee_ref` | The migrated employment |
| `column` | Each source column mapped for the employee |
| `outcome` | `loaded`, `deferred_to_stage_s`, `dropped_consent`, `dropped_never_import`, `dropped_unmapped` or `held_review` |
| `purpose`, `status` | For a consent-gated column: the purpose and the employee's status at stage S |
| `reason` | Free text only where the outcome is `held_review` — for example a `DUPLICATE_PERSON_UAN` review (FR-CHR-108) |
| `reload_route` | For `dropped_consent`: ESS entry by the employee, or a single-employee re-import once the status allows |
| `staging_purged_at` | When the staging copy of the file was purged |

The report never repeats a dropped value; it names the column and the reason. Unmapped columns are surfaced, never silently dropped (§16.7 AC-MIG-3).

**Timing the consent run.** Stage C starts as soon as the tenant is CONTRACTED, not at the end of onboarding. The board forecasts, per purpose, how many employees will still be PENDING when the first live month's bank file is generated, so the volume of alternative-mode payouts is known, and funded, before go-live.

**The consent status board — the HR admin's surface during stages C and S.** One row per employee per applicable purpose, showing the status, the channel used, the reminders sent and the last reminder date. Filters: purpose, status, establishment, and "no personal channel". Actions: resend on the employee's own channel; print the paper template for an in-person signature; attach a signed paper form or written withdrawal; propose imported evidence for checking. The board is visible to HR admins in scope and to the compliance checker, never to managers. It shows no dropped values, and no action on it can set a status to CONSENTED without an artefact the employee signed.

**Worked example — 120 people, one October cutover.** A 120-person manufacturer moves from Tally on 1 October 2026. Stage R loads 120 roster rows; four employees have no personal contact channel and go straight to the paper route. Stage C sends 120 bank notices, 90 fingerprint notices — the plant's terminals serve 90 workers, and the 30 office staff work at a site with no biometric modality, so they are NOT_APPLICABLE — and two disability notices, only to the two employees whose source record carries a flag. After the reminder limit:

| Purpose (applicable) | Consented | Imported evidence accepted | Declined | Pending |
| --- | --- | --- | --- | --- |
| `BANK_DISBURSAL` (120) | 104 | 3 | 5 | 8 |
| `BIOMETRIC_FINGERPRINT` (90) | 61 | 0 — source templates never import | 22 | 7 |
| `HEALTH_DISABILITY_STATUS` (2) | 1 | 0 | 0 | 1 |

At stage S, bank columns load for 107 employees and are dropped for 13. The 61 who consented to fingerprints enrol afresh against tickets (§09.2-B), and the other 29 punch by card or PIN from day one. For October the 13 are paid by `non_bank_disbursal_mode`, each recorded on the run. One of them, Mohan, earns a gross of ₹18,000 with basic plus DA of ₹12,000: PF 12% = ₹1,440 and ESI 0.75% = ₹135, so ₹16,425 before PT and TDS reaches him by the alternative mode, and his PF and ESI lines are filed as usual. The employee with a pending disability notice is derived on the ₹21,000 ceiling; if her gross were between ₹21,000 and ₹25,000, the notice would already have told her that her ESI coverage turns on the choice. Stage T ties out YTD exactly as §16.7 requires, and no consent status enters it. By 15 October five of the eight pending bank employees have granted in ESS and entered accounts. Penny-drop passes, and each is paid by bank from the first bank file generated after the account became usable.

**Edge cases.**

- **A leaver between stages R and S whose FnF the new system will pay** needs `BANK_DISBURSAL` like anyone else. If it is pending, the FnF goes by the alternative mode, and the final-wage clock of §07.3.4 (`fnf.final_wage_deadline.<state>`) keeps running.
- **A worker on a shared device** reads and signs only in a private session; the kiosk's public screen never lists who has or has not consented (§09.9).
- **A source that held Aadhaar numbers for everyone.** None load, because no catalogue purpose applies to an ordinary employee (§07.1.4). The report states how many were left behind and why.
- **A tenant that asks to skip stage C** because "the old vendor had consent" cannot: TO7's guard holds, and the old vendor's artefacts enter only as imported evidence under FR-CHR-121.
- **Consent granted, penny-drop failed.** The account stays `unverified` with `BANK_UNVERIFIED` on the readiness report, and pay goes by the alternative mode. The consent is not the problem, so no new notice is sent.
- **Workers the source paid in cash or by cheque** have no bank columns to gate and are paid as before, within the permissible modes `non_bank_disbursal_mode` holds (§20).
- **A source row whose UAN another row also carries** raises `DUPLICATE_PERSON_UAN` inside the import (FR-CHR-108); neither UAN activates until the review closes, and both employees are still paid.
- **A 1 April cutover with no in-year YTD** still runs stages R, C and S in full. Only stage T's YTD heads are empty (§05 TO9).
- **Contract labour at a principal employer's biometric site** (FR-CHR-028; §09.9-A). The worker is the contractor's employee, so whose artefact a biometric grant is — the principal employer's, the contractor's or both — is a counsel question under CR-04; the non-biometric path applies until it is answered.

**Re-runs, second batches and partial failures.**

- **Stage S is atomic per employee.** An employee's rows load entirely or not at all; a failure lists the employee with its reason, and the rest of the batch stands. Re-running the stage is idempotent on (`batch_id`, employee, column), so a re-run never duplicates a row or a bank account.
- **A single-employee re-import** — for an employee whose status changed after stage S — runs stages C and S for that employee only, under a child batch of the original; stage T is not repeated unless a YTD head changes.
- **A second batch** — a second establishment migrated months later — runs all four stages for its own employees. An employee already in the tenant keeps the statuses they hold; only purposes newly applicable to them are requested.
- **An employee removed from the source roster between stages R and S** is listed with the reason, and any consent records captured in stage C are kept as evidence under `retention.consent_evidence`, never deleted to tidy the batch.
- **A grant that lands while stage S is running** does not change that employee's load, because the status is read when the employee's atomic load starts; the grant takes effect through a single-employee re-import or ESS entry.

**Acceptance criteria (migration consent).**
- No import reaches LOADED unless every employee has a status for every applicable purpose, and stage S cannot start before stage C's exit test passes.
- A schema scan after stage S finds no SPDI-set value for any employee whose status for its purpose is DECLINED, PENDING or NOT_APPLICABLE.
- No biometric template, and no consent artefact the source did not hold, is ever loaded; every Aadhaar number in a source file is left behind unless a catalogue purpose was granted.
- Imported evidence becomes a grant only after a distinct checker approves it against the acceptance rules, and it keeps its original date.
- The staging copy of the source file is purged within `migration.staging_purge_hours` of stage S, and the load report records when.
- The migration report lists non-responders per purpose; no manager-facing surface shows any employee's consent status.
- An employee in any status is paid in the first live run.
- Re-running stage S is idempotent, and a second batch leaves the statuses of employees already in the tenant untouched.

**Test scenarios — migration consent.**

| # | Given | When | Then |
| --- | --- | --- | --- |
| T-MC-1 | A CONTRACTED tenant whose consent run has not started | The full import is started | Refused by TO8's guard; only stage R may run |
| T-MC-2 | Stage R with a file containing bank columns | Stage R runs | Bank columns are not persisted; the load report shows them as `deferred_to_stage_s` |
| T-MC-3 | An employee DECLINED for `BANK_DISBURSAL` | Stage S runs | The bank columns are dropped and listed; the first run pays by the alternative mode |
| T-MC-4 | An employee PENDING at stage S who grants on day 10 | They enter the account in ESS | Penny-drop runs; the account is usable from the next unreleased bank file |
| T-MC-5 | A source file carrying fingerprint templates | Stage S runs | No template loads, in any status; enrolment needs a new ticket (§09.2-B) |
| T-MC-6 | Imported evidence without a purpose named | Proposed for checking | Held as a document; status stays PENDING; a CR-04 rule is cited |
| T-MC-7 | Imported evidence proposed and approved by the same HR user | Approval attempted | Refused; a distinct checker is required |
| T-MC-8 | A source file with Aadhaar numbers for all employees | Stage S runs | None load; the report counts them and gives the reason |
| T-MC-9 | Stage S complete | `migration.staging_purge_hours` passes | The staging copy is gone; `staging_purged_at` is set |
| T-MC-10 | A manager of a migrated team | They open their team view | No consent status and no dropped-column information is visible |
| T-MC-11 | Two source rows with the same UAN | Stage S runs | `DUPLICATE_PERSON_UAN`; neither UAN activates; both employees are paid |
| T-MC-12 | A mid-year cutover with 13 employees on the alternative mode | Stage T runs | The YTD tie-out passes or fails on its own heads only; consent status plays no part |
| T-MC-13 | Stage S failing on one employee's row | Stage S is re-run after the fix | That employee loads once; no other employee's rows are duplicated |
| T-MC-14 | A second establishment migrated three months after the first | Its batch runs | Stages R to T run for its employees only; existing employees' statuses are untouched |
| T-MC-15 | An employee dropped from the source roster after stage C | Stage S runs | Listed with the reason; the stage-C consent records stay as evidence |
| T-MC-16 | Stage C a fortnight before the first live bank file, 20 bank statuses pending | The board is opened | The forecast shows the pending count per purpose at the bank-file date, and the alternative-mode payouts it implies |

#### 07.1.7 Aadhaar optionality — flow by flow, and the exclusion lifecycle

FR-CHR-101 sets the default — exclude-and-flag — and bans the hard block (Part D-10). This block makes the rule testable in every flow that touches Aadhaar. It specifies the exclusion as a record with a lifecycle, and it fixes the one setting a tenant must choose because counsel has not (CR-30). §06.2 owns the M+4 clock, §08 AC-701.2 the generator's behaviour, and §22 the Supplementary runbook (FR-OPS-013). This block is the system-of-record side of all three.

| FR | Requirement | MoSCoW | Phase |
| --- | --- | --- | --- |
| **FR-CHR-123** | **The flow table is the contract.** Every flow that could read the token store or `uan_seeding_status` behaves as the flow table below says, both for an employee who provided Aadhaar and for one who did not. A flow not in the table may read neither until it is added through the FR-LEG-018 review. | Must | v1 |
| **FR-CHR-124** | **Every exclusion is a record with a lifecycle.** The ECR generator cannot leave a member out without writing an exclusion record (fields and transitions below). For every establishment and wage month, the active members in the locked snapshot equal the lines in the Regular return plus the open exclusions for that month; this reconciliation runs on every generation. | Must | v1 |
| **FR-CHR-125** | **The employee-share timing is a required tenant setting.** `aadhaar_exclusion.employee_share_timing` is `deduct_and_hold` or `defer` (table below). It has no shipped default, because when the employee's share is deducted while the line is excluded is CR-30. The tenant chooses at setup, before the first import (§05 TO8) or first run, and the choice and its actor are recorded. A change is maker-checked and applies from the next unlocked month. When counsel answers CR-30, the answer arrives as a rule change through the §22 pipeline and may remove one value. | Must | v1 |
| **FR-CHR-126** | **Whether an employee provided Aadhaar is invisible to pay, performance and discipline.** Invariants AO-1 to AO-5 below. They mirror §09's EL-2 for biometric elections and FR-LEG-016's posture that the product records choices and never penalties (CR-28). | Must | v1 |
| **FR-CHR-127** | **Notices, and the establishment-level escalation.** Every exclusion sends the operator notice and the employee notice below, on counsel-cleared templates (Part D-20). `aadhaar_exclusion.escalation_lead_days` before the member's M+4 deadline (§06.2), an exclusion still unseeded escalates to the approver with the establishment-level consequence stated. The approver's decision is recorded. The product never chooses among the alternatives, never contacts the employee beyond the notice template, and never blocks payroll. | Must | v1 |

**Flow by flow (FR-CHR-123).**

| Flow | Employee provided Aadhaar | Employee did not | Source |
| --- | --- | --- | --- |
| Onboarding and register commit | Held only under a catalogue purpose (FR-CHR-111) | Onboarding completes; nothing waits | FR-CHR-040; §10 FR-T-O02 |
| UAN, where the joiner has none | The employee generates it in UMANG; the product tracks | Identical — generation is the employee's own act. Without a UAN the member follows `UAN_PENDING` exclude-and-flag | FR-CHR-041; §08 AC-701.2 |
| UAN, International Worker or citizen of Nepal or Bhutan | Employer route (§22.4.5); a store purpose only if the captured runbook shows the portal asks for Aadhaar | Employer route without it, where the portal allows; what it requires is a §20 V-23 fact | Research r4/04 finding 7 |
| UAN seeding status | Recorded from evidence the employer's user records under the §22.3 protocol, or the employee supplies | Stays `pending`; exclude-and-flag at the ECR | FR-CHR-005 |
| ESIC IP registration | The employer may seed at registration under `AADHAAR_ESIC_IP_SEEDING` | IP registration proceeds without seeding | FR-CHR-042; research r4/04 finding 9 |
| ESI contribution | No effect | No effect | — |
| ECR generation | The line is included once seeded | Exclude-and-flag (FR-CHR-124) | §08 AC-701.2 |
| Form I field 24 | Rendered from the store only once CR-35 clears; dark until then | Empty, with a reason code | FR-CHR-045-onb |
| E-signature of letters | Aadhaar eSign is one option | A DSC-class provider or a wet signature | §16.9 |
| PAN inoperative | Nothing collected; a non-blocking nudge | Identical | FR-LEG-020; CR-31 |
| Dependants and benefits | An optional token | Enrolment proceeds | §11 BEN-03 |
| Attendance | No Aadhaar authentication anywhere | — | §23.8.4; FR-LEG-018 |
| Data-principal access request | Returns the last four digits and the store state | Returns "not held" | FR-CHR-076 |
| Exit and FnF | Purged once the purpose is spent; nothing gates FnF | Nothing gates FnF; the date of exit is marked with no member-detail or Aadhaar update (research r5/02, finding 13) | FR-CHR-058 |
| Migration | Loaded only under a granted catalogue purpose | Not loaded; the report says why | FR-CHR-120 |

**The exclusion record (FR-CHR-124).**

| Field | Meaning |
| --- | --- |
| `exclusion_id` | Immutable |
| `person_id`, `employment_id`, `establishment_id` | The member and the EPFO establishment scope |
| `wage_month` | Month M |
| `reason_code` | `AADHAAR_UAN_UNSEEDED` or `UAN_PENDING` |
| `regular_filing_id` | The Regular return the line was left out of |
| `line_values` | The line the member would have carried, from the locked snapshot: ECR fields 3–11 (EV-035) |
| `employee_share_timing` | The tenant setting in force for month M (FR-CHR-125) |
| `employee_share_held` | The amount deducted and held, where the timing is `deduct_and_hold` |
| `m_plus_4_deadline` | The due date of month M+4's Regular return (§06.2) |
| `operator_notice_id`, `employee_notice_id` | The two notices (FR-CHR-127) |
| `remediation_task_id` | The employee's UMANG self-seeding task |
| `seeding_evidence_ref`, `seeded_recorded_at` | The evidence that ended the exclusion, and when it was recorded |
| `supplementary_filing_id` | The Supplementary return that carried the member (EV-037) |
| `interest_7q_captured` | The s.7Q interest the portal computed, captured from the portal (EV-039); the product never computes it |
| `decision_log` | Approver decisions at escalation (FR-CHR-127) |
| `leaver_flag` | Set if the member exits while the record is open |
| `status`, `closed_at` | Per the transition table |

**The exclusion lifecycle (FR-CHR-124).**

<!-- DIAGRAM: fr-core-hr-aadhaar-exclusion-lifecycle -->

| # | From | Event | Guard | To | Side effect | Who may trigger |
| --- | --- | --- | --- | --- | --- | --- |
| EX1 | *(none)* | The pre-ECR readiness check finds an unseeded or missing UAN for an active member of month M | Month M is LOCKED (§08 FR-PAY-301) | FLAGGED | The readiness reason shows; the operator sees the member before generation | System |
| EX2 | FLAGGED | Month M's Regular return is generated without the line | The tenant default is exclude-and-flag, or the approver chose it for this member | EXCLUDED | Exclusion record written; both notices sent; remediation task opened; `m_plus_4_deadline` set; the employee share handled per FR-CHR-125 | System |
| EX3 | FLAGGED | Seeding evidence recorded before generation | The status change is maker-checked (FR-CHR-084) | CLOSED | The line is included in the Regular return; no exclusion record is written | HR admin; compliance checker |
| EX4 | EXCLUDED or ESCALATED | Seeding evidence recorded — for `UAN_PENDING`, the UAN recorded with its seeding evidence | Maker-checked | SEEDED | A Supplementary for month M prepared from the same locked snapshot (§14.4.5) | HR admin; compliance checker |
| EX5 | SEEDED | The Supplementary is approved and paid (§22 FR-OPS-013) | The member is absent from every prior return for month M (EV-037; §22 AC-013.1) | CLOSED | The held employee share goes into the Supplementary challan, or the deferred share is recovered (FR-CHR-125); the s.7Q interest is captured | Operator or employer, per the delivery mode |
| EX6 | EXCLUDED | `aadhaar_exclusion.escalation_lead_days` before `m_plus_4_deadline` | Still unseeded | ESCALATED | The approver sees the establishment-level consequence and the alternatives (FR-CHR-127) | System |
| EX7 | ESCALATED | The approver records a decision | — | ESCALATED | `decision_log` entry; where the decision is alternative (b) for the Supplementary, the portal's response is captured (§20 V-23) | Approver |
| EX8 | EXCLUDED or ESCALATED | The member exits before seeding | — | unchanged, `leaver_flag` set | The exit is marked in the same cycle (§06.2); the record stays open, because the member remains an active member of month M with no return; FnF does not wait | System |
| EX9 | any | An attempt to configure a payroll, onboarding, benefit or FnF block for want of Aadhaar | — | unchanged | No such setting exists; the API refusal names Part D-10 | — |

**The employee-share timing (FR-CHR-125).** The employer's share, EPS and EPF alike, is owed with the Supplementary under either setting; only the employee's share differs.

| Setting | Month M payslip | While excluded | At the Supplementary | A leaver who never seeds |
| --- | --- | --- | --- | --- |
| `deduct_and_hold` | The employee share is deducted as normal | Held against the member on the establishment's ledger, not remitted with month M's Regular challan | Remitted with the Supplementary challan, alongside the portal's s.7Q interest | Held; the FnF statement shows it as held pending the Supplementary. Whether it may be refunded is CR-30 |
| `defer` | No employee share is deducted for month M | Nothing held | Recovered from the next unlocked payslip as a deduction, within the deduction limits the engine applies (§08 `wages.deduction_overflow_method`) | Unrecovered; the employer's exposure, shown on the FnF statement |

**The alternatives the approver sees (FR-CHR-101; FR-CHR-127).**

| Alternative | Month M's Regular return | Month M+4's Regular return | The employee | Status |
| --- | --- | --- | --- | --- |
| (a) Exclude and flag | Filed without the line | Cannot be filed until a Supplementary for month M carries the member — the §06.2 inference, confirmed through §20 | Paid; notified; asked to self-seed | The shipped default |
| (b) Include and warn | Generated with the line. EPFO's instruction is that contributions are received through the ECR only for Aadhaar-seeded UANs (research r4/04 finding 8); how the portal treats the line is not captured (§20 V-23) | Depends on the portal's treatment | Paid; notified | Configurable pending counsel (CR-30) |
| (c) Block generation for the establishment | Not filed until the member is seeded | Blocked in turn | Paid; one person's choice becomes the establishment's late filing | Listed for completeness, not recommended |
| Block payroll | — | — | — | **Not an option in any configuration** (Part D-10) |

**The two notices (FR-CHR-127).**

| Notice | Recipient | Must carry | Must never carry |
| --- | --- | --- | --- |
| Exclusion — operator | The payroll operator and the approver | The member, month M, the reason code, the line values, `m_plus_4_deadline`, the employee-share setting, and the remediation task's state | Any Aadhaar digits; any suggestion of action against the employee |
| Exclusion — employee | The employee, on their own channel | That their pay is unaffected; that their contribution line for month M was left out and why — EPFO's instruction that contributions are received through the ECR only for Aadhaar-seeded UANs (research r4/04 finding 8); how to self-seed in UMANG; what happens to the employee share under the setting; whom to ask | Any statement that Aadhaar is mandatory by law; any consequence beyond the ones listed; free text — the template is counsel-cleared (Part D-20) |
| Escalation — approver | The approver | The establishment-level consequence at `m_plus_4_deadline`, the alternatives table, and the decision form | A pre-selected alternative |

**Invariants (FR-CHR-126).**

| # | Invariant | How it is tested |
| --- | --- | --- |
| AO-1 | No tenant setting blocks onboarding, payroll, a benefit or FnF for want of Aadhaar or of seeding | A configuration-schema audit finds no such option (§17 NFR-DPDP-501) |
| AO-2 | No payroll rule, report filter, approval-routing condition, performance input, AI feature or manager view reads the token state or `uan_seeding_status`. Only the store, the readiness report, the ECR generator and the exclusion register do | A static scan of rule definitions and report queries fails the build on any other reader |
| AO-3 | A manager's view never shows whether a reportee provided Aadhaar or has an open exclusion | A role-view test (FR-CHR-105) |
| AO-4 | An exclusion changes net pay by at most the effect of the employee-share setting | Replay month M with the member seeded; net pay differs by at most the employee share |
| AO-5 | The generator never drops a member silently | For every establishment and month: members in the locked snapshot = lines in the Regular return + open exclusions for the month |

**Which members a Supplementary carries.** The register hands §08 the members for each Supplementary; §08 generates it and §22 runs it (FR-OPS-013). One Supplementary per establishment per wage month carries every member whose exclusion for that month is SEEDED when it is prepared. A member seeded while that Supplementary is in process waits for the next one, because the product applies the "no other return in process" guard to every new monthly return (§06.2). A Supplementary is never prepared for a member who appears in any prior return for the month (EV-037). Because a Supplementary may be filed repeatedly (EV-037), waiting for more members is never needed to make the filing possible; the operator prepares one as soon as a member is SEEDED unless the approver records a reason to batch.

**The exclusion register — the operator's surface.** One row per open exclusion: member, establishment, month M, reason code, days open, `m_plus_4_deadline` with the days remaining, the employee-share setting and any held amount, remediation state, and the Supplementary's state once prepared. Sorted by the nearest M+4 deadline. Actions: prepare the Supplementary once seeding evidence is approved; record the approver's decision at escalation; resend the employee notice. Visible to the payroll operator, the approver and the compliance checker in scope; never to managers (AO-3). The register is the source of the separate count that "clean filing" reports for exclude-and-flag (FR-CHR-097).

**Worked example — one unseeded member across five months.** Ramesh's PF wage at a Pune establishment is ₹15,000. When October 2026 is locked, his UAN is unseeded (EX1). His line would carry EPF and EPS wages of ₹15,000, an employee share of ₹1,800, employer EPS of ₹1,250 and employer EPF of ₹550 (§06.2); EDLI wages and the establishment's charges follow §06.2 and are not restated. October's Regular return is filed without his line (EX2), so the establishment's contribution for October is ₹3,600 lower than it would have been.

- Under `deduct_and_hold`, his October payslip deducts ₹1,800 as usual, and ₹1,800 is held against him on the ledger. Under `defer`, nothing is deducted for PF in October, and ₹1,800 is recovered later.
- His M+4 deadline is the due date of February 2027's Regular return: 15 March 2027 (§06.2's M−4 table pattern). The escalation would fire `aadhaar_exclusion.escalation_lead_days` before it.
- He seeds on 20 November 2026, and the evidence is approved (EX4). A Supplementary for October is prepared from October's locked snapshot: ₹1,800 employee share and ₹1,800 employer share, ₹3,600 in all, plus the s.7Q interest the portal computes, which the product captures and never computes (EV-039). Under `defer`, the ₹1,800 employee share is recovered from the first unlocked payslip.
- November is locked after he seeded, so November's Regular return carries his line normally (EX3 never arises for November).
- Had he never seeded, the approver would have seen, ahead of 15 March 2027, that February's Regular return for the whole establishment cannot be filed while October has no return for him. The decision would be recorded; his pay, and everyone else's, would not have changed.

**Edge cases.**

- **Excluded in two consecutive months.** Each month has its own record, its own M+4 deadline and, once seeded, its own Supplementary; each Supplementary is built from its own month's locked snapshot.
- **A member with no UAN at all** (`UAN_PENDING`) follows the same lifecycle; the remediation task is UAN generation in UMANG (FR-CHR-041), not seeding.
- **Seeding evidence recorded after month M+1's lock but before its generation** closes month M+1 through EX3, while month M still goes through EX4 and EX5.
- **A Supplementary refused by the portal** follows §08's filing machine — REJECTED, then a new attempt from the same snapshot — and the exclusion stays SEEDED until one is approved and paid.
- **The tenant changes `employee_share_timing` while exclusions are open.** Open records keep the setting in force for their month; the new setting applies from the next unlocked month (FR-CHR-125).
- **International Workers** whose UAN comes by the employer route follow `UAN_PENDING` until the UAN is recorded; nothing in their onboarding waits on Aadhaar (research r4/04 finding 7).
- **An establishment code proposed for retirement while an exclusion for it is open** is refused: the open exclusion keeps its month open on the establishment's filing ledger, and FR-CHR-106's retirement guard reads the ledger (§08 FR-PAY-712).
- **EPF Scheme 2026 para 25.** If the gazette text, read under §20 V-24, makes Aadhaar a scheme requirement, the counsel question re-opens (§23); this lifecycle and the no-hard-block rule stand either way (Part D-10).

**What each counsel answer changes in §07.** §23.16 lists what the product does until each question is answered. This table pre-agrees what changes after, so an answer arrives as a rule or template change through the §22 pipeline and never as an emergency rebuild.

| Counsel item | If the answer is | What changes here | What never changes |
| --- | --- | --- | --- |
| CR-30 | Exclude-and-flag confirmed, with a timing for the employee share | The other `employee_share_timing` value is removed by a rule change; open exclusions keep their month's setting | No payroll block, in any answer (Part D-10) |
| CR-30 | Include-and-warn preferred | Alternative (b) becomes the default for new exclusions; the exclusion record is still written, with the line's portal outcome captured | AO-1 to AO-5 |
| CR-35 | Form I may carry the full number | `AADHAAR_FORM_I_FIELD_24` goes live for employees who grant it, with its spent trigger set from the answer | Employees who did not grant keep an empty field |
| CR-35 | Form I may not carry it | The purpose leaves the catalogue; field 24 stays empty with a reason code | — |
| CR-35 | The basis for the thumb impression and the photograph | `FORM_I_THUMB_IMPRESSION` goes live or stays dark; `PHOTO_ON_RECORD`'s basis column is updated | The specimen-signature default |
| CR-06 | The Aadhaar Data Vault and HSM regime binds a non-requesting entity | The store's key custody and hosting change — a migration, not a rewrite (FR-CHR-099); the six operations stay | Business tables hold only the token |
| CR-07 | Keying a number into the EPFO or ESIC portal makes the employer a requesting entity | `AADHAAR_ESIC_IP_SEEDING` and `AADHAAR_EPFO_EMPLOYER_ROUTE` leave the catalogue; IP registration and the employer route run without Aadhaar | The exclusion lifecycle |
| CR-15 | Hosting outside India is lawful for a non-requesting entity | Nothing by default; any tenant option would pass FR-LEG-018 first | The India-only default |
| CR-04, CR-22 | Whose artefact it is, and whether the SaaS is itself an "entity which collects" | `artefact_owner` values settle; templates are re-cleared; `consent.reconsent_required.<purpose>` is set per the answer | Records already captured keep the owner recorded at capture |
| CR-27 | In-app capture satisfies SPDI r.5(1) | The evidence export cites the opinion | — |
| CR-27 | In-app capture does not satisfy it | New grants route to `email` or `written_paper`; existing in-app grants are re-requested only where counsel's rule says so | No grant is re-dated |
| CR-12 | The SPDI Rules do not survive the omission of IT Act s.43A | The SPDI gates retire by a rule change from counsel's date; existing records are kept as evidence | No record is rewritten or re-tagged |
| §20 V-24 | EPF Scheme 2026 para 25 makes Aadhaar a scheme requirement | CR-30 re-opens | The no-hard-block rule (Part D-10) |
| CR-01 | Employees do, or do not, hold DPDP access, correction and erasure rights against s.7(i) processing | The data-principal response templates behind FR-CHR-076 and "My consents" change wording | The machinery; no response asserts an entitlement before the answer |
| CR-28 | What an employer may do about a refusal of Aadhaar, biometrics or tracking | Nothing in the product: it records choices and never penalties, on any answer (FR-CHR-126) | AO-1 to AO-5 |
| CR-31 | What follows for the deductor when a PAN is inoperative | `tds.inoperative_pan_rule` is set through §06.5 and the PAN-inoperative notice gains a cleared consequence clause (FR-LEG-020) | No Aadhaar is collected for tax purposes |

**Acceptance criteria (Aadhaar optionality).**
- For every establishment and wage month, active members in the locked snapshot equal Regular-return lines plus open exclusions (AO-5).
- An excluded employee is paid in the same run, and both notices go out on counsel-cleared templates.
- No run can start while `aadhaar_exclusion.employee_share_timing` is unset, and the tenant setup checklist will not complete without it.
- Every exclusion carries an M+4 deadline and escalates `aadhaar_exclusion.escalation_lead_days` before it; the approver's decision is recorded and changes no one's pay.
- Once seeding evidence is approved, a Supplementary for the month is prepared from that month's locked snapshot, and the exclusion closes only when it is approved and paid.
- A static scan finds no reader of the token state or `uan_seeding_status` outside the store, the readiness report, the ECR generator and the exclusion register.
- No configuration path exists that blocks onboarding, payroll, a benefit or FnF for want of Aadhaar.
- A Supplementary never carries a member who appears in any prior return for the month, and a member seeded while one is in process waits for the next.

**Test scenarios — Aadhaar optionality.**

| # | Given | When | Then |
| --- | --- | --- | --- |
| T-AO-1 | An unseeded member in a locked month | The Regular return is generated | The line is absent; an exclusion record exists; the AO-5 reconciliation passes |
| T-AO-2 | The same month with the exclusion record write forced to fail | Generation is attempted | Generation fails; no return exists without its exclusions |
| T-AO-3 | `employee_share_timing = deduct_and_hold` | The excluded member's payslip is produced | The employee share is deducted and held; net pay equals the seeded case |
| T-AO-4 | `employee_share_timing = defer` | The same | No employee share for the month; net pay is higher by exactly that share |
| T-AO-5 | A tenant with the setting unset | A run is started | Refused, naming the setting; the setup checklist shows it |
| T-AO-6 | Seeding evidence approved | The operator opens the register | A Supplementary for the month is ready, built from the month's locked snapshot |
| T-AO-7 | A Supplementary that includes a member already in a prior return for the month | Submitted | Refused (EV-037; §22 AC-013.1) |
| T-AO-8 | An exclusion `escalation_lead_days` before its M+4 deadline | The day arrives | The approver sees the consequence and the alternatives; no alternative is pre-selected |
| T-AO-9 | An excluded member who resigns | Exit is recorded | Exit marked in the cycle; the record stays open with `leaver_flag`; FnF shows any held share as held |
| T-AO-10 | A tenant admin searching settings for "require Aadhaar" | Searched | No such setting exists; an API attempt is refused citing Part D-10 |
| T-AO-11 | A performance rule that reads `uan_seeding_status` | Published | The publish fails the static scan (AO-2) |
| T-AO-12 | A manager viewing a reportee with an open exclusion | Viewed | No Aadhaar state and no exclusion appear |
| T-AO-13 | A member excluded in October and November | Both months are replayed after seeding | Two records, two Supplementaries, each from its own month's snapshot |
| T-AO-14 | An employee notice template containing "Aadhaar is mandatory" | Submitted for clearance | Refused; the element list forbids it |
| T-AO-15 | Two members of October seeded a day apart, the first Supplementary in process | The second is seeded | The second waits for the next Supplementary; the first is not reopened |
| T-AO-16 | A member excluded under `UAN_PENDING` who generates a UAN in UMANG | The UAN is recorded with its seeding evidence and approved | The exclusion moves to SEEDED; the remediation task closes; a Supplementary is prepared |
| T-AO-17 | Alternative (c) configured for one establishment, and one member unseeded | October is locked | Payroll runs and everyone is paid; the Regular return is not generated; the approver is shown the establishment's filing as late against its due date |

---

### 07.2 Organisation Structure & Establishment Model

Indian statutory compliance is *establishment-scoped*, not company-scoped. PF is filed per establishment code, ESI per ESI code, PT per state registration, LWF per state — and a single legal entity can hold several of each. The org model must therefore carry **two overlapping hierarchies**: the *management* hierarchy (who reports to whom, cost centres, business units) and the *statutory* hierarchy (legal entity → establishment/registration → state jurisdiction). Conflating them — the natural outcome of a data model designed for a single entity in a single jurisdiction — makes correct multi-state filing impossible.

<!-- DIAGRAM: dual-hierarchy-management-vs-statutory -->

| FR | Requirement | MoSCoW | Phase |
| --- | --- | --- | --- |
| **FR-CHR-020** | Model the **management hierarchy**: legal entity → business unit → department → team, with cost-centre tagging and a reporting-manager graph supporting matrix/dotted-line relationships. | Must | v1 |
| **FR-CHR-021** | Model the **statutory hierarchy** as first-class and separate: legal entity → **establishment** (each with its own PF code, ESI code, work-location address, state) → state PT/LWF registrations. Every employee maps to exactly one establishment for statutory purposes at any effective date. | Must | v1 |
| **FR-CHR-022** | Hold **establishment-level statutory registration numbers**: EPFO establishment code, ESIC code, the state PT employer registration (PTRC) per state, LWF registration, Shops & Establishments registration, and **LIN (Labour Identification Number)**. The entity-level PT enrolment (PTEC), which covers the entity's own PT, sits on the `legal_entity`; the reported each-director limb is carried, not re-captured **[Hypothesis]** (r1/06 finding 30; §06.4). **[Verified]** LIN is the "Registration Number of the establishment" on the Form I header, and the contractor's LIN is a column of the principal employer's annual return filed on the Shram Suvidha Portal (r5/04 findings 16, 20). | Must | v1 |
| **FR-CHR-023** | Enforce **headcount-threshold awareness** at the establishment level. Surface each crossing of a statutory line, reading the threshold rows from §06.1 as rule objects rather than a hard-coded list. Every row carries its **counting unit** (worker vs employee vs contract labour) and **sphere** (central vs state) as schema fields (EV-057), and the establishment's headcount is kept per counting unit. The central-sphere rows are: ESI 10; gratuity and maternity 10, which latch on "any day of the preceding twelve months"; EPF 20; Grievance Redressal Committee 20 or more *workers* (IR Code s.4); contract-labour provisions 50 or more contract labour; crèche 50; canteen 100; standing orders 300; retrenchment/closure approval 300, for industrial establishments only (§06.1); and the OSH Code s.6(1)(f) appointment letter at an "establishment" of 10 or more workers, in a state-prescribed form (EV-057). A works committee at 100 arises only where the appropriate Government orders it (§06.1), and ESI's Code-era latch wording is unconfirmed (§06.13). **POSH:** s.4(1) requires *every* employer to constitute an Internal Committee. The commonly cited ten-worker line is s.6(1), the *Local* Committee where no IC exists because the employer has fewer than ten workers — not an exemption (EV-056). These are alerts and feature-gates that mirror the customer's changing obligation. **[Verified — central sphere]** (EV-056, EV-057; state-sphere rows per §06.1). | Should | v1 |
| **FR-CHR-024** | Support **designations, grades/bands, and job titles** as governed lists (not free text) so that letters, org charts and grade-linked policies resolve deterministically. | Must | v1 |
| **FR-CHR-025** | Render an **org chart** from the management hierarchy with effective-dated snapshots (view the org "as of" any date), used by MSS and audit. | Should | v1 |
| **FR-CHR-026** | Support **multi-establishment / group-entity** payroll and cross-entity transfer with statutory-continuity handling (UAN/IP portability, gratuity clock treatment on inter-entity move). | Won't (v1) → Must (v2) | v2 |
| **FR-CHR-027** | Support **position management** (headcount by position, vacancy tracking) as an optional layer for larger tenants. | Could | v2 |
| **FR-CHR-028** | Model **contractor / principal-employer relationships**: a principal employer's ESI/PF liability for contract labour, contractor establishment codes and contractor LIN, and the data for the principal employer's **annual return** — OSH (Central) Rules r.98(9), FORM-XVII Part III, a contractor-wise monthly table (research r5/04, finding 20). The aim is that a beachhead manufacturer with contract labour is not silently non-compliant. **[Reversed]** v0.3 specified a "register of contract workers under the OSH Code". The OSH (Central) Rules 2026 prescribe no contractor or workmen register, and the 1971 Contract Labour Central Rules are superseded (finding 19). State rules may differ, so forms are configurable per state. The contract-labour threshold is 50 (EV-057). **[Hypothesis]** the depth of contract-labour handling the beachhead needs is unquantified; **kill/validate:** confirm via the same 15–25 buyer/Tally-partner interviews scoped for §20 (V-02) before investing beyond return data and code mapping. | Could | v2 |

**Establishment-registration format dictionary (FR-CHR-022) — the establishment has statutory keys too, and they gate filing.** Just as the employee master keys into government systems (§07.1.1), the establishment carries codes that each filing is submitted against; a malformed or wrong-scoped code routes a whole establishment's ECR/challan/return to the wrong place. This is the acceptance contract for FR-CHR-022.

| Establishment key | Format / structure | Issuer | Filing it scopes | Failure mode |
| --- | --- | --- | --- | --- |
| **EPFO establishment code** | Region/office/establishment code (+ optional extension/sub-code) (`id_format.epfo_establishment_code`) | EPFO | ECR upload | Wrong code → entire ECR filed against wrong establishment. **[Hypothesis — carried, not re-captured]** the segment structure. |
| **ESIC code** | 17-digit employer/establishment code (`id_format.esic_code`) | ESIC | Monthly ESI contribution | Malformed/absent → contribution cannot be filed. **[Hypothesis — carried, not re-captured]** the 17-digit length. |
| **PTRC** (employer) / **PTEC** (entity) | PTRC: the state-issued registration of the employer as deductor, held per state on the establishment. PTEC: the enrolment for the entity's own PT, held on the `legal_entity`; the each-director limb is carried, not re-captured (r1/06 finding 30; §06.4). Formats state-specific | State commercial-tax dept | State PT return (PTRC); entity PT payment (PTEC) | Missing per-state PTRC → cannot remit that state's PT (Example B). Maharashtra assigns the PTRC return frequency per registration each year, so the frequency is ingested, never derived (§06.4). |
| **LWF registration** | State-issued LWF employer number | State LWF board | State LWF remittance | Absent → LWF cannot be remitted for that state's staff. |
| **S&E registration** | State/municipal Shops & Establishments number | State/local authority | S&E compliance, threshold gating | Threshold per state Act — unverified **[Hypothesis]** (§06.1). |
| **LIN** | Labour Identification Number | MoLE (Shram Suvidha) | Form I header; principal-employer annual return (FORM-XVII Part III) on Shram Suvidha | The "Registration Number of the establishment" on the Form I register header (research r5/04, finding 16), and a column of the contractor-wise table in the principal employer's annual return (finding 20). **[Verified]** (r5/04 findings 16, 20). |
| **TAN / GSTIN / CIN** | On the `legal_entity`, not the establishment | Income Tax / GSTN / MCA | Form 138 (ex-24Q) (TAN), invoicing (GSTIN) | TAN is entity-level; ECR/PT are establishment-level — conflating the two scopes mis-files. |

The load-bearing distinction: **TAN sits on the legal entity, but PF/ESI/PT/LWF codes sit on the establishment** (§07.2a). A single legal entity with three establishments files one Form 138 series per TAN but three sets of ECR/ESI/PT returns per establishment — which is exactly why the statutory hierarchy is first-class (FR-CHR-021), not an attribute of the company.

**Why two hierarchies, concretely.** A 140-person manufacturer (inside the 20–200 beachhead) might have: one legal entity; a Pune plant (Maharashtra PF/ESI/PT), a Bengaluru sales office (Karnataka PT, same PF code or a sub-code), and remote engineers whose work-location determines their PT state. The management hierarchy says "all sales report to the VP Sales"; the statutory hierarchy says "the Bengaluru seller's PT is deducted and remitted under the Karnataka registration, and the Pune seller's under Maharashtra's." A model with one tree cannot represent both truths; it forces one to masquerade as the other.

**Acceptance criteria (org block).**
- An employee's payslip, ECR line, ESI contribution and PT deduction all resolve from the *establishment* the employee is mapped to for that period — demonstrably independent of the management department they sit in.
- Moving an employee between departments (same establishment) changes reporting/cost-centre but produces **no** change to PF code, ESI code or PT state.
- Moving an employee between establishments (FR-CHR-050-tr) changes the statutory codes and re-derives PT/LWF/PF-code, effective-dated, while preserving UAN and gratuity continuous-service where the move is within the same legal entity.
- An establishment that crosses 20 employees on any day (FR-CHR-023) raises an EPF-applicability alert and unlocks the PF feature-gate. Crossing 10 employees latches gratuity and maternity even if headcount later falls; the ESI latch follows §06.13 once confirmed. A 20-*worker* count (GRC) is computed on the worker counting unit, never on employees.
- An "as-of" org chart for a past date reflects the hierarchy in force then, not the current one.
- Each establishment holds its own EPFO/ESIC/PTRC/LWF/S&E/LIN codes (FR-CHR-022). An artefact generated for an establishment is stamped with that establishment's codes and the entity-level TAN. A code malformed against its format dictionary is flagged non-fileable and never carried into an artefact.

---

### 07.2a Entity and effective-dating model

The two hierarchies and the effective-dating commitment are only as good as the underlying data model. This subsection names the entities, their keys and the mechanics of temporal versioning so the acceptance criteria elsewhere have something concrete to assert against. It is deliberately shallow on physical schema (that is engineering-design, not PRD) and specific on the *invariants* a correct implementation must hold.

<!-- DIAGRAM: effective-dating-bitemporal -->

**Core entities and their keys.**

| Entity | Key | Notes |
| --- | --- | --- |
| `person` | `person_id` (immutable) | The human. Survives rehire, inter-entity transfer. Holds identity that does not change with employment (PAN, DOB, the opaque Aadhaar token and `uan_seeding_status` — never the number or its hash, FR-CHR-099). |
| `employment` | `employment_id` | An instance of employment of a `person` by a `legal_entity`. A rehire is a new `employment` under the same `person`. |
| `legal_entity` | `entity_id` | The company. Holds PAN, TAN, GSTIN, CIN and the PT enrolment (PTEC) per state. |
| `establishment` | `establishment_id` | Statutory unit under a `legal_entity`; holds PF code, ESI code, PT employer registration (PTRC), LWF registration, S&E registration, LIN (FR-CHR-022). |
| `establishment_mapping` | (`employment_id`, effective-range) | Which establishment an employment is under, for a period — the join that makes filing establishment-scoped. |
| `wage_structure` | (`employment_id`, effective-range) | CTC + component set with per-component statutory tags (FR-CHR-011). |
| `eligibility` | (`employment_id`, scheme, effective-range) | *Derived* PF/ESI/PT/LWF/gratuity/bonus status with the inputs that derived it (FR-CHR-012–016, 018a). |
| `org_assignment` | (`employment_id`, effective-range) | Management hierarchy: department, manager, cost centre, grade — decoupled from `establishment_mapping` (FR-CHR-021). |
| `nomination` | (`person_id`, scheme, version) | EPF, gratuity and ESI nominations; form identifier per scheme version (FR-CHR-044). |
| `audit_event` | `event_id` (append-only) | Every create/update/delete; actor, NTP timestamp, before/after, effective date (FR-CHR-089, 094). |
| `document` | `document_id` (immutable while retained) | Collected docs, generated artefacts with template-version binding (FR-CHR-064), and the TRACES-issued Form 130 stored as downloaded. **Erasable class** — not bitemporal. |
| `aadhaar_token_store` | opaque token | Separate store, separate keys, separate access control (FR-CHR-099). **Erasable** — reg 6(5) sets a retention ceiling (EV-068). |
| `consent_record` | `consent_id` (versioned) | Regime, purpose, notice version, whose artefact it is (FR-CHR-100). **Erasable class** — not bitemporal. |

**Bitemporality is scoped by entity class (Part E-2).** Bitemporal — never forgotten, replayable: rules, salary structures (`wage_structure`), assignments (`establishment_mapping`, `org_assignment`), and statutory attributes (the person's statutory identifiers, `eligibility`). **Not bitemporal — erasable:** punches (§09), rendered documents, biometric templates (FR-CHR-103), consent artefacts, and Aadhaar token-store entries. An erasable record is erased by **crypto-shredding its per-subject key**, or by **tombstoning** where the record is not encrypted per subject; §14 owns the mechanism. **Replay after an erasure returns the tombstone** — record id, class, dates, erasure basis and actor — in place of the content, and never a reconstruction. A replayed period that consumed an erased input, such as the punches behind a filed month's paid days, must replay from the inputs the run recorded (the paid-day count, not the punches); §08 and §14 own that input record. **[Reversed]** v0.3 declared every attribute bitemporal (K-24).

**Within the bitemporal classes, the two time axes are load-bearing.** Two independent time axes must be stored:

- **Valid time** — the period in the real world for which a fact is true (e.g., "gross was ₹23,000 from 1 August"). This is the effective date.
- **Transaction time** — when the system learned the fact (e.g., "entered on 12 November"). This is what makes a *late* or *back-dated* change auditable: a revision effective 1 August but entered 12 November has valid-time-from = 1 August and transaction-time = 12 November.

The retro-recompute rule (FR-CHR-093) is, precisely: *recompute a period using the facts whose valid-time covers that period, as those facts stand now* — while the audit log preserves what was believed at filing time via transaction time. A single-time model (only effective dates, no transaction time) cannot answer "what did we file, and why, and what changed since" — which is exactly what a filing correction and an audit read require. Deterministic replay **supports evidence production** for a regulated customer's audit or inspection; it does not discharge that customer's contractual audit, access and inspection obligations (K-21).

**Invariants a correct implementation holds.**

- No gaps or overlaps: for any `employment_id` and any date within employment, there is exactly one `establishment_mapping`, one `wage_structure`, one `org_assignment` — closed-open ranges `[from, to)`.
- Derived facts (`eligibility`) are never hand-edited; they are recomputed from inputs and their own effective ranges, so a mid-period statutory crossing produces a new range, not an overwrite (Example A).
- A `document` is immutable while retained; a correction is a new document version, and the superseded version is kept for its retention class (FR-CHR-064, FR-CHR-066). Documents are an erasable class, so when a retention clock expires and the document is erased, its tombstone remains.
- Every mutation appends an `audit_event`; there is no update-in-place on statutory-impacting fields without a corresponding event and (where gated) a checker (FR-CHR-084).
- `person_id` is never reused or merged silently; a genuine duplicate-person merge is an explicit, audited, reversible operation (rehire and duplicate-UAN prevention depend on it).
- **Concurrent edits to the same effective range are serialised, not last-write-wins.** Two makers proposing overlapping changes to the same `wage_structure` range must not silently clobber each other; the second proposal is rebased against the first or rejected with a conflict, because a filing computed from a clobbered range is wrong and unauditable. Optimistic concurrency (version token) on statutory-impacting entities is a hard requirement of the maker-checker design (FR-CHR-084).
- **A correction-of-a-correction is a new transaction-time layer, never an in-place edit.** If a retro revision (itself already filed as a correction) is later found wrong, the fix appends another transaction-time version — so the audit answers "what did we file in November, what did we correct in January, and what did we re-correct in March" as three legible states, not one overwritten row (FR-CHR-093).
- **Derived-fact recomputation is deterministic and idempotent:** re-running the eligibility derivation over an unchanged input set produces byte-identical ranges, so a readiness re-scan (FR-CHR-097) never churns the record or the audit log with phantom changes.

---

### 07.2b Establishment lifecycle, registration coverage and the headcount the master publishes

§06.1 owns the thresholds, the counting units and the latch semantics; §14 owns the establishment entity and the jurisdiction record; §22 owns the attended sessions that obtain a registration. This block owns what sits between them and nowhere else: the establishment record's own lifecycle and the guards that stop a live filing scope being closed under an open month; the headcount series the master *publishes* to the step function; what happens inside the system of record when an obligation turns on; and the restructuring events — split, merge, address change across a state line — that look like edits and are not.

<!-- DIAGRAM: fr-core-hr-establishment-states -->

| FR | Requirement | MoSCoW | Phase |
| --- | --- | --- | --- |
| **FR-CHR-138** | **The establishment is a lifecycle object, not a settings page.** Its states and transitions are the table below. An employment may be mapped only to an establishment in ACTIVE or REGISTRATION_PENDING, and a mapping to REGISTRATION_PENDING carries the readiness reason for each scheme whose code is not yet held. Closure is refused while any month on the establishment's filing ledger is open (§08 FR-PAY-712), while any mapping is live for a date in the future, or while a gated change on the establishment waits for its checker. A closed establishment keeps its history, its registers and their retention clocks, and stays readable for replay and inspection. | Must | v1 |
| **FR-CHR-139** | **The master publishes the headcount series; it does not decide the counting unit.** For every establishment and every day, the master publishes the set of employments with a live `establishment_mapping`, each with its engagement type, its worker-or-employee classification (FR-CHR-010) and its employment status (§07.3.5). Whether a given engagement type or status falls inside a statute's counting unit is §06.1's `count.<statute>.<engagement_type>` parameter, and the two statuses the master cannot answer for — unpaid absence and suspension — are held as `count.status.<status>` (`include` / `exclude` / `unconfirmed`), owned by the statutory lead and routed to §20. The series is rebuilt deterministically from the mappings, so a backdated mapping correction changes the series for the covered days and re-publishes it. | Must | v1 |
| **FR-CHR-140** | **A crossing produces work, never a silent switch.** When §06.1's step function reports that an obligation turned on for an establishment, the master records a **coverage fact** — the obligation, the trigger date, the counting unit, the count on that date and its bounds, the look-back window where the obligation latches, and the rule version that decided it — and raises the consequences in the table below: a registration task, a form-set switch, a re-derivation trigger (FR-CHR-134), and the readiness reasons. No crossing blocks payroll, onboarding or an exit, and none retires an obligation silently: an obligation is retired only by an explicit, reasoned, audited action against its recorded exit condition. | Must | v1 |
| **FR-CHR-141** | **Registration acquisition is an attended task whose output is a typed identifier change.** A missing registration for a scheme that is due leaves the liability computing and showing (§07.1.1a), opens the §22 runbook task, and ends with the code recorded as an *addition* (FR-CHR-106) under maker-checker. Nothing about the registration is inferred: the product never guesses a code's format beyond its format dictionary entry (FR-CHR-022), never back-dates a registration to make a prior month fileable, and records the registration's own effective date as the portal issued it. | Must | v1 |
| **FR-CHR-142** | **Restructuring is typed.** Splitting, merging, re-registering, surrendering a registration, or moving an establishment's address — including across a state line — are events with the effects in the restructuring table, not edits to fields. An address change that crosses a state line is a statutory transfer for every mapped employment (FR-CHR-050-tr) and re-derives PT and LWF from its effective date; an address change inside a state re-points the work location and leaves the codes alone. Every restructuring event is maker-checked and names the filing-ledger months it touches. | Must | v1 |

**The establishment record — the fields the lifecycle turns on.** §14 owns the entity; these are the fields §07's behaviour reads.

| Field | Rule |
| --- | --- |
| `establishment_id`, `legal_entity_id` | Immutable; an establishment never moves between legal entities — that is a close plus an open, with the employments transferred (FR-CHR-052, v2) |
| `state`, `sphere` | The work-location state and whether the appropriate Government is central or state for each obligation (EV-057); the jurisdiction record §14 owns carries the applicable Code-regime commencement date |
| `establishment_class` | Factory, shop, or the class the state's registration names — it decides which of §06.1's rows apply at all, and it is recorded from the registration, never inferred from headcount |
| `work_address` | The address that fixes the PT and LWF state for employees mapped here (FR-CHR-014) |
| `register_location` | Where the registers are kept or accessible. OSH r.72(4) and SS r.53(3) impose a three-kilometre constraint (EV-054), and how it applies to electronic registers is a counsel question (§23) — the field exists so the answer has somewhere to land |
| `coverage_facts[scheme]` | Per scheme: covered or not, the trigger date, the basis — a crossing, a notification, or a voluntary coverage decision — and the rule version. ESI applicability is switched on per establishment by notification and depends on the district, not on headcount alone (§07.3.1) |
| `registrations[scheme][state]` | EPFO code, ESIC code, PTRC per state, LWF registration, S&E registration, LIN (FR-CHR-022), each with its own effective range |
| `status`, `opened_at`, `closed_at` | The lifecycle below |

**Establishment lifecycle — the transition table.**

| # | From | Event | Guard | To | Side effect | Who may trigger |
| --- | --- | --- | --- | --- | --- | --- |
| EST1 | *(none)* | The establishment is recorded with its state, sphere, class and addresses | State and class present | DRAFT | Nothing is mappable yet; the obligation profile is computed from the recorded class and zero headcount | HR admin or super-admin, checked |
| EST2 | DRAFT | A registration task opens for a scheme the recorded obligations make due | The scheme is due and no code is held | REGISTRATION_PENDING | §22 runbook task; the scheme's readiness reason on any mapping made from here | System, on the obligation profile |
| EST3 | DRAFT | Every registration the recorded obligations need is on file | Each code passes its format dictionary entry (FR-CHR-022) | ACTIVE | Mappings allowed; the filing ledger opens for the establishment (§08) | Compliance checker |
| EST4 | REGISTRATION_PENDING | A registration code is recorded as an addition and checked | FR-CHR-141 | ACTIVE | The scheme's readiness reason clears; the months since the obligation's trigger date become fileable under it | Compliance checker |
| EST5 | ACTIVE | A new obligation turns on and its registration is not held | A coverage fact recorded by FR-CHR-140 | REGISTRATION_PENDING | Liability computes and shows; the task opens; payroll is unaffected | System |
| EST6 | ACTIVE | The last mapped employment ends | No mapping live for any date from today forward | DORMANT | The filing ledger stays open for months already begun; registers keep their clocks | System |
| EST7 | DORMANT | An employment is mapped again | The establishment's registrations are current | ACTIVE | The headcount series resumes | HR admin, checked |
| EST8 | DORMANT | Closure proposed | No open month on the filing ledger (§08 FR-PAY-712), no live or future mapping, no gated change waiting | CLOSED | Registrations recorded as retired (FR-CHR-106); registers and documents keep their retention clocks; the record stays readable | Compliance checker |
| EST9 | any | Closure proposed with an open month, a live mapping or a waiting change | — | unchanged | Refused, naming the month, the mapping or the change | — |
| EST10 | CLOSED | Any attempt to map an employment or generate an artefact | — | unchanged | Refused and audited; a reopening is a new establishment record with its own registrations | — |

**What the master publishes to the step function (FR-CHR-139), and what it deliberately does not decide.**

| Employment status (§07.3.5) | Contributes a head on that day? | Note |
| --- | --- | --- |
| DRAFT | No | Not activated; no mapping exists |
| PRE_JOINING | No | The mapping's effective range starts at the joining date |
| ACTIVE | Yes | — |
| UNPAID_ABSENCE | `count.status.unpaid_absence` — **`unconfirmed`** | Whether a person on unpaid absence is "employed on any day" for a threshold test is not captured; §06.1's two-bound counting carries it as a gap rather than a silent trigger or a silent miss |
| SUSPENDED | `count.status.suspended` — **`unconfirmed`** | Same question, same treatment |
| NOTICE | Yes | Still in service until the last working day |
| ABANDONMENT_REVIEW | Yes, to the date the abandonment concludes | The record is live until ST14 |
| EXITED, SETTLED | No, from the day after the last working day | The mapping closes on the last working day |
| DECEASED | No, from the day after the date of death | — |

The master publishes the series and the engagement mix. It never applies a threshold, never picks a counting unit and never decides a latch — those are §06.1's, and the separation is what lets a counting-unit parameter change without touching the master.

**What a crossing does inside the system of record (FR-CHR-140).** The obligation and its threshold are §06.1's; this table is the master-side consequence, which is what a build team implements here. Every row is warn-and-work, never block.

| Obligation turning on | Coverage fact recorded | Master-side consequence | Task raised | Readiness or setup |
| --- | --- | --- | --- | --- |
| EPF (EV-057) | Yes, with the look-back window | EPF derivations move off `NOT_COVERED_ESTABLISHMENT` from the trigger date (FR-CHR-134); UAN tasks open for every mapped employment without one (FR-CHR-041) | EPFO registration (§22.4.5) | `UAN_PENDING` per member until linked |
| ESI (EV-057, and coverage by notification) | Yes, naming whether the basis is a crossing or a district notification | ESI derivations re-derive from the trigger date; IP registration tasks open (FR-CHR-042) | ESIC registration; IP registrations | `ESI_IP_UNREGISTERED` per member |
| Prescribed-format appointment letter at an establishment of ten or more workers (EV-057, K-18) | Yes, on the worker counting unit | The letter template switches to the state-prescribed form where that form is configured; where it is not, the prescribed-form letter is not auto-issued and the gap shows (FR-CHR-043) | Configure the state form | Letter-issuance gap on the establishment |
| Gratuity and maternity benefit at ten, both latching (EV-057) | Yes, with the latch window and its exit condition | Gratuity accrual and maternity entitlement derivations turn on; the accrual runs from the trigger date forward (§08) | — | — |
| Grievance Redressal Committee at twenty workers (IR Code s.4, EV-057) | Yes, on the worker counting unit | A constitution record is due; the master holds the committee's membership as an establishment-level record | Constitute the committee | Setup checklist item |
| POSH Internal Committee — **every** employer, s.4(1) (EV-056) | Recorded at establishment creation, not on a crossing | The IC record is due from day one; the sub-ten Local Committee route is s.6(1) and is not an exemption | Constitute the IC (§10) | Setup checklist item from tenant creation |
| Contract labour at fifty, latching (EV-057) | Yes | The contractor and principal-employer data set turns on, including the contractor-wise annual-return table (FR-CHR-028) | Contractor records and LIN capture | — |
| Crèche at fifty; canteen at one hundred (EV-057) | Yes | A non-filing obligation: tracked and surfaced, with no artefact to generate (§05) | Obligation task | Obligation register entry |
| Standing orders and the retrenchment or closure permission line at three hundred, for industrial establishments only (EV-057) | Yes, with the establishment class that qualifies it | Surfaced on the establishment; the exit workflow shows the permission requirement on a termination path (§07.3.4) | Obligation task | — |
| RPwD Rule 3(2) written-response duty at twenty or more persons (EV-076) | Yes | The complaint workflow's sixty-day clock turns on; the workflow itself is §10's | Assign the responder | Setup checklist item |
| Transgender Persons Act complaint officer — no size threshold (EV-080); HIV and AIDS Act Complaints Officer at one hundred, or twenty in healthcare (EV-082) | Recorded at establishment creation and on the healthcare class | The designated-officer records are due; the workflows are §10's | Designate the officer | Setup checklist item |

**Restructuring events (FR-CHR-142).**

| Event | Effect on mappings | Effect on codes | Effect on the filing ledger | Refused when |
| --- | --- | --- | --- | --- |
| Address change inside the state | Unchanged | Unchanged | Unchanged; the register-location constraint is re-evaluated (EV-054) | — |
| Address change across a state line | Every mapped employment gets a statutory transfer effective on the change date (FR-CHR-050-tr) | The new state's PTRC and LWF registration become due; the EPFO and ESIC codes follow the registration, not the address, and are changed only when the portal reissues them | The old state's months stand; the transfer month follows each state's `transfer_month_rule`, and where either is unset the month is held for an operator decision | The effective date falls inside a month already at PAYMENT_INITIATED (Part E-1) |
| Split — one establishment becomes two | Each employment is mapped to exactly one successor from the effective date; no employment is left unmapped for any day | Each successor holds its own registrations; a successor without one enters REGISTRATION_PENDING | Months before the split stay on the original ledger; months after start on the successors' | Any employment would be unmapped or doubly mapped for a day |
| Merge — two establishments become one | Mappings re-point to the survivor from the effective date | The survivor's registrations apply from that date; the absorbed establishment's are retired (FR-CHR-106) | Both ledgers stay readable; the absorbed one is closed only under EST8 | The absorbed establishment has an open month |
| Re-registration — the portal reissues a code | Unchanged | The old code is a succession, not a correction (FR-CHR-106); artefacts already generated keep the code they were generated under | Months already filed are unaffected; the next generation reads the new code | The kind chosen is "correction" |
| Surrender of a registration | Employments for the scheme derive `NOT_COVERED_ESTABLISHMENT` from the surrender date | Retired with its effective date | Open months under that registration must be closed first | An open month exists for the scheme |

**Worked example — opening a second-state office, and why the liability shows before the registration exists.** The 140-person manufacturer of §07.2 opens a Bengaluru sales office. The establishment is recorded on 10 September 2026 with state Karnataka and its class from the S&E registration it is applying for (EST1). Six employees are mapped to it from 1 October. Karnataka's PT rows are sourced, so their PT liability computes and shows from October, but the establishment holds no Karnataka PTRC: EST2 puts it in REGISTRATION_PENDING, `PT_REGISTRATION_MISSING` stands against the six, and the §22 registration runbook opens. Payroll runs and all six are paid on time. The PTRC is issued on 18 November and recorded as an addition under maker-checker (EST4, FR-CHR-141); October and November are then remitted under it on Karnataka's cadence, and nothing filed in Maharashtra is touched. Had Karnataka's rows *not* been sourced, the outcome would have been `UNDETERMINED` instead of a computed liability (FR-CHR-136) — the difference between "we know what you owe and cannot yet remit it" and "we do not know what you owe", which the readiness report states in exactly those terms.

**Worked example — a closure that is refused.** The same office is wound up on 31 March 2027. The last mapped employment ends on 31 March, so EST6 moves it to DORMANT on 1 April. The compliance checker proposes closure on 3 April. The March PT return and the March ECR are still open on the filing ledger, so EST9 refuses, naming both months. After both are filed and the ledger shows no open month, EST8 closes it: the PTRC, the S&E registration and the LIN are retired with their effective dates, the registers keep their five-year clocks from their own last entries (EV-054), and the establishment stays readable for replay. Nothing in the closure shortens a retention clock, and OSH r.76(2) still bars destruction of a register even after five years unless it has been carried into a new one (EV-054).

**Acceptance criteria (establishment lifecycle).**
- An employment cannot be mapped to a DRAFT or CLOSED establishment; a mapping to REGISTRATION_PENDING is allowed and carries the readiness reason for each scheme whose code is missing.
- Closure is refused while any month on the filing ledger is open, any mapping is live or future-dated, or a gated change on the establishment is waiting; the refusal names what blocked it.
- A crossing reported by §06.1 writes a coverage fact with its trigger date, counting unit, count, bounds, look-back window and rule version, and raises exactly the consequences in the crossing table. No crossing blocks a payroll run, an onboarding or an exit.
- An obligation is never retired by a headcount dip; retirement requires an explicit reasoned action against the recorded exit condition, and the action is audited.
- The published headcount series is reproducible from the mappings for any past day, and a backdated mapping correction changes the series for the covered days and re-publishes it.
- A status the master cannot classify — unpaid absence, suspension — is published as `unconfirmed` rather than counted or dropped, and appears in §06.1's two-bound gap.
- An address change across a state line produces a statutory transfer for every mapped employment and re-derives PT and LWF; an address change inside a state produces no code change.
- A reissued registration code is recorded as a succession; artefacts already generated keep the code they carried, and the next generation reads the new one.

**Test scenarios — establishment lifecycle.**

| # | Given | When | Then |
| --- | --- | --- | --- |
| T-ES-1 | A DRAFT establishment | An onboarding tries to map a joiner to it | Refused, naming the state; the joiner can be mapped once EST3 or EST2 has run |
| T-ES-2 | An establishment in REGISTRATION_PENDING for PT, in a state whose rows are sourced | The month is processed | PT computes and shows with `PT_REGISTRATION_MISSING`; no PT return is offered; everyone is paid |
| T-ES-3 | The PTRC recorded as an addition and checked | Re-derivation runs | The months since the obligation's trigger date become fileable under it; `PT_REGISTRATION_MISSING` clears |
| T-ES-4 | An establishment with an open September ECR month | Closure is proposed | Refused, naming September |
| T-ES-5 | A DORMANT establishment with a clean ledger | Closure is proposed and checked | CLOSED; registrations retired; registers keep their clocks; the record stays readable for replay |
| T-ES-6 | A CLOSED establishment | A generator is pointed at it | Refused and audited |
| T-ES-7 | Headcount crossing twenty employees on 14 August | The step function reports it | A coverage fact is written with the date, unit, count and bounds; EPF derivations turn on from that date; UAN tasks open; no run is blocked |
| T-ES-8 | Headcount falling to seventeen in November | The step function re-runs | The obligation stays on; the record shows the latch and its exit condition; nothing is retired silently |
| T-ES-9 | An employee on unpaid absence for a whole month | The series is published | The employment appears with `count.status.unpaid_absence = unconfirmed`; §06.1 reports a two-bound gap, not a trigger |
| T-ES-10 | An establishment address moved from Maharashtra to Gujarat effective 1 January | Approved | Every mapped employment gets a statutory transfer on 1 January; PT and LWF re-derive; the EPFO and ESIC codes are unchanged until the portals reissue them |
| T-ES-11 | A split where one employee would be left unmapped for a day | Submitted | Refused, naming the employee and the day |
| T-ES-12 | A reissued EPFO code submitted as a correction | Submitted | Refused with `ID-CHANGE-KIND`; succession is offered, and previously generated artefacts keep the old code |

---

### 07.3 Employee Lifecycle — hire → confirm → transfer → exit

The lifecycle is the sequence of state transitions on the employment record, and **each transition has statutory side effects** that the system must execute, not merely record. A "confirmation" is trivial in a generic HRMS; in an Indian statutory HRMS a *hire* triggers UAN tracking or transfer (the employee now generates the UAN), ESI IP registration, an appointment letter (in the appropriate Government's prescribed form where the establishment has 10 or more workers — EV-057) and the PF joining declaration (FR-CHR-045a). An *exit* triggers FnF, gratuity settlement, date-of-exit marking on the EPFO portal, PF withdrawal or transfer by the member, register updates and — after the Tax Year closes — distribution of the TRACES-generated Form 130. Portal steps are attended actions with a portal-accepted artefact, never claims of automated submission (§22). The employer's own staff may perform them, or our operator under the customer's written authority to act; the operator path ships disabled per tenant until counsel clears the Part D-17 questions (§23), and either way the employer's statutory liability is non-delegable. The FRs below specify the side effects, because those are the product.

<!-- DIAGRAM: employee-lifecycle -->

#### 07.3.1 Hire and onboarding

| FR | Requirement | MoSCoW | Phase |
| --- | --- | --- | --- |
| **FR-CHR-040** | Create the employment record from an offer or onboarding intake. Collect: PAN; UAN if any; bank details once the written-consent record exists (FR-CHR-006, FR-CHR-100); Aadhaar only if the employee chooses to provide it (FR-CHR-101); previous-employer details; dependants and nominees; and required documents (FR-CHR-050). | Must | v1 |
| **FR-CHR-041** | Handle the **UAN lifecycle at joining**. (a) If the employee has an existing UAN, link it via the joining declaration (FR-CHR-045a); never create a duplicate. (b) If none, the **employee** generates and activates the UAN through Aadhaar-based Face Authentication in the UMANG app. Since 1 August 2025 that is EPFO's only route, except for International Workers and citizens of Nepal and Bhutan, where the employer route survives (EPFO circular dated 30.07.2025; research r4/04, finding 7). The product prompts, tracks and chases; it does not collect Aadhaar for this. Until a UAN exists the member cannot appear in an ECR, because UAN is field 1 of the file (EV-035). (c) Block a second UAN on the same person without an explicit multiple-UAN exception (FR-CHR-104). **[Verified]** the employee-side UAN route (r4/04 finding 7). **[Reversed]** v0.3 had the employer "mark for UAN generation on first ECR". | Must | v1 |
| **FR-CHR-042** | Handle **ESI IP registration** for employees crossing coverage at joining: prepare the IP registration data, track pending → registered, and record the ESIC portal entry as an attended step (§22). Aadhaar seeding at IP registration is optional ("an employer *can* seed Aadhaar" — research r4/04, finding 9; FR-CHR-101). | Must | v1 |
| **FR-CHR-043** | Generate an **appointment letter** for every joiner, populated from the master and the wage structure. Where the establishment has 10 or more workers — the OSH Code s.6(1)(f) duty attaches to an "establishment" at that size — issue it in the form the appropriate Government prescribes. That is state-sphere, so the form is configured per state (EV-057; K-18). **[Reversed]** v0.3 made a prescribed-format letter mandatory "from employee one". Where that state's form is unverified, the prescribed-form letter is not auto-issued and the gap is shown to the operator (§20). | Must | v1 |
| **FR-CHR-044** | Capture **nominations** as required by statute — EPF, gratuity and ESI nominations, and dependant records — because these are filing/settlement artefacts, not HR nice-to-haves. A gratuity nomination is required from each employee who has completed one year of service (CoSS s.55 **[Verified]**, r1/06 finding 44). The form identifiers are held per scheme version, not hard-coded: the legacy names (EPF Form 2 under the 1952 Scheme; gratuity Form F under the repealed Act's rules) are carried, not re-captured, and the forms under EPF Scheme 2026 and the Social Security (Central) Rules 2026 are not captured (parameter `epf.form_catalogue`, §06.2; §06.6). | Must | v1 |
| **FR-CHR-045-onb** | Add the new joiner to the **Employee Register** automatically on activation, not as a separate manual step. The register is Form I under Wages Rules r.51(1), with OSH Form XIII covered by the non-duplication provisions, and the form number is configurable per state (EV-053). Form I has 36 numbered fields, including specimen signature or thumb impression (EV-055), and its field 24 is Aadhaar No. That field is populated only if the employee provided Aadhaar, rendered from the token store at generation time; an employee who has not provided it gets an empty field with a reason code, never a blocked onboarding. Whether a rendered register may carry the full number, and whether an empty field satisfies Form I, are routed to counsel (§23; §06.9). Until that sign-off is recorded, field-24 rendering and thumb-impression capture ship dark per tenant (§06 R24). Field 35 defaults to a specimen signature: a thumb impression is biometric information — DPDP has no sensitive category (EV-059), but SPDI r.3 classes biometric information as sensitive and r.5(1) requires written consent before collection (EV-060) — so it is an opt-in artefact captured under a consent record (FR-CHR-100) in the biometric keyspace, never as a stored image (FR-CHR-103). Field 34 (Photo) is "biometric information" under Aadhaar Act s.2(g) (EV-071); it is an access-controlled document on the employee record, and its consent basis goes to counsel with field 35. Retention: five years after the date of last entry (Wages r.51(4) — EV-054). **[Verified — central sphere]** (EV-053–055). | Must | v1 |
| **FR-CHR-045a** | Capture the **PF joining declaration** at joining — Form 11 under the 1952 Scheme — which determines whether the joiner is an existing PF/EPS member and drives the FR-CHR-041 branch; the onboarding cannot complete without it. The form identifier under EPF Scheme 2026 is not captured, so it is read from `epf.form_catalogue` keyed by scheme version (§06.2); the Form 11 name is carried, not re-captured. | Must | v1 |

**The prescribed-form appointment letter (FR-CHR-043) — field set.** Where OSH Code s.6(1)(f) applies (an establishment of 10 or more workers — EV-057), the letter is a statutory instrument, not an HR courtesy. A letter missing mandated content is a compliance gap, so the template binds to master data rather than free text. The form is prescribed by the appropriate Government, so the field set below is a candidate to be locked per state, not a verified list. It is expected to carry: employee name and designation; category/nature of employment (permanent/fixed-term/etc.); date of joining; wage/CTC with the component breakdown that matches the wage slip; place of work (which fixes the PT state); working hours; leave entitlement; notice period; and the statutory identifiers being generated (UAN/IP status). Because the format is effective-dated (FR-CHR-064), a letter reissued for a past joiner reflects the format then in force. **[Hypothesis]** the exact notified field list varies by state rule under the Codes; **kill/validate:** lock the mandated-field set against each beachhead state's notified rule before v1 GA, treating unverified states as letter-not-auto-issuable (Source: OSH Code s.6(1)(f) via EV-057; Central Rules 8 May 2026; state rules rolling out unevenly — §20 risk register).

**Onboarding edge cases.**
- **Joiner with active PF in a still-open prior job** (moonlighting/overlap) — concurrent membership on one UAN must be surfaced. The product never creates a UAN (FR-CHR-041), and a second UAN declared by the employee is handled as a multiple-UAN exception, not silently accepted.
- **Joiner below ESI ceiling but at an uncovered establishment** — fewer than 10 persons, or a work location in a district where ESI is not notified or only partially notified. ESI applicability is switched on per establishment by notification and depends on the district, not on headcount alone (r1/06 findings 24–25). No ESI liability yet; store eligibility-derivable-but-establishment-not-covered so a later crossing or notification triggers coverage.
- **Rehire of a former employee** — reuse the canonical `employee_id` (FR-CHR-001), link the prior UAN via the joining declaration, and decide gratuity-clock continuity explicitly (Example L).
- **Backdated joining** (offer accepted, systems entered late) — DOJ is effective-dated; the first ECR/ESI period is the actual joining month, and any missed period is a retro filing, not a silent current-month entry.

**Acceptance criteria (hire).**
- On activating a joiner with an existing UAN, the system produces a link task and never creates a second UAN. On activating one without, it opens an employee-side UAN task (UMANG face authentication; the employer route only for IWs and citizens of Nepal and Bhutan), and the ECR readiness report blocks that member's line until a UAN exists.
- At an establishment of 10 or more workers, the appointment letter uses the state-prescribed form configured for the establishment's state, with that form's mandated fields. A joiner cannot be marked "onboarded" without an issued appointment letter and a completed PF joining declaration (FR-CHR-045a).
- The Employee Register (Form I or the state equivalent) reflects the joiner within the same run that activates them; the entry carries the establishment mapping used for statutory filing.
- An ESI-eligible joiner (gross ≤ ₹21,000) at a covered establishment is created with IP-pending and appears on the ESI registration worklist; the same joiner at an uncovered establishment is created eligibility-derivable-but-not-covered.
- A rehire reuses the canonical `employee_id` and links the prior UAN, and the gratuity clock reflects the continuity decision explicitly rather than defaulting silently.

#### 07.3.2 Confirmation and probation

| FR | Requirement | MoSCoW | Phase |
| --- | --- | --- | --- |
| **FR-CHR-046** | Track **probation** with configurable duration and auto-surface confirmation-due, supporting confirm, extend-probation (with new end date and reason), or separate-during-probation. | Must | v1 |
| **FR-CHR-047** | On confirmation, apply any confirmation-linked changes (CTC revision, benefit eligibility, notice-period change) as **effective-dated** events, and generate a confirmation letter. | Must | v1 |
| **FR-CHR-048** | Maintain a **fixed-term contract** clock with end-date alerts and renewal/conversion handling; fixed-term workers accrue gratuity pro-rata under the Codes, so the accrual engine must not exclude them. **[Verified]** the 5-year condition does not apply on fixed-term expiry and payment is pro rata (CoSS s.53; r1/06 finding 43). **[Hypothesis]** the one-year qualifying period for fixed-term employees is a rules-level reading from two professional-services sources, not the Code's own text (r1/06 finding 45; §06.6); it is parameter `gratuity.fixed_term_min_service`. | Should | v1 |

**Edge cases.** Probation lapsing unactioned must raise an overdue exception, not deemed-confirm (deemed confirmation may still arise as a matter of law from the contract, so the *exception* is the product's job, and the legal effect is the customer's counsel's). Extending probation must carry a reason and a new end date and issue a letter. A fixed-term worker converted to permanent must preserve continuous service for gratuity (the fixed-term period counts).

**Fixed-term is a Codes-specific trap the master must get right.** The Codes gave fixed-term employees statutory parity: pro-rata gratuity irrespective of the 5-year rule (CoSS s.53 **[Verified]**), and, as professional-services summaries of the Codes put it, "all other statutory benefits available to a permanent workman, proportionately" (r1/06 finding 45, secondary). So a fixed-term worker on a 3-year contract who does *not* renew is entitled to pro-rata gratuity even though they never cross 5 years — the gratuity engine must not exclude fixed-term from accrual (FR-CHR-048). v0.3 also stated that non-renewal is **not** retrenchment, so no retrenchment approval is triggered. That exclusion is carried, not re-captured against the IR Code text **[Hypothesis]**. The product therefore does not open a retrenchment workflow on non-renewal, and it surfaces the question for review at an establishment that has crossed the retrenchment-approval line (FR-CHR-023); the IR Code reading goes to §20. On conversion to permanent, the fixed-term months carry into continuous service with the same employer; on a same-role renewal, the clock is continuous. A system that models fixed-term as "contractor, no gratuity" under-provisions liability and mishandles the exit path.

**Acceptance criteria (confirmation).**
- A confirmation-due list is generated ahead of each probation end date; letting a probation lapse without action does not silently confirm — it raises an overdue exception.
- A confirmation-linked CTC revision recomputes both wage bases from the effective date and issues an audited letter.
- A fixed-term worker's gratuity accrual is present and pro-rated, not zero; on conversion to permanent the fixed-term months count toward continuous service.

#### 07.3.3 Transfer, promotion and revision

| FR | Requirement | MoSCoW | Phase |
| --- | --- | --- | --- |
| **FR-CHR-049** | Support **management transfers** (department, manager, cost centre, designation, grade/promotion) as effective-dated events with letters. | Must | v1 |
| **FR-CHR-050-tr** | Support **statutory transfers** — inter-establishment and inter-state — with automatic re-derivation of PF code, ESI code, PT state and LWF, and a transfer-month treatment for each levy read from a per-state rule parameter (`pt.<state>.transfer_month_rule`, `lwf.<state>.transfer_month_rule`). No research round captured how any state treats an employee who changes state mid-month, so the rule is part of the V-09 dataset and has no shipped default; until it is set for both states, the transfer month is flagged for operator decision, never silently computed (§20). | Must | v1 |
| **FR-CHR-051** | Support **CTC/wage revision** with retro effect: a revision back-dated into a filed period triggers an arrears/retro computation against the **rule version and wage tagging in force for that period**, not today's, with an audit trail. This follows from engine purity (Part E-3; §08) and the effective-dated wage definition (§06.10). On the PF side, liability on arrears dates from the disbursal date, not the wage month, and is surfaced when the arrears batch is approved (Part E-9; §08). | Must | v1 |
| **FR-CHR-052** | Support **inter-entity (cross-legal-entity) transfer** with UAN/IP portability decisions, gratuity-clock continuity choice, and full-and-final in the outgoing entity where required. | Won't (v1) → Must (v2) | v2 |
| **FR-CHR-053** | Support **deputation / secondment** and **location-only change** (work-from-home to office, city change) that may or may not change the statutory establishment — the two are decoupled by FR-CHR-021. | Could | v2 |

**The mid-month inter-state transfer is the acid test.** PF is portable within the same UAN, so an inter-establishment move within one legal entity keeps the UAN but may change the establishment member-ID and the ECR the contribution appears on. PT is remitted per state against each state's employer registration (PTRC), so the transfer month can touch two states' returns for one employee. How it does — a split by days or wages attributable to each state, or the whole month to one state — is the per-state `transfer_month_rule` (FR-CHR-050-tr), because no research round captured any state's treatment (worked Example B). ESI similarly follows the covered establishment. LWF periodicity differing between the two states means the LWF deduction timing itself may differ (monthly in one, half-yearly or annual in the other — r1/06 finding 53).

**What re-derives on each move type — the decision table the transfer engine implements.** The two hierarchies (FR-CHR-021) mean not every "transfer" touches statutory scope; the engine must re-derive exactly what the move changes and nothing more.

| Move type | Manager/dept/grade | PF code | ESI code | PT state | LWF | UAN/IP | Gratuity clock |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Dept change, same establishment | Changes | — | — | — | — | Same | Continuous |
| Promotion / grade change, same establishment | Changes | — | — | — | — | Same | Continuous |
| Inter-establishment, same state, same legal entity | May change | Re-point (or sub-code) | Re-point | — | — | **Same UAN** | Continuous |
| Inter-establishment, **different state**, same entity | May change | Re-point | Re-point | **Re-derive + transfer-month rule** | **Re-derive (periodicity may differ)** | Same UAN | Continuous |
| Inter-entity transfer (v2, FR-CHR-052) | Changes | New entity code | New entity code | Re-derive | Re-derive | **Portability decision** | **Continuity choice** |
| WFH/city change, no establishment change | — | — | — | Only if work-location state changes | Only if state changes | Same | Continuous |

The rule the table encodes: **statutory re-derivation follows the establishment/work-location, never the management move.** A promotion that does not change establishment produces zero statutory-code churn; a desk move across a state line re-derives PT/LWF even with no title change (Example B, Example I).

**Acceptance criteria (transfer).**
- An inter-state transfer effective mid-month applies each state's configured `transfer_month_rule`, and the transfer month's PT lands on the returns that rule names; under that rule neither state is double-charged nor missed. Where either state's rule is unset, the month is held on the readiness report for an operator decision, recorded with its actor, rather than computed by a default.
- A within-entity inter-establishment transfer preserves the UAN, re-points PF/ESI codes, and never creates or accepts a duplicate UAN or IP.
- A promotion changes grade/designation and letters but, if the establishment is unchanged, produces no change to PF/ESI/PT codes.
- A back-dated CTC revision into a filed month generates arrears computed on that month's rule version and wage tagging; the originally filed return is preserved and a correction path is offered rather than silent overwrite.

#### 07.3.4 Exit and full-and-final

Exit is the most statutory-heavy transition and the one where a model that records transitions without executing their statutory side effects fails most visibly. The exit workflow must orchestrate FnF, statutory settlements and certificate issuance, and it must handle the *non-clean* exit types — absconding, death, termination-for-cause — that carry different settlement and documentary paths.

| FR | Requirement | MoSCoW | Phase |
| --- | --- | --- | --- |
| **FR-CHR-054** | Support exit types: **resignation, retirement, termination (with/without cause), end-of-fixed-term, absconding, death**, each with its own notice, settlement and documentation path. | Must | v1 |
| **FR-CHR-055** | Run **notice-period handling**: shortfall recovery or buy-out, garden leave, and notice-pay computation on the correct wage base. | Must | v1 |
| **FR-CHR-056** | Compute **Full-and-Final (FnF)**: final salary, leave encashment, gratuity (where eligible on the 5-yr / 240-day test), pending reimbursements, bonus, recoveries (notice shortfall, salary advance, asset), and TDS on the settlement. | Must | v1 |
| **FR-CHR-057** | Compute and settle **gratuity** on exit for eligible employees under CoSS Chapter V (ss.53–56; the Payment of Gratuity Act 1972 is repealed by s.164(1)). Apply the statutory formula — 15 days' wages per completed year, monthly wage ÷ 26, service in excess of six months counting as a full year — on the add-back wage base (CoSS s.53, s.2(88) **[Verified]**, r1/06 findings 42–43). Two ceilings are held as separate parameters that never share a field (§06.6). The **payable ceiling** is "such amount as may be notified by the Central Government" under CoSS s.53(3); no notification has been located, and the familiar ₹20 lakh is a legacy of the repealed Act (`gratuity.payable_ceiling`, **[Hypothesis]** amount). The **tax-exemption ceiling** is lifetime and cumulative across employers (`tax.gratuity_exemption_ceiling`; 1961-Act s.10(10), value carried, not re-captured, 2025-Act equivalent unmapped). Issue the settlement documentation; the Code-era form is not captured (§06.6). | Must | v1 |
| **FR-CHR-058** | Orchestrate **PF and ESI closure**. Record the date of exit and its reason on the EPFO portal as an attended step (§22). The date of exit is not an ECR file field (EV-035), and it can be marked without any member-detail or Aadhaar update (research r5/02, finding 13). Contributions are accepted only between the valid date of joining and the date of leaving (EV-040). A wrongly recorded date of exit can be corrected only by a **joint declaration** of employer and employee (EV-041). That is an offline dependency that blocks later contributions for the member, so it is modelled as a blocking exception with an SLA. Enable UAN-based withdrawal or transfer by the member, and stop ESI contribution while respecting contribution-period rules. **[Reversed]** v0.3 marked the exit "in the ECR (date + reason code)". | Must | v1 |
| **FR-CHR-059** | Issue **exit documents** (relieving letter, experience/service certificate), and track and distribute the member's **Form 130 (ex-Form 16)**. Form 130 has Parts A, B and C and is generated only on TRACES; a certificate not generated there is invalid (EV-048). For a mid-year leaver, this employer's Form 130 covers its own period and is due by 15 June after the Tax Year (Income-tax Rules 2026 r.215(1)–(2); research r5/04, findings 29–30). The product prepares the Form 138 data the certificate is built from and distributes the TRACES-issued certificate exactly as downloaded. The Form 138 Q4 format is unreleased and blocks the annual certificate, so Q4 and everything downstream of Annexure II are **fenced** (EV-046). **[Verified]** (EV-046, EV-048; Form 138 Q1–Q3 v1.2 shipped 22.07.2026 — r2/10; see §06.5). **[Reversed]** v0.3 had the product generating Form 130 from its own templates. | Must | v1 |
| **FR-CHR-060-exit** | Update **statutory registers** and keep the exited employee's register entries under the central-sphere retention rules: Wages r.51(4), five years after the date of last entry; OSH r.72(1)(vii) and SS r.53(1)(e), five calendar years from the date of last entry. OSH r.76(2) bars destruction even after five years unless the register has been transferred to a new one (EV-054). An erasure request inside those periods is **deferred**, with the governing rule cited, and the record is kept but restricted. State-sphere periods, and every class not covered by EV-054, are configurable parameters under counsel review (Part D-11, §23). DPDP's erasure and retention provisions are not in force until on or about 13 May 2027 (EV-058), and whether DPDP rights reach s.7(i) processing at all is a counsel question (Part D-1). **[Verified — central sphere]** (EV-054). **[Reversed]** v0.3 cited a DPDP exemption as live law. | Must | v1 |
| **FR-CHR-061** | Handle **death-in-service**: nominee-directed settlement, EDLI (Employees' Deposit Linked Insurance) claim support, and gratuity without the 5-year condition, paid pro rata, on death or disablement. **[Verified]** the gratuity rule (CoSS s.53, r1/06 finding 43) and the EDLI employer contribution (EPFO EDLI page, r1/06 finding 14). The EDLI Scheme 1976 is saved by CoSS s.164(2)(b) only until on or about 21 November 2026, and no EDLI successor instrument is captured (§06.9, §06.13), so the claim-support flow reads the scheme version in force on the date of death. | Should | v1 |
| **FR-CHR-062** | Support **clawback / recovery** on exit (sign-on bonus, training bond, retention pay) with configurable schedules and TDS treatment. | Could | v2 |
| **FR-CHR-063** | Provide an **exit interview** capture and an exit-reason taxonomy feeding attrition analytics. | Could | v2 |

**Exit-type matrix — the paths differ, so the product must too.**

| Exit type | Notice handling | Gratuity | Relieving letter | Special path |
| --- | --- | --- | --- | --- |
| Resignation | Serve / buy-out / shortfall recovery | If ≥5 yr of continuous service (CoSS s.54 day-count; 4y240d reading configurable, FR-CHR-016) | Yes, on clearance | Standard FnF |
| Retirement (superannuation) | N/A | Yes | Yes | Pension/EPS commencement support |
| Termination without cause | Notice or pay-in-lieu | If eligible | Yes | Prior-permission workflow only for an industrial establishment (factory, mine, plantation) of 300 or more *workers*; the notice regime from 50 in the same classes (FR-CHR-023; §06.1) |
| Termination for cause | Per policy/enquiry | Eligibility survives unless forfeited under CoSS s.53(6) | Conditional | Forfeiture only on s.53(6) grounds, as a reasoned action |
| End of fixed-term | Contract end | Pro-rata (FR-CHR-048) | Yes | No retrenchment workflow opened; the IR Code reading of non-renewal is carried, not re-captured (§07.3.2) |
| Absconding | No auto-relieving | Per eligibility if claimed | **No** — abandonment path | Documented notice-to-return before treating as abandonment |
| Death-in-service | N/A | 5-yr condition does not apply; pro rata (CoSS s.53) | To nominee | EDLI + nominee-directed settlement (FR-CHR-061) |

**FnF composition (FR-CHR-056) — each line has its own wage base and TDS treatment.** A correct settlement is not "salary minus deductions"; it is an assembly of heads each governed by a different rule, which is why the master's component tagging (FR-CHR-011) and effective-dating are load-bearing at exit.

| FnF head | Direction | Wage base | TDS / exemption treatment |
| --- | --- | --- | --- |
| Salary for days worked in exit month | Earning | Earned (paid-days pro-rated) | Fully taxable; TDS under s.392 (ex-s.192) |
| Leave encashment | Earning | Encashment base — the s.2(88) wage re-bases leave encashment (r1/06 finding 5); policy divisor | Exemption for eligible cases (1961-Act s.10(10AA); limit and 2025-Act section via parameter, §20); excess taxable |
| Gratuity (if eligible) | Earning | Last-drawn add-back wage × 15/26 × completed years (CoSS s.53) | Exempt up to `tax.gratuity_exemption_ceiling`, net of prior employers' gratuity (§06.6); excess taxable |
| Statutory/ex-gratia bonus due | Earning | Capped bonus base (FR-CHR-018a) | Taxable |
| Pending reimbursements | Earning | Per claim (proof-verified) | Per perquisite/exemption rules |
| Notice-shortfall recovery | Deduction | Notice base (FR-CHR-055) | Reduces taxable settlement |
| Salary advance / loan outstanding | Deduction | Principal + accrued per schedule | — |
| Asset/other recovery | Deduction | Per policy | — |
| Net TDS on settlement | Deduction | Computed on the taxable assembly | Final-month true-up; flows into the Form 138 data behind the TRACES-generated Form 130 |

The engine assembles these into a single settlement statement; the ECR/ESI/PT for the exit month follow the earned figures, not contracted (Example J). A model that nets salary and deductions without head-level tagging cannot apply the correct exemption per head and mis-computes TDS on the settlement.

**Settlement timelines are statutory deadlines the workflow must clock, not soft targets.** The Code on Wages requires final wages to be paid within **two working days** of removal, dismissal, retrenchment or resignation (s.17(2)). The appropriate Government may set another limit (s.17(3)), and a time limit in any other law in force — a state Shops & Establishments Act, for instance — is preserved (s.17(4)), so the deadline is resolved per state as parameter `fnf.final_wage_deadline.<state>`, with two working days as the Code default. Gratuity is payable within **30 days** of becoming payable, with simple interest for delay (CoSS s.56). So the exit workflow carries an SLA clock from the last working day, surfaces breach risk on the readiness surface, and treats a delayed FnF as a compliance exception, not a back-office lag. **[Verified]** (Code on Wages s.17(2)–(4), r1/06 finding 7; CoSS s.56, r1/06 finding 43).

**Gratuity forfeiture (FR-CHR-057) is not a delete.** CoSS s.53(6) provides forfeiture to the extent of damage or loss caused by the employee, and on termination for riotous or disorderly conduct **[Verified]** (r1/06 finding 42; §06.6). The repealed Act's further limb — an act of violence, or an offence involving moral turpitude committed in the course of employment — is carried, not re-captured, and stays a reason code pending a read of the full s.53(6) text **[Hypothesis]**. The product must model forfeiture as an explicit, reasoned, audited action against eligible gratuity — never as "eligibility = no."

**Acceptance criteria (exit).**
- FnF for a resigning employee with 6 years' service computes gratuity on the add-back wage base at 15/26 per completed year (>6 months rounds up), encashes leave per policy, recovers any notice shortfall, applies TDS, and produces a single settlement statement.
- An employee exited before 5 years of continuous service does **not** receive gratuity via normal resignation; the death, disablement and fixed-term rules are applied where they hold, and a 4-years-240-days case is routed for jurisdiction confirmation, never auto-approved (FR-CHR-016).
- Gratuity is capped at `gratuity.payable_ceiling` only once that parameter is set from a notification; while it is unset, the full computed amount is shown with a "Code-era ceiling not notified" flag. Separately, the tax exemption is capped at `tax.gratuity_exemption_ceiling` net of gratuity from prior employers, and the excess is taxed.
- On exit, the date of exit and reason are recorded on the EPFO portal as an attended step, and the member's contributions stop at the date of leaving. A wrongly recorded date raises the joint-declaration exception (EV-041). The member can initiate UAN transfer or withdrawal, and ESI stops per contribution-period rules.
- An erasure request from an exited employee inside the EV-054 retention window gets a reasoned deferral citing the governing rule, and the record is not deleted. After the window the record becomes erasure-eligible, subject to OSH r.76(2) for registers. Disposal then follows the tenant's configured policy; neither immediate purge nor a one-year suppression is hard-coded (Part D-9; FR-CHR-066).
- An absconding case does not auto-issue a relieving letter; it follows the termination-for-abandonment path with its own documentation (notice-to-return recorded).
- A death-in-service case pays gratuity pro rata without the 5-year condition, routes settlement to the recorded nominee, and raises an EDLI claim task against the scheme version in force on the date of death.
- Final wages are clocked against the state's `fnf.final_wage_deadline` (two working days by default under s.17(2)); a breach raises a compliance exception, not a reminder.

#### 07.3.5 Employment status — the state machine, and what each state obliges downstream

§07.3.1 to §07.3.4 specify the *transitions* and their statutory side effects. This block specifies the *state* those transitions move through, because in practice the defects come from the states between the transitions: the suspended worker nobody included in the run, the absconder who vanished from the ECR population, the resignation withdrawn two days before the last working day, the joiner who never reported and stayed "active" for a month. The machine below is small on purpose. Probation and confirmation are **attributes** of an ACTIVE employment (FR-CHR-046), not states, and neither is a paid statutory leave: an employee on paid maternity leave is ACTIVE. Adding either to the machine would multiply the states without changing a single downstream obligation.

<!-- DIAGRAM: fr-core-hr-employment-states -->

| FR | Requirement | MoSCoW | Phase |
| --- | --- | --- | --- |
| **FR-CHR-143** | **Employment status is an effective-dated first-class fact with a closed transition table.** The states are DRAFT, PRE_JOINING, ACTIVE, UNPAID_ABSENCE, SUSPENDED, NOTICE, ABANDONMENT_REVIEW, EXITED, SETTLED and DECEASED. A status changes only through a transition in the table, each with its guard, its side effect and the role that may trigger it; no status is ever set as a side effect of another action — not by an attendance import, not by a leave approval, not by a failed payout. Every change carries an effective date, so a status recorded late still takes effect from the right day. | Must | v1 |
| **FR-CHR-144** | **Status decides population, never money.** The status decides whether an employment is in a run's population, in a filing's population, in a register's rows and in the establishment's headcount series (FR-CHR-139); it never decides an amount. What is paid follows the wage structure and the paid days (§08, §09), and what is contributed follows the derived eligibility (§07.1.2a). The matrix below is the contract, and it holds one invariant above all: **while a mapping is live, no status removes a member from a period's filing population.** A member with no wage in a period is a filing fact, not a skip (§08 AC-109.8, §09 FR-FIL-002). | Must | v1 |
| **FR-CHR-145** | **Unpaid and non-working states are recorded with their basis, and the product ships no entitlement.** UNPAID_ABSENCE records the approval that authorised it and its range. SUSPENDED records the order, its date and the authority that made it; whether and at what rate a suspended employee is paid is the employer's decision under its own instrument, so the product holds the recorded decision as a wage input and ships no rate, no default and no statement of entitlement (§23). ABANDONMENT_REVIEW records the date the unauthorised absence began and the notice to return that §07.3.4 requires, with the tenant's own threshold held as `abandonment.notice_to_return_days` — owner the HR lead, no shipped default, routed to §20. In every one of these states the days actually paid drive the month, and the unpaid days reach the ECR as NCP days, field 10 of the file (EV-035; §09 FR-FIL-001). | Must | v1 |
| **FR-CHR-146** | **Terminal states are terminal, and a return is a new employment.** EXITED, SETTLED and DECEASED are never transitioned back to ACTIVE. A resignation withdrawn *before* the last working day is ST15 and keeps the same employment; a return *after* it is a rehire — a new `employment` under the same `person` (FR-CHR-001), with the duplicate check and the UAN link of Example L. An exit recorded in error is corrected as a typed correction (FR-CHR-106) and runs the FR-CHR-109 artefact table; where the date of exit has already been marked at EPFO, correcting it needs a joint declaration by employer and employee (EV-041), which the product models as a blocking exception with an SLA (FR-CHR-058), never as a field edit. | Must | v1 |
| **FR-CHR-147** | **No status is deleted, and no status change is silent.** Every transition writes an audit event with actor, NTP-synced time, effective date and reason code (FR-CHR-089); the prior status stays readable in transaction time (§07.2a). A transition whose effective date falls inside a period at or beyond PAYMENT_INITIATED does not rewrite that period — it raises a correction candidate for §08 (Part E-1). The subject is notified of every transition on their personal contact channel (FR-CHR-009) except DRAFT to PRE_JOINING. | Must | v1 |

**The transition table.** "Who may trigger" is the role that *proposes*; transitions marked **C** are gated change types and need a distinct checker (§07.6a). The guards are cumulative with the permissions matrix, never a substitute for it.

| # | From | Event | Guard | To | Side effect | Who may trigger |
| --- | --- | --- | --- | --- | --- | --- |
| ST1 | *(none)* | Record created from an offer or an import row | A `person` exists or is created; the duplicate check runs (FR-CHR-108) | DRAFT | Nothing statutory; no mapping, no register entry | HR admin; import |
| ST2 | DRAFT | Activated with a future joining date | The mandatory onboarding set is complete, including the PF joining declaration (FR-CHR-045a) | PRE_JOINING | The establishment mapping is created with an effective range starting at the joining date | HR admin |
| ST3 | DRAFT | Activated on or after the joining date | As ST2 | ACTIVE | Register entry committed (FR-CHR-045-onb); UAN and IP tasks open; eligibility derives | HR admin |
| ST4 | PRE_JOINING | The joining date is reached and joining is confirmed | Joining confirmed by the manager or HR | ACTIVE | As ST3, from the joining date | System, on confirmation |
| ST5 | PRE_JOINING | The joiner does not report | No wage has been paid and no artefact generated for the employment | DRAFT | The mapping is withdrawn; the register entry, if committed, is reversed with a reason and the reversal kept | HR admin · **C** |
| ST6 | ACTIVE | Approved unpaid absence covering a whole wage period | The approval and its range are recorded (FR-CHR-145) | UNPAID_ABSENCE | Payroll population unchanged; paid days go to nil; NCP days follow (§09) | HR admin |
| ST7 | UNPAID_ABSENCE | Return to work recorded | Return date recorded | ACTIVE | Paid days resume from the return date | HR admin; manager |
| ST8 | ACTIVE | Suspension ordered | The order, its date and the authority are recorded | SUSPENDED | Any recorded subsistence decision enters as a wage input; nothing is inferred | HR admin · **C** |
| ST9 | SUSPENDED | Suspension revoked, or the enquiry closes without separation | Outcome recorded | ACTIVE | Any recorded arrears decision enters as an input to §08, effective-dated | HR admin · **C** |
| ST10 | SUSPENDED | Separation decided at the end of the enquiry | Outcome and its date recorded | NOTICE | The exit path of §07.3.4 opens with exit type termination-for-cause | HR admin · **C** |
| ST11 | ACTIVE | Resignation or termination notice accepted | Notice period and last working day recorded (FR-CHR-055) | NOTICE | Exit checklist opens; the FnF clock is armed against `fnf.final_wage_deadline` from the last working day | Employee (resignation); HR admin |
| ST12 | ACTIVE | Unauthorised absence past the tenant's recorded threshold | `abandonment.notice_to_return_days` is set for the tenant | ABANDONMENT_REVIEW | Notice-to-return task; the employment stays in every population | HR admin |
| ST13 | ABANDONMENT_REVIEW | The employee returns and the absence is regularised | Regularisation recorded (§09) | ACTIVE | Paid days follow the regularisation | HR admin |
| ST14 | ABANDONMENT_REVIEW | Abandonment concluded after the recorded notice to return | The notice is on file with its date and channel | EXITED | Exit type absconding; **no relieving letter is issued** (§07.3.4); FnF assembles from the days actually paid | HR admin · **C** |
| ST15 | NOTICE | Resignation withdrawn before the last working day and accepted | The last working day has not passed | ACTIVE | The exit checklist closes with a reason; the FnF clock disarms; the same employment continues | HR admin · **C** |
| ST16 | NOTICE | The last working day passes | — | EXITED | Date of exit recorded for the EPFO attended step (FR-CHR-058); ESI stops per contribution-period rules; biometric erasure triggered (FR-CHR-103) | System, on the date |
| ST17 | ACTIVE | Exit without notice, including the end of a fixed term | Exit type and last working day recorded | EXITED | As ST16; a fixed-term end opens no retrenchment workflow (§07.3.2) | HR admin · **C** |
| ST18 | ACTIVE or NOTICE | Death in service recorded | Date of death and evidence recorded | DECEASED | Nominee-directed settlement; EDLI claim task against the scheme version in force on that date (FR-CHR-061); gratuity without the five-year condition | HR admin · **C** |
| ST19 | EXITED | Settlement paid and the date of exit marked at the portal | FnF released and the attended step recorded (§22) | SETTLED | The exit is complete; retention classes take over; access drops to the retention view | Payroll · **C** |
| ST20 | DECEASED | Nominee settlement paid and claims raised | As ST19, to the recorded nominee | SETTLED | As ST19 | Payroll · **C** |
| ST21 | any | A transition whose effective date falls in a period at or beyond PAYMENT_INITIATED | — | recorded, period untouched | A correction candidate is raised for §08; nothing in the filed period is rewritten | — |
| ST22 | EXITED, SETTLED, DECEASED | Any attempt to return to ACTIVE | — | unchanged | Refused and audited; a rehire is a new employment (FR-CHR-146) | — |

**Status × downstream obligation (FR-CHR-144).** "In population" means the member appears in the run or the filing with whatever figures the period produces, including nil.

| Status | In the payroll run | In the ECR population | ESI | PT and LWF | Register rows | ESS access | Headcount series | Readiness scanned |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| DRAFT | No | No | No | No | None | None | No | No |
| PRE_JOINING | No, until the joining date | No | No | No | The Form I entry is committed on activation for the joining date (FR-CHR-045-onb) | Onboarding tasks only | No | Identity reasons only |
| ACTIVE | Yes | Yes | Per the derived eligibility | Per the derived liability | Every applicable register | Full | Yes | Yes |
| UNPAID_ABSENCE | Yes, with nil or partial paid days | **Yes** — unpaid days become NCP days (EV-035 field 10) | Per the wage actually paid and the running contribution period | Per the state's rule on a nil or partial wage; an unsourced state is `UNDETERMINED`, never zero-by-omission | Yes, with the absence shown | Full | `unconfirmed` (FR-CHR-139) | Yes |
| SUSPENDED | Yes, on the recorded decision | **Yes** | On whatever is actually paid | As above | Yes | Full unless the tenant restricts it, recorded as a decision | `unconfirmed` | Yes |
| NOTICE | Yes | Yes | Yes | Yes | Yes | Full | Yes | Yes |
| ABANDONMENT_REVIEW | Yes, on the days actually paid | **Yes** | Yes | Yes | Yes, with the absence shown | Full | Yes, to the abandonment date | Yes |
| EXITED | Yes, for the exit month and the settlement | Yes for the exit month; contributions are accepted only up to the date of leaving (EV-040) | Stops per the contribution-period rules | Per the state's rule for the exit month | Entries stay and carry their retention clocks (EV-054) | Retention view — payslips, Form 130 when issued, and the data-principal surface (FR-CHR-076) | No | Yes, until SETTLED |
| SETTLED | Only for a later correction run | Only through a Supplementary or a correction route (EV-037) | — | — | As EXITED | As EXITED | No | Only where an open exclusion or correction stands |
| DECEASED | Yes, for the settlement | As EXITED | As EXITED | As EXITED | As EXITED | Closed; the nominee's channel replaces it (FR-CHR-061) | No | Yes, until SETTLED |

Three consequences of this matrix are worth stating because they are the defects it exists to prevent. **A member never leaves a period's filing population because of a status.** **An exit does not freeze the record** — a correction whose evidence arrives after the employee has left is still accepted and routed (§07.1.1a), because FnF, Form 130 distribution and a later Supplementary may all read it. **A status is not a permission**: what an exited employee may see is the retention view in the permissions matrix, not a consequence of the status enum.

**Worked example — an absconder, the NCP line and the correction that follows.** Ravi is mapped to a covered Pune establishment at a PF wage of ₹15,000 a month. He is present on 1, 2, 3, 4, 5 and 8 September 2026 and then stops coming. September has 30 days, and his pay group's convention gives 6 paid days.

- On 15 September HR records the unauthorised absence from 9 September and moves him to ABANDONMENT_REVIEW (ST12). The notice to return is issued and recorded with its date and channel.
- September runs on time. His earned PF wage is ₹15,000 × 6 ÷ 30 = **₹3,000**. The employee share is 12% = **₹360**. The employer share is also ₹360, split as EPS 8.33% of ₹3,000 = **₹249.90** and EPF the balance = **₹110.10**; the pension wage is far below the ₹15,000 cap, so nothing is capped here. Rounding is §08's policy. The unpaid days go into ECR field 10 as NCP days — 24 on this convention — and the fractional-day question is `ecr.ncp_fractional_rule`, which is §08's and ships unset.
- He does not return. On 20 October, after the recorded notice period, abandonment is concluded with a last working day of 8 September (ST14). The exit type is absconding, so **no relieving letter is issued**, and FnF assembles from the days actually paid.
- The exit is recorded after September's return was filed and paid. The date of exit is not an ECR file field (EV-035) and is marked at the portal as an attended step (FR-CHR-058). Because September's contribution was for days *before* the date of leaving, the filed line stands; contributions are accepted only between the valid date of joining and the date of leaving (EV-040), so October carries no line for him. If the date of exit had been keyed wrongly at the portal first, correcting it would need the employer-and-employee joint declaration (EV-041) — an offline dependency modelled as a blocking exception with an SLA, which is exactly why the product records the last working day from the abandonment conclusion rather than letting an operator type a convenient date.

**Worked example — a resignation withdrawn, and the same case two days later.** Sunita gives notice on 1 October with a last working day of 31 October (ST11). On 24 October she withdraws and the employer accepts: ST15 returns her to ACTIVE, the exit checklist closes with a reason, the FnF clock disarms, and her `employment_id`, UAN, PF Member ID, gratuity clock and establishment mapping are all untouched — nothing statutory happened, because nothing statutory had happened yet. Had the acceptance come on 2 November instead, ST22 refuses: she is EXITED, the date of exit is marked at the portal, ESI has stopped, and her return is a rehire — a new `employment` under the same `person`, with the duplicate check, the UAN link and the explicit gratuity-continuity decision of Example L. The two cases differ by two days and by every statutory artefact involved, which is why the last working day is the guard on ST15 rather than a policy note.

**Negative cases.**

| Attempt | Outcome |
| --- | --- |
| An attendance import with thirty absent days sets a status | Refused; imports write attendance, never status (FR-CHR-143) |
| A failed payout marks an employment inactive | Refused; a returned credit follows §08 AC-903.1 and touches no status |
| An operator sets EXITED to remove a member from a rejecting ECR | Refused as a use of status to change a filing population (FR-CHR-144); the rejection is handled by its own route |
| A suspension recorded with a pay rate the product supplied | No rate exists to supply; the decision is recorded or the field stays empty (FR-CHR-145) |
| A rehire keyed by reopening the old employment | Refused; a new `employment` under the same `person` is the only path (FR-CHR-146) |
| A status change back-dated into a month at PAYMENT_INITIATED | Recorded with its effective date; the period is untouched and a correction candidate is raised (ST21) |
| An exited employee's record edited to stop a pending Form 130 distribution | Refused; the retention view and the distribution obligation are independent of status |
| Deleting a status row to "clean up" a mistaken suspension | No delete path; a correction supersedes it and both stay readable (FR-CHR-147) |

**Acceptance criteria (employment status).**
- Every status change arrives through a transition in the table, with its guard satisfied, its audit event written and its effective date recorded; no other code path writes a status.
- For every status except DRAFT and PRE_JOINING, a member with a live mapping appears in the period's filing population, with nil figures where nil is right.
- A whole-period unpaid absence produces a payslip, register rows and an ECR line whose NCP days equal the unpaid days on the pay group's convention; the member is never dropped from the return.
- A suspension is recorded with its order, date and authority, and produces no pay figure the tenant has not recorded.
- An abandonment cannot be concluded without a recorded notice to return; the conclusion sets the last working day, issues no relieving letter, and assembles FnF from the days actually paid.
- A resignation withdrawn before the last working day keeps the employment and every statutory identifier; a return after it is refused as a status change and offered as a rehire.
- A status change effective inside a period at or beyond PAYMENT_INITIATED leaves that period's figures and artefacts untouched and raises a correction candidate.
- The subject is notified of every transition except DRAFT to PRE_JOINING, on the personal contact channel, and the notification is an in-app task where the channel is rate-limited (FR-CHR-088).

**Test scenarios — employment status.**

| # | Given | When | Then |
| --- | --- | --- | --- |
| T-ST-1 | A PRE_JOINING employment whose joiner never reports, no wage paid | ST5 is proposed and checked | The status returns to DRAFT, the mapping is withdrawn, the register entry is reversed with a reason, and the reversal stays readable |
| T-ST-2 | The same case after one month's salary has been paid | ST5 is proposed | Refused by the guard; the exit path is offered instead |
| T-ST-3 | A whole-month unpaid absence | The month is processed | Payslip, register rows and an ECR line with NCP days equal to the unpaid days; the member is in the return |
| T-ST-4 | An employee suspended on 5 October with no recorded pay decision | October is processed | The run completes with nothing paid for the suspended days and no inferred rate; the missing decision shows as a run flag |
| T-ST-5 | Unauthorised absence from 9 September and no `abandonment.notice_to_return_days` set | ST12 is attempted | Refused, naming the unset tenant parameter; the absence is still recorded in attendance |
| T-ST-6 | ABANDONMENT_REVIEW with a recorded notice to return | ST14 is proposed and checked | EXITED with exit type absconding, a last working day, no relieving letter, and FnF from the days actually paid |
| T-ST-7 | A resignation withdrawn on the last working day minus one, accepted | ST15 | ACTIVE; the same `employment_id`, UAN, PF Member ID and gratuity clock; the FnF clock disarms |
| T-ST-8 | The same withdrawal accepted two days after the last working day | ST15 is attempted | Refused; a rehire is offered, opening a new employment under the same person with the duplicate check |
| T-ST-9 | An exited employee whose PAN correction evidence arrives in February | The correction is submitted | Accepted and routed through FR-CHR-109; the exit does not freeze the identifier |
| T-ST-10 | A death in service on 12 November | ST18 recorded and checked | Nominee settlement path, EDLI claim task against the scheme version in force on 12 November, gratuity without the five-year condition |
| T-ST-11 | A status change back-dated into a month already at PAYMENT_INITIATED | Approved | The period's artefacts are byte-identical; a correction candidate is raised for §08 |
| T-ST-12 | An attendance import for a month of absences | Loaded | Attendance changes; no status changes; the readiness report is unaffected |
| T-ST-13 | An operator attempts EXITED to drop a member from a rejecting ECR | Submitted | Refused and audited; the rejection is routed to its own handling |
| T-ST-14 | An employment in SETTLED | A Supplementary for an excluded month is prepared | Allowed — SETTLED restricts the run population, not the correction routes (EV-037) |

---

### 07.4 Documents & Records

Documents in this product are of three kinds, and only the first is ordinary DMS content. (a) **Collected documents** (ID proofs, education, prior payslips) are uploaded at onboarding; Aadhaar documents are preferably never uploaded (FR-CHR-099). (b) **Statutory artefacts** are *filings or filing-adjacent* and carry retention and format obligations. The product generates some (appointment letter, wage slip, FnF statement) and receives others, such as the TRACES-issued Form 130, which it stores and distributes but never generates (EV-048). (c) **The statutory registers themselves** are legally mandated records. The Wages, OSH and SS rules expressly permit electronic maintenance (research r5/04, finding 9); only records under the IR rules must be electronic (r.47(1) — EV-054). The requirements below keep (b) and (c) under compliance controls, not generic file-storage controls.

| FR | Requirement | MoSCoW | Phase |
| --- | --- | --- | --- |
| **FR-CHR-050** | Provide a **document repository** with type taxonomy, per-type mandatory/optional and expiry (e.g., visa/work-permit for IWs), versioning, and role-scoped access. Store documents encrypted, India-resident by default. SPDI r.7 restricts cross-border transfer of sensitive data such as financial and biometric information (EV-060), so any non-India residency option for those classes is under counsel review (§23). Aadhaar never enters the repository (FR-CHR-099). Per-tenant residency options: §17. | Must | v1 |
| **FR-CHR-064** | **Generate statutory letters and artefacts** from templates bound to master data: the appointment letter (in the state-prescribed form where FR-CHR-043 applies), the wage slip (Form V / Form XVI, form number configurable per state — EV-053), confirmation, transfer, promotion, relieving and experience letters, and the FnF statement. Templates are versioned and effective-dated, so a reissued historical letter reflects the format then in force. Form 130 is never generated here; it is stored as downloaded from TRACES (FR-CHR-059). | Must | v1 |
| **FR-CHR-065** | Maintain the **employer registers**: six registers plus the wage slip across three central rule-sets. These are Wages Rules r.51(1) Forms I, IV and IX with the Form V wage slip; OSH Forms XIII, XIV, XV, XIX and XX with the Form XVI wage slip; and SS r.53(1)(a) Form XXII, the Register of Women Employees. The non-duplication provisions (OSH r.72(3); SS r.53(1)(a) proviso) reduce them to **one canonical set** (EV-053). Registers are maintained electronically as filing artefacts, not reports, with form numbers configurable per state, and are retained per EV-054 (FR-CHR-060-exit). Form IX needs per-day IN and OUT timestamps (EV-055; §09 owns the time model). Two EV-054 conflicts go to counsel (§23): the Form XXII "in ink" requirement against SS r.53(1)(b)'s electronic permission, and the three-kilometre location constraint (OSH r.72(4), SS r.53(3)) as applied to electronic registers. **[Verified — central sphere]** (EV-053–055). **[Reversed]** v0.3 specified "four consolidated registers". | Must | v1 |
| **FR-CHR-066** | Enforce **retention schedules** per document class with the statutory-retention-overrides-erasure rule (FR-CHR-060-exit), and support legal hold. Only EV-054's central-sphere periods are stated as figures; every other period is a configurable parameter under counsel review (Part D-11). | Must | v1 |
| **FR-CHR-067** | Support **bulk document generation** (e.g., annual letters, appraisal letters) — metered as an incremental-value SKU rather than bundled, per the monetisation model (§18). | Should | v2 |
| **FR-CHR-068** | Provide **e-signature / acknowledgement capture** on issued letters (employee acknowledgement of appointment letter, policy acceptance) with audit trail. | Should | v1 |
| **FR-CHR-069** | Provide **document-expiry and renewal alerts** (work permits, contracts, statutory certificates at establishment level). | Could | v2 |

**The employer registers (FR-CHR-065).** The Codes and Central Rules consolidated dozens of legacy registers into one canonical set of six registers plus a wage slip (EV-053). The deduplicated set is: Employee Register; Attendance-cum-Muster Roll; Wages/OT/Deductions Register; Leave-with-Wages Register; Accident & Dangerous Occurrences Register; and Women Employees Register (research r5/04, finding 6). The product treats each as a live artefact regenerated from the master, not a static upload. Retention is statutory and runs from the register's *last entry*, not per employee (finding 44). A register entry therefore cannot be deleted by an erasure request within its window (FR-CHR-066), and period-scoped registers (Form IX is monthly) are the mitigation. **[Verified — central sphere]** register inventory and non-duplication (EV-053). **[Hypothesis]** state-rule form numbers and column schemas are a build dependency; **kill/validate:** lock schemas against each beachhead state's notified forms before v1 GA, and treat Form I's 36 fields and Form IX's per-day IN/OUT grid (EV-055) as the central-sphere baseline (§06).

**Retention schedule by document class (FR-CHR-066) — retention is per-class and statutory, not a single tenant setting.** The erasure-override rule (FR-CHR-060-exit) only has teeth if the product knows *how long* each class must be held and *under what authority*. The schedule below is the acceptance contract for retention. Where a document belongs to more than one class, the longest applicable clock wins. **Only EV-054's central-sphere figures are stated; every other period is a named configurable parameter under counsel review (Part D-11, §23).** Research r5/04 identifies candidate periods under the Income-tax Rules 2026, the Companies Act and the Social Security Code (findings 32–37, 45–46); these are inputs to counsel, not product defaults.

| Document class | Minimum retention | Governing basis | Notes |
| --- | --- | --- | --- |
| Employer registers (EV-053) | Wages r.51(4): five years after the date of last entry. OSH r.72(1)(vii) and SS r.53(1)(e): five calendar years from the date of last entry. | EV-054 **[Verified — central sphere]** | The clock runs per register from its last entry, not per employee (r5/04 finding 44). OSH r.76(2) bars destruction even after five years unless the register is transferred to a new one. State-sphere periods unknown — counsel. |
| EPF/ESI employer records and returns | SS r.53(1)(e): five calendar years from the date of last entry | EV-054 **[Verified — central sphere]**; r5/04 finding 22 | Longer claim tails: `retention.epf_esi_tail`, counsel. Nominations kept until superseded or settled. |
| Wage slips (Form V / Form XVI) | `retention.wage_slip` — counsel | Wages Rules r.52 / OSH r.72(2) (EV-053) | r.51(4)'s period covers "registers"; its reach to wage slips is unconfirmed. |
| TDS records, Form 138 statements, challans | `retention.tds` — counsel | Income-tax Act 2025 / Rules 2026 | Not hard-coded. |
| Form 130, stored as downloaded from TRACES | `retention.form_130` — counsel | Income-tax Rules 2026 r.215 | Never regenerated. A duplicate is issued on request, certified as duplicate (r.215(3); r5/04 finding 30), and is itself generated on TRACES (EV-048). |
| Gratuity records + gratuity nomination | `retention.gratuity` — counsel | CoSS Ch. V (the Payment of Gratuity Act 1972 is repealed) | Needed to defend a controlling-authority claim. |
| Appointment, relieving and experience letters; FnF statements | `retention.letters` — counsel | Codes + limitation | Immutable while retained. |
| Aadhaar number (token store) and any uploaded Aadhaar document | **Ceiling, not floor**: delete once the consented purpose is spent | Sharing Regulations reg 6(5) (EV-068) | FR-CHR-099; configurable override for a statutory-retention need, with an audited deletion. |
| Other collected KYC documents (PAN copies etc.) | `retention.kyc` — counsel | — | Prefer status fields over stored copies; masked and access-audited. |
| Consent records | `retention.consent_evidence` — counsel | SPDI Rules 2011 / DPDP (FR-CHR-100) | Erasable class; evidence of lawful collection. |

Retention that outlasts an erasure request is defensible only where a named instrument compels it. The product stores the governing basis alongside each clock, so an erasure deferral (FR-CHR-060-exit) cites the specific instrument rather than a generic "we keep records". When the clock expires, the record becomes erasure-eligible. Disposal then follows the tenant's configured policy: neither immediate purge nor a one-year suppression is hard-coded, because whether DPDP r.8(3) imposes a universal one-year floor is under counsel review (Part D-9).

**Reproducibility is the load-bearing property for artefacts the product generates.** A statutory letter or FnF statement issued today may be challenged or reissued years later. While it is retained, it must be reproducible byte-for-byte from the master state and template version at issuance. This forces effective-dated templates (FR-CHR-064) and immutable storage of the issued artefact; a letter regenerated from the current template would silently rewrite history. After an erasure, the tombstone is what replay returns (§07.2a). Form 130 is outside this property: it is TRACES-generated (EV-048), the stored copy is the one downloaded, and a replacement is a certified duplicate under r.215(3) (r5/04 finding 30), never a product regeneration.

**Acceptance criteria (documents).**
- A generated appointment letter or FnF statement is reproducible byte-for-byte from the master state and template version in force at issuance, and is stored immutably while retained. A Form 130 is stored exactly as downloaded from TRACES and is never regenerated by the product.
- The employer registers (EV-053) export in the form configured for the establishment's state and cover the EV-054 retention window with no gaps across joiners, transfers and exits.
- A document under legal hold or statutory retention cannot be deleted through the erasure path; the attempt is logged and refused with the governing basis.
- Access to a payslip or Form 130 is confined to the employee, their reporting chain per policy, and authorised HR/finance roles — never the whole tenant.

---

### 07.4a Artefact assembly, the generation manifest and the document state machine

§07.4 says which documents exist and how long they are kept. §06.9 owns the statutory forms and their column schemas; §22 owns the portal sessions that consume the filing artefacts. This block owns the three things in between that a build team cannot infer: the **manifest** that makes "reproducible byte-for-byte" an assertion a test can run rather than a promise; the **state machine** every generated document moves through, including the erasure path that statutory retention keeps refusing; and the **assembly contract** that says which master entity supplies which register's rows and what happens when one of them is missing. A blank cell in a register is the defect this block exists to prevent: it is indistinguishable from "nothing to report" at an inspection.

<!-- DIAGRAM: fr-core-hr-document-states -->

| FR | Requirement | MoSCoW | Phase |
| --- | --- | --- | --- |
| **FR-CHR-148** | **Every generated artefact carries a generation manifest and a content hash.** The manifest fields are the table below. It is written at issue, is immutable, travels with the document through export and is what a reproduction test replays against. An artefact without a complete manifest cannot reach ISSUED. The manifest names the *versions* that decided the content — template, rule set, master read time, establishment and entity codes, the explainers of any derived range it consumed (FR-CHR-135) — so that a reproduction in 2029 of a letter issued in 2026 is a mechanical replay rather than an argument. | Must | v1 |
| **FR-CHR-149** | **Documents move through one state machine.** The states and transitions are the table below and the diagram above. Bytes never change after ISSUED; a correction is a new version and the superseded version is kept for its own retention class (§07.2a). Erasure is refused inside any applicable retention window with the governing instrument named (FR-CHR-060-exit, FR-CHR-066), a legal hold outranks every clock, and disposal at the end of the clock follows the tenant's configured policy — neither an immediate purge nor a one-year suppression is hard-coded (Part D-9). After disposal the tombstone is what replay returns. | Must | v1 |
| **FR-CHR-150** | **Registers are assembled, not authored.** Each register in the canonical set (FR-CHR-065) is assembled on its own cadence from the master entities the source map below names. A row is never omitted because an input is missing: the row is generated with the field empty and a **reason code** in the register's gap log, which names the field, the employment, the period and the readiness reason that will close it. The retention clock runs from the register's own **date of last entry** (EV-054), not per employee, which is why the period-scoped registers are generated per period rather than as one perpetual document. | Must | v1 |
| **FR-CHR-151** | **An acknowledgement is a record, not a claim.** Where an issued document is acknowledged or signed (FR-CHR-068), the product records the fields in the acknowledgement table and nothing more. It makes no statement about the legal effect of any signature; where an eSign route is used the licensed provider performs the authentication and the product never holds an Aadhaar number for it (FR-CHR-099; §16.9). A document not acknowledged within `document.acknowledgement_reminder_days` — tenant-set, owner the HR lead — raises a reminder and then a task, and is never deemed acknowledged. | Must | v1 |
| **FR-CHR-152** | **One artefact index, queryable per establishment and period.** Every document the product generates or receives is indexed with its class, subject, period, state, manifest reference, hash and retention clock, so "show me everything issued for this establishment for FY 2026-27, with what each was generated from" is one query. An export from the index carries each document with its manifest and hash. The index is the surface an inspection, a due-diligence review or a regulated customer's audit request is served from; it **supports evidence production** and does not discharge that customer's own audit, access and inspection obligations (K-21). | Should | v1 |

**The generation manifest (FR-CHR-148).**

| Field | Rule |
| --- | --- |
| `document_id`, `version` | Immutable while retained; a correction increments the version and links the predecessor |
| `class` | From the artefact catalogue below; it decides the retention clock and the state machine's guards |
| `subject_ref` | `person_id` and `employment_id`, or the establishment and period for a register |
| `template_id`, `template_version`, `template_effective_range` | The template in force at issue (FR-CHR-064); a reissue for a past period replays this version, never today's |
| `form_number`, `form_state_config` | The state-configured form number where one applies (EV-053), recorded as resolved at issue |
| `rule_set_version` | The rule versions that decided any computed value on the face of the document |
| `eligibility_explainer_refs` | The explainers of every derived range the document consumed (FR-CHR-135) |
| `master_read_at` | The transaction time the master was read at — the "as known at generation" point every generator quotes (§07.1.1a read contract) |
| `identifier_reads` | For each identifier on the face of the document: owning level, value reference and the date it was read as of; Aadhaar appears as a token and a purpose, never as digits (FR-CHR-099) |
| `establishment_id`, `entity_codes` | The establishment's codes and the entity TAN the artefact is stamped with (§07.2) |
| `generated_by`, `generated_at` | Actor and NTP-synced time (EV-062) |
| `content_hash` | Over the issued bytes; the reproduction test compares hashes, not renderings |
| `markers` | Any **[Hypothesis]** or fenced marker inherited from a rule or form the document depends on, so an artefact resting on an unverified state form says so |

**The document state machine (FR-CHR-149).**

| # | From | Event | Guard | To | Side effect | Who may trigger |
| --- | --- | --- | --- | --- | --- | --- |
| DS1 | *(none)* | The generator assembles from the master and the template in force | The template version resolves for the period; the gap log is written | DRAFT | Nothing is distributed | System; the generating role |
| DS2 | DRAFT | Issue | Manifest complete (FR-CHR-148); the subject and period resolve | ISSUED | Bytes frozen; hash written; the index row created; distribution per the document's channel | HR admin; payroll; system |
| DS3 | DRAFT | Discard before issue | Never distributed | *(gone)* | Nothing retained but the audit event | The generating role |
| DS4 | ISSUED | Acknowledgement or signature recorded | FR-CHR-151 | ACKNOWLEDGED | The acknowledgement record is linked; the reminder chain stops | Employee; the recording role |
| DS5 | ISSUED or ACKNOWLEDGED | A later version is issued for the same subject and period | The later version reaches ISSUED first | SUPERSEDED | Kept with its own manifest and clock; the index shows both and their order | System |
| DS6 | ISSUED, ACKNOWLEDGED or SUPERSEDED | A statutory retention clock applies | The class has a clock (FR-CHR-066) | RETENTION_HELD | Erasure requests are deferred with the instrument named | System |
| DS7 | any non-disposed state | A legal hold is placed | The hold names its basis and its placer | LEGAL_HOLD | Every clock is suspended for this document | Tenant super-admin (place); compliance checker (**C** on release) |
| DS8 | LEGAL_HOLD | Hold released | Release is checked | RETENTION_HELD | Clocks resume; the release is audited | Compliance checker |
| DS9 | RETENTION_HELD | The longest applicable clock expires from the date of last entry | No legal hold; for a register, OSH r.76(2)'s bar is satisfied — it has been carried into a new register (EV-054) | ERASURE_ELIGIBLE | The document appears on the disposal queue with its basis | System |
| DS10 | ERASURE_ELIGIBLE | Disposal under the tenant policy | The policy is configured; the action is checked | TOMBSTONED | Content erased; the tombstone keeps id, class, dates, basis and actor; replay returns the tombstone (§07.2a) | Compliance checker |
| DS11 | RETENTION_HELD or LEGAL_HOLD | An erasure request from a data principal | — | unchanged | Refused with a reasoned deferral naming the governing instrument, logged and reported to the requester (FR-CHR-076) | — |
| DS12 | ISSUED or later | Any attempt to edit the bytes | — | unchanged | Refused and audited; a new version is the only route | — |

**The artefact catalogue — what this section generates, receives and indexes.** "State machine" means the full DS1–DS12 lifecycle applies; the two exceptions are named.

| Artefact | Trigger | Assembled from | Template family | Per-state form | Retention class |
| --- | --- | --- | --- | --- | --- |
| Appointment letter | Activation (ST3, ST4) | Employment terms, wage structure, work location, identifier status | Letters | Yes, where the establishment has ten or more workers (EV-057; FR-CHR-043) | `retention.letters` |
| Confirmation, transfer, promotion letters | ST-side lifecycle events (§07.3.2, §07.3.3) | The effective-dated event and its approvals | Letters | No | `retention.letters` |
| Relieving letter; experience or service certificate | ST19, per the exit-type matrix | Exit record, service dates | Letters | No | `retention.letters` |
| FnF statement | Exit settlement (§07.3.4) | The FnF head assembly and its TDS | Statements | No | `retention.letters` |
| Wage slip | Each wage period (FR-CHR-064) | The period's payroll result and the register it reconciles to | Statutory forms | Yes — Form V or FORM-XVI per §06.9, configurable per state (EV-053) | `retention.wage_slip` |
| Employee Register entry | Activation, and any change to a registered field | `person`, `employment`, `establishment_mapping`, the token store for field 24 (dark until §06 R24) | Statutory forms | Yes — Form I and its state equivalents (EV-053, EV-055) | Wages r.51(4): five years after the date of last entry (EV-054) |
| Attendance-cum-muster roll | Per period | §09's time model — per-day IN and OUT (EV-055) | Statutory forms | Yes — Form IX and its state equivalents | Five calendar years from the date of last entry (EV-054) |
| Wages, overtime, advances, fines and deductions register | Per wage period | §08's payroll result | Statutory forms | Yes — Form IV per §06.9 | As above |
| Leave-with-wages register | Per period | §09's leave ledger | Statutory forms | Yes | As above |
| Women employees register | Per period | `person`, `employment` | Statutory forms | Yes — Form XXII (EV-053); the "in ink" conflict with the electronic permission is a counsel question (§23) | SS r.53(1)(e): five calendar years from the date of last entry |
| Accidents and dangerous occurrences register | On an event recorded outside this section | Not fed by the master; the index carries the register, its clock and its gap log | Statutory forms | Yes — FORM-XIX per §06.9 | Five calendar years from the date of last entry |
| Consent notices, grants and withdrawal records | §07.1.5 | The template registry and the consent record | Notices | No; language per the roster | `retention.consent_evidence` |
| Exclusion notices to the employee and the operator | EX2, EX6 (§07.1.7) | The exclusion record | Notices | No | With the exclusion record (§07.7b) |
| Nomination forms | FR-CHR-044 | `nomination`, per scheme version | Statutory forms | Per scheme version, from `epf.form_catalogue` | Until superseded or settled (§07.4) |
| **Form 130 (ex-Form 16)** | Received from TRACES | **Not generated** — stored exactly as downloaded (EV-048) | — | — | `retention.form_130`; DS5 never applies, a replacement is a certified duplicate generated on TRACES |
| **Filing artefacts — ECR, ESI and PT files** | §08 generators | Out of this section; indexed here with their manifests so an inspection query is complete | — | — | Per §14 and §08 |

**The register assembly source map (FR-CHR-150).** Column schemas are §06.9's; this is where each register's *rows* and *facts* come from inside the master, and what a missing input does.

| Register | Row grain and cadence | Rows come from | Facts come from | Gap condition and reason code | Clock starts |
| --- | --- | --- | --- | --- | --- |
| Employee Register | One row per employment; regenerated on change | Every employment with a live or past mapping to the establishment | `person` identity, `employment` terms, `establishment_mapping`, nominations, the Aadhaar token state | A field with no value is empty with a reason code — `PAN_MISSING`, `UAN_PENDING`, or for field 24 the token state RESOLVE_TOKEN returns, which is `none` for most employees and which is dark in any case until §06 R24 | The register's last entry (EV-054) |
| Attendance-cum-muster roll | One row per employee per day, per period | The establishment's mapped employments for the period, by status (§07.3.5) | §09's per-day IN and OUT (EV-055) | A day with no punch and no leave or holiday classification carries the `DayStatus` §09 assigns and never a blank | The period's last entry |
| Wages, overtime, advances, fines and deductions register | One row per employee per wage period | The period's payroll population | §08's result for the period, at the locked snapshot | A period not yet locked cannot be committed to the register; a draft view is labelled as such | The period's last entry |
| Leave-with-wages register | One row per employee per period | As above | §09's leave ledger | An unmigrated opening balance shows as a reason code, never as zero | The period's last entry |
| Women employees register | One row per employee per period, for the population the form defines | Mapped employments, filtered as §06.9's form requires | `person`, `employment` | Where the form's population definition for a state is unverified, the register is marked non-fileable rather than generated on a guess | The period's last entry |
| Accidents and dangerous occurrences register | One row per event | Outside this section | Outside this section | The register is indexed and clocked even when empty, so its absence is visible | The register's last entry |

**The acknowledgement record (FR-CHR-151).**

| Field | Rule |
| --- | --- |
| `document_id`, `version` | The exact version acknowledged; an acknowledgement never carries forward to a later version |
| `subject_ref`, `actor` | Normally the same person; where they differ — a nominee, a guardian — the basis is recorded |
| `method` | In-app acknowledgement, wet signature scanned and attached, or an eSign route where the provider authenticates (§16.9) |
| `evidence_ref` | The provider's response or the attached artefact, stored as received |
| `acknowledged_at`, `channel` | NTP-synced time and the channel it arrived on |
| `reminder_history` | Each reminder sent under `document.acknowledgement_reminder_days`, with its channel and outcome |
| Never recorded | Any assertion about legal validity, any inference of acknowledgement from silence, any Aadhaar number (FR-CHR-099) |

**Worked example — reissuing a 2026 appointment letter in 2029.** Meena joined a Maharashtra establishment of forty workers on 1 July 2026, so her appointment letter was issued in the state-prescribed form configured at that date (FR-CHR-043). In 2029 she asks for a copy. The product does not re-run today's template: it reads the manifest, resolves `template_version` and `form_state_config` as at 1 July 2026, replays the assembly against the master state at `master_read_at`, and compares the `content_hash`. A match returns the original bytes. A mismatch is a defect, not a new document — it means an input the manifest named has moved, and it is raised as such rather than papered over with a fresh letter. Had her name changed by deed in 2027, the letter would not have been rewritten: the 2026 letter stands as issued, the name succession is on the `person` (FR-CHR-106), and a document that needs the new name is a new document with its own manifest.

**Worked example — a retention clock that outlives an erasure request.** The attendance-cum-muster roll for September 2026 at the Pune establishment has a date of last entry of 30 September 2026, and the register class carries five calendar years from the date of last entry (EV-054). In March 2028 an exited employee asks for erasure of their attendance record. The request is refused as a **reasoned deferral** under DS11: the response names the instrument and the date the clock ends, records that the register row is retained and restricted rather than deleted, and is logged as a data-principal request with its outcome (FR-CHR-076). When the clock expires the register does not become disposable on its own — OSH r.76(2) bars destruction even after five years unless the register has been transferred into a new one (EV-054), so DS9's guard holds it in RETENTION_HELD until that condition is recorded. Only then does it reach ERASURE_ELIGIBLE, and disposal is a checked action whose tombstone is what any later replay returns. Nothing about this path is a product default that a tenant setting can shorten.

**Negative cases.**

| Attempt | Outcome |
| --- | --- |
| Regenerating an issued letter from today's template to "fix formatting" | Refused; DS12 allows only a new version, which carries its own manifest |
| A register generated with a blank cell where an identifier is missing | Refused by FR-CHR-150; the field is empty with a reason code and the gap log names it |
| A Form 130 regenerated by the product | No such path; it is TRACES-generated and stored as downloaded, and a replacement is a certified duplicate (EV-048) |
| Disposing of a register at the end of its clock without the OSH r.76(2) condition recorded | Refused by DS9's guard |
| A legal hold released by the person who placed it | Refused; release is a **C** cell (§07.6) |
| An export of the artefact index without manifests | Refused; FR-CHR-152 exports carry the manifest and hash per document |
| Marking a letter acknowledged because the reminder chain expired | Refused; silence is never acknowledgement (FR-CHR-151) |
| A support view rendering a stored Aadhaar document from a manifest reference | No such reference exists; Aadhaar documents live in the token store's own object space (FR-CHR-099) |

**Acceptance criteria (artefact assembly and documents).**
- No document reaches ISSUED without a complete manifest; a reproduction test replays the manifest and compares hashes, and a mismatch is raised as a defect rather than resolved by reissuing.
- A reissue of a historical artefact uses the template version and state form configuration in force at the original issue, not today's.
- After ISSUED, the bytes of a document never change; a correction is a new version, and both versions stay in the index with their order and manifests.
- A register row is never omitted for a missing input; the field is empty with a reason code, and the gap log names the field, the employment, the period and the readiness reason.
- Each register's retention clock runs from its own date of last entry, and a register whose clock has expired does not become disposable until OSH r.76(2)'s condition is recorded.
- An erasure request touching a document in RETENTION_HELD or LEGAL_HOLD is refused with a reasoned deferral that names the instrument, and the refusal is logged and returned to the requester.
- A legal hold suspends every clock on the document and is released only by a distinct checker.
- The artefact index answers, for an establishment and a period, what was issued, from what, by whom and in what state, and its export carries manifests and hashes.
- No acknowledgement is ever inferred from silence, and no acknowledgement record asserts legal validity.

**Test scenarios — artefact assembly and documents.**

| # | Given | When | Then |
| --- | --- | --- | --- |
| T-DC-1 | A letter issued under template v3 in 2026 and template v7 today | A reissue is requested | v3 is replayed; hashes match; the returned bytes are the original |
| T-DC-2 | A master value that has moved since issue in a way the manifest names | A reproduction test runs | The hash mismatch is raised as a defect naming the input; no new letter is silently issued |
| T-DC-3 | An employee with no PAN | The Employee Register is generated | The row exists with the PAN field empty, a reason code and a gap-log entry; the register is not blocked |
| T-DC-4 | A September muster roll with a last entry of 30 September 2026 | An erasure request arrives in March 2028 | Refused with a reasoned deferral naming the instrument and the clock's end; logged as a data-principal request |
| T-DC-5 | The same register after five calendar years, with no transfer into a new register recorded | The disposal queue runs | It stays in RETENTION_HELD; DS9's guard names the unmet condition |
| T-DC-6 | A document under legal hold | Its retention clock expires | Nothing changes; the clock is suspended until the hold is released by a distinct checker |
| T-DC-7 | An issued wage slip | An admin edits the underlying period and regenerates | A new version is issued; the original stays ISSUED-then-SUPERSEDED with its own manifest and hash |
| T-DC-8 | A Form 130 downloaded from TRACES | A user asks the product to regenerate it | Refused; a duplicate is obtained from TRACES and stored as received |
| T-DC-9 | An appointment letter unacknowledged past `document.acknowledgement_reminder_days` | The reminder chain ends | A task is raised; the document is not deemed acknowledged |
| T-DC-10 | An artefact index export for an establishment and Tax Year | Exported | Every document carries its manifest and hash; documents in TOMBSTONED state appear as tombstones with basis and actor |
| T-DC-11 | A state whose women-employees register population definition is unverified | Generation is attempted | The register is marked non-fileable with its reason; nothing is generated on a guess |
| T-DC-12 | A wage period not yet locked | Register commit is attempted | Refused; a draft view is available and labelled as such |

---

### 07.5 Employee Self-Service (ESS) & Manager Self-Service (MSS)

ESS/MSS is where deflection economics live: every self-served declaration, correction and approval is a support ticket and an admin action avoided, and the AI assistant sits on top of these surfaces (bundled, not monetised — §18). The India-specific weight is in **tax declarations, investment proofs and FBP**. These are *parity, not differentiation* (§21), and must be table-stakes-complete rather than clever. **[Reversed]** v0.3 said Zoho "ships this free". Both freemium players give away computation and charge for outputs, and Form 12BB/124 is among the paid outputs (EV-029). The differentiation is that ESS actions touching statutory fields route through maker-checker (§07.6), so self-service does not become a compliance hole.

#### 07.5.1 Employee Self-Service

| FR | Requirement | MoSCoW | Phase |
| --- | --- | --- | --- |
| **FR-CHR-070** | View and download **payslips and the TRACES-issued Form 130**; view CTC breakup and YTD earnings/deductions. | Must | v1 |
| **FR-CHR-071** | Submit a **tax regime election** (old vs new, per Tax Year) and a **Form 124 (ex-12BB) investment declaration** (EV-050); upload **investment proofs** and track verification status. The workflow must be complete, including HRA, s.80C/80D, home-loan interest and previous-employer income (1961-Act numbering — see the vocabulary note). The declaration and proof workflow is table stakes, and the freemium players charge for the Form 12BB/124 output (EV-029). **[Verified]** (Source: EV-029; EV-050; §21). | Must | v1 |
| **FR-CHR-072** | Submit **FBP / flexible-benefit declarations and reimbursement claims** with proof-of-spend. Reflect the 1 April 2026 meal (₹50 → ₹200 per meal) and gift/voucher (₹5,000 → ₹15,000 per tax year) thresholds as live config, carrying the **conditions as engine constraints** (K-19). The meal value is tax-free only for meals provided during working hours at office or factory premises, or for non-transferable vouchers usable only at eating outlets; a cash meal allowance is taxable. A wallet configured without those constraints makes the perquisite taxable: payslips under-deduct, and the demand plus interest lands on the employer (§11). **[Hypothesis]** thresholds are from professional secondary sources, not a gazette reading (research r2/02). The rule citation is routed to §20 validation (V-18) and is deliberately not stated here. The FBP data model is P1 and ships in R2, not R1 (§05.5 item 18; capability C-38, §05.20), so this surface is a Should; the K-19 constraints bind from the first release that exposes it. | Should (P1 — §05.5 item 18) | v1 |
| **FR-CHR-073** | **View/request updates to personal data**; corrections to statutory fields (bank, PAN, address feeding PT jurisdiction) create maker-checker requests (FR-CHR-084), not direct writes. | Must | v1 |
| **FR-CHR-074** | **Apply for leave, regularise attendance, view balances**, and view the attendance record (device punches surfaced via the ADMS/WDMS receiver — §09). | Must | v1 |
| **FR-CHR-075** | Update/maintain **nominees and dependants** (EPF, gratuity, ESI, insurance — form identifiers per FR-CHR-044), with re-nomination as a life event. | Should | v1 |
| **FR-CHR-076** | Provide **self-service data-principal requests**: access to a copy of held data, correction, erasure (subject to statutory retention, FR-CHR-060-exit), grievance and nomination. Each request is logged and tracked against a tenant-configured SLA, and every response carries a published data-protection contact. This is a **product capability built regardless of how the law resolves; statutory basis under counsel review** (§23). DPDP is not in force until on or about 13 May 2027 (EV-058). Chapter III holds exactly four rights: access (s.11), correction and erasure (s.12), grievance (s.13) and nomination (s.14) (EV-066). Whether ss.11–12 reach an employer relying on s.7(i) is a counsel question in both directions (Part D-1). **[Reversed]** v0.3 marked DPDP access, correction and erasure rights **[Verified]** as current law. | Should | v1 |
| **FR-CHR-077** | Access ESS via **mobile and WhatsApp**, respecting the WhatsApp constraint of 250 unique users per rolling 24h for a new business portfolio (worker-initiated, not employer-push) and the shared-device reality of frontline workers. **[Verified]** WhatsApp 250/24h new-portfolio limit (r2/04 finding 23); the shared-device frontline pattern is specified in §09. | Should | v1 |
| **FR-CHR-078** | Provide a **helpdesk / query surface** (the AI assistant's front door) for policy and payslip questions, with rules-first grounding — no statutory or monetary figure is ever model-generated (§12). | Should | v1 |

**The Form 124/FBP surface must be complete because it is table stakes (FR-CHR-071/072).** These are parity requirements (§21), so the bar is completeness, not cleverness. The surface covers: old-vs-new regime election per Tax Year, with the new regime as default (FR-CHR-017); HRA exemption with rent/landlord-PAN capture where rent exceeds `tax.hra_landlord_pan_threshold` (₹1,00,000 a year per a vendor declaration form — r3/02 finding 21); s.80C (with the ₹1,50,000 cap — §06.5), s.80D (self/parents, senior-citizen variants), s.24(b) home-loan interest, and s.80CCD(1B) NPS; previous-employer income via Form 122, ex-12B (FR-CHR-018); and proof-verification status that *gates the deduction treatment*. A declared-but-unproved deduction is treated as declared until the proof cut-off, then reversed if unproved, and the TDS engine must handle that at year-end. The deduction sections are 1961-Act numbering; the 80C and 80D limits are verified in §06.5, while the landlord-PAN rule's basis (Rule 26C) and the other caps are carried, not re-captured. The 2025-Act equivalents and any changed limits for Tax Year 2026-27 onward are routed to §20 (see the vocabulary note), and every limit is a rule parameter, never a constant.

**The helpdesk is rules-first; no statutory or monetary figure is ever model-generated (FR-CHR-078).** The ESS helpdesk is the AI assistant's front door (§12), and the PRD's hardest architectural rule applies here without exception: a wrong payroll or leave number is a legal problem, not a UX problem (§12). So the assistant *explains, routes and drafts* but never *computes* — a "what is my PF this month" answer is rendered from the deterministic engine's figure, not the model's arithmetic; a "how many casual leaves do I have" answer reads the leave balance, not a guess. The assistant may summarise policy and cite the register, but any figure it surfaces is a read from the system of record, attributed to its source. This is a design rule owned by §12 (rules-first, LLM-last), restated here only as the acceptance test for this surface.

**Acceptance criteria (ESS).**
- An employee changing their bank account through ESS creates a checker-gated request that re-triggers penny-drop verification; the account is not usable for payout until both checks pass.
- A helpdesk answer that includes any statutory or monetary figure (PF, leave balance, PT, net pay) sources that figure from the deterministic engine/system of record, never from model arithmetic, and attributes it.
- A tax-regime election and Form 124 (ex-12BB) declaration submitted through ESS flow to TDS computation for the correct Tax Year. A deduction declared but unproved by the proof cut-off is reversed in the year-end TDS true-up and reflected in the Form 138 data behind Form 130.
- The FBP surface reflects the 1 April 2026 meal and gift thresholds as config, so a prior-year claim uses the prior threshold and a current-year claim the new one. A meal component whose delivery mode fails the conditions (cash allowance, transferable voucher, outside working hours or premises) is treated as taxable, never exempt.
- A data-principal access request returns a machine-readable copy of the employee's held data within the tenant's configured SLA. An erasure request inside statutory retention is deferred with the governing basis and logged.

#### 07.5.2 Manager Self-Service

| FR | Requirement | MoSCoW | Phase |
| --- | --- | --- | --- |
| **FR-CHR-079** | **Approvals inbox**: leave, attendance regularisation, reimbursements, personal-data changes, transfers — with mobile approval and delegation. | Must | v1 |
| **FR-CHR-080** | **Team view**: reportees' profiles (role-scoped, statutory identifiers masked), leave calendar, attendance exceptions, and effective-dated org snapshot. | Must | v1 |
| **FR-CHR-081** | **Initiate lifecycle actions** within authority: confirmation, transfer, CTC revision proposal, exit initiation — each entering the appropriate approval and maker-checker workflow rather than writing directly. | Should | v1 |
| **FR-CHR-082** | **Manager analytics**: team attrition, attendance trends, pending approvals SLA; the HR-analyst copilot per admin seat is a separately metered SKU (§18). | Could | v2 |

**MSS is initiate-and-approve, never write-through — and that is the whole point.** A manager is the most common source of a well-intentioned data corruption (fat-fingering a reportee's bank or a CTC), so MSS deliberately never writes statutory fields directly: it *proposes* (FR-CHR-081), and the proposal enters the same maker-checker and effective-dating machinery as any other change (FR-CHR-084, 085). Delegation (FR-CHR-086) must preserve the four-eyes rule — a manager cannot delegate approval to the very person whose request they would then "approve," and a delegate inherits the delegator's scope, not a wider one. Two edge cases the engine must handle: a **delegation that outlives the delegator's own authority** (manager transferred/exited mid-delegation) must lapse rather than orphan approvals; and an **approval initiated by a manager who is themselves the subject** (self-service on their own record) routes to *their* manager, never to their own inbox.

**Acceptance criteria (MSS).**
- A manager's team view masks Aadhaar/PAN/bank and never exposes reportees outside their authority scope.
- A manager-initiated CTC revision does not take effect until it clears approval and (as a statutory-impacting change) maker-checker (FR-CHR-084).
- A manager can approve a leave request on mobile and delegate the inbox during planned absence without approvals stalling (FR-CHR-086).
- A delegate inherits only the delegator's scope; a delegation lapses (does not orphan approvals) when the delegator's own authority ends; and a change to a manager's own record routes to their manager, never to their own inbox.

---

### 07.6 Workflows & Approvals

Approvals are a horizontal capability every module reuses, but two India-specific requirements make them more than a generic engine: **(a) maker-checker on statutory-impacting fields** (a control auditors and regulated buyers expect), and **(b) effective-dated application** so an approval that lands late still takes effect from the correct date and drives retro correctly. The engine must also degrade gracefully under the notification constraints of the Indian frontline (WhatsApp limits, shared devices).

| FR | Requirement | MoSCoW | Phase |
| --- | --- | --- | --- |
| **FR-CHR-083** | Provide a **configurable approval-workflow engine**: sequential and parallel chains, conditional routing (by amount, grade, establishment, change type), and per-tenant configuration without code changes. | Must | v1 |
| **FR-CHR-084** | Enforce **maker-checker (four-eyes)** on statutory-impacting changes — PAN, UAN, ESI IP, the Aadhaar token, bank, DOB, DOJ, wage components, eligibility flags — such that the maker cannot self-approve and both identities are audited. | Must | v1 |
| **FR-CHR-085** | Apply approved changes as **effective-dated events**, so a late approval still takes effect from the intended date and triggers retro/arrears where the date is in a closed period (FR-CHR-051). | Must | v1 |
| **FR-CHR-086** | Support **delegation of authority** (planned and out-of-office), **escalation on SLA breach**, and reassignment, so approvals do not stall on an absent approver. | Must | v1 |
| **FR-CHR-087** | Provide **bulk approvals** and bulk lifecycle actions (bulk confirmation, bulk transfer, bulk letter issuance) with per-item validation and a partial-success report. | Should | v1 |
| **FR-CHR-088** | Multi-channel **notifications** (in-app, email, mobile push, WhatsApp) respecting the 250/24h new-portfolio limit and worker-initiated constraint; fall back gracefully when a channel is rate-limited. **[Verified]** WhatsApp limits (r2/04 finding 23; §09). | Should | v1 |
| **FR-CHR-089** | Maintain a **complete, immutable audit trail** for every workflow: who requested, who approved/rejected, when (NTP-synced timestamp), before/after values, and the effective date — retained ≥180 days in-jurisdiction per CERT-In, and longer where statutory retention applies. **[Verified]** CERT-In 180-day in-jurisdiction log retention + NTP sync (EV-062). | Must | v1 |
| **FR-CHR-090** | Provide **role-based and field-level access control**, scoped by establishment and management hierarchy, so a multi-establishment tenant's HR admin sees only their establishments and statutory identifiers are masked by default. | Must | v1 |
| **FR-CHR-091** | Provide a **CA-facing approval/console** surface (read-only audit access, per-client compliance calendar, one-click Form 138/PT export) — shipped thin in v1 as the biggest unvalidated GTM bet (§18; validated via §20 V-05), productised in v2. **[Hypothesis]** "design for the CA as a user" — no CA has been interviewed; **kill/validate:** via §20 (V-05, 20–30 CA interviews); if CAs read the console as disintermediation, invert the design (Source: §18 CA channel, §20 V-05). | Should (thin) | v1 → v2 |
| **FR-CHR-092** | Enterprise identity: **SSO / SCIM provisioning** and richer role model, deferred until the ~1,000-seat bands where procurement expects it. | Won't (v1) → Must (v2) | v2 |
| **FR-CHR-105** | **Enforce the permissions matrix** (roles × objects × actions, below) server-side on every read and write, intersected with the role's scope (FR-CHR-090), including every export, report, API call and AI-assistant read (§12). The maker-checker points in the matrix withhold effect until a distinct checker approves (FR-CHR-084). Tenants may narrow the matrix but may not widen it past four floors: no role sees more than the last four Aadhaar digits; no person holds both make and check on the same change instance; the gated objects cannot lose their checker; and a change to roles, scopes or approval chains is itself maker-checked, so a super-admin cannot grant themselves checker power. | Must | v1 |

**Maker-checker is the control a regulated buyer and a CA both look for.** The gated field set (FR-CHR-084) is exactly the set whose corruption causes a rejected or mis-remitted filing. The rule is absolute: the maker cannot be the checker; both identities and the before/after are audited; and the change is not merely logged after the fact but *withheld from effect* until the checker approves. A bank-account change that takes effect and then awaits review is a fraud vector; the product blocks the effect, not just records the review.

**RBAC role × scope model (FR-CHR-090) — masking is the default, not a setting.** Access is the intersection of a *role* and a *scope* (establishment(s) + management sub-tree), and statutory identifiers are masked unless the role carries an explicit, audited unmask capability. Indicative baseline:

| Role | Scope | Statutory identifiers | Can approve statutory changes | Notes |
| --- | --- | --- | --- | --- |
| Employee | Self | Own, unmasked to self only — except Aadhaar, last four digits only (FR-CHR-099) | No | ESS surface (§07.5.1) |
| Manager | Reportee sub-tree | Masked | No (initiates only) | MSS surface (§07.5.2) |
| HR admin (establishment) | Assigned establishment(s) | Masked by default; unmask audited | Maker | Cannot see other establishments |
| Payroll/finance | Assigned establishment(s) | Unmask for payout/filing, audited | Checker | Penny-drop, ECR, challans |
| Compliance/checker | Tenant or establishment | Unmask audited | Checker (four-eyes, FR-CHR-084) | Maker≠checker enforced |
| CA (external) | Assigned client(s) | Masked, read-only | No | Thin console FR-CHR-091 |
| Tenant super-admin | Tenant | Config only; PII access audited | Config | Cannot silently self-approve statutory edits |

"Unmask" never applies to Aadhaar: no role sees more than the last four digits, and a full-value read is an audited KYC action on the token store, not a display permission (FR-CHR-099). A tenant with three establishments must be configurable so an establishment HR admin sees only their own establishment's records and never another establishment's PAN/UAN/bank — asserted in the acceptance criteria below.

**Permissions matrix — roles × objects × actions, with the maker-checker points (FR-CHR-105).** The role × scope table says *whose* records a role reaches; this matrix says *what it may do* to each object. Codes: **V** view (masked by default), **U** unmask (audited, purpose recorded), **P** propose/make, **C** check/approve (four-eyes, never the maker of the same instance), **X** export, **—** no access. A cell with **C** is a maker-checker point: the change is withheld from effect until a distinct checker approves. The baseline is the product default; tenants may narrow it within FR-CHR-105's floors.

| Object | Employee (self) | Manager | HR admin (est.) | Payroll / finance | Compliance checker | CA (external) | Tenant super-admin | Vendor operator (§22) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Statutory identifiers — PAN, UAN(s), IP, DOB, DOJ, names as per PAN/UAN | V · P (via ESS) | — | V · P | V · U · P | V · U · **C** | V (masked) | — | V for the filing in hand, audited |
| Aadhaar (token store) | Last four · enter after consent · withdraw | — | Last four | Last four | Last four; audited full-value KYC read on a recorded purpose | — | — | — |
| Bank account and disbursal instruction | V · P (re-runs penny-drop) | — | V (masked) · P | U for payout · P | **C** | — | — | — |
| Wage structure and component tags | V own CTC/payslip | P (revision proposal) | P | P | **C** | V | — | — |
| Eligibility (derived) | V own | — | V | V · recompute | V · recompute | V | — | V |
| Establishment mapping (statutory transfer) | V own | P (initiate) | P | P | **C** | V | — | — |
| Org assignment (department, manager, grade) | V own | P | P · approve per workflow | — | — | — | — | — |
| Establishment and entity registrations (EPFO/ESIC codes, PTRC, PTEC, LWF, LIN, TAN) | — | — | P (own establishment) | P | **C** | V | P (entity level) | V |
| Consent records | V own · grant · withdraw | — | V status · P (attach imported evidence) | V status | V · **C** (imported evidence) | — | — | — |
| Documents, letters and registers | V own · acknowledge | V reportees' letters per policy | V · generate | V · generate | V · X | V · X (registers, exports) | — | V for the filing in hand |
| Tenant policies and tenant-set parameters (e.g., encashment divisor, `non_bank_disbursal_mode`, `epf.iw_wage_basis`, a transfer-month decision) | — | — | P | P | **C** | — | P | — |
| Gratuity forfeiture; a 4y240d eligibility confirmation | — | — | P | P | **C** | — | — | — |
| Audit log | V own events | — | V (own establishments) | V | V · X | V · X (read-only) | V · X | — |
| Erasure requests, retention and legal hold | Raise a request | — | V | — | Decide · **C** on legal-hold release | — | P (legal hold) | — |
| Roles, scopes and approval chains | — | — | — | — | **C** | — | P | — |

Four rules sit under the matrix. (1) **Derived facts have no make action.** Nobody edits an `eligibility` range; the only action is recompute, and a disagreement is fixed at its input (§07.2a). (2) **Statutory rule values are not tenant objects.** Slabs, rates and thresholds are authored and two-person-reviewed in the compliance data pipeline (§22) and published as rule versions; a tenant sets only the options the rule object exposes. (3) **A person holding two roles is resolved per instance.** A payroll user who made a change cannot also check it, even if they hold the compliance role. (4) **The vendor operator acts only for an attended filing, under the customer's written authority to act (§22).** It never holds make or check on master data. The attended-filing path ships disabled per tenant until counsel clears the Part D-17 questions (§23).

**Escalation and SLA are part of the control, not a convenience (FR-CHR-086).** A maker-checker gate that stalls on an absent checker is a compliance risk near a filing deadline, so the engine carries a per-change-type SLA and an escalation ladder: on breach it reassigns to a configured backup checker (never back to the maker), and it raises the pending item on the pre-filing readiness report (FR-CHR-097) when the effective date falls in an imminent filing window. Escalation never relaxes the four-eyes rule — it finds a *different* second person, it does not auto-approve. The audit log records the escalation event and the substitute checker's identity.

**Graceful degradation under Indian frontline constraints.** Because a new WhatsApp business portfolio can reach only 250 unique users/24h and frontline devices are shared (§09), the notification layer (FR-CHR-088) must (a) never assume employer-push reachability, (b) fall back to in-app/SMS/email when WhatsApp is rate-limited, and (c) never silently drop an approval notification — an undelivered notice becomes an in-app task that persists.

**Acceptance criteria (workflows).**
- A bank-account or wage change cannot be approved by its own maker; the attempt is blocked and logged; the change applies only after a distinct checker approves.
- An approval delivered 10 days after the effective date applies from the effective date and, if that date is in a filed period, spawns a retro computation against the historical rule version.
- Every approval decision produces an audit record with actor, NTP-synced timestamp, before/after, and effective date; the record is immutable and retained per policy (≥180 days in-jurisdiction, longer where statutory).
- A tenant with three establishments can be configured so an establishment-level HR admin approves only within their establishment and cannot view other establishments' statutory identifiers.
- When WhatsApp is rate-limited for a batch of 500 workers, notifications degrade to alternate channels and no approval is silently dropped.
- A bulk transfer of 200 employees produces a partial-success report identifying each failed item with a machine-actionable reason, and does not roll back the successful items.
- For every **C** cell in the permissions matrix, a test proposes a change as one user and attempts approval as the same user, then as a user holding both the maker's and the checker's roles: both attempts are refused and logged, and the change stays without effect until a third, distinct checker approves (FR-CHR-105).
- A tenant super-admin who edits roles or approval chains cannot activate the edit without a compliance checker; a configuration that would widen the matrix past FR-CHR-105's floors is rejected at save, naming the floor it breaks.
- An export, report, API call or assistant answer returns only what the caller's matrix cell and scope allow; a manager's assistant query about a reportee's bank account returns a refusal, not a masked value (§12).

---

### 07.6a Maker-checker change requests — lifecycle, catalogue, boundaries, scope and unmasking

The permissions matrix says where the **C** cells are, and FR-CHR-084 says the maker cannot check. This subsection specifies the object a gated change travels in and the states it moves through; the catalogue of gated change types; what a pending change does at a payroll or filing boundary; how scope follows an employee through transfers, rehires and exits; how an unmask is recorded; how a small tenant keeps four eyes; and how the roles here map to the names §17 and §14 use. It adds matrix rows for the objects §07.1.1a to §07.1.7 introduce, and for lifecycle actions and self-service edits.

| FR | Requirement | MoSCoW | Phase |
| --- | --- | --- | --- |
| **FR-CHR-128** | **A gated change is a change request with a lifecycle.** Every change to an object with a **C** cell travels as a `change_request` (fields below) through the states in the transition table. The object's value does not change until the request is EFFECTIVE, a request cannot be approved on a stale base, and every transition is an audit event (FR-CHR-089). A bulk action is one request per item under a batch header (FR-CHR-087); approving a batch approves each item separately, and each item's guards are checked at approval. | Must | v1 |
| **FR-CHR-129** | **Gated change types are a catalogue, and every scope keeps four eyes.** Each change type names its makers, checkers, external verification, evidence and pending behaviour (catalogue below), and its SLA `change_request.sla_hours.<change_type>` — tenant-set, and read by the FR-CHR-086 escalation. For every change type and scope there must be two distinct humans, one able to make and one able to check. Where there are not — including a change to the only checker's own record — the product shows `FOUR_EYES_GAP` on the setup checklist and the readiness report, and requests of that type wait. They never auto-approve and never fall to the vendor operator. §08 FR-PAY-304's single-person policy exception covers run approval only and never reaches these cells (§03.1 rule 1). | Must | v1 |
| **FR-CHR-130** | **A pending change never alters a run, a file or a filing.** At every payroll and filing boundary the value in force is the last EFFECTIVE one. Pending requests dated into the open month are listed on the pre-payroll checklist (§08 FR-PAY-301 M2). Once effective, a change dated into a LOCKED month spawns a correction run as a diff (FR-CHR-085). The boundary table below fixes each case. | Must | v1 |
| **FR-CHR-131** | **Unmasking is an event, never a setting.** Each masked field has a default display and an unmask rule (masking catalogue below). An unmask names a purpose from a governed list, covers one record and one session, and writes an event (fields below) that NFR-SEC-204's detection reads. There is no bulk unmask and no unmask in an export — a statutory artefact carries the values its format requires as a generated artefact, not as a display. Aadhaar is never unmasked; FR-CHR-112 is a separate operation. | Must | v1 |
| **FR-CHR-132** | **Scope follows the employment's periods, and every caller resolves to a column.** An HR admin's scope over a person is the set of periods in which the employment was mapped to one of their establishments (scope table below). API tokens act with the column of the human or service account they were issued to; the AI assistant acts with its caller's column and scope (FR-CHR-105; §12); a caller that resolves to no column is refused. The role crosswalk below maps these columns to §17 NFR-SEC-202's roles and §14.5.1's. | Should | v1 |

**The change request (FR-CHR-128).**

| Field | Type | Rule |
| --- | --- | --- |
| `cr_id` | Identifier | Immutable |
| `batch_id` | Identifier | Set for an item of a bulk action (FR-CHR-087) |
| `change_type` | Catalogue code (FR-CHR-129) | Decides the checker set, the SLA and the side effects |
| `object_ref` | Object type and id | One object per request |
| `identifier_change_kind` | `correction`, `succession`, `addition` or `retirement` | Required for statutory identifiers (FR-CHR-106) |
| `before`, `after` | Values | Masked in every view per FR-CHR-131; an Aadhaar change carries the token and a store operation id, never digits |
| `effective_from` | Date, valid time | Required; may fall in a LOCKED month, in which case a correction run follows approval (FR-CHR-085) |
| `reason_code`, `reason` | Code and text | Required |
| `evidence_refs` | Documents | Required where the catalogue says so |
| `maker_id`, `maker_role`, `made_at` | Actor, role, NTP time | — |
| `subject_person_id` | Person | The person the change is about; used for the self-record rule |
| `base_version` | Version token | The object's version when drafted; approval is refused if it is stale |
| `impact` | Computed list | The periods and artefacts affected, by state (FR-CHR-109), recomputed at submission and at approval |
| `checker_id`, `decided_at`, `decision`, `decision_reason` | — | The checker is neither the maker nor the subject |
| `escalations` | List | Each reassignment with its time, reason and substitute checker (FR-CHR-086) |
| `verification_ref` | Reference | The external verification job, where the catalogue requires one |
| `status` | State | Per the transition table |

**The change-request lifecycle (FR-CHR-128).**

<!-- DIAGRAM: fr-core-hr-change-request-states -->

| # | From → To | Event | Guard | Side effect | Who may trigger |
| --- | --- | --- | --- | --- | --- |
| CR1 | *(none)* → DRAFT | The maker starts | The maker holds **P** on the object in scope (FR-CHR-105) | `base_version` captured | Maker |
| CR2 | DRAFT → CHECK_PENDING | Submit | The format dictionary passes (§07.1.1); the consent gate passes for an SPDI-set field (FR-CHR-114); `effective_from` set; the kind set for an identifier; evidence attached where required | `impact` computed; the checker queue notified; the SLA clock starts; `CHANGE_PENDING_CHECK` on the readiness report where the effective date falls in an open filing window | Maker |
| CR3 | DRAFT → DISCARDED | The maker discards | — | Nothing written to the object | Maker |
| CR4 | CHECK_PENDING → APPROVED | The checker approves | The checker holds **C** in scope; is neither the maker nor the subject; does not hold the maker's role on this instance; `base_version` is current | The effective-dated write and its audit event; a correction run where `effective_from` is in a LOCKED month (§08 FR-PAY-306) | Checker |
| CR5 | APPROVED → VERIFYING | The change type needs external verification | — | The verification job starts; the prior value stays effective | System |
| CR6 | VERIFYING → EFFECTIVE | Verification passes | — | The new value is usable from `effective_from` or from the verification time, whichever is later | System |
| CR7 | VERIFYING → VERIFICATION_FAILED | Verification fails | — | The maker and the subject are notified; the prior value stays effective | System |
| CR8 | APPROVED → EFFECTIVE | No external verification needed | — | — | System |
| CR9 | CHECK_PENDING → REJECTED | The checker rejects | A reason is recorded | The maker is notified | Checker |
| CR10 | CHECK_PENDING → WITHDRAWN | The maker withdraws | — | — | Maker |
| CR11 | CHECK_PENDING → CHECK_PENDING | The SLA is breached | A backup checker exists who is neither the maker nor the subject | Reassigned; escalation logged (FR-CHR-086) | System |
| CR12 | CHECK_PENDING → STALE | Another request on the same object became effective first | — | The checker cannot approve; the maker is told to rebase | System |
| CR13 | STALE → DRAFT | The maker rebases | — | A new `base_version`; the impact is recomputed | Maker |
| CR14 | any → unchanged | Approval by the maker, the subject, or anyone holding the maker's role on this instance | — | Refused with `ACC-SELF-CHECK` or `ACC-SUBJECT-CHECK`; audited | — |

**The catalogue of gated change types (FR-CHR-129).**

| Change type | Object | Makers | Checker | External verification | Evidence | While pending |
| --- | --- | --- | --- | --- | --- | --- |
| `ID.PAN`, `ID.UAN`, `ID.IP`, `ID.NAME_AS_PER`, `ID.DOB`, `ID.DOJ` | Statutory identifiers | Employee (ESS), HR admin, payroll | Compliance checker | The format mask; a corrected UAN's seeding restarts at `pending` | A document for a DOB or DOJ correction and for a name succession | The old value is used; `CHANGE_PENDING_CHECK` where the date is in an open window |
| `ID.UAN_ACTIVE` | Which declared UAN is `active_for_filing` (FR-CHR-107) | HR admin, payroll | Compliance checker | — | The member's evidence | The existing active UAN is used |
| `BANK.ACCOUNT` | Bank account and disbursal instruction | Employee, HR admin, payroll | Compliance checker | Penny-drop and name match (FR-CHR-006) | A live `BANK_DISBURSAL` grant | The last verified account is used (boundary table) |
| `WAGE.STRUCTURE`, `WAGE.TAGS` | Wage structure and component tags | Manager (proposal), HR admin, payroll | Compliance checker | Minimum-wage validation (FR-CHR-016a) | — | The current structure is used; a correction run follows approval |
| `ASSIGN.ESTABLISHMENT` | Establishment mapping | Manager (initiate), HR admin, payroll | Compliance checker | — | The transfer letter | The current mapping; the transfer-month rule once effective (FR-CHR-050-tr) |
| `REG.CODE` | Establishment and entity registrations | HR admin (own establishment), payroll, super-admin (entity level) | Compliance checker | The format dictionary (FR-CHR-022) | The registration certificate | Filings stay under the current code |
| `CONSENT.IMPORTED` | Imported consent evidence | HR admin | Compliance checker | — | The artefact (FR-CHR-121) | The status stays PENDING |
| `PERSON.MERGE`, `PERSON.UNMERGE` | Duplicate resolution (FR-CHR-108) | HR admin, payroll | Compliance checker | — | The review's evidence | Incoming identifiers held unactivated |
| `TENANT.PARAM` | Tenant policies and tenant-set parameters, including `aadhaar_exclusion.employee_share_timing` | HR admin, payroll, super-admin | Compliance checker | — | A reason | The current value |
| `GRATUITY.FORFEITURE`, `GRATUITY.4Y240D` | Gratuity | HR admin, payroll | Compliance checker | — | The reasoned basis (CoSS s.53(6); FR-CHR-016) | The FnF shows the claim unresolved |
| `AADHAAR.RETENTION_OVERRIDE` | A store entry | HR admin or compliance checker | A distinct compliance checker | — | Statutory basis and counsel reference (FR-CHR-113) | PURGE proceeds on its trigger |
| `HOLD.RELEASE` | A legal hold | Super-admin | Compliance checker | — | A reason | The hold stays |
| `ACCESS.ROLE` | Roles, scopes, approval chains and the unmask purpose list | Super-admin | Compliance checker | The FR-CHR-105 floors | — | The current roles apply |

**What the checker is shown before deciding — the impact preview.** A checker approves consequences, not field values, so each change type's `impact` shows what approval will set in motion.

| Change type | The preview shows |
| --- | --- |
| `ID.*` | Every artefact carrying the old value for a covered period, grouped by the FR-CHR-109 states, and the route each will take |
| `ID.UAN_ACTIVE` | The months whose ECR lines will change UAN, and any month already at PAYMENT_INITIATED, which cannot |
| `BANK.ACCOUNT` | The next unreleased disbursal the new account will receive, and whether the subject declared the old account unusable |
| `WAGE.STRUCTURE`, `WAGE.TAGS` | Each covered month's recomputed wage bases and the difference in employee and employer contributions and in TDS, from a dry run of the correction (§08 FR-PAY-306) |
| `ASSIGN.ESTABLISHMENT` | The statutory codes that re-point, the PT and LWF states before and after, and the transfer-month rule each state will apply (FR-CHR-050-tr) |
| `REG.CODE` | Every artefact generated under the old code, by state |
| `TENANT.PARAM` | The runs, filings or exclusions the new value will govern, and from which month |
| `GRATUITY.FORFEITURE`, `GRATUITY.4Y240D` | The gratuity computed with and without the decision, and the FnF clock |
| `PERSON.MERGE` | Both persons' employments, identifiers and the artefacts generated under the id to be retired |
| `ACCESS.ROLE` | The coverage panel after the change, and every scope where it closes or opens a four-eyes gap |

**Worked example — what the checker sees for a re-tag.** A payroll user proposes `WAGE.TAGS` to include a ₹3,000 special allowance in the PF wage from 1 July 2026, for an employee whose basic plus DA is ₹12,000. July and August are LOCKED and paid. The preview shows each month's PF wage moving from ₹12,000 to ₹15,000, so the employee share rises from ₹1,440 to ₹1,800 — ₹360 a month, ₹720 across the two months — and the employer share rises by the same total, split between EPS and EPF as §06.2 computes. It shows that both months' Regular returns are approved and paid, so the increase follows §06.2's rows 6–8 rather than a Revised return, and that September, still open, simply computes on the new tag. The checker approves the consequence, not just the tag.

**Who is told about a gated change.** The subject's notice is the cheapest fraud control in the product: a bank or identifier change the employee did not ask for is caught by the employee before it pays out.

| Recipient | When | Content | Never included |
| --- | --- | --- | --- |
| Maker | Submitted (CR2); decided (CR4, CR9); verification failed (CR7); stale (CR12) | The change type, the object with masked values, the status, and the reason on a rejection | Unmasked values |
| Checker | Queued (CR2) or reassigned to them (CR11) | The change type, the subject with masked identifiers, the effective date, the impact summary, the SLA remaining, the evidence | — |
| Subject, where the subject is not the maker | Submitted (CR2) and effective (CR6, CR8), for `BANK.ACCOUNT`, `ID.*` and nomination changes | That a change to their record was proposed or took effect, the field, the masked new value, and a "this was not me" action | The unmasked value |
| Approver and super-admin | `FOUR_EYES_GAP` raised; a detection signal fires | The gap or signal, the change type and the scope | — |

A nomination change shows why the subject is told. HR proposes to replace an employee's EPF and gratuity nominee on a form that the employee did not sign. The employee's notice arrives on their own channel before the checker acts, the employee taps "this was not me", and the change stays held — the kind of change that would otherwise be discovered only at a death-in-service settlement (FR-CHR-061), when it can no longer be undone.

"This was not me" holds the request in CHECK_PENDING with a flag the checker sees; approval then needs evidence from the maker, and the event feeds the detection signals below. After EFFECTIVE it opens a review and, for a bank account, flags the subject's next payout line before file generation (§08 AC-901.2).

**The checker's inbox.** One row per request awaiting the checker: change type, subject with masked identifiers, maker and role, effective date, impact — the periods and artefacts affected, by state — SLA remaining, evidence, and any "this was not me" flag. Rows are sorted by the nearest filing window the effective date touches, then by SLA. Actions are approve and reject with a reason; a comment changes no state. A request where the checker is the maker or the subject never appears in that checker's inbox.

**The four-eyes coverage panel.** One row per change type and scope, showing the eligible makers and eligible checkers by role and count, any gap, and the requests waiting on it. Assigning a role recomputes coverage at once. The panel is where a `FOUR_EYES_GAP` is closed — by a role assignment, itself an `ACCESS.ROLE` change request.

**Keeping four eyes in a small tenant (FR-CHR-129).** A 22-person tenant has one HR executive and a founder who handles finance. The HR executive holds HR admin and the founder holds the compliance-checker role, so every change type has a distinct maker and checker, and coverage passes. When the HR executive changes her own bank account, she is maker and subject, and the founder checks: allowed. When the founder changes his own bank account, the HR executive can make the request on his written instruction, but the only checker is the subject. The request waits under `FOUR_EYES_GAP` until the tenant designates a second checker, such as another director. It never auto-approves, never routes to our operator, and the founder's pay goes to his last verified account in the meantime.

**Pending changes at the boundaries (FR-CHR-130).**

| Pending change | At INPUTS_CLOSED (§08 M2) | At LOCKED and bank-file generation (§08 M8; FR-PAY-901) | At statutory generation (§08 FR-PAY-711) | Once it becomes effective |
| --- | --- | --- | --- | --- |
| Bank account | Listed on the pre-payroll checklist | The line carries the last verified account. Where the subject declared the old account unusable when proposing, the line is flagged before file generation (§08 AC-901.2) and paid once the new account is effective, or by `non_bank_disbursal_mode` on the approver's decision — never by holding the whole file | Not applicable | The next unreleased disbursal uses it |
| Wage structure or tags | Listed; the operator may wait or close inputs | The run uses the structure in the snapshot | Figures come from the locked snapshot | A correction run for every covered LOCKED month, as a diff |
| Statutory identifier | Listed | Not applicable | The generator reads the identifier in force for the period at generation; a pending value does not apply | The FR-CHR-109 artefact routes |
| Establishment mapping | Listed; the operator decides whether to close inputs | The snapshot's mapping | The snapshot's mapping | A correction run; the PT and LWF transfer-month rule (FR-CHR-050-tr) |
| Registration code | Listed | Not applicable | Generation for that establishment waits only where the change corrects a code already flagged non-fileable (§07.2 acceptance) | New attempts under the corrected code; filed ones are correction cases |

**Worked example — a bank change three days before payday.** Deepa earns a gross of ₹20,000 with basic plus DA of ₹12,000, so her month's PF is 12% of ₹12,000 = ₹1,440, her ESI is 0.75% of ₹20,000 = ₹150, and her net pay before PT and TDS is ₹18,410. On 26 September 2026 she proposes a new account in ESS and declares the old one closed (CR2). The compliance checker is on leave, and `change_request.sla_hours.BANK.ACCOUNT` passes on the 28th, so the request reassigns to the backup checker (CR11). September is LOCKED on the 28th and the bank file is generated: Deepa's line is flagged because she declared the old account unusable, and the other lines release. The backup checker approves on the 29th (CR4), penny-drop passes the same day (CR6), and her ₹18,410 is paid into the new account through the flagged-line route. Had she not declared the old account closed, she would have been paid into it on the 30th, and the new account would have applied from October.

**Scope across the lifecycle (FR-CHR-132).**

| Situation | HR admin of the earlier establishment | HR admin of the later establishment | Managers |
| --- | --- | --- | --- |
| Inter-establishment transfer effective on the 16th (Example B) | Period-scoped records — payslips, register entries, returns — up to the 15th; person-level identifiers, masked, for correcting those periods | Records from the 16th; person-level identifiers, masked | The earlier manager's access to current records ends on the effective date; their own past decisions stay visible in their audit history |
| Department change, same establishment | Unchanged | — | Moves to the new manager on the effective date |
| Exit | Read access for the retention classes of their establishment's records; changes only through change requests (FnF corrections, identifier corrections) | — | Ends on the date of exit |
| Rehire at a different establishment | The earlier employment's records only | The new employment's records | The new manager only |
| Concurrent employments in two entities (FR-CHR-018) | Their own employment only | Their own employment only | Their own employment only |
| Dotted-line reporting (FR-CHR-020) | — | — | The dotted-line manager sees what tenant policy grants — approvals and team views — never pay or identifiers unless policy allows, within FR-CHR-105's floors |
| An active delegation (FR-CHR-086) | — | — | The delegate holds the delegator's scope for the window only |
| A CA console user | Assigned client tenants only, read-only (§17 NFR-SEC-203) | — | — |

**Worked example — scope across a transfer.** Ravi moves from the Bengaluru establishment to the Mumbai one on 16 September (Example B). The Bengaluru HR admin keeps his payslips, register entries and PT return lines up to 15 September, because Karnataka's returns and Bengaluru's registers for those days are still hers to produce and correct; his PAN, UAN and IP number stay visible to her, masked, for that purpose. The Mumbai HR admin sees him from the 16th. A correction to his September PT, if the transfer-month rule splits the month, is proposed by whichever admin owns the period being corrected, and checked as usual.

**The delegation lifecycle (FR-CHR-086).** Delegation is a record, so a delegate's authority has a start, an end and a reason, and every approval under it is attributable.

| # | From → To | Event | Guard | Side effect | Who may trigger |
| --- | --- | --- | --- | --- | --- |
| DG1 | *(none)* → SCHEDULED | A delegation is created with a window and a scope | The delegate is a distinct human in the tenant; the scope is no wider than the delegator's | — | Delegator |
| DG2 | SCHEDULED → ACTIVE | The window starts | — | Items route to the delegate | System |
| DG3 | ACTIVE → ENDED | The window ends, or the delegator revokes it | — | Pending items return to the delegator, or go on to escalation if the delegator is still away | System; delegator |
| DG4 | ACTIVE → LAPSED | The delegator's own authority ends — transfer, exit or role change | — | Pending items re-route through escalation and are never orphaned (§07.5.2) | System |
| DG5 | ACTIVE → ACTIVE | An item arrives whose maker or subject is the delegate | — | That item skips the delegate and escalates (§03.1 RR6) | System |
| DG6 | any → unchanged | A delegation wider than the delegator's scope, or to the delegator themselves | — | Refused with `ACC-SCOPE` | — |

| Delegation field | Rule |
| --- | --- |
| `delegation_id` | Immutable |
| `delegator_id`, `delegate_id` | Two distinct humans in the tenant |
| `scope` | The change types and establishments delegated — a subset of the delegator's, checked at creation and again at each approval |
| `window_from`, `window_to` | NTP times; a delegation with no end is refused |
| `reason` | Planned absence, out of office, or other with text |
| `created_at`, `revoked_at`, `lapsed_at` | — |
| `status` | SCHEDULED, ACTIVE, ENDED or LAPSED |
| Decisions under it | Each carries `delegation_ref`, so an approval is attributable to the delegate acting for the delegator (the §03.6a sign-off artefact) |

**Matrix rows for lifecycle actions.** These extend the FR-CHR-105 matrix, in its codes. Run approval, FnF approval and bank-file release are §08's (FR-PAY-304, FR-PAY-904) and appear here only as pointers.

| Action | Employee (self) | Manager | HR admin (est.) | Payroll / finance | Compliance checker | CA (external) | Tenant super-admin | Vendor operator (§22) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Activate a joiner (FR-CHR-040) | — | — | P | P | — | — | — | — |
| Confirm, extend probation, or separate during probation (FR-CHR-046) | — | P (initiate) | P · approve per workflow | — | — | — | — | — |
| Management transfer or promotion (FR-CHR-049) | — | P (initiate) | P · approve per workflow | — | — | — | — | — |
| Statutory transfer (FR-CHR-050-tr) | — | P (initiate) | P | P | **C** | — | — | — |
| CTC revision (FR-CHR-051) | — | P (proposal) | P | P | **C** | — | — | — |
| Exit initiation and exit reason (FR-CHR-054) | P (resignation) | P (initiate) | P | P | — | — | — | — |
| Date-of-exit marking on the EPFO portal (FR-CHR-058) | — | — | P | P | — | — | — | Instruction-gated act, on the approver's instruction (§22 FR-OPS-004) |
| FnF computation and approval (FR-CHR-056) | V own statement | — | P | P (compute) | — | V | — | — |
| Nominations and dependants (FR-CHR-044, FR-CHR-075) | P (via ESS) | — | P (on the employee's written form) | — | **C** | — | — | — |
| Issue statutory letters and registers (FR-CHR-064, FR-CHR-065) | V own · acknowledge | V reportees' letters per policy | P (generate) | P (generate) | V · X | V · X | — | V for the filing in hand |

A nomination change is gated because it redirects a death-in-service settlement (FR-CHR-061), the kind of change whose corruption is discovered only when it can no longer be undone.

**Self-service edits — direct, or through a request (FR-CHR-073).**

| Field | Employee edits directly | Through a change request | Evidence | Why |
| --- | --- | --- | --- | --- |
| Display name, preferred language | Yes | — | — | No filing reads them |
| Emergency contact | Yes | — | — | No filing reads it |
| Personal e-mail and mobile (FR-CHR-009) | Yes, after verifying the new channel by a one-time code | — | — | It carries consent notices and data-principal responses, so it must reach the employee |
| Residential address | Yes | — | — | PT follows the work location, not the residence (FR-CHR-014) |
| Work location for a remote employee | — | `ASSIGN.ESTABLISHMENT` when the state changes | The employer's approval of the location | It fixes the PT and LWF state (§07.3.3) |
| PAN, UAN, ESI IP, names as per PAN and UAN, DOB | — | `ID.*` | As the catalogue says | Filing keys |
| Bank account | — | `BANK.ACCOUNT` | A live `BANK_DISBURSAL` grant | Fraud vector; penny-drop |
| Nominees and dependants | — | Nomination change | The signed nomination form per scheme version (`epf.form_catalogue`) | Redirects settlements |
| Tax regime election and Form 124 declarations | Yes, subject to FR-CHR-071's declaration and proof rules | — | Proofs, per FR-CHR-071 | Declarations, not master data; the TDS engine applies the proof rules |
| Aadhaar | Through the store only (FR-CHR-110) | — | A Regulation 5 grant | Never a master-data field |
| Consents | Grant, decline, withdraw (FR-CHR-115) | — | Written capture | The employee's own act |

**Matrix rows for the objects this section introduces.**

| Object | Employee (self) | Manager | HR admin (est.) | Payroll / finance | Compliance checker | CA (external) | Tenant super-admin | Vendor operator (§22) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Exclusion register (FR-CHR-124) | Own exclusion, through the notice | — | V · P (seeding evidence) | V · P (Supplementary) | V · **C** (seeding evidence) | V (masked) | — | V for the filing in hand |
| Duplicate reviews (FR-CHR-108) | — | — | V · P (resolution) | V · P | V · **C** | — | — | — |
| Change requests | V own requests and their status | V own proposals | V · P | V · P | V · **C** | V (read-only) | V | — |
| Migration load report (FR-CHR-119) | — | — | V | V | V | V (read-only) | V | — |
| Consent status board (FR-CHR-122) | — | — | V · P (resend, attach paper, propose evidence) | — | V · **C** (imported evidence) | — | — | — |
| Consent template registry (FR-CHR-117) | — | — | V | V | V | — | V | — |
| Token-store audit events and unmask events | — (an access request returns a summary, FR-CHR-076) | — | V (own establishments) | — | V · X | V · X (read-only) | V · X | — |
| Four-eyes coverage (FR-CHR-129) | — | — | V | V | V | — | V · P (assign roles) | — |

**The masking catalogue (FR-CHR-131).** Mask formats are `mask.<field>`, set by the Security lead and routed to §20.13 as an owner decision; a tenant may mask more, never less.

| Field | Default display | Unmask allowed to (purpose) | In exports and reports | Assistant |
| --- | --- | --- | --- | --- |
| Aadhaar number | Last four digits, to every role (FR-CHR-099) | No one; a reveal is a store operation (FR-CHR-112) | Last four digits or "not held" | Last four digits, to the owner only |
| PAN | `mask.pan` | Payroll/finance (`filing_prep`); compliance checker (`correction_review`) | Masked, except inside the Form 138 statement, whose format requires it | Masked; never to a manager |
| UAN, ESI IP number | `mask.uan`, `mask.esi_ip` | Payroll/finance (`filing_prep`); compliance checker (`correction_review`) | Masked, except inside the ECR and ESI uploads | Masked |
| Bank account number | `mask.bank_account` | Payroll/finance (`payout_file`); compliance checker (`correction_review`) | Masked, except inside the bank file (FR-PAY-901) | Refused to anyone but the account holder, who sees it masked |
| Date of birth; personal contact | Visible to the employee and to HR admins in scope | — | Per the report's column rules and scope | To the employee only |
| Salary and CTC | Within scope, as tenant policy grants (FR-CHR-080; §03.7 US-L04) | — | Within scope | Within scope |
| Disability status | The employee, and the HR admin who administers it; never a manager | Compliance checker (`correction_review`) | Never in a general report | To the employee only |
| Consent state; biometric election; whether Aadhaar was provided | The employee, and the HR admin who administers it | — | Only in the consent evidence export (FR-CHR-118) | To the employee only |
| Passport number | `mask.passport` | HR admin (`correction_review`), for International Workers in scope | Masked | To the employee only |
| PRAN | `mask.pran` | Payroll/finance (`filing_prep`) | Masked | Masked |

**The unmask event (FR-CHR-131).**

| Field | Rule |
| --- | --- |
| `unmask_id` | Append-only |
| `actor`, `role`, `scope` | The caller and the column and scope it acted with |
| `record_ref`, `field` | One record and one field per event |
| `purpose` | One of `payout_file`, `filing_prep`, `correction_review`, `employee_request`, `audit_response`; the list changes only as an `ACCESS.ROLE` change |
| `reason` | Free text, required for `correction_review` and `audit_response` |
| `linked_ref` | The change request, filing, task or data-principal request the unmask serves |
| `session_id` | The interactive session; an unmask never outlives it |
| `started_at`, `ended_at` | NTP time (EV-062) |
| `outcome` | `shown`, `refused` with its refusal code |

A reveal (FR-CHR-112) and an unmask run only in an interactive session that meets §17.2's authentication requirements — never through an API token, a scheduled job, a report subscription or the assistant.

**Detection signals over these logs.** NFR-SEC-204 requires access logging that can detect unauthorised access, not merely record it. These are the signals this section's objects feed. Every threshold is a named parameter set by the Security lead and routed to §20.13 as an owner decision; none has a shipped value.

| Signal | Computed from | Response |
| --- | --- | --- |
| Reveals with no portal keying | Store events with outcome `abandoned` per actor over `detect.window_days`, against `detect.abandoned_reveal_limit` | Alert to the tenant super-admin and our Security lead; the §17 incident path decides whether the six-hour CERT-In clock has started (EV-062) |
| Unmask volume far above the actor's own baseline | Unmask events per actor per day against `detect.unmask_baseline_multiple` times the actor's trailing average | Alert; the actor's next unmask needs a `reason` whatever the purpose |
| Approvals faster than a review can take | `decided_at − made_at` per change type against `detect.min_review_seconds.<change_type>` | Flag on the change request and in the approver's digest |
| One maker and one checker approving each other's bank changes | The share of `BANK.ACCOUNT` approvals held by a single maker–checker pair over `detect.window_days` | Alert to the tenant super-admin |
| A bank account changed and changed back | Successive `BANK.ACCOUNT` requests on one person inside `detect.bank_flipflop_days` | Alert; the second change needs evidence |
| A role granted and used at once | An `ACCESS.ROLE` approval followed by the grantee's first **C** decision inside `detect.window_days` | Flag in the super-admin's digest |

**Access refusal codes.** Every refusal from FR-CHR-105's enforcement, in any channel, carries one of these codes, so tests and support can reason about it.

| Code | Condition |
| --- | --- |
| `ACC-SCOPE` | The record lies outside the caller's scope, or a delegation is wider than the delegator's |
| `ACC-CELL` | The caller's column has no such action on the object |
| `ACC-SELF-CHECK` | The approver made the request, or holds the maker's role on this instance |
| `ACC-SUBJECT-CHECK` | The approver is the subject of the change |
| `ACC-STALE-BASE` | The request's `base_version` is no longer current |
| `ACC-FLOOR` | A configuration would breach one of FR-CHR-105's floors |
| `ACC-UNMASK-PURPOSE` | An unmask names no purpose, or a purpose the column may not use |
| `ACC-BULK-UNMASK` | More than one record or field in one unmask |
| `ACC-FOUR-EYES-GAP` | No distinct checker exists for the change type and scope |
| `ACC-VENDOR-MASTER` | The vendor operator attempted a make or check on master data |
| `ACC-NO-COLUMN` | The caller — a token, a service or the assistant — resolves to no column |
| `ACC-AADHAAR` | Any attempt to read the number outside FR-CHR-112 |

**The role crosswalk (FR-CHR-132).**

| Column here (§07) | §17 NFR-SEC-202 role | §14.5.1 role | Notes |
| --- | --- | --- | --- |
| Employee (self) | Employee | Employee (self-service) | — |
| Manager | Manager | — | — |
| HR admin (establishment) | HR-Admin | HR admin | Scope is the assigned establishments |
| Payroll / finance | Payroll-Admin | Payroll maker | — |
| Compliance checker | No single role; tenants usually give it to the person holding Payroll-Approver | Payroll checker / approver | The **C** cells here; §08 owns run approval. One person may hold both, with maker ≠ checker checked per instance |
| CA (external) | Auditor/CA-read-only | CA / bureau (console) | Read-only (NFR-SEC-203) |
| Tenant super-admin | Owner | — | Configuration; its role changes are checked |
| Vendor operator (§22) | — (our staff) | — | Attended sessions under written authority only; never a make or check on master data |
| — | — | Support | Masked views only; no store access; no statutory writes |
| — | — | Data-request handler | The FR-CHR-076 queue; reasoned responses only |

**The CA column, precisely.** A CA console user (FR-CHR-091) is scoped per client tenant, read-only (§17 NFR-SEC-203). They see statutory identifiers masked, never unmask, and see no Aadhaar digits, bank details, consent records, disability status or biometric election (the CA view in §03.4). They may export registers, the audit log and filing artefacts for their assigned clients, and every export is an audited event. Switching between clients is a new scope, and nothing from one client's session carries into another's.

**How the matrix itself changes.** A tenant narrows the matrix through an `ACCESS.ROLE` change request, checked, within the floors. The baseline matrix changes only through a product release. A release never widens a cell a tenant has narrowed: a baseline change that adds an action shows each tenant which narrowed cells it would have widened, and leaves them narrowed until the tenant decides. A baseline change that removes an action applies at once and is listed in the release notes to every tenant.

**The matrix conformance suite.** The matrix is data, so its tests are generated from it. For every column, object and action: an allowed action succeeds within scope and fails outside it with `ACC-SCOPE`; a disallowed action fails with `ACC-CELL`; and for every **C** cell, the maker, the subject and a holder of both roles are each refused before a third, distinct checker succeeds. The suite runs on every build and on every tenant configuration change, through every channel — screen, API, export, report and assistant — and a new object or action without generated tests fails the build.

**Edge cases.**

- **A bulk transfer of 200 employees** is 200 requests under one batch. The checker may approve the batch, but each item's guards run at approval, and items that fail return to the maker with their reasons; the successes stand (FR-CHR-087).
- **A checker who becomes the subject mid-review** — a request by another maker about the checker's own record, assigned to the checker by escalation — is refused at approval (CR14) and reassigned.
- **A change request whose maker leaves the tenant** stays valid; the maker's identity is recorded and the checker decides as usual. Withdrawal after exit is by the super-admin, recorded as such.
- **There is no break-glass for master data.** No role, including the super-admin and our staff, can write a gated field without a checker; incident response on the credential vault is §22's and never extends to master data.
- **An approval delivered after the month has been filed** applies from its effective date through a correction run (FR-CHR-085); the filed attempt is untouched.
- **The assistant drafting a change on a user's behalf** produces a DRAFT the user must submit as maker; the assistant is never a maker or a checker (§12).
- **A change to a person under a legal hold** proceeds as usual. A hold bars deletion (§14.4.12), not correction, and the correction is itself a new transaction-time layer, so the held state stays readable.
- **A checker whose role is revoked while requests sit in their inbox** cannot decide them: approval re-checks the column at decision time and refuses with `ACC-CELL`, and the requests re-route through escalation.

**Acceptance criteria (change requests, scope and unmasking).**
- Every change to an object with a **C** cell exists as a `change_request`, and its value changes only at EFFECTIVE.
- An approval on a stale `base_version` is refused with `ACC-STALE-BASE`, and a request superseded by another becomes STALE.
- The maker, the subject and any holder of the maker's role on the instance are refused as checker, in every channel.
- For every change type and scope, the coverage check finds two distinct eligible humans, or `FOUR_EYES_GAP` shows and requests of that type wait without auto-approval.
- A pending bank change never alters the file for the month; a flagged line is paid only once the new account is effective or by the approver's recorded decision.
- An HR admin sees a transferred employee's period-scoped records only for the periods mapped to their establishments.
- Every unmask names a purpose, covers one record and one field, ends with the session, and appears in the unmask log with its linked reference.
- No export contains an unmasked value except inside a statutory artefact whose format requires it.
- The conformance suite passes on every build and on every tenant configuration change.
- The checker sees the impact preview before deciding; for a wage change it shows each covered month's contribution difference.
- The subject is notified of every bank, identifier and nomination change they did not make, and "this was not me" holds the request.
- A CA user never unmasks and never sees Aadhaar digits, bank details, consent records, disability status or a biometric election.
- A baseline matrix release never widens a cell a tenant has narrowed.

**Test scenarios — change requests, scope and unmasking.**

| # | Given | When | Then |
| --- | --- | --- | --- |
| T-CR-1 | A PAN change submitted by the payroll user | The same user approves | Refused, `ACC-SELF-CHECK` |
| T-CR-2 | A request about the compliance checker's own UAN | The compliance checker approves | Refused, `ACC-SUBJECT-CHECK`; reassigned |
| T-CR-3 | Two wage-structure requests on one range | The first becomes effective | The second becomes STALE; its approval is refused, `ACC-STALE-BASE` |
| T-CR-4 | A bank change approved | Penny-drop fails | VERIFICATION_FAILED; the old account stays in use; maker and subject notified |
| T-CR-5 | A checker on leave with the SLA breached | The SLA passes | Reassigned to the backup, never to the maker; the escalation is logged |
| T-CR-6 | A tenant whose only checker changes his own bank account | The request is submitted | `FOUR_EYES_GAP` shows; the request waits; pay goes to the last verified account |
| T-CR-7 | A wage change effective in a LOCKED month | Approved | A correction run is created as a diff; the locked snapshot is unchanged |
| T-CR-8 | A statutory transfer effective on the 16th | The earlier establishment's HR admin opens the employee | Records to the 15th are visible; records from the 16th are not |
| T-CR-9 | A payroll user unmasking a UAN with purpose `filing_prep` | Done | Shown for the session; the event links the filing |
| T-CR-10 | An unmask request covering fifty records | Submitted | Refused, `ACC-BULK-UNMASK` |
| T-CR-11 | An export template with unmasked bank accounts | Saved | Validation fails; only the bank file carries full accounts |
| T-CR-12 | A delegation to a delegate who is later the subject of a pending item | The item arrives | It skips the delegate and escalates |
| T-CR-13 | A delegator who exits mid-delegation | Exit is recorded | The delegation LAPSES; pending items re-route; none is orphaned |
| T-CR-14 | Our operator attempting to edit a UAN during a session | Attempted | Refused, `ACC-VENDOR-MASTER` |
| T-CR-15 | A new object added to the matrix without generated tests | The build runs | The build fails |
| T-CR-16 | A nomination change proposed by HR on the employee's form | The same HR user approves | Refused; a compliance checker approves |
| T-CR-17 | An API token issued to a service account with no column | It calls a read endpoint | Refused, `ACC-NO-COLUMN` |
| T-CR-18 | A bank account changed and changed back within `detect.bank_flipflop_days` | The second request is submitted | The signal fires; the request requires evidence |
| T-CR-19 | A bank change proposed by HR for an employee | The employee taps "this was not me" | The request stays CHECK_PENDING with the flag; approval requires the maker's evidence |
| T-CR-20 | A compliance checker who made a request | They open the checker's inbox | The request is not listed there |
| T-CR-21 | A tenant with a `FOUR_EYES_GAP` on `BANK.ACCOUNT` | The super-admin assigns a second checker, approved as an `ACCESS.ROLE` change | Coverage recomputes; the waiting requests enter the new checker's inbox |
| T-CR-22 | A CA console user on a client's PAN | They request an unmask | Refused, `ACC-CELL` |
| T-CR-23 | A release that adds an export action to a cell a tenant has narrowed | The release deploys | The tenant's cell stays narrowed; the tenant is shown the difference |
| T-CR-24 | The re-tag of a ₹3,000 allowance into the PF wage from July, July and August paid | The checker opens the request | The preview shows ₹360 a month more employee share, ₹720 across the two months, and the §06.2 route for paid months |
| T-CR-25 | A bulk transfer batch of 200 where three items fail their guards at approval | The checker approves the batch | 197 items take effect; three return to the maker with reasons; nothing rolls back |

---

### 07.7 Cross-cutting data integrity, audit and privacy

These requirements are not a module; they are invariants that every FR above must honour. They are collected here so acceptance testing can assert them once, globally.

| FR | Requirement | MoSCoW | Phase |
| --- | --- | --- | --- |
| **FR-CHR-093** | **Effective-dating and bitemporal replay apply to the bitemporal entity classes**: rules, salary structures, assignments and statutory attributes (Part E-2; §07.2a; §14). Every read for a period uses the state in force for that period, and retro corrections recompute against historical rule and tagging versions, never today's. The erasable classes — punches, rendered documents, biometric templates, consent artefacts and Aadhaar token-store entries — are not bitemporal. They are erased by crypto-shredding or tombstone, and replay after erasure returns the tombstone, never a reconstruction. **[Reversed]** v0.3 made effective-dating "universal" (K-24). | Must | v1 |
| **FR-CHR-094** | **Immutable, exportable audit log** of all create/update/delete on master, lifecycle and workflow entities. It meets CERT-In's in-jurisdiction retention (EV-062) and **supports evidence production** for a regulated customer's audit and inspection requests. It does not discharge that customer's contractual audit, access and inspection obligations (K-21). | Must | v1 |
| **FR-CHR-095** | **Data-protection compliance by construction, against today's regime and the one commencing on or about 13 May 2027.** *Today:* the SPDI Rules 2011 require written consent before collecting sensitive personal data, including financial and biometric information (r.3, r.5(1)); restrict cross-border transfer (r.7); and name IS/ISO/IEC 27001 (r.8) (EV-060). IT Act s.43A compensation is live and uncapped (EV-061). CERT-In's six-hour reporting and 180-day in-India logs apply (EV-062). *From on or about 13 May 2027:* DPDP s.7(i) disapplies consent and notice for employment purposes only, and the s.8 duties continue (EV-058). DPDP has **no** sensitive category (s.2(t), EV-059), while the SPDI Rules **do** classify biometric and financial data as sensitive, and are live at least until s.44(2) omits IT Act s.43A (EV-060). Nothing is described as sensitive "under DPDP" (Part D-19). EV-058 is **[Verified — mirror]** for G.S.R. 843(E), and EV-060 carries a provenance caveat (no live copy on the issuing body's own host): pull both from the primary source before any customer-facing use, including the FR-CHR-100 notice templates (§02). Both consent regimes run concurrently across the switch (FR-CHR-100). Data-principal requests are serviced as a product capability, with statutory basis under counsel review (FR-CHR-076; Part D-1). Statutory retention defers erasure (FR-CHR-060-exit), and Aadhaar follows FR-CHR-099. Whether the SPDI Rules survive the omission of s.43A is a counsel question (Part D-12). **[Reversed]** v0.3 stated s.7(i) as current law (K-03). | Must | v1 |
| **FR-CHR-096** | **Residency-selectable storage and processing** per tenant, on the same provider-abstraction seam the model router uses (≥3 interchangeable backends) — wired minimally in v1, GA in later phases. Both "India mandates data localisation" and "India has no localisation requirement" are wrong (K-08); DPDP's negative list is empty and not in force. The live constraints are CERT-In's 180 days of ICT logs in India (EV-062), SPDI r.7's restriction on cross-border transfer of sensitive data (EV-060), and sectoral rules for regulated customers. SEBI's cloud framework requires data in India and applies the MeitY-empanelled rule to SaaS providers (EV-085). IRDAI's cyber-security guidelines impose no localisation; IRDAI localisation exists only for policy records (EV-086). RBI's outsourcing obligations are **materiality-gated, determined entity by entity, not turnover-gated** (EV-087), and whether an arrangement is material is the customer's determination (Part D-14). **[Verified]** (EV-060, EV-062, EV-085, EV-086); EV-087 is **[Verified — mirror]** — pull the RBI Directions from the primary source before customer use. **[Reversed]** v0.3 said "no turnover threshold" for regulated buyers (K-22). | Must (seam) | v1 |
| **FR-CHR-097** | **Data-quality / pre-filing readiness checks**: a standing report of records non-fileable for a stated reason (unseeded Aadhaar–UAN, unverified bank, missing PAN, DOB mismatch), surfaced continuously so rejections are caught before, not at, filing. | Must | v1 |
| **FR-CHR-098** | **Migration ingest** of master and lifecycle data from Tally (first within the P1 importer set — §05.5 item 17), Zoho Payroll, Kredily and Frappe, with opening balances, YTD, UAN/IP continuity and mid-year cutover integrity. Migration is a first-class product surface, not a services task. The named-source importers are P1; the universal Excel/CSV onboarding import with the YTD tie-out validator and the parallel-run month is P0 and ships in R1 (§05.5 item 32; tie-out criteria in §16.7), and it runs the same consent flow. Consent is never imported unless the source held it, and never synthesised; every migrated employee goes through the migration consent flow (FR-CHR-102; Part E-12). **[Hypothesis]** migration effort/quality bar is unvalidated; **kill/validate:** via §20 (V-02, Tally-partner interviews) — at ~5% payroll-module enablement Tally's payroll job is marginal and the Tally channel shrinks to accounting export, so the Tally payroll importer is deprioritised; at ~40% it becomes the dominant displacement target (§20 V-02; §16.2). | Should (P1 — §05.5 item 17; the migration consent flow, FR-CHR-102, stays Must) | v1 |

**The pre-filing readiness report (FR-CHR-097) is the product's core loop, not a health widget.** In a filing-first product the headline metric is filings completed on time (§19), and a filing rejects on a small set of record-level defects. The readiness report is a standing, continuously computed list of every employee blocking a given filing (ECR / ESI / PT / Form 138), each with a specific machine-actionable reason and a fix action. "Clean filing" means zero *unresolved* defects. An employee excluded and flagged under FR-CHR-101 counts as resolved by disposition, and is reported separately with the follow-up Supplementary return pending.

**Readiness-reason dictionary — the machine-actionable defect set.** Each reason maps to the filing(s) it blocks, the defect the government system would reject on, and a single fix action, so the report is a work queue rather than a dashboard. This is the acceptance contract for FR-CHR-097.

| Reason code | Blocks | Rejection at filing | Fix action |
| --- | --- | --- | --- |
| `AADHAAR_UAN_UNSEEDED` | ECR | EPFO receives contributions only for Aadhaar-seeded UANs (EPFO circular; r4/04 finding 8) | Exclude and flag, never block payroll; route the employee to UMANG self-service seeding; Supplementary return once seeded (FR-CHR-101) |
| `UAN_PENDING` | ECR | No UAN, so no line can be generated (UAN is ECR field 1 — EV-035) | Employee generates the UAN via UMANG face authentication; employer route only for IWs and citizens of Nepal and Bhutan (FR-CHR-041) |
| `PAN_MISSING` | Form 138, Form 130 | Form 138 line carries PAN-not-available; the `no_pan_tds_floor` parameter applies once set (2025-Act section and rate pending — §06.13) | Capture PAN or set `pan_status=not-available` (FR-CHR-002) |
| `PAN_NAME_MISMATCH` | Form 138/130 | TRACES name-match fails; the TRACES-generated Form 130 carries the defect | Reconcile name-as-per-PAN (FR-CHR-009a) |
| `DOB_MISMATCH_UAN` | UAN KYC (ECR impact unverified — §20) | DOB differs from the Aadhaar-seeded UAN record | Correct DOB via maker-checker (FR-CHR-008, 084), or the member corrects the UAN record |
| `BANK_UNVERIFIED` | Salary/FnF payout | Payout blocked (not a filing but gates disbursal) | Re-run penny-drop (FR-CHR-006) |
| `BANK_CONSENT_MISSING` | Salary/FnF payout | Bank details held without a written-consent record (SPDI r.5(1) — EV-060) | Capture written consent, or use the configured alternative disbursal mode (FR-CHR-006, FR-CHR-102) |
| `DOE_JOINT_DECLARATION_PENDING` | ECR (that member, later months) | Contributions after a wrongly recorded date of leaving are refused until it is corrected (EV-041) | Obtain the joint employer–employee declaration; blocking exception with an SLA (FR-CHR-058) |
| `ESI_IP_UNREGISTERED` | ESI challan | Contribution line fails | Register IP / track pending (FR-CHR-042) |
| `ESTABLISHMENT_UNMAPPED` | ECR/ESI/PT | Wrong or absent establishment scope | Map employment to establishment for the period (FR-CHR-021) |
| `WAGE_TAGGING_INCOMPLETE` | ECR, PT, TDS | Wrong wage base computed | Complete component statutory tagging (FR-CHR-011) |
| `PT_STATE_UNVERIFIED` | PT return | Slab unknown for state | Verify state slab or mark non-fileable (FR-CHR-014) |
| `MIN_WAGE_BELOW_FLOOR` | Wage register, bonus | Sub-floor wage exposure | Revise structure above floor (FR-CHR-016a) |
| `MULTIPLE_UAN_DECLARED` | ECR (that member) | A contribution against the wrong UAN is not credited where the member expects it | Confirm the `active_for_filing` UAN; record the member's EPFO-side resolution when it arrives (FR-CHR-104) |
| `PT_TRANSFER_MONTH_RULE_UNSET` | PT return (transfer month, both states) | Transfer-month treatment unknown for a state | Operator records the treatment for this month, or the state's `transfer_month_rule` is set from the V-09 dataset (FR-CHR-050-tr) |
| `NO_PAN_FLOOR_UNSET` | Form 138 | The higher-rate floor for a no-PAN employee has no confirmed 2025-Act value | Confirm `no_pan_tds_floor` via §06.13 / §20; until then the employee is flagged, never computed on a guessed rate (FR-CHR-002) |
| `MULTIPLE_IP_DECLARED` | ESI contribution (that member) | A contribution against an IP number other than the one to credit | Confirm the active IP number, maker-checked; the ESIC-side treatment is not captured (§07.1.1a) |
| `WRONG_UAN_FILED` | That member's affected months | A submitted or filed line credited a UAN other than the one to credit | Record the route per month; no filed attempt is edited (FR-CHR-107, MU6–MU7) |
| `CONCURRENT_PF_MEMBERSHIP` | ECR (that member, in each establishment) | Whether EPFO accepts concurrent contributions on one UAN is not captured | Operator review, recorded; not a block (§07.1.1a; §20 V-23) |
| `SHARED_ACCOUNT` | Salary/FnF payout (the newer person) | Two persons paid into one account | Record a joint-account exception with its approver, or correct the account (FR-CHR-108) |
| `PT_REGISTRATION_MISSING` | PT return for that state | The employee's work-location state has no PTRC on the mapped establishment | Obtain the registration (§22.4.5); the liability computes and shows meanwhile (§07.1.1a) |
| `CHANGE_PENDING_CHECK` | The filing whose window the effective date falls in | A gated change awaits its checker | The checker decides, or the SLA escalates to a backup (FR-CHR-128, FR-CHR-086) |
| `FOUR_EYES_GAP` | Every filing that a waiting change touches | No distinct checker exists for the change type and scope | Assign a second eligible person through an `ACCESS.ROLE` change (FR-CHR-129) |
| `ESI_CEILING_CHANGE_TIMING_UNSET` | ESI contribution (that member) | The month a ceiling change bites is not captured | Operator records the treatment, or `esi.ceiling_change_timing` is set (§07.1.5; §20 V-21) |

The report is computed per filing per period, so the same employee may be clean for PT but block the ECR; the count that defines "clean filing" is per-filing-per-establishment-per-period, not a single tenant number.

**Migration integrity (FR-CHR-098) — what a mid-year cutover must reconstruct.** A tenant switching in, say, October must carry: YTD gross, exemptions and TDS already deducted, so the Form 138 data the product prepares — and therefore the TRACES-generated Form 130 — is continuous; opening leave and gratuity-accrual balances; UAN/IP continuity, so no duplicate is accepted; investment declarations mid-cycle; and previous-in-year-employer income. It must **not** carry consent: consent cannot be backfilled, so the migration consent flow (FR-CHR-102) runs for every migrated employee. Migration is a wedge off Tally (§16.2), so it is a product surface with validation and a reconciliation report, not a one-off services engagement.

**Acceptance criteria (cross-cutting).**
- Any period recomputation (retro, arrears, correction) provably uses the rule, tagging and master state of that period for the bitemporal classes. A test that changes a rule today and re-runs a closed period returns the *original* result unless an explicit correction against the new rule is requested. A test that erases an erasable-class record and replays a period returns the tombstone for that record, not its content.
- The pre-filing readiness report lists every employee blocking an ECR/ESI/PT/Form 138 run with a specific machine-actionable reason, and the unresolved count reaches zero before a clean filing.
- A mid-year migration reconstructs YTD earnings, TDS already deducted, and UAN/IP continuity, so that the first in-system payslip and the Form 138 data for the Tax Year are correct and continuous with the prior system, and it produces a reconciliation report against the source that lists consent non-responders per purpose.
- Every create/update/delete on a master/lifecycle/workflow entity is captured in the immutable audit log with actor and NTP-synced timestamp, retained in-jurisdiction per CERT-In.

---

### 07.7a Worked examples — why the master's precision is load-bearing

The requirements above read as ordinary CRUD until you run the actual Indian computations they feed. These worked examples show *why* effective-dating, dual wage bases and establishment-scoping are P0 rather than polish. Figures are illustrative. The rules and thresholds are the statutory ones except where an example marks a value **[Hypothesis]**, legacy, or pending 2025-Act mapping.

#### Example A — ESI contribution-period stickiness (FR-CHR-013)

Priya joins on 1 April at gross ₹19,500/month (ESI-covered, ≤ ₹21,000). On 1 August her gross is revised to ₹23,000.

- A naïve system drops ESI from August because gross now exceeds ₹21,000. **This is wrong and produces a rejected/under-deducted filing.**
- The correct behaviour: the Apr–Sep contribution period is *running*, so coverage and contribution continue on the **revised** wage (₹23,000) through 30 September, and ESI stops only from 1 October — the start of the next contribution period. Employee contribution 0.75% and employer 3.25% (ESIC contribution page, rates unchanged since 01.07.2019 — r1/06 finding 22; §06.3) are computed on ₹23,000 for Aug and Sep, then zero from Oct.
- The corresponding **benefit period** (Jan–Jun of the following year for the Apr–Sep contribution period) means Priya retains ESI benefit entitlement even after contributions stop — so the master's effective-dated coverage history, not a live flag, is what answers a later benefit query.
- The master must therefore hold the eligibility as *derived and effective-dated* (covered Apr–Sep, not-covered from Oct), not as a static flag an admin flips in August. **[Verified]** contribution-period/benefit-period rule as ESIC publishes it (ESIC contribution page, r1/06 finding 26); ESIC's pages are written against the repealed ESI Act 1948, so re-citation under the Social Security (Central) Rules 2026 is routed to §20, and ESI periods after 22 November 2026 are fenced (§06.9).

#### Example B — Inter-state transfer, the PT transfer month (FR-CHR-050-tr, FR-CHR-014)

Ravi is mapped to the Bengaluru (Karnataka) establishment and transfers to the Mumbai (Maharashtra) establishment effective 16 September.

- PT is a *state* levy remitted against the *establishment's* state employer registration (PTRC), and the two establishments hold two different PTRCs (FR-CHR-022). September can therefore touch two states' PT computations for one employee.
- How September is treated is each state's `transfer_month_rule` (FR-CHR-050-tr). Candidate treatments are a split by days or by wages attributable to each state, or the whole month to one state. No research round captured either state's rule, so the parameter has no shipped default, and until both states' values are set the month is held for an operator decision, recorded with its actor.
- Where the rule splits the month, the two computations are independent state computations on each state's own slab table, not a pro-rata of one number. The slab tables differ in kind: Maharashtra tests monthly salary with a women's variant and a ₹300 February instalment, and Karnataka has its own threshold and February instalment (§06.4). The slab values live in §06.4's per-state parameters (`pt.<state>.slabs`) and are not restated here. **[Hypothesis]** the transfer-month rule for every state; **kill/validate:** capture it with each state's slab table in the V-09 dataset before v1 GA (§20).
- A system that keys PT off the employee's HQ or residence, or off a single company-level PT registration, remits to the wrong state and under/over-collects. This is precisely why FR-CHR-021 makes the statutory hierarchy first-class and separate from the management hierarchy.

#### Example C — Dual wage base and a back-dated revision (FR-CHR-011, FR-CHR-051)

Sunita's CTC is ₹50,000/month: Basic ₹18,000, HRA ₹9,000, Special Allowance ₹20,000, Conveyance ₹3,000. In November, HR back-dates a revision effective 1 August that raises Special Allowance to ₹26,000 (CTC ₹56,000).

- The **add-back check** (Code on Wages s.2(y) / CoSS s.2(88), 50% rule): excluded components (HRA + conveyance + part of allowances) must not exceed one-half of total remuneration, else the excess is deemed wages and added back to the PF/gratuity base. The revision changes this arithmetic, so the PF wage base for Aug–Oct may rise even though "Basic" did not.
- Because Aug–Oct are filed periods, the retro run must recompute PF, gratuity accrual and PT/TDS **against the wage-tagging and rule version in force in each of those months** (FR-CHR-093) and generate arrears, as a diff and never an overwrite of the originally filed ECR. On the PF side, liability on arrears dates from the disbursal date, not the wage month (Part E-9; §08). Arrears go through EPFO's separate arrear-return flow, whose file layout is unpublished and therefore fenced (EV-043); an approved return can never be cancelled (EV-036).
- This is the single hardest calculation in the build (§06) and it is *unbuildable* without the master storing component-level statutory tagging with effective dates. Retrofitting the tagging into a shipped engine is the reason FR-CHR-011 is P0. **[Verified]** 50% add-back and "or such other per cent as may be notified" (Code on Wages s.2(y) / CoSS s.2(88) — r1/06 finding 5). MoLE's own FAQ illustration is internally inconsistent on which heads enter the test; §06.10 records the reading the engine implements (r2/10).

#### Example D — Full-and-final with gratuity (FR-CHR-056, FR-CHR-057)

Arjun resigns after 6 years 7 months; last-drawn add-back wage (Basic + DA-equivalent) ₹32,000/month; 12 days of leave to encash; 15-day notice shortfall.

- Completed years for gratuity = 7 (the 7 months > 6 rounds up). Gratuity = ₹32,000 × 15 ÷ 26 × 7 = **₹1,29,231** (CoSS s.53). Its tax treatment reads `tax.gratuity_exemption_ceiling`, net of any gratuity Arjun received from prior employers (§06.6).
- Leave encashment on the correct wage base for 12 days, notice-shortfall recovery for 15 days, pending reimbursements, then TDS on the taxable portion of the settlement — assembled into one FnF statement (FR-CHR-056).
- Arjun's date of exit and reason are marked on the EPFO portal (the ECR file has no exit field — EV-035), and his contributions stop at the date of leaving (EV-040). His UAN enables member-initiated transfer or withdrawal. His Form 130 for this employer's period comes from TRACES after the Tax Year closes, and it is fenced until the Form 138 Q4 format is released (FR-CHR-059; EV-046, EV-048). A pre-5-year resigner would not reach gratuity here — but the death and disablement rules (FR-CHR-061) would be applied where they hold, and a 4-years-240-days case would be routed for confirmation (FR-CHR-016). **[Verified]** gratuity formula and six-month rounding (CoSS s.53; r1/06 finding 43).

#### Example E — EPS split and a post-2014 high-wage joiner (FR-CHR-012)

Two joiners, same ₹40,000 basic, different histories.

- **Meera** has continuous EPF membership since 2012 and elects (with the employer) para 26(6) contribution on actual wages. Employee 12% = ₹4,800; employer 12% = ₹4,800, of which EPS is 8.33% of the pension wage. If pension wage is capped at ₹15,000, EPS = ₹1,250 and the balance ₹3,550 goes to EPF; if a higher-pension option applies, EPS is on ₹40,000 — but only on the member's recorded EPFO approval status, never inferred from the wage (§06.2).
- **Karan** first joins PF in 2026 at ₹40,000 basic with no prior EPS membership. Under the post-01.09.2014 rule he is **not** an EPS member: the entire employer 12% (₹4,800) routes to EPF, EPS = ₹0. A system that hard-codes "8.33% always goes to EPS" over-allocates to pension and mis-files. **[Verified]** post-2014 EPS non-membership and the ₹1,250 cap (EPFO revamped-ECR FAQ, r5/02 finding 14; EPFO EPS page, r1/06 finding 14; §06.2). A joiner on exactly 01.09.2014 reads `epf.eps_closure_boundary_inclusive`.

#### Example F — Death-in-service with EDLI and gratuity without the 5-year condition (FR-CHR-061)

Sanjay dies in service after 3 years 4 months; nominee is his spouse (EPF and gratuity nominations recorded — FR-CHR-044).

- The **5-year condition does not apply on death**, and a deceased employee's gratuity is paid pro rata (CoSS s.53): it is routed to the nominee, not withheld for the shortfall.
- **EDLI** provides a lump-sum insurance benefit to the nominee on death in service; the product raises the EDLI claim task and supplies the required data, rather than treating death as an ordinary exit.
- ESI dependants' benefit and any group insurance endorsement are surfaced. The settlement is nominee-directed throughout — which is why nominations (FR-CHR-044) are filing/settlement artefacts, not HR nice-to-haves. **[Verified]** the gratuity rule (CoSS s.53; r1/06 finding 43). The EDLI Scheme 1976 is saved by CoSS s.164(2)(b) only until on or about 21 November 2026, with no successor captured, so a death after that date reads whichever instrument is then in force (§06.9, §06.13).

#### Example G — International worker: the PF basis is contested, the EPS answer is not (FR-CHR-007, FR-CHR-012)

Lena, a foreign national on assignment who first joined EPF in 2026, earns basic ₹2,00,000/month.

- **EPS.** She became a member after September 2014 with wages above ₹15,000, so she is **not** an EPS member and EPS = ₹0 (EPFO revamped-ECR FAQ, r5/02 finding 14 **[Verified]**). v0.3's "EPS has no ₹15,000 cap for IWs" is **[Reversed]** for post-2014 joiners like her; only a pre-September-2014 IW member above the ceiling contributes to EPS on full salary (same finding).
- **PF basis.** The rule that an IW contributes on full wages with no ₹15,000 ceiling is carried, not re-captured, and a High Court is reported to have struck the IW provisions down, with the matter under challenge (§06.2) **[Hypothesis]**. The engine therefore reads `epf.iw_wage_basis` (full wages, or the ceiling) as a tenant-confirmed parameter, and a change to it re-derives her PF from its effective date. On full wages, employee and employer PF are each 12% of ₹2,00,000 = ₹24,000, with the whole employer share to EPF.
- **Exemption.** A Certificate of Coverage under a social security agreement with her home country, where one exists, can exempt the contribution; the master stores CoC status and validity (FR-CHR-007) and the derivation reads it. The SSA country list is carried, not re-captured (§06.2).
- A system that hard-codes either answer — silently capping IW PF at ₹15,000, or crediting EPS for a post-2014 IW — mis-files. The ECR only flags the post-2014 EPS case and does not reject it (EV-040), so the derivation here is the control.

#### Example H — Statutory bonus on a capped base (FR-CHR-018a)

Deepak's basic+DA is ₹18,000/month; the applicable minimum wage is ₹9,000/month; the establishment declares a 12% bonus for the year. The ceilings used are the legacy Payment of Bonus Act figures. For Code-era periods they are the appropriate Government's parameters (FR-CHR-018a, §06.7), and the mechanics are identical.

- **Eligibility:** basic+DA ₹18,000 ≤ ₹21,000 (legacy ceiling), so Deepak is eligible.
- **Computation base:** bonus is computed not on ₹18,000 but on the capped wage — the higher of the notified amount (legacy ₹7,000) or the minimum wage. Here min wage ₹9,000 > ₹7,000, so the base is ₹9,000/month = ₹1,08,000/year. Bonus at 12% = **₹12,960**, not 12% of ₹2,16,000.
- A colleague at basic+DA ₹22,000 is **bonus-ineligible** and correctly excluded.
- This is why FR-CHR-018a stores the inputs (basic+DA, min-wage applicability by state, declared percentage) and the engine applies the cap; a system that computes bonus on full basic over-accrues liability. **[Verified]** 8.33–20% range and the higher-of-notified-amount-or-minimum-wage structure (Code on Wages s.26); the ₹21,000 eligibility and ₹7,000 figures are the Payment of Bonus (Amendment) Act 2015 figures per a law-firm note (r1/06 finding 47, medium) and **[Hypothesis]** for Code-era periods (§06.7). Deepak also needs at least 30 days' work in the accounting year (s.26(1)).

#### Example I — LWF periodicity divergence on an inter-state workforce (FR-CHR-015)

An establishment employs staff in two states whose LWF periodicities differ: one state deducts LWF **half-yearly**, the other **monthly** (periodicity varies between monthly, half-yearly and annual by state — r1/06 finding 53; the cycle months are per-state parameters, §06.8).

- The same employer, in the same payroll month, must deduct LWF for some employees and not others — driven entirely by work-location state, not by a company-level setting.
- A back-dated transfer across the two states mid-cycle changes *whether and when* the LWF deduction falls due, so LWF liability is itself effective-dated and re-derived on transfer (FR-CHR-050-tr).
- **[Reversed]** v0.3 called this parity because "Frappe already ships LWF across 14 states free". Frappe HR v16 has no LWF and no Indian state name anywhere in its source (EV-031), and TallyPrime has no LWF engine (EV-032). Correct LWF across periodicities falls in both incumbents' gap, so it is a differentiator. **[Verified — structure]** LWF periodicity varies by state (r1/06 finding 53; only Karnataka's periodicity is captured at a primary source — §06.8). **[Hypothesis]** exact per-state periodicity/shares pending the gazette-sourced dataset; **kill/validate:** verify beachhead-state LWF against each state Act before v1 GA, treating unverified states as non-fileable (Source: §20 V-09).

#### Example J — Loss-of-pay and the 240-day continuous-service test (FR-CHR-016, FR-CHR-013)

Kavya has 4 years 9 months of service and takes 40 days of loss-of-pay (LOP) leave in her final year before resigning.

- **Gratuity eligibility is not the calendar; it is continuous service.** She has not completed 5 calendar years, so the naïve test says "ineligible." CoSS s.54 counts days: 240 days actually worked in a twelve-month period, with lay-off, paid earned leave, temporary disablement from employment injury and maternity leave up to 26 weeks counted **[Verified]** (r1/06 finding 44). Loss-of-pay days are not in that list, so the master computes continuous service on **worked and counted days**, not elapsed calendar days. Whether her fifth year can be satisfied at 4 years + 240 days is the High Court reading under the repealed Act that §06.6 marks **[Hypothesis]** — not uniformly settled and untested under the Code. If she cleared 240 counted days in the qualifying year despite the LOP, the product reports "eligible under `gratuity.four_years_240_days_rule` — confirm jurisdiction"; if the LOP pushed her below 240, it reports ineligible. Either way it shows the day-count and the basis, never a bare yes/no, and it never auto-approves at 4y240d.
- **LOP also prorates PF/ESI wages.** A month with LOP has reduced paid wages, so the PF/ESI/PT wage for that month is the *earned* wage, and the ECR/ESI contribution follows the earned figure — the master's paid-days input (owned here, computed in payroll) is what makes the period figure correct. A system that contributes on full contracted wages during an LOP month over-remits. **[Verified]** EPF contributes a percentage of basic wages + DA, and ESI a percentage of "wages paid/payable" in each wage period (EPFO EPF Scheme page and ESIC contribution page, r1/06 findings 14, 22).

#### Example K — Notice pay and leave encashment share one wage base, and it is not "gross" (FR-CHR-055, FR-CHR-056, FR-CHR-016a)

Rohan resigns with a 30-day notice period, serves 18, and has 15 days of earned leave to encash. Gross ₹60,000/month; Basic+DA ₹30,000.

- **Which base?** Notice-pay recovery for the 12-day shortfall and leave encashment are computed on the wage base the policy/contract and the Codes define — typically the same "wages" definition (Basic+DA and inclusions per Code on Wages s.2(y)), not the full CTC gross. A product that recovers notice shortfall on ₹60,000 gross when the contract and statute point to the ₹30,000 wage base over-recovers and creates a dispute. The master holds the tagging (FR-CHR-011) so the encashment/notice engine reads the correct base, and the floor cannot fall below the applicable minimum wage (FR-CHR-016a).
- **Worked figures on the ₹30,000 base:** per-day wage ≈ ₹30,000 ÷ 26 (or ÷30 per policy — the divisor is itself a configurable, effective-dated policy). Notice shortfall recovery = 12 × per-day; leave encashment = 15 × per-day; both net into the FnF (FR-CHR-056) with TDS on the taxable portion (the leave-encashment exemption for eligible cases is 1961-Act s.10(10AA); its limit and 2025-Act section are carried, not re-captured, and routed to §20). **[Verified]** the s.2(88) add-back re-bases leave encashment (r1/06 finding 5), and the Central Rules convert a daily rate to monthly by × 26 (r1/06 finding 3).
- **Why it is a master problem, not a payroll problem:** the divisor policy, the encashment base tagging and the minimum-wage floor are all effective-dated master facts; a mid-year policy change to the divisor must recompute only settlements dated after the change (FR-CHR-093), not retroactively rewrite an already-issued FnF.

#### Example L — Rehire: gratuity clock, duplicate-UAN prevention and lineage (FR-CHR-001, FR-CHR-041, FR-CHR-016)

Anjali worked 3 years, left, withdrew her PF, and is rehired 14 months later at the same legal entity.

- **Lineage:** the rehire reuses the canonical `person_id`/`employee_id` (FR-CHR-001) as a *new `employment`* under the same person (§07.2a), so attrition analytics, prior documents and audit history remain linked while the new employment starts its own effective-dated ranges.
- **UAN:** her prior UAN is linked via the joining declaration (FR-CHR-041, FR-CHR-045a). The system must **not** accept a second UAN, even though PF was fully withdrawn: withdrawal closes the balance, not the UAN. The product never creates UANs, so the risk is the employee generating a fresh one in UMANG; the onboarding flow checks for a declared prior UAN first. A duplicate UAN causes KYC failures and later member grievances; its share of ECR defects is unmeasured (§20).
- **Gratuity clock:** the 14-month break in service breaks continuous service, so the gratuity clock generally **resets** to the rehire DOJ — the prior 3 years do not carry unless a specific protected-break rule applies. The product models this as an explicit, reasoned continuity decision (§07.3.1 onboarding edge cases), never a silent default. CoSS s.54 defines continuous service by counted days (r1/06 finding 44); the treatment of a resignation-and-rehire gap is carried from v0.3, not re-captured **[Hypothesis]**, which is why the product records an explicit decision with its basis rather than deriving one.

#### Example M — Maternity benefit: who pays depends on ESI coverage (FR-CHR-018b, FR-CHR-013)

Two pregnant employees at the same establishment, different wages.

- **Neha** earns gross ₹18,000 (ESI-covered). ESI administers a maternity benefit for insured persons (§06.3). v0.3 stated that ESI coverage displaces the employer's own maternity liability, citing sections of the repealed Maternity Benefit Act 1961. That displacement rule is carried, not re-captured, and its Code-era provision is unmapped **[Hypothesis]** (§20). The product therefore holds the routing as parameter `maternity.esi_displacement_rule`. Under the carried reading it routes her case to the ESI maternity path, checks that her contribution periods qualify her (FR-CHR-013), and never also pays employer-funded maternity wages for the same period.
- **Ishita** earns gross ₹35,000 (above the ESI ceiling, not covered). Her maternity benefit is an **employer** obligation under CoSS Chapter VI, which applies at 10 or more employees on any day of the preceding twelve months (First Schedule **[Verified]**, r1/06 finding 55). It is paid through payroll for `maternity.weeks_standard` (26 weeks, the figure CoSS s.54 uses — FR-CHR-018b). She is also owed the ₹3,500 medical bonus, or the notified amount, unless the employer provides free pre- and post-natal care (s.64 **[Verified]**). The master's coverage flag (FR-CHR-013) is what selects the ESIC path or the employer path — a system that treats maternity as a single leave type mis-routes one of the two and either double-pays or under-pays.
- Both cases also require the crèche obligation check at 50 employees, a number the Code makes prescribable (s.67 **[Verified]**, r1/06 finding 56; FR-CHR-023), and job-protection during the leave. The reduced entitlement for a third-plus child is carried, not re-captured (`maternity.weeks_reduced`, FR-CHR-018b), so the master holds child-order as an input.

#### Example N — Form 124 (ex-12BB) declaration, proof gating and the year-end true-up (FR-CHR-071, FR-CHR-017)

Vikram (old regime) declares in April: s.80C ₹1,50,000, s.80D ₹25,000, and HRA with annual rent ₹1,80,000, so landlord-PAN capture is required (above ₹1,00,000 annual rent — r3/02 finding 21, from a vendor declaration form; the 1961-Act rule basis, Rule 26C, is carried, not re-captured). (Sections, limits and rule numbers here use 1961-Act numbering; the 2025-Act mapping goes through §20.) Monthly TDS is computed on the *declared* deductions from April.

- Through the year the payroll engine spreads TDS assuming the declarations hold, reducing monthly deduction. The master tracks each declared item's **proof state** (declared → proof-submitted → verified / rejected), which *gates the deduction treatment*.
- At the proof cut-off (typically Jan–Feb), Vikram has proven only ₹90,000 of s.80C and has not furnished the landlord PAN. The engine must **reverse the unproved benefit** in the year-end true-up: disallow the ₹60,000 unproved s.80C and the HRA exemption lacking landlord PAN, recompute annual tax, and recover the shortfall over the remaining months' TDS — reflected in the Form 138 data behind Form 130. A system that treats a declaration as permanent under-deducts and leaves the employer exposed for short deduction under s.392 (ex-s.192).
- If Vikram had instead defaulted to the **new regime** (the default since AY 2024–25, FR-CHR-017), most of these deductions would not apply at all — so the regime election, held per Tax Year on the master, changes which of these lines even exist. **[Verified]** the new-regime default since FY 2023-24 (r1/06 finding 40; 1961-Act s.115BAC, 2025-Act section unmapped) and Form 124 replacing Form 12BB from Tax Year 2026-27 (EV-050). The landlord-PAN threshold rests on a vendor form (r3/02 finding 21) and is parameter `tax.hra_landlord_pan_threshold`.

#### Example O — No-PAN employee and the higher-rate floor (FR-CHR-002, FR-CHR-017)

Farhan has taxable salary but has not furnished a PAN (`pan_status = not-available`).

- A no-PAN employee attracts a higher-rate deduction floor that overrides the normal slab. v0.3 stated it as 1961-Act s.206AA, "the higher of the applicable rate or 20%", with no Form 124 (ex-12BB) benefit able to pull the deduction below it — carried, not re-captured, and not stated as law (§06.5). The TDS engine reads the `pan_status` flag (distinct from `pending`) and applies the floor from the rule parameter `no_pan_tds_floor`, whose 2025-Act section and value are pending mapping, with no shipped default (§06.13, §20).
- The consequence propagates to filing. His Form 138 (ex-24Q) line reports the PAN as not available, using the convention the Form 138 file specification prescribes (§08 owns the file spec). That draws a higher-deduction validation, and the TRACES-generated Form 130 carries the gap. This is why FR-CHR-002 stores `not-available` as a first-class state and the readiness report flags `PAN_MISSING` (FR-CHR-097), rather than letting the line reach filing and reject. **[Hypothesis]** the floor's rate and section until `no_pan_tds_floor` is confirmed against the 2025 Act.

---

### 07.7b Identity, consent and access across the section — lifecycle hooks, events, records, setup and measures

The blocks in §07.1.1a to §07.1.7 and §07.6a each specify one control. This subsection states what they share: where each control fires in the employee lifecycle, the events they emit, how their records are classified and kept, what a tenant must set before its first run, how the readiness report carries their outcomes, how their health is measured, and one end-to-end scenario that exercises all of them at once.

**Lifecycle hooks.** What each lifecycle transition (§07.3) does to identifiers, consent, the token store and access scope.

| Transition | Identifiers | Consent | Token store | Access scope |
| --- | --- | --- | --- | --- |
| Offer accepted, onboarding opened (FR-CHR-040) | PAN, any UAN and IP captured and format-checked (§07.1.1a catalogue) | `BANK_DISBURSAL` requested (CN1); the privacy notice presented for acknowledgement | Nothing, unless the joiner chooses a catalogue purpose | The onboarding HR admin's establishment |
| Activation (register commit) | UAN linked (MU1) or `UAN_PENDING`; PF Member ID opened on the establishment mapping | A biometric purpose requested only if the site offers a modality and the joiner opts in (§09.2-A) | An `AADHAAR_ESIC_IP_SEEDING` grant may start the IP task | The establishment's HR admin; the reporting manager |
| IP registration or employer-route UAN recorded | IP number or UAN recorded, maker-checked | — | MARK_PURPOSE_SPENT, then PURGE | — |
| Disability declared | — | `HEALTH_DISABILITY_STATUS` requested; the flag is written only on a grant | — | The administering HR admin only |
| Statutory transfer (FR-CHR-050-tr) | PF Member ID succeeded; UAN and IP unchanged | A biometric purpose at the new site only through a ticket the employee confirms (§09 FR-ATT-025) | — | Split by period (§07.6a scope table) |
| Management transfer (FR-CHR-049) | Unchanged | Unchanged | — | Manager changes on the effective date |
| Exit (FR-CHR-054, FR-CHR-058) | PF Member ID closed; date of exit marked with no member-detail or Aadhaar update (research r5/02, finding 13) | Grants stay for FnF disbursal; biometric erasure triggered (FR-CHR-103) | Unspent purposes close; PURGE | Read-only for retention classes (§07.6a) |
| FnF settled | — | The bank purpose's use ends with the last disbursal; the account closes to new use; the grant is not treated as withdrawn | — | — |
| Death in service (FR-CHR-061) | — | `NOMINEE_BANK_DISBURSAL` requested from the nominee | PURGE of any held entry | — |
| Rehire (Example L) | Duplicate check (FR-CHR-108); the prior UAN linked | Grants in force carry; others requested again (CN1) | Nothing carries; purposes start afresh | The new employment's establishment |

**Events this section emits.** Every event carries surrogate ids, never an identifier value, an Aadhaar digit or a consent artefact's content. The consumers are the modules named; where an event is exposed outside the product, §16.11 governs it.

| Event | Emitted when | Carries | Main consumers |
| --- | --- | --- | --- |
| `identifier.change_proposed` | CR2 on an `ID.*` or `BANK.ACCOUNT` request | `cr_id`, `person_id`, field, kind, `effective_from` | Subject notice; checker inbox; readiness |
| `identifier.change_effective` | CR6 or CR8 on the same | `cr_id`, field, `effective_from`, the FR-CHR-109 impact list | §08 generators; readiness; subject notice |
| `uan.declared_additional` | MU2 | `person_id`, count of declared UANs | Readiness |
| `uan.active_confirmed` | MU3 | `person_id`, `effective_from` | §08 ECR generator |
| `uan.wrong_filed` | MU6 | `person_id`, affected months | Approver; §22 queue |
| `person.duplicate_review_opened` | A duplicate match (FR-CHR-108) | `review_id`, match basis | HR queue |
| `person.merged`, `person.unmerged` | A merge or un-merge takes effect | Both `person_id`s | Every consumer keyed on `person_id` |
| `aadhaar.put`, `aadhaar.revealed`, `aadhaar.purged` | The store operations | Token, purpose, `task_id` | Store audit; detection signals |
| `consent.granted`, `consent.declined`, `consent.withdrawn` | CN3, CN4, CN6 | `consent_id`, purpose, regime | The gated write paths; §09 enrolment; payout routing |
| `consent.pending` | CN5 | `consent_id`, purpose | HR task; migration report |
| `migration.stage_completed` | Each stage's exit test passes | `batch_id`, stage | §05 tenant lifecycle |
| `exclusion.opened`, `exclusion.escalated`, `exclusion.closed` | EX2, EX6, EX5 | `exclusion_id`, month, `m_plus_4_deadline` | Exclusion register; §22 queue; approver |
| `change_request.stale`, `change_request.escalated` | CR12, CR11 | `cr_id` | Maker; backup checker |
| `access.four_eyes_gap` | Coverage fails for a change type and scope | Change type, scope | Setup checklist; readiness |
| `access.unmasked` | An unmask event | `unmask_id`, purpose | Detection signals |
| `biometric.erasure_requested` | Exit, withdrawal or method switch (FR-CHR-103) | `employment_id`, trigger | §09 device erasure |
| `employment.status_changed` | Any transition in §07.3.5 | `employment_id`, from, to, `effective_from`, reason code | §08 run population; §09; registers; readiness; the subject's notice |
| `establishment.coverage_fact_recorded` | FR-CHR-140, on a crossing or a notification | `establishment_id`, obligation, trigger date, counting unit, rule version | Derivation triggers; registration tasks; setup checklist |
| `document.issued` | DS2 | `document_id`, class, subject, manifest reference, hash | Artefact index; distribution; §22 session evidence |

**Classification, temporal class and retention of the records this section introduces.** Temporal classes are Part E-2's (§07.2a); classification is §14.5's; periods not stated here are counsel-set parameters (Part D-11).

| Record | §14.5 class | Temporal class | Retention |
| --- | --- | --- | --- |
| `change_request` | C1 when it carries a C1 field; otherwise C3 | Record of fact — append-only | The retention class of the object it changed, and at least the 180 days of in-India ICT logs (EV-062) |
| Exclusion record | C1 (it carries contribution amounts) | Record of fact | The EPF and ESI employer-records class (§14.7 `REG_SS`, EV-054); any longer tail is `retention.epf_esi_tail` (counsel) |
| Duplicate review and merge record | C3 | Record of fact | The longer of the two persons' retention classes |
| Token-store audit events; unmask events | ICT logs | Record of fact | At least 180 days in India (EV-062); longer per `retention.*` (counsel) |
| Consent record | C1 for SPDI purposes | Erasable (Part E-2) | `retention.consent_evidence` (counsel) |
| Notice acknowledgement | C3 | Erasable | `retention.notice_acknowledgement` (counsel) |
| Consent template registry | C4 | Bitemporal, as a rule-like object | Kept |
| Migration load report | C3 | Record of fact | `retention.migration_report` (counsel); it holds no dropped value |
| Import staging copy | C1 | Erasable | Purged within `migration.staging_purge_hours` |
| Token-store entry | Outside every business class (§14.5) | Erasable | Its purpose — the reg 6(5) ceiling (EV-068) |

**What a tenant must set before its first run.** These join the §05 setup gates; the tenant cannot reach LOADED (§05 TO8) with any of them open.

| Item | Why | Set by | Checked by |
| --- | --- | --- | --- |
| `aadhaar_exclusion.employee_share_timing` | CR-30 is open (FR-CHR-125) | HR admin or payroll | Compliance checker |
| `aadhaar_exclusion.escalation_lead_days` | The M+4 escalation (FR-CHR-127) | HR admin or payroll | Compliance checker |
| `non_bank_disbursal_mode` | Pay for employees without a bank grant (FR-CHR-102) | Payroll | Compliance checker |
| `abandonment.notice_to_return_days` | ST12 cannot fire without it (FR-CHR-145) | HR admin | Compliance checker |
| `document.acknowledgement_reminder_days` | The reminder chain on issued letters (FR-CHR-151) | HR admin | Compliance checker |
| `change_request.sla_hours.<change_type>` for every catalogue type | The FR-CHR-086 escalation | HR admin | Compliance checker |
| Four-eyes coverage passing for every change type and scope | FR-CHR-129 | Super-admin | Compliance checker |
| A backup checker for every change type | CR11 needs one | Super-admin | Compliance checker |
| At least one compliance-checker-role holder able to reveal, where the tenant will seed at IP registration | FR-CHR-112 | Super-admin | Compliance checker |
| Cleared templates for every applicable purpose, in every language the roster uses | CN1's guard; §05 TO7's guard (CR-04, CR-22) | The vendor's Legal lead, through the §22 pipeline | Two-person review (§22) |
| The migration consent run complete, every employee holding a status | §05 TO7 | HR admin | The TO7 exit test |

**The readiness item record (FR-CHR-097).** The readiness report is a work queue, so each line is a record with an owner and a lifecycle, not a computed row that vanishes when fixed.

| Field | Rule |
| --- | --- |
| `item_id` | Immutable |
| `reason_code` | From the readiness-reason dictionary (§07.7) |
| `filing`, `establishment_id`, `period` | The per-filing, per-establishment, per-period scope that "clean filing" counts on |
| `person_id` or `object_ref` | The member, or the configuration object for employer-side reasons |
| `owner` | `employee`, `hr_admin`, `payroll`, `compliance_checker` or `super_admin`, from the reason's fix action |
| `employee_task` | Set where "My identifiers" shows the reason as an employee task (§07.1.1a) |
| `opened_at`, `due_by` | `due_by` is the filing's due date less the tenant's `calendar.alert_lead_days` (§03.2) |
| `state` | OPEN, IN_PROGRESS, RESOLVED, DISPOSED or REOPENED |
| `disposition_ref` | For DISPOSED: the exclusion record (FR-CHR-124) or another recorded decision |
| `resolved_by`, `resolved_at` | — |

| State | Meaning | Counts against "clean filing"? |
| --- | --- | --- |
| OPEN | Raised; nobody has acted | Yes |
| IN_PROGRESS | A change request, a task or a portal step is under way | Yes |
| RESOLVED | The cause is gone — the value corrected, the evidence approved | No |
| DISPOSED | Resolved by a recorded decision rather than a fix — an exclude-and-flag exclusion, or an operator's recorded transfer-month treatment | No; reported separately with its follow-up |
| REOPENED | The cause returned — a correction later reversed, a Supplementary rejected | Yes |

| # | From → To | Event | Who or what triggers it |
| --- | --- | --- | --- |
| RD1 | *(none)* → OPEN | A re-scan finds the reason — at every lock, every generation, and on any event in the catalogue above that touches the item's person or object | System |
| RD2 | OPEN → IN_PROGRESS | A change request, an employee task, a portal task or a registration task linked to the item is opened | The owner, or the employee through "My identifiers" |
| RD3 | IN_PROGRESS → RESOLVED | The linked work completes and the next re-scan no longer finds the reason | System, on re-scan |
| RD4 | OPEN or IN_PROGRESS → DISPOSED | A recorded decision stands in for a fix — an exclusion (FR-CHR-124), a recorded transfer-month or ceiling-change treatment | System, with the decision's reference |
| RD5 | DISPOSED → RESOLVED | The disposition's follow-up completes — the Supplementary is approved and paid, or the parameter is set and the month recomputed | System |
| RD6 | RESOLVED → REOPENED | A re-scan finds the reason again — a correction reversed, a Supplementary rejected | System |

A re-scan is deterministic and idempotent (§07.2a): run twice over unchanged inputs, it opens nothing new and closes nothing.

A worked count: an establishment's October ECR has 48 active members. One UAN is unseeded and one DOB mismatch is open. Before generation, two items are OPEN, so the ECR is not clean. The DOB mismatch is resolved by an approved correction (RESOLVED); the unseeded member is excluded (DISPOSED, linked to the exclusion). The ECR is now clean — 47 lines plus one open exclusion equal 48 members (AO-5) — and the report shows "clean, one disposed, one Supplementary pending". The same member may keep the October Form 138 row clean throughout, because the reasons are per filing.

**Test scenarios — readiness items, events and setup.**

| # | Given | When | Then |
| --- | --- | --- | --- |
| T-RD-1 | An unseeded member at October's lock | The ECR is generated | The item moves OPEN → DISPOSED, linked to the exclusion; the ECR counts as clean with one disposed item |
| T-RD-2 | That member's Supplementary approved and paid | — | The item moves DISPOSED → RESOLVED |
| T-RD-3 | A DOB correction reversed after its item was RESOLVED | The next re-scan | The item is REOPENED |
| T-RD-4 | Two re-scans over unchanged inputs | Both run | No item opens or closes, and the audit log shows no change |
| T-RD-5 | A new code path emitting an event with a PAN value | The event-schema test runs | The build fails, naming the field |
| T-RD-6 | A tenant with `change_request.sla_hours.BANK.ACCOUNT` unset | LOADED (§05 TO8) is attempted | Refused, naming the setup item |

**When a control's service is unavailable.** Each control fails in the direction that protects the data or the filing, and none fails into a payroll block.

| Control | While unavailable | Fails | Payroll |
| --- | --- | --- | --- |
| Token store | PUT and REVEAL refused; RESOLVE_TOKEN answers `unavailable`, which every reader treats as `none`; Form I field 24 stays empty | Closed | Unaffected |
| Consent gate | Gated writes refused. Payout lines use accounts already effective; a withdrawal is still accepted on every surface, queued, and applied before the next file's release | Closed for writes | Unaffected |
| Change-request service | No gated change can be submitted or approved; the last effective values stand | Closed | Unaffected |
| Readiness re-scan | Generation waits for a fresh scan; no artefact generates on a stale readiness state | Closed for generation | Computes and locks; only generation waits |
| Subject and checker notifications | Queued and retried through FR-CHR-088's fallbacks; an undelivered notice becomes an in-app task | Open, with persistence | Unaffected |
| Detection signals | Logs are still written; the signals are computed once restored | Open — logging never stops | Unaffected |

**Control-health measures.** Each is numerator over denominator from a named source; targets are owner decisions routed to §20.13, not stated here. §19 owns the product metrics; these tell the operator whether the controls are working.

| Measure | Numerator | Denominator | Source |
| --- | --- | --- | --- |
| Bank-grant coverage | Employees with a GRANTED `BANK_DISBURSAL` | Active employees | Consent records |
| Alternative-mode payouts | Payouts made by `non_bank_disbursal_mode` in the month | All payouts in the month | Runs (§08) |
| Exclusion age | Open exclusions older than `measure.exclusion_age_bucket_days` | Open exclusions | Exclusion register |
| Exclusions near M+4 | Open exclusions whose `m_plus_4_deadline` is inside `aadhaar_exclusion.escalation_lead_days` | Open exclusions | Exclusion register |
| Store occupancy | Held store entries | Active employees | Token store |
| Purge timeliness | Purges completed inside `aadhaar.purge_lag_hours` of their trigger | Purges due | Store audit |
| Abandoned reveals | Reveals with outcome `abandoned` | Reveals | Store audit |
| Checker SLA | Requests decided inside `change_request.sla_hours.<type>` | Requests decided | Change requests |
| Stale rate | Requests that became STALE | Requests submitted | Change requests |
| Four-eyes gaps open | Change type and scope pairs with `FOUR_EYES_GAP` | Change type and scope pairs | Coverage panel |
| "This was not me" rate | Subject flags raised | Subject notices sent | Change requests |
| Duplicate reviews open | Reviews open longer than the tenant's review SLA | Reviews open | Duplicate reviews |
| Consent run completion before go-live | Migrated employees with a non-PENDING status for every applicable purpose at the first live month's bank file | Migrated employees | Consent records; migration batch |
| Unmask purpose mix | Unmask events with purpose `correction_review` or `audit_response` | Unmask events | Unmask log |

The exclusion-age bucket is a display setting, not a statutory figure; the statutory clock is the M+4 deadline.

**Parameters this section introduces.** Each is named where it is used and routed here so §20.13 can register it in a family (Part A rule 2). None carries a value in this PRD. Tenant-set parameters are the tenant's decision, recorded with its actor, and never a §20 value.

| Parameter | Used in | Owner | Route | §20.13 family | Until set |
| --- | --- | --- | --- | --- | --- |
| `aadhaar.reveal_window_seconds` | FR-CHR-112 | Security lead | Owner decision | Compliance-operations controls | No reveal is served |
| `aadhaar.purge_lag_hours` | FR-CHR-113 | Security lead | Owner decision | Compliance-operations controls | Purge runs at the next sweep after the trigger |
| `retention.aadhaar_unspent_purpose_days` | FR-CHR-113 | Legal lead | Counsel (Part D-11) | Retention | The closure task is raised at each sweep for every unspent purpose |
| `retention.consent_evidence`, `retention.notice_acknowledgement`, `retention.migration_report` | §07.1.5; §07.7b | Legal lead | Counsel (Part D-11) | Retention | Held, never erased (§14.7) |
| `consent.reconsent_required.<purpose>` | FR-CHR-117 | Legal lead | Counsel (CR-04, CR-22) | A counsel-routed family, as `retention.*` is | Existing grants stand |
| `consent.reminder_cadence_days`, `consent.reminder_limit` | FR-CHR-115; FR-CHR-122 | Product lead | Owner decision, revisited on the §20 V-15 spike | Migration | No automatic reminders; HR sends them from the board |
| `migration.staging_purge_hours` | FR-CHR-119 | Security lead | Owner decision | Migration | Stage S cannot complete |
| `esi.ceiling_change_timing` | §07.1.5 | Statutory lead | §20 V-21 (desk) | Central labour reference values | The operator records the treatment (`ESI_CEILING_CHANGE_TIMING_UNSET`) |
| `pan.verification_source` | §07.1.1a | Statutory lead | §20 V-20 (desk) | Tax reference values | PAN is verified only through the filing ledger or a checked document |
| `mask.<field>` | FR-CHR-131 | Security lead | Owner decision | A new access-display family | Every such field is fully masked |
| `detect.window_days`, `detect.abandoned_reveal_limit`, `detect.unmask_baseline_multiple`, `detect.min_review_seconds.<change_type>`, `detect.bank_flipflop_days` | §07.6a | Security lead | Owner decision, revisited on the first quarter's logs | A new access-display family | The signal is computed and shown, with no alert |
| `measure.exclusion_age_bucket_days` | §07.7b | Product lead | Owner decision | Display only; no family | The measure is not shown |
| `aadhaar_exclusion.employee_share_timing` | FR-CHR-125 | The tenant; CR-30 may fix it | Tenant-set, required | — | The tenant cannot reach LOADED |
| `aadhaar_exclusion.escalation_lead_days` | FR-CHR-127 | The tenant | Tenant-set, required | — | The tenant cannot reach LOADED |
| `change_request.sla_hours.<change_type>` | FR-CHR-129 | The tenant | Tenant-set, required | — | The tenant cannot reach LOADED |

**Design decisions this section records.** Each names the alternative rejected, so a later reader can tell a decision from an oversight.

| Decision | Alternative rejected | Reason |
| --- | --- | --- |
| Only a compliance-checker-role human can reveal an Aadhaar number (FR-CHR-112) | Any role holding **U** | The matrix has one full-value cell; reveals are rare, and each is due-diligence evidence under s.43 (EV-067) |
| HR never keys an Aadhaar number (FR-CHR-110) | HR entry on the employee's request | A private kiosk session covers workers without phones, and fewer hands touch the number |
| A bank account may be corrected only before its first use (FR-CHR-106) | Correction at any time | A correction rewrites valid time; after a payout, it would rewrite where money went |
| Every gated change notifies its subject (§07.6a) | Notice on request only | The subject is the cheapest fraud detector the product has |
| No break-glass for master data (§07.6a) | An emergency override | An override is the path four eyes exists to close |
| The migration import runs in stages R, C, S, T (FR-CHR-119) | One import, with consent collected afterwards | Consent cannot be backfilled (Part E-12) |
| `employee_share_timing` has no shipped default (FR-CHR-125) | Default to deduct-and-hold | CR-30 is open, and a default would decide it |
| Dependant Aadhaar tokens stay `none` (§07.1.4) | Store them in case a purpose appears | Reg 6(5) ties retention to a purpose stated at consent (EV-068) |
| A PT liability shows before its registration exists (§07.1.1a) | Hide it until registered | A hidden liability is found late; §22 AC-017.1 already computes it |
| A disability flag is consent-gated (FR-CHR-007) | Treat it as an ordinary statutory attribute | SPDI r.3 classes a health condition as sensitive (research r4/01) |
| A reveal needs an open task of the purpose's type (FR-CHR-112) | A reveal with a typed reason | A task ties the reveal to one portal act and closes when the act is done |

**Golden fixtures.** The examples in this section are also the fixture set the tests run on, so every worked figure is re-checked on every build. Each fixture is a person in a synthetic tenant; no real identifier is ever used.

| Fixture | Establishment | Pay facts | Identity and consent facts | Exercises |
| --- | --- | --- | --- | --- |
| Suresh | Pune | PF wage ₹15,000 | UAN-A declared at joining; UAN-B declared in September | FR-CHR-107; T-ID-3 to T-ID-5 |
| Nisha | Pune | PF wage ₹15,000 | DOJ keyed 21 June, actual 11 June | FR-CHR-106; FR-CHR-109 |
| Asha | Bengaluru | Gross ₹19,000 | Grants `AADHAAR_ESIC_IP_SEEDING` | FR-CHR-110 to FR-CHR-113; T-AV-3, T-AV-4 |
| Imran | Bengaluru | Gross ₹18,500 | Declines Aadhaar | FR-CHR-123 |
| Latha | Pune | Gross ₹20,000; basic plus DA ₹12,000 | Withdraws `BANK_DISBURSAL` on 20 September | FR-CHR-116; T-CN-4 |
| Farida | Pune | Gross ₹23,000 | Disabled employee; withdraws `HEALTH_DISABILITY_STATUS` on 10 August | FR-CHR-116; T-CN-6 |
| Mohan | Pune | Gross ₹18,000; basic plus DA ₹12,000 | Migrated; `BANK_DISBURSAL` pending | FR-CHR-119 to FR-CHR-122 |
| Ramesh | Pune | PF wage ₹15,000 | UAN unseeded at October's lock; seeds 20 November | FR-CHR-124 to FR-CHR-127 |
| Deepa | Pune | Gross ₹20,000; basic plus DA ₹12,000 | New bank account proposed 26 September, old one declared closed | FR-CHR-128 to FR-CHR-130 |
| Kavitha | Bengaluru, working from Pune from 1 October | Maharashtra top slab, ₹2,500 a year (§06.4) | No Maharashtra PTRC on the Bengaluru establishment | `PT_REGISTRATION_MISSING`; T-ID-15, T-ID-16 |
| Anjali | Pune | — | Rehired and keyed as a new person with her old UAN | FR-CHR-108; T-ID-6, T-ID-11 |

**Acceptance criteria (across the section).**
- Every lifecycle transition fires exactly the hooks in the lifecycle table, and none waits on a consent, a store purpose or an erasure to complete.
- Every event in the catalogue carries surrogate ids only; an event-schema test fails the build on any identifier value, Aadhaar digit or consent content.
- Every record this section introduces carries the classification, temporal class and retention the classification table gives it.
- A tenant cannot reach LOADED (§05 TO8) with any setup item open.
- Every readiness item has an owner and a state, and "clean filing" counts only OPEN, IN_PROGRESS and REOPENED items.
- Each control fails in the direction the failure table gives, and none fails into a payroll block.

**End-to-end acceptance scenario — one tenant, one month.** A two-establishment tenant, Pune and Bengaluru, runs September 2026 with the fixtures above on its roll. The scenario passes only if every line below holds in a single run of the product, end to end.

| Step | What happens | What must be true |
| --- | --- | --- |
| 1 | Suresh declares UAN-B on 8 September | `MULTIPLE_UAN_DECLARED` opens; payroll is unaffected; the September ECR waits only for MU3 on his line |
| 2 | Latha withdraws her bank grant on 20 September | Her September net pay stays ₹18,410; her line in the bank file is flagged; the alternative mode pays her |
| 3 | Deepa proposes a new account on the 26th, declaring the old one closed; the checker is away | CR11 reassigns to the backup; her line is flagged at the 28 September lock; she is paid ₹18,410 into the new account after CR6 |
| 4 | Payroll locks September on the 28th | The pre-payroll checklist listed both pending requests at INPUTS_CLOSED; the locked snapshot holds the last effective values |
| 5 | The ECR is generated | Every active member is either a line or an open exclusion (AO-5); Suresh's line carries the UAN confirmed under MU3 |
| 6 | The readiness report is read | Every item is RESOLVED or DISPOSED; the ECR is clean |
| 7 | The audit and unmask logs are read | Every unmask names a purpose and a linked reference; no log line contains an identifier value or an Aadhaar digit |
| 8 | A manager of the team opens the team view and asks the assistant about Latha's bank account | No consent state, exclusion or identifier is visible; the assistant refuses |
| 9 | An employee on the roll transfers to the Bengaluru establishment on 16 September; the Pune HR admin opens the record | Records up to 15 September are visible; later ones are not |
| 10 | The matrix conformance suite runs on the tenant's configuration | Every generated case passes |
| 11 | At the Bengaluru establishment, Asha's IP registration completes with seeding and Imran's without | Asha's number is purged within `aadhaar.purge_lag_hours`; Imran's store state is `none`; both ESI rows are filed |
| 12 | Farida's August withdrawal of her disability flag reaches September's run | Her September ESI follows the recorded `esi.ceiling_change_timing` treatment; July and earlier are unchanged |

**End-to-end acceptance scenario — a migration month.** The 120-person manufacturer of §07.1.6 goes live on 1 October 2026. The scenario passes only if every line holds in one run.

| Step | What happens | What must be true |
| --- | --- | --- |
| 1 | The tenant is CONTRACTED and stage R runs | 120 roster rows; no bank, biometric, disability or Aadhaar value persisted; four employees routed to paper |
| 2 | Stage C runs to the reminder limit | Every employee holds a status for every applicable purpose; the board shows 13 bank statuses DECLINED or PENDING; no manager sees any |
| 3 | Three imported evidence items are proposed and checked | Each becomes a grant with its original date; the proposer could not approve their own |
| 4 | Stage S runs | Bank columns load for 107 and drop for 13; no biometric template loads; the load report lists every drop without its value; the staging copy is purged in time |
| 5 | Stage T runs | The §16.7 tie-out passes on its own heads; no consent status enters it |
| 6 | October is processed and locked | All 120 are paid; 13 by `non_bank_disbursal_mode`, each recorded on the run; Mohan receives ₹16,425 before PT and TDS |
| 7 | October's ECR is generated | Active members equal lines plus open exclusions (AO-5) |
| 8 | Five pending employees grant in ESS during October | Their accounts pass penny-drop and appear in the first bank file generated afterwards |
| 9 | The migration report is read | Non-responders are listed per purpose; no manager-facing surface shows a consent status |

---

### 07.8 Requirements traceability and phase summary

Every FR in this section traces to a downstream filing or a stated PRD constraint; the table below is the audit view, and it is the contract for what "core HR system of record" must contain by phase.

| Group | FR range | Feeds / enforces | v1 Must count |
| --- | --- | --- | --- |
| Employee master — identity | FR-CHR-001–009a, 104 | ECR, ESI challan, Form 138/130, KYC, the no-PAN floor (`no_pan_tds_floor`), identifier placement incl. multiple UANs | 8 Must |
| Identifier lifecycle and duplicates | FR-CHR-106–109 | typed changes, the multiple-UAN workflow, duplicate-person review and merge, re-validation of artefacts that used an old value | 4 Must |
| Employee master — terms & eligibility | FR-CHR-010–019 | dual wage base, PF/EPS/ESI/PT/LWF/gratuity/bonus/minimum-wage/maternity derivation, TDS | 8 Must |
| Eligibility derivation contract | FR-CHR-133–137 | derivation purity and its evaluation context, the trigger catalogue, the explainer, `UNDETERMINED` as an outcome, options as the only human entry point | 5 Must |
| Identity data, consent & Aadhaar optionality | FR-CHR-099–103 | Aadhaar token store, consent records across two regimes, exclude-and-flag, migration consent, biometric boundary (Part E-6, E-11, E-12) | 5 Must |
| Aadhaar token store operations | FR-CHR-110–113 | six operations, the purpose catalogue, purpose-bound reveals, purge on purpose (EV-068, EV-070) | 4 Must |
| Consent purposes and lifecycle | FR-CHR-114–118 | the purpose catalogue incl. health data, states, withdrawal effects, notice templates, evidence (EV-060) | 4 Must |
| Migration consent flow | FR-CHR-119–122 | staged import R–C–S–T, status and load rule, imported evidence, non-responders (Part E-12) | 4 Must |
| Aadhaar optionality in operation | FR-CHR-123–127 | the flow contract, the exclusion record and lifecycle, the employee-share setting, invariants, notices and escalation (Part E-11) | 5 Must |
| Org & establishment model | FR-CHR-020–028 | establishment-scoped filing, multi-state PT, threshold gating with counting unit and sphere, contract labour | 4 Must |
| Establishment lifecycle and coverage | FR-CHR-138–142 | the establishment state machine and its closure guards, the published headcount series, coverage facts on a crossing, registration acquisition, restructuring events | 5 Must |
| Lifecycle — hire | FR-CHR-040–045a | UAN tracking, IP registration, appointment letter (state form at 10+ workers), PF joining declaration, Employee Register | 7 Must |
| Lifecycle — confirm | FR-CHR-046–048 | effective-dated CTC, fixed-term gratuity | 2 Must |
| Lifecycle — transfer | FR-CHR-049–053 | inter-state PT split, retro, code re-derivation | 3 Must |
| Lifecycle — exit | FR-CHR-054–063 | FnF, gratuity, forfeiture, date-of-exit marking, Form 130 distribution (TRACES-generated), EDLI, retention | 7 Must |
| Employment status machine | FR-CHR-143–147 | the closed status set and its transitions, status decides population never money, unpaid and suspended states, terminal states and rehire, no silent or deleted status | 5 Must |
| Documents & records | FR-CHR-050,064–069 | statutory letters, employer registers (EV-053), retention (EV-054), e-sign | 4 Must |
| Artefact assembly and documents | FR-CHR-148–152 | the generation manifest, the document state machine incl. the erasure path, the register assembly source map and gap log, the acknowledgement record, the artefact index | 4 Must, 1 Should |
| ESS | FR-CHR-070–078 | Form 124/FBP parity (FBP surface P1, R2), deflection, data-principal requests | 4 Must |
| MSS | FR-CHR-079–082 | approvals, lifecycle initiation | 2 Must |
| Workflows & approvals | FR-CHR-083–092, 105 | maker-checker, effective-dated, audit, RBAC, permissions matrix | 7 Must |
| Change requests, scope and unmasking | FR-CHR-128–132 | the change-request lifecycle, the gated-change catalogue and four-eyes coverage, boundary behaviour, unmask events, scope and the role crosswalk | 4 Must |
| Cross-cutting | FR-CHR-093–098 | scoped bitemporality, audit, data protection (SPDI today, DPDP ~May 2027), residency, readiness, migration (Should, P1) | 5 Must |

Phase mapping in one line each:

- **v1 (files the beachhead, 20–200):** the entire Must set above. That is a single-legal-entity, potentially multi-establishment system of record that derives every statutory eligibility, executes the full hire→confirm→transfer→exit cycle with its statutory side effects, issues appointment letters (in the state-prescribed form where the establishment has 10 or more workers) and maintains the employer registers. It distributes the TRACES-generated Form 130, fenced until the Form 138 Q4 format is released (EV-046), and exposes parity-complete ESS/MSS with maker-checker and a full audit trail. It holds Aadhaar only in a purpose-bound store with exclude-and-flag in operation, records consent as a versioned record behind a staged migration flow, and carries every statutory-impacting change as a maker-checked request. Every statutory eligibility it derives carries an explainer naming the rule version that decided it, every establishment moves through a lifecycle whose closure guard is the filing ledger, every employment carries a status that decides filing population and never an amount, and every generated artefact carries the manifest that makes its reproduction a test rather than a promise.
- **v2 (scales the filing, 200–1,999):** inter-entity/group transfer (FR-CHR-026, 052), all-states PT/LWF, contract-labour depth (FR-CHR-028), SSO/SCIM (FR-CHR-092), the productised CA console (FR-CHR-091), position management, bulk-document monetisation, and manager analytics.
- **Vision (enterprise/regulated):** residency-matrix GA (FR-CHR-096 at scale), works-council/IR scope, and the enterprise identity/audit depth the documentary gates in §05.2 require.

### 07.8a Parity vs differentiation — where this section earns its keep

§21 sets the competitive frame: two incumbents doing two jobs. Tally owns accounting and the statutory artefacts; greytHR owns the HRMS job (K-23). Much of core HR is parity, and the roadmap must not over-invest in table stakes. This map states, per group, what is parity (be complete, do not gold-plate) and what actually differentiates (invest). No row makes a claim about a competitor's behaviour that §21 has not captured and dated.

| FR group | Parity requirement (be complete) | Differentiation (invest here) |
| --- | --- | --- |
| Identity & format validation | Field capture — table stakes | **Validate-to-external-format at entry + readiness report**, so defects surface before filing (FR-CHR-097). |
| Eligibility derivation | PF/ESI eligibility flags — table stakes | **Derived, effective-dated flags** driving contribution-period stickiness and mid-period crossings automatically (Examples A, E). **State PT/LWF derivation is a differentiator.** Frappe HR v16 has no state dimension, LWF, ECR or ESI (EV-031), and TallyPrime has no state PT slab table and no LWF engine (EV-032) — source code and documentation read, not executed (§21). **[Reversed]** v0.3 listed "PF/ESI/PT/LWF exist in Frappe free" as parity (K-01). |
| Dual wage base | Gross-to-net — Frappe's is genuinely strong, so the bake-off is not won here (EV-031) | **Component-level statutory tagging + retro against historical rule version** (Example C). We are not aware of any incumbent in the §21 set implementing the s.2(y) add-back this way, as of September 2026; Frappe's India overrides cover HRA and marginal relief only (EV-031). The hardest calc in the build (§06). |
| Org/establishment | Org chart and reporting hierarchy — table stakes | **Statutory hierarchy separate from management**, enabling correct multi-state PT, including the transfer month (Example B). |
| Lifecycle side effects | State transitions — table stakes | **Executing the statutory side effects** (UAN tracking and linking, the PF joining declaration, the state-form appointment letter, FnF+gratuity+EDLI, date-of-exit marking) rather than just recording the transition. |
| Documents | File storage — table stakes | **Statutory registers + reproducible, effective-dated, immutable artefacts** as filing objects. |
| ESS Form 124/FBP | Declaration and proof workflow — **pure parity**; the freemium players charge for the Form 12BB/124 output (EV-029) | Do not over-build; be complete. |
| Workflows | Approval engine — table stakes | **Maker-checker on statutory fields + effective-dated application + in-jurisdiction audit** — the control a CA and a regulated buyer look for. |
| Migration | Importers — table stakes | **Mid-year cutover integrity (YTD/TDS/UAN continuity) plus the migration consent flow as a product surface** — the wedge off Tally (§16). |

The through-line: the master's *precision, temporality and validation* are the product; the CRUD around it is parity. Invest accordingly.

### 07.8b Requirement-to-test map — FR-CHR-099 to FR-CHR-152

Acceptance criteria are cited by their position in the named list; test scenarios by their IDs. A requirement whose row loses its tests fails the traceability check in CI.

| FR | Acceptance criteria | Test scenarios | Diagram |
| --- | --- | --- | --- |
| FR-CHR-099 | §07.1.3 items 1–2; §07.1.4 | T-AV-1 to T-AV-17 | `fr-core-hr-aadhaar-reveal-sequence` |
| FR-CHR-100 | §07.1.3 item 5; §07.1.5 | T-CN-1 to T-CN-19 | `fr-core-hr-consent-withdrawal-effects` |
| FR-CHR-101 | §07.1.3 items 3–4; §07.1.7 | T-AO-1 to T-AO-17 | `fr-core-hr-aadhaar-exclusion-lifecycle` |
| FR-CHR-102 | §07.1.3 item 6; §07.1.6 | T-MC-1 to T-MC-16 | `fr-core-hr-migration-consent-flow` |
| FR-CHR-103 | §07.1.3 item 7 | T-CN-5; §09's T-EL scenarios | — |
| FR-CHR-104 | §07.1.1 items 8–9; §07.1.1a items 8–10 | T-ID-7, T-ID-14, T-ID-15, T-ID-16, T-ID-18, T-ID-19 | `core-hr-entity-model` |
| FR-CHR-105 | §07.6 items 7–9 | T-CR-1 to T-CR-25; the conformance suite | `fr-core-hr-change-request-states` |
| FR-CHR-106 | §07.1.1a items 1–2 | T-ID-1, T-ID-2, T-ID-9, T-ID-12, T-ID-16, T-ID-17 | — |
| FR-CHR-107 | §07.1.1a items 4–5 | T-ID-3, T-ID-4, T-ID-5 | `fr-core-hr-multi-uan-states` |
| FR-CHR-108 | §07.1.1a items 6–7 | T-ID-6, T-ID-7, T-ID-10, T-ID-11 | — |
| FR-CHR-109 | §07.1.1a item 3 | T-ID-1, T-ID-5, T-ID-9 | — |
| FR-CHR-110 | §07.1.4 items 1–2 and 7 | T-AV-1, T-AV-8, T-AV-13, T-AV-15 | `fr-core-hr-aadhaar-reveal-sequence` |
| FR-CHR-111 | §07.1.4 items 2 and 8 | T-AV-1, T-AV-14 | — |
| FR-CHR-112 | §07.1.4 items 3 and 9 | T-AV-2, T-AV-3, T-AV-11, T-AV-17 | `fr-core-hr-aadhaar-reveal-sequence` |
| FR-CHR-113 | §07.1.4 items 4–6 | T-AV-4 to T-AV-7, T-AV-9, T-AV-10, T-AV-16 | — |
| FR-CHR-114 | §07.1.5 item 1 | T-CN-1, T-CN-2, T-CN-15 | — |
| FR-CHR-115 | §07.1.5 items 2, 3, 6, 9 and 10 | T-CN-3, T-CN-11, T-CN-14, T-CN-16, T-CN-17, T-CN-19 | — |
| FR-CHR-116 | §07.1.5 item 4 | T-CN-4, T-CN-5, T-CN-6 | `fr-core-hr-consent-withdrawal-effects` |
| FR-CHR-117 | §07.1.5 items 5 and 7 | T-CN-7, T-CN-8, T-CN-9 | — |
| FR-CHR-118 | §07.1.5 items 2 and 8 | T-CN-12, T-CN-13, T-CN-18 | — |
| FR-CHR-119 | §07.1.6 items 1, 5 and 8 | T-MC-1, T-MC-2, T-MC-9, T-MC-13, T-MC-14 | `fr-core-hr-migration-consent-flow` |
| FR-CHR-120 | §07.1.6 items 2, 3 and 7 | T-MC-3, T-MC-4, T-MC-5, T-MC-8, T-MC-12, T-MC-14 | `fr-core-hr-migration-consent-flow` |
| FR-CHR-121 | §07.1.6 item 4 | T-MC-6, T-MC-7 | — |
| FR-CHR-122 | §07.1.6 item 6 | T-MC-10, T-MC-15, T-MC-16 | — |
| FR-CHR-123 | §07.1.7 item 7 | T-AO-10 | — |
| FR-CHR-124 | §07.1.7 items 1, 5 and 8 | T-AO-1, T-AO-2, T-AO-6, T-AO-7, T-AO-13, T-AO-15, T-AO-16 | `fr-core-hr-aadhaar-exclusion-lifecycle` |
| FR-CHR-125 | §07.1.7 item 3 | T-AO-3, T-AO-4, T-AO-5, T-AO-17 | — |
| FR-CHR-126 | §07.1.7 item 6 | T-AO-11, T-AO-12 | — |
| FR-CHR-127 | §07.1.7 items 2 and 4 | T-AO-8, T-AO-9, T-AO-14 | `fr-core-hr-aadhaar-exclusion-lifecycle` |
| FR-CHR-128 | §07.6a items 1–3, 10 and 11 | T-CR-1 to T-CR-4, T-CR-7, T-CR-19, T-CR-24, T-CR-25 | `fr-core-hr-change-request-states` |
| FR-CHR-129 | §07.6a item 4 | T-CR-5, T-CR-6, T-CR-16, T-CR-20, T-CR-21 | — |
| FR-CHR-130 | §07.6a item 5 | T-CR-4, T-CR-7 | — |
| FR-CHR-131 | §07.6a items 7–8 | T-CR-9, T-CR-10, T-CR-11, T-CR-18 | — |
| FR-CHR-132 | §07.6a items 6, 9, 12 and 13 | T-CR-8, T-CR-12 to T-CR-15, T-CR-17, T-CR-22, T-CR-23 | — |
| FR-CHR-133 | §07.1.2a items 1–2 and 7 | T-DV-1, T-DV-9, T-DV-10, T-DV-11 | `fr-core-hr-eligibility-derivation` |
| FR-CHR-134 | §07.1.2a items 2 and 7 | T-DV-3, T-DV-6, T-DV-8, T-DV-9 | `fr-core-hr-eligibility-derivation` |
| FR-CHR-135 | §07.1.2a items 3, 6 and 8 | T-DV-1, T-DV-7, T-DV-12 | — |
| FR-CHR-136 | §07.1.2a item 4 | T-DV-4, T-DV-12 | `fr-core-hr-eligibility-derivation` |
| FR-CHR-137 | §07.1.2a item 5 | T-DV-1, T-DV-5, T-DV-6 | — |
| FR-CHR-138 | §07.2b items 1–2 | T-ES-1, T-ES-4, T-ES-5, T-ES-6 | `fr-core-hr-establishment-states` |
| FR-CHR-139 | §07.2b items 5–6 | T-ES-9 | — |
| FR-CHR-140 | §07.2b items 3–4 | T-ES-7, T-ES-8 | — |
| FR-CHR-141 | §07.2b items 1 and 3 | T-ES-2, T-ES-3 | `fr-core-hr-establishment-states` |
| FR-CHR-142 | §07.2b items 7–8 | T-ES-10, T-ES-11, T-ES-12 | — |
| FR-CHR-143 | §07.3.5 items 1 and 8 | T-ST-1, T-ST-2, T-ST-5, T-ST-12 | `fr-core-hr-employment-states` |
| FR-CHR-144 | §07.3.5 items 2–3 | T-ST-3, T-ST-13, T-ST-14 | `fr-core-hr-employment-states` |
| FR-CHR-145 | §07.3.5 items 3–5 | T-ST-3, T-ST-4, T-ST-5, T-ST-6 | — |
| FR-CHR-146 | §07.3.5 item 6 | T-ST-7, T-ST-8, T-ST-9 | `fr-core-hr-employment-states` |
| FR-CHR-147 | §07.3.5 items 7–8 | T-ST-11, T-ST-12 | — |
| FR-CHR-148 | §07.4a items 1–2 | T-DC-1, T-DC-2, T-DC-7 | — |
| FR-CHR-149 | §07.4a items 3, 5, 6 and 7 | T-DC-4, T-DC-5, T-DC-6, T-DC-7, T-DC-8 | `fr-core-hr-document-states` |
| FR-CHR-150 | §07.4a items 4–5 | T-DC-3, T-DC-11, T-DC-12 | — |
| FR-CHR-151 | §07.4a item 9 | T-DC-9 | — |
| FR-CHR-152 | §07.4a item 8 | T-DC-10 | `fr-core-hr-document-states` |

The §07.7b end-to-end scenario exercises FR-CHR-107, FR-CHR-116, FR-CHR-124 and FR-CHR-128 to FR-CHR-132 together, and the §07.7b golden fixtures carry every worked figure in §07.1.1a to §07.1.7 and §07.6a, so a changed rate or rounding rule that moves one of those figures fails a named test.

### 07.9 Explicitly out of scope for this section

To keep the boundary sharp with adjacent sections and prevent scope creep:

- **Payroll computation, statutory calculation and artefact generation** live in §08. Attended portal submission — under the customer's written authority, with the employer's statutory liability non-delegable — lives in §22. This section provides the *fields and effective-dated master* those computations read, and the *readiness checks* that gate them, but not the calculation engine itself.
- **Attendance capture, the ADMS/WDMS device receiver, the biometric template entity and device-side erasure protocol, leave-policy accrual rules and OT ceilings** live in §09. ESS/MSS here *surface and act on* attendance but do not define its engine, and FR-CHR-103 states only the master's side of the biometric boundary.
- **Recruiting (inbound-only, bring-your-own-job-board), performance and talent** are adjacencies phased in §05.5 and specified in §10; the master here holds the candidate→employee conversion target but not the ATS.
- **Legal analysis** of DPDP, SPDI, Aadhaar and the counsel questions cited in this section lives in §23; this section states product behaviour only.
- **Member-side and portal-side procedures** — consolidating two UANs at EPFO, correcting a member's DOJ on the EPFO record, correcting an ESI upload — are not specified. The product records the defect, the decision and the evidence; the procedures are captured through §20 V-23 and run through §22's runbooks once captured.
- **Aadhaar verification of any kind** — offline verification, e-KYC, QR or Verifiable Credential checks — is not built. The store holds numbers only for the catalogue purposes, and any verification design passes the FR-LEG-018 review first (EV-070).
- **The detection engine and the incident pipeline** are §17's and §12's; §07.6a names the signals this section's logs feed and nothing more.
- **AI assistant architecture, model router, cost attribution and monetisation** live in §12–§13 (monetisation in §18); this section names where the assistant surfaces (ESS helpdesk, MSS analytics) and asserts rules-first grounding, but does not specify the AI stack.
- **Benefits monetisation** — dependant and nominee records are in scope as part of the P0 core-HR system of record (§05.5 item 10), and the FBP data model is P1 (item 18) because it is expensive to retrofit (§11); the monetisation decision is explicitly deferred.
