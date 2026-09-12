## 03. Personas, Jobs-to-be-Done & User Segments

This section names the people who touch a filing-first HRMS in an Indian employer of 20–200, states what each is actually hired to get done, and ties every persona back to the product spine established in §01 and §05: **the statutory filing, not the payslip, is the unit of delivery.** Throughout this section "the filing" means a **portal-accepted artefact plus attended, assisted filing under the employer's written authority to act** — every statutory surface is an attended portal, the employer's and deductor's statutory liability is non-delegable, and no vendor in the six-vendor priced set claims to submit any filing (EV-030; operations in §22, legality of attended filing under counsel review in §23). The test applied throughout is Bob Moesta's: a persona earns its place only if there is a *job it hires the product to do* — a progress it is trying to make under a specific circumstance — not merely a screen it looks at.

Three disciplines carry over from the PRD's evidence register. First, most persona claims here are **[Hypothesis]** and carry a kill/validation criterion, because §20 records that *no CA, bureau, or Tally partner has been asked a single question* — the CA-as-channel assumption is the single most consequential unvalidated bet in the document, and this section is where it gets its sharpest edge and its kill lines. This section therefore treats the CA as a **channel persona only** — the route by which the product reaches employers — and not as a primary v1 design-target user; the console a CA would work in ships thin in v1 and is productised only after §20 V-05 clears (§05 item 20). Second, where a claim rests on notified statute (the headcount step function, the employer registers, the ECR file format, Form 138) it is marked **[Verified]** and carries an inline source cue back to §06's gazette citations or an EV-ID rather than re-deriving them. Third, per §02's standing rule, these personas were authored from the same generator that produced ~90 one-directional retractions, so their pains are more likely over-stated in the sympathetic direction (the buyer wants it more than reality) — every ARPU-shape or quote here is a design instrument, not evidence, until its §03.11 row clears.

**How to read this section.** The personas (§03.1–§03.7) state who acts and why; the specification a build team works from sits in five places.

| Where | What it specifies | Used by |
| --- | --- | --- |
| §03.1, actor map and role readiness | Which persona holds each gate of §08's and §22's machines, by band, and the five rules that keep four eyes when roles collapse | IAM (§07, §15), payroll (§08), operations (§22) |
| §03.1a, the work item | The object every hand-off in this section becomes — classes, fields, blocking classes, the routing rule, states, escalation, closure evidence and tests | Every build team; IAM (§07); operations (§22) |
| §03.2a, the joiner intake | What each of the nine artefacts gates, when it is first needed, how it is chased, and the intake either side of the consent switch | Core HR (§07), payroll (§08), legal wording (§23) |
| §03.2–§03.7, user stories | Stories with Given/When/Then acceptance criteria and a negative case each — the operator's (US-M, US-S), the approver's (US-V), the channel's (US-A), the employee's (US-R), the manager's (US-L), the inspection pack (US-I) and the IT admin's (US-T) | Every build team |
| §03.6b, continuity | Role vacancy states, what a vacancy does to a month in flight, the hand-over pack per role, CA disengagement and tests | IAM (§07, §15), operations (§22), support |
| §03.6a, the approver's sign-off artefact | Kinds, data definition, sections, content rules, reason codes, decision table, state table, escalation, queue ordering, permissions, digest and tests | Payroll (§08), operations (§22), legal wording (§23), metrics (§19) |
| §03.8a, the month in the life | One wage month through the corrected lifecycle (EV-036–EV-039), each persona's month, month types, month zero, failure branches, notifications and tests | Product, operations, support |
| §03.9a, §03.13, §03.14 | Surfaces by band; cross-persona acceptance scenarios; job-to-story traceability, the parameter register and computable success measures | Design, QA, §19, §20 |

### 03.1 Persona roster and where each sits

Four primary personas (P1, P2, P4, P5), one channel persona (P3), and three secondary personas that shape requirements without being the buyer. The band column maps to the segment matrix in §03.9 and to the statutory step function in §06.

| # | Persona | Archetype | Primary band where they dominate | Buyer / User / Both | Confidence |
| --- | --- | --- | --- | --- | --- |
| P1 | **Meera — HR admin / generalist** | The "HR department of one," then the small HR team lead | 20–200 (sole owner 20–80) | User; economic-influencer | **[Hypothesis]** |
| P2 | **Suresh — payroll officer / accountant** | Runs the monthly run; often wears a Finance hat | 50–200 (dedicated role appears ~80+) | User; technical-approver | **[Hypothesis]** |
| P3 | **CA Anjali — compliance consultant / bureau** | External practitioner who today runs payroll and the attended portal filings under each client's authority; the employer's statutory liability stays with the employer (EV-030) | 20–200 (outsourced 20–80, co-sourced 80–200) | **Channel** — reseller/referrer and gatekeeper; not a primary v1 design-target user (thin console, §05 item 20) | **[Hypothesis]** — carries the heaviest kill criteria |
| P4 | **Ravi — the employee** (incl. deskless/frontline) | Salaried desk worker *and* shift/field/plant worker | All bands | User only; drives the inference and WhatsApp cost lines, not the dominant one (EV-088) | **[Hypothesis]** on frontline reach; **[Verified]** on statutory entitlements |
| P5 | **Vikram — founder / CXO** | The 20–80 owner-operator; the 80–200 CFO/COO | 20–200 | **Economic buyer** below ~120; above it, approver where he is the CFO or COO, digest reader where he is the founder (§03.1 rule 4) | **[Hypothesis]** |
| S1 | Line manager / department head | Approves leave, attendance, hikes | 50–200 | User | **[Hypothesis]** |
| S2 | Statutory inspector / auditor | EPFO/ESIC/PT/labour inspector; internal auditor | All | External stakeholder | **[Verified]** on what they demand |
| S3 | IT / systems admin (fractional) | Often the same person as founder or an MSP | 100–200 | Gatekeeper on integration | **[Hypothesis]** |

A structural note that shapes the whole section: **in the 20–80 band these roles collapse into one or two humans.** Meera *is* the payroll officer *is* the person who calls CA Anjali. The product cannot assume role separation until roughly 100 employees. Every persona below is written twice in effect — as the specialist it becomes at 150 people, and as the fraction of a generalist it actually is at 30.

<!-- DIAGRAM: personas-roster-by-band -->

#### From personas to the machine's actors — who holds each gate, by band

§08 and §22 name the actors who may trigger each transition of the payroll-month machine (FR-PAY-301), the filing-instance machine (FR-PAY-711) and the attended session (FR-OPS-006). They name roles, not people. The table below binds each role to the persona who fills it in each band, so that the user stories (§03.2–§03.7), the sign-off artefact (§03.6a) and the month in the life (§03.8a) test the right human at each gate. Three terms are used strictly from here on:

- **The operator** — the tenant's payroll operator, the §08 maker: Meera below ~80, Suresh above it, a CA's junior for an outsourced client. r3/02 found this role to be a one-to-five-year B.Com/M.Com/MBA generalist who owns the whole loop from attendance to filing (finding 25; one posting re-verified cold, the rest read once).
- **The approver** — the §08 checker and the §22 named approver: Vikram below ~120, a CFO or COO above it. r3/02 found two distinct sign-off acts in the same verified posting — approving the payroll before disbursement, and authorising the money movement in the bank's corporate portal (finding 28).
- **Our compliance operator** — the vendor's staff member of §22, who acts only in an operator-attended session (§22 Mode C), fenced until counsel clears Part D-17 (§05 A-23; §20 V-25). No persona in this section is our compliance operator.

| Actor (as §08 and §22 name it) | Transitions and acts it holds | Segregation rule | 20–50 | 50–100 | 100–200 | Outsourced client (CA-run) |
| --- | --- | --- | --- | --- | --- | --- |
| Payroll operator (maker) | M1–M5, M12; F4, F8; presents the sign-off artefact | Never the approver of the same run (FR-PAY-304; §14 AC-DM-29) | Meera | Meera | Suresh | CA Anjali's junior, under the payroll-operator role the client grants her organisation (§15.3.6) |
| Approver (checker) | M6, M7, M8 | Never the run's maker | Vikram | Vikram | CFO or COO; Vikram reads the digest | Vikram — the CA's review does not replace it (rule 3) |
| Payment approver | M9, plus the bank's own maker-checker and OTP in its corporate channel | Never the payroll processor (FR-PAY-904) | Vikram | Vikram | CFO or finance head | Vikram |
| Named approver | M10 gate confirmation; every instruction-gated portal act — approve the EPFO return statement, generate the EPFO challan, mark a date of exit, upload a Form 138 statement, submit a PT or LWF return, generate an ESIC or PT challan (FR-OPS-004); F10 and F12 with the operator | Never the person performing the portal act (AC-004.3); step-up on every instruction (AC-004.4) | Vikram | Vikram | CFO or COO | Vikram |
| Employer's portal user | Signs in and operates the portal in employer-attended and co-attended sessions (§22 Modes A, B); records F6 and F9 | Operates; never instructs | Meera | Meera | Suresh | CA Anjali under the client's credentials — today outside the product; inside it only as §22 Mode D (P1) |
| OTP contact | Relays a portal OTP per session (FR-OPS-002) | Never a standing forward (§22 P6) | Whoever holds the registered mobile — Vikram or Meera | As 20–50 | Suresh or the CFO | The client's registered contact |
| Authorised payer | Pays each challan through the employer's own bank channel (§22 P5) | The employer's authentication only | Vikram | Vikram | Finance head | Vikram |
| Authorised signatory | Signs the written authority to act (FR-OPS-002); performs any DSC-bound step (§22 P6) | The DSC never leaves the signatory | Vikram | Vikram | A director or the CFO | Vikram |
| Compliance checker (§07) | The **C** cells of the permissions matrix — statutory identifiers, bank changes, wage structures, registrations (FR-CHR-105) | Never the maker of the same change instance (FR-CHR-084) | Vikram | Vikram or a senior finance user | CFO or finance head | Vikram |

Five rules fall out of the table; the stories test each.

1. **Four eyes survive the collapse of roles.** Below ~80 the operator and the approver are the only two humans in the loop, and they must be two humans. A tenant with one human able to hold both — a founder who runs payroll himself — may combine them only as the logged policy exception FR-PAY-304 allows (AC-304.1); every artefact produced under it is marked single-person approval on its face and in the approver's digest (US-V11). The exception never reaches the §07 matrix floors (FR-CHR-105) or an act our compliance operator performs (AC-004.3).
2. **The approver of record is on the employer's side.** Every approval that moves money or makes a portal act irreversible — M6, M9, M10 and each FR-OPS-004 instruction — defaults to a named person at the employer, because the liability it discharges is the employer's and is non-delegable (EV-030; §22.2.2). A tenant may name an approver who is not its employee or officer only by a decision its owner records — and, for portal acts under a written authority to act, only among that authority's named contacts (FR-OPS-002); the artefact then carries an external-approver marker (§03.6a), and that approver is never the user who made or reviewed the run or who performs the portal act. Whether naming one is advisable is for the customer and its counsel (§23), not the product.
3. **The CA reviews; the client approves.** For a CA-run client, the CA's practice-level check — her junior makes, she reviews (§03.4) — is recorded as a review, not as M6. The client's approver still approves. This keeps the CA a channel and not the employer's proxy (§03.4).
4. **Band moves the person, not the gate.** Crossing ~120 moves the approver from Vikram to a CFO; it removes no gate. Above ~120 Vikram's surface is the status view and a digest of every approval made by others, with read access to each artefact (US-V08, US-V16).
5. **Absence finds a different second person, never a waiver.** When the approver is away near a due date, FR-CHR-086 delegation and escalation apply: the item reassigns to a configured backup — never to the maker — and appears on the pre-filing readiness report (§07). A delegate inherits the delegator's scope and no more (US-V10).

<!-- DIAGRAM: personas-jtbd-actor-map -->

**Role readiness before the first month.** A role the machine needs and nobody holds stalls the month at the gate that needs it, usually days before a due date. The product therefore checks, at tenant activation and again whenever a person leaves (§07 exit), that each role below is held, and shows the tenant's owner what is missing and what it will block.

| Role | Must be held before | If nobody holds it |
| --- | --- | --- |
| Payroll operator | The first period opens (M1) | No inputs can close |
| Approver, distinct from the operator | The first sign-off artefact is presented (§03.6a) | The artefact cannot be presented; the single-person exception (rule 1) is offered with its marker |
| Payment approver | The first bank file is released (M9) | The file is generated at lock but cannot be released |
| Named approver | The first instruction-gated act (FR-OPS-004) | The session hands back at the first gated step (§22 S9) |
| OTP contact, where a portal prompts for one | The first portal session | The session hands back at sign-in (§22 S6) |
| Authorised signatory | Any written authority to act (FR-OPS-002); any DSC-bound step | Operator-attended submission cannot be enabled; certificate signing waits |
| Backup approver | The first month in which the approver has an approved absence | Escalation has nowhere to go; the item stays on the readiness report (rule 5) |

| # | Given | When | Then | Rule |
| --- | --- | --- | --- | --- |
| RR1 | A 30-person tenant where Meera is operator and Vikram approver | Meera tries to approve her own run | Refused; Vikram is notified | 1; FR-PAY-304 |
| RR2 | A founder is the only user with payroll roles | He enables the combined role | Allowed only with a recorded policy exception; every artefact carries the single-person marker | 1; AC-304.1 |
| RR3 | A named contact on the written authority leaves the employer | The exit is recorded (§07) | The authority goes SUSPENDED until the signatory confirms (FR-OPS-002); operator-attended sessions fall back to employer-attended | 5; §22 |
| RR4 | The OTP contact changes phones | A session prompts for an OTP | Changing the portal's registered mobile is always excluded from the authority, so the employer makes the change; the session hands back meanwhile (FR-OPS-002; §22 S6) | — |
| RR5 | A CA-run client with no employer-side approver | The CA's junior presents the run | Not presentable; the roster tile shows "approver missing" | 2, 3 |
| RR6 | Vikram on approved leave; his configured delegate made the run | The artefact is presented | It escalates past the delegate to the next approver, never to the maker | 5; FR-CHR-086 |
| RR7 | A revision to Vikram's own pay | Vikram proposes it | A different compliance checker must decide it (FR-CHR-084); the run later marks his line `OWN_LINE` | 1 |
| RR8 | A tenant crosses ~120 and names a CFO | The role change is checked | Artefacts from the effective date go to the CFO; Vikram keeps read access and the digest | 4; US-V16 |

---

### 03.1a The work item — how every hand-off names its next actor

Design principle 10 (§03.12) says every state of every machine shows who acts next and by when. The stories in this section raise dozens of such acts: the nine onboarding chase tasks (§03.2), attendance regularisations (§09), the non-payroll compliance tasks of US-M08, US-M13, US-M14 and US-M16, the consent non-responder task (FR-CHR-122), the Aadhaar remediation task (FR-CHR-101), the missing-PTRC registration task (§22.4.5), the joint-declaration task a wrong date of exit forces (EV-041), the items a returned run produces (US-M10), the blocker on a BLOCKED filing instance (FR-PAY-711 F2) and the device tasks (US-T01, US-T02). Each of those is specified by the section that owns its rule; none of them specifies **the object the human sees**. This subsection specifies that object — the work item — so that no hand-off named anywhere in §03 can exist without a named holder, a due moment, a stated consequence and a way to be closed. It binds the owning sections' rules to a person; it does not restate them.

#### What a work item is, and what it is not

| Object | What it carries | Why it is not a work item |
| --- | --- | --- |
| **Work item** | An act owed by one named person, with a due moment, a blocking class and the consequence of not doing it | — |
| Sign-off artefact (§03.6a) | A decision on hashed content, bound to an irreversible or money-moving act | A decision, not an act to perform; a work item of class INSTRUCT may *route to* one, and closes when it is decided |
| Notification (§03.8a) | A message telling someone something happened | Carries no obligation and cannot be closed; every work item generates notifications, not the reverse |
| Exception flag on a run (FR-PAY-713) | A property of a computed result, shown in section F of the artefact | Becomes a work item only where a human must act **outside** the run to clear it |
| Filing instance state (FR-PAY-711) | The state of an obligation | An instance at BLOCKED raises a work item for the blocker's owner; the instance is not itself owned by a person |
| Maker-checker request (FR-CHR-084) | A proposed change awaiting a distinct checker | Already a two-party object in §07; it surfaces in the holder's list as a work item of class RESOLVE and closes on the checker's decision |

#### Classes

Five classes, because each closes differently and each fails differently. The class is fixed when the item is raised.

| Class | The act | Typically held by | Closes when | Examples, with the section that owns the rule |
| --- | --- | --- | --- | --- |
| `CHASE` | Obtain a fact or artefact from someone the product cannot compel | Operator; the employee where the fact is the employee's own | The fact arrives and is recorded — never on the chaser's assertion | UAN activation (§07); ESI IP registration (§07); Form 122 prior-employer income (US-M11); consent non-response (FR-CHR-122); Aadhaar seeding remediation (FR-CHR-101) |
| `RESOLVE` | Do something in the product | Operator; line manager; compliance checker | The product's own record changes | Attendance exceptions (US-M02); a returned run's fix (US-M10); a pending maker-checker decision (FR-CHR-084); a regularisation (US-L01) |
| `INSTRUCT` | Put an irreversible or money-moving act in front of its approver | Operator raises; the named approver holds the decision | The sign-off artefact it routes to reaches a decision (§03.6a SG2 or SG3) | `SO-RETURN`, `SO-GATE`, `SO-EXIT`, `SO-ESIC`, `SO-PT`, `SO-STATEMENT` |
| `ATTEST` | Record a human statement the product cannot verify | The person making it | The statement is recorded with its author and time | Device decommission or loss (US-T02, Part E-6); a checklist waiver reason (AC-M01.3); the single-person policy exception (US-V11) |
| `OFFLINE` | Perform an act wholly outside the product and bring back its evidence | Operator, approver or authorised signatory | The evidence is attached | The joint declaration for a wrong date of exit (EV-041); constituting and minuting the Grievance Redressal Committee (US-M08); the Internal Committee's constitution (US-M13); the RPwD s.21(2) registration correspondence (US-M14) |

#### Data definition

The work item is a persona-facing object over records other sections already keep. Storage, audit and retention follow §14, which owns the entity class this object falls in and its retention; its closure evidence inherits the retention class of whatever it points at.

| Field | Type | Rule |
| --- | --- | --- |
| `work_item_id` | Opaque identifier | Never reused |
| `kind` | Catalogue value, e.g. `UAN_ACTIVATION`, `ESI_IP_REGISTRATION`, `ATTENDANCE_GAP`, `EXIT_MARKING_INSTRUCTION` | A kind enters the catalogue with its owning section, class, blocking class and closure evidence — never ad hoc |
| `class` | One of the five above | Fixed at creation |
| `owning_section` | Section reference | The section whose rule raised it; the item links to it rather than restating it |
| `subject_ref` | Employee, establishment, registration, payroll month, filing instance, device or consent record | Exactly one subject |
| `holder_role`, `holder_user` | Role, then the named person derived from it | A role with no holder resolves per the routing rule below; an item is never shown as owned by "HR" or "Finance" |
| `raised_by`, `raised_at` | System event, validator or user; NIC/NPL-synced timestamp (EV-062) | — |
| `due_at`, `due_basis` | Timestamp; one of `statutory`, `derived`, `tenant` | A statutory basis carries its citation (§06.11); an uncaptured statutory date renders "unconfirmed" with its owner and never a guessed day (§06.11 rule 4) |
| `blocking_class` | B0–B3 below | Fixed at creation; a kind's blocking class is a property of the kind, never of the tenant |
| `consequence_template` | Template version | What not doing it costs, in registered wording — never free text, never a damages figure (§03.6a content rule 5) |
| `evidence_required` | Closure-evidence kind | From the table below; an item cannot be closed without it |
| `state`, `state_changed_at` | See the transition table | — |
| `closure_ref` | The record that closed it | The arriving fact, the product record, the decided artefact, the attestation or the attached evidence |
| `waiver` | Reason text, waiver's user, period waived | Only for waivable kinds; one period at a time (AC-M01.3) |
| `escalation_state`, `reminders_sent` | Ladder stage; count | Below |
| `supersedes`, `superseded_by` | Work items | The chain across role changes and re-raises |
| `notice_refs[]` | Notices sent about this item | Employee notices go to the employee's own channel only (FR-CHR-088; FR-CHR-122) |

**What a work item never carries**, on its face, in its notifications or in any export: an Aadhaar number or any of its digits beyond the last four (FR-CHR-105), a portal credential or OTP (FR-OPS-008 AC-008.4), another employee's figures, or a health, disability or consent status shown to anyone but the employee and the roles §07 scopes it to.

#### Blocking classes

| Class | Meaning | Example | What the holder is told |
| --- | --- | --- | --- |
| **B0** | Blocks nothing; creates exposure | An unresolved OT advisory (US-L02); a gratuity nomination outstanding | The exposure, and that no gate is held |
| **B1** | Holds one line in one statutory artefact | A member without a UAN at ECR generation; an unseeded Aadhaar under exclude-and-flag (FR-CHR-101) | Which artefact, which line, which month, and the m+4 window where one applies (EV-038) |
| **B2** | Holds a transition of a machine | An unresolved attendance gap holding M2 (FR-ATT-022); a blocking validation holding M6 (AC-301.1) | Which transition, and who else is waiting behind it |
| **B3** | Holds another work item | The missing PTRC holding the PT return instruction (§22.4.5) | The item it holds and that item's due date |

**The standing rule, in every class:** *no work item holds salary.* Salary is computed and paid while every item above is open; the design of every kind in the catalogue must state what it holds instead, and a kind that can only be satisfied by withholding pay is not admitted to the catalogue (§03.2 JTBD-M1 acceptance; FR-CHR-101; Part D-10).

#### Who holds it — the routing rule

The holder is derived from the act, not from who noticed it. The table is read top to bottom and the first matching row wins; the diagram is the same rule.

| # | If the act is | Holder | Never |
| --- | --- | --- | --- |
| 1 | A fact or choice that is the employee's own — UAN activation, a declaration, a regime election, a consent, Aadhaar seeding | The employee, on their own channel | The employee's manager, and no manager view shows it (FR-CHR-122) |
| 2 | An attendance, leave or overtime fact inside one team | The line manager of the employee it concerns | The manager's own regularisation, which routes to his manager (§07.5.2) |
| 3 | A change to a statutory identifier, a bank detail or a wage structure | The compliance checker in scope (FR-CHR-105) | The maker of the same change instance (FR-CHR-084) |
| 4 | An instruction for an irreversible or money-moving portal act | The named approver, through a sign-off artefact | Anyone who performs the portal act (AC-004.3) |
| 5 | An act requiring the written authority to act or a DSC-bound step | The authorised signatory | Any delegate — the DSC never leaves the signatory (§22 P6) |
| 6 | A missing rule value, state slab, form number or due date | Our statutory desk (§22.8) — the only class of item held by the vendor | The tenant, who cannot fix it and must not be asked to guess |
| 7 | Anything else the product itself can close | The payroll operator | — |
| 8 | Any of the above where the role has no holder in this tenant | The tenant's owner, on the role readiness report (§03.1) | Silent non-assignment; an unheld item is never merely hidden |

Two derivation rules follow. **Holders are derived at creation and re-derived on a role change**, so an item held by a person who leaves moves with the role and not with the person (§03.6b). **Re-derivation never lands on the maker** of the item's subject where a four-eyes rule applies; if the only remaining holder is the maker, the item goes to row 8 and appears on the readiness report rather than being assigned in breach.

<!-- DIAGRAM: personas-jtbd-task-owner-routing -->

#### States and transitions

| # | From → To | Event | Guard | Side effect | Who may trigger |
| --- | --- | --- | --- | --- | --- |
| TK1 | *(none)* → OPEN | A machine event, a validator, a notice or a person raises it | The kind is in the catalogue and a holder resolves (routing rule) | Holder notified on their channel; the reminder ladder starts | System; operator; approver |
| TK2 | OPEN → WAITING | The act passes to someone the product cannot compel — an employee, an authority, a counterparty | The outward act is recorded with its date | The clock keeps running; the due date does not move | Holder |
| TK3 | WAITING → OPEN | The awaited fact arrives but still needs the holder to act on it | — | — | System; holder |
| TK4 | OPEN → BLOCKED | A precondition the holder cannot clear | The blocker is named with its own owner | The blocker's owner gets an item of their own, linked | System; holder |
| TK5 | BLOCKED → OPEN | The blocker clears | The blocking item is DONE, WAIVED or VOID | — | System |
| TK6 | OPEN → DONE | Closure evidence recorded | The evidence matches `evidence_required` | The held artefact, transition or item is released; the holder's list updates | Holder; system on an arriving fact |
| TK7 | WAITING → DONE | The awaited artefact *is* the closure evidence — an acknowledgement, a registration number, a signed declaration | As TK6 | As TK6 | System |
| TK8 | OPEN → WAIVED | Waiver | The kind is waivable; a typed reason; the waiver's user is not the item's only beneficiary; one period only | The waiver, its reason and its author ride on the transition and on the approver's artefact where the item fed one | Operator with the waiver right; approver |
| TK9 | OPEN, WAITING or BLOCKED → VOID | The obligation ceases before the act is owed — the employee never joins, the threshold un-latches by a named approver's decision, the subject is deleted | A reason, and a named decider where a threshold is involved (§03.9) | Recorded; never silent | Named approver; system on a subject's removal |
| TK10 | OPEN, WAITING or BLOCKED → SUPERSEDED | Re-raised on a new subject, holder or period | The successor item exists and is linked | The chain is readable in both directions | System |

- **AC-WI.1** — Every item in OPEN, WAITING or BLOCKED has exactly one named holder; a query that returns an item with no holder is a defect, and the readiness report is the only place an unheld item may appear.
- **AC-WI.2** — A due date passing never changes an item's state. It changes the escalation stage, the tile colour and, where the item is B1 or B2, what the approver sees in section F.
- **AC-WI.3** — DONE, WAIVED, VOID and SUPERSEDED are terminal. A recurrence of the same obligation is a new item linked to the old one, so that "how often does this recur" is answerable without reopening history.
- **AC-WI.4** — Closing an item writes an audit event on NIC/NPL-synced time (EV-062) carrying the kind, class, holder, evidence reference and the elapsed time from `raised_at`.
- **AC-WI.5** — No bulk action closes items without per-item evidence. A bulk action may *assign* or *remind*; a bulk close is not built.

<!-- DIAGRAM: personas-jtbd-task-states -->

#### Escalation and reminders

The ladder is deliberately the same shape as the sign-off artefact's (§03.6a), so the two surfaces behave alike for the same human.

| Stage | Trigger | Action | Never |
| --- | --- | --- | --- |
| Raised | TK1 | The holder is notified on their own channel | A manager notice for a row-1 item |
| Reminder | Each `task.reminder_cadence_days` while OPEN or WAITING | The same holder, with the count shown on the item | A reminder that changes the due date |
| Due-date risk | `calendar.alert_lead_days` before `due_at` | The holder, plus the operator for B1 and B2 items, with the consequence named | A damages figure; a relaxed guard |
| Escalation | `due_at` passes, or the item is unheld for `task.unheld_escalation_days` | The holder's configured backup under FR-CHR-086, or the tenant owner for an unheld item | Reassignment to the maker; auto-closure |
| Standing | The item is past due and still open at the month's close | It is carried into the next month's status view with its age, and listed in the approver's digest under open items | Disappearance at month end |

#### Closure evidence — what counts as done

| Class | Evidence that closes it | Evidence that does **not** |
| --- | --- | --- |
| `CHASE` | The fact itself, recorded in the field it feeds, with its source — a UAN recorded and validated, an IP number from the portal, a declaration submitted, a consent record at GRANTED (FR-CHR-115 CN3) | "I called him"; a note; a chaser's assertion |
| `RESOLVE` | The product record the item names has changed — the regularisation carries IN and OUT times (EV-055), the checker's decision is recorded, the returned run is re-presented | The run being reprocessed without the disputed input changing (US-M10, negative) |
| `INSTRUCT` | The sign-off artefact reaching APPROVED or RETURNED (§03.6a SG2, SG3) | Anyone in the tenant marking it done in the queue |
| `ATTEST` | The statement, its author, its time and the object it concerns | A configuration flag with no author |
| `OFFLINE` | The evidence attached — the joint declaration, the committee's minute, the letter register entry, the acknowledgement of correspondence | A tick box |

#### Worked example — the work items of August 2026 at Vikram's firm

The same month as §03.6a: one Maharashtra establishment, Meera the operator, Vikram the approver, the six changes J, L, E, K and G. Nine items exist in that month; not one of them holds a rupee of salary.

| Item | Kind and class | Holder | `due_at` and basis | Blocking | What closed it |
| --- | --- | --- | --- | --- | --- |
| 1 | `UAN_ACTIVATION`, CHASE | J, the joiner, on his own channel | Before August's ECR is generated — derived | B1 — J's ECR line | J activated in UMANG and the UAN was recorded and validated (US-R09) |
| 2 | `BANK_CONSENT`, CHASE | J | Before his first payout file — derived | B1 on the payout line, not on pay: without it he is paid by the tenant's `non_bank_disbursal_mode` (FR-CHR-102) | Written consent recorded before the bank field accepted input (EV-060; FR-CHR-114) |
| 3 | `APPOINTMENT_LETTER`, RESOLVE | Meera | On joining — derived from the 10-worker latch (EV-057) | B0, listed on the status tile | The letter issued in Maharashtra's prescribed form and entered in the letter register (US-M16) |
| 4 | `ATTENDANCE_GAP`, RESOLVE | E's line manager | Before the attendance cut-off — tenant | B2 — holds M2 (FR-ATT-022) | Regularised with IN and OUT times, or confirmed as an unpaid absence; here the second, giving E's two LOP days of ₹2,580.65 |
| 5 | `MAKER_CHECKER_DECISION`, RESOLVE | The compliance checker, who is not K's proposer | Before inputs close — tenant | B2 — item 7 of the pre-payroll checklist | K's revision ₹24,000 → ₹28,000 effective 1 July approved (FR-CHR-084) |
| 6 | `EXIT_MARKING_INSTRUCTION`, INSTRUCT | Vikram | 15 September, the due date of August's Regular return — derived (§03.6a queue) | B0 for the month, B1 for L's next line | `SO-EXIT` approved; the joint-declaration warning was shown before the date was bound (EV-041) |
| 7 | `ECR_RETURN_INSTRUCTION`, INSTRUCT | Vikram | 15 September — statutory (EV-036; §06.11) | B2 — holds the gate and therefore the challan | `SO-RETURN` approved after a member-by-member reconciliation with no difference |
| 8 | `ARREAR_RETURN`, CHASE, held by the statutory desk | Our statutory desk (routing rule 6) | The due month derived from the planned disbursal date (AC-401.2) | B1 — K's July arrear of ₹490.00 in employer and employee PF and EDLI | Nothing: it stands BLOCKED, because EPFO publishes no arrear file layout (EV-043). It is on the artefact as `FENCED_ITEMS` and in Vikram's digest under open items |
| 9 | `ESIC_CHALLAN_INSTRUCTION`, INSTRUCT | Vikram | 15 September — statutory | B2 — holds the ESI payment | `SO-ESIC` approved against the computed contribution, G's ₹22.50 and ₹97.50 included |

Three properties of the month are visible only in this list. **Item 8 is the only one nobody at the tenant can close** — it is ours, and showing it as the tenant's would be a lie about who is stuck (routing rule 6). **Item 4 is the only one whose closure changes a rupee figure**: had it been regularised instead, E's ₹2,580.65 would not have been deducted, and after lock the same correction becomes an LOP reversal in the next run at the locked month's day-rate method (US-M04). **Items 6, 7 and 9 are instructions, so their closure is a decision and not an act** — which is why they appear in Vikram's queue in the §03.6a order rather than in Meera's list.

#### Edge and negative cases

- **An item whose holder is the only eligible person for a four-eyes act.** Row 8 of the routing rule: it goes to the tenant owner's readiness report, not to the maker. A tenant with one human uses the recorded single-person exception (US-V11) or the act waits.
- **An employee-held item and an employee who has left.** The item goes VOID under TK9 where the obligation ceases with the employment, and stays OPEN on the operator where the obligation survives the exit — the date-of-exit marking and the settlement's statutory lines do (US-M07).
- **Two items for the same fact.** The kind's catalogue entry names its uniqueness scope — subject plus period — so a second raise supersedes rather than duplicates (TK10).
- **A statutory due date that is not captured.** The item is raised with `due_basis` `statutory` and an unconfirmed date, sorts after the dated items of its group, and the statutory desk holds a linked item of its own (§06.11 rule 4).
- **A waiver used to make a month look clean.** Waivers ride on the transition and on the approver's artefact; the digest counts them. Statutory checklist items can be waived for one month and never removed (AC-M01.3).
- **An item raised by a model.** Not built. An assistant may draft the text of a notice or summarise a list, but a work item is raised by a machine event, a validator or a person, and no model output closes one (§03.12 principle 2; §12).
- **An item nobody can see.** Every item is visible to its holder, the operator and the approver, within §07's scope rules; an item visible only to the vendor exists only for routing-rule row 6 and is still shown to the tenant with its owner named as ours.

#### Test scenarios

| # | Given | When | Then | Traces |
| --- | --- | --- | --- | --- |
| TT1 | A joiner with no UAN | August's ECR is generated | His line is held with a B1 item on him, and the run, the payslip and the bank file are unaffected | Routing rule 1; §03.2 |
| TT2 | An attendance gap inside a device-offline window | Meera attempts M2 | Refused while the item is OPEN; the item names the manager and the terminal's last push | B2; AC-M02.2 |
| TT3 | The same gap, waived with a typed reason | M2 is attempted again | Allowed; the waiver, its reason and its author appear on the transition and in the approver's artefact | TK8; AC-M01.3 |
| TT4 | A holder resigns with eleven open items | The exit is recorded | Every item re-derives to the role's successor or to the tenant owner; none lands on the maker of its own subject | Derivation rules; §03.6b |
| TT5 | An item held by the statutory desk | The tenant opens it | It shows our name as the owner and its blocker; the tenant is offered no action and is not chased | Routing rule 6; item 8 above |
| TT6 | A `CHASE` item whose holder marks it done with a note | — | Refused: the field the item feeds has not changed | Closure evidence |
| TT7 | An `INSTRUCT` item whose artefact is returned | — | The item closes on the RETURNED decision and a new item is raised with the re-presentation | TK6; §03.6a SG3 |
| TT8 | An employee-held consent item | The reminder ladder runs | Reminders go to the employee's own channel at `consent.reminder_cadence_days` up to `consent.reminder_limit`, then an HR item offers the paper route in person; no manager is notified at any stage | FR-CHR-122; routing rule 1 |
| TT9 | A B1 item still open at the m+4 warning window | The window opens | The item's consequence text names the chronology effect and the operator and approver are alerted | EV-038; AC-712.2 |
| TT10 | An item past due at month close | The month reaches FILED | It appears in the digest under open items with its age and owner, and is carried forward | Escalation ladder; §03.6a digest |
| TT11 | A bulk action over forty open chase items | The operator selects "close all" | No such action exists; assign and remind are offered | AC-WI.5 |
| TT12 | A device that cannot acknowledge erasure | The admin attests loss | The `ATTEST` item closes on the attestation, which names the device and its author | US-T02; Part E-6 |

---

### 03.2 P1 — Meera, the HR admin / generalist

> "I am not paid to be right about PF. I am paid so that nobody above me ever has to think about PF."

#### Context

Meera, 34, is Manager–HR & Admin at a 60-person B2B services firm in Pune. She is the entire people function: recruitment coordination, onboarding, attendance, leave, the payroll *inputs* (not the calculation — that is Suresh or the CA), grievance first-response, exit formalities, and "admin" in the literal sense — the office lease, the housekeeping vendor, the Diwali gifts. She reports to the founder. She has an HR generalist degree, five years' experience, and learned Indian statutory payroll entirely on the job and from YouTube. She runs the firm on a mix of a legacy HRMS the founder bought in 2022, three Excel workbooks, a WhatsApp group per department, and Tally in the next room that she cannot see into.

She is the closest thing the product has to a *daily* user. She logs in more days than not; the payroll officer logs in around cut-off; the founder logs in monthly. This frequency asymmetry is a design fact: the highest-frequency user is also the least statutorily expert, so the product's default surface must be forgiving and explanatory, not a specialist console.

#### Goals (ranked as she would rank them)

1. **Nothing blows up.** No notice from EPFO/ESIC, no employee escalating to the founder, no missed statutory date.
2. **The month closes on time.** Attendance locked, inputs handed to payroll, payslips out by the committed date.
3. **Employees self-serve** so her inbox is not the system of record for "what's my leave balance."
4. **Onboarding a new joiner takes an hour, not a day** — UAN, ESI IP, bank, KYC, appointment letter, all of it.
5. **She looks competent to the founder** — clean dashboards she can screenshot into a review.

#### Pains (observed patterns, mostly **[Hypothesis]** pending §20 interviews)

- **The reconciliation tax.** Attendance lives in the biometric device / another app, leave lives in Excel, LOP is computed by hand, and a transcription error surfaces as a wrong payslip and an angry employee. This is her single largest recurring time sink.
- **Onboarding is a 9-artefact scavenger hunt.** New joiner needs: a UAN — since 1 August 2025 generated and activated by the *employee* through Aadhaar face authentication in the UMANG app, with employer-side generation surviving only for International Workers and Nepal/Bhutan citizens, so Meera prompts and chases rather than generates (Source: EPFO HO circular dated 30.07.2025, read from an archived copy; §07) **[Verified]** — on a single circular, with no post-November-2025 EPFO guidance retrieved, so the flow is re-confirmed on the live portal before it is built (r4 critic) — or a prior-UAN transfer (Form 11 declaration); ESI IP registration; bank + IFSC; PAN and, optionally, Aadhaar; the *prescribed-format appointment letter*, owed by an "establishment" of 10 or more workers in the form the appropriate Government prescribes — state-sphere for most of this segment (OSH Code s.6(1)(f); EV-057) **[Verified]**; EPF/EPS nomination; the investment declaration (Form 124, ex-12BB — EV-050); previous-employer income for correct s.392 (ex-s.192) TDS (Form 122, ex-12B/12BAA — EV-050); and gratuity nomination, owed once the employee completes one year of service (CoSS s.55). Miss one and it surfaces months later at exit or at the first ECR.
- **She is blamed for numbers she did not compute.** PF/PT/TDS are calculated by Suresh or the CA, but the employee complaint lands on Meera. She needs *explainability she can forward*, not a recomputation.
- **Statutory dates she must remember without a system that reminds her:** EPF contributions within fifteen days of the close of the month (EPF Scheme 2026); ESI contributions by the 15th of the following month (ESI (General) Regulations 1950, reg 31); PT by state cadence (Karnataka's monthly return, for instance, is due within 20 days of month-end); TDS deposit by the 7th of the following month, except that March deductions are due 30 April (the 1961-Act dates; their home in the Income-tax Rules 2026, r.218, has not yet been read, so under the 2026 Rules these two dates are **[Hypothesis]** — §06.11, §05 A-10, §20 V-20); Form 138 (ex-24Q) quarterly by 31 July, 31 October, 31 January and 31 May (Rule 219, Income-tax Rules 2026 — EV-049). **[Verified]** A late EPF month now costs cash at once: EPFO's re-engineered ECR auto-calculates interest (labelled s.7Q on the platform; 12% p.a. simple interest under the Code per S.O. 2698(E), 29.05.2026 — **[Verified — mirror]**, read through a professional alert quoting the notification rather than the gazette; pull from the primary source before customer use — §06) and makes it **mandatory with the contribution**, while s.14B damages may be deposited later at the employer's option (EV-039). **[Reversed]** — earlier drafts quoted a graded s.14B damages scale as [Verified]; no source in our research supports it and §06 carries it only as [Hypothesis]. The damages schedule is therefore a configurable parameter (`epf.damages_scale`, the name §06 and §08 use) routed to §20, and the product *predicts* exposure and reconciles it to what EPFO actually assesses rather than computing penalties as a source of truth.
- **The compliance calendar is tribal knowledge in her head**, and she cannot take leave during the first fortnight of any month without anxiety.
- **Deskless attendance is a black hole** — the plant/field staff punch on an eSSL device she can't reconcile, or send WhatsApp selfies.

#### Jobs-to-be-Done (job statements)

- **JTBD-M1 (functional):** *When* a new employee joins, *I want to* complete every statutory registration and document from one intake, *so I can* be sure nothing surfaces as a gap at the first ECR or at exit.
- **JTBD-M2 (functional):** *When* the payroll cut-off arrives, *I want to* hand payroll a single locked, reconciled attendance-and-leave dataset, *so I can* stop being the source of transcription errors.
- **JTBD-M3 (emotional):** *When* an employee questions their payslip, *I want to* show them a plain-language breakdown they accept, *so I can* stop escalations reaching the founder.
- **JTBD-M4 (emotional):** *When* the first fortnight of the month comes, *I want to* trust the system to chase every statutory date, *so I can* take a day off without dread.
- **JTBD-M5 (social):** *When* the founder reviews HR, *I want to* present clean compliance and headcount dashboards, *so I can* be seen as running a tight function.
- **JTBD-M6 (functional):** *When* an employee resigns, *I want to* raise every settlement line and every filing task from one exit action, *so I can* pay within the statutory clock and leave no ghost member on the EPF roster (the mirror of JTBD-M1; §03.8 F&F flow).

#### Worked edge case 1 — the "one intake, nine fan-outs" onboarding (JTBD-M1)

The onboarding pain is only concrete once the fan-out is enumerated. A single joiner intake for a person earning ₹50,000/month must produce, from one form:

| # | Artefact | Trigger threshold | Source cue |
| --- | --- | --- | --- |
| 1 | UAN: prompt and chase the employee's own generation/activation (UMANG face authentication); employer-side generation only for International Workers and Nepal/Bhutan citizens; prior-UAN capture + Form 11 declaration on transfer | 20+ employees (EPF), or voluntary coverage | EPFO HO circular 30.07.2025; §06, §07 **[Verified]** |
| 2 | ESI IP registration | 10+ persons (some categories differ — §06), wage ≤ ₹21,000 (₹25,000 for persons with disability) | ESIC coverage page; §06 **[Verified]** |
| 3 | Prescribed-format appointment letter | "Establishment" of 10 or more workers; form prescribed by the appropriate Government (state-sphere) | OSH Code s.6(1)(f); EV-057 **[Verified]** |
| 4 | Bank + IFSC capture for NEFT salary batch — financial information, so written consent is captured before collection | operational | SPDI r.5(1); EV-060 **[Verified]** |
| 5 | PAN; Aadhaar **optional** — only its seeding *status* is tracked, because EPFO instructs that UANs be Aadhaar-seeded before ECR contributions are received (an administrative circular, not statute) | operational / EPF | EPFO administrative instruction; handling per §07 **[Verified]** on the instruction |
| 6 | EPF/EPS nomination | on EPF enrolment | EPF Scheme 2026 — form number unverified, §20 |
| 7 | Gratuity nomination | on completing one year of service | CoSS s.55 **[Verified]** on the trigger; the prescribing Government and form number are not in our evidence — rule data, §20 |
| 8 | Investment declaration (Form 124, ex-12BB) + regime election | every employee with salary TDS | s.392 (ex-s.192); EV-050 **[Verified]** |
| 9 | Previous-employer income + prior TDS (Form 122, ex-12B/12BAA) | mid-year joiners | s.392(4)(a); EV-050 **[Verified]** |

Acceptance for JTBD-M1: the intake fans out to all nine and tracks each to done. A missing artefact **never blocks salary**: it holds the employee out of the *dependent statutory artefact* (the ECR line, the ESI return line, the letter register) with an open chase task and notices to the operator and the employee. Items 1, 2, 3 and 8 are the mandatory subset — a missing UAN matters because ReECR validates UANs server-side and an unlinked one fails, and absent a regime election the default new regime applies — while 6, 7 and 9 are warnings, since a missing gratuity nominee does not break the first ECR. Aadhaar (5) is optional everywhere, including the EPF and ESI flows: when an employee declines it and a filing needs seeding, the default is exclude-and-flag with operator and employee notices, never a payroll block, and a "no Aadhaar, no payroll" configuration is never shipped (§07; final choice under counsel review, §23). Written consent is captured before collecting financial information (4) and before any biometric enrolment, because the SPDI Rules require consent in writing before collecting sensitive personal data today (EV-060 — provenance caveat; pull from the primary source before customer use); who owes that duty is a counsel question (§23), so the capture is built either way. Consent cannot be backfilled, so a migrating tenant's existing employees go through the §07 migration consent flow rather than inheriting consent from the incumbent. The engine must *know* which threshold each artefact turns on at, so a 25-person tenant is not prompted for a works-committee artefact it does not owe, and a 15-person tenant outside EPF is not chased for UAN activation.

<!-- DIAGRAM: onboarding-fan-out -->

#### Worked edge case 1b — the grievance redressal committee that appears at the same door as EPF

The 20-headcount step is not only EPF; §06 lists a **grievance redressal committee** turning on at the same threshold, and this is a Meera obligation she almost never knows she owes. Under the Industrial Relations Code 2020, every industrial establishment with **20 or more workers** must constitute a Grievance Redressal Committee (IR Code s.4; EV-057) **[Verified]**. The threshold counts *workers*, not employees, and the committee's composition and disposal timelines come from the rules of the appropriate Government — the sphere (central or state) is a schema field, not an assumption — so both are rule data, not constants (EV-057; §06). The trap: the obligation is *constitutional/documentary*, not payroll-arithmetic, so a payroll-only tool silently omits it and the gap surfaces only at an inspection (S2).

Acceptance: crossing 20 workers fires a **non-payroll compliance task** — "constitute and minute a Grievance Redressal Committee" — with a document template and a register entry, sitting alongside the EPF-registration prompt in the same 20-headcount latch. This is the clearest proof that "the filing is the unit of delivery" spans *documentary* obligations, not just monetary ones: the register is what S2 asks for, whether or not a rupee moved.

#### Worked edge case 2 — the LOP arithmetic that becomes a wrong payslip

Meera's single largest time sink is reconciliation, and its failure mode is a specific arithmetic error. Take a monthly-rated employee on ₹30,000 gross, calendar-day method, in a 30-day month, who has 2 unpaid absences after leave balance is exhausted.

- **Per-day rate** (calendar-day basis) = 30,000 / 30 = **₹1,000/day**.
- **LOP deduction** = 2 × ₹1,000 = **₹2,000**; payable gross = ₹28,000.

But the same firm may run *fixed 26-day* denominator for some cadres, giving 30,000 / 26 = ₹1,153.85/day and a ₹2,307.69 deduction for the same two days — a **₹307.69 divergence per two-day LOP** on one employee. The choice of denominator (calendar days vs 26 vs actual payable days) is a policy that must be **effective-dated per employee class**, because switching it mid-year silently changes everyone's LOP and triggers exactly the escalations in JTBD-M3. Acceptance: the payslip names the denominator method and the day-count used, so the derivation Meera forwards (JTBD-M3) answers "why ₹2,000 not ₹2,308" without a call to Suresh.

#### Worked edge case 3 — the "4 years 9 months" gratuity question

The 16:00 exit query in the day-in-the-life is not hypothetical; it is one of the most common judgment calls a generalist mishandles. Gratuity is payable after **5 years of continuous service** (CoSS s.53, which repealed and replaced the Payment of Gratuity Act) **[Verified]**, and "continuous service" is a day count, not a calendar count: 240 days actually worked in a year, 190 for establishments working under six days a week (CoSS s.54) **[Verified]**. Whether an employee at 4 years 9 months with at least 240 days worked in the fifth year has *completed* five years is a question several High Court rulings under the legacy Act answered yes (§06.6 — the citations are carried from an earlier draft, not re-captured, and we are not aware of any ruling under the Code as of September 2026) — a distinction Meera cannot be expected to hold in her head. **[Hypothesis]** on that reading: it is not verified in our research and is not uniformly followed across jurisdictions — kill line: if counsel review (§20, §23) finds it not defensible in the tenant's jurisdiction, the engine defaults to strict 5-year vesting and flags borderline cases for human review rather than auto-computing eligibility.

Product implication: gratuity eligibility and accrual must be **computed and surfaced**, not left to Meera's recall. The intake captures working-days pattern per establishment; the engine flags "eligible / not eligible / borderline — see rule" at exit. This is a concrete instance of design principle 3 (explainability that forwards) and principle 4 (effective-dated engine over human memory). A worked payout for a ₹50,000-last-drawn employee (Basic + DA) at exactly 5 completed years: (15 / 26) × 50,000 × 5 = **₹1,44,231** — 15 days' wages per completed year, monthly wage ÷ 26 (CoSS s.53) **[Verified]** — the exact number Vikram needs on his balance-sheet liability line (JTBD-V3). **[Reversed]** — earlier drafts capped this at a "₹20 lakh statutory ceiling [Verified]". Under the Code the payment ceiling is whatever the Central Government notifies (CoSS s.53(3)); no such notification was located and ₹20 lakh is the repealed Act's figure. The ceiling is therefore a configurable parameter (`gratuity_payment_ceiling`) routed to §20.

#### Worked edge case 4 — the maternity-benefit judgment at the 10-employee front door

Maternity benefit turns on at 10 employees on the same "employed, or were employed, on any day of the preceding twelve months" test as gratuity (CoSS First Schedule, Chapter VI, which repealed and replaced the Maternity Benefit Act 1961; §06) **[Verified]**, and it is exactly the kind of statutory judgment a generalist mishandles. Maternity leave up to 26 weeks counts toward gratuity continuity (CoSS s.54; §06) **[Verified]**. The entitlement itself — reported as **26 weeks** at **80 days' qualifying service** — appears in our research only as an open item, not read against the Chapter VI text, so it ships as two parameters, `maternity.weeks_standard` (26 pending verification; the name §07 FR-CHR-018b uses) and `maternity_qualifying_days` (80 pending verification), **[Hypothesis]**, routed to §20. Three further rules the engine needs are likewise **not verified in our evidence** and ship as configurable parameters routed to §20: the pre-delivery portion (`maternity_prenatal_weeks_max`), any reduced entitlement by child order (`maternity.weeks_reduced`, §07), and the wage base the benefit is paid on (`maternity_benefit_wage_basis`). Two traps Meera routinely hits:

- **Eligibility clock.** The qualifying-service test (`maternity_qualifying_days`) runs against attendance history — a mid-year joiner may not qualify, and telling her wrong is both a legal and a human failure.
- **The ESI overlap.** Where the employee is ESI-covered, who pays the benefit (ESIC or the employer) and how salary is suppressed to avoid paying it twice is a fork the engine must hold explicitly. The fork's exact rule is not verified in our research (§20) and must not be inferred from the ₹21,000 ceiling alone. Meera cannot be expected to hold it in her head.

Acceptance: the engine computes the entitlement from `maternity.weeks_standard`, applies the `maternity_qualifying_days` test against attendance history, holds the ESI fork as a rule (`maternity.esi_displacement_rule`, §07 Example M) rather than a hard-coded branch, and computes the benefit's wage base from the configured parameter. This is design principle 3 (explainability that forwards) applied to a leave the generalist gets wrong under pressure. **[Verified]** on the 10-employee twelve-month look-back trigger and on maternity leave counting toward gratuity continuity; **[Hypothesis]** on every entitlement parameter above until §20 verifies it — which is precisely why it belongs in versioned rule data rather than code.

#### User stories and acceptance criteria — the operator, input side

P1 and P2 together are the operator (§03.1). Meera's stories cover the input side of the month — joiners, attendance, leave, exits and the calendar; Suresh's (§03.3) cover the production side — the run, the artefacts, the portal and the gate. At 30 people one human reads both lists.

**How every story in this section is written.** An ID in the section's persona-letter scheme (`US-M01` is Meera's, as `JTBD-M1` is); the parent job; the transitions or FRs the story exercises; and a release derived by one rule — **a story ships in the latest release among the artefacts and FRs it depends on** (§05.7 artefact register, R1–R3). Acceptance criteria are Given/When/Then and testable against the transition logs; every story carries at least one negative case. Stories cite the mechanisms other sections own rather than restating them.

**US-M01 · Close the month's inputs once, against the checklist** · Job: JTBD-M2 · Exercises: FR-PAY-301 M2, M3; FR-PAY-302 · Release: R1
*As* the operator, *I want* inputs to close only when every pre-payroll item is closed or waived with a reason, *so that* the run is computed on a dataset I can defend and later edits cannot move it silently.
- **AC-M01.1** — Given a checklist with an open item, when Meera attempts M2, then the attempt is refused and each open item is listed with its owner; a waiver needs a typed reason, stored on the transition.
- **AC-M01.2** — Given M2 has succeeded, when an attendance record for the wage month changes, then the snapshot does not; the change queues as an adjustment for the next run unless Meera reopens inputs (M3), in which case the superseded snapshot is kept (AC-302.1).
- **AC-M01.3** — The checklist ships with a default list — the incumbent precedent is 18 items (r3/02 finding 1, vendor documentation read) — which the tenant may extend; items that feed a statutory figure (joiners, exits, LOP, arrears, F&F, declarations) can be waived for a month but never removed.
- **Negative** — there is no transition from OPEN to PROCESSED (FR-PAY-301), so the incumbent's skip-the-checklist shortcut (r3/02 finding 2) is not built.

**US-M02 · Reconcile attendance as exceptions, not as a dataset** · Job: JTBD-M2 · Exercises: §09 ADMS receiver and regularisation (FR-REG-001, FR-ATT-022); FR-PAY-301 M2 · Release: R1
*As* the operator, *I want* attendance from the terminal push, manual entries and roster exports reconciled for me, showing only conflicts and gaps, *so that* I stop re-keying and no device fault becomes an LOP.
- **AC-M02.1** — Given punches for the wage month from an ADMS-push terminal and from manual entry, when reconciliation runs, then each employee-day shows its source of record, and only conflicts (two sources disagree), gaps (no IN or no OUT) and device-offline windows reach Meera's queue.
- **AC-M02.2** — Given a window in which a terminal did not push, when an employee has a gap inside it, then the gap becomes a regularisation task for the employee's line manager (US-L01) and is never converted to LOP by default; an unresolved gap blocks M2 until it is cleared or waived with a reason (FR-ATT-022).
- **AC-M02.3** — A day resolved by regularisation carries the regularised IN and OUT times, because Form IX needs per-day IN and OUT timestamps (EV-055); a present/absent mark does not resolve it.
- **Negative** — a missing punch regularised after M2 does not change the run; it flows as an adjustment in the next run (AC-302.1) and appears on the next payslip as a labelled line (US-M04).

**US-M03 · Decide on a late attendance change with its rupee effect in front of me** · Job: JTBD-M2, JTBD-M3 · Exercises: FR-PAY-302; FR-PAY-301 M3, M5, M7 · Release: R1
*As* the operator, *I want* to see whose net pay a late attendance change would move, and by how much, before I choose to reprocess or carry it to next month, *so that* the bank file and the attendance record never diverge silently.
- **AC-M03.1** — Given a run at PROCESSED and a saved attendance change for its wage month, then a banner names the change and offers reopen-and-reprocess (M3, M4) or defer, with, for each affected employee, the current net, the net after reprocessing and the difference (the incumbent precedent is a reprocess banner — r3/02 finding 3).
- **AC-M03.2** — Given the run is APPROVED, then Meera cannot reopen it herself; she may request a return from the approver (M7, US-V02) or defer the change.
- **AC-M03.3** — Given the run is LOCKED or later, then only the defer path exists, as a correction run (FR-PAY-306).
- **Worked figure** — reversing the two LOP days of §03.2 worked edge case 2 (₹30,000, 30-day month) after M4 shows +₹2,000.00 for that employee, and the run's net total moves by the same ₹2,000.00.
- **Negative** — no change is ever applied to a PROCESSED run without an explicit choice; there is no auto-reprocess.

**US-M04 · Reverse a wrongly deducted LOP in a later month** · Job: JTBD-M3 · Exercises: FR-PAY-306; FR-PAY-401 · Release: R1
*As* the operator, *I want* to restore an LOP day deducted in a locked month as a labelled line in the current run, *so that* the employee sees the fix and the locked month stays untouched.
- **AC-M04.1** — Given an LOP day in a LOCKED month found to be a device fault, when Meera raises a reversal for that date, then the current run carries a line "LOP reversal — date, month" whose amount uses the locked month's day-rate method and rule version, not today's (FR-PAY-401).
- **AC-M04.2** — The reversal is its own driver row in the approver's variance bridge (§03.6a section C) and is approved with the run.
- **AC-M04.3** — The lookback within which a reversal may be raised is the tenant parameter `lop_reversal_lookback_months`; the incumbent precedent is 1 to 12 months (r3/02 finding 4, vendor documentation read). Beyond it, the reversal is possible only as a correction run the approver approves (`SO-CORRECTION`).
- **AC-M04.4** — Its PF treatment follows §08's distinction between true arrears and belated salary (AC-401.2), and the approver sees the resulting due month before money moves.
- **Negative** — the reversal never edits the locked month's payslip or ECR line; both stay byte-identical (AC-301.4).

**US-M05 · Forward a derivation the employee accepts** · Job: JTBD-M3 · Exercises: FR-PAY-601, FR-PAY-602; FR-PAY-1001 lineage · Release: R1
*As* the operator, *I want* to send an employee a plain-language derivation of the one line they question, *so that* the question ends without Suresh or the founder.
- **AC-M05.1** — Given a payslip line (PF, ESI, PT, TDS, LOP, arrear), when Meera chooses to share its derivation, then the employee receives a view of their own record naming the rule, the inputs ("EPF wages ₹15,000 — ceiling applied"), the rule version's effective date and, for LOP, the dates and the day-rate method.
- **AC-M05.2** — Wherever the derivation names a form, both vocabularies appear — Form 130 / Form 16, Form 124 / Form 12BB (EV-050).
- **AC-M05.3** — The shared view exposes no other employee's data and no more than the last four Aadhaar digits (FR-CHR-105 floor).
- **Negative** — the derivation is rendered from the engine's lineage (§14), never typed and never model-generated (§03.12 principle 2).

**US-M06 · A calendar that chases every date and admits what it does not know** · Job: JTBD-M4 · Exercises: FR-PAY-710; §06.11 · Release: R1
*As* the operator, *I want* every obligation for each registration on one calendar, with its due date, its citation and an alert early enough to act, *so that* I can take a day off in the first fortnight.
- **AC-M06.1** — Given a tenant with one PF code, one ESI code, a Maharashtra PTRC and a TAN, when the calendar renders wage month August 2026, then it shows the TDS deposit on 7 September (the 1961-Act date, r.218 unread — §06.11), the ECR and challan and the ESI contribution on 15 September, and the PT return on the frequency Maharashtra assigned to that registration, ingested rather than derived (§06.11).
- **AC-M06.2** — A due date held as a parameter with nothing captured renders as "unconfirmed" with its owner, never as a guessed day (§06.11 rule 4).
- **AC-M06.3** — Alerts fire at the tenant-set lead time `calendar.alert_lead_days` per obligation, to the operator and, while the operator is on approved leave, to her delegate (FR-CHR-086).
- **AC-M06.4** — Each entry links to its filing instance and shows its FR-PAY-711 state; an entry is green only at FILED (§03.6, JTBD-V2 table).
- **Negative** — an obligation whose threshold the tenant has not crossed does not appear; a look-back obligation (gratuity, maternity benefit) does not disappear when headcount dips inside its twelve-month window, and after that only a named approver can retire it (§03.9; §06).

**US-M07 · Initiate an exit that raises every downstream task** · Job: JTBD-M6 · Exercises: FR-PAY-801–803; FR-OPS-004 exit marking; §03.8 F&F flow · Release: R1
*As* the operator, *when* an employee resigns, *I want* one exit action to raise the F&F run, the final-wages clock, the gratuity check and the EPFO date-of-exit task, *so that* no settlement line depends on memory.
- **AC-M07.1** — Given a resignation with a last working day, when Meera records the exit, then the product creates an F&F run, starts the final-wages clock on the establishment's working-day calendar (`wages.final_settlement_working_days`; CoW s.17(2)–(3); AC-803.2), evaluates gratuity eligibility including the borderline flag (§03.2 worked edge case 3), and raises the date-of-exit marking for the approver's instruction (`SO-EXIT`, US-V07).
- **AC-M07.2** — The exit-marking task shows the date to be marked and warns that a wrong date needs a joint declaration by employer and employee to undo (EV-041).
- **AC-M07.3** — The final month's contribution window ends at the date of leaving (EV-040); an ECR line for any period after it is refused at generation.
- **Negative** — the exit is not held for member-detail or Aadhaar updates, which marking does not need (EV-041; AC-802.1).

**US-M08 · Constitute the Grievance Redressal Committee when the 20-worker latch fires** · Job: JTBD-M4, JTBD-M5 · Exercises: §06.1 latch; FR-PAY-1004 AC-1004.2 · Release: R1
*As* the operator, *I want* to be told when headcount crosses 20 workers that a committee is owed, with a template and a register entry, *so that* a documentary obligation is not first discovered at an inspection.
- **AC-M08.1** — Given an establishment whose count in workers reaches 20 (IR Code s.4; EV-057), when the count is recomputed, then a non-payroll task "constitute and minute a Grievance Redressal Committee" is raised, with composition fields drawn from the appropriate Government's rules held as rule data.
- **AC-M08.2** — The count uses the statute's own unit and sphere (EV-057 schema fields); an establishment with 22 employees of whom fewer than 20 are workers under the counting rule does not receive the task.
- **AC-M08.3** — The EPF tasks for a 20-crossing (AC-1004.2) are raised separately, on EPF's own count; the two never share a threshold field.
- **Negative** — composition and disposal timelines are never hard-coded; where the state's rule data is not captured, the task says so and routes to §20.

**US-M09 · A status Meera can put in front of the founder** · Job: JTBD-M5 · Exercises: FR-PAY-710; FR-OPS-001 AC-001.4 · Release: R1
*As* the operator, *I want* the same status board the founder sees, exportable as a dated one-page summary, *so that* my review with him is the board, not my recollection.
- **AC-M09.1** — The export shows, per registration and obligation, the FR-PAY-711 state, the acknowledgement references (return file ID and TRRN — EV-036; Return Receipt Number — EV-051) and the export date.
- **AC-M09.2** — Meera's board and Vikram's are one dataset at two altitudes (§03.12 principle 7); no tile is green on one and amber on the other.
- **Negative** — the export shows each filing's submission mode and never labels an employer-attended filing as submitted by the vendor (§23 FR-LEG-034 AC2).

**US-M10 · Fix what the approver returned, and only that** · Job: JTBD-M2 · Exercises: FR-PAY-301 M7, M3, M4; §03.6a return codes · Release: R1
*As* the operator, *when* the approver returns the run, *I want* his reason and the lines he disputed in front of me, *so that* I fix that input and re-present without re-explaining the rest.
- **AC-M10.1** — Given a run returned under a reason code (§03.6a), then Meera's queue shows the code, the note and the employees or lines the approver selected; a prior approval, if any, is void and kept (M7).
- **AC-M10.2** — When the run is reprocessed and re-presented, the new artefact carries a "changed since returned" block listing the employees whose figures moved and by how much.
- **Negative** — re-presenting an unchanged run under the same reason code is refused unless Meera records why no change was needed.

**US-M11 · See a mid-year joiner's missing prior-employer income in September, not in March** · Job: JTBD-M1; serves JTBD-S3 · Exercises: §07 Form 122 intake (FR-CHR-018); FR-PAY-205 · Release: R1 (A-10)
*As* the operator, *I want* a mid-year joiner's previous-employer income collected on Form 122 (ex-12B/12BAA — EV-050) as a tracked item with a "not furnished" state, *so that* the year-end TDS gap is visible while there are months left to spread it.
- **AC-M11.1** — Given a joiner whose date of joining falls after the Tax Year starts, the intake raises a Form 122 task for the four figures an incumbent's declaration form captures — income after exemptions, tax deducted, professional tax and EPF with the previous employer (r3/02 finding 21, vendor documentation read).
- **AC-M11.2** — Given the task is open at the joiner's first run, the record shows "not furnished" and the TDS projection is labelled "prior income not furnished", visible to the employee and to Meera.
- **AC-M11.3** — The figures are the employee's declaration, which the employer cannot verify; the product records them as declared.
- **Negative** — a missing Form 122 never blocks salary or the joiner's first ECR line.

**US-M12 · Take existing employees through consent on migration** · Job: JTBD-M1 · Exercises: Part E-12; §07 migration consent flow; FR-LEG-002 · Release: R1
*As* the operator of a tenant migrating from another system, *I want* every existing employee taken through the consent flow rather than inheriting consent from the incumbent, *so that* our first month does not rest on consent nobody can produce.
- **AC-M12.1** — Given a migrated roster, each employee's consent state is "not captured" until the employee acts; the SPDI written-consent set — financial information such as bank details, and any biometric enrolment — is captured separately from everything else (Part E-12; EV-060, provenance caveat).
- **AC-M12.2** — The notice text comes from a counsel-cleared template whose version is stored on each consent record (FR-LEG-002).
- **AC-M12.3** — Non-responders appear in Meera's queue with the path §07 applies to them and the date it applies from.
- **Negative** — no bulk action records consent on employees' behalf; consent cannot be backfilled (Part E-12).

**US-M13 · Keep the Internal Committee constituted from employee one** · Job: JTBD-M4, JTBD-M5 · Exercises: §06.1; §10 complaint workflows · Release: R1 (task and documents)
*As* the HR generalist, *I want* the product to treat the POSH Internal Committee as owed by every employer, *so that* a 15-person firm does not believe it is exempt.
- **AC-M13.1** — At tenant activation, every employer receives the task to constitute an Internal Committee (POSH Act s.4(1); EV-056), with its members and their terms recorded as an effective-dated fact.
- **AC-M13.2** — Where the employer has fewer than ten workers, the product explains the Local Committee route of s.6(1) — the committee for workplaces with no Internal Committee because the employer has fewer than ten workers — and that it is not an exemption from s.4(1) (EV-056).
- **AC-M13.3** — A member's exit (US-M07) raises a reconstitution task on the same day.
- **Negative** — no copy anywhere calls the ten-worker line an exemption (EV-056).

**US-M14 · Publish the Equal Opportunity Policy the establishment owes** · Job: JTBD-M5 · Exercises: §10 FR-T-D006; EV-077 · Release: follows FR-T-D006 (§10, v1.5)
*As* the HR generalist, *I want* the EOP drafted from the CCPD template in the variant our size requires, *so that* we publish the policy every establishment owes (RPwD s.21) without commissioning one.
- **AC-M14.1** — Below twenty employees the facilities-and-amenities variant of Rule 8(4) is drafted; at twenty or more, the Rule 8(3) content, and crossing twenty raises the upgrade task (EV-077; FR-T-D006).
- **AC-M14.2** — The s.21(2) registration step is a document and correspondence task, because there is no portal and no prescribed form for private establishments (EV-077).
- **Negative** — the product never describes the EOP or any AI control as "legally required AI compliance" (Part D-18); the EOP is required, the AI controls are defensibility (§10; §23).

**US-M15 · Answer a disability-discrimination complaint inside its clock** · Job: JTBD-M3 · Exercises: §10 FR-T-D008, FR-T-D002; EV-076 · Release: follows FR-T-D008 (§10, v1.5)
*As* the HR generalist at a firm of twenty or more persons, *I want* a complaint to open a case with its two permitted exits and the evidence already assembled, *so that* the written response is possible at all.
- **AC-M15.1** — The case offers exactly two exits — initiate action, or a written reasoned response on how the act was a proportionate means of achieving a legitimate aim — and shows the Commissioner's 60-day disposal clock, 30 in exceptional cases (EV-076; FR-T-D008).
- **AC-M15.2** — The case pulls the decision snapshots FR-T-D002 keeps and places them under a retention hold (§23 FR-LEG-026).
- **Negative** — the internal response target is the parameter `rpwd_response_target_days` (FR-T-D008); the product never presents it as a statutory deadline.

**US-M16 · Issue the appointment letter in the form the state prescribes** · Job: JTBD-M1 · Exercises: §03.2 onboarding item 3; §07; A-19 · Release: R1 for states whose form is captured (A-19)
*As* the HR generalist, *I want* each joiner's appointment letter generated in the state's prescribed form once the establishment has ten or more workers, *so that* the letter an inspector asks for exists from day one (S2).
- **AC-M16.1** — The obligation latches when the establishment's count, in workers, reaches ten (OSH Code s.6(1)(f); EV-057), and every worker who joined after that date without a letter appears on the JTBD-V2 status tile.
- **AC-M16.2** — Where the state's form is captured, the letter is generated in it and recorded in the letter register; where it is not, the joiner's letter task is fenced with its blocker, never generated from the central text (A-19; K-18).
- **Negative** — a 9-worker establishment that has never reached ten is never chased for letters; when a count dips below ten, letters already owed stay on the tile, and whether later joiners are owed one follows the latch rule §06 records for this obligation (none captured), decided by a named approver rather than switched off silently (§03.9).

**US-M17 · One list of everything owed, with a name against each** · Job: JTBD-M4, JTBD-M5 · Exercises: §03.1a work item; FR-CHR-086 escalation · Release: R1
*As* the operator, *I want* every open act in the tenant — mine, the employees', the managers', the approver's and the ones that are ours — in one list with its holder, its due moment and what it holds, *so that* I chase people rather than rediscover obligations.
- **AC-M17.1** — The list shows every work item in OPEN, WAITING or BLOCKED with its kind, holder, `due_at` and blocking class, filterable by holder and by what it holds, and each row states the consequence of not doing it in registered wording (§03.1a).
- **AC-M17.2** — Items held by our statutory desk (routing rule 6) appear with our name as the owner and their blocker, and offer the operator no action — she is never asked to fix what she cannot.
- **AC-M17.3** — An item whose role has no holder appears on the role readiness report with what it will block, not silently unassigned (routing rule 8; §03.1 role readiness).
- **AC-M17.4** — The list carries no Aadhaar digits beyond the last four, no credential or OTP, and no consent or health status outside §07's scope rules.
- **Negative** — there is no bulk close: assign and remind exist, closure needs each item's own evidence (AC-WI.5).

#### The pre-payroll checklist — default items and what each one feeds

US-M01 closes inputs against a checklist. The default list below takes the incumbent's eighteen items (r3/02 finding 1, greytHR documentation read) as its starting point and binds each to the product object it checks and to the variance-bridge row (§03.6a section C) it feeds, so that every driver the approver sees has a closed input behind it. "Statutory" items can be waived for a month with a reason but never removed (AC-M01.3).

| # | Item | Checks | Feeds bridge row | Statutory |
| --- | --- | --- | --- | --- |
| 1 | Previous month locked | FR-PAY-301: the prior payroll month is at LOCKED or later | — (the bridge's starting point) | Yes |
| 2 | Joiners added | Every joiner's intake fans out (§03.2 worked edge case 1); UAN and ESI IP chase tasks open or done | Joiners | Yes |
| 3 | Separations recorded | Every exit has an F&F run and an `SO-EXIT` task (US-M07) | Leavers | Yes |
| 4 | Confirmations applied | Probation outcomes effective-dated (§07.3.2) | Revisions | No |
| 5 | Employee data updates checked | Pending maker-checker requests on statutory fields are decided (FR-CHR-084) | — | Yes |
| 6 | Payment details verified | Bank changes checked and penny-dropped (§07 matrix) | — | Yes |
| 7 | Salary revisions approved | Revisions effective in the period have cleared maker-checker | Revisions; Arrears | Yes |
| 8 | One-time payments entered | Incentives and bonuses for the period | One-time payments | No |
| 9 | One-time deductions entered | Recoveries within the Code on Wages deduction ceiling (FR-PAY-403) | Recoveries | No |
| 10 | Other salary changes entered | Anything not above, with a reason | One-time payments | No |
| 11 | Loans and advances updated | Instalments due in the period | Recoveries | No |
| 12 | Salary holds decided | Employees on hold have a recorded reason | Headline "on hold" | No |
| 13 | LOP and leave without pay closed | Attendance exceptions cleared (US-M02); LOP days per employee with the day-rate method | LOP; LOP reversals | Yes |
| 14 | Arrears computed | Arrears batches against their periods' rule versions (FR-PAY-401) | Arrears | Yes |
| 15 | Full-and-final settlements ready | F&F runs for the period's leavers presented or scheduled (`SO-OFFCYCLE`) | — (their own artefacts) | Yes |
| 16 | Reimbursement claims decided | Claims approved or rejected for the period | Reimbursements | No |
| 17 | Tax declarations locked for the period | Declarations and regime elections as of the period (FR-PAY-205) | Declaration or regime changes | Yes |
| 18 | Declaration data exported | The declaration snapshot the TDS projection used, downloadable | — | No |

A tenant may add items; each added item names the product object it checks, or it is a manual confirmation recorded with its owner.

#### Success criteria (what "it worked" looks like to Meera)

| Criterion | Target | How measured |
| --- | --- | --- |
| Onboarding cycle time | < 60 min per joiner, single flow | Time from intake start to "ready for first payroll" |
| Onboarding completeness | 100% of applicable mandatory artefacts (1, 2, 3, 8) present, or under an open chase task, before the first statutory artefact that needs them; salary never blocked; Aadhaar never in the mandatory set | Readiness audit |
| Attendance-to-payroll handoff | Zero manual re-keying | Count of manual edits after lock |
| Payslip escalations to founder | ~0/month | Escalation log |
| Statutory dates missed | 0 | Compliance calendar status |
| Employee self-serve rate | > 80% of leave/balance/payslip queries deflected | Query deflection metric |

#### Day-in-the-life

**07:40** — On the auto to office, clears the WhatsApp HR group on her phone: three leave requests, one "payslip not received," one "what's my PF number." Taps *approve* on the two leaves that are within balance; the third she flags because the person is already at −2 LOP.

**09:30** — Two joiners today. Old way: 40 minutes each across UAN portal, ESIC portal, a Word appointment-letter template, and a bank form. She wants this to be one intake that fans out to the nine artefacts above.

**11:00** — Cut-off is the 25th; today is the 22nd. She opens the biometric export for the plant staff (14 people on an eSSL device) and starts reconciling against the leave sheet. Two punches are missing — device was offline on the 18th. She messages the supervisor for manual regularisation, aware that a silent miss becomes an unwarranted LOP deduction.

**14:30** — Founder pings: "Are we clean on PF for the quarter?" She does not actually know; she forwards it to CA Anjali and waits, feeling exposed. *This is JTBD-M5 and JTBD-M4 failing simultaneously.*

**16:00** — An employee resigning next month asks about gratuity — he's completed 4 years 9 months. She isn't sure whether the 4-years-240-days line applies. She parks it (see worked edge case 3).

**18:15** — Before leaving she sets three phone reminders: ECR on the 15th, PT, TDS on the 7th. The system of record for statutory dates is her phone's clock app.

**What the product must change:** collapse 09:30 into a single intake, make 11:00 a device-push reconciliation with exception-only review (per the §09 ADMS receiver), turn 14:30 into a dashboard she owns, and replace 18:15 entirely with a maintained compliance calendar.

---

### 03.2a The joiner intake as a specification — dependency, sequence and the two consent regimes

§03.2's worked edge case 1 lists the nine fan-outs of one intake and states the acceptance rule: the intake tracks each to done, a missing artefact never blocks salary, and items 1, 2, 3 and 8 are the mandatory subset. That is the requirement. This subsection is the build detail behind it — what each artefact gates, when it is first needed, what the operator and the employee see while it is missing, how it is chased, and how the intake behaves on either side of the consent switch of on or about 13 May 2027. Every row here is a work item of §03.1a, so each carries a kind, a class, a holder and a blocking class; the rules the items enforce belong to §07 and are cited, not restated.

#### What each intake artefact gates

"Mandatory" means the item holds a downstream statutory artefact, not that it holds pay. The table states the hold precisely, because "mandatory" used loosely is how a product ends up withholding somebody's salary over a nomination form.

| # | Artefact | Kind · class · holder | Gates | Effect while it is missing | Blocking class |
| --- | --- | --- | --- | --- | --- |
| 1 | UAN — activated by the employee in UMANG; employer-side generation only for International Workers and citizens of Nepal and Bhutan | `UAN_ACTIVATION` · CHASE · the employee | The member's ECR line | The line is held out of the Regular return; the member is paid in full; the operator and the employee are both notified | B1 |
| 2 | ESI IP registration | `ESI_IP_REGISTRATION` · CHASE · operator, with the employee's particulars | The member's ESI return line | As item 1, on the ESI artefact | B1 |
| 3 | Appointment letter in the form the appropriate Government prescribes, owed by an establishment of ten or more workers (OSH Code s.6(1)(f); EV-057) | `APPOINTMENT_LETTER` · RESOLVE · operator | The letter register and the inspection pack (US-I01) | The joiner is listed on the JTBD-V2 status tile as owed a letter; where the state's form is not captured the item is fenced with its blocker and no letter is generated from central text (K-18; A-19) | B0 |
| 4 | Bank account and IFSC — financial information, so a written-consent record precedes collection (SPDI r.5(1); EV-060) | `BANK_CONSENT` · CHASE · the employee | The bank payout line, not the pay | Without a live grant the field takes no input (FR-CHR-114); the employee is paid by the tenant's `non_bank_disbursal_mode` and the choice is recorded with its actor (FR-CHR-102) | B1 on the payout file |
| 5 | PAN; **Aadhaar optional**, with only its seeding status tracked | `AADHAAR_SEEDING` · CHASE · the employee, where the employee chooses to seed | Nothing, by construction | Exclude-and-flag on the affected artefact with notices to operator and employee, never a payroll block, and no "no Aadhaar, no payroll" configuration ships (FR-CHR-101; Part D-10) | B1 on one line, at most |
| 6 | EPF and EPS nomination | `EPF_NOMINATION` · CHASE · the employee | Nothing in the month | A warning on the joiner's readiness; a missing nominee does not break the first ECR | B0 |
| 7 | Gratuity nomination, owed once the employee completes one year of service (CoSS s.55) | `GRATUITY_NOMINATION` · CHASE · the employee | Nothing in the month | Raised on the service anniversary rather than at joining, so it does not sit open for a year; the prescribing Government and the form number are rule data (§20) | B0 |
| 8 | Investment declaration and regime election — Form 124, ex-12BB (EV-050) | `DECLARATION` · CHASE · the employee | The TDS projection's inputs | The default regime applies and every projection is labelled as computed on the default, visible to the employee (US-R04) | B0, with a rupee consequence |
| 9 | Previous-employer income and prior TDS — Form 122, ex-12B and 12BAA (EV-050) | `PRIOR_EMPLOYER_INCOME` · CHASE · the employee | Nothing; it improves the projection | "Not furnished" on the record and on the projection, so the year-end gap is visible while months remain to spread it (US-M11) | B0 |

**Threshold-awareness is part of the intake, not a later filter.** Each row is raised only where the employer owes it for that employee: item 1 where the establishment is EPF-covered or has opted in; item 2 where the employee's wage is inside the ESI coverage gate; item 3 once the establishment's count in **workers** has reached ten (EV-057); item 7 on the service anniversary. A 25-person tenant is never chased for an artefact it does not owe, and an establishment that has never reached ten workers is never chased for letters (AC-M16.1, negative case).

<!-- DIAGRAM: personas-jtbd-intake-dependency -->

#### When each is first needed

The due moment is derived from the month the joiner first appears in, not from a fixed number of days after joining. The anchors are August 2026's (§03.8a).

| Artefact | First needed at | Basis | If it arrives later |
| --- | --- | --- | --- |
| 4 — bank consent and details | The bank file's generation at lock (M8) | Derived from the pay group's planned pay date | The employee is paid by the alternative mode for that month; the next unreleased disbursal uses the account once the grant exists (FR-CHR-102) |
| 8 — declaration and regime election | The first payroll of the Tax Year for the election; the first run for the declaration | Statutory frame for the election; tenant for the declaration window | The election gate closes at the Tax Year's first payroll (US-R04); the declaration re-projects from the month it arrives |
| 1 — UAN | ECR generation for the first wage month the member is covered in (F4) | Derived from the ECR due date, 15 September for August | The member's line goes on a Supplementary return, which may contain only members absent from every prior return for that month (EV-037), and s.7Q interest is mandatory with the contribution (EV-039) |
| 2 — ESI IP number | The ESI artefact for the same month | Derived from the ESI due date | As item 1, on the ESI route |
| 3 — appointment letter | The register's next production, and any inspection (US-I01) | Documentary, not monetary | The gap is dated: the register shows when the letter was owed and when it was issued |
| 9 — prior-employer income | The joiner's first TDS projection | Derived | The projection re-computes and the spread shortens; a March arrival is the failure US-M11 exists to prevent |
| 6 — EPF and EPS nomination | No month gates it | — | It stands open with its age on the readiness view |
| 7 — gratuity nomination | The service anniversary | CoSS s.55 trigger | Raised then, not at joining |
| 5 — Aadhaar seeding, where chosen | Only where a filing needs seeding | Employee's own choice | Exclude-and-flag, with the m+4 window tracked on the exclusion (EV-038; FR-CHR-101) |

#### The chase ladder for intake items

Intake items are almost all class `CHASE` held by the employee, which is the hardest holder to reach and the one the product has least leverage over. The ladder is §03.1a's, with three intake-specific rules.

| Rule | What it means |
| --- | --- |
| The employee's own channel only | Reminders reach the employee, never the employee's manager, and no manager view shows an intake item's status (FR-CHR-122's rule, applied to the whole intake) |
| The consequence is stated in the reminder, in the employee's own terms | "Your August PF contribution cannot be filed against your account until your UAN is activated" — not "task overdue". The consequence text is templated, and the employee-facing wording is cleared like any other customer-facing statement (§23) |
| The employer's chase never becomes a condition of employment or pay | No intake item may be configured to withhold salary, a benefit or a document the employee is owed; this is the same bar FR-CHR-101 sets for Aadhaar and it applies to every row (Part D-10) |

Where an item stays open past the artefact it gates, the operator sees the exclusion and its consequence (AC-701.2), the employee sees a notice saying what was left out and how to fix it, and the item keeps its age. Nothing auto-closes.

#### The two consent regimes at the intake

The intake is where the product's consent posture is visible to a human, and it changes shape once on or about 13 May 2027. §07 owns the consent record, its lifecycle and its purpose catalogue (FR-CHR-100, FR-CHR-114, FR-CHR-115); §23 owns the counsel questions. What belongs here is what the persona does, and what the intake must never say.

| | Today, and until on or about 13 May 2027 | On and after commencement |
| --- | --- | --- |
| The governing instrument for the sensitive set | SPDI Rules 2011 r.5(1) — consent in writing before collecting sensitive personal data; r.3 classes biometric information and financial information as sensitive (EV-060, provenance caveat — pull from the primary source before customer use) | DPDP s.7(i) disapplies consent **and** notice for employment purposes only, and does not disapply the s.8 duties (EV-058 — [Verified — mirror] for G.S.R. 843(E); pull from the primary source before customer use) |
| What the intake captures for bank details and any biometric enrolment | A written-consent record per purpose, with its notice-text version and whose artefact it is | The same record continues to be captured; whether it is still required is a counsel question, and both possible answers are dangerous to state (Part D-1, D-4, D-12) |
| What the intake captures for everything else | A notice acknowledgement, not recorded as consent-as-basis | Unchanged |
| What changes for the employee's experience | — | Nothing at the switch: no record is rewritten, re-dated or discarded, and both regimes run concurrently across the date (Part E-6; FR-CHR-100) |
| What changes for a migrating tenant | Consent cannot be backfilled: existing employees go through the migration consent flow, and imported written evidence keeps its original date and provenance (Part E-12; FR-CHR-102; US-M12) | Unchanged |

Four sentences the intake, its notices and its help text never contain, in either regime:

1. **"No employee consent is needed for employment data."** DPDP s.7(i) is not in force, and when it commences it reaches consent and notice only, not the s.8 duties (EV-058; K-03).
2. **"This is sensitive personal data under DPDP."** DPDP creates no sensitive category (s.2(t); EV-059). Where sensitivity is the point, the citation is SPDI r.3 (Part D-19).
3. **"Aadhaar / biometric enrolment is required to be paid."** Never shipped as copy or as configuration (Part D-10; FR-CHR-101; US-R06, US-R07).
4. **"We will file this for you."** The intake's artefacts feed a portal-accepted artefact plus attended, assisted filing under written authority, with the employer's liability non-delegable (EV-030; K-13; §22, §23).

#### Worked example — J's intake on 1 August 2026

J joins Vikram's Pune firm on 1 August 2026 on ₹50,000 — Basic ₹15,000, HRA ₹7,500, conveyance ₹5,000, commission ₹22,500 (§03.6a). Eight of the nine rows are raised, not nine: his gross is outside the ESI coverage gate, so item 2 is not owed, and item 7 will be raised on 1 August 2027.

| Date | Event | Items |
| --- | --- | --- |
| 1 August | Intake completed in one flow | Items 1, 3, 4, 5, 6, 8 and 9 raised with their holders and due moments; item 2 not raised; item 7 scheduled |
| 1–5 August | J activates his UAN in UMANG and reads the bank-details notice, granting in writing | Items 1 and 4 close on the recorded UAN and the GRANTED consent record (FR-CHR-115 CN3) |
| Before the cut-off | Meera issues the appointment letter in Maharashtra's prescribed form and registers it | Item 3 closes on the register entry |
| Cut-off, then M2 | Inputs close with checklist item 2 — joiners added — closed | No intake item holds M2 |
| M6 and M8 | Vikram approves and locks; J appears in section C's joiners row at +₹50,000.00 gross and +₹48,000.00 net | — |
| 15 September | August's ECR carries J's line: EPF wages ₹15,000, employee PF ₹1,800.00, employer EPS ₹1,250, employer EPF ₹550, EDLI ₹75.00 | Item 1 had to be closed before F4, and was |

Had each item been open on its due moment instead:

| Open item | What August looks like | What it costs |
| --- | --- | --- |
| 1 — UAN | J is paid ₹48,000.00 net on time; his line is left out of the Regular return with notices both ways | His August contribution reaches his account only on a Supplementary return, permitted because he was absent from every prior return for that month (EV-037), with s.7Q interest mandatory with the contribution (EV-039) |
| 4 — bank consent | J is paid by the tenant's alternative disbursal mode; section B of the artefact shows him under "on hold or non-bank" | No statutory effect; an operational one, recorded with its actor |
| 8 — declaration | The default regime applies and the projection is labelled as computed on it | A March true-up the employee did not expect — the §03.3 worked example 3 failure, seen from the joiner's side |
| 3 — letter | The status tile lists him as owed a letter from the date the establishment reached ten workers | The gap an inspector reads in the register (S2; US-I01) |
| 5 — Aadhaar declined | Nothing changes anywhere except that his exclusion register entry is absent, because no filing of his needed seeding | Nothing. This is the row that must cost nothing, by design |

#### Edge and negative cases

- **A joiner who leaves before his first payroll.** Every open intake item goes VOID under TK9 with its reason; the letter item survives only if the letter was already owed and issued, because the register must show what happened.
- **A rejoiner with a prior UAN.** Item 1 becomes a prior-UAN capture with the Form 11 declaration rather than an activation chase, and the product never creates a second UAN (§07).
- **An International Worker.** Item 1 takes the employer route, and the PF wage basis is the parameter §07 names rather than the ₹15,000 ceiling by default (§03.3 worked example 1c).
- **A mid-month joiner in a month already locked.** The intake still completes; the pay effect lands in the next run as a joiner with a part-month, and the ECR line follows the month his coverage begins.
- **An intake completed by the CA's junior for a CA-run client.** The items are the client's; the holders resolve to the client's people, and the CA appears as `raised_by`, never as the holder of an employee-held item (§03.1 rule 3).
- **A tenant asking to make item 6 or 7 blocking.** Refused: blocking class is a property of the kind, not a tenant setting (§03.1a).

#### Test scenarios

| # | Given | When | Then | Traces |
| --- | --- | --- | --- | --- |
| IT1 | A joiner at a gross above the ESI coverage gate | The intake completes | No ESI IP item is raised; the readiness view does not show him as ESI-incomplete | Threshold-awareness |
| IT2 | A joiner at an establishment of nine workers | The intake completes | No appointment-letter item is raised; when the count reaches ten, letters owed from that date appear | EV-057; AC-M16.1 |
| IT3 | A joiner who declines to give bank details a written grant | Payroll runs | He is paid by `non_bank_disbursal_mode`, the decision is recorded with its actor, and the bank field still takes no input | FR-CHR-102; FR-CHR-114 |
| IT4 | A joiner with no UAN at F4 | The ECR is generated | His line is held, both notices go out, the run and the payout are unaffected, and the m+4 window is tracked | B1; EV-038 |
| IT5 | An intake reminder due for an employee-held item | The ladder runs | It reaches the employee's own channel only; no manager sees it | FR-CHR-122 |
| IT6 | An intake screen rendered on 13 May 2027 | — | Consent capture is unchanged, existing records keep their regime and dates, and no copy changes to say consent is no longer needed | Part E-6; K-03 |
| IT7 | Help text drafted with the phrase "sensitive under DPDP" | Copy review runs | Rejected; the citation is SPDI r.3 | Part D-19; EV-059 |
| IT8 | A tenant configuration attempting "no Aadhaar, no salary" | The setting is saved | No such setting exists to save | Part D-10; FR-CHR-101 |
| IT9 | A joiner who resigns before his first run | The exit is recorded | Open intake items go VOID with reasons; nothing is silently deleted | TK9 |
| IT10 | A gratuity nomination item | The employee completes one year | It is raised on the anniversary, not at joining, and carries its trigger on its face | CoSS s.55 |

---

### 03.3 P2 — Suresh, the payroll officer / accountant

> "The number is either right and filed on time, or it is a legal problem with my name on the maker field."

#### Context

Suresh, 41, is Accountant / Payroll at a 140-person manufacturing-services firm in Coimbatore. In firms below ~80 this role does not exist as a separate seat — the founder's CA or Meera does it. Above ~80 a dedicated payroll owner appears, usually someone from Finance who inherited payroll because he already ran Tally and TDS. He thinks in *challans and returns*, not in employee experience. He is the "maker" in a maker-checker world; the CA or CFO is often the "checker."

He is precise, conservative, and deeply suspicious of any tool that computes a statutory number he cannot audit line by line. He has been burned by a mid-year software switch that broke YTD TDS. He keeps a parallel Excel "shadow payroll" to sanity-check any system output — and will keep it until the system earns trust. Reducing Suresh's *Anxiety* (in the §03.8b forces sense) is therefore worth more than any feature: the shadow-Excel is the physical form the switching Anxiety takes.

#### Goals

1. **A payroll run that ties out to the paisa** and reconciles to the bank debit, the ECR, the ESI challan, the PT statement and the TDS challan — all from one run.
2. **Artefacts generated in the exact machine format** the portal accepts on the first upload — ECR text file (EV-035), ESI contribution template, Form 138 (ex-24Q) with the correct annexure layout (EV-047, EV-051), the return's control statement (Form 27A under the old rules), PT return per state — ready for an attended filing run, not submitted by software on its own (EV-030). (Source: Form 138 Q1–Q3 format shipped 22 Jul 2026 and the Q1–Q3 correction formats 4 Aug 2026, per r2/10's line-by-line re-verification against Protean's release note; the Q4 format is not released and Protean publishes no date for it — EV-046; §06) **[Verified]** that these formats are exacting and, for TDS, mid-migration.
3. **Arrears and retro runs that recompute correctly** against the rule version in force *for the period being corrected* — not today's rules. This is the §14 requirement for versioned, effective-dated, retrospectively-recomputable wage rules, felt by a human.
4. **A defensible audit trail** — who changed what, when, and against which rule version — because an inspector or auditor will ask.
5. **Kill the shadow Excel** — but only once he trusts the engine.

#### Pains

- **Two wage bases on one payslip.** The §06 50%-add-back rule (Code on Wages s.2(y) / CoSS s.2(88)) means the PF/gratuity base and the equal-pay/payment-of-wages base diverge. Suresh currently reconciles this by hand and it is error-prone and slow. (Source: CoW s.2(y), CoSS s.2(88), identical text; §06) **[Verified]** that the statute mandates it.
- **Three ceilings that all differ.** EPF wages cap at **₹15,000/month** for the statutory-minimum contribution and the EPS split; ESI applies to gross wages up to **₹21,000/month** (₹25,000 for persons with disability); and the bonus eligibility and calculation ceilings engines hard-code (₹21,000; ₹7,000 or the minimum wage) are the repealed 2015 Bonus Act figures — Code on Wages s.26 delegates both to "the appropriate Government" and no notification was located, so they are state-divergent configurable parameters (§06, §20). A person crossing ₹21,000 mid-year stays in ESI to the end of the running contribution period (1 April–30 September or 1 October–31 March), not mid-period — a rule Suresh must apply by hand today. (Source: EPF wage ceiling re-fixed at ₹15,000 under CoSS s.2(89) by S.O. 2702(E); ESIC coverage and contribution pages; CoW s.26; §06) **[Verified]** on the EPF and ESI ceilings and the period rule as ESIC publishes them today — the ESI regime after 22 November 2026 is unresolved (§06.9; §20 V-08); **[Hypothesis]** on any bonus figure.
- **Mid-year joiners with previous-employer income.** Getting salary TDS right under s.392 (ex-s.192 — EV-050) for a person who joined in September requires ingesting prior salary, prior TDS, and their regime election (old vs new; the new regime is the default absent an election — Income-tax Act 1961 s.115BAC(6), whose 2025-Act section number is not yet verified). Get it wrong and the employee under- or over-pays and blames payroll at year-end.
- **The Form 138 transition.** 24Q is being replaced by Form 138 with a *breaking* record layout (challan 301–312 → A–K, 303 deleted; Annexure I 313–327 → C–N with 313/321/322/325 removed; Surcharge, Education Cess and Penalty/Others deleted, Interest Allocation and Others Allocation added — EV-051; r2/10 finding 8), and **the Q4 regular format is not released** (EV-046). Form 130 (ex-Form 16) is TRACES-generated only (EV-048), and its salary detail depends on the missing Q4 Annexure II, so the annual certificate cannot be completed until Q4 lands (EV-046). (Source: §06; Protean format releases 22 Jul / 4 Aug 2026) **[Verified]** He needs a tool that tracks these format versions so he does not upload a rejected file.
- **State PT and LWF divergence.** A multi-state employer (say Karnataka + Tamil Nadu + Maharashtra) has three PT regimes and different LWF schedules. Suresh maintains this by memory and a dog-eared reference. The dataset is largely un-built and aggregator data is disputed — primary-source verification exists for only a handful of states (§06; §20 V-09) — so his pain is the product's data dependency. It is also a **genuine differentiator**: neither incumbent carries it. Frappe HR v16 contains no Indian state name anywhere in its tree (EV-031 — round-three repository read, not executed) and TallyPrime has no state PT slab table and no LWF engine (EV-032 — product documentation read, not executed; whether any commercial add-on closes the gap is one of EV-032's four unresolved cells). **[Hypothesis]** on the dataset's current accuracy; **[Verified]** that the divergence exists and that both incumbents leave it greenfield.
- **Reconciliation to the bank file.** The salary NEFT/RTGS batch, the payslip totals, and the statutory challans must all reconcile. A ₹ mismatch means a late-night hunt.
- **No trust without transparency.** Any number the system produces that he cannot trace to a rule and an input, he will not sign.

#### Jobs-to-be-Done

- **JTBD-S1 (functional):** *When* I close a pay period, *I want to* produce every statutory file in first-upload-clean portal format from the same locked run, *so I can* file without a rejection round-trip.
- **JTBD-S2 (functional):** *When* I run arrears for a backdated hike, *I want to* recompute against the rules in force for those months, *so I can* be correct rather than convenient.
- **JTBD-S3 (functional):** *When* a mid-year joiner arrives, *I want to* ingest prior-employer income, TDS and regime choice, *so I can* deduct salary TDS under s.392 (ex-s.192) correctly for the year.
- **JTBD-S4 (emotional):** *When* an inspector or auditor asks how a number was derived, *I want to* show the rule version and inputs, *so I can* defend it in minutes, not days.
- **JTBD-S5 (emotional):** *When* the engine has run clean for three months, *I want to* retire the shadow Excel, *so I can* stop doing payroll twice.
- **JTBD-S6 (functional):** *When* the portal renders its own version of my return, *I want to* see it reconciled line by line against the locked run before anyone approves it, *so I can* never approve a return that cannot be cancelled (EV-036) or pay one that cannot be corrected downward (EV-037).

#### Worked example 1 — the two-wage-base payslip Suresh reconciles by hand

The §06 50%-add-back is abstract until you run a number. Take an employee on ₹50,000 gross structured as Basic ₹15,000 + HRA ₹7,500 + Conveyance ₹5,000 + Commission ₹22,500.

- **Excluded components** (for the PF/gratuity add-back base): HRA + Conveyance + Commission — heads (f), (d) and (i) of the nine in §06.10 — = ₹35,000 = **70% of remuneration**. **[Reversed]** — earlier drafts built this example on a "special allowance"; a special allowance is not an excluded head and relabelling universal pay does not move it out of wages (§06.10), so the component here is commission and every figure below is unchanged.
- The statute (CoW s.2(y) / CoSS s.2(88)) says if excluded components exceed **50%**, the excess is *deemed wages* and added back. Excess over 50% = 70% − 50% = 20% of ₹50,000 = **₹10,000 added back**.
- **Add-back base** (PF and gratuity) therefore = ₹15,000 (Basic) + ₹10,000 (deemed) = **₹25,000**, not ₹15,000.
- PF at 12% on ₹25,000 = **₹3,000**, versus ₹1,800 on ₹15,000 — a 67% jump, **but only where the employer contributes on wages above the ₹15,000 ceiling**. **[Reversed]** — earlier drafts presented the 67% jump as the general effect once the Codes bind. For a ceiling-restricted employer the PF base stays at ₹15,000 in this structure, because Basic alone already reaches the ceiling (§06.10); the add-back's bite here is the **gratuity base**, which has no wage ceiling and rises from ₹15,000 to ₹25,000. Where the employer does contribute above the ceiling, the EPS split still caps at ₹15,000: EPS 8.33% × 15,000 = **₹1,250**, balance ₹1,750 to EPF — the engine splits *after* applying the add-back, not before — and a member who joined after 1 September 2014 with wages above ₹15,000 raises EPFO's pre-filing EPS-eligibility **flag** (a flag, not a rejection — EV-040).
- Meanwhile the **payment-of-wages / equal-remuneration base** still reads the full ₹50,000 for its own purposes.

That is two concurrent wage bases on one payslip, per §06 — three, counting the gratuity base once PF is ceiling-capped. Suresh does this arithmetic by hand across the roster today; a single mis-classified allowance mis-states PF or gratuity for dozens of employees. The engine must compute each base, show the deemed-wages excess as a named line, apply the employer's ceiling election, split EPS/EPF correctly against the ₹15,000 ceiling, and let Suresh see *why* the add-back base is ₹25,000. Acceptance: the derivation drill-down names the excluded components, the 50% threshold, the add-back, the ceiling election and the EPS-ceiling split, effective-dated to the rule version. (Source: mechanism per §06; 12% per EPF Scheme 2026 as re-notified by S.O. 3582(E); the 8.33% EPS share per EPFO's EPS page) **[Verified]**. Because the statute reads "or such other per cent as may be notified," the 50% is a **standing variable, not a constant** — the permanent justification for effective-dating this rule.

<!-- DIAGRAM: wage-base-split -->

#### Worked example 1b — what the ECR file carries, and the rounding rule that breaks a naive engine

"Ties out to the paisa" (Goal 1) fails on two details a spreadsheet gets wrong. First, the ECR is not one number per member: it is an 11-field line, `#~#`-delimited, with no header row — UAN, member name, gross wages, EPF, EPS and EDLI wages, employee PF, employer EPS and employer PF contributions, NCP days, refund of advance (EV-035) — while the employer-only charges (EDLI at 0.5% of EDLI wages; EPF administrative charges) surface in the Due Deposit Balance Summary and challan after the return is approved (EV-036), not as file columns. The engine computes each contribution field independently, with EPS at 8.33% capped at the ₹15,000 ceiling (**₹1,250**). (Source: EPF Scheme 2026 S.O. 3582(E); EPFO EPS and EDLI pages; §06) **[Verified]** on the fields and the EPS/EDLI rates; the administrative-charge rate (0.50% in EPFO circulars not re-verified in our research) and the establishment minimum are configurable parameters (`epf.admin_charge_rate`; `epf.admin_charge.minimum`, §06) routed to §20. Second, **rounding conventions can differ by scheme**, and the per-scheme rule — nearest rupee or round up, per head or on the total — is **not verified in our evidence**: it ships as a configurable per-scheme, per-field parameter (`rounding_rule(scheme, field)`) routed to §20. A single "round half-up everywhere" implementation risks member lines that do not tie to the challan — trivial per head, a rejected control total across 140. Acceptance: rounding is a per-scheme, per-field rule in the engine, and the ECR and ESI totals reconcile field-by-field to the return statement and challan, not just in aggregate.

#### Worked example 1c — the International Worker and the ₹15,000 ceiling

The ₹15,000 EPF wage ceiling that caps everyone else does not work the same way for an **International Worker**. IWs remain in ECR scope (EV-045), and EPFO's revamped-ECR FAQ separates them by joining date: an IW who joined before September 2014 above the ceiling remains an EPS member and contributes on full salary, while one who joined after 1 September 2014 with wages above ₹15,000 is not an EPS member (Source: EPFO revamped-ECR FAQ; §06) **[Verified]**. The general rule that every IW's PF runs on full pay rather than the ceiling, and which countries' social-security agreements carve IWs out, are **[Hypothesis]** — not verified in our evidence and routed to statutory-counsel confirmation via §20. Kill line: if the tenant has no IW headcount and none is forecast, this rule is de-scoped from v1 and flagged rather than built. If the full-pay rule holds, a firm paying an IW ₹90,000 gross deducts 12% on the full amount (₹10,800), not ₹1,800 — a naive engine that hard-codes the ₹15,000 cap under-deducts by ₹9,000/month and produces a short ECR the moment an IW joins. (Employer-side UAN generation also survives only for IWs and Nepal/Bhutan citizens — §03.2.) This is the inverse of the add-back trap: there the base is *raised* by deemed wages; here the *ceiling itself* is removed for a class of employee. Both are why the wage-base logic must be a rule table, not a constant.

#### Worked example 2 — the multi-state PT + LWF divergence Suresh carries in his head

One employee earning ₹50,000/month, employed across three establishments in three states, generates three different professional-tax outcomes and three different LWF schedules in the *same* year:

| State | PT on ₹50,000/month | Cadence | LWF (employee + employer) | LWF cadence |
| --- | --- | --- | --- | --- |
| Karnataka | ₹200/month (salary ≥ ₹25,000), **₹300 in February** — ₹2,500 a year | Monthly return within 20 days of month-end (Form 5A, e-PRERANA) | `lwf.KA.employee`, `lwf.KA.employer` — not verified | Once a year, due 15 January (§06.8) **[Verified]** |
| Maharashtra | ₹200/month, **₹300 in February** — ₹2,500 a year (men above ₹10,000; women above ₹25,000) | Monthly deduction; return frequency assigned per registration (§06) | `lwf.MH.employee`, `lwf.MH.employer` — not verified | `lwf.MH.periodicity` — not verified |
| Tamil Nadu | `pt.TN.slabs` — slab and periodicity not verified | parameter | `lwf.TN.employee`, `lwf.TN.employer` — not verified | `lwf.TN.periodicity` — not verified |

(Source: Maharashtra MSTD PT rate schedule, block from 1 April 2023, read at primary **[Verified]**; Karnataka base slab from the consolidated Act **[Verified]**, and the February ₹300 from notification DPAL 08 SHASANA 2025 dated 15.04.2025, corroborated by several sources but the amending instrument not retrieved — medium confidence; Karnataka filing route per the state's Form 5A guidance.) Tamil Nadu PT, every LWF amount above and every LWF cadence except Karnataka's (§06.8) are **not in our evidence** and ship as parameters until §20 V-09 lands, because aggregator PT data is materially disputed (§06). Kill line for the dataset dependency: if the gazette-sourced PT/LWF dataset (§06; §20 V-09) cannot be assembled for the tenant's operating states before their first payroll, Suresh's JTBD-S1 fails in those states and the tenant must be scoped out of multi-state onboarding until it lands.

The design consequence: the February true-up (Maharashtra, and Karnataka from April 2025) and the per-state LWF cadences cannot be a per-run manual override — they must be effective-dated rules keyed to (state, period). A February payroll that emits ₹200 PT for either state is a short remittance.

#### Worked example 3 — mid-year joiner s.392 (ex-s.192) TDS with regime election (JTBD-S3)

An employee joins on 1 September (7 months remaining in the Tax Year) at ₹60,000/month, having earned ₹4,20,000 with ₹18,000 TDS already deducted at the prior employer, and elects the **new regime** (the default absent a written election):

- Projected income = prior ₹4,20,000 + (₹60,000 × 7) = ₹8,40,000.
- Less the new-regime standard deduction — `tds.standard_deduction.new` (the name §08 uses), a configurable parameter whose Tax Year 2026-27 value is not verified in our evidence (§20).
- Tax on the new-regime slabs, less the rebate where applicable, less the ₹18,000 already deducted, spread over the 7 remaining months. The slabs and the rebate (₹60,000 where taxable income does not exceed ₹12 lakh) are verified for AY 2026-27 at the Income Tax Department portal; their continuation into Tax Year 2026-27 rests on secondary reporting — **[Hypothesis]**.

Acceptance for JTBD-S3: the engine ingests prior-employer income and TDS (Form 122, ex-12B/12BAA — EV-050), applies the *elected* regime consistently, and back-fits the remaining-month deduction so the year ties out — get the regime or the prior TDS wrong and the employee faces a March shock and blames payroll. The regime election is itself effective-dated and gated: an employee may switch only before the employer runs the first payroll of the tax year, while the declaration is unlocked (vendor-documented; §08). (Source: Income-tax Act 2025 s.392 and the CBDT form mapping — EV-050) **[Verified]** on the mechanism; the 1961-Act homes of the regime default and the rebate (s.115BAC, s.87A) have no verified 2025-Act mapping yet, so labels and help carry both vocabularies (EV-050).

#### Worked example 4 — the ESI contribution-period boundary that traps a mid-year raise

ESI eligibility does not switch off the moment gross crosses ₹21,000; it holds until the end of the running **contribution period**. ESI runs two fixed contribution periods — **April–September** and **October–March** — with corresponding benefit periods (Source: esic.gov.in contribution-period table; §06). **[Verified]** Take an employee at ₹20,000 gross who gets a raise to ₹23,000 effective **1 August**:

- August gross (₹23,000) is above the ₹21,000 ceiling, but because the raise falls *inside* the April–September contribution period, **ESI continues to be deducted on the full ₹23,000 through September** — not stopped in August.
- ESI drop-out takes effect **1 October**, the start of the next contribution period.

A naive engine that stops ESI the month gross crosses ₹21,000 under-deducts for August and September and produces a short ESI return — a rejected/penalised filing. Acceptance: the ESI rule is keyed to (contribution-period, gross), continues the deduction to the period boundary, and flags the drop-out to Suresh at the boundary, not at the raise. This is the same "hold to a boundary" logic the 10-employee look-back triggers use (§03.9) — statutory thresholds in India are rarely instantaneous, and encoding them as instantaneous is a classic payroll bug. Two qualifiers keep this honest: the ₹21,000 is a **coverage gate, not a contribution cap** — once in the period, contribution runs on actual gross (§06.3) — and every value here is ESI as ESIC publishes it today, saved subordinate law whose fate after 22 November 2026 is unresolved (§06.9; §20 V-08). The contribution-period rule, ceiling and rates are therefore effective-dated rule data, not constants.

#### Acceptance criteria for JTBD-S1 (portal-clean filing)

- ECR text file matches EV-035 exactly: 11 fields in order, `#~#` delimiter, no header row, with wage month, return type, contribution rate and remark entered as portal controls rather than file content; member-wise EPF, EPS and EDLI wage and contribution fields tie to the run totals to the rupee, with EPS 8.33% capped at ₹15,000. EPFO's pre-filing conditions are mirrored as they behave on the portal — the post-September-2014 above-ceiling EPS condition as a **flag**, only the age-58 EPS rule as a hard block (EV-040).
- ESI contribution file uses correct IP numbers; employee 0.75% + employer 3.25% on the ESI-wage (gross) definition for every employee inside the ₹21,000 coverage gate — contribution runs on actual gross, not capped at ₹21,000 — a definition that *differs* from PF wages (a common error), so the two bases must be computed independently. (Source: ESIC contribution rates w.e.f. 01.07.2019; §06) **[Verified]**
- PT statement generated per *state* cadence, using the correct state slab effective for the period (including the February true-ups).
- Form 138 staged in the post-migration layout (challan A–K, remapped Annexure I — EV-051) with a version flag; **fences** Q4 finalisation behind a visible "Q4 regular format not yet released" banner rather than emitting a file that will reject (EV-046). **[Verified]**
- Control-statement totals (Form 27A under the old rules) auto-derived from the same run, not re-keyed. The control statement's Income-tax Rules 2026 form number is not in the CBDT mapping we hold (EV-050), so it is carried as a configurable label (`tds_control_statement_form`) routed to §20, with both vocabularies accepted.

#### Acceptance criteria for JTBD-S2 (arrears against period rules)

- A backdated hike effective in a prior period recomputes PF, PT, ESI and TDS **against the rule version in force for that period**, not today's. If the 50% add-back percentage or a PT slab changed between the arrear period and now, the arrear uses the old value and the current month uses the new one, in the same run.
- The arrear line is shown separately on the payslip with its own derivation and period reference, so an inspector can trace the recomputation (feeds JTBD-S4).
- PF on the arrear is dated by its **disbursal date**, not the wage month it relates to; the resulting due month and interest exposure are surfaced when the arrear batch is approved (§08). The arrear itself goes through EPFO's separate "File Arrear Return" flow, for which **no file layout is published** (EV-043) — the product fences that artefact rather than inventing a format.
- Retro that crosses a statutory boundary (e.g. an ESI-eligibility change because the arrear pushes prior gross over ₹21,000) is flagged for review, not silently applied — because ESI drop-out only takes effect at the contribution-period boundary.

#### User stories and acceptance criteria — the operator, production side

Suresh's stories take the month from the closed inputs Meera hands over (§03.2) to the receipt stored against the period. They use the story format set out in §03.2.

**US-S01 · Iterate to a run I trust, with every change explained** · Job: JTBD-S1, JTBD-S5 · Exercises: FR-PAY-301 M4, M5; FR-PAY-303 · Release: R1
*As* the operator on the production side, *I want* to process, inspect and reprocess as often as I need before approval, each result diffed against the last, *so that* I converge on a run instead of hoping for one clean pass.
- **AC-S01.1** — Each reprocess (M5) keeps the prior result version; Suresh can diff any two versions per employee and per statutory head.
- **AC-S01.2** — The variance view against the prior locked month names a driver for every employee beyond the §08 threshold (AC-303.1), and run totals equal the sum of employee figures to the rupee (AC-303.2).
- **AC-S01.3** — The driver classes are the ones the approver's bridge uses (§03.6a section C), so what Suresh explains and what the approver signs are one list.
- **Negative** — a result whose fixed-point node did not converge (AC-211.3) is never shown as a figure; its last two iterates appear only inside the blocking item.

**US-S02 · Generate the ECR from the locked snapshot, pre-validated at EPFO's own severity** · Job: JTBD-S1 · Exercises: FR-PAY-711 F4, F5; FR-PAY-701 · Release: R1 (A-01, A-02)
*As* the operator, *I want* the ECR generated only from the locked snapshot and pre-checked exactly as EPFO checks it, *so that* the first upload is clean and I never meet a block EPFO would not raise.
- **AC-S02.1** — Generation is refused for a month short of LOCKED (F4 guard).
- **AC-S02.2** — The validation report separates blocks from flags, each with its FR-PAY-713 code; among the EPS rules only the age-58 rule blocks, and the post-1-September-2014 above-ceiling condition is a flag (EV-040).
- **AC-S02.3** — The export screen shows the four portal form-control values — Wage Month, Return Type, Contribution Rate, Remark — for Suresh to enter; none of them is in the file (EV-035).
- **AC-S02.4** — The exclude-and-flag list is shown with the notices already sent to each member (AC-701.2), and Suresh and the approver acknowledge it before a session can start (FR-OPS-007).
- **Negative** — a line carrying EPS for a member aged 58 not marked for deferred pension is refused at generation; a line for a post-2014 above-ceiling member is generated with its flag.

**US-S03 · Reconcile the portal's return statement before anyone approves it** · Job: JTBD-S6, JTBD-S4 · Exercises: FR-PAY-711 F6, F9; FR-OPS-004; FR-OPS-008; §22.4.1 · Release: R1 employer-attended; R2 operator-attended (A-23)
*As* the operator in the portal session, *I want* the return statement EPFO renders compared line by line with my locked snapshot, *so that* we never approve a return we cannot cancel (EV-036).
- **AC-S03.1** — Given an uploaded ECR, when the portal renders the return statement, then the product captures it and shows the line-by-line reconciliation; the approve instruction (`SO-RETURN`, US-V05) is offered to the approver only when there is no difference.
- **AC-S03.2** — Given a difference, the reconciliation names the member and the field and offers the portal's reject option on the approver's instruction, followed by a regenerated attempt; no Revised return is involved before approval (§22.11 scenario 3).
- **AC-S03.3** — The upload, the captured statement, the instruction and its hash are written to the on-behalf log (FR-OPS-008) in every mode.
- **Negative** — in an employer-attended session the product cannot stop a click on the portal; a return approved there without a prior in-product instruction is recorded on the filing's causation record as uninstructed (FR-OPS-005) and shown on the approver's digest.

**US-S04 · Pass the verification gate before payment initiation** · Job: JTBD-S6 · Exercises: FR-PAY-301 M10; FR-PAY-711 F14; AC-701.8; FR-PAY-902 · Release: R1
*As* the operator, *I want* one gate, immediately before payment initiation, that reconciles the Due Deposit Balance Summary to my snapshot including the interest line, *so that* any downward correction happens while a Revised return is still possible (EV-037).
- **AC-S04.1** — Given an approved return, when the portal renders the Due Deposit Balance Summary, the gate reconciles each head — contributions, EDLI, administrative charges, any interest — to the snapshot and to the computed liability (FR-PAY-902).
- **AC-S04.2** — Given the summary shows s.7Q interest, the gate treats it as mandatory with the contribution and adds it to the payable amount (EV-039); s.14B damages show as payable now or later at the employer's option and, if deferred, become a tracked open liability (AC-701.8).
- **AC-S04.3** — Given a downward difference, the gate fails naming the member and offers a Revised return; payment initiation stays disabled until the gate passes (AC-301.3).
- **AC-S04.4** — The gate passes only with the approver's confirmation (`SO-GATE`, US-V06); Suresh cannot pass it alone.
- **Negative** — after PAYMENT_INITIATED a Revised ECR is refused with the EV-037 reason, and only the routes that remain are offered (AC-711.3).

**US-S05 · Route a correction to the route that is still open** · Job: JTBD-S2, JTBD-S4 · Exercises: FR-PAY-708; FR-PAY-711 F10, F12; FR-PAY-401 · Release: R1 (A-02); arrear file fenced (A-06)
*As* the operator, *when* a filed month needs changing, *I want* the product to say which route is still open and why, *so that* I never try a route EPFO will refuse.

| Situation (ECR) | Route offered | Route refused, with reason |
| --- | --- | --- |
| Member absent from the approved Regular return and from every prior return for the month | Supplementary, repeatable | A second Regular — refused (AC-708.1) |
| Member already returned, figure too high, no payment initiated | Revised (downward) | Supplementary — the member is already returned (EV-037) |
| Member already returned, figure too high, payment initiated | None through EPFO's return types; the over-remittance is recorded, and its recovery route is unknown (`ecr.overpayment_recovery_route`, routed to §20) | Revised — payment initiated (EV-037) |
| Member already returned, figure too low, no payment initiated | Revised (upward) | — |
| Member already returned, figure too low, payment initiated | Held: post-payment upward revision is **[Hypothesis]** (AC-708.2) and is not offered until §20 confirms it on a live portal | Revised — pending validation |
| Arrears from a back-dated revision | EPFO's File Arrear Return flow, operated by the employer without a product generator (EV-043) | Lines in the monthly file (AC-401.2) |

- **AC-S05.1** — The route offered for every correction is the one the table gives for its situation, and the refused routes show their reasons.
- **AC-S05.2** — Every correction is stored as a diff against the accepted return, never a replacement (AC-712.5).
- **Negative** — no second Regular return is ever generated for a month (AC-708.1).

**US-S06 · Keep the establishment's filing ledger unbroken** · Job: JTBD-S1 · Exercises: FR-PAY-712 · Release: R1 (A-03)
*As* the operator, *I want* to know before an unfiled month starts blocking later ones, *so that* one stuck month does not cascade (EV-038).
- **AC-S06.1** — Given July's return has not reached ACCEPTED, when Suresh opens August, August's Regular return is not generated (strict month order, AC-712.1) and the ledger names July as the blocker with its owner.
- **AC-S06.2** — Given unfiled members in an earlier month, the dashboard warns before the point at which the M−4 rule would block a later Regular return, naming the members and the month (AC-712.2).
- **AC-S06.3** — A member blocked on a joint declaration (EV-041) shows BLOCKED-joint-declaration with the offline task for employer and employee; members not blocked proceed (FR-OPS-007).
- **Negative** — "abandon month" is not an action; a month with no active members is recorded NIL with its Direct Challan Entry receipt (EV-042), never as a gap.

**US-S07 · Stage Form 138 on the format family of its period, with Q4 fenced** · Job: JTBD-S1 · Exercises: FR-PAY-706; FR-PAY-711 F2, F4 · Release: R1 (A-11, A-12); Q4 in R3 (A-13)
*As* the operator, *I want* each quarter's statement staged on the utility stack of its period, *so that* a Tax Year 2026-27 statement never reaches the legacy utility and a legacy correction never reaches the new one (EV-052).
- **AC-S07.1** — A Tax Year 2026-27 Q1–Q3 statement is generated on the Form 138 layout for RPU 1.2 and FVU 1.2 with the remapped challan sub-headings (EV-051); a correction for FY 2025-26 routes to RPU 6.0 and FVU 9.5 (EV-052).
- **AC-S07.2** — The `.csi` challan file is imported and matched before the statement is offered for validation (FR-OPS-007).
- **AC-S07.3** — The Tax Year 2026-27 Q4 instance shows BLOCKED — "Q4 regular format not released" — with its 31 May 2027 due date visible, and is amber by design on the status view (EV-046).
- **Negative** — no Q4 file is ever emitted on a guessed layout.

**US-S08 · See the arrears' PF due month before money moves** · Job: JTBD-S2 · Exercises: FR-PAY-401 AC-401.2, AC-401.4; FR-PAY-210 AC-210.3 · Release: R1 computation; arrear file R3 or later (A-06)
*As* the operator running arrears, *I want* PF on the arrears dated from the planned disbursal date and shown before approval, *so that* a late remittance never surprises us (Part E-9).
- **AC-S08.1** — Given an arrears batch for a July revision paid in the August run, the approval artefact shows the arrears PF, its due month derived from the planned disbursal date, and the note that the arrear return is filed through EPFO's arrear flow without a generator (EV-043).
- **AC-S08.2** — Given the actual disbursal date differs from the planned one, only the date-keyed outputs re-derive, and the change reaches the approver as a diff before PAYMENT_INITIATED (AC-210.3).
- **Negative** — arrears PF is never written into the monthly ECR file of July or of August (AC-401.2).

**US-S09 · Answer "how was this derived" in minutes** · Job: JTBD-S4 · Exercises: FR-PAY-1001, FR-PAY-1002; FR-PAY-210 · Release: R1
*As* the operator facing an inspector or auditor, *I want* to open any figure and see its inputs, rule versions and evaluation context, and to replay it, *so that* I defend it without rebuilding it in Excel.
- **AC-S09.1** — Any figure in a locked month drills down to the snapshot inputs, the rule versions and the evaluation context — disbursal date, as-of time, jurisdiction set, regime election (FR-PAY-210).
- **AC-S09.2** — Replay with the stored context reproduces the figure byte-identically; a recompute with a new decision time is labelled a recompute (AC-210.4).
- **AC-S09.3** — The derivation exports as a dated document in the form vocabulary of its period (EV-050).
- **Negative** — for a month whose punches have been erased under their retention class, replay reads the snapshot, never the punches, and says so (Part E-2; §14).

**US-S10 · Retire the shadow Excel on evidence** · Job: JTBD-S5 · Exercises: stage-wise export and import (r3/02 finding 27); FR-PAY-303 · Release: R1
*As* the operator, *I want* to export every stage and re-import my parallel computation for comparison, *so that* I retire the shadow Excel when the numbers have agreed long enough — and not before.
- **AC-S10.1** — Inputs, register, variance view, bank file and each statutory artefact export to CSV or XLSX; re-exporting an unchanged run yields identical files.
- **AC-S10.2** — Given Suresh uploads his own computation (employee × head), the product returns a per-employee, per-head difference report; a month counts as agreed when every difference is ₹0.00 after `rounding_rule(scheme, field)`.
- **AC-S10.3** — The status view counts consecutive agreed months against Suresh's own bar, the tenant parameter `shadow_run.agreed_months_target` (JTBD-S5 names three); the count is shown, never enforced.
- **Negative** — an uploaded shadow file never changes a figure; it is comparison only.

**US-S11 · File PT on each state's own cadence, and only where the state's data is sourced** · Job: JTBD-S1 · Exercises: FR-PAY-703; FR-OPS-017; §06.4; §20 V-09 · Release: R1 computation for Maharashtra and its return R2 on capture (A-15); every other state, Karnataka and Telangana included, R2 per design-partner state (A-16)
*As* the operator of a multi-state tenant, *I want* each state's PT computed, calendared and returned on that state's own slab and cadence, with unsourced states fenced, *so that* a February payroll never remits ₹200 where ₹300 is due.
- **AC-S11.1** — Given establishments in Karnataka and Maharashtra, with Karnataka's row published (A-16), the February run applies ₹300 in each from the effective-dated rule (§03.3 worked example 2), with no operator override involved.
- **AC-S11.2** — Maharashtra's return frequency is the one ingested for the registration, never derived (§06.11); a state whose row is not gazette-sourced shows a fenced instance with its blocker (A-16) and "state data not yet sourced" in place of a figure.
- **AC-S11.3** — Each state's return is its own filing instance with its own acknowledgement (FR-PAY-711).
- **Negative** — the operator cannot edit a slab; slabs are rule values published through the pipeline (§07 matrix rule 2; §22.8), and a disputed slab is raised to the statutory desk.

**US-S12 · Stage the annual certificate cycle so June is a checklist** · Job: JTBD-S1 · Exercises: FR-PAY-707; §22.4.3; A-14 · Release: R3 for Tax Year 2026-27 (A-14)
*As* the operator, *I want* the certificate cycle staged — data readiness now, the TRACES request once the Q4 statement is accepted, signature by the signatory, distribution to employees — *so that* the 15 June deadline is a checklist and not a scramble.
- **AC-S12.1** — A per-employee readiness report shows, through the year, whether the data the certificate will carry is complete for Parts A, B and C (EV-048).
- **AC-S12.2** — The TRACES request steps record the request number and note that the incumbent flow's authentication code is valid for one calendar day (r3/02 finding 24, vendor documentation read).
- **AC-S12.3** — Signing is the signatory's own step with the signatory's DSC, which the vendor never holds (§22 P6, M4); distribution publishes to each employee under both names, Form 130 and Form 16 (EV-050).
- **Negative** — the product never generates the certificate itself — only a TRACES-generated certificate is valid (EV-048) — and for Tax Year 2026-27 the request step stays BLOCKED until the Q4 format is released (EV-046).

**US-S13 · See ESI period boundaries before they bite** · Job: JTBD-S1, JTBD-S2 · Exercises: §03.3 worked example 4; FR-PAY-702; FR-PAY-711 F2 · Release: R1 (A-07); post-cliff regime R2 (A-09)
*As* the operator, *I want* coverage carry-overs and drop-outs shown at the period boundary, *so that* a mid-period raise never produces a short ESI return.
- **AC-S13.1** — Given an employee whose gross crosses ₹21,000 inside a contribution period, the run continues ESI on actual gross to the period's end and shows the drop-out date (1 October or 1 April) on the employee and in the approver's section D.
- **AC-S13.2** — Given an arrear that would push a past month's gross over ₹21,000, the recompute is flagged for review, not applied silently (§03.3 JTBD-S2 criteria).
- **AC-S13.3** — For periods governed by the unresolved post-22-November-2026 regime, the ESI instance is BLOCKED with "regime unresolved" until a rule version is published (A-09; §06.9; §20 V-08).
- **Negative** — the ₹21,000 coverage gate is never applied as a contribution cap (§03.3).

**US-S14 · Chase a returned salary credit without touching the rest** · Job: JTBD-S1 · Exercises: FR-PAY-903, FR-PAY-904 · Release: follows FR-PAY-903, which §08 marks P1
*As* the operator, *I want* a credit the bank returns matched to its employee and re-queued, *so that* one wrong account number does not reopen the month.
- **AC-S14.1** — A returned credit is matched to its employee from the bank's status or statement, with the reason, and the employee's salary shows "returned — awaiting corrected account" (AC-903.1).
- **AC-S14.2** — The re-issue is a new payment line on the corrected account, released by the payment approver (FR-PAY-904); the successful lines are never re-paid.
- **AC-S14.3** — The bank-account change that fixes it passes maker-checker and penny-drop before the re-issue (§07 matrix).
- **Negative** — a returned credit never changes the locked month's figures, its ECR line or its TDS; only the payment record moves.

**US-S15 · Prepare the February annual returns with the month's run** · Job: JTBD-S1 · Exercises: §06.11; §05 A-20, A-21 · Release: R2 (A-20, A-21)
*As* the operator, *I want* the central-sphere annual returns prepared from the year's records in the same place as February's payroll, *so that* the last day of February does not arrive as a surprise.
- **AC-S15.1** — For each establishment the product prepares OSH Form XVII, including the Part IV EPF/ESI self-declaration, and — only for employers to whom CoSS Chapters V and VI apply — SS Form XXIII, each from the year's registers and filings (§06.11; A-20, A-21).
- **AC-S15.2** — Each return is a filing instance with its due date — the last day of February for Form XVII, 28 or 29 February for Form XXIII — and needs the named approver's instruction before submission. Its submission channel is not yet specified (§22), so the instance stays at GENERATED with a checklist until it is, and the sign-off kinds gain an annual-return kind when §22 specifies the channel.
- **Negative** — Form XVIII, a contractor's half-yearly return, is never raised as an every-employer filing (§06.11).

**US-S16 · Run the ESIC month on a captured template, or on a checklist until there is one** · Job: JTBD-S1 · Exercises: FR-PAY-702; FR-PAY-902; FR-OPS-014; §22.4.2 · Release: R1 computation (A-07); the upload file R1 only if captured before launch, else R2 (A-08)
*As* the operator, *I want* the month's ESI contributions prepared for the ESIC portal and its challan reconciled before the approver instructs it, *so that* the ESI instance reaches FILED without a guessed template.
- **AC-S16.1** — Until the ESIC capture spike's evidence passes two-person review (AC-014.1), the product gives the employer's user the per-member contribution figures and a checklist, not an upload file.
- **AC-S16.2** — A member held in coverage after crossing ₹21,000 inside a contribution period appears in that period's figures with the reason (AC-014.3; US-S13).
- **AC-S16.3** — The challan amount the portal generates is captured and reconciled to the computed liability before `SO-ESIC` is presented (US-V20); the instance reaches FILED only on the stored challan and payment confirmation (§22.4.2).
- **AC-S16.4** — A joiner's Insured Person registration is prepared in-product and run as an attended portal task; Aadhaar seeding is optional and our staff never enter an Aadhaar number (AC-014.2).
- **Negative** — no ESIC upload file is produced from practitioner descriptions of the template (A-08; r3/05 finding 31), and for contribution periods under the unresolved post-22-November-2026 regime nothing is prepared at all (US-S13 AC-S13.3).

#### Success criteria

| Criterion | Target | How measured |
| --- | --- | --- |
| First-upload acceptance of statutory files | 100% (ECR, ESI, PT, Form 138) | Portal rejection count |
| Run-to-bank reconciliation | Zero unexplained variance | Reconciliation report |
| Arrears correctness vs period rules | 100% against effective-dated rules | Audit sample |
| Time to answer an auditor's "how derived" | < 5 min | Drill-down trace |
| Shadow-Excel retirement | Yes by month 3 | Self-reported / usage |

#### Day-in-the-life (cut-off week)

**Day −3:** Pulls attendance lock from Meera. Runs a *draft* payroll. The engine flags four exceptions: two employees crossed the PF wage ceiling mid-month, one has a mid-year regime switch, one has arrears from a backdated confirmation. Old way: he'd find these himself in Excel. New way: exception queue.

**Day −2:** Reviews the two-wage-base computation for the manufacturing staff whose allowance structure trips the 50% add-back. He wants to *see* both bases side by side with the deemed-wages excess called out, and the EPS split against the ₹15,000 ceiling.

**Day −1:** Locks the run. Generates the bank NEFT file, the ECR text file, the ESI contribution file, the PT statements on each state's cadence, and stages Form 138 for the quarter. Cross-checks totals. Signs as maker; routes to the CFO as checker.

**Day 0 (payday):** Bank debit hits; reconciles to the paisa. Payslips release to employees.

**Day +7:** TDS challan deposited. **By the 15th:** ECR and ESI. The ECR is not a one-click submission; it is an attended run on EPFO's portal — upload → validate → return statement → approve → Due Deposit Balance Summary → challan with TRRN → pay → receipt (EV-036). The hard verification gate sits **immediately before payment initiation**, because a Revised return — the only route to a downward correction — is barred once payment has been initiated (EV-037), and an approved return can never be cancelled (EV-036). Interest on any delay is auto-calculated and payable with the contribution (EV-039), and returns must go in strict month order, so a skipped month blocks the ones after it (EV-038). What Suresh wants is a portal-ready artefact, an attended submission under the employer's written authority, and the receipt stored against the period — the filing, as an artefact, is the unit of delivery (EV-030; §22).

**Validation dependency:** Suresh's entire success rests on statutory-format fidelity (§06) and the PT/LWF dataset (§06; §20 V-09). If those slip, he never retires the shadow Excel and never becomes a reference customer. **Kill line:** if first-upload rejection is recurringly > 0 across a 3-month pilot, trust never transfers and P2 is not a live persona for the product as specified.

---

### 03.4 P3 — CA Anjali, the compliance consultant / payroll bureau (channel persona)

> "I don't buy software. I buy leverage over my client roster — or I buy my own irrelevance. You have about ninety seconds to tell me which."

#### Context

CA Anjali runs a five-person practice in Indore serving ~40 SME clients. For maybe 25 of them she *is* the payroll and compliance function: she runs the monthly payroll, runs the attended ECR, ESI, PT and TDS portal sessions under her clients' authority, and hands over the TRACES-generated annual certificate (Form 130, ex-Form 16 — EV-048). The statutory liability for each of those filings stays with the client as employer and deductor — it is non-delegable (EV-030; §22) — and whether a third party may act on a deductor's TDS filing or a client's portal credentials is under counsel review (§23). She charges **₹3,000–15,000/month per client** for this (Source: §18 price anchor; the ICAI fee schedule has *no* payroll-processing line item and is at least nine years stale) **[Hypothesis]** — the range comes from secondary research, and what a bureau actually charges is §20 V-01, the unanswered pricing question. She is simultaneously the product's **most important channel** and its **most dangerous unvalidated assumption** — the PRD is explicit that no CA has been interviewed and that "design for the CA as a user" is the most consequential GTM claim in the document, resting on zero evidence (§18; §20 V-05). **[Hypothesis]**

The central strategic tension lives inside Anjali: the same product that could make her 3× more efficient across 40 clients could also be sold *directly* to her clients and disintermediate her. Whether she becomes a channel or an opponent is the §20 V-05 kill question. This persona is written to make both futures legible.

#### Channel first — and the console that serves the channel

**Anjali-as-channel (the persona).** She recommends the tool to clients, runs it *for* them, bills a blended software-plus-service fee, and the vendor acquires 25 employers through one relationship. This is the highest-leverage GTM motion in the plan — and the one most likely to invert. This is the only role in which §03 treats her as a persona: the product is not designed around her as a primary user until §20 V-05 says the channel exists.

**The console she would work in (channel enablement, not a design target).** To run clients through the product she needs a multi-client console: switch between clients in one click, a per-client compliance calendar, batch-run payroll across the roster, one-click export of Form 138 (Q1–Q3; Q4 fenced — EV-046) and PT returns per client, and read-only audit access she can grant a client without giving up control. This is the CA / bureau console requirement (§15, §18) — shipped **thin** in R2 (§05 item 20a, P1) and productised in v2 only if V-05 passes (item 20b). It is specified below because a channel that cannot operate the product is not a channel, not because she is a v1 design target.

#### Goals

1. **Serve more clients per staff-hour** without hiring. Efficiency is her margin.
2. **Never miss a filing across the entire roster** — one missed ECR for one client is a reputational hit across her referral network.
3. **Standardise** so a junior can run a client's payroll under her review (maker-checker at practice scale).
4. **Keep the client relationship.** She fears becoming a button-pusher for a vendor who then goes direct.
5. **Bill for judgment, not for data entry.** She *wants* the drudgery automated; she sells the interpretation.

#### Pains

- **She juggles N portals × M clients.** Every client's EPFO, ESIC, state PT and TRACES login is a separate credential; there is no roster view. For 25 run-clients across 4 portals that is up to 100 credential contexts.
- **No client-portfolio compliance calendar.** She tracks deadlines across 40 clients in a spreadsheet and her memory.
- **Onboarding a new client's historical data** (opening balances, YTD, prior filings) is manual and risky — the same mid-year cutover pain as §16.
- **Amendment risk is 40×.** A corrigendum she misses (exactly the §06 November-2026 trap, where indiacode.nic.in still reproduces the uncorrected S.O. 5319(E) enumeration) hits *every* client at once. She needs a maintained statutory layer more than any single employer does — her exposure is 40×, which is precisely why the compliance data pipeline's watcher, keyed to corrigenda and amendments rather than only new instruments (§22), is *her* feature. (Source: §06 corrigendum trap) **[Verified]** that the trap is real.
- **Disintermediation dread.** Every "self-serve HRMS" pitch she sees reads as a threat until proven otherwise.

#### Jobs-to-be-Done

- **JTBD-A1 (functional):** *When* I manage a roster of clients, *I want to* run payroll, prepare portal-accepted artefacts and record each attended submission for many clients from one console, *so I can* serve more clients without more staff.
- **JTBD-A2 (functional):** *When* a statute changes, *I want to* have the maintained update applied across every client automatically, *so I can* be right 40 times without reading 40 notifications.
- **JTBD-A3 (emotional/social):** *When* I bring a client onto the tool, *I want to* remain the trusted advisor of record, *so I can* keep the relationship and bill for judgment.
- **JTBD-A4 (functional):** *When* an auditor or client asks for proof of a filing, *I want to* produce the acknowledgment and derivation instantly, *so I can* protect my practice's reputation.

#### Worked example — the blended-pricing economics that decide the channel

Whether Anjali is a channel depends on arithmetic, not sentiment. Suppose she runs payroll for 25 clients averaging 40 employees, charging a blended ₹8,000/client/month today.

- If the product lists at ₹100 PEPM — an illustrative point inside the ₹80–200 mid-market clearing band, above the ~₹50 value floor, per the two-anchor price structure (EV-027; §18; the earlier ₹80–150 anchor survives inside that band) **[Hypothesis]** — her software cost per client = 40 × ₹100 = **₹4,000/month**.
- If the tool makes her 3× more efficient, she can absorb the ₹4,000 and *raise* her retained margin on the ₹8,000 by cutting labour — or she re-prices to ₹10,000 blended and passes software through.
- **The channel works only if** (blended fee − software cost − reduced labour) > her current per-client margin. If the §20 V-01 mystery-shop finds the real all-in bureau price is under **₹2,000/month at 50 employees** (V-01's kill line), then — assuming a 20-employee client pays no more than a 50-employee one — at the illustrative ₹100 PEPM a 20-employee client's software cost alone (20 × ₹100 = ₹2,000) consumes the whole fee, and the blended model collapses at the small end. (Source: §20 V-01 kill criterion) **[Hypothesis]** That arithmetic already assumes billing the client's actual 20 heads — §18's no-seat-floor wedge. Each of the six priced competitors bills a 50-employee minimum block (EV-026), so the same client on any of them is billed for 50: at the same illustrative PEPM, ₹5,000 a month against a ₹2,000 fee.

The test is per client, so it runs by client size. Software cost for one client per month, billed on actual heads for this product and on each incumbent's entry tier (EV-027, whose 50-seat block makes the incumbent rows flat up to 50 — EV-026):

| Software for one client, per month | 20 heads | 40 heads | 50 heads |
| --- | --- | --- | --- |
| This product at ₹50 PEPM — near the value floor **[Hypothesis]** | ₹1,000 | ₹2,000 | ₹2,500 |
| This product at ₹100 PEPM — illustrative **[Hypothesis]** | ₹2,000 | ₹4,000 | ₹5,000 |
| This product at ₹200 PEPM — top of the clearing band **[Hypothesis]** | ₹4,000 | ₹8,000 | ₹10,000 |
| Qandle, ₹49.00 annual × 50 seats | ₹2,450 | ₹2,450 | ₹2,450 |
| greytHR, ₹49.90 × 50 seats | ₹2,495 | ₹2,495 | ₹2,495 |
| Keka small-business floor (EV-023) | ₹6,999 | ₹6,999 | ₹6,999 |

The break-even client size at a given fee is the fee ÷ PEPM: at a ₹2,000 fee, 40 heads at ₹50 and 20 at ₹100; at the ₹3,000 bottom of Anjali's assumed fee range, 60 and 30. V-01's kill line sits at 50 employees, where even ₹50 PEPM costs ₹2,500 — so if that line fires, no price point in either anchor leaves headroom at that size. Every incumbent row already exceeds ₹2,000 for any client of 50 heads or fewer. V-01's mystery-shop at 20, 50 and 100 heads (§20) answers this test only if its results are kept per client size rather than averaged per bureau; the request to also record which software each shopped client's payroll runs on is routed to §20.

This is the concrete form of the two kill lines below: the channel inverts either on *sentiment* (she reads it as disintermediation, V-05) or on *arithmetic* (there is no margin to share, V-01).

#### Worked example 2 — the new-client historical cutover Anjali does 25 times

Onboarding a new client mid-year is where Anjali's Anxiety concentrates, and it is the §16 mid-year-cutover problem at portfolio scale. Bringing on a 40-person client in September requires reconstructing, per employee: opening EPF/EPS balances and UAN continuity, YTD gross/PF/PT/ESI/TDS already deducted, previous filings (prior ECRs to verify member continuity), investment declarations mid-cycle, leave balances, and gratuity/leave-encashment accrual to date. Get YTD TDS wrong on import and every payslip for the rest of the year is off — Suresh's exact scar (§03.3), now multiplied across Anjali's roster.

Acceptance: the console ingests the client's Tally export + prior ECR files, **reconciles opening balances against the last filed ECR** (member count and PF totals must tie), surfaces mismatches as an exception list rather than silently importing, and produces a "cutover-clean" attestation before the first live run. Kill line inherits P2's and §20 V-15's: if imported YTD does not reconcile to the last filed ECR within tolerance, the client cannot go live and manual reconstruction is required — the friction the product exists to remove; if V-15's first real mid-year cutover needs material manual repair, migration is a services cost rather than a product and this console flow is re-scoped with §16. The tolerance itself is not set here — it is §16's YTD tie-out criterion.

#### Acceptance criteria (the channel-enablement console — thin, §05 item 20a, R2)

- **Roster view:** all clients on one screen with a per-client compliance-status tile (ECR/ESI/PT/TDS green/amber/red), sortable by next-due-date.
- **One-click client switch** inside the product, ACL-scoped per client. Government-portal sessions are **not** one-click: every statutory surface is an attended portal (EPFO interactive login with CAPTCHA; for TDS the deductor runs the FVU utility and uploads; ESIC template upload; state PT on separate manual portals), any portal credential held for a client sits in the §22 credential vault under that client's written authority to act, and whether portal terms permit third-party credential use is under counsel review (§23).
- **Batch draft run** across N clients, surfacing only exceptions (thresholds crossed, ceiling breaches, regime switches) — never N full datasets.
- **Maker-checker at practice scale:** a junior runs, Anjali reviews and the client's approver approves (§03.1 rule 3); every review and approval audited (feeds §12 idempotent audited write tools).
- **Read-only audit grant** to a client without transferring control of the run.
- **Statutory update propagation:** a corrigendum applied once shows as "applied across 40 clients" with a per-client confirmation (JTBD-A2).

#### Channel-enablement stories — the minimum a CA needs for the channel to exist

These stories specify what a CA must be able to do to operate the product *for* her clients; they are not a brief for a CA product. They add to the console criteria above without restating them, and each ships in the thin console — §05 item 20a, P1, R2, whose CA sessions are FR-OPS-029 — or waits for §20 V-05 (item 20b).

**Open conflict on the grant's scope.** §05 item 20a and FR-OPS-029 give the thin console's grant read, prepare and assisted-submission scopes; §15.3.6 and §14 AC-DM-30 still describe a CA grant as read, export and read-only audit only, with prepare a v2 scope. US-A01, US-A03 and US-A06 need the prepare scope and US-A02 writes to a filing record, so those four do not ship until the §05 owner reconciles the two (routed to §05 and §15); US-A04 and US-A05 need only read.

**US-A01 · My junior makes, I review, the client approves** · Job: JTBD-A1, JTBD-A3 · Exercises: §03.1 rules 2–3; FR-PAY-304 · Release: R2 thin console (item 20a)
*As* a CA running a client's payroll, *I want* my junior to make the run, me to review it and the client's approver to approve it, *so that* I stay the advisor of record without becoming the employer's proxy.
- **AC-A01.1** — A CA-run client's run records three identities — maker (CA junior), reviewer (CA) and approver (the client's named approver) — and M6 is offered only to the client's approver.
- **AC-A01.2** — The client's approver receives the sign-off artefact with the CA's review note attached; the note is not part of the hashed content (§03.6a).
- **AC-A01.3** — A CA user cannot be set as the approver of a run she made or reviewed.
- **Negative** — a client with no employer-side approver cannot have a run presented; the roster tile shows "approver missing" (§03.1 role readiness).

**US-A02 · Record a submission I made on the client's portal** · Job: JTBD-A1, JTBD-A4 · Exercises: FR-OPS-008, FR-OPS-009 AC-009.2; FR-OPS-029; §05 item 20a · Release: R2 thin console; the Mode D workspace is P1, R2 (FR-OPS-001)
*As* a CA who signs in to a client's portal account as she does today, *I want* to record the submission and import its acknowledgements against the filing instance, *so that* the client's ledger and status view are complete.
- **AC-A02.1** — The CA uploads the portal's objects — return statement, challan with TRRN, receipt, or Return Receipt Number — and the product parses and reconciles them to the approved artefact's hash and the locked snapshot before recording F6, F9 and F15 (AC-009.2).
- **AC-A02.2** — The filing records the CA organisation and user as the submitter; the session log records Mode D, and `submission_mode` records `employer` because the CA used her own arrangement with the client (FR-OPS-001 AC-001.4; FR-OPS-029). Until the Mode D workspace ships (P1, R2), the recording uses the evidence-import mechanics of Mode A.
- **AC-A02.3** — The filing is never counted or shown as submitted by the vendor (§23 FR-LEG-034 AC2).
- **Negative** — an acknowledgement that does not reconcile to the approved artefact's hash — a file uploaded to the portal that is not the one approved — is recorded as a mismatch, and the instance does not reach FILED.

**US-A03 · See which clients a rule change touches, before it touches them** · Job: JTBD-A2 · Exercises: §22.8.5 impact, §22.8.8 staged publish; FR-PAY-402 · Release: R2 thin console (item 20a)
*As* a CA across 40 clients, *I want* a published rule version to show me which clients it affects and by how much, *so that* I am right 40 times without reading 40 notifications.
- **AC-A03.1** — Given a rule version effective for a period, the console lists every client with an establishment in its jurisdiction and, per client, the runs affected by state — not yet processed, PROCESSED, or LOCKED.
- **AC-A03.2** — For clients whose affected runs are LOCKED, a correction task is raised per client with the recomputed delta and the route the EV-037 guards leave (FR-PAY-402 AC-402.1); for PROCESSED runs, the artefact is superseded (`RULE_VERSION_NEWER`, §03.6a).
- **Negative** — the CA cannot apply, defer or edit a published rule for one client; rule values are not tenant objects (§07 matrix rule 2).

**US-A04 · A relationship the client can end without an export project** · Job: JTBD-A3 · Exercises: §15.3.6; §15.3.9 option B-1 · Release: R2 thin console (item 20a)
*As* a CA, *I want* access to each client through a revocable grant the client controls, *so that* either of us can end the relationship without moving the client's data.
- **AC-A04.1** — The CA organisation holds one grant per client tenant, scoped by role; the client's owner can revoke it at any time, effective immediately for new sessions (§15.3.6).
- **AC-A04.2** — After revocation the client's data, filing ledger and on-behalf log stay in the client's tenant; the CA keeps only her practice records (review notes) (§15.3.9, option B-1).
- **Negative** — two clients served by the same CA never co-mingle: an employee who has worked for both appears as two unrelated records (§15.3.6).

**US-A05 · Sort the roster by the next irreversible act** · Job: JTBD-A1 · Exercises: FR-OPS-004; FR-PAY-712 · Release: R2 thin console (item 20a)
*As* a CA across 25 run-clients, *I want* the roster ordered by the next irreversible act — a return to approve, a gate to pass, an exit to mark — with the client approver who must act, *so that* my day goes to the acts that cannot be undone.
- **AC-A05.1** — Each client's tile shows the next instruction-gated act, its due date, the named approver and whether that approver has been asked.
- **AC-A05.2** — A client whose ledger has a month that will block a later Regular return under the M−4 rule (EV-038) sorts above every client whose next act is merely due.
- **AC-A05.3** — The roster applies the same five ordering keys as the approver's queue (§03.6a), so the CA and each client's approver see the same order.
- **Negative** — the CA cannot instruct an act for a client unless the written authority names her as a named approver and she neither made nor reviewed the run (AC-A01.3; AC-004.3).

**US-A06 · Prepare every client's quarterly statement from one queue** · Job: JTBD-A1 · Exercises: FR-PAY-706; §05 item 20a one-click export; `SO-STATEMENT` · Release: R2 thin console (item 20a), on the A-11 and A-12 generators
*As* a CA whose main recurring job is the TDS statement, *I want* each client's quarter prepared in one queue on the right utility stack, *so that* 25 statements do not mean 25 separate set-ups.
- **AC-A06.1** — The queue lists each client's statement for the quarter with its `.csi` status, its period's utility stack (EV-052), its FVU result and its due date (EV-049).
- **AC-A06.2** — Each statement's upload instruction (`SO-STATEMENT`) goes to that client's named approver, never to the CA who prepared it.
- **AC-A06.3** — The Tax Year 2026-27 Q4 row shows BLOCKED with the reason for every client at once (EV-046), so the CA can tell all 25 clients the same true thing.
- **Negative** — one client's statement never carries another client's TAN, challans or deductees (§15.3.6 isolation; FR-OPS-003 AC-003.2's binding of file to registration).

**Worked example — Anjali's roster on 11 September 2026.** Three of her clients, as US-A05 sorts them:

| Order | Client | Next irreversible act | Due | Approver who must act | Why it sorts here |
| --- | --- | --- | --- | --- | --- |
| 1 | A 45-person Indore firm | August's Regular ECR cannot be generated: July's return is uploaded but not approved | July's return was due 15 August | The client's founder, asked twice | A month that blocks later months outranks anything merely due (EV-038; AC-A05.2) |
| 2 | A 30-person Indore firm | `SO-GATE` on August's reconciled summary | 15 September | The client's CFO, not yet asked | The last point for a downward correction (EV-037), four days out, with an approver who has not been asked |
| 3 | A 60-person Pune firm | `SO-RETURN` for August | 15 September | Vikram, asked today | Same window, but its approver has already been notified |

The first row also shows what the console must not do: it offers Anjali no way to approve July's return herself, however late it is — the tile names the founder, counts the reminders sent under the §03.6a escalation ladder and shows the chronology it is blocking.

The table makes "channel, not proxy" enforceable. The §07 matrix's CA column is the read-only baseline; a client that outsources payroll grants the CA organisation the payroll-operator role on its tenant (§15.3.6; §12.3 "write gated per client-tenant toggle"), which carries the operator's rights and never the approver's.

| Capability | The CA may | Condition | Source |
| --- | --- | --- | --- |
| Prepare runs and artefacts for a client | Yes, from R2 | A grant from the client carrying the prepare scope — FR-OPS-029; subject to the open scope conflict with §15.3.6 above | §05 item 20a; FR-OPS-029 |
| Review a run | Yes | Recorded as a review, never as M6 | §03.1 rule 3 |
| Approve a client's run (M6, M8) | Not by default | Only if the client names her as approver through the written authority, and never for a run she made or reviewed | §03.1 rule 2; FR-PAY-304 |
| Instruct a portal act for a client | Not by default | As above, and never while she performs the act | FR-OPS-004; AC-004.3 |
| Operate a client's portal | Outside the product, as today; inside it only in §22 Mode D | Mode D is P1 and needs a written authority naming the CA organisation and individuals | §22 FR-OPS-001 |
| Hold a client's portal credential in our vault | Only under Mode D | P1; follows V-05 | §22 FR-OPS-001 |
| See statutory identifiers | Masked | The §07 matrix CA column | FR-CHR-105 |
| See Aadhaar, bank details or consent records | No | The §07 matrix CA column is "—" for all three | FR-CHR-105 |
| Export registers and the audit log | Yes, read-only | The §07 matrix CA column | FR-CHR-105 |
| Move a client's data to her own tenant | No | Client-owned tenants with revocable grants | §15.3.9 option B-1 |
| Pay for several clients on one bill | Yes, as a commercial link | Never a data link | §15.3.9; §18 |

<!-- DIAGRAM: personas-jtbd-ca-channel-boundary -->

The diagram and the table say the same thing from two sides: every edge that makes a portal act irreversible starts at the client's approver, and every edge that leaves the client tenant carries only practice records. A build that lets any CA-side node reach a decision, or lets client records reach the CA organisation, fails US-A01, US-A04 and T10 (§03.6a).

#### What each V-05 outcome does to the product

| V-05 finding (§20) | CA console | §22 Mode D | Tenancy shape (§15.3.9) | GTM (§18) |
| --- | --- | --- | --- | --- |
| Pass — at least 60% of interviewed CAs describe workable referral or reseller economics | Productised in v2 (§05 item 20b) | Built on its P1 schedule | B-1: client-owned tenants with CA grants | CA-referred motion |
| Ambiguous — split or conditional interest | Stays thin | Not built until a second study reports | B-1 | Direct, with CA referral where offered |
| Kill — 40% or more read the product as disintermediation | Reverts to per-tenant export and a reporting view (§15 A3) | Not built | B-1 | Direct-to-employer; CAs as a defensive integration |
| Bureaus will act as a channel only if the client account is theirs (§15 A7) | Productised | Built | Re-open B-2, with `employer_id` enforced below the application | Bureau-owned motion |

#### Success criteria

| Criterion | Target | How measured |
| --- | --- | --- |
| Clients served per payroll staff-day | 2–3× baseline | Roster throughput |
| Roster-wide missed filings | 0 | Console calendar status |
| New-client onboarding time | < 1 day incl. historicals | Onboarding log |
| Statutory update lag | 0 client-facing lag | Update-to-roster time |
| Relationship retention | Anjali stays client-of-record | Contract structure |

#### Day-in-the-life

**Morning:** Opens the console. A single calendar shows: 6 clients' ECR due in three days, 2 PT returns on their state cadences, one client's Form 138 quarter closing. She batch-runs draft payroll for the 6 ECR clients; the console surfaces only exceptions (one client added 3 heads, crossing a threshold — but not the EPF 20-head trigger, so no new obligation this month).

**Midday:** A client's employee disputes PF; she pulls the derivation and forwards it — 90 seconds, JTBD-A4. A new client signs; she imports their Tally + prior ECRs and the console reconciles opening balances.

**Afternoon:** A corrigendum notification arrives (the maintained statutory layer flags it — the §22 amendment watcher). She confirms it's already applied roster-wide. She spends the freed hour on advisory work she can bill at a premium — the business she actually wants.

#### Kill / validation criteria (this persona is a bet, not a fact)

- **[Hypothesis] → Kill line 1 (sentiment):** If §20 V-05 interviews (20–30 CAs, both city tiers) find that 40% or more read the product as disintermediation regardless of the console design (the §01 kill line; V-05 passes only when at least 60% describe workable referral or reseller economics — §18 H-P5, §20), the channel *inverts into an opponent* and the GTM must re-anchor on direct-to-employer with CAs as a defensive integration, not a growth engine. (Source: §20 V-05)
- **[Hypothesis] → Kill line 2 (arithmetic):** If the §20 V-01 mystery-shop finds the real all-in bureau price is under ₹2,000/month at 50 employees, Anjali's small clients have little budget headroom above her fee, and the "sell through the CA at a blended price" economics collapse at the small end. (Source: §20 V-01)
- **Validation signal (go):** A CA agrees to run ≥3 clients on the console within 30 days of a pilot and *raises* her advisory billing. That is the channel working.

---

### 03.5 P4 — Ravi, the employee (desk and deskless/frontline)

Ravi is two people the product must serve with one identity model: **Ravi-desk** (salaried, own smartphone, email, expects a self-serve app) and **Ravi-frontline** (shift/plant/field worker, may share a household phone, low-bandwidth, WhatsApp-native, punches on a biometric terminal). §09 establishes that nine in ten people who do not use a phone live in a household that owns one (Comprehensive Annual Modular Survey 2023 — not CAMS Biometrics, the device vendor), so **worker identity ≠ device identity** for frontline — which is exactly why terminal integration is not optional. (Source: §09) **[Verified]**

#### Context

- **Ravi-desk**, 29, software-services associate, Hyderabad. Owns a phone, checks email, wants to book leave, see his payslip, submit investment proofs, and never call HR.
- **Ravi-frontline**, 38, machine operator, Coimbatore plant, three rotating shifts. Shares a smartphone at home with his son; at work he punches an eSSL device. He interacts with "HR" through his supervisor and occasionally WhatsApp. His statutory entitlements — ESI medical and cash benefits, EPF, overtime at not less than twice the normal rate of wages, gratuity accrual — are identical to Ravi-desk's, but his *access surface* is completely different. (Source: Code on Wages s.14; ESIC; §06, §09) **[Verified]** on the entitlements. A quarterly overtime-hours cap, reported as 144 hours, is **[Hypothesis]**: secondary summaries only, never confirmed against gazette text, possibly sitting in the OSH rules — so the product may warn on it and must never block (§09, §20 V-17).

#### Goals

- **Get paid correctly and on time.** Non-negotiable, the same for both.
- **See and trust the payslip** — understand deductions without asking anyone.
- **Book leave / regularise attendance** with a fast yes/no.
- **Frontline-specific:** know his shift, mark attendance reliably even on a shared/absent device, and raise a "my punch is missing" flag without navigating a portal.
- **Access statutory documents** — Form 130 (Form 16 for periods up to FY 2025-26), PF passbook link, ESI IP details — when needed (loan, visa, new job).

#### Pains

- **Payslip opacity.** Deductions appear without explanation; the only recourse is asking Meera, who then asks Suresh.
- **Frontline: the punch black hole.** Device offline, shift-change confusion, missing punches that silently become LOP (see the LOP arithmetic in §03.2 — a device-fault miss costs a real day's pay).
- **Onboarding data collection is done *to* him** (photocopies, forms) rather than a guided self-capture.
- **Frontline access assumptions break.** Push-based onboarding fails: a new WhatsApp business portfolio reaches only **250 unique users per rolling 24 hours** (Source: §09; Meta WhatsApp Business tiering) **[Verified]**, so a large site cannot be push-onboarded on day one, and shared devices mean per-user push is unreliable.
- **Language.** Frontline UX in English-only is a non-starter across much of the workforce.

#### Jobs-to-be-Done

- **JTBD-R1 (functional, both):** *When* I get paid, *I want to* see a payslip I understand, *so I can* trust I was paid right without asking anyone.
- **JTBD-R2 (functional, desk):** *When* I need leave, *I want to* request it and get a fast decision, *so I can* plan.
- **JTBD-R3 (functional, frontline):** *When* my punch is missing, *I want to* flag it through WhatsApp/supervisor in seconds, *so I can* not lose a day's pay to a device fault.
- **JTBD-R4 (functional, both):** *When* I need a statutory document, *I want to* pull it myself, *so I can* not wait on HR.
- **JTBD-R5 (emotional):** *When* I interact with "the company system," *I want to* do it in my language on a device I can reach, *so I can* feel the system is for me too.

#### Worked example 1 — the overtime cap Ravi-frontline may hit, and why it is a warning, not a block

A machine operator works 60 hours of overtime in a quarter at an ordinary rate of ₹120/hour:

- OT pay = 60 × (2 × ₹120) = **₹14,400** for the quarter, at the statutory floor of twice the normal rate of wages (Code on Wages s.14) **[Verified]**.
- A ceiling of **144 OT hours per quarter per worker** is reported by secondary summaries but has **never been confirmed against gazette text** and may sit in the OSH rules. **[Reversed]** — earlier drafts marked it [Verified] and built acceptance criteria on it; it is now **[Hypothesis]**, routed to §20 V-17 for gazette verification (if neither notified rule-set contains it, the figure is deleted from every warning). If it holds, scheduling that pushes him to 150 hours puts the employer in breach — and the *payroll system is where the breach becomes visible*.

Acceptance: the attendance/payroll engine **warns** when a worker's rolling-quarter OT approaches the configured cap (`ot_quarterly_ceiling_hours`, the name §09 and §14 use; 144 pending verification) and **flags** any period that would exceed it; it **never blocks** an approval, a shift or a payment on the strength of the unverified cap. The potential overrun is surfaced to Suresh and Vikram as exposure, not just as a pay calculation for Ravi. This is a direct instance of "the filing/register is the artefact": the OT register is inspectable (S2), so the number must be right.

#### Worked example 2 — the WhatsApp reach ceiling that reshapes frontline onboarding

Ravi-frontline is the persona where a single infrastructure constant overturns the naive design. A new WhatsApp Business portfolio can message only **250 unique users per rolling 24 hours** at the lowest tier (Source: §09). **[Verified]** For a 5,000-worker plant, employer-push onboarding would take **20 days** at that ceiling even before opt-in friction — and shared devices mean per-user push can land on the wrong phone (how often is unmeasured). The design consequence is decisive:

- **Onboarding must be worker-initiated / supervisor-mediated, not employer-push.** The worker (or supervisor) starts the conversation; the tier limit only binds business-initiated messages.
- **The attendance terminal, not the phone, is the primary attendance surface** for this persona — which is exactly why the §09 ADMS push receiver is "the best-evidenced call in the corpus," restated here as a persona requirement rather than an architecture note. The terminal need not be biometric: no Indian law requires biometric attendance, and OSH Code s.33(a) requires an attendance *record* and is device-neutral (EV-072). Biometric enrolment today needs the worker's **written consent before collection** (SPDI r.5(1) — EV-060, provenance caveat; who owes that duty is under counsel review, §23, so the capture is built either way), and a genuine non-biometric path is a per-worker attribute, never a "biometric only" configuration (§09; §23).
- **A shared-device identity model** (worker ID resolved at punch or via supervisor, not assumed from the handset) is a v1 requirement for any frontline-heavy tenant (§03.12 principle 6; §09).

This single number is why Ravi cannot be served as "Ravi-desk with a cheaper phone." He needs a structurally different reach model.

#### Worked example 3 — earned-leave accrual and encashment (Ravi-desk, feeds Vikram V3)

Leave is a statutory entitlement, not a policy nicety, and its accrued encashment value is a balance-sheet liability. Under the OSH Code a worker earns annual leave with wages, recorded in the Register for Leave with Wages (OSH Form XX, central sphere — EV-053) **[Verified]**. The accrual ratio, the carry-forward cap and the encashment triggers are **not verified in our evidence**: they ship as configurable parameters (`annual_leave_accrual_ratio`, `leave_carry_forward_cap`, `leave_encashment_day_rate`) routed to §20, and the figures below use an illustrative 1 day per 20 days worked. For Ravi-desk on ₹50,000/month who worked 240 payable days in the year:

- Earned leave accrued = 240 / 20 = **12 days** (illustrative ratio).
- If he carries 30 days at exit and the encashment day-rate is ₹50,000 / 26 = ₹1,923/day (a policy choice, not a statutory constant), the leave-encashment payout = 30 × ₹1,923 = **₹57,690**.

Acceptance: the engine accrues leave per the configured ratio, enforces the carry-forward cap, and exposes the roster-wide accrued-encashment liability alongside gratuity (JTBD-V3) — one accrual engine, two liability lines. Ravi's success criterion is that his balance is *visible and self-serve* (JTBD-R1/R4) so he never has to ask Meera "how many days do I have left"; Vikram's is that the aggregate lands on the board dashboard, not a year-end actuarial surprise.

#### Worked example 4 — the explained payslip, line by line (US-R01)

G, the Pune employee whose raise from ₹20,000 to ₹23,000 took effect on 1 August (§03.6a worked example), is a plain Ravi case: covered by ESI, above the PT line, below the tax line. His August payslip renders each line with the sentence US-R01 requires:

| Line | Amount (₹) | What the payslip says |
| --- | --- | --- |
| Basic | 11,500.00 | "Revised from ₹10,000 from 1 August" |
| HRA | 5,750.00 | — |
| Conveyance allowance | 5,750.00 | — |
| **Gross** | **23,000.00** | — |
| PF (employee) | 1,380.00 | "12% of your EPF wages of ₹11,500 — your Basic; HRA and conveyance are exactly half your pay, so nothing is added back" |
| ESI (employee) | 172.50 | "0.75% of your gross of ₹23,000. You stay covered until 30 September because your raise came inside the April–September period; from 1 October this line stops" |
| Professional tax | 200.00 | "Maharashtra, for men earning above ₹10,000 a month" |
| TDS | 0.00 | "New regime (no election made). Your projected income for the Tax Year is below the level at which the rebate removes tax — a projection" |
| **Net pay** | **21,247.50** | ₹23,000.00 − ₹1,380.00 − ₹172.50 − ₹200.00 |

Every sentence is assembled from the line's lineage — the rule, the inputs, the rule version (US-M05) — and the ESI sentence is the one that prevents October's escalation: without it, G's October payslip shows a deduction vanishing with no reason, which is the query JTBD-M3 exists to stop. The TDS sentence carries the projection label because the Tax Year 2026-27 rebate is **[Hypothesis]** (§03.3 worked example 3).

#### User stories and acceptance criteria — the employee

Ravi's stories are where the filing machine becomes visible to the person it is about. Most run on ESS (§07.5.1); frontline delivery over WhatsApp is v2 (§12.3), so the R1 frontline surface is the terminal, the supervisor and the in-product app.

**US-R01 · A payslip whose every line explains itself** · Job: JTBD-R1 · Exercises: FR-PAY-601, FR-PAY-602 · Release: R1
*As* an employee, *I want* each deduction on my payslip to open into its rule and its inputs, *so that* I trust the number without asking anyone.
- **AC-R01.1** — PF shows the EPF wages and whether the ceiling applied ("12% of ₹15,000"); ESI shows the gross and the 0.75% rate while he is covered; PT shows the state and the slab; LOP shows the dates and the day-rate method; an arrear shows the month it belongs to.
- **AC-R01.2** — The payslip renders in the employee's chosen language from the tenant's `vernacular.language_set` (§12.6).
- **AC-R01.3** — The wage slip in the form configured for the establishment's state (EV-053) is available on or before each wage payment (§06.11).
- **Negative** — a line without engine lineage cannot render; a manual adjustment appears only as a labelled one-time line naming its approver.

**US-R02 · Flag a missing punch in seconds** · Job: JTBD-R3 · Exercises: §09 regularisation (FR-REG-001); FR-PAY-302 · Release: R1 in-product and via supervisor; WhatsApp at v2 (§12.3)
*As* a frontline worker, *I want* to report a missing punch in a sentence, *so that* a device fault never costs me a day's pay.
- **AC-R02.1** — The flag creates a regularisation task for his supervisor carrying the date and the terminal's last push time. On WhatsApp, because Ravi starts the conversation, the reply falls inside the 24-hour employee-initiated window that carries no per-message charge (EV-088).
- **AC-R02.2** — Resolved before inputs close (M2): no LOP for that day. Resolved after: an adjustment in the next run, shown as a labelled line (AC-302.1).
- **AC-R02.3** — The worker is identified by worker ID or supervisor confirmation, never by the handset number alone (§03.12 principle 6).
- **Negative** — a flag from a number not linked to the worker goes to the supervisor for identity confirmation before it is actioned.

**US-R03 · Pull a statutory document, with an honest "not yet"** · Job: JTBD-R4 · Exercises: FR-PAY-707; AC-802.2 · Release: R1 for FY 2025-26 and earlier; R3 for Tax Year 2026-27 (A-14)
*As* an employee, *I want* to download my tax certificate myself, *so that* a loan or visa application does not wait on HR.
- **AC-R03.1** — Form 16 for FY 2025-26 and earlier is downloadable once the employer has loaded the TRACES-generated certificate (EV-048).
- **AC-R03.2** — For Tax Year 2026-27 the screen says Form 130 is not yet available because its salary detail depends on a Q4 statement format CBDT has not released (EV-046), shows 15 June 2027, and offers the YTD statement meanwhile (AC-802.2).
- **AC-R03.3** — Search accepts "Form 16" and "Form 130" interchangeably (EV-050).
- **Negative** — the product never issues a certificate it generated itself (EV-048).

**US-R04 · Choose my tax regime before the gate closes** · Job: JTBD-R1 · Exercises: FR-PAY-205; FR-PAY-210 regime election · Release: R1 (A-10)
*As* an employee, *I want* to elect or switch regime before it locks, with both projections side by side, *so that* I am not surprised in March.
- **AC-R04.1** — While the Tax Year's first payroll has not run and the declaration is unlocked, Ravi can elect or switch; after that payroll, the screen shows the election as locked for the employer's purposes (the vendor-documented gate — r3/02 finding 22).
- **AC-R04.2** — With no election, the new regime applies (1961-Act s.115BAC(6); the 2025-Act section is unmapped — §03.3 worked example 3), and the payslip says so.
- **AC-R04.3** — The side-by-side comparison uses the engine's projection (FR-PAY-205) and is labelled a projection.
- **Negative** — an election after the gate never changes TDS mid-year.

**US-R05 · Submit proofs inside the window and watch their status** · Job: JTBD-R1 · Exercises: §07 Form 124 surface (FR-CHR-071); §07 Example N · Release: R1 (A-10)
*As* an employee, *I want* to submit, withdraw and resubmit proofs while the window is open and see each one's outcome, *so that* my year-end deduction is what I expected.
- **AC-R05.1** — The window opens and locks on tenant-set dates, `declarations.proof_window_open` and `declarations.proof_lock_date`; the incumbent guidance opens it in December (r3/02 finding 23, vendor documentation read).
- **AC-R05.2** — Until the lock or approval, Ravi can withdraw, edit and resubmit; each proof shows approved (with the approved amount), rejected (with the reason) or pending.
- **AC-R05.3** — At the lock, unproved declarations reverse in the true-up (§07 Example N), and Ravi sees the projected monthly TDS change before the true-up month the employer chose runs (US-V13).
- **Negative** — a proof submitted after the lock is recorded but changes nothing for the Tax Year, and the screen says so.

**US-R06 · Consent before any biometric enrolment, and a real alternative** · Job: JTBD-R5 · Exercises: §09 template entity; Part E-6; EV-060, EV-072 · Release: R1
*As* a frontline worker, *I want* to be asked in writing before my face or fingerprint is enrolled, and to have a way to mark attendance if I say no, *so that* the system is something I agreed to.
- **AC-R06.1** — Consent in writing is captured before the template is created (SPDI r.5(1); EV-060, provenance caveat — pull from the primary source before customer use), as a versioned consent record naming whose artefact it is; who owes the duty is under counsel review (§23), so the capture is built either way.
- **AC-R06.2** — Declining sets the non-biometric path §09 specifies as Ravi's attribute; his pay and his Form IX IN and OUT entries are unaffected (EV-072: no Indian law requires biometric attendance).
- **AC-R06.3** — Withdrawing consent triggers two-phase device-side template erasure (§09; Part E-6); the attendance record survives, because the template entity is separate from the attendance event.
- **Negative** — no tenant configuration makes enrolment a condition of employment or pay; a "biometric only" setting does not exist (Part D-10).

**US-R07 · Know what happens if I decline Aadhaar** · Job: JTBD-R5 · Exercises: Part E-11; AC-701.2; §07 · Release: R1
*As* an employee, *I want* to be told plainly what declining Aadhaar changes, *so that* I decide with the consequences in front of me.
- **AC-R07.1** — Declining leaves salary unaffected. If a filing needs seeding, Ravi receives a notice that he is excluded-and-flagged from that filing, what it means for his PF record and what the alternatives are (§07), and the operator receives the matching notice (Part E-11).
- **AC-R07.2** — The notice text is a counsel-cleared template (FR-LEG-002).
- **Negative** — no screen tells an employee that Aadhaar is required to be paid (Part D-10).

**US-R08 · See my settlement inside the statutory clock** · Job: JTBD-R1, JTBD-R4 · Exercises: FR-PAY-801–803; AC-802.2 · Release: R1
*As* a leaving employee, *I want* my settlement lines and their dates, *so that* I know when I will be paid and can hand my next employer what they need.
- **AC-R08.1** — On exit, Ravi sees the settlement lines of §03.8 — final wages, leave encashment, gratuity where eligible, TDS, recoveries — each with its derivation, and the date by which final wages are payable on the establishment's working-day calendar (CoW s.17(2); AC-803.2).
- **AC-R08.2** — Once gratuity is payable, its 30-day payment date shows (CoSS s.56; AC-803.1).
- **AC-R08.3** — He receives the continuity packet — YTD earnings, TDS deducted, UAN, ESI IP, leave balance — for his next employer (AC-802.2).
- **Negative** — a Tax Year 2026-27 Form 130 is not promised on exit (US-R03).

**US-R09 · Activate my UAN myself, prompted rather than waiting** · Job: JTBD-R4 · Exercises: §03.2 onboarding item 1; §07 Example L · Release: R1
*As* a joiner at an EPF-covered establishment, *I want* clear steps to generate and activate my UAN, *so that* my first ECR line is not held back.
- **AC-R09.1** — A joiner with no prior UAN is prompted to generate and activate it himself through Aadhaar face authentication in the UMANG app (EPFO HO circular dated 30.07.2025; §03.2), and the operator's chase task tracks it.
- **AC-R09.2** — A joiner with a prior UAN enters it with the Form 11 declaration, and a duplicate UAN is prevented (§07 Example L).
- **AC-R09.3** — A joiner who declines Aadhaar is told that self-generation needs it and what exclude-and-flag means for him (US-R07).
- **Negative** — the product never enters an Aadhaar number on any portal on an employee's behalf (§22.2.3).

**US-R10 · See and change what I have consented to** · Job: JTBD-R5 · Exercises: §07 consent entity (FR-CHR-100); Part E-6; FR-LEG-002 · Release: R1
*As* an employee, *I want* one screen listing each consent I have given, under which notice and when, with a way to withdraw, *so that* consent is something I hold, not something done to me.
- **AC-R10.1** — Each consent shows its purpose, the notice-text version it was captured under (FR-LEG-002), the date, and whose artefact it is (Part E-6); the SPDI written-consent items (financial information, biometric enrolment) are listed separately from the rest (EV-060, provenance caveat).
- **AC-R10.2** — Withdrawal takes effect from its date and states its consequence plainly — for biometric enrolment, the non-biometric path and template erasure (US-R06).
- **AC-R10.3** — Across the ~May 2027 switch, the screen shows which regime each consent was captured under, because two consent regimes run concurrently across it (Part E-6; EV-058 — [Verified — mirror], pull from the primary source before customer use).
- **Negative** — withdrawing a consent never stops salary, and no screen says it would (Part D-10).

#### Success criteria

| Criterion | Target | How measured |
| --- | --- | --- |
| Payslip self-explanation | Employee accepts without escalation > 90% | Escalation deflection |
| Leave decision latency (desk) | < 4 working hours | Approval SLA |
| Missing-punch resolution (frontline) | Same-day, no LOP if device-fault | Regularisation log |
| Document self-service | Form 16/130, PF, ESI pullable | Feature usage |
| Language coverage | Frontline UX in ≥ regional language + Hindi + English | Locale support |

#### Day-in-the-life

- **Ravi-desk, 20:00:** On the couch, opens the app, books two days' leave next month (instant balance check, manager notified), taps his latest payslip, sees a plain-language line "PF employee ₹1,800 — 12% of ₹15,000 wage ceiling," nods, closes app. No HR contact all month. *This is the target state — HR inbox deflection is the cost lever behind §13's assistant economics.*
- **Ravi-frontline, 06:10:** Punches in for the early shift on the plant eSSL terminal; the punch POSTs to the tenant URL via ADMS (§09). **14:00:** Realises his out-punch two days ago didn't register (device was down). He sends a WhatsApp to the shift bot: "18 tarikh ka out punch missing." Supervisor gets a regularisation task; it's approved before payroll cut-off. No silent LOP. **Month-end:** His payslip is a WhatsApp-deliverable PDF in Tamil.

#### Cost note (ties to §13)

Ravi is priced per employee but *consumed per user*. A high-touch Ravi (many queries) can run up more inference cost than his seat carries, which is why per-user rate limits are P0 (§13; a round-two research finding on Copilot Studio metering, documentation-level and not re-verified here: "even Microsoft hard-disables agents at 125% of prepaid capacity"). But Ravi drives only the **inference** and **WhatsApp** lines of the four-line COGS stack, and inference is the smallest of the four; the dominant line is **supervised filing**, which scales per registration × state × filing type, not per employee (EV-088). **[Reversed]** — earlier drafts made Ravi the product's cost driver, resting on a 93–99% inference gross-margin claim that has been withdrawn (EV-088). The persona is also the deflection engine: every query Ravi self-serves is an HR admin minute and an inference call saved. **Kill line:** if §20 V-04/V-14 instrumentation finds a heavy Ravi's inference cost exceeds what his seat carries without rate limits controlling it, the metered-limit design (§13) becomes load-bearing rather than defensive.

---

### 03.6 P5 — Vikram, the founder / CXO

> "I want to spend zero minutes a month on payroll and never spend one afternoon with an EPFO inspector. Charge me for that."

#### Context

Vikram, 46, is the founder of the 60-person Pune services firm where Meera works (and, in the 80–200 case, he's the CFO/COO who inherited HR oversight). He is the **economic buyer** below ~120 employees; above that, a CFO or CHRO becomes the buyer and the approver role moves to a CFO or COO (§03.1 rule 4) — Vikram himself where he is that CFO or COO, and otherwise a founder who keeps read access and the digest (US-V16). He does not want features; he wants *risk removed* and *time returned*. He signs the cheque, and he signs it against fear (a notice, a penalty, an employee lawsuit) far more readily than against delight.

He is price-sensitive but not price-primary: the §04 alternatives (Kredily free, Zoho ₹1,000/mo at 25 employees, Tally ₹0 incremental) set his reference price (Source: §04 price-floor table; vendor pricing pages read, not executed — capture dates in §21) **[Verified]**, but what he actually fears is that the free/cheap thing does not produce a filing the portal accepts, and he finds out via an EPFO interest-and-damages notice. No vendor in the six-vendor priced set claims to submit any filing on his behalf (EV-030).

#### Goals

1. **Compliance risk off his desk.** No penalties, no notices, no personal liability exposure under labour codes.
2. **Payroll as a non-event.** It runs, it's right, it's filed — he hears about it only if something breaks.
3. **Cost predictable and defensible** at board/investor level.
4. **Scales with the company** — he doesn't want to re-platform at 200.
5. **Data he can trust for decisions** — headcount cost, attrition, statutory liability accruals (gratuity, leave encashment) for the balance sheet.

#### Pains

- **Founder liability feels personal.** He believes the "employer" and named responsible officers carry personal liability for statutory defaults under the Codes, and that the Codes raised penalties versus the repealed Acts. This is the fear that opens the wallet. **[Hypothesis]** — the personal-liability framing in our evidence traces to a vendor compliance guide shown elsewhere to contain errors; which offence and officer-liability provisions apply, and their quantum, need counsel confirmation (Code on Wages and CoSS penalty chapters; §06, §23). The fear is real either way; the product must not quantify it for him until counsel has.
- **He can't tell if he's actually compliant.** Meera says yes, the CA says mostly, and he has no independent view — exactly the §03.2 14:30 moment from Meera's side.
- **Every cheap tool leaves a gap.** Kredily and Zoho give away the computation and charge for the outputs — bank payout files, PF/ESI challans, the annual tax certificate, Form 124 (EV-029 — pricing pages read); TallyPrime generates the statutory artefacts but carries no state PT slab table and no LWF engine (EV-032 — product documentation read, not executed); and no vendor in the six-vendor priced set claims to submit any filing (EV-030). He ends up with a tool *and* a CA and pays twice. **[Verified]** as captured in round five (capture dates in §02 and §21).
- **Re-platforming risk.** He bought an HRMS in 2022 that the company outgrew; he does not want to do that again.
- **Investor/audit optics.** At a raise or an audit, statutory liabilities (unfunded gratuity, unpaid PF) surface as diligence red flags.

#### Jobs-to-be-Done

- **JTBD-V1 (emotional, primary):** *When* I think about statutory compliance, *I want to* feel it is guaranteed and off my desk, *so I can* stop carrying personal risk.
- **JTBD-V2 (functional):** *When* I look once a month, *I want to* see a single "are we compliant, did everything file" status, *so I can* confirm without becoming an expert.
- **JTBD-V3 (functional):** *When* the board asks, *I want to* show headcount cost and statutory-liability accruals, *so I can* answer without a fire drill.
- **JTBD-V4 (functional):** *When* we grow from 60 to 200, *I want to* the same system to scale, *so I can* avoid a re-platforming project.
- **JTBD-V5 (functional):** *When* the month's payroll is ready to pay, *I want to* approve it from one artefact that shows what changed, what is owed and by when, *so I can* sign in minutes without redoing Meera's work or signing blind (§03.6a).

What the product can take off Vikram's desk is the artefact, the attended filing run and the evidence; the statutory liability stays with him as employer — it is non-delegable (EV-030; §22). JTBD-V1 is served by making the risk visible and small, never by promising to absorb it.

#### Worked example 1 — what one missed ECR actually costs (the Push that opens the wallet)

Vikram signs against fear, so the fear needs a rupee figure. Take a 60-person firm with ₹4,50,000 of total EPF dues (employee + employer) for a month, where the return is filed **5 months late** after a notice. The exposure stacks three ways:

- **Interest**, auto-calculated by EPFO and **mandatory with the contribution** (EV-039), at **12% p.a.** (§06, notified by S.O. 2698(E) — **[Verified — mirror]**; pull from the primary source before customer use) ≈ 4,50,000 × 12% × (5/12) = **₹22,500**.
- **Damages** under s.14B, which EPFO also calculates but which may be deposited later at the employer's option (EV-039). The damages schedule is not verified in our evidence (§03.2), so the product shows it as an estimate from the `epf.damages_scale` parameter, labelled as such — never as a quoted figure.
- **The cascade.** Filing is strictly month-wise, with a four-month transitional relaxation: a Regular return for month M is allowed only once returns for all active members of month M−4 have been filed (EV-038). A month left five months behind is therefore not one late month — it blocks the Regular return for month M+4 and every month after it, and their contributions cannot be paid (payment follows return approval, EV-036) while their interest runs.

(Source: EV-038, EV-039; §06) **[Verified]** on the mechanism and **[Verified — mirror]** on the 12% rate, whose notification was read through a professional alert rather than the gazette (§06); the damages rate and the Codes' officer-liability quantum are **[Hypothesis]**, routed to §20 and §23.

This is the GTM Push (§03.8b): ₹22,500 of interest on *one* month's dues before damages — and a broken process repeats it every month while blocking the filing ledger behind it. Against that, a year of illustrative ₹100 PEPM software for 60 people is ₹72,000 (a point inside the ₹80–200 clearing band, EV-027). Acceptance: the compliance dashboard (JTBD-V2) surfaces *accruing* exposure in rupees on any red tile ("ECR overdue 4 days — interest accruing at ~₹X/day; damages estimate pending EPFO assessment"), predicted by the product and reconciled to what EPFO actually assesses, because a red light Vikram can price is the thing that converts the incumbents' Habit into a purchase.

#### Worked example 2 — the gratuity liability line Vikram needs for the board (JTBD-V3)

At a 60-person firm, an unfunded gratuity liability is a diligence red flag precisely because it is invisible until computed. For a single ₹50,000-last-drawn (Basic+DA) employee at 5 years, the accrued liability is (15/26) × 50,000 × 5 = **₹1,44,231** (§03.2). Across a roster, the actuarially-accrued balance-sheet provision (under whichever employee-benefits accounting standard the customer reports against — an accounting-policy input its auditor sets, not something our evidence covers) is the sum of each employee's projected obligation — a number Vikram currently gets only when the CA or an actuary produces it once a year, too late to manage.

Acceptance for JTBD-V3: the product surfaces a **live, roster-wide gratuity and leave-encashment accrual** (with the configured `gratuity_payment_ceiling` applied — §03.2), refreshed each payroll, so the board question is answered from a dashboard, not a fire drill. This is the same effective-dated engine Suresh needs (§03.3), viewed at the founder's altitude — one data model, two surfaces (design principle 7). (Source: CoSS s.53) **[Verified]** on the per-employee statutory computation; the actuarial provisioning method and its assumptions are an accounting-policy input (`gratuity_provision_method`, set per tenant with its auditor), not a payroll constant **[Hypothesis]**.

#### Acceptance criteria for JTBD-V2 (the single compliance status view)

Vikram's "one screen, five minutes" only works if green means *filed and acknowledged*, not *computed*. The status tile per obligation must resolve to a defensible state, not a vibe:

| Obligation | Green | Amber | Red |
| --- | --- | --- | --- |
| ECR (EPF) | Return approved, challan (TRRN) paid, receipt stored for the period (EV-036) | Run locked; return not yet approved or challan unpaid; due in ≤ 3 days | Past the due date (15 days after month-end) → interest auto-accruing (EV-039); a gap older than four months blocks later returns (EV-038) |
| ESI challan | Paid + acknowledgment | Locked, due ≤ 3 days | Past due |
| PT return (per state) | Filed per state cadence, acknowledgment stored | Due within cadence window | Missed a state's cadence (e.g. a February true-up missed) |
| TDS deposit + Form 138 | Challan paid; the quarter's return — validated by the deductor through the FVU utility and uploaded (EV-052; §22) — accepted, with its receipt stored | Return generated in the correct format version but not yet uploaded; or Q4 format not yet released (EV-046) → *expected* amber, not a fault | Deposit missed the 7th (30 April for March deductions — the 1961-Act dates, **[Hypothesis]** under the 2026 Rules until r.218 is read, §06.11; §20 V-20), or a Q1–Q3 return past its due date (EV-049) |
| Appointment letters / wage slips | Every worker at an establishment of 10+ workers holds a letter in the state-prescribed form; wage slips issued (EV-053, EV-057) | New joiners pending letter | Any worker owed a letter without one |

Acceptance: the view is **acknowledgment-driven** — a filing counts as green only when the portal's acknowledgment or receipt is stored against the period, closing the §03.8 loop (the filing is the artefact). A failed filing triggers the *proactive* alert Vikram wants ("here's what happened, here's the fix in progress"), never silent amber. The deliberate exception is the Q4 Form 138 banner, which is amber-by-design because the format has not been released (EV-046) — the product must not show red for a government gap.

#### User stories and acceptance criteria — the approver

Vikram's stories are the approver's (§03.1): below ~120 they are his, above it a CFO's, with Vikram reading the digest. Every one of them is an act the machine makes irreversible or money-moving, which is why each is bound to an object (§03.6a) rather than to a screen.

**US-V01 · Approve the month from one artefact** · Job: JTBD-V5, JTBD-V1 · Exercises: FR-PAY-301 M6, M8; §03.6a · Release: R1
*As* the approver, *I want* one artefact that shows what changed, what is owed and by when, *so that* I sign the month in minutes and can defend the signature later.
- **AC-V01.1** — Given a run at PROCESSED with no blocking item, the artefact shows sections A–H of §03.6a in order and its variance bridge closes to ₹0.00.
- **AC-V01.2** — Approve (M6) and lock (M8) are two acts; "approve and lock" performs both in sequence and records each transition with its own timestamp.
- **AC-V01.3** — Every decision takes step-up re-authentication (NFR-SEC-103; AC-004.4).
- **AC-V01.4** — The artefact is complete on a phone: every section renders and every driver row drills to its employees.
- **Negative** — no figure is editable from the artefact; the only actions are approve, approve and lock, and return for correction.

**US-V02 · Return for correction with a reason, not a phone call** · Job: JTBD-V5 · Exercises: FR-PAY-301 M7; §03.6a return codes · Release: R1
*As* the approver, *I want* to send the run back with a coded reason and the lines I dispute, *so that* the operator fixes exactly that.
- **AC-V02.1** — A return needs a code from the closed set in §03.6a and may select employees or lines; a note without a code is refused.
- **AC-V02.2** — Given APPROVED but not LOCKED, a return voids the approval and keeps it (M7); given LOCKED or later, return is not offered and the artefact names the correction run as the route (FR-PAY-306).
- **Negative** — a return never changes a figure.

**US-V03 · See the cash the month needs, by date, before approving** · Job: JTBD-V1, JTBD-V3 · Exercises: §03.6a section E; FR-PAY-902; AC-701.8 · Release: R1
*As* the approver, *I want* the month's cash laid out by date, *so that* the salary and every statutory payment are funded before they fall due.
- **AC-V03.1** — The cash plan lists, cumulatively by date, net salary on the planned pay date — on or before the Code on Wages s.17(1) limit, the 7th for a monthly wage period (§06.9) — the TDS deposit, the EPF challan, the ESI contribution and PT by state.
- **AC-V03.2** — For any head past its due date, the line adds predicted s.7Q interest per day of delay at 12% p.a. (EV-039; §06) on the day count `epf.interest_day_count`, labelled a prediction to be reconciled with the portal's figure; §03.8a failure branch 2 works the arithmetic.
- **Negative** — damages are never shown as a figure: the scale `epf.damages_scale` is unverified, so the line reads "EPFO-assessed; payable now or later at the employer's option" (EV-039).

**US-V04 · Release salaries, and see the bank's own step as a step** · Job: JTBD-V1 · Exercises: FR-PAY-301 M9; FR-PAY-901, FR-PAY-903, FR-PAY-904; §16 · Release: R1 (file first)
*As* the payment approver, *I want* to release the salary file and see the bank's own approval as a tracked stage, *so that* "released" never gets mistaken for "paid".
- **AC-V04.1** — The bank file generated at lock totals net pay exactly (AC-901.1), and Vikram releases it as payment approver, distinct from the processor (FR-PAY-904).
- **AC-V04.2** — Where the bank requires its own maker-checker and OTP in its corporate portal, the run shows "awaiting bank-side approval" until the bank reports status (r3/02 finding 10, vendor documentation read; §16).
- **AC-V04.3** — Returned credits come back per employee with a reason and a re-queue action that does not re-pay the successful lines (AC-903.1); DISBURSED records the actual disbursal date, which re-derives only the date-keyed outputs (AC-210.3).
- **Negative** — the product never holds the bank credential or the OTP; money moves on the employer's authentication (§22 P5).

**US-V05 · Instruct the portal's return approval against the exact statement** · Job: JTBD-V1 · Exercises: FR-OPS-004 row 1; FR-PAY-711 F9 · Release: R1 employer-attended; R2 operator-attended (A-23)
*As* the named approver, *I want* to see EPFO's rendered return statement with its reconciliation before I instruct its approval, *so that* I never approve a return that cannot be cancelled and was wrong.
- **AC-V05.1** — Given a captured statement reconciled with no difference (US-S03), Vikram instructs "approve return"; the instruction binds to the statement's hash (AC-004.1) and needs step-up (AC-004.4).
- **AC-V05.2** — The screen states, in registered wording, that an approved return can never be cancelled (EV-036) and that statutory liability for the filing stays with the employer (FR-LEG-036).
- **AC-V05.3** — If the statement on screen changes after the instruction, the instruction is void and the product asks again (AC-004.1).
- **Negative** — the instruction is not offered while any reconciliation difference is open.

**US-V06 · Confirm the gate and hand off the challan** · Job: JTBD-V1 · Exercises: FR-PAY-301 M10; FR-PAY-711 F14; FR-OPS-004 row 2 · Release: R1
*As* the named approver, *I want* one confirmation at the last point a downward correction is possible, *so that* what we pay is what we owe.
- **AC-V06.1** — Given a reconciled Due Deposit Balance Summary (US-S04), Vikram sees contributions, EDLI, administrative charges and any s.7Q interest as one payable total, with damages separately as "now or later" (EV-039); confirming the gate releases challan generation, and the challan with TRRN goes to the authorised payer.
- **AC-V06.2** — The confirmation screen states that after payment initiation a downward correction is impossible (EV-037).
- **AC-V06.3** — More than one challan per wage month is permitted (EV-036), but a second payment for the same member and month is refused (AC-701.8).
- **Negative** — the user who uploaded the return cannot confirm the gate (AC-004.3 applied by tenant policy in employer-attended sessions; §03.1 rule 2).

**US-V07 · Approve a date-of-exit marking** · Job: JTBD-V1 · Exercises: FR-OPS-004 row 3; EV-041 · Release: R1
*As* the named approver, *I want* to see the member, the date and the reason before a date of exit is marked, *so that* we never need a joint declaration to undo our own mistake.
- **AC-V07.1** — The instruction shows the member, the date and the reason, with the warning that a wrong date needs a joint employer–employee declaration to correct (EV-041), and binds to those three values.
- **AC-V07.2** — Where the member's final month has not yet been returned, the screen shows that contributions run only to the date of leaving (EV-040).
- **Negative** — a date of exit earlier than the last day for which a locked run paid the member is refused before it reaches the portal.

**US-V08 · Five minutes a month on an acknowledgement-driven status** · Job: JTBD-V2 · Exercises: §03.6 JTBD-V2 table; FR-PAY-710; §03.6a events · Release: R1
*As* the founder, *I want* one status view and one digest, *so that* I confirm the month without becoming an expert.
- **AC-V08.1** — One tile per registration and obligation, coloured by the JTBD-V2 table's rules; green only at FILED with the acknowledgement stored.
- **AC-V08.2** — The monthly digest lists every approval, instruction and gate confirmation made that month — by whom, when, with a link to the artefact — so that above ~120 Vikram sees what the CFO signed (§03.1 rule 4).
- **AC-V08.3** — Artefacts carrying the single-person, external-approver or delegate marker, and any portal approval recorded as uninstructed (US-S03), are listed first.
- **Negative** — a red tile always shows its accruing exposure and the owner of the fix (§03.6 worked example 1); red tiles are never summarised into a count.

**US-V09 · A live liability line for the board** · Job: JTBD-V3 · Exercises: §03.6 worked example 2; §03.5 worked example 3; A-22 · Release: R1
*As* the founder, *I want* gratuity and leave-encashment liabilities refreshed after every lock, *so that* the board question is a screen, not a fire drill.
- **AC-V09.1** — After each lock, the dashboard shows the roster-wide gratuity accrual under the configured ceiling parameter and the leave-encashment liability under the configured ratio and day-rate, each with its parameter values and their sources.
- **AC-V09.2** — A line that reads an unset parameter shows "incomplete — parameter unset", never zero.
- **Negative** — the accounting provision (`gratuity_provision_method`) is never computed by default; it is an input the tenant's auditor sets (§03.6 worked example 2).

**US-V10 · Delegate while away, without breaking four eyes** · Job: JTBD-V1 · Exercises: FR-CHR-086 · Release: R1
*As* the approver, *I want* to delegate for a date range to a named backup, *so that* a filing never waits for my return from travel.
- **AC-V10.1** — The delegate inherits the delegator's scope and no wider (FR-CHR-086; §07.5.2).
- **AC-V10.2** — A delegate who made the run cannot approve it; the item escalates to the next configured approver, never to the maker.
- **AC-V10.3** — The artefact records "approved by delegate for [delegator]", and the digest lists it (US-V08).
- **Negative** — a delegation that outlives the delegator's own authority lapses rather than orphaning pending items (§07.5.2).

**US-V11 · The single-person tenant, honestly marked** · Job: JTBD-V1 · Exercises: FR-PAY-304 AC-304.1; §03.1 rule 1 · Release: R1
*As* a founder who runs payroll himself, *I want* to approve my own run under an explicit, visible exception, *so that* the tenant can operate before it has a second payroll user, without pretending to four eyes it does not have.
- **AC-V11.1** — Combining the roles requires a recorded policy exception naming the founder and the reason (AC-304.1).
- **AC-V11.2** — Every artefact produced under it carries the single-person marker in section A and in the digest; adding a second approver ends the exception from that date.
- **Negative** — the exception never covers a change gated by the §07 matrix floors (FR-CHR-105) or an act performed by our compliance operator (AC-004.3).

**US-V12 · Approve a settlement against its clock** · Job: JTBD-V1; serves JTBD-M6 · Exercises: FR-PAY-803; FR-CHR-086 · Release: R1
*As* the approver, *I want* an F&F artefact that shows each settlement line and the date it must be paid by, *so that* the final-wages clock is never missed in a queue.
- **AC-V12.1** — The `SO-OFFCYCLE` artefact for an F&F shows the six lines of §03.8, the final-wages due date on the working-day calendar and, once gratuity is payable, its 30-day date.
- **AC-V12.2** — An F&F still unapproved `fnf.escalation_lead_working_days` before the final-wages due date escalates (FR-CHR-086) and its tile turns amber.
- **Negative** — an F&F whose gratuity line is "borderline — see rule" (§03.2 worked edge case 3) cannot be approved until the approver chooses the treatment explicitly; the product does not default it.

**US-V13 · Choose the true-up month for the Tax Year** · Job: JTBD-V1, JTBD-V3 · Exercises: §07 Example N; r3/02 finding 23 · Release: R1 (A-10)
*As* the approver, *I want* to choose which payroll month absorbs the year-end tax correction and see its effect per employee, *so that* no one's March net pay collapses without warning.
- **AC-V13.1** — Once the proof lock has passed, the artefact for the chosen true-up month carries a "declaration reversals" driver row showing, per employee, the TDS change from reversing unproved declarations (§07 Example N).
- **AC-V13.2** — The true-up month is an explicit employer choice recorded with the approver's identity (r3/02 finding 23); there is no default month.
- **Negative** — a true-up that would make an employee's net pay negative is a blocking item (FR-PAY-1004) shown before approval.

**US-V14 · Sign the written authority knowing exactly what it covers** · Job: JTBD-V1 · Exercises: FR-OPS-002; FR-LEG-035, FR-LEG-036 · Release: R2 on counsel clearance (A-23)
*As* the authorised signatory, *I want* the authority to list every registration, portal and act it covers and what it never covers, *so that* I can revoke it or narrow it with confidence.
- **AC-V14.1** — The instrument shows registrations, portals and acts, always-excluded acts, instruction-gated acts, named contacts and validity (FR-OPS-002), rendered from a counsel-cleared template.
- **AC-V14.2** — Vikram can revoke it in the product with immediate effect for new sessions (AC-002.4) and reads every act done under it in the on-behalf log (FR-OPS-008).
- **Negative** — neither the instrument nor its signing screen says the vendor files for the employer or takes on the statutory liability (FR-LEG-036).

**US-V15 · The first ECR after crossing twenty** · Job: JTBD-V1, JTBD-V4 · Exercises: FR-PAY-1004 AC-1004.2; FR-OPS-011 · Release: R1
*As* the founder, *I want* to see every obligation that switched on when we reached twenty, and to be walked through the first return, *so that* the wedge event does not become our first notice.
- **AC-V15.1** — When the establishment's count, in the statute's unit, first reaches 20 (EV-057), the status view lists what turned on — EPF registration, UAN tasks, the first ECR, the grievance committee (US-M08) — with their first due dates.
- **AC-V15.2** — The first live ECR submission runs co-attended — the employer's user operates, our staff guide (FR-OPS-011) — and produces the tenant's first `SO-RETURN` and `SO-GATE`.
- **Negative** — there is no test submission: an approved ECR can never be cancelled (EV-036; FR-OPS-011).

**US-V16 · Hand the approver role to a CFO without losing the record** · Job: JTBD-V4 · Exercises: FR-CHR-105 (role changes are maker-checked); FR-OPS-002 · Release: R1
*As* the founder of a firm crossing ~120, *I want* to move the approver role to our new CFO and keep read access, *so that* the gate stays and only the person changes (§03.1 rule 4).
- **AC-V16.1** — Moving the approver role is itself a maker-checked change with an effective date (FR-CHR-105); artefacts decided before it keep Vikram as decider.
- **AC-V16.2** — After the change Vikram keeps read access to every artefact and the digest, and the written authority's named contacts change by a new version, not an edit (FR-OPS-002).
- **Negative** — an artefact presented to Vikram before the change is superseded and re-presented to the new approver; a user who no longer holds the role cannot decide it.

**US-V17 · Read everything done under our authority** · Job: JTBD-V1 · Exercises: FR-OPS-008; AC-008.1, AC-008.3 · Release: R1 for co-attended sessions; R2 for operator-attended (A-23)
*As* the employer's designated contact, *I want* to be told when a session on our portal accounts starts and ends, and to read and export what was done, *so that* our authority is never used without our knowing.
- **AC-V17.1** — Vikram is notified at the start and end of every session run under the tenant's authority, with a link to its log entries (AC-008.1).
- **AC-V17.2** — The log shows, per act, the named person, the portal, the act, the object hash, any instruction he gave and the portal's own reference numbers (FR-OPS-008).
- **AC-V17.3** — Exporting a registration's log for a period yields a signed statement suitable for an inspection or a dispute (AC-008.3).
- **Negative** — the log never contains a credential, an OTP, a CAPTCHA image or an Aadhaar number (AC-008.4).

**US-V18 · Instruct a quarterly statement upload against its FVU result** · Job: JTBD-V1 · Exercises: FR-OPS-004 row 4; FR-PAY-706; FR-OPS-015; FR-PAY-711 F6, F16 · Release: R1 for Q1–Q3 (A-11); Q4 R3, when released (A-13)
*As* the named approver for the deductor, *I want* to instruct each Form 138 upload only against the validated `.fvu` output, *so that* the statement that reaches the portal is the one that was checked.
- **AC-V18.1** — The `SO-STATEMENT` artefact shows the FVU result, the RPU and FVU versions used against those the period requires (EV-052) and the `.csi` match of every challan; the instruction is offered only when all three pass.
- **AC-V18.2** — The instruction binds to the hash of the `.fvu` output (FR-OPS-004 row 4); a regenerated output voids it (AC-004.1).
- **AC-V18.3** — The screen names the form in both vocabularies, Form 138 (ex-24Q), and states that a filed statement is corrected only by a correction statement on its period's format family (EV-050, EV-052).
- **AC-V18.4** — Whether the upload needs the signatory's DSC or EVC is unknown until captured (`it.fvu_upload_signature`, §22.4.3); where it does, the step is the authorised signatory's, never performed with a DSC we hold (§22 P6).
- **Negative** — no `SO-STATEMENT` is ever presented for Tax Year 2026-27 Q4: the instance is BLOCKED on the unreleased format (EV-046).

**US-V19 · Instruct a state PT or LWF return and its challan** · Job: JTBD-V1 · Exercises: FR-OPS-004 rows 5–6; FR-PAY-703, FR-PAY-704; FR-OPS-017 · Release: R2 per state — the Maharashtra return on capture (A-15), other states and LWF per design-partner state (A-16, A-17)
*As* the named approver, *I want* each state return and challan reconciled to the PT deducted in that state before I instruct it, *so that* a short remittance never reaches a state portal that may not accept a correction.
- **AC-V19.1** — One `SO-PT` artefact per state registration per that state's cadence, never two states together (AC-017.3); Maharashtra's PTRC and PTEC are separate registrations with separate artefacts (§22.4.4).
- **AC-V19.2** — The return values and the challan amount reconcile to the PT deducted from employees working in that state, to the rupee (AC-703.1); in February the ₹300 true-up lines (§03.3 worked example 2) show as their own row.
- **AC-V19.3** — The screen states that the state is treated as irreversible until its runbook says otherwise (FR-OPS-004 row 5).
- **Negative** — no artefact is presented for a state whose runbook is not PUBLISHED or whose row is not state-primary-sourced; the liability still shows, with the reason no session is offered (AC-017.1).

**US-V20 · Instruct the ESIC challan against the computed contribution** · Job: JTBD-V1 · Exercises: FR-OPS-004 row 6; FR-PAY-702, FR-PAY-902; §22.4.2 · Release: R1 (A-07); the upload file on A-08's schedule
*As* the named approver, *I want* the ESIC challan amount reconciled to the month's computed ESI liability before I instruct its generation, *so that* the employer pays what it owes, not what the portal happens to show.
- **AC-V20.1** — The `SO-ESIC` artefact shows the challan amount against the computed liability — employee 0.75% and employer 3.25% of each covered employee's gross (§03.3 JTBD-S1 criteria) — with the per-member contributions behind it and the members held in coverage to the period's end marked (AC-014.3); the instruction is offered only when the amounts are equal to the rupee (AC-902.1).
- **AC-V20.2** — The instruction binds to the challan amount (FR-OPS-004 row 6); payment is the employer's, through its own bank channel (§22 P5).
- **AC-V20.3** — For August 2026 at Vikram's firm the challan equals July's locked contribution plus ₹120.00 — G's ₹22.50 employee and ₹97.50 employer share (§03.6a section D).
- **Negative** — for contribution periods under the unresolved post-22-November-2026 regime the instance is BLOCKED-pending-regime and no artefact is presented (A-09; §06.9).

**US-V21 · Approve a correction and the route it takes** · Job: JTBD-V1, JTBD-V5 · Exercises: FR-PAY-301 M12; FR-PAY-306; FR-PAY-708; FR-PAY-711 F10, F12 · Release: R1 (A-02); the arrear flow fenced (A-06); Tax Year 2026-27 Form 138 corrections held on F-02 (A-12)
*As* the approver, *I want* a correction presented as a diff with the route the guards leave, *so that* I approve what changes and how it reaches the portal, not a new version of the month.
- **AC-V21.1** — The `SO-CORRECTION` artefact shows, per employee and head, the locked figure, the corrected figure and the difference, and carries sections D and E of `SO-PAYRUN` for the difference.
- **AC-V21.2** — The route shown is the one the US-S05 table gives for the situation, with the guard that allowed it and every refused route with its reason; no control selects a refused route. The routes are the ones §06's ECR return-routes figure draws; this section does not redraw them.
- **AC-V21.3** — A Form 138 correction is approved here and uploaded under its own `SO-STATEMENT`; while the portal does not take Tax Year 2026-27 corrections, the correction is generated, validated and held, and no `SO-STATEMENT` is presented (AC-708.3).
- **AC-V21.4** — Approval records the correction as a diff against the locked snapshot and the accepted return; neither is edited (AC-306.1; AC-712.5).
- **Negative** — where the route is "none" — an EPF over-remittance after payment initiation — approval records the diff only, `ecr.overpayment_recovery_route` shows as unknown, and no portal act is offered (US-S05).

**US-V22 · Be told a role is about to be empty, before it stalls a month** · Job: JTBD-V1, JTBD-V4 · Exercises: §03.6b role vacancy; §03.1 role readiness; FR-CHR-105 · Release: R1
*As* the tenant's owner, *I want* to know the day someone's exit leaves a payroll role at risk, with what it will hold and when that first costs money, *so that* I choose a successor rather than discover the gap at a due date.
- **AC-V22.1** — Recording an exit for a holder of any role in the §03.1 readiness table alerts me the same day, lists that person's open items and artefacts with their due dates, and names the gates the role holds (RV4).
- **AC-V22.2** — The alert offers exactly three routes — name a successor, record the single-person exception with its marker (US-V11), or accept the stall — and never merges two roles or waives a gate (AC-RV.1).
- **AC-V22.3** — While the role stands vacant I am alerted again each `role.vacancy_grace_days` with what is stalled and the first date it costs money, including any predicted s.7Q interest per day labelled a prediction and never a damages figure (EV-039).
- **AC-V22.4** — A successor takes the role only after acknowledging the hand-over pack for it, and the acknowledgement is recorded (RV5).
- **Negative** — no re-derivation ever lands an item or artefact on the maker of its own subject; such items go to the readiness report instead (AC-RV.3).

#### Success criteria

| Criterion | Target | How measured |
| --- | --- | --- |
| Statutory notices / penalties | 0 | Notice log |
| Founder time on payroll | ~0 min/month | Self-report |
| Single compliance status view | Yes, one screen | Feature |
| No re-platform through 200 | Yes | Retention through band |
| Board-ready liability view | Gratuity/leave/PF accruals visible | Feature |

#### Day-in-the-life (he barely appears — that's the point)

**Once a month, 5 minutes:** Opens the dashboard. Green across ECR, ESI, PT, TDS, appointment letters current. Gratuity accrual line updated. Closes it. **The rest of the month he does not think about payroll.** The one time it goes wrong (a filing fails), he wants a *proactive* alert with "here's what happened and here's the fix in progress," not to discover it from an inspector. The product's promise to Vikram is the §18 positioning: **sell the compliance SLA as the thing free alternatives cannot offer** — specified in §19 as covered obligations, exclusions, claim trigger, evidence and a remedy cap; delivered as portal-accepted artefacts plus attended filing; never a transfer of his non-delegable statutory liability (EV-030). The maintenance-as-operating-model stance (§05) is the stated strategy **[Verified]**. **[Reversed]** — earlier drafts justified it with "you cannot beat Tally/Frappe feature depth cheaply", which rested on the false claim that Frappe HR ships multi-state PT and LWF free (now a banned figure, §20). From source, Frappe v16's India payroll is 3 files / 549 lines with no Indian state name anywhere in the tree (EV-031), and TallyPrime has no state PT slab table and no LWF engine (EV-032): multi-state PT/LWF is greenfield in both incumbents and a genuine differentiator. Frappe's gross-to-net is genuinely strong — the bake-off will not be won on gross-to-net (EV-031).

**Kill line (buyer):** if §20 V-03 finds realised ARPU is 30–40% below list, the SLA premium is unfunded and Vikram's willingness to pay for "risk removed" does not clear the cost of the permanent statutory-maintenance and supervised-filing operation the SLA requires (EV-088). (Source: §20 V-03) **[Hypothesis]**

---

### 03.6a The approver's sign-off artefact — specification

"Obtain management approval before disbursement" is a named responsibility in the one payroll job description r3/02 re-verified cold (finding 28), and in the 20–80 band that approval is today a spreadsheet or a screenshot. §08 records the approval as a transition (FR-PAY-301 M6: "totals, variance with per-employee drivers, statutory liability with due dates"); §22 binds each portal instruction to the object's hash (FR-OPS-004); §23 owns the liability wording (FR-LEG-036). This subsection specifies the object the approver reads and signs — its kinds, fields, sections, rules, states and tests — so that each approval is one defensible record.

#### Sign-off kinds

The approver signs more distinct things in a month than any other persona, and each is irreversible or moves money. One artefact type serves them all; the kind fixes what it carries.

| Kind | Raised at | The approver decides | Irreversibility the artefact states | Bound to |
| --- | --- | --- | --- | --- |
| `SO-PAYRUN` | FR-PAY-301 M6, then M8 | The month's pay, deductions and employer costs are right to pay and to file from | After lock every figure is immutable; later change is a correction run (AC-301.4) | Content hash of sections A–G |
| `SO-BANK` | M9 | The salary bank file may be released | Treated as irreversible: r3/02 records that a NEFT credit cannot be recalled | Bank-file hash and total (AC-901.1) |
| `SO-RETURN` | FR-OPS-004 row 1; F9 | EPFO's rendered return statement may be approved | An approved return can never be cancelled (EV-036) | Hash of the captured statement |
| `SO-GATE` | M10; F14; FR-OPS-004 row 2 | The Due Deposit Balance Summary is right to pay | After payment initiation no downward correction (EV-037); s.7Q interest is mandatory with the contribution (EV-039) | Hash of the captured summary |
| `SO-EXIT` | FR-OPS-004 row 3 | A member's date of exit may be marked | A wrong date needs a joint employer–employee declaration to correct (EV-041) | Member, date and reason |
| `SO-STATEMENT` | FR-OPS-004 row 4 | A Form 138 statement may be uploaded | Corrected only by a correction statement on the period's format family (EV-052) | The `.fvu` output and its FVU result |
| `SO-PT` | FR-OPS-004 row 5 and the PT half of row 6 | A state PT or LWF return or challan may be submitted | Irreversible until the state's runbook says otherwise (§22) | Return values and challan amount |
| `SO-ESIC` | FR-OPS-004 row 6, the ESIC half; §22.4.2 | The ESIC challan may be generated for the amount shown | Money is owed on the amount shown (FR-OPS-004 row 6) | The challan amount |
| `SO-CORRECTION` | M12; F10; F12 | A correction run and its return route may proceed | The route's own guard — Revised only before payment, Supplementary only for absent members (EV-037) | Hash of the correction diff |
| `SO-OFFCYCLE` | FR-PAY-305 runs, including F&F (FR-PAY-803) | An off-cycle or settlement run may be paid | As `SO-PAYRUN`, plus the final-wages clock for an F&F (CoW s.17(2)) | Content hash of sections A–G |

§22.4.3 lists the Form 130 request on TRACES as a customer instruction, but FR-OPS-004's table has no row for it; a kind is added here when §22 adds the row — for Tax Year 2026-27 not before the Q4 format is released (EV-046; A-14). Until then the request is the deductor's own act in Modes A and B (US-S12).

#### Data definition

The artefact is a persona-facing object over records §08, §14 and §22 already keep; it adds the decision and the binding of that decision to content. Storage, audit and retention follow §14.

| Field | Type | Rule |
| --- | --- | --- |
| `signoff_id` | Opaque identifier | Never reused |
| `kind` | One of the ten kinds | Fixed at creation |
| `subject_ref` | Payroll month (pay group × establishment × wage month) and run version; or filing instance; or session and captured object | Exactly one subject; one artefact per payroll month, so a three-establishment tenant receives three |
| `content_hash`, `canonical_version` | SHA-256 over the canonical serialisation of sections A–G (content rule 7); the serialisation's version | Recomputed at decision; must equal the value at presentation; re-verifiable later (AC-SO.4) |
| `object_hash` | Hash of the portal-rendered object | Portal kinds only; the same value the FR-OPS-004 instruction binds (AC-004.1) |
| `rule_set_version`, `format_version` | References | Those the subject was computed or generated on |
| `evaluation_context` | Disbursal date, as-of decision time, jurisdiction set, regime elections | Copied from the run (FR-PAY-210); a later change is shown as a diff (AC-210.3) |
| `prepared_by`, `reviewed_by` | Users | `reviewed_by` is set only for a CA-run client (§03.1 rule 3); the review note travels with the artefact but is outside the hash |
| `eligible_approvers[]` | Users | Excludes the maker, the reviewer and, for portal kinds, the user performing the act |
| `state` | PRESENTED, APPROVED, LOCKED, RETURNED, VOIDED, SUPERSEDED | Transition table below |
| `decided_by`, `decided_at`, `step_up_ref` | User; NIC/NPL-synced timestamp; authentication event | Step-up on every decision (AC-004.4; NFR-SEC-103) |
| `delegation_ref` | Delegation record | Set when a delegate decides (FR-CHR-086) |
| `return_reason` | Code, note, selected employees or lines | Required in RETURNED |
| `markers[]` | `SINGLE_PERSON`, `EXTERNAL_APPROVER`, `DELEGATE`, `RULE_VERSION_NEWER`, `LATE`, `FENCED_ITEMS`, `OWN_LINE` | Rendered on the artefact's face and in the digest |
| `acknowledged_items[]` | FR-PAY-713 codes; exclude-and-flag entries | Every non-blocking item the approver was shown |
| `legal_line_template` | Template version | Registered wording that statutory liability stays with the employer or deductor (FR-LEG-002, FR-LEG-036) |
| `rendered_document_id` | Document | A rendered document is an erasable class (Part E-2); the decision, the hashes and the source figures are audit records that outlive it, and an erased rendering is re-rendered from the snapshot and template version and marked a re-rendering, as payslips are (§14 AC-DM-10) |
| `supersedes`, `superseded_by` | Artefacts | The chain across reprocesses and re-presentations |

#### What `SO-PAYRUN` carries, in the order the approver reads it

| Section | Content | Rule |
| --- | --- | --- |
| **A — Identity and markers** | Legal entity; establishment and its registrations (PF code, ESI code, PT registration per state, TAN); pay group; wage month; run version and the count of reprocesses since inputs closed; maker; reviewer where CA-run; rule-set version; markers | `RULE_VERSION_NEWER` when a version effective for the wage month was published after processing — approval is withheld until reprocess (decision table row 4). `OWN_LINE` marks the approver's own pay line; any revision to it reached the run only through another person's check (FR-CHR-084) |
| **B — Headline** | Headcount — paid, joiners, leavers, zero-pay, on hold; gross; each employee deduction head; net; bank-file total; each employer statutory head; employer cost | Every total equals the sum of employee lines to the rupee (AC-303.2); the bank-file total equals net (AC-901.1) |
| **C — Variance bridge** | From the prior locked month's net and employer cost to this month's, one row per driver class — joiners, leavers, LOP, LOP reversals, revisions, arrears, one-time payments, recoveries, reimbursements, declaration or regime changes, statutory rule changes, rounding — each with employee count, Δ gross, Δ employee deductions, Δ net and Δ employer cost | The final row is the residual and must be ₹0.00; a bridge that does not close is a defect and the artefact is not presented. Every row drills to employees, and every employee beyond the §08 variance threshold (AC-303.1) is listed on the face. The LOP row names the day-rate method |
| **D — Statutory liability and due dates** | Per registration × head: employee share, employer share, charges, total, due date with citation (§06.11), filing-instance state, notes | Notes include: the ECR's return precedes its payment (EV-036); arrears PF on its disbursal-dated due month through the arrear flow (EV-043; AC-401.4); ESI carry-overs and drop-out dates; unconfirmed dates rendered unconfirmed (§06.11 rule 4); fenced instances with their blockers (EV-046) |
| **E — Cash plan** | Amounts by date, cumulative: net salary on the planned pay date; the TDS deposit; the EPF challan; the ESI contribution; PT and LWF by state | The planned pay date must fall on or before the Code on Wages s.17(1) limit for the wage period (§06.9), or the `LATE` marker is set. For a head already past due, a predicted s.7Q interest line per day of delay at 12% p.a. (EV-039; §06) on the day count `epf.interest_day_count`, labelled a prediction to be reconciled with the portal's figure |
| **F — Exceptions** | Blocking count; non-blocking flags by FR-PAY-713 family; the exclude-and-flag list with notice status; thresholds latched this month; fenced items | The blocking count must be zero to approve (AC-301.1). The approver acknowledges the list as a whole, and each item is recorded in `acknowledged_items[]` |
| **G — What the decision does** | Approve records M6 and fixes the planned disbursal date; lock (M8) publishes payslips, generates the bank file and permits filing artefacts; the EPF downward-correction boundary is payment initiation, not lock (EV-037); the registered legal line | Rendered from templates; no free text |
| **H — Decision** | Approve · Approve and lock · Return for correction | No figure is editable from the artefact |

**Portal kinds.** `SO-RETURN`, `SO-GATE`, `SO-EXIT`, `SO-STATEMENT`, `SO-PT` and `SO-ESIC` carry section A, the captured object with the product's reconciliation of it (AC-004.2), the kind's irreversibility statement, the legal line and the decision; sections B, C, E and F do not apply.

| Kind | Reconciliation the approver sees | Pass condition |
| --- | --- | --- |
| `SO-RETURN` | Per member: UAN, name, and each wage and contribution field of the ECR line (EV-035), portal value against snapshot value, with the difference | No difference on any member |
| `SO-GATE` | The summary's contribution, interest, damages and charges lines (FR-OPS-004 row 2) against the computed liability; s.7Q interest marked mandatory with the contribution; damages marked payable now or later at the employer's option (EV-039) | Contribution and charges equal the computed liability; interest, if any, is included in the payable total |
| `SO-EXIT` | The member, the date of exit, the reason, and the last date for which a locked run paid the member | The date of exit is not earlier than that last paid date |
| `SO-STATEMENT` | The FVU result, the utility stack used against the one the period requires (EV-052), and the `.csi` challan match | FVU passed; stack matches the period; challans matched |
| `SO-PT` | Return values and challan amount against the run, per state | Equal to the rupee |
| `SO-ESIC` | The challan amount against the month's computed ESI liability, with the per-member contributions behind it | Equal to the rupee (AC-902.1) |

`SO-CORRECTION` carries the correction diff per employee and head, the route chosen, the guard that allowed it and the routes refused with their reasons (US-S05 table). `SO-OFFCYCLE` carries sections A–H over the off-cycle run; for an F&F it adds the final-wages due date and, once gratuity is payable, its 30-day date (FR-PAY-803).

`SO-BANK` is the payment approver's release of the file generated at lock. It carries section A and the rows below; its pass condition is that the total equals net pay and every employee left out of the file has a reason.

| Row | Content | Rule |
| --- | --- | --- |
| Template | The bank's template and its version (FR-PAY-901) | The version the file was generated on; a bank's layout change is a new template version, never an edit |
| File | Hash, total credit, line count | Total equals the LOCKED month's net pay to the rupee, or the file was never generated (AC-901.1); line count equals the employees paid by bank transfer |
| Left out | Each employee on hold, on the non-bank disbursal mode or flagged for bank details (AC-901.2), with the reason | Every exclusion traces to section B's "on hold or non-bank" line of the `SO-PAYRUN` it follows |
| Pay date | The planned pay date against the Code on Wages s.17(1) limit | `LATE` where it falls after the limit (§06.9); release is never blocked for it |
| Regeneration | Whether this file replaces an earlier generation for the same run | A regeneration is the same payment, never a second one; a reissue needs a correction run (AC-901.3) |
| After release | Status until the bank reports | "Awaiting bank-side approval" (AC-V04.2); returned credits re-queue without re-paying the rest (AC-903.1) |

#### Content rules

1. **Lineage only.** Every figure is rendered from the run's result version and its lineage (§14); none is typed and none is model-generated (§12; §03.12 principle 2). An assistant summary may sit beside the artefact only as a labelled draft quoting the artefact's own figures (§12 AC-FP-4 pattern); it is never inside the hashed content.
2. **Hash discipline.** The content hash covers sections A–G. A reprocess, a newer rule version effective for the month, or a due date in section E passing while the artefact is open produces a new artefact and supersedes the old one.
3. **Both vocabularies.** Wherever a form is named, the Income-tax Act 2025 name and the 1961-Act name both appear (EV-050).
4. **Paisa and rounding.** Figures show paisa where the engine holds them, and each statutory figure names the rounding rule applied (`rounding_rule(scheme, field)`, §03.3).
5. **No damages figure.** Damages show as EPFO-assessed; the scale `epf.damages_scale` is unverified (§06) and is never quoted.
6. **No transfer of liability.** Nothing on the artefact says or implies that the vendor files for the employer or bears its statutory liability (FR-LEG-036; K-13).
7. **The hash is over data, not over a rendering.** `content_hash` is computed over the canonical form below, so that re-rendering an erased document (Part E-2) or changing a label template never changes what was approved, and any change to a figure always does.

| Element | Canonical form |
| --- | --- |
| Scope | The data records of sections A–G; section H, the review note, any assistant draft, labels and layout are outside |
| Amounts | Signed integers in paisa, after the rounding rule has been applied (rule 4); never floating point |
| Dates and times | ISO 8601 — calendar dates for due and pay dates; timestamps with an explicit offset |
| Order | Section C's driver classes in their fixed order; every other list sorted by registration, then head, then the employee's opaque identifier |
| Identifiers | Opaque internal identifiers only — never an Aadhaar number or a hash of one (Part E-6), never a bank account number |
| Text | UTF-8 in Unicode NFC; templated wording enters as its template identifier and version, not as text |
| Version | The serialisation carries `canonical_version`; an artefact always verifies under the version it was hashed with |

#### Return reason codes (closed set)

| Code | Meaning | Routed to |
| --- | --- | --- |
| `RC-INPUT` | Attendance, LOP or leave input is wrong | Operator, input side (US-M10) |
| `RC-JOINEXIT` | A joiner or leaver is missing, dated wrongly or on the wrong structure | Operator |
| `RC-COMP` | A revision, arrear or one-time payment is wrong | Operator; the compliance checker where a wage structure must change (FR-CHR-105) |
| `RC-TAX` | A declaration, regime election or TDS projection is disputed | Operator |
| `RC-STAT` | A statutory head is disputed | Operator; raised to the statutory desk when the dispute is with the rule itself (§22.8) |
| `RC-CASH` | Funding is not arranged for the planned pay date | Operator re-plans the disbursal date; only date-keyed outputs re-derive (AC-210.3) |
| `RC-OTHER` | Anything else | Operator; a note is mandatory |

#### Decision table — what the approver may do, and when

| # | Situation | Approve | Approve and lock | Return | What the approver sees |
| --- | --- | --- | --- | --- | --- |
| 1 | A blocking validation is open | No | No | Yes | The blocking items with their fixes (AC-301.1) |
| 2 | The bridge residual is not ₹0.00 | — | — | — | Nothing: the artefact is not presented; the operator sees the unexplained amount |
| 3 | The decider made the run | No | No | No | Refused (FR-PAY-304), unless the single-person exception is recorded (US-V11) |
| 4 | A rule version effective for the wage month was published after processing | No | No | Yes | `RULE_VERSION_NEWER`; reprocess required |
| 5 | Clean; funding arranged | Yes | Yes | Yes | The full artefact |
| 6 | Clean; funding not yet arranged for the planned date | Yes | Not advised — lock publishes payslips and generates the bank file | Yes, `RC-CASH` | Section E with the shortfall date |
| 7 | Arrears in the run | Yes | Yes | Yes | Arrears PF with its due month from the planned disbursal date; `FENCED_ITEMS` for the arrear flow (AC-401.4) |
| 8 | APPROVED, not LOCKED; an input change has queued since | — | Lock, carrying the change to next month | Yes, voiding the approval (M7) | The queued change with its per-employee effect (US-M03) |
| 9 | A delegate is deciding | Yes | Yes | Yes | `DELEGATE` on the face and in the digest |
| 10 | The planned pay date falls after the s.17(1) limit | Yes | Yes | Yes | `LATE` with the wage-payment exposure named; payroll is never blocked for it |

#### States of the artefact

<!-- DIAGRAM: personas-jtbd-signoff-states -->

| # | From → To | Event | Guard | Side effect | Who may trigger |
| --- | --- | --- | --- | --- | --- |
| SG1 | *(none)* → PRESENTED | Operator presents | Subject at PROCESSED (or, for portal kinds, the object captured and reconciled); bridge residual ₹0.00; at least one eligible approver | Eligible approvers notified; the FR-CHR-086 escalation clock starts | Operator |
| SG2 | PRESENTED → APPROVED | Approve | Blocking count zero; decider eligible; step-up passed; content hash unchanged since presentation | The subject's own transition recorded — M6 and the planned disbursal date for a pay run, M9 for a bank release, the FR-OPS-004 instruction for a portal kind | Approver, payment approver or named approver, as the kind requires; or their delegate |
| SG3 | PRESENTED → RETURNED | Return, or decline for a portal kind (§22 S9) | A reason code | Subject stays PROCESSED; operator queue item (US-M10) | Approver or delegate |
| SG4 | PRESENTED → SUPERSEDED | Reprocess; newer rule version effective for the month; a due date in section E passes; the approver role changes hands | — | A new artefact PRESENTED and linked | System |
| SG5 | APPROVED → LOCKED | Lock | Content hash still equals the run version (the approval is current) | FR-PAY-301 M8: payslips published, bank file generated | Approver |
| SG6 | APPROVED → VOIDED | Return for correction before lock (M7) | Subject before LOCKED | Approval voided and kept, with the reason | Approver |
| SG7 | APPROVED → VOIDED | The portal object's hash differs at the moment of the act | Portal kinds only | The instruction is void; the object is re-captured and a new artefact presented (AC-004.1) | System |
| SG8 | RETURNED, VOIDED, SUPERSEDED, LOCKED → *(terminal)* | — | — | The next presentation is always a new artefact | — |

- **AC-SO.1** — No artefact reaches APPROVED from any state other than PRESENTED, and none reaches LOCKED except from APPROVED with an unchanged content hash.
- **AC-SO.2** — Every transition writes an audit event on NIC/NPL-synced time (EV-062) with the decider, the role, the kind and the markers.
- **AC-SO.3** — Two eligible approvers acting at once cannot both decide: the first decision commits and the second sees the decided state, using the optimistic concurrency §07 already requires of maker-checker (FR-CHR-084).
- **AC-SO.4** — Any holder of **V** can verify a decided artefact: the product recomputes `content_hash` from the stored snapshot under the artefact's `canonical_version` and compares it with the decided value. A match is shown with the decision record; a mismatch is raised as an incident through the §17 pipeline and the artefact is marked unverifiable, never silently re-hashed. Verification supports evidence production; it does not by itself discharge any audit or inspection obligation (K-21).

#### Escalation — a sign-off never waits silently

| Stage | Trigger | Action | Never |
| --- | --- | --- | --- |
| Presented | SG1 | The eligible approvers are notified in the queue and by push (§03.8a notifications) | — |
| Reminder | `signoff.reminder_hours` after presentation (tenant-set) | Second notice to the same approvers | Auto-approval |
| Escalation | The FR-CHR-086 SLA for the change type expires | Reassign to the configured backup approver | Reassignment to the maker |
| Due-date risk | Section E's earliest due date is within `calendar.alert_lead_days` | Alert to the approver, the backup and the operator, with the predicted exposure | A damages figure; a relaxed guard |
| Missed | A due date passes while undecided | The artefact is superseded with `LATE` lines (SG4); the status tile turns red with its owner | Silent carry-forward |

#### The approver's queue — grouping and ordering

The approver's queue (§03.9a) orders the artefacts presented to one approver; a CA's roster (US-A05) orders each client's next instruction-gated act, whether or not its artefact has been presented yet. Both use one rule, so that the act that can least wait comes first and a CA and her client's approver see the same order. Ordering is presentation only: it changes no guard and makes no row decidable earlier.

Each row is derived from its artefact and its filing instance; nothing in it is typed.

| Field | Source | Rule |
| --- | --- | --- |
| `group` | `kind` | **Pay** — `SO-PAYRUN`, `SO-OFFCYCLE`, `SO-BANK`; **File** — `SO-EXIT`, `SO-RETURN`, `SO-GATE`, `SO-ESIC`, `SO-PT`; **Quarter and corrections** — `SO-CORRECTION`, `SO-STATEMENT`. The first two are the sittings of §03.8a |
| `due_at` | Section E for pay kinds; the filing instance's due date (FR-PAY-710) for the rest | An F&F's `SO-OFFCYCLE` takes its final-wages date (CoW s.17(2)). `SO-EXIT` carries no statutory date in our evidence and takes the due date of the establishment's next Regular return. An unconfirmed date renders "unconfirmed" with its owner and sorts after the dated rows of its group — never a guessed day (§06.11 rule 4) |
| `chronology_block` | FR-PAY-712 | True when leaving the act undecided keeps a later month's Regular return from being generated (AC-712.1), or when the month sits inside the M−4 warning window (AC-712.2; EV-038) |
| `past_due`, `predicted_interest_per_day` | Calendar; section E | The prediction is shown for EPF heads only — s.7Q at 12% p.a. on `epf.interest_day_count` (EV-039), labelled a prediction; never a damages figure (content rule 5) |
| `asked`, `reminders_sent` | SG1 notification; the escalation ladder | True once SG1 has notified the eligible approvers, with the count of reminders since; a roster row whose artefact the CA's side has not yet presented is not asked |
| `kind_rank` | `kind` | `SO-PAYRUN` 1, `SO-OFFCYCLE` 2, `SO-BANK` 3, `SO-EXIT` 4, `SO-RETURN` 5, `SO-GATE` 6, `SO-ESIC` 7, `SO-PT` 8, `SO-CORRECTION` 9, `SO-STATEMENT` 10 |

Rows are ordered by five keys, each consulted only when every earlier key ties; groups are shown in the order of their first row.

| Key | Earlier in the queue | Why |
| --- | --- | --- |
| 1 — Chronology | `chronology_block` true | A month that blocks later months outranks anything merely due (EV-038; AC-A05.2) |
| 2 — Due date | Earlier `due_at`, so past-due rows come first, oldest first | Each day late on an EPF head adds s.7Q interest payable with the contribution (EV-039); any other lateness is a missed statutory date |
| 3 — Asked | Approver not yet notified | Roster only: an act nobody has put in front of its approver is the CA's own next move. Every row in an approver's queue has been presented and so notified, and the key always ties there |
| 4 — Kind | Lower `kind_rank` | Pay before file, as the sittings run; within a filing, the machine's own order — the exit before the return that follows it, the return before the gate, the gate before any other challan (§03.8a) |
| 5 — Presentation | Earlier SG1 | A stable order |

<!-- DIAGRAM: personas-jtbd-queue-ordering -->

**Worked example — Vikram's queue at 09:00 on Monday 14 September 2026.** August's ECR was uploaded at 08:40 and its return statement reconciled with no difference; the ESIC challan was captured and reconciled at 08:55. M, whose last working day was Friday 11 September, has his F&F presented, and L's exit marking has waited since Friday. The establishment works Monday to Friday and its calendar shows no holiday.

| Position | Artefact | `due_at` | Decided by |
| --- | --- | --- | --- |
| 1 | `SO-OFFCYCLE` — M's F&F | Tuesday 15 September — two working days after the last working day (CoW s.17(2)) | Key 4, rank 2; all four rows tie on keys 1–3 |
| 2 | `SO-EXIT` — L, date of exit 31 July | 15 September, the due date of August's Regular return | Key 4, rank 4 |
| 3 | `SO-RETURN` — August ECR | 15 September | Key 4, rank 5 |
| 4 | `SO-ESIC` — August | 15 September | Key 4, rank 7 |

`SO-GATE` is absent: it is presented only after the return is approved and the Due Deposit Balance Summary captured (SG1 guard), and then enters at rank 6 with the same date. In a month where July's return were still unapproved (§03.8a FB-3), August's could not have been uploaded at all (AC-712.1); July's `SO-RETURN` would head the queue on key 1 and, 30 days past its 15 August due date, would show predicted interest — on FB-2's assumption of ₹2,16,000 of dues, ₹2,16,000 × 12% × 30 ÷ 365 = ₹2,130.41 to date and ₹71.01 a day more, labelled a prediction on `epf.interest_day_count`.

Applied to Anjali's roster on Friday 11 September (§03.4 worked example), the same keys reproduce that table's order: the 45-person firm first on key 1; then the 30-person firm's `SO-GATE` ahead of the Pune firm's `SO-RETURN` on key 3 — both due 15 September, but only the Pune firm's approver had been asked. Key 4 alone would have put the return first.

| # | Given | When | Then | Traces |
| --- | --- | --- | --- | --- |
| QO1 | A `chronology_block` row whose own due date is later than a clean row's | The queue builds | The blocking row is first | Key 1 |
| QO2 | A past-due `SO-GATE` and an `SO-RETURN` due today | The queue builds | The gate first, with predicted s.7Q interest per day labelled a prediction and no damages figure | Key 2; EV-039 |
| QO3 | Two clients' rows due the same day; one client's approver not yet notified | The roster builds | That client's row first, whatever the kinds | Key 3; §03.4 worked example |
| QO4 | `SO-RETURN` and `SO-ESIC` for one establishment, same due date | The queue builds | The return first | Key 4 |
| QO5 | An `SO-PT` whose state due day is not captured (`pt.<state>.due_day`) | The queue builds | "Unconfirmed" with its owner, after the dated rows of the File group | `due_at` rule |
| QO6 | A row reaches position 1 | The approver opens it | Its guards are evaluated as for any other row; position grants nothing | Ordering is presentation only |

#### Who may do what with an artefact

The §07 matrix covers master data; the sign-off artefact is a new object, so its permissions are set here, in the matrix's codes (**V** view, **X** export, **P** present, **D** decide, **—** no access) and within FR-CHR-105's floors.

| Role | `SO-PAYRUN`, `SO-OFFCYCLE`, `SO-CORRECTION` | `SO-BANK` | Portal kinds | Digest |
| --- | --- | --- | --- | --- |
| Payroll operator (maker) | P · V · X | V | P · V | V (own tenant) |
| Approver | V · D · X | V | V · D | V · X |
| Payment approver | V | V · D | V | V |
| Named approver who is not the approver | V | V | V · D | V |
| CA reviewer (CA-run client) | V · X; review note | V | V | V (per client) |
| Compliance checker (§07) | V · X | V | V | V · X |
| Tenant super-admin | V | V | V | V |
| Our compliance operator (§22) | V for the filing in hand | — | V for the session in hand | — |
| Employee, manager | — | — | — | — |

Two floors apply on top: no one decides an artefact whose subject they made, reviewed or, for a portal kind, will perform (§03.1); and a role change is itself maker-checked (FR-CHR-105), so no one can grant themselves **D**.

#### The approver's digest

The digest is how the approver of record above ~120, and any founder, sees what was signed without opening each artefact (US-V08).

| Field | Content |
| --- | --- |
| Period | The wage month, and the quarter where a quarterly statement fell in it |
| Artefacts decided | Per kind: count, deciders, median minutes from presentation to decision |
| Markers first | Every artefact carrying `SINGLE_PERSON`, `EXTERNAL_APPROVER`, `DELEGATE`, `LATE` or `FENCED_ITEMS`, and every portal approval recorded as uninstructed (US-S03) |
| Returns | Count by reason code, with the artefacts they concerned |
| Filing outcome | Per registration and obligation, the FR-PAY-711 state and acknowledgement references |
| Exposure | Any predicted interest shown during the month, and the amount the portal finally assessed |
| Open items | Anything BLOCKED, with owner and unblocking trigger |

The digest is generated when the month reaches FILED (M11), or on the last day of the following month if it has not, and is itself an erasable rendered document regenerated from the audit records (Part E-2).

For the August 2026 month of the worked example below, with L's settlement in the same month, Vikram's digest reads:

| Field | August 2026 |
| --- | --- |
| Artefacts decided | `SO-PAYRUN` 1; `SO-BANK` 1; `SO-OFFCYCLE` 1 (L's F&F); `SO-RETURN` 1; `SO-GATE` 1; `SO-ESIC` 1; `SO-EXIT` 1 (L); all decided by Vikram |
| Markers first | `FENCED_ITEMS` on the `SO-PAYRUN`: K's July arrear awaits EPFO's arrear flow (EV-043) |
| Returns | None |
| Filing outcome | ECR: return file ID and TRRN stored, receipt reconciled; ESI: acknowledgement stored; TDS: CIN stored; PT: per the PTRC's frequency |
| Exposure | None predicted; none assessed |
| Open items | The arrear return, BLOCKED pending layout, with its derived due month and its owner |

#### Rendering rules for the phone

1. Section order never changes, and sections A, B and F are never collapsed.
2. Section C shows every driver class with a non-zero value; zero rows fold into one "all other driver classes" row, which stays visible.
3. Employees beyond the §08 variance threshold (AC-303.1) are listed inside their driver row; the rest open on tap.
4. Section D shows every registration and head, and the due date before the amount.
5. The decision controls sit after section G; nothing lets the approver decide without scrolling past F and G.

#### Worked example — the August 2026 `SO-PAYRUN` at Vikram's firm

Vikram's 60-person Pune firm (§03.2, §03.6): one establishment in Maharashtra with one PF code, one ESI code, a Maharashtra PTRC and a TAN; the employer contributes PF on wages up to the ₹15,000 ceiling. July 2026 is LOCKED. Six changes explain every rupee between July and August; the other 55 employees are unchanged.

| Driver | Employee and facts |
| --- | --- |
| J — joiner | Joined 1 August on ₹50,000: Basic ₹15,000 + HRA ₹7,500 + conveyance ₹5,000 + commission ₹22,500 (§03.3 worked example 1). Add-back base ₹25,000; PF wages capped at ₹15,000; outside ESI; PT ₹200 |
| L — leaver | Last working day 31 July on ₹40,000: Basic ₹20,000 + HRA ₹10,000 + special allowance ₹10,000. Absent from August; his F&F is its own `SO-OFFCYCLE` |
| E — LOP | ₹40,000 on L's structure; 2 unpaid days in August, which has 31 days; the tenant's method is calendar days |
| K — revision with arrear | ₹24,000 (Basic ₹12,000 + HRA ₹6,000 + conveyance ₹6,000) to ₹28,000 (Basic ₹14,000 + HRA ₹7,000 + conveyance ₹7,000) effective 1 July, approved through FR-CHR-084 after July locked: one month of arrear plus the new August salary. K is a man, so Maharashtra's slab is ₹200 on both salaries |
| G — raise across the ESI gate | ₹20,000 (Basic ₹10,000 + HRA ₹5,000 + conveyance ₹5,000) to ₹23,000 (Basic ₹11,500 + HRA ₹5,750 + conveyance ₹5,750) from 1 August. G is a man, so Maharashtra's slab is ₹200 on both salaries (§03.3 worked example 2); ESI continues on actual gross to 30 September (§03.3 worked example 4) |

Only J's structure trips the 50% add-back. L's and E's only excluded head is HRA (25% of pay); their special allowance is wages, not an excluded head (§06.10), so their PF wage is Basic plus special allowance — ₹30,000 — capped at the ₹15,000 ceiling. K's and G's excluded heads, HRA and conveyance (heads (f) and (d), §06.10), are exactly one-half of pay, which does not *exceed* one-half, so nothing is added back and their PF wage is Basic alone, below the ceiling. That is a boundary the golden cases must hold: a structure whose excluded heads equal 50% exactly produces no add-back. TDS is ₹0 for all six: each one's projected Tax Year income is below the ₹12 lakh line under which the new-regime rebate removes tax — **[Hypothesis]**, because the AY 2026-27 slabs and rebate are verified but their continuation into Tax Year 2026-27 is not (§03.3 worked example 3; §20 V-20).

- **J:** gross +₹50,000.00; employee PF 12% × ₹15,000 = ₹1,800.00; PT ₹200.00; net +₹48,000.00. Employer EPS 8.33% × ₹15,000 = ₹1,249.50, shown as ₹1,250 as §03.3 shows it (the rule is `rounding_rule`), so employer EPF ₹550; EDLI 0.5% × ₹15,000 = ₹75.00; employer cost +₹51,875.00 before administrative charges (`epf.admin_charge_rate`, unverified — §03.3 worked example 1b).
- **L:** the reverse of a ₹40,000 line with the same PF, EDLI and PT: gross −₹40,000.00; net −₹38,000.00; employer cost −₹41,875.00.
- **E:** LOP = ₹40,000 × 2 ÷ 31 = ₹2,580.65. E's PF wage prorated for the two NCP days — ₹30,000 × 29 ÷ 31 = ₹28,064.52 — stays above the ceiling, so PF is unchanged at ₹1,800; payable gross of ₹37,419.35 keeps PT at ₹200. Gross, net and employer cost each fall by ₹2,580.65, and E's ECR line carries NCP days 2 (EV-035, field 10). On a fixed 26-day method the same two days would cost ₹3,076.92 — ₹496.27 more — which is why the LOP row names its method (§03.2 worked edge case 2).
- **K, August revision:** gross +₹4,000.00; employee PF +₹240.00 (12% × ₹2,000 of added Basic); net +₹3,760.00; employer EPS ₹166.60 + EPF ₹73.40; EDLI ₹10.00; employer cost +₹4,250.00.
- **K, July arrear:** the same figures, computed against July's rule version (FR-PAY-401), with the PF liability dated from the planned disbursal date (Part E-9; AC-401.2) and routed through EPFO's arrear flow, for which no generator exists (EV-043).
- **G:** gross +₹3,000.00; employee PF +₹180.00 (12% × ₹1,500); employee ESI 0.75% × ₹23,000 = ₹172.50 against ₹150.00, so +₹22.50; net +₹2,797.50. Employer EPS ₹124.95 + EPF ₹55.05; EDLI ₹7.50; employer ESI 3.25% × ₹23,000 = ₹747.50 against ₹650.00, so +₹97.50; employer cost +₹3,285.00.

Section C as Vikram reads it:

| Driver class | Employees | Δ gross (₹) | Δ employee deductions (₹) | Δ net (₹) | Δ employer cost (₹) |
| --- | --- | --- | --- | --- | --- |
| Joiners | 1 (J) | +50,000.00 | +2,000.00 | +48,000.00 | +51,875.00 |
| Leavers | 1 (L) | −40,000.00 | −2,000.00 | −38,000.00 | −41,875.00 |
| LOP — calendar-day method | 1 (E) | −2,580.65 | 0.00 | −2,580.65 | −2,580.65 |
| Revisions | 2 (K, G) | +7,000.00 | +442.50 | +6,557.50 | +7,535.00 |
| Arrears | 1 (K, July) | +4,000.00 | +240.00 | +3,760.00 | +4,250.00 |
| All other driver classes | 0 | 0.00 | 0.00 | 0.00 | 0.00 |
| **Change from July** | 6 | **+18,419.35** | **+682.50** | **+17,736.85** | **+19,204.35** |
| **Residual** | — | **0.00** | **0.00** | **0.00** | **0.00** |

<!-- DIAGRAM: personas-jtbd-signoff-bridge -->

Section D carries the statutory consequence of the same six changes:

| Head and route | Δ employee (₹) | Δ employer (₹) | Δ EDLI (₹) | Due | Note |
| --- | --- | --- | --- | --- | --- |
| August Regular ECR | +420.00 PF (J 1,800 − L 1,800 + K 240 + G 180) | EPS +291.55, EPF +128.45 | +17.50 | 15 September 2026 | Return first, then challan (EV-036); E's line carries NCP days 2 |
| EPF arrear flow — K, July | 240.00 | EPS 166.60, EPF 73.40 | 10.00 | The due month derived from the planned disbursal date (AC-401.2) | No generator; the employer files through EPFO's arrear flow (EV-043); `FENCED_ITEMS` |
| ESI | +22.50 | +97.50 | — | 15 September 2026 | G stays covered to 30 September and drops out from 1 October |
| PT, Maharashtra | 0.00 | — | — | On the frequency ingested for the PTRC (§06.11) | J's ₹200 and L's ₹200 cancel |
| TDS | 0.00 | — | — | 7 September 2026 — the 1961-Act date; r.218 unread (§20 V-20) | Rebate **[Hypothesis]** above |

The two PF rows add back to section C's employee PF change: ₹420.00 + ₹240.00 = ₹660.00, and the employer side matches it (EPS ₹291.55 + ₹166.60, EPF ₹128.45 + ₹73.40). Section E is July's locked amounts plus these deltas, by date: net salary up by ₹17,736.85 on the planned pay date, on or before 7 September; the EPF challan on 15 September up by ₹857.50 (₹420.00 + ₹420.00 + ₹17.50) before administrative charges; ESI on 15 September up by ₹120.00; the arrear's ₹490.00 on its own derived due month. Blocking count zero; markers `FENCED_ITEMS`. Vikram approves and locks.

**The same month at the portal — why reconciliation is per member.** In an employer-attended session the product cannot see which file leaves the user's machine, only what the portal renders back. Suppose Meera uploads July's ECR file for wage month August. Against the August snapshot, member by member (contributions are employee PF + employer EPS + employer EPF, as the file carries them — EV-035):

| Member | In July's file | In August's snapshot | Difference in contributions (₹) |
| --- | --- | --- | --- |
| L | Present: 1,800 + 1,250 + 550 | Absent — left 31 July | +3,600.00 over |
| J | Absent | Present: 1,800 + 1,250 + 550 | −3,600.00 under |
| K | EPF wages ₹12,000: 1,440.00 + 999.60 + 440.40 | EPF wages ₹14,000: 1,680.00 + 1,166.20 + 513.80 | −480.00 under |
| G | EPF wages ₹10,000: 1,200.00 + 833.00 + 367.00 | EPF wages ₹11,500: 1,380.00 + 957.95 + 422.05 | −360.00 under |
| E | NCP days 0 | NCP days 2 | 0.00, but field 10 differs |
| **Total** | | | **−840.00** |

The totals differ by ₹840.00 while one member is over-stated by ₹3,600.00 and three are under-stated by ₹4,440.00 — an aggregate check would read a small shortfall; the per-member reconciliation `SO-RETURN` requires shows the over-statement. What happens depends on where it is caught, and the routes are exactly EV-036 and EV-037's:

| Caught at | Route | Why |
| --- | --- | --- |
| `SO-RETURN`, before the return is approved on the portal | Reject on the portal and upload August's file | Nothing is approved yet; no return type is involved |
| `SO-GATE`, after approval, before payment initiation | One Revised return carrying August's data | A Revised return needs an approved Regular, no other return in process and no payment initiated, and overwrites prior data (EV-037) |
| After payment initiation | J on a Supplementary return (absent from every prior return for the month); K, G and E's NCP days held, because post-payment upward revision is **[Hypothesis]** (AC-708.2); L's ₹3,600.00 over-remittance recorded against `ecr.overpayment_recovery_route`, which our evidence does not answer (§20) | No Revised return once payment is initiated (EV-037); an approved return can never be cancelled (EV-036) |

EDLI does not appear in the file; it surfaces with the charges in the Due Deposit Balance Summary (EV-036), where `SO-GATE` reconciles it: ₹75.00 over for L, ₹75.00 under for J, ₹10.00 under for K and ₹7.50 under for G.

#### Edge and negative cases

- **Several establishments.** One artefact per payroll month, so per establishment (FR-PAY-301); the approver's queue groups them, and "approve all" evaluates each artefact's guards separately and records separate decisions — one failing guard withholds only its own artefact.
- **A zero-change month.** Every bridge row is zero; the artefact is still required, and there is no auto-approval.
- **The approver's own line.** `OWN_LINE` marks it; a revision to it reached the run only through FR-CHR-084, where he could not approve his own proposal.
- **A joiner with no bank details.** A blocking item (FR-PAY-1004), unless the employee is on the tenant's non-bank disbursal mode (§07 matrix, `non_bank_disbursal_mode`), in which case section B shows the employee under "on hold or non-bank".
- **The actual pay date crosses a quarter.** September wages planned for 30 September and paid on 1 October move the TDS deductee date of payment into the October–December quarter, because the date must fall inside the quarter filed (r5/02 finding 32); the change reaches the approver as a diff before PAYMENT_INITIATED (AC-210.3).
- **A CA-run client with no employer-side approver.** `eligible_approvers[]` is empty and the artefact cannot be presented (US-A01).
- **Poor connectivity.** Decisions are server-side with step-up; there is no offline approval queue.
- **The approver's role changes while an artefact is open.** Superseded and re-presented to the new holder (SG4; US-V16).
- **A delegation that has expired.** It lapses; the item returns to the escalation ladder above (US-V10).

#### Test scenarios

| # | Given | When | Then | Traces |
| --- | --- | --- | --- | --- |
| T1 | A run at PROCESSED with one blocking item | Vikram opens the artefact | Approve and approve-and-lock are withheld; the item and its fix are listed; return is available | Decision row 1; AC-301.1 |
| T2 | Meera made the run; Vikram is away with no delegate set | Meera tries to approve | Refused; the item escalates to the configured backup, or stays on the readiness report if there is none | Row 3; FR-PAY-304; FR-CHR-086 |
| T3 | The bridge leaves ₹0.01 unexplained after rounding | Meera presents | Not presented; a defect names the ₹0.01 | Row 2; SG1 guard |
| T4 | A corrigendum effective for August is published while the artefact is open | — | The artefact is superseded; after reprocess the new one shows a "statutory rule changes" row | Row 4; SG4 |
| T5 | The worked example above | Vikram approves and locks | M6 then M8 recorded; bank-file total equals net; payslips publish; section C totals match the table to the paisa | SG2, SG5; AC-901.1 |
| T6 | Planned pay date 30 September; actual 1 October | DISBURSED is recorded | Only date-keyed outputs re-derive; the quarter change reaches the approver before PAYMENT_INITIATED | AC-210.3; r5/02 finding 32 |
| T7 | The return statement shows a member ₹1,800 above the snapshot | Reconciliation runs | `SO-RETURN` is not offered; reject-and-regenerate is offered on instruction | US-S03 |
| T8 | July's file uploaded for August and approved on the portal uninstructed (the portal example above) | The summary is captured before payment | `SO-GATE` fails, listing L +₹3,600.00 and J, K, G under; one Revised return offered; payment disabled; the approval shows as uninstructed in the digest | US-S03, US-S04; EV-037 |
| T9 | The same file found after payment initiation | The operator asks for a correction | A Revised return is refused with the EV-037 reason; a Supplementary return for J is offered; K, G and E are held; L's ₹3,600.00 is recorded against `ecr.overpayment_recovery_route` | US-S05 |
| T10 | A CA-run client; the CA's junior made the run and the CA reviewed it | The CA tries to approve | Refused; the client's approver is notified | US-A01 |
| T11 | A delegate decides | — | `DELEGATE` on the face; the digest lists it | Row 9; US-V10 |
| T12 | A single-person tenant with the exception recorded | The founder approves his own run | Allowed; `SINGLE_PERSON` on the face and in the digest | Row 3; US-V11 |
| T13 | Three establishments, one with a blocking item | "Approve all" | Two approved, one withheld with its reason; three separate audit events | Edge case 1 |
| T14 | The portal's statement changes between instruction and act | The operator acts | The instruction is void (SG7); the object is re-captured and a new artefact presented | AC-004.1 |
| T15 | August reaches FILED | M11 is recorded | The digest is generated with the fields above; `FENCED_ITEMS` is listed first | Digest |
| T16 | The artefact opened on a phone | The approver scrolls | The decision controls appear only after sections F and G; zero-value driver rows fold into one visible row | Rendering rules 2, 5 |
| T17 | A Tax Year 2026-27 Q2 statement validated on FVU 9.5 | `SO-STATEMENT` reconciliation runs | Fails: the stack does not match the period (EV-052); no instruction is offered | US-V18 |
| T18 | The Maharashtra PTRC return values for February 2027 carry one employee at ₹200 where the run computed the ₹300 true-up | `SO-PT` reconciliation runs | Fails, naming the employee and the ₹100.00 difference; no instruction is offered | US-V19; US-S11 |
| T19 | The ESIC portal renders August's challan at July's locked amount | `SO-ESIC` reconciliation runs | Not offered; the ₹120.00 difference is named as G's ₹22.50 and ₹97.50 | US-V20 |
| T20 | L's over-statement found after payment initiation (the portal example above) | `SO-CORRECTION` is presented | Route "none" for L, with `ecr.overpayment_recovery_route` shown as unknown; a Supplementary for J; K, G and E held; approval records the diff only | US-V21; US-S05 |
| T21 | A bank file total ₹1.00 above net pay | Lock attempts file generation | Generation is blocked (AC-901.1) and no `SO-BANK` is presented | `SO-BANK` rows |
| T22 | A regenerated bank file for a released run | The payment approver opens `SO-BANK` | The regeneration is shown as the same payment; a reissue is offered only as a correction run (AC-901.3) | `SO-BANK` rows |
| T23 | August's decided `SO-PAYRUN`, whose rendered document was erased under its retention class | The document is re-rendered on a newer label template, then verified | The re-rendering is marked as one; `content_hash` recomputes to the decided value, because labels and layout are outside the hash | Content rule 7; AC-SO.4 |
| T24 | The same artefact with one employee's net altered by ₹0.01 in the stored snapshot | Verification runs | Mismatch; the artefact is marked unverifiable and an incident is raised | AC-SO.4 |

#### Events the artefact emits

`signoff.presented` and `signoff.decided`, each carrying `signoff_id`, `kind`, `subject_ref`, `tenant_id`, `registration_id` where applicable, `state`, `markers[]`, the return code on a return, the decider's role, a delegation flag and the minutes from presentation to decision. They are routed to §19 for its event taxonomy (§19.11.1), and let it compute without new instrumentation the share of payroll months approved in-product, time to decision by kind, returns by reason code and the count of single-person and external-approver approvals. No target is set here; targets belong to §19.12 once pilots report.

---

### 03.6b Continuity — when a role is absent, vacated or handed over

§03.1 rule 5 says absence finds a different second person and never a waiver; §03.6a's SG4 supersedes an open artefact when the approver role changes hands; RR3 suspends the written authority to act when one of its named contacts leaves. Those are three views of one mechanism, and the mechanism matters most exactly where this segment is thinnest: below ~80 the machine's gates are held by two humans (§03.1), so one departure is not an HR event but a payroll-continuity event with a statutory due date attached. This subsection specifies the mechanism — the states a role passes through, what each state does to a month in flight, what a successor receives, and the four cases the persona stories do not otherwise reach: the operator who resigns mid-cycle, the signatory who leaves, the CA who disengages, and the tenant that cannot name a second person at all. FB-2 (§03.8a) works the approver's unavailability from the filing's side; this works it from the role's.

#### Role vacancy states

The states apply to each role of §03.1's readiness table separately — a tenant may hold its operator and have no backup approver.

| # | From → To | Event | Guard | Side effect | Who may trigger |
| --- | --- | --- | --- | --- | --- |
| RV1 | *(none)* → HELD | A named person is assigned the role | The assignment is itself maker-checked (FR-CHR-105) | The readiness row turns held | Tenant owner |
| RV2 | HELD → DELEGATED | An approved absence with a configured backup | The backup is not the maker of anything the role must decide (§03.1 rule 5) | Items and artefacts route to the delegate; every artefact decided carries `DELEGATE` | Holder; tenant owner |
| RV3 | DELEGATED → HELD | The absence ends, or the delegation lapses | — | Routing returns; an expired delegation returns items to the ladder (US-V10) | System |
| RV4 | HELD or DELEGATED → AT_RISK | The holder's exit is recorded (§07 exit), or the sole holder's absence is approved with no backup configured | — | Every open item and artefact held by the leaver is listed with its due date; where the leaver is a named contact on a written authority, the authority goes SUSPENDED (FR-OPS-002; RR3) | System, on the exit record |
| RV5 | AT_RISK → HELD | A successor is assigned | The hand-over pack is acknowledged by the successor | Items re-derive to the successor; open artefacts are superseded and re-presented (SG4) | Tenant owner |
| RV6 | AT_RISK → VACANT | The holder's last working day passes with no successor | — | Items re-derive to the tenant owner under routing rule 8; the gates the role holds are shown as stalled with the date their exposure starts | System |
| RV7 | VACANT → HELD | A successor is assigned | Every re-derived item is acknowledged by the successor | As RV5 | Tenant owner |
| RV8 | HELD → HELD | The role is handed from one person to another with no gap | The change is maker-checked and effective-dated | Open artefacts superseded and re-presented to the new holder (SG4; US-V16) | Tenant owner |

- **AC-RV.1** — A role reaching VACANT never causes a gate to be waived, skipped or auto-approved, and never merges two roles. The month stalls at the gate the role holds, visibly, with its owner named as the tenant.
- **AC-RV.2** — The tenant owner is alerted when a role enters AT_RISK, again at VACANT, and again each `role.vacancy_grace_days` while it stands vacant, with the list of what is stalled and the earliest date at which it costs money.
- **AC-RV.3** — Re-derivation never breaks four eyes: an item or artefact that would land on the maker of its own subject goes to the readiness report instead (§03.1a routing rule 8).
- **AC-RV.4** — Nothing about a role change alters a decided artefact. Decisions, hashes and their deciders stand, and a superseded open artefact keeps its chain (§03.6a SG4).

<!-- DIAGRAM: personas-jtbd-role-vacancy -->

#### What a vacancy does to a month in flight

| Role | If AT_RISK or VACANT before inputs close | Between lock and disbursal | Between disbursal and the filing due date |
| --- | --- | --- | --- |
| Payroll operator | The period cannot close (M2); the checklist stands open with each item's owner | The run is already computed; artefacts cannot be generated (F4) and no session can be operated | Receipts cannot be captured; the instance stays short of FILED and the tile stays amber |
| Approver | Nothing yet | No artefact can be decided: M6, M8 and M9 all stall, payslips are unpublished and the bank file ungenerated | `SO-RETURN` and `SO-GATE` stall — the case FB-2 works, with the predicted s.7Q exposure shown per day |
| Payment approver | Nothing yet | The file is generated at lock but cannot be released (M9) | — |
| Named approver | Nothing yet | Nothing yet | Every instruction-gated act stalls; the session hands back at the first gated step (§22 S9) |
| OTP contact | Nothing yet | Nothing yet | The session hands back at sign-in; the portal's registered mobile is changed by the employer, never through the authority (RR4) |
| Authorised signatory | Nothing yet | Nothing yet | Any DSC-bound step waits; operator-attended submission cannot be enabled |
| Compliance checker | Statutory-field, bank and wage-structure changes cannot clear maker-checker, so checklist items 5, 6 and 7 stand open | — | — |

#### The hand-over pack

A successor is not simply granted a role; the product hands over the work. Acknowledgement of the pack is the guard on RV5 and RV7, and it is recorded.

| Role | What the successor receives | Never transferred |
| --- | --- | --- |
| Payroll operator | Every open work item by blocking class with its age; the state of each payroll month and filing instance; the pre-payroll checklist as it stands; the ledger's unbroken record and any chronology block (EV-038); every open exclusion with its m+4 window | The maker attribution of work already done — history keeps its author |
| Approver | The queue in its §03.6a order; the chain of superseded and decided artefacts; the last digest; every standing marker — `SINGLE_PERSON`, `EXTERNAL_APPROVER`, `LATE`, `FENCED_ITEMS` | The right to decide anything the successor made or reviewed |
| Payment approver | Bank templates and their versions; the state of any generated but unreleased file; returned-credit items | The bank's own maker-checker and OTP, which live in the bank's channel (US-V04) |
| Named approver | The written authority's scope and its named contacts; every pending instruction | The authority itself, whose contacts only the signatory may change (FR-OPS-002) |
| Authorised signatory | Nothing that carries a key | The DSC, which never leaves its signatory (§22 P6) — a new signatory signs a new authority |
| Compliance checker | Open maker-checker requests, each showing its maker | The maker side of any instance the successor proposed (FR-CHR-084) |
| CA reviewer | The roster rows for clients whose grant is live | Any client data after the grant is revoked (US-A04) |

#### Worked example — the operator resigns mid-cycle

Meera resigns at Vikram's 60-person firm on Friday 4 September 2026, with a last working day of Friday 18 September. August is LOCKED and DISBURSED; the ECR return is uploaded but the summary is not yet captured; the TDS deposit was paid on 7 September; ESI is due on 15 September. Her exit is recorded on 4 September, and the operator role goes AT_RISK the same day.

| Date | Event | Effect |
| --- | --- | --- |
| 4 September | Exit recorded (US-M07) | Operator AT_RISK; her nine open items listed with due dates, seven of them due before her last working day; her own F&F run and `SO-EXIT` raised on their clocks |
| 4 September | Vikram is asked to name a successor | The product offers three routes and no fourth: name a second person, record the single-person exception with its marker (US-V11), or leave the role to become vacant with the stall shown |
| 5–15 September | Meera works the month out | She reconciles the summary, Vikram confirms the gate and pays, ESIC and PT are done, receipts are captured, and August reaches FILED with her as the operator of record |
| 18 September | Last working day passes with no successor | RV6: operator VACANT; her remaining items re-derive to Vikram as tenant owner, **except** those he cannot hold without breaking four eyes on September's run, which go to the readiness report (AC-RV.3) |
| 25 September onward | September's cut-off arrives | M2 cannot be reached; September's payroll stalls at inputs, not at approval, and the status view shows the first date it costs money — the salary limit of 7 October (CoW s.17(1)) before any statutory due date |

Two arithmetic points the tenant is shown, both drawn from figures already in this section. If September's ECR payment were to slip past 15 October on the same establishment's dues — ₹2,16,000 if all 60 members had EPF wages at the ₹15,000 ceiling — the predicted s.7Q interest is ₹2,16,000 × 12% ÷ 365 = **₹71.01 a day**, labelled a prediction on `epf.interest_day_count` and reconciled to what EPFO assesses (EV-039); damages are EPFO-assessed and never quoted (§03.6a content rule 5). And the cheapest fix is never a merged role: Vikram taking both sides of September's run needs the recorded single-person exception, which marks every artefact of that month on its face and in his own digest (US-V11) — an honest cost, stated before he chooses, rather than a silent one.

#### The CA who disengages mid-month

| Step | What happens | Rule |
| --- | --- | --- |
| 1 | The client revokes the grant, or the CA ends the engagement | The grant is the client's to revoke at any time (US-A04) |
| 2 | The CA's users lose access on revocation; the client's data stays where it is, with no export project | §15.3.6; US-A04 |
| 3 | Every work item held by a CA user re-derives to the client's roles under the routing rule; items the client has no holder for go to the tenant owner | §03.1a routing rule 8 |
| 4 | Artefacts the CA reviewed keep the review note and its author; nothing decided changes | AC-RV.4 |
| 5 | Portal sessions the CA ran under the client's own credentials are outside the product either way; the on-behalf log for anything done inside it stays with the client (US-A02) | EV-030; §22 |
| 6 | Where the CA was a named contact on a written authority, the authority goes SUSPENDED until the signatory confirms | FR-OPS-002; RR3 |

The point of the row order: a CA's departure changes *who holds work*, never *what was decided* and never *where the data lives*. That is what makes the channel reversible, and it is the product half of the §03.4 kill line — a channel the client cannot leave without an export project is a channel the client will not enter.

#### Edge and negative cases

- **The tenant with exactly one human.** There is no configuration that lets one person hold both sides of a run silently. The recorded exception exists, it is visible on every artefact it touches, and it ends automatically when a second approver is added (US-V11).
- **A delegate who leaves.** RV4 applies to the delegate's own role; the delegation lapses and the item returns to the escalation ladder, never to the maker (US-V10).
- **A successor named with a future effective date.** Artefacts from that date go to the successor; those open before it stay with the incumbent and are superseded only at the change (SG4; US-V16).
- **An exit recorded in error.** Reversing it restores the role from AT_RISK to HELD under RV5, and every re-derivation that had already happened is itself reversed and audited — items are not left with two histories.
- **A leaver's own work items.** Items about the leaver — the date-of-exit marking, the settlement's lines, the continuity packet — survive the exit and stay with the operator role (US-M07, US-R08); items held *by* the leaver re-derive.
- **A vacancy used as an excuse.** A missed due date during a vacancy is still a missed due date; the causation record classifies it after root-cause review, never by default (FR-OPS-005), and the vacancy appears in the record.

#### Test scenarios

| # | Given | When | Then | Traces |
| --- | --- | --- | --- | --- |
| CT1 | The operator's exit is recorded mid-cycle | The record is saved | The role goes AT_RISK the same day and every open item is listed with its due date | RV4 |
| CT2 | The same tenant, with only the approver left | The product offers routes | Exactly three: name a successor, record the single-person exception, or accept the stall — no silent merge | Worked example; AC-RV.1 |
| CT3 | A successor is named | The role returns to HELD | Items re-derive only after the hand-over pack is acknowledged, and the acknowledgement is recorded | RV5 |
| CT4 | An item that would re-derive onto the maker of its own subject | Re-derivation runs | It goes to the readiness report instead | AC-RV.3 |
| CT5 | An approver role handed to a CFO with an artefact open | The change takes effect | The open artefact is superseded and re-presented; decided artefacts are untouched | SG4; AC-RV.4; US-V16 |
| CT6 | A named contact on a written authority leaves | The exit is recorded | The authority goes SUSPENDED until the signatory confirms; operator-attended sessions fall back to employer-attended | RR3; FR-OPS-002 |
| CT7 | An authorised signatory leaves | A DSC-bound step is reached | It waits for a new authority signed by the new signatory; no key is transferred | Hand-over pack |
| CT8 | A role stands VACANT | `role.vacancy_grace_days` elapses | The tenant owner is alerted again with what is stalled and the first date it costs money | AC-RV.2 |
| CT9 | A client revokes a CA's grant on the 12th of a month | Access is evaluated | The CA's users lose access at once; the client's data does not move; the CA's items re-derive | CA table rows 2–3 |
| CT10 | A due date is missed during a vacancy | The causation record is written | It is classified by root-cause review, with the vacancy recorded, and never defaulted to either side | FR-OPS-005 |

---

### 03.7 Secondary personas (requirement-shaping, not buyers)

#### S1 — Line manager / department head

Appears as a distinct user around 50+ employees. **JTBD-L1 (functional):** *When* my team member requests leave or a regularisation, *I want to* approve or reject it in the flow of work in one tap, *so I can* not become a bottleneck. **JTBD-L2 (functional):** *When* I plan shifts or approve overtime, *I want to* see my team's cost, attendance and remaining OT headroom, *so I can* schedule without pulling HR in. **Pain:** approvals scattered across WhatsApp and email; no team view; and — the sharp one — **he is the person whose scheduling decision creates the employer's statutory breach.** A shift lead approving a sixth consecutive OT block is exactly how a worker would cross a quarterly OT cap — reported at 144 hours but **[Hypothesis]**, never confirmed against gazette text (§03.5, worked example 1; §20 V-17); the manager, not payroll, is where that potential breach is *authored*, so the warning has to reach him at the approval moment, not Suresh at cut-off.

**Success:** approvals in the flow of work (mobile, one tap); team attendance visible; an OT-headroom indicator that turns amber before the configured cap and **warns** at the approval that would cross it — it never blocks, because the cap is unverified. **Requirement impact:** approval routing, delegation, and manager self-service gate adoption above 50; the OT-cap warning is an exposure control, not a convenience, and belongs on S1's surface because that is where the exposure originates. **[Hypothesis]** on adoption weight — kill line: if pilots at 50–100 show managers routing around the tool (back to WhatsApp) despite mobile approvals, the manager surface is not adoption-critical and de-prioritises below the payroll spine (the OT-cap warning stays, since it can also fire from the attendance engine).

**US-L01 · Clear regularisations before inputs close** · Job: JTBD-L1 · Exercises: §09 regularisation (FR-REG-001, FR-ATT-022); FR-CHR-086 · Release: R1
*As* a line manager, *I want* my team's regularisation requests on my phone with the evidence beside them, *so that* nobody loses a day's pay because I was slow.
- **AC-L01.1** — Each task shows the date, the terminal's last push time, the employee's claim and the IN and OUT times proposed; approve or reject is one action, and a rejection needs a reason.
- **AC-L01.2** — A task still open `calendar.alert_lead_days` before the attendance cut-off escalates under FR-CHR-086, so it cannot hold M2 hostage (FR-ATT-022).
- **Negative** — a manager's own regularisation routes to his manager, never to his own queue (§07.5.2).

**US-L02 · See OT headroom at the moment of approval** · Job: JTBD-L2 · Exercises: §09.6 OT; §20 V-17 · Release: R1
*As* a line manager, *I want* the worker's rolling-quarter overtime shown when I approve another block, *so that* the exposure is visible where it is authored.
- **AC-L02.1** — Approving an OT block shows the worker's rolling-quarter hours against `ot_quarterly_ceiling_hours` (144 pending verification — **[Hypothesis]**, §20 V-17) and warns when this approval would cross it.
- **AC-L02.2** — After the warning the approval proceeds; the warning and the manager's choice are recorded and appear as exposure on the operator's and approver's views (§03.5 worked example 1).
- **Negative** — no approval, shift, pay run or filing is blocked on the unverified cap (K-04).

**US-L03 · Decide leave inside the SLA, with its LOP effect visible** · Job: JTBD-L1 · Exercises: §07.5.2; FR-CHR-086 · Release: R1
*As* a line manager, *I want* each leave request to show the balance after it and any LOP it would cause, *so that* I decide with the pay consequence in front of me.
- **AC-L03.1** — The request shows the balance after approval and, where the balance is exhausted, the LOP days and their rupee effect on the employee's day-rate method.
- **AC-L03.2** — While the manager is on approved leave, requests route to his delegate (FR-CHR-086).
- **Negative** — approving leave for a date inside a LOCKED month never edits that month; it flows as an LOP reversal in the next run (US-M04).

**US-L04 · See my team's attendance and cost without asking HR** · Job: JTBD-L2 · Exercises: §07.5.2 MSS; FR-CHR-105 scope · Release: R1
*As* a line manager, *I want* my team's attendance, open exceptions and cost for the month in one view, *so that* I schedule without pulling Meera in.
- **AC-L04.1** — The view shows, for direct and indirect reports only, attendance exceptions, leave, OT hours against the warn-only ceiling and team cost in aggregate.
- **AC-L04.2** — Individual pay is shown only where the tenant's policy grants it to managers, within FR-CHR-105's scope rules.
- **Negative** — the view never shows statutory identifiers, bank details or Aadhaar digits (FR-CHR-105).

#### S2 — Statutory inspector / auditor

Not a user, but the *judge* the whole product is built to satisfy. **What they demand [Verified] (Source: §06; EV-053–055, EV-057; EPF/ESI/PT/TDS filing rules):**

- The **employer registers** — in the central sphere, six registers plus a wage slip across three rule-sets (Wages Forms I, IV, IX and Form V wage slip; OSH Forms XIII, XIV, XV, XIX, XX and Form XVI; SS Form XXII), kept as one canonical set with form numbers configurable per state (EV-053). Form IX needs **per-day IN and OUT timestamps** — a present/absent or day-total model is non-compliant (EV-055). Retention runs five years after the last entry (Wages) or five calendar years (OSH, SS), with state-sphere periods unknown and routed to counsel (EV-054).
- ECR / ESI / PT / TDS **acknowledgments and receipts** stored against the period.
- The **prescribed-format appointment letters** (owed by establishments of 10 or more workers, in the state-prescribed form — EV-057) and **wage slips** (EV-053).
- **Derivation of any contested number** against the rule version in force *for the period* — the retro-recompute requirement, seen from the inspector's side.

**Requirement impact:** immutable audit trail, effective-dated rule versioning, and register generation are P0 *because of who S2 is*, not because a buyer asked for them. The product's core artefact — the filing — is literally what S2 inspects. This is the persona that makes "the filing is the unit of delivery" a *requirement* and not a slogan.

S2 has no login. The stories below are the operator's, written for the day S2 arrives; they carry the `US-I` prefix so the inspection pack can be tested as one set.

**US-I01 · Produce the register pack for any period in the retention window** · Exercises: FR-PAY-709; EV-053–EV-055 · Release: R1 (A-18); state forms as captured (A-19)
*As* the operator facing an inspection, *I want* the registers for a requested establishment and period generated in the form the state prescribes, *so that* the inspector reads the canonical set, not a reconstruction.
- **AC-I01.1** — The pack contains the central-sphere set — Wages Forms I, IV and IX with the Form V wage slip; OSH Forms XIII, XIV, XV, XIX and XX with Form XVI; SS Form XXII — as one canonical set, each with the form number configured for the state (EV-053).
- **AC-I01.2** — Form IX shows per-day IN and OUT timestamps with the signature row (EV-055); Form I carries its 36 numbered fields, with any field fenced pending counsel — the Aadhaar-field rendering and the thumb-impression capture — shown as fenced rather than blank (§06 R24).
- **AC-I01.3** — Every register reconciles to the pay runs and filings of the same period (AC-709.1), and a finalised register is immutable.
- **Negative** — a period outside the retention window the product holds for that rule-set (EV-054) returns "outside retention", never a partial register presented as whole; a state-sphere period is not assumed (Part D-11).

**US-I02 · Produce the filing evidence for a period, signed** · Exercises: FR-OPS-008 AC-008.3; FR-PAY-712 AC-712.5; FR-OPS-005 · Release: R1
*As* the operator, *I want* every acknowledgement, challan and receipt for a period in one signed export with the log of who acted, *so that* "show me you filed" takes minutes.
- **AC-I02.1** — Per registration and month: return type, return file ID, TRRN, approval timestamp, receipts and every linked Supplementary or Revised return (AC-712.5); for Form 138, the Return Receipt Number (EV-051).
- **AC-I02.2** — The on-behalf log extract for the same period is included as a signed statement (AC-008.3), with the submission mode of each filing (FR-OPS-001 AC-001.4).
- **Negative** — a filing that never reached FILED appears with its state and blocker, never omitted.

**US-I03 · Answer a contested figure against the rule in force for its period** · Exercises: FR-PAY-1002; US-S09 · Release: R1
*As* the operator, *I want* the derivation of a contested figure computed against the rule version in force for its period, *so that* a figure from last March is defended on last March's rules.
- **AC-I03.1** — The derivation names the rule version effective for the period and, where a later version exists, shows both and states which governs the period (I3; §08).
- **AC-I03.2** — The export uses the form vocabulary of the period (EV-050).
- **Negative** — the product never "re-explains" a locked figure with today's rule.

#### S3 — IT / systems admin (fractional)

Often the founder, an MSP, or a part-time contractor below 150. **JTBD:** connect the biometric fleet and the finance/Tally system with minimum effort and no on-prem middleware. **Pain:** static IPs, port-forwarding, and legacy port-4370 devices that are reverse-engineered and behave inconsistently across firmware (Source: §09). **Success:** device onboarding via ADMS push with a self-serve compatibility check (§09's public device-compatibility matrix — the "highest-leverage cheap artefact" no incumbent publishes). **Requirement impact:** integration must be zero-infrastructure or deals in the 100–200 band die on the IT objection. **[Hypothesis]** on the objection's weight; **[Verified]** that the ADMS push path removes the middleware/static-IP problem (Source: §09 — "best-evidenced call in the corpus"; bench test §20 V-11).

**US-T01 · Onboard a terminal without middleware** · Exercises: §09 ADMS push receiver; §20 V-10, V-11 · Release: R1
*As* the fractional IT admin, *I want* to point a terminal at the tenant's URL and see it pass a compatibility check, *so that* no static IP, port-forward or on-premises box is needed.
- **AC-T01.1** — The admin enters the terminal's model and firmware and receives a pass, conditional or fail result from the public compatibility matrix (§09).
- **AC-T01.2** — The first pushed punch appears against the terminal within the test flow, with its clock checked against NIC/NPL-synced time (EV-062).
- **Negative** — a legacy pull-only terminal is not silently accepted; the result names the paid connector path (§09) and V-10's open effort question.

**US-T02 · Decommission or lose a terminal without losing the record** · Exercises: Part E-6 two-phase device erasure; §09 · Release: R1
*As* the IT admin, *I want* a terminal's templates erased with a per-device acknowledgement, and an exception path when the device is gone, *so that* retiring hardware never leaves biometric data behind or attendance records missing.
- **AC-T02.1** — Decommissioning sends the erasure instruction, retries from a queue until the device acknowledges, and records the acknowledgement (Part E-6).
- **AC-T02.2** — A lost or dead device takes the documented exception state: the admin attests decommission or loss, and the attestation is recorded against the device (Part E-6).
- **AC-T02.3** — Attendance events already received survive; the template entity is separate from the attendance event.
- **Negative** — the product holds no image column or image bucket to erase, because enrolment images are deleted after template extraction (Part E-6).

**US-T03 · Connect the finance side without a re-key** · Exercises: §16 Tally and other importers; JV export · Release: R1 importer (§16)
*As* the IT admin, *I want* the payroll journal to leave in a format the accountant's Tally imports, and the migration to arrive from it, *so that* the two incumbents' jobs connect rather than compete (K-23).
- **AC-T03.1** — The locked month's payroll journal voucher exports as §16.2 specifies — Tally-importable XML against a ledger map the customer confirms once, or the CSV journal fallback — and a re-export updates rather than duplicates (§16.2 idempotency).
- **AC-T03.2** — A migration import from Tally meets §16's YTD tie-out criteria before the first live run (§20 V-15).
- **Negative** — the export never carries Aadhaar, bank details or any C1 field the journal does not need (§07; §14).

---

### 03.8 Cross-persona JTBD map — the filing as the shared job

Every persona, viewed through JTBD, is ultimately hiring the product for a *slice of the same job*: **get the statutory obligation discharged, correctly and provably, with the least attention.** The differences are in which slice and at what altitude.

| Persona | Altitude | The slice of "discharge the filing" they own | Emotional core |
| --- | --- | --- | --- |
| Vikram (founder) | Outcome | *That* it happened, provably, off his desk — the liability stays his (EV-030) | Fear of liability |
| CA Anjali | Portfolio | Discharge it across 40 clients efficiently | Fear of irrelevance + reputation |
| Suresh (payroll) | Production | Produce the correct, portal-ready file | Fear of a wrong signed number |
| Meera (HR) | Input | Feed clean, reconciled inputs and chase dates | Fear of blame / escalation |
| Ravi (employee) | Consumption | Trust the output; supply my own data | Fear of being paid wrong / unseen |
| S1 (line manager) | Authoring | Author the attendance, leave and OT facts the filing rests on | Fear of being the bottleneck |
| S2 (inspector) | Judgement | Establish that it happened and can be proved, period by period | — (the persona the others fear) |

Read top to bottom, this is the *value chain of a single filing*: Ravi supplies data → Meera reconciles inputs → Suresh produces the file → Anjali discharges it across a portfolio → Vikram sees that it happened. The product's thesis — filing as the unit of delivery — is what makes these five personas one coherent user base rather than five disconnected feature audiences. A payslip-first product would fracture them (each sees a different payslip screen); a filing-first product aligns them (all five orient to the same discharged obligation).

#### Cross-persona worked flow — the exit / full-and-final settlement all five touch at once

Onboarding is the "one intake, nine fan-outs" flow (§03.2); **exit is its mirror, and it is where every persona's job converges on a single settlement.** An employee on ₹50,000 (Basic+DA) resigning at 5 completed years, serving 30 days' notice, with 30 days' accrued leave, generates a computation that no single persona owns end-to-end today:

| Component | Amount (worked) | Statutory basis / source cue | Persona touch |
| --- | --- | --- | --- |
| Gratuity | (15/26) × 50,000 × 5 = **₹1,44,231**, up to the configured payment ceiling (§03.2) | CoSS s.53 **[Verified]** on the formula | Meera flags eligibility; Suresh computes; Vikram's accrual line clears |
| Leave encashment | 30 × ₹1,923 (the ₹50,000 ÷ 26 day-rate rounded to the rupee, a policy choice and not a statutory constant — §03.5) = **₹57,690** | OSH Code annual leave with wages **[Verified]** on the entitlement; ratio and day-rate are parameters (§03.5) | Ravi's visible balance; Suresh computes |
| Final month salary + arrears | pro-rata to last working day | CoW s.17(2) **[Verified]** | Meera reconciles LOP; Suresh runs |
| TDS on the settlement | s.392 (ex-s.192) on the aggregate, net of the income-tax gratuity exemption up to its notified limit (the exempting provision under either Act and its current limit are not in our evidence — parameter `gratuity_tax_exemption_limit`, §20) | EV-050 **[Verified]** on s.392 | Suresh computes; Ravi sees derivation |
| PF/ESI cessation | date of exit marked on the EPFO portal — a separate action, not an ECR file field (EV-035); contributions only up to the date of leaving (EV-040); a wrong exit date needs a joint employer–employee declaration to correct (EV-041) | EV-035, EV-040, EV-041 **[Verified]** | Suresh marks it; Anjali does it 25× across roster |
| Form 130 (ex-Form 16) issuance | annual certificate on the year's aggregate, TRACES-generated only (EV-048) | Salary detail depends on the unreleased Q4 Annexure II (EV-046) **[Verified]** | Suresh downloads and issues; fenced until Q4 lands |

The settlement statute for wage-payment timing is exacting: wages due on removal, dismissal, retrenchment **or resignation** must be paid **within two working days** (CoW s.17(2)), unless the appropriate Government provides another time limit (s.17(3)) **[Verified]**. **[Reversed]** — earlier drafts confined the two-day rule to employer-initiated exits; the text covers resignation too. **Acceptance:** the exit flow assembles all six lines from one action, applies the configured gratuity-ceiling and exemption parameters, raises the EPFO date-of-exit marking as an attended task in the same action (a missed marking leaves a ghost member on the roster; a wrong one needs a joint declaration to undo — EV-041), and fences Form 130 behind the Q4 dependency (EV-046) rather than issuing an incomplete certificate. This is the single strongest demonstration of the thesis: the F&F is not a payslip, it is a bundle of *filings and certificates*, and getting one line wrong (a mis-computed gratuity, a missed exit date, a wrong TDS) is what surfaces at diligence or at an ex-employee's PF grievance.

<!-- DIAGRAM: personas-jtbd-influence-usage -->

<!-- DIAGRAM: filing-value-chain -->

---

### 03.8a Month in the life — one wage month through the corrected filing lifecycle

The day-in-the-life vignettes give each persona's texture; they do not show the hand-offs. This subsection walks one wage month through the payroll-month machine (FR-PAY-301), the filing-instance machine (FR-PAY-711), the attended session (FR-OPS-006) and EPFO's revamped lifecycle — upload, validate, return statement, approve or reject, Due Deposit Balance Summary, challan with TRRN, pay, receipt (EV-036) — naming at each step who acts, what evidence is left and what fails if the step is skipped. The worked month is **August 2026** at Vikram's 60-person Pune firm (§03.6a worked example): Meera is the operator, Vikram the approver, and CA Anjali prepares the quarterly TDS statement. The submission posture is R1's: the employer's own user signs in and submits (§22 Modes A and B); operator-attended submission waits on counsel (§05 A-23; §20 V-25).

Only two kinds of date appear. **Statutory dates** come from §06.11 with their citations. **Tenant-set dates** — the attendance cut-off, the processing window, the planned pay date — are pay-group configuration. The day-of-month payroll calendar that vendor pages publish (inputs through the third week, the run about the 25th, disbursal from the 28th to the 1st) has no primary or survey evidence behind it (r3/02 finding 33) and is not a design input.

| Anchor | Wage month August 2026 | Kind | Source |
| --- | --- | --- | --- |
| Wage period | 1–31 August | Statutory frame: a wage period may not exceed one month | CoW s.17(1); §06.9 |
| Attendance cut-off | `pay_group.attendance_cutoff` | Tenant-set | — |
| Planned pay date | `pay_group.planned_pay_date` | Tenant-set, on or before the statutory limit | FR-PAY-210 |
| Wages payable | Before the expiry of 7 September | Statutory | CoW s.17(1); §06.9 |
| TDS deposit for August deductions | 7 September | Statutory — the 1961-Act date; r.218 of the 2026 Rules not yet read | §06.11; §05 A-10; §20 V-20 |
| ECR return approved and challan paid | 15 September | Statutory | EPF Scheme 2026; EV-036, EV-039; §06.11 |
| ESI contribution | 15 September | Statutory | ESI (General) Regulations 1950, reg 31; §06.11 |
| Maharashtra PT return | On the frequency Maharashtra assigns to the PTRC for the year | Statutory, ingested per registration | §06.11 |
| ESI contribution period ends | 30 September | Statutory | §06.11 |
| Form 138 Q2 (July–September) | 31 October | Statutory | r.219; EV-049 |

#### The sequence — who acts at each step

| # | Step | Machine | EPFO step (EV-036) | Actor — persona here | Evidence left | If skipped or wrong |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Period opens | M1; F1 for ECR, ESI, PT and TDS instances | — | System | Filing instances with due dates | — |
| 2 | Joiners, exits, revisions and declarations entered | Inputs | — | Operator — Meera; employees through ESS | Maker-checker records (FR-CHR-084) | A statutory field changed without its checker never takes effect |
| 3 | Attendance reconciled as exceptions | Inputs | — | Operator — Meera; managers | Regularisations with IN and OUT times (EV-055) | Device gaps become LOP (US-M02) |
| 4 | Inputs close | M2 | — | Operator — Meera | Input snapshot | Later edits queue as adjustments (AC-302.1) |
| 5 | Process, inspect, reprocess | M4, M5 | — | Operator — Meera (Suresh at 100–200) | Result versions and variance view | — |
| 6 | Sign-off artefact presented | SG1 | — | Operator — Meera | `SO-PAYRUN` | The approver signs a screenshot instead |
| 7 | Approve and lock | M6, M8 | — | Approver — Vikram | Decision and hashes; payslips published; bank file | Any later change becomes a correction run |
| 8 | Bank release | M9 | — | Payment approver — Vikram, then the bank's own checker | UTRs; actual disbursal date | Wages late under CoW s.17(1) |
| 9 | TDS deposit | FR-PAY-902 | — (income-tax challan) | Operator prepares; authorised payer pays — Meera, Vikram | CIN, feeding the `.csi` import | The Q2 statement will not match its challans |
| 10 | ECR generated and validated | F4, F5 | — | Operator — Meera | File, validation report, form-control values | — |
| 11 | Upload in an attended session | F6; S1–S5 | Upload, validate | Employer's portal user — Meera | On-behalf log entry | — |
| 12 | Return statement captured and reconciled | S7 | Return statement | System and operator | Captured statement with its reconciliation | A wrong return approved can never be cancelled (EV-036) |
| 13 | Return approved | F9; S8 | Approve or reject | Named approver instructs (`SO-RETURN`); portal user clicks | Instruction bound to the hash | — |
| 14 | Summary captured and reconciled | M10 guard | Due Deposit Balance Summary | System and operator | Reconciliation including any s.7Q line | A downward error is locked in after step 16 |
| 15 | Gate confirmed | M10 | — | Named approver — Vikram (`SO-GATE`) | Gate record | — |
| 16 | Challan generated | F14 | Challan with TRRN | Portal user, on the instruction | TRRN | — |
| 17 | Challan paid | PAYMENT_INITIATED | Pay | Authorised payer — Vikram, through his bank | Bank debit | Each day late adds s.7Q interest (EV-039) |
| 18 | Receipt captured | F15 | Receipt | Operator — Meera | Receipt reconciled to the debit | The instance never reaches FILED; the tile stays amber |
| 19 | ESI contribution | FR-PAY-702 instance | — (ESIC portal) | Portal user; named approver instructs the challan (`SO-ESIC`); payer — Meera, Vikram | Challan and payment confirmation | The upload template is fenced until captured (A-08); a checklist stands in (US-S16) |
| 20 | PT return where due | FR-PAY-703 instance | — (state portal) | Portal user; named approver (`SO-PT`) | Acknowledgement | — |
| 21 | Month FILED | M11 | — | System | On-time count (§19) | — |
| 22 | After September's run: Form 138 Q2 | F4–F6 for Q2 | — (FVU and upload) | CA Anjali prepares; the named approver instructs the upload (`SO-STATEMENT`) | Return Receipt Number (EV-051) | Mixing utility stacks is rejected (EV-052) |

<!-- DIAGRAM: personas-jtbd-month-sequence -->

#### Each persona's month

**Meera — the operator, input side and portal hands (20–80).**

| Window | What she does | Stories | Machine |
| --- | --- | --- | --- |
| Through the month | Joiners through the one intake; exits through one action; leave, regularisations, declarations | US-M07, US-M11, US-M12 | Inputs |
| Before the cut-off | Attendance reconciled as exceptions; checklist closed | US-M01, US-M02 | M2 |
| Processing window | Process, reprocess, present; fix whatever is returned | US-M03, US-M10 | M4, M5, SG1 |
| After lock, before 7 September | Generate the ECR, ESI and PT artefacts; prepare the TDS challan for the payer | US-S02 at her scale | F4, F5 |
| Before 15 September | Sign in to EPFO, upload, reconcile the return statement, approve on Vikram's instruction, reconcile the summary, generate the challan; ESIC and PT likewise | US-S03, US-S04 | F6–F14 |
| After payment | Capture receipts; the month reaches FILED | US-M09 | F15, M11 |

In a clean month she runs one EPFO session, one ESIC session, a PT session in the months Maharashtra's frequency makes a return due, and the income-tax challan — each a session she operates, with Vikram instructing the irreversible acts and paying from his own bank channel.

**Suresh — the operator above ~80.** The same machine, with three differences that change his month but not its shape. (1) **Parallel state calendars**: with establishments in Karnataka, Maharashtra and Tamil Nadu he runs three PT instances on three cadences — Karnataka's return within 20 days of month-end, Maharashtra's on the PTRC's assigned frequency, Tamil Nadu's on a parameter until its row is sourced (§03.3 worked example 2; A-16). (2) **More driver rows**: two wage bases, arrears batches with their disbursal-dated PF (US-S08) and ESI carry-overs (US-S13). (3) **Quarter-close work**: he stages Form 138 himself (US-S07) rather than handing it to a CA.

His February 2027 PT, for an employee on ₹50,000 at each of the three establishments, shows why the calendars cannot share a field:

| State | February PT | Return due | Instance state | Source |
| --- | --- | --- | --- | --- |
| Karnataka | ₹300 (the February true-up) | Within 20 days of month-end — 20 March 2027 | SCHEDULED once Karnataka's row is published; fenced until then (A-16) | §03.3 worked example 2; r3/02 finding 18 |
| Maharashtra | ₹300 (the February true-up) | On the frequency ingested for the PTRC | SCHEDULED, or "unconfirmed" until ingested | §06.11 |
| Tamil Nadu | `pt.TN.slabs` | `pt.<state>.due_day`, not captured | Fenced — state data not sourced (A-16) | §06.11; §20 V-09 |

The approver's section D lists all three; a February run that emits ₹200 in Karnataka or Maharashtra is a short remittance the reconciliation must catch before `SO-PT` (US-S11).

**The quarter, from three seats.** A Form 138 statement is the TDS equivalent of the month's ECR, run once a quarter, and its steps sit on different people.

| Step | Machine | Persona | Evidence | If wrong |
| --- | --- | --- | --- | --- |
| Deposits for the quarter's three months made with their challans | FR-PAY-902 | Operator prepares; authorised payer pays | CIN per challan | The statement will not match |
| `.csi` challan file imported | FR-OPS-007 | Operator, or the CA | Match of every challan to the statement | No session opens (FR-OPS-007) |
| Statement generated on the period's stack — RPU 1.2 and FVU 1.2 for Tax Year 2026-27 | F4 | Operator, or the CA | The `.txt` with FH, BH, CD and DD records (EV-051) | Mixing stacks is rejected (EV-052) |
| FVU validation on the deductor's side | F5 | Operator, or the CA | The `.fvu` output and its result | — |
| Upload instructed | `SO-STATEMENT` | Named approver | Instruction bound to the `.fvu` hash | — |
| Upload on the income-tax portal under the deductor's credentials | F6 | Employer's user or the CA; operator-attended upload waits on §22.2.3 Q3 | Session log | — |
| Return Receipt Number captured | F9, F16 | Operator | RRN (EV-051) | The quarter never reaches FILED |
| Correction, where needed | F10 | Operator plus approver — `SO-CORRECTION`, then the correction's own `SO-STATEMENT` (US-V21) | Correction statement on the Q1–Q3 format of August 2026 (A-12), held until the portal takes Tax Year 2026-27 corrections (AC-708.3) | Q4 correction is fenced (EV-046) |

For Tax Year 2026-27 the fourth quarter stops at the first row it cannot pass: the Q4 regular format is not released (EV-046), and the Form 130 request that depends on it waits behind it (A-13, A-14).

**Vikram — the approver, in two sittings.** Counting the acts the machine gives him in a clean single-establishment month:

| Sitting | Window | Acts | Machine | What the operator must have done first |
| --- | --- | --- | --- | --- |
| 1 — pay | Between processing and the planned pay date, on or before 7 September | `SO-PAYRUN` approve and lock; `SO-BANK` release, then the bank's own approval and OTP; pay the TDS challan | M6, M8, M9; FR-PAY-902 | Run PROCESSED with no blocking item; TDS challan prepared |
| 2 — file | After upload, before 15 September | `SO-EXIT` for any leaver not yet marked; `SO-RETURN`; `SO-GATE`; pay the EPF challan; `SO-ESIC` and the ESI payment; `SO-PT` and PT payment where due | F9, M10, F14 | ECR uploaded and its statement reconciled; summary captured; ESIC challan and any PT return prepared |

Counting approve-and-lock as one act, sitting 1 holds four acts — approve and lock, release, the bank's own approval, the TDS payment — and sitting 2 five: the return instruction, the gate, the EPF payment, the ESIC instruction and the ESI payment. A clean month is therefore nine acts in two sittings, eleven in a month a PT return falls due, plus one `SO-EXIT` per leaver. One sitting is possible only when the bank confirms disbursal inside it, because the gate (M10) follows DISBURSED; a third sitting means the operator's preparation ran late. The approver's queue therefore groups acts by sitting and orders them by the five keys of §03.6a — the return before the gate, the gate before any other challan. Two sittings is a design target, **[Hypothesis]** until pilots instrument it (§03.11).

<!-- DIAGRAM: personas-jtbd-approver-sittings -->

**Open question for §08.** FR-PAY-902 initiates every statutory payment only through the M10 gate, whose guard includes the approved ECR return statement; the TDS deposit falls due on the 7th, eight days before the ECR's 15th. This subsection assumes the TDS deposit is reconciled to the snapshot and paid in sitting 1, ahead of the month's M10. Whether M10 gates the TDS deposit or only the EPF challan is routed to the §08 owner; if it gates the TDS deposit, the ECR return must be approved before the 7th and the two sittings merge into one before that date.

**CA Anjali — the channel at 25 run-clients.** Her month is gated by 25 other people. Each run-client produces, before its 15th, one `SO-PAYRUN`, one `SO-BANK`, one `SO-RETURN`, one `SO-GATE` and, where it is ESI-covered, one `SO-ESIC` — at least 100 client-approver acts across the roster in the first half of every month, 125 if every client is ESI-covered, none of which she may perform (§03.1 rules 2–3) — alongside up to 100 portal sessions she operates under her clients' credentials (25 clients × EPFO, ESIC, PT and TDS; §03.4). Her binding constraint is her clients' approvers' response time, not her own throughput. That is why the roster sorts by the next irreversible act and names the approver who must act (US-A05), and why §03.11 carries a row for it.

| Window | What she does across the roster | Stories | Machine |
| --- | --- | --- | --- |
| Through the month | Watches the impact list for rule changes; answers client queries from derivations | US-A03; US-M05 pattern | — |
| Each client's processing window | Her junior makes; she reviews; the client's approver is sent the artefact | US-A01 | M4, M5, SG1 |
| Before each client's 7th | TDS challans prepared for each client's payer | — | FR-PAY-902 |
| Before each client's 15th | Portal sessions under each client's credentials, recorded by evidence import; roster sorted by the next irreversible act | US-A02, US-A05 | F6–F15 |
| Quarter-close months | Every client's statement from one queue | US-A06 | F4–F16 |
| When a client leaves | The grant is revoked; the client's data stays put | US-A04 | — |

**S2 and S3.** The inspector has no month; the operator's inspection pack (US-I01–US-I03) is what makes any day an inspection can arrive on an ordinary one. The fractional IT admin appears when a terminal is added, fails or is retired (US-T01, US-T02); the month-home view shows a terminal that has stopped pushing inside the attendance window so that US-M02's device-offline gaps have a named cause.

**Ravi — the employee.**

| When | Ravi-desk | Ravi-frontline |
| --- | --- | --- |
| Through the month | Leave requests; proofs in the proof season | Punches at the terminal; missing-punch flags |
| Before the cut-off | — | Regularisations approved by his supervisor |
| At lock (M8) | Payslip published, every line explained | Payslip in his language; WhatsApp delivery at v2 (§12.3) |
| After the month is FILED | His PF passbook on EPFO's side reflects the contribution — EPFO's record, not ours | Same |
| Once a year | Regime election before the Tax Year's first payroll; Form 130 once TRACES generates it | Same |

**The line manager (S1).** Regularisation and OT approvals before the cut-off (US-L01, US-L02) and leave inside the SLA (US-L03). If his queue is open at the cut-off, the FR-CHR-086 escalation clears it — not Meera.

#### How the month changes by month type

| Month type | Examples | Operator | Approver | Employee | Source |
| --- | --- | --- | --- | --- | --- |
| Ordinary | August 2026 | The sequence above | Two sittings | Payslip; regularisations | — |
| Quarter close for TDS | June, September, December, March | Stages the quarter's Form 138 after the month's run, imports the `.csi`, routes to the period's utility stack (US-S07) | `SO-STATEMENT` before 31 July, 31 October, 31 January; Q4 amber by design for Tax Year 2026-27 | — | EV-049, EV-051, EV-052 |
| ESI period end | September, March | Carries mid-period gate-crossers to 30 September or 31 March and drops them from 1 October or 1 April (US-S13) | Section D shows the carry-overs and drop-outs | The ESI line leaves the next payslip | §06.11; §03.3 worked example 4 |
| Pay date crosses a quarter | September wages paid in October | The deductee date of payment moves to the October–December statement (r5/02 finding 32) | The change reaches him before PAYMENT_INITIATED (AC-210.3) | — | §03.6a edge cases |
| February | February 2027 | The PT true-up month in Karnataka and Maharashtra, ₹300 in each (§03.3 worked example 2); the central-sphere annual returns, OSH Form XVII and SS Form XXIII (A-20, A-21) | Section D carries ₹300 PT lines and the annual returns' due dates | PT line shows ₹300 | §06.11 |
| March and the Tax Year end | March 2027 | Proof lock and the true-up month; the March TDS deposit falls due 30 April (1961-Act date; r.218 unread); Form 138 Q4 (31 May 2027) and Form 130 (15 June 2027) show BLOCKED (EV-046) | `SO-PAYRUN` for the true-up month carries the declaration-reversal row (US-V13) | Proof outcomes; true-up deductions | r3/02 findings 17, 23 |
| April — the Tax Year's first payroll | April 2027 | The regime-election gate closes at the first payroll (vendor-documented, r3/02 finding 22); declarations open | Section C shows regime-driven TDS rows | The regime screen locks | US-R04 |
| The ESI cliff | Wage month November 2026 | For periods under the unresolved post-22-November regime, the ESI instance sits BLOCKED — regime unresolved (F2; A-09) | Section D shows ESI as BLOCKED with its owner, never a guessed amount | — | §06.9; §20 V-08 |
| The 20-crossing | The month an establishment's count reaches 20 | EPF registration, UAN and first-ECR tasks (AC-1004.2); the first submission co-attended (FR-OPS-011) | The tenant's first `SO-RETURN` and `SO-GATE` (US-V15) | UAN activation prompt (US-R09) | EV-057 |
| A month with no active members | An establishment between hires | No file; administrative and inspection charges through Direct Challan Entry (EV-042) | Approves the Direct Challan Entry amount as an `SO-GATE` on a NIL summary | — | EV-042 |
| An exit-heavy month | Several leavers | An `SO-EXIT` and an F&F run per leaver, each on its own final-wages clock | Several `SO-EXIT` and `SO-OFFCYCLE` items grouped in the queue | Settlement lines | CoW s.17(2); EV-041 |
| The bonus month | The tenant's configured bonus date (bounded by `bonus.payment_deadline`, the name §08 uses; legacy practice paid within eight months of the accounting year's close, and the Code-era deadline is unresolved — r1/06 finding 48; §06.7) | A bonus off-cycle run on the configured base and ceilings, which are state-divergent parameters (§03.3; CoW s.26) | An `SO-OFFCYCLE`, whose section F shows any bonus ceiling not yet confirmed as a blocking item (FR-PAY-1004) | Bonus line with its base | §06.11; §05 A-27 |

#### Month zero — the first thirty days of a tenant, by persona

Anxiety, not a feature gap, is what keeps Vikram on the status quo (§03.8b), and the first month either retires it or confirms it. Month zero is the sequence below; each step names its owner, the test that ends it and the §19 activation event it emits (§19.11.1).

| # | Step | Owner | Exit test | §19 event |
| --- | --- | --- | --- | --- |
| Z1 | Sign up; enter the legal entity, establishments and registrations — PF code, ESI code, PT registrations, TAN | Vikram or Meera | Every registration hangs off an establishment whose jurisdiction sits on the work location — state, sphere, Code-regime commencement date (Part E-5; §05 B1) | `signup`, `statutory_code.linked` |
| Z2 | Assign roles against the readiness table (§03.1) | Vikram | Operator, approver, payment approver, named approver and any OTP contact held; the single-person exception recorded if it is needed | — |
| Z3 | Import from the incumbent (§16) | Meera or CA Anjali | YTD taxable salary, TDS deducted and statutory totals tie out under §16's criteria (§20 V-15) | `importer.used`, `migration.field_captured` |
| Z4 | Take existing employees through consent (US-M12) | Meera; employees | Every employee in a consent state; non-responders on §07's path | — |
| Z5 | Open the filing ledger from each establishment's coverage date, with prior months recorded from the employer's filing history (return file IDs, TRRNs) | Meera | No wage month between coverage and the first live month without a ledger status (AC-712.1) | — |
| Z6 | Run one month in parallel with the incumbent, comparing the operator's own computation (US-S10) | Operator | Every per-employee difference explained | — |
| Z7 | First live month on the §03.8a sequence, each artefact type's first submission co-attended (FR-OPS-011) | All | The first filing instance reaches FILED with its acknowledgement | `first_filing.accepted` |

The cutover month decides how much of month zero is hard.

| Cutover | What must be carried over | Who carries it | Exposure |
| --- | --- | --- | --- |
| The Tax Year's first payroll (April) | Opening balances; regime elections captured before that first payroll (US-R04); declarations opened fresh | Meera or the CA | Least carry-over, but a narrow window — the migration-seasonality risk §20 records |
| Mid-year | YTD gross, TDS, PF, ESI and PT per employee; the Tax Year's earlier Form 138 statements for continuity; declarations part-way through their cycle | Meera or the CA (§03.4 worked example 2) | The whole of §20 V-15: whether continuity survives without manual repair |

#### Failure branches, worked

**FB-1 — The wrong file on the portal.** Worked at §03.6a ("The same month at the portal"): July's file uploaded for August differs from the snapshot by only ₹840.00 in total while one member is over-stated by ₹3,600.00. The route depends on where it is caught — reject before approval, one Revised return before payment, and after payment a Supplementary for the absent member, holds for the under-stated ones and an unanswered recovery question for the over-stated one (EV-036, EV-037).

**FB-2 — The approver cannot be reached on the 15th.** The operator has uploaded and reconciled; `SO-RETURN` is presented and unanswered. The session waits `ops.instruction_wait_minutes`, then hands back with the portal state "uploaded, not approved", and the employer's own user can approve on the portal (§22.11 scenario 1). If payment slips three days past the due date on a month whose EPF dues are ₹2,16,000 — which they would be if all 60 members had EPF wages at the ₹15,000 ceiling (60 × ₹3,600) — the predicted s.7Q interest is ₹2,16,000 × 12% ÷ 365 = ₹71.01 a day, ₹213.04 for three days, shown as a prediction on `epf.interest_day_count` and reconciled to the portal's figure (EV-039). Damages are EPFO-assessed and never quoted. An approval the tenant did not give in time falls on the tenant side of §22.2.2's allocation once the root-cause review classes it so — never by default (FR-OPS-005 AC-005.2) — and then what the product owed was the §03.6a escalation and the warning lead time, not a remedy.

**FB-3 — July is stuck; August cannot start.** July's return is uploaded but not approved when August's run locks. Strict month order: August's Regular return is not generated while July has none (AC-712.1), and the ledger names July's blocker and owner. Completeness is a second, separate constraint: if July's return had omitted active members, EPFO would refuse November's Regular return until they were returned (the M−4 rule, EV-038), and the product warns before that window opens (AC-712.2).

**FB-4 — Salary funding is late.** Vikram returns the run under `RC-CASH` (§03.6a). Meera re-plans the pay date; only the date-keyed outputs re-derive (AC-210.3). If the new date falls after 7 September, the artefact carries `LATE` with the Code on Wages s.17(1) exposure named, and payroll is not blocked.

**FB-5 — An exit recorded on the wrong date.** A member's date of exit was marked as 31 July when he left on 20 August. His August contribution falls after the recorded date of leaving, so it can be paid only once the date is corrected through a joint declaration by employer and employee (EV-041; contributions are accepted only between the dates of joining and leaving, EV-040). That member's line goes BLOCKED-joint-declaration with an offline task for both; every other member's return proceeds (FR-OPS-007; AC-712.3). `SO-EXIT` exists to prevent exactly this (US-V07).

**FB-6 — The portal is down on the due date.** An authority-caused miss (§22.2.2): the filing goes in the next available window and the miss is disclosed; the filing's causation record classifies it after root-cause review, never by default (FR-OPS-005). When an authority extends a due date — as EPFO extended September 2025 ECR filing to 22 October 2025 during the revamp (r3/02 finding 12) — the extension enters the calendar as a rule version with its source, and the on-time judgement uses it.

**FB-7 — A corrigendum lands mid-month.** A rule version effective for August is published after M4. Every open `SO-PAYRUN` for August is superseded with `RULE_VERSION_NEWER` (§03.6a, SG4); Meera reprocesses and the new artefact shows a "statutory rule changes" row. For a CA, the same event appears once, listing every client it touches (US-A03).

#### Who is told what, and when

The month runs on hand-offs, so notifications are part of the specification. Operators and approvers are reached through the in-product queue with a mobile push or email; employees through the product and, for frontline workers, through conversations they start. Two constraints shape the employee column. A new WhatsApp Business portfolio reaches only 250 unique users per rolling 24 hours with business-initiated messages (§09), while employee-initiated conversations inside the 24-hour window carry no per-message charge (EV-088). A 200-worker tenant's monthly payslip push fits inside 250; two such tenants sending from one shared new portfolio on the same day would need 400 and do not. Whether each tenant sends from its own portfolio is §12's and §16's decision; this design works at the lowest tier either way because employee-initiated retrieval is the primary route and push is a convenience.

| Event | Operator | Approver | Employee | Manager | CA with a grant | When |
| --- | --- | --- | --- | --- | --- | --- |
| Cut-off approaching with open items | Queue and alert | — | Reminder to flag missing punches | Open regularisations | Roster tile | `calendar.alert_lead_days` before `pay_group.attendance_cutoff` |
| `SO-PAYRUN` presented | — | Queue and push | — | — | Roster tile | On SG1; then the §03.6a escalation ladder |
| Returned for correction | Queue with the code and lines | — | — | — | Roster tile | On SG3 or SG6 |
| Payslip published | — | — | Payslip available | — | — | At M8 |
| Bank-side approval pending | Status | Push naming the bank's own step | — | — | — | After `SO-BANK` |
| Return statement reconciled | — | Queue — `SO-RETURN` | — | — | Roster tile | In session, at S7 |
| Gate ready | — | Queue — `SO-GATE` | — | — | Roster tile | After DISBURSED and the summary's capture |
| ESIC challan reconciled | — | Queue — `SO-ESIC` | — | — | Roster tile | In session, when the challan is captured (US-S16) |
| A session starts or ends, in any mode | — | The designated contact, with a link to the log | — | — | — | AC-008.1 |
| Exclude-and-flag raised | Notice | Listed in section F | Notice with the consequence and the options (US-R07) | — | — | At generation (AC-701.2) |
| Filing instance BLOCKED | Queue with blocker and owner | Amber tile with the owner | — | — | Roster tile | On F2 |
| Due date at risk | Alert | Alert with the predicted exposure | — | — | Alert | `calendar.alert_lead_days` before the due date, if not FILED |
| Month FILED | Status | Digest | — | — | Roster tile | On M11 |

No notification carries an Aadhaar number, a credential, an OTP or another employee's figures (FR-OPS-008 AC-008.4; FR-CHR-105).

#### Month-level acceptance tests

| # | Given | When | Then | Traces |
| --- | --- | --- | --- | --- |
| MT1 | July has no approved return | Meera generates August's ECR | Refused; July named as the blocker with its owner | FB-3; AC-712.1 |
| MT2 | A clean single-establishment month | The approver's queue is built | Acts grouped into the two sittings above, each ordered by irreversibility | §03.8a approver's month |
| MT3 | September wages planned for 30 September | DISBURSED is recorded on 1 October | The TDS deductee record moves to the October–December statement; the approver sees the diff before PAYMENT_INITIATED | AC-210.3; r5/02 finding 32 |
| MT4 | A leaver's date of exit marked in the month before he actually left | The next ECR is generated | That member is BLOCKED-joint-declaration; the others proceed | FB-5; AC-712.3 |
| MT5 | `SO-RETURN` unanswered at `ops.instruction_wait_minutes` | — | The session hands back as "uploaded, not approved"; the tile shows the predicted exposure per day | FB-2; §22.11 |
| MT6 | An establishment with no active members | The month closes | No file; a Direct Challan Entry task; the ledger records NIL with its receipt | EV-042; AC-712.4 |
| MT7 | The establishment's count reaches 20 during the month | Headcount is recomputed | EPF tasks and the grievance-committee task raised on their own counts; the first submission marked co-attended | US-M08; US-V15 |
| MT8 | Wage month November 2026, before an ESI rule version is published for the post-22-November regime | The ESI instance is evaluated | BLOCKED — regime unresolved, with its owner; no amount is shown | A-09; F2 |
| MT9 | EPFO extends a due date | The extension is published as a rule version | The calendar moves the date with its source; the on-time judgement uses the extended date | FB-6 |
| MT10 | A 200-worker tenant on a new, unshared portfolio | Payslips publish | Business-initiated notices go to at most 250 unique users in 24 hours; the rest retrieve in-product | Notifications above; §09 |
| MT11 | The bonus month with a bonus ceiling not yet confirmed for the state | The bonus off-cycle run is processed | A blocking item names the ceiling and its owner; the artefact cannot be approved | FR-PAY-1004; month types above |
| MT12 | The September quarter close | Q2's statement is uploaded | The instance reaches FILED only when the Return Receipt Number is stored (EV-051) | The quarter, from three seats |

---

### 03.8b Forces of progress — why Vikram switches, and why he doesn't

JTBD's switching model (the "four forces") explains the buying decision better than a feature comparison, and it is where a filing-first product wins or loses against the incumbents of §04 and §21. The forces below are Vikram's, because he holds the wallet below ~120.

| Force | Direction | Vikram's specifics |
| --- | --- | --- |
| **Push of the situation** | → toward switching | An EPFO interest-and-damages notice or a near-miss; a botched mid-year cutover; an employee escalation about wrong PF; a diligence flag on unfunded gratuity at a raise |
| **Pull of the new solution** | → toward switching | "Compliance handled and off my desk" — the compliance SLA of §18, specified in §19, delivered as portal-accepted artefacts plus attended filing; one status screen (JTBD-V2); scales to 200 without re-platforming (JTBD-V4) |
| **Anxiety of the new** | ← against switching | "Will migration break my YTD TDS?" (Suresh's scar); "Will it produce filings the portal accepts, or is it parity dressed up?"; data-residency and data-protection questions from a nervous CFO |
| **Habit of the present** | ← against switching | Two incumbents, two jobs: Tally (with the CA) owns accounting and the statutory artefacts, greytHR owns the HRMS job — and Tally payroll *adoption*, as distinct from capability, is unknown (§20 V-02); Kredily and Zoho make the present free (EV-029); switching cost feels larger than the recurring pain until a Push event |

<!-- DIAGRAM: forces-of-progress -->

The strategic reads:

- **The Push is a compliance scare, not a feature gap.** This is why §18 positions on the compliance SLA and why the founder day-in-the-life is dominated by fear, not delight. Marketing that leads with features fights on the incumbents' turf; marketing that leads with "here is the notice you didn't get" activates the Push.
- **Anxiety is the real competitor, not Zoho.** Suresh's shadow-Excel and the mid-year-cutover scar are the friction that keeps Vikram on the status quo. This is why **migration is a first-class product surface** (§16) and why the Tally path ships in v1, the importer as the first migration importer (§05.5 item 17; §16.2) — reducing Anxiety is worth more than adding a module. Residency and data-protection questions are themselves an Anxiety input for the CFO buyer above ~120, and they must be answered correctly, not reassuringly. **[Reversed]** — earlier drafts told sales to use DPDP s.7(i) ("no employee consent needed for employment purposes") as an anxiety-reducer. It is not in force: DPDP's substantive provisions, s.7(i) included, commence on or about 13 May 2027 (EV-058 — [Verified — mirror] for G.S.R. 843(E); pull from the primary source before customer use), and today the SPDI Rules 2011 require **consent in writing before collecting sensitive personal data** (r.5(1)), which under r.3 includes biometric and financial information (EV-060 — provenance caveat; pull from the primary source before customer use). When s.7(i) does commence, it disapplies consent and notice for employment purposes only; it does not disapply the s.8 duties. The product therefore runs both consent regimes concurrently across the ~May 2027 switch (§07, §09), and whether the SPDI Rules survive DPDP s.44(2)'s omission of IT Act s.43A is under counsel review (§23). DPDP creates no sensitive category of its own (EV-059) — but SPDI does, and it is live. Localisation is neither a blanket mandate nor absent: DPDP's transfer negative list is empty and not in force, while the live constraints are CERT-In's 180 days of ICT logs kept in India (EV-062), SPDI r.7's limits on cross-border transfer of sensitive data (EV-060) and sectoral rules for RBI, SEBI and IRDAI customers — SEBI's in-India residence and processing (EV-085), RBI's materiality-gated, entity-by-entity (EV-087 — [Verified — mirror]; pull from the primary source before customer use), and IRDAI's limited to policy records (EV-086). Every customer-facing legal claim is product surface with a named owner and needs clearance (§17, §23).
- **Habit is defended by "free."** Kredily/Zoho/Tally make the present cheap, so the switch must clear a real value bar — portal-accepted artefacts plus attended filing, which no vendor in the six-vendor priced set claims to submit (greytHR publishes only generation language; the nearest thing, MYND's outsourced filing operation paired with Qandle, is unpriced and demo-sold — EV-030, EV-034; marketing and product surfaces read, not executed) — triggered by a real Push. A product that is merely *nicer* never overcomes Habit at this price point.

**[Hypothesis]** — the entire forces model is inferred, not interviewed. **Kill line:** if §20 V-01/V-03/V-05 (and the V-16 baseline miss-rate) find that Push events are rare (few employers actually receive notices) *and* Anxiety is low (migration is easy), then the switching motion is weak and CAC balloons — the business would then depend on the CA channel doing the switching for the employer, which raises the stakes on P3's kill lines further.

### 03.9 Segment matrix by headcount band

The bands mirror the §06 statutory step function exactly, because *the customer's problem changes precisely where the obligation changes.* This matrix is the bridge between the personas above and the phasing in §05. Commercial verdicts inherit §05's scope decision. Statutory rows are **[Verified]** (Source: §06 gazette citations; EV-056, EV-057); persona-mix and ARPU rows are **[Hypothesis]** pending §20.

| Dimension | < 10 | 10–20 | **20–50** | **50–100** | **100–200** | 200–2,000 |
| --- | --- | --- | --- | --- | --- | --- |
| **Commercial verdict** (§05) | Decline | Acquisition only | Beachhead (thin ARPU) | **Beachhead core** | **Beachhead core** | Expansion |
| **New statutory trigger at band** | TDS s.392 (ex-s.192), S&E reg, min wages, PT where levied; POSH Internal Committee for *every* employer (s.4(1) — the ten-worker line in s.6(1) is the Local Committee fallback, not an exemption — EV-056) | (10) ESI, gratuity accrual, maternity benefit, appointment letter (10+ workers, state form) | **EPF (20), grievance committee (20+ workers)** | Crèche (50) | Works committee (100, only where the appropriate Government orders it) | Retrenchment approval (300) |
| **Dominant buyer** | Founder (or none) | Founder | Founder / Vikram | Founder → CFO | CFO / COO | CFO / CHRO |
| **Who runs payroll** | CA / self | CA | CA (P3) or Meera | Meera + CA co-source | Suresh (P2) emerges | Payroll team |
| **HR function** | None / founder | Founder | Meera (0.5 FTE) | Meera (1 FTE) | Meera + 1 | HR team + S1 managers |
| **CA role** | Full outsource | Full outsource | Outsource (channel P3) | Co-source | Co-source / oversight | Advisory / audit |
| **Deskless share (varies by industry)** | low | low | industry-dependent | often significant | often significant | segment-dependent |
| **Primary pain** | "do I even need this" | Onboarding statutory basics | First ECR without breaking | Reconciliation + multi-state | Two wage bases, arrears, audit | Scale, RBAC, integrations |
| **Free-alt threat** (§04) | Kredily/Zoho ₹0 | Zoho ₹0→₹1k cliff | Zoho ₹1k, Tally ₹0 | Tally + CA | Tally + CA + legacy HRMS | Incumbents |
| **Product wedge** | (none — funnel) | Free funnel | Portal-accepted artefacts + attended filing | Filing + attendance reconcile | Compliance SLA + CA console | Same shape, scaled |
| **Est. ARPU shape [Hypothesis]** | ₹0 | ₹0 | thin | core | core | taper |
| **Approver of record** (§03.1) | Founder | Founder | Founder (Vikram) | Founder, moving to CFO | CFO / COO | CFO / CHRO |
| **Surface mode** (§03.9a) | — | Generalist | Generalist | Generalist, or specialist by role count | Specialist, or generalist by role count | Specialist |

<!-- DIAGRAM: segment-step-function -->

Notes carried from §05 so this matrix is not read in isolation:

- **The EPF trigger at 20 is the segment's front door.** Below 20 the only genuinely-absent obligations are EPF and statutory bonus; that is why <20 is a funnel, not a market. (Source: §06 step function — "only EPF and statutory bonus are genuinely absent below 20") **[Verified]**
- **The 10-employee look-back triggers.** Gratuity and maternity benefit apply where ten or more were "employed, or were employed, on any day of the preceding twelve months" (CoSS First Schedule), so a dip below ten does not switch them off while any day in the trailing twelve months counted ten or more — the engine encodes a twelve-month look-back on the maximum daily count, not a month-end live threshold (§06 `look_back_12m`) **[Verified]**. Whether they retire after twelve months below ten, or continue once covered, is not captured for the Code era; until it is, retirement is a named approver's decision, never automatic (§06) **[Hypothesis]**. The EPF and ESI latch wording under the Code is likewise unconfirmed (§06), and the appointment letter and the grievance committee carry no latch wording at all (§06: `none`).
- **The band is over-served by cheap product and under-served by product that produces portal-accepted filings.** The wedge is quality-of-delivery, not availability — the persona pains above (Suresh's rejected uploads, Meera's reconciliation tax, Vikram's "am I actually compliant") are all *delivery-quality* pains, which is why this framing holds. (Source: §05 "honest restatement of the beachhead") **[Hypothesis]** — kill line: if §20 finds the free incumbents *do* produce portal-clean artefacts for the median 20–50 tenant, the quality-of-delivery wedge narrows and the beachhead floor must move up to 50+.
- **Role separation is a function of band.** The single most important design consequence of this matrix: *below ~80, the product is used by a generalist wearing four hats; above ~120, by four specialists.* The UX must not force the 30-person Meera through the role model the 180-person Suresh needs, and must not dumb down Suresh's console to Meera's level. This is a v1 IA constraint, specified in §03.9a, not a nice-to-have.

#### Persona presence by band (which personas are "live" where)

| Persona | <10 | 10–20 | 20–50 | 50–100 | 100–200 | 200+ |
| --- | --- | --- | --- | --- | --- | --- |
| P1 Meera (HR generalist) | — | fractional | ●●○ | ●●● | ●●● | ●●● |
| P2 Suresh (payroll officer) | — | — | via CA | emerging | ●●● | ●●● |
| P3 CA Anjali (consultant) | ●●● | ●●● | ●●● | ●●○ | ●●○ | ● (audit) |
| P4 Ravi (employee) | ● | ●● | ●●● | ●●● | ●●● | ●●● |
| P5 Vikram (founder/CXO) | ●●● | ●●● | ●●● | ●●○ (→CFO) | ●○ (approver) | approver |
| S1 Line manager | — | — | — | ●● | ●●● | ●●● |

(● live but light · ●● present · ●●● dominant · — absent)

**The strategic read:** the beachhead's *buyer* is Vikram, its *daily user* is Meera, its *quality gate* is Suresh, its *channel* is Anjali, and its *consumption load* — inference and messaging — is Ravi. **[Reversed]** — earlier drafts named Ravi the cost driver; the dominant cost line is supervised filing, which scales per registration × state × filing type rather than per employee (EV-088). A v1 that serves only one of these fails — but a v1 that tries to fully serve all six across all bands is the over-scoped product §05 explicitly declines (the brief's "all three segments" is the *vision*, not v1 scope). The phasing (roadmap section) must sequence by *persona-completeness within the 20–200 band*, not by module breadth across all segments.

---

### 03.9a Surfaces by persona and band — the role model made concrete

Principle 7 (§03.12) and the matrix above say the product presents a generalist surface below ~80 and a specialist one above ~120, from one data model. This subsection says what that means for the build: which surfaces exist, who lands where, what decides the mode, and what each persona sees when the product does not know something.

#### What decides the mode

Headcount is only a proxy; what matters is whether the input side and the production side are held by different people (§03.1).

| Tenant condition | Mode | Why |
| --- | --- | --- |
| One user holds the operator role (with or without a separate approver) | Generalist | The same human closes inputs, runs payroll and operates the portal |
| Different users hold input-side tasks (joiners, attendance, exits) and production-side tasks (run, artefacts, sessions) | Specialist | Suresh's console need (§03.3); Meera keeps her inputs workspace |
| CA-run client | The client's users get the status view, the approver queue and ESS; the CA works in the roster console (§03.4) | The CA is a channel, not the client's operator of record |
| Any tenant | Switchable by the tenant owner, with the change audited | A 90-person firm may still have one operator |

**[Hypothesis]** — role count predicts the right mode better than headcount. Kill criterion: if design-partner operators in either mode routinely switch to the other within their first three months, the default rule is wrong and is re-derived from pilot usage (§03.11).

#### The surfaces

| Surface | What it is for | Generalist operator | Specialist operator | Approver | Employee | Manager | CA |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Month home | Every payroll month and filing instance in its current state, with the next act and its owner | Landing | Landing for the production side | Via status view | — | — | Per client, from the roster |
| Inputs workspace | Joiners, exits, attendance exceptions, the checklist (§03.2) | Inside month home | Landing for the input side | — | — | — | As the client's operator |
| Run workspace | Process, reprocess, variance, wage bases (§03.3) | Inside month home | Primary | — | — | — | As the client's operator |
| Filing workspace | Artefacts, sessions, reconciliations, the ledger | Inside month home | Primary | Read | — | — | Per client |
| Approver queue | Sign-off artefacts in the pay, file and quarter-and-corrections groups, ordered by the five keys (§03.6a) | — | — | Landing when anything is pending | — | — | Read, per client |
| Status view and digest | Tiles per registration and obligation; the monthly digest | Read | Read | Landing otherwise | — | — | Per client |
| Calendar | Every obligation per registration with its date and citation | Read, alerts | Read, alerts | Read | — | — | Across the roster |
| Roster console | Clients, next irreversible act, grants (§03.4) | — | — | — | — | — | Landing |
| ESS | Payslip, leave, declarations, documents, consent | — | — | Own record | Landing | Own record | — |
| MSS | Approvals for the team (§07.5.2) | — | — | — | — | Landing | — |
| Derivation view | One figure's rule, inputs and rule version (US-M05, US-S09) | Opens from any figure | Opens from any figure | Opens from any figure | Own figures | — | Per client |

Every surface reads the same records; a figure shown on two surfaces is one value (principle 7), and no surface computes its own.

#### Device and language

| Persona | Primary device | Language | Constraint the build must honour |
| --- | --- | --- | --- |
| Operator | Desktop, with a phone for alerts and reads | English-first (§12.3) | Every export and import round-trips (US-S10) |
| Approver | Phone | English-first | The artefact is complete on a phone (AC-V01.4); decisions need step-up (AC-004.4) |
| Ravi-desk | Own phone | `vernacular.language_set` (§12.6) | — |
| Ravi-frontline | The terminal; a shared household phone | `vernacular.language_set`; WhatsApp at v2 (§12.3) | Identity never inferred from the handset (principle 6); push limited by the portfolio tier (§03.8a notifications) |
| Manager | Phone | English-first | One-action approvals (US-L01) |
| CA | Desktop | English | Cross-tenant isolation (§15.3.6) |

#### What each persona sees when the product does not know

The evidence discipline of §02 has a user-facing form: an unknown is shown as an unknown, with an owner, and never as a confident default.

| What is unknown | Operator sees | Approver sees | Employee sees | Rule |
| --- | --- | --- | --- | --- |
| A format not yet released (Form 138 Q4 — EV-046) | BLOCKED — format not released, with the due date and the watcher's state | Amber by design, with the due date | "Not yet available", with the date it is due (US-R03) | Never red for a government gap (§03.6, JTBD-V2 table) |
| A parameter with no captured value | The parameter's name, its owner and what it blocks | "Incomplete — parameter unset" on the affected line | The affected line marked as pending confirmation | Never a zero, never a default value (§05 A1 exit test) |
| A due date not captured | "Unconfirmed", with its owner | Same, in section D | — | Never a guessed day (§06.11 rule 4) |
| A state whose PT or LWF row is not gazette-sourced (§20 V-09) | A fenced instance with its blocker (A-16, A-17) | A fenced row in section D | — (the tenant is not onboarded in that state — §03.3 worked example 2) | Never aggregator data |
| A regime not yet resolved (ESI after 22 November 2026 — A-09) | BLOCKED — regime unresolved, with its owner | BLOCKED row in section D | — | Never a figure computed on an assumed regime |
| A counsel fence (operator-attended submission; thumb-impression capture) | The feature shown as awaiting counsel (§23) | Same | — | Never enabled by configuration (§06 R24; §22 AC-001.1) |
| A figure resting on a **[Hypothesis]** (the Tax Year 2026-27 rebate) | The figure with its marker and the §20 item | The marker in section D | The projection labelled a projection | Never presented as settled |

---

### 03.10 Anti-personas — who we are explicitly not designing for in v1

Stated so nobody quietly re-scopes the product around them, mirroring §20's discipline of recording killed ideas.

| Anti-persona | Why excluded from v1 | Evidence / cross-ref |
| --- | --- | --- |
| **Enterprise CHRO (2,000+)** | Different pricing shape, channel, competitive set; procurement arithmetically closed to a new entrant for ~3 years (SBI Criterion 7 needs a 30,000-employee prior implementation; Indian Bank leaves a 3-year floor + 1-year ISO seasoning) | §05 (SBI/Indian Bank RFP analysis) **[Verified]** |
| **The <10 founder as a paid buyer** | Marginal price is zero, defended by Kredily (free forever, unlimited headcount) and Zoho (₹0 to 10) — vendor pricing pages read in round two, not executed | §04, §05, §21 **[Verified]** |
| **The "AI-first buyer" who pays for AI** | AI is not a revenue line here: the only packaging-level AI commitment in the priced set is greytHR NAVOS "included in every plan", and Keka's AI is waitlisted (EV-090 — claim posture, not tested). AI is cost — and inference is the smallest of the four COGS lines (EV-088) | §13, §21 **[Verified]** |
| **The benefits/fintech distribution buyer** | 9–10% margin war against a listed incumbent (Zaggle, 19 bank partners, 50mn+ cards issued, per its own FY26 and Q1FY27 investor material read in round two, not executed) — wrong side of every ratio | §11 **[Verified]** on the published figures |
| **The recruiter wanting passive-candidate search** | Info Edge/Resdex not licensable to third parties (available only through Info Edge's own ATS) — product documentation read, not executed; inbound-only in v1 | §10 **[Verified]** on the documented position |
| **The staffing/EOR/contractor-management buyer** | Different compliance surface (contractor PF/ESI, contract-labour licensing under the OSH Code at 50+ — EV-057); deferred | scope decision (§05) **[Hypothesis]** — kill line: revisit only if ≥30% of pilot inbound is EOR/contractor-led |
| **The buyer who wants "you file it, we never look"** | Every statutory surface is an attended portal and the employer's liability is non-delegable; the product delivers a portal-accepted artefact plus attended, assisted filing, with the employer's named approver on every irreversible act (§03.6a) | K-13; EV-030; §22 **[Verified]** on the portal facts |
| **The approver who wants auto-approval** | A pay run or portal act approved by no one is the failure the sign-off artefact exists to prevent; escalation finds another person, never a waiver (§03.1 rule 5) | §03.6a; FR-PAY-304 |
| **The CA who wants to be every client's approver of record by default** | It turns the channel into the employer's proxy; the CA reviews and the client approves (§03.1 rule 3) | §03.4; §15.3.9 |

---

### 03.11 What must be validated before these personas are load-bearing

Every persona above is a **[Hypothesis]** until the §20 field programme runs. This subsection restates the persona-specific kill lines so the roadmap and GTM sections inherit them explicitly rather than by reference.

| Persona | The bet | Validation method (from §20) | Kill criterion |
| --- | --- | --- | --- |
| P3 CA Anjali (as channel) | CAs will resell/run the tool and stay client-of-record | §20 V-05 — 20–30 CA interviews, both city tiers | 40% or more read it as disintermediation (the §01 kill line) → channel inverts; re-anchor GTM direct; product consequences per the §03.4 decision table |
| P3 CA Anjali (economics) | Blended software+service pricing has headroom | §20 V-01 — mystery-shop 6–8 bureaus at 20/50/100 | Real bureau price < ₹2,000/mo at 50 employees → blended economics collapse at small end |
| P5 Vikram (buyer) | Founders pay for a compliance SLA, not features | §20 V-03 — realised ARPU vs list, won-deal figures | If realised ARPU is 30–40% below list, the SLA premium is unfunded |
| P4 Ravi (frontline reach) | We can onboard frontline at scale | §09 for the WhatsApp 250/24h limit (verified); §20 V-10 for device-integration effort (currently unsized) and V-12 for the WhatsApp per-message rate card | If terminal integration effort is unsized-large, frontline bands slip |
| P2 Suresh (trust) | Payroll officers will retire the shadow Excel | Prototype instrumentation + reference-customer pilots | If first-upload rejection > 0 recurring, trust never transfers |
| P4 Ravi (cost) | Per-employee pricing survives per-user consumption | §20 V-04, V-14 — real tokens/query on real corpora | If a heavy Ravi's inference cost exceeds what his seat carries without rate limits, the §13 P0 limits become load-bearing (inference is the smallest COGS line — EV-088) |
| S3 IT admin (integration objection) | Zero-infra ADMS onboarding clears the IT gate | §20 V-10/V-11 hardware spike + 100–200 pilots | If devices routinely need middleware/static IPs, 100–200 deals stall on IT |
| P5 approver (sign-off surface) | Approvers approve in the product from the artefact rather than from a screenshot | Design-partner pilots, instrumented through `signoff.decided` (§03.6a) | If most pilot months are still approved outside the product after three cycles, the artefact is not the approval surface and is re-scoped to a digest plus bank-side approval |
| P5 approver (sittings) | A clean single-establishment month needs two approver sittings (§03.8a) | The same instrumentation: sittings and time to decision per kind | If approvers miss `SO-RETURN` or `SO-GATE` before a due date in any pilot month, the queue and notifications are redesigned before general availability; the gate is never pre-authorised |
| P3 CA (client-approver throughput) | Client approvers answer fast enough for a CA's roster — 100 to 125 client-approver acts in the first half of each month at 25 run-clients (§03.8a) | §20 V-05 interview probe, then one CA pilot | If client approvers are the bottleneck, a CA's capacity is below the §03.4 arithmetic and the V-01/V-05 economics are re-run on the lower figure |
| P4 Ravi (employee-held items) | Employees close the intake and consent items held by them — UAN activation, declarations, written consent — on their own channel, without the employer conditioning pay on it | Pilot instrumentation of work-item age and closure by class and holder (§03.1a) | If employee-held items routinely age past the artefact they gate, the answer is never a hard block (Part D-10): the chase ladder, the wording and the exclusion notices are redesigned, and the exclusion volume enters §19 as a standing metric |
| P1/P2 operator (surface mode) | Role count picks the right surface mode better than headcount (§03.9a) | Pilot usage of the mode switch | If operators routinely switch mode within three months, the default rule is re-derived |

#### Design risks the persona model creates

Some risks are created by the product's own answers to the personas; they belong here rather than in §20's register because the mitigation is a design choice in this section.

| Risk | How it shows | Mitigation in this section | Owner |
| --- | --- | --- | --- |
| **Rubber-stamping.** A simpler approval invites approval without reading | Decisions made within moments of presentation on artefacts with open flags | Section F must be scrolled past before the controls (rendering rule 5); median decision time per kind is in the digest; no auto-approval exists | Product |
| **Uninstructed portal acts.** In employer-attended sessions the product cannot stop a click | Returns approved on the portal with no in-product instruction | Recorded on the causation record and listed first in the digest (US-S03, US-V08) | Product |
| **Channel proxying.** CAs pressing to be named approvers for convenience | External-approver markers concentrated on CA users | The marker, the digest listing and the rule that a reviewer never decides (§03.1 rule 2) | GTM, Product |
| **Single-person drift.** A founder keeps the exception after a second user joins | `SINGLE_PERSON` artefacts in a tenant that has a second payroll user | The exception ends when a second approver is added (US-V11); the digest lists every such artefact | Product |
| **Operator over-trust.** The shadow Excel retired before the engine has earned it | Retirement with fewer agreed months than the operator's own target | The agreed-months counter is shown and never enforced (US-S10); the choice stays the operator's | Product |
| **Frontline misidentification.** A shared phone attributes a flag to the wrong worker | Flags from numbers not linked to the worker | Identity from worker ID or supervisor confirmation only (US-R02) | Product |

#### Validating the operator and the approver

§20 carries field studies for the CA (V-01, V-05) and the buyer's price (V-03), but none aimed at the two personas the stories lean on hardest. The operator rests on one re-verified job posting and the approver's two-act sign-off on the same posting (r3/02 findings 25 and 28); r3/02 found no quantitative evidence on close duration, query volume or error rate. The protocol below runs inside design-partner pilots, costs no separate study and reports into the §03.11 rows above.

| Claim under test | Observation in the pilot | Question that could falsify it | Kill or revise |
| --- | --- | --- | --- |
| Below ~80 one generalist owns the whole loop (§03.1) | Who performs each FR-PAY-301 transition in the tenant's first three months | "Who else touches payroll in a normal month, and for what?" | If most pilot tenants below 80 show a third regular actor, the actor map gains a role and the generalist mode is re-specified |
| The approver signs a register before disbursement today | What the approver looked at in the last month before the pilot | "Walk me through the last time you approved salaries — what was in front of you?" | If approvers do not review before disbursement at all, `SO-PAYRUN` is positioned as new control rather than replacement, and its adoption row in §03.11 is re-baselined |
| Two sittings suffice in a clean month (§03.8a) | Sittings and decision times from `signoff.*` | "Which of these acts would you rather delegate, and to whom?" | If approvers ask to delegate the gate to the operator, the answer stays no (§03.1 rule 2) and the queue design, not the gate, changes |
| The variance bridge is what the approver needs | Which sections are opened before a decision | "What would you have wanted to see that was not there?" | If section C is routinely skipped, the rendering order is re-tested; the content rules do not change |
| Operators will retire the shadow Excel on evidence (JTBD-S5) | Agreed-month counts from US-S10 | "What would make you stop checking?" | If no operator retires it within the pilot, the P2 trust row in §03.11 fires |

**Standing rule for this section (inherits §02):** no persona quote, day-in-the-life detail, or ARPU-shape claim here may enter a GTM deck or a financial model as fact until its row above is answered. The personas are a *design and prioritisation instrument*; they are not yet evidence. The one-directional optimism bias flagged in §02 applies here too — these personas were authored from the same generator, so their pains are more likely over-stated in the sympathetic direction (the buyer wants it more than reality) than under-stated.

---

### 03.12 Design principles that fall directly out of the personas

1. **One intake, many fan-outs (Meera).** Every statutory registration and document generates from a single joiner intake (the nine artefacts in §03.2), threshold-aware so a tenant is only asked for what it owes. Onboarding is the highest-frequency, highest-frustration flow for the daily user.
2. **Exception-only review (Meera + Suresh).** The payroll and attendance flows surface exceptions (ceiling breaches, regime switches, OT overruns, arrears), not full datasets, for human attention. Deterministic engine, human on the exceptions (aligns with §13 rules-first, LLM-last — "no statutory or monetary figure may ever be model-generated").
3. **Explainability that forwards (Meera → Ravi).** Any statutory number renders a plain-language, shareable derivation naming the rule, the inputs and the rule-version date. This is simultaneously the escalation-deflection lever (JTBD-M3) and the audit-trace surface (JTBD-S4, S2).
4. **Effective-dated rules and statutory attributes (Suresh + S2).** Rules, wage definitions, ceilings and slabs are versioned and period-correct so arrears and audits are defensible — including the 50% add-back (a standing variable, not a constant), state PT cadences, and the Form 138 format version. Non-negotiable, per §14. **[Reversed]** — earlier drafts titled this "effective-dated everything"; bitemporality is scoped by entity class, and punches, rendered documents, biometric templates and consent artefacts are erasable classes whose replay behaviour after erasure §14 specifies.
5. **Console over screens (Anjali, as channel).** Where a CA operates the product for clients, the experience is a roster console (multi-client, batch, calendar, maker-checker), not the single-tenant employer UI with a client-switcher bolted on — shipped thin in v1 and productised only if §20 V-05 finds the channel real (§05 item 20). The CA is a channel persona; this principle serves the channel, it does not make her a v1 design target.
6. **Identity ≠ device (Ravi-frontline).** Frontline access assumes shared devices, the WhatsApp 250/24h reach limit, and terminal-push attendance; never assumes one worker = one smartphone, and never assumes biometrics — the non-biometric path is a per-worker attribute (EV-072).
7. **Role model scales with band (all).** The IA presents a generalist surface below ~80 and a specialist surface above ~120, from the *same* data model — the gratuity accrual Suresh audits and Vikram reads is one number, two altitudes.
8. **The filing is the artefact (all).** The unit the product delivers, stores, acknowledges, and defends is the filing — a portal-accepted artefact plus attended, assisted filing under written authority, with the statutory liability staying with the employer (EV-030) — and every persona's success is defined against a filed, acknowledged obligation, and S2 is the persona that makes this a requirement rather than a slogan.
9. **The approver signs objects, not screens (Vikram).** Every irreversible or money-moving act is a decision on a hashed object — the run's content, the bank file, the portal's rendered return or summary — so that what was approved can be proved later (§03.6a).
10. **Every hand-off names its next actor (all).** Each state of every machine shows who acts next and by when; a step with no holder is surfaced at activation, not discovered at a due date (§03.1 role readiness; §03.8a). The object that carries this is specified in §03.1a, the routing rule that picks the holder in §03.1a, and what happens when the holder goes away in §03.6b.

---

### 03.13 Cross-persona acceptance scenarios

The stories test one persona at a time; these scenarios test the hand-offs. Each runs on a design-partner-shaped tenant in a test environment — never against a live government portal, where an approved return can never be cancelled (EV-036; FR-OPS-011) — with portal responses supplied from captured objects. A scenario passes only if every step's check holds and the transition logs reproduce the outcome (AC-711.1).

#### E2E-1 — A joiner reaches his first ECR line

| Step | Persona | Act | State after | Check |
| --- | --- | --- | --- | --- |
| 1 | Meera | Intake for J, joining 1 August on ₹50,000 | Nine artefact tasks open (§03.2) | Mandatory subset flagged; salary not blocked by any open task |
| 2 | J (as Ravi) | Activates his UAN through UMANG; gives written consent before bank details are captured | UAN task done; consent recorded with its template version | US-R09; US-M12 |
| 3 | Meera | Closes August's inputs | M2 | Checklist item 2 closed (§03.2 checklist) |
| 4 | Meera, Vikram | Process; present; approve and lock | M4 → SG1 → M6, M8 | Section C shows J as the joiners row, +₹48,000.00 net (§03.6a) |
| 5 | Meera | Generates the ECR | F4, F5 | J's line: 11 fields, `#~#`, EPF wages ₹15,000, EPS ₹1,250 (EV-035) |
| 6 | Meera, Vikram | Upload, reconcile, instruct and approve, gate, pay | F6 → F9 → M10 → F14 → F15 | J's line matches the captured statement; receipt stored |

#### E2E-2 — A resignation reaches FILED within its clocks

A ₹50,000 (Basic plus DA) employee with five completed years resigns with a last working day of Friday 25 September 2026, at an establishment working Monday to Friday.

| Step | Persona | Act | State after | Check |
| --- | --- | --- | --- | --- |
| 1 | Meera | Records the exit (US-M07) | F&F run; `SO-EXIT` task; clocks started | Final wages due by Tuesday 29 September 2026 — two working days on the establishment's calendar, absent a holiday on it (CoW s.17(2); AC-803.2) |
| 2 | Engine | Computes the settlement | F&F PROCESSED | Gratuity (15/26) × ₹50,000 × 5 = ₹1,44,231 up to `gratuity_payment_ceiling`; leave encashment on the tenant's day-rate (§03.8) |
| 3 | Vikram | Approves the `SO-OFFCYCLE` | APPROVED, LOCKED | The artefact shows both dates: final wages 29 September; gratuity, once payable, within 30 days (CoSS s.56) |
| 4 | Vikram | Instructs the date-of-exit marking (`SO-EXIT`) | Marked on the portal | Member, date and reason bound; joint-declaration warning shown (EV-041) |
| 5 | Meera | September's ECR | F4–F15 | The leaver's contributions run only to 25 September (EV-040) |
| 6 | Ravi (the leaver) | Downloads the continuity packet | — | YTD earnings, TDS, UAN, ESI IP, leave balance present; Tax Year 2026-27 Form 130 shown as not yet available (US-R03) |

#### E2E-3 — A back-dated revision reaches the arrear flow

| Step | Persona | Act | State after | Check |
| --- | --- | --- | --- | --- |
| 1 | Meera, Vikram | K's revision ₹24,000 → ₹28,000 effective 1 July proposed and checked after July locked | Wage structure effective 1 July (FR-CHR-084) | Neither can both propose and check it |
| 2 | Suresh or Meera | August's run computes July's arrear against July's rule version | PROCESSED | Arrear row +₹4,000.00 gross, PF ₹240 + ₹240, EDLI ₹10 (§03.6a) |
| 3 | Vikram | Approves | APPROVED | Section D shows the arrear's PF due month from the planned disbursal date and `FENCED_ITEMS` (AC-401.4) |
| 4 | Vikram | Releases salaries; actual disbursal date recorded | DISBURSED | Only date-keyed outputs re-derive (AC-210.3) |
| 5 | Meera | August's Regular ECR | F4 | The arrear is not in August's file (AC-401.2) |
| 6 | Meera | The arrear | Ledger carries it BLOCKED pending layout, due month visible | No generator runs; the employer files through EPFO's arrear flow (EV-043) |

#### E2E-4 — The month the establishment reaches twenty

| Step | Persona | Act | State after | Check |
| --- | --- | --- | --- | --- |
| 1 | Meera | A joiner takes the count, in EPF's unit, to 20 | Latch fires (AC-1004.2) | EPF registration, UAN and first-ECR tasks raised |
| 2 | Engine | Recounts in workers | Grievance-committee task raised only if the worker count reaches 20 (US-M08) | The two counts are independent |
| 3 | Vikram | Reviews what turned on (US-V15) | — | Each obligation with its first due date |
| 4 | Meera, our staff | First ECR, co-attended (FR-OPS-011) | F6 in Mode B | No test submission; Meera operates, our staff guide |
| 5 | Vikram | First `SO-RETURN` and `SO-GATE` | F9, M10 | Both bound to their hashes |

#### E2E-5 — A CA-run client's month

| Step | Persona | Act | State after | Check |
| --- | --- | --- | --- | --- |
| 1 | CA's junior | Closes inputs and processes the client's run | PROCESSED | Maker recorded as the CA junior |
| 2 | CA Anjali | Reviews | Review note attached | Anjali cannot approve (US-A01) |
| 3 | Vikram (client) | Approves and locks | M6, M8 | The artefact names maker, reviewer and approver |
| 4 | CA Anjali | Signs in to the client's EPFO account outside the product, uploads, and imports the rendered return statement | Statement captured and reconciled | The roster row for the client moves to `SO-RETURN`, not asked until presented (§03.6a queue, key 3) |
| 5 | Vikram (client) | Instructs the return's approval (`SO-RETURN`) | Instruction bound to the statement's hash | Anjali cannot instruct an act she performs (AC-004.3; AC-029.1) |
| 6 | CA Anjali | Approves on the portal and records the submission by importing the portal's objects | F6, F9 recorded | Objects reconcile to the approved hash; the session log records Mode D and `submission_mode` records `employer` (US-A02; AC-001.4) |
| 7 | Vikram (client) | Gate and payment | M10, F14, F15 | Roster tile turns green only at FILED |

#### E2E-6 — The wrong file is caught before it cannot be undone

| Step | Persona | Act | State after | Check |
| --- | --- | --- | --- | --- |
| 1 | Meera | Uploads July's file for wage month August in an employer-attended session | Uploaded | The product cannot see which file left her machine |
| 2 | Engine | Captures and reconciles the return statement | S7 | L +₹3,600.00; J −₹3,600.00; K −₹480.00; G −₹360.00; total −₹840.00 (§03.6a) |
| 3 | Vikram | — | `SO-RETURN` not offered | The instruction is withheld while any difference is open |
| 4 | Meera | Rejects on the portal on Vikram's instruction; uploads August's file | New attempt linked to the rejected one (F8) | No Revised return involved |
| 5 | Vikram | Instructs approval; confirms the gate | F9, M10 | Zero differences at both |

#### E2E-7 — A corrigendum across a CA's roster

| Step | Persona | Act | State after | Check |
| --- | --- | --- | --- | --- |
| 1 | Statutory desk (§22) | Publishes a rule version effective for August in one state | PUBLISHED | Two-person review recorded (§22.8.6) |
| 2 | CA Anjali | Opens the impact list | — | Every client with an establishment in that state listed with its affected runs by state (US-A03) |
| 3 | Engine | Supersedes open `SO-PAYRUN` artefacts | SG4 | `RULE_VERSION_NEWER` on each |
| 4 | CA's junior | Reprocesses the PROCESSED runs | New artefacts presented | A "statutory rule changes" row appears in section C |
| 5 | CA Anjali | Raises correction tasks for LOCKED clients | `SO-CORRECTION` presented to each client's approver | The route offered is the one the EV-037 guards leave |

#### E2E-8 — A mid-year migration survives its first month

| Step | Persona | Act | State after | Check |
| --- | --- | --- | --- | --- |
| 1 | Vikram | Registrations and roles (Z1, Z2) | Readiness table complete | No role empty (§03.1) |
| 2 | Meera or the CA | Imports the incumbent's data (Z3) | YTD loaded | Ties out under §16's criteria (§20 V-15) |
| 3 | Meera | Consent flow (Z4) | Every employee in a consent state | Nothing backfilled (US-M12) |
| 4 | Meera | Ledger from coverage (Z5) | Prior months recorded | No gap before the first live month (AC-712.1) |
| 5 | Suresh or Meera | Parallel month (Z6) | Difference report | Every difference explained (US-S10) |
| 6 | All | First live month | FILED | `first_filing.accepted` emitted (§19.11.1) |

#### E2E-9 — A frontline punch fault costs no pay

| Step | Persona | Act | State after | Check |
| --- | --- | --- | --- | --- |
| 1 | Ravi-frontline | The terminal misses his OUT punch on the 18th | Gap inside a device-offline window | Not converted to LOP (US-M02) |
| 2 | Ravi-frontline | Flags it (US-R02) | Regularisation task to his supervisor | Identity from worker ID, not the handset |
| 3 | Supervisor | Approves with IN and OUT times | Resolved before M2 | Form IX carries the regularised times (EV-055) |
| 4 | Meera | Closes inputs | M2 | No LOP for the 18th |
| 5 | Ravi-frontline | Reads his payslip | M8 | No LOP line; the regularisation is visible on the day |

#### E2E-10 — A run is returned and re-presented

| Step | Persona | Act | State after | Check |
| --- | --- | --- | --- | --- |
| 1 | Meera | Presents August's run | PRESENTED | Bridge closes to ₹0.00 |
| 2 | Vikram | Returns it under `RC-INPUT`, selecting E's LOP row | RETURNED; run stays PROCESSED | A code is required; no figure changes (US-V02) |
| 3 | Meera | Finds E's second LOP day was a device gap; regularises it; reopens and reprocesses | M3, M4 | The change is an input, not an edit of a figure |
| 4 | Meera | Re-presents | New artefact PRESENTED, linked to the returned one | "Changed since returned" lists E: LOP ₹2,580.65 becomes ₹1,290.32 on the calendar-day method (US-M10) |
| 5 | Vikram | Approves and locks | M6, M8 | The returned artefact stays in the chain; both are in the digest |

#### E2E-11 — A worker withdraws biometric consent

| Step | Persona | Act | State after | Check |
| --- | --- | --- | --- | --- |
| 1 | Ravi-frontline | Withdraws biometric consent from ESS (US-R10) | Consent record withdrawn, with date and notice version | Salary unaffected; no screen says otherwise |
| 2 | Engine | Switches his attendance to the non-biometric path (§09) | Attribute set | Form IX IN and OUT entries continue (EV-055) |
| 3 | S3 admin | — | Two-phase erasure sent to every terminal holding his template, retried until acknowledged (US-T02) | Per-device acknowledgement recorded |
| 4 | S3 admin | A terminal that was retired last month cannot acknowledge | Exception state with the admin's attestation | The attestation names the device (Part E-6) |
| 5 | Engine | Replays an earlier month | The snapshot is read, never the template or the punches | Replay unaffected by the erasure (Part E-2) |

---

### 03.14 Traceability, parameters and measures

#### Every job has a story

| Job | Stories that serve it | Release span |
| --- | --- | --- |
| JTBD-M1 — one intake | Worked edge case 1 (§03.2); US-M11, US-M12, US-M16; US-R09 | R1 |
| JTBD-M2 — one locked, reconciled dataset | US-M01, US-M02, US-M03, US-M10 | R1 |
| JTBD-M3 — a breakdown the employee accepts | US-M03, US-M04, US-M05, US-M15 | R1; US-M15 follows §10 |
| JTBD-M4 — trust the system to chase dates | US-M06, US-M08, US-M13, US-M17 | R1 |
| JTBD-M5 — clean dashboards | US-M08, US-M09, US-M13, US-M14, US-M17 | R1; US-M14 follows §10 |
| JTBD-M6 — one exit action | US-M07; E2E-2 | R1 |
| JTBD-S1 — first-upload-clean artefacts | US-S01, US-S02, US-S06, US-S07, US-S11, US-S12, US-S13, US-S14, US-S15, US-S16 | R1–R3 |
| JTBD-S2 — arrears against period rules | US-S05, US-S08, US-S13; E2E-3 | R1; arrear file fenced |
| JTBD-S3 — mid-year joiner TDS | US-M11; §03.3 worked example 3 | R1 |
| JTBD-S4 — defend a derivation | US-S03, US-S05, US-S09; US-I01–US-I03 | R1 |
| JTBD-S5 — retire the shadow Excel | US-S01, US-S10 | R1 |
| JTBD-S6 — reconcile the portal's version | US-S03, US-S04; E2E-6 | R1 |
| JTBD-A1 — serve more clients | US-A01, US-A02, US-A05, US-A06; E2E-5 | Thin console, R2 (item 20a) |
| JTBD-A2 — statute changes applied once | US-A03; E2E-7 | Thin console, R2 |
| JTBD-A3 — stay advisor of record | US-A01, US-A04 | Thin console, R2 |
| JTBD-A4 — prove a filing | US-A02; US-I02 | Thin console, R2; US-I02 R1 |
| JTBD-R1 — a payslip I understand | US-R01, US-R04, US-R05, US-R08 | R1 |
| JTBD-R2 — a fast leave decision | US-L03 | R1 |
| JTBD-R3 — flag a missing punch | US-R02; E2E-9 | R1; WhatsApp v2 |
| JTBD-R4 — pull a statutory document | US-R03, US-R08, US-R09 | R1; Tax Year 2026-27 Form 130 R3 |
| JTBD-R5 — my language, my consent | US-R06, US-R07, US-R10; US-R01 AC-R01.2 | R1 |
| JTBD-V1 — compliance off my desk | US-V01, US-V03–US-V07, US-V10–US-V15, US-V17–US-V22 | R1; US-V14 and US-V19 R2; Q4 leg of US-V18 R3 |
| JTBD-V2 — one status | US-V08 | R1 |
| JTBD-V3 — liability accruals | US-V03, US-V09, US-V13 | R1 |
| JTBD-V4 — scale without re-platforming | US-V15, US-V16, US-V22 | R1 |
| JTBD-V5 — approve from one artefact | US-V01, US-V02, US-V21; §03.6a | R1 |
| JTBD-L1 — approve in the flow of work | US-L01, US-L03 | R1 |
| JTBD-L2 — team cost, attendance and OT headroom | US-L02, US-L04 | R1 |
| S2 — the inspector (no job; not a user) | US-I01–US-I03 | R1 |
| S3 — the fractional IT admin (no job ID) | US-T01–US-T03 | R1 |

#### Parameters this section relies on

Statutory values not in our evidence are named parameters and routed to §20; tenant choices are configuration and need no validation. "Owner" is who sets the value.

| Parameter | Meaning | Owner | Status |
| --- | --- | --- | --- |
| `epf.damages_scale` | EPF damages by length of delay | Statutory desk (§22.8) | Unverified — §06, §20 |
| `epf.interest_day_count` | The day-count used to predict s.7Q interest | Statutory desk | EPFO's convention not in evidence — §20 |
| `epf.admin_charge_rate`, `epf.admin_charge.minimum` | EPF administrative-charge rate; the establishment minimum (§06 owns the second name) | Statutory desk | Not re-verified (§03.3 worked example 1b) — §20 |
| `ecr.overpayment_recovery_route` | What happens to an ECR over-remittance after payment initiation | Statutory desk | No route in evidence — §20 |
| `rounding_rule(scheme, field)` | Rounding per scheme and field | Statutory desk | Not verified — §20 |
| `gratuity_payment_ceiling` | The CoSS s.53(3) notified ceiling | Statutory desk | No notification located — §20 V-21 |
| `gratuity_tax_exemption_limit` | The income-tax exemption on gratuity | Statutory desk | Provision and limit not in evidence — §20 |
| `gratuity_provision_method` | The accounting provision method | Tenant, with its auditor | Accounting policy, not statute |
| `maternity.weeks_standard`, `maternity.weeks_reduced`, `maternity.esi_displacement_rule` | Maternity entitlement, reduced entitlement, ESI routing | Statutory desk (§07 owns the names) | Pending Code text — §20 |
| `maternity_qualifying_days`, `maternity_prenatal_weeks_max`, `maternity_benefit_wage_basis` | Qualifying service, pre-delivery portion, benefit wage base | Statutory desk | Not verified — §20 |
| `ot_quarterly_ceiling_hours` | The reported quarterly OT ceiling — warn only | Statutory desk (§09 owns the name) | **[Hypothesis]** — §20 V-17 |
| `pt.<state>.slabs` (Tamil Nadu here), `lwf.<state>.employee`, `lwf.<state>.employer`, `lwf.<state>.periodicity` | Tamil Nadu PT; LWF per state (§06 owns the names) | Statutory desk | Not in evidence — §20 V-09 — except Karnataka's LWF periodicity, once a year due 15 January (§06.8) |
| `tds.standard_deduction.new` | The new-regime standard deduction for Tax Year 2026-27 (§08 owns the name) | Statutory desk | Not verified — §20 V-20 |
| `tds_control_statement_form` | The control statement's 2026-Rules form label | Statutory desk | Not in the CBDT mapping held — §20 |
| `it.fvu_upload_signature` | Whether the `.fvu` upload needs the signatory's DSC or EVC (US-V18) | Operations (§22 owns it) | Unknown until captured in a Mode B session — §22.4.3 |
| `pt.<state>.due_day` | A state's PT return due day where the state fixes one (§06 owns the name) | Statutory desk | Not captured for most states; renders "unconfirmed" — §06.11, §20 V-09 |
| `annual_leave_accrual_ratio`, `leave_carry_forward_cap`, `leave_encashment_day_rate` | Leave accrual, carry-forward, encashment day-rate | Statutory desk for the Code values; tenant for policy above them | Not verified — §20 |
| `wages.final_settlement_working_days` | Any s.17(3) limit replacing two working days | Statutory desk, per jurisdiction (§08) | Per state |
| `bonus.payment_deadline` | The Code-era statutory bonus payment deadline | Statutory desk (§08 owns the name) | Unresolved for Code-era years — §06.7, §20 |
| `rpwd_response_target_days` | The employer's internal Rule 3(2) response target | Tenant (§10 owns the name) | Not a statutory deadline |
| `pay_group.attendance_cutoff`, `pay_group.planned_pay_date` | The attendance cut-off; the planned pay date, bounded by CoW s.17(1) | Tenant | Configuration |
| `calendar.alert_lead_days` | Alert lead time per obligation | Tenant | Configuration |
| `task.reminder_cadence_days` | How often an open work item reminds its holder (§03.1a) | Tenant | Configuration |
| `task.unheld_escalation_days` | How long an item may sit with no holder before it escalates to the tenant owner (§03.1a routing rule 8) | Tenant | Configuration |
| `role.vacancy_grace_days` | How often the tenant owner is re-alerted while a payroll role stands vacant (§03.6b) | Tenant | Configuration |
| `signoff.reminder_hours` | Reminder after an artefact is presented | Tenant | Configuration |
| `fnf.escalation_lead_working_days` | Escalation ahead of the final-wages due date | Tenant | Configuration |
| `lop_reversal_lookback_months` | How far back an LOP reversal may reach | Tenant | Configuration; incumbent precedent 1–12 (r3/02) |
| `shadow_run.agreed_months_target` | Agreed parallel months before retiring the shadow Excel | Tenant | Configuration; shown, never enforced |
| `declarations.proof_window_open`, `declarations.proof_lock_date` | The proof window | Tenant | Configuration; incumbent guidance opens it in December (r3/02) |
| `ops.instruction_wait_minutes` | How long a session waits for the named approver before handing back | Operations (§22 owns it) | Configuration |
| `vernacular.language_set` | Languages offered to employees | Tenant (§12 owns it) | Configuration |

#### Persona success measures as computable definitions

The success-criteria tables above state targets; these definitions say how each is computed, so that §19 can adopt them without re-interpretation. No target is changed here. Every numeric target in those tables is a design intent at **[Hypothesis]** confidence — none rests on a measured baseline, because r3/02 found no quantitative evidence on close duration, query volume or error rate (§03.11) — so none is a commitment. The committed targets are §19.12's, set per phase once pilots report; where the two differ, §19.12 governs.

| Persona and criterion | Numerator | Denominator | Source events |
| --- | --- | --- | --- |
| Meera — onboarding cycle time | Minutes from intake start to "ready for first payroll", per joiner | — (median per tenant-month) | Onboarding task events (§07) |
| Meera — zero manual re-keying | Input edits after M2 that were not queued adjustments | Payroll months | FR-PAY-301 transitions; FR-PAY-302 adjustments |
| Meera — statutory dates missed | Filing instances past due and not FILED | Filing instances due | `filing.*` (§19.11.1) |
| Meera — payslip escalations to the founder | Payslip queries routed to the approver | Payslips published | Ticket routing events |
| Meera — employee self-serve rate | Leave, balance and payslip queries resolved in ESS or by the assistant without a human | All such queries | `ai.deflected` and ticket events (§19.8.3.1) |
| Suresh — run-to-bank reconciliation | Payroll months whose bank-file total equals net and whose returned credits are all resolved | Payroll months DISBURSED | FR-PAY-903 status events |
| Suresh — time to answer "how derived" | Minutes from opening a figure's drill-down to exporting its derivation (US-S09) | — (median) | Derivation-export events |
| Anjali — new-client onboarding time | Days from the client's grant to its first filing instance FILED (Z1–Z7) | — (median per CA) | `statutory_code.linked`, `first_filing.accepted` |
| Anjali — statutory update lag | Hours from a rule version's publish (§22.8.8) to its impact list reaching every affected client (US-A03) | — (maximum per rule version) | `statutory_rule.effective` and impact-list events |
| Ravi — leave decision latency | Working hours from request to decision | — (median) | MSS decision events (§07.5.2) |
| Suresh — first-upload acceptance | Instances reaching ACCEPTED with no REJECTED transition | Instances SUBMITTED | `filing.submitted`, `filing.rejected`, `filing.accepted` |
| Suresh — shadow-Excel retirement | Consecutive months agreed at ₹0.00 per employee and head (US-S10) | — | Shadow-comparison results |
| Anjali — roster-wide missed filings | Client instances past due and not FILED | Client instances due | `filing.*` across the CA's grants |
| Ravi — missing-punch resolution | Regularisations resolved before M2 | Regularisations raised for the month | §09 regularisation events |
| Ravi — escalation-free payslips | Payslips with no query escalated to a human | Payslips published | `ai.deflected` and ticket events (§19.8.3.1) |
| Vikram — in-product approval | Payroll months decided through `signoff.decided` | Payroll months LOCKED | `signoff.*` (§03.6a) |
| Vikram — founder time on payroll | Approver sittings and minutes to decision per month | — | `signoff.presented`, `signoff.decided` |
| Vikram — statutory notices | Penalty events | Tenant-months | `penalty.*` (§19.11.1) |
| Vikram — board-ready liability view | Months whose gratuity and leave-encashment lines refreshed after lock with no unset parameter (US-V09) | Months LOCKED | Accrual refresh events |

---

*Section 03 status: personas and JTBD are a design instrument at **[Hypothesis]** confidence; statutory triggers, ceilings, and register/format requirements are **[Verified]** where marked and inherited from §06 or the evidence register with inline source cues; every statutory figure not in the evidence is a named parameter routed to §20. The CA-as-channel persona (P3) is the highest-leverage and highest-risk bet in the section and is gated on §20 V-01 and V-05. The user stories, the work item (§03.1a), the joiner intake (§03.2a), the approver's sign-off artefact (§03.6a), continuity when a role empties (§03.6b), the month in the life (§03.8a) and the acceptance scenarios (§03.13) are specification built on the corrected lifecycle (EV-036–EV-039) and on other sections' FRs, which they cite rather than restate. No number or quote here enters a model or deck until its validation row in §03.11 clears.*
