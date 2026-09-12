## 19. Success Metrics & Instrumentation

Every other section of this PRD argues that **the statutory filing, not the payslip, is the unit of delivery** (front matter; §04; §08). This section makes that claim measurable. If it is true, then the primary number the company optimises cannot be a generic SaaS metric — not MRR, not DAU, not "payslips generated" — because none of those distinguishes us from a spreadsheet, from Tally, or from a free tier that also generates payslips (§04). It has to be a metric that only a product delivering **portal-accepted filings** — the artefact plus attended, assisted submission under the employer's written authority to act (§22) — can move.

That is the discipline this section enforces. It defines a **north-star metric grounded in filing delivery**, decomposes it into a metrics tree of leading and lagging indicators, specifies the **filing-accuracy and on-time-filing metrics as the core quality bar** (with the Indian statutory due-dates and penalty exposure that make them load-bearing), and lays out an **instrumentation plan** that captures per-tenant, per-user, per-agent, per-model attribution **from v1, while AI is still bundled free** (§13 requires this explicitly — retrofitting attribution after pricing exists is far harder). It closes with **targets per phase** aligned to the roadmap in §05.

One inherited rule governs every number below. §02.3 established that the first two research rounds retracted roughly ninety claims (the Draft 1 figure; the round-two critic tallied about sixty, and §02.3 carries both unreconciled), that every round-one-to-two retraction moved in the optimistic direction, and that later rounds found some of those corrections had themselves overshot — so an unrechecked early claim is roughly 70–75% reliable in either direction. The same skepticism applies to *our own* metrics: **a target is a [Hypothesis] until a cohort reports it, and a vanity metric is one that goes up whether or not a customer got a filing done on time.** §19.13 bans the specific vanity metrics that would otherwise creep into a board deck.

**How to read this section.** It runs top-down through the metrics tree. §19.1 defines the north star; §19.2 places every other metric relative to it as leading or lagging; §19.3–19.9 define each layer's metrics with worked examples in rupees and days; §19.10 consolidates them into one weekly index; §19.11 specifies the events beneath every metric; §19.12 sets per-phase targets with kill criteria; §19.13–19.15 govern hygiene, definitions and the single measurement that validates the thesis. Every number that is a planning anchor rather than a measured fact is tagged **[Hypothesis]** and carries a kill/validation criterion, exactly as §02 requires, with validation routed to §20.

---

### 19.1 North-star metric: On-Time, Accepted Statutory Filings (OTAF)

The north star is a single number, reported monthly, that rises only when the product delivers its core unit of value at scale.

> **North Star — OTAF**
> The count of **filing instances** (one registration × obligation × period, §08 FR-PAY-711), on a line the tenant's coverage statement holds **IN_SLA** on the instance's due date (§05.21), whose artefact the platform generated, that were **submitted in an attended portal session** — by the employer, or by our operator acting under the employer's written authority to act (§22) — and **reached FILED on or before the due date, with no REJECTED attempt and no REVISED or SUPPLEMENTARY transition inside the instance's settlement window**, summed across all active tenants in the period.

The statutory liability for every one of these filings stays with the employer and deductor — it is non-delegable — whoever presses submit (EV-K24; §22, §23). Operator submission is itself fenced until counsel clears the attended-filing questions (Part D-17, §23); until then the employer submits and the four gates below are unchanged.

A filing instance counts toward OTAF only if it clears **all four** gates, each read off the §08 FR-PAY-711 transition log:

1. **Generated** — the instance passed through GENERATED from the LOCKED payroll snapshot (FR-PAY-711 F4): an ECR return file (EV-035), an ESI contribution upload, a state PT return, or a Form 138 statement (EV-051) — not hand-assembled outside the product. **Form 130 is not in this list:** it is valid only if TRACES generates it (EV-048), so the product prepares its data and distributes it; its timeliness is tracked as certificate issuance (§19.3.1), not as an OTAF filing.
2. **On time** — the instance reached **FILED** (acknowledgement stored and, for a payment-bearing filing, the payment receipt captured — FR-PAY-711 F15/F16) on or before the due date computed for that instance (§08 FR-PAY-710; canonical calendar §06.11), judged on the authority's own timestamp on the acknowledgement or receipt, not on the time we recorded it. This gate is §01's `on_time(f)` — the completion predicate `complete(f)` over the `Filing` entity (§14.4.5) plus the authority timestamp — so a return approved and challaned by the due date but receipted the day after is late (§01 TS-01.3).
3. **Accepted first time** — the instance reached ACCEPTED (F9) with **no SUBMITTED → REJECTED transition** (F7): for the ECR, the employer approved the return statement and the challan carries a TRRN (EV-036); for Form 138, a Return Receipt Number was issued (EV-051); for ESI and PT, the portal acknowledgement was captured. The employer's rejection of an EPFO return statement at reconciliation is a failed attempt too, and is counted here once §08 names it as an F7 trigger (proposal §22.12 O17); until then it is read from the §22 session log.
4. **Right-first-time (RFT)** — no REVISED (F10) or SUPPLEMENTARY (F12) transition was linked to the instance within its settlement window (§19.3.1). For the ECR these are the only correction routes: a Revised return needs an approved Regular, no other return in process and **no payment initiated**; a Supplementary return may carry only members absent from every prior return for the month; an approved return can never be cancelled (EV-036, EV-037).

**Which instances can count.** "In-coverage" throughout this section means an instance on an IN_SLA line of the coverage-statement version in force on its due date (§05.21). §05.21 fixes every other state's treatment, and this section applies it without re-deciding: SLA_PENDING_FIRST_SUBMISSION instances stay outside the on-time denominator and are reported beside OTAF as **pre-SLA accepted filings**, never added to it; CARVED_OUT_FENCE and CARVED_OUT_PARAMETER instances go to the coverage-gap register; TENANT_SELF_FILES instances sit outside Filing Coverage; NOT_OFFERED lines are recorded as unmet demand against their named hold. OTAF is reported split by delivery mode — A employer-attended, B co-attended, C operator-attended, D CA-attended (§22 FR-OPS-001) — read from the filing ledger, so a Mode A filing is never counted or sold as submitted by us (§01 AC-01.5; §23 FR-LEG-034 AC2).

**Why this is the right north star.** It is the only metric that simultaneously (a) reflects the thesis — filings, not payslips; (b) is *not reported by the alternatives we displace* — a spreadsheet + CA cannot report an OTAF number; the two incumbents do different jobs (Tally owns accounting and the statutory artefacts, and how many firms run Tally *payroll* is unknown; greytHR owns the HRMS job — EV-032, EV-K34); no vendor in the six-vendor set claims to submit any filing (EV-030); and the freemium players give away computation and charge for the outputs — challans, bank files, the annual certificate (EV-029); (c) predicts revenue and retention, because a tenant whose filings all land on time has no reason to churn and every reason to add establishments; and (d) is honest — it cannot be inflated by signups, seats, or bundled AI usage.

**Why a count, not a rate, is the north star.** A rate (filing-integrity %) is the *quality* metric (§19.3) and is guard-railed below. But the north-star must grow with the business, so it is the absolute count. The rate is its most important guardrail: **OTAF may never be grown by loosening the RFT/on-time definitions.** Both move together on the metrics tree.

#### 19.1.1 North-star formula and its guardrails

```
OTAF(month) = Σ  filing instances where (generated ∧ on_time ∧ accepted_first_time ∧ right_first_time)
             tenants

Filing-Integrity Rate = OTAF / (all in-coverage filing instances due across active tenants in period)
```

| | Metric | Role | Guardrail rule |
| --- | --- | --- | --- |
| Primary | **OTAF (count/month)** | North star | Grows with business |
| Guardrail 1 | **Filing-Integrity Rate (%)** | Quality floor | If Rate falls, OTAF growth is disqualified as growth-by-degradation |
| Guardrail 2 | **Penalty incidence (₹ and count)** | Harm floor | Any interest, damages, fee or penalty charged to a customer on a covered filing — EPF interest (portal label s.7Q) or damages (legacy s.14B), the 1961-Act s.234E fee or s.271H penalty or their 2025-Act equivalents (unmapped, §06.13) — is a Sev-1 metric event. The liability stays with the employer (EV-K24); the metric records the event and whether our causation is established |
| Guardrail 3 | **Filing Coverage (%)** | Scope honesty | Filings the product *can't yet* do are excluded from the denominator but tracked separately, so Rate isn't gamed by narrowing scope |

#### 19.1.2 A worked OTAF example — one 60-employee tenant, one month

To make OTAF concrete, take a single beachhead tenant with 60 employees in Maharashtra — one EPF, one ESI and one PT registration — for the **September 2026 wage month**. The month is chosen because it closes Q2 of Tax Year 2026-27, so the central instruments have a published format and a live regime: Form 138 Q4 is fenced (EV-046) and ESI after 22 November 2026 is unresolved (§06.13). For illustration, assume the tenant's coverage statement holds every line shown IN_SLA; in practice Form 138 stays SLA_PENDING_FIRST_SUBMISSION until the family's first real quarterly submission (§05.20). Its filing instances, and how each contributes to OTAF, are:

| Filing instance | Due date | GENERATED from locked snapshot? | FILED by due date? | REJECTED attempt? | REVISED / SUPPLEMENTARY in window? | Counts to OTAF? |
| --- | --- | --- | --- | --- | --- | --- |
| EPF ECR + challan (Sep) | 15 Oct 2026 (§06.11) | Yes | FILED 12 Oct — TRRN, receipt | No | No | **1** |
| ESI contribution (Sep) | 15 Oct 2026 (§06.11) | Yes | FILED 14 Oct | No | No | **1** |
| Maharashtra PT return (Sep) | **Unconfirmed** — the due day is parameter `pt.MH.due_day`, not captured; Maharashtra assigns the frequency per registration each year (§06.11) | Yes | FILED 14 Oct | No | No | **Not judged** — coverage-gap register |
| Form 138 Q2 (Jul–Sep) | 31 Oct 2026 (EV-049) | Yes | FILED 20 Oct | No | Correction statement 3 Nov (PAN error), on the Q1–Q3 correction format published August 2026 (r5/02) | **0** — RFT fails |

This tenant contributes **2** to OTAF for the period, not 4. The PT return was generated and filed, but its due day is an uncaptured parameter and §06.11 forbids computing any on-time metric against an unconfirmed date — so the instance goes to the coverage-gap register and leaves the rate's denominator until `pt.MH.due_day` is captured from the state source (§20 V-09). The Q2 statement was generated, filed on time and accepted — but a correction statement for a wrong PAN inside the settlement window disqualifies it under gate 4 (FR-PAY-711 F10). That single miss is exactly what the RFT gate exists to catch: an accepted-but-then-corrected filing looks like success in a naive dashboard and is a trust event and a rework cost in reality. The tenant's **Filing-Integrity Rate for the month is 2/3 ≈ 67%**, which is *below* the Phase-1 floor and would trigger a filing-integrity standup review (§19.11.5). Aggregate this across all active tenants and periods and you have the company OTAF and its rate.

**Denominator discipline.** The rate's denominator is "all in-coverage filing instances *due* across active tenants in the period," where "due" respects Filing Coverage (guardrail 3): if this tenant also owed a Karnataka PT return but the product cannot yet file Karnataka PT, that obligation is tracked in the **coverage-gap register**, not silently dropped from the denominator to flatter the rate. The BLOCKED state (FR-PAY-711 F2) is split the same way. An instance BLOCKED for an **external** reason — format unpublished (Form 138 Q4, EV-046; the ECR arrear return, EV-043) or regime unresolved (post-cliff ESI, §06.13) — leaves the denominator and enters the coverage-gap register. An instance BLOCKED for a **tenant-side** reason — a chronology gap on the per-establishment ledger (EV-038, §08 FR-PAY-712) or a pending joint declaration (EV-041) — stays in the denominator, because the obligation is live and the deadline still runs. An instance whose due date is an **uncaptured parameter** (every state PT due day, and every LWF due date except Karnataka's — §06.8, §06.11) is treated as externally gated: it is filed and tracked, but never judged on time and never counted in the rate until the date is captured. §19.12.1's Phase-1 note on Form 130 is the same discipline applied to an externally-gated instrument.

**Why RFT-within-window, not RFT-forever.** A revision filed two years later for an unrelated reason should not retroactively demote a filing that was correct when delivered. So RFT is judged against an **instrument-specific settlement window** (§19.3.1) — a versioned metric parameter, not a statutory period. This keeps the north star stable and effective-dated (§19.14 rule 2) rather than perpetually re-litigating closed periods.

**[Verified — as to the superseded schedule read]** ICAI's recommended fee schedule prices TDS return filing, PT registration and PT returns but has **no payroll-processing line item at all** (EV-017; ICAI Recommended Scale of Fees, full-text search — r2/05; §04). The schedule read is at least nine years old and pre-GST, so its rupee figures are banned (EV-K05); a superseding February 2020 revision exists and its text was not retrieved, so the negative is unverified for the current revision and must be re-run on it before use outside this PRD (EV-017; §02.2 G15). What the schedule read evidences is how practitioners itemise the work — by filing, not by processing — which is the basis for a filing-delivery north star over a payslip- or seat-based one. **[Hypothesis]** That OTAF predicts retention better than seat count. Kill/validate: at month 18, regress logo churn on (a) OTAF-per-tenant and (b) seat count; if OTAF has no additional explanatory power over seats (partial R² increment < 0.05, p > 0.05), demote it to a quality metric and pick a revenue-shaped north star.

---

### 19.2 The metrics tree — leading vs lagging

The north-star sits at the top of a causal tree. Everything below it is either a **leading** indicator (moves *before* OTAF, tells us what OTAF will do) or a **lagging** indicator (moves *after* OTAF, tells us what OTAF did to the business). The single most common metrics mistake — and one §02's bias analysis predicts we are prone to — is celebrating lagging metrics we can no longer influence. The instrumentation plan (§19.11) therefore over-invests in the leading layer.

<!-- DIAGRAM: metrics-north-star-tree -->

| Layer | Question it answers | Lead/lag vs OTAF | Example metrics |
| --- | --- | --- | --- |
| **Input** | Are tenants set up to file at all? | Leading (weeks–months) | Activation rate, time-to-first-filing, data-migration completeness, statutory-registration linkage (PF/ESI/PT codes captured) |
| **Process** | Is a payroll+filing cycle running cleanly? | Leading (days) | Payroll-run success rate, wage-base recompute correctness, pre-filing validation pass rate, AI deflection rate |
| **Output** | Did the filing land, on time, right? | **The north star (OTAF) + its rate** | OTAF, filing-integrity rate, on-time rate, RFT rate, rejection rate |
| **Outcome** | Did delivered filings turn into a durable business? | Lagging (months–quarters) | NRR, logo retention, band-crossing rate, penalty incidence, NPS, gross margin |

**Reading the tree.** A drop in *activation* (input) predicts an OTAF shortfall two quarters out. A spike in *pre-filing validation failures* (process) predicts a rejection-rate spike this cycle. A healthy OTAF that is *not* converting to NRR (outcome) means the value is delivered but not monetised or not perceived — a pricing/positioning problem, not a product-quality one. Each layer routes to a different owner, which is why the tree, not a flat dashboard, is the organising structure.

#### 19.2.1 Lead times, quantified — how far ahead each layer sees

The value of a leading metric is only realised if you know *how much* lead time it buys. These are planning estimates, to be replaced by measured lead-lag correlations once ≥3 filing cycles exist:

| Leading metric | Predicts | Typical lead time | So the play is |
| --- | --- | --- | --- |
| Activation rate (input) | OTAF volume | 1–2 quarters | Fix onboarding *before* the OTAF shortfall shows in a board deck |
| Migration completeness (input) | Rejection/correction rate | 1 filing cycle | A tenant that migrated with 90% completeness will throw validation errors on its first run |
| Pre-filing validation pass rate (process) | Rejection rate | Same cycle, days | A validation-failure spike on the 12th predicts a rejection spike on the 15th |
| Statutory-change lead time (process) | Correction rate after a rule change | Until next affected filing | A rule that lands late causes wrong figures at the next cycle for that instrument |
| AI COGS per account trend (process) | Inference-cost erosion (one COGS line of four, EV-088) | 1–2 months | Re-point the router before the unit economics show in finance's monthly close |

**[Hypothesis]** These lead times hold empirically. Kill/validate: after 3 cycles, compute the cross-correlation lag between each leading metric and its target lagging metric; if a claimed "leading" metric shows peak correlation at lag 0 or negative lag, it is coincident or lagging and must be re-labelled on the tree — a leading metric that does not actually lead is worse than none, because it invites premature celebration (§02 bias check).

---

### 19.3 Filing quality metrics — the core quality bar

These are the metrics the whole product exists to move. They are specified per statutory instrument because **each instrument has its own due date, its own acceptance definition, its own correction window, and its own penalty regime** — and a single blended "compliance %" would hide exactly the failures that generate customer penalties. This is the operational expression of §05.15's org-design point: we are a compliance-maintenance operation (the operation itself is §22), and these are its yield metrics.

#### 19.3.1 The statutory due-date calendar (the on-time denominator)

On-time is defined against these dates. A filing that reaches FILED on the 16th for a 15th deadline is a *miss*, full stop — there is no partial credit, because the penalty exposure opens the moment the deadline passes. The canonical calendar is §06.11 and each instance's due date is computed by §08 FR-PAY-710; this table carries only what the metrics need. The **settlement window** is the metric parameter `rft_window_days[instrument]` — how long after FILED a REVISED or SUPPLEMENTARY transition still demotes RFT. It is a versioned definition in the metric register (§19.14.1), not a statutory period, and no value is set here: it is routed to §20.

| Instrument | Frequency | Statutory due date | Correction routes that end RFT | Late-payment / late-filing consequence | Source cue |
| --- | --- | --- | --- | --- | --- |
| **EPF ECR + challan** | Monthly | 15th of the following month (§06.11) | Revised return only before PAYMENT_INITIATED; Supplementary for members absent from every prior return; an approved return is never cancelled (EV-036, EV-037) | Simple interest, mandatory and auto-calculated, paid with the contribution (EV-039) **[Verified]**; the 12% p.a. rate per S.O. 2698(E), read through a professional alert, **[Verified — mirror]**, pull from the primary source before customer use (§06.2); damages at the employer's option, scale = parameter `epf.damages_scale` with no shipped default, **[Hypothesis]** (§06.2, §06.13); late return ₹500/day capped at the month's admin charges **[Verified — mirror]**, pull from the primary source before customer use (§06.2) | EPF Scheme 2026; §06.2 |
| **ESI contribution** | Monthly | 15th of the following month (§06.11) | Not specified in this PRD's sources — routed to §20 V-23 (ESIC portal facts) | Simple interest 12% p.a. (S.O. 2698(E)) **[Verified — mirror]**, pull from the primary source before customer use (§06.3); damages scale = parameter `esi.damages_scale`, no shipped default, **[Hypothesis]** (§06.3) | ESI regime unresolved after 22 Nov 2026 — post-cliff instances are BLOCKED (§06.13) |
| **Professional Tax return** | Monthly or annual, **per state and per registration** | Per state and registration — due days are parameters `pt.<state>.due_day`, none captured; Maharashtra assigns frequency per registration each year, ingested from MAHAGST (§06.11) | State-specific, unknown | State-specific interest and late fee, parameters `pt.<state>.interest_rate` and `pt.<state>.late_fee` with no shipped default **[Hypothesis]** (§06.4) | State PT Acts — dataset pending §20 V-09 |
| **Form 138 (ex-24Q) statement** | Quarterly | Q1 31 Jul, Q2 31 Oct, Q3 31 Jan, **Q4 31 May** of the year following the Tax Year (r.219, EV-049) | Correction statement where the period's correction format is published; the Q4 regular and correction formats are not (EV-046) | Late fee ₹200/day (1961-Act s.234E, from a secondary source — `tds.late_fee_per_day`), cap = parameter `tds.late_fee_cap`; statement penalty = parameter `tds.penalty.statement_default` (1961-Act s.271H, v0.3's range carried, not re-captured) — all **[Hypothesis]**; 2025-Act equivalents unmapped (§06.5, §06.13) | r.219; EV-046, EV-049, EV-051 |
| **Form 130 (ex-Form 16) — certificate issuance, not an OTAF filing** | Annual | 15 Jun of the year following the Tax Year (r.215(1), §06.11) | Not applicable — TRACES generates it (EV-048); for Tax Year 2026-27 it is BLOCKED pending the Q4 format (EV-046) | Late-issue penalty per day = parameter `tds.penalty.certificate_delay` (1961-Act s.272A(2)(g), carried, not re-captured) **[Hypothesis]**; 2025-Act equivalent unmapped (§06.5) | r.215(1); EV-046, EV-048 |
| **LWF contribution** | State-specific (monthly / half-yearly / annual) | Per state — parameter `lwf.<state>.due`, none captured except **Karnataka: annual, calendar year, due 15 January** (periodicity **[Verified]**, r2; amounts disputed — §06.8, §06.11) | State-specific, unknown | State-specific **[Hypothesis]** (§06.8) | State LWF Acts — dataset pending §20 V-09 |

**[Reversed]** An earlier draft cited "Frappe ships 14 states" of LWF here; that is false at source (EV-K12). Frappe HR v16's India payroll names no Indian state and carries no PT slabs or LWF, and TallyPrime has no state PT slab table and no LWF engine (EV-031, EV-032): multi-state PT and LWF is greenfield in both incumbents, so its coverage metric measures a differentiator, not parity.

**[Verified]** The EPF interest is mandatory and auto-calculated (EV-039), and the Form 138 and Form 130 due dates are live (EV-049; r.215(1); §06.11). **[Verified — mirror]** The 12% p.a. EPF and ESI interest rate (S.O. 2698(E), §06.2, §06.3) — pull from the primary source before customer use. **[Hypothesis]** The EPF/ESI damages scales, the 1961-Act TDS late fee, fee cap and penalty amounts themselves (§06.5 holds them as parameters), their 2025-Act equivalents, and every state PT/LWF due date other than Karnataka LWF's. Kill/validate: §06.13 and §20 V-09 — until a state's dataset is gazette-verified, its PT/LWF instances sit in the coverage-gap register and cannot enter OTAF, and no unverified rate is shown to a customer as current.

#### 19.3.2 Worked penalty examples — why one missed filing is a rupee number, not a percentage

The penalty formulas above are abstract until they are attached to a tenant's actual liability. Every rejection or correction opens a penalty-exposure record (AC-3) that estimates the ₹ at risk *the moment it is detected*, so the harm guardrail (§19.1) is a live rupee number, not a quarterly surprise. Worked cases for a representative 60-employee beachhead tenant:

**Case A — EPF ECR filed and paid 10 days late.** Monthly EPF liability (employer + employee, 12% + 12% on a ₹15,000 wage ceiling base, §06.2) for 60 employees ≈ ₹15,000 × 24% × 60 ≈ **₹2,16,000**. A 10-day delay incurs:
- Simple interest @ 12% p.a. (**[Verified — mirror]**, §06.2), auto-calculated by the portal and payable with the contribution (EV-039): ₹2,16,000 × 12% × (10/365) ≈ **₹710**. This is a forecast: the day-count convention, whether the admin charge sits in the base and the rounding are uncaptured parameters (`epf.interest_day_count`, `epf.interest_base`, `epf.rounding_method` — §06.2), so the exposure record replaces the forecast with the portal's own figure once the portal shows it, and a difference is a reconciling item, never an overwrite (§06.2).
- Late-return fee, because the return itself is late: 10 × ₹500 = ₹5,000, capped at the month's administrative charges (**[Verified — mirror]**, pull from the primary source before customer use — §06.2). At the carried admin-charge rate of 0.50% of PF wages (**[Hypothesis]**, not re-verified — §06.2) the cap is 0.50% × ₹9,00,000 = **₹4,500**, so this line is ₹4,500 at most and is tagged with both markers.
- Damages, at the employer's option (EV-039): ₹2,16,000 × `epf.damages_scale`(10 days). The scale has no shipped default — v0.3's graded percentages are carried, not re-captured, and EPFO's EDLI page still shows a legacy per-month figure (§06.2) — so the exposure record carries this line as "rate unverified", computes no rupee value until the parameter is captured from the notified text (§20), and never shows it to a customer as current (§08).
- Total exposure ≈ **₹710 interest + up to ₹4,500 late-return fee + the unpriced damages line** for one late month on one tenant. Small per event — but it is a *penalty incidence > 0*, which under §19.1 guardrail 2 is a **Sev-1 metric event** regardless of size and regardless of who caused it; the causation flag then decides whether it is also a product defect (for example, funds the employer did not remit are not). (Source: §06.2 — interest notified by S.O. 2698(E), portal label s.7Q; damages legacy s.14B / CoSS s.128.)

**Case B — a Form 138 quarterly statement filed 20 days late.** At the carried late fee of ₹200/day (`tds.late_fee_per_day`): 20 × ₹200 = **₹4,000**, subject to `tds.late_fee_cap`; the statement penalty `tds.penalty.statement_default` is also exposed, with no rupee value until it is re-captured. A single late quarterly statement therefore opens a **₹4,000 fee line + an unpriced contingent penalty line**, both marked **[Hypothesis]**. (Source: 1961-Act s.234E — ₹200/day from a secondary source, not primary-verified — and s.271H, carried, not re-captured; 2025-Act equivalents unmapped — §06.5, §06.13.)

**Case C — Form 130 (ex-Form 16) issued late.** The late-issue penalty is a per-day amount held as `tds.penalty.certificate_delay` (1961-Act s.272A(2)(g), carried, not re-captured, **[Hypothesis]**; 2025-Act equivalent unmapped — §06.5). Whether it accrues **per certificate** — the reading under which it scales with headcount × days — is not established in this PRD's sources and is routed to §20; if it does, 60 employees at 15 days late is **900 certificate-days** × `tds.penalty.certificate_delay`, a base that grows with headcount where Case A's grows only with the contribution amount. Two qualifiers keep this honest: Form 130 is **generated by TRACES**, not by us (EV-048), so our share of the chain is data preparation and distribution; and for Tax Year 2026-27 it is **BLOCKED pending the Q4 format** (EV-046), so a late issue caused by the unpublished format is a coverage gap (§19.12.1), not a product miss.

The lesson these cases encode into the metrics: **penalty incidence is reported in both count and ₹, and the ₹ is estimated at detection time using these formulas, each line tagged with its confidence marker.** A dashboard that shows "1 penalty incident" hides that Case C, under the per-certificate reading, multiplies a per-day amount by every affected employee while Case A's interest is a few hundred rupees. An exposure line whose rate is an uncaptured parameter is shown as **"unpriced"**, never as ₹0 and never with a guessed figure. Both the count (for the harm guardrail) and the ₹ (for materiality and for the customer's own compliance-SLA evidence board, §19.11.4) are first-class.

#### 19.3.3 The core quality metrics, defined

| Metric | Definition | Why it matters | Target direction |
| --- | --- | --- | --- |
| **On-Time Filing Rate** | in-coverage instances reaching FILED ≤ due date ÷ in-coverage instances due (§08 FR-PAY-711) | Directly gates the penalty clock | → 100% |
| **First-Time-Right (RFT) Rate** | FILED instances with no REVISED or SUPPLEMENTARY transition inside `rft_window_days` ÷ FILED instances | A late correction is a customer penalty and a trust event | → 100% |
| **Rejection Rate** | instances whose first SUBMITTED transition went to REJECTED ÷ instances submitted; reported per artefact family and per FR-PAY-713 error family (SA-FMT … SA-PORT), reproducible from the transition log alone (AC-713.3) | Rejections cause misses even when submitted early; the family split says *why* | → 0% |
| **Correction/Revision Rate** | instances with a REVISED or SUPPLEMENTARY transition ÷ instances ACCEPTED or FILED | Corrections are the leading signal of engine or data error | → 0% |
| **Penalty Incidence** | count and ₹ of interest, damages, fees and penalties charged to customers on covered filings, each flagged for whether platform causation is established | The harm metric; any non-zero value is Sev-1. The statutory liability stays with the employer (EV-K24) | = 0 |
| **Filing Coverage** | coverage-statement lines in IN_SLA — instrument-states the product takes from GENERATED to FILED as a portal-accepted artefact plus attended, assisted submission — ÷ applicable lines across the customer base, TENANT_SELF_FILES and NOT_APPLICABLE lines excluded from both (§05.21); externally BLOCKED instances are logged in the coverage-gap register | Prevents gaming the rate by narrowing scope | → 100% over phases |
| **Pre-Filing Validation Pass Rate** | payroll runs clearing all validation checks pre-submission ÷ runs | *Leading* indicator of rejection/correction | → 100% |
| **Time-to-Correct** | median hours from rejection/error detected to corrected filing accepted | Bounds penalty exposure when something does go wrong | ↓ minimise |
| **On-Time Margin** | median hours between the authority's FILED timestamp and the due-date deadline | A filing that lands 30 min before the 15th-midnight cutoff is fragile; measures buffer, not just pass/fail | ↑ maximise |
| **Product-Caused Miss Rate** | in-coverage instances missed with `miss_class` = product-caused (§05.9) ÷ in-coverage instances due | The rate the compliance desk and the SLA are held to (§05.9; §19.9.2); §05.3 DG-2b gates the 200–999 band on it | → 0% |
| **Late-Warning Share** | tenant-side blockers whose warning reached the tenant after the `tenant_action_lead[family]` point (§05.9 SS-3) ÷ tenant-side blockers warned | A tenant-caused miss is only tenant-caused if the warning was timely; a late warning converts it into a product-caused miss | → 0% |

**On-Time Margin — a leading refinement.** On-Time Filing Rate is binary and lagging; **On-Time Margin** is its continuous, leading cousin. A tenant base whose filings routinely land 2 hours before the deadline is one portal-outage away from a miss-spike; a base filing 5 days early is resilient. Tracking the *distribution* of on-time margin (p50/p90) surfaces fragility before it becomes a miss. **[Hypothesis]** On-Time Margin p10 collapses around due-date-day portal congestion (EPFO/TRACES load on the 15th and on 31 May). Kill/validate: if the margin distribution is uniform across the month, drop the metric; if it spikes toward zero on deadline day, it justifies the "file early" nudges and the due-date-window availability target (§19.9, §17 NFR-AVAIL-802).

#### 19.3.4 Acceptance criteria for the filing-quality subsystem

These are the pass/fail bars the instrumentation must be able to prove, not aspirations:

- **AC-1** Every filing instance carries the machine-readable transition log of the §08 FR-PAY-711 state machine — SCHEDULED, BLOCKED, GENERATED, VALIDATED, SUBMITTED, REJECTED, ACCEPTED, REVISED, SUPPLEMENTARY, PAYMENT_INITIATED, FILED — each transition with a UTC timestamp synced to NIC/NPL NTP (EV-062, §17), and every metric in §19.3 is reproducible from that log alone (FR-PAY-711 AC-711.1). A correction is a new REVISED or SUPPLEMENTARY transition linked as a diff, never a mutation of the accepted record (Part E-1).
- **AC-2** On-time is computed against the **instrument-and-state-specific due date**, effective-dated, so a due-date change (common in PT) recomputes historically correctly.
- **AC-3** A rejection or correction automatically opens a **penalty-exposure record** estimating the ₹ at risk (using the §19.3.1/§19.3.2 penalty formulas) and starts the Time-to-Correct clock.
- **AC-4** The wage-base engine's **two concurrent wage computations** (the 50% add-back base vs the payment-of-wages base — §08, the hardest calculation in the build) are each independently validated pre-filing; a mismatch between the base used and the base required for that instrument is a validation failure, not a warning.
- **AC-5** No statutory or monetary figure in any filing is model-generated (§08/§12 rules-first). The instrumentation must record the **computation provenance** (rule version, effective date) for every figure, so an audit can prove determinism.
- **AC-6** Every filing event stores the **due-date rule version** it was judged against, so that if a PT state later back-dates a deadline change, historical on-time is recomputed under the version in force for the period (AC-2), never silently overwritten.
- **AC-7** Every in-coverage instance not FILED by its due date carries exactly one `miss_class` — product-caused, tenant-caused or authority-caused (§05.9) — with a root-cause reference, an FR-PAY-713 family code wherever one applies. A miss still unclassified when the next instance of the same family falls due is counted product-caused until classified, because the burden of the causation record is ours (§18.3).
- **AC-8** The On-Time Filing Rate counts every miss, whatever its class; only the SLA measures (Product-Caused Miss Rate, §19.9.2) set tenant- and authority-caused misses aside. The rate the customer experiences is never improved by re-attributing misses.

**[Verified]** The two-wage-base requirement and rules-first/no-model-generated-figures constraints are load-bearing correctness decisions from §08/§12, restated here as measurable acceptance criteria (Source: Code on Wages s.2(y); Code on Social Security s.2(88) — EV-010; PRD §06.10, §08, §12).

#### 19.3.5 From transition to counter — the derivation contract

AC-1 says every §19.3 metric is reproducible from the FR-PAY-711 transition log alone. That is a
correctness claim, and it only holds if the derivation is written down. No metric query reads the
log directly: each filing instance carries one **counter row**, written only by transition events,
and every metric reads counters. Two consequences follow — a metric can be recomputed by replaying
events into a fresh counter row, and a metric can never be "fixed" by a hand-edit that the log does
not justify.

<!-- DIAGRAM: metrics-filing-counter-derivation -->

**The derivation table.** One row per transition. "Writes" names the counter fields the transition
sets; "idempotency key" is what makes a redelivered event a no-op; "ordering rule" is what the
consumer does when events arrive out of order (§19.11.6 specifies the arrival machinery).

| Transition (FR-PAY-711) | Event | Writes | Idempotency key | Ordering rule |
| --- | --- | --- | --- | --- |
| → SCHEDULED | `filing.scheduled` | `instance_id`, `tenant_id`, `registration_id`, `instrument`, `state`, `period`, `due_date`, `due_date_rule_version`, `coverage_statement_version`, `coverage_state`, `in_denominator` | `instance_id` | First writer wins; a second `scheduled` for the same instance is a duplicate-instance defect (T-19-19) |
| → BLOCKED | `filing.blocked` | `block_reason`, `block_side` ∈ {external, tenant}, and `in_denominator` recomputed by §19.1.2's split | `instance_id` + `block_reason` + transition timestamp | Latest block state wins; every block is retained for the ageing metric |
| → GENERATED | `filing.generated` | `generated_ok = true`, `artefact_ref`, `source_payrun_version`, `computation_provenance` | `instance_id` + `attempt_no` | Monotonic — a later GENERATED opens a new `attempt_no`, never overwrites the first |
| → VALIDATED | `filing.validated` | `validated_at`, `blocking_check_count`, `flag_count` (EV-040 flags, which are not failures) | `instance_id` + `attempt_no` | As GENERATED |
| → SUBMITTED | `filing.submitted` | `attempt_no` incremented, `submission_mode`, `delivery_mode`, `submitted_by`, `authority_to_act_document_id` | `instance_id` + `attempt_no` | Strictly increasing `attempt_no`; a submitted event with an `attempt_no` already seen is a duplicate |
| → REJECTED | `filing.rejected` | `rejected_attempts` incremented, `reject_family` (FR-PAY-713), `reject_detail_ref` | `instance_id` + `attempt_no` | **Terminal for gate 3**: once `rejected_attempts > 0` the instance can never re-enter OTAF, whatever happens next |
| → ACCEPTED | `filing.accepted` | `accepted_at`, `accepted_attempt_no` | `instance_id` + `attempt_no` | Only the first ACCEPTED is kept; a second is a defect |
| → PAYMENT_INITIATED | `filing.payment_initiated` | `payment_initiated_at` | `instance_id` + `challan_ref` | Multiple challans are permitted (EV-036), so this is a set, not a scalar; the earliest initiation closes the EV-037 revision window |
| → FILED | `filing.filed` | `authority_ts_utc`, `ack_ref`, `on_time`, `on_time_margin_hours`, `completing_receipt_ref` | `instance_id` + `ack_ref` | Where several challans complete one return (EV-036), the **latest** receipt among those linked sets `authority_ts_utc`; a part-payment file (EV-044) never completes the instance |
| → REVISED / SUPPLEMENTARY | `filing.revised`, `filing.supplementary` | `correction_count` incremented where the transition timestamp is inside `rft_window_days[instrument]`, `correction_route` ∈ {REVISED, SUPPLEMENTARY} | `instance_id` + `correction_ref` | Append-only; a correction is a diff linked to the instance, never a mutation (AC-1, Part E-1) |
| (derived) settlement | `filing.rft_settled` | `right_first_time` resolved from `correction_count` | `instance_id` | Emitted once, when the window closes; before it, `right_first_time` is `null` and the instance is excluded from the RFT denominator |
| (derived) miss | `filing.miss_classified` | `miss_class`, `root_cause_ref`, `warning_delivered_at` | `instance_id` + `classification_version` | Re-classification writes a new version and restates (§19.11.6); the prior class is kept |

**The counter row — data definition.** One row per filing instance. Fields not listed on the event
schema in §19.11.2 are derived here and stored, not recomputed at query time, so that a query and a
dashboard cannot disagree.

| Field | Type | Written by | Null until | Mutable after write |
| --- | --- | --- | --- | --- |
| `instance_id` | opaque id | `filing.scheduled` | never | no |
| `in_denominator` | bool | scheduled, blocked, coverage | never | yes — only by a coverage or block transition, each of which restates (§19.11.6) |
| `generated_ok` | bool | generated | scheduling | no once true |
| `attempt_no` | int | submitted | first submission | monotonic only |
| `rejected_attempts` | int | rejected | scheduling (0) | monotonic only |
| `authority_ts_utc` | timestamp | filed | FILED | only by a later completing receipt (EV-036) |
| `on_time` | bool | filed | FILED | recomputed only when `due_date_rule_version` changes (AC-6) |
| `on_time_margin_hours` | decimal | filed | FILED | as `on_time` |
| `correction_count` | int | revised, supplementary | scheduling (0) | monotonic only, and only inside the window |
| `right_first_time` | bool | rft_settled | window close | no |
| `miss_class` | enum | miss_classified | the due date passing unfiled | yes, with a classification version |
| `otaf_eligible` | bool | derived | window close | no — it is the conjunction of the four gates and is written once, at settlement |

**`otaf_eligible` is written at settlement, not at FILED.** This is the single most important
consequence of the RFT gate: an instance's OTAF contribution is not knowable on the day it is filed,
only when `rft_window_days[instrument]` closes. Every OTAF figure for a period is therefore
**provisional until the last window in that period closes**, and the board carries both numbers —
`OTAF_settled` and `OTAF_provisional` — never one of them silently (AC-15).

**A worked instance trace — one ECR, four gates, four different answers.** Case A's tenant (60
employees, Maharashtra, monthly dues ≈ ₹2,16,000 — §19.3.2), September 2026 wage month, ECR due
15 October 2026, coverage statement v7, line IN_SLA, Mode B. Times are IST for readability; the
stored values are UTC (AC-1).

| # | When | Transition | Counter after | Metric effect |
| --- | --- | --- | --- | --- |
| 1 | 01 Oct | SCHEDULED | `in_denominator = true`, `attempt_no = 0`, `rejected_attempts = 0` | Enters the denominator of On-Time, Integrity and Coverage |
| 2 | 08 Oct 11:02 | GENERATED from the LOCKED payroll snapshot | `generated_ok = true`, `attempt_no = 1` artefact | Gate 1 satisfied |
| 3 | 08 Oct 11:04 | VALIDATED — 0 blocking failures, 2 flags: one member joined after 1 Sep 2014 with wages above ₹15,000 (EV-040, a flag shown before filing, not a rejection) | `blocking_check_count = 0`, `flag_count = 2` | Pre-Filing Validation Pass Rate: **pass**. A flag never counts as a failure (AC-14) |
| 4 | 09 Oct 10:20 | SUBMITTED, Mode B | `attempt_no = 1` | Enters the Rejection Rate denominator |
| 5 | 09 Oct 10:51 | REJECTED — the file carried an EPS contribution for a member who had crossed 58, the one hard system block (EV-040) | `rejected_attempts = 1` | **Gate 3 fails permanently.** Time-to-Correct clock starts (AC-3); a penalty-exposure record opens |
| 6 | 10 Oct 09:40 | GENERATED again, then SUBMITTED | `attempt_no = 2` | Rejection Rate reads the *first* attempt only, so the second submission does not enter the denominator again |
| 7 | 10 Oct 12:15 | ACCEPTED — return statement approved | `accepted_at`, `accepted_attempt_no = 2` | Time-to-Correct stops at 25h 24m |
| 8 | 12 Oct 14:55 | PAYMENT_INITIATED, one challan with a TRRN | `payment_initiated_at` | The EV-037 revision route closes from this moment — the verification gate sat immediately before it |
| 9 | 12 Oct 15:38 (authority timestamp) | FILED — receipt captured | `authority_ts_utc`, `on_time = true`, `on_time_margin_hours ≈ 80.4` | On-Time Filing Rate: **pass**. Margin measured against `due_instant[EPF_ECR]` |
| 10 | window close | RFT settled, `correction_count = 0` | `right_first_time = true`, `otaf_eligible = false` | RFT Rate: **pass**. **OTAF contribution: 0** |

The instance is on time, right-first-time, accepted, never corrected — and contributes **nothing** to
OTAF, because it was rejected once. That divergence is deliberate and is the reason OTAF is not
reported as "filings filed on time": a rejection consumed an operator session, moved a tenant's
buffer from six days to three, and is the leading signal of an engine or data defect. The same trace
also produces On-Time 1/1, RFT 1/1, Rejection 1/1 and Integrity 0/1 — four metrics, four answers,
one instance. A dashboard that reports only one of them will mislead.

**The deadline instant is a named parameter.** `on_time` compares `authority_ts_utc` against the
*instant* the due date ends, and no source in this PRD fixes that instant — whether a 15 October due
date ends at 23:59:59 IST, at a portal cut-off earlier in the day, or at the close of the portal's
own business day. It is the parameter **`due_instant[instrument, state]`**, owner the Statutory desk
lead, routed to §20 alongside V-09. Until it is captured per instrument, the platform judges on the
calendar date alone (a filing whose authority date is on or before the due date is on time) and
**On-Time Margin is reported in days, not hours**, because an hours figure computed against a guessed
instant is fabricated precision. Margin in hours becomes reportable per instrument the moment that
instrument's instant is captured — which is also when the ≥ 24h p10 target in §19.12.1 becomes
judgeable for it.

- **AC-13** Every §19.3 metric is defined as a pure function of the counter row, and every counter
  field is written by exactly one transition type in the derivation table. A metric query that reads
  the transition log directly, or a counter field with no writer in the table, fails review.
- **AC-14** A validator flag (EV-040's post-1-Sep-2014-above-₹15,000 case among them) never
  increments a failure counter and never depresses Pre-Filing Validation Pass Rate; only a blocking
  check does. Flags are reported as their own series, because a flag that is *always* overridden is a
  validator-quality defect, not a compliance signal.
- **AC-15** Any OTAF, Integrity or RFT figure published for a period whose settlement windows have
  not all closed is labelled provisional and carries the count of unsettled instances. A provisional
  figure is never compared against a settled one in the same chart without that label.
- **AC-16** Replaying an instance's events in timestamp order into an empty counter row reproduces the
  stored row exactly, for every instance, in a nightly job. A mismatch quarantines the instance from
  every metric until it is reconciled, and the quarantine count is itself published (§19.11.6).

#### 19.3.6 Edge cases and negative cases in filing measurement

Each row is a case the naive implementation gets wrong, the rule that governs it, and the test that
proves it. "Counted" states the effect on OTAF's numerator (N) and the in-coverage denominator (D).

| # | Case | Evidence | Rule | Counted | Test |
| --- | --- | --- | --- | --- | --- |
| EC-01 | A NIL month — no active members, so no ECR file exists | EV-042 (NIL months use no file; admin and inspection charges go through Direct Challan Entry, enabled only when there are no active members) | The obligation exists but no artefact does. The instance is recorded `NIL_DECLARED`, published as its own count, and gate 1 cannot be satisfied by a file | Out of N and out of D | T-19-01 |
| EC-02 | Whether a NIL month breaks a tenant's filing streak | EV-042 | A NIL month **satisfies** Filing-Streak Health — the streak measures abandonment, not volume | n/a | T-19-01 |
| EC-03 | One return settled by several challans | EV-036 (multiple challans permitted) | The instance completes on the **latest** linked receipt; every challan is retained for the evidence bundle | N only if that latest receipt is on time | T-19-02 |
| EC-04 | A part-payment contribution file is uploaded | EV-044 (6 fields, `#~#`) | A part payment never sets FILED. The instance stays open and keeps running toward its due date | Still in D, not yet in N | T-19-03 |
| EC-05 | A Supplementary return for members absent from every prior return for the month | EV-037 | It is a *correction route*: inside the window it sets `correction_count` and fails gate 4 for the Regular instance. It does not create a second instance | Regular leaves N; no new D | T-19-04 |
| EC-06 | A Revised return attempted after payment was initiated | EV-037 (a Revised return requires no payment initiated) | Impossible at the authority. A REVISED transition timestamped after PAYMENT_INITIATED on an ECR instance is a **data defect**: quarantine the instance and alert, never silently count it | Quarantined | T-19-05 |
| EC-07 | An approved return the tenant wants cancelled | EV-036 (an approved return can never be cancelled) | There is no cancel path to measure. The only routes are Revised and Supplementary; a "cancellation" request is recorded as a correction intent and resolved into one of them | — | T-19-06 |
| EC-08 | Month M cannot be filed because M−4's returns are missing | EV-038 (strict chronological filing, four-month transitional relaxation) | BLOCKED, tenant-side: the obligation is live and the deadline runs, so it **stays in D**. It also increments **Chronology Debt** and breaks Ledger Continuity | In D, not in N | T-19-07 |
| EC-09 | A month's filing is blocked pending a joint declaration to correct a date of exit | EV-041 (joint declaration by employer and employee) | BLOCKED, tenant-side, with an offline dependency: stays in D; the warning clock under SS-3 starts when the dependency is detected, not when it is resolved | In D | T-19-08 |
| EC-10 | An arrear batch is due | EV-043 (separate File Arrear Return flow; **no arrear file layout is published**) | No arrear instance is ever judged on time: the line is CARVED_OUT_FENCE and the instance goes to the coverage-gap register. PF liability on arrears dates from the **disbursal date**, not the wage month (Part E-9), so the instance's period is the disbursal period — a wage-month period on an arrear instance is a defect | Out of D | T-19-09 |
| EC-11 | Form 138 Q4 for Tax Year 2026-27 | EV-046 (regular and correction formats unreleased) | Out of D, coverage-gap register, authority-caused. Annexure II data is prepared continuously so that publication makes it a writer problem, not a data problem | Out of D | T-19-10 |
| EC-12 | Form 130 issued late because Q4 is unpublished | EV-046, EV-048 (TRACES generates it) | Certificate issuance is tracked as its own series, never as an OTAF filing; a delay caused by the unpublished format is a coverage gap, not a product miss | Out of both | T-19-10 |
| EC-13 | An RPU/FVU version mismatch rejects a statement | EV-052 (RPU 1.2 + FVU 1.2 from Tax Year 2026-27; RPU 6.0 + FVU 9.5 for FY 2010-11 to FY 2025-26; mixing causes rejection) | A rejection whose cause is our toolchain selection is product-caused and carries the FR-PAY-713 format family. The period's Tax-Year field (six digits, EV-050) selects the stack, so the metric also records `fvu_stack_used` for the post-mortem | Fails gate 3 | T-19-11 |
| EC-14 | A statement rejects because the deductor's TRACES profile is stale, and the form auto-populates from it | EV-051 | Authority-side reference data the tenant owns: `miss_class` = tenant-caused **only if** the warning reached the tenant before the SS-3 point; otherwise product-caused | Fails gate 3 either way | T-19-12 |
| EC-15 | A correction statement filed on a Q1–Q3 correction format | §19.1.2's worked example | Inside the window it fails gate 4 for that quarter's instance. Outside it, the instance keeps its OTAF credit and the correction is still counted in Correction/Revision Rate — the two metrics have different windows by design | Gate 4 | T-19-13 |
| EC-16 | A period whose PT due day is an uncaptured parameter | §06.11; SS-4 | Never judged on time or late. It is filed, tracked, and excluded from both N and D until `pt.<state>.due_day` is captured | Out of both | T-19-14 |
| EC-17 | Maharashtra reassigns a registration's PT frequency for the year | EV-032 context; §06.11 (Maharashtra assigns frequency per registration each year) | The instance generator re-derives instances for the year under the new frequency, effective-dated. Instances already due keep their judgement under the version in force on their due date (SS-5) | Restatement, not overwrite | T-19-15 |
| EC-18 | LWF for a state whose periodicity is unknown | EV-032, §06.8 (only Karnataka's is verified: annual, calendar year, due 15 January) | Only Karnataka LWF can be judged on time today. Every other state's LWF is a coverage-gap entry | Out of both | T-19-16 |
| EC-19 | A tenant self-files an instrument the product generated | §05.21 TENANT_SELF_FILES | Outside Filing Coverage and outside both N and D. The artefact-generation event is still counted for Activation Depth, because the tenant did get the artefact | Out of both | T-19-17 |
| EC-20 | An instance is due in the window between a tenant's onboarding and `sla_onboarding_lead_days` | SS-1 | In the raw On-Time denominator (the customer experiences it) but outside the SLA's covered set. AC-8's rule stands: the raw rate is never improved by scope | In D, not SLA-covered | T-19-18 |
| EC-21 | Two instances exist for the same registration × obligation × period | — | A duplicate-instance defect. Both quarantine; neither counts; the alert is immediate, because a duplicate silently doubles a denominator | Quarantined | T-19-19 |
| EC-22 | An instance whose coverage state changed between scheduling and the due date | SS-5, §05.21 | Judged under the coverage-statement version in force **on the due date**, not the version at scheduling. The counter row stores both | Per due-date version | T-19-20 |
| EC-23 | Damages are deposited later, at the employer's option, after the return is filed | EV-039 (interest mandatory and auto-calculated; damages at the employer's option) | A later damages deposit is **not** a correction and does not touch gate 4. It is a penalty-incidence event with its own record | No gate effect | T-19-21 |
| EC-24 | A tenant asks for its historical on-time rate under the old vocabulary — "our 24Q record" | EV-050 (24Q→138, 16→130, 12BB→124; Financial Year → Tax Year) | Every metric row carries both instrument vocabularies as aliases, and period labels accept both "Financial Year" and "Tax Year" forms. A search on the superseded name returns the same rows | Presentation only | T-19-22 |
| EC-25 | The ECR layout is re-engineered mid-year | EV-035 (the re-engineered ECR, beta from wage month September 2025, did not change the layout) | A layout version change restates nothing by itself; only a change that alters what a field means triggers restatement (§19.11.6). The counter row stores the artefact format version so the question is answerable from rows | No effect unless semantics change | T-19-23 |

- **AC-17** Every row above is enforced in code by a named check, and the check's identifier is stored
  on the counter row when it fires. A case handled only by convention is not handled.
- **AC-18** Quarantined instances (EC-06, EC-21, and AC-16's replay mismatches) are excluded from
  every metric **and** published as a quarantine count beside the metrics they would have joined. A
  silent exclusion is indistinguishable from a metric that was gamed.

#### 19.3.7 Test scenarios for the filing-metric subsystem

Given/when/then scenarios a build team can turn into fixtures. Each asserts *metric values*, which is
what makes them useful: an implementation can pass a state-machine test and still compute the wrong
rate. The tenant is Case A's 60-employee Maharashtra tenant unless stated.

| ID | Given | When | Then |
| --- | --- | --- | --- |
| T-19-01 | A PF establishment with no active members for the month | The NIL month is declared and the wage month closes | `NIL_DECLARED` count = 1; OTAF numerator and denominator both unchanged; Filing-Streak Health unbroken; Ledger Continuity unbroken |
| T-19-02 | One ECR return settled by two challans, receipts at 14 Oct 18:00 and 16 Oct 09:00 | Both receipts are captured | `authority_ts_utc` = 16 Oct 09:00; `on_time = false`; OTAF contribution 0 — the earlier receipt must not be allowed to "win" |
| T-19-03 | A part-payment contribution file is uploaded on 14 Oct | The wage month's balance is unpaid on 16 Oct | The instance is not FILED; On-Time Filing Rate records a miss; no OTAF credit; the penalty-exposure record is open |
| T-19-04 | A Regular return ACCEPTED and FILED on 12 Oct; two members were absent from every prior return | A Supplementary return is filed on 20 Oct, inside `rft_window_days[EPF_ECR]` | `correction_count = 1`; `right_first_time = false`; `otaf_eligible = false`; On-Time Filing Rate still counts the instance as on time |
| T-19-05 | An ECR instance with PAYMENT_INITIATED at 12 Oct 14:55 | A REVISED transition arrives timestamped 13 Oct | The instance is quarantined, an alert fires naming EV-037, and no metric moves |
| T-19-06 | An ACCEPTED return | The tenant requests cancellation | No cancel transition exists; a correction intent is recorded and resolved to REVISED or SUPPLEMENTARY; metrics move only when that transition lands |
| T-19-07 | An establishment with no Regular return filed for June | The September instance is generated | September is BLOCKED tenant-side, stays in the denominator, Chronology Debt = 3 establishment-months, Ledger Continuity = false for that establishment |
| T-19-08 | A member's date of exit is wrong and a joint declaration is pending | The wage month's ECR cannot be filed | BLOCKED tenant-side; in the denominator; the SS-3 warning clock runs from detection; if the first warning is delivered after the SS-3 point, `miss_class` = product-caused |
| T-19-09 | An arrears batch approved in October for March wages | The arrear return flow is used | No on-time judgement is made; the instance's period is the **disbursal** period; the coverage-gap register carries it against the unpublished arrear layout |
| T-19-10 | Tax Year 2026-27 Q4 and its Form 130 | The 31 May due date passes with the format unpublished | Neither appears in N or D; both appear in the coverage-gap register as authority-caused; no SLA claim can open |
| T-19-11 | A Tax Year 2026-27 statement prepared with the FY 2010-11–2025-26 stack | The statement is submitted and rejected | `rejected_attempts = 1`; product-caused; `fvu_stack_used` recorded; the error family is the format family |
| T-19-12 | A statement rejects on stale TRACES profile data | The tenant had been warned 9 days before the due date, before the SS-3 point | `miss_class` = tenant-caused; the raw On-Time rate still counts the miss (AC-8); no SLA claim is payable |
| T-19-13 | A Q2 statement FILED on time and a correction statement filed after `rft_window_days[TDS_138]` closes | The settlement job runs | `right_first_time = true` and OTAF credit stands; Correction/Revision Rate still counts the correction |
| T-19-14 | A Maharashtra PT return with `pt.MH.due_day` unset | The return is generated and filed | The instance is excluded from N and D; it appears in the coverage-gap register with reason `parameter`; no on-time or late claim is made anywhere in the product |
| T-19-15 | A registration's PT frequency changes for the year | The new frequency is published and effective-dated | Future instances regenerate; instances already due keep their judgement; the affected metric-periods are restated with a visible note, never edited in place |
| T-19-16 | A Karnataka LWF remittance due 15 January and a second state's LWF with unknown periodicity | Both periods close | Karnataka is judged; the other is a coverage-gap entry; the two never appear inside one blended "LWF on-time" number |
| T-19-17 | A tenant on TENANT_SELF_FILES for ESI | The artefact is generated and the tenant uploads it | Activation Depth counts ESI; Filing Coverage excludes it from both numerator and denominator; no OTAF credit |
| T-19-18 | A tenant admitted on the 14th, ECR due on the 15th | The instance misses | In the raw On-Time denominator and counted as a miss; outside the SLA's covered set under SS-1; no claim opens |
| T-19-19 | Two instances for the same registration × obligation × period | The duplicate is detected | Both quarantine; the quarantine count publishes; no rate moves until reconciliation |
| T-19-20 | Coverage v7 has the line IN_SLA on the due date; v8 carves it out two days later | Metrics are computed for the period | The instance is judged under v7; a recomputation after v8 returns the same answer |
| T-19-21 | An ECR filed late, interest auto-calculated by the portal, damages deposited two months later | The damages deposit is recorded | Penalty Incidence records both events; neither touches gate 4; the instance's `right_first_time` is unchanged |
| T-19-22 | A tenant searches its record for "24Q" | The catalogue is queried | Form 138 rows return, labelled with both vocabularies; the same holds for 16/130 and 12BB/124 |
| T-19-23 | The ECR artefact format version increments with no change to field meaning | Metrics are recomputed | No restatement; `artefact_format_version` differs on the counter rows and the difference is queryable |
| T-19-24 | A month of authority timestamps arrives after the weekly board was sealed | The late batch lands | §19.11.6's restatement rule decides; the sealed run version is never edited; the restated figure publishes with a note |

#### 19.3.8 Small-numbers discipline — when a rate may be reported at all

A rate on a small base is a story, not a measurement, and the Phase-1 targets in §19.12.1 are easy to
breach or flatter by one event. The arithmetic, using §05.4's v1 exit cohort of 40 paying tenants —
the only cohort size this PRD carries — and a conservative registration profile of one PF and one ESI
code per tenant:

| Instrument family | Instances per month at 40 tenants | Instances per quarter | What one miss is worth | What the target implies |
| --- | --- | --- | --- | --- |
| ECR (monthly) | 40 | 120 | 0.83% of a quarter | A ≥ 99% quarterly target permits **1** miss in 120, and breaks on the 2nd |
| ESI (monthly) | 40 | 120 | 0.83% | Same; ECR and ESI share the 15th, so their misses correlate — a portal-wide event on the 15th costs both |
| ECR + ESI combined | 80 | 240 | 0.42% | ≥ 99% permits **2** misses per quarter |
| Form 138 (quarterly) | — | 40 | 2.5% | A ≤ 2% rejection target is **unreachable at this base**: one rejection is 2.5%, zero is 0% — the metric has no value between them |
| Form 130 (annual) | — | — | — | One observation per tenant per year; a percentage is meaningless |

Three rules follow, and they are how this section avoids reporting noise as performance:

1. **Report the count until the base clears `min_instances_for_rate[family]`.** Below it, the board
   shows "2 misses in 240 instances", never "99.2%". The parameter is unsized here — it belongs with
   the statistical convention the analytics owner picks — and is routed to §20 with the Growth
   review as owner.
2. **Quarterly and annual instruments are reported as counts and as time series of counts, never as
   rates, until at least four periods exist.** Form 138's ≤ 2% rejection target is judged over the
   rolling four quarters, not a single one; Form 130 is judged as "certificates issued by the due
   date, count and share of the tenant base", in the year it becomes judgeable at all (EV-046).
3. **A target breached by a single event is escalated as an event, not as a rate.** One ECR miss in a
   quarter breaches ≥ 99% by arithmetic but is a single root-cause investigation; the escalation is
   the investigation, and the rate is reported with its base beside it.

- **AC-19** Every rate published anywhere in the product or in a review carries its numerator and
  denominator counts in the same view. A bare percentage is a review defect, and the metric-integrity
  audit (§19.14) checks for it.
- **AC-20** A metric whose base is below `min_instances_for_rate[family]` renders as a count, with the
  rate suppressed rather than shown greyed — a suppressed rate cannot be screenshotted into a deck.

#### 19.3.9 The coverage-gap register — specification

Guardrail 3 works only if the excluded instances are visible. §05.9, §05.18, §05.21 and §06.11 all
route their carve-outs, fences, parameter holds and unconfirmed due dates to "§19's coverage-gap
register"; this subsection is that register. It is the **denominator's audit trail**: a record of
every obligation the product recognised and did not judge, why, who is waiting on what, and how long
it has been waiting. Without it, Filing Coverage and Filing-Integrity are the same number said twice
and either can be improved by narrowing scope.

<!-- DIAGRAM: metrics-coverage-gap-register -->

**Entry — data definition.** One entry per (tenant, registration, obligation, blocker), not per
instance; instances attach to it.

| Field | Meaning |
| --- | --- |
| `gap_id` | Stable id, quoted in every notice and in the coverage statement's carve-out line |
| `tenant_id`, `registration_id`, `instrument`, `state` | Scope. A cross-tenant blocker such as the Q4 format opens one entry per affected tenant, all pointing at one `blocker_ref` |
| `reason_class` | `external_format` \| `external_regime` \| `parameter` \| `desk_read` \| `tenant_self_files` \| `not_offered` — mapped one-to-one onto §05.21's coverage states, so the two can never disagree |
| `blocker_ref` | The fence, hold or admission rule in §05 that the entry resolves against (§05 SI-04 requires it to resolve) |
| `evidence_ref` | The EV ID or research file the block rests on — EV-046 for the Q4 format, EV-043 for the arrear layout, EV-042 where a NIL path applies, §06.11 for an unset due day |
| `opened_at`, `aged_days` | The ageing clock. It restarts on reopening, and the prior span is kept |
| `instances_attached[]` | The instances excluded from N and D by this entry, with their periods — the number the register exists to make countable |
| `owner` | Statutory desk lead by default; the Filing desk lead where the blocker is ours |
| `unblock_condition` | In plain words: what event closes it. A condition nobody can state is not a gap, it is an unknown, and is escalated |
| `customer_notice_ref` | The carve-out notice the tenant was given (§05.21) — so the register can prove the exclusion was disclosed, not silent |
| `state` | Per the transition table below |

**Transition table.**

| # | From → To | Event | Guard | Side effect | Who may trigger |
| --- | --- | --- | --- | --- | --- |
| G1 | *(none)* → OPEN_* | An instance is excluded from N and D | The exclusion has a `reason_class` and a resolvable `blocker_ref` | The tenant's coverage statement shows the carve-out line; the instance links to `gap_id` | System, at instance scheduling |
| G2 | OPEN_* → WATCHED | A watch key or capture task is registered | The watcher covers the blocker's source, corrigenda included (§19.9.1) | Entry enters the ageing report | Statutory desk lead |
| G3 | WATCHED → WATCHED | Monthly ageing review with no change | — | `aged_days` published; above `gap_age_escalation_days` it escalates | Statutory desk lead |
| G4 | WATCHED → READY | The format, rule or parameter is published and verified | Two-person review passed (§22's pipeline) | The line is queued for the next coverage-statement version | Statutory desk lead |
| G5 | READY → CLOSED | The coverage statement re-versions the line | SS-1's lead applies to the first instance judged | Instances due after the version re-enter N and D; historical instances stay excluded (SS-5) | Filing desk lead |
| G6 | CLOSED → REOPENED | The blocker returns — a corrigendum withdraws a format, a parameter hold re-applies | The reopening is evidenced | A new carve-out notice is issued before the next due date it affects | Statutory desk lead |
| G7 | REOPENED → WATCHED | Re-aged | — | Ageing restarts, prior span retained | Statutory desk lead |

**The register's own metrics.** Three, because a register nobody measures becomes a graveyard:

| Measure | Numerator | Denominator | Target |
| --- | --- | --- | --- |
| Coverage-Gap Instance Share | Instances attached to open entries | Instances attached + in-coverage instances due | ↓, and always published beside Filing-Integrity Rate |
| Coverage-Gap Ageing (p50, p90) | `aged_days` across open entries | — | Trend; any entry above `gap_age_escalation_days` is named in the statutory-change review |
| Unstated-Blocker Count | Open entries whose `unblock_condition` is empty or whose `blocker_ref` does not resolve | Open entries | **0** — §05 SI-04's check, read as a metric |

**Worked register at the Phase-1 gate.** The entries this PRD already knows about, for one 60-employee
Maharashtra tenant with one PF code, one ESI code, one PTRC and one TAN:

| `gap_id` | Scope | `reason_class` | Evidence | Instances attached per year | Unblock condition |
| --- | --- | --- | --- | --- | --- |
| G-Q4 | Form 138 Q4, Tax Year 2026-27 | `external_format` | EV-046 | 1 | CBDT publishes the Q4 regular format; the correction format is tracked as its own entry |
| G-130 | Form 130 for Tax Year 2026-27 | `external_format` | EV-046, EV-048 | 1 issuance | G-Q4 closes and TRACES generates |
| G-ARR | ECR arrear return | `external_format` | EV-043 | 0 until an arrear batch exists | An arrear file layout is published |
| G-ESI-CLIFF | ESI periods after the saving lapses | `external_regime` | §06.9, EV-004 | up to 12 | A successor or extension is notified and corrigendum-checked |
| G-PT-MH | Maharashtra PT return timing | `parameter` | §06.11 | the registration's cadence for the year | `pt.MH.due_day` captured from the state source |
| G-TDS-DEP | TDS deposit timing | `desk_read` | §06.13 | 12 | r.218's dates are read and published |

Six entries against the 29 central obligation-instances a year this tenant recognises — 12 ECR,
12 ESI, four Form 138 quarters and one Form 130 issuance, plus a PTRC cadence it cannot yet count
(G-PT-MH) — is the honest picture of v1 coverage, and it is exactly what the register exists to
keep visible: the Filing-Integrity Rate for this tenant is computed on the ECR and ESI lines and
the three judgeable Form 138 quarters, 27 of the 29, and every review that quotes that rate quotes
the gap share beside it.

- **AC-21** No instance is excluded from the in-coverage denominator without an open register entry.
  A nightly reconciliation compares excluded instances against attached instances; a difference of one
  is an alert, because the difference *is* the gaming surface.
- **AC-22** Every open entry resolves to a live blocker in §05's fence, hold or admission registers.
  An entry whose blocker has closed but which is still open is surfaced weekly — that is a coverage
  line we could have shipped and did not.
- **AC-23** Closing an entry never restates history: instances excluded while it was open stay
  excluded, judged under the coverage-statement version in force on their due dates (SS-5).
- **AC-24** The tenant-facing view of the register shows exactly the entries scoping that tenant, with
  their notices — the same rows the internal view shows, never a subset. A gap disclosed internally
  and not to the tenant is a disclosure failure under §19.9.2's Disclosure row.

---

### 19.4 Activation metrics — from signup to first filing

Activation is the leading input-layer metric that most strongly predicts OTAF. For a filing-first product, **"activated" is not "logged in" or "ran a payroll" — it is "completed a first accepted statutory filing."** That definition is deliberately hard, because a tenant that never files never delivers value and will churn regardless of engagement.

| Metric | Definition | Why | Target (see §19.12) |
| --- | --- | --- | --- |
| **Activation Rate** | tenants reaching first accepted filing ÷ tenants onboarded | The core input metric | Phase-gated |
| **Time-to-First-Filing (TTFF)** | median days from signup to first accepted filing | Mid-year cutover is the churn-concentration point (§18) | ↓ minimise |
| **Migration Completeness** | % of required opening balances captured (YTD earnings, TDS-already-deducted, PF UAN/ESI IP continuity, leave balances, gratuity accrual) | Migration is a first-class surface (§18); incomplete migration causes downstream filing errors | → 100% before first filing |
| **Statutory-Registration Linkage** | % of tenants with PF code, ESI code, PT registration(s), TAN captured and validated | Cannot file without these; hypothesised to be the #1 activation blocker (below) | → 100% |
| **Importer Conversion** | % of tenants who used a Tally/Zoho/Kredily/Frappe importer and reached first filing | Importers are acquisition infrastructure (§18), so their yield is an activation metric | Track per importer |
| **Cutover-Timing Mix** | share of activations at start-of-FY (Apr) vs mid-year | Mid-year cutover concentrates opening-balance risk (§18); the mix predicts migration-error load | Track; nudge to Apr |

**The activation funnel (onboarding sub-funnel):**

```
Signup
  → Company + statutory codes captured        [Registration Linkage]
  → Employees imported / migrated             [Migration Completeness]
  → First payroll run completed               [Process metric]
  → First filing generated + validated        [Pre-Filing Validation]
  → First filing submitted + accepted         [ACTIVATED]
```

Each arrow is an instrumented drop-off point. **[Hypothesis]** The largest activation drop-off is at statutory-registration linkage, because a 20–49 tenant crossing the EPF threshold of 20 (EV-057, §06) may not yet have its PF code sorted. Kill/validate: instrument the funnel from first cohort; if linkage is the top drop, ship a guided PF/ESI/PT registration assist (a candidate AI use case, §12) and measure lift.

#### 19.4.1 A worked activation funnel — 100 onboarded tenants

Illustrative Phase-1 numbers (planning anchors, **[Hypothesis]**, to be replaced by the first cohort) showing how a 60% activation target decomposes and where to intervene:

| Funnel stage | Tenants reaching stage | Step conversion | Cumulative | If this is the worst step → |
| --- | --- | --- | --- | --- |
| Signup | 100 | — | 100% | Acquisition problem, not activation (§19.7) |
| Statutory codes captured | 78 | 78% | 78% | Ship guided PF/ESI/PT registration assist (§12) |
| Employees imported/migrated | 70 | 90% | 70% | Improve Tally/Zoho importers (§18) |
| First payroll run completed | 66 | 94% | 66% | Payroll UX / validation clarity (§08) |
| First filing generated + validated | 63 | 95% | 63% | Pre-filing validation false-positives |
| **First filing accepted [ACTIVATED]** | **60** | 95% | **60%** | Portal/format defects, rejection handling |

In this profile, **statutory-registration linkage (78%) is the dominant leak** — consistent with the hypothesis above — and a 10-point improvement there flows straight through to ~7 more activated tenants, more than any downstream fix. The funnel's job is to make that arithmetic obvious every week. **[Hypothesis]** These step-conversion rates. Kill/validate: instrument all six steps from cohort 1; re-rank interventions by measured step loss × downstream flow-through, not by assumption.

**Activation-quality caveat.** A tenant can be "activated" (one accepted filing) and still be fragile — e.g. it filed ECR but has not yet run a clean quarter of TDS. So activation is reported alongside **Activation Depth**: the count of *distinct instruments* a tenant has filed at least once. A tenant filing ECR + ESI + PT + TDS is durably activated; one filing only ECR is a partial activation that will churn if the other obligations bite. This distinction prevents gaming activation by counting the easiest single filing.

#### 19.4.2 Activation measurement rules — definitions, tenant shapes and edge cases

"First accepted filing" is a strong definition, and strong definitions break on real tenant shapes.
These rules fix them, because an activation number that means different things for different tenants
cannot carry the phase gate it is asked to carry (§19.12.3).

**The clock's two ends.** `onboarded_at` is the **earlier** of the first paid invoice and the first
migration-field capture, so a tenant that spends six weeks migrating before it pays cannot hide that
time outside TTFF. `activated_at` is the timestamp of the `filing.accepted` transition of the first
instance, on the authority's clock where one exists. Both are stored on the tenant row; neither is
recomputed from a later definition without a restatement (§19.11.6).

**Activation does not require a judgeable due date.** OTAF needs one — §06.11 forbids an on-time
metric against an unconfirmed date — but activation asks only "did the product get an artefact
accepted for this tenant". A tenant whose only obligation is a state PT return with an uncaptured
due day (EC-16) can therefore activate while contributing nothing to OTAF. Keeping the two
definitions apart is what stops a coverage gap from looking like an onboarding failure.

| # | Tenant shape | Evidence | Activation rule | What it must not do |
| --- | --- | --- | --- | --- |
| AS-1 | 17 people, below the EPF threshold of 20 but above the ESI threshold of 10 | EV-057 | Activates on its first accepted ESI contribution or PT return. It has **no** ECR obligation, so an ECR-shaped activation definition would leave it permanently unactivated | Never count a missing obligation as a missing filing |
| AS-2 | Under both thresholds, PT and LWF only | EV-057; §06.4, §06.8 | Activates on its first accepted PT or LWF filing. Where both its state's due day and periodicity are uncaptured, it activates but never enters OTAF — reported as **activated, unjudged** | Never report it as inactive |
| AS-3 | Crosses 20 mid-year and opens a PF code | EV-057; §05.11 | Activation is not re-run: the tenant was already activated. Its **Activation Depth** increases by one when the first ECR is accepted, and a new **Registration Activation** row opens | Never reset a tenant's activation on a band crossing |
| AS-4 | TENANT_SELF_FILES for every line | §05.21 | Activates on the first artefact the tenant got accepted in its own Mode A session, evidenced by the acknowledgement it returns to the product. If no acknowledgement is returned, it is **unconfirmed-activated** and reported as its own count | Never assume acceptance from artefact generation |
| AS-5 | Multi-entity group: two legal entities, three establishments | §14.2 | The tenant activates once, at the group's first accepted filing; **Registration Activation** (registrations with at least one accepted filing ÷ registrations) is the metric that exposes a group half-onboarded | Never call a group activated when two of its three ESI codes have never filed |
| AS-6 | First wage month is a NIL month | EV-042 | A NIL month produces no artefact, so it cannot activate the tenant. The TTFF clock keeps running and the tenant is reported as **onboarded, awaiting a fileable month** | Never count a NIL declaration as an activation |
| AS-7 | Free tier, generating artefacts, not paying | §05 | Onboarded and activatable. Activation is measured on the same definition; the **conversion** to a paid tier is a separate commercial metric (§19.7) | Never merge the two funnels into one rate |
| AS-8 | Dormant tenant returns after skipping months | EV-038 | It does not re-activate. Its Ledger Continuity is already false and its Chronology Debt is the number of skipped establishment-months; re-entry is measured by the **debt clearing**, not by a new activation | Never let a re-activation event flatter the activation rate |
| AS-9 | Activated, then its only instrument becomes a coverage gap — an ESI-only tenant after the post-lapse regime blocks | §06.9, §06.13 | Stays activated; its instances move to the coverage-gap register; the tenant appears in **activated, unjudged** for those periods | Never de-activate a tenant because of our own coverage gap |

**Time-to-First-Filing is a censored measurement.** Tenants that have not yet activated have no TTFF
value, and taking the median of only those that did activate reports the fast ones and ignores the
slow ones — the same optimism the section warns about everywhere else. So:

- TTFF is reported as a median **over the cohort, with non-activators counted as censored at their
  current age**, alongside the activation rate at the same tenure. The pair is the measurement; either
  alone is misleading.
- A cohort's TTFF is quoted only at a stated tenure ("median TTFF at 60 days of cohort age"), because
  a cohort read at 20 days cannot report a 30-day median at all.
- The **Cutover-Timing Mix** splits both: an April cohort and an October cohort have different opening
  balance loads (§18), and blending them hides the mid-year migration risk this section is watching.

**Migration Completeness — the head list and the blocking subset.** The metric is the share of
required opening-balance heads captured, counted **unweighted**, over the heads that apply to the
tenant (a tenant with no PF code has no UAN-continuity head, and its denominator shrinks accordingly).
Within that list a **blocking subset** must be at 100% before the first filing is generated, because
each of these silently corrupts a statutory artefact rather than failing loudly:

| Head | Applies when | Blocking | Why |
| --- | --- | --- | --- |
| YTD earnings by component | Always, on mid-year cutover | Yes for a TDS period | The statement's annual figures are built on it |
| TDS already deducted and deposited | Mid-year cutover with a TAN | Yes | Under-deduction lands on the employer as a demand plus interest |
| PF UAN continuity per member | PF code present | Yes | The ECR's first field is the UAN (EV-035); a wrong or missing UAN is a rejection, not a warning |
| ESI IP number continuity | ESI code present | Yes | Same shape as UAN |
| Date of joining and, where applicable, date of exit | Always | Yes | Contributions are permitted only between a valid date of joining and date of leaving (EV-040); a wrong date of exit can need a joint declaration to fix and block a month (EV-041) |
| Leave balances | Leave module in use | No | Wrong balances are visible and correctable without a statutory artefact error |
| Gratuity accrual | Always | No | An accrual, not a filed figure |

- **AC-25** Activation is computed from `filing.accepted`, never from artefact generation, never from a
  payroll run, and never from a login. A definition change is a metric-register version bump and
  restates history under §19.11.6.
- **AC-26** The activation denominator is the onboarded cohort, and every tenant in it resolves to one
  of the shapes above or raises an exception for review — a tenant the definition cannot classify is
  the thing that quietly breaks a phase gate.
- **AC-27** No first filing is generated while any blocking migration head is incomplete for an
  affected employee. The block is a validation failure with the employee named, not a warning, and the
  count of blocked first filings is published beside the activation funnel.

**A worked negative — 100% activated and 0 on the north star.** Ten tenants onboard in a state whose
PT due day is uncaptured; none has 20 employees, so none has a PF code, and none is in an ESI state
where its obligation is judgeable yet. All ten file PT returns that are accepted. The activation rate
reads **100%**, Activation Depth reads 1.0, and OTAF reads **0** — because not one of those instances
has a due date the product is allowed to judge (SS-4). Nothing is broken and nothing is being gamed;
the funnel is working and the coverage gap is the constraint. The board reads the pair — activation
100%, coverage-gap instance share 100% for that cohort — and the action is the parameter capture
(§20 V-09), not an onboarding fix. Reporting activation alone would have sent the team at the wrong
problem.

---

### 19.5 Retention metrics

Retention is the primary lagging outcome metric and the one that ultimately validates the whole thesis: if filings-as-delivery creates switching cost, retention should exceed the SMB-SaaS norm.

| Metric | Definition | Notes |
| --- | --- | --- |
| **Gross Revenue Retention (GRR)** | recurring revenue retained ex-expansion ÷ starting recurring revenue | The truest churn measure; SMB payroll should retain well due to switching cost |
| **Net Revenue Retention (NRR)** | (retained + expansion) ÷ starting | The single most important SaaS health metric; see §19.6 |
| **Logo Retention** | tenants retained ÷ starting tenants | Watch by band — 20–49 (funnel) will churn differently from 50–199 (core) |
| **Filing-Cohort Retention** | of tenants who hit ≥1 OTAF in month 0, % still filing in month N | Ties retention directly to the north star |
| **Band-Crossing Rate** | % of 20–49 tenants crossing into 50+ within 12 months | The core §05 land-and-expand assumption; its own kill criterion below |
| **Involuntary Churn** | churn from failed payment vs deliberate cancellation | Separated because remedies differ |
| **Filing-Streak Health** | share of active tenants with an unbroken monthly OTAF streak ≥ N months | A broken streak is the earliest churn precursor for a payroll product |

**Instrumented churn triggers.** §20's risk register and the market research both name **implementation friction as the most-cited churn trigger, concentrated at mid-year cutover** (§20.8 R-28; §18.9) — **[Hypothesis]**, as both sections mark it. The instrumentation must therefore tag every churn with a reason code drawn from an evidence-based taxonomy: `migration-friction | filing-failure/penalty | price | grew-into-different-product | acquired/shut-down | competitor-switch | free-tier-pull (Zoho/Kredily)`. Churn without a reason code is a data-quality defect.

#### 19.5.1 Filing-cohort retention — a worked cohort table

Because retention should be *caused* by filing delivery, the primary retention view is a filing cohort, not a signup cohort. Illustrative Phase-1 shape (**[Hypothesis]**), tenants who logged ≥1 OTAF in month 0:

| Cohort month 0 | M0 | M3 | M6 | M9 | M12 | Read |
| --- | --- | --- | --- | --- | --- | --- |
| 100% filing at M0 | 100% | 94% | 90% | 88% | 86% | Curve should flatten — filing = switching cost |
| Of which 20–49 band | 100% | 90% | 84% | 80% | 76% | Funnel band, thinner switching cost |
| Of which 50–199 band | 100% | 97% | 94% | 93% | 92% | Core band, revenue-carrying (§05) |

The thesis prediction is a **flattening curve** (retention loss decelerates because each successful filing deepens switching cost), with the **50–199 band retaining materially better than 20–49**. If instead the curve is linear or the two bands retain identically, the "filing creates switching cost" thesis is weakened. **[Hypothesis]** Filing-cohort retention exceeds the SMB-SaaS norm — for which this PRD holds no sourced figure; it is the named parameter `smb_logo_retention_benchmark`, routed to §20. Kill/validate: at month 12, if 50–199 logo retention < 85%, switching cost is weaker than assumed and the pricing/lock-in model (§18) must be revisited — the filing may be a delivery unit without being a retention moat.

#### 19.5.2 Churn reason-codes — a worked breakdown

Churn without a reason code is a data-quality defect (above), because the *remedy* differs entirely by cause. Illustrative Phase-1 breakdown of 20 churned logos (**[Hypothesis]**), showing how the taxonomy routes action:

| Reason code | Share | What it means | Owner + remedy |
| --- | --- | --- | --- |
| `migration-friction` | 35% | Cutover pain, mostly mid-year (§18) | Onboarding — improve importers, nudge Apr cutover (§19.4) |
| `free-tier-pull (Zoho/Kredily)` | 20% | Lost to a free alternative | GTM/pricing — the §18 free-tier risk made visible; freemium gives computation away and charges for outputs (EV-029), so the exit interview records which output the tenant stopped needing from us |
| `filing-failure/penalty` | 15% | We caused a miss or penalty | **Product Sev-1** — the harm guardrail's churn tail (§19.1) |
| `price` | 10% | Explicit price objection | Pricing — feeds the §20 V-03 realised-ARPU question |
| `grew-into-different-product` | 10% | Outgrew the beachhead shape | Expected; not a defect if band-crossing captured value first |
| `acquired/shut-down` | 5% | Business event, not our failure | Involuntary — exclude from remediable churn |
| `competitor-switch` | 5% | Lost to a paid competitor | Competitive — feeds §04 positioning |

The single most important cell is **`filing-failure/penalty` (15%)**: it is the churn tail of the harm guardrail, and it is the only reason code that is a product Sev-1 rather than a GTM signal. If it grows, the north-star thesis is failing at its own job. **[Hypothesis]** migration-friction is the top churn reason (consistent with §20). Kill/validate: reason-code every churn from cohort 1; if `filing-failure/penalty` — not migration — leads, the product-quality bar (§19.3) is the priority over onboarding.

**[Hypothesis]** The §05 land-and-expand model requires ≥25% of 20–49 tenants to cross into 50+ within 12 months. Kill criterion (restated from §05): if cohort analysis at month 18 shows <25% crossing, stop acquiring the 20–49 half and raise the commercial floor to 50. This is the metric that decides whether the beachhead's lower half is a funnel or a leak.

#### 19.5.3 Retention measurement rules — cohorts, bands, streaks and censoring

The retention tables above are only interpretable under fixed rules for who is in a cohort, which
band they belong to, and what breaks a streak. Each rule below exists because its alternative
produces a number that moves for a reason unrelated to retention.

**Cohort assignment.** Two cohort types run, and they are never mixed in one chart:

| Cohort type | Entry event | Answers | Trap it avoids |
| --- | --- | --- | --- |
| Signup cohort | `onboarded_at` | Does onboarding hold tenants? | Includes tenants that never filed, so it measures onboarding, not delivery |
| Filing cohort | First `filing.accepted` | Does *delivery* create switching cost? | Excludes never-activated tenants, so it cannot be read as company retention |

**Band is frozen at cohort entry.** A tenant landed at 30 employees that grows to 60 stays in the
20–49 cohort for retention reporting, with its crossing recorded separately as band-crossing. The
alternative — assigning band by current headcount — moves exactly the healthiest tenants out of the
20–49 cohort and into the 50–199 cohort, which makes the lower band look worse and the upper band
better for no reason connected to retention. The bias is not small at this scale: on §19.5.1's
illustrative shape, with a 25% band-crossing assumption, roughly a quarter of the 20–49 cohort's
survivors would migrate out of it by month 12, and the survivors are by construction the ones that
grew. Frozen-band assignment is therefore the rule, and `band_history` (§05.11) supplies the crossing
events for the separate metric.

**What breaks a filing streak.** Filing-Streak Health is the earliest churn precursor for a payroll
product, so its break condition is defined precisely and narrowly:

| Situation | Streak | Why |
| --- | --- | --- |
| A judgeable in-coverage instance goes unfiled past its due date | **Breaks** | This is the signal — the tenant stopped delivering |
| A NIL month with no active members | Holds | EV-042: a NIL month legitimately produces no file |
| Every line for the month is TENANT_SELF_FILES and the tenant filed in its own session | Holds | The tenant is still operating; Filing Coverage, not the streak, carries the mode question |
| The month's only instance sits in the coverage-gap register | Holds | Our gap must never read as the tenant's lapse |
| The month's instance is BLOCKED for a tenant-side reason and misses | **Breaks** | The obligation was live and the deadline ran (EC-08, EC-09) |
| The tenant is mid-migration and its first live wage month has not started | Not yet counted | SS-2 — the streak starts at the first live wage month |

**Churn, contraction and the multi-entity case.** A group that removes one of its two legal entities
has **contracted**, not churned, and the NRR decomposition (§19.6.1) takes it as contraction; logo
churn counts only the tenant's last registration leaving. The inverse error matters more: a group
whose entities leave one per quarter registers as "no churn" for three quarters and then a single
logo churn, which is why **Registration Retention** (registrations retained ÷ starting registrations)
is reported beside logo retention for multi-entity tenants. Registrations are also the unit the
dominant COGS line scales on (EV-088), so losing registrations while keeping the logo is a margin
event as well as a retention one.

**Censoring and calendar exposure.** Retention at month N can only be computed for tenants that have
existed for N months; a cohort table that fills the M12 column with tenants aged 7 months is wrong in
the optimistic direction.

- Every cohort cell states the number of tenants **at risk** for that cell, and a cell whose at-risk
  count is below `min_instances_for_rate[cohort]` (§19.3.8) renders as a count.
- Cohorts are compared at equal tenure, never at equal calendar date. An April cohort and an October
  cohort at the same wall-clock month have different tenures *and* different statutory exposure — the
  April cohort has crossed a full Tax Year and its Q4 and annual-certificate obligations; the October
  cohort has not. Blending them hides the migration-seasonality risk the retention read exists to
  test (§18).
- **Involuntary churn** (failed payment) is excluded from the remediable-churn rate and reported as
  its own series, because its remedy is a billing retry, not a product change. A tenant that fails
  payment and recovers within the dunning window is not a churn event at all.

**The single reading that decides the thesis.** §19.5.1's prediction is a *flattening* curve with the
50–199 band retaining materially better than 20–49. Under the rules above that claim is falsifiable:
if band is frozen, cohorts are compared at equal tenure, streaks break only on real lapses, and the
curves still come out linear and identical across bands, then the filing is a delivery unit and not a
moat — the kill condition §19.15 already carries. The rules are what make that conclusion trustworthy
rather than an artefact of cohort bookkeeping.

- **AC-28** Every retention figure is published with its cohort type, its cohort entry month, the
  tenure at which it is read, and the at-risk count. A retention number without those four is not
  reportable.
- **AC-29** Churn reason-coding is mandatory at the `subscription.churned` event and the event is
  rejected without a code from the §19.5 taxonomy; the share of churns whose code is `unknown` is
  published as a data-quality metric with a target of 0.

---

### 19.6 Expansion metrics

Expansion is where the beachhead economics (§05) either work or don't, and it has three distinct engines, each metered separately because §10 (recruiting cost) and §11 (benefits attach revenue) are explicit that neither may be blended into the software line.

| Expansion engine | Metric | Why metered separately |
| --- | --- | --- |
| **Organic seat growth** | net PEPM seats added from tenant headcount growth (no upsell) | This is the "size gate" thesis (§18.2 P1), billed on actual headcount with no seat floor (§18.2 P6) — a tenant hiring pays more without a sales touch |
| **Band-crossing upsell** | ACV lift when a tenant crosses 20→50→200 | Ties to §05 phasing; the statutory step-function (§06) is the natural upsell trigger |
| **Module attach** | attach rate + ACV of Recruiting (per requisition/hire), Benefits/FBP, CA-console seats | §10: recruiting priced per requisition/hire because cost doesn't track headcount; attach revenue modelled as a separate line from software PEPM |
| **NRR decomposition** | NRR split into (organic growth + upsell + attach − contraction − churn) | So we know *which* engine drives NRR, not just that it moved |

#### 19.6.1 NRR decomposition — a worked example

NRR that "moved" without knowing *why* is un-actionable. Take a Phase-1 starting cohort at ₹100 of recurring revenue (indexed) and decompose the year (**[Hypothesis]** shape):

| Component | Δ (indexed) | Source engine | Instrumented by |
| --- | --- | --- | --- |
| Starting recurring revenue | 100.0 | — | `subscription.*` snapshot |
| + Organic seat growth (tenants hiring) | +6.0 | Automatic size-gate (§18.2) | `seat.changed` |
| + Band-crossing upsell (20→50, 50→200) | +5.0 | Statutory step-function (§06) | `subscription.upgraded` |
| + Module attach (recruiting, FBP, CA console) | +3.0 | Metered SKUs only (never bundled AI) | `module.attached` |
| − Contraction (tenants shrinking) | −2.0 | Layoffs / seat reduction | `seat.changed` (negative) |
| − Gross churn | −8.0 | Reason-coded (§19.5) | `subscription.churned` |
| **Ending recurring revenue** | **104.0** | — | — |
| **NRR** | **104%** | — | — |

This 104% NRR is *only* interpretable because it is decomposed: it says organic seat growth (+6) is the largest expansion engine, band-crossing (+5) is working, attach (+3) is nascent, and churn (−8) is the biggest single drag. A board deck that reports "NRR 104%" and stops has thrown away every actionable signal. The rule: **NRR is never reported without its decomposition.** **[Hypothesis]** Organic seat growth is the dominant NRR engine. Kill/validate: if after 4 quarters organic growth contributes < band-crossing + attach combined, the size-gate thesis (§18.2) is weaker than assumed and expansion must be re-planned around active upsell.

**Benefits/FBP attach — track the data-model adoption, not the money moved.** §11 is explicit that benefits attach is *distribution rent, not software*, and that GMV/money-moved is a banned vanity metric (§19.13). So the attach metric here is **FBP-configuration adoption** — the share of tenants that have configured FBP declarations, wallet rules and proof-of-spend — because that is the option value on the attach business (§11), reported as a *separate, never-blended* line. One dated tailwind to instrument around: effective **1 April 2026** the tax-free meal perquisite rose ₹50→₹200 per meal and the gift/voucher nil-value threshold ₹5,000→₹15,000 during the tax year — a ~3.8× wallet expansion (**[Hypothesis]**, EV-019 — the figures concur across two dated secondary sources and a counsel spot-check, but the rule text was not read; §11). The meal figure holds **only under its conditions**, which the engine carries as constraints (§11 BEN-62): meals provided during working hours at office or factory premises, or non-transferable vouchers usable only at eating outlets. Without them the perquisite is taxable, payslips under-deduct, and the demand plus interest lands on the employer (EV-K30). The rule citation under the Income-tax Rules 2026 is unconfirmed and routed to §20 V-18 (§06.13). So FBP-adoption uplift after April 2026 counts as a real, dated signal only for configurations that meet the conditions — a meal component configured as a cash allowance is not adoption of the exemption. **[Hypothesis]** FBP-config adoption predicts later attach monetisation. Kill/validate: if configured tenants monetise attach no better than unconfigured ones once monetisation ships, the data model is option value only, and no attach revenue forecast may lean on config adoption.

**AI-attach caution (from §12).** The AI assistant is bundled free (the market price of HR AI is zero — seven vendors, §13.1; greytHR's NAVOS "included in every plan", EV-090). Expansion metrics must **not** count bundled-AI usage as expansion. Only *metered* AI SKUs — recruiting per requisition, bulk document generation, HR-analyst copilot per admin seat — are expansion revenue, and each carries the §13 caveat that willingness-to-pay is unvalidated (§20 V-07). **[Hypothesis]** Metered AI SKUs contribute meaningfully to NRR. Kill: if §20 conjoint shows zero willingness everywhere, these SKUs drop out and NRR must come entirely from seats + band-crossing + benefits attach.

#### 19.6.2 Headcount denominators — three counts that are never the same number

Almost every per-employee metric in this section divides by "employees", and there are at least four
different employee counts in a single wage month. Mixing them is the most common silent error in a
payroll product's analytics, and it moves both the revenue metrics and the COGS metrics in the same
direction, so it is invisible in a ratio.

| Count | Definition | Owned by | Used by |
| --- | --- | --- | --- |
| **Billed headcount** | The heads the tenant is invoiced for in the period. We bill actual headcount from employee one — six of six priced competitors impose a 50-employee minimum billing block, Keka's historically 100 (EV-026) — so for us this count is the real one, not a floor (§18.2 P6) | §18 | ARPU, PEPM price realisation, CAC-payback, NRR |
| **Active employees** | Employees with an active assignment at a stated instant, or averaged across the month | §14 | AI COGS PEPM, Cost per Account, deflection-per-employee |
| **ECR members** | Rows in the ECR file for the wage month — one per UAN with a contribution or an NCP entry (EV-035) | §08 | Supervised-filing volume, ECR validator metrics |
| **ESI insured persons** | Employees covered for the month under §06's rule | §08 | ESI filing metrics |

**Worked month — one 60-employee tenant, September.** One employee leaves on the 5th, two join on the
20th, and one is on unpaid absence for 11 days:

| Count | Value | Arithmetic |
| --- | --- | --- |
| Active employees, month-end | **61** | 60 − 1 leaver + 2 joiners |
| Active employees, average across the month | **≈ 59.9** | 59 present all 30 days, plus the leaver's 5 days and each joiner's 11 days, over 30 days: 1,797 ÷ 30 |
| Billed headcount | **per §18's rule** — the metric register stores which instant or average §18 bills on, and the analytics layer reads that field rather than choosing | — |
| ECR members | **62** | Everyone with a contribution row, including the leaver for their 5 days and both joiners; the unpaid absence appears as NCP days on an existing row, not as a removal (EV-035 field 10) |

Between the lowest and highest of these lies about **3.5%** on a 60-employee tenant — enough to move
an AI COGS PEPM figure across a review threshold, and enough to make a PEPM price comparison against
EV-027's published anchors meaningless if the two sides count differently.

Three rules follow:

1. **Every per-employee metric names its basis in the metric register.** `denominator_basis` ∈
   {billed, active_month_end, active_average, ecr_members, esi_ips} is a mandatory field, and a metric
   without it is not shippable (§19.14.1).
2. **A ratio may not mix bases.** Inference Share of Revenue divides inference spend (attributed per
   active employee) by tenant revenue (billed heads); it is therefore computed as two absolute rupee
   figures divided, never as two PEPM figures divided, so the bases cancel correctly.
3. **Competitive PEPM comparisons always state the headcount they were computed at.** EV-027's table
   is computed at 50 employees and again at 20 precisely because the competitors' 50-employee blocks
   make PEPM headcount-dependent: the same Qandle plan reads ₹49.00 at 50 and ₹122.50 at 20, and
   greytHR ₹49.90 at 50 against ₹124.75 at 20 — a 2.5× swing with no price change. Any internal metric
   benchmarked against those numbers carries the headcount, the capture date and the note of whether
   the competitor's product was executed or only its published page read (Part A-9).

**Band assignment for expansion metrics** reads `band_history` (§05.11) on billed headcount, so that
band-crossing, pricing and retention all move on the same count. A band crossing recognised on active
employees but billed a month later would put the ACV lift in a different period from the crossing
event and make the NRR decomposition's band-crossing line un-reconcilable with invoices.

- **AC-30** Every metric row in §19.14.3 whose denominator is employees carries `denominator_basis`,
  and the value is asserted in the metric's test fixture. Two metrics compared in one chart must share
  a basis or the chart states both.
- **AC-31** The NRR decomposition reconciles to invoiced revenue for the period within
  `nrr_reconciliation_tolerance_pct` — a named parameter owned by Finance, routed to §20 — and a
  decomposition that does not reconcile is not published. This is what stops "+organic growth" from
  absorbing a billing error.

---

### 19.7 Funnel and acquisition metrics

Two acquisition motions run in parallel (§18): **self-serve** (published price card, importer-led — the only way to be evaluable by a 30-person company that won't sit through a demo, §18) and **CA-referred** (the unvalidated-but-central GTM bet, §20 V-05). They are instrumented as separate funnels because their CAC, conversion and payback differ.

| Stage | Self-serve funnel | CA-referred funnel |
| --- | --- | --- |
| Top | Website visitor → price-card view → signup | CA console signup → client added |
| Mid | Importer run → activation (first filing) | Client provisioned → first client filing FILED in a CA-attended session (Mode D, §22 FR-OPS-001; P1) |
| Bottom | Free/land tier → paid conversion | Client billed (CA or client pays) |
| Efficiency | CAC, CAC-payback (months), LTV:CAC | Referred-client CAC, CA-productivity (clients/CA) |

**Cross-cutting acquisition metrics:**

- **CAC and CAC-payback (months)** — payback is the metric that matters most at SMB scale where ACV is low (₹24k–60k for 20–49; §05). A long payback on a funnel-tier customer is fatal.
- **LTV:CAC** — computed per band; the 20–49 band is expected to be marginal or negative on its own and justified only by band-crossing (§19.5).
- **Importer-attributed signups** — Tally/Zoho/Kredily/Frappe importers as acquisition infrastructure; measure signup share and downstream activation by source importer.
- **Price-card engagement** — because publishing the price card is a strategic bet (§18), instrument whether self-serve prospects actually convert off it without sales touch.

#### 19.7.1 CAC-payback worked example — why the 20–49 band is fragile

CAC-payback, not LTV:CAC, is the metric that governs survival at low ACV. Worked case using PRD-anchored figures (all list-price-derived and therefore **[Hypothesis]** until §20 V-03 reports realised ARPU):

- Price has two anchors — a **value floor near ₹50 PEPM** (Qandle, greytHR at 50 employees) and a **mid-market clearing band of ₹80–200 PEPM** (Zimyo, HROne, Keka) — with our ₹80–150 planning anchor inside the band (EV-027; §18). A 30-employee tenant billed on its actual 30 seats (six of six priced competitors impose a 50-employee minimum billing block, Keka's was 100 — EV-026; we do not, §18.2 P6) at ₹80–150 PEPM → ARPU ≈ ₹2,400–4,500/month → **₹28,800–54,000 ACV**. At the ₹50 floor it is ₹1,500/month.
- Gross margin is the named parameter `gm_blended` and is **unknown today**: inference is the smallest of four COGS lines, and the dominant one — supervised filing, per registration × state × filing type — is unsized (EV-088; §13, §22; routed to §20). So payback is stated **before COGS** (CAC ÷ monthly revenue); the true figure is that number ÷ `gm_blended`, and is always longer.
- CAC inputs below are illustrative scenario values, not estimates. If self-serve CAC is ₹15,000 (mostly importer + content, no sales touch): **payback ≥ 3.3–6.3 months** at ₹80–150, and **≥ 10 months** at the ₹50 floor.
- If the same tenant needs a sales touch (CAC ₹40,000): **payback ≥ 8.9–16.7 months** before COGS — at the low end of the band it breaches the 12-month line even at a 100% gross margin, which is fatal at this band because 20–49 logo churn is higher (§19.5) and band-crossing is unproven.

The arithmetic is the reason §18 insists on a **published price card and importer-led self-serve** for the lower band: it is the only CAC structure whose payback survives the low ACV. The metric that polices this is **self-serve share of 20–49 activations** — if that band is being won by sales touch, payback breaks. **[Hypothesis]** 20–49 can be acquired self-serve at CAC-payback ≤ 12 months. Kill/validate: if blended payback for the band exceeds 12 months over 2 quarters, either the price card is not converting (raise floor to 50, §05) or CAC attribution is missing a hidden sales cost.

**[Hypothesis]** The CA channel is a net-positive acquisition engine. Kill criterion (from §20 V-05): if CAs see the product as disintermediation, the channel inverts into an opponent — the leading signal will be CA-console signups that add clients but then *block* client self-serve conversion; instrument that conflict explicitly (CA-added clients whose self-serve conversion rate is *below* the non-CA baseline).

---

### 19.8 AI cost and efficiency metrics — cost-per-account

§13 is unambiguous: **build full token, cache and cost attribution per tenant, user, agent and model from v1, while the price is still zero.** These metrics are that mandate made concrete. They are cost-of-goods metrics, not revenue metrics — AI is COGS, never the revenue line (§13). And they measure **one COGS line of four**: inference is the smallest; WhatsApp messaging scales per message; **supervised filing** — the dominant line — scales per registration × state × filing type; compliance curation scales per state maintained (EV-088). Gross margin is decided on the supervised-filing line, which is why its instrument sits in this table too.

| Metric | Definition | Why | Source/target |
| --- | --- | --- | --- |
| **AI COGS PEPM** | inference spend ÷ active employees, per tenant | The inference line's unit number | ₹0.15–3.27 PEPM — placeholders, **[Hypothesis]** (EV-008, §13.6) |
| **Cost per Account (per tenant/month)** | full inference + cache spend attributed to a tenant | The "AI-cost-per-account" the brief names; must stay a small share of revenue | vs price between the ~₹50 PEPM value floor and the ₹80–200 clearing band (EV-027, §18) |
| **Inference Share of Revenue** | inference spend ÷ tenant revenue, per tenant | Early warning on one COGS line. **[Reversed]** An earlier draft reported a "93–99% gross margin on inference"; withdrawn — it was a margin on the smallest of four lines, not a gross margin (EV-K13, EV-088, §13) | Investigate any tenant above ~5% (§13.9; §20 V-14 pass line) |
| **Supervised Minutes per Filing Cycle** | staff minutes metered by §22 FR-OPS-010, per registration × filing type × cycle: active session minutes (Modes B and C, and any staff minutes on a Mode A or D instance) plus reason-coded preparation and exception minutes logged against the instance; OTP and instruction waits are metered separately and added only where they block the operator (§22.7 `f_wait`); a Mode A instance with no staff involvement meters zero | The dominant COGS line, unsized (EV-088); revenue scales per employee, this cost per registration | vs `max_supervised_minutes_per_filing_cycle` — derived by the §22.7 formula, unsized, measured under §20 V-26 |
| **Cost per Cost Class / per Model** | inference spend split by cost class A0–A6 (§13.3) and by model backend | Model choice *is* the inference-cost decision (§13.5); routing needs this to re-point task classes | Router-driven |
| **Deflection Rate** | support/HR queries resolved by assistant without human ÷ total | The assistant's value is deflection, not revenue | ↑ maximise |
| **Abstention Rate** | assistant answers that abstained and routed the gap (§12's fail-closed abstention) ÷ eligible queries, per use case, reported beside deflection | A high rate is a coverage gap to fill — a missing policy or an unpublished rule — never a guardrail to loosen (§12) | Trend per use case; no target |
| **Cache Effectiveness** | cache-read savings vs cache cost (write premium and storage-hours), per provider × tenant-size band | §13.11 [Killed] "cache everything": a held, storage-hour-priced cache on Gemini costs over 100× the no-cache input price for a 100-employee tenant; read-priced prefix caching is the opposite economics | Held caches off on the beachhead; read-priced prefix caching on where supported (§13.11) |
| **Rate-Limit / Budget-Cap Incidents** | count of per-tenant/per-user budget caps hit | One heavy user can exceed a seat's entire ARPU (§13); caps are P0 | Track + alert |
| **Cost per Recruiting Action** | inference + external cost per requisition/hire, metered separately | Recruiting cost doesn't track headcount — 15× spread between fast- and slow-hiring tenants (§10) | Per-action, not PEPM |
| **Model-Mix Ratio** | share of inference spend by model tier (cheap/mid/frontier) | The 52.7× model spread (EV-007, EV-089) means mix *is* inference cost; drift toward frontier is a cost leak | Track weekly |

#### 19.8.1 Worked AI COGS example — one tenant, and why the ratio matters more than the absolute

Take a 100-employee tenant. The PRD's engineering estimate is **23,675 input / 2,045 output tokens per employee-month** (§13, explicitly unvalidated). At that volume:
- Monthly tokens ≈ 100 × (23,675 in + 2,045 out) ≈ **2.37M input + 0.20M output**.
- On r2/03's disciplined case (21,272 in / 1,894 out per employee-month, with cache reads — §13.6), **Gemini 2.5 Flash-Lite** lands at the band floor (~₹0.15 PEPM → ~₹15/tenant/month) and **Sonnet 5** at the band top (~₹3.27 PEPM → ~₹327/tenant/month); the frontier model on the same volumes is ₹8.19 PEPM (EV-008, §13.6 — all placeholders).
- The **52.7× spread [Verified]** between cheapest and dearest credible model is a ratio of list prices on the agentic-loop volumes (EV-007, EV-089); it survives FX, the absolutes do not.

Against the two price anchors — ₹50 PEPM floor to ₹200 PEPM band top (EV-027), ₹5,000–20,000 a month for this tenant — even the ₹327 case is **~1.6–6.5% of revenue**. **[Reversed]** Earlier drafts read that ratio as a 93–99% inference gross margin (EV-K13). It is not a gross margin: inference is the smallest of four COGS lines, and gross margin is decided on the unsized supervised-filing line (EV-088; §13; Supervised Minutes per Filing Cycle above). **The inference absolute also rests entirely on the unvalidated token estimate.** If real tokens-per-query are **5×** the estimate (the §20 V-04 kill case), the ₹327 case becomes ~₹1,635/tenant — **~33% of the revenue of a 100-employee tenant at the ₹50 floor**, and free-bundling breaks at the low end. This is exactly why the metric that is *reported* is **measured AI COGS PEPM from v1 instrumentation**, and the estimate is only a placeholder.

The defensive posture the metric enforces: because the **ratio (52.7×) is [Verified]** but the **absolute is [Hypothesis]**, the router's job (§13.5) is to keep the **Model-Mix Ratio** weighted toward the cheap tier for the deterministic-adjacent tasks, spending the 52.7× only where a frontier model measurably lifts deflection. A rising Model-Mix Ratio toward frontier is an inference-cost leak visible *before* it shows in the monthly COGS number.

#### 19.8.2 The cache-inversion guard — a worked negative

§13's [Killed] "cache everything" is not a soft preference; it is a rupee trap that the metric must actively prevent. Worked case (§13.11 figures): a **50k-token per-tenant policy cache held continuously on Gemini Flash-Lite** costs roughly **₹34.47 per employee** at a 100-employee tenant on hourly cache-storage pricing, against **₹0.27** for simply paying full input price — **over 100× worse**. So:
- **Cache Effectiveness** is computed per provider × tenant-size band, and **held, storage-hour-priced caching is off by default** on the beachhead; it turns on only where the metric proves net-positive savings for that provider and band. Read-priced prefix caching — no storage-hour charge — is the opposite economics and is on by default where the provider supports it, provided reads repay the write premium (§13.11 design rule).
- For sub-1,000-employee tenants on hourly-storage providers, the expected value of a held cache is *negative*, so the metric's job is to keep it **off** and flag any config that turns it on. A "cache hit rate went up" celebration is a §19.13 vanity trap if cache *cost* went up more. **[Verified]** cache-inversion economics (Source: PRD §13; Gemini hourly cache-storage pricing).

#### 19.8.3 FX sensitivity — every AI cost metric carries three columns

USD-priced inference means every AI COGS number is an FX bet. §13 requires FX sensitivity at **₹90/95/100** and treating the **Gemini 3.x Flash doubling (scheduled 1 Jan 2027) as the base case, not the downside** (Gemini 2.5 Flash-Lite carries no announced increase). So the AI COGS board reports every headline as a three-column band:

| Scenario | USD/INR | Gemini 3.x Flash pricing | Effect on AI COGS PEPM |
| --- | --- | --- | --- |
| Favourable | ₹90 | pre-increase | lower bound |
| **Base case** | **₹94.43 [Verified] (EV-089)** | **2× (post 1 Jan 2027)** | **the number we plan against** |
| Stress | ₹100 | 2× | upper bound; triggers router re-point (§20 R-13) |

**[Verified]** ₹94.43/USD (Sep 2026) and the scheduled Gemini 3.x Flash doubling (EV-089); the ₹90/95/100 sensitivity mandate is §13.2 and §13.12. Reporting a single-point AI COGS figure without the band is a metric-hygiene violation, because it hides a scheduled, known cost increase.

#### 19.8.4 Deflection rate — the assistant's value is measured in avoided humans, not tokens

The assistant is bundled free (§12); its value is therefore **deflection** — HR/support queries resolved without a human — not revenue and not usage. This is the metric that turns AI COGS into a defensible cost: every deflected query is a support-headcount cost avoided. Worked case, a 100-employee tenant:

- Employee self-service queries ≈ 2.0 helpdesk + 0.3 onboarding per employee-month → **~230 A1 queries/month** (leave balance, payslip explain, PT/PF query, policy lookup) — r2/03's engineering estimate, the most load-bearing unmeasured rate after token size (§13.3).
- At a **40% deflection rate** (Phase-1 target), ~92 queries resolved by the assistant, ~138 escalate to a human.
- At **60%** (Phase-2 target), ~138 deflected, ~92 escalate.
- The rupee value of a deflected query is the named parameter `loaded_cost_per_human_query` — unmeasured, routed to §20. The break-even is computable without it: at 40% deflection, the ₹327/month band-top inference cost for this tenant (§19.8.1) is repaid if a human-handled query costs more than ₹327 ÷ 92 ≈ **₹3.6**; at the ₹15 band floor, ≈ ₹0.16. *That* comparison, not the token count, is the justification for bundling AI as COGS — and it covers the inference line only, not the supervised-filing line (EV-088).

The trap the metric guards against (§19.13): **tokens processed can rise while deflection falls** — a chattier assistant that resolves less. So deflection is reported *against* AI COGS per account, never alone. **[Hypothesis]** The 2.3 queries/employee-month rate, the 40%→60% deflection targets and `loaded_cost_per_human_query`. Kill/validate: instrument `ai.deflected` from v1; if deflection cannot clear 40% of eligible queries, the assistant is a cost without an offsetting saving and its scope must narrow to the query classes where it does deflect.

#### 19.8.5 Per-class cost attribution — the seven cost classes

Model choice is the inference-cost decision (§13.5), but so is *class* choice: a cheap class invoked constantly can cost more than an expensive class invoked rarely. Per-class attribution (the `task_class` field, §19.11.2) is what lets the router re-point task classes. **[Reversed]** An earlier draft attributed cost to a "six-agent architecture" with invented shares; §13.3 prices seven cost classes, A0–A6, against the §12.4 task classes, and the only derivation of their shares is r2/03's (§13.6, **[Hypothesis]**, replaced by measured spend):

| Cost class (§13.3) | Correct tier (§13.3) | Volume driver | Share of input tokens in the only derivation (§13.6) | Deflection contribution |
| --- | --- | --- | --- | --- |
| A0 Triage / router classifier | Cheapest | Every inbound interactive turn | Inside the helpdesk line — no line of its own | None directly — routes |
| A1 Employee policy Q&A | Cheap | Headcount, event-driven | Helpdesk 50.7% (with A0) + onboarding 5.1% | Highest — the deflection workhorse |
| A2 Filing / compliance copilot | Mid | Admin actions | 12.7% | Admin-facing; explains, never calculates |
| A3 Bulk document generation | Cheap, batch | Document volume, review cycles | Letters 1.6% + performance review 14.8% | Medium; bulk runs metered above a quota (§13.8) |
| A4 Recruiting agent | Mid | Hiring velocity | 15.2% — metered separately | Metered per requisition/hire (§19.8.6) |
| A5 HR-analyst copilot | Mid–high | Admin seats | Outside the r2/03 budget — `a5_queries_per_admin_month`, unestimated | Metered per admin seat (§13.8) |
| A6 Statutory-change watcher | Mid | Per notification, org-wide | Not a per-tenant cost | Reliability, not deflection |

The read: the headcount-scaling cheap classes (A0/A1) carry the largest token share and most of the *deflection value*, while the mid–high admin classes are lower-frequency and, where metered, monetised. Token share is not cost share — A1 runs on the cheap tier — so the board shows both. If per-class attribution shows a mid or frontier class creeping up in COGS share without a matching deflection or metered-revenue lift, that is the router's signal to re-point it (§13.5) — visible per class, before it shows in blended COGS. **[Hypothesis]** these shares. Kill/validate: measure per-class spend from v1 (§13.9); if measured shares diverge from the §13.6 derivation, the router's cost ceilings are re-set against the measured shape.

#### 19.8.6 Cost per recruiting action — why it is metered, not PEPM

§10 is explicit: recruiting cost does not track headcount — a tenant hiring at 15%/month costs ~**15×** a tenant hiring at 3%/month on identical PEPM pricing (§13.7). Two vendors already price hiring per recruiter, not per employee: greytHR's Recruit add-on, priced per recruiter on its published pricing page, read and not executed (r2/03; the greytHR card's own dated captures are 4 and 5 September 2026 — §21; re-check the add-on line at source before any external use, Part A-9), and Keka's archived hiring card, PRO ₹1,500 and ADVANCED ₹2,500 per recruiter per month (EV-022). Worked contrast, two 100-employee tenants, on r2/03's assumptions:

| | Tenant A (steady-state hiring) | Tenant B (recruiting-heavy) |
| --- | --- | --- |
| Monthly hires | ~3 (3%/month; 40 CVs per hire, 3,000 tokens per CV) | ~15 (15%/month; 50 CVs per hire, 10,000 tokens per CV) |
| CV screens per month | ~120 (1.2 per employee) | ~750 (7.5 per employee) |
| Screening cost, per employee-month on Sonnet 5 | ₹1.13 | ₹17.00 — ~15× |
| If priced flat PEPM | subsidises B | B is subsidised by A — margin leak |
| **Correct metric** | **Cost per Recruiting Action** (per requisition/hire) | same — decoupled from headcount |

This is why **Cost per Recruiting Action** is tracked per requisition/hire and recruiting is a *metered* SKU, never folded into software PEPM (§10). The metric prevents a fast-hiring tenant from silently destroying the margin of a flat-priced plan. **[Verified]** the 15× hiring-rate cost spread, FX-invariant (r2/03, §13.7), and the per-recruiter pricing precedent (EV-022; greytHR per r2/03).

#### 19.8.7 The other two COGS lines — WhatsApp and compliance curation

§19.8 so far measures one of EV-088's four lines (inference) and §19.9.3 measures the dominant
one (supervised filing). The remaining two — **WhatsApp messaging**, per message since 1 July
2025, and **compliance curation**, per state maintained — are named in the stack and measured
nowhere else in this section. Without their counters the per-tenant four-line COGS view §13.21
requires cannot be assembled, and any "margin" would again be a margin on a subset (EV-K13).
§13.22 owns the WhatsApp economics and §22.9 the curation cost model and its parameters; this
subsection owns only the measurement — the counters, their denominators and the rules that stop
either line from being reported as a number it has not earned.

**The WhatsApp line is measured on window state, not on message count.** An outbound message
inside an open service or Free Entry Point window may cost nothing; the same message outside one
is charged (§13.22). A send-count metric therefore measures neither cost nor the lever that moves
it, and every measure below is built around the window.

| Measure | Numerator | Denominator | Source | Target |
| --- | --- | --- | --- | --- |
| Chargeable-Message Share | Outbound messages the ledger marked chargeable | Outbound messages sent | Message records · `wa.message.sent`; four-line cost ledger (§13.21) | ↓ — the design lever is the window, not the send count |
| Free-Window Delivery Share | Outbound messages delivered inside an open service or Free Entry Point window | Outbound messages sent | As above, reported per flow (§13.22's flow table) | ↑; a flow whose share falls has drifted out of its window design |
| WhatsApp Cost per Tenant-Month | Chargeable messages priced at their rate row, plus the BSP markup | Tenant-months | Cost ledger, WhatsApp line | Published as a low–high range, never a point figure (AC-48) |
| Category-Mismatch Rate | Messages whose assigned category differs from the intended one | Messages sent carrying a category | Message records | 0 — a mismatch re-prices the flow and suspends the template (§13.22) |
| Fallback-Channel Share | Messages a flow delivered on its fallback channel after a WhatsApp failure or suspension | Messages the flow attempted | Notice records | Trend; a rise is a delivery risk on statutory notices, not a cost saving |

**One dated fact this line must carry as a state, not a rate.** The WABA migrates to INR billing
by **31 December 2026 or delivery stops on 1 January 2027** (EV-088). That is binary and dated,
so it is measured as a readiness state — `wa_inr_billing_migrated` ∈ {not started, in progress,
done} — reported in the unit-economics review every week from the first WhatsApp message until it
reads done, and escalated as a delivery risk if it is still open at a lead the GTM owner sets
(unsized here, routed to §20 with `wa_cost_share_alert_pct`). A board that reports this line's
cost while the channel is days from ceasing delivery is measuring the wrong property of it.

**The curation line has no natural per-tenant denominator.** It scales with states maintained, not
with tenants or employees (EV-088), so it is measured per state and allocated. §22.9 owns the
sizing formula; measurement's job is to supply that formula's terms from the pipeline log instead
of from estimates, which is the only thing that can settle §22.9's linearity hypothesis.

| Measure | Numerator | Denominator | Source | Why it is measured here |
| --- | --- | --- | --- | --- |
| Change Requests per State (`E_s`) | Rule-change requests raised against a state's jurisdiction | States maintained, per year | Pipeline log (FR-RULE-003) | The formula's volume term, and the test of §22.9's "roughly linear in states" |
| Hours per Change Request (`h`), by class | Authored plus reviewed hours logged on closed requests | Closed requests, per change class | Pipeline log | A corrigendum and a new instrument are not the same work; one blended figure hides which |
| Review Multiplier (`r_review`) | Reviewer hours | Author hours | Pipeline log | Two-person review is mandatory (§22), so the multiplier is measured, never assumed |
| Curation Cost per State Maintained | That state's recurring curation cost for the period | One state | Cost ledger, curation line | The marginal state is what §05 sequences on |
| Curation Cost per Tenant | The state's cost allocated by `curation_allocation_key` | Tenants with a registration in that state | Cost ledger; Registration (§14.2) | The number that says when a new state's first tenants stop carrying it alone |
| State Coverage Concentration | Tenants in the most-tenanted state | Tenants with at least one state registration | Registration (§14.2) | A curation cost carried by one state and one tenant is a risk, not an average |

**The marginal-state read is a shape, not a forecast.** A state with one tenant carries its whole
`cost_per_state_per_year`; the same state at N tenants carries a fraction of it. This section sets
no value for that parameter — §22.9 owns it and it is unsized — so what publishes from month one
is **tenants per state**, and the crossover is read off measured data the moment the cost term is
sized. Publishing a curation cost per tenant before the cost term exists would be an invented
number wearing an allocation key.

**The figure that stays unpublished.** A blended gross margin. Three of the four lines carry a
NOT_SIZED or RANGE status (§13.21), and a margin computed on the one line that is sized is exactly
the withdrawn claim (EV-K13, EV-088). The per-tenant view renders four lines with their statuses
and no total until §13.21's gross-margin gate opens.

- **AC-47** Every outbound WhatsApp message produces exactly one message record carrying its flow,
  the window state at send, the intended and the assigned category, and the chargeable flag. A
  message with no record, or a record with no window state, is a metering defect counted in the
  **Unattributed-Message Share**, target 0.
- **AC-48** No WhatsApp rupee figure renders as a point value while its rate inputs are
  **[Hypothesis]** (§13.22; §20 V-12). The low–high range and the entry's RANGE status render
  together, and a point figure fails review for the same reason a bare percentage does (AC-19).
- **AC-49** `E_s`, `h` and `r_review` are read from the pipeline log, never estimated. A curation
  figure computed from an unmeasured term names that term in the figure, so that a reader can see
  which half of it is measurement.
- **AC-50** No per-tenant COGS view renders a total, a share-of-revenue on the stack, or a margin
  while any of its four lines carries a NOT_SIZED or RANGE status. It renders four lines and their
  statuses (§13.21).

---

### 19.9 Reliability and statutory-maintenance metrics

These are the SLA-shaped metrics that back the strategic bet in §18: **sell the compliance SLA as the thing no free alternative offers** — we are not aware, as of September 2026, of a free tier that carries a remedy (§18.3). The SLA is a contractual service commitment with a capped remedy — not a transfer of statutory liability, which is non-delegable and stays with the employer and deductor (EV-K24; §18.3; Part D-17 and D-20, §23). If we make that promise, these are the numbers that prove we keep it; §19.9.2 specifies the promise itself.

| Metric | Definition | Why | Target direction |
| --- | --- | --- | --- |
| **Payroll-Run Success Rate** (the "payroll-run reliability" §05.3 DG-3d reads) | process attempts (FR-PAY-301 M4 or M5) that reach PROCESSED with every fixed-point node converged within `fixed_point.max_iterations` (FR-PAY-211) and no engine fault, and whose result version is never later corrected for a root cause classed SA-CALC (FR-PAY-713) ÷ process attempts whose M4 guard passed. Attempts refused by the guard (evaluation context incomplete) and M7 returns for correction are input or approval events, counted under Pre-Filing Validation, not here. Source: `PayRun` (§14.4.4) and the FR-PAY-301 transition log | A failed run cascades into a filing miss | → 100%; DG-3d's 99.5% over two quarters is §05's gate for the 1,000–1,999 band |
| **Statutory-Change Lead Time** | days from a gazette/notification (or **corrigendum**) to the rule being live and effective-dated in the engine | §12: the watcher must catch *amendments, not just new instruments* — a corrigendum inverted the entire Nov-2026 analysis (§06) | ↓ minimise; SLA-bound |
| **Corrigendum-Catch Rate** | amendments/corrigenda caught by the watcher ÷ amendments that occurred (audited retrospectively) | The Nov-2026 miss was a *corrigendum*, not a new notification (§06); a watcher keyed only to new instruments scores 100% on new and 0% on the thing that actually broke | → 100% |
| **Device Integration Success Rate** | ADMS/WDMS terminals successfully pushing punches ÷ configured terminals | Deals are won/lost on device-fleet talk (§09); note the retracted 85–98% figure is **banned** (EV-K03, §20.4) — measure our own (§20 V-10) | Measure, don't assume |
| **Windowed Availability** | successful-request ratio at the load balancer, reported separately for the payroll critical window and the rest of the month (§17 NFR-AVAIL-801) | The availability SLO is windowed, not blended (Part E-13) | Proposal: 99.95% from the 25th to the 2nd, 99.5% otherwise — **[Hypothesis]**, owned by §17 |
| **Due-Date-Window Availability** | availability inside each declared statutory window — the 7th (TDS deposit, **[Hypothesis]** until read against r.218), the 15th (ECR, ESI), state PT dates once captured (§17 NFR-AVAIL-802, §06.11) | General uptime hides the hours that carry penalty risk | Window length and target per §17; not restated here |
| **CERT-In Readiness** | log-retention coverage (180 days, within Indian jurisdiction), NTP clock-sync health, six-hour incident-reporting path tested, point of contact named (EV-062) | Binds from day one, not at enterprise scale (§17) | Continuous compliance |

**Why two availability metrics.** A blended monthly figure hides where the downtime lands: an outage on a day with no statutory window is an inconvenience; the same outage at 23:30 on the 15th, when a tenant is filing ECR, is a penalty event. The windowed SLO follows the payroll cycle (Part E-13); **Due-Date-Window Availability** follows the statutory calendar, whose windows §17 declares. Both targets are §17's and are **[Hypothesis]** until §20 instrumentation replaces them. This is the reliability expression of the on-time-margin fragility point (§19.3.3): the metric follows the penalty clock, not the calendar month.

#### 19.9.1 Worked statutory-change lead time — the November 2026 episode

Statutory-Change Lead Time is abstract until run against the exact event that nearly broke the research (§06.9). Trace the EPF re-notification, in date order, as the watcher must have handled it:

| Step | Event | Watcher must | Lead-time clock |
| --- | --- | --- | --- |
| 1 | Code on Social Security commencement notified by **S.O. 5319(E)**, effective 21 Nov 2025 | Ingest the commencement; do not yet conclude which repeals commenced | starts at notification |
| 2 | **Corrigendum S.O. 5936(E)** of 19.12.2025 substitutes the S.O. 5319(E) entries: s.164(1), including the EPF Act 1952 repeal, commenced 21.11.2025 except for a pension-related slice already in force since 03.05.2023 under S.O. 2060(E), and s.164(2)(b) saves the EPF, EDLI, EPS schemes and all ESI subordinate law for one year, to on or about 21 Nov 2026 (indiacode still reproduces the uncorrected S.O. 5319(E)) | **Catch the corrigendum, not just the new instrument** — this is the step one research round missed; flag the ~21 Nov 2026 expiry as a dated risk | corrigendum-catch |
| 3 | Successor **EPF Scheme 2026**; 12% re-notified by **S.O. 3582(E)** of 01.07.2026, retrospective to 21.11.2025 | Encode 12% effective-dated to 21.11.2025 (retrospective) | days-to-live |
| 4 | ESI side: no successor instrument we are aware of as of September 2026 (EV-004; §06.9; §20 V-08) | Keep post-cliff ESI instances BLOCKED-pending-regime; alert before the date | open |
| 5 | EPF rule live and effective-dated in engine | On-time/RFT for EPF recompute under the correct rule version | clock stops |

The lesson the metric encodes: a watcher scoring **100% on new notifications** but **0% on corrigenda** would have read the uncorrected enumeration and reached the opposite conclusion on the EPF Act's survival and the one-year sunset — building the EPF engine against the wrong instrument: an AC-5 provenance failure even where a figure happens to coincide, and a correction-rate spike one cycle later wherever the two instruments diverge. So **Corrigendum-Catch Rate** is tracked as a first-class reliability metric alongside lead time, and the watcher is validated by replaying this exact episode (§19.12.3 Phase-1 gate). **[Verified]** S.O. 5319(E), corrigendum S.O. 5936(E), the S.O. 3582(E) retrospective re-notification and the indiacode uncorrected-footnote trap (EV-002, EV-003; Source: §06.2, §06.9; Code on Social Security s.164).

**[Verified]** The statutory watcher must catch corrigenda not just new notifications, device push (ADMS/WDMS) is the dominant integration path, and CERT-In binds from day one (Source: PRD §12, §09, §17; S.O. corrigendum episode, §06). **[Killed]** The 85–98% device-integration success figure — it was marketing from the vendor selling the fix; device-integration effort is unsized and must be measured from our own fleet, never assumed (EV-K03; §20.4 banned-numbers table; §20 V-10). **[Hypothesis]** Corrigendum-Catch Rate can reach 100% via the watcher. Kill/validate: run the watcher retrospectively against the known S.O. 5319(E) → S.O. 5936(E) corrigendum → S.O. 3582(E) episode (§06.9); if it would not have flagged the corrigendum, the watcher's source coverage is incomplete and must expand before any compliance-SLA is sold.

#### 19.9.2 The compliance SLA as a specification

§18.3 prices the compliance SLA and bounds its remedy; §05.9 fixes the miss taxonomy and the boundary rules SS-1 to SS-5; §05.21 issues the per-tenant coverage statement the SLA reads. This subsection is the one measurable statement those sections — and §01's PC-5 and §23's master-services-agreement row — point to: what is covered, what is excluded, what opens a claim, what proves it, and what it can pay. It is customer-facing legal text. Its wording has a named owner (the Legal lead), needs counsel clearance before any contract carries it (§05.8 PL-05; Part D-20; §23), and every commercial term in it is **[Hypothesis]** until §20 V-07 and V-16 report.

| Element | Specification | Measured or evidenced by |
| --- | --- | --- |
| **Covered obligations** | Only instances on lines the tenant's coverage statement holds IN_SLA, read at the version in force on each instance's due date (§05.21); only instances due at least `sla_onboarding_lead_days` after the line entered IN_SLA (SS-1); only periods from the tenant's first live wage month (SS-2). Which artefact families can be IN_SLA in each release is §05.9's matrix. The SLA clause cites the coverage-statement version (§05.20 O2); an obligation absent from the statement is not covered by implication | `coverage.versioned` events; the statement version carried on each `filing.*` event |
| **The promise, per covered instance** | **Mode C** (operator-attended — offered per portal only once F-08[portal] is SHIPPED, §05.18): the instance satisfies `complete(f)` and `on_time(f)` (§01), provided the employer closed inputs, approved and funded no later than `tenant_action_lead[family]` before the due date (SS-3). **Modes A and B, and every portal while F-08 is open:** the SLA narrows to artefact readiness, warning lead time and co-attended guidance (§05.12; §05.18 F-08) — the instance reaches VALIDATED (FR-PAY-711 F5) no later than `sla.artefact_ready_lead[family]` before the due date, and every tenant-side blocker is warned before the SS-3 point. In no mode is it a promise of statutory outcome — the authority's acceptance, a penalty waiver, or a refund of the tenant's own liability (§05.9) | Gates 1–3 of §19.1; Artefact Readiness Rate and Late-Warning Share (below) |
| **Exclusions** | (1) Instances on any line not IN_SLA — SLA_PENDING_FIRST_SUBMISSION; CARVED_OUT_FENCE, for example Form 138 Q4 and Tax Year 2026-27 Form 130 on F-01 (EV-046), the ECR arrear return on F-03 (EV-043), post-lapse ESI on F-04; CARVED_OUT_PARAMETER; TENANT_SELF_FILES; NOT_OFFERED. (2) Authority-caused misses (§05.9) — a portal outage or format change on the due date, an unpublished format. (3) Tenant-caused misses where the warning reached the tenant before the SS-3 point. (4) Instances whose due-date rule is unconfirmed, which are never judged on time or late (SS-4). (5) Periods before the first live wage month (SS-2). (6) The statutory liability itself, which is non-delegable and never described as transferred (EV-K24; §23.13.5) | `miss_class` (AC-7); the coverage-gap register |
| **Claim trigger** | A claim opens automatically — not only on the tenant's request — when a covered instance records a product-caused miss (AC-7). It is priced when `penalty.incurred` records an amount the authority charged on that instance. A tenant may also open a claim; either way it enters the same lifecycle. A warning that reached the tenant after the SS-3 point makes the miss product-caused whatever the tenant did (SS-3) | `filing.miss_classified`, `penalty.incurred`, `sla.claim_opened` (§19.11.1) |
| **Evidence** | The causation record §18.3 requires, assembled from records the product keeps anyway: the FR-PAY-711 transition log with authority timestamps (AC-1); the completion-predicate fields (§01); `submission_mode`, the delivery mode and, for Mode C, the authority-to-act document and the session log (§22 FR-OPS-008); the tenant's approval and funding timestamps and each warning's delivery timestamp (SS-3); the coverage-statement version and the due-date rule version (AC-6); the authority's own interest, damages or fee figure — the portal's figure governs, never our forecast (§06.2). A claim may not be declined for want of a record the product was obliged to keep: a record missing on our side decides the miss as product-caused | The per-tenant compliance-SLA evidence board (§19.11.4) |
| **Remedy and cap** | Remediation of the instance — fix, refile on whatever correction route EV-037 still allows, disclose — plus a contractual remedy for interest, damages, fees or penalties charged on the instance **solely** because of a product-caused miss, within a cap of `sla_remedy_cap_months` × the tenant's monthly platform fee, per incident and per annum (§18.3). Whether a product-caused miss that drew no charge also earns a service credit is the remedy schedule's decision (§18.3; counsel, CR-17e) and is not set here. No damages percentage or fee cap is quoted in any contract until §06's parameters are re-captured from the notified text (§18.3). Counsel drafts the cap and indemnity and checks their insurability (CR-17e, CR-17f; §23.13.5) | Remedy Cap Utilisation (below) |
| **Disclosure** | Every miss on a covered instance, whatever its class, is root-caused and disclosed to the tenant with its class and evidence (§05.9). A class the tenant disputes is re-reviewed, and the dispute is itself counted | Claim Dispute Share (below) |

**The claim lifecycle, as a transition table.** A claim is in exactly one state at a time; every transition is an `sla.*` event carrying the claim ID, the instance ID and the actor.

| # | From → To | Event | Guard | Side effect | Who may trigger |
| --- | --- | --- | --- | --- | --- |
| C1 | *(none)* → OPEN | Product-caused miss recorded, or the tenant opens a claim | The instance was on an IN_SLA line at its due date | Evidence bundle assembled from the records above; tenant notified | System; tenant admin |
| C2 | OPEN → CLASSIFIED | Root cause confirmed | `miss_class` set with its root-cause reference (AC-7) | Class and evidence shown to the tenant | Statutory desk lead |
| C3 | CLASSIFIED → DECLINED | Class is tenant- or authority-caused, or an exclusion applies | The exclusion is named with its evidence | Reason disclosed | Statutory desk lead |
| C4 | CLASSIFIED → ACCEPTED | Class is product-caused | — | Remedy computed from the authority's charged figures, capped (AC-10) | Statutory desk lead, with a finance approver |
| C5 | DECLINED or ACCEPTED → DISPUTED | Tenant disputes the class or the amount | Within `sla.claim_dispute_window_days` of the decision | Re-review queued to a person other than the classifier | Tenant admin |
| C6 | DISPUTED → ACCEPTED or DECLINED | Re-review decided | Reviewer is not the original classifier | Decision and reason recorded | Legal lead |
| C7 | ACCEPTED → SETTLED | Remedy paid or credited | Amount within the cap version in force | `sla.claim_settled` | Finance |

<!-- DIAGRAM: metrics-sla-claim-lifecycle -->

`sla.artefact_ready_lead[family]` and `sla.claim_dispute_window_days` are named here, unsized, and routed to §20 (the pricing-and-commercial family of §20.13); `sla_onboarding_lead_days` and `tenant_action_lead[family]` are §05.9's and `sla_remedy_cap_months` is §18.3's.

**The SLA measures.**

| Measure | Numerator | Denominator | Target |
| --- | --- | --- | --- |
| Product-Caused Miss Rate | In-coverage instances missed with `miss_class` = product-caused | In-coverage instances due | → 0%; bounded above by 1 − On-Time Filing Rate. §05.3 DG-2b gates the 200–999 band at below 2% over a quarter |
| Artefact Readiness Rate (Modes A and B) | In-coverage Mode A and B instances reaching VALIDATED at least `sla.artefact_ready_lead[family]` before the due date | In-coverage Mode A and B instances whose source payroll month reached LOCKED by the `tenant_action_lead[family]` point | → 100% |
| Late-Warning Share | As §19.3.3 | As §19.3.3 | → 0% |
| Claim Incidence | Claims ACCEPTED, as a count and in ₹ | Tenant-months on the File tier | 0; an accepted claim that carries a charge is also a Sev-1 under guardrail 2 |
| Remedy Cap Utilisation | ₹ settled for a tenant in the contract year | That tenant's annual cap under the cap version in force | Trend; a tenant nearing its cap is reviewed by the Legal lead, because the cap is the insurability boundary |
| Claim Dispute Share | Claims entering DISPUTED | Claims DECLINED or ACCEPTED | Trend; no target |
| Classification latency | Median days from OPEN to CLASSIFIED | — | Trend; no target |

**Worked decisions — one 60-employee tenant, one September ECR (Case A's tenant, dues ₹2,16,000).**

| Situation | Class | Covered? | Claim outcome | On the raw On-Time Filing Rate |
| --- | --- | --- | --- | --- |
| Mode C, IN_SLA. The employer approved and funded on time; our operator's queue overran and the receipt was captured on the 17th | Product-caused (§05.9: a submission we were authorised and funded to make was not made) | Yes | OPEN → CLASSIFIED → ACCEPTED. Interest forecast ₹2,16,000 × 12% × 2 ÷ 365 ≈ ₹142 (rate **[Verified — mirror]**; the portal's figure replaces the forecast); late-return fee 2 × ₹500 = ₹1,000, capped at the month's admin charges (**[Verified — mirror]**, §06.2); damages unpriced until `epf.damages_scale` is captured. At the ₹80–150 PEPM planning anchor (**[Hypothesis]**, EV-006) the monthly fee is ₹4,800–9,000, so a cap of even one month covers the interest and fee lines; the damages line, once priced, is where the cap can bind | A miss |
| As above, but the employer funded the challan on the 16th, and our warning reached it before the SS-3 point | Tenant-caused | No — exclusion 3 | DECLINED, with the warning's delivery timestamp as evidence | A miss; guardrail 2 records the penalty incidence with causation "not ours" |
| As above, but the warning reached the employer after the SS-3 point | Product-caused (SS-3) | Yes | ACCEPTED, as in row 1 | A miss |
| EPFO portal outage on the 15th; Mode C session could not complete | Authority-caused | No — exclusion 2 | DECLINED and disclosed; the instance is prepared for the next available window in the tenant's chosen mode (§05.9) | A miss — AC-8 keeps it in the raw rate |
| Mode A. The artefact was VALIDATED before the `sla.artefact_ready_lead[family]` point; the employer uploaded on the 16th | Tenant-caused — the Mode A promise, artefact readiness, was kept | No — exclusion 3 | No claim opens | A miss |
| Form 138 Q4 of Tax Year 2026-27, format unpublished | — | No — exclusion 1 (CARVED_OUT_FENCE, F-01) | None possible; the instance sits in the coverage-gap register (EV-046) | Not in the denominator |

- **AC-9** Whether an instance is covered, and if not which exclusion applies, is computable from the coverage-statement version, the FR-PAY-711 transition log and `miss_class` alone; two evaluators on the same day reach the same answer.
- **AC-10** A remedy can never exceed the cap in force. The computation stores the cap version, the monthly fee it used and the authority's charged figures it paid against.
- **AC-11** No SLA measure reads a delivery mode other than the one recorded on the filing (§23 FR-LEG-034 AC2); a Mode A filing never appears as operator-submitted.
- **AC-12** The SLA clause cites the tenant's coverage-statement version and each statement version names the SLA wording it implements; a paying tenant whose clause cites no version fails §05.20 R1X-04.

#### 19.9.3 The supervised-minutes metric — measurement specification

Three sections touch supervised filing and they do different jobs: §22.7 owns the cost model and its
parameters, §13.19 derives and versions `max_supervised_minutes_per_filing_cycle`, and **this
subsection owns the measurement** — what a minute is, which instance it attaches to, what happens when
one action serves several, and how the number resists being managed. It matters more than any other
COGS metric because it is the only one whose cost unit differs from the revenue unit: revenue scales
per employee, this cost scales per registration × state × filing type (EV-088). A metric that
mis-attributes minutes will mis-price the product.

<!-- DIAGRAM: metrics-supervised-minutes-meter -->

**The minute record — data definition.** The FR-OPS-010 meter emits one record per state span in the
diagram; the metrics layer aggregates records, never wall-clock guesses.

| Field | Meaning | Notes |
| --- | --- | --- |
| `span_id`, `session_id` | The span and the portal session it belongs to | A preparation span has no session |
| `operator_id` | Who | Never published per operator outside the ops review (AC-36) |
| `portal`, `filing_type`, `state` | What surface | Keys the §22.7 parameters |
| `instances[]` | The filing instances the span served | Usually one; more is the allocation case below |
| `delivery_mode` | A, B, C or D at the time of the span | A Mode A instance can still carry staff minutes |
| `span_state` | PREP \| ACTIVE \| WAIT_BLOCKING \| WAIT_PARKED \| EXCEPTION | Per the meter |
| `reason_code` | For PREP and EXCEPTION spans — reconciliation, instruction follow-up, rejection rework, hand-back | Reason-coded time is the input to `m_prep` and `m_exception` (§22.7) |
| `started_at`, `ended_at` | UTC, NTP-synced (EV-062) | |
| `allocation_method` | `direct` \| `equal_split` \| `driver_split` | Stored so any aggregate can be re-derived under a different method |
| `chargeable` | Whether the span enters the meter total | False for WAIT_PARKED and for training spans |

**Allocation — the decision table.** Attribution is the whole difficulty: the cost unit is the filing
instance, and operators do not work one instance at a time.

| # | Situation | Allocation | Why not the alternative |
| --- | --- | --- | --- |
| SM-1 | A span serves exactly one instance | `direct` | — |
| SM-2 | One portal login serves several registrations of the same tenant in one sitting | `equal_split` across the instances worked, with the span retained whole | A per-registration timer on an indivisible login would be invented precision; the split is declared so §22.7 can re-derive it |
| SM-3 | A span serves instances of **different tenants** | Not permitted. The meter refuses to close a span spanning tenants, and the operator splits it | Cross-tenant allocation makes per-tenant cost-to-serve unauditable, and the per-tenant board is customer-visible |
| SM-4 | Rejection rework on an instance already filed once | `direct`, `span_state = EXCEPTION`, reason `rejection_rework` | Folding rework into the base session hides the rejection's real cost, which is the point of measuring rejections |
| SM-5 | Waiting on an OTP or an authorised signatory, unable to switch work | `WAIT_BLOCKING`, chargeable | It is genuinely consumed capacity — §22.7's `f_wait` |
| SM-6 | Waiting on the tenant, operator switches to other work | `WAIT_PARKED`, **not** chargeable, but metered and reported | Charging parked waits would make the tenant's slowness look like our cost and inflate the automation target |
| SM-7 | Staff minutes on a **Mode A** instance the tenant submits itself | Metered, `direct`, and reported in the Mode A line | A Mode A instance is not free to serve; pretending it is understates the dominant COGS line |
| SM-8 | Minutes on an instance in the coverage-gap register | Metered against the **gap entry**, not the instance | Those minutes are curation and unblocking work, not filing delivery; mixing them corrupts the per-instance figure in both directions |
| SM-9 | Credential-vault break-glass, incident or audit-response minutes (§22) | Metered to the tenant, `reason_code = exception`, excluded from `m_session` | They are real cost but not filing-cycle cost; §22.7 sizes them separately |
| SM-10 | Training, shadowing or a second operator observing | Metered, not chargeable | Otherwise the metric rises whenever the desk grows |

**The derived measure — Revenue per Supervised Instance.** The mismatch EV-088 names is only visible
per instance, so the metric that exposes it is revenue divided by the count of supervised instances,
never by employees:

```
Revenue per Supervised Instance (tenant, month)
    = tenant monthly platform fee
    ÷ supervised filing instances for that tenant in the month (§22.7's counting rule)
```

Worked, for the 60-employee Maharashtra tenant with one PF code, one ESI code, one TAN and one PTRC.
Monthly supervised instances = 1 ECR + 1 ESI + one-third of a quarterly Form 138 ≈ **2.33** (the PTRC
line is excluded while its cadence is an uncaptured parameter — §06.11, EC-16):

| Price point | Monthly fee at 60 heads | Revenue per supervised instance |
| --- | --- | --- |
| ₹50 PEPM value floor (EV-027) | ₹3,000 | **≈ ₹1,288** |
| ₹80 PEPM, the clearing band's floor (EV-027) | ₹4,800 | ≈ ₹2,060 |
| ₹150 PEPM, this PRD's planning anchor top (EV-027) | ₹9,000 | ≈ ₹3,863 |

The same tenant re-registered across three states and two entities does not pay more under a
per-employee price, but its instance count rises with every registration — which is why §18 needs a
registration allowance or a multi-registration line and §13.19 derives the minutes target from the
**lowest** revenue per supervised instance the price card admits. This section's job is to supply the
measured denominator and to publish the ratio per tenant monthly, so that the tenant profiles eating
the margin are identifiable by name rather than inferred from a blended average.

**Anti-gaming — the meter measures capacity, not people.** A meter that becomes an operator
performance score will be under-reported, and an under-reported dominant COGS line is the worst
failure mode in this section. Three structural controls:

- **Cross-check, not trust.** Metered ACTIVE minutes are reconciled against the §22 session log's
  portal entry and exit timestamps; the **Unmetered Session Share** (sessions whose metered minutes
  fall short of their session span by more than a tolerance) is published as a data-quality metric
  with a target of 0.
- **The published series is per portal × filing type × mode**, never per operator. Operator-level
  minutes exist only inside the ops review for rostering (§22).
- **The target is an engineering target, not a quota.** `max_supervised_minutes_per_filing_cycle` is
  breached by *automating less*, and the response in §19.12.3 is a product change — the registration
  cap or the multi-registration line — never a faster operator.

- **AC-32** Every chargeable minute resolves to exactly one filing instance or one coverage-gap entry,
  with `allocation_method` recorded. Minutes that resolve to neither are a metering defect and are
  published as the **Unallocated Minutes Share**, target 0.
- **AC-33** The meter refuses to close a span that names instances of more than one tenant (SM-3).
- **AC-34** Supervised Minutes per Filing Cycle is reported per registration × filing type × cycle and
  **never** as a per-employee figure. A PEPM presentation of this metric is a review defect, because
  it re-imports the very unit mismatch the metric exists to expose.
- **AC-35** Parked waits, training spans and break-glass minutes are excluded from the chargeable
  total and reported as their own series. Any change to what is chargeable is a metric-register
  version bump and restates the series (§19.11.6).
- **AC-36** No dashboard outside the ops review exposes operator-level minutes, and the per-tenant
  cost board shows the tenant's own minutes only in aggregate by filing type.

#### 19.9.4 The SLA evidence bundle — contents, completeness test and retention

§19.9.2's Evidence row states the principle: a claim may not be declined for want of a record the
product was obliged to keep. That principle is only operable if the record set is enumerated in
advance and its completeness is machine-checkable, because the moment a claim is contested is the
worst moment to discover a gap. The bundle is assembled at **C1**, when the claim opens — not at C4,
when we decide — so that the evidence cannot be selected after the answer is known.

| # | Item | Source | Missing ⇒ |
| --- | --- | --- | --- |
| EB-1 | The instance's full FR-PAY-711 transition log with authority timestamps | Filing ledger (AC-1) | Product-caused |
| EB-2 | The counter row and the run version of every metric figure quoted in the claim | Metrics warehouse (AC-37) | The figure cannot be quoted |
| EB-3 | Coverage-statement version in force on the due date, with the line's state | §05.21 · `coverage.versioned` | Coverage cannot be asserted; the claim is treated as covered |
| EB-4 | Due-date rule version and the rule object it resolves to | Rule registry (AC-6) | On-time cannot be asserted; treated as a miss |
| EB-5 | `submission_mode`, `delivery_mode`, `submitted_by` and, for Mode C, the authority-to-act document and the §22 session log | Filing ledger; §22 FR-OPS-008 | Mode C cannot be asserted (AC-11) |
| EB-6 | Tenant approval, input-close and funding timestamps | Payroll-month transitions | SS-3 cannot be asserted against the tenant ⇒ product-caused |
| EB-7 | Every warning issued on the instance, with its delivery timestamp and channel | Notice records | The warning is treated as not delivered (SS-3) |
| EB-8 | The authority's own interest, damages or fee figures, and the portal artefact carrying them | Portal capture (§06.2) | No amount may be paid on a forecast; the claim waits for the authority figure |
| EB-9 | The generated artefact and its `artefact_format_version`, plus the validator output for each attempt | Artefact store | An artefact defect cannot be excluded ⇒ product-caused |
| EB-10 | For a rejection, the portal's rejection response and the FR-PAY-713 family assigned | Filing ledger | The rejection cause is unestablished ⇒ product-caused |
| EB-11 | The coverage-gap entry, where the claim touches an excluded line | Register (§19.3.9) | The exclusion cannot be asserted |

**The completeness test runs before the claim is classified, not after.** A **Bundle Completeness
Rate** — claims whose bundle carried every applicable item at C1 ÷ claims opened — is published with a
target of 100%, and each missing item is itself a defect ticket against the system that owed the
record. The asymmetry is deliberate and it is the whole design: **every missing item resolves against
us**. That is what makes the evidence promise credible to a customer who cannot audit our systems,
and it is a cheaper commitment than it looks, because each item is a record the product keeps anyway
for statutory or operational reasons.

**Retention.** The bundle is retained for as long as a claim on the instance could be made — the same
horizon §05.21 sets for coverage statements — and its retention class is §14.7's to assign and
counsel's to confirm. Two constraints bound it: the bundle carries no employee personal data beyond
what the artefact itself carries, and the ICT-log floor of 180 days within Indian jurisdiction
(EV-062) is a floor, not the retention period. Where a statutory retention period would apply to a
component, it is the central-sphere figure in §06 or a configurable state period — never a number
invented here (Part D-11).

**A worked negative — the claim we lose on our own records.** An ECR instance misses by two days. The
tenant says it funded on time; our funding timestamp is missing because the bank-file callback was
never recorded. EB-6 is absent. Under the rule, SS-3 cannot be asserted against the tenant, the miss
classifies **product-caused**, the claim is ACCEPTED, and the remedy pays the authority's interest and
late-return figures inside the cap. The engineering outcome is the important one: the missing callback
becomes a defect on the integration, and the Bundle Completeness Rate falls for the period — which is
how a record-keeping gap becomes visible as an engineering metric rather than as an argument with a
customer.

---

### 19.10 Leading vs lagging — the consolidated index

A single table the team reads weekly. Leading metrics are actionable *now*; lagging metrics are scorekeeping. The rule: **if a leading metric is red, act; if a lagging metric is red and the leading metrics were green, the model is wrong — revisit the tree.**

| Metric | Layer | Lead/Lag | Owner | Review cadence | Alert threshold |
| --- | --- | --- | --- | --- | --- |
| Activation Rate | Input | Leading | Onboarding/Product | Weekly | < 60% (Phase 1) |
| Time-to-First-Filing | Input | Leading | Onboarding | Weekly | median > 30 days |
| Migration Completeness | Input | Leading | Product/Implementation | Per onboarding | < 95% at first filing |
| Pre-Filing Validation Pass Rate | Process | Leading | Payroll Eng | Per run | any run-blocking fail |
| Payroll-Run Success Rate | Process | Leading | Payroll Eng | Per run | < 100% |
| AI Deflection Rate | Process | Leading | AI/Product | Weekly | < 40% (Phase 1) |
| Statutory-Change Lead Time | Process | Leading | Statutory team | Per change | SLA breach |
| **OTAF (north star)** | Output | **Both — the pivot** | Whole company | Weekly | MoM decline |
| On-Time Filing Rate | Output | Lagging | Payroll/Statutory | Weekly | < 99% (Phase 1, §19.12.1) |
| Filing-Integrity Rate | Output | Leading→Lagging | Payroll/Statutory | Weekly | < 97% (Phase 1 — the RFT-inclusive floor of §19.15; it cannot sit above the RFT target) |
| Product-Caused Miss Rate | Output | Lagging (SLA) | Statutory desk lead | Weekly | any product-caused miss is reviewed that week (§19.9.2) |
| On-Time Margin (p10) | Output | Leading | Payroll Eng | Weekly | p10 < 24h |
| Rejection / Correction Rate | Output | Leading | Payroll Eng | Per filing cycle | > 2% / > 3% (Phase 1 — the rejection target and the complement of the ≥ 97% RFT target, §19.12.1) |
| Penalty Incidence | Output | Lagging (harm) | Statutory/Support | Real-time alert | **any > 0 = Sev-1** |
| AI COGS per Account | Output | Leading (inference cost) | AI/Finance | Weekly | trending → ARPU |
| Model-Mix Ratio | Process | Leading (inference cost) | AI Eng | Weekly | frontier share ↑ |
| Supervised Minutes per Filing Cycle | Process | Leading (margin — the dominant COGS line, EV-088) | Compliance Ops (§22) / Finance | Per filing cycle | above `max_supervised_minutes_per_filing_cycle` (unsized, §20) |
| NRR / GRR | Outcome | Lagging | Finance/GTM | Monthly | NRR < 100% / GRR < 85% |
| Band-Crossing Rate | Outcome | Lagging | GTM | Monthly cohort | < 25% by mo-18 |
| Logo Retention | Outcome | Lagging | GTM/Success | Monthly cohort | 50–199 < 90% |
| CAC-Payback | Outcome | Lagging | GTM/Finance | Monthly | > 12 months |
| Coverage-Gap Instance Share | Output | Leading (scope honesty) | Statutory desk lead | Weekly | rising while OTAF rises (§19.3.9) |
| Coverage-Gap Ageing (p90) | Output | Leading | Statutory desk lead | Monthly | any entry above `gap_age_escalation_days` |
| Restatement Rate | Instrumentation | Leading (data quality) | Analytics owner | Weekly | rising — the watermark is too early (§19.11.6) |
| Quarantine count | Instrumentation | Leading (data quality) | Analytics owner | Daily | any non-zero value |
| Unmetered Session Share | Process | Leading (margin integrity) | Compliance Ops (§22) | Per filing cycle | any non-zero value (§19.9.3) |
| Bundle Completeness Rate | Output (SLA) | Lagging | Statutory desk lead | Per claim | < 100% (§19.9.4) |
| Chargeable-Message Share; Category-Mismatch Rate | Process | Leading (WhatsApp COGS line) | AI/Product · GTM | Weekly | any category mismatch; chargeable share rising without a volume cause (§19.8.7) |
| `wa_inr_billing_migrated` | Process | Leading (delivery risk) | GTM | Weekly until done | not done at the GTM owner's lead — delivery stops 1 Jan 2027 (EV-088) |
| Curation Cost per State Maintained; Tenants per State | Process | Leading (curation COGS line) | Statutory desk lead / Finance | Monthly | a state whose tenant count stays at one past a release gate (§19.8.7) |

**The escalation rule made concrete.** When Penalty Incidence goes > 0, it pages the statutory/support on-call in real time (it is the only real-time alert in the table) because it is the harm guardrail and every incident is a rupee number (§19.3.2). Every other threshold routes to its owner's weekly or monthly forum (§19.11.5). A leading metric breaching its threshold is a *this-week action*; a lagging metric breaching while leading metrics were green is a *model is wrong* signal that sends the team back to the tree (§19.2).

---

### 19.11 Instrumentation plan

Metrics are only as good as the events beneath them. This plan specifies the event taxonomy, the attribution requirement, the pipeline, and the governance — built so that **per-tenant/user/agent/model attribution exists from v1** (§13) and so that analytics itself meets the CERT-In Directions (EV-062) and the data-protection posture in §19.11.4.

#### 19.11.1 Event taxonomy (the minimum event set)

Every metric above traces to named events. The taxonomy is small on purpose; each event carries a stable schema so metrics recompute historically — within the limit set by bitemporality scoped by entity class (Part E-2, §14). Filing, rule and payroll events are statutory records and replayable. Events derived from **erasable** classes — punches, biometric templates, consent artefacts, rendered documents — are not: metrics over them are computed from aggregate counters kept after erasure, and a recompute after an erasure returns the aggregate, not the erased record. **[Reversed]** An earlier draft implied every metric could be recomputed from raw history (EV-K35).

| Event domain | Key events | Feeds |
| --- | --- | --- |
| **Filing lifecycle** | One event per §08 FR-PAY-711 transition: `filing.scheduled`, `filing.blocked` (with reason), `filing.generated`, `filing.validated`, `filing.submitted` (with who submitted and on whose authority, §22), `filing.rejected`, `filing.accepted`, `filing.revised`, `filing.supplementary`, `filing.payment_initiated`, `filing.filed`; plus the derived `filing.miss_classified` (instance, `miss_class`, root-cause reference — AC-7) and `filing.rft_settled` (the settlement step that resolves `right_first_time` when `rft_window_days` closes) | OTAF, integrity, rejection/correction, on-time, RFT, time-to-correct, on-time-margin, product-caused miss rate, coverage-gap register |
| **Coverage** | `coverage.versioned` (`tenant_id`, `version`, `trigger`, `lines_changed[]` — emitted by §05.21 on every coverage-statement version) | Filing Coverage, the coverage-gap register, the in-coverage denominator, SLA scope |
| **Supervised filing** | `ops.session_started`, `ops.session_ended` (operator, registration, filing type, delivery mode, active and wait minutes), `ops.minutes_logged` (reason-coded preparation and exception minutes against an instance) — the FR-OPS-010 meter feeding the §15.6.4 cost ledger | Supervised Minutes per Filing Cycle |
| **Penalty** | `penalty.exposure_opened`, `penalty.incurred`, `penalty.resolved` | Penalty incidence, harm guardrail |
| **SLA claims** | `sla.claim_opened`, `sla.claim_classified`, `sla.claim_declined`, `sla.claim_accepted`, `sla.claim_disputed`, `sla.claim_settled` — one per §19.9.2 transition | Claim incidence, remedy cap utilisation, dispute share |
| **Payroll** | `payroll.run_started`, `payroll.run_succeeded`, `payroll.run_failed`, `wagebase.computed` (both bases), `validation.failed` | Run success, pre-filing validation |
| **Onboarding/activation** | `signup`, `statutory_code.linked`, `migration.field_captured`, `first_filing.accepted`, `importer.used` | Activation funnel, TTFF, migration completeness, activation depth |
| **AI/inference** | `ai.request` (carrying the §13.9 attribution record), `ai.cache_event`, `ai.deflected`, `ai.budget_cap_hit` | AI COGS per account, per-class/model cost, deflection, rate-limit incidents, model-mix |
| **Commercial** | `subscription.created/upgraded/downgraded/churned` (+reason code), `seat.changed`, `module.attached`, `invoice.issued` | NRR/GRR, band-crossing, attach, CAC-payback |
| **Reliability** | `device.punch_received`, `device.integration_failed`, `statutory_rule.effective`, `uptime.probe` | Device success, statutory lead time, corrigendum-catch, uptime |

#### 19.11.2 Sample event schemas (the load-bearing two)

The two event families that the entire thesis depends on — filing lifecycle (proves OTAF) and AI inference (proves the unit economics) — carry these minimum schemas. They are illustrative shapes, not a chosen serialization:

```jsonc
// filing.filed — the FR-PAY-711 F15 transition; closes the "on_time" gate of OTAF
{
  "event": "filing.filed",
  "ts_utc": "2027-04-12T09:41:07Z",          // our record time, NIC/NPL NTP-synced (AC-1, EV-062)
  "authority_ts_utc": "2027-04-12T09:38:52Z",  // the portal's own receipt time — on-time is judged on this
  "tenant_id": "t_0xA3",
  "registration_id": "r_0x17",                 // filing instance = registration × obligation × period
  "instrument": "EPF_ECR",                     // EPF_ECR | ESI | PT | TDS_138 | FORM_130 (issuance) | LWF
  "state": null,                               // set only for state-specific instruments (PT/LWF)
  "period": "2027-03",                         // wage month / quarter the filing covers
  "coverage_statement_version": 7,             // version in force on the due date (§05.21)
  "coverage_state": "IN_SLA",                  // only IN_SLA instances enter OTAF and its denominator (§19.1)
  "return_type": "REGULAR",                    // REGULAR | SUPPLEMENTARY | REVISED (EV-037)
  "due_date": "2027-04-15",                    // effective-dated (AC-2)
  "due_date_rule_version": "epf.due.v3",       // AC-6: which rule judged on-time
  "on_time": true,
  "on_time_margin_hours": 62.3,                // due_date - authority_ts_utc (feeds §19.3.3)
  "rejected_attempts": 0,                      // any value above 0 fails gate 3
  "submission_mode": "employer",               // employer | operator_under_written_authority (§14.4.5)
  "delivery_mode": "A",                        // A | B | C | D (§22 FR-OPS-001); field proposed in §22.12 O19 —
                                               // until §14 adds it, read from the session log (FR-OPS-008)
  "submitted_by": "u_0x2C",                    // the acting user — the employer's user in Modes A and B
  "authority_to_act_document_id": null,        // required when submission_mode is operator_under_written_authority
  "computation_provenance": {                  // AC-5: no figure model-generated
    "wage_base_rule": "cow.s2y.v2",            // illustrative rule-version id
    "effective_date": "<rule object's effective_from>"  // copied from the rule object (§14), never typed in
  },
  "ack_ref": "TRRN-...",                       // §14.4.5 ack_ref: return file ID and challan TRRN for the ECR (EV-036)
  "right_first_time": null                     // resolved when rft_window_days closes
}

// ai.request — proves cost-per-account (the §13.9 attribution record, plus metric fields)
{
  "event": "ai.request",
  "ts_utc": "2027-04-12T09:40:55Z",
  "tenant_id": "t_0xA3",
  "user_id": "u_0x91",                         // priced per employee, consumed per user (§13)
  "task_class": "A1",                          // cost class A0–A6 (§13.3)
  "model": "gemini-2.5-flash-lite",            // for per-model cost + model-mix ratio
  "model_list_price_ref": "gemini-2.5-flash-lite@2026-09",  // list price the call was costed at (§13.9)
  "input_tokens": 4120,
  "output_tokens": 388,
  "cache_read": 0,                             // read-priced prefix caching where supported (§19.8.2)
  "cache_write": 0,
  "cost_inr": 0.0536,                          // (4,120 × $0.10 + 388 × $0.40) per 1M tokens × ₹94.43 (§13.6 list prices)
  "fx_rate_at_call": 94.43,
  "residency_region": "in",                    // §13.10
  "escalated": false,
  "rules_fallback": false,
  "deflected": true,                           // resolved without human handoff
  "budget_cap_hit": false
}
```

The `right_first_time` field being resolved *later* (when the settlement window closes, §19.1.2) is why filing events must be immutable-append with a settlement step, not overwritten — otherwise historical OTAF cannot recompute (§19.14 rule 2).

#### 19.11.3 The attribution requirement (non-negotiable, from v1)

Every `ai.*` event **must** carry the §13.9 attribution record — `{tenant_id, user_id, task_class, model, model_list_price_ref, input_tokens, output_tokens, cache_read, cache_write, escalated, fx_rate_at_call, residency_region, rules_fallback}` — plus the metric fields `{cost_inr, deflected, budget_cap_hit}`. §13.9 owns the schema; this section consumes it. This is the §13 mandate: build cost attribution while AI is free, because retrofitting it after pricing exists is far harder. Without it, none of §19.8 is computable and the inference-cost thesis (§13) is unfalsifiable.

Similarly, every `filing.*` event carries `{tenant_id, registration_id, instrument, state, period, return_type, coverage_statement_version, coverage_state, due_date, due_date_rule_version, computation_provenance(rule_version, effective_date)}`, and `filing.submitted` and `filing.filed` also carry `{submission_mode, delivery_mode, submitted_by, authority_to_act_document_id}` — the §14.4.5 field names, with `delivery_mode` pending §22.12 O19 — so that on-time and RFT recompute correctly even after a due-date or rule change (AC-2, AC-5, AC-6) and every operator submission traces to a written authority to act (§22).

**Attribution completeness is itself a metric.** The share of `ai.*` events missing any required field, and the share of `filing.*` events missing provenance, are tracked as **instrumentation-coverage metrics** with a target of 100%. A metric computed on incomplete events is a §19.13 vanity risk; the coverage metric is what keeps the analytics honest from v1.

#### 19.11.4 Pipeline, tooling and residency

- **Event bus → warehouse → metrics layer.** Product events land on an append-only bus, stream to a warehouse, and are modelled into the metrics tree. Event logs are treated as ICT logs under the CERT-In Directions whether or not every event strictly is one: **retained at least 180 days within Indian jurisdiction**, with clock-sync to NIC/NPL NTP so every timestamp is authority-comparable (EV-062, §17; relevant for on-time proof, AC-1). LLM prompt and completion logs stay in India (Part E-7, §12.8.3).
- **Data-protection posture — two regimes, stated exactly.** **[Reversed]** An earlier draft stated DPDP s.7(i) — employment-purpose processing without consent — as the current basis for this pipeline (EV-K14). It is **not in force** until on or about 13 May 2027 (EV-058); when it commences it disapplies consent and notice for employment purposes only, and does not disapply the s.8 duties. **Today**, the SPDI Rules 2011 treat financial information and biometric information as sensitive personal data (r.3) and require **consent in writing before collection** (r.5(1)), and r.7 restricts cross-border transfer (EV-060). DPDP itself creates no sensitive category (s.2(t), EV-059). Either way, the product treats analytics as a purpose separate from payroll processing: **instrumentation separates statutory-processing events from product-analytics telemetry**; analytics runs on tenant- and cohort-level aggregates or pseudonymous identifiers, never on raw salary, bank-account or biometric fields, so no analytics event carries SPDI-sensitive data and none leaves India. Who owes the SPDI written-consent duty, and whether analytics needs a basis of its own, is under counsel review (Part D-4, §23).
- **Dashboards, three tiers:** (1) a **company north-star board** (OTAF + guardrails, weekly); (2) **operational boards** per layer/owner (§19.10); (3) a **per-tenant cost-and-health board** (AI COGS per account, filing integrity, penalty exposure, and for File-tier tenants the SLA claims and their evidence) — the same board that is the compliance-SLA evidence for the customer (§18.3, §19.9.2).
- **Self-serve buildability.** Because this is a PRD, not a build (per project constraint), no tooling is specified as chosen. The requirement is only that whatever is chosen supports per-tenant/user/agent/model attribution and effective-dated recomputation from day one.

#### 19.11.5 Review cadence and ownership

| Forum | Cadence | Looks at |
| --- | --- | --- |
| Filing-integrity standup | Weekly | OTAF, rate, rejections/corrections, on-time margin, any penalty exposure, product-caused misses and open SLA claims |
| Growth review | Weekly | Activation funnel, TTFF, acquisition funnels, CAC-payback |
| Unit-economics review | Weekly | AI COGS per account, per-model spend, model-mix, FX sensitivity, cap incidents, supervised minutes per filing cycle |
| Cohort/retention review | Monthly | NRR/GRR (decomposed), logo retention, band-crossing, churn reason-codes |
| Statutory-change review | Per change / weekly | Statutory-change lead time, corrigendum-catch rate, coverage-gap register |
| Metric-integrity audit | Quarterly | Are any metrics being gamed? (§19.13) Re-confirm definitions haven't drifted (§19.14) |

#### 19.11.6 Computation semantics — event time, watermarks, sealing and restatement

Every metric in this section is a statement about a period, and periods close before all their
evidence arrives: an authority timestamp is captured when the portal returns it, a miss is classified
days later, and `right_first_time` resolves only when the settlement window closes (AC-15). Without a
stated policy, the same period reports different numbers on different days and nobody can tell a
correction from a defect.

<!-- DIAGRAM: metrics-late-event-settlement -->

**Definitions.**

| Term | Definition |
| --- | --- |
| **Event time** | The business instant a metric is computed on: `authority_ts_utc` where the authority issues one, otherwise our NTP-synced transition timestamp. Every metric aggregates by event time — never by ingestion time |
| **Ingestion time** | When the event reached the bus. Used only for lateness and for the watermark |
| **Watermark** | The event-time boundary before which a period is considered complete for a metric family. It is per family, because an ECR's evidence lands in hours and an RFT settlement in weeks |
| **Metric run version** | The identifier of the computation that produced a published figure: definition version, watermark, rule versions read, and the code version. Every published number carries one |
| **Sealed period** | A period whose figure has been published to a board, a customer or a phase gate. A sealed period is never edited in place — it is superseded by a new run version with a visible restatement note |

**Late-arrival decision table.** "Material" means the change crosses a published threshold, changes a
phase-gate answer, changes an SLA claim outcome, or exceeds `restatement_materiality` — a named
parameter owned by the analytics owner, routed to §20.

| # | What arrives late | Effect | Action |
| --- | --- | --- | --- |
| LA-1 | An authority timestamp that flips `on_time` | Material by definition — it changes a customer's compliance record | Restate the period with a new run version; open the penalty-exposure record (AC-3); notify the tenant |
| LA-2 | A `filing.rft_settled` for an instance whose window closed after the period was sealed | Expected, not late — this is why OTAF is provisional until settlement (AC-15) | Publish the settled figure beside the provisional one; no restatement note is needed where the provisional label was carried |
| LA-3 | A `filing.miss_classified` or a re-classification | Material if it moves an SLA claim or a Product-Caused Miss Rate across a threshold | Restate; the prior classification version is retained and the change is disclosed to the tenant (§19.9.2) |
| LA-4 | A coverage-statement version issued with retrospective effect on a line | Never retrospective for judgement — SS-5 fixes the version by due date | No restatement; the run stores the version it read |
| LA-5 | A due-date rule version change (a state's PT date captured, r.218 read) | Material for every instance it re-judges | Restate the affected metric-periods under AC-6 and AC-2, and state in the note that the instances were previously unjudged, not previously on time |
| LA-6 | A duplicate or corrected AI or ops cost record | Material above the tolerance | Restate the cost period; finance's close and the metric board must reconcile (§19.6.2 AC-31) |
| LA-7 | Anything landing after the family's retention horizon | Cannot be restated | Record as an unreconcilable gap and publish it; never silently absorb it |

**Worked restatement — one hour across a date boundary.** Case A's tenant, September ECR, due
15 October. The challan is paid at 15 October 23:58 IST by our clock; the portal's receipt carries
**16 October 00:03 IST**. The weekly filing-integrity standup on the 16th reads the provisional
figure — 80 in-coverage instances, 80 on time, **On-Time 100%** — because the receipt has not yet
been captured. The receipt lands on the 17th:

1. `on_time` recomputes to **false** on the authority timestamp, never ours (gate 2). The figure for
   the week becomes 79/80 = **98.75%**, below the ≥ 99% Phase-1 target.
2. A penalty-exposure record opens: one day of simple interest on ₹2,16,000 at 12% p.a. (**[Verified
   — mirror]**, §06.2) ≈ ₹2,16,000 × 12% ÷ 365 ≈ **₹71**, plus a one-day late-return line of ₹500
   capped at the month's admin charges (**[Verified — mirror]**), plus the unpriced damages line. The
   portal's own figures replace every forecast when they appear (§06.2).
3. The miss is classified. If the tenant funded the challan after the SS-3 point and had been warned in
   time, it is tenant-caused and no claim is payable; the raw rate still carries the miss (AC-8).
4. The week's figure is **restated** with a new run version and a note, and the sealed 100% is
   retained as superseded — not deleted, because someone has it in a screenshot and the two must be
   reconcilable.

The ₹71 is trivial; the ₹0 alternative — never restating and leaving 100% standing — is not, because
it is the exact mechanism by which a compliance product stops knowing whether it is compliant.

**A missing authority timestamp is a miss, not an unknown.** If an instance has no `authority_ts_utc`
by `authority_ts_capture_sla_days` after submission (a named parameter, owner the Filing desk lead,
routed to §20), it is judged **not on time**, because we cannot evidence otherwise and the burden of
the record is ours (AC-7, §19.9.2's Evidence row). The instance also enters a **Pending Authority
Evidence** series so that a portal that stops returning acknowledgements is visible as an integration
problem rather than as a quality collapse.

- **AC-37** Every published metric figure carries its run version, and the run version resolves to the
  definition version, watermark, rule versions and code version that produced it.
- **AC-38** A sealed period is never mutated. Superseding runs are appended, and the board renders the
  latest with a restatement indicator and a link to what changed.
- **AC-39** Metrics aggregate on event time. A metric computed on ingestion time fails review, because
  it makes a slow pipeline look like a late filing.
- **AC-40** **Restatement Rate** — metric-periods restated ÷ metric-periods published, per family — is
  itself published. A rising restatement rate means the watermark is too early, and the remedy is the
  watermark, never a quieter note.
- **AC-41** A restatement that changes an SLA outcome re-enters the claim lifecycle at C2, and the
  tenant is notified with the evidence that changed (§19.9.2).

#### 19.11.7 Metrics over erasable entity classes

Bitemporality is scoped by entity class (Part E-2, §14): rules, salary structures, assignments and
statutory attributes are never forgotten and replay exactly; **punches, rendered documents, biometric
templates and consent artefacts are erasable**. §19.11.1 already states that metrics over erasable
classes cannot be recomputed from raw history. This subsection specifies what is kept instead, and
where the seam falls in the one place it actually bites: the ECR.

**The ECR seam.** NCP Days is field 10 of the ECR (EV-035) and it is derived from attendance —
an erasable class. The filed figure is part of a statutory artefact and is retained with the filing
record; the punches beneath it may be gone. So:

> **A filed figure is always read from the filing record, never recomputed from its sources.** Replay
> of a filing returns what was filed, with its computation provenance (AC-5) — not a fresh
> calculation. A recomputation that disagrees with the filed figure is a finding to investigate, not a
> correction to publish.

| Entity class | Replayable | Metrics that read it | After an erasure, a metric query returns | Counter written |
| --- | --- | --- | --- | --- |
| Rule objects, rule versions | Yes | Statutory-Change Lead Time, Corrigendum-Catch, due-date judgement | The same answer, always | n/a |
| Filing instances and their transitions | Yes | Every §19.3 metric, OTAF | The same answer | n/a |
| Payroll runs, salary structures, assignments | Yes | Payroll-Run Success, wage-base validation | The same answer | n/a |
| **Punches and attendance events** | No | Pre-filing validation inputs, NCP-day distributions, device success | The **pre-erasure aggregate** at tenant-month grain, not the erased rows | At wage-month lock, before any erasure can run |
| **Rendered documents** (payslips, certificates) | No | Distribution and issuance timeliness | The issuance counters | At issuance |
| **Biometric templates** | No | Device enrolment and health only | Enrolment counts and device-health aggregates; never anything template-derived | At enrolment and at each health check |
| **Consent artefacts** | No | Consent-coverage counts | Counts by consent version and regime, never the artefact | At capture and at each version change |

**The grain rule.** Any metric whose source class is erasable is defined at a grain that survives
erasure — tenant-month, device-month, cohort — and its counter is written **while the source is
live**, at the moment the period locks. A metric defined at employee-day grain over punches is not
shippable, because a single erasure silently changes a published number. This is the same discipline
as §19.11.6's sealing, applied to data that disappears rather than to evidence that arrives late.

**The negative that decides the design.** An erasure carried out under §14.7's mechanism — on whatever
basis, which is a counsel question this section does not answer (§23; Part D) — must **never** change a
published statutory metric. If it would, the metric was defined at the wrong grain and the defect is
the metric's, not the erasure's. The one number that moves is the **Erasure-Affected Share**: the
share of a metric's periods whose underlying erasable sources have since been erased, published so
that a reader knows which figures can be re-derived from rows and which are counters kept in good
faith.

- **AC-42** Every metric names its source entity classes in the register, and any metric naming an
  erasable class also names its pre-erasure counter, its grain and the lock event that writes it. A
  metric over an erasable class with no counter is not shippable.
- **AC-43** An erasure job refuses to run for a period whose counters have not been written, and the
  refusal is an alert, not a retry.
- **AC-44** Re-running any published metric after an erasure returns the published figure. A
  divergence quarantines the figure and raises an incident — that divergence is the only way the
  design fails, so it is instrumented rather than assumed away.

#### 19.11.8 Failure modes of the measurement layer itself

Every metric above assumes the instrumentation works. When it does not, the dashboards keep rendering
— which is the dangerous property, because a flat green board and a broken pipeline look identical.
These are the failure modes the metrics layer detects on itself, with the signal each produces and the
response. They are alerts on the measurement, not on the product, and they route to the analytics
owner rather than to the statutory desk.

| # | Failure | Signal | Response | Why a silent version is worse than an outage |
| --- | --- | --- | --- | --- |
| MF-1 | Event bus backlog — events land after their family's watermark | Lateness distribution shifts; restatement rate rises (AC-40) | Hold the affected family's figures as provisional; widen the watermark rather than restate repeatedly | A late `filing.filed` reads as a miss that never happened, and a miss triggers a Sev-1 review |
| MF-2 | Watermark stall — no events at all from a family | Zero-event alert per family per expected cadence | Page the analytics owner; freeze publication for that family | Zero filings looks exactly like a perfect month with nothing due |
| MF-3 | Counter replay mismatch (AC-16) | Nightly replay diverges from the stored row | Quarantine the instance, publish the quarantine count, reconcile | A mismatch means the derivation table and the code disagree — every metric downstream is suspect |
| MF-4 | Attribution gap on `ai.*` events | Attribution completeness below 100% (§19.11.3) | Block the AI COGS board for the period; fix the emitter | An unattributed call still costs money, so the tenant-level figure understates and the free-bundling decision is made on a wrong number |
| MF-5 | Duplicate instance creation (EC-21) | Duplicate-key alert at scheduling | Quarantine both; reconcile against the obligation calendar | A duplicate doubles a denominator and *improves* a rate — a failure that flatters |
| MF-6 | Clock drift on a collector | NTP health check fails (EV-062) | Stop trusting our own timestamps for that source; on-time still reads the authority's | Margin figures and lateness measures become fiction, and the CERT-In clock-sync duty is live from day one |
| MF-7 | A definition deployed without a register entry or version bump | Register reconciliation finds a metric with no `definition_version` | Block the deploy; the register is the gate (§19.14.1) | This is how "on-time" silently changes meaning between two board meetings |
| MF-8 | Coverage exclusion without a register entry (AC-21) | Nightly reconciliation difference | Alert immediately | It is indistinguishable from deliberate scope-narrowing, which is guardrail 3's whole concern |
| MF-9 | A metric queried straight off the transition log, bypassing counters (AC-13) | Query review; lineage check | Reject the query | Two sources of truth produce two numbers and neither can be defended to a customer |
| MF-10 | Pre-erasure counters not written before an erasure runs (AC-43) | Erasure job refuses and alerts | Write the counters, then erase | The data is gone; there is no second chance to measure it |

**The meta-rule.** Each of these fails **loudly and toward under-reporting**: a suspect figure is
withheld or marked provisional, never published with a caveat in a footnote. A metrics layer whose
failure mode is an optimistic number reproduces, on our own scoreboard, exactly the optimism bias §02
found in the research — which is the reason this subsection exists at all.

---

### 19.12 Targets per phase

Targets map to the §05.4 roadmap — **Phase 1** is v1 (files the beachhead, 20–200) and **Phase 2** is v2 (expansion into 200–1,999) — plus a **Phase 0** this section adds for month-zero foundations before the first paying customer; §05.4's Vision phase carries no metric targets yet. Against §05's release vocabulary (§05.17 PR-12): Phase 0 is R1 in PLANNED or IN_BUILD up to the pre-launch gate; Phase 1 runs from R1 RELEASED to the R3 gate; Phase 2 is v2. Where a §19 target is stricter than a §05.4 exit criterion (Phase-1 on-time ≥ 99% here against §05.4's ≥ 98% over a full quarter), §05.4's figure is the gate that opens the next phase and §19's is the operating target and the bar for selling the compliance SLA (§19.15). Per §02's discipline, **every target below is a [Hypothesis] until a cohort reports it** — they are planning anchors with kill criteria, not commitments, and they inherit the optimism-bias haircut.

#### 19.12.1 North-star and quality targets

| Metric | Phase 0 (found.) | Phase 1 (v1 beachhead) | Phase 2 (expansion) |
| --- | --- | --- | --- |
| OTAF (monthly) | Instrumented; internal test artefacts through the published validators (gates 2–4 need live filings) | Growing MoM; first real customer filings | Compounding with band-crossing + new tenants |
| **On-Time Filing Rate** | n/a (no live filings) | **≥ 99%** | **≥ 99.5%** |
| **First-Time-Right Rate** | n/a | **≥ 97%** | **≥ 99%** |
| Rejection Rate | n/a | ≤ 2% | ≤ 1% |
| **Penalty Incidence** | 0 | **0** (any penalty = Sev-1) | **0** |
| On-Time Margin (p10) | n/a | ≥ 24h before deadline | ≥ 48h before deadline |
| Filing Coverage | ECR Regular, Supplementary and Revised (EV-035–037; arrear return fenced, EV-043); ESI computation, with the upload only once its template is captured (F-05, §05.18) and post-cliff periods BLOCKED (§06.13); Form 138 Q1–Q3 (EV-051, EV-052); PT only for states whose slabs are gazette-verified and whose due day is captured (§06.11, §06.13). Each family enters IN_SLA only after its own PL-01 evidence (§05.8) | + Form 138 Q4 and Tax Year 2026-27 Form 130 distribution once the Q4 format is published (F-01; EV-046, EV-048); PT/LWF states as §20 V-09 verifies them | Multi-state PT/LWF near-complete |
| Corrigendum-Catch Rate | watcher tested retrospectively | ≥ 95% | 100% |

**Note on Filing Coverage, Phase 1.** The **Form 138 Q4 regular and correction formats are unpublished** (re-checked September 2026), and the missing Q4 Annexure II blocks the annual salary certificate — Form 130, which TRACES alone generates (EV-046, EV-048). So Form 130 coverage is *gated on an external event*, not on our velocity. This is why coverage is tracked separately from the integrity rate (guardrail 3, §19.1): we must not appear to "improve quality" merely because Form 130 isn't yet in the denominator. **[Verified]** the Q4 format gap and the Form 130 dependency (EV-046, EV-048).

#### 19.12.2 Growth, retention and economics targets

| Metric | Phase 0 | Phase 1 (v1) | Phase 2 |
| --- | --- | --- | --- |
| Activation Rate (→ first accepted filing) | design-partner cohort | ≥ 60% | ≥ 75% |
| Time-to-First-Filing (median) | measured | ≤ 30 days | ≤ 14 days |
| Migration Completeness (pre-first-filing) | 100% (manual) | ≥ 95% via importers | ≥ 98% |
| GRR | n/a | ≥ 85% | ≥ 90% |
| NRR | n/a | ≥ 100% | ≥ 110% |
| Band-Crossing (20–49 → 50+, 12-mo) | n/a | measured (kill-gate ≥ 25% by mo-18) | ≥ 30% |
| CAC-Payback (blended) | n/a | ≤ 12 months | ≤ 9 months |
| **AI COGS per Account** | measured on prototype (§20 V-04) | << ARPU; measured value replaces the ₹0.15–3.27 PEPM placeholder band **[Hypothesis]** (EV-008) | stable/declining as routing matures |
| **Supervised Minutes per Filing Cycle** | measured on design-partner filings | ≤ `max_supervised_minutes_per_filing_cycle` (unsized; §22.7 formula, §20 V-26) | declining as automation matures |
| AI Deflection Rate | baseline | ≥ 40% of eligible queries | ≥ 60% |
| Instrumentation coverage (events with full attribution) | 100% by the Phase-1 gate (§19.12.3; §05.17 C-27) | 100% | 100% |

#### 19.12.3 Phase gates — what each phase must prove before the next

Targets are only useful if a *gate* attaches to them. The phase gate is the minimum set that must hold before spending the next phase's money:

| Gate into… | Must have proven | If not proven |
| --- | --- | --- |
| **Phase 1** (start selling) | Instrumentation live with 100% attribution; internal test artefacts pass gate 1 and every published validator — the FVU for Form 138 (EV-052) and the EV-035/EV-040 format and severity checks for the ECR — since gates 2–4 can only be proven on live filings; corrigendum-watcher validated retrospectively (§19.9); operator submission offered only once counsel clears Part D-17 (§23); the §19.9.2 SLA wording signed off (§05.8 PL-05), and each artefact family sold under it only after its own PL-01 evidence (§05.8) | Do not onboard paying tenants — you cannot yet prove OTAF or its cost |
| **Phase 2** (expand to 200–1,999) | §05.4's v1 exit criteria, measured by this section: every v1 artefact authority-validated and submitted for ≥ 40 paying tenants across ≥ 1 full statutory cycle; On-Time Filing Rate ≥ 98% over a full quarter with every miss root-caused; Corrigendum-Catch proven on ≥ 1 real in-flight change; all four COGS lines instrumented — AI COGS per account measured at real tokens, supervised minutes per filing cycle measured against `max_supervised_minutes_per_filing_cycle`; ≥ 10 mid-year migrations with continuity intact. Separately, the SLA-sale bar: On-Time ≥ 99% + zero penalty over **≥ 2 quarters** (§19.15). The 20–49 band-crossing reading (≥ 25% by month 18) is a §05.1 kill-gate on the lower half, not a v2 gate | Fix the failing gate before expansion spend; until the SLA-sale bar holds, the compliance-SLA (§18) is not yet earned |

**[Hypothesis]** All Phase-1/Phase-2 targets. Consolidated kill/validation criteria:
- **On-time <99% or any penalty incidence >0 in Phase 1** → the compliance-SLA positioning (§18) is not yet earned; do not sell the SLA until the rate is proven over ≥2 quarters.
- **Activation <60%** → the onboarding/migration surface (§18) is under-built; re-prioritise migration before acquisition spend.
- **Band-crossing <25% by month 18** → stop acquiring 20–49; raise floor to 50 (§05 kill criterion).
- **AI COGS per account trending toward ARPU** → §20 V-04's 5×-token risk has materialised; re-point router, re-open metered-AI pricing, or move the beachhead floor up.
- **Supervised minutes per filing cycle above `max_supervised_minutes_per_filing_cycle`** → the dominant COGS line is out of bounds (EV-088); the registration cap or multi-registration line in §18 becomes mandatory and the floor is re-tested (§05.1).
- **NRR <100% in Phase 1** → value is delivered (if OTAF healthy) but not monetised/perceived; pricing/positioning problem, not product.
- **CAC-payback >12 months on 20–49** → self-serve is not converting off the price card (§18); raise the floor or fix the importer funnel before more spend.

---

### 19.13 Anti-metrics — vanity numbers banned from every dashboard and deck

§20.4 keeps a banned-numbers list to stop retracted figures from re-entering a model. This section keeps the metrics equivalent: **numbers that go up whether or not a customer got a filing done, and therefore must never headline a review or a board deck.**

| Banned as a headline metric | Why it's a vanity metric | What to use instead |
| --- | --- | --- |
| Total signups / registered accounts | Registered ≠ activated ≠ filing; §04 already shows registered-vs-contributing establishments inflate by ~3× — the same trap applies to our own funnel | Activation Rate (→ first accepted filing) |
| Payslips generated | The whole thesis is that the payslip isn't the unit of delivery; a spreadsheet generates payslips too | OTAF |
| AI messages / tokens processed | Usage is COGS, not value; more tokens can mean *worse* deflection | Deflection Rate + AI COGS per account |
| Blended "compliance %" | Hides which instrument/state is failing — exactly where penalties originate | Per-instrument on-time + RFT rates |
| Logins / DAU / MAU | Engagement without filing is not value; a well-run payroll product is used *rarely and successfully* | Filing-Cohort Retention |
| Bundled-AI "adoption" as revenue | HR AI's market price is zero (§13.1); bundled usage is not expansion | Metered-AI SKU revenue only |
| "Gross margin" computed on inference alone | **[Reversed]** the 93–99% figure: a margin on the smallest of four COGS lines, while the dominant line — supervised filing — is unsized (EV-K13, EV-088, §13) | Inference Share of Revenue + Supervised Minutes per Filing Cycle (§19.8) |
| "Filings we submitted" as a headline | Submission is attended and, where our operator acts, under the employer's written authority; liability stays with the employer (EV-K24). A submission count is not delivery | OTAF (FILED, accepted first time, right-first-time) |
| GMV / money-moved (if benefits attach ships) | §11: attach is distribution rent, not software; blending it flatters software economics | Attach revenue as a *separate, never-blended* line |
| Registered PF codes as reachable market | §04 [Killed]: 3× overstatement vs contributing establishments | Contributing-establishment denominators only |
| Cache hit rate | §13.11: a hit rate can rise while a held, storage-hour-priced cache costs over 100× the no-cache input price (§19.8.2); hits are not savings | Cache Effectiveness (net ₹ savings) |
| NRR reported without decomposition | A single NRR number throws away which engine moved (§19.6.1) | NRR + its decomposition, always together |
| Device-integration success assumed at 85–98% | §20.4 [Killed] (EV-K03): marketing from the vendor selling the fix; must be measured from our own fleet | Measured Device Integration Success Rate |

**[Killed]/[Verified]** The registered-vs-contributing and payslip-vs-filing distinctions, the HR-AI-price-is-zero fact, the attach-is-distribution-not-software finding, and the banned 85–98% device figure are all established PRD conclusions carried forward here as metric-hygiene rules (Source: PRD §04, §11, §13.1, §20).

---

### 19.14 Metric governance and confidence

Three governance rules close the section, each inherited from the document's own methodology (§02):

1. **A target is a [Hypothesis] until a cohort reports it.** Every number in §19.12 carries the optimism-bias haircut §02 mandates. When a metric graduates to [Verified] (measured over ≥2 cohorts), record the date and the measured value, exactly as §02 requires for any claim promotion.
2. **Definitions are versioned and effective-dated, like the statutory rules.** If "activated" or "on-time" is redefined, historical metrics recompute under the definition in force for the period — the same effective-dating discipline the wage engine uses (§08). A metric whose definition silently drifts is worse than no metric.
3. **The metric-integrity audit (quarterly) asks one question:** is any metric going up while customer value is flat? If OTAF rises but penalty incidence or churn also rises, the north star is being gamed and the audit halts the celebration. This is the §02 bias-check applied to our own scoreboard.

#### 19.14.1 The metric-definition register

Every metric in §19 has a registry entry with these fields, so that "on-time" or "activated" cannot silently drift:

| Field | Purpose |
| --- | --- |
| `metric_id`, `definition_version`, `effective_from` | Effective-dating (rule 2) — historical recompute under the version in force |
| `numerator`, `denominator`, `filters` | The exact computation, so two teams cannot compute it two ways |
| `source_events` | Which §19.11 events feed it — a metric with no event source is not shippable |
| `source_table` | The entity or ledger the events are modelled into (§14, §15.6.4, §05.21), so a disputed figure can be re-derived from rows |
| `target`, `target_judged_from` | The phase target (§19.12) and the point from which it is judged — a release gate or cohort age, never an undated "eventually" |
| `confidence` | [Verified] / [Hypothesis] / [Killed], per §02 |
| `kill_criterion` | For every [Hypothesis] metric-target, the condition that retires or demotes it |
| `owner`, `review_forum` | Who acts when it breaches (§19.10, §19.11.5) |

A metric proposed for a dashboard without a complete registry entry is rejected — this is how §02's provenance discipline is enforced on our own scoreboard rather than only on external claims.

#### 19.14.2 Metric confidence at time of writing

| Metric family | Confidence | Basis / what would promote it |
| --- | --- | --- |
| OTAF definition & four gates | [Verified] as a *definition* | Computed off the §08 FR-PAY-711 state machine; the *targets* remain [Hypothesis] |
| Statutory due-dates & penalty formulas | Mandatory auto-calculated EPF interest, Form 138 and Form 130 due dates and Karnataka's LWF due date [Verified] (EV-039, EV-049; r.215(1); §06.8); the 12% EPF/ESI interest rate [Verified — mirror] (S.O. 2698(E), §06.2) — pull from the primary source before customer use | EPF/ESI damages scales, the 1961-Act TDS fee, fee cap and penalty amounts (parameters in §06.5), their 2025-Act equivalents, and every other PT/LWF date [Hypothesis] — §06.13, §20 V-09 |
| 52.7× model-cost spread | [Verified] | Ratio of USD prices, survives FX (EV-007, EV-089) |
| Absolute AI COGS PEPM (₹0.15–3.27) | [Hypothesis] | Promote when §20 V-04 / V-14 instrument real tokens-per-query |
| Supervised minutes per filing cycle | Unsized | Measured from the first design-partner filings (§22 FR-OPS-010); target by the §22.7 formula, routed to §20 V-26 |
| Compliance SLA terms (§19.9.2) | [Hypothesis]; counsel-gated | Promote the wording on PL-05 sign-off; the remedy cap on §20's pricing validation (V-07, V-16) |
| All Phase-1/2 targets | [Hypothesis] | Promote per-metric when a cohort reports over ≥2 quarters |
| Band-crossing ≥25% | [Hypothesis] | Kill-gated at month 18 (§05.1) |
| CA channel as net-positive | [Hypothesis] | Gated on §20 V-05 |

#### 19.14.3 The metric catalogue — numerator, denominator, source table, target, and when it is judged

The register's first entries, one row per metric this section defines. "In-coverage" is §19.1's (IN_SLA on the due date); "Filing" is the §14.4.5 entity with its FR-PAY-711 transition log. No calendar date is set for any target, because no release date is evidenced: each target is judged from a named gate or cohort age. Every target is **[Hypothesis]** (§19.14 rule 1). §03.14's persona success measures are adopted as persona-level views of these rows, computed exactly as §03.14 defines them.

| Metric | Numerator | Denominator | Source table · events | Phase-1 target | Judged from |
| --- | --- | --- | --- | --- | --- |
| OTAF | In-coverage instances passing gates 1–4 (§19.1) | — (count per month) | Filing; coverage statement (§05.21) · `filing.*`, `coverage.versioned` | Growing month on month | First month after R1 RELEASED |
| Filing-Integrity Rate | OTAF | In-coverage instances due | As OTAF | ≥ 97% (§19.15) | First full quarter after R1 RELEASED |
| On-Time Filing Rate | In-coverage instances with `on_time(f)` (§01) | In-coverage instances due | Filing; Challan (§14.4.6) · `filing.filed` | ≥ 99% | First full quarter after R1 RELEASED — the window §05.8 V1X-03 reads |
| First-Time-Right Rate | FILED instances with no REVISED or SUPPLEMENTARY inside `rft_window_days` | FILED instances whose window has closed | Filing · `filing.revised`, `filing.supplementary`, `filing.rft_settled` | ≥ 97% | First quarter whose windows have all closed |
| Rejection Rate | Instances whose first SUBMITTED went to REJECTED, per artefact and FR-PAY-713 family | Instances submitted | Filing · `filing.submitted`, `filing.rejected` | ≤ 2% | First full quarter after R1 RELEASED |
| Correction/Revision Rate | Instances with a REVISED or SUPPLEMENTARY transition | Instances ACCEPTED or FILED | Filing · `filing.revised`, `filing.supplementary` | ≤ 3% (complement of the RFT target) | As RFT |
| Product-Caused Miss Rate | In-coverage misses with `miss_class` = product-caused | In-coverage instances due | Filing · `filing.miss_classified` | → 0% | First full quarter after R1 RELEASED; DG-2b for the 200–999 band |
| Late-Warning Share | Tenant-side blockers warned after the SS-3 point | Tenant-side blockers warned | Filing; notice records · warning-delivery events | → 0% | First full quarter after R1 RELEASED |
| Artefact Readiness Rate | Mode A and B in-coverage instances VALIDATED by `sla.artefact_ready_lead[family]` | Mode A and B in-coverage instances whose month LOCKED by the SS-3 point | Filing; PayRun (§14.4.4) · `filing.validated`, payroll-month transitions | → 100% | First full quarter after R1 RELEASED |
| Penalty Incidence | Charges on covered filings, count and ₹, with causation flag | — (count; ₹) and per tenant-month | Penalty-exposure record (AC-3) · `penalty.*` | 0 | From the first live filing |
| Filing Coverage | Instrument-states IN_SLA across the customer base | Applicable instrument-states, TENANT_SELF_FILES excluded (§05.21) | Coverage statement · `coverage.versioned` | Rising release by release (§19.12.1) | Each release gate (§05.20) |
| Pre-Filing Validation Pass Rate | Payroll months clearing every blocking validation (FR-PAY-1004) before submission | Payroll months processed | PayRun · `validation.failed`, payroll-month transitions | → 100% | First run after R1 RELEASED |
| Time-to-Correct | Median hours, REJECTED or error detected → corrected instance ACCEPTED | — | Filing · `filing.rejected`, `filing.accepted` | Minimise; no target | First full quarter |
| On-Time Margin (p10) | Hours between the authority timestamp and the deadline, 10th percentile | — | Filing · `filing.filed` | ≥ 24h | First full quarter |
| Activation Rate | Tenants reaching a first accepted filing | Tenants onboarded | Tenant; Filing · `signup`, `first_filing.accepted` | ≥ 60% | First onboarding cohort after R1 RELEASED, at cohort age of one full filing cycle |
| Activation Depth | Distinct instruments a tenant has filed at least once | — (per tenant) | Filing · `filing.filed` | Trend; no target | As activation |
| Time-to-First-Filing | Median days, signup → first accepted filing | — | Tenant; Filing · `signup`, `first_filing.accepted` | ≤ 30 days | As activation |
| Migration Completeness | Required opening-balance heads captured | Required heads | Migration / opening-balance entities (§14.4.10) · `migration.field_captured` | ≥ 95% at first filing | Each migration |
| Statutory-Registration Linkage | Tenants with PF, ESI, PT and TAN registrations captured and validated | Tenants onboarded | Registration (§14.2) · `statutory_code.linked` | → 100% | As activation |
| Payroll-Run Success Rate | As §19.9 | As §19.9 | PayRun · `payroll.run_*` | → 100% | First run after R1 RELEASED; DG-3d over two quarters |
| Statutory-Change Lead Time | Days, notification or corrigendum → rule live and effective-dated | — (per change) | Rule-version registry; pipeline log (FR-RULE-003, FR-RULE-016) · `statutory_rule.effective` | Minimise; SLA-bound | Every change from the Phase-1 gate |
| Corrigendum-Catch Rate | Amendments and corrigenda caught | Amendments and corrigenda that occurred, audited retrospectively | Pipeline log · `statutory_rule.effective` | ≥ 95% | Retrospective replay at the Phase-1 gate; first real in-flight catch (V1X-05) |
| Device Integration Success Rate | Configured terminals pushing punches | Configured terminals | Device enrolment ledger (§09) · `device.*` | Measure; no assumed figure (EV-K03) | First pilot fleet (§20 V-10) |
| Windowed Availability | Successful requests, per window | Requests, per window | Load-balancer SLI (§17 NFR-AVAIL-801) · `uptime.probe` | §17's, **[Hypothesis]** | From R1 RELEASED |
| Supervised Minutes per Filing Cycle | FR-OPS-010 minutes per registration × filing type × cycle | — | Cost ledger (§15.6.4) · `ops.*` | ≤ `max_supervised_minutes_per_filing_cycle` | First design-partner quarter (§20 V-26) |
| AI COGS PEPM | Inference and cache spend | Active employees, per tenant | Cost ledger · `ai.request` | Measured value replaces the placeholder band | From v1 instrumentation (§20 V-04, V-14) |
| Inference Share of Revenue | Inference spend per tenant | Tenant revenue | Cost ledger; invoices · `ai.request`, `invoice.issued` | Investigate above ~5% (§13.9) | From the first invoice |
| Deflection Rate | Eligible queries resolved without a human | Eligible queries | `ai.request` (`deflected`); ticket events | ≥ 40% | From v1 instrumentation |
| Abstention Rate | Abstentions routed as gaps, per use case | Eligible queries, per use case | `ai.request`; §12 abstention records | Trend; no target | From v1 instrumentation |
| Model-Mix Ratio | Inference spend by tier | Total inference spend | Cost ledger · `ai.request` | Frontier share not rising without a measured deflection lift | From v1 instrumentation |
| Instrumentation coverage | Events carrying every required field | Events emitted, per family | Event bus · all | 100% | Phase-1 gate |
| GRR | Recurring revenue retained, ex-expansion | Starting recurring revenue | Invoices (§18.13) · `subscription.*` | ≥ 85% | Month 12 of the first paying cohort |
| NRR | Retained + expansion, decomposed (§19.6.1) | Starting recurring revenue | Invoices · `subscription.*`, `seat.changed`, `module.attached` | ≥ 100% | Month 12 of the first paying cohort |
| Logo Retention | Tenants retained | Starting tenants, per band | Tenant; invoices · `subscription.churned` | Kill line 85% for 50–199 (§19.5.1) | Month 12 of the first paying cohort |
| Filing-Cohort Retention | Tenants still filing at month N | Tenants with at least one OTAF instance in month 0 | Filing; Tenant · `filing.filed` | Flattening curve (§19.5.1) | Month 12 of the first filing cohort |
| Band-Crossing Rate | 20–49 tenants crossing into 50+ within 12 months | 20–49 tenants landed | `band_history` (§05.11) · `seat.changed` | Measured; kill gate ≥ 25% | Month 18 (§05.1) |
| CAC-Payback | Months, CAC ÷ monthly revenue, before COGS until `gm_blended` is sized | — (per band, per channel) | Invoices; acquisition spend ledger | ≤ 12 months | Two quarters after R1 RELEASED |
| Claim Incidence; Remedy Cap Utilisation; Claim Dispute Share | As §19.9.2 | As §19.9.2 | SLA claim records · `sla.*` | 0; trend; trend | From the first File-tier invoice |
| Chronology Debt | Establishment-months with an unfiled Regular return older than the current month (EV-038) | — (count per establishment) | Filing; per-establishment ledger (§08 FR-PAY-712) · `filing.blocked` | 0 | From the first live wage month |
| Ledger Continuity | Establishments with an unbroken monthly ECR ledger | Establishments with an active PF code | As Chronology Debt | → 100% | First full quarter after R1 RELEASED |
| Filing-Streak Health | Active tenants with an unbroken monthly streak ≥ N months, per §19.5.3's break rule | Active tenants past their first live wage month | Filing; Tenant · `filing.filed`, NIL declarations | Trend; no target | From month 3 of the first filing cohort |
| NIL-month count | Instances recorded `NIL_DECLARED` (EV-042) | — (count) | Filing · `filing.scheduled`, NIL declaration | Trend; no target | From the first live wage month |
| Registration Activation | Registrations with at least one accepted filing | Registrations onboarded | Registration (§14.2); Filing · `filing.accepted` | → 100% | As activation |
| Coverage-Gap Instance Share | Instances attached to open register entries | Attached + in-coverage instances due | Coverage-gap register (§19.3.9) · `coverage.versioned`, `filing.blocked` | ↓; always shown beside Filing-Integrity | Every release gate |
| Coverage-Gap Ageing (p50, p90) | `aged_days` across open entries | — | Coverage-gap register | Trend; escalation above `gap_age_escalation_days` | Monthly from the Phase-1 gate |
| Unstated-Blocker Count | Open entries with no `unblock_condition` or an unresolvable `blocker_ref` | Open entries | Coverage-gap register; §05 fence and hold registers | 0 | Monthly from the Phase-1 gate |
| Pending Authority Evidence | Submitted instances with no `authority_ts_utc` past `authority_ts_capture_sla_days` | Instances submitted | Filing · `filing.submitted`, `filing.filed` | → 0 | First full quarter after R1 RELEASED |
| Restatement Rate | Metric-periods restated | Metric-periods published, per family | Metrics warehouse run versions (§19.11.6) | ↓; a rise means the watermark, not the note | From the first published period |
| Quarantine count | Instances quarantined under AC-16, EC-06 or EC-21 | — (count, published beside the metrics they would have joined) | Filing; metrics warehouse | 0 | From R1 RELEASED |
| Erasure-Affected Share | Metric-periods whose erasable sources have since been erased | Metric-periods published for that metric | Metrics warehouse; erasure log (§14.7) | Trend; no target | From the first erasure |
| Unmetered Session Share | Sessions whose metered minutes fall short of the session span beyond tolerance | Sessions logged | §22 session log; cost ledger (§15.6.4) · `ops.*` | 0 | First design-partner quarter |
| Unallocated Minutes Share | Chargeable minutes resolving to no instance and no gap entry | Chargeable minutes | Cost ledger · `ops.*` | 0 | First design-partner quarter |
| Revenue per Supervised Instance | Tenant monthly platform fee | Supervised filing instances for the tenant that month (§22.7's counting rule) | Invoices; cost ledger · `ops.*`, `invoice.issued` | Trend per tenant profile; the target is §13.19's minutes target, not this ratio | First design-partner quarter |
| Bundle Completeness Rate | Claims whose evidence bundle carried every applicable item at C1 | Claims opened | SLA claim records · `sla.claim_opened` | 100% | From the first claim |
| Cache Effectiveness | Cache-read savings less write premium and storage-hours, in ₹ | Inference spend for the same tenant and period | Cost ledger · `ai.cache_event` | Net positive or the cache is off (§19.8.2) | From v1 instrumentation |
| Budget-Cap Incidents | Per-tenant or per-user budget caps hit | Tenant-months | Cost ledger · `ai.budget_cap_hit` | Track and alert | From v1 instrumentation |
| Cost per Recruiting Action | Inference and external cost on recruiting actions | Requisitions or hires, never employees (§19.8.6) | Cost ledger · `ai.request` with `task_class = A4` | Metered, per action | From the first metered recruiting SKU |
| Chargeable-Message Share | Outbound WhatsApp messages marked chargeable | Outbound WhatsApp messages sent | Message records; cost ledger (§13.21) · `wa.message.sent` | ↓; no committed figure | From the first WhatsApp message |
| Free-Window Delivery Share | Messages delivered inside an open service or Free Entry Point window | Outbound messages sent, per flow | As above | ↑; no committed figure | From the first WhatsApp message |
| WhatsApp Cost per Tenant-Month | Chargeable messages at their rate row plus BSP markup | Tenant-months | Cost ledger, WhatsApp line · `wa.message.sent` | Low–high range only, until §20 V-12 (AC-48) | From the first WhatsApp message |
| Category-Mismatch Rate | Messages whose assigned category differs from the intended one | Messages sent carrying a category | Message records | 0 | From the first WhatsApp message |
| Fallback-Channel Share; Unattributed-Message Share | Messages delivered on a flow's fallback channel; messages with no record or no window state | Messages the flow attempted; outbound messages sent | Notice records; message records | Trend (delivery risk); 0 (AC-47) | From the first WhatsApp message |
| Change Requests per State (`E_s`); Hours per Change Request (`h`); Review Multiplier (`r_review`) | As §19.8.7 | As §19.8.7 | Pipeline log (FR-RULE-003) · `statutory_rule.effective` | Measured, not estimated (AC-49); they size §22.9's formula | From the pipeline's first month |
| Curation Cost per State Maintained; Curation Cost per Tenant | As §19.8.7 | As §19.8.7 | Cost ledger, curation line; Registration (§14.2) | Published per state; per tenant only once `cost_per_state_per_year` is sized (§22.9) | From the first period with a sized cost term |
| Tenants per State; State Coverage Concentration | Tenants with a registration in the state; tenants in the most-tenanted state | States maintained; tenants with at least one state registration | Registration (§14.2) | Shape, published from month one | From the first live wage month |

#### 19.14.4 The gaming attack surface — how each headline number could be inflated

§19.13 bans metrics that rise without customer value. This subsection is its complement and the harder
half: the metrics we *keep* are the ones worth gaming, and a metric with no structural control is a
metric that will eventually be managed rather than measured. Each row names the move, the control that
makes it structurally hard rather than culturally discouraged, and the query that detects it if the
control is bypassed. The quarterly metric-integrity audit (§19.14 rule 3) runs the detections.

| Metric | The move | Structural control | Detection |
| --- | --- | --- | --- |
| OTAF | Narrow coverage so only easy instances are in scope | Filing Coverage is guardrail 3 and the coverage-gap register attaches every excluded instance (AC-21) | Coverage-gap instance share rising while OTAF rises |
| OTAF | Loosen `rft_window_days` so late corrections stop disqualifying instances | The window is a versioned register definition; a change restates every affected period (§19.11.6 LA-5 shape) | Any change to `rft_window_days` shows as a restatement with a before/after OTAF |
| On-Time Filing Rate | Re-attribute misses to tenants or authorities | AC-8: the raw rate counts every miss whatever its class; only the SLA measures set classes aside | Product-caused share falling while raw on-time is flat |
| On-Time Filing Rate | Judge on our own timestamp rather than the authority's | Gate 2 reads `authority_ts_utc`, and a missing one is a miss (§19.11.6) | Pending Authority Evidence count rising |
| Rejection Rate | Withdraw and resubmit rather than record a rejection | `attempt_no` is monotonic and the first attempt is the one the denominator reads; a withdrawal is still an attempt | Attempts per instance rising while rejections fall |
| Correction Rate | File a Supplementary as a "new instance" | EC-05: a Supplementary is a correction route on the existing instance, never a new instance | Instance counts rising faster than obligations |
| Product-Caused Miss Rate | Leave misses unclassified | AC-7: an unclassified miss counts product-caused once the next instance of the family falls due | Classification latency rising |
| Activation Rate | Count artefact generation, or the easiest single filing | AC-25 reads `filing.accepted`; Activation Depth and Registration Activation sit beside the rate (§19.4.2) | Depth flat at 1.0 while activation rises |
| Filing-Cohort Retention | Move survivors between bands as they grow | Band frozen at cohort entry (§19.5.3) | 20–49 cohort size shrinking mid-cohort |
| Migration Completeness | Mark optional heads captured and skip blocking ones | AC-27 blocks the first filing on the blocking subset, so the metric cannot be satisfied by the easy heads | Blocked-first-filing count against completeness |
| Supervised Minutes | Under-report minutes, or park them under preparation | Cross-check against the §22 session log; Unmetered Session Share published; the series is never per operator (AC-36) | Unmetered session share rising, or prep-to-session ratio drifting |
| AI COGS per Account | Move spend into an unattributed bucket | AC of §19.11.3: attribution completeness is itself a metric with a 100% target | Attribution completeness below 100% |
| Deflection Rate | Count abstentions or hand-offs as deflections | Abstention Rate is reported beside deflection, per use case (§19.8) | Deflection and abstention rising together |
| NRR | Report the headline without decomposition | §19.6.1's rule: never reported without it; AC-31 reconciles it to invoices | A decomposition that does not reconcile |
| Penalty Incidence | Record a penalty as a goodwill credit instead | The event is `penalty.incurred`, keyed to the authority's charge, not to our accounting treatment | Credits issued without a matching penalty event |
| Coverage-Gap Register | Let entries age quietly | Ageing is published; Unstated-Blocker Count targets 0; AC-22 surfaces entries whose blocker has closed | p90 ageing rising |
| WhatsApp Cost per Tenant-Month | Quote the low bound of the range as the figure | AC-48: the range and its RANGE status render together, and a point figure fails review | A WhatsApp rupee figure appearing anywhere without its upper bound |
| Curation Cost per Tenant | Allocate a cost term nobody has measured, so the per-tenant number looks small | AC-49: `E_s`, `h` and `r_review` come from the pipeline log, and an unmeasured term is named in the figure | A curation figure whose named terms are not in the pipeline log |
| Any four-line COGS view | Publish a total or a margin while three lines are unsized | AC-50: no total renders while a line is NOT_SIZED or RANGE (§13.21) | A total or a margin appearing on the per-tenant cost board |

- **AC-45** Every metric in the register names the gaming move it is exposed to and the control that
  answers it; a metric with a target and no named control is rejected at review. This is the same
  discipline §02 applies to external claims, turned inward.
- **AC-46** The quarterly audit runs every detection query above and publishes the results, including
  the null results. An audit that reports only what it found cannot be distinguished from an audit
  that did not run.

**The one-sentence test.** For every headline number, ask: *could this move without a single tenant's
filing being any more likely to land on time?* If the answer is yes and no control in the table
prevents it, the metric is not ready for a board deck — and §19.13's ban list is where it goes if the
answer stays yes after the control is designed.

---

### 19.15 The one measurement that validates the thesis

Everything above serves a single falsifiable claim. **The one measurement that validates the entire product thesis:** sustained **On-Time Filing Rate ≥ 99% with zero penalty incidence across ≥2 quarters** on real beachhead tenants, with the **Filing-Integrity Rate (RFT-inclusive) ≥ 97%** over the same window so that "on-time" is not being bought with silent corrections.

Until that number exists, "the filing is the unit of delivery" is the most important [Hypothesis] in this document — and every other metric here is instrumentation in service of proving or killing it. Concretely, the thesis is **confirmed** when:

- On-Time ≥ 99% **and** Penalty Incidence = 0 **and** RFT ≥ 97%, each for ≥ 2 consecutive quarters, on at least `thesis_min_cohort_tenants` real paying tenants (a named parameter — no value is set here; routed to §20, and never below §05.4's v1 exit cohort of 40); **and**
- Filing-Cohort Retention flattens with tenure (§19.5.1), evidencing that delivery creates switching cost; **and**
- AI COGS per account, measured at real tokens (not the §13 estimate), stays << ARPU under the FX base case (₹94.43, Gemini 3.x Flash 2× — EV-089); **and** supervised minutes per filing cycle, the dominant COGS line, hold at or below `max_supervised_minutes_per_filing_cycle` (EV-088).

And the thesis is **killed or downgraded** if, after 2 quarters of live filing:
- On-Time cannot hold 99% or any penalty incidence recurs → the compliance-SLA (§18) is unsellable and the differentiation-vs-Zoho/Tally case (§18) collapses to parity; **or**
- OTAF is healthy but NRR < 100% and retention does not flatten → filings are a delivery unit but not a moat, and the business case must be rebuilt on a different retention mechanism; **or**
- AI COGS at real tokens trends toward ARPU (§20 V-04 5× risk) → free-bundling breaks and the beachhead floor moves up; **or**
- supervised minutes per registration cannot be held to the target → the attended-filing delivery model is a services business at this price, and §18's registration line and §05's floor are re-opened.

This is the §02 bias-check applied to the whole product: the scoreboard is designed so that the thesis can *lose*. A metrics section that cannot report the product's own failure is the vanity trap §19.13 exists to prevent.
