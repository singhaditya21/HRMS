## 14. Data Model, Entities & Retention

The data model is where this product's central thesis becomes a schema. If **the filing, not the payslip, is the unit of delivery** (§04, §08 **[Verified]**), then `Filing` is a first-class entity with its own lifecycle, acknowledgement and evidence — not a report generated off a pay run and forgotten. If the 50% wage add-back (Code on Wages s.2(y) / Code on Social Security s.2(88)) creates **multiple concurrent wage bases on one payslip** (§06.10 **[Verified]**), then the schema cannot carry a single `wage` column. And if state rules under the four Labour Codes commence unevenly across states (§06.9 **[Verified]**), then rate/slab/definition storage must be **effective-dated and per-jurisdiction from v1** — with the jurisdiction read from the work location, never from the employee (Part E-5) — not retrofitted when the first multi-state customer complains.

This section specifies the conceptual and logical data model — entities, relationships, keys, cardinality — plus the three things a payroll data model in India lives or dies on: **bitemporal storage, scoped by entity class** (§14.6.1a), **multi-state rule storage**, and a **data-classification / retention / deletion regime that reconciles erasure duties — the Aadhaar purpose-bound retention ceiling today (EV-068), DPDP s.8(7) from on or about 13 May 2027 (EV-058) — against statutory retention duties.** It is a logical model, not a physical schema (no DDL, per the PRD-only constraint); §15 (System Architecture) maps it onto tenancy and storage.

Three conventions used throughout:

- **Entity names** are `PascalCase`; **fields** are `snake_case`; identifiers ending `_id` are internal surrogate keys, identifiers ending `_no` / `_code` are **external government-issued keys with their own format rules** (UAN, PAN, ESI IP, TAN, PF code) that a filing will reject if malformed (see §14.9).
- **Bitemporal** means the row carries `effective_from` / `effective_to` (business-time validity) *and* `recorded_at` / `superseded_at` (system-time / knowledge-time). Only the entity classes listed in §14.6.1a are bitemporal; the erasable classes carry `recorded_at` and an erasure state instead. The distinction is not academic — see §14.6.
- **Acceptance criteria** are stated in `Given / When / Then` form and numbered `AC-DM-nn`; they are the testable contract a physical schema and its access layer must satisfy. They are gathered per-entity where they bite, and are the hooks §20 (Validation Plan) will exercise.

---

### 14.1 Design principles (the invariants the schema must not violate)

These generalise the payroll-engine invariants (§08.1) to the whole data model. Every entity below is designed to these; they are stated once here rather than repeated per-entity.

| # | Principle | Why it is a schema-level invariant, not a feature | Source |
| --- | --- | --- | --- |
| D1 | **Filing is a first-class entity with lifecycle and evidence** | The product's headline metric is "return filed on time and accepted." A filing must persist its generated artefact, portal acknowledgement, challan/UTR, rejection reasons and the exact input snapshot it was built from. The deliverable is a portal-accepted artefact plus attended, assisted filing under written authority to act — never an automated submission — and the employer's statutory liability stays non-delegable, so the entity records who acted and under what authority (§14.4.5; K-13; EV-030). | §04, §08 **[Verified]** |
| D2 | **Bitemporal where replay needs it** — business-time and knowledge-time are separate axes for rules, salary structures, assignments and statutory attributes; the erasable classes are not bitemporal | A March correction filed in September must recompute against March's rules (business time) while recording *when we learned* of the correction (knowledge time). Single-date effective-dating cannot represent "what did we believe in April about March." Punches, rendered documents, biometric templates and consent artefacts must be able to forget, so they sit outside the bitemporal set (§14.6.1a). **[Reversed]** v0.3 made every attribute bitemporal, which contradicted purpose-bound retention and template erasure (K-24). | §06.10 **[Verified]**; Part E-2 |
| D3 | **Rules are data, not code** — every rate, slab, ceiling, definition is a row in `EffectiveDatedRule`, keyed by jurisdiction + effective date | 50% add-back is "or such other per cent as may be notified"; ₹15,000 PF ceiling, ₹21,000 ESI ceiling, state PT slabs, LWF schedules all change by notification. A code deploy per notification is an operating-model failure (§06). | §06.10, §06 **[Verified]** |
| D4 | **Every monetary/statutory field has an immutable audit lineage** — (input × rule_version × formula) → output, with actor, timestamp (NTP-synced), and checker | Required for the six employer registers plus the wage slip (EV-053), retained per each rule-set's own wording (EV-054), for CA read-only audit, and for dispute defence. A wrong payroll number is a legal problem. | §06.9, §07, §17 **[Verified]** |
| D5 | **Tenant is the top partition key on every business row** | Multi-tenant SaaS serving regulated buyers — RBI's IT-outsourcing obligations are materiality-gated, entity by entity (EV-087), and SEBI's cloud framework reaches the provider and its sub-contractors (EV-085) — means tenant isolation is a data-model property, not only an app-layer check. | §17, §15 **[Verified]** |
| D6 | **External government keys are validated to source format at write time, and their linkage state is stored, not just the value** | UAN *seeding status* decides whether a member's line can enter the ECR — an EPFO administrative rule handled by exclude-and-flag, never a payroll block (§07 FR-CHR-005, FR-CHR-101); PAN *availability* drives the higher-rate TDS floor, held as the rule parameter `no_pan_tds_floor` with no shipped default (v0.3's 1961-Act s.206AA wording is carried, not stated as law; 2025-Act mapping pending, §07.1.1); bank *verification status* gates disbursal. The state is as load-bearing as the value. | §07.1.1, §14.9 |
| D7 | **PII/sensitive/regulated fields carry a classification tag that drives encryption, masking, access, residency and retention** | The SPDI Rules 2011 (live — EV-060), the Aadhaar regulations (EV-068), CERT-In (EV-062), sectoral overlays (EV-085–087) and, from on or about 13 May 2027, DPDP (EV-058) differ by field. Classification cannot be a wiki page; it must be attached to the field so policy is enforceable and auditable. | §14.5, §17 **[Verified]** |
| D8 | **Delete is a policy engine, not a `DELETE` statement** — erasure duties, statutory minimum-retention and litigation-hold contend for the same row | Erasure duties — Aadhaar reg 6(5)'s purpose-bound ceiling today (EV-068), DPDP s.8(7) from on or about 13 May 2027 (EV-058) — collide with statutory retention. DPDP s.8(7) is by its text subject to retention "necessary for compliance with any law" (r5/04 finding 40); how the Aadhaar ceiling interacts with a statutory register that names an Aadhaar field is a counsel question (§14.10 item 3). The Codes' registers carry five-year floors (EV-054); other statutory floors are counsel-set parameters (Part D-11). The winner is per-field and time-dependent. | §14.7 |
| D9 | **Money-of-record and attach/benefit money are two ledgers that never blend** | A benefit wallet, insurance endorsement or interchange event must never silently alter a filed statutory figure. The "two lines never blended" GTM rule (§11 **[Verified]**) is enforced structurally, not just in the P&L slide. | §11 **[Verified]** |

**AC-DM-01** — *Given* any business row (Ring 1–3), *When* it is read or written through any interface (app, API, MCP tool, migration importer, admin console), *Then* the query must be scoped by `tenant_id` and a cross-tenant read must be structurally impossible, not merely filtered (D5).

**AC-DM-02** — *Given* any monetary or statutory field on a `PayrollResult` or `Filing`, *When* its value is inspected, *Then* the exact `(input rows, rule_id versions, formula id, actor, checker, NTP timestamp)` that produced it must be resolvable without recomputation (D4).

---

### 14.2 Entity catalogue

The model has **four rings**: (1) tenancy & org, (2) people & the compliance master, (3) the operating record (comp, attendance, pay, filing), and (4) the cross-cutting spine (rules, documents, audit, consent). Ring 4 entities are referenced by almost everything. Two **segregated stores** — the Aadhaar token vault and the biometric template keyspace — sit outside the rings by construction (Part E-6; §14.4.15). The rings are a dependency ordering, not just a grouping: a Ring-3 row is meaningless without its Ring-1/2 parents and its Ring-4 lineage, which is why migration (§14.4.10) imports **outside-in**.

<!-- DIAGRAM: data-model-rings -->

| Entity | Ring | Purpose | Owns / keyed by |
| --- | --- | --- | --- |
| **Tenant** | 1 | The paying customer account; top isolation boundary — one employer establishment group (§15.3.2). | `tenant_id` |
| **Group** | 1 | The corporate group inside a tenant: the node that owns the tenant's legal entities, group-level reporting and (v2) cross-entity transfer policy (§07 FR-CHR-026). Exactly one per tenant. | `group_id` |
| **Employer (LegalEntity)** | 1 | A registered legal employer (company/LLP/firm) under one PAN. Holds TAN(s), GSTIN(s), CIN and the per-state PT enrolment (PTEC) (§07.2a). A Group may hold several. | `employer_id`, `pan` |
| **Registration** | 1 | One statutory registration — EPF code, ESIC code or sub-code, PTRC or PTEC per state, LWF, S&E, LIN, TAN — with its issuer, state, validity range and status. The key every filing instance is raised against (§08 FR-PAY-711). Owned by the establishment, or by the legal entity for TAN and PTEC (§07 FR-CHR-104). | `registration_id`, (`scheme`, `number`) |
| **Establishment** | 1 | A registered place/unit of employment — the unit EPF/ESI/PT/S&E registrations attach to. Per-state, per-code. | `establishment_id`; its registrations via `Registration` |
| **WorkLocation** | 1 | A place where work is performed — an establishment's premises, or a remote worker's own location. Carries the jurisdiction every state rule resolves against: `state_code`, `sphere` (whether the central or the state Government is the appropriate Government) and, per Code, the date that state's Code-era rules commenced (§06.9). Jurisdiction is never an attribute of the employee (Part E-5). | `work_location_id` |
| **Department / CostCentre / Grade** | 1 | Management-hierarchy dimensions; no statutory effect (§07.2). | `*_id` |
| **Employee (Person)** | 2 | Canonical, immutable-lineage person record across rehire/transfer. | `employee_id` (internal, immutable) |
| **Employment (Engagement)** | 2 | A single employment instance: DOJ→DOL, type, establishment mapping. One Person → many Employments (rehire, inter-entity transfer). | `employment_id` |
| **StatutoryIdentifier** | 2 | Typed external IDs with linkage state (UAN+seeding, PAN, ESI IP, PRAN, bank+penny-drop), each at exactly one owning level (§07 FR-CHR-104): person-level for PAN, UAN and ESI IP; PF Member ID on the establishment mapping. Aadhaar is not one of them: it appears in business rows only as an opaque vault token (§14.4.15). | `stat_id_id`, (`type`, `value`) |
| **EligibilityState** | 2 | Effective-dated *derived* flags (PF/ESI/PT/LWF/gratuity applicability). Computed, never typed. | `eligibility_id` |
| **ServiceRecord** | 2 | The continuous-service ledger a person accrues across employments with one legal entity — counted days per twelve-month window, breaks and their treatment, and the gratuity clock (§07 FR-CHR-016). Derived from employments, assignments and attendance; never typed. | `service_record_id`, (`person_id`, `employer_id`) |
| **CompensationStructure** | 3 | A template of ordered `PayComponent`s. | `structure_id` |
| **PayComponent** | 3 | One earning/deduction/reimbursement/statutory/employer-cost line with basis + statutory-inclusion flags (pf/esi/gratuity/pow). | `component_id` |
| **CompensationAssignment** | 3 | Effective-dated binding of an Employment to a structure + component values (CTC revision = new version). | `comp_assign_id` |
| **Punch / DayStatus / FormIXRow** | 3 | The raw source-tagged punch (erasable); the derived day projection; and the Form IX register row carrying per-day IN and OUT timestamps — a present/absent or day-total model is non-compliant (EV-055). Field shapes per §09.1-A. | `punch_id`; (`employment_id`, `date`); (`establishment_id`, `employment_id`, `month`) |
| **LeavePolicy / LeaveBalance / LeaveTransaction** | 3 | Policy, running balance, and the ledger that moves it. | `*_id` |
| **PayRun** | 3 | A period's payroll execution for an Establishment (regular / off-cycle / arrears / bonus / FnF). | `payrun_id` |
| **PayrollResult** | 3 | Per-employee-per-run computed facts, each stamped with the `rule_version` that produced it. | `result_id` |
| **Payslip** | 3 | The rendered artefact off a `PayrollResult` (a document, not the source of truth). | `payslip_id` |
| **Filing** | 3 | **The unit of delivery.** A statutory obligation instance — one registration × obligation × period (ECR, ESI contribution, PT return, Form 138, Form 130 distribution, LWF, register) — with its lifecycle (§08 FR-PAY-711), attempts, acknowledgement and evidence. | `filing_id` |
| **Challan / Payment** | 3 | The money-movement leg of a filing (PF/ESI/PT/TDS challan, EPF TRRN, TDS CRN, UTR, bank NEFT file). | `challan_id` |
| **EffectiveDatedRule** | 4 | Rates/slabs/ceilings/definitions per jurisdiction per effective window. Rules-as-data. | `rule_id`, (`rule_type`, `jurisdiction`, `effective_from`) |
| **Jurisdiction** | 4 | Central + each State/UT (+ a sub-state local body where a state levies at that level). | `jurisdiction_id` |
| **Document** | 4 | Any stored file (appointment letter, TRACES-issued Form 130, proofs, register export) with classification + retention class. An erasable class (§14.6.1a). | `document_id` |
| **ConsentRecord / DataPrincipalRequest** | 4 | A versioned consent artefact per purpose and regime — SPDI r.5(1) written consent today (EV-060), Aadhaar Sharing Reg 5 (EV-068), DPDP once in force (EV-058) — stating whose artefact it is; and the request workflow for access/correction/erasure/grievance/nomination (statutory basis under counsel review, §14.7.3). | `consent_id` (+ `version`), `dpr_id` |
| **AuditEvent** | 4 | Immutable who/what/when/before/after/authority/rule_version for every statutory or monetary change. | `audit_id` |
| **RetentionHold** | 4 | Litigation / investigation / dispute hold that suspends deletion on named rows. | `hold_id` |
| **AadhaarTokenVault** | segregated | Any Aadhaar number an employee chooses to provide, in a separately encrypted, separately access-controlled store; business rows hold only an opaque token (Part E-6; §14.4.15). | `aadhaar_token` |
| **BiometricTemplate / DeviceEnrolment** | segregated | The template in its own keyspace, never referenced by a punch; the per-device enrolment and erasure ledger (Part E-6; §09 FR-DEV-007). | `template_id`; (`employment_id`, `device_sn`) |

<!-- DIAGRAM: data-model-erd -->

#### 14.2.1 Entity register — the consolidated index

The catalogue above says what each entity is. This index says, for each, the four cross-cutting properties the rest of this section assigns: its temporal class (§14.6.1a), its default classification (§14.5), the retention class that governs it (§14.7.4), and the section that owns its behaviour. It exists so that a reviewer can check coverage in one pass — an entity with a blank cell is an unfinished design, not a formatting gap.

| Entity | Temporal class | Default classification | Retention class | Behaviour owned by |
| --- | --- | --- | --- | --- |
| `Tenant`, `Group` | B | C3 | Tenant lifecycle | §15 |
| `LegalEntity` | B | C3, registration numbers C1 | Tenant lifecycle | §07 |
| `Registration` | B | C1 for the number | Tenant lifecycle | §14.4.21, §06 |
| `Establishment` | B | C3 | Tenant lifecycle | §14.4.1, §07 |
| `WorkLocation` | B | C4 | Tenant lifecycle | §07, Part E-5 |
| `RegistrationCoverage` | B | C3 | Tenant lifecycle | §14.3.1 |
| Department / CostCentre / Grade | B | C3 | Tenant lifecycle | §07 |
| `Person` | B for lineage, personal fields under the subject key | C2, C1 for identifiers | Employment record classes | §07 |
| `Employment` | B | C3 | Employment record classes | §07 |
| `StatutoryIdentifier` | B | C1 for values, C3 for states | Employment record classes | §07, §14.4.2 |
| `EligibilityState` | B | C3 | Employment record classes | §14.4.20 |
| `ServiceRecord` | R, derived | C2 | `GRATUITY_SERVICE` | §14.4.19, §07 |
| `CompensationStructure`, `PayComponent` | B | C4 | Tenant lifecycle | §08 |
| `CompensationAssignment` | B | C1 | Employment record classes | §08 |
| `Punch` | E | C2 | Punch ceiling | §09 |
| `DayStatus` | Derived; frozen at lock | C2 | Follows its register instance | §09 |
| `FormIXRow` | R | C2 | `REG_WAGES` | §06, §09 |
| `LeavePolicy` | B | C4 | Tenant lifecycle | §09 |
| `LeaveTransaction` | R | C2 | `REG_OSH` where it feeds Form XX | §09 |
| `LeaveBalance` | Derived | C2 | — derived, never stored | §09 |
| `PayRun` | R | C3 | Follows its results | §08 |
| `InputSnapshot` | R | C1 per part | Longest floor of its consumers (RC1) | §08 FR-PAY-313, §14.4.17 |
| `PayrollResult` | R | C1 | `REG_WAGES` / `TAX_TDS` | §08 |
| `Payslip` | E for the file | C1 | `REG_WAGES` | §08 |
| `Filing` | R | C3, evidence fields C1 | Its obligation's class | §08 FR-PAY-711 |
| Filing ledger row | R | C3 | Its obligation's class | §08 FR-PAY-712, §14.4.22 |
| `Challan` / `Payment` | R | C1 | `TAX_TDS` or the scheme's class | §08 |
| `ExceptionRow` | R | C3, subject fields per the subject | Follows its subject | §08 taxonomy, §14.4.23 |
| `EffectiveDatedRule`, `Jurisdiction` | B | C4 | Never erased (RO3) | §22, §14.6 |
| `Document` | E for the file | Inherits contents (CL2) | Inherits contents | §14.4.8a |
| `ConsentRecord` | E, versioned | C2 | `CONSENT_EVIDENCE` | §07, §14.4.16 |
| `DataPrincipalRequest` | R | C2 | `CONSENT_EVIDENCE` | §14.7.3 |
| `AuditEvent` | R | C1 as ICT logs | `ICT_LOGS` | §17 |
| `RetentionHold` | R | C3 | `ICT_LOGS` | §14.7 |
| `AadhaarTokenVault` | E | Outside the business classes | `AADHAAR_VAULT` — a ceiling | §07, §14.4.16 |
| `BiometricTemplate` | E | C1, separate keyspace | `BIOMETRIC_TEMPLATE` — a ceiling | §09 FR-DEV-007 |
| `DeviceEnrolment` | R | C3 | `ICT_LOGS` | §09, §14.4.16 |
| `FbpDeclaration`, `ProofOfSpend` | B for declarations, E for proof files | C2, C1 where financial | `TAX_TDS` | §11 |
| `Dependant`, `InsurancePolicy`, `Endorsement` | B | C2 | Employment record classes | §11 |
| `NpsSubscription` | B | C1 | `TAX_TDS` | §11 |
| `MigrationBatch`, `OpeningBalance`, `PreviousEmployerIncome`, `CertificateContinuity` | R | C1 | `TAX_TDS` | §16, §14.4.10 |

Two cells deserve the reader's attention. `LeaveBalance` has no retention class because it is never stored — if a retention class ever appears against it, the ledger discipline has been abandoned. And `InputSnapshot`'s retention class is *derived from its consumers* rather than configured, which is the one place in the model where a retention period is computed rather than set (RC1).

---

### 14.3 The ER model — relationships and cardinality

The ERD above renders the entity-relationship model. The relationships that are non-obvious or that people get wrong are called out here, because getting cardinality wrong here is a filing-rejection bug later.

| Relationship | Cardinality | Why it is this and not the naive version |
| --- | --- | --- |
| Tenant → Group → Employer | 1 : 1 : N | A group of related legal entities is one tenant (§15.3.2); billing is at Tenant, filing is at Registration. A CA or bureau does not pool its clients' legal entities into one tenant: each client is its own tenant, and the CA is a cross-tenant actor with read-only access to money-of-record (§15.3.6; AC-DM-30). **[Reversed]** v0.3 described "a CA-run tenant" holding its clients' legal entities, which would have put several unrelated employers inside one isolation boundary. |
| Employer → Establishment | 1 : N | **This is the multi-state pivot.** EPF/ESI/PT/S&E registrations attach to Establishment, not Employer; TAN stays on the legal entity (§07.2). A single PAN with offices in MH, KA, TS has ≥3 PT registrations and possibly ≥3 ESI sub-codes. |
| Person → Employment | 1 : N | Rehire and inter-entity transfer create new Employments under one immutable `employee_id`, preserving gratuity/continuous-service lineage (§07 FR-CHR-001). |
| Employment → Establishment | N : 1 (effective-dated) | The statutory mapping — which PF code, ESI code and registrations the employment files under (§07.2a `establishment_mapping`). A transfer re-points it with an effective date; the prior establishment's returns for the pre-transfer portion are untouched (§07.2). |
| Employment → WorkLocation | N : 1 (effective-dated) | Where the work is performed, and so the source of the jurisdiction — state, sphere, Code-regime commencement — for PT, LWF, S&E and every state rule (Part E-5). Usually the establishment's premises; for a remote employee, their own location. PT follows the work location, never residence or HQ; PT situs for fully remote employees is itself unsettled (§06.13), so the tenant's remote-PT policy is recorded on the assignment. |
| Person → AadhaarTokenVault | 1 : 0..1 (via opaque token) | Optional; absence is a normal state, never an error, and nothing gates on it (§07 FR-CHR-101). |
| Employment → BiometricTemplate | 1 : 0..N | Separate keyspace. A `Punch` never references a template, so destroying one leaves every attendance record valid (Part E-6). |
| Person → ConsentRecord | 1 : N (versioned) | One per purpose × regime; SPDI-regime and DPDP-regime records coexist across on or about 13 May 2027 (Part E-6; EV-058). |
| Person → StatutoryIdentifier | 1 : N | PAN, UAN and ESI IP live on the person, so they survive rehire and exit; a UAN stored per employment would fork on rehire (§07 FR-CHR-104). A person may declare **more than one UAN**: all are recorded, exactly one is `active_for_filing` per period, the rest are `declared_additional` and flagged `MULTIPLE_UAN_DECLARED`; the product never generates, merges or retires a UAN. |
| EstablishmentMapping → PF Member ID | 1 : 1 | PF Member ID is scoped to the establishment code, so an inter-establishment move opens a new one under the same UAN. Modelling PF Member ID as an attribute of Person — or of Employment alone — is a bug. |
| Employment → CompensationAssignment | 1 : N (effective-dated) | Every CTC revision, promotion, or component re-tag is a new version; the current one is `effective_to IS NULL`. |
| CompensationStructure → PayComponent | 1 : N (ordered) | Order matters: "special allowance as balance figure = CTC − Σ(other components)" must evaluate last (§08 FR-PAY-101). |
| PayRun → PayrollResult | 1 : N | One per included employee. |
| PayrollResult → Payslip | 1 : 1 | Payslip is a derived render; regenerating it must reproduce byte-identical output from the same result + template (D4). The rendered file is an erasable class; a re-render is marked as one (§14.6.1a; §08 I4). |
| PayRun → Filing | 1 : N | One monthly regular run feeds **multiple** filings (an ECR per EPF code, an ESI contribution per ESI code, a PT return per state registration, LWF where due). This 1:N is the whole product. |
| Filing → Challan/Payment | 1 : 0..N | An approved ECR return is followed by one or more challans, each with a TRRN — multiple challans are permitted (EV-036). A NIL EPF month has no return file; admin and inspection charges are paid by Direct Challan Entry, enabled only when there are no active members (EV-042). |
| Filing → Document | 1 : N | The generated file, the portal acknowledgement PDF, the challan receipt — all evidence, each retained per its retention class, with the artefact hash kept on the Filing (§14.7.1). |
| Filing → PayrollResult | N : M (via snapshot) | A filing references the exact result rows it was built from; a **retro/arrears filing** references corrections spanning multiple prior runs. This is captured by an input-snapshot, not a live join, so re-opening a later period cannot silently mutate a filed artefact (D2). |
| EffectiveDatedRule → Jurisdiction | N : 1 | Every rule is scoped to Central or a State/UT (or a sub-state local body for certain PT/LWF cases). |
| PayrollResult → EffectiveDatedRule | N : M (recorded) | Each computed figure records which rule version(s) produced it — the audit lineage in D4. |
| AuditEvent → (any entity) | N : 1 (polymorphic) | Every statutory/monetary write emits one. |
| RetentionHold → (any entity) | N : M | A hold can pin an employee, a pay run, or a whole establishment's records. |
| DataPrincipalRequest → Person | N : 1 | Requests attach to the natural person, spanning all their Employments (statutory basis under counsel review, §14.7.3). |

#### 14.3.1 The statutory hierarchy and its temporal constraints

Six levels carry every statutory fact the product files: **Group → Legal entity → Registration → Establishment → Assignment → Service record.** Filing obligations key on the *registration*; a person's pay and deductions key on the *assignment* in force for the period; entitlements that outlive a single employment — gratuity above all — key on the *service record*. Each level has a validity range, and the ranges nest. A cardinality error here is a filing-rejection bug; a temporal error is a wrong month filed under the right code.

<!-- DIAGRAM: data-model-statutory-hierarchy -->

| Level | Entity | Parent · cardinality | Temporal class (§14.6.1a) | Validity range | What reads it |
| --- | --- | --- | --- | --- | --- |
| 1 | `Group` | Tenant 1 : 1 | B (bitemporal) | `valid_from` at onboarding; name and reporting attributes versioned | Consolidated reporting; v2 cross-entity transfer policy (§07 FR-CHR-026) |
| 2 | `LegalEntity` | Group 1 : N | B | `valid_from` (onboarded or incorporated) to `valid_to` (ceased or offboarded) | PAN, TAN(s), GSTIN(s), CIN, PTEC per state (§07.2a); Form 138 series per TAN |
| 3 | `Registration` | Owned by an Establishment (EPF code, ESIC code, PTRC, LWF, S&E, LIN) or by the LegalEntity (TAN, PTEC) · 1 : N | B | `valid_from` (the registration's effective date as issued) to `valid_to` (surrender, cancellation or closure); `status ∈ {applied, active, suspended, surrendered, cancelled}` | Filing instances (§08 FR-PAY-711); the ECR ledger (§08 FR-PAY-712); the calendar (§06.11) |
| 4 | `Establishment` | LegalEntity 1 : N; optional `parent_establishment_id` for sub-code and extension rows (§07 FR-CHR-021) | B | `opened_on` to `closed_on`; premises as a `WorkLocation` | Headcount per counting unit (§14.4.1); register instances (EV-053) |
| 5 | Assignments — `EstablishmentMapping`, `WorkLocationAssignment`, `OrgAssignment`, `CompensationAssignment`, deductor-TAN assignment | Employment 1 : N each | B | Closed-open `[from, to)` inside the employment's `[DOJ, DOL]` | Rule resolution (§14.6.3); ECR routing; PT state; pay (§08) |
| 6 | `ServiceRecord` | (Person × LegalEntity) 1 : 1 | R (records of fact) — derived, never typed | From the first employment's DOJ (or the migrated `gratuity_clock_start`, §14.4.10) to the last DOL | Gratuity eligibility and payout (§07 FR-CHR-016; §14.4.4 FnF); EPS service tests (§06.2) |

**Registration coverage.** An establishment does not always hold its own code for every scheme: §07.2's worked manufacturer runs a Bengaluru sales office "same PF code or a sub-code" as its Pune plant. The model therefore separates *ownership* from *coverage*. `RegistrationCoverage (establishment_id, registration_id, scheme, [from, to))` says which registration an establishment files each scheme under on each date — its own, or one owned by an ancestor establishment of the same legal entity. A sub-code that ESIC or EPFO allots separately is its own `Establishment` row with its own `Registration` (§07 FR-CHR-021), never a coverage row.

**Temporal constraints (the invariants a physical schema must hold).**

| # | Constraint | Enforced at | Failure it prevents |
| --- | --- | --- | --- |
| T1 | **Nesting.** A child's validity lies inside its parent's at every level: registration inside its owner; establishment inside its legal entity; every assignment inside its employment; an `EstablishmentMapping` inside the mapped establishment's range | Write time; a violating write is refused with the conflicting range | A mapping to a closed establishment; a registration outliving its entity |
| T2 | **Coverage.** For every date on which an employment is mapped to an establishment and eligible for scheme S (derived `EligibilityState`), exactly one covering registration for S is active — or the gap is an explicit `registration_pending` exception | Readiness check before `INPUTS_CLOSED` (§08 FR-PAY-301) and at filing-instance creation | A deduction with no registration to remit it under — the silent under-remittance §14.4.1 names |
| T3 | **No gaps, no overlaps** in any assignment type within an employment, closed-open (§07.2a) | Write time; concurrent edits to one range serialised (§07.2a) | Two establishments claiming one employee-day; a day with no PT state |
| T4 | **Uniqueness.** At most one active registration per (owner, scheme, state) on any date; one (scheme, number) never belongs to two owners in a tenant; uniqueness is never checked across tenants (§07 FR-CHR-104) | Write time | Two PTRC rows for one state; a cross-tenant disclosure |
| T5 | **Closure never deletes.** Surrender, cancellation or closure sets `valid_to`. No filing instance can be created for a period wholly after `valid_to`; every due period up to it stays in the ledger until filed or explicitly resolved — a closing registration cannot silently abandon a month (Part E-10; EV-038) | Filing-instance creation; the FR-PAY-712 ledger | A final month nobody files; an obligation that vanishes with the code |
| T6 | **Late knowledge is a new row.** A registration obtained with a back-dated effective date is recorded as a new knowledge-time version; `registration_pending` liabilities for the covered dates are re-pointed to it through a correction path, never by editing a filed artefact | Registration write; the correction-run machinery (§14.4.4) | Rewriting history when a PT certificate arrives three months late |
| T7 | **Straddled periods are surfaced, not assumed.** A period that straddles a registration's `valid_from` or `valid_to` resolves per sub-period (§14.6.3 step 1) and is flagged for operator review; how each portal treats a part-period is a rule-row question routed to §20, never a schema assumption | Readiness check | A guessed part-month split on a surrendered code |
| T8 | **The service record is derived only.** It is recomputed from employments, assignments and the counted days frozen at each period lock; a break's treatment (bridged or breaking) is an audited decision with a basis and an actor; nothing writes a service total by hand | Derivation job; maker-checker on break treatment | A hand-edited gratuity clock |

**The service record, precisely.** `ServiceRecord` holds `segments[]` (one per employment with the legal entity, each `[DOJ, DOL]`), `counted_days` per twelve-month window (the CoSS s.54 day count, §06.6 **[Verified]** — lay-off, paid earned leave, temporary disablement from employment injury and maternity leave up to 26 weeks counted), `breaks[]` with `break_treatment ∈ {bridged, breaks_service}` plus `basis` and `decided_by`, `clock_start`, and a reference to the eligibility-test rule version (`gratuity.four_years_240_days_rule`, §07 FR-CHR-016 **[Hypothesis]**). It is keyed to the legal entity because the employer is the unit the gratuity obligation binds (§06.6), and how service carries across legal entities in a group is the v2 group-transfer decision (§07 FR-CHR-026), so v1 never bridges two entities automatically — a carry-over is an explicit `break_treatment` with its basis recorded. Counted days are read from the input snapshot frozen at each `INPUTS_CLOSED`, never from punches, so erasing punches changes no service total (§14.6.1a).

**Worked example — one transfer, three levels moving.** The §07.2 manufacturer: one legal entity; a Pune plant owning the EPF code, the ESIC code and the Maharashtra PTRC; a Bengaluru sales office owning the Karnataka PTRC and covered for EPF by the Pune code; a remote engineer working from Assam, where the entity holds no PT registration. A salesperson moves from Pune to Bengaluru on 16 September.

- *Assignments:* her `EstablishmentMapping` closes at `[…, 16-Sep)` on Pune and opens `[16-Sep, …)` on Bengaluru; her `WorkLocationAssignment` moves from Maharashtra to Karnataka on the same date; her `OrgAssignment` need not move at all (§07.2).
- *Registrations:* September's PT resolves per sub-period (§14.6.3) against the Maharashtra row for 1–15 September and the Karnataka row for 16–30 September. Whether she belongs on the Maharashtra PTRC return, the Karnataka one, or both for September depends on each state's part-month treatment, which this PRD has not captured — so the month is flagged for operator review and nothing is guessed (T7; §14.10 item 12). Her EPF line stays in the single ECR under the Pune code, because Bengaluru's EPF coverage row points at it.
- *Service record:* unchanged and unbroken — same legal entity, same `ServiceRecord`, one continuous segment.
- *The Assam engineer:* T2 fails for PT if the tenant's remote-PT policy follows the work location, so the readiness report shows `registration_pending` for Assam rather than a zero line (§14.4.1).

**AC-DM-37** — *Given* an establishment whose `closed_on` is 31 March, *When* an `EstablishmentMapping` starting 1 April is written against it, *Then* the write is refused with the conflicting range (T1), and no filing instance for April or later can be created against that establishment's registrations (T5).

**AC-DM-38** — *Given* an employment mapped to an establishment that has no active covering registration for a scheme the employment is eligible for, *When* the readiness check runs before `INPUTS_CLOSED`, *Then* the gap surfaces as `registration_pending` with the scheme, state and dates, the liability is computed and held, and payroll is not blocked (T2).

**AC-DM-39** — *Given* a PTRC surrendered with `valid_to` = 30 June, *When* the filing ledger is read in September, *Then* every due period up to 30 June is present with its own status — filed, or flagged as missed — and none after it is created; the ledger cannot report the registration as clean while a due period is unfiled (T5; Part E-10).

**AC-DM-40** — *Given* a person rehired by the same legal entity after a break, and separately employed by a second legal entity in the same tenant, *When* gratuity eligibility is evaluated, *Then* the first legal entity's `ServiceRecord` carries both segments with the break's recorded treatment and basis, the second legal entity's `ServiceRecord` is separate, and no service is carried between the two entities without an explicit, audited `break_treatment` (T8; §07 FR-CHR-026).

**AC-DM-41** — *Given* a locked period whose punches are later erased, *When* the `ServiceRecord` is recomputed, *Then* its counted days are unchanged, because they are read from the frozen input snapshot and never from punches (T8; §14.6.1a).

#### 14.3.2 The assignment layer — five effective-dated bindings, and what each one moves

Level 5 of §14.3.1 is not one entity. It is five independent effective-dated bindings on the same `Employment`, each with its own range, its own writer and its own statutory consequence. Collapsing them into a single "employee record with a location and a salary" is the single most common schema shortcut in Indian payroll products, and it produces two specific defects: a transfer that silently re-points a filed ECR, and a CTC revision that drags a PT state with it.

| Assignment | Binds | Who may write it | What it re-points | What it must **not** touch |
| --- | --- | --- | --- | --- |
| `EstablishmentMapping` | Employment → Establishment | HR admin, maker-checker | EPF code, ESIC code and PTRC routing for the period; opens a new PF Member ID under the same UAN (§14.9) | The person-level UAN, PAN and ESI IP; any prior establishment's filed return |
| `WorkLocationAssignment` | Employment → WorkLocation | HR admin, maker-checker | The jurisdiction — state, sphere, per-Code regime commencement — every state rule resolves against (Part E-5) | The establishment mapping; a remote employee can sit in a state where no establishment exists |
| `CompensationAssignment` | Employment → CompensationStructure + values | Comp owner, maker-checker | Every wage base: s.2(y) wages, ESI gross, gratuity base, POW base (§14.4.3) | The jurisdiction; the establishment; the tax-regime election |
| `OrgAssignment` | Employment → Department / CostCentre / Grade / manager | HR admin | Reporting and cost allocation only | Nothing statutory — an org move with no other change produces no filing consequence at all |
| Deductor-TAN assignment | Employment → TAN on the `LegalEntity` | Payroll owner, maker-checker | Which Form 138 series the employee's TDS lands in (§07 FR-CHR-104) | The PF/ESI routing; a TAN change does not move an establishment |

The separation is testable: five assignment types × "moved / unmoved" is a 2⁵ space, and the product's own regression corpus walks the five single-variable moves plus the two multi-variable moves that actually occur (inter-state transfer = mapping + work location; promotion with relocation = mapping + work location + comp + org).

<!-- DIAGRAM: data-model-assignment-splits -->

**Split algorithm.** Every assignment range is closed-open `[from, to)` (§07.2a). A change effective on date `D` is executed as one transaction:

1. Locate the row `R` whose range contains `D`. If none exists, the write is refused — a gap is not a valid starting state (T3).
2. Write `R.to = D`. If `R.from = D`, `R` is superseded outright rather than closed to a zero-length range.
3. Insert `R'` with `from = D`, `to = R.to_original`, carrying the new value.
4. Re-run T1 (nesting inside the employment and inside the parent's own range) and T2 (covering registration for every scheme the employment is eligible for on every date in both halves).
5. Emit one `AuditEvent` per row written, with the change request as `authority`.
6. Recompute the filing fan-out for every period the split touches, and mark any period that now straddles a boundary for operator review (T7).

Steps 4 and 6 are the ones products skip. Step 4 is what stops a transfer into an establishment whose registration was surrendered last quarter; step 6 is what stops September looking clean when the month now owes two PT returns instead of one.

**Decision table — what a change of effective date does, by period state.**

| Period state at the time the change is recorded | Effective date `D` falls in | Model behaviour | Filing consequence |
| --- | --- | --- | --- |
| `OPEN` | this period | Split in place; snapshot not yet frozen | Fan-out recomputed; nothing filed yet |
| `INPUTS_CLOSED` | this period | Split in place **and** the snapshot is superseded — a reopen to `OPEN` with the prior snapshot kept (§14.4.16) | Fan-out recomputed from the new snapshot |
| `PROCESSED` / `APPROVED` | this period | Split in place, approval voided with its reason kept, reprocess required | Artefacts not yet generated; no correction path needed |
| `LOCKED` or later | this period | Split recorded as a **new knowledge-time version**; the locked snapshot is untouched; a correction run carries the delta | Correction attempt linked by `corrects_filing_id`, routed within the EV-037 guards |
| any | a **future** period | Split in place; future periods have no snapshot | None until that period opens |
| any | a period **before** the tenant's cutover date (§14.4.10) | Refused: the model does not create assignment history behind a migration boundary it has no inputs for | None; the operator records it on the `MigrationBatch` instead |

**Negative cases (each of these must fail loudly, not quietly succeed).**

| # | Attempted write | Expected failure |
| --- | --- | --- |
| N1 | `EstablishmentMapping` starting 1 April against an establishment closed 31 March | Refused with the conflicting range (T1) |
| N2 | Two `WorkLocationAssignment` rows whose ranges overlap by one day | Refused; the overlap day is named in the error (T3) |
| N3 | A `CompensationAssignment` with `from` after `to` | Refused at write time; a zero-length or inverted range is never storable |
| N4 | A transfer that leaves 3–7 April with no `EstablishmentMapping` | Refused; a gap inside an employment is not a valid state (T3) |
| N5 | An org move written as a change to `EstablishmentMapping` because the two were conflated | Not detectable by the schema — which is exactly why they are separate entities; the regression corpus asserts that an org-only move produces **zero** filing-fan-out change |
| N6 | A deductor-TAN change back-dated across a filed quarter | Recorded as a new knowledge-time version; the filed Form 138 series is untouched and the delta is a correction statement (§08 FR-PAY-708) |
| N7 | A work-location move into a state with no PT registration, written with `registration_pending` suppressed | Refused; `registration_pending` is not a suppressible flag (T2) |

**AC-DM-46** — *Given* an employment with the five assignment types in force, *When* an `OrgAssignment` change is committed with no other change, *Then* the filing fan-out for every affected period is byte-identical to its pre-change state, no `EligibilityState` row is written, and no rule resolution input changes.

**AC-DM-47** — *Given* a transfer effective mid-period that moves both `EstablishmentMapping` and `WorkLocationAssignment`, *When* the split transaction commits, *Then* both prior rows are closed at the same date, both new rows open at it, no gap or overlap exists in either type, exactly one `AuditEvent` per written row is emitted, and the period is marked straddled for operator review (T7).

**AC-DM-48** — *Given* any assignment write whose range violates T1, T3 or T4, *When* it is attempted, *Then* the whole transaction is refused with the conflicting range named, and no partial write — no closed prior row without its successor — is ever visible to a reader.

#### 14.3.3 Worked instantiation — one tenant, every level, one month

The §07.2 manufacturer, instantiated as rows. This is the shape a build team should be able to reproduce from the model without asking a further question. Every figure is one this PRD has already established; nothing here is new evidence.

**Ring 1 rows.**

| Entity | Row | Notes |
| --- | --- | --- |
| `Tenant` | T-1 | The paying account; top partition key on every row below (D5) |
| `Group` | G-1 | Exactly one per tenant |
| `LegalEntity` | LE-1, one PAN | Holds TAN-1 and the two PTEC registrations |
| `Establishment` | E-PUNE (plant), E-BLR (sales office) | E-BLR has `parent_establishment_id = NULL`; it is a separate establishment, not a sub-code |
| `WorkLocation` | WL-PUNE (MH), WL-BLR (KA), WL-ASSAM (AS, a remote engineer's own location) | Each carries `state_code`, `sphere` and the per-Code regime commencement date |
| `Registration` | R-EPF (owned by E-PUNE), R-ESIC (E-PUNE), R-PTRC-MH (E-PUNE), R-PTRC-KA (E-BLR), R-TAN (LE-1), R-PTEC-MH and R-PTEC-KA (LE-1) | TAN and PTEC on the legal entity; the rest on establishments (§14.4.1) |
| `RegistrationCoverage` | (E-BLR, R-EPF, `epf`, [opened, ∞)) | E-BLR files EPF under the Pune code; it owns no EPF registration of its own |

**The coverage matrix that results** — read down a column to see what one establishment files, across a row to see which registration a scheme resolves to:

| Scheme | E-PUNE files under | E-BLR files under | WL-ASSAM employee |
| --- | --- | --- | --- |
| EPF | R-EPF (own) | R-EPF (coverage row) | R-EPF via the employee's establishment mapping |
| ESI | R-ESIC (own) | R-ESIC only if a coverage row exists; otherwise the readiness check raises `registration_pending` | As mapped |
| PT (employer, PTRC) | R-PTRC-MH | R-PTRC-KA | **None** — `registration_pending` for AS (T2) |
| PT (entity, PTEC) | R-PTEC-MH on LE-1 | R-PTEC-KA on LE-1 | Not an employee-level fact at all (§14.4.13) |
| TDS | R-TAN on LE-1 | R-TAN on LE-1 | R-TAN on LE-1 |

**Ring 2 and the assignment layer for one employee.** Priya, hired 1 June, working from the Bengaluru office, monthly gross ₹18,000.

| Row | Value |
| --- | --- |
| `Person` P-1 | `employee_id` immutable across any future rehire |
| `Employment` EM-1 | `[1-Jun, ∞)`, `type = permanent` |
| `EstablishmentMapping` | `[1-Jun, ∞)` → E-BLR; PF Member ID opened under R-EPF |
| `WorkLocationAssignment` | `[1-Jun, ∞)` → WL-BLR (KA) |
| `CompensationAssignment` | `[1-Jun, ∞)` → structure S-1 |
| `StatutoryIdentifier` | UAN (`seeding_status = seeded`), PAN (`availability = present`), ESI IP (`registration_status = registered`) on `Person`; bank account `verification_status = verified` |
| `EligibilityState` | EPF `covered` from 1-Jun; ESI `covered` from 1-Jun (gross ₹18,000 is below the ₹21,000 ceiling, §06.3); PT `covered` under KA from 1-Jun |
| `ServiceRecord` | (P-1 × LE-1), one segment from 1-Jun, `clock_start = 1-Jun` |

**September, computed.** Using only figures already established in this PRD:

- **EPF.** If the employer contributes on the ceiling, the PF basis is ₹15,000: employee EPF 12% × ₹15,000 = **₹1,800**; employer EPS 8.33% × ₹15,000 = **₹1,250**; employer EPF = the remainder, **₹550**; EDLI 0.5% × ₹15,000 = **₹75** (§06.2, EV-035 fixture). Admin charges rest on the `epf.admin_charge` and `epf.admin_charge.minimum` parameters, which are **[Hypothesis]** (§06.2) and therefore appear on the readiness report as an unconfirmed line, not as a deduction the product asserts.
- **ESI.** Gross ₹18,000 is below the ₹21,000 coverage ceiling, so ESI applies on actual gross: employee 0.75% × ₹18,000 = **₹135**; employer 3.25% × ₹18,000 = **₹585** (§06.3).
- **PT (Karnataka).** Monthly salary ₹18,000 is below the ₹25,000 threshold, so **nil** for September. Had she been at or above ₹25,000, the row would deduct ₹200 a month and ₹300 in February, totalling ₹2,500 a year (§06.4) — the February top-up is what engineers the annual figure, which is why a PT rule payload cannot be a single monthly amount (§14.6.2a).
- **TDS.** Resolved against the `tds_slab` / `standard_deduction` / `rebate_87a` rows in force for the Tax Year; the figures in §06.5 are a worked base and **[Hypothesis]** for Tax Year 2026-27, so nothing is asserted here.

**The filing fan-out for that one month, at the tenant level.** One regular `PayRun` per establishment produces:

| Filing instance | Registration | Jurisdiction | Why it exists |
| --- | --- | --- | --- |
| `ECR` × 1 | R-EPF | Central | Both establishments' EPF-eligible members file under one code, because of the coverage row |
| `ESI_CONTRIB` × 1 | R-ESIC | Central | Only the members whose establishments are covered |
| `PT_RETURN` × 2 | R-PTRC-MH, R-PTRC-KA | MH, KA | One per state registration (AC-DM-03) |
| `PT_RETURN` — Assam | *none* | AS | No registration exists; the liability surfaces as `registration_pending` rather than a zero line |
| `LWF` | per state where the state levies | MH, KA | `lwf_schedule` rows; **[Hypothesis]** outside Karnataka's verified cycle (§06.8) |
| `TDS_138` | R-TAN | Central | At quarter end, not monthly |
| `STAT_REGISTER` | per establishment | Central + state forms | Register instances per §14.4.17 |

Six to eight filing obligations a month from one 60-person employer with two offices — which is the §13 observation that **revenue scales per employee while the dominant cost scales per registration** (EV-088), expressed as rows rather than as a chart. The data model is where that mismatch becomes countable: `COUNT(Registration WHERE active)` per tenant is the cost driver, and it is a first-class number in the schema, not something a finance team reconstructs from invoices.

**AC-DM-49** — *Given* the tenant above, *When* the September month reaches `LOCKED`, *Then* the filing instances created are exactly one `ECR`, one `ESI_CONTRIB`, two `PT_RETURN`s and the register instances due for each establishment; the Assam liability appears as `registration_pending` with its state, scheme and dates; and the count of active registrations is queryable per tenant as a single number without reading any filing.

#### 14.3.4 Worked example — a mid-year revision, and everything it versions

The transfer example moves assignments across establishments. This one moves nothing but money, and is included because it is the change customers make most often and the one a naive schema handles worst: it touches one assignment type and fans out into four stored artefacts, none of which may be edited.

*Setup.* The ₹75,000-a-month employee of §14.4.3a. On 1 November a revision raises total monthly remuneration, effective from 1 November. September and October are `LOCKED` and filed. November is `OPEN`.

| What changes | What happens in the model |
| --- | --- |
| `CompensationAssignment` | The current row closes at `[…, 1-Nov)`; a new row opens at `[1-Nov, …)`. Two versions, no edit. The prior row stays resolvable for every replay of September and October (RI9, RO-equivalent for assignments) |
| The four bases | Recomputed for November onward only. September's and October's stored bases are untouched — they were correct under the assignment in force then |
| `EligibilityState` | Re-evaluated for November. If the revision crosses the ESI coverage ceiling, coverage continues to the **contribution-period boundary**, not to 1 November (E2) |
| The add-back test | Re-runs against the new component set. If the excluded heads now exceed one-half of total remuneration, an add-back arises from November — a different s.2(y) wage, a different PF basis if the employer contributes on actuals, and a different gratuity base |
| September and October filings | **Nothing.** They reference their own snapshots and their own assignment versions |
| The `ServiceRecord` | Nothing — service is a function of employment and counted days, not of pay |

*The retro variant, which is the one that costs money.* Suppose instead the revision is recorded in November but effective from 1 September.

1. The assignment splits at 1 September, and September and October now resolve to the new row for replay purposes at **knowledge time = now**, while the original knowledge time still resolves to the old row (§14.6.4a RM2).
2. September's and October's filed artefacts are untouched. They were correct under what was known then.
3. An arrears run computes the delta with `applies_to_period = September and October`, `run_in_period = November`, against **September's and October's** rule versions (D2).
4. The PF liability on the arrears dates from the arrears run's **disbursal date**, not from September (Part E-9) — and that date is surfaced when the arrears batch is approved, not discovered later.
5. The delta routes to whatever filing path the guards permit: for EPF, a Revised return only if no payment has been initiated for that month; otherwise the arrear flow, which is fenced because no arrear file layout is published (EV-037, EV-043).
6. Every one of these is additive. There is exactly one mechanism for changing a locked month, and it is a diff (Part E-1).

*What a naive schema does instead.* It updates the salary on the employee record, recomputes September, and either silently changes a filed figure or produces a September payslip that no longer matches the September return. Both outcomes are discovered by the employee or by the portal, not by the product.

**AC-DM-106** — *Given* a revision effective from a locked period, *When* it is recorded, *Then* the locked periods' stored results, payslips and filing artefacts are byte-identical afterwards, the delta exists only as arrears rows tagged with both periods, and the PF liability date on those rows is the arrears disbursal date.

#### 14.3.5 Cardinality invariants — what a conformance check counts

Cardinality written as "1 : N" in a table is a design statement. These are the same statements as **counts a check can assert**, against the §14.12.1 fixture, so that a schema drifting away from the model is caught by arithmetic rather than by review.

| # | Invariant | Fixture value | What a violation means |
| --- | --- | --- | --- |
| CN1 | `COUNT(Group) = 1` per tenant | 1 | A second group means two corporate structures inside one isolation boundary |
| CN2 | `COUNT(LegalEntity) ≥ 1` per group | 1 | — |
| CN3 | `COUNT(Registration WHERE active AND scheme = S AND owner = O AND state = J) ≤ 1` on any date | 1 per (owner, scheme, state) | Two PTRC rows for one state (T4, RI6) |
| CN4 | `COUNT(RegistrationCoverage WHERE establishment = E AND scheme = S)` overlapping on any date `= 1` | 1 per (establishment, scheme) | An establishment filing one scheme under two codes for one day (RI24) |
| CN5 | `COUNT(ServiceRecord) = COUNT(DISTINCT (person, legal_entity))` | one per pair | Two gratuity clocks for one history (RI8) |
| CN6 | For each employment and each assignment type, the ranges tile `[DOJ, DOL]` exactly — no gap, no overlap | 5 tilings per employment | T3, RI9 |
| CN7 | `COUNT(EstablishmentMapping WHERE employment = M)` active on any date `= 1` | 1 | An employee-day claimed by two establishments |
| CN8 | `COUNT(ledger rows) = Σ over registrations of (applicable obligations × periods inside validity)` | Deterministic from the fixture | A silently abandoned obligation, or a double-counted one (RI14) |
| CN9 | `COUNT(PayrollResult) = COUNT(employees included in the run)` per run | Deterministic | A missing or duplicated employee in a run |
| CN10 | `COUNT(Payslip) = COUNT(PayrollResult)` per locked run | 1 : 1 | A result with no slip, or a slip with no result |
| CN11 | `COUNT(AuditEvent WHERE txn = X) = 1` for every statutory or monetary write | 1 per write | A change with no lineage, or a double-logged change (RI15, AC-DM-20) |
| CN12 | `COUNT(active_for_filing UAN per person per period) ≤ 1` | 1 where a UAN exists | Two UANs both claiming a member's line |
| CN13 | `COUNT(AadhaarTokenVault rows per person) ≤ 1` | 0 or 1 | A second vault entry means the token is not the single reference the model claims |
| CN14 | `COUNT(rows in the resolvable set per rule_key per knowledge time with overlapping effective ranges) = 0` | 0 | RO4, RR9 |
| CN15 | `COUNT(fields with no classification) = 0` and `COUNT(stored object types with no retention class) = 0` | 0 | CL4, RI19 |

**Why these are written as counts.** Every one of them is a query that runs in a test in milliseconds and that a reviewer can read without knowing the codebase. A model whose invariants can only be checked by reading code is a model that will be eroded by the third urgent delivery, and the erosion will be invisible until a return is rejected.

**AC-DM-114** — *Given* the fixture loaded through the product's own write paths, *When* the cardinality conformance check runs, *Then* every CN invariant holds; a failing CN invariant blocks release and names the entity, the tenant and the offending rows.

---

### 14.4 Entity deep-dives (the load-bearing ones)

Only the entities whose *field-level* shape is non-obvious or India-specific are expanded. Identity/master fields are specified in §07.1 and not repeated; here we specify the fields that exist *because of a statute or a filing format*.

#### 14.4.1 Establishment — the registration hub

The naive model attaches PF/ESI/PT to the company. In India they attach to the **establishment/registration**, and one company routinely holds many. This entity is the reason multi-state "just works" or doesn't.

| Field | Notes | Source |
| --- | --- | --- |
| `epf_code` | Establishment code allotted by EPFO — region/office/establishment code with an optional extension or sub-code, each extension a separate establishment row (§07 FR-CHR-021). The ECR is filed per code. The mask is the versioned validation rule `id_format.epf_code`, carried and desk-verified before GA (§07.1.1). **[Reversed]** v0.3 gave a digit-count example here as Verified; no research round captured EPFO's own specification. | EPFO establishment registration; mask **[Hypothesis — carried, not re-captured]** |
| `esi_code` | ESI employer code; **sub-codes** per state/branch office are common, each a separate establishment row that files separately (§07 FR-CHR-021). The 17-digit length is carried in `id_format.esic_code`. | ESIC registration; length **[Hypothesis — carried, not re-captured]** (§07.2) |
| `pt_reg_no` (PTRC) | The state PT employer registration — the establishment as deductor — held per state; an establishment with staff in two PT-levying states holds two. There is no per-employee PT enrolment; the employee-level fact is the derived PT eligibility (§07 FR-CHR-104). The entity's own PT enrolment (PTEC), which also covers each director's PT, sits on the `LegalEntity`, not here (§07 FR-CHR-022; r1/06 finding 30). Maharashtra assigns the PTRC return frequency per registration each year, so frequency is ingested, never derived (§06.4). **[Reversed]** v0.3 put both certificates on the establishment. | State PT Acts; §07.2 |
| `lwf_reg_no` | State LWF registration where the state runs an LWF. Which states levy, the amounts and the periodicity are compilation-sourced; the one verified periodicity is Karnataka's calendar-year cycle with a 15 January due date (§06.8). | State LWF Acts; periodicity **[Hypothesis]** outside Karnataka (§06.8) |
| `se_reg_no`, `se_state` | Shops & Establishments registration — per-state; the register, leave and hours rules and the threshold are set by each state Act. | State S&E Acts; thresholds **[Hypothesis]** (§07.2, §06.1) |
| `tan` (reference) | The legal entity's TAN, referenced rather than owned: TAN sits on the legal entity, PF/ESI/PT/LWF codes on the establishment (§07.2). Form 138 (ex-24Q — EV-050) is filed per TAN. A company may run multiple TANs; each runs its own Form 138 series, and the employee's deductor TAN is an effective-dated assignment (§07 FR-CHR-104). | §07.2; the 1961-Act s.203A citation is carried and its 2025-Act successor is unmapped (§06.13) |
| `gstin` (reference) | The legal entity's GSTIN for this establishment's state, held on the `LegalEntity` (§07.2a) and referenced here; not a payroll key, used for invoicing and reconciliation. | CGST Act; §07.2 |
| `lin` | Labour Identification Number — the "Registration Number of the establishment" on the Form I register header (r5/04 finding 16) and a column of the principal employer's annual return (r5/04 finding 20). | §07 FR-CHR-022 **[Verified]** |
| `premises_work_location_id` | The establishment's own premises as a `WorkLocation` (state, sphere, Code-regime commencement). Rule resolution reads the jurisdiction from each employment's work-location assignment for the period — this location for on-premises staff, the employee's own location for remote staff (§14.6.3). **[Reversed]** v0.3 put a single `jurisdiction_id` on the establishment, which mis-resolves remote staff (Part E-5). | Part E-5 |
| `nic_code`, `hazardous_flag` | Drives Second-Schedule employee-compensation applicability and the docks/mines/construction health-check confinement (§06.1). | CoSS Second Schedule; notified Rules **[Verified]** |
| `headcount_tracked[counting_unit]` | A running count per **counting unit** — employees, persons, workers, contract labour — because the statutes count different populations and one establishment can be above one line and below another on the same day (EV-057). Holds the latched value where the obligation's wording latches (§06.1). Drives the 10/20/50/100/300 obligation gates so a threshold crossing arms the right filings automatically. | EV-057; §06.1 **[Verified — central sphere]** |

**Edge case — new-state operation without registration.** An employee physically working in a state where the employer has *no* PT registration yet (new market entry, remote hire): the model stores the derived PT liability with a `registration_pending` state so the readiness report flags "PT due, no registration" rather than silently under-remitting — a common source of interest/penalty.

**Edge case — the obligation latch.** The 10-employee gratuity and maternity tests read "employed, or were employed, on any day of the preceding twelve months," so they **latch once crossed** and do not un-arm when headcount dips (§06.1 **[Verified]**). ESI's and EPF's Code-era latch wording is unconfirmed (§06.13), so latching is a per-obligation rule attribute (`latch_rule`), not a schema assumption. `headcount_tracked` stores the *peak-in-trailing-12-months* per counting unit where the rule latches, and `EligibilityState` transitions are driven off the rule, never off a spot count.

**AC-DM-03** — *Given* a legal entity with establishments in MH, KA and TS, *When* the September payroll month is LOCKED, *Then* the readiness report lists exactly three distinct PT `Filing` obligations keyed to three `pt_reg_no`s, and any work-location state lacking a `pt_reg_no` surfaces as `registration_pending`, never as a zero-liability line.

**AC-DM-04** — *Given* an establishment that employed 10 employees on a single day in the trailing twelve months, *When* headcount later falls to 8, *Then* gratuity and maternity applicability in `EligibilityState` remain armed (latch, §06.1), EPF and ESI follow their rule rows' `latch_rule` (Code-era wording unconfirmed, §06.13), and disabling any latched obligation requires an explicit, audited administrative action with a statutory basis, not an automatic de-arm.

#### 14.4.2 Employee, Employment, StatutoryIdentifier

`Person` is immutable-identity; `Employment` is the instance. `StatutoryIdentifier` is modelled as a **typed, effective-dated, linkage-stateful** child rather than columns on Employee, because the *state* of each ID is what gates filings. Each identifier sits at exactly one owning level (§07 FR-CHR-104), and every value mask is a versioned validation rule `id_format.<identifier>` — most carried from v0.3 and desk-verified against the issuer's specification before GA (§07.1.1):

| ID type | Owning level | Value format | Linkage state stored (the load-bearing part) | Gates |
| --- | --- | --- | --- | --- |
| UAN | `Person` | 12 numeric (length carried, `id_format.uan`); field 1 of the ECR file (EV-035) | `seeding_status` (pending / seeded / mismatch), `transfer_status`, `filing_role` (`active_for_filing` / `declared_additional`) | Whether the member's line can enter the ECR — unseeded is exclude-and-flag, never a payroll block (§07 FR-CHR-101); a second declared UAN raises `MULTIPLE_UAN_DECLARED` |
| PAN | `Person` | `AAAAA9999A` (mask carried, `id_format.pan`) | `availability` (present / not-available → the `no_pan_tds_floor` parameter, §07.1.1), `verification_status`, `holder_type` (4th char) | TDS rate, Form 138 data behind Form 130 |
| ESI IP | `Person` | 10 numeric (`id_format.esi_ip` — **[Hypothesis]**, practitioner descriptions only, §07.1.1) | `registration_status` (registered / pending); Aadhaar seeding at IP registration is optional (§07 FR-CHR-042) | ESI contribution filing |
| Aadhaar (optional) | `AadhaarTokenVault`, referenced from `Person` by token | 12 numeric with a Verhoeff checksum (carried, `id_format.aadhaar`) — validated at the vault boundary; the number is held only in the vault (§14.4.15) | The business row holds `aadhaar_token` (opaque, not derived from the number, never a hash) and `vault_state` (none / held / deleted) | Nothing gates on it; UAN seeding is the employee's own UMANG action (§07 FR-CHR-041); never a filing key |
| PRAN | `Person` | 12 numeric (carried, `id_format.pran`) | corporate-NPS subscription state | Employer NPS contribution treatment in TDS |
| Bank account + IFSC | `Person` holds verified accounts; `Employment` holds the disbursal instruction | account + IFSC (mask carried, `id_format.ifsc`) + name; captured only once a written-consent record exists (SPDI r.5(1), EV-060; §07 FR-CHR-006) | `verification_status` (penny-drop / name-match) — **disbursal-blocking** | Salary/FnF payout |
| PF Member ID | `EstablishmentMapping` (employment × establishment code) | establishment-code-scoped | **a new one on every inter-establishment move**, under the same UAN | ECR routing, EPF claims |

**Statutory-identifier linkage state is a small state machine, not a flag.** The gating decisions (can the member's line enter the ECR? does the `no_pan_tds_floor` parameter apply? can we disburse?) are transitions, not truth values, so each identifier carries an explicit lifecycle.

<!-- DIAGRAM: statutory-identifier-linkage-states -->

**Aadhaar rule (Part E-6; §07 FR-CHR-005, FR-CHR-099):** the number is written only to the `AadhaarTokenVault` — separately encrypted, separately access-controlled — and business tables hold an opaque token, never the number and never a hash of it. Display is at most the last four digits, served by the vault. That masking rests on the reg 6(2) security duty and on risk; it is not presented as a statutory display duty on a plain employer (Part D-5). The Verhoeff checksum is validated at the vault boundary, so a mistyped number is rejected before anything is stored. **[Reversed]** v0.3 stored the number, encrypted and masked, on the identifier row.

`EligibilityState` is a separate effective-dated child so that **crossings are handled by rule, not by a checkbox.** The two crossings that generate the most support tickets:

- **ESI ceiling crossing mid-period.** An ESI-covered employee revised above ₹21,000 gross in July keeps coverage to 30 Sep (end of the Apr–Sep contribution period) and drops from 1 Oct — **two effective-dated rows, both visible in history** (Source: the ESI contribution-period rule as it stood before the Code-era rules **[Verified]**; the ESI (Central) Rules 1950 are saved only until the cliff (§06.9) — v0.3's statement that the Social Security (Central) Rules 2026 already supersede them is carried, not re-captured, and the Code-era citation is unmapped (§06.13) — and ESI after on or about 21 November 2026 is fenced, §06.9). ESI contribution periods are Apr–Sep and Oct–Mar; corresponding benefit periods are Jan–Jun and Jul–Dec. The model stores the contribution-period boundary, not the salary-revision date, as the coverage-end.
- **Gratuity eligibility crossing.** The continuous-service test (5 years, with 240 days actually worked in a twelve-month period counting as continuous service; the 5-year condition does not apply on death, disablement or fixed-term expiry — CoSS ss.53–54, §06.6 **[Verified]**) is a derived `EligibilityState` computed off the `ServiceRecord` (§14.3.1), so a rehire under the same `employee_id` bridges or breaks continuous service according to the recorded break treatment.

**AC-DM-05** — *Given* an employee whose gross rises above ₹21,000 on 12-Jul, *When* the July, August and September runs execute, *Then* ESI is deducted through September on actual gross — the ₹21,000 is a coverage gate, not a contribution cap (§06.3) — and stops from 1-Oct, producing exactly two `EligibilityState` rows (`covered` → `not_covered` effective 01-Oct), and the historical rows remain queryable.

**AC-DM-06** — *Given* an employee rehired under an existing `employee_id` after a 3-month gap, *When* gratuity eligibility is evaluated, *Then* continuous-service is computed from the `ServiceRecord` per the recorded break treatment, a PF Member ID is recorded on the new `EstablishmentMapping` (establishment-scoped), and the person-level UAN and ESI IP are unchanged because they never left the `Person`.

**International workers (IW) — a distinct PF sub-regime.** `Employment` carries an `iw_flag` (§07 FR-CHR-007), and `EligibilityState` reads it because an IW is carried as having **no ₹15,000 PF wage ceiling** — contribution on full PF wages. That rule is **[Hypothesis]**: the paragraph references (EPF Scheme para 83, EPS para 43A) and the court history are carried, not re-captured; as carried, a High Court is reported to have struck down the IW special provisions and the matter is under challenge — the court and year v0.3 named trace to no research round and are not stated here (§06.2). The IW PF basis is therefore the parameter `epf.iw_wage_basis`, confirmed before any uncapped IW contribution is applied (§06.13). **[Reversed]** v0.3 marked the IW rule Verified. Where the worker is from a country with a Social Security Agreement (SSA) with India, a **Certificate of Coverage / detachment certificate** may exempt or cap contribution; the model stores this as a `Document` (C1) linked to the `Employment` with a validity window, and `EligibilityState` reflects the exemption for that window. This is the one case where the `pf_wage_ceiling` rule row is deliberately *not applied*, driven by the identifier flag, not a code branch.

**Employment type and contract labour.** `Employment.type ∈ {permanent, fixed_term, contract, apprentice, trainee, consultant, gig_platform}` matters because obligations differ: the 5-year condition does not apply on fixed-term expiry and fixed-term employees are paid gratuity **pro rata** (CoSS s.53, §06.6 **[Verified]**), while the reading that they qualify after one year of service rests on professional commentary, not the Code's text (**[Hypothesis]**, §06.6); contract labour under a principal employer may sit on the *contractor's* PF/ESI code rather than the principal's (§07 FR-CHR-028); and gig/platform workers fall under the Code on Social Security's separate aggregator regime, whose operational status we have not established as of September 2026 (routed to §20). Modelling `type` on `Employment` (not `Person`) lets one person hold a consultant engagement and later a permanent one with correctly different statutory treatment.

#### 14.4.2a Identifier linkage — the transition tables

"A small state machine, not a flag" is only a specification once the transitions are written down. Each identifier has its own, because each is gated by a different external authority and each failure mode costs something different. §07 owns capture and the user-facing behaviour; these are the stored states and the events that move them.

**UAN · `seeding_status`, `transfer_status`, `filing_role`**

| # | From → To | Trigger | Guard | Effect | Who |
| --- | --- | --- | --- | --- | --- |
| U1 | *absent* → `declared` | The employee or the importer supplies a UAN | Mask validates (`id_format.uan`) | Recorded on `Person`; the first declared UAN becomes `active_for_filing` | Employee, HR admin, importer |
| U2 | `declared` → `seeded` | Seeding is confirmed | — | The member's line may enter the ECR | External confirmation |
| U3 | `declared` → `pending` | A pre-ECR readiness check finds it unseeded | — | **Exclude-and-flag**: the member is paid, the line is left out, an `ExceptionRow` and an employee notice are raised | System |
| U4 | `pending` → `seeded` | The employee completes seeding — their own action, not ours (§07 FR-CHR-041) | — | A **Supplementary** return is prepared for the affected wage month from the same locked snapshot (EV-037) | Employee |
| U5 | any → `mismatch` | A name or detail mismatch is reported | — | Exception with the mismatch detail; never an automatic correction of a government record | External |
| U6 | *any* + a second declaration → `declared_additional` | The employee declares another UAN | Exactly one stays `active_for_filing` per period | `MULTIPLE_UAN_DECLARED` raised; the product never generates, merges or retires a UAN | Employee |

**PAN · `availability`, `verification_status`, `holder_type`**

| # | From → To | Trigger | Guard | Effect | Who |
| --- | --- | --- | --- | --- | --- |
| P1 | *absent* → `present` | A PAN is supplied | Mask validates; the 4th character sets `holder_type` | TDS computes at the ordinary rate | Employee, HR admin |
| P2 | *absent* → `not_available` | The employee states they have none | — | The `no_pan_tds_floor` parameter applies; there is no shipped default, so the month surfaces the gap rather than inventing a rate (§07.1.1) | Employee |
| P3 | `present` → `mismatch` | The 5th character does not match the surname or entity name | — | Correction is driven **before** Form 138 or the Form 130 behind it, not after a rejection | System |
| P4 | `present` → `verified` | Verification succeeds, where verification is available | — | Recorded; nothing else changes, because PAN never blocks the month (Part E-11) | System |

**ESI IP · `registration_status`**

| # | From → To | Trigger | Guard | Effect | Who |
| --- | --- | --- | --- | --- | --- |
| I1 | *absent* → `pending` | The employment becomes ESI-eligible | A covering ESI registration exists, or E5 applies | The contribution is computed and held; the filing line waits on the IP | System |
| I2 | `pending` → `registered` | An IP number is allotted | Mask validates (`id_format.esi_ip`, **[Hypothesis]**) | The line may enter the contribution filing | External |
| I3 | `registered` → `pending` | The number is reported invalid by the portal | — | Exception; the prior filing attempt is untouched and a new attempt is prepared | External |

**Bank account · `verification_status` — the only disbursal-blocking identifier**

| # | From → To | Trigger | Guard | Effect | Who |
| --- | --- | --- | --- | --- | --- |
| B1 | *absent* → `captured` | Account and IFSC supplied | IFSC mask validates, 5th character `0`; a written-consent record exists for the financial-data capture (SPDI r.5(1), EV-060) | Held; not yet payable | Employee |
| B2 | `captured` → `verified` | Penny-drop and name-match succeed | — | Disbursal permitted | System |
| B3 | `captured` → `failed` | Penny-drop or name-match fails | — | **Disbursal blocked for that employee**; the pay run is not blocked, the month is not blocked, and the employee is notified | System |
| B4 | `verified` → `captured` | The account is changed | Re-verification required | Disbursal blocked again until B2 | Employee |

**The asymmetry these four tables encode.** Only the bank account blocks money to the employee, and it blocks only that employee's payment. UAN blocks a *line in a return*, not a payment. PAN blocks nothing and changes a rate. ESI IP blocks a *line*, not a payment. Products that treat all four the same way either block payroll on an identifier problem — which is a Part E-11 violation and the fastest way to lose a customer in month one — or block nothing, and discover the return will not upload on the 15th.

**AC-DM-95** — *Given* an employee whose bank verification has failed and whose UAN is unseeded, *When* the month runs, *Then* the pay run completes, every other employee is disbursed, this employee's disbursal is held with a notice, the member's ECR line is excluded and flagged, and neither condition blocks the month's `LOCKED` transition or any other employee's filing.

**AC-DM-96** — *Given* an employee with `availability = not_available` for PAN, *When* TDS is computed, *Then* the `no_pan_tds_floor` parameter is applied where it is set, and where it is unset the month surfaces the gap as an exception with the parameter named, and never substitutes an invented rate.

#### 14.4.3 CompensationStructure / PayComponent / CompensationAssignment — where the two wage bases live

The 50% add-back forces the schema to compute *several* bases from one component set. Each `PayComponent` therefore carries independent boolean inclusion flags, not a single "statutory" flag:

| Flag on PayComponent | Feeds |
| --- | --- |
| `pf_wage` | PF/EPS/EDLI + gratuity add-back base (excludes HRA, conveyance, overtime, award settlements) |
| `esi_wage` | ESI gross base (**includes** HRA/conveyance/overtime) |
| `gratuity_wage` | Gratuity accrual base (add-back rules) |
| `pow_wage` | Payment-of-wages / equal-remuneration base (broadest) |
| `taxable`, `tax_section` | TDS under s.392 (ex-s.192 — EV-050); exemption section (1961-Act numbering such as HRA s.10(13A), mapped per §06.13) |
| `perquisite_flag`, `fbp_flag` | Form 123 (ex-12BA — EV-050) perquisite valuation; flexible-benefit wallet |
| `component_kind` | earning / deduction / reimbursement / statutory-employer-cost / employer-cost (CTC-only, non-payable) |
| `basis` | fixed / percent-of (basic, CTC or gross) / balance-figure / slab / attendance-prorated |

**Worked example (why one `wage` column is wrong).** Employee CTC ₹9,00,000/yr. Structure: Basic ₹3,00,000, HRA ₹1,50,000, Conveyance ₹19,200, Special Allowance ₹4,30,800 (balance figure). Basic alone = ₹25,000/month; total monthly remuneration = ₹75,000.

- **Excluded-component test (the add-back).** Only the excluded heads enter the test (§06.10). Here they are HRA + Conveyance = (₹1,50,000 + ₹19,200)/12 = ₹14,100/month, i.e. **18.8% of the ₹75,000 total remuneration** — below one-half, so **no add-back arises**. The s.2(y) wage for PF and gratuity is total remuneration less the excluded heads: Basic ₹25,000 + Special ₹35,900 = **₹60,900/month**. The special allowance stays in wages because it is not an excluded head, and relabelling universal pay does not move it out (§06.10). Had the excluded heads exceeded one-half, the excess would be deemed wages and added back — the §06.10 illustration, with the arithmetic fixed by AC-DM-07 (Source: Code on Wages s.2(y) / CoSS s.2(88); final Central Rules notified 8 May 2026 **[Verified]**). **[Reversed]** v0.3's version of this example treated the special allowance as excluded and derived a ₹12,500 add-back; §06.10 withdrew that reading.
- **PF ceiling interaction.** PF/EPS statutory basis is capped at ₹15,000/month unless the employer opts to contribute on actual wages. If the employer restricts to the ceiling, employee EPF = 12% × ₹15,000 = ₹1,800; employer split: EPS = 8.33% × ₹15,000 = ₹1,250 (EPS wage capped at ₹15,000), employer EPF = the remainder, ₹550 — the 1,800 / 1,250 / 550 split is EPFO's own Help File fixture (EV-035; §06.2 **[Verified]**); EDLI = 0.5% × ₹15,000 = ₹75 (**[Verified]**, §06.2). Admin charges at 0.5% × ₹15,000 = ₹75 rest on pre-Code EPFO circulars not re-verified, and the establishment-level minimum is the parameter `epf.admin_charge.minimum`, applied once per establishment per wage month (**[Hypothesis]**, §06.2). **[Reversed]** v0.3 stated the admin rate and a ₹500 minimum as Verified. The s.2(y) wage of ₹60,900 still matters: it is the base if the employer contributes on actual wages, and it is the gratuity base, which has no ceiling (§06.10).
- **ESI gross base** = full gross (Basic + HRA + Conveyance + Special) = ₹75,000 — but this employee is **above the ₹21,000 ESI ceiling** (₹25,000 for a disabled IP), so **not ESI-covered**.
- **POW base** = full gross ₹75,000, for minimum-wage and equal-remuneration tests.

Three different numbers — ₹15,000 (ceiling-restricted PF), ₹60,900 (s.2(y) wages and gratuity), ₹75,000 (ESI gross and POW) — one payslip, one component set. The model stores components + flags; the engine (§08) computes bases against the `EffectiveDatedRule` add-back percentage in force for the period. `CompensationAssignment` versions the whole binding so a mid-year CTC revision recomputes correctly for open/retro periods only.

**Balance-figure ordering.** `PayComponent.basis = balance-figure` (special allowance = CTC − Σ others) must evaluate **last** in the ordered structure; a percent-of-CTC component and a balance-figure component in the same structure form a resolution order that the structure's `component_order` encodes (§08 FR-PAY-101). Where a balance figure feeds the add-back test that re-bases it, the node is a bounded fixed-point node — iterated to convergence under a maximum iteration count and a tolerance — not a one-pass topological step (§08 I7, FR-PAY-211).

**AC-DM-07** — *Given* a structure whose excluded components exceed 50% of total remuneration, *When* the PF/gratuity base is computed, *Then* the deemed-wages add-back equals `excluded − addback_percent × total_remuneration` (50% today, a notified variable), the figure is stamped with the `addback_percent` rule version used, and changing the CTC mid-year re-runs this only for open and explicitly-reopened periods, never for a LOCKED or later month except through a correction run.

**AC-DM-08** — *Given* a structure containing both a percent-of-CTC component and a balance-figure special allowance, *When* the structure is evaluated, *Then* the balance figure resolves after all other components and the sum of all `component_kind ∈ {earning, statutory-employer-cost, employer-cost}` equals CTC to the paisa.

#### 14.4.3a The four bases, component by component — the stored fan-out

§14.4.3 states that one component set produces several bases. This is that statement as data, for the worked structure, so a build team can see exactly which flag produces which total and check its own implementation against a fixture rather than against prose.

Monthly view of the ₹9,00,000 CTC structure: Basic ₹25,000; HRA ₹12,500; Conveyance ₹1,600; Special Allowance ₹35,900 (the balance figure). Total monthly remuneration ₹75,000.

| Component | Monthly | `pf_wage` | `esi_wage` | `gratuity_wage` | `pow_wage` | `basis` |
| --- | --- | --- | --- | --- | --- | --- |
| Basic | ₹25,000 | ✔ | ✔ | ✔ | ✔ | fixed |
| HRA | ₹12,500 | ✘ — an excluded head | ✔ | ✘ | ✔ | percent-of basic |
| Conveyance | ₹1,600 | ✘ — an excluded head | ✔ | ✘ | ✔ | fixed |
| Special Allowance | ₹35,900 | ✔ — not an excluded head; relabelling universal pay does not move it out (§06.10) | ✔ | ✔ | ✔ | balance-figure, evaluates last |
| **Base totals** | | **₹60,900** | **₹75,000** | **₹60,900** | **₹75,000** | |

The add-back test then runs over the excluded heads only: ₹12,500 + ₹1,600 = ₹14,100, which is 18.8% of ₹75,000 — below one-half, so no add-back arises and the s.2(y) wage stays ₹60,900 (§06.10).

**What the engine stores against this employee for the period.**

| Stored figure | Value | Note |
| --- | --- | --- |
| s.2(y) wages | ₹60,900 | The gratuity base, uncapped |
| PF basis, ceiling-restricted | ₹15,000 | Where the employer restricts to the ceiling; ₹60,900 where it contributes on actual wages |
| Employee EPF at the ceiling | ₹1,800 | 12% × ₹15,000 (§06.2) |
| Employer EPS | ₹1,250 | 8.33% × ₹15,000, EPS wage capped at ₹15,000 |
| Employer EPF | ₹550 | The remainder of the employer share |
| EDLI | ₹75 | 0.5% × ₹15,000 |
| ESI gross | ₹75,000 | Above the ₹21,000 coverage ceiling, so **not covered** — the base is still computed and stored, because eligibility and base are different facts |
| POW base | ₹75,000 | Minimum-wage and equal-remuneration tests |

**Five things this table makes structurally impossible.** A single `wage` column cannot produce five different stored figures from one component set. A single "statutory" boolean cannot distinguish the two ✘ cells in the `pf_wage` column from the two ✔ cells in the `esi_wage` column on the same rows. A special allowance tagged as excluded produces ₹25,000 rather than ₹60,900 as the s.2(y) wage — the exact reversal §06.10 made. An ESI base suppressed because the employee is not covered loses the figure the moment a revision brings them back under the ceiling. And an EPS figure computed as 8.33% of the PF basis without the separate ₹15,000 cap produces ₹5,072.97 rather than ₹1,250 on an actual-wages employer — roughly a fourfold over-statement of the EPS leg with a matching under-statement of the employer EPF leg, which reconciles to the same total and is therefore invisible on a payslip and visible only in the ECR.

**AC-DM-104** — *Given* the structure above, *When* the period's bases are computed, *Then* the four stored base totals are ₹60,900, ₹75,000, ₹60,900 and ₹75,000 respectively, each stamped with the rule versions used, and the ESI base is stored even though the employee is not ESI-covered.

**AC-DM-105** — *Given* an employer contributing on actual wages rather than the ceiling, *When* the EPS figure is computed, *Then* the EPS wage is capped at ₹15,000 independently of the PF basis, producing ₹1,250, and the employer EPF leg absorbs the remainder; an EPS figure computed as a percentage of the uncapped basis is a release-blocking defect.

#### 14.4.4 PayRun / PayrollResult / Payslip

`PayRun.type ∈ {regular, off_cycle, arrears, bonus, reimbursement, fnf}`; its state is the payroll-month machine of §08 FR-PAY-301. `PayrollResult` holds every computed figure **with its rule lineage** (D4): each amount references the `rule_version` rows used, so the run is **replayable** (same input snapshot + rule versions + evaluation context → byte-identical, §08 I4/I6) and **recomputable** (retro against the period's versions). Replay reads only the snapshot and the bitemporal classes, never an erasable input such as a punch (§14.6.1a). `Payslip` is a rendered `Document`, never a source of truth — regeneration must reproduce the original from result + template version.

**Payroll-month states — what each freezes in the data model.** The machine itself — event, guard, side effect, who may trigger — is specified as a transition table in §08 FR-PAY-301 (Part E-1): `OPEN → INPUTS_CLOSED → PROCESSED → APPROVED → LOCKED → DISBURSED → PAYMENT_INITIATED → FILED`, reversible before `LOCKED`, with the statutory verification gate immediately before `PAYMENT_INITIATED` (EV-037). This table is its data-model consequence. Each transition emits an `AuditEvent`. **[Reversed]** v0.3 specified `draft → inputs_locked → computed → reviewed → approved → disbursed → filed → closed`, with approval as the point of no return and no payment-initiation state, so the one irreversibility line the revamped ECR creates had nowhere to live (Part E-1).

<!-- DIAGRAM: payrun-lifecycle-state-machine -->

| State (§08 FR-PAY-301) | Becomes immutable in the data model | A later change goes to |
| --- | --- | --- |
| `OPEN` | Nothing; the period's rule-set versions resolve and filing instances are created as `SCHEDULED` | Direct edit |
| `INPUTS_CLOSED` | The input snapshot — attendance-derived paid days, LOP, NCP days and OT hours by band; variable pay; declarations; joins, exits and revisions. Replay reads this, never punches | Reopen to `OPEN`; the superseded snapshot is kept |
| `PROCESSED` | A `PayrollResult` version per employee, stamped with rule versions and the evaluation context (§08 I6); repeatable | Reprocess — a new version, prior versions kept for diff |
| `APPROVED` | The approval artefact; the planned disbursal date in the evaluation context | Return to `PROCESSED` (approval voided, reason kept) |
| `LOCKED` | Every result; payslips rendered; bank file generated; filing artefacts may be generated from the locked snapshot | A correction run only — a diff against the locked snapshot (§08 FR-PAY-306) |
| `DISBURSED` | The actual disbursal date, recorded (it keys PF liability on arrears — Part E-9), and UTRs | Correction run |
| `PAYMENT_INITIATED` | Statutory challans with TRRN; the verification gate has passed — no downward ECR correction is possible from here (EV-037) | Correction run, routed to a Supplementary return or the fenced arrear flow (EV-037, EV-043) |
| `FILED` | Every monthly filing instance `FILED`, with acknowledgement and receipt | Correction run |

**Retro/arrears modelling:** an arrears run does not overwrite a LOCKED month. It creates new `PayrollResult` rows tagged `applies_to_period = March, run_in_period = September`, computed against **March's** rule versions (D2), with the statutory liability date for PF taken from the arrears run's disbursal date, not the wage month (Part E-9). The March filing artefact remains immutable; the delta goes to whichever filing path the guards allow — a Revised or Supplementary return within EV-037, the arrear flow (fenced — no layout is published, EV-043), or the next Form 138 statement or correction statement (§08 FR-PAY-708). This is the schema expression of §08's I3. LOP-reversal, retro-CTC-revision, and corrigendum-driven recompute all use this same shape — there is exactly one mechanism for "change a locked month," and it is additive: a diff, never a mutation (Part E-1).

**Full-and-final settlement (FnF) — a distinct run type, not a special payslip.** `PayRun.type = fnf` composes components that never co-occur in a regular run: **leave encashment** (reads the derived `LeaveBalance`, §14.4.7), **gratuity payout** where eligibility is met ((15/26) × last-drawn monthly wages × completed years, with service in excess of six months in the final year counting as a full year — CoSS s.53, §06.6 **[Verified]**). The payable ceiling is "such amount as may be notified" under CoSS s.53(3) and no Code-era notification has been located, so it is the parameter `gratuity.payable_ceiling`; the familiar ₹20 lakh is a legacy of the repealed Act (**[Hypothesis]**, §06.6). It never shares a field with the lifetime tax-exemption ceiling, `tax.gratuity_exemption_ceiling`. **[Reversed]** v0.3 stated a ₹20L cap as Verified. **notice-period recovery** (a negative earning), **pending reimbursements**, and a **TDS true-up** against the full-year projection now that the exit date is known. FnF is where retention (§14.7) and the gratuity claim-tail begin: the run's outputs seed the post-exit retention clock. An FnF run can itself be reopened as an arrears run if a gratuity dispute later revalues service — again additive, never in-place.

**AC-DM-09** — *Given* a LOCKED March month, *When* a September arrears run corrects a March input, *Then* new `PayrollResult` rows are created with `applies_to_period=March, run_in_period=September` computed against March-effective rule versions, the March `PayrollResult` and `Payslip` remain byte-identical, the PF liability date is the arrears disbursal date (Part E-9), and the delta is routed only to a filing path the EV-037 guards allow — never into an edit of the March return.

**AC-DM-10** — *Given* a LOCKED month and its `PayrollResult`, *When* the run is replayed from the recorded input snapshot, rule versions and evaluation context, *Then* every figure reproduces byte-for-byte; the `Payslip` verifies against its stored `sha256` while its rendered file is retained, and once that file is erased under its retention class it is re-rendered from snapshot and template version and marked as a re-rendering (§08 I4). A divergence in any figure is a lineage defect that blocks release.

#### 14.4.4a Stored versus derived — the persistence decision table

Every fact in this model is either **stored** (written once, read forever) or **derived** (recomputed from other rows). Getting the choice wrong is not a performance question. A derived fact that should have been stored becomes unreproducible the moment its inputs are corrected or erased; a stored fact that should have been derived becomes a second source of truth that drifts from the first. The rule this model applies is: **store what was true at a moment that mattered; derive what is a view of the current state.**

| Fact | Stored or derived | Why | What the other choice would cost |
| --- | --- | --- | --- |
| Every monetary figure on a `PayrollResult` | **Stored**, with rule lineage | It was filed, disbursed and taxed at that value | A recomputed figure would silently change when a rule or an input is corrected — the artefact would stop matching the return |
| The wage bases behind those figures — s.2(y) wages, ESI gross, gratuity base, POW base | **Stored** | They are the inputs to a statutory calculation, and the add-back that produced them is a fixed-point result, not a formula anyone can re-derive by inspection | A derived base makes "why was PF computed on ₹60,900" unanswerable once the component set changes |
| `LeaveBalance` | **Derived** from `LeaveTransaction` | A balance is a view; the ledger is the fact | A stored balance drifts and cannot be reconciled (§14.4.7) |
| `ServiceRecord` totals | **Derived**, from frozen snapshots | The inputs are themselves stored at lock, so derivation is stable | A stored total becomes hand-editable, which is T8's whole concern |
| `EligibilityState` rows | **Stored** as effective-dated rows, **computed** by rule | The row records what we decided and when; the rule records why | A purely derived state cannot show that coverage ended at a contribution-period boundary rather than at the revision date |
| `headcount_tracked` per counting unit | **Stored**, including the latched peak | A latch is a fact about history, not about today | A spot count re-derived each day would un-arm a latched obligation (AC-DM-04) |
| `Filing.due_date` and `on_time` | **Stored** at instance creation, from the rule row then in force | The due date the obligation carried is part of the evidence | Re-deriving against today's rule row would rewrite history when a due date changes by notification |
| The ECR's eleven field values | **Derived at generation, then frozen in the artefact** | The artefact is the evidence; the fields are a projection of the result | Storing them twice creates a second truth that can disagree with the result |
| Day counts — paid days, LOP, NCP, OT hours by band | **Stored** in the input snapshot | They are what the run consumed, and punches may not survive | Deriving them at replay breaks the moment punches are erased (AC-DM-34) |
| `DayStatus` | **Derived** from punches while they live; **frozen** into the snapshot and the register row | A working projection before lock, a record after it | Either extreme — always derived, or always stored — fails one side of the lock boundary |
| Identifier linkage states | **Stored** | They gate filings and change by external events | A derived state would need a portal round-trip to answer a question the run asks thousands of times |
| Rule resolution results | **Derived**, but the selected `rule_id` is **stored** on the lineage | The resolution is deterministic and replayable; the selection is evidence | Storing the resolved value without the version is the "current PT slab" anti-pattern (§14.4.13) |
| Anything a model produced | **Stored as a draft only**, never as a statutory or monetary figure | No statutory or monetary figure is ever model-generated (§08) | The entire compliance posture |

**The general rule, stated so a new entity can be classified without re-litigating.** A fact is stored if any of these is true: it was used to produce an artefact that left the system; it records a decision a person made; it captures an external event; or its inputs are erasable. Otherwise it is derived. Where a fact meets the first test and the last, it is stored **and** its derivation is retained — which is exactly the input snapshot's shape (§14.4.17).

**AC-DM-94** — *Given* any newly added fact in the model, *When* it is classified, *Then* it resolves to stored or derived by the four tests above, and a fact that is stored carries the lineage that produced it while a fact that is derived carries no independent write path.

#### 14.4.5 Filing — the unit of delivery

Because the whole product is "did the return go out and get accepted," `Filing` is the most instrumented entity in the model.

| Field | Purpose |
| --- | --- |
| `filing_type` | ECR, ESI_CONTRIB, PT_RETURN, LWF, TDS_138 (Form 138, ex-24Q), FORM_130 (Form 130, ex-Form 16 — distribution of the TRACES-generated certificate), STAT_REGISTER, etc. Labels, search and imports accept both vocabularies (EV-050). |
| `registration_id` (+ the registration row's knowledge-time version), `establishment_id`, `jurisdiction_id`, `period` | What/where/when this covers: one registration × obligation × period (§08 FR-PAY-711; §14.3.1). The jurisdiction is the registration's state, resolved from its work location (Part E-5). |
| `return_type` | For the ECR: `regular`, `supplementary` (needs an approved Regular; only members absent from every prior return for the month) or `revised` (needs an approved Regular, no other return in process, **no payment initiated**) — EV-037. |
| `format_version` | The government file-format version used. Form 138 replaces 24Q with a breaking layout (EV-051); the Q1–Q3 regular format was published 22 July 2026 and the Q1–Q3 correction format 4 August 2026 (§06.5); the **Q4 regular and correction formats are not released**, re-checked September 2026, so the Q4 generator and Form 130 Part B are fenced (EV-046). The FVU stack is chosen by the period — RPU 1.2 + FVU 1.2 from Tax Year 2026-27, RPU 6.0 + FVU 9.5 for FY 2010-11 to FY 2025-26 — and mixing them is rejected (EV-052). The model stores which format each attempt was built against. **[Verified]** |
| `input_snapshot_ref` | Immutable snapshot of the exact `PayrollResult`/master rows the artefact was built from (the N:M-via-snapshot in §14.3). |
| `generated_document_id`, `artefact_sha256` | The file/return artefact (Document) and its hash. The hash lives on the Filing, so it outlives the erasable Document (§14.6.1a). |
| `state` | The §08 FR-PAY-711 states: `SCHEDULED, BLOCKED, GENERATED, VALIDATED, SUBMITTED, REJECTED, ACCEPTED, REVISED, SUPPLEMENTARY, PAYMENT_INITIATED, FILED` (Part E-1), with `blocked_reason`, owner and unblocking trigger when `BLOCKED`. |
| `submitted_by`, `submission_mode`, `authority_to_act_document_id`, `portal_session_log_ref` | Every statutory portal is an attended surface. `submission_mode ∈ {employer, operator_under_written_authority}`; the session log records who acted, on whose credentials, when, and which file (§22). The employer's statutory liability is non-delegable (K-13). The operator mode is a product capability whose statutory basis is under counsel review — acting on portals under employer credentials, portal terms of use, the e-Return Intermediary question for TDS, and the authorised signatory's DSC (Part D-17; §23) — so `employer` is always available and the schema never assumes the operator mode is lawful. |
| `ack_ref`, `ack_document_id`, `submitted_at` | Portal acknowledgement — the return file ID and, at challan, the TRRN for the ECR (EV-036); the Return Receipt Number for Form 138 (EV-051). The proof of on-time filing, the headline metric's evidence. |
| `rejection_reasons[]` | Structured, replayable rejection codes (e.g. name mismatch against UAN, negative wage, IFSC invalid) so the fix loop is guided, not manual. |
| `challan_id` | The money leg (§14.4.6). |
| `due_date`, `filed_date`, `on_time` | Computed against the statutory calendar for that filing_type + jurisdiction. |
| `corrects_filing_id`, `attempt_no` | The Regular or accepted return that a Revised, Supplementary or correction attempt diffs against, and the attempt sequence. The prior return and attempt are never overwritten — a correction is a diff (Part E-1). |
| `nil_status` | A NIL period is a ledger entry, never a gap. For EPF a NIL month uses no file; admin and inspection charges go through Direct Challan Entry, enabled only when there are no active members (EV-042). |

**Filing lifecycle.** The canonical machine — transition table and guards — is §08 FR-PAY-711; the diagram below shows its data consequences: every attempt is a new record linked to the prior one, every artefact is bound to the locked snapshot and a format version, and a correction after acceptance is a new linked return. **[Reversed]** v0.3's lifecycle had no `BLOCKED`, `SUPPLEMENTARY` or `PAYMENT_INITIATED` state and allowed a revision of any accepted return, with no guard for payment initiation (Part E-1; EV-037).

<!-- DIAGRAM: filing-lifecycle-state-machine -->

**Filing-type catalogue with statutory calendar** (due dates drive `due_date`/`on_time`; all are `EffectiveDatedRule`-backed, since due dates themselves change by notification):

| `filing_type` | Covers | Typical due date | Source | Confidence |
| --- | --- | --- | --- | --- |
| `ECR` (EPF) | Electronic Challan-cum-Return | **15th** of following month | EPFO ECR procedure | **[Verified]** |
| `ESI_CONTRIB` | ESI contribution | **15th** of following month | ESI regime as it stood before the Code-era rules; post-cliff regime fenced (§06.9) | **[Verified]** to on or about 21 November 2026 |
| `PT_RETURN` | State PT return | **Per state, per registration** — monthly/annual; e.g. Maharashtra assigns the frequency per registration each year (§06.11) | State PT Acts | **[Hypothesis]** exact per-state dates — per-state verification status is kept in §06.4 and §06.13, not restated here |
| `TDS_138` | Quarterly TDS statement, Form 138 (ex-24Q) | **Q1 31 July, Q2 31 October, Q3 31 January, Q4 31 May of the year following the Tax Year** | Income-tax Rules 2026 r.219 (EV-049) | **[Verified]** dates; Q4 generator fenced — format not released (EV-046) |
| `FORM_130` | Annual salary certificate, Form 130 (ex-Form 16) — **TRACES-generated only**; a certificate not generated from TRACES is invalid (EV-048). The product distributes it, never generates it | **15 June** of the year following the Tax Year (§08) | Income-tax Rules 2026 r.215 | **[Verified]**; blocked for Tax Year 2026-27 behind the missing Q4 Annexure II (EV-046, EV-047) |
| `LWF` | State LWF | **Per state** — monthly/half-yearly/annual | State LWF Acts | **[Hypothesis]** per-state dates/rates — kill/confirm: gazette per state, §14.10 item 8. **[Reversed]** v0.3 called multi-state LWF parity with Frappe HR "across 14 states"; Frappe HR v16 has no LWF and no Indian state name in its source (EV-031), and TallyPrime has no LWF engine (EV-032), so it is a differentiator (K-01) |
| `STAT_REGISTER` | **Six employer registers plus a wage slip**, across three rule-sets, kept as one canonical set (EV-053) | Maintained current; retention per the governing rule-set's wording (EV-054, §14.7.1) | Wages r.51(1), OSH r.72, SS r.53(1)(a) — central sphere; form numbers per state | **[Verified — central sphere]** |

`STAT_REGISTER` covers Wages Rules r.51(1) Forms I, IV and IX with the Form V wage slip; OSH Forms XIII, XIV, XV, XIX and XX with the Form XVI wage slip; and SS r.53(1)(a) Form XXII, the Register of Women Employees. The non-duplication provisions (OSH r.72(3); SS r.53(1)(a) proviso) make them one canonical set with code-specific views, and form numbers are configurable per state because state rules prescribe different forms (EV-053). Form IX needs per-day IN and OUT timestamps; Form I has 36 numbered fields, including specimen signature or thumb impression (EV-055). Each register instance is a record with a retention class keyed to its rule-set's wording (§14.7.1). **[Reversed]** v0.3 described "four consolidated registers" with a flat five-year retention.

**Why `PayrollResult` carries the fields it does — the ECR is the forcing function.** The EPFO ECR is a member-wise text file — `#~#`-delimited, no header row, **11 fields in a fixed order** (EV-035) — and each field must be reproducible from a `PayrollResult` row plus the member's identifiers. Wage month, return type, contribution rate and remark are portal form controls, not file content (EV-035), so they live on the `Filing`, not the result. This mapping is why the result cannot be a single net-pay number:

| # | ECR field (EV-035) | Sourced from | Note |
| --- | --- | --- | --- |
| 1 | UAN | `StatutoryIdentifier` (UAN, `seeding_status`) | An unseeded member is excluded and flagged before generation (§07 FR-CHR-101) |
| 2 | Member Name as per UAN | `Person.name_as_per_uan` (§07 FR-CHR-009a) | Never the display name |
| 3 | Gross Wages | `PayrollResult` POW/gross base | The broadest base |
| 4 | EPF Wages | `PayrollResult` PF base (s.2(y) wages, ceiling-applied unless contributing on actuals) | Distinct from gross — the §14.4.3 example |
| 5 | EPS Wages | min(EPF wages, ₹15,000); zero for a non-EPS member | EPFO hard-blocks only the age-58 EPS rule and merely flags a post-01.09.2014 above-ceiling joiner (EV-040), so the derivation is the control (§07 FR-CHR-012) |
| 6 | EDLI Wages | min(EPF wages, ₹15,000) | Capped separately |
| 7 | Employee PF Contribution | `PayrollResult` employee share | Stamped with rate `rule_id` |
| 8 | Employer EPS Contribution | `PayrollResult` employer EPS share | Stamped with rate `rule_id` |
| 9 | Employer PF Contribution | `PayrollResult` employer EPF share | Stamped with rate `rule_id` |
| 10 | NCP Days | The run's input snapshot (derived at `INPUTS_CLOSED` from `DayStatus`) | Never recomputed from punches (§14.6.1a) |
| 11 | Refund of Advance | ledger | Where applicable |

A single `wage` column cannot regenerate this file — which is the schema-level proof of §14.4.3's argument, expressed as a filing format.

**Exception-loop worked example.** Before generation, the pre-ECR readiness check (§07 FR-CHR-097) finds one member's UAN at `seeding_status = pending`. The default is exclude-and-flag (§07 FR-CHR-101): the member is paid in the same run, the member's line is left out of the Regular return, and an exception row `{code: AADHAAR_UAN_UNSEEDED, uan: …, member_id: …}` routes to exactly that member's identifier state, with an operator task and an employee notice. Once the employee has seeded the UAN, the product prepares a **Supplementary** return for that wage month — permitted because the member is absent from every prior return for the month (EV-037) — as a new attempt linked by `corrects_filing_id`, built **from the same locked snapshot** (the wage data did not change, only the identifier state), with the portal-calculated s.7Q interest shown, since it is mandatory (EV-039). A portal rejection for another reason follows the same shape: `REJECTED → GENERATED`, a new attempt, the fix made through identifier state or a correction run and never by editing the snapshot (§08 FR-PAY-711 F8).

**AC-DM-11** — *Given* a payroll month for a multi-state employer, *When* it reaches `LOCKED`, *Then* filing instances exist for one `ECR` per EPF establishment code, one `ESI_CONTRIB` per ESI code, one `PT_RETURN` per PT registration, `LWF` where due and `TDS_138` at quarter-end, each with its own `due_date`, state and reference to the locked snapshot.

**AC-DM-12** — *Given* a return from which a member was excluded, or a `REJECTED` attempt, *When* the identifier state is corrected and a new attempt is generated, *Then* the new attempt is a separate record linked to the prior one, built from the same snapshot if no wage figure changed, and both attempts keep their own timestamps so that §19 computes on-time status by its own definition. Whether a portal treats a corrected resubmission as on-time is not established in this PRD's evidence and is not assumed (§20).

**AC-DM-13** — *Given* an EPF establishment with no contribution due for a wage month, *When* the ledger is evaluated, *Then* the month carries an explicit status — NIL with its Direct Challan Entry receipt where there are no active members (EV-042), or the return the rules otherwise require — and an unfiled due month is flagged as a missed obligation, never suppressed (§08 FR-PAY-712).

#### 14.4.5a The artefact binding — what makes a generated file reproducible

A statutory artefact is evidence, and evidence that cannot be tied to what produced it is an assertion. Five references are bound to every generated artefact at the moment of generation, and the set is closed — an artefact missing any one of them cannot be generated.

| Binding | What it fixes | Failure if it is missing |
| --- | --- | --- |
| `input_snapshot_ref` | The exact rows the artefact was built from | Regeneration silently picks up later corrections and produces a different file from the one that was filed |
| Resolved `rule_ref` set | Which rule versions produced each figure | "Why does the return say ₹1,250" has no answer once the rate row moves |
| `format_version` | Which government file format the artefact targets | The dual FVU stack is the worked case: RPU 1.2 with FVU 1.2 from Tax Year 2026-27, RPU 6.0 with FVU 9.5 for FY 2010-11 to FY 2025-26, and mixing them causes rejection (EV-052) |
| Generator version | The code that produced the bytes | A generator fix changes output for periods already filed, and nobody can tell which artefacts came from which behaviour |
| `registration_id` plus its knowledge-time version | Which code the artefact was filed under | A later registration correction rewrites history (T6, RI11) |

**The reproduction contract.** Given the five bindings, regenerating an artefact must produce bytes whose `sha256` equals the stored `artefact_sha256`. Three consequences:

- A **generator change is versioned, never retrospective.** Regenerating a March artefact uses March's generator version. A generator version that is no longer runnable makes the artefact non-reproducible, which is a deliberate reason to keep the hash on the `Filing` rather than relying on regeneration (§14.4.8a).
- A **format change is absorbed as data.** When the Form 138 Q4 format is released, it lands as a new `format_version`; nothing about the entity changes and no previously generated artefact is affected (EV-046).
- A **portal-side change we did not observe** shows up as a rejection, not as a silent divergence — which is why `rejection_reasons[]` is structured and replayable rather than a free-text blob (§14.4.5).

**What is deliberately not bound.** The artefact does not reference live master data. It references the snapshot. This is the difference between "the return says what the employee's name was when we filed" and "the return says whatever the employee's name is now", and the second is how a name correction in December changes a June return that has already been accepted.

**AC-DM-109** — *Given* any generated statutory artefact, *When* it is regenerated from its five bindings, *Then* the bytes' `sha256` equals the stored `artefact_sha256`; where the generator version is no longer runnable, the request returns the stored hash and the artefact's record rather than a regeneration from a different generator.

**AC-DM-110** — *Given* a Form 138 artefact for a period, *When* its FVU stack is selected, *Then* it is selected by the period — RPU 1.2 with FVU 1.2 from Tax Year 2026-27, RPU 6.0 with FVU 9.5 for FY 2010-11 to FY 2025-26 — recorded on the artefact, and a mixed pairing is refused at generation rather than discovered at upload (EV-052).

#### 14.4.6 Challan / Payment

Separates the *return* (what is owed and to whom) from the *payment* (money moved). Holds PF/ESI/PT/TDS challan numbers, the EPF TRRN (EV-036), CRN (TDS Challan Reference Number), bank UTR, NEFT/host-to-host file reference, amount — with the s.7Q interest component carried separately, because it is mandatory, auto-calculated and payable with the contribution (EV-039) — and reconciliation state (`initiated → debited → reconciled → failed`). A NIL EPF month has a Direct Challan Entry payment and no return file (EV-042); a challan can fail after a return is accepted, so the two lifecycles are **independent**.

**Why independent lifecycles matter (edge case).** For EPF, return submission is separated from payment: upload → validate → return statement → approve → Due Deposit Balance Summary → challan with TRRN → pay → receipt, and several challans may follow one return (EV-036). For TDS, the challan (CRN via the e-Pay Tax / TIN 2.0 flow) is often paid *before* the quarterly return is filed and is then *quoted* inside the return. So the model cannot assume a fixed ordering between Filing and Challan; it links them and reconciles, rather than nesting one inside the other. A `Challan` in `failed` after its `Filing` is `ACCEPTED` raises a reconciliation exception, not a re-filing.

**AC-DM-14** — *Given* an accepted TDS return quoting a challan CRN, *When* the bank later reports that challan as failed/reversed, *Then* the system raises a reconciliation exception linking Filing and Challan, and does not silently mark the period compliant.

#### 14.4.6a Filing and challan — the two-lifecycle matrix

§14.4.6 establishes that the return and the payment have independent lifecycles. Independence is easy to state and easy to get wrong, because most of the cells in the cross-product are states a naive model cannot represent at all. This is the matrix, and each cell says what is true and what the product must show.

| Filing state ↓ / Challan state → | *no challan* | `initiated` | `debited` | `reconciled` | `failed` |
| --- | --- | --- | --- | --- | --- |
| `GENERATED` | Normal — nothing owed yet | Abnormal for EPF, normal for TDS where the challan is paid first and quoted in the return | As left | As left | Payment failed before filing; the return may still be submitted |
| `VALIDATED` | Normal | As above | As above | As above | As above |
| `SUBMITTED` | Normal for EPF: the return is separated from the payment (EV-036) | Normal | Normal | Normal | Exception: payment failed with a return in flight |
| `ACCEPTED` | **EPF's own flow** — the approved return precedes the Due Deposit Balance Summary and the challan with its TRRN | Normal | Normal | The complete, compliant state | **Reconciliation exception** — the period is *not* marked compliant (AC-DM-14) |
| `PAYMENT_INITIATED` | Impossible — the state is defined by payment initiation | Normal | Normal | Normal | Exception; and note no downward ECR correction is available from here (EV-037) |
| `FILED` | Only where the obligation has no money leg — a register instance, a NIL return with its Direct Challan Entry receipt (EV-042) | Abnormal | Abnormal | Normal | Exception |
| `REJECTED` | Normal — nothing was owed on a rejected return | Exception: money moved for a return that was not accepted | Exception | Exception | Both legs failed; both are retried independently |

**Challan transition table.**

| # | From → To | Trigger | Effect |
| --- | --- | --- | --- |
| C1 | *none* → `initiated` | A challan is raised — for EPF after the return is approved and the Due Deposit Balance Summary is produced (EV-036); for TDS often before the return exists | TRRN or CRN recorded; the s.7Q interest component is carried as a **separate amount**, because it is mandatory and auto-calculated (EV-039) |
| C2 | `initiated` → `debited` | The bank debits | UTR recorded |
| C3 | `debited` → `reconciled` | The receipt matches the expected amount and reference | The money leg is complete |
| C4 | any → `failed` | The bank or portal reports failure or reversal | A reconciliation exception linking Filing and Challan; the period is never silently marked compliant |
| C5 | `failed` → `initiated` | A retry | A **new** challan record; the failed one is kept, because the failure is part of the evidence |

**Three consequences for the model.** First, `Filing` carries `challan_id` as a `0..N` link, not a required field — one return may be followed by several challans (EV-036). Second, `on_time` is a property of the **filing**, and payment timeliness is a separate fact; conflating them makes the product's headline metric unreliable in exactly the cases that matter. Third, a `failed` challan after an `ACCEPTED` return is a reconciliation exception and not a re-filing: re-filing an accepted return is either impossible or harmful depending on the scheme, and an approved EPF return can never be cancelled (EV-036).

**AC-DM-97** — *Given* an accepted return with a reconciled challan, *When* the bank later reverses the challan, *Then* the challan moves to `failed`, a reconciliation exception linking both records is raised, the period's compliance status is withdrawn rather than left standing, and no automatic re-filing occurs.

**AC-DM-98** — *Given* an EPF return in `PAYMENT_INITIATED`, *When* a downward correction is attempted, *Then* the Revised route is unavailable by guard, the reason names payment initiation, and the only routes offered are the ones the guards permit — including the arrear flow, which is fenced (EV-037, EV-043).

#### 14.4.7 Punch, DayStatus, FormIXRow / Leave

The attendance entities follow §09.1-A. A `Punch` is source-tagged (`source ∈ {device_adms, geo, mobile, kiosk, manual, import}`) because device-pushed punches (the ADMS/WDMS receiver, §09.3 **[Verified]**) arrive with a device serial and raw packet that must be retained for dispute. Ingestion is idempotent on `(device_sn, device_user_id, device_timestamp, direction)` plus `payload_hash` (§09.3 AC4), so a device retrying a POST does not double-count a punch. A `Punch` is an **erasable** class and never references a biometric template (§14.6.1a, §14.4.15). `DayStatus` is a derived projection. `FormIXRow` is the statutory record: a monthly sheet with **per-day IN and OUT timestamps**, materialised at period lock — a present/absent or day-total model cannot produce it (EV-055) — and retained per EV-054, so it survives the erasure of the punches behind it.

Overtime is paid at **not less than twice the ordinary rate of wages**, against normal hours of 8 a day where the wage period is daily and 48 a week otherwise (§09.6 FR-OT-001 **[Verified]**), so the OT rate and hours are `EffectiveDatedRule` rows, not constants, with state overlays possible. A **quarterly ceiling of 144 OT hours** is reported only by secondary summaries, has never been confirmed against gazette text, and may sit in the OSH rules — **[Hypothesis]** (K-04). It is the parameter `ot_quarterly_ceiling_hours`: the product may **warn** on it and must **never block** a punch, roster, OT approval, pay run or filing; the figure is routed to §20. **[Reversed]** v0.3 marked the 144-hour ceiling Verified and flagged excess hours against it as a statutory breach.

**OT worked example.** A worker on ₹26/hour normal rate logs 30 OT hours in a month; the running quarter total is already 130 hours. OT pay = 30 × (2 × ₹26) = ₹1,560, and every hour worked is paid. The model adds the 30 hours to the quarterly total (160) and compares it with `ot_quarterly_ceiling_hours` (hypothesised 144): crossing the configured threshold raises an **advisory** warning to the site admin — nothing is blocked, nothing is withheld, and the register records hours actually worked.

`LeaveBalance` is a *derived* running total; `LeaveTransaction` is the immutable ledger that moves it (`accrual, availment, encashment, lapse, carry_forward, opening_balance, adjustment`), so a balance can always be reconstructed and a mid-year policy change is a new effective-dated `LeavePolicy` version.

**Leave-ledger worked example (why balance is derived).** Employee opens FY with 6 days (imported as an `opening_balance` transaction, §14.4.10). Monthly accrual 1.5 days, posted at each month end; takes 3 days in June; a new `LeavePolicy` version from September changes the carry-forward cap, which bites only at year end. Balance at any date = Σ transactions ≤ that date — 6 + (6 × 1.5) − 3 = 12 days on 30-Sep — so an auditor reconstructs "how did we get 12 days on 30-Sep" without trusting a mutable counter, and the September policy change adds a `lapse` transaction only when the cap is applied. Encashment at exit reads the derived balance and posts an `encashment` transaction feeding FnF.

**AC-DM-15** — *Given* a worker whose quarterly OT would exceed `ot_quarterly_ceiling_hours`, *When* the run computes OT, *Then* every hour worked is paid at the `EffectiveDatedRule` rate in force for the period, an advisory warning is raised, and no punch, roster, approval, pay run or filing is blocked (K-04).

**AC-DM-16** — *Given* a leave balance on any date, *When* it is queried, *Then* it equals the sum of `LeaveTransaction` rows up to that date, and no direct write to `LeaveBalance` is possible outside a transaction.

#### 14.4.7a Attendance storage — three layers, three different lifetimes

§09 owns the time model. What §14 owns is why attendance is stored in three layers rather than one, because the three have different retention classes, different erasability and different authority, and a single-table design forces all three to share the shortest-lived and least authoritative of them.

| Layer | What it stores | Authority | Temporal class | Survives |
| --- | --- | --- | --- | --- |
| `Punch` | The raw event: timestamp, direction, source, device serial, raw packet, `payload_hash` | The source record for a dispute | E — erasable | Until its ceiling, or a dispute hold |
| `DayStatus` | The derived day: paid, LOP, weekly off, holiday, NCP, OT hours by band | A working projection before lock; frozen into the snapshot at lock | Derived, then frozen | As a projection, only while its punches live; as frozen counts, for the snapshot's life |
| `FormIXRow` | The statutory register row: per-day IN and OUT timestamps, days worked, overtime hours, off-site assignment note | The statutory record (EV-055) | R — a record of fact | Its register instance's retention class |

**Three rules the layering exists to enforce.**

| # | Rule | Consequence |
| --- | --- | --- |
| AT1 | **Payroll never reads punches.** It reads the frozen counts in the snapshot | Erasing punches changes no payroll figure (AC-DM-34) |
| AT2 | **The register never recomputes.** `FormIXRow` is materialised at period lock and retained on its own clock | A register that recomputed from punches would change retrospectively, and would become unreadable the moment punches were erased |
| AT3 | **A day-total model cannot produce the register.** Form IX requires per-day IN and OUT timestamps (EV-055), so the middle layer's day totals are never the register's source | A product that stores only present/absent or day totals cannot generate a compliant register at all, whatever it renders |

**The dispute case, which is where the three lifetimes pull apart.** An employee disputes a June absence in the following March. By then the punches may be past their ceiling. What survives is the `FormIXRow` for June — the statutory record, with its per-day timestamps — and the frozen counts in June's snapshot. That is enough to answer what was recorded and what was paid; it is not enough to re-derive the raw event. A `RetentionHold` placed when the dispute opens is what preserves the punches, which is why a dispute is a hold trigger and not merely a workflow state (§14.7).

**AC-DM-111** — *Given* a period whose punches have passed their retention ceiling, *When* a dispute is raised about that period, *Then* the `FormIXRow`s and the frozen day counts are available and are identified as the surviving records, the raw punches are correctly absent, and a hold placed at dispute time prevents further erasure of anything still held.

#### 14.4.8 Document

Every stored file carries `classification` (§14.5) and `retention_class` (§14.7), plus `sha256` (tamper-evidence for filed artefacts), `storage_region` (residency, §14.8) and `linked_entity`. Document types include the appointment letter — in the form the appropriate Government prescribes where the establishment has 10 or more workers (OSH Code s.6(1)(f)), which makes the template state-sphere and configured per state (EV-057; §07 FR-CHR-043) — wage slip, the TRACES-generated Form 130 stored as downloaded (EV-048), Form 124 (ex-12BB) proofs, KYC documents, and register exports. Any Aadhaar document lives only in the `AadhaarTokenVault`, never in the Document store (§14.4.15). **[Reversed]** v0.3 treated the prescribed-format letter as universal from 21 Nov 2025 (K-18). A `Document` that is a filed artefact is **write-once**: its `sha256` is recorded at generation and any later read verifies against it, so a filed return cannot be silently swapped. Documents are an erasable class (§14.6.1a): when a retention class expires the file is erased and a tombstone remains, while the `Filing` keeps the hash.

#### 14.4.8a `Document` — evidence artefacts, render determinism and template versions

The `Document` entity carries two populations with opposite requirements, and conflating them is how a filed return quietly becomes unverifiable. **Evidence artefacts** — the generated ECR or contribution file, the portal acknowledgement, the challan receipt, the TRACES-issued Form 130, a closed register export — must be write-once, hash-verified and bound to the snapshot they came from. **Convenience renders** — a payslip PDF, a letter, an on-screen register view — must be reproducible from their source and are therefore disposable.

| Property | Evidence artefact | Convenience render |
| --- | --- | --- |
| Write behaviour | Write-once; `sha256` recorded at generation; every later read verifies against it | Re-rendered on demand |
| Source of truth | The artefact itself; the hash lives on the `Filing` so it outlives the bytes (§14.4.5) | The `PayrollResult` plus the template version |
| Erasure | Tombstone when its class allows; the hash survives | Erase the file, keep the `Document` row |
| After erasure | The tombstone and the hash; never a regenerated file presented as the original | A re-render, **marked as a re-rendering** (§08 I4) |
| Template dependency | None — the artefact is the bytes the portal received | The template version is part of the reproduction contract |

**Render determinism.** A convenience render must reproduce byte-identically from `(PayrollResult version, template version, locale, rendering engine version)`. All four are stored on the `Document` row, because a silent template or engine upgrade turns "reproduce the March payslip" into "produce a March-like payslip". The template is a versioned object in its own right, and a template change is never retrospective: a re-render of a March payslip uses March's template version, not today's.

**Where the two populations meet.** A register export is an evidence artefact *for the period it covers* and a convenience render *before the register instance closes*. The model resolves this by binding the export to the instance's state: an export taken while the instance is `OPEN` is a convenience render and is marked as a working copy; an export taken after close is an evidence artefact with a hash. The distinction matters because the closed export is what a three-kilometre inspection constraint and a five-year clock attach to (EV-054), and a working copy that looks identical but carries no hash is exactly the artefact an inspection will find unconvincing.

**AC-DM-87** — *Given* an evidence artefact, *When* it is read at any later time, *Then* its bytes verify against the `sha256` recorded at generation; a mismatch is an integrity incident, not a warning, and the artefact is never silently regenerated to make the check pass.

**AC-DM-88** — *Given* a payslip whose rendered file has been erased under its retention class, *When* it is requested, *Then* it is re-rendered from the stored result version, template version, locale and engine version, is returned marked as a re-rendering, and is byte-identical to the original wherever all four are still available; where a template version is no longer available, the request returns the tombstone rather than a render from a different template.

#### 14.4.9 Benefits / FBP entities (build the model now, defer monetisation)

Per §11, the benefits *data model* is v1 even though monetisation is deferred — retrofitting these into a shipped payroll engine is expensive, and they are the option value on the entire attach business. The entities:

| Entity | Purpose | India-specific note |
| --- | --- | --- |
| `FbpDeclaration` | Employee's flexible-benefit-plan allocation across components (meal, LTA, telephone, books, fuel) per Tax Year | Meal perquisite limit ₹200/meal and gift/voucher ₹15,000 per tax year from 1 Apr 2026 (was ₹50 / ₹5,000) — **[Hypothesis]** (EV-019; §11); these limits are `EffectiveDatedRule` rows, not hardcoded. The meal exemption applies **only** to food provided during working hours at office or factory premises, or through non-transferable vouchers usable only at eating outlets; without those conditions the perquisite is taxable, payslips under-deduct, and the demand plus interest lands on the employer. The conditions are engine constraints on the component (`meal_delivery_mode`, voucher attestations — §11 BEN-62), and the 2026-Rules citation is routed to §20 (K-19). |
| `WalletConfig` / `WalletTransaction` | Wallet setup and spend ledger | Kept as a *ledger* so proof-of-spend and endorsement reconcile. |
| `ProofOfSpend` | Bill/proof against a wallet or exemption (HRA, LTA) | A `Document` (C2) with verification state; feeds Form 124 (ex-12BB) proof state (§07 FR-CHR-017). |
| `Dependant` | Dependant records (spouse/children/parents) for group health + ESI dependant benefit | C2; drives ESI dependant eligibility and insurance endorsement. |
| `InsurancePolicy` / `Endorsement` | Group health/GPA/GTL policy + add/delete endorsement history | Model software PEPM and attach revenue as **two lines never blended** (§11 **[Verified]**); the schema keeps them structurally separate. |
| `NpsSubscription` | Corporate NPS (PRAN), employer/employee contribution | Feeds the employer-contribution deduction in TDS (1961-Act s.80CCD(2); 2025-Act mapping per §06.13). |

**Design rule (D9 applied):** attach entities reference `Employment` and carry classification/retention like any other C1/C2 data, but they are **isolated from the payroll `PayrollResult` money-of-record** — a benefit wallet or an insurance endorsement never silently alters a filed statutory figure. This keeps the "two lines never blended" discipline enforceable at the schema level, not just in reporting.

**AC-DM-17** — *Given* a `WalletTransaction` or `Endorsement`, *When* it posts, *Then* it can adjust taxable-perquisite inputs for the *next* TDS computation via an explicit, audited feed, but it can never mutate an already-filed `PayrollResult` or `Filing` (D9).

#### 14.4.9a The money-of-record boundary, as a constraint

D9 says the two ledgers never blend. As a sentence it is a policy; as a schema constraint it is three specific prohibitions, and all three are checkable.

| # | Prohibition | What it stops |
| --- | --- | --- |
| MB1 | **No benefits, wallet, insurance or interchange row may be a foreign key on a `PayrollResult` figure.** The feed runs the other way: benefits rows produce *inputs* to a future TDS computation through an explicit, audited feed (AC-DM-17) | A wallet adjustment quietly restating a filed perquisite figure |
| MB2 | **No attach-revenue amount shares a table, a column or a sum with a money-of-record amount.** They are different ledgers with different owners and different audit expectations | A blended figure in a report that neither finance nor payroll can reconcile |
| MB3 | **No benefits row may write to, or reopen, a locked period.** Its effect lands in the next open period's inputs, labelled with the period it relates to | An endorsement in December silently changing a September payslip |

The constraint is worth stating in the data model rather than only in §11 because the pressure to violate it is commercial, not technical: an attach line that "just adjusts the payslip" is easier to build and easier to sell, and it is the schema — not a policy document — that has to refuse it. The refusal is also what keeps the two revenue lines separately reportable, which is the §11 discipline this section enforces structurally.

**AC-DM-121** — *Given* any benefits, wallet, insurance or interchange row, *When* it posts, *Then* no `PayrollResult` or `Filing` figure changes, its effect appears only as a labelled input to a future period's computation, and no report sums an attach amount with a money-of-record amount.

#### 14.4.10 Migration / opening-balance entities (mid-year cutover is first-class)

Migration is **a first-class product surface, not a services task** (§18.9, §16.7 **[Hypothesis]** — the churn-driver claim is not yet validated), and mid-year cutover is where churn-inducing friction concentrates. The data model therefore has dedicated entities so an imported employee lands *fileable*, not merely *stored*:

| Entity | Carries | Why it must exist as data |
| --- | --- | --- |
| `MigrationBatch` | Source system (Tally/Zoho Payroll/Kredily/Frappe/spreadsheet), cutover date, mapping profile, validation report | Importers from Zoho/Kredily/Frappe are *acquisition infrastructure* (§18.9, §16.7); the Tally import is the wedge. A batch never creates a `ConsentRecord` — consent cannot be backfilled; imported written-consent evidence attaches with its original date and provenance, and the onboarding consent flow is §07 FR-CHR-102 (Part E-12). Source biometric templates are never imported. |
| `OpeningBalance` | YTD earnings, YTD TDS already deducted, PF/ESI contributions YTD, leave balances, gratuity accrual clock start | Without YTD-TDS-deducted, the first in-house Form 138 statement is wrong and so is the TRACES-generated Form 130 built from it; without gratuity clock start, continuous-service is wrong. |
| `PreviousEmployerIncome` | Form 122 (ex-12B — EV-050) income + TDS from a mid-year joiner's prior employer | Required for correct annual TDS aggregation (§07 FR-CHR-018). |
| `CertificateContinuity` | Link from prior-system Form 16/130 and prior UAN/ESI IP continuity | UAN/ESI IP are portable; the migration must *continue* them, not mint new ones. |

**Cutover edge cases the model handles:**

1. **Mid-cycle investment declaration.** An employee whose investment declaration was in-flight in the old system — `FbpDeclaration` + `PreviousEmployerIncome` reconcile so proofs already submitted aren't re-demanded.
2. **YTD TDS already deducted.** Flows into `OpeningBalance` so the remaining-year TDS spreads correctly across the balance months and the TRACES-generated Form 130 reflects one continuous year across two systems. **Worked (illustrative figures — the liability comes from whatever slab, standard-deduction, rebate and cess rows are in force for the Tax Year, §06.5):** an employee migrated on 1-Oct with ₹12,00,000 income and ₹1,40,000 TDS already deducted Apr–Sep, projected full-year income ₹24,00,000, and a full-year liability the engine computes from the rule rows — say ₹2,90,000. The engine subtracts the ₹1,40,000 `OpeningBalance` already withheld → ₹1,50,000 remaining, spread over Oct–Mar = ₹25,000/month. It does **not** restart the year at ₹2,90,000/6 ≈ ₹48,333/month, which would over-withhold by ₹1,40,000 across the six months. **[Reversed]** v0.3's version used a ₹9,00,000 income with a ₹95,000 new-regime liability, which the rebate figures in §06.5 contradict. A mid-year joiner from another employer instead brings `PreviousEmployerIncome` (Form 122, ex-12B), which the engine *aggregates* into projected income before computing liability — a different path from `OpeningBalance` (same-employer continuity vs prior-employer aggregation), and conflating the two mis-states the year's withholding.
3. **Leave balances** import as an opening `LeaveTransaction` so the derived `LeaveBalance` is auditable from day one.
4. **Gratuity clock.** `OpeningBalance.gratuity_clock_start` carries the original DOJ so continuous-service is not reset to the migration date — a silent reset here would understate a future gratuity claim.

**AC-DM-18** — *Given* a mid-year `MigrationBatch` with `OpeningBalance.ytd_tds_deducted`, *When* the first in-house run computes TDS, *Then* the annual liability is reduced by the opening YTD figure and spread over remaining months, and the Q4 salary annexure (Annexure II — generator fenced until the format is released, EV-046, EV-047) carries full-year figures including the opening YTD, so the TRACES-generated Form 130 (EV-048) reflects one continuous year across both systems.

**AC-DM-19** — *Given* an imported employee with a prior `UAN`/`ESI IP`, *When* migration completes, *Then* the existing identifiers are continued (linkage state carried forward) and no new UAN/ESI IP is minted; a duplicate mint is a release-blocking migration defect.

#### 14.4.10a Continuity constraints — what a migration may never do

§16 owns the importers and their tie-out criteria. What §14 owns is the set of things a migration may never do to the model, because each of them is irreversible in a way the customer discovers months later — and because an importer is the one write path that routinely runs with elevated privileges and bulk volume.

| # | Constraint | What it prevents | Detection |
| --- | --- | --- | --- |
| MG1 | **No new UAN or ESI IP is minted for a person who already has one.** Existing identifiers are continued with their linkage state carried forward | A forked member record, and a returning employee's service history split across two numbers | A duplicate mint is a release-blocking migration defect (AC-DM-19) |
| MG2 | **`gratuity_clock_start` carries the original date of joining**, not the cutover date | A silently understated future gratuity claim — the defect that surfaces at an exit years later, when nobody remembers the migration | The `ServiceRecord` derivation reads the migrated clock start (§14.4.19 step 2) |
| MG3 | **No `ConsentRecord` is synthesised.** Imported consent evidence keeps its original date and provenance; a source system's boolean is not an artefact | A consent record that looks captured and was manufactured — which is worse than having none, because it misrepresents the evidence | N12; `provenance` has no `synthesised` value |
| MG4 | **No biometric template is imported.** Enrolment is re-done under this product's own consent capture | Templates arriving with no consent artefact and no erasure ledger | The importer has no path to the biometric keyspace |
| MG5 | **Opening balances are attested before the first live run**, and a superseding set is a new attested set, never an edit | A first in-house Form 138 statement built on unverified YTD figures, and a Form 130 that spans two systems incorrectly | §08 FR-PAY-314's attestation gate; AC-DM-18 |
| MG6 | **No assignment history is created behind the cutover boundary** for periods the model has no inputs for | A fabricated employment history that looks authoritative | The §14.3.2 decision table refuses the write; the fact is recorded on the `MigrationBatch` instead |
| MG7 | **`PreviousEmployerIncome` and `OpeningBalance` are never conflated.** One aggregates a prior employer's figures into projected income; the other reduces the remaining liability for the same employer's own year | A mid-year joiner's withholding computed on the wrong path, over- or under-deducting for the rest of the year | §14.4.10 case 2; the two entities are separate by design |
| MG8 | **An imported row carries its source and its batch.** Every imported value is traceable to the file and the mapping profile it came from | An unexplainable figure in year two, with nobody able to say where it came from | `MigrationBatch` reference on every imported row |

**Why these are constraints and not guidance.** A migration is the one moment when a customer's entire history enters the model in a single transaction, under time pressure, usually in April. Every one of MG1–MG8 is cheap to enforce at import and expensive to detect afterwards: a forked UAN surfaces at a claim, a reset gratuity clock at an exit, a synthesised consent at an audit. The asymmetry is the argument for enforcing them in the importer's write path rather than in a runbook.

**AC-DM-122** — *Given* a migration batch containing employees with existing UANs, ESI IPs and service history, *When* the import completes, *Then* no identifier is minted, every `gratuity_clock_start` equals the source's original date of joining, no `ConsentRecord` and no biometric template exists as a result of the import, and every imported row names its batch and source row.

**AC-DM-123** — *Given* a migration batch whose opening balances have not been attested, *When* the first live run is attempted for an affected employee, *Then* it is refused with the missing attestation named, and a later attestation arrives as a new attested set rather than as an edit of the prior one.

#### 14.4.11 EffectiveDatedRule + Jurisdiction

Covered in depth in §14.6 — it is the entity that makes multi-state + retrospective payroll tractable.

#### 14.4.11a `Jurisdiction` — the entity, including the levels below a state

`Jurisdiction` looks like a lookup table and is not one. Three properties make it load-bearing: it descends below the state, it carries the sphere, and it carries a **per-Code** commencement date rather than a single one. A model that stores a two-letter state code satisfies none of the three.

| Field | Type | Note |
| --- | --- | --- |
| `jurisdiction_id` | Surrogate | The key every `EffectiveDatedRule` scopes to |
| `level` | `central` \| `state_ut` \| `local_body` | Tamil Nadu and Kerala levy PT at local-body level (§06.4), so a state-only model cannot key their slabs at all |
| `parent_jurisdiction_id` | Self-reference | A local body's parent is its state; a state's parent is Central for resolution's most-specific-wins ordering (§14.6.3 step 3) |
| `state_code` | Code | Also used to check a GSTIN's first two digits against the establishment's state (§14.9) |
| `sphere` | `central` \| `state` | Whether the central or the state Government is the appropriate Government for a given matter (EV-057) — a rule row's `applies_to_sphere` matches against it |
| `code_regime_dates[]` | One date per Code | **Per Code, not per state.** A state may commence its rules under one Code before another, and a single `regime_start` collapses four independent facts into one (§06.9) |
| `levies[]` | Per scheme, a tri-state: levies / does not levy / not established | "Does not levy" is a recorded fact; "not established" is an admission. Collapsing them is how an unchecked state becomes a silent zero (RR6) |

**Why the per-Code dates matter in the data rather than in the engine.** Resolution reads, for one employment on one date, the work location's state, its sphere, and *the commencement date of the specific Code whose rule type is being resolved*. A register-form question resolves against the OSH commencement; a wage-definition question against the Code on Wages; a contribution question against the Code on Social Security. Storing one date per state forces the engine to pick one of the four and be wrong for the others in any window where they differ.

**The local-body case, specified.** Where a levy sits at local-body level, three things follow. The `pt_slab` row is keyed to the local body, not the state. The `WorkLocation` must resolve to the local body, which means the work location carries enough address structure to do so, or the tenant selects it explicitly — and where it cannot be resolved, the obligation is `unconfigured` rather than defaulted to a state row (RR5). And the `Registration` is held against whatever body issues it, which may be the local body itself. None of this is speculative modelling: it is the minimum the two named states require, and a schema that cannot express it will need a migration the first time a customer opens an office in either.

**AC-DM-116** — *Given* a work location in a state that levies PT at local-body level, *When* PT is resolved, *Then* the rule row is selected at the local-body jurisdiction; where the local body cannot be resolved from the work location, the obligation is `unconfigured` and surfaced, and no state-level row is substituted.

**AC-DM-117** — *Given* a state whose Code-era rules commenced on different dates under different Codes, *When* a register-form rule and a wage-definition rule are resolved for the same employment on the same date, *Then* each resolves against its own Code's commencement date, and the lineage records which date was used for which figure.

#### 14.4.12 AuditEvent, ConsentRecord / DataPrincipalRequest, RetentionHold

`AuditEvent` is append-only, NTP-synced (NIC/NPL, per CERT-In — EV-062 **[Verified]**), retained **at least 180 days within Indian jurisdiction** as ICT logs (EV-062; longer where a statutory register or dispute requires). It records `actor, role, action, entity, before, after, authority (statutory basis or approval), rule_version, ts_ntp`. Because a wrong payroll number is a legal problem (§08 **[Verified]**), every statutory/monetary write path emits exactly one `AuditEvent` and cannot commit without it.

`ConsentRecord` is **load-bearing today**. SPDI r.5(1) requires consent in writing before collecting sensitive personal data — biometric and financial information, including bank details (EV-060) — and an Aadhaar number enters the vault only on a Sharing Regulation 5 consent (EV-068). The record's shape — versioned, per purpose and regime, stating whose artefact it is — is specified in §14.4.15. **[Reversed]** v0.3 said DPDP s.7(i) already exempts employment processing from consent and confined consent to optional purposes; s.7(i) is not in force until on or about 13 May 2027, and when it commences it disapplies consent and notice for employment purposes only, not the s.8 duties (EV-058; K-03).

`DataPrincipalRequest` (the DPR) is a small workflow entity: `type ∈ {access, correction, erasure, grievance, nomination}`, `raised_at`, `regime`, `sla_due_at`, `status`, `reasoned_response_document_id`, `decision_basis`. The types mirror DPDP Chapter III (EV-066), which is not in force until on or about 13 May 2027 (EV-058). Its lifecycle is `received → verified_identity → evaluated → responded (with reasoned response) → closed`; erasure requests fork into the §14.7 deletion engine. The machinery is built now; its statutory basis is under counsel review (§14.7.3).

`RetentionHold` is the override that pins rows against deletion during litigation/investigation/tax scrutiny: `scope (employee|payrun|establishment|tenant), reason, authority, placed_at, released_at`. While active it beats every erasure and every retention ceiling.

**AC-DM-20** — *Given* any write to a statutory or monetary field, *When* the transaction commits, *Then* exactly one `AuditEvent` with a valid NTP timestamp and stated `authority` is committed atomically with it; a write without its audit row is impossible.

#### 14.4.13 What the model deliberately does not store (the anti-patterns)

A data model is defined as much by its refusals as its tables. Each refusal below traces to a specific §PRD finding, and is a schema-level prohibition, not a guideline:

| Refusal | Why | Source |
| --- | --- | --- |
| **No model-generated statutory or monetary figure** is ever persisted as truth | "No statutory or monetary figure may ever be model-generated" — a wrong payroll number is a legal problem. AI output is stored only as C3 draft/explanation, structurally separated from `PayrollResult`. | §08 **[Verified]** |
| **No biometric image anywhere, and no template outside the biometric keyspace** — no image column, no image bucket | Enrolment images are deleted after template extraction; a template lives only in its separate keyspace; a `Punch` never references a template, so the attendance record survives template destruction. **[Reversed]** v0.3 deferred this to "final DPDP Rules"; the design now follows Part E-6, and nothing here rests on a DPDP sensitive category, which does not exist (EV-059). | Part E-6; §14.4.15; §09 FR-DEV-007 |
| **No Aadhaar number, or hash of one, in any business table, log, export, analytics store or model call** — and Aadhaar is never a filing key | Business rows hold an opaque vault token only; UAN/ESI IP are the filing keys. | Part E-6; §07 FR-CHR-099; EV-068 |
| **No single `wage` column** | At least four concurrent wage computations exist per employee per period (§06.10; §14.4.3). | §06.10 **[Verified]** |
| **No `current PT slab` reference on a computed result** | Results cite a *versioned* `rule_id`, so re-opening a later period cannot mutate a filed artefact. | §14.6, D2 **[Verified]** |
| **No hard `DELETE` from the app** | Deletion is the §14.7 policy engine's reasoned decision, executed by crypto-shredding or tombstone (§14.6.1a). | D8 **[Verified]** |
| **No blending of software money-of-record and attach/interchange money** | "Two lines never blended." | §11, D9 **[Verified]** |
| **No PF Member ID on `Person`**, and no identifier at more than one level | PF Member ID is establishment-code-scoped and a new one opens on every inter-establishment move; it lives on the `EstablishmentMapping`. PAN, UAN and ESI IP live only on `Person`; TAN and PTEC only on `LegalEntity` (§07 FR-CHR-104). | §07 FR-CHR-104; §14.9 |
| **No per-employee PT enrolment** | PT registrations belong to the establishment (PTRC) and the legal entity (PTEC); the employee-level fact is derived eligibility. | §07 FR-CHR-104 |

These refusals are the mirror image of §20: the product declines to build hardware, a premium AI SKU, or interchange-monetised free HRMS at the *business* layer; the data model declines the corresponding *schema* shortcuts that would quietly re-open those doors.

#### 14.4.14 Cardinality / volume shape (a hint for §15 storage)

Rough per-tenant magnitudes at the top of the 20–200-employee beachhead, to inform partitioning and hot/cold placement (§15) — order-of-magnitude, not commitments:

| Entity | Growth driver | Shape |
| --- | --- | --- |
| `Punch` | employees × working-days × punches | **Highest-volume** row; ~200 emp × ~25 days × 2 punches ≈ 10k rows/month; erasable, while the `FormIXRow`s derived from it carry the register retention |
| `AuditEvent` | every statutory/monetary write | High-volume, append-only, at least 180 days kept within India (EV-062), then cold |
| `PayrollResult` | employees × runs (regular + off-cycle + arrears) | ~200–400 rows/month; hot for open + reopenable periods |
| `Filing` | ~4–8 per establishment per month | Low-volume, high-value, never cold (evidence) |
| `EffectiveDatedRule` | notifications, not tenant activity | Small, shared, reference; C4; cached |
| `LeaveTransaction` | accruals + events | Medium; append-only ledger |
| `Document` | filings + KYC + slips | Object-store; `storage_region` + `retention_class` drive lifecycle |

The design consequence: the two append-only high-volume ledgers (`Punch`, `AuditEvent`) dominate storage but are cheap to tier; the low-volume high-value entities (`Filing`, `PayrollResult` lineage, `EffectiveDatedRule`) are what must never be lost or mutated. Storage economics and integrity requirements therefore point in *opposite* directions across the model — which §15 must resolve, not average away.

#### 14.4.15 Segregated identity stores — Aadhaar token vault, biometric template, consent record (Part E-6)

Three kinds of data are kept out of the rings by construction, because retrofitting any of them means a migration across every module and an audit of every query. §07 (FR-CHR-099–103) owns the capture behaviour and §09 (FR-ATT-017, FR-DEV-007) owns biometric capture and the device protocol; this subsection fixes the entity shapes and the invariants a physical schema must hold.

| Entity | Fields | Store and keys | End of life |
| --- | --- | --- | --- |
| `AadhaarTokenVault` | `aadhaar_token` (opaque and random — not derived from the number), `aadhaar_number` (ciphertext), `consent_id` (Sharing Regulation 5 consent — EV-068), `purpose`, `purpose_spent_at`, `deleted_at` | Separate store, separate encryption keys, separate access control; encrypted transmission, a legal requirement (reg 6(4), EV-068); excluded by default from support tooling, analytics, exports, sub-processors and every model call (§07 FR-CHR-099). Hosting outside India is a counsel question (Part D-15), so the vault is India-only | Deleted once the consented purpose is spent — reg 6(5) sets a ceiling, not a floor (EV-068). The business-row token then resolves to a tombstone |
| `BiometricTemplate` | `template_id`, `employment_id`, `modality`, `consent_id`, `key_ref` (biometric keyspace), `enrolled_at`, `erased_at` | Separate keyspace, independently access-controlled and logged. No image column and no image bucket: enrolment images are deleted after template extraction | Key destruction plus two-phase device-side erasure (§09 FR-DEV-007), on exit, consent withdrawal or a switch to the non-biometric path |
| `DeviceEnrolment` | (`employment_id`, `device_sn`), `enrolled_at`, `erase_cmd_id`, `ack_at`, `exception_state`, `attested_by` | The per-device enrolment and erasure ledger, with a retry queue for offline devices | `erased-confirmed` on the device's acknowledgement, or `closed-by-attestation` through the documented exception state (an admin attests decommission or loss) |
| `ConsentRecord` | `consent_id`, `version`, `data_principal_id`, `purpose`, `data_classes`, `regime` (SPDI r.5(1) / Aadhaar Sharing Reg 5 / DPDP), `notice_text_version`, `capture_form` (written wherever the regime requires it), `artefact_owner` (employer / vendor / both — who owes the SPDI duty is under counsel review, Part D-4), `granted_at`, `withdrawn_at`, `provenance` (captured / imported evidence) | Append-only and versioned; a withdrawal is a new version, never an edit | Erasable class (§14.6.1a), kept as evidence for the counsel-set parameter `retention.consent_evidence` |

**Invariants.**

1. **No Aadhaar number, and no hash of one, in any business table, log, export, analytics store or model payload.** Business rows carry `aadhaar_token` only.
2. **The attendance record survives template destruction.** A `Punch` carries employee id and timestamp and never a template reference, so erasing a template leaves every punch, `DayStatus` and `FormIXRow` valid (§09.1-A).
3. **Two consent regimes run concurrently.** Every `ConsentRecord` carries its regime. At the switch on or about 13 May 2027 (EV-058) nothing is rewritten, re-dated or discarded: SPDI-regime records stay as captured and DPDP-regime records begin alongside them. Whether the SPDI Rules survive the omission of IT Act s.43A is a counsel question (Part D-12).
4. **Consent is never backfilled.** No import or job synthesises a `ConsentRecord`; imported evidence keeps its original date and provenance (§07 FR-CHR-102).
5. **Neither Aadhaar nor biometric enrolment is ever a condition** of employment, payroll or any benefit, and no tenant configuration can make it one (Part D-10; §07 FR-CHR-101).
6. **The vault is named for its function, not for a UIDAI regime.** `AadhaarTokenVault` is this product's own segregated store. Whether UIDAI's Aadhaar Data Vault and HSM regime binds a non-requesting entity is under counsel review (Part D-6; §23), and so is whether an employer entering Aadhaar into EPFO or ESIC portals becomes a "requesting entity" (Part D-7). This PRD asserts neither, and the store's separate keys and access control are specified so that the answer changes key custody, not the schema.

**AC-DM-31** — *Given* every business table, audit record, log line, export, analytics store and model-call payload, *When* the build-time schema and egress test runs, *Then* no Aadhaar number and no hash of one is found; the only Aadhaar-related value outside the vault is the opaque token.

**AC-DM-32** — *Given* an employee enrolled on three terminals who exits, *When* erasure runs, *Then* the template key is destroyed, a delete command is queued per device, the erasure shows complete only when each device has acknowledged or has been closed by attestation (shown as `closed-by-attestation`, never `erased-confirmed`), and every punch and Form IX row for the employee remains readable.

**AC-DM-33** — *Given* a `ConsentRecord` captured under SPDI r.5(1) before on or about 13 May 2027, *When* the DPDP regime commences, *Then* the record is unchanged and still resolvable as evidence of what was captured under it, and any DPDP-regime record for the same purpose is a new record alongside it.

#### 14.4.16 The segregated stores, field by field — keys, lifecycles and the paths that may reach them

§14.4.15 fixes the shapes. This subsection fixes the *mechanics*: which key opens which store, what each lifecycle's states are, and which code paths are allowed to hold a handle at all. These are the three stores where a schema shortcut is not a technical-debt item but a legal exposure (EV-067, EV-068), so they are specified to the level a reviewer can check by reading a query plan.

**Key hierarchy — four independent roots.** §17.4 owns the key-management NFRs; this is the model's requirement on them.

| Keyspace | Root | Encrypts | Who may request a decrypt | Destruction effect |
| --- | --- | --- | --- | --- |
| Tenant data key | Per tenant | Ring 1–4 business rows at rest | Any in-tenant service | Tenant-wide unreadability — a decommission mechanism, never an erasure mechanism for one subject |
| Subject data key | Per data principal, inside the tenant hierarchy | The personal fields of B- and R-class rows, and E-class payloads about one subject | The subject's own service paths and the deletion engine | The subject's personal fields unreadable everywhere, backups included (§14.6.1a) |
| Aadhaar vault key | Separate root, not derived from the tenant key | `AadhaarTokenVault.aadhaar_number` | The vault service only, on a token plus a purpose | The vault entry unreadable; business rows keep a token that resolves to a tombstone |
| Biometric keyspace | Separate root | `BiometricTemplate` | The matcher path only | Template unreadable; every `Punch`, `DayStatus` and `FormIXRow` unaffected (§14.4.15 invariant 2) |

The separation is the point: a subject-key shred must not need the vault key, and a vault compromise must not read a template. Three of the four roots exist so that **one destruction does not have to be trusted to cascade**.

**`AadhaarTokenVault` — token lifecycle.** The token is the only Aadhaar-derived value any business row holds, and it is opaque and random — not derived from the number, not a hash, not a truncation (§14.4.13).

| State | Entered when | What a business row's token resolves to | Exit |
| --- | --- | --- | --- |
| `none` | The employee has not provided a number, or declined | No vault entry; the field is absent, not null-with-meaning | `held`, if the employee later provides one under a Sharing Regulation 5 consent (EV-068) |
| `held` | A number is stored against a consent id and a stated purpose | Masked display at most, served by the vault, never by the caller | `purpose_spent`, `withdrawn`, or `invalidated` |
| `purpose_spent` | The consented purpose is complete | A tombstone; the token stays referentially valid so no foreign key breaks | `deleted` on the next sweep |
| `withdrawn` | The employee withdraws consent | A tombstone immediately | `deleted` |
| `invalidated` | The stored number failed re-validation, or a duplicate was detected across persons in the tenant | A tombstone plus an operator task; the product never merges or reconciles two persons on an Aadhaar match | `deleted` |
| `deleted` | Ciphertext destroyed, vault row tombstoned | A tombstone, permanently | Terminal |

Three refusals sit in this table. The product never uses the number as a **join key** (so `invalidated` raises a task rather than a merge), never uses it as a **lookup key** for support (the vault is excluded from support tooling by default, §07 FR-CHR-099), and never **re-creates** a deleted entry from a filed artefact or a register export — a register rendered while the number was held is a `Document` in its own retention class, and rendering is one-way (§14.4.17).

**`BiometricTemplate` and `DeviceEnrolment` — the erasure ledger.** The erasure is distributed: the template is in the product's keyspace, but copies of the enrolment sit on every terminal the employee was enrolled on, and a terminal can be offline, decommissioned or lost. The model makes the *incomplete* case a first-class state rather than a silent success.

| `DeviceEnrolment.exception_state` | Meaning | What the erasure record shows | What clears it |
| --- | --- | --- | --- |
| `none` | The device acknowledged the delete command | `erased-confirmed` | — |
| `pending_retry` | Command queued; the device has not acknowledged | Erasure **incomplete**, with the device serial and the age of the command | An acknowledgement |
| `unreachable` | Retry budget exhausted | Erasure incomplete, escalated to the tenant admin | An acknowledgement, or an attestation |
| `attested_decommissioned` | An admin attests the device was decommissioned and destroyed | `closed-by-attestation`, naming the attester and the date — never `erased-confirmed` | Terminal |
| `attested_lost` | An admin attests the device was lost or stolen | `closed-by-attestation`, and the tenant's incident process is prompted (§17) | Terminal |

`closed-by-attestation` and `erased-confirmed` are deliberately different values, because they are different facts. A product that collapses them reports a clean erasure it cannot evidence — which is the exact claim a customer's security review will test.

**`ConsentRecord` — the two-regime version chain.** Every record is append-only and versioned; a withdrawal is a new version, never an edit (§14.4.15). The version chain has to answer, at any later date, *what was captured, under which regime, in whose name, against which notice text*.

| Field | Constraint |
| --- | --- |
| `consent_id` + `version` | The pair is the primary key; `version` is monotonic; no version is ever rewritten |
| `regime` | `spdi_r5` / `aadhaar_sharing_reg5` / `dpdp` — set at capture, never migrated. Records under two regimes coexist across the commencement on or about 13 May 2027 (EV-058) |
| `purpose` + `data_classes` | The purpose is the ceiling for anything the consent authorises; `data_classes` names the classes actually collected under it, so a later class addition needs a new version, not a re-read of the old one |
| `capture_form` | `written` wherever the regime requires it (SPDI r.5(1) requires consent in writing for the sensitive set — EV-060) |
| `artefact_owner` | `employer` / `vendor` / `both` — who owes the duty is under counsel review (Part D-4), so the field is populated per tenant and the machinery works under either answer |
| `notice_text_version` | The exact notice shown, versioned, so "what were they told" is answerable without archaeology |
| `provenance` | `captured` (this product) or `imported_evidence` (migration, with its original date). Never `synthesised` — no import or job creates a consent (§14.4.15 invariant 4) |
| `granted_at` / `withdrawn_at` | Withdrawal opens a new version and triggers the §14.7 engine for anything held only on that consent |

**Negative cases for the segregated stores.**

| # | Attempt | Expected behaviour |
| --- | --- | --- |
| N8 | An analytics job joins on `aadhaar_token` across tenants | Refused: the token is tenant-scoped and the join is structurally impossible (D5, AC-DM-01) |
| N9 | A support agent searches for an employee by Aadhaar number | No such search path exists; the vault is excluded from support tooling (§07 FR-CHR-099) |
| N10 | An export template includes the vault field | Build-time schema test fails (AC-DM-31); the export cannot ship |
| N11 | A model call payload contains a template or a number | The redaction chokepoint denies by default before egress (Part E-7; §12.8) |
| N12 | A migration importer maps a source system's "consent given" boolean to a `ConsentRecord` | Refused: a boolean is not an artefact, and consent is never backfilled (invariant 4) |
| N13 | A tenant configures "biometric only" attendance, or "no Aadhaar, no payroll" | No such configuration exists in the schema (Part D-10; invariant 5) |
| N14 | A punch row is written carrying a `template_id` | Refused; the column does not exist, which is what makes template destruction safe (invariant 2) |

**AC-DM-50** — *Given* an employee whose Aadhaar vault entry reaches `purpose_spent`, *When* any business row holding her token is read, *Then* the token resolves to a tombstone with no reconstruction path, every foreign key remains valid, and no filed artefact, register export or EPF record is altered — EPF records key on UAN, never Aadhaar.

**AC-DM-51** — *Given* an employee enrolled on a terminal that is later lost, *When* biometric erasure runs and an admin attests the loss, *Then* the erasure record reads `closed-by-attestation` with the attester and date, never `erased-confirmed`, and the tenant's incident process is prompted.

**AC-DM-52** — *Given* a `ConsentRecord` whose `data_classes` do not include a class a new feature needs, *When* that feature attempts to collect the class, *Then* collection is refused until a new consent version is captured; the existing version is not amended, re-dated or re-interpreted.

#### 14.4.17 The input snapshot as a stored object

§08 FR-PAY-313 specifies *what the snapshot must contain* — the completeness contract, class by class, with the behaviour when a class is short. This subsection specifies what it **is as a row in the store**, because three properties of the stored object are what make replay survive an erasure, and none of them are visible from the completeness contract alone.

<!-- DIAGRAM: data-model-snapshot-lineage -->

| Property | Specification | Why the alternative fails |
| --- | --- | --- |
| **Decomposition** | The snapshot is stored as ordered *parts* — one per fact class in FR-PAY-313's table — each with its own content hash, plus a manifest listing part ids, hashes and the cut-off that closed each class | A single blob cannot tell a reader which class changed between two versions, which is what AC-303.3 needs to attribute a figure change to a cause |
| **By-value for erasable-derived facts** | Counts derived from erasable inputs — paid days, LOP days, NCP days, OT hours by band — are stored **by value**. No part holds a punch, a rendered document, a template or a consent artefact | A by-reference count breaks the moment the punches behind it are erased; by-value is the whole reason AC-DM-34 holds |
| **By-reference plus knowledge time for B-class rows** | Assignments, structures, eligibility and identifier-linkage rows are referenced as `(row_id, recorded_at)` — the bitemporal coordinate, not the row's current content | A live reference would let a later correction silently change what a locked month was computed from; a copy would bloat the snapshot and lose the lineage back to the rule object |
| **Content hash** | `snapshot_sha256` over the manifest; the manifest covers the part hashes; a part hash covers the part's canonicalised content | Without a hash, "the same snapshot" is an assertion; with it, replay's byte-identity claim is checkable |
| **Immutability and supersession** | A snapshot version is never edited. A reopen writes a new version; the superseded version is kept with the reason and the actor | An edited snapshot makes two result versions incomparable |
| **Class and retention** | R (records of fact) — append-only, retained at the longest floor of anything computed from it (§14.7.4) | A snapshot that expires before the artefact built from it leaves the artefact unreplayable while it is still statutorily retained |
| **Storage placement** | Inherits the tenant's `storage_region`; a snapshot part is never written to an analytics store or a sub-processor | A copy in a second region is a residency claim the tenant did not make (§14.8) |

**What a reader gets from a superseded B-class reference.** The snapshot references `(row_id, recorded_at)`. If that row has since been superseded — a corrigendum, a corrected assignment, a re-captured identifier state — the read resolves to the version current *at the snapshot's* `recorded_at`, not the version current now. That is the same resolution rule as §14.6.3 step 2, applied to master data rather than rules, and it is what makes "what did we believe then" answerable for the whole snapshot and not only for the rule set.

**Worked example — two result versions, one attributable difference.** A September month is processed, then reopened because an employee's LOP was wrong.

| | Snapshot v1 | Snapshot v2 |
| --- | --- | --- |
| Day-status part hash | `h1` | `h2` — the only part hash that changed |
| Assignment part | `(CA-77, recorded_at = 12-Sep)` | unchanged |
| Rule set | resolved at decision time D1 | resolved at decision time D2 |
| Result | gross ₹18,000, ESI employee 0.75% × ₹18,000 = ₹135.00 | gross ₹17,280 after one LOP day under the run's configured day-rate convention (§08's three named conventions), ESI employee 0.75% × ₹17,280 = ₹129.60 |

Exactly one part hash moved, so the ₹5.40 ESI difference is attributable to the day-status class and to nothing else. Had the rule set also moved between D1 and D2, the manifest plus the two decision times would separate the two causes — which is the property FR-PAY-313's note about decision time depends on, expressed as a stored structure.

**Negative cases.**

| # | Attempt | Expected behaviour |
| --- | --- | --- |
| N15 | A snapshot part stores punch rows rather than counts | Build-time schema test fails; the erasable-class exclusion is structural (AC-313.6; §14.6.1a) |
| N16 | A reopen edits the existing snapshot version in place | Refused; a reopen writes a new version and keeps the prior one with its reason |
| N17 | A replay resolves a B-class reference to the row's *current* version | Defect: replay must resolve at the snapshot's `recorded_at`; the regression corpus asserts a divergent figure here fails the build |
| N18 | A snapshot is deleted while the filing built from it is still retained | Refused by the retention matrix — the snapshot's floor is the longest floor of anything computed from it (§14.7.4) |

**AC-DM-53** — *Given* two result versions for one month, *When* their snapshot manifests are compared, *Then* every changed figure is attributable to a changed part hash, a changed decision time, or both; a figure that changes with neither is a lineage defect that blocks release.

**AC-DM-54** — *Given* a snapshot referencing a B-class row that has since been superseded, *When* the month is replayed, *Then* the resolution returns the version current at the snapshot's `recorded_at`, the replayed figures are byte-identical to the original, and the superseding version is visible in the lineage as a later belief, not as the input used.

#### 14.4.18 Multi-subject records — why erasure needs two mechanisms

Crypto-shredding a subject key erases everything encrypted under that key. It is exactly the wrong mechanism for a record whose payload is about **many** subjects, and Indian statutory records are full of them: a wage register covers every employee for a period, an attendance register-cum-muster roll is a sheet of the whole establishment's month, an ECR file is a member-wise return, a bank disbursement file is a batch. Destroying one subject's key must not make another subject's statutory record unreadable — that would convert one erasure request into a compliance failure for everyone else on the sheet.

| Record | Subjects | Erasure mechanism | Consequence for one subject's request |
| --- | --- | --- | --- |
| `PayrollResult` | One | Subject-key shred; figures survive against `employment_id`, personal fields return `ERASED` | Available once the class's floor has run |
| Payslip render | One | Erased under its retention class; re-rendered from snapshot and template and marked as a re-rendering (§08 I4) | Available |
| Register instance and its export | Many | **Tombstone only** — the payload is replaced as a whole record, never per subject | Not available while any subject's floor still runs; the response says so and names the class (§14.7.2) |
| Generated ECR or contribution file | Many | Tombstone; the `Filing` keeps `artefact_sha256` so the artefact's identity outlives its bytes | Not available until the artefact's own floor has run |
| Bank disbursement file | Many | Tombstone | As above |
| `AuditEvent` | One actor, one subject | Neither — the audit row is the evidence that the erasure happened; it never contains erased content | Never erased by a subject request |

**The consequence a build team must design for.** A per-subject erasure request against an employer's records resolves, in the ordinary case, to: *subject-key shred for the single-subject records whose floors have run; tombstone-when-due for the multi-subject records; retention with a reasoned response for everything still inside a floor.* That is why §14.7.2 branch 2 answers with a **date** rather than a refusal, and why §14.7.1's period-scoping of register instances matters — a register that never closes never acquires a determinable clock, so nothing on it ever becomes erasable (the inference at r5/04 finding 44; §06.9 owns the register lifecycle itself).

**Worked example — one leaver, three record shapes, three answers.** An employee exits in March and requests erasure in June.

1. Her `PayrollResult` rows: single-subject, encrypted under her subject key, retained until the longest applicable floor has run. Answer: retained, with the class and its erasable date, or "under confirmation" where the floor is a counsel-set parameter (§14.7.5).
2. The March attendance register instance covering her establishment: multi-subject. Her rows cannot be surgically removed without destroying the register's integrity as a statutory record, and the instance's clock is a property of the register, not of her. Answer: retained; the instance becomes erasable as a whole when its own clock and any destruction gate allow.
3. Her enrolment template and any vault entry: single-subject, ceiling classes, already erased on exit and on purpose-spend respectively (§14.4.15). Answer: already erased, with the erasure's audit reference.

One request, three mechanisms, one reasoned response. A model that knows only `DELETE` produces either an unlawful deletion or an unexplainable refusal.

**AC-DM-55** — *Given* an erasure request from one subject named on a multi-subject register instance whose clock is still running, *When* the deletion engine evaluates it, *Then* no row is removed from the instance, no other subject's data becomes unreadable, and the response names the instance's class, its clock anchor and its erasable date or the fact that the date is under confirmation.

**AC-DM-56** — *Given* a subject key destroyed for a data principal, *When* a multi-subject register export naming that principal is read, *Then* it remains readable for every other subject on it, and the principal's own personal fields inside it are governed by the instance's own tombstone timing, not by the key destruction.

#### 14.4.19 `ServiceRecord` — the derivation algorithm

§07 FR-CHR-016 owns the gratuity eligibility rule; §14.3.1 gives the record's fields. This is how the record is *computed*, because a derived entity with no stated algorithm becomes a hand-edited entity within two quarters, and a hand-edited gratuity clock is the single most expensive silent defect in the model (T8).

**Inputs, in order.**

1. Every `Employment` of the person with that legal entity, each contributing a segment `[DOJ, DOL]` — or `[DOJ, ∞)` for a live employment.
2. The `OpeningBalance.gratuity_clock_start` where the person arrived through a migration, which supplies the segment start behind the cutover boundary (§14.4.10).
3. The counted days per twelve-month window, read from the input snapshot frozen at each `INPUTS_CLOSED` (§14.4.17) — never from punches, which is what makes AC-DM-41 hold.
4. The `break_treatment` decision for each gap between segments, with its `basis` and `decided_by`.
5. The version of the eligibility-test rule in force (`gratuity.four_years_240_days_rule`, **[Hypothesis]**, §07 FR-CHR-016).

**Algorithm.**

1. Order the segments by start date. A segment whose start precedes the cutover uses the migrated clock start.
2. For each gap between consecutive segments, read its recorded `break_treatment`. There is no default: an undecided gap leaves the record in `derivation_blocked` with an operator task, rather than silently bridging or breaking.
3. Sum the counted days per twelve-month window across bridged segments, applying the CoSS s.54 inclusions the §06.6 reading carries — lay-off, paid earned leave, temporary disablement from employment injury, and maternity leave up to twenty-six weeks (§06.6 **[Verified]**).
4. Set `clock_start` to the earliest bridged segment's start.
5. Stamp the record with the rule version used and the snapshot ids the counted days came from.
6. Re-derive on: a new employment, an exit, a `break_treatment` decision, a corrected DOJ or DOL, or a new locked period contributing counted days. Never on a punch write — punches are not an input.

**Worked example.** A person joins LE-1 on 1 June 2021, exits 31 May 2023, rejoins 1 February 2024 and is still employed.

| Step | Result |
| --- | --- |
| Segments | S1 `[1-Jun-2021, 31-May-2023]`; S2 `[1-Feb-2024, ∞)` |
| Gap | 1 June 2023 to 31 January 2024, eight months |
| `break_treatment` | Recorded by a named approver with a basis; until it is recorded, the record sits in `derivation_blocked` |
| If `bridged` | `clock_start` = 1 June 2021; counted days summed across both segments |
| If `breaks_service` | `clock_start` = 1 February 2024; S1's counted days stay on the record as history but do not feed the current clock |
| Either way | The eligibility test runs per §07 FR-CHR-016 against the stamped rule version, and this section states no eligibility outcome |

Two different gratuity clocks from the same employment history, decided by one audited human decision. That is the correct behaviour and the reason `break_treatment` carries `decided_by` and `basis` rather than being a computed flag.

**Negative cases.**

| # | Attempt | Expected behaviour |
| --- | --- | --- |
| N19 | A direct write to `ServiceRecord.counted_days` | Refused — the record is derived only (T8) |
| N20 | A derivation run with an undecided gap | Ends in `derivation_blocked` with the gap named; it never defaults to bridged or to broken |
| N21 | Automatic bridging of segments across two legal entities in one group | Refused in v1; a carry-over is an explicit `break_treatment` with its basis (§07 FR-CHR-026) |
| N22 | A re-derivation after the period's punches are erased | Produces identical counted days, because they come from the frozen snapshot (AC-DM-41) |

**AC-DM-57** — *Given* an employment history with a gap whose `break_treatment` has not been decided, *When* the `ServiceRecord` is derived, *Then* it ends in `derivation_blocked` naming the gap, no `clock_start` is published, and no gratuity eligibility is evaluated from it.

**AC-DM-58** — *Given* a recorded `break_treatment` of `bridged`, *When* the record is derived, *Then* `clock_start` is the earliest bridged segment's start, the record is stamped with the eligibility-rule version and the snapshot ids its counted days came from, and changing the decision to `breaks_service` produces a new derivation with both decisions visible in the audit trail.

#### 14.4.20 `EligibilityState` — derivation, transitions and why it is never a checkbox

`EligibilityState` is the effective-dated derived answer to "was this employment covered by scheme S on this date". §14.4.2 explains why it exists; this is its transition specification, because the two crossings it models — the ESI contribution-period boundary and the threshold latch — are where a checkbox implementation silently produces a wrong return.

**Inputs, per scheme.** The state is computed, never typed, from: the employment's establishment mapping and work location for the date; the `headcount_tracked` counting unit the obligation uses and its `latch_rule` (EV-057); the wage figure the scheme's ceiling tests, taken from the period's computed base, not from the CTC; the registration coverage for the scheme (T2); and the rule versions resolved for the date (§14.6.3).

| Scheme | Test the state answers | Wage figure tested | Boundary behaviour |
| --- | --- | --- | --- |
| EPF | Is the employment covered, and on which basis — ceiling-restricted or actual wages | s.2(y) wages (§14.4.3) | An `iw_flag` employment reads `epf.iw_wage_basis` instead of the ceiling, and a Certificate of Coverage under a Social Security Agreement suspends contribution for its validity window (§14.4.2) |
| EPS | Member or not | EPS wages, capped at ₹15,000 | The age-58 rule is EPFO's only hard block; the post-01.09.2014 above-ceiling joiner is a flag shown before filing, not a rejection (EV-040) |
| ESI | Covered or not | ESI gross | Coverage ends at the **contribution-period boundary**, not at the revision date |
| PT | Liable in which state, at which slab | The slab's own `base_kind` — monthly salary or annual income (§14.6.2a) | Resolved per sub-period where the work location moves (RR7) |
| LWF | Liable or not, at which periodicity | Per the state's schedule | Explicit "no levy" rows are distinct from unconfigured states (RR6) |
| Gratuity | Eligible or not | Derived from the `ServiceRecord` (§14.4.19) | The 5-year condition with its death, disablement and fixed-term exceptions (§06.6) |

**Transition table.**

| # | From → To | Trigger | Guard | Side effect | Who may trigger |
| --- | --- | --- | --- | --- | --- |
| E1 | *none* → `covered` | A new employment, or a threshold crossing arming the obligation | A covering registration exists, or the gap is recorded as `registration_pending` (T2) | A new effective-dated row from the coverage date; the filing fan-out for affected periods recomputed | System, from the rule |
| E2 | `covered` → `not_covered` | A wage revision above a coverage ceiling | The scheme's boundary rule — for ESI, the end of the contribution period containing the revision | Two rows visible in history, both queryable | System |
| E3 | `not_covered` → `covered` | A wage revision below a ceiling, or a scheme's own re-entry rule | As above | New row; prior rows untouched | System |
| E4 | `covered` → `suspended` | A Certificate of Coverage under a Social Security Agreement is recorded, with a validity window | The certificate is a `Document` linked to the employment | Contribution suspended for the window only; the row reverts automatically at window end | System, on a document write |
| E5 | any → `pending_registration` | The establishment has no covering registration for a scheme the employment is eligible for | — | Liability computed and held; surfaced on the readiness report; **payroll is not blocked** (AC-DM-38) | System |
| E6 | `pending_registration` → `covered` | A registration is recorded, possibly with a back-dated effective date | T6 — a back-dated grant is a new knowledge-time version | Held liabilities re-pointed through a correction path, never by editing a filed artefact | Registration write |
| E7 | `covered` → `covered` (latched) | Headcount falls below the obligation's line | The obligation's `latch_rule` says it latches | **No change** — the state stays armed | System |
| E8 | `covered` → `not_covered` (de-armed) | An administrative decision to de-arm a latched obligation | An explicit statutory basis recorded, maker-checker | Audited; never automatic (AC-DM-04) | Named approver |

**Worked example — the ESI boundary, with figures.** An employee's monthly gross is ₹18,000 in June, revised to ₹22,000 with effect from 12 July.

| Month | ESI state | ESI gross used | Employee 0.75% | Employer 3.25% |
| --- | --- | --- | --- | --- |
| June | `covered` | ₹18,000 | ₹135.00 | ₹585.00 |
| July | `covered` — the ₹21,000 line is a coverage gate, not a contribution cap (§06.3) | ₹22,000 | ₹165.00 | ₹715.00 |
| August | `covered` | ₹22,000 | ₹165.00 | ₹715.00 |
| September | `covered` — the contribution period Apr–Sep has not ended | ₹22,000 | ₹165.00 | ₹715.00 |
| October | `not_covered` — one E2 transition, effective 1 October | — | — | — |

Exactly two rows result: `covered` from the coverage date, `not_covered` from 1 October. A checkbox implementation drops coverage on 12 July and under-remits three months of contributions on a rising wage — the most expensive shape of this defect, because the shortfall grows with the revision that caused it. ESI rows after on or about 21 November 2026 are fenced until a successor instrument is published (§06.9), so the same employee in a later period resolves against a fenced rule set rather than an assumed continuation.

**AC-DM-74** — *Given* an ESI-covered employment revised above the coverage ceiling mid-period, *When* `EligibilityState` is derived, *Then* exactly two rows exist — `covered` to the end of the contribution period containing the revision, `not_covered` from the next period's start — contributions in the intervening months are computed on actual gross, and both rows stay queryable.

**AC-DM-75** — *Given* an employment eligible for a scheme whose establishment holds no covering registration, *When* the state is derived, *Then* it is `pending_registration`, the liability is computed and held, the readiness report names the scheme, state and dates, and no pay run is blocked (E5).

#### 14.4.21 `Registration` — status lifecycle and what each status permits

The registration is the key every filing instance is raised against (§14.3.1). Its status is therefore not descriptive metadata: it is the gate on filing-instance creation, on deduction, and on whether a due period can still be abandoned. Each status permits a different set of operations, and the permission table is the specification.

| Status | Filing instance may be created | Deduction may be computed | Coverage row may point at it | Exit |
| --- | --- | --- | --- | --- |
| `applied` | No | Yes — the liability is computed and held (E5) | No | `active` on allotment, with the allotted effective date, which may be back-dated (T6) |
| `active` | Yes, for periods inside `[valid_from, valid_to)` | Yes | Yes | `suspended`, `surrendered`, `cancelled` |
| `suspended` | No new instances; existing ones continue their lifecycle | Yes — suspension does not extinguish liability | No new coverage rows | `active` on restoration, `surrendered` or `cancelled` |
| `surrendered` | No, for periods after `valid_to`; every due period up to it stays in the ledger until filed or explicitly resolved (T5) | For periods up to `valid_to` only | No | Terminal |
| `cancelled` | As `surrendered` | As `surrendered` | No | Terminal |

**The back-dated grant, specified.** A registration allotted in September with an effective date of 1 June is the case T6 exists for, and it is common enough to be a design target rather than an edge case.

1. The registration row is written as a **new knowledge-time version** with `valid_from = 1 June` and `recorded_at = September`. The prior belief — that no registration existed — is preserved.
2. Every `EligibilityState` row that sat at `pending_registration` for June, July and August is re-derived and re-pointed to the registration (E6).
3. The held liabilities for those months become due. They do not rewrite June's, July's or August's filed artefacts — those artefacts were correct under the knowledge available then.
4. The delta is routed through the correction machinery: for EPF, within the EV-037 guards, which for a paid month means the arrear flow and therefore a fenced path (EV-043); for a state PT return, per that state's own correction route, which this PRD has not captured per state (§14.10 item 12).
5. The ledger (§14.4.22) shows June to August as newly-due obligations against the registration, not as silently-closed history.

**Negative cases.**

| # | Attempt | Expected behaviour |
| --- | --- | --- |
| N27 | Creating a filing instance for October against a registration surrendered on 30 June | Refused (T5); the ledger still shows every due period up to 30 June |
| N28 | Editing a registration number in place after an artefact has been filed under it | Refused; the filing references the registration's knowledge-time version, so a correction is a new version and the artefact's own record is untouched (§14.9) |
| N29 | Two active registrations for the same (owner, scheme, state) on one date | Refused at write time (T4) |
| N30 | Reusing a (scheme, number) pair across two owners inside one tenant | Refused (T4); uniqueness is never checked across tenants |
| N31 | Marking a registration `active` with no `valid_from` | Refused; an active registration with no effective date cannot be tested against a period |

**AC-DM-76** — *Given* a registration allotted in September with effect from 1 June, *When* it is recorded, *Then* June to August appear as due obligations in the ledger, the held liabilities are re-pointed to it, no filed artefact for those months is altered, and the correction route offered is one the guards actually permit.

**AC-DM-77** — *Given* a registration in `applied`, *When* a pay run executes for a period it would cover, *Then* the liability is computed and held, no filing instance is created, and the readiness report distinguishes "registration applied for" from "no registration".

#### 14.4.22 The per-establishment filing ledger — a completeness constraint, not a report

Part E-10 requires a per-establishment filing ledger that refuses silent abandonment, and EV-038's chronological rule makes the requirement concrete: a skipped month blocks later months. §08 FR-PAY-712 owns the ledger's behaviour. What §14 owns is the **constraint that makes the ledger true by construction** rather than by a job that might not run.

**The constraint.** For every `(registration_id, obligation, period)` triple where the period lies inside the registration's `[valid_from, valid_to)` and the obligation applies to that registration's scheme, **exactly one ledger row exists**. Not zero, not two. The row exists from the moment the period opens, before anything is generated, and it carries a status for its whole life.

| Ledger row field | Purpose |
| --- | --- |
| `(registration_id, obligation, period)` | The natural key; the uniqueness constraint is what makes double-counting impossible |
| `status` | `due`, `not_applicable_with_reason`, `nil_with_evidence`, `in_progress`, `filed`, `missed`, `blocked` |
| `basis` | For `not_applicable_with_reason` and `nil_with_evidence` — the rule or evidence that justifies the non-filing (EV-042's Direct Challan Entry receipt is the worked case) |
| `filing_id` | The instance, once one exists; null before generation |
| `chronology_state` | For the ECR: whether this period is blocked behind an earlier unfiled month (EV-038), and which month blocks it |
| `first_due_at`, `resolved_at` | So "how long was this open" is a measurable, not a reconstruction (§19) |

**Why the row is created at period open rather than at generation.** A row created at generation time cannot represent an obligation nobody generated — which is precisely the failure mode. Creating it at period open inverts the default: a missing filing is a row in `due` going stale, visible on day one, rather than an absence nobody queries.

**The chronology interaction.** EV-038's rule — a Regular return for month M is allowed only if returns for all active members of month M−4 have been filed, within the four-month transitional relaxation — is a property of the **sequence** of ledger rows, not of any one filing. The ledger therefore computes, per registration, the earliest unfiled due period, and every later period's `chronology_state` names it. A product that stores only filings cannot compute this, because the blocking month is precisely the one with no filing row.

**Negative cases.**

| # | Attempt | Expected behaviour |
| --- | --- | --- |
| N32 | Closing a month with a `due` row still open and no basis | Refused: a due obligation cannot be resolved by the passage of time; it becomes `missed`, which is a visible status, not an absence |
| N33 | Recording a NIL month with no evidence | Refused: `nil_with_evidence` requires the basis — for EPF, the Direct Challan Entry receipt where there are no active members (EV-042) |
| N34 | A second ledger row for one triple | Refused by the uniqueness constraint |
| N35 | Suppressing rows for a surrendered registration's final months | Refused (T5); every due period up to `valid_to` stays until filed or explicitly resolved |

**AC-DM-78** — *Given* any active registration, *When* the ledger is read for any period inside its validity range, *Then* exactly one row exists per applicable obligation, with a status and — where the status is not `due` or `filed` — a recorded basis; a period with no row is a release-blocking defect.

**AC-DM-79** — *Given* an EPF registration with an unfiled month M−4, *When* a Regular return for month M is prepared, *Then* the ledger names the blocking month, the later period's `chronology_state` reflects it, and the block is visible before generation rather than discovered at upload (EV-038).

#### 14.4.23 Exceptions as data — the `ExceptionRow` entity

§08 owns the error taxonomy for statutory artefacts; §14 owns the row that carries an exception, because an exception that lives only in a log is an exception nobody can measure, route or close. Every readiness failure, validator finding, portal rejection reason and identifier-state block is one row of one shape.

| Field | Purpose |
| --- | --- |
| `exception_id`, `tenant_id` | Identity and partition |
| `code` | The taxonomy code from §08 — structured, never free text, so the fix loop is guided (§14.4.5) |
| `subject_ref` | What it is about: an employment, a registration, a filing, a rule version, a device |
| `scope` | `employee`, `establishment`, `registration`, `tenant` — which decides who sees it and who can close it |
| `raised_by` | The check that raised it: readiness, validator, portal response, ingestion, deletion engine |
| `period` | The period it bites in, so an exception can age against a due date |
| `blocking` | Whether it blocks a transition, and which one. A hypothesis-backed rule can never set this true (RO5) |
| `owner_task_id` | The operator task; an exception with no owner is a defect in the check, not a state |
| `employee_notice_id` | Where the fix needs the employee — UAN seeding is the standing case (§07 FR-CHR-101) |
| `state` | `open`, `acknowledged`, `resolved`, `superseded`, `accepted_risk` (with an approver and a basis) |
| `resolution` | How it closed, and what changed as a result — an identifier state, a correction run, a rule version |

**Two invariants.** First, **an exception never blocks a payment to an employee**: the exclude-and-flag default routes the exception to the filing, not to the payslip (Part E-11). Second, **an exception's state is not derived from the underlying condition** — clearing the condition raises a resolution event; it does not silently delete the row, because "how often did this happen and how long did it take to fix" is a §19 metric computed off these rows.

**AC-DM-80** — *Given* any readiness failure, validator finding or portal rejection reason, *When* it occurs, *Then* an `ExceptionRow` exists with a taxonomy code, a subject, a scope, an owner task and — where the fix needs the employee — an employee notice; an exception with no owner task fails the build's check coverage test.

**AC-DM-81** — *Given* an exception whose underlying condition is later cleared, *When* the next check runs, *Then* the row moves to `resolved` with the resolution recorded and remains queryable for §19's metrics; it is never deleted.

---

### 14.5 Data classification

Every field and document carries one of four classifications. The tag is not documentation — it **drives** encryption, masking, access scope, residency and retention, and it is enforced in code and auditable (D7).

| Class | Definition | Examples in this model | Controls the tag enforces |
| --- | --- | --- | --- |
| **C1 · Regulated-Sensitive** | Data whose handling is dictated by a specific statute/regulator, or whose leak is a reportable incident. Includes the SPDI r.3 sensitive set — biometric information and financial information — which needs consent in writing before collection today (SPDI r.5(1), EV-060) | Bank account, PAN, salary/comp, PF/ESI contributions, TDS, biometric templates (in their own keyspace — §14.4.15), health/disability status, ICT logs. The Aadhaar number is not held in any C1 business store — only in the vault | Encryption at rest + in transit; field-level masking; access confined to named functions + audited; India-region storage by default (§14.8); CERT-In-reportable on breach within six hours (EV-062); retention class |
| **C2 · Personal — elevated harm** | Personal data whose exposure causes material harm. An internal handling class, not a statutory category: DPDP defines personal data with no sensitive sub-category (EV-059) | DOB, address, personal email/mobile, dependant records, nominee, marital/gender where used for statutory variance | Encryption; role-scoped access; masking in support views; access and correction requests serviced (§14.7.3) |
| **C3 · Internal-Personal** | Ordinary personal/employment data | Name, designation, department, DOJ, employment type, org mappings | Tenant-isolated; role-based access; audited on statutory-impacting change |
| **C4 · Operational / Reference** | Non-personal config and reference | `EffectiveDatedRule` rows, `Jurisdiction`, structure templates, holiday calendars, device registry | Standard access controls; changes to rules are audited (they move money) |

**India-specific classification notes:**

- **Aadhaar lives in its own store, not in any class of business data.** The number exists only in the `AadhaarTokenVault` (§14.4.15; Part E-6); business rows hold an opaque token — never the number, never a hash. Masking to the last four digits is built as a reg 6(2) security and risk control, not presented as a statutory display duty on a plain employer (Part D-5); encrypted transmission is a legal requirement (reg 6(4), EV-068). UAN/ESI IP are the filing keys; Aadhaar is never one. **[Reversed]** v0.3 said the Aadhaar Act and regulations restrict storage and display, and kept the masked number on the identifier row.
- **Salary and statutory contributions are C1**, not C3, because they are personal data *and* the substance of regulated filings, and bank details are SPDI financial information (EV-060); a comp leak is both a privacy and a competitive event.
- **DPDP has no sensitive category; the SPDI Rules do.** DPDP creates no special or sensitive category of personal data (s.2(t), EV-059) — **and** the SPDI Rules 2011 are live and classify biometric and financial information as sensitive, requiring consent in writing before collection (r.3, r.5(1), EV-060). Nothing in this model is labelled sensitive "under DPDP" (Part D-19). Biometric templates are C1 and live in a separate keyspace, never referenced by an attendance event (§14.4.15). **[Reversed]** v0.3 said DPDP pushed biometrics to the strictest class and deferred template storage to "final DPDP Rules" (K-06).
- **Consent is live today; s.7(i) is not.** DPDP s.7(i) is not in force until on or about 13 May 2027 (EV-058). Today SPDI r.5(1) requires written consent before collecting the sensitive set (EV-060), so `ConsentRecord` is a primary control now, alongside the classification and retention regime. When s.7(i) commences it disapplies consent and notice for employment purposes only; the s.8 duties still apply (EV-058). Who owes the SPDI written-consent duty — employer or vendor — is under counsel review (Part D-4), so every record states whose artefact it is. **[Reversed]** v0.3 stated s.7(i) as current law and called it a structural advantage over GDPR-bound designs (K-03).
- **CERT-In-reportable classes are tagged.** Attacks on AI/ML systems are an expressly reportable incident class — Annexure I item (xx) of the CERT-In Directions (EV-062); C1 fields touched by any AI egress path additionally carry `ai_egress_class` (§14.8) so the reportable surface is enumerable, not guessed, at incident time — the report is due within six hours of becoming aware (EV-062).

#### 14.5.1 Access, roles & maker-checker (the schema side of D4)

Classification decides *what* is protected; the role model decides *who* touches it and *under what control*. The maker-checker separation (D4) is a data constraint — the checker on a `PayrollResult` or `Filing` transition must be a distinct actor from the maker — enforced in the transition, not left to process discipline.

| Role | Reads | Writes | Constraint |
| --- | --- | --- | --- |
| **Payroll maker** | C1–C3 within scope | proposes run inputs, computes | Cannot approve own run |
| **Payroll checker / approver** | C1–C3 within scope | approves `PROCESSED → APPROVED` and `APPROVED → LOCKED` (§08 FR-PAY-301) | Must ≠ maker on the same run (segregation) |
| **HR admin** | C2–C3 | master data, structures | Comp writes are statutory-impacting → audited |
| **Employee (self-service)** | own C1–C3 (masked where C1) | own declarations, proofs, consents, DPRs | No cross-employee read |
| **CA / bureau (console)** | **read-only** across assigned clients | none on money-of-record | Read-only audit access (§18.7 **[Hypothesis]**); switching clients is tenant-scoped |
| **Data-request handler** | DPR queue + processing summary | reasoned responses | A named role; distinct from the CERT-In point of contact, which is named before the first paying customer (§17.6) |
| **Support** | masked views only | none on statutory fields | No vault access: the Aadhaar vault is excluded from support tooling by default (§07 FR-CHR-099) |

**AC-DM-29** — *Given* a run at `PROCESSED`, *When* an actor attempts to approve it, *Then* the approval is rejected if that actor is the run's maker (maker ≠ checker), and the rejection is auditable; segregation-of-duties cannot be bypassed by role stacking on one account without an explicit, logged override.

**AC-DM-30** — *Given* a CA console user assigned to a set of client tenants, *When* they open any client, *Then* all money-of-record entities are read-only, the view is scoped to exactly the assigned tenants, and no write to a `PayrollResult`/`Filing`/`Challan` is possible from the console.

#### 14.5.2 Field-level classification catalogue

The four classes are only enforceable if every field has one. This is the catalogue the build takes as its starting state: field group, class, and the four controls the tag drives. `ai_egress_class` is the tag the redaction chokepoint reads (Part E-7; §12.8); `deny` means the value is tokenised before any outbound model call and never leaves in clear, `matrix` means it leaves only where the tenant's provider matrix allows a provider with India data-at-rest and in-country inference, `open` means the field is ordinary operational text.

| Entity · field group | Class | At rest | Default UI treatment | Default export | `ai_egress_class` |
| --- | --- | --- | --- | --- | --- |
| `Person` · name, display name | C3 | Tenant key | Visible in scope | Included | `open` |
| `Person` · `name_as_per_uan` | C3 | Tenant key | Visible to payroll roles | Included in ECR generation only | `matrix` |
| `Person` · DOB, place of birth, nationality | C2 | Subject key | Visible to HR admin | Included | `matrix` |
| `Person` · personal email, mobile, addresses | C2 | Subject key | Masked in support views | Opt-in | `matrix` |
| `Person` · gender, marital status where used for statutory variance | C2 | Subject key | Visible to HR admin; never a scoring feature (§10) | Opt-in | `deny` |
| `Person` · disability status | C1 | Subject key | Walled off for accommodation and the RPwD Rule 9(1) register only (§10) | Never by default | `deny` |
| `Person` · health, HIV status | C1 | Subject key | Named functions only | Never | `deny` |
| `StatutoryIdentifier` · PAN value | C1 | Subject key | Masked; last characters only | Filing generation only | `deny` |
| `StatutoryIdentifier` · UAN, ESI IP, PRAN values | C1 | Subject key | Visible to payroll roles | Filing generation only | `matrix` |
| `StatutoryIdentifier` · linkage states | C3 | Tenant key | Visible — the state is what operators act on | Included | `open` |
| `Person` · bank account, IFSC, account holder name | C1 — SPDI financial information (EV-060) | Subject key | Masked; verification state visible | Disbursement file generation only | `deny` |
| `AadhaarTokenVault` · number | Outside every business class | Vault key, separate root | Vault-served masked display at most | Never | `deny` — structurally absent from any payload |
| `AadhaarTokenVault` · token | C3 | Tenant key | Not displayed | Never | `deny` |
| `BiometricTemplate` · template | C1 | Biometric keyspace | Never displayed | Never | `deny` |
| `DeviceEnrolment` · device serial, erasure ledger | C3 | Tenant key | Visible to the site admin | Included | `open` |
| `ConsentRecord` · artefact, notice text version | C2 | Subject key | Visible to the subject and the data-request handler | On request | `matrix` |
| `Employment` · DOJ, DOL, type, `iw_flag` | C3 | Tenant key | Visible in scope | Included | `open` |
| `EstablishmentMapping` · PF Member ID | C1 | Subject key | Visible to payroll roles | Filing generation only | `matrix` |
| `WorkLocationAssignment` · state, sphere, regime date | C4 for the location, C3 for the binding | Tenant key | Visible | Included | `open` |
| `CompensationStructure`, `PayComponent` · definitions and flags | C4 | Tenant key | Visible to comp owners | Included | `open` |
| `CompensationAssignment` · values | C1 | Subject key | Masked outside comp and payroll roles | Opt-in, comp roles only | `deny` |
| `PayrollResult` · every monetary figure | C1 | Subject key | Own record for the employee; scope-limited otherwise | Payroll roles | `deny` |
| `PayrollResult` · rule lineage references | C4 | Tenant key | Visible — it is the audit answer | Included | `open` |
| `Payslip` · rendered file | C1 | Subject key | Own payslip only | Own download | `deny` |
| `InputSnapshot` · parts and manifest | C1 where the part carries per-employee figures, C4 for the manifest | Subject key per part | Not displayed; diffed | Audit export only | `deny` |
| `Punch` · timestamp, source, device serial | C2 | Subject key | Visible to the employee and the site admin | Attendance export | `matrix` |
| `Punch` · raw device packet | C2 | Subject key | Dispute view only | Never by default | `deny` |
| `DayStatus`, `FormIXRow` | C2 | Subject key for per-employee rows | Visible in scope | Register export | `matrix` |
| `LeaveTransaction`, `LeaveBalance` | C2 | Subject key | Visible to the employee and HR | Included | `matrix` |
| `Filing` · state, dates, `on_time` | C3 | Tenant key | Visible — it is the product's headline surface | Included | `open` |
| `Filing` · `artefact_sha256`, `ack_ref`, TRRN, CRN | C1 | Tenant key | Visible to payroll roles | Evidence export | `matrix` |
| `Filing` · `portal_session_log_ref`, `authority_to_act_document_id` | C1 | Tenant key | Visible to the tenant and the operator | Evidence export | `deny` |
| `Challan` · challan numbers, UTR, amounts | C1 | Tenant key | Visible to payroll and finance roles | Evidence export | `matrix` |
| `Document` · payload | Inherits the highest class of anything inside it | Per the inherited class | Per the inherited class | Per the inherited class | Per the inherited class |
| `Dependant`, `Nominee` | C2 | Subject key | HR and benefits roles | Opt-in | `deny` |
| `FbpDeclaration`, `ProofOfSpend` | C2, with C1 where a proof carries a financial instrument | Subject key | Own record | Tax-pack export | `deny` |
| `InsurancePolicy`, `Endorsement` | C2 | Tenant key, subject key for member rows | Benefits roles | Carrier file only | `deny` |
| `EffectiveDatedRule`, `Jurisdiction` | C4 | Tenant-independent reference | Visible; the citation is a feature | Included | `open` |
| `AuditEvent` · actor, action, entity, authority | C1 as ICT logs (EV-062) | Tenant key | Audit views | Evidence export | `deny` |
| `AuditEvent` · before and after images | Inherits the class of the field changed | Per the inherited class | Audit views | Evidence export | `deny` |
| `RetentionHold` · scope, reason, authority | C3 | Tenant key | Visible to legal and admin roles | Evidence export | `matrix` |
| `DataPrincipalRequest` · request and reasoned response | C2 | Subject key | Subject and handler | On request | `deny` |
| `MigrationBatch`, `OpeningBalance`, `PreviousEmployerIncome` | C1 — they carry YTD money and prior-employer figures | Subject key | Migration roles | Migration report | `deny` |
| `Tenant`, `Group`, `LegalEntity`, `Establishment`, `Registration` | C3, with registration numbers C1 | Tenant key | Visible in scope | Included | `matrix` |
| Org dimensions — department, cost centre, grade | C3 | Tenant key | Visible | Included | `open` |

**Four derivation rules that keep the catalogue honest as the schema grows.**

| # | Rule | Consequence |
| --- | --- | --- |
| CL1 | **A derived field inherits the highest class of its inputs.** A headcount derived from employment rows is C4 only once it is aggregated past the point of re-identification; before that it is C3 | An "anonymous" analytics table built from C1 inputs without an aggregation step is mis-tagged by construction |
| CL2 | **A container inherits the highest class of its contents.** A `Document`, an export, a support bundle, a backup set, a model-call payload | A register export holding bank details is C1, whatever the export's own name says |
| CL3 | **A tag is never lowered by a copy.** Copying a C1 field into a report, a cache, a queue or a search index carries the tag with it | The classification survives every data path, which is what makes AC-DM-31's build-time test possible |
| CL4 | **An untagged field is treated as C1 until it is tagged.** A new column with no classification fails the build, and is default-denied at the egress chokepoint in the meantime | Fail-closed; a forgotten tag never becomes a quiet leak |

**Negative cases.**

| # | Attempt | Expected behaviour |
| --- | --- | --- |
| N23 | A new column ships with no classification tag | Build fails (CL4); the field is default-denied at egress until tagged |
| N24 | An export named "anonymised payroll" carries `employment_id` and exact monthly figures | Mis-tagged: quasi-identifiers plus exact figures are re-identifying; CL1 requires an aggregation step before the C4 tag |
| N25 | A support bundle attaches a payslip PDF | The bundle inherits C1 (CL2) and the vault and template stores stay excluded regardless (§07 FR-CHR-099) |
| N26 | A caching layer stores decrypted C1 values keyed by a tenant-agnostic key | Refused: the tenant partition is structural (D5, AC-DM-01), and the cache inherits the tag (CL3) |

**AC-DM-59** — *Given* any field in any store, *When* the build-time classification test runs, *Then* every field resolves to exactly one class, an untagged field fails the build, and every container's class equals the maximum of its contents' classes (CL2, CL4).

**AC-DM-60** — *Given* a field tagged `ai_egress_class = deny`, *When* any code path constructs an outbound model payload containing it, *Then* the chokepoint tokenises or blocks it before egress, the event is auditable, and no per-feature or per-tenant setting can turn the default-deny list off (Part E-7).

#### 14.5.3 Masking, display and the support surface

Classification without a display rule is a policy nobody can test. Each class therefore has a default rendering per audience, and the rule is attached to the field, not written into each screen — a per-screen rule is a per-screen bug.

| Audience | C1 default | C2 default | C3 default | C4 default |
| --- | --- | --- | --- | --- |
| The data principal, their own record | Full, for their own values | Full | Full | Full |
| Payroll maker and checker, in scope | Full where the function needs it; masked otherwise | Full | Full | Full |
| HR admin | Masked except comp-relevant fields their role names | Full | Full | Full |
| Manager | Not shown | Not shown except contact fields the tenant enables | Full for their reports | Full |
| CA or bureau console | Full, read-only, on money-of-record within the assigned client (§14.5.1) | Read-only | Read-only | Read-only |
| Support | **Masked only** — no unmasking path, and the Aadhaar vault and the biometric keyspace are excluded from support tooling by default (§07 FR-CHR-099) | Masked | Full | Full |
| Any analytics or reporting surface | Only through the anonymisation path (§14.7.7) or an explicitly scoped payroll report | Generalised | Full in scope | Full |

**Four masking rules.**

| # | Rule | Reason |
| --- | --- | --- |
| M1 | **Masking happens at the boundary that owns the value, not at the caller.** The Aadhaar vault serves a masked display; it never hands a number to a caller that then masks it | A caller that can mask can also choose not to |
| M2 | **A mask is not a security control on its own.** It reduces shoulder-surfing and accidental disclosure; access control and encryption are what actually protect the value | So that masking is never cited as the reason a field is safe to widen access to |
| M3 | **Unmasking is an event, not a setting.** Where a role legitimately needs a full C1 value, the reveal is a single audited action with a reason, not a session-wide toggle | Makes "who saw what" answerable |
| M4 | **Masked values never become join keys.** A masked bank account or PAN is a display string; no query, export or reconciliation ever keys on it | Prevents a masked value being treated as a stable identifier |

**Negative cases.**

| # | Attempt | Expected behaviour |
| --- | --- | --- |
| N36 | A support tool offers "reveal full value" on a C1 field | No such path exists for the support role; the request is refused and logged |
| N37 | A screen fetches the full C1 value and masks it in the browser | Defect: M1 requires masking at the owning boundary; the full value never crosses the boundary |
| N38 | A report joins two tables on a masked PAN | Refused (M4); the join key must be the internal surrogate |
| N39 | An unmask is implemented as a role flag rather than a per-event action | Defect (M3); the audit trail cannot answer who saw what |

**AC-DM-89** — *Given* a support user and any C1 field, *When* it is displayed, *Then* the masked value is produced at the owning boundary, no unmasking path exists for that role, the Aadhaar vault and biometric keyspace are unreachable, and the access is audited.

**AC-DM-90** — *Given* a role entitled to reveal a C1 value, *When* a reveal occurs, *Then* it is a discrete audited event carrying the actor, the field, the subject and a stated reason, and it does not widen any subsequent read in the same session.

#### 14.5.4 Export, report and support surfaces — where classification is actually tested

Classification survives every internal path by construction (CL3). It is at the **boundaries** that it gets tested, because a boundary is where someone chooses what to include. Four boundaries exist, and each has a declared contents rule rather than a per-request decision.

| Surface | Contents rule | What is structurally excluded | Who may produce it |
| --- | --- | --- | --- |
| **Statutory artefact** | Exactly the fields the format requires, sourced from the snapshot (§14.4.5a) | Everything else. An artefact is not a convenient place to carry extra columns | The generator, from a locked snapshot |
| **Evidence export** — for an audit, an inspection or a customer's own compliance file | The filing records, artefacts, acknowledgements, challans and the audit trail for a stated scope and period | Vault entries, biometric templates, raw device packets, model drafts | A named role, audited, with the scope recorded |
| **Operational report** — payroll registers, cost reports, reconciliation views | Declared column sets per report, each column classified; a report is a versioned object, not an ad-hoc query | Any C1 field not in the report's declared set; any anonymised claim that has not passed §14.7.7 | Payroll and finance roles in scope |
| **Support bundle** | Masked values only, plus operational metadata — states, timestamps, exception codes, rule versions | The Aadhaar vault and the biometric keyspace by default (§07 FR-CHR-099); unmasked C1; any subject's data outside the ticket's scope | Support, audited, with the ticket recorded |

**Three boundary rules.**

| # | Rule | Reason |
| --- | --- | --- |
| EX1 | **A surface declares its contents; it does not compose them per request.** A new column on an export is a change to a versioned declaration, reviewed like any other | An ad-hoc export is an unreviewed disclosure with a filename |
| EX2 | **The container inherits the maximum class of its contents (CL2), and the container's handling follows that class** — encryption, residency, retention and access | An evidence export holding bank details is C1 wherever it is stored, including in a customer's email if it ever gets there, which is the argument for delivering it inside the product rather than as an attachment |
| EX3 | **Every export is an event with an actor, a scope and a reason** | "Who took a copy of what, when" is the first question in any incident, and the answer must not require log archaeology |

**The support bundle deserves its own sentence.** It is the surface most likely to be widened under pressure, because it is produced during an incident by someone who wants more information. Widening it is therefore a reviewed change to the declaration, never a per-incident decision, and the two segregated stores are unreachable from it regardless — which is the point of their being segregated rather than merely access-controlled.

**AC-DM-119** — *Given* any of the four surfaces, *When* it is produced, *Then* its contents match its versioned declaration exactly, the container carries the maximum class of its contents, and an export event records the actor, scope, reason and, for a support bundle, the ticket.

**AC-DM-120** — *Given* a support bundle produced during an incident, *When* its contents are inspected, *Then* no unmasked C1 value, no vault entry, no biometric template and no data outside the ticket's scope is present, and widening the bundle requires a reviewed change to its declaration rather than a runtime option.

---

### 14.6 Effective-dated & multi-state rule storage (the hardest schema)

Two problems collapse into one entity here: **rules change over time** (retrospective payroll) and **rules differ by place** (multi-state). `EffectiveDatedRule` solves both by being keyed on (`rule_type`, `jurisdiction_id`, `effective_from`) with bitemporal columns.

#### 14.6.1 Why bitemporal, not just effective-dated

A single `effective_from` answers "what rule applied to March." It cannot answer "what did we *believe* in April about March" — which is exactly what you need when a **corrigendum** amends a notification retrospectively. The PRD's own cautionary tale is the November 2026 EPF cliff, where corrigendum S.O. 5936(E) of 19.12.2025 substituted the S.O. 5319(E) entries and inverted an earlier reading of when the EPF Act repeal commenced; verifying against the uncorrected S.O. 5319(E) reproduces the wrong answer (§06.9, §02.4 **[Verified]**). The EPF Scheme 2026, with 12% re-notified retrospectively to 21.11.2025 by S.O. 3582(E), is a separate instrument (§06.9). A bitemporal store lets us record the corrected rule *and* preserve what we filed under the old belief, with a clean recompute path.

| Column | Axis | Meaning |
| --- | --- | --- |
| `effective_from`, `effective_to` | **Business time** | The period the rule legally governs. `effective_to = NULL` = still in force. |
| `recorded_at`, `superseded_at` | **Knowledge time** | When *we* recorded/replaced this belief. A corrigendum inserts a new row that supersedes the old belief without deleting it. |
| `source_ref`, `source_url`, `source_captured_at` | Provenance | Gazette/notification citation with URL + capture timestamp — enforces the PRD standing rule that no compliance claim ships without a captured source, and the "check for a corrigendum" step. **[Verified]** (Source: §02) |
| `corrigendum_of` | Lineage | Links a corrected rule to the notification it amends (the amendment-watcher, not just new-instrument-watcher, §06). |

#### 14.6.1a Scope: which entity classes are bitemporal, and how the erasable classes forget (Part E-2)

A bitemporal store never forgets; purpose-bound retention (EV-068) and template erasure (Part E-6) require forgetting. The model resolves the conflict by entity class, not by exception. **[Reversed]** v0.3 declared every attribute bitemporal, with universal never-forget replay (K-24).

| Class | Entities | Time axes | How a change lands | End of life |
| --- | --- | --- | --- | --- |
| **B · Bitemporal** — never overwritten, replayable | Rules: `EffectiveDatedRule`, `Jurisdiction`, format versions. Salary structures: `CompensationStructure`, `PayComponent`. Assignments: `CompensationAssignment`, the establishment and work-location assignments. Statutory attributes: `StatutoryIdentifier` linkage state, `EligibilityState`. The statutory hierarchy: `Group`, `LegalEntity`, `Establishment`, `Registration`, `RegistrationCoverage` (§14.3.1) | Business (`effective_from/to`) + knowledge (`recorded_at/superseded_at`) | A new row supersedes; nothing is overwritten | Rules and other non-personal rows are kept. Person-linked rows keep their personal fields under the subject key and fall to the retention engine (§14.7) when their class expires |
| **R · Records of fact** — append-only | Input snapshots, `PayrollResult`, `Filing` and its attempts, `Challan`, `LeaveTransaction`, `FormIXRow`, `ServiceRecord` (derived from frozen inputs, §14.3.1 T8), `AuditEvent`, `RetentionHold` | Business period (`applies_to_period`) + `recorded_at` | A correction is a new linked record — a diff, never a mutation (Part E-1) | Retention engine, at floor and ceiling (§14.7) |
| **E · Erasable** — not bitemporal | `Punch`; rendered `Document`s (payslip PDFs, generated artefacts, register exports, letters); `BiometricTemplate`; `ConsentRecord`; `AadhaarTokenVault` entries | `recorded_at` + erasure state | Append-only while held; `ConsentRecord` versions forward | Erased on its lawful trigger — retention expiry, purpose spent, exit, consent withdrawal |

**Erasure mechanism.** Two mechanisms, chosen per record:

- **Crypto-shredding per subject key.** Each data principal has a subject data key inside the tenant key hierarchy (§17.4); the biometric keyspace and the Aadhaar vault hold their own. Erasable payloads about a subject, and the personal fields of B- and R-class rows, are encrypted under it. Destroying the key makes every copy unreadable, backups included — which holds only if the key itself cannot be restored from those backups, so subject keys are kept outside the backed-up data stores and no key-store restore resurrects a destroyed key (§17.14).
- **Tombstone.** A record that is not encrypted per subject — a multi-subject register export, a tenant-level document — has its payload replaced by a tombstone: record id, class, dates, erasure basis and actor (§07.2a).

Every erasure writes an `AuditEvent` naming the mechanism, basis and actor; the audit event never contains the erased content.

**What replay returns after an erasure.**

1. **Payroll figures reproduce.** Evaluation reads the run's input snapshot, the B-class rows and the evaluation context (§08 I4, I6). Punches are never evaluation inputs — the snapshot holds what the run consumed (paid days, LOP days, NCP days, OT hours by band) — so erasing punches changes no replayed figure.
2. **Attendance replays from the lock-time record.** A period whose punches have been erased returns the `FormIXRow`s and day summary frozen at lock, flagged `source-erased`; it never recomputes from punches that no longer exist (§09 FR-ATT-001).
3. **Rendered documents re-render, and say so.** A payslip or artefact erased under its retention class is re-rendered from the snapshot and template version and marked as a re-rendering; for a filed artefact the `Filing` keeps the original `sha256`, so the re-render is checked against it (§08 I4).
4. **An erased record returns its tombstone**, never a reconstruction (§07.2a).
5. **After a subject key is shredded**, figures remain against surrogate ids (`employment_id`), personal fields return `ERASED`, and a re-render that would need those fields is refused with the tombstone rather than produced with gaps.

**AC-DM-34** — *Given* a LOCKED, filed month whose punches are later erased, *When* the month's payroll is replayed, *Then* every figure reproduces byte-identical from the snapshot, rule versions and evaluation context, and the attendance view returns the lock-time Form IX rows flagged `source-erased`.

**AC-DM-35** — *Given* a data principal whose subject key has been destroyed, *When* any store, or any restored backup, is queried for that principal's records, *Then* only tombstones, ciphertext and surrogate-keyed figures are returned, and no restore path recovers the key.

#### 14.6.1b The rule object — the complete schema

`EffectiveDatedRule` is the rule object. §14.6.1 gives its two time axes; this is the whole object, field by field. §22.8.2 (FR-RULE-002) specifies how the compliance pipeline fills the workflow fields and §15.4 how rule packs ship; the field names below are the ones both sections use.

| Group | Fields | Constraint in the data model |
| --- | --- | --- |
| **Identity** | `rule_id` (one per version), `rule_key` (stable across versions: `rule_type` + jurisdiction + scope qualifiers), `rule_type`, `version`, `rule_pack_id` | `rule_id` is immutable and never reused; `version` is monotonic per `rule_key` |
| **Jurisdiction scope** | `jurisdiction_id` (Central, a state or UT, or a local body where the levy is local — Tamil Nadu and Kerala PT, §06.4), `applies_to_sphere` (all, central, state), `regime` (legacy or Code-era, per the state's commencement date, §14.6.3), `registration_type` (the scheme it binds — PTRC, PTEC, EPF code…), `establishment_class` (e.g. the classes on the reduced PF rate, §06.2), and for `threshold` rows `counting_unit` and `latch_rule` (EV-057) | Jurisdiction is read from the work location at resolution, never from the employee (Part E-5) |
| **Effective range** (business time) | `effective_from`, `effective_to` (`NULL` = in force), `retro_effective` (the instrument is dated after `effective_from`) | Closed-open; `retro_effective = true` enqueues impact analysis on publish (§22 FR-RULE-009) |
| **Decision-time range** (knowledge time) | `recorded_at`, `superseded_at` | `recorded_at` is the instant the version became resolvable — publication, or staging for a tenant in the canary cohort (§22 FR-RULE-013) — not when an analyst began typing; `superseded_at` is the only field ever written after that instant |
| **Payload** | `payload` typed per `rule_type` under a `payload_schema_version`, with units; `rounding_method`, or the named parameter that stands in for an unstated one; `enforcement_mode` (`enforce` or `warn_only`) | A payload that does not validate against its schema cannot leave drafting; no guessed rounding (§15.4.6) |
| **Citation and capture** | `source_ref` (instrument number, date, clause), `source_url`, `source_captured_at`, `capture_method` (raw, rendered, transcribed from an image-only scan), `archive_hash`, `legacy_citation` and `successor_citation` side by side (EV-050), `corrigendum_of`, `last_corrigendum_check_at`, `evidence_status` (`[Verified]`, `[Verified — mirror]`, `[Hypothesis]`) | A version with an incomplete citation or no recorded corrigendum check cannot reach review (§22 AC-RULE-002.3) |
| **Author and reviewer** | `change_request_id`, `author`, `reviewer`, `certification_ref` | `reviewer ≠ author`, enforced as a data constraint, not a UI check (§22 AC-RULE-003.2) |
| **Publish state** | `publish_state` — the §22 FR-RULE-003 states (DETECTED … DRAFTING, IN_REVIEW, CERTIFYING, STAGED, PUBLISHED, SUPERSEDED, ROLLED_BACK, WITHDRAWN); `canary_cohort`; `published_at` | See RO1–RO3 |

**Invariants of the rule object.**

- **RO1 · Only published knowledge resolves.** The resolvable set is every version that has reached PUBLISHED, plus STAGED versions for tenants in the canary cohort. Drafts, versions in review and withdrawn versions never resolve for any tenant.
- **RO2 · Nothing is edited after it resolves.** Any change to any field is a new version. Publication of the next version, or a rollback, writes `superseded_at` on the prior one; no other post-publication write exists.
- **RO3 · Superseded and rolled-back versions stay resolvable in their own window.** A replay at a knowledge time `T` inside a version's `[recorded_at, superseded_at)` window resolves it, so "what did we believe then" is always answerable — including for a version later rolled back, which also lists every output that used it (§22 FR-RULE-014).
- **RO4 · No two current versions overlap.** For one `rule_key`, the versions current at any knowledge time `T` have non-overlapping effective ranges. A corrigendum that changes a range therefore supersedes every version it overlaps in one publication.
- **RO5 · A hypothesis never blocks.** `evidence_status = [Hypothesis]` forces `enforcement_mode = warn_only` (§22 AC-RULE-002.1); the overtime ceiling is the standing example (§14.4.7; K-04).
- **RO6 · A `[Verified — mirror]` version carries its flag** and an open pull-from-primary task, and is never quoted in customer-facing copy until the task closes (Part A-1).

**Worked example — two Karnataka rows, two enforcement modes.** §06.4 records Karnataka PT as ₹200 a month at a monthly salary of ₹25,000 or above, ₹300 in February, nil below — ₹2,500 a year — effective 1 April 2025 under Notification DPAL 08 SHASANA 2025 of 15 April 2025, with the effect verified on the state PT portal and the instrument text not retrieved; the filing frequency is unverified.

| Field | `pt_slab` · Karnataka | `filing_due_date` · Karnataka PTRC |
| --- | --- | --- |
| `rule_key` | `pt_slab` · KA · PTRC | `filing_due_date` · KA · PT_RETURN |
| `effective_from` · `retro_effective` | 01.04.2025 · `true` (instrument dated 15.04.2025) | — not captured |
| `payload` | Base monthly salary; below ₹25,000 → nil; ₹25,000 or above → ₹200, February ₹300; annual total ₹2,500 | `pt.KA.filing_frequency` and due day — no shipped value |
| `source_ref` · `capture_method` | DPAL 08 SHASANA 2025, 15.04.2025 · rendered state PT portal; instrument text not retrieved | — |
| `evidence_status` · `enforcement_mode` | `[Verified]` (§06.4) · `enforce` | `[Hypothesis]` · `warn_only` — the calendar shows the obligation with an unconfirmed due date and never blocks a run |

The slab row can deduct; the frequency row can only warn. A reviewer who is not the author signs each, and neither resolves until published.

**AC-DM-42** — *Given* a rule version in DRAFTING, IN_REVIEW or CERTIFYING, *When* any tenant's run resolves its `rule_type` for a covered period, *Then* the version is not selected; and *given* a STAGED version, *Then* it is selected only for tenants in its canary cohort (RO1).

**AC-DM-43** — *Given* a published rule version, *When* any field other than `superseded_at` is written, *Then* the write is refused and the change is routed to a new version (RO2); and *given* a version whose `author` equals its `reviewer`, *Then* it cannot be stored in any state past IN_REVIEW.

**AC-DM-44** — *Given* a version with `evidence_status = [Hypothesis]`, *When* its `enforcement_mode` is set to `enforce`, *Then* the write is refused (RO5).

**AC-DM-45** — *Given* a version rolled back after it produced figures in two tenants' runs, *When* those runs are replayed at their original knowledge time, *Then* the rolled-back version resolves and reproduces the original figures, and the version lists both runs as consumers (RO3).

#### 14.6.1c Bitemporal query patterns — the four questions the store must answer cheaply

A bitemporal store is only useful if the four questions people actually ask are single queries rather than reconstructions. Each has a canonical shape, and each implies something the physical schema must support (§15 owns the how).

| # | Question | Query shape | Implied requirement |
| --- | --- | --- | --- |
| Q1 | **What governs this period today?** | `effective_from ≤ P.end AND (effective_to IS NULL OR effective_to ≥ P.start)` AND current knowledge | The everyday path; must be the fastest, since every figure on every run takes it |
| Q2 | **What did we believe on date T about period P?** | Q1 plus `recorded_at ≤ T AND (superseded_at IS NULL OR superseded_at > T)` | The audit path; must be exact, and must include superseded and rolled-back versions inside their own windows (RO3) |
| Q3 | **What did this artefact actually use?** | Follow the stored `rule_ref` set on the result lineage — no resolution at all | The cheapest and most authoritative answer; it is why lineage is stored rather than recomputed (D4, RI12) |
| Q4 | **Which outputs used version V?** | Reverse index from `rule_id` to results and filings | Required by a rollback: a version cannot be rolled back without listing its consumers (§22 FR-RULE-014, RO3) |

**Why Q3 exists separately from Q2.** They usually agree, and when they disagree the disagreement is the finding. Q2 reconstructs what resolution *would have* returned; Q3 reports what was *actually* used. A divergence means either a lineage bug or a resolution bug, and it is precisely the check that catches a store drifting away from its own contract. The conformance suite runs both over the same filed artefacts and asserts equality (TS-DM-07).

**What is deliberately not offered.** There is no query that mutates history to answer a question — no "recompute as if we had known", no "show me the period as it would be under today's rules" that writes anything. The second of those is a legitimate *read*: a what-if projection that never persists, never emits an artefact and is labelled as a projection. The moment it writes, it is a correction run, and correction runs have their own machinery (§14.4.4).

**AC-DM-107** — *Given* any filed artefact, *When* Q2 and Q3 are both evaluated against it, *Then* they return the same rule versions; a divergence is a release-blocking defect and names whether the lineage or the resolution disagreed.

**AC-DM-108** — *Given* a request to see a locked period under current rules, *When* it is served, *Then* it is a labelled projection that writes nothing, emits no artefact and creates no filing instance; only a correction run may produce a persisted, filable difference.

#### 14.6.2 What lives as a rule row (not code)

| `rule_type` | Jurisdiction | Example values / variance |
| --- | --- | --- |
| `pf_wage_ceiling` | Central | ₹15,000 (basis cap), re-fixed by S.O. 2702(E) of 29.05.2026 — **[Verified — mirror]**: read through a professional alert quoting it, not the gazette; pull from the primary source before customer use, and the row carries the RO6 flag until then (§06.2); the IW basis is `epf.iw_wage_basis` — "no ceiling" as carried, **[Hypothesis]** while para 83's enforceability is under challenge (§06.2, §06.13) |
| `pf_rate`, `eps_rate`, `edli_rate`, `admin_charges` | Central | 12% employee, re-notified by S.O. 3582(E); employer split EPS 8.33% (capped at ₹15,000 → ₹1,250) / EPF balance; EDLI 0.5% (§06.2 **[Verified]**). Admin 0.5% and `epf.admin_charge.minimum` are **[Hypothesis]** — pre-Code circulars, not re-verified (§06.2). The reduced 10% rate is a per-establishment-class row (§06.2) |
| `addback_percent` | Central | 50%, "or such other per cent as may be notified" — the standing variable that alone justifies this entity (Source: Code on Wages s.2(y) **[Verified]**) |
| `esi_wage_ceiling`, `esi_rate_ee`, `esi_rate_er` | Central | ₹21,000 (₹25,000 disabled); 0.75% / 3.25% (Source: ESIC contribution rates **[Verified]**, §06.3); rows after on or about 21 November 2026 fenced until a successor instrument is found (§06.9) |
| `esi_contribution_period` | Central | Apr–Sep, Oct–Mar; drives the mid-period ceiling-crossing rule (§14.4.2) (Source: pre-Code ESI contribution-period rule **[Verified]**; Code-era citation unmapped, §06.13) |
| `pt_slab` | **Per state**, or **per local body** where the levy is local (Tamil Nadu, Kerala — §06.4) | Each levying state its own table, with a slab base that differs in kind — monthly salary (Maharashtra, Karnataka) or annual income (Odisha); **gender variants** (Maharashtra's women's slab, §06.4); a February or last-month top-up that engineers the ₹2,500 Article 276 ceiling. Maharashtra, Karnataka and Odisha are captured at state sources; Telangana, Tamil Nadu, West Bengal, Gujarat and the rest are `pt.<state>.slabs` parameters with no shipped values (§06.4). **[Hypothesis]** full all-state PT dataset — per-state verification status is kept in §06.4 and §06.13, and aggregator tables are disputed. **Validate/kill:** gazette-sourced dataset per state (levy y/n, slabs, gender, periodicity, dates) before a state drives a deduction; ship beachhead states in v1, all-states in v2 (§07 FR-CHR-014, §20). |
| `lwf_schedule` | **Per state** | Levy y/n, employee/employer share, periodicity (monthly/half-yearly/annual), due months. **[Reversed]** v0.3 called this parity with Frappe HR "across 14 states, free". Frappe HR v16 has no LWF and no Indian state name anywhere in its source (EV-031), and TallyPrime has no LWF engine and no state PT slab table (EV-032): multi-state LWF and PT are a genuine differentiator, greenfield in both Frappe HR and TallyPrime (K-01). |
| `ot_rate`, `ot_quarterly_ceiling_hours`, `normal_hours` | Central + state overlays | Not less than 2× the ordinary rate; 8 hours a day for a daily wage period, 48 a week otherwise (§09.6 **[Verified]**). `ot_quarterly_ceiling_hours` (hypothesised 144) is **[Hypothesis]**, warn-only, never blocking (K-04). State overlays possible. |
| `code_regime` | **Per state × Code** | The date each state's Code-era rules commenced; before it, that state's pre-existing rules and forms govern state-sphere matters (per-state dual regime — §06.9). Resolution reads it from the work location (§14.6.3; Part E-5). Dates are loaded from the state instrument, never assumed. |
| `threshold` | Central + state | Each obligation line with its **counting unit** (employees / persons / workers / contract labour), **sphere** and `latch_rule` as schema fields (EV-057; §06.1). |
| `tds_slab`, `regime_params`, `surcharge`, `cess`, `standard_deduction`, `rebate_87a` | Central | Both regimes computed per employee; the new regime is the default where the employee states no preference (§06.5). The FY 2025-26 slab and rebate figures in §06.5 are a worked base, **[Hypothesis]** for Tax Year 2026-27 until verified against the rates in force; the standard deduction is `tds.standard_deduction.<regime>` (§06.5). Values are `EffectiveDatedRule` rows, so a Budget is a data load, not a deploy. |
| `gratuity_params` | Central | 15/26 formula; 5-year condition with the 240-day continuous-service count; the death, disablement and fixed-term exceptions (CoSS ss.53–54, §06.6 **[Verified]**). `gratuity.payable_ceiling` — the amount notified under CoSS s.53(3), none located, the legacy ₹20 lakh **[Hypothesis]**; `gratuity.four_years_240_days_rule` **[Hypothesis]** (§07 FR-CHR-016). The tax-exemption ceiling is a separate row (`tax.gratuity_exemption_ceiling`, §06.6). |
| `meal_perq_limit`, `gift_voucher_limit` | Central | ₹200/meal, ₹15,000 per tax year from 1 Apr 2026 (was ₹50 / ₹5,000) — **[Hypothesis]** (EV-019: two dated professional sources, rule text not read; §11), shipped as effective-dated parameters, never as a customer-facing citation, until §20 reports. The meal row carries its qualifying conditions as engine constraints — premises meals during working hours, or non-transferable vouchers usable only at eating outlets — without which the perquisite is taxable (K-19; §11 BEN-62). The 2026-Rules citation is unconfirmed and routed to §20. |
| `filing_due_date` | Central + state | Per `filing_type` + jurisdiction; drives `Filing.due_date`/`on_time` (§14.4.5). |
| `statutory_register_spec` | Central + state | The six employer registers plus wage slip (EV-053): per-state form numbers, field lists (Form IX per-day IN/OUT; Form I's 36 fields — EV-055) and the retention wording of the governing rule-set (EV-054). **[Verified — central sphere]** |

#### 14.6.2a Payload schemas by `rule_type`

§14.6.1b fixes the rule object's envelope; §14.6.2 lists which facts live in it. Neither says what a payload *is*, and an untyped payload is how a slab table ends up as a JSON blob nobody can validate, diff or regress. Every `rule_type` therefore has a declared payload schema, versioned by `payload_schema_version`, and a payload that does not validate against its schema cannot leave drafting (§14.6.1b; §22 FR-RULE-008).

**The common envelope.** Every payload, whatever its type, carries these four fields, because every one of them has been a source of a real defect in this domain.

| Field | Type | Why it is mandatory |
| --- | --- | --- |
| `unit` | enum — `inr_per_month`, `inr_per_year`, `inr_per_meal`, `percent_of_base`, `hours`, `days`, `count_of_persons`, `date` | A rate stored without its unit is a bug waiting for a state that expresses the same levy annually rather than monthly — Odisha's annual-income PT base against Maharashtra's and Karnataka's monthly one (§06.4) |
| `base_ref` | the named base the payload applies to — `s2y_wages`, `esi_gross`, `pf_wages`, `total_remuneration`, `monthly_salary`, `annual_income` | "Percent" is meaningless without a base, and this domain has at least four concurrent wage bases per employee per period (§14.4.3) |
| `rounding_method` **or** `rounding_param_ref` | enum, or the name of the parameter standing in for an unstated statutory rounding | A guessed rounding is an invented rule. Where the instrument is silent, the payload names the parameter instead of picking a behaviour (§08's global rounding policy owns the resolution) |
| `enforcement_mode` | `enforce` \| `warn_only` | Forced to `warn_only` whenever `evidence_status = [Hypothesis]` (RO5) |

**P-rules — payload validation, applied before a version can reach review.**

| # | Rule | Rejects |
| --- | --- | --- |
| P1 | Bands in a slab payload are ordered, contiguous and non-overlapping across the whole domain of the base | A gap between ₹24,999 and ₹25,000; two bands claiming the same salary |
| P2 | Every band has an explicit lower bound and an explicit upper bound or `unbounded` | An open band that silently swallows every higher salary |
| P3 | A payload with a periodic variation names the varying periods explicitly, never by arithmetic | Karnataka's February instalment inferred as "annual total minus eleven months" |
| P4 | Percentages carry their base (`base_ref`) and their cap, if any, as a separate field | EPS 8.33% stored without the ₹15,000 cap that makes it ₹1,250 |
| P5 | A monetary payload is in paise-precise integers with a stated unit; no floating-point money | A ₹0.005 drift that reconciles against nothing |
| P6 | A payload claiming an annual total states it, and the engine checks the periodic rows sum to it | A slab table that produces ₹2,600 a year when the instrument says ₹2,500 |
| P7 | A `threshold` payload carries `counting_unit`, `sphere` and `latch_rule` (EV-057) | A "50 employees" line applied to a count of workers |
| P8 | A date payload states the calendar convention for a due date falling on a holiday, or names the parameter standing in for it | A silent weekend shift nobody can cite |
| P9 | A payload whose `evidence_status` is `[Hypothesis]` may not set `enforce` | A hypothesised ceiling that blocks a pay run (K-04) |
| P10 | A payload change that alters a value by more than `rule.plausibility_delta` of the prior version raises a mandatory reviewer note (§22 FR-RULE-008) | A decimal-point slip published unnoticed |

**The schemas.**

`pt_slab` — the hardest, because states differ in the *kind* of base, not only in the numbers.

| Field | Type | Constraint |
| --- | --- | --- |
| `base_kind` | `monthly_salary` \| `annual_income` | Set per state; drives which figure the engine feeds in (§06.4) |
| `bands[]` | ordered list of `{lower, upper \| unbounded, amount, gender_variant?}` | P1, P2; a gender variant is a distinct band set, never a multiplier (Maharashtra's women's slab, §06.4) |
| `period_overrides[]` | list of `{period, amount}` | P3 — Karnataka's February ₹300 is an override row, not a derived remainder |
| `annual_total` | integer, optional | P6 — where the instrument states one, the engine checks the rows against it |
| `levy_level` | `state` \| `local_body` | Tamil Nadu and Kerala levy at local-body level (§06.4), so the jurisdiction key must be able to descend below the state |

*Worked instance — Karnataka.* `base_kind = monthly_salary`; bands = `{0 … 24,999 → ₹0}`, `{25,000 … unbounded → ₹200}`; `period_overrides = [{February, ₹300}]`; `annual_total = ₹2,500`; `levy_level = state`; `effective_from = 01.04.2025`, `retro_effective = true` (the instrument, DPAL 08 SHASANA 2025, is dated 15.04.2025); `evidence_status = [Verified]`, `enforcement_mode = enforce` (§06.4). P6 checks 11 × ₹200 + ₹300 = ₹2,500. ✔

*What the same schema refuses.* A state whose slabs this PRD has not gazette-sourced gets no payload at all — the `pt.<state>.slabs` parameter has no shipped value (§06.4), the rule row does not exist, and the readiness report shows the obligation as unconfigured. It never falls back to a neighbouring state's table.

`lwf_schedule`

| Field | Type | Constraint |
| --- | --- | --- |
| `levies` | boolean | A state that does not levy is an explicit `false` row, not a missing row — the difference between "we know there is no levy" and "we have not checked" is the whole point of the evidence fields |
| `employee_share`, `employer_share` | amount with `unit` | Per contribution event |
| `periodicity` | `monthly` \| `half_yearly` \| `annual` | Karnataka's calendar-year cycle with a 15 January due date is the one verified periodicity (§06.8); everything else is **[Hypothesis]** and therefore `warn_only` |
| `contribution_months[]` | list of months | Explicit, per P3 |

`pf_wage_ceiling`, `pf_rate`, `eps_rate`, `edli_rate`, `admin_charges`

| Field | Type | Constraint |
| --- | --- | --- |
| `rate` | percent with `base_ref = pf_wages` | P4 |
| `cap_amount` | integer or `none` | EPS carries ₹15,000; EPF employee carries the ceiling only when the employer restricts to it |
| `employer_split_rule` | `eps_first_then_balance` | The 12% / 8.33% / balance structure that produces ₹1,800 / ₹1,250 / ₹550 at the ceiling (§06.2; EV-035 fixture) |
| `establishment_class` | enum | The reduced-rate classes are a per-class row, never a global rate (§06.2) |
| `minimum_charge` | parameter reference | `epf.admin_charge.minimum`, applied once per establishment per wage month — **[Hypothesis]**, so `warn_only` |
| `iw_basis` | parameter reference | `epf.iw_wage_basis` — **[Hypothesis]** while para 83's enforceability is under challenge (§06.2) |

`esi_wage_ceiling`, `esi_rate_ee`, `esi_rate_er`, `esi_contribution_period`

| Field | Type | Constraint |
| --- | --- | --- |
| `coverage_ceiling` | ₹21,000, with a `disabled_ip` variant of ₹25,000 (§06.3) | A **gate**, not a contribution cap — the schema names it `coverage_ceiling` precisely so no engine treats it as a cap |
| `rate_ee`, `rate_er` | 0.75% and 3.25% of `esi_gross` (§06.3) | P4 |
| `periods[]` | `[Apr–Sep, Oct–Mar]` | Drives the mid-period crossing rule: coverage ends at the period boundary, not at the revision date (§14.4.2) |
| `sunset` | date | Rows after on or about 21 November 2026 are fenced until a successor instrument is found (§06.9), so the schema carries the fence rather than an assumed continuation |

`addback_percent`

| Field | Type | Constraint |
| --- | --- | --- |
| `percent` | 50, `base_ref = total_remuneration` | "Or such other per cent as may be notified" — the standing variable the whole entity exists for (§06.10) |
| `excluded_heads[]` | the heads that enter the test | The test is over excluded heads against total remuneration; a component's membership is a `PayComponent` flag, and the rule states the *test*, not the component list |
| `fixed_point` | boolean | `true` — the add-back re-bases components that feed its own test, so the node iterates to convergence under a maximum iteration count and a tolerance (§08 I7; Part E-4) |

`threshold`

| Field | Type | Constraint |
| --- | --- | --- |
| `obligation` | the named obligation | One row per obligation line, never a shared "size band" |
| `value` | integer | EV-057's central-sphere lines: ESI 10; EPF 20; Grievance Redressal Committee 20 or more workers; contract labour 50; crèche 50; canteen 100; standing orders 300; retrenchment and closure approval 300; the appointment-letter duty at an establishment of 10 or more workers, in a state-prescribed form (EV-057, K-18) |
| `counting_unit` | `employees` \| `persons` \| `workers` \| `contract_labour` | P7 — one establishment can be above one line and below another on the same day |
| `sphere` | `central` \| `state` | P7 |
| `latch_rule` | enum | Gratuity's and maternity's "employed, or were employed, on any day of the preceding twelve months" latches; EPF's and ESI's Code-era wording is unconfirmed (§06.13), so the field is per-obligation, not a schema-wide assumption |

`filing_due_date`

| Field | Type | Constraint |
| --- | --- | --- |
| `filing_type` + `jurisdiction` | keys | One row per pair |
| `day_rule` | `day_of_following_month` \| `fixed_date` \| `days_after_period_end` | ECR and ESI contribution sit at the 15th of the following month; Form 138 at Q1 31 July, Q2 31 October, Q3 31 January, Q4 31 May of the year following the Tax Year (EV-049); Form 130 at 15 June (§06.5) |
| `holiday_convention` | enum or parameter reference | P8 — where no convention is captured, the row names the parameter and the calendar shows the obligation without asserting a shifted date |
| `frequency_source` | `rule` \| `per_registration_ingested` | Maharashtra assigns PT return frequency per registration each year (§06.4), so frequency is ingested onto the `Registration`, never derived from the rule row |

`ot_rate`, `normal_hours`, `ot_quarterly_ceiling_hours`

| Field | Type | Constraint |
| --- | --- | --- |
| `multiplier` | not less than 2 × the ordinary rate (§09.6) | A floor, so the payload stores the statutory minimum and the tenant's own higher rate is a tenant setting, not a rule edit |
| `normal_hours_daily`, `normal_hours_weekly` | 8 where the wage period is daily, 48 a week otherwise (§09.6) | Both, because which one binds depends on the wage period |
| `quarterly_ceiling` | `ot_quarterly_ceiling_hours` | **[Hypothesis]** (K-04) ⇒ `enforce` is unwritable (P9); the product warns and never blocks a punch, roster, approval, run or filing |

`gratuity_params`

| Field | Type | Constraint |
| --- | --- | --- |
| `formula` | `15/26 × last_drawn_monthly_wages × completed_years` (§06.6) | With service beyond six months in the final year counting as a full year |
| `qualifying_years` | 5, with the death, disablement and fixed-term exceptions (CoSS s.53) | The exceptions are part of the payload, not engine branches |
| `continuous_service_days` | 240 days in a twelve-month period (CoSS s.54) | Feeds the `ServiceRecord` derivation (§14.4.19) |
| `payable_ceiling` | parameter reference `gratuity.payable_ceiling` | No Code-era notification located; the legacy ₹20 lakh is **[Hypothesis]** (§06.6). It never shares a field with `tax.gratuity_exemption_ceiling` |

`meal_perq_limit`, `gift_voucher_limit`

| Field | Type | Constraint |
| --- | --- | --- |
| `amount` | ₹200 per meal; ₹15,000 per tax year for gifts and vouchers, from 1 April 2026, against ₹50 and ₹5,000 before it | **[Hypothesis]** (EV-019) — shipped as an effective-dated parameter, never as a customer-facing citation, until §20 reports |
| `qualifying_conditions[]` | structured, not prose: meals provided during working hours at office or factory premises, or non-transferable vouchers usable only at eating outlets | Engine constraints on the component — `meal_delivery_mode` and the voucher attestations (§11 BEN-62). Without them the perquisite is taxable, the payslip under-deducts, and the demand plus interest lands on the employer (K-19) |
| `citation_status` | `routed_to_validation` | The 2026-Rules citation is unconfirmed and routed to §20 |

`code_regime`

| Field | Type | Constraint |
| --- | --- | --- |
| `state` + `code` | keys | One row per state per Code |
| `commenced_on` | date, loaded from the state instrument | Never assumed, never inherited from a neighbouring state; before it, that state's pre-existing rules and forms govern state-sphere matters (§06.9) |

`statutory_register_spec`

| Field | Type | Constraint |
| --- | --- | --- |
| `register` | the six employer registers and the wage slip (EV-053) | One canonical set with code-specific views, per the non-duplication provisions |
| `form_number` | per state | Configurable, because state rules prescribe different forms (EV-053) |
| `field_list_ref` | reference to §06's field specification | §14 stores the register instance and its clock (§14.4.18, §14.7.1); §06 owns the field lists and the render rules, and this PRD states them once |
| `retention_wording` | the governing rule-set's own words | The three rule-sets are **not** identically worded (EV-054), so the payload carries the wording and the retention class derives from it |

`id_format.<key>`

| Field | Type | Constraint |
| --- | --- | --- |
| `mask` | the pattern validated at write time | Each is **[Hypothesis — carried]** until desk-verified against the issuer's own specification (§14.9, §07.1.1) |
| `checksum` | named algorithm or `none` | Aadhaar's Verhoeff check is validated at the vault boundary, before anything is stored |
| `validated_at` | boundary name | Which boundary enforces it, so a mask is not silently enforced in two places with two behaviours |

**AC-DM-61** — *Given* a payload for any `rule_type`, *When* it is saved in drafting, *Then* it validates against its declared `payload_schema_version` and every P-rule; a payload failing any P-rule cannot be saved, and the failure names the rule and the field.

**AC-DM-62** — *Given* a `pt_slab` payload whose bands and period overrides do not sum to its stated `annual_total`, *When* it is validated, *Then* it is refused with both figures shown (P6); and *given* a payload with a band gap, *Then* it is refused with the uncovered range named (P1).

**AC-DM-63** — *Given* a `threshold` payload with no `counting_unit` or no `sphere`, *When* it is validated, *Then* it is refused (P7); and *given* one whose `latch_rule` is unset, *Then* the obligation resolves as non-latching only if the rule row says so explicitly, never by default.

#### 14.6.2b Jurisdiction readiness — what rows must exist before a state can be sold

A state is not "supported" because a customer can select it. It is supported when the rule rows exist to compute, calendar and file its obligations. The model makes that a queryable state rather than a judgement, which is what lets §05 sequence beachhead states and §20 scope the gazette work.

| Readiness state | Rows required | What the product can do | What it must not do |
| --- | --- | --- | --- |
| `unestablished` | None; `levies[]` says "not established" for at least one scheme | Record a work location; surface every obligation as unconfigured | Compute any state deduction; claim coverage |
| `surveyed` | `levies[]` recorded per scheme — including explicit "does not levy" rows | Tell the customer which obligations exist in that state | Compute a deduction |
| `deduction_capable` | The levying schemes' rate or slab rows exist, `[Verified]`, `enforce` | Compute and show the deduction on a payslip | File, unless the calendar and format rows exist |
| `calendar_capable` | Plus `filing_due_date` rows, even where `warn_only` | Show the obligation on the calendar with its due date or an unconfirmed marker | Assert an unconfirmed due date as a commitment |
| `filing_capable` | Plus the artefact or return specification, the register form numbers (EV-053) and the registration model | Generate the artefact and run the filing lifecycle | Claim attended submission until the counsel items close (Part D-17) |

**The transitions are evidence-gated, not effort-gated.** A state moves from `surveyed` to `deduction_capable` when a gazette-sourced slab row is published `[Verified]` — not when an analyst has read a summary table. Karnataka's PT row is the worked example of a state at `deduction_capable` whose `filing_due_date` row is still **[Hypothesis]**, which places it at `calendar_capable` with a `warn_only` frequency and an obligation shown without an asserted due date (§14.6.1b's worked example).

**Two consequences the rest of the PRD depends on.** The readiness state per state per scheme is the honest answer to "which states do you support", and it is a query over the rule store rather than a marketing claim (§14.6.6). And the transition from `surveyed` to `filing_capable` is the unit of work §22 sizes and §13 costs — per state, per scheme — which is the same per-registration cost driver EV-088 identifies, seen from the supply side rather than the customer side.

**AC-DM-118** — *Given* any state and scheme, *When* readiness is queried, *Then* it returns one of the five states with the missing row types named; a state cannot be reported as `deduction_capable` while any required row is `[Hypothesis]` or absent.

#### 14.6.3 Rule resolution algorithm (deterministic)

For any computation of `rule_type R` for employment `M` in `period P`, as-known-at time `T`:

1. Resolve the `WorkLocation` in force for `M` during `P` from its effective-dated assignment → state `J`, sphere `S`, and for each Code the state's regime commencement date `C` (Part E-5). Never from the employee's residence, the employer's HQ or the registered office. Where the work location changes inside `P`, resolve per sub-period.
2. Select rows where `rule_type = R AND jurisdiction ∈ {J, Central} AND applies_to_sphere ∈ {all, S}`; for a state-sphere Code rule type, `regime = legacy` for dates before `C` and `code` from `C`; AND `effective_from ≤ P.end AND (effective_to IS NULL OR effective_to ≥ P.start)` AND `recorded_at ≤ T AND (superseded_at IS NULL OR superseded_at > T)`, over the resolvable set only — published versions, plus staged versions for a tenant in the canary cohort (§14.6.1b RO1).
3. Prefer the **most specific jurisdiction** (state overrides Central where both exist and the state legislates the field, e.g. PT/LWF); Central applies where no state row exists.
4. Record the selected `rule_id`(s), the `work_location_id` and the regime used on the `PayrollResult` lineage (D4).
5. A **retro run** sets `T = now` but `P = the corrected period`, so it picks up corrigenda (latest knowledge) applied to the historical business period — the desired behaviour.

<!-- DIAGRAM: rule-resolution-flow -->

**Worked multi-state example.** A tenant with staff in Maharashtra, Karnataka and a new remote hire working from Assam. For September PT: the MH row (its slab, whose ₹300 February instalment engineers the ₹2,500 annual total — §06.4), the KA row (its slab), and Assam — the hire's work location. PT situs for fully remote employees is unsettled (§06.13), so the tenant's remote-PT policy recorded on the assignment decides; where it follows the work location and the employer has no Assam PT registration, resolution returns the liability with `registration_pending`, surfacing "PT due, no registration" on the readiness report rather than filing wrong. Central rules (PF/ESI/TDS) resolve identically for all three; PT, LWF, S&E and the state-sphere Code rules (register forms, working-hours overlays) diverge — which is why those rule types are state-scoped and carry a regime flag (§06.9).

**AC-DM-21** — *Given* a computation of `pt_slab` for an employment whose work location is in a PT-levying state, and of `pf_rate` for the same employment, *When* rule resolution runs, *Then* `pt_slab` resolves to the row for the work location's state (most-specific-jurisdiction wins), `pf_rate` resolves to the Central row, both `rule_id`s and the `work_location_id` are recorded on the result lineage, and a change to the employee's residence address changes neither.

**AC-DM-36** — *Given* a state whose Code-era rules commence on date `C` inside a pay period, *When* a state-sphere rule type is resolved for a work location in that state, *Then* dates before `C` resolve to the legacy row and dates from `C` to the Code row, and the lineage records the regime used for each figure.

#### 14.6.3a Resolution decision table, negative cases and the ambiguity rules

The five steps above are the happy path. Resolution earns its keep in the cases where the happy path has no answer, and each of those cases has exactly one specified behaviour — because "the engine picked something" is how a wrong deduction reaches a filed return.

| # | Condition at resolution | Outcome | Rationale |
| --- | --- | --- | --- |
| RR1 | Exactly one row matches, `[Verified]`, `enforce` | Resolve; record `rule_id`, `work_location_id` and regime on the lineage | The ordinary case |
| RR2 | Exactly one row matches, `[Hypothesis]`, `warn_only` | Resolve **for display and warning only**; the figure is computed and shown, never enforced as a block | RO5; the overtime ceiling is the standing example (K-04) |
| RR3 | A state row and a Central row both match a state-legislated field | The state row wins (most-specific jurisdiction) | Step 3 |
| RR4 | A state row matches a **Central-only** `rule_type` | Refused as a data defect, not silently preferred; the version cannot have been published with that jurisdiction scope | A state PF rate is not a thing; the schema should have stopped it at authoring |
| RR5 | No row matches for a levying jurisdiction | The obligation resolves as **unconfigured**, surfaced on the readiness report; no zero, no fallback, no neighbouring state's table | The `pt.<state>.slabs` case (§06.4) |
| RR6 | No row matches and the jurisdiction does not levy | Resolves to an explicit "no levy" row where one exists; if no such row exists, unconfigured | The `lwf_schedule.levies = false` distinction — knowing there is no levy is not the same as not having looked |
| RR7 | The work location changes inside the period | Resolve per sub-period; the period is flagged straddled (T7); nothing is apportioned by assumption | Each state's part-period treatment is unread (§14.10 item 12) |
| RR8 | The state's Code-regime commencement date falls inside the period | Legacy row before `C`, Code row from `C`; the lineage records the regime used for each figure | §14.6.3 step 2; AC-DM-36 |
| RR9 | Two versions of one `rule_key` are current at knowledge time `T` with overlapping effective ranges | Impossible by RO4; if encountered, resolution fails loudly and the run stops | A silent "latest wins" here would make the store non-deterministic |
| RR10 | The only matching version is STAGED and the tenant is **not** in the canary cohort | Not selected; the prior PUBLISHED version resolves | RO1 |
| RR11 | The only matching version is STAGED and the tenant **is** in the canary cohort | Selected, and the lineage records that the figure came from a staged version | RO1; the canary is visible in the audit trail, never invisible |
| RR12 | The matching version was later ROLLED_BACK, and `T` sits inside its `[recorded_at, superseded_at)` window | Selected — a replay at that knowledge time must reproduce what was filed | RO3; AC-DM-45 |
| RR13 | A retro run: `T = now`, `P = the corrected period` | Latest knowledge applied to the historical business period — corrigenda are picked up | Step 5; the §14.6.4 timeline |
| RR14 | The employment has no work-location assignment for part of the period | Resolution fails for that sub-period with a blocking validation naming the dates | A missing jurisdiction is never resolved from the employer's HQ, the registered office or the employee's address (Part E-5) |
| RR15 | The rule row exists but its `payload` fails its schema at read time | Resolution fails loudly; the version is quarantined and the prior version resolves | A payload that passed authoring and fails at read is a corruption signal, not something to work around |

**The three ambiguity rules, stated once.**

1. **Specificity beats recency.** A state row published yesterday beats a Central row published today for a state-legislated field, because specificity is a property of the field's jurisdiction and recency is a property of our knowledge. Recency only ever decides between two versions of the *same* `rule_key`.
2. **Absence is never zero.** Every "no matching row" branch resolves to `unconfigured` or to an explicit negative row. The engine has no path that produces a zero deduction from a missing rule.
3. **A warning never becomes a block, and a block is never inferred.** `enforcement_mode` is carried on the row, derived from `evidence_status`, and no caller can raise it.

**Worked negative example — the tempting shortcut.** A tenant opens an office in a state whose PT slabs this PRD has not gazette-sourced. The shortcut is to apply a neighbouring state's table "as an estimate so the payslip looks complete." The model refuses: RR5 resolves to unconfigured, the readiness report shows "PT obligation, slabs unconfigured" with the state and the affected employees, and the employee's payslip carries no PT line rather than a wrong one. The cost of the refusal is an operator task; the cost of the shortcut is a wrong deduction on a filed return, an under- or over-remittance, and an employee-facing correction — the asymmetry is why absence is never zero.

**AC-DM-64** — *Given* a work location in a state with no `pt_slab` row, *When* PT is resolved, *Then* the result is `unconfigured` with the state and affected employments named on the readiness report, no PT amount is computed, and no other state's table is consulted (RR5, ambiguity rule 2).

**AC-DM-65** — *Given* a tenant in a staged version's canary cohort, *When* a figure resolves to that version, *Then* the lineage records both the `rule_id` and its `publish_state` at resolution, so a canary-derived figure is distinguishable from a generally-published one after the fact (RR11).

**AC-DM-66** — *Given* an employment with a gap in its work-location assignment inside a period, *When* any state-scoped rule is resolved for that sub-period, *Then* resolution fails with a blocking validation naming the uncovered dates, and no jurisdiction is inferred from the employer's registered office or the employee's address (RR14, Part E-5).

#### 14.6.4 Worked bitemporal timeline — the corrigendum case

This is the scenario the whole bitemporal design exists for. Suppose the add-back percentage for wage months from 21 November 2025 (the Codes' commencement, §06.9) is believed to be 50%, then a corrigendum on 15-Sep-2026 amends it retrospectively (illustrative — the *mechanism*, not a real notification; the 47% below is invented for the example):

| Event (knowledge time) | `EffectiveDatedRule` rows for `addback_percent` | What a March pay run computes |
| --- | --- | --- |
| Apr-2026: March run executed | Row A: 50%, `effective_from`=21-Nov-2025, `effective_to`=NULL, `recorded_at`=Apr-2026 | 50% — filed under Row A; `PayrollResult` lineage cites Row A |
| Sep-2026: corrigendum recorded | Row A: `superseded_at`=15-Sep-2026; **Row B**: 47% (illustrative), `effective_from`=21-Nov-2025, `recorded_at`=15-Sep-2026, `corrigendum_of`=Row A | — (existing March filing untouched) |
| Sep-2026: retro run for March, `T=now` | Resolution picks **Row B** (latest knowledge, historical business period) | 47% — an arrears/correction `PayrollResult` (`applies_to_period`=March, `run_in_period`=Sep) and a **correction filing attempt** linked by `corrects_filing_id` to the original March filing, routed within the EV-037 guards. A paid March ECR cannot take a Revised return (payment initiated), so an upward EPF delta goes to the arrear flow, which is fenced (EV-043) |

<!-- DIAGRAM: bitemporal-timeline -->

The original March artefact is preserved exactly as filed (what we believed then); the correction is a new, linked artefact (what we know now) — a diff, never a mutation (Part E-1). A watcher keyed only to *new notifications* would miss the corrigendum — the model requires `corrigendum_of` and an **amendment**-watcher, per §06 **[Verified]**.

**AC-DM-22** — *Given* Row A (50%) recorded in April and Row B (47%, `corrigendum_of`=A) recorded in September, *When* the original March filing is read as-known-in-April and a September retro run is executed, *Then* the April read returns 50% and cites Row A, the September retro returns 47% and cites Row B, and both are simultaneously reproducible from the store.

#### 14.6.4a The replay matrix — every cell of (business time × knowledge time)

§14.6.4 walks one corrigendum. The store's real contract is that **every** cell of the two-dimensional grid has exactly one answer, and that the answer is stable. This matrix is the test: one `rule_key` with four versions, read at four knowledge times, for four business periods.

Versions of `addback_percent` (the illustrative 47% is the §14.6.4 example's invented figure, used only to make the mechanism legible):

| Version | `effective_from` → `effective_to` | `recorded_at` → `superseded_at` | `publish_state` |
| --- | --- | --- | --- |
| V1 | 21-Nov-2025 → NULL | Apr-2026 → 15-Sep-2026 | PUBLISHED, then SUPERSEDED |
| V2 (corrigendum of V1) | 21-Nov-2025 → NULL | 15-Sep-2026 → NULL | PUBLISHED |
| V3 (staged only) | 01-Apr-2027 → NULL | 01-Mar-2027 → NULL | STAGED to a canary cohort |
| V4 (rolled back) | 01-Jan-2026 → 31-Mar-2026 | 01-Jun-2026 → 20-Jun-2026 | ROLLED_BACK |

Read down a column for "what did we believe then"; read across a row for "what governed that period".

| Business period ↓ / Knowledge time → | May-2026 | 10-Jun-2026 | 01-Oct-2026 | 01-Apr-2027 |
| --- | --- | --- | --- | --- |
| **Dec-2025** | V1 | V1 | V2 | V2 |
| **Feb-2026** | V1 | V1 — and V4 from 01-Jun to 20-Jun, inside its own window | V2 | V2 |
| **Jun-2026** | V1 | V1 | V2 | V2 |
| **May-2027** | V1 | V1 | V2 | V2 for a tenant outside the canary cohort; V3 for a tenant inside it |

Four properties fall out of the grid, and each is a separate test:

| # | Property | Test |
| --- | --- | --- |
| RM1 | **Every cell is single-valued.** No knowledge time resolves two versions for one business period | RO4; a grid walk over the full cross-product must never return a pair |
| RM2 | **A superseded version still answers inside its own window.** The May-2026 column returns V1 forever, not V2 | RO3; this is what makes a filed figure defensible years later |
| RM3 | **A rolled-back version answers inside its window too.** The 10-Jun-2026 cell for Feb-2026 returns V4, because that is what a run then would have used | RO3; AC-DM-45 |
| RM4 | **A staged version is cohort-scoped, not time-scoped.** The same cell returns different versions for two tenants, and the lineage says which | RO1, RR11 |

RM3 is the counter-intuitive one, and it is the reason a rollback is a new superseding version rather than a deletion (§22 FR-RULE-014): a run that executed on 10 June 2026 used V4, filed a figure computed from V4, and must replay to that figure. A store that deleted V4 on rollback would make that filed figure unreproducible — which is the opposite of what a rollback is for.

**AC-DM-82** — *Given* the four versions above, *When* the full cross-product of business periods and knowledge times is walked, *Then* every cell returns exactly one version, the May-2026 column returns V1 throughout, the 10-Jun-2026 cell for Feb-2026 returns the rolled-back V4, and a staged version appears only for tenants in its cohort with `publish_state` recorded on the lineage.

#### 14.6.5 Text ER cardinality summary (for readers reconstructing the schema)

```
Tenant 1─1 Group 1─N Employer(LegalEntity) 1─N Establishment N─1 WorkLocation(premises) N─1 Jurisdiction 1─N EffectiveDatedRule
Employer 1─N Registration (TAN, PTEC)  ;  Establishment 1─N Registration (EPF, ESIC, PTRC, LWF, S&E, LIN)
Establishment N─M Registration via RegistrationCoverage (effective-dated; one per scheme per date)
Person(Employee) 1─N Employment 1─N EstablishmentMapping N─1 Establishment   (effective-dated statutory mapping; holds PF Member ID)
Employment 1─N WorkLocationAssignment N─1 WorkLocation   (effective-dated; the jurisdiction source, Part E-5)
Person 1─N StatutoryIdentifier (PAN, UAN, ESI IP, PRAN)  ;  Person × Employer 1─1 ServiceRecord (derived)
Employment 1─N EligibilityState        (effective-dated)
Employment 1─N CompensationAssignment  (effective-dated) N─1 CompensationStructure 1─N PayComponent
Establishment 1─N PayRun 1─N PayrollResult 1─1 Payslip(Document)
PayrollResult N─M EffectiveDatedRule   (lineage / recorded)
PayRun 1─N Filing N─1 Registration  ;  Filing 1─0..N Challan/Payment
Filing N─M PayrollResult (via input_snapshot)  ;  Filing 1─N Document  ;  Filing ─self corrects (attempts, diffs)
Employment 1─N Punch  ;  Employment 1─N FormIXRow  ;  Employment 1─N LeaveTransaction ─derives─ LeaveBalance
Person 1─0..1 AadhaarTokenVault (opaque token)  ;  Employment 1─N BiometricTemplate  ;  Person 1─N ConsentRecord (versioned)
Employment 1─N FbpDeclaration / Dependant / NpsSubscription / InsuranceEndorsement
MigrationBatch 1─N OpeningBalance / PreviousEmployerIncome ─→ Employment
AuditEvent N─1 (polymorphic)  ;  RetentionHold N─M (polymorphic)  ;  DataPrincipalRequest N─1 Person
```

#### 14.6.6 What the rule store makes countable

A rule store that is only a correctness mechanism is under-used. Because every rate, slab, threshold, due date and register spec is a row with a jurisdiction and an evidence status, three numbers that are otherwise guesswork become queries — and all three are inputs other sections need.

| Query | Answer it gives | Consumed by |
| --- | --- | --- |
| Rows per state, by `rule_type` and `evidence_status` | What "supporting a state" actually costs to author and maintain, and how much of a state's coverage is currently hypothesis rather than verified | §22's per-state sizing; §13's per-state curation line (EV-088) |
| Count of `enforcement_mode = warn_only` rows a tenant's periods resolve against | How much of a given customer's payroll is computed against unverified rules — a number a compliance-led buyer will eventually ask for | §19; §20 |
| Count of rows whose `last_corrigendum_check_at` is older than the watcher's cadence | The staleness surface, per jurisdiction | §22's watcher; §17's operational readiness |

The design consequence is small but real: `evidence_status`, `enforcement_mode` and `last_corrigendum_check_at` are indexed dimensions, not free-text notes, and a state's coverage is reportable as a matrix of `rule_type × evidence_status` rather than as a claim on a slide. This PRD does not put a figure on any of the three — they are properties of a store that does not exist yet — but it fixes the schema so that the first real answer is a query rather than a survey.

**AC-DM-91** — *Given* the rule store, *When* a per-state coverage report is requested, *Then* it returns a `rule_type × evidence_status` matrix for that state, the count of `warn_only` rows, and the oldest `last_corrigendum_check_at` per `rule_type`, with no free-text interpretation required.

---

### 14.7 Retention & deletion (reconciling erasure vs statutory retention)

This is the entity model's hardest *policy* problem: erasure duties — Aadhaar reg 6(5)'s purpose-bound ceiling today (EV-068), and DPDP s.8(7) from on or about 13 May 2027 (EV-058) — meet statutory retention of the very same records. DPDP s.8(7) is by its text subject to retention "necessary for compliance with any law" (r5/04 finding 40); the Aadhaar ceiling carries no such words in this PRD's evidence, and its collision with a register that names an Aadhaar field is a counsel question (§14.10 item 3). DPDP s.8(7) will reach employment processing too: s.7(i) disapplies consent and notice, not the s.8 duties (EV-058). Deletion is therefore a policy engine (D8), evaluated per-field, per-record, at request time.

#### 14.7.1 Statutory retention floors (deletion cannot go below these)

Only the central-sphere register periods (EV-054) are stated as figures. Every other period is a **named configurable parameter** whose value is set only on counsel sign-off, with the statutory basis under counsel review (Part D-11) — routed to §23's counsel register and §20. Research round five located candidate provisions for several of them (r5/04 findings 32–37, 45–46); counsel reviews those rather than this PRD asserting them. State-sphere periods are unknown and are per-state configuration (EV-054).

| `retention_class` | Floor | Clock | Basis | Confidence |
| --- | --- | --- | --- | --- |
| `REG_WAGES` — Forms I, IV, IX and the Form V wage slip | Five years | After the date of last entry in the register | Wages (Central) Rules 2026 r.51(4) (EV-054) | **[Verified — central sphere]** |
| `REG_OSH` — Forms XIII, XIV, XV, XIX, XX | Five **calendar** years; OSH r.76(2) further bars destroying the r.76 register (leave with wages, §06.9) even after five years unless it has been transferred to a new register | From the date of last entry | OSH (Central) Rules 2026 r.72(1)(vii), r.76(2) (EV-054) | **[Verified — central sphere]** |
| `REG_SS` — Form XXII and "all the registers and other records" under the SS Rules, which reach EPF and ESI employer records (r5/04 finding 22) | Five **calendar** years | From the date of last entry | SS (Central) Rules 2026 r.53(1)(e) (EV-054) | **[Verified — central sphere]**; whether the SS Code inquiry window extends the practical need is a counsel question (`retention.epf_esi_extension`) |
| `REG_IR` — records under the IR Rules | Electronic maintenance compulsory; **no period set** | — | IR (Central) Rules 2026 r.47(1)–(2) (EV-054) | **[Verified]** gap → parameter `retention.ir_records`, counsel |
| State-sphere registers and forms | Per state | Per state | State rules under the Codes | Unknown → parameter per state, counsel (EV-054) |
| `TAX_TDS` — Form 138 data, challans, Form 124 (ex-12BB) proofs, TRACES-issued Form 130 | `retention.tax_tds` | Counsel | Income-tax Act 2025 / Income-tax Rules 2026 candidates (r5/04) | Counsel (Part D-11) |
| `BOOKS_COMPANY` — payroll records forming part of a company's books of account | `retention.books` | Counsel | Companies Act 2013 books-of-account candidate (r5/04); whether a payroll artefact is part of the books is fact-specific | Counsel (Part D-11) |
| `GRATUITY_SERVICE` — `ServiceRecord` (§14.3.1) and gratuity records | `retention.gratuity_tail` | From exit | A gratuity claim can arise years after exit; the limitation reading is not in evidence | Counsel (Part D-11) |
| `ICT_LOGS` — `AuditEvent` and ICT logs | At least 180 days, within Indian jurisdiction — a maintenance duty, not a ceiling | From creation | CERT-In Directions 28.04.2022 (EV-062) | **[Verified]** |
| `DPDP_PROCESSING_LOGS` | `retention.dpdp_r8_3`, effective on or about 13 May 2027; neither immediate purge nor a one-year suppression is hard-coded | Counsel | DPDP Rules 2025 r.8(3), not in force (EV-058) | Counsel (Part D-9) |
| `AADHAAR_VAULT` — a **ceiling**, not a floor | Delete once the consented purpose is spent | Purpose spent | Aadhaar Sharing Regulations reg 6(5) (EV-068) | **[Verified]** |
| `BIOMETRIC_TEMPLATE` — a ceiling | Erase on exit, consent withdrawal or a switch to the non-biometric path | Trigger event | Product rule (Part E-6; §09 FR-DEV-007) | — |
| `CONSENT_EVIDENCE` | `retention.consent_evidence` | From withdrawal or expiry | Counsel | Counsel |

The labour-code clocks run from the date of last entry *in the register*, not per employee (EV-054 wording), so the model scopes each register instance by period — Form IX is a monthly sheet (EV-055) — to give every instance a determinable last entry (r5/04 finding 44, an inference). Registers also carry custody constraints (EV-054): OSH r.72(4) and SS r.53(3) impose a three-kilometre physical-location constraint, differently worded; the SS maternity Schedule para 11(a)(2) requires the women's register "in ink", contradicting r.53(1)(b)'s electronic permission. The model keeps the register electronically and flags the contradiction to counsel (§23); it does not resolve it. **[Reversed]** v0.3 stated income-tax, EPF, ESI, gratuity and Companies Act periods as figures, and a flat five years for "four consolidated registers".

**Rule of thumb the model encodes:** each `retention_class` stores `min_retention` (the statutory floor above) and `max_retention` (the ceiling — a purpose-bound limit such as reg 6(5) today, and DPDP s.8(7) from its commencement). Deletion is permitted only in the window after `min_retention` elapses, and *required* once `max_retention` elapses **unless** a `RetentionHold` is active. Where two floors overlap (e.g. a wage figure that is both TDS evidence and register data), the **longer floor wins** — the standing "default to the longer of overlapping floors" rule (§14.10 item 1). A floor parameter with no counsel-set value blocks automatic erasure of that class and raises an unresolved-retention flag; it never defaults to zero.

<!-- DIAGRAM: data-model-retention-window -->

#### 14.7.2 The deletion decision engine

For a given row/field at time `T`, deletion is evaluated as:

1. **Is there an active `RetentionHold`?** (litigation, investigation, unresolved dispute, tax scrutiny) → **retain**, log the hold as the reason.
2. **Has the statutory `min_retention` for its `retention_class` elapsed?** If not, or if the floor is a counsel-set parameter not yet set → **retain**. The erasure is *deferred*, not refused, and the requester is told the basis and the date the class becomes erasable, or that the date is under confirmation.
3. **Is there a live processing purpose?** (active employment, open pay run, pending filing) → **retain**.
4. Else → **erase or anonymise**, by crypto-shredding the subject key or by tombstone (§14.6.1a). Prefer **anonymisation/aggregation** for analytics-relevant rows (strip direct + quasi identifiers, keep de-identified facts for headcount/cost trends) over erasure, where lawful.
5. Every branch writes an `AuditEvent` with the decision, basis and mechanism; a request is closed by a *reasoned response*, not necessarily a deletion.

Which erasure duties bind depends on the date. Today: the Aadhaar purpose ceiling (EV-068), the product's own template erase-on-exit (Part E-6), and the employer's policy. From on or about 13 May 2027: DPDP s.8(7) as well (EV-058). Whether an employee holds a DPDP erasure *right* against processing under s.7(i) is under counsel review in both directions (EV-066; Part D-1), so the engine runs identically for a request and for a scheduled sweep and never asserts a statutory right in its response.

<!-- DIAGRAM: deletion-decision-engine -->

**Worked example — post-exit employee erasure request.** An employee resigns March 2026, FnF settled, and asks in June 2026 for her data to be erased. The engine:

- Erases data held only on a consent she has withdrawn or whose purpose is spent (no statutory floor).
- **Retains** register data under EV-054's floors — each Form IX sheet for her months stays until the longest applicable register floor for that sheet has run (the rule-sets' wordings differ; the longer reading wins) — and payroll, PF/ESI, TDS and gratuity records under their retention classes, whose periods are counsel-set parameters (Part D-11). The response gives each class's basis and, where the parameter is set, its erasable date; otherwise it says the date is under confirmation.
- Finds her Aadhaar number, if she provided one, already deleted from the vault when its consented purpose was spent (reg 6(5), EV-068); business rows hold only a token that resolves to a tombstone, and EPF records are keyed on UAN, never Aadhaar. **[Reversed]** v0.3 kept a masked Aadhaar as a "seeding key" on retained EPF records.
- Finds her biometric template, if she was enrolled, already erased on exit through the two-phase device erasure (§09 FR-DEV-007); her punches and Form IX rows are unaffected (§14.4.15).
- Sets a scheduled re-evaluation at each floor's expiry so retention does not silently become indefinite.

**Worked example — litigation hold beats an expired floor.** A wage register row hits its 5-yr floor while an ESI dispute over that period is open. A `RetentionHold` scoped to (establishment, period) is active, so branch 1 retains the row and logs the hold as the reason; the row becomes erasable only after the hold is `released_at` *and* the floor has elapsed.

**AC-DM-23** — *Given* a post-exit erasure request against an employee with retained TDS records, *When* the deletion engine evaluates each field, *Then* data held only on a withdrawn or spent consent is erased, statutory records are retained with a per-class erasable date (or "under confirmation" where the floor parameter is unset), and the requester receives a single reasoned response enumerating the basis for each retained class within the tenant-configured request SLA — without any deletion of records below their floor.

**AC-DM-24** — *Given* a row whose `min_retention` has elapsed but that is under an active `RetentionHold`, *When* the deletion engine runs, *Then* the row is retained, the hold is logged as the decision basis, and erasure is re-scheduled for hold-release; a deletion of a held row is impossible.

#### 14.7.2a The deletion decision, as a table

The five numbered branches are the algorithm. This is the same logic as a decision table, because a table is what a reviewer can check for completeness and what a test suite can walk exhaustively. Inputs: whether a hold is active; whether the floor has elapsed, not elapsed, or is unset; whether a ceiling has fallen due; whether a live processing purpose exists; and whether the object is single- or multi-subject.

| # | Hold | Floor | Ceiling | Live purpose | Subjects | Outcome | Response to the requester |
| --- | --- | --- | --- | --- | --- | --- | --- |
| D-1 | Active | any | any | any | any | **Retain** | A hold applies, with its scope |
| D-2 | None | Unset | any | any | any | **Retain, defer** | The period is under confirmation, with the parameter's owner |
| D-3 | None | Not elapsed | Not due | any | any | **Retain, defer** | The basis and the erasable date |
| D-4 | None | Not elapsed | **Due** | any | any | **Retain, and raise the collision** | The basis, and that a conflict is under counsel review (RC3) |
| D-5 | None | Elapsed | any | Yes | any | **Retain** | The live purpose — active employment, open run, pending filing |
| D-6 | None | Elapsed | any | No | Single | **Erase** by subject-key shred | Erased, with the mechanism and the audit reference |
| D-7 | None | Elapsed | any | No | Multi | **Erase** by tombstone, as a whole object | Erased, with the object named |
| D-8 | None | Elapsed | any | No | Single, analytics-relevant | **Anonymise** if A1–A3 pass; otherwise fall through to D-6 | Anonymised, or erased with the failed group-size test as the reason |
| D-9 | None | n/a — a ceiling class with no floor | **Due** | No | any | **Erase — required**, on a sweep, with no request needed | Already erased, with the date |
| D-10 | None | any | any | any | Unclassified object | **Blocked** | The object cannot be erased or retained on a stated basis; a build defect (AC-DM-67) |

Two observations a reviewer should be able to make from the table. There is **no cell that produces a refusal without a reason** — every retain row carries what the requester is told. And there is **no cell where the engine resolves a floor-versus-ceiling collision by itself**: D-4 retains and escalates, which is the only safe behaviour when two statutes point in opposite directions and neither has been read by counsel for this product.

**AC-DM-99** — *Given* the decision table above, *When* the deletion engine is exercised across the full input cross-product, *Then* every combination resolves to exactly one row, every retain outcome produces the row's stated response content, and no combination resolves to an unlogged or unexplained refusal.

#### 14.7.3 Data-principal request handling (the entity `DataPrincipalRequest`)

Supports **access** (what we hold + processing summary), **correction** (write path is the same maker-checker audited flow as any statutory-field change), **erasure** (engine above), **grievance** (routed to the named data-request handler; the CERT-In point of contact is a separate role, §17.6), and **nomination**. Each request carries its `regime`, an SLA timer and a reasoned-response record. The five types mirror DPDP Chapter III — access (s.11), correction and erasure (s.12), grievance (s.13), nomination (s.14) — which contains no right against automated decisions, no right to explanation and no right to human review (EV-066), and which is not in force until on or about 13 May 2027 (EV-058). Whether ss.11–12 reach employment processing under s.7(i) is a counsel question, and both directions are dangerous (EV-066; Part D-1; §23), so the machinery is built now and described as a product capability with its statutory basis under counsel review. Because statutory floors cover most employment records, most requests resolve to *access + correction + reasoned retention*, not deletion — the model is built to answer, not merely to delete. **[Reversed]** v0.3 grounded this in s.7(i) as current law (K-03).

**AC-DM-25** — *Given* a correction DPR against a statutory field (e.g. a wrong PAN), *When* it is actioned, *Then* it flows through the identical maker-checker audited write path as any other statutory-field change (not a privileged side-door), emits an `AuditEvent`, and triggers re-validation of any pending Filing that referenced the old value.

#### 14.7.3a The data-principal request lifecycle, as a transition table

§14.7.3 names the five request types and the prose lifecycle. This is the machine, because two of its transitions — identity verification and the reasoned response — are the ones that carry the product's exposure, and because the whole lifecycle must work identically whether or not the statutory right exists, which is the posture Part D-1 requires.

| # | From → To | Trigger | Guard | Side effect | Who |
| --- | --- | --- | --- | --- | --- |
| DP1 | *none* → `received` | A request arrives, from any channel | The request records its channel and its raw content | SLA timer starts; the timer's length is a tenant configuration, not a statutory claim | Data principal |
| DP2 | `received` → `identity_verified` | Identity is established | Verification uses data the product already holds or a channel the subject already controls — **never** a new collection of sensitive data to answer a request about sensitive data | Recorded with the method used | Data-request handler |
| DP3 | `received` → `rejected_unverified` | Identity cannot be established | The rejection states what would establish it | No data disclosed; the attempt is logged | Handler |
| DP4 | `identity_verified` → `evaluated` | The handler evaluates scope | For erasure, the §14.7.2a decision table runs; for access, the processing summary is assembled; for correction, the maker-checker write path is prepared | The evaluation's basis is recorded per class | Handler |
| DP5 | `evaluated` → `responded` | The reasoned response is issued | The response enumerates the basis for every retained class and the mechanism for every erased one | The response is itself a `Document` with its own retention class | Handler |
| DP6 | `responded` → `closed` | No follow-up within the tenant's window | — | The request stays queryable for §19's metrics | System |
| DP7 | `responded` → `reopened` | The subject disputes the response | — | A new evaluation; the prior response is kept, never replaced | Data principal |
| DP8 | any → `escalated` | A grievance is raised about the handling | Routed to the named data-request handler role, which is distinct from the CERT-In point of contact (§17.6) | Recorded | System |

**Four constraints that are easy to get wrong.**

| # | Constraint | Reason |
| --- | --- | --- |
| DPR1 | **Identity verification never collects new sensitive data.** Asking for an Aadhaar number to verify a request about an Aadhaar number is a self-defeating control | The purpose ceiling on the vault (EV-068) would be breached by the verification itself |
| DPR2 | **A correction takes the ordinary write path.** No privileged side-door, and it re-validates any pending filing that referenced the old value | AC-DM-25 |
| DPR3 | **The response never asserts a statutory right.** It describes what the product did and why, with the statutory basis under counsel review (Part D-1) | Both directions on the s.7(i) question are dangerous, and a response is a customer-facing legal claim (Part D-20) |
| DPR4 | **The machine runs identically for a scheduled sweep and for a request.** The only difference is who is told | A sweep that behaves differently from a request means one of the two is wrong |

**AC-DM-112** — *Given* a request whose subject cannot be identified from data the product already holds or a channel they already control, *When* identity verification runs, *Then* the request moves to `rejected_unverified` with the stated remedy, and no additional sensitive data is collected in order to verify it (DPR1).

**AC-DM-113** — *Given* a responded request that the subject disputes, *When* it is reopened, *Then* a new evaluation runs, the prior reasoned response is retained unchanged alongside the new one, and both remain queryable.

#### 14.7.4 Retention-class assignment matrix — every stored thing has exactly one class

§14.7.1 gives the classes and their floors. This is the assignment: which stored object carries which class, what anchors its clock, which mechanism erases it, and what a replay returns afterwards. A stored object with no class assignment is the failure this table exists to prevent — it is either deleted too early, which is a compliance failure, or never deleted at all, which is the quiet default every payroll system drifts into.

<!-- DIAGRAM: data-model-retention-clock-states -->

| Stored object | `retention_class` | Clock anchor | Ceiling | Erasure mechanism | What replay returns after erasure |
| --- | --- | --- | --- | --- | --- |
| Register instance — Forms I, IV, IX and the Form V wage slip | `REG_WAGES` | The date of last entry, once the instance closes | None | Tombstone — multi-subject (§14.4.18) | The instance's tombstone; the Form IX rows are gone as a record, and the `FormIXRow` data behind them follows the same class |
| Register instance — OSH Forms XIII, XIV, XV, XIX, XX | `REG_OSH` | Date of last entry | None; Form XX carries the r.76(2) destruction gate | Tombstone, after the gate condition is recorded | Tombstone |
| Register instance — SS Form XXII and the SS Rules' registers and records | `REG_SS` | Date of last entry | None | Tombstone | Tombstone |
| `FormIXRow` | `REG_WAGES` — it *is* register content | Its instance's anchor, never its own | None | Tombstone with its instance | The lock-time day summary flagged `source-erased` while the instance lives; the tombstone after (§14.6.1a) |
| `Punch` and its raw device packet | Product ceiling class | Creation | The tenant's configured punch-retention ceiling, floored by any open dispute | Subject-key shred | Nothing — punches are never an evaluation input, so no replayed figure changes (AC-DM-34) |
| `DayStatus` | Derived; follows `REG_WAGES` where it feeds a register instance, otherwise the punch ceiling | As above | As above | Subject-key shred or tombstone with the instance | The frozen counts in the snapshot, which are unaffected |
| `InputSnapshot` parts and manifest | The **longest floor** of anything computed from it | The period's lock date | None | Tombstone | Replay is impossible once erased — which is why its floor is derived, not configured (§14.4.17) |
| `PayrollResult` | The longest of `REG_WAGES` and `TAX_TDS` for the figures it carries | The period's lock date | None | Subject-key shred; figures survive against `employment_id`, personal fields return `ERASED` | Figures reproduce against surrogate ids; personal fields return `ERASED` |
| `Payslip` rendered file | `REG_WAGES` for the wage-slip duty; the file itself is erasable | Generation | The tenant's document ceiling | Erase the file, keep the `Document` row | Re-rendered from snapshot and template, marked as a re-rendering (§08 I4) |
| `Filing` row, states, dates, `artefact_sha256`, `ack_ref` | `TAX_TDS` for TDS filings; the register or contribution class otherwise | `filed_date`, or the due date for an unfiled obligation | None | Never erased while any evidence obligation runs; then tombstone | The filing's own record; the hash outlives the artefact bytes |
| Generated statutory artefact — ECR file, contribution file, return file | Its filing's class | Generation | None | Tombstone; the `Filing` keeps the hash | The hash and the tombstone, never a regenerated file presented as the original |
| Portal acknowledgement and challan receipt | Its filing's class | Receipt | None | Tombstone | As above |
| `Challan` / `Payment` | `TAX_TDS` or the scheme's class | Payment date | None | Tombstone | The record; reconciliation history survives |
| `LeaveTransaction` | `REG_OSH` where it feeds Form XX; otherwise the employment record class | The instance's anchor, or exit | None | Subject-key shred where single-subject | The derived balance at any date, from the surviving ledger |
| `ServiceRecord` | `GRATUITY_SERVICE` | Exit | None | Subject-key shred | Nothing — the record is derived; once its inputs are gone it cannot be re-derived, which is why its floor is a counsel parameter and not a guess |
| `AuditEvent` and ICT logs | `ICT_LOGS` — at least 180 days within Indian jurisdiction (EV-062) | Creation | None; this is a maintenance duty, not a ceiling | Never erased by a subject request; tiered to cold storage | The audit record; it never contained erased content in the first place |
| `Document` — appointment letter, KYC, proofs | `REG_WAGES` or `TAX_TDS` as its content dictates (CL2) | Generation or receipt | The tenant's document ceiling | Erase the file, tombstone the row | Tombstone |
| TRACES-generated Form 130 as downloaded | `TAX_TDS` | Download | None | Tombstone | Tombstone — the product never regenerates it; a certificate not generated from TRACES is invalid (EV-048) |
| `AadhaarTokenVault` entry | `AADHAAR_VAULT` — a **ceiling**, not a floor | Purpose spent | reg 6(5) purpose ceiling (EV-068) | Destroy the ciphertext, tombstone the row | The token resolves to a tombstone |
| `BiometricTemplate` | `BIOMETRIC_TEMPLATE` — a ceiling | Exit, consent withdrawal, or a switch to the non-biometric path | Product rule (Part E-6) | Key destruction plus two-phase device erasure | Every punch, `DayStatus` and `FormIXRow` unaffected |
| `DeviceEnrolment` erasure ledger | `ICT_LOGS` | The erasure's closure | None | Never erased by a subject request — it is the evidence the erasure happened | The ledger, including `closed-by-attestation` outcomes |
| `ConsentRecord` versions | `CONSENT_EVIDENCE` | Withdrawal or expiry | Counsel parameter | Subject-key shred | The version chain's tombstone; the fact that consent existed is itself evidence, so the class's floor is a counsel item, not a product choice |
| `DataPrincipalRequest` and its reasoned response | `CONSENT_EVIDENCE` | Closure | Counsel parameter | Subject-key shred | Tombstone |
| `MigrationBatch`, `OpeningBalance`, `PreviousEmployerIncome` | `TAX_TDS` — they carry YTD money that a Form 138 depends on | Cutover | None | Subject-key shred | Figures survive against surrogate ids |
| `EffectiveDatedRule`, `Jurisdiction`, format versions | Not personal; kept | — | None | Never erased — a rule version that produced a filed figure must stay resolvable (RO3) | The version, always |
| `RetentionHold` | `ICT_LOGS` | Release | None | Never erased while any held object lives | The hold's record |
| Benefits — `FbpDeclaration`, `ProofOfSpend`, `Dependant`, `Endorsement` | `TAX_TDS` for proof-bearing rows; the employment record class otherwise | Tax year end, or endorsement end | Tenant ceiling | Subject-key shred | Tombstone |

**Three assignment rules.**

| # | Rule | Effect |
| --- | --- | --- |
| RC1 | **Derived objects inherit the longest floor of their inputs, never their own.** The input snapshot, the service record and the day summary are the worked cases | A derived object cannot expire before the thing that needs it to be reproducible |
| RC2 | **A multi-subject object's clock is a property of the object, not of any subject on it** | One subject's exit does not start a register's clock; the register's own close does (§14.4.18) |
| RC3 | **Where a floor and a ceiling collide on one object, the object is retained and the collision is raised as a counsel item** — never resolved silently by the engine | The Aadhaar ceiling against a register field that names an Aadhaar number is the live instance (§14.10 item 3) |

**AC-DM-67** — *Given* every stored object type in the model, *When* the retention configuration is validated at build time, *Then* each resolves to exactly one `retention_class` with a clock anchor and a mechanism; an object with no assignment fails the build, and no object defaults to "erase when convenient" or to "keep forever".

**AC-DM-68** — *Given* an input snapshot whose derived floor is longer than its own tenant document ceiling, *When* the deletion engine evaluates it, *Then* the derived floor wins (RC1) and the snapshot is retained for as long as any artefact computed from it is retained.

#### 14.7.5 Retention parameters, state-sphere periods and how a value is introduced

Only EV-054's central-sphere register periods are figures in this PRD. Everything else is a **named parameter with an owner**, because the alternative — a shipped default — is a statutory assertion the product is not entitled to make (Part D-11). This subsection specifies the parameter space, its precedence, and the controlled path by which a value stops being unset.

**The parameter space** is the second column of §14.7.1's floor table — one parameter per class whose period is not EV-054's — plus the two reading questions (`retention.amendment_restarts_clock`, `retention.calendar_years_reading`), the extension question (`retention.epf_esi_extension`) and the two tenant ceilings (`retention.punch_ceiling`, `retention.document_ceiling`). §14.13 is the consolidated register and carries each one's owner, its behaviour while unset and its route; the list is not restated here. What this subsection owes is the part a register cannot express: how two parameters resolve against one object, and what the arrival of a value is allowed to change.

**Worked precedence — one figure, two floors, one of them unset.** Take the gross-wage figure on a March 2027 `PayrollResult` for an employee who has since left. It is register content — it is what the Form IX month and the Form V wage slip rest on, class `REG_WAGES`, five years from the register instance's last entry (EV-054) — *and* it is TDS evidence, class `TAX_TDS`, whose period is the counsel parameter `retention.tax_tds`. RC1 makes the `PayrollResult` inherit the longest floor of anything computed from it, so the evaluation walks:

| Step | Input | Result |
| --- | --- | --- |
| 1 · Hold | No `RetentionHold` scoped to (establishment, March 2027) | Continue |
| 2 · Enumerate floors | `REG_WAGES` (set; anchored to the register instance's close) and `TAX_TDS` (unset) | Two applicable floors, one of them unset |
| 3 · Unset test | `retention.tax_tds` has no counsel-set value | **Retain.** An unresolved-retention flag is raised naming the parameter and its owner; the reasoned response says the period is under confirmation rather than giving a date |
| 4 · Longest-floor test | Not reached while step 3 holds | — |
| 5 · Ceiling test | No ceiling class applies to a payroll figure | — |

The object is retained on the **unset** floor, not on the register floor, and the distinction is the whole point: the register floor is the shorter of the two, so an engine that resolved only the floors it happens to know would erase this figure five years after the register closed, on a basis nobody had reviewed. When `retention.tax_tds` is later set, step 3 falls through, step 4 picks whichever of the two floors is longer, and the figure acquires an erasable date for the first time — through a publication with an impact list, never through a background job.

**The unresolved-retention flag is a countable object, not a banner.** Each flag carries its `retention_class`, the parameter, the parameter's owner, the count of objects currently frozen by it, and the date the first object was frozen. That turns "how much of this tenant's data cannot be erased because the question has not been put to counsel yet" into a query rather than an impression — the retention analogue of §14.6.6's warn-only count, the same argument applied to deletion instead of computation. §19 consumes the count as a metric; §23's counsel register consumes the parameter list ordered by frozen-object count, which is what turns a counsel backlog into a prioritised one rather than an alphabetical one.

**Precedence, stated as an algorithm.** For an object at time `T`:

1. An active `RetentionHold` wins over everything (§14.7.2 branch 1).
2. Among all floors that apply to the object — its own class, plus every class it inherits under RC1 — the **longest** wins.
3. An unset floor parameter is not a zero-length floor. It blocks automatic erasure of the class and raises an unresolved-retention flag on the tenant's compliance view.
4. A ceiling applies only once every applicable floor has run. Where a ceiling falls due first, the object is retained and the collision is raised (RC3).
5. Only after 1–4 resolve does the object become erasable, and the mechanism is chosen by §14.4.18's single-subject or multi-subject test.

**How a value is introduced.** A retention parameter is not an ordinary setting, so its write path is the rule object's, not the admin console's: a parameter version carries the counsel sign-off reference, the instrument or advice it rests on, its capture date, its author and a reviewer who is not the author, and it publishes into the same knowledge-time store as any other rule version (§14.6.1b). Three consequences fall out of that choice:

- **A retention change is replayable.** "What did we believe the TDS floor was in March 2027" is answerable, which matters when a deletion decision is challenged.
- **A retention change has an impact list.** Publishing a shorter floor lists every object that becomes erasable as a result, and that list is reviewed before the sweep runs — a shortened floor is the one rule change that destroys data, so it never takes effect through a background job alone.
- **A retention change cannot be made by a tenant.** `retention.punch_ceiling` and `retention.document_ceiling` are tenant settings because they are ceilings the tenant owns; no statutory floor is tenant-writable.

**Worked example — a state period arrives.** A state's register retention period is settled by counsel for one state. `retention.state.KA.attendance_register` moves from unset to a value with its sign-off reference. On publish, the impact list names every closed Karnataka attendance-register instance whose anchor plus the new period has already elapsed — instances that were previously frozen by the unset-floor block. Nothing is deleted by the publish itself: the instances move from `FLOOR_UNKNOWN` to `FLOOR_ELAPSED`, the sweep proposes them, and the destruction gate and hold checks still run. The same publish, with a longer period, moves nothing and simply lifts the flag.

**AC-DM-69** — *Given* a `retention.*` parameter with no value, *When* the deletion sweep runs against any object in its class, *Then* no object is erased, each is reported with "floor under confirmation", and the tenant's compliance view shows an unresolved-retention flag naming the parameter and its owner.

**AC-DM-70** — *Given* a retention parameter published with a shorter period than its predecessor, *When* it publishes, *Then* an impact list of every newly-erasable object is produced and recorded before any sweep acts on it, and the prior parameter version remains resolvable at its own knowledge time.

**AC-DM-125** — *Given* an object to which two floors apply, one set and one unset, *When* the deletion engine evaluates it, *Then* the object is retained on the unset floor rather than on the set one, an unresolved-retention flag is raised naming the parameter, its owner and the count of objects frozen by it, and no erasable date is published for the object until that parameter is given a value.

#### 14.7.6 Erasure execution — ordering, verification and the failure modes

The decision engine (§14.7.2) decides; this is what the execution must guarantee. An erasure that half-completes is worse than one that has not started, because it is reported as done.

<!-- DIAGRAM: data-model-erasure-sequence -->

**Ordering.** The steps run in this order, and the order is load-bearing:

1. **Re-check holds** at execution time, not only at decision time. A hold placed between the decision and the sweep must stop the sweep.
2. **Tombstone the multi-subject objects** whose own clocks have run. This is done before any key destruction, because a tombstone write needs the record to be readable.
3. **Queue device-side erasures** and record each command. Device acknowledgement is asynchronous and may never arrive (§14.4.16).
4. **Destroy the subject key**, and have the custodian attest that no copy sits inside a backed-up store. This is the irreversible step, so it is last among the data steps.
5. **Verify** by sampling reads across the primary store, the search index, the analytics store, the cache tier and one restored backup. The expected result is ciphertext, tombstones and surrogate-keyed figures.
6. **Write the `AuditEvent`** naming the decision, basis, mechanism, actor and NTP timestamp — never the erased content.
7. **Schedule re-evaluation** for every class still blocked by an unset floor or an unrun clock.

**Failure modes and required behaviour.**

| # | Failure | Required behaviour |
| --- | --- | --- |
| F1 | A device never acknowledges | The erasure record stays incomplete with the device serial and the command age; it is closed only by an acknowledgement or by an attested decommission or loss, shown as `closed-by-attestation` (AC-DM-51) |
| F2 | A tombstone write fails partway through a multi-subject object | The transaction rolls back; a partially tombstoned register is never a state a reader can observe |
| F3 | A key destruction succeeds but the custodian cannot attest backup exclusion | The erasure is reported as **incomplete** with the reason; the product does not claim an erasure it cannot evidence (§17.14) |
| F4 | A restored backup resurrects readable data | A release-blocking defect: the subject key must live outside the backed-up stores, and the restore drill is part of the regression corpus, not a paper control |
| F5 | A search index or analytics copy survives the shred | Same defect class as F4; CL3 says the tag travels with the copy, so every copy is enumerable and every copy is covered by the same subject key |
| F6 | An erasure request arrives for an object with no `retention_class` | Blocked; an unclassified object cannot be erased any more than it can be retained on a stated basis (AC-DM-67) |
| F7 | Two erasure executions overlap for one subject | Serialised; the second observes the first's outcome rather than re-attempting a destroyed key |

**What the requester is told, in each outcome.** The reasoned response is part of the specification, not a UI detail:

| Outcome | Response content |
| --- | --- |
| Erased | The classes erased, the mechanism, the date, and the audit reference |
| Retained — floor running | The class, its statutory basis, the clock anchor, and the erasable date |
| Retained — floor unset | The class, that the period is under confirmation, and the owner of the confirmation |
| Retained — hold | That a hold applies and its scope; the hold's reason is disclosed only so far as the tenant's own disclosure policy and counsel allow |
| Partially complete | Exactly which part is incomplete — the device, the backup attestation — and what closes it |

**AC-DM-71** — *Given* an erasure execution, *When* a `RetentionHold` is placed between the decision and the sweep, *Then* the sweep stops, no key is destroyed, and the request is re-answered with the hold as the basis.

**AC-DM-72** — *Given* a completed subject-key destruction, *When* the verification sample runs across the primary store, the search index, the analytics store, the cache tier and one restored backup, *Then* every path returns ciphertext, a tombstone or a surrogate-keyed figure, and any readable personal field is a release-blocking defect (F4, F5).

**AC-DM-73** — *Given* an erasure whose device-side leg has not been acknowledged, *When* the requester is answered, *Then* the response states the erasure is partially complete, names what remains and what closes it, and the product does not report a completed erasure (F1, F3).

#### 14.7.7 Anonymisation — what §14.7.2 branch 4 actually means

Branch 4 of the deletion engine prefers anonymisation over erasure for analytics-relevant rows "where lawful". That sentence is only implementable if "anonymised" has a definition the build can test, because the common failure is a table called anonymous that is trivially re-identifiable from three columns.

**The definition this model uses.** A row is anonymised when all three hold:

| # | Condition | How it is tested |
| --- | --- | --- |
| A1 | **Direct identifiers removed.** No name, no contact field, no external government key, no vault token, no surrogate id that resolves back to a person through any table the same audience can read | A schema test over the target table's columns and its joinable neighbours |
| A2 | **Quasi-identifiers generalised.** Date of joining to month, exact salary to a band, work location to state, designation to a family. The generalisation set is declared per target table, not chosen per query | A declared generalisation map, versioned like a rule payload |
| A3 | **Group size at or above `anon.min_group_size`** for every published combination of generalised attributes | A pre-publication check; a combination below the threshold is suppressed, not published with a caveat |

`anon.min_group_size` is a **named configurable parameter with no shipped value in this PRD** — the right figure depends on the tenant's population and on what the output is used for, and inventing one would be exactly the fabricated precision this document is built to avoid. It is owned by the privacy function, set before any anonymised output leaves a tenant boundary, and routed to §20. Until it is set, no anonymised output is published outside the tenant; inside the tenant, aggregate views run under ordinary role scoping instead.

**What anonymisation is and is not used for.**

| Use | Permitted | Note |
| --- | --- | --- |
| Headcount and cost trends after an employee's erasure | Yes — this is the branch-4 case | Keeps the tenant's own history usable without keeping the person |
| Cross-tenant benchmarks | Not decided in this PRD | It is a product and a legal question, not a schema one; nothing in the model enables it by default, and D5's tenant partition stands |
| Training or tuning a model on customer data | No | The product's AI commitments say no training of external models on customer data (§12; EV-090 parity) |
| Replacing a statutory record | Never | An anonymised register is not a register; A1 would strip the very fields the register exists to carry |

**The honest limit.** Anonymisation of a small employer's payroll is hard: at twenty to two hundred employees, a state, a grade and a salary band frequently identify one person. The model therefore treats anonymisation as a **fallback that often fails its own test**, not as a general alternative to erasure — and when A3 fails, branch 4 falls through to erasure rather than publishing a weakly-generalised row. A product that claims anonymisation at this employer size without a group-size check is claiming something its own data cannot support.

**AC-DM-83** — *Given* a target table declared anonymised, *When* the pre-publication check runs, *Then* A1 and A2 are satisfied against the declared generalisation map and every published combination meets `anon.min_group_size`; a combination below the threshold is suppressed, and if the parameter is unset no output leaves the tenant boundary.

**AC-DM-84** — *Given* an erasure decision that reaches branch 4 for a twenty-person tenant, *When* A3 fails for the rows in question, *Then* the engine erases rather than publishing a generalised row, and the audit record names the failed group-size test as the reason.

---

### 14.8 Data residency & storage placement

Residency is a **segment-specific procurement gate**, not a general differentiator (§13.10, §17.7), but the data model must make placement a first-class property so the gate can be met per tenant without re-architecture.

- Every `Document` and every C1/C2 store carries `storage_region`; the default is an **India region**. That is a product default, not a claim that Indian law mandates localisation — and not a claim that it has none. The live constraints the tag must satisfy are: CERT-In's 180 days of ICT logs within Indian jurisdiction (EV-062); SPDI r.7's restriction on cross-border transfer of sensitive personal data (EV-060); for SEBI-regulated customers, data resident and processed in India, the MeitY-empanelled-infrastructure rule reaching SaaS providers, and audit and search-and-seizure rights over the provider and its sub-contractors (EV-085); for RBI-regulated customers, the IT-outsourcing directions' localisation, audit (including by RBI), sub-contractor consent and inspection terms, **materiality-gated** entity by entity (EV-087 — whether a given arrangement is material is counsel's question, Part D-14); for IRDAI-regulated customers, no localisation in the 2023 cyber guidelines, with localisation only for policy records (EV-086). DPDP's transfer regime is a negative list, empty and not in force (K-08). Hosting Aadhaar outside India is a counsel question (Part D-15), so the vault is India-only. A further candidate constraint sits outside the ledger: research round five reads Income-tax Rules 2026 r.46(8) as requiring electronically maintained books of account to remain accessible in India, with daily backups on servers physically located in India (r5/04 finding 34). Whether a customer's payroll records form part of its books is fact-specific (r5/04 finding 45), so this is a counsel question (§23); the tag must be able to express "primary and backup both in India" per tenant so the answer is a configuration, not a migration. The per-tenant guarantees built on this tag are specified in §17.1 and the legal analysis sits in §23. **[Reversed]** v0.3 applied RBI's directions "with no turnover threshold" and said IRDAI mandates records in Indian data centres (K-22, K-08).
- **Data-at-rest residency ≠ in-country inference.** The model tags fields that may be sent to an AI provider (`ai_egress_class`) so the router (§12.14, §13) can enforce a per-tenant provider matrix. Aadhaar, PAN, bank account and IFSC, and biometric templates are default-deny at the mandatory redaction chokepoint on every outbound model call and never leave in clear (Part E-7; §12.8); other C1 fields leave only where the tenant's matrix allows a provider with India data-at-rest and in-country inference. LLM prompt and completion logs are kept in India, and AI features default off for RBI-, SEBI- and IRDAI-regulated tenants (Part E-7). This is one abstraction serving both cost (router) and residency (compliance) — the same "at least three interchangeable backends, residency selectable per tenant" abstraction §13 and §17 require (§17.7 NFR-RES-702).
- **No statutory or monetary figure is ever model-generated** (§08 **[Verified]**), so the highest-sensitivity numeric fields never need to leave the deterministic engine; AI egress is largely C3/de-identified text, which narrows the residency surface.

**AC-DM-26** — *Given* a tenant with a residency requirement, *When* any field would be sent to an AI provider, *Then* a default-deny field (Aadhaar, PAN, bank account/IFSC, biometric template) is tokenised at the chokepoint and never sent in clear; any other C1 field is checked against the tenant's provider matrix via `ai_egress_class` and blocked unless the provider offers both India data-at-rest and in-country inference; every block and every allow is auditable.

#### 14.8.1 The copy inventory — every place a value exists

`storage_region` and `ai_egress_class` are only enforceable if the set of places a value can exist is **enumerable**. A schema that tags the primary store and forgets the search index has tagged the least interesting copy. The inventory below is the closed set; a new copy type is a schema change with its own review, not an implementation detail.

| Copy | Carries the class and region tags | Subject-key encrypted | Reached by the deletion engine | Reached by the egress chokepoint |
| --- | --- | --- | --- | --- |
| Primary store | Yes | Yes for personal fields | Yes | n/a |
| Read replica | Yes, inherited | Yes | By construction — it replicates the ciphertext and the tombstones | n/a |
| Backup set | Yes | Yes — and the subject key is kept **outside** the backed-up stores, so a restore cannot resurrect it (§17.14) | Not directly; the key destruction is what covers it | n/a |
| Search index | Yes | Yes for indexed personal fields | Yes — an index entry is a copy, and CL3 carries the tag into it | n/a |
| Cache tier | Yes | Yes | Yes, with a bounded staleness window that is part of the erasure verification | n/a |
| Analytics store | Yes | Yes until anonymised under §14.7.7 | Yes | n/a |
| Log store, including ICT logs | Yes | Logs never carry C1 payloads; they carry references | Never erased by a subject request — they are the evidence the erasure happened (EV-062) | n/a |
| LLM prompt and completion logs | Yes; kept in India (Part E-7) | Redacted before write by construction | Yes | Written only after the chokepoint has run |
| Outbound model payload | The chokepoint enforces `ai_egress_class` before egress | Default-deny fields never leave in clear | n/a | Yes — this is the chokepoint |
| Generated artefacts and exports | Yes, inherited from contents (CL2) | Per class | Yes, by tombstone | n/a |
| Support bundle | Yes, inherited (CL2) | Per class | Yes | n/a |

**Three invariants over the inventory.**

| # | Invariant | Test |
| --- | --- | --- |
| CI1 | **Every copy is enumerable.** The build knows the full list, so "where does this field exist" is answerable without a survey | The erasure verification samples every copy type (§14.7.6 step 5) |
| CI2 | **No copy lowers a tag.** Class and region travel with the value into every copy (CL3) | The classification test walks copies, not only the primary schema |
| CI3 | **No copy escapes the region policy.** A replica, index or analytics copy in a second region is a residency change, not an operational detail (§14.8) | A placement test per tenant, per copy type |

The reason to write this down in the data model rather than in the infrastructure section is that each of these copies is created by a *schema* decision — an indexed field, a cached projection, an analytics materialisation — and the decision that creates the copy is the decision that must carry the tag.

**AC-DM-92** — *Given* any C1 field, *When* the copy inventory test runs, *Then* every copy type that holds it is enumerated with its class and region tags, and a copy type not on the inventory list fails the build.

**AC-DM-93** — *Given* a tenant with an India-only residency configuration, *When* any copy — replica, index, cache, analytics store or LLM log — is placed, *Then* it is placed in an India region, and a placement outside it is refused rather than logged (CI3).

---

### 14.9 Keys, referential integrity & external-format validation

External keys are validated to their **source format at write time** (§07 FR-CHR-002..006) so rejections surface at data entry, not at expensive filing time. Format validation is cheap insurance against a filing-day rejection loop. Every mask below is a versioned validation rule, parameter `id_format.<key>`, so a mask change is a rule-version change and never a code edit. Most masks were carried from v0.3 without any research round capturing the issuer's own specification; they are desk-verified against that specification before v1 GA (§07.1.1, §20). **[Reversed]** v0.3 marked every row below Verified.

| Key | Format (validated at write) | India-specific validation | Confidence |
| --- | --- | --- | --- |
| PAN | `[A-Z]{5}[0-9]{4}[A-Z]` (10 char) | 4th char = holder type (`P` individual, `C` company, `F` firm, `H` HUF, `T` trust…); 5th char = first letter of surname/entity name; mismatch drives correction before Form 138/130 | **[Hypothesis — carried, not re-captured]** (`id_format.pan`, §07.1.1) |
| TAN | `[A-Z]{4}[0-9]{5}[A-Z]` (10 char) | First 4 alpha (4th = deductor initial), 5 numeric, 1 alpha; the TDS filing key | **[Hypothesis — carried, not re-captured]** (`id_format.tan`) |
| Aadhaar (optional) | 12 numeric, **Verhoeff checksum** | Validated at the vault boundary; stored only in the `AadhaarTokenVault`, never in a business table; business rows hold the opaque token (§14.4.15) | **[Hypothesis — carried, not re-captured]** the checksum rule (`id_format.aadhaar`, §07.1.1) |
| UAN | 12 numeric | No published checksum; validity via seeding status, not digit rule | **[Verified]** field position in the ECR (EV-035); length carried (`id_format.uan`) |
| ESI IP | 10 numeric | Registration status gates ESI filing | **[Hypothesis]** — practitioner descriptions of ESIC's upload template only (`id_format.esi_ip`, §07.1.1) |
| IFSC | `[A-Z]{4}0[A-Z0-9]{6}` (11 char) | **5th char is `0`** (reserved); validated + optionally checked against the RBI IFSC master; feeds penny-drop | **[Hypothesis — carried, not re-captured]** (`id_format.ifsc`, §07.1.1) |
| Bank account | numeric, bank-variable length | No universal checksum; verified by **penny-drop / name-match** (disbursal-blocking) | Product rule (§07 FR-CHR-006) |
| EPF establishment code | region/office/establishment code + optional extension | Region/office codes from the EPFO master | **[Hypothesis — carried, not re-captured]** (`id_format.epf_code`, §07.2) |
| ESIC employer code | 17 digits as carried | Sub-codes are separate establishment rows | **[Hypothesis — carried, not re-captured]** (`id_format.esic_code`, §07.2) |
| GSTIN | 15 char (`\d{2}[A-Z0-9]{13}`) | First 2 = state code (must match establishment state); 15th = checksum | **[Hypothesis — carried, not re-captured]** (`id_format.gstin`) |

| Concern | Model rule |
| --- | --- |
| **Internal vs external keys** | Internal surrogate `_id`s are the join keys; external government keys are validated to source format **at write time** so rejections surface at entry, not at expensive filing time. |
| **Immutable lineage** | `employee_id` never changes across rehire/transfer; `Employment`, the assignments and `CompensationAssignment` carry the churn, and person-level identifiers stay on `Person`. PF Member ID is establishment-scoped and *does* change on transfer — modelled on the `EstablishmentMapping`, not Person. |
| **Registration keys on filings** | A filing instance references the `registration_id` and the knowledge-time version of the registration row it was raised against, so a later correction to a registration number never rewrites which code an artefact was filed under (§14.3.1 T6). |
| **Referential integrity across effective-dated rows** | A `PayrollResult` references a *specific version* (`rule_id` + knowledge-time) — not "the current PT slab" — so re-opening a later period cannot mutate a filed artefact (D2). |
| **Snapshot isolation for filings** | `Filing.input_snapshot_ref` freezes the exact rows used; corrections create new attempts linked by `corrects_filing_id`, never in-place edits. |
| **Idempotency** | Device punches (`device_sn`, `device_user_id`, `device_timestamp`, `direction` + `payload_hash` — §09.3), bank files (batch id) and portal submissions (return file ID; TRRN; challan CRN; acknowledgement reference) carry natural idempotency keys so retries do not double-count. |
| **Soft-delete only** | Business rows are never hard-deleted by the app; deletion is the §14.7 engine's decision, executed as anonymisation, crypto-shredding or tombstone (§14.6.1a) with an audit record. |

**AC-DM-27** — *Given* a malformed PAN, TAN, IFSC (5th char ≠ `0`), or a failed Aadhaar Verhoeff checksum, *When* it is entered, *Then* it is rejected at write time with a specific reason — the Aadhaar at the vault boundary, before anything is stored — and before any Filing that would quote the key is generated.

**AC-DM-28** — *Given* a device that re-POSTs a punch it already sent (same `device_sn`, `device_user_id`, `device_timestamp`, `direction` and `payload_hash`), *When* the ADMS receiver ingests it, *Then* the punch is deduplicated and attendance is not double-counted.

#### 14.9.1 Referential-integrity and uniqueness catalogue

The tables above give the keys. These are the constraints a physical schema must enforce, each with the point it is enforced at and the defect it prevents. They are numbered so a review can walk them; every one is a constraint, not a convention, and a convention here becomes a filing defect within two quarters.

| # | Constraint | Scope | Enforced at | Defect it prevents |
| --- | --- | --- | --- | --- |
| RI1 | `tenant_id` is the leading key component of every Ring 1–3 row, and no query path omits it | All business rows | Query layer and storage layout | A cross-tenant read (D5, AC-DM-01) |
| RI2 | `employee_id` is immutable and never reused, across rehire, transfer and exit | Tenant | Write path | A broken gratuity lineage; two people sharing a history |
| RI3 | PAN, UAN and ESI IP exist at exactly one owning level — `Person` | Tenant | Schema shape; no such column exists elsewhere | A UAN forked on rehire (§07 FR-CHR-104) |
| RI4 | PF Member ID exists only on `EstablishmentMapping` | Tenant | Schema shape | The classic "PF Member ID on Person" bug: a transfer silently overwrites the prior code's member id |
| RI5 | TAN and PTEC exist only on `LegalEntity`; EPF, ESIC, PTRC, LWF, S&E and LIN registrations only on `Establishment` | Tenant | Schema shape | A PTEC on an establishment, which is the §14.4.1 reversal |
| RI6 | At most one active `Registration` per (owner, scheme, state) on any date | Tenant | Write time | Two PTRC rows for one state (T4) |
| RI7 | A (scheme, number) pair belongs to at most one owner within a tenant; uniqueness is **never** checked across tenants | Tenant | Write time | A cross-tenant disclosure through a uniqueness error message (T4) |
| RI8 | Exactly one `ServiceRecord` per (person, legal entity) | Tenant | Derivation | Two gratuity clocks for one employment history |
| RI9 | Every assignment range is closed-open, non-overlapping and gapless within its employment | Employment | Write time | Two establishments claiming one employee-day (T3) |
| RI10 | Every child's validity lies inside its parent's, at every level of §14.3.1 | Tenant | Write time | A mapping into a closed establishment (T1) |
| RI11 | A `Filing` references a `registration_id` **and** that registration row's knowledge-time version | Tenant | Filing-instance creation | A later registration correction rewriting which code an artefact was filed under (T6) |
| RI12 | A `PayrollResult` references specific `rule_id` versions, never a "current rule" pointer | Tenant | Result write | Re-opening a later period mutating a filed artefact (D2) |
| RI13 | `Filing.input_snapshot_ref` points at an immutable snapshot version, and the snapshot cannot be erased while the filing is retained | Tenant | Retention matrix (RC1) | An unreplayable filed artefact |
| RI14 | Exactly one ledger row per (registration, obligation, period) inside the registration's validity range | Registration | Period open, plus a completeness check | A silently abandoned obligation (§14.4.22) |
| RI15 | Every statutory or monetary write commits atomically with exactly one `AuditEvent` | Tenant | Transaction boundary | A change with no lineage (AC-DM-20) |
| RI16 | No business row, log, export, analytics row or model payload holds an Aadhaar number or a hash of one | Everywhere | Build-time schema and egress test | AC-DM-31 |
| RI17 | No `Punch` row carries a biometric template reference; no image column and no image bucket exists anywhere | Everywhere | Schema shape | Template destruction invalidating the attendance record (§14.4.15) |
| RI18 | Every field resolves to exactly one classification, and every container's class is the maximum of its contents' | Everywhere | Build-time test | An untagged field leaking at egress (CL4) |
| RI19 | Every stored object type resolves to exactly one `retention_class` with a clock anchor | Everywhere | Build-time test | An object nobody can either keep or delete on a stated basis (AC-DM-67) |
| RI20 | A published rule version is immutable except for `superseded_at` | Rule store | Write path | RO2 |
| RI21 | `reviewer ≠ author` on any rule version past IN_REVIEW | Rule store | Data constraint, not a UI check | A single person publishing a money-moving rule (§22 AC-RULE-003.2) |
| RI22 | Maker ≠ checker on a `PayrollResult` or `Filing` approval transition | Tenant | Transition guard | AC-DM-29 |
| RI23 | External keys validate to their `id_format.<key>` mask at write time, and the Aadhaar checksum validates at the vault boundary before anything is stored | Tenant | Write path | A filing-day rejection loop (AC-DM-27) |
| RI24 | Every `RegistrationCoverage` row names exactly one scheme and one date range, and no two coverage rows for one (establishment, scheme) overlap | Tenant | Write time | An establishment filing one scheme under two codes for one day |

**Idempotency keys — the natural keys that make a retry safe.**

| Interaction | Idempotency key | Window | What a duplicate produces |
| --- | --- | --- | --- |
| Device punch ingestion | `(device_sn, device_user_id, device_timestamp, direction)` + `payload_hash` (§09.3) | The device's own retry budget | Deduplicated; attendance not double-counted (AC-DM-28) |
| Bank disbursement file | Batch id | Until the batch reconciles | The same batch, not a second payment instruction |
| Portal submission | The return file id, the TRRN, the challan CRN, the acknowledgement reference (EV-036, EV-051) | Per filing attempt | A new **attempt** row, never an overwrite of the prior attempt |
| Migration import | `(MigrationBatch, source_row_key)` | Per batch | The same row, not a duplicate employee — a duplicate UAN or ESI IP mint is a release-blocking defect (AC-DM-19) |
| Rule publish | `(rule_key, version)` | Permanent | Refused; a version number is never reused |

**AC-DM-85** — *Given* the constraint catalogue above, *When* the schema conformance suite runs, *Then* every RI constraint has at least one negative test that provokes it and observes the specified refusal; a constraint with no negative test fails the suite's own coverage check.

**AC-DM-86** — *Given* a uniqueness violation on a (scheme, number) pair, *When* the error is returned, *Then* it names the conflicting owner **within the tenant only**, and no cross-tenant existence is disclosed by the error, the timing or the message (RI7).

#### 14.9.2 Time, clocks and dates

A payroll data model has at least five different notions of "when", and a schema that stores them all as one timestamp type produces defects that only appear at a period boundary — which is to say, in production, on the 15th. Each is a distinct stored type with its own rules.

| Notion | Type | Source | Rules |
| --- | --- | --- | --- |
| **Business date** | Calendar date, no time, interpreted in the tenant's own working calendar | Human input or a derived period boundary | Date of joining, date of leaving, effective dates, due dates. Never derived from a timestamp by truncation, because a truncation is time-zone dependent and these dates are not |
| **Period** | A named interval, not a pair of timestamps | The scheme's own calendar | A wage month, an ESI contribution period (Apr–Sep, Oct–Mar), a quarter, a Tax Year. Stored as an identifier plus its resolved bounds, so that a change in how a scheme defines its period is a rule change, not a re-derivation of every row |
| **Knowledge time** | Instant, monotonic within a store | The system, at publication or staging | `recorded_at` and `superseded_at` on B-class rows; the axis every replay question resolves on (§14.6.1b) |
| **Event instant** | Instant with its source's own clock recorded alongside | A device, a portal, a bank | A punch carries the device timestamp **and** the receipt timestamp, because device clocks drift and the dispute needs both (§09.3) |
| **Audit instant** | Instant, NTP-synced to NIC or NPL per the CERT-In Directions (EV-062) | The audit path | Non-negotiable: an audit row without a valid NTP timestamp cannot commit (AC-DM-20) |

**Five rules that fall out.**

| # | Rule | Why |
| --- | --- | --- |
| TM1 | **Ranges are closed-open** `[from, to)` everywhere — assignments, rule effective ranges, registration validity, coverage rows | One convention, applied without exception, is what makes "no gaps, no overlaps" a checkable constraint rather than a reasoning exercise (T3) |
| TM2 | **A business date is never compared to an instant.** Comparisons happen inside one notion; crossing notions requires an explicit resolution with a stated calendar | The classic month-boundary defect: an effective date of 1 October compared against a UTC instant that is still 30 September |
| TM3 | **The disbursal date is an input, not a derivation.** It is part of the evaluation context (§08 I6) and it is what the PF liability on arrears dates from — not the wage month (Part E-9) | An engine that reads a clock cannot be pure, and a model that assumes wage month equals liability date under-states an arrears liability |
| TM4 | **A period boundary belongs to the scheme, not to the calendar.** ESI coverage ends at the contribution-period boundary; the PT year's February instalment is a period override; the Tax Year is not the calendar year | Every one of these has been implemented as "end of month" by someone, and each produces a wrong return |
| TM5 | **Two clock sources are stored whenever an external system supplies one.** Device timestamp and receipt timestamp; portal acknowledgement time and our own record time | A single stored time makes a disputed punch or a disputed filing time unarguable in the wrong direction |

**The dual vocabulary, as a data definition.** The Income-tax Act 2025 renames "Financial Year" to **"Tax Year"**, and the file field is six digits — 202627 for Tax Year 2026-27 — with the assessment-year field at 202728 or later (EV-050). The model therefore stores the period identifier in the six-digit form, carries **both** labels, and accepts both vocabularies in search, imports, labels and help, because historical periods keep the old forms and practitioners still use them (EV-050). The same discipline applies to form numbers: `130←16`, `131←16A`, `133←27D`, `137←24G`, `138←24Q`, `140←26Q`, `143←27EQ`, `144←27Q`, `12BB→124`, `12BA→123`, `12B` and `12BAA→122`. A search that keys on a single vocabulary silently fails for half a practitioner's working history.

**AC-DM-100** — *Given* an effective date of 1 October and any stored instant, *When* the two are compared during rule resolution or assignment validation, *Then* the comparison resolves through an explicit calendar with no time-zone-dependent truncation, and a boundary case at midnight produces the same answer in every region the service runs in (TM2).

**AC-DM-101** — *Given* an arrears batch approved in September for a March wage month, *When* the PF liability date is computed, *Then* it is the arrears run's disbursal date from the evaluation context, not the wage month, and the date is visible when the batch is approved (TM3, Part E-9).

**AC-DM-102** — *Given* a search or an import using either vocabulary — "Financial Year 2026-27" or "Tax Year 2026-27", "24Q" or "Form 138", "Form 16" or "Form 130" — *When* it is resolved, *Then* both forms reach the same period or form, and the stored period identifier is the six-digit form (EV-050).

#### 14.9.3 Field-type glossary

The types below are the model's vocabulary. They are listed because each one prevents a specific class of defect, and because a build team that picks its own representation for money or for a range will produce a schema that satisfies every table above and still fails in production.

| Type | Representation | Rule |
| --- | --- | --- |
| `money` | Integer paise with an explicit currency | No floating point anywhere in the money path (P5). Rounding is a stated method or a named parameter, never a language default (§08's rounding policy) |
| `rate` | Decimal with its base named separately (`base_ref`) | A rate without a base is unusable; a rate stored as a float is a reconciliation problem |
| `business_date` | Date, no time | Never truncated from an instant (TM2) |
| `instant` | Timestamp with its source clock named | Audit instants are NTP-synced (EV-062) |
| `range` | Closed-open `[from, to)`, either end nullable for open-ended | One convention everywhere (TM1) |
| `period_id` | Scheme-scoped identifier plus resolved bounds | A wage month, a contribution period, a quarter, a six-digit Tax Year (EV-050) |
| `jurisdiction_id` | Central, a state or UT, or a sub-state local body | The levy level is part of the identity, because Tamil Nadu and Kerala levy PT locally (§06.4) |
| `external_key` | String plus its `id_format.<key>` mask version and its linkage state | The state is as load-bearing as the value (D6) |
| `opaque_token` | Random, not derived from any input | The Aadhaar vault token; never a hash, never a truncation (§14.4.15) |
| `classification` | One of C1–C4 | Mandatory on every field; untagged fails the build (CL4) |
| `retention_class` | One named class | Mandatory on every stored object (RI19) |
| `rule_ref` | `rule_id` plus the knowledge time it was resolved at | Never "the current rule" (RI12) |
| `evidence_status` | `[Verified]`, `[Verified — mirror]`, `[Hypothesis]` | Drives `enforcement_mode` (RO5) and the mirror flag (RO6) |
| `enum` | Closed set, versioned | An enum extension is a schema change with a migration for existing rows, not a new string appearing in production |
| `tombstone` | Record id, class, dates, erasure basis, actor | What an erased record returns; never a reconstruction (§14.6.1a) |

**AC-DM-103** — *Given* any monetary field in any store, export or artefact, *When* the type conformance test runs, *Then* it is an integer-paise representation with an explicit currency and a stated rounding method or named parameter; a floating-point money field fails the build.

#### 14.9.4 Where each check runs — the enforcement-timing table

The same rule enforced at the wrong moment is a different product. A format check at filing time is a bad day on the 15th; the same check at write time is a corrected typo in onboarding. This table fixes *when* each family of checks runs, because the timing is a design decision and not an implementation detail.

| Check family | Build time | Write time | Period readiness | Generation | Publish (rule store) | Sweep |
| --- | --- | --- | --- | --- | --- | --- |
| Classification completeness (CL4) | ✔ — an untagged field fails the build | | | | | |
| Retention-class assignment (RI19) | ✔ | | | | | |
| Copy inventory membership (CI1) | ✔ | | | | | |
| No Aadhaar number or hash outside the vault (RI16) | ✔ schema and egress test | ✔ at the vault boundary | | ✔ artefact scan | | |
| No template reference on a punch (RI17) | ✔ schema shape | | | | | |
| External-key masks and the Aadhaar checksum (RI23) | | ✔ | | | | |
| Range nesting, gaps and overlaps (T1, T3, RI9) | | ✔ | | | | |
| Registration uniqueness (T4, RI6, RI7) | | ✔ | | | | |
| Covering registration for every eligible scheme (T2) | | | ✔ | ✔ at instance creation | | |
| Straddled-period flagging (T7) | | ✔ on the split | ✔ | | | |
| Identifier linkage gating (UAN, ESI IP) | | | ✔ pre-ECR readiness | ✔ exclusion and flag | | |
| Bank verification (disbursal-blocking) | | ✔ | ✔ | | | |
| Snapshot completeness (§08 FR-PAY-313) | | | ✔ at the freeze | | | |
| Maker ≠ checker (RI22) | | | | | | — enforced at the transition |
| Payload schema and the P-rules | | | | | ✔ before review | |
| `reviewer ≠ author` (RI21) | | | | | ✔ | |
| Citation and corrigendum-check completeness | | | | | ✔ | |
| Artefact hash verification (AC-DM-87) | | | | ✔ at generation and on every read | | |
| FVU stack pairing (EV-052) | | | | ✔ | | |
| Ledger completeness (RI14) | | | ✔ at period open | | | ✔ |
| Retention floors, ceilings and holds | | | | | | ✔ |
| Erasure verification across the copy inventory | | | | | | ✔ after execution |

**The three timings that carry the most value.** Build-time checks are the only ones that cannot be skipped under delivery pressure, so every structural invariant that can be a build check is one. Readiness checks are what convert a filing-day surprise into a week-ahead task list, which is the product's actual promise. And publish-time checks on the rule store are where a single wrong value would otherwise reach every tenant at once — which is why two people, a citation and a corrigendum check all sit on that one transition.

**AC-DM-115** — *Given* the enforcement-timing table, *When* the conformance suite runs, *Then* each check family is observed firing at the stated moment and not later; a check that only fires at generation when the table says write time is a defect, even though the artefact is still correct.

#### 14.9.5 The six simplifications, and the first symptom of each

Every entity in this section is more complicated than a first-pass design would make it, and a build team under pressure will propose at least one of these six. Each is listed with the symptom it produces, because the symptom is always later, elsewhere, and owned by someone other than whoever made the simplification.

| Simplification | First production symptom | Where it is refused |
| --- | --- | --- |
| One `wage` column instead of component flags | The ECR's EPF Wages and Gross Wages fields cannot both be produced from one figure; the return is rejected or, worse, accepted with wrong wages | §14.4.3a, RI21-adjacent refusal in §14.4.13 |
| One assignment row carrying location, establishment and salary | A CTC revision drags an employee's PT state with it, or a transfer restates a filed ECR | §14.3.2 |
| Effective dates without knowledge time | A corrigendum silently rewrites what a filed month was computed from; the filed artefact and the recomputed figure disagree and nobody can say which is right | §14.6.1, §14.6.4a |
| Filings created at generation time instead of ledger rows at period open | An obligation nobody generated is invisible until the chronology block appears at upload, four months later (EV-038) | §14.4.22 |
| One timestamp type for every notion of "when" | A month-boundary effective date resolves differently depending on where the service runs | §14.9.2 |
| `DELETE` instead of a decision engine | Either an unlawful deletion below a statutory floor, or an erasure request answered with a refusal nobody can justify | §14.7.2a, D8 |

The pattern is that each simplification is locally correct and globally wrong: it makes the module it lives in simpler and moves the cost into a return, a boundary or a request months later. That is why these are stated as constraints with build-time and write-time enforcement rather than as design guidance — guidance loses to a deadline, and a constraint does not.

---

### 14.10 Open questions, hypotheses & validation gates

Carried forward so nothing here is mistaken for settled fact. Each hypothesis has a kill/confirm method.

| # | Open item | Confidence | Validation / kill criterion |
| --- | --- | --- | --- |
| 1 | Every retention period other than EV-054's central-sphere register figures — income-tax/TDS, company books, EPF/ESI beyond SS r.53(1)(e), gratuity tail, IR records, consent evidence, and every state-sphere period | Counsel (Part D-11) | Counsel sets each `retention.*` parameter (§14.7.1), starting from the r5/04 candidate provisions; tracked in §23's counsel register; build-blocking desk work in §20. Default to the **longer** of overlapping floors; an unset floor blocks automatic erasure. |
| 2 | Whether biometric attendance capture is authorised by s.7(i) once in force, and who owes the SPDI written-consent duty today | Counsel (Part D-2, D-4) | Build consent capture either way (§14.4.15); the non-biometric path is always available (§09). |
| 3 | Whether a rendered Form I register (field 24, Aadhaar No.) may carry the full number, given the reg 6(5) purpose ceiling on the vault; and whether the Form I photo and thumb-impression fields (EV-055) are SPDI biometric information needing written consent | Counsel (§23) | Until answered, registers render Aadhaar from the vault only at generation (§07 FR-CHR-045-onb), and register images never come from a biometric enrolment image or template. |
| 4 | Full all-state PT/LWF slab dataset for `EffectiveDatedRule` | **[Hypothesis]** | Per-state status in §06.4 and §06.13. Gazette-source each state before claiming coverage; v1 = beachhead states, v2 = all states. |
| 5 | Form 138 Q4 regular and correction formats → Form 130 Part B | **[Verified]** not released, re-checked September 2026 (EV-046) | Watch the release; the Q4 generator is fenced and `Filing.format_version` absorbs the format when it lands. |
| 6 | ESI regime after the one-year saving under CoSS s.164(2)(b) lapses on or about 21 November 2026 | Open — we are not aware of a successor instrument as of September 2026 (§06.9) | Primary-source watch on ESIC/MoLE (§22 FR-RULE-006); §06 time-critical item. ESI rule rows after the date stay fenced until a successor is published through §22. |
| 7 | Whether the add-back percentage stays 50% | **[Verified]** it is a notified variable | `addback_percent` is a rule row, not a constant — no schema change needed if it moves. |
| 8 | Per-state filing due dates for `filing_due_date` rows (PT, LWF) | **[Hypothesis]** | Gazette-source per state alongside item 4; `Filing.due_date`/`on_time` are rule-backed so a date change is a data load. |
| 9 | Whether DPDP ss.11–12 rights reach employment processing under s.7(i); the scope of the DPDP r.8(3) retention floor | Counsel (Part D-1, D-9) | `DataPrincipalRequest` and `retention.dpdp_r8_3` are built as machinery; neither immediate purge nor one-year suppression is hard-coded. |
| 10 | Whether the SPDI Rules survive the omission of IT Act s.43A on or about 13 May 2027 | Counsel (Part D-12) | `ConsentRecord.regime` keeps SPDI-regime records intact across the switch whatever the answer (§14.4.15). |
| 11 | Whether Income-tax Rules 2026 r.46(8)'s in-India accessibility and daily in-India backup condition reaches payroll records a customer keeps in the product (r5/04 findings 34, 45) | Counsel (§23) | `storage_region` expresses primary and backup placement per tenant (§14.8); the answer sets a tenant default, never a schema change. |
| 12 | Each state's part-period treatment when a registration starts, ends or changes inside a filing period, and on a mid-period transfer | **[Hypothesis]** | Read per state alongside item 4; until read, straddled periods are flagged for operator review (§14.3.1 T7), never split by assumption. |
| 13 | Every `id_format.*` mask carried from v0.3 (PAN, TAN, Aadhaar checksum, ESI IP, IFSC, EPF and ESIC codes, GSTIN, PRAN) | **[Hypothesis — carried]** | Desk-verify against each issuer's published specification before v1 GA (§07.1.1, §20); a mask change ships as a rule version. |
| 14 | `anon.min_group_size` — the minimum group size any anonymised output must meet | Unset; no figure is asserted | Set by the privacy function before any anonymised output leaves a tenant boundary (§14.7.7); until then no such output is published, and the honest limit at 20–200 employees is that many combinations will fail the test (§20). |
| 15 | Whether an appended amendment entry restarts a register instance's retention clock, and whether "five calendar years" and "five years" read identically (EV-054 shows they are not identically worded) | Counsel | `retention.amendment_restarts_clock` and `retention.calendar_years_reading`; the longer reading applies until answered (§14.13). |
| 16 | Whether a work location can be resolved to the local body in the states that levy PT below state level (§06.4) | **[Hypothesis]** — address structure sufficiency is untested | Until tested, the tenant selects the local body explicitly and an unresolved body leaves the obligation `unconfigured`, never defaulted to a state row (§14.4.11a). |
| 17 | Whether any `payload_schema_version` will need a breaking change after rows exist | Open | Schemas are versioned per row, so old rows resolve under their own version; a breaking change is additive. Tracked as DM-R5 (§14.14). |
| 18 | The device-erasure retry budget before `unreachable` is declared, and the bounded staleness window the erasure verification allows on the cache tier | Product parameters, unset | Both are named product settings set before the first biometric-enabled customer; neither is a statutory figure (§14.4.16, §14.8.1). |

The single most important property of this model is that **items 4–8, 12 and 13 are absorbed as data, not code, and items 1–3 and 9–11 as parameters and regimes rather than schema changes**: a corrigendum, a new state slab, a changed add-back percentage, a shifted due date or a new file format is a row in `EffectiveDatedRule` / a `format_version` bump — not a migration and a deploy. That is what makes "statutory maintenance as the operating model" (§06) affordable rather than fatal.

---

### 14.11 Acceptance-criteria index

The `AC-DM-nn` criteria above are the testable contract §20 exercises. Grouped by the invariant they defend:

| Invariant | Acceptance criteria |
| --- | --- |
| D2 · bitemporal / retro, scoped by class | AC-DM-09, AC-DM-10, AC-DM-22, AC-DM-34, AC-DM-35 |
| D3 · rules-as-data; jurisdiction on the work location | AC-DM-07, AC-DM-21, AC-DM-36 |
| D3 · the rule object (§14.6.1b) | AC-DM-42, AC-DM-43, AC-DM-44, AC-DM-45 |
| Statutory hierarchy and temporal constraints (§14.3.1) | AC-DM-37, AC-DM-38, AC-DM-39, AC-DM-40, AC-DM-41 |
| D4 · audit lineage / maker-checker | AC-DM-02, AC-DM-08, AC-DM-20, AC-DM-25, AC-DM-29 |
| D5 · tenant isolation | AC-DM-01, AC-DM-30 |
| D6 / §14.9 · external-key state & format | AC-DM-05, AC-DM-06, AC-DM-19, AC-DM-27, AC-DM-28 |
| D7 / §14.8 · classification & residency | AC-DM-26 |
| Segregated identity stores (Part E-6) | AC-DM-31, AC-DM-32, AC-DM-33 |
| D8 · deletion engine | AC-DM-23, AC-DM-24, AC-DM-35 |
| D9 · money-of-record isolation | AC-DM-17 |
| Filing-as-delivery (D1) | AC-DM-03, AC-DM-11, AC-DM-12, AC-DM-13, AC-DM-14 |
| Obligation latch / eligibility | AC-DM-04, AC-DM-05 |
| Attendance / leave ledgers | AC-DM-15, AC-DM-16 |
| Migration correctness | AC-DM-18, AC-DM-19 |
| Assignment layer and the statutory hierarchy (§14.3.2–§14.3.5) | AC-DM-46, AC-DM-47, AC-DM-48, AC-DM-49, AC-DM-106, AC-DM-114 |
| Segregated identity stores, in depth (§14.4.16) | AC-DM-50, AC-DM-51, AC-DM-52 |
| The input snapshot as a stored object (§14.4.17) | AC-DM-53, AC-DM-54 |
| Multi-subject records and the two erasure mechanisms (§14.4.18) | AC-DM-55, AC-DM-56 |
| `ServiceRecord` derivation (§14.4.19) | AC-DM-57, AC-DM-58 |
| Field-level classification and egress (§14.5.2) | AC-DM-59, AC-DM-60 |
| Rule payload schemas (§14.6.2a) | AC-DM-61, AC-DM-62, AC-DM-63 |
| Resolution decision table (§14.6.3a) | AC-DM-64, AC-DM-65, AC-DM-66 |
| Retention-class assignment and parameters (§14.7.4–§14.7.5) | AC-DM-67, AC-DM-68, AC-DM-69, AC-DM-70, AC-DM-125 |
| Erasure execution (§14.7.6) | AC-DM-71, AC-DM-72, AC-DM-73 |
| `EligibilityState` transitions (§14.4.20) | AC-DM-74, AC-DM-75 |
| `Registration` lifecycle (§14.4.21) | AC-DM-76, AC-DM-77 |
| The filing ledger as a completeness constraint (§14.4.22) | AC-DM-78, AC-DM-79 |
| Exceptions as data (§14.4.23) | AC-DM-80, AC-DM-81 |
| The replay matrix (§14.6.4a) | AC-DM-82 |
| Anonymisation (§14.7.7) | AC-DM-83, AC-DM-84 |
| Referential integrity and uniqueness (§14.9.1) | AC-DM-85, AC-DM-86 |
| `Document` — evidence versus render (§14.4.8a) | AC-DM-87, AC-DM-88 |
| Masking and the support surface (§14.5.3) | AC-DM-89, AC-DM-90 |
| Rule-store reporting (§14.6.6) | AC-DM-91 |
| The copy inventory (§14.8.1) | AC-DM-92, AC-DM-93 |
| Stored versus derived (§14.4.4a) | AC-DM-94 |
| Identifier linkage transitions (§14.4.2a) | AC-DM-95, AC-DM-96 |
| Filing and challan, two lifecycles (§14.4.6a) | AC-DM-97, AC-DM-98 |
| The deletion decision table (§14.7.2a) | AC-DM-99 |
| Time, clocks, dates and the dual vocabulary (§14.9.2) | AC-DM-100, AC-DM-101, AC-DM-102 |
| Field types (§14.9.3) | AC-DM-103 |
| The four wage bases (§14.4.3a) | AC-DM-104, AC-DM-105 |
| Bitemporal query patterns (§14.6.1c) | AC-DM-107, AC-DM-108 |
| The artefact binding (§14.4.5a) | AC-DM-109, AC-DM-110 |
| Attendance storage layering (§14.4.7a) | AC-DM-111 |
| Data-principal request lifecycle (§14.7.3a) | AC-DM-112, AC-DM-113 |
| Enforcement timing (§14.9.4) | AC-DM-115 |
| `Jurisdiction` and jurisdiction readiness (§14.4.11a, §14.6.2b) | AC-DM-116, AC-DM-117, AC-DM-118 |
| Export, report and support surfaces (§14.5.4) | AC-DM-119, AC-DM-120 |
| The money-of-record boundary (§14.4.9a) | AC-DM-121 |
| Migration continuity (§14.4.10a) | AC-DM-122, AC-DM-123 |
| The parameter change protocol (§14.13.1) | AC-DM-124 |

Every criterion is falsifiable and maps to at least one entity above; a failing `AC-DM-nn` is, by construction, either a filing-rejection bug or a compliance exposure — which is why they live in the data-model section and not only in the test plan.

---

### 14.12 Conformance scenarios — the suite that proves the model

The `AC-DM-nn` criteria are the contract. Scenarios are how the contract is exercised: a fixture, an action, an observable outcome. They are written here rather than only in a test plan because several of them are the *reason* an entity has the shape it has, and a build team that reads the entity without the scenario will simplify the entity and break the scenario.

Every scenario below runs against one reference tenant — the §14.3.3 instantiation, tabulated in §14.12.1. It is deliberately small and deliberately awkward: every awkwardness in it corresponds to a defect this section exists to prevent.

#### 14.12.1 The fixture, as data

The scenarios are only repeatable against a defined fixture. This is that definition — small enough to load in a test, awkward enough to exercise every constraint the section asserts.

| Fixture row | Definition | Which constraints it exercises |
| --- | --- | --- |
| `T-1` | One tenant, one group, one legal entity with one PAN and one TAN | D5, RI1, RI5 |
| `E-PUNE` | Establishment owning the EPF code, the ESIC code and the Maharashtra PTRC | §14.4.1, T4 |
| `E-BLR` | Establishment owning the Karnataka PTRC; covered for EPF by `E-PUNE`'s code through a `RegistrationCoverage` row | RI24, the coverage-versus-ownership split |
| `WL-ASSAM` | A work location in a state where the entity holds no registration | T2, E5, RR5 |
| `EMP-1` | Monthly gross ₹18,000, Bengaluru, all identifiers clean | The ordinary path: ESI ₹135 employee, ₹585 employer; KA PT nil below ₹25,000 |
| `EMP-2` | The ₹9,00,000 CTC structure of §14.4.3a | The four-base fan-out; PF ₹1,800 / ₹1,250 / ₹550 / ₹75 at the ceiling; above the ESI ceiling |
| `EMP-3` | UAN at `seeding_status = pending` | Exclude-and-flag, the Supplementary return path |
| `EMP-4` | `iw_flag = true`, with a Certificate of Coverage for part of the year | E4, the `epf.iw_wage_basis` warn-only path |
| `EMP-5` | No Aadhaar provided, no biometric enrolment | Aadhaar-optional invariants; the non-biometric attendance path |
| `EMP-6` | A March leaver with a rehire six months earlier in the history | FnF, the `ServiceRecord` break decision, the erasure request |
| `EMP-7` | Bank verification failed | Disbursal-blocking without month-blocking (AC-DM-95) |
| `REG-KA-PT` | A `pt_slab` row for Karnataka per §14.6.2a | P1, P3, P6; the ₹200 / ₹300 / ₹2,500 arithmetic |
| `REG-XX-PT` | A PT-levying state with **no** slab row loaded | RR5; unconfigured rather than zero |
| `RULE-A/B` | The `addback_percent` rows of §14.6.4 | The corrigendum replay |
| `RULE-V1..V4` | The four versions of §14.6.4a, including one staged and one rolled back | The full replay grid |
| `DEV-1..3` | Three attendance terminals, one of which is later attested lost | The two-phase erasure and `closed-by-attestation` |

Two fixture rules. **No fixture row carries a figure this PRD has not established** — every rupee value above traces to §06 or to a worked example in this section. And **the fixture is loaded through the product's own write paths**, not by direct inserts, so that a constraint the write path enforces is exercised by the loading itself; a fixture that can only be loaded by bypassing the schema is evidence that the schema is not enforcing what this section claims.

#### 14.12.2 Detailed scenarios

**TS-DM-01 · A transfer splits four ranges and moves two filings**
*Setup:* the Bengaluru salesperson of §14.3.1's worked example, transferring to Pune on 16 September.
*Action:* record the transfer; run September to `LOCKED`.
*Expected:* `EstablishmentMapping` and `WorkLocationAssignment` each split at 16 September with no gap or overlap; PT resolves per sub-period against the Karnataka row for 1–15 September and the Maharashtra row from 16 September; the month is flagged straddled for operator review and no part-month split is guessed; the EPF line stays in the single ECR under the Pune code; the `ServiceRecord` is untouched.
*Exercises:* AC-DM-47, AC-DM-21, T7.

**TS-DM-02 · An org-only move changes nothing statutory**
*Setup:* any employee.
*Action:* change department and manager, effective mid-period.
*Expected:* zero change to the filing fan-out, zero `EligibilityState` writes, zero rule-resolution input changes, and a byte-identical set of generated artefacts.
*Exercises:* AC-DM-46. This scenario fails on any schema that folds the five assignments into one row.

**TS-DM-03 · A closed establishment refuses a mapping**
*Setup:* Bengaluru closed 31 March.
*Action:* write an `EstablishmentMapping` starting 1 April.
*Expected:* refused with the conflicting range; no filing instance for April or later exists against that establishment's registrations; every due period up to 31 March still appears in the ledger.
*Exercises:* AC-DM-37, AC-DM-39.

**TS-DM-04 · The ESI boundary, three months of contributions**
*Setup:* the ₹18,000 employee, revised to ₹22,000 from 12 July.
*Action:* run July, August, September, October.
*Expected:* contributions on actual gross of ₹22,000 in July, August and September — employee ₹165.00, employer ₹715.00 each month — and coverage ending 1 October, with exactly two `EligibilityState` rows.
*Exercises:* AC-DM-05, AC-DM-74.

**TS-DM-05 · An unseeded UAN excludes one line and pays the employee**
*Setup:* one member at `seeding_status = pending`.
*Action:* run the month and generate the ECR.
*Expected:* the member is paid in the same run; the member's line is absent from the Regular return; an `ExceptionRow` with the taxonomy code, the owner task and the employee notice exists; once seeded, a Supplementary return is prepared from the **same locked snapshot**, linked by `corrects_filing_id`, with the portal-calculated s.7Q interest shown.
*Exercises:* AC-DM-12, AC-DM-80, EV-037, EV-039.

**TS-DM-06 · A corrigendum, two answers, one store**
*Setup:* the §14.6.4 rows — 50% recorded in April, 47% recorded in September as a corrigendum.
*Action:* read the March filing as-known-in-April; execute a September retro run for March.
*Expected:* the April read returns 50% citing Row A; the retro returns 47% citing Row B; the original March artefact is byte-identical; the delta routes only to a path the EV-037 guards permit, and a paid March ECR routes to the fenced arrear flow rather than a Revised return.
*Exercises:* AC-DM-22, AC-DM-09.

**TS-DM-07 · The full replay grid**
*Setup:* the four versions of §14.6.4a.
*Action:* walk every (business period × knowledge time) cell for two tenants, one in the canary cohort.
*Expected:* every cell single-valued; the May-2026 column returns V1 throughout; the 10-June-2026 cell for February 2026 returns the rolled-back V4; the staged V3 appears only for the canary tenant, with `publish_state` on the lineage.
*Exercises:* AC-DM-82, AC-DM-42, AC-DM-45.

**TS-DM-08 · Punches erased, payroll unchanged**
*Setup:* a LOCKED, filed month.
*Action:* erase the month's punches under their retention class; replay the month; read the attendance view; recompute the `ServiceRecord`.
*Expected:* every payroll figure reproduces byte-identically from the snapshot; the attendance view returns the lock-time Form IX rows flagged `source-erased`; the service record's counted days are unchanged.
*Exercises:* AC-DM-34, AC-DM-41, AC-DM-10.

**TS-DM-09 · A subject key destroyed, then a backup restored**
*Setup:* a leaver past every applicable floor.
*Action:* execute the erasure; then restore a backup taken before it and query every copy in the inventory.
*Expected:* ciphertext, tombstones and surrogate-keyed figures only; no restore path recovers the key; a readable personal field is a release-blocking defect.
*Exercises:* AC-DM-35, AC-DM-72, F4.

**TS-DM-10 · One leaver, three record shapes, one reasoned response**
*Setup:* the March leaver requesting erasure in June.
*Action:* run the deletion engine.
*Expected:* single-subject records past their floors erased by subject-key shred; the multi-subject register instance retained with its class, clock anchor and erasable date or "under confirmation"; the vault entry and template already erased with their audit references; one response enumerating all three.
*Exercises:* AC-DM-23, AC-DM-55, AC-DM-50.

**TS-DM-11 · A litigation hold beats an elapsed floor**
*Setup:* a wage register instance at its floor, with an open ESI dispute for the period.
*Action:* place a `RetentionHold` scoped to (establishment, period); run the sweep; release the hold; run the sweep again.
*Expected:* first sweep retains and logs the hold as the basis; second sweep proceeds only because the floor had already elapsed; a hold placed *between* decision and execution stops the execution.
*Exercises:* AC-DM-24, AC-DM-71.

**TS-DM-12 · A state with no slab row produces no deduction**
*Setup:* the Assam remote engineer.
*Action:* run the month.
*Expected:* PT resolves as `unconfigured`; the readiness report names the state and the affected employment; the payslip carries no PT line; no neighbouring state's table is consulted; the liability, where the tenant's remote-PT policy creates one, appears as `registration_pending` rather than as a zero line.
*Exercises:* AC-DM-64, AC-DM-38, AC-DM-03.

**TS-DM-13 · A back-dated registration re-points three months**
*Setup:* a PTRC allotted in September with effect from 1 June, with June to August previously at `pending_registration`.
*Action:* record the registration.
*Expected:* June to August appear as due obligations in the ledger; held liabilities re-point to the registration; no filed artefact for those months changes; the correction route offered is one the guards permit.
*Exercises:* AC-DM-76, T6, E6.

**TS-DM-14 · An Aadhaar the employee never gave**
*Setup:* an employee who declines to provide an Aadhaar number.
*Action:* run payroll, generate the ECR, render the statutory registers, run an erasure request, and inspect every export and model payload.
*Expected:* nothing blocks; the ECR keys on UAN; the register renders the Aadhaar field empty per §06's render rule rather than blocking the register; no business row, log, export or payload contains an Aadhaar number or a hash of one; the employee's `vault_state` is `none`, which is a normal state and not an exception.
*Exercises:* AC-DM-31, invariant 5 of §14.4.15, Part D-10.

#### 14.12.3 Scenario matrix

The remaining scenarios, each one line, grouped by what they defend. **P** is a positive case, **N** a negative case that must fail loudly, **E** an edge case.

| ID | Class | Scenario | Expected outcome | Exercises |
| --- | --- | --- | --- | --- |
| TS-DM-15 | N | Cross-tenant read attempted through the API, the MCP tool surface and a migration importer | Structurally impossible on every path, not filtered | AC-DM-01 |
| TS-DM-16 | N | Approve a run as its own maker | Refused and audited; role stacking needs a logged override | AC-DM-29 |
| TS-DM-17 | P | CA console opens two assigned clients | Read-only on money-of-record; scoped to the assigned tenants only | AC-DM-30 |
| TS-DM-18 | E | Excluded heads exceed one-half of total remuneration | Add-back computed as `excluded − addback_percent × total_remuneration`, stamped with the rule version | AC-DM-07 |
| TS-DM-19 | P | Structure with a percent-of-CTC and a balance-figure component | Balance resolves last; components sum to CTC to the paisa | AC-DM-08 |
| TS-DM-20 | E | Balance figure feeds the add-back test that re-bases it | Bounded fixed-point node converges within its iteration cap and tolerance | §08 I7; AC-DM-08 |
| TS-DM-21 | N | Write a `wage` column | No such column exists | §14.4.13 |
| TS-DM-22 | N | Store a PF Member ID on `Person` | No such column exists | RI4 |
| TS-DM-23 | N | Two PTRC rows active for one state on one date | Refused at write time | RI6, T4 |
| TS-DM-24 | N | Reuse a (scheme, number) pair across owners in one tenant | Refused; the error names no other tenant | RI7, AC-DM-86 |
| TS-DM-25 | P | Rehire under an existing `employee_id` | New `Employment`, new PF Member ID, unchanged person-level UAN and ESI IP | AC-DM-06 |
| TS-DM-26 | E | Employee declares a second UAN | Both recorded; one `active_for_filing`; `MULTIPLE_UAN_DECLARED` raised; none generated, merged or retired | §14.3 |
| TS-DM-27 | E | International worker with a Certificate of Coverage | Contribution suspended for the certificate's window only; the row reverts at window end | E4 |
| TS-DM-28 | N | Apply an uncapped IW basis while `epf.iw_wage_basis` is unconfirmed | Warn-only; no uncapped contribution applied | RO5, §06.2 |
| TS-DM-29 | P | Ten employees on one day, then eight | Gratuity and maternity stay armed; de-arming needs an audited action with a basis | AC-DM-04, E7, E8 |
| TS-DM-30 | E | A threshold row with no `counting_unit` | Refused at payload validation | AC-DM-63, P7 |
| TS-DM-31 | N | Publish a `[Hypothesis]` rule with `enforce` | Refused | AC-DM-44, P9 |
| TS-DM-32 | N | Edit a published rule version | Refused; routed to a new version | AC-DM-43, RO2 |
| TS-DM-33 | N | A rule version whose author equals its reviewer past IN_REVIEW | Unstorable | AC-DM-43, RI21 |
| TS-DM-34 | E | A `pt_slab` payload whose rows do not sum to its stated annual total | Refused with both figures shown | AC-DM-62, P6 |
| TS-DM-35 | E | A `pt_slab` payload with a band gap | Refused with the uncovered range named | AC-DM-62, P1 |
| TS-DM-36 | P | Karnataka PT at ₹25,000 or above across a full year | ₹200 for eleven months and ₹300 in February, totalling ₹2,500 | §06.4; P3, P6 |
| TS-DM-37 | N | Resolve a state row for a Central-only `rule_type` | Data defect; refused rather than preferred | RR4 |
| TS-DM-38 | N | Two current versions of one `rule_key` with overlapping ranges | Impossible by RO4; resolution fails loudly if encountered | RR9 |
| TS-DM-39 | E | A gap in the work-location assignment inside a period | Blocking validation naming the dates; no jurisdiction inferred from HQ or address | AC-DM-66, RR14 |
| TS-DM-40 | P | Two result versions differing only in the day-status part | Every changed figure attributable to that part hash | AC-DM-53 |
| TS-DM-41 | N | Reopen edits a snapshot version in place | Refused; a new version is written and the prior kept | N16 |
| TS-DM-42 | N | A snapshot part stores punch rows | Build-time schema test fails | N15, AC-313.6 |
| TS-DM-43 | N | Erase a snapshot while its filing is retained | Refused by the derived floor | AC-DM-68, RC1 |
| TS-DM-44 | P | NIL EPF month with no active members | Ledger row `nil_with_evidence` carrying the Direct Challan Entry receipt; no return file | AC-DM-13, N33 |
| TS-DM-45 | N | A due ledger row closed by the passage of time | Becomes `missed`, a visible status; never an absence | N32, AC-DM-78 |
| TS-DM-46 | E | A Regular ECR for month M with month M−4 unfiled | The blocking month is named before generation | AC-DM-79, EV-038 |
| TS-DM-47 | E | A challan fails after its return is accepted | Reconciliation exception linking Filing and Challan; the period is not marked compliant | AC-DM-14 |
| TS-DM-48 | P | A device re-POSTs a punch it already sent | Deduplicated on the natural key plus payload hash | AC-DM-28 |
| TS-DM-49 | P | Three terminals, one exit, one lost device | Key destroyed; two `erased-confirmed`; one `closed-by-attestation` with the attester; every punch and Form IX row readable | AC-DM-32, AC-DM-51 |
| TS-DM-50 | N | A punch row carrying a template reference | No such column exists | RI17, N14 |
| TS-DM-51 | N | An import maps a source "consent given" boolean to a `ConsentRecord` | Refused; consent is never backfilled | N12, invariant 4 |
| TS-DM-52 | P | An SPDI-regime consent read after the DPDP commencement | Unchanged and still resolvable; any DPDP-regime record is a new record alongside it | AC-DM-33 |
| TS-DM-53 | N | A feature collects a data class not named in the subject's consent version | Collection refused until a new version is captured; the old version is not amended | AC-DM-52 |
| TS-DM-54 | N | An untagged new column ships | Build fails; the field is default-denied at egress meanwhile | AC-DM-59, CL4 |
| TS-DM-55 | N | A default-deny field reaches an outbound model payload | Tokenised or blocked at the chokepoint; no setting disables the default-deny list | AC-DM-60 |
| TS-DM-56 | N | A support tool offers to reveal a full C1 value | No such path for the role; refused and logged | AC-DM-89 |
| TS-DM-57 | P | An entitled role reveals one C1 value | A discrete audited event with a reason; no session-wide widening | AC-DM-90 |
| TS-DM-58 | E | An anonymised output for a twenty-person tenant fails the group-size test | Falls through to erasure; the failed test is the recorded reason | AC-DM-84 |
| TS-DM-59 | N | An anonymised table published while `anon.min_group_size` is unset | No output leaves the tenant boundary | AC-DM-83 |
| TS-DM-60 | E | A retention parameter published shorter than its predecessor | An impact list of newly-erasable objects produced and recorded before any sweep acts | AC-DM-70 |
| TS-DM-61 | N | A sweep against a class whose floor is unset | Nothing erased; "floor under confirmation" reported with the owner | AC-DM-69 |
| TS-DM-62 | E | An evidence artefact whose bytes no longer match its hash | Integrity incident; never silently regenerated | AC-DM-87 |
| TS-DM-63 | E | A payslip re-render whose template version is no longer available | The tombstone is returned rather than a render from a different template | AC-DM-88 |
| TS-DM-64 | P | A mid-year migration with YTD TDS already deducted | Annual liability reduced by the opening figure and spread over remaining months | AC-DM-18 |
| TS-DM-65 | N | A migration mints a new UAN for an employee who has one | Release-blocking migration defect | AC-DM-19 |
| TS-DM-66 | N | A correction DPR against a PAN takes a privileged side-door | Refused; it flows through the same maker-checker audited path and re-validates pending filings | AC-DM-25 |
| TS-DM-67 | E | An undecided break in an employment history | `ServiceRecord` ends in `derivation_blocked`; no clock start published | AC-DM-57 |
| TS-DM-68 | N | A direct write to `ServiceRecord.counted_days` | Refused; the record is derived only | N19, T8 |
| TS-DM-69 | P | A tenant with an India-only residency configuration | Every copy — replica, index, cache, analytics store, LLM log — placed in an India region; a placement outside is refused | AC-DM-93 |
| TS-DM-70 | N | A copy type not on the inventory list | Build fails | AC-DM-92, CI1 |
| TS-DM-71 | E | A second UAN declared after a return has been filed on the first | Both recorded; the active one is unchanged for filed periods; `MULTIPLE_UAN_DECLARED` raised | U6 |
| TS-DM-72 | N | An identifier state change that blocks the month's `LOCKED` transition | Only bank verification blocks, and only that employee's disbursal | AC-DM-95 |
| TS-DM-73 | E | PAN stated as unavailable while `no_pan_tds_floor` is unset | The gap is surfaced as an exception naming the parameter; no rate is invented | AC-DM-96 |
| TS-DM-74 | E | A TDS challan paid before its quarterly return exists | Normal; the challan is quoted inside the return; no ordering is assumed | §14.4.6a |
| TS-DM-75 | N | A `failed` challan after an `ACCEPTED` return leaves the period compliant | Compliance is withdrawn and a reconciliation exception is raised; no automatic re-filing | AC-DM-97 |
| TS-DM-76 | N | A downward ECR correction after payment initiation | Revised route unavailable by guard, with the reason named | AC-DM-98 |
| TS-DM-77 | E | A work location in a state that levies PT at local-body level, where the body cannot be resolved | `unconfigured`, surfaced; no state row substituted | AC-DM-116 |
| TS-DM-78 | E | Two Codes commencing on different dates in one state | Each rule type resolves against its own Code's date; the lineage records which | AC-DM-117 |
| TS-DM-79 | P | Jurisdiction readiness queried per state and scheme | One of the five states returned, with missing row types named | AC-DM-118 |
| TS-DM-80 | E | An effective date of 1 October compared with a stored instant at a region boundary | The same answer in every region; no time-zone-dependent truncation | AC-DM-100 |
| TS-DM-81 | P | An arrears batch approved in September for a March wage month | PF liability dates from the arrears disbursal date, visible at approval | AC-DM-101 |
| TS-DM-82 | P | A search for "24Q", "Form 138", "Form 16", "Form 130", "Financial Year 2026-27" and "Tax Year 2026-27" | Each resolves to the same form or period; the stored identifier is the six-digit form | AC-DM-102 |
| TS-DM-83 | N | A money field represented as a floating-point value anywhere | Build fails | AC-DM-103 |
| TS-DM-84 | P | The four-base fan-out for the ₹9,00,000 structure | ₹60,900 / ₹75,000 / ₹60,900 / ₹75,000, each rule-stamped; the ESI base stored though uncovered | AC-DM-104 |
| TS-DM-85 | N | EPS computed as a percentage of an uncapped actual-wages basis | Release-blocking defect; EPS wage caps at ₹15,000 independently | AC-DM-105 |
| TS-DM-86 | P | A revision effective from a locked period | Locked artefacts byte-identical; the delta exists only as arrears rows | AC-DM-106 |
| TS-DM-87 | P | Q2 and Q3 evaluated over the same filed artefact | Identical rule versions; a divergence names lineage or resolution | AC-DM-107 |
| TS-DM-88 | N | A what-if projection that persists a figure or emits an artefact | Refused; only a correction run may persist a difference | AC-DM-108 |
| TS-DM-89 | P | An artefact regenerated from its five bindings | Bytes hash to the stored `artefact_sha256` | AC-DM-109 |
| TS-DM-90 | N | A mixed RPU and FVU pairing for a period | Refused at generation, not discovered at upload | AC-DM-110 |
| TS-DM-91 | E | A dispute raised after the period's punches passed their ceiling | Form IX rows and frozen counts identified as the surviving records; a hold stops further erasure | AC-DM-111 |
| TS-DM-92 | N | Identity verification for a request that asks for new sensitive data | Refused; the request is `rejected_unverified` with the remedy stated | AC-DM-112 |
| TS-DM-93 | P | A responded request disputed and reopened | New evaluation; the prior response retained unchanged | AC-DM-113 |
| TS-DM-94 | P | The cardinality conformance check over the fixture | Every CN invariant holds; a failure names entity, tenant and rows | AC-DM-114 |
| TS-DM-95 | N | A check firing at generation that the timing table places at write time | Defect, even though the artefact is correct | AC-DM-115 |
| TS-DM-96 | N | An ad-hoc export composed per request rather than from a declaration | Refused; a new column is a reviewed change to the declaration | AC-DM-119 |
| TS-DM-97 | N | A support bundle widened at runtime during an incident | Refused; widening is a reviewed declaration change, and the segregated stores stay unreachable | AC-DM-120 |
| TS-DM-98 | N | A wallet or endorsement row that alters a filed figure | Refused; the effect lands only as a labelled input to a future period | AC-DM-121 |
| TS-DM-99 | N | An importer that mints a UAN, resets a gratuity clock or synthesises a consent to finish on time | Each refused in the importer's own write path; the fixture load exercises the same path | AC-DM-122, MG1–MG4 |
| TS-DM-100 | N | A parameter value set through a configuration file rather than the rule write path | Release-blocking defect; no author, no reviewer, no impact list, no replay | AC-DM-124 |
| TS-DM-101 | N | A `PayComponent` set collapsed to a single statutory boolean | The ECR's Gross Wages and EPF Wages fields cannot both be produced; refused at the schema | §14.9.5 |
| TS-DM-102 | E | A register instance reopened by a late entry after it was closed | The clock resets from the new date of last entry; anything already erasable is re-evaluated | §14.7.4, RC2 |
| TS-DM-103 | N | A filing instance created for a period outside its registration's validity range | Refused; the ledger still carries every due period up to `valid_to` | T5, RI14 |
| TS-DM-104 | E | A Certificate of Coverage expiring mid-period for an international worker | Contribution resumes from the window's end with two `EligibilityState` rows; no manual re-enablement | E4, TS-DM-27 |

#### 14.12.4 What the suite does not cover

Three things are deliberately out of scope here, and naming them prevents a false sense of coverage.

- **Portal behaviour.** Whether a portal treats a corrected resubmission as on-time is not established in this PRD's evidence and is not asserted by any scenario (AC-DM-12); §20 owns finding out.
- **Fenced generators.** No scenario exercises the Form 138 Q4 generator or Form 130 Part B, because the formats are not released (EV-046); a scenario against an unpublished format would be a fiction that passes.
- **State-sphere periods and slabs.** No scenario asserts a state retention period or a state PT slab this PRD has not gazette-sourced. The scenarios assert the *behaviour when the value is absent* — unconfigured, blocked, flagged — which is the part the model owes.

#### 14.12.5 How the suite is run, and what a failure means

| Property | Specification |
| --- | --- |
| **Where it runs** | In the build, against the fixture loaded through the product's own write paths (§14.12.1), not against direct inserts |
| **What blocks a release** | Any failing `AC-DM-nn`, any failing CN cardinality invariant, any failing RI constraint, and any build-time classification, retention-class or copy-inventory test |
| **What blocks a rule publish** | The payload P-rules, the citation and corrigendum-check completeness, and `reviewer ≠ author` (§14.9.4) |
| **What is a defect even when the output is right** | A check firing later than the enforcement-timing table places it (AC-DM-115); a figure that reproduces but whose Q2 and Q3 answers diverge (AC-DM-107) |
| **What is an incident rather than a test failure** | An artefact whose bytes no longer match its stored hash (AC-DM-87); a restored backup that resurrects readable personal data (F4) |

The distinction in the last two rows is the one that matters operationally. A test failure is a bug found before release. An artefact-hash mismatch or a resurrected key is evidence that something already went wrong in production, and the response is an incident with the six-hour CERT-In clock in view (EV-062), not a ticket.

---

### 14.13 Named parameters this section owns or depends on

Every value this section needs but cannot source is a named parameter with an owner and a route, per the standing rule that an unsourced number is never written as a figure. This is the consolidated register; §20 carries the validation work and §23 the counsel items.

| Parameter | What it governs | Owner | Behaviour while unset | Route |
| --- | --- | --- | --- | --- |
| `retention.tax_tds` | The TDS-evidence retention floor | Counsel | Erasure blocked for the class; unresolved-retention flag | §20 desk work, §23 register |
| `retention.books` | Payroll records forming part of the books of account | Counsel | As above | §20, §23 |
| `retention.gratuity_tail` | `ServiceRecord` and gratuity records after exit | Counsel | As above | §20, §23 |
| `retention.ir_records` | IR Rules records, where no period is set (EV-054) | Counsel | As above | §20, §23 |
| `retention.epf_esi_extension` | Any extension beyond SS r.53(1)(e) for EPF and ESI records | Counsel | The SS floor applies; no extension assumed | §23 |
| `retention.consent_evidence` | Consent and data-principal-request evidence | Counsel | Erasure blocked | §20, §23 |
| `retention.dpdp_r8_3` | The DPDP r.8(3) processing-log period from on or about 13 May 2027 | Counsel | Neither purge nor one-year suppression hard-coded | §23 (Part D-9) |
| `retention.state.<state>.<register>` | Each state-sphere register period | Counsel, per state | Erasure blocked for that state's instances | §20's per-state work |
| `retention.amendment_restarts_clock` | Whether an appended amendment restarts a register instance's clock | Counsel | The later reading applies | §23 |
| `retention.calendar_years_reading` | Whether "five calendar years" and "five years" read identically (EV-054) | Counsel | The longer reading applies | §23 |
| `retention.punch_ceiling` | The tenant's punch-retention ceiling | Tenant, within a product maximum | The product maximum; any open dispute floors it | §20 |
| `retention.document_ceiling` | The tenant's general document ceiling | Tenant | As above | §20 |
| `anon.min_group_size` | The minimum group size for any anonymised output | Privacy function | No anonymised output leaves the tenant boundary | §20 |
| `id_format.pan`, `.tan`, `.aadhaar`, `.uan`, `.esi_ip`, `.ifsc`, `.epf_code`, `.esic_code`, `.gstin`, `.pran` | The write-time masks and checksums | Compliance engineering | The carried mask applies, marked **[Hypothesis — carried]** | §20 desk verification before GA (§07.1.1) |
| `pt.<state>.slabs` | Each state's PT slab table | Statutory desk, per state | No rule row; the obligation shows unconfigured (RR5) | §20's gazette sourcing |
| `pt.<state>.filing_frequency` | Each state's PT return frequency and due day | Statutory desk | Calendar shows the obligation, `warn_only`, never blocking | §20 |
| `lwf.<state>.*` | Levy, shares, periodicity and due months per state | Statutory desk | As above; an explicit "no levy" row is distinct from an unset one (RR6) | §20 |
| `epf.admin_charge`, `epf.admin_charge.minimum` | Administrative charge rate and the per-establishment minimum | Statutory desk | Unconfirmed line on the readiness report, never a deduction the product asserts | §06.2, §20 |
| `epf.iw_wage_basis` | The international-worker PF basis | Statutory desk, with counsel on the litigation position | Warn-only; no uncapped contribution applied | §06.13, §20 |
| `gratuity.payable_ceiling` | The amount notified under CoSS s.53(3) | Statutory desk | No ceiling applied; the figure is not asserted | §06.6, §20 |
| `gratuity.four_years_240_days_rule` | The eligibility-test reading | Statutory desk | **[Hypothesis]**, warn-only | §07 FR-CHR-016 |
| `tax.gratuity_exemption_ceiling` | The lifetime tax-exemption ceiling — a **separate field** from the payable ceiling | Statutory desk | Not asserted | §06.6 |
| `ot_quarterly_ceiling_hours` | The quarterly overtime ceiling | Statutory desk | Advisory warning only; never blocks a punch, roster, approval, run or filing (K-04) | §20 |
| `no_pan_tds_floor` | The higher-rate TDS floor where PAN is unavailable | Statutory desk | No shipped default; the 2025-Act mapping is pending | §07.1.1, §06.13 |
| `tds.standard_deduction.<regime>` | The standard deduction per regime | Statutory desk | Not asserted; §06.5's figures are a worked base | §06.5 |
| `rule.plausibility_delta` | The change size that forces a reviewer note | Statutory desk lead | A reviewer note is required on every change until set | §22 |

**Two rules about parameters, so the register does not become a pile of TODOs.**

1. **An unset parameter has a specified behaviour, always.** Every row above names it. A parameter whose unset behaviour is "undefined" is not a parameter; it is a missing decision, and it blocks release rather than shipping.
2. **A parameter is never quietly promoted to a figure.** A value arrives through the rule object's write path with its sign-off, its citation and its reviewer (§14.7.5), which means it is versioned, replayable and attributable — the same discipline as any other rule.

#### 14.13.1 The parameter change protocol

A parameter is a rule row with a narrower payload, so it changes the way a rule changes — and the consequences are the same consequences. Setting one out of band, through a configuration file or an admin toggle, breaks three properties at once.

| Step | What happens | Why it is not optional |
| --- | --- | --- |
| 1 · Authoring | A new parameter version is drafted with its value, its sign-off or citation reference, its capture date and its author | A value with no basis is indistinguishable from a guess six months later |
| 2 · Review | A reviewer who is not the author signs it (RI21) | The same reason a rate needs two people: it moves money or it moves a deletion date |
| 3 · Impact | The publish computes what the change touches — tenants, registrations, employments, periods, and for a retention parameter every object whose erasability changes (§14.7.5) | A shortened retention floor is the one change that destroys data, and it must never take effect through a background job alone |
| 4 · Staging | Where the parameter drives a computation, it may stage to a canary cohort before general publication (RO1) | A wrong slab or mask reaching every tenant at once is the failure mode the canary exists for |
| 5 · Publication | `recorded_at` is set; the prior version's `superseded_at` is written; nothing else is ever written to either | RO2 |
| 6 · Replay | Every figure computed under the prior version still resolves to it at its own knowledge time (RO3) | "What did we believe the floor was in March 2027" must stay answerable |

**Two behaviours that follow directly.** A parameter moving from unset to set is a **publication with an impact list**, not a quiet fix — which is what turns "counsel answered the retention question" into a reviewable event. And a parameter that drives `enforcement_mode` cannot be raised to `enforce` while its evidence status is `[Hypothesis]` (RO5, P9), so a value arriving without its citation changes the number the product shows and not what it blocks.

**AC-DM-124** — *Given* any parameter change, *When* it is published, *Then* it goes through the rule object's write path with an author, a distinct reviewer, a recorded basis and an impact list; a parameter set through any other path is a release-blocking defect.

---

### 14.14 Data-model risks

Schema risks specific to this section, with what each would cost and what reduces it. §20 carries the validation items; this is the model's own exposure.

| # | Risk | What it would cost | What reduces it |
| --- | --- | --- | --- |
| DM-R1 | A carried `id_format` mask is wrong for a real issuer format | Write-time rejections of valid values, or filing-day rejections of invalid ones; either way a support load concentrated at the worst moment | Every mask is a rule version, so a correction is a data load; desk verification before GA is build-blocking (§14.9) |
| DM-R2 | A counsel-set retention floor arrives **shorter** than the product assumed | Data retained past a ceiling; an erasure duty unmet for a period | Unset floors block erasure rather than defaulting, and a shortened floor publishes with an impact list (AC-DM-70) |
| DM-R3 | A counsel-set floor arrives **longer** than assumed | Storage cost, and objects erased before the true floor — the irreversible direction | Nothing is erased while a floor is unset; the longer of overlapping floors always wins (§14.7.1) |
| DM-R4 | A state's part-period treatment turns out to require a split the model flagged rather than performed | Rework in the filing fan-out for straddled periods | T7 flags rather than guesses, so the change is additive: a rule row plus a resolution branch, not a schema migration (§14.10 item 12) |
| DM-R5 | A `payload_schema_version` needs a breaking change after rows exist | Every existing row of that `rule_type` needs migration, and replay must still resolve the old shape | Payload schemas are versioned per row, so old rows resolve under their own schema version; a breaking change is additive, never in-place |
| DM-R6 | The ESI regime after the on-or-about 21 November 2026 date differs structurally, not just numerically | Rule rows may not express the successor's shape | Rows after the date are fenced rather than extrapolated (§06.9); a structural change surfaces as a new `rule_type`, which is a data addition |
| DM-R7 | Crypto-shredding is defeated by a copy nobody enumerated | An erasure claimed and not delivered — the most damaging failure in the section | The copy inventory is a closed set with a build test, and the erasure verification samples every copy type including a restored backup (CI1, F4, F5) |
| DM-R8 | A multi-subject record makes a subject's erasure impossible for years | A reasoned response that reads as a refusal | Period-scoping gives every instance a determinable clock; the response states the anchor and the date rather than declining (§14.4.18) |
| DM-R9 | The model's bitemporal discipline is eroded by one "just update the row" shortcut under delivery pressure | Replay stops being trustworthy, which is the product's whole audit defence | RO2 and RI20 are data constraints, not conventions; a published version is physically unwritable except for `superseded_at` |
| DM-R10 | The rule store's `[Hypothesis]` population grows faster than it is verified | A product computing more and more of its customers' payroll against unverified rules, without anyone noticing | The warn-only count is a first-class query (§14.6.6) and a §19 metric, so the drift is visible rather than discovered |
| DM-R11 | An importer bypasses a write-path constraint to finish a migration on time | A customer's history enters the model with a forked identifier or a reset gratuity clock, discovered years later | MG1–MG8 are enforced in the importer's own write path, and the fixture is loaded through product write paths so a bypass is itself a test failure (§14.12.1) |
| DM-R12 | A support or export surface is widened under incident pressure | An unreviewed disclosure with a filename | Surfaces declare their contents and are versioned; widening is a reviewed change, and the segregated stores stay unreachable regardless (EX1, AC-DM-120) |
| DM-R13 | The local-body PT case arrives before the work location carries enough address structure to resolve it | An obligation that cannot be keyed, in a state the customer has already opened an office in | The jurisdiction entity already descends below the state; the gap is resolution, not schema, and the unresolved case is `unconfigured` rather than wrong (§14.4.11a, §14.10 item 16) |

---

### 14.15 What this section decides, fences and routes

| Decided here | |
| --- | --- |
| The six-level statutory hierarchy with nesting, coverage and closure constraints (T1–T8) | §14.3.1 |
| Five separate assignment bindings, split closed-open, with a specified behaviour per period state | §14.3.2 |
| Bitemporality scoped to three entity classes, with two erasure mechanisms and a stated replay result | §14.6.1a |
| The rule object's complete schema, its six invariants and a typed payload schema per `rule_type` | §14.6.1b, §14.6.2a |
| Resolution as a deterministic algorithm with a closed decision table and three ambiguity rules | §14.6.3, §14.6.3a |
| Aadhaar, biometric and consent data in segregated stores with four independent key roots | §14.4.15, §14.4.16 |
| Retention as a per-object class assignment with floors, ceilings, holds and a precedence algorithm | §14.7.1, §14.7.4, §14.7.5 |
| Classification at field level, travelling with every copy, enforced at a single egress chokepoint | §14.5.2, §14.8.1 |
| The filing ledger as a completeness constraint — one row per registration, obligation and period, created at period open | §14.4.22 |
| Erasure by two mechanisms, chosen by whether the record is about one subject or many | §14.4.18, §14.7.6 |
| The copy inventory as a closed, testable set, so "where does this field exist" is answerable without a survey | §14.8.1 |
| Enforcement timing per check family, so a check that fires late is a defect even when the output is right | §14.9.4 |
| Every unsourced value as a named parameter with an owner, an unset behaviour and a change protocol | §14.13, §14.13.1 |
| A conformance suite of 104 scenarios against one deliberately awkward fixture | §14.12 |

| Fenced here | Blocked on |
| --- | --- |
| The Form 138 Q4 generator and Form 130 Part B; `Filing.format_version` absorbs the format when it lands | The formats are not released (EV-046) |
| The ECR arrear file layout | No layout is published (EV-043) |
| ESI rule rows after on or about 21 November 2026 | No successor instrument located (§06.9) |
| Any state PT or LWF slab, and any state-sphere retention period | Gazette sourcing per state (§20); counsel per state (Part D-11) |

| Routed out of here | To |
| --- | --- |
| Every retention floor other than EV-054's central-sphere register figures | §23's counsel register (Part D-11) |
| Whether DPDP ss.11–12 reach employment processing under s.7(i) | §23 (Part D-1) |
| Whether a rendered register may carry a full Aadhaar number against the reg 6(5) ceiling | §23 (§14.10 item 3) |
| Every carried `id_format` mask | §20 desk verification before GA |
| `anon.min_group_size` and the tenant ceiling parameters | §20 |
| Physical schema, tenancy model, storage tiering and key management | §15, §17 |

---

### 14.16 What this model deliberately leaves to §15

This is a logical model. Four decisions that a reader may expect to find here are deliberately absent, and naming them prevents a build team from inventing an answer and calling it this section's.

| Left open | Why it is not decided here | Where it is decided |
| --- | --- | --- |
| **Physical keys and partitioning** — surrogate key type, partition strategy, index set | They follow from the access paths and the tenancy model, not from the entity shapes. The model's only physical requirement is that `tenant_id` leads every business row (D5, RI1) | §15 |
| **Pooled versus siloed tenancy** | A tenancy decision with a bureau and CA multi-client implication; this section only requires that the isolation boundary is the tenant and that a CA is a cross-tenant actor, never a container for other employers' entities (§14.3, AC-DM-30) | §15 |
| **Hot, warm and cold placement** | The volume shape in §14.4.14 is the input; the tiering decision is an architecture one, and it must respect the copy inventory's tags (§14.8.1) | §15 |
| **Key management mechanics** | This section fixes the four key roots, what each encrypts, and the property that a subject key lives outside the backed-up stores. How keys are stored, rotated and attested is an architecture and security question | §15, §17 |

Two things this section does **not** leave open, because leaving them open would make the model unimplementable in a way a later decision could not repair: the **entity-class temporal scoping** (§14.6.1a) and the **segregation of the Aadhaar, biometric and consent stores** (§14.4.15). Both are the kind of decision that cannot be retrofitted without a migration across every module and an audit of every query — which is the reason they are stated as invariants here rather than as preferences.

---

### 14.17 Reversals recorded in this section

The **[Reversed]** markers above are scattered through the text where each belongs. Collected here so a reader of v0.3 can see, in one place, what this revision retracts and what replaced it — and so that no reader carries a withdrawn design into a build.

| What v0.3 said | What replaces it | Where |
| --- | --- | --- |
| Every attribute is bitemporal; universal never-forget replay | Bitemporality scoped by entity class — B, R and E — with two erasure mechanisms and a stated replay result per class (K-24) | §14.6.1a |
| A CA-run tenant holds its clients' legal entities | Each client is its own tenant; the CA is a cross-tenant, read-only actor on money-of-record | §14.3 |
| A single `jurisdiction_id` on the establishment | Jurisdiction is read from the employment's work-location assignment for the period — state, sphere and Code-regime commencement (Part E-5) | §14.4.1 |
| Both PT certificates on the establishment | PTRC on the establishment, PTEC on the legal entity | §14.4.1 |
| An EPF establishment-code digit count stated as Verified | The mask is a versioned validation rule, desk-verified before GA | §14.4.1 |
| The Aadhaar number stored, encrypted and masked, on the identifier row | The number lives only in the `AadhaarTokenVault`; business rows hold an opaque token, never a hash (Part E-6) | §14.4.2, §14.4.15 |
| A masked Aadhaar retained as a "seeding key" on EPF records | EPF records key on UAN; the vault entry is deleted when its consented purpose is spent | §14.7.2 |
| The IW no-ceiling rule marked Verified | `epf.iw_wage_basis`, **[Hypothesis]**, warn-only while the litigation position is unresolved | §14.4.2 |
| The add-back worked example treating the special allowance as excluded, deriving a ₹12,500 add-back | The excluded heads are HRA and conveyance at ₹14,100, 18.8% of ₹75,000, so no add-back arises and the s.2(y) wage is ₹60,900 | §14.4.3, §14.4.3a |
| The EPF admin rate and a ₹500 minimum stated as Verified | `epf.admin_charge` and `epf.admin_charge.minimum`, **[Hypothesis]** | §14.4.3 |
| A ₹20 lakh gratuity cap stated as Verified | `gratuity.payable_ceiling`, with no located Code-era notification; a separate field from the tax-exemption ceiling | §14.4.4 |
| The payroll month as `draft → … → closed`, with approval as the point of no return | The Part E-1 machine, with the verification gate immediately before `PAYMENT_INITIATED` | §14.4.4 |
| A filing lifecycle with no `BLOCKED`, `SUPPLEMENTARY` or `PAYMENT_INITIATED`, allowing revision of any accepted return | The Part E-1 states with the EV-037 guards; a Revised return needs no payment initiated | §14.4.5 |
| Four consolidated registers with a flat five-year retention | Six employer registers plus a wage slip, one canonical set, each retained per its own rule-set's wording (EV-053, EV-054) | §14.4.5, §14.7.1 |
| The prescribed-format appointment letter as universal from 21 November 2025 | The duty attaches at an establishment of 10 or more workers, in a state-prescribed form (K-18) | §14.4.8 |
| Biometric template storage deferred to "final DPDP Rules"; DPDP pushing biometrics to the strictest class | No image column and no image bucket; the template in its own keyspace; DPDP has no sensitive category, and the SPDI Rules do (K-06) | §14.4.13, §14.5 |
| DPDP s.7(i) as current law, and as a structural advantage over GDPR-bound designs | s.7(i) is not in force until on or about 13 May 2027; SPDI r.5(1) written consent is the live duty (K-03) | §14.5, §14.4.12 |
| Income-tax, EPF, ESI, gratuity and Companies Act retention periods stated as figures | Named counsel-set parameters; only EV-054's central-sphere register figures are stated (Part D-11) | §14.7.1, §14.13 |
| The 144-hour quarterly overtime ceiling as Verified, with excess flagged as a statutory breach | `ot_quarterly_ceiling_hours`, **[Hypothesis]**, advisory only, never blocking (K-04) | §14.4.7 |
| Multi-state LWF parity with Frappe HR "across 14 states" | Frappe HR v16 has no LWF and no Indian state name in its source; TallyPrime has no LWF engine and no state PT slab table — a genuine differentiator (K-01) | §14.4.5, §14.6.2 |
| RBI's outsourcing directions applied with no turnover threshold; IRDAI mandating records in Indian data centres | RBI's obligations are materiality-gated entity by entity; IRDAI's 2023 guidelines impose no localisation, which exists only for policy records (K-22, K-08) | §14.8 |
| Every external-key mask marked Verified | Every mask is **[Hypothesis — carried]** until desk-verified against the issuer's specification | §14.9 |

The pattern across twenty-two reversals is worth naming, because it predicts where the next one will come from: **every single one was a case of a figure, a citation or a scope being stated more confidently than its source supported.** Not one was a modelling error. That is the argument for the evidence fields on the rule object — `evidence_status`, `capture_method`, `source_captured_at`, `last_corrigendum_check_at` — being part of the schema rather than part of a process document.
