## 05. Scope Decision, Non-Committal Bands & Phasing

The brief asked for one product spanning SMB, mid-market and enterprise, with the full module suite, shipping AI-first. The evidence in §01–§04 does not support that as a launch shape: computation is given away free by the freemium tier (EV-029) and the priced floor sits near ₹50 PEPM (EV-027; §04), enterprise procurement is arithmetically closed for roughly three years on the private path and 42–48 months on the public path (§05.2), and the maintained statutory layer is a multi-year compliance-engineering effort (§13). **[Reversed]** Earlier drafts framed that effort as catching up to "statutory parity with a free Frappe v16 and a zero-incremental Tally"; the source code and product documentation say otherwise — Frappe v16 ships no Indian statutory artefact at all, and Tally ships the forms but no state PT slab table and no LWF engine (EV-031, EV-032; §21). The effort is real; it is greenfield, not parity-chasing. This section converts those constraints into a **committed scope for v1, a set of explicitly declined bands, and a phased roadmap with entry/exit gates** so that "all three segments" survives as vision without misrepresenting what ships when.

The organising principle is the same one that runs through the whole document: **the statutory filing, not the payslip, is the unit of delivery.** Every band decision below is really a decision about *which filings we can deliver — a portal-accepted artefact plus attended, assisted submission under the employer's written authority to act (§22) — for whom, with a maintained-compliance SLA behind them.* The employer's and deductor's statutory liability stays non-delegable whatever we do; no vendor in the six-vendor set claims to submit anything at all (EV-030). That is what phases the roadmap — not feature count, and not the AI layer, which is cost-of-goods across every phase (§13).

This has a concrete, testable consequence for how scope is drawn. A band is "in" only when we can name (a) the exact filing artefacts that band is obliged to produce, (b) the authority each is filed with and its acceptance mechanism (every statutory surface is an attended portal — EPFO's interactive login, the employer-run FVU for TDS returns, ESIC's template upload, one portal per PT state; EV-035–038, EV-052), and (c) a maintained-compliance SLA we can actually stand behind for those artefacts. A band is "out" when any of the three is missing — not when it is small, not when it is unprofitable in isolation, and not when a competitor is entrenched. Size and competition change the *verdict* (commit / acquisition / defer); the *ability to name the filings* changes whether the band is even eligible to be in scope. Keeping those two axes separate is what stops the roadmap from drifting back into a feature-count plan.

**How to read this section.** §05.1–§05.16 make the scope decision and argue it: which bands, which phases, which modules in which order, and the evidence behind each. §05.17–§05.24 turn that decision into a build and release specification a team can execute: the closed R1 capability list and the rules that keep "P0" honest (§05.17), the fence register (§05.18), the work-package build order (§05.19), the release gates (§05.20), tenant admission and the per-tenant coverage statement (§05.21), deferred artefacts and parameter holds (§05.22), scope change control (§05.23) and the section's test scenarios (§05.24). §05.25 states the commitment in one paragraph. Where a figure or rule belongs to another section, this one cites it and does not restate it.

<!-- DIAGRAM: scope-phasing-roadmap -->

---

### 05.1 The commit/decline table, by headcount band

This restates and extends the scope table in the PRD's front matter, adding the *obligation profile* that turns on at each band (from §06), the *free-tier exposure* (from §04), and an explicit verdict with a one-line reason. The verdict column is the contract: **Commit** means v1 revenue depends on it; **Acquisition** means we serve it free as a funnel and never model revenue from it; **Expansion** means it is reachable from the beachhead on the same product shape in a later phase; **Decline / Defer** means we deliberately do not build for it now and record why.

<!-- DIAGRAM: commit-decline-bands -->

| Band (headcount) | Statutory obligations that are live | Free/near-free alternative already serving it | ACV realism | Verdict | One-line reason |
| --- | --- | --- | --- | --- | --- |
| **1–9** | TDS on salary u/s 392 (ex-s.192 — EV-050), S&E registration, minimum wages, wage slip, POSH (every employer constitutes an Internal Committee, s.4(1); the ten-worker line in s.6(1) is the Local Committee route, not an exemption — EV-056) | Kredily (free, unlimited, real PF/ESI/PT/TDS calc — computation free, outputs paid, EV-029); Zoho Payroll ₹0 to 10 emp; Zoho People ₹0 to 5 users | ~₹0 marginal | **Decline commercially** | Marginal price is zero and three credible vendors set it there. A paid-only product is dead on arrival here. |
| **10–19** | + ESI (ten or more *persons*; twenty for central-sphere-extended establishments such as insurance and NBFCs — r1/06), gratuity accrual and maternity benefit (their ten-employee test latches: "employed, or were employed, on any day of the preceding twelve months" — CoSS First Schedule); prescribed-format appointment letter once the establishment has 10 or more *workers* (OSH Code s.6(1)(f), state-prescribed form — EV-057) | Same free tiers; Frappe HR free self-host (gross-to-net only — no Indian statutory artefact, EV-031) | ₹18,000–30,000/yr | **Acquisition only** | Real obligation exists, but ACV is a funnel number, not a revenue line. Serve free; convert on crossing 20. |
| **20–49** | + **EPF** (EV-057), Grievance Redressal Committee (20 or more *workers*, IR Code s.4 — EV-057) | Zoho Payroll ₹1,000/mo (25 incl.), HivePayroll ₹1,499 (25), RazorpayX ₹2,499 (20), Kredily free; the six EV-027 vendors (Qandle, greytHR, Pocket HRMS, Zimyo, HROne, Keka) each bill a 50-employee minimum block (EV-026) | ₹24,000–60,000/yr | **Beachhead — lower half** | EPF turns on at 20. Computation is free (EV-029), seats are over-billed by all six EV-027 vendors (EV-026), and no vendor in that set claims to submit a filing (EV-030). Wedge on quality-of-delivery. |
| **50–199** | + crèche (50), contract-labour regime (50+), canteen (100 workers) (EV-057); a works committee at 100+ workers only where the appropriate Government orders one — not automatic (IR Code; r3/04); PT/LWF multi-state complexity rises with distribution | greytHR, Keka, Zoho Payroll paid, factoHR, Kredily paid | ₹90,000–4,00,000/yr | **Beachhead — revenue core** | This is where obligation, budget (₹3,000–15,000/mo bureau line) and dissatisfaction overlap. Carries the revenue. |
| **200–999** | + retrenchment/closure approval and standing orders at 300 (EV-057); multi-state, multi-establishment, contractor compliance | Keka, greytHR, PeopleStrong, Darwinbox lower tiers | ₹4,00,000–25,00,000/yr | **Expansion (v2)** | Reachable from the beachhead on the same product shape. Private-sector only at first. Same filings, more scale + config. |
| **1,000–1,999** | + full multi-establishment, group entities, complex CTC structures | Darwinbox, PeopleStrong, Ramco, ZingHR, Keka enterprise | ₹25,00,000+/yr | **Expansion (late v2)** | Same shape, but demands SSO/SCIM, deeper integrations, and a support org we will not have until v2 is proven. |
| **2,000+** | + procurement-driven security/residency gates, works-council-scale IR, PSU/BFSI RFP norms | Darwinbox, PeopleStrong, Oracle, SAP SF, Ramco | ₹50,00,000+/yr | **Defer, documentary entry gate** | Different pricing shape, channel, competitive set and assistant strategy. The gate is certification + references, not code. See §05.3. |

**Reconciliation with the PRD front-matter bands (so this reads as refinement, not contradiction).** The PRD's scope table uses five coarse bands (<10, 10–20, 20–200, 200–2,000, 2,000+); this section refines them into seven (1–9, 10–19, 20–49, 50–199, 200–999, 1,000–1,999, 2,000+). The verdicts are **identical** where the bands align — <10/1–9 decline, 10–20/10–19 acquisition, 20–200 beachhead, 200–2,000 expansion, 2,000+ defer. The refinements are two, and each has a reason the PRD itself supplies: the beachhead's 20–200 splits into a funnel half (20–49) and a revenue half (50–199) because the PRD commits "50–200 carrying revenue" (§01); and the PRD's 200–2,000 "Expansion" splits at 1,000 because SSO/SCIM and a support org — *not new filings* — separate the two (§05.4). No PRD verdict is changed; the finer grain exists because the sales motion and unit economics differ across the splits (§05.1), which a five-band table cannot express.

Notes on the band boundaries, which are **statutory, not marketing**:

- The 20 boundary is the single most important line in the product because **EPF is the one monthly filing that is absent below 20 for almost every beachhead establishment** (§06). It is not the only obligation that starts there — the Grievance Redressal Committee starts at 20 *workers* but files nothing, and ESI starts at 20 rather than 10 only for central-sphere-extended establishments such as insurance and NBFCs (EV-057; r1/06) — but it is the one that changes the monthly filing load. Below it, the customer can rationally rely on a CA (on Tally or otherwise — how many firms run Tally *payroll*, as distinct from Tally accounting, is unknown; §20 V-02); at 20 the compliance surface jumps discontinuously and a spreadsheet stops being safe. That discontinuity is the wedge. (Source: EV-057, EPF at 20 with the scheduled-employments limitation removed; Scheme position in §06.2.)
- The 10 boundary latches for gratuity and maternity benefit: their applicability text reads "ten or more employees are employed, or were employed, on any day of the preceding twelve months," so a firm that touched 10 once carries both even after shrinking (§06). ESI's text is different — "every establishment in which ten or more persons are employed" — with no twelve-month look-back, so whether and when ESI coverage continues after shrinkage is a separate rule this PRD has not verified: it is the named parameter `esi_continuance_rule`, routed to §20, and the engine never switches ESI off on a headcount dip without an operator decision. This is why 10–19 is worth acquisition attention — the obligation is stickier than the headcount. (Source: Code on Social Security 2020 First Schedule, Chapters IV, V and VI, verified against the gazette text — r1/06.)
- The 300 boundary (retrenchment/closure approval, raised from 100 to 300, and standing orders at 300 — EV-057) is why 200–999 is a *different sale*, not just a bigger one: industrial-relations and contractor-compliance surface area appears that the beachhead never sees. (Source: EV-057; Industrial Relations Code 2020, Chapter X.)
- The 50 boundary carries two obligations at once — a crèche (CoSS maternity chapter at 50 or more employees; OSH Code s.24 where more than 50 workers are employed — r3/04) and the contract-labour threshold raised to 50 under the OSH Code (from 20 under the 1970 Act) (EV-057). A 50–199 employer with contract labour therefore has a *principal-employer* compliance surface (contractor licensing, the OSH r.98(8) wage guarantee — r5/04, PF/ESI assurance for contract workers under counsel review — §23) that the product's data model must represent even if v1 does not fully file for it. (Source: EV-057; r3/04; r5/04. **[Hypothesis]** on whether beachhead tenants with contract labour are common enough to prioritise the principal-employer surface in v1 — kill/validate via §20 buyer interviews: if <15% of 50–199 tenants report contract labour, keep it a P2 data-model-only capability.)

**[Verified — central sphere]** Band obligation thresholds (1/10/20/50/100/300) are the notified central-sphere thresholds under the four Labour Codes and their 8 May 2026 Central Rules (EV-057). Two qualifiers travel with every threshold in this table: the **counting unit** differs by obligation (the Grievance Redressal Committee and the appointment-letter "establishment" count *workers*, not employees), and several obligations are **state-sphere** (state rules prescribe the forms and may differ) — both are schema fields, not prose (EV-057, §06.1). "Headcount" in this section is shorthand for the obligation's own counting unit. **[Verified]** Free-tier prices are vendor pricing pages (Source: Kredily, Zoho Payroll, Zoho People, HivePayroll, RazorpayX pricing pages, captured September 2026 — pages read, products not executed; r2/01, r2/05). **[Hypothesis]** ACV ranges are modelled from list PEPM × band midpoint and carry the §04 caveat that no realised ARPU exists yet — kill/validate via the §20 quote programme (V-01, V-03): if realised ARPU lands 30–40% below list, every ACV cell here compresses and the 20–49 verdict in particular must be re-tested against unit economics.

#### How the ACV cells are derived (so they can be attacked)

Each ACV band is `PEPM × band-midpoint headcount × 12`, using the ₹80–150 PEPM planning anchor **[Hypothesis]** — *not* a validated level and *not* a single-figure ceiling. The evidence supports a two-anchor structure, and the planning anchor sits inside its upper band: a **value floor near ₹50 PEPM** (Qandle ₹49.00 annual, greytHR ₹49.90 at 50 employees) and a **mid-market clearing band of ₹80–200** (Zimyo ₹80.00, HROne ₹99.00, Keka ₹139.98 at its live floor or ₹199.98 on the archived card) (EV-027; §18). Worked, for transparency:

| Band | Midpoint | PEPM low–high | Annual low–high | Note |
| --- | --- | --- | --- | --- |
| 10–19 | 15 | ₹80–150 | ₹14,400–27,000 | Rounded to ₹18k–30k in the table; funnel-only, never modelled as revenue |
| 20–49 | 35 | ₹80–150 | ₹33,600–63,000 | Rounded to ₹24k–60k allowing for aggressive land discounting at the floor |
| 50–199 | 125 | ₹80–150, tapering | ₹1,20,000–2,25,000 | Table shows ₹90k–4L: low end is a 50-seat land at ₹150 (50 × 150 × 12 = ₹90,000); high end is a 199-seat account toward the top of the ₹80–200 clearing band (199 × ₹150 × 12 = ₹3,58,200; at ₹200, ₹4,77,600) |
| 200–999 | 600 | ₹60–120 (taper) | ₹4,32,000–8,64,000 | The ₹60–120 taper is a planning assumption, not an observed price. Table's ₹25L ceiling is a ~999-seat account at the ₹200 top of the clearing band (999 × 200 × 12 ≈ ₹24L), not a taper case |

The 10–19 cell is independently corroborated from the competitor side: because the six EV-027 vendors each bill a 50-employee minimum block, greytHR at 20 employees works out to ₹124.75 PEPM = ₹29,940 ACV — and a 10–19 firm pays the same block price — inside the ₹18k–30k band (EV-026, EV-027). The single most consequential input is still the PEPM anchor. Its list-price support is the EV-027 table; its realised-revenue support is only **two** filed data points — ₹52 (greytHR, SMB) and ₹126 (PeopleStrong, enterprise) — both biased downward because platform users exceed billed seats (§04). Realised-versus-list is unmeasured (§20 V-03), and every ACV cell in this section inherits that fragility. **[Hypothesis]** Kill criterion: if §20 V-01 finds a CA/bureau runs monthly payroll for 50 people under ₹2,000/month (i.e. under ~₹40 PEPM), the entire ACV table halves and the 20–49 band moves from "beachhead — lower half" to "acquisition only."

#### Why the beachhead is split into two halves

The PRD commits 20–200 with "50–200 carrying revenue." This section makes that split operational because **the two halves have different economics and different sales motions**, and treating them as one band produces a plan that under-serves both:

| | 20–49 (lower half) | 50–199 (revenue core) |
| --- | --- | --- |
| Primary buyer | Founder / office manager, often the same person who talks to the CA | Dedicated HR/finance lead; CA may be retained in parallel |
| Decision trigger | Crossed 20, EPF just turned on, spreadsheet now unsafe | Bureau cost is a visible line item; audit/scale pain |
| Free-tier pressure | Extreme — Kredily free, Zoho ₹1,000 for 25; the six EV-027 vendors each bill a 50-employee minimum (EV-026) | Moderate — free tiers thin out; filing SLA becomes buyable |
| Sale motion | Self-serve + published price card (§18) | Self-serve *or* light-touch, CA-referred |
| Role in the model | **Funnel + land** — low ACV, high volume, converts upward | **Revenue** — carries CAC payback and absorbs the supervised-filing cost line (EV-088) |
| Churn risk | Grows into the core, or churns to free if we over-price | Implementation friction (§16); mid-year cutover |
| Filing complexity | Single-state common; EPF + ESI + one PT + TDS | Multi-state PT/LWF, crèche/works-committee, contractor surface |

**[Hypothesis]** The 20–49 half is net-negative on unit economics at list PEPM and is justified only as a land-and-expand funnel into 50–199. Kill criterion: if cohort analysis at month 18 shows <25% of 20–49 lands crossing into 50+ within 12 months, stop acquiring the lower half and raise the commercial floor to 50 (this is also the pre-agreed response if Zoho widens its free gate — see risk register, §20).

A worked payback sketch, to make the "net-negative unless it expands" claim concrete rather than rhetorical. Take a 20–49 land at 35 seats × ₹100 PEPM = ₹3,500/month = ₹42,000/year gross. Inference is the *smallest* of the four cost-of-goods lines (EV-088); at §13's ₹0.15–3.27 per employee-month it would be ≤₹1,400/year here — but those absolutes are placeholders, and only the 52.7× model-choice spread survives as evidence (EV-089). **[Reversed]** Earlier drafts treated inference as the cost that mattered and bundling it as margin-safe by construction; that claim is withdrawn. The dominant line is **supervised filing**, which scales per registration × state × filing type, not per seat, and is unsized; **compliance curation** scales per state maintained (EV-088). A 35-seat tenant and a 150-seat tenant with the same registration footprint therefore consume roughly the same supervised-filing effort — which is exactly why the small band only works as a funnel: the same per-registration cost amortises acceptably over a 150-seat account and badly over a 35-seat one. **[Hypothesis]** Kill/validate: instrument supervised minutes per filing cycle per registration, and support minutes per tenant, from the first 20 tenants (§19, §22); if 20–49 tenants consume >2× the support-minutes-per-rupee of 50–199 tenants and do not expand, the funnel thesis fails and the floor moves to 50.

The parallel sketch for the revenue core makes the contrast the whole model rests on concrete. A 50–199 land at 125 seats × ₹100 PEPM = ₹12,500/month = ₹1,50,000/year gross — 3.6× the 35-seat land's revenue. Inference scales with seats but stays the smallest line (EV-088). If both tenants hold one registration in one state, the supervised-filing and curation cost is roughly the same block for both, so contribution rises close to linearly with seats once that block is covered — the entire argument for splitting the beachhead. The argument **inverts when registrations multiply faster than seats**: a 60-person tenant across three states and two legal entities pays less than a 150-person single-registration tenant and costs several times more to serve, because revenue is per employee and the dominant cost is per registration (EV-088; worked in §13; the registration cap or multi-registration line is §18's). The block itself is **unsized** and must not be given a figure here: it is the named parameter `supervised_cost_per_registration_cycle` (supervised minutes per filing cycle × loaded operator cost — §22 defines the operation, §13 the cost model), routed to §20 for measurement. **[Hypothesis]** Kill/validate: once measured on the first 20 tenants, if the per-registration block makes a single-registration 50-seat land contribution-negative at the ₹80–150 anchor, the commercial floor moves up and the registration line in §18 becomes mandatory rather than optional.

---

### 05.2 Why enterprise cannot be a launch segment

This is the sharpest scope cut in the document, and it was tested against real tenders rather than assumed. The conclusion: **enterprise (2,000+) is foreclosed to a new entrant for roughly three years on the private path and 42–48 months on the public path, and the lock is arithmetic, not eligibility** (r2/06 recomputed the public path from Indian Bank's criteria and revised it up from 36 months; its own private-path estimate of 18–30 months rests on the absence of evidence and is low-confidence — this section plans against the reference gate instead). Four independent gates each independently exclude a month-zero company; they compound.

<!-- DIAGRAM: enterprise-gate-compounding -->

#### Gate 1 — Prior-implementation scale you cannot fabricate

**[Verified]** SBI's HRMS RFP, Criterion 7, requires a prior HRMS implementation at an Indian institution of **minimum 30,000 employees** within the last five years (Source: SBI RFP SBI/GITC/HRMS/2022/2023/952 dated 23 February 2023, re-extracted — r2/06). This is outside the startup-relaxed range, which covers only Sl. No. 3 to 5. A new entrant has zero implementations, let alone one at 30,000 seats. The harder lock is the Appendix-T scoring matrix: 150 marks with a 75% shortlisting cut-off (112.5), of which 90 marks are gated on 30,000+-employee references — a bidder with none scores at most 60/150 (40%), and one with 10,000–29,999-employee experience at most 75/150 (50%). The RFP is three and a half years old and evidences SBI's drafting posture, not a live opportunity. The distinction matters: eligibility is a gate you can occasionally get exempted past (Gate 2); a *scoring* matrix is not exempted, it is merely scored, and a zero-reference bidder scores near zero on the largest-weighted criteria even when technically compliant.

#### Gate 2 — The startup exemption is a buyer's permission, not a bidder's entitlement

**[Verified]** GFR 2017 Rule 173(i) exempts DPIIT-recognised startups from prior-experience and turnover criteria, and Rule 170(i) from EMD — **but only if the buyer writes the exemption into the bidding document** (Source: GFR 2017, Rules 170(i), 173(i)). This is the pivotal legal fact of the segment: the exemption exists but is discretionary. Of the four procurements examined, two wrote a meaningful relaxation in (SBI; Indian Bank) and two did not (ICSIL exempted only EMD and tender fee; Assam AAAS wrote none) — a sample far too small to plan against (r2/06). Even where it is written in, it does not remove every floor: Indian Bank's HRMS RFP (GEM/2026/B/7690596, dated 20 June 2026) relaxes turnover and net worth for startups yet leaves a **three-year floor in two independent places** — Criterion 1's relaxation cuts years in operation from five to three rather than to zero, and Criterion 8, which carries no relaxation at all, requires three years' HRMS experience, two live solutions and a purchase order more than three years old (Source: Indian Bank HRMS RFP, re-extracted — r2/06). The correct read: the exemption is real but uncontrollable — we cannot compel a buyer to write it in, so we cannot plan a pipeline on it. It is upside on individual tenders, never a segment strategy.

#### Gate 3 — Certification carries a seasoning clock on top of acquisition time

**[Verified]** Indian Bank requires ISO 27001:2022 (or CMMI L3 / ISO 20000 / ISO 9001) to have been **held for at least one year prior to RFP publication** (Source: Indian Bank HRMS RFP, June 2026). Acquiring the certificate the month before a bid is worthless. ISO 27001 acquisition itself typically takes 3–6 months (**[Hypothesis]** — every source for this is a compliance consultancy selling the service; r2/06). So the earliest a month-zero company can *satisfy* an ISO-with-seasoning clause is roughly month 18: 6 months to acquire + 12 months to season. This is the one gate whose clock cannot be compressed with money — you cannot buy a certificate that was "held for a year" retroactively — which is exactly why the month-zero action in §05.2 (start ISO 27001 now) exists.

<!-- DIAGRAM: certification-seasoning-timeline -->

#### Gate 4 — Sectoral residency and audit obligations foreclose the naive AI architecture

**[Verified — mirror]** RBI's Outsourcing of IT Services Directions (effective 1 October 2023) carry data localisation, a right to audit including by RBI, sub-contractor consent (para 16(r)) and regulator inspection (para 16(o)). They bind the regulated entity and reach us through its contract, and they are **materiality-gated — determined entity by entity, not turnover-gated** (EV-087; mirror-sourced — pull from the primary source before customer use). **[Reversed]** Earlier drafts said these obligations fall "directly on any SaaS vendor … with no turnover threshold"; both halves were wrong, and whether a given arrangement is material is a counsel question (§23). **[Verified]** SEBI's cloud framework requires data to reside and be processed in India and, via FAQ Q47/Q50, applies the MeitY-empanelled-infrastructure rule to SaaS providers; Principle 7(x) lists exactly 20 mandatory contract terms (EV-085). **[Verified]** IRDAI's 2023 cyber guidelines impose **no** localisation; IRDAI localisation exists only for policy records, and its outsourcing definition captures managed payroll but not a self-service licence (EV-086) — **[Reversed]** the earlier "IRDAI mandates records in Indian data centres" overstated this. SBI's RFP requires data functions and processing "within the boundaries of India" on a dedicated instance (Source: SBI HRMS RFP of February 2023 — r2/06). India neither "mandates localisation" nor "has no localisation requirement": the live constraints are these sectoral rules, CERT-In's 180 days of ICT logs within India (EV-062) and SPDI r.7's restriction on cross-border transfer of sensitive data (EV-060). Silently adding an LLM vendor can put a bank customer in breach of its own obligations (EV-087), which is why AI defaults off for RBI/SEBI/IRDAI tenants (§12). An AI-first product must therefore run in-country inference with a residency-selectable provider matrix (§13) before it can even bid — which is exactly why that abstraction is P0 (§13), but it is not a month-zero deliverable. The subtlety §13 flags: data-at-rest residency and in-country *inference* are two different guarantees and regulated buyers ask about both; a provider that gives one without the other does not clear the gate.

#### The compounding math

| Gate | Earliest a new entrant can clear it | Binding because |
| --- | --- | --- |
| Prior 30k-seat implementation | Not before we have a 200–999 install base with a large reference | Cannot be bought or exempted; scoring is incumbency-weighted |
| Startup exemption invoked | Depends entirely on buyer discretion — uncontrollable | We cannot make a buyer write it in |
| ISO 27001 with 1-yr seasoning | ~Month 18 (6 acquire + 12 season) | Clock cannot be compressed at any price |
| Sectoral residency + audit (RBI, SEBI, IRDAI) | ~Month 12–18 (provider matrix + audited processes) | Contractual flow-down; RBI's is materiality-gated per customer entity (EV-087), so there is no threshold to stay under |
| Public-sector three-year floors (Indian Bank-class Criteria 1 and 8) | ~Month 36 on years in operation; ~Month 42–48 on the purchase-order clock | Criterion 8's "purchase order more than three years old" clock starts at first sale, not incorporation — a first PO in month 6 puts eligibility near month 42 (r2/06) |

The gates do not add; the **latest binding gate sets the date**, and Gate 1 (references at scale) realistically pushes the first *winnable* private enterprise bid to year three or beyond, and the public-sector three-year floors push the first eligible PSU/BFSI bid to months 42–48. Attempting enterprise at launch spends scarce build capacity on RFP-shaped features (SSO/SCIM depth, on-prem/self-host SKUs, works-council IR) for deals that are unwinnable on arithmetic.

To size the waste concretely against the §05.5 sequencing: the RFP-shaped surface is essentially the P2/P3 set — items 24 (SSO/SCIM), 28 (self-host SKU), 29 (residency matrix at GA) and 31 (works-council IR) — **none of which serves a single beachhead filing**. Pulling them forward to launch would divert the scarce first-year engineering budget from the P0 set (items 1–15, of which items 1–12 are the filing spine) toward revenue that arrives, if ever, in year three — and the P0 set now also carries items 32–35 (import, disbursement, CERT-In controls, consent), none of them enterprise-shaped. The correct month-zero enterprise spend is therefore *not product at all*: it is the one item whose clock cannot be compressed (ISO 27001, below), plus the CERT-In obligations that bind us from day one regardless of scale (EV-062, §17). Everything else enterprise-shaped is strictly downstream of v2 references and belongs at P2/P3 exactly where §05.5 places it.

#### A worked month-zero-to-first-bid timeline

To make "roughly three years" concrete rather than a hand-wave, trace a single hypothetical company from month zero:

| Month | Milestone that unlocks the next gate | Which gate it serves |
| --- | --- | --- |
| 0 | Begin ISO 27001 engagement; name CERT-In PoC | Gate 3, Gate 4 |
| 6 | ISO 27001 certificate in hand (seasoning clock starts) | Gate 3 |
| 12 | First 50–199 tenants live; residency provider matrix seam wired (§05.5 item 15) | Gate 4 (partial) |
| 18 | ISO seasoning satisfied; ≥40 tenants filing; v1 exit criteria met | Gate 3 cleared |
| 24–30 | First 200–999 references live ≥6 months (v2) | building toward Gate 1 |
| 36+ | A 200–999 reference large enough to *begin* satisfying a 30k-class scoring path — or a tender that invokes GFR exemption | Gate 1 / Gate 2 |
| 42–48 | A purchase order more than three years old exists (first PO assumed near month 6), clearing an Indian Bank-class Criterion 8; enter GeM/PSU bidding only now (r2/06) | Public-sector floors |

The timeline is dominated by Gate 1, and Gate 1 is dominated by *reference accumulation*, which cannot be sprinted. Every other private-path gate is cleared by roughly month 18; the reference gate is the one that makes the honest answer "year three at the earliest for private enterprise, and only if v2 lands" — and months 42–48 for public-sector tenders, whose three-year floors run on the calendar regardless of references.

#### The one thing we do at month zero *for* enterprise

**[Verified]** the clause that makes this necessary; the action is a decision: start ISO 27001 immediately, even though no customer is asking (Source: Indian Bank Criterion 14, certificate held at least one year before RFP publication — r2/06; §01). To be useful at month 18 the certificate must be in hand by ~month 6. **It is the cheapest year we will ever buy, and it cannot be bought later at any price.** This is the sole enterprise-directed investment in v1: a certification and a CERT-In point-of-contact (§17), not product. Note that CERT-In obligations (incident reporting within six hours, 180 days of ICT logs within Indian jurisdiction, clock sync to NIC/NPL NTP) apply from day one regardless of scale (EV-062, §17) — so the CERT-In PoC is not an enterprise-only investment; it is a day-one obligation that happens to also be an enterprise gate.

**[Killed]** "Ship an MCP server to win enterprise" — there is no evidence an MCP server has changed a single buying decision. Darwinbox announced Cortex on 4 August 2026 with delivery surfaces into Microsoft 365, Teams, Copilot, Slack and Glean — in early access, with no GA date (vendor newsroom and product page read, not executed; captured September 2026 — r1/04; §12). Keka now advertises a "Keka MCP Server", behind the same waitlist as the rest of Keka AI (claim posture, not tested — EV-090; captured September 2026), which makes external-assistant access an expected feature, not a differentiator. If enterprise assistants converge on Copilot, our differentiation is data + tools, not the assistant. Do not phase enterprise around it.

#### What would move the "three years" answer

"Roughly three years" is a conclusion, and a good scope decision names what would falsify it in either direction, so it is a claim and not a mood:

- **Faster (unlikely, don't plan on it):** a single PSU/BFSI tender that (a) invokes the GFR startup exemption in the bidding document *and* (b) does not carry a scoring matrix weighted to incumbency could, in principle, be winnable before a 30k-class reference exists. This collapses Gates 1–2 for that one deal — though not a three-year floor of the kind Indian Bank kept even after relaxing turnover (Gate 2). It does **not** move the roadmap, because the exemption is buyer-discretion and we cannot generate the tenders (§05.2 Gate 2). **[Verified]** the mechanism exists (Source: GFR 2017 Rules 170(i)/173(i)); **[Hypothesis]** that such a tender appears in the window — kill/validate: monitor tender portals, but never staff or forecast against it.
- **Slower (the real risk):** if v2 does not land — if the 200–999 band does not produce a reference large enough to *begin* a 30k-class scoring path (§05.3 gate) — then Gate 1 never clears and enterprise is not "year three," it is "not on this roadmap." The honest answer is that the enterprise date is *entirely downstream of v2 succeeding*; §05.2 is not a promise that enterprise happens in year three, it is a demonstration that it *cannot* happen before then.
- **Structurally (watch this):** if a well-capitalised competitor with references acquires an ISO-seasoned, residency-ready posture and starts winning the mid-market bake-offs (§05.3 kill criterion), the reference-accumulation path that Gate 1 depends on gets harder, not just slower. This is the §20 "fintech-subsidised HRMS" (R-6) and "Frappe v16 bake-off lost on the wrong axis" (R-7) risks pointed at the *up-market* end rather than the floor.

The single load-bearing point: **every path to enterprise runs through v2 references, and v2 runs through v1 filing-SLA proof.** There is no capital-only or feature-only shortcut, which is why spending v1 build capacity on RFP-shaped features is strictly wasted (§05.5 places SSO/SCIM at P2 and self-host at P3 for exactly this reason).

---

### 05.3 Entry criteria for the deferred bands

Deferral is not abandonment. Each deferred band carries a **documentary entry gate** — an observable condition that, once met, moves the band from Defer/Expansion into an active phase. Gating on documents rather than dates keeps the roadmap honest against slippage: a date can be missed and the plan just slips; a document either exists or it does not, and the gate cannot be argued open.

| Band | Phase it enters | Entry gate (all must hold) | Who owns the gate |
| --- | --- | --- | --- |
| **200–999** | v2 (Expansion) | (a) ≥40 paying 50–199 tenants live for ≥6 months; (b) filing-SLA breach rate <2% across a full quarter, including one Form 138 Q4 cycle once CBDT releases the Q4 format (EV-046); (c) multi-establishment + multi-state PT/LWF shipped and audited; (d) a named reference willing to be quoted | Product + Compliance |
| **1,000–1,999** | v2 (late) | (a) ≥5 paying 200–999 tenants; (b) SSO/SCIM + role model GA; (c) support org with an on-call statutory desk; (d) 99.5% payroll-run reliability over 2 quarters | Product + Ops |
| **2,000+ private** | Vision | (a) ISO 27001 held ≥12 months; (b) ≥1 reference implementation ≥5,000 seats; (c) residency-selectable provider matrix GA with in-country inference; (d) CERT-In PoC + audited 6-hr incident process | Security + Sales |
| **PSU / BFSI (any scale)** | Vision+ | All of the above **plus** a tender that (e) invokes the GFR startup exemption OR we independently satisfy the prior-experience floor; (f) 30k-seat-class reference or scoring-matrix path modelled as winnable | Sales + Legal |

Each gate condition maps to an *observable artefact*, not a judgement call, so that "is the gate open?" has a yes/no answer:

- "≥40 paying tenants live ≥6 months" → a billing-system query, not an opinion about traction.
- "filing-SLA breach rate <2%" → the filing-ledger's on-time vs late counts over a named quarter (§05.8 defines the metric).
- "multi-establishment + multi-state PT/LWF audited" → a completed audit report against the gazette-sourced PT/LWF dataset (§20 V-09).
- "a named reference willing to be quoted" → a signed reference agreement, not a friendly customer.
- "ISO 27001 held ≥12 months" → the certificate's issue date vs today.
- "≥1 reference implementation ≥5,000 seats" → a live tenant of that size, not a pilot.

The gates are **conjunctive — all conditions must hold, not any one** — and deliberately so: a band that met the reference count but not the audited multi-state PT/LWF would ship an SLA it cannot honour for a multi-state tenant (§05.9), and a band with the technical surface but no quotable reference would lose the bake-off the band routinely runs (§05.3 kill criterion). Each gate is the *minimum simultaneous* set of "the filings can be delivered" (Compliance owns), "the product scales" (Product owns) and "the market will vouch for us" (Sales owns) — which is why the ownership column names more than one team. A disjunctive gate ("any of these") would let the band open on partial readiness and breach the section's invariant (§05.12): never commit a band whose filings we cannot deliver on the calendar with the SLA behind them.

**[Hypothesis]** These gates are the author's proposed thresholds, not validated against a won deal. Kill/validate: gate (a)/(d) numbers to be re-anchored after the §20 pricing (V-01, V-03) and Tally-payroll-adoption (V-02) programmes report; the 40-tenant threshold in particular is a placeholder for "enough references to survive a bake-off," not a measured figure. Concretely — if field evidence shows the 200–999 band routinely runs formal bake-offs requiring named references at the buyer's own scale, the "≥1 named reference" in gate (d) is insufficient and must rise to "≥3 references in the buyer's sub-band." There is weak positive evidence already: Indian HRMS buyer guides advise demanding three same-size Indian references (competitor-published, logged as a positioning claim at low confidence — r2/06). No §20 item measures this yet — §20 V-06 closed on 5 September 2026 having captured prices, seat minimums and AI posture, not reference requirements — so it is routed to §20 as a new commercial-validation item.

#### Gate evidence records for the deferred bands

Each condition in the table above becomes a check with an ID, a query that evaluates it and an owner, so "is the gate open?" is answered from records, not from a meeting. A band's gate is open only when every one of its checks reads PASS at the same evaluation.

| ID | Band | Condition | Evaluated by | Owner |
| --- | --- | --- | --- | --- |
| DG-2a | 200–999 | ≥40 paying 50–199 tenants live ≥6 months | Billing query: tenants in band 50–199 (§05.11's `commercial_band`) with an invoice in each of the last six months | GTM lead |
| DG-2b | 200–999 | Filing-SLA breach rate below 2% across a full quarter, including one Form 138 Q4 cycle once CBDT releases the format | Filing ledger: product-caused misses (§05.9) ÷ IN_SLA instances due in the quarter; the Q4 leg is satisfied by F-01's carve-out until the format exists | Statutory desk lead |
| DG-2c | 200–999 | Multi-establishment and multi-state PT/LWF shipped and audited | The audit report against the state-primary-sourced dataset (§20 V-09); F-06 and F-07 SHIPPED for every audited state | Statutory desk lead |
| DG-2d | 200–999 | A named reference willing to be quoted | A signed reference agreement on file | GTM lead |
| DG-3a | 1,000–1,999 | ≥5 paying 200–999 tenants | Billing query, as DG-2a | GTM lead |
| DG-3b | 1,000–1,999 | SSO/SCIM and the richer role model GA | Release record for item 24 | Engineering lead |
| DG-3c | 1,000–1,999 | A support org with an on-call statutory desk | On-call rota and the desk roster (§22.10) | Filing desk lead |
| DG-3d | 1,000–1,999 | 99.5% payroll-run reliability over two quarters | Not evaluable yet: "payroll-run reliability" has no numerator, denominator or source in this PRD. Routed to §19 to define; until it is defined, DG-3d reads FAIL, never PASS by default | Engineering lead |
| DG-4a | 2,000+ private | ISO 27001 held ≥12 months | Certificate issue date against the evaluation date | Security lead |
| DG-4b | 2,000+ private | ≥1 reference implementation of ≥5,000 seats | A live tenant of that size with a signed reference agreement — not a pilot | GTM lead |
| DG-4c | 2,000+ private | Residency-selectable provider matrix GA with in-country inference | The §20 V-13 matrix with written provider confirmations of both guarantees (data at rest and inference) | Engineering lead |
| DG-4d | 2,000+ private | CERT-In point of contact and an audited six-hour process | Audit report (V2X-07) | Security lead |
| DG-5e | PSU/BFSI | A tender that invokes the GFR startup exemption, or our own satisfaction of its prior-experience floor | The tender document's clause, or our qualifying purchase orders against its criteria | GTM lead with Legal lead |
| DG-5f | PSU/BFSI | A 30k-seat-class reference, or a scoring path modelled as winnable | A scoring memo against that tender's own matrix (the SBI Appendix-T arithmetic is the template — §05.2 Gate 1) | GTM lead |

Every evaluation is stored as a record — gate, check, evidence reference, result, evaluator, date — and re-run at each quarterly operating review and whenever a qualified opportunity in the band appears. One exception is documented in advance and does not open the band: a single PSU/BFSI tender that satisfies DG-5e may be bid on its own merits (§05.2, "Faster"), because the exemption is the buyer's permission, not ours to plan on.

---

### 05.4 Phasing: v1 → v2 → vision

Three phases. Each has a **thesis** (what it proves), a **scope** (bands + modules), **entry criteria** (what must be true to start), and **exit criteria** (what must be true to declare it done and open the next). The exit criteria of a phase are deliberately close to the entry criteria of the next, so the roadmap is a single chain of gates.

The phases are named for what they *deliver*, not what they *contain*, because the unit of delivery is the filing:

- **v1 — "Files the beachhead."** Prove we can deliver the full statutory filing cycle for 20–200 — portal-accepted artefacts plus attended, assisted submission under the employer's written authority to act (§22) — with a maintained-compliance SLA, at a margin the four-line cost-of-goods stack supports (EV-088).
- **v2 — "Scales the filing."** Take the same filing engine up-market to 200–1,999 (private) — more scale, more configuration, more integrations, same core.
- **Vision — "Files at any scale, for anyone."** Enterprise and regulated buyers, full suite, residency-selectable, on the documentary gates of §05.3.

"Files" in the phase names is shorthand for the v1 deliverable defined above: an artefact the portal accepts, plus attended, assisted submission under the employer's written authority to act (§22). It never means unattended or automated submission. It never means a transfer of the employer's or deductor's statutory liability, which stays non-delegable in every phase. Every statutory surface the product touches is an attended portal (EV-030, EV-035–038).

#### Phase v1 — Files the beachhead (20–200, private)

**Thesis.** A 20–200 Indian employer will pay for *statutory artefacts the portal accepts, submitted on time in an attended session under its written authority to act, with a maintained-compliance guarantee* — which no vendor in the six-vendor set even claims (all publish generation language only; MYND/Qandle's outsourced filing operation is unpriced and demo-sold — EV-030), and which the freemium tier withholds by charging for outputs rather than computation (EV-029). The employer's and deductor's statutory liability stays non-delegable (§22); what we sell is the artefact plus the attended submission, never the liability. If this is false, the company is not viable and no later phase matters. This is the load-bearing bet of the entire document; §20 V-01, V-03 and V-16 exist to test it before funding.

**Scope — bands.** Commit 20–199 (50–199 revenue, 20–49 funnel). Acquisition-serve 10–19. Decline 1–9 commercially.

**Scope — modules (the v1 must-ship set).** Sequenced in §05.5; the set is: statutory payroll engine with the dual wage base; the filing artefacts — the ECR (generator buildable now, EV-035), the ESI contribution upload, the PT return for gazette-sourced design-partner states, and Form 138 Q1–Q3; Form 130 data preparation and distribution (the certificate itself is TRACES-generated only — EV-048); the six employer registers plus the wage slip (EV-053); the appointment letter; core HR system-of-record; ADMS/WDMS attendance receiver; the bundled AI assistant; and full cost/token attribution; plus the two central-sphere annual returns, OSH FORM-XVII and SS Form XXIII, due each February (r5/04; §05.9). The fenced items — Form 138 Q4 and Form 130 Part B generation, ECR arrear returns, state PT/LWF slabs not yet gazette-sourced, ESI after 22 Nov 2026, the unconfirmed ESIC upload template, and the launch of attended submission itself — ship as their blockers clear; each blocker is named in §05.7, and the artefact register there assigns every artefact to release R1, R2 or R3.

**Entry criteria (to begin building v1).**
- Statutory spec frozen against the 8 May 2026 Central Rules **with the November 2026 position resolved** (§06.9) — build against EPF Scheme 2026 (§06.2); the ESI position after 22 Nov 2026 answered before first paying customer (§20 V-08). The cliff mechanics and the open legal reading of which saving provisions are in force are stated canonically in §06.9 and deliberately not restated here. **[Hypothesis]** ESI resolution timing — kill/validate: if no ESI successor is notified by ~month 3 of build, the ESI challan module ships behind a rule-version seam against the saved 1948-era scheme and switches on notification (§05.7).
- Rules-first architecture decision ratified: no statutory or monetary figure is ever model-generated (§12). **[Verified]** (Source: PRD §12, correctness-before-cost decision.)
- Dual wage-base requirement (50% add-back, effective-dated, retrospectively recomputable) accepted as P0 (§06). **[Verified]** (Source: Code on Wages s.2(y) / Code on Social Security s.2(88), identical text — EV-010.)

**Exit criteria (to declare v1 done and open v2).**
1. **Filing completeness:** every v1 filing artefact generated, passed by the authority's own validation (EPFO upload validation; FVU for Form 138 — EV-036, EV-052) and submitted in an attended session (or by the employer, if the §05.12 attended-filing carve-out is in force), for ≥40 paying tenants across ≥1 full statutory cycle. The cycle includes Form 138 Q4 and the TRACES-generated Form 130 only once CBDT releases the Q4 format — re-checked September 2026, still "expected to be released soon" with no date, and the Q4 correction format is also unavailable (EV-046). Until then the criterion is met on Q1–Q3 and the Q4 leg is a declared carve-out, not a silent miss (§05.12). **[Verified]** dependency (EV-046, EV-048).
2. **Filing-SLA reliability:** on-time filing rate ≥98% measured over a full quarter; every miss root-caused. The 98% is a placeholder for "materially better than a bureau's realised miss rate" — **[Hypothesis]** kill/validate against §20 V-01 and V-16 (what a bureau actually delivers and misses); if bureaus themselves miss <2%, the SLA is not a differentiator and the number must rise.
3. **Compliance freshness:** statutory-change watcher live and catching *amendments/corrigenda*, not just new instruments (§12) — validated by having caught ≥1 real change in-flight. This directly encodes the §02 lesson that a watcher keyed only to new notifications would have missed the corrigendum that inverted the entire November 2026 analysis.
4. **Unit economics:** all four cost-of-goods lines instrumented (EV-088) — supervised minutes per filing cycle per registration (the dominant line, and the automation target §13 derives), compliance-curation cost per state maintained, WhatsApp per message, and inference per employee-month against real token usage (§20 V-04, V-14). **[Reversed]** Earlier drafts framed this criterion as "confirming the bundled-assistant margin holds", on the premise that inference margin was 93–99% and bundling could never threaten it; that premise is withdrawn — inference is the smallest line (EV-088). **[Hypothesis]** the 23,675-input/2,045-output token estimate has no empirical basis (§13) — kill/validate: if measured tokens are 5× the estimate, the bundled assistant is re-tiered or degraded at the low end (§20 V-04); if supervised minutes per registration exceed the §13 target, the registration line in §18 is triggered.
5. **Migration proven:** ≥10 tenants migrated mid-year from Tally/Zoho/Kredily/Frappe with opening balances, YTD, prior-employer income and UAN/IP continuity intact (§16).

**What v1 explicitly excludes** (to prevent scope creep): recruiting beyond "bring-your-own-job-board" ingest, performance management, enterprise SSO/SCIM depth, self-host/on-prem SKUs, benefits *monetisation* (data model only — see §05.5), GPS live-tracking monetisation, and any premium AI SKU. Each exclusion has a source: recruiting inbound-only because Info Edge publishes no third-party path into Resdex (§10, Source: Resdex/Zwayam exclusivity, corroborated across four sources — r2/08); no premium AI because seven vendors price it zero (§12, Source: greytHR NAVOS, Zoho Zia, Oracle, Microsoft, Workday, 15Five, Culture Amp); no self-host-for-cost because serverless beats a dedicated H100 ~74× at the GPU's list price (the ~50× figure used a promotional rate that expires 30 September 2026 — r2/03; §20, §13 cost model).

#### Phase v2 — Scales the filing (200–1,999, private)

**Thesis.** The same filing engine, taken up-market, wins 200–1,999 private-sector employers on maintained-compliance SLA + attended, assisted filing + CA/finance-console depth — segments where the free-tier floor no longer bites and switching cost is real.

**Scope — bands.** Add 200–999 (early v2) then 1,000–1,999 (late v2). Private sector only. Continue v1 bands.

**Scope — new modules.** Multi-establishment and group-entity payroll; deep multi-state PT/LWF (all states, gazette-sourced dataset — §20 V-09; a genuine differentiator, greenfield in both incumbents — EV-031, EV-032); SSO/SCIM and a richer role model; contractor/gig compliance surface (retrenchment/closure approval and standing orders at 300; the principal-employer contract-labour annual return, FORM-XVII Part-III under OSH r.98(9) — r5/04; the works-committee obligation, which arises at 100+ workers only on a government order, is already a tracked task in the v1 data model); the CA-facing multi-client console productised; metered monetisation SKUs where value is legibly incremental — recruiting per requisition/hire, bulk document generation, HR-analyst copilot per admin seat (§12); performance and light talent modules as pull-driven adjacencies.

**Entry criteria.** All v1 exit criteria met (they are the same chain), plus the §05.3 200–999 entry gate.

**Exit criteria (to open Vision).**
1. ≥5 paying 200–999 tenants live ≥6 months with filing-SLA ≥98%.
2. SSO/SCIM, multi-establishment, multi-state PT/LWF all GA and audited.
3. A support org with a permanent statutory desk and on-call (this is the §13 org-design consequence made real: a compliance-maintenance operation, not a feature-velocity startup).
4. At least one metered SKU showing non-zero realised attach revenue, modelled as a **separate line from software PEPM, never blended** (§11, Source: Zaggle software-vs-money-movement split, 5.3% of net revenue is software).
5. ISO 27001 held ≥12 months (started month-zero in v1) — this is the bridge condition into Vision.

**What v2 explicitly excludes** (to keep it "the same engine, up-market" and not a rewrite): no PSU/BFSI pursuit (that is a Vision documentary gate, §05.3, not a v2 scope item); no self-host/on-prem SKU (P3, only for named regulated accounts — §05.5 item 28); no benefits *monetisation* (still data-model-only until Vision revisits it on merits — §11); no new assistant surface beyond the metered SKUs. v2 adds *scale, configuration and integrations* to the v1 filing engine — it does not add a new product category. The discipline is the same as v1's: a feature is in v2 only if it serves the up-market filing sale, not because a 200–999 prospect asked for it in a demo.

#### Phase Vision — Files at any scale, for anyone (2,000+, incl. regulated)

**Thesis.** With references at scale, a seasoned certificate, and a residency-selectable architecture, the filing-first product can enter enterprise and regulated segments on the documentary gates that arithmetically excluded it at launch — *and* the full-suite vision (all three segments, full modules, AI layer) is finally coherent as one product.

**Scope — bands.** 2,000+ private first; PSU/BFSI only once a tender invokes the GFR exemption or the prior-experience floor is independently satisfied (§05.3).

**Scope — new modules.** Self-host / dedicated as a *priced compliance SKU* for named regulated accounts (never for cost — §20); residency-selectable provider matrix at GA with in-country inference and per-tenant residency selection; full IR/works-council tooling; the MCP server posture matured to "own the data and tools the assistant calls, not the assistant" (§16); benefits *monetisation* decision revisited on its own merits (data model was built in v1 as option value — §11).

**Entry criteria.** All v2 exit criteria, plus the §05.3 2,000+ and PSU/BFSI gates.

**Exit criteria.** Vision is a horizon, not a phase with a completion state; its "exit" is the realisation of the full-platform vision from the founder's scope (all three segments, full suite, AI layer — Source: memory hrms-product-scope, 2026-09-04). Progress is measured by enterprise reference count, regulated-account wins, and blended net revenue retention across bands.

#### Phase summary

| | v1 · Files the beachhead | v2 · Scales the filing | Vision · Files at any scale |
| --- | --- | --- | --- |
| Bands | 20–199 commit; 10–19 funnel | +200–1,999 private | +2,000+, incl. regulated |
| Proves | People pay for filing SLA | Same engine scales up-market | Full-platform vision coheres |
| Revenue core | 50–199 | 200–999 | 2,000+ + regulated + attach |
| Key gate to open next | 40 tenants, 1 full filing cycle, ≥98% SLA | 5× 200–999, SSO/SCIM, ISO seasoned | Ongoing (horizon) |
| AI role | Cost-of-goods, bundled, attributed | + metered SKUs (separate line) | + data/tools moat, residency matrix |
| Biggest risk to phase | Free-tier floor / ESI after 22 Nov 2026 / attended-filing legality (§23) | Support-org scale, realised ARPU | Enterprise arithmetic (§05.2) |

#### What happens to v1 tenants and records when v2 opens

Opening v2 is a scope event, not a migration: the v1 seams (§05.19) exist so that nothing a v1 tenant holds has to move. What changes, and what must not:

| Object | On the v2 opening | Must not happen |
| --- | --- | --- |
| Tenants already past 200 (AD-03) | Offered item 22's multi-establishment operations; their coverage statements re-version with `release_in_force` = v2 | A forced re-implementation, or a new tenant record |
| Every other tenant | Coverage statements re-version only where v2 adds a family they use (for instance every state's PT through item 23) | Any line leaving IN_SLA because of the release change alone |
| The ledger and every locked month | Unchanged | A re-render of a filed artefact from v2 code — filed artefacts stay byte-identical (AC-301.4) |
| Fences still open at the end of v1 | Carried into v2 with their state and history | A fence closed by relabelling rather than by its clear condition |
| Deferred artefacts (§05.22) | Re-evaluated against their re-entry triggers at the first v2 change-control review | Re-entry by date |
| The P0 label | Stays in the ledger's history as the R1 label; v2's must-ship list is labelled when v2's release plan is written, under the same one-label, one-release rule | Any v2 row labelled P0 before v2's release plan exists |

---

### 05.5 Module sequencing

Modules are sequenced by **statutory necessity first, acquisition leverage second, and monetisation last** — because the revenue thesis is compliance, not features, and because retrofitting certain data models (dual wage base, benefits/FBP, cost attribution) into a shipped engine is expensive while their marginal build cost early is low.

Priority levels: **P0** = v1 cannot ship without it; **P1** = v1 should ship with it (acquisition or completeness); **P2** = v2; **P3** = vision. **P0 is reserved for the R1 release list** (§05.7): a module is P0 only for the parts of it that are buildable now and ship in R1. A fenced sub-artefact of a P0 module — item 3's arrear return, item 6's Q4 file and Form 130 Part B data, item 4's post-22-Nov-2026 successor, a state not yet gazette-sourced under items 5 and 7 — is **not** P0; it carries a release tag (R2 or R3) and its named blocker instead. No other label ("P0-of-P1", "P0 once unblocked") is used.

<!-- DIAGRAM: module-sequencing-lanes -->

| # | Module / capability | Priority | Why here, in this order | Source cue |
| --- | --- | --- | --- | --- |
| 1 | Rules-first statutory payroll engine (deterministic; no model-generated figures) | **P0** | A wrong payroll number is a legal problem, not a UX one. Everything else depends on it. | §08 [Verified] |
| 2 | Dual wage base — 50% add-back, effective-dated, retrospectively recomputable, audit trail | **P0** | Two wage bases on one payslip; "or such other per cent as may be notified" makes it a standing variable. Retrofitting is prohibitive. | Code on Wages s.2(y) / CoSS s.2(88) [Verified] |
| 3 | EPF ECR generator + attended upload — Scheme 2026 | **P0** | EPF is the monthly filing that switches on at 20 (EV-057); it is the reason the beachhead exists. **The monthly ECR generator is no longer fenced**: the September 2025 re-engineering (still beta) changed workflow and validation, not the 11-field `#~#` layout (EV-035). The arrear return is fenced — no arrear layout is published (EV-043). Build against Scheme 2026 (§06.2). | EV-035, EV-043, EV-057 [Verified] |
| 4 | ESI contribution upload + challan, attended | **P0** | Live from ten persons (twenty for central-sphere-extended establishments — r1/06; EV-057); due by the 15th under Regulation 31 of the ESI (General) Regulations 1950 (r3/02). **The position after 22 Nov 2026 is fenced on §06.9** (§20 V-08) — resolve before first paying customer. | §06 [Verified]/[Hypothesis] |
| 5 | State PT computation + return (design-partner states first) | **P0** | Turns on per state; the beachhead's real multi-state pain. v1 ships only states whose slabs are gazette-sourced — each state is fenced until then; all-states dataset is P2. Neither incumbent ships a state slab table (EV-031, EV-032), so this is differentiation, not parity. | §20 V-09 [Hypothesis] |
| 6 | TDS on salary u/s 392 (ex-s.192) + Form 138 (ex-24Q) Q1–Q3 + Form 130 (ex-Form 16) data preparation and distribution | **P0** | From employee one. Form 138 is a breaking file-format change (EV-051) on a dual FVU stack (EV-052), and both vocabularies must be accepted (EV-050). The Q4 generator and Form 130 Part B generation are fenced — the Q4 format is unreleased (EV-046) — and the certificate itself is valid only if TRACES-generated (EV-048). | EV-046–052 [Verified] |
| 7 | Gratuity + LWF accrual | **P0** | Gratuity accrues from 10; LWF is state-scheduled and each state is fenced until gazette-sourced (§20 V-09). Accrual model must exist even where payout is later. | §06 [Verified] |
| 8 | Six employer registers + wage slip, one canonical set, electronic | **P0** | Wages r.51(1) Forms I, IV, IX + Form V; OSH Forms XIII, XIV, XV, XIX, XX + Form XVI; SS Form XXII — deduplicated by the non-duplication provisions (EV-053). Retention per rule-set, not a flat "5 years" (EV-054). Form numbers configurable per state. They are statutory records, not reports. | EV-053–055 [Verified — central sphere] |
| 9 | Appointment letter (prescribed format) + wage slip | **P0** | The appointment-letter duty (OSH Code s.6(1)(f)) attaches to an "establishment" of 10 or more workers and its form is prescribed by the appropriate Government — state-sphere (EV-057). **[Reversed]** earlier drafts said "from employee one". The wage slip is issued every period (EV-053). | EV-053, EV-057 [Verified — central sphere] |
| 10 | Core HR system-of-record (employee master, org, dependants) | **P0** | The spine every filing reads from; dependant records also seed FBP option value. | derived |
| 11 | ADMS/WDMS attendance push receiver (eSSL/ZKTeco) | **P0** | Best-evidenced call in the corpus (EV-013); deals won/lost on device-fleet fit; architecturally trivial (outbound POST, no middleware). Punches must survive as per-day IN and OUT times, because Form IX requires them (EV-055). | §09 [Verified] |
| 12 | Statutory-change watcher (amendments + corrigenda, not just new instruments) | **P0** | The compliance SLA is the product; a watcher that misses corrigenda would have inverted the Nov-2026 analysis. | §12 [Verified] |
| 13 | Bundled AI assistant (deflection; rules-first; model router; per-tenant/user rate limits) | **P0** | AI is cost-of-goods and an acquisition weapon, bundled; router + rate limits are P0 because model choice drives the inference line (52.7× spread, EV-089) — the smallest of four cost-of-goods lines, not the margin (EV-088). Governance must match what competitors now publish: citation on every answer, no silent writes, RBAC on every AI call (EV-090, claim posture; §12). | §12 [Verified] |
| 14 | Full cost/token/cache attribution per tenant/user/agent/model | **P0** | Build while price is still zero; retrofitting attribution after pricing exists is far harder. | §13 [Verified] |
| 15 | Residency-selectable provider abstraction (≥3 interchangeable backends) | **P0** | The seam only, with one backend wired, ships in R1; full matrix GA is item 29 (P3). Same abstraction serves cost (router) and residency; foreclosed by regulation for later bands, so build the seam now. (An earlier "P0-arch" label broke the one-label rule above and is withdrawn.) | §13 [Verified] |
| 16 | Published INR self-serve price card + continuous pricing ramp (no cliffs) | **P1** | A 30-person firm will not sit through a demo; Zoho's ₹0→₹1,000 and ₹0→₹48 cliffs are the attack surface — do not reproduce them; and bill actual headcount, because all six priced competitors impose a 50-seat minimum (EV-026). | §18 [Verified] |
| 17 | Migration importers (Tally first within P1; Zoho/Kredily/Frappe) | **P1** | Migration is a first-class product surface; Tally import matters because Tally owns accounting and the statutory artefacts (EV-032), though how many beachhead firms run Tally *payroll* is unknown (§20 V-02); the others are acquisition infrastructure. | §16 [Hypothesis] |
| 18 | FBP / benefits data model (declarations, wallet config, proof-of-spend, endorsements) | **P1** | Build the data model, defer monetisation; retrofitting into a shipped engine is expensive; it is option value on the whole attach business. The 1 Apr 2026 meal/gift thresholds are live config **only with their conditions enforced as engine constraints** — meals during working hours at office/factory premises, or non-transferable vouchers usable only at eating outlets; without them the perquisite is taxable, payslips under-deduct and the demand plus interest lands on the employer (EV-019; §11; the rule citation is routed to §20 V-18). The threshold figures themselves are **[Hypothesis]**: two dated secondary sources agree, but the rule text has not been read (EV-019). They are held as rule-version data, never hard-coded. | §11 [Verified] data-model call; EV-019 [Hypothesis] figures |
| 19 | Recruiting — "bring your own job-board contract" (multi-post + inbound ingest/dedup) | **P1** | Inbound-only: Info Edge publishes no path for a third-party ATS to search Resdex and markets in-ATS Resdex search as exclusive to its own ATS (§10; r2/08, four independent sources); forbid scraping explicitly. Meter recruiting separately (cost ≠ headcount). | §10 [Verified] |
| 20 | CA-facing console (multi-client switch, per-client calendar, one-click Form 138/PT export, read-only audit) | **P1** | "Design for the CA as a user" is the biggest GTM bet and unvalidated (§20 V-05); ship a thin console in v1 (R2), productise in v2. The productised console is a separate P2 ledger row (§05.17), not a composite "P1→P2" label. | §18 [Hypothesis] |
| 21 | Device compatibility matrix + self-serve verification tool (public) | **P1** | Highest-leverage cheap artefact; neutralises deal-gating; we are not aware of any incumbent publishing one as of September 2026. | §09 [Verified] |
| 22 | Multi-establishment / group-entity payroll | **P2** | The 200–999 sale is multi-establishment by nature; not needed for single-site beachhead. | §05.3 gate |
| 23 | All-states PT/LWF gazette-sourced dataset | **P2** | Only Maharashtra's and Odisha's slabs have been read at state primary source, with Karnataka's effect read on its PT portal (EV-014); **[Reversed]** earlier drafts named Telangana as the verified state — only its employer-registration wording ever was (EV-014); every other state and every LWF figure is undone (EV-015). A build dependency for up-market multi-state — and a genuine differentiator, greenfield in both incumbents (EV-031, EV-032), which is why states are pulled forward one design partner at a time under item 5. | §20 V-09 [Hypothesis] |
| 24 | SSO / SCIM + richer role model | **P2** | Procurement expectation from ~1,000 seats; wasted before then. | §05.3 gate |
| 25 | Metered monetisation SKUs (recruiting per hire, bulk docs, analyst copilot per admin seat) | **P2** | Monetise only where value is legibly incremental; software PEPM and attach modelled as separate lines. | §12/§11 [Hypothesis] |
| 26 | Performance / talent modules | **P2** | Pull-driven adjacency, not a wedge; sequenced after the filing engine proves out. | vision scope |
| 27 | GPS live-tracking (priced) | **P2** | greytHR prices its GPS Live Tracking add-on at ₹140/user/month, 3.1× its ₹45 Essential marginal seat (r2/04) — location is monetisable; not a v1 dependency. | §09 [Verified] |
| 28 | Self-host / dedicated as priced compliance SKU | **P3** | Only for named regulated accounts; never for cost (serverless beats dedicated ~74×). | §20 [Verified] |
| 29 | Full residency matrix GA + in-country inference at scale | **P3** | Enterprise/regulated gate; the seam (item 15) exists from v1, GA is vision. | §13 [Verified] |
| 30 | MCP server (read/approval-gated write/admin split) matured as data+tools moat | **P3** | Own the data and tools, not the assistant; no evidence it changes buying decisions, so never on the critical path. Keka's advertised MCP server (EV-090) makes external-assistant access expected rather than differentiating — re-test this placement via §20. | §16/§18 [Killed]/[Hypothesis] |
| 31 | Full IR / works-council tooling | **P3** | Enterprise-scale industrial relations; irrelevant below the deferred bands. | §05.2 |
| 32 | Onboarding import (Excel/CSV) with the YTD tie-out validator and the parallel-run month | **P0** | Every R1 tenant arrives through it, and a mid-year design partner cannot be paid correctly without carried YTD. The named-source importers stay P1 (item 17); this universal import and its ₹0 tie-out gate do not. Added in the v1.0 reconciliation: §16.13 already carries it at P0 and this table had no row for it. | §16.7 (AC-MIG-1, 3, 4, 5) |
| 33 | Salary disbursement file, payment approval and credit reconciliation | **P0** | A payroll month cannot reach DISBURSED without a bank file released by an approver distinct from the processor (FR-PAY-301 M9, FR-PAY-904), and "paid" is only true once credits reconcile to net pay. Settles the FR-PAY-903 priority conflict at P0 for R1 (§05.17). | §08.10; §16.3 |
| 34 | CERT-In day-one controls — six-hour incident pipeline, 180 days of ICT logs within India, clock sync to NIC/NPL NTP | **P0** | Binds from day one regardless of scale (EV-062). Listed so the R1 list is complete, not because it is new (§05.2, §17). | EV-062; NFR-CERT-601–603 |
| 35 | Consent record, SPDI written-consent capture and the migration consent flow | **P0** | Payroll collects bank-account details — "financial information" under SPDI r.3(ii) (r4/02) — and may collect biometrics; r.5(1) requires consent in writing before collection (EV-060). Whether r.5(1) reaches employment collection, and who owes it, is under counsel review (CR-04; §23); capture ships either way. Consent cannot be backfilled, so this must exist before the first import (§07, FR-CHR-102). | EV-060; FR-CHR-100, FR-CHR-102; FR-ATT-017 |

#### Acceptance criteria for the load-bearing P0 modules

Priority alone does not make a module buildable; each P0 item needs an acceptance test that a filing-first product can be measured against. The ones that carry the most statutory risk:

- **Item 2 (dual wage base).** Given an employee whose excluded components (HRA, conveyance, overtime, award settlements) exceed 50% of total remuneration, the engine must compute a PF/gratuity base that adds back the excess *and* a separate payment-of-wages/equal-pay base that does not — on the same payslip, for the same period. Acceptance: a retro run correcting a prior period recomputes against the add-back percentage *in force for that period*, not today's, with a full audit trail; and if the notified percentage changes from 50% to another value, only a new rule-version row is added, no code deploys. (Source: Code on Wages s.2(y) / CoSS s.2(88), "or such other per cent as may be notified.") **[Verified]**
- **Item 3 (EPF/ECR).** Given a tenant crossing 20 headcount, generate the ECR return file exactly to the published layout — `#~#` delimiter (three characters), no header row, 11 fields in order from UAN to Refund of Advance — with Wage Month, Return Type, Contribution Rate and Remark captured as portal form values, never file content (EV-035); apply the ₹15,000 wage ceiling for mandatory coverage (re-fixed under CoSS s.2(89) by S.O. 2702(E) of 29 May 2026 — r1/06), EPS at 8.33% of wages up to the ceiling (₹1,250 at ₹15,000, matching the golden fixture lines in EPFO's own ECR help file — r5/02), and, where an International Worker is flagged, the IW contribution base held as the named parameter `iw_contribution_base_rule` — commonly described as full wages with no ceiling, but not verified in this PRD's evidence base, so routed to §20 — with EPS membership following the joining-date rule in EPFO's revamped-ECR FAQ Q6 (r5/02). Mirror EPFO's own checks with the same severity: the age-58 EPS rule blocks, while "joined after 1 Sep 2014 with wages above ₹15,000" only flags (EV-040). Acceptance: the file passes EPFO upload validation, in the attended flow (§22), for a mixed roster including at least one IW and one above-ceiling voluntary contributor; return-type guards follow EV-037 and a skipped month is surfaced before it blocks a later one (EV-038). A byte-level regression test reproduces EPFO's two published golden fixture lines exactly — 11 values and 10 delimiters per line (r5/02). (Source: EV-035, EV-037, EV-038, EV-040; EPF Scheme 2026.) **[Verified]** on layout, rates and ceiling; **[Hypothesis]** on the IW contribution base until §20 confirms it; **[Hypothesis]** on IW prevalence in the beachhead — kill/validate via §20: if <2% of beachhead tenants employ IWs, keep IW handling P1 not P0.
- **Item 4 (ESI).** Given an employee at or below the ₹21,000 wage ceiling (₹25,000 for persons with disability), compute employee 0.75% + employer 3.25% and prepare the contribution upload and challan for the correct contribution period (Apr–Sep / Oct–Mar), for attended submission. Acceptance: an employee who crosses ₹21,000 *mid-contribution-period* continues to be covered until the period ends and drops only at the next period boundary — the wage-ceiling-crossing edge case (worked in §05.6). (Source: esic.gov.in coverage and contribution pages re-fetched September 2026 — r1/06; ESI rules saved under CoSS s.164(2)(b) — EV-002.) **[Verified]** on current mechanics; **[Hypothesis]** on whether the position after 22 Nov 2026 preserves them (§06.9; §05.7 fence).
- **Item 6 (TDS / Form 138 / Form 130).** Given an employee's regime election (new regime by default unless the old regime is opted — ex-s.115BAC; its Income-tax Act 2025 counterpart is held as rule-version data, not hard-coded, because only the EV-050 mappings are verified), compute monthly TDS u/s 392 and generate the quarterly Form 138 Q1–Q3 file — ASCII, `^`-delimited, CRLF-terminated, record types FH/BH/CD/DD, file type SL1 (EV-051) — to the format Protean published on 22 Jul 2026, validated through RPU/FVU 1.2 for Tax Year 2026-27 onward; corrections for FY 2025-26 and earlier stay on 24Q with RPU 6.0/FVU 9.5, routed by period and never mixed (EV-052). Acceptance: the Q4 file and Form 130 Part B generation stay fenced until CBDT releases the Q4 format (EV-046); the product never emits its own annual certificate, because Form 130 is valid only if generated from TRACES (EV-048) — it prepares the data and distributes the downloaded certificate; labels, search and imports accept both vocabularies (EV-050). **[Verified]**
- **Item 7 (gratuity accrual).** Accrue at 15 days' wages per completed year of service (a part-year in excess of six months counts as a full year; monthly-rated employees use monthly wage ÷ 26) from the date the 10-employee test latches; apply the five-year continuous-service condition, which does not apply on death, disablement or expiry of a fixed-term contract, and the one-year eligibility for fixed-term employees; count "continuous service" by days actually worked — 240 in a year, or 120 in six months, including lay-off, paid earned leave, employment-injury disablement and maternity leave up to 26 weeks (CoSS ss.53–54, verified against the gazette — r1/06; fixed-term one year per the Central Rules — r1/06, r3/04). The payout ceiling is **not** hard-coded: CoSS s.53(3) says gratuity "shall not exceed such amount as may be notified by the Central Government", no such notification has been located, and the familiar ₹20 lakh is a legacy of the repealed Payment of Gratuity Act (r1/06). It is the named parameter `gratuity_ceiling` — unset until notified, routed to §20; until then a computed payout above the legacy ₹20 lakh figure is held for operator review rather than silently capped or silently paid. Acceptance: a leaver's eligibility is computed from day counts, not a calendar "5.0 years" test; the accrual liability is visible even where no payout is due yet; payment falls due within 30 days of becoming payable (r3/04). Whether a leaver at four years and roughly eight months satisfies the five-year condition through the 240-day rule is a reading we are not able to verify from the evidence base — statutory basis under counsel review (§23); the engine carries it as a configurable eligibility rule, off until counsel clears it. **[Verified]** on the formula, day-counting and the unfixed ceiling; **[Hypothesis]** on the four-year edge reading.
- **Item 8 (statutory registers).** Maintain the six employer registers plus the wage slip as one canonical set (EV-053): Form IX with per-day IN and OUT timestamps — a present/absent or day-total model is non-compliant — and Form I with its 36 numbered fields (EV-055). Retention follows each rule-set's own wording: "five years after the date of last entry" (Wages r.51(4)) or "five calendar years from the date of last entry" (OSH r.72(1)(vii), SS r.53(1)(e)); the register OSH r.76 covers may not be destroyed even after the period unless transferred to a new register (r.76(2)); a three-kilometre physical-location constraint applies (OSH r.72(4) and SS r.53(3), differently worded) and must be reconciled with electronic maintenance; state-sphere periods are unknown and go to counsel (EV-054, §23). Acceptance: each register is generable in its notified format for any past period on demand, and is *immutable once finalised* with a full audit trail — a register that can be silently back-edited is not a statutory register, it is a report; form numbers are configuration per state, never hard-coded (EV-053). The "in ink" requirement for the Register of Women Employees, which contradicts r.53(1)(b)'s electronic permission (EV-054), is surfaced as an open item, not resolved in code. **[Verified — central sphere]**
- **Item 9 (appointment letter + wage slip).** Issue the prescribed-format appointment letter wherever the establishment has 10 or more workers, in the form the appropriate Government prescribes — state-sphere, so the template is configuration per state (OSH Code s.6(1)(f), EV-057) — and a wage slip each period (Form V under the Wages Rules; Form XVI under the OSH Rules — EV-053). Acceptance: at a 10+-worker establishment every onboarded employee receives a letter carrying the fields its applicable form prescribes, and a joiner with no letter is surfaced as a compliance gap rather than silently allowed; each wage slip reconciles line-for-line to the payroll run that produced it. **[Reversed]** Earlier drafts stated this duty "from employee one"; it attaches at the 10-worker establishment. **[Verified — central sphere]** (EV-053, EV-057)
- **Item 11 (ADMS/WDMS receiver).** Given an eSSL/ZKTeco terminal configured to HTTP-POST punch packets to a tenant-scoped URL, ingest punches with no on-prem middleware, static IP or port forwarding. Acceptance: a punch POSTed by a registered device appears against the correct employee inside the run window and is deduped against replays; an *unknown* device serial is quarantined for review, never silently written to a live roster. (Source: PRD §09, ADMS/WDMS outbound-POST path.) **[Verified]**
- **Item 12 (statutory-change watcher).** Surface amendments and corrigenda to *already-tracked* instruments, not only newly notified ones. Acceptance: a corrigendum to a notification the watcher already tracks (the class that inverted round one on the Nov-2026 EPF cliff, §02) raises an alert bound to the affected rule-version, with the change diffed against the version currently in force; a "no new notifications" period does not mean "no changes." (Source: PRD §02 corrigendum lesson; §02 standing rule.) **[Verified]**
- **Item 32 (onboarding import and tie-out).** Given a design partner's Excel/CSV export taken at a mid-year month, the import carries every head in §16.7's tie-out table and refuses go-live while any V-15 head (YTD taxable salary, TDS deducted, statutory contribution totals) differs from its independent record by more than ₹0 (AC-MIG-5). Acceptance: one real mid-year cutover passes with no tolerance override on a V-15 head; no column is silently dropped (AC-MIG-3); no carried UAN or IP produces a new member account (AC-MIG-4); and no employee record completes import without a consent-flow status from item 35. The named-source field maps remain item 17's. **[Hypothesis]** on AC-MIG-2's mapping target only; the tie-out rule itself is decided.
- **Item 33 (disbursement).** Given a LOCKED payroll month, the bank file's total equals Σ net pay to the rupee, or generation is refused (AC-901.1); release needs a payment approver who is not the processor (AC-904.1); a returned credit is re-queued against the named employee without re-paying any successful line (AC-903.1), and the month cannot be treated as DISBURSED for the on-time metric while an unexplained difference between Σ credited and Σ net remains. Acceptance: one real month on a design partner reconciles credited to net with every exception carrying a reason code.
- **Item 34 (CERT-In controls).** Acceptance is §17's (NFR-CERT-601–603), exercised before the first invoice: a tabletop incident reaches a report-ready state inside six hours; a log entry from the far end of the 180-day window is retrievable from Indian-jurisdiction storage; every log timestamp traces to an NIC/NPL NTP source (EV-062).
- **Item 35 (consent).** Given any employee — imported or newly hired — the product records a versioned consent record (FR-CHR-100) before it stores bank-account details or enrols a biometric template, and records a declined or pending status rather than a synthetic consent where none was given (FR-CHR-102). Acceptance: a schema scan finds no bank-account field populated for an employee whose consent status is neither "consented" nor a counsel-cleared alternative basis; an employee who declines biometric enrolment is still paid and still has a non-biometric attendance path (FR-CHR-101, §09); payroll computation is never blocked for an employee without consented bank details, whose disbursement runs as a tenant-configured exception recorded on the run. The notice text and the owner of the r.5(1) duty are counsel-cleared (CR-04, CR-22), not decided here.

Lint L4 (§05.17) requires every P0 item to carry an acceptance reference. Items 1, 5, 10, 13, 14 and 15 had none in this list; their R1 boundaries are:

- **Item 1 (rules-first engine).**
  - No statutory or monetary figure in any artefact, payslip, register or approval artefact has a model as its source; the statutory-figure interceptor refuses one at the boundary (§12.8.1).
  - Every computed figure carries the rule-version and evaluation-context reference it was computed under (FR-PAY-210); a figure without one is a D1 defect (§05.20).
  - A computation that reads an unset parameter halts with that parameter named as its blocker, never a default (Chain A A3); a payroll month cannot pass APPROVED (FR-PAY-301 M6) while such a blocker is open on a line inside the SLA.
  - Statutory bonus is computed provisionally and labelled so until F-09 clears, on the ceiling the operator confirmed with its recorded source (§06.7; PR-02).
- **Item 5 (state PT).**
  - A state is computable only when its rule pack is published (F-06); an establishment in an unpublished state gets no product-computed PT, and a figure the tenant supplies is carried and labelled as the tenant's own (§05.21).
  - For Maharashtra, the slab is applied on the monthly salary base with its gender split and the February ₹300 (EV-014; TV10), and no employee's annual total exceeds the ₹2,500 constitutional ceiling (Article 276(2)).
  - Per-employee state resolution applies wherever two or more of a tenant's states are published (PR-05).
  - Each state's return leg is its own row with its own fence: computation may ship without the return, never the reverse.
- **Item 10 (core HR).**
  - Every identifier sits at exactly one owning level with a declared uniqueness scope (FR-CHR-104); a second UAN for one person raises a continuity task, never a new member account (AC-MIG-4).
  - Headcount is kept as a time series (`band_history`, §05.11), never only as a current value.
  - The own-roll/contract flag, the International Worker flag and the worker classification are mandatory at hire and at import; a missing value is a named blocker for every obligation count that reads it.
  - No configuration can make Aadhaar mandatory (FR-CHR-101; CR-10).
- **Item 13 (assistant).**
  - Every outbound model call passes the redaction chokepoint with Aadhaar, PAN, bank account and IFSC, and biometric templates denied by default (§12.8.3).
  - The assistant drafts and explains, with a citation on every answer; it never submits, approves or computes a statutory figure (EV-090's parity commitments; §12).
  - A tenant with an RBI, SEBI or IRDAI profile starts with the assistant switched off (§12.8.3).
- **Items 14 and 15 (attribution and the provider seam).**
  - Every model call writes its attribution record — tenant, user, agent, model, tokens, cache and cost — before its response returns (NFR-OBS-1101); a call without one is a D3 defect.
  - Moving a feature to another backend is a configuration change, visible in the attribution records from its timestamp; no feature's code names a provider.

#### Acceptance criteria for the two load-bearing P1 bets

The two biggest *unvalidated* GTM bets (§20 V-02/V-15 for migration, V-05 for the CA channel) ship thin in v1 but still need a testable bar, because "ship thin" must not mean "ship broken":

- **Item 17 (migration importers).** Given a Tally/Zoho/Kredily/Frappe export taken mid-tax-year, reconstruct opening balances, YTD earnings, TDS-deducted-to-date, regime election (old↔new, ex-s.115BAC), UAN/ESI-IP identifiers, and leave/gratuity accrual to date. Acceptance is the §05.4 exit criterion made specific: ≥10 mid-year migrations with **zero reconciliation breaks** between the imported YTD/TDS state and the year's Form 138 salary data — checked against the TRACES-generated Form 130 once the Q4 format is released (EV-046, EV-048; Example D). Tally import comes first within P1 because Tally owns the accounting and statutory-artefact job (EV-032), even though Tally *payroll* adoption is unknown (§20 V-02); Zoho/Kredily/Frappe importers are acquisition infrastructure, budgeted as such. (Source: PRD §16.) **[Hypothesis]** on Tally export completeness — kill/validate (§20 V-15): if Tally's export omits fields needed to rebuild the year's Form 138 salary data, migration degrades to a services task and the "migration is a product surface, not a services task" thesis (§16) weakens; re-scope to assisted migration.
- **Item 20 (CA console).** Given a CA managing N client tenants, offer one-switch client context, a per-client compliance calendar (§05.9), one-click Form 138/PT export, and read-only audit access. Acceptance for the v1 *thin* console: a CA prepares, reviews and exports every client's artefacts, and records each attended submission, without a per-client re-login to our product; the portal step itself runs on the authority's portal under the client's credentials and written authority to act (§22). Productisation waits on evidence. (Source: PRD §18.) **[Hypothesis]** — the entire "design for the CA as a user" bet is unvalidated (§20 V-05, "no CA has been asked a single question"); kill/validate: if V-05 finds CAs read the product as disintermediation, the console is de-prioritised and the motion turns direct rather than CA-referred.

#### Sequencing rules that govern the table

- **Statutory before everything.** Items 1–12 are the filing spine and are all P0; the product does not exist commercially without them because the filing is the unit of delivery. No acquisition or monetisation feature outranks a filing artefact.
- **Data models built early, monetisation deferred.** Items 2, 14 and 18 (dual wage base, cost attribution, FBP) are built in v1 *specifically because retrofitting them later is expensive*, even though items 18/25 are not monetised until v2. This is the single most important sequencing principle in the section.
- **Architectural seams before the bands that need them.** Item 15 (provider abstraction) is wired minimally in v1 so that residency (a vision gate) does not require re-plumbing. Build the seam once; light up backends per band.
- **Unvalidated GTM bets ship thin, then productise on evidence.** Items 17, 20 (migration, CA console) are the biggest unvalidated bets (§20 V-02/V-15, V-05); they ship in a minimal form in v1 and are only expanded once the field programme confirms the CA channel is a channel and not an opponent.

**[Hypothesis]** The P0/P1 split assumes the §20 field programme validates the filing-SLA willingness-to-pay. Kill criterion: if §20 V-01 (CA/bureau real price) returns a monthly price under ₹2,000, the compliance-SLA premium that justifies building items 12/16 ahead of features collapses, and the sequencing re-orders toward acquisition (migration + free-tier import) over SLA depth.

---

### 05.6 Worked examples — how the bands behave at the boundary

Band edges are where the product's value is created or destroyed, because that is where the customer's obligation changes discontinuously. Eleven worked examples (A–K) show why the boundaries are drawn where they are and what the product must do at each — and, in Examples H–J, why the compliance surface is broader than the set of filings.

<!-- DIAGRAM: band-boundary-behaviors -->

#### Example A — The 20-crossing (the wedge event)

A Bengaluru services firm runs 18 people on Tally + a retained CA at ₹6,000/month. In March it hires 4, reaching 22.

- **What changes statutorily:** EPF registration becomes mandatory within the prescribed window (the window is the named parameter `epf_registration_window`, not stated here — §06, §20); ECR filing begins; a Grievance Redressal Committee is required once there are 20 or more *workers* (IR Code s.4 — the counting unit is workers, so the product checks it separately; EV-057). Nothing the spreadsheet-plus-CA setup was built for. (Source: EV-057; EPF Scheme 2026, §06.2.)
- **What the product must do:** detect the crossing (headcount is in the core HR master, item 10), surface the new obligations (statutory-change watcher scoped to *this tenant's* thresholds, item 12), prepare the establishment's EPF registration for the employer's attended portal session, prompt and track each employee's own UAN generation — since 1 August 2025 UAN allotment and activation is done by the employee through Aadhaar Face Authentication in the UMANG app, with the employer route surviving only for International Workers and Nepal/Bhutan citizens (EPFO Head Office circular dated 30 July 2025 — r4/04; one circular, so re-verify that it has not been superseded before building the flow) — confirm each UAN is Aadhaar-seeded before filing, and generate the first ECR (item 3, EV-035). Aadhaar stays optional: by default an employee who declines it is excluded from the filing that needs seeding and flagged with operator and employee notices, and is never blocked from payroll (§07; the final behaviour is a counsel decision — §23). EPFO offers only interactive browser upload — no API or bulk channel appears in any EPFO document reviewed — so every portal step is attended (§22).
- **Why this is the wedge:** below 20 the firm could rationally stay on free/Tally; at 22 the compliance surface jumps and a filing-SLA becomes worth paying for. **The 20-crossing, detected and handled inside the product, is the single highest-intent acquisition moment in the beachhead.** Acceptance: the product moves a tenant from "not registered for EPF" to "first ECR accepted by EPFO upload validation, approved by the employer and paid", with every portal step prepared in-product and performed in an attended session under written authority to act — no CA engagement needed, but the employer approves and pays, because its liability is non-delegable and an approved return can never be cancelled (EV-036).
- **Edge case within the edge case:** if the firm hires 4 as *contract* labour through a contractor rather than on its own rolls, the four do not reach 20 on its own rolls, but a principal employer can carry liability for contract workers (for wages, OSH r.98(8) — r5/04; for PF/ESI, statutory basis under counsel review — §23), and the headcount interacts with the OSH Code contract-labour threshold (50). The product must distinguish own-roll from contract headcount in the core master (item 10) so the obligation engine does not mis-fire in either direction. **[Hypothesis]** on prevalence — see §05.1 note.

#### Example B — The latching 10-test (why 10–19 is worth a funnel)

A seasonal Jaipur handicrafts exporter touches 11 employees for two months during peak, then falls back to 7.

- **What changes statutorily:** the gratuity and maternity-benefit tests read "ten or more employees are employed, or were employed, on any day of the preceding twelve months," so both obligations **latch** and do not switch off when headcount falls to 7 (CoSS First Schedule, Chapters V and VI — r1/06; §06). ESI also switched on at 11 (ten or more *persons*, Chapter IV), but its text carries no twelve-month look-back, so its behaviour on the fall to 7 is the unverified `esi_continuance_rule` (§05.1 note; §20). The firm now carries gratuity accrual and ESI it did not have before, at a headcount most vendors treat as free-tier.
- **What the product must do:** the obligation engine must be *latch-aware* — it cannot key a benefit purely to current headcount; it must track the twelve-month high-water mark per obligation, with each obligation's own look-back rule held as rule-version data rather than one shared latch. This is a data-model requirement in item 7 (gratuity/LWF accrual) and item 4 (ESI). Acceptance: after headcount falls to 7, the gratuity and maternity obligations remain active and the engine can state *which day in the preceding twelve months* triggered the latch (for audit defence); ESI stays active until an operator records a cessation decision against the parameter — the engine never auto-ceases it.
- **Why this justifies acquisition-serving 10–19:** the obligation is stickier than the headcount, so a firm that dipped above 10 once is a durable compliance customer even while it looks like a free-tier account. Serve it free, but instrument the latch so that when it crosses 20 (Example A) the upgrade path is already warm.

#### Example C — The ESI wage-ceiling crossing mid-period (the coverage-continuity trap)

A Coimbatore textile unit gives an employee a raise in July that takes monthly wages from ₹20,000 to ₹23,000 — above the ₹21,000 ESI ceiling — during the April–September contribution period.

- **What changes statutorily:** the employee does *not* drop out of ESI mid-period. ESI rules provide that an employee whose wages cross the ceiling during a contribution period remains covered (and contributions continue on the actual wages) until the end of that period; coverage ceases only at the next period boundary (October). (Source: ESI Act/Rules contribution-period continuity, as saved under CoSS s.164.)
- **What the product must do:** the ESI engine (item 4) must not naively drop the employee the month wages cross ₹21,000. It must continue contributions through September on actual wages, then re-evaluate at the 1 October boundary. Acceptance: the mid-period raise produces continued ESI challans through the period end, and the September→October transition is where coverage stops — not July.
- **Why this is a scope decision, not a detail:** getting this wrong under-contributes ESI and creates a compliance breach the *product* caused. It is exactly the class of edge case that separates "calculates payroll" from "delivers correct filings," and it is why item 4's acceptance criteria in §05.5 name it explicitly. **[Hypothesis]** dependency on the position after 22 Nov 2026 preserving period mechanics (§06.9) — if the successor changes the contribution-base definition, this logic needs rework (§05.7 fence).

#### Example D — Mid-year migration at 50 (the churn-trigger event)

A Pune manufacturing SME with 55 employees switches from a competitor in September (mid-tax-year).

- **What must carry over:** opening balances, YTD earnings, TDS already deducted this tax year, previous-employer income for new joiners (Form 122, ex-12B — EV-050), in-flight investment declarations (Form 124, ex-12BB — EV-050), certificate continuity across two systems for Form 130, EPF UAN and ESI IP continuity, leave balances, and gratuity accrual to date (§16).
- **Why mid-year is the hard case:** a 1 April cutover is clean; a September cutover means the *same employee has two partial-year payroll histories that must reconcile into one Form 138 Annexure II at Q4* — the salary summary TRACES uses to generate the single Form 130 (EV-046, EV-047, EV-048). The dual wage base (item 2) must recompute correctly against the rule version in force for each prior period, not today's version. A subtle trap: if the employee changed regime (old↔new, ex-s.115BAC) or crossed the ESI ceiling (Example C) *before* the cutover, the imported history must carry that state, not re-derive it from current values.
- **Acceptance (this is a v1 exit criterion, §05.4):** ≥10 tenants migrated mid-year with zero reconciliation breaks in the year's salary TDS data; the check against the annual certificate follows the Q4 format release (EV-046). Implementation friction is the most-cited churn trigger in the market; if migration is a services task rather than a product surface, the beachhead does not scale.

#### Example E — Multi-state PT at the 50→200 growth path (why PT is P0 but "all states" is P2)

A Hyderabad SaaS firm at 60 employees opens a Bengaluru office and a Mumbai sales team, reaching 140 across three states.

- **What changes statutorily:** Professional Tax is a *state* levy with no central uniformity — Karnataka, Maharashtra and Telangana each have their own slabs, periodicity and returns, and several states levy no PT at all (Delhi, Uttar Pradesh, Rajasthan, Haryana, Punjab and Uttarakhand, per an aggregator that cites no gazette — directionally reliable, unverified; r1/06); the constitutional ceiling is ₹2,500 per person per year under Article 276(2). Even the reported slabs disagree: two 2026 compilations publish incompatible Karnataka tables, and Maharashtra's PTRC filing periodicity is assigned per registration each year (r1/06). The firm now files PT returns in three different formats on three different calendars, plus LWF where a state schedules it. (Source: Constitution Article 276(2); state detail from r1/06, aggregator-grade except Maharashtra's slab, read at the state's primary rate schedule (EV-014; r2/10). **[Reversed]** Earlier text named Telangana as the verified exception; only its employer-registration wording was ever verified (EV-014).)
- **What the product must do:** item 5 (PT) ships the *states the first tenants operate in* as P0, each fenced until its slabs are gazette-sourced, and item 23 (all-states gazette-sourced dataset) is P2 because only Maharashtra's and Odisha's slabs, and Karnataka's effect, have been read at state primary source (EV-014) and aggregator PT data is materially disputed (EV-015; §20 V-09). Acceptance for v1: correct PT computation and return for the specific states of the design-partner tenants, with a per-establishment PT registration model so a multi-state tenant is representable even before every state's dataset is loaded.
- **Why this maps cleanly onto the phasing:** single-state PT is a beachhead reality (item 5, P0); *comprehensive* multi-state PT/LWF is a 200–999 requirement (item 23, P2) because that band is multi-establishment by nature (§05.3 gate). The example is the join between §05.5's priority split and §05.3's entry gate. It is also where the product differentiates: Frappe v16 has no state dimension anywhere in its payroll model, and Tally's PT slabs are hand-entered with no LWF engine (EV-031, EV-032). **[Hypothesis]** the all-states dataset is "undone-but-cheap" (§20 V-09); kill/validate: if gazette-sourcing all states proves materially harder than one state × N (e.g. many states publish only in regional-language gazettes), item 23 is re-priced and may gate v2 timing.

#### Example F — Gratuity eligibility at the 4-year edge (the accrual-vs-eligibility trap)

A Chennai IT services firm at 80 employees has an engineer who resigns at 4 years and 8 months of service, having crossed 10 headcount years ago; a fixed-term analyst's 14-month contract expires the same month.

- **What changes statutorily:** gratuity eligibility is not a clean "5 completed years." "Continuous service" is day-counted — 240 days actually worked in a year, counting lay-off, paid earned leave, employment-injury disablement and maternity leave up to 26 weeks (CoSS s.54 — r1/06) — and the five-year condition does not apply on death, disablement or fixed-term expiry, so the fixed-term analyst is eligible after one year of service (Central Rules — r1/06, r3/04). The amount is 15 days' wages per completed year, with a part-year over six months counted as a full year (s.53 — r1/06). Whether the engineer at four years and eight months satisfies the five-year condition through the 240-day count is a reading we are not able to verify from the evidence base — statutory basis under counsel review (§23). There is no statutory payout cap to apply yet: s.53(3) leaves it to notification and none has been located (r1/06; `gratuity_ceiling`, §05.5 item 7). **[Verified]** on the formula, day-counting, fixed-term eligibility and the unfixed ceiling; **[Hypothesis]** on the four-year edge.
- **What the product must do:** the gratuity engine (item 7) must separate *accrual* (a liability visible from day one of eligibility latching) from *eligibility at separation* (a day-counted test with population-specific conditions). A naive "5.0 calendar years" gate under-pays an eligible fixed-term leaver and creates a compliance exposure the product caused. Acceptance: the fixed-term analyst is flagged eligible at contract expiry; the engineer's case is computed both ways and routed to the operator with the counsel-pending flag rather than silently decided; payout is computed on the correct wage base (the add-back base, item 2 — gratuity re-bases on the same rule as PF) and falls due within 30 days of becoming payable (r3/04).
- **Why this is a scope decision:** it is another instance of the §05.5 principle that "calculates payroll" and "delivers correct filings and payments" are different products; the eligibility edge is exactly where a filing-first product must be right and a payslip-first product can be sloppy.

#### Example G — The international worker (why item 3's IW exception is not optional)

A Gurugram analytics firm at 45 employees hires a secondee from its US parent on an Indian payroll.

- **What changes statutorily:** International Workers remain in scope of the ECR (EV-045), and their EPS membership turns on the joining date (EPFO revamped-ECR FAQ Q6 — r5/02). Their PF contribution base is commonly described as full wages with no ₹15,000 ceiling, and their withdrawal position as depending on a social security agreement with the home country — neither is verified in this PRD's evidence base, so both are named parameters (`iw_contribution_base_rule`, `iw_country_agreement_status`) routed to §20 against the EPF Scheme 2026 text. **[Verified]** on ECR scope and the EPS joining-date rule; **[Hypothesis]** on the contribution base.
- **What the product must do:** the core master (item 10) must carry an IW flag and a country-of-origin field, and the ECR generator (item 3) must apply the IW contribution base from the parameter while applying the ₹15,000 ceiling for domestic employees on the same run. Because the employer UAN route survives only for International Workers and Nepal/Bhutan citizens (r4/04), the IW flag also routes this employee to employer-side UAN generation rather than the UMANG self-service path (Example A). EPS follows the joining date: IWs who became members after September 2014 with wages above ₹15,000 are not EPS members, while pre-September-2014 joiners above the ceiling contribute to EPS on full salary (EPFO revamped-ECR FAQ Q6; International Workers remain in scope of the ECR — EV-045). Acceptance is named in §05.5 item 3: a mixed roster including at least one IW produces an ECR that passes EPFO upload validation.
- **Why this maps onto scope:** IWs are rare in the beachhead, so IW handling is a candidate to defer — but the ECR file has **no IW field**: its eleven fields are wage and contribution values (EV-035), so the IW distinction exists only in the values the generator writes. The flag must therefore live in the master, because the file cannot carry it — the data-model seam (the IW flag) must exist in v1 even if the prevalence is low. **[Hypothesis]** kill/validate via §20: if <2% of beachhead tenants employ IWs, keep the full IW workflow P1 but retain the flag in the P0 master (the retrofit cost is in the data model, not the workflow — §05.5 "data models built early" principle).

#### Example H — The 50 and 100 crossings (obligations that produce no filing)

A Noida product firm grows from 44 to 52, then to 110 employees over eighteen months.

- **What changes statutorily:** at 50, a crèche is required — under the Code on Social Security's maternity chapter at 50 or more employees, and under OSH Code s.24 where more than 50 workers are employed (EV-057; r3/04); at 100 workers, a canteen (EV-057). A works committee is **not** automatic at 100: the appropriate Government "may" require one by general or special order (IR Code; r3/04 corrected the earlier "mandatory at 100" reading). None of these emits a periodic *return* the way EPF, ESI or PT does — they are facility and governance obligations, not filings.
- **What the product must do:** the obligation engine (items 10, 12) must represent obligations that have *no filing artefact*, and obligations that are *conditional on an order*. The crèche and canteen are surfaced as compliance tasks with an evidence slot (a facility or agreement record), an owner, and a tracked-to-done status, shown in the same compliance calendar (§05.9) as the filings; the works committee is a dormant task that activates only when the tenant records a government order against the establishment. Acceptance: at the 50-crossing the crèche obligation appears as an open task with an owner and a due status; at 110 the canteen task opens and the works-committee task does not, unless an order is on file; nothing is silently absent merely because it emits no challan.
- **Why this is a scope decision:** it forces the product's model of "obligation" to be strictly broader than "filing." The *unit of delivery* is the filing, but the *compliance surface* includes non-filing obligations, and a filing-first product that tracked only filings would still fail a labour inspection. This is the boundary between "files what it can file" and "tracks the whole obligation profile": v1 tracks both, and produces artefacts only for the obligations that have one. **[Verified]** thresholds; **[Hypothesis]** on how far v1 automates non-filing obligations versus merely surfacing them — kill/validate via §20 buyer interviews on whether crèche/works-committee tracking is a buying factor at 50–199, or a checkbox the buyer's CA already handles.

#### Example I — LWF, the smallest and most-ignored filing (why low-value is still in-scope)

A Maharashtra logistics firm at 90 employees, with a small Karnataka branch, must remit Labour Welfare Fund in both states.

- **What changes statutorily:** LWF is enacted in roughly 16 states/UTs, usually as flat rupee amounts rather than percentages, with periodicity varying between monthly, half-yearly and annual by state; the specific amounts and due dates are **unverified and demonstrably disputed** even for major states — Karnataka is variously reported at ₹20/₹40 and ₹50/₹100 a year (r1/06). The amounts are small, but a missed remittance is still a statutory default. Nothing about either state's cadence or rate is stated here as fact: each is a row of the named parameter `lwf_schedule[state]` (levy yes/no, employee and employer amounts, periodicity, due date, effective date, gazette citation), empty until the state's gazette row exists (§20 V-09).
- **What the product must do:** LWF accrual and remittance (item 7) must be *state-scheduled and per-establishment*, and the filing calendar (§05.9) must carry each state's cadence and rate separately, from `lwf_schedule`. Acceptance: once both states' rows are gazette-sourced, each remittance is surfaced on the compliance calendar with the sourced amount and date; until a state's row exists, that state's LWF appears as a *fenced, unsourced* task — never as a computed amount from aggregator data; and a state whose sourced row says "no levy" produces *no false obligation* (a spurious "you owe LWF" is as much a defect as a missed one).
- **Why this maps onto scope:** LWF is the clearest case of "low value, high miss-risk" — precisely the artefact a payslip-first product ignores and a filing-first product must not, because the SLA is measured on *every* due filing (§05.9), not only the large ones. It is also the sharpest reason item 23 (all-states dataset) is a real v2 dependency: LWF cadences and rates are exactly the disputed aggregator data the §20 gazette-sourcing programme (V-09) must replace — and neither incumbent has an LWF engine at all (EV-031, EV-032). **[Hypothesis]** per-state LWF rates/dates pending the gazette-sourced dataset; each state is fenced until sourced — same kill/validate as item 23 (§20 V-09).

#### Example J — Contract labour and principal-employer liability (why the master splits own-roll from contract)

A Chennai facilities-management SME at 70 own-roll employees engages 40 housekeeping workers through a licensed contractor.

- **What changes statutorily:** under the OSH Code (contract-labour threshold raised to 50 from the 1970 Act's 20 — EV-057), the establishment is within the contract-labour regime. On wages, OSH r.98(8) makes the principal employer the guarantor: if the contractor fails to pay contract labour within seven days of the wage period, the principal employer must pay in full or the unpaid balance within fifteen days and may recover it from the contractor (r5/04). On PF and ESI for contract workers, a principal-employer liability on contractor default is widely described but not verified in this PRD's evidence base — statutory basis under counsel review (§23). The principal employer also files the contract-labour annual return, FORM-XVII Part-III, by the last day of February (OSH r.98(9) — r5/04). The 40 contract workers do **not** count toward the firm's own-roll EPF/ESI headcount — but they *do* create a principal-employer assurance surface.
- **What the product must do:** the core master (item 10) must carry an own-roll-vs-contract flag with contractor linkage, so that (a) own-roll obligation thresholds are computed on own-roll headcount only, and (b) a principal-employer view can show each contractor's PF/ESI compliance status. v1 represents this in the *data model* (the same flag Example A needs) but does not fully file for contractors — contractor filing is the P2 contractor-compliance surface (§05.4, v2 modules). Acceptance: adding 40 contract workers does not falsely trip the firm's own-roll EPF recomputation, and the contract cohort is visibly distinct from own-roll in the master.
- **Why this is a scope decision:** it is the concrete form of the §05.1 principal-employer hypothesis. The retrofit cost sits in the data model (the flag), not the workflow — so the flag is P0 (built in v1) while contractor *filing* is P2, exactly per the §05.5 "data models built early, monetisation/workflow deferred" principle. **[Hypothesis]** prevalence — kill/validate via §20: if <15% of 50–199 tenants report contract labour, contractor filing stays P2 and only the flag ships in v1 (consistent with the §05.1 note).

#### Example K — Maternity-benefit continuity (the paid-leave filing edge)

A Kochi BPO at 130 employees has an employee who begins 26 weeks of paid maternity leave in October.

- **What changes statutorily:** Chapter VI of the Code on Social Security entitles her to **26 weeks** of maternity benefit (qualifying service 80 days; separate shorter entitlements for miscarriage and tubectomy), applicable because the establishment crossed the 10-employee latch (Example B) long ago (r1/06, r3/04). Her leave also counts as continuous service for gratuity up to 26 weeks (CoSS s.54 — r1/06). The computation basis of the benefit, whether the maternity payment is "wages" for the ECR and ESI returns, and how an ESI-insured employee's benefit is split between employer and ESIC are **not** stated here: they are the named parameters `maternity_benefit_base_rule` and `maternity_contribution_treatment`, routed to §20 against the notified text.
- **What the product must do:** payroll (items 1–7) must carry her as *active-on-paid-leave* — not a leaver, not a zero-pay month — so that gratuity continuous-service days keep counting, the maternity payment is computed from `maternity_benefit_base_rule`, and her ECR and ESI lines (items 3, 4) for the leave months follow `maternity_contribution_treatment` rather than whatever falls out of a zeroed variable-pay line. Acceptance: her record appears on every statutory return for the leave months in the state the parameter dictates, with an audit note naming the rule version; and her gratuity/leave accrual does not reset because variable pay went to zero.
- **Why this is a scope decision:** it is another "calculates payroll" vs "delivers correct filings" case — a payslip-first system can simply zero her variable pay and move on; a filing-first system must keep her in *every* statutory return at the right base for the whole leave. It also shows why the 10-latch (Example B) matters downstream: the maternity obligation rides on the same latched threshold, so the latch-awareness required in item 7's acceptance is load-bearing here too. **[Verified]** on the 26-week entitlement and the gratuity day-count; **[Hypothesis]** on both parameters — kill/validate against the Code and the 8 May 2026 Central Rules text before wiring the maternity-pay base.

---

### 05.7 v1 critical path and dependency ordering

Not all P0 modules can be built in parallel; some are hard prerequisites for others, and several are fenced on external events. The critical path determines the earliest coherent v1.

<!-- DIAGRAM: v1-critical-path -->

**The dependency spine (must be built in this order):**

1. **Rules-first engine + dual wage base (items 1, 2)** — everything downstream reads wages from here. No filing module can start until the two concurrent wage computations produce audited numbers.
2. **Core HR system-of-record (item 10)** — the employee/org/dependant master that every filing reads. Parallelisable with the engine but must land before any filing module integrates. It must carry the fields the edge cases need: own-roll vs contract flag (Example A), IW flag (item 3 acceptance), regime election (item 6), and per-establishment/state assignment (Example E).
3. **The filing modules (items 3–9)** — EPF/ESI/PT/TDS/gratuity-LWF/registers/documents. These can be built in parallel *with each other* once 1, 2 and 10 exist, **except**:
   - **ESI after 22 Nov 2026 (item 4) is fenced on §06.9** (§20 V-08). Mitigation: build the ESI pipeline against the current scheme with the rule-version seam already in place, so switching to the successor is a rule-version change, not a rebuild.
   - **Form 138 Q4 and Form 130 Part B generation (item 6) are fenced on the Q4 format.** Re-checked September 2026: Protean still lists the Q4 regular format as "expected to be released soon" with no link and no date, and the Q4 correction format is also unavailable (EV-046). The missing Annexure II is what blocks the certificate — TRACES builds Form 130 from Annexures I and II (EV-046, EV-047) — and the certificate is valid only if TRACES-generated (EV-048). Mitigation: ship Form 138 Q1–Q3 (format published 22 Jul 2026, FVU 1.2 — EV-052) and prepare Annexure II data continuously, so Q4 becomes a writer, not a data problem. Q4 is due 31 May and the certificate 15 June (EV-049; Rule 215), so the two cannot be planned as independent milestones.
   - **ECR arrear returns (item 3) are fenced**: arrears use a separate "File Arrear Return" flow and no arrear file layout is published anywhere public (EV-043). The monthly ECR generator is *not* fenced (EV-035).
   - **State PT and LWF slabs (items 5, 7) are fenced per state** until the state's row in the gazette-sourced dataset exists (§20 V-09); aggregator data never ships.
   - **Attended submission itself is fenced on counsel.** Acting on government portals under employer credentials, whether portal terms of use permit it, whether filing a TDS return for a deductor engages the e-Return Intermediary route, and handling of the authorised signatory's personal DSC — plus liability allocation and insurability — must be cleared before launch (§23). Until then every artefact ships portal-ready for the employer to submit.
4. **Statutory-change watcher (item 12)** — depends on the rule-version model existing (from item 2's effective-dating), because it writes new rule versions the engine then recomputes against.
5. **AI assistant + router + rate limits + attribution (items 13, 14, 15)** — the assistant depends on the filing modules existing (it explains and drafts against them, never calculates), but attribution (14) and the provider seam (15) should be scaffolded *first and in parallel*, because retrofitting them is the expensive case (§13).

**The fenced items, restated as go/no-go gates:**

| Fence | Blocks | Cannot ship v1-complete until | Interim posture |
| --- | --- | --- | --- |
| ESI position after 22 Nov 2026 unresolved | Item 4 (ESI), thus the ESI filing SLA | ESIC/MoLE notifies the successor (§06.9, §20 V-08) — time-critical | Build against current scheme behind the rule-version seam; treat successor as a version bump |
| Form 138 Q4 regular and Q4 correction formats unreleased | Item 6 Q4 generator and Form 130 Part B generation | CBDT/Protean release the Q4 format (EV-046) | Ship Form 138 Q1–Q3; prepare Annexure II data; distribute the TRACES-generated Form 130 when it exists (EV-048) |
| ECR arrear layout unpublished | Arrear returns under item 3 | EPFO's arrear layout is obtained from the authenticated portal (EV-043) | Monthly ECR ships (EV-035); no arrear generator; arrears surfaced as an attended task on EPFO's own flow |
| State PT/LWF slabs not gazette-sourced | Items 5, 7 (and 23) for that state | The state's gazette-sourced row exists (§20 V-09) | The state is not offered to a tenant; no aggregator data ships |
| Attended-filing legality not cleared | Attended submission for every artefact | Counsel clears the four questions plus liability allocation (§23) | Portal-ready artefacts that the employer submits; attended service does not launch |
| ESIC monthly contribution template unconfirmed | The ESI upload file under item 4 (not the computation) | The template is captured from the ESIC portal with a design partner and versioned as `esic_mc_template_version`; practitioner sources describe an Excel template of roughly six columns, never confirmed from an ESIC source (r3/05, low) | ESI computed and shown as a worksheet; the operator keys it into the portal template |

**[Verified]** Fence status as of September 2026 (EV-043, EV-046; Protean publishes the Form 138 Q1–Q3 format dated 22 Jul 2026 — EV-011 — and the August 2026 correction release covers Form 138 Q1–Q3 but not Q4 — r5/02). The ECR generator is **not** on this list: the layout is published and unchanged by the September 2025 re-engineering (EV-035). **[Hypothesis]** The mitigation via rule-version seam assumes the successor regimes are expressible as version bumps rather than structural changes; kill criterion — if the ESI successor changes the *contribution base definition* rather than rates, the seam is insufficient and item 4 needs rework.

**Why the seam is the right hedge, not a delay.** The rule-version seam (from item 2's effective-dating) is being built regardless, because the 50% add-back is "or such other per cent as may be notified" — a standing variable independent of the cliff (§06.10). So the marginal cost of routing ESI through the same seam is near zero, and it converts a hard external blocker into a version bump *for the rate case*. It does not save us if the successor redefines the base — hence the explicit kill criterion above. This is the general pattern the section relies on: build the seam once (item 15 for providers, item 2's versioning for rules), and external change becomes configuration rather than a rebuild.

#### The v1 artefact register — buildable now, fenced, deferred

The module table (§05.5) says *what* to build; this register says, artefact by artefact, whether its specification exists today, what blocks it if not, and which release carries it. "Buildable now" means the layout or rule is in the evidence base at [Verified] grade — not that it is easy. Every row names its source so the status can be re-checked rather than trusted.

| # | Artefact | Status | Specification source | Blocker / reason | Release |
| --- | --- | --- | --- | --- | --- |
| A-01 | ECR monthly return file — 11 fields, `#~#`, no header row | Buildable now | EV-035 (layout unchanged by the September 2025 re-engineering) | — | R1 |
| A-02 | ECR return-type handling — Regular, Supplementary, Revised guards | Buildable now | EV-036, EV-037 | — | R1 |
| A-03 | ECR chronological ledger per establishment | Buildable now | EV-038; §08 FR-PAY-712 | — | R1 |
| A-04 | NIL month and admin charges via Direct Challan Entry (no file) | Buildable now, as an attended task | EV-042 | — | R1 |
| A-05 | ECR part-payment contribution file — 6 fields, `#~#` | Buildable now | EV-044 | — | R2 |
| A-06 | ECR arrear return | **Fenced** | EV-043 | No arrear layout is published; obtain from the authenticated portal | R3, or deferred to v2 if still unobtained |
| A-07 | ESI contribution computation, contribution-period logic, ceiling crossing | Buildable now | ESIC coverage and contribution pages, re-fetched September 2026 (r1/06); period rule (r1/06) | Rates and ceiling predate the 8 May 2026 Rules — re-baseline (r2/10) | R1 |
| A-08 | ESIC monthly contribution upload file | **Fenced** | Practitioner descriptions only (r3/05, low) | Template not confirmed from an ESIC source (§05.7 fence table) | R1 if captured before launch, else R2 |
| A-09 | ESI treatment after 22 Nov 2026 | **Fenced** | §06.9; EV-004; §20 V-08 | No successor notified | R2 (as a rule version) |
| A-10 | Monthly TDS computation u/s 392 with regime election and Form 124 (ex-12BB) declaration capture; Form 122 (ex-12B) prior-employer intake | Buildable now | EV-050; §06.5 | Deposit dates under r.218 not yet read — [Hypothesis] (§05.9) | R1 |
| A-11 | Form 138 Q1–Q3 regular file | Buildable now | EV-051, EV-052; format of 22 Jul 2026 (EV-011) | — | R1 |
| A-12 | Form 138 Q1–Q3 correction file | Buildable now (generation and FVU validation) | August 2026 correction release (r5/02) | Submission held: in September 2026 the e-filing portal said Tax Year 2026-27 correction filing "will be enabled shortly" (§22.4.3; fence F-02, §05.18) | R1 (generation); submission on F-02 clearing |
| A-13 | Form 138 Q4 regular and Q4 correction files, incl. Annexures II and III | **Fenced** | EV-046, EV-047 | Formats unreleased, re-checked September 2026 | R3, when released |
| A-14 | Form 130 — distribution of the TRACES-generated certificate; Part B data readiness | Distribution buildable now; generation is never ours | EV-048 | Part B data depends on Q4 (EV-046) | R3 for Tax Year 2026-27 |
| A-15 | PT computation — Maharashtra (slab read at the state's primary rate schedule); the Maharashtra return | Computation buildable now; return **fenced** | EV-014; r2/10 | Return: periodicity is assigned per registration each year (r1/06), and the return format and due day are not captured (§19 `pt.MH.due_day`) | R1 (computation); return R2 on capture |
| A-16 | PT computation and return — every other state, including Telangana (slab never verified — EV-014, **[Reversed]**), Karnataka (effect read on the state portal; amending notification not retrieved — EV-014) and Odisha (rates read; a reported repeal from 1 April 2026 unconfirmed — r1/06) | **Fenced per state** | EV-014, EV-015; §20 V-09 | The state's primary-sourced row does not exist, or cannot leave DRAFTING for want of a complete citation (AC-RULE-002.3) | R2 per design-partner state; the rest P2 (item 23) |
| A-17 | LWF accrual and remittance — every state | **Fenced per state** | r1/06 (amounts disputed); §20 V-09 | The state's gazette row does not exist | R2 per design-partner state; the rest P2 |
| A-18 | Six registers plus wage slip, central-sphere forms | Buildable now | EV-053, EV-054, EV-055 | State-sphere forms are configuration, captured per state | R1 |
| A-19 | Appointment letter at 10+-worker establishments | Buildable where the state form is captured | EV-057 | The form is state-prescribed | R1 for captured states |
| A-20 | OSH annual return FORM-XVII, including the Part-IV EPF/ESI self-declaration | Buildable now (central sphere) | OSH (Central) Rules r.74, r.72(8) — r5/04; §06.11 | Submission channel not yet specified (§22) | R2 — due by the last day of February after each calendar year; the first such date after launch is in February 2027 |
| A-21 | SS unified annual return Form XXIII — only employers to whom CoSS Chapters V and VI apply | Buildable now (central sphere) | SS (Central) Rules r.53(5)(a) — r5/04; §06.11 | As A-20 | R2 — due by 28/29 February for the preceding year |
| A-22 | Gratuity payout computation and 30-day payment tracking | Buildable now, ceiling unset | CoSS ss.53–54 (r1/06); 30-day rule (r3/04) | `gratuity_ceiling` unnotified (§05.5 item 7) | R1 |
| A-23 | Attended submission of every artefact above | **Fenced** | §22; §23 | Counsel: the four attended-filing questions plus liability allocation | R2 on clearance; otherwise the §05.12 carve-out |
| A-24 | Principal-employer contract-labour annual return FORM-XVII Part-III | **Deferred** | OSH r.98(9) — r5/04 | Contractor surface is P2 | v2 |
| A-25 | Contractor work-order intimation on the Shram Suvidha Portal | **Deferred** | OSH r.94 — r5/04 | Contractor surface is P2 | v2 |
| A-26 | Contractor half-yearly return FORM-XVIII | **Not ours** | OSH r.98(7) — r5/04 | A contractor's own return; never auto-required of every employer (r5/04 caveat) | — (tracked as contractor evidence in v2) |
| A-27 | Bonus annual return (legacy Form D) | **Deferred** | r1/06 (unresolved) | Whether the obligation survives under the 2026 Central Rules is unconfirmed | Routed to §20; not in v1 |
| A-28 | Legacy 24Q correction statement for FY 2025-26 and earlier, for a quarter the prior system filed | **Deferred** | EV-052 names the legacy RPU 6.0 + FVU 9.5 stack; the legacy correction layout itself is not in this PRD's evidence base | Demand-driven: a migrating tenant's prior-year corrections stay with the prior vendor or its CA until the layout is captured through the §22 pipeline | Not in v1 unless captured; re-entry per §05.22 |
| A-29 | Form 123 (ex-12BA) statement of perquisites, which the employer issues | **Fenced** | EV-050 (the form mapping only); §06.5 | Its field layout and issue date under the Income-tax Rules 2026 were not read in any round (r5/02 open question); a desk read of CBDT's Form 123 guidance clears it (fence F-12, §05.18). Added in the v1.0 reconciliation: §11 carries Form 123 in four requirements and this register had no row (PR-15) | R3, with the Tax Year 2026-27 annual cycle |

**P0 check.** Every row tagged R1 belongs to a P0 module in §05.5; no row tagged R2 or R3 is labelled P0 anywhere in this section. A-08 is the one row whose release depends on a desk task rather than an external event — capturing the ESIC template is cheap, so it is scheduled before launch and only slips to R2 if the portal cannot be reached with a design partner. The same holds for two rows with a desk-task leg: the Maharashtra PT return (A-15) and the r.218 deposit dates behind A-10's on-time judgement (fence F-10, §05.18).

The fence table above predates the full register: five more fences have been found since it was drawn — Tax Year 2026-27 correction filing not yet enabled on the portal, the unread r.218 deposit dates, state-sphere register and appointment-letter forms, the Code-era bonus return, and the unread Form 123 layout — and all of them, with their lifecycle and SLA treatment, are first-class records in the fence register (§05.18).

**Named deferred artefacts.** The artefacts v1 deliberately does not produce, so that "not in v1" is a list, not an absence: the ECR arrear file (A-06) until its layout is obtained; the Form 138 Q4 files and Annexures II/III (A-13) until released; PT and LWF for any state without a gazette row (A-16, A-17); the principal-employer FORM-XVII Part-III and Shram Suvidha intimations (A-24, A-25), which belong to the v2 contractor surface; the legacy bonus return (A-27) until §20 confirms the obligation; and legacy 24Q corrections for quarters a prior system filed (A-28) until their layout is captured. Each re-enters on its named blocker clearing, never on a date; the re-entry mechanics and what is captured meanwhile are §05.22.

#### How an artefact's status is decided — the buildability test

The register's Status column is not a judgement call. It is the output of one scope decision and four criteria, applied to each artefact for the period it serves. Because the test is written down, anyone can re-derive a status, and a build team can see which criterion to watch for each row.

<!-- DIAGRAM: scope-phasing-buildability-test -->

| ID | Criterion | Passes when | Fails today for |
| --- | --- | --- | --- |
| BC-1 | Specification | The *structure* the artefact needs for the period — a file layout, a form, or a rule's shape and citation — is in the evidence base at [Verified] grade, as a published source the pipeline can capture and hash (FR-RULE-007). Values that change on a known cycle, such as a Finance Act's slabs or a VDA revision, are not part of this test. They arrive as rule versions through the pipeline, and a run whose period has no published values halts on the named parameter (Chain A, A3) | A-06 (EV-043); A-08 (r3/05, low); A-09, the ESI regime after the lapse (§06.9); A-13 (EV-046); A-16 and A-17 per state (EV-014, EV-015); A-19 per state, the appointment letter's form being wholly state-prescribed (EV-057); A-29 (r5/02); the A-15 return leg |
| BC-2 | Channel | The authority's submission channel for the period is open and its flow is known. A maintained record, such as a register, passes by definition | The submission leg of A-12 (F-02) |
| BC-3 | Legality | No counsel question gates the act itself, as distinct from who performs it | A-23 (Part D-17; F-08) |
| BC-4 | Producer | The artefact is prepared on the tenant's side, by the employer or deductor with the product, rather than by a third party: a contractor, or the authority's own system | A-26, a contractor's return (r5/04); the generation leg of A-14, because Form 130 is valid only if TRACES generates it (EV-048) |

The status is the first row below that matches.

| Order | Condition | Status | Rows it decides |
| --- | --- | --- | --- |
| 1 | The artefact is outside v1 by a scope decision: its module is sequenced P2 or later (§05.5), or change control has placed it in the deferred register (§05.22) | Deferred | A-24, A-25, A-27, A-28 |
| 2 | BC-4 fails | Not ours | A-26; A-14's generation leg |
| 3 | BC-1 fails | Fenced. The fence's class names who can supply the structure (§05.18) | A-06, A-08, A-09, A-13, A-16, A-17, A-19, A-29; the A-15 return leg |
| 4 | BC-3 fails | Fenced, counsel class | A-23 |
| 5 | BC-2 fails | Buildable now: generation ships and submission is held on an authority-portal fence | A-12 |
| 6 | None of the above | Buildable now | Every other row |

Re-derived this way, the 29 rows fall as follows: 15 buildable now (A-01 to A-05, A-07, A-10, A-11, A-12, A-14, A-15, A-18, A-20, A-21, A-22), 9 fenced (A-06, A-08, A-09, A-13, A-16, A-17, A-19, A-23, A-29), 4 deferred (A-24, A-25, A-27, A-28) and 1 not ours (A-26). Three buildable rows carry a leg with a different status — A-12's submission (held), A-14's generation (not ours) and A-15's return (fenced) — which is why each such leg is its own ledger row, and only that row carries the fence ID (lint L2). Four rows are instantiated per state rather than once: A-16, A-17 and A-19 are fenced in every state until that state's instance clears, and A-18 alone is buildable now because its central-sphere forms are notified (EV-053) and only its state forms wait on `F-11[state]`. A-19 has no central-sphere fallback — the appointment letter's form is prescribed by the appropriate Government (EV-057) — so with no state captured it produces nothing today, which is what the register means by “buildable where the state form is captured” and what the R1 tag “for captured states” records. Read that way the derivation agrees with the register's Status column on every row; a future disagreement is a finding for the next change-control review, not a matter of taste.

BC-1 separates structure from values on purpose. State PT fails on structure: Maharashtra's return format and due day are not captured, and every other state lacks a sourced slab. TDS does not. The structure of the salary-TDS computation is verified (EV-050; §06.5), while each Tax Year's slabs are values the pipeline publishes every year. §06.13 marks Tax Year 2026-27's figures as pending verification. That makes them an R1 rule-pack read (RP-08, §05.19), not a fence on A-10.

**The oracle — what checks a buildable-now artefact before its first real submission.** No sandbox exists on any portal we know of (§05.8), so the first real submission is always the final test. What differs between rows is whether anything *independent of our own reading* checks the output before then. Where nothing does, the risk sits at the first real submission, and the row carries the mitigations named here.

| Row | Independent oracle before the first real submission | Kind | Where there is none |
| --- | --- | --- | --- |
| A-01 ECR return file | EPFO's two Help File sample lines, byte for byte (TV16), and the packaging rules (TV18) | Published fixture | — |
| A-02 Supplementary and Revised returns | None published. The return-type guards exist only as rule text (EV-037) | Rule text only | SF-01, SF-02; the first genuine occurrence is compared with its fixture (H-5) |
| A-03 Chronological ledger | None published. The M−4 rule exists only as text (EV-038) | Rule text only | SF-04, SF-05 |
| A-04 NIL month | No file exists. The check is the portal's Direct Challan Entry screen (EV-042) | Portal only | SF-03; the first genuine NIL month runs co-attended (below) |
| A-05 Part-payment file | EPFO's two part-payment sample lines (TV33) | Published fixture | — |
| A-07 ESI computation | ESIC's coverage and contribution pages (r1/06), as TV3, TV4 and TV23 | Authority text | Re-baseline against the 8 May 2026 Rules (r2/10) |
| A-10 TDS computation | §08's worked examples on the FY2025-26 verified slabs, then the year's published slabs once read (RP-08) | Authority text | — |
| A-11 Form 138 Q1–Q3 | FVU 1.2, plus the official `138RQ1.txt` sample as the golden fixture (EV-052; r5/02) | Authority validator and published fixture | — |
| A-12 Form 138 corrections | FVU 1.2 | Authority validator | Submission held (F-02) |
| A-14 Form 130 distribution | The TRACES-issued certificate itself, reconciled under AC-707.2 | Authority output | — |
| A-15 Maharashtra PT computation | The state's primary rate schedule (EV-014), as TV10 | Authority text | — |
| A-18 Registers and wage slip | The notified central-sphere forms (EV-053, EV-055), as TV19 to TV21 | Notified form | — |
| A-19 Appointment letter, in a state whose form has been captured | The captured state form (F-11) | Notified form | — |
| A-20, A-21 Annual returns | The notified forms; scoping per TV24 and dates per TV53 | Notified form | — |
| A-22 Gratuity payout | The Code's formula and day counts (r1/06), as TV8 | Authority text | SF-06 for the review hold |

The three rows marked *rule text only* or *portal only* are where a misreading could reach the portal unseen. Each has a seeded fixture (§05.20). Each one's first genuine occurrence for a tenant also runs co-attended in Mode B, whatever mode the tenant chose, and is compared with its fixture — an extension of hypercare rule H-1 from families to these return variants, which applies inside or after hypercare. The oracle is recorded on the artefact family's readiness record (§05.20), because it decides whether that family has an AUTHORITY_VALIDATED step before its first submission.

#### What would re-fence a buildable-now artefact

"Buildable now" holds for a period; it is not a permanent property. A row goes back to Fenced only when one of its criteria fails again. A *published* change is not a fence: it arrives as a new format or rule version through the pipeline, with its golden cases (§22.8), and the family readiness record decides whether a first submission on it runs co-attended (§05.20). The table below lists the events the watcher is set to catch for each buildable-now family.

| Family | What would re-fence it | Criterion | Watch source | Until the new structure is captured |
| --- | --- | --- | --- | --- |
| ECR (A-01 to A-05) | EPFO announces a layout or validation change for a wage month but its specification cannot be retrieved. The revamped ECR is still formally a beta: no circular declaring general availability was found anywhere in EPFO's circulars index (r5/02 finding 15) | BC-1 | EPFO's revamped-ECR page and circulars at www.epfo.gov.in (EV-045) | Earlier wage months keep their format version, because FR-PAY-711 F4 resolves the format by period. Affected months are BLOCKED by the new fence |
| Form 138 Q1–Q3 (A-11, A-12) | A new FVU or RPU version for a Tax Year is announced before its utility is released. The stack is routed by period, and mixed versions are rejected (EV-052) | BC-1 | Protean's regular and correction download pages (AC-1005.2) | As above, per period |
| TDS computation (A-10) | Never a re-fence. A Finance Act whose values are unpublished at the Tax Year's first run is the Budget-cycle deadline (§05.15), and a product-caused miss if we are late | — | The Finance Act and CBDT notifications | The run halts on the named parameter. It never falls back to last year's values |
| Maharashtra PT computation (A-15) | An amendment to the state's rate schedule is read only in part, or its citation is incomplete (AC-RULE-002.3) | BC-1 | The state's primary rate schedule (EV-014) | The line returns to CARVED_OUT_FENCE (FL9); tenant-supplied figures are allowed (TSF-1) |
| Registers and appointment letter (A-18, A-19) | A state's commencement date or form change has not been captured | BC-1 | State gazettes, through the state onboarding pack (FR-RULE-017) | The state's lines follow F-11's interim posture |
| Operator-attended submission, once cleared | A watch item reopens a counsel answer (§23.17) | BC-3 | The counsel register (FR-LEG-040) | Modes A and B only, on that portal (FL9) |

A new fence on a row already in R1's build has a decided consequence, set out in §05.18 ("A fence that lands on an R1 row mid-build").

#### Build-order dependencies — two chains

The critical path above is stated per module. Underneath it are two dependency chains that fix the order in which the *foundations* are built, because every artefact in the register depends on both. Neither chain can be reordered without rework.

<!-- DIAGRAM: scope-phasing-release-plan -->

**Chain A — computation: compliance-data schema → engine → validators → generators.**

| Step | Produces | Cannot start until | Exit test |
| --- | --- | --- | --- |
| A1 · Compliance-data schema | The rule object — identity, jurisdiction scope, effective range, decision-time range, payload, citation and capture date, author, reviewer, publish state (§14) — plus the named parameters this section routes to §20 (`gratuity_ceiling`, `esi_continuance_rule`, `epf_continuance_rule`, `epf_registration_window`, `iw_contribution_base_rule`, `iw_country_agreement_status`, `pt_calendar`, `lwf_schedule`, `maternity_benefit_base_rule`, `maternity_contribution_treatment`, `esic_mc_template_version`) as empty, typed slots | Nothing — it is first | A change to the 50% add-back percentage is expressible as a new row with no code change (item 2 acceptance); an unset parameter is representable and blocks only the computations that read it |
| A2 · Engine | Payroll and statutory computation as a pure function of (inputs, rule-set version, evaluation context); context enumerated as disbursal date, as-of decision time, jurisdiction set and tax-regime election (§15) | A1 frozen for the R1 rule set | Identical inputs, rule-set version and context give identical outputs on re-run; a retro run recomputes against the rule version in force for the period (item 2); the §06.14 golden vectors pass |
| A3 · Validators | Pre-submission checks that mirror each authority's own checks at the same severity | A2 | Age-58 EPS case blocks; "joined after 1 Sep 2014 with wages above ₹15,000" flags, never rejects (EV-040); a Revised ECR after payment initiation is refused (EV-037); an unset parameter produces a named blocker, not a default |
| A4 · Generators | The artefact writers in the register (A-01, A-11, A-12, A-18 …) | A3 for that artefact | ECR output reproduces EPFO's published golden fixture lines byte-for-byte (r5/02); Form 138 Q1–Q3 files pass FVU 1.2 (EV-052); registers render in the notified central-sphere format (EV-053) |

**Chain B — obligations: registration model → calendar → filing ledger.**

| Step | Produces | Cannot start until | Exit test |
| --- | --- | --- | --- |
| B1 · Registration model | Group → legal entity → registration → establishment, with jurisdiction on the work location — state, sphere and the applicable Code-regime commencement date (§14; §07.2) | A1 (jurisdiction scopes are rule-object fields) | A 60-person tenant across three states and two legal entities is representable with each registration distinct — the tenant shape that breaks per-seat economics (EV-088; §13) |
| B2 · Calendar | A per-registration derived calendar of every due artefact, each entry carrying its rule citation (§06.11) | B1 | Every R1 artefact due for a design partner's registrations appears with its date and citation; a state whose gazette row is missing appears as a fenced entry, never as a date from aggregator data |
| B3 · Filing ledger | Per-establishment, unbroken, month-by-month ledger that refuses silent abandonment (EV-038; §08 FR-PAY-712) | B2, and A4 for the artefact it records | A skipped wage month is surfaced before it reaches the M−4 window that would block later Regular returns (EV-038); every entry links the rule version, the registration and the portal acknowledgement |

The two chains join at the ledger: a generator's output is not "done" until B3 records it against a registration and a rule version. That join is what lets the on-time metric in §05.8 be computed from the ledger rather than asserted.

#### Release plan — R1, R2, R3

v1 ships in three releases. The releases are gated on evidence, not dates, in the same way as the phases (§05.3–§05.4); the statutory calendar only constrains them where an annual artefact falls due.

| | **R1 — First invoice** | **R2 — Attended and annual** | **R3 — v1-complete** |
| --- | --- | --- | --- |
| Scope | The P0 list only: items 1–15 and 32–35, limited to register rows tagged R1 — the closed capability list C-01 to C-35 (§05.17) | P1 items 16–21; register rows tagged R2 — attended submission on counsel clearance (A-23), ESI successor as a rule version (A-09), design-partner PT/LWF states (the A-15 return leg, A-16, A-17), the annual returns (A-20, A-21), the part-payment file (A-05) and, if it slipped, the ESIC upload file (A-08) | Register rows tagged R3 — Form 138 Q4 and Annexures (A-13), Form 130 Part B readiness (A-14), the ECR arrear file if its layout has been obtained (A-06), the Form 123 statement (A-29) — and the first complete statutory year |
| Submission mode | Portal-ready artefacts that the employer submits, unless counsel has already cleared attended filing | Attended, assisted submission under written authority to act, if cleared; otherwise the §05.12 carve-out stays in force | As R2 |
| Entry criteria | The v1 entry criteria (§05.4); Chain A steps A1–A2 and Chain B step B1 complete; at least one design partner's real roster and registrations loaded | R1 exit criteria met; the counsel register (§23) shows a recorded answer — cleared or not — for each attended-filing question | R2 exit criteria met; the CBDT Q4 format released, or its carve-out formally declared (§05.12) |
| Exit criteria | The whole pre-launch gate in §05.8 passes, read per artefact family as §05.20 decides; the first paying tenant's first monthly cycle is recorded on the ledger with a portal acknowledgement for every R1 artefact due | Each annual return (A-20, A-21) produced for every tenant it applies to by its due date; attended submission live, or the carve-out declared in the SLA; a mid-year migration ties out to ₹0 variance on a design partner (§20 V-15); design-partner states' PT/LWF rows sourced | The whole v1 → v2 gate in §05.8 passes |
| Calendar constraint | None beyond monthly due dates | If R1 is live before February 2027, A-20 and A-21 must ship before 28 February 2027 — a hard deadline, not a target | For Tax Year 2026-27, Form 138 Q4 is due 31 May 2027 and Form 130 15 June 2027 (EV-049; r.215) |

**[Hypothesis]** The three-release split assumes the fences clear roughly in the order shown (ESI and attended-filing answers before the Q4 format). Kill/validate: if the Q4 format lands before counsel clears attended filing, R3's scope moves into R2 and R3 becomes the counsel-cleared attended launch; the P0 list is unaffected either way, because it never contained a fenced artefact.

---

### 05.8 Phase acceptance checklists

Each phase closes only when every box is checked. These are the operational form of the exit criteria in §05.4, stated so they can be tracked as a gate, not a sentiment. Each checkbox names its measurement so it is auditable rather than asserted, and carries an ID — V1X (v1 → v2), PL (pre-launch) and V2X (v2 → vision) — so the release gates in §05.20 and the tests in §05.24 can cite a box rather than paraphrase it.

**Metric definitions used below.** *On-time filing rate* = (filings whose portal-accepted artefact was submitted in the attended session and accepted by the authority on or before the statutory due date) ÷ (filings due) in the measured window, per artefact type, across all tenants — computed off the filing state machine in §08, including its REJECTED state; §19 owns the canonical definition. *Filing-SLA breach* = any due filing not accepted by its due date, root-caused (§05.9 taxonomy). *Migration reconciliation break* = any discrepancy between a migrated tenant's imported YTD/TDS state and the year's Form 138 salary data — and, once the Q4 format is released, the TRACES-generated Form 130 (EV-046, EV-048).

**v1 → v2 gate (all required):**

- [ ] **V1X-01** ≥40 paying tenants in 20–199, live ≥6 months *(billing-system count)*
- [ ] **V1X-02** Every v1 filing artefact generated *and accepted by the authority* across ≥1 full statutory cycle — Q1–Q3 of Form 138 at minimum; Form 138 Q4 and Form 130 only once CBDT releases the Q4 format (EV-046), otherwise a declared carve-out *(filing ledger)*
- [ ] **V1X-03** On-time filing rate ≥98% over a full quarter; every miss root-caused *(filing ledger, per artefact type)*
- [ ] **V1X-04** ESI position after 22 Nov 2026 resolved and shipped (§06.9, §20 V-08) *(rule-version registry shows successor version live)*
- [ ] **V1X-05** Statutory-change watcher has caught ≥1 real amendment/corrigendum in-flight *(watcher log with a dated real catch)*
- [ ] **V1X-06** All four cost-of-goods lines instrumented — supervised minutes per filing cycle per registration against the §13 target, curation cost per state, WhatsApp per message, inference per employee-month (EV-088; §20 V-04, V-14) *(cost-attribution ledger, item 14)*
- [ ] **V1X-07** ≥10 mid-year migrations with zero reconciliation breaks in the year's salary TDS data *(migration audit)*
- [ ] **V1X-08** ISO 27001 acquisition in progress or complete (seasoning clock started) *(certificate issue date)*

**Pre-launch gate (before the *first* paying customer, not just the 40th):**

The v1→v2 gate above measures a *running* operation, but there is an earlier, sharper gate that the artefact-plus-attended-submission promise depends on: the product must prove its artefacts pass the real authority portals *at all* before it charges anyone for them. This gate is R1's exit criterion (§05.7).

- [ ] **PL-01** Each R1 filing artefact (ECR, ESI contribution upload once its template is captured, PT return for each sourced state, Form 138 Q1–Q3) has passed **the authority's own validation** on a design partner's real data — EPFO upload validation, FVU for Form 138 (EV-036, EV-052) — and been submitted once for real: in an attended session under written authority to act if counsel has cleared attended filing, otherwise by the employer itself *(portal acknowledgement, per artefact)*. No test submissions to production portals: we are not aware of a sandbox on any of these portals as of September 2026, and an approved ECR can never be cancelled (EV-036). The statutory registers are maintained, not filed, so their gate is conformance to the notified formats (EV-053, EV-055), not a portal receipt.
- [ ] **PL-02** Attended-filing legality cleared by counsel — the four questions plus liability allocation (§23); if not cleared, launch proceeds on portal-ready artefacts the employer submits, and the SLA is narrowed accordingly (§05.12) *(counsel register entry)*
- [ ] **PL-03** The dual wage base (item 2) has been reconciled against a manual/CA-computed payroll for at least one real roster including an above-50%-excluded-components case *(reconciliation sheet, zero variance)*
- [ ] **PL-04** The ESI posture after 22 Nov 2026 is decided (successor shipped, or the rule-version-seam interim posture explicitly accepted, §05.7) *(rule-version registry)*
- [ ] **PL-05** The SLA liability boundary (§05.9) has had legal review and a contractible wording exists *(signed-off SLA clause)*

**Per-artefact reading of PL-01 (decided in §05.20).** PL-01 is evaluated per artefact family, not once for all four. An artefact family may be sold under the SLA only after it has passed PL-01; the first invoice needs PL-01 for the monthly families (ECR, and the ESI upload where captured) plus PL-02 to PL-05; Form 138 joins the SLA on its own first real quarterly submission, and until then it appears on every coverage statement as SLA_PENDING_FIRST_SUBMISSION (§05.21). The intent — never charge for a promise the product has not once kept — is unchanged; what changes is that a quarterly calendar no longer holds a monthly promise hostage.

The distinction from the v1→v2 gate matters: this gate is *"does each artefact pass the authority's validation, and complete one submission, correctly once?"* and blocks the first invoice; the v1→v2 gate is *"do we deliver every artefact on the calendar reliably at scale?"* and blocks the next phase. Charging for a filing SLA before clearing this gate would be selling a promise the product has never once kept. **[Verified]** the filing artefacts and portals (Source: PRD §01 filing set; §06).

**v2 → vision gate (all required):**

- [ ] **V2X-01** ≥5 paying tenants in 200–999, live ≥6 months, filing-SLA ≥98% *(billing + filing ledger)*
- [ ] **V2X-02** SSO/SCIM, multi-establishment, and all-states PT/LWF GA and audited *(audit report against gazette-sourced dataset, item 23)*
- [ ] **V2X-03** Permanent statutory desk + on-call support org operating *(org chart + on-call rota)*
- [ ] **V2X-04** ≥1 metered SKU showing non-zero realised attach revenue, modelled as a separate line from software PEPM *(finance: separate revenue line, per §11)*
- [ ] **V2X-05** ISO 27001 held ≥12 months (seasoning satisfied) *(certificate issue date vs today)*
- [ ] **V2X-06** Residency-selectable provider matrix live with ≥2 backends wired and in-country inference validated *(provider-matrix config, item 15/29)*
- [ ] **V2X-07** CERT-In point-of-contact named; 6-hour incident process audited — the obligation itself applies from day one (EV-062); this box is the audit *(incident runbook + audit)*

**vision entry gate (per deferred band, from §05.3):** 2,000+ private and PSU/BFSI each carry their own documentary gate; neither opens on a date, both open on evidence.

**How each box is evaluated.** The italic note on each box names its source; this table fixes the query, so two people evaluating the same box on the same day get the same answer.

| Box | Evaluated as | Source |
| --- | --- | --- |
| V1X-01 | Tenants whose `commercial_band` is 20–49 or 50–199 (§05.11) with an invoice in each of the last six months | Billing system |
| V1X-02 | For every artefact family in v1 scope, at least 40 paying tenants with a FILED instance for each period of one full statutory cycle; Form 138 Q4 and Form 130 counted only if F-01 has shipped, otherwise read from the declared carve-out | Filing ledger; fence register |
| V1X-03 | §19's On-Time Filing Rate over IN_SLA instances due in one full quarter, per artefact family, each at or above 98%; every miss carries a `miss_class` | Filing ledger; §19 metric register |
| V1X-04 | F-04 in state SHIPPED, or its outcome-table row applied with the carve-out declared | Fence register; rule-version registry |
| V1X-05 | At least one watcher-raised change request of class amendment or corrigendum that reached a published version while the instrument was already tracked | Pipeline log (FR-RULE-003) |
| V1X-06 | Each of the four COGS lines has a non-empty series for every paying tenant for the last full quarter | Cost-attribution ledger; FR-OPS-010 minutes |
| V1X-07 | At least 10 tenants whose first live wage month was not April, each with a §16.7 tie-out at ₹0 on the V-15 heads and no reconciliation break since | Migration audit |
| V1X-08 | An ISO 27001 certificate with an issue date, or a signed certification-body engagement | Certificate register |
| V2X-01 | Tenants in 200–999 with invoices in each of the last six months, at least 5, each with V1X-03's measure at or above 98% | Billing; filing ledger |
| V2X-02 | Release records for items 22, 23 and 24, and the audit report against the state-primary-sourced dataset (§20 V-09) | Release records; audit report |
| V2X-03 | The §22.10 desk roster and an on-call rota covering every due-date window | Desk roster |
| V2X-04 | A metered SKU with non-zero realised revenue booked on its own line, never blended with software PEPM (§11) | Finance ledger |
| V2X-05 | Certificate issue date at least 12 months before the evaluation date | Certificate register |
| V2X-06 | The provider matrix with at least two backends wired, and written confirmation of in-country inference for each (§20 V-13) | Provider configuration; confirmations |
| V2X-07 | A CERT-In point of contact on record and an audit report of the six-hour process | Incident runbook; audit |

#### The gate arithmetic at the minimum tenant count

V1X-03 is a rate, and at the tenant count the gate requires, a rate works out to a small whole number of misses. The numbers are stated here so a gate review does not discover them on the day.

| Check | Denominator at the minimum | Threshold | Misses the gate tolerates |
| --- | --- | --- | --- |
| V1X-03, a monthly family (the ECR) | 40 tenants × 3 wage months = at least 120 in-coverage instances in the quarter. The count is higher where a tenant holds two registrations (WE-2, §05.21) | On-Time Filing Rate at or above 98%. Every miss counts, whatever its class (§19.3 AC-8) | Two. 118 ÷ 120 = 98.3% passes; 117 ÷ 120 = 97.5% fails |
| V1X-03, Form 138 | 40 tenants × one quarterly statement per TAN = at least 40 | As above | None. 39 ÷ 40 = 97.5% fails |
| DG-2b, later, for the 200–999 band | In-coverage instances due in the quarter | Product-Caused Miss Rate below 2% (§19.9) | At 120 instances, two product-caused misses (1.7%) pass and three (2.5%) fail |

Three consequences follow, and all three are kept deliberately:

- **At the minimum count, the quarterly family has zero tolerance.** The 98% is a [Hypothesis] placeholder (§05.4, exit criterion 2), and one late Form 138 in forty is exactly the kind of evidence the gate exists to catch. A failing quarter does not carry forward: V1X-03 is read again on the next full quarter.
- **A tenant-caused miss uses the same allowance.** V1X-03 reads the rate the customer experiences, not the SLA's product-caused rate. The warning-lead-time duty (SS-3) therefore matters at the gate too: three misses in one monthly family fail V1X-03 even if we warned the tenant in time for each.
- **The allowance grows with registrations, not tenants.** WE-2's tenant adds two ECR instances a month, not one. Growing past 40 tenants widens the allowance only in proportion to the instances added.

---

### 05.9 The filing calendar the SLA is measured against

The maintained-compliance SLA is only meaningful if it is measured against *specific statutory due dates*, per artefact, per band. This is the operational core of "the filing is the unit of delivery": the product's headline metric (on-time filing rate, §05.8) is computed against the calendar below. A band cannot be committed unless we can deliver every filing it is obliged to produce — portal-accepted artefact plus attended submission — on this calendar, with root-cause discipline on every miss.

<!-- DIAGRAM: scope-phasing-filing-calendar -->

*The figure and the table are for Tax Year 2026-27, under the new vocabulary (Form 138, Form 130); historical periods keep the old forms (24Q, Form 16), and the product accepts both (EV-050). The figure deliberately shows no state PT or LWF date: those come only from gazette-sourced rows (§20 V-09), and the earlier shared calendar's Maharashtra and Karnataka dates were aggregator-grade.*

| Artefact | Cadence | Statutory due date | Turns on at | Source cue |
| --- | --- | --- | --- | --- |
| **EPF — ECR + remittance** | Monthly | By the 15th of the following month; return and payment are separate steps, 7Q interest on delay is mandatory, and months are filed strictly in order (EV-036, EV-038, EV-039) | 20 employees | EPF Scheme 2026 — "within fifteen days of the close of every month" (r1/06); rate per S.O. 3582(E) (EV-003) **[Verified]** |
| **ESI — contribution + challan** | Monthly | By the 15th of the following month — a national date, not state-dependent | 10 persons (20 for central-sphere-extended establishments — r1/06) | Regulation 31, ESI (General) Regulations 1950 (r3/02), saved under CoSS s.164 (EV-002); position after 22 Nov 2026 per §06.9 **[Verified]** |
| **ESI — contribution period** | Half-yearly | Apr–Sep / Oct–Mar (coverage-continuity boundary) | 10 employees | ESI Rules **[Verified]** |
| **TDS on salary u/s 392 (ex-s.192) — monthly deposit** | Monthly | By the 7th of the following month (March by 30 April) under the 1962 Rules' r.30; the Income-tax Rules 2026 prescribe deposit dates in r.218, whose dates are not yet verified — confirm before relying on them for Tax Year 2026-27 (§20) | Employee one | EV-050; §06.5 **[Verified]** for the 1962 Rules / **[Hypothesis]** for r.218 |
| **Form 138 (ex-24Q) — quarterly return** | Quarterly | Q1 31 Jul · Q2 31 Oct · Q3 31 Jan · Q4 31 May (of the year following the Tax Year) | Employee one | Rule 219, Income-tax Rules 2026 (EV-049); Q1–Q3 format 22 Jul 2026; Q4 format unreleased (EV-046) **[Verified]** |
| **Form 130 (ex-Form 16) — annual certificate** | Annual | By 15 June of the year following the Tax Year (Rule 215); TRACES-generated only (EV-048); Part B generation fenced on the Q4 format (EV-046) | Employee one | EV-046, EV-048 **[Verified]** |
| **PT — return + remittance** | State-specific (monthly/half-yearly/annual) | From `pt_calendar[state]`. Reported examples only: Karnataka monthly Form 5A within 20 days of the month's end (secondary sources — r3/02); Maharashtra assigns PTRC filing periodicity per registration each year (MAHAGST — r1/06); in Tamil Nadu and Kerala PT is a local-body levy (r2/10) | Per state | Maharashtra and Odisha slabs read at state primary source, Karnataka's effect read on its portal (EV-014) — none of their due days captured; **[Reversed]** earlier text here graded Telangana verified, but only its employer-registration wording was (EV-014); every other state **[Hypothesis]**, fenced until sourced (EV-015; §20 V-09) |
| **LWF — remittance** | State-scheduled | From `lwf_schedule[state]`; amounts and dates are disputed even for major states (r1/06), so no date is shown here | Per state | **[Hypothesis]** pending the gazette-sourced dataset (§20 V-09) |
| **Gratuity — payout on separation** | Event-driven | Within 30 days of the amount becoming payable | Accrues from 10 | CoSS s.56; MoLE Compliance Handbook 6.3 (r3/04) **[Verified]** |
| **OSH annual return — FORM-XVII** (incl. Part-IV EPF/ESI self-declaration) | Annual | By the last day of February following each calendar year | Establishments under the OSH Code | OSH (Central) Rules 2026 r.74, r.72(8) (r5/04; §06.11) **[Verified — central sphere]** |
| **SS unified annual return — Form XXIII** | Annual | By 28/29 February for the preceding year | Only employers to whom CoSS Chapters V (gratuity) and VI (maternity) apply | SS (Central) Rules 2026 r.53(5)(a) (r5/04; §06.11) **[Verified — central sphere]** |
| **Statutory registers** | Continuous | Maintained electronically; retained "five years after" or "five calendar years from" the last entry depending on the rule-set; the register OSH r.76 covers may not be destroyed even then unless transferred to a new register; state periods to counsel (EV-054) | Per Rules | EV-053, EV-054 **[Verified — central sphere]** |

Three consequences for scope drop straight out of this table:

- **The 15th of every month is the load spike.** ECR, ESI and (indirectly) the run that feeds them all cluster at mid-month, so the compliance-desk and the payroll-run engine must be sized for a monthly peak, not a smooth average (this is the org-design point of §13 made concrete, and the load profile the NFR section must plan capacity against). **[Verified]** cadence.
- **PT and LWF are the ragged edge.** Because both are state-specific with divergent cadences and disputed aggregator data, they are the artefacts most likely to cause an SLA miss for a multi-state tenant — which is precisely why item 5 (PT) ships beachhead-states-first as P0 and item 23 (all-states dataset) is P2 (§05.5, Example E). **[Hypothesis]** exact per-state dates pending the item-23 gazette-sourced dataset; kill/validate: if a beachhead design-partner operates in a state whose PT calendar we cannot source from the gazette, that state blocks that tenant's SLA and must be sourced before go-live.
- **Form 138 Q4 and Form 130 Part B are the deadlines we cannot yet promise.** Both are fenced on the CBDT Q4 format, still unreleased as of September 2026 (EV-046; §05.7), and the certificate itself is TRACES-generated (EV-048). Until the format lands, the SLA explicitly carves them out rather than silently missing them — an honest exclusion is better than a breached promise. **[Verified]** dependency.

**What the SLA actually promises (so it is contractible, not marketing).** For each artefact in the table, within the committed bands, the SLA is: *the artefact is generated, validated against the authority's current format, and — once the employer has approved and funded it — submitted in an attended session under the employer's written authority to act, on or before the statutory due date; every miss is root-caused and disclosed to the tenant.* It is explicitly **not** a promise of statutory outcome (the authority's acceptance, penalty waivers, or refund of the tenant's own liability): the employer's and deductor's statutory liability is non-delegable (§22), and the product does not indemnify the tenant's tax. **[Hypothesis]** the exact liability boundary (e.g. whether we bear late-filing penalties caused by *our* miss) is a commercial and legal decision, not a product one — liability allocation and insurability sit on the counsel register with the attended-filing legality questions (§23); kill/validate: legal review before the first paid contract, and re-price the SLA if penalty-bearing is required to win.

**The miss-taxonomy that makes "root-caused" auditable.** "Every miss is root-caused" is only enforceable if a miss has a defined cause taxonomy, because the liability boundary above turns on *whose fault* the miss was. Every SLA miss is classified into exactly one bucket, and the bucket determines who bears it:

| Miss class | Example | Who bears it | Product obligation |
| --- | --- | --- | --- |
| **Product-caused** | Engine emitted a wrong figure; a rule version shipped late (§05.15 Budget spike); an attended submission we were authorised and funded to make was not made | Us (pending the liability-boundary decision above) | Fix, disclose, and — if penalty-bearing is contracted — indemnify the late-filing penalty |
| **Tenant-caused** | Tenant did not fund the remittance; did not approve the run; supplied wrong PAN/UAN/bank data | Tenant | Surface the blocker *before* the due date with enough lead time to act; the product's duty is timely warning, not payment |
| **Authority-caused** | EPFO/ESIC/TRACES portal outage or format change on the due date; the Q4 format not yet published (EV-046, §05.7) | Neither (force majeure) | Prepare for the next available window, in the tenant's chosen submission mode; disclose; the carve-out for Q4 Part B (§05.7) is the pre-declared instance of this class |

This taxonomy is what lets the on-time-filing metric (§05.8) mean something: a raw "on-time rate" that mixed tenant-funding delays with engine bugs would be uninterpretable. The metric the desk is actually held to is the **product-caused** miss rate; tenant-caused misses are a *warning-lead-time* metric instead (did we flag the blocker early enough to be actionable?), and authority-caused misses are excluded. **[Hypothesis]** the split of real-world misses across these classes is unknown pre-launch — kill/validate via the first full quarter's filing ledger; if product-caused misses dominate, the desk is under-resourced (§05.15); if tenant-caused dominate, the fix is earlier/louder warnings, not more desk headcount.

#### Which calendar rows each release puts inside the SLA

The calendar above is the whole obligation surface; the releases take it in stages. This matrix is the per-row view of §05.7's register — where a cell says "fenced", the fence and its outcome table are in §05.18.

| Calendar row | R1 | R2 | R3 | v2 |
| --- | --- | --- | --- | --- |
| EPF — ECR and remittance | Regular, Supplementary and Revised (A-01, A-02); SLA_PENDING until the family's PL-01, then IN_SLA | Part-payment file (A-05) | Arrear returns if F-03 has cleared (A-06) | — |
| ESI — contribution and challan | Computation; the upload file only if F-05 has shipped; post-lapse periods fenced (F-04) | The upload file if it slipped; the post-lapse regime as a version (A-09) per F-04's outcome | — | — |
| TDS — monthly deposit | Computation in the SLA; deposit timing judged only once F-10 clears | — | — | — |
| Form 138 — quarterly | Q1–Q3 generated and validated; SLA_PENDING until the first real quarterly submission (§05.20 O2); corrections held while F-02 is open | — | Q4 and its Annexures II and III on F-01 (A-13) | — |
| Form 130 — annual certificate | Distribution of TRACES-issued certificates (C-15) | — | Tax Year 2026-27 once F-01 clears (A-14) | — |
| PT — return and remittance | Maharashtra computation (A-15) | Returns per state as F-06 ships for design-partner states (A-15 return leg, A-16) | — | Every state (item 23) |
| LWF — remittance | — | Per state as F-07 ships (A-17) | — | Every state (item 23) |
| Gratuity — payout on separation | Payout with the PH-01 review hold (A-22) | — | — | — |
| OSH annual return FORM-XVII | — | FORM-XVII with its Part-IV EPF/ESI self-declaration, for establishments it applies to (A-20) | — | Part-III, the principal-employer contract-labour return (A-24) |
| SS unified annual return Form XXIII | — | For employers to whom CoSS Chapters V and VI apply (A-21) | — | — |
| Statutory registers | Central-sphere forms (A-18); state forms per F-11 | Further states as F-11 ships | — | — |
| Appointment letter | States whose form is captured (A-19) | Further states as F-11 ships | — | — |
| Statutory bonus return | — (F-09) | — | Only if F-09 has cleared | — |
| Form 123 perquisite statement | — (F-12) | — | On F-12, with the Tax Year 2026-27 annual cycle (A-29) | — |

#### When a line's SLA starts, and when lateness makes a miss tenant-caused

The miss taxonomy above needs two boundaries it does not yet state: when a newly admitted line becomes our promise, and how late a tenant's own action can be before a miss is theirs.

| ID | Rule | Parameter and owner |
| --- | --- | --- |
| SS-1 | A line covers only instances whose due date falls at least `sla_onboarding_lead_days` after the coverage-statement version that first put the line IN_SLA. A tenant admitted on the 14th is not promised the ECR due on the 15th | `sla_onboarding_lead_days` — Filing desk lead; routed to §20 until the first design-partner quarter measures onboarding time |
| SS-2 | Periods before the tenant's first live wage month are never inside the SLA, including their corrections (A-28) | — |
| SS-3 | A miss is tenant-caused where the tenant closed inputs, approved, funded or signed later than `tenant_action_lead[family]` before the due date — provided the product's warning reached the tenant before that point. Without a timely warning the miss is product-caused, whatever the tenant did | `tenant_action_lead[family]` — Filing desk lead; routed to §20; it sits upstream of §22's `ops.handback_cutoff_minutes_before_due` |
| SS-4 | An instance whose due-date rule is unconfirmed (F-10; `pt_calendar[state]`) is never judged on time or late — §06.11 forbids an on-time metric against an unconfirmed date (§19.1.2); it is listed in the coverage-gap register | — |
| SS-5 | A line that leaves IN_SLA because a fence reopens drops out only for instances due after its notice takes effect; an instance already due stays judged under the version in force on its due date | — |

#### The deadline clock on a carved-out line

A carve-out is an honest exclusion from the SLA (§05.7, §05.9). It is not an exclusion from the obligation: the employer's and deductor's liability is non-delegable in every mode (§22), and the penalty clock does not pause because our fence is open. These rules fix what the product still owes on a line it cannot promise, so that "carved out" never degrades into "silently absent" — the failure this section's whole fence machinery exists to prevent.

| ID | Rule |
| --- | --- |
| DC-1 | A carve-out removes the promise, never the clock. Every carved-out line keeps its entry on the per-registration calendar (C-20) with its due date, its rule citation and its filing state, exactly as an IN_SLA line does |
| DC-2 | Where the due date itself is unconfirmed — F-10 open, or `pt_calendar[state]` unset — the line shows the obligation **without** a date and says why (SS-4). A convention may be displayed only labelled as one, as F-10's interim posture displays the 1962-Rules dates marked **[Hypothesis]**. No date is ever taken from an aggregator, and none is carried forward from a prior year as though it were this year's |
| DC-3 | The warning schedule is the same as an IN_SLA line's; only the remedy differs. The tenant is warned at the same lead `tenant_action_lead[family]` (PH-19) would give it, and the warning names what the tenant must do itself, by when |
| DC-4 | Every notice sent on a carved-out line is stored against the coverage-statement version it belongs to (§05.21). The carve-out's defensibility is that the tenant was told and what it was told; an unstored notice is a D4 evidence defect |
| DC-5 | **The interim posture has its own deadline.** Where a posture carries data (the F-01 annual store, the F-05 worksheet) or an artefact (the Mode A checklist), it is produced on the cadence of the filing it stands in for. A worksheet or checklist that appears after the due date is a **product-caused failure of the posture**, even though the line sits outside the SLA: a D5 defect at least, and D1 where the figure it carries is the one the tenant deducts or deposits |
| DC-6 | A missed instance on a carved-out line stays outside §19's on-time denominator and is recorded in the coverage-gap register with its cause class (§05.9). It is never counted as an SLA success anywhere — not in a metric, not in a renewal conversation |

**What the notice quantifies.** A deadline with no amount is not actionable, so wherever the product computes the figure the notice carries it, taken from the same approval artefact the run produced (FR-PAY-301 M6) and never recomputed for the notice. WE-1's tenant (§05.21) is the worked case: its ESI line is carved out on F-04 for every post-lapse period, and its fourteen covered employees on ESI wages of ₹18,000 produce 14 × (₹135 + ₹585) = **₹10,080 a month** — ₹1,890 of employee share and ₹8,190 of employer share (rates per r1/06, pending the re-baseline r2/10 names). Across a three-month carve-out the notice is naming **₹30,240**, of which ₹5,670 has already left employees' pay if PH-12's posture (a) is the one in force, and nothing has if posture (b) is. That is the difference the tenant is entitled to see on the line, monthly, while the fence stays open — and it is why PH-12 must be *set*, not defaulted, before any post-lapse month can LOCK (PL-04).

Where the product cannot compute the figure — an unsourced state's PT, a levy whose amounts are disputed — the notice carries the obligation, the deadline where one is known, and the statement that the figure is the tenant's to determine (TSF-1), never an estimate. An estimate on a carved-out line would be the aggregator problem (EV-015) wearing a notice's clothes.

---

### 05.10 Competitive displacement at each band boundary

Scope is not only what we build; it is who we take share from, and *how*, at each band. §04 and §21 establish that computation is free (EV-029), the priced floor sits near ₹50 PEPM (EV-027), each of the six EV-027 vendors bills a 50-employee minimum block (EV-026) and no vendor in that set claims to submit a filing (EV-030); this table makes the displacement argument band-by-band, so the sales motion in §05.1 has a named opponent and a named wedge rather than a generic "we're better."

| Band | Primary alternative | How the alternative is beaten (or why it isn't) | Verdict consistency |
| --- | --- | --- | --- |
| 1–9 | Kredily (free), Zoho (₹0 to 10) | Not beaten on price — declined commercially (§05.1). Any pitch here is a funnel touch, not a sale. | Decline commercially |
| 10–19 | Kredily free, Frappe self-host | Beaten on *filing delivery*: Kredily gives computation away and charges for outputs — challans, the annual tax certificate (EV-029); Frappe computes gross-to-net well but produces no Indian statutory artefact at all (EV-031). **[Reversed]** earlier drafts said Frappe "files but you self-operate"; it files nothing. ACV is a funnel number — serve free, latch the obligation (Example B). | Acquisition only |
| 20–49 | Zoho ₹1,000, HivePayroll, RazorpayX, Kredily | Beaten on **quality-of-delivery**: the band is served free for computation (EV-029), over-billed for seats it does not have by all six EV-027 vendors (EV-026), and served by no vendor that claims to submit (EV-030). The 20-crossing (Example A) is the displacement moment. | Beachhead — lower half |
| 50–199 | greytHR, Keka, Zoho paid, factoHR | Beaten on **maintained-compliance SLA + attended filing + migration**, not feature count. Against Tally, win on attended, assisted filing, maintained state PT/LWF data (which Tally lacks — EV-032), an employee surface and a CA console — never a form-parity pitch (§21). | Beachhead — revenue core |
| 200–999 | Keka, greytHR, PeopleStrong, Darwinbox lower tiers | Reachable on the *same product shape* once multi-establishment + multi-state PT/LWF + a named reference exist (§05.3 gate); the wedge shifts from SLA to SLA-plus-scale-config. | Expansion (v2) |
| 1,000–1,999 | Darwinbox, PeopleStrong, Ramco, ZingHR, Keka enterprise | Needs SSO/SCIM depth + a support org we will not have until v2 is proven; same filing core, procurement-shaped surface. | Expansion (late v2) |
| 2,000+ / regulated | Darwinbox, PeopleStrong, Oracle, SAP SF, Ramco | Not displaced by product — foreclosed by arithmetic (§05.2). Entry is references + seasoned certificate + residency, on documentary gates. | Defer |

Two displacement facts that constrain the whole table and must not be forgotten in a later deck:

- **Two incumbents, two jobs — not one incumbent.** Tally owns accounting and the statutory artefacts; greytHR owns the HRMS job (§21). **[Reversed]** Earlier drafts called TallyPrime "the real incumbent" and "statutorily complete at ₹0 incremental, all in the base licence". It does ship PF Forms 3A/5/6A/10/12A + ECR, ESI 3/5/6, a PT statement, Form 16, 24Q annexures, 12BA, 27A, NPS and gratuity (whether those forms are current with the latest Finance Act is one of four unresolved cells) — but no state PT slab table (slabs are hand-entered), no LWF engine, no leave module, no leave-encashment calculation (its own FAQ), manual attendance vouchers only, and multi-user access only at Gold, three times the Silver price (EV-032; product documentation read, not executed). How many firms actually run Tally *payroll*, as distinct from owning the capability, is unknown (§20 V-02). A form-parity pitch against Tally still loses; we win on what it does not do — attended filing, maintained state PT/LWF, an employee surface, a CA console and maintained statutory updates. **[Verified]** capability (EV-032); adoption unknown.
- **Zoho can go to zero across the 1–25 band at will** — it already gates three products on a size proxy (Payroll ₹0 to 10, People ₹0 to 5 users, Books ₹0 below ₹25 lakh revenue), each of which converts automatically as the customer grows. Do not build a plan that requires Zoho *not* to widen those gates; the risk register (§20 R-1) pre-commits the response — move the floor to 50 and lean on attended filing and the CA console — neither of which we are aware of Zoho selling as of September 2026, and the first of which no vendor in the six-vendor set claims either (EV-030) (Source: §04, §20). **[Verified]** gate shape; **[Hypothesis]** timing of any widening.

**The honest failure mode per band, so the sales motion plans for the loss and §20 can disprove it:**

- **20–49 — we lose to *free*.** A founder will not pay ~₹100 PEPM while Kredily is ₹0 and Zoho is ₹1,000, *unless* the 20-crossing pain (Example A) is acute enough that a filing SLA is worth buying. The entire funnel thesis (§05.1) is the bet that enough of these cross into 50+ before churning to free; if they do not, the band is net-negative (§05.1 kill criterion). **[Hypothesis]** — kill/validate is the §05.1 month-18 graduation cohort.
- **50–199 — we lose to *incumbent inertia and "Tally + a CA is good enough."*** The buyer's CA may already produce the artefacts — on Tally or otherwise (Tally payroll adoption is unknown, §20 V-02) — so the sale is switching-cost, migration (Example D) and the maintained-SLA, never feature count. The failure mode is a smooth-running incumbent setup the buyer sees no reason to disturb; the wedge is a visible bureau line item and audit/scale pain (§05.1). **[Hypothesis]** — kill/validate via §20 V-01 and V-16 (what the bureau actually charges and misses).
- **200+ — we lose to *no reference at the buyer's scale*** (§05.3 bake-off), which is why the band is gated on references, not reach.

Naming the loss per band is what keeps §05.1's verdicts falsifiable: a verdict of "beachhead — revenue core" is a *claim we can win 50–199*, and its failure mode above is exactly the thing the §20 field programme exists to disprove before funding.

---

### 05.11 How a tenant graduates between bands, inside the product

Because the beachhead is split (§05.1) and the whole model depends on 20–49 lands expanding into 50–199 (the §05.1 kill criterion is a *graduation-rate* test), band graduation cannot be a spreadsheet event in the sales team — it must be a product behaviour. The unit of delivery being the filing makes this precise: a tenant "graduates" when its *obligation profile* changes, and the product detects and acts on that change.

| Transition | What triggers it | What the product does automatically | What a human confirms |
| --- | --- | --- | --- |
| 10–19 → 20+ | Headcount crosses 20 (own-roll) in the core master | Latch EPF obligation; prepare the establishment's EPF registration for an attended portal session (§22); prompt and track each employee's own UAN generation via UMANG face authentication (employer route only for International Workers and Nepal/Bhutan citizens — r4/04); surface the Grievance Redressal Committee requirement (20+ workers — EV-057); move commercial tier off the funnel floor | Founder confirms EPF registration; billing tier change |
| 20–49 → 50–199 | Headcount crosses 50 | Open the crèche task; surface contractor/principal-employer surface if contract labour flagged; unlock multi-state PT config if new establishments exist | HR lead confirms new establishment registrations |
| 50–199 → 200+ | Headcount crosses 200 (usually multi-establishment) | Flag standing orders and retrenchment/closure approval (both at 300 workers — EV-057) as approaching; confirm the canteen task (100 workers) is closed and whether any government order requiring a works committee is on file (not automatic at 100 — r3/04); recommend v2 multi-establishment config | Sales-assisted; this is a v2 sale, not a self-serve tier bump |

Two product requirements fall out of this:

- **The obligation engine is threshold-driven and latch-aware, not tier-driven.** Obligations turn on at statutory thresholds (§06), and some latch (Example B); the *commercial* tier is a separate concern that follows the obligation, never the reverse. Conflating them (as a pure per-seat pricing tier would) causes the product to under-serve an obligation the moment a customer shrinks below a threshold it has already latched. **[Verified]** thresholds and the gratuity/maternity latch (Source: CoSS First Schedule — r1/06).
- **Graduation is instrumented as the core funnel metric.** The §05.1 kill criterion — "<25% of 20–49 lands cross into 50+ within 12 months → stop acquiring the lower half" — is only measurable if every crossing is a logged event with a date. This is why headcount lives in the core master (item 10) as time-series, not a current-value field. **[Hypothesis]** the 25% graduation threshold is a placeholder; kill/validate via the month-18 cohort analysis named in §05.1.

**The downward transition is not symmetric — obligations latch, commercial tiers do not.** The table above is all upward; shrinkage is the case that most often breaks a naïvely tier-driven product. If a tenant *falls* below a threshold it has already crossed, the latched obligations — gratuity and maternity benefit, whose text reads "employed, or were employed, on any day of the preceding twelve months" (Example B) — **stay on**, even as the commercial tier may drop: a firm that fell from 12 to 7 still accrues gratuity. ESI and EPF are the asymmetric cases: their applicability texts ("ten or more persons are employed"; "twenty or more employees are employed") carry no such look-back (r1/06), and whether and when either ceases on sustained shrinkage is governed by continuance provisions this PRD has not verified. So the product never lets a headcount dip switch either off: ESI and EPF stay active until an operator records a cessation decision against the named parameters `esi_continuance_rule` and `epf_continuance_rule`, routed to §20. **[Verified]** the textual asymmetry (Source: CoSS First Schedule, Chapters III–VI — r1/06). **[Hypothesis]** both continuance rules — kill/validate against the Code and the 8 May 2026 Rules before the engine is ever allowed to propose a cessation automatically (a wrongful cessation is as much a product-caused breach as a wrongful charge, §05.9 miss-taxonomy).

#### Band classification — the data definition

The product computes two different things from headcount and never lets one stand in for the other. **Obligation applicability** is evaluated per obligation, on that obligation's own counting unit (workers, employees or persons), scope (establishment or legal entity) and look-back, all read from the rule object (§06.1; §14.6.1b) — EV-057 makes counting unit and sphere schema fields for exactly this reason. **Commercial band** is one value per tenant, used only for admission (§05.21), phase eligibility (§05.4) and GTM routing (§18.6). Nothing statutory ever reads the commercial band.

| Field | Definition | Rule |
| --- | --- | --- |
| `own_roll_headcount` | Count of distinct persons with an active own-roll employment at any establishment of the tenant on the last calendar day of the most recent LOCKED payroll month | Contract workers are excluded (item 10's own-roll/contract flag; Examples A, J); a leaver counts until the last working day recorded on the exit |
| `commercial_band` | The band containing `own_roll_headcount`: 1–9, 10–19, 20–49, 50–199, 200–999, 1,000–1,999, 2,000+ — closed integer intervals | Recomputed when a payroll month reaches LOCKED, never on an intra-month edit |
| `band_history` | Append-only series of (`payroll_month`, `own_roll_headcount`, `commercial_band`) | Feeds the graduation metric (§05.11; §19.12.2 Band-Crossing) and is never rewritten by a retro run |
| `band_crossed_at` | The first LOCKED month whose band differs from the previous LOCKED month's | Emits a `band.crossed` event; the event opens the transition actions in the table above |
| `obligation_state[obligation]` | Active or inactive, with the triggering date and rule version | Computed by the obligation engine alone; a latch or an unverified continuance rule keeps it active regardless of `commercial_band` |

Edge cases the definition has to survive, with the behaviour each gets:

| Case | Commercial band | Obligation behaviour | Why |
| --- | --- | --- | --- |
| Exactly 20 own-roll on the last day of the month | 20–49 from that month | EPF per its own rule, which may already have triggered | Closed interval |
| 19 on the last day, 21 on the 10th | 10–19 | The obligation engine evaluates EPF on its own counting rule; if that rule triggers, EPF opens even though the band has not moved | Band is month-end; obligations are not band-driven |
| Two legal entities of 15 each (tenant total 30) | 20–49 | EPF evaluated per the rule's scope; neither entity may owe it, and the coverage statement then shows EPF NOT_APPLICABLE for both (§05.21) | The tenant is a commercial unit, not a statutory one |
| 40 own-roll plus 40 contract workers | 20–49 | The contract-labour regime's own count applies (EV-057); whether contract workers count toward the principal's own thresholds is open (CR-48), so no own-roll threshold is ever tripped by them | Example J |
| 25 employees of whom 8 are managers | 20–49 | An obligation counted in *workers* (the Grievance Redressal Committee at 20 or more workers — EV-057) reads each person's worker classification (FR-PAY-107), never the band | Counting unit differs by obligation |
| Seasonal 11 → 7 (Example B) | 10–19, then 1–9 | Gratuity and maternity latch; ESI stays until an operator records cessation against `esi_continuance_rule` | Obligations latch, bands do not |
| 22 → 18 after EPF opened | 20–49, then 10–19 | EPF stays active until an operator records cessation against `epf_continuance_rule`; the coverage statement keeps the EPF line, so the SLA the tenant bought does not silently lapse | Whether a sub-20 tenant with a live EPF obligation is billed on the File tier is §18's decision, routed there |
| A v1 tenant grows to 230 | 200–999 | Unchanged | Retained on v1 coverage; admission rule AD-03 (§05.21) |

**[Hypothesis]** Month-end own-roll headcount is the right commercial measure for a seasonal workforce. Kill/validate: if the first design-partner year shows any tenant's band crossing the same boundary (20 or 50) in both directions within one quarter, add a hysteresis parameter owned by the GTM lead (`band_downgrade_months`, routed to §20) — obligations are unaffected either way.

---

### 05.12 Phasing risk register (scope-specific)

The PRD's §20 carries the product-level risk register (Zoho gates, Gemini price, FX, Frappe bake-off, fintech subsidy, state-rule unevenness, assistant convergence). The risks below are specific to *this section's phase plan* — the things that would force a re-phasing rather than a product change. Each carries an observable trigger and a pre-agreed re-phasing response, in the §20 discipline of "a trigger and a response, not a severity rating nobody acts on."

| Phasing risk | Observable trigger | Pre-agreed re-phasing response |
| --- | --- | --- |
| **ESI successor is structural, not a rate change** | ESIC/MoLE notifies a successor that redefines the *contribution base*, not just rates (§05.7) | Item 4's rule-version seam is insufficient; ESI moves off the v1 P0 critical path to a fast-follow, and v1 ships EPF/PT/TDS-complete with ESI flagged "pending successor implementation" rather than delaying the whole release (Source: §05.7 blocker) **[Hypothesis]** |
| **Q4 regular file format never lands in the v1 window** | CBDT has not published the Q4 format by the v1 first-annual-cycle date (§05.7); for Tax Year 2026-27, Q4 is due 31 May 2027 and the certificate 15 June 2027 (EV-049; Rule 215) | Form 138 Q4 and Form 130 Part B stay carved out of the SLA (§05.9); the v1→v2 gate's full-cycle criterion is met on Q1–Q3, and the Q4 generator and Part B generation become a v1.x fast-follow rather than a v1-exit blocker. **[Reversed]** earlier text said the criterion could be met "on Part A + Form 138 Q4" — Q4 itself is fenced, and Form 130 is TRACES-generated (EV-046, EV-048) **[Verified]** dependency |
| **Attended filing is not cleared by counsel** | Counsel's answer on any of the four questions (portal credentials, portal terms of use, the e-Return Intermediary route for TDS returns, the signatory's personal DSC) or on liability allocation is negative or still open at launch (§23) | v1 launches on portal-accepted artefacts that the employer submits itself; the SLA narrows to artefact readiness and warning lead time; attended submission — the one thing no vendor in the set claims (EV-030) — moves to a fast-follow gated on counsel **[Hypothesis]** |
| **20–49 does not graduate** | Month-18 cohort shows <25% of 20–49 lands crossing into 50+ within 12 months (§05.1) | Raise the commercial floor to 50; stop paid acquisition of 20–49 (still serve free as funnel); re-plan v1 revenue on 50–199 only **[Hypothesis]** |
| **Filing-SLA is not a willingness-to-pay driver** | §20 V-01 finds a bureau runs 50-person payroll under ₹2,000/month with a <2% miss rate | Re-order §05.5 toward acquisition (migration + free-tier import) over SLA depth; the compliance-SLA premium that justifies items 12/16 ahead of features collapses (§05.5 kill criterion) **[Hypothesis]** |
| **v2 reference gate cannot be met** | No 50–199 tenant will act as a named quotable reference within the v2 entry window (§05.3) | v2 slips (documentary gate, not date — §05.3); do not open 200–999 sales on an unreferenceable base, because the band runs bake-offs (§05.3 kill criterion) **[Hypothesis]** |
| **Enterprise arithmetic softens (upside risk)** | A target PSU/BFSI tender invokes the GFR startup exemption *and* we hold a seasoned ISO 27001 (§05.2/§05.3) | Opportunistically bid the single tender; do **not** re-phase the roadmap around it — the exemption is buyer-discretion and uncontrollable (Source: GFR 2017 Rules 170(i)/173(i)) **[Verified]** |
| **Support org cannot scale to a permanent statutory desk** | Hiring for the §13 compliance-maintenance operation lags the registration count entering v2 — supervised filing scales per registration × state × filing type, not per tenant (EV-088) | Slow tenant intake to match desk capacity rather than breach the SLA; the SLA is the product, so an under-staffed desk is a scope problem, not just an ops one (Source: PRD §13 org-design consequence; §22) **[Verified]** |

The through-line: every re-phasing response protects the same invariant — **we do not commit a band whose filings we cannot deliver on the calendar in §05.9 with the SLA in §05.9 behind them.** A phase slips before that invariant breaks.

**How each risk reaches the release machinery.** A response is only pre-agreed if it is wired to something that executes it. Each row names the fence, gate check or hold the risk arrives through, and what the ledger does when it fires.

| Phasing risk | Arrives through | Release consequence | What the ledger does |
| --- | --- | --- | --- |
| ESI successor is structural | F-04, third outcome (§05.18) | RS6 on whichever release holds A-09 | A-09 re-tagged to a fast-follow by change control (§05.23); ESI lines stay CARVED_OUT_FENCE; V1X-04 cannot pass until A-09 ships |
| Q4 format never lands in the v1 window | F-01, third outcome | R3E-02 met by the declared carve-out; V1X-02 met on Q1–Q3 | A-13 and the Tax Year 2026-27 leg of A-14 stay open past R3 and ship on F-01 clearing, each on its own PL-01 evidence |
| Attended filing not cleared | F-08, third and fourth outcomes | R2X-02 met by the declared carve-out | A-23 stays open per portal; no coverage line carries Mode C |
| 20–49 does not graduate | No fence — a commercial signal (§05.11 band history) | None | AD-02's lower bound raised to 50 by change control; Free-tier rules extended to 20–49 |
| Filing SLA is not a willingness-to-pay driver | No fence — §20 V-01 and V-16 | None | Items 17 and 32's import surface pulled forward by change control; no statutory row moves |
| v2 reference gate cannot be met | DG-2d | v2 stays PLANNED | No v2 row may enter IN_BUILD |
| Enterprise arithmetic softens | DG-5e | None | One bid record; no row re-tagged |
| Support org cannot scale | The due-date queue capacity hold (§05.20) | RS8 for the affected families | Intake paused; existing tenants' coverage unchanged |

---

### 05.13 The declined-scope register (so nobody resurrects it)

Mirroring the PRD's non-goals discipline (§20), this section records the scope decisions we are *declining* and the evidence that killed each, so a later deck cannot quietly re-add them. These are scope declines specific to phasing; the product-level non-goals (hardware, interchange monetisation, premium AI SKU, cache-everything) live in §20.

| Declined at launch | Verdict | Evidence that decided it |
| --- | --- | --- |
| 1–9 as a paid band | **Killed for v1** | Marginal price is zero; Kredily free/unlimited with real statutory calc, Zoho ₹0 to 10 (Source: vendor pricing pages). **[Verified]** |
| Enterprise (2,000+) at launch | **Deferred to vision** | Four compounding gates; earliest winnable bid ~year three (§05.2). **[Verified]** |
| PSU/BFSI on a planned pipeline | **Deferred, buyer-discretion gate** | GFR exemption is a buyer's permission, not a bidder's entitlement (Source: GFR 2017 Rules 170(i)/173(i)). **[Verified]** |
| MCP server as an enterprise-winning wedge | **Killed as a phase driver** | No evidence an MCP server changed a buying decision; Darwinbox's Cortex (announced 4 Aug 2026, early access, delivery into Copilot/Teams/Slack/Glean) and Keka's advertised MCP server (EV-090) make assistant access expected, not differentiating — both claim posture, neither executed (§12). **[Killed]** |
| Premium AI SKU in any phase | **Killed** | Seven vendors price HR AI at zero (Source: PRD §12 vendor table). **[Verified]** |
| Multi-state PT/LWF as a v1 differentiator | **[Reversed] — it is a differentiator** | Earlier drafts killed it on "Frappe HR v16 ships PT across 15+ states and LWF across 14, free". That was false from source: Frappe v16's entire India payroll is 3 files / 549 lines overriding 3 functions (HRA and marginal relief), with no Indian state name anywhere in the repo and no PT slabs or LWF; TallyPrime has no state PT slab table and no LWF engine either (EV-031, EV-032). Multi-state PT/LWF is greenfield in both incumbents. Still sequenced as item 5 (design-partner states, P0) and item 23 (all states, P2) — because the gazette data is unsourced, not because it is parity. |
| Self-host for cost in any band | **Killed** | Serverless beats dedicated H100 ~74× at real utilisation; self-host only as a priced compliance SKU for regulated accounts (§20). **[Verified]** |
| Benefits monetisation in v1 | **Deferred; data model only** | Zaggle earns 5.3% of net revenue from software fees; the remaining ~95% is money movement, and the whole company's adjusted EBITDA margin is 9.9% of gross revenue — the wrong side of every ratio (Source: Zaggle FY26 investor presentation, standalone figures — r2/02; §11). Build FBP data model as option value (item 18). **[Verified]** |
| Recruiting with candidate-database search | **Killed; inbound-only** | Info Edge publishes no licensing path for a third-party ATS to search Resdex, and markets in-ATS Resdex search as exclusive to its own ATS (§10; r2/08); scraping is excluded as a legal exposure (counsel — §23) (Source: §10, corroborated across four vendors). **[Verified]** |
| A Form 138 Q4 writer built on a guessed layout, to meet 31 May 2027 | **Killed** | The Q4 regular and correction formats are unreleased (EV-046); a guessed statutory artefact is worse than a late one because it is the deductor's liability (§22 P9). F-01's outcome table governs instead (§05.18) |
| Aggregator PT or LWF figures, "until the gazette rows arrive" | **Killed** | Aggregator tables are disputed even for major states (EV-015; r1/06); a state enters only through its published pack (F-06, F-07), and a tenant's own figure is carried as the tenant's (TSF-1) |
| Admitting an International Worker's establishment on a guessed contribution base | **Declined** | The ECR has no IW field, so a wrong base is invisible in the file and wrong for every IW line (EV-035; Example G); AD-06 waits for PH-05 |
| One all-families pre-launch gate (option O1) | **Declined** | It would hold every monthly filing hostage to the quarterly Form 138 calendar without making any promise safer (§05.20) |
| Tally GL journal export in R1 | **Deferred to R2** | Neither a filing nor a payslip; a design partner's accountant can post the month from the payroll register (PR-13) |
| A composite priority label for a fenced leg ("P0 · fenced", "P0-arch", "P1→P2") | **Killed** | One row, one priority, one release (lint L5); a fenced leg carries a release tag and its blocker (§05.5) |

Two of these are *deferred, not killed* — enterprise/PSU and benefits monetisation — and both carry a documented re-entry path (§05.3 gates; §11 revisit-on-merits). One is *reversed* — multi-state PT/LWF — and stays in the register as the record of why it came back. The distinction is deliberate: a killed item never re-enters a model; a deferred item re-enters only when its named gate opens; a reversed item re-enters on the evidence that reversed it. The last six rows record decisions the execution specification made (§05.17–§05.21); "declined" there means an option considered and rejected on stated criteria, which can be reopened only through change control (§05.23) with new evidence.

---

### 05.14 Reconciling the founder's full-suite vision with the phase plan

The founder's scope decision was explicit and deliberate: **all three segments (SMB, mid-market, enterprise), the full superset (core HR + payroll + attendance, talent wedge of recruiting + performance, and an AI layer), chosen when narrower options were offered** (Source: memory hrms-product-scope, 2026-09-04). This section does not narrow that vision; it *sequences* it. The table below maps every element of the founder's ask to where it lands, so the phasing is legible as "the same product, staged" and not as a quiet de-scoping.

| Founder's vision element | Where it lands | Rationale for the placement |
| --- | --- | --- |
| **SMB segment** | v1 beachhead (20–199) + acquisition-serve 10–19 | This *is* v1; EPF-at-20 is the wedge (§05.1). 1–9 declined commercially — the only genuine narrowing, forced by free computation at the floor (EV-029, §04). |
| **Mid-market segment** | v2 (200–1,999 private) | Reachable on the same filing engine; gated on references + multi-establishment + multi-state PT/LWF (§05.3). |
| **Enterprise segment** | Vision (2,000+, incl. regulated) | Not narrowed — *deferred* on arithmetic (§05.2), with a documentary re-entry path (§05.3), not abandoned. |
| **Core HR (system of record)** | v1, P0 (item 10) | The spine every filing reads from; cannot be deferred. |
| **Payroll** | v1, P0 (items 1–7) | The filing engine itself; the entire revenue thesis. |
| **Attendance** | v1, P0 (item 11) + P2 monetisation (item 27) | ADMS/WDMS receiver is the best-evidenced call in the corpus (§09); GPS monetisation deferred to P2. |
| **Recruiting (talent wedge)** | v1 inbound-only (item 19) → v2 metered (item 25) | Inbound-only, forced by the absence of any published third-party path into Info Edge's Resdex (§10); a real narrowing of *mechanism*, not of ambition. |
| **Performance (talent wedge)** | v2 (item 26) | Pull-driven adjacency, sequenced after the filing engine proves out; not a wedge. |
| **AI layer over the HRMS** | v1, P0 bundled (items 13–15) | Built AI-first from day one — but as cost-of-goods and acquisition weapon, never the revenue line (§13). The architecture ships in v1; the *monetisation* is deferred/declined. |

Two honest narrowings are recorded so they are not mistaken for slippage: **1–9 as a paid band** (killed by the zero floor) and **recruiting-with-database-search** (killed because Info Edge publishes no third-party path into Resdex). Everything else in the founder's vision is present in the plan — it simply arrives on a gate, not on a launch date. The claim of this section, restated against the founder's own words: the full-platform play is the destination, and the phase order is the only responsible way to reach it given free computation at the bottom of the market (EV-029), a three-year enterprise arithmetic lock, and a multi-year compliance-engineering load.

---

### 05.15 The annual statutory-change load — the SLA's real cost of goods

§13 states the uncomfortable org-design consequence baldly: the company must be structured as **a compliance-maintenance operation with a permanent statutory team, not a feature-velocity software startup**, because reaching *and holding* a maintained statutory layer is a recurring load that never stops (Source: PRD §13). This section makes that load concrete, because the maintained-compliance SLA (§05.9) is only as good as the operation that keeps every rule version current — and that operation, not the AI inference the brief worried about, carries the SLA's cost of goods. Of the four cost-of-goods lines, **compliance curation** (per state maintained — this section's subject) and **supervised filing** (per registration × state × filing type — the dominant line) are the two that are unsized, and inference is the smallest; §13's ₹0.15–3.27 per employee-month figures are placeholders (EV-088, EV-089; §05.1).

<!-- DIAGRAM: statutory-change-load -->

The recurring statutory-change calendar the compliance desk must catch, diff, version (item 12) and ship *before* the next filing that depends on it:

| Recurring event | Typical cadence | What it moves | Filing/artefact it feeds |
| --- | --- | --- | --- |
| **Union Budget / Finance Act** | Annual (1 Feb, mostly effective 1 Apr) | TDS slabs, new-regime parameters (ex-s.115BAC), standard deduction, rebate (ex-s.87A), surcharge — section numbers under the Income-tax Act 2025 carried as rule-version data; only the EV-050 mappings are verified | TDS u/s 392 (ex-s.192), Form 138, Form 130 |
| **Minimum-wage VDA revision** | Twice yearly in the central sphere, effective 1 April and 1 October (r1/06); state cycles vary and are per-state rule data | Minimum-wage floors — interacts with the dual wage base (item 2) | Payroll base, wage register |
| **State PT slab/exemption revision** | Ad-hoc, state-by-state (some on Budget cycle) | PT slabs, exemption limits, periodicity per state | PT return (items 5/23) |
| **LWF rate/schedule notification** | Ad-hoc, state-by-state | LWF per-head amounts and remittance dates | LWF remittance (Example I) |
| **EPFO ceiling / rate / admin-charge change** | Ad-hoc — the ₹15,000 ceiling was re-fixed under CoSS s.2(89) by S.O. 2702(E) of 29 May 2026, after a reported January 2026 Supreme Court direction to decide on revision within four months; higher figures in circulation were retracted as low-quality (r1/06) | Coverage ceiling, EPS cap, admin charges | ECR (item 3) |
| **ESIC threshold / rate change + the position after 22 Nov 2026** | Ad-hoc + the time-critical successor (§06.9, §05.7) | ₹21,000 ceiling, 0.75%/3.25% rates, contribution-base definition | ESI challan (item 4) |
| **CBDT form-format changes** | Ad-hoc (Form 138 remap in flight — EV-051; Q4 and Q4 correction formats unreleased — EV-046) | TDS return/annexure layouts, correction structures, FVU versions (EV-052) | Form 138, Form 130 |
| **Perquisite / FBP threshold changes** | Ad-hoc (meal ₹50→₹200, gift ₹5,000→₹15,000 from 1 Apr 2026 — EV-019, **[Hypothesis]** until the rule text is read; §11; rule citation pending §20 V-18) — the meal figure applies only with its conditions enforced: meals during working hours at office/factory premises, or non-transferable vouchers usable only at eating outlets | Tax-free perquisite limits and the conditions that qualify them | FBP (item 18), TDS |
| **State rules under the four Codes** | Rolling, uneven across states (§20) | State-specific applicability, formats, thresholds | All state filings |

Three consequences fall straight out of this calendar:

- **The Budget cycle is the annual load spike for the desk, and it is a hard deadline, not a backlog item.** Every February the Finance Act can move TDS slabs and new-regime parameters effective 1 April, so the desk must diff, version (item 2's effective-dating) and ship the engine changes inside roughly eight weeks — before the first April payroll run and the first TDS deposit (7 May under the 1962-Rules convention; the 2026 Rules' r.218 dates to be confirmed, §05.9). A late TDS-slab update produces wrong deductions *the product caused*, which is the §08 "a wrong number is a legal problem, not a UX one" failure. **[Verified]** Budget cadence and 1-Apr effect (Source: annual Finance Act cycle; Income-tax Act 2025 s.392, ex-s.192 — EV-050). **[Hypothesis]** the eight-week turnaround is achievable at the planned desk size — kill/validate: staff the desk to clear the Budget diff within one release cycle, or the SLA breaches every April; if the first Budget cycle overruns, the desk is understaffed for the committed bands.
- **Amendments and corrigenda, not just new instruments.** §02's lesson is now encoded in item 12's acceptance (§05.5): the watcher must catch a *corrigendum to an already-tracked notification* — the exact class that inverted round one's Nov-2026 EPF-cliff conclusion when a notification was read without checking for the corrigendum that amended it (§02 standing rule). The recurring task is therefore not "watch for new laws" but "watch every tracked instrument for silent amendment," which is a materially larger and never-ending surface. **[Verified]** (Source: PRD §02; §02 "check for a corrigendum" standing rule).
- **State divergence is the unbounded tail, and it is why the desk load scales with band, not just tenant count.** Central changes are a finite annual set; the state PT/LWF/Code-rules surface grows with every state a tenant operates in, and it is precisely the disputed-data area (item 23, §20 V-09 — only Maharashtra's and Odisha's slabs and Karnataka's effect have been read at state primary source, EV-014). A 200–999 multi-establishment tenant multiplies the state surface the desk must hold current, which is one more reason multi-state is a v2 gate (§05.3) rather than a v1 promise. **[Hypothesis]** the all-states maintenance cost is bounded and linear in states — kill/validate: if several states publish rule changes only in regional-language gazettes on no fixed calendar, the maintenance cost is *super-linear* and item 23 re-prices the v2 timeline (consistent with Example E).

**A worked Budget-cycle trace, to show why it is a critical-path deadline, not a backlog item.** Suppose the 1 February Finance Act revises the rebate threshold (ex-s.87A) and the new-regime (ex-s.115BAC) standard deduction, effective 1 April. The desk's chain is: (1) catch the Finance Act and any subsequent CBDT clarification (item 12 watcher); (2) diff it against the TDS rule-version in force (item 2 effective-dating); (3) write a new rule-version row — *no code deploy* for a parameter change, per item 2's acceptance (§05.5); (4) regression-test the TDS engine against known cases including regime-election edges (§05.5 item 6); (5) ship before the first April payroll run so the first monthly TDS deposit is correct; (6) carry the same change into the Form 138 quarterly (Q1 due 31 Jul — EV-049) and the year's Annexure II data that TRACES turns into Form 130 (EV-046, EV-048). A slip at step 5 mis-deducts TDS for *every* new-regime employee in April at once — a product-caused miss (§05.9 taxonomy) that hits the whole book simultaneously, not one tenant. This is precisely why the eight-week window is a hard deadline and why the desk must be sized to clear one Budget diff within one release cycle. **[Verified]** the propagation chain (Source: PRD §06 rules-first/effective-dating; Income-tax Act 2025 s.392; Rule 219 for the quarterly dates — EV-049).

**The Budget-cycle drill — rehearsed before the first live 1 February.** The first Budget the product meets with paying tenants is a hard deadline for the whole book, so the chain above is rehearsed once, in full, before it is run for real: in the quarter before the first 1 February after R1 is RELEASED, the statutory desk replays the most recent Finance Act's salary-TDS changes through the pipeline as if they were new.

| Step | What is rehearsed | Owner | Passes when |
| --- | --- | --- | --- |
| BD-1 | Catch: the Finance Act and any CBDT clarification enter as change requests (FR-RULE-003 R1–R2) | Statutory analyst | Both are DETECTED from their sources, not keyed in by hand |
| BD-2 | Diff against the TDS rule versions in force (FR-RULE-009) | Statutory analyst | The impact analysis lists every affected rule row and every tenant cohort by regime |
| BD-3 | Author the new versions as rows, with no code deploy | Statutory analyst | Item 2's acceptance holds — no code path changes |
| BD-4 | Regression on the golden corpus, including regime-election edges (FR-RULE-011; §05.5 item 6) | Statutory reviewer | Every golden case passes or is re-baselined with a reason |
| BD-5 | Two-person review, certification and a staged publish to a rehearsal cohort (FR-RULE-010, 012, 013) | Statutory desk lead | The pack publishes and rolls back cleanly |
| BD-6 | Measure the elapsed time from BD-1 to BD-5 | Statutory desk lead | It fits inside the window from 1 February to the first April run with room for one full rework loop; if it does not, the desk is under-staffed for the committed bands (the kill criterion above), and the response is §05.12's support-org row, before the date rather than after |

The scope consequence, stated plainly: **the SLA in §05.9 is a promise about this operation, not about the code.** A band is committable only if the compliance desk can hold every rule version its filings depend on current through the recurring calendar above. That is exactly why §05.12 pre-commits to *slowing tenant intake before breaching the SLA* if the desk cannot scale — the desk, not the codebase, is the product's true capacity constraint. This section is the operational evidence for why §13 insists the company is a compliance-maintenance operation, and why the founder-fit note in §13 ("the kind of founder the company needs") is a scope decision and not a culture aside. **[Verified]** org-design consequence (Source: PRD §13).

---

### 05.16 The government denominator behind each committed band

The PRD's §04 lays down a non-negotiable discipline: **build every count on EPFO *contributing* establishments, never *registered* ones**, because registered codes overstate the addressable base by roughly 3.2× (two-thirds are dormant) (Source: PRD §04, EPFO as on 31.03.2024). A scope decision that names bands but not their addressable population is a marketing statement, not a plan — so this section grounds each committed band in that denominator.

The base figures, each with its grade:

| Figure | Value | Source |
| --- | --- | --- |
| EPFO-contributing establishments, FY2023-24 | **7,66,254** | EPFO Annual Report 2023-24, as on 31.03.2024 (EV-001) **[Verified]** |
| Contributing members (UANs) | 7.37 Cr | EPFO **[Verified]** |
| Mean contributing employees per establishment | 96.2 | derived (7.37 Cr ÷ 7,66,254) **[Verified]** |
| Registered vs contributing multiple | 3.2× | EPFO 24,18,266 registered vs 7,66,254 contributing **[Verified]** |
| *Registered* establishments by cumulative accounts | 0–50: 19,43,910 · 51–100: 1,80,736 · 101–150: 76,944 · 151–200: 43,426 · above 200: 1,73,250 | EPFO AR 2023-24 Appendix-2(v) — registered universe, bands by cumulative accounts, not current employees (r2/09) **[Verified]** |
| Contributing establishments **above 200 employees** | 41,881 *modelled*; plausibly anywhere in 41,881–1,73,250 | Output of a one-moment Pareto fit (x_min 20, α 1.2624) to the two anchors above — **not** an EPFO table; EPFO publishes no contributing-by-headcount crosstab (r2/09; §04) **[Hypothesis — modelled]** |
| Contributing establishments 20–49 / 50–199 on the same fit | 5,25,246 / 1,99,127 | Same fit; a lognormal alternative fits the same anchors and disagrees (r2/09; §04) **[Hypothesis — low confidence]** |
| greytHR's claimed customer base as a share of contributing establishments | ~3.9% on its current claim of "30,000+ companies" (September 2026 capture); ~4.4% on the earlier 34,000 capture | EV-091 — a dated benchmark, not a fixed figure; "companies" is not the same unit as EPFO establishments, so this is a *ceiling* on share assumptions, not a measured share **[Verified, dated]** |

Three scope consequences that the denominator forces:

- **The beachhead is where the establishments are — but how many is a range, not a number.** The fit puts no contributing establishment below 20, so its residual after the above-200 count — **up to 7,24,373** (7,66,254 − 41,881) — is the *upper case* for the 20–200 beachhead. It falls by the share of contributing establishments that sit below 20 (voluntary coverage under CoSS s.1(5) and shrunken establishments exist — r1/06), which is the unmeasured parameter `beachhead_sub20_share` (§04.3), and by any excess of the true above-200 count over 41,881. §04 carries 1.8–2.6 lakh only as scenarios for a high sub-20 share. **[Reversed]** Earlier text here argued that the 96.2 mean "lands squarely inside the 50–199 revenue core", so the typical contributing establishment is a revenue-core account. The mean is right-skewed by the large-establishment tail and says nothing about the typical establishment (§04); the fit itself puts 5,25,246 establishments in 20–49 against 1,99,127 in 50–199. By count, the lower half dominates. The 50–199 half still carries the revenue — but on budget, obligation and seats per account (§05.1), not on establishment count. **[Hypothesis]** the band split — kill/validate: §04's AC-12 replaces the fit with a measured count; if the 20–49 share of the beachhead is as high as the fit implies, the §05.1 graduation-rate test carries even more weight.
- **v2's addressable count is a range: 41,881–1,73,250 establishments.** The 200–999+ expansion band is still countable, not a vague "mid-market" — but the lower end is a model output and the upper end counts *registered* establishments by *cumulative accounts*, and the two cannot be reconciled from public data (r2/09). The accounts-to-current-employees ratio that would collapse the range is a §20 desk item (an EPFO statistics request). Either end keeps v2 a lower-volume, higher-ACV motion (§05.1 ACV table) whose gate is references, not reach (§05.3): the band is small enough that a bake-off reputation, won or lost, propagates. **[Reversed]** Earlier drafts marked 41,881 [Verified] and sourced it to EPFO Appendix-2(v); it is the Pareto fit's output (§04). **[Killed]** the "~41,000 named accounts" target, in either direction — neither end of the range may be quoted as a count of targets (§04, §20).
- **The share ceiling caps every model.** On its own current claim, greytHR's customer count is ~3.9% of contributing establishments (EV-091, EV-016; ~4.4% on the older 34,000 capture). Any v1/v2 model that implies a higher penetration than that inside its committed window is claiming to out-penetrate the incumbent HRMS from a standing start, and must be haircut. This bounds the §05.1 ACV table from the *count* side the way §04 bounds it from the *price* side: even at the revenue-core ACV, the reachable establishment count × a credible sub-incumbent share is the real ceiling, not the full beachhead count. **[Verified, dated]** the benchmark inputs (EV-091; EPFO). **[Reversed]** Earlier drafts carried "34,000 customers" as a fixed figure; it moved, so every share figure built on it now carries its capture date.

**A count-side ceiling, not a forecast (mirroring the §04 price discipline).** Multiplying count × ARPU as a *forecast* is forbidden — no realised ARPU exists (§04) — but the denominator still yields a *ceiling* the plan must stay under. Take the beachhead's upper case of 7,24,373 establishments × greytHR's ~3.9% current-claim share ≈ **28,000 establishments as the reachable ceiling at most** (≈32,000 on the older 34,000 capture); in §04's 1.8–2.6 lakh scenarios the same share gives roughly 7,000–10,000. Even the upper figure assumes matching the incumbent HRMS from a standing start. Any v1/v2 revenue plan implying more committed-window accounts than that is claiming to out-penetrate the incumbent and must be haircut. This is the count-side mirror of §04's rule for price: state the ceiling as a ceiling, never a target, and let the §20 quote programme set the *level* (ARPU) while the government denominator caps the *reach* (accounts). **[Verified, dated]** the benchmark inputs and contributing base (EV-091; EV-001); **[Hypothesis]** the beachhead count it multiplies (`beachhead_sub20_share`) and any reachable-share fraction above the incumbent's — kill/validate: it may not enter a model without §20 evidence.

The through-line to the rest of the section: **§05.1 draws the bands, §05.9 says which filings each owes, and §05.16 says how many establishments are actually there** — and a band is only worth committing when all three line up (real obligation, deliverable filings, a countable addressable base on the government denominator). That triangulation is what keeps the phase plan honest against both free computation at the floor (EV-029, §04) and an inflated TAM (§04's banned 6-crore-MSME and registered-establishment figures).

---

### 05.17 The R1 capability list — closed, owned, and the only place "P0" lives

The round-five engineering review found "P0" asserted six times across four sections on six unrelated things, three of them open questions rather than deliverables, and asked for R1 as "a closed list of user-visible capabilities with per-capability acceptance criteria", with P0 reserved for R1 and an owner on each (r5/00-review-engineer). §05.5 fixed the rule; this subsection is the list, the record that holds it, and the lint that stops it drifting. Anything not on the list below is not in R1, whatever label another section gives it.

#### Identifier families used in §05.17–§05.24

The execution specification introduces several ID families. Each is defined once, in the place named, and cited everywhere else.

| Family | Meaning | Defined in |
| --- | --- | --- |
| Items 1–35 (and split rows such as 20a, 20b) | Modules and capabilities in priority order | §05.5 |
| A-01 … A-29 | Statutory artefacts, with status and release | §05.7 |
| BC-1 … BC-4 | Buildability criteria, which derive an artefact's status | §05.7 |
| C-01 … C-53 | Capabilities: C-01 to C-35 and C-52 are the closed R1 list; C-36 to C-51 and C-53 are the named R2 and R3 capabilities | §05.17; §05.20 |
| L1 … L8 | Ledger lint rules | §05.17 |
| SI-01 … SI-15 | Cross-register invariants | §05.17 |
| QR-1 … QR-6 | Ordering rules for the sourcing and desk-work queue | §05.18 |
| DC-1 … DC-6 | What is still owed on a carved-out line | §05.9 |
| EA-1 … EA-5 | How gate evidence accrues against the calendar | §05.20 |
| PW-1 … PW-6 | Recovering evidence when a design partner withdraws | §05.20 |
| IB-1 … IB-4 | Changing a release that is already IN_BUILD | §05.23 |
| PR-01 … PR-15 | Cross-section priority rulings | §05.17 |
| F-01 … F-12 | Fences, instantiated per state or portal where marked | §05.18 |
| FL1 … FL12 | Fence lifecycle transitions | §05.18 |
| WP-01 … WP-25 | Work packages | §05.19 |
| RP-01 … RP-18 | Entries of the R1 rule pack that R1E-01 freezes | §05.19 |
| RS1 … RS10 | Release lifecycle transitions | §05.20 |
| AF1 … AF8 | Artefact-family readiness transitions | §05.20 |
| R1E, R1X, R2E, R2X, R3E | Release entry and exit checks | §05.20 |
| PL-01 … PL-05; V1X-01 … V1X-08; V2X-01 … V2X-07 | Phase-gate checks | §05.8 |
| DG-… | Documentary gate checks for the deferred bands | §05.3 |
| SS-1 … SS-5 | When a line's SLA starts, and when a miss becomes tenant-caused | §05.9 |
| S-01 … S-17 | R1 surfaces | §05.17 |
| GL-1 … GL-5 | Go-live window rules | §05.20 |
| SF-01 … | Seeded fixtures for evidence the calendar will not supply | §05.20 |
| AD-01 … AD-18 | Admission rules | §05.21 |
| PH-01 … PH-26 | Parameter holds | §05.22 |
| RT-01 … RT-15 | Items routed to other sections' owners | §05.22 |
| TSF-1 … TSF-5 | Tenant-supplied figures in fenced states | §05.21 |
| H-1 … H-6; D1 … D5 | Hypercare rules; defect classes | §05.20 |
| BD-1 … BD-6 | Budget-cycle drill steps | §05.15 |
| TO1 … TO17 | Tenant lifecycle transitions, from prospect to closed records | §05.21 |
| SC-A … SC-H; SC1 … SC8; SCR-… | Scope-change classes; the change request's lifecycle transitions; individual change requests | §05.23 |
| TS-05-01 … TS-05-62 | Test scenarios for this section | §05.24 |

#### The P0 ledger — data definition

Every scoped unit of work — a module item (§05.5), an artefact row (§05.7), a capability (below) or a work package (§05.19) — is a row in one ledger. The ledger is a product-management record, not a document; this table is its schema.

| Field | Type | Rule |
| --- | --- | --- |
| `row_id` | Item number (1–35), split item (e.g. 20a, 20b), artefact row (A-01…), capability (C-01…) or work package (WP-01…) | Unique; never reused after withdrawal |
| `priority` | Exactly one of P0, P1, P2, P3 | Lint L1, L5 |
| `release` | Exactly one of R1, R2, R3, v2, Vision | Lint L1, L3 |
| `blocker_ids` | Fence IDs (F-01…, §05.18) and parameter-hold IDs (PH-01…, §05.22) | Lint L2, L3 |
| `depends_on` | Other `row_id`s | Must not form a cycle; a row cannot be done before every row it depends on |
| `owner_role` | One accountable role — Product lead, Engineering lead, Statutory desk lead, Filing desk lead, Security lead, Legal lead, GTM lead | Mandatory for P0 (L4); the role signs the evidence |
| `acceptance_ref` | An FR, NFR or AC ID in this PRD, or a §05.5 acceptance bullet | Mandatory for P0 (L4); a row whose acceptance lives nowhere is not buildable |
| `evidence_type` | Portal acknowledgement · authority validation on real data · golden vector · conformance render · schema scan · tabletop · billing query · signed document | Names what "done" looks like before work starts |
| `status` | NOT_STARTED · IN_BUILD · DONE_WITH_EVIDENCE · BLOCKED | DONE_WITH_EVIDENCE needs a stored evidence reference |
| `source_section` | The section whose requirement defines the behaviour | The ledger points at requirements; it never restates them |

**Six real rows, as the ledger holds them.** The examples show the schema carrying the section's hardest cases.

| `row_id` | `priority` | `release` | `blocker_ids` | `owner_role` | `acceptance_ref` | `evidence_type` |
| --- | --- | --- | --- | --- | --- | --- |
| 3 (EPF ECR generator) | P0 | R1 | — | Statutory desk lead | §05.5 item 3; FR-PAY-701 | Portal acknowledgement |
| A-06 (ECR arrear return) | — (a fenced leg carries no priority) | R3 | F-03 | Statutory desk lead | FR-PAY-701 | Authority validation on real data |
| C-12 (ESI upload file) | P0 | R1 | — (`depends_on` names F-05's capture task, which is ours to finish) | Filing desk lead | FR-PAY-702 | Portal acknowledgement |
| A-23 (attended submission) | — | R2 | `F-08[EPFO]`, `F-08[ESIC]`, `F-08[income-tax]`, one per state portal | Legal lead | FR-OPS-001 | Signed document plus portal acknowledgement |
| 20a / 20b (CA console) | P1 / P2 | R2 / v2 | — / §20 V-05 | GTM lead | §18.7 | Billing query / signed document |
| C-52 (record export) | P0 | R1 | — | Product lead | §05.17 (C-52 acceptance) | Conformance render |

C-12 is the instructive row. It is P0 because the capture is desk work expected to finish before the gate, so the row depends on a task rather than carrying a fence. If the gate convenes with the capture undone, F-05 enters `blocker_ids`, lint L2 removes the P0 and the row moves to R2 — by rule, not by a meeting.

#### Ledger rules — the P0 lint

The lint runs on every ledger change and at every release gate (§05.20). A failure blocks the change, names the row and names the rule.

| Rule | Statement | Why | Failure message names |
| --- | --- | --- | --- |
| L1 | `priority = P0` ⇒ `release = R1` | P0 is reserved for the R1 list (§05.5) | The row and its release |
| L2 | A row with a fence in `blocker_ids` cannot be P0 | A fenced sub-artefact carries a release tag and its blocker instead (§05.5) | The row and the fence |
| L3 | `release ∈ {R2, R3}` ⇒ `blocker_ids` non-empty, or `depends_on` names a row in the same or an earlier release | Nothing is deferred without a stated reason | The row |
| L4 | `priority = P0` ⇒ `owner_role` and `acceptance_ref` both set | Unowned, untestable P0 was the defect the review found | The missing field |
| L5 | `priority` is one bare label from {P0, P1, P2, P3}; composites ("P0 · fenced", "P0-arch", "P1→P2", "P0/P1") are rejected and must be split into rows | One row, one priority, one release | The label found |
| L6 | Every artefact row tagged R1 maps to at least one P0 capability, and every P0 capability maps to at least one module item | Keeps the register, the capability list and the module table consistent | The orphan |
| L7 | A row whose only blocker is a fence in state CLEARED or SHIPPED (§05.18) is flagged for change control within the next review | A cleared blocker must not leave work parked in a later release by inertia | The row and the fence |
| L8 | No row in R1 depends on a row in R2 or later | A release cannot need what ships after it | The dependency |

#### Cross-register invariants — what the row-local lint cannot see

L1 to L8 read one ledger row at a time, so they catch a bad label and miss a disagreement *between* records. This section's scope lives in ten records — the ledger and the capability list (§05.17), the artefact register (§05.7), the work packages (§05.19), the fence register (§05.18), the parameter-hold registry (§05.22), the artefact-family readiness records and the release gate records (§05.20), every tenant's coverage statement (§05.21) and the test scenarios (§05.24) — and each is derived from, or feeds, the others. An **invariant** is a statement that must hold across two or more of them. Each is a query over records that already exist, not a review opinion; each names what a violation blocks; and none is ever repaired by editing the derived side, because coverage-line states and family states are computed (§05.21, "No state is ever set by hand").

<!-- DIAGRAM: scope-phasing-invariant-map -->

| ID | Invariant | Binds | Detected by | A violation blocks | What the violation looks like |
| --- | --- | --- | --- | --- | --- |
| SI-01 | Every fence ID in any row's `blocker_ids` resolves to a fence record | Ledger ↔ fence register | Join `blocker_ids` to the register | The ledger change | A row blocked by `F-06[KA]` after that instance was renamed; the row is parked behind nothing. A blocker that resolves to a SHIPPED fence is L7's flag, not this failure |
| SI-02 | A fence's `blocks` and the blocked rows' `blocker_ids` name each other | Fence register ↔ ledger, artefact register | Set comparison in both directions | The ledger or fence change | A fence blocks A-16 while A-16 carries no blocker: filing instances sit BLOCKED with no release consequence, and the row looks buildable |
| SI-03 | Every registered fence blocks at least one artefact row, capability or mode | Fence register ↔ ledger | Empty-`blocks` scan | Nothing at runtime; a finding at the weekly fence review | A fence left open after its rows were deferred (FL11) — it ages, escalates and buys nothing |
| SI-04 | Every coverage line in CARVED_OUT_FENCE, CARVED_OUT_PARAMETER or NOT_OFFERED carries a `blocker_ref` that resolves to a live fence, hold or admission rule | Coverage ↔ fence register, holds, admission rules | Resolution check at version issue | Issuing that statement version | A carve-out notice whose blocker cannot be named in plain words — which the notice's own mandatory fields forbid (§05.21) |
| SI-05 | Every parameter hold whose effect is BLOCK is read by at least one computation, admission rule or gate check | Holds ↔ engine, admission, gates | Reverse reference scan | The hold's registration | A BLOCK hold nothing reads: the plan reports blockage that no tenant experiences, and the unmet-demand measure counts demand against it for ever |
| SI-06 | A capability's release is never earlier than the release of an artefact row it delivers, unless its acceptance names that row as an excluded leg with its fence | Capability list ↔ artefact register | Release comparison per mapped row | The ledger change | C-09 at R1 while A-02 sits at R2. C-34 is the lawful shape: it names A-06 as fenced and excludes the arrear leg from its acceptance |
| SI-07 | One artefact-family vocabulary: every `family_key` in a readiness record is a `line.artefact_family` value and maps to at least one artefact row, and the reverse | Readiness ↔ coverage ↔ artefact register | Vocabulary diff, three ways | Publishing the readiness record or the statement | A family key that exists only in the readiness records, so coverage order rule 6 never finds it and lines stay SLA_PENDING for ever |
| SI-08 | No coverage line reads IN_SLA while its family's readiness record is anything but PL01_PASSED, or, for a maintained or issued family, holds its AF4 conformance evidence | Coverage ↔ readiness | Per-line check at version issue, and at every gate | Issuing the version; at a gate, RS4 | A line sold under the SLA for a family the product has never once had accepted — exactly what decision O2 exists to prevent |
| SI-09 | Every R1 capability is served by at least one work package, and every work package serves at least one capability or chain step | Capability list ↔ work packages | Mapping scan both ways | The ledger change; at R1's gate, R1E-06 | C-52 added by SC-D with no package behind it: it is owned, accepted and unbuilt |
| SI-10 | Every gate check reads its evidence from the record that holds it, and a check whose evidence reference is empty reads FAIL | Gate records ↔ every source record | Evidence-reference resolution at gate assembly | The gate's PASS | DG-3d's precedent (§05.3): a check with no defined numerator reads FAIL, never PASS by default |
| SI-11 | Every parameter named anywhere in §05 appears exactly once in the parameter-hold registry with an owner, an effect and a routed destination | Prose ↔ holds registry | Name extraction against the registry | The change that introduced the name (refused at SC1) | A rule that reads a parameter invented in a sentence. This is the section's own guard against the failure mode Part A names: a figure or a knob that exists in no register |
| SI-12 | Every fence of class desk-capture or desk-read names the gate it must be closed before | Fence register ↔ release gates | Empty-gate scan over those two classes | The fence's registration | A desk fence with no gate: it can stay open indefinitely and is never a failing check, which is the one thing §05.18's ageing table refuses |
| SI-13 | Every deferred artefact's re-entry trigger resolves to a fence, a DG check or a §20 item that exists | Deferred register ↔ fences, gates, §20 | Resolution check at each change-control review | The deferral (SC-F) | "Re-enters when the layout is published", with no watch behind it — a fence's own test applied to a deferral: with no watch key, capture task or counsel item it is not a trigger, it is a hope |
| SI-14 | Every rule family defined in §05.17–§05.23 has at least one scenario in §05.24, and every scenario's "Traces to" resolves | Test scenarios ↔ every rule family | Family extraction against the scenario list | Approval of the change that added the family (SC-D) | A new admission rule with no negative case, so nothing fails when it is broken |
| SI-15 | One artefact, one release: the artefact register, the capability list, the calendar matrix (§05.9) and the dossier index (§05.20) agree, or a row names the leg that differs | Four registers | Tag comparison per artefact | The ledger change; at a gate, RS4 | The calendar matrix showing a family inside R1 that the register tags R2 — the shape that sells a carve-out as covered |

When each runs, so that a violation is found by the machine that made it and not at the gate:

| Evaluated | Invariants | Recorded in |
| --- | --- | --- |
| On every ledger change, with the lint | SI-01, SI-02, SI-06, SI-09, SI-15 | The lint log (its rejections feed the scope-health measure) |
| On every fence transition (FL1 to FL12) | SI-01, SI-02, SI-03, SI-12, SI-13 | The fence record's history |
| On every coverage-statement version | SI-04, SI-05, SI-07, SI-08 | The `coverage.versioned` event |
| At every release gate | All fifteen | The gate record's `invariants_result` |
| At each change-control review | SI-11, SI-13, SI-14 | The review's record |

Two rules keep the invariants from being argued away. First, **an invariant failure is repaired on the side that is authored, never on the side that is computed**: SI-08 is fixed by moving the family's readiness state with real evidence, never by writing IN_SLA onto a line. Second, **an invariant that cannot be evaluated reads FAIL**, in the same way as SI-10's own subject — an unevaluable check is the failure mode this section was rewritten to remove (§05.17's opening), not a reason to pass.

#### The closed R1 capability list

"User-visible" means a tenant, an employee, an operator or an approver can do or see it. The acceptance reference is the requirement that defines "correct"; this list adds only the owner and the evidence R1 needs.

| ID | Capability — what a user can do | Items | Register rows | Acceptance reference | Owner | R1 evidence |
| --- | --- | --- | --- | --- | --- | --- |
| C-01 | Set up the statutory hierarchy — group, legal entity, registration, establishment — with jurisdiction on the work location | 10 | — | §14.3.1; FR-CHR-104; Chain B B1 exit test (§05.7) | Engineering lead | A design partner's registrations loaded; a three-state, two-entity fixture representable |
| C-02 | Maintain the employee master: identifiers at their owning level, name as per PAN and as per UAN, own-roll/contract flag, International Worker flag, regime election, establishment assignment | 10 | — | FR-CHR-009a, FR-CHR-104; §07.1 | Product lead | Every field Examples A, G and J need is present, or null with a recorded reason |
| C-03 | Keep Aadhaar optional everywhere, held only in the token store, with exclude-and-flag where a filing needs seeding | 10 | — | FR-CHR-099, FR-CHR-101; CR-30 | Security lead | Schema scan finds no Aadhaar number or hash in a business table; an employee who declines is paid |
| C-04 | Record consent as a versioned record, capture SPDI written consent before bank details or biometrics, run the migration consent flow | 35 | — | FR-CHR-100, FR-CHR-102; FR-ATT-017 | Legal lead | Item 35 acceptance (§05.5) on a real import |
| C-05 | Import employees, structures and YTD from Excel/CSV, and tie out a mid-year cutover to ₹0 on the V-15 heads | 32 | — | §16.7 AC-MIG-1, 3, 4, 5 | Product lead | One design-partner cutover passes with no tolerance override on a V-15 head |
| C-06 | Define salary structures from the component catalogue | 1 | — | FR-PAY-101, FR-PAY-108 | Engineering lead | The design partner's structures expressed with no tenant-specific code path |
| C-07 | Run a payroll month from OPEN to FILED with maker-checker | 1 | — | FR-PAY-301 to FR-PAY-306; AC-301.1–4 | Engineering lead | One real month reaches FILED on the ledger |
| C-08 | Compute both wage bases, including the 50% add-back as a bounded fixed point | 2 | — | FR-PAY-201, FR-PAY-211; §06.14 TV6, TV7, TV25 | Engineering lead | PL-03 reconciliation sheet at zero variance |
| C-09 | Compute EPF and generate ECR Regular, Supplementary and Revised returns | 3 | A-01, A-02 | FR-PAY-202, FR-PAY-701, FR-PAY-708; TV1, TV2, TV16 | Statutory desk lead (rules), Engineering lead (writer) | PL-01 for the ECR family |
| C-10 | Keep the per-establishment ECR ledger and route NIL months to Direct Challan Entry | 3 | A-03, A-04 | FR-PAY-712 | Engineering lead | AC-712.1–4 on a seeded ledger; the M−4 warning fires before the window |
| C-11 | Compute ESI with contribution-period continuity | 4 | A-07 | FR-PAY-203, FR-PAY-702; TV3, TV4 | Statutory desk lead | TV3 and TV4 pass; PH-12 set (PL-04) |
| C-12 | Produce the ESI monthly upload file | 4 | A-08 | FR-PAY-702; FR-OPS-014 | Filing desk lead | Only if F-05 is SHIPPED before the gate; otherwise the row moves to R2 by rule, not by debate |
| C-13 | Compute monthly TDS under the elected regime, capturing Form 124 declarations and Form 122 prior-employer income | 6 | A-10 | FR-PAY-205, FR-PAY-503 | Statutory desk lead | §08 Example F passes; deposit timing awaits F-10 |
| C-14 | Generate and validate Form 138 Q1–Q3 statements, regular and correction, on the period's FVU stack | 6 | A-11, A-12 | FR-PAY-706, FR-PAY-708; FR-OPS-015 | Engineering lead | FVU 1.2 pass on real data; corrections held while F-02 is open |
| C-15 | Distribute the TRACES-generated Form 130 to employees | 6 | A-14 | FR-PAY-707; FR-OPS-016 | Product lead | SF-15: a distribution record per employee from a seeded certificate record, with the mismatch case held; no self-generated certificate exists anywhere in the product. The first real certificate follows a full Tax Year run (§05.20, earliest AF4) |
| C-16 | Compute PT for each state whose slab is state-primary-sourced — Maharashtra at R1 entry (EV-014) | 5 | A-15 | FR-PAY-204; TV10 | Statutory desk lead | TV10 passes; a state without a published row is refused, never defaulted |
| C-17 | Accrue gratuity and compute a payout, holding any amount above the legacy figure for review | 7 | A-22 | FR-PAY-206; §06.6; TV8 | Statutory desk lead | TV8 passes; PH-01 review hold fires on a seeded case |
| C-18 | Maintain the six registers and the wage slip, immutable once finalised | 8 | A-18 | FR-PAY-709; FR-STAT-001; TV19–TV21 | Engineering lead | TV19–TV21 render; an edit to a finalised register is refused |
| C-19 | Issue the appointment letter in the state's prescribed form at 10+-worker establishments | 9 | A-19 | EV-057; §07.3.1 | Product lead | For states whose form is captured (F-11); a joiner without a letter opens a gap task |
| C-20 | See every due artefact on a per-registration calendar with its citation and filing state | — | — | FR-PAY-710, FR-PAY-711; Chain B B2 exit test | Product lead | Every R1 artefact due for a design partner appears; every fenced one appears as fenced |
| C-21 | Submit in Mode A (employer-attended) or Mode B (co-attended), with the on-behalf log and evidence capture | — | A-23 is R2 | FR-OPS-001, FR-OPS-006 to FR-OPS-009, FR-OPS-011, FR-OPS-028 | Filing desk lead | First-submission protocol (FR-OPS-011) completed for each R1 artefact family |
| C-22 | Generate the salary bank file, release it by a separate approver, and reconcile credits | 33 | — | FR-PAY-901, FR-PAY-903, FR-PAY-904 | Engineering lead | Item 33 acceptance (§05.5) on one real month |
| C-23 | Compute each statutory payment figure and reconcile it to the portal's challan | 1, 3, 4, 6 | — | FR-PAY-902 | Engineering lead | AC-902.1 on one real month |
| C-24 | Ingest device punches by ADMS/WDMS push and keep per-day IN and OUT times | 11 | — | FR-ATT-011, FR-ATT-020, FR-DEV-002, FR-DEV-008 | Engineering lead | §20 V-11 bench result; an unknown serial is quarantined |
| C-25 | Catch amendments and corrigenda, and publish rule versions through two-person review | 12 | — | FR-RULE-001 to FR-RULE-014; AC-RULE-005.1 | Statutory desk lead | The AC-RULE-005.1 replay passes; no SLA is sold before it does (§19.9) |
| C-26 | Use the bundled assistant with every §12.8.3 rail in the call path, off by default for regulated tenants | 13 | — | §12.8.3; NFR-CERT-604 | Engineering lead | The redaction chokepoint's default-deny test passes on Aadhaar, PAN, bank account and IFSC |
| C-27 | Attribute every model call's cost to tenant, user, agent and model | 14 | — | NFR-OBS-1101; §13.9 | Engineering lead | 100% attribution (§19.12.2, Phase 0) |
| C-28 | Route model calls through the residency-selectable provider seam, one backend wired | 15 | — | NFR-RES-702; §13.10 | Engineering lead | A second backend is addable by configuration alone |
| C-29 | Report an incident within six hours and keep 180 days of ICT logs in India | 34 | — | NFR-CERT-601 to NFR-CERT-603 | Security lead | Item 34 acceptance (§05.5) |
| C-30 | Record supervised minutes per filing cycle on every attended session | — | — | FR-OPS-010 | Filing desk lead | Minutes present on every Mode B session record, so V1X-06 can be measured from the first design partner |
| C-31 | Employees see payslips, submit Form 124 declarations and proofs, and give or decline consent through self-service | 1, 6, 35 | — | FR-PAY-601, FR-PAY-602, FR-PAY-503; §07.5.1 | Product lead | Every design-partner employee can reach their payslip; a declaration reaches the TDS projection for the next run |
| C-32 | Apply for and approve leave, keep balances as a ledger, and carry loss of pay into the run | 11 | — | FR-LV-001, FR-LV-004, FR-LV-005; FR-ATT-021 | Product lead | A month's LOP reconciles from leave and attendance to the payslip line |
| C-33 | Settle full-and-final for a leaver, including statutory exit processing and EPFO exit marking | 1, 3, 7 | — | FR-PAY-801 to FR-PAY-803; FR-OPS-018 | Engineering lead | One real leaver settled, or a seeded case (§05.20 fixtures) if no partner has one before the gate |
| C-34 | Compute arrears from effective-dated revisions as diffs against locked months | 1, 2 | A-06 stays fenced | FR-PAY-401; FR-PAY-306; §06.14 TV12 | Engineering lead | TV12 passes; an arrears batch shows its PF liability dated from the disbursal date (§08) and routes the return leg to the fenced flow (F-03) |
| C-35 | Enforce the permissions matrix and keep the immutable audit trail on every read and write | 1, 10 | — | FR-CHR-105; NFR-SEC-202, NFR-SEC-401; FR-PAY-1001 | Security lead | Every maker-checker cell's self-approval test is refused and logged (FR-CHR-105's test) |

| C-52 | Export every statutory record the tenant holds with us — registers, wage slips, artefacts, portal acknowledgements, ledger entries, on-behalf log, coverage statements — on demand and at contract end, in the notified formats | 8 | A-18 | This section (below); §14.7 for retention classes | Product lead | One full export of a design partner's records is complete against its manifest, and every register in it matches the in-product render for the same period byte-for-byte |

C-24 includes shift definitions and the holiday and weekly-off calendars (FR-SHF-001, FR-SHF-004), without which punch pairing cannot decide a day's status. C-01 to C-35 and C-52 are the whole of R1; C-52 was numbered after the R2 and R3 rows below because the gap was found after they were drawn.

**Why C-52 is R1, and its acceptance.** The employer's retention duty runs "five years after the date of last entry" or "five calendar years from" it, depending on the rule-set, and the register OSH r.76 covers may not be destroyed even then (EV-054). That duty sits with the employer; a product that ends a contract without handing records back leaves the employer unable to produce the records its retention duty still requires. Whether any retention or production duty reaches us as the processor is not stated here — statutory basis under counsel review (§23). No other section specified the export, so it is fixed here: (a) the export covers every period the tenant ran with us, with no gap across joiners, transfers and exits (the §07.4 register-export criterion, extended to every record class above); (b) each register is exported in the form configured for the establishment's state, and each artefact exactly as filed, never re-rendered from current data; (c) the export carries its own manifest with hashes, so the tenant can prove completeness to an inspector; (d) at contract end, the export is delivered before any erasure under §14.7 begins, and erasure of statutory records never runs while the retention period the rule-set sets is live. The file format is §14's and §16's to specify; routed there.

**What is deliberately not on the list.** The published price card (item 16 — R1 design partners are on contracted terms), the named-source importers (item 17), the FBP data model (item 18), recruiting ingest (item 19), the thin CA console (item 20a), the device compatibility matrix (item 21), the ECR part-payment file (A-05), the annual returns (A-20, A-21), and every fenced leg in §05.18. Each has an R2 or R3 tag and, where fenced, its blocker. The Free tier's self-serve signup arrives with the price card in R2: R1 serves contracted design partners only, so the 10–19 funnel (§05.1) opens in R2, not R1.

#### The R1 surfaces — what a user actually sees

The review also found no screen defined anywhere. This inventory fixes which surfaces exist in R1 and what bounds each; layout and interaction are design work downstream of it.

| Surface | Primary user | Capabilities | R1 boundary |
| --- | --- | --- | --- |
| S-01 Tenant and registration set-up | Tenant admin, with the filing desk | C-01 | Every registration a design partner holds; no group-entity consolidation (item 22) |
| S-02 Employee master | HR lead | C-02, C-03, C-35 | Aadhaar shown masked from the token store; flags for own-roll/contract and International Worker |
| S-03 Import and tie-out | HR lead, with the filing desk | C-05 | Excel/CSV only; the tie-out report blocks go-live until clean |
| S-04 Payroll month console | Payroll operator | C-06, C-07, C-08, C-23, C-34 | OPEN to FILED with the variance view; reprocess repeatable |
| S-05 Approval artefact | Approver | C-07 | Totals, variance drivers, each statutory liability with its due date and any provisional label (§03 owns its content) |
| S-06 Disbursement | Payment approver | C-22 | Bank file generate, release, reconcile |
| S-07 Filing calendar | Tenant admin, filing desk | C-20 | Per registration; fenced entries shown as fenced, with their notice |
| S-08 Filing instance | Payroll operator, employer submitter | C-09 to C-16, C-21 | The artefact, pre-validation, portal form-control values, checklist (Mode A); session record (Mode B) |
| S-09 Co-attended session console | Filing desk operator | C-21, C-30 | Mode B only; no credential ever displayed or held |
| S-10 ECR ledger | Payroll operator | C-10 | Month-by-month, with the M−4 warning |
| S-11 Coverage statement | Tenant admin, approver | §05.21 | Current version, history and every line's state and notice |
| S-12 Registers and wage slips | HR lead, inspector on request | C-18 | Render any past period in the notified format; finalised registers read-only |
| S-13 Employee self-service | Employee | C-31, C-32, C-04 | Payslips, declarations, leave, consent; vernacular frame only (NFR-L10N-1301) |
| S-14 Devices | Tenant admin | C-24 | Registration, health, quarantine of unknown serials |
| S-15 Assistant | Every persona | C-26 | Read, explain and draft only; never submits, never computes a statutory figure (§12) |
| S-16 Rule pipeline and fence register | Statutory desk | C-25; §05.18 | Internal; authoring, two-person review, publish, rollback; the artefact-family readiness records (§05.20), read-only outside AF1 to AF8 |
| S-17 Incident console | Security lead | C-29 | Internal; the six-hour clock visible from detection |

#### Cross-section priority reconciliation

Other sections carry priority labels written before this rule existed, and two sections routed conflicts to §05 for a ruling. The rulings below are §05's; each section owner relabels in their own file.

| # | Where | What conflicts | §05 ruling | Routed to |
| --- | --- | --- | --- | --- |
| PR-01 | §08 FR-PAY-903 (P1) vs §16.13 (reconciliation in P0) | Whether credit reconciliation ships in R1 | P0, R1, under item 33; "paid" is not true until credits reconcile | §08 owner |
| PR-02 | §08 FR-PAY-705 (P0) vs A-27 (deferred) | Whether the bonus return ships in R1 | The return and the legacy registers are A-27 behind fence F-09, not P0; statutory bonus computation (FR-PAY-208) stays P0 under item 1 as a labelled provisional computation with an operator-confirmed ceiling (§06.7) | §08 owner |
| PR-03 | §08 FR-PAY-704 (P0) | No state's LWF row is sourced (EV-015), so nothing in it can ship in R1 | The per-state machinery is built under item 7 so a published state pack switches it on without a deploy; the remittance capability is R2 per state (A-17, F-07) | §08 owner |
| PR-04 | §08 FR-PAY-707 (P0) | The Tax Year 2026-27 leg is BLOCKED (AC-707.1) | Read as two rows: distribution (C-15, R1) and the Tax Year 2026-27 leg (R3, F-01); no relabel needed | — |
| PR-05 | §08 FR-PAY-105 (P2) vs Chain B B1 and Example E | Whether per-employee state resolution for computation waits for v2 | Split: per-employee jurisdiction resolution for PT and LWF computation (AC-105.1's behaviour) is R1 wherever two or more of a tenant's states are sourced; group-entity payroll operations stay P2 (item 22) | §08 owner |
| PR-06 | §22 "P0 · fenced" (FR-OPS-001, 003, 006, 012, 015, 020–024) | A composite label that lint L5 rejects | Read as "R2 · F-08": fenced legs carry a release tag and a blocker, not a priority | §22 owner |
| PR-07 | §05.5 item 15 "P0-arch" | A composite label in this section | Corrected to P0 (the seam, one backend) | Done |
| PR-08 | §05.5 item 20 "P1→P2" | A composite label in this section | Split: 20a thin console, P1, R2; 20b productised console, P2, v2 | Done |
| PR-09 | §16.13 Excel/CSV onboarding import (P0) vs §05.5 (no row) | A P0 elsewhere with no module row here | Added as item 32, P0 | Done |
| PR-10 | §23.13.3 "Mode B" for operator submission vs §22 FR-OPS-001 "Mode C" | Two letterings for one mode | §22 owns the modes; this section uses §22's letters (A employer-attended, B co-attended, C operator-attended, D CA-attended) | §23 owner |
| PR-11 | `gratuity_ceiling` (this section) vs `gratuity.payable_ceiling` (§08, §22 FR-RULE-006) | Two names for one parameter | §08's name is canonical; this section's is an alias (PH-01, §05.22) | Done |
| PR-12 | §19.12 Phase 0/1/2 vs releases | Two vocabularies for one timeline | Phase 0 is R1 in PLANNED or IN_BUILD up to the pre-launch gate; Phase 1 runs from R1 RELEASED to the R3 gate; Phase 2 is v2. Where §19's target is stricter, §05.4's gate opens the next phase (§19.12 already says so) | — |
| PR-13 | §16.13 Tally GL journal export (P0) vs §05.5 (no row) | Whether the accounting export ships in R1 | R2, P1: it is neither a filing nor a payslip, and a design partner's accountant can post the month's journal from the payroll register in R1. It stays first in the integration queue because Tally owns the accounting job (EV-032) | §16 owner |
| PR-14 | §16.13 email and DLT-SMS channels (P0) vs §05.5 (no row) | Whether notification channels are an R1 capability | R1, as infrastructure under C-31 and the coverage notices (§05.21), not as a separate capability | — |
| PR-15 | §11 BEN-13, BEN-34, BEN-38 and BEN-41 ("P0 (if offered)") and §08 FR-PAY-106 (P1), against §05.5 item 18 (P1) and no register row for Form 123 | Whether perquisite valuation and the Form 123 statement ship in R1 | Neither ships in R1. The benefits data model and perquisite valuation are C-38 (R2, P1). The Form 123 statement is A-29 and C-53 (R3, fence F-12). In R1, a design partner's taxable perquisite enters the TDS base only as an operator-entered value with its recorded source — AC-106.4's pattern, applied to every perquisite head — so TDS is never under-deducted because the engine cannot yet value a perquisite | §11 owner; §08 owner (RT-15) |

---

### 05.18 The fence register — blockers as first-class records

A **fence** is an external or counsel blocker that stops an artefact, a delivery mode or a state for every tenant it touches. A **parameter hold** is narrower: a named parameter is unset, and each computation that reads it behaves as §05.22 defines. §05.7 lists the fences as a table for reading; the product needs them as records, because four behaviours read them — the BLOCKED reason on a filing instance (FR-PAY-711 F2), the coverage line a tenant sees (§05.21), the SLA carve-out (§05.9) and the release scope (§05.20). A fence that lives only in a document gets forgotten in exactly one of those four places.

The fence register does not replace §22's watch dependencies (FR-RULE-006): the watch key says *what to watch*; the fence record says *what the product does until the watch fires, who owns it, and what clearing it releases*.

#### The fence record — data definition

| Field | Type | Rule |
| --- | --- | --- |
| `fence_id` | F-01…; per-state and per-portal fences are instantiated as `F-06[MH]`, `F-08[EPFO]` | One instance per state or portal, so a partial clearance is never a partial state |
| `title` | Text | Names the blocker, not the symptom |
| `blocker_class` | authority-format · authority-portal · authority-regime · state-data · desk-capture · desk-read · counsel | Decides who can clear it and how |
| `blocks` | Artefact rows (A-…), capabilities (C-…), modes | Every blocked row carries this `fence_id` in its `blocker_ids` (§05.17) |
| `watch_ref` | An FR-RULE-006 watch key, a capture task, or a counsel-register item (CR-…) | A fence with none of the three is not a fence; it is a hope |
| `clear_condition` | The observable artefact whose existence clears it | Always an artefact — a published version, a captured template, a recorded counsel answer — never a date |
| `interim_posture` | What the product does while the fence is open | Must keep the deadline visible and must never guess (§22 P9) |
| `sla_treatment` | carve-out (authority-caused, pre-declared) · carve-out (state not offered) · narrowed SLA · outside-denominator | Read by §05.9's miss taxonomy and §19's Filing Coverage |
| `notice_id` | Tenant-facing notice template | The text is a governed artefact (FR-RULE-015); Legal lead clears any legal statement in it (§23.1.6) |
| `on_clear_work` | Work packages (§05.19) started by clearance | Lets the release plan price the time from clearance to shipping |
| `clear_to_ship_days` | Named parameter per fence — the build and validation time after clearance | Set by the Engineering lead; routed to §20 until measured |
| `owner_role` | One role | Mandatory |
| `state` | Lifecycle state (below) | Transitions only by the table below |
| `last_checked_at` | Timestamp | Updated by the watcher or the owner; a stale check is a finding at every operating review |
| `evidence_refs` | EV IDs and research references | The grounds the fence stands on |

#### The register

| ID | Fence | Class | Blocks | Clear condition | Interim posture | SLA and metric treatment | Owner | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| F-01 | Form 138 Q4 regular and Q4 correction formats unreleased | authority-format | A-13; the Tax Year 2026-27 leg of A-14 and C-15 | The Q4 watch keys fire and the format version publishes through the §22 pipeline | Q1–Q3 ship; Annexure II data prepared continuously so Q4 becomes a writer, not a data problem | Carve-out, authority-caused, pre-declared (§05.9); outside the on-time denominator, listed in §19's coverage-gap register | Statutory desk lead | EV-046, EV-047, EV-048 |
| F-02 | Tax Year 2026-27 correction filing not yet enabled on the e-filing portal | authority-portal | The submission leg of A-12 | The watcher records the portal function enabled (FR-RULE-006) | Correction generated, FVU-validated and held with its exposure clock (AC-015.4) | Authority-caused; exposure shown to the tenant | Statutory desk lead | §22.4.3 (r1/06, r3/05) |
| F-03 | ECR arrear-return layout unpublished | authority-format | A-06 | The layout is obtained from the authenticated portal with a design partner and published | Arrears surfaced with their due month, the PF liability dated from the disbursal date (§08); run as an attended task on EPFO's own flow | Arrear returns outside the SLA until shipped | Statutory desk lead | EV-043 |
| F-04 | The ESI regime after the one-year saving lapses on or about 21 November 2026 | authority-regime | A-09; post-lapse periods of C-11 and C-12 | A successor or an extension is notified, corrigendum-checked and published (§20 V-08) | The platform posture PH-12 and the straddle rule PH-13 (§05.22) | Post-lapse instances BLOCKED (FR-PAY-711 F2); coverage-gap register | Statutory desk lead with Legal lead | EV-002, EV-004; §06.9 |
| F-05 | ESIC monthly contribution template unconfirmed | desk-capture | A-08; C-12 | The template is captured from the portal with a design partner and versioned as `esic_mc_template_version` | ESI computed and shown as a worksheet; the operator keys it into the portal | ESI computation in the SLA; the upload file is not | Filing desk lead | r3/05 (low) |
| F-06[state] | The state's PT row is not state-primary-sourced | state-data | A-16 for the state; the Maharashtra return leg of A-15 | The state onboarding pack publishes (FR-RULE-017) with a complete citation and a recorded corrigendum check (AC-RULE-002.3) | The state is not offered; no aggregator figure ships | CARVED_OUT_FENCE per state (§05.21) | Statutory desk lead | EV-014, EV-015; §20 V-09 |
| F-07[state] | The state's LWF row is not sourced | state-data | A-17 for the state | As F-06 | As F-06; a sourced "no levy" row yields NOT_APPLICABLE, never a false obligation (Example I) | As F-06 | Statutory desk lead | EV-015; r1/06 |
| F-08[portal] | Operator-attended submission (Mode C) not cleared by counsel | counsel | A-23 for the portal; Mode C sessions | CR-17a to CR-17f answered in the counsel register (FR-LEG-040), a contract term allocating liability exists, and — for the income-tax upload — CR-17c too | Modes A and B for every filing; Mode D is P1 | The SLA narrows to artefact readiness, warning lead time and co-attended guidance (§05.12) | Legal lead | §22.2.3; §23.13 |
| F-09 | Code-era statutory bonus return and ceilings unconfirmed | authority-regime | A-27; the return leg of FR-PAY-705 | `bonus.annual_return_form` carries a verified source (FR-RULE-006) | Provisional computation, labelled, with the operator confirming the ceiling and recording its source (§06.7) | The bonus return is outside the SLA | Statutory desk lead | §06.7 |
| F-10 | TDS deposit dates under r.218 of the Income-tax Rules 2026 not read | desk-read | On-time judgement of A-10's monthly deposit lines | r.218's text is read and published (FR-RULE-006) | The 1962-Rules convention (7th; March by 30 April) is shown, labelled **[Hypothesis]** | Deposit timing is not judged and sits in the coverage-gap register; computation stays in the SLA | Statutory desk lead | EV-050; §06.5, §05.9 |
| F-11[state] | State-sphere forms for the registers and the appointment letter not captured, under whichever regime the state's `code_regime` row says is in force | state-data | The state forms of A-18; A-19 for the state | The state's forms are captured and published per state (EV-053 makes form numbers configuration) | Central-sphere formats for registers; no appointment letter offered in an uncaptured state | CARVED_OUT_FENCE for the affected lines | Statutory desk lead | EV-053, EV-057; r3/04 |
| F-12 | Form 123 (ex-12BA) field layout and issue date not read | desk-read | A-29; C-53 | CBDT's Form 123 guidance and the form's text in the Income-tax Rules 2026 are read, and the layout is published as a format version (FR-RULE-007) | Perquisite values and their valuation basis are held per employee — operator-entered with their source in R1 (PR-15), valued by the engine from C-38 — so the statement becomes a writer, not a data problem. No Form 123 is rendered | Outside the SLA until shipped. Desk work, so an open F-12 at R3's gate is a failing check, not a carve-out | Statutory desk lead | EV-050; §06.5; r5/02 |

F-10 is the cheapest fence on the list — a desk read of one rule — and it touches the one obligation every tenant has from employee one. It is scheduled before the pre-launch gate for that reason, in the same way A-08's template capture is (§05.7). F-12 is the same kind of fence, one release later.

**The fenced list, by who holds the key.** The register is ordered by ID. Read by who can clear each fence, it shows where effort buys anything: our desk can clear three fences outright and shorten four more, while authorities and counsel hold the rest.

<!-- DIAGRAM: scope-phasing-fence-blocker-map -->

| Who holds the key | Fences | What we control | Gate treatment while open |
| --- | --- | --- | --- |
| CBDT and Protean, by publishing a format | F-01 | Nothing about timing. We prepare the annual data (below) and key the watch to the Q4 anchors (AC-1005.2) | Carve-out, authority-caused |
| The income-tax e-filing portal, by enabling a function | F-02 | Nothing. Corrections are generated and held | Carve-out, with the exposure shown |
| EPFO, whose arrear layout sits behind its authenticated portal | F-03 | The capture session with a design partner | Outside the SLA until shipped |
| ESIC, MoLE and the central Government, by notifying a regime | F-04, F-09 | The posture while unset (PH-12, PH-13; §06.7's operator-confirmed ceiling) | Carve-out; instances BLOCKED |
| State governments, through instruments our desk must source | F-06, F-07, F-11 | Which states are sourced first, ordered by demand (FR-RULE-017) | Carve-out per state. For a design partner's state, an open F-11 is a failing check |
| Counsel | F-08 | When the questions are put (R1E-07) | Narrowed SLA |
| Our desk alone | F-05, F-10, F-12 | Everything | A failing check at the gate that needs it, never a carve-out |

**What clearing each fence starts — the `on_clear_work` field, filled in.** The work is known now; only its start date is not. Listing it lets `clear_to_ship_days` be estimated before the day, and stops a cleared fence waiting on work nobody scoped.

| Fence | On-clear work | Evidence that closes it (FL8) |
| --- | --- | --- |
| F-01 | Q4 layout as a format version; Q4 writer and correction writer in WP-14; FVU stack pinned for the period; Annexure II and III mapping from the prepared data; FR-OPS-015 runbook version; a golden fixture from the published sample if one is released | FVU pass on the fixture and on real data; the first real Q4 submission (PL-01 for Q4) |
| F-02 | None to build — held corrections re-queue automatically (AC-015.4) | Each held correction submitted and receipted, or re-generated against newer data |
| F-03 | Arrear layout as a format version; arrear writer in WP-14; FR-OPS-013 variant runbook; fixtures from the authenticated portal's sample | EPFO upload validation on a real arrear batch |
| F-04 | New ESI rule versions; §06.14 TV3 and TV4 re-baselined; diffs for affected periods (FR-PAY-306); a runbook check against any ESIC portal change | Golden corpus green; affected months corrected |
| F-05 | Template writer against `esic_mc_template_version`; FR-OPS-014 runbook step | One real upload accepted |
| F-06, F-07 | The state onboarding pack (FR-RULE-017) — slabs or amounts, periodicity, due day, registration types, return format; calendar rows; FR-OPS-017 runbook; golden cases | The state's first real return or remittance receipted |
| F-08 | Vault, check-out and break-glass switched on for the portal (FR-OPS-020 to FR-OPS-024); Mode C runbook version; operator certification (FR-OPS-026); the authority instrument (FR-OPS-002) | The first Mode C session on the portal completed with its on-behalf log |
| F-09 | Bonus return writer against `bonus.annual_return_form`; register forms | A real return accepted, or its format's golden case green where no portal validation exists |
| F-10 | r.218's dates as calendar rule rows; on-time recomputed for deposits since R1 under SS-4's version rule | Deposit lines judged from the next due date |
| F-11 | The state's form templates and their field maps from the master | A render reviewed against the notified form |
| F-12 | Form 123 layout as a format version; the statement writer; its tie-out to the year's perquisite totals (§11.17) | A render reviewed against the published form, with totals equal to the valuation output for the Tax Year |

#### The fence lifecycle

<!-- DIAGRAM: scope-phasing-fence-lifecycle -->

The diagram illustrates; the table specifies.

| # | From → To | Event | Guard | Side effect | Who may trigger |
| --- | --- | --- | --- | --- | --- |
| FL1 | *(none)* → OPEN | Fence registered | Every field above is set, including `watch_ref`, `interim_posture` and `sla_treatment` | Dependent filing instances enter BLOCKED with this fence as reason (FR-PAY-711 F2); affected coverage lines become CARVED_OUT_FENCE (§05.21); rows gain the `fence_id` in `blocker_ids` | Owner |
| FL2 | OPEN → SIGNALLED | A watch key fires, or a capture attempt yields a candidate | — | A change request opens (FR-RULE-003 R1); no product behaviour changes (AC-RULE-006.1) | Watcher, analyst or operator |
| FL3 | SIGNALLED → OPEN | The candidate is not the awaited source — a draft, an unrelated instrument, or a portal banner that is a lead rather than a rule | For an amendment or corrigendum, a second analyst concurs (FR-RULE-003 R3) | Reason recorded; `last_checked_at` updated | Analyst plus concurring reviewer |
| FL4 | SIGNALLED → VERIFYING | The candidate is the awaited source | Captured raw and rendered, archived with hash (FR-RULE-007) | Authoring begins through the pipeline | Analyst |
| FL5 | VERIFYING → OPEN | The answer is negative or partial — a counsel answer that does not clear, a successor that is only a draft, a template that differs across two captures | — | Residual instances stay open; a partial clearance is modelled as a closed instance plus an open one (for example `F-08[EPFO]` cleared, `F-08[income-tax]` open) | Owner |
| FL6 | VERIFYING → CLEARED | The clearing artefact exists | A rule, format or runbook version is certified and published (FR-RULE-010, 012, 013), or a counsel answer is recorded with scope and date (FR-LEG-040) | `on_clear_work` work packages become startable | Statutory desk lead, or Legal lead for a counsel fence |
| FL7 | CLEARED → IMPLEMENTING | Work starts | The work packages named in `on_clear_work` exist in the ledger | Release tags on blocked rows confirmed, or rescoped through §05.20 RS6 | Engineering lead |
| FL8 | IMPLEMENTING → SHIPPED | The blocked artefacts pass their release-gate evidence (§05.20) | For a new artefact family, its PL-01 evidence exists | Dependent instances re-queue (FR-PAY-711 F3); coverage statements re-versioned to IN_SLA or SLA_PENDING_FIRST_SUBMISSION; tenant notices (FR-RULE-015); fence closed | Owner |
| FL9 | CLEARED, IMPLEMENTING or SHIPPED → REOPENED | A corrigendum, withdrawal or retraction of the clearing source, or a counsel answer reopened by a watch item (§23.17) | — | If shipped, the pack rolls back (FR-RULE-014); affected instances return to BLOCKED; coverage lines revert with a notice | Statutory desk lead or Legal lead |
| FL10 | REOPENED → OPEN | Rollback published | — | The fence resumes as if never cleared; the episode stays in its history | Owner |
| FL11 | OPEN → DEFERRED | Change control moves the blocked artefact out of v1 (§05.23) | Approved change request | The artefact moves to the deferred register (§05.22); the watch stays live | Product lead |
| FL12 | DEFERRED → OPEN | The re-entry trigger fires and change control re-admits the artefact | Approved change request | Blocked rows re-tagged to a release | Product lead |

#### Outcomes decided in advance — the fences whose answer changes the plan

A fence's clearing event is not always good news, and the response to each plausible answer is decided now so it is not improvised on the day. Every table below is a decision, not a forecast.

**F-04 — the ESI regime after the saving lapses.**

| Outcome observed | Product response | Release consequence | Coverage and SLA |
| --- | --- | --- | --- |
| The saving is extended on the same instruments | A published version extends the effective range of the current ESI rule versions; no computation changes | None | Lines return to IN_SLA from the extension's effective date |
| A successor changes rates or the ceiling, not the base | New rule version; §06.14 TV3 and TV4 re-baselined; periods since the effective date corrected as a diff | A-09 ships in R2 as a version | IN_SLA from publication; affected months take the correction path |
| A successor redefines the contribution base or the contribution-period mechanics | Structural rework; Example C's continuity logic re-examined | ESI leaves the critical path for a fast-follow (§05.12); rescope RS6 | CARVED_OUT_FENCE until shipped |
| Nothing is notified by the lapse date | Post-lapse instances BLOCKED; payroll is never blocked; PH-12's posture applies; escalation per §06.9 | None — PL-04 already requires PH-12 set | CARVED_OUT_FENCE; the notice names the posture in force |
| Something is notified and then amended by corrigendum | FL9; rollback; the corrected version republished | As whichever row above the corrected text matches | Lines revert, with a notice, then follow that row |

PH-12 (`esi_post_cliff_payroll_posture`) is not decided here, because the adequacy of each option is a legal question (§20 V-08; §23). The product supports all three and ships none as a default: **(a)** continue computing and deducting under the last saved version, marked provisional, contributions held pending the successor; **(b)** compute and accrue the employer liability but suspend the employee deduction; **(c)** a per-tenant election, recorded with the tenant's acknowledgement. The amounts at stake are visible on every approval artefact (FR-PAY-301 M6). For an establishment with 12 ESI-covered employees each on ESI wages of ₹18,000, a month is 12 × (0.75% × ₹18,000 + 3.25% × ₹18,000) = 12 × (₹135 + ₹585) = **₹8,640** — ₹1,620 of employee share and ₹7,020 of employer share (rates and ceiling per r1/06, pending re-baseline against the 8 May 2026 Rules — r2/10). Under (a), ₹1,620 leaves employees' pay and ₹8,640 is held; under (b), nothing leaves pay and ₹8,640 is accrued, of which the product cannot presume that the ₹1,620 employee share is later recoverable.

PH-13 (`esi_cliff_straddle_rule`) governs the November 2026 wage month, whose days fall both before and after the lapse. The options are: the whole month under the regime in force on the wage period's last day; a day-apportioned split; or resolution by disbursal date through the evaluation context (FR-PAY-210). No option is shipped as a default; a November 2026 payroll month for an ESI-covered establishment cannot reach LOCKED until PH-13 is set.

**F-01 — the Form 138 Q4 formats.** The Tax Year 2026-27 Q4 statement is due 31 May 2027 and the certificate 15 June 2027 (EV-049; r.215). `q4_min_build_lead_days` is the Engineering lead's estimate of writer build, FVU validation and two-person review after publication — unset, routed to §20.

| Format publication | Response | SLA |
| --- | --- | --- |
| Regular format published at least `q4_min_build_lead_days` before 31 May 2027 | R3 builds the writer against the published format; FVU pass on the published fixture and on real data; the first real Q4 submission is the Q4 leg's PL-01 | Q4 joins the SLA on its first real submission |
| Published later than that | The prepared Annexure II data is exported as a worksheet for the deductor or its CA to use with the authority's own preparation utility, if the release includes one; the product-generated file follows for later periods | Carve-out for that year's Q4; the deadline and exposure stay visible |
| Not published by 31 May 2027 | Nothing is guessed (AC-707.1); the deductor's obligation and deadline are shown; Form 130 for Tax Year 2026-27 cannot be distributed because TRACES cannot build it (EV-046, EV-048) | Carve-out, authority-caused |
| Regular published, correction format not | Q4 regular ships; Q4 corrections are not generated until their format publishes, so `F-01` stays open for that leg alone | Regular in the SLA; corrections carved out |

**F-08 — operator-attended submission, per portal.** What each counsel answer does to the operation is §22.2.3's; this table adds only the release consequence.

| Counsel outcome | Mode C | Release consequence |
| --- | --- | --- |
| CR-17a, b, d, e and f answered favourably for a portal; liability term signed; insurability confirmed | Available on that portal | A-23 ships in R2 for that portal |
| As above, but CR-17c unfavourable or open | Mode C on EPFO, ESIC and PT portals as cleared; the income-tax upload stays in Modes A and B | Partial R2: `F-08[income-tax]` stays open |
| CR-17a or CR-17b unfavourable for a portal | None on that portal | The carve-out stays for that portal; §05.12's attended-filing row applies |
| CR-17e or CR-17f open | None anywhere — liability is unallocated | The carve-out stays everywhere; R2 exit uses the declared-carve-out branch (R2X-02, §05.20) |
| CR-17d answered: the DSC is personal to the signatory | Signing stays with the signatory in every mode (§22 P6) | None — the design already assumed it |

**F-06 and F-07 — which states enter, and when.**

| State row sourced? | A design partner or waitlisted tenant operates there? | Response |
| --- | --- | --- |
| Yes | Yes | Offered; R2 per state; the state's PL-01 is its first real return |
| Yes | No | Published but not marketed; offered to the first tenant who needs it |
| No | Yes | Sourcing prioritised by demand (FR-RULE-017); the tenant is admitted with that state CARVED_OUT_FENCE (§05.21) |
| No | No | Not sourced until demand appears or item 23 (P2) begins |
| Sourced as "no levy" | Any | NOT_APPLICABLE lines; no obligation raised |
| A row exists but its citation is incomplete — Karnataka's amending notification, for instance, is unretrieved (EV-014) | Any | The version cannot leave DRAFTING (AC-RULE-002.3); the state stays fenced |

**F-03 — the arrear layout.** If the layout is obtained and published before the R3 gate, the arrear generator ships in R3. If not, A-06 moves to DEFERRED by change control (FL11) and is re-admitted when the layout is published; until then arrears remain attended tasks on EPFO's own flow, each shown with the due month its disbursal date sets (§08).

#### Interim postures that carry data — F-01 and F-05

Most interim postures are a notice and a deadline clock. Two of them also keep data in a state that makes clearing the fence cheap, so they are specified here. Left unspecified, "prepare the data" drifts into "we will sort it out when the format lands".

**F-01 — the format-neutral annual store.** The Q4 layout is unknown. The store therefore holds the product's own computed facts per deductee and month, and never a guessed Annexure II layout.

| Element | Content | Rule |
| --- | --- | --- |
| Deductee | Employee reference, PAN status, and the deductor's TAN | One row per deductee per TAN per Tax Year; a transfer between TANs opens a second row |
| Month | Wage month, plus the disbursal date the evaluation context used (FR-PAY-210) | Salary for one Tax Year paid in the next carries the cross-year flag (§06.14 TV63) |
| Salary heads | Each computed head with its rule version | Written as locked; never recomputed to fill the store |
| Claims | Form 124 claims as granted, with their proof status | As applied in that month's TDS |
| Prior-employer and other TDS | Form 122 figures, or the "not furnished" state (§06.5) | A "not furnished" deductee stays flagged in every month it affects |
| Perquisites | Each value with its basis — operator-entered with its source in R1 (PR-15) | Also feeds A-29 |
| TDS | Amount deducted and deposited, with the challan identification matched to the `.csi` file (AC-706.2) | Deposit timing stays labelled while F-10 is open |
| Source | Product-computed, or imported from a prior system with its tie-out reference (§16.7) | Imported months are never re-derived |

Acceptance:

- At each month's LOCK, every deductee with salary in the Tax Year has a row for that month or a recorded reason (joiner, leaver, prior system). A missing row is a D4 evidence defect found that month, not a Q4 problem found in May.
- For each of Q1 to Q3, the store's totals equal that quarter's Form 138 statement as filed. Any difference becomes a reconciling item before the next quarter's statement.
- Nothing in the store is written in an Annexure layout, and no field is named after a guessed Annexure field. Mapping happens only as F-01's on-clear work.
- Under F-01's second outcome row (a format published too late to build), the export offered to the deductor is this store as a worksheet. It is labelled as the product's computation, not as a statement.

**F-05 — the ESI worksheet.** The ESIC template's columns are unconfirmed (r3/05, low), so the worksheet's layout is ours and claims no match to ESIC's.

| Element | Content |
| --- | --- |
| Per covered employee | The ESIC insurance number from the master (§07), wages for the month on the contribution base, the employee and employer shares, and the continuity basis where an employee above the ceiling is still covered for the period (TV3) |
| Exceptions | Every employee left out or carrying a zero share, with a reason code: the low-wage employee-share waiver (TV4), a leaver, or an unset `esi.average_daily_wage_basis`, which raises a configuration task and waives neither share (§06.12 R33; TV38) |
| Totals | Employee share, employer share and their sum, equal to the challan figure the approval artefact shows (FR-PAY-301 M6) |
| Keying record | For each line keyed into the portal, who keyed it and when, on the Mode B session record (§22.3) |

- After keying, the portal's own summary is reconciled to the worksheet totals. A difference of any amount is an SA-REC item (FR-PAY-713) and blocks payment initiation until it is explained.
- When F-05 ships, the worksheet stays available as the reconciliation view beside the upload file.

#### Fence ageing and escalation

An open fence is expected; a forgotten one is a defect. These conditions raise a fence out of the register and into someone's calendar.

| Condition | Escalation | To |
| --- | --- | --- |
| `last_checked_at` is older than the cadence set for its source (`watch.cadence[source]`, §22.8.4) | A finding at the next operating review, and a watcher-health check on that source | Statutory desk lead |
| A statutory date the fence governs is approaching — the ESI lapse for F-04, 31 May 2027 for F-01, the first deposit due after R1 for F-10, R3's gate for F-12 | The outcome table's response is armed in advance (§05.18), and the founder is briefed on which row is expected | Founder, with the fence's owner |
| A counsel fence is still open at the gate §23.16 names for its question | The gate check that needs it fails (R1X-01 to R1X-03, R2E-02) | Legal lead |
| A desk-capture or desk-read fence (F-05, F-10, F-11, F-12) is open when the gate that needs it convenes | A failing check at that gate, not a carve-out: desk work is ours to finish | The fence's owner |
| A fence has been REOPENED twice | Its clearing source is marked unstable; the next clearance needs a second independent capture before FL6 | Statutory desk lead |

#### The sourcing and desk-work queue — how blocked work is ranked

The monthly operating review decides "which desk memo or state pack to prioritise" (§05.23). This is the rule it decides by, because the alternative is that the loudest tenant sets the desk's order — and the desk, not the codebase, is the capacity constraint (§05.15).

Only work we can finish enters the queue at all. §05.18's "who holds the key" table splits the register: **F-05, F-10 and F-12 are ours outright**; **F-03, F-06, F-07 and F-11 need a capture or a primary-source read that is ours to schedule**; **F-01, F-02, F-04, F-08 and F-09 are held by an authority or by counsel**, and for those effort buys nothing beyond the watch cadence, the ageing escalation and an outcome table written in advance — they are *armed, never queued*. Parameter holds split the same way: one whose answer is a desk read (PH-05, PH-11, PH-14) queues; one that waits on a notification or a counsel answer (PH-12, PH-13) does not.

<!-- DIAGRAM: scope-phasing-desk-queue -->

**The queue item.** Each entry is a fence instance or a queueable hold, carrying only fields that already exist elsewhere, so nothing has to be estimated to rank it.

| Field | Source | Note |
| --- | --- | --- |
| `item` | A fence instance (`F-06[TS]`) or a hold (PH-05) | Per state and per portal, exactly as the fence register instantiates them |
| `class` | The fence's `blocker_class` | Decides whether it queues at all |
| `gate_dependency` | The earliest gate check that reads FAIL while it is open (§05.18 ageing table) | Empty for a fence that fails no check |
| `blocked_instances_month` | The carve-out counting rule (§05.21), summed over admitted tenants and waitlisted prospects | Continuous and event-driven lines are not counted, so they never rank on this field |
| `blocked_tenants` | The same statements | Waitlisted prospects counted separately |
| `effort_class` | S, M or L, declared by the fence's owner | A class, never a duration — §05.19's rule that this section fixes order, not speed |
| `date_pressure` | Whether a statutory date the fence governs is inside its escalation window | From the ageing table |

**The ordering rules.**

| ID | Rule |
| --- | --- |
| QR-1 | Anything that makes a gate check read FAIL *and* is ours to clear ranks first, in gate order — R1's checks before R2's before R3's. Within one gate, fall through to QR-3 and QR-4 |
| QR-2 | Then anything whose `date_pressure` is set, so its outcome table is armed before the date rather than after it |
| QR-3 | Then by `blocked_instances_month`, descending |
| QR-4 | Ties break by `blocked_tenants` descending, then `effort_class` ascending, then fence age descending |
| QR-5 | Demand with no admitted tenant and no waitlisted prospect behind it — a state nobody has asked for yet, item 23's groundwork — ranks below every item that has one, and is taken only with the slack left in `desk_sourcing_slots_per_review` (PH-25) |
| QR-6 | The queue is recomputed at every operating review and whenever a coverage-statement version changes a carve-out. An item never moves because it was asked for (SC-H); it moves when its counted inputs change — which a request does only by becoming an admitted tenant or a waitlisted prospect |

**Worked, on the tenants this section already carries** — WE-1 and WE-2 admitted, WE-3 waitlisted, every fence in the state §05.18 records for September 2026. The instance counts are read straight off the carve-out tables in §05.21.

| Rank | Item | Class | Gate it fails | Blocked instances a month | Blocked tenants | Rule that placed it |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | F-10 — r.218 deposit dates | desk-read | R1's pre-launch gate | **3** — WE-1's one TAN plus WE-2's two | 2 admitted | QR-1 at R1, then QR-3: the cheapest read on the register, touching the one obligation every tenant has from employee one |
| 2 | F-05 — the ESIC template | desk-capture | R1's gate; otherwise C-12 moves to R2 by rule | 0 counted — F-04 already blocks the same instances | 2 admitted, across 3 ESI registrations | QR-1 at R1, QR-4 on tenants. Its rank comes from the gate, not the count — which is why QR-1 exists |
| 3 | `F-11[MH]` — the state's register and appointment-letter forms | state-data capture | R1's gate for a design-partner state | 0 counted — continuous and event-driven lines sit outside the counting rule | 1 | QR-1 at R1, lowest of the three on QR-4 |
| 4 | `F-06[TS]` with `F-07[TS]` — the Telangana pack | state-data | none before R2X-04 | **4** — 2 PT plus 2 LWF across WE-1 and WE-2 | 2 | QR-3: the highest count of any state pack, and WE-1's home state |
| 5 | `F-06[MH]` return leg with `F-07[MH]` | state-data | R2X-04 | **2** | 1 | QR-3, then QR-4 on effort: Maharashtra's slab is already sourced, so only the return leg and the LWF row remain |
| 6 | `F-06[KA]` with `F-07[KA]` | state-data | R2X-04 | **2** | 1 | Tied with Maharashtra on count and tenants; ranked below it on `effort_class`, because Karnataka's amending notification is still unretrieved (EV-014) |
| 7 | PH-05 — the International Worker base | desk read, a memo | none — it blocks admission, not a check | **1** | 1 waitlisted | QR-3. It is the only item whose clearing converts a prospect (WE-3), so the unmet-demand measure is reported beside the queue |
| 8 | F-12 — the Form 123 layout | desk-read | R3's gate | 0 | 0 | QR-1, but in gate order R3 comes last |
| — | F-01, F-02, F-04, F-08, F-09 | authority or counsel | various | F-04 alone blocks 3 a month | 2 | **Armed, not queued.** Watched on cadence, escalated on age, outcome tables already written (§05.18) |

Three things the worked queue shows, and each is a decision rather than an accident. **A gate outranks a count**: F-05 blocks no instance a tenant would otherwise get — F-04 blocks them anyway — yet it ranks second, because a desk fence open at the gate that needs it is a failing check and never a carve-out. **The count is per registration, not per tenant**: WE-2's two TANs are what make F-10 a three-instance item against two tenants, the same asymmetry that drives the cost model (EV-088). **The order may be departed from, in the open**: the review records the computed order, and any departure is minuted with its reason — the one case anticipated is PH-05, where clearing rank 7 admits a waitlisted tenant while ranks 4 to 6 widen the SLA for tenants already paying. The rule does not pretend to settle that trade; it makes the trade visible and the choice recorded.

`desk_sourcing_slots_per_review` (PH-25) is the number of queue items a review may start, given the desk's size. It is the Statutory desk lead's to set, with the Filing desk lead, once the desk exists, and is routed to §20 until then; unset, the review starts what its leads commit to and records the number, so the parameter is calibrated from what actually happened rather than guessed (the same discipline as `clear_to_ship_days`).

#### A fence that lands on an R1 row mid-build

The register assumes fences are known before build starts. A new one can open while R1 is IN_BUILD — for instance, the revamped ECR leaves beta with a changed layout, or a new FVU version is announced for a Tax Year (§05.7, re-fence triggers). FL1 then puts the fence in every blocked row's `blocker_ids`, and lint L2 strips any P0 label.

Most such fences block only periods from an effective date. A period-scoped fence splits the artefact row by period, in the same way per-state fences instantiate per state: the existing row keeps the periods before the date, with its priority, and a new row takes the periods from it, carrying the fence. L2 then touches only the new row, and L6 still finds the P0 capability behind the old one. The table applies to the new row, and it bites hardest where the fenced periods include the wage months R1's tenants will run. What happens next depends on the row, and is decided here rather than on the day.

| The new fence blocks | Release consequence | Admission consequence |
| --- | --- | --- |
| An ECR row (A-01 to A-04), for wage months R1's tenants will run | Re-tagging the ECR to R2 is refused. With the ECR outside R1, AD-18 would admit no tenant at all, so R1 stays IN_BUILD until the fence's outcome table is written and the fence ships | No File-tier admission until the fence ships. Design partners already live keep Mode A artefacts for every wage month the prior format version still governs (FR-PAY-711 F4) |
| Another monthly family's row (the ESI upload file, a state's PT computation) | The row moves to R2 by SC-E, and R1 may pass without it | The family's lines read CARVED_OUT_FENCE, and admission continues |
| A quarterly or annual family's row (Form 138 Q1–Q3) | As above | As above. Lines that read SLA_PENDING_FIRST_SUBMISSION become CARVED_OUT_FENCE |
| A computation every tenant needs (the wage base, EPF, TDS) | R1 stays IN_BUILD. No rescope can remove a computation that payroll cannot run without | Existing tenants' runs follow the interim posture in the fence's outcome table, which must be written before their next LOCK. Payroll is never blocked for want of the new rule — the pattern PH-12 set for ESI |
| A capability with no statutory artefact (C-24 device ingest, C-26 assistant) | L2 applies, and SC-E moves the row to R2 | No coverage line changes |

#### Scope-health measures

These are the section's own programme measures. They carry no targets — none is evidenced — and are reviewed for trend at every operating review. Company metrics stay §19's.

| Measure | Numerator | Denominator | Source | What it tells the review |
| --- | --- | --- | --- | --- |
| Fence age | Today minus the fence's FL1 date | — | Fence register | Which blockers are aging, ranked |
| Carve-out share | Instances due in the period on lines in a CARVED_OUT state | Instances due on every applicable line | Coverage statements and the calendar | How much of the surface tenants need is still fenced; it bounds §19's Filing Coverage from below |
| Unmet demand per hold | Tenants with a NOT_OFFERED line citing the hold | — | Coverage statements | Which desk memo buys the most admissions (PH-05 first, by construction) |
| R1 completion | C-rows in DONE_WITH_EVIDENCE | All C-rows tagged R1 | Ledger | Gate readiness, without a status meeting |
| Lint rejections | Ledger changes the lint refused | All ledger changes | Lint log | Whether label discipline is holding |
| Invariant failures | Changes refused by SI-01 to SI-15, plus any invariant FAIL recorded at a gate | All ledger, fence and coverage changes | Lint log; gate records | Whether the ten scope records are drifting apart (§05.17) |
| Clear-to-ship time | FL8 date minus FL6 date | — | Fence register | Calibrates each fence's `clear_to_ship_days` against what actually happened |
| Sellable share of the built surface | Families at PL01_PASSED | Families in the release in force | Artefact-family readiness records (§05.20) | How much of what is built can be sold under the SLA; a gap that persists is a first-submission problem, not a build problem |
| Unexercised rule-text families | Families whose oracle is "rule text only" or "portal only" and whose first genuine occurrence has not yet been logged (H-5) | — | Readiness records; hypercare log | Where a misreading could still reach a portal unseen (§05.7, the oracle table) |

---

### 05.19 Build sequence — work packages, dependencies and what breaks if they are reordered

§05.7 fixes the two foundation chains (compliance-data schema → engine → validators → generators; registration model → calendar → filing ledger). This subsection breaks R1 into work packages a team can pick up, states each package's dependencies and exit test, and names the rework each wrong ordering causes. Durations are not given: they are the Engineering lead's sprint-zero estimates, recorded per package in the ledger, and nothing in this section depends on them. What this section fixes is order, not speed.

<!-- DIAGRAM: scope-phasing-build-dag -->

#### Work packages

| WP | Produces | Depends on | Lane | Serves | Exit test | Owner |
| --- | --- | --- | --- | --- | --- | --- |
| WP-01 | The rule object and the parameter registry, with every named parameter in this section as a typed, possibly unset slot | — | Rules | Chain A A1; every item | A1's exit test (§05.7): a change to the add-back percentage is a new row, not a deploy; an unset parameter blocks only its readers | Engineering lead |
| WP-02 | The rule pipeline minimum — authoring, two-person review, golden-case corpus, certification, staged publish, rollback | WP-01 | Rules | Item 12; C-25 | FR-RULE-010 to FR-RULE-014 on a seeded change; a rollback restores the prior version's outputs byte-identically | Statutory desk lead (process), Engineering lead (tooling) |
| WP-03 | The watcher and the watch-source register, subscribed to every published version's base instrument | WP-02 | Rules | Item 12; C-25 | AC-RULE-005.1: the November 2026 corrigendum episode replayed raises a change request against the rows it touches | Statutory desk lead |
| WP-04 | The statutory hierarchy — group, legal entity, registration, establishment — with jurisdiction on the work location | WP-01 | Obligations | Chain B B1; C-01 | B1's exit test (§05.7) | Engineering lead |
| WP-05 | The employee master: identifiers at their owning level, names as per PAN and UAN, own-roll/contract and International Worker flags, regime election; the Aadhaar token store | WP-04 | People | Item 10; C-02, C-03 | FR-CHR-104 placement checks; a schema scan finds no Aadhaar number or hash outside the token store | Product lead, Security lead |
| WP-06 | The consent record and SPDI written-consent capture | WP-05 | People | Item 35; C-04 | Item 35's acceptance (§05.5) | Legal lead, Product lead |
| WP-07 | Excel/CSV onboarding import, the YTD validator and the tie-out gate | WP-05, WP-06, WP-10 | People | Item 32; C-05 | Item 32's acceptance (§05.5) | Product lead |
| WP-08 | The component catalogue and salary structures | WP-01 | Engine | Item 1; C-06 | FR-PAY-108: every component carries its tax treatment, wage-base membership, proration and rounding | Engineering lead |
| WP-09 | The engine core — evaluation as a pure function of inputs, rule-set version and the enumerated context | WP-01, WP-08 | Engine | Item 1; Chain A A2 | A2's exit test: identical inputs, rule-set version and context give identical outputs on re-run (FR-PAY-210) | Engineering lead |
| WP-10 | The wage-base resolver with bounded fixed-point nodes | WP-09 | Engine | Item 2; C-08 | §06.14 TV6, TV7, TV25; FR-PAY-211 convergence within its iteration bound | Engineering lead |
| WP-11 | Statutory computations — EPF, ESI, PT machinery, TDS, gratuity, the LWF machinery, provisional bonus | WP-10 | Engine | Items 3–7; C-09, C-11, C-13, C-16, C-17 | FR-PAY-202 to FR-PAY-208 on §06.14's vectors | Statutory desk lead (rules), Engineering lead (code) |
| WP-12 | The payroll-month state machine, input locking and maker-checker | WP-09 | Engine | Item 1; C-07 | FR-PAY-301 AC-301.1–4, FR-PAY-302, FR-PAY-304 | Engineering lead |
| WP-13 | Validators at the authority's own severity, per artefact | WP-11 | Filing | Chain A A3 | A3's exit test: age-58 EPS blocks; the post-2014 high-wage case flags; a Revised ECR after payment initiation is refused; an unset parameter names its blocker | Engineering lead |
| WP-14 | Generators — ECR, Form 138 Q1–Q3 regular and correction, registers, wage slip, appointment letter — plus the two data-carrying interim postures, the F-01 annual store and the F-05 worksheet (§05.18) | WP-13, WP-12 | Filing | Chain A A4; C-09, C-11, C-14, C-18, C-19 | A4's exit test: the EPFO fixture byte-for-byte (TV16); FVU 1.2 pass; TV19–TV21 render; the store's monthly completeness check and SF-14 | Engineering lead |
| WP-15 | The per-registration calendar, each entry with its rule citation | WP-04, WP-02 | Obligations | Chain B B2; C-20 | B2's exit test: fenced states appear as fenced entries, never as aggregator dates | Product lead |
| WP-16 | The filing-instance state machine and the per-establishment ECR ledger | WP-15, WP-14 | Obligations | Chain B B3; C-10, C-20 | FR-PAY-711 AC-711.1–3; FR-PAY-712 AC-712.1–5 | Engineering lead |
| WP-17 | Modes A and B — artefact plus checklist, co-attended sessions, the on-behalf log, evidence capture, hand-back, supervised-minute metering | WP-16 | Filing | C-21, C-30 | FR-OPS-011's first-submission protocol run end to end on a design partner | Filing desk lead |
| WP-18 | The salary bank file, payment approval, credit reconciliation, challan reconciliation | WP-12 | Engine | Item 33; C-22, C-23 | Item 33's acceptance (§05.5); AC-902.1 | Engineering lead |
| WP-19 | The ADMS/WDMS receiver, device-to-employee resolution, punch pairing and the Form IX time model | WP-05 | People | Item 11; C-24 | §20 V-11 bench result; TV19; an unknown device serial quarantined | Engineering lead |
| WP-20 | Attendance into payroll — day status, loss of pay, overtime inputs | WP-19, WP-12 | People | Item 11 | FR-ATT-021; FR-OT-001's quarterly ceiling warns and never blocks, because the cap itself is **[Hypothesis]** (EV-012; §09) | Engineering lead |
| WP-21 | Tenant isolation, the immutable audit log, the CERT-In controls | — | Platform | Item 34; C-29 | NFR-SEC-201, NFR-SEC-401; item 34's acceptance | Security lead |
| WP-22 | Cost attribution and the provider seam | WP-21 | Platform | Items 14, 15; C-27, C-28 | 100% attribution; a second backend added by configuration | Engineering lead |
| WP-23 | The assistant, with every §12.8.3 rail in the call path | WP-22, WP-16, WP-02 | Platform | Item 13; C-26 | The redaction chokepoint's default-deny test; the kill switch defaults off for a regulated tenant | Engineering lead |
| WP-24 | The coverage statement and the admission rules | WP-04, WP-15, WP-25 | Obligations | §05.21 | TS-05-17 to TS-05-24 (§05.24) | Product lead |
| WP-25 | The fence register, the parameter-hold registry and the artefact-family readiness records, as records the product reads | WP-01 | Rules | §05.18, §05.20, §05.22 | A fence in OPEN puts every dependent instance in BLOCKED with its ID as the reason; AF4 on a seeded family re-versions its lines to IN_SLA, and AF7 raises RS8 | Statutory desk lead |

**The critical path.** WP-01 → WP-08 → WP-09 → WP-10 → WP-11 → WP-13 → WP-14 → WP-16 → WP-17 → the pre-launch gate. It runs through the engine and the filing lane because every R1 artefact is downstream of a correct wage base and a validated generator. The other lanes have slack against it and are scheduled to land before WP-16 needs them: the obligations lane (WP-04 → WP-15 → WP-24), the people lane (WP-05 → WP-06 → WP-07, and WP-19 → WP-20) and the platform lane (WP-21 → WP-22 → WP-23), which starts on day one because its CERT-In obligations do (EV-062).

**What may start before the foundations are frozen.** Two things, and only two. WP-21 (isolation, audit, CERT-In) has no statutory dependency. WP-19's device receiver needs only the employee identifier from WP-05, not the engine, and it carries the second-longest external dependency in R1 (the §20 V-10 and V-11 bench work), so it starts as soon as WP-05's identifier exists.

#### The R1 rule pack — what R1E-01 freezes

R1E-01's evidence is "the rule-version registry's R1 pack" (§05.20). This is that pack's manifest: each entry, the section that specifies it, its evidence grade, the golden cases that certify it, and the state it must be in when R1E-01 is evaluated. The manifest names content; it restates no rate — the values live in the sections cited. Three states are possible. **Certified** means published through two-person review with its golden cases green (FR-RULE-010, FR-RULE-012). **Slot** means an empty typed parameter whose readers halt on it — WP-01's exit test. **Fenced** means carried with its fence ID and interim posture. An entry still in DRAFTING or REVIEW when the check runs fails R1E-01 by name.

| ID | Pack entry | Specified in | Grade | Certified by | Required state at R1E-01 |
| --- | --- | --- | --- | --- | --- |
| RP-01 | The wage definition and the 50% add-back, with the (a)–(i) exclusions | §06.10 | [Verified] (EV-010) | TV6, TV7, TV25 | Certified |
| RP-02 | EPF contribution rates, the EPS split, the wage ceiling and the EPS-closure boundary | §06.2 | [Verified] | TV1, TV2, TV16, TV17, TV31, TV32 | Certified, with `epf.eps_closure_boundary_inclusive` set |
| RP-03 | The International Worker contribution base | §06.2 | [Hypothesis] | — | Slot (PH-05), BLOCK |
| RP-04 | The ECR return layout and packaging, as a format version | §06.2; FR-PAY-701 | [Verified] (EV-035) | TV16, TV18, TV33 | Certified |
| RP-05 | ECR return-type guards and the M−4 chronology | §06.2; FR-PAY-708, FR-PAY-712 | [Verified] (EV-037, EV-038) | SF-01, SF-02, SF-04 | Certified |
| RP-06 | ESI rates, ceilings, contribution periods, continuity and the class thresholds | §06.3 | [Verified], re-baseline pending (r2/10) | TV3, TV4, TV23 | Certified up to the lapse. Post-lapse periods Fenced (F-04), with PH-12 set (PL-04) |
| RP-07 | The salary-TDS computation structure: regimes, rebate mechanics, Form 122 and Form 124 handling | §06.5; FR-PAY-205 | [Verified] for FY2025-26 | §08's worked examples | Certified |
| RP-08 | TDS values for each Tax Year the product runs | §06.5; §06.13 | Tax Year 2026-27 figures pending verification (§06.13) | The Budget drill's regression step (BD-4, §05.15) | Tax Year 2026-27 Certified — a desk read of an enacted Finance Act, so its absence fails R1E-01 and does not fence TDS. Each later Tax Year's values are certified before that year's first LOCK; a run in a Tax Year without them halts on the named parameter |
| RP-09 | Deposit due dates under r.218 | §06.5 | Unread | — | Fenced (F-10), with the 1962-Rules convention shown and labelled |
| RP-10 | The Form 138 Q1–Q3 format and the period-routed FVU stack | §06.5; FR-PAY-706 | [Verified] (EV-051, EV-052) | `138RQ1.txt`; FVU 1.2 | Certified |
| RP-11 | The dual-vocabulary map | §06.5 | [Verified] (EV-050) | TV22, TV46, TV61 | Certified |
| RP-12 | The Maharashtra PT slab | §06.4 | [Verified] (EV-014) | TV10 | Certified for computation. The return leg Fenced (`F-06[MH]`) |
| RP-13 | Every other state's PT and LWF | §06.4; §06.8 | — | — | Fenced per state (F-06, F-07) |
| RP-14 | Gratuity: formula, day counting and the payment window | §06.6 | [Verified] (r1/06, r3/04) | TV8 | Certified. The ceiling is a Slot (PH-01) with REVIEW behaviour |
| RP-15 | Obligation thresholds, with counting unit, scope, sphere and look-back | §06.1 | [Verified — central sphere] (EV-057) | TV23, TV26 to TV30 | Certified. The continuance rules are Slots (PH-02, PH-03) |
| RP-16 | Registers and wage slip, in the central-sphere forms | §06.9 | [Verified — central sphere] (EV-053 to EV-055) | TV19 to TV21 | Certified. State forms Fenced (F-11) |
| RP-17 | Statutory bonus | §06.7 | Provisional | TV9 | Certified as provisional. The return Fenced (F-09) |
| RP-18 | A watch reference — an FR-RULE-006 watch key, a capture task or a counsel item — for every fence and every Slot above | FR-RULE-006 | — | The AC-RULE-005.1 replay | Certified. A fence without a `watch_ref` cannot be registered (FL1) |

Two entries carry the pack's real risk. RP-08 is the one whose date the section does not control: if R1's first live wage month falls in Tax Year 2027-28, the Finance Act that sets its values is not yet published, and the Budget drill (§05.15) becomes R1's critical path from 1 February to the first April run. RP-06 is certified on rates that predate the 8 May 2026 Rules and must be re-baselined (r2/10). That re-baseline is desk work, so it is a condition of certification, not a fence.

#### What breaks if the order is changed

Each row is a negative case: an ordering a team under schedule pressure will be tempted by, and the rework it buys.

| If this is built first… | …before this | What breaks | Why the rework is expensive |
| --- | --- | --- | --- |
| Generators (WP-14) | Validators (WP-13) | The generator encodes its author's reading of the format, and a validator written afterwards from the same reading cannot catch that reading's errors | The first real rejection arrives at the portal, where an approved ECR can never be cancelled (EV-036) |
| The engine (WP-09) | The rule object (WP-01) | Rates, ceilings and thresholds become code constants | The add-back percentage is "or such other per cent as may be notified" (EV-010) and the ESI regime is unresolved (F-04): each becomes a deploy, violating item 2's acceptance |
| The calendar (WP-15) | Registrations (WP-04) | Due dates attach to the tenant, not the registration | A two-entity tenant gets one ECR date for two establishments, and supervised minutes cannot be measured per registration — the unit the dominant cost line scales on (EV-088) |
| The first live month | The filing ledger (WP-16) | Months filed before the ledger exists have no entry | AC-712.1 needs one status for every month from the coverage date; the M−4 chronology (EV-038) cannot be proved retroactively |
| The import (WP-07) | Consent (WP-06) | Bank details and identifiers arrive without a consent record | Consent cannot be backfilled (§07; FR-CHR-102); the only repair is to re-collect from every imported employee |
| The assistant (WP-23) | Attribution (WP-22) | Model calls run with no per-tenant, per-user cost record | Retrofitting attribution after pricing exists is the expensive case §13.9 names |
| A thin master (WP-05 without the own-roll/contract and IW flags) | The statutory computations (WP-11) | Contract workers trip own-roll thresholds (Example J); an IW's ECR lines cannot be expressed | The ECR has no IW field (EV-035), so the distinction exists only in the master; adding the flag later means re-deriving every IW's history |
| A day-total time model | Registers (WP-14's Form IX) | Form IX needs per-day IN and OUT timestamps (EV-055) | A day-total store cannot be converted back into punches; it is a data loss, not a migration |
| The watcher (WP-03) keyed to new instruments only | Published rule versions exist to subscribe to | Corrigenda to already-tracked instruments go unseen | The class of miss that inverted round one's November 2026 conclusion (§02; §05.15) |
| Bank-file generation (WP-18) | Payment-approver segregation (FR-PAY-904) | One actor can generate and release | The segregation is P0 on both sides (FR-PAY-904; §16.3) because the failure is a payment, not a screen |
| The Q4 writer | The F-01 annual store (WP-14) | Q1–Q3 facts have to be re-derived from locked snapshots when the format lands | Imported months cannot be re-derived at all (§16.7), and the deadline is 31 May, not the day the format appears (EV-049) |
| The first real submission | The artefact-family readiness record (WP-25) | The first acceptance has no record to attach to, so nothing can move the family's lines to IN_SLA | The only other route is setting coverage lines by hand, which is a standing refusal (§05.23) |

#### Hand-offs between lanes

Parallel lanes need fixed hand-offs, or each lane invents the other's interface. Each hand-off below is owned by the section that specifies it; this table fixes only who hands what to whom, and the test that proves the hand-off before either side depends on it.

| From → to | What is handed over | Specified in | Proved by |
| --- | --- | --- | --- |
| Rules → Engine | A certified rule-set version, resolved for a jurisdiction set and an as-of time | §14.6.3; §15.4 | The engine evaluates a pinned version and records it on every result (FR-PAY-210) |
| People → Engine | The input snapshot frozen at INPUTS_CLOSED | FR-PAY-302 | A source edit after the freeze changes nothing in the run |
| Time → Engine | Day status and LOP per employee per day, with overtime inputs | FR-ATT-021; FR-OT-001 | A regularised punch after the freeze arrives as an adjustment, not a change |
| Engine → Filing | The locked snapshot | FR-PAY-301 M8; FR-PAY-711 F4 | Every artefact names the snapshot and format version it was generated from |
| Obligations → Filing | Filing instances per registration, obligation and period, with due dates and citations | FR-PAY-710; FR-PAY-711 F1 | Every generated artefact belongs to exactly one instance |
| Filing → Obligations | Acknowledgements, receipts and rejections | FR-PAY-711 F7, F9, F15 | The ledger closes only on a stored acknowledgement (AC-711.2) |
| Rules → Obligations | Fence states and parameter holds | §05.18; §05.22 | A fence entering OPEN blocks every dependent instance with its ID |
| Obligations → Platform | `coverage.versioned` and `filing.*` events | §05.21; §19.11 | §19's Filing Coverage recomputes from events alone |
| Platform → every lane | Tenant isolation, the audit log and attribution on every call | NFR-SEC-201, NFR-SEC-401; NFR-OBS-1101 | A cross-tenant read is refused and logged |

#### The downstream specification artefacts — where each now lives

Round five asked that the specification artefacts a build team needs, but this section does not write, be named — so that their absence reads as a decision, not an omission (r5/00-synthesis, item 21). Each now has an owning section. This table records where it lives, which work package consumes it, and what R1 needs from it. It adds no rule of its own.

| Artefact | Specified in | Consumed by | What R1 needs from it |
| --- | --- | --- | --- |
| Component catalogue — tax treatment, wage-base membership, proration and rounding per component | FR-PAY-108 (§08) | WP-08 | Every design-partner component expressible without tenant-specific code (C-06) |
| Rounding and monetary-precision policy, with its statutory exceptions | FR-PAY-108's rounding codes (§08) | WP-09, WP-11 | ECR values that reproduce EPFO's fixture exactly (TV16); ESI rounding as a sourced rule version, never a default (`esi.rounding_rule`, AC-203.2) |
| ER model with cardinalities and temporal constraints | §14.3 | WP-01, WP-04, WP-05 | The three-state, two-entity fixture (C-01) |
| Rule object and effective-dated rule storage | §14.6 | WP-01 | Chain A step A1's exit test |
| Identifier placement — UAN, ESIC IP, PAN, Aadhaar token, PT enrolment | FR-CHR-104 (§07) | WP-05 | A second UAN raises a continuity task, never a new member (AC-MIG-4) |
| Permissions matrix with maker-checker points | FR-CHR-105 (§07) | C-35 | Every checker cell's self-approval test refused |
| ADMS/WDMS packet contract | FR-DEV-008 (§09) | WP-19 | The §20 V-11 bench result |
| Migration tie-out criteria and tolerances | §16.7 | WP-07 | ₹0 on the V-15 heads (C-05) |
| Error taxonomy for statutory artefacts | FR-PAY-713 (§08) | WP-13 | Every validator result carries a family code |
| Public API surface, webhooks and MCP posture | §16.11 | None in R1 — the MCP server is item 30 (P3) | Only the internal events §19.11 reads |
| Screens | S-01 to S-17 (§05.17) | Design, downstream of this PRD | The R1 boundaries in that table |
| Capacity, availability, RPO and RTO | §17 (NFR-SCALE-901, NFR-AVAIL-801, NFR-AVAIL-802, NFR-DR-1401) | WP-21 | The readings in §05.20's NFR table |
| Compliance data pipeline — authoring, review, corpus, publish, rollback | §22.8 (FR-RULE-001 to FR-RULE-017) | WP-02, WP-03 | C-25 |

#### Runtime records and programme records

Two kinds of scope record are specified in §05.17–§05.22, and they live in different places because different things read them.

| Record | Kind | Read by | Lives in |
| --- | --- | --- | --- |
| Fence register, parameter-hold registry | Runtime | The engine, the filing machine, the coverage statement | The product, as governed entities published through the §22 pipeline — routed to §14 for the entity catalogue (RT-14) |
| Coverage statements and their lines | Runtime | The SLA, §19's metrics, notices, the desk forecast | The product, per tenant, immutable per version (RT-14) |
| Tenant lifecycle state | Runtime | Admission, hypercare, offboarding | The product's tenant record (RT-14) |
| Artefact-family readiness record | Runtime | The coverage statement (order rule 6), the capacity forecast, hypercare's Mode B rule | The product, changed only by AF1 to AF8 (§05.20; RT-14) |
| The P0 ledger, lint results, gate records, change requests | Programme | People — product, engineering, the desks, counsel | The programme-management system, exported to the evidence store at every gate |
| Deferred-band gate evaluations (§05.3) | Programme | GTM, the founder | As above |

The split has one consequence worth stating: a runtime record changes product behaviour, so it changes only through the pipeline's two-person review (§22 P10), while a programme record changes through change control (§05.23). A fence is therefore opened or cleared in the pipeline, and its effect on release scope is then recorded in the ledger — never the reverse.

#### Seams R1 must leave for v2 and Vision

v2 is "the same engine, up-market" (§05.4) only if R1 leaves the seams v2 plugs into. Each seam below is built in R1 at near-zero marginal cost; each has a test that proves it exists before v2 needs it, because a seam discovered missing in v2 is a migration, not a feature.

| Seam | Built in | Used by | Test that proves it in R1 |
| --- | --- | --- | --- |
| Registration model with jurisdiction on the work location | WP-04 | Item 22, multi-establishment and group-entity payroll; §18's registration line | A second establishment in a second state is added with no schema change |
| Per-employee state resolution in the evaluation context | WP-09 (FR-PAY-210) | Item 23, every state's PT and LWF | A second sourced state computes by publishing its pack alone (PR-05) |
| The state onboarding pack as a pipeline artefact | WP-02 (FR-RULE-017) | Item 23 | Publishing a state pack changes no code |
| Own-roll/contract flag with contractor linkage | WP-05 | A-24 and A-25, the v2 contractor surface | Contract workers are stored, linked to a contractor, and excluded from own-roll counts |
| Roles and scopes as data | C-35 (FR-CHR-105) | Item 24, SSO/SCIM and the richer role model | A new role is created by configuration and passes the maker-checker tests |
| Written authority that can name a CA organisation and its individuals | FR-OPS-002 | Item 20a in R2, item 20b in v2 (Mode D, FR-OPS-029) | An authority record naming a CA organisation validates, though Mode D is not yet offered |
| The provider seam | WP-22 | Item 29, the residency matrix | A second backend is added by configuration |
| The sectoral profile field | NFR-RES-704 | Vision's regulated overlays | The profile is set at tenant creation and its defaults propagate (AI off) |
| Cost and supervised-minute attribution | WP-22, WP-17 | Item 25's metered SKUs; §18's registration line | 100% attribution; minutes on every session |
| Replay of any locked month | FR-PAY-1002 | Enterprise evidence requests | Replay reproduces a locked month; it supports evidence production and does not discharge a customer's contractual audit, access and inspection obligations (§15) |

**[Hypothesis]** The critical path above is the longest chain. Kill/validate: at sprint zero the Engineering lead's estimates are entered per package; if any off-path lane's estimate exceeds the critical path's, that lane becomes the critical path and the pre-launch date is driven by it — most plausibly WP-19, through the device-fleet bench work (§20 V-10, V-11).

---

### 05.20 Release specification — R1, R2 and R3 as gated states

§05.7 states what each release contains and its entry and exit criteria in prose. This subsection makes a release a record with states, gives every entry and exit check an ID, evidence and owner, decides the one ambiguity the pre-launch gate carried, and lays the releases against the statutory calendar they will actually meet.

#### Release states

<!-- DIAGRAM: scope-phasing-release-states -->

| # | From → To | Event | Guard | Side effect | Who may trigger |
| --- | --- | --- | --- | --- | --- |
| RS1 | *(none)* → PLANNED | Release defined | Its scope is exactly the ledger rows tagged to it; the P0 lint passes (§05.17) | Scope frozen under change control (§05.23) | Product lead |
| RS2 | PLANNED → IN_BUILD | Entry checks pass | Every entry check for the release (below) has its evidence | Start recorded | Product lead, Engineering lead |
| RS3 | IN_BUILD → GATE_REVIEW | Gate requested | Every row tagged to the release is DONE_WITH_EVIDENCE, or fenced and declared | Evidence pack assembled from the ledger; gate review convened | Product lead |
| RS4 | GATE_REVIEW → RELEASED | Gate passes | Every exit check passes; no P0 row is open; every fenced row appears in the coverage statements (§05.21) and in the SLA wording as a carve-out, never silently absent | Coverage statements re-versioned; SLA scope updated; release notice | The owners of the exit checks, jointly |
| RS5 | GATE_REVIEW → IN_BUILD | Gate fails | Any exit check fails | Each failing check named with its owner | Gate review |
| RS6 | PLANNED or IN_BUILD → RESCOPED | A fence outcome (§05.18) or an approved change request (§05.23) moves rows between releases | The change request is approved | Rows re-tagged | Product lead |
| RS7 | RESCOPED → PLANNED | Rescope complete | The P0 lint passes | — | Product lead |
| RS8 | RELEASED → HELD | A hold trigger (below) | — | New-tenant intake stops for the affected artefact family; existing tenants keep the Mode A fallback (FR-OPS-028) | Statutory desk lead or Filing desk lead |
| RS9 | HELD → RELEASED | Hold cleared | Root cause closed and the corrective rule, format or code version published; for a capacity hold, desk capacity restored against the due-date queue (FR-OPS-027) | Intake resumes | Product lead with the lead who raised it |
| RS10 | RELEASED → SUPERSEDED | The next release is RELEASED | — | — | System |

There is no "pass with exceptions" for a P0 row. A fenced row never blocks a gate — it was never P0 — but a gate cannot pass while a fenced row is undeclared, because an undeclared carve-out is an SLA breach waiting for its date.

#### Entry and exit checks, by release

| ID | Check | Evidence | Owner | If it fails |
| --- | --- | --- | --- | --- |
| **R1E-01** | The statutory spec is frozen against the 8 May 2026 Central Rules, with the November 2026 position resolved as far as §06.9 allows (§05.4) | The rule-version registry's R1 pack | Statutory desk lead | No build against an unfrozen rule set |
| **R1E-02** | The rules-first decision is ratified: no statutory or monetary figure is ever model-generated (§12) | Signed architecture decision | Engineering lead | — |
| **R1E-03** | Chain A steps A1–A2 and Chain B step B1 complete (§05.7) | WP-01, WP-04, WP-09 exit tests | Engineering lead | R1 stays PLANNED |
| **R1E-04** | At least one design partner's real roster and registrations are loaded | Tenant record | Product lead | R1 stays PLANNED |
| **R1E-05** | The design-partner set covers every R1 capability's evidence (the coverage table below) | Coverage table with each cell assigned to a named partner | Product lead | Recruit further partners before build, not after |
| **R1E-06** | The P0 lint passes on the R1 rows and every C-row has an owner | Lint report | Product lead | — |
| **R1E-07** | Counsel engaged on CR-17, CR-24 and CR-30, whose gates fall before the first paying customer or before v1 general availability (§23.16) | Engagement record in the counsel register | Legal lead | R2's entry check R2E-02 cannot be met in time |
| **PL-01 to PL-05** | The pre-launch gate (§05.8), with PL-01 read per artefact family (decided below) | As §05.8 | As §05.8 | R1 does not invoice |
| **R1X-01** | CR-24's runbook wording — who reports a platform incident affecting tenants to CERT-In — is recorded, or the §23.16 default (our report plus a pack per tenant) is accepted in writing | Counsel-register entry | Legal lead, Security lead | No first paying customer (CR-24's own gate) |
| **R1X-02** | CR-30's Aadhaar-optional default (exclude-and-flag, payroll never blocked) is recorded or accepted in writing | Counsel-register entry | Legal lead, Statutory desk lead | No general availability (CR-30's own gate) |
| **R1X-03** | CR-33, CR-34 and CR-35 — the register questions — are answered, or their §23.16 defaults accepted in writing | Counsel-register entries | Legal lead | Registers stay out of marketing copy and out of the SLA wording |
| **R1X-04** | The first paying tenant's coverage statement is issued, and its SLA clause cites that version (§05.21) | Coverage statement v1 | Product lead | No invoice |
| **R1X-05** | The first paying tenant's first monthly cycle is on the ledger, with a portal acknowledgement for every R1 artefact due (§05.7) | Ledger entries | Filing desk lead | R1 is not RELEASED |
| **R1X-06** | Every R1 capability except C-26 produces its R1 evidence on a tenant with the assistant switched off — the configuration an RBI-, SEBI- or IRDAI-regulated tenant starts in (AD-10; §12.8.6, AC-DEG-2) | The evidence re-run on a tenant profiled as regulated | Engineering lead | R1 is not RELEASED until the dependency is removed: the assistant never computes, submits or approves (§12), so no R1 capability may need it |
| **R2E-01** | R1 is RELEASED | Release record | Product lead | — |
| **R2E-02** | The counsel register shows a recorded answer — cleared or not — for each attended-filing question (§05.7) | CR-17a to CR-17f entries | Legal lead | R2 stays PLANNED; §05.12's attended-filing row governs |
| **R2X-01** | Each annual return (A-20, A-21) produced for every tenant it applies to by its due date | Ledger entries for the February returns | Filing desk lead | A product-caused miss (§05.9) and a hold (RS8) |
| **R2X-02** | Attended submission live for at least one portal (F-08 SHIPPED for that portal), or the carve-out declared in the SLA wording and every coverage statement | Release record; coverage statements | Legal lead, Filing desk lead | R2 cannot pass undeclared |
| **R2X-03** | A mid-year migration ties out to ₹0 on the V-15 heads for a design partner (§20 V-15) | Tie-out report (§16.7) | Product lead | Migration stays assisted (§05.5 item 17's kill criterion) |
| **R2X-04** | Every design-partner state's PT and LWF rows sourced — F-06 and F-07 SHIPPED for those states | Fence register | Statutory desk lead | The unsourced states stay CARVED_OUT_FENCE; the check is re-scoped by change control, not waived |
| **R2X-05** | P1 items 16–21 each DONE_WITH_EVIDENCE, item 20 as the thin console (20a) only | Ledger | Product lead | The failing item is re-tagged to R3 by change control |
| **R2X-06** | The ESI outcome applied as the F-04 table decides (§05.18) | Rule-version registry; fence register | Statutory desk lead | V1X-04 cannot be met later |
| **R3E-01** | R2 is RELEASED | Release record | Product lead | — |
| **R3E-02** | The Form 138 Q4 format is released, or its carve-out is formally declared (§05.7) | Fence register state of F-01 | Statutory desk lead | — |
| **V1X-01 to V1X-08** | The v1 → v2 gate (§05.8) — R3's exit | As §05.8 | As §05.8 | v2 does not open |

#### The per-artefact reading of PL-01 — a decision

PL-01 as first written required every R1 artefact family to be validated by its authority on real data *and submitted once for real* before the first invoice. Taken literally, that ties the first invoice to a quarterly calendar: Form 138 can only be submitted for real at a quarterly due date, and we are not aware of a sandbox on any of these portals as of September 2026 (§05.8).

| Option | What it means | Against the criteria |
| --- | --- | --- |
| **O1 — All families before the first invoice** | No invoice until ECR, ESI (if captured), each sourced PT return and Form 138 have each been submitted once for real | Keeps the letter of PL-01, but a design partner whose first quarter is the fenced Q4 cannot produce a real Form 138 submission until 31 July 2027 (the go-live table below) — six months in which no monthly filing can be sold, for want of a quarterly one |
| **O2 — Per family** *(decided)* | Each family joins the SLA only after its own PL-01 evidence; the first invoice needs the monthly families plus PL-02 to PL-05; Form 138 is SLA_PENDING_FIRST_SUBMISSION on every coverage statement until its first real quarterly submission | Never sells a promise the product has not kept; manufactures no submission; lets the calendar govern only the family it actually governs |
| **O3 — Authority validation alone for quarterly families** | FVU validation on real data counts as PL-01 for Form 138 | Rejected: FVU validation proves the file, not the submission — the Return Receipt Number, the `.csi` reconciliation and the upload step (FR-OPS-015) are exactly what a first submission tests |

**Decision: O2.** The SLA clause for any tenant cites its coverage statement version, and that statement names each family's state (§05.21). §05.8's pre-launch gate text now carries this reading.

#### The artefact-family readiness record

Under O2, coverage order rule 6 (§05.21) asks whether a family "has passed PL-01 platform-wide". That fact needs a record of its own. The record is kept per family, and per state or portal where the family is instantiated that way, together with the evidence that moved it. It is a runtime record, because it changes coverage lines, so it changes only through the transitions below.

| Field | Rule |
| --- | --- |
| `family_key` | The artefact family (§05.21 `line.artefact_family`), instantiated per state or portal where the family works that way — `PT return[MH]`, `ESI upload` |
| `format_version` | The format version the current state was reached on. A family carries one record per version once a breaking version exists |
| `oracle` | Published fixture, authority validator, notified form, authority text, or rule text only (§05.7 buildability test) |
| `state` | NOT_BUILT, BUILT, AUTHORITY_VALIDATED, PL01_PASSED, VERSION_PENDING or SUSPENDED |
| `authority_validation_ref` | Where the authority publishes a validator that runs before submission (FVU for Form 138), its pass on real data |
| `pl01_evidence` | Tenant, filing instance, acknowledgement reference and date of the first real accepted submission, made in Mode B (FR-OPS-011). For a family that is maintained or issued rather than filed, the conformance evidence named below |
| `suspended_by` | The hold (RS8) and the D2 defect that suspended the family, if any |

<!-- DIAGRAM: scope-phasing-family-readiness -->

| # | From → To | Event | Guard | Side effect | Who may trigger |
| --- | --- | --- | --- | --- | --- |
| AF1 | *(none)* → NOT_BUILT | Family record created | The family's register rows exist with a release tag | — | Product lead |
| AF2 | NOT_BUILT → BUILT | Generator and validator complete | Chain A A4's exit test passes for the family, and every seeded fixture for it is green | No coverage change: the family's lines read SLA_PENDING_FIRST_SUBMISSION under order rule 6 until AF4 | Engineering lead |
| AF3 | BUILT → AUTHORITY_VALIDATED | Pre-submission validation on real data | The authority publishes a validator that runs before submission. There is none for the ECR: EPFO validates at upload, inside a real session, so the ECR goes from BUILT straight to AF4 | — | Engineering lead |
| AF4 | BUILT or AUTHORITY_VALIDATED → PL01_PASSED | First real submission accepted | A Mode B first submission (FR-OPS-011) with its acknowledgement stored. A family that has a pre-submission validator passes AF3 first | Every tenant's lines for the family re-version to IN_SLA, subject to SS-1 | Filing desk lead |
| AF5 | PL01_PASSED → VERSION_PENDING | A breaking format version is published for a period | The version is certified through the pipeline | Lines stay IN_SLA. Each tenant's first instance on the new version runs in Mode B, and the capacity forecast counts those sessions (FR-OPS-031) | Statutory desk lead |
| AF6 | VERSION_PENDING → PL01_PASSED | First real submission on the new version accepted | As AF4 | The Mode B requirement lifts for each tenant after its own first instance on the version | Filing desk lead |
| AF7 | PL01_PASSED or VERSION_PENDING → SUSPENDED | A real submission is rejected for a product-caused reason (a D2 defect) | — | RS8 hold on new intake for the family. Existing tenants keep the Mode A artefact and checklist (FR-OPS-028), and each one's next instance of the family runs in Mode B | Filing desk lead |
| AF8 | SUSPENDED → PL01_PASSED | Hold cleared | RS9's guard, and the affected tenant's next instance accepted | Intake resumes | Product lead, with the Filing desk lead |

A rejected first submission before AF4, while the family is BUILT or AUTHORITY_VALIDATED, suspends nothing, because no line is yet in the SLA. It opens a D2 defect, which blocks that family at its release gate.

A family that is maintained or issued rather than filed — the registers and wage slip, the appointment letter, Form 130 distribution, Form 123 — has no portal acknowledgement to wait for. Its AF4 evidence is the conformance evidence §05.8 names for such records: a render reviewed against the notified form, or for Form 130 the AC-707.2 reconciliation of a TRACES-issued certificate. Its AF5 is a new notified form version, and its AF7 is a product-caused non-conformance found in a real render.

**What counts as a breaking version.** A breaking version changes record types, field count or order, delimiters, file type, encoding, or the upload step — the kind of change EV-051 describes for Form 24Q becoming Form 138. A change to validation rules alone is not breaking: the golden corpus is re-run and the family's state does not change.

**Why a breaking version keeps lines IN_SLA — a decision.** There are two options. **(a)** Revert every line to SLA_PENDING_FIRST_SUBMISSION until the first submission on the new version. That withdraws the SLA from every tenant at the moment the authority changes the format — the moment a tenant most needs it — and on a date the authority chooses. **(b)** Keep lines IN_SLA and require Mode B for each tenant's first instance on the new version. That keeps the promise and puts our operator beside the tenant at the point of risk; a product-caused rejection still counts as a miss and suspends the family (AF7). **Decision: (b).** The SLA already promises an artefact "validated against the authority's current format" (§05.9), and a format change is the event that promise exists for. The cost is desk capacity in the first window after a breaking version. If the forecast cannot absorb it, the capacity hold (RS8) applies to new intake, never to an existing tenant's due instance.

#### The go-live window — the first live wage month against dated events

<!-- DIAGRAM: scope-phasing-golive-window -->

Where a design partner's first live wage month falls decides which fences it meets in its first cycles. The dates below are all in this PRD's evidence base; none is a planned release date.

| First live wage month | First ECR and ESI due | First Form 138 quarter the product prepares, and whose data is in it | Fences met in the first three cycles | Other dated events in the first three cycles |
| --- | --- | --- | --- | --- |
| October 2026 | 15 November 2026 — before the lapse | Q3 (October–December), wholly ours, due 31 January 2027 | F-04 from the November month; F-10 for deposit timing | Central VDA revision effective 1 October (r1/06); the February 2027 annual returns follow within five months |
| November 2026 | 15 December 2026 | Q3 — October's deductee rows come from the prior system through the import (§16.7) | F-04 and PH-13 in the very first month | WABA INR migration by 31 December 2026 (EV-088) if the WhatsApp channel is live |
| December 2026 | 15 January 2027 | Q3 — October and November from the prior system | F-04 from the first month; PH-12 must be set before the first LOCK | Gemini 3.x Flash price doubles 1 January 2027 (EV-089) — the inference baseline shifts in cycle two |
| January to March 2027 | 15 February to 15 April 2027 | Q4 — fenced (F-01); the next quarter the product can submit for real is Q1 of Tax Year 2027-28, due 31 July 2027 | F-01, F-04, F-10 | The February 2027 annual returns (A-20, A-21) fall due in cycle one or two; for a tenant that ran calendar year 2026 on a prior system, whether they are ours is recorded on its coverage statement — TENANT_SELF_FILES unless the year's data is imported (§05.21); the 1 February Budget and its 1 April effect (§05.15) |
| April 2027 | 15 May 2027 | Q1 of Tax Year 2027-28, wholly ours, due 31 July 2027 | F-04, F-10 | A clean tax-year cutover — no in-year YTD to carry; the Finance Act's 1 April changes in the first run; DPDP's substantive provisions on or about 13 May 2027 (EV-058) inside cycle one |
| May or June 2027 | 15 June or 15 July 2027 | Q1 — April (and May) from the prior system | F-04, F-10; the Tax Year 2026-27 Form 130 still behind F-01 | The two consent regimes run concurrently from here (§07; NFR-DPDP-501) |

Rules that fall out of the table:

- **GL-1.** Only a first live month that opens a quarter — October 2026, January 2027, April 2027, July 2027 — gives a first Form 138 quarter that is wholly the product's, and January's is the fenced Q4. Every other month puts prior-system deductee rows into the first statement, so the §16.7 tie-out against already-filed statements is on the critical path for Form 138, not only for TDS projection.
- **GL-2.** A first live month from January to March 2027 lands the first quarter on the fenced Q4. Under O2, Form 138 stays SLA_PENDING_FIRST_SUBMISSION until 31 July 2027 while the monthly families are sold; under O1 the first invoice itself would wait.
- **GL-3.** Every first live month from November 2026 onward meets F-04 in its first cycle, so PL-04 — PH-12 set — is not a formality for any realistic R1 date.
- **GL-4.** If R1 is RELEASED before February 2027, R2 must be RELEASED before 28 February 2027, because A-20 and A-21 fall due then (§05.7). If R1 slips past February 2027, the next annual-return deadline is February 2028 and R2's calendar constraint relaxes by a year.
- **GL-5.** April is the cleanest cutover for TDS continuity, but it brings the Finance Act diff (§05.15) into cycle one and the DPDP switch into cycle two. **[Hypothesis]** Buyers concentrate switching around April. Kill/validate through the §20 migration-seasonality risk and the V-15 dry run: if design partners are unwilling to cut over outside April, R1's first-invoice date is effectively April 2027 or April 2028 and the plan says so.

#### Design-partner coverage — the tenants R1's evidence needs

R1's evidence cannot be manufactured: there are no test submissions to production portals, an approved ECR cannot be cancelled (EV-036), and edge cases such as a Revised return or an eligible gratuity leaver happen when they happen. The design-partner set is therefore chosen so that its real months exercise every family PL-01 needs, and every other capability's evidence has a named fallback.

| Evidence R1 needs | Design-partner profile that produces it | Producible in the first live cycle? | Fallback evidence if not |
| --- | --- | --- | --- |
| PL-01 for the ECR family | Any partner with an EPF establishment | Yes | — |
| PL-01 for the ESI upload file (if F-05 is SHIPPED) | A partner with ESI-covered employees | Only for a wage month before the saving lapses, or once F-04 resolves — every post-lapse instance is BLOCKED (F-04) | The worksheet posture; C-12 moves to R2 by rule if F-05 is open. With F-04 open, the family waits for its fence (below, "When each R1 family can first reach AF4") |
| PL-01 for a PT return | A partner with an establishment in a state whose return leg is sourced | Only once a state's return leg is sourced — at R1 entry, none is (A-15, A-16) | None; the PT return family is R2 |
| PL-01 for Form 138 | Any partner with salaried deductees | Only at the first quarterly due date after go-live (go-live table) | None under O2 — the family waits for its date |
| C-05 mid-year tie-out | A partner going live in any month other than April | Yes, at go-live | R2X-03 remains the binding check |
| C-09 Supplementary and Revised returns | Arises only from a genuine correction | Rarely | §06.14 golden vectors plus FR-PAY-708 on a seeded ledger; the first genuine occurrence is logged as a hypercare check |
| C-17 gratuity payout | Arises only from an eligible leaver | Rarely | TV8 and a seeded review-hold case |
| C-19 appointment letter | A partner with a 10+-worker establishment in a state whose form is captured (F-11) | Only for new joiners | A render of the captured form against a real joiner record |
| C-24 device ingest | A partner with eSSL or ZKTeco terminals | Yes | §20 V-11 bench result |
| C-26 assistant rails on a regulated tenant | A regulated partner, or a partner profiled as regulated for the test | Yes, by configuration | The kill-switch default test on a profiled test tenant |
| C-15 Form 130 distribution | A partner holding a TRACES-issued certificate for a Tax Year the product ran whole | No — for an April 2027 go-live, the first such certificate is for Tax Year 2027-28 | A seeded certificate record through the distribution path and the AC-707.2 reconciliation, plus the schema scan that finds no self-generated certificate; the first real certificate is logged as hypercare evidence (H-5) |

`design_partner_count_r1` is the smallest number of partners whose profiles jointly cover the first six rows. It is set by the Product lead once candidate partners are known, routed to §20 as a planning parameter; no figure is proposed here because it depends entirely on which profiles the candidates bring.

#### When a design partner withdraws — recovering R1's evidence

R1E-05 requires the partner set to cover every capability's evidence, and that set is small by construction (PH-21). One withdrawal can therefore uncover several cells at once — the only ESI-covered roster, the only establishment in a state whose forms are captured, the only non-April cutover. The recovery is a rule rather than a scramble, because the alternative is a gate that passes on evidence nobody can now produce.

| ID | Rule |
| --- | --- |
| PW-1 | A withdrawal re-runs R1E-05's coverage table at once. Every cell the departing partner was the sole source for is marked uncovered and listed with the substitution route below; the gate cannot be convened while any R1 cell is uncovered and unrouted |
| PW-2 | The substitution ladder runs in this order and stops at the first rung that works: another admitted partner with the same profile; a partner recruited for the cell (which moves the gate's *date*, never its checks); a seeded fixture where §05.20 already allows one for that case; wait for the calendar. There is no fifth rung — in particular, no test submission to a production portal, which the whole evidence design forbids (EV-036) |
| PW-3 | **A family's AF4 evidence can never be substituted.** A portal acceptance is an authority's act and PL-01 is evaluated per family, platform-wide, so losing the partner who would have produced a family's first real submission postpones that family's entry into the SLA. Its lines stay SLA_PENDING_FIRST_SUBMISSION; nothing moves them to IN_SLA on another kind of evidence (SI-08) |
| PW-4 | A withdrawal never unwinds a state already reached. A family at PL01_PASSED stays there, because the acceptance happened; the departing tenant's own records follow TO13 to TO17 — export acknowledged before revocation, retention before erasure (C-52) — and its filed artefacts stay byte-identical |
| PW-5 | If the uncovered cell is the one AD-18 depends on — the ECR family — R1 cannot convene its gate until another partner's EPF establishment is live. The response is recruitment, not rescoping: moving the ECR out of R1 is refused for the same reason as TS-05-44 |
| PW-6 | `partner_evidence_min_redundancy` (PH-26) is the number of partners required per evidence cell before R1E-05 passes. Unset, one is enough and the single-source risk is recorded on the gate record rather than hidden in it |

Where each cell lands if it is lost, read off the coverage table above:

| Uncovered cell | What is exposed | Route under PW-2 |
| --- | --- | --- |
| PL-01 for the ECR family | R1's gate cannot convene at all (PW-5, AD-18) | Recruit — no rung below it applies |
| PL-01 for the ESI upload file | Nothing today: every post-lapse instance is BLOCKED by F-04 in any case, so the family waits for its fence, not for a partner | Wait for the fence |
| C-05's mid-year tie-out | R2X-03 is unmet, and the migration thesis stays untested (§05.5 item 17) | Another partner whose first live month is not April |
| C-24 device ingest | Nothing at the gate: the §20 V-11 bench result already stands in for it | Bench |
| C-26's rails on a regulated tenant | Nothing: a partner profiled as regulated for the test produces it by configuration (R1X-06) | Configuration |
| C-19 appointment letter for a state | That state's line stays CARVED_OUT_FENCE under `F-11[state]`, which is where it already was | Wait for the fence, or another partner in a captured state |
| C-33 full-and-final, C-17 gratuity payout | Nothing: both are already fixture-backed (SF-06, SF-08), since neither arises on demand | Fixture |

The pattern worth naming: **the cells a withdrawal can actually hurt are the ones whose evidence is a portal acceptance**, because those are the only ones no fixture and no bench can stand in for. Everything else in R1's evidence set is either a conformance render, a fixture or a configuration, and is recovered the same day. That is the same asymmetry O2 turns on (§05.20) and the reason the design-partner set is recruited on *registration and roster shapes* rather than on logo value.

#### When each R1 family can first reach AF4

The table above asks which partner produces each piece of evidence. This one asks when, for the go-live GL-5 calls the cleanest: a first live wage month of April 2027. The answer is read off the calendar and the fence register; nothing in it is a planned date.

| Family | Earliest AF4 for an April 2027 go-live | Decided by |
| --- | --- | --- |
| ECR | 15 May 2027, April's return | The date alone |
| ESI upload | Not before F-04 resolves. Every post-lapse instance is BLOCKED, and an April 2027 tenant runs no pre-lapse month | F-04, then F-05 |
| TDS deposit | The deposit is the employer's payment (§22 P5). Its on-time judgement waits for F-10 | F-10 |
| Form 138 | 31 July 2027, Q1 of Tax Year 2027-28 | The quarterly date (GL-1) |
| Maharashtra PT return | When `F-06[MH]`'s return leg ships | `F-06[MH]` |
| Registers and wage slip | April 2027's finalised registers and payslips, by conformance render | The month alone |
| Appointment letter | The first joiner at an establishment whose state form is captured | F-11; a joiner |
| Form 130 distribution | June 2028: the first certificate for a Tax Year the product ran whole is Tax Year 2027-28's, due 15 June 2028 (r.215) | The annual cycle, and F-01 for any Q4 while its format is unreleased |

**O2, read when a monthly family is fenced.** O2 requires PL-01 for "the monthly families" before the first invoice. A monthly family whose lines are CARVED_OUT_FENCE platform-wide on an authority-caused fence is outside that requirement: it waits for its fence, just as Form 138 waits for its date. With F-04 open, that is the ESI upload family on every post-lapse line (coverage order rule 3). For any first live month after the lapse, the first invoice therefore needs the ECR family's PL-01 plus PL-02 to PL-05, and PL-04 still requires PH-12 to be set. A desk-capture fence gets no such reading: an open F-05 moves C-12 to R2 by rule, as before. Two consequences follow for R1. First, its only monthly family with a real first-submission date is the ECR, which is why AD-18 keys admission to the EPF line. Second, C-15's R1 evidence is a seeded fixture (SF-15), and its AF4 comes with the first real certificate — June 2028 for an April 2027 go-live.

#### Seeded fixtures — evidence the calendar will not supply

Where the design-partner coverage table says "rarely" or "no", the gate needs evidence anyway. Seeded fixtures run in a non-production environment against the certified R1 rule pack. They prove the product's behaviour; they never prove an authority's acceptance, and no fixture ever touches a production portal. The first genuine production occurrence of each case is logged as hypercare evidence (below) and compared with its fixture.

| ID | Seeds | Expected behaviour | Proves | Requirement |
| --- | --- | --- | --- | --- |
| SF-01 | A member absent from every prior return for an approved month | A Supplementary return with only that member; a second Regular return is refused | C-09 | EV-037; AC-708.1 |
| SF-02 | A downward correction to an approved month, once before and once after payment initiation | Revised return generated before; refused after, with the EV-037 reason and the remaining routes offered | C-09 | AC-711.3; AC-708.2 |
| SF-03 | A wage month with no active members | No file; routed to Direct Challan Entry; ledger status NIL | C-10 | EV-042; AC-712.4 |
| SF-04 | An unfiled month that will block a later Regular return under M−4 | Warning before the window, naming members and month | C-10 | EV-038; AC-712.2 |
| SF-05 | An exit date recorded in error | Later months BLOCKED-joint-declaration with an offline task | C-10 | EV-041; AC-712.3 |
| SF-06 | A gratuity payout above the legacy ₹20 lakh figure | Held for operator review; neither capped nor paid silently | C-17 | §05.5 item 7; PH-01 |
| SF-07 | An International Worker, with PH-05 given a clearly marked test value in the fixture tenant only | IW lines computed from the parameter beside domestic lines at the ₹15,000 ceiling; the fixture value can never be published to a production pack | C-09 | Example G; PH-05 |
| SF-08 | A leaver with arrears, leave balance and gratuity eligibility | F&F computed; EPFO exit-marking task raised | C-33 | FR-PAY-801 to FR-PAY-803 |
| SF-09 | An arrears batch disbursed in a later month than the wage month it corrects | PF liability dated from the disbursal month; the return leg routed to the fenced arrear flow | C-34 | §08 FR-PAY-401; F-03 |
| SF-10 | An ESI employee raised from ₹20,000 to ₹23,000 in July | Covered through September on actual wages; exits at the October boundary | C-11 | §06.14 TV3 |
| SF-11 | A Tax Year 2026-27 correction statement while F-02 is open | Generated, FVU-validated, held with its exposure clock | C-14 | AC-015.4 |
| SF-12 | Maternity-leave months while PH-09 and PH-10 are unset | The run refuses to LOCK until an operator decision is recorded for each month, citing the parameter | C-07 | Example K; §05.22 |
| SF-13 | A breaking ECR format version certified for a later wage month, on a seeded ledger | Earlier wage months still generate on the prior version; the first instance on the new version is flagged for Mode B; the family record reads VERSION_PENDING | C-09 | AF5; FR-PAY-711 F4 |
| SF-14 | The F-05 worksheet, with a seeded portal summary one rupee away from its total | An SA-REC reconciling item blocks payment initiation and names the difference | C-11 | §05.18 F-05 worksheet; FR-PAY-713 |
| SF-15 | A certificate record standing in for a TRACES-issued Form 130, once with figures matching the product's Form 138 data and once with one deductee's figure different | The matching record is distributed with a record per employee; the mismatch holds that employee's distribution with a reconciling item. No path in the product generates a certificate | C-15 | AC-707.2; EV-048 |

#### How much evidence exists by the gate — the instance arithmetic

A gate reads evidence, and evidence accrues at the rate the statutory calendar sets, not at the rate the build finishes. The earliest-AF4 table above gives the dates; this gives the counts, because a gate review needs to know not only *when* a family can first produce evidence but *how much* will exist on the day — and because the arithmetic is what makes decision O2 and admission rule AD-18 follow rather than assert.

<!-- DIAGRAM: scope-phasing-evidence-accrual -->

| ID | Rule |
| --- | --- |
| EA-1 | A release gate's earliest date is the date on which the last family in its scope can first reach AF4 **or** its declared substitute. The gate record's `family_states` is where that reading is written down, so a gate is scheduled off the calendar rather than off a build burn-down |
| EA-2 | Only real instances count toward PL-01. Seeded fixtures prove the product's behaviour and never an authority's acceptance (§05.20), so the number of families that may be *sold* at R1 is bounded by the calendar, not by what is built |
| EA-3 | Instances accrue **per registration**, not per tenant. A two-registration tenant produces two ECR instances a month, which is why partners are recruited on registration and roster shapes (PW-2) and why V1X-03's miss allowance widens with registrations rather than tenants (§05.8) |
| EA-4 | A family whose every instance in the window is BLOCKED by a fence produces no evidence at all, however many partners hold the obligation — the ESI upload family under F-04. That is precisely the case O2's reading for a fenced monthly family covers (§05.20) |
| EA-5 | Evidence a gate cannot have by its date is named in the gate record beside the date it can first exist. A gate never waits for evidence the calendar forbids; it records the wait, and the affected lines stay SLA_PENDING_FIRST_SUBMISSION or CARVED_OUT_FENCE until the date arrives |

**Worked, on a stylised partner set of the three shapes this section already carries** — one of the WE-1 shape (one PF establishment, one TAN), one of the WE-2 shape (two PF establishments, two TANs, three PT registrations) and one of the WE-4 shape (one PF establishment, one TAN) — all going live for wage month **April 2027**, with R1's gate convened once the third wage month's ECR has been filed, in mid-July 2027. Four PF registrations and four TANs across three tenants.

| Family | Instances the window produces | Portal-accepted by the gate | What the gate reads instead, where there is none |
| --- | --- | --- | --- |
| ECR | 4 registrations × 3 wage months = **12**, due 15 May, 15 June and 15 July 2027 | Up to 12; the first accepted (April's, by 15 May) is the family's AF4 | — |
| Registers and wage slip | 3 finalised periods per establishment | Not applicable — maintained, not filed | Conformance render against the notified forms, available from cycle 1 (TV19–TV21) |
| TDS deposit | 4 TANs × 3 months = **12** deposits made | Not judged: F-10 is open, so no deposit is read as on time or late (SS-4) | The computation stays in the SLA; the timing sits in the coverage-gap register |
| ESI upload | **0** — every instance is post-lapse and BLOCKED by F-04 (EA-4) | 0 | The F-05 worksheet and the computation shown on each approval artefact under PH-12's posture |
| Form 138 | **0** submitted — Q1 of Tax Year 2027-28 falls due 31 July 2027, after the gate | 0 | FVU 1.2 pass on real data moves the family to AUTHORITY_VALIDATED, not to PL01_PASSED (TS-05-41) |
| Maharashtra PT | 3 months of computation for the two establishments in the state; **0** returns, the leg being fenced | 0 | TV10, and the tenant's own return under TSF-2 |
| Form 130 distribution | **0** — the first certificate for a Tax Year the product ran whole is Tax Year 2027-28's, due 15 June 2028 | 0 | SF-15's seeded certificate record, plus the schema scan that finds no self-generated certificate |
| Appointment letter | Joiners only, and only in a captured state | Not applicable — issued, not filed | A render of the captured form against a real joiner record (F-11) |
| Gratuity payout, full-and-final | Leavers only — none guaranteed in three cycles | Not applicable | SF-06 and SF-08 |

The shape of that column is the whole argument for O2 in one place: **at its gate, R1 can show portal acceptances for exactly one artefact family.** Every other R1 family is at a conformance render, an authority validator, a fixture or a date it has not reached. Option O1 would have held the first invoice hostage to the last of those dates — for this partner set, 31 July 2027 at best and 15 June 2028 at worst — while the twelve ECR acceptances sat there proving the product had kept the promise a 20-crossing tenant actually bought (Example A). AD-18 keys admission to the EPF line for the same reason.

Two boundaries the arithmetic also fixes. A gate convened one cycle earlier — mid-June 2027, after two wage months — sees 8 ECR instances rather than 12 and the same zeroes everywhere else: nothing changes about which families are sellable, only how much evidence stands behind the one that is. And the v1 → v2 gate is a different measurement entirely: V1X-02 asks for ≥40 tenants across one full statutory cycle, and V1X-03 for a rate over a full quarter, neither of which this window can produce at any partner count — which is why §05.8 keeps the two gates apart and why the minimum-count arithmetic there is read on a twelve-month operation, not on R1's three cycles.

#### A design partner's first live cycle — worked, with the rupee figures

A Pune manufacturing partner with one establishment in Maharashtra and 22 own-roll employees — 14 men and 8 women — goes live for wage month April 2027, a clean tax-year cutover. The roster is stylised in the shape of EPFO's own fixture (§06.14 TV16): every member's EPF wages are ₹15,000. Ten employees are ESI-covered, each on ESI wages of ₹18,000. Every man's monthly salary is above ₹10,000; every woman's is above ₹10,000 and below ₹25,000.

| Step | State reached | Actor | What the product shows | Figures |
| --- | --- | --- | --- | --- |
| 1 | OPEN → INPUTS_CLOSED (M1, M2) | Payroll operator | The input snapshot; filing instances for April created as SCHEDULED | — |
| 2 | PROCESSED (M4) | Payroll operator | Gross-to-net and every statutory head per employee | EPF per member ₹1,800 + ₹1,250 + ₹550 = ₹3,600 (12%, 8.33% and the difference — TV16); ×22 = **₹79,200**: employee share ₹39,600, employer EPS ₹27,500, employer EPF ₹12,100 |
| 3 | PROCESSED | — | ESI per covered employee | ₹135 + ₹585 = ₹720; ×10 = **₹7,200** (₹1,350 employee, ₹5,850 employer), provisional under whichever PH-12 posture is set (F-04) |
| 4 | PROCESSED | — | Maharashtra PT for April (EV-014) | Men above ₹10,000 pay ₹200 (₹300 only in February); women pay nil up to ₹25,000: 14 × ₹200 = **₹2,800** |
| 5 | APPROVED (M6) | Approver, not the maker | The approval artefact: totals, variance, and each statutory liability with its due date | EPF ₹79,200 due 15 May 2027; ESI ₹7,200 due 15 May 2027, labelled provisional; PT ₹2,800 deducted, return leg CARVED_OUT_FENCE (F-06[MH]); TDS deposit shown against the 1962-Rules convention and labelled **[Hypothesis]** (F-10) |
| 6 | LOCKED (M8) | Approver | Payslips published; the bank file generated | Σ bank file = Σ net pay, to the rupee (AC-901.1) |
| 7 | DISBURSED (M9) | Payment approver, not the processor | UTRs captured; returned credits re-queued | Σ credited reconciles to Σ net (item 33) |
| 8 | ECR instance GENERATED → VALIDATED (F4, F5) | Payroll operator | The 22-line file, 10 delimiters per line, no header (EV-035) | File totals equal step 2 |
| 9 | SUBMITTED → ACCEPTED (F6, F9) | The employer, co-attended by our operator (Mode B; FR-OPS-011) | The portal's return statement against the locked snapshot | A mismatch is fixed by a Revised return now — never after step 10 (EV-037) |
| 10 | PAYMENT_INITIATED (M10, F14) | The employer's named approver | The verification gate: the approved return statement equals the locked snapshot line for line; any portal-calculated s.7Q interest included (EV-039) | Challan with TRRN for ₹79,200 plus the charges the portal adds — administrative charges are not illustrated because their rate is carried, not re-verified (§06.2) |
| 11 | FILED (F15, M11) | Operator records | Receipt stored; the April ledger entry closed (FR-PAY-712) | If the receipt is on or before 15 May 2027, April's ECR counts toward OTAF (§19.1) |
| 12 | Coverage statement re-versioned | System | ECR moves from SLA_PENDING_FIRST_SUBMISSION to IN_SLA if this was the family's first real submission (PL-01) | — |

Two things the example makes concrete. First, the only amounts the product can show as final in this cycle are the EPF and PT figures; the ESI figure is honest only because it is labelled provisional against a named posture, and the TDS deposit's due date is honest only because it is labelled a hypothesis. Second, the whole of the first month's evidence for the ECR family is produced by steps 8–11 on real data — nothing in it is a test submission.

#### Release holds — triggers and responses

| Trigger | Scope of the hold | Raised by | Cleared when |
| --- | --- | --- | --- |
| A product-caused miss on any artefact family (§05.9 taxonomy) | New-tenant intake for that family, platform-wide | Filing desk lead | Root cause closed, corrective version published, and the next due instance for every affected tenant filed on time |
| A product-caused rejection of a real submission (AF7), even where the instance is then filed on time | As above; the family's record reads SUSPENDED | Filing desk lead | As above, and the affected tenant's next instance accepted in Mode B (AF8) |
| Any penalty incidence (§19.12.1 treats one as Sev-1) | As above, and every tenant of the family moves to Mode B for its next instance | Statutory desk lead | As above |
| A corrigendum or amendment caught after its effective date | The families whose rule versions it touches | Statutory desk lead | The corrected version published through the pipeline and affected periods corrected as diffs |
| Due-date queue capacity exceeded for a window (FR-OPS-027) | New-tenant intake for every family in that window (§05.12's support-org row) | Filing desk lead | Capacity restored against the forecast (FR-OPS-031) |
| A reportable incident touching the filing path (NFR-CERT-601) | The families whose path it touched | Security lead | The incident closed and its root cause fixed |

A hold never stops a filing already due: an existing tenant's instance always has the Mode A artefact and checklist (FR-OPS-028), because a statutory deadline must never depend on our desk being staffed (§22 P3).

#### When fences clear out of order — the release shape

The three-release split assumes that the ESI and attended-filing answers arrive before the Q4 format (§05.7). Two fences decide what R2 and R3 contain: F-08 and F-01. This table fixes the release shape for each joint outcome at R2's gate, so the rescope is not improvised on the day.

<!-- DIAGRAM: scope-phasing-joint-fence-outcomes -->

| At R2's GATE_REVIEW | F-01 still open | F-01 CLEARED or later |
| --- | --- | --- |
| **F-08 SHIPPED for at least one portal** | As planned. R2X-02 is met by release; R3 is C-48 and C-49 on F-01, then C-51 | SC-A pulls C-48 and C-49 into R2 if their build can finish before R2's gate; otherwise they stay in R3. R3 is then C-51, the first full year |
| **F-08 open everywhere, carve-out declared** | R2X-02 is met by the declared carve-out. C-45 ships per portal whenever F-08 clears, by SC-A. R3 is C-48 and C-49 on F-01, then C-51 | SC-A pulls C-48 and C-49 into R2. R3 becomes the counsel-cleared attended launch plus C-51 — the branch §05.7's hypothesis names |

Three constraints hold on every branch:

- **The Q4 family enters the SLA only on a real Q4 submission.** For Tax Year 2026-27 that submission cannot precede the quarter's close on 31 March 2027, and it falls due by 31 May 2027 (EV-049). Pulling C-48 forward changes when the writer is built, not when the family's lines reach IN_SLA (AF4).
- **F-04 is independent of both.** Its outcome table (§05.18) moves only A-09 and C-46, and V1X-04 reads it at R3's gate whatever branch R2 took.
- **No branch moves a P0 row.** None of these rows was ever P0 (L2), so the R1 list is untouched by any combination.

#### Hypercare — a new tenant's first cycles

The first cycles are where migration mistakes, identifier gaps and misread structures surface, and where the product has the least history to diff against. Every newly admitted tenant runs its first `hypercare_cycles` monthly cycles under these rules; the parameter is the Filing desk lead's, routed to §20 until the first design-partner quarter shows how many cycles problems take to stop appearing.

| Rule | Statement |
| --- | --- |
| H-1 | Every artefact family's first instance for the tenant runs in Mode B, co-attended, whatever mode the tenant chose (FR-OPS-011). So does the tenant's first genuine Supplementary return, Revised return and NIL month, inside or after hypercare, because their only oracle is rule text or the portal (§05.7, the oracle table) |
| H-2 | A named operator and a named statutory reviewer are assigned to the tenant for the whole period |
| H-3 | The first cycle's PROCESSED result is diffed against the parallel-run month (§16.7); any unexplained difference blocks APPROVED |
| H-4 | Every REJECTED instance is root-caused within the cycle and classed by §05.9's taxonomy |
| H-5 | The first genuine production occurrence of any seeded case (SF-01 to SF-15) is compared with its fixture and the comparison stored |
| H-6 | Hypercare ends after `hypercare_cycles` consecutive cycles with no product-caused miss and no product-caused rejection; a product-caused miss inside hypercare is also a hold trigger (above) |

#### Defect classes that block a gate

A release gate reads the open-defect list as well as the checks. The classes are keyed to what a defect can do to a tenant, and they sit beside §08's statutory-artefact error taxonomy (FR-PAY-713), which classifies what the engine raises at run time.

| Class | Definition | Gate rule |
| --- | --- | --- |
| D1 — statutory figure | A wrong amount, base, ceiling, rate or due date in any artefact, payslip, register or approval artefact | None open at any gate; one found after RELEASED is a hold trigger |
| D2 — artefact format | An artefact the authority's own validator would reject | None open for any family in the release |
| D3 — control | A breach of maker-checker, the permissions matrix, the consent record or the Aadhaar boundary | None open at any gate |
| D4 — evidence | A missing or unreadable acknowledgement, on-behalf log entry or evidence record | None open on any family's PL-01 evidence |
| D5 — other | Everything else | May ship with a recorded owner and a fix-by release |

#### What each band gets, release by release

| Band | R1 | R2 | R3 | v2 |
| --- | --- | --- | --- | --- |
| 1–9 | Not served — R1 is design partners only | Free tier, self-serve; artefacts in Mode A; every line TENANT_SELF_FILES | As R2 | As R2 |
| 10–19 | Not served | Free tier; latches instrumented (Example B); the 20-crossing converts (§05.11) | As R2 | As R2 |
| 20–49 | Design partners on contracted terms | File tier off the published card (item 16) | As R2, plus R3's families | As R3 |
| 50–199 | Design partners on contracted terms | File tier, self-serve or CA-referred | As R2, plus R3's families | As R3 |
| 200–999 | Existing tenants retained (AD-03); no new sales (AD-04) | As R1 | As R1 | Opens when DG-2a to DG-2d all pass |
| 1,000–1,999 | — | — | — | Late v2, when DG-3a to DG-3d all pass |
| 2,000+ and PSU/BFSI | — | — | — | Vision, on DG-4 and DG-5 |

#### The gate record — what a gate review writes down

| Field | Rule |
| --- | --- |
| `gate_record_id`, `gate` | One record per convening of R1, R2, R3 or a phase gate; a re-convened gate writes a new record |
| `convened_at` | Timestamp |
| `checks[]` | Each check's ID, evidence reference, result (PASS or FAIL) and evaluator — every check listed for the gate in the table above, none omitted |
| `lint_result` | L1 to L8 over the release's rows, with any failure's row and rule |
| `invariants_result` | SI-01 to SI-15 over every record the release touches, with any failure's records and rule (§05.17); an invariant that cannot be evaluated reads FAIL |
| `rows_added_after_rs2` | Every row added to the release after it entered IN_BUILD, with its change class and the rule under IB-1 that admitted it |
| `open_defects` | Counts and IDs by class D1 to D5 |
| `fences_declared` | Every fenced row in the release, with the coverage notice that declares it |
| `family_states` | Every artefact family in the release, with its readiness state (§05.20) and its AF4 evidence reference where it has one — so the gate sees which families are sellable, not only which are built |
| `decision` | PASS or FAIL — there is no third value |
| `signatories` | The owner of every check, each signing their own check only |
| `dissent` | Any signatory's recorded objection and reason; a dissent on a D1 or D3 question blocks PASS |

#### Artefact-family dossiers — where each family's pieces live

A build team working on one family needs every piece of it in one place. This table is that index; it adds no rule of its own.

| Family | Evidence base | Statutory spec | Built in | Golden and seeded cases | Runbook | Fences | Release |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ECR | EV-035–040, EV-044 | §06.2 | WP-13, WP-14 | TV1, TV2, TV16, TV18; SF-01 to SF-05 | FR-OPS-012, FR-OPS-013 | F-03 for arrears | R1; arrears R3 |
| ESI contribution and upload | r1/06; r3/05 | §06.3 | WP-11, WP-14 | TV3, TV4, TV23; SF-10 | FR-OPS-014 | F-04, F-05 | R1; upload R1 or R2 |
| TDS deposit | EV-050 | §06.5 | WP-11; FR-PAY-902 | §08 Example F | — the employer pays (§22 P5) | F-10 | R1 |
| Form 138 Q1–Q3 | EV-049, EV-051, EV-052 | §06.5 | WP-13, WP-14 | The official `138RQ1.txt` sample as the golden fixture (r5/02); SF-11 | FR-OPS-015 | F-02 for corrections | R1 |
| Form 138 Q4 | EV-046, EV-047 | §06.5 | On F-01 clearing | On release | FR-OPS-015 | F-01 | R3 |
| Form 130 distribution | EV-048 | §06.5 | FR-PAY-707 | AC-707.2's reconciliation | FR-OPS-016 | F-01 for Tax Year 2026-27 | R1 mechanism; R3 |
| Form 123 statement | EV-050 | §06.5; §11.17 | On F-12 clearing | The published form, once read | — issued to employees, not filed | F-12 | R3 |
| PT | EV-014, EV-015 | §06.4 | WP-11 | TV10 | FR-OPS-017 | F-06 per state | R1 (Maharashtra computation); R2 |
| LWF | EV-015 | §06.8 | WP-11 | — until a state is sourced | FR-OPS-017 | F-07 per state | R2 |
| Registers and wage slip | EV-053–055 | §06.9 (registers specification) | WP-14 | TV19 to TV21 | — maintained, not filed | F-11 per state | R1 |
| Appointment letter | EV-057 | §06.1 | WP-14 | — | — | F-11 per state | R1 for captured states |
| Annual returns | r5/04 | §06.11 | WP-14 | TV24 | §22.4.5 portal tasks | — | R2 |
| Gratuity payout | r1/06; r3/04 | §06.6 | WP-11 | TV8; SF-06 | — | PH-01 | R1 |
| Statutory bonus return | §06.7 | §06.7 | On F-09 clearing | TV9 | — | F-09 | R3, if cleared |

#### Non-functional requirements, by release

Every §17 requirement tagged P0 is in R1, with the readings below; the NFRs themselves are §17's and are not restated.

| NFR | Reading for the releases | Why |
| --- | --- | --- |
| NFR-SCALE-901 | Its P0 targets are verified by load test before C-36 opens self-serve in R2; R1 must not architect them out | R1 carries design partners only; the self-serve opening is when tenant count stops being chosen by us |
| NFR-PERF-1002 | Pay-run throughput verified at design-partner scale for R1 and re-verified before R2 | As above |
| NFR-AVAIL-801, NFR-AVAIL-802 | Measured from R1's first live month; contractual availability SLAs stay P2 | The windowed objective is **[Hypothesis]** until §20 instrumentation replaces it |
| NFR-DPDP-501 | R1 runs the SPDI regime; the DPDP-regime notices and flows are pre-staged and live before on or about 13 May 2027, whichever release is current then | A dated obligation, not a release feature (EV-058) |
| NFR-L10N-1301 | The multilingual frame in R1; breadth of languages in R2 | §17's own P0/P1 split |
| NFR-A11Y-1201 | Employee self-service at WCAG 2.2 AA in R1; admin surfaces in R2 | §17's own P0/P1 split |
| NFR-RES-704 | The profile field, defaults and propagation in R1; regulated attestation later | §17's own split; AD-10 needs the field from the first regulated prospect |
| NFR-DR-1401 | R1 runs on the provisional RPO and RTO, replaced by §20 instrumentation | §17 marks them provisional |
| NFR-SEC-104, NFR-SEC-403 | SSO in v2 (item 24); access reviews in R2 | Their own P1/P2 tags |

#### Contract artefacts R1 cannot invoice without

| Artefact | Needed at | Owner | Gated by |
| --- | --- | --- | --- |
| Design-partner agreement — contracted price, reference rights (for DG-2d later), data-use limits | TO5 | GTM lead, Legal lead | — |
| Master agreement with the SLA clause citing the coverage statement | TO5; PL-05 | Legal lead | CR-17e (liability allocation) |
| Data processing agreement | TO5 | Legal lead | CR-03's gate |
| Employee notice and consent templates | TO7 | Legal lead | CR-04, CR-22; CR-27 for in-app capture of biometric consent |
| Coverage-statement and carve-out notice templates | TO10 | Product lead, Legal lead | §23.1.6 clearance of any legal statement |
| Incident communication wording for tenants | R1X-01 | Legal lead, Security lead | CR-24 |
| Written authority to act (FR-OPS-002) | Mode C, in R2 | Legal lead | CR-17a to CR-17d |

#### Beyond R1 — the named backlog

The review asked for "R2 and later as a named backlog". R2 and R3 are named here as capabilities with owners, continuing the C-series; v2 and Vision stay as module items, because their scope is gated on evidence that does not exist yet (§05.3).

| ID | Release | Capability | Rows | Acceptance reference | Owner | Blocker or dependency |
| --- | --- | --- | --- | --- | --- | --- |
| C-36 | R2 | Published INR price card with a continuous ramp, and Free-tier self-serve signup | Item 16 | §18.2 P2, P3, P6 | GTM lead | — |
| C-37 | R2 | Named-source importers — Tally first, then Zoho Payroll, Kredily, Frappe HR, greytHR | Item 17 | §16.7 AC-MIG-2 | Product lead | C-05 |
| C-38 | R2 | The FBP and benefits data model, built, not monetised | Item 18 | §11; FR-PAY-501, FR-PAY-502 | Product lead | — |
| C-39 | R2 | Recruiting inbound ingest with bring-your-own job-board contracts | Item 19 | §10 | Product lead | — |
| C-40 | R2 | The thin CA console | Item 20a | §18.7; FR-OPS-029 | GTM lead, Filing desk lead | §20 V-05 |
| C-41 | R2 | The public device compatibility matrix and self-serve checker | Item 21 | §09; §16.4 | Engineering lead | §20 V-10 |
| C-42 | R2 | The ECR part-payment file | A-05 | FR-PAY-701; FR-OPS-013 | Engineering lead | — |
| C-43 | R2 | OSH FORM-XVII and SS Form XXIII annual returns | A-20, A-21 | §06.11; §06.14 TV24 | Statutory desk lead | Due by end-February (GL-4) |
| C-44 | R2 | PT returns and LWF remittances for each design-partner state as it is sourced | A-15 return leg, A-16, A-17 | FR-PAY-703, FR-PAY-704; FR-OPS-017 | Statutory desk lead | F-06, F-07 per state |
| C-45 | R2 | Operator-attended submission on each cleared portal | A-23 | FR-OPS-001 (Mode C); FR-OPS-020 to FR-OPS-024 | Filing desk lead, Legal lead | F-08 per portal |
| C-46 | R2 | The post-lapse ESI regime as a rule version | A-09 | F-04's outcome table | Statutory desk lead | F-04 |
| C-47 | R2 | Non-filing obligations as tracked tasks — crèche, canteen, Grievance Redressal Committee, a works committee on a government order, the POSH Internal Committee record | — | Example H's acceptance (§05.6); §10 for the Internal Committee | Product lead | — |
| C-48 | R3 | Form 138 Q4, regular and correction, with Annexures II and III | A-13 | FR-PAY-706 | Engineering lead | F-01 |
| C-49 | R3 | Tax Year 2026-27 Form 130 distribution and Part B data readiness | A-14 | FR-PAY-707 AC-707.1–2 | Product lead | F-01 |
| C-50 | R3 | The ECR arrear-return generator | A-06 | FR-PAY-701; FR-OPS-013 | Engineering lead | F-03; deferred to v2 by change control if uncleared |
| C-51 | R3 | The first complete statutory year closed on the ledger for every design partner | — | V1X-02 | Statutory desk lead | C-48, C-49 or their declared carve-out; C-53 |
| C-53 | R3 | Issue Form 123 (ex-12BA) perquisite statements to employees | A-29 | §06.5; §11.17 (Form 123 totals tie to the perquisite valuation output) | Statutory desk lead | F-12 — a desk read, so an open F-12 fails R3's gate rather than being declared (§05.18) |
| Item 20b | v2 | The productised CA console | — | §18.7 | GTM lead | §20 V-05; C-40 |
| Items 22–27 | v2 | Multi-establishment payroll, all-states PT/LWF, SSO/SCIM, metered SKUs, performance, priced GPS | — | §05.5 | Per item | DG-2a to DG-2d; the seams above (§05.19) |
| A-24, A-25 | v2 | The principal-employer contract-labour return and Shram Suvidha intimations | — | OSH r.98(9), r.94 (r5/04) | Statutory desk lead | The own-roll/contract seam |
| Items 28–31 | Vision | Self-host compliance SKU, residency matrix GA, the external MCP server, IR tooling | — | §05.5 | Per item | DG-4, DG-5 |

---

### 05.21 Tenant admission and the coverage statement

The section's opening test — a band is in scope only when its filings can be named, their acceptance mechanism is known and an SLA can stand behind them — has to be applied again to every tenant, because tenants differ in states, registrations, workforce and timing. The **coverage statement** is that test's output for one tenant: a versioned, per-registration, per-obligation record of what the product delivers under the SLA, what it delivers without the SLA, and what it cannot deliver yet and why. Admission is the decision to issue one.

#### Coverage states

| State | Meaning | Inside the SLA? | §19 treatment | Set by |
| --- | --- | --- | --- | --- |
| `IN_SLA` | The artefact family has passed PL-01, the tenant is on the File tier, and nothing fences this line | Yes | In the Filing-Coverage numerator and the on-time denominator | Computed |
| `SLA_PENDING_FIRST_SUBMISSION` | The family is built and in R1 or later, but has not yet passed PL-01 platform-wide (Form 138 until its first real quarterly submission — §05.20) | No — warning lead time only | Outside the on-time denominator until it moves to IN_SLA | Computed |
| `CARVED_OUT_FENCE` | A fence in §05.18 blocks the line | No — pre-declared exclusion | Coverage-gap register | Computed from the fence register |
| `CARVED_OUT_PARAMETER` | A parameter hold with a BLOCK effect (§05.22) blocks the line | No | Coverage-gap register | Computed from the parameter-hold registry |
| `TENANT_SELF_FILES` | The product generates the artefact but does not attend or guarantee it — the Free tier, or data the product does not hold | No | Outside Filing Coverage | Computed from tier and data sufficiency |
| `NOT_APPLICABLE` | The obligation has not latched for this registration, or a sourced row says the state does not levy it | — | Neither | Computed by the obligation engine |
| `NOT_OFFERED` | An admission rule excludes the line — for instance, EPF for an establishment with an International Worker while PH-05 is unset | No | Recorded as unmet demand against the named hold | Computed from the admission rules |

No state is ever set by hand. A request to move a line between states is a change to its inputs — a fence clearing, a parameter being set, a tier change — and the statement re-versions itself (TS-05-22).

#### The coverage statement — data definition

| Field | Type | Rule |
| --- | --- | --- |
| `coverage_statement_id` | Identifier | Stable across versions of one tenant's statement |
| `tenant_id` | Identifier | — |
| `version` | Integer, monotonically increasing | Every version is immutable once issued |
| `effective_from` | Timestamp | The SLA reads the version in force on each instance's due date |
| `trigger` | admission · fence change · parameter change · registration change · band crossing · tier change · release change | Recorded so any version can be explained |
| `tier` | Free · File | From §18.4; the tier never drives an obligation (§05.11) |
| `release_in_force` | R1 · R2 · R3 · v2 | Which release's scope the statement was computed against |
| `lines[]` | One line per registration × obligation | Below |
| `line.registration_id` | Identifier | PF establishment code, ESI employer code, PT registration, TAN — per §14.3.1 |
| `line.obligation` | Rule-object reference | The obligation, not a module name |
| `line.artefact_family` | ECR · ESI upload · TDS deposit · Form 138 · Form 130 distribution · PT return · LWF remittance · register · wage slip · appointment letter · annual return · gratuity payout | Families are the unit PL-01 is evaluated on |
| `line.period_class` | monthly · quarterly · annual · event | — |
| `line.state` | One of the seven states above | Computed |
| `line.blocker_ref` | Fence or parameter-hold ID, or empty | Mandatory when the state is CARVED_OUT_* or NOT_OFFERED |
| `line.mode` | A · B · C · D (§22 FR-OPS-001) | C only when `F-08[portal]` is SHIPPED |
| `line.notice_id` | Notice sent for the line's current state | Mandatory for every state other than IN_SLA and NOT_APPLICABLE |
| `line.since` | Timestamp | When the line entered its current state |

Every version emits one `coverage.versioned` event carrying `{tenant_id, version, trigger, lines_changed[]}`, so §19's Filing Coverage and coverage-gap register are computed from events, not from a nightly scan (§19.11.1).

#### How a line's state is computed

The state is a deterministic function of the line's inputs, evaluated in this order; the first rule that matches decides it. The order matters: a fenced line is fenced even for a Free-tier tenant, because the product cannot generate what the fence blocks.

| Order | State | Matches when |
| --- | --- | --- |
| 1 | NOT_APPLICABLE | The obligation engine has not latched the obligation for this registration, or a published row says the state does not levy it |
| 2 | NOT_OFFERED | An admission rule excludes the line (AD-06) |
| 3 | CARVED_OUT_FENCE | A fence blocking this family for this registration's state or portal is in any state other than SHIPPED |
| 4 | CARVED_OUT_PARAMETER | A parameter hold with a BLOCK effect (§05.22) applies to the line |
| 5 | TENANT_SELF_FILES | The tenant is on the Free tier; the product lacks the history the artefact needs (data sufficiency, below); or the line carries a tenant-supplied figure |
| 6 | SLA_PENDING_FIRST_SUBMISSION | The family has not passed PL-01 platform-wide, or the release in force does not yet include it |
| 7 | IN_SLA | None of the above |

`line.mode` is computed alongside: C only where `F-08[portal]` is SHIPPED and the tenant chose it; B for each family's first instance during hypercare (§05.20 H-1); otherwise the tenant's choice of A or B. The same inputs always produce the same statement — the property TS-05-21 tests.

#### Admission rules

<!-- DIAGRAM: scope-phasing-tenant-admission -->

The rules are evaluated in order at admission and again on every trigger. Each names the line states it produces.

| ID | Condition | Outcome | Line states produced | Source |
| --- | --- | --- | --- | --- |
| AD-01 | Own-roll headcount 1–19 | Free tier; artefacts in Mode A; no attended submission, no SLA | Every applicable line TENANT_SELF_FILES | §05.1; §18.4 |
| AD-02 | Own-roll headcount 20–199 | Eligible for the File tier, subject to AD-05 to AD-18 | Computed per line | §05.1 |
| AD-03 | An existing tenant's headcount reaches 200 or more during v1 | Retained on its current coverage; flagged for the v2 sale; multi-establishment payroll operations (item 22) are not offered before v2 | Unchanged | §05.11 |
| AD-04 | A new prospect at 200 or more before the v2 gate opens | Not sold; recorded as a v2 lead | — | §05.3; §05.12 |
| AD-05 | An establishment in a state whose PT or LWF row is unsourced | Admitted | That state's PT and LWF lines CARVED_OUT_FENCE (`F-06[state]`, `F-07[state]`); never NOT_APPLICABLE on an aggregator's say-so (§06.4) | §05.18 |
| AD-06 | Any International Worker on an establishment while PH-05 (`iw_contribution_base_rule`) is unset | That establishment's EPF is not admitted to the File tier: a Regular return that omits or guesses a member is not a correct return (FR-PAY-713: artefacts are never hand-edited) | EPF lines NOT_OFFERED; demand recorded on PH-05 so the desk memo is prioritised | Example G; §05.22 |
| AD-07 | First live wage month is not April | Go-live gated on the §16.7 tie-out at ₹0 on the V-15 heads | — | Item 32 |
| AD-08 | ESI-covered employees with periods after the saving lapses (on or about 21 November 2026) | PH-12 must be set platform-wide (PL-04); the tenant's written acknowledgement of the posture is recorded before the first post-lapse LOCK | ESI lines CARVED_OUT_FENCE (F-04) for post-lapse periods | §05.18 |
| AD-09 | The tenant wants operator-attended submission | Offered only per portal where `F-08[portal]` is SHIPPED; Mode B otherwise | `line.mode` = B | §05.18 |
| AD-10 | RBI-, SEBI- or IRDAI-regulated tenant | Admitted with the sectoral profile (NFR-RES-704) and AI off by default (§12.8.3); for an RBI entity, its own materiality determination recorded before go-live (CR-14; §23.12.3) | Unchanged | EV-085–087 |
| AD-11 | Biometric terminals in the fleet | Admitted; no template enrolled before written consent (FR-ATT-017; EV-060); a non-biometric path per employee (§09); never a condition of employment or pay (CR-10) | Unchanged | EV-060, EV-072 |
| AD-12 | A 10+-worker establishment in a state whose appointment-letter form is not captured | Admitted | Appointment-letter line CARVED_OUT_FENCE (`F-11[state]`) | EV-057 |
| AD-13 | Contract labour on site | Admitted; contract workers excluded from own-roll thresholds; the contractor surface is v2 | A-24 and A-25 lines absent (v2); no own-roll line affected | Example J; CR-48 |
| AD-14 | An EPF establishment with an unfiled earlier wage month in its EPFO history | Admitted; the gap enters the ledger as BLOCKED with an owner before the first Regular return (FR-PAY-712 AC-712.1–2), classed tenant-caused (§05.9) | ECR line IN_SLA, with the gap shown as a tenant-caused blocker | EV-038 |
| AD-15 | Members whose exit date was recorded in error at EPFO | Admitted; those members BLOCKED-joint-declaration (AC-712.3) | ECR line unchanged; members flagged | EV-041 |
| AD-16 | Any salaried deductee while F-10 is open | Admitted | TDS computation IN_SLA; the deposit line's timing CARVED_OUT_FENCE (F-10) | §05.18 |
| AD-17 | An annual return (A-20, A-21) is due for a calendar year the product does not fully hold | Admitted | That year's annual-return line TENANT_SELF_FILES, with a data-gap report naming the months the product lacks | GL table (§05.20) |
| AD-18 | After AD-01 to AD-17, no EPF establishment line is IN_SLA or SLA_PENDING_FIRST_SUBMISSION | Not admitted to the File tier; the Free tier is offered with the blocking reason named | — | The beachhead exists because of EPF (§05.1) |

AD-18 is the rule that keeps admission honest. A 20–199 tenant is sold the File tier because EPF turned on for it; if the product cannot deliver that tenant's EPF under the SLA, selling it the tier would be selling the rest of the filing surface on the strength of the one filing it cannot keep.

#### Tenant-supplied figures in fenced states

AD-05 admits a tenant whose establishments sit in unsourced states, but those employees' payslips still need their PT and LWF deducted — the obligation does not wait for our fence. The product neither blocks the run nor guesses the figure.

| ID | Rule |
| --- | --- |
| TSF-1 | In a state whose PT or LWF row is unpublished, the tenant may enter a per-employee deduction with the source it relies on. The payslip, the register and the approval artefact carry the figure labelled "tenant-supplied", never as a computed figure |
| TSF-2 | A tenant-supplied figure never enters a product-generated statutory artefact. The state's return or remittance line stays CARVED_OUT_FENCE, and its notice says the tenant files it |
| TSF-3 | Tenant-supplied figures sit outside every SLA and every §19 filing metric; the approval artefact lists them apart from computed heads |
| TSF-4 | When the state's pack publishes (FL8), the product computes from the next unlocked month. Locked months keep the tenant's figures; any difference from the published rule is shown as a diff for the tenant to decide on a correction (FR-PAY-306), never applied silently |
| TSF-5 | The product never proposes a figure — not from an aggregator, not from a draft row the pipeline holds in DRAFTING, not from the assistant (§12.8.1) |

In WE-2 below, entity X's twelve Karnataka employees earn above ₹25,000. If the tenant enters ₹200 each for April, the April run carries ₹2,400 of tenant-supplied Karnataka PT, labelled as such. When `F-06[KA]` ships — once the amending notification is retrieved and the version leaves DRAFTING (EV-014) — the product computes from the next unlocked month, and shows April's figures against the published rule as a diff.

#### The tenant's lifecycle — from prospect to closed records

Admission is one transition in a longer life. The lifecycle fixes the order of the steps whose order matters — consent before import, tie-out before admission, export before revocation, retention before erasure — so none depends on an operator remembering it.

<!-- DIAGRAM: scope-phasing-tenant-lifecycle -->

| # | From → To | Event | Guard | Side effect | Who may trigger |
| --- | --- | --- | --- | --- | --- |
| TO1 | *(none)* → PROSPECT | Signup, or a design-partner contact | — | Admission rules evaluated for eligibility only | GTM lead |
| TO2 | PROSPECT → FREE | AD-01 applies | Own-roll headcount 1–19 | Free-tier statement issued; every applicable line TENANT_SELF_FILES | System |
| TO3 | PROSPECT → WAITLISTED | AD-04, AD-06 or AD-18 fails | — | The blocking rule named to the prospect; demand recorded against the hold or gate | System |
| TO4 | WAITLISTED → PROSPECT | The blocking hold is set or the gate opens | — | Rules re-evaluated; the prospect told | System |
| TO5 | PROSPECT → CONTRACTED | Contract signed | The SLA clause exists (PL-05) and the DPA template is final (CR-03's gate) | Scope of the contract fixed to the release in force | GTM lead, Legal lead |
| TO6 | FREE → CONTRACTED | The tenant crosses 20 and takes the File tier (§05.11) | As TO5 | As TO5 | GTM lead |
| TO7 | CONTRACTED → CONSENT_RUN | The consent flow is run over the roster (C-04) | Notice templates cleared (CR-04, CR-22) | Every employee has a status: consented, declined or pending | Product lead |
| TO8 | CONSENT_RUN → LOADED | The import runs (C-05) | Fields that need consent are loaded only for employees whose status allows it (item 35) | Registrations, master, structures and YTD in the tenant | Product lead |
| TO9 | LOADED → TIED_OUT | The §16.7 tie-out passes, or the cutover is 1 April with no in-year YTD to carry | AC-MIG-5 | Parallel-run month recorded | Product lead |
| TO10 | TIED_OUT → ADMITTED | Coverage statement v1 issued | AD-01 to AD-18 evaluated with AD-18 passing; every affected due-date window has desk capacity (FR-OPS-027); PH-18 set | The SLA clause cites v1 | System, confirmed by the Filing desk lead |
| TO11 | ADMITTED → LIVE_HYPERCARE | The first live wage month opens (FR-PAY-301 M1) | — | Named operator and reviewer assigned (H-2) | System |
| TO12 | LIVE_HYPERCARE → LIVE | H-6 met | — | Normal queue | Filing desk lead |
| TO13 | LIVE or LIVE_HYPERCARE → NOTICE_GIVEN | Contract end or revocation | — | No new instance is opened beyond the notice's last month; open instances continue to their due dates | Tenant or GTM lead |
| TO14 | NOTICE_GIVEN → EXPORTED | The C-52 export is delivered and acknowledged | Every open filing instance has a hand-back package (FR-OPS-030 AC-030.1) | Manifest and hashes stored | Product lead |
| TO15 | EXPORTED → REVOKED | Written authorities revoked; vault entries shredded (FR-OPS-030) | TO14 complete | Sessions closed | Filing desk lead, Security lead |
| TO16 | REVOKED → RETAINED | Records held under §14.7 | — | Only retention and production on request; no processing beyond them | System |
| TO17 | RETAINED → CLOSED | Every retention clock has expired | No legal hold; no rule-set period running (EV-054; CR-11) | Erasure under §14.7 | System, confirmed by the Legal lead |

The order TO7 → TO8 is the one that cannot be repaired afterwards: an import that runs before the consent flow collects bank details with no consent record, and consent cannot be backfilled (§07, FR-CHR-102). The order TO14 → TO15 → TO17 is the one the employer's retention duty depends on (C-52).

#### What re-versions a statement

| Trigger | Recomputes | Tenant notice | Example |
| --- | --- | --- | --- |
| A fence moves to SHIPPED (FL8) | Every line carrying that fence | Yes — the line enters the SLA from the stated date | `F-06[KA]` ships; a Karnataka establishment's PT line moves to IN_SLA |
| A fence reopens (FL9) | Every line that fence had released | Yes — before the next due date it affects | A corrigendum withdraws a successor ESI version |
| A parameter hold is set | Every line the hold blocked | Yes | PH-05 set; AD-06 no longer applies; EPF admitted |
| A family passes PL-01 | Every tenant's lines for that family | Yes | The first real Form 138 submission; SLA_PENDING lines move to IN_SLA |
| A registration is added or closed | That registration's lines | Yes | A new Bengaluru establishment (Example E) |
| A band crossing changes the tier | Every line's SLA eligibility (§05.11) | Yes | A Free-tier tenant crosses 20 and takes the File tier |
| A release is RELEASED | Lines whose family the release adds | Yes | R2 adds the annual returns |
| A release enters HELD | No line changes state; intake stops for new tenants in the held family | Only to prospects | — |
| A breaking format version is certified (AF5) | No line changes state; each tenant's next instance of the family is flagged for Mode B | Yes — the tenant is told its next instance is co-attended, and why | A new ECR layout from a named wage month (§05.23 Trace 9) |
| A family is SUSPENDED (AF7) | No line changes state; intake stops for new tenants in the family | Only to prospects, and to the affected tenant | — |

**One tenant's statement over its first year — the machinery, not a forecast.** WE-1's tenant (below) is admitted for wage month May 2027. The later versions show what each trigger does; they are illustrations of the rules, and nothing here predicts when any Telangana instrument or r.218 reading will actually arrive.

| Version | Trigger | Lines that change | Notice |
| --- | --- | --- | --- |
| v1 | Admission | Every line created, as WE-1's table shows | One admission notice listing each carve-out and its reason |
| v2 | The Form 138 family passes PL-01 platform-wide — at the latest on this tenant's own Q1 submission, due 31 July 2027 | Form 138: SLA_PENDING_FIRST_SUBMISSION → IN_SLA | Yes |
| v3 | F-10 clears: r.218 read and published | TDS deposit timing: CARVED_OUT_FENCE → IN_SLA, from the first deposit falling due at least `sla_onboarding_lead_days` later (SS-1) | Yes |
| v4 | `F-06[TS]` ships | Telangana PT: CARVED_OUT_FENCE → IN_SLA, under the same SS-1 lead | Yes |
| v5 | A corrigendum to the Telangana instrument reopens `F-06[TS]` (FL9) | Telangana PT back to CARVED_OUT_FENCE; instances already due stay judged under v4 (SS-5) | Yes, before the next due date it affects |
| v6 | The corrected pack publishes | Telangana PT: IN_SLA | Yes |
| v7 | The tenant opens a Bengaluru establishment | New lines, including Karnataka PT CARVED_OUT_FENCE (`F-06[KA]`) and the new establishment's registers | Yes |

#### Notice content — what every carve-out notice must carry

The wording is a governed template (FR-RULE-015) with a Legal lead's clearance for any legal statement (§23.1.6); these are the fields no template may omit.

| Field | Why it is mandatory |
| --- | --- |
| The line: registration, obligation, artefact family | So the tenant can act on the exact filing |
| The state and its blocker in plain words (for example "Form 138 Q4 format not yet published by the authority") | A carve-out without its reason reads as a product gap |
| What the product still does — the worksheet, the prepared data, the Mode A checklist, the deadline clock | The interim posture is part of the service |
| What the tenant must do, and by when | The employer's and deductor's liability is non-delegable (§22.2.2); a notice that leaves it implicit misstates the allocation |
| The statutory due date and the exposure if it is missed, stated as the rule records it | The penalty clock does not pause for our fence (§19.3.2) |
| When the blocker was last checked, and the next check | `last_checked_at` from the fence record |
| The coverage-statement version this notice belongs to | So the SLA and the notice cite the same thing |

#### Worked examples — three tenants, their statements and their numbers

**WE-1 — a 22-person Hyderabad firm just past the 20-crossing (Example A).** One establishment in Telangana, one PF establishment code, one ESI employer code, one TAN, one PT registration. All 22 have EPF wages of ₹15,000; 14 are ESI-covered on ESI wages of ₹18,000. First live wage month: May 2027.

| Line | State | Blocker | Monthly figure |
| --- | --- | --- | --- |
| ECR | SLA_PENDING_FIRST_SUBMISSION, then IN_SLA on PL-01 | — | 22 × ₹3,600 = ₹79,200 (TV16's per-member split) |
| ESI contribution | IN_SLA for computation, post-lapse periods CARVED_OUT_FENCE | F-04; F-05 for the upload file | 14 × ₹720 = ₹10,080 — ₹1,890 employee, ₹8,190 employer — provisional under PH-12 |
| TDS computation | IN_SLA | — | Per FR-PAY-205 — not illustrated, because Tax Year 2027-28's Finance Act parameters are outside this PRD's evidence |
| TDS deposit timing | CARVED_OUT_FENCE | F-10 | — |
| Form 138 | SLA_PENDING_FIRST_SUBMISSION | — | First real quarter: Q1 of Tax Year 2027-28, due 31 July 2027; April's rows come from the prior system (GL-1) |
| PT (Telangana) | CARVED_OUT_FENCE | `F-06[TS]` — the slab was never verified (EV-014) | — |
| LWF (Telangana) | CARVED_OUT_FENCE | `F-07[TS]` — levy status unverified; a sourced "no levy" row would make it NOT_APPLICABLE | — |
| Registers and wage slip | IN_SLA (conformance) | State forms per `F-11[TS]` | — |
| Appointment letter | CARVED_OUT_FENCE unless Telangana's form is captured | `F-11[TS]` | — |
| Gratuity accrual | IN_SLA | — | Accrues from the 10-employee latch (C-17) |

The tenant is admitted (AD-18 holds: its EPF line is SLA_PENDING and then IN_SLA). Its statement is honest about the state it is in: Telangana is the tenant's home state, and neither its PT nor its LWF can be promised yet.

**WE-2 — a 60-person, three-state, two-entity firm.** Entity X employs 40 across a Telangana and a Karnataka establishment; entity Y employs 20 in Maharashtra. For this example the firm holds two TANs, two PF establishment codes, two ESI employer codes and three PT registrations.

| Registration | ECR | ESI | TDS | PT |
| --- | --- | --- | --- | --- |
| Entity X — PF, ESI, TAN; PT Telangana | IN_SLA (after PL-01) | IN_SLA, post-lapse F-04 | Computation IN_SLA; deposit F-10 | CARVED_OUT_FENCE `F-06[TS]` |
| Entity X — PT Karnataka | — | — | — | CARVED_OUT_FENCE `F-06[KA]` — effect read, amending notification unretrieved (EV-014) |
| Entity Y — PF, ESI, TAN; PT Maharashtra | IN_SLA (after PL-01) | IN_SLA, post-lapse F-04 | Computation IN_SLA; deposit F-10 | Computation IN_SLA; return CARVED_OUT_FENCE (A-15's return leg) |

The count that matters for cost is the line count, not the headcount: this tenant carries two ECR lines, two ESI lines and two TDS lines every month against a 150-person single-registration tenant's one of each — which is why supervised minutes are metered per registration (C-30) and why the registration allowance is §18's (EV-088; §13.19). Per-employee jurisdiction resolution lets the Maharashtra employees' PT compute while the Telangana and Karnataka employees' PT stays fenced (PR-05).

**WE-3 — a 45-person Gurugram analytics firm with one International Worker (Example G).** One establishment in Haryana. AD-06 applies while PH-05 is unset: the establishment's EPF lines are NOT_OFFERED, so AD-18 fails and the firm is not admitted to the File tier. It is offered the Free tier with the reason named, and its demand is recorded against PH-05. Haryana's PT line would read CARVED_OUT_FENCE, not NOT_APPLICABLE: Haryana is reported as a non-levying state only by aggregators, and no negative has been verified for any state (§06.4). When the desk memo sets PH-05, the statement re-versions and the firm becomes admissible without any other change.

**WE-4 — a 30-person NBFC in Mumbai.** A central-sphere-extended ESI class: ESI is triggered at 20 persons, not 10 (§06.14 TV23; r1/06), so at 30 it applies. As an RBI-regulated entity the tenant takes AD-10: the RBI outsourcing obligations are materiality-gated and decided by the entity itself (EV-087), so its own determination is recorded before go-live (CR-14); the sectoral profile is set (NFR-RES-704) and pins residency in India (NFR-RES-701); the assistant starts switched off, because silently adding a model vendor can put a bank customer in breach of its own obligations (EV-087; §12.8.3). Its lines otherwise follow Maharashtra's: ECR SLA_PENDING and then IN_SLA — on the TV16 stylisation, 30 × ₹3,600 = ₹1,08,000 a month; ESI IN_SLA for computation with post-lapse periods fenced; Maharashtra PT computed, its return fenced (A-15). Nothing in the statement is regulated-specific except the profile and the assistant's default: the filings are the same filings.

**WE-5 — a 17-person Free-tier firm crosses 20.** A Jaipur handicrafts exporter on the Free tier latched ESI, gratuity and maternity benefit when it first touched 11 (Example B); every line reads TENANT_SELF_FILES, and the product generates its artefacts in Mode A. It ends a wage month at 21: `band.crossed` fires (§05.11), the obligation engine opens EPF on its own rule, and the EPF-registration task opens without a statutory deadline because `epf_registration_window` (PH-04) is unset — labelled so, not given an invented date. The tenant takes the File tier and v2 of its statement is issued. Its first ECR line is BLOCKED until the establishment code exists; once it does, the first instance due less than `sla_onboarding_lead_days` after v2 is TENANT_SELF_FILES with Mode B guidance offered (SS-1), and the SLA covers the ECR from the next instance. On the TV16 stylisation that instance is 21 × ₹3,600 = ₹75,600. Had the tenant been warned and delayed its registration past `tenant_action_lead[ECR]`, a resulting miss would be tenant-caused (SS-3).

#### Negative cases admission must survive

- A tenant asks for a carved-out state to be "switched on" because its CA already knows the slab — refused: coverage is computed from published rows, and a row enters only through the pipeline with a complete citation (AC-RULE-002.3).
- A sales request to admit a 250-person prospect "on v1 terms" before the v2 gate — refused by AD-04; recorded as a v2 lead.
- A tenant tries to add an International Worker after admission while PH-05 is unset — the next statement version moves that establishment's EPF lines to NOT_OFFERED with notice before the next due date, and the tenant's options are named; the product never generates a Regular return that omits the member.
- A Free-tier tenant at 18 asks for attended submission — refused under AD-01; the product generates the artefacts in Mode A and shows the File tier's conversion at the 20-crossing (§05.11).
- A tenant's first live month is December 2026 and PH-12 is unset — refused go-live under AD-08 and PL-04, not admitted with a guessed ESI posture.
- A tenant asks for its ECR line to start at IN_SLA because its CA has filed ECRs for it for years — refused: PL-01 is evaluated per family on the product's own first real submission (AF4), never on the tenant's history with someone else.
- A design partner with taxable perquisites asks for Form 123 statements in R1 — refused: in R1 each perquisite enters TDS only as an operator-entered value with its source, and Form 123 waits for F-12 and C-53 (PR-15). The tenant is still admitted; its TDS line is unaffected.

#### Data sufficiency — the history each artefact needs before the product owns it

A mid-period go-live leaves the product without part of the history some artefacts are built from. The rule is the same for every family: the product owns an artefact only for a period whose history it holds, natively or through a tied-out import; for any other period the line is TENANT_SELF_FILES with a data-gap report, never an artefact built on a guess.

| Artefact | History the product must hold | If it does not |
| --- | --- | --- |
| ECR for wage month M | Month M locked, and each earlier month's ledger status back through the M−4 window (EV-038) — from EPFO's approved return statements for months filed elsewhere (§16.7) | The gap is a tenant-caused blocker (AD-14); month M's Regular return waits for it |
| ESI for month M | Month M, and each covered employee's wages from the start of the current contribution period, for continuity (TV3) | Continuity is decided on the imported history or an operator confirmation recorded against the employee |
| Form 138 for a quarter | Every deductee row and challan identification for all three months (§16.7's TDS rows; the `.csi` match, AC-706.2) | The quarter is TENANT_SELF_FILES, with a report naming the missing months and deductees |
| Form 130 distribution | The certificate exactly as TRACES issued it (EV-048) | Nothing to distribute; nothing is generated in its place |
| Annual returns A-20, A-21 | The calendar year's required data | TENANT_SELF_FILES (AD-17) |
| Registers | Every entry from the tenant's first live day | Earlier periods stay the prior system's records; a register the product did not keep is never back-filled (the appointment-letter case is CR-37's) |
| Gratuity payout and F&F | Service start date, continuous-service day counts, YTD and leave balances (§16.7 flags these, it does not block on them) | Computed on the carried history, with an operator confirmation recorded |
| Statutory bonus | The accounting year's wages | Provisional under F-09 in any case |

#### From coverage lines to desk load

The coverage statements are the demand side of §22's capacity forecast (FR-OPS-031), so admission and desk capacity read the same numbers. For a due-date window *w*, the attended sessions are the lines in IN_SLA or SLA_PENDING_FIRST_SUBMISSION, in Mode B or C, whose instance falls in *w*, summed across tenants; the supervised minutes are those sessions weighted by `m_session` per family and mode (§22.7). Admission adds a prospect's lines to the forecast before its statement is issued; if any window would exceed capacity (FR-OPS-027), the prospect's first live month moves rather than being admitted into a breach. WE-1 adds up to two mid-month sessions to its window (ECR, and ESI once F-04 resolves, since post-lapse ESI instances are BLOCKED until then); WE-2 adds up to four (two of each) with under three times WE-1's headcount but twice its PF and ESI registrations — the registration count, not headcount, drives the load (EV-088).

#### Carve-out share, worked for WE-1 and WE-2

The carve-out share (§05.18, scope-health measures) is the most honest single number a coverage statement yields. It needs one counting rule before it can be computed for a real tenant.

**Counting rule.** Instances are counted by the month they fall due. Continuous records (registers) and event-driven lines (appointment letters, gratuity payouts) are not counted. A fenced line whose cadence is itself unknown — PT where `pt_calendar[state]` is unset, LWF where `lwf_schedule[state]` is unset — counts as one instance a month, in the numerator and the denominator alike. That is the upper bound, so an unknown can never make the share look smaller than it is. The share measures how far the SLA reaches, not how much work the product does: every carved-out line still gets its computation, and its deadline clock, worksheet or Mode A checklist wherever its fence's interim posture provides one (§05.18).

**WE-1, a month in which no quarterly or annual instance falls due, with every fence as it stands in September 2026.** The tenant's first live wage month is May 2027.

| Instance | Line state | Carved out? |
| --- | --- | --- |
| ECR, due the 15th | SLA_PENDING_FIRST_SUBMISSION, then IN_SLA | No |
| ESI, due the 15th — a post-lapse period | CARVED_OUT_FENCE (F-04) | Yes |
| TDS deposit | CARVED_OUT_FENCE (F-10) | Yes |
| Telangana PT — cadence unknown | CARVED_OUT_FENCE (`F-06[TS]`) | Yes |
| Telangana LWF — levy and cadence unknown | CARVED_OUT_FENCE (`F-07[TS]`) | Yes |

Carve-out share = 4 ÷ 5 = **80%**. In July 2027 the Form 138 Q1 statement also falls due (31 July, EV-049). It reads SLA_PENDING_FIRST_SUBMISSION, not carved out, so that month's share is 4 ÷ 6 ≈ 67%.

**WE-2, the same kind of month.**

| Instances | Count | Carved out | Why |
| --- | --- | --- | --- |
| ECR, entities X and Y | 2 | 0 | — |
| ESI, entities X and Y | 2 | 2 | F-04 |
| TDS deposit, two TANs | 2 | 2 | F-10 |
| PT — Telangana and Karnataka (rows unsourced); Maharashtra (return leg unsourced, periodicity assigned per registration) | 3 | 3 | `F-06[TS]`, `F-06[KA]`, `F-06[MH]` |
| LWF — three states, levy and cadence unknown | 3 | 3 | `F-07` per state |
| **Total** | **12** | **10** | Share = 10 ÷ 12 ≈ **83%** |

**What lowers it fastest.** F-10 is a desk read of one rule; F-04 waits on an authority's notification.

| Fences cleared | WE-1 | WE-2 |
| --- | --- | --- |
| None (as of September 2026) | 4 ÷ 5 = 80% | 10 ÷ 12 ≈ 83% |
| F-10 | 3 ÷ 5 = 60% | 8 ÷ 12 ≈ 67% |
| F-10 and F-04 | 2 ÷ 5 = 40% | 6 ÷ 12 = 50% |

What remains after both is state PT and LWF, which are cleared one state at a time (F-06, F-07). That is why a tenant's home state is the first question in the admission conversation (AD-05). It is also why §18 is asked whether price should reflect carve-out share (RT-08). The table is not a forecast — it shows what each fence is worth to a real tenant shape, which is what the fence review needs in order to rank desk work (§05.23, governance cadence).

#### Statements as evidence, and what they do not decide

A coverage statement version is the scope schedule of the tenant's SLA: a claim under the remedy §18.3 defines is judged against the version in force on the instance's due date (SS-5). Versions are therefore kept for as long as a claim on any instance they governed could be made; the retention class is §14.7's to assign and counsel's to confirm (CR-11). Statements are designed to carry registrations and obligations, never employee personal data, so the product's data-subject request tooling (§14.7) has nothing in them to act on; which employee rights apply at all is a counsel question (§23). Whether a tenant's price reflects its carve-out share — a tenant whose home state's PT and LWF are both fenced, for instance — is §18's decision; the statements supply the carve-out share per tenant for it (§05.18).

---

### 05.22 Deferred artefacts, parameter holds and routed items

Three lists keep "not now" from turning into "forgotten": the artefacts v1 deliberately does not produce, with what brings each back; the named parameters this section refuses to guess, with what the product does while each is unset; and the questions this section hands to another section's owner.

#### The deferred register — what re-enters, on what trigger

| Artefact | Why deferred | Re-entry trigger (observable) | Captured now, so re-entry is cheap | What the tenant sees meanwhile | Earliest release |
| --- | --- | --- | --- | --- | --- |
| A-06 ECR arrear return | No public layout (EV-043) | F-03 clears | Every arrears batch with its disbursal date and its PF liability month (§08) | An attended task on EPFO's own flow, with its due month | R3; v2 if uncleared by the R3 gate |
| A-13 Form 138 Q4, regular and correction | Formats unreleased (EV-046) | F-01 clears | Annexure II data, continuously, from every locked month | A carve-out notice with the deductor's deadline and exposure | R3 |
| A-16 PT, every state but Maharashtra's computation | Rows unsourced (EV-014, EV-015) | `F-06[state]` ships | The establishment's state and PT registration on the registration model | CARVED_OUT_FENCE; tenant-supplied figures allowed (TSF-1) | R2 per state; item 23 in v2 |
| A-17 LWF, every state | No LWF figure verified from a government source anywhere (EV-015) | `F-07[state]` ships | As A-16 | As A-16 | R2 per state; item 23 in v2 |
| A-24 FORM-XVII Part-III | Contractor surface is v2 | The v2 gate (DG-2a to DG-2d) | Own-roll/contract flag with contractor linkage (§05.19 seams) | Contract workers visible, no principal-employer return | v2 |
| A-25 Shram Suvidha work-order intimation | As A-24 | As A-24 | As A-24 | Nothing | v2 |
| A-26 Contractor half-yearly return | Not ours — a contractor's own return (r5/04) | Never, as our artefact | Contractor evidence slots in v2 | Nothing | — |
| A-27 Bonus annual return | Code-era return unconfirmed (§06.7) | F-09 clears | Provisional bonus computations with their operator-confirmed ceilings | The bonus line outside the SLA | R3, if cleared |
| A-28 Legacy 24Q corrections | Layout not in the evidence base (EV-052 names the stack only) | The legacy correction layout captured through the pipeline, and demand from a migrated tenant | The imported deductee rows of legacy quarters (§16.7) | The prior vendor or CA files | Not in v1 unless captured |
| Item 20b productised CA console | Channel unvalidated (§20 V-05) | V-05 passes | Written authorities that can name a CA organisation (§05.19 seams) | Thin console from R2 | v2 |

Re-entry is by change control (§05.23), never by date: the trigger opens a change request, the request names the release the artefact re-enters, and the P0 lint runs before it is approved.

#### Parameter holds — what the product does while each is unset

Each hold has exactly one behaviour, drawn from four: **BLOCK** (the computation or artefact halts with the hold as its named blocker), **REVIEW** (the result is held for an operator's review before it takes effect), **DECIDE** (an operator records a decision, with its source, for each case), **NONE** (no artefact reads it; it feeds models or planning only).

| ID | Parameter | Read by | While unset | Owner | Routed to |
| --- | --- | --- | --- | --- | --- |
| PH-01 | `gratuity.payable_ceiling` (alias `gratuity_ceiling`, PR-11) | Gratuity payout (C-17) | REVIEW above the legacy ₹20 lakh figure; never capped or paid silently | Statutory desk lead | §20; watch key in FR-RULE-006 |
| PH-02 | `esi_continuance_rule` | Any proposal to cease ESI after shrinkage | DECIDE — never auto-ceased | Statutory desk lead | §20 |
| PH-03 | `epf_continuance_rule` | Any proposal to cease EPF after shrinkage | DECIDE — never auto-ceased | Statutory desk lead | §20 |
| PH-04 | `epf_registration_window` | The 20-crossing registration task | NONE on artefacts; the task shows no statutory deadline and says why | Statutory desk lead | §20 |
| PH-05 | `iw_contribution_base_rule` | ECR lines for International Workers | BLOCK; admission rule AD-06 | Statutory desk lead | §20 — a desk memo against the EPF Scheme 2026 text |
| PH-06 | `iw_country_agreement_status` | IW withdrawal and advisory display | NONE on artefacts | Statutory desk lead | §20 |
| PH-07 | `pt_calendar[state]` | PT return due dates | BLOCK on-time judgement (SS-4) | Statutory desk lead | §20 V-09 |
| PH-08 | `lwf_schedule[state]` | LWF lines | BLOCK — the state stays fenced | Statutory desk lead | §20 V-09 |
| PH-09 | `maternity_benefit_base_rule` | Maternity pay (Example K) | DECIDE per case, with the source recorded; the month cannot LOCK without it (SF-12) | Statutory desk lead | §20 |
| PH-10 | `maternity_contribution_treatment` | ECR and ESI lines for months on paid maternity leave | DECIDE per month, recorded on the filing | Statutory desk lead | §20 |
| PH-11 | `esic_mc_template_version` | The ESI upload file | BLOCK — worksheet posture (F-05) | Filing desk lead | Captured with a design partner |
| PH-12 | `esi_post_cliff_payroll_posture` | Every payroll month with ESI periods after the saving lapses | BLOCK LOCK until set; PL-04 | Statutory desk lead, Legal lead | §20 V-08; §23 |
| PH-13 | `esi_cliff_straddle_rule` | The November 2026 wage month | BLOCK LOCK for ESI-covered establishments | Statutory desk lead | §20 V-08 |
| PH-14 | `bonus.annual_return_form`, `bonus.payment_deadline` | The bonus return; bonus payout scheduling | BLOCK the return (F-09); the deadline shown as unverified | Statutory desk lead | §20; §06.7 |
| PH-15 | `it.fvu_upload_signature` | The Form 138 upload step | NONE in Modes A and B; keeps Mode C off for the income-tax upload (§22.4.3) | Filing desk lead | §22; §20 |
| PH-16 | `q4_min_build_lead_days` | F-01's outcome table | NONE on artefacts; until set, any Q4 release takes F-01's worksheet row | Engineering lead | §20 |
| PH-17 | `clear_to_ship_days[fence]` | Release planning after a fence clears | NONE on artefacts | Engineering lead | Calibrated by the clear-to-ship measure (§05.18) |
| PH-18 | `sla_onboarding_lead_days` | SS-1 | BLOCK — no coverage statement can be issued, so R1X-04 cannot pass, until it is set | Filing desk lead | §20 |
| PH-19 | `tenant_action_lead[family]` | SS-3 miss attribution | BLOCK tenant-caused attribution: until set, every miss is classed product-caused | Filing desk lead | §20 |
| PH-20 | `hypercare_cycles` | Hypercare exit (H-6) | NONE on artefacts; tenants stay in hypercare until set | Filing desk lead | §20 |
| PH-21 | `design_partner_count_r1` | R1E-05 | NONE on artefacts | Product lead | §20 |
| PH-22 | `band_downgrade_months` | Commercial band hysteresis, if the §05.11 kill criterion fires | NONE — no hysteresis until needed | GTM lead | §20 |
| PH-23 | `supervised_cost_per_registration_cycle` | Unit economics (§05.1) | NONE on artefacts | Filing desk lead | §20; sized in §22.7, priced in §13 |
| PH-24 | `beachhead_sub20_share` | The denominator's upper case (§05.16) | NONE | GTM lead | §20; §04.3 |
| PH-25 | `desk_sourcing_slots_per_review` | How many queue items an operating review may start (QR-5, §05.18) | NONE on artefacts; the review starts what its leads commit to and records the number, which calibrates the parameter | Statutory desk lead | §20; calibrated as `clear_to_ship_days` is |
| PH-26 | `partner_evidence_min_redundancy` | R1E-05's reading of the design-partner coverage table (PW-6) | NONE — one partner per evidence cell is enough, and the single-source risk is recorded on the gate record | Product lead | §20 |

PH-18 and PH-19 are set before the first invoice, and PH-19's unset behaviour is chosen to fail against us: were it ever unset, every miss would be classed product-caused. An unset parameter is never allowed to shift a risk onto the tenant.

#### Which holds must be set before which gate

The table above says what the product does while a hold is unset. The desk also needs to know by when each hold must be set, because a hold that blocks a gate is desk work with a deadline, while a hold that blocks nothing waits for evidence. Each hold appears once, against the earliest event that needs it.

| Must be set before | Holds | Why then |
| --- | --- | --- |
| R1E-05, design-partner coverage | PH-21 | The coverage table needs a partner count |
| The first coverage statement, R1X-04 | PH-18 | SS-1 cannot be evaluated without it |
| The first invoice | PH-12, PH-19 | PL-04 needs PH-12. PH-19 is set so that tenant-caused misses are classed from the first cycle rather than defaulting to product-caused |
| The first LOCK of wage month November 2026 at an ESI-covered establishment | PH-13 | The straddle month cannot LOCK without it |
| The first tenant's exit from hypercare | PH-20 | H-6 reads it |
| Admission of any establishment with an International Worker | PH-05 | AD-06 |
| The LOCK of any month with an employee on paid maternity leave | PH-09, PH-10 — a decision per case, not a global value | SF-12 |
| A state's PT return entering IN_SLA | PH-07 for that state | SS-4 |
| A state's LWF line leaving CARVED_OUT_FENCE | PH-08 for that state | F-07 |
| The ESI upload file shipping | PH-11 | F-05 |
| The bonus return shipping | PH-14 | F-09 |
| Mode C on the income-tax upload | PH-15 | §22.4.3 |
| Planning a Q4 build once F-01 signals | PH-16 | F-01's outcome table reads it |
| Nothing — these holds change no artefact while unset | PH-01 (a REVIEW hold), PH-02, PH-03 (DECIDE per case), PH-04, PH-06, PH-17, PH-22, PH-23, PH-24, PH-25, PH-26 | They feed planning, models, queue capacity or per-case operator decisions |

Four holds are therefore on R1's own path — PH-12, PH-18, PH-19 and PH-21 — and a fifth, PH-13, falls on the path of any design partner whose first live month is November 2026 or earlier. Each is desk work, like F-10 and F-12: none may reach its gate unset.

#### Items this section routes to other owners

| # | Item | Routed to | Why it cannot be settled here |
| --- | --- | --- | --- |
| RT-01 | Relabel FR-PAY-903, FR-PAY-705, FR-PAY-704 and FR-PAY-105 per PR-01, PR-02, PR-03 and PR-05 | §08 owner | Their requirement text is §08's |
| RT-02 | Relabel "P0 · fenced" as "R2 · F-08" (PR-06) | §22 owner | As above |
| RT-03 | Align the operator-attended mode's letter with §22 FR-OPS-001 (PR-10) | §23 owner | As above |
| RT-04 | Confirm Tally GL export at R2, P1 (PR-13) | §16 owner | §16.13 carries it at P0 |
| RT-05 | Define "payroll-run reliability" — numerator, denominator, source — so DG-3d can be evaluated | §19 owner | Metric definitions are §19's |
| RT-06 | Specify the export file format and manifest for C-52 | §14 and §16 owners | Schema and integration formats are theirs |
| RT-07 | Assign a retention class to coverage-statement versions and the fence register | §14 owner; counsel (CR-11) | Retention classes are §14's; periods are counsel's |
| RT-08 | Decide whether a sub-20 tenant with a live EPF obligation stays on the File tier, and whether price reflects carve-out share | §18 owner | Pricing |
| RT-09 | Register the migration-seasonality hypothesis (GL-5) as a commercial-validation item with a kill criterion | §20 owner | The validation plan is §20's |
| RT-10 | Register the ≥3-same-size-references question for the 200–999 gate (§05.3) | §20 owner | As above |
| RT-11 | Register every PH item above that says "§20" as a build-blocking desk item or a planning parameter, with owner and elapsed time | §20 owner | As above |
| RT-12 | Confirm the adequacy of each PH-12 posture and the PH-13 straddle options | Counsel via §23; §20 V-08 | A legal question |
| RT-13 | Confirm whether bank-account collection in employment engages SPDI r.5(1), and who owes it (C-04, item 35) | Counsel via §23 (CR-04, CR-22) | A legal question |
| RT-14 | Add `Fence`, `ParameterHold`, `CoverageStatement`, `CoverageLine`, the artefact-family readiness record (§05.20) and the tenant lifecycle state to the entity catalogue, with their bitemporal class | §14 owner | The schema is §14's; §05.19 fixes only that they are runtime records |
| RT-15 | Relabel BEN-13, BEN-34, BEN-38 and BEN-41 as "R2 · C-38", and record in FR-PAY-106 the R1 posture of operator-entered perquisite values with their source (PR-15) | §11 owner; §08 owner | Their requirement text is theirs |

---

### 05.23 Scope change control

This plan will change often, and it is meant to: fences clear, the §20 programme reports, cohorts graduate or do not. What must not change is the way it changes. Every change to a ledger row's priority, release or blockers, to a band verdict, or to an admission rule goes through one procedure, and a small set of requests is refused on sight.

#### Change classes

| Class | What it covers | Evidence required | Approvers | Re-run after approval |
| --- | --- | --- | --- | --- |
| SC-A · Fence-driven | A fence clears, reopens, or clears with an outcome that forces rework (§05.18) | The fence record's transition (FL5, FL6, FL9) and the outcome-table row that applies | Product lead, the fence's owner | Lint; the affected release's gate checks; coverage recomputation |
| SC-B · Evidence-driven re-prioritisation | A §20 item reports against its kill criterion — for example V-01 re-ordering §05.5 (§05.12) | The §20 item's recorded result | Product lead, Founder | Lint; the module table |
| SC-C · Band verdict | A band's verdict or an admission bound moves — for example the floor rising to 50 (§05.1) | The cohort evidence from `band_history` (§05.11) | Founder, GTM lead | AD rules; coverage statements |
| SC-D · New scope row | A capability, artefact or seam found missing (C-52 was one) | The requirement it serves and its acceptance reference | Product lead, the row's owner | Lint L4 and L6 |
| SC-E · Release move | A row moves between releases — C-12 to R2, A-06 to v2 | The rule, fence or evidence that forces it | Product lead | Lint L1 to L3 and L8 |
| SC-F · Deferral and re-entry | An artefact leaves or re-enters v1 (§05.22) | The re-entry trigger, or the reason for deferral | Product lead, the row's owner | Lint |
| SC-G · Cross-section ruling | A PR-row ruling (§05.17) | Both sections' requirement texts | Product lead and both section owners | — |
| SC-H · Customer request | Any tenant or prospect asking for scope | Treated as demand input to SC-A, SC-B or SC-F; never sufficient on its own | — | — |

#### The change request's lifecycle

| # | From → To | Event | Guard | Side effect | Who may trigger |
| --- | --- | --- | --- | --- | --- |
| SC1 | *(none)* → PROPOSED | Raised | Class and evidence named | `SCR-###` assigned | Any row owner |
| SC2 | PROPOSED → ASSESSED | Impact analysed | Every affected row, release, fence, coverage line and gate check listed | Impact attached | Product lead |
| SC3 | ASSESSED → REJECTED | Evidence insufficient for the class | Reason recorded | — | The class's approvers |
| SC4 | ASSESSED → APPROVED | Approvers sign | The lint passes on the proposed state; no affected release is in GATE_REVIEW | — | The class's approvers |
| SC5 | APPROVED → APPLIED | Ledger updated | — | Rows re-tagged; RS6 on each affected release; notices wherever a coverage line changes | Product lead |
| SC6 | APPLIED → VERIFIED | Post-change checks | Lint, coverage recomputation and every affected gate check re-run clean | Closed | Product lead |
| SC7 | APPLIED → REVERTED | Verification fails | — | The prior ledger state restored; the failure recorded | Product lead |
| SC8 | PROPOSED, ASSESSED or APPROVED → WITHDRAWN | The proposer withdraws | Not yet APPLIED | — | Proposer |

#### Standing refusals

These are refused at SC1, with the rule cited, and never reach assessment:

- Promote a row to P0 outside R1 (L1), or give a fenced leg any priority label (L2, L5).
- Open a deferred band on a date rather than on its DG checks (§05.3).
- Admit a state's PT or LWF on aggregator data, or on a draft row still in DRAFTING (F-06, F-07; AC-RULE-002.3).
- Set a coverage line's state by hand (§05.21).
- Close a fence by relabelling instead of by its clear condition (FL6).
- Pass a gate "with exceptions" on a P0 row (RS4).
- Change a scope record while a release it affects is in GATE_REVIEW.
- Accept a customer's request as the evidence for a change (SC-H).

#### Changing a release that is already IN_BUILD

RS1 freezes a release's scope and RS2 starts the build on it, but the section's own history shows scope arriving mid-build — C-52 was found missing while R1 was being written (Trace 8), and §05.18 specifies what happens when a fence opens on an R1 row. The rule below separates the two legitimate reasons for a release to grow from the one that would make the freeze meaningless, so that "we found something" and "a customer asked" never receive the same answer.

| ID | Rule |
| --- | --- |
| IB-1 | A release in IN_BUILD may gain a row only where (a) the row is already required by the acceptance of a capability in that release — it was missing, not new scope — or (b) a statutory event makes it unavoidable for the tenants that release will serve. Everything else is tagged to a later release, whatever its merit |
| IB-2 | Every addition re-runs the lint (L1 to L8) and the cross-register invariants (§05.17) before SC4. The release's *entry* checks are not re-run — entry was passed on the frozen scope — with one exception: R1E-06, which reads the lint, is re-evaluated |
| IB-3 | An addition that changes an artefact family's boundary re-versions every coverage statement naming that family, with notices, before the next due date it affects (§05.21). A release may not grow silently on a live tenant |
| IB-4 | The gate record lists every row added after RS2, so the gate can see how far the release drifted from the scope it entered on. A release that grew by more than the review can account for is a finding about the freeze, not about the rows |

| The proposed change, while the release is IN_BUILD | Allowed | Class | What it triggers |
| --- | --- | --- | --- |
| Add a row an existing P0 capability's acceptance already requires (C-52's case) | Yes, under IB-1(a) | SC-D | Lint L4 and L6; invariants SI-06 and SI-09; no RS6 where no gate has yet convened |
| Add a row a statutory event makes unavoidable — a computation payroll cannot run without (§05.18's new-fence table, fourth row) | Yes, under IB-1(b) | SC-A | RS6, and the fence's outcome table written before the affected tenants' next LOCK |
| Add a capability nothing in the release requires, because a prospect asked for it in a demo | No | SC-H | Demand recorded; the row is tagged R2 or later |
| Move a fenced leg out of the release | Yes | SC-E | Lint L1 to L3; its coverage lines already read CARVED_OUT_FENCE, so no line changes state |
| Move out a computation every tenant needs | No | — | §05.18: no rescope removes a computation payroll cannot run without |
| Move the ECR out of R1 | No | — | AD-18 would then admit no tenant at all (TS-05-44); R1 stays IN_BUILD instead |
| Re-tag rows while the release sits in GATE_REVIEW | No | — | SC4's guard, and a standing refusal above |
| Add a row to meet a date | No | — | Releases are gated on evidence, not dates (§05.7); adding scope has never made a date |

The asymmetry is deliberate and worth stating plainly: **a release in build can absorb work it already owed, and cannot absorb work it merely wants.** The first is bookkeeping — the capability was accepted, the row was missing, the invariants would have caught it. The second is the drift that turns an evidence-gated release into a date-driven one, which is the failure mode §05.20's release states exist to prevent.

#### Answering a scope request — the triage table

Customers and prospects ask for scope in their own words. Class SC-H makes such a request demand, never evidence. This table gives the answer and the record the demand is logged against, so the answer is the same whoever in the company is asked. Every answer cites the rule that decides it and restates none of it.

| The request, as it is usually put | The answer | Decided by | Demand logged against |
| --- | --- | --- | --- |
| "File our PT in [a state we have not sourced]" | Not offered yet. The tenant may enter its own figure, labelled as its own (TSF-1), and the deadline stays visible | `F-06[state]`; AD-05 | `F-06[state]`, which moves the state up the sourcing queue |
| "Generate Form 16 for our employees" | Form 130 (ex-Form 16) is valid only if TRACES generates it. The product prepares the data and distributes the certificate | EV-048; C-15 | — |
| "Submit our returns for us" | Employer-attended and co-attended submission now; operator-attended submission per portal only once counsel clears it. In every mode the statutory liability stays with the employer | `F-08[portal]`; §22 | `F-08[portal]` |
| "Handle this month's PF arrears" | Arrears are computed with the PF liability dated from the disbursal date. The arrear return is an attended task on EPFO's own flow until its layout is obtained | F-03; FR-PAY-401 | F-03 |
| "We have 250 employees" — a new prospect before the v2 gate | Not sold; recorded as a v2 lead | AD-04 | DG-2a to DG-2d |
| "Run PF for our contract workers and the principal-employer return" | Contract workers are stored, linked to their contractor and kept out of own-roll counts. Contractor filing is v2 | A-24, A-25; AD-13 | The v2 gate |
| "Verify our employees' Aadhaar for us" | A multi-tenant verification feature cannot be built (EV-070) | EV-070; §23 | — |
| "Make biometric attendance compulsory" or "no Aadhaar, no payroll" | No configuration can make either a condition of employment or pay | Part D-10; CR-10; AD-11 | — |
| "Let the assistant work out our PF" | The assistant never computes a statutory figure | §12; R1E-02 | — |
| "Search job-board databases for candidates" | Inbound-only | §05.13 | — |
| "Host it on our own servers" | Only as a priced compliance SKU for named regulated accounts, in Vision | Item 28 | DG-4a to DG-4d |
| "Give us Form 138 Q4 early, so we are ready" | The Q4 format is unreleased and nothing is guessed. The prepared annual data is available as a worksheet under F-01's second outcome row | F-01; the F-01 store (§05.18) | — |
| "Give us Form 123 statements this year" | Waits for F-12, a desk read; perquisites are carried with their source meanwhile | F-12; PR-15 | F-12 |

#### Governance cadence

| Forum | Cadence | Reads | Decides |
| --- | --- | --- | --- |
| Fence review | Weekly | Fence ages, stale checks, approaching statutory dates (§05.18) | Escalations |
| Change-control review | Fortnightly, and whenever a fence clears | Open change requests | SC3 or SC4 |
| Operating review | Monthly | Scope-health measures, carve-out share, unmet demand per hold | Which desk memo or state pack to prioritise |
| Deferred-band evaluation | Quarterly, and on any qualified opportunity in a deferred band | The DG checks (§05.3) | Whether any band's gate is open |
| Gate review | When a release reaches RS3 | The gate record (§05.20) | PASS or FAIL |

#### Worked change traces — the machinery, end to end

Each trace follows one event through the fence register, the ledger, the releases, the coverage statements and the SLA, naming the transition at each step. They are specifications by example, not forecasts.

**Trace 1 — the ESI successor redefines the contribution base (F-04, third outcome).**

1. The watcher fires on the ESIC or MoLE notification; F-04 moves OPEN → SIGNALLED → VERIFYING (FL2, FL4).
2. Impact analysis (FR-RULE-009) shows a base redefinition, not a rate change: the rule version cannot publish until WP-11 changes.
3. SCR raised, class SC-A: A-09 and C-46 move from R2 to a fast-follow; RS6 on R2; the lint passes because neither row is P0.
4. Coverage lines for post-lapse ESI periods were already CARVED_OUT_FENCE; they stay so, and every affected tenant's notice is re-issued naming the new expected path.
5. When the code and the version are certified and published, F-04 moves to CLEARED, then IMPLEMENTING (FL6, FL7); affected months are corrected as diffs (FR-PAY-306).
6. On the first accepted post-lapse upload, F-04 is SHIPPED (FL8); lines move to IN_SLA subject to SS-1; V1X-04 becomes evaluable.

**Trace 2 — CBDT releases the Form 138 Q4 regular format.**

1. The Q4 watch key fires (FR-RULE-006); F-01 moves to SIGNALLED, then VERIFYING once the published layout is captured and hashed.
2. The format version is authored, reviewed and published; F-01 is CLEARED (FL6).
3. PH-16 is read: the release leaves at least `q4_min_build_lead_days` before 31 May 2027, so F-01's first outcome row applies; the on-clear work (§05.18) starts.
4. C-48 is built; FVU passes on the published sample and on real data.
5. The first real Q4 submission is accepted: PL-01 for the Q4 leg, F-01 SHIPPED for the regular leg; every tenant's Q4 line moves from CARVED_OUT_FENCE to IN_SLA; R3E-02 is recorded as met by release, not by carve-out.
6. The correction format is still unpublished, so `F-01` stays open for that leg alone (F-01's fourth row).

**Trace 3 — counsel clears operator-attended submission for EPFO, but not for the income-tax upload.**

1. CR-17a, b, d, e and f are recorded favourable for EPFO; CR-17c is recorded unfavourable (FR-LEG-040).
2. `F-08[EPFO]` moves to CLEARED; `F-08[income-tax]` returns to OPEN with the answer attached (FL5).
3. SCR raised, class SC-A: A-23 is split into per-portal rows; the EPFO row keeps R2; the income-tax row stays fenced.
4. The on-clear work for EPFO runs — vault switched on, operator certification, the authority instrument; the first Mode C session on EPFO completes and `F-08[EPFO]` is SHIPPED.
5. Tenants who choose Mode C for EPFO get it on their next statement version; every income-tax line stays in Modes A and B; R2X-02 is met by the EPFO portal.

**Trace 4 — Karnataka's amending notification is retrieved.**

1. The capture completes the citation EV-014 was missing; `F-06[KA]`'s draft can now leave DRAFTING (AC-RULE-002.3).
2. The state pack (FR-RULE-017) is reviewed and published; `F-06[KA]` is CLEARED, then IMPLEMENTING.
3. WE-2's tenant's Karnataka PT computes from its next unlocked month (TSF-4); the months carrying tenant-supplied figures are shown against the published rule as a diff for the tenant to decide on.
4. Once the Karnataka return leg is also sourced and its first real return is receipted, `F-06[KA]` is SHIPPED and the tenant's Karnataka PT lines move to IN_SLA under SS-1.

**Trace 5 — a design partner asks for Karnataka PT in R1, before Trace 4.**

1. The request is class SC-H: it is demand, not evidence.
2. It is refused as a scope change at SC1, citing the standing refusal on unsourced states.
3. It is recorded as demand against `F-06[KA]`, which moves Karnataka up the desk's sourcing queue (the F-06 table's third row) — the one legitimate effect a customer request has.

**Trace 6 — the 20–49 cohort does not graduate.**

1. At month 18, `band_history` shows fewer than 25% of 20–49 lands crossing into 50 or more within 12 months — the §05.1 kill criterion.
2. SCR raised, class SC-C: AD-02's lower bound moves to 50; 20–49 prospects are admitted to the Free tier under AD-01's rules.
3. Existing 20–49 tenants keep their contracts and coverage; no statement is downgraded by the change alone (§05.4's v2 table applies the same rule).
4. §05.12's response runs: paid acquisition of 20–49 stops; the revenue plan is re-based on 50–199.

**Trace 7 — the desk memo sets PH-05.**

1. The International Worker contribution base is read against the EPF Scheme 2026 text and published as a rule version.
2. AD-06 no longer applies; WE-3's tenant moves WAITLISTED → PROSPECT (TO4) and is told.
3. Its admission runs from TO5; SF-07's fixture value is checked to be absent from every production pack (§05.20).

**Trace 8 — a missing R1 capability is found (C-52, in this PRD).**

1. The gap — no section specified a record export at contract end — is raised as class SC-D.
2. Lint L4 requires an owner and an acceptance reference; both are supplied (§05.17).
3. The row is added as P0, R1; since no R1 gate has convened, no release needs RS6.
4. The export format is routed to §14 and §16 (RT-06).

**Trace 9 — EPFO announces an ECR layout change from a future wage month while R1 is IN_BUILD, and the specification cannot yet be retrieved.** The event is hypothetical; the revamped ECR's beta status (r5/02 finding 15) is why the watcher is set for it.

1. The watch key on EPFO's revamped-ECR page fires (FL2). The circular names the wage month but its specification link is dead, so BC-1 fails for months from that date (§05.7, re-fence triggers).
2. A new fence is registered as the next F-number, class authority-format (FL1). The A-01 row splits by period: the existing row keeps earlier months and its P0, and the new row carries the fence (§05.18, a fence that lands on an R1 row).
3. If the fenced months include wage months a design partner will run, R1 cannot re-tag the ECR away: a change request to do so is refused (TS-05-44), and R1 stays IN_BUILD. Otherwise R1 proceeds, and the new row is tagged to whichever release follows the fence's clearing.
4. When the specification is published, the fence moves through FL4 and FL6. The new format version is certified with its fixtures, and the family record moves to VERSION_PENDING (AF5) — or, if the family has not yet reached PL01_PASSED, the new version simply becomes the one its first submission uses.
5. Each tenant's first ECR on the new version runs in Mode B, counted in the capacity forecast. Its acceptance moves the family back to PL01_PASSED (AF6), and no tenant's ECR line left IN_SLA at any point.

**Trace 10 — the desk reads Form 123.**

1. The statutory analyst reads CBDT's Form 123 guidance and the form's text in the Income-tax Rules 2026. F-12 moves SIGNALLED → VERIFYING → CLEARED once the layout is published as a format version (FL2, FL4, FL6).
2. The on-clear work starts: the writer, and the tie-out of the statement's totals to the Tax Year's perquisite valuation output (§11.17). C-53 is built for R3.
3. The family record moves NOT_BUILT → BUILT (AF2). Form 123 is issued, not filed, so AF4's evidence is a render of a design partner's statements reviewed against the published form.
4. The issue date the reading establishes becomes a calendar rule row. Until C-53 ships, each tenant's Form 123 line reads CARVED_OUT_FENCE with its notice and the deadline visible. R3's gate, however, reads FAIL while F-12 is open: desk work is never declared away at a gate (§05.18, ageing table).

---

### 05.24 Test scenarios for this section

These scenarios test the scope machinery itself: the ledger and its lint, the fence register, the release states, admission and the coverage statement, band classification, the tenant lifecycle and change control. They do not test statutory computation. §06.14's golden vectors and §08's acceptance criteria own that. Every scenario runs on seeded records in a non-production environment against the certified rule pack, under the same rule as the seeded fixtures (§05.20): no scenario ever touches a production portal. A scenario passes only when every clause in its "Then" column holds. Most scenarios are negative cases, because the section's rules exist to refuse things.

#### Ledger and lint

| ID | Given | When | Then | Traces to |
| --- | --- | --- | --- | --- |
| TS-05-01 | A ledger row with `priority` P0 and `release` R2 | The change is saved | Refused under L1; the message names the row and its release | L1; §05.5 |
| TS-05-02 | C-12 at P0, R1, with F-05's capture task in `depends_on`, and the R1 gate convening with the capture undone | F-05 is added to `blocker_ids` | Refused under L2 in any version of the row that holds both P0 and F-05. The only accepted change request clears the P0 label and re-tags the row to R2 in the same change (SC-E) | L2; §05.17 C-12 note |
| TS-05-03 | A row labelled "P0 · fenced", "P0-arch" or "P1→P2" | The change is saved | Refused under L5; the message quotes the label found and asks for the row to be split | L5; PR-06 to PR-08 |
| TS-05-04 | A P0 row with `owner_role` set and `acceptance_ref` empty | The change is saved | Refused under L4; the message names the missing field | L4 |
| TS-05-05 | A row tagged R2 with empty `blocker_ids` and no `depends_on` | The change is saved | Refused under L3: nothing is deferred without a stated reason | L3 |
| TS-05-06 | An R1 row whose `depends_on` names an R2 row | The change is saved | Refused under L8 | L8 |
| TS-05-07 | Artefact row A-18 tagged R1 with its capability mapping removed | The lint runs | Fails under L6, naming A-18 as the orphan | L6 |
| TS-05-08 | A row whose only blocker is F-03, and F-03 moves to CLEARED | The next change-control review convenes | The row is flagged under L7 on that review's agenda. Its release tag has not moved by itself: only an approved change request moves it | L7; §05.23 SC-A |

#### Fences

| ID | Given | When | Then | Traces to |
| --- | --- | --- | --- | --- |
| TS-05-09 | A new fence record with `watch_ref` empty | FL1 is attempted | Refused: a fence with no watch key, capture task or counsel item is not registered | §05.18 fence record |
| TS-05-10 | `F-06[KA]` OPEN, with a Karnataka establishment's PT line CARVED_OUT_FENCE | A watch key fires on a draft instrument (FL2), and the analyst records it as not the awaited source (FL3) | No filing instance leaves BLOCKED and no coverage line changes state during SIGNALLED. After FL3 the reason is stored and `last_checked_at` is updated | FL2, FL3; AC-RULE-006.1 |
| TS-05-11 | `F-08[EPFO]` and `F-08[income-tax]` both OPEN | CR-17a, b, d, e and f are recorded favourable for EPFO, and CR-17c is recorded unfavourable | `F-08[EPFO]` moves to CLEARED. `F-08[income-tax]` returns to OPEN with the answer attached. No income-tax line on any statement carries Mode C | FL5, FL6; §05.23 Trace 3 |
| TS-05-12 | F-04 SHIPPED, with lines IN_SLA under the successor version | A corrigendum withdraws the successor | FL9 fires: the pack rolls back and affected instances return to BLOCKED. Lines revert with a notice before the next due date. An instance already due stays judged under the version in force on its due date | FL9, FL10; SS-5 |
| TS-05-13 | F-05 (desk-capture) still OPEN | The R1 gate convenes | The gate check that needs the upload file reads FAIL. It is not converted into a carve-out | §05.18 ageing table |
| TS-05-14 | F-03 OPEN, with no arrear layout published | A user sets F-03 to SHIPPED directly | Refused: a fence closes only through its clear condition (FL6), never by relabelling | Standing refusals, §05.23 |

#### Releases and gates

| ID | Given | When | Then | Traces to |
| --- | --- | --- | --- | --- |
| TS-05-15 | R1 in GATE_REVIEW with every exit check PASS, and A-13 missing from the coverage statements' carve-out notices | RS4 is attempted | Refused. The gate record's `decision` is FAIL and `fences_declared` names A-13. There is no third value | RS4; §05.20 gate record |
| TS-05-16 | R1 in GATE_REVIEW with one open D1 defect, and a signatory dissenting on it | The gate record is written | `decision` is FAIL. The dissent is stored with its reason, and the D1 count appears in `open_defects` | Defect classes; gate record |

#### Admission and the coverage statement — WP-24's exit test

| ID | Given | When | Then | Traces to |
| --- | --- | --- | --- | --- |
| TS-05-17 | WE-3's tenant: 45 own-roll, one Haryana establishment, one International Worker, PH-05 unset | Admission is evaluated | EPF lines read NOT_OFFERED and cite PH-05. AD-18 fails, so the File tier is refused and the Free tier is offered with the reason named. Demand is recorded against PH-05. Haryana PT reads CARVED_OUT_FENCE, never NOT_APPLICABLE | AD-06, AD-18; WE-3 |
| TS-05-18 | WE-2's tenant, `F-06[KA]` open, and the tenant enters ₹200 per Karnataka employee for April | The April run is processed and locked, and later `F-06[KA]` ships | The payslip, register and approval artefact label the figure "tenant-supplied". No product-generated artefact carries it, and the Karnataka PT return line stays CARVED_OUT_FENCE. Once the pack ships, computation starts from the next unlocked month, and April is shown as a diff for the tenant to decide on, never corrected silently | AD-05; TSF-1 to TSF-4 |
| TS-05-19 | A Free-tier tenant at 18 own-roll | It requests attended submission | Refused under AD-01. Artefacts stay in Mode A, and the File tier's conversion at 20 is shown | AD-01; §05.21 negative cases |
| TS-05-20 | A Free-tier tenant with an establishment in a state whose PT row is unpublished, and a second establishment in a state whose sourced row says "no levy" | Lines are computed | The first PT line reads CARVED_OUT_FENCE, because order rule 3 precedes rule 5. The second reads NOT_APPLICABLE and raises no obligation | Line-state order; Example I |
| TS-05-21 | One tenant's inputs frozen: registrations, tier, release in force, fence register and parameter holds | The statement is computed twice, and again a day later with no input changed | The three results are identical line for line. No new version is issued, because no trigger fired | §05.21 state computation |
| TS-05-22 | A line CARVED_OUT_FENCE on `F-06[MH]` for the return leg | An operator tries to set it to IN_SLA by hand | Refused. The only path is an input change — here the fence shipping — which issues a new version with its trigger, its `lines_changed[]` and a notice. The prior version stays unchanged | "No state is ever set by hand"; FL8 |
| TS-05-23 | PH-18 set, and a tenant admitted on the 14th of a month whose ECR falls due on the 15th | The statement is issued | That ECR instance falls outside the SLA under SS-1, and its notice says so. With PH-18 unset, no statement can be issued at all, and R1X-04 cannot pass | SS-1; PH-18 |
| TS-05-24 | A prospect whose first live wage month is December 2026, with ESI-covered employees and PH-12 unset | Go-live is requested | Refused under AD-08 and PL-04. With PH-12 set, a November 2026 month for an ESI-covered establishment still cannot reach LOCKED until PH-13 is set | AD-08; PH-12, PH-13; §05.21 negative cases |

#### Bands, obligations and attribution

| ID | Given | When | Then | Traces to |
| --- | --- | --- | --- | --- |
| TS-05-25 | 19 own-roll on the last day of a LOCKED month, and 21 on the 10th | The month locks | `commercial_band` is 10–19. EPF is evaluated on its own rule and may open regardless of the band. One append-only row is added to `band_history`, and a later retro run does not rewrite it | Band classification; edge-case table |
| TS-05-26 | A tenant at 22 with EPF active falls to 18 for three LOCKED months | The obligation engine runs | EPF stays active and no cessation is proposed. The coverage statement keeps the EPF line. Cessation happens only when an operator records it against PH-03 | PH-03; §05.11 downward transition |
| TS-05-27 | 40 own-roll workers and 40 contract workers linked to a contractor | Own-roll thresholds are evaluated | No own-roll obligation is tripped by the contract cohort, and the cohort is visibly distinct in the master | Example J; AD-13 |
| TS-05-28 | PH-19 unset, and a miss where the tenant funded the remittance late | The miss is classified | It is classed product-caused. An unset parameter never shifts a risk onto the tenant | PH-19; SS-3 |
| TS-05-29 | A product-caused miss on the ECR family | The hold trigger fires | The release enters HELD for the ECR family (RS8), and new-tenant intake for that family stops. Every existing tenant's next ECR instance still has its Mode A artefact and checklist | RS8; release holds; FR-OPS-028 |

#### Tenant lifecycle and change control

| ID | Given | When | Then | Traces to |
| --- | --- | --- | --- | --- |
| TS-05-30 | A CONTRACTED tenant whose consent flow has not run | The import is started | Refused by TO8's guard. Once the flow has run, bank-account fields load only for employees whose status allows it | TO7, TO8; item 35 |
| TS-05-31 | A tenant in NOTICE_GIVEN | Erasure is requested before the C-52 export is acknowledged, and again while a rule-set retention clock is running | Both requests are refused. TO14 precedes TO15, and TO17 needs every retention clock expired and no legal hold | TO14 to TO17; C-52 |
| TS-05-32 | A design partner asks for Karnataka PT in R1 while `F-06[KA]` is open | A scope change is raised | Refused at SC1 as class SC-H. The request is recorded as demand against `F-06[KA]` | Standing refusals; §05.23 Trace 5 |
| TS-05-33 | R2 in GATE_REVIEW | A change request touching an R2 row reaches SC4 | Approval is refused by SC4's guard until the gate closes | SC4; standing refusals |
| TS-05-34 | The 200–999 band with DG-2a, DG-2b and DG-2d PASS and DG-2c FAIL | The quarterly evaluation runs | The band stays closed, because the gate is conjunctive. A request to open it on a date is refused at SC1 | §05.3 gate records; standing refusals |
| TS-05-35 | The ECR family has passed PL-01 and Form 138 has not, with PL-02 to PL-05 passed | The first invoice is raised, and later the first real Form 138 quarterly submission is receipted | The invoice is permitted, with every Form 138 line SLA_PENDING_FIRST_SUBMISSION. On the receipt, every tenant's Form 138 lines re-version to IN_SLA, subject to SS-1 | §05.20 decision O2; §05.21 triggers |
| TS-05-36 | SF-07's fixture tenant, with its test value for PH-05 | A production rule pack is assembled for publication | The pack fails certification if the fixture value appears in it | SF-07; §05.23 Trace 7 |

#### Buildability, family readiness, the rule pack and interim postures

| ID | Given | When | Then | Traces to |
| --- | --- | --- | --- | --- |
| TS-05-37 | Artefact row A-29, with no published Form 123 layout | The buildability test runs | The status derives as Fenced at order 3 (BC-1), and the fence is F-12, class desk-read. At R3's gate an open F-12 reads FAIL, not a carve-out | BC-1; §05.18 ageing table |
| TS-05-38 | A-12, with FVU validation on real data passed and Tax Year 2026-27 correction filing not enabled | The buildability test runs | Buildable now at order 5: generation ships and submission is held on F-02. No priority label changes | BC-2; F-02 |
| TS-05-39 | The ECR family at PL01_PASSED, and EPFO publishes a breaking layout version for a later wage month | The version is certified | The family moves to VERSION_PENDING. Every tenant's ECR line stays IN_SLA. Each tenant's first instance on the new version is flagged for Mode B and appears in the capacity forecast. Earlier wage months still generate on the prior version | AF5; SF-13; FR-PAY-711 F4 |
| TS-05-40 | The ECR family at VERSION_PENDING, and a tenant's first submission on the new version is rejected for a generator defect | The rejection is recorded | A D2 defect opens and the family moves to SUSPENDED. RS8 holds new intake for the ECR family. The tenant's next instance runs in Mode B, and the miss is classed product-caused | AF7; RS8 |
| TS-05-41 | The Form 138 family with FVU passed on real data and no quarterly due date yet reached | A gate asks whether Form 138 is inside the SLA | The family is AUTHORITY_VALIDATED, not PL01_PASSED, and every Form 138 line reads SLA_PENDING_FIRST_SUBMISSION | AF3, AF4; decision O2 |
| TS-05-42 | RP-12, the Maharashtra PT slab, still in REVIEW | R1E-01 is evaluated | R1E-01 fails, naming RP-12, and R1 stays PLANNED | The R1 rule pack |
| TS-05-43 | RP-08 not certified for Tax Year 2026-27; later, a design partner's first April LOCK with the new Tax Year's values unpublished | R1E-01 is evaluated; later, the April month is locked | R1E-01 fails, naming RP-08 — TDS is not fenced and no line is carved out, because the read is ours to do. The April LOCK halts on the named parameter and never uses the prior year's values | RP-08; BC-1; §05.15 |
| TS-05-44 | A new fence registered on A-01 while R1 is IN_BUILD | A change request re-tags A-01 to R2 | Refused: with the ECR outside R1, AD-18 would admit no tenant. R1 stays IN_BUILD until the fence's outcome table is written | §05.18, new fence on an R1 row; AD-18 |
| TS-05-45 | F-05 open, and the portal's summary after keying differs from the worksheet total by one rupee | The payment step opens | An SA-REC reconciling item blocks payment initiation and names the difference | SF-14; F-05 worksheet |
| TS-05-46 | A deductee with salary in May 2027 and no row in the annual store at May's LOCK | The completeness check runs | A D4 evidence defect names the deductee and the month. No Annexure layout is written | The F-01 store |
| TS-05-47 | A tenant profiled as regulated, with the assistant switched off | The R1 evidence is re-run | Every C-row except C-26 produces its evidence. Any row that fails blocks R1X-06 | R1X-06; AC-DEG-2 |
| TS-05-48 | WE-1's statement, with every fence as of September 2026 | The carve-out share is computed for a month with no quarterly or annual instance | 4 of the 5 counted instances are carved out. Telangana PT and LWF each count as one monthly instance, although their cadence is unknown | The carve-out counting rule |
| TS-05-49 | F-05 SHIPPED, F-04 open, a first live wage month of April 2027, the ECR family's PL-01 passed and PL-02 to PL-05 passed | The first invoice is raised | Permitted. Every ESI upload line reads CARVED_OUT_FENCE on F-04 and waits for its fence. With F-05 open instead, C-12 would have moved to R2 by rule — a desk fence gets no such reading | O2 read when a monthly family is fenced; AD-18 |

#### Cross-register invariants and the desk queue

| ID | Given | When | Then | Traces to |
| --- | --- | --- | --- | --- |
| TS-05-50 | A fence record whose `blocks` names A-16, and A-16 with an empty `blocker_ids` | Either record is saved | Refused under SI-02, naming both records. The repair is on whichever side is wrong; neither is inferred from the other | SI-02 |
| TS-05-51 | The Form 138 family at AUTHORITY_VALIDATED, and a coverage version in which a Form 138 line reads IN_SLA | The version is issued | Refused under SI-08. Recomputed, the line reads SLA_PENDING_FIRST_SUBMISSION, and the family moves only on a real acceptance (AF4) | SI-08; PW-3 |
| TS-05-52 | A proposed admission rule that reads a parameter named in its own sentence and held in no registry | The change is raised | Refused at SC1 under SI-11. It is admissible only once the parameter is registered with an owner, an effect and a routed destination | SI-11 |
| TS-05-53 | A gate check whose evidence reference is empty | The gate record is assembled | The check reads FAIL under SI-10, never PASS by default — DG-3d's precedent applied at a release gate | SI-10; §05.3 DG-3d |
| TS-05-54 | WE-1 and WE-2 admitted, with F-10 and `F-06[TS]` both open and both ours | The queue is recomputed | F-10 ranks first under QR-1, because it fails an R1 gate check and is ours to clear. The Telangana pack blocks more instances a month — four against three — and still ranks below it: the gate outranks the count. The computed order is recorded, and any departure from it is minuted | QR-1, QR-3; §05.18 queue |
| TS-05-55 | A design partner asks for its home state's pack, and the review has one free slot | The request is logged and the queue recomputed | The order does not change: a request is demand, not a counted input (QR-6, SC-H). It changes the count only when the asking tenant is admitted or waitlisted, and any departure from the computed order is minuted with its reason | QR-6; §05.23 SC-H |

#### Evidence accrual, partner withdrawal, the carve-out clock and in-build change

| ID | Given | When | Then | Traces to |
| --- | --- | --- | --- | --- |
| TS-05-56 | R1's gate convening in mid-July 2027 for an April 2027 go-live, with F-04 open | The gate record is assembled | The ECR family carries its portal acceptances; the ESI upload family carries zero instances and the date it can first exist, not a substitute (EA-4, EA-5). No fixture is accepted as PL-01 evidence (EA-2) | EA-2, EA-4, EA-5 |
| TS-05-57 | One partner holds the only live EPF establishment, and withdraws before the family's first accepted return | R1E-05 is re-run | The ECR cell is uncovered; no fixture, bench or conformance render substitutes (PW-3). R1's gate cannot convene, and a change request moving the ECR out of R1 is refused (PW-5). Families already at PL01_PASSED are unaffected | PW-1, PW-3, PW-5; TS-05-44 |
| TS-05-58 | WE-1's ESI line carved out on F-04, with the month's worksheet produced after the 15th | The cycle closes | A product-caused failure of the interim posture is raised under DC-5 — D1 where the worksheet carries the figure the tenant deducts — even though the line sits outside the SLA and the miss stays outside the on-time denominator (DC-6) | DC-5, DC-6 |
| TS-05-59 | A tenant's PT line in a state whose `pt_calendar[state]` is unset | The calendar is rendered | The obligation appears with no due date and the reason; no date is taken from an aggregator or carried from a prior year, and the line is neither on time nor late (DC-2, SS-4) | DC-2; SS-4 |
| TS-05-60 | R1 in IN_BUILD, and two requests: a row C-07's acceptance already requires, and a capability a prospect asked for in a demo | Both are raised | The first is admitted under IB-1(a) as SC-D, and re-runs the lint and the invariants; the second is refused and tagged R2, its demand recorded | IB-1, IB-2; SC-D, SC-H |
| TS-05-61 | A release that gained two rows after RS2 | Its gate record is written | Both rows appear in `rows_added_after_rs2` with their class and the IB-1 limb that admitted them. A gate record missing the field is incomplete, and the gate cannot record PASS | IB-4; §05.20 gate record |
| TS-05-62 | A deferred artefact whose re-entry trigger names a fence that was closed and removed | The change-control review runs | Flagged under SI-13: a trigger must resolve to a live fence, DG check or §20 item, or the deferral is not approved | SI-13; §05.22 |

#### When each group runs, and what a failure blocks

| Scenarios | Runs | A failure blocks |
| --- | --- | --- |
| TS-05-01 to TS-05-08 | On every ledger change, as the lint's own regression suite | The lint release; no ledger change is accepted while the suite is red |
| TS-05-09 to TS-05-14, TS-05-25 to TS-05-28 | From WP-25's exit (fences) and WP-11's exit (obligations), then on every change to the fence register or the obligation engine | The pre-launch gate |
| TS-05-17 to TS-05-24 | As WP-24's exit test (§05.19), then on every change to the admission rules or line-state order | The pre-launch gate |
| TS-05-15, TS-05-16, TS-05-29, TS-05-35, TS-05-49 | Before the first gate review of each release | That release's RS4 |
| TS-05-30 to TS-05-34, TS-05-36 | Before the first TO5, then quarterly | New contracts, until green |
| TS-05-42, TS-05-43 | At every evaluation of R1E-01 | R1E-01, and so R1's move to IN_BUILD |
| TS-05-37 to TS-05-41, TS-05-44 to TS-05-46 | From WP-25's exit, then on every change to the fence register, the family readiness records or the buildability test | The pre-launch gate |
| TS-05-47, TS-05-48 | Before R1's gate review, then with every release | R1X-06; the scope-health report |
| TS-05-50 to TS-05-53, TS-05-62 | With the lint's suite on every ledger change, on every fence transition and coverage version, and at every gate as the `invariants_result` | The change that failed, and the gate's PASS |
| TS-05-54, TS-05-55 | At each operating review, against that review's computed queue | The review's recorded order — the queue is not started until they are green |
| TS-05-56 to TS-05-61 | Before each release gate review, and on every change to the evidence, notice or change-control rules | That release's RS4 |

**Coverage rule for this list.** Every rule family defined in §05.17–§05.23 has at least one negative scenario above: L1–L8, FL1–FL12 (through FL1, FL2–FL3, FL5–FL6, FL9–FL10), RS4 and RS8, AD-01 to AD-18 (through AD-01, AD-05, AD-06, AD-08, AD-13 and AD-18), TSF-1 to TSF-4, SS-1, SS-3 and SS-5, TO7 to TO17, the SC classes and the standing refusals. The rules added with the buildability test, the family readiness record and the rule pack are covered too: BC-1 and BC-2, AF3 to AF5 and AF7, R1E-01 through RP-08 and RP-12, R1X-06, the new-fence table, the F-01 and F-05 postures, the carve-out counting rule, and O2's reading for a fenced monthly family. So are the families added with the execution machinery: the cross-register invariants SI-01 to SI-15 (through SI-02, SI-08, SI-10, SI-11 and SI-13), the queue rules QR-1, QR-3 and QR-6, the carve-out clock DC-2, DC-5 and DC-6, evidence accrual EA-2, EA-4 and EA-5, partner withdrawal PW-1, PW-3 and PW-5, and in-build change IB-1, IB-2 and IB-4. A new rule added through change control (SC-D) is not approved until it brings its negative scenario, numbered from TS-05-63.

---

### 05.25 What this scope decision commits us to, in one paragraph

We commit to **building, for 20–200-employee private Indian employers, a payroll system whose deliverable is the portal-accepted statutory artefact plus attended, assisted submission under the employer's written authority to act — the employer's statutory liability remaining non-delegable — with a maintained-compliance SLA behind it** — every P0 module in §05.5, shipped against the settled 8 May 2026 spec in three evidence-gated releases (R1 first invoice, R2 attended and annual, R3 v1-complete — §05.7), with the fenced items (Form 138 Q4 and Form 130 Part B, ECR arrears, state PT/LWF slabs not yet gazette-sourced, ESI after 22 Nov 2026, the unconfirmed ESIC upload template, the unread Form 123 layout, and attended submission pending counsel — §05.7) shipping as their blockers clear, and with the AI assistant bundled as cost-of-goods and full cost attribution from day one. We decline 1–9 commercially, serve 10–19 as a funnel, and defer 200+ to v2 and 2,000+/regulated to vision behind documentary gates — while starting ISO 27001 at month zero because it is the one enterprise investment whose clock cannot be compressed later. The full-platform, three-segment, full-suite vision from the founder's scope is preserved intact as the destination (Source: memory hrms-product-scope, 2026-09-04); this section's only claim is that it **phases**, and that the phase order is set by which filings we can deliver — artefact plus attended submission — for whom, with a guarantee — not by feature count and not by the AI layer.
