## 01. Executive Summary & Vision

### 01.1 The product in one sentence

**A filing-first, AI-native HR and payroll system for Indian employers of 20–200 people, where the unit of delivery is a completed statutory filing — the ECR, the ESI contribution, the state PT return, Form 138 — not a payslip; where "completed" means a portal-accepted artefact plus attended, assisted submission under the employer's written authority to act; and where AI is architecture and cost-of-goods, never the price line.**

Everything downstream of that sentence is a consequence of two findings that contradict the founding brief, and one reframing that follows from taking both seriously. The brief asked for an *AI-first* HRMS spanning *SMB through enterprise* (Source: founder scoping decision, 4 Sep 2026 — §05). The evidence supports neither as written. This section states why in roughly one page of argument, splits that argument into the claims that could fail, walks one concrete monthly cycle to make "filing as the unit" tangible and defines "done" precisely enough to test, then gives the decision summary, the ten risks and the reading guide to the other twenty-two sections.

### 01.2 The one-page thesis

India has **7,66,254 EPFO-contributing establishments** as on 31.03.2024 (**[Verified]** — EPFO Annual Report / establishment count, FY2023-24; see §04 for the denominator argument). They are already served, incompletely, by **two incumbents doing two different jobs** (**[Reversed]** — earlier drafts treated Tally as the single incumbent; round three found greytHR owns the HRMS job at this band). For the accounting and statutory-artefact job, the incumbent is a TallyPrime licence operated by a Chartered Accountant who files on the employer's behalf for ₹3,000–15,000 a month (**[Hypothesis]** — bureau fee band; kill criterion in the validation table below and §18.16: if a mystery-shop of 6–8 CAs returns a real monthly price under ₹2,000, the CA-fee justification for the mid-market price band collapses). Tally's statutory *capability* is documented (EV-032); its payroll *adoption*, as distinct from capability, is unknown (validation item Tally). For the HRMS job, the incumbent is greytHR, which currently claims "30,000+ companies" (EV-091, capture dated September 2026). Beneath both sits a spreadsheet. The market's real product is not software that *computes* payroll. Every credible vendor computes payroll, and several give it away. The scarce, defensible, recurring-revenue product is software that carries the **filing** through — that generates the exact notified-format artefact, validates it against the portal's own structure, submits it in an attended session under the employer's written authority to act, captures the acknowledgement, and carries a contractual promise that the format is current the day the return is due. Every statutory surface is an attended portal — none exposes a submission API that we are aware of as of September 2026 — and the employer's and deductor's statutory liability is non-delegable: it stays with the customer (§22). How liability is allocated between us, whether it is insurable, and the legal basis for our operator acting on those portals are all under counsel review (§23). No vendor in the six-vendor priced set claims to submit any filing (EV-030 — marketing and product pages read September 2026; products not executed), which is what makes attended submission a real differentiator rather than a feature.

That is the wedge, and it is the entire thesis in five clauses:

1. **The filing, not the payslip, is the unit of delivery.** ICAI's own recommended fee schedule prices TDS return filing, PT registration, PT returns and TDS compliance review — and has *no payroll-processing line item at all* (**[Verified]** — ICAI recommended scale of fees, full-text search; see §04, §18.3). The buyer's own accountant does not sell "payroll processing." He sells filings. So must we.

2. **The floor price of the calculation is zero, and it is defended by the well-capitalised.** Kredily is free forever at unlimited headcount with real PF/ESI/PT/TDS calculation; Zoho Payroll is ₹0 to 10 employees (**[Verified]** — vendor pricing pages; see §18.1, §21). Both give away *computation* and charge for *outputs* — bank payout files, PF/ESI challans, the annual tax certificate, Form 12BB/124 (EV-029). Frappe HR is free and open-source with genuinely strong gross-to-net — but its entire India payroll layer is three files and 549 lines overriding three functions (two for HRA exemption, one for marginal relief): no Indian state name anywhere in the repository, and no ECR, ESI, PT slabs, LWF or Form 138/24Q (EV-031 — source repository inspected, not executed). **[Reversed]** — earlier drafts said Frappe ships PT across 15+ states and LWF across 14 and concluded multi-state PT/LWF was *not* a differentiator. Frappe's source tree shows no state PT or LWF logic (EV-031), and TallyPrime's own documentation shows no state PT slab table (slabs are hand-entered) and no LWF engine (EV-032), so against those two it is a genuine differentiator — greenfield in both. A feature-parity pitch on *calculation* is still dead on arrival — the bake-off will not be won on gross-to-net (EV-031). The defensible boundary is one layer up: the challan, Form 12BB/124, Form 16/130, the acknowledgement, the SLA — and the state-wise PT and LWF layer that neither Frappe nor TallyPrime has.

3. **The market price of HR AI is also zero** — set independently by seven vendors (§12). So AI cannot be the revenue line. It is the deflection engine, the acquisition weapon, and a cost we must instrument from v1 while the price is still zero (§13). It is also the *smallest* of four cost-of-goods lines: the dominant line is supervised filing, which scales per registration × state × filing type, not per employee (EV-088; §13).

4. **Enterprise is arithmetically closed to a new entrant for roughly three years** (argued in full in §05.2, with the residency gate in §17). It is the vision, not the launch.

5. **Therefore v1 is a beachhead**: employers of 20–200 people, where EPF obligation turns on (at 20 headcount), where a real ₹3,000–15,000/month budget line already exists, and where the Tally and CA channels are live. The band is *over-served by free computation, structurally overcharged by every priced HRMS suite* — six of six bill a 50-employee minimum block, so a 20-person firm cannot buy 20 seats from any of them (EV-026) — *and under-served by product that carries the filing through the portal.*

If those five hold, the company is not a feature-velocity software startup. It is a **compliance-maintenance operation with a permanent statutory team** that happens to ship software (§05.15, §22). That is an org-design decision as much as a product one, and the PRD states it up front rather than discovering it after hiring.

> **Competitor-claim capture.** Unless a sentence says otherwise, every competitor fact in this section comes from vendor pages, vendor configuration files, product documentation or a source repository read in September 2026 (research rounds r1–r5). No competitor product was executed, so each is a statement of what the vendor publishes, not of what its product does. Per-claim capture dates sit in §02 and §21, and none of these facts may be repeated to a customer without the clearance in §21 and §23.

### 01.3 The thesis as claims that can fail

The one-page argument rests on sixteen separable claims, and they do not share a marker. Some are verified at primary source, some are hypotheses with a kill criterion, one is an open counsel question and two are cost lines nobody has yet measured. Read as one proposition, the thesis hides which part would fail first, so the table splits it. Each row names its evidence, the observation that would falsify it and where that observation is made. The combinations under which the whole plan should stop rather than iterate are §20.11's; this table is the component view they are built from.

| # | Claim | Marker | Evidence | Falsified by | Tested in |
| --- | --- | --- | --- | --- | --- |
| T-01 | Every statutory surface in v1 scope is an attended portal; none offers an employer submission API that we are aware of as of September 2026 | **[Verified]** | EV-035–EV-038; r3/05 | A portal publishes a submission API or bulk channel for employers | The §22 watcher on each runbook's portal (§22.4.6) |
| T-02 | No vendor in the six-vendor priced set claims to submit any filing | **[Verified]** as claim posture | EV-030 — pages read 5 September 2026, products not executed | A priced vendor publishes a submission offer | §21.11 CRS-06, CRS-07; §21.13 re-capture |
| T-03 | The employer's and deductor's statutory liability is non-delegable and stays with the customer whoever presses submit | Corrections ledger K-13; counsel drafts from it | K-13; §23.13.1 | — the frame, not a bet | §23.13.5 liability principles |
| T-04 | Our operator may lawfully act on each portal under employer credentials, the portals' terms permit it, and the exposure is insurable as designed | Open — counsel | Part D-17 | Counsel answers "no", or "not as designed", for a portal | §23.16 CR-17a–f; §20 V-25; §22.2.3 |
| T-05 | Computation is priced at zero, and a capitalised actor defends that floor | **[Verified]** | EV-029; EV-031 | — the floor we price above | §18.1 |
| T-06 | Multi-state PT and LWF is greenfield in both incumbents' products | **[Verified — source repository / product documentation]** | EV-031, EV-032 | The Tally ecosystem or a Frappe app ships a state layer | §21.11 CRS-08, CRS-09 |
| T-07 | The state layer differentiates only once the gazette-sourced state dataset exists | **[Verified]** as a dependency | EV-015; §20 V-09 | — a build dependency, not a bet | §22.9 state onboarding; §05.7 A-16, A-17 |
| T-08 | Six of six priced suites bill a 50-employee minimum block, so "no seat floor" is structural | **[Verified]** | EV-026 | A priced vendor publishes a per-employee card with no block | §21.11 CRS-10; §18.16 H-P14 |
| T-09 | List prices form a value floor near ₹50 PEPM and a clearing band of ₹80–200; our ₹80–150 target sits inside the band | **[Verified]** list anchors; **[Hypothesis]** our target | EV-027; §18.3 | Realised prices run 30–40% below list | §20 V-03; §18.16 H-P2 |
| T-10 | Buyers pay a premium over free computation and the value floor for attended submission plus a maintained-compliance SLA | **[Hypothesis]** | §18.12; §18.16 H-P3 | Willingness to pay over Zoho is about zero | §20 V-07, extended to the SLA; V-16 |
| T-11 | The CA is a channel and a price anchor, not an opponent | **[Hypothesis]** — no CA has been asked | §18.7 | 40% or more of interviewed CAs read the product as disintermediation | §20 V-05; R-14 |
| T-12 | The market price of HR AI is zero, so AI is cost of goods and an acquisition weapon | **[Verified]** as claim posture | EV-090; §12 vendor reads | A non-zero, agent-specific willingness to pay | §20 V-07 |
| T-13 | Inference is the smallest of four COGS lines; supervised filing is the dominant one | **[Verified]** structure; every line unsized | EV-088 | Measured inference cost exceeds measured supervised-filing cost for the same tenants | §13.9 attribution and §20 V-14; §22.7 FR-OPS-031 and §20 V-26 |
| T-14 | Supervised minutes per registration fit inside the per-head price at the binding tenant profile | **[Hypothesis]** — unsized | §13.19; §22.7 | FR-OPS-031's kill criterion after the first design-partner quarter | §22.7; §20 V-26; §19.8 |
| T-15 | Enterprise procurement is closed to a new entrant for roughly three years | **[Verified]** against real tenders | §05.2 — SBI and Indian Bank RFPs, GFR 2017 | Not a falsifier but an upside: a tender writes in the startup relaxation while we hold seasoned ISO 27001 — bid it, do not re-phase | §05.12 |
| T-16 | A late or rejected filing is a felt pain the buyer pays to remove | **[Hypothesis]** | §04.1; §18.3 | Buyers report near-zero late or rejected filings with their current bureau | §20 V-16 |

<!-- DIAGRAM: exec-summary-thesis-claims -->

**What survives a single failure.** The thesis does not stand or fall as a block. A claim that fails on its own leaves a narrower product behind, and every such narrower product is already specified:

| If this fails alone | The product that remains | What is lost | Where the response is specified |
| --- | --- | --- | --- |
| T-04 — attended submission not cleared | Portal-accepted artefacts the employer submits; the format-current guarantee; the state layer; an SLA narrowed to artefact readiness and warning lead time | The submission layer — the one no vendor claims (T-02) | §05.12; §22.2.3; §23.13.3; §18.3 H-P15 |
| T-06 — an incumbent ships a state layer | Attended submission and maintenance under contract | The coverage argument against that incumbent | §21.11 CRS-08, CRS-09 |
| T-08 — a priced vendor drops its block | Submission and the SLA, against that vendor | The structural pricing wedge, against that vendor | §18.2 P6; §18.16 H-P14 |
| T-10 — no premium over free | A fixed monthly fee that displaces the bureau, not the software field | The price position against software | §18.3, closing paragraph |
| T-11 — the CA channel inverts | Direct self-serve and the Tally-partner route, contingent on §20 V-02 | The primary GTM motion | §20.8 R-14 |
| T-14 — minutes do not fit the price | Employer-attended submission as the bundled default, operator-attended submission as a priced line, or a smaller registration allowance | Bundled operator submission at the File-tier price | §22.7 FR-OPS-031 |
| T-01 — a portal opens a submission API | Submission becomes an integration for that portal and its supervised minutes fall | The attended layer's scarcity on that portal | §16.5; §22.4.6 |

Four combinations are not survivable by narrowing, and §20.11 names them as the whole-thesis kill conditions: T-16 failing together with a bureau price below our floor (§20 V-01); T-02 failing at the value-floor price; T-11 failing together with negligible Tally payroll adoption (§20 V-02) and no self-serve conversion; and T-14 failing with realised prices below list (§20 V-03) and no registration line that recovers the gap.

#### What each claim holds up — the dependency map

The two tables above say what is left of the product when a claim fails. The register also needs the reverse: which decisions, open items and positioning claims rest on each claim, so that a falsifier firing moves every dependant at once instead of waiting for someone to remember the link. The edges below are the `rests_on` field of the register records defined in the decision summary (RL-3). "Suspended" is the claim-register state of FR-LEG-001; "reopens" is DS-6.

| Claim | Rests on it | Effect when its registered falsifier fires | Watch that fires it |
| --- | --- | --- | --- |
| T-01 | DEC-01, FEN-06, PC-1 | Scoped to the portal. DEC-01 reopens for that portal; its submission is re-specified as an integration (§16.5), its `F-08` instance is re-assessed and its supervised minutes re-measured (§22.7). PC-1 stays true and is re-cleared in the portal's new wording | The §22 watcher on each runbook's portal (§22.4.6) |
| T-02 | PC-2, OPN-01 | PC-2 is suspended, because its external form becomes untrue. OPN-01 is re-examined, since the premium T-10 tests is a premium over vendors that do not submit. The §21.11 response for that vendor runs; at the value-floor price, §20.11's second kill condition is reviewed | §21.13 re-capture; R-36, R-37 |
| T-03 | DEC-01, OPN-04, PC-1 | None registered — the frame, not a bet (§23.13.1) | — |
| T-04 | FEN-06, OPN-04, PC-1, PC-5 | Scoped to the portal and the question. The fence instance stays open (§05.18 FL5) and the matching row of the launch-posture table applies; PC-1's operator clause is unusable on that portal; PC-5 is re-worded to the narrowed SLA (§05.12); OPN-04 is re-scoped to the liability that remains | CR-17a–f (§23.16); §20 V-25 |
| T-05 | DEC-05 | None registered — the floor we price above; a rise in it reopens nothing | — |
| T-06 | PC-3 | Scoped to the incumbent. PC-3's clause on that incumbent is suspended and the other's stands; the pitch against that incumbent leads with attended submission and the SLA (§21.11 CRS-08 or CRS-09) | §21.11 CRS-08, CRS-09; R-38 |
| T-07 | FEN-05 | None registered — a build dependency: each state's layer goes live only as its row is sourced | §20 V-09 |
| T-08 | DEC-05, PC-4, OPN-01 | Scoped to the vendor. DEC-05 reopens, and because its reversible part is the level, OPN-01 is re-tested against the changed card. PC-4 is suspended until re-worded without that vendor; that vendor's row in the "no seat floor" worked example is recomputed | §21.11 CRS-10; R-39 |
| T-09 | OPN-01 | OPN-01 re-bases toward the value floor, as V-03's kill criterion states; R-9's response runs | §20 V-03; R-9 |
| T-10 | OPN-01, OPN-04 | The price position moves to a fixed fee that displaces the bureau (§18.3, closing paragraph); OPN-01 is re-anchored and OPN-04 re-examined | §20 V-01; V-07 extended to the SLA; V-16 |
| T-11 | OPN-05, DEC-06 | OPN-05 closes negative; DEC-06 is reviewed under its §15.3.9 revisit triggers, which include V-05; the §18.7 motion is rebuilt (R-14) | §20 V-05 |
| T-12 | DEC-03, OPN-07, PC-7 | DEC-03 reopens on V-07, its registered trigger; OPN-07 closes toward a metered SKU for the agent the result names; PC-7 is re-worded if the bundled scope changes | §20 V-07 |
| T-13 | DEC-03 | DEC-03 is reviewed under V-14's kill criterion — re-tier or degrade the bundled assistant (§20.6) | §20 V-04, V-14; §13.9 attribution |
| T-14 | OPN-03, OPN-02, DEC-05 | OPN-03 chooses among the three responses in the "What survives" table — employer-attended submission as the bundled default, operator submission as a priced line, or a smaller allowance through OPN-02. With realised prices below list and no line that recovers the gap, §20.11's fourth condition is reviewed | FR-OPS-031; §20 V-26 |
| T-15 | DEC-02 | Upside only — bid the tender; do not re-phase | §05.12 |
| T-16 | DEC-01, OPN-01 | Positioning is re-examined, as V-16's kill criterion states; together with V-01 showing a bureau price below our floor, it is §20.11's first kill condition | §20 V-16 |

<!-- DIAGRAM: exec-summary-claim-dependencies -->

- **AC-01.16 — A falsifier moves its dependants in one step.** When a registered falsifier for a T-claim is recorded, the same transaction moves every positioning claim the table marks suspended to `suspended` in the claim register (FR-LEG-001 AC2), moves every decision whose reopen trigger it is to Reopened (DS-6), flags every listed open item for the next operating review, and sets the claim's status to `falsified` with the evidence reference, pending §02's re-grade of its marker. A falsifier scoped to one portal, vendor or incumbent moves only the scoped part of each dependant. *Verify:* TS-01.24 to TS-01.26.
- **AC-01.17 — No orphans in either direction.** Every DEC, FEN, OPN and PC item rests on at least one T-claim or cites at least one evidence row, and every T-claim whose falsifier is registered names at least one watch (RL-2, RL-3). A claim with no registered falsifier says why — a frame, a floor or a build dependency — as T-03, T-05 and T-07 do.

**Worked example — one vendor drops its block.** This is a test fixture for AC-01.16, not a forecast and not a statement about any vendor's plans. The value-floor card in the "no seat floor" table under Target user — a ₹2,495 block for 50 seats with a ₹45 marginal rate, as captured for greytHR Essential (EV-027; §21.4) — is re-captured as ₹45 per employee from the first employee, with no block. At the ₹110 point §18.3 uses:

| Headcount | The card as captured | The fixture card | Our card at ₹110 | Our monthly position, before → after |
| --- | --- | --- | --- | --- |
| 20 | ₹2,495 | 20 × ₹45 = ₹900 | 20 × ₹110 = ₹2,200 | ₹295 cheaper → ₹1,300 dearer |
| 50 | ₹2,495 | 50 × ₹45 = ₹2,250 | 50 × ₹110 = ₹5,500 | ₹3,005 dearer → ₹3,250 dearer |

The price lead against that vendor now exists at no size, so its crossover cell reads "never". By the dependency map: T-08 is recorded falsified for that vendor, and §02 re-grades it to five of six; PC-4 is suspended, because its external form names all six; DEC-05 reopens on its level, while its shape — billing actual headcount — stands unless the review records otherwise, as §18.2 P6 already anticipates for exactly this case; and the sale against that vendor rests on attended submission and the SLA, with the state layer a claim to test in a bake-off rather than a gap (Positioning). §20.11's review trigger does not fire on this alone: it needs the same vendor to add submission as well (R-36 or R-37).

| # | Given | When | Then | Negative or edge covered |
| --- | --- | --- | --- | --- |
| TS-01.24 | The fixture above is recorded as a §21.13 re-capture | The T-08 falsifier is registered through CRS-10 | In one transaction T-08 is falsified for that vendor, PC-4 moves to `suspended`, DEC-05 to Reopened and OPN-01 is flagged; the worked-example row is marked for recomputation | A deck still carrying PC-4's old wording fails clearance (FR-LEG-001; RL-7) |
| TS-01.25 | A TallyPrime release note adds a state PT slab table — R-38's registered trigger | The capture is registered through CRS-08 | T-06 is falsified for TallyPrime only; PC-3's TallyPrime clause is suspended and its Frappe clause stands; the pitch against Tally leads with submission and the SLA | Suspending the whole of PC-3 on a Tally-only falsifier fails AC-01.16's scoping |
| TS-01.26 | Counsel's answer to CR-17b is unfavourable for the ESIC portal | The answer is recorded (FR-LEG-040) | `F-08[ESIC]` stays open with no Mode C on that portal (§05.18 F-08 outcomes); the other portals' instances are untouched by this answer; PC-1's operator clause cannot be used for ESIC filings | A Mode C session opening on ESIC fails; so does treating the ESIC answer as clearing or closing the other portals |

### 01.4 One month in the life of a 50-person tenant

To make "the filing is the unit of delivery" concrete rather than a slogan, here is the monthly obligation calendar the product actually owns for a single 50-employee private-sector tenant in Karnataka. Every row is an artefact with a portal, a due date, a format version, and an acknowledgement to capture. Dates are the standard statutory cadence at draft date; the engine resolves the exact due date and format version from the effective-dated rule store (§06, §14).

| Due (typical) | Artefact | Portal | Acknowledgement to capture | Notified format cue |
| --- | --- | --- | --- | --- |
| 7th | **TDS deposit** (challan ITNS 281, or its successor under the 2026 Rules) for the prior month's deduction under s.392 (ex-s.192); March deductions fall due 30 April | Income-tax / authorised bank | Challan Identification Number (CIN / BSR + serial) | (Source: the 7th and 30 April are carried from r.30 of the 1962 Rules; r.218 of the Income-tax Rules 2026 prescribes the dates for Tax Year 2026-27 onward and its text is not yet read, so the carried dates are **[Hypothesis]** until it is — §06.13, §20; **[Reversed]**: an earlier revision cited r.218 as the source (RV-18); both section vocabularies accepted, EV-050) |
| 15th | **EPF ECR** return for the prior wage month: upload → validate → approve → challan with TRRN → pay → receipt | EPFO Unified Portal (interactive login with CAPTCHA) | Return statement, TRRN, payment receipt | (Source: Employees' Provident Funds Scheme 2026 — "within fifteen days of the close of every month", not yet re-checked against an EPFO circular, §20; file layout EV-035; lifecycle EV-036) |
| 15th | **ESI contribution** for prior month | ESIC portal (template upload) | Challan number | (Source: due within 15 days of the last day of the calendar month, §06.3; coverage ceiling ₹21,000/month, ₹25,000 for employees with disability. No regulation number is cited: ESI subordinate law is saved only to the on-or-about 21 November 2026 cliff, §06.9) |
| 20th | **Professional Tax** monthly statement (Karnataka Form 5A) + remittance | e-PRERANA, Karnataka Commercial Taxes Department | PT challan / return acknowledgement | (Source: Karnataka Tax on Professions Act — "within 20 days of the expiry of the month"; not yet checked against a department notification, §20; cap ₹2,500/yr, Art. 276) |
| 15 January (annual) | **LWF** contribution — Karnataka runs a calendar-year cycle due 15 January, the one LWF periodicity verified in any state; the employee and employer amounts disagree between compilations and are unverified, so the Karnataka LWF row stays fenced until its gazette row exists (§05.7 A-17). A vendor compliance calendar listing a 14 January LWF date is unverified vendor data — the same calendar carried two demonstrated errors (r3/02). **[Reversed]** — an earlier revision of this row called the periodicity itself unverified (RV-19) | State labour-welfare board | Deposit receipt | (Source: periodicity **[Verified]**, r2/10; amounts **[Hypothesis]** — §06.8, §20 V-09) |
| Ongoing | **Wage slip** (Form V) and **statutory registers** — central sphere: Wages Rules 2026 r.51(1) Forms I, IV, IX; OSH Forms XIII, XIV, XV, XIX, XX, XVI; SS r.53(1)(a) Form XXII | Internal, electronic | Register version, audit trail | (Source: EV-053; retention EV-054; form numbers configurable per state because state rules prescribe different forms) |

Then the quarter and the year add: **Form 138** (successor to 24Q) each quarter — Q1 by 31 July, Q2 by 31 October, Q3 by 31 January, Q4 by 31 May of the year following the Tax Year (r.219, EV-049) — with the Q4 file format not yet released and therefore fenced (EV-046); and by 15 June **Form 130** (successor to Form 16; Parts A, B *and* C) to every employee (Income-tax Rules 2026, r.215). Form 130 is generated by TRACES from the Form 138 data and is invalid if generated anywhere else (EV-048): the product prepares the data and distributes the certificate; it does not generate it. Plus the annual EPF/ESI reconciliations. A payslip-centric product treats all of the above as reports generated *off* a completed pay run. A filing-first product inverts it: the pay run is an input, and the **filing is the deliverable whose completion is the headline metric.** This is why `Filing` is a first-class entity with its own lifecycle in the data model (§14), and why the payroll engine is specified as a *filing* engine (§08).

<!-- DIAGRAM: exec-summary-monthly-filing-cycle -->

#### The example tenant's first ten months

The monthly table is the steady state. The first year is not, because the fences and dated risks this PRD carries fall inside it. Suppose the same 50-person Karnataka tenant goes live with the September 2026 wage month. Its first ten months of due artefacts, with every fence, dated risk and unverified date that touches them, run as follows:

| Month | What falls due for this tenant | What bites | Pointer |
| --- | --- | --- | --- |
| October 2026 | September ECR and ESI (15th); September PT; September TDS deposit; **Form 138 Q2** (July–September) by 31 October | Q2 carries July and August deductions made in the previous system, so the first quarterly statement depends on the imported year-to-date tie-out. A Q2 correction may be held while the portal's correction function is not yet enabled | §20 V-15, R-28; §22.11 row 9 |
| November 2026 | October ECR, ESI, PT and TDS deposit | The saving of the ESI rules under CoSS s.164(2)(b) expires on or about 21 November 2026 with no successor notified; the escalation point falls around 1 November | R-2; §06.9; §05.7 A-09 |
| December 2026 | November ECR, ESI, PT and TDS deposit | November's ESI contribution straddles the cliff: its post-cliff days sit under a regime nobody has named, so the R-2 contingency applies rather than a guessed rule. Separately, our WhatsApp business account must be on INR billing by 31 December or delivery stops on 1 January | R-2; EV-088 |
| January 2027 | December ECR, ESI, PT and TDS deposit; **Karnataka LWF** (annual, 15 January); **Form 138 Q3** by 31 January | Karnataka LWF amounts are unverified, so the row is fenced unless it has been sourced as a design-partner state; one model tier's price doubles on 1 January — already the base case | §05.7 A-17; §20 V-09; EV-089, R-12 |
| February 2027 | January ECR, ESI, PT and TDS deposit; February salaries at ₹25,000 or above carry Karnataka's ₹300 PT instalment in place of ₹200 | The OSH annual return (FORM-XVII) and, where CoSS Chapters V and VI apply, the SS unified annual return (Form XXIII) fall due by the last day of February — a hard deadline if R1 is live | EV-014; §05.7 A-20, A-21 |
| March 2027 | February ECR, ESI, PT and TDS deposit | — | — |
| April 2027 | March ECR, ESI and PT; the TDS deposit for March deductions by 30 April | The date is the one carried from the 1962 Rules — r.218 not yet read. Tax Year 2027-28 opens; regime elections and declarations restart | §06.5; §06.13 |
| May 2027 | April ECR, ESI, PT and TDS deposit; **Form 138 Q4** for Tax Year 2026-27 by 31 May | DPDP's substantive provisions commence on or about 13 May 2027, so the consent regime switches mid-month; the Q4 format was unreleased when re-checked in September 2026, so Q4 sits in BLOCKED until it lands | EV-058, R-22; EV-046, R-4 |
| June 2027 | May ECR, ESI, PT and TDS deposit; **Form 130** to every employee by 15 June | Form 130 is generated by TRACES from Form 138 data and cannot exist for Tax Year 2026-27 before the Q4 Annexure II does | EV-046–EV-048; §05.12 |
| July 2027 | June ECR, ESI, PT and TDS deposit; **Form 138 Q1** of Tax Year 2027-28 by 31 July | None new: the first quarterly statement built entirely from months run inside the product, on the stack already in use for Tax Year 2026-27 onward | EV-049, EV-052 |

Eight of the ten months carry a fence, a dated risk or a date not yet verified. That is why the first year is sold on a declared SLA scope with named carve-outs (§05.12, §19) rather than on the steady-state table, and why the decision summary below lists every fence with the event that lifts it.

#### The same month for a multi-state tenant

The single-state month understates the state layer. Take the second tenant profile §22.7 and §13.19 use — 60 employees, two legal entities, establishments in three states — with the registration structure that example assumes: two PF codes, three ESI codes and two TANs. Put its establishments in Karnataka, Maharashtra and Tamil Nadu, the states §18.3's multi-state example uses:

| Obligation in a month | The single-state tenant above | This tenant | What differs |
| --- | --- | --- | --- |
| ECR returns | 1 | 2 — one per PF code | Two chronological ledgers (FR-PAY-712) |
| ESI contributions | 1 | 3 — one per ESI code | Three uploads, one per code |
| Professional Tax | Karnataka's return | Karnataka's return; Maharashtra's employer (PTRC) return on the periodicity the department assigns that registration, plus the entity's own PTEC registration; Tamil Nadu's levy, set by each local body | Three rate-setting regimes, one of them per local body (§06.4) |
| LWF | Karnataka, annual | Karnataka annual; Maharashtra's and Tamil Nadu's periodicities not captured | Fenced per state until sourced (FEN-05) |
| TDS deposits and Form 138 | One TAN | Two TANs | Two sets of challans and two quarterly statements |

A single-registration tenant carries 29 central supervised instances a year whatever its headcount — 12 ECR, 12 ESI, 4 Form 138 and 1 Form 130; this one carries 70, before any PT or LWF instance (§22.7). The state layer is where this tenant needs what neither incumbent ships (T-06), and the registration count is where it costs several times more per rupee of per-head revenue (T-13, T-14).

### 01.5 What "filing completed on time" means — the definition of done

The headline operating metric is **filings completed on time** (its instrumentation and targets are specified in §19). A metric that vague is un-auditable, so the PRD fixes an explicit definition of done. A filing is *complete* only when all six conditions hold:

1. **Generated in the format notified for the period being filed** — not the format current today. Arrears and corrections re-generate against the format version in force for that period (the same effective-dating discipline the wage-definition rule needs; §06, §08, §14). For TDS this is two live stacks at once: RPU 1.2 + FVU 1.2 for Tax Year 2026-27 onward, RPU 6.0 + FVU 9.5 for FY 2010-11 to FY 2025-26, and mixing them is a rejection (EV-052).
2. **Schema-validated** against the portal's own structure before submission — the ECR's 11 fields in order, `#~#`-delimited, no header row (EV-035); PT return columns; Form 138's `^`-delimited FH/BH/CD/DD records (EV-051) — so a reject is caught in-product, not at the portal. For the ECR, the hard verification gate sits **immediately before payment initiation**: an approved return can never be cancelled, and a downward correction (a Revised return) is possible only while no payment has been initiated (EV-036, EV-037).
3. **Submitted in an attended session** on the correct portal for the correct jurisdiction (EPFO Unified, ESIC, the *right* state PT portal, TRACES/Protean for TDS). None of these surfaces offers a submission API that we are aware of as of September 2026: EPFO requires an interactive login with a CAPTCHA; for TDS the *employer* runs the FVU utility and uploads; ESIC is a template upload; state PT is N separate manual portals (§16, §22). Submission is made by the employer, or by our operator acting under the employer's **written authority to act**; the employer's and deductor's statutory liability is non-delegable and stays with the customer. Whether and how we may act on those portals under employer credentials is under counsel review (§23). Autonomous submission is forbidden to the AI layer — assembly only, a named human submits (§12.4, §12.5).
4. **Acknowledgement captured and stored as evidence** — TRRN, CIN, challan number, PT return receipt — linked to the filing record and the pay run it derives from.
5. **Reconciled** against the source pay run and the general ledger, with any variance flagged.
6. **Retained** for the statutory period. For central-sphere registers that is five years from the date of last entry (Wages r.51(4); OSH r.72(1)(vii) and SS r.53(1)(e) say five *calendar* years — not identically worded), and OSH r.76(2) bars destruction even after five years unless transferred to a new register (EV-054). State-sphere and TDS-record periods are not stated in this PRD — counsel required (§23).

Acceptance criteria the rest of the PRD is written to satisfy:

- **AC-01.1 — Format-current guarantee.** For any filing submitted on date *D* for period *P*, the generator emits the format version the portal accepts on *D* for period *P* — for a correction to a pre-2026-27 TDS period, that is the legacy stack (EV-052) — and the release pipeline has performed a corrigendum check within the guarantee window (§02.4 standing rule). Kill/verify: a seeded corrigendum in a test feed must change the emitted format within one business day (§12 watcher AC; the compliance data pipeline, §22).
- **AC-01.2 — Acknowledgement completeness.** No filing may be marked "complete" without a captured acknowledgement artefact; a filing that is submitted but un-acknowledged, or rejected, never counts as complete. The count is computed off the filing state machine, including its REJECTED, REVISED and SUPPLEMENTARY states (§08, §19).
- **AC-01.3 — Period-correct recomputation.** A retro run for a prior period recomputes statutory figures against the rule version effective for that period, not today's (§08, §14).
- **AC-01.4 — Deterministic statutory figures.** No statutory or monetary figure on any filing is model-generated; all resolve in the deterministic rules engine (§13.4, §12.8).

These four are the load-bearing promises. They are also exactly the promises a spreadsheet, a base Tally licence, and an open-source project structurally cannot make as a *service* — which is the core of the differentiation argument (§18.3, §21).

#### The completion predicate — the definition of done as data

The six conditions are prose; a metric needs a predicate. Over the `Filing` entity (§14.4.5) and its `Challan` records (§14.4.6), a filing instance *f* is **complete** when every clause below holds. §19 builds OTAF on top of it by adding first-time acceptance and the right-first-time window, and §08 FR-PAY-711 is the machine that moves *f* into the states the predicate reads.

```text
complete(f) :=
      f.state = FILED                                                  -- condition 4; FR-PAY-711 F15 or F16
  AND f.format_version = format_for(f.filing_type, f.period, f.submitted_at)
                                                                       -- condition 1; EV-052 for TDS
  AND f.input_snapshot_ref resolves to a LOCKED payroll month           -- AC-01.3; FR-PAY-711 F4
  AND f.artefact_sha256 = hash of the artefact that passed F5           -- condition 2
  AND f.submission_mode IS SET AND f.submitted_by IS SET               -- condition 3
  AND (f.submission_mode = operator_under_written_authority
         IMPLIES f.portal_session_log_ref IS SET
             AND f.authority_to_act_document_id was executed and unrevoked at f.submitted_at)
  AND f.ack_ref IS SET AND f.ack_document_id IS SET                     -- condition 4; AC-01.2
  AND (payment_bearing(f) IMPLIES every Challan of f is in state reconciled)
                                                                       -- condition 5; EV-036
  AND reconciliation_breaks(f) = none                                   -- condition 5; AC-01.10
  AND a retention class is assigned to f, and nothing in f's evidence chain
      is erasable while that class's period is unset                   -- condition 6; CR-11

on_time(f) := complete(f) AND authority_timestamp(f) <= f.due_date     -- §19.1 gate 2
```

`format_for` returns the version the portal accepts on the submission date for the period filed (AC-01.1). `payment_bearing` is true for the ECR, ESI, PT and LWF and false for a Form 138 statement, whose deposits preceded it (FR-PAY-711 F16). `authority_timestamp` is the time printed on the acknowledgement or receipt, never the time we recorded it (§19.1). Form 130 and the statutory registers are not filing instances under this predicate: Form 130 is generated by TRACES and only distributed by us (EV-048), and registers are maintained, not submitted (§05.8); their completion tests are the last two rows of the per-artefact table below.

The predicate's edge and negative readings, fixed so that no dashboard can read them generously:

| Situation | complete? | on_time? | Why |
| --- | --- | --- | --- |
| Uploaded and acknowledged, payment initiated, receipt not yet captured | No | No | State is PAYMENT_INITIATED, not FILED |
| Acknowledged and receipted after the due date | Yes | No | The authority's timestamp decides |
| Operator-submitted while the written authority was revoked | No | No | The authority clause fails; revocation should have disabled the operator mode before the session (FR-LEG-035), so the submission is also an incident for the vault and authority controls (§22.5) |
| Accepted, then a challan fails at the bank | No | No | A reconciliation exception, not a re-filing (§14.4.6) |
| Generated from a payroll month that was not LOCKED | Impossible | — | FR-PAY-711 F4 refuses generation; any such record is a defect |
| A member excluded because an identifier is unseeded | Yes, for the members the return carries | By its own date | The exclusion is a recorded disposition (FR-CHR-097); the later Supplementary return is its own instance (AC-DM-12) |
| BLOCKED because the format is unpublished | No | Outside the denominator | An external block moves to the coverage-gap register (§19.1.2) |
| BLOCKED on a chronology gap or a pending joint declaration | No | Inside the denominator, and late if it misses the date | A tenant-side block leaves the obligation live (§19.1.2; EV-038, EV-041) |
| A Supplementary ECR that includes a member already on an earlier return for the month | Never generated | — | A Supplementary return may carry only members absent from every prior return for the month (EV-037) |
| A Tax Year 2026-27 statement built for the FY 2025-26 utility stack | Never submitted | — | Refused at validation; mixing the stacks is a portal rejection (EV-052) |

<!-- DIAGRAM: exec-summary-definition-of-done -->

#### The definition of done, per artefact

What each of the six conditions means for each artefact the product owns. "CR-11" in the retention column means the period is a counsel-set parameter, held and never erased while unset (§23.16).

| Artefact | 1 · Format for the period | 2 · Validated against | 3 · Submitted where, by whom | 4 · Acknowledgement | 5 · Reconciled against | 6 · Retention |
| --- | --- | --- | --- | --- | --- | --- |
| ECR return and challan | 11 fields, `#~#`, no header row — unchanged by the September 2025 re-engineering (EV-035); return type chosen within the EV-037 guards | Layout self-check; EPFO's own severities — the age-58 EPS rule blocks, the post-1 September 2014 joiner above ₹15,000 is a flag (EV-040) | EPFO Unified Portal, interactive login with CAPTCHA; the employer, or our operator under written authority (§22.4.1) | Return file ID; TRRN at challan; payment receipt (EV-036) | Locked-snapshot column totals; one or more challans (EV-036); s.7Q interest as its own line (EV-039) | CR-11 |
| ESI contribution | Contribution-period rules; the regime after on or about 21 November 2026 is unresolved (§06.9) | The ESIC template once captured (`esic_mc_template_version`, §05.7 A-08) | ESIC portal, template upload | Challan number | Snapshot totals; challan | CR-11 |
| PT return, per state | The state's slabs, periodicity and form from its gazette row (§20 V-09) | The state return's columns | That state's own portal — one per state (§22.4.4) | The state's acknowledgement or challan | Snapshot totals by work-location state (Part E-5) | CR-11; state-sphere periods unknown |
| LWF remittance | The state's periodicity and amounts; Karnataka's periodicity is the only one verified | The board's format | The state welfare board | Deposit receipt | Snapshot | CR-11 |
| TDS deposit, monthly | Challan under r.218, text not yet read (§06.13) | Challan fields | Income-tax portal or authorised bank; the employer pays | CIN — BSR code and serial | Deduction ledger; the challan is later quoted in Form 138 | CR-11 |
| Form 138, Q1–Q3 | By period: RPU 1.2 + FVU 1.2 from Tax Year 2026-27; RPU 6.0 + FVU 9.5 for FY 2010-11 to FY 2025-26 (EV-052) | FVU; the `.csi` challan match (FR-PAY-706) | The deductor runs FVU and uploads on the income-tax portal (§22.4.3) | Return Receipt Number (EV-051) | Challans quoted; deduction ledger | CR-11 |
| Form 138, Q4 | Unreleased — BLOCKED (EV-046) | — | — | — | — | — |
| OSH FORM-XVII; SS Form XXIII where CoSS Chapters V and VI apply | Central-sphere forms — OSH r.74, SS r.53(5)(a) (r5/04) | The notified form, including FORM-XVII's Part-IV EPF and ESI self-declaration | The submission channel is not yet specified (§05.7 A-20, A-21; §22) | To be specified with the channel | The year's registers and filed returns | CR-11 |
| Appointment letter, at establishments of 10 or more workers | The form the appropriate Government prescribes — state-sphere (EV-057) | The captured state form's fields | Issued to the worker, not submitted | The issue record | The employee master (§07) | CR-11 |
| Form 130 | Never ours to generate — TRACES only (EV-048) | — | Downloaded from TRACES and distributed to each employee | The TRACES-generated certificate, held per employee | Form 138 Annexure II data (EV-047) | CR-11 |
| Registers and wage slip | Central-sphere forms, form numbers configurable per state (EV-053) | The notified format — Form IX with per-day IN and OUT (EV-055) | Not submitted; maintained and producible on demand | Register version and audit trail | The source events — punches, the locked pay run | EV-054's central-sphere wording; state periods unknown |

#### Promises AC-01.5 to AC-01.11

AC-01.1 to AC-01.4 make the artefact right. These seven make the claim about it honest. Each is implemented elsewhere; this section owns the promise and its verification.

- **AC-01.5 — The submission mode is recorded and never overstated.** Every filing records who submitted it, in which mode (§22 FR-OPS-001) and under which written authority. A filing the employer submitted from our artefact is never counted, reported or sold as one we submitted (FR-LEG-034). *Verify:* for any period, filings marked operator-submitted equal filings carrying both an executed, unrevoked authority reference and an operator session log (§22.3.1).
- **AC-01.6 — Fenced or unresolved means BLOCKED, never guessed.** An artefact whose format is unpublished, whose regime is unresolved or whose state row is unsourced is not generated. Its instance sits in BLOCKED with a reason, an owner and an unblocking trigger; the due date stays visible; an externally blocked instance moves from the on-time denominator to the coverage-gap register (FR-PAY-711 F2; §19.1.2; §22.1 P9). *Verify:* while the Form 138 Q4 format is unpublished, no path — generator, operator export or assistant — produces a Q4 file.
- **AC-01.7 — Every irreversible portal act has a named approver bound to the object.** Approving an ECR return and initiating payment happen only on a named approver's instruction bound to the hash of the object acted on (§22 FR-OPS-004), and the verification gate runs immediately before PAYMENT_INITIATED (FR-PAY-301 M10; EV-037). *Verify:* a Revised ECR after payment initiation is refused with the EV-037 reason (AC-711.3).
- **AC-01.8 — No month is silently abandoned.** Every wage month from coverage onward carries exactly one ledger status per EPF establishment, and an unfiled month is surfaced before it can block a later Regular return under the M−4 rule (FR-PAY-712; EV-038). *Verify:* AC-712.1 and AC-712.2.
- **AC-01.9 — Aadhaar never blocks payroll.** An employee without a seeded identifier is paid in the same run and excluded and flagged on the affected return, with operator and employee notices; no configuration makes Aadhaar a condition of payroll or of any other member's filing (Part E-11; FR-CHR-101; Part D-10). The final default is under counsel review (CR-30).
- **AC-01.10 — Artefact, snapshot and payment agree to the rupee.** For the members an artefact carries, its statutory columns equal the locked snapshot's totals for the same registration and period exactly, because both come from one snapshot; excluded members reconcile through their recorded disposition. The receipted challans sum to the amount the return statement shows due, with mandatory interest carried as its own line (EV-036, EV-039). Any difference is a reconciliation break that holds the instance short of FILED. A difference against the customer's own accounting export is flagged, never blocking, because the books of account are not ours (NG-19).
- **AC-01.11 — Both vocabularies, on every surface.** Search, imports, labels and help accept the Income-tax Act 2025 form and section numbers and their 1961-Act predecessors — Form 138 and 24Q, Form 130 and Form 16, Form 124 and 12BB, s.392 and s.192 — and a historical period keeps its historical form name (EV-050).

#### Worked example — the 19→20 firm's first ECR, reconciled

Take the Bengaluru firm from the step-function example later in this section, now with 20 members for the June wage month. Nineteen have EPF wages of ₹15,000, the case EPFO's own help-file fixture uses (lines of 1,800 / 1,250 / 550 — r5/02, EV-035). The twentieth is an EPS member on basic plus DA of ₹25,000 whose employer contributes on actual wages. The file's three contribution columns come out as:

| Members | EPF wages each | Employee PF (field 7) | Employer EPS (field 8) | Employer PF (field 9) |
| --- | --- | --- | --- | --- |
| 19 | ₹15,000 | 19 × ₹1,800 = ₹34,200 | 19 × ₹1,250 = ₹23,750 | 19 × ₹550 = ₹10,450 |
| 1 | ₹25,000 | 12% = ₹3,000 | 8.33% of the ₹15,000 ceiling = ₹1,250 | ₹3,000 − ₹1,250 = ₹1,750 |
| **File total** | | **₹37,200** | **₹25,000** | **₹12,200** |

AC-01.10 runs its comparisons at three points. Before upload (F5): (1) field 7's total equals the employee PF deducted in the locked June snapshot, ₹37,200; (2) fields 8 and 9 sum to the employer's 12%, ₹25,000 + ₹12,200 = ₹37,200. Before approval: (3) the return statement EPFO shows after validation is reconciled member by member against the snapshot, and an unexplained difference withholds approval (§22.11 row 3). At the verification gate, before payment initiation: (4) the contributions on the Due Deposit Balance Summary that EPFO generates at approval equal the file totals for the contributions the file carries (EV-036, EV-037). Amounts the portal computes and the file does not carry — the EDLI contribution, the administrative charges and any s.7Q interest (EV-039) — are captured from the summary and recorded; they are compared with an engine figure only once §06 has re-verified the rates under the Code (§06.2).

**The negative case the per-member check exists for.** An engine rule that applied 8.33% to the twentieth member's full wage would put ₹2,083 of EPS and ₹917 of EPF into the snapshot itself, and the file would faithfully carry field totals of ₹25,833 and ₹11,367. Every comparison above would pass, because the snapshot, the artefact and the portal would agree on a wrong split — AC-01.10 proves transcription, not the rule. So the per-member rule "field 8 is at most 8.33% of min(EPF wages, ₹15,000)" also runs at validation (F5) as a check on the rule itself. Which ECR checks the portal rejects rather than flags is only partly published — EV-040 names the age-58 EPS rule as the one hard block — so the product's own validator is the control that catches the over-allocation (§20.9). Had the twentieth member joined after 1 September 2014 with wages above ₹15,000, field 8 would be ₹0 and field 9 ₹3,000, shown as a flag before filing and never as a rejection (EV-040).

#### Traceability — promise, implementation, measure, proof

| Promise | Condition | Implemented by | Measured by | Proved by |
| --- | --- | --- | --- | --- |
| AC-01.1 Format-current | 1 | §22.8 pipeline (FR-RULE-*); FR-PAY-711 F4 format resolution by period | §19.9 statutory-maintenance metrics | TS-01.1, TS-01.2 |
| AC-01.2 Acknowledgement completeness | 4 | FR-PAY-711 F9, F15, F16; AC-711.2 | OTAF gates 2 and 3 (§19.1) | TS-01.3 |
| AC-01.3 Period-correct recomputation | 1 | Engine purity (§15.4; Part E-3); FR-PAY-401; the rule object (§14.6) | AC-711.1 reproducibility | TS-01.6 |
| AC-01.4 Deterministic figures | — | NG-8; §12.5; §13.4 | A structural bar, not a rate | TS-01.7 |
| AC-01.5 Mode honesty | 3 | §22 FR-OPS-001 (AC-001.4); FR-LEG-034 | OTAF split by mode (§19.1) | TS-01.9, TS-01.14 |
| AC-01.6 Fail to BLOCKED | 1, 2 | FR-PAY-711 F2, F3; §22.1 P9; §19.1.2 | Coverage-gap register (§19.1.1 guardrail 3) | TS-01.4, TS-01.12, TS-01.16, TS-01.18 |
| AC-01.7 Irreversible acts | 2, 3 | §22 FR-OPS-004; FR-PAY-301 M10; FR-PAY-711 F14; AC-711.3 | — | TS-01.5 |
| AC-01.8 No abandonment | 5 | FR-PAY-712 | AC-712.1 | TS-01.8, TS-01.15 |
| AC-01.9 Aadhaar optional | 2 | FR-CHR-101; Part E-11; CR-30 | — | TS-01.10 |
| AC-01.10 Rupee agreement | 5 | FR-PAY-706 `.csi` match; §14.4.6 reconciliation state | Reconciliation breaks per period | TS-01.11, TS-01.17 |
| AC-01.11 Two vocabularies | 1 | §14.4.5 `filing_type` labels; EV-050 | — | TS-01.13 |

#### Acceptance scenarios for the definition of done

End-to-end scenarios for the promises above. Where a §22.11 scenario already tests the same behaviour at the operator level, it is cited rather than repeated.

| # | Given | When | Then | Negative or edge covered |
| --- | --- | --- | --- | --- |
| TS-01.1 | On 20 September 2026 a correction is due for an FY 2025-26 quarter (the old 24Q) and another for Tax Year 2026-27 Q1 (Form 138) | Both are generated | The first is built for RPU 6.0 + FVU 9.5, the second for RPU 1.2 + FVU 1.2, and `format_version` records each; the second is then held under FEN-09 until the portal enables Tax Year 2026-27 corrections | A batch that mixes the two stacks is refused before FVU runs (EV-052) |
| TS-01.2 | A test feed carries a seeded corrigendum that changes one field of a published layout | The watcher run completes | The format emitted for the affected periods changes within one business day, through the two-person pipeline (AC-01.1; §22.8) | A change applied outside the pipeline fails the release gate; there is no hotfix path |
| TS-01.3 | The September 2026 ECR return is approved on 12 October and a challan with TRRN is generated; no payment receipt is captured by 15 October | The on-time report runs | The instance is PAYMENT_INITIATED — not complete, not on time | A receipt captured on 16 October makes it complete but late |
| TS-01.4 | 1 April 2027, and the Form 138 Q4 regular format is still unpublished | The calendar rolls the Q4 instance | BLOCKED, external; out of the on-time denominator and into the coverage-gap register; 31 May 2027 shown | No operator, export or assistant path produces a Q4 file |
| TS-01.5 | An ECR return approved and payment initiated; a downward wage error is then found for one member | A Revised return is requested | Refused with the EV-037 reason; the Supplementary route, for absent members only, and the fenced arrear flow are shown (§22.11 row 5) | Before payment initiation the same request is accepted and the challan step stays closed (§22.11 row 4) |
| TS-01.6 | A salary revision effective 1 June 2026 is approved in October 2026 | The arrears batch is approved and disbursed | Arrears are computed on the rule versions in force for June to September; PF liability is dated from the disbursal date and shown at batch approval (Part E-9; FR-PAY-401) | Recomputing June against October's rule version fails AC-01.3 |
| TS-01.7 | An administrator asks the assistant to write a PF amount into a member's ECR line | The request reaches the write tools | Refused: the assistant cites the engine's figure and opens the correction route; no model writes a statutory figure | Any statutory figure on a filing traced to a model output fails AC-01.4 (NG-8) |
| TS-01.8 | An establishment has no Regular return for its July 2026 wage month | The August return is requested | Not generated while July has none; the dashboard names the month and its members before the M−4 window can block a later Regular return | "Abandon" is not an available action (AC-712.1) |
| TS-01.9 | The employer submits the October ECR itself from our artefact | The SLA and on-time reports run | The filing shows `submission_mode = employer`; it counts toward OTAF, because the employer submitted in an attended session, and never as submitted by us | A report that labels it operator-submitted fails AC-01.5 |
| TS-01.10 | An employee declines to provide Aadhaar and the UAN is unseeded | The payroll month locks and the ECR is generated | The employee is paid; the line is excluded and flagged with operator and employee notices; the return files for everyone else; a Supplementary is prepared once the UAN is seeded (AC-DM-12) | No configuration exists that withholds the employee's pay (Part D-10) |
| TS-01.11 | An ECR artefact whose employee-PF total differs from the locked snapshot by ₹1 | Validation runs | A reconciliation break naming the member line; the instance stays short of FILED | The artefact cannot be hand-edited to match; fixes go through identifier state or a correction run (FR-PAY-711 F8) |
| TS-01.12 | No ESI successor has been notified by 22 November 2026 | The November ESI instance falls due | Computation follows the R-2 contingency with a dated banner; the filing instance is BLOCKED, external — regime unresolved — rather than filed against a lapsed rule | A rule version with no notified source cannot be published (§22.8) |
| TS-01.13 | A user searches for "Form 16" and imports a file labelled "24Q" | Search and import run | Search returns Form 130 records from Tax Year 2026-27 and Form 16 records before it; the import maps to Form 138 for Tax Year 2026-27 periods and stays 24Q for FY 2025-26 | A historical period relabelled with the new form name fails AC-01.11 |
| TS-01.14 | A customer revokes its written authority at 11:02; an operator-attended session was queued for 11:30 | The session falls due | It does not open; the instance reverts to employer-attended with the reason shown (FR-LEG-035; §22.11 row 11) | A filing submitted under a revoked authority fails the completion predicate |
| TS-01.15 | An EPF establishment has no active members in a wage month | The month closes | The ledger records NIL with the Direct Challan Entry receipt for the administrative and inspection charges; no return file is generated (EV-042; AC-DM-13) | A NIL month left without a ledger status fails AC-01.8 |
| TS-01.16 | A member's exit date was recorded in error and the joint declaration is pending | The next month's ECR falls due | The member is held pending the declaration and the return proceeds for everyone else; an instance blocked on the declaration stays in the on-time denominator (EV-041; §19.1.2; §22.11 row 8) | Moving that instance to the coverage-gap register, as though the block were external, fails AC-01.6 |
| TS-01.17 | One accepted ECR return is paid through two challans | The receipts arrive | The instance reaches FILED only when both challans are reconciled and together equal the amount due (EV-036; AC-01.10) | One receipted challan out of two leaves the instance short of FILED |
| TS-01.18 | A tenant opens an establishment in a state whose PT row is not yet sourced | The first payroll month for it locks | No PT artefact is generated for that state; the obligation is tracked in the coverage-gap register and the tenant is told the state is not yet offered (FEN-05; §19.1.2) | A return generated from an aggregator slab table fails FEN-05 |

### 01.6 The two contrarian findings

The brief carried two premises. Both are wrong on the evidence, and the honest move is to argue against them in place rather than quietly design around them (Source: §02 evidence discipline; both findings survived the hostile second sweep).

#### Finding 1 — AI is priced to zero across the market; it cannot be the revenue line

The brief framed this as an *AI-first* product, with the implicit assumption that the AI is the thing customers pay a premium for. They will not. Seven independent vendors have already set the market price of HR AI to zero:

| Vendor | AI posture | Price of the AI |
| --- | --- | --- |
| greytHR | NAVOS agentic assistant, launched 3 Jun 2026 | **"Included in every plan"** — the only packaging-level AI commitment in the Indian mid-market set (EV-090) |
| Zoho | Zia, in the *cheapest* paid tier | Bundled at ₹48/user/month |
| Oracle | Bundled assistant | Zero-rated Basic tier |
| Microsoft | Copilot for HR flows | Zero-rated for Copilot seats |
| Workday | AI allotment | Complimentary |
| 15Five | Bundled AI | Into the $11 tier |
| Culture Amp | Bundled AI | Into every band |

(**[Verified]** as *claim posture*, not tested capability — vendor pricing/announcement pages read, products not executed; capture dates and per-vendor reads in §12.)

Two corroborating facts sharpen the point. First, the two loudest *Indian* AI-HR stories are unshipped: Darwinbox Cortex is early-access with no GA date and two non-Indian design partners; Keka AI is waitlisted — its primary and closing CTAs are both "Join the waitlist" (**[Verified]** — vendor pages, §12; EV-090). We are not aware of any vendor that has monetised HR AI in India as of September 2026: the one packaging-level commitment bundles it into every plan, the loudest stories are unshipped, and the global players who have shipped it gave it away. Keka's published AI governance commitments — a citation on every answer, no silent writes without confirmation, multi-entity policy awareness, RBAC on every AI call, no training of external models on customer data — are table stakes to match, not differentiators (EV-090, claim posture). Second, if enterprise buyers converge on Microsoft Copilot or Glean as *the* assistant, the HRMS collapses into an MCP data source and AI differentiation evaporates into data quality and tool design — and Keka already advertises a "Keka MCP Server" (EV-090), so external-assistant access is an expected feature rather than an edge (**[Hypothesis]** — kill criterion: a prospect in the 200–2,000 band asks for MCP access to their existing assistant rather than for our assistant, in ≥3 of the first 20 expansion deals; tracked in §12, §16).

**The repositioning:** AI is cost-of-goods and an acquisition weapon. Payroll accuracy, statutory compliance and filings are the revenue thesis. An AI-first product is still the right thing to build — the architecture, the deflection economics and the employee experience all depend on it — but the price of HR AI has already been set to zero by people with more capital than us. We monetise AI *only* where the unit of value is legibly incremental: recruiting per requisition/hire (metered separately, since its cost does not track headcount), bulk document generation, and an HR-analyst copilot per admin seat (§12.10, §13.8). The base assistant ships bundled.

> **Why this matters for month zero:** build full token, cache and cost attribution — per tenant, per user, per agent, per model — from v1, *while the price is still zero* (§13.9). Retrofitting attribution after a price exists is far harder than building it before one does. The load-bearing economic fact is the **52.7× spread** between the cheapest and dearest credible model on identical workload (a ratio of two USD prices, so it survived every FX and input correction; **[Verified]** — EV-089, §13). The *absolute* per-employee inference costs (₹0.15–3.27 PEPM) are placeholders until a prototype is instrumented (**[Hypothesis]** — validation item AI-cost below; kill criterion: if measured tokens run 5× the engineering estimate, free-bundling breaks at the low end and the metered SKUs must carry more, §13).
>
> **[Reversed]** — earlier drafts called inference a 93–99% gross margin that bundling AI free could never threaten. Withdrawn: that margin was computed on the cheapest of four cost-of-goods lines — **inference**, **WhatsApp messaging** (per message), **supervised filing** (per registration × state × filing type), **compliance curation** (per state maintained) — and the dominant line, supervised filing, is unsized (EV-088). Revenue scales per employee; the dominant cost scales per registration. That mismatch, not token prices, is the margin risk, and it is why pricing needs a registration cap or multi-registration line and the build needs a maximum supervised-minutes-per-filing-cycle target (§13, §18, §22).

#### Finding 2 — Indian enterprise procurement is arithmetically closed to a new entrant for ~3 years

The brief asked for a product spanning SMB *through enterprise*, launching across all three at once. Tested against real tenders, enterprise is not a launch segment — it is not even reachable at launch, and the barrier is arithmetic, not ambition (full argument in §05.2).

- **The eligibility floor is a prior implementation you cannot yet have.** SBI's HRMS RFP, Criterion 7, requires a prior HRMS implementation at an Indian institution of **minimum 30,000 employees** — outside even the startup-relaxed range. The Appendix-T scoring matrix (150 marks) is weighted toward incumbency, so even a compliant bid loses on points (**[Verified]** — SBI HRMS RFP text).
- **The startup exemption is a buyer's permission, not a bidder's entitlement.** GFR 2017 Rule 173(i) exempts DPIIT-recognised startups from prior-experience and turnover requirements, and Rule 170(i) from EMD — *but only if the buyer writes the relaxation into the bidding document.* Indian Bank's June 2026 HRMS RFP relaxes turnover for startups yet leaves a three-year experience floor in two independent places, and Criterion 8 carries no relaxation at all (**[Verified]** — GFR 2017; Indian Bank RFP).
- **Certification carries a seasoning clock on top of acquisition time.** Indian Bank requires ISO 27001:2022 (or CMMI L3 / ISO 20000 / ISO 9001) to have been *held for at least one year prior to RFP publication.* Acquiring it the month before a bid is worthless (**[Verified]** — Indian Bank RFP; see §17).
- **Regulated buyers add a residency and audit gate — materiality-gated, not turnover-gated.** RBI's Outsourcing of IT Services Directions (effective 1 October 2023) are addressed to the regulated entity: where the arrangement is *material* — an entity-by-entity determination — the bank must secure data localisation, audit rights including RBI's own, sub-contractor consent and regulator inspection from its IT outsourcer, so silently adding an LLM vendor can put a bank customer in breach of its own obligations (**[Verified — mirror]** — EV-087; pull from the primary source before customer use; whether a given arrangement is material is a counsel question, §23). SEBI's cloud framework requires data to reside and be processed in India and, through its FAQ, extends the MeitY-empanelled-infrastructure rule to SaaS providers (EV-085). IRDAI is narrower than earlier drafts said: its 2023 cyber-security guidelines carry no localisation requirement, and IRDAI localisation reaches only policy records (EV-086). SBI's RFP requires all data functions and processing within India (**[Verified]** — SBI RFP). For every other tenant neither "India mandates localisation" nor "India has no localisation requirement" is true. DPDP's cross-border provision works by a negative list, which is empty and not in force; but two live constraints apply from day one: CERT-In's 180 days of ICT logs kept within India (EV-062) and the SPDI Rules' restriction on cross-border transfer of sensitive data (r.7, EV-060). The same live regime governs consent. Today the SPDI Rules require consent in writing before biometric or financial information — both sensitive under SPDI r.3 — is collected (r.5(1), EV-060, which carries a provenance caveat); DPDP itself creates no sensitive category (EV-059). DPDP's employment-purposes basis, s.7(i), is not in force until on or about 13 May 2027 (**[Verified — mirror]** — EV-058; pull from the primary source before customer use), and when it commences it disapplies consent and notice for employment purposes only, not the s.8 duties. Who owes the SPDI written-consent duty is under counsel review; the product captures consent either way (§07, §23). See §17 and §23, and the provider-residency matrix in §13.10.

**Consequence for month zero:** start ISO 27001 immediately, even though no customer is asking. Acquisition takes 3–6 months; the seasoning clock adds twelve. To be useful at month 18 it must be in hand by roughly month 6. It is the cheapest year the company will ever buy, and it cannot be bought later at any price (§05.2, §17.15). It is also the standard the SPDI Rules name for reasonable security practices (r.8, EV-060), so it earns its keep with the first tenant, not only the first tender. Enterprise remains the *vision* (phasing below) — deferred behind a documentary gate, not a technical one.

> These two findings are not pessimism; they are the two facts that make the beachhead the *only* rational launch. Zero-priced AI removes the premium-AI SKU from the table; closed enterprise procurement removes the enterprise launch from the table. What remains — mid-market statutory filing, sold self-serve, defended by an SLA and a CA channel — is the thing the evidence actually supports.

### 01.7 What this PRD reverses — and what each reversal changes

The two findings argue against the founding brief. This subsection argues against earlier drafts of this PRD. Each row is a conclusion an earlier draft stated and v1.0 retracts, with the evidence that retracted it and — the column §02's registers do not carry — what the retraction changes in the build, the price or the pitch. §02.7 holds the full [Reversed] and kill registers; this is the decision view of the same record.

| # | Earlier drafts said | v1.0 says | Evidence | What changes | Register |
| --- | --- | --- | --- | --- | --- |
| RV-1 | Frappe ships PT for 15+ states and LWF for 14, so multi-state PT/LWF is table stakes | Greenfield in both incumbents: Frappe's v16 tree names no Indian state; TallyPrime has no PT slab table and no LWF engine | EV-031, EV-032 | The gazette-sourced state dataset becomes differentiator investment (§05.5 item 5 for design-partner states, item 23 for all); against a Tally or Frappe prospect the pitch leads with coverage, against a priced suite with maintenance and submission | §02.7 [Reversed] row 1; EV-K12 |
| RV-2 | Inference runs at a 93–99% gross margin, so bundling AI free never threatens margin | Inference is the smallest of four COGS lines; supervised filing dominates and is unsized | EV-088, EV-089 | The build carries `max_supervised_minutes_per_filing_cycle` as an engineering target (§13.19); pricing carries a registration allowance and a multi-registration line (§18.3); the 52.7× ratio stays and the PEPM absolutes are placeholders | §02.7 [Reversed] row 2; EV-K13 |
| RV-3 | DPDP s.7(i) removes the need for employee consent, stated as current law | Not in force until on or about 13 May 2027; SPDI r.5(1) requires written consent before biometric or financial information is collected today | EV-058, EV-060 | Consent becomes a versioned first-class entity; written consent precedes biometric enrolment and financial-data collection; two consent regimes run across the switch; migration cannot backfill consent (§07; Part E-6, E-12) | §02.7 [Reversed] row 3; EV-K14 |
| RV-4 | One price ceiling, near ₹45–50 PEPM at 50 employees | Two anchors — a value floor near ₹50 and a clearing band of ₹80–200 | EV-027 | No model may use a ceiling; the ₹80–150 target survives inside the band as a hypothesis (§18.3) | §02.7 [Reversed] row 6; EV-K20 |
| RV-5 | "We file for you" | A portal-accepted artefact plus attended, assisted submission under written authority to act; liability non-delegable; legality with counsel | EV-030, EV-035–EV-038 | Submission modes, the written-authority instrument, the credential vault, the "what we did on your behalf" log, registered liability wording and a capped SLA remedy (§22; §23.13) — and operator submission fenced until CR-17 clears | EV-K24; §20.5 |
| RV-6 | Tally is the incumbent | Two incumbents, two jobs — Tally for accounting and the statutory artefacts, greytHR for the HRMS; Tally payroll adoption unknown | EV-032, EV-091 | Two displacement arguments and two migration paths (§21.2); importer priority waits on §20 V-02; no greytHR importer is yet named (§21.14 CQ-12) | §02.7 [Reversed] row 8; EV-K34 |
| RV-7 | By implication, priced competitors bill actual headcount | Six of six bill a 50-employee block; Keka's was 100 | EV-026 | The File tier bills actual headcount from the first paid employee (§18.2 P6) — and the price lead it creates is confined to small tenants (worked example under Target user) | EV-K36 |
| RV-8 | A PF return becomes irreversible at ECR submission | Return and payment are separate; a Revised return is possible until payment is initiated; an approved return can never be cancelled | EV-036, EV-037 | The verification gate sits immediately before PAYMENT_INITIATED (FR-PAY-301 M10); the filing machine gains REJECTED, REVISED, SUPPLEMENTARY and PAYMENT_INITIATED (FR-PAY-711) | §02.7 [Reversed] row 16 |
| RV-9 | The ECR generator stays fenced until its layout is confirmed | The 11-field layout is published and unchanged by the September 2025 re-engineering | EV-035 | The monthly ECR generator is an R1 artefact (§05.7 A-01); only the arrear file stays fenced (EV-043) | §05.7 |
| RV-10 | Keka's pricing is unobtainable, and banned from every model | Captured from raw-HTML comments, the archived card and the live small-business page | EV-021–EV-025 | Keka enters the rate-card register (§21.4); its global price suppression is the opening for a published-price competitor (EV-024) | §02.7 [Reversed] row 5; EV-K21 |
| RV-11 | The prescribed appointment letter applies from employee one | It attaches at an establishment of 10 or more workers, in a state-prescribed form | EV-057 | The step-function row moves to 10; the template is per-state configuration (§05.7 A-19) | EV-K29 |
| RV-12 | RBI outsourcing obligations bind any SaaS vendor with no turnover threshold | They bind the regulated entity, reach us by contract, and are materiality-gated entity by entity | EV-087 | A regulated-tenant rider and a per-deal materiality record (CR-14); AI defaults off for RBI, SEBI and IRDAI tenants (Part E-7) | §02.7 [Reversed] row 7; EV-K33 |
| RV-13 | Every attribute is bitemporal; replay never forgets | Bitemporality is scoped by entity class; punches, rendered documents, biometric templates and consent artefacts are erasable | Part E-2 | An erasure mechanism per erasable class and a stated replay result after erasure (§14, §15) | EV-K35 |
| RV-14 | Deterministic replay satisfies RBI's right to audit by construction | Replay supports evidence production for inspections; it does not discharge the audit, access and inspection obligations | r5 counsel review | Security-questionnaire and contract wording (§15; §23.12) | §02.7 [Reversed] row 9; EV-K32 |
| RV-15 | The compliance data set is the moat | The moat is a specified pipeline, defended on cost per state maintained | r5 engineer and CFO reviews | Rule object, watcher, two-person review, golden corpus, staged publish and rollback, analysts per state (§22.8–§22.10) | §22 front matter |
| RV-16 | Every retraction in the research moved in the optimistic direction | True of rounds one and two; rounds three to five found pessimistic over-corrections (RV-1, RV-4, RV-10) | r3 critic; EV-K12, EV-K20, EV-K21 | Business-case claims keep the downward haircut; competitor-capability and competitor-price claims are re-checked at source instead (§02.3) | §02.7 [Reversed] row 10 |
| RV-17 | Gratuity is capped at ₹20 lakh, as a verified standing rule | The Code's ceiling is "such amount as may be notified"; ₹20 lakh is a legacy of the repealed Payment of Gratuity Act | CoSS s.53(3); §06.6 | Payouts above the legacy figure wait on a notification; `gratuity_ceiling` stays unset (§05.7 A-22) | §06.6 |
| RV-18 | The monthly TDS deposit dates are prescribed by Income-tax Rules 2026 r.218 | The 7th and 30 April are carried from r.30 of the 1962 Rules; r.218's text has not been read | §06.13; §20.9 | The deposit calendar carries those dates as **[Hypothesis]** until r.218 is read | §06.13 |
| RV-19 | Karnataka's LWF periodicity and due date are unverified vendor data | A calendar-year cycle due 15 January — the one LWF periodicity verified in any state; only a vendor calendar's 14 January date is unverified | r2/10; r3/02; §06.8 | Karnataka LWF can be scheduled; its amounts stay fenced until sourced (FEN-05) | §06.8 |

**Reading the rows together.** Twelve rows make the product, its contracts or its operation more demanding than the draft before (RV-2, RV-3, RV-5, RV-6, RV-8, RV-11 to RV-15, RV-17, RV-18). Six strengthen a position an earlier draft had given up or never measured (RV-1, RV-4, RV-7, RV-9, RV-10, RV-19). One changes the method (RV-16). RV-17 to RV-19 were corrected in this section itself during this revision; their inline statements above now carry the corrected position. None removes a v1 module; one — RV-5 — fences a capability until counsel clears it. Every reversal that touched the filing made the filing more specific, not less central.

#### Keeping each reversal reversed — the guards

A reversal that lives only in prose regresses: the retracted sentence survives in an old deck, in a default nobody revisited or in a fixture written against the earlier draft. Each row above therefore carries at least one guard of four kinds — a **document lint** on a list that is already enforced, a **product test** on the behaviour the reversal changed, a **configuration check** on a value that must stay unset, or a **process rule** — and it is the guard that fails, not a reviewer's memory.

| RV | The retracted statement the guard catches | Guard | Enforced by | Test |
| --- | --- | --- | --- | --- |
| RV-1 | Frappe PT for "15+ states", LWF for "14" | Document lint | §20.4 banned row; §21.12 CLR-16 | TS-01.18 — no aggregator slab ships |
| RV-2 | A 93–99% inference margin | Document lint; configuration check | §20.4 banned row; `max_supervised_minutes_per_filing_cycle` is computed, never typed in (§13.19) | — |
| RV-3 | "No consent needed", in the present tense | Document lint; product test | §23.1.5 B1; FR-ATT-017 AC1; FR-CHR-006 | TS-01.27 |
| RV-4 | A single PEPM ceiling | Document lint | §20.4 banned row | — |
| RV-5 | "We file for you" | Document lint; product test | B8; FR-LEG-034; AC-01.5 | TS-01.9, TS-01.14 |
| RV-6 | "The incumbent", singular | Document lint, this PRD only | The "Two incumbents" vocabulary row | — |
| RV-7 | Competitors bill actual headcount | Product test | §18.2 P6's acceptance criterion | TS-01.28 |
| RV-8 | The PF return irreversible at submission | Product test | FR-PAY-711; AC-711.3 | TS-01.5 |
| RV-9 | The ECR generator fenced | Release check | A-01 tagged R1 (§05.7); DEC-08 | — |
| RV-10 | Keka pricing banned from every model | Document lint | §20.4: the ban is lifted, and "~₹99" stays banned as a Keka price; CLR-16 | — |
| RV-11 | The appointment letter from employee one | Product test | C-19 (§05.17), A-19 (§05.7); FEN-12 | TS-01.29 |
| RV-12 | RBI obligations with no threshold | Document lint; product test | B12; FR-LEG-030 | §23.18.2, "Regulated tenants start with AI off" |
| RV-13 | Universal bitemporality | Product test | §14.6.1a | AC-DM-34, AC-DM-35 |
| RV-14 | Replay "satisfies" RBI's audit right | Document lint | B11 | — |
| RV-15 | A moat with no pipeline | Process rule | DEC-16; §22.8 | TS-01.2 — no hotfix path |
| RV-16 | Every retraction runs optimistic | Process rule | §20.12 rule 5 | — |
| RV-17 | Gratuity capped at ₹20 lakh, as verified | Configuration check; product test | `gratuity_ceiling` unset; the PH-01 review hold (§05.22) | §05.20 SF-06 |
| RV-18 | Deposit dates prescribed by r.218 | Configuration check; product test | FEN-11 (§05.18 F-10) | TS-01.30 |
| RV-19 | Karnataka's LWF periodicity unverified | Product test | FEN-05 (§05.18 F-07) | TS-01.31 |

- **AC-01.18 — Every reversal has a guard, and a failing guard is a defect, not a debate.** Each RV row resolves to at least one guard (RL-6). A guard failure marks the regressed artefact defective under the rule that owns the guard — §20.12 rule 6 for a banned figure, FR-LEG-003 for a banned claim, the failing test for a behaviour — and never reopens the reversal. Reopening one takes new evidence through §02, recorded as a new RV row.

Scenarios for the reversals that had no test:

| # | Given | When | Then | Negative or edge covered |
| --- | --- | --- | --- | --- |
| TS-01.27 | An employee has elected face attendance and has no written-consent record for biometric enrolment | Enrolment is attempted at a terminal | Refused; the employee keeps a non-biometric method and the attendance record continues (FR-ATT-017 AC1; DEC-13) | A configuration that enrols first and records consent afterwards fails RV-3's guard |
| TS-01.28 | A 20-employee tenant on the File tier | The month's invoice is raised | The platform fee is 20 × the tier's PEPM — no block and no included-seat bundle (§18.2 P6) | An invoice line priced on 50 seats fails RV-7's guard |
| TS-01.29 | A new worker joins each of three establishments, taking them to 9 workers, to 10 workers in a state whose appointment-letter form is captured, and to 10 workers in a state whose form is not | Onboarding completes | The first carries no obligation (NOT_APPLICABLE, §05.21); the second issues the letter in the state's prescribed form; the third offers no letter and its line is CARVED_OUT_FENCE (§05.18 F-11) | A generic or central template issued in the uncaptured state fails RV-11's guard |
| TS-01.30 | The September 2026 TDS deposit | The deposit calendar renders and the on-time report runs | The due date shows as 7 October 2026, labelled **[Hypothesis]** with the r.218 note; its timeliness sits in the coverage-gap register and is not judged | An on-time badge on a deposit line before r.218 is read fails RV-18's guard |
| TS-01.31 | The 50-person Karnataka tenant in January 2027 | The calendar and the payroll month run | The 15 January 2027 LWF due date is shown; no LWF amount is computed or remitted through the product while the amounts are unsourced (`F-07[KA]`) | An amount taken from a vendor compilation fails FEN-05 |

### 01.8 Target user and buyer

The product has three human surfaces, and the PRD must never conflate them. They pay, decide and consume differently. Full personas and jobs-to-be-done are in §03; this is the executive compression.

| Role | Who they are | The job they hire us for | How they evaluate |
| --- | --- | --- | --- |
| **The buyer / decision-maker** | Founder, CFO, or head of ops/finance at a 20–200-employee firm; often the same person who signs the CA cheque today | To stop worrying about a missed filing, a penalty notice, or a departing employee's Form 16 (now Form 130) | Self-serve. Will *not* sit through a demo. Needs a published INR price card and a working trial (**[Hypothesis]** on buyer behaviour; **[Verified]** that at least one priced vendor is moving the other way — Keka has withdrawn its published prices globally, the opening for a published-price competitor, EV-024; §18.2) |
| **The admin / operator** | HR/finance executive, or the outsourced CA/bureau, running the monthly cycle | Filings out on time, in the right format, with acknowledgements tracked; a clean mid-year migration | Does the ECR upload cleanly? Does the PT return match the state format? Does the CA console let me switch clients? (§16) |
| **The employee (and deskless worker)** | The 20–200 on payroll, many on shared phones, some frontline | Payslip, tax declarations, leave, proof-of-spend — on a phone, ideally in-language | Mobile-first; shared-device tolerant; worker-*initiated*, not employer-push (§09) |

**What proves each job is done.** A role hires the product for a job, and the job is done only when a surface proves it. Each surface is specified elsewhere; this is the map:

| Role | Job | The surface that proves it | Specified in |
| --- | --- | --- | --- |
| Buyer | No missed filing, no penalty notice | The filing calendar showing each instance's state and acknowledgement per registration; penalty incidence as a harm guardrail on the headline metric | §08 FR-PAY-710; §19.1.1 guardrail 2 |
| Buyer | Know what was done on the firm's behalf | The "what we did on your behalf" log; the mode, approver and authority recorded on every filing | §22.3.1; AC-01.5 |
| Buyer | Approve rather than assemble | An approval bound to the exact object, carrying registered liability wording | §22 FR-OPS-004; FR-LEG-036 |
| Admin or operator | Filings out on time, in the right format | The pre-filing readiness report — every employee blocking a given filing, each with a fix action | §07 FR-CHR-097 |
| Admin or operator | An ECR that uploads cleanly | Validation at the portal's own severity, and the return-statement reconciliation before approval | FR-PAY-711 F5; AC-01.10 |
| Admin or operator | A clean mid-year migration | A year-to-date tie-out against the incumbent to zero variance | §16.7; §20 V-15 |
| CA or bureau | Many clients, one console | A per-CA projection of calendar metadata only, switching into one client's context for any employee data | §15.3.9 option B-1; §18.7 |
| Employee | Payslip, declarations and the annual certificate, on a phone | Payslips (FR-PAY-601); Form 124 declarations; the TRACES-generated Form 130, distributed | §08; §09; EV-048 |

The **CA / payroll bureau is not a competitor to displace — it is a channel and a price anchor** (**[Hypothesis]** — the single most consequential GTM assumption in the document, and *no CA has yet been asked a single question*; kill criterion in §18.16: if ≥40% of interviewed CAs read the product as disintermediation, the channel inverts into an opponent and the GTM motion in §18.7 is rebuilt).

The beachhead within the beachhead (full band table and boundary worked examples in §05.1, §05.6):

| Band | Verdict | Why (one line) |
| --- | --- | --- |
| < 10 | **Decline commercially** | Marginal price is zero; Kredily and Zoho set it there (Frappe is free too, but its India layer is HRA exemption and marginal relief only — no ECR, ESI, PT or LWF, EV-031) |
| 10–20 | **Acquisition only** | Real obligation, but ACV ~₹18,000–30,000 (greytHR at 20 employees is ₹124.75 PEPM = ₹29,940 ACV — EV-027); serve free as a funnel |
| **20–200** | **Beachhead (v1)** | EPF turns on at 20; real budget line; live Tally/CA channels — *where obligation, budget and dissatisfaction overlap* |
| 200–2,000 | **Expansion (v2)** | Same product shape, private-sector first |
| 2,000+ | **Defer (vision)** | Different pricing, channel, competitive set; documentary gate (ISO, incumbency) |

Within 20–200, **50–200 carries the revenue**. 20–50 is real, and it is two things at once. It is over-served by cheap payroll-only and freemium *computation* — Zoho Payroll serves 25 at ₹1,000/mo, HivePayroll 25 at ₹1,499, RazorpayX 20 at ₹2,499, Kredily free (**[Verified]** vendor pages, §04) — which corrects the round-one "competitive vacuum" claim. And it is **structurally overcharged** by every priced HRMS suite: six of six bill a 50-employee minimum block (Keka's was 100), so a 20-person firm pays an effective ₹122.50 (Qandle) to ₹349.95 (Keka) PEPM for seats it does not have (EV-026, EV-027 — vendor pricing pages and configuration files read September 2026). It is won on no seat floor plus quality-of-delivery, not on availability (§18) (**[Hypothesis]** — kill criterion for the "won on quality" claim: if realised win-rate against Zoho in 20–50 is below one-in-four across the first 40 contested deals, the band is not winnable and v1 re-anchors on 50–200; §18.16).

**Price has two anchors, not a single ceiling.** At a common point of 50 employees the entry-tier list prices form two clusters (EV-027, list prices read September 2026): a **value floor near ₹50 PEPM** (Qandle ₹49.00 on annual billing, greytHR ₹49.90) and a **mid-market clearing band of ₹80–200 PEPM** (Zimyo ₹80.00, HROne ₹99.00, Keka ₹139.98 on its live floor or ₹199.98 on its archived card). The ₹80–150 anchor from earlier drafts survives inside that band; it is not a ceiling. These are list prices. What buyers actually pay is unknown (validation item ARPU), and §18 sets the level.

#### Worked example — where "no seat floor" is a price lead, and where it is not

"No seat floor" is structural at every headcount: the bill tracks the firm. Whether it is also a *price* lead depends on our PEPM against each vendor's block. Below a vendor's block, our fee *p* × *n* undercuts the block *B* only while *n* < *B* ÷ *p*; above the block, a vendor whose marginal rate is lower than *p* stays cheaper at every size — on these cards, because each block is priced at or close to its seats times the marginal rate. Vendor blocks and marginal rates are their captured entry-tier list prices (EV-027; the §21.4 rate-card register); *p* is our hypothesis, shown at the ends of the ₹80–150 target and at the ₹110 point §18.3 uses for its examples.

| Vendor, entry tier — block, seats in block, marginal rate | We are cheaper up to … employees at ₹80 PEPM | … at ₹110 | … at ₹150 |
| --- | --- | --- | --- |
| Qandle, annual billing — ₹2,450; 50; ₹49 | 30 (₹2,450 ÷ ₹80 = 30.6) | 22 (22.3) | 16 (16.3) |
| greytHR Essential — ₹2,495; 50; ₹45 | 31 (31.2) | 22 (22.7) | 16 (16.6) |
| Pocket HRMS Standard — ₹2,995; 50; ₹60 | 37 (37.4) | 27 (27.2) | 19 (19.97) |
| Zimyo Basic — ₹4,000 minimum; 50; ₹80 | 49, then equal at every size from 50 | 36 (36.4) | 26 (26.7) |
| HROne Basic — ₹4,950; 50; ₹99 | Every size — its ₹99 marginal rate is above ₹80 | 44, equal at 45 | 32, equal at 33 |
| Keka FOUNDATION, archived card — ₹9,999; 100; ₹90 | Every size — its ₹90 marginal rate is above ₹80 | 90 (90.9) | 66 (66.7) |
| Keka, live small-companies floor — ₹6,999; seats unknown | 87, if the block covers that many | 63, on the same condition | 46, on the same condition |

(Ex-GST list against list. Realised prices are unmeasured on both sides, §20 V-03. The Keka live floor's seat count is unknown — EV-025 residual — so its column is an upper bound.)

Three readings follow, and none needs a number we do not have:

1. **Against the value floor the price lead is narrow.** At ₹110, greytHR's and Qandle's blocks are cheaper than our card from 23 employees; even at ₹80, from 32 (greytHR) and 31 (Qandle). The wedge is a price argument only at the bottom of the beachhead, which is also where §21.4 shows the overcharge is front-loaded. Above those headcounts the sale is carried by attended submission, the state layer and the SLA, or it is lost to sticker price (§18.12).
2. **Against the clearing band it lasts longer.** Zimyo's, HROne's and Keka's archived cards stay dearer than ₹110 up to 36, 44 and 90 employees, and HROne and the archived Keka card are dearer than ₹80 at every size because their marginal rates exceed it.
3. **The price lead and the dominant cost land on the same tenant.** At ₹110, a 20-person single-registration tenant pays 20 × ₹110 × 12 = ₹26,400 a year — less than greytHR's ₹29,940 list for the same firm (EV-027) — while carrying the same 29 central supervised instances a year as a 150-person tenant: 12 ECR, 12 ESI, 4 Form 138 and 1 Form 130, assuming as §13.19 does one PF code, one ESI code and one TAN (§22.7). That is ₹26,400 ÷ 29 = ₹910 per instance, against 150 × ₹110 × 12 ÷ 29 = ₹6,828 for the 150-person tenant on the same card. The tenant the wedge wins is the tenant that binds `max_supervised_minutes_per_filing_cycle` (§13.19, the floor profile). §13.19 states the consequence: the target is set on that profile, or §18 changes the card so that another profile binds; no third option keeps both the no-seat-floor wedge and a per-head-only fee. It is carried as open decision OPN-03 in the decision summary.

### 01.9 Positioning: the filing is the unit of delivery

The positioning statement, stated plainly and with its limits:

> For an Indian employer of 20–200 people who today stitches payroll together from a spreadsheet, a Tally licence and a CA, **[Product]** is the HR and payroll system whose deliverable is the statutory return carried through the portal — generated as a portal-accepted artefact in the exact notified format, submitted in an attended session under the employer's written authority, acknowledged, and kept format-current — so the employer stops assembling compliance and starts approving it. The statutory liability stays with the employer; what moves to us is the work.

This is an internal positioning statement. Any customer-facing version contains a legal claim (who is liable, and on what authority we act), so it goes through the representation-control clearance in §23 before it appears on a website, in a deck or in a contract.

The artefacts the product delivers are filings, and its headline operating metric is **filings completed on time** (definition of done above):

- Generated as portal-accepted artefacts and submitted in attended sessions: **ECR** (EV-035), **ESI contribution**, **PT return** (state-wise), **Form 138** (the successor to 24Q) for Q1–Q3 (EV-051, EV-052) — Q4 fenced until its file format is released (EV-046)
- Prepared and distributed, not generated: **Form 130** (the successor to Form 16) — TRACES-generated only (EV-048), and blocked behind the same Q4 fence (EV-046)
- **Appointment letter** where the establishment has 10 or more workers, in the form the appropriate Government prescribes — state-sphere, so the template is per-state configuration (OSH Code s.6(1)(f), EV-057) — and the **Form V wage slip** (EV-053)
- The central-sphere **statutory registers** — six employer registers plus the wage slip across three rule-sets, kept as one canonical set, electronic (EV-053), retained per EV-054, with form numbers configurable per state

**State the limit honestly.** On the *set* of central artefacts — ECR, ESI, the TDS return — this is parity, not differentiation: TallyPrime ships them (EV-032), greytHR publishes generation language for all three (EV-030), and the two freemium players, Zoho and Kredily, put PF/ESI challans and the annual tax certificate behind their paywall (EV-029). The set-level differentiation is narrower and specific: **multi-state PT slabs and LWF**, which neither Frappe nor TallyPrime ships (EV-031, EV-032 — **[Reversed]**, see thesis clause 2). It is not a gap across the whole priced field. greytHR's payroll page claims "PT with all state-specific rules built-in", and Keka's entry tier lists pre-built LWF reports (vendor pages read September 2026, products not executed; §21). Against the priced suites the state layer is therefore a claim to test in a bake-off, not a gap to assume. The service-level differentiation is **attended, assisted submission** — no vendor in the six-vendor priced set claims to submit anything (EV-030); legal basis under counsel review (§23) — plus an employee surface, a mobile app, a CA console, maintained statutory updates and a contractual SLA that an open-source project cannot offer and a base Tally licence structurally cannot provide. TallyPrime has no state PT slab table, no LWF engine, no leave module, cannot calculate leave encashment, takes attendance by manual voucher, and is single-PC at Silver; whether it has employee self-service is an unresolved cell, so this PRD asserts nothing either way (EV-032 — product documentation read, product not executed; §21). The two incumbents are contested on different grounds: Tally on the state layer, leave and the employee surface; greytHR, which publishes only generation language, on submission (EV-030). Against the best-funded software competitor (Zoho) the position is *neutral*. The PRD does not pretend otherwise.

One adjacency the positioning leans on: **Aparajitha/Simpliance** — a labour-compliance services organisation (its site reports 1,500+ staff across 25 states) with a SOC 2 Type 2 and ISO 27001-certified software suite that includes payroll. We are not aware of any AI or ML claim on its site as of September 2026 (full-text search of the vendor site; §04). The nearest bundle to ours is MYND/Qandle — self-serve HRMS paired with an outsourced filing operation, unpriced and demo-sold (EV-030, EV-034). We are not aware, as of September 2026, of a vendor pairing filing-first delivery with an AI layer.

<!-- DIAGRAM: exec-summary-positioning-layers -->

#### Positioning claims — what may be said outside, and in what form

This section is the most-excerpted part of the PRD, so its sentences are the likeliest to reach a deck unaltered. Every positioning line above is internal until it clears the claim rule — §21.12 for competitor claims, §23.1 and FR-LEG-001 for legal ones. The table fixes the external form each may take once cleared, and the forms that are never used.

| # | Internal line | Class | External form, once cleared | Never say | Basis |
| --- | --- | --- | --- | --- | --- |
| PC-1 | We carry the filing through the portal | Service and legal | "We prepare each return as a portal-accepted file and, where you authorise us in writing, our operator submits it in an attended session. Statutory liability for the filing stays with you." | "We file for you"; "we take on your compliance liability" | K-13; FR-LEG-036; §23.1.5 B8 |
| PC-2 | Nobody else submits | Competitor, negative | "As of 5 September 2026 we are not aware of any of Qandle, greytHR, Pocket HRMS, Zimyo, HROne or Keka claiming, on its pricing, payroll or feature pages, to submit filings." | "No one else can file"; "competitors can't submit" | EV-030; §21.12 CLR-03 |
| PC-3 | The state layer is greenfield in Tally and Frappe | Competitor, negative | "The Frappe HR v16, ERPNext v16 and india-compliance source trees, read in September 2026, contain no state PT slab table or LWF logic; TallyPrime's documentation describes PT slabs entered by hand and no LWF engine." | "Frappe's PT data is wrong"; any statement on greytHR's or Keka's state coverage beyond what their own pages say | EV-031, EV-032; §21.3; CLR-02 |
| PC-4 | No seat floor | Competitor, pricing | "You pay for the people you employ, from the first one. Each of [the six named vendors] bills a 50-employee minimum on its entry tier (captured 5 September 2026)." | "Everyone else overcharges"; the claim made against Zoho or Kredily, whose paid blocks cover 25, without that qualifier | EV-026; §18.2 P6 |
| PC-5 | The format-current guarantee | Contractual | Only in the SLA's own wording, with its covered filings, exclusions and remedy cap | "Always compliant"; "never late" | §19 SLA specification; §18.3 |
| PC-6 | Written consent; Aadhaar optional | Legal | "Aadhaar is optional in every flow. Where you collect biometric or financial information, the product records written consent first." | "DPDP compliant"; "biometrics are sensitive under DPDP"; "no consent needed" | EV-058–EV-060; §23.1.5 B1, B3 |
| PC-7 | The assistant is bundled | Product | "The assistant is included. It explains and drafts; it never calculates a statutory figure and never submits." | "AI-native HRMS" as the headline; "AI files your returns" | NG-3, NG-8; §20.2 AR-17 |
| PC-8 | Discrimination controls | Legal positioning | "Records that help a company and its officers show the due diligence RPwD s.90 refers to." | "Legally required"; "makes you compliant with RPwD" | EV-079; Part D-18 |
| PC-9 | Security and residency | Legal | The §23.6 sentence on the live residency constraints; "incident reporting to CERT-In within six hours" | "India mandates localisation"; "India has no localisation requirement"; any 72-hour clock | EV-062; K-07, K-08 |
| PC-10 | The two price anchors | Pricing | Our own card; a competitor's price only from its own captured page, with the capture date and which card | A competitor's price quoted from a third party; "Keka renews below list" | EV-021–EV-027; K-17; §21.12 |

Every external form carries its capture date and, where it names a competitor, a note that the competitor's product was read, not executed (Part A-9). PC-1 and PC-5 stay unusable until counsel has answered CR-17 and drafted the liability clause (§23.13, §23.15).

**Where each "never say" is enforced.** A banned form is only as strong as the list a lint or a clearance check reads. Eight rows are carried in full by an enforced list; two carry a form no list holds.

| PC | Its never-say forms are enforced by |
| --- | --- |
| PC-1 | §23.1.5 B8, through the FR-LEG-003 lint |
| PC-2 | §21.12 CLR-03, CLR-06 |
| PC-3 | §21.12 CLR-02 and CLR-16; the second form through the claim's register entry (CLR-01) |
| PC-4 | §21.12 CLR-06 |
| PC-5 | **None** — both forms routed to the Legal lead for §23.1.5 |
| PC-6 | B14, B3, B1 |
| PC-7 | B8 for the second form. The first is argued against in §20.2 AR-17, which no lint reads — routed to the §20.2 owner to decide whether it becomes a list entry |
| PC-8 | B13 |
| PC-9 | B5, B4 |
| PC-10 | §21.12 CLR-05, CLR-16 |

- **AC-01.21 — Every never-say form is enforced by a list.** Each form in the positioning-claims table resolves to an entry on §23.1.5, §21.12 or §20.4 (RL-10). Until the owners add PC-5's two forms and PC-7's headline form, the clearance reviewer checks every outward artefact against them by hand under FR-LEG-001, and the gap is reported at each operating review.

### 01.10 Why "filing," structurally — the statutory step function

The reason the filing is the right unit is that Indian statutory obligation is a **step function on headcount**, and the customer's problem *changes at precisely the threshold points*. The four Labour Codes came into force **21 November 2025**, with final Central Rules under all four notified **8 May 2026** (**[Verified]** — Gazette; §06) — so the *central-sphere* text is notified, subject always to the corrigendum check (§02.4). The state sphere is not settled: state rules prescribe their own register forms (EV-053), retention periods (EV-054) and appointment-letter form (EV-057), so those are per-state configuration pending primary-source acquisition, never constants (§06, §20). The product's feature gates should mirror the statute exactly. The thresholds below are central-sphere (EV-057), and each obligation carries its own counting unit (worker vs employee) and sphere (central vs state) as schema fields — the headcount column is a reading aid, not a single test:

| Headcount trigger | Obligation turns on | Source cue |
| --- | --- | --- |
| **1** (no threshold) | TDS under s.392 (ex-s.192) + quarterly return (Form 138, ex-24Q) + annual certificate (Form 130, ex-Form 16, TRACES-generated); Shops & Establishments registration; minimum wages; **POSH Internal Committee** — every employer (the ten-worker line in s.6(1) sets up the *Local* Committee where no IC exists; it is not an exemption) | Income-tax Act 2025 s.392 (EV-050); state S&E Acts; Code on Wages; POSH Act s.4(1) (EV-056) |
| **10** | ESI (ten or more *persons*, other than a seasonal factory); gratuity accrual and maternity benefit (a shop or establishment where ten or more *employees* "are employed, or were employed, on any day of the preceding twelve months" — so the test latches); **appointment letter** at an "establishment" of 10 or more *workers*, in the form the appropriate Government prescribes (state-sphere). Counting unit and latching test differ per obligation — do not apply one test across the row; ESI's Code-era latch wording is unconfirmed (§06) | Code on Social Security First Schedule, Ch. IV (ESI), Ch. V (gratuity), Ch. VI (maternity benefit); OSH Code s.6(1)(f) (EV-057) |
| **20** | **EPF** (twenty or more *employees*); Grievance Redressal Committee (20 or more *workers*). Among the central-sphere thresholds (EV-057), EPF is the only recurring *filing* obligation that turns on at 20 — this is why 20 is the beachhead floor | Code on Social Security First Schedule, Ch. III → EPF Scheme 2026; IR Code s.4 (EV-057) |
| **50** | Crèche facility; contract-labour provisions (raised from 20) | Code on Social Security / Maternity Benefit rules; OSH Code (EV-057) |
| **100** | Canteen; works committee | OSH Code (EV-057); Industrial Relations Code |
| **300** | Standing orders; retrenchment/closure approval (raised from 100 by the Codes) | Industrial Relations Code (EV-057) |

This kills the premise that a sub-20 company has no obligation worth software (**[Killed]** — §06) — but EPF at 20 is still where the willingness-to-pay steepens, which is why the beachhead floor sits there. Two edge cases the PRD carries so nobody over-claims: Employee's Compensation is *not* a blanket sub-10 liability (Second Schedule limits it largely to hazardous/mechanical occupations), and the 40+ health check-up is confined by the notified Rules to docks, mines and construction (**[Verified]** — §06).

**Worked example — the 19→20 discontinuity.** A Bengaluru services firm at 19 employees hires its 20th on 3 June. On that day a new obligation *class* switches on: the firm must obtain an EPF establishment code, allot/link a UAN for all covered employees, and remit its first ECR by 15 July for the June wage month — 12% employee + 12% employer, with the employer share splitting 8.33% to EPS (capped on ₹15,000 → ₹1,250) and 3.67% to EPF (Source: §06.2, from the EPFO EPF and EPS Scheme pages read September 2026; the ₹1,800 / ₹1,250 / ₹550 split at the ceiling is EPFO's own help-file fixture, EV-035. No scheme paragraph number is cited here — §06 is canonical, and the EPF Scheme 2026 renumbering is not captured). The product must *detect the crossing*, prompt registration, and drive the first filing — not merely compute a number — and from then on keep an unbroken month-by-month ledger, because EPFO enforces month-wise chronological filing — under a four-month transitional relaxation, a Regular return for month M is allowed only once month M−4 is filed for all active members — so a skipped month blocks later ones (EV-038). A payslip-centric tool shows a new deduction; a filing-first tool delivers a new filing. That difference is the entire product thesis in one hire.

**Edge cases the engine carries at these thresholds (illustrative rates; the engine resolves live values from the effective-dated rule store, §06, §14):**

- **PF wage ceiling ₹15,000 vs. International Workers.** The statutory PF wage ceiling is ₹15,000/month for domestic employees. An International Worker is carried as contributing on full wages with no ceiling, unless exempt under a Social Security Agreement through a Certificate of Coverage — **[Hypothesis]**, not **[Verified]**: §06.2 carries the paragraph references, the SSA country list and the court history without re-capture, and reports the IW special provisions as struck down by a High Court and under challenge. This PRD therefore cites no paragraph number for it, and §06.2's kill criterion applies — confirm current enforceability before any tenant contributes uncapped on an IW. What is settled is the shape: one tenant can carry two contribution regimes on one ECR, and International Workers and VPF both remain in scope of the ECR (EV-045).
- **ESI wage ceiling ₹21,000 and the contribution-period latch.** ESI covers employees earning ≤ ₹21,000/month (₹25,000 for persons with disability). If an employee crosses ₹21,000 *mid* contribution period (the two periods are Apr–Sep and Oct–Mar), ESI contribution continues until the end of that period — coverage does not stop the moment the raise lands (Source: ESI (General) Regulations, **[Verified]** standing rule — but ESI subordinate law is saved only until on or about 21 November 2026, so every value here is re-confirmed under §20 V-08; §06.3, §06.9). The engine must model contribution-period membership, not a point-in-time salary test.
- **PT is a per-state matrix under a ₹2,500/year constitutional cap.** Professional Tax is levied by states, capped at ₹2,500/year per person (Constitution, Art. 276(2)). Slabs, gender variants, periodicity and the exact return format differ by state. State-by-state verification is incomplete — for Telangana only the employer-registration wording has been checked against a government source, not the slabs; Karnataka's monthly Form 5A date and filing authority were corroborated in round three but not checked against a department notification — so a gazette-sourced PT+LWF dataset for every state is a named build dependency (§06, §20). It is also a genuine differentiator against Frappe and TallyPrime (the priced suites claim it — see Positioning): Frappe has no Indian state name anywhere in its v16 tree, and TallyPrime has no state PT slab table (slabs are hand-entered) and no LWF engine (EV-031, EV-032). A multi-state 200-person tenant may file PT in five different formats on five different cadences from one pay run.
- **Gratuity accrues from day one but vests at five years.** Under the Code on Social Security, gratuity is 15 days' wages per completed year of service, payable after five years' continuous service — a condition that does not apply on death, disablement or the expiry of a fixed term (CoSS ss.53–54, **[Verified]**; §06.6). The ceiling is "such amount as may be notified" (CoSS s.53(3)); the familiar ₹20 lakh is a legacy of the repealed Payment of Gratuity Act and is carried as the unset parameter `gratuity_ceiling` until a Code-era notification is located (§05.7 A-22; §06.6). **[Reversed]** — an earlier revision stated the ₹20 lakh cap as a verified standing rule (RV-17). The *accrual* is a monthly balance-sheet liability the engine must carry from joining, not a year-five event.

Two step-function facts define the hardest engineering in the build, and the executive reader should know they exist before §06/§08:

#### The 50% wage add-back — two wage bases on one payslip

Identical text in Code on Wages s.2(y) and Code on Social Security s.2(88): if excluded components exceed one-half of remuneration, the excess is deemed wages and added back — re-basing PF, gratuity and more. The statute says "or such other per cent as may be notified," so 50% is a *variable*, not a constant. The wage-definition rule must therefore be **versioned, effective-dated, and retrospectively recomputable with an audit trail** (**[Verified]** — §06, §08, §14).

**Worked example.** Take an employee on ₹1,00,000/month gross, structured to suppress PF:

| Component | Amount | In "wages" (s.2(y))? |
| --- | --- | --- |
| Basic | ₹25,000 | Yes |
| HRA | ₹25,000 | Excluded |
| Conveyance | ₹10,000 | Excluded |
| LTA | ₹10,000 | Excluded |
| Other excluded allowances | ₹30,000 | Excluded |
| **Total remuneration** | **₹1,00,000** | — |

Excluded components total ₹75,000 = **75% of remuneration**. The statute caps exclusions at 50%: the excess, 75% − 50% = **25% = ₹25,000**, is *deemed wages and added back*. The wage base for PF and gratuity is therefore Basic ₹25,000 + ₹25,000 add-back = **₹50,000**, not ₹25,000 — doubling the PF/gratuity base. Meanwhile the equal-remuneration and payment-of-wages base (which *includes* HRA, conveyance and OT) is a different figure again. **The engine must maintain at least two concurrent wage computations per employee per period**, and re-derive both when the notified percentage or the rule version changes for the period being recomputed. This is the single hardest recurring calculation in the build; it is specified in full in §08 and schematised in §14.

#### The November 2026 cliff

The EPF Act 1952 is repealed w.e.f. 21 Nov 2025; Code on Social Security s.164(2)(b) saves the EPF/EDLI/EPS schemes and the ESI rules for *one year* — expiring on or about 21 November 2026. EPF has a named successor (Employees' Provident Funds Scheme, 2026, with 12% re-notified retrospectively to 21.11.2025 by S.O. 3582(E)); **the ESI side is unresolved and needs an answer before the date** (**[Verified]** — Gazette; validation item ESI-regime below; §06). Trap: verifying against indiacode.nic.in or the bare gazette alone reproduces an *uncorrected* enumeration — the bare-Act footnote still carries the superseded S.O. 5319(E) text. "Check for a corrigendum" is a non-negotiable release step, not a nicety (§02.4). Two careful research rounds reached *opposite* conclusions on this exact point because one skipped the corrigendum check.

**What the product does under each outcome.** The date is fixed; the outcome is not. The responses are specified across three sections; this is the one table an executive needs, and the §20 V-08 watch decides which row applies:

| Outcome by on or about 21 November 2026 | ESI computation | ESI filing instances | Release consequence | Specified in |
| --- | --- | --- | --- | --- |
| A successor is notified that changes rates or ceilings only | A new rule version through the pipeline; the rule-version seam absorbs it | Resume from the successor's effective date | None beyond the version publish | §05.7 seam; §22.8 |
| A successor is notified that redefines the contribution base | The seam is insufficient; ESI moves to a fast-follow | Flagged "pending successor implementation" | v1 ships EPF, PT and TDS complete without waiting for ESI | §05.12 |
| Nothing is notified | Frozen to the last valid scheme, with a dated banner | BLOCKED, external — regime unresolved; out of the on-time denominator | Escalation to statutory counsel; no guessed rule is ever filed | §20.8 R-2; §19.1.2 |
| A corrigendum or further notification changes the saving itself | Re-verified under the corrigendum rule before any version publishes | Re-evaluated on publication | Whichever row above the corrected text produces | §02.4; §23.17 LW-18 |

<!-- DIAGRAM: exec-summary-statutory-step-function -->

### 01.11 Phasing: the vision is all three segments; v1 is the beachhead

The founder's scope decision was deliberate: **all three segments — SMB, mid-market, enterprise — and the full module superset are the *vision*** (Source: founder scoping decision, 4 Sep 2026; §05). The PRD's job is to *phase* that vision, not to imply it all ships at once. Enterprise is closed on arithmetic (Finding 2); the SMB floor is zero (Finding 1's cousin). So the sequence runs beachhead-out. Full gates, module sequencing, critical path and phase-acceptance checklists are in §05.4–§05.8.

<!-- DIAGRAM: exec-summary-phasing-gates -->

| Phase | Segment | Core deliverable | Gate to enter next phase (measurable) |
| --- | --- | --- | --- |
| **v1 — Beachhead** | 20–200 employees, private sector | Filing-first payroll + core HR + attendance (ADMS/WDMS receiver) + bundled AI assistant + CA console + Tally/Zoho/Kredily/Frappe importers. Fenced inside v1: Form 138 Q4 and Form 130 (EV-046), the ECR arrear file (EV-043), ESI after 22 Nov 2026 (§05, §06) | Realised ARPU validated inside the two-anchor band (§18; validation item ARPU); Tally payroll *adoption* measured and the migration priority set from it (item Tally); CA channel proven non-adversarial (item CA-channel); attended-filing legality opined (item Attended-filing, §23) |
| **v2 — Expansion** | 200–2,000, private sector | Same product shape, deeper multi-state PT/LWF, per-admin analyst copilot, metered recruiting | Multi-state statutory dataset complete (all-state PT+LWF, gazette-sourced); residency abstraction (≥3 interchangeable backends) shipped and tested per tenant (§13.10) |
| **v3 — Vision** | 2,000+, incl. regulated/PSU | Data-residency SKU, self-host-as-compliance-SKU, RFP-grade certifications | ISO 27001 seasoned ≥12 mo (engagement started at month 0, certificate in hand by ~month 6; §05.2, §17.15); a 30,000-employee reference implementation exists to clear SBI-class Criterion 7 |

The through-line: **one product *shape* serves v1 and v2** — the expansion is reachable without re-architecting. v3 is a different pricing model, channel, competitive set and assistant strategy, gated by documents (ISO seasoning, incumbency references) that must be *started* in v1 even though no v1 customer asks for them. The vision is not abandoned; it is *sequenced behind gates that money and time, not code, unlock.*

Everything the founder asked for — system of record, full suite, talent wedge, AI layer — remains in the vision. What the PRD refuses to do is ship it all in v1 and thereby ship none of it well against incumbents who already carry years of statutory maintenance. Talent is explicitly the *wedge, not the spine* (§10); benefits build the data model in v1 and defer monetisation (§11).

### 01.12 Decision summary — what is decided, what is fenced, what is open

The three tables below are the one-page view, for the reader who will act on this PRD rather than read it; the subsections after them specify how an item changes status and what the open items wait on. **Decided** means the evidence settles it and the build proceeds; reopening it needs a registered trigger, not an opinion. **Fenced** means it is built or specified but cannot go live until a named external blocker clears. **Open** means no decision has been taken and a named owner is waiting on a named input. Status is as of 11 September 2026.

**Decided**

| ID | Decision | Evidence | Owning § | Reversible? | Reopened only by |
| --- | --- | --- | --- | --- | --- |
| DEC-01 | The unit of delivery is a portal-accepted artefact plus attended, assisted submission under written authority; the customer's statutory liability is non-delegable | K-13; EV-030, EV-035–EV-038 | §22, §23 | No — it is the thesis | A portal publishing a submission API (T-01) |
| DEC-02 | The v1 beachhead is 20–200 private-sector employers; below 10 declined, 10–20 a free funnel, 200–2,000 v2, 2,000+ vision | EV-026, EV-027, EV-057; §05.1 | §05 | Yes — bands move on gates | §05.12 "20–49 does not graduate"; the §05.3 entry gates |
| DEC-03 | The assistant is bundled; there is no premium AI SKU; AI is metered only where the unit is legibly incremental | EV-090; NG-3 | §12, §13 | Yes | §20 V-07 |
| DEC-04 | No statutory or monetary figure is model-generated, and the AI layer never submits | NG-8; §12.5 | §12 | No | — |
| DEC-05 | Price shape: a published per-head card, no seat floor, a registration allowance with a multi-registration line, payroll in the entry tier | EV-026, EV-028, EV-088; §18.2 P3, P6; §18.3 | §18 | The shape no; the level yes | §21.11 CRS-10 — a vendor drops its block |
| DEC-06 | Multi-tenancy is a pooled bridge with a priced silo escape hatch; a CA is a grantee over client-owned tenants | §15.3.9 options T-C and B-1 | §15 | Partly | The §15.3.9 revisit triggers, including §20 V-05 |
| DEC-07 | The payroll month runs OPEN → INPUTS_CLOSED → PROCESSED → APPROVED → LOCKED → DISBURSED → PAYMENT_INITIATED → FILED, reversible before LOCK, with the verification gate immediately before PAYMENT_INITIATED; a post-FILED correction is a diff | Part E-1; EV-036, EV-037 | §08 | No | An EPFO change to the separation of return and payment |
| DEC-08 | The monthly ECR generator ships in R1 against the published 11-field layout | EV-035 | §05.7, §08 | No | An EPFO layout change, through §22.8 |
| DEC-09 | Evaluation is a pure function of inputs, rule-set version and an enumerated evaluation context, with bounded fixed-point nodes for the s.2(y) add-back | Part E-3, E-4 | §15 | No | — |
| DEC-10 | Bitemporality is scoped by entity class, with an erasure mechanism for each erasable class | Part E-2 | §14 | No | — |
| DEC-11 | Jurisdiction sits on the work location — state, sphere and Code-regime commencement date | Part E-5 | §07, §14 | No | — |
| DEC-12 | Aadhaar is optional everywhere and held only as an opaque token over a separate store; biometric templates have their own keyspace; there is no image column or bucket | Part E-6, E-11 | §07, §14 | No | Counsel on CR-06 can change the store's controls, not its separation |
| DEC-13 | Written consent is captured before biometric or financial information is collected today; two consent regimes run across on or about 13 May 2027; consent is never backfilled | EV-058, EV-060; Part E-6, E-12 | §07, §23 | No | A gazetted change to the DPDP date (§23.17 LW-02) moves the switch, not the posture |
| DEC-14 | The CERT-In six-hour incident pipeline and 180 days of ICT logs in India, LLM logs included, from day one | EV-062; Part E-7, E-8 | §17 | No | CR-23 decides LLM-log retention beyond 180 days, nothing earlier |
| DEC-15 | A redaction chokepoint on every outbound model call; a per-tenant AI kill switch, off by default for RBI, SEBI and IRDAI tenants | Part E-7; EV-085–EV-087 | §12 | No | — |
| DEC-16 | Rules, formats, due dates and runbooks change only through the two-person pipeline; there is no hotfix path | §22 decision record | §22 | No | — |
| DEC-17 | We never hold a bank credential, an OTP-generating factor, a DSC or an Aadhaar number for any portal act | §22.1 P5–P6 | §22 | No | — |
| DEC-18 | Both the Income-tax Act 2025 and the 1961-Act form and section vocabularies are accepted everywhere | EV-050 | §08, §14 | No | — |
| DEC-19 | ISO 27001 starts at month zero | §05.2; R-16 | §17.15 | No — the seasoning year cannot be bought later | — |
| DEC-20 | Talent is the wedge, not the spine; recruiting is inbound only; discrimination controls are sold as defensibility under RPwD s.90, never as a mandate | EV-079; NG-7; Part D-18 | §10, §23.10 | Partly | The kill criteria in the §10.16 hypothesis ledger |
| DEC-21 | Each EPF establishment keeps an unbroken month-by-month filing ledger that refuses silent abandonment | Part E-10; EV-038 | §08 FR-PAY-712 | No | An EPFO change to its chronology rule |
| DEC-22 | PF liability on arrears dates from the disbursal date, not the wage month, and is surfaced when the arrears batch is approved | Part E-9 | §08 FR-PAY-401 | No | — |
| DEC-23 | The overtime cap reported in secondary summaries may warn and never blocks | K-04; EV-012 | §09; §20 V-17 | Yes — the value, not the posture | §20 V-17 locates the cap, or shows it absent |
| DEC-24 | The ₹200 meal perquisite is enabled only with its conditions enforced as engine constraints, and no rule number is cited until the text is read | K-19 | §08, §11; §20 V-18 | No | §20 V-18 |
| DEC-25 | Availability is specified as a windowed SLO — the shape is decided; its two targets are **[Hypothesis]** (OPN-14) | Part E-13; NFR-AVAIL-801 | §17.8 | The shape no; the targets yes | §20 instrumentation |

**Fenced** — built or specified, not live until the blocker clears. Each maps to a §05.7 artefact row where one exists, to its §05.18 fence record, and to one BLOCKED reason in FR-PAY-711 (AC-01.13; the crosswalk below).

| ID | Item | Blocked on | Evidence | Artefact row | Until then | Lifts when |
| --- | --- | --- | --- | --- | --- | --- |
| FEN-01 | Form 138 Q4 regular and correction files with Annexures II and III; Form 130 Part B readiness | The Q4 formats are unreleased, re-checked September 2026 | EV-046, EV-047 | A-13, A-14 | Q1–Q3 ship; Annexure II data is prepared continuously | Protean publishes the Q4 format, watched on its page anchors (R-4) |
| FEN-02 | The ECR arrear return | No arrear layout is published | EV-043 | A-06 | Arrears surface as an attended task on EPFO's own flow | The layout is captured from the authenticated portal |
| FEN-03 | ESI after 22 November 2026 | No successor notified | §06.9; §20 V-08 | A-09 | Built behind the rule-version seam | A successor, read with the corrigendum check — see the cliff outcomes above |
| FEN-04 | The ESIC monthly upload file | The template is not confirmed from an ESIC source | r3/05 | A-08 | ESI is computed as a worksheet and the operator keys the portal template | `esic_mc_template_version` is captured with a design partner |
| FEN-05 | PT and LWF for each state without a gazette-sourced row | Unsourced slabs, cadences and amounts | EV-015; §20 V-09 | A-16, A-17 | The state is not offered; no aggregator data ships | The state's row is sourced and passes two-person review (§22.8) |
| FEN-06 | Operator-attended submission, per portal and filing type | CR-17a–f — legality, portal terms, the e-Return Intermediary route, DSC handling, liability allocation, insurability | Part D-17 | A-23 | Employer-attended and co-attended submission with our artefact, checklist and guidance | Counsel clears each question for that surface, the authority instrument is executed and the liability clause is in the contract (FR-LEG-034) |
| FEN-07 | In-session assistance inside an operator session | Portal terms of use and the §16.5 kill criterion | §22.1.2 M3 | — (P2) | The operator works the portal without field-fill | Counsel and portal terms, then a P2 build decision |
| FEN-08 | General availability of biometric attendance | Whether in-app capture meets SPDI r.5(1)'s written-consent form (CR-27) | EV-060, EV-072 | — (§09) | Written consent captured on every enrolment; a non-biometric path for every employee | CR-27 answered; CR-02 separately gates marketing copy and the post-switch capture default (§23.16) |
| FEN-09 | Filing Tax Year 2026-27 Form 138 correction statements | The income-tax portal's own notice that correction filing for Tax Year 2026-27 "will be enabled shortly" | r1/06 finding 33; r3/05; §22.4 | A-12 — the file is buildable; the filing is held | The correction is generated, validated and held with its exposure clock visible (§22.11 row 9) | The watcher records the function enabled and the correction re-queues (FR-RULE-006) |
| FEN-10 | The Code-era statutory bonus return, and the bonus ceilings | The return form and ceilings are unconfirmed under the Code | §06.7; §20 V-21 | A-27 | Provisional computation, labelled, with the operator confirming the ceiling and recording its source; the bonus return is outside the SLA | `bonus.annual_return_form` carries a verified source, published through §22.8 |
| FEN-11 | On-time judgement of the monthly TDS deposit | Income-tax Rules 2026 r.218 not yet read | EV-050; §06.5; §20 V-20 | A-10, its deposit lines | The 1962-Rules dates — the 7th; March by 30 April — shown as **[Hypothesis]**; deposit timing sits in the coverage-gap register; computation stays in the SLA | r.218's text is read and its dates are published as calendar rows (RV-18) |
| FEN-12 | State-sphere register forms and the appointment letter, per state | The state's forms are not captured | EV-053, EV-057 | A-18's state forms; A-19 | Central-sphere register formats; no appointment letter offered in that state | The state's forms are captured and published (RV-11) |

**Open** — no decision yet; the owner is waiting on the named input.

| ID | Question | Waiting on | Owner | Latest useful date | Pointer |
| --- | --- | --- | --- | --- | --- |
| OPN-01 | The File-tier PEPM inside the ₹80–150 target | §20 V-01 (bureau price) and V-03 (realised ARPU) | Founder + GTM | Before any price reaches a contract | §18.3; §18.16 H-P1, H-P2 |
| OPN-02 | `included_registrations_per_tenant` and `multi_registration_line_price` | §22.7 minutes per instance; OPN-03 | GTM + Finance | Before the price card publishes | §18.3 |
| OPN-03 | Which tenant profile binds `max_supervised_minutes_per_filing_cycle`, and whether the card changes so that another profile binds | The first design-partner quarter's supervised minutes (FR-OPS-031; §20 V-26) | Founder + Product | After that quarter, before operator submission is bundled | §13.19; the "no seat floor" worked example |
| OPN-04 | The SLA remedy cap (`sla_remedy_cap_months`) and the liability allocation behind it | CR-17e, CR-17f; whether buyers value a capped remedy | Legal lead + GTM | Before the first SLA is signed | §18.3; §23.13.5 |
| OPN-05 | Whether the CA is a channel, on what economics, and whether a reseller rate is consistent with the ICAI Code of Ethics | §20 V-05; CR-46 | GTM | Before any CA reseller launch | §18.7; R-14 |
| OPN-06 | Importer and displacement priority between Tally payroll and greytHR | §20 V-02; §21.14 CQ-12 | Product + GTM | Before the importer build order is frozen | §16.7; §21.2 |
| OPN-07 | Whether any metered AI SKU ships | §20 V-07 | Product | Before v2 packaging | §13.8; §18.5 |
| OPN-08 | Whether mid-year migration is a product surface or a services cost | The §20 V-15 dry run | Product | Before the first mid-year go-live | §16.7; R-28 |
| OPN-09 | The final default for a member who declines Aadhaar — exclude-and-flag, its alternatives, and the employee share while the line is excluded | CR-30 | Legal lead + Statutory lead | Before v1 general availability | FR-CHR-101; Part E-11 |
| OPN-10 | Who owes the SPDI written-consent duty — the employer, the SaaS, or both | CR-04 | Legal lead | Before notice templates are cleared | §07; §23.4.3 |
| OPN-11 | The corporate structure for any UIDAI registration, given the OVSE storage bar | CR-21 | Founder + Legal lead | Before any UIDAI registration | EV-069 |
| OPN-12 | Retention periods beyond EV-054's central-sphere figures | CR-11 | Legal lead + Statutory lead | Before automatic erasure of any affected class | §14.7; §23.14 |
| OPN-13 | Whether 20–49 stays a paid band | The month-18 graduation rate (§05.11) | Founder | Month 18 | §05.12 |
| OPN-14 | Whether the windowed availability targets and the provisional RPO and RTO hold | §20 instrumentation of the 20–200 segment | Engineering | Before any contractual SLA on availability | §17.8, §17.14 |
| OPN-15 | How the OSH FORM-XVII and SS Form XXIII annual returns are submitted | A §22 channel specification | Compliance operations lead | 28 February 2027, if R1 is live before then | §05.7 A-20, A-21 |
| OPN-16 | The portal behaviours still uncaptured — whether EPFO sign-in prompts an OTP, each portal's lockout policy, the ESIC template and sign-in controls, whether the `.fvu` upload needs a DSC or EVC, the EPFO error-file schema | Capture sessions with design partners (§22.12 O4–O7) | Compliance operations lead | Before operator-attended submission opens on that portal | §22.4; FEN-04 |

**Where the open items wait.** Sorted by the input each waits on, four wait only on counsel (OPN-09 to OPN-12) and two only on capture or specification (OPN-15, OPN-16) — work the §20.6 desk track can start now, unfunded. Five wait on measurement that needs a prototype or the first live cycles (OPN-02, OPN-03, OPN-08, OPN-13, OPN-14). Three wait only on commercial validation (OPN-01, OPN-06, OPN-07), and two on commercial validation and counsel together (OPN-04, OPN-05). Only those last five wait on the commercial programme that §20.7 gates money on, so most of what is open here is not waiting for funding; it is waiting for work that has not started.

<!-- DIAGRAM: exec-summary-open-decision-inputs -->

#### How an item changes status

| # | From → To | Event | Guard | Side effect | Who may trigger |
| --- | --- | --- | --- | --- | --- |
| DS-1 | Open → Decided | A validation result or a counsel answer is recorded | The pass threshold was registered before the data arrived (§20.6), or the answer is an opinion reference with date, scope and author (FR-LEG-040) | The owning section is revised; any parameter it sets moves through the §22 pipeline, never as a code edit | The owning section's lead; the founder as well for commercial items |
| DS-2 | Open or Reopened → Killed | A pre-registered kill criterion fires | The criterion was written before collection (§20.12 rule 9) | The claim joins §20.4 or §20.5; any statement this PRD made on it is marked [Reversed] where it stood | The owning section's lead |
| DS-3 | Fenced → Live | The blocker clears and the blocked artefact ships — §05.18 FL6, then FL8 | The primary source is captured with a corrigendum check (§02.4), or the counsel register shows the item cleared; the artefact's release-gate evidence exists (§05.20) | BLOCKED instances re-evaluate (FR-PAY-711 F3; §05.18 FL8); the artefact joins the release that carries it (§05.7) | Statutory lead or Legal lead |
| DS-4 | Fenced → Carved out | The blocker is still open at the gate that needed it | The gate is recorded — for FEN-01, the first annual cycle | The SLA declares the carve-out and the item becomes a fast-follow (§05.12) | Product + Statutory lead |
| DS-5 | Carved out → Live | The blocker clears later and the artefact ships | As DS-3 | The carve-out is withdrawn at the next SLA revision | As DS-3 |
| DS-6 | Decided or Live → Reopened | A registered watch trigger fires (§20.8, §21.13, §23.17) | The trigger is a captured source event, not a view | Dependent customer-facing claims are suspended (FR-LEG-001); the item is treated as open | The watch owner |
| DS-7 | Reopened → Decided | Re-verification completes | As DS-1 | Suspended claims are re-cleared before they return | As DS-1 |

<!-- DIAGRAM: exec-summary-decision-status -->

#### The fenced list against the §05.18 fence register

The FEN rows are the executive view; §05.18's fence register is the record. Four behaviours read a fence — the BLOCKED reason on a filing instance, the tenant's coverage line (§05.21), the SLA carve-out and the release scope — and all four read §05.18's record, so a FEN item holds no state of its own: its status is derived (AC-01.19). The one BLOCKED reason AC-01.13 requires is the §05.18 `fence_id`, which FL1 writes onto every dependent instance.

| FEN | §05.18 record | Blocker class | What it does to filing instances | SLA and metric treatment (§05.18) |
| --- | --- | --- | --- | --- |
| FEN-01 | F-01 | authority-format | Form 138 Q4 and Tax Year 2026-27 Form 130 instances sit in BLOCKED with F-01 as reason | Carve-out, authority-caused, pre-declared; outside the on-time denominator |
| FEN-02 | F-03 | authority-format | Arrear returns are carried on the filing ledger as BLOCKED and run as attended tasks on EPFO's own flow | Outside the SLA until shipped |
| FEN-03 | F-04 | authority-regime | Post-lapse ESI instances sit in BLOCKED. Separately, the parameter hold PH-13 keeps a November 2026 payroll month for an ESI-covered establishment from reaching LOCKED until it is set | Coverage-gap register |
| FEN-04 | F-05 | desk-capture | None — the instance proceeds and the operator keys ESI into the portal from the worksheet | ESI computation in the SLA; the upload file outside it |
| FEN-05 | `F-06[state]`, `F-07[state]` | state-data | No instance is generated for the state; its due date stays visible | CARVED_OUT_FENCE per state |
| FEN-06 | `F-08[portal]` | counsel | None — instances proceed in Modes A and B; Mode C does not open on the portal | The SLA narrows to artefact readiness, warning lead time and co-attended guidance |
| FEN-07 | None in §05.18 — a P2 capability whose record is §22.1.2 (M3) | — | None | — |
| FEN-08 | None in §05.18 — not a filing artefact; its record is CR-27 on the counsel register | counsel | None — attendance continues on the non-biometric path | — |
| FEN-09 | F-02 | authority-portal | Tax Year 2026-27 corrections are generated and validated, then held with their exposure clock (§22 AC-015.4) | Authority-caused; exposure shown to the tenant |
| FEN-10 | F-09 | authority-regime | The bonus computation runs provisionally, labelled; the return leg is blocked | Outside the SLA |
| FEN-11 | F-10 | desk-read | Deposit instances proceed; their timeliness is not judged | Coverage-gap register; computation stays in the SLA |
| FEN-12 | `F-11[state]` | state-data | Registers render in central-sphere formats; no appointment letter is offered in the state | CARVED_OUT_FENCE for the affected lines |

**How a fence's lifecycle state shows here.**

| §05.18 fence state | Shown in this summary as | Why |
| --- | --- | --- |
| OPEN, SIGNALLED, VERIFYING, REOPENED | Fenced | A signal is not a clearance: FL2 changes no product behaviour |
| CLEARED, IMPLEMENTING | Fenced — cleared, shipping | The artefact cannot yet be generated, so instances stay BLOCKED |
| SHIPPED | Live (DS-3) | FL8 re-queues instances and re-versions coverage statements |
| DEFERRED | Deferred | Change control moved the artefact out of v1 (§05.23); the watch stays live |
| Any state, once the gate that needed the artefact has passed and the SLA revision declares it | Carved out (DS-4) | A display status over `sla_treatment`, not a fence state; F-01's carve-out is pre-declared from FL1 |

One reconciliation is owed outside this section. §08 FR-PAY-711 F3 names a published rule or format version as the guard that returns a BLOCKED instance to SCHEDULED, while §05.18 re-queues instances at FL8, after the artefact ships. Until §05 and §08 align the two, this summary shows a fence as Live only at SHIPPED, so it never reports as lifted a fence whose artefact cannot yet be generated.

- **AC-01.19 — Fence status is derived, never set.** A FEN item's status is computed from its source record — the §05.18 fence state by the mapping above, or for FEN-07 and FEN-08 their §22 or counsel-register record. A FEN item with no source record, or a §05.18 fence with no FEN row, fails the register lint (RL-4). *Verify:* TS-01.19, TS-01.32.

| # | Given | When | Then | Negative or edge covered |
| --- | --- | --- | --- | --- |
| TS-01.32 | The Form 138 Q4 watch key fires on a draft layout that is not the awaited source | The analyst assesses the candidate | §05.18 returns F-01 to OPEN (FL3); FEN-01 never left Fenced and no Q4 instance left BLOCKED | Showing FEN-01 as Live, or as cleared, on a signal fails AC-01.19 |

#### The launch posture under each attended-filing answer

FEN-06 is the fence the positioning rests on. §22.2.3, §23.13.3, §05.12 and §18.3 each specify part of the response; together they give four postures. The layers are those of the positioning diagram — 3 is the state layer, 4 attended submission, 5 the format-current guarantee and SLA.

| Counsel outcome on CR-17 | What ships | The SLA covers | Differentiating layers intact | Price consequence |
| --- | --- | --- | --- | --- |
| Cleared for every portal and filing type | Operator-attended submission, surface by surface, as each authority instrument is executed | Artefact correctness, statutory currency, format-break coverage and the submission we contracted to make | 3, 4 and 5 | The File tier as §18.3 prices it |
| Cleared except the income-tax upload — CR-17c open or negative | Operator submission for EPFO, ESIC and state PT; the deductor keeps the `.fvu` upload | As above, less the Form 138 upload | 3, 5, and 4 in part | Unchanged; the TDS upload stays employer-attended |
| Not cleared, or still open at launch | Portal-accepted artefacts, checklists and live guidance; the employer submits | Artefact readiness and warning lead time (§05.12) | 3 and 5; 4 withdrawn | Re-tested against the narrower scope (§18.16 H-P15) |
| Lawful but not insurable as designed — CR-17f | As the row above until the design or the cap changes | A capped, causation-bound remedy only | 3 and 5 | Re-priced on submission and maintenance alone (§18.3 kill criterion) |

#### Month-zero commitments against gated spend

The round-five reviews found an apparent contradiction: funding and headcount gate on the validation programme (§20.7), yet several sections demand month-zero commitments (r5 synthesis). Both hold once each commitment is classed by what delay costs:

| Commitment | Class | Why it cannot wait, or why it can | Governed by |
| --- | --- | --- | --- |
| Aadhaar token-store separation; the biometric keyspace; the template entity apart from the attendance event | One-way door | Retrofitting means migrating every row already written, and the attendance record must survive template destruction from the first punch (Part E-6) | Foundations — no gate |
| Consent as a versioned entity, written consent before collection | One-way door | Consent cannot be backfilled (Part E-12) | Foundations |
| The redaction chokepoint | One-way door | It is structural in the model call graph; retrofitting means auditing every call site (Part E-7) | Foundations |
| In-India log residency, LLM logs included; the six-hour incident pipeline | One-way door and live law | CERT-In binds from day one (EV-062) | Foundations |
| Cost attribution per tenant, user, agent and model | One-way door | Cheapest before a price exists (§13.9) | Foundations |
| Bitemporal scoping and the erasure mechanism | One-way door | It decides physical storage for the system of record (Part E-2) | Foundations |
| ISO 27001 | Time-locked | Acquisition plus a twelve-month seasoning cannot be bought later (§05.2) | Started at month zero |
| The provider seam and router | Cheap now, dear later | P0 because retrofitting is the expensive case; three interchangeable in-India backends are a later gate, not a month-zero purchase | §05.5; the §05.8 v2 → vision gate |
| The Tally importer | Revenue-critical | Migration is the market's leading churn trigger (R-28) | R1 |
| Importers beyond Tally | Gated | Their order depends on how much of job 1 is Tally payroll (OPN-06) | §20.7 Gate 1 |
| Scaling the statutory and operator desk beyond a founding core | Gated | Sized from measured minutes and change events (§22.7, §22.9) | §20.7 Gate 2 |
| Metered AI SKUs; enterprise-shaped surfaces — SSO/SCIM, the self-host SKU, the residency matrix at general availability | Gated | No beachhead filing depends on them (§05.2) | §20 V-07; the §05.8 gates |

#### The unsized numbers the open decisions wait on

No figure below is estimated in this PRD. Each is a named parameter with an owning section, routed to §20. They are listed here because the open decisions above cannot close without them.

| Parameter | Decides | Produced by | Owning § | Status |
| --- | --- | --- | --- | --- |
| `max_supervised_minutes_per_filing_cycle` | OPN-03; the automation target for the filing workflow | `target_supervised_cogs_share` × revenue per instance at the binding profile ÷ cost per operator minute | §13.19 | Unsized |
| `target_supervised_cogs_share` | The margin budget of the dominant cost line | §13 and §18 jointly | §13, §18 | Unsized |
| `m_session`, `n_sessions`, `m_prep`, `p_exception`, `m_exception`, `f_wait`, `window_share` | Minutes per filing instance | The first design-partner quarter (FR-OPS-010) | §22.7 | Unmeasured |
| `operator_productive_minutes_per_month`, `operator_window_minutes`, `operator_loaded_cost_monthly` | Customers per operator; cost per operator minute | Desk records and finance | §22.7 | Unmeasured |
| `included_registrations_per_tenant`, `multi_registration_line_price` | OPN-02 | Sized from the two rows above | §18.3 | Unsized |
| `sla_remedy_cap_months` | OPN-04 | Counsel and buyer research | §18.3 | Unsized |
| `cost_per_state_per_year` | The compliance-curation line; the marginal cost of adding a state | The pipeline log from month one | §22.9 | Unmeasured |
| `form138_q4_escalation_date` | When FEN-01 escalates | The statutory owner | §20.8 R-4 | To be set |
| `esic_mc_template_version` | FEN-04 | Design-partner capture | §05.7 | Uncaptured |
| `gratuity_ceiling` | Gratuity payouts above the legacy figure | A Code-era notification | §05.7, §06.6 | Unset |
| `pt.cadence[state, registration]`, `lwf.periodicity[state]` | PT and LWF instances per registration; FEN-05 | State gazettes | §22.7; §06.4, §06.8 | Karnataka LWF periodicity only |
| `epf.damages_scale`, `esi.damages_scale`, `tds.late_fee_per_day`, `tds.late_fee_cap` | The penalty exposures the SLA remedy is bounded against | The notified text | §06; §18.3 | No shipped default |
| `authority_revocation_sla_minutes` | How fast a revocation stops operator submission | Legal and operations | §23.13.6 | Unset |
| `subprocessor_change_notice_days` | Notice before a sub-processor is added or swapped | Counsel | §23.15 | **[Hypothesis]** only |
| `llm_log_retention_days` | LLM-log retention beyond 180 days | CR-23 | §12, §17 | Unset |
| `retention.*` classes beyond EV-054 | OPN-12 | CR-11 | §14.7 | Held, never erased while unset |

#### Decisions this document deliberately does not take

A PRD that tried to settle these would be a different document. Leaving them out is a decision, recorded so the gap is not read as an oversight (r5 synthesis).

| Not decided here | Why not | Where it belongs |
| --- | --- | --- |
| The financial model, the raise, use of funds, burn and the headcount plan | Every commercial input is a hypothesis until Gate 1 (§20.7); the four-line COGS stack is the one item imported, because it sets a product target | An investor memo, after Gate 1 |
| CAC, payback and net-revenue-retention targets | The funnel is hypothesised for instrumentation, not for forecasting (§18.15) | §19 targets, once cohorts report |
| Contract drafting — the MSA, the DPA, the authority to act, regulated-tenant riders | The PRD names each instrument and its minimum content; counsel drafts | The §23.15 workstream |
| Screen and interaction design | Behaviour and acceptance criteria are specified; layouts are not | Design specifications per module |
| An answer to any Part D question | Never given here, in either direction | The §23.16 counsel register |
| A second country | India statutory depth is the product (NG-14) | Not before v2 |

#### Requirements on the decision summary

- **AC-01.12 — One register, one status.** Every DEC, FEN and OPN item exists once, with the status, owner and closing condition shown here, kept in the same system as the claim register (FR-LEG-001) and the counsel register (FR-LEG-040). Any section that restates a decision cites its ID.
- **AC-01.13 — Every fence is a BLOCKED reason.** Each FEN item that stops a filing instance maps to exactly one BLOCKED reason in FR-PAY-711, classed external, so that the on-time denominator treats it as §19.1.2 requires. *Verify:* a BLOCKED instance whose reason maps to neither a FEN item nor a tenant-side cause fails the configuration lint.
- **AC-01.14 — Every open item has a latest useful date.** An OPN item past that date without a result is escalated at the next operating review; it never closes by default.
- **AC-01.15 — Reopening is evidence-driven.** A DEC item moves to Reopened only on a registered trigger (DS-6); a request to reopen without one is recorded and declined.

Scenarios that prove these four:

| # | Given | When | Then |
| --- | --- | --- | --- |
| TS-01.19 | Protean's Form 138 Q4 anchor starts resolving | The watcher fires | FEN-01 moves to Live only when F-01 reaches SHIPPED — the Q4 schema published through the pipeline and the writer shipped; its BLOCKED instances then re-evaluate (DS-3; §05.18 FL6 and FL8; §22.11 row 13) |
| TS-01.20 | The first annual cycle arrives with the Q4 format still unpublished | The gate recorded for FEN-01 is reached | FEN-01 becomes Carved out and the next SLA revision declares it (DS-4; §05.12) |
| TS-01.21 | OPN-08's latest useful date passes with no V-15 dry run | The operating review runs | The item is escalated and stays open; nothing closes it by default (AC-01.14) |
| TS-01.22 | A section refers to "the pricing decision" without an ID | The document lint runs | The lint fails until the reference cites DEC-05 or OPN-01 (AC-01.12) |
| TS-01.23 | A request to reopen DEC-02 cites a competitor's conference remark | It reaches the decision owner | Recorded and declined; a captured change to Zoho's free-gate headcount would instead fire DS-6 through R-1 (AC-01.15) |

#### The register records — data definition and lint

AC-01.12 keeps every item in one system with the claim register (FR-LEG-001) and the counsel register (FR-LEG-040). This is the record that system holds for the families this section owns. Fence records are §05.18's and competitor-claim fields are §21.12's; neither is redefined here.

| Field | Type | Families | Rule |
| --- | --- | --- | --- |
| `item_id` | T-##, RV-##, DEC-##, FEN-##, OPN-##, PC-## | All | Never reused; a withdrawn item keeps its ID with a terminal status |
| `statement` | Text | All | One proposition; a compound statement is split into two items |
| `marker` | [Verified], [Verified — mirror], [Hypothesis], [Killed], [Reversed], open — counsel, frame | T, RV | Read from §02's grading, never set in this register |
| `evidence_refs[]` | EV-###, EV-K##, K-##, Part E-#, research file | All | At least one, except on an OPN item, whose evidence is the input it waits on; an EV reference resolves to a §02.7 row |
| `owning_section` | §NN | All | The section whose text governs the item, per "When two sections disagree" |
| `owner_role` | One role | All | A role, never a person (as §23.1.6) |
| `status` | T: standing · falsified · retired. RV: in force · superseded. DEC: Decided · Reopened · Killed. FEN: derived. OPN: Open · Decided · Killed. PC: FR-LEG-001's draft · cleared · suspended · withdrawn | All | Moves only by AC-01.16 (T), a new RV row through §02 (RV, AC-01.18), DS-1 to DS-7 (DEC, OPN), AC-01.19 (FEN) or FR-LEG-001 (PC) — never by hand |
| `rests_on[]` | T-##, EV-### | DEC, FEN, OPN, PC | The dependency map's edges |
| `falsifier` | An observable event, or "none registered" with its reason | T | "None registered" only for a frame, a floor or a build dependency — T-03, T-05, T-07 |
| `watch_refs[]` | R-##, CRS-##, LW-##, V-##, CR-##, an FR-RULE-006 watch key | T; DEC, as its reopen triggers; OPN, as what it waits on | DS-6 and AC-01.16 act only on an event from this list |
| `reversible` | no · yes · partly · shape no, level yes | DEC | "No" with no reopen trigger means only a newly registered trigger can reopen it, and registering one is itself a recorded change |
| `source_record` | A §05.18 `fence_id`, a CR item, or a §22 record | FEN | Exactly one family per FEN item |
| `latest_useful_date` | A date, or a named event | OPN | Mandatory (AC-01.14) |
| `escalated_at` | Timestamp | OPN | Set when the date passes without a result; the item stays Open |
| `closes[]` | DEC, FEN, OPN or parameter IDs | OPN | What the answer settles; the §20 crosswalk reads it |
| `retracted_text` | The earlier draft's statement, quoted, with its draft version | RV | What the RV guard searches for |
| `guard_refs[]` | A §20.4 row, a B# or CLR-## entry, a test ID, a configuration key | RV | At least one (AC-01.18) |
| `claim_register_id` | An FR-LEG-001 `claim_id` | PC | The external form is usable only while that entry is `cleared` |
| `never_say[]` | Text | PC | Each form resolves to an enforcing list entry (AC-01.21) |
| `status_history[]` | Append-only entries of from, to, event, evidence reference, actor and time | All | Never edited; its last entry equals `status` |

<!-- DIAGRAM: exec-summary-register-model -->

The lint runs on every change to the register and on every assembly of this PRD.

| # | Check | Enforces | On failure |
| --- | --- | --- | --- |
| RL-1 | Every register ID cited in any section resolves to exactly one item | AC-01.12 | The document lint fails (TS-01.22) |
| RL-2 | Every T item whose falsifier is registered names at least one watch | AC-01.17 | Listed as unwatched at the operating review |
| RL-3 | Every DEC, FEN, OPN and PC item has a `rests_on` edge or an evidence reference | AC-01.17 | Listed as an orphan; an orphan PC cannot be cleared |
| RL-4 | Every FEN item has exactly one source record, and every §05.18 fence has a FEN row | AC-01.19 | The configuration lint fails |
| RL-5 | Every OPN item has a latest useful date, and one past it without a result has `escalated_at` set | AC-01.14 | Raised at the next operating review |
| RL-6 | Every RV item has at least one guard | AC-01.18 | Listed as unguarded |
| RL-7 | A PC external form appears in an outward artefact only while its claim-register entry is `cleared` | FR-LEG-001 AC1 | The artefact fails clearance |
| RL-8 | `status_history` is append-only and its last entry equals `status` | AC-01.12 | The write is refused |
| RL-9 | A move to Reopened cites an event in the item's `watch_refs` | AC-01.15; DS-6 | The move is refused; the request is recorded and declined |
| RL-10 | Every never-say form of every PC item resolves to an entry on §23.1.5, §21.12 or §20.4 | AC-01.21 | Listed as unenforced at the operating review until the list owner adds it |

| # | Given | When | Then | Negative or edge covered |
| --- | --- | --- | --- | --- |
| TS-01.33 | A new fence is registered in §05.18 | The register lint runs | RL-4 fails, naming the fence, until a FEN row cites it; the FEN row's status is then derived from the fence state | A FEN row created with a hand-set status fails AC-01.19 |
| TS-01.34 | A user moves DEC-04 to Reopened, citing a customer request | The move is submitted | Refused under RL-9: DEC-04 has no registered reopen trigger; the request is recorded and declined | Registering a trigger first is itself a change, visible in DEC-04's `status_history` |

### 01.13 The validation programme — fund this, not the document

No pricing, business-case, GTM, or attach-revenue number in this document is validated. Five rounds of desk research answered what desk research can; the questions below cannot be answered from a desk. The commercial questions gate funding and headcount decisions, not this PRD; the build-blocking items (the ESI regime, attended-filing legality, the Form 138 Q4 release, state gazettes) are primary-source and counsel work that can start now, unfunded, and must not wait behind the commercial programme (§20). Each is carried inline in its owning section with the same kill criterion shown here; the consolidated validation programme and the risk register live in §20.

| # | Question | Method | Owning § | Kill criterion |
| --- | --- | --- | --- | --- |
| CA-fee | **What does a CA/bureau actually charge** to run monthly payroll for 20/50/100 people, Class A vs B cities? | Mystery-shop 6–8 CAs across two tiers | §18.16 | If real price < ₹2,000/month, the ₹80–200 mid-market band (inside which the ₹80–150 anchor sits) loses its CA-fee justification and pricing re-anchors toward the ~₹50 PEPM value floor (EV-027) |
| Tally | **What share of Tally's ~2.5m businesses enable and use the payroll module?** Capability is documented (EV-032); adoption is unknown | 15–25 Tally-partner interviews + buyer survey | §18.8, §21 | At ~5% adoption, Tally matters as an accounting integration, not a payroll migration source, and importer and channel priority shift toward greytHR; at ~40% Tally payroll is the primary migration source. Either way the incumbency is two jobs, not one (§21) |
| ARPU | **Realised ARPU vs list price**, and the discounting behind it | Buyer/reseller interviews; won-deal figures | §18.16 | If realised is 30–40% below list, the gross-margin envelope compresses materially — against a cost stack whose dominant line (supervised filing) is unsized (EV-088) |
| AI-cost | **Real tokens-per-query** for HR agents on real Indian policy corpora — and, because inference is the smallest of four cost lines, **supervised operator minutes per filing cycle per registration**, the dominant one (EV-088) | Instrument a prototype before any price commit; time attended filings with design partners | §13, §22 | If tokens run 5× the estimate, free-bundling breaks at the low end and metered SKUs must carry more; if supervised minutes per registration exceed what the price band supports, pricing needs a registration cap or multi-registration line (§18) |
| CA-channel | **Will CAs act as a channel**, and on what economics? | 20–30 practising-CA interviews, both tiers | §18.7 | If ≥40% see us as disintermediation, the channel inverts into an opponent |
| Mid-market | **Closed in round five.** Keka's pricing was obtained (EV-021–EV-025); Zimyo, HROne, Qandle, Pocket HRMS and greytHR were priced at a common point (EV-027); Ramco and ZingHR were moved out of the competitive set as enterprise adjacency (EV-033) | Raw-HTML scan plus rendered read plus vendor configuration files | §21 | Resolved. **[Reversed]** — the earlier "Keka pricing unobtainable" ban is lifted |
| AI-WTP | **Will Indian buyers pay anything for HR AI**, and for which agent? | Van Westendorp / conjoint, 30–40 buyers | §12, §13.8 | If willingness is genuinely zero everywhere, drop the metered AI SKUs entirely |
| ESI-regime | **What does the ESI regime become on 22 Nov 2026?** | Primary-source watch on ESIC/MoLE notifications | §06 | Time-critical; payroll-engine correctness depends on it |
| Attended-filing | **May we act on EPFO, ESIC, TRACES and state PT portals under employer credentials?** Portal terms of use; whether filing a TDS return for a deductor engages the e-Return Intermediary route; handling of the authorised signatory's personal DSC; liability allocation and insurability | Qualified counsel opinion | §22, §23 | If the activity is not lawful or not insurable as designed, submission reverts to generate-and-hand-back and the differentiation narrows to multi-state PT/LWF against Tally and Frappe, plus the format-current guarantee |

Two structural cautions the reader must hold alongside the table: **§18 (pricing/GTM/channel), §11 (benefits attach) and parts of §04 are explicitly hypotheses** — the CA-as-channel and Tally-partner theses carry no field evidence — and the all-state PT+LWF dataset is *undone work that is a build dependency*, not a blocker (state-by-state verification incomplete; §06, §20).

**Crosswalk to the §20 programme.** The names in the table are this section's shorthand. §20.6 holds each item's method, owner, cost, gate and pass threshold under its own ID; the thesis claims and decisions each result settles are:

| Shorthand | §20 ID | §20.7 gate | Settles thesis claim | Closes |
| --- | --- | --- | --- | --- |
| CA-fee | V-01 | Gate 1 | T-10, T-16 | OPN-01 |
| Tally | V-02 | Gate 1 | — sizes job 1 (RV-6) | OPN-06 |
| ARPU | V-03 | Gate 1 | T-09 | OPN-01 |
| AI-cost | V-04 and V-14 for inference; V-26, through §22.7 FR-OPS-031, for supervised minutes | Gate 2 | T-13, T-14 | OPN-03 |
| CA-channel | V-05 | Gate 1 | T-11 | OPN-05 |
| Mid-market | V-06 — closed 5 September 2026 | Gate 0 | T-08, and T-09's list anchors | — |
| AI-WTP | V-07 | Gate 2 | T-12 | OPN-07 |
| ESI-regime | V-08 | Gate 0, then continuous | — | FEN-03 |
| Attended-filing | V-25, answered through CR-17a–f on the §23.16 counsel register | Desk, build-blocking; before any operator-attended filing | T-04 | FEN-06, OPN-04 |

Further §20 items gate something named in this section without a shorthand above: V-09, the state PT/LWF dataset (T-07, FEN-05); V-15, the mid-year migration dry run (OPN-08); V-16, the baseline rate of late and rejected filings (T-16); V-17, the overtime cap (DEC-23); V-18, the meal perquisite (DEC-24); V-19, the Form 138 Q4 release (FEN-01); V-20, the r.218 read (FEN-11, RV-18); V-21, the Code-era labour mappings, the gratuity ceiling and bonus among them (FEN-10, RV-17); V-22, the EPS and EDLI successors, joined to the ESI watch (FEN-03); V-23, the portal facts no public document gives (FEN-02, FEN-04, OPN-16); V-24, EPF Scheme 2026 para 25 (OPN-09); and V-27, DPDP commencement and the consent switch (DEC-13).

### 01.14 The ten risks that decide the plan

§20.8 is the risk register. This is a ranked view of it, not a second register: the ten risks an executive reviews first, why each ranks where it does, and where its pre-agreed response already lives. Three tests set the order. **Consequence** first — a wrong statutory number or an unlawful act reaching a customer outranks a thesis failure, which outranks a revenue shortfall. Then **time to trigger** — a dated trigger outranks an undated one. Then **recoverability** — a risk that cannot be undone by spending later outranks one that can.

| Rank | Risk | Why it ranks here | Earliest trigger | Response lives in | Owner |
| --- | --- | --- | --- | --- | --- |
| 1 | The ESI regime is unresolved at the November 2026 cliff | Statutory consequence for every ESI-liable tenant; dated; a filing made against a lapsed rule cannot be taken back | About 1 November 2026 (the V-08 escalation point); on or about 21 November 2026 | R-2; §05.12; the cliff outcomes table | Statutory lead |
| 2 | Attended submission proves unlawful, barred by a portal's terms, or uninsurable as designed | Legal consequence on the core mechanism; decides whether the positioning's scarcest layer ships | Before any operator-attended filing; the R2 entry criteria (§05.7) | R-32; CR-17a–f and §20 V-25; §23.13.3; the launch-posture table | Legal lead |
| 3 | A wrong statutory number ships — a missed corrigendum, the s.2(y) add-back, a boundary edge case | Statutory consequence; the failure that ends a compliance product's credibility fastest; undated, so it needs standing controls | Continuous | R-3, R-15, R-30, and R-29 once a miss reaches a customer; §20.9; §22.8 | Statutory lead + Engineering |
| 4 | The live data-protection regime is breached — written consent missed, a six-hour report missed, an Aadhaar number exposed, one tenant's data read by another | Legal consequence today: IT Act s.43A compensation has no statutory cap (EV-061), and Aadhaar Act exposure reaches company officers personally (EV-067); not recoverable once it happens | From the first paying customer | R-21, R-22, R-27, R-33; §23.4, §23.5, §23.9 | Legal lead + Security lead |
| 5 | The Form 138 Q4 format is still unreleased when Q4 falls due | Dated, and it touches every tenant's Tax Year 2026-27 certificate — but it is external, it blocks every deductor alike, and the product fails closed rather than shipping a guessed layout, so no wrong number reaches a customer | `form138_q4_escalation_date`; 31 May 2027; 15 June 2027 | R-4; §05.12; FEN-01 | Statutory lead + Engineering |
| 6 | The dominant cost line does not fit the per-head price at the tenant the wedge wins | The first thesis consequence (T-14); the binding profile is the 20-person tenant | The first design-partner quarter of instrumented sessions | R-10; §20 V-26; §22.7 FR-OPS-031; §13.19; OPN-03 | Founder |
| 7 | Mid-year migration cannot tie out year-to-date figures, pushing go-lives into April | Thesis consequence for the ramp — an April-clustered ramp and a smooth one are different companies (r5 synthesis) | The first mid-year go-live; the §20 V-15 dry run | R-31, R-28; §18.9; OPN-08 | Product |
| 8 | The CA channel inverts into an opponent | Thesis consequence for the primary GTM motion; no CA has yet been asked | The first V-05 interviews | R-14; OPN-05 | GTM |
| 9 | Money is committed ahead of validation | It turns every hypothesis into a liability | Any raise or headcount plan that cites an unvalidated figure | R-17; §20.7 | Founder |
| 10 | The ISO 27001 clock is not started | Unrecoverable and silent — the seasoning year cannot be bought later | Month 6 with no certification in progress | R-16; DEC-19 | Founder |

**How the ten interact.** Several compound when they land together, and one pair offsets. Reviewing them one at a time misses both:

| Pair | Effect | Why | What to watch |
| --- | --- | --- | --- |
| 1 and 7 | Compound | A tenant that goes live on the September 2026 wage month meets its first imported-quarter Form 138 (31 October) and the ESI cliff (about 21 November) inside one quarter | Mid-year go-lives scheduled between September and November 2026 |
| 5 and 7 | Compound | A migrated tenant's Tax Year 2026-27 Form 130 needs both a clean year-to-date tie-out and a Q4 Annexure II that does not yet exist | Migrated tenants' Annexure II readiness |
| 2 and 6 | Offset | If operator-attended submission is not cleared, supervised minutes leave our books with it and the SLA narrows in step (§22.7 levers), so risk 6 eases as risk 2 lands | `mode_mix` shown beside supervised minutes (§13.19 edge cases) |
| 2 and 4 | Compound | Operator-attended submission means holding employer portal credentials, which may themselves be an individual's password and so sensitive under SPDI r.3 (§23.13.2): the vault is the mechanism of risk 2 and a surface of risk 4 | The vault's threat model (§22.5) |
| 6 and the seat-floor wedge | Compound | The no-seat-floor price lead lands on the tenant that binds the cost target (the worked example under Target user) | Revenue per supervised instance by tenant, flagged below the binding value (§13.19) |
| 3 with 1 or 5 | Compound | A regime or format change arriving close to a due date is where a wrong number is likeliest; the pipeline's freeze window and two-person review are the control | Change requests inside `rule.freeze_window_hours` (§22.12 O15) |
| 8 and OPN-06 | Compound, towards the whole-thesis kill | A hostile CA channel together with negligible Tally payroll adoption and no self-serve conversion is one of §20.11's four kill conditions | §20 V-05 and V-02, read together |
| 9 and every other | Compound | Money committed ahead of the gates turns each of the others from a risk into a sunk cost | The §20.7 gate order |

<!-- DIAGRAM: exec-summary-risk-interactions -->

**What each looks like before it triggers.** The leading indicator for each of the ten, where it is observed and who watches it:

| Rank | Leading indicator | Observed in | Watched by |
| --- | --- | --- | --- |
| 1 | No ESIC or MoLE successor instrument, draft or corrigendum captured by the V-08 watch; PH-12 and PH-13 still unset as the November 2026 payroll month approaches — without PH-13 that month cannot reach LOCKED for an ESI-covered establishment | §22 watcher sources; §23.17 LW-18; the §05.22 parameter-hold registry (§05.18) | Statutory lead, weekly from October 2026 (§20.10) |
| 2 | CR-17 rows still open as R2's entry criteria approach | The counsel register (FR-LEG-040) | Legal lead, at every operating review |
| 3 | Amendments and corrigenda caught by the watcher; golden-corpus failures; reconciliation breaks per period | §22.8.7; AC-01.10 | Statutory lead + Engineering |
| 4 | Biometric enrolments or financial-data captures without a written-consent record; incident drills that miss six hours; any cross-tenant read in the standing isolation tests | The consent entity (§07); the §17 incident runbook; §15.3 isolation tests | Legal lead + Security lead |
| 5 | Protean's Form 138 Q4 regular and correction pages still without an anchor | The §22 watcher (FR-RULE-006) | Statutory lead |
| 6 | Supervised minutes per instance in design-partner sessions against the current value of `max_supervised_minutes_per_filing_cycle` | The §22 cost ledger (FR-OPS-031) | Founder |
| 7 | Year-to-date tie-out variance on the V-15 dry run and on each mid-year go-live | The migration audit (§05.8) | Product |
| 8 | The reasons CAs give in the first V-05 interviews, not only their yes or no | The V-05 memo | GTM |
| 9 | A model, plan or deck citing a [Hypothesis] figure without its V-ID | §20.12 rule 4 | Founder |
| 10 | No ISO 27001 engagement start date on record | The certification roadmap (§17.15) | Founder |

**Just below the line.** Five risks were considered and ranked lower, each for a stated reason:

| Risk | Why it is not in the ten | Pointer |
| --- | --- | --- |
| Zoho widens its free gates | It erodes the 20–50 sub-band, not the 50–200 core, and the response is pre-agreed | R-1; §21.11 CRS-01 |
| The state PT/LWF dataset stays incomplete | A fence, not a wrong number: aggregator data never ships, so the failure is a narrower offer rather than a mis-filing | FEN-05; §20 V-09 |
| DPDP commencement is compressed | It moves the date of DEC-13's switch, not the posture; both consent regimes are already built | §23.17 LW-02; R-22 |
| A disability-discrimination complaint reaches a customer that used AI-assisted screening | The customer's exposure, answered by the records the product keeps — RPwD Rule 3(2)'s written-response duty lands at twenty persons, exactly the beachhead floor | §23.10; EV-076 |
| The WhatsApp business account misses INR-billing migration | Dated (31 December 2026) but operational and cheap to prevent | EV-088 |

#### How the ranked view changes

The ten are a view over §20.8, recomputed rather than edited. A risk leaves the view in one of three recorded ways: it **retires** when the event it watched resolves without harm or its response completes; it is **absorbed** when another ranked risk, named, carries its residual; or it is **demoted** when one of the three ranking tests changes, and the test is named. A risk that has fired is recorded as fired, not retired. Leaving the view never closes the §20.8 row.

Most of the ten already have a foreseeable resolving event. What each outcome does to the view:

| Event | Outcome | Effect on the ten | Pointer |
| --- | --- | --- | --- |
| The CoSS s.164(2)(b) saving lapses, on or about 21 November 2026 | The saving is extended, or a successor changing rates or ceilings only is published with §06.14 TV3 and TV4 re-baselined | Risk 1 retires; its residual — a wrong figure in the new rule version — is absorbed by risk 3 | The cliff outcomes; §05.18 F-04 |
| Same | A successor redefines the contribution base | Risk 1 stays, re-described as a fast-follow build with ESI lines carved out | §05.12; §05.18 F-04 |
| Same | Nothing is notified | Risk 1 stays; its instances sit in BLOCKED and the November month's lock waits on PH-13 | R-2; §05.18 |
| A CR-17 answer | Mode C cleared on a portal | Risk 2 narrows to the portals still open; risk 6 grows by that portal's Mode C minutes — the 2 and 6 offset, run in reverse | The launch-posture table; §22.7 |
| Same | Not cleared anywhere, or CR-17e or CR-17f still open at launch | Risk 2 has resolved into the matching row of the launch-posture table and retires; risk 6 eases | Same |
| The first design-partner quarter of instrumented sessions | Minutes measured against the card | Risk 6 is decided through OPN-03 and retires once the target and the card are set; it returns when a §13.19 recomputation, or the per-tenant view, shows a tenant below `R_inst(binding)` | §13.19; OPN-03 |
| The §20 V-15 dry run | The tie-out passes, or fails | Risk 7 retires, or fires and R-31's response runs — forecast April go-lives only | R-31 |
| The first V-05 interviews | CAs read a channel, or disintermediation | Risk 8 retires, or fires and R-14's response runs | R-14; OPN-05 |
| An ISO 27001 engagement start is recorded | At month zero, as DEC-19 requires, or later | Risk 10 retires when the certificate is in hand by about month 6. A later start is recorded as the risk having fired: the month-18 bid window slips by the delay, since acquisition takes 3–6 months and seasoning twelve more | R-16; DEC-19; §05.2 |
| DPDP commences, on or about 13 May 2027 | — | Risk 4 stays; the consent regime it watches switches (DEC-13) | R-22 |
| The Form 138 Q4 format publishes | In time for 31 May 2027, or not | Risk 5 retires, or fires into the declared carve-out | §05.18 F-01 outcomes; R-4 |

Risks 3 and 9 have no resolving event: they are standing controls, reviewed every cadence (§20.10).

- **AC-01.20 — The ranked view is recomputed, and every change is recorded.** The view is recomputed at every operating review, and whenever a trigger of one of the ten fires or a dated trigger passes. Each change records the event, the risk, its old and new rank, how it left or entered, the test that changed and the evidence. Ten is a ceiling, not a quota: a below-the-line risk enters only when its owner records which of the three tests it now meets that it did not, so a vacancy alone never promotes one.

| # | Given | When | Then | Negative or edge covered |
| --- | --- | --- | --- | --- |
| TS-01.35 | On 22 November 2026 an ESI successor changing rates only has been published, and §06.14 TV3 and TV4 pass | The operating review recomputes the view | Risk 1 is recorded as retired with the event and evidence; its residual is named against risk 3; the view holds nine unless an owner records a changed test for a below-the-line risk | Promoting the WhatsApp INR-billing risk because a slot opened fails AC-01.20 |
| TS-01.36 | Month 6 arrives with no ISO 27001 engagement start on record | The view is recomputed | Risk 10 is recorded as fired, not retired; R-16's response shows the month-18 bid window slipping by the delay | Dropping risk 10 from the view as no longer preventable fails AC-01.20 |

#### The dated triggers, in order

| Date | Trigger | Rank | Pre-agreed response |
| --- | --- | --- | --- |
| 31 October 2026 | Form 138 Q2 due — for a September go-live, the first quarterly statement carrying imported months | 7 | R-31, R-28; §20 V-15 |
| About 1 November 2026 | No ESI successor yet — the escalation point | 1 | R-2 |
| On or about 21 November 2026 | The CoSS s.164(2)(b) saving of the ESI rules expires | 1 | R-2; the cliff outcomes table |
| 31 December 2026 | Our WhatsApp business account must be on INR billing | Below the line | EV-088 |
| 1 January 2027 | Gemini 3.x Flash price doubles — already the base case | — (R-12, priced in) | The §13 router |
| 28 February 2027 | OSH FORM-XVII and SS Form XXIII annual returns — a hard deadline if R1 is live | Release | §05.7 A-20, A-21 |
| On or about 13 May 2027 | DPDP substantive provisions commence; the consent regime switches | 4 | R-22; DEC-13 |
| `form138_q4_escalation_date` | No Q4 anchor on Protean's pages | 5 | R-4 |
| 31 May 2027 | Form 138 Q4 due for Tax Year 2026-27 | 5 | R-4; FEN-01 |
| 15 June 2027 | Form 130 due to every employee | 5 | The §05.12 carve-out |
| Month 6 from the start | ISO 27001 certificate in hand, or the month-18 bid window slips | 10 | R-16 |

<!-- DIAGRAM: exec-summary-dated-triggers -->

### 01.15 How to read this document

This PRD carries provenance inline, because earlier drafts of this market view got substantial parts of it wrong. Five research rounds ran (r1–r5), each re-verifying the last against primary sources. Across the first two, **28 named strategic conclusions were killed outright and ~90 individual claims were retracted — every retraction moving in the same direction: smaller, later, more contested, already occupied.** That pattern is the most important meta-finding: the research process had systematic optimism bias, not random error. Rounds three to five kept hunting and found the errors do not all run one way once fabricated precision is stripped out: the 93–99% inference-margin claim (EV-088) and the "we file for you" framing (EV-030) were withdrawn, but a pessimistic conclusion was also **[Reversed]** — multi-state PT and LWF *is* a differentiator against Frappe and TallyPrime (EV-031, EV-032). Measured on re-verification, roughly thirteen findings per dimension died on a source re-check, so **treat any early-round claim not re-checked since as ~70–75% reliable, not settled** (the discipline behind this is §02).

Five markers appear throughout. Read them as instructions, not decoration:

| Marker | Meaning | How to treat it |
| --- | --- | --- |
| **[Verified]** | Primary source (gazette, government statistic, filed financial statement, source repository, or a vendor's own page — read both raw and rendered, because each hides what the other shows), survived hostile re-check | Safe to build on and safe to say out loud |
| **[Verified — mirror]** | As above, but the primary document was read from a third-party mirror because the official host was unreachable | Safe to build on; **pull from the primary source before customer use** |
| **[Hypothesis]** | Plausible, reasoned from verified inputs, *not yet contradicted but not evidence* | Do **not** put in a model, deck or contract until validated. Every one reappears with a named validation method and a kill criterion (§02.2, and the validation table above) |
| **[Killed]** | Was believed, now disproven | Recorded deliberately so it does not get resurrected in a later deck. §02.7 and §20.4 list the specific numbers banned from every model |
| **[Reversed]** | A conclusion an earlier draft of *this PRD* stated, now retracted — with a one-line reason where it appears | Treat the earlier statement as dead wherever it survives in older decks or notes; §02 keeps the register |

**Standing rule (non-negotiable):** no compliance or competitive claim ships to a website, deck, or contract without a gazette, notified-rule, filing, regulator or source-repository citation captured with URL and date — *and a check for a corrigendum* (§02.4, §02.5). No competitor claim ships without, in addition, a dated capture, a note of whether the product was executed or only its documentation read, and clearance (§21, §23). Two careful rounds of primary-source work reached *opposite* conclusions on the November 2026 EPF cliff, because one read a notification without checking whether a corrigendum had amended it.

What is *not* yet validated is stated in full in the validation programme above and is not restated here: no pricing, business-case, GTM or attach-revenue figure in this document is validated, no real quote, invoice, won deal or renewal figure exists anywhere in the research, and the gate is the programme rather than the document. A reader who skipped that subsection should read it before treating any commercial figure in §04, §11 or §18 as a number.

### 01.16 Reading guide — paths, precedence, registers and vocabulary

The section map below is the table of contents. This guide is for using the document: the path each reader takes, which section wins when two disagree, where each family of IDs lives, and the words that must not drift.

#### Paths by reader

| Reader | Arrives asking | Read, in order | Owns here | Must not get wrong |
| --- | --- | --- | --- | --- |
| Founder or investor | Is this fundable, and on what gate? | §01 → §20.6, §20.7, §20.11 → §04 → §05 → §13.19 → §18 → §22.10 | DEC-19; OPN-01, OPN-03, OPN-11, OPN-13; R-10, R-16, R-17 | Committing money ahead of Gate 1; quoting a [Hypothesis] as a number |
| Engineering lead | What can the team start on Monday, and in what order? | §05.7 → §15 → §14 → §08 → §06.14 → §22.8 → §17 | DEC-07 to DEC-12, DEC-14 to DEC-18, DEC-21, DEC-22, DEC-25; OPN-14 | Engine purity; the scope of bitemporality; fences that fail to BLOCKED, never to a guess |
| Statutory lead | Which rule is verified, and which is a parameter? | §06 → §02.4 → §22.8, §22.9 → §20.9 → §08 | FEN-01 to FEN-05, FEN-09 to FEN-12; DEC-23, DEC-24; R-2, R-3, R-4, R-15, R-30 | The corrigendum check; aggregator data used as a source |
| Legal lead or counsel | What may be said, and what is waiting for us? | §23.1 → §23.16 → §23.13 → §23.2 to §23.12 → §22.2 | FEN-06, FEN-08; OPN-04, OPN-09 to OPN-12; every CR item | Stating an answer to any Part D question, in either direction |
| Compliance operations lead | Who submits, on whose credentials, at what cost per minute? | §22 → §23.13 → §08 FR-PAY-711 → §19.8 | The runbooks, the vault and the desk; the §22.7 parameters; OPN-15, OPN-16 | "We file for you"; an irreversible portal act without an approver bound to it |
| GTM and pricing | What can we say, and at what price? | §18 → §21.4, §21.12 → the positioning claims above → §03 | OPN-01, OPN-02, OPN-05, OPN-06; PC-1 to PC-10 | An uncleared competitor claim; a single price ceiling; the seat-floor claim without its scope |
| Outside reader — design partner, CA, investor's counsel | What does this product do for me? | A cleared excerpt only, carrying the §23.1.1 box (below) | — | Treating any excerpt as legal advice or as a statement of a competitor's product |
| Product — talent, benefits, AI | What is in v1, and what is bundled? | §05.5 → §12 → §10 → §11 → §23.10, §23.11 | DEC-03, DEC-04, DEC-15, DEC-20; OPN-07 | Selling a discrimination control as a legal mandate; a statutory figure produced by a model |

#### The three new sections

**§21 — Competitive Landscape & Parity.** Competitive analysis was spread across the market, scope and pricing sections of earlier drafts, and two of its conclusions were wrong at source (RV-1, RV-10). §21 now owns the competitive-set register, the two-incumbents split (§21.2), the corrected Frappe/Tally parity table with its four deliberately unresolved cells (§21.3), the six-vendor rate cards and seat-floor arithmetic (§21.4), Keka in full (§21.5), the competitive-response scenarios CRS-01 onward (§21.11) and the competitor-claim clearance rule (§21.12). Its rule for every other section: a competitor fact anywhere in this PRD carries a capture date and a note of whether the product was executed or only its documentation read, and none reaches a customer without clearance.

**§22 — Compliance Operations.** Three independent reviewers found the attended filing operation unscoped and the compliance data set named as a moat with nothing behind it (r5 synthesis). §22 is the receiving end of every "§22" handoff elsewhere: the delivery modes (FR-OPS-001), the written authority to act, the credential vault, the per-portal runbooks, the supervised-minute cost model (§22.7), the compliance data pipeline (§22.8) and its sizing and org design (§22.9, §22.10). It cites, rather than restates, the filing state machine (§08), the rule schema (§14.6), metric definitions (§19) and legal analysis (§23).

**§23 — Legal & Regulatory Compliance.** Legal propositions sat in eleven sections of the previous draft behind a disclaimer that covered one of them (r5 synthesis). §23 now holds the document-wide not-legal-advice box (§23.1.1), the representation-control rule (§23.1.2), the regime map as of 11 September 2026 (§23.2), the employment-discrimination domain (§23.10), the attended-filing fence (§23.13) and the counsel register (§23.16), whose CR-01 to CR-20 carry Part D's numbering. Its rule for every other section: where a section and §23 differ on a legal proposition, §23 governs.

#### For a returning reviewer — where each round-five defect is closed

The round-five engineer, CFO and counsel reviews listed specific defects in the previous draft (r5 synthesis). Each is closed here:

| Defect found in round five | Closed by |
| --- | --- |
| The headline metric could not be computed — the filing machine had no rejected state | FR-PAY-711 with REJECTED, REVISED, SUPPLEMENTARY and PAYMENT_INITIATED; OTAF (§19.1); the completion predicate in this section |
| The verification gate had no state to sit in | FR-PAY-301 M10, immediately before PAYMENT_INITIATED (DEC-07) |
| A terminal, immutable FILED against Revised and Supplementary returns | Corrections as linked diffs (FR-PAY-711 F10–F13; `corrects_filing_id`, §14.4.5) |
| Universal bitemporality against erase-on-exit | Bitemporality scoped by entity class (DEC-10; §14; RV-13) |
| A pure engine against a disbursal-date rule | Purity over an enumerated evaluation context that includes the disbursal date (DEC-09; §15.4) |
| A topological DAG against the s.2(y) add-back | Bounded fixed-point nodes, with the add-back as the worked case (DEC-09; §08; §15) |
| Aadhaar optional everywhere against first-time portal acceptance | Exclude-and-flag, never a payroll block (AC-01.9; FR-CHR-101; OPN-09) |
| Consent cannot be backfilled against P0 mid-year migration | The migration consent flow (§07; Part E-12; DEC-13) |
| RBI obligations "with no turnover threshold" against "only where material" | Materiality-gated, entity by entity (RV-12) |
| Replay "satisfies" RBI's right to audit | Replay supports evidence production (RV-14) |
| VERIFIED applied to mirror-sourced findings | The [Verified — mirror] marker and the §02.7 mirror register |
| A not-legal-advice box that covered one section | The document-wide box (§23.1.1) |
| The appointment letter at no threshold; worker and employee used interchangeably; POSH absent | RV-11; counting unit and sphere as schema fields (EV-057; §06.1); POSH s.4(1) in the step function (EV-056) |
| The meal perquisite without its conditions | The conditions as engine constraints, the rule citation routed to §20 V-18 (K-19; §08; §11) |
| Competitor assertions framed for sales use | The competitor-claim rule (§21.12); PC-2 to PC-4 and PC-10 |
| Attended filing with no mechanism | The mechanism decision and the delivery modes (§22.1.2; FR-OPS-001) |
| A compliance data set named a moat with no pipeline | §22.8 to §22.10 (RV-15) |
| The April-only go-live risk missing from the register | Risk 7 among the ten; R-28 |
| Attended-filing legality missing from the counsel list | CR-17a–f (§23.16) |
| A 70–75% discount unusable because no marker carries a round | It applies to register rows whose capture shows only r1 or r2 (the §02.7 measured error-rate note) |
| Funding gated on validation against month-zero commitments | The month-zero commitments table in the decision summary |
| The 93–99% margin header and the s.7(i) day-one claim, both now withdrawn | RV-2; RV-3 |
| An instruction to omit an unverifiable section number (PAN–Aadhaar) | Routed as an open question (CR-31); nothing is cited that has not been verified (§23.1.4) |

#### When two sections disagree

| Subject | Governing section | Basis |
| --- | --- | --- |
| A statement of law | §23 | §23's own precedence rule |
| A statutory rule, rate, threshold, form or due date | §06 — the canonical statement; test vectors in §06.14, the calendar in §06.11 | §20.9 defers to it; the rule store is authored from it through §22.8 |
| An evidence grade or a kill | §02.7 | The only place EV and EV-K rows are minted |
| A metric's definition, including "on time" | §19 | §05.8 and §22 both cede it |
| The payroll-month and filing state machines | §08 — FR-PAY-301, FR-PAY-711 | §14 and §22 both cite §08 as canonical |
| An entity or a field | §14 | — |
| Scope, phase, P0 and release | §05 — P0 is reserved for the R1 list | §05.7 |
| How a filing is operated and submitted | §22 | §22's own statement of what it owns |
| A competitor fact | §21, with the §02 row it cites | §21.12 |
| A price or a packaging term | §18 | — |
| The status of a decision | This section's decision summary | AC-01.12 |

#### Where the registers live

| ID family | Register | Section |
| --- | --- | --- |
| EV-### | Evidence rows | §02.7 |
| EV-K## | Kill rows, one per corrections-ledger item | §02.7 |
| T-##, RV-##, DEC-##, FEN-##, OPN-##, DS-#, PC-##, RL-#, AC-01.##, TS-01.## | Thesis claims, reversals, decisions and their transitions, positioning claims, the register lint, promises, acceptance scenarios. FEN items are a view of §05.18's fence records | §01 |
| A-## | The v1 artefact register — buildable, fenced, deferred | §05.7 |
| F-##, FL#, PH-## | Fence records and their lifecycle; parameter holds | §05.18; §05.22 |
| V-## | Validation plan | §20.6 |
| R-## | Risk register | §20.8 |
| NG-##, AR-## | Non-goals and anti-recommendations | §20.1 to §20.3 |
| CRS-##, CLR-##, CQ-## | Competitive-response scenarios, competitor-claim rules, open competitive questions | §21.11, §21.12, §21.14 |
| H-P## | Pricing hypotheses | §18.16 |
| FR-CHR-### | Core HR | §07 |
| FR-PAY-### | Payroll and statutory filing | §08 |
| FR-ATT, FR-DEV, FR-LV, FR-SHF, FR-OT and related families | Attendance, devices, leave, shifts, overtime | §09 |
| FR-T-R, FR-T-P, FR-T-O, FR-T-X, FR-T-D | Talent — recruiting, performance, onboarding, cross-cutting, discrimination | §10 |
| BEN-## | Benefits | §11 |
| AC-DM-## | Data-model acceptance criteria | §14 |
| NFR-* | Non-functional requirements | §17 |
| FR-OPS-###, FR-RULE-### | The attended filing operation; the compliance data pipeline | §22 |
| FR-LEG-###, CR-##, LW-##, B# | Legal requirements, the counsel register, the legal watch list, banned claims | §23 |

#### Vocabulary that must not drift

Several reversals in this PRD began as a word used loosely — "file" for "submit", "employee" for "worker", "the incumbent" for two of them. These terms carry one meaning throughout:

| Term | Meaning in this PRD | Canonical source |
| --- | --- | --- |
| Filing instance | One registration × obligation × period | §08 FR-PAY-711; §14.4.5 |
| Registration | A statutory account a filing attaches to — a PF establishment code, an ESI code, a TAN, a PT registration per state and type, an LWF registration | §14.4.1; §22.7 |
| Portal-accepted artefact | A file or return generated in the format notified for its period, validated at the portal's own severity, and accepted by the portal | This section's definition of done |
| Submitted | Uploaded in an attended portal session — the SUBMITTED state; not yet accepted | §08 FR-PAY-711 F6 |
| Accepted | The portal accepted the upload and, for the ECR, the employer approved the return statement — the ACCEPTED state | §08 F9 |
| Filed | Acknowledgement stored and, where payment-bearing, the payment receipt captured — FILED, the only state that counts | §08 F15, F16 |
| Complete; on time | The completion predicate; complete and no later than the due date by the authority's own timestamp | This section; §19.1 |
| OTAF | On-time, accepted statutory filings — the north-star metric | §19.1 |
| Attended session | A portal session a named human attends; no unattended automation and no CAPTCHA bypass | §22.1 P1 |
| Written authority to act | The customer's executed instrument under which our operator may act on named portals for named registrations | §22.2; §23.13.4 |
| Submission modes | A — employer-attended; B — co-attended, the employer's user driving while our operator guides; C — operator-attended under written authority; D — CA-attended. §22 FR-OPS-001 is canonical. §23.13.3's two-mode shorthand maps as its Mode A = §22 Modes A and B, and its Mode B = §22 Mode C. §14.4.5's `submission_mode` values map as `employer` = A or B and `operator_under_written_authority` = C; Mode D has no value there yet, a reconciliation owed between §14 and §22 | §22 FR-OPS-001 |
| Regular, Supplementary, Revised | The three ECR return types: Supplementary needs an approved Regular and carries only members absent from every prior return for the month; Revised needs an approved Regular, no other return in process and no payment initiated | EV-037 |
| Verification gate | The check that runs immediately before PAYMENT_INITIATED; after it, a Revised ECR is impossible | FR-PAY-301 M10; EV-037 |
| Coverage-gap register | Where obligations the product cannot yet file are tracked — outside the on-time denominator, never silently dropped | §19.1.1, §19.1.2 |
| Tenant; legal entity; establishment | The customer account; the employer that carries statutory liability; the unit a registration covers. One tenant may hold several legal entities | §14.3; §15.3.9 |
| Fenced | Built or specified; cannot go live until a named external blocker clears | §05.7 |
| Carved out | A fenced item declared outside the SLA because its blocker was still open at the gate that needed it | §05.12 |
| Deferred | Not in v1; re-enters only when its named gate opens | §05.13 |
| Killed; Reversed | A disproven claim; a conclusion this PRD stated and has retracted | §02.2; §02.7 |
| Worker; employee; person | Different counting units for different obligations; the unit is a schema field on every threshold | EV-057; §06.1 |
| Central sphere; state sphere | Whether the central or a state government prescribes the obligation, form or period | EV-053, EV-057; §06 |
| Tax Year | The Income-tax Act 2025 term replacing "Financial Year"; the file field reads 202627 for Tax Year 2026-27 | EV-050 |
| Value floor; clearing band; target | ~₹50 PEPM at 50 employees; ₹80–200 PEPM at 50 employees; our ₹80–150 hypothesis inside the band | EV-027; §18.3 |
| Binding profile | The admitted tenant profile with the lowest revenue per supervised filing instance | §13.19 |
| Two incumbents | Tally for accounting and the statutory artefacts; greytHR for the HRMS | EV-032; §21.2 |
| P0 | The R1 list, and nothing else | §05.5, §05.7 |
| UAN | Universal Account Number — the member's permanent PF identity across employers; the first field of every ECR line | §06.2; EV-035 |
| Due Deposit Balance Summary | The amounts due that EPFO generates when the employer approves a return — contributions, interest, damages, administrative and inspection charges | EV-036; r3/05 |
| TRRN | Temporary Return Reference Number — generated with the challan for an approved ECR return and used to pay it | EV-036; r3/05 |
| FVU | Protean's File Validation Utility, which the deductor runs over a TDS statement before uploading it; the version is chosen by period | EV-052; §22 front matter |
| TRACES | The income-tax portal that alone generates Form 130; a certificate generated anywhere else is invalid | EV-048 |
| PTRC; PTEC | The employer's registration to deduct and remit employees' PT; the entity's own PT enrolment — two registrations and two liabilities per state | §06.4 |

#### Taking this document outside the company

No excerpt leaves the company without the §23.1.1 box verbatim and the FR-LEG-001 clearance of every legal or competitor claim it contains. Internal reliability language — the ~70–75% figure above, for instance — is either backed by re-verifying the discounted claims or deleted from any external version; it is never shipped as a printed admission (r5 synthesis). The positioning-claims table is the starting list for an external version of this section.

### 01.17 Section map

The document is twenty-three sections; §21, §22 and §23 are new in this revision. This map is the authoritative numbering; every inline cross-reference in this PRD uses it.

| § | Section | What it settles |
| --- | --- | --- |
| **01** | Executive Summary & Vision *(this section)* | The thesis, its claims and what rests on each; the definition of done as a predicate; the two contrarian findings; what this PRD reverses and the guards that keep it reversed; target user; positioning; phasing; the decision summary and its register records; the validation programme; the ten risks and how the view changes; the reading guide |
| 02 | Evidence Register & Confidence Methodology | How a claim earns a marker; the EV register; the round-by-round retraction record, [Reversed] and mirror-sourced registers; the corrigendum standing rule |
| 03 | Personas, Jobs-to-be-Done & User Segments | Buyer, admin/CA, employee, deskless worker — the job each hires the product to do; the CA as a channel persona |
| 04 | Problem Statement & Market Sizing | Bottom-up TAM on a government denominator (7.66 lakh contributing establishments); ₹2,100–3,900 Cr real spend reconciled against list PEPM; the 20–50 band as structurally overcharged |
| 05 | Scope Decision, Non-Committal Bands & Phasing | The commit/decline bands; why enterprise is closed; v1 scope — buildable now vs fenced, and what each fence waits on; release plan and gates; the compliance-maintenance operating model |
| 06 | The Statutory Compliance Spine | The step function with counting unit and sphere, POSH, the 50% add-back, the Nov 2026 cliff, the registers, the ECR spec, Form 138/130 and the dual vocabulary, the per-state PT/LWF dataset |
| 07 | FR — Core HR System of Record | The effective-dated source of truth every filing reads from; identifier placement; the Aadhaar token store; consent entities and migration consent |
| 08 | FR — Payroll & Statutory Filing Engine | The two-wage-base engine; ECR/ESI/PT/Form 138 generation and validation; the payroll-month and filing state machines |
| 09 | FR — Attendance, Leave & Deskless | ADMS/WDMS receiver in v1; a Form IX-compliant per-day IN/OUT time model; the non-biometric path; shared-device design; the device compatibility matrix |
| 10 | FR — Talent (Recruiting & Performance) | The wedge, not the spine; inbound-only recruiting; bring-your-own-job-board; discrimination-law controls sold as defensibility, never as a legal mandate |
| 11 | FR — Benefits Attach | Build the data model, defer the monetisation; two separate revenue lines |
| 12 | AI Architecture — Assistant, Agents & Use Cases | AI priced to zero; human-in-loop for statutory/money actions; the redaction chokepoint; monetise only the legibly-incremental; the statutory watcher |
| 13 | AI Unit Economics & Provider Abstraction | The four-line COGS stack; the 52.7× spread; rules-first, LLM-last; router as P0; the per-provider residency matrix |
| 14 | Data Model, Entities & Retention | `Filing` as a first-class entity; two wage bases in the schema; bitemporality scoped by entity class; effective-dated per-jurisdiction rules |
| 15 | System Architecture & Multi-Tenancy | Components, responsibilities, tenancy isolation; engine purity and bounded fixed-point evaluation |
| 16 | Integrations & External Interfaces | Tally/Zoho/Kredily/Frappe importers; CA console; ADMS receiver; migration as a product surface; statutory portals as attended automation, not APIs; MCP tool split |
| 17 | Non-Functional Requirements — Security, DPDP, Scale | Windowed availability SLO; CERT-In six-hour pipeline and 180-day in-India logs; ISO 27001 timeline; sectoral overlays as NFR profiles |
| 18 | Pricing Architecture, GTM & Channel | Size-gate not feature-gate; the two-anchor price structure; no seat floor; the registration cap; the CA and Tally channels; migration strategy |
| 19 | Success Metrics & Instrumentation | The headline metric (filings completed on time) computed off the filing state machine; the compliance SLA as a specification; activation and retention; AI-cost instrumentation built from v1 |
| 20 | Non-Goals, Validation Plan & Risk Register | What the product will not do; the validation programme split into build-blocking desk work and commercial validation; the risk register and banned-number discipline |
| 21 | Competitive Landscape & Parity *(new)* | Two incumbents, two jobs; the Frappe/Tally parity table; the six-vendor price table and the 50-seat floor; Keka; no vendor submits filings |
| 22 | Compliance Operations — Attended Filing & the Compliance Data Pipeline *(new)* | Per-portal runbooks; the credential vault; liability allocation; the rule-maintenance pipeline and its sizing; the org-design implication |
| 23 | Legal & Regulatory Compliance *(new)* | DPDP commencement and what binds today — SPDI written consent, the CERT-In six-hour clock; Aadhaar; biometric attendance; employment discrimination; sectoral overlays; attended-filing legality; the counsel register |

### 01.18 Computed figures in this section — how to recompute them

Every figure in this section is either quoted with its evidence ID or computed from quoted figures. The computed ones are listed so that a reviewer can recompute each without trusting the prose (§02.5 internal-consistency cross-checks).

| Figure | Where | Computation | Inputs |
| --- | --- | --- | --- |
| ₹29,940 a year — greytHR at 20 employees | Target user | ₹2,495 × 12 | EV-027 |
| ₹122.50 to ₹349.95 PEPM at 20 employees | Target user | Block ÷ 20: ₹2,450 ÷ 20 and ₹6,999 ÷ 20 | EV-027 |
| The crossover headcounts | "No seat floor" worked example | Below the block: block ÷ PEPM, rounded down. Above it: where our PEPM exceeds the marginal rate, we are cheaper only while headcount < (block − marginal rate × seats in the block) ÷ (PEPM − marginal rate), which on every card in the table falls below the block size; where our PEPM is at or below the marginal rate, we are cheaper at every size | EV-027; §21.4; §18.3 |
| ₹26,400 a year; ₹910 and ₹6,828 per supervised instance | Same | 20 × ₹110 × 12; ₹26,400 ÷ 29; 150 × ₹110 × 12 ÷ 29 | §22.7 instance counts; §18.3's illustrative ₹110 |
| 29 and 70 central supervised instances a year | The multi-state month | 12 + 12 + 4 + 1 for one PF code, one ESI code and one TAN; 12 × 2 + 12 × 3 + 4 × 2 + 1 × 2 for two, three and two | §22.7 |
| ₹1,250 EPS cap | Step function; ECR worked example | 8.33% × ₹15,000 | EPF Scheme; the EV-035 help-file fixture |
| ₹37,200, ₹25,000 and ₹12,200 file totals | ECR worked example | 19 fixture lines plus one ₹25,000 line | EV-035 fixture (r5/02) |
| ₹25,833 and ₹11,367 — the negative case | Same | 8.33% × ₹25,000 = ₹2,083 applied without the ceiling; ₹3,000 − ₹2,083 = ₹917 | Same |
| 75% excluded; ₹25,000 add-back; ₹50,000 PF base | The 50% add-back example | (₹25,000 + ₹10,000 + ₹10,000 + ₹30,000) ÷ ₹1,00,000; (75% − 50%) × ₹1,00,000; ₹25,000 + ₹25,000 | Code on Wages s.2(y) |
| Eight of ten months | The example tenant's first ten months | Rows whose "What bites" entry names a fence, a dated risk or an unverified date — every row except March and July 2027 | That table |
| ₹900, ₹2,250; ₹295 cheaper → ₹1,300 dearer; ₹3,005 → ₹3,250 dearer | "One vendor drops its block" fixture | 20 × ₹45 and 50 × ₹45; ₹2,495 − 20 × ₹110 and 20 × ₹110 − ₹900; 50 × ₹110 − ₹2,495 and 50 × ₹110 − ₹2,250 | EV-027 via §21.4; §18.3's illustrative ₹110 |
| Four, two, five, three and two open items | "Where the open items wait" | OPN-09 to OPN-12; OPN-15, OPN-16; OPN-02, OPN-03, OPN-08, OPN-13, OPN-14; OPN-01, OPN-06, OPN-07; OPN-04, OPN-05 — sixteen in all | The Open table's "Waiting on" column |

### 01.19 Document metadata

| Field | Value |
| --- | --- |
| **Title** | Filing-First HRMS — Product Requirements Document |
| **Market** | India (India-first; statutory payroll is core, not an edge case) |
| **Version** | v1.0, finalising from v0.3 |
| **Section 01 status** | Executive Summary & Vision — correctness pass against the v1.0 corrections ledger; section map re-based to the 23-section build; specification depth added — thesis claims, the completion predicate and its acceptance scenarios, the reversals, the decision summary, the ten risks and the reading guide; then the claim dependency map, the reversal guards, the fence crosswalk to §05.18, the register records and lint (RL-1 to RL-10), and the rules for recomputing the ranked risk view (AC-01.16 to AC-01.21, TS-01.24 to TS-01.36) |
| **Base document date** | 4 September 2026 (revised 11 September 2026) |
| **Evidence base** | Five research rounds (r1–r5). Rounds 1–2: 2 adversarial sweeps · 38 agents · ~5.6M tokens · bias-check pass on every dimension; rounds 3–5: primary-source re-verification plus engineer, CFO and counsel reviews (§02) |
| **Retractions** | Rounds 1–2: ~90 claims retracted and 28 strategic conclusions killed, all one-directional. Rounds 3–5: further kills and reversals of this PRD's own earlier conclusions, not all in the same direction — see [Reversed] markers and §02 |
| **FX assumption** | USD/INR **₹94.43** (Sep 2026; EV-089) — *not* ₹83.3; treat FX as a strategic input, model at 90/95/100 (§13.2) |
| **Confidence discipline** | [Verified] / [Verified — mirror] / [Hypothesis] / [Killed] / [Reversed] inline; standing rule = gazette/filing/regulator/source-repository citation + corrigendum check before any external claim (§02) |
| **Deliverable scope** | PRD only. No application code, scaffolding, or tech spikes until explicitly authorised |
| **The gate** | The validation programme (eight open questions above; consolidated in §20) — fund the programme, not this document |

**Bottom line for the reader:** the beachhead is not a retreat from the founder's full-platform vision — it is the only launch the evidence supports, and the only one from which the vision is reachable. AI priced to zero and enterprise procurement closed for three years are not reasons to build less; they are the two constraints that tell you *what to build first, for whom, and how to defend it.* Build the filing and carry it through the portal, own the data and the tools the assistant calls, buy the ISO year now, and instrument every rupee of cost-of-goods — supervised filing minutes first, inference last — before there is a price. The rest of this document is the specification for exactly that.
