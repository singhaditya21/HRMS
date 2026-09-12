## 06. The Statutory Compliance Spine

This section is the consolidated statutory register the rest of the product is
built around. §01 states the thesis — **the statutory filing, not
the payslip, is the unit of delivery** — and that the customer's problem changes
at headcount thresholds, so the feature gates should mirror the obligation gates
exactly. This section makes that concrete: every statute the payroll engine must
compute, who it binds, at what threshold, on what cadence, with what penalty for
failure, the data it consumes, and the product requirement it generates.

A note on how to read this. The engine is **rules-first, LLM-last** (§12.1):
no statutory or monetary figure is ever model-generated. Everything in this section
is therefore a specification for a deterministic rule, versioned and effective-dated,
not a prompt. Where a claim carries a confidence marker, it is because the underlying
notification was either verified against gazette/primary source, is inferred and
needs validation, or was believed and disproven. The standing rule from §02 holds
without exception: **no compliance claim ships without a gazette, notified-rule or
regulator citation captured with URL and date, and "check for a corrigendum" is a
non-negotiable step** — the November 2026 EPF analysis inverted twice across two
research rounds precisely because a corrigendum was missed.

**Citation vocabulary — two regime changes run through this section.** Many values
below were first verified against instruments that have since been repealed or
superseded: the EPF Act 1952, ESI Act 1948 and Payment of Gratuity Act 1972 (repealed
by Code on Social Security s.164(1) from 21 November 2025 — for the EPF Act, visible
only once corrigendum S.O. 5936(E) is read, §06.9), the Payment of Bonus Act 1965
(subsumed by the Code on Wages),
the ESI (Central) Rules 1950 (v0.3 described them as superseded by the Social Security
(Central) Rules 2026, G.S.R. 344(E); that supersession is carried, not re-captured, and
as rules made under the ESI Act they are in any case saved only to the cliff, §06.9),
and the Income-tax Act 1961 and Rules 1962 (replaced by the Income-tax
Act 2025 and Rules 2026 from 1 April 2026; Act s.536(1)). A **[Verified]** marker on a
legacy citation means the value was verified against that instrument — it is not a
claim that the instrument is still in force. Where research gives the successor
citation we state both; where it does not, the successor citation is an open item in
§06.13, routed to §20. The engine stores both citations on every rule, the same
dual-vocabulary requirement EV-050 imposes on tax forms (§06.5).

**"Carried, not re-captured."** Every number, section, rule, paragraph, form and date
in this section was traced against this PRD's evidence ledger and the five research
rounds (r1–r5). A citation or value that v0.3 carried but no round re-captured is
labelled **carried, not re-captured**. It is never marked [Verified]. Where it is a
number, the engine holds it as a named configurable parameter with no shipped
default. Each one is listed in §06.13 and routed to §20.6 for primary-source
capture before any customer-facing use.

**Delivery model — what "filing" means in this section.** Every statutory surface in
this spine is an attended government portal: EPFO's interactive employer login, the
TDS path where the deductor runs the FVU utility and uploads, ESIC's template upload,
and one manual portal per PT state (EV-030, EV-035–038). The deliverable is **a
portal-accepted artefact plus attended, assisted filing under the employer's written
authority to act**. The employer's and deductor's statutory liability is
non-delegable (K-13). Our side of it is portal acceptance of the artefact and
best-efforts assisted submission under that written authority. Runbooks are in §22.
Two things are counsel questions, not product statements (Part D-17, §23): whether
we may act on government portals under employer credentials, and how liability,
any cap and any indemnity are allocated between us and the customer. No vendor in the six-vendor
priced set claims to submit any filing (EV-030 — vendors' published material as
captured in September 2026, documentation read, not products executed), which is
what makes attended submission a differentiator.

Scope note (phasing). Consistent with the beachhead decision (§05, 20–200 employees),
the v1 statutory artefacts in this spine are **the ECR return file, the ESI
contribution upload, the PT return, Form 138 Q1–Q3 and the Form 130 input set** for
single-state and early multi-state tenants (R1 scope is owned by §05). Two are fenced
on external dependencies: the **Form 138 Q4 generator** (format unpublished, EV-046)
and everything downstream of it, including the Form 130 data TRACES builds from
Q4 Annexure II; and the **ECR arrear return** (no public layout, EV-043). Bonus (§06.7),
compulsory gratuity insurance (§06.6) and the generated register views under the
Codes (§06.9) are correct-by-construction in the data model from v1, but their output
surfaces phase in with the mid-market expansion (§05). Form IX's per-day IN and OUT
capture is not deferred: the time model must hold it from v1 (§09, EV-055). This
section specifies the whole spine; it does not imply the whole spine ships in one
release.

<!-- DIAGRAM: statutory-spine-obligation-thresholds -->

### 06.1 The obligation step function — what turns on, and when

Indian labour and social-security law is a step function on headcount. The
obligation is absent below a threshold and mandatory at or above it, and the test
for "at or above" is not always "today's count" — several thresholds latch on a
look-back window, so the obligation, once triggered, does not switch off when the
count dips. This latching behaviour is a first-class data-model requirement, not
an edge case.

Two further columns are schema fields, not prose (EV-057). **Counting unit**: the
statutes count different populations — "employees", "persons", "workers", "contract
labour" — and the same tenant can be above one line and below another on the same
day. **Sphere**: the thresholds below are verified as central-sphere text (EV-057);
for most 20–200 private employers the State is the appropriate Government, and
state rules can prescribe their own forms and values, so the operative value is
per-state configuration.

| Threshold | Obligation that turns on | Counting unit | Sphere | Look-back / latch | Source · marker |
| --- | --- | --- | --- | --- | --- |
| **None** | TDS on salary: monthly deposit, Form 138 quarterly statement, Form 130 certificate | Payee (any employee paid taxable salary) | Central | From the first taxable payment | Income-tax Act 2025 s.392 (ex-1961 Act s.192); forms per EV-050 **[Verified]** |
| **None** | POSH Internal Committee | Every employer | Central statute | — | POSH Act 2013 s.4(1) (EV-056) **[Verified]** |
| **None** | Minimum wages / floor wage | Employee | Central statute; rates by appropriate Government | Continuous | Code on Wages 2019 ss.6, 8(4), 9 (r1) **[Verified]**; revision "ordinarily" at intervals of up to five years (s.8(4)); a floor-wage notification under s.9 was not located (r1) |
| **Per state Act** | Shops & Establishments registration | Per state Act | State | Per state Act | State S&E Acts continue alongside the Codes; thresholds per state unverified **[Hypothesis]** |
| **10** | ESI | Persons (other than a seasonal factory); a single employee in a notified hazardous occupation | Central (ESIC); contribution payable from the date notified per establishment | Code-era latch wording unconfirmed (§06.13) | CoSS First Schedule, Ch. IV (EV-057) **[Verified]** |
| **20** (Central-sphere extended classes) | ESI for establishments the Central Government extended coverage to: insurance business, NBFCs, port trusts, airport authorities, warehousing. The 10 line applies to non-seasonal factories and state-extended classes (shops, hotels, restaurants, cinemas, road transport, newspapers, private medical and educational institutions) | Persons | Central (ESIC) | As the ESI row | ESIC coverage page, captured Sep 2026 (r1) **[Verified — regulator page]** — ESI is not uniformly 10 |
| **10** | Establishment registration under the OSH Code: electronic, within 60 days of the establishment's existence; change of particulars intimated within 30 days | Unit unconfirmed: the MoLE handbook says employees, the PRS summary says workers | Central text; state rules may prescribe otherwise | — | MoLE Compliance Handbook 5.1; PRS OSH Code summary (r3) **[Verified — handbook level; re-read against the 8 May 2026 Rules, §06.13]** |
| **10 inter-state migrant workers** | Inter-state migrant worker provisions, including self-migrated workers: a wage test of ₹18,000 a month or a higher notified figure, and a once-a-year lump-sum journey allowance for the to-and-fro fare to the worker's native place, paid as a payroll component | Inter-state migrant workers | Central text | "On any day of the preceding 12 months" — **latches** (handbook level) | OSH Code ss.59, 61; MoLE handbook 5.10; ₹18,000 corroborated by PRS (r3) **[Verified — handbook level]** |
| **10** | Gratuity | Employees | Central | "Employed, or were employed, on any day of the preceding twelve months" — **latches** | CoSS First Schedule, Ch. V **[Verified]** |
| **10** | Maternity benefit | Employees | Central | Same wording — **latches** | CoSS First Schedule, Ch. VI **[Verified]** |
| **10** | Prescribed-format appointment letter | Workers — attaches to an "establishment" | **State**: form prescribed by the appropriate Government | — | OSH Code s.6(1)(f) (EV-057) **[Verified — central text]** |
| **Under 10** | No IC: complaints go to the district **Local Committee** — not an exemption from s.4(1) | Workers | Central statute | — | POSH Act s.6(1) (EV-056) **[Verified]** |
| **20** | **EPF** (and EPS/EDLI) — scheduled-employments limitation removed | Employees | Central | Legacy EPF Act latched once covered; Code-era latch wording unconfirmed (§06.13) | CoSS First Schedule, Ch. III (EV-057) **[Verified]** |
| **20** | Statutory bonus | Legacy Act: persons; Code-era unit unconfirmed | Appropriate Government | Legacy Payment of Bonus Act latched (§06.7) | Code on Wages s.26; legacy threshold **[Hypothesis]** for Code-era periods |
| **20** | Grievance Redressal Committee | **Workers** | Central statute | — | IR Code s.4 (EV-057) **[Verified]** |
| **Over 20 with power / 40 without** | "Factory" under the OSH Code | Workers | Central statute | — | OSH Code (EV-057) **[Verified]** |
| **50** | Contract-labour provisions (raised from 20) | Contract labour, "on any day of the preceding 12 months" | Central statute | **Latches** | OSH Code s.45 (EV-057) **[Verified]** |
| **50** | Crèche | Employees (CoSS s.67(1), "or such number as may be prescribed"); OSH Code s.24 separately counts workers | Central | — | EV-057; CoSS s.67(1) **[Verified]** — threshold configurable per statute |
| **50** (industrial establishments only: factories, mines, plantations) | Lay-off, retrenchment and closure — **notice** regime (IR Code Ch. IX): notice to the appropriate Government, one month's notice to the worker, closure notice 60 days ahead. In this band and at 300+: retrenchment compensation of 15 days' average pay per completed year of continuous service, plus a separate 15 days' wages per retrenched worker to the Workers' Re-Skilling Fund; lay-off compensation at 50% of basic plus DA | Workers | Central text | — | MoLE Compliance Handbook 4.5–4.6 (r3) **[Verified — handbook level]** |
| **100** | Canteen | Workers | Central statute | — | EV-057 **[Verified]** |
| **100** | Works Committee — **only where the appropriate Government orders it**, not automatic | Workers | Appropriate Government | — | MoLE Compliance Handbook 4.1(a) (r3) **[Verified — conditional]**; the IR Code section number is carried, not re-captured |
| **300** | Standing orders (60-day deemed certification); prior Government **permission** for lay-off, retrenchment and closure (**raised from 100**) — three months' notice, closure permission sought 90 days ahead — industrial establishments only | Workers | Central statute | — | EV-057; IR Code Ch. X; Handbook 4.2, 4.5–4.6 (r3) **[Verified]** |

PT (§06.4) and LWF (§06.8) are not headcount-triggered at all: they turn on by
state of work location and wage band.

Corrections carried forward from earlier drafts, so they are not re-introduced:

- **Sub-20 companies are not obligation-free.** TDS, the POSH Internal Committee and
  minimum wages bind regardless of headcount; ESI (for most establishment classes),
  gratuity, maternity benefit and the prescribed appointment letter bind from ten. A payroll product for a
  12-person firm has real statutory work to do; of the payroll computations, only EPF
  and statutory bonus are genuinely absent below 20 (the Grievance Redressal Committee
  and the higher lines in the table are absent too, but compute nothing on a payslip).
  **[Killed]** (the "no obligation below 20" framing)
- **The appointment letter does not bind "from employee one".** **[Reversed]** — an
  earlier version of this table placed it at "no threshold"; OSH Code s.6(1)(f)
  attaches to an establishment of ten or more workers and the form is prescribed by
  the appropriate Government, so the template is per-state configuration (K-18,
  EV-057).
- **Employee's Compensation is not a blanket sub-10 liability.** The Second Schedule
  limits it to largely hazardous and mechanical occupations; do not model it as a
  universal small-employer cost. **[Killed]**
- **The 40+ periodic health check-up** is confined by the notified Rules to docks,
  mines and construction, in permissive language — not a general obligation. **[Killed]**

**Who counts toward the threshold — the head-counting rule is itself statutory.**
The count is not "employees on the payroll today." Edge cases the derivation must
encode:

- **Contract labour and the principal employer.** The contribution mechanics are
  verified: for EPF the principal employer pays and recovers from the contractor
  (CoSS s.17); for ESI the employer pays both contributions for every employee
  "whether directly employed by him or by or through a contractor" — unconditionally
  (CoSS s.31(1)) — and the contractor must hand over the employee register before
  settlement (s.31(7)) (r2, read against the bare Code). **[Verified]** Whether
  contractor-supplied workers also count toward the principal employer's *own*
  threshold is a counting-unit question per statute — **[Hypothesis]**, routed to
  §20 via §06.13.
- **Apprentices engaged under the Apprentices Act 1961 are excluded** from EPF, ESI,
  gratuity and bonus counts; NEEM/NAPS trainees are treated similarly. Company-
  designated "trainees" who are not statutory apprentices **do count**.
  **[Hypothesis]** — the exclusion and its legacy citations (Apprentices Act s.18,
  EPF Act s.2(f)) are carried, not re-captured, and no research round located its
  Code-era basis. Form I lists "Trainee" as an employment type (EV-055), so a
  trainee is on the register either way. **Kill criterion: confirm the apprentice
  exclusion against the Code definitions before the step function drops anyone from
  a count** (§06.13).
- **Directors** who draw salary and are not merely equity holders count as employees
  for ESI/PF where an employer-employee relationship exists; a non-executive director
  paid only sitting fees does not. **[Hypothesis]** — the ESIC position on directors
  has shifted; **kill criterion: confirm director inclusion against the current ESIC
  circular and the establishment's actual engagement terms before enrolling.**
- **Part-time, casual, seasonal and daily-rated workers** count toward the ESI/EPF
  headcount test on the "employed on any day" reading, even if not working today.
  That reading is the legacy Acts'; the Code-era First Schedule wording for EPF and
  ESI does not carry it on its face — **[Hypothesis]** (§06.13).

**Product implication.** The tenant's obligation profile is derived, never
declared. The engine computes it from (headcount time-series per counting unit ×
establishment type × work-location state and sphere × sector × engagement-type mix),
re-derives it every payroll period,
and **latches** any obligation whose look-back window has been crossed. When a
tenant crosses 20 for the first time, EPF enrolment, UAN generation, ECR filing and
bonus eligibility must appear as tasks automatically — the customer should not have
to know the threshold exists. This is the direct product expression of "the feature
gates mirror the obligation gates exactly" (§01). The latch also means an obligation
must be **explicitly retired**, never silently dropped when headcount falls: the
engine records the trigger event, the look-back window, and the (rare) statutory
exit condition, so an auditor can see why an obligation is still active at 17 heads.

#### Counting units — what each statute counts, and how the count is built

The threshold table names six populations. The engine keeps a separate daily count
for each, per establishment (`headcount_tracked[counting_unit]`, §14.4.1), because a
tenant can be above one line and below another on the same day (EV-057). The Codes'
own definitions of "employee" and "worker" were not read in any research round, so
which engagement types fall inside each unit is held as data, never as code: a
per-statute parameter `count.<statute>.<engagement_type>` taking `include`,
`exclude` or `unconfirmed`, owned by the statutory lead and routed to §20.

| Counting unit | Obligations in the table above that use it | Engagement types counted by default | Held `unconfirmed` until §20 reports |
| --- | --- | --- | --- |
| **Employees** | EPF 20 (CoSS Ch. III); gratuity 10 and maternity benefit 10 (Ch. V, VI); crèche 50 (CoSS s.67(1)) | The Form I employment types — Permanent, Temporary, Fixed Term, Trainee, Badli (EV-055) | Statutory apprentices (the exclusion is carried, its Code-era basis not located); salaried directors; contractor-supplied staff |
| **Persons** | ESI 10, or 20 for Central-sphere extended classes (Ch. IV); legacy statutory bonus 20 | As for employees | As for employees, plus whether the Code-era bonus test counts persons at all (§06.7) |
| **Workers** | Grievance Redressal Committee 20 (IR Code s.4); "factory" over 20 with power or 40 without; appointment letter at an establishment of 10 (OSH Code s.6(1)(f)); canteen 100; works committee 100 on order; lay-off, retrenchment and closure at 50 and 300; standing orders 300; the POSH Local Committee route below 10 (s.6(1)) | As for employees | Roles the Code's "worker" definition may leave out — the definition was not read, so managerial and supervisory roles are held `unconfirmed` rather than assumed in or out |
| **Contract labour** | Contract-labour provisions 50, "on any day of the preceding 12 months" (OSH Code s.45) | People deployed through a contractor, from the principal employer's contractor records (§09.9-A) | Whether the same people also count in the principal employer's own employee or worker count (first edge case above) |
| **Inter-state migrant workers** | ISMW provisions at 10, with the ₹18,000 wage test (OSH Code ss.59, 61) | Workers flagged inter-state migrant on the employee record — the flag is captured, never inferred from an address | The statutory definition's criteria, not read (§06.13) |
| **Every employer** | TDS on salary; POSH Internal Committee (s.4(1)); minimum wages | — | — |

**The two-bound count.** Because membership can be `unconfirmed`, each count is kept
as two numbers: a **lower bound** (members marked `include`) and an **upper bound**
(`include` plus `unconfirmed`). Every threshold is evaluated against both.

| Lower bound at or above the line | Upper bound at or above the line | Engine result |
| --- | --- | --- |
| Yes | Yes | **TRIGGERED** — the obligation arms and its tasks appear |
| No | Yes | **POSSIBLE** — a warning names the `unconfirmed` members and the parameter that would resolve them; nothing arms and nothing is silently dropped |
| No | No | **NOT_TRIGGERED** |

An alerting engine that fires wrongly is worse than none (r5 synthesis item 20), and a
silent miss on a latching obligation turns into arrears with interest. POSSIBLE is
the state that avoids both. It never blocks a pay run (R17).

**Who is on a given day's count.** The wordings count people "employed" on a day, so
the engine's daily count follows employment, not presence or pay:

- a person serving notice counts until the recorded exit date; a person on any kind
  of leave, paid or unpaid, counts, because leave does not end employment;
- an accepted offer does not count before the date of joining, and a forecast or an
  open requisition never counts;
- each employee maps to exactly one establishment for statutory purposes on any date
  (§07 FR-CHR-021), so nobody is counted twice on the same day;
- engagement types outside Form I's five — consultants and platform engagements
  (§14.4.2) — default to `unconfirmed` in every unit, so they widen the upper bound
  and surface in POSSIBLE rather than being silently counted or silently ignored.

**Daily, not month-end.** The look-back wordings count "any day": gratuity and
maternity benefit read "employed, or were employed, on any day of the preceding
twelve months", and contract labour "on any day of the preceding 12 months". The
count that decides a look-back test is therefore the maximum daily count inside the
window, recomputed from dated joins, exits and contractor deployments. A month-end
snapshot misses a ten-person day in the middle of a month.

#### Deriving an obligation — class limbs, area tests and nested obligations

Headcount is one input among several. Four features of the verified text turn the
derivation from "count at or above the line" into a decision:

1. **Establishment-class limbs that ignore headcount.** CoSS Chapter VI (maternity
   benefit) applies to every factory, mine or plantation, and separately to every
   shop or establishment with ten or more employees on any day of the preceding
   twelve months (First Schedule, read verbatim, r1/06 finding 55). Chapter V
   (gratuity) has the same two-limb shape (§06.6). A six-person factory is inside
   both.
2. **Area and date notifications.** ESI applies only where ESIC has notified the area
   (§06.3), and contributions become payable from a date the Central Government
   notifies per establishment (CoSS First Schedule proviso, r1/06 finding 25). A
   partially notified district covers headquarters areas and industrial centres
   only, so the test runs on the work location, not on the district name.
3. **Nested obligations.** Some duties exist only inside another. The crèche duty
   binds "every establishment to which this Chapter applies" — Chapter VI — with
   fifty employees or a prescribed number (s.67(1), r1/06 finding 56). The unified
   annual return in Form XXIII binds "the employer to which the provisions of Chapter
   V and Chapter VI of the Code apply" (SS r.53(5)(a), r5/04 finding 48). The
   FORM-XVII Part IV self-declaration binds every establishment to which Chapter III
   and Chapter IV apply (OSH r.72(8), r5/04 finding 22). Both rules say "and". Whether
   that means both Chapters must apply, or either is enough, has not been read by
   counsel. So each nesting is a parameter — `ss.form_xxiii_chapter_test` and
   `osh.form_xvii_part_iv_chapter_test`, each `both` or `either`, routed to §23.
   Until counsel sets them, the product raises the task where either Chapter applies,
   because a missed return costs more than an unneeded one. The task shows the rule's
   wording and the reading applied.
4. **Single-person triggers.** An establishment carrying on a hazardous or
   life-threatening occupation the Central Government notifies is inside ESI with a
   single employee (EV-057).

| Obligation | Class or area limb | Headcount limb | Nested on | `latch_rule` | Source · marker |
| --- | --- | --- | --- | --- | --- |
| ESI | Area notified for the work location; a notified hazardous occupation at 1; a seasonal factory excluded | 10 persons; 20 for Central-sphere extended classes | — | `unconfirmed` — Code-era wording not captured | CoSS First Schedule Ch. IV; ESIC coverage page (r1) **[Verified]** |
| EPF | — | 20 employees; voluntary below 20 by agreement (s.1(5)) | — | `unconfirmed` — legacy Act latched, Code-era wording not captured | Ch. III (EV-057) **[Verified]** |
| Gratuity | Factory, mine, oilfield, plantation, port, railway company — any headcount | 10 employees on any day of the preceding twelve months | — | `look_back_12m` | Ch. V (§06.6) **[Verified]** |
| Maternity benefit | Factory, mine, plantation — any headcount | 10 employees on any day of the preceding twelve months | — | `look_back_12m` | Ch. VI (r1/06 finding 55) **[Verified]** |
| Crèche | — | 50 employees "or such number of employees as may be prescribed" | Maternity benefit (Ch. VI) | Follows its parent | CoSS s.67(1) (r1/06 finding 56) **[Verified]**; OSH Code s.24 counts workers separately |
| SS unified annual return, Form XXIII | — | — | Gratuity and maternity benefit, as the rule words it; `either` until `ss.form_xxiii_chapter_test` is set | Follows its parents, year by year | SS r.53(5)(a) **[Verified — central sphere]**; the both-or-either reading is a counsel item |
| FORM-XVII Part IV self-declaration | — | — | EPF and ESI, as the rule words it; `either` until `osh.form_xvii_part_iv_chapter_test` is set | Follows its parents | OSH r.72(8) **[Verified — central sphere]**; the both-or-either reading is a counsel item |
| Contract-labour provisions and the FORM-XVII Part III return | The return is not owed for a contract to produce a given result (r.98(9)) | 50 contract labour on any day of the preceding 12 months | — | `look_back_12m` | OSH Code s.45; r.98(9) **[Verified]**. That the return nests on the 50 line is **[Hypothesis]** — r.98(9) says "every principal employer of an establishment" |
| Grievance Redressal Committee | — | 20 workers | — | `none` — no latch wording captured | IR Code s.4 (EV-057) **[Verified]** |
| Appointment letter, state-prescribed form | — | An establishment of 10 workers | — | `none` | OSH Code s.6(1)(f) (EV-057; K-18) **[Verified — central text]** |
| POSH Internal Committee | Per administrative unit or office (s.4(1) proviso) | None — every employer | — | Not headcount-driven | POSH Act s.4(1) (EV-056) **[Verified]** |

<!-- DIAGRAM: statutory-spine-obligation-dependencies -->

`latch_rule` takes four values, and the retirement behaviour in the next table reads
them:

- **`none`** — the obligation applies while the line is met on the evaluation day. A
  fall below the line opens a retirement review; it never retires by itself.
- **`look_back_12m`** — the obligation applies while any day in the trailing twelve
  months met the line.
- **`once_covered`** — the obligation continues after coverage whatever the count;
  only a recorded statutory exit condition ends it. Legacy-period rows (the EPF Act,
  the Payment of Bonus Act) use it.
- **`unconfirmed`** — the Code-era wording has not been read. Treated like
  `once_covered` for retirement, and flagged on every period that relies on it.

#### The obligation-instance lifecycle — transition table

One obligation instance exists per obligation and establishment — per administrative
unit for POSH. It is distinct from the filing instance (§08 FR-PAY-711): an ACTIVE
obligation schedules filing instances, and every filing period it created stays in the
ledger until filed or resolved, even after the obligation retires (§14.3.1 T5). The
diagram illustrates; the table specifies.

<!-- DIAGRAM: statutory-spine-obligation-latch -->

| # | From → To | Event | Guard | Side effect | Who may trigger |
| --- | --- | --- | --- | --- | --- |
| O1 | NOT_TRIGGERED → POSSIBLE | Daily re-derivation | Upper bound at or above the line and lower bound below it; or the ESI area status of the work location is unknown | A warning naming the `unconfirmed` members or the missing area record, and the parameter to resolve | System |
| O2 | POSSIBLE → TRIGGERED | Membership or area resolved | Lower bound at or above the line after resolution | As O4 | Payroll operator, with the basis recorded |
| O3 | POSSIBLE → NOT_TRIGGERED | Membership or area resolved | Upper bound below the line after resolution | The resolution and its basis logged | Payroll operator, with the basis recorded |
| O4 | NOT_TRIGGERED → TRIGGERED | Daily re-derivation | Lower bound at or above the line, and every class, area and nesting guard passes | Trigger date and the crossing day recorded | System |
| O5 | TRIGGERED → ACTIVE | Obligation armed | Effective date resolved: the trigger date, or for ESI the notified contribution date on the establishment's ESIC record | Registration, enrolment and first filing-instance tasks created (FR-PAY-711 F1); the obligation joins the calendar (§06.11) | System |
| O6 | ACTIVE → ACTIVE | Daily re-derivation with the count below the line | `latch_rule` is `look_back_12m` with a qualifying day still in the window, or `once_covered`, or `unconfirmed` | None; the reason the latch holds is shown | System |
| O7 | ACTIVE → RETIREMENT_REVIEW | Count below the line with no latch holding | `latch_rule` is `none`, or `look_back_12m` with no qualifying day left in the window | A review task naming the obligation, the window and the last qualifying day; filing instances keep scheduling until O8 | System |
| O8 | RETIREMENT_REVIEW → RETIRED | Retirement approved | A named approver who did not raise the review records the statutory exit basis and its citation | Future filing instances stop; accrued liabilities (gratuity for service already rendered) keep their ledger | Named approver |
| O9 | RETIREMENT_REVIEW → ACTIVE | Review rejected, or the count re-crosses | — | Review closed with its reason | Named approver, or system |
| O10 | RETIRED → TRIGGERED | Count re-crosses | As O4 | A new trigger date; the retired instance stays as history | System |
| O11 | NOT_TRIGGERED → ACTIVE | Voluntary coverage | A recorded basis — for EPF, an agreement between the employer and a majority of employees (CoSS s.1(5)) | As O5, with the voluntary basis on the instance | Payroll operator plus approver |
| O12 | ACTIVE → RETIREMENT_REVIEW | Operator raises a review (closure, transfer of the business, surrender of a registration) | Any `latch_rule` | As O7 | Payroll operator |

There is no path to RETIRED except O8. `once_covered` and `unconfirmed` rows reach a
review only through O12, so an obligation whose latch wording nobody has read can
never lapse because a count fell.

**What a crossing shows.** Every O1, O4, O7 and O12 transition raises one notice to
the payroll operator and the tenant's approver, and the same payload feeds §07
FR-CHR-023's threshold surface. A field the engine cannot fill says "unset"; it is
never filled from general knowledge.

| Field | Content | Example — the EPF crossing of 3 November 2026 in the worked example below |
| --- | --- | --- |
| Obligation and establishment | The obligation instance | EPF · the Maharashtra establishment |
| Rule and marker | The threshold row's `rule_id`, citation and evidence marker | CoSS First Schedule Ch. III · **[Verified]** |
| Counting unit and bounds | The unit, both bounds, and the people who make the difference | Employees · 20 / 23 · two apprentices and one director `unconfirmed` |
| Crossing day and window | The day the line was met, and any look-back window applied | 3 November 2026 · no window |
| Latch rule | `latch_rule` and what it means for a later dip | `unconfirmed` — never retires on a count alone |
| Sphere | Central or state, and the rule-set in force for the work location | Central |
| Tasks created | Each with its owner and due date | UAN generation; seeding queue; the first ECR instance, due 15 December 2026 |
| Unset parameters | Every parameter the obligation reads that has no value | `epf.admin_charge.minimum`, `epf.damages_scale` (R18) |
| Routed to counsel | Anything the product does not decide | — |

A notice is an operational record. It is never phrased as legal advice, and a copy
shown to a customer clears the §23 claim rule first (Part D-20).

**When the facts behind a count change.** Joins, exits and deployments are
effective-dated and can arrive late or be corrected (§14.6.1). The derivation re-runs
as of each fact's effective date, so the obligation's history becomes what the
corrected facts imply — and nothing already done is erased.

| Late or corrected fact | Effect on the obligation | Effect on filings |
| --- | --- | --- |
| A join entered on 15 December 2026, effective 3 November 2026, turns out to be the 20th employee | EPF's trigger date moves back to 3 November 2026 | The November 2026 ECR must carry every member from the trigger date; if a November return was already approved, the members absent from it go by Supplementary (decision table, §06.2) |
| A join is reversed as entered in error, and without it the line was never crossed | The trigger is withdrawn with a record of why — never deleted | Filings already made stay in the ledger; any refund or correction route is the authority's, taken through §22 |
| An exit backdated into a closed month | Counts re-derived; a look-back latch still holds while another day in the window qualifies | The exit is marked on the portal (EV-041); where the portal already carries a different exit date, the joint-declaration path |
| A contractor's deployment records arrive a month late | The contract-labour count and its latch re-derived for that month | FORM-XVII Part III's monthly maximum updated before the annual return (§06.9) |

#### Worked example — one establishment across its first year

A services establishment in Maharashtra: a shop or establishment, not a factory; its
district is fully ESI-notified (an input); no contract labour. Headcounts and dates
are illustrative inputs, not evidence. Two staff who join later are statutory
apprentices, whose membership is `unconfirmed` for every unit (§06.1); a salaried
director who joins later is `unconfirmed` for EPF and ESI.

| Date | Event | Employees: lower / upper | Transitions | Tasks and filings created | Basis |
| --- | --- | --- | --- | --- | --- |
| 1 Apr 2026 | The tenant opens with 8 staff | 8 / 8 | TDS, minimum wages and the POSH IC: ACTIVE, no threshold. PT: ACTIVE by state, not headcount | The Form 138 series under the entity's TAN; an IC record per administrative unit (§10 FR-T-D011); Maharashtra PT registrations | EV-050, EV-056, §06.4 |
| 12 Jun 2026 | The 10th regular employee joins | 10 / 10 | Gratuity and maternity benefit: O4, O5 → ACTIVE, `look_back_12m`. ESI: O4 → TRIGGERED, ACTIVE from the notified contribution date. Appointment letter: TRIGGERED once worker membership resolves | A gratuity accrual ledger per employee; ESIC registration and IP enrolment for members at or below ₹21,000; an appointment-letter task that is a *configuration* task, because Maharashtra's form is not captured | §06.3, §06.6, K-18 |
| 1 Sep 2026 | Two apprentices and a salaried director join; 17 regular staff | 17 / 20 | EPF: O1 → POSSIBLE | A warning naming the three people and the parameters `count.epf.apprentice` and `count.epf.director`; no UAN or ECR task yet | §06.1 edge cases |
| 3 Nov 2026 | The 20th regular employee joins | 20 / 23 | EPF: O4 → TRIGGERED → ACTIVE from the trigger date. Grievance Redressal Committee: TRIGGERED once worker membership resolves. Statutory bonus: POSSIBLE — the Code-era threshold is unconfirmed (§06.7) | UAN generation and the seeding queue; the first ECR instance, wage month November 2026, due 15 December 2026; the establishment ledger opens (FR-PAY-712) | EV-057, EV-038 |
| ~21 Nov 2026 | The ESI saving lapses (§06.9) | — | ESI stays ACTIVE as an obligation; its post-cliff filing instances go BLOCKED-pending-regime unless a successor publishes | The post-cliff decision task (`esi.post_cliff_mode`, §06.9) | §06.9 |
| 1 Feb 2027 | Three regular staff leave | 17 / 20 | EPF: O6 — stays ACTIVE (`unconfirmed`). Gratuity, maternity benefit: O6 — qualifying days remain in the window. Grievance Redressal Committee: O7 → RETIREMENT_REVIEW | A review task for the committee; nothing is dropped | R4 |
| 28 Feb 2027 | Annual labour returns | — | Form XXIII: due for 2026, because Chapters V and VI applied from 12 June 2026 | A Form XXIII instance for 2026, due 28 February 2027 | SS r.53(5)(a) |

#### POSH — the Internal Committee obligation, specified

POSH sits outside the four Codes (r1/06 finding 57) and is not headcount-gated. Two
provisions are verified verbatim (r5/05 finding 32; EV-056):

- **s.4(1).** Every employer of a workplace constitutes an Internal Committee by an
  order in writing. Where the workplace's offices or administrative units are at
  different places, or at divisional or sub-divisional level, the Committee is
  constituted at all administrative units or offices.
- **s.6(1).** The district Local Committee receives complaints from establishments
  where no Internal Committee has been constituted because there are fewer than ten
  workers, or where the complaint is against the employer.

Two data consequences follow. The obligation instance keys on **employer ×
administrative unit or office**, not on the legal entity, so the unit list comes from
the establishment and work-location model (§07, §14) and a new office creates a new
instance. And the ten-line in s.6(1) counts **workers**, not employees. Complaint
routing is read top-down; the first matching row decides.

| Complaint situation | Route the product records | Basis |
| --- | --- | --- |
| The complaint is against the employer | The district Local Committee, at any headcount | s.6(1) |
| An Internal Committee is constituted for the unit | That Internal Committee | s.4(1) |
| No Internal Committee, and fewer than ten workers | The district Local Committee | s.6(1) |
| No Internal Committee, and ten or more workers | An s.4(1) gap flagged to the operator; the complaint's receipt is recorded; the product does not choose a route | No route for this case is captured — counsel (§23) |

The obligation instance holds, per administrative unit or office: the unit and its
address; its worker count on both of the scopes described below; the reference and
date of the written order constituting the Committee — s.4(1) requires "an order in
writing" — or the recorded absence of one; and the district whose Local Committee
receives the complaints the table routes there. A unit with no order on record shows
the s.4(1) gap on the obligation surface from the day the unit exists (TV30).

Whether s.6(1)'s ten-worker test is read per administrative unit or across the whole
employer is not settled in the evidence; the product computes both and shows both
(`posh.lc_count_scope`, §20). What the product does not state: the duties, annual
report, inspection powers and penalties in ss.19, 21, 22, 25 and 26 were not
re-verified in round five (§23 counsel register, CR-49). The annual report's period
is `posh.annual_report_period`, with no shipped default — s.21 frames a calendar year
while practice describes a financial-year deadline (r1/06 finding 59, medium). The IC
record and complaint intake belong to §10 (FR-T-D011), and the product never sells
POSH "compliance" as an outcome (§23).

---

### 06.2 EPF — Employees' Provident Fund

**What it is.** A defined-contribution retirement scheme with three sub-schemes
riding on the same base wage: the Provident Fund (EPF), the pension (EPS 1995),
and the linked insurance (EDLI 1976). It is the single most consequential
statutory computation in Indian payroll and, per §01, the reason the beachhead
begins at 20 employees.

**Who it binds.** Every establishment in which **20 or more employees** are
employed — the scheduled-employments limitation is removed (CoSS First Schedule,
Ch. III; EV-057). The legacy EPF Act latched once covered; the Code-era latch
wording is unconfirmed (§06.13). Voluntary coverage below 20 is possible by agreement
between the employer and a majority of employees (CoSS s.1(5)). An employee earning **above ₹15,000/month basic + DA at the
time of joining** may be treated as an "excluded employee" (not compulsorily
enrolled if never previously a member); once a member, they remain a member even if
wages later exceed the ceiling, with contribution restricted to the ceiling unless a
joint higher-wage option is exercised. (Source: EPFO EPF Scheme page as captured
September 2026, r1 — "mandatory" up to ₹15,000, "voluntary" above) **[Verified —
regulator page, medium]**. The legacy paragraph references (paras 2(f), 26A) are
carried, not re-captured. So is the six-month submission window for the joint
option: EPFO's redesigned page no longer carries the passage (r1). The window is
parameter `epf.higher_wage_option_window` (§06.13).

**Thresholds and rates.**

| Item | Value | Note | Source cue |
| --- | --- | --- | --- |
| Statutory wage ceiling | **₹15,000/month** | PF is computed on min(PF wages, 15,000) unless the employer opts for actual wages. Not raised to ₹21,000 or ₹25,000: those figures rested on low-quality sources and were retracted (r1); a Supreme Court direction to reconsider the ceiling is reported, so the ceiling is effective-dated, never a constant | The ₹15,000 value is on EPFO's own pages (r1) **[Verified]**. The s.2(89) hook was read in the Code text (one definition serves EPF and ESI membership). The re-fixing instrument, S.O. 2702(E) of 29.05.2026, was read through a professional alert quoting it, not the gazette (r1/06 finding 13) **[Verified — mirror]**; pull from the primary source before customer use |
| Employee contribution | **12%** of PF wages | Re-notified for the EPF Scheme 2026 by **S.O. 3582(E)** of 01.07.2026, retrospective to 21.11.2025 | S.O. 3582(E) **[Verified]** |
| Employer contribution | **12%**, split: **8.33% to EPS** (capped at 8.33% of ₹15,000 = ₹1,250) + **3.67% to EPF** | The EPS split and the ₹1,250 cap are the classic source of computation error | EPFO EPF and EPS Scheme pages, Sep 2026 (r1); the 1,800 / 1,250 / 550 split is EPFO's own Help File fixture (EV-035) **[Verified]** |
| Central Government EPS contribution | **1.16%** of wages, subject to the ceiling | Paid by the Central Government, not the employer — the engine never adds it to the employer's remittance | EPFO EPS page (r1) **[Verified]** |
| Reduced rate (10%) | S.O. 3582(E)'s 12% excludes IBC-resolution establishments and the jute, beedi, brick, coir (other than spinning) and guar gum industries; the ECR upload screen offers 12% or 10% as a portal control (EV-035) | A notified variable — must be effective-dated per establishment class, not assumed 12% | S.O. 3582(E) **[Verified]**; any other legacy reduced-rate limb is carried, not re-captured, and needs a Code-era basis — §06.13 |
| EDLI | **0.50%** of PF wages (max wage ₹15,000) | Employer-only, no employee deduction | EPFO EDLI page (r1) **[Verified]** |
| EPF admin charges | **0.50%** of PF wages; the establishment-level minimum is parameter `epf.admin_charge.minimum` | Employer-only. The rate rests on EPFO circulars of 22.03.2017 and 29.05.2018, issued under the repealed Act. It was not re-verified, and whether the 29 May 2026 S.O. series re-notified it is unknown (r1). The minimums v0.3 carried are not re-captured | **[Hypothesis]** — §06.13 |
| EDLI admin charges | Nil | Per the same pre-Code circulars (r1), not re-verified | **[Hypothesis]** — §06.13 |
| Inspection charges (exempted own-trust establishments only) | EPF Scheme 0.35% of wages, minimum ₹8,750; EDLI 0.005%, minimum ₹1,250 — payable within fifteen days of the close of every month | Applies only where the establishment runs its own exempted fund; for such an establishment the challan carries inspection charges only (EPFO revamped-ECR FAQ, r5) | S.O. 2701(E), 29.05.2026, issued under CoSS s.143(6) (r2, gazette table read) **[Verified]** |

Worked example (one employee, PF wages ₹15,000, employer contributes on ceiling):

| Head | Rate | Amount |
| --- | --- | --- |
| Employee EPF | 12% | ₹1,800 |
| Employer EPS | 8.33% (capped) | ₹1,250 |
| Employer EPF | balance of 12% | ₹550 |
| EDLI | 0.50% | ₹75 |
| EPF admin | 0.50% ([Hypothesis] rate, above) | ₹75 |
| **Total remitted per employee** | | **₹3,750** |

The first three lines are EPFO's own Help File fixture (EV-035). The ₹3,750 total
holds only while the admin-charge rate holds. The establishment-level minimum is
applied once per establishment per wage month, never per member.

<!-- DIAGRAM: eps-three-way-split -->

Note the employer's ₹1,800 splits **₹1,250 to EPS + ₹550 to EPF**, not 8.33%/3.67%
of actual wages, because EPS is capped at ₹1,250. A payroll engine that applies
8.33% to actual wages above the ceiling mis-allocates the pension share — one of
the most common bugs in Indian payroll software, and a legally material one because
it changes the employee's pension entitlement. A second, subtler bug: when the
employer opts for **actual-wage** PF above ₹15,000, EPS *still* caps at ₹1,250, so
the entire excess (12% of the amount above ₹15,000 plus the 3.67% share) lands in
**EPF**, not EPS. The three-way split is a function of two independent elections
(ceiling-vs-actual, and EPS-cap), not one.

**EPS eligibility and higher-pension edge cases.**

- **EPS membership closes to new high earners.** An employee who **first joins EPF
  on or after 01.09.2014 with PF wages above ₹15,000** is *not* an EPS member — the
  full 12% employer share goes to EPF, EPS is zero. The engine must branch on
  first-join date and first-join wage, not on current wage. (Source: EPFO
  revamped-ECR FAQ Q6, Q8(a) and Q14, and circular para 8(iii), r5; the legacy EPS
  paragraph and amendment date are carried, not re-captured) **[Verified]** The
  revamped ECR only **flags** such contributions before filing; it does not reject
  them (EV-040). The engine must therefore get EPS = 0 right itself — the portal
  will not catch the error. EPFO's FAQ is inconsistent on the boundary day: Q8 says
  "after 1 September 2014" and Q14 says "on or after". Inclusivity is parameter
  `epf.eps_closure_boundary_inclusive`, defaulting to "on or after" (Q14) and routed
  to §20.6. A member who joined on exactly 01.09.2014 is a named test vector (TV17).
- **Higher pension on actual wages.** A Supreme Court judgment upheld the amended
  EPS, letting eligible members contribute EPS on actual wages above ₹15,000. EPFO
  opened an application window and extended it repeatedly. The judgment's name and
  date are carried, not re-captured. A tenant with opted-in employees needs EPS computed on actual
  wages for exactly those members. **[Hypothesis]** — the operational rules,
  arrears-recovery mechanics and the final application deadline have shifted several
  times; **kill criterion: confirm each opted member's EPFO higher-pension approval
  status and the prevailing EPFO circular before computing EPS above the ceiling —
  do not infer it from wage level.**
- **Pensionable age 58.** The minimum-service and early-pension conditions gate EPS
  *claims*, and the service ledger must support them. Those conditions, the legacy
  claim forms (10C/10D) and their paragraph references are carried, not re-captured.
  They are parameters `eps.min_service_years` and `eps.early_pension_age`
  **[Hypothesis]** (§06.13). Age 58 bites on the monthly ECR as well (verified): the revamped system disallows the EPS component for members who have
  attained 58 and are not marked for deferred pension — the only hard EPS block in
  the portal (EV-040).

**VPF and taxability of high contributions.** Voluntary Provident Fund (VPF) lets an
employee contribute **above the statutory rate** (EPF Scheme para 29(2), per EPFO's
revamped-ECR FAQ Q17) with no matching employer obligation. It rides the same
account, and ECR filing for it is unchanged (r5). Two mechanics the engine must hold
(FAQ Q17–Q18, r5) **[Verified]**. First, a contribution above the ceiling needs a
joint written request and an employer declaration on administrative charges
(para 26(6)). Second, administrative charges follow **wages, not contributions**:
for employee-only VPF they are payable on actual wages, subject to the ceiling.
Interest on employee contributions above an annual threshold is taxable, under
1961-Act provisos to s.10(11)/(12). The threshold values v0.3 carried — a lower
one with an employer contribution, a higher one without — are carried, not
re-captured. They are parameters `tax.pf_interest_threshold.with_employer` and
`tax.pf_interest_threshold.without_employer` **[Hypothesis]**. The engine tracks
cumulative annual employee contribution against them. That is a Form 130 (ex-Form 16)
input, not just a payroll line. The 2025-Act equivalent of the provisos is unmapped
(§06.13).

**The wage-splitting precedent.** Before the Codes, the Supreme Court held in *RPFC
v Vivekananda Vidyamandir* that allowances **ordinarily, uniformly and necessarily
paid to all** employees are "basic wages" for PF. Employers cannot carve the PF base
down by relabelling universal pay as "special allowance". This is the case-law
ancestor of the Codes' 50% add-back (§06.10), and it still governs pre-Code periods
that a retro run might touch. **[Hypothesis]** for the citation: the judgment's
date and appeal number are carried, not re-captured (§06.13). The engine does not
depend on the case. For Code-era periods the add-back decides the base, and "special
allowance" is not an excluded head (§06.10).

**Arrears, LOP and mid-month join/exit.** PF is computed on wages **actually earned**
in the month: loss-of-pay days reduce PF wages proportionately. Salary arrears are
**computed** against the wage months, and the rule versions, to which they relate
(a retro-recompute, §06.10), but the PF **liability** on them dates from the
**disbursal date**, not the wage month. EPFO's revamped-ECR FAQ has the arrear
disbursal date set the due month, and it distinguishes true arrears (e.g., a
revision) from merely belated salary. Arrears are filed through the separate, fenced
"File Arrear Return" flow (EV-043). The due date is surfaced when the arrears batch
is approved (§08). The disbursal-date rule and the arrear flow are **[Verified]**
(EPFO revamped-ECR FAQ Q15 and manual, r5). A mid-month joiner accrues PF on the
part-month wage. Whether the ₹15,000 ceiling is pro-rated for a part month is held as
a per-tenant policy, parameter `epf.ceiling_prorate_part_month`. It is not a
statutory constant: v0.3's "not pro-rated" default is carried, not re-captured
**[Hypothesis]**.

**International Workers (IW).** An IW (a foreign national working in India for a
covered establishment, or an Indian working abroad in an SSA country) contributes on
**full wages with no ₹15,000 ceiling**, unless exempt under a Social Security
Agreement via a Certificate of Coverage. **[Hypothesis]** — the paragraph references
(EPF Scheme para 83, EPS para 43A), the SSA country list and the court history are
carried, not re-captured. As carried, a High Court is reported to have struck down
the IW special provisions and the matter is under challenge; the court and year v0.3
named trace to no research round and are not stated here; **kill criterion: confirm the
current enforceability of para 83 (and any SC stay/ruling) before applying uncapped
IW contributions — this is a live, contested rule.** IW filing is unchanged under
the revamped ECR (EV-045). EPFO's FAQ states that IWs who joined after September 2014
above ₹15,000 are not EPS members, while pre-September-2014 joiners above the
ceiling contribute EPS on full salary.

**UAN, Aadhaar seeding and the joint declaration — the operational chokepoint.**
The UAN (Universal Account Number) is the member's permanent PF identity across
employers. EPFO requires UANs to be **Aadhaar-seeded** before contributions can be
received through the ECR. That is an EPFO administrative instruction (circular of
01.06.2021, confirmed by HO circular BKG-27/5/2021-BKG of 11.09.2021), not a statute or
notified regulation. **[Verified]** Under the revamped ECR the upload is validated
*before* a return statement and challan exist (EV-036), so a problem member surfaces
at validation — it is not a payment that clears and silently fails to credit. A
date of exit recorded in error can be corrected **only** through a **joint
declaration** by employer and employee; until it is corrected, no contribution can be
filed for any period after the recorded exit date. That is an offline dependency that
can stall a whole wage month. A date of exit can, by contrast, be marked without any
member-detail or Aadhaar update (EV-041). **[Verified]** The engine holds seeding and
KYC state **per member**, surfaces a remediation queue **before** the filing window,
and never treats "UAN exists" as "UAN filable". Aadhaar stays optional, EPF flows
included: where a member has not seeded, the default is **exclude-and-flag, with
notices to the operator and the employee — never a payroll block**. Alternatives and
the final choice go to counsel (§07, §23). One reported fact could move this. r1
reads EPF Scheme 2026 para 25 (from a secondary reproduction, medium confidence) as
requiring Aadhaar, an Aadhaar-seeded bank account, PAN and UAN. If the gazette text
confirms it, the seeding requirement gains a notified-scheme basis beyond an EPFO
instruction. That changes the counsel question, not the default. The product still
never ships a hard-block configuration (Part D-10), and the reading is routed to
§20.6 and §23. The broader joint-declaration field list
and proof matrix (name, date of birth and other member details) is **[Hypothesis]**;
**kill criterion: confirm it against the latest EPFO circular before building the
general correction flow.**

**Government employer-share subsidies (ABRY / PMRPY) are a contribution branch, not
a discount.** Under employment-incentive schemes the government pays part or all of
the *employer's* (and sometimes the *employee's*) share for eligible new joiners for
a fixed window. PMRPY and ABRY (Aatmanirbhar Bharat Rozgar Yojana) subsidised
statutory shares for eligible new low-wage joiners, and their registration windows
are closed. Which shares each scheme paid, and the scheme particulars, are carried,
not re-captured. Where a member is enrolled under such a scheme, the ECR must still *report* the
full statutory contribution but the **employer's remittance is reduced by the
subsidised portion**, reconciled against the scheme's eligibility (wage ceiling, new-
vs-existing member, registration date). Modelling the subsidy as a flat rate cut
mis-states both the ECR and the remittance. (v0.3 cited EPFO's ABRY/PMRPY scheme
guidelines; no research round re-captured them, so the report-full/remit-net
mechanics are carried, not re-captured) **[Hypothesis]** — these schemes have hard, expired or rolling
registration windows and any successor employment-linked incentive scheme carries
fresh eligibility rules; **kill criterion:
verify which scheme, if any, is open and the member's eligibility against the current
EPFO/MoLE scheme notification before applying a subsidised employer share — do not
carry a lapsed scheme forward.**

**Filing cadence.**

- **ECR (Electronic Challan-cum-Return)** — monthly; contributions are due within
  fifteen days of the close of the month, i.e. by the **15th** (EPF Scheme 2026).
  The re-engineered ECR (beta, applicable from wage month September 2025) keeps
  the file layout but separates the **return** from the **payment** (EV-035, EV-036):
  - **File (EV-035).** Plain-text `.txt`, one line per member, **no header row**,
    exactly **11 fields** separated by the **three-character** delimiter `#~#`:
    UAN; Member Name as per UAN; Gross Wages; EPF Wages; EPS Wages; EDLI Wages;
    Employee PF Contribution; Employer EPS Contribution; Employer PF Contribution;
    NCP Days; Refund of Advance. Gross Wages is mandatory, and each line carries
    10 delimiters. Wage Month, Return Type, Contribution Rate (12% or 10%) and a
    mandatory Remark are portal form controls, not file content. The generator
    never writes them into the `.txt`; it surfaces them to the operator at export.
    No filename pattern is mandated. The generator is buildable now. A second,
    6-field `#~#` **part-payment contribution file** exists: UAN, MEMBER_NAME,
    EPF_CONTRIBUTION, EPS_CONTRIBUTION, EPF_EPS_DIFF_CONTRIBUTION,
    REFUND_OF_ADVANCES (EV-044). It uploads on a different screen whose only
    controls are Wage Month, Contribution File and Remark — no Return Type and no
    Contribution Rate. It has its own generator and its own fixtures.
  - **Packaging (r5, EPFO manual p.7).** The filename may use letters and digits
    only (strip spaces and special characters). The extension is lower-case. The
    upload limit is 8 MB. A text file above 2 MB is compressed, and smaller files
    may be zipped too. A zip holds exactly one text file and nothing else. EPFO sets
    no filename template, so the product chooses its own within these rules.
  - **Lifecycle (EV-036).** Upload → validate → return statement → approve or reject
    → Due Deposit Balance Summary → challan with TRRN → pay → receipt. **An approved
    return can never be cancelled**; multiple challans are permitted.
  - **Return types (EV-037).** *Regular*. *Supplementary*: needs an approved
    Regular, may be filed repeatedly, and may contain only members absent from every
    prior return for that month. *Revised*: needs an approved Regular, no other
    return in process and **no payment initiated**; it overwrites prior data. So a
    downward correction is possible only before payment initiation, and **the
    statutory verification gate sits immediately before payment initiation** (the
    payroll-month and filing state machines are specified in §08). Upward revision
    has "no such restriction" per the circular (para 5(ii)), but para 5(iii) bars
    any Revised return once a payment process has been initialised, and EPFO's FAQ
    Q5(b) hedges upward revision after payment to "in many cases" (r5). The product
    does not offer upward revision after payment until it is validated on a live
    portal (decision table below, row 6; §08 AC-708.2; §20).
  - **Sequencing (EV-038).** Strict month-wise chronological filing. After a
    four-month transitional relaxation, a Regular return for month M is allowed only
    if returns for all active members of month M−4 have been filed. A skipped month
    blocks later months, so the per-establishment filing ledger must refuse silent
    gaps.
  - **Edge flows.** NIL months use no file: admin and inspection charges go through
    Direct Challan Entry, enabled only when there are no active members (EV-042).
    Arrears go through a separate "File Arrear Return" flow whose layout is **not
    published** — no arrear generator is specified; the flow is fenced (EV-043). VPF
    and International Workers stay within the ECR (EV-045). EPFO's site has moved
    from epfindia.gov.in to www.epfo.gov.in and older manual URLs are dead, so
    source citations must use the new domain (EV-045).
  - **Other validations EPFO applies (r5, FAQ Q8–Q9, exempted-establishment
    FAQ).** Contributions are accepted only between the valid date of joining and
    the date of leaving. The rate may be statutory or higher, never lower. An
    establishment exempted from one or more schemes still reports EPF wages, PF
    contribution, EPS wages, EPS contribution and EDLI wages. Its challan then
    carries inspection charges only.
  - **Status and transition (r5).** The revamped ECR launched as a **beta** for
    wage month September 2025 onward, and no later circular declares it generally
    available. So portal behaviour is not guaranteed stable, and the source page is
    watched (§22). Pending pre-September-2025 ECRs go through the new system too, and
    unpaid old challans are void and must be regenerated.
  - **Failed uploads.** EPFO returns a downloadable error file on a failed upload.
    Its schema is undocumented in every public source (r5). The product needs an
    importer that maps errors back to employee records, built from a captured real
    rejection (§06.13).
- **Annual accounts** — v0.3's statement that EPFO member passbooks and the monthly
  ECR have effectively subsumed the legacy Forms 3A/6A is carried, not re-captured.
  Either way the engine must be able to reproduce a 3A/6A-equivalent register for
  audit and for migration from Tally, which still emits them (EV-032).
- **Onboarding/exit forms** — the declaration on joining, the nomination, the
  joiner and exit returns (Tally still emits PF Forms 3A, 5, 6A, 10 and 12A, EV-032),
  and the employee-initiated withdrawal and pension claims via UAN. The form
  catalogue under Scheme 2026 is not captured. Form identifiers are parameter
  `epf.form_catalogue`, keyed by scheme version. r1 found no source for the
  "Form VI / Form VII" numbers some secondary material attaches to Scheme 2026, and
  dropped them (§06.13).

**Penalties for late/non-payment.**

| Failure | Consequence | Source cue |
| --- | --- | --- |
| Late deposit | Simple interest at **12% p.a.** from the due date to actual payment. The revamped ECR auto-calculates it and it is **mandatory to pay with the monthly contribution** — a cash-flow requirement (EV-039) | Mandatory, auto-calculated interest on the revamped ECR (EV-039) **[Verified]**. The 12% rate is notified under the Code by S.O. 2698(E), 29.05.2026, deemed from 21.11.2025 — read through a professional alert quoting the notification, not the gazette (r1/06 finding 19; §02 mirror register) **[Verified — mirror]**; pull from the primary source before customer use. EPFO's portal still labels it s.7Q |
| Delayed remittance (damages) | Damages may be deposited forthwith or later, at the employer's option (EV-039). The scale is parameter `epf.damages_scale`, with no shipped default. v0.3's graded-by-delay percentages are carried, not re-captured, and EPFO's EDLI page still shows a legacy 1%-per-month figure (r1). VISHWAS 2026, notified 29 June 2026 as part of EPF Scheme 2026 and open for six months, settles damages under both legacy s.14B and CoSS s.128 for defaults before 14 June 2024. An employer using it must clear the interest and undertake not to appeal (r2, medium) | Legacy EPF Act s.14B; CoSS s.128 **[Hypothesis]** for the rate — **kill criterion: verify the Code-era damages scale against the notification and any corrigendum before quoting a rate to a customer** |
| Late filing of a return | ₹500 per day, capped at the month's administrative charges | EPF Scheme 2026 **[Verified — mirror]**; pull from the primary source before customer use |
| Non-enrolment of eligible employee | Recovery of arrears + interest + damages; prosecution | Legacy EPF Act s.14 — carried, not re-captured **[Hypothesis]**; Code-era provision unmapped (§06.13) |
| Dues assessment window | An inquiry into dues may be initiated within five years, concluded within two, and extended by up to one more year. Where the employer fails to produce documents, the officer may decide on the evidence available (s.125(5)) | CoSS s.125 (r5, in force since 21.11.2025) **[Verified]**. The ~8-year practical exposure is r5's arithmetic, not a stated period. Record-retention consequences are a counsel item (Part D-11, §23) |

**Data required.** PF wages (per the wage-definition rule, §06.10), UAN, Aadhaar-
seeded and KYC-verified UAN status, date of joining/exit, first-join date and
first-join wage (for EPS eligibility branching), "excluded employee" flag and its
basis, IW status and Certificate-of-Coverage reference, higher-pension election and
EPFO approval status, VPF election, nomination, and the employer's ceiling-vs-actual
election. Because an un-seeded UAN cannot receive contributions through the ECR,
the engine surfaces seeding state before the filing window, and applies the
exclude-and-flag default rather than blocking payroll.

**Product implication.** The ECR return file is a v1 artefact (§01 names ECR first in
the filings list), delivered on the model set out at the head of this section. The
engine must: (a) compute the three-way employer split correctly against the EPS cap
under **both** ceiling and actual elections; (b) branch EPS on first-join date/wage
and honour per-member higher-pension approvals; (c) pre-validate UAN seeding state
and mirror EPFO's checks exactly — the age-58 EPS rule as a block, the post-2014
high-earner rule as a flag, contributions only between valid dates of joining and
leaving, rate never below statutory — without adding blocks EPFO does not impose
(EV-040); (d) generate the return and part-payment files exactly to EV-035/EV-044
and run the EV-036–038 lifecycle, return-type guards and chronological ledger;
(e) surface mandatory interest at the payment step and in cash-flow forecasting
(EV-039); (f) reproduce 3A/6A-equivalent registers for Tally migration; (g) track
cumulative employee contribution against the parameterised taxable-interest
thresholds; (h) support
the 10% reduced-rate establishment classes; (i) fence arrear-return generation
(EV-043); (j) build against **Scheme 2026**, not the 1952 Scheme saved only to
the cliff (see §06.9); (k) enforce EPFO's packaging rules at export, with the portal
controls surfaced to the operator and never written into the file; and (l) import
EPFO's error file once its schema is captured. The 12% is a notified variable, not a constant — effective-date
it.

#### The ECR return file, field by field (EV-035)

The field order and the delimiter are fixed by EPFO (EV-035); what each field must
contain, and what the validator checks, is specified here. Where each value is read
from in the data model is §14.4.5, and the generator FR is §08 FR-PAY-701. Severity
follows EPFO's own split (EV-040): a check EPFO blocks is a block here, and a check
EPFO flags is a flag. The engine adds no block EPFO does not impose (§08 AC-701.6), so
a check EPFO is not documented to run is an engine-only flag that never refuses the
file — with one exception: a layout defect, which would make the file unreadable, is
a format block (SA-FMT).

| # | Field | Content rule | Check | Severity | Open point |
| --- | --- | --- | --- | --- | --- |
| 1 | UAN | The member's Universal Account Number | Digits only, length pinned to the Help File samples, which carry twelve digits (`ecr.uan_pattern`); seeding and KYC state filable (§06.2) | An unseeded UAN is exclude-and-flag, never a payroll block (Part E-11) | — |
| 2 | Member Name as per UAN | The name held against the UAN — a stored value distinct from the display name (§07 FR-CHR-009a) | Present; contains no `#~#` sequence and no line break | A delimiter or line break inside a name is a format block (SA-FMT). A mismatch with the display name is normal and is never "fixed" by overwriting either value | Case and character rules are unpublished; the value is written as stored |
| 3 | Gross Wages | Mandatory — the Help File notes "Gross wages are mandatory" (r5/02 finding 3) | Present and non-negative; engine check that it is not below field 4 | Missing → block. Below field 4 → engine-only flag | EPFO's definition of "gross" for this field is not captured. The engine writes the payment-of-wages base (§14.4.5) under `ecr.gross_wages_basis` until a portal-accepted file confirms it |
| 4 | EPF Wages | The PF wage base after the s.2(88) add-back (§06.10), prorated for NCP days: the lower of that base and ₹15,000 under the ceiling election, the full base under the actual-wage election | Field 7 is not below the contribution rate × field 4 | Below the statutory rate → block (EV-040) | International Workers: uncapped as carried, **[Hypothesis]** (§06.2) |
| 5 | EPS Wages | For an EPS member, the lower of field 4 and ₹15,000; actual wages only for a member whose higher-pension approval is recorded (§06.2) | Not above ₹15,000 without a recorded approval | Above the ceiling without approval → engine-only flag, raised for the approver before payment initiation | The field's content for a non-EPS member — a post-2014 high earner, or a member past 58 not marked for deferred pension — is not stated in the captured EPFO material; §14.4.5 maps zero. Held as `ecr.eps_wages_non_member` and confirmed against a portal-accepted file (§20) |
| 6 | EDLI Wages | The lower of field 4 and ₹15,000, the EDLI maximum wage (§06.2) | Not above ₹15,000; populated even for an exempted establishment (r5/02 finding 12) | Missing for an exempted establishment → block | — |
| 7 | Employee PF Contribution | The contribution rate × field 4, where the rate is the portal's Contribution Rate control — 12% or 10% (EV-035) — or a higher VPF rate (§06.2) | At least the rate × field 4 | Below → block (EV-040) | Which field carries VPF is not stated in the captured material. The design assumption is field 7, **[Hypothesis]**, held as `ecr.vpf_field` and confirmed (§20). Rounding: `epf.rounding_method` (§08 FR-PAY-209) |
| 8 | Employer EPS Contribution | 8.33% × field 5, capped at ₹1,250 unless higher pension is approved; zero for a non-EPS member | Zero for a member who has attained 58 and is not marked for deferred pension; zero for a post-01.09.2014 high earner | Age 58 → block, EPFO's only hard EPS block. Post-2014 → flag (EV-040) | The EPS share under the 10% reduced rate is not captured: `eps.share_under_reduced_rate` (§20) |
| 9 | Employer PF Contribution | The employer's rate × field 4, less field 8 — "the difference" in the Help File arithmetic, 1,800 − 1,250 = 550 (EV-035) | Field 8 + field 9 is not below the statutory employer rate × field 4 | Below → block | — |
| 10 | NCP Days | Non-contributory days in the wage month, from the attendance snapshot (§09 FR-FIL-001) | A whole number from 0 to the days in the wage month; a member whose NCP days equal the month's days has field 4 at zero and still gets a line (§09 FR-FIL-002) | Out of range → engine-only flag; the source is corrected through the attendance snapshot, never in the file | The NCP inclusion list is EPFO-defined and not captured (§09 FR-FIL-001 AC1, **[Hypothesis]**) |
| 11 | Refund of Advance | The amount refunded in the month against a PF advance, from the refund ledger (§08) | Non-negative | — | — |

Rules that apply to the whole line and file (EV-035; r5/02 findings 3–5):

- exactly eleven values and ten three-character `#~#` delimiters on every line, no
  header row, one line per member, each member once per return;
- amounts written as the Help File samples write them — whole rupees, no separators —
  under `epf.rounding_method`; whether the portal accepts decimals is not captured;
- contributions only between the member's valid date of joining and date of leaving
  (EV-040);
- the file's character encoding and line terminator are not stated in any captured
  EPFO document — the Form 138 workbook, by contrast, mandates CRLF (EV-051). They
  are `ecr.encoding` and `ecr.line_terminator`, pinned from a portal-accepted upload
  before general availability (§20), and never borrowed from the Form 138 rule.

#### Worked return lines — six members, one establishment, one wage month

Inputs are illustrative; every rate and cap is the verified one from this section.
UANs and names are placeholders except in the EPFO fixture. Proration for M5 uses the
calendar-day convention (§08 FR-PAY-104) in a 30-day month.

| Member | Situation | Return line |
| --- | --- | --- |
| M1 | EPFO Help File fixture: PF wages ₹15,000 | `100257274743#~#NITESH#~#15000#~#15000#~#15000#~#15000#~#1800#~#1250#~#550#~#0#~#0` |
| M2 | The §06.10 add-back employee: gross ₹1,00,000, PF base ₹50,000 after the add-back, employer on the ceiling | `<UAN>#~#<NAME>#~#100000#~#15000#~#15000#~#15000#~#1800#~#1250#~#550#~#0#~#0` |
| M3 | EPS member; gross ₹30,000, all of it PF wages; employer on actual wages (§08 AC-202.2) | `<UAN>#~#<NAME>#~#30000#~#30000#~#15000#~#15000#~#3600#~#1250#~#2350#~#0#~#0` |
| M4 | First joined after 01.09.2014 above ₹15,000; gross and PF wages ₹25,000; actual wages | `<UAN>#~#<NAME>#~#25000#~#25000#~#<EPS>#~#15000#~#3000#~#0#~#3000#~#0#~#0` |
| M5 | PF wages ₹15,000 for a full month; 10 NCP days of 30 | `<UAN>#~#<NAME>#~#10000#~#10000#~#10000#~#10000#~#1200#~#833#~#367#~#10#~#0` |
| M6 | Attained 58, not marked for deferred pension; PF wages ₹15,000 | `<UAN>#~#<NAME>#~#15000#~#15000#~#<EPS>#~#15000#~#1800#~#0#~#1800#~#0#~#0` |

`<EPS>` is `ecr.eps_wages_non_member` (field 5 above). Member by member:

- **M2.** The add-back lifts the PF base to ₹50,000, but the ceiling election writes
  ₹15,000 into field 4; the ₹50,000 survives only in the gratuity base (§06.10). A
  generator that wrote ₹50,000 into field 4 beside ₹1,800 in field 7 would file a
  3.6% contribution rate, which the portal refuses as below statutory (EV-040).
- **M3.** 12% × ₹30,000 = ₹3,600 from the employee. The employer's ₹3,600 splits into
  EPS 8.33% × ₹15,000 = ₹1,250 and EPF ₹3,600 − ₹1,250 = ₹2,350 — TV1's actual-wage
  twin.
- **M4.** EPS is zero, so the employer's ₹3,000 (12% × ₹25,000) goes wholly to field 9.
  EPFO would only flag a non-zero EPS here (EV-040); the zero is the engine's job
  (TV2).
- **M5.** ₹15,000 × 20/30 = ₹10,000. 12% of it is ₹1,200; 8.33% is ₹833; ₹1,200 − ₹833 =
  ₹367. The ₹1,250 cap does not bite below the ceiling.
- **M6.** The portal disallows EPS (EV-040), so the whole ₹1,800 employer share is EPF.

Totals for M1–M5 (M6 left out to keep the arithmetic visible):

| Head | M1 | M2 | M3 | M4 | M5 | Total |
| --- | --- | --- | --- | --- | --- | --- |
| Employee PF (field 7) | 1,800 | 1,800 | 3,600 | 3,000 | 1,200 | **11,400** |
| Employer EPS (field 8) | 1,250 | 1,250 | 1,250 | 0 | 833 | **4,583** |
| Employer PF (field 9) | 550 | 550 | 2,350 | 3,000 | 367 | **6,817** |
| EDLI wages (field 6) | 15,000 | 15,000 | 15,000 | 15,000 | 10,000 | **70,000** |

The employer's two fields sum to ₹11,400, equal to the employee total, as they must
when every member is at 12% with no VPF; contributions total ₹22,800. EDLI at 0.50% of
₹70,000 is ₹350. The admin charge is left out: its 0.50% rate is **[Hypothesis]**
(§06.2), and its wage basis is itself unsettled — ₹475 on the ₹95,000 of field-4
wages, or ₹350 on ceiling-limited wages, which is the reading EPFO's FAQ Q18 gives for
employee-only VPF (r5/02 finding 14). The basis is `epf.admin_charge.wage_basis`
(§20). The portal's Due Deposit Balance Summary is the authority; the engine's total
is a forecast that must reconcile to it (SA-REC, §08 FR-PAY-713).

**The part-payment contribution file (EV-044).** Six `#~#`-separated fields — UAN,
MEMBER_NAME, EPF_CONTRIBUTION, EPS_CONTRIBUTION, EPF_EPS_DIFF_CONTRIBUTION,
REFUND_OF_ADVANCES — uploaded on its own screen, whose only controls are Wage Month,
Contribution File and Remark (r5/02 finding 6). The circular describes it as a way to
upload "specific amounts" (para 6(ii)). EPFO's two samples bound the build:

- `123467198645#~#ROHIT VARMA#~#1800#~#1250#~#550#~#0` repeats the return file's
  fixture values, consistent with EPF_CONTRIBUTION, EPS_CONTRIBUTION and
  EPF_EPS_DIFF_CONTRIBUTION carrying return fields 7, 8 and 9;
- `123467198618#~#VIRAT SHARMA#~#300#~#100#~#50#~#0` carries amounts that follow no
  12% split, so the file states what is being paid, not a recomputation.

The column-to-field correspondence is an inference from the column names and one
sample. It is confirmed against a portal-accepted part-payment upload before the
generator ships (`ecr.part_payment_mapping`, §20). Both samples are fixtures (TV33).

#### The ECR lifecycle as EPFO runs it (EV-036–EV-038)

This is the canonical statement of the portal's own lifecycle. §08 FR-PAY-711 is the
product's filing-instance machine; the last column maps each portal stage onto it.

<!-- DIAGRAM: statutory-spine-ecr-portal-lifecycle -->

| Stage | What EPFO's system does | What the employer can do | Reversible? | Evidence the product captures | FR-PAY-711 state |
| --- | --- | --- | --- | --- | --- |
| P1 Upload | Accepts one `.txt`, or a zip holding exactly one, with five mandatory controls: Wage Month, Return File, Return Type, Contribution Rate, Remark (r5/02 finding 4) | Choose the return type within the EV-037 guards | Yes — nothing exists yet | File hash, the five control values as entered, the operator and the credentials used (§22) | SUBMITTED |
| P2 Validate | Runs its validations; on failure returns a downloadable error file whose schema is undocumented (r5/02) | Download the error file | — | The error file, mapped to employee records once its schema is captured (§06.13) | REJECTED on failure (F7) |
| P3 Return statement | Generates the return statement from the validated file | Review it | — | The statement, reconciled line by line to the file and the locked snapshot | SUBMITTED |
| P4 Approve or reject | Records the employer's decision. **An approved return can never be cancelled** (EV-036) | Approve; or reject and upload again | Before approval only | Approver and timestamp; the reason for any rejection | ACCEPTED on approval (F9); a rejection is REJECTED with the reconciling item named (SA-REC) |
| P5 Due Deposit Balance Summary | Computes the dues, including the mandatory interest (EV-039) | Review the dues | — | The summary, reconciled to the engine's forecast | ACCEPTED |
| P6 Challan with TRRN | Prepares a challan; several may follow one return (EV-036) | Generate a challan | Treated as the start of the payment process | TRRN and amount | PAYMENT_INITIATED (F14) |
| P7 Pay | Receives payment | Pay | No | Bank reference | PAYMENT_INITIATED |
| P8 Receipt | Issues the receipt | Download it | No | The receipt | FILED (F15) |

Two readings are fixed deliberately. The circular bars a Revised return once "a
payment process" has been initialised for the wage month (para 5(iii)); the product
treats challan generation (P6) as that point — the earlier and safer reading — and
confirms it on a live portal (§20). And EPFO's FAQ Q5(b) hedges upward revision after
payment to "in many cases"; the product never relies on it (§08 AC-708.2).

#### Which return EPFO will take — decision table (EV-037, EV-041–EV-043)

The table specifies; the diagram shows the order in which the product asks. The return
routes in rows 1 and 3–6 all assume no other return is in process for the month.
EV-037 states that guard for Revised only, and the table gives no route for a
Supplementary while another return is in process, so the product applies the guard to
every new monthly return — the safer reading — until a live portal session shows
otherwise (§20).

<!-- DIAGRAM: statutory-spine-ecr-return-routes -->

| # | Approved Regular for the month? | Another return in process? | Payment initiated? | What changed | Route | Refused, and why |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | No | No | — | First filing for the month | **Regular** | Supplementary and Revised both need an approved Regular |
| 2 | No | Yes | — | Anything | **None** — complete or reject the return in process | A second return while one is in process |
| 3 | Yes | No | Either | Members absent from every prior return for the month are added | **Supplementary**, repeatable | — |
| 4 | Yes | No | No | Figures for members already returned, up or down | **Revised** — overwrites the portal's data; our ledger keeps the diff (R14) | — |
| 5 | Yes | No | Yes | Figures reduced for members already returned | **None through the ECR** — downward revision is barred after payment initiation | Revised. The diff is recorded and the case goes to the §22 runbook; no portal route is captured |
| 6 | Yes | No | Yes | Figures increased for members already returned | **[Hypothesis]** Revised, per circular para 5(ii) — contradicted by para 5(iii) and hedged by FAQ Q5(b) | Not offered until validated on a live portal (§20; §08 AC-708.2) |
| 7 | — | — | — | True arrears, such as a pay revision paid later | **File Arrear Return**, fenced; the due month is set by the disbursal date (EV-043; FAQ Q15) | Adding arrears to the monthly file |
| 8 | — | — | — | Belated payment of the month's own salary | FAQ Q15 distinguishes it from true arrears; every off-cycle payment is classified as one or the other with a recorded basis | The route for belated salary is confirmed against the FAQ text before use (§20) |
| 9 | — | — | — | No active members in the month | **No file** — Direct Challan Entry for admin and inspection charges (EV-042) | Any return file |
| 10 | — | — | — | A member's exit date was recorded in error | **Joint declaration** first (EV-041), then the route rows 1–4 give for the later months | Any contribution for a period after the recorded exit date |

Row 3 is the workhorse. It is the route for every member the exclude-and-flag default
left out of a Regular return (§06.2): once the UAN is seeded, a Supplementary carries
the member, built from the same locked snapshot (§14.4.5).

#### Chronology — the M−4 rule, worked (EV-038)

The revamped ECR mandates month-wise chronological filing. After an initial
four-month relaxation, a Regular return for month M is allowed only if returns for
**all active members of month M−4** have been filed; the relaxation for marking dates
of exit also ran for four months only (FAQ Q24; r5/02 finding 10). Both were initial
relaxations, running from the revamped system's launch for wage month September 2025
(r5/02 findings 10, 15), so neither covers any month the product files today.

| Wage month M | Regular return due | Needs every active member of | If one is missing |
| --- | --- | --- | --- |
| August 2026 | 15 September 2026 | April 2026 | August's Regular is refused until an April Supplementary carries the member |
| September 2026 | 15 October 2026 | May 2026 | As above, for May |
| October 2026 | 15 November 2026 | June 2026 | As above, for June |
| November 2026 | 15 December 2026 | July 2026 | As above, for July |
| December 2026 | 15 January 2027 | August 2026 | As above, for August |

**The exclude-and-flag default carries a clock.** A member left out of April 2026's
Regular return for an unseeded UAN is still an active member of April with no return.
August 2026's Regular return cannot then be filed until the member is seeded and an
April Supplementary is filed (decision-table row 3). So for every excluded member the
product computes an **M+4 deadline** — the due date of the Regular return four months
on, 15 September 2026 in this case — and escalates the seeding task against it from
the day of exclusion. The same clock runs for a leaver whose date of exit is never
marked: an unmarked leaver stays active and blocks month M+4. Marking an exit needs
no member-detail or Aadhaar update (EV-041), so the product marks exits in the cycle
they happen.

That an excluded, unseeded member counts as "active" for the M−4 test is an inference
from the rule's wording, not a statement in EPFO's material, and it is confirmed on a
live portal (§20). The product assumes it until then, because the opposite
assumption fails silently four months later.

#### ECR edge cases the generator must get right

| Case | What the rules say | What the line or the flow does | Basis |
| --- | --- | --- | --- |
| Joins on the 11th of a 30-day month at a ₹15,000 PF wage | Contributions only from the valid date of joining (EV-040) | Fields 3–9 on the ₹10,000 earned from the 11th — the same figures as M5. Whether the ten days before joining are NCP days sits inside the uncaptured NCP list | EV-040; §09 FR-FIL-001 |
| Leaves on the 10th | Contributions only up to the date of leaving | A line for wages to the 10th; the exit marked in the same cycle, with no Aadhaar or member-detail update needed | EV-040, EV-041 |
| Turns 58 during the month, not marked for deferred pension | EPS is disallowed once 58 is attained (EV-040) | Whether EPS runs for the days before the birthday is not captured: `eps.age58_part_month` (§20). Until it is set, the birthday month raises a configuration task; EPS never runs on days after the birthday | EV-040 |
| Exempted establishment | EPF wages, PF contribution, EPS wages, EPS contribution and EDLI wages still populated; the challan carries inspection charges only | Full lines. On ₹2,00,000 of wages the forecast shows EPF inspection charges at the ₹8,750 minimum (0.35% would be ₹700) and EDLI at the ₹1,250 minimum (0.005% would be ₹10) | r5/02 finding 12; S.O. 2701(E) |
| Establishment on the 10% rate | The Contribution Rate control is 10% (EV-035) | Field 7 at 10% × field 4; the EPS split waits on `eps.share_under_reduced_rate` | S.O. 3582(E) exclusions |
| International Worker | Full wages as carried, subject to para 83's contested status | Field 4 uncapped only once the IW kill criterion above is met | §06.2 **[Hypothesis]** |
| Member contributing VPF | An employee rate above statutory; admin charges follow wages, not contributions | Field 7 carries the higher amount under `ecr.vpf_field`; fields 8 and 9 unchanged | FAQ Q17–Q18 |
| The last active member left in March; nobody in April | A NIL month uses no file; admin and inspection charges go through Direct Challan Entry (EV-042) | No April file; the ledger records NIL with the receipt. August's M−4 test for April then has no active member to satisfy — a reading confirmed with the M−4 inference (§06.13) | EV-042, EV-038 |
| The mandatory Remark control | Free text, required at upload (r5/02 finding 4) | The product proposes the wage month, return type and ledger reference; the operator may edit it; the value entered is captured (§22) | r5/02 |

**Generation order.** EPFO mandates no line order. The generator sorts member lines
by UAN, ascending, so that re-running an unchanged period reproduces the file byte
for byte (§08 AC-209.1). The steps run in a fixed sequence: load the LOCKED snapshot;
select members employed at any point in the wage month; apply exclude-and-flag and
record each exclusion's M+4 deadline; compute fields 1–11 under the rule versions
bound to the snapshot; run the field checks at their severities; write the lines;
package under EPFO's rules (R22); and produce the operator sheet listing the five
portal control values. A failure at any step writes nothing; there is no partial
file.

**The operator sheet.** The five mandatory upload controls (r5/02 finding 4) are
values the operator types into the portal, never file content (EV-035). The sheet
gives each one, with where it came from, and the attended session records what was
actually entered (§22):

| Portal control | Value on the sheet | Where it comes from |
| --- | --- | --- |
| Wage Month | The ledger month the file was built for | The LOCKED snapshot |
| Return File | The packaged file's name and hash | Packaging (R22) |
| Return Type | Regular, Supplementary or Revised | The decision table above, with its guard results |
| Contribution Rate | 12% or 10% | The establishment's class row under S.O. 3582(E) |
| Remark | The proposed remark (edge-case table) | The ledger reference; editable by the operator |

A difference between the sheet and what the session recorded is an SA-SEQ or SA-REC
item before approval, because an approved return cannot be cancelled (EV-036).

#### Interest, damages and the payment step (EV-039)

Interest on late payment is simple interest at 12% a year from the due date to the
date of payment (S.O. 2698(E); penalties table above). The portal auto-calculates it
and it must be paid with the contribution (EV-039), so the engine's figure is a
forecast, shown at the verification gate and in the cash-flow view; the portal's
figure governs.

Worked forecast: the M1–M5 dues above — ₹22,800 of contributions plus ₹350 of EDLI,
₹23,150 — for wage month September 2026 fall due on 15 October 2026. Paid on 25
October 2026, ten days late: ₹23,150 × 12% × 10 ÷ 365 = **₹76.11**. Three inputs to
that forecast are not captured and are parameters, not assumptions: the day-count
convention and whether the due day itself counts (`epf.interest_day_count`); whether
the admin charge is part of the base (`epf.interest_base`); and the rounding
(`epf.rounding_method`). A forecast that differs from the portal's summary is a
reconciling item, never an overwrite of the portal's figure (TV36).

**What an exclusion costs while it waits.** A member left out of April 2026's Regular
return under exclude-and-flag still owed an April contribution due on 15 May 2026,
whichever return eventually carries it, so the forecast runs interest from that date.
For a member at the EPFO fixture — ₹1,800 employee, ₹1,250 EPS and ₹550 EPF, ₹3,600
in all — carried by an April Supplementary paid on 25 August 2026, 102 days late on an
exclusive count: ₹3,600 × 12% × 102 ÷ 365 = **₹120.72**, rising by ₹1.18 for each
further day. The seeding task shows this figure from the day of exclusion and updates
it daily, beside the M+4 deadline, on the same three unset parameters as the forecast
above. Whether the employee share was deducted from pay while the line was excluded is
a counsel item (CR-30), not a forecast input; the portal's figure governs (TV73).

Damages may be deposited forthwith or later, at the employer's option (EV-039). The
product carries them as an open liability from the day the portal shows them until
they are paid, with the scale `epf.damages_scale` unset (penalties table above).
VISHWAS 2026 settles damages for defaults before 14 June 2024 within six months of
its 29 June 2026 notification (r2, medium); on that arithmetic the window runs to
about 29 December 2026, and a migrating tenant with pre-June-2024 defaults sees it on
the calendar marked "computed, not captured".

---

### 06.3 ESI — Employees' State Insurance

**What it is.** A contributory health-insurance and cash-benefit scheme
(medical, sickness, maternity, disablement, dependants' benefit) administered by
ESIC, funded by employer + employee contributions on gross wages.

**Statutory basis.** The ESI Act 1948 is repealed by CoSS s.164(1). ESI rules,
regulations and schemes, the ESI (Central) Rules 1950 among them, are saved only
until the cliff (§06.9); v0.3's statement that the Social Security (Central) Rules
2026 already supersede the 1950 Rules is carried, not re-captured. ESIC's own
wage and coverage guidance is still written against the 1948 Act. The values below
are verified against ESIC's live coverage, contribution and wages pages (r1). Of the
legacy citations attached to them, only s.1(3) and s.2(22) appear in ESIC's pages as
captured. r.31A, r.31C, r.50, r.52 and s.85 are carried, not re-captured. The SS
(Central) Rules 2026 equivalents are unmapped (§06.13). ESIC's coverage page was
last reviewed on 4 April 2025, and its statistics are as on 31 March 2023 (r1). The
regulator's own material is stale, so every value here is re-checked on the watch
cadence (§22).

**Who it binds.** Every establishment in which **10 or more persons** are employed,
other than a seasonal factory; the Chapter also applies to an establishment in a
notified hazardous or life-threatening occupation that employs even a single
employee (CoSS First Schedule, Ch. IV; EV-057). Contributions become payable per
establishment from the date the Central Government notifies. The line is not
uniformly 10. ESIC applies 10 persons to non-seasonal factories and state-extended
classes, and 20 persons to Central-sphere extended classes such as insurance
business, NBFCs, port trusts, airport authorities and warehousing (ESIC coverage
page, r1; §06.1). It covers employees
earning **up to ₹21,000/month gross**
(₹25,000 for employees with disability). The ₹21,000 is a **coverage ceiling on
gross wages**, distinct from EPF's ₹15,000 ceiling — the two bases diverge on the
same payslip. Note ESI is **area-notified**: an establishment in a district ESIC
has not notified is not covered even at 10+ heads, so the engine's coverage test is
(headcount × area-notification × wage), not headcount alone. ESIC's page reports
668 districts notified in 36 States and UTs (565 fully, 103 partially, the latter
covering headquarters areas and industrial centres only), with 135 not yet notified.
That is an April 2025 snapshot at best, so the district list is ingested data keyed
to the work location, never a constant (r1). (Source: CoSS First Schedule; ESIC
coverage page and district annex; legacy ESI Act s.1(3) as ESIC cites it)
**[Verified]**

**Thresholds and rates.**

| Item | Value | Note | Source cue |
| --- | --- | --- | --- |
| Wage coverage ceiling | **₹21,000/month** gross (₹25,000 for PwD), effective 01.01.2017 | Employee exits ESI when gross crosses ₹21,000 — but only at a contribution-period boundary. MoLE's March 2026 FAQ framed ₹21,000 as applying "until the finalization of Rules", and the Rules are now final, so the value is watched (r2) | ESIC coverage page; CoSS s.2(89) wage-ceiling hook (r1) **[Verified]** |
| Employee contribution | **0.75%** of gross wages | Per-employee rounding rule is parameter `esi.rounding_rule`; v0.3's "round up to the next rupee" is carried, not re-captured **[Hypothesis]** | ESIC contribution page, rate w.e.f. 01.07.2019 **[Verified]** |
| Employer contribution | **3.25%** of gross wages | Combined **4.00%** | ESIC contribution page, w.e.f. 01.07.2019 **[Verified]** |
| Low-wage employee exemption | Employees with **average daily wage up to ₹176** are exempt from the *employee* 0.75% share | Employer still pays its 3.25% share for such employees | ESIC contribution page (r1) **[Verified]** |

**What "wages" means for ESI — wider than PF, with its own edge cases.** The ESI
base is **gross**: basic + DA + HRA + conveyance + overtime + city-compensatory +
incentives *paid at intervals not exceeding two months*. Excluded: annual bonus,
gratuity, retrenchment compensation, encashment of leave on discharge, and any
payment made at intervals **exceeding two months** (e.g., a quarterly incentive).
Overtime is included **for contribution** but excluded **for the coverage test** —
so overtime cannot push a ₹20,000 base employee out of coverage, yet ESI is still
charged on the overtime once covered. What is verified (ESIC wages page, r1) is
this. ESIC applies an item-by-item, case-law-driven treatment under legacy s.2(22):
subsistence allowance is wages, and washing allowance is not. ESIC also keeps
**different bases for coverage and for contribution**. **[Verified]** The component
list above and the specific overtime split are carried, not re-captured
**[Hypothesis]**. Both are re-captured from ESIC's wages page before TV5 is
baselined (§06.13). This item-by-item,
case-law-driven wage definition does not match the Codes' s.2(88) definition, and it
survives only as saved subordinate law until the cliff (§06.9). This dual treatment
of overtime is a named test vector (§06.14).

**The contribution-period rule is the ESI trap.** ESI runs two fixed
**contribution periods** — **April–September** and **October–March** — with
corresponding benefit periods. An employee whose wage crosses ₹21,000 mid-period
**continues to contribute until the end of that contribution period**; they do
not exit ESI mid-period. A payroll engine that drops the employee the month their
wage crosses the ceiling files a wrong return. The exit is period-boundary-aligned,
not month-aligned. **[Verified]** (ESIC's published contribution-period table, r1)

Worked example: an employee at ₹20,000 gross gets a raise to ₹23,000 effective
**1 July**. Because July falls inside the April–September contribution period, ESI
(both shares) continues on the **full ₹23,000** — not ₹21,000 — through September,
and the employee exits ESI only from **1 October**. Contribution is on actual gross,
uncapped, once the employee is in the period; the ₹21,000 is a coverage gate, not a
contribution cap. **[Verified]**

<!-- DIAGRAM: esi-contribution-period-state-machine -->

**Contribution period maps to a lagged benefit period — and coverage does not end at
the last working day.** Each contribution period feeds a fixed **benefit period**
after a gap: contributions in **April–September** entitle the IP to benefits in the
following **January–June**, and **October–March** contributions feed the following
**July–December**. This lag is why the period-boundary exit rule matters — dropping a
member a month early can cost them a benefit period they had already funded. Two
further edge cases the coverage engine must hold: (a) an IP who leaves employment
mid-period generally **retains medical benefit** for themselves and family to the end
of the period (and, on satisfying the contributory condition, into the linked benefit
period); and (b) on cessation of insurable employment an IP and spouse can continue
**medical benefit for a further period on payment** of a nominal contribution
(superannuation/retirement continuation). These are not payroll-line items but they
depend on an accurate contribution ledger, so the same data the ECR-equivalent
consumes must persist beyond exit. The contribution-to-benefit period mapping is
**[Verified]** (ESIC contribution page, r1). Edge cases (a) and (b), and their
legacy citations (ss.2(6A), 46 and the continuation rules), are carried, not
re-captured **[Hypothesis]** (§06.13).

**Filing cadence.**

- **Monthly contribution** — uploaded on the ESIC portal from its template (an
  attended upload, §22), with the challan generated there; due within 15 days of
  the last day of the calendar month, i.e. by the **15th**.
- **Return of contributions** — the engine reconciles the two contribution periods
  and produces the half-yearly view. Tally still emits ESI Forms 3, 5 and 6
  (EV-032). v0.3's claim that the half-yearly return is now largely auto-generated
  from monthly filings is carried, not re-captured.
- **Registers under the ESI (General) Regulations 1950** (text verified, r5; saved
  only to the cliff under this PRD's reading, §06.9). The **Register of Employees
  in Form 6** (reg 32(1)). An **immediate employer** — a contractor — keeps a
  Form 6 register for every employee it engages and submits it to the principal
  employer before settlement (reg 32(1A)), the regulation-level twin of CoSS
  s.31(7). The **Accident Book in Form 11** (reg 66(ii)). The principal
  employer's **inspection book** (reg 102). Retention periods for these are not
  stated here: any period other than EV-054's is a counsel item (Part D-11, §23).
- **Accident reporting** — the accident-report form and its time limit are carried,
  not re-captured (§06.13). The event-capture path must exist regardless.
- **Enrolment** — new employees get an **IP (Insured Person) number**, and
  enrolment precedes the first contribution. v0.3's further detail — the e-Pehchan
  card, the Temporary Identity Certificate issued pending it, and the claim that the
  challan rejects an unenrolled member — is carried, not re-captured (§06.13). On
  ESIC's portal the employer can seed Aadhaar at registration, and ESIC itself
  runs the authentication (r4). Whether the employer is a "requesting entity" in
  doing so is a counsel question (Part D-7, §23), and Aadhaar stays optional here
  as everywhere (§07).

**Penalties.** Simple interest at **12% p.a.** on any amount due under the Code, from
the due date to payment (S.O. 2698(E), §06.2) **[Verified — mirror]**; pull from the
primary source before customer use. Legacy damages were
graded by delay. The scale is parameter `esi.damages_scale`, with no shipped
default: v0.3's percentages and their legacy rule references are carried, not
re-captured, and the Code-era scale is **[Hypothesis]** (§06.13). v0.3 also said
non-payment was recoverable as arrears of land revenue, with prosecution exposure
under legacy s.85. That is carried, not re-captured, and the Code-era provisions
are unmapped. The CoSS s.125 dues-assessment window (§06.2) applies to ESI dues
as well (r5).

**Data required.** Gross wages (ESI base = gross, which *includes* HRA,
conveyance, overtime — the opposite of the PF/gratuity base, see §06.10), IP number
and its enrolment status, average daily wage (for the ₹176 employee-exemption),
contribution-period membership state, dispensary/branch office, PwD flag (₹25,000
ceiling), and the ₹21,000 coverage flag evaluated at period boundaries.

**Product implication.** The ESI contribution upload is a v1 artefact (§01). The engine needs a
distinct **gross-wage base** concurrent with the PF base, a **contribution-period
state machine** that holds an employee in ESI to the period boundary after they
cross the ceiling, the **₹176 average-daily-wage employee-exemption branch**, the
overtime "include-for-contribution / exclude-for-coverage" split, and rupee-rounding
per employee. **The ESI regime's fate once the saving lapses, on or about 21 November
2026, is unresolved** (§06.9; EV-004, Ungraded) —
this is a payroll-correctness blocker, not a nicety, and is on the validation gate
(§20.6).

#### ESI coverage, as two decisions

**Establishment level.** Evaluated daily per establishment and work location. Rows
are read top-down; the first match decides. The diagram asks the same questions in the
order line, count, area. For the two combinations the table leaves open — a POSSIBLE
count at a location that is not notified, or whose status is unknown — it shows the
product's reading: not covered in the first case, and POSSIBLE with an area-record task
in the second.

<!-- DIAGRAM: statutory-spine-esi-coverage-decision -->

| # | Seasonal factory? | Notified hazardous occupation? | Establishment class | Persons, two-bound (§06.1) | Area status of the work location | Result |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Yes | — | — | — | — | Not covered — the Chapter excludes a seasonal factory |
| 2 | No | Yes | Any | 1 or more | Notified | Covered |
| 3 | No | No | Non-seasonal factory or a state-extended class | 10 or more on the lower bound | Notified | Covered |
| 4 | No | No | Central-sphere extended class — insurance business, NBFC, port trust, airport authority, warehousing | 20 or more on the lower bound | Notified | Covered (TV23) |
| 5 | No | No | Any | Below the line on the lower bound, at or above it on the upper | Notified | POSSIBLE (§06.1) |
| 6 | No | Any | Any | At or above the line | Partially notified district, location outside its notified headquarters area or industrial centre | Not covered |
| 7 | No | Any | Any | At or above the line | District not notified | Not covered |
| 8 | No | Any | Any | At or above the line | Status of the location unknown | POSSIBLE, with an area-record task |

A covered establishment's contributions start from the date the Central Government
notifies for it (CoSS First Schedule proviso, r1/06 finding 25). The product takes that
date from the establishment's ESIC registration record (`esi.contribution_start_date`)
and never defaults it to the trigger date. The district list is ingested data keyed to
the work location and re-checked on the watch cadence, because ESIC's own page is an
April 2025 snapshot at best (above).

**Employee level.** Evaluated at entry, every month, and at each contribution-period
boundary.

| # | Coverage wage (gross; overtime excluded per the carried rule) | When | PwD? | Result |
| --- | --- | --- | --- | --- |
| 1 | At or below ₹21,000 | At entry | No | Enrol; contribute on full gross |
| 2 | At or below ₹25,000 | At entry | Yes | Enrol; contribute on full gross |
| 3 | Above the applicable ceiling | At entry | — | Not an Insured Person; no contribution |
| 4 | Crosses the ceiling | Inside April–September or October–March | — | Stays covered to the period end on full gross; exits from 1 October or 1 April (TV3) |
| 5 | Above the ceiling | At a period start | — | The exit takes effect |
| 6 | Back at or below the ceiling after an exit | Any month | — | Re-enrolment timing is not captured: `esi.reentry_timing` (§20) |
| 7 | Average daily wage at or below ₹176 | Each month | — | Employee share waived; the employer's 3.25% is still due (TV4) |

"Average daily wage" is ESIC's term (r1), but the divisor that turns a month's wage
into it is not captured, and it decides the waiver near the line. A month's gross of
₹4,800 is ₹160 a day over 30 calendar days (waived), ₹184.62 over 26 days (not
waived) and ₹240 over 20 days actually worked (not waived). The divisor is
`esi.average_daily_wage_basis`, with no shipped default; until it is set, an employee
within reach of the line raises a configuration task and neither share is silently
waived (TV38).

#### ESI contributions, worked — and why rounding is a parameter

Three employees in one covered establishment, wage month July:

| Employee | Gross | Employee 0.75% | Employer 3.25% | Total |
| --- | --- | --- | --- | --- |
| E1 | ₹18,000 | ₹135.00 | ₹585.00 | ₹720.00 |
| E2 | ₹20,000 | ₹150.00 | ₹650.00 | ₹800.00 |
| E3 — raised from ₹20,000 to ₹23,000 on 1 July (TV3) | ₹23,000 | ₹172.50 | ₹747.50 | ₹920.00 |
| **Establishment** | **₹61,000** | **₹457.50** | **₹1,982.50** | **₹2,440.00** |

E3 is inside the April–September period, so contribution runs on the full ₹23,000
until 30 September, and E3 is out of ESI from 1 October. E3's two shares end in fifty
paise. Under v0.3's carried per-employee round-up (**[Hypothesis]**,
`esi.rounding_rule`) E3 pays ₹173 and ₹748 and the establishment total becomes ₹2,441;
a round-to-nearest rule would need its own tie rule for exactly fifty paise. That ₹1 is
what the upload's arithmetic or the challan will catch, which is why the rule is a
published parameter and not a developer's choice (§08 AC-203.2, AC-209.2).

#### The contribution-period machine — transition table

The contribution-period diagram above illustrates; this table specifies (Part E-1).

| # | From → To | Event | Guard | Side effect | Who may trigger |
| --- | --- | --- | --- | --- | --- |
| E1 | NOT_COVERED → COVERED | Enrolment | Establishment covered (decision above); coverage wage at or below the ceiling at entry; IP number issued | Contributions from the enrolment month; the contribution ledger opens | Payroll operator; the IP number comes from the attended ESIC session (§22) |
| E2 | COVERED → COVERED | Month closes | Coverage wage at or below the ceiling | Contribution on full gross; the ₹176 waiver evaluated for the month | System |
| E3 | COVERED → LATCHED_TO_BOUNDARY | Coverage wage crosses the ceiling | Inside a contribution period | Contribution continues on full gross; exit date set to the next period start | System |
| E4 | LATCHED_TO_BOUNDARY → EXITED | Period ends, 30 September or 31 March | — | No contribution from 1 October or 1 April; the ledger persists for the linked benefit period (above) | System |
| E5 | COVERED → EXITED | A period starts with the coverage wage above the ceiling | — | As E4 | System |
| E6 | COVERED or LATCHED_TO_BOUNDARY → EXITED | Employment ends | — | Contribution on the final month's wages; the ledger persists | System |
| E7 | EXITED → COVERED | Coverage wage back at or below the ceiling | `esi.reentry_timing` resolved | Re-enrolment under §07's identifier rules for the IP number | Payroll operator |
| E8 | Any → held | The saving lapses with no successor (§06.9) | A period after the cliff | Filing instances BLOCKED-pending-regime; computation per `esi.post_cliff_mode` | System |

---

### 06.4 Professional Tax — the state patchwork

**What it is.** A tax on professions, trades and employments levied by **states
(and some municipal bodies)** under Article 276 of the Constitution, which caps
the total PT any person pays at **₹2,500 per year**. It is deducted by the employer
from the employee's salary and remitted to the state.

**Who it binds.** Employers in **states that levy PT** — it is not universal.
States with PT include Maharashtra, Karnataka, West Bengal, Tamil Nadu, Andhra
Pradesh, Telangana, Gujarat, Madhya Pradesh, Kerala, Assam, Odisha, Bihar,
Jharkhand, Meghalaya, Sikkim, Tripura, Nagaland, Manipur, Mizoram and Puducherry
(list approximate). States reported as **not** levying PT include Delhi, Haryana,
Uttar Pradesh, Rajasthan, Uttarakhand, Himachal Pradesh, Punjab, Goa, and the union
territories other than Puducherry. **[Hypothesis]** — both lists are aggregator
compilations. r1 counts roughly 19–20 levying States and UTs. Tamil Nadu and Kerala
levy PT through local bodies, not the state tax department (r2). **No negative —
"state X does not levy PT" — has been verified for any jurisdiction (r2)**, so the
product never treats non-levy as fact. Odisha is itself an open item: a reported
April 2026 ordinance repealing its PT with retrospective effect from 1 April 2026 is
unconfirmed. The state's own PT page still presents the Act as live with rates (r1,
low; r2 read the same page as live). **Kill criterion: the levy status of every
state must be verified against the state's own PT Act/notification, not an
aggregator, before it drives a deduction** (see the dataset dependency below; §20
V-09).

**Two registrations, two liabilities — PTEC and PTRC.** A subtlety worth
first-classing: PT has **two** components.

- **PTEC (Professional Tax Enrolment Certificate)** — the *entity's own* PT
  liability (the company/LLP/partnership pays a flat annual PT for itself —
  Odisha and Karnataka publish ₹2,500 a year for GST-registered entities, r2),
  independent of employees.
- **PTRC (Professional Tax Registration Certificate)** — the employer's registration
  to **deduct and remit** PT from employees' salaries.

A single-director private company with no other employees still needs PTEC and pays
the entity PT; a company with staff needs both. The engine must track both numbers
and both liabilities per state. Whole-time directors' remuneration is itself subject
to employee PT. **[Hypothesis]** as a general rule. The two-registration structure
is reported across compilations (r1, axis 6), and only its entity-enrolment half is
corroborated at state primary sources (Odisha, Karnataka, r2). The director point
and the legacy section references v0.3 cited are carried, not re-captured. Per-state
confirmation is part of §20 V-09.

**Thresholds, slabs and cadence — this is genuinely per-state.** PT has no
national slab. Each state sets its own income slabs, amounts, gender variants,
and filing frequency. The Article 276 ₹2,500/year ceiling is the only common
constant.

| State | Illustrative slab | Filing frequency | Source cue |
| --- | --- | --- | --- |
| **Maharashtra** | Monthly salary base, from 1 April 2023. Men: nil up to ₹7,500; ₹175/month from ₹7,500 to ₹10,000; above ₹10,000, ₹2,500 a year paid as ₹200/month with **₹300 in February**. Women: nil up to ₹25,000, then the same ₹2,500 split | Assigned **per registration each financial year** by the department (MAHAGST publishes it annually) — ingest it, never derive it | State primary source **[Verified]** |
| **Karnataka** | Monthly salary base: **₹200/month at ₹25,000 or above, ₹300 in February** — ₹2,500 a year; nil below ₹25,000 | Unverified | Notification DPAL 08 SHASANA 2025 of 15.04.2025, effective 01.04.2025 — effect verified on the state PT portal; instrument text not retrieved **[Verified]** |
| **Odisha** | **Annual** income base: nil below ₹1.6 lakh; ₹125/month from ₹1.6 lakh to ₹3 lakh; above ₹3 lakh, ₹200/month for the first 11 months and ₹300 for "the last month" (February or March — undefined) | Annual, online only | State primary source **[Verified]**; top-up month **[Hypothesis]** |
| **Tamil Nadu** | A **local-body** levy, not a state tax-department levy (Kerala likewise) — slabs set per local body, not captured; parameter `pt.TN.<local_body>.slabs` | Not captured | Levy structure (r2) **[Verified]**; values **[Hypothesis]** |
| **Telangana** | Not captured — parameter `pt.TS.slabs` | Not captured | Only the employer-registration wording has been verified, not the slab (r2) **[Hypothesis]** |
| **West Bengal, Gujarat and every other levying state** | Not captured — parameter `pt.<state>.slabs`. v0.3's slab figures for these states are carried, not re-captured, and are not shipped | Not captured | State Act or notification — to capture (§20 V-09) **[Hypothesis]** |

Three verified states share one structure — an annual ₹2,500 cap reached as
₹200 × 11 + ₹300 — but differ in kind on the slab base: Maharashtra and Karnataka
test monthly salary, Odisha tests annual income. A flat monthly deduction is wrong in
all three. Worked example (Karnataka, employee gross ₹40,000/month): at or above the
₹25,000 threshold, PT = ₹200 for eleven months + **₹300 in February = ₹2,500/year**.
Worked example (Maharashtra, man, ₹12,000/month): ₹200 for eleven months and
**₹300 in February**, totalling exactly ₹2,500 — the Article 276 ceiling. An engine that
applies a flat ₹200 for all twelve months **under-deducts by ₹100** in either state
and the annual reconciliation fails; the February top-up is not a rounding
artefact, it is the state engineering the ₹2,500 cap. **[Verified]**

**Penalties.** State-specific: interest on late payment, and penalties or flat
late fees for late registration or return. The rates are parameters
`pt.<state>.interest_rate` and `pt.<state>.late_fee`, with no shipped default.
v0.3's indicative monthly interest range is carried, not re-captured.
**[Hypothesis]** — verify each state's penalty schedule against its own PT Act.

**Data required.** Employee's **work state** (not residence — PT follows the place
of employment, which matters for remote/multi-state workforces), monthly gross/PT
wage, gender (some states have female-favourable thresholds), and the state's
registration numbers (PTEC for the entity, PTRC for the employee deductions). For a
remote employee, "work state" is a policy decision the engine must capture explicitly
— it is a live ambiguity for distributed teams and cannot be inferred from the
employer's HQ. **[Hypothesis]** — the correct PT situs for a fully-remote employee is
unsettled; **kill criterion: obtain a state-level position (or a conservative
deduct-at-employer-registered-state policy) before filing for remote staff.**

**Product implication.** This is a **maintained-dataset problem**, not a
feature-cleverness problem — and the dataset is itself a differentiator.
**[Reversed]** Earlier drafts held that "Frappe HR ships PT across 15+ states and
LWF across 14, free", and concluded that multi-state PT carried zero differentiation
credit. That is false from source code. Frappe HR v16's entire India payroll is three
files and 549 lines, overriding three functions (HRA exemption and marginal relief);
no Indian state name appears anywhere in the tree; there are no PT slabs and no LWF
(EV-031). TallyPrime has **no state PT slab table** — slabs are hand-entered — and
**no LWF engine**, and a search of five TDL add-on catalogues found no payroll, PT or
LWF add-on (EV-032). **Multi-state PT and LWF are greenfield in both Frappe and Tally.**
§20's validation plan still flags most of the PT dataset as **undone work and a
build dependency**: Maharashtra and Odisha are verified at state primary sources,
Karnataka's effect is verified but its instrument was not retrieved, and every other
state is unverified. Aggregator PT tables are "materially disputed", and at least
one widely-cited 2026 table reproduces a superseded Karnataka structure. The
requirement is therefore twofold: (a) build a
**per-state, effective-dated PT rule table** — levy y/n, slab base (monthly salary or
annual income), slabs, gender variants, PTEC/PTRC registration, per-registration
filing frequency, the February/last-month top-up, effective dates — sourced from each
state's own Act or notification; and (b) treat it as permanent statutory-maintenance
load run by the compliance data pipeline (§22), not a one-time seed.

#### PT computation — the monthly decision, boundaries and moves

§20 V-09 fixes what a state's PT row must hold; this is how the engine applies a row
each month (§08 FR-PAY-204 is the FR). Rows are read top-down.

| # | Condition for the employee-month | Action |
| --- | --- | --- |
| 1 | The work state's levy status is unverified (§06.13) | No deduction; a configuration task; that state's return shows as unconfirmed (R18) |
| 2 | Levied; slab base is monthly salary | Look up the month's PT wage in the band table with its gender variant; in the top-up month, the top-up amount |
| 3 | Levied; slab base is annual income | Look up the annual income on `pt.<state>.income_basis`; deduct the band's monthly figure; in the state's last month, its top-up |
| 4 | The year-to-date PT in this state plus this month's figure would pass ₹2,500 | Deduct only up to ₹2,500 in that state (Article 276; §08 AC-204.3) |
| 5 | The employee's work state changed during the year | Each month's figure from that month's work state; year-to-date kept per state and per person |
| 6 | The person's PT across states in the year would pass ₹2,500 | Flag, do not cap across states. How the ceiling applies to one person in two levying states is not addressed in any round — r1 records it as a per-person annual cap, at medium confidence (r1/06 finding 28). Held as `pt.article276_cap_scope` (§20) |
| 7 | No work situs — fully remote | The tenant's configured fallback, flagged (§08 AC-204.4) |
| 8 | The work state levies PT but the employer holds no PTRC there | The liability is computed and held as `registration_pending`, never a zero line (§14.4.1) |

Which pay the band test reads — the PT wage — is not captured for any state
(`pt.<state>.wage_basis`). The Maharashtra and Karnataka rows test "monthly salary" and
Odisha's "annual income", in their primary sources' words (above).

**Band edges.** Karnataka's band reads "₹25,000 or above", so ₹24,999 is nil and
₹25,000 is ₹200 — no ambiguity. Maharashtra's men's schedule reads nil "up to ₹7,500"
and ₹175 "from ₹7,500 to ₹10,000", so ₹7,500 itself sits inside both phrases; ₹10,000
is ₹175, because the ₹200 band starts "above ₹10,000". The ₹7,500 edge is
`pt.MH.band_boundary_rule`, confirmed against MAHAGST's schedule (TV41).

Worked, one person at a time (salaries are illustrative inputs; slabs as verified
above):

| Case | Months and state | Deductions | Year total |
| --- | --- | --- | --- |
| W1 · Maharashtra, woman, ₹22,000 a month | 12 in MH | Nil — nil up to ₹25,000 for women | ₹0 |
| W2 · Maharashtra, man, ₹9,000 a month | 12 in MH | ₹175 × 12 — the ₹175 band carries no February top-up | ₹2,100 |
| W3 · Karnataka to Maharashtra, man, ₹40,000 a month, moves on 1 October | Apr–Sep KA; Oct–Mar MH | KA ₹200 × 6 = ₹1,200; MH ₹200 × 5 + ₹300 in February = ₹1,300 | ₹2,500 |
| W4 · Maharashtra to Odisha, man, ₹40,000 a month, moves on 1 March | Apr–Feb MH; Mar OD | MH ₹200 × 10 + ₹300 in February = ₹2,300; Odisha in March: see below | ₹2,300 to ₹2,600 |

W3 files two state returns, each reconciling to its own months. W4 is the case that
breaks an engine built one state at a time. Odisha sets its band on annual income and
takes its ₹300 top-up in "the last month", which its page leaves undefined (above).

- If the income basis annualises March's ₹40,000 (₹4,80,000, above ₹3 lakh) and the
  last month is March, Odisha takes ₹300 and the person pays ₹2,600 in the year.
- If the last month is February, March is an ordinary ₹200 month and the year's total
  is ₹2,500.
- If the basis is income earned in Odisha during the year (₹40,000, below ₹1.6 lakh),
  March is nil and the total is ₹2,300.

Three parameters decide it — `pt.OD.income_basis`, `pt.OD.topup_month` and
`pt.article276_cap_scope` — and none has a verified value. The engine computes all
three outcomes, raises a configuration task before the March run (R18), and records
the operator's choice with its basis; the pay run is never held for it (TV43).

---

### 06.5 TDS on salary (s.392, ex-s.192) and the 24Q → Form 138 breaking change

**What it is.** The employer's obligation to deduct income tax at source from
salary under **s.392 of the Income-tax Act 2025** (ex-s.192 of the 1961 Act), deposit
it monthly, file a quarterly statement (**Form 138**, ex-24Q), and issue an annual
certificate (**Form 130**, ex-Form 16) (EV-050). This binds from **employee one** — no
threshold. Both Acts stay operationally live for years: the 1961 Act governs periods
up to FY 2025-26 (corrections included), the 2025 Act governs Tax Year 2026-27 onward.
Section numbers below without a 2025-Act equivalent are 1961-Act provisions whose
successor is unmapped (§06.13).

**Who it binds.** Every employer paying taxable salary, from the first rupee of
tax liability. The employer must compute each employee's projected annual tax
(under the regime the employee elects — the new default regime, 1961-Act s.115BAC,
vs the old regime), spread it across the remaining months, and true-up.

**The two-regime computation.** Since the new regime became the **default** under
s.115BAC, the engine must compute tax under **both regimes per employee**, honour
the employee's election (and its default-if-silent behaviour), and re-project on
every declaration change. The new-regime slabs, the standard deduction (parameter
`tds.standard_deduction.<regime>` — the values used in the worked example below are
carried, not re-captured), the old-regime Chapter VI-A deductions (80C → s.123 at
₹1,50,000; 80D → s.126 at ₹25,000 for self, spouse and children under 60, r3), and
the s.87A rebate all differ. The new regime is the default where the employee states
no preference in writing (r1, medium). The election is an annual, auditable,
per-employee artefact, and its 2025-Act section number is unmapped (§06.13). This is a per-employee, per-period recomputation, and it
interacts with mid-year joiners carrying previous-employer income (Form 122, ex-12B).

Illustrative new-regime slabs (**FY2025-26 / AY2026-27**, as the worked base):

| Slab (annual taxable income) | Rate | Source cue |
| --- | --- | --- |
| Up to ₹4,00,000 | Nil | Income Tax Department portal, AY 2026-27 slab tables (r1) **[Verified]** — the same nil band for every age group in the new regime |
| ₹4,00,001 – ₹8,00,000 | 5% | " |
| ₹8,00,001 – ₹12,00,000 | 10% | " |
| ₹12,00,001 – ₹16,00,000 | 15% | " |
| ₹16,00,001 – ₹20,00,000 | 20% | " |
| ₹20,00,001 – ₹24,00,000 | 25% | " |
| Above ₹24,00,000 | 30% | " |

s.87A rebate makes income up to **₹12,00,000** effectively tax-free in the new
regime for FY2025-26 (rebate up to ₹60,000), with **marginal relief** just above
₹12L so the extra tax cannot exceed the extra income. **[Verified]** These figures
are a **worked base, not a constant** — the current-FY slabs, standard deduction and
rebate ceiling must be effective-dated against the rates in force for the year. **[Hypothesis]**
— for Tax Year 2026-27 (the current running year, the first under the 2025 Act)
**kill criterion: verify slabs, rebate ceiling and standard deduction against the
rates in force for Tax Year 2026-27, and check for any corrigendum, before running
the year's TDS.** That these figures continue unchanged into Tax Year 2026-27 rests
on secondary reporting only (r1).

Worked two-regime example (FY2025-26, salaried, gross ₹15,00,000; declared old-regime
deductions: 80C ₹1,50,000, 80D ₹25,000, HRA exempt ₹1,00,000):

| | New regime | Old regime |
| --- | --- | --- |
| Gross salary | ₹15,00,000 | ₹15,00,000 |
| Standard deduction (carried parameter value, [Hypothesis]) | ₹75,000 | ₹50,000 |
| HRA / Chapter VI-A | — | ₹1,00,000 + ₹1,75,000 |
| Taxable income | ₹14,25,000 | ₹11,75,000 |
| Tax before cess | ₹93,750 | ₹1,65,000 (old slabs) |
| Cess 4% | ₹3,750 | ₹6,600 |
| **Annual tax** | **₹97,500** | **₹1,71,600** |

The standard-deduction line uses v0.3's carried values ([Hypothesis], parameterised
above). The slabs, the 80C and 80D limits and the 4% cess are verified (r1, r3), and
the arithmetic is exact for these inputs. The example fixes the method, not the
standard deduction.

Here the new regime wins by ~₹74,100 — but flip the deductions up (large 80C + home-
loan interest u/s 24(b) + NPS 80CCD(1B)) and the old regime wins. The engine must run
both **every time a declaration changes** and surface the cheaper one, while honouring
the employee's actual election. Also in scope:

- **Old-regime slabs** — nil to ₹2,50,000 under 60, ₹3,00,000 at 60–80 and ₹5,00,000
  at 80+, then 5% / 20% / 30%, with a rebate of up to ₹12,500 where taxable income
  does not exceed ₹5,00,000. The age band is a per-employee conditional that exists
  only in the old regime.
- **Surcharge** — 10% (₹50 lakh–1 crore), 15% (₹1–2 crore) and 25% (₹2–5 crore) in
  both regimes. Above ₹5 crore the old regime charges 37% and the new regime stays
  at 25%. Cess is 4% on tax plus surcharge in both.
- **Marginal relief** at each surcharge threshold and at the rebate edge.

(Income Tax Department portal, AY 2026-27 tables, r1) **[Verified]**

**Cadence.**

| Filing | Frequency | Due date | Source cue |
| --- | --- | --- | --- |
| TDS deposit (challan) | Monthly | **7th** of following month (30 April for March) — carried from 1962 Rules r.30 | Income-tax Rules 2026 r.218 prescribes deposit due dates; the dates themselves are **[Hypothesis]** until read against r.218 (§06.13) |
| Quarterly statement (**Form 138**, ex-24Q) | Quarterly | 31 Jul (Q1), 31 Oct (Q2), 31 Jan (Q3); 31 May of the year following the Tax Year (Q4) | Income-tax Rules 2026 r.219 (ex-r.31A) (EV-049) **[Verified]** |
| Annual certificate (**Form 130**, ex-Form 16) | Annual | 15 June of the financial year following the Tax Year | Income-tax Rules 2026 r.215(1); TRACES-generated only (EV-048) **[Verified]** — the 1962-Rules predecessor number is not cited, because "rule 31" in the 2026 Rules now governs the donation certificate (below) |

**The breaking file-format change — this is a build-critical event.**

> **Form 138 replaces Form 24Q, and the record layout is a breaking change.**
> - Challan sub-headings **301–312 remap to A–K, with 303 deleted**.
> - Annexure I fields **313–327 remap to C–N, with 313, 321, 322 and 325 removed**.
> - **Surcharge, Education Cess and Penalty/Others are deleted**; **Interest
>   Allocation and Others Allocation are added**; Token No. becomes "Return Receipt
>   Number"; TAN Registration No. is deleted; the form auto-populates from the
>   deductor's TRACES profile (EV-051).
> - Physical format: ASCII `.txt`, `^`-delimited variable-width fields, every record
>   CRLF-terminated, record types FH / BH / CD / DD, file type `SL1` (EV-051).
>   Every record has one delimiter fewer than its field count (the File Header has 16
>   fields and 15 delimiters). Dates are `ddmmyyyy`, amounts carry 2 decimals and
>   the TDS rate 4. Form Number is `138`. Protean's `138RQ1.txt` sample is the
>   golden fixture (r5).
> - Further breaking details (r5): Interest and Fee become **Total Interest (C)** and
>   **Total Fee (D)**. A **contact number with country code** is added for both the
>   deductor and the person responsible. 24G references become **Form No. 137**.
>   The deductee Date of Payment is constrained to the quarter and tax year. The
>   s.197 certificate field becomes "certificate issued u/s 395(1)".
> - Importing the **`.csi` file** from TIN Challan Status Inquiry is mandatory, and
>   the statement's TAN and TAN name must match it (r5). In the Q1–Q3 Batch Header
>   the salary-detail and s.194P counts are marked "Not applicable", which is why Q4
>   is a separate, unpublished artefact.
> - **Three annexures** (EV-047): Annexure I (all quarters); Annexure II (salary
>   summary, Q4 only); Annexure III (pension and interest for specified senior
>   citizens, Q4 only).
> - The Q1–Q3 regular format was published 22 July 2026 (Protean's page labels it
>   v1.2; the workbook itself says v1.1 — pin versions by the downloaded artefact);
>   the **Q1–Q3** correction format followed on 4 August 2026.
> - **The Q4 regular file format is not released** ("Expected to be released soon",
>   no link), and **the Q4 correction format is also unavailable** (EV-046,
>   re-checked Sep 2026). CBDT states that TRACES prepares Form 130 from Annexure I
>   and Q4 Annexure II, so the missing Annexure II **blocks the annual salary
>   certificate**. The Q4 generator and everything downstream of it are fenced.
> - **Dual FVU stack** (EV-052): RPU 1.2 + FVU 1.2 for Tax Year 2026-27 onward;
>   RPU 6.0 + FVU 9.5 for FY 2010-11 to FY 2025-26. Mixing versions causes rejection,
>   so statements route by period, never by today's date.
>
> (Source: Protean RPU/FVU 1.2 key-features note and download pages; CBDT Guidance
> Note FN-138) **[Verified]**

**Form 130 is a TRACES artefact, not ours** (EV-048). It has **Part A, Part B and
Part C** — the per-employee salary breakdown sits in Part C Annexure-I, not Part B —
and a certificate not generated from TRACES is invalid. The product prepares the Form
138 data that TRACES builds from, then distributes the TRACES-downloaded, signed
certificate. In a multi-employer year each employer issues Parts A and B for its own
period; Part C comes from each employer or from the last one, at the employee's option
(Income-tax Rules 2026 r.215(2)). A duplicate may be issued on request, certified as
a duplicate (r.215(3)). A digitally signed certificate must be unalterable after
signing and must carry a control number, and the deductor keeps a log of such
certificates (r.215(4)–(5)). Generation and download follow the procedures, formats
and standards specified under r.332 (r.215(7)). (r5) **[Verified]** The product
prepares and distributes the certificate; it never generates one itself.

**Dual vocabulary is a requirement, not a courtesy** (EV-050). CBDT's mapping:
Forms 130←16, 131←16A, 133←27D, 137←24G, 138←24Q, 140←26Q, 143←27EQ, 144←27Q; the
employee-facing forms 12BB→124, 12BA→123, 12B/12BAA→122; sections s.192→s.392,
s.194P→s.393(1), s.200(3)→s.397(3)(b), s.197→s.395(1). "Financial Year" becomes
"Tax Year"; the file field is six digits (202627 for Tax Year 2026-27) and the
assessment-year field must be ≥ 202728. The same CBDT table renumbers the other
forms a payroll product touches: 15G/15H→121 (declarations under s.393(6)), 10E→39
(relief under s.157(1)) and 26AS/AIS→168, where an employee sees "TDS by employer"
(r5). The product accepts **both vocabularies** in
search, imports, labels and help, because historical periods keep the old forms and
practitioners still use them. One collision must be guarded: "Form No. 16" still
exists in the Income-tax Rules 2026 but now means a certificate of donation under
s.45(4)(a) (see rule 31(1)(b) of the 2026 Rules). So the string "Form 16" resolves
to the salary certificate only for FY 2025-26 and earlier periods. "24Q", by
contrast, is a true null: it appears nowhere in the 2025 Act or the 2026 Rules (r5).

**Two declaration forms the engine must consume, and one statement it issues.**

- **Form 124 (ex-12BB)** — the employee's statement of claims for deduction under
  s.392(5)(b): HRA, LTA, home-loan interest and Chapter VI-A claims, with proofs, for
  the employer to grant during the year. (CBDT form mapping, r5) **[Verified]**
- **Form 122 (ex-12B and 12BAA)** — details of income for salary deduction under
  s.392(4)(a) (CBDT form mapping, r5; ITD publishes it as "Form No 122 (Earlier Form
  Nos. 12B & 12BAA)", r3) **[Verified]**. It carries previous-employer income and
  the former 12BAA limb, which is the employee's **other TDS/TCS**, netted against
  salary TDS to reduce over-deduction. The engine accepts and applies both. For a
  mid-year joiner, previous-employer income is a prompted, deadline-tracked input
  with an explicit "not furnished" state. That state visibly projects the year-end
  TDS shortfall to employee and employer (r3). The 12BAA limb's introduction date,
  its legacy instrument and v0.3's examples are carried, not re-captured.
- **Form 123 (ex-12BA)** — the statement of perquisites, other fringe benefits or
  amenities and profits in lieu of salary, with their value. The employer issues
  it; it does not consume it (CBDT form mapping, r5) **[Verified]**. Its field-level
  layout was not read in any round (r5 open question). The generator is specified
  once the CBDT guidance note for Form 123 is captured (§06.13).

**Arrears relief u/s 89(1) / Form 10E (now s.157(1) / Form 39) — the retro-run's tax twin.** When salary
arrears are paid in a later year (a raise backdated, a pay-commission-style
settlement, or the §06.10 retro-recompute paying out), the lump sum can push the
employee into a higher slab in the year of receipt. Section 89(1) relief re-spreads
the arrears to the years they relate to and taxes them at those years' rates, claimed
via **Form 10E / Form 39**. v0.3 added a filing-timing condition (Form 10E before
the return); it is carried, not re-captured.
Because the spine already recomputes wages against the *period's* rule version for
PF/ESI (R3), the same arrears event must carry its **year-of-accrual attribution**
into TDS so 89(1) relief can be computed — a payroll arrears line is simultaneously a
PF retro, an ESI retro and a potential 89(1) event. The legacy Q4 layout also carried
a field for s.89 relief, so the attribution is a filing field, not only a
computation (r5). (Source: CBDT form mapping, 10E→39 and s.89→s.157(1), r5)
**[Verified]**. The legacy rule reference v0.3 cited is carried, not re-captured.

**Penalties.**

| Failure | Consequence | Source cue |
| --- | --- | --- |
| Late deposit of deducted tax | Interest **1.5%/month** from deduction to deposit; held as `tds.interest.late_deposit` | Income-tax Act 2025 s.398(3)(a), read from the Act text in round five (r5/04 finding 32) **[Verified]**. The same rate stood in 1961-Act s.201(1A) (r1/06 finding 41), but the CBDT mapping captured here does not list that pair (EV-050), so the correspondence is by content, not a stated mapping (§02; `tax.section_map.interest_short_deduction`, §20) |
| Non-deduction | Interest **1%/month** from the date tax was deductible to the date it is deducted; held as `tds.interest.non_deduction`; disallowance risk | As the row above **[Verified]** for the rate; the disallowance consequence is unmapped under the 2025 Act |
| Late filing of statement | **₹200/day** — the long-standing 1961-Act fee per a secondary source (r1, medium); any cap is parameter `tds.late_fee_cap` | 1961-Act s.234E — **[Hypothesis]** (not primary-verified); 2025-Act equivalent unmapped |
| Non/late filing penalty | Range held as parameter `tds.penalty.statement_default`; v0.3's figures are carried, not re-captured | 1961-Act s.271H — carried, not re-captured **[Hypothesis]**; 2025-Act equivalent unmapped |
| Late issue of certificate | Per-day amount held as parameter `tds.penalty.certificate_delay`; v0.3's figure is carried, not re-captured | 1961-Act s.272A(2)(g) — carried, not re-captured **[Hypothesis]**; 2025-Act equivalent unmapped |
| Assessee-in-default window | No order deeming the deductor in default after six years from the end of the tax year in which tax was deductible, or two years from the end of the tax year a correction statement is delivered, whichever is later | Income-tax Act 2025 s.398(5) (r5) **[Verified]** — retention consequences are a counsel item (Part D-11) |

**Inoperative PAN — a counsel-gated branch, not a stated rule.** Where an employee's
PAN is **inoperative** for want of Aadhaar linkage, the deductor faces higher-rate
deduction consequences. Short-deduction demands, with interest, land on the
employer, not the employee (r5 counsel review). The exact rate and section are not
captured in any research round. v0.3's statements are carried, not re-captured, and
are **not** stated as law: the "higher of the applicable rate or 20%" under 1961-Act
s.206AA, and the claim that s.206AB does not reach salary. The engine therefore
holds the branch as parameter `tds.inoperative_pan_rule`, with no shipped default.
It flags every inoperative PAN before the quarter's statement, and it never tells a
customer that an inoperative PAN carries "no employer-facing consequence". Employer
consequences where an employee's PAN is inoperative are **unverified — do not state
either way to a customer until opined** (§23; §06.13). The product collects no
Aadhaar for TDS purposes and shows a non-blocking nudge when a PAN is reported
inoperative.

**Data required.** PAN (valid and operative — an inoperative PAN triggers the
higher-rate branch), regime election, Form 124 (ex-12BB) investment declarations and
proofs, Form 122 (ex-12B/12BAA) previous-employer income and other TDS/TCS, perquisite
values, HRA/LTA claims, and challan/CIN reconciliation. The meal perquisite (₹200 per
meal from 1 April 2026 — EV-019, **[Hypothesis]**: two dated secondary sources and a
counsel spot-check, gazette text not read; §20 V-18) is carried with its
**conditions as engine constraints**:
meals provided during working hours at office or factory premises, or
non-transferable vouchers usable only at eating outlets. Without them the perquisite
is taxable, payslips under-deduct, and the demand plus interest lands on the
employer (K-19). The rule citation is not stated here — it is routed to §20
validation. The gift/voucher threshold moved to ₹15,000 per tax year on the same date
per secondary sources (EV-019, **[Hypothesis]**); §11 owns both as benefit rules.

**Product implication.** Form 138 **Q1–Q3** generation is a v1 artefact and its layout
is **versioned and effective-dated by quarter** — Q1–Q3 on the published layout, Q4 on
a layout that does not yet exist (EV-046). The engine must: (a) not hard-code field
numbers (301–312 etc.) but map them through a versioned schema; (b) compute tax under
both regimes with surcharge and marginal relief; (c) reconcile challans (CIN, via the
mandatory `.csi` import) against deducted amounts before file generation; (d) fence
the Q4 generator (Annexures II and III) and hold Form 130 preparation behind it,
remembering that Form 130 itself is generated only by TRACES (EV-048); (e) hold the
inoperative-PAN branch as a counsel-gated parameter, never a hard-coded rate; (f)
consume Forms 124 and 122; (g) route every statement to its format family and FVU
stack by period (EV-052); and (h) carry both vocabularies everywhere (EV-050). The
statutory-change watcher (§22) must be **watching for the Q4 layout release
specifically** — it is a named, expected dependency with no published date, sitting
just ahead of the 31 May 2027 Q4 due date and the 15 June 2027 certificate deadline.

#### Which stack a statement goes through — routing by period (EV-052)

| Statement period | Statement | Utilities | Year fields | Correction path | Source |
| --- | --- | --- | --- | --- | --- |
| FY 2009-10 or earlier | Legacy 24Q | FVU 2.191 | Financial and assessment year | Legacy correction formats | Protean regular page (r5/02 finding 34) |
| FY 2010-11 to FY 2025-26 | Legacy 24Q — live regular formats Q1–Q3 v6.3 and Q4 v7.5; certificate Form 16 | RPU 6.0 + FVU 9.5 | Financial and assessment year | Legacy correction formats, live — the 24Q Q4 correction formats v7.5 and v7.6 still resolve (r5/02 finding 20) | EV-052; r5/02 finding 34 |
| Tax Year 2026-27 onward, Q1–Q3 | Form 138, Annexure I | RPU 1.2 + FVU 1.2 | Tax Year, six digits (202627); assessment-year field at least 202728 | Q1–Q3 correction format published 4 August 2026. On 1 September 2026 the e-filing portal said Tax Year 2026-27 correction filing "will be enabled shortly" (r1/06 finding 33) | EV-051, EV-052 |
| Tax Year 2026-27 onward, Q4 | Form 138, Annexures I–III | Not released | — | Q4 correction format not released | EV-046 — fenced |

Routing reads the **statement's period**, never today's date: a correction to FY
2024-25 prepared in October 2026 goes through RPU 6.0 and FVU 9.5 (TV44). Protean
warns that replacing only the FVU jar in an old folder can cause rejection at
submission (r5/02 finding 34), so the runbook installs each stack whole (§22). A Tax
Year 2026-27 correction the portal cannot yet take is generated, validated and
**held** with that reason — not submitted, and not counted as filed — until the portal
announcement the watcher keys on (§22 FR-RULE-006) (TV45).

**Which quarter a payment belongs to.** Section 392(1) requires deduction "at the time
of such payment", at the average rate computed on the rates in force for the tax year
in which the payment is made (r5/04 finding 28), and the Form 138 deductee's date of
payment must fall inside the statement's quarter and tax year (EV-051 box above). So
the payment date, not the wage month, places a salary payment:

| Payment | Wage month | Paid on | Statement it belongs to |
| --- | --- | --- | --- |
| June salary | June 2026 | 30 June 2026 | Tax Year 2026-27, Q1 |
| June salary | June 2026 | 1 July 2026 | Tax Year 2026-27, Q2 |
| Arrears for April–May, from a revision | April–May 2026 | 20 August 2026 | Tax Year 2026-27, Q2 — and a year-of-accrual attribution for s.157(1) relief (above) |
| March salary | March 2027 | 31 March 2027 | Tax Year 2026-27, Q4 — fenced (EV-046) |
| March salary | March 2027 | 1 April 2027 | Tax Year 2027-28, Q1 by date of payment |

The last row is where a payroll calendar and a tax calendar part company. Its
statement placement follows from the two verified rules; which tax year the salary is
*income* of, and how the Tax Year 2026-27 certificate then reports it, is not
captured in any round and is routed to counsel (§23) before the product states it.
The engine flags every salary whose wage month and payment date fall in different
tax years.

#### The Form 138 Q1–Q3 statement file — records, remap and validators (EV-051)

Two published artefacts define the file: Protean's Q1–Q3 workbook, `Form Number
138-24Q - Q1 to Q3_22072026.xlsx`, whose own title reads Version 1.1 where the download
page says 1.2 (r5/02 findings 19, 35), and the sample file `138RQ1.txt` (r5/02 finding
30). §08 FR-PAY-706 is the generator FR; this subsection is the canonical statement of
what the file must be. Field names and positions inside each record are transcribed
from the workbook into the schema version at build (R6). No research round itemised
them, so none is listed here from memory.

<!-- DIAGRAM: statutory-spine-form138-record-structure -->

**The records.** The sample's first four records are FH, BH, CD and DD, in that order
(r5/02 finding 30).

| Record | What the captured material places in it | Rule the writer holds |
| --- | --- | --- |
| `FH` — file header | File type `SL1` | 16 fields, so 15 delimiters (workbook note) |
| `BH` — batch header | Form Number `138`; the Tax Year as six digits — the sample carries 202627, and 202526 in another field; the quarter — the sample carries Q1 | In Q1–Q3 the salary-detail and s.194P count and total fields read "Not applicable" (r5/02 finding 31) |
| `CD` — challan detail | One deposit, with the Form 138 challan columns (remap below) and the new Interest Allocation and Others Allocation columns | Verified against the imported `.csi`; TAN and TAN name equal the `.csi` (§08 AC-706.2) |
| `DD` — deductee detail | One Annexure I line: a deductee payment and its tax | The date of payment falls inside the statement's quarter and tax year (r5/02 finding 32) |

Two placements are not stated in the captured material and are read from the workbook
with the field transcription: the record that carries the deductor's and the
responsible person's contact numbers, now "with country code" (r5/02 finding 32), and
what 202526 denotes in the sample's batch header.

**File-level validators.** Each check carries its §08 FR-PAY-713 family, and each
blocks, because the FVU or the portal would refuse the file.

| # | Rule | Source | The check | Family |
| --- | --- | --- | --- | --- |
| F138-1 | ASCII text, `.txt` extension | Workbook general notes (r5/02 finding 30) | No byte outside ASCII. The rupee sign that replaces "Rs." is form copy (CBDT FN-138), never a file value | SA-FMT |
| F138-2 | `^`-delimited variable-width fields; per record, delimiters = fields − 1 | Workbook | The field count per record type comes from the pinned schema version, never from counting a sample | SA-FMT |
| F138-3 | Every record, the last included, ends CR LF (hex 0D 0A) | Workbook | No bare LF; no unterminated last record | SA-FMT |
| F138-4 | Record types FH, BH, CD, DD; file type `SL1`; Form Number `138` | EV-051 | Exact values | SA-FMT |
| F138-5 | Dates `ddmmyyyy`; amounts to two decimals; the TDS rate to four | Workbook, as transcribed in r5/02 | Pattern per field type | SA-FMT |
| F138-6 | Tax Year as six digits, 202627 for Tax Year 2026-27; the assessment-year field at least 202728 | EV-050; workbook (r5/02 finding 29) | Year fields from the statement's period, never from today's date | SA-FMT |
| F138-7 | A deductee's date of payment inside the statement's quarter and tax year | r5/02 finding 32 | A payment outside it is placed by the quarter rule above, never re-dated in the file | SA-RULE |
| F138-8 | `.csi` imported; statement TAN and TAN name equal the `.csi` | Workbook | A missing `.csi` or a mismatch stops generation | SA-ID for the TAN, SA-REC for the challan |
| F138-9 | Q1–Q3 batch-header salary-detail and s.194P counts and totals "Not applicable" | r5/02 finding 31 | A populated value is refused; no Q4 content reaches a Q1–Q3 file | SA-FMT |
| F138-10 | RPU 1.2 + FVU 1.2 for Tax Year 2026-27 onward, pinned to the downloaded workbook's version | EV-052; r5/02 finding 35 | The statement's period picks the stack | SA-VER |
| F138-11 | No Surcharge, Education Cess or Penalty/Others in the challan details | r5/02 finding 32; CBDT FN-138 | A legacy value with no Form 138 column is refused with its reason, never dropped | SA-FMT |

**The remap — legacy 24Q columns to Form 138** (Protean, "Key Features — RPU and FVU
version 1.2", section II; r5/02 finding 32). The note makes the changes effective "from
FY 2026-27 onwards" — its own wording for Tax Year 2026-27.

Challan sub-headings:

| Legacy 24Q | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308 | 309 | 310 | 311 | 312 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Form 138 | A | B | removed | C | D | E | F | J | G | I | H | K |

Deductee detail, Annexure I (313 is a sub-heading the note removes):

| Legacy 24Q | 313 | 314 | 315 | 316 | 317 | 318 | 319 | 320 | 321 | 322 | 323 | 324 | 325 | 326 | 327 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Form 138 | removed | E | C | D | F | G | H | I | removed | removed | J | K | removed | M | N |

Three consequences, each encoded as data in the schema version:

- **The letters do not follow the numbers.** A positional mapping — the n-th surviving
  number to the n-th letter — puts eight columns in the wrong place: 308, 309 and 311
  in the challan table, and 314, 315, 316, 326 and 327 in Annexure I. The mapping is a
  lookup, never an offset (TV65).
- **Some letters have no legacy source.** In Annexure I the note maps nothing to L, and
  its range starts at C. Whatever the workbook defines at L and before C is transcribed
  from it, never inferred from a neighbouring column.
- **One removed sub-heading, three deleted fields.** The challan remap removes only
  303, while the note deletes three challan fields — Surcharge, Education Cess and
  Penalty/Others — and turns interest and fee into Total Interest (C) and Total Fee (D).
  The captured material does not say which legacy sub-headings carried the three
  deleted fields, so neither list is derived from the other. The legacy labels of
  301–327 are transcribed from the legacy workbooks (`tds.f138.legacy_column_labels`,
  §20).

The other changes the schema version carries (EV-051; r5/02 findings 28, 32, 33):

- Interest Allocation and Others Allocation columns in the challan details, added for
  all four quarterly statement forms;
- a contact number with country code for the deductor and for the person responsible;
- Form No. 24G references in the BSR Code/Receipt Number and Challan Serial No. fields
  become Form No. 137;
- Token No. becomes Return Receipt Number, and TAN Registration No. is deleted;
- the s.197 certificate column becomes "Certificate number of the certificate issued
  u/s 395(1) for non-deduction / lower deduction".

**The deductor master.** CBDT describes Form 138 as auto-populating from the deductor's
TRACES profile (FN-138; r5/02 finding 33). The product cannot read that profile. It
holds the deductor values the file needs — TAN, TAN name, and the deductor's and the
responsible person's contact numbers with country code — each confirmed by the tenant
against its TRACES profile, with the date of confirmation. A value edited after
confirmation re-opens the confirmation before the next statement is generated; the
`.csi` match (F138-8) stays the hard check on TAN and name.

**The resolver reads column numbers too.** Practitioners will keep saying "sub-heading
304" and "column 315". For a Tax Year 2026-27 period the resolver (below) returns the
Form 138 letter from these tables, labelled "challan column C (earlier 304)"; a removed
number returns "removed in Form 138", never a neighbour; for FY 2025-26 and earlier the
legacy number stands (TV68).

**The fixture, and a transcription that is not used.** The downloaded `138RQ1.txt` is
the golden fixture (§08 AC-706.1). Research recorded four byte-level facts about it,
and the parser test asserts each against the downloaded file: 692 bytes; 205 carets;
five CR LF terminators; no bare LF (r5/02 finding 30). The same finding transcribes
the file-header line, and that transcription carries 17 carets — two more than the
workbook's rule allows a 16-field header. The transcription, the sample and the rule
cannot all be right. So the transcription is never used as a fixture: the downloaded
file is the fixture, the workbook's count is the rule, and the discrepancy is closed at
the §20 desk read before the writer ships (TV67).

**What this does not cover.** Q4's Annexures II and III have no published format
(EV-046). The legacy 24Q Q4 layout carried salary-detail, section 16 and Chapter VI-A
records and a field for s.89 relief (r5/02 finding 31); whether Form 138's Q4 keeps
those record types or introduces new codes is unknown (r5/02 open questions). Nothing
in the Q1–Q3 writer anticipates them (R16).

#### The Tax Year 2026-27 calendar and the Q4 fence

| Quarter | Months | Statement due (r.219, EV-049) | Status on 11 September 2026 |
| --- | --- | --- | --- |
| Q1 | April–June 2026 | 31 July 2026 | Past; the Q1–Q3 format was published nine days before it, on 22 July 2026 |
| Q2 | July–September 2026 | 31 October 2026 | Buildable now |
| Q3 | October–December 2026 | 31 January 2027 | Buildable now |
| Q4 | January–March 2027 | 31 May 2027 | Format not released (EV-046) |
| Form 130 | Tax Year 2026-27 | 15 June 2027 | TRACES builds it from Annexures I and II (EV-046, EV-048) |

From 11 September 2026 the Q4 due date is 262 days away and the Form 130 date 277.
The slack is real but not free. A released format still needs a generator built
against it, its sample file adopted as the golden fixture, two-person rule review and
a staged publish (§22 FR-RULE-003), and then the tenant's own review before the
deductor runs the FVU. So the fence carries explicit release conditions and an
explicit alarm:

- **Release.** The Q4 fence lifts only when (a) the Q4 regular-format anchor on
  Protean's page resolves to a file, (b) its sample file is published, and (c) the
  RPU/FVU release that validates it is out — each captured and archived (§22
  FR-RULE-007). The Q4 correction format is a separate release (its anchor is empty,
  EV-046) and lifts Q4 corrections only.
- **Alarm.** `tds.q4_build_lead_days` — the time from release to a generator certified
  for customers — and `tds.q4_contingency_trigger_date` — the date after which a late
  release becomes a customer-facing risk — are named parameters owned by §05's
  release plan and §22, with no shipped value, routed to §20's Form 138 Q4 slippage
  risk. When the trigger date passes with the fence still up, affected tenants see the
  risk on their calendar and the §22 fallback runs.
- **Never a proxy.** The legacy 24Q Q4 layout does not fill the gap (R16); nor are the
  Q1–Q3 batch header's "Not applicable" salary-detail counts read as a hint of Q4's
  record types, which are unknown (r5/02 open questions).

#### The dual-vocabulary resolver — specified (EV-050)

Search, imports, labels and help all pass a form or section string through one
resolver. It takes three inputs — the string, the **period** it refers to and the
**context** (salary TDS, another tax context, or a labour rule-set) — and returns one
canonical artefact carrying both labels, or it asks. It never guesses.

<!-- DIAGRAM: statutory-spine-vocabulary-resolver -->

| Input string | Period up to FY 2025-26 | Period from Tax Year 2026-27 | Guard |
| --- | --- | --- | --- |
| "24Q" | Legacy 24Q | Form 138, shown as "Form 138 (earlier 24Q)" | "24Q" occurs nowhere in the 2025 Act or the 2026 Rules (r5/04 finding 29), so it is a legacy alias only |
| "Form 16", salary context | Legacy Form 16 | Form 130, shown as "Form 130 (earlier Form 16)" | — |
| "Form 16", no context | Legacy Form 16 | **Ask**: the salary certificate, Form 130, or FORM NO. 16 of the 2026 Rules, the certificate of donation under s.45(4)(a) | Never routed silently to the donation form (TV22) |
| "16A" | Legacy 16A | Form 131 | — |
| "12BB" | Legacy 12BB | Form 124 | — |
| "12BA" | Legacy 12BA | Form 123 | — |
| "12B", "12BAA" | Legacy 12B, 12BAA | Form 122 | — |
| "15G", "15H" | Legacy 15G, 15H | Form 121 | — |
| "10E" | Legacy 10E | Form 39 | — |
| "26AS", "AIS" | Legacy 26AS | Form 168 | — |
| "24G" | Legacy 24G | Form 137 | — |
| "27D" | Legacy 27D | Form 133 | — |
| "26Q", "27EQ", "27Q" | Legacy forms | Forms 140, 143 and 144 | Outside payroll scope; resolved for search only |
| "FORM-XXIII" | — | — | **Ask** for the rule-set: the SS unified annual return or the OSH contractor's experience certificate (§06.9) |

Sections resolve the same way: s.192 → s.392; s.194P → s.393(1); s.200(3) →
s.397(3)(b); s.197 → s.395(1); s.89 → s.157(1) (EV-050; r5/02 finding 28). s.201(1A)
resolves to "no CBDT mapping captured", with a pointer to s.398(3)(a), which carries
the same two rates (penalties table above) — a pointer by content, never shown as a
mapping. A 1961-Act section with no captured successor —
s.115BAC, s.87A, s.10(10), s.206AA and the rest of §06.13's list — resolves to
"successor unmapped", never to a guessed number. "Financial Year" and "Tax Year"
normalise the same way: an import that says "FY 2026-27" is read as Tax Year 2026-27
with a note, because Protean's own release note still writes "effective from FY
2026-27" (r5/02).

- An unresolved string in an import is a row-level import error, never a silent drop
  (§16).
- The resolver is one shared service. No screen, importer or model prompt carries its
  own mapping table (§12.1's rules-first principle).

**Label rendering.** The Income Tax Department's own publications write the new
number with the old one in brackets — "Form No 122 (Earlier Form Nos. 12B & 12BAA)"
(r3) — and the product adopts that convention on every Tax Year 2026-27 surface: the
declaration screen reads "Form 124 (earlier Form 12BB)", the perquisite statement
"Form 123 (earlier Form 12BA)", the calendar "Form 138 (earlier 24Q)". Surfaces for FY
2025-26 and earlier show the old label alone, because those periods keep the old
forms. Payslips, tax sheets, help articles, imports, exports and assistant answers
all take their label from the resolver for the period on screen (TV61).

#### Form 130 — the distribution record

The product never generates Form 130 (EV-048). It holds a record per employee, tax
year and issuing employer, so that what TRACES issued, what the employee received and
what the deductor must log can be shown later.

| Field | Content | Basis |
| --- | --- | --- |
| Employee, deductor TAN, tax year | The certificate's scope | r.215(1) |
| Parts held | Part A; Part B; the details of tax deposited by challan or book adjustment; the declaration; Part C Annexure-I; Part C Annexure-II where a specified senior citizen's pension and interest apply | CBDT guidance note FN-130-131-132-133 (r5/02 finding 23) |
| Employment period covered | This employer's period in the year | r.215(2): each employer issues Parts A and B for its own period |
| Part C option | `each_employer` or `last_employer`, as the employee chose | r.215(2): Part C from each employer, or from the last, at the employee's option |
| Source | The TRACES download reference and timestamp | A certificate not generated from TRACES is invalid (EV-048) |
| Signature | Digital or physical, by the deductor | FN-130 (r5/02 finding 24) |
| Control number and the deductor's log entry | For a digitally signed certificate, which must not be alterable after signing | r.215(4)–(5) |
| Duplicate flag | Set when re-issued on request, certified as a duplicate | r.215(3) |
| Distribution | Channel, timestamp, and the employee's acknowledgement where captured | Product record |
| Reconciliation | Figures matched to the four quarterly statements and the year's payslips before release | §08 AC-707.2 |

A mid-year joiner who brings a previous employer's income on Form 122 (above) is the
common two-employer case: the record covers Parts A and B for our months and Part C
per the recorded option (TV47).

---

### 06.6 Gratuity

**What it is.** A lump-sum terminal benefit payable to an employee on exit after
qualifying service, funded by the employer. It is both a **payout obligation** on
exit and an **accruing liability** the employer must account for continuously.

**Statutory basis.** The Payment of Gratuity Act 1972 is repealed by CoSS s.164(1);
gratuity is now CoSS Chapter V (ss.53–56). v0.3's statement that the Social Security
(Central) Rules 2026 supersede the Payment of Gratuity (Central) Rules 1972 is
carried, not re-captured. The Code provisions
below are read from the Code's gazette text (r1). Legacy POG Act section references
are carried, not re-captured, and are named only where they carry a rule the Code
text has not yet been read for.

**Who it binds.** Every factory, mine, oilfield, plantation, port and railway
company, and every shop or establishment in which **10 or more** employees are, or
were on any day of the preceding twelve months, employed — it latches (CoSS First
Schedule, Ch. V). Payable on superannuation, retirement or resignation, death or
disablement, or expiry of a fixed-term contract, after **5 years of continuous
service**. The 5-year condition does **not** apply on death, disablement or
fixed-term expiry, and fixed-term and deceased employees are paid pro rata (CoSS
s.53) **[Verified]**. Fixed-term employees qualify after **one year** of service —
stated in two independent professional-services readings of the Central Rules (r1)
and verbatim in MoLE's February 2026 central-sphere handbook, 6.3 (r3), but not in
the Code's own text, which only removes the five-year condition and mandates pro-rata
payment **[Hypothesis]**. Three further Code-text rules the calculator must
hold (r1) **[Verified]**:

- **Working journalists** qualify after three years, not five.
- **Re-employment on reduced wages after disablement.** The pre-disablement and
  post-disablement periods use different wage bases (s.53(4)).
- **Better terms survive.** An award, agreement or contract giving better gratuity
  terms prevails (s.53(5)). The statutory amount is a floor, not a formula the
  engine may cap at.

**What "continuous service" means — the 240-day rule.** "Five years" is not five
calendar years of daily attendance. An employee who has actually worked **240 days
in a twelve-month period** (190 for underground mine workers or establishments
working under six days a week), or 120 days in six months (95), is deemed in
continuous service for that period. Counted days include lay-off, paid earned leave,
temporary disablement from employment injury, and maternity leave up to 26 weeks;
seasonal establishments use a 75%-of-operating-days test (CoSS s.54) **[Verified]**.
The fifth year is satisfied at **4 years + 240 days** per several High Court rulings
under the legacy Act, followed by some High Courts but not uniformly settled. The
case citations v0.3 gave are carried, not re-captured. We are not aware of any
ruling on it under the Code as of September 2026. **[Hypothesis]** —
**kill criterion: confirm the controlling jurisdiction's position before
auto-approving a claim at exactly 4y240d.**

**Computation.**

| Item | Rule | Source cue |
| --- | --- | --- |
| Formula (covered employee) | **(15/26) × last-drawn monthly wages × completed years of service** — 15 days' wages per completed year, monthly-rated wage ÷ 26 | CoSS s.53 **[Verified]** |
| Seasonal establishment | **7 days' wages** for each season | CoSS s.53 **[Verified]** |
| "Wages" for gratuity | The CoSS s.2(88) wage definition with the 50% add-back (§06.10); legacy Basic + DA | CoSS s.2(88) **[Verified]**; the legacy definition's section is carried, not re-captured |
| Rounding of service | Service **in excess of** six months in the final year counts as a full year (exactly six months does not) | CoSS s.53 **[Verified]** |
| Ceiling on gratuity payable | "Such amount as may be notified by the Central Government" — the familiar ₹20 lakh is a legacy of the repealed Act; no Code-era notification located | CoSS s.53(3) **[Verified]**; amount **[Hypothesis]** (§06.13) |
| Tax-exemption ceiling | Lifetime, cumulative across all employers — held as parameter `tax.gratuity_exemption_ceiling`. The ₹20 lakh figure and the notification v0.3 cited are carried, not re-captured, and the payable ceiling above is a separate number that must never share a field with this one | 1961-Act s.10(10) — carried **[Hypothesis]**; 2025-Act equivalent unmapped (§06.13) |

Worked example: last-drawn Basic+DA ₹52,000, 7 years 8 months service (rounds to
8). Gratuity = (15/26) × 52,000 × 8 = **₹2,40,000**. Its tax treatment follows the
exemption-ceiling parameter.
Contrast: 7 years **4 months** rounds **down** to 7 → (15/26) × 52,000 × 7 =
**₹2,10,000**. The 6-month boundary is a hard test vector (§06.14); an engine that
rounds 7y4m up over-pays and mis-states the accrued liability.

**Forfeiture.** Gratuity is not unconditional. CoSS s.53(6) provides forfeiture **to
the extent of damage or loss** caused by the employee, and on termination for
riotous or disorderly conduct **[Verified]**. The legacy Act's further limb (an act of
violence, or an offence involving moral turpitude committed in the course of
employment) is carried, not re-captured. It stays a reason code pending a read of the
full s.53(6) text **[Hypothesis]**. The engine must support a forfeiture flag with a
reason code on the exit record, not silently pay.

**Compulsory insurance (legacy POG Act).** The legacy Act made it obligatory for
employers (other than government and those with an approved gratuity fund) to
obtain gratuity insurance from LIC or an IRDAI-registered insurer, with enforcement
via **state notification**. **[Hypothesis]** — the provision (legacy s.4A), the
amendment history, and which states have notified rules are all carried, not
re-captured. Enforcement is not uniform across states, and the Code-era equivalent
is unmapped; **kill criterion: verify whether the tenant's
state has notified compulsory insurance before representing it as a live
obligation.**

**Cadence.** One periodic filing, plus event-driven duties. (a) "The employer to
which the provisions of Chapter V and Chapter VI of the Code apply" — gratuity and
maternity benefit — uploads a **unified annual return in Form XXIII** by 28 or 29
February for the preceding year (Social Security (Central) Rules 2026 r.53(5)(a))
**[Verified — central sphere]**. Whether "and" needs both Chapters is
`ss.form_xxiii_chapter_test`, a counsel item; the product raises the task where
either applies until it is set (§06.1).
(b) A nomination is required from each employee who has completed one year of service
(CoSS s.55) **[Verified]**; the nomination form under the 2026 Rules is not captured.
(c) On a claim, payment is due **within 30 days** of it becoming payable, with
**simple interest** for delay beyond that (CoSS s.56). (d) The **accruing liability**
is actuarially estimated for the books under the employer's applicable accounting
standard. Where the employer runs an approved gratuity fund (e.g., LIC group
gratuity), contributions are periodic. (e) A further return is due within one month
of a sale or abandonment, or four months of a discontinuance (SS r.53(5)(b), r5)
**[Verified — central sphere]**.

**Penalties.** Delay in payment beyond 30 days attracts simple interest (CoSS s.56)
**[Verified]**. v0.3 said the legacy Act provided fine or imprisonment for
non-payment; that is carried, not re-captured, and the Code-era provision is
unmapped (§06.13).

**Data required.** Continuous-service ledger (the counted days for the 240-day test),
last-drawn wages under the correct definition, nomination, contract type (fixed-term
or not), date and cause of exit (to apply the death, disablement and fixed-term
rules and any forfeiture), and cumulative gratuity received from prior employers (for
the lifetime exemption ceiling).

**Product implication.** Two distinct features: (1) a **gratuity payout calculator**
on exit that applies the 5-year/240-day rule, the death, disablement and fixed-term
rules, the working-journalist and re-employment rules, the six-month rounding,
forfeiture and the parameterised cumulative exemption; and (2) a **running
accrual ledger** per employee so the liability is always current for the books. §01
lists gratuity among the statutory computations the engine must own; the accrual side
is what separates a payroll tool from a spreadsheet.

---

### 06.7 Payment of Bonus

**What it is.** A statutory profit-linked bonus, distinct from any discretionary or
performance bonus. It is an **annual** liability computed on allocable surplus, with
a statutory floor and cap, that the engine must accrue through the year and pay after
the accounts close. It is a genuine gap if omitted: under the legacy Act it bound at
the same 20-headcount threshold as EPF, squarely in the beachhead.

**Statutory basis — the Code moved the numbers to the appropriate Government.** The
Payment of Bonus Act 1965 is subsumed by the Code on Wages. Code on Wages s.26 fixes
the **percentages** — a minimum of 8.33% of wages earned or ₹100, whichever is
higher, for any employee with at least 30 days' work in the accounting year, payable
whether or not there is allocable surplus; a maximum of 20% — but delegates the
**calculation ceiling** to "such amount per mensem, as determined by notification by
the appropriate Government", or the minimum wage, whichever is higher **[Verified]**.
Eligibility and calculation ceilings can therefore diverge **state by state**. The
familiar ₹21,000 / ₹7,000 figures come from the Payment of Bonus (Amendment) Act 2015,
and no re-notification under s.26 — central or state — has been located
**[Hypothesis]** for Code-era periods. The legacy rules below are what an engine
applies to pre-21.11.2025 accounting years.

**Who it binds (legacy Act).** Factories, and every establishment employing **20 or more** persons
on any day in the accounting year. Two latching subtleties: (a) the appropriate
government may **notify establishments with 10–19 persons** into coverage, so the
trigger is not uniformly 20 in every state; and (b) once the Act applies, it
**continues to apply even if headcount later falls below 20** — the classic
"once covered, always covered" latch that §06.1's step function must encode.
Eligible: employees drawing wages **≤ ₹21,000/month** who have worked **at least 30
working days** in the accounting year. (Source: the ₹21,000 eligibility and ₹7,000
calculation ceilings are the Payment of Bonus (Amendment) Act 2015 figures per a
law-firm note, r1, medium.) The 30-day condition also sits in Code on Wages s.26(1)
(r1). The legacy section references, the 10–19 notification power and the latch
wording are carried, not re-captured. **[Hypothesis — legacy Act text not
re-captured]**; the Code-era coverage threshold and latch wording are unconfirmed
(§06.13).

**Computation.**

| Item | Rule | Source cue |
| --- | --- | --- |
| Eligibility wage ceiling | **₹21,000/month** (legacy); Code-era figure per appropriate Government | 2015 amendment figure (r1, medium) **[Hypothesis]** for citation; Code-era **[Hypothesis]** |
| Minimum bonus | **8.33%** of wages earned, or ₹100 if higher — payable "whether or not the employer has any allocable surplus" | Code on Wages s.26(1) **[Verified]** |
| Maximum bonus | **20%** of wages | Code on Wages s.26(3) **[Verified]** |
| Calculation ceiling | Bonus computed on **min(actual wage, ceiling)**, where ceiling = the notified amount or the minimum wage, whichever is higher. Legacy notified amount: ₹7,000 | Code on Wages s.26(2) **[Verified]**; ₹7,000 is the 2015-amendment figure (r1, medium), Code-era amount **[Hypothesis]** |
| Set-on / set-off | Surplus above the maximum, and deficits, carry forward for a limited number of years — parameter `bonus.set_on_off_years`, no shipped default | Legacy POB Act — carried, not re-captured **[Hypothesis]**; Code-era provision unmapped |
| Infancy exemption | New establishments exempt for an initial run of accounting years except in years they profit — parameter `bonus.infancy_years`, no shipped default | Legacy POB Act — carried, not re-captured **[Hypothesis]**; Code-era provision unmapped |

Worked example (legacy ceilings): employee wages ₹18,000/month (eligible, ≤₹21,000); the scheduled
minimum wage for the role is ₹10,000/month, which is higher than ₹7,000, so the
**calculation ceiling is ₹10,000**. Minimum bonus = 8.33% × ₹10,000 × 12 =
**₹9,996/year**; maximum = 20% × ₹10,000 × 12 = **₹24,000/year**. Note the employee's
actual ₹18,000 wage is **not** the bonus base — the calculation ceiling caps it at ₹10,000.
An engine that computes bonus on actual wage over-pays and mis-accrues; one that uses
a flat ₹7,000 without checking the higher minimum wage under-pays. The structure
(min of actual wage and the higher of notified amount and minimum wage) is the Code's
own s.26(2) **[Verified]**; the ₹7,000 input is legacy.

**Cadence and filing.** Legacy practice was payment **within 8 months of the close of
the accounting year** — for an April–March year, by **30 November** — with an annual
**Form D** return (r1, low: compliance blogs only). The legacy registers (allocable
surplus, set-on/set-off, bonus disbursed), their form letters and the Rules citation
are carried, not re-captured. The Code-era payment deadline and return are
**unresolved**: sources conflict,
and a Form D obligation under the Central Rules 2026 was not confirmed **[Hypothesis]**.
The payment deadline and the return are therefore named configurable parameters
(`bonus.payment_deadline`, `bonus.annual_return_form`), never hard-coded, and are
routed to §20.

**Penalties.** The legacy penal provision and its values are carried, not
re-captured, and are not stated here. The Code-era provision is unmapped (§06.13).

**Interaction with the other statutes.** Statutory bonus is **excluded** from the
PF/gratuity add-back base and from the ESI wage base (it is an annual payment at
intervals exceeding two months, §06.3). It **is** taxable salary for TDS (§06.5) in
the year of receipt. So the same bonus amount is invisible to ECR/ESI but visible to
Form 138 — a routing rule the wage engine must encode, not a single "bonus" field.

**Product implication.** Bonus is (a) an **accrual** through the year for the books
and (b) an **annual payout plus whatever return the period's regime requires** after
accounts close. The engine must apply the eligibility gate, the calculation ceiling
(with the minimum-wage lookup per employment category and state), the 8.33%–20%
band (with the ₹100 floor), set-on/set-off carry-forward and the infancy exemption
where the period's regime provides them. The ceilings are **per appropriate
Government**, so they are per-state, effective-dated parameters. **Kill criterion:
verify whether Code-era ceilings have been notified, centrally or by the tenant's
state, before computing bonus for any accounting year after 21.11.2025.** Until then
the legacy ₹21,000/₹7,000 figures drive only a **provisional computation**, clearly
labelled, and a bonus payout requires the operator to confirm the ceiling in force
and record its source.

---

### 06.8 Labour Welfare Fund (LWF)

**What it is.** A small statutory welfare contribution to a **state** Labour
Welfare Fund, split between employee and employer, funding worker welfare
activities. Like PT, it is a **state-by-state patchwork** — levied only where a
state has an LWF Act.

**Who it binds.** Employers in states with an LWF Act — roughly 16 states/UTs per
secondary compilations, a count that is itself unverified — for employees below a
defined wage/designation threshold. States with LWF include
Maharashtra, Karnataka, Tamil Nadu, Andhra Pradesh, Telangana, Gujarat, Kerala,
Madhya Pradesh, Chhattisgarh, Delhi, Haryana, Punjab, West Bengal, Goa. States
without: Uttar Pradesh (no active LWF), Rajasthan, Bihar, and most north-eastern
states. **[Hypothesis]** — both lists are compilations, and none of the negatives is
verified (r2). Contributions are generally flat rupee amounts, not percentages;
Haryana is the commonly cited exception (r1, medium). LWF sits entirely outside the
four Labour Codes, and no LWF
rate or employer/employee split has been verified from a government source in any
state. The one verified periodicity is Karnataka's calendar-year cycle with a
15 January due date. (The earlier corroboration is withdrawn: "Frappe ships LWF in 14 states"
is false — Frappe has no LWF at all, EV-031; see §06.4.) **Kill criterion: verify
each state's LWF applicability, amount and periodicity against the state LWF Act or
welfare-board notification before it drives a deduction.**

**Thresholds, amounts and cadence — per state.**

| State | Employee / employer contribution | Frequency | Source cue |
| --- | --- | --- | --- |
| **Maharashtra** | ₹25 (emp) + ₹75 (employer), or ₹6–12 / ₹18–36 by wage band — compilations disagree (r1) | Half-yearly per the same compilations (r1) | State Act — not captured **[Hypothesis]** — amounts disputed |
| **Karnataka** | ₹20 (emp) + ₹40 (employer), or ₹50 / ₹100 — compilations disagree (r1) | **Annual**, calendar year; due 15 January | Periodicity **[Verified]** (r2); amounts **[Hypothesis]** — disputed |
| **Haryana** | Commonly cited as the percentage-based exception to flat amounts; rate not captured — parameter `lwf.HR.rate` | Not captured | **[Hypothesis]** (r1) |
| **Every other LWF state** (Tamil Nadu, Gujarat, Delhi and the rest) | Not captured — parameters `lwf.<state>.employee`, `lwf.<state>.employer`, `lwf.<state>.wage_threshold`. v0.3's rupee figures for these states are carried, not re-captured, and are not shipped | Not captured — parameter `lwf.<state>.periodicity` | State LWF Act or welfare-board notification — to capture (§20 V-09) **[Hypothesis]** |

The point of the table is not the exact rupee values (which are small and drift)
but the **structural diversity**: amount, employee/employer split, wage threshold
and periodicity (monthly / half-yearly / annual) all vary by state. The
deduction/remittance calendar therefore differs per state, per period. A named trap:
some states levy LWF on the employee **only in the deduction month**, so a naive
"deduct every month" rule over-collects — the periodicity
is part of the rule, not a display detail. **[Hypothesis]** — verify the deduction
month per state.

**Penalties.** State-specific interest and penalty on delayed remittance; generally
minor in rupee terms but a compliance flag. **[Hypothesis]** — verify per state.

**Data required.** Work state, wage/designation eligibility, employee/employer
split, and the state's remittance periodicity and deduction month.

**Product implication.** Same shape as PT: a **maintained, effective-dated,
per-state rule table** feeding the deduction engine and the filing calendar, and
part of the permanent statutory-maintenance load. **[Reversed]** Earlier drafts gave
LWF "no differentiation credit" on the belief that Frappe shipped it free. Neither
Frappe nor Tally has an LWF engine (EV-031, EV-032), so a maintained LWF table is
greenfield against both. The LWF + PT datasets together are the single
largest "undone but cheap" build dependency in §20's validation plan.

---

### 06.9 The four Labour Codes and the November 2026 cliff

**What they are.** Four consolidating Codes replacing 29 central labour laws:
the **Code on Wages 2019**, the **Industrial Relations Code 2020**, the **Code on
Social Security 2020 (CoSS)**, and the **Occupational Safety, Health and Working
Conditions Code 2020 (OSH&WC)**.

**Status — settled at the centre, not draft.** The four Codes came into force on
**21 November 2025** (S.O. 5319(E)–5322(E)). The Social Security and Wages
commencements are partial, and the Social Security one must be read with corrigendum
S.O. 5936(E) (below). Final Central Rules under all four Codes were notified on
**8 May 2026**: IR G.S.R. 342(E), Wages G.S.R. 343(E), Social Security G.S.R. 344(E),
OSH G.S.R. 345(E). The OSH Rules' e-gazette stamp reads 9 May 2026, a one-day
ambiguity for OSH commencement. An earlier framing is corrected: the story is **not**
"be the guide through chaos"; it is **"build against a settled spec."** **[Verified]**

The residual uncertainty is **state divergence**, not central uncertainty. The
Central Rules bind central-sphere establishments. For most 20–200 private employers
the State is the appropriate Government, and state rules under the Codes — carrying
the operative forms, registers and procedures — are commencing **unevenly across
states**. Until a state's Code rules commence, its employers continue on that state's
pre-existing rules and forms. A multi-state tenant therefore runs a **per-state dual
regime**, and can hit conflicting state and central positions on the same question
— overtime spread, wage period, register format. The data model must **assume
divergence** — effective-dated rules per state from v1 — rather than treat it as an
exception (§20.8). **[Verified]** for the principle; individual state commencement
dates come from a commercial tracker and are not quoted here.

**What the Codes change for payroll, concretely.** Beyond the wage-definition
add-back (§06.10):

- a **wage period not exceeding one month**, and **wages payable before the expiry
  of the 7th day** of the following month for monthly wage periods, with tighter
  deadlines for daily, weekly and fortnightly periods (Code on Wages s.17(1))
  **[Verified]**;
- **full-and-final wages within two working days** of removal, dismissal,
  retrenchment or resignation (s.17(2)). The appropriate Government may set another
  limit (s.17(3)), and any time limit in another law in force is preserved (s.17(4)),
  so state Shops and Establishments timelines still apply on top (r1)
  **[Verified]**. This needs an off-cycle settlement run, not the monthly cycle
  (§08);
- **total deductions capped at 50% of wages** in any wage period, with the excess
  recovered in a prescribed manner. An employee is not held responsible where the
  employer deducts but fails to deposit (s.18(3)–(5), r1) **[Verified]**;
- **minimum wages fixed on a day basis**: the hourly rate is the daily rate divided
  by 8 and the monthly rate the daily rate multiplied by 26. The variable DA is
  revised twice a year, before 1 April and before 1 October, on the CPI for
  Industrial Workers (Wages Rules 2026 per the PRS review, r3) **[Verified]**.
  That makes the minimum-wage table a twice-yearly ingest per state, not a static
  seed;
- **overtime at not less than twice the normal rate** of wages (Code on Wages s.14),
  **[Verified]**.
  A **quarterly ceiling of 144 overtime hours** is reported only by secondary
  summaries of the Central Rules. It has **never been confirmed against
  gazette text** and may sit in the OSH rules rather than the Wages rules
  **[Hypothesis]**. The product may **warn** on it but must **never block** a punch,
  a roster or a pay run on it; the figure is routed to §20 validation (K-04);
- a prescribed **appointment letter** for establishments of **ten or more workers**,
  in the form the appropriate Government prescribes — state-sphere (OSH Code
  s.6(1)(f); EV-057; K-18);
- **six employer registers plus a wage slip**, across three rule-sets (EV-053).
  Code on Wages (Central) Rules 2026 r.51(1): **Form I** Employee Register, **Form IV**
  Register of Wages/Overtime/Advances/Fines/Deductions, **Form IX** Attendance
  Register-cum-Muster Roll, plus the **Form V** wage slip. OSH (Central) Rules 2026:
  Forms XIII, XIV, XV, **XIX** (accidents and dangerous occurrences) and **XX** (leave
  with wages), plus the Form XVI wage slip. Social Security (Central) Rules 2026
  r.53(1)(a): **Form XXII** Register of Women Employees. The non-duplication
  provisions (OSH r.72(3); SS r.53(1)(a) proviso) mean **one canonical set** with
  code-specific views. Form numbers are per-state configuration, because state rules
  prescribe different forms. **[Reversed]** — the earlier "four consolidated
  registers" framing is withdrawn;
- **field-level form duties** (EV-055): **Form IX** is a monthly grid requiring
  **per-day IN and OUT timestamps** with a signature row, so a present/absent or
  day-total attendance model is non-compliant (§09 owns the time model); **Form I**
  has **36 numbered fields**, including specimen signature or thumb impression;
- **retention and custody** (EV-054, central sphere): "five years after the date of
  last entry" (Wages r.51(4)) or "five **calendar** years from the date of last entry"
  (OSH r.72(1)(vii), SS r.53(1)(e)) — not identically worded. OSH r.76(2) bars
  destroying the leave register even after five years unless it has been transferred
  to a new register. OSH r.72(4) and SS r.53(3) impose a **three-kilometre** physical
  location constraint. IR Rules r.47(1) makes electronic maintenance **compulsory**
  while r.47(2) sets no period. The SS maternity Schedule para 11(a)(2) requires the
  women's register "in ink", contradicting r.53(1)(b)'s electronic permission.
  State-sphere periods are unknown and go to counsel (§23).

Each of these is a payroll-engine, time-model or document-generation requirement.

#### Wage timing, day-based minimum wages and the deduction cap, worked

**When wages fall due** (Code on Wages s.17(1), r1/06 finding 8). The wage period may
not exceed a month (s.16). Wages are due by the end of the shift for a daily period;
on the last working day before the weekly holiday for a weekly period; before the end
of the second day after the fortnight for a fortnightly period; and before the expiry
of the seventh day of the following month for a monthly period. For a monthly-paid
establishment, September 2026 wages are due by 7 October 2026.

**Full-and-final wages** fall due within two working days of the removal, dismissal,
retrenchment or resignation (s.17(2)), subject to a different limit the appropriate
Government sets (s.17(3)) and to any limit in another law, which s.17(4) preserves.
For an employee whose resignation takes effect on Friday 11 September 2026, the date
is Tuesday 15 September 2026 on a Monday-to-Friday establishment calendar; a gazetted
holiday on the Monday moves it to Wednesday. Two steps are not captured and are
parameters: which event starts the clock for a resignation served with notice
(`wages.fnf_trigger_event`), and the establishment's working-day calendar
(`calendar.working_days.<establishment>`), both routed to §20.

**Day-based minimum wages** (Wages Rules 2026 per the PRS review, r3). The minimum
wage is fixed per day: the hourly rate is the daily rate ÷ 8, the monthly rate the
daily rate × 26. For an illustrative daily rate of ₹500 — an input, not a notified
rate — the hourly rate is ₹62.50 and the monthly rate ₹13,000. The variable DA
revisions before 1 April and 1 October move the daily figure; the engine derives the
hourly and monthly figures from it and never stores them as separately notified
values. The engine's minimum-wage check compares like with like: the period's paid
days at the daily rate against the period's wages, for the employee's skill category
(Form I field 12, below) and work-location state.

**The 50% deduction cap** (s.18(3)–(5), r1). Total deductions in a wage period may
not exceed half the wages; the excess is recovered "in a prescribed manner"; and an
employee is not answerable for an amount the employer deducted but failed to deposit.
The cap is computed on the payment-of-wages base (§06.10), across the whole stack.

Worked: a Maharashtra man, wages ₹20,000 for September 2026, PF on the ₹15,000
ceiling, ESI-covered, no TDS at this income.

| Deduction | Amount |
| --- | --- |
| EPF, employee: 12% × ₹15,000 | ₹1,800 |
| ESI, employee: 0.75% × ₹20,000 | ₹150 |
| PT, Maharashtra, September | ₹200 |
| Salary-advance instalment due | ₹6,000 |
| Recovery of damage or loss | ₹2,500 |
| **Requested** | **₹10,650** |
| **Cap: 50% × ₹20,000** | **₹10,000** |
| **Excess carried forward** | **₹650** |

The excess is carried forward — neither taken nor dropped. Which deduction yields is
not stated in the captured text. The product defers non-statutory recoveries first —
here ₹650 of the damage recovery, so ₹1,850 is recovered this month — as a product
ordering held in `wages.deduction_priority`; the "prescribed manner" of recovering the
excess is `wages.deduction_overflow_manner`; both are routed to §20 for a read of the
Wages Rules. Form IV then shows ₹10,000 in column (26), Total Deductions, and the
damage record in columns (25) and (32) (TV52). A deducted-but-undeposited PF or ESI
amount is the employer's liability in the ledger and is never deducted again.

#### The registers specification — field level (EV-053–EV-055)

Everything in this subsection is **central-sphere** text read from the gazette
(r5). State rules prescribe their own forms, and most 20–200 employers sit in the
state sphere (§06.9 above). So every form number and field list below is the
*central* instance of a per-state configuration. It is never a claim about what a
given state requires.

**One canonical store, code-specific views.** The non-duplication provisions deem a
Wages-Rules register to satisfy the OSH and SS duties (OSH r.72(3); SS r.53(1)(a)
proviso, which names Wages Forms I, IX and IV directly). So the product keeps one
record per register and renders the form each rule-set names:

<!-- DIAGRAM: statutory-spine-register-store -->

| Canonical register | Code on Wages (Central) Rules 2026 | OSH (Central) Rules 2026 | SS (Central) Rules 2026 | What the store must hold |
| --- | --- | --- | --- | --- |
| Employee register | **Form I** (r.51(1)) | FORM-XIII | Form I, by reference | The 36 fields below, plus establishment header |
| Attendance register-cum-muster roll | **Form IX** (r.51(1)) | FORM-XIV | Form IX, by reference | Per-day IN and OUT for days 1–31; monthly sheet |
| Wages, overtime, advances, fines, deductions | **Form IV** (r.51(1)(ii); also the fines register under s.19(8) via r.51(2), and the deductions register under s.21(3) via r.51(3)) | FORM-XV | Form IV, by reference | 33 columns with itemised deductions and fines |
| Leave with wages | — | **FORM-XX** (r.76(1)) | — | Each employee's leave record, shared once a calendar year on demand; the r.76(2) destruction bar |
| Accidents and dangerous occurrences | — | **FORM-XIX** (r.75, read with Code s.33(a)(v)) | — | Event records linked to the attendance and employee records |
| Women employees | — | — | **Form XXII** (r.53(1)(a); maternity Schedule para 11(a)(1)) | Entries "made in ink" per para 11(a)(2) — see the contradiction below |
| Wage slip | **Form V** (r.52), electronic or physical, on or before payment of wages | **FORM-XVI** (r.72(2)), electronic only, on or before the day of payment | Form V of the Wages Rules (r.53(2)) | One slip per wage period, reconciling to Form IV |

The Industrial Relations (Central) Rules 2026 (G.S.R. 342(E)) add **no** employer
register: a negative search of the full text returned only the Register of Standing
Orders in Form-III, which the certifying officer keeps (r.17) (r5/04 finding 3). The OSH Rules' own list of 27 forms contains no Register of
Contractors or Register of Workmen, and a negative text search found none (r5).
The superseded 1971 contract-labour registers are not rebuilt.

**Saved-law registers beside the canonical set.** The ESI (General) Regulations 1950
add registers of their own (§06.3; r5/04 finding 25): the Register of Employees in Form
6 (reg 32(1)); the immediate employer's Form 6, submitted to the principal employer
before settlement (reg 32(1A)); the Accident Book in Form 11 (reg 66(ii)); and the
principal employer's inspection book (reg 102). The non-duplication provisions
captured here (OSH r.72(3); SS r.53(1)(a) proviso) do not name them, so Form 6 and
Form 11 are separate renders, under the rule-set "ESI (General) Regulations 1950", of
records the store already holds: Form 6 from the employee master and the ESI
identifier store (§07), Form 11 from the same accident event FORM-XIX renders. One
event with two renders cannot disagree with itself (TV70). The inspection book is kept
as a document linked to the establishment, since its content is not captured. Under
this PRD's reading the Regulations are saved only to the cliff, so these views follow
S1–S4 (the cliff, below); their retention is not stated here (Part D-11).

**Form I — Employee Register: header and 36 fields** (EV-055; field list read from
G.S.R. 343(E), r5). The header carries the name of the establishment, the name of
the employer, the name of the owner, the employer's PAN/TAN, and the establishment's
registration number, which the form footnotes as the Labour Identification Number
(LIN).

| # | Field | # | Field | # | Field |
| --- | --- | --- | --- | --- | --- |
| 1 | Employee Code | 13 | Type of Employment (Permanent / Temporary / Fixed Term / Trainee / Badli) | 25 | Bank A/c Number |
| 2 | Name | 14 | Details of Posting | 26 | Bank |
| 3 | Surname | 15 | Pay | 27 | Branch (IFSC) |
| 4 | Gender | 16 | Promotion | 28 | Present Address |
| 5 | Father's / Mother's / Spouse Name | 17 | Mobile Number | 29 | Permanent Address |
| 6 | Date of Birth | 18 | UAN | 30 | Service Book No. |
| 7 | Place of Birth | 19 | PAN | 31 | Date of Exit |
| 8 | Nationality | 20 | Nominee | 32 | Reason for Exit |
| 9 | Education Level | 21 | Details of Family | 33 | Mark of Identification |
| 10 | Date of Joining | 22 | EPS/NPS | 34 | Photo |
| 11 | Designation | 23 | ESIC IP No. | 35 | Specimen Signature / Thumb Impression |
| 12 | Category (Highly Skilled / Skilled / Semi skilled / Unskilled) | 24 | Aadhaar No. | 36 | Remarks |

Six fields carry product consequences beyond a column:

- **Field 24 (Aadhaar No.).** Rendered at export from the separate Aadhaar store,
  never from a business table (Part E-6; §07, §14). The rendered view is masked by
  default as a security control grounded in the Aadhaar (Sharing of Information)
  Regulations reg 6(2) (EV-068). It is not presented as a statutory display
  prohibition: whether masking is a duty on a plain employer is a counsel question
  (Part D-5). Where an employee has not provided Aadhaar, the field stays empty with
  a reason code. That never blocks onboarding or payroll (Part D-10, E-11). Whether
  an empty field satisfies Form I is routed to counsel (§23).
- **Field 35 (Specimen Signature / Thumb Impression).** A thumb impression is
  biometric information. DPDP creates no sensitive category (s.2(t), EV-059), but
  the SPDI Rules are live and classify biometric information as sensitive (r.3),
  with written consent required before collection (r.5(1), EV-060). The product
  therefore defaults to a signature. A thumb impression is an opt-in artefact
  captured under the consent entity (§07, §14), in the separate biometric keyspace
  and never as a stored image (Part E-6). Who owes the SPDI consent duty is a
  counsel question (Part D-4).
- **Field 34 (Photo).** A photograph is "biometric information" under Aadhaar Act
  s.2(g) (EV-071). It is stored as an access-controlled document on the employee
  record, never in a bulk image bucket (Part E-6). Its consent basis goes to counsel
  with field 35.
- **Fields 12 and 13** are closed vocabularies. The engine stores the form's own
  values, so a tenant's grade names map onto them rather than replacing them.
- **Fields 18, 19 and 23** (UAN, PAN, ESIC IP No.) are the same identifiers the
  filings use (§06.2–§06.5). The register reads them from the identifier store
  (§07), so the register and the return cannot disagree.
- **Fields 31–32** (exit date, reason) feed the ECR's date-of-leaving validation
  (EV-040) and the joint-declaration flow (EV-041). A register correction to an exit
  date is a flagged event, not a silent edit.

**Form I, all 36 fields — source, class and render rule.** The form names each field
but, for several, not what value it wants; those are one parameter group,
`formi.render.<field>`, set from the state instance or confirmed at the §20 desk read.
"Class" uses the SPDI Rules' sensitive categories where they apply (r.3, EV-060) —
never "sensitive under DPDP", which has no such category (EV-059; Part D-19).

| # | Field | Source | Class | Render and empty-value rule |
| --- | --- | --- | --- | --- |
| 1 | Employee Code | Employee master (§07) | Ordinary | As stored |
| 2 | Name | Employee master | Ordinary | Legal name; never the "name as per UAN" (§07 FR-CHR-009a) |
| 3 | Surname | Employee master | Ordinary | As stored |
| 4 | Gender | Employee master | Ordinary | As stored; the same value drives Form XXII and PT gender variants (§06.4) |
| 5 | Father's / Mother's / Spouse Name | Family record (§07) | Ordinary | As stored; empty with a reason code |
| 6 | Date of Birth | Employee master | Ordinary | As stored; the same value drives the age-58 EPS rule (EV-040) and the old-regime age bands (§06.5) |
| 7 | Place of Birth | Employee master | Ordinary | Empty with a reason code where not captured |
| 8 | Nationality | Employee master | Ordinary | As stored; the same value drives International Worker status (§06.2) |
| 9 | Education Level | Employee master | Ordinary | Empty with a reason code where not captured |
| 10 | Date of Joining | Employment (§14.4.2) | Ordinary | The date of joining this establishment; the ECR window (EV-040) and the gratuity service ledger read the same date |
| 11 | Designation | Governed designation list (§07 FR-CHR-024) | Ordinary | As at the register period |
| 12 | Category | Closed list: Highly Skilled / Skilled / Semi skilled / Unskilled | Ordinary | Tenant grades map onto the form's four values, never replace them; the same value selects the minimum-wage tier (r1/06 finding 49) |
| 13 | Type of Employment | Closed list: Permanent / Temporary / Fixed Term / Trainee / Badli | Ordinary | As stored; the same value feeds counting-unit membership (§06.1) and the fixed-term gratuity rules (§06.6) |
| 14 | Details of Posting | Assignment to establishment and work location for the period (§14) | Ordinary | As at the register period — the same assignment the jurisdiction resolves from (Part E-5) |
| 15 | Pay | Compensation (§08) | Pay data; whether it falls within SPDI r.3 "financial information" is a counsel question (§23) | `formi.render.15` — the form does not say which pay figure |
| 16 | Promotion | Designation history, effective-dated | Ordinary | `formi.render.16` — latest promotion or full history |
| 17 | Mobile Number | Employee master | Ordinary | As stored |
| 18 | UAN | Identifier store (§07) | Identifier | As above |
| 19 | PAN | Identifier store | Identifier | As above |
| 20 | Nominee | Nomination records — EPF, and gratuity under CoSS s.55 | Ordinary | `formi.render.20` — which nomination the field means is not stated; each nominee shown with its scheme until settled |
| 21 | Details of Family | Family and dependant records (§07, §11) | Ordinary | `formi.render.21` |
| 22 | EPS/NPS | EPS membership as the §06.2 branch computes it; NPS participation | Ordinary | "EPS member", "not an EPS member", NPS "yes" or "no" |
| 23 | ESIC IP No. | Identifier store | Identifier | As above; empty for a member outside ESI, with that reason |
| 24 | Aadhaar No. | Separate Aadhaar store, by token (Part E-6) | Aadhaar — token store | As above; ships dark (R24) |
| 25 | Bank A/c Number | Bank record (§07) | Financial information — SPDI r.3; written consent before collection, r.5(1) (EV-060); who owes that duty is under counsel review (Part D-4) | Masked in on-screen views; full value only in the controlled export |
| 26 | Bank | Bank record | Financial information, as field 25 | As stored |
| 27 | Branch (IFSC) | Bank record | Financial information, as field 25 | As stored |
| 28 | Present Address | Employee master | Ordinary | As stored |
| 29 | Permanent Address | Employee master | Ordinary | As stored |
| 30 | Service Book No. | Tenant-maintained reference | Ordinary | `formi.render.30`; empty with a reason code where the tenant keeps no service book |
| 31 | Date of Exit | Employment | Ordinary | As above |
| 32 | Reason for Exit | Exit-reason code (§08 F&F) | Ordinary | The code's label; a gratuity forfeiture reason, where recorded, stays a separate field (§06.6) |
| 33 | Mark of Identification | Tenant-captured text | Ordinary | Empty with a reason code where not captured |
| 34 | Photo | Document store, access-controlled | Biometric information under Aadhaar Act s.2(g) (EV-071) | As above; never from a bulk image bucket |
| 35 | Specimen Signature / Thumb Impression | Signature by default; thumb impression opt-in under consent | Biometric information — SPDI r.3 — for a thumb impression | As above; ships dark for thumb impressions (R24) |
| 36 | Remarks | Free text | Ordinary | Also carries the reason code for every field left empty, so the register explains its own gaps |

**Form IX — Attendance Register-cum-Muster Roll** (EV-055; read column by column,
r5). The sheet is headed "For the Month of".

| Column | Content | Model consequence |
| --- | --- | --- |
| (1)–(6) | Sl. No.; Employee Code; Name; Designation; Shift; Place of work / Section / Department | Shift and place of work are per-day facts, not employee constants — a roster change mid-month renders correctly |
| (7) | Date and time of attendance: days 1–31, each with **In** and **Out** sub-columns, plus Time and Signature rows | Punch-level IN/OUT pairs per day. A present/absent flag or a day total cannot render this column, so it is **non-compliant** (§09 owns the time model) |
| (8) | Total number of days worked | Derived, never keyed |
| (9) | Total number of overtime hours worked | Derived from (7) under the overtime rule. Any quarterly cap is warn-only (K-04, R17) |
| (10) | Brief details of tour or assignment outside the work place, if any | An off-site assignment note per day, captured with the punch or its exception |
| (11) | Signature of Register keeper — footnoted "Required in case register is maintained physically" | Suppressed for electronic maintenance; rendered on a print-and-sign export |

Because Form IX is a monthly sheet, the attendance register is **period-scoped**:
one closed register per establishment per month. Retention is anchored to "the
date of last entry made therein" (EV-054). That makes it a property of the
register, not the employee. A continuously open register never starts its clock,
and one employee's rows cannot be erased from it while it is in use (r5 inference
from the verified wording). Period-closing is what makes any attendance record
eventually erasable (§14).

**A rendered Form IX row — one employee, the first week of August 2026.** A
monthly-paid employee on a 09:00–18:00 general shift, Monday to Saturday, with Sunday
off (illustrative). Times are the punches as the time model pairs them (§09.5); the
render rules the form leaves open are §09's parameters, cited per row.

| Day | Punch facts | Column (7) In | Column (7) Out | Column (10) | Rule applied |
| --- | --- | --- | --- | --- | --- |
| Sat 1 | 09:05 in; no out punch | 09:05 | Blank until regularised | — | A missing punch is regularised (§09.8) before the month closes; the sheet never closes with an unexplained unpaired cell |
| Sun 2 | Weekly off; no punches | Blank | Blank | — | The captured form prescribes no status legend; the non-working marker is `form_ix_non_working_marker` (§20) |
| Mon 3 | 08:00–12:00 and 14:00–19:30 | Per `form_ix_multi_session_render` | Per `form_ix_multi_session_render` | — | Two sessions, one In and one Out cell (§09 FR-STAT-001 AC5) |
| Tue 4 | Paid leave | Blank | Blank | — | Leave appears in FORM-XX and in paid days, never as a punch |
| Wed 5 | At a client site all day; mobile punches 09:40 in, 17:55 out | 09:40 | 17:55 | Client-site visit | The off-site note goes in column (10) |
| Thu 6 | Night shift: in 22:00, out Fri 06:15 | 22:00 | 06:15 | — | Anchored to the shift-start day, as §09.5 anchors worked hours; confirmed at the §20 desk read (§09.14-A14) |
| Fri 7 | Night shift: in 22:00, out Sat 8 06:10 | 22:00 | 06:10 | — | As Thu 6; Fri 7's own day cell is not used for the 06:15 out |

For this excerpt column (8), total days worked, counts Sat 1 (once regularised), Mon
3, Wed 5, Thu 6 and Fri 7 — five days; the leave day and the weekly off are not days
worked. Column (9) carries §09.6's overtime figure for the month and is never keyed
by hand (TV19).

**Form IV — Register of Wages, Overtime, Advances, Fines and Deductions** (read
column by column, r5). It has 33 columns and serves three functions: the general
wage register, the fines register and the deductions register. A generic gross/net
payslip schema cannot produce it.

| Columns | Content |
| --- | --- |
| (1)–(17) | Employee identification and earnings per the gazette form. Research did not itemise these, so they are transcribed from the form at build and checked against it |
| (18)–(27) | Deductions, each its own column: EPF; ESIC; Society; Income Tax; Insurance; Advances; Recovery on account of Fine; Recovery of Damages/Losses; Total Deductions; Others |
| (28)–(33) | Date of Payment; Receipt by employee / Bank transaction ID; Nature of acts and omissions for which fine imposed, with date; Amount of fine imposed; Damage or loss caused to the employer by neglect or default of the employee; Signature of Employer / Employer Representative (physical registers only) |

The gazette prints column number (28) twice, a typesetting glitch. The renderer
follows the form's printed order and records the anomaly rather than renumbering.
r.51(2) designates the Deputy Chief Labour Commissioner (Central) with jurisdiction
as the s.19(8) authority. Fines therefore need an authority field, and a fine record
without the "nature of act or omission" and its date is incomplete. Columns (18)–(27)
must reconcile to the payslip and to the 50% deduction cap (s.18(3), above).

**Custody, form and medium — the textual risks** (r5):

- **Electronic maintenance is defined three ways.** Wages r.2(j) defines
  "electronically" narrowly: email, a designated portal, a mobile application, a
  website or digital payment. That does not unambiguously cover a private employer
  database. OSH r.72(5) and SS r.53(5) adopt the IT Act s.2(r) "electronic form"
  definition. IR r.47(1) makes electronic maintenance *compulsory* for its records
  without defining it. No customer-facing claim of "fully electronic statutory
  registers" under the Code on Wages ships without legal clearance (Part D-20, §23).
- **"In ink" versus "electronically or otherwise".** SS maternity Schedule para
  11(a)(2) requires Form XXII entries "in ink", which contradicts r.53(1)(b). Form
  XXII therefore ships with a print-and-sign fallback, and the product states which
  mode the tenant chose.
- **Three-kilometre custody.** OSH r.72(4) and SS r.53(3) require registers at an
  office or building within the workplace precincts, or within three kilometres.
  The two are not identically worded: SS reserves the dispensing power to the
  Central Government. The product provides an on-demand, per-establishment local
  export and print, so an Inspector-cum-Facilitator can be served on site.
- **Manual registers carry their own regime** (OSH r.72(7)). Entries are made
  legibly in ink, in English or Hindi and the local language, and signed. Where an
  original is lost, true copies are preserved "for a specified period" that the
  Rules never define. That period, and IR r.47(2)'s bare "requirement of retention
  of records", are counsel items. The product surfaces no number for either
  (Part D-11, §23).
- **The leave register's destruction bar.** OSH r.76(2) bars destroying the leave
  register even after five years unless it has been transferred to a new register.
  This is a **conditional destruction gate**, not a timer: the retention engine
  (§14) refuses destruction until a transfer event is recorded.

#### What OSH Code s.33 asks the store to hold — particulars against registers

The forms are renders; the Code states what they render. OSH Code s.33(a) requires the
employer to keep a register "in prescribed form, electronically or otherwise",
carrying the prescribed particulars of workers, including (i) the work they perform;
(ii) the hours of work that make up normal working hours in a day; (iii) the day of rest
allowed in every period of seven days; (iv) the wages paid and the receipts given for
them; (v) leave, leave wages, overtime work, attendance and dangerous occurrences; and
(vi) the employment of adolescents. s.33(c) requires wage slips "in electronic forms or
otherwise", and s.33(d) returns "electronically or otherwise" (r5/04 finding 14; the
text of s.33(b) is not quoted in the captured research). Because state forms differ
from the central ones (EV-053), the store is specified against these particulars, and
each form, central or state, is a render of them. A state form that asks for a
particular the store holds needs a render rule, not a schema change; a state form that
asks for something outside this list is a state-onboarding item (§22).

<!-- DIAGRAM: statutory-spine-osh-s33-coverage -->

| s.33 particular | Held in the store as | Central render (EV-053, EV-055) | What the product adds, or the open parameter |
| --- | --- | --- | --- |
| (a)(i) Work performed | Designation and posting per period (§07, §14); the day's place of work and any off-site assignment (§09) | Form I fields 11 and 14; Form IX columns (4), (6) and (10) | Whether designation and posting discharge "work performed" is read form by form; the store keeps no free-text duty description unless a state form asks for one (`osh.s33.work_performed_render`, §20) |
| (a)(ii) Normal working hours in a day | The shift assigned per day and its scheduled hours (§09.4) | Form IX column (5), Shift | The central form names the shift, not its hours; the shift's hours render wherever a state form asks |
| (a)(iii) Day of rest in every seven days | The roster's rest day per seven-day period (§09.4) | Form IX's day grid, the non-working day shown under `form_ix_non_working_marker` | s.33 requires the record only; the rest-day rule and its roster flag are §09.4's |
| (a)(iv) Wages paid and receipts | Payment records per wage period (§08) | Form IV columns (28) and (29); the wage slip | — |
| (a)(v) Leave and leave wages | The leave ledger (§09.7) | FORM-XX | The r.76(2) destruction gate (L5–L6 below) |
| (a)(v) Overtime work | Overtime derived from punches (§09.6) | Form IX column (9); Form IV's earnings columns, transcribed from the gazette at build | Any quarterly ceiling is warn-only (K-04, R17) |
| (a)(v) Attendance | Punch pairs and day status (§09) | Form IX columns (7) and (8) | — |
| (a)(v) Dangerous occurrences | The accident and occurrence event the spine already requires (§06.3, accident reporting) | FORM-XIX (r.75, which cites s.33(a)(v)) | The same event renders ESI's Form 11 while the Regulations are saved (above) |
| (a)(vi) Employment of adolescents | A per-period flag derived from date of birth (Form I field 6) against the Code's definition of an adolescent | No central Employee Register field names it | The definition was not read in any round: `osh.adolescent_definition`, no shipped value. Until it is set the flag is not derived, and a state form that asks raises a configuration task (TV69) |
| (c) Wage slips | One slip per wage period, reconciling to Form IV | Wages Form V, electronic or physical (r.52); OSH FORM-XVI, electronic (r.72(2)) | OSH r.72(3) deems the Wages slip to satisfy the OSH duty (EV-053), so one slip is issued |
| (d) Returns | Filing instances (§08 FR-PAY-711) | FORM-XVII and the other returns in §06.11 | — |

Two consequences for the build. First, a particular is never dropped because the
central form has no column for it: the shift's hours, and the date of birth the
adolescent flag will be derived from, are held even where Form I and Form IX do not
print them, because a state form may. Second, the
wording "electronically or otherwise" in s.33 does not settle whether a private
employer's database is "electronic" under each rule-set's own definition — that is the
three-definition risk above, and no claim of fully electronic registers ships without
clearance (Part D-20).

#### The register instance — lifecycle and retention clock

Every register is held as period-scoped instances, one per establishment per period,
so each has a determinable "date of last entry" (EV-054; r5/04 finding 44). §14.7 owns
the deletion engine and the holds; this is the register's own machine and the clock
arithmetic it hands to §14.

| Register | Instance period | Basis |
| --- | --- | --- |
| Form IX (FORM-XIV) | Calendar month | The form is headed "For the Month of" (EV-055) |
| Form IV (FORM-XV) and the wage slip | Wage period | One slip per wage period (Wages r.52), reconciling to Form IV |
| FORM-XX, leave with wages | Calendar year | A product choice anchored on r.76(1), under which each employee's leave record is shared once a calendar year on demand |
| Form I (FORM-XIII), FORM-XIX, Form XXII | Not captured | `register.close_cadence.<register>`, no shipped value, decided with counsel — a register that never closes never starts its clock (§14.7) |

<!-- DIAGRAM: statutory-spine-register-lifecycle -->

| # | From → To | Event | Guard | Side effect | Who may trigger |
| --- | --- | --- | --- | --- | --- |
| L1 | — → OPEN | Period starts | The establishment is covered by the register's rule-set | Instance created with its rule-set, sphere and state form version (EV-053) | System |
| L2 | OPEN → CLOSED | Period ends | Every source run for the period LOCKED (§08 FR-PAY-301); every Form IX cell paired or explained | Date of last entry fixed; renders frozen; on-site export and print available (EV-054 custody) | System, on the operator's month close |
| L3 | CLOSED → CLOSED | Post-close correction | Made through a correction run or regularisation, never by editing the instance | An amendment entry appended with its date (§09 FR-STAT-002). Whether it counts as an "entry" that restarts the clock is `retention.amendment_restarts_clock` — default yes, the longer reading, flagged to counsel (§23) | Payroll operator plus approver |
| L4 | CLOSED → ELIGIBLE | The clock expires | The latest expiry among the rule-sets the instance satisfies (below) | A scheduled review; nothing is destroyed here | System |
| L5 | ELIGIBLE → TRANSFER_REQUIRED | Destruction requested for a FORM-XX instance | OSH r.76(2) | Destruction refused until a transfer to a new register is recorded | System |
| L6 | TRANSFER_REQUIRED → ELIGIBLE | Transfer recorded | A transfer event naming the successor instance; what "properly transferred" requires is a counsel item (§23) | The gate releases | Payroll operator plus approver |
| L7 | ELIGIBLE → DESTROYED | The deletion engine runs | No `RetentionHold`; every longer floor held under §14.7.1 has run | Content crypto-shredded or tombstoned; a destruction record kept | §14.7.2 engine |
| L8 | CLOSED or ELIGIBLE → HELD | A hold is placed | An inquiry, a dispute or a reopened assessment (§14.4.12) | Destruction suspended; reads continue | Named approver, or the system on a recorded notice |
| L9 | HELD → CLOSED | The hold is released | — | The clock re-evaluated from the date of last entry | Named approver |

**The clock, worked.** Form IX for August 2026 closes on 31 August 2026. The one
canonical instance satisfies the Wages, OSH and SS duties at once (the
non-duplication provisions, EV-053), so it takes the latest of their clocks:

- Wages r.51(4), "five years after the date of last entry": 31 August 2031.
- OSH r.72(1)(vii) and SS r.53(1)(e), "five calendar years from the date of last
  entry": 31 August 2031 on an anniversary reading; 31 December 2031 if the five
  calendar years are counted as the whole years 2027 to 2031.

The different wordings are a verified divergence whose intent is unknown (r5/04). Until
counsel reads it, `retention.calendar_years_reading` has no shipped value and the
engine applies the later date, so the instance becomes ELIGIBLE after 31 December
2031. An amendment on 20 October 2026 moves the anniversary dates to 20 October 2031
and leaves the year-end reading at 31 December 2031. FORM-XX for calendar year 2026
closes on 31 December 2026; both readings, and r.76(2)'s "five years after the last
entry", give 31 December 2031 — and the instance still cannot be destroyed until L6
records a transfer (TV48). None of this says five years is the whole retention need:
longer floors from other statutes are counsel items (Part D-11, §14.7.1).

#### Registers against filings — the reconciliation matrix

The register and the return are built from the same stores (R19), so any difference
is a defect. It is caught as SA-REC (§08 FR-PAY-713) before the verification gate,
because after payment initiation a downward ECR correction is impossible (EV-037).

| Register value | Filing value | Relation | Checked at |
| --- | --- | --- | --- |
| Form I field 18, UAN | ECR field 1 | Equal | Pre-run |
| Form I fields 2–3, name | ECR field 2, name as per UAN | **Not** required to be equal: two stored values (§07 FR-CHR-009a). A mismatch is shown, never "fixed" by overwriting either | Pre-run |
| Form I field 19, PAN | Form 138 deductee PAN | Equal | Pre-run |
| Form I field 23, ESIC IP No. | The ESI upload's member identifier | Equal | Pre-run |
| Form I field 31, date of exit | EPFO's recorded date of leaving | Equal; where EPFO's is wrong, the joint-declaration path (EV-041) | Pre-run |
| Form IV column (18), EPF | ECR field 7 for the member and month | Equal | The verification gate (§08 FR-PAY-301 M10) |
| Form IV column (19), ESIC | The ESI employee contribution for the member and month | Equal | The verification gate |
| Form IV column (21), income tax | Form 138 Annexure I tax deducted, summed over the quarter's payments | Equal per quarter | Quarter end |
| Form IV column (26), total deductions | Half the period's wages (s.18(3)) | Not above | Pay run |
| Form IV column (28), date of payment | The s.17(1) due date | Not later, or a late-payment flag | Pay run |
| Form IX column (8), days worked | ECR field 10 and the paid-days figure | Related through the day-status ledger, not equal (§09 FR-FIL-001) | Month close |
| Wage slip (Form V or FORM-XVI) | The Form IV row for the same period | Equal, line by line | Pay run |

Form IV's deduction columns are taken in the order the gazette prints them — EPF (18),
ESIC (19), Society (20), Income Tax (21), Insurance (22), Advances (23), Recovery on
account of Fine (24), Recovery of Damages/Losses (25), Total Deductions (26), Others
(27) (r5/04 finding 17) — and checked against the form at build, like columns (1) to
(17).

#### The inspection export and the print-and-sign mode

Registers must be kept at the workplace or within three kilometres of it (OSH
r.72(4); SS r.53(3), whose dispensing power sits with the Central Government), and
manual registers must be produced "electronically or by speed post, on demand" (OSH
r.72(7)(iii), r5/04 finding 13). The product meets both with one artefact per
register, establishment and period — the inspection export — and records which
maintenance mode each register uses.

| Element | Content |
| --- | --- |
| Header | Establishment name, employer, owner, PAN/TAN and LIN, as on Form I's header (EV-055) |
| Scope | Register, rule-set and form label keyed on rule-set plus form (R19), the state form version, the period |
| Content | The closed instance, with every amendment entry and its date |
| Integrity | A hash of the rendered content and the render version, so a later re-render can be shown to match |
| Mode | Electronic, or print-and-sign, per register and establishment |
| Custody | Where the printed copy is kept and the tenant's declaration that the site is within the precincts or within three kilometres |
| Generated | Timestamp and requesting user |

**Print-and-sign.** Form XXII ships with it because of the "in ink" requirement (SS
maternity Schedule para 11(a)(2)); any register can use it where a tenant keeps a
physical register. A printed register follows OSH r.72(7)(i): entries legible, in
English or Hindi and in the local language, signed by the employer. The language pair
per state is `register.print_languages.<state>` (§20). In that mode the signed paper
is the register of record: the product stores a scan as a document linked to the
instance, with its hash, and marks the instance so no one mistakes the electronic
render for the register itself (TV59). Where a manual original is lost, OSH
r.72(7)(ii) keeps true copies "for a specified period" the Rules never define — a
counsel item for which the product surfaces no number (above).

**Contract labour under the OSH Rules — returns, not registers** (r5). A principal
employer files an **annual return in FORM-XVII Part III** electronically by the last
day of February following each calendar year (r.98(9)). It is not owed for a
contract that undertakes to produce a given result. The return's table is
contractor-wise and monthly:

- the contractor's name, address and LIN, and the name of the work;
- the maximum number of contract labour employed;
- the amount paid against the wage bill to the contractor, including EPF, ESIC and
  bonus, and the date of that payment;
- the amount of wages the principal employer paid directly to contract labour, and
  the date of that payment.

The return's columns come from four places, and one of them is outside payroll:

| FORM-XVII Part III column | Source | Handling |
| --- | --- | --- |
| Contractor's name and address; contractor's LIN; name of the work | Contractor master and work order (§09.9-A) | Required before the contractor's first deployment |
| Maximum number of contract labour employed, per month | Daily deployment records — the month's maximum day, the same daily count as §06.1 | Derived, never keyed |
| Amount paid against the wage bill to the contractor, including EPF, ESIC and bonus; date of that payment | The principal employer's accounts payable — outside payroll | Imported per contractor per month; a missing month is an open item on the return, never a zero (TV62) |
| Wages paid directly to contract labour by the principal employer; date of that payment | The r.98(8) guarantee payments, made through payroll (§08) | Derived from the payment records |

The contractor's own duties, which the principal employer's module tracks:

- a half-yearly return in FORM-XVIII within 30 days of the close of each half,
  January–June and July–December (r.98(7));
- work-order intimation within 15 days on the Shram Suvidha portal (r.94);
- the licence forms, FORM-XXI (application) and FORM-XXII (proforma of licence);
- an experience certificate in FORM-XXIII (r.100).

Contract-labour wages are due before the seventh day after the wage period ends
(r.98(2)), by bank transfer or electronically save where impracticable (r.98(4)).
If the contractor has not paid within seven days of the wage period ending, the
principal employer pays in full, or pays the unpaid balance, within fifteen days.
It may recover by deduction from sums due under any contract, as a debt, or from
the security deposit (r.98(8)). That trigger is an alert with a clock, not a report.

**Form-number collisions are real.** "FORM-XXIII" is the SS unified annual return in
the Social Security Rules and a contractor's experience certificate in the OSH
Rules. Form numbers therefore key on (rule-set, form), never on the form string
alone. This is the labour-code twin of the "Form 16" collision (§06.5).

**Self-declaration.** Every establishment to which CoSS "Chapter III ... and Chapter
IV" (EPF and ESI) apply submits a self-declaration in **Part IV of FORM-XVII**
electronically (OSH r.72(8), r5). Whether "and" needs both is
`osh.form_xvii_part_iv_chapter_test`; until counsel sets it, the task is raised where
either applies (§06.1). Its timing is not captured separately. It is calendared with
the annual return until confirmed (§06.13).

#### The November 2026 cliff

This is the single most time-critical item in the register, and the one the
standing "check for a corrigendum" rule exists because of.

- **The EPF Act 1952 is repealed with effect from 21 November 2025.** Corrigendum
  S.O. 5936(E) of 19.12.2025 substituted the S.O. 5319(E) entries so that all of CoSS
  s.164(1), including item 3 (the EPF Act repeal), commenced on 21.11.2025.
  **[Verified]**
- **CoSS s.164(2)(b)** — commenced by the same corrigendum — saves the **EPF Scheme
  1952, EDLI 1976, EPS 1995 and all ESI rules, regulations and schemes for one year**,
  expiring on or about **21 November 2026**. **[Verified]**
- **The EPF side has a named successor:** the **Employees' Provident Funds Scheme,
  2026**, with **12% re-notified retrospectively to 21.11.2025 by S.O. 3582(E)**.
  **Build against Scheme 2026.** **[Verified]** Per the reproduced scheme text, the
  Scheme commences on its publication in the Official Gazette, 29 June 2026, not
  on the widely reported 1 July 2026 (r1, medium). EPFO's website still titles its
  legal-framework page "EPF Scheme 1952", so the regulator's own pages lag the
  instrument. S.O. 2698(E) (interest), S.O. 2701(E) (inspection charges) and
  S.O. 2702(E) (wage ceiling), all of 29 May 2026, are made under the Code (r1, r2).
- **The ESI side is unresolved.** We are not aware of any successor instrument for
  the ESI rules, regulations and schemes after the one-year saving lapses, as of
  September 2026. This is a **payroll-engine
  correctness blocker** that needs a primary-source answer before the date.
  **Ungraded (open), EV-004** — no authoritative instrument exists to grade, so it is
  not re-badged [Hypothesis] (§02) — **kill criterion: monitor ESIC and MoLE notifications; if no
  successor/extension is notified before ~21 Nov 2026, ESI computation post-cliff
  is undefined and must be escalated, not guessed.** (§20.6.)

> **Trap for anyone re-verifying (kept verbatim in substance because it is
> load-bearing):** indiacode.nic.in's bare-Act footnote still reproduces the
> uncorrected **S.O. 5319(E)** enumeration. Verifying against indiacode or the
> original gazette alone reproduces this exact error — which is how one research
> round concluded the opposite. The trap is live: the latest research round's
> registers work re-read S.O. 5319(E) without S.O. 5936(E) and again concluded, at
> medium confidence, that the EPF Act survives and the one-year sunset never
> started. That reading is superseded by the corrigendum. **The corrigendum must be
> checked.** **[Verified]**

**Product implication.** (a) The PF engine is built against **Scheme 2026** with
the 12% as a notified variable. (b) The ESI post-cliff behaviour is an open item
tracked on the validation gate, and the statutory-change watcher must be keyed to
**catch amendments and corrigenda, not just new instruments** (§22) —
a watcher keyed only to new notifications would have missed the corrigendum that
inverted the entire November 2026 analysis. (c) State-rule divergence under the
Codes is a first-class effective-dated dimension, not an exception path.

#### After the cliff — what the engine does, and the decision it cannot make alone

On 11 September 2026 the saving has about 71 days to run. §02 holds the instrument
timeline; this is the engine's behaviour in each outcome (§05 routes "ESI after the
cliff" here).

<!-- DIAGRAM: statutory-spine-esi-cliff-scenarios -->

| Scenario | What the watcher sees | Engine behaviour | Filing instances |
| --- | --- | --- | --- |
| S1 · Successor instrument before the date | A notification, checked for corrigenda (§22 FR-RULE-005) | New rule versions effective from the instrument's date; earlier periods stay on the saved rules | Unblocked on publication (FR-PAY-711 F3) |
| S2 · Saving extended | An extension of the saved subordinate law | `effective_to` moved on the saved rule versions; no computation change | Never blocked |
| S3 · Nothing by the date | No instrument | Computation per `esi.post_cliff_mode`; the verification gate shows the mode on every affected month | BLOCKED-pending-regime (§08 AC-702.2) |
| S4 · Instrument after the date, with retrospective effect | A notification whose effective date precedes its publication — the retrospective tell (§02) | Every affected month recomputed against the new version (R3); diffs recorded against anything filed | Corrections raised as diffs (R14) |

**The straddling month.** Wage month November 2026 runs across the date: about three
weeks of it fall under the saved rules and the rest under whatever follows, and its
contribution is due by 15 December 2026. Unless a successor's transitional text says
how to split it, the split is `esi.cliff_month_split`, with no shipped value (§20).
The October 2026 – March 2027 contribution period straddles the date too: a member
latched to that period's boundary (§06.3) is latched under rules that may not survive
to 31 March 2027, so the latch is re-evaluated under whatever S1, S2 or S4 publishes.

**`esi.post_cliff_mode` — the tenant's decision under S3.** No default ships. The
tenant's approver owns it, advised by counsel (§23); the product's statutory lead
tracks it; it must be set before the November 2026 payroll month locks.

| Mode | What the engine does from the date | The exposure it leaves |
| --- | --- | --- |
| `deduct_and_hold` | Computes and deducts both shares at the saved rates and holds them as a liability | Money deducted from employees and not deposited; whether and where it can be deposited is the open question |
| `remit_if_portal_accepts` | As above, and remits through the attended ESIC session if the portal still takes contributions (§22) | A remittance under an undefined regime, reversed if S4 publishes different terms |
| `compute_only` | Computes both shares, deducts nothing, and accrues both as a contingent liability | Whether employee shares can be recovered from employees later at all is a counsel question (§23); any recovery the tenant makes sits inside the 50% deduction cap (above) |

For §06.3's worked establishment, E3 left ESI on 1 October 2026, so each post-cliff
month carries E1 and E2 only: ₹1,520 of contributions, ₹285 of it employee shares.
Over December 2026 to March 2027 that is ₹6,080 under any mode; under `compute_only`
the ₹1,140 of employee shares is undeducted, and any later recovery — itself a counsel
question — is one the cap may spread over several months.

**EPS and EDLI have the same shape.** EPF has a named successor in Scheme 2026; the
captured research names no successor for EPS 1995 or EDLI 1976 (§20 V-22, §06.13). The
ECR carries the EPS split in fields 5 and 8 and the EDLI base in field 6, so the four
scenarios apply to those fields as well. Blocking the whole ECR would stop EPF
remittance and start 12% interest (§06.2). The handling the product proposes to
counsel under S3 is to generate the ECR with the EPS and EDLI fields computed on the
last published rule versions, marked provisional at the verification gate, and to
have the named approver confirm before payment initiation — the last point at which a
downward correction remains possible (EV-037). It ships as
`epf.post_cliff_eps_edli_mode` with no default, set with counsel before the November
2026 month locks.

**What the product says, and when.** Every statement about the cliff is dated and
says only what was checked: that we are not aware of any successor instrument for the
ESI rules, regulations and schemes as of the stated date, and when ESIC and MoLE
notifications and corrigenda were last checked (Part D-16). It never predicts the
outcome. A tenant with an ESI obligation sees the date, the S1–S4 status and the
three parameters on its calendar now; the decision task opens with its October 2026
payroll month, so that it is decided before November's month locks, and escalates to
the named approver at the weekly cadence §20.10 runs from October 2026.

---

### 06.10 The wage-definition problem — the hardest single calculation

This is not a separate statute; it is the **shared base** that re-computes EPF,
gratuity, bonus and more under the Codes. The first research round flagged it as "the hardest single
calculation in the build," and it belongs in the spine because it silently
re-bases half the other entries in this section.

**The 50% add-back rule.** Identical text in **Code on Wages s.2(y)** and **Code
on Social Security s.2(88)**: "wages" excludes certain components (HRA, conveyance,
bonus, overtime, commission, employer PF/pension contribution, etc.), **but if the
sum of excluded components exceeds one-half of all remuneration, the excess over 50%
is deemed to be wages and added back**. This prevents employers from suppressing the
PF/gratuity base by loading pay into allowances. **[Verified]** Only the excluded heads
(a)–(i) enter the test; gratuity and retrenchment compensation do not. MoLE's own
worked example (FAQ of 30.12.2025, Q7) is internally inconsistent on this point, so
the engine adopts the (a)–(i) reading — the one that matches MoLE's stated answer —
and documents it.

The nine in-scope heads, which the component catalogue (§08) tags one by one (r3,
MoLE handbook Annexure 1):

- (a) statutory bonus;
- (b) the value of house accommodation, light, water, medical attendance or other
  amenity;
- (c) the employer's PF or pension contribution, and interest on it;
- (d) conveyance allowance or travelling concession;
- (e) sums paid to defray special expenses entailed by the nature of the employment
  (an earlier draft omitted this head);
- (f) HRA;
- (g) remuneration under an award, settlement or court order;
- (h) overtime allowance;
- (i) commission.

Gratuity (j) and retrenchment compensation or ex-gratia (k) are outside the test.
Remuneration **in kind** up to 15% of total wages is deemed part of wages (s.2(88)
Explanation, r1). The in-kind value is therefore a separate, capped input, not an
allowance.

MoLE's example, recomputed (r2), is the fixture that pins the reading. Total
remuneration is ₹76,000: Basic+DA ₹20,000, allowances ₹40,000, and gratuity and
retrenchment compensation ₹16,000. Half is ₹38,000.

- On the (a)–(i) reading, the ₹40,000 of allowances exceeds half by ₹2,000, and
  revised wages are ₹22,000. That is MoLE's stated answer.
- MoLE's own "total allowance paid ₹56,000" line wrongly pulls gratuity and
  retrenchment into the test. It would give an excess of ₹18,000 and wages of
  ₹38,000.

The engine implements the first, comments the source, and expects auditors to
arrive with the second (TV25).

**Consequence — multiple concurrent wage bases on one payslip.**

- The **add-back base** (for PF, gratuity, bonus-adjacent computations) *excludes*
  conveyance, HRA, award settlements and overtime — then adds back any excess over
  50%.
- The **equal-pay / payment-of-wages base** *includes* those same components.
- **ESI's gross base** (§06.3) is a third, wider still.
- The **bonus base** (§06.7) is a fourth, capped at the notified amount or the minimum
  wage, whichever is higher (legacy notified amount ₹7,000).

So the engine needs **at least four concurrent wage computations per employee, per
period**. A single "wage" field is a design error, and the wrong choice of base is
the single most common source of a materially wrong filing.

**"Or such other per cent as may be notified."** The statute makes the 50% a
**standing notified variable**, not a constant. This is the permanent justification
for effective-dating the wage-definition rule, independent of any transitional
argument. **[Verified]**

**Requirement (carried verbatim from an earlier draft, because it is a hard acceptance criterion):**
the wage-definition rule must be **versioned, effective-dated, and retrospectively
recomputable with an audit trail. Arrears and retro runs must recompute against
the rule version in force for the period being corrected, not the version in force
today.**

Worked illustration of the add-back. Monthly CTC ₹1,00,000 structured as Basic
₹35,000, HRA ₹20,000, conveyance ₹10,000, commission ₹35,000. Excluded
components (HRA + conveyance + commission, all among heads (a)–(i)) = ₹65,000 =
65% of ₹1,00,000. **[Reversed]** An earlier version of this example reached 65% by
treating a "special allowance" as excludable. Special allowance is not an excluded
head, and relabelling universal pay does not move it out of wages (the *Vivekananda
Vidyamandir* principle, §06.2). Half of remuneration = ₹50,000. Excess over 50% = ₹15,000, **added
back to wages**. PF wage base becomes ₹35,000 + ₹15,000 = ₹50,000 (then capped at
₹15,000 ceiling for statutory PF, or actual if the employer opts in). The add-back
materially raises the gratuity base (which has **no** ceiling) even where the PF
₹15,000 ceiling absorbs it — which is exactly why gratuity and PF cannot share one
base field.

Counter-case (no add-back triggers): Basic ₹55,000, HRA ₹22,000, conveyance ₹8,000,
overtime allowance ₹15,000 on the same ₹1,00,000. Excluded = ₹45,000 = 45% < 50%, so **no
add-back**; the PF/gratuity base is the ₹55,000 basic (capped at ₹15,000 for PF). The
rule is a conditional, evaluated per employee per period against that period's
structure — not a fixed formula.

**Product implication.** The wage engine is the foundation the whole spine sits on:
multiple concurrent bases, effective-dated definitions, retro-recompute against the
period's rule version, full audit trail. Get this wrong and every downstream filing
(ECR, ESI, Form 138, gratuity, bonus) is wrong. This is the single strongest argument
for the "compliance-maintenance operation, not feature-velocity startup" org shape (§22).
The bounded fixed-point evaluation the add-back needs — it re-bases components that
feed its own test — is specified in §08 and §15.

---

### 06.11 The consolidated filing calendar

The obligations above collapse into a recurring calendar. The product's headline
metric is **filings completed on time** (§01), so the calendar is not a report — it
is the operating surface. The dominant monthly rhythm clusters on the **7th and
15th**.

<!-- DIAGRAM: statutory-spine-filing-calendar -->

| Due | Filing | Instrument | Frequency |
| --- | --- | --- | --- |
| **7th** (30 Apr for March) — dates to be confirmed against r.218 | TDS deposit (s.392) | Income-tax Rules 2026 r.218 | Monthly |
| **15th** | **EPF ECR** return, approved before the challan; interest paid with the contribution | EPF Scheme 2026; EV-036, EV-039 | Monthly |
| **15th** | **ESI** contribution | ESI (subordinate law saved to the cliff, §06.9) | Monthly |
| **Per state, per registration** | PT return — due days are parameters `pt.<state>.due_day`, and none is captured. v0.3's state due days are carried, not re-captured. Maharashtra assigns frequency per registration each year, so it is ingested from MAHAGST, never derived; Odisha returns are annual and online only (r2) | State PT | Monthly / annual |
| **31 Jul / 31 Oct / 31 Jan**; **31 May** of the following year | **Form 138** (ex-24Q) Q1–Q3; **Q4 blocked pending an unpublished format** (EV-046) | r.219 (EV-049) | Quarterly |
| **30 Sep / 31 Mar** | ESI contribution period ends; a ceiling-crosser exits from 1 Oct / 1 Apr (coverage re-evaluation) | ESI | Half-yearly |
| **Per state (parameter `lwf.<state>.due`); Karnataka 15 Jan** | LWF remittance | State LWF | Per state: half-yearly / annual |
| **28/29 Feb** | Unified annual return **Form XXIII** — employers to whom CoSS Ch. V and VI apply (both-or-either reading per `ss.form_xxiii_chapter_test`, §06.1) | SS (Central) Rules 2026 r.53(5)(a) | Annual |
| **Last day of Feb** | OSH annual return **Form XVII** (central sphere). r.72(5) pairs "FORM-XVII and XVIII", but Form XVIII is a contractor's half-yearly return, not an every-employer filing (r5) | OSH (Central) Rules 2026 r.74 | Annual |
| **Last day of Feb** (following each calendar year) | Principal employer's contract-labour annual return, **FORM-XVII Part III** — contractor-wise monthly table (§06.9) | OSH (Central) Rules 2026 r.98(9) | Annual |
| **Timing not captured** — calendared with the annual return until confirmed | Self-declaration, **FORM-XVII Part IV**, by establishments under CoSS Ch. III and IV (both-or-either reading per `osh.form_xvii_part_iv_chapter_test`) | OSH (Central) Rules 2026 r.72(8) | Annual (assumed) |
| **Within 30 days of each half-year** (Jan–Jun, Jul–Dec) | Contractor's half-yearly return, FORM-XVIII — tracked by the principal employer, filed by the contractor | OSH (Central) Rules 2026 r.98(7) | Half-yearly |
| **Within 15 days** of a work order | Contractor's work-order intimation on Shram Suvidha — tracked by the principal employer | OSH (Central) Rules 2026 r.94 | Event |
| **7 days after the wage period, then 15 days** | Contract-labour wage guarantee: if the contractor has not paid, the principal employer pays within fifteen days and recovers | OSH (Central) Rules 2026 r.98(8) | Per wage period |
| **Within two working days** of removal, dismissal, retrenchment or resignation | Full-and-final wages (subject to s.17(3) and other laws' limits under s.17(4)) | Code on Wages s.17(2) | Event |
| **Within 60 days** of existence; changes **within 30 days** | Establishment registration and change-of-particulars intimation (handbook level) | OSH Code; MoLE Handbook 5.1 (r3) | Event |
| **Within one month** of sale or abandonment; **four months** of discontinuance | Further return | SS r.53(5)(b); OSH r.72(6) (r5) | Event |
| **Configurable** (legacy: 30 Nov) | Bonus payout and the period's annual return (legacy Form D) | Code on Wages s.26; legacy POB Act | Annual |
| **15 Jun** of the year following the Tax Year | **Form 130** (ex-Form 16) — TRACES-generated; for Tax Year 2026-27, **blocked pending Q4** | r.215(1); EV-048 | Annual |
| **Within 30 days of becoming payable** | Gratuity payment | CoSS s.56 | Event-driven |
| **On or before each wage payment** | Wage slip (Wages Form V / OSH Form XVI) | Wages Rules r.52 | Per wage period |
| **On appointment**, establishments of 10+ workers | Appointment letter in the state-prescribed form (K-18) | OSH Code s.6(1)(f) | Event |
| **Continuous** | Six registers (EV-053), retained and kept per EV-054 | Wages / OSH / SS Rules | Continuous |

Four structural facts the calendar must encode:

1. **State-varying due dates.** PT and LWF due dates and frequencies differ by
   state, so a multi-state tenant has multiple parallel calendars. The calendar is
   derived per (tenant × state × obligation), effective-dated.
2. **The quarterly TDS layout is versioned.** Q1–Q3 of Tax Year 2026-27 file on the
   published Form 138 layout; the **Q4 regular and correction formats are
   unpublished** (EV-046), and TRACES builds Form 130 from Q4 Annexure II. The
   calendar must show Q4 (31 May 2027) and Form 130 (15 June 2027) as
   **blocked-pending-format**, not merely "future" — two dates fifteen days apart
   that cannot be planned independently.
3. **Annual accruals surface late but must accrue early.** Bonus and the gratuity
   accrual are annual/continuous liabilities whose *filing* is late in the cycle but
   whose *accrual* runs every period — the calendar must show both the accrual
   cadence and the payout deadline, or the customer is surprised at year end.
4. **An uncaptured date is shown as uncaptured.** Where a due day is a parameter
   with no captured value (state PT and LWF days, the Part IV self-declaration, the
   Code-era bonus deadline), the calendar renders an **unconfirmed** date. It does
   not invent one. No on-time metric (§19) may be computed against an unconfirmed
   date.

#### Due-date arithmetic, per obligation

Each due date is computed from the period by the rule its instrument states. Where the
instrument's words leave a step open, the step is a parameter, not a habit.

| Obligation | Rule as captured | Arithmetic | Open step |
| --- | --- | --- | --- |
| EPF contribution and ECR | Within fifteen days of the close of every month (EPF Scheme 2026; r1/06 finding 18) | Month end + 15 days, the 15th | `calendar.ecr.holiday_roll` |
| ESI contribution | Within 15 days of the last day of the calendar month (§06.3) | The 15th | `calendar.esi.holiday_roll` |
| TDS deposit | Income-tax Rules 2026 r.218, not read | Carried: the 7th, and 30 April for March | The dates themselves (§06.13) |
| Form 138 | r.219(4) (EV-049) | 31 July, 31 October, 31 January; 31 May after the Tax Year | — |
| Form 130 distribution | r.215(1) | 15 June after the Tax Year | — |
| Wages, monthly period | Before the expiry of the seventh day of the next month (Code on Wages s.17(1)) | The 7th | Other wage periods per s.17(1) (§06.9) |
| Full-and-final wages | Within two working days (s.17(2)) | Event + 2 working days | `wages.fnf_trigger_event`; `calendar.working_days.<establishment>` |
| Gratuity payment | Within 30 days of becoming payable (CoSS s.56) | Event + 30 days | — |
| SS Form XXIII | On or before 28 or 29 February, for the preceding year (SS r.53(5)(a)) | The last day of February — 28 February 2027, 29 February 2028 | — |
| OSH FORM-XVII | The last day of February following each calendar year (OSH r.74) | The last day of February | — |
| FORM-XVII Part III | The last day of February following each calendar year (r.98(9)) | The last day of February | — |
| Contractor's FORM-XVIII | Within thirty days of the close of each half-year (r.98(7)) | 30 July for January–June; 30 January for July–December | — |
| Work-order intimation | Within fifteen days (r.94) | Work order + 15 days | — |
| Contract-labour wage guarantee | The contractor pays within seven days of the wage period; failing that, the principal employer pays within fifteen days (r.98(2), (8)) | Alert at wage-period end + 7 days; principal employer's deadline at wage-period end + 15 days, with the later reading, day 22, shown alongside | `calendar.r98_8_clock_start` |
| Establishment registration; change of particulars | Within 60 days of existence; within 30 days of a change (handbook level) | Event + 60 days; event + 30 days | Re-read against the notified Rules (§06.13) |
| Further return on sale, abandonment or discontinuance | One month; four months (SS r.53(5)(b); OSH r.72(6)) | Event + 1 month; event + 4 months | — |
| PT and LWF | Per state | `pt.<state>.due_day`, `lwf.<state>.due` | Everything except Karnataka's LWF, 15 January (§06.8) |

Where r.98(8) leaves the start of the fifteen days open, the product sets the earlier
deadline and shows both, because a guarantee missed by a week is the costlier error.
A holiday-roll parameter left unset means the unrolled statutory date is shown and
used; no roll is assumed.

#### A derived calendar, worked — one tenant, October 2026 to January 2027

A 60-person tenant: one legal entity with one TAN; a Bengaluru establishment of 38
employees and a Pune establishment of 22, each with its own EPF and ESI codes and its
state's PTRC (§07 FR-CHR-021–022). Structure and headcounts are illustrative inputs;
the S3 rows assume no ESI successor is published (above).

| Due | Instance | Registration | Status on 11 September 2026 | Note |
| --- | --- | --- | --- | --- |
| 7 Oct, 7 Nov, 7 Dec 2026; 7 Jan 2027 | TDS deposits for September to December | TAN | Scheduled — dates **unconfirmed** | The carried 7th; r.218 unread; no on-time metric computed against them (rule 4 above) |
| 15 Oct 2026 | ECR, wage month September | Two EPF codes | Scheduled | Each Regular return needs every May 2026 member returned (M−4) |
| 15 Oct 2026 | ESI, September | Two ESI codes | Scheduled | The last month of the April–September period: ceiling-crossers leave from 1 October |
| 31 Oct 2026 | Form 138, Q2 | TAN | Scheduled | RPU 1.2 and FVU 1.2 |
| 15 Nov 2026 | ECR and ESI, October | Four instances | Scheduled | — |
| ~21 Nov 2026 | The ESI saving lapses | — | Watched | `esi.post_cliff_mode` set before November's month locks |
| 15 Dec 2026 | ECR, November | Two EPF codes | Scheduled; EPS and EDLI fields provisional under S3 | The straddling month |
| 15 Dec 2026 | ESI, November | Two ESI codes | BLOCKED-pending-regime under S3 | `esi.cliff_month_split` |
| 15 Jan 2027 | ECR and ESI, December | Four instances | ECR scheduled; ESI blocked under S3 | — |
| 15 Jan 2027 | LWF, Karnataka, calendar year 2026 | Bengaluru | Scheduled; amount unverified | The one verified LWF periodicity (§06.8) |
| 31 Jan 2027 | Form 138, Q3 | TAN | Scheduled | — |
| Per registration | PT returns | Karnataka and Maharashtra PTRCs | **Unconfirmed** | Maharashtra assigns frequency per registration each year (MAHAGST list); Karnataka's frequency is unverified |
| Per state | Maharashtra LWF | Pune | **Unconfirmed** | Periodicity and amounts not captured (§06.8) |

That is twenty-three dated instances in four months, plus the unconfirmed PT and LWF
rows. The six TAN-level rows do not multiply with establishments; the rest do, which
is why the supervised-filing cost scales per registration rather than per employee
(EV-088, §22.7).

#### Sphere and source, per obligation

The threshold table (§06.1) records sphere per *threshold*. This table records it
per *obligation*: which instrument governs today, who sets the operative values,
where the product ingests them from, and what the watcher (§22) is keyed to. A row
whose values come from an appropriate Government other than the Centre is
per-state configuration by construction.

| Obligation | Governing instrument today (legacy in brackets) | Sphere / who sets operative values | Source of truth ingested | State as of Sep 2026 | Watch trigger (§22) |
| --- | --- | --- | --- | --- | --- |
| EPF contributions and the ECR | CoSS Ch. III; EPF Scheme 2026; EPS 1995 and EDLI 1976 saved to ~21.11.2026 [EPF Act 1952, repealed] | Central — S.O. 3582(E), 2698(E), 2701(E), 2702(E) | EPFO revamped-ECR circular, manual and FAQ at www.epfo.gov.in; e-gazette | File, lifecycle and return types Verified (EV-035–EV-045); EPS and EDLI successor instruments not captured | Corrigenda; ECR beta-to-GA circular; EPS/EDLI successors; ceiling revision |
| ESI contributions | CoSS Ch. IV; ESI rules, regulations and schemes saved to ~21.11.2026 [ESI Act 1948, repealed] | Central (ESIC); coverage by area notification | esic.gov.in coverage, contribution and wages pages; district annex | Rates and ceilings Verified; post-cliff regime Ungraded (EV-004) | Successor or extension notification; corrigenda |
| TDS on salary | Income-tax Act 2025 ss.392, 395(4), 397(3)(b), 398; Rules 2026 rr.215, 218, 219 [1961 Act for FY 2025-26 and earlier] | Central — CBDT; formats by Protean; certificates by TRACES | CBDT guidance notes and form mapping; Protean download pages; TRACES | Q1–Q3 Verified; Q4 formats absent (EV-046) | Protean Q4 anchors (regular and correction); Budget |
| Professional Tax | State PT Acts under Article 276; local bodies in Tamil Nadu and Kerala | State / local body; Maharashtra assigns frequency per registration | Each state's department page and Act | Maharashtra, Odisha Verified; Karnataka effect Verified; rest not captured | State budgets; MAHAGST's annual list; Odisha repeal question |
| Labour Welfare Fund | State LWF Acts, outside the Codes | State welfare boards | Board notifications | Karnataka periodicity only | Per state |
| Gratuity | CoSS Ch. V (ss.53–56); SS (Central) Rules 2026 [POG Act 1972, repealed] | Central statute; payable ceiling by Central Government notification | e-gazette | Code text Verified; ceiling notification not located | Ceiling notification |
| Maternity benefit | CoSS Ch. VI; medical bonus of ₹3,500 or a notified amount, payable only if the employer provides no free pre- and post-natal care (s.64, r1) | Central statute | e-gazette | Verified (r1) | Medical-bonus notification |
| Statutory bonus | Code on Wages s.26 [Payment of Bonus Act 1965] | Appropriate Government — ceilings per state | Central and state notifications | Percentages Verified; ceilings not located | Any s.26 ceiling notification |
| Minimum wages and floor wage | Code on Wages ss.6, 8(4), 9; Wages Rules 2026 | Appropriate Government; floor wage by the Centre | State notifications; twice-yearly VDA | Floor-wage notification not located (r1) | VDA revisions before 1 Apr and 1 Oct; floor wage |
| Wage timing, deductions, F&F | Code on Wages ss.16–18 | Appropriate Government may vary (s.17(3)); other laws preserved (s.17(4)) | Code text; state S&E Acts | Verified (r1) | State S&E changes |
| Registers and wage slip | Wages rr.51–52; OSH rr.72–76; SS r.53 (central) | Central text; state rules for most tenants | e-gazette; state gazettes | Central Verified (EV-053–EV-055); state forms not captured | State commencement of Code rules |
| Annual labour returns | SS Form XXIII (r.53(5)(a)); OSH Form XVII (r.74), Part III (r.98(9)), Part IV (r.72(8)) | Central text; state equivalents | e-gazette; Shram Suvidha | Central Verified (r5) | State rules |
| Appointment letter | OSH Code s.6(1)(f) | **State-prescribed** form | State rules | No state's form captured | State rules |
| POSH Internal Committee | POSH Act 2013 s.4(1); Local Committee s.6(1) — outside the Codes | Central statute | Act text | Verified (EV-056). The annual report's period is configurable: s.21 frames a calendar year, practice uses a financial year (r1, medium) | Amendments |
| Grievance Redressal Committee | IR Code s.4 | Central text | MoLE handbook; IR Rules 2026 | Verified (EV-057) | State rules |
| Contract labour | OSH Code s.45 and Rules r.94, r.98, r.100 | Central text; licences may be central for multi-state contractors | e-gazette | Verified (r3, r5) | State rules |
| Shops and Establishments | State S&E Acts — not superseded by the Codes (r1) | State | State Acts | Not captured | Per state |

**Which rule-set governs, per establishment.** The sphere column says who sets the
values. Resolving it for one establishment needs two facts the product does not
derive: the establishment's appropriate Government under each Code, captured at
onboarding with its basis (`appropriate_government.<code>`), and the date the state's
rules under that Code commenced (`code_regime.<state>.<code>`, §14.6.2), loaded from
the state's instrument and never assumed.

| Appropriate Government | State's rules under the Code | Rule-set for state-sphere matters | Forms and registers |
| --- | --- | --- | --- |
| Central Government | — | The Central Rules 2026 (G.S.R. 342(E)–345(E)) | The central forms (EV-053) |
| State | Commenced before the period | The state's rules under the Code | The state's forms, keyed on rule-set plus form |
| State | Not commenced by the period | The state's pre-existing rules and forms (§06.9) | The state's pre-existing forms |
| State | Commencement date not loaded | None resolved — a configuration task; the obligation still shows on the calendar | — |
| Not captured | — | None resolved — a configuration task | — |

A two-state tenant can sit in two of these rows at once — Bengaluru on Karnataka's
Code rules if they have commenced, Pune on Maharashtra's pre-existing rules if theirs
have not — and "the attendance register" is then two different forms with two
retention wordings (TV60). Individual state commencement dates come from a commercial
tracker and are not quoted here (§06.9); each is loaded from the state gazette.

#### The instrument register — the citations the rule rows carry

Every rule row cites its instrument (§14.6.1b `source_ref`). These are the instruments
this section relies on, with the identifiers research read. The commencement column
matters as much as the citation, because a provision can be quoted correctly and not
be in force (r5/04).

| Instrument | Identifier | Gazette record | Commences | Source · marker |
| --- | --- | --- | --- | --- |
| Code on Social Security 2020 | Act 36 of 2020 | CG-DL-E-29092020-222111 | By notification — below | r5/04 **[Verified]** |
| OSH Code 2020 | — | CG-DL-E-29092020-222112, 86 pp | By notification — below | r5/04 finding 14 **[Verified]** |
| Commencement of the Code on Social Security | S.O. 5319(E), 21.11.2025 | CG-DL-E-21112025-267882 | 21 November 2025, partial — read only with the corrigendum | r5/04 finding 23 **[Verified]** |
| Commencement of the IR Code, OSH Code and Code on Wages | S.O. 5320(E), 5321(E), 5322(E), 21.11.2025 | IDs 267883, 267884, 267885 | 21 November 2025; the Wages commencement is partial | r5/04 finding 23 **[Verified]** |
| Corrigendum to S.O. 5319(E) | S.O. 5936(E), 19.12.2025 | CG-DL-E-20122025-268694 | Substitutes Sl. Nos. 2, 3, 7 and 8 with effect from 21 November 2025 | r2/10 finding 1 **[Verified]** |
| Industrial Relations (Central) Rules 2026 | G.S.R. 342(E), 08.05.2026 | CG-DL-E-08052026-272336, 92 pp | On publication | r5/04 finding 2 **[Verified]** |
| Code on Wages (Central) Rules 2026 | G.S.R. 343(E), 08.05.2026 | CG-DL-E-08052026-272365, 69 pp | On publication | r5/04 finding 1 **[Verified]** |
| Social Security (Central) Rules 2026 | G.S.R. 344(E), 08.05.2026 | CG-DL-E-08052026-272366, 259 pp | On publication | r5/04 finding 1 **[Verified]** |
| OSH (Central) Rules 2026 | G.S.R. 345(E), dated 08.05.2026 | CG-DL-E-09052026-272379, 318 pp — the e-gazette stamp reads 9 May | On publication; 8 or 9 May is open (§06.9) | r5/04 finding 1 **[Verified]** |
| EPF Scheme 2026 | G.S.R. 525(E), 29.06.2026 | Read through a reproduction, not the gazette | On publication, 29 June 2026 | r1/06 finding 12 **[Verified — mirror]**; pull from the primary source before customer use |
| 12% contribution for Scheme 2026 | S.O. 3582(E), 01.07.2026 | Read from the gazette | Retrospective to 21 November 2025 | r2/10 finding 12 **[Verified]** |
| Inspection charges, exempted establishments | S.O. 2701(E), 29.05.2026, issued under CoSS s.143(6) | Gazette table read | Not captured separately | r2/10 finding 13 **[Verified]** |
| Wage ceiling, ₹15,000 | S.O. 2702(E), 29.05.2026, issued under CoSS s.2(89) | Read through a professional alert quoting it; the s.2(89) hook read in the Code text | Not captured separately | r1/06 finding 13 **[Verified — mirror]**; pull from the primary source before customer use |
| Interest at 12% on delayed amounts | S.O. 2698(E), 29.05.2026 | Read through a professional alert quoting it | Deemed from 21 November 2025 | §02 mirror register **[Verified — mirror]**; pull from the primary source before customer use |
| ESI (General) Regulations 1950 | RS/5/48, 17.10.1950, as amended to 2020 | ESIC-hosted consolidation, as on 11.01.2024 | Saved to the cliff on this PRD's reading (§06.9) | r5/04 finding 25 **[Verified]** as text |
| Income-tax Act 2025 | Act 30 of 2025 | CG-DL-E-22082025-265620, 572 pp | 1 April 2026 (s.1(3)); the 1961 Act repealed by s.536(1) | r5/04 finding 27 **[Verified]** |
| Income-tax Rules 2026 | G.S.R. 198(E), 20.03.2026 | CG-DL-E-20032026-271092, 2,508 pp | 1 April 2026 | r5/04 finding 27 **[Verified]** |

The ESIC circular that cites the Code's commencement as "CG-DL-E-29092020-222111 dated
21.11.2025" conflates the Code's 2020 publication with its commencement and is never
used as the citation (r5/04 finding 49). A rule row whose instrument is marked
**[Verified — mirror]** carries its open pull-from-primary task (§14.6.1b RO6).

**Product implication.** A CA-facing console needs this calendar **per client**,
with one-click Form 138 (Q1–Q3; Q4 fenced, EV-046) and PT export — artefacts for the
attended filing flow (the deductor runs the FVU and uploads Form 138), never a
submission by the product (K-13) — and read-only audit
access (§15). The six
statutory registers (§06.9, EV-053) are held as one canonical set, electronic where
the rule-set permits, under the retention and custody rules of EV-054. The calendar
is where "the filing is the unit of delivery" becomes a screen.

---

### 06.12 Cross-cutting requirements the spine imposes on the engine

Pulling the above together, the statutory spine dictates the following
non-negotiable engine properties. These are acceptance criteria, not aspirations.

| # | Requirement | Driven by |
| --- | --- | --- |
| R1 | **Multiple concurrent wage bases** per employee per period (PF add-back base, gross/ESI base, payment-of-wages base, bonus base capped at the notified amount or minimum wage) | §06.10, §06.3, §06.7 |
| R2 | **Effective-dated, versioned rules** for every rate, slab, ceiling and definition — 12% PF, 50% add-back, PT/LWF slabs, TDS regimes, bonus ceilings | §06.2, §06.4, §06.7, §06.8, §06.10 |
| R3 | **Retrospective recompute with audit trail** — arrears/retro runs use the rule version in force for the period corrected | §06.10, §06.2 |
| R4 | **Threshold latching** — obligations that trigger on a look-back window stay on when headcount dips, and are explicitly retired, never silently dropped | §06.1 |
| R5 | **Per-state, per-tenant derived filing calendar** — PT/LWF/bonus due dates and frequencies vary | §06.4, §06.8, §06.11 |
| R6 | **Versioned file-format schemas** — Form 138 field-number remaps behind a schema; Q4 layout pluggable when it lands; the ECR's 11-field return and 6-field part-payment files as versioned schemas even though the 2025 revamp left the layout unchanged (EV-035, EV-044); TDS format families and FVU stacks routed by period (EV-052) | §06.5, §06.2, §06.3 |
| R7 | **Rules-first, LLM-last** — no statutory or monetary figure is ever model-generated | §12.1 |
| R8 | **Corrigendum-aware statutory watcher** — catches amendments and corrigenda, not just new instruments; keyed to named dependencies (Q4 layout, ESI cliff) | §06.9, §06.5, §22 |
| R9 | **Pre-filing validation** — UAN seeding state (exclude-and-flag default, never a payroll block), PAN operative status, ESI IP enrolment, CIN reconciliation via the `.csi` import, surfaced before the window, not after rejection; EPFO's own block/flag split mirrored exactly (EV-040) | §06.2, §06.5, §06.3 |
| R10 | **Migration-grade register reproduction** — 3A/6A-equivalent, ESI 5/6 (EV-032), PT/LWF registers and the legacy bonus registers and return, for Tally/Zoho/Kredily/Frappe import | §06.2, §06.7, §16 |
| R11 | **Engagement-type-aware headcount** — apprentices/NAPS excluded, contract labour and directors handled per rule, for the obligation step function | §06.1 |
| R12 | **Correct income routing of the same rupee** — a statutory bonus is invisible to ECR/ESI but visible to Form 138; the wage engine encodes the routing | §06.7, §06.3, §06.5 |
| R13 | **Dual vocabulary everywhere** — old and new form numbers, section numbers and "Financial Year"/"Tax Year" accepted in search, imports, labels and help, routed by period; the string "Form 16" resolves to the salary certificate only for FY 2025-26 and earlier; legacy and Code-era labour citations stored side by side on every rule (EV-050) | §06.5, section head |
| R14 | **Unbroken per-establishment ECR ledger** — Regular / Supplementary / Revised guards, no skipped month (the M−4 rule), the statutory verification gate immediately before payment initiation, and a post-approval correction recorded in our ledger as a diff against the approved return — never a mutation of it — even though a portal-side Revised return overwrites (EV-036–038) | §06.2 |
| R15 | **Counting unit and sphere as schema fields** on every threshold; forms, values and the appointment-letter template configurable per state (EV-053, EV-057) | §06.1, §06.9 |
| R16 | **Hard fences, no proxies** — no Form 138 Q4 generator and no Form 130 preparation until the Q4 format publishes (EV-046); no ECR arrear-file generator without a published layout (EV-043); never substitute a legacy layout (e.g., 24Q Q4) as a stand-in | §06.2, §06.5 |
| R17 | **Warn, never block, on a [Hypothesis] rule** — an unverified threshold (e.g., 144 overtime hours a quarter) may raise a warning but may never stop a punch, roster, pay run or filing | §06.9, §06.13 |
| R18 | **No shipped default for a carried value** — every value marked "carried, not re-captured" is a named parameter that is empty at tenant creation. A computation that needs it raises a blocking *configuration* task for the operator, never a silent default. It is never a payroll block on the employee (Part D-10) | Section head, §06.13 |
| R19 | **One canonical register store, rendered per rule-set** — six registers plus the wage slip held once; Wages / OSH / SS forms rendered as views; form identifiers keyed on (rule-set, form), because "FORM-XXIII" names two different documents | §06.9 (registers specification) |
| R20 | **Field-complete statutory forms** — Form I's 36 fields and header, Form IX's per-day IN/OUT grid with off-site notes, Form IV's 33 columns with itemised deductions and fines. A form that cannot be rendered field-complete from the store fails its golden fixture (TV19–TV21) | §06.9, EV-055 |
| R21 | **Period-scoped registers with a per-register retention clock** — a register closes at period end and its clock starts at "the date of last entry" (EV-054). An open register has no running clock. OSH r.76(2) is a conditional destruction gate released only by a recorded transfer. No retention period other than EV-054's is surfaced (Part D-11) | §06.9, §14 |
| R22 | **ECR export hygiene** — alphanumeric filename, lower-case extension, 8 MB limit, compression above 2 MB, one text file per zip; portal controls (wage month, return type, rate, remark) captured as operator-facing values and never written into the file; the part-payment file on its own screen model | §06.2 |
| R23 | **Principal-employer contract-labour tracking** — FORM-XVII Part III built from the store; contractor FORM-XVIII and work-order clocks tracked; the r.98(8) seven-then-fifteen-day wage-guarantee alert; the ESI reg 32(1A) and CoSS s.31(7) register-before-settlement gate | §06.3, §06.9 |
| R24 | **Counsel-gated branches ship dark** — the inoperative-PAN rule, the Aadhaar-field rendering in Form I, thumb-impression capture and the attended-filing credential path stay disabled per tenant until counsel sign-off is recorded against the named Part D item (§23) | §06.2, §06.5, §06.9 |
| R25 | **Two-bound counting per counting unit** — every threshold is evaluated on a lower bound (confirmed members) and an upper bound (confirmed plus `unconfirmed`); the gap yields POSSIBLE, never a silent trigger or a silent miss; look-back tests use the daily maximum over the window | §06.1 (counting units) |
| R26 | **Class-, area- and nesting-aware derivation** — establishment-class limbs that ignore headcount (factory, mine, plantation), ESI area status read on the work location with the notified contribution date, and nested obligations (crèche inside Ch. VI; Form XXIII inside Ch. V and VI; FORM-XVII Part IV inside Ch. III and IV — each "and" read as either until `ss.form_xxiii_chapter_test` and `osh.form_xvii_part_iv_chapter_test` are set with counsel) | §06.1, §06.3 |
| R27 | **Obligation lifecycle with retirement review** — the O1–O12 transitions; no path to RETIRED without a named approver's recorded statutory basis; `unconfirmed` and `once_covered` latches never open a review on a count alone | §06.1 |
| R28 | **POSH per administrative unit** — one Internal Committee obligation per unit or office; the complaint-routing table; both s.6(1) counting scopes shown; no statement of the ss.19, 21, 22, 25 or 26 duties or penalties | §06.1 (POSH), §10, §23 |
| R29 | **ECR field invariants** — the eleven content rules and checks at EPFO's own severity; engine-only checks flag and never refuse; encoding and line terminator pinned from a portal-accepted file, never borrowed | §06.2 |
| R30 | **The M+4 clock** — every member left out of a Regular return, and every leaver whose exit is unmarked, carries the due date of the Regular return four months on, escalated from the day of exclusion, with the accruing interest forecast shown beside it | §06.2 |
| R31 | **Return-route resolver** — the ten-row decision table picks the route before generation; a refused route names its reason and the routes that remain; no new return of any type while another is in process for the month, the safer reading of EV-037 | §06.2 |
| R32 | **Forecast, never overwrite** — interest, EDLI and admin forecasts reconcile to the portal's Due Deposit Balance Summary as SA-REC items; damages carried as an open liability until paid | §06.2 |
| R33 | **ESI two-level coverage** — the establishment and employee decisions as tables, with area data, the notified start date, the ₹176 divisor parameter and re-entry timing; a POSSIBLE count at a location not notified is not covered, and at a location of unknown status is POSSIBLE with an area task | §06.3 |
| R34 | **PT per month per work state** — each state's band edges, per-state and per-person year-to-date, a cross-state excess flagged and never silently capped, `registration_pending` never a zero line | §06.4 |
| R35 | **TDS routing by the statement's period** — stack, year fields and correction path taken from the period; a correction the portal cannot yet take is held, not submitted | §06.5 |
| R36 | **One vocabulary resolver** — string, period and context in; one artefact or a question out; "successor unmapped" instead of a guess; no local mapping tables | §06.5 |
| R37 | **Form 130 distribution record** — parts, employer period, Part C option, TRACES source, signature, control number and log, duplicate flag, reconciliation | §06.5 |
| R38 | **Q4 fence with release conditions and an alarm** — the three release conditions; `tds.q4_build_lead_days` and `tds.q4_contingency_trigger_date` owned by §05 and §22 | §06.5 |
| R39 | **Register instances with a lifecycle** — L1–L9; a close cadence per register; amendments appended; the later of the rule-sets' clock readings until counsel decides; the FORM-XX transfer gate | §06.9 |
| R40 | **Register–filing reconciliation** — the matrix's relations checked as SA-REC before the verification gate | §06.9 |
| R41 | **Post-cliff scenarios as rule versions** — S1–S4; `esi.post_cliff_mode`, `esi.cliff_month_split` and `epf.post_cliff_eps_edli_mode` set before the November 2026 month locks, none with a shipped default | §06.9 |
| R42 | **Due dates computed from the instrument's rule** — every open step a parameter; leap years and half-year closes computed, not tabulated; no holiday roll assumed | §06.11 |
| R43 | **Deduction cap with carry-forward** — total deductions capped at half the payment-of-wages base; the excess carried under `wages.deduction_priority` and `wages.deduction_overflow_manner`, never taken and never dropped | §06.9 |
| R44 | **One notice per crossing** — every O1, O4, O7 and O12 transition raises the notice payload in full; an unfillable field reads "unset" | §06.1 |
| R45 | **Re-derivation on corrected facts** — a late or corrected join, exit or deployment re-runs the derivation as of its effective date; a withdrawn trigger is recorded, never deleted; filings follow the authority's routes | §06.1 |
| R46 | **Deterministic ECR generation** — the fixed step sequence, lines ordered by UAN, no partial file; the edge cases in §06.2's table each with its named behaviour or parameter | §06.2 |
| R47 | **Quarter by payment date** — every salary payment placed in the Form 138 quarter of its payment date; a wage month and payment date in different tax years flagged, with the income-attribution question held for counsel | §06.5 |
| R48 | **Labels by period** — "(earlier Form …)" on Tax Year 2026-27 surfaces, the old label alone for earlier periods, every surface fed by the resolver | §06.5 |
| R49 | **Inspection export and maintenance mode** — one export per register, establishment and period with header, scope, amendments, hash and custody declaration; print-and-sign with the state language pair; FORM-XVII Part III sourced per column, with missing accounts-payable months left open | §06.9 |
| R50 | **Rule-set resolution and instrument citations** — the governing rule-set resolved per establishment from its appropriate Government and the state's commencement date, never assumed; every rule row cites an instrument from the register with its identifier, commencement and marker | §06.11 |
| R51 | **Form 138 writer to the workbook** — validators F138-1 to F138-11 at their FR-PAY-713 families; per-record field counts from the pinned schema version; the downloaded `138RQ1.txt` as the fixture, never a transcription of it; the deductor master confirmed against the tenant's TRACES profile before generation | §06.5 |
| R52 | **Column remap as a lookup** — the challan and Annexure I remaps held as data, never as an offset; a removed column refused with its reason, never dropped; letters with no legacy source transcribed from the workbook; legacy column numbers resolved to Form 138 letters by period | §06.5 |
| R53 | **s.33 particulars as the store's floor** — every s.33(a) particular held as data whether or not the central form prints it; every register form a render of the store; the adolescent flag underived until `osh.adolescent_definition` is set | §06.9 |
| R54 | **Saved-law registers as renders** — ESI Form 6, the immediate employer's Form 6 and Form 11 rendered from records the canonical store holds; one accident event behind FORM-XIX and Form 11; the views follow S1–S4 at the cliff | §06.3, §06.9 |

Requirements **R55 to R64** continue this numbering and are stated beside the
machinery they constrain, in §06.15 (the datum map), §06.16 (the parameter register)
and §06.17 (the refusal catalogue).

**Acceptance criteria for R25 onward.** Each is decidable against the named vector in
§06.14.

| Req | Given | When | Then | Vector |
| --- | --- | --- | --- | --- |
| R25 | 19 regular employees and 2 apprentices, `count.epf.apprentice = unconfirmed` | The day is re-derived | EPF is POSSIBLE; the warning names both apprentices and the parameter; no UAN task exists | TV26 |
| R26 | A factory with 6 employees in a notified area | Obligations derive | Maternity benefit and gratuity are ACTIVE; ESI is NOT_TRIGGERED | TV28 |
| R26 | An establishment in a notified hazardous occupation with 1 employee, in a notified area | Obligations derive | ESI is TRIGGERED | TV29 |
| R27 | Gratuity ACTIVE with `look_back_12m`, and no day at 10 or more left in the window | The day is re-derived | RETIREMENT_REVIEW opens; the obligation does not reach RETIRED without O8 | TV27 |
| R28 | An employer with offices of 6 and 14 workers | Obligations derive | Two IC instances; the 6-worker office shows both counting scopes; a complaint against the employer routes to the Local Committee | TV30 |
| R29 | A member name containing `#~#` | The ECR is generated | Generation stops with an SA-FMT error naming the member; no file is written | TV33 |
| R30 | A member excluded from April 2026's Regular return | The exclusion is recorded | The member's M+4 deadline, 15 September 2026, is shown from that day; August 2026's Regular return is not generated while April lacks the member | TV34 |
| R30 | The same member, at the EPFO fixture, carried by a Supplementary paid on 25 August 2026 | The seeding task is viewed | An interest forecast of ₹120.72 from the 15 May 2026 due date, updated daily until payment | TV73 |
| R31 | A downward correction after a challan exists | The operator asks for a Revised return | Refused with the EV-037 reason; the diff is recorded; the remaining routes are listed | TV35 |
| R31 | A Supplementary requested while a Revised return for the same month is in process | The route is resolved | Refused until the Revised return is completed or rejected; the reason names the return in process | TV71 |
| R32 | A forecast of ₹76.11 and a portal summary with a different figure | The payment step opens | A reconciling item is raised; the portal's figure is the one paid | TV36 |
| R33 | A ₹4,800 month with `esi.average_daily_wage_basis` unset | The month computes | A configuration task; neither share is waived | TV38 |
| R33 | A shop in a state-extended class with 9 persons on the lower bound and 12 on the upper, at a location in a district ESIC has not notified | Coverage derives | Not covered, with no POSSIBLE warning; the same count at a location of unknown status is POSSIBLE with an area-record task | TV72 |
| R34 | A Maharashtra-to-Odisha move on 1 March | The March run is prepared | Three outcomes shown; a configuration task; the operator's choice recorded; the pay run proceeds | TV43 |
| R35 | A Tax Year 2026-27 Q1 correction before the portal enables such filings | The correction is generated | It is validated and HELD with the reason; it is not counted as filed | TV45 |
| R36 | "Form 16" with no context, for Tax Year 2026-27 | The resolver runs | It asks, and never resolves to the donation certificate unasked | TV22, TV46 |
| R37 | An October joiner whose Part C option is `last_employer` | The certificate is distributed | The record holds Parts A and B for October to March, Part C for the year, and the TRACES source | TV47 |
| R38 | The Q4 anchor resolves but no sample file is published | The watcher fires | The fence stays up; the calendar shows the reason | TV54 |
| R39 | Form IX for August 2026 with an amendment on 20 October 2026 | The clock is computed | ELIGIBLE after 31 December 2031 | TV48 |
| R40 | Form IV column (18) differs from ECR field 7 for one member | The verification gate runs | SA-REC blocks payment initiation | TV49 |
| R41 | No successor by the date, `esi.post_cliff_mode` unset | November 2026 is prepared | ESI instances BLOCKED-pending-regime and a configuration task; the pay run proceeds | TV50 |
| R42 | FORM-XVIII for July–December 2026 and Form XXIII for 2027 | The calendar derives | 30 January 2027 and 29 February 2028 | TV53 |
| R43 | ₹10,650 of deductions requested on ₹20,000 of wages | The pay run computes | ₹10,000 deducted; ₹650 carried forward; Form IV column (26) shows ₹10,000 | TV52 |
| R44 | The EPF crossing of 3 November 2026 | The notice is raised | Every payload field is present; unset parameters are listed by name | TV55 |
| R45 | A join entered on 15 December 2026 with effect from 3 November 2026 | The derivation re-runs | EPF's trigger date is 3 November 2026 and the November ECR covers members from that date | TV56 |
| R46 | The same LOCKED month generated twice | The ECR is generated | Byte-identical files, lines in UAN order | TV16, TV57 |
| R47 | March 2027 salary paid on 1 April 2027 | Statements are assembled | The payment sits in Tax Year 2027-28 Q1 and carries the cross-year flag | TV63 |
| R48 | A Tax Year 2026-27 declaration screen and an FY 2025-26 one | Labels render | "Form 124 (earlier Form 12BB)" and "Form 12BB" | TV61 |
| R49 | Form XXII kept in print-and-sign mode | The inspection export is produced | It shows the mode, the stored scan's hash and the custody declaration | TV59 |
| R50 | A Pune establishment whose state commencement date is not loaded | Its register form is resolved | A configuration task; no central form is assumed; the obligation stays on the calendar | TV60 |
| R51 | A Tax Year 2026-27 Q2 statement whose last record ends in a bare LF, or with a deductee row dated 1 October 2026 | The file is generated | F138-3 or F138-7 blocks; nothing is released for the FVU | TV66 |
| R51 | The downloaded `138RQ1.txt` | The parser test runs | 692 bytes, 205 carets, five CR LF, no bare LF; the FH field count taken from the workbook | TV67 |
| R52 | A legacy 24Q challan value under 309 and an Annexure I value under 321, both for Tax Year 2026-27 | The Form 138 statement is built | The first lands in column G; the second is refused as "removed in Form 138" | TV65 |
| R52 | "Sub-heading 303" searched for a Tax Year 2026-27 period | The resolver runs | "Removed in Form 138", never a neighbouring column | TV68 |
| R53 | A state Employee Register with an adolescent-employment field, `osh.adolescent_definition` unset | The register renders | A configuration task; the field is left unrendered with its reason; no age band is guessed | TV69 |
| R54 | One dangerous occurrence in October 2026 at an ESI-covered establishment | FORM-XIX and ESI Form 11 render | Both show the one event record; a correction to the event appears in both | TV70 |

---

### 06.13 Open statutory items — on the validation gate

The following are unresolved and are tracked to the validation programme in §20
(§20.6). None may be silently assumed in the engine; each named value is a
configurable parameter until verified.

| Item | Status | Gate / kill criterion |
| --- | --- | --- |
| **ESI regime after the saving lapses (on or about 21 Nov 2026)** | Unresolved — we are not aware of a successor to the one-year saving as of September 2026 | §20 V-08. Primary-source watch on ESIC/MoLE; payroll correctness blocker; escalate if unnotified before the date **Ungraded (open), EV-004** |
| **Form 138 Q4 regular and correction formats** | Both unpublished ("Expected to be released soon"; no link), re-checked Sep 2026; no release date (EV-046) | Monitor Protean's regular and correction download pages keyed on the Q4 anchors, not the page's client-side "Updated As On" date; gates Form 130 **[Verified as absent]** |
| **ECR arrear-return layout** | Separate "File Arrear Return" flow; no public layout (EV-043) | Obtain from the authenticated portal; fenced until then **[Verified as absent]** |
| **TDS deposit due dates under r.218** | 7th / 30 April carried from 1962 Rules r.30 | Read r.218 of the Income-tax Rules 2026 before the calendar relies on it **[Hypothesis]** |
| **2025-Act equivalents of 1961-Act provisions** | Unmapped: s.115BAC, s.87A, s.10(10), s.10(11)/(12) provisos, s.206AA, s.206AB, s.234E, s.271H, s.272A(2)(g). Related by content only: s.201(1A) and s.398(3)(a) carry the same 1% / 1.5% rates (r5/04 finding 32), but the captured CBDT mapping does not list the pair (`tax.section_map.interest_short_deduction`) | Map against the Income-tax Act 2025 text; label both vocabularies (R13) **[Hypothesis]** |
| **Code-era equivalents of legacy labour citations** | Unmapped: ESI damages scale and rules r.31A/31C/50/52, s.2(22), s.85; EPF Act s.14 and the EPF and ESI latch wording; POG s.4A and s.9; POB ss.15, 16, 28, Form D and the Code-era bonus coverage threshold; the gratuity ceiling notification under CoSS s.53(3) | Map against the Codes and the 2026 Central Rules before customer-facing citation **[Hypothesis]** |
| **Tax Year 2026-27 TDS slabs / rebate** | FY2025-26 verified; current-year figures pending | Verify against the rates in force for Tax Year 2026-27 + corrigendum before running the year's TDS **[Hypothesis]** |
| **PT dataset, all states** | Maharashtra and Odisha verified at state primary sources; Karnataka's effect verified, instrument not retrieved; Odisha's "last month" undefined; every other state unverified; aggregator tables disputed | §20 V-09. Verify each state against its own PT Act or notification before it drives a deduction — build dependency **[Hypothesis]** |
| **LWF dataset, all states** | ~16 states per secondary sources (count unverified); no rate or split verified from any government source; only Karnataka's periodicity verified | §20 V-09. Verify each state's LWF Act or welfare-board notification **[Hypothesis]** |
| **EPF damages scale (legacy s.14B; CoSS s.128)** | Parameter `epf.damages_scale`, no shipped default; v0.3's graded percentages carried, not re-captured; EPFO's EDLI page still shows 1% per month; Code-era scale unverified | Verify the current scale + any corrigendum before quoting **[Hypothesis]** |
| **Code on Wages bonus ceilings and timing** | s.26 delegates the ceilings to the appropriate Government; ₹21,000/₹7,000 are legacy; no re-notification located; payment deadline and return unresolved | Verify central and per-state notifications before computing bonus for post-21.11.2025 accounting years **[Hypothesis]** |
| **144 overtime hours per quarter** | Secondary summaries only; never confirmed against gazette text; may sit in the OSH rules (K-04) | §20 V-17. Confirm against the Wages and OSH Central Rules text; warn-only until then (R17) **[Hypothesis]** |
| **State-sphere forms, appointment-letter template and retention periods** | Central-sphere text verified (EV-053, EV-054, EV-057); state rules prescribe their own forms and periods | Per-state acquisition; retention periods other than EV-054's are a counsel question (§23) **[Hypothesis]** |
| **Counting units per statute** | Units differ (employees / persons / workers / contract labour); contractor-supplied workers in the principal employer's own count unconfirmed | Confirm per statute before the step function fires an alert **[Hypothesis]** |
| **Fixed-term gratuity at one year** | Two professional-services readings of the Central Rules and MoLE's central-sphere handbook 6.3 (r1, r3); not the Code's own text | Confirm against the Social Security (Central) Rules 2026 **[Hypothesis]** |
| **Form XXIII and FORM-XVII Part IV — "and" between Chapters** | SS r.53(5)(a) names employers to whom "Chapter V and Chapter VI" apply; OSH r.72(8) names establishments to which "Chapter III ... and Chapter IV" apply; both-or-either is not read (`ss.form_xxiii_chapter_test`, `osh.form_xvii_part_iv_chapter_test`) | Counsel (§23); tasks raised where either Chapter applies until set **[Hypothesis]** |
| **Meal perquisite rule citation** | ₹200 per meal from 1 April 2026 per secondary sources (EV-019); conditions carried as engine constraints (K-19) | §20 V-18. Confirm the rule and its conditions against the Income-tax Rules 2026 text (§20) **[Hypothesis]** |
| **EPF IW / para 83 enforceability** | As carried (not re-captured): struck down by a High Court, under challenge | Confirm current status before applying uncapped IW contributions **[Hypothesis]** |
| **State rules under the four Codes** | Notifying unevenly across states; per-state dual regime until each commences | Effective-dated per-state rules from v1; assume divergence **[Verified]** |
| **PT situs for fully-remote employees** | Unsettled | Obtain state position or a conservative deduct-at-registered-state policy **[Hypothesis]** |
| **EPFO joint-declaration field list & proof matrix** | Exit-date correction verified (EV-041); the wider field list and proof requirements unverified | Confirm the current fields and proofs against the latest EPFO circular before building the general correction flow **[Hypothesis]** |
| **Open employer-share subsidy scheme (ABRY / any successor)** | PMRPY/ABRY windows expired; scheme particulars carried, not re-captured; any successor's rules rolling | Verify which scheme is open and per-member eligibility against current EPFO/MoLE notification before applying a subsidised employer share **[Hypothesis]** |
| **Carried, not re-captured — EPF** | Admin and EDLI-admin charges and the establishment minimum (`epf.admin_charge.minimum`); the higher-wage option window (`epf.higher_wage_option_window`); EPS minimum service and early-pension age (`eps.min_service_years`, `eps.early_pension_age`); part-month ceiling proration (`epf.ceiling_prorate_part_month`); the EPF form catalogue under Scheme 2026 (`epf.form_catalogue`); legacy paragraph references (2(f), 26A, 26B, 83, EPS 43A); the higher-pension and *Vivekananda Vidyamandir* citations; the court and year of the IW ruling; the ABRY/PMRPY report-full/remit-net mechanics; the passbook claim that the monthly ECR has subsumed Forms 3A/6A | Capture from EPFO primary material and the Scheme 2026 gazette; no shipped default (R18) **[Hypothesis]** |
| **EPS closure boundary day** | EPFO FAQ says "after 1 September 2014" (Q8) and "on or after" (Q14) (r5) | Parameter `epf.eps_closure_boundary_inclusive`, default "on or after"; confirm with EPFO; TV17 **[Verified as inconsistent]** |
| **EPF Scheme 2026 para 25 (Aadhaar, seeded bank account, PAN, UAN)** | Reported from a secondary reproduction (r1, medium) | Read the gazette text; if confirmed, re-open the Aadhaar-optional counsel question (§07, §23) — the exclude-and-flag default and the no-hard-block rule stand (Part D-10) **[Hypothesis]** |
| **EPS 1995 and EDLI 1976 after the saving lapses** | Saved with the EPF Scheme 1952 to ~21.11.2026; research names Scheme 2026 as the EPF successor but captures no EPS or EDLI successor | Primary-source watch alongside V-08; escalate with the ESI item if unresolved **[Hypothesis]** |
| **ECR error-file schema** | Referenced in the EPFO manual; undocumented publicly (r5) | Capture from a real rejection before building the importer **[Verified as absent]** |
| **Carried, not re-captured — ESI** | Contribution rounding (`esi.rounding_rule`); the wage-component list and the overtime coverage/contribution split (TV5); benefit-continuation edge cases; accident-report form and time limit; damages scale (`esi.damages_scale`); legacy r.31A/31C/50/52 and s.85; the e-Pehchan card, the Temporary Identity Certificate and challan rejection of an unenrolled member; whether the SS (Central) Rules 2026 already supersede the ESI (Central) Rules 1950 | Re-capture from esic.gov.in wages and contribution pages and the SS (Central) Rules 2026 **[Hypothesis]** |
| **Carried, not re-captured — TDS** | Standard deduction per regime (`tds.standard_deduction.<regime>`); PF-interest thresholds (`tax.pf_interest_threshold.*`); gratuity tax-exemption ceiling (`tax.gratuity_exemption_ceiling`); s.271H and s.272A(2)(g) amounts; the s.234E cap; the 12BAA limb's history; the Form 10E timing condition. The TDS interest rates are no longer on this list: s.398(3)(a) was read in round five (r5/04 finding 32; §06.5 penalties) | Read the Income-tax Act 2025 and Rules 2026 text with a corrigendum check **[Hypothesis]** |
| **Inoperative-PAN consequences for the employer** | Higher-rate deduction and short-deduction exposure are real (r5 counsel review); rate and section unverified | Counsel opinion before any customer statement either way (§23); parameter `tds.inoperative_pan_rule` ships dark (R24) **[Hypothesis]** |
| **Carried, not re-captured — gratuity and bonus** | Legacy POG and POB section references; compulsory-insurance states; the 4y240d case citations; bonus set-on/set-off years and infancy years (`bonus.set_on_off_years`, `bonus.infancy_years`); legacy bonus penalties | Capture the legacy text where a pre-Code period still needs it; map Code-era equivalents **[Hypothesis]** |
| **Apprentice exclusion from counts** | Legacy citations carried; Code-era basis not located | Confirm against the Code definitions before the step function excludes anyone **[Hypothesis]** |
| **Handbook-level thresholds** | Establishment registration (60/30 days), ISMW at 10, the Ch. IX/X retrenchment regime and Works Committee come from the February 2026 MoLE handbook, which predates the 8 May 2026 Rules (r2 caution) | Re-read each against the notified Rules before the step function alerts on it **[Verified — handbook level]** |
| **Odisha PT levy status** | A reported April 2026 ordinance repealing Odisha PT from 1 April 2026 is unconfirmed; the state page still shows the Act as live (r1, low) | Resolve against the Odisha Gazette before removing or keeping Odisha in the PT table; §20 V-09 **[Hypothesis]** |
| **State PT/LWF due days and rupee values** | v0.3's per-state due days and slab and LWF figures for states other than MH/KA/OD are carried, not re-captured, and not shipped | §20 V-09; parameters `pt.<state>.*`, `lwf.<state>.*` **[Hypothesis]** |
| **Form 122 / 123 / 124 field layouts** | CBDT publishes per-form guidance notes; none was read in any round (r5) | Read the Form 122, 123 and 124 guidance notes before the declaration and perquisite screens are specified **[Hypothesis]** |
| **FORM-XVII Part IV timing** | Duty verified (OSH r.72(8)); due date not captured | Read the OSH Rules' return provisions; calendared as unconfirmed until then **[Hypothesis]** |
| **Form I field 24 and 35 handling** | Aadhaar-field rendering and thumb-impression capture raise Part D-4, D-5 and D-10 questions | Counsel (§23) before the Form I export renders field 24 or captures a thumb impression; ships dark (R24) **[Hypothesis]** |
| **Counting-unit membership** | The Codes' "employee" and "worker" definitions were not read; apprentices, salaried directors, contractor-supplied staff and supervisory roles are held `unconfirmed` (`count.<statute>.<engagement_type>`) | Read the definitions in the Codes and the 2026 Rules; set each membership with its citation; POSSIBLE states clear as they are set (R25) **[Hypothesis]** |
| **Look-back retirement** | Whether gratuity and maternity-benefit applicability lapses after twelve months below ten, or continues once covered, is not captured for the Code era | Read CoSS Chapters V and VI with the SS (Central) Rules 2026; until then retirement stays a named approver's decision (R27) **[Hypothesis]** |
| **POSH counting scope and reporting** | s.6(1)'s ten-worker test per administrative unit or per employer (`posh.lc_count_scope`); the annual report's period (`posh.annual_report_period`); ss.19, 21, 22, 25 and 26 | Counsel (§23 counsel register, CR-49) **[Hypothesis]** |
| **ECR content points outside EPFO's captured material** | Encoding and line terminator (`ecr.encoding`, `ecr.line_terminator`); the gross-wages basis (`ecr.gross_wages_basis`); EPS Wages for a non-EPS member (`ecr.eps_wages_non_member`); the VPF field (`ecr.vpf_field`); the EPS share under the 10% rate (`eps.share_under_reduced_rate`); the part-payment column mapping (`ecr.part_payment_mapping`) | Pin each from a portal-accepted upload and its return statement before general availability **[Hypothesis]** |
| **ECR lifecycle readings** | Challan generation as the start of "a payment process"; an excluded, unseeded member counting as "active" for the M−4 test; the route for belated salary (FAQ Q15) | Confirm on a live portal session under written authority (§22) **[Hypothesis]** |
| **Interest and admin-charge arithmetic** | `epf.interest_day_count`, `epf.interest_base`, `epf.admin_charge.wage_basis` | Reconcile the engine's forecasts to portal summaries in the first attended cycles; set each from the observed rule and any circular that states it **[Hypothesis]** |
| **ESI divisor, re-entry and contribution start** | `esi.average_daily_wage_basis`; `esi.reentry_timing`; `esi.contribution_start_date` per establishment, from the ESIC record | Re-capture from ESIC's contribution pages and the SS (Central) Rules 2026 **[Hypothesis]** |
| **Post-cliff parameters** | `esi.post_cliff_mode`, `esi.cliff_month_split`, `epf.post_cliff_eps_edli_mode` — no default | The tenant's decision with counsel before the November 2026 month locks; §20 V-08 and V-22 **[Hypothesis]** |
| **PT band edges, wage basis and the cross-state ceiling** | `pt.MH.band_boundary_rule` (the ₹7,500 edge); `pt.<state>.wage_basis`; `pt.OD.income_basis`, `pt.OD.topup_month`; `pt.article276_cap_scope` | §20 V-09; the cross-state ceiling question to counsel (§23) **[Hypothesis]** |
| **Form 138 Q4 slippage parameters** | `tds.q4_build_lead_days`, `tds.q4_contingency_trigger_date`, owned by §05's release plan and §22 | Set in §05; tracked as §20's Form 138 Q4 slippage risk **[Hypothesis]** |
| **Tax Year 2026-27 correction filing** | The Q1–Q3 correction format is published (4 August 2026); on 1 September 2026 the portal said such filing "will be enabled shortly" (r1/06 finding 33) | Watch the portal announcement (§22 FR-RULE-006); held corrections release on it (R35) **[Verified as not yet enabled]** |
| **Register close cadence and clock readings** | `register.close_cadence.<register>` for Form I, FORM-XIX and Form XXII; `retention.amendment_restarts_clock`; `retention.calendar_years_reading`; what "properly transferred" means under OSH r.76(2) | Counsel (§23); the later reading applies until then (R39) **[Hypothesis]** |
| **Form I and Form IX render rules** | `formi.render.<field>` for fields 15, 16, 20, 21 and 30; `form_ix_non_working_marker`; overnight-shift anchoring on Form IX | The §20 desk read of G.S.R. 343(E), with §09.14-A14 **[Hypothesis]** |
| **Code on Wages timing and deductions** | `wages.fnf_trigger_event`; `calendar.working_days.<establishment>`; `wages.deduction_priority`; `wages.deduction_overflow_manner` | Read the Wages Rules 2026 provisions on the "prescribed manner" and on working days **[Hypothesis]** |
| **Calendar steps** | `calendar.<obligation>.holiday_roll`; `calendar.r98_8_clock_start` | Read each instrument's computation-of-time wording before an on-time metric uses a rolled date **[Hypothesis]** |
| **EPS in the month a member turns 58** | `eps.age58_part_month` — whether EPS runs for the days before the birthday | Confirm against EPFO's validation on a live portal and the EPS successor instrument (V-22) **[Hypothesis]** |
| **Appropriate Government and state commencement per establishment** | `appropriate_government.<code>` captured at onboarding with its basis; `code_regime.<state>.<code>` loaded from each state's gazette | Per-state acquisition (§22 state onboarding); unresolved rows raise configuration tasks (R50) **[Hypothesis]** |
| **Print languages for physical registers** | `register.print_languages.<state>` — OSH r.72(7)(i) requires English or Hindi and the local language | Set per state from the state's rules and language **[Hypothesis]** |
| **Salary paid in the tax year after its wage month** | Statement placement follows the payment date (R47); which tax year the salary is income of, and how the certificate reports it, is not captured | Counsel (§23) before the product states it **[Hypothesis]** |
| **Form 138 field transcription** | No round itemised the field names and positions per record type; research's transcription of the sample's FH line carries 17 carets against the workbook's 16-field rule; the record carrying the contact numbers with country code, and what 202526 denotes in the sample's batch header, are not stated; Annexure I columns before C and at L have no legacy source | Transcribe from the pinned workbook and the downloaded sample at the §20 desk read before the writer ships (R51, TV67) **[Verified as inconsistent]** |
| **Legacy 24Q column labels 301–327** | Needed to tie the one removed challan sub-heading (303) to the three deleted challan fields; not captured (`tds.f138.legacy_column_labels`) | Read the legacy 24Q workbooks (Q1–Q3 v6.3, Q4 v7.5) **[Hypothesis]** |
| **OSH Code s.33 particulars** | The Code's definition of an adolescent (`osh.adolescent_definition`); whether designation and posting discharge "work performed" (`osh.s33.work_performed_render`); the text of s.33(b) | Read the OSH Code definitions and s.33 in full; per state form at onboarding (R53) **[Hypothesis]** |
| **ECR in-process guard beyond Revised** | EV-037 states "no other return in process" for Revised only; the product applies it to every new return | Observe on a live portal session under written authority (§22) (R31, TV71) **[Hypothesis]** |

---

### 06.14 Statutory test vectors — the golden cases the engine must pass

The spine is only as good as the cases that catch its bugs. These are the named
golden test vectors, each a place a naive engine files a wrong number. They are the
acceptance suite for the compliance engine and should be checked against a primary
source before every rate-change release. **[Verified]** (each derives from the cited
rule above; a vector resting on a [Hypothesis] or legacy-only rule inherits that
status and is re-baselined when the rule is confirmed)

| # | Vector | Correct behaviour | Wrong behaviour it catches |
| --- | --- | --- | --- |
| TV1 | EPS cap on actual-wage PF election | Employer EPS = ₹1,250 regardless; excess to EPF | 8.33% applied to full wage; pension over-allocated |
| TV2 | EPS closed to post-01.09.2014 high-earner first-joiner | Full 12% employer share to EPF, EPS = 0 — computed by the engine, since EPFO only flags this case (EV-040) | EPS split applied to an ineligible member |
| TV3 | ESI mid-period ceiling crossing (raise to ₹23,000 on 1 Jul) | ESI on full ₹23,000 through Sep; exit 1 Oct | Member dropped in July; wrong return |
| TV4 | ESI ₹176 average-daily-wage employee | Employee 0.75% waived; employer 3.25% still charged | Both shares charged, or both waived |
| TV5 | ESI overtime — **[Hypothesis] vector**: the separate coverage and contribution bases are verified (r1); the overtime split is carried, not re-captured | Excluded from coverage test; included in contribution — re-baselined once ESIC's wages page is re-captured | OT pushes member out of coverage, or OT untaxed |
| TV6 | 50% add-back triggers (excluded heads (a)–(i) = 65%; special allowance counted as wages, not excluded) | ₹15,000 excess added back to PF/gratuity base | No add-back; suppressed base; or special allowance wrongly treated as excluded |
| TV7 | 50% add-back does not trigger (excluded = 45%) | No add-back | Add-back applied unnecessarily |
| TV8 | Gratuity 6-month rounding (7y8m vs 7y4m) | 7y8m → 8 years; 7y4m → 7 years | Both rounded the same direction |
| TV9 | Bonus calculation ceiling (Code on Wages s.26(2); legacy notified amount ₹7,000) — wage ₹18,000, min wage ₹10,000 | Base = ₹10,000, not ₹18,000 or ₹7,000 | Bonus on actual wage, or flat ₹7,000 |
| TV10 | Maharashtra / Karnataka PT February top-up | ₹300 in Feb to reach ₹2,500/yr | Flat ₹200×12 = ₹2,400 (₹100 short) |
| TV11 | Inoperative PAN on a salaried employee — **counsel-gated vector** (the rate and section are not captured, §06.5) | The PAN is flagged before the quarter's statement. The branch reads `tds.inoperative_pan_rule`, and with the parameter empty the run raises a configuration task. The employee's pay is never blocked, and no customer-facing text states the employer's exposure either way | A hard-coded rate shipped as law; the inoperative PAN silently processed at the normal rate; or copy telling a customer there is no employer-facing consequence |
| TV12 | Retro arrears recompute | Recompute against the rule version in force for the corrected period | Recompute at today's rate |
| TV13 | Un-seeded UAN, or an exit date recorded in error, at ECR time | Member surfaced to the seeding or joint-declaration queue before the window; default exclude-and-flag with operator and employee notices; payroll never blocked | "UAN exists" treated as filable; payroll blocked for want of Aadhaar; post-exit contribution attempted without the joint declaration |
| TV14 | Arrears paid in a later year | Attributed to year(s) of accrual for PF/ESI retro and for s.157(1)/Form 39 (ex-s.89(1)/Form 10E) relief | Whole lump taxed at receipt-year slab; no arrears-relief attribution |
| TV15 | ABRY/PMRPY-subsidised member | ECR reports full statutory contribution; employer remittance reduced by subsidised share against live eligibility | Subsidy modelled as a flat rate cut; ECR and remittance mis-stated, or a lapsed scheme carried forward |
| TV16 | ECR return-file golden fixture (EPFO Help File sample line `100257274743#~#NITESH#~#15000#~#15000#~#15000#~#15000#~#1800#~#1250#~#550#~#0#~#0`) | Byte-identical output: 11 values, 10 three-character `#~#` delimiters, no header row, no wage month or return type in the file (EV-035) | Four-character delimiter, a header row, or portal controls written into the file |
| TV17 | EPS closure boundary — member first joined on exactly 01.09.2014 with PF wages above ₹15,000 | Behaviour follows `epf.eps_closure_boundary_inclusive` (default "on or after": EPS = 0, full 12% to EPF), and the member is shown with EPFO's flag, not a block (EV-040) | Boundary hard-coded one way with no parameter, or a client-side block EPFO does not impose |
| TV18 | ECR packaging — a 3 MB return file named `Aug 2026 ECR.TXT` | Filename normalised to letters and digits, extension lower-cased, file zipped with nothing else in the zip, portal controls listed for the operator (r5) | Spaces or upper-case extension uploaded, an unzipped file above 2 MB, or a second file inside the zip |
| TV19 | Form IX render — an employee with two punches on day 3, an off-site assignment on day 9, and overtime on day 14 | Per-day IN/OUT pairs in column (7), the assignment note in (10), derived totals in (8) and (9), signature column suppressed for electronic maintenance (EV-055) | A present/absent grid, a day-total, or keyed totals |
| TV20 | Form I render — an employee who declined to provide Aadhaar and has no thumb impression | All 36 fields present. Field 24 is empty with a reason code, field 35 carries a signature, and onboarding and payroll proceed (Part D-10) | A blocked onboarding, a missing field, or field 24 rendered from a business table |
| TV21 | Form IV render — a month with a fine and a damage recovery | Deductions itemised in (18)–(27); fine nature, date and amount, and the damage or loss, in (30)–(32); total deductions within the 50% cap (s.18(3)) | A single "other deductions" column, a fine without its act-or-omission record, or a cap breach |
| TV22 | "Form 16" search in Tax Year 2026-27 | Resolves to Form 130 for the salary context, and flags that FORM NO. 16 in the 2026 Rules is a donation certificate (r5) | The string routed to the donation form, or to a legacy layout for a 2026-27 period |
| TV23 | ESI threshold for a Central-sphere extended class — an NBFC with 15 persons | ESI not triggered by headcount at 15; triggered at 20 (ESIC coverage page, r1), subject to area notification | ESI enrolment forced at 10 for every establishment class |
| TV24 | Annual labour-return scoping — (a) a shop with 8 employees that has never had 10 in any twelve-month look-back; (b) a shop with 25 employees | (a) No SS Form XXIII task, because Ch. V and VI do not apply. (b) A Form XXIII task due 28/29 Feb (r.53(5)(a)). Neither gets a FORM-XVIII task for itself, since that return is the contractor's (r5) | Form XXIII demanded of every employer, or FORM-XVIII demanded of a non-contractor |
| TV25 | MoLE FAQ Q7 add-back fixture — remuneration ₹76,000 (Basic+DA ₹20,000; allowances ₹40,000; gratuity and retrenchment ₹16,000) | Excess ₹2,000; revised wages ₹22,000 — the (a)–(i) reading (r2) | Gratuity and retrenchment counted in the test, giving ₹18,000 excess and ₹38,000 wages |
| TV26 | Two-bound EPF count — 19 regular employees and 2 statutory apprentices, apprentice membership `unconfirmed` | EPF POSSIBLE; the warning names both apprentices and `count.epf.apprentice`; no UAN or ECR task | EPF armed at 21 by counting the apprentices, or silence at 19 |
| TV27 | Gratuity look-back — 10 employees on a single day in June 2026, 8 thereafter | Gratuity ACTIVE while that day sits in the trailing twelve months; then RETIREMENT_REVIEW, never RETIRED without a named approver's recorded basis | De-armed on the first day below 10, or retired automatically after twelve months |
| TV28 | Class limb — a factory with 6 employees in a notified area | Maternity benefit and gratuity ACTIVE; ESI NOT_TRIGGERED (below 10 persons, no hazardous notification) | A headcount-only derivation that leaves the factory obligation-free |
| TV29 | Single-person ESI trigger — an establishment in a notified hazardous occupation with 1 employee, in a notified area | ESI TRIGGERED | ESI withheld until 10 persons |
| TV30 | POSH — one employer, offices of 6 and 14 workers | An IC obligation instance per office; the 6-worker office shows both s.6(1) counting scopes; a complaint against the employer routes to the Local Committee from either office | One IC per legal entity, or the 6-worker office treated as exempt from s.4(1) |
| TV31 | ECR line for the §06.10 add-back employee on the ceiling (M2) | `<UAN>#~#<NAME>#~#100000#~#15000#~#15000#~#15000#~#1800#~#1250#~#550#~#0#~#0` | ₹50,000 in field 4 beside ₹1,800 in field 7 — a sub-statutory rate EPFO refuses |
| TV32 | ECR line with NCP days (M5) — ₹15,000 PF wages, 10 NCP days of 30 | `…#~#10000#~#10000#~#10000#~#10000#~#1200#~#833#~#367#~#10#~#0` | EPS left at ₹1,250 against prorated wages; NCP left at 0 |
| TV33 | ECR name hygiene and the part-payment fixtures | A name containing `#~#` or a line break stops generation with SA-FMT; the two EPFO part-payment sample lines reproduce byte-identically from their inputs | A corrupted line uploaded; the part-payment file emitted with 11 fields |
| TV34 | M+4 clock — a member excluded from April 2026's Regular return for an unseeded UAN | The member's M+4 deadline, 15 September 2026, shown from the day of exclusion; August 2026's Regular return not generated while April lacks the member; once seeded, an April Supplementary offered | The exclusion discovered only when August's Regular return is refused |
| TV35 | Return routes after payment — (a) a new member for a month already paid; (b) a downward correction after the challan; (c) an upward correction after payment | (a) Supplementary offered. (b) Refused with the EV-037 reason, the diff recorded, the §22 runbook route shown. (c) Not offered until validated | A Revised return offered after payment; a second Regular return |
| TV36 | Interest forecast — ₹23,150 paid ten days late, parameters set to actual/365 | Forecast ₹76.11; a different portal figure raises a reconciling item and the portal's figure is paid | The engine's figure overwrites the portal's, or interest is missing at the payment step |
| TV37 | ESI rounding — E1, E2 and E3 of §06.3 | Shares of ₹172.50 and ₹747.50 for E3 rounded per `esi.rounding_rule`; the establishment total ₹2,440.00 unrounded and ₹2,441 under the carried round-up | Rounding only at establishment level; a ₹1 gap between the upload and the challan |
| TV38 | ESI ₹176 divisor — a ₹4,800 month | With `esi.average_daily_wage_basis` unset, a configuration task and no waiver; with calendar days set, ₹160 a day and the employee share waived | A waiver applied on an unstated divisor |
| TV39 | ESI area — an establishment of 15 persons in a partially notified district | Not covered where the work location is outside the notified area; POSSIBLE with an area task where the location's status is unknown | The district name treated as notified |
| TV40 | Karnataka PT band edge — ₹24,999 and ₹25,000 a month | Nil; ₹200 (₹300 in February) | An off-by-one at the edge |
| TV41 | Maharashtra PT band edges — ₹7,500 and ₹10,000 a month, man | ₹7,500 follows `pt.MH.band_boundary_rule`, with a configuration task while it is unset; ₹10,000 is ₹175 | A hard-coded edge with no parameter; ₹10,000 taken into the ₹200 band |
| TV42 | PT move — Karnataka to Maharashtra on 1 October, ₹40,000 a month | ₹1,200 + ₹1,300 = ₹2,500; two state returns, each reconciling to its months | The Maharashtra February top-up missed, or a flat ₹200 in February |
| TV43 | PT move — Maharashtra to Odisha on 1 March, ₹40,000 a month | Three outcomes computed (₹2,300, ₹2,500, ₹2,600); a configuration task before the March run; the operator's choice recorded; pay never held | A silent cross-state cap at ₹2,500, or a silent ₹300 |
| TV44 | TDS routing — an FY 2024-25 correction prepared in October 2026, and a Tax Year 2026-27 Q2 statement | Legacy stack, RPU 6.0 and FVU 9.5; Form 138 on RPU 1.2 and FVU 1.2 with 202627 in the year field | Routing by today's date |
| TV45 | Held correction — a Tax Year 2026-27 Q1 correction before the portal enables such filings | Generated, validated, HELD with the reason; not counted as filed | Submitted, or counted as filed |
| TV46 | Resolver — "12BB" in a Tax Year 2026-27 import; "FY 2026-27"; "FORM-XXIII" without a rule-set; "s.115BAC" | Form 124; Tax Year 2026-27 with a note; a question for the rule-set; "successor unmapped" | A guessed mapping, or a silently dropped row |
| TV47 | Form 130, two employers — an October joiner with previous-employer income, Part C option `last_employer` | The record holds Parts A and B for October to March, Part C for the year, and the TRACES download reference | Parts A and B shown for the whole year; a self-generated certificate |
| TV48 | Register clock — Form IX for August 2026 amended on 20 October 2026; FORM-XX for 2026 | Form IX ELIGIBLE after 31 December 2031; FORM-XX's destruction refused after 31 December 2031 until a transfer is recorded | A clock from the employee's exit; destruction on the anniversary reading; FORM-XX destroyed without a transfer |
| TV49 | Register–filing reconciliation — Form IV column (18) differs from ECR field 7 for one member | SA-REC blocks payment initiation until resolved | The mismatch found after payment, when only an upward revision might remain |
| TV50 | Post-cliff ESI — wage month November 2026, no successor published, `esi.post_cliff_mode` unset | ESI instances BLOCKED-pending-regime; a configuration task; the pay run proceeds; E3 absent (left ESI on 1 October) | Saved rates applied silently as if they were law, or ESI dropped from payslips without a decision |
| TV51 | Gratuity at exactly six months over — 7 years 6 months, last-drawn ₹52,000 | 7 years: (15/26) × ₹52,000 × 7 = ₹2,10,000 | Rounded up to 8 years, ₹2,40,000 |
| TV52 | Deduction cap — the §06.9 worked case | ₹10,000 deducted; ₹650 of the damage recovery carried forward; Form IV column (26) shows ₹10,000 | ₹10,650 deducted, or the ₹650 silently waived |
| TV53 | Calendar arithmetic — FORM-XVIII for July–December 2026; Form XXIII for 2027; full-and-final for a resignation effective Friday 11 September 2026 | 30 January 2027; 29 February 2028; Tuesday 15 September 2026 on a Monday-to-Friday calendar | 28 February 2028 hard-coded; full-and-final counted in calendar days |
| TV54 | Q4 fence release — the Q4 regular anchor resolves, but no sample file or validating FVU is published | The fence stays up; the calendar shows which release condition is unmet | Q4 generation opened on the anchor alone |
| TV55 | Crossing notice — the EPF crossing of 3 November 2026 in §06.1's worked example | Obligation, rule and marker, both bounds with the three `unconfirmed` people, crossing day, latch rule, sphere, tasks with due dates, and `epf.admin_charge.minimum` and `epf.damages_scale` listed as unset | A notice without its bounds, or an unset parameter filled with a remembered value |
| TV56 | Late join — entered 15 December 2026, effective 3 November 2026, the 20th employee | EPF trigger date 3 November 2026; the November 2026 ECR covers members from that date, by Supplementary if a November return was already approved | Trigger dated 15 December; November left without EPF |
| TV57 | Mid-month joiner — joins on the 11th of a 30-day month at a ₹15,000 PF wage | Fields 3–9 read 10000, 10000, 10000, 10000, 1200, 833, 367; field 10 follows the NCP list once captured | Contributions on the full ₹15,000, or on days before joining |
| TV58 | Turns 58 mid-month, not marked for deferred pension | With `eps.age58_part_month` unset, a configuration task for the birthday month; EPS never on days after the birthday | EPS on the whole month, or a guessed split |
| TV59 | Print-and-sign — Form XXII for a Maharashtra establishment kept on paper | The inspection export shows the mode, the stored scan's hash and the custody declaration; print languages come from `register.print_languages.MH` | The electronic render presented as the register of record |
| TV60 | Rule-set resolution — the Pune establishment, Maharashtra's Code-rules commencement not loaded | A configuration task; no central form assumed; the attendance-register obligation stays on the calendar | Central Form IX rendered for a state-sphere establishment by default |
| TV61 | Label rendering — a Tax Year 2026-27 declaration screen and an FY 2025-26 one | "Form 124 (earlier Form 12BB)"; "Form 12BB" | "Form 12BB" on a 2026-27 screen, or "Form 124" on a 2025-26 one |
| TV62 | FORM-XVII Part III — one contractor month with no accounts-payable import | The return shows an open item for that contractor and month | A zero written into the wage-bill column |
| TV63 | Quarter placement — June 2026 salary paid 1 July 2026; March 2027 salary paid 1 April 2027 | Tax Year 2026-27 Q2; Tax Year 2027-28 Q1 with the cross-year flag and the counsel item attached | Placement by wage month |
| TV64 | Exempted-establishment inspection charges on ₹2,00,000 of wages | ₹8,750 EPF (the minimum, above 0.35% × ₹2,00,000 = ₹700) and ₹1,250 EDLI (the minimum, above ₹10) | The percentage applied without the minimums |
| TV65 | Form 138 remap — legacy challan values under 301–312 and Annexure I values under 313–327, for a Tax Year 2026-27 statement | Challan 308 → J, 309 → G, 310 → I, 311 → H; Annexure I 314 → E, 315 → C, 316 → D, 326 → M, 327 → N; values under 303, 313, 321, 322 and 325 refused as "removed in Form 138" | A positional mapping, which misplaces eight columns; a removed value silently dropped |
| TV66 | Form 138 validator negatives — (a) the last record ends in a bare LF; (b) a Q2 deductee row dated 1 October 2026; (c) a populated Q1–Q3 salary-detail count; (d) the rupee sign in a file value; (e) a Surcharge amount on a challan | Each refused before release with its family: (a), (c), (d) and (e) SA-FMT; (b) SA-RULE, with the payment offered to Q3 by the quarter rule | A file the FVU rejects after the attended session has begun |
| TV67 | Form 138 fixture — the downloaded `138RQ1.txt` | The parser reads 692 bytes, 205 carets, five CR LF and no bare LF, with FH, BH, CD and DD as the first four records; the FH field count comes from the workbook | The research's transcribed FH line, with 17 carets, adopted as the fixture |
| TV68 | Column resolver — "sub-heading 304" and "sub-heading 303" for Tax Year 2026-27; "sub-heading 304" for FY 2025-26 | "Challan column C (earlier 304)"; "removed in Form 138"; legacy 304 | A neighbouring column for 303; a Form 138 letter on a legacy period |
| TV69 | Adolescent particular — a state Employee Register with an adolescent field, `osh.adolescent_definition` unset | Configuration task; the field unrendered with its reason; payroll unaffected | A hard-coded age band; a blank field with no reason |
| TV70 | One accident, two registers — a dangerous occurrence in October 2026 at an ESI-covered establishment | FORM-XIX and ESI Form 11 render the same event record; a correction to the event appears in both | Two independently keyed entries that can disagree |
| TV71 | ECR in-process guard — a Supplementary for October 2026 requested while a Revised return for October is in process | Refused until the Revised return is completed or rejected; the reason names the return in process | A second return started beside one in process |
| TV72 | ESI area with a POSSIBLE count — a shop in a state-extended class, 9 persons on the lower bound and 12 on the upper, (a) in a district not notified, (b) at a location of unknown status | (a) Not covered, no warning; (b) POSSIBLE with an area-record task | A POSSIBLE warning raised for an area ESIC has not notified, or silence where the area is unknown |
| TV73 | Interest while excluded — an EPFO-fixture member left out of April 2026's Regular return, carried by an April Supplementary paid 25 August 2026, parameters set to an exclusive count on actual/365 | Forecast ₹120.72 from the 15 May 2026 due date, shown on the seeding task from the day of exclusion; the portal's figure paid | Interest forecast from the Supplementary's filing date, or no forecast until the Supplementary exists |
| TV74 | Single-datum render — Form I field 18 and ECR field 1 for the same member, and a hand-edited copy of a previous inspection export | Both artefacts read `identifier.uan`; neither holds its own stored copy. The next export re-renders from the store and the edited copy is neither a source nor carried forward | A second copy of the UAN in an artefact's own tables; an edited export treated as the register of record |
| TV75 | Single-writer guard — the disbursement subsystem attempts to set `employment.date_of_exit` | The write is refused; a correction is raised against the employment record's writer, which is the only subsystem that may set it | A downstream subsystem amending a datum, after which the register and the return can disagree |
| TV76 | Absence behaviour — a member with no UAN at ECR generation, rendered into Form I in the same month | The ECR excludes and flags the member with operator and employee notices and starts the M+4 clock; Form I field 18 renders empty with its reason code carried in field 36; the pay run completes and the employee is paid | A blocked pay run, a blank Form I field with no reason, or a member silently dropped from the return |
| TV77 | Unset class C1 — `esi.rounding_rule` empty for a month with ESI members | Both shares are computed to the paisa, a configuration task names the key, the pay run completes and the ESI upload is not generated | A rounding convention chosen at run time, or the pay run held |
| TV78 | No borrowing — `pt.MH.band_boundary_rule` empty while Karnataka's rule is loaded, for a Maharashtra member at the ₹7,500 edge | A configuration task naming the Maharashtra key; the Karnataka edge is not applied and no edge is assumed | A neighbouring state's rule used as a fallback |
| TV79 | Release gate — a value written into `bonus.payment_deadline` with no instrument, URL or capture date | The release is refused, naming the key and the missing attribute | A value shipped with an empty basis |
| TV80 | Parameter time travel — `epf.eps_closure_boundary_inclusive` set on 1 July 2026, a March 2026 month re-run in October 2026, and a parameter that reaches SUPERSEDED with no successor captured | The retro run reads the value that governed March 2026; the replay of the original March run reproduces the original belief; the superseded key returns to UNSET on the successor's commencement date and its dependants re-block | Today's value applied to a corrected earlier period; a superseded value carried forward because "it worked last month" |
| TV81 | Refusal payload — a downward ECR correction requested after the challan exists | The response names class B, quotes EV-037's condition, lists the routes that remain, records the diff and offers the §22 runbook. No file is emitted | "Failed", "invalid", or a silent no-op |
| TV82 | Fence integrity — a tenant setting that would allow Form 138 Q4 generation before the format publishes | No such setting exists; the fence lifts only through §22.8's publish gate with all three release conditions met | A per-tenant override that opens a class-A fence |
| TV83 | Counsel gate — sign-off recorded against Part D-5, then a Form I export | Field 24 renders from the Aadhaar token store; every other refusal in the catalogue is unchanged and NEG-32's hard-block configuration remains unavailable | Sign-off on one item read as clearance for the others, or a "no Aadhaar, no payroll" option appearing |
| TV84 | Refusal metering — eleven refusals across three establishments in one month | Each is logged with class, key, artefact, establishment and period; the class mix is reportable and a class-C backlog is attributable to a named parameter | Refusals counted as generic errors, so a compliance-data backlog is invisible |

<!-- DIAGRAM: statutory-spine-wage-base-fanout -->

**Bottom line for the spine.** Every entry above is a deterministic, effective-dated,
retrospectively-recomputable rule feeding a filing. **[Reversed]** Earlier drafts
concluded "no differentiation on statutory breadth"; Frappe also lacks the ECR, ESI,
TDS-statement and certificate artefacts this section specifies (EV-031 — source
repository read, not executed), and §21 owns the full parity and pricing comparison.
What makes the spine defensible is not that these rules exist in the product but that
they are **maintained** — through Budget changes, wage-ceiling revisions, state slab
updates, the Form 138 Q4 layout, the ESI cliff, the Code-era bonus ceilings, and the
uneven roll-out of state rules under four Codes. That maintenance is the operating
model (§22), and this spine is its specification.

---

### 06.15 The statutory datum map — one fact, many artefacts

Every subsection above specifies **one artefact**: the ECR line field by field, Form I
field by field, Form IX column by column, the Form 138 record types, the
register–filing reconciliation matrix. A build team needs the inverse index as well —
**keyed on the datum, not on the form** — because that is the direction in which
defects travel. A missing date of exit does not present itself as "Form I field 31 is
empty"; it presents itself four artefacts later, as a rejected ECR line, an
unreconciled register and a joint declaration that takes weeks (EV-041). This
subsection is that index, and the three rules it enforces.

It does not restate the reconciliation matrix (§06.9). That matrix checks pairs of
**renders** against each other. This map states which **single** datum both renders
read, so that in a correct build the matrix has nothing left to catch: it becomes a
regression detector rather than a repair step.

**R55 — one canonical datum per statutory field.** Every field of every statutory
artefact in this spine is a render of exactly one canonical datum held in the data
model (§14). No artefact, export, register instance or filing ledger row holds its own
copy of a value another artefact also carries. Where two forms need the same fact in
different shapes — a date as `ddmmyyyy` in Form 138 (F138-5) and as the form's own
date format in Form I field 31 — the *shaping* is per-artefact, the *value* is not.

**R56 — the writer is single and named.** Each datum has exactly one writing subsystem
(its "writer"). A subsystem that is not the writer may read the datum and may raise a
correction, but may never set it. This is what stops the two failure modes the
registers specification warns about: a register corrected by hand so that it no longer
matches the return, and a return regenerated from a store that a downstream export has
quietly amended.

**R57 — absence has a specified behaviour, and it is never a payroll block.** Every
datum row below carries what happens when the datum is missing at the moment an
artefact needs it. Three behaviours are permitted: the field renders empty **with a
reason code** (Form I's rule, discharged through field 36); the **member** is excluded
from a filing and flagged, with operator and employee notices (Part E-11, EV-040's
flag/block split); or the **artefact** is not generated and a configuration task is
raised. What is never permitted is holding an employee's pay, blocking onboarding or
blocking a punch (Part D-10, R18).

<!-- DIAGRAM: statutory-spine-datum-fanout -->

#### The datum row — schema

Each row of the map is an object in the rule store, authored through §22.8's pipeline
alongside the rule rows, and carries:

| Attribute | Meaning |
| --- | --- |
| `datum_key` | Stable identifier, never a form field number — form numbering is per rule-set and per state (R19) |
| `grain` | `tenant`, `establishment`, `establishment-period`, `employee`, `employee-period`, `employee-day` or `event`. The grain decides what a correction re-derives |
| `owning_entity` | The §14 entity that holds it |
| `writer` | The one subsystem that may set it |
| `consumers` | Artefact and field, one entry per render |
| `absence_behaviour` | One of the three permitted behaviours in R57, named per consumer where they differ |
| `correction_route` | What happens when the datum changes after each payroll-month state (the propagation table below) |
| `class` | SPDI r.3 category where one applies, `identifier`, `financial information`, `biometric information`, or `ordinary` — never "sensitive under DPDP", which has no such category (EV-059, EV-060; Part D-19) |

#### The map — identity and identifiers

| `datum_key` | Grain | Writer | Consumers | Absence behaviour | Class |
| --- | --- | --- | --- | --- | --- |
| `employee.legal_name` | employee | Employee master (§07) | Form I fields 2–3; Form IV identification block (1)–(17); Form XXII; Form V wage slip; Form 130 distribution record | Cannot be absent — onboarding requires it | Ordinary |
| `employee.name_as_per_uan` | employee | Identifier store (§07 FR-CHR-009a) | ECR field 2; part-payment field `MEMBER_NAME` | Member excluded and flagged; never overwritten from the legal name | Identifier |
| `identifier.uan` | employee | Identifier store | ECR field 1; part-payment field `UAN`; Form I field 18 | ECR: exclude-and-flag with both notices, M+4 clock starts (R30). Form I: empty with a reason code | Identifier |
| `identifier.pan` | employee | Identifier store | Form 138 DD records; Form 130 Parts A–C; Form I field 19 | Statement generation proceeds with the deductee flagged; the operative-status check is separate and its consequence ships dark (`tds.inoperative_pan_rule`, R24) | Identifier |
| `identifier.esic_ip` | employee | Identifier store | ESI contribution upload; Form I field 23; ESI Form 6 render | Artefact-level: the member cannot be uploaded, an enrolment task is raised, pay proceeds | Identifier |
| `identifier.aadhaar_token` | employee | Aadhaar token store (Part E-6) | Form I field 24 only, rendered at export from the token store | Empty with a reason code; ships dark until the Part D-4/D-5 items clear (R24). Never a condition of employment, payroll or any benefit (Part D-10) | Aadhaar — token store |
| `identifier.tan` | tenant or establishment | Deductor master (§06.5) | Form 138 FH and BH records; `.csi` match under F138-8; Form 130 | Generation stops — F138-8 is a block | Identifier |
| `bank.account_number`, `bank.ifsc` | employee | Bank record (§07) | Form I fields 25–27; Form IV column (29) receipt or bank transaction ID | Empty with a reason code in the register; the disbursement file is §16's concern | Financial information — SPDI r.3, written consent under r.5(1) (EV-060), duty-holder under counsel review (Part D-4) |
| `employee.date_of_birth` | employee | Employee master | Form I field 6; the age-58 EPS branch (EV-040); the old-regime age bands (§06.5) | Cannot be absent — the EPS branch and the age bands both need it; a configuration task at onboarding | Ordinary |
| `employee.gender` | employee | Employee master | Form I field 4; Form XXII membership; PT gender variants (§06.4) | Empty with a reason code; Form XXII membership then unresolved and flagged | Ordinary |
| `employee.nationality` | employee | Employee master | Form I field 8; International Worker status (§06.2) | As stored; absent means the IW branch is not taken and is flagged, never assumed | Ordinary |
| `employee.family`, `employee.nominee` | employee | Family and nomination records (§07, §11) | Form I fields 20–21 under `formi.render.20` and `formi.render.21`; gratuity nomination under CoSS s.55 | Empty with a reason code; each nominee shown with its scheme until the render rule is set | Ordinary |
| `employee.photo` | employee | Document store | Form I field 34 | Empty with a reason code; never sourced from a bulk image bucket (Part E-6) | Biometric information under Aadhaar Act s.2(g) (EV-071) |
| `employee.signature_or_thumb` | employee | Consent-bound capture (§07, §14) | Form I field 35 | Signature is the default; the thumb-impression branch ships dark (R24) | Biometric information — SPDI r.3 for a thumb impression |

#### The map — employment and assignment

| `datum_key` | Grain | Writer | Consumers | Absence behaviour | Class |
| --- | --- | --- | --- | --- | --- |
| `employment.date_of_joining` | employee | Employment record (§14.4.2) | Form I field 10; the ECR contribution window (EV-040); the gratuity service ledger; the EPS first-join branch (§06.2) | Cannot be absent; a late entry re-derives from its effective date, never from the entry date (R45, TV56) | Ordinary |
| `employment.date_of_exit` | employee | Employment record | Form I field 31; ECR contribution window; EPFO's recorded date of leaving; the F&F clock under `wages.fnf_trigger_event`; gratuity settlement | A contribution after an exit date is refused by EPFO (EV-040). A **wrong** exit date is not repairable in product: it needs the joint declaration (EV-041), which can block a month (R31 row 10) | Ordinary |
| `employment.exit_reason` | employee | Exit-reason code (§08) | Form I field 32 | Empty with a reason code; a gratuity forfeiture reason stays a separate field (§06.6) | Ordinary |
| `employment.designation` | employee-period | Governed designation list (§07 FR-CHR-024) | Form I fields 11 and 16; Form IX column (4); OSH s.33(a)(i) particulars under `osh.s33.work_performed_render` | Empty with a reason code | Ordinary |
| `employment.category` | employee-period | Closed list — Highly Skilled / Skilled / Semi skilled / Unskilled | Form I field 12; the minimum-wage rate selection (§06.9) | Blocks the minimum-wage comparison at the artefact level with a configuration task; pay proceeds at the stated rate with the check flagged | Ordinary |
| `employment.type` | employee-period | Closed list — Permanent / Temporary / Fixed Term / Trainee / Badli | Form I field 13; counting-unit membership (§06.1); the fixed-term gratuity branch (§06.6) | Held `unconfirmed`, which yields POSSIBLE in the two-bound count, never a silent inclusion or exclusion (R25) | Ordinary |
| `assignment.work_location` | employee-period | Assignment record (§14) | Form I field 14; Form IX column (6); jurisdiction resolution — state, sphere and Code-regime date (Part E-5); ESI area test (§06.3); PT state (§06.4) | The artefact that needs the jurisdiction is not generated and a configuration task is raised; ESI coverage reads POSSIBLE where the area status is unknown (R33) | Ordinary |
| `assignment.offsite_note` | employee-day | Attendance close (§09) | Form IX column (10) | The cell is empty; an off-site day with no note is flagged at month close | Ordinary |

#### The map — time

| `datum_key` | Grain | Writer | Consumers | Absence behaviour | Class |
| --- | --- | --- | --- | --- | --- |
| `time.punch_pair` | employee-day | Attendance close (§09) | Form IX column (7) In and Out sub-columns | An unpaired cell is regularised before the month closes; the sheet never closes with an unexplained gap (TV19) | Ordinary |
| `time.days_worked` | employee-period | Derived at attendance close | Form IX column (8) | Derived, never keyed — absence is a defect in the day-status ledger, not a missing input | Ordinary |
| `time.overtime_hours` | employee-period | Derived at attendance close | Form IX column (9); Form IV earnings block; the overtime wage rule (§06.9) | Derived. Any quarterly cap is **warn-only** and may never stop a punch, a roster, a pay run or a filing (K-04, R17) | Ordinary |
| `time.ncp_days` | employee-period | Derived from the day-status ledger (§09 FR-FIL-001) | ECR field 10; the proration of ECR fields 4–9 | Derived. A member whose NCP days equal the month is still a line in the return, not an omission | Ordinary |
| `time.leave_record` | employee-period | Leave subsystem (§09) | FORM-XX; paid-days in Form IV; never a punch in Form IX | Empty; FORM-XX's destruction bar under OSH r.76(2) applies to the register, not to the datum (R21) | Ordinary |

#### The map — money

| `datum_key` | Grain | Writer | Consumers | Absence behaviour | Class |
| --- | --- | --- | --- | --- | --- |
| `wage.pf_base` | employee-period | Payroll run (§08), after the s.2(88) add-back (§06.10) | ECR field 4; ECR fields 5–6 by ceiling; ECR fields 7–9 by rate; the gratuity base | Derived. It is the add-back's output, so it can differ from both gross and basic — never substituted by either | Ordinary |
| `wage.gross` | employee-period | Payroll run | ECR field 3 under `ecr.gross_wages_basis`; ESI coverage and contribution bases (§06.3); Form IV earnings block; Form V wage slip | ECR field 3 missing is a **block** (EPFO's own severity). The basis parameter decides which figure is written until a portal-accepted file pins it | Ordinary |
| `wage.payment_of_wages_base` | employee-period | Payroll run | The 50% deduction cap (s.18(3)); Form IV column (26) | Derived; a cap breach is carried forward under `wages.deduction_priority` and `wages.deduction_overflow_manner`, never taken and never dropped (R43) | Ordinary |
| `contrib.employee_pf` | employee-period | Payroll run | ECR field 7; part-payment `EPF_CONTRIBUTION`; Form IV column (18) | Derived. Below the rate × field 4 is an EPFO block (EV-040) | Ordinary |
| `contrib.employer_eps` | employee-period | Payroll run | ECR field 8; part-payment `EPS_CONTRIBUTION` | Derived. Non-zero past age 58 without a deferred-pension marking is EPFO's only hard EPS block (EV-040) | Ordinary |
| `contrib.employer_pf` | employee-period | Payroll run | ECR field 9; part-payment `EPF_EPS_DIFF_CONTRIBUTION` | Derived as field 7 less field 8 — EPFO's own arithmetic, 1,800 − 1,250 = 550 (EV-035) | Ordinary |
| `contrib.employee_esi`, `contrib.employer_esi` | employee-period | Payroll run | ESI contribution upload; Form IV column (19) for the employee share | Derived; rounding under `esi.rounding_rule`, which has no shipped value (§06.3) | Ordinary |
| `pf.refund_of_advance` | employee-period | Refund ledger (§08) | ECR field 11; part-payment `REFUND_OF_ADVANCES` | Zero is a value, not an absence | Ordinary |
| `tax.deducted` | event — one payment | Payroll run and the deposit record | Form 138 DD records; Form IV column (21) summed over the quarter; Form 130 Parts A–B through TRACES | Derived; the quarter is chosen by the **payment date**, never by the wage month (R47, TV63) | Ordinary |
| `tax.challan_cin` | event — one deposit | The `.csi` import (§22) | Form 138 CD records; F138-8's TAN and TAN-name match | Generation stops — F138-8 is a block | Ordinary |
| `deduction.item` | employee-period | Payroll run | Form IV columns (18)–(27) in the gazette's printed order; the wage slip | Each deduction has its own column; a single "other deductions" bucket fails the form (TV21) | Ordinary |
| `fine.record` | event | Payroll run with the s.19(8) authority field (r.51(2)) | Form IV columns (30)–(31) — nature of act or omission with its date, and the amount | A fine without its act-or-omission record and date is **incomplete**; the register render flags it rather than printing an amount alone | Ordinary |
| `damage.record` | event | Payroll run | Form IV column (32), the damage or loss caused by neglect or default; the recovery in column (25) | As for a fine | Ordinary |
| `payment.date`, `payment.reference` | employee-period | Disbursement (§16) | Form IV columns (28)–(29); the s.17(1) due-date check | A date later than the due date is a late-payment flag, never a suppressed row | Ordinary |
| `pt.wage_basis_amount` | employee-period per work state | Payroll run | The state PT return; the per-person year-to-date | `pt.<state>.wage_basis` unset raises a configuration task; `registration_pending` is never a zero line (R34) | Ordinary |

#### The map — establishment and registration

| `datum_key` | Grain | Writer | Consumers | Absence behaviour | Class |
| --- | --- | --- | --- | --- | --- |
| `establishment.registration` per authority | establishment | Registration record (§14) | Every filing ledger row; the ECR establishment header controls; the ESI upload; the PT return; Form I header's registration number, footnoted LIN | The obligation stays on the calendar with a registration task; the artefact is not generated (R50) | Ordinary |
| `establishment.esi_area_status` | establishment | Compliance data pipeline (§22.8) | The ESI establishment coverage decision (§06.3) | Unknown status yields POSSIBLE with an area task; a location ESIC has not notified is **not covered**, with no POSSIBLE warning (R33, TV72) | Ordinary |
| `esi.contribution_start_date` | establishment | ESIC registration record | The month from which ESI instances are due | Unset blocks the ESI artefact with a configuration task; pay proceeds | Ordinary |
| `appropriate_government.<code>`, `code_regime.<state>.<code>` | establishment | Onboarding, with its basis recorded | Rule-set resolution for every register form and threshold (R50) | No central form is assumed; a configuration task and the obligation stays on the calendar (TV60) | Ordinary |
| `establishment.headcount_bounds` | establishment-day | The two-bound counter (§06.1) | Every threshold test; the obligation lifecycle O1–O12 | A gap between bounds yields POSSIBLE, never a silent trigger or a silent miss (R25) | Ordinary |

#### Propagation — what a changed datum re-derives, by payroll-month state

The payroll month runs `OPEN → INPUTS_CLOSED → PROCESSED → APPROVED → LOCKED →
DISBURSED → PAYMENT_INITIATED → FILED`, reversible before LOCK, with the statutory
verification gate immediately before `PAYMENT_INITIATED` (Part E-1; the machine itself
is §08's). What a datum change costs depends entirely on where the month has got to.

| State when the change lands | What happens to the datum | What re-derives | What is refused | Route |
| --- | --- | --- | --- | --- |
| `OPEN`, `INPUTS_CLOSED` | Written by its writer | Everything downstream, in the next run | Nothing | Ordinary correction |
| `PROCESSED` | Written | The run is re-executed; all consumers re-render | Nothing | Re-run before approval |
| `APPROVED` | Written only by reversing to `PROCESSED` | As above | Silent amendment of an approved run | Reversal, recorded with its approver |
| `LOCKED`, `DISBURSED` | Written into a **correction run**, never into the locked month | The correction run's outputs; the locked month's artefacts stay as filed | Editing a locked month's artefact | Correction run; the register instance takes an **appended amendment entry** (L3), never an edit |
| `PAYMENT_INITIATED` for the filing that carries it | Written into a correction run | The correction run's outputs | Any **downward** ECR correction — the route does not exist once payment is initiated (EV-037) | The ten-row return-route table (§06.2). A generated challan counts as payment initiated |
| `FILED` | Written into a correction run | The correction run's outputs | Mutating the approved return in our ledger | Recorded as a **diff against** the approved return, never a mutation (R14, Part E-1), with the §22 runbook |

Two consequences the build team should read as requirements rather than as commentary.
First, **the verification gate is the last cheap moment**: every reconciliation in the
§06.9 matrix, and every SA-REC check, must complete before `PAYMENT_INITIATED`,
because the downward route closes there and nowhere else (R40). Second, **a
register instance and a return part company at LOCK**: the return's correction is a
portal route, the register's correction is an appended amendment entry whose date may
restart the retention clock under `retention.amendment_restarts_clock` (R39). A
design that treats both as "edit the record" gets the second one wrong silently.

#### Blast radius, worked — one attendance regularisation, four artefacts

Take member **M5** from §06.2's worked return lines: PF wages ₹15,000 for a full
month, 10 NCP days out of 30, calendar-day proration (§08 FR-PAY-104). The wage month
is LOCKED and the ECR has been generated but not yet paid. A regularisation lands:
the 10 non-contributory days were a recording error and the member in fact worked the
whole month. Every rate below is this section's verified one.

**Before** — the generated line, and the establishment-side heads for this member:

| Head | Basis | Amount |
| --- | --- | --- |
| ECR field 4, EPF Wages | ₹15,000 × 20 ÷ 30 | ₹10,000 |
| ECR field 7, employee PF | 12% | ₹1,200 |
| ECR field 8, employer EPS | 8.33% | ₹833 |
| ECR field 9, employer PF | field 7 less field 8 | ₹367 |
| EDLI | 0.50% of ₹10,000 | ₹50 |
| EPF admin | 0.50% ([Hypothesis] rate, §06.2) | ₹50 |
| **Remitted for this member** | | **₹2,500** |

**After** — NCP days fall to zero, so the member returns to the EPFO Help File fixture:

| Head | Basis | Amount | Delta |
| --- | --- | --- | --- |
| ECR field 4 | Full month | ₹15,000 | +₹5,000 |
| ECR field 7 | 12% | ₹1,800 | +₹600 |
| ECR field 8 | 8.33%, capped at ₹1,250 | ₹1,250 | +₹417 |
| ECR field 9 | field 7 less field 8 | ₹550 | +₹183 |
| EDLI | 0.50% | ₹75 | +₹25 |
| EPF admin | 0.50% ([Hypothesis]) | ₹75 | +₹25 |
| **Remitted for this member** | | **₹3,750** | **+₹1,250** |

The single datum that changed is `time.ncp_days`, grain employee-period, writer the
attendance close. Following the map, it re-derives:

1. **ECR field 10** from 10 to 0, and **fields 4 to 9** through the proration — the
   line moves from `…#~#10000#~#10000#~#10000#~#10000#~#1200#~#833#~#367#~#10#~#0`
   (TV32) to the fixture line `…#~#15000#~#15000#~#15000#~#15000#~#1800#~#1250#~#550#~#0#~#0`
   (TV16).
2. **Form IX columns (8) and (9)** — days worked and overtime, both derived, both
   re-rendered from the day-status ledger.
3. **Form IV column (18)**, EPF, from ₹1,200 to ₹1,800, which is precisely the
   reconciliation the matrix checks against ECR field 7 at the verification gate.
4. **The ESI leg.** On the same ₹15,000, coverage wage inside the ₹21,000 limit: the
   employee share at 0.75% moves from ₹75 to ₹112.50 and the employer share at 3.25%
   from ₹325 to ₹487.50, each before the per-employee rounding `esi.rounding_rule`
   fixes — a parameter with no shipped value, so the month raises a configuration task
   rather than choosing (§06.3, TV37). The ESI upload and its challan follow their own
   route.

**The route.** The change is **upward** and payment has not been initiated, so the
return-route table offers a **Revised** return: it requires an approved Regular return,
no other return in process, and no payment initiated (EV-037). Had the challan already
been generated, the Revised route would be closed and the upward route is held —
§06.2 does not offer it until it is validated on a live portal — while a **downward**
correction would have had no ECR route at all. The same regularisation therefore costs
one re-generation before the challan and a §22 runbook after it. That asymmetry, not
the rupees, is why the verification gate sits where Part E-1 puts it.

**The negative case.** Suppose instead the regularisation had gone the other way — the
member did not work 10 of the days already returned, so ECR field 4 falls. Before
payment initiation the Revised route exists. After it, the route does not, the engine
refuses it with the EV-037 reason rather than emitting a file the portal will not take,
records the diff against the approved return, and the over-remittance becomes a §22
matter. The engine never presents a "corrected" ECR it cannot file (NEG-06 below).

#### Acceptance criteria — R55 to R57

| Req | Given | When | Then | Vector |
| --- | --- | --- | --- | --- |
| R55 | Form I field 18 and ECR field 1 for the same member | Both artefacts are rendered | Both read `identifier.uan`; no second stored copy exists in either artefact's own tables | TV74 |
| R55 | A tenant that edits a rendered register export | The next inspection export is produced | The export re-renders from the store; the edited copy is not a source and is not carried forward | TV74 |
| R56 | A disbursement subsystem that attempts to set `employment.date_of_exit` | The write is attempted | It is refused; a correction is raised against the employment record's writer instead | TV75 |
| R57 | A member with no UAN at ECR generation, and the same member's Form I render | The artefacts are produced | The ECR excludes and flags the member with both notices and starts the M+4 clock; Form I field 18 renders empty with a reason code in field 36; the pay run completes | TV13, TV34, TV76 |
| R57 | An employee who has not provided Aadhaar | Onboarding, payroll and the Form I export all run | None is blocked; field 24 is empty with a reason code | TV20 |

---

### 06.16 The parameter register — every unset value, its owner and its behaviour

§06.13 lists what is **unknown** and how each unknown gets resolved. This subsection
is the other axis: how an unknown **behaves in the engine while it stays unknown**. The
two are deliberately separate objects. An open item closes when a primary source is
captured; a parameter has a life of its own before that — it is read at run time, it
decides whether an artefact is produced, it can be set for one tenant and not another,
and it has to be retired without breaking the runs that already read it. A register
that conflates the research question with the run-time switch produces the failure R18
exists to prevent: a value quietly filled in from memory because someone needed the
run to finish.

The section-head rule stands over everything here: **no value marked "carried, not
re-captured" ships with a default.** The parameter is empty at tenant creation, and a
computation that needs it raises a blocking *configuration* task for the operator.

#### The parameter object

A parameter is a first-class row in the rule store, authored and reviewed through the
same two-person pipeline as a rule row (§22.8), and carrying:

| Attribute | Meaning |
| --- | --- |
| `key` | The dotted name used in this section. Stable across releases; retained as an alias for one release after promotion |
| `scope` | `global` (statutory, one value for everyone), `state`, `tenant`, `establishment` or `member`. Scope decides **who may set it** — see the override rule below |
| `domain` | The permitted values or the type. A parameter whose domain is not known is still a parameter: its domain is `unknown` and only the unset class runs |
| `unset_class` | One of C0–C9 below. This is the only thing that decides run-time behaviour while the value is empty |
| `owner_role` | Statutory lead, counsel (§23), the §05 release plan, the §22 compliance-operations analyst, or the tenant's payroll operator |
| `basis` | Once set: the instrument, its identifier, the capture URL and the capture date. An empty basis with a non-empty value is itself a defect — the release gate refuses it |
| `effective_from`, `effective_to` | The period the value governs, so a retro run reads the value that governed the period it is correcting (R3) |
| `decided_at` | Decision time, so a replay reproduces what the engine believed then, not what it believes now (Part E-2, §15) |
| `open_item_ref` | The §06.13 row that will close it |
| `counsel_gate` | The Part D item, where one applies. A counsel-gated key stays dark **even when a value exists** (R24) |
| `vectors` | The §06.14 vectors that exercise it |
| `blast_radius` | The artefacts it can stop, from the datum map (§06.15) |

#### Unset classes — what an empty value does

The class is chosen once, per parameter, and is itself reviewed. It is not a run-time
judgement call.

| Class | Behaviour when the value is empty | Bound by |
| --- | --- | --- |
| **C0** | Owned by another section; recorded here only as a dependency. This section states no behaviour for it | The owning section |
| **C1 — CONFIG-BLOCKING-ARTEFACT** | The artefact is not generated. A configuration task is raised naming the key. **The pay run proceeds and the employee is paid** | R18, Part D-10 |
| **C2 — CONFIG-BLOCKING-FIELD** | One field is left unrendered with its reason; the rest of the artefact is produced. Form I discharges the reason through field 36 | R53, R20 |
| **C3 — WARN-ONLY** | The figure is computed and shown with a warning. It may never stop a punch, a roster, a pay run or a filing | R17, K-04 |
| **C4 — ALL-OUTCOMES** | Every reading is computed and shown; the operator records a choice with a reason; the choice is stored against the run. Nothing is silently capped, dropped or assumed | R34, R25 |
| **C5 — DARK-BRANCH** | The branch is disabled per tenant until counsel sign-off is recorded against the named Part D item. No customer-facing text states the position either way | R24 |
| **C6 — FORECAST-ONLY** | The engine forecasts, the authority's figure is the one paid, and any difference is raised as an SA-REC reconciling item. Liabilities that are not yet quantified are carried open, never zeroed | R32 |
| **C7 — CALENDAR-CONSERVATIVE** | The instrument's own unrolled date is used. No holiday roll, extension or grace is assumed | R42 |
| **C8 — TENANT-POLICY** | A genuine tenant election rather than a statutory unknown. The tenant sets it, with the choice recorded; it is never "resolved" by research | — |
| **C9 — PROVISIONAL-VALUE** | A named working value runs, with its reason shown on the artefact, and is never presented as verified. Used only where the source itself is internally inconsistent, or where the safer of two readings is identifiable | R18's exception, stated per key |

**The invariant across all classes.** Blocking is at the **artefact** or the **field**.
It is never at the person. No unset parameter may hold an employee's pay, block
onboarding, block a punch or refuse a payslip (Part D-10, R18, Part E-11).

#### Parameter lifecycle — transition table

<!-- DIAGRAM: statutory-spine-parameter-lifecycle -->

| # | From → To | Trigger | Guard | Side effect | Who may trigger |
| --- | --- | --- | --- | --- | --- |
| P1 | UNSET → PROVISIONAL | An operator records a choice for one tenant | `scope` is `tenant`, `establishment` or `member`, or the class is C4 and a run needs a decision | The choice, its reason and the run it was made for are stored; dependent artefacts unblock for that tenant only | Payroll operator, with the approver's countersignature where the choice moves money |
| P2 | UNSET → SET | The statutory lead sets a central value | `basis` present — instrument, identifier, URL and capture date | Dependent artefacts unblock for every tenant from `effective_from`; the §06.13 row moves to "value set, verification pending" | Statutory lead |
| P3 | PROVISIONAL → SET | A central value lands while tenant choices exist | Each tenant choice is reconciled to the central value or explicitly kept as a C8 election | Tenants whose choice differs are notified with the difference; runs already made are not re-opened | Statutory lead |
| P4 | SET → VERIFIED | Two-person review against the primary source | The reviewer is not the author (§22.8) | The value carries a capture date and a corrigendum-check date; the marker moves from [Hypothesis] to [Verified] | Statutory lead plus reviewer |
| P5 | PROVISIONAL → VERIFIED | The tenant's choice is confirmed by the primary source | As P4 | The choice is promoted to the central value; the tenant override is retired | Statutory lead plus reviewer |
| P6 | VERIFIED → PROMOTED | Published as a rule row through §22.8's staged publish | Golden-case regression corpus passes, including the key's named vectors | The value moves into the rule row with its citation; the key is kept as an alias for one release so any surviving override is visible | §22 publish gate |
| P7 | PROMOTED → SUPERSEDED | An amendment or corrigendum lands | The corrigendum-aware watcher fires (R8) | The rule row is effective-dated closed; runs for earlier periods keep reading it (R3) | Statutory watcher plus statutory lead |
| P8 | SUPERSEDED → UNSET | The successor's value is unknown | No successor instrument captured | The unset class applies again from the successor's commencement date; every dependent artefact re-blocks per its class | System, on the commencement date |
| P9 | SET → UNSET | The basis is withdrawn — the source is found to be secondary, mis-transcribed or retracted | A named person records the withdrawal and its reason | Dependent artefacts re-block; any customer-facing text that carried the value is pulled (Part D-20) | Statutory lead |

Three properties of this machine matter more than the transitions.

- **P8 is the ESI cliff's shape.** A value that was verified, published and then
  superseded with no successor does not fall back to its old figure. It returns to
  UNSET, and `esi.post_cliff_mode` decides what the November 2026 month does (S1–S4,
  §06.9). "It worked last month" is not a basis.
- **P9 exists because four research rounds needed it.** Roughly thirteen findings per
  dimension died on source re-verification (§02). A register with no path from SET back
  to UNSET quietly keeps the dead ones.
- **There is no transition to a value without a person.** Every arrow into SET,
  PROVISIONAL or VERIFIED names who may trigger it. No path fills a parameter from a
  neighbouring value, a previous period, a sibling state or a remembered figure.

#### The register

`key` names are as used above. "Gates" is the artefact or field that stops when the
value is empty; "open item" is the §06.13 row that closes it. Scope `global` means the
value is statutory and is set centrally — a tenant may not set it (see the override
rule below).

**EPF, EPS and EDLI**

| Key | Scope | Class | Owner | Gates when empty | Open item |
| --- | --- | --- | --- | --- | --- |
| `epf.admin_charge.minimum` | global | C6 | Statutory lead | The establishment's admin-charge forecast; the portal's Due Deposit Balance Summary is the figure paid | Carried, not re-captured — EPF |
| `epf.admin_charge.wage_basis` | global | C6 | Statutory lead | Which wage figure the admin charge runs on, for VPF-only members in particular | Interest and admin-charge arithmetic |
| `epf.ceiling_prorate_part_month` | tenant | C8 | Payroll operator | Nothing — it is an election, recorded with the run | — |
| `epf.damages_scale` | global | C6 | Statutory lead | The s.14B / CoSS s.128 damages figure; the liability is carried open until paid, never zeroed | EPF damages scale |
| `epf.eps_closure_boundary_inclusive` | global | C9 — working value "on or after", from FAQ Q14 | Statutory lead | Nothing; the boundary day is decided and shown, and the member carries EPFO's flag rather than a block | EPS closure boundary day |
| `epf.form_catalogue` | global | C1 | Statutory lead | Which EPF forms exist under Scheme 2026, keyed by scheme version | Carried, not re-captured — EPF |
| `epf.higher_wage_option_window` | global | C1 | Statutory lead | The joint higher-wage option workflow; EPS computes at the ceiling meanwhile | Carried, not re-captured — EPF |
| `epf.interest_base` | global | C6 | Statutory lead | Whether the admin charge is inside the 7Q interest base | Interest and admin-charge arithmetic |
| `epf.interest_day_count` | global | C6 | Statutory lead | The day-count convention and whether the due day itself counts | Interest and admin-charge arithmetic |
| `epf.post_cliff_eps_edli_mode` | global | C1 | Statutory lead with counsel | EPS and EDLI computation for wage months after the saving lapses | EPS 1995 and EDLI 1976 after the saving lapses |
| `epf.rounding_method` | global | C0 — owned by §08 FR-PAY-209 | §08 | Recorded here as a dependency of ECR fields 7–9 only | — |
| `eps.age58_part_month` | global | C1 | Statutory lead | The birthday month's EPS line. EPS never runs on days after the birthday, set or unset | EPS in the month a member turns 58 |
| `eps.early_pension_age` | global | C1 | Statutory lead | The EPS claim workflow, not the monthly return | Carried, not re-captured — EPF |
| `eps.min_service_years` | global | C1 | Statutory lead | As above | Carried, not re-captured — EPF |
| `eps.share_under_reduced_rate` | global | C1 | Statutory lead | ECR fields 8 and 9 for an establishment on the 10% rate | ECR content points outside EPFO's captured material |

**The ECR file**

| Key | Scope | Class | Owner | Gates when empty | Open item |
| --- | --- | --- | --- | --- | --- |
| `ecr.encoding` | global | C1 at general availability | Statutory lead with §22 | The generator stays in attended pilot until pinned from a portal-accepted upload. Never borrowed from the Form 138 CRLF rule | ECR content points outside EPFO's captured material |
| `ecr.line_terminator` | global | C1 at general availability | Statutory lead with §22 | As above | As above |
| `ecr.eps_wages_non_member` | global | C1 | Statutory lead | Field 5 for a post-2014 high earner or a member past 58 | As above |
| `ecr.gross_wages_basis` | global | C9 — working value: the payment-of-wages base | Statutory lead | Nothing; the basis is named on the artefact until a portal-accepted file confirms it | As above |
| `ecr.part_payment_mapping` | global | C1 | Statutory lead | The six-field part-payment generator (EV-044) | As above |
| `ecr.uan_pattern` | global | C9 — working value: twelve digits, from the Help File samples | Statutory lead | Nothing; a UAN outside the pattern is flagged, not refused | As above |
| `ecr.vpf_field` | global | C9 — working assumption: field 7 | Statutory lead | Nothing; the assumption is stated on the artefact and confirmed from a portal-accepted file | As above |

**ESI**

| Key | Scope | Class | Owner | Gates when empty | Open item |
| --- | --- | --- | --- | --- | --- |
| `esi.average_daily_wage_basis` | global | C1 | Statutory lead | The ₹176 average-daily-wage test for the month. Neither share is waived on an unstated divisor | ESI divisor, re-entry and contribution start |
| `esi.cliff_month_split` | global | C1 | Statutory lead with counsel | How the November 2026 wage month splits across the cliff | Post-cliff parameters |
| `esi.contribution_start_date` | establishment | C1 | Payroll operator, from the ESIC registration record | The month from which ESI instances are due | ESI divisor, re-entry and contribution start |
| `esi.damages_scale` | global | C6 | Statutory lead | The damages figure; carried open until paid | Carried, not re-captured — ESI |
| `esi.post_cliff_mode` | global | C1 | Statutory lead with counsel | Every ESI filing instance for wage months after the saving lapses | ESI regime after the saving lapses |
| `esi.reentry_timing` | global | C1 | Statutory lead | The re-enrolment event when a member's coverage wage falls back to the ceiling | ESI divisor, re-entry and contribution start |
| `esi.rounding_rule` | global | C1 | Statutory lead | Per-employee rounding of both shares; the establishment total and the challan cannot be allowed to differ by rounding | Carried, not re-captured — ESI |

**Professional Tax**

| Key | Scope | Class | Owner | Gates when empty | Open item |
| --- | --- | --- | --- | --- | --- |
| `pt.MH.band_boundary_rule` | state | C1 | §22 analyst | The ₹7,500 band edge for Maharashtra | PT band edges, wage basis and the cross-state ceiling |
| `pt.<state>.wage_basis` | state | C1 | §22 analyst | Which wage figure the state's bands read | As above |
| `pt.OD.income_basis`, `pt.OD.topup_month` | state | C1 | §22 analyst | Odisha's basis and its "last month" top-up | As above; Odisha PT levy status |
| `pt.<state>.*` slabs, due days and values | state | C1 | §22 analyst | The state's PT line and return. No value ships for a state other than those verified | State PT/LWF due days and rupee values; PT dataset, all states |
| `pt.article276_cap_scope` | global | C4 | Statutory lead with counsel | Nothing — every reading is computed, the operator records a choice, and a cross-state excess is flagged and never silently capped | PT band edges, wage basis and the cross-state ceiling |
| `lwf.<state>.*` | state | C1 | §22 analyst | The state's LWF line and return. No rate or split is verified from any government source | LWF dataset, all states |

**TDS, Form 138 and Form 130**

| Key | Scope | Class | Owner | Gates when empty | Open item |
| --- | --- | --- | --- | --- | --- |
| `tds.inoperative_pan_rule` | global | C5 | Counsel (§23) | The inoperative-PAN branch ships dark. The employee's pay is never blocked and no customer-facing text states the exposure either way | Inoperative-PAN consequences for the employer |
| `tds.interest.late_deposit` | global | VERIFIED — 1.5% per month, Income-tax Act 2025 s.398(3)(a) | Statutory lead | — | — |
| `tds.interest.non_deduction` | global | VERIFIED — 1% per month, same source | Statutory lead | — | — |
| `tds.late_fee_cap` | global | C6 | Statutory lead | Any cap on the daily late-filing fee | 2025-Act equivalents of 1961-Act provisions |
| `tds.penalty.statement_default` | global | C6 | Statutory lead | The statement-default penalty range | As above |
| `tds.penalty.certificate_delay` | global | C6 | Statutory lead | The per-day certificate-delay amount | As above |
| `tds.standard_deduction.<regime>` | global | C1 | Statutory lead | The year's TDS computation for the regime | Carried, not re-captured — TDS |
| `tax.pf_interest_threshold.with_employer`, `.without_employer` | global | C1 | Statutory lead | The taxable-interest tracking that feeds Form 130, not the monthly ECR | As above |
| `tax.gratuity_exemption_ceiling` | global | C1 | Statutory lead | The exemption computation at settlement. It never shares a field with the payable ceiling | As above |
| `tax.section_map.interest_short_deduction` | global | C2 | Statutory lead | The vocabulary resolver answers "successor unmapped" rather than asserting the pair | 2025-Act equivalents of 1961-Act provisions |
| `tds.f138.legacy_column_labels` | global | C2 | Statutory lead | A legacy 301–327 label lookup returns "label not captured", never a neighbouring column | Legacy 24Q column labels 301–327 |
| `tds.q4_build_lead_days` | global | C3 | §05 release plan with §22 | Nothing — it is the alarm that says when the Q4 release stops being buildable in time | Form 138 Q4 slippage parameters |
| `tds.q4_contingency_trigger_date` | global | C3 | §05 release plan with §22 | Nothing — it is the date a late release becomes a customer-facing risk | As above |

**Registers, OSH and the Code on Wages**

| Key | Scope | Class | Owner | Gates when empty | Open item |
| --- | --- | --- | --- | --- | --- |
| `formi.render.15` | global | C2 | Statutory lead | Form I field 15 — which pay figure the form wants | Form I and Form IX render rules |
| `formi.render.16` | global | C2 | Statutory lead | Field 16 — latest promotion or full history | As above |
| `formi.render.20` | global | C2 | Statutory lead | Field 20 — which nomination; each nominee is shown with its scheme meanwhile | As above |
| `formi.render.21` | global | C2 | Statutory lead | Field 21 | As above |
| `formi.render.30` | global | C2 | Statutory lead | Field 30 — empty with a reason code where the tenant keeps no service book | As above |
| `osh.adolescent_definition` | global | C2 | Statutory lead | The adolescent flag stays underived; a state form that asks raises a configuration task | OSH Code s.33 particulars |
| `osh.s33.work_performed_render` | global | C2 | Statutory lead | Whether designation and posting discharge "work performed"; no free-text duty description is invented | As above |
| `osh.form_xvii_part_iv_chapter_test` | global | C9 — working reading `either` | Counsel (§23) | Nothing; the safer reading runs and the counsel item is named on the obligation | Form XXIII and FORM-XVII Part IV |
| `ss.form_xxiii_chapter_test` | global | C9 — working reading `either` | Counsel (§23) | As above | As above |
| `retention.amendment_restarts_clock` | global | C9 — working reading: yes, the longer clock | Counsel (§23) | Nothing; the longer reading runs and is flagged | Register close cadence and clock readings |
| `retention.calendar_years_reading` | global | C9 — working reading: the later of the two | Counsel (§23) | Nothing; the later reading runs | As above |
| `register.close_cadence.<register>` | global | C1 | Statutory lead with counsel | No automatic close for Form I, FORM-XIX and Form XXII. Closing is an operator action with a recorded basis, so no retention clock starts on a guess (R21) | As above |
| `register.print_languages.<state>` | state | C1 | §22 analyst | The print-and-sign export for that state; OSH r.72(7)(i) requires English or Hindi **and** the local language | Print languages for physical registers |
| `form_ix_non_working_marker`, `form_ix_multi_session_render` | global | C0 — owned by §09 | §09 | Recorded here as Form IX render dependencies | Form I and Form IX render rules |
| `wages.deduction_priority` | global | C9 — working reading: the excess is carried forward in full | Statutory lead | Nothing; the ordering is named as unset on the run, and nothing is taken above the cap or dropped | Code on Wages timing and deductions |
| `wages.deduction_overflow_manner` | global | C9 — as above | Statutory lead | As above | As above |
| `wages.fnf_trigger_event` | global | C1 | Statutory lead | The two-working-day full-and-final clock | As above |
| `calendar.working_days.<establishment>` | establishment | C1 | Payroll operator | The working-day arithmetic the F&F date needs | As above |

**Bonus, POSH, counting and the calendar**

| Key | Scope | Class | Owner | Gates when empty | Open item |
| --- | --- | --- | --- | --- | --- |
| `bonus.infancy_years` | global | C1 | Statutory lead | The infancy exemption for a new establishment | Carried, not re-captured — gratuity and bonus |
| `bonus.set_on_off_years` | global | C1 | Statutory lead | Set-on and set-off carry-forward | As above |
| `bonus.payment_deadline` | global | C1 | Statutory lead | The bonus row on the derived calendar | Code on Wages bonus ceilings and timing |
| `bonus.annual_return_form` | global | C1 | Statutory lead | The annual bonus return artefact | As above |
| `posh.lc_count_scope` | global | C4 | Counsel (§23) | Nothing — both counting scopes are shown for a unit below ten workers, and the complaint route is stated for each | POSH counting scope and reporting |
| `posh.annual_report_period` | global | C1 | Counsel (§23) | The annual report's period; s.21 frames a calendar year | As above |
| `count.epf.apprentice`, `count.epf.director`, `count.<statute>.<engagement type>` | global | C4 | Statutory lead | Nothing — both bounds are computed and the gap yields POSSIBLE, never a silent trigger or a silent miss (R25) | Counting-unit membership; Apprentice exclusion from counts |
| `calendar.<obligation>.holiday_roll` | global | C7 | Statutory lead | Nothing — the instrument's own unrolled date is used and no roll is assumed | Calendar steps |
| `calendar.r98_8_clock_start` | global | C9 — working reading: the earlier day 15, with the later day 22 shown beside it (§06.11) | Statutory lead | Nothing; both readings are shown on the alert | As above |
| `appropriate_government.<code>`, `code_regime.<state>.<code>` | establishment | C1 | Payroll operator at onboarding, with the basis recorded | Every register form and threshold that depends on rule-set resolution. No central form is assumed | Appropriate Government and state commencement |

#### Who may set what — the override rule

| `scope` | May be set by | May **not** be set by | Why |
| --- | --- | --- | --- |
| `global` | Statutory lead, with a basis; counsel where the key carries a `counsel_gate` | A tenant, an operator, or support | It is a statement about the law, not about this customer. A tenant-settable statutory value is how a wrong figure spreads one customer at a time |
| `state` | §22 analyst, from the state's own instrument | A tenant | Same reason, per state |
| `tenant`, `establishment` | The tenant's payroll operator, with the approver's countersignature where the choice moves money | Support acting alone | It is an election or a local fact |
| `member` | The payroll operator, recorded against the member | — | It is a per-member fact, such as a recorded higher-pension approval |
| Any key with a `counsel_gate` | Nobody enables the branch until sign-off is recorded against the named Part D item | Everyone else, including the statutory lead | R24 |

A C4 parameter is the one case where an operator's choice is recorded against a
`global` key. The choice does not set the parameter: it records which of the computed
outcomes the tenant acted on, for that run, with a reason. The key stays UNSET and the
next run asks again. That is deliberate — a cross-state PT ceiling question answered
once in March must not silently answer itself every month afterwards (R34, TV43).

#### Acceptance criteria — R58 to R61

**R58 — a parameter is a rule-store row, not a config file.** Every key in the register
exists as a row with the attributes above, versioned, effective-dated and replayable.

**R59 — the unset class is the only behaviour.** No code path may invent an alternative
behaviour for an empty value: not a fallback to a sibling state, not last period's
value, not a hard-coded constant behind a feature flag.

**R60 — every value has a person and a basis.** A non-empty value with an empty
`basis`, or with no recorded setter, fails the release gate.

**R61 — parameters are effective-dated and decision-timed.** A retro run reads the
value that governed the period it corrects, and a replay reproduces what the engine
believed at the decision time, not what it believes now.

| Req | Given | When | Then | Vector |
| --- | --- | --- | --- | --- |
| R58 | `esi.rounding_rule` empty | A wage month with ESI members computes | Both shares are computed to the paisa, the month raises a configuration task naming the key, the pay run completes and the ESI upload is not generated | TV37, TV38, TV77 |
| R59 | `pt.MH.band_boundary_rule` empty and a Karnataka value present | A Maharashtra member at the ₹7,500 edge computes | A configuration task naming the Maharashtra key. The Karnataka rule is not borrowed, and no edge is assumed | TV41, TV78 |
| R59 | `epf.admin_charge.minimum` empty | The challan forecast is produced | The forecast shows the percentage line and the minimum as unset; the portal's Due Deposit Balance Summary figure is the one paid and any difference is an SA-REC item | TV36, TV55 |
| R60 | A value written into `bonus.payment_deadline` with no instrument, URL or capture date | The release gate runs | The release is refused, naming the key and the missing attribute | TV79 |
| R61 | `epf.eps_closure_boundary_inclusive` set to "on or after" on 1 July 2026, and a March 2026 month re-run in October 2026 | The retro run executes | It reads the value that governed March 2026, and the replay of the original March run reproduces the original belief | TV12, TV80 |
| R61 | A parameter that reaches SUPERSEDED with no successor captured | The successor's commencement date passes | It returns to UNSET and every dependent artefact re-blocks per its class. The superseded value is not carried forward | TV50, TV80 |

---

### 06.17 The refusal catalogue — what the spine must not do

Most of this section specifies what the engine produces. This last subsection
specifies what it **refuses to produce**, because in a compliance product the refusals
are load-bearing: a generated artefact the authority will not take is worse than no
artefact, and a confident number with no source behind it is worse than a blank with a
reason. Every refusal below is already implied by a rule stated above. Collecting them
in one place makes them testable, gives each one a reason string a build team can
implement, and — the point of the exercise — makes it obvious when someone proposes
removing one.

<!-- DIAGRAM: statutory-spine-refusal-classes -->

**The five classes.**

| Class | Refusal | What the user sees |
| --- | --- | --- |
| **A — FENCED** | The artefact depends on a layout or instrument that has not been published | No generation, no proxy layout, and the named release conditions with which one is unmet |
| **B — GUARDED** | The authority itself would refuse the step, or forbids it | The authority's own reason, and the routes that remain open |
| **C — UNSET** | The step needs a value the spine holds as an unset parameter | A configuration task naming the key, at the artefact or the field; the pay run proceeds |
| **D — COUNSEL-GATED** | The step sits behind a named Part D item | The branch is dark for the tenant; no statement of the position in either direction |
| **E — WARN-ONLY** | The rule behind the step is marked [Hypothesis] | A warning. Never a block on a punch, a roster, a pay run or a filing |

**R62 — every refusal is a first-class response.** A refusal names its class, its
reason in the authority's or the instrument's own terms, the routes that remain, and
the evidence row or parameter behind it. "Failed", "invalid" and a silent no-op are
all defects.

**R63 — refusals are not tenant-settable.** No tenant configuration, support action or
feature flag removes a refusal in this catalogue. A counsel gate, when it clears,
**enables a branch**; it never disables a refusal. The one permitted movement is a
class-A fence lifting when its release conditions are met, through §22.8's publish gate.

**R64 — refusals are logged and metered.** Each is an event with its class, key,
artefact, establishment and period, so that §19 can report how often the product
refuses and why. A rising class-C count is a compliance-data backlog; a rising class-B
count is a defect upstream of the portal; a class-A count that will not fall is a
release-plan problem (§05).

#### The catalogue

**Class A — fenced on an unpublished layout or instrument**

| # | What is asked for | The refusal | What remains open | Basis |
| --- | --- | --- | --- | --- |
| NEG-01 | Generate a Form 138 Q4 statement for Tax Year 2026-27 | Refused. The Q4 regular and correction formats are unpublished and no release date is stated | Q1–Q3 generation; the Q4 data set held ready; the calendar shows which release condition is unmet | EV-046, R16, R38 |
| NEG-02 | Prepare Form 130 Part B for Tax Year 2026-27 | Refused. TRACES builds the certificate from Annexure I and the Q4 Annexure II, so it is blocked behind NEG-01 | Form 130 for earlier periods, downloaded from TRACES; the distribution record | EV-046, EV-048 |
| NEG-03 | Use the legacy 24Q Q4 layout as a stand-in until the Q4 format lands | Refused. A legacy layout is never substituted for an unpublished one | Nothing else changes; the fence and its conditions stand | R16 |
| NEG-04 | Generate an ECR arrear return file | Refused. The arrear flow is separate and no layout is published | The arrears are computed against their wage months and rule versions; the disbursal-date due month is surfaced when the batch is approved | EV-043, Part E-9 |
| NEG-05 | Build the ECR error-file importer from an inferred schema | Refused. The schema is referenced in EPFO's manual but not published | The rejection is handled in the attended session and recorded; the importer waits for a real rejection to capture | §06.13, §22 |

**Class B — the authority would refuse it, or forbids it**

| # | What is asked for | The refusal | What remains open | Basis |
| --- | --- | --- | --- | --- |
| NEG-06 | A Revised return after payment has been initiated | Refused with EPFO's own condition — a Revised return needs no payment initiated. A generated challan counts | The diff is recorded against the approved return; the §22 runbook route; for a *new* member, a Supplementary | EV-037, R14, R31 |
| NEG-07 | A second return of any type while another is in process for the month | Refused until the return in process is completed or rejected; the reason names it | Completing or rejecting the return in process | EV-037 as read in R31 — the safer reading, §06.13 |
| NEG-08 | Cancel an approved return | Refused. An approved return can never be cancelled | The correction routes, chosen by the ten-row table | EV-036 |
| NEG-09 | A Regular return for month M while month M−4 has unreturned active members | Refused. Strict month-wise chronology, with the four-month transitional relaxation | File the missing month first; the M+4 clock and its interest forecast are already on the excluded member | EV-038, R30 |
| NEG-10 | A contribution line for a member outside the valid joining-to-leaving window | Refused — EPFO blocks it | Correct the date, or the joint-declaration path where EPFO's recorded date is wrong | EV-040 |
| NEG-11 | An EPS amount for a member who has attained 58 and is not marked for deferred pension | Refused. This is EPFO's only hard EPS block | The member files with EPS zero; `eps.age58_part_month` governs the birthday month | EV-040 |
| NEG-12 | An employee PF contribution below the contribution rate times EPF wages | Refused — a sub-statutory rate | Correct the wage base or the rate election | EV-040 |
| NEG-13 | Correct a wrongly recorded date of exit inside the product | Refused. It needs a joint declaration by employer and employee | The joint-declaration workflow, with the month's filing held and its dependency shown | EV-041 |
| NEG-14 | Upload a file for a NIL month | Refused. A NIL month uses no file | Direct Challan Entry for admin and inspection charges, enabled only when there are no active members | EV-042 |
| NEG-15 | Write the wage month, return type, contribution rate or remark into the ECR file | Refused. Those are portal form controls, not file content | They are captured as operator-facing values for the attended session | EV-035, R22 |
| NEG-16 | Emit an ECR line whose member name contains `#~#` or a line break | Generation stops with an SA-FMT error naming the member; no file is written | Fix the stored name-as-per-UAN, then regenerate | R29, TV33 |
| NEG-17 | Emit a Q1–Q3 Form 138 file with the batch header's salary-detail or s.194P counts populated | Refused — those are "Not applicable" for Q1–Q3 | Generate without them; Q4 content never reaches a Q1–Q3 file | F138-9 |
| NEG-18 | Emit a Form 138 file whose last record ends in a bare LF | Refused. Every record, the last included, ends CR LF | Regenerate with the correct terminator before anything reaches the FVU | F138-3, TV66 |
| NEG-19 | Carry a Surcharge, Education Cess or Penalty/Others amount into Form 138 challan details | Refused with its reason — the columns are deleted. Never silently dropped | The operator reconciles the legacy value before the statement is built | F138-11, R52 |
| NEG-20 | Map legacy 24Q sub-headings 303, 313, 321, 322 or 325 to a Form 138 column | Refused as "removed in Form 138" — never a neighbouring column | The surviving remap, held as a lookup rather than an offset | EV-051, TV65, TV68 |
| NEG-21 | Validate a Tax Year 2026-27 statement on the legacy RPU and FVU, or a legacy period on the new pair | Refused, SA-VER. Mixing versions causes rejection | The stack is picked by the statement's period, not by today's date | EV-052, R35, TV44 |
| NEG-22 | Generate a statement with no `.csi` imported, or with a TAN or TAN-name mismatch | Refused. Generation stops | Import the `.csi`; resolve the mismatch as an SA-ID or SA-REC item | F138-8 |
| NEG-23 | Destroy a leave register after five years with no transfer recorded | Refused. The bar is a conditional gate released only by a recorded transfer, not a timer | Record the transfer to the new register, then the gate opens | EV-054, R21, TV48 |
| NEG-24 | Edit a closed register instance to correct it | Refused. A post-close correction is an appended amendment entry with its date, made through a correction run | The correction run; the amendment may restart the retention clock under `retention.amendment_restarts_clock` | R39 (L3) |

**Class C — a value the spine does not have**

| # | What is asked for | The refusal | What remains open | Basis |
| --- | --- | --- | --- | --- |
| NEG-25 | Ship a default for a value marked "carried, not re-captured" | Refused. The parameter is empty at tenant creation | A configuration task at the artefact or the field; the pay run proceeds and the employee is paid | R18, §06.16 |
| NEG-26 | Borrow a neighbouring value — another state's PT band edge, the Form 138 CRLF rule for the ECR, last period's superseded figure | Refused. The unset class is the only behaviour | The configuration task naming the key that is actually missing | R59, §06.16 |
| NEG-27 | Cap one person's PT across two levying states at the annual ceiling | Refused as a silent cap. Every reading is computed and the operator records a choice with a reason | The three computed outcomes; the choice stored against the run; the pay run proceeds | R34, `pt.article276_cap_scope`, TV43 |
| NEG-28 | Render a central register form for a state-sphere establishment whose commencement date is not loaded | Refused. No central form is assumed | A configuration task; the obligation stays on the calendar | R50, TV60 |
| NEG-29 | Take deductions above half the payment-of-wages base | Refused. The cap binds | The excess is carried forward under the two named parameters — never taken, never dropped | R43, TV52 |
| NEG-30 | Derive the adolescent-employment particular from an assumed age band | Refused. The Code's definition was not read | The field is left unrendered with its reason; a state form that asks raises a configuration task | R53, TV69 |

**Class D — behind a named counsel item**

| # | What is asked for | The refusal | What remains open | Basis |
| --- | --- | --- | --- | --- |
| NEG-31 | Render Form I field 24 from the Aadhaar store, or capture a thumb impression for field 35 | Both branches ship dark per tenant until sign-off is recorded against the named Part D item | Field 24 empty with a reason code; a signature for field 35; onboarding and payroll unaffected | R24, Part D-4, D-5, §23 |
| NEG-32 | Configure "no Aadhaar, no payroll", "biometric only", or any hard block conditioning employment, payroll or a benefit on Aadhaar or biometric enrolment | Refused outright. This is not a gate that can be opened by sign-off — the configuration does not exist | Aadhaar-optional behaviour everywhere, including EPF and ESI flows: exclude-and-flag with operator and employee notices | Part D-10, Part E-11 |
| NEG-33 | State a statutory retention period other than EV-054's central-sphere figures | Refused. Nothing else is surfaced as a number | The central-sphere figures with their wording differences; state periods routed to counsel | Part D-11, R21, §23 |
| NEG-34 | Describe any data as sensitive "under DPDP" | Refused. DPDP creates no sensitive category; the SPDI Rules do, and are live | The SPDI r.3 citation, stated in the same breath as DPDP's absence of a category | Part D-19, EV-059, EV-060 |
| NEG-35 | State the employer's position on an inoperative PAN, in either direction | Refused. The rate and section are unverified and the exposure question is with counsel | The PAN is flagged before the quarter's statement; the employee's pay is never blocked | `tds.inoperative_pan_rule`, R24, §06.5 |
| NEG-36 | Publish "we file for you", "automated submission", or any claim implying the product submits a filing | Refused. Every statutory surface is an attended portal, and the employer's liability is non-delegable | A portal-accepted artefact plus attended, assisted filing under the employer's written authority; the runbooks in §22 | K-13, EV-030, Part D-17 |
| NEG-37 | Publish "fully electronic statutory registers" under the Code on Wages | Refused without legal clearance. "Electronically" is defined three different ways across the three rule-sets | The registers themselves, in whichever mode the tenant chose, with the mode stated | Part D-20, §06.9, §23 |

**Class E — the rule is a hypothesis, so the product warns**

| # | What is asked for | The refusal | What remains open | Basis |
| --- | --- | --- | --- | --- |
| NEG-38 | Block a punch, a roster, a pay run or a filing on the 144-overtime-hours-a-quarter figure | Refused. The figure is from secondary summaries only and was never confirmed against gazette text | A warning, and the figure routed to validation | K-04, R17, §06.13 |
| NEG-39 | Block payroll, or hold pay, because a member's UAN is unseeded | Refused. The default is exclude-and-flag with operator and employee notices | The member's M+4 clock, its interest forecast, and the Supplementary route once seeded | Part E-11, R30, TV13 |
| NEG-40 | Refuse an ECR file on an engine-only check EPFO is not documented to run | Refused. The engine adds no block EPFO does not impose | The check runs as a flag, raised for the approver before payment initiation. The single exception is a layout defect, which is an SA-FMT block | R29, EV-040, §08 AC-701.6 |
| NEG-41 | Retire an obligation automatically because the count has fallen below the line | Refused. RETIREMENT_REVIEW is raised; there is no path to RETIRED without a named approver's recorded statutory basis | The review, with the latch rule shown | R27, TV27 |

#### Negative tests — the refusals that are easiest to lose

Four of these refusals are the ones a build under deadline pressure argues away first,
so each carries an explicit negative test.

| Req | Given | When | Then | Vector |
| --- | --- | --- | --- | --- |
| R62 | A downward ECR correction requested after the challan exists | The operator asks for any return type | The response names class B, quotes EV-037's condition, lists the routes that remain, records the diff, and offers the §22 runbook. It does not emit a file | TV35, TV81 |
| R63 | A tenant setting that would allow Q4 generation before the format publishes | The setting is attempted | It does not exist. The fence lifts only through §22.8's publish gate when all three release conditions are met | TV54, TV82 |
| R63 | Counsel sign-off recorded against Part D-5 | Form I is exported | Field 24 renders from the Aadhaar token store. No refusal elsewhere in this catalogue changes, and NEG-32 remains unavailable | TV20, TV83 |
| R64 | A month in which eleven refusals fire across three establishments | The compliance report is produced | Each is an event with class, key, artefact, establishment and period; the class mix is reportable; a class-C backlog is attributable to a named parameter | TV84 |

**How this closes the spine.** §06.1 to §06.11 say what the law asks for. §06.12 says
what the engine must therefore be. §06.13 says what is still unknown, §06.14 how the
engine is proved, §06.15 which datum feeds which artefact and what a change to it
costs, §06.16 how an unknown behaves until it is known, and this catalogue what the
product will not do to make any of that look finished. The product's compliance claim
is not that it knows every Indian statutory rule. It is that every rule it applies has
a citation and a capture date, every rule it does not have is a named parameter with
an owner, and every artefact it will not produce says so, with its reason, before the
filing window rather than after it.
