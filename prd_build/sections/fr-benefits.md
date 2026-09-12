## 11. Functional Requirements — Benefits Attach

This section specifies what v1 builds for employee benefits, and — just as important — what it deliberately does **not** build. The PRD's position is settled in the front matter and in §05: *build the benefits data model now, defer the monetisation.* This section turns that one sentence into a data model, entity lifecycles, a deterministic perquisite-valuation catalog, a set of functional requirements, a partner-integration surface, and acceptance criteria — without letting a single unvalidated revenue number cross into a forecast.

The strategic frame is inherited, not re-argued here:

- **[Verified]** Zaggle — the most legible listed Indian player in benefits/FBP cards, though **not** a benefits pure-play (employee benefits is one of three legs; corporate procurement is its stated growth driver) — earns **5.3% of net revenue (2.4% of gross) from software**; the rest is money movement — interchange, network incentives and bank referral fees (Source: Zaggle Q4FY26 investor presentation, FY26 standalone: gross revenue ₹1,852.8 Cr, +42.2%; PAT ₹132.9 Cr — exchange-filed disclosure, r2 capture 2026; research r2/02). Attach *revenue* is large; attach *profit* is not — whole-company adjusted EBITDA is 9.9% of gross revenue (≈₹39 per user per month — blended across corporate spend and a user count that includes channel partners, so never a benefits unit economic).
- **[Killed]** The ₹161/user/month "money-movement per employee" figure (contaminated denominator) and the "₹150–500 PEPM at a 1.5–5% take rate" band (take rate borrowed from another company) are banned from every model and deck (Source: §20.4).
- **[Hypothesis]** (EV-019 — the figures concur across two dated professional sources and a counsel spot-check; the instrument's identity is confirmed but its rule text was not read) Effective **1 April 2026**, the Income-tax Rules 2026 (G.S.R. 198(E), 20.03.2026) raised the tax-free meal perquisite from ₹50 to **₹200 per meal** and the gift/voucher nil-value threshold from ₹5,000 to **₹15,000 during the tax year** — a ~3.8× loadable-wallet expansion, now reaching the new regime too (Source: KPMG flash alert 2026-081 and Taxmann, via research r2/02 and r2/10; new-regime availability rests on professional commentary — tax counsel to confirm; §20.6 V-18 via §11.19 B9). The engine ships the figures as effective-dated parameters, never as a customer-facing citation, until V-18 reports. The ratio is robust (3.7–3.9× at one to three meals a day); the absolute wallet is not, because the Rules cap per meal, not meals per day. The exemption holds **only with its conditions enforced as engine constraints** — meals during working hours at office or factory premises, or non-transferable vouchers usable only at eating outlets (BEN-62); without them the perquisite is taxable, payslips under-deduct, and the demand plus interest lands on the employer. **[Reversed]** v0.3 cited the 1962 Rules' Rule 3(7)(iii) "for AY2026-27"; those Rules do not govern periods from 1 April 2026 (Tax Year 2026-27, EV-050), and the 2026-Rules citation is routed to §20 rather than guessed. This is a live *configuration* value in v1, not a monetisation lever.

So: v1 ships the **enrollment, declaration, dependant, nominee, wallet-configuration, proof-of-spend, gratuity-accrual and endorsement-history data model** as first-class objects, wired into the payroll engine's perquisite and tax computations, with a partner-integration *surface* that carries no payment rail and takes no float. Monetisation (interchange, broker override, NPS POP fees, card float) is a v2 decision gated by the §20 validation programme, and it is modelled as a line that is **never blended** with software PEPM.

<!-- DIAGRAM: benefits-attach-overview -->

**Statutory vocabulary for this section — read before any citation below.** The Income-tax Act 2025 has governed since 1 April 2026 (Tax Year 2026-27); it repealed the 1961 Act (s.536(1)), and the Income-tax Rules 2026 replaced the 1962 Rules (research r5/04, r2/10). This section applies the CBDT mappings in EV-050 — s.192 → **s.392**, Form 16 → **Form 130**, Form 12BA → **Form 123**, Form 12BB → **Form 124**, Form 24Q → **Form 138**, "Financial Year" → **"Tax Year"** — and the product accepts both vocabularies in search, imports, labels and help (EV-050). One deduction mapping is also research-backed: s.80C → **s.123** of the 2025 Act, limit ₹1,50,000, read with Schedule XV, from 1 April 2026 (**[Verified]** — research r3/02 finding 19, confirmed against the Income Tax Department's own site); which items Schedule XV admits (VPF included) is not captured (B9). Every *other* bare "s." or "Rule" citation below (s.10(5), s.10(10), s.17(2), s.80C, s.80CCD, Rules 2B, 3, 3B, 9D and the rest) is to the 1961 Act or the 1962 Rules: the governing text for periods to 31 March 2026, and the vocabulary practitioners still use. For Tax Year 2026-27 onward, its successor provision — and whether the value carried over unchanged — is **not mapped in this PRD** unless a row says so; each such value is an effective-dated rule object whose 2026 citation stays null until §20 fills it (§11.19 B9). **Provenance of the 1961/1962 values.** Research rounds r1–r5 re-captured only the 1 April 2026 meal, gift, transport and children's-education changes (r2/02, EV-019), the new-regime default and slab tables (r1/06), the form and section mapping (EV-050), the s.80C → s.123 mapping and its limit (r3/02) and the add-back (EV-010). Every other 1961-Act or 1962-Rules value in this section — the §11.5 catalog rows, the s.80CCD ceilings, the ₹7.5 lakh aggregate and Rule 3B, the PF-interest threshold and Rule 9D, LTA and Rule 2B, the standard deduction, the gratuity tax-exemption ceiling — is **carried from v0.3, not re-captured**, and is marked **[Hypothesis]** here, matching §06.13's "carried, not re-captured" register. Each is a named effective-dated parameter (§11.20) and is re-read at primary source under B9 before it reaches a customer-facing artefact. A **[Verified]** marker in this section is used only where a Part C entry, a registered EV row or a named research finding stands behind it. Two cautions from the research: a circulated table of raised 2026-27 motor-car values was retracted for want of any notification citation (r1/06), and the later alert that confirms the meal, gift, transport-allowance and children's-education changes says nothing about motor cars (r2/02) — so the Tax Year 2026-27 motor-car values are *unknown*, not *unchanged*. "FY" below means the tax year for any period from 1 April 2026.

---

### 11.1 Why data-model-first, monetisation-deferred

This is the load-bearing sequencing decision of the section, and it is item 18 in the v1 module sequence (§05.5), rated **P1** with the rationale "build the data model, defer monetisation; retrofitting into a shipped engine is expensive; it is option value on the whole attach business."

There are four independent reasons the data model must exist in v1 even though no benefits revenue is booked in v1.

**1. The perquisite tax computation needs it regardless of monetisation.** The moment an employer gives an employee a meal card, a company-paid group-health premium, an NPS employer contribution or an FBP restructure, the payroll engine must value the perquisite under the perquisite-valuation rules, apply the correct exemption, and reflect it in salary TDS under s.392 (ex-s.192) and in the Form 138 Annexure II salary data from which TRACES prepares Form 130 (ex-Form 16) (EV-047, EV-048, EV-050). **A benefit the payroll engine cannot see is a benefit it mis-taxes.** The multiple concurrent wage bases (§08.1, I1) already force several wage computations per employee per period; benefits add perquisite valuation on top. This is not optional and it is not monetisation — it is correctness. **[Verified]** for the artefact chain (EV-047, EV-048, EV-050); the valuation provisions themselves (1961 Act s.17(2); 1962 Rules r.3) are carried, not re-captured — **[Hypothesis]**, successors per the vocabulary note.

**2. Retrofitting these models into a shipped payroll engine is expensive.** Benefits touch the employee master (dependants, nominees), the CTC structure (FBP components change gross), the tax engine (perquisite valuation, exemption tracking across LTA block years and tax years), the payslip (component lines), the tax artefacts (the Form 138 Annexure II salary data and the Form 123 (ex-12BA) perquisite statement) and the audit trail (declaration → proof → approval → payout). Adding a foreign key to a live payroll ledger that has already run for thousands of employee-months is a migration, not a feature. Building the tables empty in v1 costs a schema; adding them in v2 costs a data migration plus a re-computation of historical perquisites. **[Hypothesis]** The retrofit-cost differential is an engineering judgement, not a measured figure — *kill/validate:* if a v2 schema-addition spike shows the migration is cheap (under one engineer-week for a 200-employee tenant with two prior tax years of history — a pre-registered decision threshold set by the product owner, not a measured or sourced figure), this rationale weakens and the model could defer. It is directionally the same argument the PRD makes for the dual wage base and cost attribution (§05.5), both built early for identical reasons.

**3. It is the option value on the entire attach business.** If the §20 programme later shows that Indian 50–200 employers will pay for a broker override or an NPS POP relationship, we can turn it on against a populated data model in weeks. If we skip the model, we forfeit the option and re-underwrite it later at full cost. Building the model is cheap insurance on a large-but-low-margin adjacency we have chosen not to enter yet.

**4. It de-risks the one dated regulatory window we already know about.** The 1 April 2026 meal/gift expansion (~3.8× wallet) is live. A tenant that wants to restructure FBP to use the new ₹200/meal and ₹15,000/gift headroom needs the wallet-configuration and proof-of-spend model to exist — and needs the qualifying conditions enforced by the engine, not left to the tenant (BEN-62, BEN-63). Shipping the model lets us *support* the expansion as a compliance feature without *monetising* it — exactly the posture the PRD wants.

**The guardrail.** Everything in this section is architecture and correctness. **No FR here introduces a payment instrument, takes custody of funds, earns interchange, or books attach revenue.** Those are v2, gated on §20, and specified as explicitly out of scope in §11.14. Model software PEPM and attach revenue as two separate lines that are never blended (Source: §18.5; research r2/02).

<!-- DIAGRAM: data-model-first-rationale -->

---

### 11.2 The benefits domain model

The domain splits into three benefit *families*, each with a distinct statutory and partner profile, plus one cross-cutting concern (retiral-contribution aggregation) that spans two of them. A fourth column of the benefits estate is **statutory** rather than voluntary — gratuity, owed from 10 employees with a twelve-month latch (§06.6), and EDLI, which rides with EPF coverage from 20 (EV-057; §06.1) — and it shares the nominee/accrual machinery; §11.7 treats it explicitly.

| Family | Examples | Statutory anchor | Money movement in v1 | Partner type |
| --- | --- | --- | --- | --- |
| **Insurance (group)** | Group Mediclaim (GMC), Group Personal Accident (GPA), Group Term Life (GTL), top-up/voluntary parental cover | s.17(2) perquisite valuation of employer-paid premium; IRDAI group health regime | **None** — endorsement data only; premium paid by employer to insurer/broker directly | Insurer / TPA / broker |
| **Retiral (voluntary, on top of statutory)** | Corporate NPS (Tier I), Approved Superannuation Fund, Voluntary PF (VPF) | s.80CCD(2), s.80CCD(1B), s.17(2)(vii)/(viia) aggregate cap; PFRDA + CBDT | **None** — contribution file generated; funds move employer→CRA/trustee | NPS CRA (Protean/KFintech), superannuation trustee/insurer |
| **Flexi-benefits (FBP)** | Meal card, fuel & vehicle maintenance, driver salary, telephone/internet, LTA, books & periodicals, gadget/asset, professional development, uniform | s.10(5) LTA, Rule 3(7) sub-clauses, Rule 3(2) motor car, Rule 3 perquisite valuation | **None in v1** — declaration, proof and payslip line only; card issuance/float is v2 | Card issuer / PPI (deferred) |
| **Statutory terminal/death benefit** | Gratuity accrual, EDLI (Employees' Deposit-Linked Insurance) | Code on Social Security 2020 ss.53–56 (the Payment of Gratuity Act 1972 is repealed — §06.6); EDLI Scheme 1976, saved only to on or about 21 Nov 2026 (§06.9) | **None** — accrual + nomination only; gratuity paid on exit, EDLI by EPFO | EPFO; gratuity trustee/LIC (if funded) |

The **entities** below are the v1 schema. They are deliberately partner-agnostic and monetisation-agnostic: every table can be fully populated and fully used by the tax engine without any partner integration being live and without any money moving.

<!-- DIAGRAM: benefits-data-model-erd -->

| Entity | Key attributes (illustrative, not exhaustive) | Owns / references | Why it exists in v1 |
| --- | --- | --- | --- |
| `benefit_scheme` | scheme_id, family (insurance/retiral/flexi/statutory), name, provider_ref (nullable), policy_number (nullable), coverage_config (JSON), sum_insured_grid, effective_from, effective_to, tenant_id | tenant | The employer-level offer. Effective-dated so plan-year rollovers and mid-year re-brokering are first-class, not overwrites. |
| `benefit_enrollment` | enrollment_id, scheme_id, employee_id, status (proposed/active/suspended/terminated), sum_insured or contribution_rate, employee_share, employer_share, effective_from, effective_to | employee, benefit_scheme | The employee↔scheme link. Effective-dated for mid-year joins/exits; drives premium/contribution and perquisite. |
| `dependant` | dependant_id, employee_id, relation (spouse/child/parent/parent-in-law), dob, gender, is_covered, aadhaar_token (nullable, opaque — never the number or a hash), disability_flag, disability_consent_ref, enrollment_ref | employee | Group health covers dependants; parents/in-laws are a common paid top-up. Also reused by ESI/statutory (§06) and by nominee logic. `dob` drives child age-out (BEN-08) and ESI dependant eligibility. `aadhaar_token` points into the §07 Aadhaar token store (FR-CHR-099) and is optional — no enrollment is conditioned on it (FR-CHR-101; Part D-10). `disability_flag` is health data under SPDI r.3(iii), so it is stored only once `disability_consent_ref` names a written-consent record (EV-060; FR-CHR-100). |
| `nominee` | nominee_id, employee_id, scheme_ref (EPF/EPS/gratuity/EDLI/GTL/superannuation/NPS), name, relation, share_pct, is_minor, guardian_ref, dob, form_ref (per instrument version) | employee | Distinct from dependant: nomination is per-scheme and legally load-bearing for retiral, gratuity and life cover. Shares must sum to 100% per scheme. This is the same record §07 owns as `nomination` (FR-CHR-044, FR-CHR-075) — benefits read and extend it, never fork it. |
| `fbp_component_config` | component_id, tenant_id, name, tax_rule_ref, rule_ref_2026 (null until §20 confirms), annual_cap, monthly_cap, proof_required (bool), qualifying_conditions (JSON — e.g. meal delivery mode and voucher attestations, BEN-62), new_regime_exempt (per period), exemption_section, valuation_method, effective_from | tenant | The employer's flexi menu. `tax_rule_ref`, `annual_cap` and `qualifying_conditions` are effective-dated so the 1-Apr-2026 meal/gift change is a config edit, not a code change — but a cap without its conditions never produces an exemption (BEN-62, BEN-63). |
| `fbp_declaration` | declaration_id, employee_id, tax_year, component_id, declared_amount, status (draft/submitted/locked), submitted_at, regime_at_submit | employee, fbp_component_config | The employee's opt-in allocation of CTC into flexi components for the tax year ("Financial Year" for periods to 2025-26 — EV-050). Locks with the Form 124 (ex-12BB) investment-declaration cycle (§08.6, FR-PAY-503). `regime_at_submit` snapshots the regime the menu was filtered against. |
| `proof_of_spend` | proof_id, declaration_id, amount_claimed, amount_approved, document_ref, period, verifier_id, status (pending/approved/rejected/query), decided_at, reject_reason | fbp_declaration | The evidence that converts a declaration into a tax-exempt reimbursement. Approval state drives the taxable-vs-exempt split on the payslip. The adjudication fields are bitemporal tax inputs; the uploaded bill behind `document_ref` is an erasable document (design rules below). |
| `wallet_config` | wallet_id, tenant_id, component_id, instrument_type (meal/fuel/gift), monthly_cap, per_txn_cap, per_meal_cap, non_transferable (attested), eating_outlet_only (attested), attested_by, attested_at, provider_ref (nullable), effective_from | tenant, fbp_component_config | Configuration only in v1. `provider_ref` is the hook for a future card issuer; null means "no integrated issuer" — vouchers bought under the employer's own issuer contract are *recorded* (`wallet_transaction`, §11.9.1), not issued, and fuel and telephone heads run as reimbursement. The two attestation flags are the voucher conditions BEN-62 enforces. |
| `benefit_endorsement` | endorsement_id, scheme_id, endorsement_type (add/delete/modify member, add dependant, sum-insured change), employee_id, dependant_ref, requested_at, sent_at, ack_ref, batch_id, status | benefit_scheme, employee, dependant | The append-only history of every change sent to (or received from) an insurer/TPA. This is the artefact auditors and TPAs reconcile against. |
| `contribution_instruction` | instr_id, scheme_id, employee_id, period, employer_amount, employee_amount, vehicle (NPS/superann/VPF), pran_or_ref, file_batch_id, status | employee, benefit_scheme | The per-period, per-vehicle contribution record. Feeds the CRA/trustee upload file and the retiral-cap aggregation (§11.10). |
| `retiral_contribution_ledger` | ledger_id, employee_id, tax_year, epf_employer, nps_employer, superann_employer, aggregate, cap_breach_amount, cumulative_excess, rule3b_accretion, source_return_refs | employee | The cross-vehicle aggregation that computes the ₹7.5 lakh s.17(2)(vii) cap breach and the Rule 3B accretion. Derived, but persisted for audit and for the stateful across-year accretion. `source_return_refs` names the approved ECR returns the EPF figure came from (BEN-43). |
| `gratuity_accrual` | accrual_id, employee_id, as_of_date, completed_years, last_drawn_wages, accrued_amount, payment_ceiling_ref, tax_exempt_ceiling_ref, funded_flag, nominee_ref | employee | Gratuity accrues from 10 employees (§06.6) and is a balance-sheet liability + a nomination artefact well before any exit. Persisted per period so the liability is auditable and the exit computation is deterministic. The two ceiling references point at effective-dated parameters, because no Code-era notification of the payment ceiling has been located as of September 2026 (BEN-17). |

**Design rules that apply to the entities above:**

- **Bitemporal by entity class, not universally.** Bitemporality is scoped by entity class (Part E-2; §14 owns the class list and the erasure mechanism, §07.2a the replay behaviour). **Bitemporal — effective-dated, never overwritten, replayable:** the rules and structures (`benefit_scheme`, `fbp_component_config`, `wallet_config`), the salary-structure election (`fbp_declaration`), the assignments (`benefit_enrollment`), the statutory attributes (`nominee`, and the coverage facts on `dependant` — relation, dob, coverage window), the adjudication fields of `proof_of_spend`, and the derived statutory records (`contribution_instruction`, `retiral_contribution_ledger`, `gratuity_accrual`). A plan year changes, a broker changes, an FBP cap changes — each is a new effective-dated row, so a retro payroll run recomputes perquisites against the rule/plan in force *for the period being corrected*, not today's. **Not bitemporal — erasable:** uploaded proof documents (the bill behind `proof_of_spend.document_ref`), rendered endorsement and nomination files, consent artefacts (FR-CHR-100), Aadhaar token-store entries (FR-CHR-099), and a dependant's SPDI-sensitive attributes (`disability_flag`), which are encrypted under a per-subject key. Erasure is crypto-shredding of that key, or a tombstone where the record is not encrypted per subject (§14). **Replay after an erasure returns the tombstone** — record id, class, dates, erasure basis, actor — never a reconstruction; a tax computation that consumed an erased document replays from the inputs the run recorded (the approved amount), not from the bill. **[Reversed]** v0.3 made every benefits entity never-forget (K-24; EV-K35). **[Verified]** justification for the bitemporal classes: the statutory add-back rule is already required to be versioned, effective-dated and retrospectively recomputable with an audit trail (§06.10); benefits inherit the same engine.
- **Perquisite valuation is deterministic, never model-generated.** Every rupee of taxable perquisite is computed by the rules engine, not by the LLM. This is the §08 "no statutory or monetary figure may ever be model-generated" rule applied to benefits. **[Verified]** (Source: §08.1; §12.1.)
- **Append-only audit for anything sent to a third party.** `benefit_endorsement` and `contribution_instruction` are event logs, not mutable state — because the TPA's and the CRA's records are the source of truth we reconcile against, and a dispute six months later must replay exactly what we sent and when.
- **Sensitive fields are protected at rest — classified under the SPDI Rules, not "under DPDP".** DPDP creates no sensitive category of personal data (s.2(t), EV-059) — **and** the SPDI Rules 2011 are live today: r.3 classes financial information and biometric information as sensitive (EV-060), and also physical, physiological and mental health condition (r.3(iii)) and medical records and history (r.3(v)) (rule text in research r4/01). So a dependant's `disability_flag` is SPDI-sensitive, and r.5(1) requires consent in writing before it is collected (EV-060); whose consent and who owes the duty are counsel questions (Part D-4, §23), so the product records the artefact in whichever name counsel settles (FR-CHR-100). The consent record carries its regime, and two regimes run concurrently: SPDI written consent today, and DPDP once its substantive provisions commence on or about 13 May 2027 (EV-058). The switch is a new consent-record version under FR-CHR-100, never a rewrite of the SPDI artefact; how DPDP treats this employment-context health data is §23's question, not settled here. Aadhaar lives only in the separate token store (FR-CHR-099); `dependant.dob` and health-scheme membership are encrypted, role-gated and access-logged, with ICT logs held in India for 180 days (EV-062; §17.6). **[Reversed]** v0.3 called these fields "DPDP-sensitive" (K-06; EV-K17).

**Relationship to existing payroll entities (no duplication).** Benefits do not fork the employee master. `dependant` is the *same* table the ESI module reads for insured-dependant eligibility (§06.3); `nominee` is the *same* nomination record §07 owns (`nomination`, FR-CHR-044) that the statutory engine already needs; the EPF employer figure feeding `retiral_contribution_ledger` is read from the approved ECR returns, not re-derived (BEN-43). The benefits model is an *extension* of the payroll data model, not a parallel one — which is precisely why it is cheap to build now and expensive to bolt on later.

#### 11.2.1 Dependant and coverage history — field-level definitions

The entity table above names the dependant's attributes. This subsection fixes what a build team needs in order to create the tables: type, nullability, validation, the §14.6.1a entity class (**B** bitemporal, **R** record of fact, **E** erasable), the §14.5 classification (C1–C4) and where the value comes from. One structural change follows from doing the field work: **coverage is a relationship, not an attribute.** A parent can sit on the employer-paid parental top-up while the spouse sits on the base GMC policy, and a child can leave one policy at its age limit while staying on another. So the coverage window lives in its own row, `dependant_coverage` — one per dependant per enrollment per window. `dependant.is_covered` and `dependant.enrollment_ref` (§11.2) become read-model projections of the open coverage rows and are never written directly.

**`dependant` — facts about a covered or coverable person.** Facts only. Each scheme applies its own eligibility predicate to them (the ESI note in §11.4), so no field below encodes an insurer's or a statute's rule.

| Field | Type | Null | Validation | Class | Classification | Source |
| --- | --- | --- | --- | --- | --- | --- |
| `dependant_id` | Opaque id | No | Generated; never reused, including after erasure | B | C4 | System |
| `employee_id` | FK to the employment (§14.4.2) | No | Same tenant as every enrollment the dependant is covered under | B | C3 | System |
| `relation` | Enum: spouse, child, parent, parent_in_law | No | A new value is a product release, not a tenant edit; which relations a policy covers is `coverage_config`'s | B | C2 | Employee or HR admin |
| `full_name` | Text | No | As the insurer's census needs it; never used as a match key (§11.2.2) | B | C2 | Employee |
| `dob` | Date | No | Not in the future; for a child, not after `relation_start_date` | B | C2 — encrypted, role-gated, access-logged (§11.2 design rules) | Employee; evidence per tenant policy |
| `gender` | Enum from the §07 master vocabulary | Yes | — | B | C2 | Employee |
| `relation_start_date` | Date | Yes for parents and parents-in-law; otherwise No | Date of marriage for a spouse; date of birth or adoption for a child | B | C2 | Employee |
| `relation_end_date`, `relation_end_reason` | Date; enum: death, relation_ended | Yes | End not before start | B | C2 | Employee or HR admin, with evidence |
| `aadhaar_token` | Opaque token | Yes | Never the number or a hash; resolves only inside the token store (FR-CHR-099); never a condition of coverage (FR-CHR-101; Part D-10) | E (token-store entry) | Not held in business tables | Employee, by choice |
| `disability_flag` | Boolean | Yes | Refused unless `disability_consent_ref` names a live written-consent record (BEN-03; BV-23) | E — encrypted under the subject key | C1 — SPDI r.3(iii) health data (EV-060) | Employee, after written consent |
| `disability_consent_ref` | FK to `consent_record` (FR-CHR-100) | Yes | The consent's version, regime and whose artefact it is live on the consent record, not here | E | C1 | Consent flow |
| `source_evidence_ref` | FK to a `Document` | Yes | Tenant policy decides, per relation, whether evidence is required | E (rendered document) | C2 | Employee upload |
| `is_covered`, `enrollment_ref` | Projection | — | Derived from open `dependant_coverage` rows; a direct write is refused | — | C2 | Derived |
| `valid_from`, `valid_to`, `recorded_at`, `version` | Bitemporal axes | `valid_to` Yes | Valid time is when the fact held; `recorded_at` is when we learnt it | B | C4 | System |

**`dependant_coverage` — one dependant, on one enrollment, for one window.**

| Field | Type | Null | Validation | Class | Classification | Source |
| --- | --- | --- | --- | --- | --- | --- |
| `coverage_id` | Opaque id | No | — | B | C4 | System |
| `dependant_id` | FK | No | Same employee as the enrollment | B | C4 | System |
| `enrollment_id` | FK to `benefit_enrollment` | No | Enrollment `active` or `suspended` on `valid_from` | B | C4 | System |
| `valid_from`, `valid_to` | Dates | `valid_to` Yes | Inside the enrollment's own window; never overlapping another row for the same dependant and enrollment | B | C2 | Requested date, replaced by the insurer-confirmed date as a new version (CV4) |
| `coverage_state` | Enum: requested, confirmed, rejected, ended | No | Transitions per §11.3.1 only | B | C4 | Endorsement acknowledgements |
| `requested_by_line` | FK to `benefit_endorsement` | No | The line that asked for the cover | B | C4 | System |
| `confirmed_by_ack` | Text — the insurer's or TPA's acknowledgement reference | Yes | Required for `confirmed` | B | C4 | Insurer / TPA |
| `insurer_member_ref` | Text | Yes | Unique per scheme among open rows | B | C2 | Insurer acknowledgement |
| `sum_insured` | Money, in paise | Yes | Resolved from the scheme's grid where the policy insures per life (BEN-16) | B | C1 | Scheme configuration |
| `premium_basis_ref` | FK to the insurer's premium schedule row for this life | Yes | Required only where the premium is a taxable perquisite (BEN-13) | B | C1 | Insurer schedule or acknowledgement (BEN-71) |
| `recorded_at`, `version` | Transaction axis | No | — | B | C4 | System |

**`dependant_life_event` — the dated fact that opens, or closes, a coverage window.**

| Field | Type | Null | Validation | Class | Source |
| --- | --- | --- | --- | --- | --- |
| `event_id`, `dependant_id` | Ids | No | — | R | System |
| `event_type` | Enum: birth, adoption, marriage, death, relation_ended, correction, disability_consent_given, disability_consent_withdrawn | No | `correction` must reference the event it corrects | R | Employee or HR admin |
| `event_date` | Date | No | Not in the future | R | Employee, with evidence per tenant policy |
| `window_evaluation` | List of (scheme_id, within_window, window_rule_version) | No | Computed when the event is recorded, against each scheme's `addition_window_days.<event_type>` (BEN-12) | R | Derived, then frozen |
| `evidence_ref` | FK to a `Document` | Yes | Tenant policy | E | Employee upload |
| `actor`, `recorded_at` | Actor; timestamp | No | NTP-synced (FR-CHR-089) | R | System |

The event is a record of fact: a wrong event is corrected by a `correction` event that references it, never edited. Its window evaluation is frozen when the event is recorded, so a later change to a policy's addition window neither reopens nor closes a past addition silently.

**The scheme's family-definition rule — `benefit_scheme.coverage_config`.** The facts are shared; the predicate is per scheme. Every key below is a term of the insurer or TPA agreement, entered per policy with the agreement as its source. The product ships **no default** for any of them because none is statutory (BEN-08). A rule that needs a missing key refuses the action and names the key (BEN-68); it never behaves permissively.

| Key | Meaning | Read by |
| --- | --- | --- |
| `max_spouses`, `max_children` | How many spouses and children the family definition covers (the "1+X" rule) | BEN-03, BV-19 |
| `child_age_limit`, `child_age_test` | The age at which a child leaves cover, and whether it is tested at renewal or on the birthday | BEN-08, BV-21 |
| `parents_allowed`, `parents_in_law_allowed` | Whether each relation is coverable on this policy | BEN-03, BV-19 |
| `parents_or_in_laws_exclusive` | Whether a member may cover parents or parents-in-law, but not both | BV-22 |
| `addition_window_days.<event_type>` | Days after a birth, adoption or marriage within which a mid-term addition is accepted | BEN-12, CV1 |
| `suspension_endorsement_type` | Whether a suspension is sent as modify-member or delete-member (BEN-07) | §11.6.1 |
| `allow_cross_employee_dependant` | Whether one person may be covered as a dependant of two employees | BEN-67 |
| `sum_insured_basis` | Grade grid, salary multiple or flat | BEN-16 |
| `premium_basis` | Per life, per family or per employee — decides how an employer-paid taxable premium is apportioned to a person (BEN-13) | BEN-13, §11.9.5 |
| `premium_heads` | The policy's premium components, each with the relations it covers and the employer's share — facts the §11.5 insurance-premium row values; the tenant never chooses a tax treatment | BEN-13 |
| `endorsement_cycle` | Batching cadence agreed with the insurer | BEN-10, EB1 |
| `endorsement_ack_sla_days` | As BEN-11 | BEN-11, EL8 |
| `census_field_set`, `insurer_adapter_id` | The fields this insurer's census carries, and the adapter that renders them | BEN-50, BEN-55 |

**Dependant health data — whose written consent, and what withholding it does.** The disability flag describes the dependant, not the employee. Whose written consent SPDI r.5(1) requires for it, and who owes that duty — employer or vendor — is a counsel question (Part D-4; §23), so the product builds every capture form and records the artefact in whichever name counsel settles (FR-CHR-100).

| Capture form | For | Recorded on `consent_record` |
| --- | --- | --- |
| The dependant's own written consent | An adult dependant | Data principal and artefact: the dependant |
| A guardian's written consent | A minor child | Data principal: the dependant; artefact: the guardian's, with the guardian's relation |
| The employee's written consent on the dependant's behalf | Only where counsel settles that it suffices | Data principal: the dependant; artefact: the employee's, marked "on behalf" |

Which forms a tenant may use is the setting `dependant_health_consent_forms`, owned by the legal lead; the on-behalf form ships disabled until §23's counsel register records an answer. Withdrawal acts forward only: the flag stops being usable from the withdrawal, its E-class value is erased by crypto-shredding when the retention engine decides (§14.7.2), and coverage is unaffected — a policy rule that turns on disability goes to the operator as a manual exception (BEN-03). When DPDP's substantive provisions commence on or about 13 May 2027 (EV-058), the regime change is a new consent-record version, never a rewrite of the SPDI artefact (FR-CHR-100).

**Nomination history.** The nomination record is §07's (FR-CHR-044, FR-CHR-075); benefits read and extend it (§11.2). The benefits requirement on it is one question the history must answer: *which nomination set was in force for scheme S on date D, as recorded at time T?* The set that routes a death benefit is the set in force on the date of death, not today's. Nomination sets are B-class — a new set supersedes, never overwrites — and the rendered form is an E-class document that re-renders from the set.

#### 11.2.2 Endorsement history — batch, line and reconciliation records

`benefit_endorsement` (§11.2) is the **line**: one change, for one person, on one policy. Lines travel to the insurer in a **batch**, and the insurer's census comes back as a **reconciliation**. All three are R-class records of fact — appended, never edited, corrected by a new record that references the old one. A line's or batch's state is the latest of its appended transition events (§11.2.5); its payload is frozen once validated. That is Part E-1's "a diff, never a mutation", applied to what we tell a third party. The file a batch renders is an E-class document; the lines keep what was sent, so a dispute survives the file's erasure.

**`endorsement_batch`**

| Field | Type | Null | Validation | Class | Classification |
| --- | --- | --- | --- | --- | --- |
| `batch_id` | Opaque id | No | Stable across resends (BEN-10) | R | C4 |
| `scheme_id` | FK | No | — | R | C4 |
| `adapter_id`, `adapter_version` | Ids | No | The adapter that rendered the file (BEN-50) | R | C4 |
| `cycle_key` | Policy + cycle period | No | Unique per scheme; a second batch in the same cycle is a supplementary batch with its own id | R | C4 |
| `state` | Enum: assembling, sealed, sent, acknowledged, partially_acknowledged, closed | No | Transitions per §11.3.1 | R | C4 |
| `line_count` | Integer | No | Equals the lines carried | R | C4 |
| `payload_sha256` | Hash | Yes until sealed | Set at seal over the canonical payload; a resend sends byte-identical content | R | C4 |
| `file_document_ref` | FK to a `Document` | Yes | E-class; re-renders from the lines and is checked against `payload_sha256` | E | C2 |
| `sealed_at`, `sealed_by` | Timestamp; actor | Yes until sealed | — | R | C3 |
| `sent_at`, `sent_by`, `sent_channel` | Timestamp; actor; enum per adapter — upload, e-mail or a published interface | Yes until sent | The channel is whatever the insurer accepts; never assumed (B3) | R | C3 |
| `ack_ref`, `ack_received_at` | Text; timestamp | Yes | — | R | C4 |

**`benefit_endorsement` — the line, field by field**

| Field | Type | Null | Validation | Class | Classification |
| --- | --- | --- | --- | --- | --- |
| `endorsement_id` | Opaque id | No | — | R | C4 |
| `batch_id` | FK | Yes until batched | A line belongs to at most one batch | R | C4 |
| `scheme_id`, `employee_id`, `dependant_ref` | FKs | `dependant_ref` Yes | `dependant_ref` required for the three dependant types | R | C3 |
| `endorsement_type` | Enum: add_member, delete_member, modify_member, add_dependant, delete_dependant, modify_dependant, sum_insured_change, correction | No | Chosen by the §11.6.1 decision table, never by hand | R | C4 |
| `effective_date` | Date | No | Inside the policy period | R | C3 |
| `reason_code` | Enum: joiner, leaver, suspension, reactivation, life_event, age_out, grade_change, esi_boundary, data_correction, insurer_confirmation | No | — | R | C4 |
| `source_event_ref` | Reference to the enrollment transition, life event or coverage change that caused the line | No | No line without a cause | R | C4 |
| `corrects_line` | FK to `benefit_endorsement` | Yes | Set only on `correction` lines | R | C4 |
| `census_payload` | The fields sent for this person, per the policy's `census_field_set` | No | Frozen at `validated`; encrypted under the subject key; hashed into the batch payload | R | C2 |
| `state` | Enum: drafted, held, validated, sent, acknowledged, rejected, premium_adjusted, superseded, reversed, cancelled | No | Transitions per §11.3.1 | R | C4 |
| `attempt_count` | Integer | No | Increments on each resend (EL8) | R | C4 |
| `insurer_line_ref`, `insurer_reject_text` | Text | Yes | Stored as received | R | C2 |
| `premium_delta`, `premium_delta_ref` | Money, in paise; text | Yes | The premium change the insurer states for this line — informational; the product never bills, collects or pays it (BEN-52) — and the input BEN-13 values from where the premium is a taxable perquisite (BEN-71) | R | C1 |
| `recorded_at` | Timestamp | No | — | R | C4 |

**`census_reconciliation` and `census_diff_line`.** One reconciliation per imported insurer or TPA census (BEN-15): `recon_id`, `scheme_id`, `insurer_file_document_ref` (E-class), `as_of_date`, `imported_at`, a count per category below, `unexplained_count`, `exceeds_tolerance` (against `census_drift_tolerance`), `reviewed_by`, `closed_at`. One diff line per difference: `diff_id`, `recon_id`, `category`, `our_ref` (coverage or enrollment id), `their_ref` (the insurer's member reference or file row), `field`, `our_value`, `their_value`, `explained_by` (an in-flight line that accounts for it, if any), `resolution` (endorsement_raised, insurer_to_correct, accepted_with_reason), `resolved_by`, `resolved_at`. Both are R-class.

**Match keys.** A census row matches our coverage row on `insurer_member_ref` where both sides carry it; otherwise on the exact triple (employee code, relation, date of birth). A name never keys a match — spelling and transliteration differ across systems — and is shown to the reviewer only. A census row that matches nothing on either key is `theirs_only`.

**Reconciliation categories — decision table.** "Explained" means an in-flight line accounts for the difference and is still inside its acknowledgement SLA; only unexplained differences count toward `census_drift_tolerance`.

| Category | Test | Explained when | Action when unexplained |
| --- | --- | --- | --- |
| matched | Both sides, same census attributes | — | None |
| ours_only | Open coverage in our record; no census row | An addition line is `sent` and inside its SLA | Exception; resend or query the insurer. An unconfirmed addition is a person who may be uncovered — surfaced first in the queue |
| theirs_only | Census row; no open coverage in our record | A deletion line is `sent` and inside its SLA | Exception. An insurer that has not processed a deletion is billing premium for a leaver; an unknown person is escalated to HR admin |
| attribute_mismatch | Both sides; date of birth, relation or sum insured differ | A modify or correction line is in flight | Raise a modify or correction line if our record is right (BEN-70); otherwise mark `insurer_to_correct` |
| timing | Both sides; effective dates differ | — | Adopt the insurer-confirmed date as a new coverage version with the reason (CV4, E30); the perquisite re-values |

**The questions the history must answer.** These are the acceptance tests of the history model (BEN-66); each runs against the bitemporal axes, so the answer for a past recording time never changes after a later correction.

| Query | Answered from | Acceptance |
| --- | --- | --- |
| Q1 — Who was covered under policy P on date D, as recorded at time T? | `benefit_enrollment` and `dependant_coverage` rows whose valid time contains D and whose `recorded_at` is at or before T | Identical before and after any correction recorded after T |
| Q2 — What did we send about person X between T1 and T2, and what did the insurer say? | Lines by subject with `sent_at` in range, their batches' acknowledgements and the stored reject text | The batch payload re-renders and matches `payload_sha256` |
| Q3 — Why was dependant Y not covered on date D? | The coverage row or its absence, the life event's frozen `window_evaluation`, and any logged BV refusal | Names the refusing rule and its version |
| Q4 — Which nomination set was in force for scheme S on date D? | §07's nomination versions | Answers for any D inside retention |
| Q5 — What premium perquisite did we value for person X in period M, and on what basis? | The perquisite input for M (§11.9.5) with its coverage and premium references | Traces to the insurer's stated premium line (BEN-71) |

<!-- DIAGRAM: fr-benefits-dependant-endorsement-history -->

#### 11.2.3 Crosswalk to §14's entity names

§14.4.9 names the benefits entities at the level of the whole model; this section names them at build level. The mapping is one to one, so there is one schema, not two.

| §14.4.9 | §11 | Note |
| --- | --- | --- |
| `FbpDeclaration` | `fbp_declaration` | One line per head per tax year, versioned (§11.9.3) |
| `WalletConfig` / `WalletTransaction` | `wallet_config` / `wallet_transaction` | The transaction ledger is specified in §11.9.1 and §11.9.2 |
| `ProofOfSpend` | `proof_of_spend` | Adjudication fields B-class; the bill E-class |
| `Dependant` | `dependant` + `dependant_coverage` + `dependant_life_event` | Coverage split out as a relationship (§11.2.1) |
| `InsurancePolicy` / `Endorsement` | `benefit_scheme` (family insurance) / `benefit_endorsement` + `endorsement_batch` | Batch added (§11.2.2) |
| `NpsSubscription` | `benefit_enrollment` (vehicle NPS) + `contribution_instruction` | PRAN held on the enrollment |
| — | `fbp_cycle`, `census_reconciliation`, `attach_line` | New in this section: §11.9.3, §11.2.2, §11.14.1 |

§14's AC-DM-17 — a wallet transaction or endorsement adjusts perquisite inputs only through an explicit, audited feed and never mutates a filed `PayrollResult` or `Filing` — is met by the perquisite feed specified in §11.9.5.

#### 11.2.4 Scheme and enrollment — field-level definitions

Coverage hangs off the enrollment, and the enrollment off the scheme, so both need the same build-level definition as the dependant. Fields beyond §11.2's entity table are marked *new*.

**`benefit_scheme`** — B-class; a plan-year rollover or a re-broking is a new row (BEN-01, BEN-14).

| Field | Type | Null | Validation | Classification |
| --- | --- | --- | --- | --- |
| `scheme_id`, `tenant_id` | Ids | No | — | C4 |
| `family` | Enum: insurance, retiral, flexi, statutory | No | — | C4 |
| `product` (*new*) | Enum: gmc, gpa, gtl, parental_top_up, nps_tier1, superannuation, vpf, gratuity, edli | No | Consistent with `family` | C4 |
| `name` | Text | No | — | C3 |
| `provider_ref`, `policy_number` | Text | Yes | Required before the first endorsement batch (EB2) | C3 |
| `policyholder_entity_id` (*new*) | FK to the legal entity (§07.2) | No for insurance | One policy may name more than one entity only where the policy says so; decides G17 | C4 |
| `policy_start`, `policy_end` (*new*) | Dates | `policy_end` Yes | The plan year; endorsement effective dates must fall inside it | C4 |
| `coverage_config` | JSON, per §11.2.1 | No for insurance | Keys a rule needs must be set (BEN-68) | C4 |
| `sum_insured_grid` | JSON — grade or salary-multiple bands | Yes | Resolved per §11.6.5 | C4 |
| `premium_schedule_ref` (*new*) | Reference to the insurer's schedule document | Yes | Required where any premium head is valued as a perquisite | C4 |
| `edli_exempting` (*new*) | Boolean | Yes | For a GTL policy relied on for the EDLI exemption (BEN-19) | C4 |
| `effective_from`, `effective_to`, `recorded_at` | Axes | `effective_to` Yes | Non-overlapping per tenant and product (BEN-01) | C4 |

**`benefit_enrollment`** — B-class; one member on one scheme for one window.

| Field | Type | Null | Validation | Classification |
| --- | --- | --- | --- | --- |
| `enrollment_id`, `scheme_id`, `employee_id` | Ids | No | — | C4 |
| `status` | Enum: proposed, active, suspended, terminated, void | No | Transitions per §11.3 | C4 |
| `sum_insured` or `contribution_rate` | Money in paise, or a rate | Yes | Resolved from the grid (insurance) or the policy (retiral) | C1 |
| `employee_share`, `employer_share` | Money in paise | Yes | Their sum equals the premium or contribution for the period | C1 |
| `pran` (*new*) | Text | Yes | NPS only; required before a contribution instruction is released (BEN-22) | C1 |
| `insurer_member_ref` (*new*) | Text | Yes | The member's own reference, from the first acknowledgement | C2 |
| `status_reason` (*new*) | Enum: joiner, leaver, lop, sabbatical, withdrawal, pran_rejected, esi_boundary | No | — | C4 |
| `effective_from`, `effective_to`, `recorded_at` | Axes | `effective_to` Yes | Proration reads these (BEN-02) | C4 |

#### 11.2.5 Benefits audit events

BEN-05 requires an immutable audit event for every change. These are the events, so the Q1–Q5 history, the exceptions queue and §19's metrics read one vocabulary. Each event carries actor, NTP-synced timestamp, before and after, the effective date and the rule version where one applied (FR-CHR-089); none carries the content of an E-class record.

| Event | Emitted on | Also read by |
| --- | --- | --- |
| `benefits.dependant.fact_recorded` | A dependant fact created or versioned | Q1, Q3 |
| `benefits.dependant.life_event_recorded` | BEN-65, with the frozen window evaluation | Q3 |
| `benefits.coverage.transitioned` | CV1–CV6 | Q1; BEN-13's valuation |
| `benefits.endorsement.line_transitioned` | EL1–EL12 | Q2; the exceptions queue |
| `benefits.endorsement.batch_transitioned` | EB1–EB5, with `payload_sha256` at seal | Q2 |
| `benefits.census.reconciled` | A reconciliation closed, with its category counts | BEN-72 |
| `benefits.fbp.component_published` | A head's configuration version, with a `qualifies_for_exemption` flag set only when its mode and attestations satisfy BEN-62 or BEN-63 | §19.6's FBP-adoption metric, which counts only qualifying configurations |
| `benefits.fbp.cycle_transitioned` | CY1–CY7 | The employee statement |
| `benefits.fbp.declaration_transitioned` | D1–D8 | BEN-85 |
| `benefits.fbp.proof_transitioned` | P1–P10, with approved amounts and reasons | BEN-85; the pre-true-up report |
| `benefits.attestation.transitioned` | AT1–AT4 | BV-12, BV-13, BV-16 |
| `benefits.wallet.transaction_recorded` | A meal or gift issue or reversal | BEN-76, BEN-80 |
| `benefits.feed.input_recorded` | A perquisite input created or superseded | Q5; Form 123 totals |
| `benefits.validation.raised` | Any BV code (§11.15.2) | The exceptions queue |

#### 11.2.6 Entity classes, erasure and replay — the benefits table

Part E-2 scopes bitemporality by entity class; §14.6.1a fixes the classes and the two erasure mechanisms. This applies them to every benefits entity, so the build knows what each can forget and what replay returns afterwards. No retention *period* is stated here: beyond EV-054's central-sphere register figures, a period is a counsel item (Part D-11), and the deletion decision is the §14.7.2 engine's.

| Entity | Class | What can be erased | Mechanism | What replay returns afterwards |
| --- | --- | --- | --- | --- |
| `benefit_scheme`, `fbp_component_config`, `wallet_config`, `fbp_cycle`, `attach_line` | B | Nothing — configuration and rules | — | Every version |
| `benefit_enrollment`, `dependant_coverage`, `fbp_declaration`, `nominee` sets | B | Personal fields, after a subject-key shred | Crypto-shredding | Figures and dates against surrogate ids; personal fields `ERASED` |
| `dependant` | B, with `disability_flag` and `disability_consent_ref` E | The disability value on consent withdrawal or retention expiry; all personal fields on a subject-key shred | Crypto-shredding | Coverage windows and dates; `ERASED` for the flag and for personal fields |
| `proof_of_spend` | B adjudication fields; the bill E | The bill on retention expiry | Crypto-shredding or tombstone | Amounts, states, reasons and actors; the bill's tombstone |
| `dependant_life_event`, `benefit_endorsement`, `endorsement_batch`, `census_reconciliation`, `census_diff_line`, `wallet_transaction`, `premises_meal_record`, `perquisite_input`, `retiral_contribution_ledger`, `contribution_instruction`, `gratuity_accrual` | R | Personal fields, after a subject-key shred | Crypto-shredding | The record, its figures and hashes; personal fields `ERASED` |
| Endorsement files, census import files, SCF and nomination renders, attestation evidence | E (documents) | The file | Tombstone, or crypto-shredding where encrypted per subject | A re-render from the records, checked against the sealed hash where one exists (BEN-73); refused with the tombstone if the render needs `ERASED` fields |
| `consent_record`; Aadhaar token-store entries | E | On their lawful triggers (FR-CHR-099, FR-CHR-100) | Per §07 | The tombstone |

A tax figure that consumed an erased input — an approved proof whose bill is gone, a premium perquisite for a person since shredded — replays from what the run recorded (the approved amount; the perquisite input), never from the erased content (§11.2 design rules).

| ID | Given | When | Then |
| --- | --- | --- | --- |
| TB-E01 | A dependant with a disability flag under written consent | The consent is withdrawn and the retention engine erases the value | The flag reads `ERASED`; coverage and Q1 answers are unchanged; a policy rule that needed the flag goes to operator review (BEN-03) |
| TB-E02 | A leaver whose subject key is shredded | Q2 is asked for the leaver's endorsement history | Lines, dates and hashes return; personal fields read `ERASED`; a re-render is refused with the tombstone |
| TB-E03 | An approved telephone proof whose bill is erased | The tax year is replayed | Exempt and taxable figures reproduce from the proof's amounts; the bill returns its tombstone |
| TB-E04 | A tax year with a shredded employee | Form 123 totals are replayed | Totals reproduce against surrogate ids |

---

### 11.3 Entity lifecycles and state machines

The benefits model is defined as much by its *transitions* as its tables. Three state machines are load-bearing; each transition is an audited event (BEN-05), and none hard-deletes a bitemporal-class row (erasable classes follow §11.2's design rules).

**Enrollment status.** `proposed → active → suspended → terminated`, with `suspended → active` (reactivation) and `proposed → (void)` as the only permitted back-edges.

| From → To | Trigger | Effect on perquisite/contribution | Endorsement emitted |
| --- | --- | --- | --- |
| proposed → active | Employer confirms; PRAN issued (NPS); policy live | Perquisite/contribution accrues from `effective_from` | `add-member` |
| active → suspended | Unpaid leave, sabbatical, LOP month | Accrual **stops** from suspension date; row retained | `modify-member` (or `delete-member` if insurer requires) |
| suspended → active | Return from leave | Accrual resumes; no data loss | `add-member` (re-add) |
| active → terminated | Exit, scheme withdrawal | Accrual stops; pro-rated final period; gratuity settlement triggered (§11.7); an EDLI claim arises only on death in service, and EPFO computes and pays it | `delete-member` |
| proposed → void | Never activated (e.g., PRAN rejected) | No accrual ever; row kept for audit | none sent |

**Endorsement status.** `drafted → sent → acknowledged → premium-adjusted`, with `sent → exception` when no ack arrives within SLA. An endorsement is *never* silently "sent"; the absence of an `ack_ref` past `endorsement_ack_sla_days` surfaces it in the exceptions queue (BEN-11).

**FBP declaration / proof status.** `draft → submitted → locked` for the declaration, running in parallel with per-line `proof_of_spend`: `pending → (approved | rejected | query)`, extended in §11.9.3 with partial approval, withdrawal and lapse at lock. The declaration locks with the investment-declaration cycle; proofs continue to be collected and adjudicated through the year, with a hard proof-lock before the Q4 true-up (BEN-35). The taxable-vs-exempt split on each payslip is a pure function of the current proof state, recomputed every run.

<!-- DIAGRAM: benefits-state-machines -->

#### 11.3.1 Transition tables — enrollment, coverage, endorsement line and endorsement batch

Part E-1 asks for each state machine as a transition table — event, guard, side effect, who may trigger — with the diagram as illustration. The enrollment table above gives triggers and effects; the first table below adds its guards and who may trigger each move. The other three are the history machinery §11.2.1–§11.2.2 define; the FBP declaration and proof machines are in §11.9.3. The "who may trigger" column uses §07's roles; §11.15.1 places the benefits objects in the permissions matrix.

**Enrollment (`benefit_enrollment`)**

| # | From → To | Event | Guard | Side effect | Who may trigger |
| --- | --- | --- | --- | --- | --- |
| EN1 | (none) → proposed | Joiner eligible under the scheme, or an employee opts in | Scheme live on `effective_from`; for NPS, the employee's regime and rate recorded (BEN-20) | For NPS, a PRAN request unless an existing PRAN is supplied (BEN-25) | System at joining; HR admin; employee opt-in through ESS |
| EN2 | proposed → active | Employer confirms; PRAN issued (NPS); policy live | Every `coverage_config` key the scheme needs is set (BEN-68) | Accrual from `effective_from`; G1 lines drafted | HR admin; system on PRAN issue |
| EN3 | proposed → void | Never activated — for example, PRAN rejected | Not active | No accrual ever; row kept | System; HR admin |
| EN4 | active → suspended | Unpaid leave, sabbatical or an LOP month the tenant's policy treats as suspension | `status_reason` recorded | Accrual stops from the suspension date; G3 | HR admin; system from §09's leave record where the tenant maps it |
| EN5 | suspended → active | Return | — | Accrual resumes; G4 | HR admin; system |
| EN6 | active or suspended → terminated | Exit, withdrawal, or an ESI boundary move (BEN-09) | Effective date on or after `effective_from` | Pro-rated final period (BEN-02); G2 or G9; gratuity settlement for an exit (§11.7) | System from the exit record (§07.3.4); HR admin |
| EN7 | Any → same state, new version | A sum-insured, rate or share change | — | G8 where the sum insured moves | HR admin; system from a revision |

**`dependant_coverage`**

| # | From → To | Event | Guard | Side effect | Who may trigger |
| --- | --- | --- | --- | --- | --- |
| CV1 | (none) → requested | An addition is requested — by life event, joiner census or renewal census | Relation coverable under the scheme's `coverage_config`; within `addition_window_days.<event_type>` or at renewal (BEN-12); count within the family definition (BEN-03) | `add_dependant` line drafted, or joined to the member's `add_member` line; a refusal is logged with the rule version (BV-19 to BV-22) | Employee proposes through ESS; HR admin approves per the tenant's workflow (FR-CHR-083); system at joiner or renewal |
| CV2 | requested → confirmed | The insurer acknowledges the line | `confirmed_by_ack` present | Where the premium for this life is a taxable perquisite, the perquisite accrues from `valid_from` — retro to it if the acknowledgement arrives in a later period (§11.9.5) | System, from the acknowledgement |
| CV3 | requested → rejected | The insurer rejects the line | Reject text stored | Window voided — our record never shows the person covered; exception raised (BV-27); employee notified | System |
| CV4 | confirmed → confirmed, new version | The insurer confirms a different effective date, or a sum-insured change lands | Reason recorded | New version; any perquisite re-values from the corrected date (E30) | System on acknowledgement; HR admin with the insurer's note |
| CV5 | confirmed → ended | A deletion is acknowledged — leaver, death, relation ended, age-out, or a suspension the policy treats as deletion | `delete_dependant` or `delete_member` line acknowledged | Perquisite stops at `valid_to` | System |
| CV6 | requested → ended | The addition is withdrawn before its line is sent | Line not yet `sent` | Line `cancelled` (EL12) | Employee or HR admin |

**Endorsement line (`benefit_endorsement`)**

| # | From → To | Event | Guard | Side effect | Who may trigger |
| --- | --- | --- | --- | --- | --- |
| EL1 | (none) → drafted | A coverage-affecting change (decision table, §11.6.1) | `source_event_ref` present | — | System |
| EL2 | drafted → held | The adapter's schema validation fails (BEN-55) | — | Exceptions queue names the failing field (BV-25) | System |
| EL3 | held → drafted | The data is fixed | Fix recorded with actor | Re-validated | HR admin |
| EL4 | drafted → validated | Schema validation passes | — | `census_payload` frozen; eligible for the next batch | System |
| EL5 | validated → sent | Its batch is sent (EB3) | Batch `sealed` | `sent_at` set; the acknowledgement SLA clock starts | System, on EB3 |
| EL6 | sent → acknowledged | The acknowledgement names the line as accepted | — | CV2 or CV5 fires | System |
| EL7 | sent → rejected | The acknowledgement rejects the line | Reject text stored | CV3; exception (BV-27) | System |
| EL8 | sent → sent, attempt + 1 | No acknowledgement past `endorsement_ack_sla_days`; resent | Same payload — hash equal | Exception stays open until acknowledged (BEN-11) | HR admin |
| EL9 | acknowledged → premium_adjusted | The insurer states the premium change | `premium_delta_ref` present | Premium basis updated for BEN-13 (BEN-71) | System, or HR admin entering the insurer's note |
| EL10 | rejected → superseded | A correcting line is created | The new line's `corrects_line` names this line | — | HR admin |
| EL11 | acknowledged → reversed | A correction reverses a line the insurer accepted in error | The correction line is acknowledged | Coverage closed or corrected as a new version (CV4, CV5) | System |
| EL12 | drafted, held or validated → cancelled | The cause is withdrawn before send | Not `sent` | No batch carries it | HR admin |

No transition edits a line's `census_payload` after `validated`; any later change is a new line. A line is never "sent" because a file was generated (BEN-11). The `exception` of the summary above is the BV-26 queue item raised against a line that stays `sent` (EL8), not a separate line state.

**Endorsement batch (`endorsement_batch`)**

| # | From → To | Event | Guard | Side effect | Who may trigger |
| --- | --- | --- | --- | --- | --- |
| EB1 | (none) → assembling | The policy's `endorsement_cycle` opens | — | Validated lines for the policy attach | System |
| EB2 | assembling → sealed | Cut-off reached, or an on-demand seal | At least one line; every line `validated` | Canonical payload hashed; file rendered through the adapter | System or HR admin |
| EB3 | sealed → sent | The send is recorded | Where the tenant configures a send checker, the sender is not the sealer (§11.15.1) | Lines move by EL5; `sent_channel` recorded | HR admin |
| EB4 | sent → acknowledged or partially_acknowledged | The insurer's acknowledgement is imported | — | Each line moves by EL6 or EL7 | System |
| EB5 | acknowledged or partially_acknowledged → closed | Every line terminal — acknowledged, premium_adjusted, rejected and superseded, or cancelled | — | The batch leaves the working queue | System |

<!-- DIAGRAM: fr-benefits-endorsement-line-states -->

---

### 11.4 Benefits enrollment data — functional requirements

Requirement IDs use the `BEN-` prefix. The priority column follows §05.17, where **P0 is reserved for the R1 list** (lint L1). A row the release cannot ship without carries its **release tag and capability** instead of a priority: `R2 · C-38` — the benefits data model and perquisite valuation, built and not monetised (§05.17, PR-15 and RT-15); `R1 · C-17` — gratuity accrual, which rides §08 FR-PAY-206. `P1` = ships with C-38 where the tenant offers the family; `P2` = v2 / deferred. A row whose family the tenant does not offer is inert. §11.4.1 maps every BEN row to its capability and states the R1 posture. Acceptance criteria are stated as testable assertions.

| ID | Requirement | Priority | Acceptance criterion |
| --- | --- | --- | --- |
| **BEN-01** | Maintain an effective-dated `benefit_scheme` per tenant per benefit family, with plan-year start/end and provider reference (nullable). | R2 · C-38 | Creating a scheme with `effective_from` mid-year and a later `effective_to` produces two non-overlapping rows on re-brokering; a payroll run dated in either window resolves the correct scheme with zero manual selection. |
| **BEN-02** | Enroll/dis-enroll an employee to a scheme with effective dates; mid-year joins and exits pro-rate premium/contribution and perquisite. | R2 · C-38 | An employee joining on the 12th of a 30-day month with a monthly employer premium of ₹X yields a perquisite of exactly `X × (19/30)` on that period's payslip, and the endorsement is queued the same run. |
| **BEN-03** | Maintain dependant records (relation, DOB, gender, coverage flag, disability flag) reused across group health, ESI and nominee logic. | R2 · C-38 | Adding a spouse and two children to a GMC scheme with a 1+3 coverage rule accepts exactly three dependants and rejects a fourth with a rule-cited error; the same dependant rows are visible to the ESI module without re-entry. A disability flag is refused until a written-consent record for that health data exists (SPDI r.3(iii), r.5(1) — EV-060; FR-CHR-100), and withholding that consent never blocks the dependant's coverage: the flag stays empty and any policy rule that turns on disability is routed to the operator as a manual exception. An absent Aadhaar token never blocks the dependant or the enrollment (FR-CHR-101; Part D-10). |
| **BEN-04** | Maintain per-scheme nominations with share validation and minor/guardian handling, distinct from dependants. | R2 · C-38 | Nominee shares that do not sum to 100% for a scheme are rejected at submit; a minor nominee without a guardian is rejected; EPF/EPS/gratuity/EDLI/GTL/superannuation/NPS each carry an independent nomination set. |
| **BEN-05** | Every enrollment, dependant and nomination change writes an immutable audit event with actor, timestamp and before/after. Bitemporal-class rows are never hard-deleted; erasable classes are erased only by crypto-shredding or tombstone (§11.2 design rules). | R2 · C-38 | Deleting a dependant leaves an audit row that reconstructs the pre-deletion coverage facts; no bitemporal-class benefits row can be hard-deleted. After an erasure of a dependant's disability flag or an uploaded proof document, replay of the affected period returns the tombstone (id, class, dates, basis, actor) in place of the content, and the period's tax figures replay from the recorded inputs unchanged. |
| **BEN-06** | Bulk import enrollment, dependant and nominee data from a spreadsheet or a prior HRMS at migration. | P1 | A 200-employee GMC census with dependants imports with a per-row validation report; rows failing dependant-count or nominee-sum rules are quarantined, not silently dropped. A dependant disability flag imports only with a written-consent record or dated imported consent evidence — consent is never backfilled (FR-CHR-102); otherwise the flag is held unusable and listed in the migration report. Ties to the §16.7 migration requirement. |
| **BEN-07** | Enrollment status transitions (proposed→active→suspended→terminated) are gated and logged; suspension stops perquisite accrual without deleting history. | R2 · C-38 | Suspending an enrollment mid-month stops perquisite from the effective date, retains the row, and emits a `modify-member` endorsement; reactivation resumes without data loss. |
| **BEN-08** | Enforce dependant-eligibility rules that turn on age/relationship: child age-out, dependant-parent inclusion, spouse coverage windows. | P1 | A covered child crossing the policy's dependent-child age limit (a per-policy parameter, `child_age_limit` — insurer terms, not statute) at renewal is flagged for deletion with the rule cited; the age-out is computed from `dependant.dob`, not entered by hand. |
| **BEN-09** | Resolve the ESI-vs-GMC coverage boundary from the ESI wage ceiling, so the GMC census and the ESI roll do not double-cover or gap. | P1 | An employee whose ESI-wage crosses the coverage ceiling (₹21,000/month; ₹25,000 for a person with disability, as ESIC publishes today) moves from ESI to the GMC census at the correct effective date, and appears in exactly one of the two rolls per period. The ceiling is read from the §06.3 effective-dated parameter, never hard-coded here: the ESI Act 1948 is repealed and its rules are saved only to the cliff, and the ESI position after on or about 21 Nov 2026 is unresolved (§06.3, §06.9; §20.6 V-08). |

**Data-model note — dependant vs nominee.** These are conflated in many Indian HR products and it causes real defects. A *dependant* is a covered life on a health/accident policy (spouse, children, sometimes parents/in-laws). A *nominee* is the legal recipient of a benefit on the employee's death or maturity (EPF, EPS, gratuity, EDLI, GTL, superannuation, NPS). They overlap but are not identical: a parent can be a nominee without being a covered dependant, and a child can be a covered dependant while the spouse is the sole nominee. **[Verified]** Gratuity nomination is required from each employee who has completed one year of service (Code on Social Security s.55 — §06.6). EPF nomination under the legacy EPF Scheme 1952 (para 33, Form 2) is carried from v0.3, not re-captured (**[Hypothesis]**). Nomination is prudent for every retiral and life vehicle. The nomination *form* is instrument-versioned data, not a constant: that the Social Security (Central) Rules 2026 supersede the Payment of Gratuity (Central) Rules 1972, which prescribed Form F, is carried from v0.3, not re-captured (**[Hypothesis]**, §06.6), and the PF engine builds against the EPF Scheme 2026 (§06.9) — the successor form numbers are unmapped, so `nominee.form_ref` is a per-instrument parameter routed to §20 (§11.19 B10). Modelling dependants and nominees as one table produces wrong death-benefit routing — a legal exposure, not a UX bug.

**Data-model note — ESI dependant reuse.** ESI's own definition of "dependant" (parents, spouse, minor/legitimate children — legacy ESI Act s.2(6A); the Code-era definition is unmapped, §06.3) differs from an insurer's GMC family definition. The `dependant` table therefore carries the *facts* (relation, dob, disability) and each *scheme* applies its own eligibility predicate; the table is shared, the rule is not. This prevents the common defect of an ESI-eligible parent being force-fitted into a GMC family-definition cap.

#### 11.4.1 Release mapping — how BEN rows read against §05.17

§05.17 keeps one register of what ships when, and its lint L1 reserves P0 for the R1 list. The benefits data model and perquisite valuation are capability C-38 in R2 (PR-15); the Form 123 statement is C-53 in R3 behind fence F-12 (§05.18); gratuity accrual is C-17 in R1. This table places every BEN row, so no row claims a release §05 has not given it.

| BEN rows | §05.17 capability | Release | What an R1 tenant has instead |
| --- | --- | --- | --- |
| BEN-17 | C-17 — accrue gratuity and compute a payout (§08 FR-PAY-206) | R1 | Ships; `gratuity_accrual` is the persisted form of FR-PAY-206's accrual |
| BEN-01 to BEN-09, BEN-64 to BEN-68 — schemes, enrollments, dependants, coverage | C-38 | R2 | Dependant and nomination records through §07 (FR-CHR-044, FR-CHR-075), at §07's release, without benefits eligibility rules |
| BEN-10 to BEN-16, BEN-69 to BEN-73, BEN-92 to BEN-94 — endorsements, reconciliation, premium valuation, renewal and sum insured | C-38 | R2 | Endorsements run outside the product |
| BEN-18, BEN-19 — statutory nomination rendering; the EDLI-exemption flag | C-38 | R2 | — |
| BEN-20 to BEN-28 — NPS and VPF | C-38 | R2; the SCF generator is additionally fenced on B11 | Contributions recorded, no file (B11) |
| BEN-30 to BEN-39, BEN-62, BEN-63, BEN-75 to BEN-88, BEN-97 — FBP, meal, gift, the FBP cycle, the perquisite feed and the wage-base trigger | C-38 | R2 | The Form 124 declaration and proof path for Chapter VI-A and HRA is R1 (C-13, C-31 — §08 FR-PAY-503); FBP heads are not. A taxable perquisite enters the TDS base only as an operator-entered value with its recorded source (PR-15) |
| BEN-74 — the K-19 guard on an operator-entered meal or gift value | C-13, proposed | R1 | This row *is* the R1 posture for meal and gift. It is raised to §05 as an addition to PR-15, because an operator-entered value without the conditions would reproduce K-19 in R1 |
| BEN-40 to BEN-43, BEN-104 — the retiral cap and its recognition through the year | C-38 | R2 | Operator-entered perquisite with source (PR-15) |
| BEN-98 — the ESI–GMC boundary | C-38 | R2 | The ESI roll runs through §06; the GMC side of a crossing is manual |
| BEN-99, BEN-100 — gratuity accrual and settlement | C-17 | R1 | Ship with C-17, as BEN-17 does; they are the computation behind §08 FR-PAY-206 |
| BEN-101 — nomination routing records | C-38 | R2 | Nomination records through §07 (FR-CHR-044, FR-CHR-075); routing is done outside the product |
| BEN-102, BEN-103 — contribution instructions | C-38 | R2; the handover manifest additionally fenced on B11 | Contributions are recorded, with no manifest (B11) |
| BEN-105 — the invariant checks | C-38 | R2 | The BV catalogue alone, on the objects R1 holds |
| BEN-50 to BEN-55 — the partner surface | C-38 | R2 | — |
| BEN-60, BEN-61, BEN-95, BEN-96 — benefits opening balances | C-38 | R2 | The R1 importer (C-05) carries YTD earnings and TDS. Benefits state from a cutover before C-38 ships — LTA block usage, gift aggregate, in-flight proofs — is loaded by BEN-95 at C-38's release from the cutover export C-05 retains |
| BEN-89 to BEN-91 — the attach line | Not a tenant capability: our own revenue model (§18.5, §19.6) | P1 — in place before any attach figure enters a model or a deck | — |
| The Form 123 tie-outs in BEN-13, BEN-34, BEN-41 and §11.17 | C-53 | R3, fence F-12 | Perquisite totals held per employee until the Form 123 layout is read (§05.18) |

#### 11.4.2 Dependant and coverage requirements

These rows implement the history model of §11.2.1 and the coverage machine of §11.3.1.

| ID | Requirement | Priority | Acceptance criterion |
| --- | --- | --- | --- |
| **BEN-64** | Hold coverage as `dependant_coverage` windows — one per dependant per enrollment per window — so a dependant can be covered under several enrollments at once; `dependant.is_covered` and `dependant.enrollment_ref` are read-only projections. | R2 · C-38 | A parent on the parental top-up and a spouse on base GMC produce two coverage rows under two enrollments; a direct write to `dependant.is_covered` is refused; ending the top-up closes only the parent's top-up row. |
| **BEN-65** | Record life events (birth, adoption, marriage, death, relation ended, correction, disability consent given or withdrawn) as R-class records; evaluate each affected scheme's addition window when the event is recorded, and freeze that evaluation. | R2 · C-38 | Under a policy whose `addition_window_days.birth` is 30 (an illustrative policy term), a birth recorded 20 days after the event is `within_window` and drafts an addition. Shortening the window to 15 days afterwards leaves that event's evaluation unchanged. A `correction` event that moves the birth date is a new record, re-evaluated, and both records are shown. |
| **BEN-66** | Answer the history queries Q1–Q5 (§11.2.2) from the bitemporal and R-class records. | R2 · C-38 | A coverage recorded on 10 March with effect from 1 January: Q1 for 15 February "as recorded on 1 March" returns *not covered*; "as recorded on 11 March" returns *covered*; both answers are unchanged by any later correction. |
| **BEN-67** | Detect a person held as a dependant of two employees in one tenant — an exact match on date of birth and name — and hold the second addition for HR admin review; the reviewer records "different person" (proceed) or "same person" (apply the scheme's `allow_cross_employee_dependant`). Never merge records automatically; never block on a probable match without a named reviewer. | R2 · C-38 | Two employees each adding a child with the same name and date of birth: the second addition is held with both records shown; "different person" releases it; "same person" under a policy that disallows double cover refuses it, citing the key. |
| **BEN-68** | A `coverage_config` key that a rule needs and the policy lacks refuses the action and names the key; no key has a product default (§11.2.1). | R2 · C-38 | Adding a parent under a policy with `parents_allowed` unset is refused with the message naming `coverage_config.parents_allowed` and the policy; once it is set, with the insurer agreement as its source, the same request proceeds. |

#### 11.4.3 Configuration dependency order

Because so many benefits values have no product default, a tenant's set-up has an order: each object below refuses the action it gates until it exists. The order is also the onboarding checklist the product shows, and the reason a missing item names the step, not just the field.

| Step | Object | Depends on | Gates, until done | FR |
| --- | --- | --- | --- | --- |
| 1 | `benefit_scheme` with policy number, plan year and policyholder entity | The tenant's legal entities (§07.2) | Every endorsement batch (EB2) | BEN-01 |
| 2 | `coverage_config` keys | Step 1; the insurer agreement | Dependant additions and renewal censuses (BEN-68) | BEN-68 |
| 3 | Premium heads and schedule | Step 1 | Taxable premium inputs (PR2) | BEN-92 |
| 4 | Insurer adapter and `census_field_set` | Step 1 | Sealing a batch (EB2) | BEN-50 |
| 5 | `fbp_component_config` per head, cloned from §08's catalogue | §08 FR-PAY-108 | Opening the FBP cycle (CY1) | BEN-30 |
| 6 | Meal delivery mode and attestations; gift instrument classes | Step 5; the issuer contract as evidence | Any meal exemption (M3, M7); any non-cash gift entering *G* (BV-16) | BEN-62, BEN-77, BEN-79 |
| 7 | Tenant conventions — meals per working day and the rest | Step 5 | The meal ceiling: with `meals_per_working_day` unset, meal values are taxable (BV-35) | BEN-75 |
| 8 | The attendance-cycle mapping for each pay group | §08 and §09 | Counting *E* (BEN-75) | BEN-75 |
| 9 | `fbp_cycle` dates | Step 5; the pay group | Declarations (CY1; BV-31) | BEN-82 |
| 10 | `dependant_health_consent_forms` | The legal lead | Capturing a dependant's disability flag | BEN-03 |
| 11 | Enrollments and dependants — import or self-service | Steps 1–2 | Endorsements for them (G1) | BEN-02, BEN-06 |

Tests: TB-C01 — sealing a batch for a policy with no `policy_number` is refused, naming step 1. TB-C02 — opening an FBP cycle before the tax year's menu versions are published is refused (CY1). TB-C03 — a meal voucher issue before step 6 values as taxable with BV-12, and the checklist names step 6. TB-C04 — a pay group with no attendance-cycle mapping cannot count *E*, so its meal values are taxable with the step named.

#### 11.4.4 The ESI–GMC coverage boundary — the benefits-side rules

BEN-09 states the outcome: one roll per period, never both and never neither. The *statutory* side of the boundary — the wage ceiling, the contribution-period rule that fixes when a crossing takes effect, and the position after the on-or-about 21 Nov 2026 cliff — is §06.3 and §06.9's, and §20.6 V-08 carries the post-cliff question. This subsection specifies only what the benefits model does when §06.3 hands it a crossing date, because the failure it prevents is an employee with no hospitalisation cover at all for a month.

**The boundary is a benefits event with three consequences.** A crossing changes (a) which roll the person is on, (b) the GMC enrollment and every dependant coverage window hanging off it, and (c) any valued premium perquisite for those lives (PR2). The engine never derives the date itself: it consumes the effective date §06.3's contribution-period rule produces, and records that rule's version on the enrollment transition, so a later change to the statutory rule does not silently re-date a past move.

| # | Crossing | Enrollment effect | Coverage and endorsement | Perquisite effect |
| --- | --- | --- | --- | --- |
| XB1 | Into ESI (the ESI wage falls to or below the ceiling, effective at the date §06.3 gives) | GMC enrollment `active → terminated`, `status_reason` = esi_boundary (EN6) | `delete_member` dated that day (G9); every open `dependant_coverage` row on that enrollment ends on the same date (CV5) | Any valued head stops at `valid_to`; the period prorates on §08's denominator (BEN-02) |
| XB2 | Out of ESI (the ESI wage crosses above the ceiling at that date) | A new GMC enrollment `proposed → active` from that day — never a reopened window (EN1, EN2) | `add_member` dated that day, plus `add_dependant` lines for the dependants the employee requests; whether the insurer treats this as a joiner addition or a mid-term addition is the policy key `esi_exit_addition_class`, with no product default (BEN-68) | Valued heads accrue from `valid_from`, retro to it if the acknowledgement lands later (PR5) |
| XB3 | Both rolls carry the person for one period | Refused — the invariant is checked before the run closes (INV-14, §11.15.6) | The later line is held, not sent | No input is emitted for the overlap |
| XB4 | Neither roll carries the person for a period | Exception, raised on the pre-run report (§11.17.1) | The missing `add_member` is drafted and shown first in the endorsement queue, because it may be a person without cover | None; the gap is an operational fact, not a tax fact |
| XB5 | The employee oscillates across the boundary inside one plan year | Each move is its own enrollment window | Each move is its own coverage window and its own pair of lines; `insurer_member_ref` is whatever the insurer re-issues, never carried across a closed window (G16's rule) | Each window values separately; no window is merged for convenience |
| XB6 | A crossing dated after the on-or-about 21 Nov 2026 cliff | Whatever rule version §06.3 publishes for that period; the benefits side reads `esi_wage_ceiling` from §14.6.2 and never holds a copy | As above | As above |

| ID | Requirement | Priority | Acceptance criterion |
| --- | --- | --- | --- |
| **BEN-98** | Execute an ESI boundary crossing as XB1–XB6: consume §06.3's effective date and record its rule version, close or open the enrollment and every dependant coverage window on that date, draft the matching line, and refuse a period in which an employee appears on both rolls. | P1 | An employee crossing out of ESI on the date §06.3 gives has a GMC enrollment and dependant coverage from that day, one `add_member` line, and appears on exactly one roll for the period; a seeded overlap is refused with INV-14 before the run closes; a period with neither roll raises the XB4 exception and lists the person first in the endorsement queue. |

| ID | Given | When | Then | Covers |
| --- | --- | --- | --- | --- |
| TB-BD01 | An employee on ESI whose wage crosses above the ceiling | §06.3 fixes the crossing date | GMC enrollment and `add_member` on that date; the rule version is recorded on the transition | BEN-98, XB2 |
| TB-BD02 | The same employee, with a spouse and one child requested | The addition is submitted | Dependant lines follow CV1's guards; with `esi_exit_addition_class` unset, BEN-68 refuses and names the key | BEN-98, XB2 |
| TB-BD03 | An employee crossing into ESI mid-month | The period runs | GMC coverage ends that day; the valued parental top-up prorates to the covered days | BEN-98, XB1 |
| TB-BD04 | A data error placing an employee on both rolls for July | The July run is closed | Refused, citing INV-14; nothing is filed on two rolls | BEN-98, XB3 |
| TB-BD05 | An employee who crosses out in June and back in September | Both crossings are recorded | Two enrollment windows and two coverage windows; no member reference carried across the closed window | BEN-98, XB5 |

---

### 11.5 Perquisite valuation catalog — the deterministic core

Every taxable perquisite in this section resolves through one deterministic valuation method. This catalog is the reference the rules engine implements; **no entry is model-generated** (§08.1; §12.1). Each method is effective-dated (BEN-30) so a mid-year statutory change values pre- and post-change periods correctly in one tax year. **Rule numbers in the table are 1962-Rules numbering, and values are the 1962-Rules values, unless the row states a 2026-Rules position** (vocabulary note, §11 opening); each row is therefore two rule versions — to 31 March 2026, and from 1 April 2026 with its citation and value pending §20 (§11.19 B9). Only the meal and gift rows carry research-backed 2026 figures (EV-019, still **[Hypothesis]**); every other row's 1962-Rules method and value is carried from v0.3, not re-captured (vocabulary note), so each is **[Hypothesis]** and ships as the named parameter listed in §11.20.

<!-- DIAGRAM: rule3-valuation-catalog -->

| Perquisite | Rule | Valuation method (deterministic) | Key edge case |
| --- | --- | --- | --- |
| **Free meals / vouchers** | 1962: Rule 3(7)(iii). 2026: citation unverified — routed to §20 (B9) | Exempt up to the per-meal cap; excess over cap taxable. Cap **₹50 → ₹200 per meal from 1 Apr 2026** (Income-tax Rules 2026; r2/02). **Only where** the food is provided during working hours at office or factory premises, **or** through vouchers that are non-transferable and usable only at eating outlets; a cash meal allowance is fully taxable (BEN-62). Tea and snacks during working hours: exempt in full under the 1962 Rules as v0.3 recorded it (carried, not re-captured — **[Hypothesis]**); their treatment under the 2026 Rules is not verified (B9). | The conditions are engine constraints, not guidance — an unattested voucher or a cash allowance values at full cost. Eligible meals per period = working days × `meals_per_working_day` (a convention, not statute: the Rules cap per meal, not meals per day — r2/02); LOP and holidays reduce the count; WFH-day treatment is a tenant parameter pending B9. New-regime availability runs from Tax Year 2026-27 only — the blocking proviso was not carried into the 2026 Rules (Taxmann via r2/02; counsel to confirm). **[Hypothesis]** values (EV-019; r2/02 — §20.6 V-18); **[Reversed]** v0.3's Rule 3(7)(iii) citation for 2026. |
| **Gift / voucher (in kind)** | 1962: Rule 3(7)(iv). 2026: citation unverified — routed to §20 (B9) | A **nil-value threshold** of **₹5,000 → ₹15,000 during the tax year** (aggregate, all gifts; r2/02): below it the aggregate is valued at nil. **Cash gifts fully taxable** regardless of amount (1962-Rules position, carried as the engine default pending B9). | What crossing the threshold taxes — the whole aggregate or only the excess — depends on 2026-Rules text not yet read; the engine carries `gift_threshold_mode` and defaults to the whole aggregate (BEN-63). Three ₹6,000 gifts (₹18,000) therefore value at ₹18,000 by default, ₹3,000 only if §20 confirms excess-only. **[Reversed]** v0.3 stated "excess taxable" as settled; the research's "nil-value threshold" wording does not support it. **[Hypothesis]** values (EV-019; r2/02). |
| **Motor car — employer-owned/hired** | Rule 3(2), Table II | Prescribed flat monthly perquisite: **₹1,800/mo** (engine ≤1.6L) or **₹2,400/mo** (>1.6L) where use is part-official/part-personal, plus **₹900/mo** if a driver is provided; fully personal use → actual cost to employer less recovery. | Depends on ownership (employer vs employee), cc slab, driver provision, and expense-bearer. Employee-owned car reimbursed by employer: actual expense less the prescribed amount is exempt. **[Hypothesis]** — carried, not re-captured (Source: 1962 Rules, Rule 3(2), Tables I–II); parameters `perq.car.value.<band>` and `perq.car.driver_value`, §08's names (FR-PAY-106), with no shipped default for Tax Year 2026-27 (AC-106.4). |
| **Use of movable asset** | Rule 3(7)(vii) | **10% p.a. of actual cost** (or hire charges if hired) less any recovery, for the period of use. | Laptops and telephones provided for use are *specifically exempt* under Rule 3(7)(vii) proviso — a common mis-tax. **[Hypothesis]** — carried, not re-captured (Source: 1962 Rules, Rule 3(7)(vii)); parameter `perq.asset_use_rate`. |
| **Transfer of movable asset to employee** | Rule 3(7)(viii) | Cost less depreciation for completed years: **computers/electronics 50% WDV/yr**, **motor cars 20% WDV/yr**, **other assets 10% straight-line/yr**; result less recovery is the perquisite. | Depreciation basis differs by asset class; a laptop transferred after 2 years is valued at 25% of cost. **[Hypothesis]** — carried, not re-captured (Source: 1962 Rules, Rule 3(7)(viii)); parameter `perq.asset_transfer_depreciation.<class>`. |
| **Rent-free / concessional accommodation** | Rule 3(1) | Employer-owned: **10%** of salary (city population >40 L per the **2011** census), **7.5%** (15–40 L), **5%** (<15 L), less rent recovered; leased/hired: lower of actual lease rent or 10% of salary, less recovery. Rates cut from 15/10/7.5% by CBDT Notification 65/2023 w.e.f. **1 Sep 2023**. | Population band keys to the **2011** census, not 2001 — using the superseded band over-values; a "same accommodation retained" year-on-year escalation cap applies. Largely CTC/§08-owned, but valued under Rule 3 and reported in Form 123 (ex-12BA). **[Hypothesis]** — carried, not re-captured (Source: 1962 Rules, Rule 3(1); CBDT Notn 65/2023, 18.08.2023); parameter `perq.accommodation.*`. |
| **ESOP / sweat equity** | s.17(2)(vi), Rule 3(8)/(9) | Perquisite = **FMV on the date of exercise − amount paid** by the employee, per share, taxable as salary in the exercise year. Listed shares: FMV = average of opening & closing quoted price on the exercise date; unlisted: category-I merchant-banker valuation dated within 180 days. | **s.192(1C) deferral** for DPIIT-recognised eligible startups (s.80-IAC): the *amount* is fixed at exercise, but TDS defers to the earliest of 48 months from end of the relevant AY, sale, or cessation — a stateful multi-year obligation that §08 owns (FR-PAY-106). **[Hypothesis]** — carried, not re-captured (Source: 1961 Act s.17(2)(vi), s.192(1C); 1962 Rules r.3(8)/(9)); parameter `perq.esop.*`. |
| **Interest-free / concessional loan** | Rule 3(7)(i) | Perquisite = SBI benchmark rate (as on first day of FY) on the maximum monthly outstanding, less interest actually charged. Loans ≤ ₹20,000 and medical-treatment loans (specified diseases) exempt. | Rate is the SBI rate for the *matching loan type* on 1 April of the FY; not a fixed constant. **[Hypothesis]** — carried, not re-captured (Source: 1962 Rules, Rule 3(7)(i)); parameter `perq.loan.*`. |
| **Telephone / internet reimbursement** | Rule 3(7)(ix) | Reimbursement of **actual** bills for official use is exempt; a fixed allowance without bills is fully taxable — hence proof-of-spend is load-bearing. | Personal-use portion of a mixed bill is taxable; proof adjudication sets the exempt amount. **[Hypothesis]** — carried, not re-captured (Source: 1962 Rules, Rule 3(7)(ix)). |
| **Employer-paid insurance premium** | s.17(2) | GTL/GPA/parental-top-up premium borne by employer is valued at premium paid, apportioned per covered life where the policy separates it. Employee GMC premium is generally not a taxable perquisite. | Voluntary parental top-up paid by employer is the common taxable slice; must be split from the non-taxable base. **[Hypothesis]** — carried, not re-captured (Source: 1961 Act s.17(2)). |
| **Employer retiral contribution over ₹7.5 L** | s.17(2)(vii) + Rule 3B | Aggregate employer PF+NPS+superann over ₹7,50,000/FY is a perquisite; Rule 3B adds annual accretion on the cumulative excess. | Cross-vehicle, stateful across years — see §11.10. **[Hypothesis]** — carried, not re-captured (Source: 1961 Act s.17(2)(vii)/(viia); 1962 Rules r.3B); parameter `tax.retiral_aggregate_cap`. |

**Worked micro-example — movable-asset transfer.** Employer transfers a laptop (cost ₹80,000, bought 2 completed years ago) to an employee for ₹5,000. Depreciation at 50% WDV: year 1 → ₹40,000; year 2 → ₹20,000 book value. Perquisite = ₹20,000 − ₹5,000 recovered = **₹15,000 taxable**. This is deterministic under Rule 3(7)(viii); the engine computes it, the LLM at most explains it.

**Worked micro-example — motor car (1962-Rules values, periods to 31 March 2026).** Employer owns a >1.6L car used part-official/part-personal, with a company driver, employee bears no fuel. Perquisite = ₹2,400 + ₹900 = **₹3,300/month**, ₹39,600 for FY 2025-26, regardless of actual running cost. A common product defect is valuing this on actuals; Rule 3(2) mandates the flat slab. For Tax Year 2026-27 the slab values are unknown (vocabulary note), so `perq.car.*` ships with **no default** for 2026-27 periods: the operator enters the value in force with its source, recorded on the rule version, and until then the perquisite is the FR-PAY-1004 blocking item of §08 AC-106.4 — never valued at zero, never at a guessed figure, never at the 1962 figures carried forward silently. When a 2026-Rules row is published through the rule pipeline (§22.8), the tax year re-values against it. **[Reversed]** An earlier draft of this paragraph valued 2026-27 periods at the 1962 figures marked provisional; that contradicted §08 AC-106.4 and §20 V-20 ("a provision not located stays a parameter with no shipped default").

---

### 11.6 Insurance attach points — group health, accident, life

Group insurance is the highest-volume attach in Indian mid-market and the one most likely to be *already present* at a prospect (often broker-administered on spreadsheets). The v1 job is to be the **system of record for who is covered and to generate clean endorsements** — not to broke the policy and not to move premium.

**Market frame — right-sized.** **[Verified]** IRDAI puts India's FY25 commercial group health book at ₹61,435 Cr of premium across 275 mn lives — **₹2,233 per life per year** (IRDAI Annual Report 2024-25, Table I.26 — research r2/02). That average spans credit-linked, affinity and association covers and counts dependants as lives, so employer GMC per employee sits above it, by an unmeasured amount. A vendor-blog figure of ₹10,000–25,000 per employee per year implies 4.4–11.2× the IRDAI average and is banned from models (§20.4). The per-life economics are thin; this is another reason to be the data spine, not the risk-carrier or the broker.

The three group products and their distinct data needs:

| Product | Covers | Perquisite treatment (employer-paid) | Distinct data need |
| --- | --- | --- | --- |
| **GMC (Group Mediclaim)** | Employee + declared dependants; hospitalisation | Premium for *employee* generally not a taxable perquisite; premium for *voluntary parental top-up paid by employer* may be. Model both. | Dependant census, sum-insured per grade, family-definition rule (1+X), mid-year addition windows (marriage/newborn) |
| **GPA (Group Personal Accident)** | Employee (usually not dependants); accidental death/disability | Employer-paid premium treatment follows policy nature; capture for valuation | Sum-insured multiple of salary; nomination is critical |
| **GTL (Group Term Life)** | Employee; death benefit | Employer-paid term-life premium; capture per s.17(2) | Nomination critical — a policy-terms requirement, not a statutory claim; sum-insured as multiple of CTC; free-cover limit vs medically-underwritten excess |

<!-- DIAGRAM: insurance-endorsement-lifecycle -->

**The endorsement lifecycle is the core insurance FR.** An endorsement is any change to the covered population sent to the insurer/TPA between renewals: add a new joiner, delete a leaver, add a newborn/spouse, change a sum insured. Insurers reconcile premium against the endorsement log; getting this wrong means either uncovered employees (a claims disaster) or over-billed premium (a finance dispute).

| ID | Requirement | Priority | Acceptance criterion |
| --- | --- | --- | --- |
| **BEN-10** | Generate additions/deletions/modifications as structured endorsements from enrollment and dependant changes, batched per policy per cycle. | P1 | A month with 5 joiners and 2 leavers produces one endorsement batch containing exactly 7 line items in the insurer's expected shape, with a stable batch id. |
| **BEN-11** | Track endorsement status end-to-end (drafted→sent→acknowledged→premium-adjusted) with the insurer/TPA acknowledgement reference. | P1 | An endorsement without an acknowledgement reference after `endorsement_ack_sla_days` (a per-policy tenant setting taken from the insurer or TPA agreement; no product default) surfaces in an exceptions queue; status is never silently "sent". |
| **BEN-12** | Enforce the tenant's family-definition and mid-year-addition rules (e.g., newborn addition window, marriage window). | P1 | Adding a dependant outside the policy's addition window is blocked with the rule cited; a newborn added within the window auto-generates the addition endorsement. |
| **BEN-13** | Value employer-paid premium as a perquisite where applicable and feed it to the s.392 (ex-s.192) TDS computation and Form 123 (ex-12BA). | R2 · C-38 | An employer-paid parental top-up premium of ₹Y appears as a perquisite line on the payslip and in Form 123; a non-taxable employee GMC premium does not. |
| **BEN-14** | Maintain policy-level renewal/plan-year rollover as a new effective-dated scheme, carrying the census forward. | P1 | At renewal the prior scheme is `effective_to`-dated and a new scheme is created; existing enrollments roll forward with a diff report of adds/deletes since last census. |
| **BEN-15** | Reconcile the internal covered-population against an insurer/TPA census file (import) and report drift. | P1 | Importing a TPA census produces a reconciliation report listing members in our system not in theirs and vice versa; drift above `census_drift_tolerance` (a tenant setting, zero by default so any unexplained difference is shown) raises an exception. |
| **BEN-16** | Maintain sum-insured grids (by grade / salary multiple) as effective-dated scheme config, resolved per enrollment. | P1 | An employee promoted mid-year to a grade with a higher sum insured generates a sum-insured-change endorsement dated to the promotion, and the perquisite (if any) re-values from that date. |

**Worked example — mid-year join proration and endorsement.** An employee joins on the **12th of a 30-day month**. GMC employer premium is ₹1,500/month for the grade; a parental top-up (employer-paid, taxable) is ₹1,500/month. On that period's payslip the engine (BEN-02) values the taxable parental-top-up perquisite at `1,500 × (19/30) = ₹950` (19 covered days), while the non-taxable base GMC premium produces no perquisite line. The *same run* queues an `add-member` endorsement dated the 12th (BEN-10), so the insurer's premium bill and our census agree at reconciliation (BEN-15). On exit mid-month, the mirror applies: perquisite pro-rates to the covered days and a `delete-member` endorsement is queued. The proration denominator (calendar days vs standard 30) is a tenant policy resolved once, in §08, and reused — benefits never invent a second day-count convention.

**Explicitly out of scope in v1 (insurance):** claims adjudication, premium collection or payment, broker commission accounting, risk pricing, and any embedded-insurance purchase flow. We are the census-and-endorsement system of record. Claims and premium movement are the insurer/TPA's; monetising the broker relationship is a v2 decision (§11.14). **[Hypothesis]** Broker-override economics are attractive on paper but sit on a ₹2,233-per-life average premium, under an industry-wide non-life commission of ~15.3% of direct premium that is an upper bound for group health, not a midpoint, and inside the IRDAI expenses-of-management envelope (EOM Regulations 2024, Reg 6) within which commission is negotiated, not tariffed (research r2/02). Unvalidated — kill/validate via §11.19 B8 (mystery-shop 3–4 brokers for the override split on 50/100/200-life books) before any revenue is modelled.

#### 11.6.1 Endorsement generation — the decision table

BEN-10 says endorsements are generated "from enrollment and dependant changes". This table says which change produces which line, so no line is chosen by hand and no coverage-affecting change goes unsent. The canonical line types are the product's; how an insurer wants them rendered — whether dependants cascade on a member deletion, which fields a modification carries — is the adapter's (BEN-50), and is unknown per insurer until B3 reports.

| # | Change | Line(s) drafted | Effective date | Guard or refusal | Notes |
| --- | --- | --- | --- | --- | --- |
| G1 | Enrollment proposed → active (joiner) | `add_member`, plus `add_dependant` per requested coverage | Enrollment `effective_from` | Each dependant passes CV1's guards | The initial census for the member (BEN-02) |
| G2 | Enrollment active → terminated (exit, withdrawal) | `delete_member`, listing the member's open dependant coverage | Enrollment `effective_to` | — | The adapter decides whether dependant lines are sent or cascaded |
| G3 | Enrollment active → suspended | `modify_member` or `delete_member`, per `suspension_endorsement_type` | Suspension date | Key set, or BEN-68 refuses | BEN-07 |
| G4 | Enrollment suspended → active | The inverse of G3: `add_member` (re-add) after a deletion, `modify_member` after a modification | Return date | — | BEN-07 |
| G5 | Life event: birth, adoption, marriage | `add_dependant` | Event date | Within the frozen window evaluation (BEN-65); otherwise refused until renewal (BV-20) | BEN-12 |
| G6 | Life event: death of a dependant; relation ended | `delete_dependant` | Event date | Evidence per tenant policy | CV5 |
| G7 | A child reaches `child_age_limit` | `delete_dependant` | Renewal date or birthday, per `child_age_test` | — | Computed from `dob`, never entered by hand (BEN-08) |
| G8 | A grade or salary change moves the sum insured | `sum_insured_change` | The change's effective date | The grid resolves a different sum insured | BEN-16 |
| G9 | ESI boundary crossing (BEN-09) | `add_member` on leaving ESI; `delete_member` on entering it | The date §06.3's contribution-period rule gives | One roll per period | The ESI position after on or about 21 Nov 2026 is unresolved (§06.9) |
| G10 | A census field already sent is corrected — date of birth, gender, name, relation | `modify_dependant` or `modify_member`; if the correction changes eligibility, the consequence as its own line (for example G7) | The correction date, or the original effective date where the adapter records that the insurer's terms allow it | Only fields in `census_field_set` | Never an edit of the old line (BEN-70) |
| G11 | A line was sent wrong — wrong person, wrong date | `correction` naming `corrects_line` | The corrected date | — | BEN-70 |
| G12 | The insurer confirms a different effective date | None — a coverage version (CV4) | — | — | `reason_code` insurer_confirmation on the version |
| G13 | Plan-year renewal | None — a renewal census on the new scheme with a diff report (BEN-14) | New policy start | — | Renewal is a new scheme row, not endorsements |
| G14 | Death in service of the employee | `delete_member`, reason leaver | Date of death | — | Claims are out of scope (above); the nomination in force comes from Q4 |
| G15 | A salary revision with no sum-insured effect; an address or phone change | None — unless the field is in `census_field_set`, then `modify_member` | — | — | Keeps batches to coverage-affecting change |
| G16 | Mid-term re-broking to a new insurer (BEN-01) | None to the old insurer unless its adapter requires member deletions; a full census on the new scheme | The new scheme's `effective_from` | The old scheme `effective_to`-dated the day before | Coverage windows on the old enrollments end; new ones open — never a silent carry-over of `insurer_member_ref` |
| G17 | Transfer to another legal entity of the group (§07.3.3) | Where one policy covers both entities: `modify_member` if the entity is in `census_field_set`, else none. Where each entity has its own policy: `delete_member` on the old policy and `add_member` on the new | The day before the transfer, and the transfer date — no gap and no overlap | Both policies' keys set | Each entity that is a separate deductor is its own FBP and gift boundary: the old entity's cycle closes the employee as a leaver (D8), the new one's opens as a joiner, and `gift_threshold_scope` decides aggregation (B9) |

#### 11.6.2 Endorsement-history requirements

| ID | Requirement | Priority | Acceptance criterion |
| --- | --- | --- | --- |
| **BEN-69** | Generate lines only through the §11.6.1 decision table and carry each through the §11.3.1 states; seal each batch with a payload hash; resend byte-identical; take acknowledgements line by line. | R2 · C-38 | A seven-line batch (BEN-10) whose acknowledgement accepts six lines and rejects one ends `partially_acknowledged`, with six lines `acknowledged`, one `rejected` and that line's coverage voided (CV3). A resend after the SLA carries the same `payload_sha256` as the first send. |
| **BEN-70** | Correct what was sent with a new line — `correction` or a modification — that names the line it corrects; never edit a sent line. | R2 · C-38 | Fixing a child's date of birth after the addition was acknowledged drafts a `modify_dependant` line with `corrects_line` set; Q2 for the child returns both lines in order; the original line's `census_payload` is byte-identical to what was sent. |
| **BEN-71** | Capture the premium change the insurer states per line (`premium_delta`, `premium_delta_ref`). Where the premium head is a taxable perquisite (§11.5), that figure is BEN-13's valuation input, through the perquisite feed (§11.9.5). The product records the figure; it never bills, collects or pays premium (BEN-52). | R2 · C-38 | An acknowledgement stating a monthly premium for a parent added to the parental top-up produces a monthly perquisite input of that amount from the coverage's `valid_from`; a base-GMC line with a stated premium produces a premium record and no perquisite input. |
| **BEN-72** | Reconcile an imported insurer census by the §11.2.2 match keys and categories, counting only unexplained differences toward `census_drift_tolerance`. | R2 · C-38 | Two additions `sent`, inside their SLA and absent from the census show as two explained `ours_only` rows and do not breach a zero tolerance; the same two past their SLA are unexplained and raise the exception. A census row that matches ours only on name is `theirs_only`. |
| **BEN-73** | Erase an endorsement file under its retention class without losing the history: the lines keep the census fields sent, under the subject key, and the file re-renders from them and is checked against the sealed hash. After a subject key is shredded, that person's census fields return `ERASED` and a re-render is refused with the tombstone (§14.6.1a). | R2 · C-38 | After the batch file is erased, Q2 still returns the lines and a re-render whose hash equals `payload_sha256`. After the employee's subject key is shredded, Q2 returns the lines with `ERASED` fields and refuses the re-render. |

#### 11.6.3 Worked example and test scenarios — one family, one tax year

**Worked example.** Tax Year 2026-27. An employee is on base GMC (employer-paid; not a taxable perquisite, §11.5) and on the employer-paid parental top-up, which is taxable. Policy terms entered by the tenant from its insurer agreement (illustrative): `addition_window_days.birth` = 30, `endorsement_ack_sla_days` = 15, a parental top-up premium of ₹1,500 per life per month on the insurer's schedule (the figure §11.6's proration example uses).

1. **Father added at renewal.** The renewal census for the new policy year (1 April 2026) carries the father on the top-up (G13; CV1). The April pay run closes on 25 April before the insurer's acknowledgement arrives, so April carries no top-up perquisite for him. The acknowledgement lands on 10 May confirming cover from 1 April (CV2). The May run consumes two perquisite inputs — April (recognised late) and May — at ₹1,500 each, so taxable income rises by ₹3,000 in the May run's projection. April's locked payslip is not touched; the TDS on the late April input is recovered through the remaining months' projection (§08 FR-PAY-205), and the tax year's Form 123 total carries ₹1,500 for April (§11.9.5).
2. **Mother refused by the insurer.** The same renewal census carries the mother; the insurer's acknowledgement rejects her line with its own reason (EL7). Her coverage window is voided (CV3) — our record never shows her covered — an exception is raised (BV-27) and the employee is told. No perquisite input exists for her, so no tax was ever computed on a premium nobody paid.
3. **Child born.** The child is born on 5 August 2026; the employee records the birth on 18 August — 13 days in, inside the 30-day window (BEN-65). The `add_dependant` line is drafted, validated and sealed into the 25 August batch, sent on 26 August (EB3). No acknowledgement arrives by 10 September, 15 days after sending; the line enters the exceptions queue and is resent on 12 September with the same payload hash (EL8, attempt 2). The insurer acknowledges on 20 September, confirming cover from 5 August (CV2). The child is on base GMC, so no perquisite arises. Q1 for 1 September "as recorded on 15 September" answers *requested, not confirmed*; "as recorded on 21 September" answers *covered from 5 August*.
4. **Totals for the tax year.** The father's top-up contributes ₹1,500 × 12 = ₹18,000 of taxable perquisite (April to March), the figure §11.11's worked example carries for a parental top-up. The mother contributes nothing; the child contributes nothing.

**Test scenarios.** Each is a golden case in the §22.8 corpus (FR-RULE-011) wherever it exercises a published rule version, and an acceptance test otherwise.

| ID | Given | When | Then | Covers |
| --- | --- | --- | --- | --- |
| TB-D01 | `max_spouses` 1, `max_children` 2 (a 1+3 family); spouse and two children covered | A third child's birth is recorded inside the window | Addition refused with BV-19 naming `max_children`; existing cover unchanged | BEN-03, BEN-68 |
| TB-D02 | `addition_window_days.birth` 30 | A birth is recorded 40 days after the event | Refused with BV-20; flagged for the next renewal census | BEN-12, BEN-65 |
| TB-D03 | `child_age_test` = renewal, then = birthday | A child reaches `child_age_limit` mid-year | A `delete_dependant` line dated at renewal in the first case, at the birthday in the second | BEN-08, G7 |
| TB-D04 | `parents_or_in_laws_exclusive` = true, both parents covered | A parent-in-law is requested | Refused with BV-22 | BEN-03 |
| TB-D05 | `parents_allowed` unset | A parent is requested | Refused, naming the key (BEN-68) | BEN-68 |
| TB-D06 | No written consent for the dependant's disability data | The disability flag is entered | Field refused (BV-23); the dependant's coverage proceeds | BEN-03 |
| TB-D07 | `suspension_endorsement_type` = delete_member | An enrollment is suspended, then reactivated | `delete_member`, then `add_member` (re-add) | BEN-07, G3, G4 |
| TB-D08 | Two employees add a child with the same name and date of birth | The second addition is submitted | Held for review with both records shown; "different person" releases it | BEN-67 |
| TB-D09 | A seven-line batch | The acknowledgement rejects one line | Batch `partially_acknowledged`; the rejected line's coverage voided | BEN-69, CV3 |
| TB-D10 | A line `sent`, SLA 15 days | 16 days pass without acknowledgement | Exception raised; the resend has the same `payload_sha256`; the exception closes on acknowledgement | BEN-11, EL8 |
| TB-D11 | Cover requested from the 1st | The insurer confirms from the 4th | New coverage version dated the 4th with reason; any perquisite re-values | CV4, E30 |
| TB-D12 | An acknowledged addition | The child's date of birth is corrected | A `modify_dependant` line with `corrects_line`; Q2 returns both | BEN-70, G10 |
| TB-D13 | Two additions `sent` inside their SLA and absent from the census | The census is reconciled; later, the SLA passes | First explained, no breach; then unexplained and the exception fires | BEN-72 |
| TB-D14 | A census row matching ours only on name | The census is reconciled | `theirs_only` | BEN-72 |
| TB-D15 | A sealed batch | Its file is erased; later the subject key is shredded | Re-render matches the hash; after shredding, `ERASED` fields and a refused re-render | BEN-73 |
| TB-D16 | A parental top-up line and a base-GMC line, each with a stated premium | Both are acknowledged | A perquisite input for the top-up only | BEN-71, BEN-13 |
| TB-D17 | A coverage corrected after the fact | Q1 is asked "as recorded" before and after the correction | Two different, stable answers | BEN-66 |
| TB-D18 | An employee crosses the ESI boundary | The period closes | `add_member` or `delete_member` on the date §06.3 gives; the employee appears in exactly one roll for the period | BEN-09, G9 |

#### 11.6.4 Valuing an employer-paid premium from the coverage history

BEN-13 values an employer-paid premium as a perquisite "where applicable". With coverage held as confirmed windows (§11.2.1) and the insurer's premium captured per line (BEN-71), the valuation is mechanical. Which premium heads are perquisites at all is the §11.5 employer-paid insurance row — employer-borne GTL, GPA and parental top-up premium valued at the premium paid, the employee's base GMC generally not a perquisite — carried from v0.3, **[Hypothesis]**, with its 2026-Rules position under B9. The tenant never chooses a tax treatment; it records the policy's premium heads as facts (`premium_heads`, §11.2.1).

| # | Premium head | Basis | Coverage state in the period | Perquisite input |
| --- | --- | --- | --- | --- |
| PR1 | A head the §11.5 row does not treat as a perquisite (the employee's base GMC) | Any | Any | None; the premium is recorded only |
| PR2 | A head the §11.5 row values — parental top-up, GTL, GPA | Per life | Confirmed for all or part of the period | The employer's share of the per-life premium × covered days ÷ §08's proration denominator (BEN-02) |
| PR3 | As PR2 | Per family, with the policy stating each relation's share | Confirmed | The stated share for the covered relations, prorated as PR2 |
| PR4 | As PR2 | Per family, with no stated split | Confirmed | Operator review. The product never invents an apportionment (§11.5: "apportioned per covered life where the policy separates it") |
| PR5 | As PR2 | Any | Requested, not confirmed | None yet; on confirmation, inputs for every period back to `valid_from` (§11.9.5) |
| PR6 | As PR2 | Any | Rejected | None; any earlier input is superseded to zero |
| PR7 | Any valued head where the employee pays part through payroll | Any | Confirmed | The employer's share only; the employee's recovered share never enters the perquisite |

The input carries full precision; rounding happens where §08 forms the statutory head, not here (§08 FR-PAY-108, rounding code R0).

**Worked example.** Both parents are on the employer-paid parental top-up at ₹1,500 per life per month on the insurer's schedule; the tenant recovers 25% of the top-up premium from the employee through payroll (an illustrative tenant policy). In a 30-day month the mother is covered all month and the father from the 12th (19 covered days, the §11.6 example). Premium for the month: ₹1,500 + ₹1,500 × 19/30 = ₹1,500 + ₹950 = ₹2,450. Employer's share at 75%: **₹1,837.50**, the perquisite input (PR2, PR7). Had the policy priced the two parents as one family premium of ₹3,000 without a stated split, the father's part-month could not be apportioned without inventing a rule, so the period would go to operator review (PR4).

#### 11.6.5 Renewal under changed terms, and sum-insured resolution

**Renewal.** BEN-14 rolls the census forward into a new scheme row. A new policy year can change the terms — fewer children covered, parents no longer allowed, a new child age limit — so the renewal census is computed by re-applying the *new* `coverage_config` to every continuing member and dependant, never by copying last year's list.

| Renewal category | Test | Behaviour |
| --- | --- | --- |
| Continuing | Covered at the old policy's end; eligible under the new terms | Carried into the renewal census |
| Added in-year | Confirmed during the old policy year | Carried; the diff report lists it |
| Deleted in-year | Ended during the old policy year | Absent; the diff report lists it |
| Age-out at renewal | `child_age_test` = renewal and the limit reached | Excluded, with a `delete_dependant` line where the adapter needs one (G7) |
| Newly ineligible | Eligible under the old terms, not under the new — for example, three children against a new `max_children` of 2 | The renewal census is **held** until HR admin resolves each case. The product never chooses which dependant leaves |
| Newly eligible | Not coverable before, coverable now — for example, parents-in-law newly allowed | Not added automatically; the employee may request (CV1) |
| Terms missing | A key the new terms need is unset | BEN-68 refuses the renewal census, naming the key |

The premium schedule is re-read from the new policy; perquisite inputs from the new `policy_start` use it (PR2).

**Sum-insured resolution.** BEN-16 resolves a member's sum insured from the grid. The terms it needs are insurer terms, entered per policy with no product default:

| Key | Meaning |
| --- | --- |
| `sum_insured_basis` | Grade grid, salary multiple or flat (§11.2.1) |
| `sum_insured_salary_base` | For a salary multiple, which salary figure is multiplied — CTC, basic or gross |
| `sum_insured_rounding` | The insurer's rounding step for a computed sum insured |
| `max_sum_insured` | The policy's ceiling per member |
| `si_backdating_accepted` | Whether the insurer accepts a sum-insured change dated in the past |

A grade or salary change resolves a new sum insured on its effective date (G8). A back-dated revision — an arrears case (§08.5) — produces a `sum_insured_change` dated at the revision's effective date where `si_backdating_accepted` is true, and at the date the change was recorded where it is false; Q1 shows both the requested and the insurer-confirmed dates.

**Worked example.** A GTL policy insures 3 × CTC (an illustrative policy term). A revision recorded on 20 August 2026 raises CTC from ₹12,00,000 to ₹15,00,000 with effect from 1 July. The sum insured moves from ₹36,00,000 to ₹45,00,000. With `si_backdating_accepted` = true the line is dated 1 July; with false, 20 August. The employer-paid GTL premium, a valued head (PR2), re-values from whichever date the insurer confirms (CV4).

| ID | Requirement | Priority | Acceptance criterion |
| --- | --- | --- | --- |
| **BEN-92** | Value employer-paid premium perquisites from confirmed coverage windows and the insurer's stated premium by PR1–PR7, never inventing an apportionment. | R2 · C-38 | The worked example yields ₹1,837.50; the same parents under an unsplit family premium produce an operator-review item and no figure; a rejected parent produces no input. |
| **BEN-93** | Compute each renewal census by re-applying the new policy's terms, hold it while any newly ineligible case is unresolved, and never add a newly eligible dependant without a request. | R2 · C-38 | A renewal cutting `max_children` from 3 to 2 for a member with three covered children is held with that member listed; after HR admin records which child leaves, the census proceeds and a `delete_dependant` line is drafted. |
| **BEN-94** | Resolve sum insured by the policy's basis, salary base, rounding step and ceiling, and date back-dated changes by `si_backdating_accepted`. | R2 · C-38 | The GTL worked example produces ₹45,00,000 dated 1 July under backdating and 20 August without; a salary multiple above `max_sum_insured` resolves to the ceiling; a missing `sum_insured_salary_base` is refused by BEN-68. |

| ID | Given | When | Then | Covers |
| --- | --- | --- | --- | --- |
| TB-D19 | Worked example, §11.6.4 | The month runs | ₹1,837.50 perquisite input | BEN-92 |
| TB-D20 | The same parents on an unsplit family premium | The month runs | Operator review; no figure | BEN-92, PR4 |
| TB-D21 | A renewal reducing `max_children` from 3 to 2 | The renewal census is built | Held, listing the member | BEN-93 |
| TB-D22 | A renewal newly allowing parents-in-law | The renewal census is built | No parent-in-law added | BEN-93 |
| TB-D23 | GTL worked example under each `si_backdating_accepted` value | The revision is recorded | Line dated 1 July, or 20 August | BEN-94 |
| TB-D24 | A re-broking mid-term | The new scheme starts | Old coverage windows end; a full census on the new scheme; no member reference carried over | G16 |
| TB-D28 | A renewal whose new terms leave `child_age_test` unset | The renewal census is built | Refused, naming the key (BEN-68) | BEN-93 |
| TB-D25 | A transfer on 1 November between two entities with separate GMC policies | The transfer is recorded | `delete_member` dated 31 October on the old policy; `add_member` dated 1 November on the new; Q1 shows cover on every day | G17 |
| TB-D26 | An acknowledgement that echoes our `endorsement_id` | It is imported | Matched on the id, whatever the composite fields say | §11.13.1 |
| TB-D27 | An acknowledgement row without our id that fits two sent lines | It is imported | BV-36; neither line moves | §11.13.1, E33 |

---

### 11.7 Statutory terminal benefits — gratuity accrual and EDLI

These are not *voluntary* attach — gratuity is owed by statute from 10 employees and EDLI rides with EPF coverage from 20 (EV-057; §06.1) — but they share the nominee, accrual and valuation machinery and belong in the benefits model. Building them here avoids a second nomination/accrual subsystem in the payroll engine. §06.6 is the canonical statement of gratuity law; this subsection specifies only what the benefits model stores and computes.

**Gratuity.** **[Verified]** Gratuity is now Code on Social Security 2020 Chapter V (ss.53–56); the Payment of Gratuity Act 1972 is repealed (CoSS s.164(1)); that its Central Rules are superseded by the Social Security (Central) Rules 2026 is carried from v0.3, not re-captured (**[Hypothesis]**, §06.6). It is payable on exit after **5 years of continuous service** — the condition does not apply on death, disablement or fixed-term expiry, and fixed-term and deceased employees are paid pro rata (CoSS s.53) — at **(15/26) × last-drawn monthly wages × completed years of service**, service in excess of six months in the final year counting as a full year. "Wages" is the CoSS s.2(88) definition with the 50% add-back (§06.10), the same gratuity wage base §08 resolves (§08.1, I1). Fixed-term eligibility after one year is a rules-level reading from two professional sources, not the Code's text (**[Hypothesis]**, §06.6). **Two ceilings, both parameters.** The ceiling on gratuity *payable* is "such amount as may be notified" under CoSS s.53(3) and no Code-era notification has been located — the familiar ₹20 lakh is a legacy of the repealed Act (§06.6). The *tax-exemption* ceiling — lifetime and cumulative across employers, under 1961-Act s.10(10) for FY 2025-26 and earlier — is the §06 parameter `tax.gratuity_exemption_ceiling`; v0.3's ₹20,00,000 figure is carried, not re-captured (**[Hypothesis]**, §06.13), and its 2025-Act equivalent is unmapped (§06.6). **[Reversed]** v0.3 presented ₹20 lakh as a current, verified ceiling and cited a Payment-of-Gratuity-Act notification for the tax exemption.

Why it belongs in the data model in v1, not deferred:

1. **It is a balance-sheet liability that accrues every period**, not just an exit event. `gratuity_accrual` persists the per-employee accrued amount so finance can book the provision and an actuary can value it — a benefit the engine cannot see is a liability the employer under-provisions.
2. **Nomination is statutory** — required from each employee with one year of service (CoSS s.55; legacy Form F) — and shares the `nominee` table; death-benefit routing must be correct.
3. **The exit computation must be deterministic and effective-dated** — "last-drawn wages" is the §08 gratuity wage base for the period of exit, and both ceilings are effective-dated parameters, one of them with no Code-era notification located as of September 2026.

**EDLI (Employees' Deposit-Linked Insurance).** **[Verified]** A life-cover benefit under the EPF umbrella. The EDLI Scheme 1976 is saved under CoSS s.164(2)(b) only to on or about 21 Nov 2026 (EV-002; §06.9); the benefit is computed and paid by EPFO, never by the product. v0.3's legacy benefit values — **≈ 35× average monthly wages (capped at the wage ceiling) + bonus, maximum ₹7,00,000, minimum ₹2,50,000** — are carried, not re-captured (**[Hypothesis]**); the product displays them only as information, parameters `edli.benefit_max` and `edli.benefit_min`, and the Code-era values are unmapped (B10). **[Verified]** The employer contributes **0.5% of wages capped at the ₹15,000 wage ceiling (max ₹75/employee/month)**, employer-only (EPFO EDLI page, r1/06 — §06.2). The ceiling's re-fixing instrument, S.O. 2702(E) of 29.05.2026, was read through a professional alert quoting it, not the gazette — **[Verified — mirror]**; pull from the primary source before customer use (§06.2). The load-bearing edge case: an employer running a **superior GTL policy can hold an EDLI exemption**, replacing the 0.5% contribution — so GTL and EDLI *interact*, and the model must know which is live for a tenant. That EDLI-exempted establishments exist is verified (EPFO ECR FAQ, Exempted Establishments — r5/02); the legacy provision v0.3 named (EPF Act s.17(2A)) and the "superior GTL" condition are carried, not re-captured (**[Hypothesis]**), and the Code-era exemption provision is unmapped (§11.19 B10). Exemption does not remove the establishment from the ECR or zero its outflow: an exempted establishment still reports EDLI Wages on every ECR line, with the contribution computed as zero (EPFO ECR FAQ, Exempted Establishments — research r5/02), and it pays EDLI inspection charges of 0.005% of wages, minimum ₹1,250, within fifteen days of the close of every month (S.O. 2701(E), 29.05.2026 — research r2/10; §06.2). That notification prices the charge for the EDLI Scheme 1976, so it shares the scheme's saving to on or about 21 Nov 2026; the post-cliff charge is B10's to find, never assumed to carry over.

| ID | Requirement | Priority | Acceptance criterion |
| --- | --- | --- | --- |
| **BEN-17** | Accrue gratuity per employee per period into `gratuity_accrual`, using the §08 gratuity wage base (CoSS s.2(88) with the add-back) and two effective-dated ceiling parameters: `gratuity_payment_ceiling` (unset until a CoSS s.53(3) notification is located; while unset the accrual is uncapped and flagged) and `tax.gratuity_exemption_ceiling` (§06.13; per tax year and Act, value carried and unverified). | R1 · C-17 | For an employee with 6 completed years and last-drawn gratuity wages ₹52,000, the accrued gratuity equals `(15/26) × 52,000 × 6 = ₹1,80,000`; the exempt portion respects the configured tax-exempt ceiling for the period, net of gratuity already exempted with prior employers; the figure re-computes on a retro wage correction; an accrual computed while `gratuity_payment_ceiling` is unset carries a visible "payment ceiling: no notification located" flag. |
| **BEN-18** | Maintain gratuity and EDLI/EPF nominations in the shared `nominee` table with share validation, rendering each on the form its instrument version prescribes (`nominee.form_ref`; legacy Form F and Form 2, successors unmapped — B10). | R2 · C-38 | A gratuity nomination whose shares do not sum to 100% is rejected; the same employee's EPF nomination is an independent set; an employee reaching one year of service without a gratuity nomination is surfaced as a compliance gap (CoSS s.55). |
| **BEN-19** | Track EDLI applicability and the GTL-exemption flag per tenant (legacy EPF Act s.17(2A); Code-era provision unmapped — B10), so the 0.5% EDLI contribution is excluded from the product's expected-dues computation when an exempting GTL policy is live. | P1 | Marking a tenant EDLI-exempt (with an exempting GTL policy on file) removes the 0.5% EDLI amount from the product's expected-dues and cash-flow computation and adds the exempted-establishment EDLI inspection charge (0.005% of wages, minimum ₹1,250 — S.O. 2701(E)); every ECR line still carries EDLI Wages (EV-035; research r5/02). The challan itself is produced by the EPFO portal after return approval (EV-036) — the product never claims to alter it. Removing the exemption restores the 0.5% line; both changes are effective-dated. |

<!-- DIAGRAM: gratuity-edli-accrual -->

#### 11.7.1 Gratuity accrual — the computation, period by period

BEN-17 states the formula and the two ceilings. This specifies the computation a build team implements: what it reads, how completed years resolve, how the provision moves between periods, and what it does where the law's text was not captured. The *legal* content — that gratuity is CoSS Chapter V, payable after five years of continuous service except on death, disablement or fixed-term expiry, at (15/26) × last-drawn monthly wages × completed years with service in excess of six months in the final year counting as a full year — is §06.6's and is restated here only as the inputs to the arithmetic; every one of those elements is either **[Verified]** or **[Hypothesis]** exactly as §11.7 marks it.

**Inputs, and nothing else.** The accrual is a pure function of these (Part E-3), evaluated on every period close for every employee in a tenant that has crossed the ten-employee threshold (§06.6).

| Input | Source | Note |
| --- | --- | --- |
| *W* — last-drawn monthly gratuity wages at the as-of date | §08's gratuity wage base (§08.1, I1; the s.2(88) definition with the 50% add-back, §06.10) | Never basic, never CTC, never the PF wage after the ₹15,000 ceiling — the gratuity base is uncapped (§11.9.7) |
| *Y* — completed years of continuous service at the as-of date | §07's service record and the date of joining | Resolved by GY1–GY6 below |
| As-of date | The period close, or the exit date for a settlement | Fixes both *W* and *Y* |
| `gratuity_vesting_years` | §06.6 — five years of continuous service (CoSS s.53) | A rule row, not a constant |
| `gratuity_payment_ceiling` | §11.20 — **unset**; no Code-era notification located (B10) | While unset the accrued amount is uncapped and every figure carries the flag (BEN-17) |
| `tax.gratuity_exemption_ceiling` | §06.13 — carried, **[Hypothesis]** | Used only at settlement (§11.7.2), never in the accrual |
| `funded_flag`, trustee or insurer reference | `gratuity_accrual` | Changes who holds the money, never the computed liability |

**Completed years — the decision table.** *Y* is a count, not a duration, and the two places a naive implementation goes wrong are the final part-year and a break in service.

| # | Situation | *Y* | Note |
| --- | --- | --- | --- |
| GY1 | Whole years of continuous service, no part year | The whole years | — |
| GY2 | A final part-year of more than six months | Whole years + 1 | "In excess of six months" (§06.6) |
| GY3 | A final part-year of exactly six months | Whole years | Six months is not *in excess of* six months. The reading of the carried wording is held as `gratuity_six_month_boundary`, default `strict_excess`, routed to B10 — a boundary the engine must not decide silently in either direction |
| GY4 | A final part-year of six months or less | Whole years | — |
| GY5 | A recorded break in service — unpaid leave, suspension, a re-hire after a gap | Operator review before the next settlement; the accrual continues on the service record §07 holds and the break is flagged | What counts as continuous service under the Code is **not captured** by any research round. `gratuity_continuous_service_rule` ships unset and the engine never invents a day-count test (Part A-2; Part D-11) |
| GY6 | Service transferred from another entity of the group (§07.3.3) | Per `gratuity_continuity_on_transfer`, unset | Never a silent reset to zero, and never a silent carry-over — the transfer goes to operator review with the transfer terms (§11.7.2, GX5) |

**The accrual and the provision movement.** Accrued liability at an as-of date is `A = (15/26) × W × Y`. The figure a finance team books for a period is the *movement*, `A(this period) − A(previous period)`, which is why the accrual is persisted per period rather than recomputed on demand: the movement is a fact about two versions, not about one. Three consequences follow.

1. **A wage revision re-bases the whole accrual, not the year it lands in.** *W* is last-drawn wages, so a revision multiplies every completed year. The movement in the period of the revision therefore contains a step, and the engine must present it as such rather than smoothing it.
2. **A retro wage correction re-values the periods it covers.** The accrual is recomputed against the wage base in force for each period (§11.15 item 4); the provision movements for locked periods are not edited — the difference lands in the next open period as the movement, with the corrected series available for the finance export.
3. **Vesting is not a switch on the accrual.** Whether a provision is recognised before `gratuity_vesting_years` is a finance policy, `gratuity_provision_pre_vesting` (recognise from joining, or from vesting), owned by the finance lead with no product default; whichever is set, the accrual row always carries both the vested and the unvested amount, so the choice changes presentation, not data.

**Worked examples.** Figures are the ones BEN-17's criterion already uses, so the arithmetic is checkable against it.

1. **Six completed years, ₹52,000 last-drawn gratuity wages.** `15 ÷ 26 = 0.576923…`; `(15/26) × 52,000 = ₹30,000` per completed year exactly. `A = 30,000 × 6 = ₹1,80,000`.
2. **A revision to ₹58,500 in the same year.** `(15/26) × 58,500 = ₹33,750` per completed year; `A = 33,750 × 6 = ₹2,02,500`. The movement in the revision's period is `2,02,500 − 1,80,000 = ₹22,500` — six years of re-basing, recognised at once, not ₹3,750.
3. **The part-year boundary, on the same wages.** At 6 years and 7 months, GY2 gives *Y* = 7 and `A = 33,750 × 7 = ₹2,36,250`. At 6 years and exactly 6 months, GY3 gives *Y* = 6 and `A = ₹2,02,500` — a ₹33,750 difference turning on one day, which is why GY3 is a named parameter and not a coding choice.
4. **The add-back interaction.** §11.9.7's employee has a gratuity wage of ₹50,000 after the add-back where an FBP restructure moves ₹10,000 into excluded heads, against ₹55,000 before it. `(15/26) × 50,000 = ₹28,846.1538…` per completed year against `(15/26) × 55,000 = ₹31,730.7692…`; at six years, `₹1,73,076.92` against `₹1,90,384.62`. The accrual carries full precision and rounds only where §08 forms a head (rounding code R0) — an FBP declaration is therefore a *liability* event as well as a tax event, which is the whole reason BEN-97 signals the resolver.

| ID | Requirement | Priority | Acceptance criterion |
| --- | --- | --- | --- |
| **BEN-99** | Persist a `gratuity_accrual` row per employee per period carrying *W*, *Y*, the accrued amount, the vested and unvested split, the period movement, the rule versions for the wage base and the vesting years, and the ceiling flags; resolve *Y* by GY1–GY6, routing GY5 and GY6 to operator review rather than deciding them. | R1 · C-17 | Worked examples 1 to 4 reproduce to the paise, including the ₹22,500 step in the revision period and the ₹33,750 difference across the GY3 boundary. An employee with a recorded break in service accrues and is flagged, and the settlement cannot be approved until the break is resolved. A retro wage correction re-values the covered periods without editing a locked period's booked movement. |

| ID | Given | When | Then | Covers |
| --- | --- | --- | --- | --- |
| TB-GR01 | Six completed years, ₹52,000 gratuity wages | The period closes | `A` = ₹1,80,000 | BEN-99 |
| TB-GR02 | The same, revised to ₹58,500 | The revision period closes | `A` = ₹2,02,500; movement ₹22,500 | BEN-99 |
| TB-GR03 | 6 years 7 months at ₹58,500 | The period closes | *Y* = 7; `A` = ₹2,36,250 | GY2 |
| TB-GR04 | 6 years and exactly 6 months at ₹58,500 | The period closes | *Y* = 6; `A` = ₹2,02,500, with `gratuity_six_month_boundary` printed on the figure | GY3 |
| TB-GR05 | A three-month unpaid break in the service record | The period closes | The accrual continues and the break is flagged; a settlement attempt goes to operator review | GY5 |
| TB-GR06 | `gratuity_payment_ceiling` unset | Any accrual is produced | Uncapped, with the "no notification located" flag on every figure | BEN-17, BEN-99 |
| TB-GR07 | §11.9.7's FBP restructure | The declaration takes effect | The gratuity base falls to ₹50,000 and the accrual re-values from the next run | BEN-97, BEN-99 |
| TB-GR08 | A retro wage correction covering three locked periods | The next run closes | The corrected series is available; no locked period's booked movement changes | BEN-99 |

<!-- DIAGRAM: fr-benefits-gratuity-lifecycle-states -->

#### 11.7.2 Gratuity settlement at exit, and the exemption ceiling

The accrual becomes a payment at exit. The states are in the diagram above; this fixes the exit-cause decision table, the tax split and the two places the product must refuse to decide.

| # | Exit cause | Entitlement | Engine behaviour |
| --- | --- | --- | --- |
| GX1 | Resignation or termination with completed service at or above `gratuity_vesting_years` | Payable | `A` at the exit date, computed on the exit period's wage base |
| GX2 | Resignation or termination below the vesting years | Not payable | The provision releases in full (GA13); the F&F run carries no gratuity line |
| GX3 | Death in service, or disablement | Payable whatever the completed service — the vesting condition does not apply, and the amount is pro rata (CoSS s.53; §06.6) | Computed and flagged: the pro-rata basis for a part year is §06.6's, and where it is not resolved the settlement is an operator-review item, never a guessed fraction |
| GX4 | Fixed-term expiry | Payable pro rata (CoSS s.53) | As GX3. The reading that eligibility begins after one year is **[Hypothesis]** from two professional sources (§06.6), so the engine computes and flags rather than gating |
| GX5 | Transfer to another entity of the group (§07.3.3) | Not a settlement unless the transfer terms make it one | `gratuity_continuity_on_transfer` is unset: the case goes to operator review with the transfer terms, and the accrual neither resets nor carries silently (GY6) |
| GX6 | Any reduction, forfeiture or withholding of gratuity | Not a product decision | The engine always computes the full entitlement. A reduction is an operator-entered instruction with a recorded basis and a distinct checker, flagged to the legal lead; no configuration applies one automatically (Part D; §23) |

**The tax split at settlement.** The exemption ceiling is lifetime and cumulative across employers (§11.7). Two things follow for the build.

- **The product cannot verify prior exemption.** The remaining ceiling is `tax.gratuity_exemption_ceiling − prior_gratuity_exempt_declared`, and the second term is an employee declaration the product holds no independent record of. Defaulting it to zero would hand the employee the *full* ceiling and under-deduct — the direction the default-direction rule (§11.9.1) forbids — so where the employee's service record shows any prior employment, the declaration is a **blocking Task** on the F&F run, resolved either by the declaration with its evidence or by an operator entry with a recorded source. Where no prior employment is recorded, the term is zero and the figure says so.
- **Only two limbs are captured.** The exempt amount the engine computes is `min(amount paid, remaining ceiling)`. Whether the carried law has further limbs — a formula amount, a category distinction — is **not captured by any research round**, so it is B9's to read, and until it reports, the computed exemption carries the `provisional` flag through the feed (§11.9.5) and prints as such. Nothing is invented to fill the gap.

**Worked examples**, on TB-GR01's ₹1,80,000 entitlement and the carried ceiling parameter.

| # | Prior exempt declared | Remaining ceiling | Exempt | Taxable, into the F&F run's salary TDS |
| --- | --- | --- | --- | --- |
| 1 | ₹0, no prior employment recorded | ₹20,00,000 | ₹1,80,000 | ₹0 |
| 2 | ₹14,00,000 | ₹6,00,000 | ₹1,80,000 | ₹0 |
| 3 | ₹19,50,000 | ₹50,000 | ₹50,000 | ₹1,30,000 |
| 4 | Not declared, prior employment recorded | — | — | Blocking Task; the F&F run cannot be approved until it is resolved |

The taxable part reaches the payroll engine as a `perquisite_input` on the F&F period like every other benefits figure (§11.9.5) — it is taxable salary, not a perquisite, and carries the head its §08 catalogue row gives it (§11.9.4).

| ID | Requirement | Priority | Acceptance criterion |
| --- | --- | --- | --- |
| **BEN-100** | Settle gratuity through GX1–GX6 and the two-limb exemption: compute the full entitlement on the exit period's wage base, hold a settlement whose continuity, pro-rata basis or reduction the engine may not decide, require the prior-exemption declaration where prior employment is recorded, and deliver the taxable part through the feed. | R1 · C-17 | Worked examples 1 to 4 reproduce; a death-in-service exit below the vesting years still produces an entitlement; an exit with an unresolved break in service or an unrecorded prior-exemption declaration holds the F&F approval and names what is missing; no configuration reduces a computed entitlement. |

| ID | Given | When | Then | Covers |
| --- | --- | --- | --- | --- |
| TB-GR09 | Four completed years, resignation | F&F runs | No gratuity line; the provision releases in full | GX2 |
| TB-GR10 | Two completed years, death in service | F&F runs | An entitlement arises and is flagged for its pro-rata basis | GX3 |
| TB-GR11 | Entitlement ₹1,80,000, prior exempt ₹19,50,000 | F&F runs | ₹50,000 exempt, ₹1,30,000 taxable, delivered as a feed input | BEN-100 |
| TB-GR12 | Prior employment recorded, no declaration | F&F approval is attempted | Blocked, naming the missing declaration | BEN-100 |
| TB-GR13 | A transfer between group entities | The transfer is recorded | Operator review; no reset and no silent carry-over | GX5, GY6 |
| TB-GR14 | An instruction to reduce a computed gratuity | It is entered | Accepted only with a recorded basis and a distinct checker, and flagged to the legal lead | GX6 |

#### 11.7.3 Nomination sets and death-benefit routing

BEN-04 and BEN-18 capture nominations; §07 owns the record (FR-CHR-044, FR-CHR-075) and §11.2.2's Q4 asks which set was in force on a date. What neither states is what the product *does* when a benefit has to be routed — the moment at which a nomination stops being a form and starts deciding where money goes. The answer is deliberately narrow: **the product produces the artefact and the audit; it never decides entitlement.**

**The benefits-side view.** Read-only projections of §07's versions, never a fork: `set_id`, `scheme_ref`, `in_force_from`, `in_force_to`, `form_ref` and `form_version`, the rendered document reference (E-class), and per nominee: name, relation, `share_pct`, `is_minor`, `guardian_ref`, `dob`. The set in force is resolved on the *event* date and as recorded at the moment the routing artefact is produced — both axes, because a set corrected after a death must not silently re-route a benefit already routed.

**`benefit_routing_record` — R-class, appended on every routing event.** `routing_id`, `scheme_ref`, `employee_id`, `event_type` (death_in_service, maturity, exit_settlement), `event_date`, `nomination_set_ref` and its version, the shares as resolved, `instrument_payer` (employer, EPFO, insurer, scheme), `state` (drafted, held, issued, superseded), `held_reason`, `actor`, `recorded_at`. A correction is a new record naming the one it supersedes; nothing is edited, which is the same rule the endorsement line follows (§11.2.2).

| # | Situation | Behaviour |
| --- | --- | --- |
| N1 | A valid set in force, shares summing to 100, every nominee living | The routing record issues with those shares |
| N2 | No set in force for the scheme on the event date | Held. An operator task and a note to the legal lead. The product **never** falls back to legal heirs or to another scheme's set — succession is law, not configuration (Part D) |
| N3 | A named nominee predeceased the employee | Held. `nomination_share_reallocation` is unset and has no product default; re-normalising the remaining shares is a legal question routed to §23's counsel register |
| N4 | A minor nominee | The guardian recorded at capture is carried on the artefact; a minor without a guardian could not have been captured (BV-30) |
| N5 | A set whose shares do not sum to 100 — only reachable through migration (BEN-61) | Held, with the set and its import source shown. Never re-normalised silently |
| N6 | The set was captured on a legacy form version | The artefact renders on that version marked "legacy", because `nominee.form_ref`'s successors are unmapped (B10) |
| N7 | The instrument is EDLI, EPF or EPS | EPFO computes and pays (§11.7); the product supplies the nomination artefact and records that it did. No amount is ever stated by the product |
| N8 | The instrument is GTL or GPA | The insurer pays on the policy's terms; claims are out of scope (§11.6). The routing record names the insurer as payer and carries no figure |

**Which questions this answers, and for whom.** Q4 (§11.2.2) answers "which set was in force" for an auditor. The routing record answers "what did we hand over, to whom, when, and on which version" for the employer defending a payment years later — a different question, and the reason the record exists as its own R-class entity rather than as a report over §07's versions.

| ID | Requirement | Priority | Acceptance criterion |
| --- | --- | --- | --- |
| **BEN-101** | Produce a `benefit_routing_record` per scheme on every routing event, resolving the nomination set on both time axes, holding under N2, N3 and N5 rather than deciding, rendering a legacy form version as such, and stating no figure for an instrument the product does not pay. | R2 · C-38 | A death in service with a valid gratuity set and a valid EPF set produces two routing records, one naming the employer as payer with the F&F amount and one naming EPFO with no amount. A set with a predeceased nominee is held and reaches the legal lead; no share is re-normalised. A set corrected a month after a routing record was issued produces a second, superseding record, and the first stays queryable exactly as issued. |

| ID | Given | When | Then | Covers |
| --- | --- | --- | --- | --- |
| TB-NM01 | Gratuity and EPF sets in force; death in service | Routing runs | Two records, one per instrument, with the right payer and only the employer's carrying a figure | BEN-101, N7 |
| TB-NM02 | No gratuity nomination on the date of death | Routing runs | Held; operator task and legal note; no fallback | N2 |
| TB-NM03 | A nominee who predeceased the employee | Routing runs | Held; `nomination_share_reallocation` named as unset | N3 |
| TB-NM04 | An imported set summing to 90% | Routing runs | Held, with the import source shown | N5, BEN-61 |
| TB-NM05 | A minor nominee with a guardian | Routing runs | The guardian is carried on the artefact | N4 |
| TB-NM06 | A set corrected after a record was issued | The correction is recorded | A superseding record; the first is unchanged and queryable | BEN-101 |

<!-- DIAGRAM: fr-benefits-nomination-routing -->

---

### 11.8 NPS attach points — corporate NPS and the retiral stack

Corporate NPS is the cleanest attach in the Indian stack because the tax benefit is unambiguous, employer-driven, and *does not compete with the statutory PF the payroll engine already runs*. It is a voluntary employer contribution on top of EPF.

**The tax mechanics that the engine must implement — all deterministic.** Every provision and value in these bullets is 1961-Act law carried from v0.3, not re-captured (vocabulary note): **[Hypothesis]** until B9 re-reads it, held as parameters `tax.nps_employer_deduction_pct.<regime>`, `tax.nps_own_deduction_cap` and `tax.retiral_aggregate_cap`.

- **[Hypothesis]** (carried) **s.80CCD(2)** — employer contribution to NPS is deductible in the employee's hands up to **10% of salary (basic + DA)** for private-sector employees, raised to **14% of salary for employees opting the new tax regime** by the Finance (No.2) Act 2024, effective AY2025-26 (Source: Income-tax Act s.80CCD(2); Finance (No.2) Act 2024). The engine must apply 10% or 14% conditional on the employee's regime election — a real branch, not a constant.
- **[Hypothesis]** (carried) **s.80CCD(1B)** — an additional **₹50,000** deduction for the employee's *own* NPS contribution, available under the old regime only (Source: Income-tax Act s.80CCD(1B)). Tracked as an investment declaration, not an employer contribution.
- **[Hypothesis]** (carried) "Salary" for 80CCD means **basic + dearness allowance**, not gross CTC. It is a tax-law base, distinct from the PF/gratuity add-back wage (§06.10): the engine resolves it from the same component tags §08 uses for its concurrent wage bases (§08.1, I1), never as a hand-maintained second definition — and never by reusing the add-back wage, which would overstate the 10%/14% ceiling whenever the add-back fires.
- **[Hypothesis]** (carried) Employer NPS contribution counts toward the **₹7.5 lakh aggregate cap** on employer contributions to PF + NPS + superannuation under s.17(2)(vii) (see §11.10).

**Tier I vs Tier II — a modelling distinction that matters.** **[Hypothesis]** (carried) Corporate NPS employer contributions and the 80CCD(2)/(1B) deductions apply to the **Tier I** account only; **Tier II is a voluntary, withdrawable, non-tax-advantaged** account (except the locked-in government NPS-TTS variant). The model must tag the account tier so a Tier II contribution is *never* posted as an 80CCD deduction or into the retiral cap — a common source of over-stated deductions (Source: PFRDA; Income-tax Act s.80CCD).

The operational surface is the CRA (Central Recordkeeping Agency) relationship:

| ID | Requirement | Priority | Acceptance criterion |
| --- | --- | --- | --- |
| **BEN-20** | Maintain per-employee corporate-NPS (Tier I) enrollment with PRAN, contribution rate/amount, and regime-conditional deduction (10% vs 14%). | P1 | An employee under the new regime with basic+DA of ₹1,00,000/month and a 14% employer NPS contribution shows ₹14,000 as an 80CCD(2) deduction; switching the employee to old regime re-caps at 10% (₹10,000) on the next run. |
| **BEN-21** | Generate the periodic Subscriber Contribution File (SCF) for the employer's upload to the CRA, and record the transaction/ack reference. The layout and the upload channel are taken from the CRA's published specification once B11 captures it; until then the generator is fenced, as the ECR arrear file is (EV-043). | P1 | A monthly contribution batch produces a CRA-format SCF that validates against the captured CRA schema; the batch is not marked "remitted" until an ack reference is stored. |
| **BEN-22** | Track PRAN generation status for new joiners (proposed→PRAN-issued→active) and block contribution instructions until a PRAN exists. | P1 | A contribution instruction for an employee without a PRAN is held in an exceptions queue, not sent in the SCF. |
| **BEN-23** | Feed the employer NPS contribution to the s.392 (ex-s.192) TDS computation (as salary, with the 80CCD(2) deduction) and to the retiral-cap aggregation (§11.10), whose excess reaches Form 123 (ex-12BA) through BEN-41. | R2 · C-38 | The 80CCD(2) deduction reduces taxable income in the monthly TDS calc and is carried in the employee's annual tax computation that feeds Form 138 Annexure II (Q4 format unpublished — fenced, EV-046); the same amount posts to `retiral_contribution_ledger`. |
| **BEN-24** | Maintain approved superannuation-fund enrollment and employer contribution where a tenant runs one, feeding the same aggregation. | P2 | Superannuation employer contribution posts to `retiral_contribution_ledger` and is valued for the ₹7.5 lakh cap; UI/flow depth deferred to v2. |
| **BEN-25** | Handle PRAN portability so an employee's existing PRAN (from a prior employer) is adopted rather than re-issued. | P1 | Onboarding an employee who supplies an existing PRAN links the corporate NPS enrollment to that PRAN with no duplicate-issue request in the SCF batch. |
| **BEN-26** | Segregate employee-share vs employer-share NPS contributions on the SCF and on the payslip. | P1 | An employee's own Tier I contribution (80CCD(1B), old regime) and the employer's 80CCD(2) contribution appear as distinct SCF lines, distinct payslip lines and distinct deductions in the annual tax computation; only the employer share posts to the retiral cap. |

**Partner note.** The CRA layer is **Protean eGov Technologies** (formerly NSDL e-Gov) and **KFintech**, with a Point-of-Presence (POP) intermediary for corporate onboarding. **[Hypothesis]** POP economics (a small fee on contributions) are a possible v2 revenue line but unvalidated and modelled at zero in v1 (Source: v0.3's reading of the PFRDA corporate NPS framework. No research round covered corporate NPS — r2/00 lists PFRDA POP economics as never covered — so the CRA identities, the SCF name and layout and the upload channel are carried, not re-captured, **[Hypothesis]**, validated under §11.19 B11; POP fee monetisation kill/validate via §11.19 B4 feeding §20.6.) v1 builds the SCF generation and PRAN tracking as a per-CRA adapter output whose layout is loaded from the CRA's published specification, never hand-authored from memory; it does not become a POP or take POP fees.

#### 11.8.1 VPF and the ₹2.5 lakh taxable-interest rule

Voluntary Provident Fund (VPF) is the employee electing to contribute *more* than the statutory 12% into the same EPF account. It looks like a payroll deduction, but it has two tax consequences the benefits model must carry, because both are computed off contribution data the payroll engine holds and neither lives naturally in any other module.

- **[Hypothesis]** (carried) VPF is the employee's own contribution and is eligible for **s.80C** (old regime only, within the ₹1.5 L ceiling shared with other 80C items). For Tax Year 2026-27 the deduction is **s.123** at the same ₹1,50,000 limit (**[Verified]**, r3/02 finding 19 — vocabulary note); whether Schedule XV still admits VPF, and whether the old-regime-only restriction carries over, is not captured (B9), so the engine keeps VPF's qualifying status as a per-period rule row rather than a constant. The employer does **not** match VPF, so VPF adds nothing to the employer side of the ₹7.5 L retiral cap (§11.10) — a common modelling error is to inflate the cap with VPF. (Source: 1961 Act s.80C — carried. **[Verified]** on the EPF side (EV-045; r5/02): VPF stays in scope of the ECR with its filing process unchanged; EPF Scheme para 29(2) permits an above-statutory employee rate, para 26(6) requires a joint written request for contribution above the wage ceiling, and for employee-only VPF the employer's administrative charges follow actual wages subject to the ceiling, not contributions.)
- **[Hypothesis]** (carried) Since the Finance Act 2021, **interest on the employee's own PF contribution (statutory + VPF) exceeding ₹2,50,000 in a financial year is taxable** — the threshold is ₹5,00,000 where the employer makes no contribution (a rare private-sector case). The mechanics are in **Rule 9D**: the fund maintains two sub-accounts (taxable and non-taxable contribution), and interest on the taxable sub-account is income under s.10(11)/(12) provisos. (Source: Income-tax Act s.10(11)/(12) provisos; Income-tax Rules, Rule 9D; Finance Act 2021.)

Why this belongs in the benefits/retiral model: the ₹2.5 L threshold is on the *employee's own* annual PF contribution, so the engine must accumulate statutory-plus-VPF contribution across the FY and flag the crossover — a stateful, per-employee, per-FY computation structurally identical to the Rule 3B accretion, and best co-located with `retiral_contribution_ledger`.

| ID | Requirement | Priority | Acceptance criterion |
| --- | --- | --- | --- |
| **BEN-27** | Record VPF as the employee's own contribution, feed it to s.80C (s.123 from Tax Year 2026-27; old regime) and **exclude it from the employer-side ₹7.5 L cap**. | P1 | Adding VPF for an old-regime employee increases the 80C deduction (within ₹1.5 L) and leaves `retiral_contribution_ledger.aggregate` unchanged. |
| **BEN-28** | Accumulate the employee's own PF (statutory + VPF) per FY and flag interest on the excess over ₹2.5 L as taxable per Rule 9D. | P1 | An employee whose own PF contribution reaches ₹3.0 L in an FY has the interest on the ₹50,000 excess computed as taxable income; below ₹2.5 L no interest is taxed. The thresholds are the §06 parameters `tax.pf_interest_threshold.*` — carried, not re-captured, **[Hypothesis]** (Source: 1962 Rules r.9D; §06.13). |

#### 11.8.2 Approved superannuation fund

An approved superannuation fund (Part B, Fourth Schedule to the Income-tax Act) is a less common but still-present retiral vehicle at the top of the beachhead band. It is P2 for UI depth (BEN-24) but its *tax interactions* are P0 wherever a tenant runs one, because it enters the ₹7.5 L aggregate cap.

- **[Hypothesis]** (carried) Employer contribution to an approved superannuation fund is exempt in the employee's hands, but since the **Finance Act 2020 it no longer carries a standalone ₹1,50,000 perquisite limit** — the earlier standalone cap was folded into the **₹7.5 L aggregate** on PF + NPS + superannuation under s.17(2)(vii) (Source: Income-tax Act s.17(2)(vii); Finance Act 2020). A model that still applies a separate ₹1.5 L superannuation cap *and* the ₹7.5 L aggregate double-counts — a defect.
- **[Hypothesis]** (carried) Commutation of the superannuation annuity on retirement or death is exempt under **s.10(13)** in the specified circumstances; the annuity itself is taxable as salary/other income when received (Source: Income-tax Act s.10(13)).
- **[Hypothesis]** (carried) Rule 3B accretion (§11.10) applies to the return on the *superannuation* share of the excess just as it does to PF and NPS — the ledger does not distinguish the vehicle for the accretion, only for the source total (Source: Income-tax Rules, Rule 3B).

The functional coverage is BEN-24 (enrollment/contribution feed) and BEN-40/41/42 (aggregation and valuation); no additional FR is needed beyond flagging the vehicle correctly on `contribution_instruction.vehicle` so it posts to `retiral_contribution_ledger.superann_employer` and never to the NPS or EPF columns.

#### 11.8.3 The contribution instruction — fields, states and the fenced file boundary

`contribution_instruction` is the record every voluntary retiral vehicle runs through: the per-period, per-vehicle statement of what the employer and the employee put in, from which the cap ledger reads (§11.10) and the CRA or trustee file would be rendered. **The file is fenced** — no CRA layout, field list, channel or acknowledgement artefact has been captured by any research round (B11), so this subsection specifies the record and its lifecycle and stops exactly where the fence begins, in the same way §08 stops at the ECR arrear layout (EV-043). Specifying a layout here would be fabricated precision; specifying the record is what lets the fence lift as a data change.

**`contribution_instruction` — R-class, superseded rather than edited.**

| Field | Type | Null | Validation | Classification |
| --- | --- | --- | --- | --- |
| `instr_id` | Hash of (employee, vehicle, period, source version set) | No | Idempotent: identical sources produce the identical id, so a re-run never double-counts — the feed's rule (§11.9.5) applied to instructions | C4 |
| `scheme_id`, `enrollment_id`, `employee_id` | FKs | No | The enrollment is `active` or `suspended` for some part of the period | C4 |
| `vehicle` | Enum: nps_tier1, superannuation | No | Tier II never produces an instruction (§11.8); VPF never does either — it rides the ECR (EV-045) | C4 |
| `period`, `tax_year` | The period the amounts belong to | No | Valid time, not the time recorded | C4 |
| `employer_amount`, `employee_amount` | Money, in paise | No | Either may be zero; both zero is CI4 | C1 |
| `wage_basis_ref`, `wage_basis_value` | Reference and amount | No for NPS | The basic-plus-DA base §08 resolves from its component tags (§11.8) — never the add-back wage, never CTC | C1 |
| `rate_applied`, `regime_at_computation` | Rate; enum old or new | No for NPS | The 10% or 14% branch and the regime it rested on, frozen on the record (BEN-20) | C4 |
| `pran_or_ref` | Text | No for NPS | Required before the instruction leaves `drafted` (BEN-22) | C1 |
| `state`, `attempt_count` | Enum per CI1–CI11; integer | No | Transitions below only | C4 |
| `batch_id`, `manifest_ref` | FKs | Yes until batched | The internal manifest, not a CRA file | C4 |
| `ack_ref`, `ack_received_at` | Text; timestamp | Yes | The period is "remitted" only with these (BEN-21) | C4 |
| `source_run_ref` | The pay run that produced the amounts | No | Traceability into §08 | C4 |
| `supersedes_instr_id`, `recorded_at` | FK; timestamp | `supersedes` Yes | — | C4 |

**Which contributions produce an instruction.**

| # | Situation | Instruction | Note |
| --- | --- | --- | --- |
| CI-A | Active enrollment, PRAN present, rate resolved | One, for the period | The ordinary case |
| CI-B | Active NPS enrollment, no PRAN | Held in the exceptions queue, never batched | BEN-22; the employee is notified, because the contribution is not reaching an account |
| CI-C | Enrollment suspended for part of the period (LOP, sabbatical) | One, prorated on §08's denominator to the unsuspended days | Benefits never invent a second day-count convention (§11.6) |
| CI-D | Enrollment suspended for the whole period | None; the instruction voids (CI4) | Nothing is "remitted" for a period with no wage |
| CI-E | Tier II account | Never | Tagged and excluded from both the instruction and the cap (§11.8, E10) |
| CI-F | VPF | Never | It is an EPF contribution and rides the ECR (EV-045); an instruction for it would double-count the employee's own contribution |
| CI-G | Superannuation | One, `vehicle` = superannuation | Posts to the superannuation column of the ledger only (§11.8.2) |
| CI-H | Arrears disbursed in a later period | A superseding instruction for the period the amounts belong to, plus a dated diff row on the ledger | Which tax year the arrear counts in for the cap follows `retiral_cap_arrear_attribution` (BEN-43); the equivalent NPS question — whether the CRA accepts a contribution dated to an earlier period at all — is `nps_arrear_attribution`, unset and routed to B11 |
| CI-I | Exit mid-period | One, prorated to the last covered day | The F&F run's own period |

The state machine is CI1–CI11 in the diagram below; three of its rules are load-bearing. A period is **never** marked remitted without an acknowledgement reference (BEN-21) — the same discipline as an endorsement line never being "sent" because a file was generated (BEN-11). A rejection is stored as received and corrected by a new instruction naming the one it replaces, never by editing (Part E-1). And while the fence stands, `handed_over` means the product produced an internal manifest and recorded that the employer uploaded it; it never means the product submitted anything (K-13).

<!-- DIAGRAM: fr-benefits-contribution-instruction-states -->

**Worked examples**, on §11.11's employee: basic + DA of ₹1,20,000 a month.

1. **A full month, new regime.** The rate branch gives 14%: `1,20,000 × 0.14 = ₹16,800` employer contribution for the period, and `16,800 × 12 = ₹2,01,600` for the tax year — the figure §11.11 carries. Under the old regime the branch gives 10%: `₹12,000` a month, `₹1,44,000` for the year.
2. **A mid-month join.** The employee joins on the 12th of a 30-day month (the §11.6 case): 19 covered days, so `16,800 × 19/30 = ₹10,640`. The 14% ceiling is a percentage of the salary base; the deduction §08 computes for the period uses the salary actually paid for those days, and the instruction carries the contribution, never the deduction.
3. **Six LOP days.** 24 payable days: `16,800 × 24/30 = ₹13,440` (CI-C). The enrollment is not suspended, so no endorsement arises and no window closes — an LOP month is a proration, not a status change, unless the tenant's policy maps it to suspension (EN4).
4. **A whole month of LOP.** No instruction at all (CI-D), and the cap ledger simply has nothing to add for the period.
5. **A rejected line.** The CRA rejects the instruction for a PRAN mismatch. The line goes `rejected` with the reason as received, the employee's enrollment is flagged, and a correcting instruction is drafted naming the rejected one. Nothing about the earlier period's payroll changes: the contribution was computed correctly, and the failure is in the handover, which is exactly why the record and the file are separate objects.

| ID | Requirement | Priority | Acceptance criterion |
| --- | --- | --- | --- |
| **BEN-102** | Produce `contribution_instruction` records under CI-A to CI-I with idempotent ids, the frozen rate and regime, and the wage basis they were computed on; hold an instruction with no PRAN; void one for a wholly suspended period; never produce one for Tier II or VPF. | R2 · C-38 | Worked examples 1 to 4 reproduce to the rupee; re-running an unchanged period emits no new instruction; a Tier II contribution and a VPF deduction produce none; an instruction without a PRAN is held and the employee notified. |
| **BEN-103** | Carry instructions through CI1–CI11: batch per scheme and period, hand over an internal manifest while the CRA layout is fenced on B11, mark a period remitted only on a stored acknowledgement, store rejections as received, and correct by supersession. | R2 · C-38 | A batch handed over without an acknowledgement leaves its period unremitted and on the operator report; a rejected instruction is corrected by a new one naming it, with both queryable; no artefact claiming a CRA format is emitted while B11 is open. |

| ID | Given | When | Then | Covers |
| --- | --- | --- | --- | --- |
| TB-NP01 | New regime, ₹1,20,000 basic + DA | The period closes | Employer amount ₹16,800, rate 14% and regime frozen on the record | BEN-102 |
| TB-NP02 | The same employee switched to the old regime | The next period closes | ₹12,000, rate 10%; the earlier record is unchanged | BEN-102, BEN-20 |
| TB-NP03 | A join on the 12th of a 30-day month | The period closes | ₹10,640 | CI-C |
| TB-NP04 | Six LOP days | The period closes | ₹13,440; no endorsement and no coverage change | CI-C |
| TB-NP05 | A whole month suspended | The period closes | No instruction; nothing added to the cap ledger | CI-D |
| TB-NP06 | An enrollment with no PRAN | The period closes | Held; not batched; the employee notified | CI-B, BEN-22 |
| TB-NP07 | A batch handed over, no acknowledgement | The month ends | The period is not remitted and appears on the operator report | BEN-103 |
| TB-NP08 | A rejected instruction | The correction is drafted | A new instruction names the rejected one; both are queryable; no edit | BEN-103 |
| TB-NP09 | A Tier II contribution and a VPF deduction in the same period | The period closes | No instruction for either; neither reaches the cap ledger | CI-E, CI-F |
| TB-NP10 | A period re-run with unchanged sources | The run completes | No new instruction; the same `instr_id` | BEN-102 |

---

### 11.9 Flexi-benefits (FBP) attach points — declarations, proof, valuation

FBP (Flexible Benefit Plan) is where the CTC is restructured into components the employee allocates, several of which carry tax exemptions if declared and substantiated. This is the attach surface with the richest statutory edge cases and the one where the 1-Apr-2026 rule change bites.

**The v1 FBP menu and its tax rules — every valuation deterministic (§11.5), each row a per-regime, effective-dated rule object:**

| Component | Exemption basis | The edge case the engine must handle |
| --- | --- | --- |
| **Meal card / vouchers** | Food/non-alcoholic beverage during working hours (1962: Rule 3(7)(iii); 2026 citation routed to §20, B9) | **[Hypothesis]** (EV-019; §20.6 V-18) Cap raised ₹50→**₹200 per meal** effective 1 Apr 2026 (Income-tax Rules 2026; r2/02); available under the new regime from Tax Year 2026-27 only (Taxmann via r2/02 — counsel to confirm). **Qualifying conditions are engine constraints (BEN-62):** food provided during working hours at office or factory premises, or non-transferable vouchers usable only at eating outlets; a cash allowance is fully taxable. The **count of eligible meals per period** matters — LOP and holidays reduce it; `meals_per_working_day` and WFH-day treatment are tenant parameters, not statute. Effective-dated cap. |
| **Gift / voucher** | Gifts in kind, vouchers or tokens (1962: Rule 3(7)(iv); 2026 citation routed to §20, B9) | **[Hypothesis]** (EV-019) Nil-value threshold raised ₹5,000→**₹15,000 during the tax year** effective 1 Apr 2026 (r2/02); aggregate across all gifts in the tax year, not per gift; cash gifts fully taxable; whether crossing the threshold taxes the whole aggregate or only the excess is a parameter defaulting to the whole aggregate (BEN-63). |
| **LTA (Leave Travel Allowance)** | s.10(5) + Rule 2B | **[Hypothesis]** (1961 Act/1962 Rules, carried, not re-captured; parameter `tax.lta_block`) Exempt twice in a **block of four calendar years**; the current block is **2026–2029** (previous **2022–2025**); one unused journey from a block carries into the first calendar year of the next; domestic travel only, actual fare only, shortest-route by prescribed mode. **Old regime only** — the new regime withholds the s.10(5) exemption as it does s.10(13A) (§11.12). The Income-tax Rules 2026 reportedly restrict LTC to the employee's "entitled class" (KPMG via r2/02); the operative condition is not captured, so it is a configurable constraint (`lta_entitled_class_rule`) routed to §20 (B9). The engine tracks block-year usage for every employee across tax years, whatever the current regime, because the regime can change each year. |
| **Fuel & vehicle maintenance / driver** | Rule 3(2), perquisite of motor car | Valuation depends on car ownership (employer vs employee), cc slab (≤1.6L vs >1.6L), and driver provision; fixed monthly perquisite values per Rule 3(2) — see §11.5. |
| **Telephone / internet reimbursement** | Rule 3(7)(ix) | Reimbursement of actual bills is exempt; a fixed allowance without bills is taxable — hence proof-of-spend is load-bearing. |
| **Books & periodicals, professional development, uniform** | Basis per head not verified — v0.3 cited "Rule 3(7) sub-clauses" (B9) | Exempt (old regime) to the extent of actual spend for official purposes; proof required; annual caps configurable per tenant; new-regime treatment per §11.12. |
| **Gadget / asset use & transfer** | Rule 3(7)(vii)/(viii) | 10% p.a. of cost for use; class-specific depreciated value on transfer (see §11.5). Laptop/telephone *use* is specifically exempt. |
| **Children's education allowance** | Income-tax Rules 2026 — citation not read (B9) | **[Hypothesis]** The same KPMG alert reports the exemption raised from ₹100 to **₹3,000 per month per child** from 1 April 2026 (r2/02 finding 6). The number of children it covers, its conditions and its regime availability are not captured, so it ships as `cea_limit` with `cea_max_children` and `new_regime_exempt` unset — the head values as taxable until B9 fills them (default-direction rule, §11.9.1). |
| **Transport allowance** | Income-tax Rules 2026 — citation not read (B9) | **[Hypothesis]** Reported raised to **₹25,000 per month, or 70% of the allowance if lower**, from 1 April 2026 (KPMG via r2/02 finding 6). Which employees the exemption reaches is not captured, so `transport_allowance_limit` ships with its eligibility predicate unset and the head values as taxable until B9 reads the text. |

<!-- DIAGRAM: fbp-declaration-proof-valuation-flow -->

**The declaration→proof→valuation cycle is the core FBP FR**, and it must ride the existing Form 124 (ex-12BB) investment-declaration calendar the payroll engine already runs (§08.6, FR-PAY-503; EV-050): proposed at tax-year start, provisional through the year, proof-locked before the Q4 true-up.

| ID | Requirement | Priority | Acceptance criterion |
| --- | --- | --- | --- |
| **BEN-30** | Configure the tenant's FBP menu with per-component tax rule, exemption section, annual/monthly cap, qualifying conditions, per-regime availability and proof-required flag, all effective-dated. | R2 · C-38 | Publishing the meal-cap rule version from ₹50 to ₹200 with `effective_from = 2026-04-01` leaves pre-April periods valued at ₹50 and post-April at ₹200 across the boundary; no code deploy is needed. The statutory cap is a rule version published through the compliance data pipeline (§22.8), never a tenant edit (§07.6, the matrix's rule 2); the tenant sets only its own allocation caps at or below it, and a tenant cap above the statutory cap exempts nothing beyond the statutory cap. A cap saved without its qualifying conditions produces no exemption (BEN-62, BEN-63). |
| **BEN-31** | Let an employee declare FBP allocations within cap for a tax year, restructuring gross without changing CTC. | R2 · C-38 | An FBP declaration that allocates within component caps recomputes the taxable/exempt split on the next payslip; an over-cap allocation is rejected at submit with the cap cited. |
| **BEN-32** | Capture proof-of-spend against declarations, with approve/reject/query states and document references. | R2 · C-38 | An approved ₹40,000 telephone proof against a ₹48,000 declaration exempts ₹40,000 and taxes ₹8,000 in the annual reconciliation; a rejected proof taxes the full declared amount. |
| **BEN-33** | Track LTA exemption usage across the four-year block, including carry-forward, and offer the exemption only under the old regime. | P1 | A second LTA claim in block 2022–2025 is allowed; a third is taxed; one unused journey carries into 2026 and is honoured in the first year of the 2026–2029 block. A new-regime employee's LTA claim is paid as taxable, while the journey is still recorded against the block. |
| **BEN-34** | Value every FBP perquisite deterministically and feed s.392 (ex-s.192) TDS, Form 123 (ex-12BA) and the annual tax computation that feeds Form 138 Annexure II. | R2 · C-38 | Form 123 and the annual tax computation tie exactly to the sum of valued FBP perquisites for the tax year; no perquisite is model-generated. The Annexure II tie-out is fenced until the Q4 format is released (EV-046); Form 130 itself is prepared by TRACES from Form 138 data and is never generated by the product (EV-048). |
| **BEN-35** | Reconcile provisional (declared) vs actual (proof-approved) at year-end and true-up TDS in the final periods. | R2 · C-38 | An employee who declared but did not substantiate ₹X of exemptions has the shortfall added to taxable income and TDS trued-up before the last pay run of the FY. |
| **BEN-36** | Configure meal/fuel/gift wallets (caps, per-txn limits, per-meal cap) as data, with a nullable provider hook for a future card. | P1 | A wallet config with a monthly meal cap and null provider records the vouchers the employer issues through its own issuer contract (`wallet_transaction`, §11.9.1); when a provider is later attached, the same config drives issuance — no schema change. A meal paid as a cash reimbursement of bills is `meal_delivery_mode = other` and values at full cost (BEN-62): it is neither a premises meal nor a voucher. Fuel and telephone heads with null provider run the reimbursement flow. |
| **BEN-37** | Compute the meal-card exemption from the *eligible-meal count* for the period — working days × `meals_per_working_day`, netting LOP and holidays, with WFH days per tenant parameter. | P1 | For 22 working days at 1 qualifying meal/day (BEN-62) and a ₹200 cap, the period exemption ceiling is ₹4,400; a month with 4 LOP days ceilings at ₹3,600, and any card spend above the ceiling is taxed. `meals_per_working_day` is shown as a tenant convention, not statute — the Rules cap per meal, not meals per day (r2/02). |
| **BEN-62** | **Meal-perquisite qualifying conditions as engine constraints (K-19; EV-K30).** Every meal component carries a `meal_delivery_mode` — premises-provided, voucher/card, cash allowance or other. The ₹200-per-meal exemption (from 1 Apr 2026) is computed only for (a) food and non-alcoholic beverages provided during working hours at office or factory premises, or (b) vouchers/cards attested non-transferable **and** usable only at eating outlets (`wallet_config` attestation flags, with actor and date). Cash allowances and every other mode value at full cost; new-regime availability is applied only from Tax Year 2026-27. The rule citation is left null and printed nowhere until §20 confirms it (B9). | R2 · C-38 | A meal component saved as "voucher" with either attestation missing values every rupee as taxable and raises a configuration exception; attesting both flags re-values it on the next run. A cash meal allowance of ₹4,400 in a 22-day month is fully taxable. A new-regime employee receives the exemption for a May 2026 period and not in a retro re-run of a March 2026 period. No configuration path produces an exempt meal line without a delivery mode that satisfies (a) or (b) — the engine taxes rather than exempts, and never blocks the payroll run. Without these constraints the perquisite is taxable, payslips under-deduct, and the demand plus interest lands on the employer. |
| **BEN-63** | **Gift/voucher nil-value threshold as an engine rule.** Aggregate gifts in kind, vouchers and tokens per employee per tax year against the ₹15,000 threshold (₹5,000 before 1 Apr 2026); cash gifts are always fully taxable; `gift_threshold_mode` (whole aggregate vs excess only) defaults to the whole aggregate until §20 reads the 2026-Rules text (B9). | R2 · C-38 | Gifts of ₹6,000, ₹6,000 and ₹2,000 in one tax year value at nil through the second gift (₹12,000); the third takes the aggregate to ₹14,000 and still values at nil; a further ₹4,000 gift takes it to ₹18,000 and, under the default mode, the whole ₹18,000 becomes a perquisite in that period, with the TDS catch-up spread over the remaining runs. A ₹1,000 cash gift is taxable in the period paid. |

**Worked example — LTA block-year with carry-forward.** An old-regime employee joins in 2023 and claims LTA once (2023). The block is **2022–2025** (two journeys permitted). A second claim in 2024 or 2025 is exempt; a third in the same block is fully taxable. If the employee claims only once by end-2025, **one unused journey carries forward** and may be availed in **2026** (the first calendar year of the 2026–2029 block) as the carried-over journey — *in addition to* the two journeys of the new block. The engine tracks usage per *calendar-year block*, not financial year, which is why block-year state cannot live in the FY-scoped declaration alone. **[Hypothesis]** — carried, not re-captured (Source: 1962 Rules r.2B; 1961 Act s.10(5)); the block mechanics are the test case B9 re-reads first, because they span the Act change.

**Worked example — proof true-up.** An employee declares ₹48,000 telephone reimbursement at FY start; the engine provisionally exempts it across the year, reducing monthly TDS. By the proof-lock only ₹40,000 of bills are approved (BEN-32). At year-end reconciliation (BEN-35), ₹8,000 flips to taxable, incremental tax is computed, and the shortfall TDS is recovered across the final period(s) — not sprung on the employee in a single last-month deduction where the run allows spreading. This is why declaration and proof are *separate* states, not one field.

**The 1-Apr-2026 window, handled as configuration.** Because BEN-30 makes the meal cap and gift threshold effective-dated data, the ~3.8× wallet expansion is a tenant config edit dated 2026-04-01, and a retro run spanning the boundary values pre- and post-April periods against their own rule versions. **This is the concrete payoff of data-model-first**: a dated statutory change that would be a code release in a hard-coded product is a config row here — but the row carries its conditions (BEN-62, BEN-63), because a wallet limit without them configures a breach. **[Hypothesis]** values (EV-019 — Income-tax Rules 2026, per KPMG and Taxmann via r2/02; citation routed to §20.6 V-18 through B9; sequencing per §05.5 item 18).

**How benefits present on the payslip — without moving money.** A recurring source of confusion is that a perquisite affects *tax* without ever appearing as a cash line the employee is paid or docked. The presentation contract:

- A **non-cash perquisite** (employer-paid premium, motor car, retiral cap breach) shows in a dedicated *perquisite* block that adds to taxable income and therefore to TDS, but nets to zero in net pay — it is neither an earning paid out nor a deduction recovered. The Form 123 (ex-12BA) row is the authoritative statement of it.
- An **FBP reimbursement** (telephone, LTA, meal on the reimbursement model) shows as an earning line, but its *exempt* portion is excluded from taxable income; only the unsubstantiated/over-cap portion adds to tax (BEN-32, BEN-35).
- A **statutory deduction** (VPF, employee NPS) shows as a deduction reducing net pay, with the corresponding tax effect (80C/80CCD) reflected in the TDS computation, not as a separate cash line.

| ID | Requirement | Priority | Acceptance criterion |
| --- | --- | --- | --- |
| **BEN-38** | Present non-cash perquisites in a perquisite block that affects taxable income and TDS but nets to zero in net pay. | R2 · C-38 | A ₹950 parental-top-up perquisite raises taxable income and TDS on the payslip while leaving net pay unchanged versus a run without the perquisite line; Form 123 carries the ₹950. |
| **BEN-39** | Present FBP reimbursements with the exempt/taxable split driven by current proof state, recomputed every run. | R2 · C-38 | Approving a telephone proof between two runs moves the exempt portion out of taxable income on the later run with no manual edit; rejecting it moves it back. |

#### 11.9.1 The meal perquisite as an engine rule (K-19)

BEN-62 states the constraint. This subsection specifies the rule the engine evaluates — the rule-version payload, the inputs it may read, the decision table, the eligible-meal count, the two valuation paths, the attestation lifecycle and the ledger — then works it in rupees and lists the tests that become golden cases. The per-meal cap (₹50 to 31 March 2026, ₹200 from 1 April 2026) is EV-019, **[Hypothesis]**: two professional sources and a counsel spot-check concur, the rule text has not been read, and the citation stays null until §20 V-18 reports (B9). K-19 is the reason this subsection exists: a wallet limit without its conditions configures a breach — the perquisite is taxable, payslips under-deduct, and the demand plus interest lands on the employer (EV-K30).

**The default-direction rule.** Where the rule text has not been read and the engine must still choose a behaviour, it chooses the one that **cannot under-deduct TDS** — as §11.12 already does for `new_regime_exempt`. Every default chosen this way is labelled as such on its parameter, printed as a convention where it reaches a payslip, and changes only through a checker with a recorded source (§11.15.1), because changing it is a tax position.

**Rule-version payload — `meal_perq_limit` (a §14.6.2 rule row, published through §22.8).**

| Payload field | Version for periods to 31 March 2026 | Version from 1 April 2026 | Status |
| --- | --- | --- | --- |
| `per_meal_cap` | ₹50 | ₹200 | **[Hypothesis]** — EV-019 |
| `qualifying_modes` | Premises: food and non-alcoholic beverages provided during working hours at office or factory premises. Voucher: non-transferable and usable only at eating outlets | Same | The K-19 conditions (EV-019; r2/02) |
| `cash_allowance_exempt` | false | false | Cash allowances remain taxable (r2/02) |
| `new_regime_available` | false | true | The blocking proviso was not carried into the 2026 Rules (Taxmann via r2/02); counsel to confirm under V-18 |
| `tea_snacks_treatment` | Exempt in full — carried, **[Hypothesis]** | No shipped default (B9) | A recorded provision routes to operator review until B9 reports |
| `citation` | 1962 Rules r.3(7)(iii) | Null until V-18; Taxmann's Rule 15(5)(a) is a lead, never printed (B9) | — |

**Inputs the rule reads — and nothing else.** The rule is a pure function of these (Part E-3; §15.4); anything not listed cannot change a meal figure.

| Input | Source | Note |
| --- | --- | --- |
| Period and tax year | The pay run | Selects the rule version |
| Regime election for the tax year | §07 FR-CHR-017 | Part of the evaluation context |
| `meal_delivery_mode` | `fbp_component_config` | premises, voucher, cash_allowance or other (BEN-62) |
| Attestations valid on the value's date | `wallet_config` for a voucher; the component's `qualifying_conditions` for premises (`premises_during_working_hours`) | Actor, `attested_at`, `effective_from` (AT1–AT4 below) |
| Day statuses for the attendance cycle the pay period consumed | §09 `DayStatus` (FR-ATT-021) | The same days LOP was drawn from; never a separate calendar |
| Value provided in the period | `wallet_transaction` issues (voucher); `premises_meal_record` (premises) | Voucher value is placed in a period by `meal_value_timing` |
| Tenant conventions | `meals_per_working_day`, `meal_half_day_meals`, `meal_wfh_day_eligible`, `meal_on_duty_eligible`, `meal_ceiling_pooling` | Printed on the payslip as conventions, not statute |

**Decision table.** *E* is the eligible-meal count for the period (below); *V* the value provided in the period; *C* the per-meal cap of the period's rule version.

| # | Mode | Attestations | Regime | Period | Exempt | Taxable | Also |
| --- | --- | --- | --- | --- | --- | --- | --- |
| M1 | cash_allowance | — | Any | Any | 0 | V | Payslip note: cash meal allowance, taxable (BEN-62) |
| M2 | other — including a cash reimbursement of bills | — | Any | Any | 0 | V | As M1 (BEN-36) |
| M3 | voucher | Either flag missing, or not valid on the issue date | Any | Any | 0 | V | Configuration exception BV-12, once per component per period |
| M4 | voucher | Both valid | New | To 31 Mar 2026 | 0 | V | New-regime availability starts with Tax Year 2026-27 |
| M5 | voucher | Both valid | Old | To 31 Mar 2026 | min(V, E × ₹50) | V − exempt | — |
| M6 | voucher | Both valid | Either | From 1 Apr 2026 | min(V, E × ₹200), subject to `meal_ceiling_pooling` | V − exempt | — |
| M7 | premises | `premises_during_working_hours` missing | Any | Any | 0 | V | BV-13 |
| M8 | premises | Attested | New | To 31 Mar 2026 | 0 | V | As M4 |
| M9 | premises | Attested | Old to 31 Mar 2026; either from 1 Apr 2026 | Per meal: min(cost per meal, C) for each of up to E meals | The remainder, and every meal beyond E in full | — |
| M10 | premises | Attested, with an employee recovery recorded | Any | Any | — | — | Operator review: `meal_recovery_treatment` has no shipped default (BV-15) |
| M11 | premises | Attested; cost per meal not recorded for the period | Any | Any | — | — | The §08 AC-106.4 blocking item (BV-14): never valued at zero, never guessed |
| M12 | Any | — | Any | E = 0 — a whole period of LOP or absence | 0 | V | — |

**The eligible-meal count *E*.** *E* sums *m(d)* over the days of the attendance cycle mapped to the pay period — often 26th to 25th against a calendar-month pay period (r3/02 finding 5) — so meals and LOP are counted over the same days.

| Day status (§09) | *m(d)* | Parameter | Default, and why |
| --- | --- | --- | --- |
| Present — a paired session on the day, whatever the calendar says | `meals_per_working_day` | `meals_per_working_day` | **No shipped default.** A convention, not statute — the Rules cap per meal, not meals per day (r2/02); the tenant sets it with a recorded reason and the payslip prints it. While it is unset, every meal value is taxable and BV-35 is raised |
| Half-day | `meal_half_day_meals` | `meal_half_day_meals` | 0 — default-direction rule |
| Work from home | `meals_per_working_day` if `meal_wfh_day_eligible` | `meal_wfh_day_eligible` | false — default-direction rule; the home-day treatment is a B9 question |
| On duty away from the premises, no punch (FR-REG-003) | `meals_per_working_day` if `meal_on_duty_eligible` | `meal_on_duty_eligible` | false — default-direction rule |
| Weekly off or holiday with no session | 0 | — | Not a working day; a holiday *worked* is "present" |
| Paid leave | 0 | — | Not working |
| LOP or absent | 0 | — | BEN-37 |
| Not yet joined; already left | 0 | — | — |

**The two valuation paths.**

- **Voucher path (M5, M6).** *V* is the sum of issues placed in the period. `meal_value_timing` = on_issue places an issue in the period of its issue date; on_redemption exists only for a v2 provider that reports redemptions. The default is on_issue, which recognises value no later than it is handed over, so it cannot defer tax. The period ceiling is *E* × *C* and the exemption is min(*V*, ceiling). With `meal_ceiling_pooling` = tax_year, the exemption to date is min(cumulative *V*, cumulative ceilings) and the period's exemption is the change; the default is period — the default-direction rule, because an unused ceiling from a light month then never shelters a heavy one. Pooling is a B9 question.
- **Premises path (M9).** The value per meal is the cost per meal recorded for the period with its source (a caterer's invoice, for example); each meal is exempt up to *C* and taxable above it. Meals are *E*, or a recorded per-employee count where the tenant keeps one, capped at `meals_per_working_day` per eligible day.

**Attestation lifecycle.** Attestations are B-class facts carrying value, actor, `attested_at`, `effective_from` and an evidence reference — the issuer contract or the instrument's terms, an E-class document.

| # | Event | Guard | Effect | Who may trigger |
| --- | --- | --- | --- | --- |
| AT1 | Attest | Evidence attached | `effective_from` = `attested_at`, never earlier | HR admin proposes; compliance checker approves (§11.15.1) |
| AT2 | Backdate an attestation | Evidence that the instrument met the conditions from the earlier date | Periods from the new `effective_from` re-value in the next open run through the feed (§11.9.5) | Compliance checker, distinct from the proposer |
| AT3 | The instrument, issuer contract or `provider_ref` changes | — | Existing attestations end the day before the change; the new instrument is unattested until AT1 | System |
| AT4 | Revoke | Reason recorded | Forward only: issues from the revocation date value under M3 | HR admin or compliance checker |

**The meal ledger.** `wallet_transaction` rows for a meal instrument: `txn_id`, `wallet_id`, `component_id`, `employee_id`, `txn_type` (issue, reversal; redemption only from a v2 provider), `instrument_ref`, `amount` (paise), `txn_date`, `period` (derived by `meal_value_timing`), `source` (operator, import, provider), `source_ref` (the issuer's invoice or load reference), `recorded_at`. `premises_meal_record` rows: `period`, `component_id`, `cost_per_meal`, `cost_source_ref`, `meals_basis` (eligible count or recorded count), `recovery_per_meal` (nullable), `recorded_by`, `recorded_at`. Both are R-class: a reversal names the issue it reverses; nothing is edited.

**Worked examples.** Tax Year 2026-27 unless stated. Conventions are illustrative tenant settings; the caps are EV-019 figures.

1. **A September 2026 voucher month.** The attendance cycle has 22 scheduled working days. The employee is present on 17, has one half-day, one work-from-home day, one day of paid leave, one LOP day, and one holiday falls on a scheduled day. The tenant set `meals_per_working_day` = 1 and kept the defaults. *E* = 17; ceiling = 17 × ₹200 = **₹3,400**. The tenant loads a fixed ₹4,400 a month (22 × ₹200). Exempt ₹3,400; taxable **₹1,000**. Had the tenant set `meal_half_day_meals` = 1 and `meal_wfh_day_eligible` = true, through the checker and with reasons, *E* = 19, the ceiling ₹3,800 and the taxable figure ₹600.
2. **The 1 April 2026 boundary, re-run.** A retro correction in May 2026 re-runs March 2026 against the Tax Year 2025-26 version. *E* = 20 and ₹1,100 was issued. An old-regime employee's ceiling is 20 × ₹50 = ₹1,000: exempt ₹1,000, taxable **₹100** (M5). A new-regime employee's ₹1,100 is taxable in full (M4). For April 2026, with *E* = 20 and ₹4,400 issued, both regimes get a ceiling of 20 × ₹200 = ₹4,000: exempt ₹4,000, taxable **₹400** (M6). Each period is valued against its own version in the same run (BEN-30).
3. **A premises canteen, October 2026.** *E* = 20. At a recorded cost of ₹180 a meal, every meal is under ₹200: ₹3,600 exempt, nothing taxable. At ₹240 a meal, ₹40 of each meal is taxable: ₹800 taxable and ₹4,000 exempt (M9). If employees pay ₹30 a meal towards the cost, the period goes to operator review (M10) rather than to a guessed netting.
4. **A new card before its attestation.** The tenant switches issuer on 15 October 2026; ₹2,200 is issued on the new card on 16 October; the attestation is recorded on 20 October (AT1, effective that day). The 16 October issue is taxable in full (M3) and BV-12 is raised. A backdate to 15 October needs AT2 with the new issuer's contract as evidence; once approved, October re-values in the next open run.
5. **Why `meals_per_working_day` has no default.** At 22 working days and ₹200 a meal, the monthly meal ceiling is ₹4,400 at one meal a day, ₹8,800 at two, ₹13,200 at three. The research's combined wallet — meal plus one-twelfth of the gift threshold — is ₹5,650, ₹10,050 or ₹14,450 a month at one, two or three meals a day, against ₹2,617 at two meals before 1 April 2026; at each convention the before-and-after ratio stays between 3.73× and 3.89×, while the level swings with the convention (r2/02). The professional figure of ₹1,05,600 a year is the two-meal convention × 22 days × 12 months (Taxmann via r2/02). The engine prints the convention; it never picks one.
6. **An LOP reversed two months later.** Attendance for September 2026 is regularised in November: the September LOP day becomes present, within the tenant's reversal window (r3/02 finding 4 records a configurable 1–12-month lookback in greytHR — its own help documentation, r3 capture 2026, documentation read, product not executed). *E* for September moves from 17 to 18 and the ceiling from ₹3,400 to ₹3,600, so September's taxable meal value falls from ₹1,000 to ₹800. The feed records a superseding September input (§11.9.5); the November run's projection absorbs the −₹200; September's locked payslip is not touched.

**Several meal instruments for one employee.** A tenant can run a premises canteen and issue vouchers at once. The eligible meals are shared, never counted twice: premises meals taken consume *E* first, and the voucher ceiling is (*E* − premises meals counted) × *C*. With *E* = 20 and 12 canteen meals, the voucher ceiling is 8 × ₹200 = ₹1,600, not ₹4,000.

**Multi-wallet cards.** A card carrying a meal wallet and other wallets is several instruments, one `wallet_config` each, with its own ledger and attestations. The attestation form for a meal wallet asks whether its balance can move to another wallet: if it can, the balance is usable outside eating outlets, `eating_outlet_only` cannot be attested, and loads to that wallet value under M3.

**Requirements.**

| ID | Requirement | Priority | Acceptance criterion |
| --- | --- | --- | --- |
| **BEN-74** | **The R1 posture for meal and gift (PR-15 applied to K-19).** Where an operator enters a meal or gift perquisite value in R1, the entry requires the `meal_delivery_mode` and the attestations (meal) or the gift kind and instrument class (gift); it shows *E* × *C* for the period, computed from §09's day statuses; and it refuses an exempt amount above that ceiling, or any exempt amount for a mode that fails M1–M4, M7 or M8. | R1 · C-13 (proposed to §05 — §11.4.1) | A ₹4,400 cash meal allowance entered with ₹0 taxable is refused, naming BEN-62; a voucher entry with both attestations and *E* = 17 accepts at most ₹3,400 exempt. |
| **BEN-75** | Compute *E* from §09 day statuses over the attendance cycle the pay period consumed, per the day-status table above, and print the conventions applied on the payslip. | R2 · C-38 | Worked example 1 yields *E* = 17 with the defaults and *E* = 19 with the two conventions changed; the payslip prints `meals_per_working_day` = 1 and the half-day and work-from-home settings. |
| **BEN-76** | Value meal instruments by the voucher and premises paths from the R-class meal ledger, honouring `meal_value_timing` and `meal_ceiling_pooling`. | R2 · C-38 | Under period pooling, a month with ₹2,000 issued against a ₹4,400 ceiling followed by a month with ₹6,000 issued against ₹4,400 taxes ₹1,600 in the second month; under tax-year pooling, it taxes nothing across the two. |
| **BEN-77** | Hold attestations as dated facts through AT1–AT4: never effective before they are recorded unless a distinct checker approves a backdate with evidence; ended automatically when the instrument changes; revoked forward only. | R2 · C-38 | Worked example 4: the 16 October issue values as taxable until AT2 is approved, then re-values in the next open run; no locked payslip changes. |
| **BEN-78** | For premises meals, require a cost per meal with its source for each period; route a recorded employee recovery to operator review; treat a missing cost as the §08 AC-106.4 blocking item. | R2 · C-38 | Worked example 3's three cases reproduce: ₹0 taxable at ₹180, ₹800 at ₹240, and an operator-review item (no figure) with a ₹30 recovery. |

**Test scenarios.** Golden cases in the §22.8 corpus (FR-RULE-011) against the meal rule version; a change to `meal_perq_limit` re-certifies every one.

| ID | Given | When | Then | Covers |
| --- | --- | --- | --- | --- |
| TB-M01 | A ₹4,400 cash meal allowance | The period runs | ₹4,400 taxable; no exception | M1 |
| TB-M02 | Restaurant bills reimbursed in cash under a meal head | The period runs | Mode `other`; taxable in full | M2, BEN-36 |
| TB-M03 | A voucher with `eating_outlet_only` attested and `non_transferable` not | The period runs | Taxable in full; BV-12 | M3 |
| TB-M04 | Both attested; new regime; March 2026 re-run | The period runs | Taxable in full | M4 |
| TB-M05 | Both attested; old regime; March 2026; *E* = 20; ₹1,100 issued | The period runs | ₹1,000 exempt, ₹100 taxable | M5 |
| TB-M06 | Worked example 1, defaults | The period runs | *E* = 17; ₹3,400 exempt; ₹1,000 taxable | M6, BEN-75 |
| TB-M07 | Worked example 1 with half-day 1 and work-from-home true | The period runs | *E* = 19; ₹600 taxable | BEN-75 |
| TB-M08 | Attendance cycle 26th–25th against a calendar-month pay period | The period runs | *E* is counted over the cycle's days, the same days LOP came from | E16 |
| TB-M09 | A paired session on a holiday | The period runs | The day counts as present | E17 |
| TB-M10 | Premises; ₹240 a meal; *E* = 20 | The period runs | ₹4,000 exempt; ₹800 taxable | M9 |
| TB-M11 | Premises with a ₹30 recovery | The period runs | Operator review; no figure produced | M10, BEN-78 |
| TB-M12 | Premises; no cost recorded | The run is attempted | Blocking item naming the head | M11 |
| TB-M13 | An issue on a new instrument before its attestation | The period runs | Taxable; BV-12; a backdate needs a distinct checker | BEN-77, E18 |
| TB-M14 | An attestation revoked on the 10th | The period runs | Issues from the 10th taxable; earlier issues unaffected | AT4 |
| TB-M15 | Period pooling; a light month then a heavy month | Both run | The heavy month's excess is taxed | BEN-76 |
| TB-M16 | A whole month of LOP; a voucher issued | The period runs | Taxable in full | M12 |
| TB-M17 | R1; a cash allowance entered with ₹0 taxable | The entry is submitted | Refused | BEN-74 |
| TB-M18 | A retro run spanning March and April 2026 | The run completes | Each period valued against its own rule version | BEN-30 |
| TB-M19 | Worked example 6 | The November run | A superseding September input; −₹200 absorbed in November; September's payslip unchanged | BEN-75, BEN-88 |
| TB-M20 | *E* = 20; 12 canteen meals; vouchers issued | The period runs | Voucher ceiling ₹1,600 | BEN-76 |
| TB-M21 | A meal wallet whose balance can move to another wallet | Attestation is attempted | `eating_outlet_only` cannot be attested; loads value under M3 | BEN-77 |
| TB-M22 | Tea and snacks provided at premises, recorded for a Tax Year 2026-27 period | The period runs | Operator review (BV-18); no figure until B9 | §11.9.1 payload |

<!-- DIAGRAM: fr-benefits-meal-exemption-decision -->

#### 11.9.2 The gift, voucher and token threshold as an engine rule

BEN-63 states the threshold. The difference from the meal rule is structural: a meal is capped per meal, per period; a gift is aggregated **per employee across the whole tax year**, so the engine cannot decide a gift's treatment when it is given — only the running aggregate can. The threshold (₹5,000 to 31 March 2026; ₹15,000 "during the tax year" from 1 April 2026) is EV-019, **[Hypothesis]**, with the citation routed to B9. Four questions the research leaves open become parameters, each defaulted by the default-direction rule (§11.9.1) and each a B9 item.

**Rule-version payload — `gift_voucher_limit`.**

| Payload field | Version to 31 March 2026 | Version from 1 April 2026 | Status |
| --- | --- | --- | --- |
| `threshold` | ₹5,000 | ₹15,000 during the tax year | **[Hypothesis]** — EV-019 |
| `kinds_aggregated` | Gifts in kind, vouchers, tokens | Same | BEN-63's carried wording; r2/02 names gifts and vouchers |
| `cash_gift_treatment` | Taxable in full, regardless of amount | Same | The 1962 position, carried as the engine default (B9) |
| `gift_threshold_mode` | whole or excess — default whole | Same | BEN-63; B9 |
| `gift_threshold_boundary` | strict_below or up_to_and_including — default strict_below | Same | Whether an aggregate equal to the threshold is "below" it is not read — B9 |
| `gift_threshold_scope` | this_employer or all_employers_in_tax_year — default this_employer | Same | B9. The product holds no record of a previous employer's gifts, so the default is the only computable scope; a joiner's declared figure, if the tenant collects one, is applied only under the alternative |
| `gift_value_basis` | face_value or cost_to_employer — default face_value | Same | B9. A discounted voucher counted at face value cannot under-state the aggregate |
| `new_regime_exempt` | As v0.3 recorded it — available in both regimes, not re-verified | Same | §11.12; B9 |

**Instrument class — the gift analogue of the meal attestation.** Each gift instrument carries a `gift_instrument_class`, attested like a meal voucher (AT1–AT4): **in_kind** (goods), **voucher** (redeemable only for goods or services, never for cash), **token**, **cash**, or **cash_equivalent** (redeemable for cash, or usable as money without a voucher's restriction). A cash_equivalent values as cash. An unattested voucher or token class values as cash — the default-direction rule — and raises BV-16.

**The gift ledger.** `wallet_transaction` rows with `txn_type` gift_issue or gift_reversal: `instrument_ref`, `gift_instrument_class`, `amount_face` and `amount_cost` (paise; cost nullable), `issue_date`, `tax_year`, `occasion` (free text, C3), `reversal_of` and `reversal_evidence_ref` on a reversal. R-class: a returned or cancelled gift is a reversal row with evidence, never a deletion.

**The computation, run every pay period for every employee with a gift in the tax year.**

1. *G* = the sum of gift_issue amounts (per `gift_value_basis`) for non-cash classes with issue date in the tax year and on or before the period end, less their reversals.
2. Cash and cash_equivalent gifts are taxable in full in the period they are given, outside *G*.
3. If *G* is below the threshold *T* (per `gift_threshold_boundary`), the perquisite to date is 0; otherwise it is *G* under whole mode and *G* − *T* under excess mode.
4. The period's perquisite is the perquisite to date less the gift perquisite already recognised in earlier periods of the tax year. It is negative after a reversal that takes *G* back below *T*; a locked period is never reopened.
5. The result goes to the payroll engine as a perquisite input (§11.9.5); §08's projection spreads the TDS over the remaining runs (FR-PAY-205); for a leaver, the F&F run recognises what remains (§08.9).

**Worked examples.** Tax Year 2026-27; *T* = ₹15,000; defaults unless stated.

1. **Crossing in December.** April: a ₹5,000 voucher. August: a ₹6,000 gift in kind — *G* = ₹11,000, nil. October: a ₹1,000 cash gift — taxable ₹1,000 in October, outside *G*. December: a ₹6,000 voucher — *G* = ₹17,000, above *T*. Whole mode: December's perquisite is **₹17,000**; excess mode: **₹2,000**. Four runs remain (December to March), over which §08 spreads the additional TDS.
2. **A reversal in January.** The December voucher is returned unredeemed, with the issuer's credit note as evidence. *G* falls to ₹11,000; the perquisite to date becomes 0; January's gift perquisite is **−₹17,000** (whole) or **−₹2,000** (excess). December's locked payslip is untouched; the projection re-spreads over January to March. The October cash gift stays taxable.
3. **Exactly at the threshold.** Gifts total ₹15,000. Under strict_below and whole mode, ₹15,000 is a perquisite; under up_to_and_including, nil. Under excess mode the boundary does not matter: ₹15,000 − ₹15,000 = ₹0.
4. **Before 1 April 2026.** A ₹6,000 gift in February 2026 against the ₹5,000 threshold values at ₹6,000 (whole) or ₹1,000 (excess), against the Tax Year 2025-26 version.
5. **A discounted voucher.** A ₹10,000 voucher bought for ₹9,500 counts ₹10,000 towards *G* under the default face_value basis, and ₹9,500 only if B9 confirms cost as the basis.

**Requirements.**

| ID | Requirement | Priority | Acceptance criterion |
| --- | --- | --- | --- |
| **BEN-79** | Record every gift in the R-class gift ledger with its attested instrument class; value a cash_equivalent, and any unattested voucher or token, as cash. | R2 · C-38 | A prepaid card redeemable anywhere, recorded with class cash_equivalent, is taxable in full in its period and never enters *G*; the same card recorded as "voucher" without attestation raises BV-16 and values as cash. |
| **BEN-80** | Compute the gift perquisite cumulatively per employee per tax year under `gift_threshold_mode`, `gift_threshold_boundary`, `gift_threshold_scope` and `gift_value_basis`, recognising each period's change and never reopening a locked period. | R2 · C-38 | Worked examples 1 to 5 reproduce under each parameter setting shown, and the sum of period perquisites equals the perquisite to date at every period end. |
| **BEN-81** | Accept a gift reversal only with evidence and a reason; recognise its effect in the next open period; for a leaver, recognise the remaining gift perquisite in the F&F run. | R2 · C-38 | A reversal without evidence is refused (BV-17); worked example 2 produces −₹17,000 in January under whole mode; an employee leaving in February with *G* above *T* has the balance recognised in the F&F run, not deferred to March. |

**Test scenarios.** Golden cases against the gift rule version (FR-RULE-011).

| ID | Given | When | Then | Covers |
| --- | --- | --- | --- | --- |
| TB-G01 | Gifts ₹6,000, ₹6,000 and ₹2,000 in the tax year | Each period runs | Nil through ₹14,000 | BEN-63 |
| TB-G02 | TB-G01 plus a ₹4,000 gift | The period runs | Whole: ₹18,000 perquisite in that period; excess: ₹3,000 | BEN-63, BEN-80 |
| TB-G03 | Worked example 1 | December runs | ₹17,000 (whole) or ₹2,000 (excess); the October cash ₹1,000 taxed in October | BEN-80 |
| TB-G04 | Worked example 2 | January runs | −₹17,000 (whole) or −₹2,000 (excess); December unchanged | BEN-81, E20 |
| TB-G05 | An aggregate of exactly ₹15,000 | The period runs | ₹15,000 under strict_below and whole; nil under up_to_and_including | E21 |
| TB-G06 | A ₹10,000 voucher bought for ₹9,500 | The period runs | *G* counts ₹10,000 by default | E22 |
| TB-G07 | An open-loop prepaid card recorded as a voucher, unattested | The period runs | Valued as cash; BV-16 | BEN-79, E23 |
| TB-G08 | A reversal without evidence | It is submitted | Refused (BV-17) | BEN-81 |
| TB-G09 | A joiner in October with gifts from a previous employer | The period runs | Only this employer's gifts in *G* under the default scope | BEN-80 |
| TB-G10 | *G* above *T*; the employee exits in February | F&F runs | The remaining gift perquisite is recognised in the F&F run | BEN-81 |
| TB-G11 | A ₹6,000 gift in February 2026 | The Tax Year 2025-26 period runs | ₹6,000 (whole) against the ₹5,000 version | BEN-30 |
| TB-G12 | A ₹1,000 cash gift in a month with no other gift | The period runs | ₹1,000 taxable that period, whatever *G* is | BEN-63 |
| TB-G13 | An old-regime and a new-regime employee with identical gifts | Both periods run | Identical gift perquisites — the threshold applies in both regimes as v0.3 recorded it, pending B9 | §11.12 |

<!-- DIAGRAM: fr-benefits-gift-threshold-aggregation -->

#### 11.9.3 The FBP cycle — declaration and proof lifecycle, specified

The FBP declaration rides the Form 124 (ex-12BB) calendar the payroll engine already runs (§08.6, FR-PAY-503), whose Chapter VI-A and HRA path is in R1 (C-13, C-31). This subsection specifies what FBP adds on top of it: the cycle object, two settlement models, the declaration and proof machines as transition tables, the exemption formula and outcome categories, joiner, leaver and regime-switch handling, the employee-facing figures, and worked examples and tests. The season's practice pattern — a proof window, an employer-set lock date, approval at an actual amount, rejection with a typed reason, bulk approval, an employer-chosen true-up month, and an employee's right to withdraw and resubmit while a proof is undecided — is how Zoho Payroll's documentation describes it (r3 capture, 2026 — r3/02 findings 23 and 29; documentation read, product not executed). It is vendor practice, not statute, so every date below is a tenant parameter with no product default.

**The cycle object — `fbp_cycle`, one per tenant, pay group and tax year.**

| Field | Meaning | Default |
| --- | --- | --- |
| `cycle_id`, `tenant_id`, `pay_group_id`, `tax_year` | Identity; pay groups carry their own cut-offs (r3/02) | — |
| `declaration_open_at`, `declaration_close_at` | The window in which employees allocate FBP for the tax year | None — the tenant sets both |
| `regime_gate_ref` | The §08 `tds.regime_switch_window` in force for the tax year | §08's |
| `joiner_declaration_window_days` | Days from the date of joining in which a joiner may declare | None |
| `monthly_claim_cutoff_day` | The day of each month after which a claim_then_pay claim falls to the next run — the pre-payroll checklist's "reimbursement claims" step (r3/02 finding 1) | None |
| `proof_window_open_at` | When pay_then_prove proofs open — Zoho's documentation suggests December (r3/02 finding 23) | None |
| `proof_lock_at` | The hard proof lock (BEN-35) | None |
| `true_up_month` | The payroll month that absorbs the year-end true-up — an employer choice (r3/02 finding 23) | None |
| `leaver_proof_cutoff_days` | Days before an F&F settlement date by which a leaver's proofs must be in | None |
| `provisional_exemption_policy` | declared — exempt the declared allocation provisionally — or proof_only | declared: BEN-35's existing behaviour. proof_only is the tenant's conservative choice and removes year-end shortfalls |
| `proof_checker_threshold` | An approved amount above which a second, distinct approver is required | None — unset means single approval |
| `fbp_cap_proration_on_join` | Whether the tenant's own head caps prorate for a joiner | None — statutory limits never prorate unless their rule version says so |
| `status` | DRAFT, DECLARATION_OPEN, DECLARATION_LOCKED, PROOF_OPEN, PROOF_LOCKED, TRUED_UP, CLOSED | — |

A cycle with a required field unset does not open (BV-31): it refuses to start rather than run on an invented date. `true_up_month` must be a month of the same tax year — a true-up deducted after 31 March lands in the wrong tax year — so a later month is refused (BV-37).

**How the cycle sits against the tax year — an illustrative tenant, Tax Year 2026-27.** The dates are one tenant's choices; the quarterly Form 138 due dates are EV-049's.

| Months | Cycle state | What happens | Form 138 quarter it lands in |
| --- | --- | --- | --- |
| April | DECLARATION_OPEN, then DECLARATION_LOCKED | Declarations; any regime switch the window admits happens before the first payroll (§08 `tds.regime_switch_window`) | Q1, due 31 July |
| May to November | DECLARATION_LOCKED | Provisional exemptions under `provisional_exemption_policy`; claim_then_pay claims monthly | Q1 to Q3 |
| December to February | PROOF_OPEN | Proofs submitted and decided; TDS still on provisional figures | Q3 (due 31 January) and Q4 |
| End of February | PROOF_LOCKED | Undecided proofs lapse; outcome categories fixed | Q4 |
| March | TRUED_UP, then CLOSED | The true-up run absorbs the shortfall; unclaimed claim_then_pay balances paid as taxable | Q4, due 31 May — whose file format, and the Annexure II carrying the year's salary summary, are still unreleased and fenced (EV-046) |

**Cycle transitions.**

| # | From → To | Event | Guard | Side effect | Who may trigger |
| --- | --- | --- | --- | --- | --- |
| CY1 | DRAFT → DECLARATION_OPEN | `declaration_open_at` reached | Every required field set; the tax year's FBP menu versions published (BEN-30) | Employees notified (FR-CHR-088) | System; the cycle is configured by HR admin and approved by payroll/finance |
| CY2 | DECLARATION_OPEN → DECLARATION_LOCKED | `declaration_close_at` reached | — | Submitted lines lock (D4); drafts are discarded with notice (D7); the TDS projection recomputes | System |
| CY3 | DECLARATION_LOCKED → PROOF_OPEN | `proof_window_open_at` reached | — | pay_then_prove proofs open | System |
| CY4 | PROOF_OPEN → PROOF_LOCKED | `proof_lock_at` reached | — | Undecided proofs lapse (P9); outcome categories are computed | System |
| CY5 | PROOF_LOCKED → TRUED_UP | The `true_up_month` run is approved | Every lapsed proof decided, or confirmed lapsed by the operator | True-up inputs consumed (BEN-35) | Payroll/finance, through the run's own approval (§08.4) |
| CY6 | TRUED_UP → CLOSED | The tax year's last run is locked | — | Unclaimed claim_then_pay balances paid as taxable special allowance (§08 AC-502.2); the cycle turns read-only | System |
| CY7 | Any open state → same state, a date moved | A window or lock date changes | A date may move only to a time not yet passed; employees notified | The change is a new cycle version | HR admin proposes; payroll/finance approves |

**Settlement model per head — `fbp_component_config.settlement_model`.**

| Model | How it pays | When the exemption is decided | End of tax year |
| --- | --- | --- | --- |
| claim_then_pay | The employee claims against bills each month; approved claims are paid through payroll or off-cycle (§08 FR-PAY-502) | At approval, before payment | Unclaimed allocation is paid as taxable special allowance and trued up in the final run (§08 AC-502.2) |
| pay_then_prove | The allocation is paid every month; the exemption is provisional under `provisional_exemption_policy` until proof | At proof lock | The unproven portion is trued up in `true_up_month` (BEN-35) |

The meal and gift heads use neither model: they value by the §11.9.1 and §11.9.2 rules, not by proof. LTA is claim_then_pay per journey (BEN-33; §08 AC-502.1).

**Declaration line — `fbp_declaration`.** One line is one head for one employee for one tax year; a revision is a new version (B-class).

| # | From → To | Event | Guard | Side effect | Who may trigger |
| --- | --- | --- | --- | --- | --- |
| D1 | (none) → draft | The employee opens a head | Cycle DECLARATION_OPEN, or inside the joiner window | A head whose exemption the elected regime disallows, or leaves `new_regime_exempt` unset, is offered only as a taxable allocation, flagged `taxable_by_regime` with BV-02 shown — the exemption is hidden (E4), the allocation is not refused (BEN-33) | Employee |
| D2 | draft → submitted | Submit | Inside the window; amount within the head's cap (BV-01); total FBP allocations within the FBP budget of the employee's structure (§08 FR-PAY-501; BV-03) | `regime_at_submit` snapshotted; the projection recomputes from the next run | Employee; HR admin on the employee's behalf, with a reason |
| D3 | submitted → submitted, new version | Revise | Window open | The prior version is superseded | Employee |
| D4 | submitted → locked | CY2, or the joiner window closes | — | — | System |
| D5 | locked → locked, new version | Administrative reopen | Reason recorded; a distinct checker approves (§11.15.1) | The projection recomputes; payslips change from the next run | HR admin proposes; payroll/finance approves |
| D6 | submitted or locked → same state, new version flagged `taxable_by_regime` | A regime switch is accepted and the new regime disallows the head's exemption or leaves `new_regime_exempt` unset | — | The whole tax year re-values (§11.12; BEN-87); the prior version is superseded and stays queryable | System |
| D7 | draft → discarded | CY2 with the line still in draft, or the employee discards it | — | No effect | System or employee |
| D8 | locked → closed_at_exit | F&F settlement | — | The unproven or unclaimed balance is recognised as taxable in the F&F run (BEN-86) | System |

**Proof line — `proof_of_spend`.** The adjudication fields are B-class; the bill is an E-class document.

| # | From → To | Event | Guard | Side effect | Who may trigger |
| --- | --- | --- | --- | --- | --- |
| P1 | (none) → pending | Submit | A declaration line exists for the head (BV-05); inside the proof window (pay_then_prove), or before the month's claim cut-off (claim_then_pay — later claims fall to the next run); document attached where the head is `proof_required`; amount above zero (BV-06). A leaver may submit from resignation until the leaver cut-off, whatever the cycle's window | — | Employee |
| P2 | pending → approved | Approve | Verifier is not the claimant (BV-10); above `proof_checker_threshold`, a second, distinct approver | `amount_approved` = `amount_claimed`; the split recomputes on the next run (BEN-39) | Payroll/finance; bulk approval allowed, recorded per line |
| P3 | pending → partially_approved | Approve at an amount | Above zero and below the amount claimed; a reason for the disallowed part (BV-09) | As P2 | Payroll/finance |
| P4 | pending → rejected | Reject | A typed reason (BV-08) | — | Payroll/finance |
| P5 | pending → query | Query | Question text | Employee notified | Payroll/finance |
| P6 | query → pending | The employee answers or replaces the document | Before proof lock | — | Employee |
| P7 | pending or query → withdrawn | Withdraw | Not locked; not decided | — | Employee |
| P8 | approved, partially_approved or rejected → pending, new version | Reopen | Before proof lock; reason; a distinct checker approves | The split recomputes | Payroll/finance proposes; compliance checker approves |
| P9 | pending or query → lapsed_pending_decision | CY4 | — | Excluded from the exemption; listed on the pre-true-up report | System |
| P10 | lapsed_pending_decision → approved, partially_approved or rejected | A decision before the true-up run | CY5 not yet reached | Re-enters the computation | Payroll/finance |
| P11 | — | A submission after proof lock | Refused (BV-07); P8 is the only route back | — | — |

**The exemption for one head, to date.** For head *h*, one employee and one tax year, at each run:

- *Paid(h)* — the amount paid under the head to date.
- *Basis(h)* — the amount declared to date, for a pay_then_prove head before its proof lock under `provisional_exemption_policy` = declared; otherwise the amount approved to date.
- *Cap(h)* — the lower of the tenant's cap for the head to date and the head's statutory limit, where one exists.
- *Exempt(h)* = min(*Paid*, *Basis*, *Cap*) — and 0 where the head is unavailable in the elected regime. *Taxable(h)* = *Paid* − *Exempt*.
- A period's figures are the change in each since the previous run, so a correction lands as a delta in the next open period and never reopens a locked one.

**Outcome categories at proof lock.** The four names come from vendor documentation (r3/02 finding 29); the engine behaviour is this section's.

| Category | Test | Engine behaviour |
| --- | --- | --- |
| Matched | Approved = declared | Nothing to true up |
| Declared exceeds proofs | Approved below declared | The shortfall against *Paid* becomes taxable in `true_up_month` (BEN-35) |
| Proofs exceed declared | Approved above declared | The exemption stops at *Paid* (formula above); the excess approval has no effect and the statement says so |
| No declaration | Proofs without a declaration line | Refused at submit (BV-05), so empty by construction — listed for the vocabulary employees and operators already use |

**Joiner, leaver and regime switch.**

- **Joiner.** A joiner may declare within `joiner_declaration_window_days` of joining. The tenant's own caps prorate only if `fbp_cap_proration_on_join` says so; statutory limits never prorate unless their rule version does. Previous-employer income arrives through Form 122 on FR-PAY-503's path, not here.
- **Leaver.** Proofs are due `leaver_proof_cutoff_days` before the F&F settlement date. The F&F run (§08.9) recognises as taxable every unproven pay_then_prove balance and every unclaimed claim_then_pay balance, and the gift remainder (BEN-81); nothing waits for the tax year's true-up month.
- **Regime switch.** When a switch is accepted under §08's `tds.regime_switch_window`, every line whose exemption the new regime disallows or leaves unset is re-versioned as `taxable_by_regime` (D6) and the whole tax year re-values (§11.12). Nothing is deleted; the employee sees which lines moved and why.

**What the employee sees — the benefits block of the tax-projection statement (§08 FR-PAY-603).** Every figure is the engine's, read from the perquisite inputs (§11.9.5); the assistant may explain one but never produces one (§12.1).

| Block | Fields | Source |
| --- | --- | --- |
| Per FBP head | Declared; paid to date; each proof with its state, approved amount and any reason; approved to date; exempt and taxable to date; outcome category once locked; `taxable_by_regime` with its reason | `fbp_declaration`, `proof_of_spend`, perquisite inputs |
| Meal | Per month: *E* with the day-status counts behind it; the conventions applied; value issued; ceiling; exempt; taxable | `DayStatus`, meal ledger, perquisite inputs |
| Gifts | Each gift with its class; the running aggregate *G* against *T*; the mode and boundary applied; any cash gift taxed | Gift ledger, perquisite inputs |
| Insurance | Each valued premium head: covered persons, covered days, the employer's share, the perquisite | Coverage rows, premium basis, perquisite inputs |
| Cycle | The next date that matters — window close, proof lock, true-up month — and what happens at it | `fbp_cycle` |

**Worked examples.** Tax Year 2026-27. Allocations and bills are illustrative.

1. **Telephone, pay_then_prove, old regime.** (Under the new regime the telephone head is taxable by default until B9 confirms it — §11.12.) The employee declares ₹36,000 and is paid ₹3,000 a month; the policy is `declared`. April to February (11 runs) are paid ₹33,000, all provisionally exempt. On 10 December the employee submits ₹20,000 of bills; ₹18,000 is approved and ₹2,000 disallowed as the personal-use part of a mixed bill, with that reason (P3; §11.5). On 5 February a further ₹12,000 is approved in full (P2). The proof lock falls on 28 February: approved to date is ₹30,000. In the March run — the tenant's `true_up_month` — *Paid* = ₹36,000 and *Basis* switches to ₹30,000, so *Exempt* = ₹30,000 and *Taxable* = **₹6,000**. March's period delta is: paid +₹3,000, exempt −₹3,000 (from ₹33,000 to ₹30,000), taxable **+₹6,000**. Outcome: declared exceeds proofs.
2. **Books and periodicals, proofs exceed declared.** Declared ₹6,000, paid ₹500 a month (₹6,000 by March); bills of ₹8,000 approved. *Exempt* = min(₹6,000, ₹8,000, ₹6,000) = ₹6,000; taxable ₹0; the extra ₹2,000 of approval has no effect and the statement shows it.
3. **A joiner who leaves.** The employee joins on 1 October 2026 (old regime), declares telephone at ₹1,500 a month within the joiner window, and leaves on 31 December 2026. Paid October to December: ₹4,500, provisionally exempt. By the leaver cut-off, ₹3,000 of bills are approved. The F&F run recognises *Exempt* = min(₹4,500, ₹3,000) = ₹3,000 and *Taxable* = **₹1,500** (D8), without waiting for the cycle's proof window or March true-up.
4. **A regime switch that lands mid-year.** This happens only if the tenant's `tds.regime_switch_window` admits a switch after the year's first payroll — the one vendor rule captured does not (§11.12). Worked example 1's employee switches from old to new with effect from July. The new regime leaves the telephone head's `new_regime_exempt` unset (§11.12), so its line is re-versioned as `taxable_by_regime` (D6) and the whole tax year re-values: the ₹9,000 paid and provisionally exempted for April to June becomes taxable, as does every later month's ₹3,000. The July run's projection spreads the tax on the ₹9,000 over the remaining runs (§08 FR-PAY-205), and the employee's statement shows the prior version and the reason.
5. **A claim_then_pay head and the monthly cut-off.** An old-regime employee has telephone as a claim_then_pay head at ₹2,000 a month (₹24,000 for the year); `monthly_claim_cutoff_day` is the 22nd. On 20 April the employee claims ₹1,800 of bills; approved before the cut-off, it is paid exempt in the April run, leaving ₹200 of April's allocation unclaimed. On 25 May a ₹2,400 claim arrives after the cut-off and falls to the June run, where the allocation accrued to date is ₹6,000 and ₹1,800 has been paid: the ₹2,400 is paid exempt. If claims paid by the year's last run total ₹20,000, the unclaimed ₹4,000 is paid as taxable special allowance in that run (§08 AC-502.2).

**Requirements.**

| ID | Requirement | Priority | Acceptance criterion |
| --- | --- | --- | --- |
| **BEN-82** | Hold an `fbp_cycle` per tenant, pay group and tax year with the fields and transitions above; refuse to open a cycle with a required field unset. | R2 · C-38 | A cycle with `proof_lock_at` unset stays DRAFT with BV-31 naming the field; once set and approved, it opens on `declaration_open_at`. |
| **BEN-83** | Carry a `settlement_model` per FBP head and run claim_then_pay and pay_then_prove heads through their own paths. | R2 · C-38 | A claim_then_pay claim submitted after `monthly_claim_cutoff_day` is paid in the next run; a pay_then_prove head's allocation is paid monthly with its exemption provisional until proof lock. |
| **BEN-84** | Adjudicate proofs through P1–P11: approval at an actual amount, partial approval with a reason, rejection with a typed reason, query, withdrawal while undecided, reopen with a distinct checker, lapse at lock, and bulk approval recorded per line. | R2 · C-38 | A bulk approval of 50 lines writes 50 audit records, each with the actor and time; a partial approval without a reason is refused (BV-09); a submission after lock is refused (BV-07). |
| **BEN-85** | Compute each head's exemption as min(*Paid*, *Basis*, *Cap*), zero where the regime disallows the head, recognised as period deltas; classify each head into an outcome category at proof lock. | R2 · C-38 | Worked examples 1 and 2 reproduce to the rupee, including March's +₹6,000 delta and the ineffective ₹2,000 excess approval. |
| **BEN-86** | Handle joiners through the joiner window and leavers through the leaver cut-off, recognising every remaining FBP balance in the F&F run. | R2 · C-38 | Worked example 3 recognises ₹1,500 taxable in the F&F run; the leaver's proof submission opens at resignation even though the cycle's proof window has not. |
| **BEN-87** | On an accepted regime switch, re-version every line whose exemption the new regime disallows or leaves unset as `taxable_by_regime`, re-value the whole tax year, and show the employee which lines moved; never delete a line. | R2 · C-38 | An old-to-new switch re-versions the telephone and LTA lines as `taxable_by_regime`, re-values April onwards, keeps every prior version queryable, and leaves the LTA journey recorded against its block (BEN-33). |

**Test scenarios.**

| ID | Given | When | Then | Covers |
| --- | --- | --- | --- | --- |
| TB-F01 | A cycle with `proof_lock_at` unset | Opening is attempted | Refused; BV-31 names the field | BEN-82 |
| TB-F02 | A head capped at ₹36,000 | ₹40,000 is declared | Refused at submit; BV-01 cites the cap | BEN-31 |
| TB-F03 | A new-regime employee | An LTA line is opened | Accepted as a taxable allocation with BV-02 shown; the journey is still recorded against the block | §11.12, BEN-33 |
| TB-F04 | FBP allocations exceeding the structure's FBP budget | Submit | Refused; BV-03 | BEN-31 |
| TB-F05 | A cycle past `declaration_close_at` | The employee declares; then HR admin reopens with a checker | First refused; the reopen creates a new version | D5 |
| TB-F06 | No declaration line for books | A books proof is submitted | Refused; BV-05 | BEN-84 |
| TB-F07 | A pending proof | It is rejected without a reason | Refused; BV-08 | BEN-84 |
| TB-F08 | A payroll user who is also the claimant | They approve their own proof | Refused; BV-10 | BEN-84 |
| TB-F09 | `proof_checker_threshold` set | A proof above it is approved once | Held for a second, distinct approver | BEN-84 |
| TB-F10 | A pending proof, then a decided one | The employee withdraws each | The first withdraws; the second is refused | P7 |
| TB-F11 | A locked cycle | A proof is submitted | Refused (BV-07); only P8 reopens | E24 |
| TB-F12 | An undecided proof at lock | CY4, then a decision before the true-up run | Lapsed and excluded; re-enters on decision | P9, P10, E26 |
| TB-F13 | Worked example 1 | The March run | +₹6,000 taxable; ₹30,000 exempt for the year | BEN-85 |
| TB-F14 | Worked example 2 | The March run | ₹6,000 exempt; ₹0 taxable; excess approval shown as ineffective | BEN-85, E25 |
| TB-F15 | Worked example 3 | The F&F run | ₹1,500 taxable in the F&F run | BEN-86, E28 |
| TB-F16 | An old-regime employee with telephone and LTA lines | A switch to the new regime is accepted | Both re-versioned as `taxable_by_regime`; the year re-values; nothing deleted | BEN-87, E27 |
| TB-F17 | `provisional_exemption_policy` = proof_only | The year runs with worked example 1's proofs | No exemption before each approval; no March shortfall | BEN-85 |
| TB-F18 | A claim_then_pay claim after the cut-off | The month's run | Paid in the next run | BEN-83 |
| TB-F22 | Worked example 5 | April, June and the year's last run | ₹1,800 exempt in April; ₹2,400 exempt in June; ₹4,000 taxable in the last run | BEN-83, §08 AC-502.2 |
| TB-F23 | A Tax Year 2026-27 cycle with `true_up_month` set to April 2027 | It is saved | Refused (BV-37) | BEN-82 |

<!-- DIAGRAM: fr-benefits-fbp-cycle-lifecycle -->

#### 11.9.4 FBP heads against §08's component catalogue

A tenant FBP head is created by cloning a row of §08's component catalogue (FR-PAY-108), so it inherits that row's salary-TDS class, s.2(y) head and wage-base flags with their sources. §11 decides how the head is *valued and exempted*; §08 decides which wage bases it enters. The table fixes the pairing so neither section re-decides the other's question.

| FBP head | §08 catalogue row it clones | Settlement | Evidence | Valuation and exemption | Regime | Lands as |
| --- | --- | --- | --- | --- | --- | --- |
| Meal — voucher | Other remuneration in kind | Issue ledger (§11.9.1) | Attestations AT1–AT4 | M3–M6 | Both from Tax Year 2026-27; old only before | Taxable part: perquisite (Form 123) |
| Meal — premises | Other remuneration in kind | Premises meal record | `premises_during_working_hours` attestation; cost source | M7–M11 | As above | As above |
| Meal — cash allowance or bill reimbursement | A cloned earning row with no exemption | Paid as salary | — | M1, M2 | — | Taxable salary |
| Gift in kind, voucher, token | Other remuneration in kind | Gift ledger (§11.9.2) | Instrument class | *G* against *T* | Both, as v0.3 recorded — B9 | Perquisite once the threshold test fails |
| Cash gift, cash equivalent | A cloned earning row with no exemption | Paid as salary | — | Taxable in full | — | Taxable salary |
| Telephone and internet | Reimbursement against proof | pay_then_prove or claim_then_pay | Bills | §11.9.3 formula; personal-use part taxable | Old; new per `new_regime_exempt`, default false | Exempt part outside taxable income; the rest salary |
| Books and periodicals; professional development; uniform | Reimbursement against proof | As above | Bills | As above | As above | As above |
| Fuel, maintenance, driver | Reimbursement against proof; plus the motor-car perquisite (FR-PAY-106) where the car is employer-owned or hired | claim_then_pay | Bills; ownership and engine band | §11.5 motor-car row | Per the §11.5 row | Reimbursement per ownership; perquisite (Form 123) for the car |
| LTA | Leave travel allowance | claim_then_pay per journey | Travel proof | BEN-33 block rules | Old only | Exempt, or taxable salary |
| Gadget use and transfer | Other remuneration in kind (asset), valued by FR-PAY-106 | Asset register | Asset cost and dates | §11.5 asset rows | — | Perquisite (Form 123) |
| Children's education allowance | A cloned allowance row, exemption as payload | Paid as salary | Per B9 | `cea_limit`, `cea_max_children` — unset | Unset | Taxable salary until B9 fills the payload |
| Transport allowance | A cloned allowance row, exemption as payload | Paid as salary | Per B9 | `transport_allowance_limit` — predicate unset | Unset | Taxable salary until B9 |
| Employer NPS | Employer NPS | Contribution instruction | PRAN | §11.8 | Per regime (BEN-20) | Deduction; retiral cap (§11.10) |

Two rules sit under the table. An FBP head never overrides the wage-base flags it cloned — a meal voucher's in-kind value reaches §08's resolver as an input, and whether it counts toward wages under the s.2(88) Explanation is §08's decision (§06.10). And a head's exemption never exceeds what was paid under it (§11.9.3), whatever its cap.

#### 11.9.5 The perquisite feed — the only door from benefits into the payroll engine

§14's AC-DM-17 requires that a wallet transaction or endorsement reach taxable-perquisite inputs only "via an explicit, audited feed", and Part E-3 requires evaluation to be a pure function of inputs, rule-set version and an enumerated evaluation context. This is that feed. Every benefits figure the payroll engine uses arrives as a `perquisite_input` record; nothing else in this section writes to a pay run.

**`perquisite_input`** — R-class, one per employee, head and period, superseded rather than edited.

| Field | Type | Meaning |
| --- | --- | --- |
| `input_id` | Hash of (employee, head, period, the set of source versions) | The idempotency key: identical inputs produce the identical id, so a re-run never double-counts |
| `employee_id`, `tax_year`, `period` | Ids; the period | The period the value belongs to (valid time), not the period it was recorded in |
| `head_ref` | The §08 catalogue component the head cloned (§11.9.4) | Decides the wage-base flags on §08's side |
| `gross_value`, `exempt_value`, `taxable_value` | Money, in paise | Taxable = gross − exempt |
| `in_kind_value` | Money, in paise | What §08's resolver needs for the s.2(88) in-kind cap (§06.10); §11 never decides wage membership |
| `valuation_basis` | Rule-version ids and the parameter snapshot — conventions, modes, pooling | Why the figure is what it is |
| `evaluation_context` | Disbursal date, as-of decision time, jurisdiction set, regime election | Part E-3's enumerated context |
| `source_refs` | Wallet transactions, proofs, coverage rows, ledger rows, acknowledgements | Traceability for Q5 (§11.2.2) |
| `provisional` | Boolean | True for a pay_then_prove exemption before proof lock, and for a value resting on a rule row still under V-18 |
| `supersedes_input_id` | FK | The input this one replaces |
| `recorded_at` | Timestamp | Transaction time |

**Contract rules.**

1. For each employee, head and period, a run consumes the latest non-superseded input recorded before the run's as-of decision time.
2. An input for a locked period is never modified. A correction is a superseding input; the next open run's TDS projection absorbs the difference (§08 FR-PAY-205) and the locked payslip stays immutable (§08 AC-601.3).
3. The same sources always produce the same `input_id` and the same figures (Part E-3). The feed evaluates on every run but emits a new input only when a value changes.
4. Every Form 123 perquisite row and every perquisite line of the annual tax computation is a sum of inputs (§11.17), and every input traces to its sources.
5. No input carries a model-generated figure (§11.2 design rules).
6. No input reaches a filed artefact directly: Form 138 Annexure II is fed only through the annual tax computation (§11.17), and a filed `PayrollResult` or `Filing` is never mutated (AC-DM-17).
7. The feed carries figures, never money: no premium, contribution or wallet balance moves through it (BEN-52).

**Worked example — a late acknowledgement, then a corrected date.** From §11.6.3: the father's top-up is acknowledged on 10 May 2026 with cover from 1 April. The feed records an April input — gross ₹1,500, exempt ₹0, taxable ₹1,500, `recorded_at` 10 May — and a May input of the same value; the May run consumes both, and April's locked payslip is untouched. On 2 June the insurer corrects the start of cover to 15 April (CV4). The proration rule of BEN-02 values April at ₹1,500 × 16/30 = **₹800**, so a superseding April input carries ₹800, and the June run's projection absorbs the **−₹700** difference. The tax year's Form 123 total for the head moves from ₹18,000 to ₹17,300; every step is queryable (Q5).

| ID | Requirement | Priority | Acceptance criterion |
| --- | --- | --- | --- |
| **BEN-88** | Deliver every benefits figure to the payroll engine only as `perquisite_input` records under contract rules 1–7, with idempotent ids, superseding corrections and the Part E-3 evaluation context. | R2 · C-38 | Re-running a period with unchanged sources emits no new input; the worked example's correction produces one superseding April input and a −₹700 delta in June; any attempt to write a benefits figure into a run other than through the feed, or into a filed artefact, is refused and logged. |

| ID | Given | When | Then | Covers |
| --- | --- | --- | --- | --- |
| TB-P01 | A period already valued | It is re-run with no source change | No new input; figures identical | Rule 3 |
| TB-P02 | A locked April with a later coverage correction | The next open run | A superseding April input; the delta in the open run; April's payslip unchanged | Rule 2 |
| TB-P03 | A tax year of inputs | Form 123 totals are produced | Totals equal the sum of the year's latest inputs per head | Rule 4 |
| TB-P04 | A meal input resting on the V-18 rule row | The run is approved | The input is flagged provisional wherever the run shows provisional figures (§03) | `provisional` |
| TB-P05 | A filed Form 138 quarter | A benefits correction for that quarter arrives | No filed artefact changes; the correction flows through the projection and the correction path §08 owns | Rule 6 |
| TB-P06 | A meal voucher input with an in-kind value | §08's resolver runs | The in-kind value arrives unchanged; wage membership is §08's result | §11.9.4 |

**Order of operations within a pay run.** The payroll month runs `OPEN → INPUTS_CLOSED → PROCESSED → APPROVED → LOCKED → DISBURSED → PAYMENT_INITIATED → FILED`, reversible before LOCK (Part E-1; §08.4). Benefits work fits into it at fixed points, so that what a period consumed is always knowable.

| Step | Payroll state | Benefits work | Reads | Emits | Blocks the run? |
| --- | --- | --- | --- | --- | --- |
| 1 | OPEN | Declarations, proofs, issues, gifts, coverage changes and acknowledgements are recorded as they happen | — | Source records and events (§11.2.5) | No |
| 2 | OPEN → INPUTS_CLOSED | The as-of decision time is fixed; records after it belong to the next run | — | — | No |
| 3 | INPUTS_CLOSED | A declaration version that changed the head split signals §08's wage-base resolver (BEN-97) | `fbp_declaration` | The signal | Only through §08 AC-108.3 |
| 4 | INPUTS_CLOSED → PROCESSED | The feed evaluates meal (§11.9.1), gift (§11.9.2), FBP heads (§11.9.3), premiums (§11.6.4) and the retiral ledger (§11.10) | Day statuses for the attendance cycle; the ledgers; confirmed coverage; approved proofs; rule versions | Perquisite inputs, new or superseding (§11.9.5) | Only BV-14 |
| 5 | PROCESSED | §08 consumes the latest inputs into the TDS projection and the payslip | Perquisite inputs | Payslip lines; projection | — |
| 6 | PROCESSED → APPROVED | The pre-run benefits exceptions report sits in front of the approver (§11.17.1) | Open BV items | — | An open blocking Task holds approval |
| 7 | LOCKED | The period's consumed inputs are frozen; a later correction for it is a superseding input consumed by the next open run | — | — | — |

<!-- DIAGRAM: fr-benefits-pay-run-sequence -->

#### 11.9.6 FBP entities — field-level definitions

§11.2 names the FBP entities with illustrative attributes; §11.9.1–§11.9.5 add the fields the rules need. This consolidates them at build level. Class and classification follow §14.6.1a and §14.5.

**`fbp_component_config`** — B-class, C4; one row per head per tenant, versioned.

| Field | Type | Null | Validation |
| --- | --- | --- | --- |
| `component_id`, `tenant_id` | Ids | No | — |
| `head_type` | Enum: meal, gift, telephone, books, professional_development, uniform, fuel_vehicle, lta, gadget, cea, transport, employer_nps | No | — |
| `catalogue_row_ref` | FK to the §08 catalogue row cloned | No | Per §11.9.4; wage-base flags are inherited, never set here |
| `settlement_model` | Enum: claim_then_pay, pay_then_prove, issue_ledger, gift_ledger | No | issue_ledger for meal, gift_ledger for gift |
| `meal_delivery_mode` | Enum: premises, voucher, cash_allowance, other | Meal heads: No | Missing raises BV-11 |
| `qualifying_conditions` | JSON — the premises attestation reference; voucher attestations live on `wallet_config` | Yes | Read by M7–M9 |
| `tax_rule_ref` | FK to the rule version (§14.6.2) | No | Resolved per period |
| `rule_ref_2026` | Citation | Yes | Null until §20 confirms (B9); never printed while null |
| `annual_cap`, `monthly_cap` | Money, in paise | Yes | A tenant cap above the statutory limit exempts nothing beyond it (BEN-30) |
| `proof_required` | Boolean | No | — |
| `new_regime_exempt` | Per period: true, false or unset | No | Unset values as false — the default-direction rule (§11.12) |
| `exemption_section` | Label in both vocabularies | Yes | EV-050 |
| `valuation_method` | Enum per the §11.5 catalogue | No | — |
| `effective_from`, `effective_to`, `recorded_at` | Axes | `effective_to` Yes | — |

**`fbp_declaration`** — B-class, C1 (it is salary structure); one line per head per employee per tax year, versioned.

| Field | Type | Null | Validation |
| --- | --- | --- | --- |
| `declaration_id`, `employee_id`, `cycle_id`, `component_id`, `tax_year` | Ids | No | One live version per employee, head and tax year |
| `declared_amount` | Money, in paise | No | Within the head's cap (BV-01) and the FBP budget (BV-03) |
| `monthly_amount` | Money, in paise | No | Produced by §08's structure engine (FR-PAY-501); recorded here, never computed here |
| `status` | Enum: draft, submitted, locked, superseded, discarded, closed_at_exit | No | Transitions D1–D8; `superseded` marks a prior version |
| `taxable_by_regime` | Boolean | No | True where the elected regime disallows the head's exemption or leaves it unset (D1, D6) |
| `regime_at_submit` | Enum: old, new | No | Snapshot (§11.12) |
| `version`, `supersedes_declaration_id` | Integer; FK | `supersedes` Yes | — |
| `submitted_at`, `submitted_by`, `on_behalf_reason` | Timestamp; actor; text | Reason required when HR admin submits | — |
| `reopen_reason`, `reopened_by`, `reopen_approved_by` | Text; actors | Yes | D5: the approver is not the proposer |

**`proof_of_spend`** — adjudication fields B-class and C1; the bill E-class.

| Field | Type | Null | Validation |
| --- | --- | --- | --- |
| `proof_id`, `declaration_id` | Ids | No | A declaration line must exist (BV-05) |
| `service_period_from`, `service_period_to` | Dates | No | Inside the tax year; for claim_then_pay, not after the claim month |
| `vendor_name`, `bill_number`, `bill_date` | Text; date | `bill_number` Yes | A repeat of (employee, vendor, bill number, bill date, amount) goes to review (BV-34) |
| `amount_claimed` | Money, in paise | No | Above zero (BV-06) |
| `amount_approved` | Money, in paise | Yes | Not above `amount_claimed` |
| `status` | Enum: pending, approved, partially_approved, rejected, query, withdrawn, lapsed_pending_decision | No | Transitions P1–P11 |
| `document_ref` | FK to a `Document` | Required where `proof_required` | E-class; erased by the retention engine (§14.7.2) |
| `verifier_id`, `second_verifier_id` | Actors | Yes | Neither is the claimant (BV-10); the second is required above `proof_checker_threshold` |
| `reject_reason`, `partial_reason`, `query_text` | Text | Per state | Required by BV-08 and BV-09 |
| `decided_at`, `version`, `recorded_at` | Timestamps; integer | Per state | — |

**`wallet_config`** — B-class, C4; one per instrument per tenant.

| Field | Type | Null | Validation |
| --- | --- | --- | --- |
| `wallet_id`, `tenant_id`, `component_id` | Ids | No | — |
| `instrument_type` | Enum: meal, fuel, gift | No | — |
| `issuer_name` | Text | Yes | The issuer the employer contracts directly while `provider_ref` is null |
| `provider_ref` | Reference to an integrated issuer | Yes | v2 hook; null in v1 (BEN-36) |
| `monthly_cap`, `per_txn_cap`, `per_meal_cap` | Money, in paise | Yes | A `per_meal_cap` above the rule's cap exempts only up to the rule's cap |
| `non_transferable`, `eating_outlet_only` | References to attestation records (AT1–AT4) | Meal: required for any exemption | M3 |
| `balance_transferable_to_other_wallets` | Boolean | Meal: No | True bars `eating_outlet_only` (§11.9.1) |
| `gift_instrument_class` | Enum: in_kind, voucher, token, cash, cash_equivalent | Gift: No | Unattested values as cash (BV-16) |
| `effective_from`, `effective_to`, `recorded_at` | Axes | `effective_to` Yes | AT3 ends attestations when the instrument changes |

**`lta_block_usage`** — B-class, C1; the cross-tax-year state BEN-33 needs and §11.16 imports, which §11.2's entity table never named. One row per employee per calendar-year block. The block mechanics are carried from v0.3 — two exempt journeys per four-year block, one unused journey carrying into the first calendar year of the next, domestic travel at actual fare — **[Hypothesis]** under B9 (parameter `tax.lta_block`).

| Field | Type | Null | Validation |
| --- | --- | --- | --- |
| `employee_id`, `block_start_year`, `block_end_year` | Id; years | No | Blocks per `tax.lta_block` — 2022–2025, 2026–2029 |
| `journeys_exempt` | Integer | No | Not above the block's allowance |
| `carried_in` | 0 or 1 | No | Set only from the previous block's unused journey |
| `carried_in_used` | Boolean | No | Usable only in the block's first calendar year |
| `journeys` | List of (claim, journey start date, calendar year, regime at claim, treatment, approved fare) | No | Treatment per L1–L7 below |
| `source`, `source_ref` | Enum: native, imported; text | `source_ref` for imports | Imported rows name the source system (§11.16) |

| # | Situation at claim | Treatment |
| --- | --- | --- |
| L1 | New regime | Taxable (§11.12); the journey is recorded against the block and, by default, consumes one of its exempt journeys — `lta_taxable_journey_consumes_slot` defaults to true under the default-direction rule (B9) |
| L2 | Old regime; fewer exempt journeys used than the block allows | Exempt up to the approved fare (the proof sets the amount; the declaration never does); `journeys_exempt` + 1 |
| L3 | Old regime; in the block's first calendar year with `carried_in` = 1 unused | Exempt as the carried-in journey — consumed first, because it lapses at the end of that year |
| L4 | Old regime; the block's allowance used and no carried-in journey available | Taxable |
| L5 | Old regime; travel outside India | Taxable — domestic travel only |
| L6 | The block ends with fewer exempt journeys than allowed | One journey carries into the next block's first calendar year (`carried_in` = 1), however many went unused |
| L7 | A Tax Year 2026-27 claim while `lta_entitled_class_rule` is unset | The exempt amount goes to operator review: the 2026 Rules reportedly restrict LTC to the entitled class and the condition is not captured (B9) |

Tests: TB-L01 — an old-regime employee with one exempt journey in 2022–2025 has `carried_in` = 1 on the 2026–2029 row (L6). TB-L02 — that employee's first old-regime claim in 2026 consumes the carried-in journey and leaves both new-block journeys (L3). TB-L03 — a third exempt claim in one block without a carried-in journey is taxable (L4). TB-L04 — a new-regime claim is taxable and, by default, consumes a journey (L1). TB-L05 — a Tax Year 2026-27 claim with `lta_entitled_class_rule` unset goes to operator review with no exempt figure (L7).

**End of life.** The B-class rows above are never hard-deleted (BEN-05); their personal fields sit under the subject key and return `ERASED` after a shred (§14.6.1a). The bill and every attestation evidence document are E-class, erased when the retention engine decides (§14.7.2); the retention period for tax proofs is not stated in this PRD — any figure beyond EV-054's central-sphere registers is a counsel item (Part D-11). After erasure, the proof's amounts and decision replay; the bill returns its tombstone.

#### 11.9.7 FBP restructuring and the wage bases — the add-back interaction

An FBP declaration "restructures gross without changing CTC" (BEN-31): the allocation comes out of the balance-figure special allowance and goes into FBP heads. Special allowance is wages under s.2(y) (§08 FR-PAY-108); an FBP head carries whatever s.2(y) head its cloned catalogue row has — for reimbursement heads, a **payload** §08 sets per component with a source. Where that payload classes a head as an excluded component, the declaration shifts remuneration from wages into exclusions, and the 50% add-back (EV-010; §06.10) can fire or grow. So a benefits event changes the PF and gratuity wage bases, and §08 must re-run its wage-base resolver (FR-PAY-201, as a bounded fixed point where needed — FR-PAY-211) whenever a declaration version changes the split. §11 never decides the classification or computes the add-back; it guarantees the trigger.

**Worked example (illustrative structure; the classification is assumed, not decided).** Total monthly remuneration ₹1,00,000: wages (basic, DA and special allowance) ₹55,000, excluded components ₹45,000. No add-back fires: exclusions are below half. The employee declares ₹10,000 a month into FBP heads whose §08 payload classes them as excluded. Wages fall to ₹45,000 and exclusions rise to ₹55,000 — ₹5,000 above half of ₹1,00,000 — so ₹5,000 is added back: the PF and gratuity wage becomes ₹50,000, not ₹45,000. Gratuity accrues on the uncapped gratuity wage (BEN-17), so its base falls from ₹55,000 to ₹50,000; EPF, capped at the ₹15,000 wage ceiling, is unchanged unless the employer contributes on actual wages above it. Were the payload to class the same heads as wages, nothing would move.

| ID | Requirement | Priority | Acceptance criterion |
| --- | --- | --- | --- |
| **BEN-97** | Signal §08's wage-base resolver whenever an FBP declaration version changes the split between heads, so the PF, gratuity and payment-of-wages bases are recomputed from the next run; never infer or set a head's s.2(y) classification in §11. | R2 · C-38 | The worked example's declaration, with the heads' payload set to excluded, yields a ₹50,000 PF and gratuity wage from the next run and a matching change in gratuity accrual; with the payload unset, the head cannot enter the run (§08 AC-108.3) and the declaration's effect waits on it. |

| ID | Given | When | Then | Covers |
| --- | --- | --- | --- | --- |
| TB-F19 | The worked example's structure, FBP heads classed excluded | The declaration is submitted | Add-back of ₹5,000; PF and gratuity wage ₹50,000 | BEN-97, EV-010 |
| TB-F20 | The same, FBP heads classed as wages | The declaration is submitted | Wage bases unchanged | BEN-97 |
| TB-F21 | An FBP head whose s.2(y) cell is payload and unset | A run is attempted | The §08 blocking item names the cell | BEN-97, §08 AC-108.3 |

---

### 11.10 The ₹7.5 lakh aggregate retiral cap — the cross-vehicle edge case

This is the single hardest benefits computation and the strongest standalone justification for building the retiral data model in v1, because it **cannot be computed inside any one benefit module** — it spans EPF (statutory payroll), NPS (§11.8) and superannuation (§11.8) simultaneously.

**[Hypothesis]** (carried, not re-captured — vocabulary note; parameter `tax.retiral_aggregate_cap`) The Finance Act 2020 inserted **s.17(2)(vii)**: employer contributions to **recognised PF + NPS + approved superannuation fund**, in aggregate, exceeding **₹7,50,000 in a financial year**, are a taxable perquisite in that year. **s.17(2)(viia)** and **Rule 3B** further tax the *annual accretion* (interest/return) attributable to the excess (Source: Income-tax Act s.17(2)(vii), (viia); Income-tax Rules, Rule 3B).

**The Rule 3B accretion formula (stated, so the engine is unambiguous).** **[Hypothesis]** (1962-Rules text carried from v0.3, not re-captured; parameter `tax.rule3b_formula`, re-read under B9) The taxable accretion for a year is `TP = (PC/2)×R + (PC1 + TP1)×R`, where `PC` = the current-year excess contribution (over ₹7.5 L), `PC1` = the aggregate excess of preceding years, `TP1` = the aggregate accretion already taxed in preceding years, and `R = I / Favg` (I = income/return accrued during the year on the excess balance; Favg = the average of the opening and closing excess balances). The engine must persist `PC1`, `TP1` and the cumulative excess balance across FYs — with LTA block usage (BEN-33), this is one of the benefits model's two cross-tax-year states (§11.15 item 7) (Source: 1962 Rules r.3B — carried).

Why this forces the `retiral_contribution_ledger`:

1. **Three sources, one cap.** EPF employer contribution is computed in the statutory payroll engine; NPS in BEN-23; superannuation in BEN-24. The cap is on their *sum* per employee per FY. No single module has all three numbers — only a cross-cutting ledger does.
2. **The accretion sub-computation is stateful across years.** Rule 3B taxes the return on the *cumulative* excess, so the ledger must persist the excess balance across tax years and apply the prescribed formula. A stateless per-run computation gets it wrong.
3. **It interacts with the dual wage base and the filing lifecycle.** The EPF base is the add-back-adjusted wage (§06.10), so the EPF contribution feeding the cap is itself a versioned, effective-dated number — the ledger must read the *same* figure the approved ECR returns carry, not a re-derived one. And because an approved return can never be cancelled and a Revised return is impossible once payment is initiated (EV-036, EV-037), a later correction reaches the ledger as a dated diff, never as a rewrite (BEN-43).

| ID | Requirement | Priority | Acceptance criterion |
| --- | --- | --- | --- |
| **BEN-40** | Aggregate employer EPF + NPS + superannuation contributions per employee per FY into a persisted ledger. | R2 · C-38 | For an employee with employer EPF ₹4.0 L + NPS ₹3.0 L + superannuation ₹1.0 L = ₹8.0 L, the ledger records a ₹50,000 cap breach for the FY. |
| **BEN-41** | Value the cap-breach excess as a taxable perquisite in the tax year it arises, feeding s.392 (ex-s.192) and Form 123 (ex-12BA). | R2 · C-38 | The ₹50,000 excess appears as a perquisite in the monthly TDS accrual and in Form 123; removing the superannuation scheme drops the breach to zero on the next run. |
| **BEN-42** | Compute the Rule 3B annual accretion on the cumulative excess across tax years, using persisted `PC1`/`TP1`. | P1 | An employee with a prior-year excess carries an accretion perquisite in the following tax year computed on the persisted cumulative excess and the current-year return, not on the current-year contribution alone. |
| **BEN-43** | Source the EPF figure feeding the cap from the per-establishment filing ledger (§08): for each wage month, the sum over that month's approved returns — the Regular, any Supplementary, or the Revised that replaced the Regular before payment initiation (EV-037) — of the ECR's Employer PF Contribution field, plus Employer EPS Contribution where `retiral_cap_includes_eps` is set (a tax-interpretation parameter routed to §20, B9) (EV-035). Once payment is initiated a downward correction is impossible (EV-037); an upward correction arrives through the arrear-return flow (EV-043) — whose file layout is fenced — and posts as a dated diff row, never a mutation of the filed figure (Part E-1). Its tax year for the cap follows `retiral_cap_arrear_attribution`, defaulting to the disbursal date's tax year — PF liability on arrears dates from disbursal (Part E-9) — **[Hypothesis]**, B9. | R2 · C-38 | The EPF employer figure in `retiral_contribution_ledger` for a wage month equals the sum of the approved returns' fields for that month, and `source_return_refs` names them. A Supplementary return for a late-seeded member adds that member's figure without touching other members' rows. An arrear disbursed in May 2027 for wage months in Tax Year 2026-27 appears as a separate diff row dated May 2027; the 2026-27 rows stay bit-for-bit as filed. |

<!-- DIAGRAM: retiral-cap-aggregation -->

**Why this belongs in v1 even though attach is deferred.** The moment a tenant offers *any* voluntary retiral benefit on top of statutory EPF — corporate NPS is common at 50–200 — this computation becomes a correctness requirement, not a monetisation feature. Getting it wrong under-withholds TDS and creates an employer liability. It is the clearest example of "the tax computation needs the data model regardless of monetisation" (§11.1, reason 1).

#### 11.10.1 Recognising the cap breach through the year

BEN-40 and BEN-41 say the excess is a perquisite "in the tax year it arises". They do not say *when in the year* the engine recognises it, and that omission decides whether the employee meets the tax in twelve instalments or in one March payslip. The carried text gives an annual figure and no timing rule; the research captured none; so timing is a named parameter, defaulted by the default-direction rule (§11.9.1) and routed to §20 through B9.

| Parameter | Options | Default | Why, and where it goes |
| --- | --- | --- | --- |
| `retiral_cap_recognition` | `projected` — recognise the projected annual excess rateably as the year elapses; `actual_to_date` — recognise only once the aggregate to date passes the cap; `year_end` — recognise in the tax year's last run | `projected` | It is the only option that cannot defer withholding, and it is the behaviour §08's TDS projection already applies to salary. `year_end` can never be the default. B9 |
| `retiral_cap_scope` | `this_employer`; `all_employers_in_tax_year` | `this_employer` | The product holds no record of a prior employer's contributions, so `this_employer` is the only computable scope; under the alternative a declared prior figure is an operator entry with its source. B9 — the same reasoning as `gift_threshold_scope` (§11.9.2) |
| `retiral_cap_part_year_proration` | no; yes | `no` | No proration provision was captured, and prorating a statutory annual cap would itself be an invented rule — the one place the default-direction rule yields to Part A-2's ban on inventing one. The part-year case is listed on the operator report instead. B9 |

**Worked example — §11.11's employee, month by month.** Employer EPF ₹4,80,000, NPS ₹2,01,600 and superannuation ₹1,20,000 for the tax year, level across twelve periods: `40,000 + 16,800 + 10,000 = ₹66,800` a month. The projected annual aggregate is `66,800 × 12 = ₹8,01,600`, the projected excess `8,01,600 − 7,50,000 = ₹51,600`, and the rateable recognition `51,600 ÷ 12 = ₹4,300` a period.

| Period | Aggregate to date | Excess to date, `actual_to_date` | Recognised to date, `projected` | Period input, `projected` |
| --- | --- | --- | --- | --- |
| Apr 2026 | ₹66,800 | ₹0 | ₹4,300 | ₹4,300 |
| May | ₹1,33,600 | ₹0 | ₹8,600 | ₹4,300 |
| Jun | ₹2,00,400 | ₹0 | ₹12,900 | ₹4,300 |
| Jul | ₹2,67,200 | ₹0 | ₹17,200 | ₹4,300 |
| Aug | ₹3,34,000 | ₹0 | ₹21,500 | ₹4,300 |
| Sep | ₹4,00,800 | ₹0 | ₹25,800 | ₹4,300 |
| Oct | ₹4,67,600 | ₹0 | ₹30,100 | ₹4,300 |
| Nov | ₹5,34,400 | ₹0 | ₹34,400 | ₹4,300 |
| Dec | ₹6,01,200 | ₹0 | ₹38,700 | ₹4,300 |
| Jan 2027 | ₹6,68,000 | ₹0 | ₹43,000 | ₹4,300 |
| Feb | ₹7,34,800 | ₹0 | ₹47,300 | ₹4,300 |
| Mar | ₹8,01,600 | ₹51,600 | ₹51,600 | ₹4,300 |
| **Year** | **₹8,01,600** | **₹51,600 — all in March** | **₹51,600** | **₹51,600** |

Both columns end at ₹51,600 — the annual figure §11.11 carries — and they differ only in when the employee pays it. Under `actual_to_date` the whole perquisite lands in the last run of the year, in the same payslip as any late gift crossing (§11.11.1) and any FBP true-up (BEN-35); three year-end effects in one payslip is exactly the surprise the projection exists to avoid.

**Worked example — a mid-year change.** The tenant stops the superannuation contribution from 1 January 2027. The monthly aggregate falls to `40,000 + 16,800 = ₹56,800`, and the annual aggregate becomes `(9 × 66,800) + (3 × 56,800) = 6,01,200 + 1,70,400 = ₹7,71,600`, so the excess is `₹21,600`, not ₹51,600. Recognition re-bases in the January run: recognised to date should be `21,600 × 10/12 = ₹18,000`, against ₹38,700 already recognised, so January's period input is **−₹20,700** — a superseding input through the feed (§11.9.5), never an edit of a locked period. February and March then recognise `21,600 × 11/12 − 18,000 = ₹1,800` each, and the year closes at ₹21,600.

**Worked example — a leaver.** The same employee exits on 31 October 2026. The aggregate to date is ₹4,67,600, well under the cap, so no perquisite is owed; the projection had recognised ₹30,100 by October, and the F&F run reverses it with a **−₹30,100** superseding input (§08.9). An engine that recognised progressively without reversing on exit would over-withhold and leave the employee to reclaim it on filing.

**Worked example — a joiner.** An employee joining on 1 October 2026 on the same monthly figures contributes `6 × 66,800 = ₹4,00,800` for the tax year. With `retiral_cap_part_year_proration` = no, the cap stands at ₹7,50,000 and no breach arises; the employee is listed on the operator report so the position is visible rather than assumed, and the prior employer's contributions are outside the default scope.

| ID | Requirement | Priority | Acceptance criterion |
| --- | --- | --- | --- |
| **BEN-104** | Recognise the cap breach through the year under `retiral_cap_recognition`, `retiral_cap_scope` and `retiral_cap_part_year_proration`, re-basing on any change to a rate, a wage or an enrollment, and reversing unsupported recognition in the F&F run — every movement a superseding perquisite input, never an edit of a locked period. | R2 · C-38 | The month-by-month table reproduces under both recognition modes and ends at ₹51,600 in each; the superannuation stop produces a −₹20,700 January input and a ₹21,600 year; the 31 October exit reverses ₹30,100 in the F&F run; the October joiner produces no breach and one operator-report line. |

| ID | Given | When | Then | Covers |
| --- | --- | --- | --- | --- |
| TB-RC01 | §11.11's employee, `projected` | The year runs | ₹4,300 a period, ₹51,600 for the year | BEN-104 |
| TB-RC02 | The same, `actual_to_date` | The year runs | Nothing until March, then ₹51,600 | BEN-104 |
| TB-RC03 | Superannuation stopped from January | The January run | −₹20,700; the year closes at ₹21,600 | BEN-104 |
| TB-RC04 | Exit on 31 October | F&F runs | −₹30,100; no perquisite for the year | BEN-104 |
| TB-RC05 | A joiner on 1 October | The year runs | No breach; one operator-report line; the cap is not prorated | BEN-104 |
| TB-RC06 | `retiral_cap_scope` = all_employers_in_tax_year with no declared prior figure | The period runs | Operator review, never an assumed zero | BEN-104 |

<!-- DIAGRAM: fr-benefits-retiral-cap-recognition -->

#### 11.10.2 The Rule 3B accretion, worked in rupees

The cap breach is one year's arithmetic; the accretion is the part that makes the ledger stateful. §11.10 states the formula `TP = (PC/2) × R + (PC1 + TP1) × R` with `R = I / Favg` (**[Hypothesis]**, 1962-Rules text carried, B9). Its variables split cleanly into what the product computes and what it must be given.

| Variable | Meaning | Who supplies it |
| --- | --- | --- |
| `PC` | The current tax year's excess over the cap | The ledger — §11.10.1's figure |
| `PC1` | The aggregate excess of preceding tax years | The ledger, persisted; never recomputed from scratch |
| `TP1` | The accretion already taxed in preceding tax years | The ledger, persisted |
| `I` | The income or return accrued during the year on the excess balance | **The funds.** The PF, NPS and superannuation statements. The product does not compute or estimate it |
| `Favg` | The average of the opening and closing excess balances | The funds, on the same statements |
| `R` | `I ÷ Favg` | Derived from the two figures above, never entered as a rate |

**The input the product refuses to guess.** `I` and `Favg` arrive from outside on the fund's own timetable. Defaulting them to zero would compute a zero accretion and under-deduct, so `rule3b_fund_income_source` ships with no default: while the figures are absent for a tax year in which `PC1 + TP1 + PC` is above zero, the accretion is an operator-review item carried on the pre-run report (§11.17.1) and the employee's projection shows it as pending, never as nil. Where the statement arrives after the tax year's last run, the accretion reaches the engine through §08's correction path as a dated item — the filed artefacts are never mutated (§11.9.5, rule 6).

**Worked example — two tax years.** Year one is §11.10.1's employee; year two's figures are illustrative, and `I` and `Favg` are taken as the funds report them.

| | Tax Year 2026-27 | Tax Year 2027-28 |
| --- | --- | --- |
| `PC` — this year's excess | ₹51,600 | ₹60,000 |
| `PC1` — prior aggregate excess | ₹0 | ₹51,600 |
| `TP1` — prior taxed accretion | ₹0 | ₹2,064.00 |
| `I` — fund-reported income on the excess | ₹2,064.00 | ₹6,691.20 |
| `Favg` — fund-reported average excess balance | ₹25,800.00 | ₹83,640.00 |
| `R = I ÷ Favg` | 0.08 | 0.08 |
| `(PC ÷ 2) × R` | `25,800 × 0.08 = ₹2,064.00` | `30,000 × 0.08 = ₹2,400.00` |
| `(PC1 + TP1) × R` | `0 × 0.08 = ₹0.00` | `53,664 × 0.08 = ₹4,293.12` |
| **`TP` — taxable accretion** | **₹2,064.00** | **₹6,693.12** |
| Carried into the next year | `PC1` = ₹51,600, `TP1` = ₹2,064.00 | `PC1` = ₹1,11,600, `TP1` = ₹8,757.12 |

Two things the table makes concrete. First, the second year's accretion is more than three times the first on a barely larger contribution excess, because it is charged on the *accumulated* excess plus the accretion already taxed — an engine computing accretion on the current year alone would under-tax by ₹4,293.12 in year two and by more every year after (E9). Second, the carried figures compound: `PC1` and `TP1` are the only benefits state besides LTA block usage that a fresh tax year must not reset (§11.15 item 7), and they are the first thing a migration must carry (§11.16).

**Edge cases.**

| # | Case | Behaviour |
| --- | --- | --- |
| RB1 | `PC` is zero but `PC1 + TP1` is above zero | An accretion still arises on the carried balance; the year's perquisite is not zero merely because this year's contributions stayed under the cap |
| RB2 | A fund statement covers a period different from the tax year | Operator review — the product never pro-rates a statement it was not given the basis for |
| RB3 | A cap-breach correction after the accretion was computed | The accretion re-computes from the corrected `PC` as a superseding input; a locked period is untouched |
| RB4 | An employee with no superannuation or NPS, EPF alone above the cap | The formula is vehicle-agnostic: the ledger aggregates the excess, not the vehicle (§11.8.2) |
| RB5 | An exit part-way through a year with a carried balance | The accretion for the part year is an operator-review item unless the funds report `I` and `Favg` for it — never an assumed fraction |

| ID | Given | When | Then | Covers |
| --- | --- | --- | --- | --- |
| TB-RC07 | The two-year worked example | Each year closes | ₹2,064.00 then ₹6,693.12; `PC1` and `TP1` carried as shown | BEN-42 |
| TB-RC08 | Year two computed without `PC1` and `TP1` | The comparison is run | It under-states by ₹4,293.12 — the regression this test exists to catch | BEN-42, E9 |
| TB-RC09 | No fund statement for a year with a carried balance | The run closes | Operator review; the projection shows the accretion pending, never nil | RB1, `rule3b_fund_income_source` |
| TB-RC10 | A corrected cap breach after the accretion was booked | The next open run | A superseding accretion input; the locked period unchanged | RB3 |

---

### 11.11 Worked example — one employee, every benefit, one tax year

This ties §11.8–§11.10 together on a single synthetic employee so the acceptance criteria are unambiguous and the interactions between regime, FBP and the retiral cap are visible. All figures are illustrative; all are engine-computed under the cited rules. **The example assumes the 1961-Act values (the 14%/10% NPS ceilings, the ₹7.5 lakh aggregate, Rule 3B) carry into the 2025 Act unchanged — [Hypothesis], §11.19 B9; the mechanics are the point.**

**Employee profile (Tax Year 2026-27, new tax regime elected):**

- Basic + DA: ₹1,20,000/month (₹14,40,000/year) — the s.80CCD "salary" base (§11.8).
- Wages under CoSS s.2(88) after the 50% add-back: ₹40,00,000/year (₹3,33,333.33/month) — an illustrative low-basic structure. This, not basic + DA, is the PF and gratuity wage base (§06.10; §08.1, I1).
- Employer EPF contribution: 12% of the add-back wage, the employer contributing on actual wages above the ₹15,000 ceiling → ₹4,80,000 for the tax year. The example sets `retiral_cap_includes_eps` (BEN-43); unset, the EPS share drops out of the aggregate and the breach shrinks by that amount.
- Corporate NPS: employer contributes 14% of basic+DA → ₹2,01,600 for the tax year.
- Approved superannuation: employer contributes ₹1,20,000 for the tax year.
- GMC: employee + spouse + 2 children covered (employer-paid, non-taxable); employer-paid **parental top-up** premium ₹18,000/year (taxable perquisite).
- Gratuity: 6 completed years, accruing per BEN-17 (not paid this tax year; a provision, not income).
- FBP declarations: meal vouchers attested non-transferable and eating-outlet-only, ₹200/meal × 1 meal × ~22 working days × 12 = ₹52,800 declared; telephone/internet ₹36,000 declared; LTA ₹80,000 declared (a journey in the 2026–2029 block).

**What the engine computes:**

| Item | Rule | Engine result |
| --- | --- | --- |
| 80CCD(2) NPS deduction | s.80CCD(2), 14% new regime | ₹2,01,600 deductible (14% of ₹14,40,000 exactly) |
| Retiral aggregate | s.17(2)(vii): employer contributions *made* to EPF + NPS + superann | ₹4,80,000 + ₹2,01,600 + ₹1,20,000 = **₹8,01,600** |
| Cap breach | ₹8,01,600 − ₹7,50,000 | **₹51,600 taxable perquisite** this tax year, posted to `retiral_contribution_ledger`, valued in Form 123 (ex-12BA) |
| Meal vouchers | ₹200/meal from 1 Apr 2026, conditions met (BEN-62) | Exempt up to the eligible-meal ceiling (BEN-37); over-cap or LOP-reduced meals taxed; available under the new regime from this tax year |
| Parental top-up premium | s.17(2) | ₹18,000 taxable perquisite on the payslip |
| Telephone/internet | Rule 3(7)(ix) | Taxable by default under the new regime until `new_regime_exempt` is confirmed for Tax Year 2026-27 (§11.12, B9); once confirmed, exempt to the extent of approved proof, with any unsubstantiated portion trued-up (BEN-35) |
| LTA | s.10(5), block 2026–2029 | **Taxable** — the new regime withholds the exemption (§11.12); the journey is still recorded against the block (BEN-33) |
| Gratuity accrual | CoSS s.53, (15/26) formula on the add-back wage | `(15/26) × 3,33,333.33 × 6 = ₹11,53,846` provisioned; **not income this tax year**; flagged "payment ceiling: no notification located" (BEN-17) |

**The interaction the engine must not get wrong:** the new regime unlocks the 14% NPS *deduction*, and the employer's 14% contribution pushes the retiral aggregate over ₹7.5 lakh, creating a ₹51,600 taxable perquisite. Switching this employee to the *old regime* caps the 80CCD(2) *deduction* at 10% (₹1,44,000), so ₹57,600 more of the contribution becomes taxable salary — but it does **not** remove the breach, because the aggregate counts contributions made, not deductions allowed. The breach disappears only if the tenant's NPS policy itself sets the employer rate by regime (10% for old-regime employees), taking the aggregate to ₹7,44,000. The old regime also makes the LTA journey exempt and brings HRA and 80C into play. **[Reversed]** v0.3 said the regime switch alone eliminates the breach, conflating the deduction ceiling with the contribution. This is why regime election is a first-class branch across BEN-20, BEN-23 and BEN-40, not a payslip cosmetic.

**Acceptance for this example:** re-running the tax year with the regime toggled produces internally consistent annual tax computations and Form 123 statements — new regime (₹2,01,600 deduction, ₹51,600 breach, LTA taxable) vs old regime (₹1,44,000 deduction, the same ₹51,600 breach, LTA exempt on actual fare) — and, with a regime-conditional employer NPS rate, a third run with a ₹1,44,000 contribution and no breach. Every figure is traceable to a rule version, with zero model-generated numbers. The Form 138 Annexure II tie-out waits on the Q4 format (EV-046); Form 130 is TRACES-prepared (EV-048).

#### 11.11.1 The same employee's FBP, meal and gift year — the annual golden case

§11.11 ties the retiral stack together; this ties the flexi side together for the same employee (new regime, Tax Year 2026-27), through the feed (§11.9.5) to the year's perquisite totals. It is a golden case for the §22.8 corpus: a change to the meal or gift rule version, to any §11.9 convention or to the feed must reproduce it exactly or explain the difference. Attendance is illustrative; `meals_per_working_day` = 1 and the other conventions are at their defaults; the vouchers are attested (BEN-62).

**Meal vouchers — ₹4,400 loaded each month (₹52,800 declared), valued month by month (M6, period pooling).**

| Month | Eligible meals *E* | Ceiling *E* × ₹200 | Issued | Exempt | Taxable |
| --- | --- | --- | --- | --- | --- |
| Apr 2026 | 21 | ₹4,200 | ₹4,400 | ₹4,200 | ₹200 |
| May | 22 | ₹4,400 | ₹4,400 | ₹4,400 | ₹0 |
| Jun | 20 | ₹4,000 | ₹4,400 | ₹4,000 | ₹400 |
| Jul | 22 | ₹4,400 | ₹4,400 | ₹4,400 | ₹0 |
| Aug | 19 | ₹3,800 | ₹4,400 | ₹3,800 | ₹600 |
| Sep | 17 | ₹3,400 | ₹4,400 | ₹3,400 | ₹1,000 |
| Oct | 20 | ₹4,000 | ₹4,400 | ₹4,000 | ₹400 |
| Nov | 18 | ₹3,600 | ₹4,400 | ₹3,600 | ₹800 |
| Dec | 16 | ₹3,200 | ₹4,400 | ₹3,200 | ₹1,200 |
| Jan 2027 | 21 | ₹4,200 | ₹4,400 | ₹4,200 | ₹200 |
| Feb | 20 | ₹4,000 | ₹4,400 | ₹4,000 | ₹400 |
| Mar | 22 | ₹4,400 | ₹4,400 | ₹4,400 | ₹0 |
| **Year** | **238** | **₹47,600** | **₹52,800** | **₹47,600** | **₹5,200** |

Because no month's ceiling exceeds its ₹4,400 load, tax-year pooling would give the same ₹47,600 here; it would differ only for a tenant whose load varied month to month (BEN-76).

**Gifts (§11.9.2; whole mode, strict boundary).** August: a ₹5,000 voucher (*G* = ₹5,000). November: a ₹6,000 voucher (*G* = ₹11,000). March: a ₹5,000 gift in kind (*G* = ₹16,000, above ₹15,000). The whole ₹16,000 becomes a perquisite in March — ₹1,000 under excess mode. With only the March run left, §08's projection has no later month to spread the tax over: a late-year crossing lands in one payslip, which is why the employee statement shows the running aggregate against the threshold all year (§11.9.3).

**Telephone (₹36,000 declared).** The new regime leaves `new_regime_exempt` unset for the head, so the line is `taxable_by_regime` (D1): ₹3,000 a month, ₹36,000 for the year, all taxable, whatever bills are approved. Once B9 confirms the head for the new regime, the year re-values against approved proofs.

**LTA (₹80,000 declared, one journey).** Taxable under the new regime (§11.12); the journey is still recorded against the 2026–2029 block (BEN-33).

**Parental top-up.** ₹1,500 a month on the insurer's schedule, employer-paid in full: ₹18,000 for the year (PR2; §11.6.3).

**The year's perquisite and taxable totals from the flexi and insurance side.**

| Item | Taxable for the year | Where it lands |
| --- | --- | --- |
| Meal vouchers above the ceiling | ₹5,200 | Perquisite — Form 123 |
| Gifts | ₹16,000 (whole) or ₹1,000 (excess) | Perquisite — Form 123 |
| Parental top-up | ₹18,000 | Perquisite — Form 123 |
| Telephone | ₹36,000 | Taxable salary — not a perquisite |
| LTA | ₹80,000 | Taxable salary — not a perquisite |
| **Form 123 perquisite total (flexi and insurance), whole mode** | **₹39,200** | Plus the ₹51,600 retiral-cap breach of §11.11: ₹90,800 |

**Acceptance for this example:** the feed holds twelve meal inputs, one March gift input, twelve top-up inputs and the telephone and LTA salary lines; the sum of the year's latest perquisite inputs is ₹39,200 (whole mode) or ₹24,200 (excess mode) before the retiral breach; changing `meals_per_working_day` to 2 with the loads unchanged moves the meal taxable figure to ₹0 for every month, since each ceiling then exceeds ₹4,400; and every figure traces to a rule version and a source (Q5).

---

### 11.12 Old regime vs new regime — the benefits interaction matrix

Regime election changes which benefits are worth declaring, and the engine must present the *correct* menu per regime rather than offer exemptions the elected regime disallows. This is a common source of mis-declaration in Indian payroll products.

| Benefit / exemption | Old regime | New regime (default from FY2023-24) | Engine behaviour |
| --- | --- | --- | --- |
| 80CCD(2) employer NPS | Deductible, up to 10% basic+DA | Deductible, up to **14%** basic+DA | Rate branches on regime (BEN-20) |
| 80CCD(1B) own NPS ₹50,000 | Available | **Not available** | Hidden from declaration UI under new regime |
| 80C (VPF, own contributions, etc.); s.123 from Tax Year 2026-27 | Available (₹1.5 L; s.123 at ₹1,50,000 — r3/02) | **Not available** (1961-Act position, carried; s.123's regime scope — B9) | VPF still recorded for retiral, but no 80C / s.123 deduction shown |
| HRA exemption (s.10(13A)) | Available | **Not available** | Interacts with FBP restructuring; §08 owns HRA |
| LTA (s.10(5)) | Available | **Not available** | Old regime only; block-year usage tracked for everyone (BEN-33). **[Reversed]** v0.3 marked it available in both — the new regime withholds s.10(5) exactly as it withholds s.10(13A) |
| Meal vouchers / premises meals | Available (with conditions, BEN-62) | **From Tax Year 2026-27 only** — the blocking proviso was not carried into the 2026 Rules (Taxmann via r2/02; counsel to confirm) | Regime- and period-conditional; 1-Apr-2026 cap applies (BEN-30) |
| Gift / voucher nil-value threshold | Available | Available as v0.3 recorded it — not re-verified (B9) | `new_regime_exempt` parameter; 1-Apr-2026 threshold applies (BEN-63) |
| Telephone/internet, books & periodicals, uniform | Available | **Not re-verified** for the new regime (B9) | `new_regime_exempt` defaults to false — the direction that cannot under-deduct — until §20 confirms per head; proof-driven under the old regime (BEN-32) |
| Children's education allowance; transport allowance (1 April 2026 values — §11.9 menu) | Conditions not captured (B9) | **Not captured** (B9) | Both heads value as taxable in either regime until B9 fills their conditions and `new_regime_exempt` (§11.9.4) |
| Standard deduction | ₹50,000 | **₹75,000** (raised, FY2024-25) | §08; 2025-Act figure for Tax Year 2026-27 not verified here (B9) |
| ₹7.5 L retiral cap (s.17(2)(vii)) | Applies | Applies | Regime-independent: it counts contributions made, so the old regime's lower 80CCD(2) ceiling does not reduce it (§11.11) |
| Gratuity / EDLI (statutory) | Exempt per s.10(10) / s.10 | Same | Regime-independent (BEN-17/18) |

**[Verified]** the new-regime slab tables for AY 2026-27 as the ITD portal publishes them (r1/06); the new regime's default status is long-established but was read from vendor compliance content, not a CBDT circular (r1/06). **[Hypothesis]** — carried, not re-captured — for periods to 31 March 2026: the new-regime disallowances, the 14%/10% NPS split and the ₹75,000 standard deduction (§06 parameter `tds.standard_deduction.<regime>`, §06.13) follow the 1961 Act as amended by the Finance (No.2) Act 2024 (Source: 1961 Act s.80CCD, s.10(13A), s.16(ia), Chapter VI-A; Finance (No.2) Act 2024). The 2025-Act position for each row is routed to §20 (B9); every row is a per-regime, effective-dated rule object, so a correction is a data change, not a release. **The engine requirement:** the FBP declaration UI and the deduction computation must be regime-conditional — offering an 80CCD(1B) or HRA exemption to a new-regime employee is a defect, because it produces a declaration the engine will then have to reverse at year-end true-up (BEN-35), surprising the employee with recovered TDS.

**Mid-year regime switch edge case.** An employee may change regime intention during the year. When the employer-side TDS may follow a change is **not** settled here: it is the §08 parameter `tds.regime_switch_window` (FR-PAY-503), whose only captured value is one vendor's product rule — a switch only before the tax year's first payroll while the declaration is unlocked (Zoho documentation, r3/02 finding 22) — not a statutory one; the legal position is routed to §20 (V-20). **[Reversed]** v0.3 said the employer's TDS "can be revised once during the year per CBDT circular practice"; no research round located that practice. Whatever the window, when a switch is accepted the engine must (a) snapshot `regime_at_submit` on each declaration (§11.2), (b) re-value the full tax year on a switch — including the benefits rows that branch on regime: the 80CCD(2) ceiling (BEN-20), LTA (BEN-33), the meal and other FBP heads (`new_regime_exempt`, BEN-62) — and (c) true-up TDS across the remaining runs — never carry a stale regime silently. A switch request outside the window is recorded and surfaced to the operator, never silently dropped. The regime election is part of the engine's evaluation context (Part E-3; §15.4).

---

### 11.13 Partner integration surface

The partner surface is designed to one principle inherited directly from §05 (§05.5 item 18; §05.13): **build the surface, take no money movement.** Every integration is read/write of *enrollment and instruction data* — never premium, never contribution funds, never card float. This keeps v1 on the software side of the line Zaggle's own filings draw — software 5.3% of net revenue, the rest money movement at 9.9% whole-company adjusted EBITDA (research r2/02) — and off the money-movement side. The PRD claims no gross-margin figure for its own software line: inference is the smallest of four COGS lines, and the dominant one, supervised filing, scales per registration and is unsized (EV-088; §13). **[Reversed]** v0.3 placed v1 on "the ~95%-gross-margin software side" — a margin Zaggle's management states for software it acquires, never a measurement of ours (K-02; EV-K13).

<!-- DIAGRAM: benefits-attach-surface-map -->

| Partner class | Representative parties | What v1 exchanges | What v1 explicitly does NOT do |
| --- | --- | --- | --- |
| **Insurer / TPA / broker** | ICICI Lombard, Star Health, and broker-admins (Plum, Onsurity, Loop, Nova) — *illustrative, not endorsements* | Endorsement batches (add/delete/modify), census reconciliation import | Collect/pay premium, adjudicate claims, account broker commission |
| **NPS CRA / POP** | Protean eGov, KFintech; POP intermediary (identities carried — B11) | Subscriber Contribution File (SCF) artefact for the employer's upload (layout and channel per B11), PRAN status, ack references | Become a POP, take POP fees, hold contribution funds |
| **Card issuer / PPI** | Zaggle, Pluxee (ex-Sodexo), Happay — *deferred* | **Nothing in v1** — `wallet_config.provider_ref` is a null hook | Issue cards, earn interchange, hold float |
| **Superannuation trustee / insurer** | LIC, HDFC Life group superannuation | Contribution instruction file, member roster | Hold or invest funds |
| **EPFO (EDLI/EPF)** | EPFO Unified Portal — an attended portal, not an API | Nomination data, and the ECR artefact §08 generates, submitted through the attended flow under the employer's written authority (§22; EV-035, EV-036); the employer's liability stays non-delegable, and the legality of acting on its credentials is under counsel review (Part D-17, §23) | Submit by API (we are not aware of any EPFO filing API as of September 2026) or by unattended automation (the EPFO login is interactive, with CAPTCHA — K-13, EV-K24, EV-030); any new money rail beyond the statutory EPF challan |

**The abstraction: a partner adapter, exactly like the model router.** The PRD already requires "at least three interchangeable backends" for the model router (§13.5) and residency (§17.7). Benefits partners get the same treatment — a thin adapter interface so a tenant's insurer or CRA can be swapped without a redesign, and so the *core data model is partner-agnostic*.

| ID | Requirement | Priority | Acceptance criterion |
| --- | --- | --- | --- |
| **BEN-50** | Define a partner-adapter interface per partner class (insurer/TPA, CRA, superannuation), so a specific partner is configuration, not a code fork. | P1 | Configuring a second insurer for a second policy routes that policy's endorsements through the same interface with no core-model change. |
| **BEN-51** | All partner exchanges are file/API artefacts recorded as append-only events with request payload, response, and ack reference. | R2 · C-38 | Every SCF and endorsement batch is replayable from the event log; a dispute reconstructs exactly what was sent and when. |
| **BEN-52** | No partner integration is on the money-movement path; premium/contribution funds move employer↔partner directly, outside the product. | R2 · C-38 | A security/architecture review confirms no code path in v1 initiates a debit/credit, holds float, or books interchange. (This is a gate, not a feature.) |
| **BEN-53** | Partner integrations degrade gracefully: a partner outage queues artefacts for retry and never blocks the payroll run or the perquisite computation. | R2 · C-38 | Simulating a CRA outage during a pay run completes payroll and perquisite valuation; the SCF queues and retries; no payslip is delayed. |
| **BEN-54** | Expose benefits enrollment/endorsement as ACL-inheriting read tools and idempotent, audited, approval-gated write tools on the MCP server. | P1 | The MCP read tool returns only benefits data the calling user may see; a write tool (e.g., add-dependant) is idempotent, audited, and requires the configured approval before an endorsement is sent. Mirrors the §12.7 MCP read/write split. |
| **BEN-55** | Endorsement and SCF file formats are per-partner adapter outputs validated against a schema before send; a schema failure is an exception, never a silent malformed send. | P1 | Generating an SCF that fails CRA schema validation is held in the exceptions queue with the failing field cited; a valid file passes with a stored ack. |

**Data residency applies to benefits data too — on the constraints that are live, not on a DPDP category.** India neither mandates general data localisation nor leaves it unconstrained (K-08; EV-K19). DPDP's cross-border regime is a negative list that is empty and not in force (K-08; commencement per EV-058), and DPDP has no sensitive category (EV-059). What binds today: SPDI r.7 restricts cross-border transfer of sensitive personal data — which, for benefits, means a dependant's disability flag (health data, r.3(iii)) and any financial information (EV-060); CERT-In requires 180 days of ICT logs kept within India and six-hour incident reporting (EV-062); and tenants regulated by RBI, SEBI or IRDAI bring their own overlays (EV-085, EV-086, EV-087; §17). Aadhaar tokens resolve only inside the separate token store (FR-CHR-099); whether hosting it outside India is lawful is a counsel question (Part D-15). **[Reversed]** v0.3 grounded this paragraph in "sensitive personal data under DPDP" (K-06; EV-K17).

#### 11.13.1 The canonical endorsement line — what every insurer adapter maps from

Whether insurers accept a standard endorsement file or need bespoke mapping is unknown (B3), so the product fixes its own canonical line and lets each adapter (BEN-50) map it to one insurer's census. `census_payload` (§11.2.2) is the canonical line restricted to the fields in that policy's `census_field_set`.

| Canonical field | Source | Note |
| --- | --- | --- |
| `member_employee_code` | The employment | Stable for the life of the policy |
| `member_name`, `member_dob`, `member_gender` | §07's master | The name form the insurer needs; never a match key |
| `relation_to_member` | `dependant.relation`, or "self" | — |
| `person_name`, `person_dob`, `person_gender` | `dependant` | Dependant lines only |
| `insurer_member_ref` | `benefit_enrollment` or `dependant_coverage` | Once the insurer has issued one |
| `policy_number` | `benefit_scheme` | — |
| `endorsement_type`, `effective_date`, `reason_code` | The line | Canonical enums (§11.2.2) |
| `sum_insured` | Enrollment or coverage | Resolved per §11.6.5 |
| `grade` | The employment | Sent only where the grid is grade-based |
| `salary_base_value` | Per `sum_insured_salary_base` | C1 — sent only where the policy's sum insured is a salary multiple and the field is in `census_field_set` |
| `corrects_line_ref` | The line | Correction lines only |

Three fields are never canonical and no adapter may add them. **Aadhaar**: it resolves only inside the token store for recorded purposes, an insurer census is not one, and nothing is ever conditioned on it (FR-CHR-099, FR-CHR-101; Part D-10); an insurer that asks for it asks the employee. **The disability flag**: C1 health data held for a consented purpose (BEN-03), not for underwriting. **Bank details**: no premium moves through the product (BEN-52). Each adapter version ships with fixtures — canonical lines in, the insurer's expected file out — and a change that alters any fixture's output is a new adapter version, recorded on every batch it renders (`adapter_version`, §11.2.2).

**The acknowledgement import (EB4).** The adapter parses whatever the insurer returns into canonical acknowledgement rows; the product then matches them to lines.

| Canonical acknowledgement field | Meaning |
| --- | --- |
| `ack_ref` | The insurer's reference for the acknowledgement as a whole |
| `line_key` | Our `endorsement_id` where the insurer echoes it; otherwise the composite (employee code, relation, date of birth, endorsement type, effective date) |
| `outcome` | accepted or rejected |
| `effective_date_confirmed` | The date the insurer applies — may differ from the date requested (CV4) |
| `insurer_member_ref` | The member reference the insurer issues or confirms |
| `premium_delta`, `premium_delta_ref` | The premium change the insurer states for the line, if any (BEN-71) |
| `reject_text` | The insurer's reason, stored as received |

Matching is exact: on the echoed `endorsement_id` where present, else on the full composite, and only against lines in state `sent`. A row that matches no line, or more than one, raises BV-36 and changes nothing; a row matching a line already acknowledged is recorded as a duplicate and ignored. An acknowledgement file is an E-class document like the batch file; its parsed rows are R-class records.

*Example.* A seven-line batch is acknowledged in a file of seven rows. Five echo our `endorsement_id` and match directly; one carries no id but its composite fits exactly one sent line and matches it; the last carries no id and its composite — two children of one member with the same date of birth — fits two sent lines. Six lines move (EL6 or EL7); the seventh row raises BV-36 and both candidate lines stay `sent` until HR admin resolves it against the insurer.

#### 11.13.2 The assistant on the benefits surface

The assistant is §12's; this fixes its reach on benefits objects. The rails are §12's and apply unchanged: the redaction chokepoint on every outbound call (§12.8.5), a per-employee disclosure record at every call site — dependants and nominees are subjects in their own right (§12.8.8) — and the statutory-figure interceptor (§12.8.1).

| Task | Posture | Why |
| --- | --- | --- |
| Explain a meal, gift, FBP or premium figure to the employee | Allowed — from the perquisite input's `valuation_basis` and `source_refs`, never by recomputing | Figures are the engine's (§11.2 design rules; §12.1) |
| Summarise a declaration against its proofs, or an exceptions queue, for HR | Allowed — read-only, within the caller's matrix cells (§11.15.1; BEN-54) | §12's reconcile task class: findings, a human decides (§12.4) |
| Draft a proof query or a rejection reason | Draft only; the verifier edits and sends | Human-in-the-loop for decisions that move tax (§12.5) |
| Read a bill image | Whether a model reads bill images at all is §12's design decision (§12.8.5); if it does, the output is a draft the employee confirms and the verifier decides | Bills carry names and account numbers |
| Attest an instrument, decide a proof, confirm coverage, set a convention | Never | Each is a human act with a checker (AT1–AT4, P2–P4, CV1, §11.15.1) |
| Send a dependant's disability data, an Aadhaar number or bank details to a model | Never — default-deny at the chokepoint (Part E-7) | C1 data; SPDI r.3 (EV-060) |

| ID | Given | When | Then |
| --- | --- | --- | --- |
| TB-AI01 | Worked example 1 of §11.9.1 | The employee asks why ₹1,000 of meal value was taxed | The answer cites *E* = 17, the convention and the ₹200 cap from the input's `valuation_basis`; the interceptor finds no figure the input does not hold (§12.8.1) |
| TB-AI02 | A manager | The manager asks the assistant for a reportee's dependants or proofs | Refusal, not a masked value (§11.15.1) |
| TB-AI03 | A proof pending | HR asks the assistant to approve it | No write tool exists for P2–P4; the assistant offers a draft note for the verifier |
| TB-AI04 | A dependant record with a disability flag in the caller's scope | Any call builds a prompt from it | The flag never leaves the chokepoint; the disclosure record names the dependant as a subject (§12.8.8) |

---

### 11.14 What v1 does NOT build — the deferred-monetisation guardrails

Stated explicitly so no later deck resurrects it, in the style of the §20 non-goals. Each is deferred to v2 and gated on the §20 validation programme.

| Deferred item | Why deferred (not abandoned) | Gate to revisit |
| --- | --- | --- |
| **Card issuance / interchange / float** | This is the money-movement business Zaggle runs at 9.9% whole-company adjusted EBITDA, with incentives and cashback equal to 67% of program-fee revenue (an upper bound — that line also funds its rewards business); winning it means an incentive war against a listed incumbent with 19 bank partners and 50 mn+ cards, using our own balance sheet for float. Wrong side of every ratio. **[Verified]** (Source: research r2/02; §20.1 NG-2.) | Never on interchange economics as framed; only as a priced software feature if §20 shows willingness to pay for the *management* of a card, not the float. |
| **Broker override / commission revenue** | Rests on a ₹2,233-per-life average group premium, with commission negotiated inside the IRDAI EOM envelope (§11.6); unvalidated. **[Hypothesis]** | §11.19 B8 feeding §20.6; model at zero until then. |
| **NPS POP fees** | Requires becoming a POP; small per-contribution fee; unvalidated and off the software line. No research round has covered PFRDA POP economics (r2/02 open question). **[Hypothesis]** | §11.19 B4 feeding §20.6; PFRDA POP economics to be quoted. |
| **Any blended "PEPM + attach" pricing** | The PRD forbids blending software PEPM and attach revenue. **[Verified]** (Source: §18.5; research r2/02.) | Never blended; two separate lines always. |
| **Claims adjudication / embedded-insurance purchase** | Risk-carrying and regulated; not our business. | Out of scope indefinitely; we are the census/endorsement SoR. |
| **Gratuity fund investment / actuarial valuation service** | We accrue and provision the liability; investing the fund or selling actuarial certification is a regulated adjacency. | Out of scope; integrate with the tenant's actuary/trustee, do not become one. |

**Banned figures carried forward** (from §20, restated so they cannot re-enter via this section): the **₹161/user/month** Zaggle attach (contaminated denominator), the **₹150–500 PEPM at 1.5–5% take rate** band (borrowed take rate), and the **₹10,000–25,000 per-employee** group-health premium band (a vendor-blog figure implying 4.4–11.2× IRDAI's ₹2,233-per-life commercial group average; the true employer-GMC figure lies between and is unmeasured — r2/02). **[Killed]** Any of these reappearing in a model makes that model defective (Source: §20.4).

#### 11.14.1 The attach revenue line — modelled separately, never blended

**[Verified]** the rule (§18.5; r2/02): software PEPM and attach revenue are two lines that are never blended. The research gives the reason in one company's numbers. At Zaggle, software is 5.3% of net revenue and 2.4% of gross — blended, the software line vanishes inside money movement — and attach revenue is not attach profit: it returns 67% of program-fee revenue as incentives and cashback (an upper bound, since that line also funds its rewards business) and earns 9.9% whole-company adjusted EBITDA on gross revenue (r2/02). Blending flatters both lines at once: it lifts apparent revenue per employee while hiding that the attach share is thinner, more competed and more capital-hungry. §14 enforces the rule in the schema (D9); §19 enforces it in the metrics (§19.6, §19.13). This subsection specifies the model's line structure, the anchors a line may use, the prohibitions as checks, and what v1 already records for each future unit.

**Line structure.** Line 1 is software PEPM, owned by §18 (the two-anchor price structure, EV-027). Line 2 is attach, one sub-line per attach product, each in its own unit — per employee only where the product genuinely is.

| Attach product | Revenue unit | v1 value | Status | Validation item | Why this unit |
| --- | --- | --- | --- | --- | --- |
| Group-health broker override (GMC) | Per covered life per month, from the reconciled census | 0 | **[Hypothesis]** — unvalidated | B8; B1 for any software fee | Premium and commission attach to lives, and IRDAI counts dependants as lives (r2/02) |
| GPA and GTL broker override | Per covered life per month | 0 | **[Hypothesis]** | B8 | As above |
| NPS POP fee | Per contribution instruction | 0 | **[Hypothesis]** — no research round covered PFRDA POP economics (r2/00) | B4; B11 | The fee rides contributions, not heads |
| Card interchange on meal and gift wallets | Per rupee loaded | 0 | Out of scope (§11.14). No India take rate exists — Pluxee's 5.0% is a global Employee Benefits figure from its H1 FY2026 results that must not be used as India's (r2/02) | Never on interchange economics as framed (§11.14) | Interchange is a share of spend |
| Float on prefunded balances | Per rupee-day held | 0 | Out of scope — the product never holds float (BEN-52; §20.1 NG-21) | — | — |
| Earned wage access referral | Per referral | ₹0 to the employer | **[Verified]** on the provider's own site: the employer pays nothing; any fee is the employee's (Refyne — site read in the r2 capture, 2026, product not executed; r2/02) | §20.1 NG-11 | Monetised on the employee, so it adds no software ARPU |
| Salary-account referral | Per account opened | 0 | Unquantified — no per-account value was found (r2/02) | — | Per account |

**`attach_line` — the model object.** Our own finance model, not a tenant object: classification C4, B-class, owned by the finance lead.

| Field | Meaning | Rule |
| --- | --- | --- |
| `line_id`, `attach_product`, `revenue_unit` | Identity and unit | The unit comes from the table above |
| `value_low`, `value_high` | The range per unit | Both required; equal only when the line is zero or validated — a point estimate is refused (AX4) |
| `status` | unverified, validated, killed | In v1 every line is zero or unverified |
| `evidence_refs` | EV rows or research findings | A line without evidence stays at zero |
| `cost_lines` | The line's own cost of revenue — partner give-back, incentives, servicing | Never absorbed into the software cost stack (§13.1; EV-088) |
| `kill_criterion`, `validation_item`, `owner` | §20's discipline | All three required |
| `effective_from` | Version | New assumptions are new versions; history stays queryable |

**The anchors a line may use, and how.**

| Anchor | Figure | Status | Permitted use |
| --- | --- | --- | --- |
| IRDAI commercial group health, FY25 | ₹61,435 Cr of premium across 275 mn lives: ₹2,233 per life per year, ₹186 per life per month | **[Verified]** — IRDAI Annual Report 2024-25, Table I.26 (r2/02) | The only government anchor for premium per life. Employer GMC per employee sits above it, by an unmeasured amount |
| Non-life industry gross commission | About 15.3% of direct premium, all lines | **[Verified]** (r2/02) | An upper bound for group health, never a midpoint |
| How commission is set | Negotiated inside the IRDAI expenses-of-management envelope (EOM Regulations 2024, Reg 6), not tariffed | **[Verified]** (r2/02) | No line may assume a tariff rate |
| Earned wage access | ₹0 to the employer | **[Verified]** — the provider's own site (r2/02) | The EWA line is zero by construction |
| Card take rate | None for India | Pluxee's global figure is barred from India use (r2/02) | No card line may carry a rate |
| Banned figures | ₹161/user/month; ₹150–500 PEPM at 1.5–5%; ₹10,000–25,000 per employee per year | **[Killed]** (§20.4) | A line using any of them is defective |

**Worked example — what blending does to a 100-employee tenant.** Software at ₹150 PEPM — the top of the ₹80–150 anchor inside the ₹80–200 clearing band (EV-027; K-09) — is ₹15,000 a month. Now suppose a v2 GMC broker line. On IRDAI's ₹2,233 per life per year, commission at 5%, 10% or 15% is ₹9.30, ₹18.61 or ₹27.91 per covered life per month (r2/02 rounds these to ₹9.3, ₹18.6 and ₹27.9). Take covered lives as 100 — a floor, since dependants are lives too; the real count comes from the reconciled census (BEN-91). The line is then ₹930, ₹1,861 or ₹2,791 a month.

- **Reported as two lines:** software ₹15,000 a month (₹150 PEPM, the price the customer pays); attach GMC ₹930–₹2,791 a month, *unverified*, its top end resting on an upper-bound commission (B8).
- **Blended:** (₹15,000 + ₹930) ÷ 100 = ₹159.30 up to (₹15,000 + ₹2,791) ÷ 100 = ₹177.91 "PEPM". That figure reads as a software price above the ₹150 anchor that no customer was charged; it folds an upper-bound commission into a number that looks measured; and it hides that the attach part's profit is a fraction of its revenue. A board reading ₹177.91 PEPM would draw a pricing conclusion from a distribution assumption.

**The prohibitions, each enforced as a check.**

| # | Prohibition | Enforced by |
| --- | --- | --- |
| AX1 | No metric combines the two lines per employee — "PEPM including attach", blended ARPU | §19.14's metric-definition register refuses an entry whose numerator sums both line families; §19.13 already bans GMV and money moved |
| AX2 | No netting: a partner commission is never credited against a customer's subscription invoice | The finance export keeps two account families; an invoice line referencing an attach account is refused |
| AX3 | No hidden subsidy: a software discount funded by attach revenue is recorded as the software price actually charged plus an attach cost, never as a lower list price | The finance export; the price card never shows attach (§18.5) |
| AX4 | No point estimates, and no line without evidence, in a forecast | `attach_line` validation |
| AX5 | No headcount proxies: a per-life line counts confirmed covered lives, a per-contribution line counts contribution instructions, a per-rupee line counts wallet loads — never the employee count | BEN-91 |
| AX6 | No wallet-level forecast without the meals-per-day sensitivity (one, two and three meals a day — r2/02) | Model review |
| AX7 | No attach event touches money-of-record: attach revenue events never reference a `PayrollResult` or `Filing` | §14 D9; AC-DM-17 |

**What v1 already records for each future unit — the option value, made concrete.**

| Unit | v1 source | From | Note |
| --- | --- | --- | --- |
| Covered lives per scheme per month | `dependant_coverage` and `benefit_enrollment`, reconciled against the insurer's census (BEN-72) | C-38 (R2) | Confirmed lives only; requested lines do not count |
| Contributions per CRA per month | `contribution_instruction` | C-38 | Recorded even while the SCF generator is fenced on B11 |
| Rupees loaded per wallet per month | `wallet_transaction` issues | C-38 | Recorded, not issued, while `provider_ref` is null |
| Referrals | Not recorded in v1 | — | §20.1 NG-11: data hooks for a licensed partner, nothing more |

**The attach revenue event — specified now, used only after the gate.** No attach revenue exists in v1, but the event that would record it is fixed here so AX2, AX5 and AX7 are testable against a schema rather than a promise. `attach_revenue_event` — R-class, our own finance ledger, never a tenant table:

| Field | Meaning | Rule |
| --- | --- | --- |
| `event_id`, `attach_product`, `counterparty` | Identity; the partner that pays | The product is one of `attach_line`'s |
| `tenant_id`, `period` | Whose business, which month | — |
| `unit_count`, `unit_source_ref` | Units in the line's own unit, and the v1 records they were counted from | Confirmed lives, contribution instructions or wallet loads (AX5) |
| `amount`, `evidence_ref` | Money received or receivable; the partner's statement | No amount without evidence |
| `account_family` | Always the attach family | Never the subscription family (AX2) |
| Forbidden references | — | No field may reference a `PayrollResult`, `Filing`, payslip or invoice line (AX7; D9) |

| ID | Requirement | Priority | Acceptance criterion |
| --- | --- | --- | --- |
| **BEN-89** | Hold each attach product as an `attach_line` with a unit, a range, evidence, its own cost lines, a kill criterion, a validation item and an owner; every line is zero or unverified in v1, and the EWA line is ₹0 to the employer. | P1 | A forecast that references a line with a single value, or with no evidence, is refused naming AX4; the v1 export shows every attach line at zero or unverified. |
| **BEN-90** | Keep the two lines apart in the finance export and the metric registry: separate account families, no netting of commissions against invoices, subsidies recorded as attach cost, and no metric that sums both lines per employee. | P1 | A metric-definition register entry for "revenue per employee" over both families is rejected (AX1); an invoice line pointing at an attach account is refused (AX2). |
| **BEN-91** | Compute every attach unit from the v1 records in the table above — confirmed covered lives, contribution instructions, wallet loads — never from employee count. | P1 | For a tenant of 100 employees with 230 confirmed covered lives under GMC, the per-life unit count is 230, not 100; lives on lines still `requested` are excluded. |

**Test scenarios.**

| ID | Given | When | Then | Covers |
| --- | --- | --- | --- | --- |
| TB-A01 | A GMC line with `value_low` only | A forecast references it | Refused (AX4) | BEN-89 |
| TB-A02 | A dashboard metric summing software and attach revenue over employees | It is saved | Refused (AX1) | BEN-90 |
| TB-A03 | A broker commission | It is posted against a customer invoice | Refused (AX2) | BEN-90 |
| TB-A04 | 100 employees, 230 confirmed lives, 12 requested | The per-life unit is computed | 230 | BEN-91 |
| TB-A05 | The EWA line | The v1 model is exported | ₹0 to the employer, marked verified | BEN-89 |
| TB-A06 | A wallet-level attach model at two meals a day only | It enters review | Returned for the one- and three-meal cases (AX6) | AX6 |
| TB-A07 | A proposed software fee for benefits administration | It is modelled | It enters Line 1 under §18.5, never an attach line | Gate table |

**The gate out of zero.** A line leaves zero only on the evidence below; until then no deck, forecast or price card may show it.

| Attach product | Evidence that lets the line leave zero | Decided by | What changes in the product |
| --- | --- | --- | --- |
| GMC, GPA and GTL broker override | B8 answered: broker quotes for the override split on 50-, 100- and 200-life books, or broker filings giving a realised rate for corporate group business (r2/02 names MCA filings as the unexplored source) | Finance lead, with the product owner | Nothing in v1; monetisation is a v2 decision under §11.14's gate |
| NPS POP fee | B4 answered from PFRDA's published POP commission structures — the clean government source r2/02 names — and B11's corporate-NPS surface captured | Finance lead | Nothing in v1; becoming a POP is out of scope (§11.14) |
| Card interchange and float | Never on interchange economics as framed; only a priced software fee for managing a card, if §20 shows willingness to pay (§11.14) | — | — |
| Earned wage access | None — the line is ₹0 to the employer by construction | — | — |
| A software fee for benefits administration | B1, through §20 V-07 | GTM lead | A software fee is Line 1, priced under §18.5 — never an attach line |

<!-- DIAGRAM: fr-benefits-two-line-revenue-model -->

---

### 11.15 Consolidated acceptance criteria & non-functional requirements

The section-level acceptance bar — what "benefits attach is done for v1" means:

1. **Every FR carrying a release tag above passes its stated acceptance criterion at that release** (§11.4.1), exercised end-to-end through the payroll engine, not in isolation.
2. **A benefit the engine can see is a benefit it taxes correctly.** For a synthetic tenant carrying GMC (with a paid parental top-up), corporate NPS at 14% under the new regime, superannuation, gratuity accrual, EDLI (with a GTL exemption path), and a full FBP menu straddling the 1-Apr-2026 boundary, Form 123 (ex-12BA) and the annual tax computation tie exactly to the sum of deterministically valued perquisites and deductions — with zero model-generated figures, and with every meal and gift line passing its condition checks (BEN-62, BEN-63). The Form 138 Annexure II tie-out is fenced until the Q4 format is released (EV-046); Form 130 is TRACES-prepared and never product-generated (EV-048). **[Verified]** anchor: §08.1 / §12.1 rules-first, LLM-last.
3. **No money moves.** A security/architecture review (BEN-52) confirms no v1 code path initiates a fund transfer, holds float, or books interchange/commission.
4. **Effective-dating round-trips.** A retro correction to a prior period recomputes every benefit perquisite against the plan/rule/wage-base version in force *for that period*; the EPF figure feeding the retiral cap still equals the approved returns bit-for-bit, and any post-payment correction appears as a dated diff row, never a rewrite (BEN-43).
5. **Partner-agnostic.** Swapping a tenant's insurer or CRA is configuration (BEN-50); the core data model does not change.
6. **Audit-complete.** Every enrollment change, endorsement and contribution instruction is replayable from an append-only log (BEN-05, BEN-51); an erased document or attribute replays as its tombstone (§11.2).
7. **Cross-year state is correct.** The Rule 3B accretion and the LTA block-year usage carry the right state across tax years (BEN-42, BEN-33); a fresh tax year does not reset either.
8. **K-19 holds at every release.** No configuration, import or operator entry produces an exempt meal line without a qualifying mode and valid attestations, or an exempt gift line once the aggregate fails the threshold test — from R1's operator entry (BEN-74) to C-38's engine (BEN-62, BEN-63, BEN-75 to BEN-81). Every §11.9.1 and §11.9.2 golden case passes against the published rule version.
9. **The history answers.** Q1–Q5 (§11.2.2) reproduce for any date inside retention, before and after later corrections (BEN-66), and every perquisite figure traces through the feed to its sources (BEN-88).
10. **The attach line is never blended.** The finance export and the metric-definition register reject every AX1–AX7 violation (BEN-89 to BEN-91).
11. **The FBP season runs end to end.** For one pay group, a cycle opens, locks, proofs are decided and lapse, the true-up month absorbs the shortfall and a leaver settles through F&F — worked examples 1 to 5 of §11.9.3 reproduce to the rupee (BEN-82 to BEN-87).
12. **A cutover resumes where the source stopped.** A mid-year import carries gift aggregates, coverage windows, endorsements in flight and the FBP cycle position, and ties to the source per head before go-live (BEN-95, BEN-96).
13. **The terminal benefits compute and settle.** Gratuity accrues per period on the §08 gratuity wage base with the vested and unvested split, re-bases on a revision, and settles at exit with the two-limb exemption and the prior-exemption declaration enforced; nomination routing produces a record per instrument and holds rather than decides (BEN-99 to BEN-101).
14. **The state does not drift.** INV-1 to INV-15 pass on their stated cadences for a synthetic tenant that has run a full tax year, and the three blocking invariants hold a run's approval when seeded with a violation (BEN-105).

Non-functional requirements specific to benefits:

| NFR | Requirement | Rationale |
| --- | --- | --- |
| **Sensitivity** | A dependant's disability flag is SPDI-sensitive health data, collected only after written consent; DOB and health-scheme membership are encrypted and role-gated; Aadhaar lives only in the token store; access is logged, with ICT logs kept in India for 180 days. | SPDI r.3(iii), r.5(1) (EV-060) — not a DPDP category (EV-059); CERT-In (EV-062; §17.6); FR-CHR-099/100. **[Verified]** |
| **Determinism** | 100% of perquisite and deduction figures are rules-engine output; the LLM may explain and draft but never compute. | §08.1 / §12.1 rules-first. **[Verified]** |
| **Effective-dating** | All benefit config (schemes, caps, tax rules, wallet limits, ceilings) is effective-dated and retrospectively recomputable. | §08 engine principle. **[Verified]** |
| **Resilience** | Partner-integration failures never block payroll or perquisite computation (BEN-53). | Payroll-run reliability is a product-wide requirement (§17). |
| **Isolation** | Benefits data is tenant-scoped; the MCP surface inherits ACLs (BEN-54). | §12.7 MCP read/write split; §15.3 multi-tenancy. |
| **Statefulness** | The retiral ledger persists cumulative excess and accretion across tax years; the LTA tracker persists block-year usage across tax years. | Rule 3B and Rule 2B are multi-year by construction (1962-Rules text carried, B9). **[Hypothesis]** |
| **Idempotency** | The perquisite feed emits the identical `input_id` and figures for identical sources; an endorsement resend is byte-identical to the first send. | Part E-3 purity; BEN-88, BEN-69 |
| **Tax-safe failure** | A benefits validation that concerns a tax condition never blocks the payroll run: it values the item as taxable and raises an exception, except the named blocking items (BV-14; §08 AC-106.4). | K-19; the default-direction rule (§11.9.1) |
| **Explainability** | Every benefits figure an employee sees resolves, in the statement, to its inputs, conventions and rule version (§11.9.3). | r3/02's self-explaining payslip; §11.9.5 rule 4 |

#### 11.15.1 Benefits objects in the permissions matrix

§07's permissions matrix (FR-CHR-105) lists no benefits object. This extension uses its codes and roles — **V** view (masked by default), **U** unmask (audited), **P** propose or make, **C** check or approve (four-eyes, never the maker of the same instance), **X** export, **—** no access — and inherits its four floors unchanged.

| Object | Employee (self) | Manager | HR admin (est.) | Payroll / finance | Compliance checker | CA (external) | Tenant super-admin |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Dependant facts — relation, name, date of birth, life events | V · P (via ESS) | — | V · P · approve per workflow | V | V | — | — |
| Dependant disability flag | V own · enter after written consent · withdraw | — | U on a recorded purpose, audited | — | U, audited | — | — |
| Coverage request (`dependant_coverage`) | P | — | P · approve per workflow | V | V | — | — |
| Scheme configuration — `coverage_config`, premium heads, adapter | — | — | P | P | **C** | V | P (entity level) |
| Endorsement batch — seal and send | — | — | P | V | **C** where the tenant configures a send checker | — | — |
| Census reconciliation — resolve a difference | — | — | P | V | **C** on accepted_with_reason | V | — |
| FBP declaration line | V own · P | — | V · P on the employee's behalf, with a reason | V | V | V (totals) | — |
| Declaration reopen after lock (D5) | — | — | P | **C** | — | — | — |
| Proof of spend — submit, withdraw, decide | P (submit, withdraw) | — | V | **C** (decide); a second **C** above `proof_checker_threshold` | **C** (second approver) | V (totals) | — |
| Proof reopen after a decision (P8) | — | — | — | P | **C** | — | — |
| Proof document (the bill) | V own · upload | — | V | V | V | — | — |
| Meal and gift attestations (AT1–AT4) | — | — | P | V | **C** | V | — |
| Meal and gift ledgers — issues and reversals | V own | — | P | P | **C** on reversals | V (totals) | — |
| Tenant tax conventions — meals per day, half-day, work-from-home, pooling, provisional policy | — | — | P | P | **C** | — | P |
| FBP cycle configuration and date moves (CY1, CY7) | — | — | P | **C** | — | — | P |
| R1 operator-entered perquisite value (BEN-74) | — | — | P | P | **C** | — | — |
| Perquisite inputs (§11.9.5) | V own, as payslip lines | — | V | V | V | V (totals) | — |

Four rules sit under this extension, beside §07's. (1) **Perquisite inputs have no make action** — they are derived, and a disagreement is fixed at a source (§07's rule 1). (2) **A manager sees no benefits object**: dependants, disability data, proofs and bills are not management information. (3) **The CA console sees totals, never dependants, bills or disability data** (FR-CHR-091). (4) **The vendor's filing operator (§22) has no benefits access**: no benefits object is a statutory filing in hand.

**Acceptance criteria (benefits permissions).**

- For every **C** cell above, a test proposes as one user and approves as the same user, then as a user holding both roles: both attempts are refused and logged, and the change stays without effect until a distinct checker approves (FR-CHR-105).
- A manager's request — screen, export, API call or assistant question — for a reportee's dependants, proofs or bills returns a refusal, not a masked value (§12).
- An HR admin who unmasks a dependant's disability flag records a purpose; the unmask is an audit event, and the value is never exported.
- A CA console user sees FBP and perquisite totals for assigned clients and no dependant, bill or disability data (FR-CHR-091).
- A tenant super-admin cannot widen any benefits cell past FR-CHR-105's floors; the save is rejected naming the floor.

#### 11.15.2 Validation and exception catalogue

Every refusal, hold and exception in this section has a code, a class and a resolver, so the exceptions queue, the audit log and the tests use one vocabulary. Classes: **Refuse** — the input is rejected at entry, citing the rule; **Hold** — an artefact waits in the exceptions queue and nothing is sent; **Tax-safe** — accepted, valued as taxable, exception raised, payroll never blocked (K-19's behaviour); **Task** — an operator task, blocking where marked (§08 FR-PAY-1004); **Review** — held for a named person's decision; **Flag** — shown, nothing held.

| Code | Trigger | Class | The message cites | Resolved by | FR |
| --- | --- | --- | --- | --- | --- |
| BV-01 | An FBP allocation above the head's cap | Refuse | The cap and its source — tenant or rule version | Employee | BEN-31 |
| BV-02 | A declaration line for a head whose exemption the elected regime disallows or leaves unset | Flag — accepted as a taxable allocation, the exemption hidden (E4) | The §11.12 row and `new_regime_exempt` | — | BEN-87, BEN-33 |
| BV-03 | Total FBP allocations above the structure's FBP budget | Refuse | The budget (§08 FR-PAY-501) | Employee | BEN-31 |
| BV-04 | A declaration outside the declaration or joiner window | Refuse | The window's dates | HR admin, through D5 | BEN-82 |
| BV-05 | A proof with no declaration line for the head | Refuse | — | Employee | BEN-84 |
| BV-06 | A proof without a document on a proof_required head, or with a non-positive amount | Refuse | `proof_required` | Employee | BEN-84 |
| BV-07 | A proof after proof lock | Refuse | `proof_lock_at`; the P8 route | Payroll/finance | BEN-84 |
| BV-08 | A rejection without a typed reason | Refuse | — | Payroll/finance | BEN-84 |
| BV-09 | A partial approval without a reason for the disallowed part | Refuse | — | Payroll/finance | BEN-84 |
| BV-10 | A verifier deciding their own claim | Refuse | The FR-CHR-105 floor | — | BEN-84 |
| BV-11 | A meal component with no `meal_delivery_mode` | Tax-safe | BEN-62 | HR admin | BEN-62 |
| BV-12 | A voucher issue without both attestations valid on the issue date | Tax-safe | The missing flag and its date | HR admin, then compliance checker (AT1) | BEN-62, BEN-77 |
| BV-13 | A premises meal without `premises_during_working_hours` | Tax-safe | — | As BV-12 | BEN-62 |
| BV-14 | A premises meal period without a cost per meal | Task — blocking | §08 AC-106.4 | Operator | BEN-78 |
| BV-15 | A premises meal with a recorded employee recovery | Review | `meal_recovery_treatment` unset (B9) | Operator | BEN-78 |
| BV-16 | An unattested gift instrument class | Tax-safe — valued as cash | — | HR admin, then compliance checker | BEN-79 |
| BV-17 | A gift reversal without evidence or a reason | Refuse | — | HR admin | BEN-81 |
| BV-18 | A tea or snacks provision recorded for a Tax Year 2026-27 period | Review | `tea_snacks_treatment` unset (B9) | Operator | BEN-62 |
| BV-19 | A dependant count above the family definition | Refuse | `max_spouses` or `max_children`, with the version | Employee or HR admin | BEN-03 |
| BV-20 | An addition outside the addition window | Refuse — flagged for the renewal census | The frozen window evaluation | — | BEN-12, BEN-65 |
| BV-21 | A child over `child_age_limit` at addition | Refuse | — | — | BEN-08 |
| BV-22 | Parents and parents-in-law together where the policy makes them exclusive | Refuse | `parents_or_in_laws_exclusive` | — | BEN-03 |
| BV-23 | A disability flag without written consent | Refuse — the field only; coverage proceeds | SPDI r.5(1) (EV-060); FR-CHR-100 | Employee, through the consent flow | BEN-03 |
| BV-24 | A probable same-person dependant under two employees | Review | Both records | HR admin | BEN-67 |
| BV-25 | An endorsement line failing the adapter's schema | Hold | The failing field | HR admin | BEN-55 |
| BV-26 | A sent line unacknowledged past its SLA | Hold — exception | `endorsement_ack_sla_days` | HR admin | BEN-11 |
| BV-27 | A line rejected by the insurer | Hold — exception | The insurer's reject text | HR admin, through BEN-70 | BEN-69 |
| BV-28 | Unexplained census differences above tolerance | Hold — exception | `census_drift_tolerance` | HR admin | BEN-72 |
| BV-29 | Nominee shares not summing to 100% for a scheme | Refuse | — | Employee | BEN-04 |
| BV-30 | A minor nominee without a guardian | Refuse | — | Employee | BEN-04 |
| BV-31 | An FBP cycle or a policy missing a parameter a rule needs | Refuse — the cycle stays DRAFT, or the action is refused | The parameter's name | HR admin | BEN-68, BEN-82 |
| BV-32 | An R1 operator entry claiming an exemption its meal or gift mode does not allow | Refuse | BEN-62 or BEN-63 | Operator | BEN-74 |
| BV-33 | A benefits figure written to a run by any route but the feed | Refuse and log | BEN-88 | — | BEN-88 |
| BV-34 | A proof repeating an earlier proof's vendor, bill number, bill date and amount for the same employee | Review | The earlier proof | Payroll/finance | BEN-84 |
| BV-35 | A meal component valued while `meals_per_working_day` is unset | Tax-safe | The convention is unset | HR admin, then compliance checker | BEN-75 |
| BV-36 | An insurer acknowledgement row that matches no sent line, or more than one | Hold — exception | The row and the candidate lines | HR admin | BEN-69 |
| BV-37 | A `true_up_month` outside the cycle's tax year | Refuse | The tax year's last month | HR admin | BEN-82 |

**The exceptions queue itself — `benefits_exception`.** An R-class record per raised item: `exception_id`, `code`, `subject_ref` (employee, dependant, line or batch), `head`, `period`, `value_affected` (the amount now valued as taxable, where there is one), `raised_at`, `resolver_role`, `state`, `resolved_by`, `resolved_at`, `resolution_note`. States move `open → resolved` when the condition is fixed — a Tax-safe item re-values in the next open run through the feed — or `open → waived` only where the class allows it (Review), with a reason and a distinct checker. Refusals are logged as events (§11.2.5), not queued: nothing was accepted to resolve.

#### 11.15.3 Notifications

The benefits calendar only works if people hear about it in time. Notifications ride §07's multi-channel layer (FR-CHR-088): in-app, e-mail, push and WhatsApp, degrading when a channel is rate-limited, and never silently dropped — an undelivered notice becomes an in-app task. The lead times are tenant settings with no product default.

| Event | Recipient | Content | When |
| --- | --- | --- | --- |
| A cycle opens (CY1) | Employees in the pay group | The heads offered, each with its regime treatment; the close date | At `declaration_open_at` |
| The declaration window is about to close | Employees with a draft or no line | The close date | `declaration_close_reminder_days` before it |
| The proof window opens (CY3) | Employees with pay_then_prove lines | Heads, declared amounts, the lock date | At `proof_window_open_at` |
| Proof lock approaches | Employees whose approved amount is below declared | The shortfall that would become taxable, per head | `proof_lock_reminder_days` before lock |
| A proof is decided or queried (P2–P5) | The claimant | The decision, the amount, the reason or question | On the transition |
| A proof lapses at lock (P9) | The claimant and payroll/finance | That it is excluded until decided | At CY4 |
| A life event is recorded but no addition is submitted | The employee | The window's end date (from the frozen evaluation) | `addition_window_reminder_days` before it ends |
| An addition is refused or rejected by the insurer (BV-19 to BV-22, CV3) | The employee and HR admin | The rule or the insurer's reason | On the event |
| An endorsement passes its SLA unacknowledged (BV-26) | HR admin | The line, the policy, the age | On the breach, and daily until acknowledged |
| Unexplained census drift above tolerance (BV-28) | HR admin | The categories and counts | On reconciliation |
| A gift aggregate nears the threshold | Payroll/finance | *G*, *T* and the runs remaining | When *G* comes within `gift_watch_margin` of *T* |
| A Tax-safe exception is raised (BV-11 to BV-13, BV-16, BV-35) | HR admin and the compliance checker | The item now valued as taxable and why | On the event, and on the pre-run report (§11.17.1) |

Tests: TB-N01 — with WhatsApp rate-limited, a proof decision reaches the claimant in-app and is never dropped (FR-CHR-088). TB-N02 — an employee whose approved amount is below declared receives the proof-lock reminder showing the would-be taxable shortfall; one whose proofs match does not. TB-N03 — a gift aggregate entering `gift_watch_margin` notifies payroll/finance once, not on every later run.

#### 11.15.4 The benefits golden-case manifest

§22.8's golden-case corpus (FR-RULE-011) holds the scenarios a published rule version must reproduce, and FR-RULE-009's impact analysis names which cases a change re-certifies. This is the benefits entry in that manifest.

| When this changes | Re-certify | Because |
| --- | --- | --- |
| `meal_perq_limit`, either version | TB-M01 to TB-M21; §11.11.1 | Every meal outcome turns on the cap and the qualifying modes |
| `gift_voucher_limit` or any of the four gift parameters | TB-G01 to TB-G12; TB-X01, TB-X05; §11.11.1 | The aggregate test |
| The §11.5 employer-paid insurance row | TB-D16, TB-D19, TB-D20; §11.6.3 | Which premium heads are perquisites |
| `tax.lta_block`, `lta_entitled_class_rule`, `lta_taxable_journey_consumes_slot` | TB-L01 to TB-L05; BEN-33's criterion | The block mechanics |
| §08's proration rule (BEN-02) | TB-D19; the §11.9.5 worked example | Covered-days valuation |
| §08's s.2(y) classification of an FBP head | TB-F19 to TB-F21 | The add-back interaction |
| A head's new-regime treatment | TB-F03, TB-F16; §11.11.1 | `taxable_by_regime` |
| An insurer adapter version | Its fixtures (§11.13.1); TB-D09, TB-D10, TB-D15 | Rendering and acknowledgement matching |
| `gratuity_params`, `gratuity_vesting_years`, `gratuity_six_month_boundary`, `tax.gratuity_exemption_ceiling` | TB-GR01 to TB-GR14 | Every accrual and settlement figure turns on the formula, the year count and the ceiling |
| `tax.retiral_aggregate_cap`, `retiral_cap_includes_eps`, `retiral_cap_recognition`, `retiral_cap_scope`, `retiral_cap_part_year_proration` | TB-RC01 to TB-RC06; §11.11 | The breach and when it is recognised |
| `tax.rule3b_formula` | TB-RC07 to TB-RC10 | The cross-year accretion |
| `tax.nps_employer_deduction_pct.<regime>` | TB-NP01, TB-NP02; §11.11 | The 10% and 14% branch feeding both the deduction and the cap |

Scenarios not tied to a rule version — permissions, notifications, the attach line, the assistant — are acceptance tests that run at every release gate (§05.20), not golden cases.

#### 11.15.5 Interfaces — what this section consumes and what it provides

Every cross-section dependency in one place, so a build team can see where §11 stops. Each row names the owner of the other side; nothing here restates that side's specification.

| Direction | Interface | Other side | Used for |
| --- | --- | --- | --- |
| Consumes | Employee master, legal entities, exits and transfers | §07 (FR-CHR-017, §07.2, §07.3.3, §07.3.4) | Enrollments, regime election, G2 and G17 |
| Consumes | Consent records; the Aadhaar token store; nomination records | §07 (FR-CHR-044, FR-CHR-099, FR-CHR-100, FR-CHR-102) | The disability flag, Aadhaar optionality, Q4 |
| Consumes | The permissions matrix and approval workflow | §07 (FR-CHR-083, FR-CHR-105) | §11.15.1 |
| Consumes | The component catalogue, proration, wage-base resolver, TDS projection, F&F | §08 (FR-PAY-104, FR-PAY-108, FR-PAY-201, FR-PAY-205, §08.9) | §11.9.4, §11.9.5, BEN-97, BEN-86 |
| Consumes | Day statuses for the attendance cycle | §09 (FR-ATT-021) | *E* (BEN-75) |
| Consumes | Rule rows, entity classes, erasure and the deletion engine | §14 (§14.6.1a, §14.6.2, §14.7.2) | §11.2.6; every rule version |
| Consumes | The compliance data pipeline and golden-case corpus | §22 (§22.8; FR-RULE-009, FR-RULE-011) | Meal, gift, LTA and premium rule versions; §11.15.4 |
| Consumes | Migration tie-out tolerances | §16 (§16.7) | BEN-96 |
| Consumes | The AI rails | §12 (§12.8) | §11.13.2 |
| Provides | Perquisite inputs and the wage-base signal | §08 | TDS, payslips, Form 123 totals (§11.9.5; BEN-97) |
| Provides | `benefits.fbp.component_published` with `qualifies_for_exemption` | §19 (§19.6) | The FBP-adoption metric |
| Provides | Attach lines and, after the gate, attach revenue events | §18, §19 and finance | The two-line model (§11.14.1) |
| Provides | Benefits validation desk items B9, B10 and B11 | §20 (V-18, V-20, V-21, V-22) | §11.19 routing |

#### 11.15.6 Invariants and continuous self-checks

The BV catalogue (§11.15.2) catches bad *input*. Invariants catch bad *state* — the conditions that must hold across records after any sequence of legitimate operations, and whose violation means a defect, a bad migration or a race, not a user error. They are the benefits half of the discipline §22.8's golden cases apply to rules: a golden case proves one computation right, an invariant proves the store has not drifted. Each runs on the cadence named, and each failure is a defect ticket as well as an operator item.

| # | Invariant | When it runs | On violation |
| --- | --- | --- | --- |
| INV-1 | No `dependant_coverage` row is open outside its enrollment's own window, and no two rows overlap for one dependant on one enrollment | On every coverage transition and nightly | Refuse the transition; for a migrated row, quarantine and show both rows (BEN-96) |
| INV-2 | Every coverage-affecting change of §11.6.1 has a line, and every line has a `source_event_ref` | Nightly, over the day's transitions | Exception naming the change with no line; the endorsement queue shows it first, because it may be a person without cover |
| INV-3 | Every line in state `sent` belongs to a batch in `sent` or later, and the batch's payload re-renders to `payload_sha256` | Nightly, and before any resend | Block the resend; the line stays `sent`; a hash mismatch is a defect, never re-hashed to fit (BEN-73) |
| INV-4 | For each employee, head and tax year, the sum of the latest non-superseded `perquisite_input` values equals the Form 123 total the artefact carries | On Form 123 production and at each period close | Refuse the artefact; the difference names the head and period (§11.17, rule 4) |
| INV-5 | `retiral_contribution_ledger.epf_employer` for a wage month equals the sum of that month's approved ECR return fields named in `source_return_refs` | On every ledger write and monthly | Refuse the write; never re-derive the EPF figure to make it agree (BEN-43, E8) |
| INV-6 | For each employee and tax year, the sum of recognised gift period perquisites equals the gift perquisite to date | On every gift computation | Refuse the period input; a mismatch is a reversal or supersession defect (BEN-80) |
| INV-7 | For each period and employee, meal exempt value never exceeds *E* × *C*, and the eligible meals consumed across all meal instruments never exceed *E* | On every meal computation | Refuse the input; the double-count case is E19's canteen-plus-voucher month |
| INV-8 | No exempt meal or gift value exists for a period in which the governing attestation was not valid on the value's date | Nightly, over the tax year | Re-value as taxable through a superseding input; raise BV-12, BV-13 or BV-16 |
| INV-9 | No perquisite input, routing record or ledger row exposes a personal field of a subject whose key has been shredded | On every replay and export | Return `ERASED`; a leak is a defect, not a display setting (§11.2.6) |
| INV-10 | No `attach_revenue_event` or `attach_line` references a `PayrollResult`, `Filing`, payslip or invoice line | On every write and on the finance export | Refuse (AX7; §14 D9) |
| INV-11 | Every nomination set in force sums to 100% per scheme, and every minor nominee has a guardian | Nightly, and before any routing record | Hold the routing (N4, N5); never re-normalise |
| INV-12 | Inputs consumed by a locked period are byte-identical to what the run recorded | On every replay of a locked period | Defect; the replay reports the divergence rather than the recomputed figure (§11.9.5, rule 2) |
| INV-13 | `lta_block_usage.journeys_exempt` never exceeds the block's allowance plus `carried_in`, and `carried_in_used` is set only in the block's first calendar year | On every LTA claim and at each block boundary | Refuse the exemption; the journey is still recorded (BEN-33) |
| INV-14 | For each employee and period, membership of the ESI roll and of a GMC enrollment is mutually exclusive, and at least one holds where the tenant runs both | Before each run closes | Refuse the overlap; raise the XB4 exception for a gap (§11.4.4) |
| INV-15 | Every `contribution_instruction` marked remitted carries an acknowledgement reference, and no instruction exists for a Tier II or VPF source | On every batch close and nightly | Reverse the remitted flag; a Tier II or VPF instruction is a defect that would corrupt the cap (E10) |

**How a violation is handled.** Three rules keep the checks from becoming their own hazard. (1) **An invariant never repairs data.** It refuses, reverses through a superseding input, or holds — the repair is a human act with the ordinary maker–checker (§11.15.1), because a self-healing store destroys the audit the section exists to produce. (2) **An invariant never blocks the payroll run** except where the violation would produce a filed figure that is wrong — INV-4, INV-5 and INV-14 are blocking; the rest raise exceptions and the run proceeds (the tax-safe failure NFR). (3) **A violation found in a migrated tenant is quarantined, not accepted with a warning** (BEN-61, BEN-96), because a bad opening balance propagates into every later period.

| ID | Requirement | Priority | Acceptance criterion |
| --- | --- | --- | --- |
| **BEN-105** | Evaluate INV-1 to INV-15 on the cadence named, record each violation as both an operator exception and a defect ticket, refuse or reverse per the table, and never repair data automatically; the three blocking invariants hold the run's approval. | R2 · C-38 | A seeded overlap in coverage, a mismatched ECR figure, a gift recognition that does not sum, a meal exemption above *E* × *C*, and an attach event referencing a `PayrollResult` are each detected on the stated cadence, each produce a defect ticket with the record ids, and none is silently corrected; the run cannot be approved while INV-4, INV-5 or INV-14 is open. |

| ID | Given | When | Then | Covers |
| --- | --- | --- | --- | --- |
| TB-IV01 | Two overlapping coverage rows seeded by an import | The nightly check runs | Quarantined; both rows shown; nothing merged | INV-1, BEN-96 |
| TB-IV02 | A ledger EPF figure edited to a re-derived value | The write is attempted | Refused, naming the approved returns | INV-5 |
| TB-IV03 | A canteen-and-voucher month arranged to consume 24 meals against *E* = 20 | The period runs | Refused; the voucher ceiling is the remainder of *E* | INV-7, E19 |
| TB-IV04 | An attestation back-dated without a checker, exempting past issues | The nightly check runs | Those periods re-value as taxable through superseding inputs | INV-8, BEN-77 |
| TB-IV05 | A Form 123 total that differs from the sum of inputs by one head | Production is attempted | Refused, naming the head and period | INV-4 |
| TB-IV06 | An employee seeded on the ESI roll and a GMC enrollment for July | The July run's approval is attempted | Blocked, citing INV-14 | INV-14, BEN-98 |
| TB-IV07 | A `contribution_instruction` for a Tier II account | The nightly check runs | Defect ticket; the instruction never reaches the cap ledger | INV-15, E10 |

---

### 11.16 Benefits data migration — opening balances

Migration is a first-class product surface, not a services task (§16.7), and benefits carry the migration state most likely to be dropped in a mid-year cutover — because it is *stateful across time* in ways a single payslip is not. A cutover that imports employees but not their benefit history silently breaks LTA block tracking, the retiral cap, gratuity accrual and FBP true-up in the first tax year after switch. Imported state never carries a consent artefact the source did not hold (FR-CHR-102).

The benefits-specific opening balances that BEN-06 must ingest and validate:

| Opening balance | Why it cannot be re-derived | Import artefact |
| --- | --- | --- |
| **LTA block-year usage** | The 2022–2025 / 2026–2029 blocks predate the tenant; journeys already claimed cannot be inferred from current-year data (§11.9) | Per-employee journeys-claimed-in-block, with any carry-forward flag |
| **Retiral cumulative excess & Rule 3B `PC1`/`TP1`** | Prior-year excess and already-taxed accretion are needed to compute this year's accretion (§11.10, BEN-42) | Prior-FY employer PF+NPS+superann totals and taxed accretion |
| **Gratuity accrued years & last-drawn base** | Completed years of continuous service carry forward across the cutover; a reset zeroes a real liability (BEN-17) | Date of joining, prior accrued amount, continuity flag |
| **FBP YTD declared vs proven** | The true-up (BEN-35) needs YTD exempt/taxable split from the prior system, or it double-counts or gaps | YTD component-wise declared, approved, and TDS-already-deducted |
| **Employee's own PF YTD (for ₹2.5 L rule)** | The Rule 9D threshold is annual; a mid-year cutover must carry the YTD own-contribution (§11.8.1, BEN-28) | YTD statutory + VPF own contribution |
| **NPS PRAN and prior contributions** | PRAN is portable and must not be re-issued (BEN-25); prior contributions inform nothing tax-wise but the PRAN is load-bearing | Existing PRAN per employee |
| **Nomination sets** | Nominations are legally load-bearing and rarely re-collected voluntarily | Per-scheme nominee sets with shares |
| **Gift aggregate YTD** | The threshold runs across the whole tax year (§11.9.2); restarting *G* at go-live lets it cross ₹15,000 unseen | Per-employee non-cash gift issues in the tax year, with dates and instrument classes, and the gift perquisite already recognised |
| **Dependant coverage windows** | Coverage began under the old system; a window opened at go-live misstates Q1 for every earlier date and breaks proration | Per dependant per policy: coverage start date, insurer member reference |
| **Endorsements in flight** | A line the old system sent and the insurer has not yet acknowledged still needs its acknowledgement matched | Per line: the prior system's reference, sent date, state, and the payload sent where the source holds it |
| **FBP cycle position** | Whether proofs are open, locked or trued up depends on where the old system's cycle stood | Cycle dates and state; per head: declared, paid, approved to date, pending proofs |

| ID | Requirement | Priority | Acceptance criterion |
| --- | --- | --- | --- |
| **BEN-60** | Import benefits opening balances (LTA block usage, retiral cumulative excess, gratuity accrual, FBP YTD, own-PF YTD, PRAN, nominations) with per-row validation. | P1 | A mid-year cutover import produces a validation report; a first post-cutover payroll run computes LTA eligibility, the retiral cap and FBP true-up using imported state, not a reset baseline. |
| **BEN-61** | Reject or quarantine imports that would corrupt stateful computations (e.g., nominee shares ≠ 100%, negative accrual, PRAN collision). | P1 | An import row with nominee shares summing to 90% is quarantined with the rule cited; valid rows in the same batch still load. |

#### 11.16.1 Importing benefits history in flight

A cutover lands in the middle of everything this section tracks — a coverage year, an FBP cycle, a gift aggregate, a batch awaiting acknowledgement. The importer's job is to resume each exactly where the source left it, and to be honest about what it learnt when.

**Rules.**

1. **Imported history keeps its dates and records when we learnt it.** An imported coverage window keeps its historical start; its `recorded_at` is the import time. So Q1 for a date before go-live, "as recorded before the import", correctly returns nothing — the product did not know then — and "as recorded after" returns the imported cover (BEN-66).
2. **An in-flight line resumes as sent.** It becomes a `sent` line carrying the prior system's reference, sent date and attempt count, with its payload as the source sent it where the source holds it, otherwise marked `imported_unverified`. An acknowledgement that arrives after cutover is matched on the prior reference.
3. **The FBP cycle resumes at its position.** The importer creates the tax year's `fbp_cycle` in the source's state with its dates. Imported approved amounts enter *Basis* (§11.9.3), imported pending proofs are pending under the new cycle, and declared and paid amounts to date enter *Paid* and the declaration lines.
4. **Perquisite already recognised is imported, not recomputed.** For each head, what the old system already recognised as taxable enters as a `perquisite_input` for the last pre-cutover period, marked `opening_balance` and sourced to the import (§11.9.5). The gift computation subtracts it (§11.9.2 step 4), so nothing is taxed twice and nothing is dropped.
5. **Consent is never backfilled.** A dependant's disability flag imports only with a written-consent record or dated imported consent evidence; otherwise it is held unusable and listed (FR-CHR-102; BEN-06).
6. **Tie-out before go-live.** Imported YTD perquisite totals per head tie to the source's figures under §16.7's `migration.tieout_tolerance.<head>`; a head outside tolerance holds go-live for that tenant, as the R1 importer's tie-out does for payroll heads (§05.17, C-05).

**Worked example — a gift aggregate across a cutover.** A tenant cuts over on 1 October 2026. Under the old system the employee received a ₹5,000 voucher in August; nothing was taxable. The importer loads *G* = ₹5,000 with ₹0 recognised. In November a ₹6,000 voucher takes *G* to ₹11,000; in March a ₹5,000 gift in kind takes it to ₹16,000 and the whole ₹16,000 is recognised in March — the §11.11.1 result. A cutover that ignored the August voucher would see *G* = ₹11,000 in March, recognise nothing, and under-deduct TDS on ₹16,000 with the demand on the employer.

| ID | Requirement | Priority | Acceptance criterion |
| --- | --- | --- | --- |
| **BEN-95** | Import gift aggregates, coverage windows, endorsements in flight and FBP cycle positions under rules 1–5, with already-recognised perquisite entering as `opening_balance` inputs. | R2 · C-38 | The worked example recognises ₹16,000 in March; an imported in-flight line is matched when its acknowledgement arrives on the prior reference; Q1 "as recorded before the import" returns no cover. |
| **BEN-96** | Tie imported benefits YTD per head to the source under §16.7's `migration.tieout_tolerance.<head>` and hold go-live for a head outside them; quarantine, under BEN-61, an imported coverage window that overlaps another for the same dependant and policy, and an in-flight line with no prior reference. | R2 · C-38 | A head whose imported YTD taxable figure differs from the source's beyond tolerance holds go-live and names the head; an overlapping window is quarantined with the conflicting rows shown. |

| ID | Given | When | Then | Covers |
| --- | --- | --- | --- | --- |
| TB-X01 | A cutover on 1 October with an August ₹5,000 voucher | March's ₹5,000 gift is recorded | ₹16,000 recognised in March | BEN-95 |
| TB-X02 | An in-flight addition line sent by the old system | The insurer's acknowledgement arrives after cutover | Matched on the prior reference; the coverage confirms (CV2) | BEN-95 |
| TB-X03 | An imported coverage window from 1 June | Q1 for 1 July is asked as recorded before and after the import | No cover, then cover | BEN-95, BEN-66 |
| TB-X04 | A cutover in December with telephone proofs pending | The proof lock passes | The pending proofs lapse under the new cycle like native ones (P9) | BEN-95 |
| TB-X05 | An imported gift perquisite already recognised by the old system | The next gift is valued | The recognised amount is subtracted; nothing is taxed twice | BEN-95 |
| TB-X06 | An imported disability flag without consent evidence | The import runs | Held unusable and listed | BEN-06 |
| TB-X07 | An imported YTD taxable figure off by more than tolerance | Go-live is attempted | Held for that head | BEN-96 |
| TB-X08 | Two imported windows overlapping for one dependant on one policy | The import runs | Quarantined with both rows shown | BEN-96 |

---

### 11.17 Reporting artefacts — where benefits surface in the filings

The PRD's thesis is that the *filing* is the unit of delivery (§01). Benefits are not a standalone report; they surface inside the tax artefacts the engine already owes, and the acceptance bar is that they *tie exactly* — to the artefacts the product actually generates, not to the TRACES-prepared certificate. This subsection names the exact artefacts and rows so the tie-out is testable.

| Artefact | Benefits content it must carry | Tie-out |
| --- | --- | --- |
| **Form 123 (ex-12BA)** (perquisite statement; EV-050) | Every taxable perquisite valued in §11.5–§11.10: employer-paid premium (BEN-13), motor car (Rule 3(2)), movable-asset use/transfer, meal excess and condition failures (BEN-62), gifts at or over the threshold (BEN-63), retiral cap breach (BEN-41), Rule 3B accretion (BEN-42) | Sum of Form 123 perquisite rows = the valuation engine's perquisite output for the tax year. Field-level layout of Form 123 is not yet captured (r5/02 open question) — the tie-out is to totals until it is. |
| **Annual tax computation** (per employee, product-generated) | Salary, net perquisites, 80CCD(2)/(1B), 80C (incl. VPF) deductions, standard deduction, regime applied | Taxable-income line reconciles to the monthly s.392 (ex-s.192) accruals across the tax year (BEN-34) |
| **Form 138 (ex-24Q) Annexure II** (Q4 only; EV-047) | Year-end salary, deduction, rebate and net-tax summary per employee, carrying the perquisite and deduction totals above | Annexure II per-employee totals = the annual tax computation. **Fenced:** the Q4 regular file format is not released as re-checked in September 2026 (EV-046); benefits totals slot in when it lands. |
| **Form 130 (ex-Form 16)** — Parts A, B and C (EV-048) | Nothing the product generates: TRACES prepares Form 130 from Form 138 Annexures I and II, and a certificate not generated from TRACES is invalid (EV-048; research r5/02). The per-employee salary breakdown sits in Part C Annexure-I, not Part B. | Tie-out is indirect — correct Annexure I and II data is the product's whole contribution. **[Reversed]** v0.3 treated "Form 130 Part B" as a product output and the tie-out target. |
| **Form 124 (ex-12BB)** — the employee's statement of claims for deduction under s.392(5)(b) (EV-050; r2/10) | The declaration and proof records are the evidence behind it (§11.9.3; §08 FR-PAY-503). Which FBP heads the form itself carries is not captured — §20 V-20 reads the Form 124 guidance note | Once V-20 reports, each claim on the form traces to its declaration line and approved proofs; until then, no FBP head is printed on it |
| **ECR** (EPF; EV-035) | The 11-field member line: VPF rides in Employee PF Contribution (EV-045); every line carries EDLI Wages, including for an EDLI-exempt establishment, whose contribution the portal computes as zero (BEN-19). The file carries no EDLI amount — dues surface at the portal's Due Deposit Balance Summary and challan stage (EV-036). | The approved returns' Employer PF (and, per parameter, EPS) fields = the figure `retiral_contribution_ledger` reads for the cap (BEN-43), bit-for-bit |
| **NPS SCF** | Employer + employee Tier I contributions per period (BEN-21, BEN-26); layout per CRA, fenced until B11 captures it | SCF total = `contribution_instruction` batch total; not "remitted" until ack stored |
| **Nomination artefacts** | Gratuity and EPF/EDLI nominations, each on the form its instrument version prescribes (legacy Form F / Form 2; successors unmapped — B10) | Generated from the shared `nominee` table (BEN-18) |

**Determinism restated at the artefact boundary.** Because §08 forbids model-generated statutory or monetary figures, *no number on any artefact above may originate from the LLM*. The LLM may draft the covering note or explain a perquisite to an employee; the figure it explains is always the rules engine's. This is the single most important acceptance property of the whole section (§11.15 item 2).

#### 11.17.1 Operator-facing benefits reports

The statutory artefacts above are what the employer owes; these are what the people running benefits work from. Each reads the records and events of §11.2.5 and computes nothing of its own.

| Report | For | One row per | Columns | When |
| --- | --- | --- | --- | --- |
| Pre-run benefits exceptions | Payroll operator and approver | Open BV item of class Tax-safe, Task or Review for the run's employees | Code, employee, head, period, value affected, resolver, age | Before every run's approval; an open blocking Task (BV-14) holds the approval |
| Pre-true-up | Payroll/finance | Employee and pay_then_prove head at proof lock | Declared, paid, approved, lapsed proofs, outcome category, the true-up taxable delta | From CY4 until CY5 |
| Endorsement queue | HR admin | Line held, sent past its SLA, or rejected; batch partially acknowledged; unmatched acknowledgement row | Policy, person, type, effective date, state, attempts, age | Continuous; unconfirmed additions first, since they may be people without cover |
| Census reconciliation | HR admin | Reconciliation, then diff line | Category, our value, their value, `explained_by`, resolution | On each census import |
| Gift aggregate watch | Payroll/finance | Employee whose *G* is within `gift_watch_margin` of *T* | *G*, *T*, mode, runs remaining | Monthly, so a late crossing is seen before it lands in one payslip (§11.11.1) |
| Renewal hold | HR admin | Newly ineligible case in a held renewal census | Member, dependant, the term that changed | Until resolved (BEN-93) |
| FBP adoption | Product and GTM | Tenant with a published component whose `qualifies_for_exemption` is true | Head, publish date | Monthly, from `benefits.fbp.component_published` — §19.6 counts only qualifying configurations |

Tests: TB-R01 — a run with an open BV-14 item cannot be approved, and the pre-run report names it. TB-R02 — the pre-true-up report's taxable deltas sum to the true-up run's benefits deltas for the pay group. TB-R03 — a tenant whose only meal component is a cash allowance does not appear in the FBP adoption report.

---

### 11.18 Edge-case register

The defects most likely to ship if the model is naive. Each is a test case, not a caveat.

| # | Edge case | Wrong behaviour to avoid | Correct behaviour |
| --- | --- | --- | --- |
| E1 | Dependant is both a covered life and a nominee | One table conflates them; death benefit routes to wrong person | Separate `dependant` and `nominee`; a parent can be a nominee without being a covered dependant (BEN-04) |
| E2 | Employee crosses the ESI wage ceiling mid-year | Double-covered on ESI and GMC, or gapped | Move to GMC census at the effective date; one roll per period (BEN-09) |
| E3 | Covered child ages out of dependent limit at renewal | Child silently stays covered or is dropped with no audit | Age-out flagged from `dob`, deletion endorsement audited (BEN-08) |
| E4 | New regime employee declares 80CCD(1B)/HRA/LTA | Declaration accepted, reversed painfully at true-up | Menu is regime-conditional; disallowed exemptions hidden (§11.12) |
| E5 | Meal card fully spent in an LOP month | Full monthly cap exempted despite fewer working meals | Exemption ceilinged to working-meal count (BEN-37) |
| E6 | Cash gift instead of gift-in-kind | Treated as exempt under ₹15,000 threshold | Cash gifts fully taxable regardless of amount (§11.5) |
| E7 | Laptop provided for use taxed as perquisite | 10% p.a. wrongly applied to laptop *use* | Laptop/telephone use is specifically exempt (Rule 3(7)(vii) proviso, §11.5) |
| E8 | Retro EPF correction after cap already computed | Ledger uses re-derived EPF and drifts from the filed returns, or overwrites the filed figure | Ledger reads the approved returns bit-for-bit; a post-payment upward correction arrives via the arrear flow as a dated diff row, and a downward one is impossible once payment is initiated (BEN-43; EV-037, EV-043) |
| E9 | Rule 3B accretion computed on current-year excess only | Accretion under-taxed; ignores cumulative excess | Persist `PC1`/`TP1`; compute on cumulative balance (BEN-42) |
| E10 | Tier II NPS contribution posted as 80CCD deduction | Deduction over-stated; cap breach mis-computed | Tier II tagged, excluded from deduction and cap (BEN-20, §11.8) |
| E11 | EDLI 0.5% budgeted despite an exempting GTL policy — or EDLI Wages dropped from the ECR | Cash-flow overstated; or the ECR fails because an exempted establishment still owes EDLI Wages | Exclude the 0.5% from expected dues, add the exempted-establishment inspection charge, keep EDLI Wages on every line (BEN-19) |
| E12 | Partner (CRA/TPA) outage during a pay run | Payroll blocks; payslips delayed | Payroll completes; artefact queues and retries (BEN-53) |
| E13 | LTA block resets on the tax-year boundary | Second journey wrongly re-allowed each tax year | Track by calendar-year block 2022–2025 / 2026–2029 (BEN-33) |
| E14 | Meal wallet set to ₹200/meal with a transferable card, or paid as a cash allowance | Exempted as if the conditions were met; payslips under-deduct; demand plus interest lands on the employer | No exemption without a qualifying delivery mode and both voucher attestations (BEN-62) |
| E15 | Gifts cross ₹15,000 in aggregate late in the tax year | Only the excess taxed without a confirmed basis, or the crossing missed because gifts are checked one by one | Aggregate per tax year; value per `gift_threshold_mode`, default whole aggregate (BEN-63) |
| E16 | The attendance cycle (26th–25th) differs from the pay period | Meals counted over the pay month's calendar, so meals and LOP disagree | *E* counted over the attendance cycle the pay period consumed (BEN-75) |
| E17 | An employee works on a holiday | The holiday zeroes the day's meals | A paired session counts as present whatever the calendar says (BEN-75) |
| E18 | A voucher attestation recorded after issues were made on the instrument | Backdated silently, exempting past issues | Effective from the recording date; a backdate needs a distinct checker and evidence (BEN-77) |
| E19 | A canteen and vouchers for one employee in one month | Each instrument gets its own *E* × *C*, counting meals twice | Canteen meals consume *E* first; vouchers get the rest (§11.9.1) |
| E20 | A gift reversed after the aggregate crossed the threshold | The locked period's payslip edited, or the reversal ignored | A negative period perquisite in the next open run; locked periods untouched (BEN-80, BEN-81) |
| E21 | A gift aggregate exactly at the threshold | Code and documentation disagree on "below" | `gift_threshold_boundary`, default strict_below, printed with the result (BEN-80) |
| E22 | A voucher bought at a discount | Counted at cost, understating *G* | Face value by default (`gift_value_basis`) |
| E23 | An open-loop prepaid card recorded as a gift voucher | Treated as a gift in kind under the threshold | Class cash_equivalent, or unattested: valued as cash (BEN-79) |
| E24 | A proof uploaded after proof lock | Accepted silently into the true-up | Refused (BV-07); only the P8 reopen path, with a checker |
| E25 | Approved proofs exceed the declared allocation | An exemption above the amount paid | min(*Paid*, *Basis*, *Cap*) (BEN-85) |
| E26 | Proofs undecided at proof lock | Treated as approved | Lapsed and excluded until decided before the true-up run (P9, P10) |
| E27 | A regime switch | Declarations deleted and re-entered | Re-versioned as `taxable_by_regime`; the year re-values; history kept (BEN-87) |
| E28 | A leaver with unproven FBP | Left for March's true-up, after the employee has gone | Recognised in the F&F run (BEN-86) |
| E29 | One person covered as a dependant of two employees | Double premium, or a silent merge of two people | Held for a named reviewer (BEN-67) |
| E30 | The insurer confirms a different effective date from the one requested | Our window keeps the requested date; perquisite and Q1 wrong | A new coverage version at the confirmed date, with the reason; the perquisite re-values (CV4) |
| E31 | The insurer rejects one line of a batch | The whole batch failed, or the rejection missed | Line-level states; the batch is partially acknowledged (BEN-69) |
| E32 | An endorsement file erased under retention, then a dispute | Nothing to show what was sent | The lines keep the sent payload; the file re-renders and matches the sealed hash (BEN-73) |
| E33 | An acknowledgement row that fits two lines | A guessed match confirms the wrong person | BV-36; nothing changes until resolved |
| E34 | A renewal that tightens the family definition | Last year's list copied; an ineligible dependant covered on paper | The renewal census is held until HR resolves each case (BEN-93) |
| E35 | A family premium with no per-life split | An invented apportionment taxes someone | Operator review (PR4) |
| E36 | A back-dated revision moves the sum insured | Dated today, or back-dated where the insurer refuses back-dating | Dated per `si_backdating_accepted` (BEN-94) |
| E37 | A transfer between legal entities with separate policies | A gap or an overlap in cover | Deleted the day before, added on the transfer date (G17) |
| E38 | An FBP declaration moves pay out of special allowance | Wage bases left stale; the add-back missed | §08's resolver re-runs from the next run (BEN-97) |
| E39 | A mid-year cutover after gifts were given | *G* restarts at zero; the threshold is crossed unseen | Gift YTD imported with the perquisite already recognised (BEN-95) |
| E40 | A broker commission credited against a subscription invoice | Software revenue understated; attach hidden | Refused (AX2; BEN-90) |
| E41 | An attach line sized on headcount | The per-life unit understated by every dependant | Confirmed covered lives only (BEN-91) |
| E42 | `meals_per_working_day` left unset | A convention guessed by the engine | Meal values taxable; BV-35 (BEN-75) |
| E43 | Gratuity accrued on basic, or on the ₹15,000-capped PF wage | The liability is under-provisioned and the exit figure is wrong | The uncapped s.2(88) gratuity wage base with the add-back (BEN-99; §08.1, I1) |
| E44 | A wage revision mid-service | The increase smoothed into the revision year, or applied only to future years | Last-drawn wages re-base every completed year; the movement is a step (BEN-99, worked example 2) |
| E45 | A final part-year of exactly six months | Rounded up to a full year on a "six months or more" reading | Six months is not *in excess of* six months; `gratuity_six_month_boundary`, printed with the figure (GY3) |
| E46 | Death in service before the vesting years | Treated as not payable, like a resignation | The vesting condition does not apply on death or disablement (GX3) |
| E47 | A leaver with prior employment and no exemption declaration | The remaining ceiling assumed full, so the settlement is exempted and TDS under-deducted | A blocking Task on the F&F run until the declaration or an operator entry with its source exists (BEN-100) |
| E48 | A cap breach recognised only in the last run | The whole perquisite, a late gift crossing and the FBP true-up land in one March payslip | `retiral_cap_recognition` defaults to `projected`, and `year_end` is never the default (BEN-104) |
| E49 | Progressive recognition, then a mid-year exit under the cap | The recognised perquisite stays, over-withholding on a breach that never arose | The F&F run reverses it with a negative superseding input (BEN-104, TB-RC04) |
| E50 | No fund statement for a year with a carried excess balance | `I` defaulted to zero, so the accretion computes as nil and under-deducts | `rule3b_fund_income_source` has no default; the accretion is an operator-review item shown as pending (§11.10.2) |
| E51 | A contribution file generated for a CRA | The period marked remitted on generation | Remitted only on a stored acknowledgement reference; while B11 is open, only an internal manifest exists (BEN-103) |
| E52 | A nominee who predeceased the employee | The remaining shares re-normalised to 100% by the engine | Held; `nomination_share_reallocation` is unset and the case goes to the legal lead (N3) |
| E53 | An ESI crossing at a contribution-period boundary | A month in which the employee is on neither roll, or on both | XB3 refuses the overlap and XB4 raises the gap, first in the endorsement queue (BEN-98, INV-14) |

---

### 11.19 Open questions and validation hooks

These feed the §20 programme. B1–B8 gate v1+ *monetisation* and none gates the v1 *data-model* build. B9, B10 and B11 are **build-blocking desk work**: they gate the Tax Year 2026-27 values and citations the engine ships and the NPS file surface, not the schema.

**Routing into §20.** Each B-item is this section's working list; the item that carries it on §20's build-blocking desk register is named here so nothing is tracked twice or not at all. B9 → §20.6 **V-18** (the meal row and any perquisite rule-number citation) and **V-20** (every other Income-tax Act 2025 / Rules 2026 read). B10 → **V-21** (the CoSS s.53(3) payable ceiling and the other Code-era labour mappings) and **V-22** (the EDLI successor after the saving lapses), with ESI after the cliff on **V-08**. B11 → no §20.6 item carries corporate NPS yet; it is routed to §20 as a new build-blocking desk item. B1 → V-07; B2–B8 are commercial, survey or spike work and sit outside §20's build-blocking list. Every parameter named in §11.20 joins its §20.13 family (tax reference values, central labour reference values) under the same route.

| # | Question | Why it matters | Kill/validate |
| --- | --- | --- | --- |
| B1 | Will a 50–200 Indian employer pay a *software* fee for benefits administration (census/endorsement/FBP management), separate from any money movement? | Determines whether benefits is ever a revenue line or stays pure option value. | Add to the §20.6 willingness-to-pay study (V-07); if genuinely zero, benefits remains a retention feature only. **[Hypothesis]** |
| B2 | What share of beachhead tenants already run GMC and/or corporate NPS at the point of sale? | Sizes how much of the data model is used day one vs latent option value. | Buyer survey alongside the §20.6 buyer interviews; informs which of BEN-10..16 a tenant switches on from day one. **[Hypothesis]** |
| B3 | Do TPAs/insurers accept a standardised endorsement file, or is per-insurer bespoke mapping unavoidable? And, per insurer: whether dependants cascade on a member deletion, whether back-dated sum-insured changes are accepted (`si_backdating_accepted`), and what an acknowledgement echoes back (§11.13.1). | Sets the true cost of BEN-50 (adapter count) and the matching rules of BEN-69. | Technical spike with 3–4 insurers/brokers; unsized today. **[Hypothesis]** |
| B4 | Is there a defensible software-only NPS/benefits fee that does not require becoming a POP or card issuer? | The only path to attach revenue that stays on the software revenue line, never blended with PEPM (§11.14). | §20; model at zero until answered. **[Hypothesis]** |
| B5 | Does the 1-Apr-2026 meal/gift expansion actually move FBP adoption, and does that adoption create pull for a managed wallet? | Tests whether the deferred card business has a demand signal worth revisiting. | Track FBP-component adoption post-April 2026 across live tenants; a strong signal reopens the (still money-movement-cautious) wallet question. **[Hypothesis]** rule change (EV-019; §20.6 V-18) and demand response. |
| B6 | What fraction of beachhead tenants run a funded gratuity trust vs pay-as-you-go, and do they want the accrual/actuary-file surface? | Sizes whether gratuity accrual (BEN-17) is a differentiator or a hygiene feature. | Buyer survey; if pay-as-you-go dominates at 20–200, accrual stays a compliance/provisioning feature, not a sales lead. **[Hypothesis]** |
| B7 | Do beachhead employers with GTL actually hold the EDLI exemption (legacy EPF Act s.17(2A)), or leave the 0.5% running? | Sizes the value of BEN-19 automation. | Sample tenant EPF challans in onboarding; if most leave EDLI running, BEN-19 is a quiet savings feature to surface. **[Hypothesis]** |
| B8 | What override or commission split do brokers actually pay on 50/100/200-life corporate GMC books? | The only input to any broker-override line; the ~15.3% non-life industry commission is an upper bound, not a midpoint (r2/02). | Mystery-shop 3–4 brokers; obtain broker filings (MCA) where available. Model at zero until answered. **[Hypothesis]** |
| B9 | **Tax mapping (desk, build-blocking).** For every value in §11.20 marked "B9": the Income-tax Act 2025 / Income-tax Rules 2026 citation, and whether the value carried over — including the meal-perquisite rule citation (this item *is* §20.6 V-18 for the meal row; Taxmann names Rule 15(5)(a) of the 2026 Rules as the successor to Rule 3(7)(iii) — r2/02 — a lead to read, never a citation), new-regime availability per FBP head, `gift_threshold_mode`, tea/snacks, the LTA "entitled class" condition, the Tax Year 2026-27 motor-car values, `retiral_cap_includes_eps`, `retiral_cap_arrear_attribution`, `retiral_cap_recognition`, `retiral_cap_scope` and `retiral_cap_part_year_proration` (§11.10.1) — and the §11.9 interpretation parameters: `gift_threshold_boundary`, `gift_threshold_scope`, `gift_value_basis`, `meal_ceiling_pooling`, `meal_value_timing`, `meal_recovery_treatment`, the half-day, home-day and on-duty meal treatment, `lta_taxable_journey_consumes_slot`, and the children's education and transport allowance conditions (`cea_max_children`, the transport eligibility predicate). With V-20 it reads which FBP heads Form 124 carries. It also re-reads, at primary source, every 1961-Act and 1962-Rules value §11.20 marks "carried" — none was re-captured in r1–r5. | Every Tax Year 2026-27 perquisite and deduction the engine computes rests on it; a wrong carry-over under-deducts TDS with the demand on the employer. | Read G.S.R. 198(E) and the 2025 Act at primary source, with the corrigendum check (§02.4); tax counsel signs each row. A row unconfirmed by release ships with **no default** for Tax Year 2026-27 periods (§20 V-20): the operator records the value in force with its source on the rule version, the dependent computation routes to operator review — or, for a perquisite value, is §08 AC-106.4's blocking item — and a later published row re-values the tax year (§11.5); nothing runs silently on 1962 values. The exceptions are the meal and gift rows, which ship their EV-019 values as effective-dated parameters under V-18. **[Hypothesis]** until each row is read. |
| B10 | **Social-security mapping (desk, build-blocking).** The CoSS s.53(3) gratuity payment ceiling notification; what counts as continuous service, and whether a final part-year of exactly six months rounds up (`gratuity_continuous_service_rule`, `gratuity_six_month_boundary` — §11.7.1); the gratuity nomination form under the SS (Central) Rules 2026; the EPF Scheme 2026 nomination form; the Code-era EDLI exemption provision and its conditions; post-cliff EDLI contribution and benefit values, and a primary read of the legacy EDLI benefit values carried from v0.3. (ESI after the cliff is §20.6 V-08.) | BEN-17, BEN-18 and BEN-19 carry these as parameters; a guessed value misstates a liability or renders a nomination on a dead form. | Primary-source watch on MoLE/EPFO notifications with the corrigendum check; until found, `gratuity_payment_ceiling` stays unset and flagged, and `nominee.form_ref` renders the legacy form marked "legacy". **[Hypothesis]** |
| B11 | **Corporate NPS surface (desk, build-blocking for BEN-21, BEN-22, BEN-25, BEN-26, BEN-55).** The CRA identities, the contribution-file name, layout and field list, the upload channel (attended portal or published interface) and the acknowledgement artefact, per CRA; whether a CRA accepts a contribution dated to an earlier period (`nps_arrear_attribution`, §11.8.3); the corporate-model PRAN lifecycle. No research round covered corporate NPS (r2/00). | Every NPS FR depends on a file layout this PRD has not captured; a hand-authored layout would be fabricated precision, and an assumed unattended upload would repeat the K-13 error. | Read each CRA's published corporate-subscriber specification and PFRDA's corporate-model circulars; until captured, the SCF generator is fenced and NPS contributions are recorded (`contribution_instruction`) but no file is emitted. **[Hypothesis]** |

#### 11.19.1 Product decisions this section takes, and the ones it leaves open

The B-items are questions for evidence. These are choices for the product owner — taken where the section needed an answer to be buildable, open where the answer belongs to someone else.

| # | Decision | Status | Options | Criterion or reason | Owner |
| --- | --- | --- | --- | --- | --- |
| DB-1 | How the engine behaves where tax text is unread | **Taken:** the default-direction rule — the behaviour that cannot under-deduct (§11.9.1) | — | K-19: the demand and interest land on the employer | Product owner |
| DB-2 | Meal ceiling pooling default | **Taken:** per period | Per period; per tax year | Default-direction; B9 may overturn, and DB-9 decides whether tax-year pooling ships | Statutory desk lead |
| DB-3 | Provisional exemption default | **Taken:** declared — BEN-35's existing behaviour | declared; proof_only | Tenant choice; revisit if true-up shortfalls drive query volume (§19) | Product lead |
| DB-4 | BEN-74 in R1 | **Open** — raised to §05 as an addition to PR-15 | An R1 guard on operator entries; none | Without it an R1 operator can enter a K-19 breach | §05 owner |
| DB-5 | Premises meal count | **Taken:** *E*, or a recorded per-employee count capped per day | — | The count must never exceed the convention's per-day cap | Product lead |
| DB-6 | Endorsement send checker | **Taken:** a tenant setting with no product default; the onboarding checklist asks (§11.4.3) | On; off | Tenants whose insurer bills against our census gain most from it | Product lead |
| DB-7 | The on-behalf consent form for dependant health data | **Open** — counsel (Part D-4) | Enabled; disabled | §23's counsel register | Legal lead |
| DB-8 | Insurer adapter build order | **Open** — after B3 | Per-insurer adapters in tenant-demand order; a canonical file first | Whether insurers accept the canonical line | Engineering lead |
| DB-9 | Whether tax-year meal pooling ships at all | **Open** — after B9 | Ship; withhold | Whether a per-meal cap admits pooling across months | Statutory desk lead |
| DB-10 | Whether a new-regime LTA journey consumes an exempt journey | **Taken for now:** yes, by default (L1) | Consumes; does not | Default-direction; B9 | Statutory desk lead |
| DB-11 | When the retiral cap breach is recognised | **Taken:** `projected` (§11.10.1) | projected; actual_to_date; year_end | Default-direction: `year_end` defers withholding and can never be the default; B9 may overturn the rest | Statutory desk lead |
| DB-12 | What an invariant violation does | **Taken:** refuse, reverse or hold — never self-repair (§11.15.6) | Auto-repair; refuse only | A self-healing store destroys the audit trail the section exists to produce | Product owner |
| DB-13 | Whether the gratuity provision is recognised before vesting | **Open** — finance policy | From joining; from vesting | Both figures are always on the accrual row, so the choice is presentation | Finance lead |

**Bottom line for the builder.** v1 ships the benefits *data model, tax integration, deterministic valuation catalog, and partner surface* — schemas populated, perquisites valued deterministically, gratuity accrued, endorsements generated and SCFs generated once B11 captures the layout, no money moved. That is the whole job. It makes the benefits attach a *decision we can make later cheaply* instead of a *migration we must pay for later expensively*, and it keeps the company on the right side of every ratio in §05 until the §20 programme says otherwise.

---

### 11.20 Statutory reference appendix

Every statutory value the engine hard-depends on, with its parameter name, source cue, evidence status, Tax Year 2026-27 status and watch trigger, so the compliance data pipeline's watcher (§22) has an explicit watch-list for this section. Values are effective-dated `benefit_scheme`/`fbp_component_config` rows or §14.6.2 rule rows, not code constants; where §06 or §14 already names the parameter, that name is used. "Carried" means carried from v0.3 and not re-captured in r1–r5 — **[Hypothesis]** until B9 or B10 reads the primary text. For a carried tax value, "Current setting" is the value for periods to 31 March 2026; Tax Year 2026-27 periods follow B9's release rule (§11.19; §20 V-20), and a parameter owned by §06 or §08 follows its owner's shipping decision.

| Value | Current setting | Source | Tax Year 2026-27 status | Watch trigger |
| --- | --- | --- | --- | --- |
| Meal perquisite cap (`meal_perq_limit`, §14.6.2) | ₹50 → **₹200/meal** from 1 Apr 2026, conditions per BEN-62 | Income-tax Rules 2026 (G.S.R. 198(E), 20.03.2026) per KPMG and Taxmann — r2/02, r2/10 | Value **[Hypothesis]** (EV-019): two professional sources and a counsel spot-check, rule text not read; rule citation null until §20.6 V-18 (B9) | Any 2026-Rules amendment or corrigendum |
| Gift/voucher nil-value threshold (`gift_voucher_limit`, `gift_threshold_mode`) | ₹5,000 → **₹15,000 during the tax year**, mode per BEN-63 | Same | Value **[Hypothesis]** (EV-019) as above; citation and `gift_threshold_mode` — B9 | Same |
| 80CCD(2) NPS employer ceiling (`tax.nps_employer_deduction_pct.<regime>`) | **10%** (old) / **14%** (new regime), basic+DA | 1961 Act s.80CCD(2); Finance (No.2) Act 2024 — carried | 2025-Act successor unmapped — B9 | Finance Act each year |
| 80CCD(1B) own NPS (`tax.nps_own_deduction_cap`) | **₹50,000** (old regime only) | 1961 Act s.80CCD(1B) — carried | Unmapped — B9 | Finance Act each year |
| Retiral aggregate cap (`tax.retiral_aggregate_cap`, with `retiral_cap_includes_eps`, `retiral_cap_arrear_attribution`) | **₹7,50,000** per tax year (PF+NPS+superann) | 1961 Act s.17(2)(vii); Finance Act 2020 — carried | Unmapped — B9; EPS inclusion and arrear attribution are parameters (BEN-43) | Finance Act each year |
| Rule 3B accretion formula (`tax.rule3b_formula`) | `(PC/2)×R + (PC1+TP1)×R` | 1962 Rules r.3B — carried | Unmapped — B9 | Rules amendment |
| LTA block (`tax.lta_block`, `lta_entitled_class_rule`) | Two journeys per calendar block; current **2026–2029** (previous 2022–2025); old regime only | 1961 Act s.10(5); 1962 Rules r.2B — carried | Unmapped; 2026 Rules reportedly restrict LTC to the "entitled class" (r2/02) — B9 | Rules amendment; next block |
| Standard deduction (`tds.standard_deduction.<regime>`, §06.13) | ₹50,000 (old) / **₹75,000** (new) | 1961 Act s.16(ia); Finance (No.2) Act 2024 — carried | Not verified for 2026-27 — B9 (§08) | Finance Act each year |
| Motor car perquisite (`perq.car.value.<band>`, `perq.car.driver_value` — §08 FR-PAY-106) | ₹1,800 / ₹2,400 + ₹900 driver per month, for periods to 31 March 2026 | 1962 Rules r.3(2), Tables I–II — carried | **Unknown** — a raised-values table was retracted (r1/06); no shipped default, operator-entered with source until published (§08 AC-106.4; §11.5) | Rules amendment |
| Movable-asset transfer depreciation (`perq.asset_transfer_depreciation.<class>`) | 50% (electronics) / 20% (cars) / 10% (other) | 1962 Rules r.3(7)(viii) — carried | Unmapped — B9 | Rules amendment |
| Other §11.5 catalog values (`perq.asset_use_rate`, `perq.accommodation.*`, `perq.loan.*`, `perq.esop.*`) | Asset use 10% p.a.; accommodation 10% / 7.5% / 5% by 2011-census band; loan exemption ₹20,000 and the SBI-rate basis; ESOP FMV method and the s.192(1C) deferral | 1962 Rules r.3(7)(vii), r.3(1), r.3(7)(i), r.3(8)/(9); CBDT Notn 65/2023; 1961 Act s.192(1C) — carried | Unmapped — B9 | Rules amendment; Finance Act |
| 80C / s.123 ceiling and PF-interest thresholds (`tax.pf_interest_threshold.*`, §06.13) | 80C ₹1,50,000 (old regime); own-PF interest threshold ₹2,50,000, or ₹5,00,000 with no employer contribution | 1961 Act s.80C, s.10(11)/(12) provisos; 1962 Rules r.9D — carried | s.80C → **s.123**, ₹1,50,000, read with Schedule XV — **[Verified]** (r3/02 finding 19); Schedule XV's items (VPF) and regime scope — B9; PF-interest provisos unmapped — B9 (§06.13 lists the s.10(11)/(12) provisos as unmapped) | Finance Act each year |
| ESI wage ceiling (`esi_wage_ceiling`, §14.6.2) | **₹21,000/month** (₹25,000 PwD), as ESIC publishes today | Legacy ESI instruments (§06.3) | Post-cliff position unresolved — §06.9; §20.6 V-08 | ESIC / MoLE notification |
| EPF wage ceiling (`pf_wage_ceiling`) | **₹15,000/month** | EPFO's own pages (r1) **[Verified]**; CoSS s.2(89) hook; re-fixed by S.O. 2702(E), 29.05.2026 — **[Verified — mirror]**, read through a professional alert; pull from the primary source before customer use (§06.2) | In force | The Nov-2026 cliff (§06.9); any revision following the reported Supreme Court direction to reconsider the ceiling (§06.2) |
| Gratuity formula (`gratuity_params`) | **(15/26) × last-drawn wages × completed years**, on the s.2(88) add-back wage | CoSS 2020 s.53, s.2(88) (§06.6); Payment of Gratuity Act 1972 repealed | In force | SS (Central) Rules; state rules |
| Gratuity payment ceiling (`gratuity_payment_ceiling`) | **Unset** — "such amount as may be notified" | CoSS s.53(3) (§06.6) | No Code-era notification located — B10 | Central Government notification |
| Gratuity tax-exempt ceiling (`tax.gratuity_exemption_ceiling`, §06.13) | **₹20,00,000** lifetime, cumulative across employers | 1961 Act s.10(10) (§06.6) — carried | 2025-Act equivalent unmapped — B9 | Finance Act; CBDT notification |
| EDLI employer rate (`edli_rate`) and exempted-establishment inspection charge | **0.5%** of wages, ₹15,000-capped (₹75 max); excluded from expected dues when exempt, with the exempted-establishment inspection charge of 0.005% (min ₹1,250) | EPFO EDLI page (r1/06; §06.2); S.O. 2701(E), 29.05.2026 (r2/10) — **[Verified]** | EDLI Scheme 1976 saved only to ~21 Nov 2026 — B10 | EPFO notification; the cliff |
| EDLI exemption (tenant flag, BEN-19) | GTL-based exemption from EDLI; exempted establishments' ECR treatment verified (r5/02) | Legacy EPF Act s.17(2A) — carried | Code-era provision unmapped — B10 | Notification |
| EDLI benefit, paid by EPFO (`edli.benefit_max`, `edli.benefit_min` — display only) | **₹7,00,000** max (min ₹2,50,000) | Legacy EDLI Scheme 1976 as amended — carried | Code-era values unmapped — B10 | EPFO notification |
| Children's education allowance (`cea_limit`, `cea_max_children`) | ₹100 → **₹3,000 per month per child** from 1 Apr 2026 | Income-tax Rules 2026 per KPMG — r2/02 finding 6 | Value **[Hypothesis]**; children covered, conditions and regime unset — B9; the head values as taxable until they are filled | Rules amendment |
| Transport allowance (`transport_allowance_limit`) | **₹25,000 per month, or 70% of the allowance if lower**, from 1 Apr 2026 | Same | **[Hypothesis]**; eligibility predicate unset — B9; taxable until filled | Rules amendment |
| Tea and snacks at premises (`tea_snacks_treatment`) | Exempt in full, periods to 31 Mar 2026 | 1962 Rules r.3(7)(iii) as v0.3 recorded it — carried | No shipped default — B9; a recorded provision routes to review (BV-18) | Rules amendment |
| Gift interpretation (`gift_threshold_boundary`, `gift_threshold_scope`, `gift_value_basis`) | strict_below; this_employer; face_value — default-direction defaults (§11.9.2) | The threshold as EV-019 reports it; the rule text not read | B9 | Rules amendment; B9's reading |
| Meal interpretation (`meal_ceiling_pooling`, `meal_value_timing`, `meal_recovery_treatment`) | period; on_issue; unset, so review (§11.9.1) | The per-meal cap as EV-019 reports it | B9; DB-9 decides whether tax-year pooling ships | Same |
| LTA taxable journey (`lta_taxable_journey_consumes_slot`) | true — default-direction (L1) | The carried block mechanics | B9 | Same |
| Retiral cap interpretation (`retiral_cap_recognition`, `retiral_cap_scope`, `retiral_cap_part_year_proration`) | projected; this_employer; no proration (§11.10.1) | The cap as carried states an annual figure and no timing, scope or proration rule; none was captured | B9 | Finance Act; any CBDT clarification on s.17(2)(vii) |
| Gratuity year count (`gratuity_vesting_years`, `gratuity_six_month_boundary`, `gratuity_continuous_service_rule`) | Five years' continuous service; `strict_excess` for a final part-year of exactly six months; continuous service **unset** | CoSS s.53 (§06.6) for the vesting years; the boundary and the continuity test are readings of wording no round re-captured | B10 | SS (Central) Rules; state rules |
| Rule 3B fund figures (`rule3b_fund_income_source`) | **Unset** — `I` and `Favg` come from the fund statements, never from the product | 1962 Rules r.3B as carried (§11.10.2) | B9 for the formula; the figures are inputs, not parameters | Rules amendment |

**Corrigendum discipline (§02.4).** Every value above ships only after a "check for a corrigendum" pass — the same non-negotiable step that separated the correct and incorrect readings of the November 2026 EPF cliff. The 1-Apr-2026 meal/gift figures are **[Hypothesis]** (EV-019) — two professional sources (KPMG, Taxmann — r2/02) and a counsel spot-check, short of a reading of the rule text; they must be re-checked against the Income-tax Rules 2026 text (and any corrigendum) before they enter a customer-facing artefact, and no rule number is printed on any artefact until B9 confirms it.

#### 11.20.1 Tenant, policy and product parameters this section names

The table above holds statutory values and their interpretation. These are settings a tenant, a policy or our own product owns: none is a statutory value, each has an owner, a default or none, and a route. A default marked *default-direction* was chosen by §11.9.1's rule and changes only through a checker (§11.15.1).

| Parameter | Level | Owner | Default | Route |
| --- | --- | --- | --- | --- |
| `meals_per_working_day` | Tenant | HR admin, with the compliance checker | None — BV-35 while unset | Tenant; printed on payslips |
| `meal_half_day_meals` | Tenant | As above | 0 — default-direction | B9 |
| `meal_wfh_day_eligible`, `meal_on_duty_eligible` | Tenant | As above | false — default-direction | B9 |
| `meal_delivery_mode` | Meal head | As above | None — BV-11 while unset | Tenant |
| `gift_instrument_class` | Gift instrument | As above | None — valued as cash while unattested (BV-16) | Tenant |
| `gift_watch_margin` | Tenant | Payroll/finance | None | Tenant |
| `settlement_model` | FBP head | HR admin | None | Tenant |
| `declaration_open_at`, `declaration_close_at`, `proof_window_open_at`, `proof_lock_at`, `true_up_month` | Pay group, per tax year | HR admin, approved by payroll/finance | None — the cycle stays DRAFT (BV-31) | Tenant |
| `joiner_declaration_window_days`, `leaver_proof_cutoff_days`, `monthly_claim_cutoff_day` | Pay group | As above | None | Tenant |
| `provisional_exemption_policy` | Pay group | Payroll/finance, with the compliance checker | declared (DB-3) | Tenant |
| `proof_checker_threshold` | Tenant | Payroll/finance | None — single approval | Tenant |
| `fbp_cap_proration_on_join` | Tenant | HR admin | None | Tenant |
| `declaration_close_reminder_days`, `proof_lock_reminder_days`, `addition_window_reminder_days` | Tenant | HR admin | None | Tenant |
| `max_spouses`, `max_children`, `parents_allowed`, `parents_in_law_allowed`, `parents_or_in_laws_exclusive` | Policy | HR admin, from the insurer agreement | None (BEN-68) | Insurer terms |
| `child_age_limit`, `child_age_test` | Policy | As above | None | Insurer terms |
| `addition_window_days.<event_type>` | Policy | As above | None | Insurer terms |
| `suspension_endorsement_type` | Policy | As above | None | Insurer terms |
| `allow_cross_employee_dependant` | Policy | As above | None — every probable match goes to review (BEN-67) | Insurer terms |
| `sum_insured_basis`, `sum_insured_salary_base`, `sum_insured_rounding`, `max_sum_insured`, `si_backdating_accepted` | Policy | As above | None | Insurer terms; B3 |
| `premium_basis`, `premium_heads` | Policy | HR admin, with the compliance checker | None | Insurer terms |
| `endorsement_cycle`, `endorsement_ack_sla_days`, `census_field_set`, `insurer_adapter_id` | Policy | HR admin | None | Insurer terms; B3 |
| `census_drift_tolerance` | Policy | HR admin | 0 (BEN-15) | Tenant |
| `esi_exit_addition_class` | Policy | HR admin, from the insurer agreement | None (BEN-68) | Insurer terms; B3 |
| `gratuity_provision_pre_vesting` | Tenant | Finance lead | None — the accrual always carries both the vested and the unvested amount | Tenant |
| `gratuity_continuity_on_transfer` | Tenant | HR admin, with the legal lead | Unset — operator review, never a reset and never a silent carry-over (GX5) | §23's counsel register; B10 |
| `nomination_share_reallocation` | Tenant | Legal lead | Unset — routing holds (N3) | §23's counsel register |
| `rule3b_fund_income_source` | Tenant | Payroll/finance | None — the accretion is an operator-review item while absent | The funds' statements |
| `nps_arrear_attribution` | Product | Statutory desk lead | Unset | B11 |
| `dependant_health_consent_forms` | Tenant | Legal lead | The on-behalf form disabled (DB-7) | §23's counsel register |
| `attach_line.*` | Our finance model | Finance lead | Zero or unverified (BEN-89) | B1, B4, B8; §20 |
| `migration.tieout_tolerance.<head>` | Product | §16.7's owner | §16.7's | §16.7; §20 V-15 |
