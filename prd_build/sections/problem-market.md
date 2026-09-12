## 04. Problem Statement & Market Sizing

The preceding sections established *what* we build (filing-first, 20–200 employees) and *why computation is priced at zero while filing outputs are not* (EV-029). This section does the arithmetic underneath those decisions: it states the problem in the buyer's own terms, sizes the market on a denominator that survives audit, quantifies the money already being spent (from filed accounts, not analyst projections), and maps the competitive field to the one region where **obligation, budget and dissatisfaction overlap**. Every number here is either [Verified] against a primary source or carried as a [Hypothesis] with a named kill criterion. The banned figures from §20 — 6-crore MSMEs, $23.32bn, ₹83.3/USD, ₹37,500 CA fee, "Frappe PT in 15+ states / LWF in 14" — do not appear except as [Killed] or [Reversed] entries, and must not be reintroduced downstream.

A note on method before the argument. This section deliberately refuses two moves that every India-HR-tech deck makes. It does not quote a total-addressable-market number it cannot denominate, and it does not describe the product's advantage as generic "more complete compliance". **[Reversed]** v0.3 said the incumbents "lack no feature, only execution and guarantee"; source-code and product-documentation checks show named gaps — Frappe HR v16 ships no Indian statutory artefact and no state dimension (EV-031), and TallyPrime has no state PT slab table, no LWF engine and no leave module (EV-032) — so the advantage is stated as those specific gaps plus attended filing, never as a blanket claim. Both refusals cost us a bigger headline. Both are the reason the sizing survives a data room. Where a claim is load-bearing for the business case, it carries its provenance in line; where it is a placeholder, it carries the study that would collapse it to a point.

Most of the section argues; five parts of it specify, and those are the parts a build team works from: the units of account and the share-claim counting rule (§04.2); the sizing model's input, formula, invariant and regression registers (§04.3); the comparison computation, the composed cost view, the response to a card change, and the qualification rules, burden statement and end-to-end fixture that apply the overlap to one prospect (§04.4); and the market-parameter lifecycle with the records through which study results enter the model (§04.5). Each carries its own acceptance criteria, numbered AC-18 onward after the section's earlier AC-1 to AC-17.

### 04.1 The problem, stated in the buyer's terms

The Indian employer of 20–200 people does not experience "HR software" as a category. They experience a recurring, dated, legally-enforced obligation to *file* — and a monthly scramble to get it right with tools and people that were never designed to file. Three distinct pains stack on top of each other, and the product's entire reason to exist is that it answers all three at once where the incumbents answer at most one.

#### Pain 1 — The statutory burden is a step function that gets worse as you grow

Indian labour and tax compliance is not a flat cost; it turns on at headcount thresholds, and each threshold adds a new *filing* with its own portal, format, cadence and penalty regime. The beachhead employer sits squarely inside the zone where the burden compounds.

| Headcount | Obligation that turns on | Filing artefact | Cadence | Penalty exposure for getting it wrong |
| --- | --- | --- | --- | --- |
| 1 | TDS on salary — s.392 of the Income-tax Act 2025 (ex-s.192, EV-050); Shops & Establishments; minimum wages; **POSH Internal Committee — every employer, s.4(1)** (the ten-worker line is s.6(1)'s Local Committee, not an exemption — EV-056) | Form 138 (ex-24Q); Form 130 (ex-Form 16) | Quarterly + annual | Interest at 1% per month from due-to-deduct to deduction and 1.5% per month from deduction to deposit — Income-tax Act 2025 s.398(3)(a), ex-s.201(1A) (r5/04) [Verified]; a ₹200/day late-filing fee under the 1961 Act's s.234E per a secondary source (r1/06) [Hypothesis — not primary-verified; 2025-Act equivalent unmapped, §06.5] |
| 10 | ESI — at 10+ persons, but 20+ for some Central-sphere extended classes, and only in ESIC-notified districts, so applicability is decided on the work location (r1/06, §06.3); gratuity accrual; maternity benefit ("on any day of preceding 12 months" — latches once crossed); **prescribed-format appointment letter** — attaches to an "establishment" of 10+ workers, form prescribed by the state (K-18, EV-057) | ESI contribution challan; half-yearly return-of-contributions view | Monthly by the 15th (r3/02) + half-yearly | Simple interest at 12% p.a. from the due date (S.O. 2698(E), 29 May 2026 — r1/06) [Verified]; damages graded by delay up to 25% p.a. under legacy ESI (General) Regulation 31-C (r3/02), which is saved only to ~21 Nov 2026 (EV-002, EV-004) — the scale is parameter `esi.damages_scale`, no shipped default (§06.3) [Hypothesis for the Code-era scale] |
| 20 | **EPF**; Grievance Redressal Committee (20+ workers, IR Code s.4 — EV-057) | ECR; PF Forms 3A/5/6A/10/12A | Monthly by the 15th | Simple interest at 12% p.a. (S.O. 2698(E) — r1/06), which EPFO's portal still labels s.7Q, auto-calculates and makes **mandatory with the contribution** (EV-039) [Verified]; damages (legacy s.14B; the Code-era damages provision is not captured in the evidence base — §06.13) may be deposited later at the employer's option (EV-039) — the scale is parameter `epf.damages_scale`, no shipped default (§06.2) [Hypothesis] |
| 50 | Crèche facility (EV-057) | — | — | Not sized here (§06.1) |
| 100 | Canteen (EV-057); a Works Committee only where the appropriate Government orders one — conditional, not automatic (r3/04) | — | — | Not sized here (§06.1) |
| 300 | Standing orders; retrenchment/closure permission (raised from 100 by the new Codes — EV-057), for industrial establishments such as factories, mines and plantations (r3/04) | Prior Government permission | Event-driven | Permission-gated (r3/04) [Verified]; the consequence of proceeding without permission is not in the evidence base — counsel (§23) |

(Source: the four Labour Codes and Central Rules notified 8 May 2026 — central sphere only, EV-056/EV-057; the counting unit (worker vs employee) and sphere (central vs state) differ by obligation and are schema fields, not constants (§06.1); Income-tax Act 2025 section and form mapping per EV-050 and r5/04; EPF and ESI penalty treatment aligned with §06.2 and §06.3.)

Behind each threshold sits an actual contribution or benefit computation, and the *numbers* are where a spreadsheet or an inattentive bureau quietly goes wrong. The mechanics that the payroll engine must get right, deterministically, every period:

| Levy | Rate / formula | Wage base & ceiling | Edge cases the engine must handle | Source cue |
| --- | --- | --- | --- | --- |
| **EPF** | 12% employee + 12% employer | Statutory ceiling ₹15,000/mo; of the employer 12%, **8.33% routes to EPS capped at ₹15,000 (= ₹1,250)**, remainder to EPF | International workers: EPFO's FAQ says IWs who joined after September 2014 with wages above ₹15,000 are **not EPS members** (r5/02) [Verified]; the uncapped full-wage basis for IWs is a contested rule (§06.2) [Hypothesis]; employer may voluntarily contribute on actuals above ₹15,000; PF wages redefined by the 50% add-back (below) | EPF Scheme 1952 / Scheme 2026; EPS 1995; 8.33%/3.67% split per EPFO pages (r1/06) [Verified — framework; migrate to Scheme 2026 per §06.2] |
| **EDLI** | 0.5% employer | On EPF wages, ceiling ₹15,000 | Exempted (own-trust) establishments pay an inspection charge instead — EDLI 0.005% of wages, minimum ₹1,250 (S.O. 2701(E), 29 May 2026 — r2/10) | EDLI 1976 (r1/06) [Verified — rate]; exemption-route form references are carried, not re-captured [Hypothesis] |
| **EPF admin** | 0.5% employer | On EPF wages | Exempted (own-trust) establishments pay an inspection charge instead — 0.35% of wages, minimum ₹8,750 (S.O. 2701(E) — r2/10) [Verified] | Admin-charge minimum is parameter `epf.admin_charge.minimum` (§06.2) [Hypothesis — minimum not re-captured] |
| **ESI** | 0.75% employee + 3.25% employer | Gross wages, ceiling **₹21,000/mo** (₹25,000 for persons with disability) | Wage crossing the ceiling **mid-contribution-period** does not stop ESI until the period (Apr–Sep / Oct–Mar) ends (r1/06) [Verified]; employees on a daily average wage up to ₹176 are exempt from the employee share while the employer still pays 3.25% (r1/06) [Verified]; ₹0-wage days | esic.gov.in contribution and coverage pages, rates w.e.f. 1 Jul 2019 (r1/06) [Verified]; saved regime to ~21 Nov 2026 (EV-004) |
| **Gratuity** | (last-drawn wages × 15 × completed years) ÷ 26 | "Wages" per CoSS s.2(88); ceiling on gratuity payable is "such amount as may be notified by the Central Government" (CoSS s.53(3)) — **no Code-era notification located**; the familiar ₹20 lakh is the repealed 1972 Act's figure (r1/06). Parameter `gratuity.ceiling`, no shipped default, notification watch per §20 and §22 | Five-year continuous-service requirement does not apply on death, disablement or fixed-term expiry; fixed-term employees are paid pro rata, eligible at one year (r1/06, r3/04); gratuity base rises under the add-back | CoSS s.53 (r1/06) [Verified]; ceiling amount [Hypothesis] |
| **Bonus** | Minimum 8.33% of wages earned or ₹100, whichever is higher, for at least 30 days' work; maximum 20% (Code on Wages s.26 — r1/06) [Verified] | Eligibility and calculation ceilings are delegated to the appropriate Government and may differ by state; the engine's legacy values — eligibility ≤ ₹21,000/mo, calculation ceiling ₹7,000 or minimum wage, whichever higher — are the 2015 amendment's figures, with no Code-era notification located (r1/06) [Hypothesis] | Set-on/set-off of allocable surplus (parameter `bonus.set_on_off_years`); infancy exemption (`bonus.infancy_years`) — both carried, not re-captured (§06) | Code on Wages s.26 (r1/06) |
| **Maternity** | Up to 26 weeks' benefit at 80 days' qualifying service; medical bonus ₹3,500 or as notified, payable only where the employer does not provide pre-natal confinement and post-natal care free of charge (CoSS s.64 — r3/04, r1/06) [Verified] | Average daily wage | Applies at 10+ employees on any day of the preceding twelve months (r1/06); crèche at 50 (EV-057); the reduced entitlement beyond two children and post-leave work-from-home terms are carried, not re-captured [Hypothesis] | CoSS Chapter VI (r1/06) |

Three consequences follow, each of which the product must answer:

- **The problem is not "run payroll" — it is "produce and lodge a correct return, on time, on a government portal, every month, forever."** ICAI's own recommended fee schedule confirms the buyer's mental model: it prices TDS return filing, PT registration and PT returns — and has **no line item for "payroll processing" at all** [Verified — EV-017; the schedule is pre-GST and at least nine years old, and a February 2020 revision was not retrieved (r2/05)]. The unit of value the market already pays for is the filing.
- **The burden is dated and unforgiving.** EPF ECR is due monthly by the 15th; PT returns are state-specific and range monthly to annual; TDS is quarterly with a shifting file format (Form 138 replaced 24Q; the Q4 regular *and* Q4 correction formats were still unreleased on the September 2026 re-check — EV-046, §06.5). A missed deadline is not a soft failure; it is interest and damages — plus, for TDS, a possible expense-disallowance consequence whose Income-tax Act 2025 provision is not in the evidence base [Hypothesis — §06.5, §20 statutory desk validation] — and the window to deem the deductor in default runs six years from the end of the tax year, or two years from the end of the tax year in which a correction statement is delivered, whichever is later (Income-tax Act 2025 s.398(5), r5/04).
- **The burden is multiplying under transition.** Four Labour Codes in force 21 Nov 2025; Central Rules 8 May 2026; a one-year saving of EPF/ESI schemes expiring ~21 Nov 2026; the "50% wages add-back" creating **two concurrent wage bases on one payslip** (EV-010, §06.10). The employer who was compliant last year is not automatically compliant this year — and cannot know it without a maintained system.

##### Worked example — the 50% add-back, in rupees

The hardest single calculation in the build (§06.10) is abstract until you run one payslip through it. Take a ₹50,000/month sales employee at a beachhead firm with a commission-heavy structure:

| Component | Monthly ₹ | Counts as "wages"? (Code on Wages s.2(y)) |
| --- | --- | --- |
| Basic | 15,000 | Yes |
| HRA | 9,400 | Excluded |
| Conveyance | 1,600 | Excluded |
| Commission | 22,000 | Excluded |
| LTA | 2,000 | Excluded (travelling concession) |
| Wages (pre add-back) | **15,000 (30%)** | — |
| Excluded total | **35,000 (70%)** | — |

**[Reversed]** v0.3 reached 70% by treating ₹22,000 of *special allowance* as excluded, and its components summed to ₹48,100, not ₹50,000. Special allowance is not an excluded head, and relabelling universal pay does not move it out of wages (§06.10; the *Vivekananda Vidyamandir* principle, §06.2) — so a special allowance counts as wages and the engine carries each component's wage-base membership as an effective-dated flag, never a label-driven default. The example now uses commission and a corrected HRA so the arithmetic closes.

The proviso: where the excluded components exceed **one-half of total remuneration**, the excess over one-half is *deemed wages and added back*. Half of ₹50,000 is ₹25,000; excluded is ₹35,000; the excess is **₹35,000 − ₹25,000 = ₹10,000**. Post add-back, wages = ₹15,000 + ₹10,000 = **₹25,000** (exactly 50% of remuneration).

Downstream effect on the same payslip:

- **Gratuity base** (uncapped by any ₹15,000 ceiling) jumps from ₹15,000 to ₹25,000 — a **≈67% rise in accrued gratuity liability** per employee, applied retrospectively once the rule bites.
- **PF base**: if the employer contributes only to the ₹15,000 ceiling, PF is unchanged; but if the employer already contributes on actual basic (a tenant-level policy choice — AC-5), the base rises from ₹15,000 to ₹25,000 and monthly PF cost rises with it. The engine must know *which policy each tenant runs*.
- **Two wage bases now coexist on one payslip**: the add-back base (₹25,000, excludes HRA/conveyance/commission/OT/bonus) drives PF and gratuity; the payment-of-wages / equal-remuneration base (₹50,000, includes them) drives minimum-wage and overtime tests. A single "salary" field cannot represent both.
- The statute says "or such other per cent as may be notified" — 50% is a **standing variable, not a constant** (EV-010, §06.10). The rule must be effective-dated and retrospectively recomputable.

##### Worked examples — the four other levies where the number quietly goes wrong

The add-back is the hardest single calculation, but it is not the only one where a spreadsheet accrues silent liability. Four more, each run in rupees on the same 60-person beachhead firm, because "the rule is subtle" only lands when you watch it break a real payslip.

**(a) ESI contribution-period continuity — the mid-period crossing (AC-4).** ESI contribution periods are fixed: April–September and October–March. Eligibility is tested at the *start* of the period; once a member is in, a mid-period pay rise does not drop them. Take an employee at ₹20,500 gross in April (below the ₹21,000 ceiling, so ESI applies). They get a raise to ₹24,000 effective 1 July.

| Month | Gross | Naive tool ("stop at ceiling") | Correct (ESIC rule) |
| --- | --- | --- | --- |
| Apr–Jun | 20,500 | ESI on 20,500 | ESI on 20,500 |
| Jul–Sep | 24,000 | **ESI dropped** (over ₹21k) | **ESI continues on 24,000** until 30 Sep |
| Oct onward | 24,000 | — | Now genuinely out; drops from new period |

A tool that drops the member on the July crossing under-remits three months of ESI (employee 0.75% + employer 3.25% on ₹24,000 = **₹960/month × 3 = ₹2,880** short), and — worse — the *employee* is wrongly shown as uncovered mid-treatment, leaving the employer to answer the resulting benefit dispute. The engine must contribute on the *actual* (raised) wage for the rest of the period, not freeze at ₹21,000. (Source: esic.gov.in contribution page, per r1/06 — an employee crossing the ceiling mid-period keeps contributing to the end of that contribution period [Verified — period rule]; contribution on the raised *actual* wage rather than the ceiling is to be reconfirmed against current ESIC instructions [Hypothesis]; the whole ESI regime is saved only to ~21 Nov 2026 (EV-004, §20 V-08).)

**(b) Gratuity accrued liability — the add-back applied across tenure.** The add-back's ₹15,000→₹25,000 base jump (above) is a per-employee balance-sheet event, not a payslip line. Gratuity = (last-drawn wages × 15 × completed years) ÷ 26, subject to a payable ceiling the Central Government has not yet notified under CoSS s.53(3) (`gratuity.ceiling`; both figures below sit far beneath the repealed Act's ₹20 lakh, so the example does not depend on it). For a 7-year employee:

| Wage base | Per-year accrual (base × 15 ÷ 26) | Accrued at 7 years |
| --- | --- | --- |
| ₹15,000 (pre add-back) | ₹8,654 | ₹60,577 |
| ₹25,000 (post add-back) | ₹14,423 | ₹1,00,962 |

The add-back lifts this one employee's accrued gratuity liability by **₹40,385 (≈67%)**, and it applies to *every* employee whose structure trips the 50% test — a step-change in the firm's actuarial gratuity provision the month the rule bites, recognised retrospectively. A payroll tool that treats gratuity as a payslip afterthought misses a liability the auditor will not. (Source: CoSS s.53 formula and s.53(3) ceiling-by-notification (r1/06) [Verified]; no Code-era ceiling notification located [Hypothesis — amount], §06.)

**(c) Professional Tax — the February top-up.** Maharashtra's schedule from 1 April 2023 collects the constitutional ₹2,500/year (Art. 276(2)) as **₹200 × 11 months + ₹300 in February** for men above ₹10,000/month and women above ₹25,000/month (men ₹7,500–10,000 pay ₹175/month; below that, nil). An engine that hard-codes a flat ₹200/month remits ₹2,400/year — **₹100 short of the ₹2,500 cap**, every year, per employee. Across 40 above-slab employees that is ₹4,000/year of quiet under-remittance plus interest, and it recurs precisely because the February value is an exception, not a slab. Karnataka has run the same 11 × ₹200 + ₹300-in-February structure at ₹25,000/month and above since 1 April 2025, and Odisha reaches the same ₹2,500 on an *annual*-income base with ₹300 in "the last month" (which month is undefined on the state page). The two-part logic must be a rule with a per-state slab base and true-up month, not a constant. (Source: Maharashtra and Odisha schedules read at the state primary source, Karnataka notification DPAL 08 SHASANA 2025 of 15.04.2025 corroborated on the state PT portal (r2/10, EV-014) [Verified — MH, OD; Karnataka effect verified, instrument text not retrieved]; Odisha's true-up month [Hypothesis] — parameter `pt.OD.true_up_month`, §06.4; Odisha's levy status is itself open — a reported April 2026 ordinance repealing Odisha PT from 1 April 2026 is unconfirmed while the state's page still shows the Act as live (r1/06, low), so Odisha stays in the rule table until the gazette check in §20 V-09 and §06.13 resolves it.)

**(d) Statutory bonus — the calculation ceiling and set-on/set-off.** Code on Wages s.26 computes bonus on the lower of actual wage and a ceiling equal to *the notified amount or the minimum wage, whichever is higher* — not on actual salary — and delegates both the eligibility and the calculation ceilings to the appropriate Government, so they may differ by state (r1/06). No Code-era notification has been located, so the worked example runs on the legacy 2015-amendment values — eligibility ≤ ₹21,000/month, notified amount **₹7,000/month** — held as parameters, never constants (§06). For an eligible employee at ₹18,000/month in a state where the scheduled minimum wage for their category is ₹10,500 (an illustrative input):

- Calc base = max(₹7,000, ₹10,500) = **₹10,500**, not ₹18,000.
- At the statutory floor of 8.33%: annual bonus = ₹10,500 × 12 × 8.33% = **₹10,496**; at the 20% ceiling (when allocable surplus permits): **₹25,200**.

A tool that pays 8.33% of *actual* ₹18,000 over-remits by ~71%; one that uses a bare ₹7,000 floor and ignores a higher minimum wage under-remits. The rate between 8.33% and 20% is not a constant either — it is driven by *set-on / set-off of allocable surplus* carried forward for a limited number of years (parameter `bonus.set_on_off_years`, no shipped default), so a loss-making beachhead unit in its formative years and a profitable one owe different percentages on the same salary. (Source: Code on Wages s.26(1)–(3) — minimum 8.33% or ₹100, maximum 20%, ceiling = notified amount or minimum wage (r1/06) [Verified]; ₹21,000 and ₹7,000 are legacy 2015-amendment figures (r1/06, medium) [Hypothesis — Code-era values]; set-on/set-off years carried from the legacy Act, not re-captured (§06) [Hypothesis]; per-state minimum-wage schedules [Hypothesis].)

The through-line across all four: none of these is a "salary × rate" one-liner. Each has a ceiling, an exception, or a cross-period carry that a flat spreadsheet formula gets wrong in the direction of silent under- or over-remittance — and each is invisible until an inspection, an actuarial valuation, or an employee grievance surfaces it. This is the concrete content of "the filing, not the payslip, is the unit of delivery."

##### The edge cases that manufacture retro-liability

Beyond the headline levies, a cluster of threshold-and-eligibility edge cases is where a spreadsheet or an inattentive bureau accrues silent liability. These are not exotic — they occur in ordinary beachhead firms every year.

| Edge case | Rule | Why it bites in the beachhead | Source cue |
| --- | --- | --- | --- |
| PoSH Internal Committee | **Every employer** must constitute one (s.4(1)); the ten-worker line is s.6(1) — the *Local* Committee where no IC exists — and is not an exemption | Applies from employee one; routinely missed as a "non-payroll" obligation, and the ten-worker myth makes sub-10 firms believe they are exempt | Sexual Harassment of Women at Workplace Act 2013 [Verified — EV-056] |
| Fixed-term employee gratuity | The five-year continuous-service requirement does not apply on fixed-term expiry; payable **pro rata**, eligible at one year | Common in the beachhead's project/contract staffing; accrual starts from year one | CoSS s.53 (r1/06, r3/04) [Verified] |
| Apprentices | Excluded from EPF/ESI while engaged under the Apprentices Act 1961 | Mis-classifying an apprentice as an employee over-remits; the reverse under-remits | Carried, not re-captured (§06.1) [Hypothesis] |
| International workers | Contribution on **full wages with no ₹15,000 ceiling**, unless exempt under a Social Security Agreement (the exemption route is carried, not re-captured); post-September-2014 joiners above ₹15,000 are not EPS members (r5/02) | A single expat/returning-NRI hire breaks the ₹15,000-ceiling assumption | EPS exclusion [Verified — EPFO FAQ, r5/02]; the uncapped basis is a live, contested rule (§06.2) [Hypothesis] |
| Contract labour | The principal employer pays EPF and recovers from the contractor (CoSS s.17); for ESI the employer pays both contributions for every employee "whether directly employed by him or by or through a contractor" (s.31(1)); OSH Code s.55 makes the principal employer liable for contract workers' wages on contractor default; the contract-labour licensing threshold is 50 (EV-057) | The beachhead firm inherits the contractor's non-compliance | CoSS ss.17, 31 (r2/10) [Verified]; OSH s.55 (r3/04) [Verified] |
| Arrears / retro wage revision | Recompute PF/ESI/PT/TDS against the **period's** rule version | Add-back and slab changes make retro runs non-trivial (AC-2) | Code on Wages; EPF Scheme [Verified — principle] |
| LWF employer/employee split | Differs by state, remitted monthly/half-yearly/annually | Tiny rupees, many distinct rules — a maintenance load, not a calculation one | State LWF Acts [Hypothesis — per-state amounts] |

The through-line: each of these is a place where "run payroll" and "file correctly, provably, forever" diverge. The audit trail (AC-9) and effective-dated recompute (AC-2) exist precisely to make these defensible rather than discovered.

Two of these edge cases are worth a rupee illustration, because their *shape* — not their magnitude — is what defeats a spreadsheet:

- **International worker, PF uncapped — if the rule is enforceable.** A hire at ₹2,00,000/month who qualifies as an "international worker" contributes on **full wages with no ₹15,000 ceiling**, as the rule is carried. Employee 12% + employer 12% on ₹2,00,000 = **₹48,000/month** of PF, against the ₹3,600 a ceiling-capped domestic employee at the same salary would show — a **13.3× difference on one payslip**; and because a post-September-2014 IW above ₹15,000 is not an EPS member (r5/02), none of the employer's 12% routes to EPS. A tool that applies the ₹15,000 ceiling universally would under-remit ₹44,400/month for this one worker and mislabel the contribution class on the ECR. The engine needs a per-employee IW flag that overrides the tenant-level ceiling policy (AC-5), not a global constant — and, because the current enforceability of the IW provisions is contested (§06.2 carries the litigation history; it has not been re-captured), the uncapped basis ships behind an effective-dated rule switch, never as a hard-coded default. (Source: EPFO revamped-ECR FAQ on IW EPS membership (r5/02) [Verified]; the uncapped basis, its paragraph references and the litigation history are carried, not re-captured [Hypothesis] — kill criterion per §06.2.)
- **LWF, the many-tiny-rules problem.** LWF amounts are small, but the *rules* are the cost. The shape, with no amounts asserted: State A deducts an employee and an employer amount *half-yearly*; State B deducts different amounts *once a year in a fixed month*; State C deducts *monthly*. Each has its own amount, split, month and portal — so a three-state firm carries three independent LWF cadences that a "flat monthly ₹X" formula cannot represent, and a missed annual remittance is a compliance flag for a trivial sum. This is the canonical "maintenance load, not calculation load" (§06.8): trivial rupees, non-trivial *rule count*. (Source: respective State LWF Acts — LWF sits entirely outside the four Labour Codes and no LWF rate or split is verifiable from a government source in any state (r2/10); the single verified periodicity is Karnataka's calendar-year cadence with a 15 January due date (r2/10); every other per-state amount, split and cadence is unknown until the gazette dataset lands (EV-015, §20 V-09), held as parameters `lwf.<state>.employee`, `lwf.<state>.employer`, `lwf.<state>.periodicity` (§06.8); neither Frappe HR nor TallyPrime ships an LWF engine (EV-031, EV-032).)

##### Worked example — TDS's breaking file-format change

The TDS filing is not a stable target the buyer can "set and forget" — it is actively breaking underneath them this year, which is why a *maintained* system beats a spreadsheet macro that encoded last year's layout. Form 138 replaces 24Q and the record layout is a breaking change, not a rename (EV-011, EV-051, §06.5):

| What changed | Old (24Q) | New (Form 138) | Consequence for the filer |
| --- | --- | --- | --- |
| Challan sub-headings | 301–312 | Remap to A–K, **303 deleted** | Any tool hard-coding challan codes emits an invalid file |
| Annexure I fields | 313–327 | Remap to C–N, with **313, 321, 322, 325 removed** | Field-position parsers break silently |
| Surcharge / Education Cess / Penalty-Others | Present | **Deleted** | Amounts that used to have a home now have none |
| Interest Allocation / Others Allocation | Absent | **Added** | New mandatory fields a stale template does not populate |
| Deductor identification | Token No.; TAN Registration No. | Token No. becomes **"Return Receipt Number"**; TAN Registration No. **deleted**; the form auto-populates from the deductor's TRACES profile (EV-051) | A template that still carries last year's identification fields is structurally wrong |
| Period vocabulary | "Financial Year" | **"Tax Year"**, a six-digit field (202627 for Tax Year 2026-27) (EV-050) | Search, labels and imports must accept both vocabularies — historical periods keep the old forms |
| Rollout | — | Q1–Q3 v1.2 shipped 22 Jul 2026; correction-statement structures 4 Aug 2026 | Mid-year format churn |
| **Q4 regular and Q4 correction formats** | — | **Not released** on the September 2026 re-check (EV-046) | Form 130 (ex-Form 16) is TRACES-generated from Annexures I and II (EV-048), so the annual certificate is blocked until Q4 lands — both generators are fenced |

(Source: Protean RPU/FVU 1.2 release note and CBDT FN-138, 2026 — EV-011, EV-046, EV-051; the 1.2 stack applies from Tax Year 2026-27 and mixing versions causes rejection (EV-052); §06.5. [Verified].)

The buyer-facing point: an employer running a spreadsheet or an un-maintained tool cannot even *know* its Q1 (Tax Year 2026-27) statement is on a stale layout until the FVU rejects it — and the Q4/Form 130 dependency means the annual certificate is blocked on a format that has not shipped. Neither TallyPrime nor Frappe HR removes this: TallyPrime ships 24Q-era annexures, but whether its forms are current with the latest Finance Act is an unresolved parity cell (EV-032); Frappe HR ships no 24Q/138 generator at all (EV-031). It is also a concrete instance of the standing rule: a watcher keyed only to *new instruments* would miss a corrigendum to the *format*, exactly the failure mode that inverted the November 2026 analysis (§02.4).

##### Worked example — the mid-year joiner and previous-employer income

The other recurring TDS defect is not about the file format at all — it is the mid-year joiner whose previous-employer income and TDS are not picked up. Take an employee who joins the 60-person firm on 1 October at ₹1,50,000/month (₹9,00,000 for Oct–Mar), having earned ₹9,00,000 at the prior employer in Apr–Sep, which deducted ₹80,000 of TDS (illustrative inputs, as the employee declares them on Form 122).

The arithmetic below runs on the new-regime slabs for AY 2026-27 — the latest verified in the evidence base (r1/06; the worked base in §06.5): nil to ₹4 lakh, 5% to ₹8 lakh, 10% to ₹12 lakh, 15% to ₹16 lakh, 20% to ₹20 lakh; an s.87A rebate of up to ₹60,000 where taxable income does not exceed ₹12 lakh; 4% health and education cess. The standard deduction (parameter `tds.standard_deduction.<regime>`) is left out to keep the arithmetic visible, and the Tax Year 2026-27 slabs, rebate ceiling and standard deduction must be re-verified before the year's TDS runs (§06.5 kill criterion) — the example demonstrates a *shape*, not this year's tax.

- **If the new employer ignores the prior income** (the spreadsheet default): it projects ₹9,00,000 for the year. Tax before rebate is ₹30,000 (5% of ₹4 lakh = ₹20,000, plus 10% of ₹1 lakh = ₹10,000), which the rebate wipes out — so it deducts **nothing** for six months.
- **The correct treatment (Income-tax Act 2025 s.392(4)(a), Form 122 — ex-12B and 12BAA, EV-050, r5/02):** the employee furnishes prior salary and TDS on Form 122 (ex-12B); the new employer aggregates ₹9,00,000 + ₹9,00,000 = **₹18,00,000**, which is above the rebate ceiling. Tax = ₹20,000 (₹4–8 lakh) + ₹40,000 (₹8–12 lakh) + ₹60,000 (₹12–16 lakh) + ₹40,000 (₹16–18 lakh at 20%) = ₹1,60,000; with 4% cess, **₹1,66,400**. Credit the ₹80,000 already deducted and ₹86,400 remains — **₹14,400/month** over Oct–Mar.

The naive run under-deducts the full ₹86,400. The rebate ceiling is what turns "ignore prior income" from a small slab error into a zero-deduction error: each half-year looks rebate-eligible on its own, the aggregate is not. The gap surfaces only in the employee's own Form 130 (ex-Form 16) reconciliation or a processing intimation — by which point it is tax the *employee* must pay on filing and short-deduction exposure for the *employer*: interest at 1% per month from the date tax was deductible (Income-tax Act 2025 s.398(3)(a), ex-s.201(1A), r5/04), inside a default window of at least six years (s.398(5)). The engine must (i) accept Form 122 (ex-12B) prior-income input at onboarding — income after exemptions, tax already deducted, professional tax and EPF from prior employers (r3/02), (ii) annualise on aggregate, and (iii) reconcile prior-employer TDS credit — none of which a single-employer salary column can represent. This is exactly one of the "judgement calls the bureau carries" (Pain 3) made visible and deterministic. (Source: Form 122, which merges the former Forms 12B and 12BAA, furnished under Income-tax Act 2025 s.392(4)(a) per the CBDT form mapping (EV-050, r5/02, r3/02); Form 122's previous-employment fields (r3/02) [Verified]; AY 2026-27 slabs, rebate and cess (r1/06) [Verified]; their continuation into Tax Year 2026-27 [Hypothesis] (§06.5); the product accepts both vocabularies (EV-050).)

##### The November 2026 cliff as a market-timing wedge

One statutory fact does double duty as a *sizing* argument, not just an engineering one. The EPF Act 1952 is repealed with effect from 21 Nov 2025; Code on Social Security s.164(2)(b) saves the EPF/EDLI/EPS schemes and all ESI rules for *one year*, expiring ~**21 Nov 2026** (EV-002, §06.9, [Verified]). The EPF side has a named successor (Employees' Provident Funds Scheme, 2026, 12% re-notified retrospectively by S.O. 3582(E) — EV-003); **the ESI side is unresolved** (EV-004).

Why this matters to the market, not just the codebase:

- It creates a **forced re-evaluation moment** across the entire contributing base simultaneously. Every 20–200 employer must confirm their payroll runs against Scheme 2026 and whatever replaces the ESI saving — a rare synchronous trigger in a market where switching inertia is otherwise the dominant force (§04.2).
- It is a **wedge against the status quo specifically**. A Tally-plus-CA arrangement survives on the CA quietly absorbing changes; a cliff of this size, with an *unresolved ESI leg*, is exactly the kind of event where the black-box relationship (Pain 3) fails visibly and the employer starts shopping.
- It is **time-boxed**, which is unusual and valuable for GTM. The window in which "are you ready for 22 November 2026?" is a live buyer anxiety is measured in months, and it maps to the §20 (V-08) primary-source watch.

> [Hypothesis] The cliff is a launch-timing tailwind, not just a compliance risk.
> **Kill criterion:** if ESIC re-notifies its schemes cleanly and early (well before 21 Nov 2026) with no disruption, the "forced re-evaluation" tailwind weakens to the ordinary annual-Budget change cadence, and acquisition timing loses this specific hook.

##### Why now — three timing forces converge on the launch window

The cliff is one of three near-simultaneous forces that make the 12–18 months from the research date an unusually good entry window. None is individually decisive; together they compress the market's ordinary switching inertia.

| Force | Nature | Timing | Direction on entry |
| --- | --- | --- | --- |
| Nov 2026 EPF/ESI cliff | Regulatory (forced re-check) | ~21 Nov 2026, ESI leg unresolved | Tailwind — synchronous re-evaluation (above) |
| Four Codes + Central Rules bedding in | Regulatory (new spec) | In force 21 Nov 2025; Rules 8 May 2026; state rules rolling unevenly | Tailwind — "build against a settled spec" (§06), and every employer's prior config is now suspect |
| Zoho free-gate widening | Competitive (price floor moves) | Unknown date; treated as *when*, not *if* (§18; §20 R-1) | Headwind — compresses the paid floor from below |

The read: the two regulatory forces open a window in which "is your payroll correct under the new regime?" is a live, dated anxiety the Tally-plus-CA arrangement answers opaquely — and the competitive force sets a clock on how long the 20–50 sub-band stays monetisable before Zoho zero-prices it. A filing-first entrant wants to land *while both regulatory triggers are fresh and before the free floor widens*, which is the concrete GTM meaning of the beachhead being "over-served by cheap product, under-served by product that carries the filing through to portal acceptance" (§01).

> [Hypothesis] The regulatory tailwind outweighs the Zoho-gate headwind for a launch inside this window.
> **Kill criterion:** if Zoho (or a fintech, §20 R-6) widens the free gate to 50 *before* the regulatory re-check anxiety converts pipeline, the entry window closes on the lower beachhead and the launch must re-center on 50–200 at higher PEPM — the §04.3 grid re-run on the upper sub-band (see §04.4 structural risks).

##### Acceptance criteria — Pain 1 (statutory engine)

These are the pass/fail tests the engine must meet for this section's thesis to hold. They are written so a §20 prototype can be graded against them.

- **AC-1 (dual wage base).** For any CTC structure, the engine computes and stores at least two concurrent wage bases per employee per period; a change to the add-back percentage re-derives both without manual re-entry.
- **AC-2 (effective-dated rules).** A retro/arrears run for period *P* recomputes against the rule version in force *for P*, not the version in force today, and emits an audit trail showing which version applied. (Mirrors §06.10.)
- **AC-3 (deterministic statutory numbers).** No PF/ESI/PT/TDS/gratuity figure is ever model-generated; the LLM may explain a number but never produce one (§13.4, "rules-first, LLM-last").
- **AC-4 (contribution-period continuity).** An ESI member whose wage crosses ₹21,000 mid-period continues to contribute until the contribution period closes; the engine does not drop them at the crossing.
- **AC-5 (ceiling policy per tenant).** PF is computed on either the ₹15,000 ceiling or actual wages per a tenant-level policy flag, and the two never silently diverge across employees.
- **AC-6 (Scheme 2026 migration).** All EPF computation references the Employees' Provident Funds Scheme, 2026, not the repealed 1952 Scheme, and carries a corrigendum-check flag per the standing rule (§02.4).

The worked examples above add five more pass/fail tests, sub-lettered so they do not renumber AC-7 onward, plus one new test numbered after the section's maximum:

- **AC-4a (ESI raised-wage continuity).** When an in-period ESI member's wage rises above ₹21,000, the engine contributes on the *raised actual* wage for the remainder of the contribution period, not on the frozen ₹21,000 ceiling and not zero.
- **AC-6a (gratuity as a liability, not a payslip line).** Every add-back or wage revision re-derives per-employee accrued gratuity on the correct base and surfaces the aggregate liability delta for actuarial/provisioning use — retrospectively for the affected period.
- **AC-6b (bonus calc ceiling + minimum-wage floor).** Statutory bonus is computed on min(actual wage, max(notified amount, applicable minimum wage)), with the eligibility ceiling, the notified amount and `bonus.set_on_off_years` held as per-appropriate-Government parameters (the legacy ₹21,000 / ₹7,000 apply only on recorded operator confirmation, per AC-16, until a Code-era notification is captured), and the 8.33%–20% rate driven by set-on/set-off — never a hard-coded 8.33%, never a bare ₹7,000.
- **AC-6c (PT exception months).** State PT is a rule table with a per-state slab base (monthly salary for Maharashtra and Karnataka, annual income for Odisha), gender variants and a true-up month (Maharashtra's and Karnataka's ₹300 February; Odisha's ₹300 "last month", `pt.OD.true_up_month`), never a flat monthly constant; annual PT reconciles to the state cap per employee.
- **AC-6d (mid-year joiner aggregation).** The engine accepts Form 122 (ex-12B, EV-050) prior-employer income and TDS at onboarding, annualises tax on the aggregate, and credits prior TDS — no single-employer-only TDS run for a mid-year joiner. Test case: the ₹9 lakh + ₹9 lakh example above must deduct ₹14,400/month on the worked base, not ₹0.
- **AC-16 (unnotified ceilings stay open).** *(Numbered after AC-15 so existing IDs stay stable; it belongs with the Pain-1 engine tests.)* Where a Code delegates a figure to notification and none has been captured — the gratuity payable ceiling (`gratuity.ceiling`), the bonus ceilings, the EPF and ESI damages scales (`epf.damages_scale`, `esi.damages_scale`) — the parameter ships with no silent default; any computation that needs it is held for operator confirmation, and a legacy figure is applied only with that confirmation recorded against the run.

<!-- DIAGRAM: problem-market-obligation-thresholds -->

#### Pain 2 — The tooling is fragmented, and the seams are where errors live

The 20–200 employer does not run one system. They run a *stack of partial systems joined by spreadsheets and manual re-keying*, and every join is a place a statutory number goes wrong.

| Function | What the beachhead employer typically uses today | The seam / failure mode |
| --- | --- | --- |
| Payroll calculation | Tally payroll module, or Excel, or a CA's in-house tool | Wage-base definitions not versioned; add-back rule applied inconsistently |
| Attendance | eSSL/ZKTeco biometric terminal + its own time-office software | Punch data manually exported and re-keyed into payroll; OT hours untracked against any quarterly limit |
| Statutory filing | CA/bureau logs into EPFO/ESIC/TRACES/state PT portals | No single source of truth; the employer cannot see filing status until something breaks |
| Employee queries | Email, WhatsApp, HR person's memory | Payslip disputes, investment declarations, Form 130 (ex-Form 16) requests all manual |
| Records | Paper registers or per-portal downloads | The six central-sphere employer registers plus the wage slip (EV-053) — including Form IX's per-day IN/OUT grid (EV-055) — not maintained as a system; retention periods per EV-054 |

The cost of fragmentation is not licence fees — it is **re-keying error, reconciliation labour, and the absence of a defensible audit trail**. This is the specific gap the PRD's positioning attacks: not feature parity with Zoho (that is table stakes, §21), but *portal-accepted artefacts plus attended, assisted submission under the employer's written authority, over a single record* (K-13; the legality of acting on government portals under employer credentials is under counsel review — §23). TallyPrime generates the artefacts (EV-032) but submission and status stay with the employer or its CA; a spreadsheet-plus-CA arrangement does both badly. The statutory liability stays with the employer either way — it is non-delegable.

Two seams are worth naming concretely because every pay cycle crosses them (their relative error frequency is unmeasured — a §20 V-16 baseline question):

- **The attendance→payroll seam.** A biometric terminal records punches; those punches must become paid days, overtime hours, leave deductions and loss-of-pay. When this crosses a manual export, OT is mis-stated, any quarterly OT limit is invisible, and the wage base for PF/ESI is wrong before any filing runs. (The "144 OT hours per quarter" cap is reported only by secondary summaries and has not been confirmed against gazette text — [Hypothesis], K-04: the product may *warn*, never *block*; §09.6, §20 V-17.) The device push receiver (ADMS/WDMS, EV-013, §09.3) exists to close exactly this seam without middleware.
- **The wage-master→filing seam.** The ECR, ESI challan and PT return each need the *same* employee master with *different* wage definitions (add-back base for PF, gross for ESI, salary slab for PT). A spreadsheet keeps one column called "salary" and derives the rest by hand. Every derivation is a defect opportunity.

##### Worked example — one employee, six wage bases

Take the ₹50,000-a-month sales employee from the add-back example (§04.1), on a Maharashtra payroll. Each filing and liability reads a different base:

| Filing or liability | The base it reads | This employee | Source |
| --- | --- | --- | --- |
| ECR — EPF, EPS and EDLI wages | Code on Wages s.2(y) "wages" after the 50% add-back, then the tenant's ceiling policy | ₹25,000 of wages; ₹15,000 as EPF wages under the ceiling policy or ₹25,000 under the actual-wage policy; EPS and EDLI wages at the ₹15,000 ceiling | The add-back example; AC-5; EV-035 (the ECR's separate EPF, EPS and EDLI wage fields) |
| ESI | Gross wages against the ₹21,000 ceiling (₹25,000 for persons with disability) | Not covered at ₹50,000 | r1/06 |
| Professional Tax (Maharashtra) | Monthly salary against the slab | ₹200 a month, ₹300 in February — above both the men's (₹10,000) and women's (₹25,000) thresholds | EV-014 |
| Gratuity accrual | The add-back base | ₹25,000 | CoSS s.53 (r1/06) |
| Minimum-wage and overtime tests | The payment-of-wages base | ₹50,000 | The add-back example |
| TDS (Form 138) | Taxable salary under the elected regime | Computed from the structure, not from any base above | §06.5 |

One number in a spreadsheet column; six bases in the filings. Each of the five derived values is a monthly hand calculation in the fragmented stack, and three of them — EPF wages, EPS wages and the gratuity base — move the moment the add-back percentage or a component's wage-base membership changes (§06.10). That is the seam AC-7 closes and AC-1 makes testable.

##### Acceptance criteria — Pain 2 (single record, closed seams)

- **AC-7 (one master, many views).** ECR, ESI challan, PT return and TDS annexure all draw from one employee/wage master; no filing is produced by re-keying from another artefact.
- **AC-8 (attendance closes into payroll).** Punch data from a supported device (eSSL/ZKTeco via ADMS push) resolves to paid days, OT (checked against a configurable quarterly OT limit that *warns and never blocks* — K-04) and LOP with no manual export step. Device punches are one input path, never the only one: a non-biometric attendance path exists for every employee, and written consent is captured before any biometric enrolment because SPDI Rules r.5(1) require it today (EV-060) — both specified in §09; who owes that consent duty is under counsel review (§23).
- **AC-9 (audit trail).** Every statutory figure is traceable to the source record and rule version that produced it, and feeds the six central-sphere registers and wage slip (EV-053) with state form numbers configurable; retention follows EV-054's central-sphere periods, with state-sphere periods held as configuration pending counsel (§14.7, §23).

##### Measuring the pains before the product exists — the design-partner baseline

The traceability index (end of §04.1) records that the seams are unmeasured today, and V-16 asks buyers about their bureau's miss-rate in interviews. A design partner can do better than recall: before go-live, the same fields are read from the partner's own records, so the problem is shown in its own numbers and the product's effect is later read against them.

| Field | Definition | Read from | The pain it sizes |
| --- | --- | --- | --- |
| `systems_in_cycle` | Distinct systems touched to produce one month's payroll and filings | A walkthrough of one real cycle | Pain 2 — fragmentation |
| `manual_transfers` | Files exported from one system and re-keyed or re-imported into another, per cycle | The same walkthrough | Pain 2 — the seams |
| `bases_derived_by_hand` | How many of the six bases in the worked example above the employer derives manually | The same walkthrough | AC-7's target |
| `returns_corrected_12m` | ECR Revised and Supplementary returns (EV-037) and Form 138 correction statements in the prior 12 months | Portal histories, exported by the employer from its own accounts | Pain 1 — correction frequency |
| `late_filings_12m` | Returns filed after their due date in the prior 12 months | Portal histories against the due-date calendar (§19.3.1) | V-16's miss-rate, from records rather than recall |
| `interest_damages_fees_12m` | ₹ of interest, damages and late fees paid in the prior 12 months, per levy | Challans and receipts | Pain 1 — its realised cost |
| `status_visibility` | Whether the employer can state, unaided, the status of last month's ECR, ESI and PT returns | Interview with the admin user and the founder | Pain 3 — the black box |
| `bureau_fee_and_scope` | Fee, headcount and scope, recorded as AC-18 requires | Invoices and the engagement letter | Pain 3 — the budget line |

Rules: the baseline is captured once, before go-live; the after-state comes from the product's own records through §19.3.3's metrics, never from a second interview; portal histories are exported by the employer from its own accounts — our operators read them on the employer's credentials only under the written authority §22.2 defines and once counsel has cleared acting on portals under employer credentials (Part D-17; §23); and the baseline is published only as a per-partner case with the partner's consent, never averaged into a market statistic (§20.6, sample honesty).

- **AC-28 (the baseline precedes go-live).** *(New.)* Every design partner has the baseline record above, complete or with each missing field marked "not available" and a reason, before its first live payroll month; a partner whose baseline is missing is not used in any statement about the size of the problem. Test: a case study claiming "late filings fell to zero" without a `late_filings_12m` baseline fails.

#### Pain 3 — The bureau relationship is a real, recurring budget line — and a black box

The dominant "solution" in the beachhead today is not software. It is a **CA or payroll bureau** charging a monthly retainer to run the filings and carry the judgement calls. This is simultaneously the status quo to displace-or-partner-with and the price anchor for everything.

- Published anchor: one provider's indicative bands run **₹3,000–8,000/month for 11–50 employees and ₹8,000–15,000/month for 51–100** (IndiaFilings, r2/05) — [Verified as a published indicative range]; what bureaus actually charge across the market is [Hypothesis] (§20 V-01). At the low end that is ~₹36k/year; at the high end ~₹1.8L/year — a meaningful budget line that already exists and does not need to be created.
- The black-box problem: the employer pays the retainer but has **no visibility into filing status, no self-serve record, and single-person key risk** (the relationship lives in the CA's head and login). When the CA is slow, sick, or wrong, the *employer* carries the statutory liability — the notice from EPFO or the AO lands on the *employer*, not the bureau.
- The judgement calls the bureau carries — the add-back interpretation, which allowances count as PT-liable, whether a mid-year joiner's previous-employer TDS is picked up — are precisely the calls that a maintained rules engine can standardise and make visible. Today they are opaque even to the employer paying for them.

> [Hypothesis] The realised bureau price is the single most important unvalidated number in the entire market model.
> If a CA in a Class-B city actually charges under ₹2,000/month for 20–50 people, the ₹80–150 PEPM modelling band collapses toward the ~₹50 value floor and the beachhead economics must be rebuilt. (K-09: price is a two-anchor structure — a value floor near ₹50 PEPM (Qandle, greytHR at 50 employees) and a mid-market clearing band of ₹80–200 (Zimyo, HROne, Keka), EV-027; the ₹80–150 band sits inside the clearing band and is not a ceiling; §18.)
> **Kill criterion:** mystery-shop 6–8 CAs/bureaus across two city tiers for 20/50/100-person quotes (§20 V-01). If the median monthly quote is < ₹2,000, re-anchor pricing before any funding decision.

##### Worked example — the retainer restated as a per-employee price

The retainer is quoted per employer per month; the product is priced per employee per month. Putting the one on the other's scale shows why the bureau is the price anchor (§18.1) and where the V-01 lines fall. The published bands are IndiaFilings' explainer ranges — indicative, not committed SKU prices — and each band names a different scope (r2/05); the per-head columns are arithmetic on them, not a market price.

| Headcount | Published band (₹/month) and the scope it names | Per employee-month, low | Per employee-month, high | Against the ₹80–150 modelling band [Hypothesis] |
| --- | --- | --- | --- | --- |
| 10 | ₹1,500–3,000 — salary calculation and payslips | ₹150.00 | ₹300.00 | Above the band; and the scope excludes statutory compliance |
| 11 | ₹3,000–8,000 — PF, ESI, TDS compliance | ₹272.73 | ₹727.27 | Above the band at both ends |
| 20 | ₹3,000–8,000 | ₹150.00 | ₹400.00 | At the top of the band or above it |
| 30 | ₹3,000–8,000 | ₹100.00 | ₹266.67 | Inside the band or above it |
| 50 | ₹3,000–8,000 | ₹60.00 | ₹160.00 | Low end below the band, high end above it |
| 51 | ₹8,000–15,000 — full compliance and return filing | ₹156.86 | ₹294.12 | Above the band — the step between two published bands |
| 75 | ₹8,000–15,000 | ₹106.67 | ₹200.00 | Inside the band or above it |
| 100 | ₹8,000–15,000 | ₹80.00 | ₹150.00 | Coincides with the band |

Three readings follow:

- **A bureau price is a step function of headcount**, like a block-priced software card (§04.4): the per-head equivalent falls inside each band and jumps at its edge (₹60–160 at 50 employees, ₹156.86–294.12 at 51). The buyer at the bottom of each band pays the most per head.
- **The V-01 lines, restated per head at 50 employees.** The kill line — an all-in quote under ₹2,000 a month — is under ₹40 per employee-month, below the ~₹50 value floor (EV-027). The pass line — at least 6 of 8 bureaus quoting ₹2,500 a month or more, filing included (§20.6) — is ₹50 per employee-month, the value floor itself. V-01 therefore tests whether bureau filing labour is priced at or above the cheapest software card, not whether it reaches our band.
- **The comparison is not like-for-like until the scope matches.** The retainer buys a person running the filings and carrying the judgement calls; the published scope even changes between the 11–50 and 51–100 bands. A software card buys computation and artefacts; ours adds attended, assisted submission under the employer's written authority, with liability staying with the employer (K-13). V-01's quote table records inclusions and filing scope (§20.6) for this reason.

- **AC-18 (like-for-like bureau comparisons).** *(New; numbered after AC-17.)* Any comparison between our price and a CA or bureau fee — in collateral, a sales script or the §18 price card — states the headcount, converts both sides to the same unit (per employer-month or per employee-month) by the arithmetic above, and writes the bureau's filing scope beside it as quoted: which returns it prepares, and whether submission is included. A per-head comparison against a bureau fee without a stated scope does not ship. Test case: a 50-employee prospect paying an illustrative ₹6,000 a month is shown ₹120 per employee-month against our per-head fee, with the bureau's quoted scope alongside.

**Where the three pains converge is the beachhead thesis:** the 20–200 employer has a *legally-enforced, dated obligation* (Pain 1), *fragmented tooling that manufactures errors* (Pain 2), and *an existing budget line paid to a black box* (Pain 3). That is obligation + dissatisfaction + budget in one segment — the definition of a market.

#### Who actually buys — the decision anatomy of a beachhead firm

Market sizing is meaningless without knowing who inside a 60-person firm signs, who uses, and who the product must *not* alienate. The beachhead buying unit is small and unusual — the same person often occupies three of these roles, and the external CA is inside the loop.

| Role | Who it is in a 20–200 firm | What they care about | Implication for the product |
| --- | --- | --- | --- |
| Economic buyer | Founder / owner / CFO | The penalty notice lands on *them*; wants the retainer line controlled | Sell on risk reduction and visibility, not features — the statutory liability stays with the employer and cannot be sold away (K-13) |
| Admin user | One HR/admin person (often <1 FTE on HR) | Not being blamed when a filing is late; not re-keying | Filing-status dashboard; single record (AC-7) |
| The CA / bureau | External, part-time, holds the portal logins | Their retainer, their judgement calls, their client relationship | Channel, not enemy — CA console (§18.7), or they block the sale |
| Employees | 20–200 people | Payslip, Form 130 (ex-Form 16), investment declaration, leave balance | Employee/mobile surface — parity with Frappe's PWA; whether TallyPrime ships employee self-service is an unresolved parity cell and must not be asserted either way (EV-032) |

Two consequences for GTM and therefore for CAC:

- **The CA is a gatekeeper, not a bystander.** In many beachhead firms the CA *is* the person who would evaluate and recommend the software, because the founder delegates compliance entirely. A product that reads as "disintermediate your CA" gets vetoed by the one person the founder trusts on this. This is why "design for the CA as a user" is the most consequential GTM call in the PRD — and why it is also entirely unvalidated (§18.7, §20 V-05). If CAs see us as a threat, the channel inverts into an opponent and CAC rises.
- **The admin user has almost no time budget.** HR is a fractional job in a 60-person firm. The buyer will not sit through an enterprise demo cycle, which is the concrete reason self-serve INR pricing and a published price card are table stakes (AC-14, §18), not polish.

> [Hypothesis] The CA is a channel, not a competitor, in the beachhead buying unit.
> **Kill criterion:** 20–30 practising-CA interviews across two city tiers (§20 V-05). If CAs predominantly see filing-first software as disintermediation of their retainer, the primary GTM motion is wrong and must flip to direct-to-founder with the CA as an integration, not a channel.

#### The status-quo alternatives the buyer weighs

The competitor at the point of sale is rarely another SaaS — it is the arrangement the firm already runs. Naming the real alternatives is what keeps the wedge honest (it is *quality-of-delivery*, not *availability* — §01).

| Status-quo option | What it costs the buyer today | Where it fails the buyer | Why we win / why we do not |
| --- | --- | --- | --- |
| Excel + in-house | ~₹0 licence; heavy hidden labour + error risk | No audit trail; add-back and TDS-format changes silently break it | Win on correctness + maintained updates |
| TallyPrime + CA | Payroll inside the existing TallyPrime licence — Silver, single-PC, ₹22,500 lifetime or ₹750 a month; Gold, multi-user, ₹67,500 lifetime or ₹2,250 a month, 3× the price; both plus 18% GST (EV-032; Tally's buy page, r3/01, September 2026) — so payroll's incremental software cost on an existing licence is nil — + CA retainer (indicative ₹3k–15k/mo, V-01) | No state PT slab table, no LWF engine, no leave module, leave encashment not calculable (EV-032); submission and status visibility sit with the CA | Win on multi-state PT/LWF, leave-to-payroll and attended submission with visibility (§21) |
| Pure bureau (no software) | Indicative ₹3k–15k/mo (V-01), all judgement outsourced | Black box; single-person key risk; liability stays with employer | Win on visibility; risk is the CA blocking (above) |
| Kredily / Zoho free tier | Kredily ₹0 unlimited; Zoho Payroll ₹0 to 10 employees | Computation free, outputs charged — bank payout files, PF/ESI challans, the annual tax certificate, Form 124 (ex-12BB) (EV-029) | Win on the output and submission layer; **parity on computation** |
| A priced HRMS (greytHR, Qandle, Pocket HRMS, Zimyo, HROne, Keka) | At 20 employees ₹2,450–6,999/month, because all six bill a 50-employee minimum block (Keka's historical block: 100) — ₹122.50–349.95 effective PEPM (EV-026, EV-027) | Generate artefacts; none claims to submit (EV-030); Keka suppresses its live price card (EV-021, EV-024) | Win on no seat floor (§18) and attended submission (K-13) |

The distribution across these options is unknown and it is the *volume* variable behind the bureau pool (§04.3) and the incumbent question. **Two incumbents, two jobs** (K-23): TallyPrime owns accounting and the statutory artefacts; greytHR owns the HRMS job (EV-091). Tally payroll *adoption*, as distinct from capability, is unknown (EV-032; §20 V-01–V-02). If most of the beachhead is on Tally-plus-CA, the wedge is displacement-with-migration; if most is on a rival SaaS, it is competitive win/loss. These are different GTM motions and the §20 studies decide which one we are running.

#### Switching triggers — when a status-quo arrangement becomes contestable

The "why now" forces (Pain 1) act on the whole market at once; a buyer switches on its own dated event. The events below are the ones the evidence supports, each with the signal that makes it observable before the buyer is ours, the status-quo option it strains, and where the product meets it. They are the acquisition-timing counterpart of §05.11's in-product band transitions, which handle the same events once the buyer is a tenant.

| # | Buyer event | Observable signal | Status-quo option it strains | Evidence | Where the product meets it |
| --- | --- | --- | --- | --- | --- |
| ST-1 | Crosses 20 employees | Headcount growth; a new EPF registration | Excel/in-house, and free tiers gated at 10 (Zoho Payroll) or 20 (factoHR, whose free scope is employee data, letters and payslips) | EPF at 20 (EV-057); gates (r2/05; r1/01) | EPF latch and registration (§05.11); no seat floor from the first paid employee (§18.2 P6) |
| ST-2 | Opens an establishment in a second PT or LWF state | A new state registration | TallyPrime — no state PT slab table, no LWF engine (EV-032); a single-state bureau | EV-032; the §04.1 state-fragmentation table | Maintained per-state rule tables (§06.4, §06.8), each state sourced before it ships (V-09) |
| ST-3 | The one-year saving of the EPF and ESI schemes lapses | ~21 Nov 2026; any ESIC or MoLE notification | Every arrangement; most visibly the CA who absorbs changes opaquely (Pain 3) | EV-002, EV-004; §20 V-08, V-22 | Dated banner and the frozen-regime contingency (§06.9; R-2) |
| ST-4 | The next Form 138 statement falls due on the 1.2 stack | Q2 of Tax Year 2026-27, due 31 October 2026 (EV-049); an FVU rejection of an old-layout file | Spreadsheet macros and unmaintained templates — mixing RPU/FVU versions causes rejection (EV-052) | EV-049, EV-051, EV-052 | The maintained Q1–Q3 generator (§08); Q4 fenced (EV-046) |
| ST-5 | The annual certificate cycle | Q4 due 31 May 2027 (EV-049); Form 130 to employees by 15 June (r5/02); the Q4 format still unreleased (EV-046) | Every tool — the dependency is on CBDT, not on the software | EV-046, EV-048 | Fence and dated notice (§05.7; R-4) — a trigger to be candid about, not to sell on |
| ST-6 | A renewal falls due on terms that re-price at renewal | The renewal date, less the notice window | A priced SaaS whose terms auto-renew unless notice is given 30 days before term end and make renewal fees "subject to an increase" (Keka terms of service, clause 15 — EV-025, r5/03) | EV-025 | A published per-head card (AC-14); the statement is confined to what the dated terms say (§21.12) |
| ST-7 | A Tax Year begins | 1 April | Any system: mid-year cutover must carry YTD earnings, TDS already deducted, previous-employer income and certificate continuity (r1/00) | R-31; §20 V-15 | Migration as a product surface (§16.7, §18.9); until V-15 passes, deals cluster at the Tax Year's start |
| ST-8 | The CA or bureau contact is unavailable, slow or wrong | A late or missed filing; an interest demand addressed to the employer | Pure bureau; Tally-plus-CA | Pain 3; the baseline miss-rate is unmeasured (V-16) | Filing-status visibility and the "what we did on your behalf" log (§22.3.1) |

Two rules keep the table honest:

- **An event with no recurring filing is not a switching trigger.** Crossing 50 (crèche), 100 (canteen) or 300 (standing orders; retrenchment and closure permission) adds obligations but no recurring return (EV-057; §05.6 Example H). Those belong to §05.11's in-product transitions, not to acquisition timing.
- **The stretch from ST-1 to 50 employees is where the structural overcharge lands** (§04.4): a firm that crosses 20 and buys a block-priced card pays for 50 seats from that day, and its next thirty hires are already paid for (EV-026).

ST-1 has a market-scale flow the others lack. EPFO covered 2,94,910 new establishments in FY2023-24, of which 2,29,403 took voluntary coverage at 0.85 accounts each (r2/05). The remainder — 65,507, derived — is that year's compulsory inflow. It is an upper bound on ST-1 events, not a count of them: it includes establishments that start above 20 as well as those that cross it, and it is registered inflow, not contributing establishments. It is the only annual flow of establishments entering the EPF obligation in the evidence base, and it is refreshed from each Annual Report with the denominator (§04.2, refresh runbook).

Events that would erode the wedge, rather than open a buyer, are tracked as risks with their own triggers: a priced vendor dropping its 50-seat block (R-39), greytHR cutting its price or widening its base (R-40), a free tier with statutory computation reaching 20 employees or more (R-41).

The dated triggers fall in a fixed order between now and the first annual cycle. ST-1, ST-2, ST-6 and ST-8 are buyer-specific and carry no calendar date; the others do:

<!-- DIAGRAM: problem-market-trigger-calendar -->

#### Worked example — one month in the life of a 60-person employer

To make the burden concrete rather than abstract, here is the recurring filing load for a single beachhead employer: a 60-person firm registered in Maharashtra and Karnataka (a common two-state footprint — HQ plus a satellite office). This is *one month*, and it repeats every month, forever.

| Date (typical) | Filing / action | Portal | Consequence of a miss |
| --- | --- | --- | --- |
| 7th (March deductions: 30 April — r3/02) | TDS deposit for prior month (s.392, ex-s.192 — EV-050) via Challan ITNS 281 (r3/02) | Bank challan | Interest 1.5% per month from deduction to deposit — Income-tax Act 2025 s.398(3)(a), ex-s.201(1A) (r5/04); any expense-disallowance consequence is unmapped under the 2025 Act [Hypothesis — §06.5] |
| Per registration (periodicity ingested each financial year — §06.4) | Professional Tax return — Maharashtra (PTRC); filing frequency is assigned **per registration each financial year** by the state department, so it is ingested, never derived (r1/06) | mahagst.gov.in | Interest and late fee per `pt.<state>.interest_rate` / `pt.<state>.late_fee`, no shipped default (§06.4) |
| 15th | **EPF ECR** upload → approve → challan → pay, for 60 employees; an approved return can never be cancelled (EV-036) | unifiedportal (EPFO) | Interest at 12% p.a., auto-calculated and mandatory with the contribution (EV-039); damages per `epf.damages_scale` (§06.2) |
| 15th (national date, ESI (General) Regulation 31 — r3/02) | ESI contribution for eligible employees (at or under the wage ceiling, in notified districts) | esic.gov.in | Interest at 12% p.a. (S.O. 2698(E)); damages per `esi.damages_scale` (legacy Reg 31-C graded up to 25% p.a. — r3/02) |
| 20th (within 20 days of month-end — r3/02) | Professional Tax — Karnataka, Form 5A (monthly) | e-PRERANA, Commercial Taxes Department (r3/02) | Per `pt.KA.*` parameters (§06.4) |
| State-set (not captured) | Shops & Establishments renewals and other state touchpoints | state labour portals | Per state — due days not captured (§06.11). Vendor calendars are not a source: one listed Karnataka PT on the "21st" with the wrong authority (r3/02) |
| Month-end | Attendance close: OT reconciliation against the configured quarterly OT limit (warn only — K-04); leave accrual; wage-base recompute (two bases per the 50% add-back) | internal → payroll | Wrong PF/gratuity base → retro liability |
| 31 Jul / 31 Oct / 31 Jan / 31 May (EV-049) | **Form 138** (ex-24Q) quarterly statement — FVU-validated file uploaded by the deductor (K-13) | TRACES/Protean | ₹200/day late fee under the 1961 Act's s.234E per a secondary source [Hypothesis]; statement-default penalty per `tds.penalty.statement_default`, 2025-Act section unmapped (§06.5) |
| 30 Sep / 31 Mar | ESI contribution-period close — ceiling-crossers exit from the next period; half-yearly return-of-contributions view (§06.3, §06.11) | esic.gov.in | Coverage re-evaluation errors carry into the next period |
| Annual | Form 130 (ex-Form 16 — TRACES-generated only, EV-048; issued to each employee by 15 June following the tax year per CBDT's Form 138 guidance note, r5/02; blocked on the Q4 format, EV-046); PF Form 3A/6A; PT annual (state); LWF (state — Karnataka's calendar-year remittance due 15 January is the one verified cadence, r2/10) | multiple | Certificate delay penalty per `tds.penalty.certificate_delay`; return defaults per state parameters (§06.5, §06.8) |

That is **six-plus distinct portals, three-plus statutory authorities, and at least four different filing cadences** for one 60-person firm in two states. Add a third state and the PT/LWF matrix multiplies again. This is the burden the product converts from a monthly scramble into a dated, tracked pipeline that ends in a portal-accepted artefact and an attended submission under the employer's authority (K-13) — and it is why the *filing*, not the payslip, is the unit of delivery.

##### The cost of one missed month, in rupees

To size the *downside the product removes*, run the penalty math on a single missed EPF month for this 60-person firm. Assume total monthly PF remittance (employee + employer) of ₹1.2 lakh (60 employees, an assumed blended ₹2,000/head — an illustrative input, not a measured figure).

- **Interest (the portal's "7Q" line):** simple interest at 12% p.a. from the due date (S.O. 2698(E), 29 May 2026 — r1/06; EV-039). For, say, a 3-month delay: ₹1.2L × 12% × 3/12 = **₹3,600**. It is auto-calculated and mandatory with the contribution, so it is a cash-flow item on the day of payment (EV-039).
- **Damages (legacy s.14B; the Code-era provision is not captured — §06.13):** the Code-era scale is not in the evidence base — it is parameter `epf.damages_scale`, no shipped default (§06.2), and EPFO's own EDLI page still shows a legacy per-month figure (r1/06), so two official texts disagree. The illustration therefore carries damages as an unknown annual rate *d*: ₹1.2L × *d* × 3/12 = **₹300 per percentage point of *d***. Damages may be deposited later at the employer's option (EV-039), which defers the cash but not the liability.
- **The unquantified part:** the employer, not the bureau, receives the interest and damages demand; the Code-era offence provisions behind repeated default are unmapped (§06.2, §06.13) and are not sized here. The reputational and audit cost is not in the arithmetic at all.

The point is not the exact rupee figure — it is that a *single portal missed by one person on leave* costs, in mandatory interest alone, ₹3,600 — 40–75% of a month of the product at the ₹80–150 modelling band (60 × ₹80–150 = ₹4,800–9,000) — before damages (₹300 per point of an unverified rate) and the unquantified layers, and the buyer has no forewarning today. Filing-status visibility is not a nicety; it is the insurance the retainer was supposed to buy and does not.

<!-- DIAGRAM: penalty-waterfall -->

#### The state-fragmentation multiplier

Professional Tax and Labour Welfare Fund are **state subjects** — there is no single national schema. Every state an employer operates in adds an independent levy with its own slab table, gender variants, periodicity, registration and filing cadence.

- **PT is a levy under roughly 20 separate State Acts** run by separate departments; no national government source of truth or consolidated table was found (r2/10); aggregator compilations count roughly 19–20 levying states/UTs (r1/06). In Tamil Nadu and Kerala it is a **local-body** levy rather than a state tax-department levy (r2/10), so even the levying authority varies. States commonly reported as *not* levying PT (Delhi, Uttar Pradesh, Rajasthan, Haryana, Punjab, Uttarakhand and others) are **unconfirmed** — no negative has been verified at source (r1/06, r2/10). A multi-state employer must therefore track "levy yes/no" and "levied by whom" per state before even reaching slabs. [Verified as structural — per-state Acts, no national table, local-body levies in TN and Kerala; the non-levying list and the levying count [Hypothesis]]
- **LWF is levied by a subset of states** (the exact list is part of the V-09 dataset) with contribution amounts, employer/employee split and periodicity that differ by state and are revised on their own schedules.
- **[Reversed] "Frappe HR ships PT across 15+ states and LWF across 14, free — so multi-state PT/LWF is table stakes."** False from source code: Frappe HR v16's India payroll is 3 files / 549 lines overriding 3 functions (HRA and marginal relief); no Indian state name appears anywhere in the repository; no PT slabs, no LWF (EV-031). TallyPrime has no state PT slab table (slabs are hand-entered) and no LWF engine, and a five-catalogue TDL search found no add-on closing the gap (EV-032). **Multi-state PT and LWF is a genuine differentiator against Frappe HR and TallyPrime — greenfield in both.** It is not a differentiator against greytHR, whose payroll page claims "PT with all state-specific rules built-in" (read, not tested — r5/03, captured September 2026); against greytHR the wedge is no seat floor and attended submission (§04.4).
- The maintenance consequence (§06.4, §06.8, §22): a verified, gazette-sourced PT+LWF dataset for every state — levy, slabs, gender variants, periodicity, effective dates — is a **build dependency**. Three state PT schedules have been read at the state's own primary source — Maharashtra and Odisha, with Karnataka's February top-up corroborated on its state portal (r2/10; §06.4 carries them) — while Telangana's verification reached its employer-registration wording, not its slab (r2/05; §06.4) and every other state is uncaptured. Aggregator PT tables are "materially disputed" and at least one widely-cited 2026 table reproduces a superseded structure (§20 V-09). Building on unverified aggregator PT data is a correctness risk, not a shortcut.

To make the fragmentation concrete — and to show exactly why we must treat aggregator tables as suspect — here is the *shape* of the divergence across five states. Rows marked [Verified] were read at the state's primary source (r2/10); every other rupee value is [Hypothesis] pending the gazette re-check (§06.4, §20 V-09).

| State | Slab base and top slab | Periodicity | Notable divergence | Status |
| --- | --- | --- | --- | --- |
| Maharashtra | Monthly salary, from 1 Apr 2023. Men: nil to ₹7,500; ₹175/mo to ₹10,000; above ₹10,000, ₹200/mo with **₹300 in February** (₹2,500/yr). Women: nil to ₹25,000, then the same split | Assigned per registration each financial year by the department — ingest, never derive (r1/06) | A gender-differentiated threshold and a February true-up; an aggregator's 2026 table omits the women's threshold (r1/06) | Slab [Verified — primary, r2/10, EV-014]; periodicity mechanism [Verified — MAHAGST, r1/06] |
| Karnataka | Monthly salary: ₹200/mo at ₹25,000 or above, **₹300 in February** (₹2,500/yr); nil below — notification DPAL 08 SHASANA 2025, effective 1 Apr 2025 | Monthly Form 5A within 20 days of month-end, via e-PRERANA (r3/02) | At least one widely cited 2026 aggregator table still shows the pre-2023 three-band structure (r1/06) | Effect verified on the state PT portal, instrument text not retrieved (r2/10) [Verified]; return frequency parameter `pt.KA.return_frequency` |
| Odisha | **Annual** income: nil below ₹1.6 lakh; ₹125/mo to ₹3 lakh; above ₹3 lakh, ₹200/mo for 11 months and ₹300 in "the last month" | Annual, online only (r2/10) | The slab base differs *in kind* — annual income, not monthly salary; the true-up month is undefined; a reported April 2026 repeal ordinance is unconfirmed (r1/06, low) | Slab as published [Verified — primary, r2/10, EV-014]; true-up month [Hypothesis], `pt.OD.true_up_month`; levy status open — §06.13, §20 V-09 |
| Tamil Nadu (and Kerala) | Local-body schedules, not captured | Not captured | Levied by local bodies, not the state tax department | Levy structure [Verified, r2/10]; values [Hypothesis], `pt.TN.<local_body>.slabs` |
| Telangana, West Bengal and every other levying state | Not captured — `pt.<state>.slabs` | Not captured | Earlier drafts' slab figures for these states are carried, not re-captured, and not shipped (§06.4) | [Hypothesis] — Telangana verified to employer-registration wording only (r2/05) |

- LWF divergence is worse because it is smaller and less documented: LWF sits outside the four Labour Codes, no state's LWF rate or employer/employee split is verifiable from a government source (r2/10), and the only verified cadence is Karnataka's calendar-year remittance due 15 January (r2/10). Amounts, splits and periodicity (monthly, half-yearly or annual) differ by state and are parameters until V-09 lands. The absolute rupees are trivial; the *count of distinct rules to keep current* is the cost.

> [Hypothesis] The state-fragmentation load is a *moat if maintained, a liability if not*. Neither Frappe HR nor TallyPrime does this work today — Frappe HR's payroll model has no state dimension and TallyPrime makes the user hand-enter PT slabs and build LWF as a manual pay head (EV-031, EV-032); greytHR claims state-specific PT rules (r5/03), and whether it or any rival backs them with a contractual update commitment is not in the evidence base — which is where a maintained, remedy-capped compliance SLA (§19) earns its price.
> **Kill criterion:** if a rival ships a *contractually backed*, all-state PT/LWF update SLA before we do, the maintenance moat narrows to attended submission alone.

#### Traceability — from each problem to its requirement, its measure and the study that could shrink it

A problem statement is only useful to a build team if it lands somewhere. The table maps each problem stated in §04.1–§04.4 to its acceptance criteria in this section, the section that owns the build, the measure that shows it solved, and the §20 study that could show the problem is smaller than stated. It adds no new obligation; it is the index.

| Problem statement | §04 criteria | Build owner | Measure | Study that could shrink it |
| --- | --- | --- | --- | --- |
| Statutory numbers go wrong silently (the Pain 1 worked examples) | AC-1–AC-6d, AC-16 | §06, §08; the rule store (§14.6) | The golden test vectors (§06.14); Rejection and Correction/Revision Rates (§19.3.3) | V-20, V-21 |
| The TDS target is moving (Form 138 on the 1.2 stack; Q4 unreleased) | AC-2, AC-3 | §08; the fenced list (§05.7) | Filing Coverage (§19.3.3) — fenced instances sit outside the on-time denominator | V-19 |
| The regime is in transition (the November 2026 saving lapse) | AC-6 | §06.9; the watcher (§22.8.4) | Statutory-change lead time (§19.9.1) | V-08, V-22 |
| The attendance→payroll seam | AC-8, AC-28 | §09 | Unmeasured today — the design-partner baseline (AC-28) and V-16 come first | V-10, V-11, V-16, V-17 |
| The wage-master→filing seam | AC-7, AC-28 | §07, §14 | `bases_derived_by_hand` before go-live; Pre-Filing Validation Pass Rate after (§19.3.3) | V-16 |
| No defensible audit trail | AC-9 | §14, §15 | Every statutory figure traces to its source record and rule version | — |
| The bureau black box | AC-14, AC-18, AC-28 | The attended session and its log (§22.3); the compliance SLA (§19.9.2) | `status_visibility` before go-live; OTAF (§19.1) and Product-Caused Miss Rate (§19.3.3) after | V-01, V-16 |
| The CA as gatekeeper | — (a channel question, not a product test) | The CA console (§18.7) | The CA-referred funnel (§19.7) | V-05 |
| State fragmentation | AC-6c | §06.4, §06.8; the compliance data pipeline (§22.8–§22.9) | States live with sourced rule rows | V-09 |
| The denominator and share discipline | AC-10–AC-12, AC-19, AC-20, AC-22, AC-26, AC-27, AC-31 | This section; the anti-metrics (§19.13) | Share in PF codes, both years stated (AC-19) | AC-20's measurement route; `beachhead_sub20_share` (§20.13) |
| Reading the spend and the bureau pool | AC-21, AC-23 | This section | — | V-02, V-03, V-01 |
| Price posture against named vendors | AC-13–AC-15, AC-17, AC-24, AC-25, AC-33, AC-34, AC-36 | §18.12; the clearance rule (§21.12); the §21.4 register | — | V-01, V-03, V-28 |
| The overlap, decided for one prospect | AC-29, AC-30, AC-35, AC-37 | Sales and self-serve surfaces; the CA console (§18.7) | Conversion by trigger and by priority (§19.7) | V-02, V-05 |
| Market claims in external material | AC-32 | This section; §21.12 for competitor claims | — | — |

<!-- DIAGRAM: market-funnel -->

### 04.2 The denominator problem, and the one number that survives audit

Almost every published figure for "India HR tech market size" is unusable, and the PRD already killed the worst offenders. This section states the rule, then builds up from a government denominator.

#### Numbers that are banned as denominators

| Banned denominator | Size implied | Why it is wrong | Status |
| --- | --- | --- | --- |
| "$23.32bn → $38.36bn India HR tech" | ~₹2,20,000 Cr → ₹3,60,000 Cr | Almost certainly a *global* figure mislabelled as India; no attribution | [Killed] (§02, EV-K04) |
| "63 million MSMEs" / 5.31 crore Udyam registrations | ~5–6 crore "employers" | Udyam registrations are classified by investment and turnover, not headcount, are cumulative with no de-registration, and are not employers with payroll obligations (r2/09); 5.31 crore is ~69× the contributing base | [Killed] (§02 EV-K01, §20) |
| 24,18,266 EPFO *registered* establishments | ~24 lakh | Registered ≠ contributing; two-thirds of PF codes are dormant | [Killed as denominator] (§02) |
| 32.56 crore EPFO member accounts | ~32.56 crore "members" | Cumulative accounts with a balance, not employees — 4.4× the 7.37 crore contributing members (r2/09) | [Killed as an employee base] |
| 20,83,340 ESIC employers (3,05,42,660 employees) as on 31.03.2023 | ~21 lakh | Registered, not contributing; a different threshold (10) and area notification; three and a half years stale, and ESIC's district expansion and the SPREE 2025 registration amnesty have moved it since (r2/09) | Not a denominator — at most a bound for the unsized 10–19 funnel |
| Sixth Economic Census: 5.85 crore establishments, 13.13 crore employment | ~5.85 crore | A 2013 complete enumeration with a mean of 2.24 workers per establishment; establishments, not employers with payroll obligations (r2/09) | Not a denominator |

The pattern is consistent: every inflated number counts *entities that could theoretically owe payroll* rather than *entities that demonstrably run payroll now*. The correction is to use the one figure that reflects revealed obligation. This is not pedantry — a plan denominated on 5.31 crore and one denominated on 7.66 lakh differ by ~69×, and every downstream metric (share, penetration, CAC payback against TAM) inherits that error.

#### The audit-proof denominator: EPFO contributing establishments

| Metric | Value | Source | Status |
| --- | --- | --- | --- |
| EPFO **contributing** establishments (FY2023-24) | **7,66,254** | EPFO Annual Report 2023-24, as on 31.03.2024 (EV-001) | [Verified] |
| EPFO registered establishments (same date) | 24,18,266 | EPFO | [Verified] |
| Ratio registered : contributing | **3.16×** | Derived | [Verified] |
| Contributing members (active UANs) | 7.37 Cr (7,37,39,204) | EPFO AR 2023-24 | [Verified] |
| Mean contributing employees per contributing establishment | 96.2 | Derived (7.37 Cr ÷ 7.66 lakh) | [Verified, but see caution] |
| *Registered* establishments by cumulative accounts | 0–50: 19,43,910 · 51–100: 1,80,736 · 101–150: 76,944 · 151–200: 43,426 · **>200: 1,73,250** | EPFO AR 2023-24 Appendix-2(v) — registered universe, bands by cumulative accounts, not current employees (r2/09) | [Verified] |
| Contributing establishments with **>200** employees | 41,881 *modelled*; plausibly anywhere in 41,881–1,73,250 | Output of a one-moment Pareto fit to the two anchors above (r2/09) — **not** an EPFO table; we are not aware of any EPFO contributing-by-headcount crosstab as of September 2026 (r2/09 asks EPFO for one) | [Hypothesis — modelled] |

> **[Reversed]** v0.3 cited 41,881 as an EPFO Appendix-2(v) count and marked it [Verified]. It is a model output (r2/09); the only measured band table is the registered-by-accounts table above. Every figure below that uses 41,881 inherits the model's uncertainty.
>
> Caution on the mean. 96.2 is a **right-skewed average**, not a typical establishment. A small number of very large contributing establishments (those above 200 employees — 41,881 to 1,73,250 of them — and the tail above 2,000) pull the mean far above the median. The *typical* contributing establishment is much smaller than 96 people. Any per-establishment revenue model built on 96.2 as a "typical" seat count will overstate ARPU. Use the mean only for aggregate ceilings, never for per-account modelling.

**Standing denominator rule for this PRD:** every market size, share claim and funnel stage is denominated on **7,66,254 contributing establishments**, or a sub-band of it. Any figure denominated on registered establishments (24.18 lakh) or Udyam (5.31 crore) is retracted on sight.

One caveat the denominator itself carries, stated so it is not discovered later: EPFO contributing establishments **exclude** tiny employers below the EPF threshold that have not opted in yet still owe TDS/ESI/PT, and — we assume, because the evidence base does not say how the count treats them — establishments exempted from EPF that run their own trusts [Hypothesis]. Opting in is not rare: 2,29,403 establishments took voluntary EPF coverage under s.1(4) in FY2023-24, 77.8% of all new EPFO registrations that year, at only 0.85 accounts each (r2/05) — so some sub-20 establishments sit inside the EPFO universe, which is exactly why `beachhead_sub20_share` (§04.3) cannot be assumed to be zero. The denominator therefore slightly *understates* the count of entities with *some* statutory payroll obligation while being the honest ceiling for entities with the *full* obligation stack the product serves. We accept the understatement because it errs conservative — the opposite direction from every banned number.

##### Stress-test — what if the denominator itself moves?

The whole model rests on one [Verified] number (7,66,254). Discipline requires asking what happens if it is stale or mis-stated, because a data room will.

- **It is a point-in-time count (31.03.2024).** EPFO's 2024-25 Annual Report was not published when last checked (r2/09), so this is still the latest count. The contributing base grows with formalisation and net EPFO additions; by launch it is likely higher (the r2 model assumed a 6% annual roll-forward — an assumption, not a measurement). That moves SAM *up*, not down — so anchoring on the FY2023-24 figure is again the conservative choice. The kill risk is the reverse: a recession or mass EPF-exemption shift shrinking the contributing base, which would show up in the next EPFO Annual Report.
- **The exclusions are directional, not random.** Sub-20 TDS/ESI/PT-only employers (excluded) are precisely the <20 band that §05.1 declines commercially (1–9) or serves free as an acquisition funnel (10–19); their absence from the denominator does not distort the *paid* beachhead. Exempted-trust establishments (if excluded) are assumed to skew large and enterprise — outside the beachhead [Hypothesis]. Both exclusions therefore fall mostly *outside* the 20–200 band, so the denominator is *more* accurate for the beachhead than for the whole market.
- **The refresh discipline:** re-pull the contributing count from each new EPFO Annual Report and restate every downstream figure; never let a 31.03.2024 number age silently into a 2027 deck. (Source: EPFO Annual Report series [Verified — cadence].)

> [Hypothesis] 7,66,254 is a stable-to-growing floor for the addressable base over the plan horizon.
> **Kill criterion:** if the next EPFO Annual Report shows the contributing base *falling* year-on-year, treat the market as contracting and re-test the entry thesis, not just the SAM arithmetic.

##### The refresh runbook — when EPFO publishes its next Annual Report

What should move the count in the meantime is named in the research, from PIB's year-end review (r2/09): EPFO's Employee Enrollment Campaign ran from 1 November 2025 to 30 April 2026; ESIC's SPREE 2025 offered employers and employees a one-time registration opportunity; and ESIC's coverage rose from 668 to 713 districts as on 10.11.2025. The first two act on *registration*, so they reach the registered universe first; only contribution moves the denominator. The runbook below is owned by Research and reviewed by Finance.

| Step | Action | Output | Check |
| --- | --- | --- | --- |
| RF-1 | Read the new report's contributing establishments and members, and its definition of each | Candidate IN-01, IN-02 (§04.3 sizing model) | The unit (PF code) and the "contributed during the year" test are confirmed, or the units-of-account rows below are changed first |
| RF-2 | Read Appendix-2(v) and look for any new contributing-by-members table | IN-03; an AC-20 candidate | If a contributing-by-members table appears, AC-20 is evaluated before anything is re-fitted |
| RF-3 | Re-fit, only if AC-20 is still open: *m* = members ÷ establishments; α = *m* ÷ (*m* − 20), kept unrounded; band counts = *N* × ((20/lo)^α − (20/hi)^α); band members by the band-mean integral α × 20^α ÷ (α − 1) × (lo^(1−α) − hi^(1−α)) × *N* (r2/09) | IN-05 | Today's inputs must reproduce r2/09 to the unit: 5,25,246 and 1,57,56,566 in 20–49; 1,99,127 and 1,76,78,824 in 50–199 |
| RF-4 | Retire the roll-forward (IN-14) | F-09 recomputed without it | — |
| RF-5 | Re-run the model and produce the diff | Every figure, old and new | The regression vectors are regenerated for the new inputs and reviewed, not edited to pass |
| RF-6 | Restate §04 and notify the consuming sections | Claim ledger re-graded; consumers notified (§04.3, who consumes the model) | Nothing published between RF-1 and RF-6 cites the old count without its year |
| RF-7 | Apply the direction test | Year-on-year change in IN-01 | A fall fires the kill criterion above |

The one trap in RF-3 is rounding. α printed as 1.2624 is display only: computed from the rounded value, the 20–49 count comes out at 5,25,256 rather than r2/09's 5,25,246. The re-fit uses the unrounded α (1.262352…), which reproduces every r2/09 band exactly — 36,390 establishments with 1,38,81,566 members in 200–999, 4,771 with 91,00,434 in 1,000–4,999 and 720 with 1,73,21,814 at 5,000 and above — and that reproduction is the test that the re-fit is implemented as the research did it.

RF-5's diff is itself a record, one row per changed figure, so that RF-6 can be checked rather than trusted:

| Field | Content |
| --- | --- |
| `figure_id` | As in the published-figure record (§04.3) |
| `old_value`, `new_value` | With units and display rounding |
| `changed_inputs` | The IN-IDs whose values moved, old and new |
| `model_versions` | The version retired and the version replacing it |
| `consumers` | Every `published_in` location, and every consuming section in the §04.3 consumers table |
| `restated_on` | The date each location was updated; blank until it is |
| `ledger_row` | The claim-ledger row re-graded, if any |

The refresh is complete only when every row has a `restated_on` date for every consumer.

#### Units of account — what EPFO counts, what we count, and how a share claim converts

A share divides one count by another, and the two counts must be in the same unit. EPFO's unit is not a company. Its registered universe is stated as **unique PF code numbers** — 24,18,266 (r2/09) — and the contributing count is the subset of establishments that contributed during the year. We read the contributing count as PF codes too, by inference from the registered count's unit [Hypothesis — inferred; the Annual Report's definition is read at the next re-pull, per the refresh discipline above]. A company holding three PF codes is three EPFO establishments; a vendor's "companies" and our tenants are neither.

<!-- DIAGRAM: problem-market-unit-mapping -->

| Unit | Definition | Counted where | Used for |
| --- | --- | --- | --- |
| EPFO registered establishment | A PF code number registered with EPFO | EPFO Annual Report — 24,18,266 as on 31.03.2024 | Ceiling tests only; never a denominator |
| EPFO contributing establishment | A PF code whose establishment contributed during the year | EPFO Annual Report — 7,66,254 (EV-001) | **The denominator** for every share, penetration and SAM figure (AC-10) |
| EPFO contributing member | A UAN that contributed during the year | EPFO Annual Report — 7,37,39,204 | Aggregate ceilings and the fit's member counts; never per-account revenue (AC-11) |
| Vendor "company" | Whatever a vendor counts — greytHR's "30,000+ companies" on its pricing page, "20,000+ paying businesses in India and GCC countries" on its About page (EV-091; r2/09) | Vendor pages, dated | A dated ceiling on share assumptions (EV-016); not convertible to PF codes |
| Tenant | Our commercial unit — one contract, one card, one `commercial_band` (§05.11) | Our billing | Revenue, ARR, logo counts |
| Legal entity | One PAN, holding its TAN(s) and the per-state PTEC (§07 FR-CHR-104; §14) | Our master | One Form 138 series per TAN |
| PF code (ours) | The EPF registration an establishment holds (§14 `Registration`) | Our master — ingested as issued, never derived from states or headcount | **The numerator unit** for any share claimed against 7,66,254 |
| Billable seat | Own-roll headcount at month end (§05.11) | Our billing | Revenue; never set against contributing members without the conversion below |
| ESIC employer code | An employer's ESI registration (§14 `Registration`) | ESIC's statistics — 20,83,340 registered as on 31.03.2023 (r2/09) | Not a share unit: registered, stale, a different threshold (§04.2 banned-denominators table) |

Conversion rules:

- **Share.** Numerator = distinct PF codes of ours for which at least one ECR filing instance reached FILED on the filing state machine (§08 FR-PAY-711) during a named financial year. Denominator = EPFO contributing establishments for the most recent published year. The claim names both years; because EPFO's count lags (the 2024-25 report was unpublished in September 2026 — r2/09), they will usually differ, and the claim then says so in its own text ("numerator FY2027-28 over denominator FY2023-24"). Tenants, legal entities and seats never enter a share figure.
- **SOM in two units.** The §04.3 SOM grids count PF codes ("establishments"). Tenants = PF codes ÷ `pf_codes_per_tenant` — a named parameter, unmeasured until our own tenant base exists; owner Product; routed to §20 (§20.13, pricing and commercial family). Until it is measured, SOM is stated in PF codes, and any tenant count derived from it is a scenario.
- **Seats and members.** Revenue uses billable seats; ceilings use contributing members. The two differ — own-roll headcount excludes contract workers (§05.11), and an own-roll employee is not necessarily a contributing member in every month — so the ratio is a named parameter, `seats_per_contributing_member`, measured from our tenants' ECR lines against their billing (owner Finance; routed to §20). The fit-row SAM (₹3,210–6,018 Cr, §04.3) implicitly sets it at 1.0.
- **Vendor counts.** A vendor's customer count divided by 7,66,254 is a dated ceiling (EV-016; §21.12 CLR-09), never a measured share, and never set beside our PF-code share as if the units matched.

The cases the rules must survive:

| # | Tenant situation | PF codes counted for the year | Why |
| --- | --- | --- | --- |
| U-1 | One entity, one PF code, 45 employees, ECRs filed all year | 1 | The base case |
| U-2 | One entity with establishments in three states, holding one PF code | 1 | Codes are ingested as held; states do not create codes |
| U-3 | The same entity holding three PF codes | 3 | Three EPFO establishments — and three in the SOM grid |
| U-4 | Two legal entities, one PF code each | 2 | Codes, not entities |
| U-5 | 15 employees, no PF code (below EPF's 20 — EV-057) | 0 | Outside the denominator; counted in funnel metrics (§19.7), never in share |
| U-6 | 15 employees under voluntary EPF coverage | 1 | Inside EPFO's universe (voluntary coverage — r2/05); it sits in the `beachhead_sub20_share` slice, not in the 20–200 beachhead |
| U-7 | A PF code with only NIL months in the year (no file — EV-042) | 0 | No contribution, so not contributing — the same test EPFO's count applies |
| U-8 | A tenant on our payroll whose ECR is generated and filed elsewhere | 0 | Our share counts filings the product carried |
| U-9 | A code onboarded in month 9 of the year, first ECR FILED in month 10 | 1 | At least one FILED ECR in the year |
| U-10 | An exempted (own-trust) establishment | Excluded and flagged | Whether EPFO's contributing count includes exempted establishments is not in the evidence base (the caveat above); `exempted_in_contributing_count`, a desk read routed to §20, owner Research |
| U-11 | A code whose only ECR in the year reached REJECTED and was not re-filed | 0 | REJECTED is not FILED (Part E-1) |
| U-12 | A tenant of 55 own-roll employees across two PF codes of 30 and 25 | 2, each in EPFO's 20–49 band by its own members | The tenant's `commercial_band` is 50–199 (§05.11); the SOM mix (codes) and the commercial mix (tenants) diverge by design and are never reconciled by relabelling either |
| U-13 | A retained v1 tenant (§05.21 AD-03) whose one PF code has grown to 210 members | 1, in the above-200 band | Counted in our share, but outside the beachhead share |
| U-14 | A PF code filed for by two of our tenants in one year — a client moved between a CA's console tenant and its own, or an acquired establishment | 1 | The numerator counts distinct PF code numbers across the whole base, never per tenant |

- **AC-19 (share-claim unit).** *(New.)* Every share or penetration figure computed from our own customers resolves to PF codes meeting the test above for a named financial year, divided by the most recent published EPFO contributing count, with both years stated in the figure's own text; the report producing it lists, per tenant, the codes counted and the codes excluded, each with its U-case. Test: a tenant matching U-3 contributes 3 to the numerator and 1 to the logo count; a tenant matching U-7 contributes 0; a report that divides a tenant count by 7,66,254 fails; a share figure that omits either year fails.

Worked example, on illustrative inputs. Forty tenants hold 52 PF codes in FY2027-28. Three filed only NIL months (U-7), one is exempted (U-10) and two had their ECRs filed elsewhere (U-8), so 46 codes count. The claim reads: "46 PF codes with a FILED ECR in FY2027-28 — 0.0060% of the 7,66,254 EPFO contributing establishments counted for FY2023-24." It does not read "40 customers", and it is never set beside greytHR's ≈3.9%, which is a claim in a different unit (EV-016).

**How each PF code is counted through a financial year.** Every code carries one counting state per financial year; the share report reads the states at year end.

| From | Event | To | Rule |
| --- | --- | --- | --- |
| — | The code is ingested for a tenant (§14 `Registration`), or a new financial year opens | HELD | Every code starts the year uncounted |
| HELD | The code is flagged exempted | EXCLUDED_EXEMPT | U-10; reversible only if the desk read of EPFO's definitions (`exempted_in_contributing_count`) says exempted codes are counted |
| HELD | An ECR instance for the code reaches FILED (§08 FR-PAY-711) | COUNTED | U-1, U-9; terminal for the year — a later rejection of another month does not uncount it |
| HELD | An ECR instance reaches REJECTED | HELD | U-11; nothing is counted until a FILED instance exists |
| HELD | A NIL month passes (no file — EV-042) | HELD | U-7 |
| HELD | The year closes | NOT_COUNTED | Reason recorded: NIL only, rejected only, filed elsewhere (U-8), or no ECR due |

**The share report.**

| Field | Content |
| --- | --- |
| `numerator_fy` | The financial year the codes were counted in |
| `codes_counted` | Codes in COUNTED at year end |
| `codes_excluded` | Codes in NOT_COUNTED or EXCLUDED_EXEMPT, each with its U-case |
| `per_tenant` | For every tenant: codes counted, codes excluded, logo count (always 1) |
| `denominator`, `denominator_fy` | The EPFO contributing count used and its year |
| `share` | `codes_counted` ÷ `denominator`, to as many decimals as the value needs to be non-zero |
| `claim_text` | The sentence in the AC-19 form, with both years |
| `band_split` | Codes counted by EPFO band of the code's own members (20–49, 50–199, 200 and above, below 20) — for beachhead share, never mixed with `commercial_band` (U-12) |
| `beachhead_share` | The 20–199 codes in `band_split` ÷ the beachhead count of a named scenario, carrying that scenario's ID — the beachhead denominator is a SCENARIO until AC-20 is met |

Continuing the illustrative cohort: if 43 of the 46 counted codes sit in 20–199 by their own members, the beachhead share is 0.0195% on SC-2.2 (2.2 lakh) or 0.0059% on SC-FIT (7,24,373), and the report prints both with their scenario IDs. It never prints a single beachhead share while AC-20 is open.

#### The share-ceiling calibration

greytHR — the HRMS-job incumbent (K-23) — currently claims **"30,000+ companies"** (captured September 2026, EV-091; earlier captures read 34,000, and its own About page says "around 20,000+ paying businesses in India and GCC countries" — r2/09). 30,000 is **≈3.9%** of the 7.66 lakh contributing establishments (derived; a marketing claim over a government count, not a measured share — and not all of greytHR's customers are EPF-contributing Indian establishments). **[Reversed]** v0.3's "34,000 customers = 4.4%" was a moved vendor number carried as [Verified] without a date. This is still the single most useful number for sanity-checking any SOM: *that is roughly the footprint of the vendor with the largest claimed customer count in the set (r2/09), on the honest denominator.* Any three-year plan that implies more than low-single-digit percentage penetration of contributing establishments is claiming to out-penetrate the HRMS-job incumbent from a standing start, and should be rejected. On greytHR's other own claim — "20,000+ paying businesses in India and GCC countries" on its About page (r2/09) — the same division gives 2.6%. The calibration is therefore 2.6–3.9% depending on which of the vendor's own claims is used. The section carries the current headline claim (EV-091) and notes that the About-page claim would tighten the ceiling; every row of the §04.3 SOM grid (at most 1.5%) sits below both, so the choice changes no conclusion here — but any plan above 2.6% must say which claim it relies on.

A second calibration sits alongside it: greytHR's realised **~₹52 PEPM** (filed revenue ÷ claimed platform scale — EV-006 inputs, §18), which sits at its own published entry price of ₹49.90 PEPM at 50 employees (EV-027). Read together, the two numbers say the HRMS-job incumbent reaches roughly 4% of establishments at ~₹52/employee/month; its profitability is not public (r2/09), and its filed revenue includes GCC business, so its India-only revenue is lower by an undisclosed amount (r2/09). Any model that assumes both higher penetration *and* higher realised PEPM than greytHR is asserting we out-execute the HRMS-job incumbent on both axes simultaneously, from zero. That is the specific claim the sensitivity grid in §04.3 is built to discipline.

A sharper reading of the same two numbers. greytHR's own two claims — "20,000+ paying businesses" and "20 Lakh+ employee records on a monthly basis" — imply about 100 employees per customer (r2/09). At 100 employees its Essential card's effective rate is ₹47.45 (§21.4), and the realised ₹52.18 sits about 10% above it. Either there is no deep discounting at its customers' size, or its customers mix in higher tiers such as Growth (₹4,495 plus ₹85 per additional — r5/03); on neither reading is realised price far below list. That is one vendor's evidence for the penetration reading of the spend identity (§04.3), not the market's — V-03 settles it.

#### The market funnel, stage by stage

The market-funnel diagram narrows from the inflated denominators the industry quotes to the number a founder can actually act on. Each step is a deliberate exclusion with a reason, not a haircut.

| Stage | Count | What it is | Why we narrow here |
| --- | --- | --- | --- |
| Quoted "market" | 5.31 crore | Udyam MSME registrations | [Killed] — not employers with payroll obligations (§02) |
| Registered universe | 24,18,266 | EPFO-registered establishments | [Killed as denominator] — 3.16× the contributing base; two-thirds dormant |
| **Addressable universe (TAM)** | **7,66,254** | EPFO *contributing* establishments | [Verified] — revealed payroll obligation; the honest ceiling (EV-001) |
| Serviceable (SAM) | Up to ~7.24 lakh on the r2/09 fit; 1.8–2.6 lakh in the high-<20-share scenarios (§04.3) — plus a slice of the modelled 41,881–1,73,250 above 200 | 20–200 beachhead + near-in expansion | Obligation + budget + dissatisfaction overlap; product shape fits |
| Winnable in 3 yrs (SOM) | ~1,100–3,300 establishments at a 2.2-lakh scenario; ~3,600–10,900 at the fit's 7.24 lakh | 0.5–1.5% of the beachhead | Bounded by greytHR's ≈3.9% calibration (30,000+ claimed, September 2026 capture — EV-091) and cold-start reality |

The funnel discipline is the section's core contribution: the difference between the top row (5.31 crore) and the SOM row (~2,200 establishments at the 1% midpoint of the 2.2-lakh scenario) is **more than four orders of magnitude** (~24,000×), and almost every published India-HR-tech number lives in the top two rows. Building a plan on 7,66,254 and narrowing transparently is what makes the SAM defensible in a data room.

#### Demand-side evidence of dissatisfaction

"Dissatisfaction" is the softest leg of the obligation-budget-dissatisfaction stool, so it needs its own evidence rather than assertion.

- **Support responsiveness and implementation friction recur as the leading churn themes in sampled negative reviews** — ahead of missing features (r1/01, r1/07; a qualitative reading of the negative tail, not a measured frequency — aggregate ratings for every vendor are good, r1/07; §20 R-28). Switching friction concentrates at **mid-year cutover** (r1/00) — opening balances, YTD earnings, TDS already deducted, previous-employer income, investment declarations mid-cycle, certificate continuity across two systems, EPF UAN and ESI IP continuity, leave balances, gratuity accrual. The pain of *switching* is itself evidence that the installed base is unhappy but stuck. It also cuts the other way for us: the same friction is a moat *once we hold the record*, which is why migration is a product surface, not a services task (§16.7).
- **The incumbents' own limits create dissatisfaction.** TallyPrime generates the statutory artefacts but has no state PT slab table, no LWF engine and no leave module, and cannot calculate leave encashment; attendance is manual vouchers (EV-032); its cloud option is a hosted virtual desktop (r3/01). Kredily and Zoho give away computation and charge for outputs — bank payout files, PF/ESI challans, the annual tax certificate, Form 124 (ex-12BB) (EV-029). The employer who "has software" still hits a wall at the exact moment of filing.
- **The bureau black box (Pain 3) is dissatisfaction by another name** — no filing-status visibility, single-person key risk, and the employer carrying liability for the CA's errors.

What each signal can and cannot carry, so none is stretched past its evidence:

| Signal | Source | What it shows | What it cannot show | What would size it |
| --- | --- | --- | --- | --- |
| Support and implementation friction lead the negative-review themes | r1/01, r1/07 — a qualitative reading of the negative tail | Where unhappy customers complain | How many are unhappy; aggregate ratings are good for every vendor | V-03 and V-05 conversations; R-28's churn triggers |
| Switching friction concentrates at mid-year cutover | r1/00 | That part of the installed base is stuck | Whether it wants to leave | V-15, the cutover spike |
| The incumbents' named limits — Tally: no state PT slab table, no LWF engine, no leave module (EV-032); freemium: outputs charged (EV-029) | Product documentation and pricing pages | That a wall exists at the filing moment | How many buyers hit it, or mind | V-02, the status-quo distribution |
| The bureau black box | Pain 3 | A structural absence of visibility | Whether buyers value visibility enough to pay | V-16; the design-partner baseline (AC-28) |
| Keka's move to a sales-qualified motion (EV-024) | Vendor pages | An evaluability gap for a buyer who will not sit through a demo | Dissatisfaction among Keka's own customers — nothing here speaks to it | — |

Rule: no signal above is stated as a rate, a share or a count of dissatisfied buyers; the only quantified dissatisfaction this PRD may cite will come from V-16 and the AC-28 baselines, per partner and never averaged into a market statistic (§20.6).

> [Hypothesis] Dissatisfaction is real but its *magnitude and willingness-to-switch* are unmeasured — no NPS, churn-rate or win/loss data exists in the corpus.
> **Kill criterion:** buyer interviews (§20 V-01–V-03, V-05). If beachhead employers report high satisfaction with the Tally-plus-CA status quo and low switching intent, the wedge is weaker than the burden analysis implies, and acquisition CAC assumptions must rise.

##### Acceptance criteria — the denominator discipline

- **AC-10 (single denominator).** Every share, penetration and SAM figure in any downstream deck resolves to 7,66,254 (or a named sub-band); a reviewer can trace it in one step. Any figure that cannot is retracted.
- **AC-11 (no skew laundering).** No per-account revenue figure multiplies by 96.2; the mean is used only for aggregate ceilings, flagged as such.
- **AC-12 (band resolution gate).** Before any funding model hardens, the 20–200 contributing-establishment count — and with it `beachhead_sub20_share` (§04.3) — is resolved from a measured source, replacing the scenario range. EPFO's published Appendix-2(v) cannot do this alone (registered universe, cumulative-accounts bands — r2/09); the method is a §20 desk-validation item.

#### Resolving the beachhead count — the routes to a measured `beachhead_sub20_share`

AC-12 names the gap; this is the specification for closing it. Every route below is named in the research, and each is graded by what it can and cannot settle.

| Route | What it measures | Can it settle the parameter? | Effort | Source |
| --- | --- | --- | --- | --- |
| A written request, or an RTI application, to EPFO's statistics division for contributing establishments banded by current contributing members, as on the Annual Report date | Exactly the missing crosstab | **Yes** — the only route that can | Desk, no spend; the elapsed time depends on EPFO and is not estimated | r2/09 (open question) |
| EPFO Appendix-2(v) | Registered establishments by cumulative accounts | No — wrong universe (registered) and wrong unit (accounts ever opened, not current employees) | Done | r2/09 |
| EPFO Appendix-3(iii) | Contributing totals by zone | No — totals with no size split | Done | r2/09 |
| MoSPI establishment surveys (AQEES, QES), triangulated | Survey-based establishment-size distributions | Partly — can bound band shares; the survey scope is not EPFO's universe | Desk | r2/09 |
| ESIC coverage statistics | 20,83,340 employers and 3,05,42,660 employees as on 31.03.2023, a mean of 14.66 | No — registered, not contributing; a different threshold (10 — EV-057); stale, and SPREE 2025 has since moved it | Done | r2/09 |
| EPFO voluntary-coverage inflow | 2,29,403 establishments took voluntary coverage in FY2023-24, at 0.85 accounts each | No — a one-year inflow into the registered universe, not the contributing stock | Done | r2/05 |
| Our own tenant base | Our customers' codes and headcounts | No — a selected sample, not the market | After launch | — |

Why the published tables cannot be forced to answer: set beside each other, the registered-by-accounts bands and the fitted contributing bands differ by factors that vary with size.

| Registered band (cumulative accounts) | Registered establishments | Nearest fitted band (current contributing members) | Fitted contributing establishments | Registered ÷ fitted |
| --- | --- | --- | --- | --- |
| 0–50 | 19,43,910 | 20–49 (the fit places none below 20) | 5,25,246 | 3.70× |
| 51–200 | 3,01,106 | 50–199 | 1,99,127 | 1.51× |
| Above 200 | 1,73,250 | 200 and above | 41,881 modelled | 4.14× |
| All | 24,18,266 | All | 7,66,254 | 3.16× |

(Registered bands: Appendix-2(v), [Verified]. Fitted bands: the r2/09 Pareto fit, [Hypothesis — low confidence]. The band edges do not align, so the ratios are indicative only.)

If dormancy were spread evenly across sizes, every row would sit near 3.16×. The 51–200 row sits at 1.51× — consistent with dormant PF codes being overwhelmingly small (r2/09) — and the above-200 row at 4.14× — consistent with cumulative accounts overstating current headcount in older, larger codes (r2/09). Both readings are plausible, neither can be separated from the published tables, and a low 51–200 ratio could equally mean the fit understates 50–199. That is why only the first route can close AC-12.

- **AC-20 (acceptance for a measured beachhead count).** *(New.)* A source replaces the scenario range in §04.3 only if it (a) counts contributing establishments, not registered ones; (b) bands them by current contributing members, not cumulative accounts; (c) states its as-on date; and (d) sums across its bands to the EPFO contributing total for the same date, or explains the difference. A source that meets (a)–(c) but not (d) enters as a bound, not a value. On acceptance, `beachhead_sub20_share` moves to MEASURED (§04.5, market parameters as governed state), every SAM and SOM figure in this section is restated in the same change, and the claim ledger's beachhead rows are re-graded.

### 04.3 TAM / SAM / SOM on the honest denominator

We size the market two ways and reconcile them: **top-down by establishment count × realised ARPU** (a full-penetration potential), and **bottom-up from filed vendor revenue** (what is paid today). They answer different questions, so they need not match — but the gap between them must be explained, and the explanation named as a validation item.

#### Establishment counts by band

The beachhead is 20–200. Only one end is measured: EPF turns on at 20 (EV-057). The above-200 count is modelled, and we are not aware of any EPFO contributing-by-current-headcount band table as of September 2026 — Appendix-2(v) counts *registered* establishments by *cumulative accounts* (§04.2) — so the interior split is one model plus one unmeasured parameter.

| Band (contributing employees) | Contributing establishments | Basis | Status |
| --- | --- | --- | --- |
| Total contributing (all sizes) | 7,66,254 | EPFO 31.03.2024 (EV-001) | [Verified] |
| > 200 (expansion + enterprise) | 41,881 modelled (41,881–1,73,250 plausible) | Pareto fit (r2/09); upper end is the registered >200-accounts count | [Hypothesis — modelled] |
| 20–49 on the fit | 5,25,246 (1.58 Cr members) | One-moment Pareto fit, x_min = 20, α = 1.2624 (r2/09) | [Hypothesis — low confidence] |
| 50–199 on the fit | 1,99,127 (1.77 Cr members) | Same fit | [Hypothesis — low confidence] |
| **20–200 (beachhead)** | **7,24,373 × (1 − `beachhead_sub20_share`)**, less any above-200 excess over 41,881 | Fit residual (7,66,254 − 41,881), adjusted by the unmeasured parameter | **[Hypothesis]** |
| < 20 (funnel/acquisition only) | 7,24,373 × `beachhead_sub20_share` | Not published anywhere in the evidence base | Unknown — §20 |

> Note on the beachhead count. The fit is pinned by one moment (the 96.2 mean) and its family was chosen by assertion; a lognormal alternative fits the same anchors and disagrees ~2× on the 200–999 band (r2/09). By construction it puts **no** contributing establishment below 20, so it overstates the beachhead to whatever extent sub-20 establishments contribute. That share is the named parameter `beachhead_sub20_share` — value unknown, routed to §20 (AC-12). §05 uses the fit's 7.24 lakh residual; this section carries it as the upper case.
> **[Reversed]** v0.3 modelled the beachhead at **1.8–2.6 lakh** from an assumed ~65% sub-20 share (with 22/8/5% for 20–50/50–100/100–200) that no source supported, and argued that right skew implied a large sub-20 share. Right skew lowers the median; it does not by itself put establishments below 20 — the fitted distribution is right-skewed with none below 20. The 1.8–2.6 lakh figures survive only as scenarios, corresponding to a `beachhead_sub20_share` of ~64–75% (derived: 1 − 2.6/7.24 and 1 − 1.8/7.24).
> **Kill criterion:** if a measured source (AC-12) puts the 20–200 band below ~1.5 lakh contributing establishments, SAM falls below every grid row and the "expansion into 200–2,000" phase must be pulled forward; if it lands near the fit, the beachhead is ~3× the 2.2-lakh scenario and the §04.3 SOM grid scales with it.

**Sensitivity, stated so the parameter can be attacked.** Each 10 points of `beachhead_sub20_share` moves the beachhead by ~72,400 establishments (10% of 7,24,373). The fit's own mean in 20–199 is ~46 employees (3.34 Cr members ÷ 7.24 lakh), below the 55 billable seats this section assumes (V-03). No funding model hardens on either figure — only on a measured count.

##### Where the members are on the fit — and why no segment choice rests on it

The fit extends above 200, and there the two candidate distributions disagree most (r2/09):

| Band (contributing members) | Pareto-fit establishments | Pareto-fit members | Share of all members | The lognormal alternative (σ 1.3) |
| --- | --- | --- | --- | --- |
| 20–49 | 5,25,246 | 1,57,56,566 | 21.4% | Fits the same two anchors |
| 50–199 | 1,99,127 | 1,76,78,824 | 24.0% | — |
| 200–999 | 36,390 | 1,38,81,566 | 18.8% | About 2× different |
| 1,000–4,999 | 4,771 | 91,00,434 | 12.3% | — |
| 5,000 and above | 720 | 1,73,21,814 | 23.5% | 33 establishments — about 22× fewer |
| All | 7,66,254 | 7,37,39,204 | 100% | — |

(Pareto rows reproduce r2/09 to the unit — the refresh runbook's RF-3 check. [Hypothesis — low confidence]: the family was chosen by assertion, and the measured registered-by-accounts table contradicts the above-200 count by up to 4.1×.)

On the Pareto fit almost a quarter of all contributing members sit in 720 establishments of 5,000 or more; on the lognormal, 33 establishments hold that tail. The fitted family, not the evidence, decides where the members — and so the value — sit. The research's own recommendation is the rule this section follows: choose the segment for reasons that hold independently of the fit, not because a fitted band carries a large figure (r2/09). The beachhead is chosen on obligation, budget and dissatisfaction (§04.4); enterprise is deferred on procurement gates (§05.2); neither decision cites a fitted band's members or value, and an argument that does — "the 5,000-and-above band holds 23.5% of members, so pull enterprise forward" — is rejected.

#### Top-down market model

We use **realised** PEPM where it exists and list price only as a bound. List prices give **two anchors** (K-09, EV-027): a **value floor near ₹50 PEPM** (Qandle ₹49.00 on annual billing, greytHR ₹49.90, at 50 employees) and a **mid-market clearing band of ₹80–200 PEPM** (Zimyo ₹80.00, HROne ₹99.00, Keka ₹139.98 at its ₹6,999 floor or ₹199.98 on the archived card). The two realised points that survived audit — **₹52** (greytHR, SMB-weighted) and **₹126** (PeopleStrong, enterprise-weighted) — derive from filed revenue over claimed platform scale and are biased *downward* because platform users exceed billed seats (EV-006, §18); they sit on the floor and inside the band respectively. For the beachhead we model **₹80–150 PEPM** as a [Hypothesis] band inside the clearing band — above the floor because our thesis is that portal-accepted artefacts plus attended submission command more than commodity SMB HR — and it is a modelling band, not a price ceiling (§18).

Per-account revenue requires a *billable* seat count, not the skewed mean. We model the beachhead average billable headcount at **~55 employees** (the segment centre of mass — 50–200 "carry revenue" per §05.1, blended with the 20–50 tail) [Hypothesis, V-03]; the r2/09 fit's own mean in 20–199 is ~46. Because we bill actual headcount with no seat floor (§18), billable seats equal employees — unlike the six priced competitors, every one of which bills a 50-employee minimum block (EV-026).

| Layer | Definition | Establishments | Avg billable seats | PEPM | Annual value | Status |
| --- | --- | --- | --- | --- | --- | --- |
| **TAM** | All contributing establishments as a software-addressable universe | 7,66,254 | 96.2 (mean, aggregate only) | ₹80–150 | see reconciliation below | [Hypothesis] |
| **SAM** | Beachhead 20–200 (the 200–2,000 expansion slice is excluded from the value) | 1.8–7.24 lakh across the `beachhead_sub20_share` scenarios | ~55 (fit row: ~46) | ₹80–150 | **₹950 Cr – ₹6,018 Cr** | [Hypothesis] |
| **SOM (3-yr)** | Realistic capture at sub-leadership share | 0.5–1.5% of beachhead | ~55 | ₹80–150 | **₹5.8 Cr – ₹32.7 Cr ARR** at the 2.2-lakh scenario; scales with the count | [Hypothesis] |

SAM worked example (2.2-lakh scenario, midpoints): 2.2 lakh establishments × 55 seats × ₹115 PEPM × 12 = **₹1,670 Cr/yr** addressable in the 20–200 band alone. On the r2/09 fit (3.34 Cr members in 20–199) the same ₹115 gives **₹4,614 Cr/yr**. The 200+ slice is excluded from both.

SOM worked example (3-yr): at **1.0%** of a 2.2-lakh beachhead = 2,200 paying establishments × 55 seats × ₹115 × 12 = **₹16.7 Cr ARR**. greytHR's ≈3.9% calibration (September 2026 capture, EV-091) implies an upper bound near **₹65 Cr ARR** on that beachhead (≈8,600 establishments) — reachable only at multi-year leadership, not in three years from zero; on the fit the bound scales with the count.

##### Five meanings of "PEPM", kept apart

Two of this section's kills came from mixing these — the circular Keka ₹99 and the tenfold ₹2.4–4.4 slip — so every PEPM figure in §04 names which one it is.

| Meaning | Definition | Example | Never set beside |
| --- | --- | --- | --- |
| List PEPM at 50 | A vendor's entry-tier monthly bill at 50 employees ÷ 50, from its dated card | greytHR ₹49.90; Keka ₹139.98 at its live floor (EV-027) | A realised figure, without saying which is which (V-03) |
| Effective PEPM at *n* | The vendor's bill at headcount *n* ÷ *n* — it rises steeply below the block | greytHR ₹124.75 at 20, ₹47.45 at 100 (§21.4) | List PEPM at 50, as if the block did not exist |
| Realised PEPM | Filed revenue ÷ (claimed platform employees × 12) | greytHR ~₹52; PeopleStrong ~₹126 (EV-006; r2/09) — both biased low | Our modelling band without the bias note; and it is never derived by assuming a list tier (the ₹99 kill, N-09) |
| Implied spend per contributing member-month | Market spend ÷ (contributing members × 12) — π × *P*, not a price | ₹23.73–44.07 (§04.3, the spend identity) | Any price at all, unless π is stated (AC-21) |
| Our modelling PEPM | The ₹80–150 band [Hypothesis] this section's grids use | ₹115 midpoint | Anything labelled "our price" — our price is §18's decision and is not yet published (§21.4; CLR-05) |

#### Bottom-up reconciliation (the reality check)

The top-down SAM is a full-penetration potential; observed spend is what the market pays today. They need not match — they must be *explained* together.

- **Filed revenue across 11 Indian HRMS entities: ₹1,374 Cr** [Verified] (the scoreboard in §04.4). Grossed up on the assumption that those eleven are 35–65% of India HRMS software spend (r2/09) → **₹2,100–3,900 Cr** real annual India HRMS software spend (USD 0.22–0.41bn at ₹94.43/USD, EV-089) — [Verified inputs + modelled gross-up] (EV-005). The share band is the weak link: the filed base itself contains non-India revenue (Darwinbox's standalone figure, greytHR's GCC business), which pulls one way, while unfiled and foreign vendors (SAP SuccessFactors, Oracle, Workday, Zoho People, MYND after Qandle) are unmeasured and pull the other (r2/09).
- **Implied spend per contributing member:** ₹2,100–3,900 Cr ÷ 7.37 Cr members ÷ 12 = **₹23.7–44.1 per member-month** — below every entry-tier list price at 50 employees (₹49.00–199.98, EV-027). (r5's synthesis and CFO review quote ₹2.4–4.4; that is a tenfold arithmetic slip.)
- **Two readings, both stated.** *Penetration:* at list, observed spend pays for software for roughly 12–55% of contributing members at the ₹80–200 clearing band (up to ~90% only if every member paid the ~₹49 floor) — the rest are on Tally, spreadsheets or a bureau. *Discounting:* if most members were already on paid software, realised price would be ₹24–44 PEPM, below every list card. greytHR's realised ~₹52 sits at its own ₹49.90 list (EV-006, EV-027), which argues against deep discounting at the SMB end and leans toward penetration — but one vendor is not the market. **Validation:** §20 V-02 (status-quo distribution) settles penetration; §20 V-03 (realised ARPU vs list) settles discounting.
- **Corrected CAGR ceiling: ₹10,905 Cr at 10% CAGR** (not ₹12,250 Cr — overstated 12.3%, [Killed], EV-K11). This is the upper sensitivity of a *modelled* whole-market ceiling, not a target: the same Pareto model gives ₹9,013 Cr at 0% and ₹10,126 Cr in its 6% central case, and a lognormal alternative gives ₹8,861 Cr (r2/09). The two-year roll-forward exists only because EPFO's 2024-25 Annual Report is unpublished (r2/09).

**[Reversed]** v0.3 argued that a SAM above observed spend would be "self-refuting" and that the SAM midpoint landing at ~43–80% of spend proved the model internally consistent. A full-penetration SAM can legitimately exceed current spend; the integrity check is the penetration × realised-price identity above, not a ratio of potential to actual.

##### The spend identity, solved both ways

The two readings above are one identity. Real software spend *S* equals contributing members *M*, times the share of them whose employer pays for HRMS software (π), times the realised spend per covered member-month (*P*), times 12. With *S* = ₹2,100–3,900 Cr (EV-005) and *M* = 7,37,39,204, π × *P* = ₹23.73–44.07. Fix *P*, and π follows:

| *P* — realised spend per covered member-month | Where the figure comes from | π at ₹2,100 Cr | π at ₹3,900 Cr |
| --- | --- | --- | --- |
| ₹49.00 | Qandle's annual card at 50 employees (EV-027) | 48.4% | 89.9% |
| ₹49.90 | greytHR Essential at 50 (EV-027) | 47.6% | 88.3% |
| ₹52 | greytHR realised — filed revenue ÷ claimed employee records (EV-006; r2/09) | 45.6% | 84.8% |
| ₹59.90 | Pocket HRMS's annual card at 50 (EV-027) | 39.6% | 73.6% |
| ₹64.45 | greytHR Essential billed across the fit's 20–199 establishments, seat floor included (below) | 36.8% | 68.4% |
| ₹80 | Zimyo at 50 — the bottom of the clearing band (EV-027) | 29.7% | 55.1% |
| ₹99 | HROne at 50 (EV-027) | 24.0% | 44.5% |
| ₹115 | The midpoint of our modelling band [Hypothesis] | 20.6% | 38.3% |
| ₹139.98 | Keka's live floor at 50 (EV-027) | 17.0% | 31.5% |
| ₹150 | The top of our modelling band [Hypothesis] | 15.8% | 29.4% |
| ₹199.98 | Keka's archived card at 50 (EV-027) | 11.9% | 22.0% |

(Derived: π = (*S* ÷ (*M* × 12)) ÷ *P*. The identity is whole-market — *S* includes enterprise vendors and *M* includes members of establishments above 200 — so a beachhead-only π cannot be read from it.)

Two biases move *P* in opposite directions, and neither is sized:

- **The seat floor lifts realised spend per member above the list rate.** A 30-person establishment on a 50-seat block pays greytHR's ₹2,495: ₹83.17 per member, not ₹49.90. Across the fit's beachhead — 5,25,246 establishments with 1,57,56,566 members in 20–49 billed at the block, and 1,99,127 establishments with 1,76,78,824 members in 50–199 billed at ₹2,495 plus ₹45 per additional employee — greytHR's card collects ₹64.45 per member-month (₹83.17 in 20–49, ₹47.76 in 50–199); Qandle's annual card collects ₹64.40. Wherever small establishments dominate, block-priced software collects more per member than its 50-employee rate, which lowers the π implied by any given spend. [Hypothesis — fit-based]
- **Platform users exceeding billed seats lowers measured realised price** — the downward bias already carried on the ₹52 and ₹126 anchors (EV-006; r2/09).

The seat-floor bias, computed for each block-priced card across the fit's beachhead (each card billed at its block in 20–49 and at its per-additional rate above 50):

| Entry card | Collected per member-month, 20–49 | 50–199 | Whole beachhead (*P*) | ÷ its PEPM at 50 | π at ₹2,100 Cr / ₹3,900 Cr | The whole beachhead's annual bill on this card |
| --- | --- | --- | --- | --- | --- | --- |
| Qandle, annual billing | ₹81.67 | ₹49.00 | ₹64.40 | 1.31× | 36.9% / 68.4% | ₹2,583.7 Cr |
| greytHR Essential | ₹83.17 | ₹47.76 | ₹64.45 | 1.29× | 36.8% / 68.4% | ₹2,585.8 Cr |
| Pocket HRMS Standard, annual | ₹99.84 | ₹59.94 | ₹78.74 | 1.31× | 30.1% / 56.0% | ₹3,159.4 Cr |
| Zimyo Basic | ₹133.34 | ₹80.00 | ₹105.14 | 1.31× | 22.6% / 41.9% | ₹4,218.3 Cr |
| HROne Basic | ₹165.01 | ₹99.00 | ₹130.11 | 1.31× | 18.2% / 33.9% | ₹5,220.2 Cr |
| A no-floor card at *P* | *P* | *P* | *P* | 1.00× | As the main table | Members × *P* × 12 |

(Derived on the r2/09 fit, [Hypothesis — fit-based]; the no-floor row assumes one billable seat per contributing member, the §04.2 conversion. Keka is omitted: its archived block is 100 employees, and the fit's 50–199 row cannot be split at 100.)

Two readings. First, even the cheapest card, billed to the whole fitted beachhead, would come to ₹2,584–2,586 Cr a year — more than the low end of all observed India HRMS software spend (₹2,100 Cr) for one segment alone. Half the fitted beachhead on the cheapest card is ₹1,292 Cr a year before any enterprise spend, so for the fitted beachhead to be mostly on block-priced software, real spend has to sit toward the top of its range. Second, the floor makes block-priced cards collect about 1.3× their 50-employee rate per member across the beachhead, which puts the ₹80–115 part of our modelling band in the same per-member range as the value-floor and mid-band cards (₹64–130) — so "no seat floor" at those prices is not a revenue sacrifice at the segment level, even though it is not a lower bill for most buyers above ~21–37 employees (§04.4). [Hypothesis — fit-based; our PEPM unvalidated, V-01, V-03]

How the two studies decide between the readings:

| §20 V-03 — realised vs list | §20 V-02 — status-quo distribution | Reading | What changes |
| --- | --- | --- | --- |
| Within 15% of list (V-03 pass) | Most establishments not on paid HRMS software | **Penetration** | The SAM stands as a potential; the ₹80–150 band keeps its list support; the wedge is conversion from Tally, bureau and spreadsheet (§21.2) |
| Within 15% of list | Most on paid HRMS software | Consistent only near the top of the spend range at clearing-band prices: list ≥ ₹80 puts realised *P* ≥ ₹68, and π ≥ 50% then needs π × *P* ≥ ₹34 — *S* ≥ ~₹3,009 Cr. At value-floor prices it fits anywhere in the range | Re-test the 35–65% gross-up share (EV-005) before anything else |
| 15–30% below list (V-03 marginal) | Either | **Blended** | Re-run every grid at *P* × 0.70–0.85; SOM ARR scales in proportion |
| 30–40% below list (V-03 kill) | Most on paid HRMS software | **Discounting** | Re-base the modelling band toward the ~₹50 value floor (V-03's kill criterion); R-9 fires |
| 30–40% below list | Most not on paid HRMS software | Low price *and* low penetration | Review against the whole-thesis kill conditions (§20.11) |

<!-- DIAGRAM: problem-market-spend-identity -->

- **AC-21 (the identity is stated both ways).** *(New.)* Any document that places the ₹2,100–3,900 Cr spend beside a list or modelled PEPM states the π that price implies (the table above), states both readings, and names V-02 and V-03 as the studies that decide between them. No document derives a market realised PEPM by dividing spend by members as if π were 1, and the ₹2.4–4.4 figure is rejected on sight. Test: a slide pairing "₹3,900 Cr market" with "₹115 PEPM" and no π fails; the same slide with "implies 38.3% of contributing members on paid software at that price — penetration vs discounting open (V-02, V-03)" passes.

#### SAM/SOM sensitivity — the model is a range, so show the range

Because the beachhead establishment count (`beachhead_sub20_share`) and realised PEPM are both unvalidated, the responsible presentation is a grid, not a headline. SOM ARR = (beachhead establishments) × (share) × (avg billable seats, held at 55) × (PEPM) × 12.

**Beachhead SAM (₹ Cr/yr) at full penetration — establishment count × PEPM (55 seats; the last row uses the fit's own member count):**

| Establishments ↓ / PEPM → | ₹80 | ₹115 | ₹150 |
| --- | --- | --- | --- |
| 1.8 lakh (sub-20 share ~75%) | ₹950 Cr | ₹1,366 Cr | ₹1,782 Cr |
| 2.2 lakh (~70%) | ₹1,162 Cr | ₹1,670 Cr | ₹2,178 Cr |
| 2.6 lakh (~64%) | ₹1,373 Cr | ₹1,973 Cr | ₹2,574 Cr |
| 7.24 lakh — r2/09 fit (0%; 3.34 Cr members) | ₹3,210 Cr | ₹4,614 Cr | ₹6,018 Cr |

**3-year SOM (₹ Cr ARR) at the 2.2-lakh scenario — share × PEPM (55 seats); on the fit, multiply by ~3.3 at 55 seats or ~2.8 on its own member count:**

| Share ↓ / PEPM → | ₹80 | ₹115 | ₹150 |
| --- | --- | --- | --- |
| 0.5% | ₹5.8 Cr | ₹8.3 Cr | ₹10.9 Cr |
| 1.0% | ₹11.6 Cr | ₹16.7 Cr | ₹21.8 Cr |
| 1.5% | ₹17.4 Cr | ₹25.0 Cr | ₹32.7 Cr |

Reading the grids: even the optimistic corner of a 3-yr SOM at the 2.2-lakh scenario (1.5% share, ₹150 PEPM) is **₹32.7 Cr ARR** — about half the ~₹65 Cr greytHR-calibrated bound and inside "credible for a well-executed new entrant." The pessimistic corner (0.5% share, ₹80 PEPM) is **₹5.8 Cr ARR** — survivable but thin. The spread between corners is ~5.6×, driven by the two unvalidated inputs the SOM grid varies (share and PEPM); the beachhead count is a third (AC-12), held at 2.2 lakh in that grid for legibility and worth up to ~3.3× on its own. That is the quantified reason the §20 validation programme gates funding: the model's uncertainty is not noise, it is a short list of specific studies wide.

A further variable — average billable seats, held at 55 throughout — is worth a sensitivity note even though we do not grid it. If the realised beachhead average is 40 (heavier 20–50 weighting) rather than 55, every ARR figure above scales by 40/55 ≈ 0.73×; the 1.0%/₹115 midpoint drops from ₹16.7 Cr to ~₹12.1 Cr. If it is 70 (heavier 100–200 weighting), the midpoint rises to ~₹21.2 Cr. Seat count is its own study (won-deal seat sizes, §20 V-03; the fit's mean is ~46) that the grid holds constant only for legibility.

**Which input moves the SOM most.** Swinging each input across its range while the others stay at the 1.0% / ₹115 / 55-seat / 2.2-lakh midpoint (₹16.7 Cr ARR):

| Input | Range | SOM ARR across the range | Swing | Can a study narrow it? |
| --- | --- | --- | --- | --- |
| Beachhead count (`beachhead_sub20_share`) | 1.8 lakh to 7.24 lakh (the fit) | ₹13.7 Cr to ₹55.0 Cr | 4.0× | Yes — the AC-20 route, desk, no spend |
| 3-year share | 0.5% to 1.5% | ₹8.3 Cr to ₹25.0 Cr | 3.0× | No — execution; bounded above by the ≈3.9% calibration |
| PEPM | ₹80 to ₹150 | ₹11.6 Cr to ₹21.8 Cr | 1.9× | Partly — V-01 and V-03 can kill or narrow it; our own price is §18's |
| Average billable seats | 40 to 70 | ₹12.1 Cr to ₹21.3 Cr | 1.75× | Partly — V-03's won-deal sizes, directional |

(Derived with F-06. The count row at 7.24 lakh uses 55 seats, as the grid does; on the fit's own member count it is ₹46.1 Cr.)

The widest input is the one a desk request can close. That ordering is why AC-20's EPFO route is the first market-sizing item to run, ahead of any field study.

> Why TAM is expressed as a range, not a point. Multiplying 7.66 lakh × 96.2 × ₹115 × 12 yields ~₹10,170 Cr. The product 7.66 lakh × 96.2 is simply the 7.37 crore contributing members — a legitimate aggregate — but the figure assumes every one of them is on paid software at a mid-band price, while observed spend implies ₹23.7–44.1 per member-month (above). It is arithmetically adjacent to the ₹10,126 Cr central and ₹10,905 Cr upper *modelled ceilings* and would be easy to launder into a deck. **Do not.** The honest TAM statement is: *current revealed spend ₹2,100–3,900 Cr (EV-005), modelled whole-market ceiling ₹9,013–10,905 Cr (0–10% roll-forward, ₹10,126 Cr central — r2/09), beachhead SAM ₹950–6,018 Cr across the `beachhead_sub20_share` scenarios.*

<!-- DIAGRAM: tam-sam-som -->

#### The sizing model, specified

Every sizing figure in §04.2–§04.4 comes from one model; the price comparisons have their own computation (AC-25). For the sizing figures to survive a data room, the model must be reproducible by someone who has not read this section. It is a versioned artefact, owned by Research and reviewed by Finance, holding the registers below. Changing an input makes a new version, and every published figure names the version it came from.

<!-- DIAGRAM: problem-market-sizing-lineage -->

**Inputs.**

| ID | Input | Value used | Status | Source | Re-run when |
| --- | --- | --- | --- | --- | --- |
| IN-01 | Contributing establishments (PF codes) | 7,66,254 | [Verified] | EV-001, as on 31.03.2024 | EPFO publishes its next Annual Report |
| IN-02 | Contributing members (UANs) | 7,37,39,204 | [Verified] | EPFO AR 2023-24 (r2/09) | The same |
| IN-03 | Registered establishments | 24,18,266 | [Verified] — ceiling tests only | EPFO AR 2023-24 | The same |
| IN-04 | Contributing establishments above 200 | 41,881 (plausible to 1,73,250) | [Hypothesis — modelled] | r2/09 fit; Appendix-2(v) | AC-20 is met |
| IN-05 | The fit | Pareto, x_min 20, α 1.2624; fitted members 1,57,56,566 (20–49) and 1,76,78,824 (50–199) | [Hypothesis — low confidence] | r2/09 | AC-20 is met |
| IN-06 | `beachhead_sub20_share` | 0% (fit); ~64–75% (scenarios) | [Hypothesis] | Derived (§04.3) | AC-20 is met |
| IN-07 | Average billable seats | 55 (the fit's own mean ~46) | [Hypothesis] | §20 V-03 | V-03 reports |
| IN-08 | Modelling PEPM | ₹80 / ₹115 / ₹150 | [Hypothesis] | EV-006 | V-01 or V-03 reports |
| IN-09 | 3-year SOM share | 0.5% / 1.0% / 1.5% | [Hypothesis] | This section | Bounded by IN-10 at all times |
| IN-10 | Share calibration | 30,000+ companies claimed, captured September 2026 | [Verified, dated] | EV-091, EV-016 | Every use (re-capture) |
| IN-11 | Filed revenue of the eleven entities | ₹1,374.12 Cr | [Verified] | EV-005 inputs (r2/09) | The next filing cycle |
| IN-12 | Share of spend the eleven represent | 35–65% | [Hypothesis] | r2/09 | Filings for the unmeasured vendors (r2/09 open question) |
| IN-13 | Modelled whole-market ceiling with no roll-forward | ₹9,013 Cr | [Verified arithmetic on a modelled ceiling] | r2/09 | IN-01 refreshes |
| IN-14 | Roll-forward | 0% / 6% / 10% a year for two years | [Hypothesis] | r2/09 | Retired when IN-01 refreshes |
| IN-15 | Bureau fee | ₹3,000–15,000 a month published; ₹6,000 illustrative | [Verified as a published range]; median [Hypothesis] | r2/05 | V-01 reports |
| IN-16 | `bureau_usage_share` | 100% in the headline illustration only | [Hypothesis] | — | V-02 reports |
| IN-17 | FX, for display only | ₹94.43 per USD | [Verified] | EV-089 | Each publication |
| IN-18 | Vendor entry-tier cards | The EV-027 rows | [Verified] | EV-027; the §21.4 register | Any card changes (AC-15) |
| IN-19 | Realised PEPM anchors | ₹52 (greytHR), ₹126 (PeopleStrong) | [Verified derivation, biased low] | EV-006; r2/09 | The next filing cycle |
| IN-20 | `pf_codes_per_tenant`; `seats_per_contributing_member` | Unmeasured | [Hypothesis] | §04.2 units of account | Our own tenant base exists |

**Formulas.** Every output is one of these rows and nothing else.

| ID | Output | Formula |
| --- | --- | --- |
| F-01 | Implied spend per contributing member-month | *S* ÷ (IN-02 × 12), with *S* from F-08 |
| F-02 | Implied software penetration at price *P* | F-01 ÷ *P* |
| F-03 | Beachhead establishments | (IN-01 − IN-04) × (1 − IN-06) |
| F-04 | Beachhead SAM, scenario rows | F-03 × IN-07 × IN-08 × 12 |
| F-05 | Beachhead SAM, fit row | Fitted members 20–199 (IN-05) × IN-08 × 12 |
| F-06 | 3-year SOM ARR | F-03 × IN-09 × IN-07 × IN-08 × 12 |
| F-07 | Share-calibrated bound | F-03 × (IN-10 ÷ IN-01) × IN-07 × IN-08 × 12 |
| F-08 | Real software spend | IN-11 ÷ IN-12 |
| F-09 | Modelled whole-market ceiling | IN-13 × (1 + IN-14)² |
| F-10 | Bureau pool | F-03 × IN-16 × bureau fee × 12 |
| F-11 | Unused-seat pool, 20–49 on the fit | (50 × fitted establishments 20–49 − fitted members 20–49) × vendor PEPM at 50 × 12 (§04.4) |
| F-12 | Our share of contributing establishments | PF codes counted under AC-19 ÷ IN-01 for the same year |
| F-13 | USD display | ₹ ÷ IN-17 |
| F-14 | Overcharge share on a card whose base covers *s* seats, at headcount *n* | (*s* − *n*) ÷ *s* for *n* < *s*, else 0 — a function of the block alone, never of its price (§04.4) |
| F-15 | The 20–49 band's annual bill wholly on one card | Fitted establishments 20–49 (IN-05) × the card's block price × 12 — valid only while the block is at least the band's upper bound (I-9) |
| F-16 | Upper bound on the band's share that could sit on that card | min(1, *S* ÷ F-15), with *S* from F-08 |
| F-17 | Composed annual cost lines | Software today = the AC-25 vendor bill at *n* × 12; our line = our per-head fee × *n* × 12; the bureau line is a declared fee × 12 or a labelled published band × 12, never a midpoint |

**Invariants the model enforces.**

- **I-1.** Every output carries the vintage of IN-01 — FY2023-24 until EPFO's next Annual Report.
- **I-2.** No per-account output uses the 96.2 mean (AC-11); F-04 and F-06 use IN-07.
- **I-3.** F-06's share never exceeds IN-10 ÷ IN-01 (≈3.9%) at any horizon, and a 3-year row above low-single-digit penetration is rejected (§04.2).
- **I-4.** F-04 and F-05 are labelled "full-penetration potential", never revenue and never a forecast.
- **I-5.** F-09 is a ceiling, never a target; the roll-forward is retired, not updated, when IN-01 refreshes.
- **I-6.** F-08 is shown with its 35–65% share assumption beside it, and the range never enters a contract (EV-005).
- **I-7.** Every [Hypothesis] input displays its §20 route; F-10 displays both IN-15 and IN-16 (AC-23).
- **I-8.** Arithmetic runs unrounded. Display rounds crore figures to the precision this section's tables use, and a published figure must reproduce from its inputs within that rounding.
- **I-9.** F-11 and F-15 are computable only while the card's block is at least the band's upper bound, because only then is every establishment in the band floored; below that the model returns "not computable" and never substitutes the band mean, since max(*n*, *s*) is convex in *n* and a mean-based estimate understates both figures.
- **I-10.** F-16 is published only where it is below 1; at or above 1 the output reads "not binding", and "not binding" is never restated as support for that card (AC-34).
- **I-11.** F-17's three lines are emitted together or not at all, each with its scope, and the difference between the two bureau branches is never labelled a saving (AC-35).

**Regression vectors** — a model version passes only if every row reproduces.

| # | Computation | Expected |
| --- | --- | --- |
| T-01 | IN-02 ÷ IN-01 | 96.23 |
| T-02 | IN-03 ÷ IN-01 | 3.16 |
| T-03 | α = 96.233 ÷ (96.233 − 20) | 1.2624 |
| T-04 | F-03 on the fit (IN-06 = 0) | 7,24,373 |
| T-05 | Ten points of IN-06 on the fit | 72,437 establishments |
| T-06 | IN-06 implied by the 1.8 / 2.2 / 2.6 lakh scenarios | 75.2% / 69.6% / 64.1% |
| T-07 | Fitted members 20–199 ÷ fitted establishments 20–199 | 46.16 |
| T-08 | F-08 at 65% and at 35% | ₹2,114.0 Cr and ₹3,926.1 Cr — published rounded as ₹2,100–3,900 Cr |
| T-09 | F-01 at ₹2,100 Cr and ₹3,900 Cr | ₹23.73 and ₹44.07 |
| T-10 | F-13 at ₹2,100 Cr and ₹3,900 Cr | USD 222.4 Mn and USD 413.0 Mn |
| T-11 | F-09 at 0% / 6% / 10% | ₹9,013 Cr / ₹10,127 Cr / ₹10,906 Cr from the rounded base; r2/09 publishes ₹10,126 Cr and ₹10,905 Cr from its unrounded base, so the vector passes within ₹1 Cr |
| T-12 | F-04 at 2.2 lakh × 55 × ₹115 × 12 | ₹1,669.8 Cr |
| T-13 | F-04 at 1.8 lakh × 55 × ₹80 × 12 | ₹950.4 Cr |
| T-14 | F-05 at ₹80 / ₹115 / ₹150 | ₹3,209.8 Cr / ₹4,614.1 Cr / ₹6,018.4 Cr |
| T-15 | F-06 at 2.2 lakh: 0.5% at ₹80; 1.0% at ₹115; 1.5% at ₹150 | ₹5.81 Cr / ₹16.70 Cr / ₹32.67 Cr |
| T-16 | F-07 at 2.2 lakh and ₹115 | 8,613 establishments; ₹65.4 Cr |
| T-17 | F-07 on the fit at ₹115 | 28,360 establishments; ₹215.3 Cr |
| T-18 | F-10 at 2.2 lakh, ₹6,000 a month, 100% usage | ₹1,584 Cr |
| T-19 | F-11 unused seats | 1,05,05,734 — 40.0% of the seats billed |
| T-20 | F-02 at ₹115 | 20.6% and 38.3% |
| T-21 | F-14 at *s* = 50 and *n* = 20; at *s* = 25 and *n* = 20; at *s* = 100 and *n* = 50 | 60% · 20% · 50% |
| T-22 | F-15 on greytHR Essential's ₹2,495 block | ₹1,572.59 Cr — displayed ₹1,572.6 Cr |
| T-23 | F-15 on Keka's ₹6,999 live floor | ₹4,411.44 Cr |
| T-24 | F-16 on Keka's floor at ₹2,100 Cr and at ₹3,900 Cr | 47.61% and 88.41% |
| T-25 | F-16 on greytHR Essential at ₹2,100 Cr | 1.34 — published as "not binding", never as 134% |
| T-26 | F-17 at *n* = 30 on greytHR Essential, our card at ₹115 | ₹29,940 software today · ₹41,400 our line · ₹36,000–96,000 filing labour as a labelled band |
| T-27 | F-11 or F-15 with a 25-seat block against the 20–49 band | "not computable" — never a figure (I-9) |

**Negative cases** — inputs and moves the model refuses, with the reason it gives.

| # | Input or move | Refused because |
| --- | --- | --- |
| N-01 | 24,18,266 registered establishments as a denominator | Two-thirds dormant — [Killed as denominator] (§04.2) |
| N-02 | 5.31 crore Udyam registrations, or "63 million MSMEs" | Not employers with payroll obligations (EV-K01) |
| N-03 | "$23.32bn India HR tech" | A mislabelled global figure (EV-K04) |
| N-04 | Any per-account figure built on the 96.2 mean | Skew laundering (AC-11) |
| N-05 | 41,881 labelled [Verified], or cited as an EPFO table | A model output (§04.2 [Reversed]; EV-K10) |
| N-06 | greytHR "34,000" or "4.4%" without a capture date | A moved vendor claim (K-16; EV-K27) |
| N-07 | ₹12,250 Cr as the 10% ceiling | An arithmetic slip; the figure is ₹10,905 Cr (EV-K11) |
| N-08 | ₹2.4–4.4 per member-month | A tenfold slip; the figure is ₹23.7–44.1 (§04.3) |
| N-09 | Keka "₹99 realised PEPM" | Circular — it assumes the list tier it claims to derive (r2/09) |
| N-10 | Any single-figure price ceiling | Two anchors (K-09; EV-K20) |
| N-11 | A SOM share above the ≈3.9% calibration | Out-penetrates the HRMS-job incumbent from a standing start (I-3) |
| N-12 | Aggregator revenue or ARR figures (Latka, Growjo, Owler) | Wrong on three of three checkable vendors (r2/09) |
| N-13 | A free ratio panel used for a magnitude | Internally inconsistent; direction only (r2/09) |
| N-14 | Ramco's HR & Payroll revenue added to the eleven | Its India HR revenue is not separable (EV-033; §04.4 scoreboard membership rules) |
| N-15 | A USD conversion at ₹83.3 | A banned rate (§20.4); use IN-17 |
| N-16 | Tally's "2.5+ million businesses worldwide" (r2/05) divided by, or set beside, 7,66,254 | A worldwide count of accounting customers — a different unit and scope; Tally payroll adoption is unknown (V-02) |
| N-17 | ESIC's 20,83,340 employers, or the Economic Census's 5.85 crore establishments, as a denominator | Registered or enumerated units, not contributing payroll employers (§04.2 table) |
| N-18 | EPFO's 32.56 crore member accounts as an employee base | Cumulative accounts with a balance — 4.4× the contributing members (r2/09) |
| N-19 | F-15 presented as the band's spend, or as a market | A counterfactual on one card, on a low-confidence fit (AC-34) |
| N-20 | An F-16 result at or above 1 restated as "most of the band is on this card" | The bound is one-directional: not excluded is not supported (I-10) |
| N-21 | The difference between F-17's two bureau branches, stated as our saving | Whether a bureau engagement changes is the buyer's decision and is untested (AC-35; V-01, V-02, V-05) |
| N-22 | F-11 or F-15 approximated from the band mean when the block is below the band's upper bound | max(*n*, *s*) is convex in *n*; the shortcut understates both, and the fit's two totals do not give the count below the new block (I-9) |
| N-23 | The enterprise-adjusted band bound, computed by removing the three enterprise-weighted filers from the numerator | IN-12's share band is defined over the whole filed set; the figure is not computable until IN-12 is re-derived over the restricted set (AC-34) |

**Data-handling rules for the filed inputs.** The eleven filings are not uniform. The model records each irregularity instead of smoothing it:

| Irregularity | Case | Rule |
| --- | --- | --- |
| Year mismatch | Akrivia's latest filing is FY24; FY25 is not yet filed (r2/09) | Carried at its latest filed year inside the FY25 sum, flagged; replaced when filed |
| Standalone versus consolidated | Darwinbox's ₹533.87 Cr is standalone (r2/09) | Used as filed; no derate — the 63%-of-new-sales derate is withdrawn (r2/09) |
| Non-India revenue inside the figure | greytHR (GCC business); Darwinbox | Used as filed; the direction of the bias is stated beside IN-12 |
| Non-HRMS revenue inside the entity | Sage Software Solutions distributes Sage ERP alongside Pocket HRMS (r2/09) | Used as filed and flagged; if an HRMS-only figure is ever published, it replaces the entity figure |
| Revenue inside an acquirer | Qandle within MYND (EV-034) | Excluded — not extractable (r2/09) |
| Two growth rates for one filing | Darwinbox +36% or +50%, a base-year discrepancy (r2/09) | Both carried; neither used in a computation |
| Two customer counts on one day | Keka "12,500+" and "10,000+" on live pages, 5 September 2026 (r5/03) | Both carried as a range; any per-customer figure shows both |
| Units | Ramco reports ₹ Mn | Divided by 10 for ₹ Cr, with the reported figure kept beside the conversion |

- **AC-22 (the model is reproducible).** *(New.)* The sizing model is a versioned artefact holding the input, formula and data-handling registers above. Each published §04 figure names its model version; the version reproduces T-01–T-27 within display rounding and refuses N-01–N-23 with the stated reason; and any input's refresh trigger produces a new version with every dependent figure restated in the same change. A figure that cannot be traced to a formula row is withdrawn.

**Named scenarios.** A figure names its scenario, never just "the beachhead":

| Scenario | IN-06 (`beachhead_sub20_share`) | Beachhead establishments | Seats basis | Used in |
| --- | --- | --- | --- | --- |
| SC-FIT | 0% | 7,24,373 | The fit's own members (3,34,35,390) for SAM; 55 for SOM | The fit rows of the SAM grid; the ~3.3× SOM multiplier |
| SC-2.6 | ~64% | 2.6 lakh | 55 | The SAM grid |
| SC-2.2 | ~70% | 2.2 lakh | 55 | The SAM and SOM grids; the bureau pool; the capture bridge |
| SC-1.8 | ~75% | 1.8 lakh | 55 | The SAM grid |
| SC-50UP | — (the R-1 case: 20–49 zero-priced) | 1,99,127 on the fit | The fit's 50–199 members | §04.4, the R-1 re-run |
| SC-MEASURED | Measured (AC-20) | The measured count | 55 until V-03 narrows it; our own base once measured | Every base case, once AC-20 is met — SC-1.8 to SC-2.6 are then retired |

**The published-figure record.** Every figure that leaves the model — into this PRD, a deck, a data room or collateral — is a record, and the record decides where it may go.

| Field | Content |
| --- | --- |
| `figure_id` | Stable across restatements |
| `value` | A point or a range, in `unit` |
| `unit` | ₹ Cr a year; establishments (PF codes); members; per cent; ₹ per member-month |
| `label` | measured · scenario · potential · ceiling · counterfactual ceiling · directional |
| `scenario` | One of SC-FIT, SC-2.6, SC-2.2, SC-1.8, SC-50UP, SC-MEASURED, or none |
| `formula_id` | F-01 to F-17 |
| `inputs` | The IN-IDs used, each with its state at publication (§04.5) |
| `model_version` | The version that produced it |
| `denominator_vintage` | For example "EPFO FY2023-24" |
| `routes` | The §20 items or acceptance criteria that could change it |
| `external_use` | Derived: allowed only when no input is UNMEASURED or STALE and every SCENARIO input is named in the figure's own text |
| `published_in` | Every place the figure appears, so a restatement reaches all of them |

A `figure_id` reads identically wherever it is published, and a restatement updates every `published_in` location in the same change (AC-22).

One record, filled in — the SAM midpoint:

| Field | Value |
| --- | --- |
| `figure_id` | SAM-SC22-115 |
| `value`, `unit` | 1,669.8 (displayed ₹1,670 Cr); ₹ Cr a year |
| `label`, `scenario` | potential; SC-2.2 |
| `formula_id` | F-04 |
| `inputs` | IN-01 (MEASURED), IN-04 (SCENARIO), IN-06 (SCENARIO), IN-07 (SCENARIO), IN-08 (SCENARIO) |
| `denominator_vintage` | EPFO FY2023-24 |
| `routes` | AC-20; V-03; V-01 |
| `external_use` | Allowed only with "2.2-lakh scenario", "₹115 modelling midpoint" and "full-penetration potential" in the figure's own text — four SCENARIO inputs, none UNMEASURED or STALE |
| `published_in` | §04.3 — the SAM worked example, the SAM grid and the bureau pool's strategic read; the tam-sam-som figure; MC-08 (§04.5) |

**Who consumes the model's figures.** Other sections carry §04 figures; the list says which must be restated when an input moves.

| §04 figure | Carried in | Restated when |
| --- | --- | --- |
| 7,66,254 contributing establishments; 3.16× registered-to-contributing | §01, §05.16, §18.12 (scale-realism check), §19.13 (anti-metrics), §21.2 | IN-01 refreshes (RF-6) |
| greytHR's ≈3.9% calibration | §05.16, §18.12, §21.2 | IN-10 is re-captured |
| Fitted band counts; `beachhead_sub20_share` | §05.16; §05.1 (the ACV table's notes) | AC-20 is met |
| The two price anchors; the ₹80–150 modelling band | §05.1, §13.19, §18.3 | A card changes; V-01 or V-03 reports |
| ₹2,100–3,900 Cr real spend | §01; §02 (EV-005) | The next filing cycle |
| The seat-floor arithmetic at 20 and 50 employees | §18.2 P6; §21.4 | A card changes (R-39, R-40) |
| The bureau anchors | §18.1 | V-01 reports |

**What the model and its uses need from other sections.** The dependencies run the other way too; a change in any of these is a refresh trigger for the figures named.

| Needed from | What | Used by |
| --- | --- | --- |
| §21.4 | The rate-card register, with capture dates and methods | IN-18; AC-25's computation; the unused-seat pool; the burden statement |
| §21.12 | The clearance rule and its approved sentence forms; `competitor_claim_max_capture_age_days` | AC-17, AC-25, AC-33; the market-claim forms |
| §22.7 | The filing-instance counting rule | The burden statement; the capture bridge's filing volume |
| §05.11; §05.21 | The commercial band's definition; the admission rules | Units of account (U-12, U-13); qualification (Q-2) |
| §06.1 | Obligation applicability with counting unit and sphere | The burden statement; qualification (AC-29) |
| §08 FR-PAY-711 | The filing state machine's FILED and REJECTED states | The share numerator (AC-19) |
| §14 `Registration` | PF codes as held, ingested as issued | Units of account; IN-20 |
| §19.7 | Funnel attribution | The trigger recorded at qualification |
| §20.6; §20.13 | Study protocols with pre-registered thresholds; the parameter families | Study records (AC-31); every named parameter's route |
| §02 | The EV rows this section cites | Every [Verified] figure |

#### The bureau/CA spend pool (the displaceable adjacency)

Separate from software spend is the money paid to bureaus and CAs — the budget line the product actually displaces at the point of sale.

- Published anchor: indicative **₹3,000–15,000/month** per employer across the 11–100-employee bands (IndiaFilings, r2/05); the realised price is unvalidated (§20 V-01).
- Illustrative pool: 2.2 lakh beachhead establishments × an assumed ₹6,000/month × 12 = **~₹1,580 Cr/yr** [Hypothesis]. ₹6,000 is a point inside the published range, not a measured median (the median is unknown — V-01), and the figure assumes *every* beachhead employer uses a bureau; scale it by the bureau-usage share (V-02) and by the beachhead count (AC-12).
- This pool is *not additive* to the software SAM in a naive way — winning a customer often means **converting bureau spend into software spend** (the CA becomes a channel or a displaced incumbent, §18.7). It is best read as evidence that the willingness-to-pay exists and is already being spent monthly.

The strategic read: the bureau pool (~₹1,580 Cr [Hypothesis]) and the beachhead software SAM (~₹1,670 Cr), both at the 2.2-lakh scenario, are the *same order of magnitude*, which is the point. The buyer is already spending PEPM-equivalent money — just to a person, not a platform. The product does not need to create budget; it needs to redirect an existing monthly line item and give the buyer visibility the retainer never did. That is a fundamentally easier sale than "adopt a new cost category," and it is why the bureau is a price anchor rather than a competitor (§18.1).

> [Hypothesis] The bureau pool is anchored on one provider's published indicative price *range* but an unverified *volume* (how many beachhead employers use a bureau vs. Tally-plus-in-house vs. a rival SaaS).
> **Kill criterion:** the same mystery-shop + Tally-payroll-adoption study (§20 V-01, V-02). If bureau usage in the beachhead is below ~30%, the "displace the bureau" wedge weakens relative to "displace Tally/spreadsheet."

##### The pool as a two-parameter grid

The ~₹1,580 Cr illustration fixes both unknowns — the fee at ₹6,000 and bureau usage at 100% — and so says less than it appears to. Stated as F-10 (the sizing model above) across both, at the 2.2-lakh scenario, in ₹ Cr a year:

| Median all-in fee ↓ / bureau usage → | 30% | 50% | 100% |
| --- | --- | --- | --- |
| ₹2,000 — V-01's kill line at 50 employees | ₹158 Cr | ₹264 Cr | ₹528 Cr |
| ₹3,000 — the bottom of the 11–50 band | ₹238 Cr | ₹396 Cr | ₹792 Cr |
| ₹6,000 — the illustration | ₹475 Cr | ₹792 Cr | ₹1,584 Cr |
| ₹8,000 — the top of the 11–50 band | ₹634 Cr | ₹1,056 Cr | ₹2,112 Cr |
| ₹15,000 — the top of the 51–100 band | ₹1,188 Cr | ₹1,980 Cr | ₹3,960 Cr |

(Derived: 2,20,000 × usage × fee × 12. On the fit's 7,24,373 establishments, multiply by ~3.29. The ₹2,000 row is V-01's threshold, not a price in the published bands.)

Read against the software SAM at the same scenario (₹1,162–2,178 Cr), the pool reaches the bottom of that range only at a ₹6,000 median fee with ~73% bureau usage or more, at ₹8,000 with ~55% or more, or at ₹15,000 with ~29% or more; at ₹3,000 or below it never does. The strategic read above ("the same order of magnitude") therefore holds only in those cells. Elsewhere the pool is a fraction of the software SAM, and "redirect an existing line item" weakens in proportion. The two studies decide which cell is real:

| V-01 result, as pre-registered (§20.6) | V-02 — bureau usage in the beachhead | Read | Consequence |
| --- | --- | --- | --- |
| Pass — at least 6 of 8 bureaus quote ₹2,500 a month or more at 50 employees, filing included | ~30% or more | The pool is real and displaceable | "Redirect the retainer" leads (§18.1); the CA channel is the route (§18.7, V-05) |
| Pass | Below ~30% | A high price paid by few | Lead with displacing Tally and spreadsheets (the kill criterion above); the bureau stays a price anchor, not a pool |
| Marginal — quotes straddle ₹2,000 with wide variance by city tier | Any | Filing labour priced near the value floor in some cities and not others | Re-run the §18 card against the per-head bureau figures (§04.1 Pain 3 worked example) per city tier before launch pricing is set |
| Kill — credible all-in quotes with filing under ₹2,000 at 50 employees (one credible ₹1,500 quote suffices — §20.6) | Any | Filing labour cheaper than the cheapest software card | Re-anchor pricing before any funding decision (§04.1 Pain 3 kill criterion; §18) |

V-01 is directional falsification on six to eight quotes, not an estimate (§20.6, sample honesty): it can kill the grid's upper rows or narrow the scenario, but it cannot supply the market median the grid's left axis names. The median stays a SCENARIO parameter after V-01 reports (§04.5, market parameters as governed state).

- **AC-23 (the pool is shown with both parameters).** *(New.)* The bureau pool is never shown as a single figure without its fee and usage assumptions beside it; a single figure appears only as one labelled cell of the grid above. Test: a slide reading "₹1,580 Cr bureau market" fails; "₹1,584 Cr at a ₹6,000 median fee and 100% bureau usage, both unvalidated (V-01, V-02)" passes.

#### The capture bridge — what the SOM corners mean in accounts, seats and scale

The r5 CFO review asked what winning looks like on the numbers this section already holds (r5/00-review-cfo). The bridge composes them; it adds no input.

| 3-year SOM corner, 2.2-lakh scenario | Paying establishments | Billable seats (× 55) | ARR at ₹80 | ARR at ₹115 | ARR at ₹150 |
| --- | --- | --- | --- | --- | --- |
| 0.5% | 1,100 | 60,500 | ₹5.8 Cr | ₹8.3 Cr | ₹10.9 Cr |
| 1.0% | 2,200 | 1,21,000 | ₹11.6 Cr | ₹16.7 Cr | ₹21.8 Cr |
| 1.5% | 3,300 | 1,81,500 | ₹17.4 Cr | ₹25.0 Cr | ₹32.7 Cr |
| ≈3.9% calibration bound | ≈8,600 | ≈4,74,000 | — | ≈₹65 Cr | — |

("Paying establishments" are PF codes (§04.2, units of account). Tenants are fewer by `pf_codes_per_tenant`, which is unmeasured until our own base exists.)

Six calibrations against the filed record and the rest of this PRD (entity-level filed revenue from the §04.4 scoreboard; no evaluative reading of any vendor is intended):

- **Scale.** The 3-year SOM range, ₹5.8–32.7 Cr ARR, spans the filed revenue of the five smallest entities on the scoreboard — Kredily ₹3.82 Cr, Zimyo ₹9.42 Cr, Pocket HRMS's entity ₹12.84 Cr, factoHR ₹25.76 Cr, Akrivia ₹30.67 Cr (FY24). Three well-executed years put the entrant in that group, not beside greytHR (₹125.22 Cr) or Keka (₹133.86 Cr).
- **Revenue per account.** The modelled account — 55 seats at ₹80–150 — is ₹52,800–99,000 a year (₹75,900 at ₹115). Filed revenue per claimed customer, where the counts are dated marketing claims and "N+" makes each quotient an upper bound: greytHR ₹62,610 on "20,000+ paying businesses" (₹41,740 on "30,000+ companies"); Keka ₹1,07,088 on "12,500+" or ₹1,33,860 on "10,000+", both live on 5 September 2026 (r2/09; r5/03). The modelled account sits between those two, and two orders of magnitude below the enterprise group (§04.4, scoreboard membership rules).
- **Break-even.** The only fully published FY25 P&L in the set is ZingHR's: ₹1 Cr profit on ₹150 Cr of revenue, a 0.80% EBITDA margin (r2/09). The SOM range is 4–22% of that revenue. One data point is not a law; it says the 3-year SOM is not a scale at which the filed record shows any vendor in profit.
- **Value reference.** The only India HRMS transaction multiple recoverable from public sources is PeopleStrong's — about ₹1,200 Cr for a majority stake on ₹301.99 Cr of FY25 revenue, 4.0× revenue, for an enterprise-weighted asset growing 10% (r2/09; trade-press corroborated, transaction documents not read). Applied mechanically to the SOM range it gives ₹23–131 Cr. It is a reference for the order of magnitude of the outcome, not a valuation: any funding case belongs to §18 and §20.7 and must argue for any multiple above it (r2/09).
- **Operating scale.** The India-focused vendors in the filed set cluster at ₹13–16 lakh of revenue per employee (greytHR 16.2, Keka 14.2, HROne 13.4 — r2/09). At that cluster the ₹16.7 Cr midpoint corresponds to roughly 104–128 staff, the ₹5.8 Cr corner to about 36–45 and the ₹32.7 Cr corner to about 204–252. This bounds the burn a 3-year SOM can carry; whether an architecture can beat the cluster is a thesis for §13 and §22.10 to state and measure, not an input here.
- **Filing volume.** The SOM counts PF codes, and each PF code files 12 ECRs a year (§22.7's counting rule), so the 1.0% corner carries at least 26,400 ECR instances a year — 13,200 at 0.5%, 39,600 at 1.5% — before ESI, Form 138 and state returns, whose counts depend on the ESIC codes, TANs and state registrations behind each code. Minutes per instance are unmeasured (V-26), so this sizes the desk's queue, not its cost (§22.7).

### 04.4 Competitive landscape

The competitive question is not "who is biggest" — it is **where does a filing-first entrant have room**. That requires separating the field by *what they actually do at the price the beachhead pays*, and by *which segment they defend*. §21 holds the full parity tables and capture log; this section keeps only what the sizing and the wedge depend on. Unless stated otherwise, competitor facts below were captured from vendor pages, product documentation, source code or filed accounts in September 2026 (Keka's withdrawn card is a dated archive, EV-022); **no competitor product was executed** — every capability statement is read, not tested.

#### The field, grouped by threat type

| Group | Players | What they are | Threat to the beachhead |
| --- | --- | --- | --- |
| **Two incumbents, two jobs (K-23)** | TallyPrime; greytHR | Tally ships the statutory artefacts — PF Forms 3A/5/6A/10/12A + ECR, ESI 3/5/6, PT statement, Form 16, 24Q annexures, 12BA, 27A — but no state PT slab table, no LWF engine and no leave module; payroll comes inside the licence (Silver single-PC; multi-user at Gold, 3× the price) (EV-032). greytHR claims 30,000+ companies (September 2026 capture, EV-091), publishes a full card (Essential ₹2,495/month including 50 employees + ₹45 per additional — EV-027, r5/03) and uses generation-only statutory language (EV-030). | **Highest.** Tally holds the accounting relationship and the artefacts, but its payroll *adoption* is unknown (V-02); greytHR holds the HRMS job at the value floor. Beaten on multi-state PT/LWF (Tally), no seat floor (greytHR, EV-026) and attended submission (both) — not on computation. |
| **Zero-priced computation** | Kredily; Zoho Payroll (₹0 to 10 emp), Zoho People (₹0 to 5 users, Zia AI at ₹48); Frappe HR (OSS) | Kredily and Zoho give away computation and charge for outputs — bank payout files, PF/ESI challans, the annual tax certificate, Form 124 (ex-12BB) (EV-029). Frappe HR v16 ships gross-to-net salary structures, arrears, leave and a PWA, but no Indian statutory artefact and no state dimension (EV-031). | **High and structural.** Sets the price of computation at zero. Assume Zoho widens its free gates from 10 toward 25/50 (§18; §20 R-1). Investment-declaration + bank payouts, once our "P0 differentiator," are table stakes here [Killed as differentiator]. Against Frappe the bake-off will not be won on gross-to-net (EV-031). |
| **The priced mid-market set** | Qandle (MYND since April 2025 — EV-034), Pocket HRMS, Zimyo, HROne, Keka; also factoHR, RazorpayX Payroll | Entry-tier PEPM at 50 employees from ₹49.00 (Qandle, annual) to ₹139.98–199.98 (Keka); all six priced vendors, greytHR included, bill a 50-employee minimum block (Keka's historical block: 100) (EV-026, EV-027). Payroll sits in every entry tier (EV-028). | **High.** The 50–200 sub-band is served cheaply; the 20–50 sub-band pays for 50 seats — ₹122.50–349.95 effective PEPM at 20 employees (EV-027). Keka suppresses its live card (EV-021, EV-024). None claims to submit a filing (EV-030). |
| **Enterprise suites and adjacency** | Darwinbox, PeopleStrong; ZingHR and Ramco as enterprise adjacency (EV-033) | Full-suite, sales-led, enterprise procurement. ZingHR and Ramco publish no price and are kept out of the competitive set (EV-033). | **Low at launch, rising on expansion.** PeopleStrong ₹301.99 Cr FY25, valued ₹1,200 Cr (4.0× revenue — the only recoverable India HRMS multiple, r2/09). Enterprise is arithmetically closed for ~3 years (§01, §05.2). |
| **Not competitors (channel / anchor / adjacency)** | CAs & payroll bureaus; eSSL/ZKTeco device vendors; Aparajitha/Simpliance | Bureaus = channel + price anchor. Device vendors = partners (eSSL names six HRMS integration partners on its own site — r2/04). Aparajitha = a labour-compliance services organisation (1,500+ staff across 25 states, per its own release) that holds 76% of Simpliance, acquired at an enterprise value of ₹120 crore (r2/07); no AI/ML claim found on its own surfaces (r2/07). | Not to be displaced; to be integrated or partnered with (§09.3, §16.4, §18.7). |

#### Filed-revenue scoreboard (the only honest scale metric)

Analyst rankings are unusable; filed accounts are not. These are the eleven filed HRMS entities behind the ₹1,374 Cr aggregate (EV-005), ordered by revenue, plus Ramco as a calibration row outside the sum. Revenue is operating revenue as filed; growth is year-on-year; "not published" means no figure is available from a source the research accepted — free ratio panels are never used for a magnitude, and are cited for direction only where r2/09 does so (r2/09).

| Vendor (entity) | Latest filed revenue | Profitability | Position vs. our beachhead |
| --- | --- | --- | --- |
| Darwinbox (Darwinbox Digital Solutions Pvt Ltd) | ₹533.87 Cr FY25, standalone; growth reported as +36% or +50% by two sources reading the same filing — an FY24 base-year discrepancy (r2/09) | Statutory net result not disclosed; only adjusted figures published (r2/09) | Enterprise, sales-led; share of revenue from India not disclosed |
| PeopleStrong | ₹301.99 Cr FY25 (+10%) | Not published — a free ratio panel indicates a loss, direction only, and the panel is internally inconsistent (r2/09); majority stake acquired at ~₹1,200 Cr, 4.0× revenue (r2/09) | Above us — enterprise/mid-market |
| ZingHR | ₹150 Cr FY25 (+21%) | +₹1 Cr (0.80% EBITDA) — the only fully published FY25 P&L in the set (r2/09) | Enterprise adjacency, outside the competitive set (EV-033) |
| Keka | ₹133.86 Cr FY25 (+55%) | −₹80 Cr on ₹78 Cr FY24 revenue; staff cost 137% of FY24 revenue; FY25 result not published (r2/09) | In our beachhead at the top of the price range (EV-027) |
| greytHR (Greytip Software Pvt Ltd) | ₹125.22 Cr FY25 (+29%); includes GCC revenue (r2/09) | Not published (r2/09) | The HRMS-job incumbent (K-23) at the value floor (EV-027) |
| HROne (Uneecops Workplace Solutions Pvt Ltd) | ₹46.67 Cr FY25 (+50%) | Not published (r2/09) | Priced mid-market set (EV-027) |
| Akrivia | ₹30.67 Cr FY24 (+20%); FY25 not yet filed (r2/09) | Not published | Mid-market |
| factoHR (Version Systems Pvt Ltd) | ₹25.76 Cr FY25 (+12%) | Not published | Beachhead-adjacent |
| Pocket HRMS (Sage Software Solutions Pvt Ltd) | ₹12.84 Cr FY25 (−25%); the entity also distributes Sage ERP, so the figure is not Pocket HRMS alone (r2/09) | Not published | Priced mid-market set (EV-027) |
| Zimyo | ₹9.42 Cr FY25 (+52%) | Not published | Priced mid-market set (EV-027) |
| Kredily (PeopleProsper Technologies Pvt Ltd) | ₹3.82 Cr FY25 (+38%) | Not published | Zero-priced computation (EV-029) |
| **Sum of the eleven** | **₹1,374.12 Cr** | — | The verified floor of EV-005's ₹2,100–3,900 Cr gross-up |
| Ramco (calibration row, not in the sum) | HR & Payroll BU ₹297.6 Cr FY2025-26 (+30.8%), consolidated across geographies; India revenue across *all* BUs ₹133.0 Cr; standalone Indian entity's India geography ₹112.8 Cr (EV-033, EV-092) | Single Ind AS 108 segment — India HR revenue is not separable; it is bounded above by ₹133.0 Cr (tighter: ₹112.8 Cr) | Enterprise adjacency, outside the competitive set (EV-033) |

(Source: MCA/ROC filings — the EV-005 inputs (§02), entity-level detail per r2/09; Ramco from its audited FY2025-26 annual report (r5/03, EV-092). All revenue figures [Verified]; Ramco's rupee-crore figures are conversions of its reported ₹ Mn. The ordering is by filed revenue, which is not India-only revenue for Darwinbox, greytHR or Ramco.)

Two reads: (1) **profitability is mostly not public** — only ZingHR has a fully published FY25 P&L (₹1 Cr profit on ₹150 Cr); Keka reported an ₹80 Cr loss in FY24 and 55% revenue growth in FY25, with its FY25 result unpublished; Darwinbox publishes only adjusted figures; for most of the set no profit figure exists (r2/09). (2) **Keka's pricing is no longer a gap**: its live card is suppressed but the rates were recovered by raw-HTML fetch (EV-021–025) — the v0.3 "TLS-blocked, unverified" status is [Reversed]. The HRMS-job incumbent is greytHR, not Keka (K-23), even though Keka's filed revenue is slightly higher: the incumbency is about customer count and the value-floor price, not revenue rank.

A third read that changes strategy: the cost that decides margin here is not feature velocity but keeping state PT/LWF, the ECR and Form 138 current — work Frappe HR and TallyPrime do not do (EV-031, EV-032) and which the compliance data pipeline (§22) and the supervised-filing cost line (EV-088, §13) must size. Keka's FY24 staff cost (137% of revenue) is one company's figure, not a market norm. The scoreboard supports competing on **maintained rules and attended submission**, not on out-spending anyone on features.

##### Scoreboard membership rules, and what the Ramco row calibrates

The scoreboard has three kinds of row, and a figure's kind decides where it may be used. The tests below are the ones the research applied (r2/09; r5/03), stated so that the next filing cycle applies them the same way.

| Row kind | Test | Rows today | May be used for |
| --- | --- | --- | --- |
| In the sum | Filed operating revenue, read from an MCA/ROC filing or an audited annual report, for an entity selling HR software in India whose figure is not a business-unit slice of a multi-unit, multi-geography filer; irregularities recorded under the §04.3 data-handling rules | The eleven (₹1,374.12 Cr) | IN-11 and the gross-up (EV-005) |
| Calibration row | Filed and audited, but HR revenue is reported only as a global business unit with no India split | Ramco — a single Ind AS 108 segment; business-unit and geography splits are voluntary and not cross-tabulated (EV-033; r5/03) | Bounds and ratios; never added to the sum (N-14) |
| Excluded | No filed figure, or revenue not extractable from a parent's filing | SAP SuccessFactors, Oracle, Workday, Zoho People — unmeasured (r2/09); Qandle within MYND (r2/09; EV-034) | Nothing numeric; their spend is what the 35–65% share band (IN-12) stands in for |

Membership of the sum and membership of the competitive set are separate tests: ZingHR is in the sum and outside the competitive set (EV-033); Ramco is in neither; MYND/Qandle is on the competitive map (EV-034) and outside the sum.

<!-- DIAGRAM: problem-market-scoreboard-membership -->

What the Ramco row calibrates:

| Check | Arithmetic | Reading |
| --- | --- | --- |
| How far could excluding Ramco move the sum? | India revenue across all business units, ₹133.0 Cr (EV-092), is 9.7% of ₹1,374.12 Cr; the standalone entity's India geography, ₹112.8 Cr, is 8.2% | An upper bound — Ramco's India HR revenue is an unknown part of either figure |
| How far could it move the gross-up? | ₹133.0 Cr is 6.3% of ₹2,100 Cr and 3.4% of ₹3,900 Cr (₹112.8 Cr: 5.4% and 2.9%) | Inside the uncertainty the 35–65% share band already carries; the exclusion neither makes nor breaks the range |
| Does Ramco sell to the beachhead? | HR & Payroll revenue of ₹297.6 Cr (EV-033) over "500+ payroll customers globally" (r5/03): at most ₹59.5 lakh per customer a year | The enterprise signature, alongside Darwinbox (at most ₹52.5 lakh on "1,016+" customers — standalone revenue over a global count), PeopleStrong (at most ₹60.4 lakh on "500+ Enterprises") and ZingHR (at most ₹12.5 lakh on "1200+"); against greytHR at ₹62,610 and Keka at ₹1,07,088–1,33,860 (r2/09; r5/03) |
| Does its growth change the picture? | HR & Payroll +30.8% in rupees, ₹2,275.45 Mn to ₹2,976.15 Mn (r5/03) | Inside the eleven's filed range of −25% to +55% |

(Per-customer figures divide filed revenue by each vendor's own dated customer claim; "N+" makes each an upper bound, and the claims are marketing counts, not audited ones (§21.12 CLR-09). Claims used: greytHR "20,000+ paying businesses in India and GCC countries" (About page, r2/09); Keka "12,500+" and "10,000+" (live pages, 5 Sep 2026, r5/03); ZingHR "1200+" (5 Sep 2026, r5/03); Darwinbox "1,016+ enterprise customers globally" and PeopleStrong "500+ Enterprises" (r2/09); Ramco "500+ payroll customers" (FY2025-26 annual report, r5/03).)

The next pulls, and the row kind each is expected to take before it is read. The research names three entities obtainable by the same CIN method that resolved factoHR, Akrivia and Sage in one query each: Ramco is listed and files segment data; Zoho and MYND Integrated Solutions file with the MCA (r2/09).

| Entity | What its filing will contain | Expected row kind | What would change the expectation |
| --- | --- | --- | --- |
| Akrivia, FY25 | Its first FY25 filing | In the sum — replaces the FY24 figure | — |
| Zoho | One company's revenue across many products, of which Zoho People and Zoho Payroll are two | Calibration row — HR revenue not separable | A disclosed HR or payroll revenue line |
| MYND Integrated Solutions | An outsourcing group's revenue, with Qandle inside it (EV-034) | Excluded, or a calibration row — Qandle's revenue not extractable (r2/09) | A disclosed Qandle or HR-platform revenue line |
| Ramco, FY2026-27 | The next audited report | Calibration row, as now | An India split of HR & Payroll revenue |

Recording the expectation before the pull means a filing cannot be argued into the sum after its size is seen. Each pull that lands narrows IN-12 (§04.5, evidence classes) whatever its row kind.

- **AC-26 (scoreboard membership).** *(New.)* A filed figure enters IN-11 only under the "in the sum" test; a calibration row is shown beneath the sum, never inside it; an entity's membership of the sum is recorded separately from its membership of the competitive set; and every re-pull of the filings re-applies the three tests before the sum is restated. Test: adding Ramco's ₹297.6 Cr to the sum fails (N-14); removing ZingHR from the sum because it is outside the competitive set fails.

#### Beachhead rival profiles — the priced set the buyer compares

The priced vendors built for 20–500 are where deals are won and lost. What is known, and what is not (captures September 2026 unless dated otherwise; pages read, products not executed):

- **greytHR** — the HRMS-job incumbent (K-23). Claims 30,000+ companies (September 2026 capture, EV-091; ≈3.9% of contributing establishments, a marketing claim over a government count), realised PEPM anchor ~₹52 (biased low), publishes a full card — Essential ₹2,495/month including 50 employees + ₹45 per additional (EV-027) — and prices Recruit at ₹2,500 per recruiter and GPS live-tracking at ₹140/user/month vs. the ₹45 marginal seat rate (3.1× — a signal that location and recruiting are monetisable separately; add-on prices per r2/05, r5/03). Its statutory language is generation-only — ECR generation, challans, 24Q generation with FVU validation, Form 16 generation; no submission claim (EV-030). NAVOS assistant launched 3 Jun 2026 and is "included in every plan" — claim posture, not tested (EV-090) — a data point in the "HR AI price is zero" set (§13.1). The one to benchmark artefact breadth and price-card transparency against.
- **Keka** — ₹133.86 Cr FY25 (+55%); ₹80 Cr loss on ₹78 Cr FY24 revenue (r2/09). Pricing captured 5 Sep 2026 by raw-HTML fetch: no live prices on its pricing page; three commented-out spans of ₹90 / ₹120 / ₹150 per additional employee (EV-021); the withdrawn card of ₹9,999 / ₹12,999 / ₹15,999 per month up to 100 employees (EV-022); a live small-companies floor "from ₹6,999 per month" / "starts at ₹90 per employee/month" (EV-023). The suppression is global — US and UAE pages use the same mechanism (EV-024). Two live pages contradict each other on setup fees, and ToS clause 15 says renewal fees are "subject to an increase" (EV-025). Keka AI is waitlisted; its published AI governance commitments (citation on every answer, no silent writes, RBAC on every AI call, no training of external models on customer data) and "Keka MCP Server" are table stakes to match (EV-090). **[Reversed]** v0.3's "INR tiers TLS-blocked and unverified — treat every Keka pricing claim as provisional".
- **factoHR (Version Systems Pvt Ltd)** — ₹25.76 Cr FY25 (+12%), payroll-led, with a retirement-benefit administration heritage (PF, gratuity, superannuation trusts) and self-described AI positioning, unverified (r2/09). Publishes an INR ladder — free for up to 20 employees; Core ₹4,999, Premium ₹5,999 and Ultimate ₹6,999 per month each including 50 employees, plus ₹69 / ₹89 / ₹119 per additional employee (captured September 2026, r1/01; the free tier's scope is a round-one capture routed for re-capture before external use — §21.14 CQ-15) — so it sits outside the EV-026 six-vendor set but shows the same 50-employee block shape above its free tier. A feature-and-price comparator.
- **Qandle (MYND) / Pocket HRMS / Zimyo / HROne** — published cards, all on 50-employee minimum blocks: at 20 employees ₹2,450/month (Qandle, annual billing) to ₹4,950/month (HROne) (EV-026, EV-027). Qandle has sat inside the MYND payroll-outsourcing group since April 2025 (EV-034). **[Reversed]** v0.3's "unswept, TLS-blocked tier".
- **RazorpayX Payroll / HivePayroll** — RazorpayX: ₹2,499/month for up to 20 employees (captured September 2026, r1/01); it carries a fintech parent (bank-payout distribution motive) — watch for the Jupiter/sumHR-style zero-pricing move (§20 R-6). RazorpayX's next tier is ₹5,499/month for 50 employees with a 100-employee ceiling and ₹150 per additional employee (r1/01). HivePayroll: Standard ₹1,499, Premium ₹2,499 and Ultimate ₹3,999 per month, each up to 25 employees, plus ₹35 / ₹55 / ₹95 per additional; no permanent free tier (verified against the vendor's page, r2/05). **[Reversed]** an earlier draft's withdrawal of the ₹1,499 figure — it is primary-verified in r2/05.

##### What each rival cannot do (the wedge, per competitor)

Positioning is only real if it names, per competitor, the thing they structurally do not do. This is the per-rival version of the whitespace claim:

| Rival | What the dated evidence shows it does (read, not tested) | Structurally does not do | Our wedge against them |
| --- | --- | --- | --- |
| TallyPrime | Ships the statutory artefacts (PF/ECR, ESI, PT statement, Form 16, 24Q annexures, 12BA, 27A) inside the licence; multi-user permissions set per voucher and per report, multi-user at Gold (EV-032, r3/01) | No state PT slab table, no LWF engine, no leave module, no leave-encashment calculation; attendance by manual vouchers (EV-032); submission stays with the employer or CA. ESS status unresolved — assert nothing | Multi-state PT/LWF, leave-to-payroll, attended submission (§21) |
| Kredily | Free computation, unlimited headcount | Outputs are charged — challans, payout files, the annual tax certificate, Form 124 (ex-12BB) (EV-029) | The output and submission layer |
| Frappe HR | OSS; gross-to-net salary structures, arrears, leave, PWA (EV-031, r3/01) | Any Indian statutory artefact: no state dimension, no ECR/ESI, no PT slabs, no LWF, no 24Q/138, Form 16/130, 12BA or 27A (EV-031) | The statutory layer — **not** gross-to-net, where the bake-off will not be won (EV-031) |
| Zoho | Self-serve, size-gated free tiers | Outputs charged (EV-029); otherwise nothing structural on computation — **parity, not advantage** | Honest answer: none on computation; compete on outputs, attended submission and the CA channel |
| Keka | Entry tier bundles payroll, statutory compliance, expense and gratuity management (r5/03); published AI governance commitments (EV-090) | Live price card suppressed (EV-021, EV-024); AI waitlisted (EV-090); bills a block, historically 100 employees (EV-026) | Published per-head card with no seat floor (§18); attended submission |
| Enterprise suites | Full-suite, enterprise procurement | Beachhead price/shape; self-serve | Segment fit — but deferred, not fought (§01, §05.2) |

The honest line the PRD requires us to hold: the wedge is specific per incumbent — multi-state PT/LWF, leave and attended submission against Tally (EV-032); the whole Indian statutory layer against Frappe (EV-031); the output and submission layer against Kredily and Zoho (EV-029); on computation it is **parity, not advantage**. Any collateral claiming feature advantage against Zoho, or gross-to-net advantage against Frappe, is falsifiable in a bake-off and must not ship.

#### The 20–50 sub-band is structurally overcharged — the seat-floor arithmetic

All six priced vendors in the EV-026 set bill a 50-employee minimum block (Keka's historical block: 100), so below 50 employees the monthly bill does not fall with headcount and the effective PEPM rises in proportion to 50 ÷ headcount. At 20 employees the buyer pays for 30 seats it does not have — 60% of the bill. That is the precise sense in which the 20–50 band is *structurally* overcharged: the rate is not high, the block does not fit (EV-026, EV-027). One nuance, so collateral does not overreach: greytHR's pricing slider starts at 10 employees and will quote below 50, but its base price still buys 50 (r5/03, captured September 2026).

| Vendor (entry tier, captured September 2026) | Monthly price of the minimum block | PEPM at 50 employees | Effective PEPM at 20 employees | Share of the 20-employee bill buying unused seats |
| --- | --- | --- | --- | --- |
| Qandle | ₹2,450 on annual billing (₹2,950 monthly) | ₹49.00 | ₹122.50 | 60% |
| greytHR Essential | ₹2,495 | ₹49.90 | ₹124.75 | 60% |
| Pocket HRMS Standard | ₹2,995 on annual billing | ₹59.90 | ₹149.75 | 60% |
| Zimyo Basic | ₹4,000 (₹80 × the 50-user minimum) | ₹80.00 | ₹200.00 | 60% |
| HROne | ₹4,950 | ₹99.00 | ₹247.50 | 60% |
| Keka | ₹6,999 live floor; the block size behind it is not published (§04.5) | ₹139.98 | ₹349.95 | 60% if the floor buys 50 seats — unknown |

(Source: EV-026, EV-027; block prices per r5/03. The 20-employee column is the block price ÷ 20 and the unused-seat share is (50 − 20) ÷ 50 — derived arithmetic. Pages read, products not executed.)

"Structurally overcharged" is used in this PRD in one defined sense, so that it can be tested rather than argued. **The overcharge share** of a bill at headcount *n* on a card whose base covers *s* seats is (*s* − *n*) ÷ *s* for *n* < *s*, and zero at or above *s*: the share of the bill paying for seats the firm does not have. It depends only on the block's size, never on its price, which is why it is the same 60% for all six vendors at 20 employees. On a 50-seat block it is 60% at 20 employees, 50% at 25, 40% at 30, 30% at 35, 20% at 40, 10% at 45 and zero from 50; on Keka's archived 100-employee block it was 80% at 20 and 50% at 50 (EV-022). A band is "structurally overcharged" where the overcharge share is above zero for every vendor in the priced set — below 50 employees, on today's cards.

Why this matters to sizing and not only to pricing: on the r2/09 fit the 20–49 band is the most populous interior band — 5,25,246 of the 7,24,373 residual, carrying 1.58 Cr members against 1.77 Cr in 50–199 [Hypothesis — low confidence, and subject to `beachhead_sub20_share`, AC-12]. If the fit is even roughly right, the seat floor lands on the majority of beachhead *establishments* while the larger share of *members* sits above it. The overcharge is therefore concentrated on the most numerous and least lucrative accounts, which is why §18 treats "no seat floor" as a structural differentiator rather than a price level.

##### Sizing the overcharge — the unused-seat pool on the fit

The per-firm arithmetic has a band-level counterpart. On the r2/09 fit, the 20–49 band holds 5,25,246 contributing establishments and 1,57,56,566 members — a mean of 30.0 per establishment. A 50-seat floor applied to every one of them bills 2,62,62,300 seats for those members, so **1,05,05,734 seats — 40.0% of the seats billed — would be paid for and unused**. Priced at each vendor's own 50-employee rate:

| Vendor entry card (its PEPM at 50 employees) | Premium on the band's mean establishment (20 unused seats) | Unused-seat pool across the band, per year |
| --- | --- | --- |
| Qandle, annual billing (₹49.00) | ₹980 a month | ₹617.7 Cr |
| greytHR Essential (₹49.90) | ₹998 a month | ₹629.1 Cr |
| Pocket HRMS Standard, annual billing (₹59.90) | ₹1,198 a month | ₹755.2 Cr |
| Zimyo Basic (₹80.00) | ₹1,600 a month | ₹1,008.6 Cr |
| HROne Basic (₹99.00) | ₹1,980 a month | ₹1,248.1 Cr |
| Keka live floor (₹139.98 — only if the floor buys 50 seats, which is unknown) | ₹2,800 a month | ₹1,764.7 Cr |

(Derived: unused seats = 50 × 5,25,246 − 1,57,56,566; pool = unused seats × rate × 12. Below 50 the premium is linear in headcount, so the band total depends only on the fitted establishment and member counts, not on how they are distributed inside the band. [Hypothesis — fit-based])

What the pool is, and what it is not:

- **A counterfactual ceiling.** It is the rupee value of the seat floor if every 20–49 establishment bought that one vendor's entry card. No vendor holds the band, and how much of the band buys block-priced software at all is unmeasured (V-02); the realised overcharge is the pool times the band's block-priced share, which is unknown.
- **Not a slice of observed spend.** The band's whole bill at greytHR's card would be ₹1,572.6 Cr a year (5,25,246 × ₹2,495 × 12) — 40–75% of all observed India HRMS software spend (₹2,100–3,900 Cr) for one band at the cheapest card. That is further evidence for the penetration reading — it is unlikely that most of the band is on block-priced software today (§04.3, the spend identity) — though not proof, since the gross-up itself is modelled (EV-005).
- **Tied to the fit.** A measured count (AC-20) that moves establishments out of 20–49 shrinks the pool with them. `beachhead_sub20_share` does not enter the formula, because the fit places no establishment below 20.
- **The per-member effect, made concrete.** At the band's mean establishment a value-floor block collects ₹83.17 per member-month against its ₹49.90 list rate — a 1.67× uplift (50 ÷ 30) that the §04.3 identity table carries as the seat-floor bias.

- **AC-24 (the pool is labelled a counterfactual).** *(New.)* The unused-seat pool is shown only with its vendor rate, the fit it rests on, and the label "counterfactual ceiling — assumes the whole band on one card"; it is never presented as a market, as a saving available to buyers in aggregate, or as a revenue opportunity. Test: "₹629 Cr of overcharge in the 20–49 band" fails; "on the r2/09 fit, if every 20–49 establishment bought greytHR Essential, ₹629 Cr a year would pay for unused seats — a counterfactual ceiling" passes.

##### The band's full-adoption bill, by card — what the arithmetic bounds and what it refuses

The unused-seat pool prices the *waste*; the same two fitted numbers price the *whole bill*, and that is the version which bounds a reading rather than illustrating one. On the r2/09 fit every establishment in 20–49 sits below every card's 50-seat block, so each pays the block price and the band's annual bill on a single card is 5,25,246 × block × 12 — it needs no assumption about how headcount is distributed inside the band. Set that against all observed India HRMS software spend (₹2,100–3,900 Cr, EV-005):

| Entry card (block price a month, ex-GST) | The band's annual bill on that card | As a share of ₹2,100 Cr | Of ₹3,900 Cr | Upper bound on the band's share that can be on this card |
| --- | --- | --- | --- | --- |
| Qandle, annual billing (₹2,450) | ₹1,544.2 Cr | 73.5% | 39.6% | Not binding — above 100% at both ends |
| greytHR Essential (₹2,495) | ₹1,572.6 Cr | 74.9% | 40.3% | Not binding |
| Pocket HRMS Standard, annual billing (₹2,995) | ₹1,887.7 Cr | 89.9% | 48.4% | Not binding |
| Zimyo Basic (₹4,000 = ₹80 × the 50-user minimum) | ₹2,521.2 Cr | 120.1% | 64.6% | **83.29%** at ₹2,100 Cr; not binding at ₹3,900 Cr |
| HROne Basic (₹4,950) | ₹3,120.0 Cr | 148.6% | 80.0% | **67.31%** at ₹2,100 Cr; not binding at ₹3,900 Cr |
| Keka live floor (₹6,999 — only if the floor buys 50 seats, which is unknown) | ₹4,411.4 Cr | 210.1% | 113.1% | **47.61%** at ₹2,100 Cr; **88.41%** at ₹3,900 Cr |

(Derived: 5,25,246 × block × 12, then ÷ the spend range; the bound is min(100%, spend ÷ bill). Block prices EV-026, EV-027, r5/03. [Hypothesis — fit-based], and the bound inherits the gross-up's 35–65% share band (IN-12).)

What the table establishes, stated at exactly its strength:

- **A ceiling on band adoption exists for the clearing-band cards, and only for them.** If observed spend is near the bottom of its range, the 20–49 band cannot be more than about half on Keka's floor, two-thirds on HROne's card or five-sixths on Zimyo's — because a higher share would consume more than every rupee the whole Indian market spends on HRMS software. The two value-floor cards are not excluded by this arithmetic at all: the band could be entirely on Qandle's or greytHR's card and still fit inside the spend range. **The bound bites on price, not on penetration** — it is evidence about *which card* the band could be on, not about how much of the band is on software.
- **The available bound is loose, and the tighter one is refused.** Every bound above assumes every rupee of observed spend went to this band on this card. The scoreboard says otherwise: three enterprise-weighted filers — Darwinbox ₹533.87 Cr, PeopleStrong ₹301.99 Cr and ZingHR ₹150 Cr — are ₹985.86 Cr of the ₹1,374.12 Cr filed. Removing them from the numerator would tighten every bound sharply, but IN-12's 35–65% share band is defined over the *whole* filed set, so the subtraction cannot be carried into the grossed-up range without re-deriving IN-12. The model therefore records the tighter bound as **not computable** rather than computing it (§04.3, data-handling rules); re-deriving IN-12 over a segment-restricted filed set is a desk item for the next filing cycle, owner Research.
- **It is one-directional evidence.** A card whose bound is not binding is not thereby the band's card. Nothing here identifies which cards the band actually buys, and the mix across cards is unmeasured (V-02).
- **It does not replace the identity.** The identity (§04.3) is whole-market and cannot yield a beachhead-only π; this table is band-level and cannot yield a π at all, because it says nothing about establishments buying no software. They answer different questions and are never presented as agreeing or disagreeing.

<!-- DIAGRAM: problem-market-band-full-adoption-bill -->

The chart draws the six bills against the two spend lines: a bar above the ₹2,100 Cr line is a card whose full-band adoption is arithmetically impossible at the bottom of the spend range, and a bar above the ₹3,900 Cr line is one that is impossible anywhere in it.

- **AC-34 (the band bound is stated as a ceiling on a card, not a measurement of the band).** *(New.)* Any use of the full-adoption bill states the card, the fit it rests on, the spend end it is computed against, and the words "upper bound, assuming every rupee of observed spend went to this band on this card"; a bound is shown only where it is below 100%, and a card whose bound is not binding is reported as "not excluded", never as supported. The tighter, enterprise-adjusted bound is not computed until IN-12 has been re-derived over the restricted set, and is reported as "not computable" until then. Test: "less than half the 20–49 band is on Keka" fails; "at ₹2,100 Cr of observed spend, at most 47.61% of the fitted 20–49 band could be on Keka's ₹6,999 floor — an upper bound on one card, on a low-confidence fit" passes; "the band is on value-floor cards, because their bound is not binding" fails.

##### Worked example — where a no-seat-floor card actually costs less

"No seat floor" is not the same claim as "cheaper". A card billing actual headcount at our ₹80–150 modelling band [Hypothesis — EV-006, §20 V-03] costs the buyer less than a vendor's card only while headcount × our PEPM stays at or below that vendor's bill at the same headcount. The table gives the headcounts at which that holds, across 20–200. Above each block the vendor's published per-additional rate applies — five of the six publish one, and §21.4 registers them and carries the effective PEPMs; Keka's live floor covers a block of unknown size:

| Vendor card (monthly) ↓ / our PEPM → | ₹80 | ₹115 | ₹150 |
| --- | --- | --- | --- |
| Qandle ₹2,450 for 50, then ₹49 (annual) | 20–30 employees; never above | 20–21; never above | None in 20–200 (up to 16) |
| greytHR ₹2,495 for 50, then ₹45 | 20–31; never above | 20–21; never above | None in 20–200 (up to 16) |
| Pocket HRMS ₹2,995 for 50, then ₹60 (annual) | 20–37; never above | 20–26; never above | None in 20–200 (up to 19) |
| Zimyo ₹80 a user, 50-user minimum | All of 20–200 (equal from 50) | 20–34 | 20–26 |
| HROne ₹4,950 for 50, then ₹99 | All of 20–200 | 20–43 | 20–33 |
| Keka archived ₹9,999 for 100, then ₹90 | All of 20–200 | 20–86 | 20–66 |
| Keka ₹6,999 live floor | All of 20–50; above 50 not computable | All of 20–50; above 50 not computable | 20–46 |

(Derived: every *n* in 20–200 with *n* × PEPM ≤ the vendor's bill at *n* — the block up to its seats, then block + per-additional × (*n* − seats). For example, 21 × ₹115 = ₹2,415 ≤ ₹2,450 while 22 × ₹115 = ₹2,530 exceeds it. Block and per-additional prices EV-022, EV-027 and r5/03; our PEPM [Hypothesis].)

The read, stated so the wedge is not oversold. At the ₹115 midpoint a no-floor card is cheaper than the two value-floor vendors (Qandle, greytHR) only up to about 21 employees, and cheaper than Keka's floor across the whole 20–50 band. Between roughly 22 and 50 employees the value-floor block is the smaller invoice in absolute rupees even though its effective PEPM is higher. So the structural overcharge is real per head, but it converts into a lower *bill* against the value floor only at the bottom of the band; above that, the decision against Qandle or greytHR rests on attended submission, the maintained SLA and the CA console, not on the invoice. Against the priced vendors, the price argument is strongest against Zimyo, HROne and Keka. Above 50 it does not improve: the ₹80–150 band is never the smaller bill against Qandle, greytHR or Pocket HRMS, equals Zimyo at ₹80, undercuts HROne only at ₹80, and undercuts Keka's archived card up to 86 employees at ₹115 and 66 at ₹150. Across the 50–199 half — where the larger share of beachhead members sits on the fit — the price is carried by attended submission and the maintained SLA, or it is not carried. This is the arithmetic behind AC-17.

- **AC-17 (headcount-specific price claims).** *(New; numbered after AC-16.)* Any collateral, sales script or in-product comparison that states our price relative to a named vendor for a given headcount computes both monthly bills at that headcount from the dated card (EV-027, re-captured per AC-15) and states the result; "cheaper" is claimed only where our fee is lower at that headcount, and "no seat floor" is never presented as "cheaper" without that computation. Test case: a 40-employee comparison against greytHR at a ₹115 PEPM card must show ₹4,600 against ₹2,495 and must not claim a saving.

##### The comparison computation — inputs, rules and refusals

AC-17 says what a comparison may claim; this is how the comparison is computed, so that collateral, the sales script and any in-product comparison produce the same number. The competitor side comes only from the §21.4 rate-card register (CLR-05); our side comes only from our published card (§18.12). Until that card exists, the computation runs internally on the modelling band, and its output is labelled "internal — our price unpublished".

| Input | Taken from | Rule |
| --- | --- | --- |
| Vendor, plan and billing basis (block plus per-additional; per-user with a minimum) | §21.4 register | The entry plan carrying payroll only (EV-028); add-ons excluded unless both sides include them |
| Base price, seats in the base, per-additional rate | §21.4 register | If the seats in the base are unknown, the vendor's bill above its published coverage is "not computable" |
| Billing cadence | §21.4 register | Must match our card's cadence — Qandle's monthly and annual cards differ by ₹500 a month at 50 employees (EV-027) |
| Tax basis | §21.4 register | Both sides ex-GST, as published; GST disclosure is uneven across vendors (§21.4), so the output says "ex-GST" |
| Capture date and method | §21.4 register | A capture older than `competitor_claim_max_capture_age_days` is re-captured before use (§21.12 CLR-10; AC-15) |
| Headcount *n* | The prospect | Own-roll headcount, as we would bill it (§05.11) |

Computation. Vendor bill(*n*) = base if *n* ≤ seats in the base, else base + per-additional × (*n* − seats in the base); for a per-user card with a minimum, rate × max(*n*, minimum). Our bill(*n*) = our per-head fee × *n*, with no seat floor (§18.2 P6). Output: both monthly bills in whole rupees, the difference, which is smaller, both effective PEPMs to two decimals, the capture date, and one sentence in a form §21.12 approves. "Cheaper" is emitted only when our bill is strictly smaller. Three further rules:

- **Per-entity pricing.** Where a vendor's terms price each legal entity separately — Zoho Payroll requires a licence per legal entity (§21.4) — the vendor's bill is computed per entity and summed. Our side includes whatever registration allowance and multi-registration line our published card sets (§18.3; `included_registrations_per_tenant`, `multi_registration_line_price`).
- **Cadence discounts.** An annual-cadence comparison applies our card's annual prepayment discount, if it has one (`annual_prepay_discount_pct`, §20.13); a monthly-cadence comparison does not.
- **Quotes are not cards.** A price a vendor quotes privately — below its published base, say — is not a card. It is excluded from the computation and recorded as a V-03 data point (§04.5, study records).

| # | Case | Expected output |
| --- | --- | --- |
| PC-1 | *n* = 40, greytHR Essential, our ₹115 | ₹4,600 against ₹2,495; no saving claimed (AC-17's test) |
| PC-2 | *n* = 20, greytHR Essential, our ₹115 | ₹2,300 against ₹2,495; smaller by ₹195 a month |
| PC-3 | *n* = 21, then *n* = 22, Qandle annual card, our ₹115 annual | ₹2,415 against ₹2,450, smaller by ₹35; then ₹2,530 against ₹2,450, no saving |
| PC-4 | *n* = 60, Zimyo Basic, our ₹80 | ₹4,800 against ₹4,800; equal — "cheaper" is not emitted |
| PC-5 | *n* = 150, HROne Basic, our ₹80 | ₹12,000 against ₹14,850; smaller by ₹2,850 a month |
| PC-6 | *n* = 200, greytHR Essential, our ₹80 | ₹16,000 against ₹9,245; no saving |
| PC-7 | *n* = 100, Keka's archived card, our ₹115 | ₹11,500 against ₹9,999; no saving; the output labels the card "archived, 1 Aug 2024" (EV-022) |
| PC-8 | *n* = 60, Keka's live floor | Refused — the block behind ₹6,999 is unknown (EV-023; §21.4) |
| PC-9 | *n* = 30, Qandle's monthly card against our annual card | Refused — cadence mismatch |
| PC-10 | Any vendor whose capture is past the age limit | Refused until re-captured (AC-15) |
| PC-11 | *n* = 30, one legal entity, Zoho Payroll Standard (₹1,000 a month on annual billing for 25, then ₹40 each — §21.4), our ₹115 annual | ₹3,450 against ₹1,200; no saving; the output notes Zoho sits outside the EV-026 six |
| PC-12 | *n* = 30 across two legal entities of 15, Zoho Payroll Standard | ₹3,450 against ₹2,000 (two licences, each within its 25 included); no saving; the per-entity rule is shown |
| PC-13 | *n* = 30, Kredily | Its free plan is not compared — computation is free and outputs are charged (EV-029); the comparison runs against Payroll OS (₹1,249 a month for 25, then ₹50 each — §21.4): ₹3,450 against ₹1,499, no saving, with the scope of each written beside it |
| PC-14 | A prospect holding a private greytHR quote below the ₹2,495 base | The quote is excluded; the computation runs on the published card and the quote is logged as a V-03 data point |
| PC-15 | *n* = 90 across two legal entities of 55 and 35, on a card whose register row does not record whether it prices each legal entity separately | Refused — "not computable: per-entity basis not recorded for this card". The per-entity rule above applies only where the register records the basis, as it does for Zoho Payroll (PC-11, PC-12); the basis is a required field for any multi-entity comparison and its absence is logged against the §21.4 row |
| PC-16 | *n* = 30, a card whose base covers fewer seats than the prospect's headcount but whose per-additional rate is not published | Refused — "not computable above the published coverage", the same refusal as PC-8, and the output names which half of the card is missing |

<!-- DIAGRAM: problem-market-bill-vs-headcount -->

The chart draws the shape behind PC-1 and PC-2 for one vendor: greytHR Essential's bill (bars) is flat to 50 and then rises by ₹45 a head, while a no-floor card at the ₹115 midpoint (line) rises by ₹115 a head from the first employee — the smaller bill only at 20–21 employees.

- **AC-25 (one comparison computation).** *(New.)* Every price comparison against a named vendor — collateral, sales script or in-product — is produced by the computation above, from the §21.4 register and our published card, and reproduces PC-1–PC-16; a comparison computed any other way does not ship. §18.12 is the commercial presentation of the same computation and must agree with it.

##### The composed annual cost view — software plus filing labour

AC-25 compares software with software and AC-18 compares our per-head fee with a bureau fee. The buyer runs both lines at once: one invoice for a tool, another for the person who files. A prospect shown only one of them is being shown half its own budget, and a comparison that silently mixes the two is the error AC-18 exists to prevent. The composed view puts both lines on one twelve-month basis, and its value is as much in what it refuses to conclude as in what it adds.

<!-- DIAGRAM: problem-market-cost-composition -->

**Inputs and their rules.**

| Line | Taken from | Rule |
| --- | --- | --- |
| Software today | The AC-25 computation at the prospect's headcount, ×12 | Ex-GST, as published; a refused comparison (PC-8 to PC-10, PC-15, PC-16) refuses the whole composed view |
| Filing labour today | The declared bureau fee and scope (AC-18), ×12; failing that, the published indicative band for the headcount, labelled indicative | A band is never converted to a point; the tax basis of bureau fees is not captured and the output says so |
| Our line | Per-head fee × headcount × 12, no seat floor | The modelling band until §18 publishes a card; every row is then labelled "internal — our price unpublished" |
| Filing scope, ours | Portal-accepted artefacts plus attended, assisted submission under the employer's written authority (K-13) | Printed beside our line, with the sentence that the employer's statutory liability is non-delegable; attended-filing legality is under counsel review (§23) |

**Worked, on the greytHR Essential status quo in one state, with the published bureau bands** (₹3,000–8,000 a month at 11–50, ₹8,000–15,000 at 51–100 — r2/05, indicative, scope differs between the bands), our line at the ₹115 modelling midpoint, all figures ₹ a year, ex-GST:

| Own-roll | Software today | Filing labour today | Total today | Our line at ₹115 | Bureau retained: our line + bureau | Bureau retired: our line alone |
| --- | --- | --- | --- | --- | --- | --- |
| 20 | 29,940 | 36,000–96,000 | 65,940–1,25,940 | 27,600 | 63,600–1,23,600 — lower by 2,340 | 27,600 — lower by 38,340–98,340 |
| 30 | 29,940 | 36,000–96,000 | 65,940–1,25,940 | 41,400 | 77,400–1,37,400 — higher by 11,460 | 41,400 — lower by 24,540–84,540 |
| 45 | 29,940 | 36,000–96,000 | 65,940–1,25,940 | 62,100 | 98,100–1,58,100 — higher by 32,160 | 62,100 — lower by 3,840–63,840 |
| 60 | 35,340 | 96,000–1,80,000 | 1,31,340–2,15,340 | 82,800 | 1,78,800–2,62,800 — higher by 47,460 | 82,800 — lower by 48,540–1,32,540 |

(Derived: greytHR Essential is ₹2,495 a month to 50 employees and ₹2,495 + ₹45 × (*n* − 50) above it (EV-027, r5/03); bureau bands per r2/05; our line is the modelling band, not a price (§18). In the retained branch the bureau line cancels, so the difference is simply our fee against the vendor's — the AC-25 numbers, annualised.)

Three readings, each of which the view must carry with it:

- **The retained branch is the AC-25 comparison and nothing more.** Because the bureau line appears on both sides, composing changes no conclusion there: our line is smaller only where AC-25 already says so — at 20–21 employees against greytHR at ₹115, at 20–31 at ₹80, at 20–16 (that is, nowhere in the band) at ₹150. The composed view exists for the other branch.
- **The retired branch is where the money is, and it is the branch we may not claim.** Retiring the bureau is a decision about who does the filing work, and this PRD has no evidence that a customer can or will retire it: the realised bureau price is untested (V-01), bureau usage in the beachhead is unmeasured (V-02), and the CA may be the person who recommends or blocks the purchase in the first place (V-05). The branch is shown as arithmetic on the buyer's own declared numbers, with the scope of each side written beside it, and never as a saving we offer.
- **The scope sentence carries the difference, not the rupees.** What our line buys — portal-accepted artefacts and attended submission under written authority, with liability staying with the employer — is not what the software line buys today, and is only partly what the bureau line buys. The composed view is a budget picture, not a like-for-like price.

Negative cases the view must refuse:

| # | Case | Output |
| --- | --- | --- |
| CV-1 | The bureau fee is not declared | The filing-labour line shows the indicative band with its scope, and no total is emitted — only the two branches' component lines |
| CV-2 | The prospect uses no bureau (Excel plus in-house, or Tally plus in-house) | The filing-labour line reads "carried in-house — not priced here"; the view reduces to the AC-25 comparison and says so |
| CV-3 | The software comparison is refused (PC-8, PC-10, PC-15, PC-16) | The whole view is refused, with the refusal's own reason |
| CV-4 | Our card is unpublished | Internal use only; the output carries "our price unpublished (§18)" on every row |
| CV-5 | A prospect on a freemium plan whose computation is free and outputs are charged (EV-029) | The software line is the charged outputs at that vendor's card, never ₹0, and the output names what the free plan does not include |
| CV-6 | Multiple legal entities | Each side is composed per entity and summed, and only where PC-15 does not refuse the software line |
| CV-7 | The prospect asks for a three-year total | Refused — no vendor's renewal price is known, and one vendor's terms make renewal fees "subject to an increase" (EV-025, K-17) |

- **AC-35 (the composed cost view shows both branches and claims neither).** *(New.)* Wherever software and filing-labour costs are shown together — a sales conversation, the burden statement, the CA console, a self-serve page — both branches are shown, each line carries its scope, the bureau line is a declared fee or a labelled indicative band, the tax basis is stated, and the view refuses under CV-1 to CV-7. No material states or implies a saving from retiring a bureau or a CA. Test: a slide reading "we save a 30-person firm ₹84,540 a year" fails; the 30-employee row above, with both branches, both scopes and the non-delegable-liability sentence, passes; a composed view built on a PC-15 refusal fails.

##### When a card changes — the R-39 and R-40 response

Every figure in §04.4 rests on cards captured in September 2026, and two of the PRD's risks are precisely that they move: a priced vendor dropping its 50-seat block (R-39) and greytHR cutting its price or widening its base (R-40). AC-15 says a stale capture must be re-captured; this says what the re-capture then obliges, so that a card change is a mechanical restatement rather than an argument.

| From | Event | Guard | Side effect | Who may trigger |
| --- | --- | --- | --- | --- |
| CURRENT | The capture passes `competitor_claim_max_capture_age_days` | — | → STALE; AC-25 refuses every comparison against the card (PC-10); qualification rows that depend on it hold at B | The watch, automatically |
| STALE | Re-captured, values unchanged | The new capture is dated and its method recorded | → CURRENT; nothing is restated | §21.4's owner |
| STALE or CURRENT | Re-captured, **base price changed** | As above | → CURRENT; the card's PEPM at 50, its effective PEPM at 20, the unused-seat pool row and the full-adoption bill row are recomputed; the overcharge share is unchanged | §21.4's owner |
| STALE or CURRENT | Re-captured, **block size changed** (R-39) | As above | → CURRENT; the overcharge share is recomputed on the new block, the "structurally overcharged" band is re-derived across the priced set, and F-11's computability is re-tested | §21.4's owner |
| STALE or CURRENT | Re-captured, **per-additional rate changed** | As above | → CURRENT; nothing below the block moves; the PC cases above the block and the 50–199 half of the seat-floor bias are recomputed | §21.4's owner |
| CURRENT | The card is withdrawn or suppressed | The suppression is evidenced, as Keka's was (EV-021, EV-024) | → WITHDRAWN; comparisons against it are refused; the last captured card survives only as a dated archive, labelled as one (EV-022) | §21.4's owner |
| Any | A free tier's headcount gate moves (R-41; R-1 for Zoho) | The new gate is dated | The band re-scoping rules run (§04.5), not this table — the gate changes which band is paid for, not what a card costs | §21.4's owner, then the section owner |

**Worked — one vendor moves its block from 50 seats to 25.** The overcharge share is (*s* − *n*) ÷ *s*, so for that vendor it falls from 60% to 20% at 20 employees, and to zero from 25 rather than from 50. Three consequences follow mechanically:

- **The claim narrows but does not die.** "Structurally overcharged" is defined as an overcharge share above zero for *every* vendor in the priced set (§04.4). With one vendor at 25 seats, that holds only over 20–24 employees; from 25 to 49 the claim becomes per-vendor and must be stated per vendor, with that vendor named as the exception. MC-16's approved form is re-derived in the same change.
- **F-11 stops being computable for that vendor.** The unused-seat pool needs only the band's establishment and member totals while the block is at least the band's upper bound, because then every establishment is floored. At a 25-seat block only establishments below 25 are floored, and the fit's two totals do not say how many those are. The pool is then reported as **not computable for that card**, never approximated from the band mean of 30.0 — max(*n*, *s*) is convex in *n*, so a mean-based shortcut understates the pool, and at a 25-seat block it would return almost exactly zero against a true figure that is not zero.
- **Claims already in market are withdrawn, not amended in place.** Any collateral carrying the old overcharge share, the old unused-seat pool or an AC-25 comparison against that card is withdrawn and re-issued from the new capture; the claim ledger's seat-floor rows are re-graded and every `published_in` location is updated in the same change (AC-22).

<!-- DIAGRAM: problem-market-overcharge-by-block -->

The chart draws the overcharge share against headcount for the three block sizes the evidence base actually contains — 25 seats as the R-39 case, the 50 seats every priced vendor bills today (EV-026), and the 100 seats of Keka's archived card (EV-022). The curves are the same shape scaled by the block: the smaller the block, the narrower the stretch of headcounts over which the seat floor is an argument at all.

- **AC-36 (a card change restates, it does not re-argue).** *(New.)* Every recapture of a §21.4 card is classified into one of the events above before any figure moves; the side effects it names run in one change; and no §04 figure, approved form or piece of collateral that depends on the changed card survives the change unrestated. A pool or share that is no longer computable under the new card is reported as "not computable", never estimated. Test: a vendor moving to a 25-seat block and the §04.4 overcharge table left at 60% fails; the same change with the table recomputed, F-11 marked not computable for that card and MC-16's form re-derived passes.

#### Where obligation + budget + dissatisfaction overlap

The beachhead thesis is a claim about an intersection, not a segment size. Mapping it:

| Segment | Obligation? | Budget? | Dissatisfaction / whitespace? | Verdict |
| --- | --- | --- | --- | --- |
| < 10 employees | Light (TDS, S&E, and a POSH Internal Committee from employee one — EV-056) | ~₹0 marginal | Served free (Kredily; Zoho to 10) or inside an existing Tally licence | No overlap — decline commercially |
| 10–20 | Real (ESI, gratuity, appointment letter at 10 — EV-057) | ₹0 for computation (Kredily free at any headcount; Zoho Payroll free to 10; factoHR free to 20 — r2/05, r1/01); outputs cost ₹12,000/yr at Zoho Standard (₹1,000/month on annual billing, 25 included) or ~₹15,000/yr at Kredily Payroll OS (₹1,249/month, up to 25) — r2/05; ₹29,400+/yr at the 50-employee minimum block of each of the six EV-026 vendors (EV-026, EV-027) | Free tiers cover computation; outputs charged (EV-029) | Partial — acquisition funnel only |
| **20–200** | **Strong (EPF at 20; step function stacks)** | **Indicative ₹3k–15k/mo bureau line (V-01)** | **20–50 structurally overcharged by seat floors (EV-026); 50–200 over-served by cheap product; nobody in the priced set claims to submit (EV-030)** | **Full overlap — beachhead** |
| 200–2,000 | Strong (canteen 100; standing orders and retrenchment approval 300 — EV-057) | Larger, but sales-led | Suites present; migration friction real | Overlap exists — expansion, not launch |
| 2,000+ | Strong | Large | Incumbency-locked (SBI and Indian Bank HRMS RFP eligibility gates — §05.2) | Overlap blocked by procurement — defer |

The honest version of the wedge (§01): the 20–200 band is **not a competitive vacuum** — Zoho Payroll serves 25 employees for ₹1,000/month on annual billing (r2/05), HivePayroll 25 for ₹1,499 (r2/05), RazorpayX up to 20 for ₹2,499 (r1/01), factoHR is free up to 20 (r1/01), Kredily computes free, and six priced vendors sell 50-seat blocks (EV-026). The 20–50 sub-band is **structurally overcharged** by those floors (₹122.50–349.95 effective PEPM at 20 employees — EV-027), and the whole band is **under-served by product that carries the filing through to portal acceptance**: portal-accepted artefacts plus attended, assisted submission under the employer's written authority (K-13; legality of acting on portals under employer credentials is under counsel review — §23), a maintained compliance SLA with a remedy cap (§19) and a CA-facing console. The employer's statutory liability stays non-delegable throughout. That moves the wedge from *availability* (false) to *quality-of-delivery* (true and harder); the per-incumbent differentiation is in the table above.

##### Statutory thresholds against commercial gates

The market's price structure lines up with the statute's thresholds closely enough to explain where buyers meet their first bill. Set side by side (gates as captured, pages read, products not executed):

| Headcount | Statutory threshold (EV-057) | Commercial gates at or near it | What the buyer meets |
| --- | --- | --- | --- |
| 10 | ESI (10 or more, in notified areas); appointment letter (10 or more workers); gratuity and maternity benefit | Zoho Payroll's free tier ends at 10 (r2/01) | The first paid step arrives with the first new recurring filing, the ESI contribution |
| 20 | EPF (20 or more); the Grievance Redressal Committee (20 or more workers) | factoHR's free tier ends at 20 (r1/08, a round-one capture no later round re-checked — §21.14 CQ-15); RazorpayX's ₹2,499 tier stops at 20 (r1/01); the six priced vendors bill 50 seats to a firm that now owes ECRs (EV-026) | ECR filing begins as the overcharge share peaks |
| 25 | — | Zoho Payroll Standard includes 25 (r2/01); Kredily Payroll OS runs to 25 (r2/01); HivePayroll's tiers each include 25 (r2/05) | Per-head overage begins on these cards |
| 50 | Crèche (50 or more) | The six priced vendors' blocks are exhausted and per-additional rates begin (EV-026; §21.4); RazorpayX's next tier includes 50 (r1/01) | The overcharge share reaches zero; flat-with-minimum cards stop falling in effective PEPM, greytHR's keeps falling toward ₹45 |
| 100 | Canteen (100 or more) | Keka's archived block ended at 100 (EV-022); RazorpayX's next tier stops at 100 (r1/01); Pocket HRMS Premium's minimum is 100 (r5/03) | — |
| 300 | Standing orders; retrenchment and closure permission (300) | — | A permission, not a filing |

Two things follow. The 10–20 range, where free tiers end and ESI and EPF begin, is where the buyer first pays for anything — which is why §18.6 puts the free tier below 20 and the statutory trigger at 20 at the centre of acquisition. And the 20–50 range is the only stretch where a new recurring filing (the ECR) coincides with a non-zero overcharge share on every priced card — the defined sense in which it is structurally overcharged (§04.4).

#### The overlap, applied to one prospect — qualification and the burden statement

The segment table says where obligation, budget and dissatisfaction overlap; a sales or self-serve surface has to decide it for one firm at a time. Admission — whether a firm may become a tenant — is §05.21's; this is priority and argument, for firms that §05.21 admits.

**The prospect record** (declared by the prospect, verified at onboarding):

| Field | Definition |
| --- | --- |
| `own_roll_headcount` | As §05.11 defines it |
| `pf_codes`, `esi_registered` | PF codes held (count) and whether an ESIC code is held |
| `pt_states`, `lwf_states` | States in which the firm holds a PT or LWF registration |
| `legal_entities` | Count |
| `status_quo` | One of the five options in the status-quo table (§04.1) |
| `current_card` | Vendor and plan, where the status quo is a priced HRMS — priced from the §21.4 register |
| `bureau_fee`, `bureau_scope` | Where a CA or bureau files, recorded as AC-18 requires |
| `renewal_date` | Where the status quo is a priced HRMS |
| `triggers` | The ST-1 to ST-8 events present, with dates (§04.1) |
| `regulated_sector` | Whether the firm is an RBI, SEBI or IRDAI regulated entity — routes to the §17 profile and the AI defaults of Part E-7 |

**Priority rules**, evaluated in order; the first matching row applies:

| # | Condition | Priority | Lead argument | Evidence behind the argument |
| --- | --- | --- | --- | --- |
| Q-1 | Own-roll 1–9 | Decline commercially | — | §05.1 |
| Q-2 | Own-roll 200 or more | Deferred to v2, unless a retained tenant (§05.21 AD-03) | — | §05.4 |
| Q-3 | No PF code, and the obligation engine does not find EPF applicable (own-roll 10–19, or entities each below the rule's count) | Funnel | The statutory trigger at 20 (ST-1); the free tier (§18.6) | EV-057; §05.11 |
| Q-4 | No PF code, but the obligation engine finds EPF applicable | A | ST-1 — the EPF registration prepared for an attended session and the first ECR (§05.11) | EV-057 |
| Q-5 | A PF code held (voluntary coverage) and own-roll 10–19 | B | Attended submission of the ECRs it already owes | Voluntary coverage (r2/05); counted in the sub-20 slice, not the beachhead (U-6) |
| Q-6 | PF code held; own-roll 20–199; PT or LWF registrations in two or more states | A | Maintained multi-state rule tables, each state sourced; attended submission | Greenfield in Frappe HR and TallyPrime (EV-031, EV-032); never claimed against greytHR, which advertises state-specific PT rules (r5/03) |
| Q-7 | PF code held; own-roll 20–49; on a block-priced card; the AC-25 computation shows our bill strictly smaller at their headcount | A | No seat floor, with the computed bills side by side | EV-026; AC-25 |
| Q-8 | PF code held; own-roll 20–199; on a bureau whose per-head equivalent, scope-matched, is at or above our per-head fee | A | Redirect the retainer, with the scope written beside it | AC-18 |
| Q-9 | PF code held; own-roll 20–199; any other status quo | B | Attended submission and the maintained SLA; parity on computation; the seat floor stated per head only, never as a saving (AC-17) | EV-030; K-13 |

A dated trigger raises B to A when its date falls within `trigger_window_days` of qualification (ST-3, ST-4, ST-6, ST-7) — a named parameter with no value until the first quarter of conversion data shows which windows convert; owner GTM; routed to §20 (§20.13, pricing and commercial family). The trigger present at qualification is stored on the record, so §19.7's funnel can attribute conversion to it.

Edge cases the rules must survive:

| Case | Outcome | Why |
| --- | --- | --- |
| Two legal entities of 15 each, no PF code | Q-3, funnel — despite a tenant total of 30 | EPF is evaluated per the rule's scope, not on the tenant total (§05.11) |
| 25 own-roll in one entity, no PF code yet | Q-4: A — the ST-1 case, with registration first | The obligation engine finds EPF applicable at 20 (EV-057) |
| 19 own-roll under voluntary EPF coverage | Q-5: B — the SOM counts it in the sub-20 slice, not the beachhead (U-6) | The funnel rule keys on the obligation, and this firm already files ECRs |
| 45 own-roll, one state, on greytHR Essential | Q-7 fails — ₹5,175 against ₹2,495 at ₹115 — so Q-9: B, led by attended submission | AC-17; AC-25 |
| 25 own-roll, one state, on HROne Basic | Q-7: A — ₹2,875 against ₹4,950 at ₹115 | AC-25 |
| 40 own-roll on Kredily's free plan | Q-9: B — the output and submission layer; parity on computation | EV-029 |
| 60 own-roll, three states, two entities (the §13.19 Profile 2) | Q-6: A; the registration count feeds §18.3's allowance | EV-088 |
| A 30-person prospect on HROne whose §21.4 capture is past its age limit | Q-7 cannot be evaluated (PC-10); the prospect is held at B until the card is re-captured | AC-15; AC-25 |

- **AC-29 (qualification uses evidence, not adjectives).** *(New.)* A prospect's priority comes only from the rules above, evaluated on the prospect record; every lead argument is drawn from the per-rival wedge table, AC-17, AC-18 or AC-25, and carries its evidence reference; statutory applicability is always the obligation engine's evaluation (§05.11, §06.1), never inferred from headcount or the commercial band. Test: the 45-person greytHR case is B, not A, and its script contains no saving claim; the 25-person HROne case is A with the two bills shown.

<!-- DIAGRAM: problem-market-qualification -->

A priority is not permanent. The record is re-evaluated on the events below, each of which the evidence makes observable:

| Event | Guard | Effect on the record |
| --- | --- | --- |
| Declared headcount crosses 10, 20, 50 or 200 | The new figure is recorded with its date | Rules re-run; a crossing of 20 records ST-1 |
| A PF code, PT or LWF registration is added | The registration is recorded | Rules re-run; a second PT or LWF state makes Q-6 apply |
| A dated trigger enters `trigger_window_days` | The trigger's date is on the record | B becomes A while the trigger is in the window; the raise lapses after it |
| A card in the §21.4 register changes (R-39, R-40) | The new capture is dated | The Q-7 comparison is re-computed; A can become B, or B become A |
| The prospect's renewal date passes | — | ST-6 lapses until the next term |
| Onboarding verifies the declared record | Verification recorded (§07) | The record is frozen as the qualification of record; a tenant's later changes belong to §05.11 |

A trigger recorded on the prospect record carries `trigger_id` (ST-1 to ST-8), `trigger_date`, the evidence that dates it (the headcount on a date, a registration's issue date, a renewal date, a statutory due date), and whether it was declared or verified.

**The burden statement.** What a qualified prospect is shown about its own position, composed from this section's parts. Worked for the 60-person Maharashtra-and-Karnataka firm of the one-month example (§04.1), assuming one legal entity, one PF code and one ESIC code, on greytHR Essential, with a CA filing:

| Line | What the statement shows | Built from |
| --- | --- | --- |
| Obligations | TDS with Form 138 and Form 130; the POSH Internal Committee (every employer — EV-056); ESI where the work location is in a notified district; gratuity and maternity benefit; the state-prescribed appointment letter (10 or more workers); EPF; the Grievance Redressal Committee (20 or more workers); a crèche (50 or more — EV-057) | The obligation engine, with counting unit and sphere per obligation (§06.1) |
| Recurring filings a year | 29 central instances — 12 ECR, 12 ESI, 4 Form 138, 1 Form 130 cycle (§22.7's counting rule); 12 Karnataka PT returns if the registration files the monthly Form 5A (r3/02; `pt.KA.return_frequency`); 1 Karnataka LWF remittance, due 15 January (r2/10); Maharashtra PT at the periodicity assigned to the registration (ingested, never derived — r1/06); Maharashtra LWF "not captured" (V-09) | §22.7; §06.4; §06.8 |
| What the software costs today | ₹2,945 a month — ₹49.08 per employee — on greytHR Essential at 60 (§21.4) | The §21.4 register |
| Our price against it | At a ₹115 card: ₹6,900 against ₹2,945 — no saving, and the statement says so | AC-25 |
| What the filing labour costs today | Within the published 51–100 band, ₹8,000–15,000 a month — ₹133.33–250.00 per employee — or the CA's actual fee with its scope, if declared | AC-18 |
| Exposure from one missed month | The §04.1 illustration: ₹3,600 of mandatory interest on a three-month delay of an illustrative ₹1.2 lakh monthly remittance, plus damages at an unverified rate | §04.1, the cost of one missed month |
| Where the argument rests | Q-6 applies (two PT states): maintained multi-state rules and attended submission, with liability staying with the employer | Q-6; K-13 |

A second fixture exercises both price branches in the lower half: a 30-person, single-state Karnataka firm with one legal entity, one PF code and one ESIC code, shown on two status quos.

| Line | On greytHR Essential | On HROne Basic |
| --- | --- | --- |
| Obligations | As the 60-person firm, less the crèche (below 50) | The same |
| Recurring filings a year | 29 central (§22.7); 12 Karnataka PT if monthly Form 5A (`pt.KA.return_frequency`); 1 Karnataka LWF, due 15 January | The same |
| What the software costs today | ₹2,495 a month — ₹83.17 per employee; 40% of the bill buys unused seats | ₹4,950 a month — ₹165.00 per employee; 40% unused |
| Our price against it, at a ₹115 card | ₹3,450 against ₹2,495 — no saving | ₹3,450 against ₹4,950 — smaller by ₹1,500 a month |
| What the filing labour costs today | Within the published 11–50 band: ₹3,000–8,000 a month — ₹100.00–266.67 per employee — or the declared fee with its scope | The same |
| Qualification | Q-9: B — attended submission; the seat floor stated per head only | Q-7: A — the two bills side by side |

- **AC-30 (the burden statement).** *(New.)* Whenever a prospect is shown its burden — in a sales conversation, a self-serve page or the CA console — obligations come from the obligation engine with counting unit and sphere, filing counts from §22.7's counting rule, state cadences only where a sourced row exists, today's software cost and our price through AC-25, and the bureau comparison through AC-18; anything unverified is shown as "not captured", never estimated. Test: a Telangana prospect's PT line reads "slab not captured (V-09)", not a figure; the 60-person statement above shows "no saving" on the price line; the two 30-person fixtures produce the two price branches exactly as tabled.

##### End-to-end fixture — one firm through every rule in this section

The rules in §04 are specified separately and interact: units of account decide what a share counts, qualification decides the argument, the burden statement decides what the prospect sees, and the comparison rules decide what may be said about price. A single fixture run end to end is the only way to catch a change in one rule that breaks another. Fixture A is the multi-entity, multi-state case, chosen because it exercises every refusal the section defines; the two 30-person firms above are Fixture B and C for the single-entity price branches.

**Fixture A — inputs.** One tenant, two legal entities, each with its own PAN and TAN.

| Field | E1 | E2 |
| --- | --- | --- |
| `own_roll_headcount` | 55 | 35 (tenant total 90) |
| `pf_codes` | P1 | P2 |
| `esi_registered` | Yes | Yes |
| `pt_states` | Maharashtra | Karnataka; Telangana (a site with its own registration) |
| `lwf_states` | Maharashtra | Karnataka; Telangana |
| `status_quo`, `current_card` | A priced HRMS — greytHR Essential | The same, billed separately |
| `bureau_fee`, `bureau_scope` | One CA files for both entities; fee declared for the engagement as a whole, scope: ECR upload, ESI challan, PT returns, quarterly Form 138 | — |
| `triggers` | ST-2 (the Telangana registration opened this year), with its date | — |
| `regulated_sector` | No | No |

**Expected outputs, rule by rule.** A change to any §04 rule re-runs this table and restates the cells it moves.

| # | Rule | Expected output | Governed by |
| --- | --- | --- | --- |
| FX-1 | Units of account | 2 PF codes, not 1 tenant and not 2 legal entities (U-4); 1 logo | AC-19 |
| FX-2 | Band split for the share report | P1 in EPFO's 50–199 band by its own 55 members; P2 in 20–49 by its 35 — the tenant's `commercial_band` is 50–199 on 90 own-roll, and the two are never reconciled by relabelling either (U-12) | AC-19; §05.11 |
| FX-3 | Share numerator | 2, if each code has at least one ECR instance at FILED in the financial year; if P2 files only NIL months it contributes 0 and the report records U-7 as the reason | AC-19; §08 FR-PAY-711 |
| FX-4 | Qualification | Q-6, priority A — PT registrations in three states. Q-7 is never reached: the rules are evaluated in order and Q-6 matches first, which matters here because Q-7's comparison would be refused anyway (FX-8) | AC-29 |
| FX-5 | Lead argument | Maintained multi-state rule tables, each state sourced, plus attended submission — greenfield in Frappe HR and TallyPrime (EV-031, EV-032), never claimed against greytHR, which advertises state-specific PT rules (r5/03) | AC-13; AC-29 |
| FX-6 | Obligations | Evaluated per entity on each rule's own counting unit and sphere by the obligation engine, never on the tenant total of 90 — the same rule that sends two entities of 15 to the funnel (§04.4, edge cases). The crèche threshold of 50 (EV-057) is evaluated separately for E1 and E2, and the engine's evaluation governs, not this arithmetic | AC-30; §06.1 |
| FX-7 | Recurring filings a year | 58 central instances — 29 per TAN, and a TAN belongs to a legal entity (§04.2, units of account): 12 ECR, 12 ESI, 4 Form 138, 1 Form 130 cycle each. Karnataka PT at the registration's frequency (`pt.KA.return_frequency`; 12 if the monthly Form 5A applies), Maharashtra PT at the periodicity the department assigns the registration — ingested, never derived. Karnataka LWF once, due 15 January | AC-30; §22.7 |
| FX-8 | Price comparison | Refused as PC-15 — the register does not record whether greytHR's card prices each legal entity separately, so a two-entity bill is not computable. The refusal is logged against the §21.4 row as a missing required field | AC-25 |
| FX-9 | Composed cost view | Internal only (our card is unpublished, CV-4) and per entity summed (CV-6) — which FX-8 blocks, so the view is refused under CV-3 until the register records the per-entity basis | AC-35 |
| FX-10 | Not-captured lines | Telangana PT: "slab not captured (V-09)". Maharashtra and Telangana LWF: "not captured". No figure is estimated for any of the three | AC-30 |
| FX-11 | Seat-floor statement | Stated per head only: at 55 and 35 own-roll, E2's card carries an overcharge share of 30% and E1's zero — and neither is presented as a saving | AC-17; MC-16 |
| FX-12 | Trigger handling | ST-2 is stored with its date and its evidence (the registration's issue date); it raises nothing until `trigger_window_days` has a value, and §19.7 attributes any conversion to it | AC-29 |
| FX-13 | SOM contribution | 2 PF codes into the SOM's unit; never 1 tenant, never 90 seats into any share figure | AC-19; §04.2 |
| FX-14 | Re-evaluation | Adding a fourth PT state re-runs the rules and changes nothing (Q-6 already applies); E2 crossing 50 own-roll moves its card's overcharge share to zero and re-runs FX-11 | AC-29; AC-36 |

<!-- DIAGRAM: problem-market-fixture-walk -->

Parameters the fixture touches, none of which it may resolve: `pt.KA.return_frequency`, `pt.<state>.slabs` for Telangana, `lwf.<state>.*` for Maharashtra and Telangana, `trigger_window_days`, and `pf_codes_per_tenant` — which this fixture would contribute a single observation to (2) once the tenant is real, and which stays UNMEASURED until our own base exists (§04.5).

What the fixture is designed to catch, stated as the failures it would surface:

| Failure it catches | How it shows up |
| --- | --- |
| A share figure quietly counting tenants | FX-1 returns 1 instead of 2 |
| The commercial band leaking into the EPFO band split | FX-2 puts both codes in 50–199 |
| Qualification evaluated out of order | FX-4 returns Q-7 and then fails on FX-8's refusal |
| A filing count derived from the tenant rather than per TAN | FX-7 returns 29 instead of 58 |
| A comparison computed despite a missing register field | FX-8 emits a number |
| An unsourced state row filled with an aggregator figure | FX-10 shows a Telangana slab |
| The seat floor stated as a saving | FX-11 emits "cheaper" |

- **AC-37 (the fixture is the section's integration test).** *(New.)* Fixture A and the two 30-person fixtures are run against every change to a §04 rule, criterion, approved form or parameter state before the change is accepted; the expected-output table is restated in the same change; and a change that moves a cell without restating it does not ship. A new rule that no fixture exercises comes with the fixture row that does. Test: adding a qualification rule between Q-5 and Q-6 without re-running FX-4 fails; a change to §22.7's counting rule that moves FX-7 from 58 and restates it passes.

#### The whitespace, stated as a position not a vacuum

The competitive-map diagram places the field on two axes that the beachhead buyer actually feels: **how far the product carries the filing** (computes only → generates portal-ready artefacts → attended submission under written authority, with a remedy-capped SLA) against **evaluability by a 30-person buyer** (sales-led/opaque → self-serve with a published INR price card). Reading the field on those axes rather than on "features" is what makes the whitespace legible:

| Position | Who sits here | Why it is not where we win / lose |
| --- | --- | --- |
| Computes + self-serve, outputs charged | Kredily, Zoho (EV-029); Frappe HR, OSS with no Indian statutory artefact (EV-031) | The zero-priced floor. Statutory *computation* is table stakes here and priced at zero. Not a moat. |
| Generates artefacts + published price | greytHR, Qandle, Pocket HRMS, Zimyo, HROne (EV-027); TallyPrime (artefacts in the licence, EV-032) | Generation only — none claims to submit (EV-030) — and each of these SaaS cards bills a 50-employee minimum block (EV-026). |
| Generates artefacts + sales-qualified | Keka — live card suppressed (EV-021, EV-024); enterprise suites, whose filing scope is not in the evidence base | Not evaluable from a published card by a buyer who will not sit through a demo (AC-14); enterprise is arithmetically closed to the beachhead (§01, §05.2). |
| Outsourced filing + demo-sold | MYND/Qandle — the only bundle pairing self-serve HRMS with an outsourced filing operation, unpriced (EV-030, EV-034) | The nearest occupant of the target corner, but unpriced and sales-led. |
| **Attended submission + self-serve, no seat floor** | **Target position — currently thin** | Portal-accepted artefacts + attended, assisted submission under written authority + CA console + employee surface, on a *published* per-head INR card. No vendor in the priced set claims to submit anything (EV-030) — which is what makes attended submission a real differentiator (K-13). The employer's liability stays non-delegable, and the legality of the attended step is under counsel review (§23). |

Two disciplines keep this honest and prevent it collapsing back into the "vacuum" error the PRD explicitly killed (§01):

- **The corner is thin, not empty.** The r5 sweep read pricing, payroll and feature pages, not product documentation or a live tenant, so the absence of a submission claim is strong evidence of positioning, not proof of absent capability (EV-030). MYND/Qandle's outsourced filing operation already sits next to the corner.
- **The axes are chosen because they are the buyer's, not ours.** "How far the product carries the filing" is the Pain-1/Pain-3 axis (the obligation and the black box); "self-serve/price-card" is the decision-anatomy axis (the admin user has no time budget, AC-14). A whitespace on axes the buyer does not feel is a marketing artefact; this one is grounded in §04.1's pains.

The single falsifiable risk to the position: MYND prices and self-serves its filing operation for 20–200, or a priced vendor adds submission — either occupies the target corner and narrows the wedge to execution quality, no seat floor and CA-channel depth. AC-15 keeps every such claim dated and re-captured.

<!-- DIAGRAM: problem-market-competitive-map -->

#### The two structural risks to the market position

Both are already in the PRD's risk register; they belong here because they threaten the *sizing*, not just execution:

- **Zoho widens its free gates.** If Zoho Payroll's ₹0 ceiling moves from 10 to 25 or 50 employees, the bottom of the beachhead is zero-priced and SAM re-anchors upward to 50–200 (§20 R-1). Observable trigger: the Zoho pricing page's headcount ceiling changes. This is a *when*, not an *if* (§18). Quantified impact: if the beachhead floor moves from 20 to 50, the establishment count in the paid band falls (20–49 is the most populous sub-band — 5,25,246 of the fit's 7,24,373, r2/09) and SAM re-centres on fewer, larger accounts at higher PEPM — the model does not collapse, but it *shifts shape*, and the §04.3 grid must be re-run on the 50–200 sub-band (the re-run follows this list).
- **Fintech-subsidised HRMS.** A neobank/card issuer acquires an HRMS and zero-prices it to win the payroll-to-bank-account flow (Jupiter/sumHR precedent, in which the software asset was valued at ~₹7.5 Cr — r2/00). Defence is attended submission, maintained rules and switching cost, never price (§20 R-6). Observable trigger: a fintech acquires or launches a zero-priced payroll product with bank-payout as the funnel. Inside the existing field, RazorpayX is the vendor that already fits the pattern — a fintech parent and a bank-payout distribution motive (r1/01).

##### The R-1 case re-run — the beachhead without its lower half

If the free gate reaches 50 and the paid band becomes 50–199, the sizing re-runs on the fit's 50–199 row alone (scenario SC-50UP; [Hypothesis — fit-based upper case]):

| Measure | Whole beachhead on the fit (20–199) | 50–199 only | Change |
| --- | --- | --- | --- |
| Establishments | 7,24,373 | 1,99,127 | −72.5% (the 20–49 half: 5,25,246) |
| Contributing members | 3,34,35,390 | 1,76,78,824 | −47.1% (the 20–49 half: 1,57,56,566) |
| Mean members per establishment | 46.16 | 88.78 | ×1.92 (the 20–49 half: 30.0) |
| SAM at ₹80 / ₹115 / ₹150 (members × PEPM × 12) | ₹3,209.8 / 4,614.1 / 6,018.4 Cr | ₹1,697.2 / 2,439.7 / 3,182.2 Cr | −47.1% (the 20–49 half: ₹1,512.6 / 2,174.4 / 2,836.2 Cr) |
| 1.0% of establishments, seats at the band's fitted mean, ₹115 | 7,244 establishments; ₹46.1 Cr ARR | 1,991 establishments; ₹24.4 Cr ARR | −47.1% |

(Derived from the r2/09 fit's 50–199 row. The 1.0% row multiplies 1% of members by ₹115 × 12, which equals 1% of establishments at the fitted mean.)

Establishments fall by nearly three-quarters, members — and with them SAM and a share-based SOM — by under half: the model shifts shape rather than collapsing, as the Zoho bullet above says. The seats per land nearly double, so each land is worth more while the number of lands needed falls. Two consequences for this section: the unused-seat pool (AC-24) stops being our argument in that scenario, because the free gate, not our card, removes the block below 50; and the 20–49 half's remaining value to the plan is as a funnel into 50–199 (§05.1's graduation test), not its own ARR.

##### Acceptance criteria — competitive posture

- **AC-13 (no falsifiable advantage claim).** No collateral claims feature advantage against Zoho, gross-to-net advantage against Frappe (EV-031), or a generic "more complete India compliance" (§20 R-7). Competitive claims are confined to what dated evidence supports — Frappe's and Tally's named statutory gaps (EV-031, EV-032), seat floors (EV-026), the absence of any published submission claim (EV-030) — plus our attended submission, maintained SLA, CA console and employee surface. No collateral says a competitor's published data is wrong (§21).
- **AC-14 (price-card transparency).** A self-serve, per-head INR price card with no seat floor is published — Keka suppresses its live card (EV-021, EV-024) and all six priced competitors in the EV-026 set bill a 50-employee minimum block (EV-026) — and it is the only way to be evaluable by a 30-person buyer who will not sit through a demo (§18).
- **AC-15 (dated competitor claims).** Every competitor fact in this section carries a capture date and says whether the product was executed or only its pages, documentation or code were read; each is re-captured before external use. **[Reversed]** the v0.3 Keka gate ("no claim is final until the rendering-browser sweep") — the rates were obtained by raw-HTML fetch (EV-021–025).
- AC-17 (headcount-specific price claims) is stated with the seat-floor arithmetic above and belongs to this set.

### 04.5 What this section commits, and what it gates

**Committed (build the plan on these):**

- The denominator is **7,66,254 contributing establishments** (EV-001). Never registered (24.18 lakh), never Udyam (5.31 crore).
- Revealed current spend is **₹2,100–3,900 Cr/yr** software — verified inputs, modelled gross-up (EV-005) — plus a bureau pool anchored on one provider's published indicative range (₹3k–15k/mo; realised price unvalidated, V-01). The modelled whole-market ceiling is **₹9,013–10,905 Cr** (0–10% roll-forward; ₹10,126 Cr central — r2/09); the 10% figure is ₹10,905 Cr, not ₹12,250 Cr.
- Price is a **two-anchor structure** (K-09, EV-027): a value floor near ₹50 PEPM and a mid-market clearing band of ₹80–200; the ₹80–150 modelling band sits inside it.
- The share calibration for sanity-checking any SOM is **greytHR's ≈3.9%** (30,000+ companies claimed, September 2026 — EV-091). A 3-yr SOM above low-single-digit penetration of the beachhead is rejected on sight.
- The competitive advantage is **no seat floor + portal-accepted artefacts with attended, assisted submission under written authority + multi-state PT/LWF (greenfield in Frappe HR and TallyPrime — EV-031, EV-032; not claimed as an advantage over greytHR, which advertises state-specific PT rules — r5/03) + maintained SLA, CA console and employee surface**. The employer's statutory liability stays non-delegable; attended-filing legality is under counsel review (§23). Parity on computation vs Zoho and Kredily; deferred vs enterprise suites.
- The statutory engine must satisfy AC-1 through AC-9, including the AC-4a and AC-6a–AC-6d sub-tests, plus AC-16 (dual wage base, effective-dated rules, deterministic numbers, unnotified ceilings held open, single record, closed seams, audit trail) — these are the product's reason to exist, not enhancements.
- The market arithmetic is governed, not quoted: share claims are counted in PF codes with both years stated (AC-19); the beachhead count changes only on a source meeting AC-20; the spend is always read through the penetration × price identity (AC-21); every figure reproduces from the versioned sizing model (AC-22) and reads its inputs' states (AC-27); the bureau pool and the unused-seat pool travel with their assumptions (AC-23, AC-24); band-level adoption is stated only as an upper bound on a named card (AC-34); scoreboard membership follows AC-26; and every named-vendor price comparison comes from one computation (AC-25), with bureau comparisons scope-matched (AC-18) and the two cost lines composed only in the two-branch form that claims neither (AC-35). Card changes restate rather than re-argue (AC-36), and every rule change re-runs the section's fixtures (AC-37).

**Gated (no financial model may harden these until §20 reports):**

| Open question | Current placeholder | Kill / validation criterion | §20 ref |
| --- | --- | --- | --- |
| Beachhead establishment count (20–200) — `beachhead_sub20_share` | Unmeasured; ≤7.24 lakh on the r2/09 fit; 1.8–2.6 lakh scenarios ([Reversed] as an estimate) | A measured contributing-by-headcount count; EPFO's Appendix-2(v) is registered-by-accounts and cannot settle it alone (AC-12) | Desk validation — the EPFO request route and its acceptance test (§04.2, AC-20) |
| Realised bureau/CA price | ₹3k–15k/mo one provider's published indicative range; median unknown | Mystery-shop 6–8 CAs, 2 city tiers | V-01 |
| Bureau usage rate in beachhead | assumed material | Tally-payroll-adoption + buyer survey | V-02 |
| Penetration vs discounting behind the ₹23.7–44.1 per member-month implied spend | Penetration reading leans ahead on greytHR evidence only | Status-quo distribution (V-02); realised vs list (V-03) | V-02, V-03 |
| Realised ARPU vs list | List anchors verified (EV-027); ₹80–150 modelling band [Hypothesis] | Buyer/reseller interviews, won-deal figures | V-03 |
| Avg billable seats per beachhead account | held at 55 for the grid (fit mean ~46) | Won-deal seat sizes | V-03 |
| State PT/LWF slab dataset | PT read at primary for Maharashtra and Odisha (Odisha's levy status open — reported repeal unconfirmed, r1/06), Karnataka's February structure corroborated (r2/10, EV-014); Telangana to registration wording only (r2/05); every other state and every LWF rate [Hypothesis] | Gazette-sourced per-state dataset | V-09 |
| Unnotified Code-era figures — gratuity payable ceiling, bonus eligibility and calculation ceilings, EPF and ESI damages scales, the 2025-Act TDS late-fee section | Parameters with no silent default (AC-16); legacy figures only on recorded operator confirmation | Notification capture with a corrigendum check (§02.4) | §20 statutory desk validation, with the §06.13 register |
| Keka pricing residuals | Card obtained (EV-021–025) — [Reversed] the v0.3 "TLS-blocked" status; open: the block size behind the ₹6,999 floor, the unquantified setup fee (EV-025), AI as tested rather than claimed (EV-090) | Sales quote; product trial | Desk / commercial validation |
| Units of account — `pf_codes_per_tenant`, `seats_per_contributing_member` | Unmeasured; SOM stated in PF codes only; the fit-row SAM sets seats per member at 1.0 | Measured from our own tenants' registrations, ECR lines and billing (§04.2) | Commercial validation after launch (§20.13, pricing and commercial family) |
| Whether EPFO's contributing count includes exempted establishments — `exempted_in_contributing_count` | Exempted codes excluded from our share numerator and flagged (U-10) | Read the definitions in the EPFO Annual Report at the next re-pull | Desk validation, owner Research |
| Qualification timing — `trigger_window_days` | No value; dated triggers raise nothing until it is set | The first quarter's conversion data by trigger (§19.7) | Commercial validation, owner GTM |
| The tighter band-adoption bound — `restricted_set_gross_up_share` | Not computable; only the loose bound on the whole filed set is published (AC-34) | IN-12 re-derived over a filed set with the enterprise-weighted filers removed | Desk validation at the next filing cycle, owner Research |

#### Market parameters as governed state

The gated table lists what is open; this is how an open item moves, so that a model can check mechanically whether it may use a value. Every market parameter in this section is in exactly one state.

<!-- DIAGRAM: problem-market-parameter-lifecycle -->

| From | Event | Guard | Side effect | Who may trigger |
| --- | --- | --- | --- | --- |
| — | Parameter named | It has an owner and a §20 route (§20.13) | Enters the input register (§04.3) as UNMEASURED, with no value | Section owner |
| UNMEASURED | A bounded range is adopted | Each bound traces to a source or a shown derivation | → SCENARIO; every use carries the "scenario" label; the range enters the gated table | Section owner, with a reviewer |
| UNMEASURED or SCENARIO | The §20 study reports and meets its pass criterion | The evidence class permits measurement (next table); method, sample, date and owner recorded; for the beachhead count, AC-20 | → MEASURED; the model is re-versioned and every dependent figure restated (AC-22); the claim-ledger row is re-graded | Study owner, with a reviewer |
| SCENARIO | A directional study reports without firing its kill criterion | The pre-registered pass and kill thresholds were filed before the data (§20.6) | Stays SCENARIO; the range may narrow to what the study observed, labelled "directional"; the study record is linked | Study owner, with a reviewer |
| SCENARIO | A directional study fires its pre-registered kill criterion | The same | → KILLED for the killed range (a narrower range may survive as SCENARIO); the consequence named in the kill criterion runs | Study owner, with a reviewer |
| MEASURED | A refresh trigger fires — a new EPFO Annual Report, a changed vendor card, a capture past its age limit (§21.12 CLR-10), a new filing cycle | — | → STALE; dependent figures flagged; external use blocked until refreshed | The watch, automatically, or the owner |
| STALE | Re-pulled | A new capture or reading recorded with its date | → MEASURED; dependent figures restated as above | Owner |
| MEASURED | Shown to come from another universe or unit, or to be a model output | The reviewer records the reason | → SCENARIO with a [Reversed] marker — the 41,881 regrade is the worked case (§04.2) | Reviewer |
| Any | A primary source contradicts it | The reviewer records the source | → KILLED; §02 registers the kill row (this section mints no EV IDs); the value joins §20.4's banned list | Reviewer, through the §02 owner |

Which evidence may move a parameter where. A small-N field study is falsification, not estimation (§20.6); a government statistic can measure a market; our own instrumentation can measure only our own base.

| Evidence class | Example in this section | May make MEASURED | May narrow a SCENARIO | May KILL |
| --- | --- | --- | --- | --- |
| Government statistic, read at source | EPFO Annual Report; the AC-20 crosstab | Yes — for the universe it counts | Yes | Yes |
| Filed financial statement | MCA/ROC filings; Ramco's audited report | Yes — for that entity's revenue | Yes — IN-12's share band, once more filings land | Yes |
| Vendor's own page, dated | Rate cards (IN-18); customer claims (IN-10) | Yes — for that vendor's list price or its claim, as a claim | — | Yes, for our reading of it |
| Directional field study (N of 6–30) | V-01 quotes; V-03 data points; V-05 interviews; V-02 partner interviews | No market-level parameter | Yes, labelled "directional" | Yes, on its pre-registered kill criterion |
| Our own instrumentation | Registrations, ECR lines and billing of our tenants | Yes — for our own base only (IN-20) | — | — |
| Model output | The r2/09 fit | Never | It *is* a scenario | — |

The machine is not hypothetical: this section's own history exercised most of its transitions.

| Parameter | What happened | Transition |
| --- | --- | --- |
| Contributing establishments above 200 | v0.3 carried 41,881 as an EPFO Appendix-2(v) count, [Verified]; it is a Pareto-fit output (r2/09) | MEASURED → SCENARIO, [Reversed] |
| `beachhead_sub20_share` | v0.3 used an assumed ~65% as though it were known, to produce 1.8–2.6 lakh; no source supported it | Re-entered as SCENARIO (64–75%), [Reversed] as an estimate; awaits AC-20 |
| greytHR's customer claim | "34,000" was carried as a fixed figure; the current claim is "30,000+" | MEASURED → STALE → MEASURED, dated (K-16) |
| The 10% roll-forward ceiling | ₹12,250 Cr was an arithmetic slip; the figure is ₹10,905 Cr | The value KILLED (EV-K11); the parameter stays SCENARIO |
| Keka's price card | "TLS-blocked, unobtainable" | The unknown resolved — the card was captured by raw fetch (EV-021–025) and entered MEASURED (K-10) |

What a financial model may do with a value in each state:

| State | In a model | In an external document |
| --- | --- | --- |
| UNMEASURED | Never | Never — the parameter's name and its route may be shown |
| SCENARIO | Only in a labelled scenario row, never as the base case | Only as a range, with its label and its §20 route |
| MEASURED | Yes | Yes, with source and date |
| STALE | Only in a restatement run | No |
| KILLED | Never | Only as a [Killed] entry |

The section's parameters, in their states on 11 September 2026:

| Parameter | State | Value or range carried | Leaves its state when |
| --- | --- | --- | --- |
| Contributing establishments (IN-01) | MEASURED | 7,66,254, FY2023-24 | EPFO publishes its 2024-25 Annual Report (→ STALE) |
| Share calibration (IN-10) | MEASURED, dated | 30,000+ companies, September 2026 | The capture ages out or the claim changes |
| Vendor entry cards (IN-18) | MEASURED | EV-027 | Any card changes (R-39, R-40) |
| Contributing establishments above 200 (IN-04) | SCENARIO | 41,881–1,73,250 | AC-20 |
| `beachhead_sub20_share` (IN-06) | SCENARIO | 0% on the fit; ~64–75% in the scenarios | AC-20 |
| Average billable seats (IN-07) | SCENARIO | 55; the fit's mean ~46 | V-03 narrows it (won-deal seat sizes, directional); MEASURED for our own base only, from billing after launch |
| Modelling PEPM (IN-08) | SCENARIO | ₹80–150 | V-01 or V-03 can kill or narrow it; our own realised price becomes MEASURED from our billing after launch |
| Gross-up share (IN-12) | SCENARIO | 35–65% | Filings for the unmeasured vendors narrow it |
| Roll-forward (IN-14) | SCENARIO | 0–10% a year | Retired when IN-01 refreshes |
| `bureau_median_fee_monthly` (IN-15) | SCENARIO | ₹3,000–15,000 published; ₹6,000 illustrative | V-01 can kill or narrow it; no route to a measured market median |
| `bureau_usage_share` (IN-16) | UNMEASURED | — (100% in the illustration only) | V-02 can bound it (directional) |
| `software_penetration_share` (π) | UNMEASURED | 12–90% implied, depending on price (§04.3 identity) | V-02 can bound it; with V-03, it decides the reading (§04.3) |
| `pf_codes_per_tenant`, `seats_per_contributing_member` (IN-20) | UNMEASURED | — | Our own tenant base exists (§04.2 units of account) |
| `exempted_in_contributing_count` | UNMEASURED | — | The desk read of EPFO's definitions |
| `restricted_set_gross_up_share` | UNMEASURED | — (the tighter band bound is reported "not computable") | IN-12 is re-derived over the restricted filed set |

- **AC-27 (models read the state).** *(New.)* Every input a sizing, pricing or funding model reads carries its state from the tables above; the model refuses an UNMEASURED input, uses a SCENARIO input only in labelled scenario rows, and blocks external publication of any figure that depends on a STALE input. A state changes only through the transitions tabled, each logged with who, when and why. Test: a funding model whose base case uses `beachhead_sub20_share` = 70% without the scenario label fails; the same row labelled "scenario — AC-20 open" passes.

Test scenarios for the lifecycle:

| # | Given | Then |
| --- | --- | --- |
| LC-1 | EPFO publishes its 2024-25 Annual Report | IN-01 goes STALE; external use of every dependent figure is blocked; the refresh runbook starts at RF-1 |
| LC-2 | V-01 records one credible all-in quote with filing of ₹1,500 a month at 50 employees | The kill fires: the modelling band is re-anchored (§18) and IN-15's range above the quote is KILLED; the parameter stays SCENARIO |
| LC-3 | V-01 passes — 6 of 8 quotes at ₹2,500 a month or more, filing included | IN-15 stays SCENARIO, narrowed to the quoted range and labelled "directional"; it never becomes MEASURED |
| LC-4 | An EPFO crosstab meets AC-20 (a)–(d) | IN-04, IN-05 and IN-06 go MEASURED; SC-MEASURED becomes every base case; SC-1.8 to SC-2.6 are retired |
| LC-5 | A source meets AC-20 (a)–(c) but its bands do not sum to the Annual Report total | It enters as a bound: IN-06 stays SCENARIO with a narrower range |
| LC-6 | greytHR changes its headline customer claim | IN-10 goes STALE, is re-captured with its date and returns to MEASURED; every share-ceiling figure is restated |
| LC-7 | A reviewer finds a model output carried as [Verified] | It moves to SCENARIO with a [Reversed] marker and the reason recorded |
| LC-8 | A funding model reads `bureau_usage_share` in its base case | Refused — the parameter is UNMEASURED |

#### Parameters this section names — the routing register

§20.13 requires every parameter a section routes to §20 to belong to one family, with its route and owner. The parameters introduced or carried in §04:

| Parameter | Meaning | Owner | Route | §20.13 family |
| --- | --- | --- | --- | --- |
| `beachhead_sub20_share` | Share of the fit's 20-and-above residual that actually sits below 20 | Research | AC-20's EPFO route (desk) | Pricing and commercial (as listed there) |
| `bureau_median_fee_monthly` | The market median all-in bureau fee at a given headcount (IN-15) — bounded, never measured | Founder / GTM | V-01 (kill or narrow only) | Pricing and commercial |
| `bureau_usage_share` | Share of beachhead establishments whose filing runs through a CA or bureau (IN-16) | GTM | V-02 (bound only) | Pricing and commercial |
| `software_penetration_share` | π in the spend identity — share of contributing members on paid HRMS software | GTM | V-02 (bound); read with V-03 | Pricing and commercial |
| `pf_codes_per_tenant` | PF codes per tenant in our own base | Product | Our instrumentation after launch | Pricing and commercial |
| `seats_per_contributing_member` | Billable seats per contributing member in our own base | Finance | Our instrumentation after launch | Pricing and commercial |
| `exempted_in_contributing_count` | Whether EPFO's contributing count includes exempted (own-trust) establishments | Research | Desk read of the EPFO Annual Report | Pricing and commercial |
| `restricted_set_gross_up_share` | The share of India HRMS software spend represented by the filed set once enterprise-weighted filers are removed — the input the tighter band bound (AC-34) needs and IN-12 cannot supply | Research | Desk re-derivation at the next filing cycle | Pricing and commercial |
| `trigger_window_days` | How close a dated trigger must be to raise a prospect's priority (§04.4) | GTM | The first quarter's conversion data | Pricing and commercial |
| `gratuity.ceiling`, `epf.damages_scale`, `esi.damages_scale`, `epf.admin_charge.minimum`, `bonus.set_on_off_years`, `pt.OD.true_up_month`, `pt.KA.return_frequency`, `pt.<state>.*`, `lwf.<state>.*`, `tds.standard_deduction.<regime>`, `tds.penalty.statement_default`, `tds.penalty.certificate_delay` | Carried from §06 for the Pain 1 worked examples; defined there | Statutory | V-09, V-20, V-21 | Central labour, state PT and LWF, and tax reference values |

None carries a value in this section beyond a labelled scenario or a dated source; each enters the model only through the lifecycle above.

#### Study results as model inputs — the records each study returns

§20.6 says how each study is run. This says what its result must look like for the sizing model to ingest it, what the model derives from it, and which inputs it may move under the evidence classes above. A result that does not fit its record is kept, marked rejected with the reason, and not ingested.

**V-01 — one record per quote.**

| Field | Content | Validation |
| --- | --- | --- |
| `quote_id`, `captured_on`, `verbatim_ref` | Identifier; date; pointer to the verbatim note (§20.6 requires the quote verbatim with date and city tier) | All required |
| `provider_type` | CA or payroll bureau | Required |
| `city_tier` | Class A metro or Class B city, per §20.6's list | Required |
| `headcount_quoted` | 20, 50 or 100 | One of the three |
| `monthly_fee`, `setup_fee` | ₹ as quoted; setup fee or "none stated" | Required |
| `returns_in_scope` | Any of ECR generation and upload, ESI challan, PT return, quarterly Form 138 | Required — a quote without scope is excluded from the pass/kill evaluation |
| `submission_included` | Yes, no or unclear — who uploads | Required |
| `liability_answer` | The verbatim answer to "who is liable for a late or rejected filing" | Verbatim |
| `pricing_basis` | Flat or per payslip | Required |
| `arrears_and_joiners` | The verbatim treatment of arrears and mid-year joiners | Optional |

Derived: the per-head equivalent by the §04.1 arithmetic; the pass, marginal or kill result under §20.6's pre-registered thresholds, computed only over quotes at 50 employees with filing in scope. May move: IN-15 (narrow or kill — never MEASURED); IN-08 (kill fires the re-anchor); the scope fields feed AC-18 comparisons.

**V-02 — one record per respondent.**

| Field | Content | Validation |
| --- | --- | --- |
| `respondent_type` | Tally partner or employer | Required |
| `partner_enablement_estimate` | The partner's estimate of the share of its clients running Tally payroll, with the stated basis | Partners only; basis required |
| `status_quo` | One of the five options in the §04.1 status-quo table; a priced HRMS is named | Employers only |
| `tally_payroll_enabled` | Yes, no or unknown | Employers on TallyPrime |
| `own_roll_headcount`, `pf_code_held`, `pt_states` | As reported | Employers only |
| `bureau_fee`, `bureau_scope` | Where a bureau or CA files | As AC-18 requires |
| `captured_on` | Date | Required |

Derived: the enablement estimate with N, method and dispersion (§20.6's deliverable); the status-quo mix by headcount band, labelled directional. May move: IN-16 and π (bound only); §21.2's choice of which job we take.

**V-03 — one record per data point.**

| Field | Content | Validation |
| --- | --- | --- |
| `vendor`, `plan` | As in the §21.4 register | Must match a register row |
| `headcount` | Billed headcount | Required |
| `list_bill` | The vendor's bill at that headcount from its card on the data point's date, by the AC-25 computation | Computed, never keyed in |
| `realised_bill` | The bill actually paid | Required |
| `discount_drivers` | Annual prepayment, multi-year term, headcount commitment or other — verbatim | Required |
| `source_type` | Buyer, reseller or won-deal record | Required |
| `captured_on` | Date | Required |

Derived: realised ÷ list for each point; the pass, marginal or kill result under §20.6 (within 15% of list across at least 10 points passes; 30–40% below kills). May move: IN-08 (narrow or kill); the identity's reading (§04.3); IN-07 (won-deal seat sizes, directional).

**The AC-20 route — one record per band.**

| Field | Content | Validation |
| --- | --- | --- |
| `as_on_date`, `source_ref` | EPFO's date and the document or letter reference | Required |
| `band_lower`, `band_upper` | Current contributing members | Contiguous and non-overlapping across records |
| `contributing_establishments`, `contributing_members` | Per band | Sum to the Annual Report's totals for the same date, or the difference is explained (AC-20 d) |

May move: IN-04, IN-05 and IN-06 to MEASURED; the fit is then retired from every base case and kept only as a comparison.

**Our own base — computed monthly, not surveyed.**

| Field | Content | Source |
| --- | --- | --- |
| `tenant_id`, `month` | — | Billing |
| `pf_codes_active`, `pf_codes_filed_in_fy` | Codes held; codes with at least one FILED ECR in the financial year to date | §14 `Registration`; §08 FR-PAY-711 |
| `own_roll_headcount_month_end`, `billable_seats` | As §05.11 and billing define them | Core master; billing |
| `ecr_member_lines` | Members on the month's FILED ECR | The filed artefact |

May move: IN-20 to MEASURED for our base; the AC-19 numerator.

Rules for every record: it carries its study's pre-registration reference (§20.6), and a record captured before the thresholds were filed is not evaluated against them; the model store holds business names and figures, never an individual's contact details, which stay with the study owner; and every ingestion is logged as record → parameter → transition → model version.

- **AC-31 (study results enter through records).** *(New.)* The sizing model ingests a study result only through the records above; each ingested record changes a parameter only through a transition its evidence class permits (§04.5); and the ingestion log lets a reviewer go from any §04 figure to the records that moved its inputs. Test: a V-01 result entered as "median quote ₹4,000" with no per-quote records is rejected; eight V-01 records with scope fields are ingested, evaluated and logged.

#### Re-scoping rules — what the sizing does when the studies report

The kill criteria in this section are scattered by topic; their combinations decide which scenario becomes the base case. §20.11 holds the whole-thesis kill conditions; these are the sizing-level responses, pre-agreed so that the moment a result lands is not the moment of the argument.

| Outcome | What it sets | The sizing then | And |
| --- | --- | --- | --- |
| AC-20 met, count near the fit's 7,24,373 | The count | SC-MEASURED at the measured count | The SOM grid scales with it — about 3.3× the 2.2-lakh rows |
| AC-20 met, count between ~1.5 lakh and the fit | The count | SC-MEASURED at the measured count | SC-1.8, SC-2.2 and SC-2.6 are retired |
| AC-20 met, count below ~1.5 lakh | The count | SC-MEASURED at the measured count | The 200–2,000 expansion is pulled forward (the §04.3 note's kill criterion) |
| V-03 passes | The price | PEPM unchanged | The ₹80–150 band keeps its list support |
| V-03 marginal — realised 15–30% below list | The price | Every grid re-run at PEPM × 0.70–0.85 | SOM ARR scales in proportion |
| V-03 kill — realised 30–40% below list | The price | PEPM re-based toward the ~₹50 value floor | R-9 fires; every ARR figure is restated |
| R-1 fires — Zoho's free gate reaches 50 | The band | SC-50UP | The unused-seat pool leaves the argument (§04.4, the R-1 re-run) |
| §05.1's graduation test fails — under 25% of 20–49 lands cross 50 within 12 months | The band | SC-50UP for revenue; 20–49 kept as a funnel only | §05.1's commercial floor moves to 50, the same response as R-1 |

Outcomes that set different things combine: the count, the price and the band are each set by their own row. Two outcomes that set the same thing cannot both be current, because each replaces the last. None of these responses is a thesis kill (§20.11 holds those); each re-bases the model and restates every figure (AC-22).

Worked, on illustrative outcomes: EPFO's crosstab puts the 20–200 count at 3.1 lakh; V-03 lands in its marginal band, realised 15–30% below list; Zoho's gate is unchanged; graduation is not yet measurable. The second row sets the count — SC-MEASURED at 3.1 lakh — and the V-03 marginal row sets the price, re-running the grids at 0.70–0.85 of each PEPM (§04.3, the spend identity). The 1.0% SOM at the ₹115 midpoint becomes 3,100 PF codes × 55 seats × ₹80.50–97.75 × 12 = ₹16.5–20.0 Cr ARR, against ₹16.7 Cr on SC-2.2 at list — a larger count and a lower price nearly cancel. Every published figure carrying SC-1.8, SC-2.2 or SC-2.6 is restated in the same change, and those three scenario IDs are retired.

#### Decisions this section makes, and the alternatives it rejects

| # | Decision | Rejected alternatives | Why | Revisit when |
| --- | --- | --- | --- | --- |
| D-01 | The denominator is EPFO's contributing establishments | Registered establishments; Udyam; ESIC employers; the Economic Census | Only contribution reveals a payroll obligation in force | EPFO publishes a contributing-by-size table |
| D-02 | The beachhead count is a range around one named parameter | The fit's point figure; v0.3's 1.8–2.6 lakh "estimate" | Neither is a measurement | AC-20 |
| D-03 | Price is referenced by two anchors | Any single ceiling | K-09; EV-027 | A card changes |
| D-04 | The spend is read through the identity, with both readings open | Asserting penetration, or asserting discounting | One vendor's realised price near list is not the market | V-02 and V-03 |
| D-05 | Share is counted in PF codes, both years stated | Tenants, logos or companies | EPFO's unit is the PF code | EPFO's definitions change at a re-pull |
| D-06 | SOM is bounded by greytHR's claim as a dated ceiling | No bound; a target share | A 3-year plan above it out-penetrates the HRMS-job incumbent from zero | IN-10 is re-captured |
| D-07 | Scale comes from filed revenue; Ramco is a calibration row | Aggregator figures; analyst rankings; adding Ramco | Aggregators were wrong on three of three; Ramco's India HR revenue is not separable | The next filings (the expected-row-kind table) |
| D-08 | Segments are chosen on the overlap of obligation, budget and dissatisfaction | Fitted band value | The fitted family was chosen by assertion | AC-20 |
| D-09 | The wedge is stated per rival, with parity on computation | "More complete India compliance" | Falsifiable in a bake-off (R-7) | A rival's capability changes (R-36 to R-38) |
| D-10 | "No seat floor" is a per-head structure; "cheaper" only through AC-25 | "Cheaper" as a general claim | Above ~21–37 employees the value-floor block is the smaller bill | A card changes (R-39, R-40) |
| D-11 | The buyer's cost is shown as two lines with both bureau branches, claiming neither | Showing the software line alone; claiming the retired-bureau difference as our saving | Half the budget is invisible in the first; the second asserts a decision the buyer makes and the evidence has not tested (V-01, V-02, V-05) | V-01, V-02 and V-05 report |
| D-12 | A card change restates the dependent figures mechanically; an unusable figure is reported as not computable | Amending a claim in place; approximating a pool from a band mean | The seat-floor arithmetic is a structure, not a level, and an approximation of a convex quantity from its mean is wrong in a known direction | A vendor changes its block (R-39) |

What this section deliberately does not do, and where each belongs instead:

| Not done here | Why | Where it belongs |
| --- | --- | --- |
| Forecast revenue, year by year | No realised price and no measured beachhead count exist; a grid corner is not a forecast | §20.7's gates; §18.14's unit-economics frame |
| Value any band above 200 | The fit's members above 200 depend on a family chosen by assertion and are contradicted by up to 4.1× | §05.3's entry criteria for the deferred bands |
| Estimate a market median bureau fee or a market realised PEPM | Six to thirty data points are falsification, not estimation (§20.6) | §20 V-01, V-03 — as kill tests |
| Set our price | The modelling band is a hypothesis for sizing only | §18 |
| Cost the filing operation | Minutes per instance are unmeasured | §22.7; §13.19; §20 V-26 |
| Size the 10–19 funnel or the 1–9 band | No contributing-by-size count exists below 20, and the other counts are not denominators | §05.1 (funnel only; decline 1–9) |
| Value the company | One transaction multiple is a reference, not a valuation | §18; §20.7 |

#### Saying the market numbers — the approved forms

§21.12 governs what may be said about competitors. This table governs what may be said about the market, in any external material.

| # | Banned form | Why | Approved form |
| --- | --- | --- | --- |
| MC-01 | "India HR tech is a $23bn market" | [Killed] — a mislabelled global figure (EV-K04) | Not said |
| MC-02 | "6 crore MSMEs need payroll" | [Killed] — not employers with payroll obligations (EV-K01) | "7,66,254 EPFO contributing establishments (FY2023-24)" |
| MC-03 | "7.66 lakh companies" | The unit is the PF code, not the company | "7,66,254 EPFO contributing establishments" |
| MC-04 | "A ₹10,000 Cr TAM" | A modelled ceiling, or the laundered 96.2 × ₹115 product | "Revealed spend ₹2,100–3,900 Cr (modelled gross-up, EV-005); a modelled whole-market ceiling of ₹9,013–10,905 Cr (r2/09)" |
| MC-05 | "The market grows 10% a year" | 0–10% is a roll-forward sensitivity, not a growth rate | Not said; "the latest EPFO count is FY2023-24; the next is unpublished" |
| MC-06 | "7.24 lakh employers in our segment" | The upper case of a low-confidence fit | "Up to 7,24,373 on a low-confidence fit, 1.8–2.6 lakh if most contributing establishments sit below 20 — being measured" |
| MC-07 | "greytHR has 3.9% market share" | A marketing claim over a government count, in a different unit | "greytHR claims 30,000+ companies (September 2026), about 3.9% of contributing establishments — used as a ceiling, not a share" |
| MC-08 | "Our SAM is ₹1,670 Cr" | One scenario cell stated as the SAM | "₹950–6,018 Cr of full-penetration potential across scenarios; ₹1,670 Cr in the 2.2-lakh, ₹115 cell" |
| MC-09 | "We will reach ₹32.7 Cr ARR in three years" | A grid corner is not a forecast | "The 3-year SOM grid spans ₹5.8–32.7 Cr ARR; no forecast is made (§20.7)" |
| MC-10 | "SMBs overpay ₹629 Cr for unused seats" | A counterfactual ceiling (AC-24) | AC-24's approved form |
| MC-11 | "We're cheaper than [vendor]" | Depends on headcount (AC-17) | The AC-25 output sentence |
| MC-12 | "Bureaus cost ₹60–160 per employee" | One provider's indicative band restated at one headcount | "At 50 employees, one provider's published ₹3,000–8,000 band is ₹60–160 per employee-month; realised bureau prices are being tested" |
| MC-13 | "Only 20–55% of employers use HR software" | π depends on the price assumed and is not measured | "At list prices of ₹80–200, observed spend would cover about 12–55% of contributing members; penetration versus discounting is open" |
| MC-14 | Any adjective attached to a filed figure ("loss-making", "burning", "barely profitable") | §21.12 CLR-08 | "Keka Technologies reported ₹133.86 Cr revenue in FY25; its FY24 filing showed an ₹80 Cr loss on ₹78 Cr revenue; its FY25 result is not published (r2/09)" |
| MC-15 | "HRMS companies sell for 4× revenue" | One transaction, one asset profile | "The only recoverable India HRMS transaction multiple is 4.0× revenue (PeopleStrong, r2/09)" |
| MC-16 | "The seat floor overcharges the 20–50 band" without the unit | The overcharge is per head and structural, not a lower bill (§04.4) | "Below 50 employees the six priced vendors bill for 50 seats; at 20 employees, 60% of the bill buys seats the firm does not have (EV-026, EV-027)" |
| MC-17 | "5.25 lakh firms have 20–49 employees" | A low-confidence fit's band count, in PF codes | "On a low-confidence fit, about 5.25 lakh contributing establishments sit in 20–49 — being measured (AC-20)" |
| MC-18 | "65,000 firms cross 20 employees every year" | Registered compulsory inflow, which includes firms starting above 20 | "EPFO covered 65,507 establishments compulsorily in FY2023-24 (derived) — an upper bound on firms newly owing EPF, not a count of those crossing 20" |
| MC-19 | "No seat floor earns the same per employee as competitors' cards" | A fit-based, segment-level per-member comparison, not a per-customer one | "On a low-confidence fit, block-priced cards collect about 1.3× their 50-employee rate per member across the beachhead; our ₹80–115 modelling range falls in the same per-member range — a sizing observation, not a price" |
| MC-20 | "Under half the 20–49 band can afford Keka" / "the band is on value-floor cards" | The first states an upper bound as a measurement; the second reads a non-binding bound as support | "At ₹2,100 Cr of observed spend, at most 47.61% of the fitted 20–49 band could be on Keka's ₹6,999 floor — an upper bound assuming every rupee of that spend went to this band on this card. The value-floor cards are not excluded by the arithmetic, which is not the same as being supported by it" |
| MC-21 | "We save a 30-person firm ₹84,540 a year" | A composed-view branch stated as our saving; whether a bureau can be retired is untested (V-01, V-02, V-05) | "On the firm's own declared figures, software and filing labour together run ₹65,940–1,25,940 a year today; our line at a ₹115 card is ₹41,400 a year and carries portal-accepted artefacts with attended, assisted submission under written authority — the employer's statutory liability stays with the employer. Whether the bureau engagement changes is the buyer's decision" |
| MC-22 | Any seat-floor figure quoted after the card it rests on has changed | AC-36 — the claim is withdrawn, not amended in place | The figure re-derived from the new dated capture, or nothing |

- **AC-32 (market claims use the approved forms).** *(New.)* External material states a market figure only in an approved form above, with its source; a market claim the table does not cover gets a form approved by the section owner, recorded here, before first use. Test: a deck slide reading "₹10,000 Cr TAM" fails; the MC-04 form passes.
- **AC-33 (no evaluative adjectives about named companies).** *(New.)* This section describes named companies only by dated, sourced facts — filed figures with entity and period, published prices with capture dates, product capabilities as read or tested — never by quality adjectives. The section owner lints §04 on every edit for "leader", "leading", "dominant", "struggling", "burning", "barely", "aggressive", "weak", "strong", "best", "stalled", "giant" and "broad" next to a vendor name; a hit is rewritten as a fact or deleted (§21.12 CLR-02, CLR-08). Examples of the rewrite, from the per-rival table in §04.4: a column headed "Does well" is headed "What the dated evidence shows it does (read, not tested)"; "Broad suite" is written as "Entry tier bundles payroll, statutory compliance, expense and gratuity management (r5/03)"; "granular multi-user permissions" is written as "multi-user permissions set per voucher and per report, multi-user at Gold (r3/01)".

**The section's own regression searches.** Run on every edit to this file; each has one acceptable result.

| Search | Acceptable result | Kill item |
| --- | --- | --- |
| "34,000" | Only inside a [Reversed] or history row | K-16 |
| "Tally is the incumbent" | Only inside a [Reversed] row | K-23 |
| "₹45–50" or "price ceiling" beside PEPM | Only in "no single ceiling" statements | K-09 |
| "15+ states" or "LWF across 14" | Only inside a [Reversed] row, or in the banned-figure list at the head of §04 | K-01 |
| "12,250" | Only as [Killed] | EV-K11 |
| "2.4–4.4" | Only as the refused figure | N-08 |
| "41,881" | Always with "modelled" or "[Hypothesis]" beside it | EV-K10 |
| "file for you", "we file" | No hits | K-13 |
| "cheaper" beside a vendor name | Only in the AC-17 and AC-25 arithmetic, the criteria themselves, or an approved form | AC-17 |
| The AC-33 word list beside a vendor name | No hits | AC-33 |
| "save" or "saving" beside a bureau or CA fee | Only inside MC-21's form, AC-35 itself, or a refusal | AC-35 |
| "60%" beside a vendor name | Only with a 50-seat block and a dated capture beside it | AC-36 |
| A band-adoption share without the words "upper bound" | No hits | AC-34 |

#### Acceptance tests for the section's criteria

The worked examples carry the engine criteria's arithmetic, and several already have test cases in line (AC-6d, AC-17 to AC-32). The table adds tests for the market and posture criteria that lack one, and maps the engine criteria to the §06.14 golden vectors that prove them — showing where a criterion has no vector yet.

| Test | Criterion | Given | Then |
| --- | --- | --- | --- |
| AT-01 | AC-10 | A deck figure "₹10,170 Cr TAM" | Fails — no formula row produces it; it is 7.66 lakh × 96.2 × ₹115 × 12, which AC-11 bars |
| AT-02 | AC-10, AC-19 | "Our 2,200 customers are 0.3% of India's employers" | Fails — tenants over IN-01; passes only in the AC-19 form, in PF codes with both years |
| AT-03 | AC-11 | A per-account ARPU of 96.2 × ₹115 × 12 = ₹1,32,756 | Fails (N-04) |
| AT-04 | AC-12, AC-20 | A source banded by cumulative accounts offered as the measured count | Enters as a bound only (AC-20 b) |
| AT-05 | AC-13 | Collateral: "more complete India compliance than any competitor" | Fails (R-7) |
| AT-06 | AC-13 | Collateral: "Frappe HR has no PT" | Fails as phrased (§21.12 CLR-03); passes in §21.12's scoped form |
| AT-07 | AC-14 | A price card showing a 50-seat minimum, or "contact sales" below 50 | Fails |
| AT-08 | AC-15 | A Keka rate used after its 5 September 2026 capture passes the age limit | Refused until re-captured |
| AT-09 | AC-16 | A gratuity computation needing `gratuity.ceiling` with no captured notification | Held for operator confirmation; the legacy ₹20 lakh applies only with that confirmation recorded against the run |
| AT-10 | AC-34 | "Fewer than half the 20–49 band is on Keka" | Fails — the figure is an upper bound on one card at one end of the spend range, and the approved form (MC-20) is the only way to say it |
| AT-11 | AC-34 | The enterprise-adjusted bound, computed by removing ₹985.86 Cr from the numerator and re-using the 35–65% gross-up | Fails — IN-12 is defined over the whole filed set; the figure is "not computable" until IN-12 is re-derived over the restricted set |
| AT-12 | AC-35 | A composed cost view whose filing-labour line is the midpoint of the published bureau band | Fails — a band is never converted to a point (CV-1); the band is shown with its label |
| AT-13 | AC-35 | A composed view for a prospect on Kredily's free plan showing ₹0 of software today | Fails (CV-5) — computation is free and outputs are charged (EV-029); the software line is the charged outputs at that vendor's card |
| AT-14 | AC-36 | A vendor's block moves to 25 seats and §04.4's unused-seat pool is recomputed from the band mean of 30.0 | Fails — F-11 is not computable at that block from the fit's two totals, and the mean-based shortcut understates it |
| AT-15 | AC-37 | A new qualification rule is added and Fixture A's expected-output table is unchanged | Fails — FX-4 must be re-run and restated in the same change |

| Engine criterion | §06.14 vectors that prove it | Gap |
| --- | --- | --- |
| AC-1 — dual wage base | TV6, TV7, TV25, TV31 | — |
| AC-2 — effective-dated rules | TV12, TV14 | — |
| AC-3 — no model-generated statutory number | None — enforced structurally (§13.4; engine purity, §15) | A vector is not the right test; the architecture review is |
| AC-4, AC-4a — ESI period continuity on the raised wage | TV3 | — |
| AC-5 — ceiling policy per tenant | TV1, TV31 | — |
| AC-6 — Scheme 2026 references and the corrigendum flag | None | The corrigendum check is a watcher procedure (§22.8.4), not a computation |
| AC-6a — gratuity as a liability | TV8, TV27 cover the service rule and the look-back | No vector checks the aggregate liability delta — the §04.1 ₹40,385 example is proposed to the §06 owner as one |
| AC-6b — bonus base | TV9 | — |
| AC-6c — PT exception months | TV10, TV40, TV41, TV42, TV43 | — |
| AC-6d — mid-year joiner aggregation | TV47 covers the Form 130 record | The ₹14,400-a-month deduction in the §04.1 example is proposed to the §06 owner as a vector, on re-verified Tax Year 2026-27 slabs (V-20) |
| AC-7 — one master, many views | TV49 | — |
| AC-8 — attendance closes into payroll | TV19 | — |
| AC-9 — audit trail | TV48, TV49 | — |
| AC-16 — unnotified figures stay open | TV50 shows the pattern for the post-cliff ESI regime | No vector for `gratuity.ceiling` or the bonus ceilings — proposed with AT-09 |

Criteria AC-18 to AC-33, with what each gates and who answers for it:

| Criterion | Governs | Gates | Owner |
| --- | --- | --- | --- |
| AC-18 | Comparisons with a bureau fee | External claims | GTM |
| AC-19 | The share-claim unit | Any share or penetration figure from our own base | Research |
| AC-20 | A measured beachhead count | Replacing the scenario range | Research |
| AC-21 | The spend-price identity | External statements of market spend | Research |
| AC-22 | The sizing model's reproducibility | Every published §04 figure | Research, reviewed by Finance |
| AC-23 | The bureau pool's presentation | External claims | GTM |
| AC-24 | The unused-seat pool's label | External claims | GTM |
| AC-25 | The comparison computation | Every price comparison against a named vendor | GTM, with the §21.12 owner |
| AC-26 | Scoreboard membership | IN-11 and the gross-up | Research |
| AC-27 | Parameter states | Every model input | Research |
| AC-28 | The design-partner baseline | Any statement about the size of the problem | Product |
| AC-29 | Qualification | A prospect's priority and lead argument | GTM |
| AC-30 | The burden statement | What a prospect is shown | GTM, with Statutory for the obligation lines |
| AC-31 | Study records | Ingesting any study result | Research |
| AC-32 | Market-claim forms | External material | Section owner |
| AC-33 | Named-company descriptions | This section's text | Section owner |
| AC-34 | The band's full-adoption bound | Any band-level adoption statement | Research |
| AC-35 | The composed annual cost view | What a prospect is shown about its whole budget | GTM |
| AC-36 | The response to a card change | Every figure and claim that depends on a card | GTM, with the §21.4 owner |
| AC-37 | The section's integration fixtures | Any change to a §04 rule | Section owner |

#### Claim ledger for this section

Every load-bearing claim in §04, with its status and the source or study that governs it. This is the section-level mirror of the PRD's evidence ledger — a reviewer should be able to challenge any number by its row.

| Claim | Value | Status | Source / kill criterion |
| --- | --- | --- | --- |
| Contributing-establishment denominator | 7,66,254 | [Verified] | EPFO AR, 31.03.2024 (EV-001) |
| Registered : contributing ratio | 3.16× | [Verified] | EPFO |
| Registered establishments >200 accounts | 1,73,250 | [Verified] | EPFO AR Appendix-2(v) — registered, cumulative accounts |
| >200-employee contributing establishments | 41,881 modelled; 41,881–1,73,250 plausible | [Hypothesis — modelled] | Pareto fit, r2/09 ([Reversed] v0.3's "[Verified], Appendix-2(v)") |
| greytHR share calibration | ≈3.9% (30,000+ companies, captured September 2026) | [Verified claim; derived ratio] | EV-091, EV-016 ([Reversed] v0.3's 34,000 / 4.4% — K-16, EV-K27) |
| Filed HRMS revenue (11 entities) | ₹1,374 Cr | [Verified] | MCA/ROC filings (EV-005 inputs) |
| Grossed-up real software spend | ₹2,100–3,900 Cr (USD 0.22–0.41bn at ₹94.43) | [Verified inputs + modelled gross-up] | EV-005 |
| Implied spend per contributing member-month | ₹23.7–44.1 | [Verified arithmetic] | EV-005 ÷ 7.37 Cr members ÷ 12; readings V-02/V-03 |
| Whole-market modelled ceiling | ₹9,013 Cr (0%) · ₹10,126 Cr (6%, central) · ₹10,905 Cr (10%) | [Verified arithmetic on a modelled ceiling] | r2/09 (₹12,250 Cr [Killed], EV-K11) |
| Bureau/CA retainer range | ₹3,000–15,000/mo | [Verified as one provider's published indicative bands] | IndiaFilings (r2/05); realised price §20 V-01 |
| Realised PEPM anchors | ₹52 / ₹126 | [Verified derivation] | filed revenue ÷ claimed platform scale (r2/09); §18, EV-006 inputs (both biased low) |
| Price anchors | ~₹50 value floor; ₹80–200 clearing band (at 50 employees) | [Verified] | EV-027 (K-09; any single-figure ceiling [Killed], EV-K20) |
| Seat floors | 50-employee minimum block at six of six priced vendors (Keka historically 100) | [Verified] | EV-026 |
| Unused-seat share of a 20-employee bill on a 50-seat block | 60% | [Verified inputs; derived arithmetic] | EV-026, EV-027 (Keka's block size behind its floor unpublished) |
| Headcount up to which a no-floor card undercuts the value-floor blocks (Qandle, greytHR) | ~16–31 employees across ₹150–80 PEPM; ~21 at ₹115 | [Hypothesis — our PEPM] | derived from EV-027 block prices; §20 V-03; AC-17 |
| Labour Codes in force / Central Rules | 21 Nov 2025 / 8 May 2026 | [Verified] | §06 |
| 50% wages add-back | s.2(y) / s.2(88) | [Verified] | EV-010, §06.10 ([Reversed] v0.3's example treating special allowance as excluded) |
| Form 138 breaking format change; Q4 formats unreleased | as tabled | [Verified] | EV-011, EV-046, EV-051 |
| Nov 2026 EPF/ESI cliff | ~21 Nov 2026 | [Verified] | EV-002 (ESI leg unresolved, EV-004) |
| POSH IC for every employer; ten-worker line is the Local Committee | s.4(1) / s.6(1) | [Verified] | EV-056 |
| 144 OT hours per quarter | — | [Hypothesis] | secondary summaries only; warn, never block (K-04, EV-012, §20 V-17) |
| Beachhead PEPM modelling band | ₹80–150 (inside the clearing band) | [Hypothesis] | EV-006; §20 V-01, V-03 |
| Beachhead establishment count | ≤7.24 lakh on the fit; 1.8–2.6 lakh scenarios | [Hypothesis] | `beachhead_sub20_share`, AC-12 ([Reversed] v0.3's 1.8–2.6 lakh estimate) |
| Beachhead SAM | ₹950–6,018 Cr across scenarios | [Hypothesis] | derived from the two above |
| 3-yr SOM | ₹5.8–32.7 Cr ARR at the 2.2-lakh scenario | [Hypothesis] | derived; bounded by the ≈3.9% calibration; scales with the count |
| Bureau spend pool | ~₹1,580 Cr at the 2.2-lakh scenario, 100% bureau usage | [Hypothesis] | assumed ₹6,000/mo × unverified volume; §20 V-01, V-02 |
| Avg billable seats | 55 (fit mean ~46) | [Hypothesis] | §20 V-03 |
| State PT slabs — Maharashtra, Odisha, Karnataka | per §04.1 table | [Verified] | state primary sources (r2/10, EV-014); Odisha true-up month [Hypothesis]; Odisha levy status open — reported April 2026 repeal unconfirmed (r1/06; §06.13, §20 V-09) |
| State PT slabs — every other state; all LWF rates | not captured | [Hypothesis] | gazette dataset, §20 V-09; parameters `pt.<state>.*`, `lwf.<state>.*` |
| Keka pricing | withdrawn card, live floor, suppressed card | [Verified] | EV-021–025 ([Reversed] v0.3's "TLS-blocked, unknown") |
| Keka / greytHR AI posture | waitlisted / "included in every plan" | [Verified as claim posture; not tested] | EV-090 |
| Sub-20 share of the fit residual (`beachhead_sub20_share`) | unmeasured; 64–75% implied by the scenarios, 0% in the fit | [Hypothesis] | §20 desk validation; drives the beachhead count |
| ESI raised-wage in-period treatment | contribute on actual | [Hypothesis] | reconfirm ESIC instructions; period rule [Verified] (r1/06) |
| EPF and ESI late-payment interest | 12% p.a. simple from the due date | [Verified] | S.O. 2698(E), 29 May 2026 (r1/06); EPF portal auto-calculates it (EV-039) |
| EPF and ESI damages scales | not captured — `epf.damages_scale`, `esi.damages_scale` | [Hypothesis] | legacy s.14B / Reg 31-C; Code-era scale unverified (§06.2, §06.3) |
| TDS interest | 1% / 1.5% per month | [Verified] | Income-tax Act 2025 s.398(3)(a) (r5/04) |
| TDS late-filing fee | ₹200/day | [Hypothesis] | 1961-Act s.234E per a secondary source (r1/06); 2025-Act equivalent unmapped |
| Gratuity payable ceiling | not notified under CoSS s.53(3) — `gratuity.ceiling` | [Hypothesis — amount] | r1/06; ₹20 lakh is the repealed Act's figure |
| Bonus eligibility / calculation ceilings | legacy ₹21,000 / ₹7,000 | [Hypothesis] | Code on Wages s.26 delegates both to the appropriate Government; no Code-era notification located (r1/06) |
| International-worker uncapped EPF basis | full wages, no ₹15,000 ceiling | [Hypothesis] | contested rule, carried in §06.2; EPS exclusion for post-2014 IWs [Verified] (r5/02) |
| MH PT ₹200×11 + ₹300 Feb split | as stated, with the women's ₹25,000 threshold | [Verified] | Maharashtra schedule from 1 Apr 2023, read at primary (r2/10) |
| Per-state minimum-wage (bonus floor) | varies | [Hypothesis] | state minimum-wage schedules; bonus framework [Verified] |
| Regulatory tailwind > Zoho-gate headwind | net positive | [Hypothesis] | window closes if free gate widens to 50 first |
| Contributing base stable-to-growing | ≥7,66,254 floor | [Hypothesis] | next EPFO AR; contracting base kills entry thesis |
| $23.32bn India HR tech | — | [Killed] | mislabelled global figure, §02 (EV-K04) |
| 5.31 crore Udyam as TAM | — | [Killed] | not payroll-obligated employers (EV-K01) |
| 24.18 lakh registered as denominator | — | [Killed] | two-thirds dormant |
| Zoho invest-declaration/payouts as differentiator | — | [Killed] | table stakes vs Zoho (§21) |
| "Multi-state PT/LWF is not a differentiator — Frappe ships PT in 15+ states and LWF in 14" | — | [Reversed] | Frappe ships no state PT or LWF (EV-031); Tally has no PT slab table or LWF engine (EV-032) — greenfield in Frappe HR and TallyPrime, not versus greytHR (K-01, EV-K12) |
| "Tally is the incumbent" (singular) | — | [Reversed] | two incumbents, two jobs — Tally and greytHR (K-23, EV-K34) |
| Prescribed appointment letter "from employee one" | — | [Reversed] | attaches at 10+ workers, state-prescribed form (K-18, EV-057, EV-K29) |
| HivePayroll ₹1,499/month for up to 25 | ₹1,499 / ₹2,499 / ₹3,999 per month, 25 included | [Verified] | vendor page, r2/05 — an earlier withdrawal of this figure is [Reversed] |
| EPFO's establishment unit | PF code | [Verified for the registered count; inferred for the contributing count] | r2/09; re-read at the next EPFO re-pull (§04.2 units of account) |
| Registered ÷ fitted contributing establishments, by band | 3.70× (0–50 vs 20–49) · 1.51× (51–200 vs 50–199) · 4.14× (above 200) | [Hypothesis — fit-based; band edges misaligned] | Appendix-2(v); r2/09 fit; AC-20 |
| Implied share of contributing members on paid software | 11.9–89.9% across ₹199.98–49.00; 20.6–38.3% at ₹115 | [Verified arithmetic on a modelled spend range] | §04.3 spend identity; V-02, V-03 |
| Seat-floor uplift on the fit's beachhead | ₹64.45 per member-month at greytHR's card across 20–199 (₹83.17 in 20–49) | [Hypothesis — fit-based] | §04.3; r2/09 fit |
| Unused seats under a 50-seat floor, 20–49, on the fit | 1,05,05,734 (40.0% of seats billed); ₹617.7–1,764.7 Cr a year at the vendors' 50-employee rates | [Hypothesis — fit-based counterfactual ceiling] | §04.4; AC-24 |
| Headcounts at which a no-floor card is the smaller bill, 20–200 | Never above 50 against Qandle, greytHR or Pocket HRMS; all of 20–200 against HROne and Keka's archived card at ₹80 | [Hypothesis — our PEPM] | EV-022, EV-027, r5/03; AC-17, AC-25 |
| Bureau fee per employee-month | ₹60–160 at 50 employees; ₹156.86–294.12 at 51; ₹80–150 at 100 | [Verified arithmetic on a published range] | IndiaFilings bands (r2/05); V-01; AC-18 |
| Bureau pool, two-parameter grid | ₹158–3,960 Cr a year at the 2.2-lakh scenario | [Hypothesis] | F-10; V-01, V-02; AC-23 |
| Ramco's India revenue as a share of the filed sum | At most 9.7% (8.2% on the standalone India geography) | [Verified arithmetic] | EV-092; AC-26 |
| Filed revenue per claimed customer | greytHR at most ₹62,610; Keka at most ₹1,07,088–1,33,860; enterprise group at most ₹12.5–60.4 lakh | [Verified arithmetic on dated marketing claims] | r2/09; r5/03 |
| Only recoverable India HRMS transaction multiple | 4.0× revenue (PeopleStrong, ~₹1,200 Cr on ₹301.99 Cr) | [Verified — trade-press corroborated; transaction documents not read] | r2/09 |
| Overcharge share of a bill on a 50-seat block | (50 − *n*) ÷ 50 below 50 — 60% at 20, 40% at 30, 20% at 40 | [Verified inputs; derived arithmetic] | EV-026; the §04.4 definition |
| Whole fitted beachhead billed on the cheapest card | ₹2,584–2,586 Cr a year — above the low end of all observed spend | [Hypothesis — fit-based] | §04.3; supports the penetration reading, does not prove it |
| Block-priced cards' collection per member across the fitted beachhead | About 1.3× each card's 50-employee rate (₹64.40–130.11) | [Hypothesis — fit-based] | §04.3; MC-19 |
| Compulsory EPF coverage inflow, FY2023-24 | 65,507 (2,94,910 new establishments less 2,29,403 voluntary) | [Verified inputs; derived] | r2/05; an upper bound on ST-1 events (MC-18) |
| SOM swing by input | Beachhead count 4.0×; share 3.0×; PEPM 1.9×; seats 1.75× | [Verified arithmetic on hypothesis inputs] | F-06; AC-20 first |
| greytHR's implied customer size and realised price | ~100 employees per customer; realised ₹52.18 about 10% above Essential's ₹47.45 at that size | [Verified arithmetic on dated vendor claims] | r2/09; §21.4; V-03 settles the market reading |
| greytHR share calibration on its About-page claim | 2.6% (20,000+ paying businesses) against 3.9% on the headline claim | [Verified arithmetic on dated vendor claims] | r2/09; EV-091 |
| TallyPrime licence prices | Silver ₹22,500 lifetime or ₹750 a month; Gold ₹67,500 or ₹2,250 a month; plus 18% GST | [Verified — vendor page, September 2026] | r3/01; EV-032 |
| EPFO member accounts as an employee base | 32.56 crore | [Killed] | 4.4× the contributing members (r2/09) |
| The 20–49 band's annual bill if wholly on one entry card | ₹1,544.2 Cr (Qandle, annual) to ₹4,411.4 Cr (Keka's floor) | [Hypothesis — fit-based counterfactual] | 5,25,246 × block × 12 on the r2/09 fit; block prices EV-026, EV-027, r5/03; AC-34 |
| Upper bound on the band's share that could sit on a clearing-band card, at ₹2,100 Cr of spend | 83.29% Zimyo · 67.31% HROne · 47.61% Keka's floor; the value-floor and Pocket HRMS cards are not bounded below 100% | [Verified arithmetic on a modelled spend range and a low-confidence fit] | EV-005 ÷ the row above; AC-34 |
| Enterprise-weighted share of the filed sum | ₹985.86 Cr of ₹1,374.12 Cr — Darwinbox, PeopleStrong and ZingHR | [Verified arithmetic] | The §04.4 scoreboard; used only to record that the tighter band bound is not computable until IN-12 is re-derived |
| Composed annual cost, greytHR Essential plus a bureau, one state | Today ₹65,940–1,25,940 at 20–45 employees and ₹1,31,340–2,15,340 at 60; our line ₹27,600–82,800 at a ₹115 card | [Hypothesis — our PEPM; bureau bands indicative] | EV-027 and r5/03 for the card, r2/05 for the bands; AC-35, MC-21 |
| Overcharge share by block size | 25 seats: 20% at 20 employees, zero from 25 · 50 seats: 60% at 20, zero from 50 · 100 seats: 80% at 20, 50% at 50 | [Verified inputs; derived arithmetic] | EV-022, EV-026; the §04.4 definition; AC-36 |
| F-11's computability | Defined only while a card's block is at least the band's upper bound | [Verified — a property of the formula] | §04.4; a mean-based shortcut understates a convex quantity |

Until those report, this section's SAM is a **defensible order of magnitude (₹950–6,018 Cr for the beachhead, depending on the unmeasured sub-20 share)**, not a business case. That distinction is the entire point of the confidence ledger: the numbers are honest about being ranges, and every range names the study that would collapse it to a point. The section commits a *method* and a *denominator* the reader can trust; it withholds a *point estimate* it has not earned. That is the trade the PRD's evidence discipline demands, and it is the version that survives the room.
