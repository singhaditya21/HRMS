## 08. Functional Requirements — Payroll & Statutory Filing Engine

This section specifies **what the payroll and statutory-filing engine must do**. It is
the functional companion to §06 (the statutory compliance spine, which specifies the
*rules* — every rate, slab, ceiling, penalty and cadence) and §05.5 (the module
sequencing, which specifies *when* each capability ships). §06 answers "what does the
law require"; this section answers "what does the software do about it, step by step,
and how do we know it is correct." Every rate/slab reference resolves to §06, and every
§06 rule carries its own gazette/notification provenance; the source cues repeated here
are the load-bearing ones an engineer reads while building the FR.

Two framing rules govern everything below and are not restated per-FR:

- **Rules-first, LLM-last (§12.1, [Verified]).** No statutory or monetary figure in this
  engine is ever model-generated. Every FR here is a specification for a deterministic,
  effective-dated, retrospectively-recomputable rule. The assistant explains, drafts and
  routes; it never computes a number that lands on a payslip, a challan or a return.
  (Source: §12.1 design principle P1, [Verified].)
- **The filing, not the payslip, is the unit of delivery (§01, §04.1, [Verified]).** The
  headline acceptance metric for this engine is not "payslip generated" but "return
  filed on time and accepted." Payslip generation is a byproduct of a correct pay run;
  the pay run exists to feed ECR, ESI, PT, Form 138, the Form 130 inputs and the bonus
  return. (Source: §01 thesis; §04.1 ICAI fee schedule prices filings, not payroll
  processing, [Verified].) **What "delivery" means is fixed by K-13:** every statutory
  surface is an attended portal — EPFO's interactive login with CAPTCHA, the TDS
  statement that the deductor validates through the FVU utility and uploads, ESIC's
  template upload, and one manual portal per PT state. The engine's deliverable is a
  **portal-accepted artefact plus attended, assisted filing under the employer's written
  authority to act**; the employer's and deductor's statutory liability is
  non-delegable and stays with the customer. No vendor in the six-vendor set claims to
  submit any filing (EV-030; published material as of September 2026), which is why
  attended submission is a real differentiator rather than a promise of automation. The
  runbooks are §22; the legality of acting on portals under employer credentials is
  under counsel review (§23.13, Part D-17).

**Numbering.** Requirements are numbered `FR-PAY-###` within functional groups
(100s = compensation, 200s = statutory computation, 300s = pay-run lifecycle, and so
on). Each FR carries a **phase tag** (P0 / P1 / P2, per §05.5), a one-line statement,
detail, and **acceptance criteria** (AC) that are testable. Confidence markers appear
where a claim's status is load-bearing; every **[Hypothesis]** carries a
kill/validation criterion inline. Subsections suffixed "-A" and "-B" (§08.2-A, §08.4-A,
§08.4-B, §08.8-A, §08.11-A, §08.12-A) were added in v1.0 without renumbering, so every
reference to §08.1–§08.13 elsewhere in this PRD still points where it did. New
requirement IDs continue each functional group from its own maximum, so the groups stay
readable: 100s compensation, 200s statutory computation, 300s lifecycle, 400s arrears,
500s reimbursements, 600s payslips, 700s returns, 800s exit, 900s payments, 1000s
controls.

<!-- DIAGRAM: journey-run-payroll -->

---

### 08.1 Engine principles and the data spine every FR reads from

Before the numbered requirements, seven architectural invariants. These are not
negotiable per-feature; every FR below assumes them and several would be incorrect
without them. I1–I5 restate §06.12 R1–R3 and R7 as engine invariants; I6 and I7 are
the engine-purity and fixed-point corrections (Part E-3, E-4), shared with §15.

| # | Invariant | Why it is an invariant, not a feature | Source |
| --- | --- | --- | --- |
| I1 | **Multiple concurrent wage bases per employee per period** — the PF/gratuity add-back base, the ESI gross base, the capped bonus base, and the payment-of-wages base coexist on one payslip | The 50% add-back creates a PF base that excludes HRA/conveyance/overtime; ESI is computed on gross which *includes* them; bonus is capped at the notified amount or the minimum wage, whichever is higher (legacy notified amount ₹7,000; the Code-era amount is per appropriate Government and unconfirmed, §06.7). A single "wage" field is a design error. | §06.10, §06.3, §06.7 [Verified]; (Source: Code on Wages s.2(y) / CoSS s.2(88); Code on Wages s.26(2)) |
| I2 | **Every rate, slab and definition is effective-dated and versioned** — 12% PF, the 50% add-back percentage, PT/LWF slabs, TDS regime parameters, bonus ceilings, wage ceilings | The statute makes 50% "or such other per cent as may be notified" — a standing variable. The same holds for the ₹15,000 PF ceiling and ₹21,000 ESI ceiling. | §06.10, §06.2, §06.3, §06.7 [Verified] |
| I3 | **Retrospective recompute against the period's rule version** — arrears and retro runs recompute using the rule that was in force *for the period being corrected*, never the rule in force today | A March correction filed in September must use March's slabs, not September's. | §06.10 [Verified]; §06.14 TV12 |
| I4 | **Deterministic, replayable pay run** — given the same input snapshot, rule versions and evaluation context (I6), a pay run reproduces byte-identical figures; every figure traces to (input × rule-version × formula). **Replay is scoped by entity class (K-24):** the run's input snapshot and the bitemporal classes — rules, salary structures, assignments, statutory attributes — are retained and replayable; the erasable classes — punches, rendered documents, biometric templates, consent artefacts — are never evaluation inputs, so erasing one never changes a replayed figure (a payslip PDF erased under its retention class is re-rendered from the snapshot and marked as a re-rendering). The erasure mechanism is §14's. | A wrong payroll number is a legal problem; auditability is the defence. | §12.1 [Verified]; Part E-2 |
| I5 | **Immutable audit trail on every monetary field** — who changed what, when, from what value, under what authority, with the rule version applied | Required for the six employer registers plus the wage slip (EV-053), retained per each rule-set's own wording rather than a flat five years (EV-054), for CA read-only audit, and for dispute defence. | §06.9, §06.12 R10, §16 [Verified — central sphere] |
| I6 | **Engine purity** — evaluation is a pure function of **(input snapshot, rule-set version, evaluation context)**: no I/O, no clock, no database read inside evaluation. The evaluation context is enumerated and closed: **disbursal date**, **as-of decision time**, **jurisdiction set**, **tax-regime election** (FR-PAY-210) | PF liability on arrears dates from the disbursal date (Part E-9), and the Form 138 deductee date of payment must fall inside the quarter and tax year being filed (r5/02 finding 32) — both keyed to external, later-known facts. Without an explicit context the "pure" engine would read them from the clock or the database and replay would break. | Part E-3; §15 |
| I7 | **Bounded fixed-point nodes are permitted in the calculation graph** — a node may iterate to convergence under a maximum iteration count and a tolerance; a topological one-pass DAG is not assumed (FR-PAY-211) | The s.2(y) 50% add-back re-bases components that feed its own test, and net-of-tax gross-up is fixed-point by construction. A one-pass engine publishes a first iterate as the answer. | Part E-4; §06.10; §15 |

The engine reads from a single employee-period fact set. Each fact is stamped with the
effective-dated rule version that produced it, so the same run can be **replayed** for
audit or **recomputed** for retro without re-deriving today's rules.

<!-- DIAGRAM: payroll-data-spine -->

---

### 08.2 Compensation and CTC structures

The compensation model is where the two-wage-base problem originates, so it is P0 and
must be right before any statutory computation is meaningful.

**FR-PAY-101 · CTC structure builder** · **P0**
The engine shall let an admin define one or more **salary structures** as an ordered
set of **pay components**, each with a type (earning / deduction / reimbursement /
statutory / employer-cost), a calculation basis (fixed / percentage-of-basic /
percentage-of-CTC / slab / formula / balance-figure), a taxability treatment, and
per-component flags for PF-wage inclusion, ESI-wage inclusion, gratuity-wage inclusion,
bonus-wage inclusion, and payment-of-wages inclusion.
- *Detail.* A structure is a template; an employee is assigned a structure with
  component values (or the structure computes them from CTC). The "special allowance"
  as a **balance figure** (CTC minus the sum of all other annual components) is a
  required component type — it is how virtually every Indian offer letter closes CTC.
  The **five wage-base flags** (not one taxability flag) are what make I1 executable —
  the same "conveyance" component is excluded from PF but included in ESI gross and
  payment-of-wages. Special allowance is **wages**, not an excluded head, so its default
  flags include the PF and gratuity bases (§06.10); a balance figure that closes a CTC
  carrying a wage-linked employer cost creates a loop the engine resolves as a bounded
  fixed point (FR-PAY-211).
- **AC-101.1** — Creating a component with `pf_wage=true, esi_wage=false` and another
  with `pf_wage=false, esi_wage=true` yields two different bases for the same employee,
  verifiable on the payslip breakdown.
- **AC-101.2** — A structure whose components do not sum to CTC is rejected with the
  exact rupee gap named, unless a balance-figure component is present to absorb it.
- **AC-101.3** — Assigning a structure to an employee with a stated annual CTC produces
  monthly component values whose 12× sum equals CTC to the rupee (rounding rule
  configurable; default: round each monthly component, reconcile the residue into the
  balance-figure component in the final month — see FR-PAY-209).
- **AC-101.4** — A component with **no wage-base flags set at all** is a blocking
  validation error (FR-PAY-1004), because a silently un-flagged component would drop out
  of every statutory base and file a wrong return.

**FR-PAY-102 · Employer-cost components inside CTC** · **P0**
The engine shall model **employer statutory contributions and other employer costs
(employer EPF, EPS, EDLI, EPF/EDLI admin charges, employer ESI, gratuity accrual,
employer LWF, statutory-bonus accrual, group-insurance premia) as CTC components** that
appear in the CTC build but **not** in gross earnings and **not** in net pay.
- *Detail.* Indian CTC is cost-to-company, so employer PF (₹1,800 typical), the ₹1,250
  EPS cap allocation, EDLI, admin charges and gratuity accrual are all part of the
  ₹X CTC the employee was quoted, but none of them are paid to the employee. The engine
  must present CTC, gross, and net as three distinct totals that reconcile.
- **AC-102.1** — For an employee on ₹15,000 PF wages contributing on the ceiling, the
  CTC view shows employer EPF ₹550, EPS ₹1,250, EDLI ₹75, EPF admin ₹75 as employer
  cost (the §06.2 worked example: the 1,800 / 1,250 / 550 split is EPFO's own Help File
  fixture, EV-035; EDLI 0.50% per EPFO's EDLI page; the 0.50% admin rate rests on
  pre-Code EPFO circulars, is **[Hypothesis]** and is applied with the establishment
  minimum `epf.admin_charge.minimum`, §06.13), none of which appear in gross or net.
- **AC-102.2** — `CTC = gross earnings (annual) + total employer statutory cost + other
  employer cost` holds to the rupee for every employee.

**FR-PAY-103 · Effective-dated compensation revisions** · **P0**
The engine shall store every compensation change (increment, promotion, structure
change) as an **effective-dated revision**, never an overwrite, and shall support a
revision **effective in a past period** (the trigger for arrears — FR-PAY-401).
- **AC-103.1** — A ₹60,000→₹70,000 monthly revision effective 1 April, entered in July,
  is stored with effective date 1 April and flags April–June as requiring arrears.
- **AC-103.2** — Querying an employee's compensation "as of" any historical date returns
  the value in force on that date, not the current value (supports I3, retro recompute).

**FR-PAY-104 · Proration** · **P0**
The engine shall prorate earnings for **partial-period employment** (mid-period join,
exit, unpaid leave, mid-period structure change) on a configurable per-pay-group basis:
**fixed 30-day** (salary ÷ 30), **calendar days in the month**, or
**pay-for-actual-attendance** — the three day-rate conventions practitioners use.
- *Detail.* The proration basis is a tenant/pay-group policy, not a global constant.
  No single national convention exists and the choice is a recurring source of
  disputes (r3/02 finding 6 — **[low]** confidence, practitioner-forum evidence read
  second-hand); the conventions give different results, so the one applied is printed
  on the payslip and reflected in the payment-of-wages register. LOP (loss of pay) days
  from attendance/leave (§09) reduce the paid-day count. **[Hypothesis]** — the ESI
  coverage test for a mid-month joiner reads the contracted monthly wage, not the
  prorated figure, so a part-month gross **below** ₹21,000 does not by itself pull an
  otherwise-out employee into ESI. §06.3 does not state the part-month rule; **kill
  criterion: confirm against ESIC's wage and coverage guidance before this drives a
  coverage decision (§20).**
- **AC-104.1** — An employee joining on the 16th of a 30-day month on ₹60,000/month, on
  calendar-day basis, earns ₹60,000 × 15/30 = ₹30,000 gross for the month (worked in
  full at §08.12, Example B), and PF/ESI/PT are computed on the **prorated** base per
  §06, not the full base.
- **AC-104.2** — Changing the proration basis for a tenant does not retroactively alter
  already-finalised pay runs; it applies from the next open period (effective-dated).

**FR-PAY-105 · Multi-establishment awareness** · **P2**
The engine shall support employees assigned to different **establishments** (PF/ESI
codes, PT/LWF states) within one tenant, computing each employee's statutory
obligations against **their establishment's** registrations and the PT/LWF rules of
**their assignment's work location**.
- *Detail.* Deferred to P2 (§05.5 item 22) because the single-site beachhead does not
  need it — but every employee-period must resolve `establishment_id` and its
  jurisdiction from v1 so the P2 build is additive, not a migration. Jurisdiction sits on
  the **work location** — state, sphere (central/state) and the applicable Code-regime
  commencement date — never on the employee record (Part E-5, §14); it enters
  evaluation as the jurisdiction set in the evaluation context (FR-PAY-210).
  **Split per §05.17 PR-05.** Group-entity payroll operations stay P2 (§05.5 item 22).
  Per-employee jurisdiction resolution for PT and LWF computation — AC-105.1's
  behaviour — ships in R1 wherever two or more of a tenant's states have a published
  PT or LWF row (§05 fences F-06, F-07); a state without one is refused, never
  defaulted (§05 C-16).
- **AC-105.1** — [R1 once both states' rows are published — PR-05] Two employees in
  the same tenant, one in Karnataka and one in Maharashtra, receive PT computed on
  Karnataka and Maharashtra slabs respectively in the same pay run.
- **AC-105.2** — [P2] An employee whose assignment moves between two EPF registrations
  inside a wage month keeps one ECR line for the month, on the registration named by
  `epf.transfer_month_rule` — the registration at the month's start or at its end —
  because how EPFO takes a mid-month move between establishments is not captured; the
  rule ships unset, a mid-month move raises a configuration task (class K2), and PT and
  LWF follow their own `pt.<state>.transfer_month_rule` and
  `lwf.<state>.transfer_month_rule` (§20.13).

**FR-PAY-106 · Perquisite valuation** · **P1**
The engine shall value **taxable perquisites** by the valuation rule in force for each
applicable head and feed the taxable value into the TDS base (FR-PAY-205), storing the
valuation basis so it is auditable and effective-dated.
- *Detail.* The common heads and their valuation method (1961-Act s.17(2) and 1962-Rules
  Rule 3 — v0.3's citations, carried, not re-captured in any research round; the
  valuation rules for Tax Year 2026-27 sit in the Income-tax Rules 2026 and are routed
  to §20 with the other perquisite items; the per-head valuation catalogue is §11's, and
  this FR consumes it): **rent-free / concessional accommodation** —
  a percentage of salary by city-population band, held as `perq.accommodation.slabs`
  (v0.3's slab percentages and the notification it cited are carried, not re-captured,
  **[Hypothesis]**); **motor car** — a per-month value by engine-capacity band plus a
  driver value, held as `perq.car.value.<band>` and `perq.car.driver_value`, with **no
  shipped default**: v0.3's figures are carried, not re-captured, and a reported
  revision for Tax Year 2026-27 was retracted in r1 because its only source cited no
  notification — yet the meal figure in that same reported table was later
  corroborated (r2/02, EV-019) — so the current values are unknown and v0.3's must not
  ship as a default; **interest-free/concessional loan**
  — a benchmark rate on the maximum monthly outstanding, with a small-aggregate and a
  medical-loan exemption, held as `perq.loan.benchmark_rate` and
  `perq.loan.exempt_aggregate` (**[Hypothesis]**); **ESOP** — perquisite = FMV on the
  exercise date minus the exercise price, with the eligible-startup TDS deferral under
  1961-Act s.192(1C) whose trigger events and window are held as `tds.esop_deferral.*`
  (carried, not re-captured, **[Hypothesis]**); **meal and gift vouchers** at the
  01.04.2026 thresholds (₹200 per meal; ₹15,000 per year for gifts — EV-019,
  **[Hypothesis]**, §20 V-18; §06.5, §11), with the meal exemption **conditional**
  (K-19): meals provided during working hours at office or factory premises, or
  non-transferable vouchers usable only at eating outlets. The conditions are engine
  constraints, not a wallet limit — a meal benefit that fails them is valued as a fully
  taxable perquisite, because otherwise the payslip under-deducts and the demand plus
  interest lands on the employer. The rule citation is not stated here; it is routed to
  §20 validation (§06.13). The section and rule numbers in this FR are 1961-Act /
  1962-Rules numbering; their 2025-Act / 2026-Rules equivalents are unmapped and are
  carried as rule-version data under both labels (§06.12 R13, §06.13).
  Perquisite valuation is **rules-first** (I4) — no perquisite value is model-generated.
- **AC-106.1** — A ₹5,00,000 interest-free loan outstanding for a full year is valued at
  `perq.loan.benchmark_rate` on the maximum monthly outstanding and added to the TDS
  base; a loan whose aggregate is at or below `perq.loan.exempt_aggregate` adds nothing.
  With either parameter empty the valuation raises a configuration task instead of
  guessing.
- **AC-106.2** — An eligible-startup ESOP perquisite defers TDS under 1961-Act
  s.192(1C); the engine tracks the deferral clock and triggers the deduction on the
  earliest event configured in `tds.esop_deferral.*`, not on exercise.
- **AC-106.3** — Rent-free accommodation is valued on the **effective-dated** slab version
  of `perq.accommodation.slabs` in force for the period, so a retro recompute (I3) uses
  the period's slab, not today's.
- **AC-106.4** — A motor-car perquisite with `perq.car.*` unset for the period is not
  valued at zero and not valued at a guessed figure. The operator is asked to enter the
  value in force with its source, recorded on the rule version (the same pattern as the
  bonus ceiling, AC-208.4); until then it is a blocking validation (FR-PAY-1004),
  because an unvalued perquisite under-deducts TDS. The value is confirmed through §20.
- **AC-106.5** — **R1 posture (§05.17 PR-15).** Until perquisite valuation ships (§05
  C-38, R2), a design partner's taxable perquisite enters the TDS base only as an
  operator-entered value per head, with its source and the operator recorded on the
  period's rule version — AC-106.4's pattern applied to every perquisite head — so TDS
  is never under-deducted because the engine cannot yet value a perquisite. The Form
  123 statement stays fenced (§05 A-29, fence F-12).

**FR-PAY-107 · Worker classification and the contractor scope boundary** · **P0**
The engine shall carry a **worker class** on every payee — *employee* (salary under
s.392, ex-s.192; PF/ESI/PT/gratuity apply), *contractor/professional* (1961-Act
s.194C/194J, whose 2025-Act equivalents are unmapped, §06.13; **no** salary statutory
heads), or *gig/platform worker* — and route each to the correct TDS section and
statutory obligation set, refusing to silently treat a contractor as an employee or
vice versa.
- *Detail.* Misclassification is the most common source of a wrong return: a consultant
  paid via payroll and put through the salary section (s.392, ex-s.192) + PF is a filed
  error, and an employee paid as a "contractor" to dodge PF is a liability the engine
  should flag, not enable. Contractor
  payments are **out of the salary engine's statutory scope** but in scope for TDS routing,
  at the rates held as `tds.contractor_rates.<section>` (v0.3's 1961-Act s.194C/194J
  rates are carried, not re-captured, and the 2025-Act sections are unmapped — routed to
  §20). The **Code on Social Security 2020 s.114** makes aggregators engaging gig and
  platform workers contribute between 1% and 2% of annual turnover, capped at 5% of the
  amount paid or payable to those workers (MoLE handbook, r3/04 finding 20) —
  **[Hypothesis]** for the operative scheme, the rate the Government actually fixes
  inside that band and the collection mechanism, none of which is captured. **Kill/validation
  criterion: build the `gig` worker class and a placeholder aggregator-contribution hook,
  but leave the rate and scheme `blocked-pending-notification` and escalated until the
  scheme is gazetted; do not compute a guessed contribution (§06.13, the same
  escalate-not-guess pattern as §20 V-08).**
- **AC-107.1** — A payee flagged *contractor* is deducted TDS under the contractor or
  professional-fee section (1961-Act s.194C/194J), not the salary section (s.392,
  ex-s.192), carries **no** PF/ESI/PT/gratuity, and appears on the Form 140 (ex-26Q)
  pipeline (EV-050; out of scope here), never on ECR/ESI.
- **AC-107.2** — An *employee* flagged with a contractor-style component set (no wage-base
  flags, no PF) trips the FR-PAY-1004 validation gate rather than filing a zero-PF ECR.

**FR-PAY-108 · The component catalogue** · **P0**
The engine shall ship a **seeded component catalogue** — one row per standard pay
component — carrying, for each component, its class, salary-TDS treatment, s.2(y)
head (which decides PF/gratuity wage membership and the 50% test), ESI
contribution-base membership, proration rule and rounding rule. A tenant component is
created by **cloning a catalogue row**, never from a blank form, so the five wage-base
flags of FR-PAY-101 are inherited with their source and only a recorded override can
change them. This is the table §06.10 commits §08 to: the nine in-scope s.2(y) heads
(a)–(i) are tagged here one by one.
- *Detail.* Each cell is rule data with a source and a status, not code (I2). Where no
  research round captured a treatment, the cell says **payload** — the tenant or our
  compliance analyst sets it on the component with a recorded source, and the
  component cannot be used in a run until that is done (the FR-PAY-1004 "no flags"
  block, AC-101.4). The **bonus base** follows the resolved s.2(y) wage and is then
  capped (FR-PAY-208); the **payment-of-wages base** is every earning paid in the wage
  period (FR-PAY-201) and is the base for the s.18(3) deduction cap (FR-PAY-403).
  Every ESI cell inherits §06.3's status: the separate coverage and contribution bases
  are verified, but the component-by-component list is carried, not re-captured, and
  is **[Hypothesis]** until ESIC's wages page is re-captured (§06.13). Rounding codes: **R0** — no component-level rounding, full internal precision until
  the statutory head is formed (AC-209.3); **RS** — the statutory head's own rule from
  the FR-PAY-209 table; **RW** — whole-rupee slab value.

| Component | Class | Salary-TDS treatment | s.2(y) head → PF / gratuity wage | ESI contribution base | Proration | Rounding |
| --- | --- | --- | --- | --- | --- | --- |
| Basic | Earning, fixed | Taxable salary | Wages — **in** | In (§06.3) | Pay-group day-rate convention (FR-PAY-104) | R0 |
| Dearness allowance | Earning, fixed | Taxable salary | Wages — **in** | In (§06.3) | Day-rate convention | R0 |
| Special allowance (balance figure) | Earning, fixed | Taxable salary | Wages — **in**; not an excluded head (§06.10) | In | Day-rate convention; closes CTC (FR-PAY-101) | R0; absorbs the CTC residue (AC-101.3) |
| House rent allowance | Earning, fixed | Taxable, less the old-regime exemption (AC-503.2) | Excluded — head (f) | In (§06.3) | Day-rate convention | R0 |
| Conveyance allowance | Earning, fixed | Taxable unless an exemption is configured (`tax.exemptions.conveyance`, payload) | Excluded — head (d) | In (§06.3) | Day-rate convention | R0 |
| Overtime | Earning, variable | Taxable salary | Excluded — head (h) | In for contribution, out of the coverage test — **[Hypothesis]**, TV5 | Not prorated; hours × a rate not less than twice the normal rate (Code on Wages s.14, §06.9) | R0 |
| Commission | Earning, variable | Taxable salary | Excluded — head (i) | In if paid at intervals not exceeding two months; out otherwise (§06.3, component list **[Hypothesis]**) | Not prorated | R0 |
| Other incentive (not commission) | Earning, variable | Taxable salary | **payload** — wages unless the payload classes it under a head | Interval test as for commission | Not prorated | R0 |
| Statutory bonus | Annual, statutory | Taxable in the year of receipt (§06.7) | Excluded — head (a) | Out — interval exceeds two months (§06.3, §06.7) | Not prorated; accrued monthly (FR-PAY-208) | R0 |
| Remuneration under an award, settlement or court order | Earning | Taxable salary | Excluded — head (g) | **payload** | Per the award | R0 |
| Special-expense sums (paid to defray expenses the job entails) | Earning or reimbursement | Exempt to the extent spent, if so configured (**payload**) | Excluded — head (e) | **payload** | Not prorated | R0 |
| House accommodation, light, water, medical attendance, other amenity | Perquisite, in kind | Valued per FR-PAY-106 / §11 | Excluded — head (b) | **payload** | Per valuation rule | R0 |
| Other remuneration in kind (meal and gift vouchers, car, loan) | Perquisite, in kind | Meal and gift: exempt only within EV-019 and the K-19 conditions (**[Hypothesis]**); others per FR-PAY-106 / §11 | In-kind value counted in wages up to 15% of total wages (s.2(88) Explanation, §06.10) — a separate, capped input | **payload** | Per valuation rule | R0 |
| Reimbursement against proof (fuel, telephone, books) | Reimbursement | Exempt within proof and limit; excess taxable (FR-PAY-502) | **payload** (head (e) only where it is a special-expense sum) | **payload** | Not prorated | R0 |
| Leave travel allowance | Reimbursement | Exempt against travel proof, old regime (FR-PAY-502; carried) | **payload** | **payload** | Not prorated | R0 |
| Arrears | Earning, derived | Treatment of the component in arrear; s.157(1) / Form 39 relief (AC-205.7) | Membership of the component in arrear; PF liability from the disbursal date (AC-401.2) | Membership of the component in arrear | Recomputed per past period (FR-PAY-401) | Per underlying component |
| Leave encashment — in service | Earning | Fully taxable (AC-801.4) | **payload** | **payload** | Days × the tenant's encashment base | R0 |
| Leave encashment — on exit | F&F earning | Exempt up to `tax.leave_encashment_exemption_ceiling` (AC-801.4) | **payload** | Out — encashment on discharge (§06.3, list **[Hypothesis]**) | F&F only | R0 |
| Gratuity payout | F&F earning | Exempt up to `tax.gratuity_exemption_ceiling` (FR-PAY-206) | Outside the test — head (j) | Out (§06.3) | F&F only; 15/26 formula | R0 |
| Retrenchment compensation | F&F earning | **payload** (`tax.exemptions.retrenchment`, carried) | Outside the test — head (k) | Out (§06.3) | F&F only | R0 |
| Employer PF, EPS, EDLI, EPF admin | Employer cost | Not the employee's salary, save the excess over `tax.retiral_aggregate_cap` (§11; carried, **[Hypothesis]**) | Excluded — head (c) | Out — not paid to the employee | Derived from the prorated PF base | RS |
| Employer NPS | Employer cost | Deduction within `tax.nps_employer_deduction_pct.<regime>`; counts toward `tax.retiral_aggregate_cap` (§11) | Excluded — head (c) | Out | Derived from its base | R0 |
| Employer ESI | Employer cost | Not the employee's salary | Not remuneration paid | — | Derived from the ESI base | RS |
| Gratuity accrual | Employer cost | Not the employee's salary until paid | Not remuneration paid; outside the test (Example G reading) | — | Monthly accrual on the uncapped gratuity wage | R0 |
| Employee PF and VPF | Deduction | Old-regime deduction under 80C / s.123 (carried); VPF above the statutory rate under Scheme para 29(2) (r5/02 finding 14) | — | — | Derived | RS |
| Employee ESI | Deduction | — | — | — | Derived | RS |
| Professional Tax | Deduction | Reduces taxable salary before TDS (FR-PAY-209 ordering) | — | — | Monthly slab on the month's earned wage, not day-prorated | RW |
| LWF (employee and employer) | Deduction / employer cost | — | — | — | Per state periodicity (FR-PAY-207) | RW |
| TDS | Deduction | — | — | — | Projection spread (FR-PAY-205) | RS |
| Advance, loan, asset recovery | Deduction, post-tax | Does not reduce the tax base (AC-403.1) | — | — | Instalment; within the s.18(3) cap | R0 |
| Notice-pay recovery or payment | F&F | **payload** | **payload** | **payload** | Days × the tenant's notice base | R0 |

- **AC-108.1** — Every seeded row carries, per cell, a source reference (a §06 entry,
  an EV ID, a research finding) or the literal status **payload**; a catalogue row with
  an unsourced non-payload cell fails the catalogue's own build check.
- **AC-108.2** — A tenant component cloned from "House rent allowance" is excluded from
  the PF/gratuity wage and counted in the (a)–(i) test under head (f) with no manual
  flag-setting; relabelling it "special allowance" without a recorded override does not
  move it (§06.10, TV6).
- **AC-108.3** — A component whose s.2(y) or ESI cell is **payload** cannot enter a run
  until the payload is set with a source; the attempt is the FR-PAY-1004 blocking item
  of AC-101.4, naming the cell.
- **AC-108.4** — Changing a catalogue cell is a new effective-dated rule version (I2);
  closed periods recompute against the version in force for them (I3), so a corrected
  classification produces arrears or a correction run, never a silent restatement.

**The catalogue row and the tenant component — data definition.** A catalogue row is
rule data owned by the compliance pipeline (§22.8); a tenant component is the tenant's
clone of one row version. §14.4.3 holds the `PayComponent` flags the clone carries;
this table adds what the catalogue and the clone need beyond them.

| Field | On | Values | Rule |
| --- | --- | --- | --- |
| `catalogue_row_id` | Row | Stable identifier | Never reused; a changed cell is a new version of the same row (AC-108.4) |
| `class` | Row | earning · deduction · reimbursement · perquisite · employer cost · F&F · derived | Fixes which cells may be set — an employer-cost row carries no salary-TDS treatment of its own |
| `s2y_head` | Row | wages · excluded head (a)–(i) · outside the test, (j) or (k) · not remuneration · **payload** | Decides PF and gratuity wage membership and the 50% test (§06.10) |
| `esi_membership` | Row | in · out · interval test · **payload** | "Interval test" is the commission rule: in if paid at intervals not exceeding two months (§06.3) |
| `tds_treatment` | Row | taxable salary · exempt within a named limit · perquisite valued under FR-PAY-106 · deduction under a named section · none · **payload** | Section names pass through the dual-vocabulary resolver (EV-050; §06.5) |
| `proration_rule` | Row | day-rate convention · not prorated · per valuation rule · F&F only · per past period | "Day-rate convention" means the pay group's (FR-PAY-109), never a row-level override |
| `rounding_code` | Row | R0 · RS · RW | FR-PAY-209 |
| `cell_source[]` | Row, per cell | A reference, or the literal **payload** | AC-108.1 |
| `effective_from`, `effective_to`, `decision_time` | Row version | Dates | Bitemporal rule data (I2; Part E-2) |
| `cloned_from`, `cloned_version` | Tenant component | Reference | The row version the clone inherits; a later version reaches it only through AC-108.5 |
| `override[]` | Tenant component | cell · new value · source · reason · set by · approved by · effective from | A cell differs from its row only through an override record |

- **AC-108.5** — When a catalogue row gains a new version, every tenant component
  cloned from it receives a change notice naming the cell, the old and new values and
  the effective date. A component with no override on that cell follows the new version
  from its effective date; a component with an override keeps it and is listed for
  review. Neither case restates a LOCKED month (AC-108.4).
- **AC-108.6** — An override without a source, or approved by the person who set it, is
  refused (the FR-PAY-304 pattern). A component for which no row fits is cloned from the
  generic row of its class — "Other incentive (not commission)" for an earning,
  "Reimbursement against proof" for a reimbursement, "Advance, loan, asset recovery"
  for a post-tax deduction — and its payload cells are set before first use (AC-108.3).
- **AC-108.7** — One report lists, per tenant, every component whose effective cells
  differ from its catalogue row, with the override records, so the compliance desk and
  the tenant's reviewer see every deviation in one place.

---

### 08.2-A Loss of pay and proration — the three day-rate conventions, specified

FR-PAY-104 names the three conventions practitioners use. This subsection specifies
them, so that one paid-day count becomes the same rupee figure on the payslip, in every
wage base and in the ECR line. The evidence for the list is thin — one practitioner
forum read second-hand (r3/02 finding 6, **[low]**) — so the conventions are data: a
pay group chooses one, and a design partner that uses a fourth is a new convention row,
not a code change. The list is validated with design partners through §20 before it is
described to customers as complete.

<!-- DIAGRAM: fr-payroll-lop-proration -->

**Inputs, per employee and wage month.** The engine reads counts; it never reads
punches (I4; §14.6.1a).

| Symbol | Count | Source |
| --- | --- | --- |
| D | Calendar days in the wage month | The calendar |
| X | Days outside employment — before the date of joining or after the date of leaving | The service record (§07), not `DayStatus` |
| P | Paid days — present, on duty, paid leave, and the paid half of a half-day | §09 FR-ATT-021 |
| L | LOP days — unpaid leave, unauthorised absence, and the unpaid half of a half-day | §09 FR-ATT-021 |
| W, H | Weekly offs and holidays inside employment | §09 FR-ATT-021 |

§09's invariant — paid days + LOP days + weekly offs + holidays = the calendar days of
the period (FR-ATT-021 AC2) — is read here over the days inside employment: P + L + W +
H = D − X. A month where it fails for any employee does not pass M2 (FR-PAY-310, hard
guard HG-2). U = L + X is the count of unpaid days.

**FR-PAY-109 · Day-rate conventions** · **P0**
The engine shall compute a component's earned amount for a wage month from its
contracted monthly amount, m, under the pay group's day-rate convention — chosen from
the table below when the pay group is created, and printed on every payslip
(FR-PAY-601) and in the payment-of-wages register.

| Convention | Earned amount | Divisor | Direction | What the choice fixes |
| --- | --- | --- | --- | --- |
| **C1 · Fixed 30** | m × (30 − U) ÷ 30, never below zero | 30, in every month | Deducts unpaid days from the full month | A day is worth the same in every month: a 31-day month with one LOP day pays 29/30, and a February with no LOP pays in full |
| **C2 · Calendar days** | m × (D − U) ÷ D | D | Deducts unpaid days | A day's worth varies by month; every day of the month, weekly offs included, carries pay |
| **C3 · Actual attendance** | The lower of m and m × B ÷ `pay.c3.divisor`, where B = P, plus W if `pay.c3.weekly_off_payable`, plus H if `pay.c3.holiday_payable` | `pay.c3.divisor` — 30 or D, set per pay group | Builds pay up from payable days | Fits daily-rated and deskless pay groups (§09.9); on a 30 divisor a monthly-rated employee with full attendance is under-paid in February (Example I) |

- *Detail.* No convention and no C3 option ships as a default: no national convention
  exists (r3/02 finding 6), the choice is a recurring source of disputes, and the
  conventions give different results in 31-day months and in February. A pay group
  cannot be created until its convention is chosen, and the choice is an
  effective-dated pay-group setting (AC-104.2). The cap in C3 — never more than the
  monthly amount — is a product rule, stated so that a 31-payable-day month on a 30
  divisor does not pay 31/30; a tenant that wants daily-rated pay above a monthly
  figure models the component as a daily rate, not a monthly one.
  **One proration, applied once.** The paid fraction is held as an exact ratio —
  numerator and denominator — and applied to each component's monthly amount; every
  wage base is then formed from the prorated components (FR-PAY-201) and is never
  prorated again. A stored day rate is never used: under C2 in a 31-day month,
  ₹60,000 ÷ 31 rounded to ₹1,935.48 and multiplied by 29 gives ₹56,128.92, eleven paise
  short of the exact ₹56,129.03 (RP1, FR-PAY-209).
- **AC-109.1** — Example I reproduces. For m = ₹60,000 and two LOP days, C1 pays
  ₹56,000.00 in every month; C2 pays ₹56,129.03 in a 31-day month, ₹56,000.00 in a
  30-day month and ₹55,714.29 in February 2027; C3 on a 30 divisor, with weekly offs
  and holidays payable, pays ₹58,000.00, ₹56,000.00 and ₹52,000.00.
- **AC-109.2** — The same attendance gives the same NCP-day count under every
  convention, because NCP days come from `DayStatus` (§09 FR-FIL-001), while the ECR
  wage fields differ by convention. The three lines in Example I, Part 2, are each a
  valid return; no check compares ECR field 4 with field 10 beyond §06.2's range test.
- **AC-109.3** — Under C1, unpaid days above 30 floor the earned amount at zero, never
  below; a month whose net would then be negative raises the negative-net block
  (FR-PAY-1004) instead of carrying a negative line.
- **AC-109.4** — A mid-month structure change splits the month at the change date.
  Under C2 each segment earns m_segment × (days in the segment − LOP days in it) ÷ D,
  and the segments sum to the month's C2 figure. Under C1 and C3 the segment arithmetic
  is not settled by any convention in the evidence — a 31-day month split in two cannot
  give each half a thirtieth-based share that sums to the month — so the pay group's
  `pay.split_month_method` decides it; it ships unset, and the first split month under
  C1 or C3 raises a configuration task (FR-PAY-1006).
- **AC-109.5** — The convention in force for a period is the one effective for that
  period; an arrears, LOP-reversal or catch-up recompute of a past month uses that
  month's convention, never today's (I3; AC-104.2).
- **AC-109.6** — The minimum-wage check reads the same paid-day count: the month's paid
  days at the daily minimum rate, against the month's earned wages, for the employee's
  skill category and work-location state (§06.9). The convention changes the earned
  figure, never the count the check reads, so a convention that pays less per day in a
  long month cannot hide a shortfall the paid days reveal.
- **AC-109.7** — A half-day LOP makes L fractional. Pay uses the fraction exactly, but
  ECR field 10 is a whole number (§06.2), so how a half day enters the NCP count is
  `ecr.ncp_fractional_rule`, which ships unset (class K2) and is routed to §20 V-23; the
  engine never rounds an NCP count silently.
- **AC-109.8** — An employee with no paid day in the month still gets a payslip, a line
  in the registers and the zero-wage ECR line §06.2 requires (§09 FR-FIL-002). A
  recovery due that month is carried forward, not taken, because half of nil wages is
  nil under the s.18(3) cap (FR-PAY-403).

**FR-PAY-110 · Attendance cycle, pay period and input cut-offs** · **P0**
The engine shall hold, per pay group, an effective-dated calendar that keeps the **pay
period** — always the calendar month, the wage month the ECR and the ESI contribution
use — separate from the **attendance cycle**, with a cut-off per input class:
attendance, variable pay, reimbursement claims and the declaration lock.
- *Detail.* Attendance and pay cycles usually differ — a 26th-to-25th attendance cycle
  against a calendar-month pay period is common — and a non-calendar wage period breaks
  three things: automated arrears, tax at the tax-year boundary, and PF and ESI, which
  run on calendar months (r3/02 finding 5, a practitioner write-up read in the r3
  capture, 2026). So the pay period never follows the attendance cycle. Where the two
  differ, LOP counted in the offset days — the 26th to the month's end, say — is
  applied in the next wage month's pay, and each LOP day carries two dates: the day it
  fell on and the wage month in which it was applied. Which wage month's NCP-day count
  a lagged day belongs to in the ECR is not captured in any research round. It is
  `ecr.ncp_attribution_offset`, with no default, routed to §20 V-23 with the other
  portal facts; a pay group with an offset cycle raises a configuration task until it
  is set.
- **AC-110.1** — A pay group on a 26th-to-25th cycle computes October 2026 pay from
  attendance for 26 September to 25 October; an LOP day on 27 September appears on the
  October payslip labelled with its date, and October's wage bases are formed from
  October's contracted amounts under the pay group's convention (FR-PAY-109).
- **AC-110.2** — Each input class has its own cut-off. An input arriving after its
  class's cut-off queues for the next wage month or opens a reopen request (FR-PAY-301
  M3), and the payslip labels a queued item with the month it relates to.
- **AC-110.3** — LOP from the offset days of March applied in April's pay changes a
  salary paid in the next tax year. The engine flags every such line; which tax year
  the adjustment belongs to follows §06.5's handling of salaries whose wage month and
  payment date fall in different tax years, which is routed to counsel (§23).
- **AC-110.4** — A change of attendance cycle never drops or double-counts a day. A pay
  group moving from a 26th-to-25th cycle to the calendar month from December 2026
  leaves 26–30 November in neither cycle, so December's attendance window runs from 26
  November to 31 December; the transition month shows the extended window and its
  reason on every payslip it touches.

**FR-PAY-111 · Attendance changed after processing — reprocess or defer** · **P0**
When a snapshot input's source changes after the month is PROCESSED and before it is
LOCKED — a regularisation approved, a leave cancelled, a late device batch — the engine
shall raise a decision for the payroll operator listing each affected employee and the
net-pay change reprocessing would make, and shall record the choice: reopen and
reprocess (FR-PAY-301 M3, M4), or defer the change to the next wage month as a labelled
adjustment.
- *Detail.* greytHR ships a banner for this case, telling the operator that attendance
  has changed and payroll must be reprocessed (r3/02 finding 3; product documentation
  read in the r3 capture, 2026, not executed). A silent divergence between the
  attendance record and the bank file is the defect; the recorded decision is the
  control. After LOCKED the only routes are a correction run or a next-month
  adjustment (AC-302.1).
- **AC-111.1** — The decision shows, per employee, the old and new paid-day counts
  under the convention, the net-pay change and the statutory heads that move; an
  employee whose change moves a PF or ESI figure is marked, because that figure reaches
  a return.
- **AC-111.2** — A deferred change enters the next wage month as an adjustment linked
  to the month it relates to, computed under that month's convention and rule versions
  (the FR-PAY-405 mechanism), never re-rated to the new month.
- **AC-111.3** — A month cannot be APPROVED while a reprocess-or-defer decision is open
  (FR-PAY-1004).

**The pay-group settings — data definition.** The tenant-policy settings this
subsection and its neighbours introduce live on the pay group, each effective-dated;
a change applies from the next open month (AC-104.2) and records its approver.

| Setting | Values | While unset | Introduced by |
| --- | --- | --- | --- |
| Pay period | The calendar month — fixed, never the attendance cycle | — | FR-PAY-110 |
| `attendance_cycle` | A start day and an end day; the calendar month is one choice | The pay group cannot be created | FR-PAY-110 |
| `cutoff.<input_class>` | A day per class — attendance, variable pay, reimbursement claims, declaration lock | The pay group cannot be created | FR-PAY-110 |
| `day_rate_convention` | C1, C2 or C3 | The pay group cannot be created (K1) | FR-PAY-109 |
| `pay.c3.divisor`, `pay.c3.weekly_off_payable`, `pay.c3.holiday_payable` | 30 or D; payable or not; payable or not | K1, for a C3 pay group | FR-PAY-109 |
| `pay.split_month_method` | The tenant's method for a split month under C1 or C3 | K1 on the first split month | AC-109.4 |
| `pay.lop_reversal_lookback_months` | 1 to 12 | K1 on the first reversal | FR-PAY-405 |
| `pay.net_rounding_carry` | Carried to the next month, or not | K1 | RP8 |
| `pay.hold_statutory_treatment` | The held month's lines stay in its returns, or are held as belated salary | K2 | FR-PAY-311 |

- **AC-111.4** — A pay group cannot be created while a setting marked "cannot be
  created" or K1 for its convention is unset, and the settings in force for any past
  month are the ones a recompute of that month uses (AC-109.5).

---

### 08.3 Statutory computation engine

This group **orchestrates** the deterministic rules specified in §06. It does not
re-specify rates; it specifies how the engine applies them, in what order, with what
edge-case handling. All rate/slab references point to §06, and the golden cases are
the full §06.14 vector set (TV1 onward — the set grows with §06, so no upper bound is
pinned here).

<!-- DIAGRAM: fr-payroll-wage-base-fanout -->


**FR-PAY-201 · Dual/triple wage-base resolver** · **P0**
For every employee-period the engine shall compute, as separate stored figures: the
**PF wage base** (with the 50% add-back applied per §06.10), the **ESI gross base**, the
**gratuity wage base**, the **bonus wage base**, and the **payment-of-wages base**.
- *Detail.* This is I1 made executable. The add-back logic (Source: Code on Wages
  s.2(y) / CoSS s.2(88)): sum excluded components; if they exceed 50% of total
  remuneration, add the excess back into the PF/gratuity base (worked at §06.10 and
  §08.12 Example D; golden cases §06.14 TV6/TV7).
- **AC-201.1** — For the §06.10 illustration (remuneration ₹1,00,000, excluded
  components 65%), the engine adds back ₹15,000 and reports a PF wage base of ₹50,000
  **before** the ₹15,000 statutory ceiling is applied — both figures visible (TV6).
- **AC-201.2** — For excluded components at 45% (below the half), **no** add-back is
  applied and the PF base is the wage components alone — Basic ₹55,000 in the §06.10
  counter-case (TV7) — the engine does not add back unnecessarily. Special allowance is
  never counted among the excluded heads (TV6).
- **AC-201.3** — All bases are independently auditable and each is stamped with the
  wage-definition rule version used.

**FR-PAY-202 · EPF computation** · **P0**
The engine shall compute employee EPF, the **three-way employer split (EPS capped at
₹1,250, balance to EPF), EDLI, EPF admin and EDLI admin** exactly per §06.2, honouring
per-employee **ceiling-vs-actual** election, the **excluded-employee** flag, and the
**EPS-closure rule** for high-earner first-joiners.
- *Detail.* The classic bug §06.2 warns of — applying 8.33% to actual wages above the
  ceiling instead of capping EPS at ₹1,250 — is an explicit negative test (TV1).
  (Source: EPFO EPF and EPS Scheme pages, 8.33% capped at 8.33% of ₹15,000 = ₹1,250, and
  EPFO's Help File fixture 1,800 / 1,250 / 550, EV-035; §06.2 [Verified].)
- **AC-202.1** — For an employee on actual PF wages ₹30,000 with employer opting for
  ceiling contribution: employee EPF and employer split both computed on ₹15,000; EPS =
  ₹1,250 (not 8.33% of ₹30,000 = ₹2,499), employer EPF = ₹550. This exact case is a
  regression test (TV1).
- **AC-202.2** — For an employee opting actual-wage contribution on ₹30,000: employee
  EPF = ₹3,600, EPS still capped at ₹1,250, employer EPF = ₹3,600 − ₹1,250 = ₹2,350.
- **AC-202.3** — An "excluded employee" (joined above ₹15,000, never a prior member) is
  computed with zero EPF unless voluntarily enrolled; the exclusion basis is recorded.
- **AC-202.4** — An employee who **first joined EPF on or after 01.09.2014 with PF wages
  above ₹15,000** is closed to EPS: the full 12% employer share goes to EPF and EPS = 0
  (TV2; Source: EPFO revamped-ECR FAQ Q8(a) and Q14 and circular para 8(iii), r5/02
  finding 11; FAQ Q6 for International Workers, finding 14; the legacy EPS paragraph and amendment date are carried, not re-captured,
  §06.2). EPFO's FAQ is inconsistent on the boundary day ("after" in Q8, "on or after" in
  Q14), so a member who first joined on exactly 01.09.2014 follows
  `epf.eps_closure_boundary_inclusive`, default "on or after" (TV17). Splitting EPS for
  such a member is a filed error — and one the portal will **not** catch: the revamped
  ECR only **flags** this case before filing, it does not reject it (EV-040). The
  engine, not EPFO, is the control.
- **AC-202.5** — Admin charges are computed on the correct minimum-per-establishment
  floor where applicable, not a bare percentage, and the EPF/EDLI admin rate is an
  effective-dated rule version (I2), so a re-notified admin rate is a config change.
- **AC-202.6** — A member who has attained **58** and is not marked for deferred pension
  is computed with **EPS = 0**, so the whole employer share falls to EPF under this FR's
  split rule. This is the **only** EPS rule the revamped ECR hard-blocks — the portal
  disallows the EPS component outright (EV-040) — so an engine that splits EPS here
  produces a return EPFO will not take. Whether EPS runs for the days before the
  58th birthday in the birthday month is not captured: it is `eps.age58_part_month`,
  with no shipped default; until it is set the birthday month raises a configuration
  task, and EPS never runs on days after the birthday (§06.2, TV58).
- **[Hypothesis / blocked]** — **AC-202.7** — EPF has a named successor in Scheme 2026,
  but the captured research names **no successor for EPS 1995 or EDLI 1976** when the
  one-year saving lapses around 21.11.2026 (§06.9, §06.13, §20 V-22). The ECR carries
  the EPS split in fields 5 and 8 and the EDLI base in field 6, and blocking the whole
  ECR would stop EPF remittance and start interest. The engine therefore computes those
  fields for post-cliff months per `epf.post_cliff_eps_edli_mode`, which ships with **no
  default** and is set with counsel before the November 2026 month locks (§06.9,
  §06.12 R41); the handling proposed to counsel is the last published rule versions,
  marked provisional at the verification gate (M10) and confirmed by the named approver
  before payment initiation — the last point at which a downward correction remains
  possible (EV-037). **Kill criterion: replace the mode with the successor's rules the
  day one is published, and recompute affected months as diffs (I3, FR-PAY-402).**

**FR-PAY-203 · ESI computation with contribution-period state machine** · **P0**
The engine shall compute ESI at the §06.3 rates (employee 0.75%, employer 3.25%; Source:
ESIC contribution page, rates w.e.f. 01.07.2019, §06.3 — the legacy ESI rule numbers are
unmapped to the Social Security (Central) Rules 2026, §06.13) on the gross base, apply
per-employee **rupee rounding**, handle the **low-wage employer-only** case, and
**hold an employee in ESI to the
contribution-period boundary** (Apr–Sep / Oct–Mar) after their gross crosses ₹21,000
mid-period.
- *Detail.* This is the ESI trap from §06.3: an employee crossing ₹21,000 in, say, July
  continues to contribute through September, then exits from October. Dropping them in
  July files a wrong return (TV3). Overtime is **excluded from the ₹21,000 coverage
  test** but **included in the contribution base** once covered (TV5) — a subtle routing
  the wage-base resolver (FR-PAY-201) must encode. The separate coverage and
  contribution bases are verified; the overtime split itself is carried, not
  re-captured, so TV5 is a **[Hypothesis]** vector and the split is held as rule data,
  re-baselined once ESIC's wages page is re-captured (§06.3, §06.13).
- **AC-203.1** — An employee at ₹20,000 in June who is revised to ₹23,000 effective July
  continues ESI (on the full ₹23,000 gross) for July, August, September; ESI stops from
  October (TV3).
- **AC-203.2** — Contributions are rounded per employee, per side, by
  `esi.rounding_rule`, and the rounding is reproducible. The parameter ships with **no
  default** (§06.12 R18): v0.3's "round up to the next rupee" is carried, not
  re-captured, **[Hypothesis]** until re-captured from ESIC's contribution page, and is
  entered as a sourced rule version, never assumed; until it is set, the ESI head raises
  a configuration task (§06.3, §06.13, TV37).
- **AC-203.3** — An employee whose **average daily wage is ≤ ₹176** has the **employee
  0.75% share waived** while the **employer 3.25% share is still charged** (TV4; Source:
  ESIC contribution page, r1 [Verified]; the legacy ESI (Central) Rules r.52 citation is
  carried and unmapped to the 2026 Rules, §06.13). Charging both or waiving both is a
  filed error. The divisor that turns a month's wage into an average daily wage is
  `esi.average_daily_wage_basis`, with no shipped default; until it is set, an employee
  within reach of the line raises a configuration task and neither share is silently
  waived (§06.3, TV38).
- **[Hypothesis / blocked]** — **AC-203.4** — ESI computation for periods **after the
  ~21 Nov 2026 one-year saving expires** depends on the unresolved successor instrument
  (§06.9, §06.13, §20 V-08). **Kill/gate criterion: if no successor is notified before the
  cliff, the engine never guesses a post-cliff regime.** Computation follows
  `esi.post_cliff_mode` — the tenant approver's decision, advised by counsel, with **no
  shipped default**, set before the November 2026 month locks — and the straddling
  November 2026 month splits per `esi.cliff_month_split`, also without a default (§06.9,
  §06.12 R41). With either unset, a configuration task is raised and **the pay run
  proceeds**; the ESI filing instances render `BLOCKED-pending-regime` (FR-PAY-710,
  FR-PAY-711; TV50). The mode is shown at the verification gate on every affected month.

**FR-PAY-204 · Professional Tax computation (per-state, effective-dated)** · **P0**
The engine shall deduct PT per the employee's **work-state** slab from the maintained
per-state PT table (§06.4), respecting gender variants, the **Article 276 ₹2,500/year
cap** (Source: Constitution of India, Art. 276; §06.4), and state-specific quirks (e.g.,
Maharashtra's and Karnataka's ₹300 February deduction; Source: state primary sources,
§06.4 [Verified]).
- *Detail.* PT follows place of employment, not residence — critical for remote/
  multi-state. Maharashtra and Odisha are verified at state primary sources; Karnataka's
  effect is verified but its instrument was not retrieved; every other state —
  Telangana's slab included — is unverified, and aggregator tables are disputed (§06.4,
  §06.13). The all-states PT table is a maintained-dataset build dependency, so v1 ships
  only states whose slabs are gazette-sourced, one design-partner state at a time
  (§05.5 item 5); all-states is P2 (§20 V-09). Neither Frappe HR nor TallyPrime ships a
  state PT slab table (EV-031 — Frappe's source repository read, not executed; EV-032 —
  TallyPrime's product documentation read, not executed; r3/r5 captures), so this table
  is differentiation, not parity.
- **AC-204.1** — A Maharashtra man with monthly salary above ₹10,000 is deducted ₹200 in
  each of the eleven months other than February and ₹300 in February, totalling exactly
  ₹2,500 for the year (TV10); from ₹7,500 to ₹10,000 the monthly figure is ₹175, and a
  woman is nil up to ₹25,000 (§06.4). ₹10,000 itself is ₹175, because the ₹200 band
  starts "above ₹10,000"; ₹7,500 sits inside both the nil and the ₹175 phrases, so it
  follows `pt.MH.band_boundary_rule`, with a configuration task while that is unset
  (§06.4, TV41). Karnataka's "₹25,000 or above" edge is unambiguous (TV40).
- **AC-204.2** — An employee in a state whose rule table records no PT levy has zero PT
  and no PT return is generated for that establishment. (Delhi, Haryana and Uttar
  Pradesh are listed as no-levy in §06.4, but the levy/no-levy list is **[Hypothesis]**
  until each state is verified against its own Act.)
- **AC-204.3** — Cumulative PT for any employee **in one state** never exceeds ₹2,500 in
  a financial year, even across multiple structures or mid-year revisions (Art. 276 cap
  enforced as a running annual ceiling per state, not a per-month rule). Across states
  the engine **flags and does not cap**: how the ceiling applies to one person in two
  levying states is not settled in any research round, so it is held as
  `pt.article276_cap_scope` (§06.4 decision table row 6, §20); a mid-year move computes
  each month on that month's work state, shows the outcomes, records the operator's
  choice and never holds pay (TV42, TV43).
- **[Hypothesis]** — **AC-204.4** — For a **fully-remote employee with no fixed work
  situs**, the engine applies the tenant's configured fallback (deduct at the
  registered-establishment state). **Kill criterion: replace the fallback with the
  verified state position once obtained (§06.13 open item); until then the conservative
  deduct-at-registered-state policy is flagged, not silently trusted.**
- **AC-204.5** — LOP can move a month's earned salary across a band edge. A Karnataka
  employee on ₹26,000 a month with two LOP days in October 2026 earns ₹24,322.58 under
  C2 (₹24,266.67 under C1) — below ₹25,000 — so October's PT is nil if the band test
  reads the month's earned salary, and ₹200 if it reads the contracted salary. The
  catalogue's reading is the earned salary (FR-PAY-108), held under §06.4's
  `pt.<state>.wage_basis`, which is not captured for any state; until it is set for the
  state, the engine computes both, applies the earned reading provisionally and raises
  a configuration task (FR-PAY-1006, class K2), which the approver confirms at VG-P1.
- **AC-204.6** — Maharashtra's year reaches ₹2,500 only through February's ₹300
  (AC-204.1). A man on more than ₹10,000 a month who leaves in January has paid ₹200 ×
  10 = ₹2,000 and never reaches a February. Whether the employer collects anything more
  at exit is not captured in any round; it is `pt.MH.exit_topup_rule`, which ships
  unset (class K2), and the F&F shows the ₹2,000 paid and the question, never a guessed
  ₹500.

**FR-PAY-205 · TDS u/s 392 (ex-s.192), dual-regime** · **P0**
The engine shall compute monthly TDS by projecting annual tax under **both the new
default regime (s.115BAC) and the old regime**, honour the employee's **election** (and
new-regime default if silent), spread the liability across remaining months, and
**true-up** on every declaration, revision or perquisite change.
- *Detail.* Per §06.5: new-regime slabs (FY2025-26 verified, ITD portal AY 2026-27
  tables, r1) and the standard deduction per regime, held as
  `tds.standard_deduction.<regime>` (v0.3's ₹75,000 new / ₹50,000 old are carried
  parameter values, **[Hypothesis]**) vs old-regime Chapter VI-A (80C → s.123 at
  ₹1,50,000; 80D → s.126, r3/02 finding 19); s.87A rebate (FY2025-26: nil tax up to
  ₹12,00,000 taxable under the new regime, rebate up to ₹60,000, with marginal relief
  just above; §06.5 [Verified]); the inoperative-PAN branch, counsel-gated and held as
  `tds.inoperative_pan_rule` (AC-205.3); previous-employer income and other TDS/TCS via
  Form 122 (ex-12B/12BAA) for mid-year joiners; NPS employer contribution under
  s.80CCD(2), whose per-regime cap is held as `tax.nps_employer_deduction_pct.<regime>`
  (the §11 parameter; v0.3's "10% of Basic+DA old regime, 14% new regime" is carried,
  not re-captured, **[Hypothesis]**, routed to §20). Surcharge — 10% (₹50 lakh–1 crore), 15% (₹1–2 crore),
  25% (₹2–5 crore) in both regimes, and above ₹5 crore 37% in the old regime while the
  new stays at 25% — and cess at 4% on tax plus surcharge sit on the projected liability,
  with **marginal relief** at each surcharge threshold and at the rebate edge (ITD portal
  AY 2026-27 surcharge table, r1; §06.5 [Verified]). Three edge mechanics the engine
  must own, not the employee: **s.192(2B)** other-income and other-TDS declaration (may
  *increase* salary TDS but a declared loss under "income from house property" is the only
  head that may *reduce* it — no other loss can); **s.192(1A)** where the employer *bears*
  the tax on a non-monetary perquisite instead of deducting it from the employee; and
  **s.89(1) relief via Form 10E** — s.157(1) via Form 39 from Tax Year 2026-27 — when
  arrears or advance salary bunch income into one year (CBDT form mapping 10E→39 and
  s.89→s.157(1), r5/02 findings 27–28; the legacy rule reference v0.3 cited is carried,
  not re-captured). The substance of the s.192(2B) and s.192(1A) mechanics, like the
  80CCD(2) cap, is carried from v0.3 and was not re-captured in any research round:
  each is built as rule data under its 1961-Act label and is **[Hypothesis]** until read
  against the Income-tax Act 2025 and Rules 2026 text (§20). **Dual vocabulary
  (EV-050).** Tax Year 2026-27 onward runs under the Income-tax Act 2025 (s.392, ex-s.192; Forms 122, 123, 124 for ex-12B,
  12BA, 12BB); FY 2025-26 and earlier keep the 1961-Act labels, corrections included.
  The provisions named in this FR without a verified 2025-Act mapping — s.115BAC, s.87A,
  s.206AA, s.206AB, s.80CCD(2) and the s.192 sub-sections — are held as rule-version
  data under their 1961-Act label with the successor field left unmapped (§06.13); the
  engine never guesses a 2025-Act section number.
- **AC-205.1** — For a given gross and declaration set, the engine reports the tax under
  **both** regimes and the monthly TDS under the elected one; switching the election
  inside `tds.regime_switch_window` (FR-PAY-503) re-projects the remaining months
  without altering already-deducted amounts, and a switch outside it is refused with the
  reason (worked at §08.12 Example F).
- **AC-205.2** — A mid-year salary revision (FR-PAY-103) re-projects annual tax and
  redistributes the delta across remaining months (no lump-sum in the revision month
  unless remaining months = 1).
- **AC-205.3** — An employee with an **inoperative PAN** is flagged before the quarter's
  statement, and the deduction branch reads `tds.inoperative_pan_rule`, which **ships
  dark** with no default: with the parameter empty the run raises a configuration task
  (TV11, a counsel-gated vector). The higher-rate consequence and the short-deduction
  exposure are real (r5 counsel review), but the rate and section are not captured in
  any research round; v0.3's "higher of the applicable rate or 20% under s.206AA" and
  "s.206AB does not reach salary" are carried, not re-captured, and are **not** built as
  law (§06.5, §06.13). The employee's pay is never blocked, and no product copy states
  the employer's exposure either way until counsel opines (§23).
- **AC-205.4** — Perquisite values feed the TDS base at their taxable portion. The meal
  benefit is exempt up to ₹200 per meal from 01.04.2026 **only** where the K-19
  conditions hold — meals during working hours at office or factory premises, or
  non-transferable vouchers usable only at eating outlets; a meal benefit whose
  configuration fails either condition is valued as fully taxable, not capped. The
  gift/voucher threshold (₹15,000 per year) is carried the same way. Both figures are
  EV-019, **[Hypothesis]** (dated secondary sources; gazette text not read), and are
  effective-dated values owned by §11; the rule citation is routed to §20 V-18
  (§06.13), not stated here.
- **AC-205.5** — A mid-year joiner's **previous-employer income and TDS** (Form 122,
  ex-12B/12BAA) are added to the projection so the annual liability is not
  under-deducted; if the employee
  declines to declare, the engine projects on current-employer income only and records
  the election.
- **[Hypothesis]** — **AC-205.6** — The **Tax Year 2026-27 slabs, rebate and surcharge
  parameters** are loaded as an effective-dated rule version. **Kill criterion: re-verify
  the Tax Year 2026-27 slabs, rebate ceiling and standard deduction against the rates
  in force for Tax Year 2026-27 (and any corrigendum) before the first Tax Year 2026-27 run — FY2025-26 is verified, the
  current year is pending (§06.13).**
- **AC-205.7** — When a run pays **arrears/advance salary** that bunches income into the
  year, the engine computes the arrears-relief figure — **s.89(1) / Form 10E** for
  FY 2025-26 and earlier, **s.157(1) / Form 39** from Tax Year 2026-27 (r5/02 finding
  27) — and generates a relief-ready worksheet (per-year re-spread of the arrears to the
  years they relate to), so the employee's TDS reflects the relief where they elect it.
  The relief is computed deterministically, never estimated by the assistant (Source:
  CBDT form mapping 10E→39, s.89→s.157(1), r5/02 finding 27; §06.14 TV14). Example C's
  ₹30,000 arrears is the trigger case.
- **AC-205.8** — An employee's **s.192(2B) declaration** of other income raises the TDS
  base; a declared **house-property loss** (e.g., self-occupied home-loan interest, old
  regime only, within the cap held as `tax.house_property_loss_cap` — v0.3's ₹2,00,000
  carried, **[Hypothesis]**) reduces it; **any other head's loss is ignored** for salary
  TDS. Declaring a business loss to cut salary TDS is rejected with the reason shown
  (Source: 1961-Act s.192(2B), proviso — carried, not re-captured, §20).
- **AC-205.9** — For a **non-monetary perquisite on which the employer elects to bear the
  tax (s.192(1A))**, the borne tax is **not grossed into the employee's income** and is
  **not deductible** as the employee's TDS; it is recorded as an employer cost
  (FR-PAY-102) and reported correctly in the Form 138 data from which TRACES builds
  Form 130 (EV-048) and on the perquisite statement, Form 123 (ex-12BA) (EV-050)
  (Source: 1961-Act s.192(1A) and the s.40(a)(v) treatment — v0.3's reading, carried,
  not re-captured, **[Hypothesis]** until read against the 2025 Act, §20; Form 123's
  field layout is itself not yet captured, §06.13).

**FR-PAY-206 · Gratuity accrual and payout** · **P0**
The engine shall maintain a **running gratuity accrual ledger** per eligible employee
(from the 10-employee latch, §06.1/§06.6) and compute the **payout** on exit using
`(15/26) × last-drawn wages × completed years`, the 6-month rounding, the 5-year
qualifying rule (not applied on death, disablement or fixed-term expiry, where payment is
pro rata), the ceiling on gratuity **payable**, and the **tax-exemption** ceiling — two
different numbers that never share a field. "Wages" is the CoSS s.2(88) wage with the
50% add-back (§06.10), not Basic + DA alone, for Code-era periods. (Source: CoSS
ss.53–56 [Verified] — the Payment of Gratuity Act is repealed; its s.4 and the other
legacy references are carried, not re-captured, §06.6. The payable ceiling is "such
amount as may be notified" under CoSS s.53(3) and is held as `gratuity.payable_ceiling`:
the familiar ₹20 lakh is a legacy of the repealed Act, **[Hypothesis]** until a
Code-era notification is located. The exemption ceiling is a lifetime, cross-employer
aggregate held as `tax.gratuity_exemption_ceiling` under 1961-Act s.10(10): v0.3's
₹20 lakh and the notification it cited are carried, not re-captured, **[Hypothesis]**,
and the 2025-Act equivalent is unmapped — §06.6, §06.13.)
- **AC-206.1** — For last-drawn wages ₹52,000 (Basic + DA, no other wage component)
  and 7 years 8 months service, payout =
  (15/26) × 52,000 × 8 = **₹2,40,000**, taxed per `tax.gratuity_exemption_ceiling`
  net of the exemption the employee declares as already used (§06.6 worked example reproduced as a
  test).
- **AC-206.2** — 6-month rounding runs **both directions** (TV8): 7y 8m → 8 completed
  years; 7y 4m → 7 completed years. Rounding the two the same direction is a defect.
- **AC-206.3** — An employee dying at 3 years' service receives gratuity (5-year rule
  waived); an employee resigning at 4 years 5 months does not qualify.
- **AC-206.4** — The accrual ledger value is queryable as-of any date for the books
  (AS 15 / Ind AS 19), independent of whether payout has occurred.
- **AC-206.5** — Continuous service is read from §09's continuous-service counter
  (FR-FIL-001 AC2), which counts the days CoSS s.54 treats as worked; the payroll
  engine never re-derives it from attendance, so the gratuity figure and the
  attendance record cannot disagree about a year.
- **AC-206.6** — The 26 in (15/26) is the statutory formula's, not a day-rate
  convention: a pay group on C1 or C2 (FR-PAY-109) still computes gratuity on (15/26) ×
  last-drawn wages, and no convention setting reaches this formula.

**FR-PAY-207 · LWF deduction** · **P0**
The engine shall deduct employee LWF and accrue employer LWF per the maintained
per-state LWF table (§06.8), on that state's **periodicity** (monthly / half-yearly /
annual).
- *Detail.* LWF rupee values and periodicity vary by state and are **not** yet verified
  per state (§06.8, §06.13 open item); no LWF rate or split has been verified from a
  government source in any state, and the only verified periodicity is Karnataka's
  calendar-year cycle due 15 January. **[Reversed]** An earlier draft cited "Frappe
  corroborates ~14 LWF states" and, with it, the conclusion that LWF earned no
  differentiation credit. Frappe HR v16 has no LWF at all (EV-031, source repository
  read, not executed) and TallyPrime has no LWF engine (EV-032, product documentation
  read, not executed; both r3/r5 captures, 2026), so a maintained LWF table is greenfield
  in both Frappe HR and TallyPrime (K-01).
- **AC-207.1** — A Karnataka employee is deducted the employee share, and the employer
  share accrued, once per calendar year for remittance by **15 January** — not monthly
  (§06.8, periodicity **[Verified]**; amounts **[Hypothesis]**). A half-yearly state is
  deducted only in its deduction months; Maharashtra's June and December cycle is the
  expected example but is **[Hypothesis]** until verified against the state Act (§06.8).
- **AC-207.2** — Employees in no-LWF states have zero LWF and no LWF remittance.
- **[Hypothesis]** — **AC-207.3** — The per-state LWF rupee values are loaded from the
  maintained table as `lwf.<state>.employee`, `lwf.<state>.employer` and
  `lwf.<state>.wage_threshold` — for Maharashtra and Karnataka the compilations disagree
  on the amounts themselves (§06.8), so no figure ships as a default. **Kill criterion:
  verify each state's rupee value and periodicity against that state's LWF Act before it
  drives a deduction (§06.13); an unverified value is flagged, not deducted silently.**

**FR-PAY-208 · Statutory bonus (Code on Wages s.26; legacy Payment of Bonus Act)** · **P0**
The engine shall compute **statutory bonus** for eligible employees, accrue it monthly,
and pay it on the annual cadence, using the correct eligibility ceiling, calculation
ceiling, and minimum/maximum percentages.
- *Detail.* The Payment of Bonus Act 1965 is subsumed by the Code on Wages (§06.7).
  Code on Wages s.26 fixes the percentages — minimum 8.33% of wages earned or ₹100,
  whichever is higher; maximum 20% — and delegates the calculation ceiling to "such
  amount per mensem, as determined by notification by the appropriate Government", or
  the minimum wage, whichever is higher **[Verified]**. The familiar figures are legacy:
  eligibility wage ≤ ₹21,000/month and calculation ceiling ₹7,000, the Payment of Bonus
  (Amendment) Act 2015 values per a law-firm note (r1, medium; the POB section
  references are carried, not re-captured); no Code-era re-notification, central or
  state, has been located **[Hypothesis]**. Eligibility also needs at least 30 working
  days in the accounting year (Code on Wages s.26(1), r1). The legacy payment deadline
  (within 8 months of the accounting year's close — **30 November** for April–March)
  and the legacy return (**Form D**, with registers maintained) rest on compliance
  blogs only (r1, low) and are unresolved for Code-era
  years, so both are named configurable parameters — `bonus.payment_deadline` and
  `bonus.annual_return_form` — never hard-coded, and routed to §20 (§06.7). The bonus
  wage base (I1) is the capped figure, **not** actual wages — TV9 is the golden case.
  A statutory bonus is **invisible to ECR/ESI** but **visible to Form 138** (§06.12
  R12) — the same rupee routes differently per return.
- **AC-208.1** — For an employee on ₹18,000/mo wages in a scheduled employment with
  minimum wage ₹10,000, the bonus base is **₹10,000** (not ₹18,000, not a flat ₹7,000)
  and bonus at the declared percentage is computed on ₹10,000 × 12 (TV9).
- **AC-208.2** — An employee on wages **above ₹21,000/mo** is **not eligible** for
  statutory bonus (the legacy eligibility ceiling; the Code-era ceiling is per the
  appropriate Government, AC-208.4); any ex-gratia paid instead is flagged as ex-gratia, taxed, and
  excluded from the bonus return.
- **AC-208.3** — Bonus accrues monthly to an employer-cost ledger (FR-PAY-102), the
  payout run computes TDS on the bonus at the marginal projected rate (FR-PAY-205), and
  the bonus is included in Form 138 but **not** in that month's ECR/ESI wage base.
- **[Hypothesis]** — **AC-208.4** — The ₹21,000/₹7,000 ceilings are the legacy 1965-Act
  values. **Kill criterion: verify whether the Central Government or the tenant's state
  has notified Code-era ceilings under Code on Wages s.26 before computing bonus for any
  accounting year after 21.11.2025 (§06.7, §06.13); until then the legacy figures drive
  only a provisional computation, clearly labelled, and a bonus payout requires the
  operator to confirm the ceiling in force and record its source.**
- **AC-208.5** — The eligibility test of at least 30 working days in the accounting year
  (Code on Wages s.26(1)) reads §09's published count (FR-FIL-001 AC3); it is never
  re-derived from punches or from the payroll's own paid days.
- **AC-208.6** — In a month with LOP, bonus accrues on the wages the month earned
  (Code on Wages s.26: a percentage of wages earned), capped at the calculation ceiling.
  Whether that ceiling is itself prorated for a part month is not captured — the same
  gap as the PF ceiling's `epf.ceiling_prorate_part_month` — so it is
  `bonus.cap_prorate_part_month`, class K2. AC-208.1's employee on ₹18,000 (TV9) with
  three LOP days in a 30-day month earns ₹16,200, still above the ₹10,000 base, so the
  month's bonus base is ₹10,000 unprorated or ₹9,000 prorated, and the approver
  confirms which.

**FR-PAY-209 · Computation ordering and rounding policy** · **P0**
The engine shall apply statutory computations in a **defined, documented order**
(earnings → wage-base resolution → PF/ESI/PT/LWF/bonus-accrual → taxable income → TDS →
net), with a single tenant-level **rounding policy** applied consistently and
reproducibly.
- *Detail.* Order matters: PT and PF (old regime) are deductions that affect taxable
  income; TDS is computed after them. The order is a dependency graph, not a strict
  one-pass sequence: where a dependency loops back on itself — the s.2(y) add-back
  inside a balance-figure CTC, or a net-of-tax gross-up — the loop is evaluated as a
  bounded fixed-point node (FR-PAY-211), and statutory rounding is applied **once, after
  convergence**, never inside the iteration. Rounding must be defined per statute and
  must not drift between runs. The rounding policy is a versioned rule (I2), not code.
  Where the evidence does not state a rounding method, the method is a named
  configurable parameter routed to §20 — never a guessed statutory rule.

| Head | Rounding rule | Source |
| --- | --- | --- |
| ESI (each side, per employee) | `esi.rounding_rule`, no shipped default (§06.12 R18); v0.3's round **up** to the next rupee is carried, not re-captured | **[Hypothesis]** until re-captured from ESIC's contribution page (§06.3, §06.13, TV37) |
| EPF (each head) | The EPFO Help File's sample return lines carry whole-rupee amounts (r5/02 finding 3; §06.14 TV16); the published manual states neither a rounding method nor whether decimals are accepted | `epf.rounding_method` — configurable, routed to §20 |
| PT | Whole-rupee slab value, no rounding | State PT Acts (§06.4) |
| TDS | The Form 138 file carries amounts to two decimals (r5/02); the rounding of the monthly deduction and of the annual liability is not established in this PRD's evidence | `tds.rounding_method` — configurable, routed to §20 |
| Net pay | Round to the rupee; residue absorbed per FR-PAY-101 AC-101.3 | tenant policy |

- **AC-209.1** — Re-running an unchanged period reproduces byte-identical figures (I4).
- **AC-209.2** — The sum of employee-level rounded figures reconciles to the challan
  total the return expects (no penny-rounding gap that fails ECR/ESI validation).
- **AC-209.3** — **Global precision policy.** Every monetary value is held as an exact
  decimal, never a binary float, at the internal scale `money.internal_scale` (a design
  parameter, not a statutory one). Components carry code R0 (FR-PAY-108): nothing is
  rounded until a statutory head or a payable figure is formed, and each rounding
  point — a statutory head, net pay, a file amount — applies its own rule from the
  table above exactly once. A figure written to a statutory file is rendered at the
  precision that file's layout specifies (whole rupees in the ECR sample lines; two
  decimals in the Form 138 file, r5/02), never at the internal scale.
- **AC-209.4** — **Statutory exceptions win over tenant policy.** A tenant rounding
  preference applies only where the table says "tenant policy"; it can never override
  a head whose rule is statutory or pending as a named parameter (`esi.rounding_rule`,
  `epf.rounding_method`, `tds.rounding_method`). Changing any of them is a new rule
  version, never a retroactive re-rounding of a LOCKED month (AC-104.2 pattern).

**Rounding points — where each rounding happens, and in what order.** Every rounding
the engine performs is one of these points. A rounding anywhere else is a defect, and
the determinism gate catches it (G1).

| # | Point | Rule | Order and residue |
| --- | --- | --- | --- |
| RP1 | Paid fraction (FR-PAY-109) | None — an exact ratio | Applied to each component once; no stored day rate |
| RP2 | Prorated components and wage bases | None (R0) | A base is a sum of R0 components (FR-PAY-201) |
| RP3 | Values inside a fixed-point loop | None | Rounding applies to the converged values only (FR-PAY-211) |
| RP4 | Statutory head, per employee | RS — `epf.rounding_method` per ECR amount field; `esi.rounding_rule` per side; PT and LWF at their whole-rupee slab values (RW) | Each head once, per employee, from R0 bases |
| RP5 | Employer EPF | Derived, never rounded on its own: the employer's share at the contribution rate less EPS, each first rounded under RP4 | Fields 8 and 9 then sum exactly to the employer's share (§06.2, field 9) |
| RP6 | Monthly TDS | `tds.rounding_method` | Each run deducts (projected annual liability − TDS deducted to date) ÷ runs remaining, rounded; the tax year's last run deducts the exact remainder |
| RP7 | Arrears | Each past month's heads rounded under that month's rule version (I3) | The arrears line is the sum of per-month rounded deltas, never a head recomputed on the lump sum (AC-401.1) |
| RP8 | Net pay | Tenant policy | The difference is a labelled rounding line on the payslip, so gross − deductions = net holds to the paisa (AC-601.1); whether it carries into the next month is the tenant's `pay.net_rounding_carry` |
| RP9 | Challan and file totals | None of their own | A total is the sum of rounded per-employee figures, never the rounding of an unrounded sum (AC-209.2; §06.3's ESI example is the case) |
| RP10 | File rendering | The file's own precision | Whole rupees in the ECR sample lines; two decimals in the Form 138 file (AC-209.3) |

- **AC-209.5** — RP6 on Example F: the new-regime liability of ₹1,50,800 over twelve
  runs. At the Form 138 file's two-decimal precision, the first eleven runs deduct
  ₹12,566.67 and the last ₹12,566.63; if `tds.rounding_method` is set to whole rupees,
  the first eleven deduct ₹12,567 and the last ₹12,563. Either way the twelve
  deductions total ₹1,50,800 exactly, and a mid-year re-projection (AC-205.2) re-spreads
  only the remainder.
- **AC-209.6** — RP5 on §06.2's line M5 reproduces it byte for byte: ₹1,200, ₹833 and
  ₹1,200 − ₹833 = ₹367. Whether each contribution is computed from the exact R0 base or
  from the wage as written in ECR field 4 is part of `epf.rounding_method`: EPFO refuses
  a contribution below the rate × field 4 (EV-040), and the two orders can differ by a
  rupee on a wage with paise. The order is therefore pinned against a portal-accepted
  file (§20 V-23) before general availability, never chosen by a developer.
- **AC-209.7** — A rounding inside a fixed-point loop is a build failure: rounding
  inside a contracting iteration can make it cycle between two values a paisa apart
  instead of converging (RP3; FR-PAY-211).

**FR-PAY-210 · Engine purity and the enumerated evaluation context** · **P0**
The engine shall evaluate every employee-period as a pure function of **(input
snapshot, rule-set version, evaluation context)** (I6, Part E-3), where the evaluation
context is a closed, enumerated record — **disbursal date**, **as-of decision time**,
**jurisdiction set**, **tax-regime election** — stored with the run.
- *Detail.* The four context fields are the only facts evaluation may use that are not
  in the input snapshot or the rule set. **Disbursal date:** planned when the month is
  APPROVED, replaced by the actual date captured at DISBURSED (bank confirmation,
  FR-PAY-903). **As-of decision time:** the transaction-time cut that fixes which rule versions and
  facts were known — replay uses the original, a retro recompute uses a new one against
  the period's rule versions (I3). **Jurisdiction set:** per employee-period, resolved
  from the assignment's work location — state, sphere, Code-regime commencement date
  (Part E-5). **Tax-regime election:** the employee's election in force at the decision
  time, new regime if silent (FR-PAY-205).
- **AC-210.1** — An evaluator run with clock and database access removed produces the
  same figures as the production evaluator; any read outside (snapshot, rule set,
  context) is a build failure, not a runtime warning.
- **AC-210.2** — Every run record carries its full evaluation context, and the audit
  answer for any figure (FR-PAY-1001) includes it.
- **AC-210.3** — When the actual disbursal date differs from the planned one, the engine
  re-evaluates only the date-keyed outputs — the PF due month for arrears (Part E-9,
  FR-PAY-401), the Form 138 deductee date of payment and its quarter and tax year
  (r5/02 finding 32), and the start of any interest exposure — and records the change as
  a diff against the approved figures. An approved figure is never silently changed; a
  date change that moves a deduction into a different quarter or tax year is surfaced to
  the approver before PAYMENT_INITIATED.
- **AC-210.4** — Replaying a run with its stored context reproduces it byte-identically
  (I4); recomputing it with a new decision time is labelled a recompute, and both
  results keep their own context in the audit trail.

**The evaluation-context record — data definition.** One record per run, with
per-employee entries where a field varies by employee.

| Field | Grain | Set at | Changes after it is set | Effect of a change |
| --- | --- | --- | --- | --- |
| `disbursal_date.planned` | Run, overridable per employee | M6 APPROVED | Voided by M7; set again at the next approval | No figure moves; the approval artefact shows the date-keyed consequences (AC-401.4) |
| `disbursal_date.actual` | Employee | M9 DISBURSED — the bank's credit confirmation, or a recorded cash or cheque payment (FR-PAY-905) | A returned credit re-issued on a later date (FR-PAY-905) | Only the date-keyed outputs are re-derived, as a diff (AC-210.3) |
| `decision_time` | Run | Each M4 or M5 | Never, for a stored result; a recompute takes a new one (AC-210.4) | — |
| `jurisdiction_set` | Employee-period | M2, from the work location on the assignment (Part E-5) | Only through M3 and a new snapshot | A new snapshot and a new result version |
| `tax_regime_election` | Employee | M2 — the election in force at the decision time, new regime if silent (FR-PAY-205) | A switch accepted inside `tds.regime_switch_window` (FR-PAY-503) | From the next run; amounts already deducted are not disturbed (AC-205.1) |

**The evaluator's contract.** What a call to the payroll evaluator takes and returns;
§15.4 owns the rules engine behind it.

| Direction | Item | Rule |
| --- | --- | --- |
| In | Input snapshot | Frozen at M2 and read only; a correction run's snapshot names its baseline (FR-PAY-307) |
| In | Rule-set version | Resolved for the period at M1 (FR-PAY-301); a recompute names its own (AC-210.4) |
| In | Evaluation context | The record above, complete; an incomplete record refuses the call (M4's guard) |
| Out | Result version | Per-employee figures, each carrying its inputs and rule versions (I4) |
| Out | Validation items | FR-PAY-1004's records, blocking or flag |
| Out | Configuration tasks | FR-PAY-1006's records, one for every unset parameter the evaluation met |
| Out | Fixed-point traces | One per node per employee-period that ran a loop (FR-PAY-211) |
| Never | I/O, the clock, a database read | AC-210.1 |

**FR-PAY-211 · Bounded fixed-point nodes in the calculation graph** · **P0**
The engine's calculation graph shall permit explicitly declared **fixed-point nodes**
that iterate to convergence under a maximum iteration count and a tolerance (I7,
Part E-4), instead of assuming a one-pass topological evaluation.
- *Detail.* Two loops are known. (1) **The s.2(y) add-back inside a balance-figure
  CTC.** When CTC closes on a special-allowance balance figure (FR-PAY-101) and carries an
  employer-cost line computed on statutory wages — the gratuity accrual (FR-PAY-102,
  FR-PAY-206) — the add-back raises wages, which raises the accrual, which lowers the
  balance figure, which lowers "all remuneration", which changes the add-back: the
  add-back re-bases a component that feeds its own test (§06.10). Worked at §08.12
  Example G. (2) **Net-of-tax gross-up**, where gross pay is solved from a target net
  and the tax depends on the gross. The iteration limit and tolerance are versioned
  engine parameters — `fixed_point.max_iterations` and `fixed_point.tolerance` — not
  statutory values; statutory rounding happens once, after convergence (FR-PAY-209).
- **AC-211.1** — Fixed-point nodes are declared in the graph, each with its loop members,
  iteration limit and tolerance; every node outside a declared loop evaluates once, in
  dependency order. An undeclared cycle is a build-time error.
- **AC-211.2** — Example G reproduces exactly: convergence at iteration 5 (change in
  wages under ₹0.01) to wages ₹48,826.29, gratuity accrual ₹2,347.42, special allowance
  ₹7,652.58 and add-back ₹11,173.71; CTC reconciles to the rupee (AC-102.2) only at the
  converged values.
- **AC-211.3** — A node that has not converged at its iteration limit stops the run at
  PROCESSED with a blocking validation (FR-PAY-1004) naming the node, the employee and
  the last two iterates. A first or intermediate iterate is never published as a figure.
- **AC-211.4** — Convergence is deterministic: the same snapshot, rule-set version,
  context and parameters produce the same iteration count and figures (I4).

<!-- DIAGRAM: fr-payroll-fixed-point-node -->

**The node declaration and its trace — data definition.**

| Field | Content |
| --- | --- |
| `node_id` | A stable name — `addback_balance_figure`, `net_of_tax_grossup` |
| `loop_members` | The computations inside the loop, in evaluation order — for Example G: special allowance, all remuneration, add-back, wages, gratuity accrual |
| `convergence_variable` | The one quantity whose change between iterates is tested — wages in Example G, the grossed amount in Example H |
| `start_rule` | How iterate 1 is seeded — the accrual on Basic in Example G; the target net in Example H |
| `max_iterations`, `tolerance` | `fixed_point.max_iterations`, `fixed_point.tolerance` (§20, engine numerics) |
| `rule_pin` | The rule-set version the loop evaluates against, never re-resolved mid-loop (§15.4.7) |
| Trace, per employee-period | Each iterate's loop-member values, the change at each step, the iteration count, the stop reason — converged or limit — and the converged values |

- **AC-211.5** — The trace is part of the audit answer for a figure (FR-PAY-1001): for
  any figure a fixed-point node produced, the product shows the table Example G or
  Example H prints, from the stored trace, without recomputing.
- **AC-211.6** — A loop whose gain is at or near one does not contract, and the node
  reports non-convergence at its limit (AC-211.3) rather than publish its last iterate.
  The known case is a gross-up whose iterates enter the s.87A marginal-relief band just
  above ₹12,00,000 in the new regime, where the extra tax cannot exceed the extra
  income (§06.5): there the tax can rise rupee for rupee with the gross, so plain
  iteration stalls. The blocking item names the band; the operator resolves it by
  changing the target, never by accepting an iterate.
- **AC-211.7** — Every node's start rule is deterministic and recorded, so two runs of
  the same employee-period start from the same iterate (AC-211.4).

**FR-PAY-212 · Net-of-tax gross-up** · **P1**
The engine shall solve, as a declared fixed-point node (FR-PAY-211), the gross amount of
a payment the employer promises net of tax — a net joining bonus, say — so that the
gross less the tax attributable to it equals the promised net exactly.
- *Detail.* The tax attributable to the payment is the rise in the employee's projected
  annual tax that the payment causes, under the elected regime, the period's rule
  versions and cess (FR-PAY-205). The grossed amount is itself taxable salary, so that
  rise depends on the answer — Part E-4's second loop. The attributable tax is deducted
  in full from the grossed payment and never spread over later months (AC-205.2's
  spreading is for revisions): spreading it would lower later months' net pay and break
  the promise. After convergence the tax is rounded once under `tds.rounding_method`
  and the gross is re-derived as net plus the rounded tax, so the promised net survives
  rounding exactly. Worked at §08.12 Example H. P1 because no R1 capability names it
  (§05.17); in R1 an operator enters a net-of-tax payment as a gross, with this
  computation shown beside it as a worksheet.
- **AC-212.1** — Example H reproduces. A ₹50,000 net payment to Example F's employee
  converges at iteration 10 to a gross of ₹63,131.31 carrying ₹13,131.31 of tax; a
  ₹2,50,000 net payment crosses from the 20% band into the 25% band and converges at
  iteration 13 to ₹3,18,513.51 carrying ₹68,513.51.
- **AC-212.2** — A closed-form gross-up at the payment's entry marginal rate is never
  used: in Example H's second case it under-grosses by ₹2,856.94, and the employee nets
  ₹2,114.14 less than promised.
- **AC-212.3** — The s.192(1A) election, under which the employer bears the tax on a
  non-monetary perquisite without grossing it into income (AC-205.9), is not a gross-up
  and never enters this node.

**FR-PAY-213 · The TDS projection, step by step** · **P0**
Each run, for each employee, the engine shall compute the month's TDS in this order,
under the elected regime — and, for the comparison view, under the other (AC-205.1) —
against the rule versions for the tax year:

1. **Salary paid to date** in the tax year, by date of payment (§06.5), from this
   employer's locked runs, plus previous-employer salary declared on Form 122
   (AC-205.5).
2. **Plus the salary still to come:** the current contracted monthly taxable salary ×
   the runs remaining in the tax year, this one included.
3. **Plus variable and one-time items as actuals** when paid, never annualised; a
   variable component the tenant marks as recurring is projected at its contracted
   amount instead. This is a product rule: an incentive paid once is not assumed to
   recur.
4. **Adjusted for the regime** — less the standard deduction and, under the old
   regime, the HRA exemption and the Chapter VI-A claims on their current basis
   (FR-PAY-503); plus perquisite values (FR-PAY-106) and declared s.192(2B) income
   (AC-205.8).
5. **Tax** by slab, then the rebate with its marginal relief, surcharge with its
   marginal relief, and cess (FR-PAY-205).
6. **Less tax already deducted** — by this employer in the year, and by a previous
   employer as declared on Form 122.
7. **Spread** the remainder over the runs remaining under RP6, the tax year's last run
   taking the exact remainder — except the tax on a one-time payment, deducted in its
   own run at the marginal projected rate (AC-305.1), and a net-of-tax payment's tax,
   deducted in full from it (FR-PAY-212).

- *Detail.* The order is what makes a mid-year change land right: step 1 reads what
  was actually paid, step 2 projects only the months to come, and step 7 spreads the
  change over the months left (AC-205.2), so there is no lump sum in the revision month
  unless it is the last. Worked at §08.12 Example L.
- **AC-213.1** — Example L reproduces: a revision from ₹1,50,000 to ₹1,70,000 a month
  from October 2026 re-projects the year's liability to ₹1,75,760, leaves ₹1,00,359.98
  after the ₹75,400.02 already deducted, and spreads it over the six remaining runs.
- **AC-213.2** — The engine never annualises one month: projecting October's new salary
  over twelve months would put the liability at ₹2,00,720, ₹24,960 above Example L's
  ₹1,75,760, and over-deduct for the rest of the year.
- **AC-213.3** — Every run stores the seven step values per employee; the
  tax-projection statement (FR-PAY-603) prints them, so the employee can follow the
  month's deduction from salary to tax.
- **AC-213.4** — When a run's TDS would exceed the pay left after the month's other
  deductions — a proof-lock true-up in a low-pay month, say — the engine deducts what
  the pay allows, carries the rest to the next run of the same tax year and, in the tax
  year's last run, shows any unrecovered amount to the approver as a short-deduction
  exposure; it never produces negative net pay (FR-PAY-1004). Whether the s.18(3) cap
  counts income tax among the month's deductions is not established in this PRD's
  evidence and is routed to §20; until it is, the cap check runs on the other
  deductions and flags the tax.

---

### 08.4 Pay-run lifecycle

The pay run is the transactional heart of the engine. Its state machine is what makes
payroll auditable and reversible. **[Reversed]** Earlier drafts specified
Draft → Inputs Locked → Computed → Review → Approved → Paid → Filed → Closed. That
machine had no payment-initiation state, so the one irreversibility line the revamped
ECR creates had nowhere to live, and its post-filing "file a revised return" loop
ignored the EV-037 guards — a Revised ECR is impossible once payment is initiated
(Part E-1). It is replaced by the machine below; the diagram illustrates, the
transition table is the specification.

<!-- DIAGRAM: payrun-state-machine -->

**FR-PAY-301 · Payroll-month state machine** · **P0**
A payroll month (one pay group × establishment × wage month) shall progress through
explicit, logged states: **OPEN → INPUTS_CLOSED → PROCESSED → APPROVED → LOCKED →
DISBURSED → PAYMENT_INITIATED → FILED**, reversible **before LOCKED** and immutable
from LOCKED onward. The **statutory verification gate sits immediately before
PAYMENT_INITIATED** (EV-037), and a correction after LOCKED — including after FILED —
is a **diff, never a mutation**.
- *Detail.* Each transition is an audit event (I5). PROCESSED may repeat: the operator
  processes, inspects and reprocesses until satisfied — the product is built for
  iterate-and-diff, not one clean run. The gate is placed where it is because the
  revamped ECR separates return submission from payment (EV-036): an approved return
  can never be cancelled, and a Revised return — the only way to correct downward — is
  allowed only while no payment has been initiated for the wage month (EV-037). After
  PAYMENT_INITIATED a downward EPF correction is impossible, so every check that could
  prevent one must run before it. FILED is distinct from DISBURSED because the filing is
  the unit of delivery: a month is not done when salaries reach bank accounts.

| # | From → To | Event | Guard | Side effect | Who may trigger |
| --- | --- | --- | --- | --- | --- |
| M1 | *(none)* → OPEN | Period opened | Pay group, establishment and the period's rule-set versions resolve | Filing instances for the period created as SCHEDULED (FR-PAY-711) | System scheduler, or payroll operator |
| M2 | OPEN → INPUTS_CLOSED | Close inputs | Pre-payroll checklist items closed or waived with a recorded reason | Input snapshot frozen (FR-PAY-302); later source edits queue as adjustments | Payroll operator (maker) |
| M3 | INPUTS_CLOSED or PROCESSED → OPEN | Reopen inputs | State is before LOCKED; an APPROVED month is first returned (M7) | Snapshot superseded; both snapshot versions, and every PROCESSED result version, kept for diff | Payroll operator |
| M4 | INPUTS_CLOSED → PROCESSED | Process | Evaluation context complete (FR-PAY-210) | Gross-to-net, wage bases, variance view (FR-PAY-303); fixed-point nodes converge (FR-PAY-211) | Payroll operator; repeatable |
| M5 | PROCESSED → PROCESSED | Reprocess | Snapshot unchanged, or reopened via M3 | New result version; prior versions kept for diff | Payroll operator |
| M6 | PROCESSED → APPROVED | Approve | No blocking validation open (FR-PAY-1004); approver is not the maker (FR-PAY-304) | Approval artefact recorded — totals, variance with per-employee drivers, statutory liability with due dates; planned disbursal date fixed in the context | Approver (checker) |
| M7 | APPROVED → PROCESSED | Return for correction | State is before LOCKED | Approval voided, reason recorded | Approver |
| M8 | APPROVED → LOCKED | Lock | Approval current | Results immutable; payslips published (FR-PAY-601); bank file generated (FR-PAY-901); filing artefacts may be generated from the locked snapshot (FR-PAY-711) | Approver |
| M9 | LOCKED → DISBURSED | Salaries released | Release by a payment approver distinct from the processor (FR-PAY-904) | Actual disbursal date replaces the planned one (FR-PAY-210 AC-210.3); UTRs captured (FR-PAY-903) | Payment approver |
| M10 | DISBURSED → PAYMENT_INITIATED | Initiate the EPF statutory payment — for an establishment with none that month, the first statutory payment (FR-PAY-309) | **Verification gate**, evaluated head by head (FR-PAY-309): every statutory payment the month owes reconciles to the locked snapshot; for the ECR, the approved return statement matches it line for line; no downward correction is pending; any s.7Q interest the portal has auto-calculated is included, because it must be paid with the contribution (EV-039); the named approver confirms | Challan payment initiated in an attended portal session (§22); from here a Revised ECR is impossible (EV-037) | Named approver (customer); the payment leg is executed by the employer — in every delivery mode our operator hands it to the employer (§22 FR-OPS-001) |
| M11 | PAYMENT_INITIATED → FILED | Monthly filings complete | Every monthly filing instance for the period is FILED — acknowledgement and payment receipt captured (FR-PAY-711); quarterly and annual statements run on their own instances | Month counted for the on-time metric (§01, §19) | System on acknowledgement capture, or operator |
| M12 | LOCKED, DISBURSED, PAYMENT_INITIATED or FILED → same state | Correction required | — | No mutation: a correction run (arrears, off-cycle, F&F) is created as a diff against the locked snapshot (FR-PAY-306); its filings follow EV-037 guards, the fenced arrear flow (EV-043) or a Form 138 correction statement (FR-PAY-708) | Payroll operator (maker) plus approver |

- **AC-301.1** — No payroll month reaches APPROVED while any blocking validation
  (FR-PAY-1004) is unresolved.
- **AC-301.2** — Every state transition records actor, timestamp, and (for APPROVED,
  LOCKED, DISBURSED and PAYMENT_INITIATED) the authorising role.
- **AC-301.3** — A month cannot reach PAYMENT_INITIATED while the verification gate
  (M10) fails; the failure names the reconciling item. A downward difference found at
  the gate is corrected by a Revised return before payment, never after.
- **AC-301.4** — Any attempt to edit a figure in a LOCKED or later month is refused and
  redirected to a correction run; the locked snapshot and every filed artefact stay
  byte-identical.

**FR-PAY-302 · Input locking** · **P0**
On entering INPUTS_CLOSED, the engine shall **snapshot** all inputs that feed the run
(attendance/LOP, variable pay, reimbursement claims, declaration changes, joins/exits,
compensation revisions) so later edits to source data do not silently alter a computed
run.
- **AC-302.1** — An attendance correction made after inputs are locked does not change
  the current run; it surfaces as an arrears/adjustment item for the next run
  (FR-PAY-401) or requires an explicit reopen.

**FR-PAY-303 · Compute and preview** · **P0**
On each entry to PROCESSED, the engine shall produce, for every employee, the full
gross-to-net breakdown, all statutory figures, employer costs, and a **variance view** against the
prior period (new joiners, exits, absolute and % change per employee, flagged outliers).
- **AC-303.1** — The variance view flags any employee whose net changed by more than a
  configurable threshold (default ±25%) with the driver (revision / LOP / arrears /
  declaration / one-time).
- **AC-303.2** — Run totals (gross, deductions, net, employer cost, each statutory head)
  are shown and reconcile to the sum of employee figures to the rupee.
- **AC-303.3** — Between two result versions of the same month (M5), every employee
  whose inputs and rule versions did not change has byte-identical figures, and every
  employee whose figures changed shows the input or rule version that changed them. A
  figure that moved with nothing behind it is a determinism defect that blocks approval
  (G1).

**FR-PAY-304 · Maker-checker approval** · **P0**
The engine shall enforce **segregation of duties**: the actor who computes/edits a run
cannot be the sole approver; approval requires a distinct authorised role.
- **AC-304.1** — A single user cannot both edit figures and approve the same run unless
  explicitly granted a combined role with that combination logged as a policy exception.

**FR-PAY-305 · Off-cycle pay runs** · **P0**
The engine shall support **off-cycle runs** (bonus, incentive, one-time payout,
correction) that are computed, taxed and filed correctly alongside the regular monthly
run, feeding the same statutory returns for the period.
- **AC-305.1** — A mid-month bonus off-cycle run computes TDS on the bonus at the
  marginal projected rate and its PF/ESI treatment per the component's wage-base flags.
- **AC-305.2** — Off-cycle PF contributions for a wage month consolidate into that
  month's **Regular** ECR return when the off-cycle run is LOCKED before the Regular
  return is generated — never a second Regular return. After the Regular return is
  approved, the engine routes by the EV-037 guards: members absent from every prior
  return for the month go on a **Supplementary** return; a change for members already
  returned goes on a **Revised** return only while no payment has been initiated for the
  month; otherwise the amount is held for the separate arrear flow, which is fenced
  (EV-043). ESI off-cycle amounts consolidate into the month's contribution upload when
  LOCKED before it is prepared; ESIC's correction path after upload is not established
  in this PRD's evidence and is routed to §20. (An off-cycle *pay run* is not an EPFO
  Supplementary *return*; the two are named apart everywhere in the product.)
- **AC-305.3** — Each run type (§14.4.4 `PayRun.type`) has one fixed statutory
  behaviour:

| Run type | Wage months it touches | TDS | PF and ESI | Payslip |
| --- | --- | --- | --- | --- |
| Regular | Its own | FR-PAY-213, all seven steps | The month's returns | The month's payslip |
| Bonus (statutory or other) | The month it is paid in | At the marginal projected rate, in its own run (AC-305.1) | By the component's catalogue row — statutory bonus is outside ECR and ESI (FR-PAY-208) | An off-cycle payslip |
| Incentive or one-time payment | The month it is paid in | As for a bonus | By the catalogue row; consolidated into the month's returns or routed under AC-305.2 | An off-cycle payslip |
| Reimbursement | The month it is paid in | Exempt and taxable split by proof (FR-PAY-502) | Outside both bases unless the catalogue row says otherwise | A line, or an off-cycle payslip |
| Arrears or correction | Each past month in scope (FR-PAY-307) | Tax by date of payment; s.157(1) attribution recorded (AC-205.7) | By classification (FR-PAY-406) — arrear flow, held, Supplementary or Revised | Labelled lines naming each past month |
| Full and final | The exit month, and past months for arrears | Final true-up on actuals (AC-801.3) | Contributions to the date of leaving (EV-040); exit marked on the portal (AC-802.1) | The final payslip |

**FR-PAY-306 · Reopen and correction** · **P0**
The engine shall support **reopening** a payroll month before LOCKED (FR-PAY-301
M3, M7) and **correcting** a LOCKED or later month only through a compensating
correction run — a diff against the locked snapshot, with full audit lineage — never by
editing or deleting history.
- **AC-306.1** — Correcting a disbursed month creates an offsetting correction run; the
  original remains in history byte-identical; net effect on the employee and on
  statutory totals is traceable.
- **AC-306.2** — A month that has reached FILED cannot be silently reopened; a
  correction after filing forces the correction path — Supplementary or Revised ECR
  within the EV-037 guards, the fenced arrear flow (EV-043), or a Form 138 correction
  statement (FR-PAY-708).

**FR-PAY-313 · The input snapshot — completeness contract** · **P0**
The snapshot FR-PAY-302 freezes at M2 shall be **complete by fact class**: for every
class an FR in this section consumes, the snapshot either carries the fact with its
provenance or M2 behaves as the class's row below says. Evaluation reads the snapshot, the rule-set version
and the evaluation context and nothing else (I6, AC-210.1); a class absent from the
snapshot therefore raises a missing-input error, **never a zero and never a default**.
- *Detail.* AC-210.1 is the build check — the evaluator has no clock and no database.
  This FR is the data check that makes the build check survivable: an evaluator with
  nothing to read cannot fall back on live data, so completeness has to be settled
  before the freeze, class by class, with a stated behaviour when a class is short.
  The rule-set version and the evaluation context are deliberately **not** snapshot
  contents: the rule set resolves through the run's **decision time**, which is taken
  afresh at each M4 or M5 (FR-PAY-210), and the context is its own record. So a
  reprocess that picks up a rule version published since the last processing does it
  **visibly** — a new decision time, a new result version, and every changed figure
  attributable to the version that changed it (AC-303.3) — rather than through a
  snapshot that quietly means something different the second time it is read.

<!-- DIAGRAM: fr-payroll-snapshot-freeze -->

| Fact class | System of record | Consumed by | Behaviour when the class is short at M2 | Change after the freeze |
| --- | --- | --- | --- | --- |
| Day-status counts — paid, LOP, weekly offs, holidays, NCP days, OT hours by band | §09 FR-ATT-021, FR-FIL-001 | FR-PAY-109, 201, 208, 501; ECR field 10 | Hard guard HG-2 fails and M2 is refused; no waiver (FR-PAY-310) | M3 reopen, or the reprocess-or-defer decision (FR-PAY-111) |
| Service-record days — date of joining, date of leaving, the days outside employment X | §07 | FR-PAY-109, 407, 801, 802 | M2 refused: X is an input to every prorated component, so a missing exit date pays days the employee did not work | M3 only — a service-record change is never deferred silently (FR-PAY-312) |
| Work location, establishment and the jurisdiction set | §07, resolved per Part E-5 | FR-PAY-105, 204, 207, 210 | Blocking validation "missing work location for PT/LWF" (FR-PAY-1004); the month holds at PROCESSED | M3 |
| Compensation assignment and every revision effective in the period | FR-PAY-103 | Every earning; FR-PAY-201's bases | M2 refused for the employee: an employee with no assignment in force has no contracted amount to prorate | M3, or an arrears batch for a locked month (FR-PAY-404) |
| Variable pay, one-time payments, recoveries and holds | Operator input, by the class's cut-off (FR-PAY-110) | FR-PAY-305, 311, 403 | The class closes at its cut-off; a later item queues for the next month (AC-110.2) — the month is not held | The next month's snapshot, labelled with the month it relates to |
| Reimbursement claims decided by the cut-off | FR-PAY-502 | FR-PAY-502, 501 | As above — an undecided claim is simply not in the month | The next month's snapshot |
| Declarations, proof decisions and the regime election | FR-PAY-503 | FR-PAY-213 step 4; FR-PAY-210's context | Not a hold: the projection runs on what is declared, and a silent employee takes the new regime (FR-PAY-205) | The next run's projection; the proof-lock true-up (AC-503.1) |
| Identifier state — UAN, PAN, ESIC IP, bank account and IFSC | §07 | FR-PAY-701, 706, 901; SA-ID | UAN and PAN never hold the month (Part E-11); missing or invalid bank details for a bank-paid employee are blocking (FR-PAY-1004) | An identifier-only correction from the same snapshot (FR-PAY-312) |
| Opening balances at a cutover | FR-PAY-314 | FR-PAY-213 step 1, AC-204.3, FR-PAY-203, 206, 208, 719, 801 | The employee's first live run is refused while the set is short of ATTESTED (AC-314.1) | A superseding attested set (O7), never an edit |
| The previous month's locked result — salary paid to date, YTD, arrears baselines | This engine | FR-PAY-213 step 1; every diff | Hard guard HG-1 fails and M2 is refused (FR-PAY-310) | — |
| Rule-set version for the period | §22's pipeline | Every computation | Not a snapshot content: resolved through the run's decision time (FR-PAY-210). A class K1 configuration task open for the month fails hard guard HG-3 and M2 is refused | A new rule version reaches a locked month only as a correction run (AC-1006.4) |

- **AC-313.1** — Every fact in the snapshot carries its source object, the version or
  timestamp of that object and the time it was read. A fact with no provenance fails the
  freeze; the failure names the class and the employee.
- **AC-313.2** — A class short at M2 produces exactly the row's behaviour. No class
  resolves to a default value, a zero, or the current live value at evaluation time.
- **AC-313.3** — An evaluation that meets a consumed class absent from its snapshot
  raises a missing-input error naming the class and the FR that consumed it, and the run
  stops at PROCESSED with a blocking validation (FR-PAY-1004). It never publishes a
  figure computed as though the class were empty — the failure mode this FR exists to
  prevent is a zero-LOP month for an employee whose attendance never arrived.
- **AC-313.4** — A snapshot version is immutable. M3 creates a new version; both are
  kept, and the difference between two result versions is explained by the difference
  between their snapshots and rule versions alone (AC-303.3).
- **AC-313.5** — The snapshot records, per input class, the cut-off date that closed it
  (FR-PAY-110), so an input that arrives late is shown against the cut-off it missed and
  the operator sees why it queued rather than applied.
- **AC-313.6** — No erasable-class object is ever in the snapshot: it holds counts, not
  punches; no biometric template, no rendered document, no consent artefact (I4, K-24;
  §14.6.1a). This is what makes AC-1002.1's replay survive an erasure — what replay
  returns afterwards is specified by §14 (AC-DM-34), and this section adds no second
  answer.
- **AC-313.7** — The snapshot names its own completeness: a stored list of the classes
  it carries, each with the count of employee-periods covered, so a class that silently
  covered 61 of 62 employees is visible at M2 rather than at the variance view.

---

### 08.4-A The payroll-month machine in operation — refusals, coupling, corrections and the gate

FR-PAY-301 fixes the transitions. This subsection fixes what the machine refuses, how
it gates the filing instances, how a correction run uses it, what the verification
gate checks head by head, and the checklist that guards M2.

**Refusals — every event, in every state.** A cell names the transition that runs, or
the refusal the operator sees. Each refusal is a negative test (§08.12-A).

| Event | OPEN | INPUTS_CLOSED | PROCESSED | APPROVED | LOCKED | DISBURSED | PAYMENT_INITIATED | FILED |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Close inputs | M2 | PM-02 | PM-02 | PM-02 | PM-01 | PM-01 | PM-01 | PM-01 |
| Reopen inputs | PM-03 | M3 | M3 | PM-04 | PM-01 | PM-01 | PM-01 | PM-01 |
| Process | PM-05 | M4 | M5 | PM-04 | PM-01 | PM-01 | PM-01 | PM-01 |
| Approve | PM-05 | PM-05 | M6 | PM-02 | PM-01 | PM-01 | PM-01 | PM-01 |
| Return for correction | PM-03 | PM-03 | PM-03 | M7 | PM-01 | PM-01 | PM-01 | PM-01 |
| Lock | PM-05 | PM-05 | PM-05 | M8 | PM-02 | PM-02 | PM-02 | PM-02 |
| Release salaries | PM-05 | PM-05 | PM-05 | PM-05 | M9 | PM-02 | PM-02 | PM-02 |
| Initiate the EPF payment (FR-PAY-309) | PM-05 | PM-05 | PM-05 | PM-05 | PM-05 | M10 | PM-02 | PM-02 |
| Record the monthly filings complete | PM-05 | PM-05 | PM-05 | PM-05 | PM-05 | PM-05 | M11, or PM-08 | PM-02 |
| Edit a figure or an input | Direct edit | PM-06 | PM-06 | PM-04 | PM-01 | PM-01 | PM-01 | PM-01 |
| Raise a correction run | PM-07 | PM-07 | PM-07 | PM-07 | M12 | M12 | M12 | M12 |

| Code | The operator sees | Route offered |
| --- | --- | --- |
| PM-01 | The month is locked; its figures are immutable (AC-301.4) | Raise a correction run (M12, FR-PAY-307) |
| PM-02 | The month is already at or past this point | — |
| PM-03 | Nothing to reopen or return in this state | — |
| PM-04 | The month is approved | Return it for correction first (M7) |
| PM-05 | An earlier step is missing | The missing step, named |
| PM-06 | Inputs are frozen in the snapshot | Reopen (M3), or queue the change as a next-month adjustment (AC-302.1) |
| PM-07 | Before LOCKED, the month itself is changed, not corrected | Reopen (M3) or return (M7) |
| PM-08 | A monthly filing instance is not yet FILED | The instance and its state, named |

**How the month gates its filing instances.** The filing machine (FR-PAY-711) runs per
instance; these are the month states each instance transition needs.

| Filing transition | Needs the source month in | Also needs | Basis |
| --- | --- | --- | --- |
| F1 SCHEDULED | OPEN — M1 creates it | — | FR-PAY-711 |
| F4 GENERATED | LOCKED or later | For an ECR Regular: the establishment's previous wage month has a Regular (AC-712.1), and the M−4 test passes | EV-038 |
| F6 SUBMITTED, F9 ACCEPTED | LOCKED or later — an ECR may be uploaded and approved before salaries are released | — | EV-036 separates the return from the payment |
| F10 REVISED (ECR) | A state before the month's EPF payment is initiated | No other return in process for the month | EV-037 |
| F12 SUPPLEMENTARY | LOCKED or any later state | An approved Regular | EV-037 sets no payment guard for a Supplementary |
| F14, F17 PAYMENT_INITIATED | DISBURSED or later | The head's part of the verification gate (FR-PAY-309) | Part E-1; EV-037 |
| F15, F16 FILED | — | — | M11 fires once every monthly instance is FILED |

- **AC-301.5** — The month's state and its instances' states agree at every moment: no
  instance is GENERATED from a month short of LOCKED, and no month is FILED while a
  monthly instance is short of FILED.

**Concurrency.** Three rules keep two operators, two runs and two months from
corrupting one another:

1. **One result per snapshot.** Processing is serialised per payroll month; a process
   request while another is running is refused with the running job's owner named. A
   result computed against a snapshot superseded mid-run (M3) is discarded, never
   saved.
2. **Months in order.** Month M+1 may be OPEN while month M is short of LOCKED — inputs
   accumulate — but cannot pass M2 until M is LOCKED (FR-PAY-310, HG-1), so M+1's
   snapshot sees M's final figures, arrears and LOP reversals.
3. **Corrections in a chain.** Two correction runs touching the same employee and wage
   month are serialised: the second opens only after the first is LOCKED and diffs
   against the first's result, so every correction is a diff on the latest locked
   figure, never on a stale one.

**FR-PAY-307 · Correction runs on the payroll-month machine** · **P0**
A correction run (M12) shall run the payroll-month machine itself — OPEN to FILED — with
the differences below, so that one machine, one set of guards and one audit trail cover
the month and every change to it.

| Transition | What differs for a correction run |
| --- | --- |
| M1 | Opened by M12 on a source month in LOCKED or later. Its scope is named — employees, wage months and cause: revision arrears, LOP reversal, catch-up, identifier-only re-file, recovery, rule change (FR-PAY-402). Its baseline is the source month's locked result, or the latest locked correction for the same employees and months |
| M2 | The snapshot is the corrected inputs plus the baseline reference, with the cause's evidence attached — the revision letter, the regularisation, the seeded UAN |
| M4, M5 | Each affected wage month is recomputed against its own rule versions and its own day-rate convention (I3; AC-109.5); the result stores per-month, per-head deltas and each line's classification (FR-PAY-406) |
| M6 | The approver signs `SO-CORRECTION` (§03.6a), which shows each line's classification, its return route (FR-PAY-714) and, for arrears, the PF due month from the planned disbursal date (AC-401.4) |
| M8 | Lock fixes the routes. Payable lines are paid as labelled lines in the next regular run or in an off-cycle run (FR-PAY-305); an identifier-only or NCP-only line carries no pay line |
| M9 | Recorded as a no-salary-leg event when no line pays an employee, so M10 still reads a disbursal state |
| M10 | The gate runs for the correction's own payment-bearing instances. A Revised return for a wage month is available only while the **source** month's EPF payment has not been initiated (EV-037) |
| M11 | FILED once every routed instance is FILED. A fenced leg — the arrear return (EV-043; §05 F-03) or a held Form 138 correction (AC-708.3; §05 F-02) — holds the correction at PAYMENT_INITIATED with its fence shown, never FILED |
| M12 | A correction to a locked correction is a new correction run whose baseline is that correction |

- **AC-307.1** — A correction run changes no byte of its source month's result,
  payslips or filed artefacts (AC-306.1); the source month's view lists every
  correction against it, with its state.
- **AC-307.2** — A correction with no pay line and no statutory payment — an NCP-only
  difference, say — records M9 and M10 as no-leg events and waits for its routed
  filings, so the machine never needs a second shape.
- **AC-307.3** — A correction can be cancelled only before LOCKED; after LOCKED a
  mistaken correction is itself corrected (M12).

**FR-PAY-309 · The verification gate, evaluated head by head** · **P0**
The engine shall evaluate the M10 verification gate separately for each statutory
payment head the month owes — EPF, ESI, the TDS deposit, and PT and LWF per state —
immediately before that head's payment is initiated, and shall move the month to
PAYMENT_INITIATED when the **EPF** head's payment is initiated: the one line after which
a downward correction is impossible (EV-037).
- *Detail.* The heads fall due on different days: the TDS deposit by the 7th (the
  1962-Rules convention, **[Hypothesis]** until r.218 is read — §05 F-10) and the ECR by
  the 15th (§06.2). A single month-wide gate that waited for the approved ECR return
  would hold the TDS deposit behind the ECR and make it late. So each head passes its
  own checks at its own payment point, a failure on one head never holds another, and
  the month's irreversibility line stays where EV-037 puts it. This answers the
  question §03 routed to this section ("Each persona's month"): M10 gates the EPF
  challan, and the TDS deposit passes its own checks and is paid ahead of it. For an
  establishment with no EPF payment in the month — no EPF registration yet (§06.1) —
  the month moves at its first payment-bearing head; for a NIL EPF month it moves at
  the Direct Challan Entry payment (EV-042).

<!-- DIAGRAM: fr-payroll-verification-gate -->

| Check | Head | Passes when | Family on failure |
| --- | --- | --- | --- |
| VG-C1 | Every head | The source month is DISBURSED; every line's actual disbursal date is recorded and the date-keyed outputs are re-derived; any deduction that moved quarter or tax year is acknowledged by the approver (AC-210.3) | SA-SEQ |
| VG-C2 | Every head | The challan amount equals the sum of the head's per-employee rounded figures (AC-209.2; RP9) | SA-REC |
| VG-C3 | Every head | Every configuration task on a parameter the head's figures need is closed, or its provisional figure is confirmed by the named approver (FR-PAY-1006) | — (a configuration task) |
| VG-C4 | Every head | The named approver, not the operator, confirms against the hash of the captured portal object — `SO-GATE`, `SO-ESIC` or `SO-PT` (§03.6a; §22 FR-OPS-004) | — (a precondition) |
| VG-E1 | EPF | The approved return statement equals the locked snapshot line for line, save the differences EPFO is documented to make — EPS disallowed for a member over 58 not marked for deferred pension (EV-040; §22.4.1 step 9) | SA-REC |
| VG-E2 | EPF | Every return FR-PAY-714 planned to run before payment is ACCEPTED — above all, every downward correction for a member already returned | SA-SEQ |
| VG-E3 | EPF | The Due Deposit Balance Summary's contribution lines equal the forecast; the s.7Q interest it shows is in the amount to be paid (EV-039); any s.14B damages are shown with the employer's recorded choice (FR-PAY-715) | SA-REC |
| VG-E4 | EPF | A second payment covering the same member and wage month is confirmed by the named approver (AC-701.8) | SA-REC — a flag |
| VG-E5 | EPF | Form IV column (18) equals ECR field 7 for every member (§06.12 R40; TV49) | SA-REC |
| VG-E6 | EPF | For a month after the saving lapses, the post-cliff EPS and EDLI mode is shown and confirmed (AC-202.7) | — (a configuration task) |
| VG-S1 | ESI | Each employee's contribution per side equals the snapshot; employees held to the contribution-period boundary are present (AC-702.1); Form IV column (19) equals the ESI employee contribution (§06.12 R40) | SA-REC |
| VG-S2 | ESI | For a period after the saving lapses, `esi.post_cliff_mode` is shown and confirmed (AC-203.4) | — (a configuration task) |
| VG-T1 | TDS deposit | The deposit equals the tax deducted on the salary payments made in the calendar month — keyed by each payment's actual date, not by wage month, because tax is deducted at the time of payment (§06.5) | SA-REC |
| VG-T2 | TDS deposit | The deposit is made under the deductor's TAN as held in the deductor master, confirmed against the TRACES profile (§06.5) | SA-ID |
| VG-P1 | PT, per state | The challan equals the PT deducted from employees working in that state (AC-703.1) | SA-REC |
| VG-L1 | LWF, per state | The remittance falls in one of the state's periods and equals the accrued shares (AC-704.1) | SA-SEQ; SA-REC |
| VG-N1 | EPF, NIL month | No member is active in the wage month (EV-042) | SA-SEQ |

- **AC-309.1** — For a month whose salaries were released on 31 October 2026, the TDS
  deposit passes VG-C1 to VG-C4, VG-T1 and VG-T2 and is paid before the October ECR
  return is approved; the month stays DISBURSED until the EPF challan is generated
  after VG-E1 to VG-E6 pass.
- **AC-309.2** — A failure on one head names the head, the check, the reconciling item
  and its family (FR-PAY-713); every other head whose checks pass may proceed.
- **AC-309.3** — The month enters PAYMENT_INITIATED at the EPF head's payment
  initiation and never earlier; from then on every Revised return for the wage month is
  refused (AC-711.3), whatever the other heads' states.
- **AC-309.4** — Each check's inputs, result, time and confirming approver are stored
  with the month, and replaying the gate from them reproduces its result (I4).

**FR-PAY-310 · The pre-payroll checklist, evaluated by the engine** · **P0**
The engine shall evaluate §03's default pre-payroll checklist (US-M01; §03, "The
pre-payroll checklist — default items and what each one feeds") against the snapshot the
month is about to freeze (FR-PAY-302), and shall run M2 only when every item is closed or
waived under §03's rule (AC-M01.3) **and** the three hard guards below hold. A hard guard
is not a checklist item and no waiver passes it, because a figure computed past it would
be wrong.

| Guard | Holds when | Why no waiver passes it |
| --- | --- | --- |
| HG-1 · Previous month locked | The pay group's previous wage month is LOCKED (concurrency rule 2) | FR-PAY-213 step 1 reads salary paid to date from locked runs, and the month's arrears and LOP reversals diff against locked figures; an unlocked predecessor makes every TDS projection and every diff provisional |
| HG-2 · Paid days reconcile | §09's invariant holds for every employee over the days in employment — P + L + W + H = D − X (FR-PAY-109) | A failing invariant is a wrong paid-day count, and so a wrong gross, wrong wage bases and a wrong ECR line |
| HG-3 · No blocking parameter | No class K1 configuration task is open for the month (FR-PAY-1006) | A K1 parameter is one without which the figure cannot be formed at all |

- *Detail.* A named pre-payroll checklist is the industry pattern — greytHR's
  documentation enumerates eighteen items (r3/02 finding 1; documentation read in the
  r3 capture, 2026, not executed) — and §03 binds each default item to the product
  object it checks and to the variance-bridge row it feeds. This FR adds the engine's
  side: the item checks run against the snapshot, never against live data that could
  change after M2. §03 lists "previous month locked" and "LOP and leave without pay
  closed" as statutory items a month may waive with a reason; the engine holds them as
  HG-1 and HG-2 instead, and the difference is routed to §03's owner (§08.13).
- **AC-310.1** — Each item's check runs against the candidate snapshot; an item that
  closes on live data and would reopen on the snapshot is shown as open.
- **AC-310.2** — Reopening the month (M3) reopens the items whose inputs change; the
  others keep their closure.
- **AC-310.3** — No "quick process" skips the checklist or the hard guards. greytHR
  documents such an escape hatch (r3/02 finding 2; documentation read, not executed);
  here the snapshot's completeness guards M2, and a recorded waiver under §03's rule is
  the only way past a waivable item.

**FR-PAY-311 · Salary holds** · **P0**
The engine shall let the operator hold one employee's salary for a month — with a
recorded reason and an approver who is not the operator — computing the month in full,
leaving the employee out of the bank file, and releasing the held net in a later run as
a labelled line.
- *Detail.* A hold is a checklist decision (§03's item 12, "salary holds decided") that
  incumbents expose as "stop salary processing" (r3/02 finding 1; documentation read,
  not executed). What a hold does to the statutory lines is not settled in this PRD's
  evidence. TDS follows the date of payment (§06.5), so it is deducted and reported when
  the held net is released, not in the held month — FR-PAY-213 step 1 simply does not
  see the held month until then. For PF and ESI the product ships
  `pay.hold_statutory_treatment` unset (class K2): either the held month's lines stay in
  that month's returns, because the wages were earned, or they are held and released as
  belated salary (FR-PAY-406), and the approver confirms the choice for each hold at the
  head's gate. A hold also meets the wage-timing rule: a monthly-paid employee's wages
  fall due before the seventh day of the following month (Code on Wages s.17(1);
  §06.9), so a hold past that day is shown to the approver as a wage-timing exposure.
  Worked: Example I's ₹20,000 employee, October 2026 held in full and released on 30
  November — the October result locks with gross ₹20,000, employee PF ₹1,800, ESI
  ₹150 and net ₹18,050; the October bank file leaves out ₹18,050; the exposure runs
  from 7 November, when October's wages fell due, to the release.
- **AC-311.1** — A held employee's figures are computed and locked with the month; the
  bank file excludes them and says so, and AC-901.1's reconciliation reads the sum of
  the net pay of employees not held; the held net sits on a hold ledger until release.
- **AC-311.2** — Release pays the held net in the next regular run or an off-cycle run,
  labelled with its wage month, and the release's date of payment keys TDS placement
  (FR-PAY-905).
- **AC-311.3** — A hold kept past the s.17(1) due date shows its exposure on the
  approval artefact and the calendar until release; a hold never removes a statutory
  line silently.

**FR-PAY-312 · Routing an input event to its path** · **P0**
Every event that can change pay shall be routed, by the effective month and the state of
that month when the event arrives, to exactly one path in this table; the router never
lets an event touch a LOCKED month in place.

| Event | Takes effect in | That month's state when it arrives | Path | Classification and return route |
| --- | --- | --- | --- | --- |
| Compensation revision | The open month | OPEN | Direct input | — |
| Compensation revision | The open month | INPUTS_CLOSED to APPROVED | Reopen (M3, after M7 if approved) or defer (FR-PAY-111) | — |
| Compensation revision | A LOCKED month | Any | Arrears batch, run as a correction (FR-PAY-404, FR-PAY-307) | True arrears; arrear flow, fenced (EV-043) |
| Attendance or leave change | The open month | OPEN | Direct input | — |
| Attendance or leave change | The open month | PROCESSED | Reprocess-or-defer decision (FR-PAY-111) | — |
| LOP restored | A LOCKED month | Any | LOP reversal (FR-PAY-405) | Belated salary; held |
| LOP added after pay | A LOCKED month | Any | Recovery of the overpaid wages in a later run, within the s.18(3) cap (FR-PAY-403) | Whether a recovered overpayment changes the past month's contribution is not established; the ECR leg goes to FR-PAY-714 with that question open (§20) |
| Joining | The open month | OPEN | Direct input | — |
| Joining | A month whose inputs have closed | Any | Catch-up in the next run (FR-PAY-407) | Belated salary; held; M+4 clock |
| Exit | The open month | OPEN | Final month to the date of leaving, and F&F (FR-PAY-801) | — |
| Exit | A LOCKED month | Any | F&F off-cycle run (FR-PAY-804, exit-month table) | Off-cycle routing (AC-305.2) |
| UAN or PAN seeded or corrected | A LOCKED month | Any | Identifier-only correction from the same snapshot (§14 AC-DM-12) | Supplementary for an excluded member |
| One-time payment | The open month | Before LOCKED | Regular run, or an off-cycle run (FR-PAY-305) | Consolidated if locked before the Regular return is generated |
| Declaration or proof decision | The tax year | Any | The next run's projection (FR-PAY-213, step 4) | — |
| Salary hold or release | The month | Before LOCKED; release in any later run | FR-PAY-311 | By `pay.hold_statutory_treatment` |
| Retrospective rule change | LOCKED months | Any | Retrospective recompute (FR-PAY-402), run as a correction | True arrears |
| Prospective rule change | Later months | — | A new rule version, from its effective date (I2) | — |
| Configuration value set | A month locked on a provisional figure | Any | Correction against the new rule version (AC-1006.4) | By the head's route |

- **AC-312.1** — An event that matches no row is refused with the reason and routed to
  the operator; there is no default path.
- **AC-312.2** — The path taken, the row that chose it and the month's state at arrival
  are stored with the event, so the audit answer for any later figure names the event
  and its route (FR-PAY-1001).

---

### 08.4-B Cutover — opening balances, the ledger's pre-history, and the quarter a switch lands in

A tenant that switches mid-tax-year arrives with a payroll history this engine did not
compute. §16.7 owns the importer and the **YTD tie-out** — the heads, their independent
records and the ₹0 tolerance on the V-15 heads — and §05.6 owns the migration scenario.
This subsection owns the part neither can: **what the engine does with those figures
once they are in**, which is a narrow and unforgiving question, because every one of them
is an input to a figure that reaches a return. The engine cannot re-derive them (there is
no run to replay), must not recompute them (the prior system's rule versions are not
ours), and cannot proceed without them (a TDS projection that starts the year at zero
over-deducts every remaining month).

**FR-PAY-314 · The opening-balance fact set** · **P0**
The engine shall carry, per employee and cutover, an **opening-balance fact set** as a
first-class, attested input class (FR-PAY-313) — never as an ordinary editable field —
and shall read it wherever a computation needs a fact from a period before the cutover.

<!-- DIAGRAM: fr-payroll-opening-balance-states -->

| Opening fact | Grain | Read by | Why the engine cannot derive it |
| --- | --- | --- | --- |
| Salary paid in the tax year, by month and by **date of payment** | Employee × month | FR-PAY-213 step 1 | The payments were never our runs; tax follows the date of payment (§06.5), so a month's figure without its payment date cannot be placed in a quarter |
| TDS deducted in the tax year, by month, **with the challan identification of the deposit that carried it** | Employee × month × challan | FR-PAY-213 step 6; FR-PAY-716's CD and DD records for a quarter the cutover splits (FR-PAY-315) | Annexure I is the deductee-wise break-up of **this deductor's** TDS for the quarter (r5/02 finding 22) — one TAN, whichever system produced the payment |
| EPF and ESI contributions, by wage month and registration | Employee × month × registration | FR-PAY-712's ledger; FR-PAY-702's half-yearly reconciliation | The returns were filed on the portal by another system; our ledger must know they exist (FR-PAY-315) |
| ESI contribution-period state — covered, or held to the period boundary with its exit date | Employee | FR-PAY-203 | Re-deriving it from the current wage inverts the answer for a crosser mid-period (AC-314.4); §06.3's machine sets the state, and the state, not the wage, decides the months |
| PT paid, per state, in the financial year | Employee × state | AC-204.3's running ₹2,500 ceiling per state (Art. 276) | The ceiling is annual and per state; a cap evaluated on our months alone would allow a year's second ₹2,500 |
| Tax-regime election and the date it was made | Employee | FR-PAY-210's context; FR-PAY-205 | A silent employee defaults to the new regime, so a lost election is not neutral — it changes the projection |
| Declarations and proof state for the tax year | Employee × claim head | FR-PAY-503; FR-PAY-213 step 4 | Proof already accepted by the prior system is not re-collected from the employee, and the true-up month must know what is outstanding |
| Lifetime exemption balances the employee declares as already used — gratuity, leave encashment | Employee | AC-801.2, AC-801.4 | Both ceilings are lifetime, cross-employer aggregates; they are declarations, not computations, and they survive a system change |
| Continuous-service start date and gratuity accrual to date | Employee | FR-PAY-206; §09's continuous-service counter | Service predates the cutover; the accrual ledger has to open at a balance, not at zero |
| Statutory bonus accrued for the accounting year | Employee | FR-PAY-208 | The accounting year straddles the cutover |
| Advance, loan and recovery balances outstanding | Employee × instrument | FR-PAY-403 | A recovery schedule that restarts overcharges the employee and breaches the s.18(3) cap arithmetic |
| Previous-employer income and tax declared on Form 122 before the cutover | Employee | AC-205.5 | It is a declaration made to this employer, held in the prior system |

**The opening-balance set's states.** The diagram illustrates; this table specifies
(Part E-1). One set per employee per cutover.

| # | From → To | Event | Guard | Side effect | Who may trigger |
| --- | --- | --- | --- | --- | --- |
| O1 | *(none)* → IMPORTED | The cutover import is loaded | The importer's field map is bound (§16.7) | Each fact stamped with the source system, the export's date and the import batch | Product lead, or the migration operator |
| O2 | IMPORTED → RECONCILED | The §16.7 tie-out passes | Every V-15 head differs from its independent record by ₹0 | The tie-out evidence is attached to the set | System, on the tie-out run |
| O3 | IMPORTED → DISPUTED | A head differs from its independent record | — | The per-month difference is shown; go-live for that employee is held (AC-MIG-5) | System |
| O4 | DISPUTED → IMPORTED | A corrected import is loaded | — | Both imports kept; the difference history stays | Migration operator |
| O5 | RECONCILED → ATTESTED | The employer's named signer attests the set | The signer is not the person who loaded the import | The attestation records the signer, the date and the evidence reference | The tenant's approver |
| O6 | ATTESTED → IN_USE | The employee's first live run reads it | The run is at M4 | The set is bound to the run's audit chain (AC-314.2) | System |
| O7 | IN_USE → SUPERSEDED | A later attested correction replaces it | The correction is itself RECONCILED and ATTESTED | Runs already locked keep the set they read; the difference is a correction run (FR-PAY-307) | Migration operator plus the approver |
| O8 | SUPERSEDED → IN_USE | The correction is read by a run | — | — | System |
| O9 | DISPUTED → *(none)* | Go-live refused for the employee | — | The employee is excluded from the first live run with the failing head named; payroll for them stays with the prior system for that month | Product lead |

- **AC-314.1** — No run reads a set short of ATTESTED. An employee whose set is IMPORTED
  or DISPUTED is refused in the first live run with the failing head and its rupee
  difference named; the refusal is a blocking validation (FR-PAY-1004), not a silent
  exclusion from the bank file.
- **AC-314.2** — An opening fact carries **no rule version**, because it was never
  computed here. The audit answer for a figure that reads one (FR-PAY-1001) names the
  source system, the export date, the tie-out result, the attesting person and the
  attestation date, and stops there — the engine never presents an imported figure as
  one it derived, and never recomputes a pre-cutover period to "check" it.
- **AC-314.3** — Example M, part 1, reproduces: opening TDS of ₹50,266.68 leaves
  ₹1,00,533.32 to spread over the eight runs from August, and an opening set short by one
  month's deduction over-deducts ₹1,570.83 a month without breaking any internal
  reconciliation. The run's own arithmetic cannot reveal the error, so the control is
  §16.7's ₹0 tie-out tolerance on this head and the gate's position **before** go-live
  rather than after the first run.
- **AC-314.4** — The ESI contribution-period state is **imported, never re-derived**.
  Example M, part 4, reproduces: an employee already held to a period boundary keeps
  contributing to it after the cutover, where an engine re-deriving coverage from the
  current wage would file the remaining months of the period with no ESI line at all — a
  return ESIC has no reason to refuse, and a gap that surfaces only at the half-yearly
  reconciliation (FR-PAY-702).
- **AC-314.5** — A superseding set never re-rates a locked month (O7). The month is
  corrected through a correction run against the new set, exactly as a set parameter is
  (AC-1006.4), and both sets stay resolvable.
- **AC-314.6** — From the first live run, the year-end record (FR-PAY-719) carries the
  opening figures alongside ours, so the tax year's totals under one TAN are whole across
  two systems. A record that starts at the cutover would understate the year's salary and
  tax in exactly the annexure TRACES reads to build Form 130 (EV-047, EV-048).
- **AC-314.7** — The opening set is visible to the employee: the tax-projection statement
  (FR-PAY-603) shows opening salary and opening TDS as their own rows, labelled with the
  source system, so an employee can see why the first payslip under the new system
  deducts what it does.

**FR-PAY-315 · Ledger pre-history, and the quarter a cutover lands in** · **P0**
Before the first wage month the engine files for an establishment, the ECR filing ledger
(FR-PAY-712) shall carry a **FILED_ELSEWHERE** entry for every wage month the portal's
own filing history shows, and for at least the **four** wage months preceding our first,
so that EPFO's M−4 chronology test (EV-038) is evaluated against the establishment's real
history rather than against the length of our own ledger.
- *Detail.* The portal, not the outgoing vendor, is the authority for what has been
  filed: the revamped ECR's Return Home Page carries quick links for employers to access
  their filing histories (r5/02 finding 17, manual p.4), so the pre-history is captured in
  the cutover's attended session (§22) and recorded with its capture evidence. Four months
  is the reach of the M−4 test; the product seeds every month the history shows, because a
  longer history costs nothing and a short one hides a block. **What the history view
  shows per member is not captured in any research round** — the M−4 test turns on *all
  active members* of month M−4 having been returned, and a month can be "filed" while a
  member is missing from it (AC-701.2's own exclusion case). Until the view is read on a
  live portal (§20 V-23), per-member coverage for the four reach-back months is rebuilt
  from the employer's own copies of the uploaded `.txt` files, and where those cannot be
  produced the risk is stated on the first Regular return rather than assumed away.
  The TDS side has a different shape. Form 138 is a **deductor-quarter** statement of this
  deductor's deductee-wise TDS (EV-047; r5/02 finding 22), so a cutover **inside** a
  quarter does not divide the quarter: our first statement is the whole quarter's, and it
  needs the quarter's pre-cutover payment lines and the challan identification of the
  deposits that carried their tax (FR-PAY-314) before it can be assembled.

| Cutover date | What it costs | What must be captured |
| --- | --- | --- |
| 1 April | Nothing beyond the standing set — no in-year YTD, no split quarter, no mid-period ESI state (§05's GL-5 reading) | Four months of ECR pre-history; service, exemption and recovery balances |
| First day of a quarter, mid-year | The year's earlier quarters were filed by the prior filer; our first statement is whole | Opening YTD and TDS by month; the filed quarters' acknowledgement references |
| Mid-quarter | Our first statement carries payment lines we did not produce and challans we did not pay | The quarter's pre-cutover payment lines by date of payment, and each deposit's challan identification for the `.csi` match (AC-706.2) |
| Inside an ESI contribution period | A crosser's held-to-boundary state is invisible in the current wage | The per-employee contribution-period state (AC-314.4) |
| Any date | The M−4 test reaches back four wage months | The portal's filing history, captured in an attended session |

- **AC-315.1** — No Regular return is generated for our first wage month while any of the
  four reach-back months lacks a ledger status. An absent month is BLOCKED with the
  capture task named (F2, a chronology gap), never recorded as FILED on an assumption.
- **AC-315.2** — A FILED_ELSEWHERE entry carries the wage month, the reference the
  portal's history shows and the attended session that captured it (§22). It is never
  created from the outgoing vendor's assertion alone, and it extends AC-712.1's status
  set rather than leaving pre-cutover months without one.
- **AC-315.3** — An active member of a pre-cutover month whom the prior system left
  unreturned inherits that month's clock: the ledger computes the M+4 deadline from the
  **original** wage month, not from the cutover, and lists it with the seeding task
  (AC-712.6). A cutover does not reset a deadline that was already running.
- **AC-315.4** — A mid-quarter cutover holds the quarter's Form 138 instance at BLOCKED
  while the quarter's pre-cutover payment lines or their challan identifications are
  absent; the calendar's blocked view shows the reason and the quarter's due date
  (AC-710.4). The statement is generated once they are attested, or the quarter is
  recorded as filed by the prior filer with its acknowledgement reference — never
  generated with our months only, which would under-report the deductor's quarter.
- **AC-315.5** — FILED_ELSEWHERE entries are excluded from both sides of the on-time
  metric (§19): they are neither filings we completed nor filings we missed. The
  calendar labels them, so the first months of a tenancy do not read as a perfect record
  we did not earn.
- **AC-315.6** — The ESI and PT ledgers take the same treatment for their own periods:
  a contribution period or a state return closed before the cutover is recorded as filed
  elsewhere with its evidence, and the half-yearly ESI reconciliation (FR-PAY-702) reads
  the imported contributions for the pre-cutover months of a straddling period.

---

### 08.5 Arrears, retrospective recompute, and adjustments

This group is where I3 (retro against the period's rule version) becomes a feature, and
where spreadsheet workflows break: "difference × months" is the spreadsheet method and
it is wrong whenever a rule moved inside the retro window. (Whether TallyPrime recomputes
arrears per period against the period's rules is not established in our evidence —
EV-032 does not cover it — so no competitive claim is made here.)

**FR-PAY-401 · Arrears from effective-dated revisions** · **P0**
When a compensation revision is effective in a closed period (FR-PAY-103), the engine
shall compute **arrears** by recomputing each affected past period **against that
period's rule versions and inputs**, and pay the delta in the current run.
- *Detail.* This is not "difference × months." It is a full recompute per past period:
  the revised gross changes PF, ESI, PT and TDS for each of those months, computed with
  the slabs and ceilings that were in force then (I3; §06.14 TV12). Worked at §08.12
  Example C.
- **AC-401.1** — A ₹60,000→₹70,000 revision effective 1 April, processed in July,
  recomputes April, May, June each against April/May/June rules; the arrears line shows
  the per-head delta (gross, PF, ESI, PT, TDS) per month, summed.
- **AC-401.2** — Arrears PF is **computed** against the wage months, and the rule
  versions, to which the arrears relate, but the PF **liability** on them dates from the
  **disbursal date**, not the wage month (Part E-9; §06.2). The PF due month is derived
  from the disbursal date held in the evaluation context (FR-PAY-210), and the product
  distinguishes true arrears (e.g., a revision) from merely belated salary, as EPFO's
  revamped-ECR FAQ does (§06.2). Arrears PF is **not** written into the monthly ECR files
  of the corrected months: EPFO takes arrears through a separate "File Arrear Return"
  flow whose layout is not published, so the arrear file generator is **fenced** (EV-043)
  and the arrears liability is carried on the filing ledger as BLOCKED-pending-layout
  (FR-PAY-711, FR-PAY-712) with its due month shown. Arrears TDS is trued-up in the
  current projection.
- **AC-401.3** — If a rule changed between the corrected period and today (e.g., a PT
  slab revision), the recompute uses the **old** slab for the old months (TV12).
- **AC-401.4** — When the arrears batch is **approved** (FR-PAY-301 M6), the approval
  artefact states the PF liability date computed from the planned disbursal date and the
  resulting due month, so the approver sees the cash and filing consequence before
  money moves; a change in the actual disbursal date re-derives it under AC-210.3.

**FR-PAY-402 · Retrospective statutory recompute** · **P1**
The engine shall support recomputing a closed period when a **rule** changes
retroactively (e.g., the 12% PF re-notified retrospective to 21.11.2025 by S.O.
3582(E), §06.9), producing the corrected figures and the delta to file. (Source: S.O.
3582(E), re-notification of EPF Scheme 2026 rate.)
- **AC-402.1** — Applying a retroactive rate change to a range of past periods produces,
  per period, the recomputed figures, the delta, and a filing-correction task
  (FR-PAY-708) routed by the EV-037 guards or to the fenced arrear flow (EV-043).

**FR-PAY-403 · Ad-hoc adjustments and recoveries** · **P0**
The engine shall support one-time **additions** (reimbursement top-ups, incentives) and
**deductions/recoveries** (salary advance recovery, notice-pay recovery, excess-payment
recovery, canteen/asset recovery) with their correct tax and wage-base treatment.
- *Detail.* Recoveries must respect the payment-of-wages deduction ceiling: total
  deductions in any wage period may not exceed 50% of wages, and any excess "may be
  recovered in such manner, as may be prescribed" (Code on Wages s.18(3)–(4), verified
  verbatim, r1). The prescribed manner under the Wages Rules is not captured, so the
  carry-forward method is held as `wages.deduction_overflow_method` and routed to §20 — a
  recovery that would breach the cap is flagged and spread, never silently applied.
- **AC-403.1** — A salary-advance recovery of ₹5,000/month reduces net by ₹5,000, does
  not reduce the PF/ESI/tax base (it is a post-tax recovery), and tracks the outstanding
  advance balance to zero.
- **AC-403.2** — A recovery that would push total deductions above the Code on Wages cap
  is blocked/spread with the ceiling shown, not silently applied.

**FR-PAY-404 · Arrears batches** · **P0**
The engine shall group arrears into **batches** keyed to an effective-from date — one
batch for all the employees a revision covers — processed per batch or per employee,
each producing a per-employee arrears statement, and each batch approved as one
correction run (FR-PAY-307).
- *Detail.* Arrears are a batch object, not a payslip line: greytHR models them as
  batches over an "Arrear Effective From" date, with downloadable statements and a
  separate path for new joiners' arrears (r3/02 finding 8; documentation read in the
  r3 capture, 2026, not executed). The batch is the unit the approver sees, so the PF
  liability date and due month derived from the batch's planned disbursal date appear
  once, on the batch (AC-401.4).
- **AC-404.1** — The arrears statement shows, per employee and per past wage month, the
  original and recomputed figures per head — gross, PF, ESI, PT, TDS — the delta, the
  rule version and day-rate convention each month used, and the batch total; it is the
  attachment to `SO-CORRECTION` (§03.6a).
- **AC-404.2** — An employee in two batches for overlapping months is refused in the
  second until the first is LOCKED; the second then diffs against the first
  (FR-PAY-301 concurrency rule 3).
- **AC-404.3** — A batch whose employees span EPF registrations produces one arrears
  ledger item per registration, each with its own due month; nothing is netted across
  registrations.

**FR-PAY-405 · LOP reversal** · **P0**
The engine shall restore LOP days deducted in a locked wage month — leave approved late,
an absence regularised — as a correction of that month (FR-PAY-307), computed under that
month's day-rate convention and rule versions and paid as a labelled line in a later run,
within a lookback set per tenant as `pay.lop_reversal_lookback_months`.
- *Detail.* greytHR documents LOP reversal as a first-class operation, governed by a
  "Reversal Month Range" setting with a minimum of 1 and a maximum of 12 months (r3/02
  finding 4; documentation read in the r3 capture, 2026, not executed). That range is
  one vendor's product setting, not a statutory limit; the product offers the same
  1–12 range as the tenant's choice, and a reversal older than the tenant's lookback is
  refused with the reason and can proceed only as a manual correction run with the
  approver's recorded reason. A reversal restores wages for a past month, so it is
  classified — belated salary by default (FR-PAY-406) — and its PF and ESI legs follow
  that classification's route, while its tax leg follows the payment date (§06.5).
- **AC-405.1** — Two LOP days in October 2026 (31 days) for an employee on ₹60,000 a
  month under C2, reversed in November, restore ₹60,000 × 2 ÷ 31 = ₹3,870.97 on the
  November payslip, labelled "LOP reversal — October 2026"; under C1 the same reversal
  restores ₹60,000 × 2 ÷ 30 = ₹4,000.00 (FR-PAY-109).
- **AC-405.2** — Where the PF ceiling binds in the reversed month, as it does at
  ₹60,000, the reversal moves no contribution but changes the month's NCP days. The
  engine records an NCP-only difference against the filed return, with no pay-side
  statutory delta. Whether EPFO expects a correction for NCP days alone is not
  captured, so the item goes to the §22 runbook and §20 V-23, never to a guessed
  return.
- **AC-405.3** — For Example I's ESI-covered employee on ₹20,000 under C1, reversing
  three October LOP days restores ₹2,000.00 of gross: PF wages rise ₹1,500.00, so
  employee PF ₹180.00, EPS ₹124.95 and employer EPF ₹55.05; ESI ₹15.00 employee and
  ₹65.00 employer, before `esi.rounding_rule`. The PF and ESI legs are held on the
  ledger under FR-PAY-406's route; ESIC's path for a late-paid month's contribution is
  not established (AC-305.2) and is routed to §20.

**FR-PAY-406 · Classifying a payment for a past month — true arrears or belated salary** · **P0**
Every line that pays wages for a past wage month shall carry a classification — **true
arrears** or **belated salary** — with its recorded basis, because EPFO's revamped-ECR
FAQ distinguishes the two and the route differs (§06.2 decision table, rows 7 and 8).
- *Detail.* True arrears — FAQ Q15's example is a revision (r5/02) — go to the arrear
  flow, whose due month the disbursal date sets and whose layout is unpublished, so the
  leg is fenced (EV-043; §05 F-03). Belated salary — the month's own wages paid late —
  is distinguished by the same FAQ, but its route is confirmed against the FAQ text
  before use (§06.2 row 8; §20). Until then a belated-salary line is held on the ledger
  with its classification, its wage month and its date of payment, and is written into
  no return.

| Line | Default classification | Basis | Route |
| --- | --- | --- | --- |
| Revision effective in a closed month (FR-PAY-401, FR-PAY-404) | True arrears | FAQ Q15's example | Arrear flow — fenced, BLOCKED-pending-layout (EV-043) |
| Rule change applied retrospectively (FR-PAY-402) | True arrears | As above | As above |
| LOP reversal (FR-PAY-405) | Belated salary | Wages the month earned and did not pay | Held until row 8 is confirmed (§20) |
| New-joiner catch-up (FR-PAY-407) | Belated salary | The month's own wages paid in a later run | Held until row 8 is confirmed; the design route is a Supplementary return for the wage month (EV-037) |
| Off-cycle pay for the month, locked before the month's Regular is generated | Neither — consolidated | AC-305.2 | The month's Regular return |

- **AC-406.1** — The operator may change a default classification only with a recorded
  basis and the approver's confirmation on `SO-CORRECTION`; the basis is shown
  wherever the line appears.
- **AC-406.2** — No held line reaches a return file until its route is confirmed; its
  PF figure, wage month and date of payment are shown on the ledger and the calendar,
  with the reason for the hold.

**FR-PAY-407 · New-joiner catch-up** · **P0**
A joiner whose date of joining falls after the month's inputs closed shall be paid for
those days in the next wage month's run as a labelled catch-up line, computed under the
joining month's convention and rule versions, without altering the joining month's
locked result or placing the joiner's first contributions in the wrong wage month.
- *Detail.* greytHR exposes a separate "Process New Joinee Arrears" path (r3/02
  finding 8; documentation read, not executed), which shows the case is common. The
  catch-up is belated salary (FR-PAY-406). EPFO takes contributions only from the valid
  date of joining (EV-040), and a member absent from every prior return for the joining
  month is what a Supplementary return carries (EV-037) — the design route, used once
  §06.2 row 8 is confirmed. The joiner's UAN is usually not yet allotted, because since
  1 August 2025 allotment is the employee's own act (AC-1004.2), so the line is also
  exclude-and-flag, with an M+4 deadline counted from the joining month (AC-701.2).
  Worked at §08.12 Example J.
- **AC-407.1** — Example J reproduces: the October 2026 payslip carries "Salary, 20–30
  September 2026" at ₹7,333.33 gross, September's locked result is unchanged, and the
  ledger shows the September line held with January 2027's Regular return — due 15
  February 2027 — as its M+4 deadline.

---

### 08.6 Reimbursements and Flexible Benefits (FBP)

Per §11, the FBP data model is P1 (build the model, defer monetisation) but its tax
treatment touches TDS, so the computation hooks are P0.

**FR-PAY-501 · FBP declaration and wallet** · **P1**
The engine shall let employees allocate a **flexible benefit budget** across declared
heads (fuel/conveyance, LTA, telephone, books/periodicals, meal cards, NPS employer
contribution, etc.), within statutory tax-exemption limits, and shall reflect the
declaration in the TDS projection.
- *Detail.* The 01.04.2026 expansion — meal perquisite ₹50→₹200 per meal, gift/voucher
  ₹5,000→₹15,000 per year (EV-019, **[Hypothesis]**: dated secondary sources, gazette
  text not read; §20 V-18) — is a config value in the exemption
  table, effective-dated, not a code change (§11). **The meal figure is only half the
  rule (K-19):** the exemption holds only for meals provided during working hours at
  office or factory premises, or for non-transferable vouchers usable only at eating
  outlets. Those conditions are **engine constraints on the wallet configuration**, not
  a wallet limit: a meal instrument configured as transferable, or redeemable outside
  eating outlets, is valued as a fully taxable perquisite. Without the constraints the
  perquisite is taxable, every affected payslip under-deducts, and the demand plus
  interest lands on the employer. The rule citation is routed to §20 validation
  (§06.13); no rule number is stated here.
- **AC-501.1** — An employee declaring ₹2,400/month meal-card allocation, on a card
  configured as non-transferable and usable only at eating outlets, has it treated as
  tax-exempt up to the ₹200-per-meal × working-meals limit; the excess is taxable and
  flows to TDS. The same allocation on an instrument that fails either condition is
  taxable in full, and the configuration screen says why.
- **AC-501.2** — The eligible-meal count §11 uses (BEN-37) is built from the same
  day-status counts as the day-rate conventions (FR-PAY-109) — working days net of LOP
  and holidays, times `meals_per_working_day` — so a month's LOP lowers the meal ceiling
  in the same run that lowers pay: at one qualifying meal a day and ₹200 a meal, 22
  working days give ₹4,400, and four LOP days bring it to ₹3,600 (BEN-37).
- **AC-501.3** — An attestation or delivery-mode fix takes effect from the next run
  (BEN-62); the runs before it stay taxable and are not reopened, because the exemption
  rests on a condition that did not hold when they were paid.
- *Why the conditions are engine constraints, in rupees (K-19).* Example F's employee,
  at a 20.8% new-regime margin, is paid ₹4,400 a month on a voucher missing either
  attestation. Exempting it anyway under-deducts ₹4,400 × 20.8% = ₹915.20 a month —
  ₹10,982.40 over a tax year, for one employee, before interest — and the demand lands
  on the employer. The ₹200 figure is EV-019, **[Hypothesis]**, and new-regime
  availability rests on professional commentary (§11, counsel to confirm), so the
  arithmetic shows the exposure's shape, never a figure quoted to a customer.

**FR-PAY-502 · Reimbursement claim and proof-of-spend** · **P1**
The engine shall accept reimbursement **claims with proof (bill upload)**, run them
through an approval workflow, and pay approved claims through payroll or off-cycle, with
the **tax-exempt vs taxable split** determined by proof and limit.
- **AC-502.1** — A ₹30,000 LTA claim with valid travel proof, within the block-year
  exemption, is paid tax-exempt; without proof it is paid as a **taxable** allowance and
  TDS is adjusted.
- **AC-502.2** — Unclaimed FBP balances at year-end are paid out as **fully taxable**
  special allowance and the TDS is trued-up in the final run of the tax year.

**FR-PAY-503 · Investment declaration and proof workflow** · **P0 (tax hook)**
The engine shall support the **declaration** (provisional, drives TDS from the start of
the year) and later **proof submission** (actuals, trues up TDS in the last quarter) for
old-regime Chapter VI-A and HRA claims.
- *Detail.* This was once mis-named as a P0 differentiator — against Zoho it is
  **table stakes**, present even in the free tier ([Killed] as a differentiator; Source:
  Zoho Payroll's rendered pricing page lists "Proof of investments approval" in its ₹0
  tier — pricing page read in the r2 capture, 2026, product not executed, r2/01 finding 5;
  §21.6). The declaration is
  Form 124 (ex-12BB) from Tax Year 2026-27 (EV-050). It is built because it is required
  for correct TDS, not because it wins deals. Phase-tagged **P0 (tax hook)**: the FBP UI
  is P1 but the declaration→TDS computation path is P0. The declaration window's lock
  date and the true-up month are employer choices (r3/02 finding 23). When an employee
  may switch regime is held as `tds.regime_switch_window`: Zoho's help documentation
  allows a switch only before the year's first payroll (r3 capture, 2026, documentation
  read, not executed; r3/02 finding 22), but that is one vendor's product rule, not a
  statutory one, and the legal position is routed to §20.
- **AC-503.1** — A declared ₹1,50,000 80C (s.123 from Tax Year 2026-27, r3/02 finding
  19) reduces monthly TDS from April (old regime); if proof of only ₹1,00,000 is
  submitted by the proof deadline, TDS in the employer's configured true-up month is
  increased to recover the shortfall.
- **AC-503.2** — HRA exemption is computed as the least of (actual HRA; rent minus a
  percentage of salary; a metro or non-metro percentage of salary) and drives the
  old-regime TDS base. The percentages and the metro-city list are held as
  `tax.hra.rent_offset_pct`, `tax.hra.metro_pct`, `tax.hra.nonmetro_pct` and
  `tax.hra.metro_cities`: v0.3's 10% / 50% / 40% and its 1961-Act s.10(13A) and
  Rule 2A citation are carried, not re-captured, **[Hypothesis]**, and a reported
  extension of the metro list was retracted in r1 for want of a legal anchor (§20).
  Landlord PAN is captured above the annual-rent threshold held as
  `tax.hra.landlord_pan_threshold` (₹1,00,000 in Zoho's declaration form, r3/02 finding
  21 — vendor help documentation read in the r3 capture, 2026, not a statutory source;
  confirmed against the Form 124 guidance note before use, §06.13).

**Form 124 claims on the §11.9.3 machines.** §11.9.3 specifies the tax-year cycle, the
declaration line and the proof line for FBP, and states that the FBP cycle rides this
FR's Form 124 calendar. Form 124 claims — the Chapter VI-A heads, HRA and house-property
interest — run on the same three objects, one cycle per tenant, pay group and tax year,
with these differences:

| Element | FBP, §11.9.3 | Form 124 claim, here |
| --- | --- | --- |
| What a line is | One benefit head's allocation | One claim head — s.123 (ex-80C), s.126 (ex-80D), HRA, house-property interest — labelled in both vocabularies (EV-050) |
| A head the elected regime does not allow | Offered only as a taxable allocation | Accepted, shown as "no effect under the elected regime", and fed only to the regime comparison (AC-205.1) |
| Basis before proof lock | `provisional_exemption_policy` | The same setting; "declared" is this FR's declaration-drives-TDS-from-April behaviour |
| The amount allowed | min(*Paid*, *Basis*, *Cap*) | min(*Basis*, the head's statutory limit); HRA is the least-of rule on the rent basis (AC-503.2); a house-property loss within `tax.house_property_loss_cap` (AC-205.8) |
| Evidence a proof line needs | The head's `proof_required` documents | The head's proofs; for HRA, rent evidence and — above `tax.hra.landlord_pan_threshold` — the landlord's PAN |
| Where the effect lands | The exempt/taxable split of the head's payments (BEN-39) | FR-PAY-213 step 4 at the next run; the proof-lock true-up in `true_up_month`, spread under RP6 |
| At exit | Unproven balances taxable in the F&F (BEN-86) | Final TDS on actual income with proof-verified claims (AC-801.3) |

- **AC-503.3** — §07's Example N reproduces on these machines: ₹1,50,000 declared under
  s.123 and ₹90,000 proved is "declared exceeds proofs" at proof lock, and the ₹60,000
  shortfall and the HRA exemption lacking a landlord PAN above the threshold leave the
  basis in the `true_up_month` run, whose re-projection (FR-PAY-213) recovers the tax
  over the runs that remain.
- **AC-503.4** — A new-regime employee's Form 124 lines move no TDS; the tax-projection
  statement shows them against the old-regime column only, so a switch inside
  `tds.regime_switch_window` re-values them without re-entry.

---

### 08.7 Payslips

**FR-PAY-601 · Payslip generation** · **P0**
The engine shall generate a per-employee **payslip** for each finalised run, itemising
earnings, deductions, employer contributions (informational), net pay in figures and
words, paid/LOP days, and YTD figures, in a **prescribed-compliant wage-slip format**
— in the central sphere, Form V under the Code on Wages (Central) Rules 2026 and Form XVI
under the OSH (Central) Rules 2026 — with the form number configurable per state,
because state rules prescribe their own forms (EV-053; §06.9).
- **AC-601.1** — The payslip reconciles: gross earnings − total deductions = net pay,
  to the rupee, matching the pay run.
- **AC-601.2** — The payslip shows the statutory identifiers required (UAN, PF number,
  ESI IP number where applicable, PAN) and the employer's establishment details.
- **AC-601.3** — Payslips are **immutable once published**; a correction produces a
  revised payslip with a visible revision marker, never a silent overwrite (I5).
- **AC-601.4** — The payslip prints the day-rate convention, the month's calendar
  days, paid days, LOP days and NCP days, and labels every line that relates to another
  wage month — arrears, an LOP reversal, a catch-up, a lagged LOP day from an offset
  attendance cycle — with that month (FR-PAY-109, FR-PAY-110, FR-PAY-405, FR-PAY-407).
- **AC-601.5** — Each deduction line carries the rule it came from and the input it
  read, so the employee can see which days were LOP and which declaration or proof
  moved the tax (the self-explaining payslip of r3/02's persona requirements;
  FR-PAY-603). A figure a configuration task still holds is marked provisional, with
  the parameter named (FR-PAY-1006).
- **AC-601.6** — YTD figures are the **tax year's** — not the calendar year's, not a
  rolling twelve months — and after a cutover they include the attested opening balances,
  marked as carried from the named prior system (FR-PAY-314). A payslip whose YTD starts
  at the cutover is a defect: it contradicts the tax-projection statement (FR-PAY-603),
  the year-end record (FR-PAY-719) and the certificate those feed.

**FR-PAY-602 · Payslip distribution and self-service** · **P0**
Employees shall access current and historical payslips through the employee surface
(web/mobile app), with password/OTP protection on downloads. The employee surface is
parity with Frappe's PWA (source repository read, not executed; r3 capture, 2026, r3/01
finding 14); whether TallyPrime ships employee self-service is one of the four
deliberately unresolved parity cells (EV-032) — Tally's marketing site describes a
self-service portal for which the r3 capture (2026) found no corroborating topic in
Tally's help documentation — so it is not claimed as a differentiator against Tally
(§04.1, §21.3).
- **AC-602.1** — An employee can retrieve any historical payslip for the retention
  period without an admin request.
- **AC-602.2** — An employee who has left keeps that access — payslips, the final
  payslip and the continuity packet (AC-802.2) — for as long as the rendered documents'
  retention class keeps them (§14.7); a payslip rendered again after erasure carries its
  re-rendering mark (I4).

**FR-PAY-603 · Tax-projection statement** · **P1**
The engine shall provide employees a **tax computation sheet** (both regimes, current
projection, declarations applied, TDS to date and remaining) so the payslip is
explainable.
- **AC-603.1** — The projection statement's remaining-months TDS sums with TDS-to-date
  to the projected annual liability under the elected regime.
- **AC-603.2** — The statement shows, for both regimes, FR-PAY-213's seven step
  values; each Form 124 claim with its proof state (FR-PAY-503); previous-employer
  income and tax from Form 122; TDS deducted by month with each payment's date; and the
  deductions still to come, run by run.
- **AC-603.3** — Before the proof lock, the statement shows what the monthly TDS becomes
  if the claims still pending are not approved — §11.9.3's "declared exceeds proofs"
  outcome — so the employee sees a true-up before it lands.
- **AC-603.4** — Every form and section label comes from the dual-vocabulary resolver
  for the period on screen (§06.5): "s.123 (earlier 80C)" on a Tax Year 2026-27
  statement, "80C" alone on an FY 2025-26 one.

---

### 08.8 Statutory returns and certificates

This is the delivery layer — the artefacts §01 and §04.1 say the customer actually pays
for. The computation is §06; this group specifies **generation, validation, attended
submission support and correction** of each return. The engine generates the artefact
and mirrors the checks the portal is documented to run; **submission is an attended
portal session** —
performed by the employer, or by our operator under the employer's written authority to
act — because we are not aware of any statutory portal offering a submission API as of
September 2026, and the employer's and deductor's liability is non-delegable (K-13;
runbooks in §22; legality under counsel review, §23.13, Part D-17). The operator path
(§22's Mode C) is **fenced per portal until counsel clears Part D-17** — for the
income-tax upload additionally on the e-Return Intermediary question — so at launch
the employer's own user submits while we prepare, pre-validate and guide (§22
FR-OPS-001); the payment leg is the employer's in every mode. All file layouts are **versioned schemas** (I2, §06.12 R6):
field numbers are never hard-coded. Every filing moves through the filing-instance state
machine (FR-PAY-711).

<!-- DIAGRAM: journey-month-end-filing -->

**FR-PAY-701 · EPF ECR return file, part-payment file and attended return flow** · **P0**
The engine shall generate the **Electronic Challan-cum-Return (ECR)** return file exactly
to the published layout (EV-035) and, as a separate export, the part-payment
contribution file (EV-044); pre-validate both against the checks EPFO runs, at EPFO's
own block/flag severity (EV-040); and support the attended upload → validate → return
statement → approve → Due Deposit Balance Summary → challan with TRRN → pay → receipt
flow (EV-036), reconciling the portal's return statement and challan against the
computed contributions. The engine does not submit; the upload is an attended session
(K-13, §22).
- *Detail.* ECR is the master EPF filing (§06.2), contributions due by the 15th, built
  against **Scheme 2026** (§06.9; Source: EPF Scheme 2026 / S.O. 3582(E)). The
  re-engineered ECR (beta, from wage month September 2025) changed workflow, validation and the
  payment lifecycle but **not** the file layout (EV-035), so the generator is buildable
  now and is no longer fenced (§05.5 item 3); the engineering effort is in the state
  machine, sequencing and pre-validation, not in file I/O. EPFO mandates no filename
  pattern (EV-035); the upload notice requires an alphanumeric filename, a lowercase
  `.txt` extension, at most 8 MB, compression above 2 MB, and exactly one text file per
  zip (r5/02 finding 5). NIL months use no file (EV-042, FR-PAY-712); arrears are not in
  this file (EV-043, FR-PAY-401); VPF and International Workers stay within it (EV-045).
- **AC-701.1** — The file's member lines sum to the computed contributions and, after
  upload, to the portal's return statement and Due Deposit Balance Summary (EV-036);
  employer EPS never exceeds ₹1,250 per member (the §06.2 TV1 negative test surfaced at
  file level).
- **AC-701.2** — Members with **un-seeded/KYC-incomplete UANs** are flagged **before**
  file generation (§06.12 R9), not after portal rejection. The default is
  **exclude-and-flag**, with notices to the operator and the employee — **never a
  payroll block**, because the product treats Aadhaar as optional in EPF flows too
  (Part E-11; §06.2; §06.14 TV13). Whether Aadhaar submission may be made a condition of
  payroll or of a benefit is not stated here (Part D-10), and no hard-block configuration
  ships; the alternatives and the final choice sit with counsel (§07, §23). The
  exclusion carries a clock: an excluded member is still an active member of month M
  with no return, so month M+4's Regular return cannot be filed until the member is
  seeded and a Supplementary return for month M carries them (EV-037, EV-038). Every
  exclusion therefore records its **M+4 deadline** — the due date of the Regular return
  four months on — and escalates the seeding task against it from the day of exclusion
  (§06.2, §06.12 R30, TV34). That an excluded member counts as "active" for the M−4 test
  is an inference from the rule's wording, confirmed on a live portal through §20; the
  product assumes it until then, because the opposite assumption fails silently four
  months later.
- **AC-701.3** — The engine can reproduce a **3A/6A-equivalent register** for audit and
  for Tally migration (§06.12 R10).
- **AC-701.4** — The return file is one line per member, **no header row**, exactly
  **11 fields** in the EV-035 order — UAN; Member Name as per UAN; Gross Wages; EPF
  Wages; EPS Wages; EDLI Wages; Employee PF Contribution; Employer EPS Contribution;
  Employer PF Contribution; NCP Days; Refund of Advance — separated by the
  **three-character** delimiter `#~#` (10 delimiters per line), with Gross Wages always
  populated. The EPFO Help File sample line reproduces byte-identically (§06.14 TV16).
- **AC-701.5** — Wage Month, Return Type (Regular / Supplementary / Revised),
  Contribution Rate (12% or 10%) and Remark are surfaced to the operator at export time
  as the values to enter in the portal's form controls, and are **never** written into
  the file (EV-035).
- **AC-701.6** — Pre-validation mirrors EPFO's severity exactly (EV-040). Among the EPS
  rules **only one blocks**: EPS for a member who has attained 58 and is not marked for
  deferred pension (AC-202.6). The post-01.09.2014 high-earner rule is a **flag, never a
  block**: EPFO flags such EPS before filing but accepts it, so the engine — which
  computes EPS = 0 for these members itself (AC-202.4) — raises the same flag on any line
  where EPS survives (a manual override, imported history) instead of refusing the file.
  Beyond EPS, EPFO permits contributions only between the valid date of joining and date
  of leaving, and only at the statutory rate or higher (EV-040); the engine checks both
  before export. An exempted establishment still populates EPF wages, PF contribution,
  EPS wages, EPS contribution and EDLI wages (r5/02 finding 12). The engine adds no
  block EPFO does not impose.
- **AC-701.7** — **[P1]** The part-payment contribution file is a separate export with
  its own fixtures: 6 fields separated by `#~#` — UAN, MEMBER_NAME, EPF_CONTRIBUTION,
  EPS_CONTRIBUTION, EPF_EPS_DIFF_CONTRIBUTION, REFUND_OF_ADVANCES (EV-044). Its upload
  screen carries only Wage Month, Contribution File and Remark (r5/02 finding 6).
- **AC-701.8** — The payment step shows the **s.7Q interest** the portal auto-calculates
  as mandatory with the monthly contribution, in both the payment screen and the
  cash-flow forecast; **s.14B damages**, which the employer may deposit forthwith or
  later, are tracked as an open liability until paid (EV-039). Multiple challans per
  wage month are permitted (EV-036), and EPFO only advises employers to avoid paying
  twice for the same employee (r5/02 finding 8), so a second payment covering the same
  member and month is a **flag, not a block**: it is shown as a potential duplicate
  (SA-REC) and proceeds only on the named approver's recorded confirmation — consistent
  with AC-701.6, since EPFO imposes no such block.

**FR-PAY-702 · ESI challan/return** · **P0**
The engine shall prepare the monthly **ESI contribution** upload from ESIC's template,
due by the 15th of the following month — submitted in an attended session on the ESIC
portal, where the challan is generated (K-13, §06.3, §22) — and the half-yearly
reconciliation view across the two contribution periods (§06.3).
- **AC-702.1** — Contribution-period boundary re-evaluation (FR-PAY-203) is reflected:
  an employee held to the boundary appears in the correct months' filings (TV3).
- **[Hypothesis / blocked]** — **AC-702.2** — Post-22-Nov-2026 ESI computation and
  filing depend on the unresolved successor to the one-year saving (§06.9, §06.13,
  §20 V-08). **Kill/gate criterion: ESI filing for periods after the cliff must be
  escalated and blocked, not guessed, if no successor instrument is notified** — the
  filing instances go `BLOCKED-pending-regime` while computation follows the tenant's
  `esi.post_cliff_mode` (AC-203.4). This is a filing-correctness blocker on the
  validation gate, never a hold on salaries (FR-PAY-1004).
- **AC-702.3** — While ESIC's monthly contribution template is unconfirmed (§05 fence
  F-05), the engine produces the month's contribution as a worksheet — per insured
  person, the ESI wage base, each side's contribution and the contribution-period
  state (AC-702.1) — for the operator to key into the portal in the attended session,
  and VG-S1 reconciles what the portal then shows against it. No upload file is
  generated until the template is captured and versioned as `esic_mc_template_version`;
  the worksheet never guesses its columns.

**FR-PAY-703 · Professional Tax returns** · **P0**
The engine shall generate the **PT return and challan data per state**, on that state's
frequency and due date (monthly/annual; Maharashtra assigns frequency per registration
each year, §06.4), with one-click export for the CA console (§16). Each state is its own
manual portal, so submission is attended, one portal per state (K-13, §22).
- **AC-703.1** — A multi-state tenant gets one PT return per state per that state's
  cadence, each reconciling to the PT deducted from employees in that state.

**FR-PAY-704 · LWF remittance** · **P1**
The engine shall generate the **LWF remittance** per state on that state's periodicity
(§06.8).
- *Detail.* Relabelled from P0 per §05.17 PR-03: no state's LWF row is sourced yet, so
  the per-state machinery is built under §05.5 item 7 — a published state pack switches
  a state on without a deploy — and the remittance ships in R2 per design-partner state
  (§05 A-17; fence F-07[state]). The deduction and accrual stay with FR-PAY-207.
- **AC-704.1** — LWF remittances appear only for LWF states and only in the correct
  periods — Karnataka once a year, due 15 January (periodicity **[Verified]**, §06.8);
  half-yearly states such as Maharashtra (June/December, **[Hypothesis]**) only in their
  deduction months.

**FR-PAY-705 · Statutory bonus return and registers** · **P2**
The engine shall generate the **statutory bonus registers and the annual bonus return**
the period's regime requires, and schedule the payout by the configured deadline.
Relabelled from P0 per §05.17 PR-02: the return and the legacy registers are §05 A-27,
deferred behind fence F-09 until `bonus.annual_return_form` carries a verified source;
the bonus computation and its payout scheduling stay P0 under FR-PAY-208, as a
labelled provisional computation on an operator-confirmed ceiling (§06.7). For
legacy accounting years that is the **Form D** return with the legacy registers
maintained, and payout within 8 months of the accounting year's close (30 November for
April–March) — legacy practice per compliance blogs (r1, low); the register form letters
and the Payment of Bonus Rules citation v0.3 gave are carried, not re-captured, and are
held in `bonus.legacy_register_forms`. For Code-era years the deadline and
the return are unresolved, so they are the named parameters `bonus.payment_deadline`
and `bonus.annual_return_form`, never hard-coded, and routed to §20 (§06.7, §06.11).
- **AC-705.1** — The bonus return reconciles to the bonus computed under FR-PAY-208 and
  to the bonus payout run; ineligible employees paid ex-gratia are excluded; a Code-era
  return is not generated until `bonus.annual_return_form` carries a verified source.

**FR-PAY-706 · TDS — Form 138 (ex-24Q) quarterly statement, Q1–Q3; Q4 fenced** · **P0**
The engine shall generate the quarterly TDS statement (**Form 138**, ex-24Q; Rule 219 of
the Income-tax Rules 2026, EV-049) for **Q1–Q3** in the versioned layout, with challan
reconciliation, and support the **correction-statement** structure. The artefact is the
statement `.txt` ready for validation: the **deductor** runs the File Validation Utility
and uploads — or our operator does so in an attended session under written authority,
once that path's counsel fence and the e-Return Intermediary question clear (K-13,
Part D-17, §22). The **Q4 generator is fenced** (EV-046).
- *Detail.* Form 138 is a **breaking layout change** (EV-051): challan sub-headings
  301–312 remap to A–K with 303 removed; Annexure I 313–327 remap to C–N with 313, 321,
  322 and 325 removed; Surcharge, Education Cess and Penalty/Others are deleted; Interest
  Allocation and Others Allocation are added; Token No. becomes "Return Receipt Number";
  TAN Registration No. is deleted; the form auto-populates from the deductor's TRACES
  profile. Physical format: ASCII `.txt`, `^`-delimited variable-width fields, every
  record CRLF-terminated, record types FH / BH / CD / DD, file type `SL1` (EV-051). Form 138
  has **three annexures** — Annexure I every quarter; Annexure II (salary summary) and
  Annexure III (pension and interest of specified senior citizens) in Q4 only (EV-047).
  The Q1–Q3 regular format file is dated 22 July 2026 and the Q1–Q3 correction format
  file 4 August 2026 (the dates in Protean's download filenames; r5/02 findings 19–20);
  Protean's page labels the
  Q1–Q3 format "Version 1.2" while the workbook itself says "Version 1.1", so versions
  are pinned to the downloaded artefact, not the label (r5/02 finding 35). **Dual FVU
  stack (EV-052):** RPU 1.2 + FVU 1.2 for Tax Year 2026-27 onward; RPU 6.0 + FVU 9.5 for
  FY 2010-11 to FY 2025-26; mixing them causes rejection, so every statement — original
  or correction — routes by its **period**, never by today's date. Labels, search and
  imports accept both vocabularies (EV-050).
- **AC-706.1** — Field mapping is **schema-driven**; no field number (301–312 etc.) is
  hard-coded — swapping the schema version reshapes the file without a code change
  (§06.12 R6). Protean's `138RQ1.txt` sample is a golden fixture for the Q1–Q3 writer
  (r5/02 finding 30).
- **AC-706.2** — Challan totals reconcile to deducted-and-deposited amounts before the
  file is emitted, using the mandatory `.csi` import from the TIN Challan Status Inquiry
  (the TAN and TAN name in the statement must match the `.csi`); a mismatch blocks
  generation (r5/02 finding 30; §06.5).
- **[Verified as absent]** — **AC-706.3** — The **Q4 regular format and the Q4
  correction format are both unpublished** ("Expected to be released soon", no link;
  re-checked September 2026, EV-046). Q4 (Annexures II and III) is a pluggable schema
  slot the engine loads when the format is released; until then Q4 generation is
  **BLOCKED-pending-layout** (FR-PAY-711), visible on the filing calendar (§06.11) and to
  the statutory-change watcher (§22). The legacy 24Q Q4 layout is never used as a proxy
  (§06.12 R16). The Q4 due date (31 May of the year following the Tax Year, EV-049) sits
  fifteen days before the Form 130 date, so the two cannot be planned apart.
- **AC-706.4** — A statement for FY 2025-26 or earlier (an original or a correction)
  belongs to the legacy 24Q family and RPU 6.0 / FVU 9.5; a statement for Tax Year
  2026-27 onward is generated as Form 138 and routed to RPU 1.2 / FVU 1.2; the product
  surfaces the FVU/RPU version to use and never mixes the two (EV-052). The legacy
  writer is deferred (§05 A-28, settling §22.12 O22): the legacy correction layout is
  not in this PRD's evidence base, so a correction for a quarter a prior system filed
  is recorded as a diff, labelled with the legacy stack it must use and handed to the
  prior vendor or the tenant's CA. No legacy file is generated until its layout is
  captured through §22.

**FR-PAY-707 · Annual certificate — Form 130 (ex-Form 16): data preparation and distribution** · **P0**
The engine shall **prepare the Form 138 data from which TRACES builds Form 130**, and
**distribute** the TRACES-downloaded, signed certificate to each employee by 15 June of
the year following the Tax Year (Rule 215 of the Income-tax Rules 2026; §06.5). It shall
never generate the certificate itself.
- *Detail.* **[Reversed]** Earlier drafts had the engine generate Form 130 Part A
  (TRACES-sourced) and Part B (the annual salary/tax computation). Two findings reverse
  that. Form 130 is **valid only if generated from TRACES** and signed by the deductor
  (EV-048). And it has **Part A, Part B and Part C** — the per-employee salary breakdown
  sits in Part C Annexure-I, not Part B (EV-048; r5/02 finding 23). TRACES prepares Form
  130 from Annexure I (quarterly) and Annexure II (Q4) of Form 138, so the certificate is
  downstream of the fenced Q4 statement (EV-046). The product's role is the data that
  TRACES reads, the reconciliation around it, and distribution of what TRACES issues.
- **[Verified as blocked]** — **AC-707.1** — For **Tax Year 2026-27 onward**, Form 130
  preparation is **BLOCKED-pending-layout** until the Q4 Form 138 format is published
  (EV-046; §06.12 R16) — never emitted with guessed fields. For FY 2025-26 and earlier,
  the legacy 24Q / Form 16 stack applies (EV-052).
- **AC-707.2** — Before distribution, the certificate's figures reconcile to the four
  quarterly statements and to the sum of the year's payslips under the elected regime; a
  mismatch holds distribution and names the difference. A certificate not downloaded
  from TRACES is never distributed.

**FR-PAY-708 · Correction / revised returns** · **P0**
The engine shall generate the correction artefact the portal accepts for any filed
return when a correction run (FR-PAY-306) or retro recompute (FR-PAY-402) changes a filed
period, recording each correction in our ledger as a **diff** against the filed return,
never a mutation of it (§06.12 R14). For the ECR the routes are the EV-037 return types:
a **Supplementary** return (needs an approved Regular; only members absent from every
prior return for that month; may be filed repeatedly) or a **Revised** return (needs an
approved Regular, no other return in process and **no payment initiated**; it overwrites
the portal's data). For Form 138 the route is a correction statement on the period's
format family (EV-052) — the Q1–Q3 correction format (4 August 2026) for Tax Year
2026-27, held until the portal enables such filings (AC-708.3), while the Q4
correction format is unpublished and fenced (EV-046).
- **AC-708.1** — Correcting an approved April ECR produces a Supplementary or Revised
  return within the EV-037 guards, never a duplicate Regular return; an arrears
  recompute is routed to the fenced arrear flow (EV-043, FR-PAY-401), not into the April
  file.
- **AC-708.2** — A downward ECR correction requested after payment initiation is refused
  with the reason (EV-037). **[Hypothesis]** — EPFO's circular (para 5(ii)) states
  upward revision has no such restriction while para 5(iii) requires no payment
  initiated for any Revised return, and the FAQ hedges upward revision after payment to
  "in many cases" (r5/02 finding 9). The product does not rely on post-payment upward
  revision; **kill/validate via §20 against a live portal before offering it.**
- **[Verified]** — **AC-708.3** — A published correction format is not the same as a
  portal that accepts corrections. On 1 September 2026 the income-tax e-filing portal
  stated that filing of TDS/TCS correction statements for Tax Year 2026-27 "will be
  enabled shortly" (r1/06 finding 33), although the Q1–Q3 correction format is
  published (4 August 2026). Until enablement is recorded through the watcher (§22), a
  Tax Year 2026-27 Form 138 correction is generated, validated against the period's
  format and **held** with that reason — never submitted, never counted as filed, and
  shown on the filing calendar against its period (§06.5, §06.12 R35, TV45). FY 2025-26
  and earlier corrections take the legacy route of AC-706.4, whose writer is deferred
  (§05 A-28).

**FR-PAY-709 · The statutory registers — six employer registers plus the wage slip** · **P0**
The engine shall maintain the **six employer registers plus the wage slip** as one
canonical set, derived from pay-run and attendance data, not hand-maintained (EV-053):
Wages Rules 2026 r.51(1) Forms I, IV and IX plus the Form V wage slip; OSH Forms XIII,
XIV, XV, XIX and XX plus the Form XVI wage slip; SS r.53(1)(a) Form XXII. Form numbers
are configuration per state. Retention follows each rule-set's own wording, not a flat
five years (EV-054). **[Reversed]** Earlier drafts specified "four consolidated
registers with five-year retention"; §06.9 withdraws that framing.
- **AC-709.1** — Each register is reproducible for any month in the retention window and
  reconciles to the corresponding pay runs and filings; Form IX carries per-day IN and
  OUT timestamps (EV-055, §09 owns the time model); a finalised register is immutable.
- **AC-709.2** — Retention is per rule-set: "five years after the date of last entry"
  (Wages r.51(4)) or "five calendar years from the date of last entry" (OSH r.72(1)(vii),
  SS r.53(1)(e)); OSH r.76(2) bars destruction even after five years unless transferred
  to a new register (EV-054). State-sphere periods are unknown and go to counsel (§23);
  no other retention period is hard-coded (Part D-11).

**FR-PAY-710 · Filing calendar and status tracking** · **P0**
The engine shall present the **per-(tenant × state × obligation) filing calendar**
(§06.11) with each filing instance's state from the filing state machine (FR-PAY-711) —
including REJECTED, SUPPLEMENTARY, REVISED and BLOCKED with its reason
(pending-layout / pending-regime / chronology / joint-declaration) — and shall surface
the headline metric **"filings completed on time"** (§01, §19).
- **AC-710.1** — A rejected filing (e.g., an ECR upload failing validation on an
  un-seeded UAN) shows the rejection reason and the remediation task, and does not count
  as "completed" (§01 AC-01.2).
- **AC-710.2** — The calendar correctly renders **state-varying** PT/LWF/bonus due dates
  and the **Q4 Form 138 / Form 130 BLOCKED-pending-layout** and **post-cliff ESI
  BLOCKED-pending-regime** states.

The central (non-state-varying) due dates the calendar seeds from — each an
effective-dated rule (I2), each a filing whose on-time completion is the headline metric
(§01, §19):

| Filing | Statutory due date | Cadence | Source cue |
| --- | --- | --- | --- |
| EPF ECR return, approved before the challan; s.7Q interest paid with the contribution | 15th of following month | Monthly | EPF Scheme 2026 (§06.2); EV-036, EV-039 |
| ESI contribution | 15th of following month | Monthly | ESI subordinate law saved to the cliff (§06.3, §06.9) |
| TDS deposit | 7th of following month (30 Apr for March) — carried from the 1962 Rules | Monthly | Income-tax Rules 2026 r.218 — the dates are **[Hypothesis]** until read against r.218 (§06.5, §06.13) |
| Form 138 (ex-24Q) | 31 Jul / 31 Oct / 31 Jan; 31 May of the year following the Tax Year | Quarterly | Income-tax Rules 2026 r.219 (EV-049); Q4 BLOCKED-pending-layout (EV-046) |
| Form 130 (ex-Form 16) — TRACES-generated; distribution | 15 June of the year following the Tax Year | Annual | Income-tax Rules 2026 r.215 (EV-048); BLOCKED behind Q4 for Tax Year 2026-27 |
| Statutory bonus payout and return | `bonus.payment_deadline` (legacy: 30 November) | Annual | Code on Wages s.26; legacy POB practice, r1 low (§06.7) |
| PT return | State-specific; per registration where the state assigns it | Per state | State PT Acts (§06.4) |
| LWF remittance | State-specific (Karnataka: 15 January) | Per state | State LWF Acts (§06.8) |

- **AC-710.3** — For each filing the calendar computes the due date from the
  effective-dated rule (never a hard-coded constant), rolls a due date falling on a
  Sunday/gazetted holiday to the next working day where the statute so provides, and
  surfaces the **late-filing exposure** so a slip is quantified, not merely flagged:
  simple interest at 12% p.a. on late EPF and ESI deposits, notified by S.O. 2698(E)
  (§06.2, §06.3) — **[Verified — mirror]**, read through a professional alert quoting
  the notification; pull from the primary source before customer use — and, for EPF,
  auto-calculated by the portal and payable with the contribution, so the engine's
  figure is a forecast and the portal's governs (EV-039; §06.12 R32); EPF and ESI
  damages read `epf.damages_scale` and `esi.damages_scale`, which ship with no default,
  so the exposure is shown as "rate unverified" until the Code-era scale is confirmed
  (**[Hypothesis]**, §06.13 — v0.3's graded-by-delay legacy percentages are carried, not
  re-captured, and are never quoted to a customer as current); the TDS late-statement
  fee under 1961-Act s.234E reads `tds.late_fee_per_day` and `tds.late_fee_cap`, whose
  carried ₹200-a-day figure rests on a secondary source (**[Hypothesis]**, not
  primary-verified, 2025-Act equivalent unmapped; §06.5). Any exposure figure shown to
  a customer is product surface with a named owner and clears the §23 claim rule first
  (Part D-20).
- **AC-710.4** — The calendar's blocked view lists held instances beside BLOCKED ones
  (settling §22.12 O18): a Tax Year 2026-27 Form 138 correction generated, validated and
  held until the portal enables such filings (AC-708.3; §05 fence F-02) shows its fence,
  its period and its exposure clock, and so do the held belated-salary lines of
  FR-PAY-406, so that nothing held reads as done.

**FR-PAY-711 · Filing-instance state machine** · **P0**
Every filing instance — one registration × obligation × period — shall move through
explicit, logged states: **SCHEDULED, BLOCKED, GENERATED, VALIDATED, SUBMITTED,
REJECTED, ACCEPTED, REVISED, SUPPLEMENTARY, PAYMENT_INITIATED, FILED** (Part E-1). Only
FILED counts toward "filings completed on time" (§01 AC-01.2, §19), and the metric's
rejection and correction counts are computed off REJECTED, REVISED and SUPPLEMENTARY.
- *Detail.* **[Reversed]** An earlier draft's filing machine (draft → generated →
  validated → submitted → acknowledged → corrected) had no REJECTED state, so the portal
  rejection rate §01 names could not be computed from it, no payment-initiation state,
  and no Supplementary or Revised return types (r5 engineer review). Here a correction is
  a new attempt linked to the accepted one and recorded as a diff (§06.12 R14), even
  where the portal itself overwrites. The diagram illustrates; the table specifies.

<!-- DIAGRAM: fr-payroll-filing-state-machine -->

| # | From → To | Event | Guard | Side effect | Who may trigger |
| --- | --- | --- | --- | --- | --- |
| F1 | *(none)* → SCHEDULED | Payroll month opened (FR-PAY-301 M1), or the calendar rolls a quarterly or annual instance | Obligation latched for the registration (§06.1) | Due date computed (FR-PAY-710) | System |
| F2 | SCHEDULED → BLOCKED | A guard fails | Format unpublished (Form 138 Q4 and Tax Year 2026-27 Form 130, EV-046; ECR arrear return, EV-043); regime unresolved (post-cliff ESI, §06.9); chronology gap (FR-PAY-712); joint declaration pending (EV-041) | Reason, owner and unblocking trigger recorded; the deadline clock stays visible | System |
| F3 | BLOCKED → SCHEDULED | Guard clears | A published rule or format version (§22), a closed ledger gap, or an accepted joint declaration | Instance re-evaluated | System, or payroll operator |
| F4 | SCHEDULED → GENERATED | Generate | Source payroll month(s) LOCKED; the format version for the **period** resolved (EV-052) | Artefact generated from the locked snapshot; format version and snapshot bound to it | Payroll operator |
| F5 | GENERATED → VALIDATED | Validate | Format checks (EV-035, EV-044, EV-051), EPFO severity mirror (EV-040), `.csi` challan match for TDS (FR-PAY-706) | Flags recorded for acknowledgement; a block stops here | System |
| F6 | VALIDATED → SUBMITTED | Upload in an attended session | Return type chosen within the EV-037 guards; where our operator submits (Mode C), written authority to act is on file **and** the portal's counsel fence is recorded as cleared (Part D-17, §22 FR-OPS-001, §23.13) — otherwise the session runs employer-attended | Session logged — who, in which delivery mode, on whose credentials, when, which file (§22) | Employer (Modes A and B); our operator only in Mode C once its fence clears |
| F7 | SUBMITTED → REJECTED | Portal rejects the upload or return; or, for the ECR, the employer rejects the portal's return statement at reconciliation (§22.4.1 step 9, settling §22.12 O17) | — | Reason or error file captured and mapped to employee records; an employer rejection records the unexplained difference (SA-REC). Both count in the rejection count (§19) | Operator records; system parses |
| F8 | REJECTED → GENERATED | Fix and regenerate | Fix made through identifier state or a correction run, never by editing the locked snapshot | New attempt linked to the rejected one | Payroll operator |
| F9 | SUBMITTED → ACCEPTED | Portal accepts; for the ECR, the employer approves the return statement | — | Acknowledgement captured — return file ID and, at challan, TRRN for the ECR (EV-036); Return Receipt Number for Form 138 (EV-051). An approved ECR return can never be cancelled (EV-036) | Employer approves on the portal; operator records |
| F10 | ACCEPTED (ECR) or FILED (Form 138) → REVISED | Revised return or correction statement raised | ECR: approved Regular exists, no other return in process, **no payment initiated** (EV-037). Form 138: the correction format for the period is published (Q4 correction fenced, EV-046) | Correction generated as a diff against the accepted return; a Tax Year 2026-27 Form 138 correction the portal cannot yet take is generated, validated and **held** with its reason, not submitted and not counted (AC-708.3) | Payroll operator plus approver |
| F11 | REVISED → ACCEPTED or FILED | Revision accepted | — | Ledger keeps the prior and the revised return; the diff is the audit record | Operator records |
| F12 | ACCEPTED or FILED → SUPPLEMENTARY | Supplementary ECR raised | Approved Regular exists; only members absent from every prior return for the month (EV-037) | Supplementary generated; repeatable | Payroll operator plus approver |
| F13 | SUPPLEMENTARY → FILED | Supplementary accepted and, where it carries a payment, receipted | — | — | Operator records |
| F14 | ACCEPTED → PAYMENT_INITIATED | Initiate payment on a payment-bearing filing | The head's part of the month's verification gate has passed (FR-PAY-301 M10; FR-PAY-309) | Challan with TRRN; from here a Revised ECR is impossible (EV-037) | Named approver; the payment leg is executed by the employer in an attended session (§22 FR-OPS-001) |
| F15 | PAYMENT_INITIATED → FILED | Payment receipt captured | Acknowledgement and receipt stored and reconciled | Terminal for the on-time metric | System, or operator |
| F16 | ACCEPTED → FILED | Filing without a payment leg accepted (e.g., a Form 138 statement, whose deposits preceded it) | Acknowledgement stored and reconciled | Terminal for the on-time metric | System, or operator |
| F17 | VALIDATED → PAYMENT_INITIATED | Initiate payment on a payment-only instance — the monthly TDS deposit, or an EPF NIL month's Direct Challan Entry (EV-042) | The head's part of the month's verification gate has passed (FR-PAY-309) | Challan identification captured — the CIN for TDS (AC-902.1), the receipt for Direct Challan Entry; F15 then records FILED | Named approver; the employer pays (§22 FR-OPS-001) |

- **AC-711.1** — The on-time count, the rejection count and the correction count for any
  period are reproducible from the transition log alone (§19).
- **AC-711.2** — No transition skips a state: an artefact cannot be SUBMITTED without
  VALIDATED, and cannot be FILED without a stored acknowledgement.
- **AC-711.3** — A REVISED transition on an ECR instance whose payment has been initiated
  is refused with the EV-037 reason; the operator is offered the routes that remain
  (Supplementary for absent members; the fenced arrear flow).
- **AC-711.4** — An obligation has one of three shapes, fixed in its rule row: return
  then payment (the ECR, the ESI contribution, a PT return with its challan) runs F4 to
  F9 and then F14; return only (a Form 138 statement, whose deposits preceded it) runs
  F4 to F9 and then F16; payment only (the monthly TDS deposit, Direct Challan Entry)
  runs F4, F5, F17 and F15, and never passes SUBMITTED or ACCEPTED because it has no
  return. An instance cannot take a path its shape does not have.

**FR-PAY-712 · Per-establishment ECR filing ledger** · **P0**
The engine shall keep, per EPF establishment, an **unbroken, month-by-month filing
ledger** that refuses silent abandonment (Part E-10, EV-038): every wage month from
coverage onward carries an entry, and the ledger enforces EPFO's chronological rule
before EPFO does.
- *Detail.* The revamped ECR mandates strict month-wise chronological filing. After a
  four-month transitional relaxation, a Regular return for month M is allowed only if
  returns for **all active members of month M−4** have been filed, so a skipped month
  blocks later months (EV-038); the exit-marking relaxation also expires after four
  months (r5/02 finding 10). A date of exit recorded in error can be corrected only by a
  **joint declaration** of employer and employee — an offline dependency that can stall
  a month (EV-041). NIL months use no file: admin and inspection charges go through
  Direct Challan Entry, enabled only when there are no active members (EV-042).
- **AC-712.1** — Every wage month from the establishment's coverage date to the current
  one has exactly one ledger status — in progress (a FR-PAY-711 state short of FILED),
  FILED, NIL, or BLOCKED with an owner and a reason. A month cannot be deleted or
  skipped, "abandon" is not an available action, and a later month's Regular return is
  not generated while an earlier month has none (strict month-wise chronology, EV-038).
- **AC-712.2** — The dashboard warns, before the window, when an unfiled month will block
  a later month's Regular return under the M−4 rule, naming the members and the month.
- **AC-712.3** — An exit date recorded in error puts the member's later months into
  BLOCKED-joint-declaration with an offline task for employer and employee; no
  contribution for any period after the recorded exit date is attempted until the
  correction is accepted (EV-041). Marking a date of exit needs no member-detail or
  Aadhaar update (EV-041).
- **AC-712.4** — A NIL month generates no file; the operator is routed to Direct Challan
  Entry for admin and inspection charges, and the ledger records NIL with the receipt
  (EV-042).
- **AC-712.5** — Each ledger entry stores return type, return file ID, TRRN, approval
  timestamp and every linked Supplementary or Revised return; a post-approval correction
  appears as a diff against the approved return, never a replacement of it (§06.12 R14).
- **AC-712.6** — For every active member of a wage month m without a return — an
  exclusion, an unmarked leaver, a held catch-up — the ledger computes the month whose
  Regular return it will block, m+4, and that return's due date, and lists them in date
  order, each linked to its seeding, exit-marking or route-confirmation task. Example
  J's September 2026 joiner blocks January 2027's Regular return, due 15 February 2027.

**Items on the ledger that are not returns — data definition.** Several requirements
put a figure on the establishment's ledger instead of into a return. Each is one kind
of record:

| Kind | Created by | Holds | Leaves the ledger when |
| --- | --- | --- | --- |
| Exclusion | AC-701.2 | Member, wage month, M+4 deadline, the interest forecast (§06.2) | A Supplementary carrying the member is FILED |
| Arrears item | AC-401.2; FR-PAY-404 | Registration, wage months, PF figures per ECR field, the due month from the disbursal date, fence F-03 | The arrear layout is published and its return is FILED |
| Held line | FR-PAY-406; FR-PAY-311 | Member, wage month, classification, date of payment, PF figures | Its route is confirmed and the return carrying it is FILED |
| NCP-only difference | AC-405.2 | Member, wage month, the old and new NCP counts | The §22 runbook records its outcome |
| Downward difference after payment | FR-PAY-714, step 2 | Member, wage month, the difference per ECR field | The §22 runbook records its outcome |
| Damages | FR-PAY-715, L5 | Wage month, the portal's figure, the employer's recorded choice | Paid (L8) |

- **AC-712.7** — Every item shows in the calendar's blocked view with its reason
  (AC-710.4), and an item involving an active member counts in AC-712.6's blocking
  list. A leaver's items stay on the ledger after the exit with their clocks running;
  an exit never closes them.
- **AC-712.8** — A wage month that closed before the establishment joined this product
  carries the **FILED_ELSEWHERE** status of FR-PAY-315 — a fifth status beside in
  progress, FILED, NIL and BLOCKED. It records what the portal's own filing history
  shows, is never a filing of ours, and is excluded from both sides of the on-time
  metric (AC-315.5). The ledger is unbroken from the establishment's coverage date only
  because these entries exist; without them AC-712.1 would either be false for every
  migrated tenant or would have to assume months it cannot see.

**FR-PAY-713 · Error taxonomy for statutory artefacts** · **P0**
Every error or flag the engine raises against a statutory artefact — before
generation, at validation, at the payment gate, or after a portal rejection — shall
carry one code from a closed set of families, so that remediation is routed, the
filing metrics (§19) can say *why* filings fail, and the operator never meets a free-
text error.

| Family | What failed | Sourced examples | Detected at | Severity | Remediation route |
| --- | --- | --- | --- | --- | --- |
| **SA-FMT** — layout | The bytes do not match the published layout | ECR: 11 fields, 10 three-character `#~#` delimiters, no header row (EV-035); part-payment file: 6 fields (EV-044); Form 138: one caret fewer than fields per record, CRLF on every record, FH / BH / CD / DD, file type `SL1` (EV-051); ECR packaging: letters and digits in the filename, lower-case `.txt`, at most 8 MB, zipped above 2 MB, one file per zip (r5/02 finding 5; TV18) | Generator self-check, F4 → F5 (FR-PAY-711) | Block — the portal would reject it | Fix the generator or schema version; the artefact is never hand-edited |
| **SA-VER** — format family | The period's format is wrong or does not exist | A Tax Year 2026-27 statement routed to RPU 6.0 / FVU 9.5, or the reverse (EV-052); a version pinned to Protean's page label instead of the downloaded workbook (r5/02 finding 35); Form 138 Q4, Tax Year 2026-27 Form 130, ECR arrear return (EV-046, EV-043) | F4 guard | Block; an unpublished format sends the instance to BLOCKED-pending-layout | Watcher publishes the schema (§22, FR-PAY-1005); deadline stays visible |
| **SA-ID** — identifiers | A member or deductor identifier is unusable | Un-seeded or KYC-incomplete UAN (AC-701.2); inoperative PAN (AC-205.3); statement TAN or TAN name not matching the `.csi` (AC-706.2) | Pre-run (FR-PAY-1004) and F5 | UAN and PAN: flag, exclude-and-flag or configuration task, never a payroll block; TAN mismatch: block generation | Seeding or joint-declaration queue (§07); correct the deductor master |
| **SA-RULE** — authority's eligibility checks | A line breaks a rule the portal enforces or flags | EPS for a member who has attained 58 and is not marked for deferred pension — block; EPS for a post-01.09.2014 high earner — flag; contribution outside the date-of-joining to date-of-leaving window; rate below statutory (EV-040); exempted-establishment fields left empty (r5/02 finding 12); Form 138 deductee date of payment outside the quarter or tax year (r5/02 finding 32) | F5 | **Exactly the authority's own** — the engine adds no block the authority does not impose (AC-701.6) | Correct through identifier state or a correction run |
| **SA-REC** — reconciliation | Two figures that must agree do not | File lines vs computed contributions vs the portal's return statement and Due Deposit Balance Summary (EV-036, AC-701.1); challan vs liability (FR-PAY-902); `.csi` challan match (AC-706.2); bank file vs net pay (AC-901.1); payslips vs registers vs returns (G2); a second EPF payment covering the same member and month (AC-701.8) | F5 and the M10 verification gate | Block — a figure would be wrong; the duplicate-payment check alone is a flag needing the named approver's confirmation, because EPFO permits multiple challans (EV-036) | Named reconciling item; fix before PAYMENT_INITIATED, since a downward ECR correction is impossible after it (EV-037) |
| **SA-SEQ** — lifecycle and sequencing | The action is out of order for the authority's lifecycle | A Regular return for month M with month M−4 unfiled (EV-038); a Revised ECR after payment initiation, a Supplementary carrying an already-returned member, a second Regular (EV-037); a contribution after a wrongly recorded exit date (EV-041); a file for a NIL month (EV-042); a Tax Year 2026-27 Form 138 correction before the portal enables such filings (AC-708.3) | F4, F6, F10, F12 guards | Block — the portal would refuse it | Offer the route that remains: Supplementary, the fenced arrear flow, the joint-declaration task, Direct Challan Entry |
| **SA-PORT** — portal rejection | The authority rejected a submitted artefact | ECR upload failing validation, with EPFO's downloadable error file (r5/02; schema undocumented, captured from a real rejection, §06.13); an FVU rejection | F7 → REJECTED | Not "done"; the on-time clock keeps running (AC-710.1) | Error file parsed and mapped to employee records; regenerate (F8) |
| **SA-CALC** — computation defect | A golden vector fails | Any §06.14 vector; Example G convergence (AC-211.2) | Rule-version release, not the run | Blocks publishing the rule version (G11) | Fix the rule payload; re-run the golden suite |

- **AC-713.1** — Every error or flag recorded against a statutory artefact carries one
  family code, a severity (block or flag), its detection point (pre-run, F4, F5, M10,
  F6, F7, F10, F12 or release), the affected employee or record, and a remediation
  route. An uncoded error cannot be recorded.
- **AC-713.2** — SA-RULE severities equal the authority's own (EV-040); SA-FMT,
  SA-VER, SA-REC and SA-SEQ block because the artefact would be wrong or refused — save
  the SA-REC duplicate-payment check, a flag the named approver confirms (AC-701.8);
  SA-ID never blocks payroll for an Aadhaar-, UAN- or PAN-state reason (Part E-11).
- **AC-713.3** — The rejection and correction counts of §19 are reproducible per family
  from the transition log alone (AC-711.1), so the metric can report which family
  drives rejections for any period, registration or state.
- **AC-713.4** — A portal rejection whose error text maps to no known code is recorded
  as SA-PORT-UNMAPPED with the raw error file attached and routed to §22 to extend the
  mapping; it is never dropped or recoded as a generic failure.
- **AC-713.5** — Codes are stable identifiers of the form `<family>-<nn>`, assigned when
  a check is first built and never reused for a different check; a retired check keeps
  its code in the history, so a metric computed in one period reads the same in the
  next (§19). Each code names its fixture — the §06.14 vector, the §08.12 example or
  the captured rejection that exercises it.

**FR-PAY-714 · The ECR return composer — splitting a month's changes into returns, in order** · **P0**
When a correction run (FR-PAY-307) or an identifier change produces ECR changes for a
wage month, the engine shall split them into the returns EPFO will take and sequence
those returns against the month's payment, so that no change is lost to an order EPFO
refuses.
- *Detail.* §06.2's decision table says which return one kind of change needs; a real
  month produces several kinds at once. The composer takes every open ECR change for
  the wage month and plans:
  1. **Classify each member line** — a member absent from every prior return for the
     month; a change, up or down, for a member already returned; true arrears; belated
     salary (FR-PAY-406).
  2. **Revised first, while it is still possible.** Changes for members already
     returned go on one Revised return, generated and approved before any challan for
     the month: a Revised return is barred once a payment process has been initialised
     (EV-037), and the product treats challan generation as that point (§06.2). Returns
     run one at a time, so when a Revised and a Supplementary are both ready, the
     Revised goes first — it alone expires at payment. After payment initiation an
     upward change is not offered (§06.2 row 6, **[Hypothesis]**) and a downward change
     has no ECR route (row 5): the diff is recorded and the case goes to the §22
     runbook.
  3. **Supplementary next.** Members absent from every prior return go on a
     Supplementary once no other return is in process for the month — the product
     applies EV-037's in-process guard to every new return (§06.2). A Supplementary has
     no payment guard, so it may follow the month's payment: the composer never holds
     the whole month's payment for one member whose UAN is still being seeded; that
     member's M+4 deadline governs instead (AC-701.2, AC-712.6).
  4. **Arrears and held lines aside.** True arrears go to the arrear ledger item,
     fenced (EV-043); belated-salary lines are held (FR-PAY-406). Neither enters a
     monthly return.

  A Revised return overwrites the portal's data for the month (EV-037). Whether it must
  therefore carry every member of the month, or only the changed members, is not stated
  in the captured EPFO material. The composer builds it under `ecr.revised_scope`,
  which ships unset and is pinned from a portal-accepted Revised upload (§20 V-23);
  while unset, the approver chooses the scope for each Revised return on
  `SO-CORRECTION`, and the scope proposed is every member of the month — if the portal
  replaces the month's data, a Revised return of changed members only would erase the
  rest, while a full one costs nothing if the portal merges by member. The composer
  never adds an absent member to a Revised return; EV-037 names the Supplementary as
  the route for absent members.

<!-- DIAGRAM: fr-payroll-ecr-correction-sequence -->

- **AC-714.1** — Example K reproduces: the October 2026 plan is a Revised return for
  member D, then the gate and the challan, then a Supplementary for member A; member
  C's arrears sit on the ledger as BLOCKED-pending-layout with November 2026 as their
  due month.
- **AC-714.2** — The composer refuses to plan a Revised return once the month's EPF
  payment is initiated, and says which route remains for each line (AC-711.3).
- **AC-714.3** — Every planned return is a FR-PAY-711 instance linked to the Regular it
  corrects (`corrects_filing_id`, §14.4.5); the plan, its reasons and each return's
  guard results are stored with the correction run.
- **AC-714.4** — The gate's VG-E2 reads the plan: the EPF challan is refused while a
  return the plan places before payment is short of ACCEPTED (FR-PAY-309).
- **AC-714.5** — The plan re-runs whenever a planned return is REJECTED or a new change
  arrives for the month; while a planned Revised return is short of ACCEPTED past the
  month's due date, the plan shows the interest the delay is running up (FR-PAY-715,
  L1).

| Open changes for the wage month | Payment initiated? | Plan |
| --- | --- | --- |
| Absent members only | Either | One Supplementary per batch of members ready; each other member runs its M+4 clock |
| Changes for members already returned | No | One Revised return, before the challan |
| Changes for members already returned | Yes | Upward: not offered (§06.2 row 6, **[Hypothesis]**). Downward: no ECR route; recorded for the §22 runbook (row 5) |
| Absent members and returned-member changes | No | The Revised return first, then the Supplementary |
| Absent members and returned-member changes | Yes | The Supplementary for the absent members; the returned-member changes as the row above |
| Any of the above, with true arrears | Either | As above; the arrears to their ledger item, never into a monthly return |
| Belated-salary lines | Either | Held until §06.2 row 8 is confirmed (FR-PAY-406) |

**FR-PAY-715 · The statutory liability ledger — s.7Q interest and s.14B damages** · **P0**
The engine shall keep, per establishment and wage month, a ledger of the EPF amounts
that are not contributions — interest under s.7Q and damages under s.14B — each as an
item that moves from the engine's forecast to the portal's assessment to payment, and
shall show the open items in the payment screen, at the verification gate and in the
cash-flow forecast.
- *Detail.* s.7Q interest is auto-calculated by the portal and must be paid with the
  monthly contribution; s.14B damages may be deposited forthwith or later, at the
  employer's option (EV-039). The engine's figure is therefore a forecast and the
  portal's governs; §06.2 works the forecast and names its unset inputs,
  `epf.interest_day_count` and `epf.interest_base`. The two lifecycles differ because
  interest cannot be deferred and damages can.

<!-- DIAGRAM: fr-payroll-liability-ledger -->

| # | From → To | Event | Guard | Side effect | Who may trigger |
| --- | --- | --- | --- | --- | --- |
| L1 | *(none)* → FORECAST | A contribution's due date passes unpaid, or a planned payment date falls after it | — | Forecast computed daily on the unpaid amount (§06.2); shown as "unavailable — parameter unset" while an input is unset (FR-PAY-1006) | System |
| L2 | FORECAST → ASSESSED | The Due Deposit Balance Summary is captured | — | The portal's figure recorded beside the forecast; a difference is an SA-REC reconciling item, never an overwrite (TV36) | System, on capture |
| L3 | ASSESSED → IN_CHALLAN | The month's challan is generated | The assessed interest is in the same challan as the contribution (VG-E3) | — | Named approver's instruction (§22 FR-OPS-004) |
| L4 | IN_CHALLAN → PAID | Receipt captured | — | Item closed; reconciled to the bank debit where the employer shares it | System, or operator |
| L5 | *(none)* → OPEN | The portal shows damages for a wage month | — | An open liability from that day; the employer's choice — now or later — requested (EV-039) | System, on capture |
| L6 | OPEN → OPEN | The employer defers | — | The choice recorded with approver and date; the item stays on every later gate view and in the cash-flow forecast | Named approver |
| L7 | OPEN → DAMAGES_IN_CHALLAN | The employer chooses to pay | — | Paid through the portal's charges path (§22 FR-OPS-013) | Named approver's instruction |
| L8 | DAMAGES_IN_CHALLAN → DAMAGES_PAID | Receipt captured | — | Item closed | System, or operator |

- **AC-715.1** — An EPF challan without the assessed s.7Q interest for its wage month
  fails VG-E3; no path pays the contribution and leaves the interest for later.
- **AC-715.2** — Open damages never fail a gate. They are shown, with their age and the
  recorded choice, on every later month's gate view, because the employer may pay them
  later (EV-039).
- **AC-715.3** — The cash-flow forecast lists, per establishment, every FORECAST,
  ASSESSED and OPEN item with its amount and the date it was last computed, so the
  month's statutory cash need is known before the 15th.
- **AC-715.4** — The damages scale, `epf.damages_scale`, ships unset (AC-710.3): the
  engine never forecasts a damages figure; it records the portal's.
- **AC-715.5** — The same ledger carries two other forecast items on their own heads'
  instances. For a late TDS deposit, interest at `tds.interest.late_deposit` — 1.5% a
  month from deduction to deposit under s.398(3)(a) (§06.5, **[Verified]**) — with how a
  part month counts held as `tds.interest.part_month_rule` (class K4, §20 V-20). For a
  late ESI contribution, simple interest at 12% a year (S.O. 2698(E); AC-710.3,
  **[Verified — mirror]**; pull from the primary source before customer use), while
  ESI damages stay unset (`esi.damages_scale`). Each is a forecast beside the portal's
  or the authority's own figure, never a replacement for it.

**FR-PAY-716 · Form 138 Q1–Q3 statement assembly from payroll data** · **P0**
The engine shall assemble each Q1–Q3 statement (FR-PAY-706) from the quarter's salary
payments, the tax deducted on them and the deposits that carried that tax, so that every
figure in the file traces to a payment line and a challan.
- *Detail.* §06.5 specifies the file — records, remap and validators. This FR specifies
  where each record's content comes from.

| Record | Built from | Rule |
| --- | --- | --- |
| FH, BH | The deductor master, confirmed against the TRACES profile (§06.5), and the statement's period | Year fields from the period, never today's date (F138-6) |
| CD | One deposit — a TDS challan whose identification number was captured on payment (AC-902.1) and matched in the `.csi` import (AC-706.2) | A challan in the `.csi` with no deductee line is listed for the operator, never dropped |
| DD | The deductee's salary payments whose date of payment falls in the quarter — the actual disbursal date per employee (FR-PAY-905) — and the tax deducted on them | Placed by date of payment (§06.5 quarter rule); the wage month travels with the line for s.157(1) attribution (§06.5) but never places it |

- *Three open points, each a parameter.* The granularity of a DD record — one per
  payment, or one per deductee per challan — and the field that links a DD record to
  its CD record are read from the workbook with the field transcription
  (`tds.f138.dd_granularity`; §06.5 notes no round itemised the fields), not inferred
  from the sample's record order. Whether a salary payment with no tax deducted —
  Example A's employee, whose liability the s.87A rebate zeroes — needs an Annexure I
  line is not captured; it is `tds.f138.nil_deduction_rows`, routed to §20 V-20. And
  whether a returned and re-issued credit moves the date of payment is FR-PAY-905's
  `tds.returned_credit_payment_date`. Until each is set, a quarter that needs it raises
  a configuration task before generation.
- *What is not reported.* Tax a previous employer deducted, declared on Form 122
  (AC-205.5), shapes this employer's projection but is never reported in this
  employer's Annexure I, which carries the deductee-wise break-up of this deductor's
  TDS in the quarter (r5/02 finding 22).
- **AC-716.1** — For Tax Year 2026-27 Q2, a June 2026 salary paid on 1 July 2026 is a
  Q2 line with its wage month, June, recorded; a September salary returned and
  re-issued on 1 October 2026 is not placed until FR-PAY-905's question is answered for
  it.
- **AC-716.2** — The quarter's DD tax totals the tax on the quarter's payslips by date
  of payment, and each CD's allocated deductee tax reconciles to that deposit as the
  `.csi` records it; a difference names the payment lines or the challan (SA-REC).
- **AC-716.3** — Example F's employee, paid on the last day of each Q2 month, carries
  three lines of ₹12,566.67 — ₹37,700.01 for the quarter — at the file's two-decimal
  precision; AC-209.5's residue belongs to the tax year's last run, so no quarter
  absorbs it.

**FR-PAY-717 · Generated artefacts — one hash, regeneration and the uploaded file** · **P0**
Every statutory file the engine generates shall be an immutable artefact record bound to
its filing instance, attempt, format version, locked snapshot, rule versions and
generator version, and identified by the hash of its bytes (§14.4.5 holds the fields).
- *Detail.* Three rules make an artefact trustworthy. **Regeneration is idempotent:**
  generating again from the same snapshot, format version and generator version yields
  the same bytes and hash and is not a new attempt (AC-209.1); a changed snapshot comes
  only from a correction run, as a new linked instance (FR-PAY-307). **The uploaded file
  is the generated file:** the attended session records the hash of what was uploaded
  (§22.4.1), and a different hash means the file was changed outside the product, which
  breaks the chain from the return back to the snapshot. **The format version is the
  downloaded artefact's,** pinned by the version string inside it rather than the
  download page's label (r5/02 finding 35), and chosen by the statement's period
  (EV-052).
  **Naming.** EPFO mandates no filename pattern — only letters and digits, a lower-case
  `.txt`, at most 8 MB, compression above 2 MB and one text file per zip (r5/02 finding
  5; §06.2). The product names ECR files by `ecr.filename_template`, a product setting
  built from the establishment code, the wage month, the return type and the attempt
  number, with every character that is not a letter or digit removed. The template is
  this product's choice, not a statutory one, and changing it changes no content.
- **AC-717.1** — Regenerating an unchanged instance produces a byte-identical file with
  the same hash and no new attempt; a regenerated file whose hash differs is a
  determinism failure (G1) and blocks the instance.
- **AC-717.2** — An upload whose recorded hash differs from the artefact's is not
  recorded as the instance's submission: the session log shows the mismatch as SA-FMT,
  the instance stays VALIDATED, and the approver is told that a file the product did not
  generate may be on the portal. The product offers no path to upload a file it did not
  generate.
- **AC-717.3** — Every artefact names the rule versions and the generator version it was
  built with, so a portal rejection months later traces to the exact code and data that
  made the file (FR-PAY-1002).

**FR-PAY-718 · Portal error files — capture, parse, map** · **P0**
When a portal rejects an upload and offers a downloadable error file, the engine shall
store the file raw, parse it with the error-file schema version captured for that portal,
map each error to the employee line and the FR-PAY-713 code it concerns, and route each
to its fix.
- *Detail.* EPFO's manual refers to a downloadable error file on a failed upload but
  never documents its format (r5/02 open questions; §06.13), so the schema is learned
  from real rejections: each captured file becomes a fixture and, through the §22
  pipeline, a versioned schema (§20 V-23). The same object serves an FVU rejection on
  the TDS side (SA-PORT). Until a portal's schema version exists, the raw file is
  attached to the REJECTED instance, the operator maps its rows in the product, and each
  hand mapping is recorded so that the parser can be written from them.
- **AC-718.1** — A captured error file is stored byte for byte with its hash, instance
  and attempt; parsing never alters it.
- **AC-718.2** — Each parsed row maps to one employee line — by UAN on the ECR side, by
  the deductee record the report names on the TDS side — and to one FR-PAY-713 code. A
  row that maps to no known code is SA-PORT-UNMAPPED (AC-713.4); a row naming a member
  who is not in the file is itself a finding, never dropped.
- **AC-718.3** — Each mapped row's fix runs through identifier state or a correction
  run, never an edit of the locked snapshot (F8), and the regenerated attempt links to
  the rejected one.

**FR-PAY-719 · Year-end salary data, kept ready for the fenced Q4** · **P0**
The engine shall keep, per employee and tax year, a running year-end record of the
figures Form 138's Q4 Annexure II summarises — the salary, deductions, rebate and net tax
liability for the tax year, in CBDT's own description (r5/02 finding 22) — so that when
the Q4 format is released the statement is a writer to build, not a year of data to
reconstruct (§05 F-01's interim posture).
- *Detail.* This is a data record, never a layout: Annexure II's record types and fields
  are unknown (§06.5; r5/02 open questions), and nothing here anticipates them (§06.12
  R16). From the locked runs it holds: salary paid, by date of payment, with each part's
  wage month; the exemptions and deductions applied under the elected regime, each with
  its proof state (FR-PAY-503); perquisite values (FR-PAY-106); previous-employer income
  and tax from Form 122; the rebate and marginal relief applied; surcharge and cess; the
  tax deducted, by month and challan; and the s.157(1) attribution of any arrears — the
  legacy Q4 layout carried a relief field, so the attribution is a filing fact, not only
  a computation (§06.5). Annexure III covers the pension and interest of a specified
  senior citizen, which Form 138 and Form 130 pair with a specified bank rather than an
  employer (r5/02 findings 23, 26); an employer's payroll has no Annexure III figures and
  the record carries none. The record is the one the tax-projection statement prints
  (FR-PAY-603) and the Form 130 reconciliation reads (AC-707.2).
- **AC-719.1** — At any date the record reconciles to the year's locked runs by date of
  payment and to the Q1–Q3 statements already filed; a difference names the run or the
  statement.
- **AC-719.2** — When the Q4 format is released (AC-1005.2), the generator is built
  against the record. A field the format needs that the record lacks is raised as a
  finding with the format version, and the record gains it for every employee of the
  year from the locked runs, never from an estimate.
- **AC-719.3** — A leaver's record closes at F&F with the final true-up (AC-801.3) and
  carries the Form 130 Part C option the employee recorded (§06.5), so the leaver's
  certificate can be distributed when TRACES issues it.

---

### 08.8-A The ECR generator — which members take a line, and how the file is assembled

§06.2 owns the **content** of the eleven fields and their checks at EPFO's own severity;
FR-PAY-701 owns the return's flow. What neither fixes is the question a generator must
answer first: **of the people on the locked snapshot, who takes a line in this month's
return, and who is carried some other way.** Getting it wrong produces a file that
uploads cleanly and is still wrong — a member missing from a month is invisible until
the M−4 rule blocks a Regular return four months later (EV-038), and a member returned
who should not have been cannot be removed downward once payment is initiated (EV-037).

**FR-PAY-720 · Member-line selection for a wage month's return** · **P0**
For one EPF registration and one wage month, the engine shall select the member lines of
the **Regular** return from the locked snapshot by the table below, applied in order, and
shall record for every person **not** selected which route carries them instead. Selection
is a stored decision per person per return attempt, not a query re-run at generation.

<!-- DIAGRAM: fr-payroll-ecr-line-selection -->

| # | Person's situation in the wage month | Line? | What carries them instead | Basis |
| --- | --- | --- | --- | --- |
| S1 | An EPF member of this registration with paid days in the month | **Yes** | — | §06.2 field rules |
| S2 | An EPF member with **no paid day** — LOP for the whole month | **Yes** | — | The zero-wage line, NCP days at the month's days (§09 FR-FIL-002; AC-109.8) |
| S3 | Left during the month, exit marked | **Yes**, to the date of leaving | — | Contributions only between the valid date of joining and date of leaving (EV-040); the exit date is marked on the portal, not in the file (AC-802.1) |
| S4 | Joined during the month, before the inputs cut-off | **Yes**, from the date of joining | — | EV-040 |
| S5 | An employee of the establishment who is not an EPF member — an excluded employee never enrolled, or one whose exclusion basis is recorded | No | Nothing; the exclusion basis is on the employee record | AC-202.3 |
| S6 | A member of the tenant's **other** EPF registration | No | That registration's own file; a mid-month move follows `epf.transfer_month_rule` | AC-105.2 |
| S7 | Left **before** the month, exit marked | No | Nothing. A contribution for a period after the recorded exit is refused, and a wrongly recorded exit is corrected only by joint declaration | EV-040, EV-041; AC-712.3 |
| S8 | UAN absent, un-seeded or KYC-incomplete | No | An **exclusion item** on the ledger with its M+4 deadline and notices to operator and employee | AC-701.2; AC-712.6 |
| S9 | Joined after the month's inputs closed, paid as a catch-up in a later run | No | A **held line** classified by FR-PAY-406; the design route is a Supplementary return for this wage month | FR-PAY-407; EV-037 |
| S10 | Already carried by an approved return for this month | No | A change for them is a **Revised** return while no payment has been initiated; after that the routes of FR-PAY-714 | EV-037 |
| S11 | Also paid for this month in an off-cycle run locked **before** this return is generated | **Consolidated** — the amounts join the person's single line, never a second line | — | AC-305.2 — one Regular return per month, never two |
| S12 | Owed **true arrears** for this month, paid in a later run | No | The arrear ledger item, fenced pending a published layout, with its due month from the disbursal date | EV-043; AC-401.2 |
| S13 | A member of an **exempted** establishment | **Yes** | — | The line still populates EPF wages, PF contribution, EPS wages, EPS contribution and EDLI wages; only the challan differs (r5/02 finding 12) |

- *Detail.* Two rows carry most of the risk. **S8** is the only row where a person who
  worked and was paid takes no line, and it is deliberate: Aadhaar and UAN state never
  block payroll (Part E-11), so the member is excluded from the file and the clock
  starts instead. **S9** looks like S8 but is not — the member has a UAN and simply was
  not paid in a run locked in time, so the route is a Supplementary for the month, not a
  seeding task. Both leave the month with an active member unreturned, which is what
  AC-712.6 counts.
- **AC-720.1** — Every person on the locked snapshot resolves to exactly one row, and
  the resolution is stored with the return attempt: person, row, and the ledger item or
  route created. A person matching no row stops generation (SA-SEQ), because an
  unclassified person is a member the file may be silently dropping.
- **AC-720.2** — The count of selected lines equals the count of persons resolved to a
  line-bearing row — S1, S2, S3, S4 and S13 — and the file's line count equals it
  (AC-721.1). An S11 consolidation adds amounts to a person's single line and never a
  second line; a file with fewer lines than selections, or with two lines for one UAN,
  is a generator defect, not a data question.
- **AC-720.3** — The selection for a **Supplementary** return is the complement, not a
  re-run: only persons whose stored resolution for the month is S8 or S9 and whose block
  has since cleared, and only those absent from **every** prior return for the month
  (EV-037). A person resolved S10 can never enter a Supplementary.
- **AC-720.4** — The selection for a **Revised** return follows `ecr.revised_scope`
  (FR-PAY-714), and the composer never adds an S8 or S9 person to it.
- **AC-720.5** — The selection is reproducible from the snapshot: re-running it on an
  unchanged snapshot yields the same resolutions in the same order (I4).

**A worked selection — one establishment, October 2026.** Ten people on the snapshot,
one registration, the ceiling election, `epf.rounding_method` shown as set to whole
rupees for A and B (the §06 fixtures) and at full precision for D, which is exactly the
ordering question AC-209.6 pins.

| Person | Situation | Row | PF wages (₹) | Employee PF (₹) | Employer EPS (₹) | Employer EPF (₹) | NCP |
| --- | --- | --- | --- | --- | --- | --- | --- |
| A | Full month on the ₹15,000 ceiling | S1 | 15,000.00 | 1,800 | 1,250 | 550 | 0 |
| B | Ten non-contributory days; ₹10,000 of PF wages earned — the §06.14 TV32 fixture | S1 | 10,000.00 | 1,200 | 833 | 367 | 10 |
| C | No paid day — unpaid leave all month | S2 | 0.00 | 0 | 0 | 0 | the month's days |
| D | Left on 20 October; ₹15,000 contracted, C1 convention, 11 days outside employment | S3 | 9,500.00 | 1,140.00 | 791.35 | 348.65 | from §09 |
| E | Left in August, exit marked | S7 | — | — | — | — | — |
| F | UAN not yet allotted | S8 | — | — | — | — | — |
| G | Joined 28 October, after the cut-off | S9 | — | — | — | — | — |
| H | Excluded employee, never enrolled | S5 | — | — | — | — | — |
| I | Moved to the tenant's second registration on 1 October | S6 | — | — | — | — | — |
| J | True arrears for August, paid in the October run | S12 | — | — | — | — | — |

- Four lines are written. PF wages total ₹34,500.00; employee PF ₹4,140.00; employer EPS
  ₹2,874.35 and employer EPF ₹1,265.65, which sum to the employer's ₹4,140.00 — the RP5
  invariant, and the reason field 9 is derived rather than rounded on its own.
- F's exclusion carries the M+4 deadline of February 2027's Regular return, due 15 March
  2027 (AC-712.6); G's held line carries the same deadline from the same wage month, on
  the Supplementary route (FR-PAY-406); J's arrears sit on the ledger with November 2026
  as their due month, because the disbursal date sets it (AC-401.2), never inside the
  October file.
- **AC-720.6** — This roster is a release test (G11): the four selected lines, the three
  ledger items and the three no-line resolutions reproduce exactly, and the challan
  total equals the sum of the rounded per-employee figures (RP9), never the rounding of
  an unrounded sum.

**FR-PAY-721 · Assembly, ordering, packaging and the generator's self-check** · **P0**
The engine shall assemble the selected lines into the return file, order them by a
recorded rule, package the file to EPFO's stated constraints, run a self-check before
validation, and export the values the operator must key into the portal's own form
controls.
- *Detail.* **Ordering.** No captured EPFO material orders the lines. Order is therefore
  a product setting, `ecr.line_order`, shipping with this product's own default — UAN
  ascending — so it raises no configuration task (AC-1006.1, the `ecr.filename_template`
  pattern). It is versioned with the generator version because it changes the bytes and
  so the hash, while changing no content (FR-PAY-717).
  **Packaging.** EPFO's upload notice sets five constraints and no filename pattern
  (r5/02 finding 5): letters and digits only in the name, a lower-case extension, a
  maximum upload of 8 MB, compression above 2 MB, and exactly one text file inside a zip
  with nothing else bundled. The generator decides zip-or-not from the assembled byte
  size, not from an operator choice, and records the hash of the text file and of the
  zip.
  **Encoding and line terminator.** `ecr.encoding` and `ecr.line_terminator` ship unset
  (class K5, §06.2): during the design-partner phase a recorded choice is generated and
  pinned by a portal-accepted upload, and general availability waits on that pin
  (AC-1006.5). Nothing about them is inferred from the sample lines, which are published
  as rendered text.
  **The control card.** Five portal controls sit outside the file — Wage Month, Return
  File, Return Type, Contribution Rate and Remark (EV-035; r5/02 finding 4) — so the
  export carries a card naming the exact value for each, and the file carries none of
  them (AC-701.5).
- **AC-721.1** — The self-check runs before F5 and stops generation on any failure, as
  SA-FMT: the line count equals the selection count (AC-720.2); every line has eleven
  values and ten three-character `#~#` delimiters; no line contains a delimiter sequence
  or line break inside a name (§06.12 R29); every amount is rendered at the file's own
  precision (RP10) and never at the internal scale; there is no header row.
- **AC-721.2** — Regenerating an unchanged attempt produces byte-identical bytes and the
  same hash (AC-717.1). Changing `ecr.line_order` produces a different hash for identical
  content, so the change is recorded as a generator-version change and never made between
  an attempt's generation and its upload.
- **AC-721.3** — The packaging decision is derived and recorded: the text file's byte
  size, whether it was compressed, the name after non-alphanumeric characters were
  removed, and both hashes. A file above the 8 MB ceiling after compression stops
  generation with the size named rather than being split, because EPFO's constraint is on
  the upload, and splitting a month's members across two Regular returns is not a route
  EV-037 offers.
- **AC-721.4** — The control card is part of the attended session's record (§22): what
  was to be entered, and what the operator reports having entered. A mismatch between the
  card's Return Type and the instance's planned return type is a blocking item before
  upload, because the portal's control — not the file — decides whether the upload is a
  Regular, a Supplementary or a Revised return.
- **AC-721.5** — The part-payment contribution file is assembled from operator-entered
  amounts against the month's open dues, its six fields per EV-044, its own upload screen
  carrying only Wage Month, Contribution File and Remark (r5/02 finding 6). Its total
  reconciles to the dues it is said to cover, and what a part payment does to the month's
  remaining liability is taken from the portal's own figures, never computed here: the
  captured material describes the file and the screen, not the accounting, so the flow is
  routed to §22's runbook and §20 V-23.

---

### 08.9 Full-and-final settlement (F&F)

Exit settlement concentrates the hardest edge cases — proration, arrears, recoveries,
gratuity, leave encashment, and final TDS true-up — into one computation. §05.6
Example D names implementation friction as the most-cited churn trigger and mid-year
cutover, with its certificate continuity, as the hard case; F&F is the outbound mirror
of that case, where a departing employee's certificate continuity is won or lost.

<!-- DIAGRAM: fnf-waterfall -->


**FR-PAY-801 · F&F computation** · **P0**
On an employee exit the engine shall compute a **full-and-final settlement** comprising:
prorated final-month salary; unpaid arrears; **leave encashment** (per policy, on the
correct wage base); **gratuity payout** (FR-PAY-206) if qualified; **statutory bonus**
accrued to date (FR-PAY-208); pending reimbursements; **notice-pay recovery or
payment**; advance/loan/asset recoveries; and the **final TDS true-up** for the
year-to-date.
- **AC-801.1** — F&F net = (all final earnings + encashment + gratuity + accrued bonus +
  pending reimbursements) − (all recoveries + final TDS), shown line-by-line and
  reconciling to the rupee (worked at §08.12 Example E).
- **AC-801.2** — Gratuity is included only if the 5-year rule is met (or does not apply —
  death, disablement, fixed-term expiry), is capped at `gratuity.payable_ceiling`, and is
  tax-exempt up to `tax.gratuity_exemption_ceiling` net of the exemption the employee
  declares as already used with earlier employers (1961-Act s.10(10); v0.3's ₹20 lakh
  carried, **[Hypothesis]**; 2025-Act equivalent unmapped, §06.6).
- **AC-801.3** — Final TDS is computed on **actual** year-to-date income (not the annual
  projection), applying actual proof-verified declarations, and can result in a **refund
  adjustment** where excess was deducted.
- **AC-801.4** — **Leave encashment on retirement/resignation** is exempt for a non-
  government employee up to a lifetime ceiling held as
  `tax.leave_encashment_exemption_ceiling` (1961-Act s.10(10AA)(ii); v0.3's ₹25 lakh and
  the CBDT notification it cited are carried, not re-captured in any research round,
  **[Hypothesis]**, routed to §20; the 2025-Act equivalent is unmapped and carried under
  both labels, §06.13); the ceiling is a
  **lifetime aggregate across employers**, so the engine caps on the balance the employee
  declares as already used, and the excess is taxed and flows to the final TDS true-up.
  Encashment *during* service (not on exit) is fully taxable — the engine distinguishes
  the two.

**FR-PAY-802 · Statutory exit processing and continuity** · **P0**
On exit the engine shall prepare the **EPF exit** marking (the date of exit that frees
the employee's UAN for withdrawal or transfer), the **ESI exit**, and preserve **UAN/ESI
IP continuity** data for the employee's next employer (§05.6 continuity requirement).
- **AC-802.1** — An exited employee's date of exit is marked on the EPFO portal in an
  attended session (§22) — it is not a field of the ECR return file (EV-035) — so their
  UAN is free for transfer; marking needs no member-detail or Aadhaar update, and an exit
  date recorded in error can be corrected only by a joint declaration (EV-041,
  FR-PAY-712). The final month's ECR carries contributions only up to the date of
  leaving (EV-040). The engine does not require the *next* employer to be in the system.
- **AC-802.2** — The exit produces the data an incoming HRMS needs (YTD earnings, TDS
  deducted, UAN, ESI IP, leave balance, gratuity accrual) as an **exportable continuity
  packet** — the mirror of the migration import (§05.6, §16).

**FR-PAY-803 · F&F approval and settlement window** · **P0**
F&F shall pass the same maker-checker approval (FR-PAY-304) and produce a **settlement
payment** via the bank file (FR-PAY-901) and a **final payslip**. The partial-year
Form 130 is the TRACES-generated certificate, distributed after the year's Q4 statement
(FR-PAY-707; EV-048) — for Tax Year 2026-27 it is blocked behind the unpublished Q4
format (EV-046), and the exit continuity packet (AC-802.2) carries the YTD figures in
the meantime.
- **AC-803.1** — Gratuity, once payable, is flagged for payment **within 30 days**, with
  the simple-interest exposure for delay surfaced if the window is missed (CoSS s.56
  [Verified]; the legacy POG reference is carried, not re-captured; §06.6).
- **AC-803.2** — The final **wages** carry their own, shorter clock: payable within **two
  working days** of removal, dismissal, retrenchment or resignation (Code on Wages
  s.17(2), verified verbatim, r1/06; §06.9), subject to any other time limit the
  appropriate Government provides under s.17(3), held per jurisdiction as
  `wages.final_settlement_working_days`. The clock starts from the exit date on the
  service record, counts working days on the establishment's calendar, and is shown
  on the F&F screen; approval (FR-PAY-304) and the settlement bank file (FR-PAY-901)
  are sequenced to meet it, and a breach is surfaced to the approver, never hidden.

**FR-PAY-804 · Notice shortfall, recovery and the exit month** · **P0**
The engine shall compute the **notice shortfall** — the notice the employee's terms
require, less the notice served, from the resignation date and the last working day on
the service record — and the resulting recovery or payment, and shall bring it into F&F
(FR-PAY-801) as a labelled line, with any waiver recorded.
- *Detail.* greytHR's F&F wizard computes "Shortfall in Notice" automatically (r3/02
  finding 7; documentation read in the r3 capture, 2026, not executed); the product
  does the same, on the tenant's notice base — the catalogue marks the notice
  component's cells payload (FR-PAY-108) — and the pay group's day-rate convention
  (FR-PAY-109). A waiver, full or partial, carries its reason and an approver distinct
  from the operator. At exit there is no later wage period into which a recovery above
  the Code on Wages deduction cap could be carried (FR-PAY-403; s.18(3)–(4)), so any
  excess is shown as an amount recoverable outside payroll, never netted silently.
  Whether a notice-pay recovery counts as a deduction under s.18 is not established in
  this PRD's evidence, so the cap check runs and flags, and the tenant's decision is
  recorded with the settlement (§20).
- **AC-804.1** — Notice required 30 days, served 18: the shortfall is 12 days. On a
  notice base of ₹60,000 a month under C1 the recovery is ₹60,000 × 12 ÷ 30 =
  ₹24,000.00, a separate line on the final payslip and in the F&F statement.
- **AC-804.2** — A recovery that, with the month's other deductions, would exceed the
  s.18(3) cap is split: the part within the cap is deducted, the excess is recorded as
  recoverable outside payroll with its reason, and the F&F statement shows both, still
  reconciling to the rupee (AC-801.1).
- **AC-804.3** — A shortfall waived in full produces a zero line with the waiver shown,
  so the settlement records that notice was short and waived, not that it was served.

**The exit month — edge cases the settlement must get right.**

| Case | What the engine does | Basis |
| --- | --- | --- |
| The date of leaving falls before the month's inputs close | The final month is computed in the regular run to the date of leaving (X counts the days after it, FR-PAY-109); gratuity, encashment and recoveries go in the same run or an F&F run, at the operator's choice | FR-PAY-801; §03 checklist item 3 |
| The date of leaving falls after the month is LOCKED | An F&F off-cycle run; the final month's PF follows the off-cycle routing of AC-305.2 — consolidated if locked before the Regular return is generated, a Supplementary or held line after | AC-305.2, FR-PAY-406 |
| The exit is marked on EPFO after contributions to a later month were filed in error | The later months go BLOCKED-joint-declaration; no contribution after the date of leaving is attempted until the correction is accepted | EV-041, AC-712.3 |
| An arrears batch covers a leaver | The leaver's arrears are paid in the F&F, recomputed per past month (FR-PAY-401), with the PF due month from the F&F's disbursal date | AC-401.2, FR-PAY-404 |
| The settlement straddles the tax year — exit in March, paid in April | The final TDS true-up follows the payment date (§06.5); the line is flagged as a wage month and payment date in different tax years, and its tax-year treatment follows §06.5's counsel routing | AC-801.3, AC-110.3 |
| The final wages' two-working-day clock and the gratuity's 30 days | Both clocks shown from the date of leaving; the bank file for the final wages is sequenced first | AC-803.1, AC-803.2 |

---

### 08.10 Bank / NEFT payment files

**FR-PAY-901 · Salary bank-file generation** · **P0**
The engine shall generate **bank-upload files for net-salary disbursement** in the
formats of the major Indian banks (per-bank fixed-width/CSV/Excel templates for
NEFT/RTGS/IMPS bulk upload) and a **generic NEFT/H2H** format, from the net figures of a
LOCKED payroll month (FR-PAY-301 M8).
- *Detail.* Bank formats differ per bank (HDFC, ICICI, SBI, Axis, Kotak, YES, etc.);
  the format is a **versioned, per-bank template**, not hard-coded, so a bank changing
  its layout is a config update (§06.12 R6 shape, applied to bank files).
- **AC-901.1** — The bank file's total credit amount equals the sum of employee net pay
  in the LOCKED month, to the rupee; a mismatch blocks file generation.
- **AC-901.2** — Each line carries the employee's beneficiary account, IFSC, name and a
  narration; an employee with missing/invalid bank details (an IFSC failing the §14.9
  format rule or absent from the maintained IFSC directory — IFSC carries no check
  digit) is flagged **before** file generation, not rejected at the bank.
- **AC-901.3** — Regenerating the file for the same run is **idempotent** — it does not
  produce a second payment; a reissue requires an explicit correction run (FR-PAY-306).
- **AC-901.4** — The file's total equals the LOCKED month's net pay less the net of
  employees on hold (FR-PAY-311) and of employees paid by cash or cheque (FR-PAY-905);
  each exclusion is listed with its reason, so AC-901.1's reconciliation holds for the
  file that is actually released.

**FR-PAY-902 · Statutory payments and challans** · **P0**
The engine shall compute the **payment figure** for each statutory head — PF, ESI, PT
and the TDS deposit — and reconcile it to the challan the authority's portal produces:
for EPF, the challan with TRRN generated after the return is approved (EV-036),
including any s.7Q interest the portal computes (EV-039); for ESI, the challan
generated on the ESIC portal (§06.3); for TDS, the deposit's challan identification
(CIN) captured on payment. A head's payment is initiated only after that head's part of
the payroll-month verification gate passes (FR-PAY-301 M10, evaluated per head under
FR-PAY-309), so the TDS deposit, due before the ECR, is never held behind the ECR
return.
- **AC-902.1** — Each statutory challan total equals the computed liability for that head
  and period; the CIN captured on payment feeds Form 138 reconciliation through the
  `.csi` import (AC-706.2).

**FR-PAY-903 · Payment status reconciliation** · **P0**
The engine shall record **payment confirmation** (bank return file, UTR, challan CIN)
and reconcile it against the pay run, flagging **failed/returned** credits for reissue.
Relabelled from P1 per §05.17 PR-01: credit reconciliation is R1 under §05.5 item 33
(C-22), because "paid" is not true until credits reconcile (§16.3).
- **AC-903.1** — A returned NEFT (wrong account) is flagged against the specific
  employee and re-queued, without re-paying the successful lines.

**FR-PAY-904 · Payment approval and segregation** · **P0**
Bank-file release shall require an authorised **payment approver** distinct from the
payroll processor (extends FR-PAY-304 to disbursement).
- **AC-904.1** — Generating a bank file and releasing it for payment cannot be done by a
  single unauthorised actor; the release is logged with actor and timestamp.

**FR-PAY-905 · The disbursal date per employee, and what a returned credit moves** · **P0**
The engine shall record the actual disbursal date per employee — from the bank's credit
confirmation, or from a recorded cash or cheque payment — as that employee's
`disbursal_date.actual` in the evaluation context (FR-PAY-210).
- *Detail.* §16.3 owns the batch mechanics: per-line status, the non-atomic batch,
  re-queueing exactly the failed lines, and the `disbursed-with-exceptions` hold. This
  FR owns what the dates do to the figures. The month reaches DISBURSED at release
  (M9); a returned line re-issued later carries its own, later date. That date keys
  three outputs: the Form 138 date of payment, and so the quarter and tax year the
  payment is reported in (§06.5); the PF due month of any arrears in the line (Part
  E-9); and the start of any interest exposure. Whether a returned and re-issued credit
  moves the date of payment for TDS — the tax was computed when the run was processed,
  and the salary reached the employee only on re-issue — is not established in this
  PRD's evidence. The engine records both dates, and the placement follows
  `tds.returned_credit_payment_date`, which ships unset and is routed to §20 V-20; a
  quarter containing such a line raises a configuration task before its statement is
  generated (FR-PAY-716).
- **AC-905.1** — An employee paid by cash or cheque has a payment record with the date,
  the mode and the approver; without it the employee's line is not disbursed, and
  VG-C1 fails for every head of the month.
- **AC-905.2** — A September 2026 salary credited on 30 September, returned, and
  re-issued on 1 October 2026 is surfaced before the Q2 statement is generated, with
  both dates and the quarter each would place it in — Q2 or Q3 (§06.5).
- **AC-905.3** — A re-issue never recomputes the salary; only the date-keyed outputs
  are re-derived, as a diff (AC-210.3).

---

### 08.11 Audit trail, controls and access

**FR-PAY-1001 · Immutable audit trail** · **P0**
Every create/update/delete of a monetary field, rule assignment, approval, filing and
payment shall be recorded immutably: actor, timestamp, before/after value, rule version
applied, and reason where required (I5).
- **AC-1001.1** — For any figure on any historical payslip or return, the engine can
  answer "who set this, when, from what, under which rule version" without reconstruction.
- **AC-1001.2** — The answer is a chain with every link stored: the input event and the
  route it took (FR-PAY-312); the snapshot and the paid fraction (FR-PAY-109); the rule
  versions; the evaluation context (FR-PAY-210); the fixed-point trace where a loop ran
  (AC-211.5); any configuration task and its class at the time (FR-PAY-1006); the
  approval and its signer (§03.6a); the artefact's hash (FR-PAY-717); and the portal's
  acknowledgement (FR-PAY-711). A missing link is a lineage defect that blocks release
  (§14 AC-DM-10).

**FR-PAY-1002 · Replay and recompute audit** · **P0**
The engine shall **replay** any historical pay run to reproduce its figures from its
input snapshot, rule-set version and stored evaluation context (I4, I6), and
**recompute** it against the period's rules (I3), showing any difference — the audit
primitive behind arrears (FR-PAY-401) and corrections (FR-PAY-708). Replay covers the
bitemporal classes and the snapshot, not the erasable classes (I4, K-24); it supports
evidence production in an audit or inspection and does not by itself discharge any
contractual audit, access or inspection obligation (K-21).
- **AC-1002.1** — Replaying a closed period with unchanged rules and inputs reproduces
  identical figures; any difference indicates a rule/input change and is itemised
  (§06.14 TV12).
- **AC-1002.2** — Replaying a month locked on a provisional figure (FR-PAY-1006, class
  K2) reproduces the provisional figure, because replay uses the run's own rule
  versions and decision time; the correction run that followed the parameter's setting
  shows the new figure, and both stay in the audit trail.

**FR-PAY-1003 · Role-based access and data-minimisation** · **P0**
Payroll data (salary, PAN, bank, statutory IDs) shall be governed by **role-based
access** — an ESS employee sees only their own; a manager sees none by default; a
payroll admin sees their establishment; a CA console gets **read-only audit access**
(§16).
- *Detail.* **[Reversed]** An earlier draft stated that DPDP s.7(i) removes the consent
  requirement for employment-purpose processing, as current law. It is not in force:
  DPDP's substantive provisions, s.7(i) included, commence on or about 13 May 2027
  (EV-058). DPDP itself creates no sensitive category of personal data (s.2(t),
  EV-059) — **and** the SPDI Rules 2011 are live today: SPDI r.3 lists financial
  information as sensitive personal data, and r.5(1) requires consent in writing before
  it is collected (EV-060). Whether the SPDI Rules survive the omission of IT Act s.43A
  when DPDP s.44(2) commences is a counsel question (Part D-12). Payroll therefore
  captures written consent for the financial
  information it collects, through the versioned consent entity (§07, §14), and cannot
  backfill it for migrated employees (Part E-12). Who owes the SPDI written-consent duty
  is a counsel question; consent capture is built either way (Part D-4, §23). When
  s.7(i) commences it disapplies consent and notice for employment purposes only; it
  does not disapply the s.8 duties (K-03). The CERT-In Directions apply from day one —
  six-hour incident reporting and 180 days of ICT logs within Indian jurisdiction
  (EV-062) — and role-based access control is built from day one regardless of which
  consent regime is in force (§17).
- **AC-1003.1** — A manager cannot view a report's salary figures; an ESS user cannot
  query another employee's payslip; every access to salary/PAN/bank is logged, with ICT
  logs kept for 180 days within Indian jurisdiction (CERT-In Directions 28.04.2022,
  EV-062).
- **AC-1003.2** — Every collection of a bank-account or other financial-information field
  records either the written-consent artefact under the regime in force on the
  collection date (EV-060) or its absence; an absent artefact is surfaced to the operator
  as a consent task (§07), never silently ignored.

**FR-PAY-1004 · Pre-run validation gate** · **P0**
Before a month can be APPROVED (FR-PAY-301 M6), the engine shall run a validation suite
that separates **blocking** failures from **non-blocking flags**, and surface every item
with its remediation.
- **Blocking** (a figure would be wrong): negative net; structure not summing to CTC;
  missing work location for PT/LWF; a component with no wage-base flags set
  (AC-101.4); a fixed-point node that has not converged (AC-211.3); missing or invalid
  bank details for an employee paid by bank transfer; a valuation parameter a figure
  needs that is unset for the period — a perquisite value (AC-106.4) or, on a bonus
  payout run, a bonus ceiling not yet confirmed with its source (AC-208.4) — resolved by
  the operator entering the value in force with its source; an open reprocess-or-defer
  decision (AC-111.3); any other blocking-class configuration task (FR-PAY-1006).
- **Non-blocking flags** (the pay run proceeds; the item routes to a queue): an
  un-seeded or KYC-incomplete UAN — **exclude-and-flag** from the ECR with notices to
  the operator and the employee (AC-701.2); an inoperative PAN — flagged, with a
  configuration task while `tds.inoperative_pan_rule` is empty (AC-205.3, TV11); a
  statutory threshold crossing (§06.1 latch — e.g., a tenant crossing 20 turns on EPF);
  a filing instance BLOCKED pending layout, regime, chronology or joint declaration
  (FR-PAY-711) — shown against its deadline, never a reason to hold salaries.
- *Detail.* The product treats Aadhaar as optional everywhere, EPF and ESI flows
  included, so no Aadhaar- or UAN-seeding state may ever block payroll and no hard-block
  configuration ships (Part E-11; Part D-10 keeps the statutory question with counsel;
  §06.14 TV13). §05.6
  Example A names the **20-crossing detected inside the product** as "the single
  highest-intent acquisition moment in the beachhead" — this suite is where the engine
  detects it and moves the tenant from "not registered for EPF" to "first ECR accepted,
  approved and paid", with every portal step prepared in-product and performed in an
  attended session — by the employer's own user, or by our operator under written
  authority to act once the operator-attended mode's counsel fence clears (K-13, Part
  D-17, §22 FR-OPS-001).
- **AC-1004.1** — A month with any blocking failure cannot be APPROVED; each failure
  links to its fix. A non-blocking flag never prevents approval.
- **AC-1004.2** — When the establishment's count, in the counting unit the statute uses,
  crosses 20 for the first time, the engine raises the EPF registration and first-ECR
  tasks automatically, prepared for the employer's attended portal session, plus a
  per-employee UAN task that prompts and tracks each employee's **own** UAN allotment
  and activation — since 1 August 2025 that route is the employee's, through Aadhaar
  Face Authentication in the UMANG app, with the employer route surviving only for
  International Workers and Nepal/Bhutan citizens (one EPFO Head Office circular dated
  30.07.2025, r4/04 — re-verified as not superseded before the flow is built; §05.6
  Example A). An employee without a UAN is exclude-and-flag on the ECR (AC-701.2), never
  a payroll block (Part E-11). (§06.1 product implication; Source: CoSS First Schedule,
  Ch. III, EV-057 — the scheduled-employments limitation is removed.) The customer need
  not know the threshold exists. The counting unit and sphere are schema fields, never assumed
  (EV-057; §06.13).
- **AC-1004.3** — When the count crosses **10** (the ESI and gratuity thresholds, on
  the look-back each statute uses), the engine latches the obligation on and does not
  silently drop it if headcount later dips (§06.1, §06.12 R4). A class-specific
  threshold overrides the default (the central-sphere ESI extension at 20 is §06.14
  TV23).

**The validation item — data definition.** Every item the suite raises, blocking or
flag, is one record:

| Field | Content |
| --- | --- |
| `item_id` | Stable identifier |
| `class` | Blocking or flag |
| `code` | An FR-PAY-713 family code for an item on a statutory artefact; otherwise the FR and AC that raised it |
| `subject` | The employee, component, filing instance or parameter it concerns |
| `evidence` | The values compared, with their rule versions |
| `raised_at`, `raised_in` | Time, and the run version that raised it |
| `route` | The remediation — the queue, the task or the screen |
| `resolved_by`, `resolved_at`; or `waived_by`, `waiver_reason` | Resolution, or a waiver where §03's checklist rule allows one (AC-M01.3; FR-PAY-310) |

Reprocessing re-evaluates every open item; an item whose condition no longer holds
closes itself, with the reprocess recorded as its resolution.

- **AC-1004.4** — The approval artefact lists every item open at approval — flags
  included — with its age, so the approver signs over a known set of exceptions
  (§03.6a).

**FR-PAY-1005 · Statutory-change watcher integration** · **P0**
The engine's rule tables shall be updatable only through the compliance data pipeline
and its **statutory-change watcher** (§22), which catches **amendments and corrigenda,
not just new instruments** — because a watcher keyed only to new notifications would
have missed the corrigendum that inverted the entire November 2026 EPF analysis (§06.9).
(Source: §06.9 cliff analysis — the uncorrected S.O. 5319(E) enumeration versus
corrigendum S.O. 5936(E) of 19.12.2025; §02.4.)
- **AC-1005.1** — A notified rate/slab change becomes an **effective-dated rule version**
  (I2) with a documented source (gazette/notification URL + date) and a corrigendum check
  before it applies; no rule ships without provenance (§02.4 corrigendum standing rule,
  §02.5 source-capture discipline).
- **AC-1005.2** — The fenced formats are named watcher dependencies: the Form 138 Q4
  regular and correction formats are monitored on Protean's regular and correction
  download pages, keyed on the Q4 anchors ceasing to be dead links — never on the pages'
  "Updated As On" footer, which is client-side script printing the visitor's own date
  (r5/02 findings 19–20, 36; EV-046). A release moves the dependent filing instances out
  of BLOCKED (FR-PAY-711 F3) only after the new schema version is published through §22.

---

### 08.11-A Named parameters and the configuration task

Part A rule 2 turns every value the evidence does not give into a named parameter. This
subsection fixes what the engine does while one is unset, so that "no shipped default"
never becomes a guessed figure or an unexplained stall.

**FR-PAY-1006 · The configuration task** · **P0**
When a figure needs a parameter that is unset for its period, the engine shall raise a
**configuration task** — the parameter, the period, the employees and heads it holds,
its class, its owner and its §20 route — and shall behave as the class below says. A
task closes only when a value is entered as a rule version with its source, the person
who set it and a reviewer who is not that person (I2; §22.8's two-person review for a
statutory value).

| Class | While the parameter is unset | Parameters in this section |
| --- | --- | --- |
| **K1 · Blocks the figure** | The figure cannot be formed; a blocking validation holds the month at PROCESSED (FR-PAY-1004) | `perq.*` for a head in use (AC-106.1, AC-106.4); the bonus ceiling on a payout run (AC-208.4); `fixed_point.max_iterations`, `fixed_point.tolerance`, `money.internal_scale`; a pay group's convention with `pay.c3.divisor`, `pay.c3.weekly_off_payable`, `pay.c3.holiday_payable` (FR-PAY-109); `pay.split_month_method` on a split month under C1 or C3 (AC-109.4); `pay.lop_reversal_lookback_months` for a reversal (FR-PAY-405); `pay.net_rounding_carry` (RP8) |
| **K2 · Proceeds, provisional** | Pay proceeds on the computation the FR names, or at full precision where it names none; the figure is marked provisional on the payslip, the approval artefact and the gate, and the named approver confirms it at the head's gate check VG-C3 before that head is paid | `esi.rounding_rule` (AC-203.2); `epf.rounding_method` (AC-209.6); `esi.average_daily_wage_basis` (AC-203.3); `eps.age58_part_month` (AC-202.6); `epf.ceiling_prorate_part_month` (Example B); `pt.MH.band_boundary_rule` (AC-204.1); `pt.<state>.wage_basis` (AC-204.5); `pt.MH.exit_topup_rule` (AC-204.6); `pt.article276_cap_scope` (AC-204.3); `tds.inoperative_pan_rule` (AC-205.3); `tds.regime_switch_window` (FR-PAY-503); `gratuity.payable_ceiling` (FR-PAY-206); `wages.deduction_overflow_method` (FR-PAY-403); `ecr.revised_scope` (FR-PAY-714); `ecr.ncp_attribution_offset` (FR-PAY-110); `ecr.ncp_fractional_rule` (AC-109.7); `epf.transfer_month_rule` (AC-105.2); `bonus.cap_prorate_part_month` (AC-208.6); `pay.hold_statutory_treatment` (FR-PAY-311) |
| **K3 · Regime mode** | Computation follows a mode the tenant's approver sets with counsel; the filing instances render BLOCKED-pending-regime | `esi.post_cliff_mode`, `esi.cliff_month_split` (AC-203.4); `epf.post_cliff_eps_edli_mode` (AC-202.7) |
| **K4 · Forecast only** | The figure is shown as "unavailable — parameter unset"; nothing payable or filable depends on it | `epf.damages_scale`, `esi.damages_scale`, `tds.late_fee_per_day`, `tds.late_fee_cap` (AC-710.3); `epf.interest_day_count`, `epf.interest_base` (§06.2; FR-PAY-715); `tds.interest.part_month_rule` (AC-715.5); `epf.admin_charge.minimum` (AC-102.1); `bonus.payment_deadline` (FR-PAY-208) |
| **K5 · Artefact held** | The artefact is not generated; the obligation stays on the calendar with the reason (AC-710.4) | `bonus.annual_return_form` (FR-PAY-705); `tds.f138.dd_granularity`, `tds.f138.nil_deduction_rows` (FR-PAY-716); `tds.returned_credit_payment_date` (FR-PAY-905); `ecr.line_terminator`, `ecr.encoding` (§06.2) before general availability |
| **K6 · File precision until set** | The figure is carried at the precision of the file it reaches; nothing is held | `tds.rounding_method` — two decimals, the Form 138 file's precision (RP6, RP10) |

- **AC-1006.1** — Every parameter this section names that ships without a value belongs
  to exactly one class, and a parameter added later is classed when it is introduced; a
  product setting that ships with this product's own default, such as
  `ecr.filename_template`, never raises a task. The class decides the behaviour; no code
  path special-cases a parameter's name.
- **AC-1006.2** — A value entered without a source, or set and reviewed by the same
  person, is refused. The source is a gazette or portal capture for a statutory value,
  or a recorded tenant decision for a policy value such as a day-rate convention.
- **AC-1006.3** — The open tasks for a tenant — class, age, and the heads and filings
  each holds — form one view for the compliance desk, and each appears as one line in
  the approval artefact (AC-1004.4).
- **AC-1006.4** — Setting a value never re-rates a LOCKED month; months locked under a
  provisional figure are recomputed by a correction run against the new rule version
  (I3; FR-PAY-307), and the provisional marker on their payslips points to it.
- **AC-1006.5** — The K5 desk reads that block a first artefact — the Form 138 field
  transcription and its nil-row and returned-credit questions, the ECR encoding and
  line terminator — are scheduled before the first statement or return that needs
  them (§05's release gate), so a K5 hold is a planned dependency, not a surprise in a
  filing week.

---

### 08.12 Worked examples

These are the end-to-end computations the acceptance tests are built from. All rates
trace to §06 and to the golden vectors §06.14. Figures are illustrative but internally
exact; TDS figures use the **FY2025-26 verified** slabs and rebate (Tax Year 2026-27 is
[Hypothesis] pending verification against the rates in force for that year, §06.13). Wage bases follow the Code definition:
special allowance is wages, not an excluded head (§06.10).

Each example is a release test (G11). The last column says what must be re-baselined
when an open input resolves, so a resolved hypothesis reaches every example it touches.

| Example | What it fixes | Reproduced by | Inputs still open |
| --- | --- | --- | --- |
| A — standard payslip | No add-back; the rebate zeroing TDS; an uncapped gratuity accrual | AC-201.2; AC-205.6 | `tds.standard_deduction.new`, carried; the EPF admin rate, **[Hypothesis]** |
| B — mid-month join | Proration with the ceiling still binding | AC-104.1 | `epf.ceiling_prorate_part_month` |
| C — arrears | Per-month recompute; the regime dependence of the tax delta | AC-401.1 | The old-regime standard deduction, carried |
| D — the 50% add-back | Four bases on one payslip | AC-201.1 | — |
| E — full and final | The settlement's lines and the 6-month rounding | AC-801.1 | The final TDS; `tax.gratuity_exemption_ceiling`, carried |
| F — dual-regime TDS | Both projections and the default for a silent employee | AC-205.1 | The standard deductions, carried; Tax Year 2026-27 slabs (AC-205.6) |
| G — add-back fixed point | Convergence at iteration 5 | AC-211.2 | The accrual-is-not-remuneration reading (§06.10 payload) |
| H — gross-up fixed point | Convergence across a slab boundary | AC-212.1 | Tax Year 2026-27 slabs; `tds.rounding_method` for the final figure |
| I — day-rate conventions | Three conventions, three ECR lines | AC-109.1; AC-109.2 | `epf.rounding_method`; `esi.rounding_rule`; the convention list, **[low]** |
| J — joiner catch-up | Pay in the next run; the held PF line and its M+4 deadline | AC-407.1 | §06.2 row 8; ESIC's path for a late-paid month |
| K — mixed correction | Revised, gate, Supplementary, arrears aside | AC-714.1 | `ecr.revised_scope`; the arrear layout (§05 F-03) |
| L — mid-year revision | Actuals plus the months to come, spread | AC-213.1 | Tax Year 2026-27 slabs; the standard deduction, carried |
| M — mid-year cutover | Opening balances as evaluation inputs; the quarter a cutover does not divide | AC-314.3; AC-314.4; AC-315.1 | Tax Year 2026-27 slabs; the standard deduction, carried; ESIC's path for a straddling period (AC-305.2) |

#### Example A — Standard monthly payslip (single, full-month, Karnataka)

Employee: monthly gross ₹75,150 (annual ₹9,01,800; CTC ≈ ₹9.6L with employer costs
inside per FR-PAY-102). Structure: Basic ₹40,000, HRA ₹20,000, special allowance
₹15,150. Work state Karnataka. New default tax regime, no declarations. PF on ceiling.

| Head | Basis | Amount (₹) | Note |
| --- | --- | --- | --- |
| Basic | fixed | 40,000 | wages — PF/gratuity base |
| HRA | fixed | 20,000 | excluded head — in the ESI and payment-of-wages bases, not the PF/gratuity base (employee above the ESI ceiling anyway) |
| Special allowance | balance | 15,150 | wages — PF/gratuity base (not an excluded head, §06.10) |
| **Gross earnings** | | **75,150** | |
| Employee EPF | 12% × min(PF base, 15,000) | −1,800 | PF base = Basic + special ₹55,150 (no add-back: excluded HRA is 26.6% < 50%), capped at ₹15,000 (TV7) |
| Professional Tax | KA slab: ₹25,000 or above | −200 | a non-February month; ₹300 in February (§06.4) |
| TDS u/s 392 (ex-s.192) | new-regime projection ÷ 12 | −0 | see note below |
| **Total deductions** | | **−2,000** | |
| **Net pay** | gross − deductions | **73,150** | to bank (FR-PAY-901) |
| *Employer EPF (CTC, not paid to emp)* | | *550* | ₹550 of the ₹1,800; balance to EPS |
| *Employer EPS* | 8.33% capped | *1,250* | §06.2 cap (TV1) |
| *EDLI + EPF admin* | 0.5% + 0.5% | *75 + 75* | employer cost; the admin rate is **[Hypothesis]** (§06.2) |
| *Gratuity accrual* | (15/26) × wages ₹55,150 ÷ 12 | *2,651.44* | accrual ledger (FR-PAY-206) |

Two teaching points. First, the **add-back does not trigger**: the only excluded head
here is HRA (₹20,000 = 26.6% of ₹75,150), below one-half, so the PF/gratuity wage is
Basic + special allowance = ₹55,150 — capped at the ₹15,000 ceiling for PF (TV7) but
**uncapped for the gratuity accrual**. **[Reversed]** An earlier version of this example
counted special allowance as an excluded component and set the PF base, and the gratuity
accrual, on Basic alone (₹1,923 a month). Special allowance is not an excluded head
(§06.10), so the accrual is ₹2,651.44. The employee is **outside ESI** (gross >
₹21,000), so no ESI. Second, **TDS projects to ₹0** here: annual gross ₹9,01,800 −
₹75,000 standard deduction (the carried value of `tds.standard_deduction.new`,
**[Hypothesis]**) = ₹8,26,800 taxable, and the FY2025-26 new-regime **s.87A rebate (nil
tax to ₹12L taxable)** zeroes the liability — as it would with no standard deduction
at all, since ₹9,01,800 is itself under ₹12L. This is itself a golden
behaviour — a naive engine that applies slab tax without the rebate over-deducts.
*(Tax Year 2026-27 [Hypothesis]: re-verify the rebate ceiling against the rates in force for the year before
the year's run; AC-205.6.)* Example F shows a higher earner where TDS bites.

#### Example B — Mid-month join proration (FR-PAY-104)

Same structure as A, employee joins **16 September** (30-day month, calendar-days
basis). Paid days 15/30.

- Gross = ₹75,150 × 15/30 = **₹37,575**.
- PF: wage base = prorated wages (Basic ₹20,000 + special ₹7,575) = ₹27,575, capped at
  the ₹15,000 ceiling → employee EPF ₹1,800 (the ceiling still binds; it is not
  pro-rated for a part month unless `epf.ceiling_prorate_part_month` says so — a
  carried, not re-captured item with no shipped default, §06.13). *If* the employer
  elected actual-wage below ceiling, PF would prorate; here the ceiling absorbs it.
- PT (Karnataka): ₹200 for the month (PT is a monthly slab on the month's earned wage,
  not day-prorated; the ₹37,575 earned still exceeds the ₹25,000 KA threshold).
- ESI: out of coverage — the contracted monthly wage (₹75,150) is above ₹21,000, and the
  prorated ₹37,575 is above it too, so the part-month question in FR-PAY-104
  (**[Hypothesis]**) does not arise here.
- TDS: annual projection now spans 6.5 months of earning; the September run projects
  full-year tax on the prorated year and spreads it (FR-PAY-205 AC-205.2).
- **Acceptance:** the payment-of-wages register and the payslip show 15 paid days and the
  day-rate convention applied; PF/PT are computed on the prorated base (AC-104.1).

#### Example C — Arrears from a back-dated increment (FR-PAY-401)

Employee on ₹60,000/month gets a revision to ₹70,000 **effective 1 April**, entered and
processed in the **July** run. April–June are closed. Employee is on the **old regime**
with no Chapter VI-A declarations, to keep the arithmetic visible (the old regime is
chosen deliberately here: under the new regime the FY2025-26
s.87A rebate zeroes tax up to ₹12L taxable, so this earner's TDS would be nil and the
arrears would carry no tax delta — see the note below).

Per-month recompute (each against **that month's** rules, I3; TV12):

| Month | Old gross | New gross | Δ gross | Δ PF (emp) | Δ PT | Δ TDS | Δ net |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Apr | 60,000 | 70,000 | 10,000 | 0 (ceiling) | 0 (already max slab) | 2,080 | 7,920 |
| May | 60,000 | 70,000 | 10,000 | 0 | 0 | 2,080 | 7,920 |
| Jun | 60,000 | 70,000 | 10,000 | 0 | 0 | 2,080 | 7,920 |
| **Arrears** | | | **30,000** | **0** | **0** | **6,240** | **23,760** |

Paid in July as an **arrears line**; July's own run also reflects the new ₹70,000. PF is
0 in the delta because the PF wages at both ₹60,000 and ₹70,000 exceed the ₹15,000
ceiling; PT is 0 because both figures already sit in Karnataka's top ₹200/mo slab. The
₹10,000/mo increment falls entirely in the old-regime 20% slab (taxable moves ₹6.70L →
₹7.90L after the carried ₹50,000 old-regime standard deduction, **[Hypothesis]**; both
figures sit between ₹5L and ₹10L with or without it), so marginal TDS ≈ **20.8%** (20% +
4% cess) = ₹2,080/mo.
**Teaching point on regime dependence:** had the employee been on the new default regime,
Δ TDS would be **0** — the arrears would still recompute PF/ESI/PT per month, but the tax
delta vanishes under the rebate. If a PT slab or PF rate had changed between April and
July, the recompute would use the **April-in-force** version (AC-401.3, TV12), not
July's. Arrears PF (if a base moved below ceiling) would **not** be written into April–
June's ECR files: it is computed against those wage months but its liability dates from
the July disbursal date (Part E-9, AC-401.2), and it goes through EPFO's separate "File
Arrear Return" flow, which is fenced until a layout is published (EV-043). Note too that
a lump-sum arrears payment can trigger arrears relief for the employee — s.89(1) / Form
10E for FY 2025-26, s.157(1) / Form 39 from Tax Year 2026-27 — see AC-205.7.

#### Example D — The 50% wage add-back (FR-PAY-201, §06.10, TV6)

Monthly remuneration ₹1,00,000: Basic ₹35,000, HRA ₹20,000, conveyance ₹10,000,
commission ₹35,000. Excluded components (HRA + conveyance + commission, all among heads
(a)–(i)) = ₹65,000 = **65%** of ₹1,00,000. Half of remuneration = ₹50,000. Excess over
50% = **₹15,000 added back**. (Source: Code on Wages s.2(y) / CoSS s.2(88); §06.10.)
**[Reversed]** An earlier version reached 65% by counting a ₹35,000 "special allowance"
as excluded. Special allowance is not an excluded head, and relabelling universal pay
does not move it out of wages (§06.10, §06.2) — with special allowance in that slot the
excluded share is 30% and nothing is added back.

- **PF wage base** = Basic ₹35,000 + add-back ₹15,000 = **₹50,000**, then capped at the
  ₹15,000 statutory ceiling for PF (or actual, if the employer opts in).
- **Gratuity wage base** = ₹50,000 (the add-back raises gratuity even though the PF
  ceiling absorbs it — which is exactly why gratuity and PF cannot share one base field,
  I1).
- **ESI base** = gross (not applicable here, above ceiling).
- **Bonus wage base** = the notified amount (legacy ₹7,000) or the scheduled-employment
  minimum wage, whichever is higher (FR-PAY-208) — a fourth, unrelated base on the same
  payslip.
- **Payment-of-wages base** = full ₹1,00,000.

**Acceptance:** the engine reports all bases distinctly, each stamped with the
wage-definition rule version (AC-201.1, AC-201.3).

#### Example E — Full-and-final settlement (FR-PAY-801)

Employee resigns effective **20 September** after **6 years 4 months** (rounds down to 6,
TV8), last-drawn wages ₹52,000 (the CoSS s.2(88) wage with no add-back triggered —
§06.6), monthly gross ₹75,150, 12 days of leave to encash, a ₹40,000 salary advance
outstanding, one month notice served (no recovery), pending ₹8,000 reimbursement with
proof.

| Component | Basis | Amount (₹) |
| --- | --- | --- |
| Sept salary (20/30 days) | proration | +50,100 |
| Leave encashment (12 days) | (wages ÷ 26) × 12, the tenant's encashment base | +24,000 |
| Gratuity | (15/26)×52,000×6 | +1,80,000 |
| Pending reimbursement | proof-verified | +8,000 |
| Salary-advance recovery | balance | −40,000 |
| Final TDS true-up | actual YTD | −X |
| **F&F net** | | **= sum, to the rupee** |

Gratuity ₹1,80,000 is **tax-free** if the employee's unused lifetime exemption under
`tax.gratuity_exemption_ceiling` covers it (v0.3's carried ₹20 lakh, **[Hypothesis]**,
§06.6), which it does here unless earlier employers' gratuity has used it. Note the **6-month rounding
rounds 6y 4m down to 6 years** (TV8) — 6y 8m would have rounded up to 7. Final TDS is
computed on **actual** year-to-date income with proof-verified declarations (AC-801.3),
possibly producing a refund adjustment. Gratuity is flagged for payment within **30
days** (AC-803.1). September's ECR carries contributions only up to 20 September
(EV-040); the **date of exit is marked on the EPFO portal** in an attended session — it
is not an ECR file field (AC-802.1). The exit emits a **continuity packet** (YTD, TDS,
UAN, ESI IP, leave, gratuity accrual) for the next employer (AC-802.2) and a final
payslip; the partial-year Form 130 is the TRACES-generated certificate, distributed after
the year's Q4 statement (FR-PAY-707, FR-PAY-803).

#### Example F — Dual-regime TDS comparison (FR-PAY-205)

Employee: annual gross ₹18,00,000 (₹1,50,000/mo), declares old-regime 80C ₹1,50,000,
80D ₹25,000, HRA exemption computed at ₹1,80,000. FY2025-26 slabs (verified, §06.5);
standard deductions are the carried values of `tds.standard_deduction.<regime>`
(**[Hypothesis]**, as in §06.5's own worked example).

| | New regime (s.115BAC) | Old regime |
| --- | --- | --- |
| Gross | 18,00,000 | 18,00,000 |
| Standard deduction (carried, [Hypothesis]) | −75,000 | −50,000 |
| HRA exemption | — | −1,80,000 |
| Chapter VI-A (80C + 80D) | — | −1,75,000 |
| **Taxable income** | **17,25,000** | **13,95,000** |
| Tax (before cess) | 1,45,000 | 2,31,000 |
| + 4% cess | 5,800 | 9,240 |
| **Annual TDS** | **1,50,800** | **2,40,240** |
| **Monthly TDS (÷12)** | **≈ 12,567** | **≈ 20,020** |

New-regime tax builds from the FY2025-26 slabs: 5% on ₹4–8L (₹20,000) + 10% on ₹8–12L
(₹40,000) + 15% on ₹12–16L (₹60,000) + 20% on ₹16–17.25L (₹25,000) = **₹1,45,000**.
Old-regime: 5% on ₹2.5–5L (₹12,500) + 20% on ₹5–10L (₹1,00,000) + 30% on ₹10–13.95L
(₹1,18,500) = **₹2,31,000**. Here the **new regime is cheaper** (₹1.51L vs ₹2.40L), so a
silent employee defaults to it and pays ≈ ₹12,567/mo. **Acceptance:** the engine reports
both figures, and switching the election inside `tds.regime_switch_window` re-projects
the remaining months without disturbing amounts already deducted (AC-205.1). The
ranking is robust for this employee: adding a ₹2L home-loan interest deduction (s.24)
takes old-regime taxable income to ₹11,95,000 and tax to ₹1,71,000 + ₹6,840 cess =
₹1,77,840, still above the new regime's ₹1,50,800. For a different income and deduction
mix the ranking can flip (§06.5), which is precisely why both projections run every
period and the golden suite carries a case on each side of the crossover. *(Slab
figures illustrative on FY2025-26; Tax Year 2026-27 pending AC-205.6.)*

#### Example G — The add-back as a bounded fixed point (FR-PAY-211, I7)

A sales role on a fixed monthly CTC of ₹1,00,000: Basic ₹30,000, HRA ₹15,000,
conveyance ₹5,000, commission ₹40,000, a special allowance that closes CTC as the balance
figure (FR-PAY-101), and a gratuity accrual carried inside CTC as an employer-cost line
(FR-PAY-102) at (15/26) × wages ÷ 12 = 15/312 of the s.2(88) wage, because gratuity
wages include the add-back (§06.6). Employer PF is quoted outside CTC in this structure,
to keep the illustration to one loop. Excluded heads paid — HRA, conveyance and
commission — total ₹60,000.

The loop: special = ₹10,000 − gratuity accrual; all remuneration = ₹90,000 + special;
add-back = ₹60,000 − half of all remuneration; wages = Basic + special + add-back;
gratuity accrual = 15/312 × wages. The add-back re-bases the accrual, the accrual moves
the balance figure, and the balance figure moves the add-back's own denominator. A
one-pass evaluator has to pick an order and publish a first iterate. Iteration 1 starts
from an accrual on Basic (₹1,442.31); tolerance ₹0.01 on wages:

| Iteration | Accrual in (₹) | Special (₹) | All remuneration (₹) | Add-back (₹) | Wages (₹) | Change in wages (₹) |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | 1,442.31 | 8,557.69 | 98,557.69 | 10,721.15 | 49,278.85 | — |
| 2 | 2,369.18 | 7,630.82 | 97,630.82 | 11,184.59 | 48,815.41 | 463.43 |
| 3 | 2,346.89 | 7,653.11 | 97,653.11 | 11,173.45 | 48,826.55 | 11.14 |
| 4 | 2,347.43 | 7,652.57 | 97,652.57 | 11,173.72 | 48,826.28 | 0.27 |
| 5 | 2,347.42 | 7,652.58 | 97,652.58 | 11,173.71 | 48,826.29 | 0.006 (under tolerance) |

Converged: wages **₹48,826.29**, gratuity accrual **₹2,347.42**, special allowance
**₹7,652.58**, add-back **₹11,173.71**; the add-back triggers (TV6 behaviour) and the PF
base is then capped at ₹15,000. The loop gain is 15/624 per iteration, so convergence is fast — but a
one-pass engine is still wrong in one of two ways: it accrues gratuity on Basic
(₹1,442.31 — ₹905.11 short of ₹2,347.42), or it accrues on the first-iterate wage
(₹2,369.18) and CTC stops reconciling by ₹926.87 (₹90,000 + ₹8,557.69 + ₹2,369.18 =
₹1,00,926.87), failing AC-102.2. **Acceptance:** AC-211.2 reproduces this table exactly,
and statutory rounding applies only to the converged values (FR-PAY-209). (Illustrative
reading: the gratuity accrual is not remuneration paid and does not enter the (a)–(i)
test; the reading is carried in the wage-definition rule payload, §06.10.)

#### Example H — A net-of-tax payment as a bounded fixed point (FR-PAY-212)

Example F's employee is on the new regime, with projected taxable income ₹17,25,000 and
annual tax ₹1,50,800 (FY2025-26 slabs, the worked base; Tax Year 2026-27 pending
AC-205.6). The employer promises a one-time payment **net** of tax. The tax attributable
to a gross G is the rise in projected annual tax it causes: 20% plus 4% cess — 20.8% —
on the part of G that keeps taxable income inside the ₹16–20 lakh band, and 25% plus
cess — 26% — on any part inside the ₹20–24 lakh band (§06.5). No surcharge applies below
₹50 lakh, and the rebate is out of reach above ₹12 lakh. The node iterates G ← net +
tax(G), starting from G = net, and stops when G moves by less than ₹0.01. Iterates are
carried at full precision and shown to the paisa.

**H1 — a net of ₹50,000.** Every iterate stays inside the 20% band.

| Iteration | G in (₹) | Tax on G (₹) | G out (₹) | Change (₹) |
| --- | --- | --- | --- | --- |
| 1 | 50,000.00 | 10,400.00 | 60,400.00 | 10,400.00 |
| 2 | 60,400.00 | 12,563.20 | 62,563.20 | 2,163.20 |
| 3 | 62,563.20 | 13,013.15 | 63,013.15 | 449.95 |
| 4 | 63,013.15 | 13,106.73 | 63,106.73 | 93.59 |
| 5 | 63,106.73 | 13,126.20 | 63,126.20 | 19.47 |
| 6 | 63,126.20 | 13,130.25 | 63,130.25 | 4.05 |
| 7 | 63,130.25 | 13,131.09 | 63,131.09 | 0.84 |
| 8 | 63,131.09 | 13,131.27 | 63,131.27 | 0.18 |
| 9 | 63,131.27 | 13,131.30 | 63,131.30 | 0.04 |
| 10 | 63,131.30 | 13,131.31 | 63,131.31 | 0.008 (under tolerance) |

Converged: gross **₹63,131.31**, tax **₹13,131.31**, net ₹50,000.00. The loop gain is
the marginal rate, 0.208, so each iteration cuts the change to about a fifth; in this
single band the answer equals ₹50,000 ÷ 0.792.

**H2 — a net of ₹2,50,000.** The first iterate already lifts taxable income past ₹20
lakh, so every later iteration meets 26% at the margin.

| Iteration | G in (₹) | Tax on G (₹) | G out (₹) | Change (₹) |
| --- | --- | --- | --- | --- |
| 1 | 2,50,000.00 | 52,000.00 | 3,02,000.00 | 52,000.00 |
| 2 | 3,02,000.00 | 64,220.00 | 3,14,220.00 | 12,220.00 |
| 3 | 3,14,220.00 | 67,397.20 | 3,17,397.20 | 3,177.20 |
| 4 | 3,17,397.20 | 68,223.27 | 3,18,223.27 | 826.07 |
| 5 | 3,18,223.27 | 68,438.05 | 3,18,438.05 | 214.78 |
| 6 | 3,18,438.05 | 68,493.89 | 3,18,493.89 | 55.84 |
| 7 | 3,18,493.89 | 68,508.41 | 3,18,508.41 | 14.52 |
| 8 | 3,18,508.41 | 68,512.19 | 3,18,512.19 | 3.78 |
| 9 | 3,18,512.19 | 68,513.17 | 3,18,513.17 | 0.98 |
| 10 | 3,18,513.17 | 68,513.42 | 3,18,513.42 | 0.26 |
| 11 | 3,18,513.42 | 68,513.49 | 3,18,513.49 | 0.07 |
| 12 | 3,18,513.49 | 68,513.51 | 3,18,513.51 | 0.02 |
| 13 | 3,18,513.51 | 68,513.51 | 3,18,513.51 | 0.005 (under tolerance) |

Converged: gross **₹3,18,513.51**; taxable income ₹20,43,513.51, inside the 25% band;
tax = 20.8% × ₹2,75,000 up to ₹20 lakh + 26% × ₹43,513.51 above it = ₹57,200.00 +
₹11,313.51 = **₹68,513.51**; net ₹2,50,000.00. Solving at the entry rate instead —
₹2,50,000 ÷ 0.792 = ₹3,15,656.57 — ignores the band crossing: the tax on that gross is
₹67,770.71 and the employee nets ₹2,47,885.86, **₹2,114.14 short** of the promise
(AC-212.2). The iteration needs no knowledge of where the bands lie; it finds the
crossing because each iterate asks the slab rule for the tax.

**After convergence.** The tax is rounded once under `tds.rounding_method` and the gross
is re-derived as net plus the rounded tax — if the method rounds to whole rupees, H1's
payment is ₹50,000 + ₹13,131 = ₹63,131 — and the whole tax is deducted from this
payment, not spread (FR-PAY-212). Either table, read from the stored trace, is the audit
answer for the figure (AC-211.5).

#### Example I — One month's attendance under the three day-rate conventions (FR-PAY-109)

**Part 1 — the paid amount.** Contracted ₹60,000 a month. Under C3 the divisor is 30,
and weekly offs and holidays are payable.

| Month | Days (D) | Unpaid (U) | C1 · Fixed 30 | C2 · Calendar days | C3 · Actual attendance |
| --- | --- | --- | --- | --- | --- |
| October 2026 | 31 | 0 | 60,000.00 | 60,000.00 | 60,000.00 (31/30, capped) |
| October 2026 | 31 | 2 LOP | 56,000.00 | 56,129.03 | 58,000.00 |
| November 2026 | 30 | 2 LOP | 56,000.00 | 56,000.00 | 56,000.00 |
| February 2027 | 28 | 0 | 60,000.00 | 60,000.00 | 56,000.00 |
| February 2027 | 28 | 2 LOP | 56,000.00 | 55,714.29 | 52,000.00 |
| October 2026, joining on the 16th | 31 | 15 outside employment | 30,000.00 | 30,967.74 | 32,000.00 |

Three readings. Under C1 a day is always worth ₹2,000, so a February without LOP pays
the month in full and one LOP day in October costs a thirtieth. Under C2 the calendar is
the rate: a day is worth ₹1,935.483… in October and ₹2,142.857… in February. Under C3 on a
30 divisor a monthly-rated employee with full attendance is paid ₹56,000 for February —
which is why C3 suits daily-rated pay groups, and why no convention ships as a default.
The joiner row shows the same split on X: sixteen days employed of thirty-one pay 15/30,
16/31 or 16/30.

**Part 2 — the statutory consequences.** An ESI-covered employee: Basic ₹12,000, HRA
₹5,000, special allowance ₹3,000 — gross ₹20,000. The excluded HRA is 25% of
remuneration, so there is no add-back and PF wages are Basic plus special, ₹15,000
(§06.10). October 2026, 31 days, three LOP days; the employer contributes on the
ceiling; Karnataka, where PT is nil below ₹25,000 (§06.4). Figures to the paisa, before
`epf.rounding_method` and `esi.rounding_rule`:

| Head | C1 (27/30) | C2 (28/31) | C3, divisor 30 (28/30) |
| --- | --- | --- | --- |
| Gross earned | 18,000.00 | 18,064.52 | 18,666.67 |
| PF wages — ECR field 4 | 13,500.00 | 13,548.39 | 14,000.00 |
| EDLI wages — field 6 | 13,500.00 | 13,548.39 | 14,000.00 |
| Employee PF, 12% — field 7 | 1,620.00 | 1,625.81 | 1,680.00 |
| Employer EPS, 8.33% — field 8 | 1,124.55 | 1,128.58 | 1,166.20 |
| Employer EPF — field 9 | 495.45 | 497.23 | 513.80 |
| NCP days — field 10 | 3 | 3 | 3 |
| ESI employee, 0.75% | 135.00 | 135.48 | 140.00 |
| ESI employer, 3.25% | 585.00 | 587.10 | 606.67 |
| PT | 0 | 0 | 0 |

Same three LOP days and the same NCP count; three different ECR lines and three
different ESI contributions, each a valid return (AC-109.2). The ESI coverage test reads
the contracted ₹20,000, at or below ₹21,000, so the employee is covered under every
convention (FR-PAY-104), and the average daily wage is far above ₹176 on any divisor, so
neither ESI share is waived (AC-203.3). C2's employer EPF shows why RP5 derives field 9
rather than rounding it: ₹1,625.81 − ₹1,128.58 must equal field 9 once both are rounded
under `epf.rounding_method` (AC-209.6).

#### Example J — A joiner after the cut-off (FR-PAY-407)

Example I's ₹20,000 employee joins on **20 September 2026**, after September's inputs
closed. September has 30 days, so C1 and C2 agree: X = 19 and the paid fraction is
11/30.

| Head — September 2026, paid in the October run | Amount (₹) |
| --- | --- |
| Gross, 11/30 of ₹20,000 | 7,333.33 |
| PF wages, 11/30 of ₹15,000 | 5,500.00 |
| Employee PF, 12% | 660.00 |
| Employer EPS, 8.33% | 458.15 |
| Employer EPF | 201.85 |
| ESI employee, 0.75% | 55.00 |
| ESI employer, 3.25% | 238.33 |
| PT — Karnataka, below ₹25,000 | 0 |

- **Pay.** The October payslip carries "Salary, 20–30 September 2026", computed under
  September's convention and rule versions; October's own figures are computed
  separately, and September's locked result is not touched (AC-407.1).
- **PF.** The line is belated salary (FR-PAY-406). The design route is a Supplementary
  return for September — the member is absent from every September return (EV-037) —
  used once §06.2 row 8 is confirmed; until then the line is held with its wage month.
  The UAN is the employee's to obtain (AC-1004.2), so the line is also exclude-and-flag,
  with its M+4 deadline counted from September: January 2027's Regular return, due 15
  February 2027, cannot be filed while the member is unreturned for September (§06.2
  chronology table; AC-712.6).
- **ESI.** The contracted ₹20,000 is at or below ₹21,000, so the joiner is covered from
  joining (FR-PAY-203); how ESIC takes a late-paid month's contribution is not
  established (AC-305.2) and is routed to §20 with the PF question.
- **TDS.** The catch-up is paid on 31 October 2026, so by date of payment it belongs to
  Tax Year 2026-27 Q3, whatever its wage month (§06.5).

#### Example K — One wage month, three kinds of correction (FR-PAY-714)

An establishment's **October 2026** Regular return was approved on 12 November 2026; no
challan has been generated; the contributions fall due on 15 November. Three changes
arrive.

| Member | What happened | What it is | Route (§06.2 decision table) |
| --- | --- | --- | --- |
| D | Recorded on the actual-wage election in error; the agreed election was the ceiling. Gross and PF wages ₹25,000 | A downward change for a member already returned | Revised (row 4) — only before payment initiation |
| A | Excluded from the Regular for an unseeded UAN (AC-701.2); seeded on 20 November | A member absent from every October return | Supplementary (row 3) |
| C | A revision effective 1 August 2026 lifts PF wages from ₹12,000 to ₹14,000; entered in November and paid in the November run on 30 November | True arrears (FR-PAY-406) | Arrear flow, fenced (row 7) |

D's return line, as approved and as it should be:

| ECR field | Approved | Correct | Difference |
| --- | --- | --- | --- |
| 4 — EPF wages | 25,000 | 15,000 | −10,000 |
| 5 — EPS wages | 15,000 | 15,000 | 0 |
| 6 — EDLI wages | 15,000 | 15,000 | 0 |
| 7 — Employee PF | 3,000 | 1,800 | −1,200 |
| 8 — Employer EPS | 1,250 | 1,250 | 0 |
| 9 — Employer PF | 1,750 | 550 | −1,200 |

The month's contributions fall by ₹2,400. D's October pay over-deducted ₹1,200 of
employee PF, so the correction run pays D ₹1,200 as a labelled refund line in the
November run, and D's TDS projection re-runs (FR-PAY-205). A's line is EPFO's own
fixture — PF wages ₹15,000 and ₹1,800, ₹1,250 and ₹550 (EV-035) — ₹3,600 of
contributions, built from October's locked snapshot because no wage figure changed
(§14 AC-DM-12). C's arrears are recomputed month by month against August, September and
October's rule versions (I3): ₹2,000 of extra PF wages a month gives employee PF ₹240.00,
EPS ₹166.60 and employer EPF ₹73.40 a month — ₹720.00, ₹499.80 and ₹220.20 over the three
months, ₹1,440.00 in all.

**The plan.**

1. **12–14 November — a Revised October return for D.** It must be approved before any
   October challan exists (EV-037), under `ecr.revised_scope`, whose proposed scope is
   every member of the month (FR-PAY-714).
2. **By 15 November — the gate and the challan.** With the Revised return ACCEPTED,
   VG-E2 passes; the Due Deposit Balance Summary carries the revised dues and any s.7Q
   interest (VG-E3); the approver instructs the challan and the employer pays. The month
   enters PAYMENT_INITIATED (AC-309.3). The payment does not wait for A.
3. **From 20 November — a Supplementary October return for A.** A Supplementary carries
   no payment guard, so it follows the payment; its own challan carries A's ₹3,600 and
   the interest the portal assesses from 15 November (§06.2's forecast; FR-PAY-715).
   A's M+4 deadline is February 2027's Regular return, due 15 March 2027.
4. **C's ₹1,440.00** sits on the ledger as BLOCKED-pending-layout (EV-043; §05 F-03) with
   November 2026 — the disbursal month — as its due month (AC-401.2), never inside an
   October return.

**Had D been found on 16 November**, after the challan, the downward change would have
no ECR route (§06.2 row 5): the diff is recorded, the case goes to the §22 runbook, D's
₹1,200 refund is still paid through payroll, and the product states nothing about
recovering the employer's ₹1,200 share. That is the case the head-by-head gate exists to
prevent (FR-PAY-309).

#### Example L — A mid-year revision through the TDS projection (FR-PAY-213)

Example F's employee, new regime, is paid ₹1,50,000 a month from April to September
2026, and a revision to ₹1,70,000 takes effect on 1 October — prospectively, so no
arrears arise. FY2025-26 slabs are the worked base (Tax Year 2026-27 pending AC-205.6);
the standard deduction is the carried ₹75,000 (**[Hypothesis]**). Before the revision the
monthly deduction was ₹12,566.67 at the file's two decimals (AC-209.5).

| Step (FR-PAY-213) | October 2026 run | Amount (₹) |
| --- | --- | --- |
| 1 | Salary paid April–September, by date of payment | 9,00,000 |
| 2 | Plus ₹1,70,000 × 6 runs remaining, October included | 10,20,000 |
| 3 | Plus variable and one-time items | 0 |
| 4 | Less the new-regime standard deduction | −75,000 |
| | Projected taxable income | 18,45,000 |
| 5 | Tax: 5% of ₹4–8 lakh ₹20,000 + 10% of ₹8–12 lakh ₹40,000 + 15% of ₹12–16 lakh ₹60,000 + 20% of ₹2,45,000 above ₹16 lakh ₹49,000 | 1,69,000 |
| 5 | Plus 4% cess | 6,760 |
| | Projected liability for the year | 1,75,760 |
| 6 | Less deducted April–September, 6 × ₹12,566.67 | −75,400.02 |
| 7 | Remaining, spread over 6 runs | 1,00,359.98 |

Each of the six runs from October deducts one-sixth — ₹16,726.663… — at the precision
RP6 applies, and March's run takes the exact remainder, so the year's deductions total
₹1,75,760. The revision raises the monthly deduction by about ₹4,160 from October; it
does not put the whole year's extra tax on October's payslip (AC-205.2). Projecting
₹1,70,000 over all twelve months instead would give taxable income of ₹19,65,000 and a
liability of ₹1,93,000 + ₹7,720 = ₹2,00,720 — ₹24,960 too much, recovered from the
employee's pay for no reason until a later run corrected it (AC-213.2).

#### Example M — A mid-year cutover, 1 August 2026 (FR-PAY-314, FR-PAY-315)

A tenant moves onto this product for wage month **August 2026** — mid-tax-year and
mid-quarter, the hard case §05.6 names. The prior system paid the April–July salaries on
the last day of each month, deposited the tax on each deposit's due date, and filed the
Q1 statement. One EPF establishment; part of the roster ESI-covered. Nothing below is a
new rate: the arithmetic is Example F's and Example L's, read through an opening set.

**1 — The first live run's projection.** Example F's employee: ₹1,50,000 a month, new
regime, FY2025-26 slabs as the worked base (Tax Year 2026-27 pending AC-205.6), the
carried ₹75,000 standard deduction (**[Hypothesis]**).

| Step (FR-PAY-213) | August 2026 run | Amount (₹) |
| --- | --- | --- |
| 1 | Salary paid April–July, from the **attested opening set**, by date of payment | 6,00,000 |
| 2 | Plus ₹1,50,000 × 8 runs remaining, August included | 12,00,000 |
| 3 | Variable and one-time items | 0 |
| 4 | Less the new-regime standard deduction | −75,000 |
| | Projected taxable income | 17,25,000 |
| 5 | Tax, built exactly as Example F builds it | 1,45,000 |
| 5 | Plus 4% cess | 5,800 |
| | Projected liability for the tax year | 1,50,800 |
| 6 | Less opening TDS, 4 × ₹12,566.67 | −50,266.68 |
| 7 | Remaining, spread over the 8 runs from August | 1,00,533.32 |

Seven runs deduct ₹12,566.67 and March's deducts ₹12,566.63 (RP6). The test is not that
our eight runs are internally consistent — they are, whatever the opening figure — but
that the **deductor's** year under one TAN totals ₹1,50,800.00 across two systems.

Suppose the import dropped July and the opening set says ₹37,700.01. Step 6 then leaves
₹1,13,099.99, each run from August deducts ₹14,137.50 — ₹1,570.83 a month more than it
should — and the deductor's deposits for the year reach ₹1,63,366.67 against a ₹1,50,800
liability, ₹12,566.67 over-deducted from one employee. Our books balance at every step.
The only control is the ₹0 tie-out on the head before go-live (§16.7, §20 V-15), which is
why AC-314.1 refuses the run rather than flagging it.

**2 — The quarter the cutover lands in.** 1 August 2026 falls inside Q2 of Tax Year
2026-27. July's salary was paid on 31 July, so **its deductee rows belong to our Q2
statement**: Form 138 Annexure I is the deductee-wise break-up of this deductor's tax for
the quarter (EV-047; r5/02 finding 22), and the deductor did not change. Our Q2 statement,
due 31 October 2026 (EV-049), therefore carries three months of rows, one month of them
produced before the cutover, and a CD record for a deposit whose challan identification we
never captured — which the `.csi` import must still match (AC-706.2). Until the July
payment lines and that challan identification are attested, the instance stays BLOCKED
with the reason on the calendar (AC-315.4); it is never generated with our two months
alone. Q1 was wholly the prior filer's: the ledger records it as filed elsewhere with the
Return Receipt Number the acknowledgement carries (EV-051), and it counts on neither side
of the on-time metric (AC-315.5). A cutover one month later, on 1 October, would have cost
none of this.

**3 — The EPF ledger's pre-history.** Our first Regular return is for wage month August,
due 15 September 2026 (§06.2). The M−4 test reaches **April 2026** (EV-038), so April, May,
June and July carry FILED_ELSEWHERE entries seeded from the establishment's own filing
history, captured on the portal in the cutover's attended session (r5/02 finding 17; §22).
Without them the ledger would start in August and the engine would believe the chronology
clean until the portal refused the December return. And if July's return excluded a member
for an unseeded UAN, that member's M+4 deadline is **November 2026's Regular return, due
15 December 2026**, counted from July and not from the cutover (AC-315.3) — a deadline the
tenant inherits on day one, from a decision another system made.

**4 — The ESI crosser.** One employee's gross was revised from ₹20,000 to ₹23,000 with
effect from 1 July 2026. July sits inside the April–September contribution period, so the
employee is held to the 30 September boundary (FR-PAY-203; TV3): August and September
contribute on the full ₹23,000 — employee ₹172.50 and employer ₹747.50 a month before
`esi.rounding_rule` — and coverage ends on 1 October. An engine that re-derived coverage
from the current ₹23,000 against the ₹21,000 ceiling would file both months with no ESI
line for this employee, ₹345.00 of employee and ₹1,495.00 of employer contribution short,
on returns ESIC has no reason to refuse. The error would surface at the half-yearly
reconciliation (FR-PAY-702), two contributions and one benefit period late.

**5 — Where the cutover is finally paid for.** The year-end record (FR-PAY-719) carries
April–July from the opening set and August–March from our locked runs, because Q4's
Annexure II summarises the salary, deductions, rebate and net tax liability of the **tax
year** for the deductor (r5/02 finding 22), and TRACES builds the single Form 130 from
Annexure I and Annexure II (EV-047, EV-048). A record that began at the cutover would
under-report the year in exactly that annexure — and the annexure's format is itself
unpublished and fenced (EV-046), so the defect would not even be visible until the format
is released and the year is closed. That is the argument for the tie-out being a go-live
gate rather than a clean-up task, and for AC-314.6 putting the opening figures into the
record from the first run.

---

### 08.12-A Lifecycle and generator test scenarios

The §06.14 vectors test statutory arithmetic; §08.12's examples test the engine's
computations. These scenarios test the machinery around them — the machines, the gate,
the composer, the generators and the parameter classes — and each is a release test for
the requirements it names (G11).

| # | Given | When | Then | Covers |
| --- | --- | --- | --- | --- |
| TS-01 | A month PROCESSED with a variance flag | The operator reopens inputs, fixes an LOP count and reprocesses | M3 runs from PROCESSED; the superseded snapshot and both result versions are kept; the variance view names the LOP driver | M3, M5; AC-303.1 |
| TS-02 | A month PROCESSED by user U | U approves it | Refused, unless U holds a combined role logged as a policy exception | AC-304.1 |
| TS-03 | A blocking validation open | Approve | PM-05 names the item; M6 does not run | AC-301.1; AC-1004.1 |
| TS-04 | A LOCKED month | Edit a figure | PM-01; a correction run is offered; the month stays byte-identical | AC-301.4; AC-307.1 |
| TS-05 | Month M short of LOCKED | Close month M+1's inputs | Refused on hard guard HG-1, and no waiver control is offered | FR-PAY-310 |
| TS-06 | Salaries released on 31 October 2026 | The TDS deposit is initiated on 6 November, the ECR not yet approved | TDS passes its head's checks and is paid; the month stays DISBURSED | AC-309.1 |
| TS-07 | The portal's return statement differs from the snapshot, unexplained | Reconcile | The employer rejects on the portal; F7 records REJECTED with SA-REC; the attempt is regenerated and counted | F7; VG-E1 |
| TS-08 | A Regular approved; a downward error found before any challan | Evaluate the EPF gate | VG-E2 fails until the planned Revised return is ACCEPTED | AC-714.4; AC-301.3 |
| TS-09 | The month's EPF challan generated | Raise a Revised return | Refused with the EV-037 reason; the remaining routes offered | AC-711.3; AC-714.2 |
| TS-10 | Example K's three changes | Compose | Revised for D, gate and challan, Supplementary for A; C BLOCKED-pending-layout, due month November 2026 | AC-714.1 |
| TS-11 | A member excluded from April 2026's Regular for an unseeded UAN | Evaluate the ledger | The M+4 deadline, 15 September 2026, shown from the day of exclusion; August's Regular refused until an April Supplementary carries the member | AC-701.2; AC-712.6 |
| TS-12 | No member active in a wage month | Generate | No file; Direct Challan Entry; F17 then F15 with the receipt | AC-712.4; AC-711.4 |
| TS-13 | Month M has no Regular return | Generate month M+1's Regular | Refused, SA-SEQ | AC-712.1 |
| TS-14 | A date of exit recorded in error | A contribution for a later month | BLOCKED-joint-declaration; no contribution attempted | AC-712.3 |
| TS-15 | Disbursal planned for 30 June, made on 1 July | Record M9 | Date-keyed outputs re-derived as a diff; the June salary moves to Q2; the approver acknowledges before any head is paid | AC-210.3; VG-C1 |
| TS-16 | A September credit returned and re-issued on 1 October | Generate the Q2 statement | A configuration task until `tds.returned_credit_payment_date` is set; both dates and both quarters shown | AC-905.2; FR-PAY-716 |
| TS-17 | ₹60,000 a month, two LOP days | Process October, November and February under C1, C2 and C3 | Example I, Part 1, exactly; the convention printed on each payslip | AC-109.1; AC-601.4 |
| TS-18 | Example I's ₹20,000 employee, three LOP days | Process under each convention | Example I, Part 2, lines; NCP days 3 in all three | AC-109.2 |
| TS-19 | A pay group moves from C1 to C2 from December | Reverse a September LOP day | September recomputed under C1 | AC-104.2; AC-109.5 |
| TS-20 | A regularisation approved after PROCESSED | — | The reprocess-or-defer decision is raised; approval refused while it is open | FR-PAY-111 |
| TS-21 | Two October LOP days reversed in November; the ceiling binds | Correction run | ₹3,870.97 under C2; an NCP-only difference routed to §22 | AC-405.1; AC-405.2 |
| TS-22 | A joiner on 20 September after the cut-off | The October run | Example J's figures; September untouched; the line held with its M+4 deadline | AC-407.1 |
| TS-23 | A ₹50,000 net-of-tax payment | Process | Example H1 converges at iteration 10; the net is exactly ₹50,000 after rounding | AC-212.1 |
| TS-24 | A gross-up target whose iterates enter the s.87A marginal-relief band | Process | The node stops at its limit; the blocking item names the band; no figure is published | AC-211.6; AC-211.3 |
| TS-25 | Example F's liability of ₹1,50,800 | Run all twelve months | The last run deducts the remainder; the year totals ₹1,50,800 | AC-209.5 |
| TS-26 | A June 2026 salary paid on 1 July 2026 | Assemble Q2 | A Q2 line with wage month June recorded | AC-716.1 |
| TS-27 | A quarter with a zero-tax employee and `tds.f138.nil_deduction_rows` unset | Generate | A K5 task; no file generated | FR-PAY-716; FR-PAY-1006 |
| TS-28 | A Tax Year 2026-27 correction generated before the portal enables it | View the calendar | Held, with fence F-02 and its exposure clock, in the blocked view | AC-708.3; AC-710.4 |
| TS-29 | A correction to an FY 2024-25 quarter a prior system filed | Request it | A diff recorded; the legacy stack named; handed off; no file generated | AC-706.4 |
| TS-30 | The portal's s.7Q interest differs from the forecast | Capture the summary | A reconciling item with both figures; the portal's figure is paid | FR-PAY-715 L2; TV36 |
| TS-31 | Damages deferred in October | Evaluate November's gate | Shown with age and choice; the gate does not fail | AC-715.2 |
| TS-32 | A notice-shortfall recovery that breaches the cap at exit | Settle | Split; the excess recorded as recoverable outside payroll | AC-804.2 |
| TS-33 | `esi.rounding_rule` unset | Process, then evaluate the ESI and TDS heads | ESI provisional, confirmed by the approver at VG-C3 or held; the TDS head unaffected | FR-PAY-1006 K2; AC-309.2 |
| TS-34 | A catalogue row gains a new version | Publish it | Change notices sent; overridden components listed for review; no LOCKED month restated | AC-108.5 |
| TS-35 | A half-day LOP in the month | Generate the ECR | A K2 task on `ecr.ncp_fractional_rule`; pay uses the fraction; the NCP count is never rounded silently | AC-109.7 |
| TS-36 | An employee with no paid day | Process | A payslip, a register line and the zero-wage ECR line; the month's recovery carried forward | AC-109.8 |
| TS-37 | Two result versions; one employee's LOP changed | Compare them | Every other employee byte-identical; the changed one names the LOP input | AC-303.3 |
| TS-38 | A proof-lock true-up larger than a low month's remaining pay | Process the month | What the pay allows is deducted; the rest carried; any unrecovered amount shown in the last run; no negative net | AC-213.4 |
| TS-39 | Example I's employee's October salary held, released on 30 November | Lock October, then release | ₹18,050 left out of October's bank file and held; a wage-timing exposure from 7 November; TDS placed by the release date | FR-PAY-311; AC-901.4 |
| TS-40 | An input event no router row matches | Submit it | Refused with the reason; no default path | AC-312.1 |
| TS-41 | An upload whose hash differs from the generated artefact | Record the session | Not recorded as the submission; SA-FMT; the approver warned | AC-717.2 |
| TS-42 | An EPFO error file before its schema version exists | Capture it | Stored raw; rows mapped by the operator; each mapping recorded | FR-PAY-718 |
| TS-43 | The Q4 format is released | Build the writer | Built against the year-end record; a missing field raised with the format version | AC-719.2 |
| TS-44 | A meal voucher attested mid-year | The next run | Exempt from that run on; earlier runs stay taxable and are not reopened | AC-501.3 |
| TS-45 | A Karnataka employee on ₹26,000 with two October LOP days | Process | PT computed on both readings; the earned reading applied provisionally; confirmed at VG-P1 | AC-204.5 |
| TS-46 | A cycle change from 26th-to-25th to the calendar month from December | Close December's inputs | The window runs 26 November to 31 December; no day dropped or counted twice | AC-110.4 |
| TS-47 | A month locked on a provisional ESI figure; the rule is then set | Replay, then correct | Replay reproduces the provisional figure; the correction run carries the new one | AC-1002.2; AC-1006.4 |
| TS-48 | A snapshot candidate missing the day-status class for one employee | Close inputs | HG-2 fails, M2 is refused and the employee is named; no waiver control is offered | AC-313.2; FR-PAY-310 |
| TS-49 | A snapshot whose completeness list covers 61 of 62 employee-periods for a class | Close inputs | The short class and the missing period are named at M2, not discovered in the variance view | AC-313.7 |
| TS-50 | An evaluation that meets a consumed class absent from its snapshot | Process | A missing-input error naming the class and the consuming FR; the month holds at PROCESSED; no figure is published as though the class were empty | AC-313.3 |
| TS-51 | An employee whose opening-balance set is DISPUTED | The first live run | A blocking validation naming the head and its rupee difference; the employee is not silently dropped from the bank file | AC-314.1; O3 |
| TS-52 | Example M's opening TDS understated by one month, ₹37,700.01 | Run August to March | Each run deducts ₹14,137.50; the deductor's year reaches ₹1,63,366.67 against ₹1,50,800; only the ₹0 tie-out catches it before go-live | AC-314.3 |
| TS-53 | An ESI crosser imported at the 1 August 2026 cutover | Process August and September | Contributions on the full ₹23,000 both months; coverage ends 1 October; re-derivation from the current wage is a defect | AC-314.4 |
| TS-54 | A cutover whose April 2026 ECR month has no ledger status | Generate August's Regular return | BLOCKED as a chronology gap with the capture task named; never recorded FILED on an assumption | AC-315.1; AC-315.2 |
| TS-55 | A mid-quarter cutover with the pre-cutover month's challan identification absent | Generate the Q2 statement | BLOCKED with the reason and the due date in the calendar's blocked view; no our-months-only statement is emitted | AC-315.4 |
| TS-56 | The §08.8-A roster of ten for October 2026 | Select and generate | Four lines; PF wages ₹34,500.00 and employee PF ₹4,140.00; employer EPS and EPF sum to ₹4,140.00; three ledger items and three no-line resolutions stored | AC-720.6; RP5 |
| TS-57 | A person on the locked snapshot matching no selection row | Generate | Generation stops with SA-SEQ naming the person; no file is written | AC-720.1 |
| TS-58 | An assembled return file of 2.4 MB | Package | Compressed, exactly one text file in the zip, the name stripped to letters and digits, both hashes recorded | AC-721.3 |
| TS-59 | A control card whose Return Type differs from the instance's planned type | Upload in the attended session | A blocking item before upload, because the portal's control and not the file decides the return type | AC-721.4 |

---

### 08.13 Cross-cutting acceptance criteria — the engine's definition of done

These are the run-level and product-level gates. A build that passes every per-FR AC but
fails these is not shippable.

| # | Gate | Ties to |
| --- | --- | --- |
| G1 | **Determinism** — re-running any unchanged period with its stored evaluation context reproduces byte-identical figures and files; fixed-point nodes converge to the same iterate | I4, I6, I7, FR-PAY-209–211, 1002 |
| G2 | **Reconciliation** — for every run: Σ employee net = bank-file total; Σ each statutory head = its challan; Σ payslips = registers = returns, all to the rupee | FR-PAY-303, 701–709, 901, 902 |
| G3 | **Retro correctness** — arrears/retro recompute uses the period's rule version, not today's; arrears PF liability dates from the disbursal date | I3, FR-PAY-401, 402; TV12; Part E-9 |
| G4 | **No model-generated figures** — no statutory or monetary value on any payslip, challan or return originates from the assistant | §12.1 [Verified], I-wide |
| G5 | **Filing is the metric** — the product reports "filings completed and accepted on time," computed off the filing state machine including REJECTED, REVISED and SUPPLEMENTARY; a rejected filing is not "done" | §01, §19, FR-PAY-710, 711 |
| G6 | **Schema-driven file formats** — Form 138 (incl. the Q4 slot), the ECR return and part-payment files, ESI, the bonus return, bank templates are versioned schemas routed by period; no field number or column is hard-coded | §06.12 R6, FR-PAY-701–706, 708, 901 |
| G7 | **Blocked states are honest** — Q4 Form 138 and Tax Year 2026-27 Form 130 preparation (BLOCKED-pending-layout), the ECR arrear return (fenced, EV-043) and post-cliff ESI (BLOCKED-pending-regime) render as blocked, never silently emitted with guessed values or a legacy proxy | FR-PAY-401, 702, 706, 707, 710, 711 |
| G8 | **Segregation of duties** — no single unauthorised actor can compute, approve, and pay the same run | FR-PAY-304, 904 |
| G9 | **Migration parity** — the engine reproduces migration-grade registers (3A/6A-equiv, ESI 5/6, PT/LWF, the legacy bonus registers and Form D) and ingests mid-year YTD without breaking certificate continuity | §05.6, §06.12 R10, FR-PAY-709, 802 |
| G10 | **Provenance** — every rule version carries a gazette/notification source (URL + date); "check for a corrigendum" is enforced in the watcher path | §02.4, §02.5, FR-PAY-1005 |
| G11 | **Golden vectors pass** — the engine passes every §06.14 test vector and the §08.12 examples before any rate-change release; a [Hypothesis] vector passes against its current parameter value and is re-baselined when the rule is confirmed | §06.14, FR-PAY-108, 201–211, 701, 713 |
| G12 | **The irreversibility line is guarded** — no month reaches PAYMENT_INITIATED past a failing verification gate, each head is paid only past its own checks, and no establishment's ECR ledger carries a silent gap | FR-PAY-301 M10, 309, 711, 712, 714; EV-037, EV-038 |
| G13 | **Attended, never autonomous, submission** — every portal submission is logged as an attended session by the employer, or by our operator under written authority once the operator path's counsel fence clears (Part D-17); the engine never submits, and the payment leg is always the employer's | K-13, FR-PAY-711 F6, §22 FR-OPS-001 |
| G14 | **One proration, printed** — every paid amount comes from the pay group's convention, applied once as an exact ratio and printed on the payslip; no wage base is prorated twice; the uploaded file is the generated file | FR-PAY-109, RP1, 601, 717 |
| G15 | **Unset is visible** — no figure rests on an unset parameter without its configuration task and its class's behaviour, and no parameter ships a guessed value | FR-PAY-1006; Part A rule 2 |
| G16 | **Cutover honesty** — no figure reads a pre-cutover period except through an attested opening set; the engine never recomputes a period another system ran; pre-cutover filings are recorded as filed elsewhere with portal evidence and counted on neither side of the on-time metric | FR-PAY-313, 314, 315, 719; §16.7; EV-038 |
| G17 | **Every person is resolved** — for every return attempt, every person on the locked snapshot resolves to one selection row with a stored reason, and every person without a line carries a named route: an exclusion item, a held line, an arrears item, or nothing at all with its basis on the record | FR-PAY-720; AC-712.6; EV-037, EV-040 |

**Items this section routes to other owners.**

| # | Item | Routed to | Why it cannot be settled here |
| --- | --- | --- | --- |
| RQ-01 | Accept FR-PAY-109, 110, 111, 213, 307, 309–312, 404–407, 714–719, 905 and 1006 as acceptance references under C-07, C-09, C-10, C-13, C-14, C-22, C-23, C-32 and C-34, or have them relabelled (lint L1, L4) | §05 owner | The closed R1 list is §05's; until it cites them, their P0 is a proposal — the pattern of §22.12 O20 |
| RQ-02 | Mark §03's checklist items "previous month locked" and "LOP and leave without pay closed" as not waivable, matching hard guards HG-1 and HG-2 (FR-PAY-310) | §03 owner | The default checklist and its waiver rule (AC-M01.3) are §03's |
| RQ-03 | The TDS deposit passes its own head's checks and is not held behind the ECR (FR-PAY-309) — the open question in §03's "Each persona's month" | §03 owner | Answered here; the approver's sittings can rely on it |
| RQ-04 | Add the evaluation-context record, the fixed-point declaration and trace, the validation item, the configuration task, the liability-ledger item, a correction run's baseline reference and the payment-only filing path (F17; AC-711.4) to the entity catalogue, with their bitemporal class | §14 owner | The schema is §14's |
| RQ-05 | One parameter, two names: §06.9's `wages.deduction_overflow_manner` and this section's `wages.deduction_overflow_method` | §06 owner; §20.13 | The canonical name is chosen once, as §05.17 PR-11 did for the gratuity ceiling |
| RQ-06 | Register the new parameters — `pay.c3.*`, `pay.split_month_method`, `pay.lop_reversal_lookback_months`, `pay.net_rounding_carry` and `pay.hold_statutory_treatment` as tenant policy; `ecr.revised_scope`, `ecr.ncp_attribution_offset`, `ecr.ncp_fractional_rule` and `epf.transfer_month_rule` under V-23; `bonus.cap_prorate_part_month` under V-21; `tds.f138.dd_granularity`, `tds.f138.nil_deduction_rows`, `tds.returned_credit_payment_date` and `tds.interest.part_month_rule` under V-20; `pt.MH.exit_topup_rule` under V-09 — and the design-partner validation of the day-rate convention list | §20 owner | The sizing register and the validation plan are §20's |
| RQ-07 | The employer's rejection of a return statement is a named F7 trigger; held instances appear in the blocked view (AC-710.4); legacy 24Q corrections follow §05 A-28 (AC-706.4) | §22 owner, to close §22.12 O17, O18 and O22 | Settled here |
| RQ-08 | Rejection counts include employer rejections at reconciliation (F7), and payment-only instances reach FILED through F17 and F15 | §19 owner | The metric definitions are §19's |
| RQ-09 | Relabels made here: FR-PAY-903 to P0 (PR-01); FR-PAY-705 to P2 behind F-09 (PR-02); FR-PAY-704 to P1, R2 per state (PR-03); FR-PAY-105 split (PR-05); FR-PAY-106's R1 posture as AC-106.5 (PR-15) | §05 owner, to close RT-01 and RT-15 | Settled here |
| RQ-10 | Add to the entity catalogue, with their bitemporal class: the opening-balance fact set and its O-states (FR-PAY-314); the FILED_ELSEWHERE ledger status (AC-712.8); the per-return selection resolution (AC-720.1); and the snapshot's completeness list (AC-313.7) | §14 owner | The schema is §14's |
| RQ-11 | Carry three further heads in the cutover importer: the ESI contribution-period state per employee, the pre-cutover quarter's payment lines with each deposit's challan identification, and the portal filing-history capture that seeds the ledger's pre-history | §16 owner | The importer and its tie-out table are §16's; without these heads FR-PAY-314 and FR-PAY-315 have nothing to read |
| RQ-12 | Exclude FILED_ELSEWHERE instances from both sides of the on-time metric, and count a cutover-blocked instance under its own reason rather than as a miss | §19 owner | The metric definitions are §19's (AC-315.5) |
| RQ-13 | Register the portal filing-history capture and the per-member coverage question of AC-315.2 under V-23, and record `ecr.line_order` as a product setting shipping with our own default, so it raises no configuration task | §20 owner | The validation plan and the parameter register are §20's |
| RQ-14 | Add a cutover step to the EPFO runbook: capture the establishment's filing history and record each pre-cutover month as FILED_ELSEWHERE with its evidence, before the first Regular return is generated (FR-PAY-315) | §22 owner | The runbooks and the session record are §22's |

**Bottom line for the engine.** The payroll & statutory-filing engine is the P0 core of
the product (§05.5 item 1) and the direct expression of the thesis (§01): it exists to
**produce portal-accepted statutory artefacts, submitted in attended sessions under the
employer's written authority**, and the payslip, the bank file and the FBP wallet are
the byproducts and the acquisition surface around that core. Its correctness is not a
UX concern but a legal one, which is why every FR here reduces to a deterministic,
effective-dated, retrospectively-recomputable, fully-audited rule. The competitive
position (§21) is stated carefully. **[Reversed]** Earlier drafts concluded "parity
with Zoho on computation, and differentiation only … on filing execution and the
maintained-update SLA, not on statutory breadth", on the belief that Frappe HR shipped
PT and LWF free. That is false from source code: Frappe HR v16's India payroll is three
files overriding three functions, with no Indian state anywhere in the tree and no
ECR, ESI, PT slabs, LWF, TDS statement or certificate artefacts (EV-031 — source
repository read, not executed); TallyPrime generates the central artefacts but has no
state PT slab table and no LWF engine (EV-032 — product documentation read, not
executed; both r3/r5 captures, 2026). So against Frappe and Tally, **multi-state PT and LWF are a genuine
differentiator — greenfield in both** (K-01). Gross-to-net is not: Frappe's salary
structure is genuinely strong and the bake-off will not be won there (EV-031). No vendor
in the six-vendor set claims to submit any filing (EV-030, published material as of
September 2026), so attended submission is unclaimed ground. We have no evidence of a statutory-breadth gap at Zoho and plan on
parity there.
