## 18. Pricing Architecture, GTM & Channel

This section converts the two most consequential findings in the document into a pricing and go-to-market plan: **the price floor of computation is zero and it is defended by well-capitalised incumbents** (§04), and **the statutory filing — not the payslip — is the unit of delivery** (§04). Those two facts are in tension. A zero floor says "you cannot charge for HR software as such." The filing thesis says "you can charge for the one thing the free alternatives structurally do not do — carry the filing to portal acceptance and stand behind that service." The deliverable is a portal-accepted artefact plus attended, assisted submission under the employer's written authority to act; the employer's and deductor's statutory liability is non-delegable and stays with them (K-13, §22). The whole pricing architecture below is the resolution of that tension: **price the guarantee, not the seat; publish the price; and let the free tiers do the top-of-funnel work Zoho and Kredily are already paying to do.**

Two standing rules from Draft 1 govern everything here and are not re-argued per subsection:

- **No number in this section may enter a financial model until the §20.6 validation programme reports.** Every competitor figure is *list price* from the vendors' own pages — the six priced suites captured on 5 Sep 2026 and normalised to 50 employees (EV-021–EV-027), the freemium and open-source rows from research rounds two and three (r2/01, r3/01, r3/03) — excluding GST, setup and term discounts. Realised ARPU is unmeasured. What the evidence supports is **shape, not level** (§04, [Verified]). Accordingly, every rupee figure below that describes *our* pricing, and every buyer-side number (bureau fees, CAC, conversion, willingness to pay), is tagged **[Hypothesis]** with a kill criterion; only competitor list prices and statutory facts are **[Verified]**.
- **AI is cost-of-goods and an acquisition weapon, not the revenue line** (§13, [Verified]). Seven vendors price HR AI at zero. The assistant is bundled into every paid plan. Monetisation appears only where the unit of value is legibly incremental — and even those SKUs carry a kill criterion (§18.5).

---

### 18.1 The price floor, restated as a design constraint

The single most consequential correction across both research rounds was that **the marginal price of HR-and-payroll software in the beachhead is zero, set there deliberately by vendors with more capital than us.** Any pricing conversation that does not begin here is fiction. This subsection restates the floor from §04 and adds, for each free alternative, the *displacement narrative* — not "why they are worse" (they frequently are not) but "on what specific axis we take the customer, and where we concede."

| Alternative | Price (list, ex-GST) | What it already does for free / cheap | The axis we win on | The axis we concede |
| --- | --- | --- | --- | --- |
| **TallyPrime** — incumbent for accounting and the statutory artefacts (one of two incumbents; greytHR holds the HRMS job — K-23) | ₹0 incremental; ₹22,500 Silver perpetual (single-PC), ₹67,500 Gold (multi-user, 3× the price — EV-032; Tally buy page, r3/01) | Ships the central statutory artefacts in the licence: PF 3A/5/6A/10/12A + ECR, ESI 3/5/6, PT statement, Form 16, 24Q annexures, 27A, 12BA, NPS, gratuity — but **no state PT slab table** (slabs hand-entered), **no LWF engine**, no leave module, cannot calculate leave encashment, attendance by manual voucher (EV-032 — product documentation read, not executed, 2026). Payroll *adoption*, as distinct from capability, is unknown (§20 V-02) | Attended, assisted submission (K-13); the state PT and LWF layer (EV-032); leave, employee/mobile surface, CA console, maintained statutory updates, a supported SLA | Central-artefact generation parity, offline operation, entrenched accountant muscle memory |
| **Kredily** | ₹0 forever, unlimited headcount; Payroll OS ₹1,249/mo up to 25, then ₹50/emp (r3/03) | PF, ESI, PT and TDS *calculation* in the free tier (Source: Kredily pricing page, read in rounds two and three, 2026 — r2/01, r3/03) | The outputs layer — bank payout files, PF/ESI challans, Form 12BB/124 and Form 16/130 are paywalled above free (EV-029) — and attended submission, which no vendor in the priced set claims to offer (EV-030); Kredily's feature-gate model has **no automatic conversion trigger** | Price at the very bottom; a firm that never files through software can stay free forever |
| **Zoho Payroll** | ₹0 to 10 emp; Standard ₹1,000/mo incl. 25 on annual billing (₹1,250 monthly), then ₹40 (₹50 monthly) per additional employee (r3/03) | Free tier already includes investment-declaration + proof workflow and bank salary payouts (through one named bank — r3/03); statutory form generation and TDS challan recording start at the paid tier — the outputs paywall of EV-029 (Source: Zoho Payroll India pricing, captured 2026; r2/01) | Attended submission, filing SLA, CA console, multi-state PT/LWF *maintenance*, deskless attendance — the surface Zoho treats as add-on | The ESS declaration workflow we once called a differentiator; against Zoho it is table stakes ([Killed] in Draft 1) |
| **Zoho People** | ₹0 to 5 users; ₹48/user/mo entry paid | Zia AI ships in the **cheapest paid tier at ₹48** (Source: Zoho People India pricing, captured 2026) | Payroll-and-filing depth (Zoho People is core-HR; payroll is a separate product the customer must also buy and wire) | AI as a line item — Zoho already gives it away at ₹48 |
| **Frappe HR** | ₹0 self-host; from ₹410/mo cloud | Genuinely strong gross-to-net salary structure. Its whole India payroll layer is 3 files / 549 lines overriding 3 functions (HRA exemption ×2, marginal relief); no Indian state name anywhere in the v16 tree; no ECR, ESI, PT slabs, LWF, 24Q/138, Form 16/130, 12BA or 27A. ERPNext v16 removed payroll; `india-compliance` is GST/vendor-TDS only (EV-031 — source repository read, v16, Sep 2026; not executed) | The Indian statutory layer — ECR, ESI, state PT, LWF, the TDS return — plus maintained updates under contract, attended submission and a support SLA. The real competing price is a Frappe partner's charge to build and then maintain that layer, not the ₹0 licence — unknown (r3/01 open question, §20) | Gross-to-net at ₹0 for a customer with IT capacity: **the bake-off will not be won on gross-to-net** (EV-031). **[Reversed]** earlier drafts credited Frappe v16 with PT across 15+ states and LWF across 14 and conceded multi-state PT/LWF; the source contains neither (K-01) |
| **CA / payroll bureau** | ₹3,000–15,000/mo **[Hypothesis]** (unvalidated; see §20 V-01) | Prepares the filings, carries the relationship, absorbs the judgement calls | Not a competitor to displace — a **channel and a price anchor** (§18.7). We arm the CA, we do not replace them | The trusted-advisor relationship; the CA's standing with the employer who signs off the return |

**[Verified]** The floor of *computation* is zero and defended: Kredily free-forever, Zoho ₹0 gates on a size proxy, Frappe ₹0 self-host, Tally ₹0 incremental (Source: respective vendor pages, captured 2026). Among priced suites the floor is not zero: list prices form **two anchors** at 50 employees — a value floor near ₹50 PEPM (Qandle, greytHR) and a mid-market clearing band of ₹80–200 PEPM (Zimyo, HROne, Keka) (EV-006, EV-027; §18.3). **[Hypothesis]** The bureau price band ₹3,000–15,000/mo is the single most important unknown in the whole model — it is the budget line we are actually competing for. Kill/validate: §20 V-01 mystery-shops 6–8 CAs and bureaus across two city tiers. If the real price to run 50-employee monthly payroll is under ₹2,000/mo, our ₹80–150 PEPM target (§18.3) loses its bureau justification, re-anchors toward the ~₹50 value floor, and the beachhead economics must be rebuilt.

The uncomfortable implication of the table: **on a computation-parity axis we lose to something free in almost every row** — the exception is the state PT and LWF layer against the two parity comparators, which neither Frappe nor TallyPrime ships (EV-031, EV-032). Against the SaaS rows it is claimed parity, not a gap: Zoho Payroll's free tier lists "Statewise PT, LWF" (r2/01) and greytHR's payroll page says "PT with all state-specific rules built-in" (r5/03, captured 5 Sep 2026) — page claims, not tested, where our edge is maintenance under contract, jurisdiction on the work location and attended submission (§21.3). The plan does not fight on computation. It fights on *attended submission, maintenance and guarantee* — which is why the pricing metric has to be the filing (§18.3) and the company has to be structured as a compliance-maintenance operation, not a feature-velocity startup (§05).

One correction we carry forward from §04 and must never re-introduce: the beachhead is **not** a "competitive vacuum." Zoho serves 25 at ₹1,000/mo, HivePayroll 25 at ₹1,499, RazorpayX 20 at ₹2,499, Kredily free — the band is *over-served by cheap product and under-served by product that carries the filing to portal acceptance* (Source: vendor pricing pages, r2/05, r1/08 — **[Verified]** as list prices; the "under-served" reading is **[Hypothesis]**). Several of these are blocks too — Zoho and HivePayroll include 25, RazorpayX's entry plan caps at 20 — so the buyer at 21 employees is already being pushed across a plan boundary. Among the priced suites it is also **structurally overcharged**: six of six bill a 50-employee minimum block (Keka's was 100), so a 20-person firm pays ₹122.50–349.95 effective PEPM for seats it does not have (EV-026, EV-027). The pricing plan is therefore a quality-of-delivery and no-seat-floor wedge (P6), not an availability wedge, and every claim below that implies "nobody serves this band" is wrong on its face.

---

### 18.2 Pricing shape principles

Six shape decisions are supported by verified evidence even though no *level* is. They are the invariants; the tier table in §18.4 is one instantiation of them.

#### P1 — Size gate, never feature gate

**[Verified]** All three Zoho India free tiers gate on a *size proxy* — 10 employees, 5 users, ₹25 lakh revenue — rather than crippled features or a time limit (Source: Zoho Payroll / People / Books pricing, captured 2026). That shape converts automatically as the customer grows: the customer is never asked to notice a missing feature, only to cross a headcount they were going to cross anyway. Kredily made the opposite choice — unlimited headcount, features withheld — and consequently **has no conversion trigger at all**; a free Kredily user can run forever.

Design consequence: our free tier (§18.4) is gated at **< 20 employees** — precisely the headcount below which EPF does not apply (§06). The gate is therefore *statutory*, not arbitrary: the customer converts at the exact moment their compliance surface discontinuously expands. This is the cleanest possible size gate because it coincides with a real change in the customer's problem.

A subtlety the gate must respect: several obligations bind *below* 20, some on a trailing test, so "under 20 = no compliance" is false and the Free tier must still be genuinely useful. Per §06.1 (Source: Code on Social Security 2020, notified Central Rules 8 May 2026, [Verified]): ESI binds from **10** persons (EV-057), gratuity and maternity benefit from **10** employees (§06.1); gratuity and maternity benefit latch on "any day of the preceding twelve months", so a firm that touched 10 once stays in scope after shrinking, while ESI's Code-era latch wording is unconfirmed (§06.13). TDS on salary (s.392, ex-s.192 — EV-050), minimum wages and the POSH Internal Committee (EV-056) bind **from employee one**; Shops & Establishments registration follows each state Act. The prescribed-format appointment letter binds once the establishment has **10 or more workers**, on a form prescribed by the appropriate Government — state-sphere (OSH Code s.6(1)(f), EV-057). **[Reversed]** earlier drafts placed it "from employee one" (K-18). The Free tier therefore computes ESI and TDS and issues wage slips and, from 10 workers, the state-configured appointment letter; it withholds only *attended submission and the SLA*. The headcount gate that matters commercially is 20 (EPF), but the product below 20 is not empty.

Acceptance criterion (gate integrity): the system must compute each threshold test on the latch logic its statute uses (§06.1), must surface a countdown/alert as a tenant approaches a threshold, and must never silently down-tier a firm that has crossed 20 even if current headcount dips below it. A firm that hits 20 and drops to 18 is treated as still EPF-obliged for the covered members — the legacy EPF Act latched once covered and the Code-era wording is unconfirmed (§06.13) — and must not be pushed back to Free.

#### P2 — The cliffs are the attack surface; design a continuous ramp

**[Verified]** Zoho Payroll jumps ₹0 → ₹1,000/month between employee 10 and 11 (annual billing; ₹1,250 on monthly — r3/03); Zoho People jumps ₹0 → ₹48/user between user 5 and 6 (Source: Zoho pricing pages, captured 2026 — r2/01). **[Hypothesis]** Those discontinuities are moments of *forced re-evaluation* — the bill appears from nothing on a single hire, and the customer shops. We attack there and we do not reproduce the pattern: a customer crossing our own tier boundary should see a **continuous, predictable ramp**, ideally previewable in the price card before they hire the marginal employee.

Worked example of the attack **[Hypothesis]**: a firm at 10 employees on free Zoho Payroll hires its 11th employee and is pushed from ₹0 to ₹1,000/mo on that single hire; if it keeps hiring to 20, EPF turns on as well (EV-057). Those two moments — the vendor's cliff at 11 and the statutory line at 20 — are the highest-intent acquisition moments in the market, and for a firm growing through the 10–19 band they can fall close together. How often they do, and how far apart, is unmeasured: our own funnel data decides it (§19), not an assumption here. GTM (§18.6) instruments for it: the "you just crossed 20 — here is what turns on" campaign is aimed exactly at Zoho's own cliff. Kill criterion: if §20 V-03 shows Zoho discounts the cliff away in practice (realised ₹0 well past 11), the attack loses its edge and we compete on filing SLA alone.

Acceptance criterion (no self-inflicted cliff): at *no* headcount between 20 and 200 may a single marginal hire increase the monthly bill by more than (list PEPM × 1), i.e. the ramp is strictly linear-or-tapering with headcount and never step-shaped. The price card's headcount slider must render the exact incremental cost of employee *n+1* before the customer commits to the hire.

#### P3 — Publish the price card

**[Verified]** Keka — the most expensive vendor in the priced set — has withdrawn its live card: its pricing page carries no live price and the rate card survives only as HTML comments, and the suppression is global across its India, US and UAE pages — a company-wide move to a sales-qualified motion, which is itself the opening for a published-price competitor (EV-021, EV-024). Darwinbox and PeopleStrong publish no price and sell on quote (r1/08, captured 4 Sep 2026; Darwinbox's pricing URL returned HTTP 404). greytHR, Qandle, Pocket HRMS, Zimyo and HROne do publish (EV-027), but every one sells a 50-employee block (EV-026). **[Reversed]** earlier drafts listed greytHR as quote-only; it publishes a full card (EV-027). Publishing a price is not the same as selling self-serve: among the vendors checked, only Zoho Payroll completes a purchase online and publishes payment methods, while greytHR, Keka and Kredily route pricing-page calls to action to a trial, a free plan or sales (r3/03, medium — CTA census carried from an earlier sweep). **[Hypothesis]** A 30-person company will not sit through a demo to learn a price, so **self-serve INR pricing on the marketing site, through to checkout with GSTIN capture and a compliant invoice (§18.13), is the only way to be evaluable by the beachhead's lower half.** Publishing is also a competitive weapon: it forces the quote-only field to be compared against a number, and it disproportionately helps the low-ACV segment that cannot command sales attention. The published card carries GST-inclusive and GST-exclusive columns, per-band annual and monthly, and a headcount slider that previews the ramp (P2).

**[Reversed]** Earlier drafts said the mid-market comparison could not be made because Keka, Zimyo, HROne, Qandle and Pocket HRMS were TLS-blocked; the block was one fetch tool's failure, not the sites', and the rate cards are now captured (EV-009, EV-021–EV-027). ZingHR and Ramco publish no price and are enterprise adjacency, outside the set (EV-033). Publishing our own card does not require their numbers. Any *comparative* claim on the card ("cheaper than X") must carry its capture date, state whether it rests on a price page or an executed product, be re-captured before use and clear the competitor-claim rule (§21). We publish our price; we never quote a competitor's price as a third party reported it. The card's own statements about the SLA, the remedy and what the tier gates are customer-facing legal claims: each has a named owner and clears counsel before publication (Part D-20, §23).

#### P4 — Taper above 200

**[Verified]** Frappe's per-site model and Zoho's base-plus-overage both beat flat per-employee at scale (Source: Frappe HR cloud pricing; Zoho Payroll overage structure, captured 2026). A flat PEPM that is fair at 50 is punitive at 800 and loses the expansion band (§05). Above 200 the model tapers — declining marginal PEPM, or a base-plus-metered-filings structure — so that the per-employee cost at 500 is materially below the cost at 50. This is designed into the tier boundary (§18.4) rather than negotiated per deal, to preserve P3.

#### P5 — Price the guarantee, not the software

This is the shape decision that ties to the filing thesis and is developed fully in §18.3. The billable object is **portal-accepted filings — the artefact plus attended, assisted submission under the employer's written authority to act — under a maintained-compliance SLA** (K-13, §22; the operator-attended route is counsel-gated, §18.3). No vendor in the six-vendor priced set claims to submit any filing; greytHR publishes only generation language, and MYND/Qandle's outsourced filing operation is unpriced and demo-sold (EV-030). Tally generates the central artefacts (EV-032), the freemium players paywall them (EV-029), and Frappe generates no Indian statutory return (EV-031). The statutory liability stays with the employer and deductor — it is non-delegable (K-13); what we sell is the service and a capped contractual remedy, never a transfer of that liability. Everything the free tiers give away (calculation, generation) is below the line; everything they cannot give away (submission, maintenance, guarantee) is above it.

#### P6 — No seat floor: bill actual headcount from employee one

**[Verified]** Six of six priced competitors bill a 50-employee minimum block (Keka's was 100); a 20-person company cannot buy 20 seats from any of them, and pays ₹122.50 (Qandle) to ₹349.95 (Keka) effective PEPM at 20 employees (EV-026, EV-027). No competitor in the priced set bills actual headcount from employee one (K-25). Design consequence: the File tier bills the tenant's actual headcount — no minimum block, no included-seat bundle — so billable seats equal employees from the first paid employee, including a sub-20 tenant that elects File for attended ESI or TDS submission. It is the single most defensible pricing-*structure* differentiator in the evidence, and it compounds with P2's continuous ramp; the taper above 200 (P4) is the only place a base component appears. Acceptance criterion: for any headcount *n* on the File tier, the platform fee equals *n* × the tier's PEPM plus any multi-registration line (§18.3) — never a block price — and the price card's slider renders that exact fee for every *n*, including *n* below 50.

Two limits on the wedge, stated so collateral does not overreach. First, the claim is made against the six priced suites, dated, never against "the market": the freemium players' paid tiers also sell blocks, only smaller ones — Zoho Payroll Standard includes 25 employees and Kredily Payroll OS covers up to 25 (r3/03) — so against them the seat-floor gap exists only between 20 and 25 employees, and per-user structures exist elsewhere (§21). Second, the wedge can be closed by a card change: Keka's live small-business page says "starts at ₹90 per employee/month" while its withdrawn card was block-plus-overage, and whether the per-employee rate coexists with or replaces the block is unresolved (r5/03 open question). **[Hypothesis]** If any of the six publishes a per-employee card with no block, P6 stops being a differentiator against that vendor and the File tier competes on attended submission and the SLA alone; the trigger and response are H-P14 (§18.16), §21's competitive-response scenario CRS-10 and risk R-39 (§20.8).

#### P7 — The rating engine expresses every price shape in the market, not only the one we sell

**[Verified]** Four pricing architectures are live in and around the beachhead, all from vendor-primary captures:

| Shape | Who uses it | Verified instances |
| --- | --- | --- |
| **Base fee + included block + per-employee overage** | greytHR, Qandle, HROne, Pocket HRMS, Keka's withdrawn card | greytHR Essential ₹2,495/mo including 50 then ₹45/employee, Growth ₹4,495 including 50 then ₹85, Premium custom and marketed as "~30% savings Vs Growth plan" (r5/03, captured 5 Sep 2026). HROne Basic ₹4,950 for 50 then ₹99, Professional ₹6,500 for 50 then ₹130 (r5/03). Pocket HRMS Standard ₹2,995/mo billed annually for 50 then ₹60, Professional ₹4,495 then ₹90, Premium quote-based with a 100+ minimum subscription (r5/03). Qandle monthly ₹2,950 + ₹59 / ₹4,950 + ₹99 / ₹6,200 + ₹124 / ₹8,000 + ₹160 and annual ₹2,450 + ₹49 / ₹3,950 + ₹79 / ₹4,950 + ₹99 / ₹6,450 + ₹129, every tier on an "upto 50 employees" block (r5/03). Keka's archived card ₹9,999 up to 100 + ₹90 (EV-022) |
| **Flat fee to a headcount ceiling, then per employee** | Kredily, Zoho Payroll | Kredily Payroll OS ₹1,249/mo to 25 then ₹50, Professional ₹1,749 to 25 then ₹70 (r3/03). Zoho Payroll STANDARD ₹1,000 annual / ₹1,250 monthly including 25 then ₹40 / ₹50, PROFESSIONAL ₹3,000 / ₹3,750 including 50 then ₹60 / ₹75, PREMIUM ₹4,000 / ₹5,000 including 50 then ₹80 / ₹100 — a uniform 20% annual discount on both base and overage across all three tiers (r3/03) |
| **Per user with a minimum billing block** | Zimyo | Basic ₹80, Standard ₹160, Enterprise ₹240 per user per month, each carrying "Minimum billing for 50 Users" (r5/03) |
| **Per employee with no block** | **No vendor in the priced set** | The wedge (P6; EV-026) |

We sell the fourth row and only the fourth row. The engine must nonetheless be able to *express* the other three, because four real situations need them: a competitive response modelled against a prospect's incumbent quote (§18.24); an agency or reseller rate for a partner (§18.7); a grandfathered legacy price after a card change (§18.10); and the Scale band's base-plus-metered-filings structure (P4).

Acceptance criterion (shape completeness). A plan is stored as an ordered list of rate components drawn from one closed set — `base_fee`, `included_quantity`, `overage_rate`, `per_unit_rate`, `minimum_billable_quantity`, `metered_rate`, `registration_allowance`, `registration_line_rate` — and every card in the table above is expressible in that set without new code. On our own File plan `base_fee`, `included_quantity` and `minimum_billable_quantity` are all zero, so **the no-seat-floor promise is auditable by reading three fields rather than by reading the rating code.** A File-tier plan that sets `minimum_billable_quantity` above zero fails a build lint that enforces §18.17's "no seat floor, ever".

#### P8 — List price, first-term price and renewal price are three separate values

**[Verified]** Keka's terms of service clause 15 ("Term") provides that on renewal "the recurring fees shall be subject to an increase", and that a downgrade in volume, plan, term or billing cycle may be re-priced at renewal "regardless of prior Term pricing"; its August 2024 no-lock-in FAQ has been deleted, and clause 3 makes fees non-refundable whether or not the platform is used (EV-025, K-17; r5/03, captured 5 Sep 2026). **[Reversed]** Earlier drafts read Keka's renewals as running *below* list; its own contract says the opposite, and the finding that renewals run below list failed independent verification twice (K-17, r3/03).

We therefore do **not** build a first-year-loading strategy — the evidence that discounted first years are a market norm does not exist (r3/03). We do carry three prices rather than one, because a single price field forecloses the option and invites renewal disputes. Acceptance criteria:

1. A subscription stores `list_price`, `first_term_price` and `renewal_price` per rate component, each with its own effective date; the scheduled step at renewal is a stored, visible object, not a manual re-quote.
2. The tenant's billing screen shows the forward renewal rate and its effective date for at least `renewal_notice_days` before renewal. No renewal invoice may be issued at a rate that was not visible on that screen for the whole notice period.
3. A list-price change reaches the installed base only at each account's own term boundary (§18.10 grandfathering), and the scheduled step is visible to the tenant and to support from the day it is scheduled.
4. Negative case: an operator editing `renewal_price` inside the notice window is blocked, not warned. The notice period restarts only on an explicit, logged re-notification.
5. Negative case: a downgrade — fewer employees, a dropped add-on, monthly instead of annual — must not silently re-price the retained components. Any re-pricing on downgrade is a scheduled step under criterion 2, or it does not happen. This is the exact behaviour Keka's clause 15 reserves to itself and the exact behaviour our card promises not to exercise silently.

#### P9 — A price is an effective-dated rule object, and every invoice is replayable

Pricing is held to the discipline §14 applies to statutory rule objects and §15 applies to the payroll engine. An invoice is a pure function of **(billable-headcount census, price book version, evaluation context)**, where the evaluation context is enumerated: billing period, place of supply, tax rule version, contract terms version. Acceptance criteria:

1. Every invoice stores the `price_book_version_id` and the `census_hash` it was rated from.
2. Re-rating a closed period reproduces the stored invoice to the paisa, or raises a reconciliation defect. It never silently re-prices.
3. Re-rating a closed period against *today's* price book is impossible through any interface: the version resolves from the contract and the period, never from the clock.
4. A price book version is published through the same two-person review the compliance data pipeline uses for rule objects (§22), with the same staged publish and rollback. A wrong price reaches every tenant on the card at once, which is the same blast radius as a wrong slab.
5. Negative case: a price book version may never be edited after publication. A correction is a new version with its own effective date and a stated supersession, so that an invoice issued under the wrong version can be identified by version rather than by inspection.

#### P10 — Entitlement is derived from the census and the statutory triggers, never hand-set

Tier entitlement follows the billable-headcount census (§18.19) and the statutory trigger set (§06.1). It is not a flag an operator toggles. Exactly three provenances may set an entitlement:

| Provenance | When it applies | Control |
| --- | --- | --- |
| **Derived** | A census crosses a gate, or a statutory trigger fires on an establishment | Automatic, logged against the census row or establishment change that caused it |
| **Time-boxed grant** | Migration in flight, a support incident, a partner sandbox | Named approver, mandatory expiry, no extension without a second approval |
| **Contracted override** | A negotiated term inside the §18.11 discount bounds | Named approver, written into the subscription, visible on the invoice |

Acceptance criterion (derivation trace). For any tenant and any date, the entitlement service answers "why does this tenant hold this entitlement" with the provenance, the causing record, and — where an override applies — the approver and the expiry. No code path writes an entitlement without one of the three. A tenant that has crossed 20 is never auto-returned to Free (P1's gate-integrity criterion): a down-tier is a contracted override with a named approver, never a consequence of a census dip.
---

### 18.3 Filing-as-the-unit pricing

The positioning claim (§04) is that the buyer's artefact is the filing, not the payslip — **the ICAI recommended fee schedule we read has no payroll-processing line item at all; it prices TDS return filing, PT registration, PT returns and TDS compliance review** (Source: ICAI recommended fee schedule, full-text searched — EV-017, **[Verified] as to the schedule read only**). That schedule is pre-GST and superseded: a February 2020 revision exists and its text has not been retrieved (r2/05), so the negative is unverified for the current revision until the §02 re-check fires. The buyer already thinks in filings and already pays their CA per-filing-ish — a reading this section relies on for *shape*, never for a number. Pricing should meet them there. (Note: the specific ₹37,500/yr ICAI figure is **banned** — pre-GST, carries Wealth Tax heads, 9+ years stale, §20.4 banned list. We use the *structure* of the schedule as evidence, never the number.)

But **pure per-filing pricing is rejected** for three concrete reasons:

1. **Adverse selection on cadence.** EPF ECR and ESI are monthly, PT is monthly-to-annual by state, TDS is quarterly, Form 16/130 annual. A pure per-filing meter would charge a Karnataka 50-person firm (monthly PT deduction with a February top-up — EV-014) far more than an identical firm in a state with a lighter PT cadence or none, for no difference in the value the buyer perceives. (Which states levy no PT is itself unverified — no negative has been verified for any jurisdiction, r2/10 — so the product never treats non-levy as fact, §06.4.) That is unsellable. Our *cost* does differ — supervised filing scales per registration × state × filing type (EV-088) — and that difference is recovered through the registration allowance below, not by metering filings. **[Reversed]** earlier drafts said the difference cost us nothing.
2. **Unpredictability the buyer hates.** The beachhead buyer is buying *away* from the CA precisely to stop getting variable monthly invoices. A meter re-introduces the variance they are fleeing (§18.13).
3. **It caps our own upside at the low end.** A 22-employee firm has few filings; per-filing would price it below sustainable, undoing the point of converting it off free.

The resolution is a **blended model: a per-employee-per-month platform fee that carries an explicit, contractual filing-and-compliance SLA, with the filing as the *value metric and the guarantee*, not the *meter*.** In plain terms: you pay per head, but what you are buying — and what the price card foregrounds — is "every statutory filing your headcount obliges, prepared as a portal-accepted artefact, carried through attended, assisted submission under your written authority (§22), acknowledged, and maintained against every rule change — or we remediate and pay the capped remedy the SLA defines." The statutory liability for the filing stays with the employer and deductor (K-13); the remedy is a contract term, and its allocation and insurability are under counsel review (Part D-17, §23).

**The attended-submission promise is itself counsel-gated.** Four questions are open (Part D-17, §23): whether our operators may act on government portals under the employer's credentials; whether each portal's terms of use permit third-party credential use; whether filing a TDS statement for a deductor engages the e-Return Intermediary route; and how the authorised signatory's personal DSC is handled. Until counsel clears them (§20 V-25), operator-attended submission (§22 Mode C) is fenced (§05.7, §22.2.3) and is described anywhere customer-facing as a product capability whose statutory basis is under counsel review. The launch posture is employer-attended (Mode A) and co-attended (Mode B) submission — the employer's own user signs in, we supply the artefact, the form-control values, the checklist and live guidance, and we capture the acknowledgement (§22 FR-OPS-001). The price architecture must therefore survive a "no": **[Hypothesis]** the File tier at launch sells Modes A and B with the SLA covering artefact correctness, statutory currency, format-break coverage and the causation record, and adds Mode C per portal as each fence clears; if counsel's answer is "no" for a portal, the tier stays at Mode A/B for it and the price is re-tested against that scope in §20 (H-P15, §18.16).

#### The registration allowance — where the cost unit and the price unit diverge

**[Verified structure / unsized lines]** Revenue scales per employee; the dominant cost line — supervised filing — scales per registration × state × filing type (EV-088; §13). A 60-person, three-state, two-entity tenant can therefore pay less than a 150-person single-registration tenant and cost several times more to serve (r5 CFO review). A per-head fee alone cannot carry that. **[Hypothesis]** The File tier's per-head fee therefore includes a **registration allowance** — a stated number of statutory filing registrations (PF establishment code, ESI code, PT registration per state — the employer's PTRC and the entity's own PTEC are separate registrations, §06.4 — and TAN) held as the parameter `included_registrations_per_tenant` — and each registration above it is billed on a **multi-registration line**, `multi_registration_line_price`, per registration per month. Both are unsized and routed to §20; they are sized from §22.7's filing-instance counts and minutes per filing per registration (measured under §20 V-26), and from `max_supervised_minutes_per_filing_cycle`, which §13.19 derives and versions against these two parameters. The per-head card stays the headline (P3); the line appears only for multi-registration tenants, and the slider shows it before purchase.

##### Sizing the registration allowance — the worksheet, not the number

The allowance level and the line price are unsized and routed to §20 (H-P13). What can be specified now is the arithmetic and the inputs it needs, so that §20 V-26 and §22.7 know exactly what to measure and so that no one invents a level in the meantime.

The cost a single registration imposes on us in a year is:

```
registration_cost_per_year
  = Σ over filing types owed by that registration
      ( instances_per_year
        × supervised_minutes_per_instance
        × loaded_operator_cost_per_minute )
  + rejection_rework_minutes_per_year × loaded_operator_cost_per_minute
```

Every input is a named parameter with an owner, and none ships a default:

| Parameter | What it is | Owner | What must set it |
| --- | --- | --- | --- |
| `instances_per_year` (per registration × filing type) | Dated statutory events the registration generates | Compliance operations (§22) | Central cadences are already fixed (EV-035–EV-052); state cadences come from the captured dataset (EV-015, §20 V-09) |
| `supervised_minutes_per_instance` | Attended-session minutes, portal login to acknowledgement | Compliance operations (§22) | §20 V-26 time-and-motion capture, ceilinged by `max_supervised_minutes_per_filing_cycle` (§13) |
| `loaded_operator_cost_per_minute` | Fully loaded operator cost per minute | Finance | Our own hiring, never a market figure |
| `rejection_rework_minutes_per_year` | Rework on REJECTED, REVISED and SUPPLEMENTARY instances | Compliance operations (§22) | Measured off the filing state machine (§08 FR-PAY-711); the metric is §19's |
| `included_registrations_per_tenant` | Registrations inside the per-head fee | Pricing owner | §20, once the four inputs above report |
| `multi_registration_line_price` | Price per registration above the allowance, per month | Pricing owner | §20, same gate |

**The event count is knowable today, and it is what makes the allowance a countable unit.** The filing-surface table below counts 42–65 dated statutory events a year for a single-state 50-person firm. Extending the same arithmetic to the second worked example — 120 employees across Karnataka, Maharashtra and Tamil Nadu — the 41 fixed central events (12 ECR + 12 ESI + 12 TDS deposits + 4 Form 138 returns + 1 annual certificate) do not multiply, because they attach to the PF code, the ESI code and the TAN. The state layer is what multiplies. Karnataka's PT deduction is monthly (12 events); Maharashtra's return periodicity is assigned per registration each year by the department, so it is anywhere between 1 and 12 (EV-014); Tamil Nadu's local-body cadence is not captured (§06.4), so for this count it is bounded by the same 1–12. That is **14 to 36 PT events** across the three states, before LWF, whose periodicity runs monthly, half-yearly or annual by state and is captured only for Karnataka — a calendar-year cycle due 15 January, so one event (r2/10). Maharashtra's and Tamil Nadu's LWF cadences are not captured and are bounded by the same monthly-to-annual range, so LWF adds **1 to 25** more. The tenant's dated statutory event count is therefore **56 to 102 a year against the single-state firm's 42 to 65**, on 2.4× the headcount. Revenue scales 2.4× with headcount and stops there; the state-layer event count scales with the number of state registrations, which is a second axis headcount does not touch at all. That second axis is the whole reason the allowance exists (EV-088), and it is why a per-head fee alone mis-prices the multi-state tenant in our favour at 50 employees and against us at 120.

Design consequences, each of which is a build decision and not a marketing choice:

1. **The allowance is counted in registrations, not filings.** A buyer can state how many PF codes, ESI codes, PT registrations and TANs they hold. They cannot state how many filing events those imply without a calendar, and asking them to would re-import the adverse selection that got the meter rejected (§18.3).
2. **PTRC and PTEC are separate registrations** (§06.4) — the employer's registration to deduct, and the entity's own registration to pay. A three-state tenant can hold six state registrations before any PF or ESI multiplicity. The card must state which of the two it counts, or every multi-state quote is wrong by up to a factor of two.
3. **The allowance is per tenant, not per legal entity.** A group with two legal entities holding one PF code each consumes two registrations from one allowance. An allowance per entity would reward splitting the group on paper and is rejected.
4. **A registration we cannot serve is refused, not fenced after the sale.** A PT registration in a state whose slab dataset is not published in the compliance pipeline (§22) cannot be brought under the File-tier SLA at all, because the SLA's first commitment is statutory currency. Checkout blocks it with a named reason and a waitlist for that state.

Edge cases that must be decided before the card is published, each routed to §20 rather than guessed here:

| Edge case | Why it is not obvious | Routed as |
| --- | --- | --- |
| A registration dormant for the whole year | An establishment with no active members files no ECR (EV-042), but the registration still consumes watcher and curation cost and still carries the chronology obligation (EV-038) | §20, alongside `included_registrations_per_tenant` |
| A registration surrendered mid-term | Our cost stops; the tenant's obligation for prior periods does not | §20; the default posture is no mid-term refund of the line, credited at the next term |
| A registration added mid-term | The first obligation may fall in a later month than the registration date | §20; the default posture is pro rata from the month it first generates a dated obligation, on the §18.19 proration basis |
| A registration shared across two tenants (a bureau operating one client's code) | Would let the CA channel arbitrage the allowance | §20 with V-05; the console's billing modes (§18.7) decide it |
| A second PF code taken for a new establishment mid-year | Consumes an allowance slot and adds an unbroken filing ledger of its own (Part E-10) | §20; the same pro rata default |

Acceptance criteria (allowance integrity):

1. The quote-time registration count is **derived** from the tenant's establishment and registration records (§07, §14), never typed by a salesperson; the price card's slider takes a registration count and returns the exact fee, including the line.
2. Every invoice states the registrations counted, by type and identifier, so the tenant can reconcile the line without a support ticket.
3. Adding or removing a registration never retroactively re-rates a closed period (P9).
4. Negative case: a tenant cannot reduce the count by de-linking a registration that generated a filing instance in the period. The count is derived from the filing ledger, on the same principle as the headcount census (§18.19).
#### The filing surface a 50-person firm actually owes, itemised

To price "every filing your headcount obliges," we must enumerate it. This is the recurring obligation set for a single-state 50-employee firm (EPF + ESI + PT-state), with cadence and due date — the concrete content of the SLA (Source: EPF Scheme / EPFS 2026, ESI Act & Central Rules, state PT Acts, Income-tax Act 2025 and Income-tax Rules 2026; [Verified] on instruments, [Hypothesis] on any date not re-checked for corrigendum per the §02 standing rule):

| Filing | Instrument | Cadence | Statutory due date | Notes |
| --- | --- | --- | --- | --- |
| **EPF ECR** | Electronic Challan-cum-Return | Monthly | 15th of following month | 12% employee + 12% employer (8.33% to EPS + 3.67% to EPF), 0.50% EDLI; admin charges 0.50% (rate not re-verified under the Code, **[Hypothesis]**, §06.2); EPS capped at ₹15,000 wage → ₹1,250. The challan's account-head numbering is not in our evidence and is not asserted here (§06.2). 11-field `#~#` file (EV-035); return approved before payment, an approved return can never be cancelled (EV-036); Regular / Supplementary / Revised (EV-037) |
| **ESI contribution** | Monthly challan | Monthly | 15th of following month | 0.75% employee + 3.25% employer on gross ≤ ₹21,000 (₹25,000 for persons with disability); contribution periods Apr–Sep / Oct–Mar |
| **PT return + payment** | State PT return | Monthly to annual (state-dependent) | State-specific | Slabs verified at state source for Maharashtra and Odisha, and in effect for Karnataka (EV-014); Maharashtra's return periodicity is assigned per registration each year by the department — ingested, never derived (§06.4); Odisha files annually; Karnataka's periodicity and every other state's slabs and cadence are not yet captured (EV-015, §20 V-09) |
| **LWF** | State LWF return | Per state | State-specific | The one verified periodicity is Karnataka's calendar-year cycle, due 15 January (r2/10); no LWF rate or split is verified from a government source in any state (EV-015, §06.8) |
| **TDS return** | Form 138 (ex-24Q) | Quarterly | 31 Jul / 31 Oct / 31 Jan / 31 May (Q4, of the year following the Tax Year) — Rule 219 (EV-049) | Breaking format change (EV-051) on a dual FVU stack (EV-052); Q4 regular format not yet released — Q4 generator fenced (EV-046) |
| **TDS deposit** | ITNS-281 / e-pay | Monthly | Prescribed by Rule 218, Income-tax Rules 2026 (r5/02) — date to be read from the notified text (§20 V-20); the "7th of the following month" carried in earlier drafts has not been checked against Rule 218 **[Hypothesis]** | Late-deposit interest was s.201(1A) under the 1961 Act. r5/04 read the 2025 Act's s.398 and reports s.398(3)(a) as setting interest at 1% a month from deductible to deducted and 1.5% a month from deducted to paid; §06.5 still holds the rate as a desk-read item, so the SLA's causation and remedy logic uses its parameter `tds.interest.late_deposit`, never a literal (§20 V-20) |
| **Form 130 (ex-Form 16)** | Annual TDS certificate | Annual | 15 June of the year following the Tax Year (Rule 215; r5/02) | Valid only if TRACES-generated — our role is data preparation and distribution (EV-048); Part B generation fenced on the unreleased Q4 format (EV-046) |
| **Statutory registers** | Six employer registers + Form V wage slip, one canonical set (EV-053) | Continuous | Electronic; retained five years (Wages r.51(4)) or five calendar years (OSH r.72(1)(vii), SS r.53(1)(e)) from last entry; state periods unknown (EV-054) | Wages Forms I, IV, IX; OSH Forms XIII, XIV, XV, XIX, XX + XVI; SS Form XXII; form numbers configurable per state (EV-053) |

**[Hypothesis]** A single-state 50-person firm therefore owes roughly **42–65 dated statutory events a year**, plus the continuous registers: 12 ECR + 12 ESI + 12 TDS deposits + 4 TDS returns + 1 annual certificate = 41 fixed, plus 1–12 PT events depending on the state's cadence, plus 0–12 LWF events because LWF periodicity runs monthly, half-yearly or annual by state (r1/06, medium) and Karnataka's is annual (r2/10). The range is arithmetic on those cadences; where it lands for a given tenant moves with each state's captured periodicity (EV-015, §20 V-09). A PT return and its payment are counted once here; a state that separates them adds to the upper end. A two-state firm roughly doubles the state-tax portion. This count is the concrete thing the SLA absorbs and the concrete thing per-filing pricing would meter — and exactly why we price the *guarantee* per head rather than the *count*, with a registration allowance because the count scales our cost (EV-088).

#### The SLA is the product, and it is the thing free alternatives cannot copy

**[Hypothesis]** The guaranteed-compliance SLA is the core monetisable asset. Its terms (illustrative, to be validated in §20):

| SLA element | Commitment | Why free alternatives cannot match it |
| --- | --- | --- |
| **Attended submission** | Every obliged return (ECR, ESI, PT, Form 138 Q1–Q3) prepared in the period's notified format and carried to portal acceptance by the statutory due date — through attended, assisted submission (K-13, §22) — employer-attended or co-attended at launch, operator-attended under the employer's written authority per portal once counsel clears Part D-17 (§18.3). Form 130 data prepared for TRACES generation (EV-048); Form 138 Q4 and Form 130 Part B fenced (EV-046) | No vendor in the six-vendor priced set claims to submit any filing (EV-030); Tally generates artefacts (EV-032); Frappe generates no Indian statutory return (EV-031). Every statutory surface is an attended portal, so this is a service, not an API (K-13) |
| **Statutory currency** | Every rate/slab/format change (Budget, wage-ceiling, state PT/LWF, Code rules) reflected before its effective date | Open-source has no contractual maintenance obligation; Tally ships updates but not as a per-tenant SLA |
| **Contractual remedy (the penalty-exposure backstop)** | If a filing is late or rejected *due to our system or a submission we contracted to make*, we remediate and pay a contractual remedy up to a tiered cap. The statutory liability itself stays with the employer and deductor — non-delegable (K-13) | We are not aware, as of September 2026, of a free tier that carries a remedy; a CA answers to the client professionally, but the employer's statutory liability is not delegable to the CA either |
| **Format-break coverage** | Breaking changes (e.g. Form 138 replacing 24Q, EV-051; Q4 format not yet released, EV-046) absorbed by us, not the customer | This is the maintenance burden §05 says is the whole operating model — it *is* a cost of goods (compliance curation, EV-088), sold back as the value |
| **Retro-recompute correctness** | Arrears/retro runs recompute against the *rule version in force for the period corrected*, with audit trail — not today's version | §06's versioned, effective-dated wage engine is the only way to honour this; a spreadsheet or single-version tool cannot |

**[Verified]** The format-break risk is real and current: Form 138 replaces 24Q with a remapped record layout (challan sub-headings 301–312 → A–K, 303 deleted; Annexure I 314–327 → C–N, with 313, 321, 322 and 325 removed — r5/02), Q1–Q3 v1.2 shipped 22 July 2026 (r2/10), and the **Q4 regular format is not released** — re-checked September 2026 — which also blocks the annual salary certificate (Source: TDS/CPC file-format notifications, 2026; EV-011, EV-046, EV-051). A customer on Tally or a spreadsheet owns that break themselves; on our SLA it is our problem. That is the concrete, dated instance of what the SLA sells.

##### Bounding the penalty-exposure backstop (so it is insurable, not open-ended)

The backstop is the most commercially dangerous SLA clause: an uncapped remedy would make the product uninsurable and the unit economics unmodellable. It is a **contractual** remedy — the statutory liability for every filing stays with the employer and deductor and cannot be delegated to us (K-13) — and it must be bounded against the actual penalty regimes (Source: EPF interest u/s 7Q is mandatory and auto-calculated, and damages u/s 14B may be deposited later at the employer's option, EV-039 **[Verified]**; the EPF and ESI damages scales are parameters `epf.damages_scale` and `esi.damages_scale` with no shipped default, §06.2–§06.3; the TDS-statement late fee — legacy s.234E, a ₹200/day figure carried from a secondary source — and the legacy s.271H penalty are **[Hypothesis]**, held as `tds.late_fee_per_day`, `tds.late_fee_cap` and `tds.penalty.statement_default`, with 2025-Act equivalents unmapped, §06.5, §20):

- **Scope**: covers penalty/interest that arises **solely from a defect in our system or a missed submission we contracted to make** — not from customer data errors, customer-caused delays, or funds the customer failed to remit. The remedy is set on the basis of a portal-accepted artefact plus best-efforts assisted submission under written authority (§22); liability allocation and insurability are open counsel questions (Part D-17, §23).
- **Cap**: tiered, e.g. capped at *N months of that tenant's platform fee* per incident and per annum (parameter `sla_remedy_cap_months`; level set in §20). This makes worst-case exposure a known multiple of ARPU, not a function of the customer's payroll size.
- **Carve-outs**: EPF and ESI damages (scales `epf.damages_scale`, `esi.damages_scale`), 7Q interest and the TDS-statement late fee (`tds.late_fee_per_day`, `tds.late_fee_cap`) are the concrete exposures; the SLA covers them within cap only where causation is ours. No damages percentage or fee cap is quoted in any contract until §06's parameters are re-captured from the notified text (§20).
- **Acceptance criterion**: every filing carries a machine-readable causation record (who supplied the data, when we generated, who submitted under which written authority, the acknowledgement — return file ID and TRRN for the ECR, EV-036; Return Receipt Number for Form 138, EV-051) so that a penalty claim can be adjudicated as "ours" vs "theirs" without dispute. Without this record the backstop is unpriceable.

Kill/validate: if buyer research shows the remedy must be *uncapped* to be credible (buyers do not value a capped guarantee), the SLA-premium thesis (H-P3, H-P11) weakens and we re-price on submission + maintenance alone. No current §20 item tests willingness to pay for a capped remedy — route to §20 as an addition to the V-07 instrument, alongside V-16's baseline miss-rate.

#### Why the 50% wage add-back makes per-head pricing *more* defensible, not less

**[Verified]** The identical text in Code on Wages s.2(y) and Code on Social Security s.2(88) deems the excess as wages when excluded components exceed one-half of remuneration, re-basing PF, gratuity and more — and it creates **two concurrent wage bases on one payslip** (§06.10; EV-010). This is the hardest single calculation in the build. Its pricing consequence is direct: the value of "we compute it correctly, per employee, versioned and retro-recomputable" scales with *how hard the computation is*, and the add-back is what makes it hard. A per-head fee is the honest metric for a per-head computation whose difficulty (dual wage base, effective-dating, the "or such other per cent as may be notified" variable) is invisible on the price card but drives the engine's build and curation cost (the dominant *running* cost is supervised filing, EV-088). Per-filing pricing would hide this value; per-head pricing surfaces it as "correct for every one of your people, every period, forever."

#### The two anchors, and where our target sits between them

**[Verified]** Captured list prices at 50 employees, entry tier, form **two anchors**, not a ceiling (EV-006, EV-027): a **value floor near ₹50 PEPM** — Qandle ₹49.00 annual / ₹59.00 monthly, greytHR ₹49.90 — and a **mid-market clearing band of ₹80–200 PEPM** — Zimyo ₹80.00, HROne ₹99.00, Keka ₹139.98 at its live ₹6,999 floor or ₹199.98 on the archived card (Pocket HRMS ₹59.90 annual sits just above the floor). The two realised points — **₹52** (greytHR, SMB) and **₹126** (PeopleStrong, enterprise), from filed revenue over claimed platform scale and biased *downward* because platform users exceed billed seats (EV-006; [Verified] inputs / [Hypothesis] derivation) — sit on the floor and inside the band respectively. **[Hypothesis]** Our File-tier target is **₹80–150 PEPM**: inside the clearing band, above the value floor because portal-accepted artefacts plus attended submission are what the floor does not sell. It is a target inside a band, not a price ceiling (K-09).

**[Reversed]** Earlier drafts derived the anchor from the two realised points alone and banned Keka's price as unobtainable. Keka's figures are now obtained from its own pages (EV-021–EV-023, K-10); no Keka capture in our evidence contains the "₹99" figure that circulated earlier, so that figure stays out of every model and deck.

Kill/validate: §20 V-03 (realised ARPU vs list). If realised ARPU runs 30–40% below list, the target re-bases toward the value floor and the four-line COGS stack (§13, EV-088) is re-run against it. **No PEPM number ships to a contract until V-01 (bureau price) and V-03 (realised ARPU) both report.**

#### Worked pricing example (all figures [Hypothesis], pending §20)

A 50-employee Karnataka firm (PT-liable, EPF + ESI obliged), on the beachhead tier at an illustrative ₹110 PEPM:

- Platform fee: 50 × ₹110 = **₹5,500/mo** ex-GST → ₹6,490 incl. 18% GST.
- Bundled, inside one registration allowance (one PF code, one ESI code, one PT state, one TAN — §18.3): monthly ECR + ESI + PT filings carried to portal acceptance through attended submission (§22), quarterly Form 138 Q1–Q3 (Q4 fenced, EV-046), Form 130 data preparation for TRACES issue (EV-048), the six registers + wage slip (EV-053), the assistant, ESS/mobile, one CA-console seat.
- Compare to the anchor it displaces: a bureau at the *midpoint* of the unvalidated ₹3,000–15,000 band ≈ ₹9,000/mo **[Hypothesis]**, with variable per-filing extras. Our ₹5,500 is below the bureau midpoint **and** fixed. Compare to Zoho Payroll: 50 emp ≈ ₹2,000/mo list (base ₹1,000 incl. 25 + 25 × overage) — **we are 2.5–3× Zoho's list.** Against the priced suites, ₹110 sits inside the ₹80–200 clearing band: above greytHR Essential (₹2,495/mo at 50) and below Keka's live floor (₹6,999/mo) (EV-027). The gap over Zoho is the SLA-and-submission premium, and its defensibility is exactly what §20 must test (V-07 instrument, V-16).

#### Second worked example — multi-state, where our value is largest [Hypothesis]

A 120-employee firm with establishments in Karnataka, Maharashtra and Tamil Nadu — three different PT regimes (Karnataka: monthly-salary base with a February top-up; Maharashtra: monthly-salary base with gender-differentiated thresholds, a February top-up and a department-assigned return periodicity — both EV-014; Tamil Nadu: a local-body levy whose slabs are not captured, §06.4), up to three LWF regimes (Karnataka's calendar-year cycle due 15 January is the one verified periodicity; the others are not captured — EV-015, §06.8), and consolidated central EPF/ESI/TDS:

- Platform fee at ₹110 PEPM: 120 × ₹110 = **₹13,200/mo** ex-GST → ₹15,576 incl. GST — plus the multi-registration line for every registration above the allowance: at least two additional PT registrations here (three states' PTRCs against one included, before counting each state's PTEC — §06.4), and more if the establishments carry separate PF or ESI codes (`multi_registration_line_price`, unsized — §18.3). This tenant's supervised-filing cost is a multiple of a single-state tenant's at the same headcount (EV-088), which is what the line recovers.
- The bureau alternative for a *three-state* firm is materially above the single-state midpoint because the CA is coordinating three state portals and three cadences — the multi-state case is where a single bureau relationship strains and where §18.1's "multi-state PT/LWF maintenance" axis is decisive.
- **[Reversed]** Earlier drafts said Frappe also covers this case on paper (PT across 15+ states, LWF across 14) at ₹0 self-host, so the pitch could only be maintenance. Frappe v16 contains no Indian state name and no PT slab or LWF logic, and TallyPrime has no state PT slab table and no LWF engine (EV-031, EV-032): multi-state PT/LWF is greenfield in both parity comparators, Frappe and Tally. Against a prospect coming from Frappe or Tally the pitch is coverage *and* maintenance under SLA plus attended submission (§18.11); against greytHR or Zoho, whose pages claim state PT, it is maintenance, work-location scoping and attended submission — never presence (§21.3). The competitor-claim rule still governs what collateral says (§21): describe what our product does and cite dated evidence; never say a competitor's published material is wrong.

The examples make the strategic bet explicit: **we are not the cheapest software; we are cheaper than the bureau and dearer than the self-serve floor, and the premium buys the guarantee.** If buyers will not pay a premium over Zoho for submission + SLA (§20 V-07 instrument, V-16), the beachhead thesis narrows to displacing only the bureau, not the software field.

#### The state PT/LWF surface — the concrete basis of the multi-state value

The multi-state pricing premium (second worked example above) rests on a real, dispersed statutory surface. Professional Tax is a *state* levy under a constitutional cap of ₹2,500 a year per person (r1/06, medium — the constitutional provision itself is not cited in our evidence and is not named here), run under roughly twenty separate State Acts by separate departments, and in Tamil Nadu and Kerala by local bodies rather than a state tax department (r2/10); each sets its own slab base, slabs, gender variants, periodicity and dates. LWF sits outside the four Labour Codes entirely and is less verified still. §06.4 and §06.8 are the canonical statement; the table below keeps only what pricing needs — which parts of the surface are verified and therefore sellable as coverage today, and which are a build dependency (§20 V-09). **[Reversed]** Earlier drafts said "only Telangana is verified"; only Telangana's employer-registration wording was ever verified, never its slab, and Maharashtra, Odisha and (in effect) Karnataka are now verified at state sources (EV-014).

| State | PT slab base and structure | PT periodicity | LWF | Evidence status | Pricing relevance |
| --- | --- | --- | --- | --- | --- |
| **Maharashtra** | Monthly salary; men nil to ₹7,500, ₹175 to ₹10,000, then ₹200 × 11 + ₹300 in February; women nil to ₹25,000, then the same split | Assigned per registration each year by the department — ingested, never derived | Not captured (amounts disputed, §06.8) | PT slabs **[Verified]** (EV-014) | Gender variant and February top-up: the engine edge cases the SLA absorbs |
| **Karnataka** | Monthly salary; ₹200 at ₹25,000 or above, ₹300 in February; no gender variant | Not captured | Calendar-year cycle, due 15 January; amounts not captured | PT effect **[Verified]** on the state portal, instrument not retrieved (EV-014); LWF periodicity **[Verified]** (r2/10) | High-volume beachhead state |
| **Odisha** | Annual income; nil below ₹1.6 lakh, ₹125/month to ₹3 lakh, then ₹200 × 11 + ₹300 in "the last month" (month undefined) | Annual, online | Not captured | PT **[Verified]** (EV-014); top-up month and a reported repeal both open (r1/06, r2/10) | A different slab base in kind — a flat monthly rule is wrong here |
| **Tamil Nadu** | Local-body levy; slabs per local body, not captured (`pt.TN.<local_body>.slabs`) | Not captured | Not captured | Levy structure **[Verified]** (r2/10); values **[Hypothesis]** | One state, many rate-setters |
| **Telangana, West Bengal, Gujarat and every other levying state** | Not captured (`pt.<state>.slabs`); earlier drafts' figures are not shipped | Not captured | Not captured | **[Hypothesis]** (EV-015) | Coverage is a build dependency, not yet a sellable claim |
| **States reported as not levying PT** | — | — | — | No negative verified for any jurisdiction (r2/10) | The product never treats non-levy as fact (§06.4) |

(Source: EV-014, EV-015, r2/10; §06.4 and §06.8 carry the full per-state specification. Aggregator PT tables are materially disputed, and at least one widely-cited 2026 table reproduces a superseded Karnataka structure — EV-015.)

Two pricing consequences fall directly out of this table:

1. **It is why the meter is rejected (§18.3).** A Karnataka firm deducts PT every month with a February top-up; Maharashtra's return cadence is set per registration by the department; Odisha files once a year; a three-state firm carries three different cadences. Metering the *count* would price identical firms wildly differently for zero difference in the value the buyer perceives. A per-head fee is neutral to this dispersion on the revenue side; our cost is not (EV-088), and the registration allowance with its multi-registration line (§18.3) is what absorbs the difference.
2. **It is why multi-state PT/LWF is a differentiator, and why maintenance keeps it one.** **[Reversed]** Earlier drafts said Frappe already covers PT across 15+ states and LWF across 14 at ₹0, so we could never out-cover it and could only out-maintain it. Neither Frappe nor TallyPrime ships a state PT slab table or an LWF engine (EV-031, EV-032): the state layer is greenfield in both parity comparators, Frappe and Tally (K-01), while the SaaS field claims it (§21.3). Coverage against the comparators is therefore ours to build — once the gazette-sourced dataset exists (§20 V-09) — and maintenance is what keeps it: the February cap-adjustment month, a slab revision notified mid-year, a new state bringing an establishment in scope are the moving parts an SLA absorbs and a free tool leaves to the customer.

---

### 18.4 The tier architecture

Three tiers plus a documentary enterprise gate, mapped to the headcount bands in §05. Feature gates are *statutory* wherever possible (P1). Every rupee figure is **[Hypothesis]** pending §20.

<!-- DIAGRAM: pricing-gtm-tiers -->

| | **Free — "Comply"** | **Beachhead — "File"** | **Growth — "Scale"** | **Enterprise — "Assure"** |
| --- | --- | --- | --- | --- |
| **Band** | < 20 employees | 20–199 | 200–1,999 | 2,000+ |
| **Gate type** | Size (statutory: EPF off) | Size + SLA | Size + taper (P4) | Documentary (§05) |
| **List price [Hypothesis]** | ₹0 | ₹80–150 PEPM target inside the ₹80–200 clearing band (EV-006); actual headcount, no seat floor (P6); registration allowance + multi-registration line (§18.3) | Tapered PEPM, base + metered | Bespoke; residency/cert-gated |
| **Core included** | Core HR, ESS, attendance, payroll *calculation* (incl. ESI and TDS, and the state-prescribed appointment letter once the establishment has 10+ workers — EV-057), Tally/Zoho/Kredily import | Everything in Free + **attended-submission SLA**, ECR/ESI/PT/Form 138 Q1–Q3 (Q4 fenced, EV-046), Form 130 data preparation (TRACES-issued, EV-048), six registers + wage slip (EV-053), CA-console seat, deskless/ADMS receiver | Everything in File + multi-entity, multi-state config, SSO/SCIM, deeper integrations, priority SLA | Everything in Scale + in-country inference, residency-selectable provider matrix, right-to-audit contract terms, ISO/SOC evidence pack |
| **Assistant (AI)** | Bundled (deflection) | Bundled | Bundled | Bundled |
| **Filing** | Generated artefacts only (customer submits) | **Portal-accepted artefacts + attended, assisted submission under SLA** — employer-attended and co-attended at launch (§22 Modes A, B); operator-attended under written authority per portal once counsel clears Part D-17 (Mode C, fenced — §18.3) | Same, priority | Same, with a regulator-grade audit trail |
| **Statutory liability** | Employer / deductor | Employer / deductor — non-delegable (K-13); our remedy is contractual and capped (§18.3) | Same | Same |
| **Sales motion** | Self-serve | Self-serve + light-touch, CA-referred | Light-touch + AE | AE + SI/procurement (deferred, §05) |
| **Role in model** | Funnel / land | **Revenue core** | Expansion | Vision (deferred ~3 yrs) |

Design notes:

- **Free is deliberately generous — it *calculates* everything.** We match Kredily and Zoho on calculation (giving it away costs us nothing incremental once built) and withhold only *attended submission and the SLA* (P1: size-gated, so a firm crossing 20 converts at the statutory moment, not because a feature was crippled). This is the opposite of Kredily's no-trigger model. Free must still compute ESI and TDS (s.392, ex-s.192 — EV-050) and issue the wage slip and, from 10 workers, the state-prescribed appointment letter (EV-057), because those obligations exist from employee 1 or 10 (§06.1) — a Free tier that could not do statutory calc would not be trusted at conversion.
- **Payroll is never an upsell.** Every vendor that publishes tiers puts payroll in its entry tier and gates performance, recruitment, engagement, analytics and workflow upward (EV-028). Payroll computation and artefact generation therefore sit in Free, attended submission and the SLA in File — the first paid tier — and no payroll capability is held back for Scale.
- **The Free→File boundary is the whole business.** A < 20 firm has no EPF; at 20 the surface jumps (ECR, a Grievance Redressal Committee at 20 or more *workers*, EV-057) and a spreadsheet stops being safe. Zoho's free payroll tier stops at 10, Kredily's has no headcount gate, and none of the six priced suites has a free tier (r5/03). One vendor's free boundary does sit at the EPF line: a round-one capture (4 Sep 2026) shows factoHR offering "Free ₹0/forever, Up to 20 employees" (r1/08), with a narrower scope than ours — employee data, letters and payslips — and it was not re-checked in later rounds (re-capture routed as §21 CQ-15; the scenario is CRS-12, risk R-41, §20.8). The gate position is therefore not unique; what is ours is the combination at that line — full statutory computation and artefact generation below it, attended submission and the SLA above it. That is the conversion engine, and no collateral claims the gate itself as a first.
- **File→Scale taper (P4)** avoids punishing growth: PEPM declines with headcount and a base-plus-metered-filings option appears above ~300 employees where multi-establishment filing volume, not seat count, drives cost. Note the mid-band obligations that arrive inside File/Scale and should be feature-gated to mirror them (§06.1, [Verified]): **crèche at 50, canteen at 100, standing orders at 300 and retrenchment/closure approval at 300** (the last raised from 100 by the Codes; EV-057), plus **a works committee at 100 or more workers only where the appropriate Government orders one** — not automatic (IR Code; r3/04, §05.1). Each is counted in its statute's unit — workers or employees — which is a schema field, not prose (EV-057). These are not price tiers but are product-surface changes the tier must accommodate.
- **Enterprise ("Assure") is priced but not sold in v1** — it exists on the card so the vision is legible, but the §05 documentary gate (ISO 27001 seasoning, references, residency) means no revenue is modelled from it for ~3 years.

Acceptance criterion (tier mapping): every headcount-driven feature gate in the product must be traceable to a named statutory threshold (10/20/50/100/300) or to the §05 documentary gate — no arbitrary "Pro-only" feature walls, because an arbitrary wall recreates the feature-gate anti-pattern P1 exists to avoid.

#### Tier entitlement — the derivation table

P10 makes entitlement derived. This is the derivation, written so the gate is testable rather than described:

| Entitlement key | Derived from | Evaluated | Effect when it flips on | Behaviour when the input reverses |
| --- | --- | --- | --- | --- |
| `tier.free` | Census below 20 **and** no prior File subscription | At each census close | Free feature set: computation, artefacts, wage slip, importers | n/a |
| `tier.file` | Census at 20 or above, **or** an explicit election below 20 (P6) | Census close; an election takes effect immediately | Attended-submission SLA arms from the first full billing period after acceptance | Never automatic. A down-tier is a contracted override with a named approver (P10) |
| `tier.scale` | Census at 200 or above | At each census close | Multi-entity and multi-state configuration, SSO/SCIM, priority queueing in the filing calendar | Reverts only after the census stays below 200 for `tier_stepdown_periods` consecutive closed periods |
| `feature.appointment_letter` | Establishment worker count at 10 or above (EV-057) | On establishment change | The state-configured prescribed-form letter template is enabled | Template stays enabled; an issued letter is a record and is never withdrawn |
| `feature.grievance_committee` | Worker count at 20 or above (IR Code s.4 — EV-057) | On establishment change | Grievance Redressal Committee surface enabled | Surface and membership records are retained |
| `feature.creche`, `feature.canteen`, `feature.standing_orders` | 50 / 100 / 300 respectively (EV-057) | On establishment change | Product surface appears. **Not a price tier** — see the design notes above | Surface is retained |
| `feature.posh_ic` | Every tenant, from employee one (POSH s.4(1) — EV-056) | At tenant creation | Internal Committee surface is present in Free as well as File | n/a — never gated |
| `addon.<name>` | An explicit subscription, per unit | On subscription change | Per-unit or metered billing begins at the next period | Cancels at the term boundary, prorated per §18.19 |

Acceptance criterion (no arbitrary walls, in machine-checkable form): a build lint enumerates every entitlement key in the product and fails if any key has no row in this table, or if a row's "Derived from" column names anything other than a census field, an establishment field, a named statutory threshold or an explicit subscription. That is the testable version of the tier-mapping criterion above, and it is the control that stops a "Pro-only" wall appearing by accident.

Two entitlement rules exist because of statute rather than packaging, and no commercial decision may override them. `feature.posh_ic` is never gated, because the Internal Committee duty binds every employer from employee one and the ten-worker line is the *Local* Committee, not an exemption (EV-056). And no entitlement may gate the wage slip or the six employer registers, because those are continuous obligations whose form numbers are configurable per state (EV-053) and whose retention runs five years from the date of last entry in the central sphere (EV-054). The Free tier therefore carries them, and §18.21 keeps them reachable even in dunning.

#### The plan and billing state machine (transition table)

<!-- DIAGRAM: pricing-gtm-plan-state-machine -->

Following Part E-1's convention, the machine is specified as a transition table and illustrated by the diagram. Each row is event · guard · side effect · who may trigger.

| # | From → To | Event | Guard | Side effect | Who may trigger |
| --- | --- | --- | --- | --- | --- |
| **T1** | — → PROSPECT | First identified touch | — | Acquisition source and, where present, partner ID stamped immutably (§18.18) | Marketing, partner, self-serve visitor |
| **T2** | PROSPECT → FREE | Tenant created | Census below 20 at creation | Free entitlements derived; importers enabled; no payment instrument required | Self-serve |
| **T3** | PROSPECT → FILE | Checkout completed | Payment instrument or mandate registered; GSTIN captured; every named registration servable (§18.3) | Subscription opened at the published card; SLA schedule attached; first invoice issued | Self-serve, or AE with a logged discount inside bounds |
| **T4** | FREE → FILE | Census crosses 20, or the tenant elects File below 20 | Payment instrument registered | Statutory-conversion event emitted (§18.15); SLA arms from the next full period; no seat floor applied (P6) | Self-serve; in-product upgrade without sales contact |
| **T5** | FILE → SCALE | Census crosses 200 | — | Scale entitlements derived; taper applies from the next period (P4) | Derived |
| **T6** | SCALE → FILE | Census under 200 for `tier_stepdown_periods` | No open multi-entity configuration that File cannot hold | Step-down scheduled at the term boundary, never mid-term | Derived, with tenant notice |
| **T7** | FILE or SCALE → DUNNING | Mandate debit or card recurring payment fails | Invoice is due and undisputed | Dunning schedule starts; **no entitlement change on day one**; tenant and billing contact notified | System |
| **T8** | DUNNING → FILE | Payment recovered | Arrears cleared in full or a written plan agreed | Dunning closed; no re-onboarding; no reinstatement fee | System, or support with a logged note |
| **T9** | DUNNING → READ_ONLY | Grace window expires | `dunning_grace_days` elapsed **and** two notices delivered | Writes disabled for new periods; reads, exports and statutory artefacts stay available (§18.21) | System |
| **T10** | READ_ONLY → FILE | Arrears cleared | — | Full entitlements restored within one billing cycle; no data loss | System |
| **T11** | READ_ONLY → CLOSED | Closure notice expires | `readonly_window_days` elapsed **and** a final export offered and evidenced | Subscription closed; retention clock starts (§18.21) | System with a named approver |
| **T12** | FILE → CLOSING | Tenant cancels | — | Cancellation effective at term end; forward renewal cancelled; no immediate loss of service | Tenant, self-serve |
| **T13** | CLOSING → FILE | Cancellation withdrawn | Before term end | Subscription continues at the scheduled renewal price (P8) | Tenant |
| **T14** | CLOSING → CLOSED | Term ends | Final invoice settled or written off | Export offered and evidenced; retention clock starts | System |
| **T15** | CLOSED → FILE | Win-back inside `post_closure_retention_days` | Data still within retention; registrations still servable | Prior history, filing ledger and imported YTD restored; no second migration (§18.10) | Tenant, or sales with a logged offer |
| **T16** | CLOSED → — | Retention window expires | Export offered and evidenced; no legal hold | Retention policy executed per the tenant's retention class (§14) | System |

Edge and negative cases the table must survive:

- **A census dip does not down-tier.** A firm that crosses 20 and falls to 18 stays on File (P1's gate-integrity criterion, and EV-057's latch problem). T6 is the only automatic down-step in the machine and it applies to Scale → File only, on a multi-period guard.
- **T7 changes nothing on day one.** A failed debit is a dunning event, not a churn event (§18.13); entitlements change only at T9, after the grace window and two delivered notices. A payroll month in progress at T9 completes: the write lock applies to periods not yet opened — otherwise a billing failure becomes a statutory failure, which is the one outcome this machine exists to prevent.
- **A tenant in DUNNING or READ_ONLY still has an armed SLA for periods already invoiced and paid.** Non-payment of March does not retroactively withdraw the February commitment; the SLA schedule is per period, and §18.23's claim workflow reads that schedule, not the current plan state.
- **T3 with an unservable registration is refused at checkout**, not sold and fenced afterwards (§18.3). The refusal carries a named reason and a waitlist, and it is counted as a lost deal with that reason in §19, because the count of refusals per state is the demand signal that prioritises the next state dataset (§22).
- **T15 must not re-import.** A returning tenant's migration was already paid for once, in effort if not in money; re-running it is the failure mode §18.10's win-back position exists to avoid.
---

### 18.5 Packaging and monetised add-ons

The assistant is bundled everywhere (§12). Monetisation appears only where the unit of value is *legibly incremental* and does not track headcount — otherwise it reads as a surcharge on an expected feature ([Killed]: premium AI SKU, §20).

| Add-on | Pricing unit | Why it is separable from PEPM | Status |
| --- | --- | --- | --- |
| **Recruiting** | Per requisition or per hire (not per employee) | **[Verified]** Recruiting cost does not track headcount — a tenant hiring 15%/mo vs 3%/mo is a ~15× inference-cost difference on identical PEPM (resume screening ₹1.13 vs ₹17.00 per employee-month on the same model, r2/03; §13.7 — the hiring rate alone is 5×, and CVs per hire and tokens per CV compound it). greytHR already prices Recruit per recruiter, not per employee (₹2,500/recruiter/month — Source: greytHR pricing, captured 5 Sep 2026, r5/03); Keka's archived card priced Hiring at ₹1,500 and ₹2,500 per recruiter per month (EV-022) | Ship metered in v2 (§05); recruiting is inbound-only given the Naukri/Resdex dependency (§10) |
| **Location / GPS tracking** | Per tracked user/mo | **[Verified]** greytHR prices GPS Live Tracking at ₹140/user/mo (Source: greytHR pricing, captured 5 Sep 2026, r5/03). The add-on is available only on its Growth and Premium plans (r2/04), so the like-for-like ratio is **1.6×** Growth's ₹85 marginal seat; against Essential's ₹45 it is 3.1×, a plan that cannot buy it. Kredily prices continuous live tracking at ₹50/user/mo — a 2.8× spread on functionality not compared field by field (r2/04). Location is monetisable at a price well above a seat | Add-on for deskless-heavy tenants; kill if attach < 10% of eligible tenants |
| **Bulk document generation** | Per document batch / metered tokens | Legibly incremental AI output (offer letters, F&F letters at scale); cost tracks volume not headcount | Metered AI SKU (§13); kill per §20 V-07 |
| **HR-analyst copilot** | Per admin seat/mo | Heavy-user AI consumption concentrated on a few admin seats; **[Verified]** an HRMS is priced per employee but consumed per user, and one heavy user can exceed a seat's entire ARPU (§13) | Per-admin-seat SKU; kill per §20 V-07 |
| **Self-hosted / dedicated** | Priced compliance SKU | **[Verified]** Serverless beats dedicated H100 ~74× at real utilisation (§13); self-host is *only* a compliance SKU for named regulated accounts, never a cost play | Enterprise gate only |

**[Hypothesis]** The metered-AI SKUs (bulk docs, analyst copilot) share one kill criterion: §20 V-07 (Van Westendorp / conjoint, 30–40 buyers). If willingness-to-pay for HR AI is genuinely zero everywhere, **drop the metered AI SKUs entirely** and keep AI purely as deflection/COGS. The recruiting and location add-ons survive that kill because their value is not "AI" — it is a distinct job (hiring, field tracking) with its own non-headcount cost driver.

**Benefits/FBP is built but not monetised in v1.** Per §11, build FBP declarations, wallet configuration, proof-of-spend, dependant records and endorsement history in v1 — they are the option value on any future attach business and are expensive to retrofit — but model **software PEPM and any attach revenue as two separate lines that are never blended** (§11 [Verified]). One dated product hook to design for: effective **1 April 2026** the tax-free meal perquisite rose ₹50 → ₹200/meal and the gift/voucher threshold ₹5,000 → ₹15,000/yr (EV-019, **[Hypothesis]** — two dated secondary reads and a counsel spot-check concur; the gazette text is not yet read and the rule citation is routed to §20 V-18). The ₹200 is tax-free **only** for meals during working hours at office or factory premises, or non-transferable vouchers usable only at eating outlets; without those conditions the perquisite is taxable, payslips under-deduct, and the demand plus interest lands on the employer — so the wallet enforces the conditions as engine constraints (§08, §11), not as a limit field (K-19). This changes FBP *configuration* surface, not our pricing.

#### Choosing the pricing unit for an add-on — the decision rule and the market references

Every add-on above answers one question: **what is the unit of value, and does it track headcount?** If it tracks headcount it belongs in the PEPM and charging for it twice is a surcharge on an expected feature. If it does not, it is separable — and the unit is whatever the customer's own cost driver is, not whatever is easiest to meter.

| Test | If yes | If no |
| --- | --- | --- |
| Does consumption scale with employee count? | Fold into PEPM. No separate SKU | Continue |
| Is there a natural counting unit the buyer already reasons in — a recruiter, a tracked user, an admin seat, a document batch? | Price on that unit | Continue |
| Is the cost driven by a distinct job rather than by our platform cost? | Price on the job (per requisition, per hire) | Do not ship the SKU; it will read as a surcharge |

**[Verified] market references for the units, not the levels.** These are the published cards of two vendors, captured 5 Sep 2026, and they are cited to show that per-unit add-on pricing is an established pattern in this market — never as our own prices, which are unset:

| Add-on | greytHR (r5/03) | Zimyo (r5/03) | Qandle (r5/03) |
| --- | --- | --- | --- |
| Performance management | ₹35–₹45 per user per month, available on Growth | — | — |
| Timesheets | ₹35 per user per month | ₹40 per user per month | — |
| Expense management | ₹35 per user per month | — | — |
| GPS live tracking | ₹140 per user per month, on Growth and Premium only | — | — |
| Remote screen tracking | — | — | ₹50 per employee per month, the same monthly or annual in India alone |
| Recruitment | ₹2,500 per recruiter per month, on all plans | ₹4,000 per recruiter per month | — |
| Learning / trip management | — | ₹40 per user per month each | — |
| HR analytics | — | ₹20,000 per licence per month | — |
| Alumni portal | ₹20 per user per month | — | — |

Three readings that matter for our packaging. First, **the recruiter is the established unit for recruitment** — greytHR ₹2,500 and Zimyo ₹4,000 per recruiter per month, and Keka's archived card priced Hiring at ₹1,500 and ₹2,500 per recruiter per month (EV-022) — which is the same conclusion §18.5 reaches from the cost side, arrived at independently. Second, **a per-user add-on can be priced far above a marginal seat**: greytHR's GPS tracking at ₹140 sits at 1.6× its own ₹85 Growth marginal seat and 3.1× its ₹45 Essential seat, on a plan that cannot buy it. Third, **a licence-priced analytics SKU exists in this market** at a level an order of magnitude above a seat, which is evidence that the "concentrated consumption on few users" pattern §13 identifies is already monetised by someone — and equally, it is one vendor's card, not a norm.

What this does not license: quoting any of these as our price, or inferring that an add-on we have not built would attach at the same rate. The attach-rate kill criteria stay as §18.5 sets them, and the levels are ours to discover.
Explicitly **not packaged**: a premium AI tier (seven vendors at zero, §12 [Killed]); interchange/benefits-float revenue (Zaggle economics, §11/§20 [No]); any per-employee AI surcharge.

---

### 18.6 GTM motion by band

The motion is **product-led at the bottom, CA-referred in the middle, and AE-assisted at the top of the beachhead** — with no enterprise field motion in v1. The full channel map — CAs, payroll service providers, Tally partners, bank alliances, review and Indian marketplaces, device dealers — with each channel's evidence, build prerequisites and revenue gate is §18.18.

#### Free (< 20): pure product-led, statutory-trigger acquisition

- **Acquisition channels:** SEO/content on the exact statutory questions this band searches ("EPF registration 20 employees," "how to file ECR," "PT slab Karnataka 2026," "what changes at 20 employees India"), the free importers as landing pages (§18.9), and the Zoho-cliff campaign (P2). The content is a natural fit for the compliance-maintenance operating model (§05) — the statutory-change watcher's output *is* the content engine, and it must catch *amendments not just new instruments* (the corrigendum lesson, §06).
- **Activation metric:** first successful *calculation* run (payroll computed for real employees), not signup. **North-star for the tier:** crossing 20 while still on us.
- **Cost discipline:** the assistant deflects support (the reason AI is COGS); a free tenant that requires human support is unit-negative and is nudged to self-serve or to convert. Per-tenant and per-user AI rate limits are P0 (§13) precisely so a free tenant cannot run up inference cost that has no revenue behind it.

#### Beachhead (20–199): self-serve price card + light-touch, CA-referred

- **[Hypothesis]** self-serve INR pricing is the only way to be evaluable by a 30-person firm (P3). The 20–49 lower half is expected to close self-serve off the published card; the 50–199 revenue core is self-serve *or* light-touch with an AE and, frequently, a **CA referral** (§18.7).
- **[Verified]** The buyer committee in Indian SMB HRMS spans HR, finance and the founder — finance is a first-class buyer, not a rubber stamp (r3/03). The card, the SLA wording and the billing mechanics (§18.13) are therefore sales collateral for the finance buyer, not back-office detail.
- **Sales-motion shape.** **[Verified]** as job advertisements, not as outcomes: Keka advertises separate business-development roles for the India SMB and mid-market segments alongside enterprise account executives — a split SDR/AE motion (r3/03, medium) — and the earlier claim that this segment is sold by inexpensive full-cycle reps rested on one small vendor's job advertisement and is retracted (r3/03). Whether split or full-cycle wins at 20–200 is unresolved; the two data points likely track vendor scale, not segment economics (r3/03 open question). **[Hypothesis]** Assume a split motion, and at least two cost lines per assisted close, until our own funnel data says otherwise; no rep-cost figure enters the CAC frame (§18.14) until it comes from salary data or our own hiring (§20).
- **The trigger event is the sale.** Highest-intent moments: crossing 20 (EPF turns on), a statutory format break (Form 138/Q4, §06), a failed/late filing under their current setup, the November 2026 ESI-regime uncertainty (§06.9 — the saved ESI schemes expire on or about 21 Nov 2026 and the regime from 22 Nov 2026 is unresolved; EV-004, §20 V-08), or bureau-fee sticker shock. GTM instruments to detect and target each.
- **Migration is the objection to neutralise** (§18.9): **[Hypothesis]** the beachhead's most-cited churn/switching fear is cutover pain. The demo *is* the import.

#### Growth (200–1,999): AE-assisted, expansion-led

- Reached primarily by **expansion from the beachhead** (§18.10), not net-new cold. Same product shape, more config (multi-entity, SSO/SCIM). Motion is a named AE + solution-consultant, still with a published anchor to avoid the quote-wall (P3), custom only above ~500. Private-sector only at first (§05).

#### Enterprise (2,000+): deferred, documentary

- **[Verified]** Foreclosed ~3 years on arithmetic, not eligibility (§05): 30k-employee prior-implementation criteria (SBI Criterion 7), the Appendix-T 150-mark incumbency-weighted matrix, GFR 2017 Rule 173(i)/170(i) startup exemption that is a *buyer's permission not a bidder's entitlement*, ISO 27001:2022 one-year seasoning clock (held ≥1 year before RFP), and sectoral overlays: RBI's outsourcing obligations — localisation, audit including by RBI, sub-contractor consent — which are **materiality-gated, entity by entity** (EV-087, mirror-sourced — pull from the primary source before customer use); SEBI's cloud framework, which requires in-India residency and reaches SaaS providers through the MeitY-empanelled-infrastructure rule (EV-085); and IRDAI, which imposes **no** localisation beyond policy records (EV-086) (Source: SBI/Indian Bank HRMS RFPs; GFR 2017; RBI Outsourcing of IT Services Directions, effective 1 October 2023). **[Reversed]** earlier drafts said "RBI/IRDAI residency and right-to-audit with no turnover threshold" — RBI's test is materiality, not turnover (K-22), and IRDAI has no general localisation rule (K-08). Whether a given arrangement is material is a counsel question (§23). No field motion, no revenue modelled. The only month-zero action is starting ISO 27001 (§05) so the seasoning clock is spent, not wasted — "the cheapest year you will ever buy."

---

### 18.7 Channel A — the CA / consultant console

This is **the most consequential GTM recommendation in the document, and it carries the least evidence.** Draft 1 is explicit: *no CA has been asked a single question* ([Hypothesis], §20). The console is designed as if the channel works; the §20 programme decides whether it does.

#### Why the channel is plausible

**[Verified]** The bureau/CA is a real budget line and the trusted party who prepares the return for the employer to sign off; the ICAI fee schedule we read prices filing work, not payroll processing (EV-017 — a superseded schedule; the February 2020 revision is unread, §18.3). The level of that line — ₹3,000–15,000/mo — is **[Hypothesis]** (§20 V-01). A CA serving 20–80 small clients (**[Hypothesis]** on the count, §20 V-05) is *already* the aggregator of exactly our beachhead. If we arm the CA rather than replace them, one CA relationship is a distribution channel to dozens of tenants. **[Verified]** eSSL markets integration with six named HRMS vendors on its own site (§09) — the ecosystem norm is partner-not-compete, and the CA is the human analogue.

**[Verified]** The accountant channel is the most consistently evidenced channel in this market, and it is already contested (vendor pages read in research round three, 2026 — r3/03; programmes not joined or executed): Kredily runs a CA Program distinct from its white-label Partner Program for payroll service providers, on a multi-company dashboard ("Switch between every client from one login") that tracks PF, ESI, PT and TDS across the client book, with clients landing on the Free Forever plan and monetising when they need payouts, challans or Form 16; factoHR names "CA/Tax Consultant" among six recruited partner classes; Zimyo recruits tax consultants and financial advisors by name; greytHR productises a payroll-service-provider landing page. **A multi-client console is therefore the entry ticket to the channel, not a differentiator.** Our console is positioned on what it carries — the filing state across the book, attended submission under the client's authority (§22 Mode D) and the SLA — never on its existence (§21).

#### The console specification (functional requirements)

**[Hypothesis]** The CA-facing console is a first-class product surface, not a report export. Requirements:

| Capability | Detail | Statutory / product basis |
| --- | --- | --- |
| **Multi-client switching** | One CA login, N tenant workspaces, sub-second context switch, per-client role scoping | The CA's actual workflow is N clients, not one |
| **Per-client compliance calendar** | Consolidated due-date board across all clients: ECR (15th), ESI (15th), TDS deposit (Rule 218 date, §20), PT (state cadence), Form 138 quarterly (Rule 219, EV-049), Form 130 annual (15 June), LWF — with each filing's state from the filing state machine: SCHEDULED, BLOCKED, GENERATED, VALIDATED, SUBMITTED, REJECTED, ACCEPTED, REVISED, SUPPLEMENTARY, PAYMENT_INITIATED, FILED (FR-PAY-711, §08) | §06.11 filing calendar; the CA's core anxiety is "which client's filing is due" — and, since a rejected filing is not done, "which one bounced" |
| **One-click statutory export** | Form 138 Q1–Q3 (Q4 fenced, EV-046) and PT/LWF return export per client in the period's notified format | §06 format currency. In v1 the CA submits through the portal under the employer's or deductor's authority, as today; whether a third party filing Form 138 for a deductor engages the e-Return Intermediary route is a counsel question (Part D-17, §23) |
| **Read-only audit access** | Immutable, timestamped view of every computation and filing for a client, for the CA's own review before the employer signs off | Rules-first audit trail (§08); the CA answers to the client professionally and needs to inspect — the employer's statutory liability is non-delegable (K-13) |
| **Client invitation & billing modes** | CA can invite a client onto the platform; billing either to the client direct or to the CA (agency/reseller mode) | Determines whether the CA is a referrer or a reseller — the pivotal economics question |

Acceptance criterion (console viability): a CA managing 20 client tenants must be able to see, in one screen, every filing due in the next 30 days across all clients with its status, and export the current-format return for any one in a single action. If the console cannot compress a 20-client due-date view to one board, it is a report export, not a channel product, and the channel thesis is not tested fairly.

#### The economics question that inverts the channel

**[Hypothesis]** The channel works only if CAs see us as *leverage*, not *disintermediation*. Two possible relationships:

1. **Referral / arm-the-CA:** CA keeps the client relationship and their advisory fee; we take platform PEPM; CA gets a referral share or a discounted agency rate. CA's incentive: serve more clients per hour of their time. This is the intended model.
2. **Disintermediation (the failure mode):** the CA perceives that a self-filing HRMS removes their monthly payroll-processing revenue. They then steer clients *away* from us. The channel inverts into an opponent with trusted-advisor access to every one of our prospects.

The referral-share economics must be modelled as **CAC, not COGS** (§18.14): a referral share paid to the CA is a customer-acquisition cost that is capped so blended payback holds, not a recurring margin leak. In agency/reseller mode (mode 1 made explicit), the CA buys at a discounted rate and resells — here the discount is a *channel margin* and the reseller contract is drafted to make the CA the customer of record (the contract structure, and what it does to the written authority to act under §22, is under counsel review, §23); ICAI's rules on a member's permissible commercial arrangements must be checked before offering a reseller rate (Source: ICAI Code of Ethics on fees/commission — [Hypothesis], confirm with counsel before launch, §23).

**Kill/validate:** §20 V-05 (20–30 practising CA interviews, both city tiers). If CAs predominantly see us as disintermediation, the console is repositioned as a pure agency/reseller tool (mode 1 economics made explicit and generous) or the channel is abandoned and the beachhead goes direct-only. **No revenue forecast may depend on the CA channel until V-05 reports.** The related risk (Zoho widening free gates) makes the CA console *more* valuable, not less — we are not aware, as of September 2026, of a Zoho CA console, though Kredily sells one (r3/03), so the defence rests on the submission and SLA the console carries (§20.8). The commission and referral mechanics the channel needs — term, tiering, attribution window, deal registration, payout cap — are specified as parameters in §18.18.

#### The two console billing modes, specified

D-P3 (§18.32) records the referral-versus-reseller choice as open. The product must be able to run either without a rebuild, because V-05 decides it and the answer may differ by partner class. The two modes differ on far more than a discount:

| Dimension | **Mode R — referral (intended)** | **Mode A — agency / reseller** |
| --- | --- | --- |
| Customer of record | The employer | The CA practice |
| Who is invoiced | The employer, at list off the published card | The practice, at a channel rate; the practice invoices its client on its own terms |
| Our price visibility | Full — the employer sees the card and their invoice | The practice's client may never see our card at all |
| Partner compensation | `partner_commission_pct` on collected revenue, as CAC (§18.26) | A channel margin inside the rate; the discount *is* the compensation |
| Written authority to act (§22) | Granted by the employer to us, and separately to the practice where it acts | Granted by the employer — never by the practice on the employer's behalf; the authority chain is the counsel question (§23) |
| Data controller posture | The employer's tenant, with the practice as an invited user under scoped roles | Unchanged: the employer's employee data does not become the practice's because the practice pays the bill |
| Support path | The employer may raise tickets directly | Tier-1 through the practice by default, with an escape hatch the employer can always use |
| SLA counterparty | Us to the employer | Us to the practice, and the practice to its client on its own terms — which is why the SLA schedule is attached to the subscription (GTM-036), not to the brand |
| Churn exposure | One employer leaves | The practice leaves and takes a book with it |
| Realised-versus-list (V-03) | Clean — discounts are grants with approvers | Structurally lower; the channel rate must be modelled separately or the ARPU metric is polluted |

Three rules hold in both modes and are not negotiable at the contract table:

1. **The employer's data stays the employer's**, whoever pays. A practice that stops paying cannot take the employer's statutory records with it, and §18.21's artefact floor applies to the employer's tenant regardless of who is in dunning.
2. **The authority to act on a portal comes from the employer**, never from the practice as an intermediary granting it onward. This is the sharp end of the counsel-gated question (Part D-17) and the reason Mode D sessions are specified in §22 rather than assumed here.
3. **An escape hatch always exists.** The employer can always reach us directly and can always export. A channel arrangement that makes a customer unreachable is a channel that owns our churn.

Acceptance criteria: a tenant's billing mode is a stored attribute that drives invoicing, support routing and the commission ledger with no code branch per partner; switching a tenant from Mode A to Mode R (a practice leaves, the employer stays) is a supported operation that changes the payer and nothing else — not the data, not the filing ledger, not the SLA schedule for periods already paid. Negative case: a mode switch may never be executed without the employer's own confirmation, because in Mode A the employer is not the party requesting it.
---

### 18.8 Channel B — the Tally ecosystem

**[Hypothesis], and load-bearing.** Draft 1: the Tally-partner channel is *equally unvalidated* — no revenue may depend on it (§20).

#### The two distinct Tally plays

1. **Tally as migration source (P1 — first within the importer set, §05.5 item 17; §18.9).** Tally is one of two incumbents with two jobs: it owns accounting and the statutory artefacts (EV-032), while greytHR owns the HRMS job (K-23). The import is the wedge into Tally's accounting relationship. This is a product surface, not a partnership, and it is committed regardless of whether the channel works.
2. **Tally partners as a distribution channel (unvalidated).** Tally runs a four-grade partner channel (3-Star and 5-Star Certified, Associate, GVLA) plus a separate CA Community; its public locator listed 1,257 partners — a directory count, not an audited network size — and it publishes no partner margins (r3/03). That channel already sells and services accounting software to exactly our beachhead. If partners resell or refer us, that is a ready-made field force we cannot afford to build. (The "~25,000-partner" figure in earlier drafts matches no capture and is withdrawn. Tally's own site claims "28,000+ partners" — a vendor claim, r2/05, medium; the gap between that claim and the 1,257 the locator lists is unexplained, so neither figure sizes the channel — V-02's partner interviews do.) One HRMS vendor already recruits this class by name — factoHR lists "Tally/CRM/ERP Reseller" among its six partner categories (r3/03) — but there is no public evidence of how many Tally partners carry an HRMS line or at what attach rate (r3/03 open question). The precondition on our side is concrete: a payroll journal export in a TallyPrime-importable format, with ledger and cost-centre mapping configurable per client, so that the partner's accounting stack is left untouched (r3/03; §16).

#### The hard prerequisite: how many Tally businesses run Tally *payroll*?

**[Verified] as a question, unresolved as a fact.** **[Reversed]** Earlier drafts framed this as "is Tally even the incumbent?"; the incumbency question is settled — two incumbents, two jobs (K-23) — and what stays open is Tally payroll *adoption*, as distinct from capability (EV-032). §20 V-02 asks what share of Tally's ~2.5m businesses (Tally's own "2.5+ million businesses worldwide" claim — not an India count; its homepage says 2.7M+, r2/05) actually *enable the payroll module*; Tally publishes no module-level adoption data. The answer swings the entire channel: **at ~5% enablement, the Tally-partner channel is a footnote for payroll; at ~40%, it is the channel that matters.** Method: 15–25 Tally-partner interviews + buyer survey. **No Tally-channel investment beyond the importer proceeds until V-02 reports.**

#### Channel conflict to design around

**[Verified]** We explicitly decline hardware (§09/§20 [No]): devices are ₹4,000–25,000 one-time, no margin, and reselling them creates direct conflict with the dealer/eSSL networks that could otherwise distribute for us. The same logic governs Tally: **do not compete with the partner's existing revenue.** We are the payroll-and-filing layer the partner attaches to their accounting sale, not a Tally replacement. If a partner reads us as "sell against Tally," the channel dies — so collateral positions us as complementary (the state PT slab table, LWF engine and leave module Tally lacks — EV-032 — plus the employee surface, mobile, attended submission, filing SLA and CA console, §18.1).

---

### 18.9 Migration and switching strategy

**[Hypothesis], first-class product surface.** Implementation friction is the most-cited churn trigger in the market, and mid-year cutover is where it concentrates. Migration is **budgeted as acquisition infrastructure, not a services task** (§16).

#### The mid-year cutover problem, itemised

A customer switching in, say, August must carry across without loss or double-counting:

| Migrated object | Why it is hard | Correctness requirement |
| --- | --- | --- |
| **Opening balances & YTD earnings** | Payroll is cumulative within a Tax Year (Apr–Mar; "Financial Year" in 1961-Act periods — EV-050); a mid-year switch inherits YTD gross, deductions, PF/ESI/PT/TDS already paid | YTD must reconcile to the prior system's last payslip *and* to filed challans |
| **TDS already deducted + regime** | TDS on salary (s.392, ex-s.192 — EV-050) is computed on projected annual income; mid-year switch must import cumulative TDS and the employee's regime election (new regime by default unless the old is opted — ex-s.115BAC, its 2025-Act counterpart held as rule-version data, §05.5 item 6) so the annual projection is continuous | The year's Form 138 salary data must stitch two systems, because TRACES generates Form 130 from it (EV-048); our Form 130 data preparation is fenced until the Q4 format is released (EV-046) |
| **Previous-employer income** | Employees who joined mid-year declared prior-employer income; must survive migration | Or the annual TDS projection is wrong |
| **Investment declarations mid-cycle** | Declarations (and proofs) made in the old system must carry, or the employee re-enters them and trust is lost on day one | Import declaration + proof state |
| **EPF UAN & ESI IP continuity** | UAN and ESI IP are employee-lifetime identifiers; discontinuity breaks the employee's statutory record | Preserve UAN/IP linkage; never mint duplicates |
| **50% add-back wage-base history** | The dual wage base (§06) is period-specific and effective-dated; importing only a single "gross" loses the split | Import must reconstruct both wage bases per period, or arrears/retro recompute wrongly |
| **Leave balances & gratuity accrual** | Accrued leave and gratuity (eligibility, continuous-service counting and computation per §06.6) are liabilities that must transfer exactly | Balance parity with prior system as of cutover date |
| **Contribution-period boundaries** | ESI contribution periods (Apr–Sep, Oct–Mar) and PF wage-ceiling application mid-period affect the running totals | Import at a clean period boundary or reconcile the partial period |
| **Certificate continuity** | Form 130 (ex-16) is valid only if TRACES-generated (EV-048), so continuity means the year's Form 138 data spans both systems without gaps | One continuous Form 138 salary record for the Tax Year; Form 130 data preparation fenced until the Q4 format is released (EV-046) |

#### The importers, as acquisition infrastructure

Importers are **P1** in the v1 scope (§05.5 item 17), Tally first within them because Tally owns the accounting and statutory-artefact job (EV-032) — though how many beachhead firms run Tally *payroll* is unknown (§20 V-02). Importers from Zoho Payroll, Kredily and Frappe are *acquisition infrastructure, not integrations*, and are budgeted as such (§16). Each importer is a landing page and a demo-that-is-the-migration:

- **Tally importer (P1, first):** parse Tally payroll masters + YTD; the migration path whose volume V-02 will size.
- **Zoho / Kredily / Frappe importers (P1):** direct switch paths from the free-tier field. A Kredily/Zoho user churning up to a paid product that carries filings to portal acceptance is our best-qualified lead; the importer removes the only real objection.
- **Spreadsheet importer (P0 — §05.5 item 32, the Excel/CSV onboarding import with the YTD tie-out validator and the parallel-run month):** the true incumbent for much of the beachhead is Excel + a CA, and every R1 tenant arrives through this path. A forgiving, template-guided spreadsheet importer with validation-on-ingest is table stakes; the named-source importers above stay P1.

**[Hypothesis]** Migration success is an activation metric, not a support ticket. Acceptance criteria:
- A 50-employee tenant completes a mid-year import — with YTD, UAN/IP, declarations, both wage bases and leave balances reconciled — self-serve or with light-touch, inside one pay cycle.
- Import reconciliation report shows zero unexplained variance between imported YTD and the prior system's filed challans; any variance is surfaced for the customer to resolve before the first live run, never silently absorbed.
- No duplicate UAN or ESI IP is ever created for an employee who has one.

Kill: if median assisted migration exceeds a full pay cycle, migration cost re-enters CAC and the low-ACV lower-half economics (§05) break (H-P7; first dataset test in §20 V-15).

---

### 18.10 Land-and-expand

The model is **land free or low in the lower beachhead, expand up the bands on the same product shape.** It is the reason the 20–49 half is acquired at all despite likely-negative unit economics at list PEPM (§05).

#### The expansion ladder

| Stage | Trigger | Motion | Value captured |
| --- | --- | --- | --- |
| **Land — Free** | Firm < 20 adopts for calculation + free importer | Product-led | ₹0; option on conversion at 20 |
| **Convert — Free → File** | Crossing 20 (EPF turns on) | Statutory-trigger, in-product | PEPM begins; the core conversion |
| **Grow within File** | Headcount rises 20 → 199; more states (PT/LWF); deskless hires | Automatic (per-employee) + add-on attach (location, recruiting) | PEPM × growing headcount + add-ons |
| **Expand — File → Scale** | Crossing 200; multi-entity; SSO/SCIM need | Light-touch + AE | Tapered PEPM at larger base + metered filings |
| **Enterprise (deferred)** | 2,000+; documentary gate met | AE + procurement | Vision only, ~3 yrs out |

#### Why land-and-expand, not land-and-monetise-immediately

**[Hypothesis]** The 20–49 lower half is net-negative on unit economics at list PEPM and is justified *only* as a funnel into 50–199 (§05). At the lower half, ACV lands around ₹24,000–60,000/yr (§05.1, [Hypothesis]) — below where self-serve CAC comfortably clears without expansion. The whole model rests on cohort progression. Kill criterion (inherited from §05): if cohort analysis at month 18 shows **< 25% of 20–49 lands crossing into 50+ within 12 months**, stop acquiring the lower half and raise the commercial floor to 50 (H-P8). This is also the pre-agreed response if Zoho widens its free gate (§20.8): the beachhead floor moves up and we lean harder on the filing SLA and attended submission — neither of which, as of September 2026, we are aware of Zoho selling — carried to CAs through the console.

#### Net revenue retention as the expansion metric

**[Hypothesis]** The expansion thesis lives or dies on NRR, not logo growth. Target: NRR > 100% driven by (a) headcount growth within accounts (automatic PEPM), (b) band graduation (File → Scale), and (c) add-on attach (location, recruiting, analyst copilot). Because pricing is per-employee and the beachhead is *growing* firms, *headcount-driven expansion is structural* — a 50-person customer that becomes 90 people pays 80% more with zero sales effort. Kill: if NRR < 95% at 12 months post-launch cohort, the expansion model is broken and the CAC math (which assumes expansion) must be re-run at flat-account economics (H-P9).

#### Retention, renewal and the seasonality of churn

**[Hypothesis]** Retention is not symmetric across the year, and the pricing/renewal calendar must respect the Indian financial year. Concrete mechanics:

- **The switching-cost moat is real but time-shaped.** Once we are filing-critical, the mid-year cutover pain that was our acquisition *objection* becomes our retention *moat* (§18.9): a customer cannot cleanly leave mid-year without inheriting the same YTD/UAN/TDS-continuity problem in reverse. The dangerous window is therefore the **Tax Year boundary (Feb–Apr)** — the only clean cutover point — which is exactly when annual-prepay renewals and any competitive re-evaluation concentrate. Renewal motion and any price change must be timed and resourced around this window, not spread flat.
- **Form 130 (ex-16) issuance is a retention event, not just a compliance one.** The annual certificate is due by 15 June (Rule 215; r5/02); it is generated by TRACES from the year's Form 138 data we prepare (EV-048), and it is blocked while the Form 138 Q4 format is unreleased (EV-046). A customer whose Form 130s issued cleanly and on time for all employees has just experienced the product's single most visible statutory deliverable right before the renewal window. Instrument certificate-issuance success as a leading retention indicator.
- **Price changes grandfather the installed base.** A list-PEPM increase (e.g. after §20 V-03 revises the target upward) applies to new logos immediately and to existing accounts only at their FY-boundary renewal, with notice — churning an existing filing-critical account over a price step is strictly worse than the incremental ARPU it captures.
- **Win-back is cheap for us and expensive for the customer.** A churned tenant retains their imported history; re-onboarding them is near-zero cost on our side and spares them a second migration. Win-back offers target the FY boundary and lead with "your data and filing history are still here," not a discount.

Kill/validate: if gross logo churn concentrates *away* from the FY boundary (i.e. customers leave mid-year despite the switching cost), the moat thesis is weaker than claimed and CAC payback (§18.14) must assume shorter tenure. Track churn-by-month as a first-class cohort metric.

#### The renewal and price-change runbook

The three mechanics above — the Tax Year boundary, the certificate event and grandfathering — only work if they are sequenced. This is that sequence, expressed as a runbook against the plan state machine (§18.4) so that renewal is an operated process rather than an invoice that appears.

| Days before the account's term boundary | Action | Owner | Guard |
| --- | --- | --- | --- |
| T−120 | Certificate-issuance health check for the tenant: did every employee's Form 130 data prepare cleanly, and is anything blocked by a fence (EV-046)? | Compliance operations | The check runs even if the tenant is not up for renewal; it is a retention indicator (GTM-054) |
| T−90 | Cohort review: census trend, filing-rejection rate, SLA claims raised, support load, add-on attach | Account owner | Data from §19, not from an opinion |
| T−`renewal_notice_days` | Forward renewal rate and effective date visible in-product and notified (P8) | System | An edit to `renewal_price` inside this window is blocked, not warned |
| T−45 | For a scheduled list increase, the grandfathering statement: what changes, when, and that it lands at this account's own boundary | Pricing owner | The change-log entry on the public card already exists (§18.30) |
| T−30 | Non-renewal notice window opens for the tenant; cancellation is self-serve and effective at term end (T12) | Tenant | Cancellation never degrades service before the boundary |
| T−14 | If a cancellation is recorded, the export offer is made and evidenced, and the win-back window is explained | Account owner | §18.21's floor applies from this point |
| T+0 | Renewal invoice at the notified rate, or CLOSING → CLOSED (T14) | System | An invoice at an un-notified rate cannot be issued (GTM-022) |
| T+1 to T+`post_closure_retention_days` | Win-back available with history intact (T15); no second migration | Account owner | After the window, the product says plainly that history is gone (GTM-TS-17) |

Two sequencing constraints that fall out of the calendar rather than from choice:

- **The February–April window concentrates everything.** It is the only clean cutover point, so it is simultaneously when competitive re-evaluation happens, when annual prepays renew, and when the prior Tax Year's arithmetic is still open. A price change scheduled to land inside it is a change landing at the moment of maximum switching willingness, which is the worst possible timing. Schedule list changes to land outside it wherever the account's term allows.
- **The certificate event precedes the renewal window, and it is the strongest signal we have.** A tenant whose Form 130s issued cleanly has just seen the product's most visible statutory deliverable; a tenant whose did not has just seen the opposite. The T−120 check exists so the second case is known months before the renewal conversation, not discovered in it. Note the dependency that makes this fragile and is not ours to fix: the certificate is TRACES-generated (EV-048) and Part B generation is fenced on the unreleased Q4 format (EV-046), so "cleanly" means our data preparation, not our issuance — and the tenant must be told that distinction before the season, not during it.
---

### 18.11 Defences against the price-floor attack

The floor is zero *and moving*. Three verified threats and the pre-agreed pricing response (cross-referenced to the §20.8 risk register):

| Threat | Observable trigger | Pricing/GTM response |
| --- | --- | --- |
| **Zoho widens free gates** 10 → 25 or 50 | Zoho Payroll pricing page changes its headcount ceiling (Source: monitor Zoho pricing page) | Move beachhead floor up; re-anchor on 50–200; lean on the filing SLA and attended submission, which we are not aware (September 2026) of Zoho selling, delivered through the CA console. Do not build a plan requiring Zoho not to widen (§04 [Verified]) |
| **Fintech-subsidised HRMS** zero-prices software to sell interchange | A neobank/card issuer acquires an HRMS (Jupiter/sumHR precedent) and zero-prices it | Precedent reportedly valued the software asset at ~₹7.5 Cr for 100% — cheap for an acquirer (Source: Jupiter/sumHR, figure reported from Jupiter's FY23 filings; **low confidence**, the primary articles were not reachable — r2/02; **[Hypothesis]** as to the amount, the acquisition itself is not in doubt). Defend on **attended submission + switching cost**, not price. We do not fight an interchange subsidy on price (Zaggle economics, §11) |
| **Frappe v16 bake-off** | A prospect runs the comparison | Concede gross-to-net — Frappe's salary structure is genuinely strong and **the bake-off will not be won on gross-to-net** (EV-031). Run it on the statutory outputs — ECR, ESI, the state PT slab table, LWF, Form 138 — which Frappe v16's source does not contain (EV-031; repository read Sep 2026, not executed), plus maintained updates, attended submission and a support SLA. Never claim a generic "more complete India compliance" (§20 R-7), and never say Frappe's published material is wrong (§21). **[Reversed]** the earlier trigger "finds parity" assumed Frappe shipped the state layer (K-01) |

Two further defences from §12/§06 that belong here:

- **Enterprise assistant convergence on Copilot/Glean** — if buyers ask for MCP access rather than our assistant, the AI differentiation collapses to data quality (§12 [Verified]). Response: own the data and the tools the assistant calls, never claim the assistant as the moat; this does not touch pricing but does mean we never price the assistant.
- **Uneven state-rule notification** under the four Codes — multi-state customers hit conflicting state/central positions. Response: effective-dated rules *per state* from v1 (§06). This is a *pricing asset*, not just a risk: the harder multi-state maintenance is, the more the §18.3 multi-state value holds.

The through-line: **every defence is "move up-market or lean on the SLA," never "match the price."** We cannot win a price war against free incumbents with more capital (§04). We can win a guarantee war, because the guarantee is the one thing that costs money to provide and therefore cannot be given away by someone whose revenue is elsewhere.

#### Competitive battle cards (objection → response)

The sales-facing form of the defences above. Each pairs the prospect's most likely objection with the move that keeps the conversation on submission/SLA, never on sticker price. All competitor facts are **[Verified]** from §04/§18.1 and carry their capture date; every card clears the competitor-claim rule (§21) before use; the responses are the standing GTM position.

| If the prospect says… | …the move is | Never say |
| --- | --- | --- |
| "Kredily is free forever." | Agree — and show the paywall boundary: bank payout files, PF/ESI challans, Form 12BB/124 and Form 16/130 are paid (EV-029), and they are artefacts for the customer to submit — we carry the filing to portal acceptance in an attended session with you, and by our operator under your written authority where that route is cleared (K-13, §18.3). Anchor on the crossing-20 moment when free calculation stops being enough. | "Kredily is worse" (it computes PF/ESI/PT/TDS fine, §18.1) |
| "Zoho does all this for ~₹2,000." | Agree on calculation parity (it is table stakes, [Killed]). Move to the two columns Zoho lacks: *attended, assisted submission* and a *maintained-compliance SLA* (§18.12). Frame the 2.5–3× as the price of not carrying the filing work yourself — the statutory liability stays yours either way (K-13). | "We have features Zoho doesn't" — the ESS/declaration diff was killed; "we take on your liability" — it is non-delegable |
| "Frappe is free and open-source." | Concede gross-to-net (EV-031). Offer the bake-off on statutory outputs for the prospect's own states — ECR, ESI, the PT slab table, LWF, Form 138 — which Frappe v16's source does not contain (EV-031; repository read Sep 2026, not executed); then maintenance under contract and attended submission. **[Reversed]** the old card conceded "PT 15+, LWF 14" (K-01). | "Frappe's documentation is wrong"; a generic "we cover more India compliance" (§20 R-7, §21) |
| "Our CA already handles all this for ₹8,000." | Do not attack the CA. Position as arming them (§18.7) or as a fixed, predictable sub-bureau price that removes their variance. The CA is a channel and a price anchor, not a rival. | "You don't need your CA anymore" — this inverts the channel (§18.7) |
| "We already own Tally." | Agree — Tally ships the central statutory artefacts (EV-032). Position as the state PT slab table, LWF, leave, employee/mobile, CA-console and attended-submission layer Tally lacks (EV-032, §18.1); we attach to Tally, we do not replace it (§18.8). | "Switch off Tally" — kills the partner channel (§18.8) |
| "Keka starts at ₹90." | Agree — its small-companies page says "starts at ₹90 per employee/month" and "from ₹6,999 per month" (EV-023, captured 5 Sep 2026); its pricing page carries no live price (EV-021). At 20 employees that floor is ₹349.95 effective PEPM (EV-027). Re-anchor on no seat floor (P6), a published price, attended submission and the SLA. | "Keka renewals run below list" — its ToS clause 15 says renewal fees are "subject to an increase" (EV-025, K-17); the withdrawn ₹9,999 card as a current price (EV-022 is archived); "₹99" as a Keka price (§18.3) |

#### Discounting discipline (protecting a published price)

Publishing the card (P3) is worthless if field discounting quietly reintroduces a quote-wall. Rate-card governance is therefore part of the pricing architecture, not a sales-ops afterthought:

- **Self-serve = list, always.** The 20–49 lower half and any self-serve close pays list off the card. No discount codes at the bottom — a discount there just burns the funnel margin the land-and-expand model (§18.10) is already stretching.
- **Discount authority is bounded and logged.** Light-touch/AE deals in the 50–199 core may discount only within a pre-set band (e.g. up to the annual-prepay equivalent), with anything deeper escalated and logged — the same "logged escalation" discipline §13 demands of the model router, applied to price.
- **Trade discount for term or commitment, never for nothing.** A deeper discount buys annual prepay, a multi-year term, or a case-study/reference — it never simply lowers ARPU. This keeps realised ARPU (the §20 V-03 number) close to list so the target stays meaningful.
- **Kill/validate:** if realised discount consistently exceeds the annual-prepay band across the 50–199 core, the published list is fictional and either the card is re-priced downward or the discount authority is revoked. Track realised-vs-list as a first-class metric feeding §20 V-03.

---

### 18.12 Competitor list-price comparison at a common point

**[Verified]** as *list price*, **not** as realised price. Figures are the vendors' own published cards — pricing pages, raw HTML and pricing config files — captured 5 Sep 2026 (EV-021–EV-027) and normalised to **50 employees, ex-GST, monthly, entry tier**; the 20-employee column shows the seat-floor effect (EV-026). Realised ARPU is unmeasured for all of them (§20 V-03). This is the table the published price card (P3) is implicitly compared against by every prospect, so we state it explicitly — and no row leaves the building without a fresh capture and §21 clearance. **[Reversed]** Earlier drafts marked the mid-market rows incomplete behind a TLS block and showed greytHR and Keka as quote-only; the block was one fetch tool's failure and the cards are captured (EV-009).

| Vendor | ~50-emp monthly list (ex-GST) | Implied PEPM at 50 | Effective PEPM at 20 | Claims to submit filings? | Maintained-compliance SLA? | Price published? |
| --- | --- | --- | --- | --- | --- | --- |
| **Kredily** | ₹0 (free forever) | ₹0 | ₹0 | No — outputs paywalled (EV-029) | No | Yes |
| **Zoho Payroll** | ~₹2,000 (Standard, annual billing: ₹1,000 incl. 25 + 25 × ₹40) | ~₹40 | ₹50 (₹1,000 block incl. 25) | No (generates; customer files) | No | Yes |
| **Frappe HR (cloud)** | from ₹410 + scale | low | low | No — no Indian statutory return in v16 (EV-031) | No (open-source, no contract) | Yes |
| **TallyPrime** | ₹0 incremental (perpetual licence sunk) | ₹0 | ₹0 | No — generates artefacts (EV-032) | No (updates shipped, not per-tenant SLA) | Licence yes; module free |
| **Qandle (MYND)** | ₹2,450 annual / ₹2,950 monthly (block incl. 50) | ₹49.00 / ₹59.00 | ₹122.50 (annual) | No — an unpriced "Compliance Assistance" add-on; MYND's outsourced filing is demo-sold (EV-030, EV-034) | Not assessed | Yes |
| **greytHR** | ₹2,495 (Essential, incl. 50) | ₹49.90 | ₹124.75 | No — generation language only (EV-030) | Not assessed | Yes |
| **Pocket HRMS** | ₹2,995 (annual, incl. 50) | ₹59.90 | ₹149.75 | No (EV-030) | Not assessed | Yes |
| **Zimyo** | ₹4,000 (minimum billing 50) | ₹80.00 | ₹200.00 | No (EV-030) | Not assessed | Yes |
| **HROne** | ₹4,950 (block for 50) | ₹99.00 | ₹247.50 | No (EV-030) | Not assessed | Yes |
| **Keka** | ₹6,999 live floor / ₹9,999 archived card | ₹139.98 / ₹199.98 | ₹349.95 | No — "pre-built" statutory reports (EV-030) | Not assessed | No live price on its pricing page (EV-021); floor on its small-companies page (EV-023) |
| **PeopleStrong** | enterprise quote (realised PEPM ≈ ₹126, EV-006) | ~₹126 realised | — | Not assessed (enterprise; outside the six-vendor set) | Not assessed | No (quote-wall) |
| **Us — "File" tier [Hypothesis]** | ~₹5,500 (₹110 PEPM target) | ₹80–150 | ₹80–150 — actual headcount, no seat floor (P6) | **Portal-accepted artefacts + attended, assisted submission (K-13, §22)** | **Yes — the product** | **Yes** |

(Sources: Kredily, Zoho, Frappe and Tally pricing pages read in rounds two and three, 2026 — r2/01, r3/01, r3/03; Qandle, greytHR, Pocket HRMS, Zimyo, HROne and Keka captured 5 Sep 2026 — EV-021–EV-027, r5/03, 20-employee arithmetic on the verified block prices; PeopleStrong realised PEPM derived from filed financials ÷ claimed platform scale, EV-006 — [Verified] inputs / [Hypothesis] derivation. "Claims to submit" reflects published pricing, payroll and feature pages, not product documentation or a live tenant — absence of a claim is not proof of absent capability, EV-030.)

Reading the table honestly: at ₹110 we sit **inside the ₹80–200 clearing band** — above the ~₹50 value floor (Qandle, greytHR), above Zimyo and HROne, below Keka's live floor — and 2.5–3× Zoho's list. We are not aware, as of September 2026, of another option that both carries filings to portal acceptance under contract and publishes a per-head price with no seat floor. The two rightmost columns are the entire justification for the price. If a prospect values neither attended submission nor a maintained-compliance SLA, the comparison collapses to sticker price and we lose to the value floor — which is precisely the risk §20 must measure (V-07 instrument, V-16). The realised points — greytHR ~₹52 and PeopleStrong ~₹126 (EV-006) — sit on the floor and inside the band; the target is not aggressive relative to the clearing band, only relative to the *free* floor.

Scale-realism check (§05): greytHR currently claims "30,000+ companies" (EV-091, captured Sep 2026; earlier captures said 34,000) — about 3.9% of the 7,66,254 contributing establishments (EV-016, EV-001; 4.4% on the older 34,000 figure). That is what leadership looks like here, and it is a ceiling on any share assumption baked into a revenue model built on this section's pricing. The figure must travel with its capture date (K-16).

---

### 18.13 Billing and payment mechanics (India-specific)

Pricing shape is incomplete without the invoicing reality of selling SaaS to Indian SMBs. These are product-and-finance requirements, not marketing choices.

| Mechanic | Requirement | Basis |
| --- | --- | --- |
| **GST rate + invoice** | GST at the rate held in `gst_rate_saas` (18% as vendors disclose it today); show GST-inclusive and exclusive on the card (P3); issue GST-compliant tax invoices with our GSTIN and the customer's GSTIN; capture the GSTIN at self-serve checkout | **[Verified — vendor disclosures]** Indian HRMS list prices are ex-GST with 18% added on top, and disclosure is uneven — three vendors say so on the page, the rest do not (r1/08, captured 4 Sep 2026). The rate itself is to be confirmed against the current CBIC rate notification before build (§20) |
| **GST place of supply / CGST-SGST vs IGST** | Bill IGST for inter-state B2B customers and CGST+SGST for intra-state, resolving place of supply from the registered recipient's GSTIN state; the tax split is a rule-table entry, not code | **[Hypothesis]** — the IGST Act's place-of-supply rules for services; the provision is not in our evidence and is read from the bare Act before build (§20). A pan-India SaaS biller must get this right or every out-of-state invoice is defective |
| **e-invoicing (IRN/QR)** | Issue B2B invoices with IRN + signed QR once *our own* aggregate turnover crosses the e-invoicing threshold (`einvoice_turnover_threshold`) — designed on the reading that applicability turns on the supplier's turnover, not the customer's, which the same notification read confirms before build; report each invoice to the IRP within the reporting window (`einvoice_reporting_window_days`) that applies to our turnover band | **[Hypothesis]** Both parameters are read from the current CBIC/GSTN notifications before build (§20). The ₹5 Cr threshold and 30-day window carried in earlier drafts have no source in our evidence and are not shipped as defaults |
| **TDS on our invoices** | Business customers deduct TDS when paying us; the billing system must treat short-payment-by-TDS as normal, not as a dispute, and reconcile credits against the TDS credit statement (Form 168, ex-26AS — r5/02) | **[Hypothesis]** The deducting provision, rate and annual threshold under the Income-tax Act 2025 are not in our evidence — EV-050 maps only ss.192, 194P, 197 and 200(3) — and are held as `inbound_tds_rate` and `inbound_tds_threshold`, read from the 2025 Act and Rules 2026 before build (§20); the 1961-Act section, rate and threshold carried in earlier drafts are not shipped as defaults. Both vocabularies are accepted in the billing UI (EV-050). Ironic and useful: a filing product must itself handle inbound TDS cleanly |
| **Autopay / collections** | e-NACH / UPI-Autopay mandate for monthly plans (Razorpay/Cashfree); UPI one-time for annual prepay; card recurring payments run under RBI's e-mandate regime — pre-debit notification, additional-factor authentication and a per-transaction exemption ceiling (`card_emandate_afa_exempt_ceiling`) — so mandate-based rails are primary and a failed card debit is a dunning event, not a churn event | **[Hypothesis]** The RBI e-mandate framework's notification period and exemption ceiling are not in our evidence and are read from the current RBI directions before build (§20); the figures carried in earlier drafts are not shipped as defaults. That mandate rails are more durable than card autopay for SaaS is a design judgement to be tested against our own collection data (§19) |
| **Annual prepay discount** | Offer an annual-prepay discount, `annual_prepay_discount_pct`, applied to the PEPM and to the multi-registration line alike, to pull cash forward and cut monthly churn | **[Verified]** market reference: Zoho Payroll applies exactly 20% to both base and overage across all three paid tiers (r3/03); Qandle's annual card implies 16.9–20.2% against monthly (r5/03). **[Hypothesis]** our level — earlier drafts' "~2 months free, ≈16%" sits at the bottom of that range; set in §20 and validate realised uptake in V-03 (H-P12) |
| **Setup / onboarding fee** | Default **₹0 setup**, stated on the card — migration is acquisition infrastructure (§18.9), not a revenue line; charging setup re-introduces the friction we are removing. Reserve paid onboarding for Scale/Enterprise only; where a partner implements, the fee line is assignable to the partner (§18.18) | **[Verified]** market context: setup fees are an admitted but unquantified norm — Keka's pricing FAQ says a nominal setup fee applies while its small-companies page says none (EV-025); Pocket HRMS cites an unquantified implementation fee and HROne none except possible enterprise implementation (r5/03); Zoho People publishes a one-time onboarding fee (r1/08). **[Hypothesis]** our ₹0 default — kill if free migration proves unsustainable at lower-half ACV (H-P7) |
| **Proration & the cliff (P2)** | Mid-month headcount changes prorate continuously; no step-change on the marginal hire — the explicit anti-pattern to Zoho's ₹0→₹1,000 cliff | **[Verified]** the cliffs are the attack surface (§04) |
| **SEZ / export / RCM edges** | Handle zero-rated supply to SEZ units under a letter of undertaking, and reverse-charge scenarios; a growing beachhead will include SEZ tenants | **[Hypothesis]** — zero-rating of supply to SEZ units under the IGST Act; the provision and the LUT conditions are not in our evidence and are read from the bare Act and current notifications before build (§20). An edge, but a real one in the 200+ band |

The strategic point buried in this table: **[Hypothesis]** **the beachhead buyer's dominant billing complaint about the bureau is variance** (to be tested in the §20 V-01 mystery-shop and the V-16 buyer interviews) — a different invoice every month as filings and headcount move. Our billing must therefore be *predictable to the rupee*: published PEPM × current headcount + any multi-registration line + fixed add-ons, prorated smoothly, on a mandate. Predictability is part of the product, not just the finance stack.

Acceptance criterion (billing correctness): (1) every invoice states GST-exclusive base, correct CGST+SGST *or* IGST split resolved from the customer's GSTIN state, and GST-inclusive total; (2) a customer who deducts TDS on our invoice and short-pays by exactly that amount is reconciled automatically against the TDS credit statement and never flagged as delinquent; (3) a mid-month hire or exit produces a prorated line the customer can reconcile to the day, with no step-jump; (4) once our turnover brings us under the e-invoicing mandate, every B2B invoice carries a valid IRN and QR within the applicable reporting window.

---

### 18.14 Unit-economics frame (structure only — no validated numbers)

Every number here is **[Hypothesis]** and exists to show the *shape* of the model the §20 programme must fill in. None may enter a deck.

**Illustrative File-tier account (50 employees, single registration set, ₹110 PEPM target):**

- Gross revenue: 50 × ₹110 × 12 = **₹66,000/yr** ex-GST.
- **COGS is a four-line stack, and inference is the smallest line** (EV-088; §13):
  1. *Inference* — per employee/query. ₹0.15–3.27 PEPM are placeholders pending prototype instrumentation (EV-008, §20 V-04); only the 52.7× model-choice spread is load-bearing, because it is FX-invariant (EV-007, EV-089). FX is modelled at ₹94.43/USD (not the banned ₹83.3) and Gemini 3.x Flash at 2× from 1 Jan 2027 as the *base* case, not the downside (EV-089).
  2. *WhatsApp* — per message since 1 Jul 2025; employee-initiated conversations are free inside the 24-hour window; the WABA must migrate to INR billing by 31 Dec 2026 or delivery stops on 1 Jan 2027 (EV-088).
  3. *Supervised filing* — per registration × state × filing type; **the dominant line, unsized** (EV-088; sized in §22 against `max_supervised_minutes_per_filing_cycle`, §13, from the §20 V-26 time-and-motion capture).
  4. *Compliance curation* — per state maintained; unsized (EV-088; §22).
- **[Reversed]** Earlier drafts stated a 93–99% gross margin on inference and read it as proof that bundling AI never threatens margin — a margin on one input, withdrawn (K-02). No gross-margin figure is stated in this section until lines 3 and 4 are sized.
- **[Reversed]** Earlier drafts called statutory maintenance and filing execution a *fixed* team cost amortised across tenants, so that gross margin improves with scale. Curation is per state maintained, but supervised filing scales per registration × state × filing type (EV-088) — a per-tenant marginal cost that the registration allowance and multi-registration line (§18.3) exist to recover. The contractual remedy (§18.3) is a *provisioned* cost — accrue against it per the tiered cap, do not treat it as zero.

**CAC / payback (structure):**

- Lower half (20–49): self-serve, product-led → target CAC low, but ACV also low (~₹24,000–60,000/yr, §05.1); payback only works via land-and-expand into 50+ (H-P8). At list PEPM the lower half may be net-negative standalone (§05) — acquired as funnel, not revenue.
- Revenue core (50–199): self-serve or light-touch/CA-referred → CAC must be recovered inside 12–18 months on ACV alone, *before* counting expansion. If CA-referred deals carry a referral share (§18.7), that share is CAC, not COGS, and is capped so blended payback holds.

**LTV (structure):** driven by (a) low logo churn once filing-critical (switching cost is high mid-year, §18.9 — the same friction that is our acquisition objection is our retention moat once we are the incumbent), (b) headcount-driven expansion (structural, §18.10), (c) add-on attach. **Kill:** the entire frame is invalid until V-01 (bureau price), V-03 (realised ARPU), the supervised-filing sizing (§22) and the cohort metrics (H-P8, H-P9) report. **Do not compute an LTV:CAC ratio from these placeholders** — a ratio built on placeholder numerator and denominator invents precision the evidence forbids (§02 standing rule).

---

### 18.15 GTM funnel (hypothesised, for instrumentation not forecasting)

The funnel below is **[Hypothesis]** — its purpose is to name the stages we instrument (§19 metrics), not to forecast revenue. Conversion rates are placeholders to be replaced by real cohort data, and there is nothing external to borrow: **[Verified]** no vendor, marketplace or third party publishes CAC, CAC payback, sales-cycle length, win rate, demo-to-close ratio, marketplace CPL/CPC for the category, free-to-paid conversion or partner-sourced revenue share for this market (r3/03, confirmed on a second sweep). Every such number will come from our own instrumented funnel, segmented by acquisition source and by partner (§18.18, §19).

| Stage | Definition | Instrumented event | Placeholder benchmark [Hypothesis] |
| --- | --- | --- | --- |
| **Reach** | Statutory-intent search / cliff-triggered / importer landing | Page/tool visit | — |
| **Signup (Free)** | Tenant created | Account created | — |
| **Activation** | First real *calculation* run on real employees | Payroll computed | activation is the leading indicator, not signup |
| **Statutory conversion** | Crossing 20 → File tier | First portal-accepted filing under SLA (attended, §22; ACCEPTED or FILED in FR-PAY-711) | the core conversion; coincides with EPF turning on |
| **Expansion** | Headcount growth / band graduation / add-on attach | NRR events | target NRR > 100% (H-P9) |
| **Advocacy / channel** | CA refers additional clients | CA-invited tenant activated | validates §18.7 economics |

The funnel makes one point unmissable: **the money is made at the Free→File statutory conversion, and that conversion is a headcount event we do not control the timing of — the customer hires their 20th employee on their own schedule.** GTM's job is therefore less "convert now" and more "be the obvious, already-installed choice at the moment the cliff arrives." That is why Free is generous (P1) and why the importers are landing pages (§18.9): we want to already be the system of record when EPF turns on. Kill for the whole funnel logic: if §20 V-01/V-03 show the beachhead will not pay a premium at the conversion moment, the funnel still fills but never monetises, and the thesis narrows to bureau displacement only.

<!-- DIAGRAM: gtm-funnel -->

---

### 18.16 Consolidated pricing hypotheses and kill criteria

Every commercial claim in this section is a hypothesis. This table is the single place a reader checks what must be validated before any number ships, and maps each to the §20 programme.

| # | Hypothesis | Kill / validation criterion | §20 gate |
| --- | --- | --- | --- |
| H-P1 | Bureau/CA charges ₹3,000–15,000/mo, so a fixed sub-bureau price is compelling | If real 50-emp bureau price < ₹2,000/mo, the ₹80–150 target loses its bureau justification and re-anchors toward the ~₹50 value floor (EV-006, EV-027) | V-01 |
| H-P2 | Our list target of ₹80–150 PEPM holds inside the ₹80–200 clearing band (EV-006) | If realised ARPU is 30–40% below list, re-base toward the value floor and re-run the four-line COGS stack (EV-088) | V-03 |
| H-P3 | Buyers pay a 2.5–3× premium over Zoho for attended submission + SLA | If WTP over Zoho ≈ 0, narrow thesis to displacing the bureau only | V-07 instrument (to be extended to the SLA premium), V-16 |
| H-P4 | Metered AI SKUs (bulk docs, analyst copilot) monetise | If HR-AI WTP is zero everywhere, drop the metered AI SKUs; keep AI as COGS | V-07 |
| H-P5 | CA console is a channel, not a disintermediation threat | If ≥40% of interviewed CAs read the product as disintermediation — the kill line §01 and §20 V-05 both carry — reposition as agency tool or abandon the channel. V-05 sets no pass threshold; what counts as a *pass* is a further decision routed to §20 with D-P3, because "not hostile" is not the same as "will sell" | V-05 |
| H-P6 | Tally partners are a distribution channel | Depends on V-02: at ~5% Tally-payroll enablement, channel is a footnote | V-02 |
| H-P7 | Migration is self-serve within one pay cycle | If median assisted migration > one cycle, migration cost re-enters CAC | V-15; (build metric) |
| H-P8 | 20–49 lands convert upward (land-and-expand) | If < 25% of 20–49 lands cross into 50+ within 12 mo, raise floor to 50 | (cohort, mo 18) |
| H-P9 | NRR > 100% via headcount + band + add-on expansion | If NRR < 95% at 12 mo, re-run CAC at flat-account economics | (cohort) |
| H-P10 | Location/GPS add-on attaches (greytHR ₹140 on Growth/Premium, 1.6× its ₹85 Growth seat; Kredily ₹50 — r2/04, r5/03) | Kill if attach < 10% of deskless-eligible tenants | (attach metric) |
| H-P11 | The contractual remedy (penalty-exposure backstop) can be capped and still credible | If buyers require an uncapped guarantee to value it, SLA-premium thesis weakens; allocation and insurability also need counsel (Part D-17, §23) | V-07 instrument (to be extended), V-16 |
| H-P12 | An annual-prepay discount (`annual_prepay_discount_pct`; market reference 16.9–20%, r3/03, r5/03) pulls cash forward without eroding ARPU | If prepay uptake < 20% or discount cannibalises monthly ARPU, drop the term discount | V-03 |
| H-P13 | A registration allowance plus a multi-registration line recovers supervised-filing cost without breaking the per-head card (EV-088) | Kill if the allowance that covers a single-registration tenant's supervised minutes pushes list above the ₹80–200 band, or if multi-registration buyers reject the line | §20 V-26 (parameters `included_registrations_per_tenant`, `multi_registration_line_price`; sized from §22) |
| H-P14 | The 20–50 band is won on no seat floor (P6) plus quality of delivery (EV-026) | If realised win-rate against Zoho in 20–50 is below one-in-four across the first 40 contested deals, the band is not winnable and v1 re-anchors on 50–200 | (deal metric; §01) |
| H-P15 | The File tier holds its price with employer-attended and co-attended submission (§22 Modes A, B) while operator-attended submission (Mode C) is fenced on counsel (Part D-17) | If buyers value the File tier only with Mode C, or counsel returns "no" for the EPFO or TRACES route, re-test the price against the Mode A/B scope and cut the SLA to artefact correctness, currency and causation (§18.3) | V-07 instrument (extended), V-16; V-25 and the §23 counsel register |
| H-P16 | A bank alliance is a distribution channel for us, not merely a salary-payout integration (§18.18) | If bank conversations run alongside the V-05 field window produce no offer of placement inside a bank's SME channel on terms that clear blended CAC payback, keep bank work to payout-file adapters (§16) and carry no bank-channel revenue | (channel test; §20 addition) |
| H-P17 | Paid marketplace placement converts at our ACV (§18.18) | If a committed package's cost per closed-won deal exceeds the CAC ceiling set for its band after one package term, do not renew; commit to G2-owned sites only in short increments until its pay-per-lead pricing is published | (attribution metric; §19) |
| H-P18 | A single flat PEPM across the whole 20–199 band is the right shape | The crossover arithmetic in §18.24 shows that at ₹110 we are dearer per head than every block vendor above its block size — at 200 employees greytHR Essential implies ₹46.23, Qandle FOUNDATION annual ₹49.00, Pocket HRMS ₹59.98, Zimyo Basic ₹80.00, HROne Basic ₹99.00 and even Keka's archived card ₹95.00, against our ₹110 (arithmetic on EV-022, EV-027 and r5/03 block prices). Kill the flat shape if win-rate in 100–199 at a flat card falls below the band's CAC-payback threshold; replace with a declining marginal rate inside the File band, which P2's acceptance criterion already permits | V-03, V-07 instrument; (deal metric by headcount decile) |
| H-P19 | The File tier is evaluated by a **parallel run**, not by a time-boxed trial (§18.25) | No vendor in the priced set offers a free tier and trials run 7 days (greytHR) to 14 days (Zimyo), with HROne and Pocket HRMS publishing no duration and Keka's "Free Trial" CTAs landing on a demo-request form (r5/03). If evaluators cannot complete a parallel run — prior month re-run, line-by-line diff — inside their own patience window, add a time-boxed trial and re-test the motion | V-16; (evaluation-completion metric, §19) |
| H-P20 | Buyers can self-assess their own registration count, so the registration allowance keeps the card self-serve (§18.3) | If buyers in the V-07/V-16 instrument cannot state how many PF codes, ESI codes, PTRCs, PTECs and TANs they hold, the count must be derived by us at quote time from the establishment set and the card loses its self-serve property below 50 employees | V-07 instrument (extended), V-16; §20 V-26 |
| H-P21 | Dunning to read-only, never to deletion or artefact withholding, preserves recovery without using statutory records as a collections lever (§18.21) | If recovery from READ_ONLY runs below the rate that justifies carrying the cost, or if tenants report that the state prevented them discharging their own five-year retention duty (EV-054), revisit the window lengths — never the artefact-availability rule, which is a standing product rule | (recovery metric, §19); contract language to §23 |

**Standing rule (restated):** no PEPM, ACV, CAC or LTV figure enters a financial model, deck or contract until V-01 and V-03 report. Every rupee in §18.3–§18.5 is a placeholder anchoring a *shape* the evidence supports, not a *level* the evidence supports (§04 [Verified]).

---

### 18.17 What this section deliberately does not do

Recorded so it is not resurrected in a later deck (§20.1):

- **No premium AI SKU.** Seven vendors price HR AI at zero; a surcharge reads as a surcharge on an expected feature ([Killed], §12).
- **No free-HRMS-monetised-on-interchange.** 9–10% margins against a listed incumbent (Zaggle) with 19 bank partners and 50mn cards, using our own balance sheet for float ([No], §11). Software PEPM and any future attach revenue are modelled as **two separate lines that are never blended** (§11 [Verified]).
- **No hardware resale** — ₹4,000–25,000 one-time devices, no margin, direct channel conflict with the dealer/eSSL networks (§09 [No]).
- **No self-hosting as a cost play** — serverless beats dedicated H100 ~74× at real utilisation; self-host is a priced compliance SKU for named regulated accounts only (§13 [No]).
- **No paid-only product below 10 employees** — Kredily is free forever with real statutory calculation (§05 [No]).
- **No revenue modelled from the CA channel, the Tally-partner channel, or the MCP server** until §20 V-02/V-05 report — all three carry zero validating evidence today (§20). The same holds for bank alliances and paid marketplaces until H-P16 and H-P17 report (§18.18).
- **No enterprise revenue in v1** — documentary gate, ~3 years (§05).
- **No comparative price claim** on the published card without a dated capture, a re-capture before use, and clearance under the competitor-claim rule (§21). The mid-market prices are now captured (EV-021–EV-027), which makes a comparison *possible*, not automatically safe. ZingHR and Ramco publish no price and are enterprise adjacency, outside the set (EV-033).
- **No seat floor, ever** — no minimum billing block on the File tier (P6); a block would re-create the overcharge the six priced competitors impose on the 20–50 band (EV-026).
- **No transfer of statutory liability** — the employer's and deductor's liability is non-delegable; we sell attended submission and a capped contractual remedy (K-13, §22, §23).
- **No banned figures.** ₹37,500 ICAI CA fee (pre-GST, 9+ yrs stale, a pricing recommendation once rested on it), ₹161 PEPM Zaggle attach (contaminated denominator), ₹83.3/USD (13.4% wrong — use ₹94.43), "Frappe ships PT across 15+ states and LWF across 14" (false on source — EV-031, K-01), a 93–99% gross margin (a margin on one COGS line — K-02), greytHR "34,000 customers" as an undated fixed figure (K-16), "Keka renewals below list" (EV-025, K-17) and "₹99" as a Keka price (no Keka capture contains it) — all on or routed to the §20.4 banned list and absent from every number above. **[Reversed]** Keka's price itself is no longer banned: it is obtained from Keka's own pages (EV-021–EV-025, K-10).

---

### 18.18 Channel map — who carries the product to the 20–200 employer

§18.6 sets the motion by band and §18.7–§18.8 treat the two load-bearing channels in depth. This subsection is the whole map: every route to the buyer the evidence names, what is known about each, what we must build to use it, and the gate that must report before any revenue depends on it. The evidence splits cleanly (r3/03): **channel *structure* is trustworthy** — partner archetypes, programme tracks, marketplace package costs and the freemium paywall were re-verified at vendor-primary sources — while **channel *economics* are largely unknown**, because no vendor, marketplace or third party publishes CAC, win rates, CPL or partner-sourced revenue share for this market. Every economic cell below is therefore either a dated competitor reference or a named parameter routed to §20.

<!-- DIAGRAM: pricing-gtm-channel-map -->

| Channel | What the evidence shows (read in research round three, 2026; programmes not joined or executed) | Our role in it | Economics known? | What must exist before it can carry a deal | Gate before revenue |
| --- | --- | --- | --- | --- | --- |
| **Direct — published card, self-serve** | Among vendors checked, only Zoho Payroll completes a purchase online; greytHR, Keka and Kredily route pricing-page calls to action to trial, free plan or sales, so freemium here is lead generation, not a self-serve revenue channel (r3/03, medium) | Primary motion for 20–49; the destination of every marketplace lead | Our own funnel only | Checkout with GSTIN capture and a compliant invoice (§18.13); in-product upgrade from Free without sales contact; funnel events live (§19) | V-01 and V-03, as for every PEPM figure (§18.16) |
| **CAs and tax consultants** | Kredily runs a CA Program on a multi-company dashboard; factoHR lists "CA/Tax Consultant" among six partner classes; Zimyo recruits tax consultants and financial advisors (r3/03) | Referral, or agency/reseller (§18.7) | Unpublished for HRMS CA programmes | CA console (§18.7; §15.3.6), Mode D sessions (§22), co-branding to the practice, the offline-referral claim path below | V-05 (H-P5) |
| **Payroll service providers / bureaus** | Kredily separates a white-label Partner Program for PSPs from its CA Program; greytHR's PSP page is a demo-capture page, not a programme (r3/03) | White-label operator running payroll on our platform for its clients | Unpublished | Tenant-level white-label — logo, domain, sender identity, payslip and ESS branding (r3/03) | V-05 extension. **[Hypothesis]** white-labelling hides our brand at the Free→File moment, so it is offered only on agency economics; the decision is routed to §20 |
| **Tally partners** | Four grades (3-Star and 5-Star Certified, Associate, GVLA) plus a CA Community; the public locator listed 1,257 partners on two fetches — a directory count, not an audited network size; no margins published (r3/03) | The payroll-and-filing layer attached to the partner's accounting sale (§18.8) | Unpublished | TallyPrime-importable payroll journal with per-client ledger mapping; the Tally importer (§18.9) | V-02 (H-P6) |
| **Bank alliances** | greytHR's Alliance Partner track is overwhelmingly banks and payment networks — ICICI Bank, HSBC, IDFC First Bank, AU Small Finance Bank, Bank of Baroda, Kotak Mahindra Bank, Visa, Mastercard — re-fetched from its page-data payload; whether these are distribution relationships or payout integrations is not knowable from the public site. Freemium competitors bind payouts to one bank: Kredily's paid tier to ICICI Bank and NEFT, Zoho Payroll's free tier to HSBC (r3/03) | Placement inside a bank's SME channel, with our payout files bank-neutral | Unknown | Bank-agnostic payout-file abstraction with per-bank adapters as versioned artefacts (§16), co-brandable embedded onboarding, per-bank tenant provisioning (r3/03) | H-P16 |
| **Review marketplaces** | G2 acquired Capterra, GetApp and Software Advice from Gartner; the deal closed 5 February 2026, so the global review channel is **one counterparty**, and G2 has signalled a pay-per-lead product off the combined dataset; none publishes vendor pricing and vendor pages block automated access (r3/03) | Lead source into Direct | Unknown; terms in flux | Lead ingestion by email parse and webhook, de-duplication, an immutable source stamp, cost attribution (below) | H-P17 — commit in short increments until G2's pricing surfaces |
| **Indian marketplaces** | SoftwareSuggest publishes an INR vendor rate card — Basic ₹3,00,000 for 6 months, Gold ₹6,50,000 for 6 months, Platinum ₹10,00,000 for 12 months — with PPC and lead credits drawn down inside a prepaid term and CPC/CPL set only at signup; its paid tiers carry influence over ranking artefacts (Leader Matrix consultation is Platinum-only). Techjockey runs free listing, paid inventory and its own checkout — part marketplace, part reseller — and publishes no rate card (r3/03) | Lead source; Techjockey also a transaction channel | Package cost known; unit cost knowable only after the term | Same ingestion and attribution | H-P17 |
| **Device dealers** | factoHR recruits "IT Hardware/Biometric Reseller" partners (r3/03); eSSL markets six named HRMS integrations (§09) | Referral from inside the customer's premises | Unpublished | Self-service device registration and a certified-device list (§09, §16); we never resell hardware (§18.17) | None modelled |

Three consequences for collateral and contracts. A ranking artefact a vendor can buy influence over is not independent evidence, so no marketplace "leader" badge is cited as proof of anything in our material or against a competitor (§21). Because the review channel is now one counterparty, a plan that assumes four independent review sites is obsolete (r3/03). And a bank as a distribution partner is not a bank as a customer: if a bank or its group company becomes a tenant, RBI's outsourcing obligations are materiality-gated, entity by entity (EV-087, mirror-sourced — pull from the primary source before customer use), and whether the arrangement is material is a counsel question (Part D-14, §23). Whether a distribution agreement with a bank engages any of those obligations is the same kind of question, so every bank distribution agreement is reviewed by counsel before signature.

#### Worked arithmetic — what a marketplace package must return [Hypothesis]

The revenue figures are this section's placeholders (§18.14); the package prices are SoftwareSuggest's published card (r3/03).

| Package | Cost | Term | Accounts whose first-year revenue equals the cost, at the illustrative File account (50 × ₹110 × 12 = ₹66,000) | The same, at the lower half's ₹24,000–60,000 ACV (§05.1) |
| --- | --- | --- | --- | --- |
| Basic | ₹3,00,000 | 6 months | 3,00,000 ÷ 66,000 ≈ **4.5** | 5 to 12.5 |
| Gold | ₹6,50,000 | 6 months | 6,50,000 ÷ 66,000 ≈ **9.8** | 10.8 to 27.1 |
| Platinum | ₹10,00,000 | 12 months | 10,00,000 ÷ 66,000 ≈ **15.2** | 16.7 to 41.7 |

That is revenue, not contribution: it is before the four-line COGS stack (§18.14), before the assisted sale's own cost (§18.6) and ex-GST. The table does not say marketplaces fail; it says a package is bought only against a CAC ceiling set per band in §20 and is judged on cost per closed-won deal at the end of its term (H-P17). No marketplace spend is committed before the attribution in the acceptance criteria below is live.

#### Partner economics — parameters, with the only published market references

Referral shares and reseller discounts are CAC, never COGS (§18.7), and are capped so blended payback holds (§18.14). Only two vendors in this market publish commission figures; everything else is negotiated at enrolment (r3/03). None of the references below is a default: each parameter is set in §20 after V-05 reports.

| Parameter | What it controls | Market reference (r3/03) |
| --- | --- | --- |
| `partner_commission_pct` (per tier) | Share of collected subscription revenue paid to the partner | Zoho affiliate 15% / 18% / 20%, graduated by trailing revenue or count of new paid customers; Zimyo up to 20% (1–3 referrals a month) and up to 30% (3+), recurring |
| `partner_commission_term_months` | How long the share is paid | Zoho: first 12 months; Zimyo: recurring; Keka resellers: first 12 months of billing and on renewal, rate unpublished |
| `partner_commission_cap_per_transaction` | Ceiling on any single deal's commission | Zoho: $25,000 per transaction |
| `partner_deal_size_bonus` | One-time kicker at invoice-value thresholds | Zoho: an additional 5% at tiered invoice values |
| `referral_attribution_window_days` | Link-based attribution window | Zoho: 90-day cookie |
| `partner_stickiness_days` | Window after referral inside which a churned client claws the commission back | Zoho: 60-day stickiness period |
| `partner_tier_reevaluation_months` | How often tier status is recomputed | Zoho: 6 months |
| `deal_registration_window_days` | How long a partner's named prospect is protected from our direct team | None published |
| `referred_customer_credit` | Credit funded to the referred customer's account, redeemable against invoices | Zoho: $100 wallet credit at every affiliate tier |
| `partner_setup_fee_assignable` | Whether a partner-led implementation fee is the partner's revenue, not ours | Keka confirms a setup fee exists and what it buys; no vendor publishes the amount (EV-025, r3/03) |

Acceptance criteria (channel instrumentation — all must hold before the first rupee of channel spend or commission):

1. Every tenant carries an immutable acquisition source and, where one exists, a partner ID, set at creation; later touches are appended, never overwritten, so a deal is attributed exactly once.
2. A referral introduced offline — by phone or in person, which is how CAs and Tally partners introduce prospects — can be claimed by the partner and approved by us without a link; a link-only model silently fails the highest-value partner class (r3/03).
3. The commission ledger computes from revenue actually collected, ex-GST, under the parameter set in force on the invoice date; a clawback applies inside `partner_stickiness_days`; every payout statement reconciles to the ledger.
4. Cost per qualified lead and cost per closed-won deal are reported by source, with prepaid package costs amortised across the package term (r3/03).
5. Inbound demand from a registered partner's prospect routes to that partner for `deal_registration_window_days`, so the direct team never competes with the channel for the same deal.

#### Order of investment [Hypothesis]

Direct first, because it is the only channel whose economics we will observe from launch. The CA channel second, because it is the best-evidenced route to exactly our band, gated on V-05. The Tally channel third and importer-only until V-02 reports (§18.8). Bank alliances as a test of H-P16, built on the payout adapters we need anyway (§16). Marketplaces last and in short increments, because their unit cost is unknowable in advance and the largest counterparty's pricing is in flux. Device dealers are a referral courtesy, never a revenue line. The standing rule of §18.17 holds: no revenue is modelled from any channel but Direct until its gate reports.


---

### 18.19 The billable-headcount census — data definition, decision table and proration

P6 makes **actual headcount** the billing metric, which turns "what is a headcount" from an implementation detail into a contract term. Every competitor avoids this question by selling a block: greytHR, Qandle, HROne and Pocket HRMS bill 50 whether or not 50 people exist, Zimyo sets a minimum billing of 50 users, and Keka's archived card billed 100 (EV-026, r5/03). We have no block to hide behind, so the definition has to be written down, derived rather than typed, and reconcilable by the customer without a support ticket. This subsection is that definition. §18.22 carries the requirement IDs; the rating pipeline that consumes the census is §18.20.

One boundary first, because it is a real source of confusion: **the billing count is not a statutory count.** Statutes count "workers" or "employees" on different definitions, and the counting unit and sphere are schema fields on the threshold model, not prose (EV-057, §06.1, §14). The census below is our own commercial definition, and where it differs from a statutory count for the same tenant in the same month, both numbers are shown with their basis named. A tenant must never be told that a threshold fired because of a number that was computed for an invoice.

#### The census object

| Field | Type | Definition | Notes |
| --- | --- | --- | --- |
| `census_id` | identifier | One census per tenant per billing period | Immutable once closed |
| `tenant_id` | identifier | The billing tenant | The allowance is per tenant (§18.3) |
| `billing_period` | closed date range | Aligned to the subscription's billing cycle, not to the payroll month | The two differ for tenants on off-cycle billing; both are stored |
| `basis` | enum | `calendar_days` \| `period_fraction` \| `snapshot_date` | `billing_proration_basis`, §18.28; the default proposal is `calendar_days` |
| `lines[]` | list | One row per billable person-period | See the line object below |
| `person_count` | integer | Count of lines with `billable = true` | The number on the invoice |
| `prorated_units` | decimal | Σ of line `unit_fraction` | The number the rating engine multiplies |
| `registration_count` | integer | Registrations in force in the period, by type | Feeds the allowance and the line (§18.3) |
| `computed_at` | timestamp | When the census closed | Never re-computed for a closed period (P9) |
| `price_book_version_id` | identifier | The version resolved for this period | Stored on the invoice too |
| `census_hash` | digest | Digest over the ordered line set | The replay key (P9) |

The line object:

| Field | Definition |
| --- | --- |
| `person_id`, `legal_entity_id`, `assignment_id` | Identity of the person-period. A person with assignments in two legal entities of the same tenant produces two candidate lines and at most one billable line (see the decision table) |
| `assignment_days_in_period` | Calendar days the assignment was active inside the period, as a union over segments — a rehire in the same period contributes the union, never the sum of overlapping ranges |
| `billable` | Boolean, derived by the decision table below |
| `basis_reason` | The rule that made it billable or not — a closed enumeration, one value per decision-table row |
| `source_events[]` | The pay-run line, filing-instance line or assignment record that evidences the row. **A line with no source event cannot exist** |
| `unit_fraction` | `assignment_days_in_period ÷ days_in_period`, or `1.0` where a rule forces a full unit |

#### The decision table

<!-- DIAGRAM: pricing-gtm-billable-headcount-decision -->

The rule is one sentence and the table is its enumeration: **a person is billable in an entity for a period if they generated a payroll-affecting or filing-affecting event there, and otherwise only if they held an active assignment.**

| # | Person class / condition | Billable? | Unit | Reason |
| --- | --- | --- | --- | --- |
| B-01 | Employee with an active assignment for the whole period, in a pay run | Yes | 1.0 | The base case |
| B-02 | Joiner part-way through the period | Yes | Prorated on assignment days | The ramp is continuous (P2); a hire never produces a step |
| B-03 | Leaver part-way through the period | Yes | Prorated on assignment days | Full-and-final work continues after the last working day; the line still exists |
| B-04 | Rehire inside the same period | Yes, once | Prorated on the **union** of segments | Two segments, one person; summing overlapping ranges would over-bill |
| B-05 | Employee on loss of pay for the entire period, zero net pay | Yes | 1.0 | The person is still in scope of the month's return and its NCP Days field (EV-035), still consumes validation and still counts in the month's chronological obligation (EV-038). Zero pay is not zero work |
| B-06 | Employee suspended, or serving notice with no duties | Yes | 1.0 | Same reason as B-05; the statutory record continues |
| B-07 | Employee on statutory leave of any kind | Yes | 1.0 | Leave is an employment state, not an absence of one |
| B-08 | Person with assignments in **two legal entities of the same tenant**, both active | Yes, once | Prorated in the entity that carries the assignment of record; the second entity's line is `billable = false` with reason `counted_in_sibling_entity` | Billing the same human twice inside one tenant is the exact overcharge P6 exists to remove |
| B-09 | Person appearing only in a statutory artefact or filing instance for the period — for example an exited employee whose arrears were filed | Yes | 1.0 | A filed person is a billed person. This is the anti-gaming rule: the filing ledger, not the employee list, is the floor |
| B-10 | Employee record archived, deleted or de-linked **after** a pay run or filing instance in the period | Yes | Unchanged | The census derives from the ledgers, which are append-only. Deletion after the fact does not reduce the count (P9, §14) |
| B-11 | Contractor or consultant on the contractor register, not on payroll and not in any statutory artefact | No | — | Reason `not_on_payroll`. If they enter a statutory artefact, B-09 applies |
| B-12 | Apprentice, intern or trainee paid a stipend **through payroll** | Yes | Per days | The payroll and filing work is identical; the statutory treatment is §06's problem, not the invoice's |
| B-13 | Person present only in attendance — a visitor, a security guard on a contractor's roll — never on payroll | No | — | Reason `attendance_only`. §09's contract-labour attendance surface is not a billing surface |
| B-14 | Candidate, offer-accepted, not yet joined | No | — | Reason `pre_joining`. Becomes B-02 on the join date |
| B-15 | Ex-employee with no event in the period | No | — | Reason `no_event_in_period`. Record retention is not a billing event |
| B-16 | Duplicate person record merged during the period | Yes, once | Union of the merged assignments | Reason `merged_duplicate`. A merge must never create or destroy a billable unit |
| B-17 | CA-console user, partner user, auditor or any non-employee platform user | No | — | Reason `platform_user`. We bill employees, not seats — the distinction that makes P6 meaningful |
| B-18 | Employee of a *different* tenant, visible to the same CA through the console | No | — | Reason `other_tenant`. Each tenant's census is closed over its own ledgers |

Two rules follow from the table and are stated separately because they are the ones a customer will argue about:

- **B-05 through B-07 are the honest cost of "no seat floor".** A block vendor bills the zero-pay employee inside its 50 and nobody notices. We bill them visibly, so the invoice has to explain them. The line's `basis_reason` is rendered in plain words on the invoice, and the help text names the ECR line and the register entry the person still occupies (EV-035, EV-053).
- **B-09 and B-10 together are the anti-gaming rule.** Without them, a tenant could archive exited employees before the census closes and pay less than they filed for. With them, the invoice can never be lower than the filing work performed, and the reconciliation between "employees on the invoice" and "lines in the ECR" is a supported query rather than a dispute.

#### Proration, with worked arithmetic

All rupee figures use the section's illustrative ₹110 PEPM target and are **[Hypothesis]** pending §20 (H-P2). The basis is `calendar_days` in a 30-day period unless the parameter says otherwise.

| Case | Assignment days | Arithmetic | Line amount |
| --- | --- | --- | --- |
| Full-period employee | 30 of 30 | 110 × 30/30 | ₹110.00 |
| Joiner on day 12 | 19 (days 12–30) | 110 × 19/30 = 69.6666… | ₹69.67 |
| Leaver on day 12, last working day inclusive | 12 (days 1–12) | 110 × 12/30 = 44.00 | ₹44.00 |
| Joined day 5, left day 20 | 16 (days 5–20) | 110 × 16/30 = 58.6666… | ₹58.67 |
| Rehire: days 1–10 and days 20–30 | 21 (union) | 110 × 21/30 = 77.00 | ₹77.00 |
| Full-period loss of pay (B-05) | 30 | 110 × 30/30 | ₹110.00 |
| Dual-entity person (B-08), entity of record | 30 | 110 × 30/30 | ₹110.00 |
| Dual-entity person, sibling entity | 30 | Suppressed by B-08 | ₹0.00 |

Rounding: each line rounds half-up to two decimals; the invoice subtotal is the sum of rounded lines, so the printed lines always add to the printed subtotal. The global payroll rounding and precision policy is §08's and is not restated here — billing rounding is a separate policy with a separate parameter, `billing_rounding_policy`, precisely so that a change to one never silently moves the other.

A 31-day period changes the denominator, not the rule: a joiner on day 12 of a 31-day month is 20 days, 110 × 20/31 = 70.9677… = ₹70.97. The alternative bases exist because buyers reason differently — `period_fraction` charges half a month for a mid-month joiner regardless of month length, and `snapshot_date` charges whoever is active on a stated day and is the simplest to explain and the easiest to game. The choice is a pricing decision routed to §20, not a build assumption (§18.28).

#### Worked census: a 50-employee Karnataka tenant with movement

Opening headcount 49, one joiner on day 12, one employee on full-period loss of pay, one contractor on the contractor register, one candidate who has accepted but not joined:

- Billable lines: 49 full-period (B-01 and B-05 — the loss-of-pay employee is inside the 49), plus one prorated joiner (B-02).
- Not billable: the contractor (B-11), the candidate (B-14).
- `prorated_units` = 49 + 19/30 = 49.6333…
- Platform fee = 49 × ₹110 + ₹69.67 = ₹5,390.00 + ₹69.67 = **₹5,459.67** ex-GST.
- GST at the rate held in `gst_rate_saas`, 18% as vendors disclose it today (§18.13): ₹982.74. Invoice total **₹6,442.41**.
- Compare the same tenant billed as a flat 50: ₹5,500.00 + ₹990.00 = ₹6,490.00. The difference — ₹47.59 — is the whole visible consequence of proration in one month, and it is what makes the "no cliff" promise of P2 checkable on an invoice rather than asserted on a card.
- Compare the same tenant on the cheapest published block card in the set, greytHR Essential: ₹2,495 whether the tenant holds 20 employees or 50, then ₹45 for each employee above 50 (r5/03). At 50 employees that is ₹49.90 PEPM against our ₹110 (EV-027). The block is cheaper; it is also unavailable to the 20-person version of the same firm at any price below ₹2,495 (EV-026). §18.24 works the whole ramp.

#### Reconciling the census with the statutory counts

A tenant will, sooner or later, put four numbers side by side and ask why they differ: the count on the invoice, the member count in the month's ECR, the headcount in the registers, and the number that fired a statutory threshold. They differ for good reasons, and a product that cannot explain the differences invites the conclusion that one of them is wrong.

| Number | What it counts | Why it differs from the invoice |
| --- | --- | --- |
| **Invoice count** (`person_count`) | Billable person-periods under B-01 to B-18 | The reference number for billing only |
| **ECR member lines** | Members in scope of the month's return, with NCP Days for non-contributory days (EV-035) | Excludes people outside EPF scope; includes exited members filed in the month (which is why B-09 exists); a NIL month has no file at all (EV-042) |
| **Register headcount** | Persons on the employer's registers, one canonical set across the rule-sets (EV-053) | Register scope follows the register's own rules and the state-configured form; retention keeps entries long after a person leaves (EV-054) |
| **Threshold count** | Workers or employees, per the statute's own counting unit and sphere (EV-057) | The counting unit is a schema field, not a synonym for headcount; latch logic means a firm that once touched a threshold may stay in scope (§06.1) |

Acceptance criteria:

1. A single reconciliation view shows all four numbers for a tenant and a period, each labelled with its basis and its source, with the differences itemised by person where they exist.
2. No number is presented as correcting another. They answer different questions and the view says so in words.
3. The threshold count is never derived from the census. A threshold that fires because of a billing number is a defect, and the lint in §18.4 exists to prevent the reverse dependency as well.
4. Negative case: the reconciliation view is read-only. It is an explanation surface, not an adjustment surface — a correction is made in the ledger that owns the number, never here.

#### Negative cases and test scenarios

| # | Scenario | Required behaviour |
| --- | --- | --- |
| GTM-TS-01 | Tenant archives 6 exited employees the day before the census closes; all 6 appeared in the month's ECR | Census counts 6 (B-09, B-10); invoice unchanged; archiving is not a billing action |
| GTM-TS-02 | Tenant bulk-imports 40 employee records in a period with no pay run and no filing instance | Census counts 0 (B-15 / `no_event_in_period`); an import is not a hire |
| GTM-TS-03 | Person holds assignments in two legal entities of one tenant for the whole period | Exactly one billable line; the sibling line carries `counted_in_sibling_entity`; the invoice shows both so the customer sees the suppression |
| GTM-TS-04 | The same person is an employee of tenant A and tenant B, unrelated | Billable once in each tenant; no cross-tenant suppression exists and none is implied |
| GTM-TS-05 | Employee joins on the last day of the period | One line, 1/30 unit = ₹3.67; never rounded up to a full unit |
| GTM-TS-06 | Employee exits on day 1 of the period, having been filed for in the prior period | One line, 1/30 unit in this period; the prior period is untouched (P9) |
| GTM-TS-07 | Duplicate records for one person merged mid-period, each with a pay-run line | One billable line on the union; a defect is raised for the double pay run and routed to §08, not resolved by billing |
| GTM-TS-08 | Census closed, then a retro pay run posts to the closed period | The closed census and invoice are immutable; the delta is a separate, labelled adjustment line on the next invoice, referencing the closed period |
| GTM-TS-09 | A tenant on File drops to 18 employees for three periods | Census falls, the invoice falls with it, the tier does not change (P1, P10) |
| GTM-TS-10 | Attendance-only person records pushed by an ADMS device for contractor staff | Census counts 0 (B-13); device volume never enters the invoice |

---

### 18.20 The price book, the rating pipeline and invoice replay

P7 says the engine must express every shape in the market; P9 says a price is an effective-dated rule object and every invoice replays. This subsection is the data definition and the pipeline that make both testable. It deliberately mirrors §14's rule-object discipline rather than inventing a parallel one — a price is a rule with a jurisdiction of one tenant.

#### Data definitions

**Price book.** The set of everything a tenant can be charged for, versioned as a whole.

| Field | Definition |
| --- | --- |
| `price_book_id` | Identity of the book — one for the published card, one per grandfathered legacy card, one per partner agency rate |
| `version_id` | Monotonic version. Published versions are immutable (P9) |
| `effective_from`, `effective_to` | Decision-time range in which this version may be resolved for a new period |
| `currency` | INR for every book in scope; the field exists so a future book cannot be mistaken for INR |
| `publish_state` | `draft` \| `in_review` \| `published` \| `superseded` \| `rolled_back` — the same states the compliance pipeline uses (§22) |
| `author`, `reviewer` | Two distinct named people. A book cannot publish with one |
| `supersedes` | The version this one replaces, and the reason |

**Plan.** A sellable configuration inside a book.

| Field | Definition |
| --- | --- |
| `plan_code` | `free`, `file`, `scale`, `assure`, or a partner/legacy code |
| `band` | The headcount band the plan is designed for, used for lints, never for enforcement |
| `rate_components[]` | Ordered list from the closed set in P7 |
| `entitlement_keys[]` | What the plan grants, resolved against §18.4's derivation table |
| `sla_schedule_ref` | The SLA schedule attached to the plan — the object §18.23's claim workflow reads |
| `min_term`, `billing_cycle` | Monthly or annual; annual prepay carries `annual_prepay_discount_pct` |

**Rate component.** The unit of arithmetic.

| Field | Definition | File-tier value |
| --- | --- | --- |
| `kind` | `base_fee` \| `included_quantity` \| `overage_rate` \| `per_unit_rate` \| `minimum_billable_quantity` \| `metered_rate` \| `registration_allowance` \| `registration_line_rate` | |
| `unit` | `billable_person_period` \| `registration_month` \| `recruiter_month` \| `tracked_user_month` \| `document_batch` | |
| `list_price`, `first_term_price`, `renewal_price` | Three values, three effective dates (P8) | |
| `proration` | `calendar_days` \| `period_fraction` \| `none` | `calendar_days` |
| `rounding` | `billing_rounding_policy` reference | two decimals, half-up |

On the File plan: `base_fee = 0`, `included_quantity = 0`, `minimum_billable_quantity = 0`, `per_unit_rate = <PEPM>`, plus `registration_allowance` and `registration_line_rate`. That is the whole card, and the no-seat-floor lint reads exactly those three zeros (P7).

**Discount and credit grants.** Separate objects, never edits to a price.

| Field | Definition |
| --- | --- |
| `grant_kind` | `term_discount` \| `negotiated_discount` \| `partner_funded_credit` \| `sla_credit_note` \| `goodwill_credit` |
| `bounds_ref` | The §18.11 discount band the grant must sit inside |
| `approver`, `approved_at` | Mandatory for `negotiated_discount` and `goodwill_credit` |
| `expiry`, `scope` | Which components, which periods |

Keeping credits as objects rather than price edits is what makes the realised-versus-list metric (§18.11, §20 V-03) computable at all: list stays list, and every rupee of erosion has a name, an approver and a reason. It is also the primitive a partner-funded customer credit needs — the market reference is Zoho's $100 wallet credit to the referred customer at every affiliate tier (r3/03), which is a channel-funded acquisition subsidy and not a discount on our card.

#### The rating pipeline

<!-- DIAGRAM: pricing-gtm-rating-pipeline -->

Eleven stages, each with an invariant that a test asserts:

| Stage | Input | Output | Invariant |
| --- | --- | --- | --- |
| 1. Census close | Payroll and filing ledgers | `billable_headcount_census` | Every line cites a source event (§18.19) |
| 2. Version resolution | Contract, period | `price_book_version_id` | Resolved from the contract and the period, never from the clock (P9) |
| 3. Component evaluation | Census, plan | Component quantities | Quantities are integers or decimals with a stated unit; no free-text |
| 4. Registration line | Registration count, allowance | Line quantity | Counted registrations are listed by identifier on the invoice (§18.3) |
| 5. Proration | Assignment days | `unit_fraction` per line | Union, not sum, over segments (B-04) |
| 6. Grants | Discount and credit objects | Adjustment lines | Every adjustment carries a grant ID and, where required, an approver |
| 7. Invoice draft | All of the above | Draft lines | Σ lines = subtotal, to the paisa |
| 8. Tax resolution | Recipient GSTIN state, supplier state | IGST or CGST+SGST split | The split is a rule-table entry, not code (§18.13) |
| 9. IRN and QR | Invoice, turnover state | Signed invoice | Applies once our own turnover crosses `einvoice_turnover_threshold` (§18.13) |
| 10. Issue and collect | Signed invoice, mandate | Payment or dunning event | A failed debit enters the T7 transition, not a churn record (§18.4) |
| 11. Commission accrual | Collected revenue, partner ID | Ledger accrual | Accrual is on collected, ex-GST revenue only (§18.26) |

#### Invoice replay

Replay is the acceptance test for P9 and the reason the census is hashed:

1. **Determinism.** Given `(census_hash, price_book_version_id, grants, tax rule version)`, re-running stages 3–8 reproduces every line and the subtotal to the paisa.
2. **Isolation.** Replay reads no current state. A tenant who has since changed plan, headcount, state or GSTIN replays identically.
3. **Defect, not drift.** A mismatch raises a reconciliation defect with both figures and the first differing line. It never rewrites the issued invoice, and it never silently re-issues.
4. **Provenance.** The replay output names the price book version, its author and reviewer, and the publish date — the same provenance a payroll replay carries for a rule version (§14, §15).
5. **Negative case.** Replay must fail closed if the price book version referenced by the invoice has been rolled back: a rolled-back version is still readable for replay and still marked rolled back, so that every invoice issued under it can be listed in one query.

Acceptance criterion (dispute closure): for any invoice a tenant questions, support can produce — without engineering — the census lines with their `basis_reason`, the resolved price book version, the grants applied with approvers, and the replayed subtotal. The target is that a billing dispute is answered from the product, because a per-head card with no block has more lines to explain than a block card does, and that explanation cost is the price of P6.

#### Worked example — the same tenant, three shapes

The 50-employee Karnataka tenant of §18.19, rated three ways, to show that the engine expresses all of them (P7). Our own figure is **[Hypothesis]**; the competitor figures are published list prices, captured 5 Sep 2026 (EV-027, r5/03), shown here as arithmetic on their own cards and not as a claim about their products.

| Shape | Components | Arithmetic at 50 | Monthly ex-GST | Marginal cost of employee 51 |
| --- | --- | --- | --- | --- |
| **Ours — File** | `per_unit_rate` ₹110, everything else zero | 50 × 110 | ₹5,500.00 | ₹110.00 |
| **Base + block + overage** (greytHR Essential card shape) | `base_fee` ₹2,495, `included_quantity` 50, `overage_rate` ₹45 | 2,495 + 0 | ₹2,495.00 | ₹45.00 |
| **Flat to ceiling, then per employee** (Kredily Payroll OS card shape) | `base_fee` ₹1,249, `included_quantity` 25, `overage_rate` ₹50 | 1,249 + 25 × 50 | ₹2,499.00 | ₹50.00 |
| **Per user with a minimum block** (Zimyo card shape) | `per_unit_rate` ₹80, `minimum_billable_quantity` 50 | max(50, 50) × 80 | ₹4,000.00 | ₹80.00 |

Two things fall out of this table and are developed in §18.24. First, the engine handles all four with the same components, which is what P7 asked for. Second, **our marginal cost per hire is the highest of the four**, because a block vendor charges ₹0 for hires inside a block the buyer has already paid for. The continuous ramp of P2 is an advantage against the *cliff* — the discontinuity at the block boundary and at Zoho's ₹0 → ₹1,000 step — and a disadvantage against the *marginal rate* inside a block. Collateral that claims the ramp is cheaper per hire is wrong on this arithmetic and must not be written.

---

### 18.21 Dunning, suspension and the statutory-artefact floor

A payroll and filing product holds records its customer is obliged to keep and artefacts its customer has already filed. That makes non-payment a different problem here than in a generic SaaS: the obvious collections lever — withhold the product until they pay — is pointed at records the employer needs to discharge duties that are theirs and that we never assumed (K-13). This subsection sets the floor below which collections may not go, and the state machine that stays above it. The transitions themselves are T7–T11 and T16 of §18.4; what follows is what each state *permits*.

#### The floor, stated as a product rule

Four things remain available in every state of the machine, including READ_ONLY and for the whole post-closure retention window:

1. **Every statutory artefact already generated** — the ECR file, the challans, the Form 138 return files, the register exports, the wage slips — downloadable by the tenant's own administrator.
2. **The filing ledger** for every establishment, unbroken, with each instance's state and acknowledgement identifier (Part E-10; §08 FR-PAY-711). A tenant cannot be put in a position where they cannot prove what was filed.
3. **A full data export** in the documented export format, offered proactively at T11 and T14 and evidenced — the offer, the delivery and the download are recorded, because "we offered" is worthless without a record of it.
4. **Employee-facing documents already issued** — payslips and letters an employee has received are not withdrawn from the employee's view by a dispute between the employer and us.

The reason is stated plainly rather than legally: the employer's register-retention duty runs five years from the date of last entry in the central sphere, with the OSH and social-security rule-sets wording it as five *calendar* years and a bar on destruction even afterwards unless the register is transferred (EV-054), and state-sphere periods are unknown and routed to counsel (Part D-11, §23). Our product must not be the reason a customer cannot discharge that duty. The contract language that expresses this is a customer-facing legal claim with a named owner and clears counsel before publication (Part D-20, §23).

What may be withheld in READ_ONLY: new pay runs, new filing generation, attended-submission sessions, new user provisioning, API writes, and the assistant. What may never be withheld: the four items above.

#### Dunning states and their permissions

| State | Writes | Reads and exports | Attended submission (§22) | SLA (§18.23) | Notices |
| --- | --- | --- | --- | --- | --- |
| **FILE / SCALE, current** | Full | Full | Per plan | Armed for paid periods | — |
| **DUNNING** | Full — nothing changes on day one | Full | Per plan, and the operator is told the account is in dunning so nothing is promised that may lapse | Armed for paid periods | Day 0 to the billing contact, then on `dunning_retry_schedule` |
| **READ_ONLY** | Blocked for new periods; a period already open completes | Full | Suspended for new instances; an instance already submitted is seen through to its acknowledgement | Armed for periods already invoiced and paid; not armed for the unpaid period | Closure notice with a dated deadline and the export offer |
| **CLOSING** | Full until term end | Full | Per plan until term end | Armed until term end | Confirmation, plus the export offer |
| **CLOSED** | None | Export only, for `post_closure_retention_days` | None | None | Final export offer, evidenced |

The single most important row is READ_ONLY's second cell: **a payroll period already open completes.** Blocking a payroll month in flight converts a billing failure into a statutory failure — a missed ECR, a chronology gap that blocks the following month (EV-038), a late TDS deposit — and the customer's exposure from that is not ours to create. The write lock therefore applies to periods not yet opened.

#### Parameters, all unsized

| Parameter | What it controls | Owner |
| --- | --- | --- |
| `dunning_retry_schedule` | Debit retry attempts and spacing after a failure | Finance with Billing engineering |
| `dunning_grace_days` | DUNNING → READ_ONLY (T9) | Pricing owner |
| `readonly_window_days` | READ_ONLY → CLOSED (T11) | Pricing owner |
| `post_closure_retention_days` | How long export stays available after closure, and the win-back window (T15) | Pricing owner with §14's retention classes |
| `renewal_notice_days` | P8's notice period | Pricing owner |
| `tier_stepdown_periods` | Scale → File (T6) | Pricing owner |

None ships a default. Each is routed to §20 alongside the collection data that will set it — and note the dependency the mandate rails create: a failed card debit under the RBI e-mandate regime is a dunning event, not a churn event (§18.13), so the retry schedule has to be compatible with whatever pre-debit notification and authentication regime applies, which §18.13 already routes to counsel and to a primary read.

#### Edge and negative cases

| # | Case | Required behaviour |
| --- | --- | --- |
| GTM-TS-11 | Debit fails on the 3rd; the tenant's payroll lock date is the 5th | Payroll month completes; dunning notices run; no entitlement change before `dunning_grace_days` |
| GTM-TS-12 | Tenant enters READ_ONLY with an ECR generated but not submitted | The artefact stays downloadable; the tenant may submit it themselves; the filing instance records who submitted it and under what authority |
| GTM-TS-13 | Tenant enters READ_ONLY with an ECR submitted and awaiting approval | The instance is seen through to its acknowledgement; abandoning it mid-flight would leave an approved-return ambiguity that can never be cancelled (EV-036) |
| GTM-TS-14 | Tenant disputes an invoice and withholds payment | Dispute suspends the dunning clock for the disputed amount only; undisputed amounts continue; the dispute and its suspension are logged |
| GTM-TS-15 | Tenant is short-paid exactly by the TDS they deducted on our invoice | Not a dunning event at all — reconciled against the TDS credit statement (§18.13); a tenant who deducts correctly must never see a collections notice |
| GTM-TS-16 | Closure at T14 with an unresolved SLA claim open | The claim continues to settlement under the schedule in force for the period claimed; closure does not extinguish it |
| GTM-TS-17 | Win-back at T15 after the retention window has expired | Treated as a new tenant; the product states plainly that prior history is gone, rather than implying a restore it cannot perform |
| GTM-TS-18 | Support attempts to disable artefact download for a delinquent tenant | Blocked by the system, not by policy. The floor is enforced in code, because a floor enforced only by policy is not a floor |

---

### 18.22 Quote-to-cash requirement register

Until this draft §18 carried no requirement-ID family: its identifiers were the shape principles **P1–P10** and the hypotheses **H-P1–H-P21**. Those stay. The functional surfaces this section specifies — the price card, checkout, the census, the rating pipeline, entitlement, dunning, the SLA claim workflow, the partner ledger — now carry **`GTM-###`**, continuing from `GTM-001`. No priority column appears here, because §05.17 owns release sequencing and reserves P0 for its R1 list (lint L1); the **Gate** column instead names what must report before the requirement is *sold*, which is this section's concern. Acceptance criteria are testable assertions; where one is long it is developed in the subsection named in **Trace**.

#### Price card and evaluability (P3, P6)

| ID | Requirement | Acceptance criterion | Gate | Trace |
| --- | --- | --- | --- | --- |
| GTM-001 | Publish a self-serve INR price card with GST-inclusive and GST-exclusive columns, per band, monthly and annual | A visitor with no account can read the full price of the File tier for their own headcount and registration count without contacting anyone | V-01, V-03 | §18.2 P3 |
| GTM-002 | The card carries a headcount slider that renders the exact fee for every *n*, including *n* below 50 | For every integer *n* from 1 to 999 the slider's rupee figure equals the rating engine's output for that *n*; a diff test asserts it against the engine, not against a duplicate formula | V-03 | §18.2 P6 |
| GTM-003 | The slider renders the incremental cost of employee *n+1* before the customer commits to the hire | The delta shown equals the actual next-employee delta; on the File plan it is constant and equal to the per-unit rate | — | §18.2 P2 |
| GTM-004 | The card takes a registration count and renders the registration line | A three-state tenant sees the line and its arithmetic before checkout, not on the first invoice | H-P13, V-26 | §18.3 |
| GTM-005 | No File-tier plan may carry a minimum billable quantity | Build lint fails the release if any File plan sets `minimum_billable_quantity` above zero, or `included_quantity` above zero | — | §18.2 P7, §18.17 |
| GTM-006 | Every comparative claim on the card carries a capture date, a re-capture before use, and clearance | A claim without a live clearance record cannot be published by the CMS; the clearance record names the reviewer | — | §21, Part D-20 |
| GTM-007 | The card states the SLA scope, the remedy cap and the submission modes offered per portal | The scope shown matches the SLA schedule attached to the plan, from the same object — never a hand-written page | V-25 | §18.23 |

#### Checkout, invoicing and collections

| ID | Requirement | Acceptance criterion | Gate | Trace |
| --- | --- | --- | --- | --- |
| GTM-008 | Complete a purchase online, capturing GSTIN and issuing a GST-compliant tax invoice | A tenant self-serves from signup to first invoice with no human contact; the invoice carries both GSTINs | — | §18.13 |
| GTM-009 | Resolve place of supply from the recipient GSTIN state and split IGST or CGST+SGST from a rule table | Changing the recipient's registered state changes the split with no code change; the rule table version is stored on the invoice | — | §18.13 |
| GTM-010 | Carry IRN and signed QR on B2B invoices once our own turnover crosses the threshold | Turnover crossing flips the behaviour by configuration; every subsequent B2B invoice carries a valid IRN within the reporting window | — | §18.13 |
| GTM-011 | Treat short-payment-by-TDS as normal and reconcile it against the TDS credit statement | A tenant short-paying by exactly the deducted amount is never flagged delinquent and never enters dunning | — | §18.13, GTM-TS-15 |
| GTM-012 | Support mandate-based collection with a dunning path, not card-only | A failed debit raises a dunning event and the T7 transition; it never cancels a subscription | — | §18.4, §18.21 |
| GTM-013 | Invoice lines are explainable in plain words | Every line renders its `basis_reason` and, for prorated lines, the day count and denominator | — | §18.19 |
| GTM-014 | Default zero setup fee, with the fee as a first-class, separately invoiced, waivable and partner-assignable line | Enabling a setup fee for a partner-led implementation requires no code; the fee appears as its own line and can be assigned as the partner's revenue | H-P7 | §18.13, §18.26 |

#### Census and rating (P9)

| ID | Requirement | Acceptance criterion | Gate | Trace |
| --- | --- | --- | --- | --- |
| GTM-015 | Derive the billable-headcount census from the payroll and filing ledgers | No interface can create, edit or delete a census line; a line without a source event fails validation | — | §18.19 |
| GTM-016 | Implement the B-01 to B-18 decision table exactly, with a closed enumeration of `basis_reason` | Each of the eighteen rows has at least one automated test; an unmapped reason code fails the build | — | §18.19 |
| GTM-017 | Prorate on the configured basis, using the union of assignment segments | GTM-TS-01 to GTM-TS-10 pass; a rehire in one period is billed once | — | §18.19 |
| GTM-018 | Store `price_book_version_id` and `census_hash` on every invoice | Absent either, the invoice cannot be issued | — | §18.20 |
| GTM-019 | Replay any issued invoice deterministically, with no read of current state | A tenant who has since changed plan, state, GSTIN and headcount replays to the paisa | — | §18.20 |
| GTM-020 | Raise a reconciliation defect on replay mismatch; never silently re-price | The mismatch report names both figures and the first differing line; the issued invoice is untouched | — | §18.20 |
| GTM-021 | Publish a price book version through two-person review with staged publish and rollback | A version published by a single named person is rejected; a rolled-back version stays readable for replay and is flagged | — | §18.20, §22 |
| GTM-022 | Hold list, first-term and renewal prices separately, with a scheduled step | The forward renewal rate is visible in-product for the whole notice period; an edit inside the window is blocked | — | §18.2 P8 |

#### Entitlement and plan lifecycle (P10)

| ID | Requirement | Acceptance criterion | Gate | Trace |
| --- | --- | --- | --- | --- |
| GTM-023 | Derive entitlement from the census, establishment facts and explicit subscriptions only | The entitlement service answers "why" with provenance, causing record, approver and expiry | — | §18.4 |
| GTM-024 | Lint every entitlement key against the derivation table | A key with no row, or a row deriving from anything outside the four permitted sources, fails the build | — | §18.4 |
| GTM-025 | Never auto-down-tier a tenant that has crossed 20 | A census dip produces a smaller invoice and no tier change; a down-tier requires a contracted override with a named approver | — | §18.2 P1, §18.4 |
| GTM-026 | Step Scale down to File only after the configured number of consecutive periods, at a term boundary | A single-period dip below 200 changes nothing | — | §18.4 T6 |
| GTM-027 | In-product upgrade from Free to File with no sales contact | A Free tenant crossing 20 can convert inside the product in one flow, including mandate registration and GSTIN capture | — | §18.15, §18.18 |
| GTM-028 | Refuse checkout for a registration whose state dataset is not published | The refusal names the state and the reason, offers the waitlist, and is recorded as a lost deal with that reason | — | §18.3, §19 |
| GTM-029 | Never gate the POSH Internal Committee surface, the wage slip or the six employer registers behind any tier | Attempting to attach these keys to a paid-only entitlement fails the lint | — | §18.4 |

#### Dunning and the artefact floor

| ID | Requirement | Acceptance criterion | Gate | Trace |
| --- | --- | --- | --- | --- |
| GTM-030 | Keep statutory artefacts, the filing ledger, full export and issued employee documents available in every state | The capability cannot be disabled by support, by configuration or by a collections workflow — the floor is enforced in code | — | §18.21 |
| GTM-031 | Complete a payroll period already open when READ_ONLY is entered | A billing failure never becomes a missed filing; the write lock applies to periods not yet opened | — | §18.21 |
| GTM-032 | See an already-submitted filing instance through to its acknowledgement regardless of billing state | An approved ECR return can never be cancelled (EV-036), so abandoning one mid-flight is prohibited | — | §18.21, §22 |
| GTM-033 | Offer and evidence a full export at closure | The offer, the delivery and the download each leave a record; "we offered" is not assertable without one | — | §18.21 |
| GTM-034 | Suspend the dunning clock for a disputed amount only | Undisputed amounts continue to age; the suspension and its scope are logged | — | §18.21 |

#### SLA claim workflow

| ID | Requirement | Acceptance criterion | Gate | Trace |
| --- | --- | --- | --- | --- |
| GTM-035 | Seal a machine-readable causation record on every filing instance | Who supplied the data, when we generated, who submitted under which written authority, and the acknowledgement identifier — TRRN for the ECR (EV-036), Return Receipt Number for Form 138 (EV-051) | V-25 | §18.3, §18.23 |
| GTM-036 | Attach an SLA schedule per plan per period, and read it — not the current plan — when a claim is adjudicated | A claim for a paid period is adjudicated under that period's schedule even if the tenant has since downgraded or closed | — | §18.23 |
| GTM-037 | Compute the remedy against per-incident and annual caps expressed in months of that tenant's platform fee | The cap is a stored parameter on the schedule, not a hand calculation; the computation is shown to the tenant | H-P11, V-07 | §18.23 |
| GTM-038 | Record every claim's attribution with its evidence and its decider | An attribution without a sealed causation record cannot be entered | — | §18.23 |
| GTM-039 | Carry carve-outs as named events, not as prose | A claim whose cause is an unreleased format (EV-046) or a portal outage resolves to `ATTRIBUTED_TO_EXTERNAL` against a named fence, with the fence cross-referenced | — | §18.23, §05 |

#### Partner, attribution and channel

| ID | Requirement | Acceptance criterion | Gate | Trace |
| --- | --- | --- | --- | --- |
| GTM-040 | Stamp an immutable acquisition source, and partner ID where one exists, at tenant creation | Later touches append; nothing overwrites; a deal is attributed exactly once | — | §18.18 |
| GTM-041 | Provide an offline referral claim path with approval | A partner who introduced a prospect by phone can claim the tenant and be approved without a link | V-05 | §18.18, §18.26 |
| GTM-042 | Run deal registration with a protection window | Inbound demand from a registered prospect routes to that partner for the window; the direct team cannot open a competing opportunity | V-05 | §18.18 |
| GTM-043 | Compute commission from revenue actually collected, ex-GST, under the parameter set in force on the invoice date | A parameter change never retro-computes a closed accrual | V-05 | §18.26 |
| GTM-044 | Support clawback inside the stickiness window, reconciled on the payout statement | A churned referral inside the window reverses the accrual and the reversal appears on the next statement | V-05 | §18.26 |
| GTM-045 | Express commission as term-limited or perpetual, tiered on trailing revenue, customer count or referrals per month, with a per-transaction cap, a deal-size bonus and a tier re-evaluation window | The engine can express both published market programmes as configurations, with no code change | V-05 | §18.18, §18.26 |
| GTM-046 | Report cost per qualified lead and cost per closed-won deal by source, with prepaid package costs amortised across the package term | A marketplace package's unit cost is computable at the end of its term without a spreadsheet | H-P17 | §18.18 |
| GTM-047 | Provide tenant-level white-label — logo, domain, sender identity, payslip and ESS branding — as an entitlement | A payroll service provider can run a client book under its own brand; the entitlement is offered only on agency economics | V-05 | §18.18 |
| GTM-048 | Fund customer-side credits as a billing primitive, separate from discounts | A partner- or campaign-funded credit reduces the invoice without touching list price or the realised-vs-list metric | — | §18.20 |

#### Evaluation and instrumentation

| ID | Requirement | Acceptance criterion | Gate | Trace |
| --- | --- | --- | --- | --- |
| GTM-049 | Provide a parallel-run evaluation mode against the prospect's own most recent completed month | A prospect produces a line-by-line diff of gross, each statutory deduction, net pay and employer contribution without an implementation | H-P19 | §18.25 |
| GTM-050 | Never assert that a competitor's figure is wrong in the diff | The diff labels differences as differences and names the rule version we applied; the wording clears the competitor-claim rule | — | §18.25, §21 |
| GTM-051 | Emit the named funnel events, segmented by acquisition source and by partner | Reach, signup, activation, statutory conversion, expansion and channel events are queryable by source from launch | — | §18.15, §19 |
| GTM-052 | Track realised-versus-list price as a first-class metric | Every grant is attributable to an approver and a reason; the metric feeds V-03 | V-03 | §18.11 |
| GTM-053 | Record refusals at checkout by reason, especially unservable states | The refusal count per state is the demand signal that prioritises the next state dataset | — | §18.3, §22 |
| GTM-054 | Instrument certificate issuance as a leading retention indicator | Form 130 issuance success per tenant per year is reported before the renewal window opens | — | §18.10 |
| GTM-055 | Instrument churn by month of the Tax Year | Churn concentration inside and outside the February–April window is reported as a cohort metric | — | §18.10 |

---

### 18.23 The SLA claim lifecycle — from a rejected filing to a credit note

§18.3 sets the SLA's terms and bounds the backstop. What was missing was the machinery: how a claim is raised, how causation is decided, how the remedy is computed and capped, and what happens when the tenant disagrees. Without that machinery the backstop is a sentence in a contract; with it, it is a product surface with a state, an owner and an evidence standard. The whole premium in §18.12's two rightmost columns rests on this working.

<!-- DIAGRAM: pricing-gtm-sla-claim-states -->

#### The transition table

| # | From → To | Event | Guard | Side effect | Who may trigger |
| --- | --- | --- | --- | --- | --- |
| **C1** | — → RAISED | Tenant raises a claim, an operator raises one, or a portal rejection auto-raises one | — | Claim opened against a named filing instance and period | Tenant admin, operator, system |
| **C2** | RAISED → TRIAGED | Scope check | The obligation is in the tenant's SLA schedule **for that period** | Schedule version pinned to the claim | Compliance operations |
| **C3** | RAISED → OUT_OF_SCOPE | Scope check fails | Obligation absent from the schedule, or the period predates arming | Reason and the schedule version returned to the tenant | System |
| **C4** | TRIAGED → EVIDENCE_PENDING | Causation record incomplete | A required artefact is missing | Named request to the tenant or the operator, with a deadline | Compliance operations |
| **C5** | EVIDENCE_PENDING → TRIAGED | Artefact supplied | — | Record completed and re-sealed | Tenant or operator |
| **C6** | EVIDENCE_PENDING → OUT_OF_SCOPE | Evidence window lapses | Deadline passed with no artefact | Closed with reasons; reopenable under C18 | System |
| **C7** | TRIAGED → CAUSATION_REVIEW | Record complete | Causation record sealed and hashed | Review opens on the sealed record only | System |
| **C8** | → ATTRIBUTED_TO_US | Review concludes | Defect in our artefact, our schedule, or a submission we contracted to make | Remediation task opened | Named reviewer |
| **C9** | → ATTRIBUTED_TO_CUSTOMER | Review concludes | Customer data, customer delay, or funds not remitted | Findings and evidence returned | Named reviewer |
| **C10** | → ATTRIBUTED_TO_EXTERNAL | Review concludes | A named carve-out event — portal outage, unreleased format, statutory change inside its own notice period | Carve-out recorded against the named fence | Named reviewer |
| **C11** | ATTRIBUTED_TO_US → REMEDIATION | Remediation begins | The correction route exists for that instrument | Refile, revise or supplement per §08's filing machine | Compliance operations |
| **C12** | REMEDIATION → REMEDY_COMPUTED | Acknowledgement captured | Portal acknowledgement recorded | Actual loss assembled from the exposure lines | System |
| **C13** | REMEDY_COMPUTED → CAPPED | Caps applied | Per-incident and annual caps from the pinned schedule | Capped figure and the cap arithmetic shown to the tenant | System |
| **C14** | CAPPED → SETTLED | Credit note issued | Approver inside bounds | Credit grant created (§18.20), applied to the next invoice | Named commercial owner |
| **C15** | ATTRIBUTED_TO_CUSTOMER → CLOSED_NO_REMEDY | Closure | — | Findings retained; the tenant keeps the evidence pack | System |
| **C16** | ATTRIBUTED_TO_EXTERNAL → CLOSED_NO_REMEDY | Closure | — | Carve-out cross-referenced to the fence and counted in §19 | System |
| **C17** | OUT_OF_SCOPE → CLOSED_NO_REMEDY | Closure | — | Reason retained | System |
| **C18** | CLOSED_NO_REMEDY or CAPPED → DISPUTED | Tenant disputes | Inside `sla_dispute_window_days` | Clock suspended on the disputed amount only | Tenant |
| **C19** | DISPUTED → CAUSATION_REVIEW | New evidence | Evidence not previously considered | Review reopens on the amended record | Compliance operations |
| **C20** | DISPUTED → ESCALATED | Escalation | — | Named commercial owner takes it | Tenant or operator |
| **C21** | ESCALATED → SETTLED | Settled above or below the computed remedy | Reasons recorded | Credit grant with a `goodwill_credit` kind where it exceeds the computed figure, so the metric stays honest | Named commercial owner |
| **C22** | ESCALATED → CLOSED_NO_REMEDY | Escalation upholds attribution | — | Reasons recorded and returned | Named commercial owner |

#### The causation decision table

Causation is the whole game: the backstop is unpriceable without a clean "ours" versus "theirs" line (§18.3). The table below is the enumeration the reviewer works from; every row requires the evidence named in its last column, and no attribution may be recorded without it.

| # | Observed failure | Attribution | Required evidence |
| --- | --- | --- | --- |
| A-01 | Artefact rejected by the portal for a format defect | Ours | The generated artefact, the portal response, the format version we resolved for the period |
| A-02 | Artefact correct, submission missed a due date in a period where we contracted to submit | Ours | The schedule, the session record, the written authority in force |
| A-03 | Statutory change effective before the due date, not reflected in the rule set | Ours | Rule version history, watcher record, publish timestamps (§22) |
| A-04 | Customer supplied wage or master data late, after the cut-off in the schedule | Customer | Data receipt timestamps against the schedule's cut-off |
| A-05 | Customer did not remit funds, so the challan could not be paid | Customer | Due Deposit Balance Summary state and the payment record (EV-036) |
| A-06 | Customer's own user rejected the return statement at the approval step | Customer | The approval-step record, which identifies the approver |
| A-07 | Exit date wrongly recorded, correction needs a joint declaration by employer and employee | Customer, with our assistance | The joint-declaration dependency recorded as a blocker (EV-041) |
| A-08 | Filing blocked because a prior month was never filed | Whoever caused the gap, per the ledger | The per-establishment filing ledger, which refuses silent abandonment (EV-038, Part E-10) |
| A-09 | Format not released by the authority | External carve-out | The fence record — Form 138 Q4 and Form 130 Part B are the live instances (EV-046) |
| A-10 | Portal unavailable through the window | External carve-out | Session attempts, timestamps, the operator's contemporaneous note |
| A-11 | Mixed cause — our defect plus customer delay | Apportioned, with the apportionment stated | Both evidence sets; the reviewer records the split and its basis |

Note what A-01 to A-11 do *not* decide: none of them allocates statutory liability. The employer's and deductor's liability is non-delegable (K-13), the remedy is contractual, and liability allocation and insurability remain open counsel questions (Part D-17, §23). A claim record must never be drafted in language that implies we have assumed a statutory liability — the claim template is a customer-facing legal artefact with a named owner and clears counsel (Part D-20).

#### Remedy computation, with the asymmetry stated plainly

```
computed_remedy = Σ over covered exposure lines attributable to us
                    ( interest + late fee + damages actually levied )
capped_remedy   = min( computed_remedy,
                       per_incident_cap,
                       annual_cap_remaining )
per_incident_cap = sla_remedy_cap_months × tenant_monthly_platform_fee
```

`sla_remedy_cap_months` and the annual multiple are parameters with **no shipped default**; the levels are set in §20 and the credibility of a capped remedy at all is H-P11. To show the shape, at an illustrative one month the 50-employee File tenant of §18.19 has a per-incident cap of 50 × ₹110 = **₹5,500**, and at an illustrative three months an annual cap of **₹16,500** — both illustrative, neither a default, both **[Hypothesis]**.

Set that against the exposure it faces. For a 50-member establishment where every member is at or above the ₹15,000 EPS wage ceiling, the EPS component alone is 50 × ₹1,250 = **₹62,500 in a single month** (the ceiling and the ₹1,250 are the verified figures in §18.3's filing table) — **11.4× the entire monthly platform fee**, before employee and employer PF, before EDLI, before ESI, and before any interest or damages computed on any of it. Interest under s.7Q is mandatory and auto-calculated, while damages under s.14B may be deposited later at the employer's option (EV-039), so the interest limb arrives whether or not anyone argues about it.

Three consequences follow, and they are the reason this subsection exists:

1. **The cap is not a discount on the exposure; it is a different order of magnitude.** A remedy measured in months of ARPU cannot make a customer whole against a liability measured against their payroll. Selling it as if it could is the single fastest way to lose a deal at the compliance review and to create a claim we cannot honour.
2. **The sellable promise is remediation speed plus evidence, with the cap as a secondary comfort.** What the tenant actually buys is that the defect is found, the correction route is run — Regular, Supplementary or Revised, under the constraint that a downward correction is only possible before payment initiation (EV-037) — and the causation record exists to argue with. That is why the verification gate sits immediately before payment initiation (Part E-1) and why §18.3's acceptance criterion makes the causation record a precondition of the backstop rather than a nicety.
3. **H-P11 is therefore a scope question, not only a level question.** If buyers will only value an uncapped remedy, the honest response is not a bigger cap; it is to sell submission and maintenance without a monetary backstop and to re-test the price against that scope (§18.3, H-P15's structure).

#### Edge and negative cases

| # | Case | Required behaviour |
| --- | --- | --- |
| GTM-TS-19 | Claim raised for a period before the tenant's SLA armed | C3; the schedule version and arming date are returned, not a judgement about the merits |
| GTM-TS-20 | Claim raised by a tenant now in READ_ONLY, for a period that was paid | Adjudicated normally under that period's schedule (§18.21) |
| GTM-TS-21 | Two claims for the same instance from the tenant and from an operator | Deduplicated to one claim with two raisers; the caps apply once |
| GTM-TS-22 | Our defect caused a rejection; the customer also missed the data cut-off by two days | A-11 apportionment; the split and its basis are recorded; the remedy is computed on our share only |
| GTM-TS-23 | Remedy would exceed the annual cap already consumed | Capped at the remaining balance; the arithmetic and the remaining balance are shown |
| GTM-TS-24 | A settlement above the computed remedy is agreed commercially | Recorded as `goodwill_credit`, never reclassified as a remedy, so the SLA loss metric in §19 stays true |
| GTM-TS-25 | The cause is the unreleased Form 138 Q4 format | A-09 carve-out against the named fence (EV-046); the tenant is told what is fenced and what replaces it, and the fence is the one §05 already publishes |
| GTM-TS-26 | Tenant asks us to indemnify the statutory liability itself | Refused at the template level: the claim form cannot express it, and the response cites the contract's own non-delegability clause (K-13, §23) |
| GTM-TS-27 | An approved ECR return needs reversing | Not possible — an approved return can never be cancelled (EV-036). The claim resolves through the Supplementary or Revised route within its constraints (EV-037), and the customer is told which before the remediation starts |

---

### 18.24 The ramp, head to head — where the no-seat-floor wedge actually bites

§18.12 compares list prices at one point, 50 employees. That single point hides the thing a pricing architecture has to know: **where along the headcount ramp are we cheaper, and where are we not.** The answer is uncomfortable and it changes how P6 may be sold, so it is worked here in full rather than left implicit.

Method and limits. Every competitor figure is that vendor's own published list card, captured 5 Sep 2026 (EV-021–EV-027; r5/03) or from the archived Keka card (EV-022); the arithmetic across the ramp is ours, applied to their published block sizes and overage rates. Our own figure is the illustrative ₹110 PEPM target and is **[Hypothesis]** (H-P2). Everything is ex-GST, monthly, entry tier. Realised prices are unmeasured for all of them (§20 V-03), setup fees are admitted but unquantified in this market (EV-025, r5/03), and no row leaves the building without a fresh capture and §21 clearance.

#### Monthly bill across the ramp (₹, ex-GST, entry tier)

| Vendor and card | Shape | 20 | 35 | 50 | 100 | 200 |
| --- | --- | --- | --- | --- | --- | --- |
| **Zoho Payroll STANDARD** (annual billing) | ₹1,000 incl. 25, then ₹40 | 1,000 | 1,400 | 2,000 | 4,000 | 8,000 |
| **Kredily Payroll OS** | ₹1,249 to 25, then ₹50 | 1,249 | 1,749 | 2,499 | 4,999 | 9,999 |
| **Qandle FOUNDATION** (annual) | ₹2,450 incl. 50, then ₹49 | 2,450 | 2,450 | 2,450 | 4,900 | 9,800 |
| **greytHR Essential** | ₹2,495 incl. 50, then ₹45 | 2,495 | 2,495 | 2,495 | 4,745 | 9,245 |
| **Pocket HRMS Standard** (annual) | ₹2,995 incl. 50, then ₹60 | 2,995 | 2,995 | 2,995 | 5,995 | 11,995 |
| **Zimyo Basic** | ₹80/user, minimum billing 50 | 4,000 | 4,000 | 4,000 | 8,000 | 16,000 |
| **HROne Basic** | ₹4,950 for 50, then ₹99 | 4,950 | 4,950 | 4,950 | 9,900 | 19,800 |
| **Keka, live small-business floor** | "from ₹6,999", block size not published | 6,999 | 6,999 | 6,999 | — | — |
| **Keka, archived FOUNDATION** | ₹9,999 up to 100, then ₹90 | 9,999 | 9,999 | 9,999 | 9,999 | 18,999 |
| **Us — File [Hypothesis]** | ₹110 per employee, no block | **2,200** | **3,850** | **5,500** | **11,000** | **22,000** |

Keka's live floor has no cells above 50 because the block it buys is genuinely unpublished: the small-companies page states "from ₹6,999 per month" and "starts at ₹90 per employee/month" with the word "minimum" appearing nowhere, and ₹6,999 ÷ ₹90 = 77.8 matches no round number (EV-023, r5/03 open question). We do not fill an unknown with arithmetic.

#### Effective PEPM across the ramp (₹)

| Vendor and card | 20 | 35 | 50 | 100 | 200 |
| --- | --- | --- | --- | --- | --- |
| Zoho Payroll STANDARD | 50.00 | 40.00 | 40.00 | 40.00 | 40.00 |
| Kredily Payroll OS | 62.45 | 49.97 | 49.98 | 49.99 | 50.00 |
| Qandle FOUNDATION (annual) | 122.50 | 70.00 | 49.00 | 49.00 | 49.00 |
| greytHR Essential | 124.75 | 71.29 | 49.90 | 47.45 | 46.23 |
| Pocket HRMS Standard | 149.75 | 85.57 | 59.90 | 59.95 | 59.98 |
| Zimyo Basic | 200.00 | 114.29 | 80.00 | 80.00 | 80.00 |
| HROne Basic | 247.50 | 141.43 | 99.00 | 99.00 | 99.00 |
| Keka, live floor | 349.95 | 199.97 | 139.98 | — | — |
| Keka, archived card | 499.95 | 285.69 | 199.98 | 99.99 | 95.00 |
| **Us — File [Hypothesis]** | **110.00** | **110.00** | **110.00** | **110.00** | **110.00** |

The 20- and 50-employee columns reproduce EV-027 exactly, which is the check that the arithmetic in the other columns is the same arithmetic.

#### The crossover points

For each block card, the headcount at which our flat ₹110 stops being cheaper — the solution of `110n = base`, floored to the last integer where we are strictly cheaper:

| Competitor card | Their price below the block | We are cheaper up to | At the crossover |
| --- | --- | --- | --- |
| Qandle FOUNDATION annual | ₹2,450 | **22 employees** (₹2,420 vs ₹2,450) | 23 costs us ₹2,530 against their ₹2,450 |
| greytHR Essential | ₹2,495 | **22 employees** (₹2,420 vs ₹2,495) | 23 costs us ₹2,530 against their ₹2,495 |
| Pocket HRMS Standard | ₹2,995 | **27 employees** (₹2,970 vs ₹2,995) | 28 costs us ₹3,080 |
| Zimyo Basic | ₹4,000 | **36 employees** (₹3,960 vs ₹4,000) | 37 costs us ₹4,070 |
| HROne Basic | ₹4,950 | **44 employees** (₹4,840 vs ₹4,950) | at exactly 45 we tie at ₹4,950 |
| Keka live floor | ₹6,999 | **63 employees** (₹6,930 vs ₹6,999) | 64 costs us ₹7,040 |
| Keka archived FOUNDATION | ₹9,999 | **90 employees** (₹9,900 vs ₹9,999) | 91 costs us ₹10,010 |
| Zoho Payroll STANDARD | ₹1,000 incl. 25 | **never** | 2.2× at 20, 2.75× at 50 and above |
| Kredily Payroll OS | ₹1,249 to 25 | **never** | 1.76× at 20, 2.2× at 50 and above |

#### What this means, stated without spin

1. **At ₹110 flat, the price advantage of no-seat-floor exists only in a narrow window — roughly 20 to 22 employees against the cheapest block cards, widening to 63 against Keka's floor.** Above that window we are the more expensive option against every card in the set except Keka's live floor at small headcounts. Any collateral that says "we are cheaper because we have no seat floor" is false above ~27 employees against three of the six, and above 45 against five of the six.
2. **The wedge is access and structure, not cheapness.** The verified finding is that *a 20-person company cannot buy 20 seats from any of the six* (EV-026). At 20 employees they are quoted ₹2,450 to ₹9,999 for capacity they do not have, and the block does not shrink. Our ₹2,200 at 20 is both cheaper *and* proportionate; at 35 our ₹3,850 is dearer than Qandle, greytHR and Pocket HRMS and cheaper than Zimyo, HROne and Keka. That is the honest map, and it is what H-P14 must be tested against: the 20–50 band is won on structure, proportionality and quality of delivery, and only incidentally on sticker price at the very bottom of it.
3. **Our marginal cost per hire is the highest in the set** — ₹110 against ₹45 (greytHR above 50), ₹49 (Qandle), ₹50 (Kredily), ₹60 (Pocket HRMS), ₹80 (Zimyo), ₹90 (Keka archived) and ₹99 (HROne). P2's promise is the removal of the *cliff*, not a lower marginal rate, and §18.20's worked example makes the same point from the engine side. A growing customer inside a competitor's block pays ₹0 for their next ten hires; ours pays ₹1,100. This is the single most likely objection in a competitive deal at 40–80 employees and the battle cards (§18.11) must answer it on submission and SLA, never by disputing the arithmetic.
4. **A flat PEPM across 20–199 is probably the wrong shape.** At 200 employees a flat ₹110 puts us above every published card in the set — greytHR ₹46.23, Qandle ₹49.00, Pocket HRMS ₹59.98, Zimyo ₹80.00, Keka's archived card ₹95.00, HROne ₹99.00 — while P4 only tapers *above* 200. P2's acceptance criterion already permits a declining ramp inside the band ("strictly linear-or-tapering"), so a band-internal taper is a refinement of the existing principles rather than a break with them. It is recorded as **H-P18** with its kill criterion rather than decided here, because the level cannot be set before V-01 and V-03 report and because the taper trades against the §18.3 registration line, which pulls in the opposite direction for multi-state tenants.
5. **The comparison is against list, and list is not what anyone pays.** Realised ARPU is unmeasured across the whole set (§20 V-03); setup and implementation fees exist and are unquantified (EV-025; Pocket HRMS confirms an unquantified one-time implementation fee; HROne publishes none except a possible enterprise implementation cost — r5/03); annual-prepay discounts are published by two vendors and negotiated everywhere else. The crossover points move with all three. They are a design input, not a sales weapon.

#### Decision table — motion by band, given the arithmetic

| Headcount | Our position on price | The motion | What must not be said |
| --- | --- | --- | --- |
| Under 20 | Free; competitors' blocks are unavailable or irrelevant | Product-led; be installed before the cliff (§18.6, §18.15) | Nothing about price — the tier is ₹0 |
| 20–22 | Cheapest published option against the block cards | Structure and proportionality: "you pay for 20 because you have 20" (EV-026), plus attended submission | Never "cheapest in the market" — Zoho and Kredily are below us at every headcount |
| 23–50 | Dearer than the cheap block cards, cheaper than Zimyo, HROne and Keka | Submission, SLA, maintenance and the registration model; the seat-floor point stays a *structure* argument | Never claim a price advantage against Qandle, greytHR or Pocket HRMS in this range |
| 50–199 | Dearer than every card in the set except Keka's floor at the low end | The SLA premium in full (§18.3), the multi-state case (§18.3), and the CA console where the CA is in the room (§18.7) | Never lead with price; never discount below the §18.11 bounds to win an arithmetic argument |
| 200+ | Taper applies (P4), and H-P18 may move the band below it | Expansion-led, AE-assisted (§18.6) | Never carry a flat ₹110 into a 200+ quote |

---

### 18.25 Evaluation design — the parallel run, not the trial

**[Verified]** No vendor in the priced set offers a free tier; all offer time-boxed trials or demos, and the durations are short where they are published at all: Zimyo 14 days with no credit card, greytHR 7 days, HROne and Pocket HRMS publish no duration, Qandle offers a "Free Trial", and Keka's per-plan "Free Trial" buttons land on a demo-request form titled "Sign up for free demo" with no pricing, no plan selector and no seat field (r5/03, captured 5 Sep 2026). Among the vendors checked, only Zoho Payroll completes a purchase online (r3/03).

Two consequences for us. First, our Free tier is **not** a trial and must never be described as one: it is permanent below 20 employees, size-gated at the statutory line (P1), and it is the only genuine free tier in the comparison set — which is a structural fact worth stating once, dated, and never inflated into a claim about being first (§18.4's note on factoHR's free-at-20 card stands). Second, seven or fourteen days is far too short to evaluate payroll *correctness* through normal onboarding, which is exactly what a buyer switching a filing-critical system needs to evaluate. So the File-tier evaluation is a **parallel run**, not a trial.

#### What the parallel run is

The prospect re-runs their own most recent **completed** payroll month on our engine and receives a line-by-line comparison against their own figures. It is the demo, the migration rehearsal and the correctness proof in one artefact, and it is why §18.9 says "the demo *is* the import".

| Element | Specification |
| --- | --- |
| **Input** | The prospect's own employee master, salary structure and the completed month's inputs, through the spreadsheet importer or a named-source importer (§16, §18.9). No production access to their incumbent system is required or requested |
| **Scope** | One completed month, one legal entity, one registration set. Multi-entity and multi-state runs are available but are scoped explicitly, because each additional state adds a rule set whose dataset must already be published (§18.3) |
| **Output** | A diff per employee and in aggregate: gross, each statutory deduction (EPF employee and employer with the EPS split, ESI employee and employer, PT, TDS), net pay, and employer contributions including EDLI and admin charges where they apply |
| **Rule basis** | The rule-set version **in force for the month being re-run**, not today's — the same retro-recompute correctness the SLA sells (§18.3) and the same engine purity §15 requires |
| **Tolerances** | The YTD tie-out criteria and tolerances are §16's and are not restated here; the parallel run reports against them |
| **Evidence** | The run produces a dated artefact naming the rule versions applied, the inputs supplied and the date of the run, so the prospect can show it to their CA or their finance buyer |

#### The diff taxonomy — and the rule about what a difference means

A difference is a difference. It is not proof that the incumbent is wrong, and the product must never say that it is.

| Class | What it means | How it is presented |
| --- | --- | --- |
| **D-1 Input difference** | We were given different inputs — a component missing, a mid-month change not imported | "Input not matched", with the field named. Resolvable by the prospect |
| **D-2 Configuration difference** | Both engines are internally consistent under different configurations — a different LOP day-rate convention, a different rounding point, a different wage-base membership for a component | "Configuration differs", naming our setting and the §08 convention it follows. The prospect chooses |
| **D-3 Rule-version difference** | One side applied a different effective-dated rule for the period | "Rule version differs", naming our version, its citation and its capture date |
| **D-4 Unexplained difference** | Neither of the above accounts for it | Escalated to an analyst before the prospect sees a conclusion. An unexplained diff is **our** open item until it is classified |

Standing rule for this surface: the diff never renders a verdict about the other system, and no collateral built from a parallel run may assert that a competitor's or a bureau's output was wrong. Any statement that goes beyond "our engine produced X under rule version Y" is a competitor claim and clears §21 before it is made. This is the same discipline §18.1 applies to the state PT/LWF comparison — describe what our product does, cite dated evidence, never say the other side's published material is wrong.

#### Acceptance criteria

1. A prospect at 50 employees completes a parallel run — import, run, diff — without an implementation project and without production access to their incumbent system.
2. Every diff line carries a class from D-1 to D-4 and the evidence for that class; the count of D-4 lines is shown prominently, because an evaluation that hides its unexplained differences is worthless.
3. The run is reproducible: re-running the same inputs against the same rule versions produces the same diff (§15 engine purity), and the artefact records both.
4. The parallel-run tenant converts into a live tenant without re-importing (§18.9): the same data, the same identifiers, no second migration. Win-back at T15 has the same property for the same reason.
5. Negative case: a parallel run may not be offered for a state whose rule dataset is not published. Offering it would produce D-3 diffs we cannot explain and would set the expectation that we can serve a state we have refused at checkout (GTM-028).
6. Negative case: a parallel run is never presented as an audit of the incumbent. The artefact's title, the export and the email that carries it all say "comparison", never "verification" or "error report".

#### Test scenarios

| # | Scenario | Required behaviour |
| --- | --- | --- |
| GTM-TS-28 | Prospect uploads a month with a mid-month joiner and a mid-month exit | Both appear with proration explained; any difference from the incumbent classifies as D-2 if it is a convention difference, naming the §08 convention |
| GTM-TS-29 | Prospect's month includes an employee crossing the ESI gross ceiling mid-contribution-period | The contribution-period rule is applied as of the month; a difference classifies as D-3 with our rule version named |
| GTM-TS-30 | Prospect's month falls in February in Karnataka or Maharashtra | The PT top-up month is applied (EV-014); a missing top-up on the incumbent side is reported as a difference, never as an error |
| GTM-TS-31 | Prospect is in a state with no captured slab dataset | The run is refused for that state with the same named reason as GTM-028, and the rest of the run proceeds for the states we do hold |
| GTM-TS-32 | Diff produces 4 unexplained lines out of 50 employees | The run does not complete to the prospect until an analyst classifies all four; the count is never suppressed |
| GTM-TS-33 | Prospect converts two weeks later | No re-import; the parallel-run tenant becomes the live tenant with its history intact |

---

### 18.26 Partner mechanics — tier lifecycle, attribution and the commission ledger

§18.18 names the channels, the parameters and the two published market references. This subsection specifies the machinery those parameters drive, because a commission programme that cannot be operated is a slide, not a channel. Everything here is gated on V-05 before a rupee of commission is committed (§18.17), and every referral share is **CAC, not COGS** (§18.7, §18.14).

#### Partner lifecycle (transition table)

| # | From → To | Event | Guard | Side effect | Who may trigger |
| --- | --- | --- | --- | --- | --- |
| **PT1** | — → APPLIED | Partner applies | — | Application record with the partner class — CA, payroll service provider, Tally partner, bank, device dealer (§18.18) | Partner |
| **PT2** | APPLIED → QUALIFIED | Qualification passes | Business registration verified, named sales and support contacts, a stated client base | Agreement issued; the commission parameter set in force is pinned to the agreement | Partner manager |
| **PT3** | APPLIED → DECLINED | Qualification fails | — | Reason recorded; re-application permitted after a stated interval | Partner manager |
| **PT4** | QUALIFIED → ACTIVE | Agreement executed and onboarding complete | Sandbox tenant provisioned, enablement completed | Partner ID minted; deal registration opens; directory listing if the tier grants it | Partner manager |
| **PT5** | ACTIVE → TIER_UP / TIER_DOWN | Re-evaluation window closes | Qualifying metric crosses the tier threshold | Entitlements move with the tier — support SLA, sandbox count, directory listing, badge | System at `partner_tier_reevaluation_months` |
| **PT6** | ACTIVE → SUSPENDED | Breach, dormancy, or an unresolved conflict | Named reason | New registrations blocked; existing accruals continue to term | Partner manager with a second approver |
| **PT7** | SUSPENDED → ACTIVE | Cured | — | Registrations reopen; no retroactive accrual for the suspended period | Partner manager |
| **PT8** | ACTIVE or SUSPENDED → TERMINATED | Either party terminates | Notice served | Accruals run to the end of the committed term per the pinned parameter set; no new attribution | Either party |
| **PT9** | TERMINATED → — | Final statement issued | All accruals settled or written off | Ledger closed; the tenants stay ours and keep their service unchanged | Finance |

The last cell of PT9 is the one to read twice: **terminating a partner never degrades a tenant's service.** A tenant acquired through a channel is our customer, and a channel dispute may not reach them. Where the partner is also the tenant's CA and holds the relationship, that separation is precisely what the reseller-versus-referral question decides (§18.7), and the contract structure is under counsel review (§23).

#### Attribution

<!-- DIAGRAM: pricing-gtm-offline-referral-claim -->

Three attribution paths, in strict precedence order. The order exists so that a deal is attributed exactly once and the same deal never pays twice:

1. **Deal registration** — the partner names the prospect *before* first contact and holds it for `deal_registration_window_days`. Strongest claim, because it is evidenced before the outcome is known.
2. **Link attribution** — the tenant arrives through the partner's link inside `referral_attribution_window_days`. Automatic, and the weakest evidence of actual influence, which is why it does not override an active registration.
3. **Offline claim** — the partner claims a named tenant after signup, approved manually. This path is not optional: the CA and Tally-partner classes introduce prospects by phone and in person, and a link-only model silently fails the highest-value partner class (r3/03).

| Conflict | Resolution |
| --- | --- |
| Two partners register the same prospect | First registration wins for its window; the second is declined with a reason visible to both |
| Registration by partner A, link click from partner B | A wins while its registration is live; the click is recorded and shown, never silently discarded |
| Offline claim against a tenant with a prior direct touch inside the window | Declined, with the deciding record named. The rule is written down before the first claim, not adjudicated case by case |
| Offline claim against a tenant already attributed | Declined; a tenant carries exactly one partner ID, appended once and never overwritten (GTM-040) |
| A CA who is also the tenant's statutory auditor | Routed to the independence question raised in §18.7; ICAI's rules on a member's permissible commercial arrangements are checked before any reseller rate is offered (§23) |

#### The commission ledger

| Entry kind | When it posts | Amount | Reversible |
| --- | --- | --- | --- |
| `accrual` | On revenue **actually collected**, ex-GST, in the period | Collected amount × `partner_commission_pct` in force on the invoice date | By clawback only |
| `hold` | While a tenant is inside `partner_stickiness_days` | The accrual is posted but not payable | Released or clawed back |
| `clawback` | Tenant churns or refunds inside the stickiness window | The held amount, or a computed share | — |
| `bonus` | Invoice value crosses a `partner_deal_size_bonus` threshold | One-time, per the pinned parameter set | By clawback |
| `adjustment` | Correction with a named approver and a reason | Any | Logged |
| `payout` | Statement issued and paid | Sum of payable entries | — |

Invariants:

1. **Collected, not invoiced.** An accrual that posts on an invoice rather than on a receipt makes the channel a receivables risk; §18.18's acceptance criterion 3 already says collected, and the ledger enforces it.
2. **Parameters are pinned to the agreement and to the invoice date.** Changing `partner_commission_pct` never re-computes a closed accrual (GTM-043), for the same reason a price book version never re-rates a closed period (P9).
3. **Every payout statement reconciles to the ledger**, line by line, and the partner can see the tenant, the invoice, the collected amount and the rate that produced each line.
4. **The per-transaction cap is a first-class field.** The one fully published programme in this market carries a maximum commission per single transaction (r3/03); an engine that cannot express a cap cannot express that programme, and cannot bound its own exposure on an unusually large deal.

#### Worked example — a CA-referred File account [Hypothesis]

Using the section's illustrative ₹110 PEPM (H-P2) and, for shape only, the one published market reference — a 15% share for the first 12 months (r3/03). Neither number is a default; the level and term are set in §20 after V-05 reports.

- The account: 50 employees, single registration set, ₹5,500/month ex-GST, first-year revenue 50 × ₹110 × 12 = **₹66,000** (§18.14's illustrative account).
- Monthly accrual at 15%: 0.15 × ₹5,500 = **₹825**. Twelve months: **₹9,900** — 15% of first-year revenue, by construction.
- Read as CAC, not margin: ₹9,900 against ₹66,000 of first-year revenue, before the four-line COGS stack (EV-088) and before any assisted-sale cost. Whether that clears payback depends on the retention the account shows, which is why no channel revenue is modelled before V-05 and why the blended payback rule in §18.14 is the constraint, not the percentage.
- Clawback shape: if the tenant churns inside `partner_stickiness_days`, the held entries reverse. With a stickiness window of 60 days — the published reference (r3/03) — churn in month 2 reverses two accruals of ₹825 = ₹1,650; churn in month 7 reverses nothing, which is the exact reason the window's length is a commercial parameter and not a detail.
- A per-transaction cap does nothing at this ACV — 15% of ₹66,000 is far below any plausible cap — and everything at the top of the Scale band. The cap exists for the account we have not sold yet.

#### Negative cases

| # | Case | Required behaviour |
| --- | --- | --- |
| GTM-TS-34 | Partner claims a tenant that signed up 8 months before the partner was approved | Declined; the tenant's creation timestamp and immutable source predate the partner ID |
| GTM-TS-35 | Partner-sourced tenant enters dunning and never pays | No accrual ever posts, because accrual is on collected revenue |
| GTM-TS-36 | Partner-sourced tenant pays annually in advance and churns in month 4 with a refund | Accrual on the collected amount, then clawback on the refund, both visible on one statement |
| GTM-TS-37 | Commission parameters change mid-term | Closed accruals unchanged; the new set applies from its own effective date; the agreement names which set applies |
| GTM-TS-38 | Partner terminated with 3 tenants live | Tenants unaffected; accruals run to the committed term; no service change, no re-papering forced on the tenant |
| GTM-TS-39 | A white-label payroll service provider's client wants to see our brand | The tenant-level branding entitlement is the partner's to set; the request routes to the partner, and the agency-economics decision (§18.18) is what makes that acceptable |

---

### 18.27 The pricing golden-case corpus

§22 keeps a golden-case regression corpus for statutory rules. The rating engine needs the same thing for the same reason: a price change reaches every tenant at once (P9), and the only cheap way to know a price book version is safe is to re-run a fixed set of cases and compare rupee for rupee. This is that corpus. Every expected figure below is arithmetic on the section's own illustrative ₹110 PEPM and the 18% GST rate held in `gst_rate_saas` — both **[Hypothesis]** — so the corpus is regenerated, not hand-edited, when §20 sets the real level. What it fixes permanently is the *shape* of each case.

| # | Case | Input | Expected output | What breaks if it is wrong |
| --- | --- | --- | --- | --- |
| **GC-01** | Flat File month | 20 employees, all full-period | Subtotal ₹2,200.00; GST ₹396.00; total ₹2,596.00; `minimum_billable_quantity` = 0 asserted | The no-seat-floor promise (P6) |
| **GC-02** | Sub-20 tenant electing File | 1 employee, full period | Subtotal ₹110.00; GST ₹19.80; total ₹129.80 | "Bill actual headcount from employee one" (P6) is untrue at the boundary it is named for |
| **GC-03** | Proration | 49 full-period + 1 joiner on day 12 of 30 | Lines ₹5,390.00 + ₹69.67; subtotal ₹5,459.67; GST ₹982.74; total ₹6,442.41 | P2's no-cliff promise becomes unverifiable on an invoice |
| **GC-04** | Top of the File band | 199 employees | Subtotal ₹21,890.00; GST ₹3,940.20; total ₹25,830.20 | The band boundary silently mis-rates |
| **GC-05** | Crossing into Scale | Census closes at 200 | The crossing period rates at the File rate — ₹22,000.00 — and the taper applies from the next period (T5) | A tenant is re-rated mid-period, which P9 forbids |
| **GC-06** | Registration line | 4 registrations, allowance 2 | Line quantity exactly 2, listed by type and identifier; the rupee figure is the parameter, which is unsized | The multi-registration line is the mechanism that recovers the dominant COGS line (EV-088) |
| **GC-07** | Annual prepay | 50 employees, annual, discount at an illustrative 20% — the verified market reference is Zoho's uniform 20% on base and overage (r3/03) | Gross ₹66,000.00; discount ₹13,200.00; net ₹52,800.00; the discount posts as a `term_discount` grant, not as a price edit | Realised-versus-list (V-03) becomes uncomputable |
| **GC-08** | Place of supply | Subtotal ₹5,500.00, recipient in another state, then the same recipient in ours | IGST ₹990.00; or CGST ₹495.00 + SGST ₹495.00. Same subtotal, same total, different split, resolved from the rule table | Every out-of-state invoice is defective (§18.13) |
| **GC-09** | Short payment by TDS | Customer pays the invoice less the tax they deducted | No dunning event; the shortfall reconciles against the TDS credit statement; the rate and threshold are parameters, so the case asserts behaviour, not an amount | A correctly-behaving customer receives a collections notice (GTM-TS-15) |
| **GC-10** | Replay after change | Re-rate GC-03 after the tenant changes plan, state and headcount | Identical to the paisa: ₹5,459.67 | P9 fails, and no billing dispute can be closed from the product |
| **GC-11** | Filed-but-exited | Zero active employees; 3 people appeared in the month's statutory artefacts | 3 billable lines under B-09; subtotal ₹330.00 | The anti-gaming rule fails and the invoice can fall below the filing work performed |
| **GC-12** | SLA credit note | Settled claim at an illustrative one-month cap on the GC-03 tenant | A credit note referencing the original invoice, posted as an `sla_credit_note` grant; the tax treatment follows the rule table, whose citation is routed to §20 with the other GST items | An SLA settlement silently becomes a discount and the SLA-loss metric (§19) is understated |
| **GC-13** | Grandfathered card | Tenant on a superseded price book version; list changes | The tenant rates on the pinned version until its own term boundary; the scheduled step is visible for the full notice period | P8's grandfathering promise (§18.10) is broken on the first price change |
| **GC-14** | Competitive shape | The same 50-employee tenant expressed on each of the four card shapes in §18.20 | ₹5,500.00 / ₹2,495.00 / ₹2,499.00 / ₹4,000.00, from components only, with no code path per shape | P7 fails and a competitive response needs engineering |
| **GC-15** | Rounding | 31-day period, joiner on day 12 | ₹70.97 per the two-decimal half-up policy; lines sum exactly to the printed subtotal | Invoices that do not add up, which is the fastest way to lose a finance buyer (§18.6) |
| **GC-16** | Dual-entity person | One person with active assignments in two legal entities of one tenant, 20 other employees | Two census lines, one billable at ₹110.00 and one suppressed at ₹0.00 with `counted_in_sibling_entity`; subtotal ₹2,310.00 | B-08 fails and one human is billed twice inside one tenant — the exact overcharge P6 exists to remove |
| **GC-17** | Sub-20 File election with registrations above the allowance | 8 employees electing File, 5 registrations, allowance unsized | Platform fee ₹880.00; the registration line applies at 8 employees exactly as at 200, with the registrations listed by identifier | The registration line is silently treated as a large-tenant feature, and the multi-state small employer — the case §18.3 says our value is largest for — is mis-quoted |

Corpus discipline, borrowed from §22 rather than re-invented: every case is a fixture with a stored input and a stored expectation; a price book version cannot move to `published` until the corpus passes; a failure is a release blocker, not a warning; and a *deliberate* change to an expectation requires the same two named people as the version itself, with the reason recorded. A new case is added whenever a defect escapes to an issued invoice — the corpus grows by failure, which is the only way a regression corpus stays honest.

#### Index of scenario tests by subsection

The scenario tests scattered through this section are indexed here so a build team can find them without re-reading the prose:

| Range | Subject | Subsection |
| --- | --- | --- |
| GTM-TS-01 to GTM-TS-10 | Billable-headcount census, proration, anti-gaming | §18.19 |
| GTM-TS-11 to GTM-TS-18 | Dunning, the artefact floor, disputes | §18.21 |
| GTM-TS-19 to GTM-TS-27 | SLA claims, causation, caps, carve-outs | §18.23 |
| GTM-TS-28 to GTM-TS-33 | Parallel run and the diff taxonomy | §18.25 |
| GTM-TS-34 to GTM-TS-39 | Partner attribution, the commission ledger, termination | §18.26 |
| GC-01 to GC-17 | Rating-engine golden cases | §18.27 |

---

### 18.28 Named parameters, owners and §20 routing

Every value this section needs but does not have is a named configurable parameter with an owner, no shipped default and a route. The rule is the document's standing one: where the ledger and the research do not give a number, the specification names a parameter rather than inventing precision (§02). This table is the single register for §18's parameters, including those introduced earlier in the section, so that nothing is set by accident in code.

| Parameter | What it controls | Owner | Why no default ships | Route |
| --- | --- | --- | --- | --- |
| `file_tier_pepm` | The File tier's per-employee-per-month rate | Pricing owner | Only the *shape* is evidenced; the level needs the bureau price and realised ARPU | §20 V-01, V-03 (H-P2) |
| `file_tier_ramp_schedule` | Whether and how the marginal rate declines inside 20–199 | Pricing owner | The crossover arithmetic (§18.24) says flat is probably wrong; the schedule needs deal data | §20 V-03 (H-P18) |
| `included_registrations_per_tenant` | Registrations inside the per-head fee | Pricing owner | Sized from supervised minutes per filing per registration | §20 V-26, §22.7 (H-P13) |
| `multi_registration_line_price` | Price per registration above the allowance | Pricing owner | Same dependency | §20 V-26 (H-P13) |
| `instances_per_year` | Filing instances a registration generates | Compliance operations | Central cadences fixed; state cadences not captured | §20 V-09 |
| `supervised_minutes_per_instance` | Attended-session minutes per filing | Compliance operations | Not yet measured | §20 V-26 |
| `loaded_operator_cost_per_minute` | Fully loaded operator cost | Finance | Our own hiring, never a market figure | §20 |
| `rejection_rework_minutes_per_year` | Rework on rejected, revised and supplementary instances | Compliance operations | Measured off the filing state machine | §19, §20 V-26 |
| `sla_remedy_cap_months` | Per-incident remedy cap, in months of platform fee | Pricing owner with counsel | Credibility of a capped remedy is itself untested | §20 V-07 instrument, V-16 (H-P11); §23 |
| `sla_annual_cap_months` | Annual remedy cap per tenant | Pricing owner with counsel | Same | Same |
| `sla_dispute_window_days` | Window for a tenant to dispute an attribution or a cap | Pricing owner | No evidence sets it | §20 |
| `billing_proration_basis` | `calendar_days`, `period_fraction` or `snapshot_date` | Pricing owner | Buyers reason differently and the choice is a commercial one | §20 V-16 |
| `billing_rounding_policy` | Line and invoice rounding for billing only, never payroll | Billing engineering | Held separate from §08's payroll rounding by design | §20 |
| `annual_prepay_discount_pct` | Term discount on the rate and the registration line | Pricing owner | Market references run 16.9–20.2%; our level is untested | §20 V-03 (H-P12) |
| `renewal_notice_days` | Notice before a scheduled renewal step | Pricing owner | No evidence sets it | §20 |
| `tier_stepdown_periods` | Consecutive periods below 200 before Scale steps down | Pricing owner | No evidence sets it | §20 |
| `dunning_retry_schedule` | Debit retry attempts and spacing | Finance with Billing engineering | Depends on the mandate rails' own regime | §20; §18.13's RBI e-mandate read |
| `dunning_grace_days` | DUNNING to READ_ONLY | Pricing owner | Needs our own collection data | §20 (H-P21) |
| `readonly_window_days` | READ_ONLY to CLOSED | Pricing owner | Same | §20 (H-P21) |
| `post_closure_retention_days` | Export availability and the win-back window after closure | Pricing owner with §14's retention classes | Must not be set without the retention-class design | §14, §20 |
| `gst_rate_saas` | GST rate applied to our invoices | Finance | 18% as vendors disclose it today; confirm against the current rate notification | §20 |
| `einvoice_turnover_threshold`, `einvoice_reporting_window_days` | When our own invoices need IRN and QR, and how fast | Finance | Read from current notifications before build | §20 |
| `inbound_tds_rate`, `inbound_tds_threshold` | Customer TDS on our invoices | Finance | The 2025-Act provision is not in our evidence | §20 |
| `card_emandate_afa_exempt_ceiling` | Card recurring-payment behaviour | Finance | Read from current RBI directions before build | §20 |
| `partner_commission_pct`, `partner_commission_term_months` | Channel share and its term | Pricing owner | Only two vendors publish anything; neither is a default | §20 V-05 |
| `partner_commission_cap_per_transaction`, `partner_deal_size_bonus` | Ceiling and kicker | Pricing owner | Same | §20 V-05 |
| `referral_attribution_window_days`, `partner_stickiness_days`, `deal_registration_window_days` | Attribution, clawback and protection windows | Pricing owner | Market references exist for two of the three; none published for deal registration | §20 V-05 |
| `partner_tier_reevaluation_months` | Partner tier re-evaluation cadence | Partner manager | No basis to set it before the programme runs | §20 V-05 |
| `referred_customer_credit`, `partner_setup_fee_assignable` | Channel-funded customer credit; whether implementation fees are the partner's revenue | Pricing owner | Same | §20 V-05 |
| `max_supervised_minutes_per_filing_cycle` | The automation target the allowance is sized against | Compliance operations with §13 | Derived, not chosen — it is the output of the COGS model | §13, §20 V-26 |

Two standing rules govern this register. **No parameter in it may be given a default in code as a placeholder**, because a placeholder default becomes a shipped price the first time someone forgets — which is the failure mode the banned-numbers list (§20.4, §18.17) exists to prevent. And **every one of them is read by the rating engine from the price book version, not from configuration files**, so that a change to any of them is a versioned, two-person-reviewed publish with a rollback (P9, GTM-021), and so that every invoice ever issued can name the values it was rated under.

---

### 18.29 Free-tier fair use, and the tenant-splitting problem the size gate creates

P1 gates the Free tier on headcount at the statutory line, which is the cleanest gate available — and which creates one specific exposure that a feature gate would not: **a 38-person employer can run two tenants of 19 and never pay.** Kredily's unlimited-headcount free tier has no conversion trigger at all (§18.2); ours has exactly one, and it is a number the customer controls. This subsection specifies what we do about it, and what a free tenant is allowed to cost us, because the Free tier is funnel spend and unbounded funnel spend is not a funnel.

#### The splitting vectors, and the response to each

| # | Vector | What it looks like | Response |
| --- | --- | --- | --- |
| S-01 | One employer, two tenants, same legal entity | Two tenants whose PF establishment code, ESI code or TAN match | **Blocked at creation.** A registration identifier is unique across tenants; the second tenant is refused with a named reason and an invitation to merge. This is a data rule, not a policy |
| S-02 | One employer, two tenants, two legal entities of one group, genuinely separate registrations | Two entities, two PF codes, one owner | **Permitted, and correct.** These are genuinely separate employers with separate filing obligations. The group may consolidate voluntarily for the allowance's benefit (§18.3), which is the incentive that resolves it |
| S-03 | One employer splitting employees across two tenants with one registration | Employees in tenant B appear in tenant A's ECR | **Detected, not blocked.** The filing ledger carries the registration; a person filed under a registration that belongs to another tenant raises a review, because it is also a statutory record problem, not only a billing one |
| S-04 | Employer keeps 19 on the platform and runs the rest on a spreadsheet | Census stays at 19; the establishment's own register and filings say otherwise | **Surfaced to the customer, never enforced against them.** The product shows the mismatch between the census and the establishment's filed member count and explains the risk; it does not lock anything. An employer under-reporting to a statutory authority is not a problem we adjudicate |
| S-05 | A CA creates many small tenants to keep a book free | Many tenants, one console user, all under 20 | **Permitted and expected** — it is the CA channel working as designed (§18.7). The conversion happens per client at their own crossing, which is why the console's value is the compliance calendar and not a discount |

The rule the table encodes: **we block what is a data error, detect what is a record problem, and surface what is the customer's own risk.** We do not build enforcement that punishes a lawful structure, because the same structure — a group with genuinely separate registrations — is the one the multi-registration line exists to serve.

#### What a free tenant may consume

Free is generous by design (P1) and every rupee it consumes has no revenue behind it. The bounds:

| Resource | Bound | Why |
| --- | --- | --- |
| Assistant and other model calls | Per-tenant and per-user rate limits, enforced, not advisory | The limits are P0 in §13 precisely so a free tenant cannot run up inference cost against no revenue |
| WhatsApp messages | Business-initiated messages are metered from the first one; employee-initiated conversations are free inside the 24-hour window (EV-088) | The cost line is per message and the window is the only free path |
| Human support | Self-serve and assistant-deflected; a free tenant that needs a human is nudged to self-serve or to convert (§18.6) | A supported free tenant is unit-negative and there is no expansion path below 20 to pay for it |
| Storage and retention | Full statutory retention applies — a Free tenant's registers and artefacts are subject to the same floor as a paid tenant's (§18.21) | The obligation is the employer's regardless of what they pay us, and the floor is not a paid feature |
| Attended submission | None. This is the gate | It is the one thing Free withholds (P1), and the only thing it withholds |

Acceptance criteria:

1. Registration identifiers — PF code, ESI code, PTRC, PTEC, TAN — are unique across tenants; a collision is refused at creation with a named reason and a merge path (S-01).
2. Free-tier rate limits are enforced at the call site, are visible to the tenant before they are hit, and degrade the assistant rather than the payroll: **no rate limit may ever block a payroll run, a statutory artefact or an export.**
3. The census-versus-filed-members mismatch (S-04) is a notice to the tenant, never a block and never a report to anyone else.
4. Negative case: no dark pattern at the gate. A Free tenant approaching 20 sees a countdown and a plain statement of what turns on (§18.2 P1, §18.6), not a degraded product designed to force the decision early.

#### Test scenarios

| # | Scenario | Required behaviour |
| --- | --- | --- |
| GTM-TS-40 | Second tenant created with the same TAN as an existing tenant | Refused at creation; reason names the identifier and offers the merge path |
| GTM-TS-41 | Group creates two tenants with two genuine PF codes | Permitted; the consolidation offer explains the allowance arithmetic (§18.3) |
| GTM-TS-42 | Free tenant exhausts its assistant rate limit on the 28th | Assistant degrades; the payroll run, the artefacts and the export are untouched |
| GTM-TS-43 | Free tenant's census is 19 while its ECR for the month carried 31 members | Mismatch surfaced to the tenant admin with an explanation; nothing is blocked and nothing is escalated outside the tenant |
| GTM-TS-44 | Free tenant crosses 20 mid-month | Countdown had already fired; conversion is available in-product; the current month completes on Free and File arms from the next full period (T4) |

---

### 18.30 The published price card as a controlled artefact

P3 makes publishing the price a competitive weapon: Keka's suppression is global across its India, US and UAE pages and the rate card survives only in HTML comments (EV-021, EV-024), Darwinbox and PeopleStrong sell on quote, and only Zoho Payroll completes a purchase online among the vendors checked (r3/03). Publishing is therefore a position we take against the field — which means the card is a controlled artefact with an owner, a version and a clearance record, not a marketing page someone edits.

#### What the card must contain

| Element | Requirement | Basis |
| --- | --- | --- |
| Per-band price, GST-inclusive and GST-exclusive | Both columns, monthly and annual | Indian list prices are quoted ex-GST and disclosure is uneven across the market (r1/08) |
| Headcount slider | Renders the exact fee for every *n*, including below 50, and the marginal cost of employee *n+1* | GTM-002, GTM-003; P2 and P6 |
| Registration input | Renders the registration line before checkout | GTM-004; §18.3 |
| Setup fee | Stated as ₹0 by default, explicitly | Setup fees are an admitted but unquantified norm — Keka's own two pages contradict each other and neither quantifies one (EV-025); Pocket HRMS confirms an unquantified implementation fee (r5/03) |
| Term and renewal | Term length, notice period, and that renewal steps are scheduled and visible in advance | P8; the contrast with a contract reserving an increase at renewal (EV-025, K-17) is a positioning fact, but it is stated about *our* terms, never as an attack on theirs |
| SLA scope | Covered obligations, submission modes offered per portal, exclusions and the remedy cap | GTM-007; §18.23. Every word is a customer-facing legal claim with a named owner (Part D-20, §23) |
| Statutory liability | That it stays with the employer and deductor, plainly | K-13; the one sentence that must never be softened for conversion |
| What is fenced | Form 138 Q4 and Form 130 Part B, with what replaces them today | EV-046; a fence disclosed before the sale is a credibility asset and after it is a dispute |
| Capture dates | On every comparative statement | §21's competitor-claim rule |

#### Publication control

1. **One source.** The card renders from the published price book version (§18.20). A number cannot appear on the card that the rating engine would not charge; a divergence is a release blocker, not a content fix.
2. **Versioned and dated.** Every published card carries its version and publication date, and superseded versions are retained. We know what we published and when, which is the same discipline we rely on when reading a competitor's archived card (EV-022).
3. **Cleared.** Any comparative claim, any SLA wording and any statement about liability carries a clearance record naming the reviewer before the CMS will publish it (GTM-006; Part D-20).
4. **Change log.** Price changes are announced on the card itself with their effective date, and the installed base is grandfathered to its own term boundary (§18.10, P8). A silent card change is indistinguishable from a withdrawn card to anyone watching us the way we watch Keka.
5. **Never suppressed.** Withdrawing live prices while leaving them in the page source is the specific behaviour the evidence caught (EV-021), and it is the behaviour our published-price position exists to exploit. If we ever move off a published card, we remove it cleanly and say why — the half-measure is worse than either choice.

#### Negative cases

| # | Case | Required behaviour |
| --- | --- | --- |
| GTM-TS-45 | A campaign page states a price that differs from the price book | Blocked at publish; the CMS renders prices only from the price book version |
| GTM-TS-46 | A comparative claim cites a competitor price captured eleven months ago | Blocked; the clearance record requires a fresh capture before use (§21) |
| GTM-TS-47 | Sales asks for a "from ₹X" formulation that omits the registration line | Refused: the card's promise is the exact fee, and a floor price with an undisclosed line is the pattern §18.13's predictability requirement exists to avoid |
| GTM-TS-48 | A price increase is published without a change log entry | Blocked; the entry and the effective date are part of the publish, and the installed base's scheduled step is generated from them |

---

### 18.31 Keeping the comparison true — the competitor price capture protocol

§18.12 and §18.24 are only as good as their capture date, and this market has already produced two false readings from bad method. The protocol below is an operating requirement with an owner and a cadence, not a research note, because every one of those tables is a customer-facing claim the moment it enters a battle card (§18.11, §21).

**[Verified] the two failure directions.** Rendering and raw fetch fail in *opposite* directions here, so either alone produces contradictions: rendering hides Keka's rate card, because the prices live inside HTML comments that a browser never paints; raw fetch hides Qandle's, because its price spans are empty and filled by JavaScript from a country-keyed config file. Zimyo returns HTTP 403 to a plain fetch and genuinely requires a browser. The strongest source for a JavaScript-injected card is the vendor's own pricing config file (r5/03).

#### The protocol

| Step | Action | Why |
| --- | --- | --- |
| 1 | Fetch raw HTML and scan comment nodes | Recovers suppressed cards (EV-021) |
| 2 | Render and read | Recovers JavaScript-injected cards and confirms what a buyer actually sees |
| 3 | Where prices are injected, read the vendor's own pricing config | The strongest source; it is how the full Qandle card was recovered (r5/03) |
| 4 | Click the monthly and annual toggles rather than inferring from DOM order | Annual and monthly cards differ materially — Qandle's implied annual discount is 16.9–20.2% against an advertised "Save upto 25%" (r5/03) |
| 5 | Record the block size, the overage rate and the minimum billing language verbatim | The block is what the 20-employee column turns on (EV-026) |
| 6 | Record the trial and setup-fee language verbatim, including contradictions | Keka's own two pages contradict each other on setup fees on the same day (EV-025) |
| 7 | Never quote a competitor's price for a third party | Pocket HRMS's own page states greytHR's entry price as ₹3,495 on a day greytHR's own page published ₹2,495 (r5/03). Two vendor pages disagreeing is the reason competitor-cited pricing corroborates only loosely and is never primary; the divergence is recorded as a method fact and is never repeated as a claim about either vendor (§21) |
| 8 | Stamp the capture date, the method used and the byte-level anchor where one exists | A claim without a capture date cannot clear §21 |

#### Cadence, ownership and triggers

- **Owner:** the pricing owner, with the same two-person review the price book itself uses (P9). A capture recorded by one person is a draft.
- **Cadence:** a full re-capture of the six priced vendors before any release of the published card or of any comparative collateral, and on a standing interval set in §20 — not "when someone remembers", because the comparison is load-bearing for H-P2, H-P3 and H-P14.
- **Event triggers that force an immediate re-capture:** a vendor's card changes shape (a block becomes per-employee, which is exactly the open question on Keka's ₹90 rate — r5/03); a vendor withdraws or restores live prices; a vendor announces a free tier; an acquisition changes a counterparty, as MYND's acquisition of Qandle did (EV-034) and as G2's acquisition of Capterra, GetApp and Software Advice did on the marketplace side (§18.18).
- **Set completeness is itself a risk.** The most consequential error in this dimension was an omission, not a mistake: greytHR — which claims 30,000+ companies (EV-091), publishes a complete rate card and the only per-module add-on prices in the set, and supplies the strongest evidence on statutory filing — was absent from earlier rounds entirely, and its inclusion changed the price floor, strengthened the seat-floor finding to six of six and refuted the claim that Qandle was the floor (r5/03). The standing instruction is therefore to ask what has never been searched for, and to treat the vendor set as provisional (§21's competitive-question register).

#### What the protocol may and may not produce

| Permitted | Prohibited |
| --- | --- |
| "Vendor X's published card on date D states Y" | "Vendor X's published data is wrong" |
| Our own arithmetic on their published block and overage, labelled as ours (§18.24) | Presenting our arithmetic as their published figure |
| An archived card, labelled archived, with its snapshot date (EV-022) | An archived card presented as a current price |
| A recorded contradiction between two of a vendor's own live pages, quoted verbatim (EV-025) | A conclusion drawn from that contradiction about the vendor's intentions |
| "We are not aware, as of September 2026, of any vendor that …" | "No vendor does …" |

The last row is the rule that keeps the strongest finding in this section usable: no vendor in the six-vendor priced set *claims* to submit any filing, and greytHR's payroll page — the most compliance-forward in the set — uses only generation language, with "filing", "e-fil", "TRACES" and "EPFO" appearing zero times (EV-030, r5/03). That is strong evidence of positioning and it is not proof of absent capability, because the search covered marketing and product surfaces, not documentation or a live tenant. Collateral says the former and never the latter.

---

### 18.32 Open pricing decisions — options, criteria and who decides

Seven decisions in this section are genuinely open. They are recorded here with their options and the criterion that settles each, rather than being resolved by assertion, because each one moves the whole model and none of them can be settled before the §20 programme reports. This register is the companion to §18.16: the hypotheses table says what must be *validated*; this table says what must be *chosen*.

| # | Decision | Options | Criterion that settles it | Owner | Gate |
| --- | --- | --- | --- | --- | --- |
| **D-P1** | The shape of the File-tier ramp | (a) flat PEPM across 20–199; (b) declining marginal rate inside the band; (c) flat to 50 then declining | The crossover arithmetic (§18.24) says flat leaves us the most expensive card in the set above 50. Choose on realised win-rate by headcount decile against ACV, not on the arithmetic alone — (b) trades against the registration line, which pushes the multi-state tenant's price the other way | Pricing owner | V-03, H-P18 |
| **D-P2** | How the registration allowance is expressed on the card | (a) a count of registrations the buyer self-assesses; (b) derived by us at quote time from the establishment set; (c) bundled into band pricing with no visible line | (a) keeps the card self-serve and is the position taken; (b) is the fallback if buyers cannot state their own count (H-P20); (c) re-hides the cost driver the allowance exists to surface and is rejected unless (a) and (b) both fail | Pricing owner | H-P13, H-P20, V-26 |
| **D-P3** | The CA relationship | (a) referral — CA keeps the client and the advisory fee, we take platform PEPM; (b) agency/reseller — CA is the customer of record at a channel rate; (c) both, by partner class | (a) is the intended model. The criterion is the V-05 reading: the channel works only if CAs see leverage rather than disintermediation, and the contract structure — including what it does to the written authority to act (§22) and to ICAI's rules on a member's commercial arrangements — is under counsel review | Pricing owner with counsel | V-05, H-P5; §23 |
| **D-P4** | Whether the remedy is capped at all | (a) capped in months of platform fee; (b) uncapped; (c) no monetary remedy — submission, maintenance and evidence only | (b) is uninsurable and unmodellable (§18.3). If buyers will only value an uncapped remedy, the honest move is (c) with a re-tested price, not a larger cap (§18.23). Settled by the V-07 instrument extended to the SLA premium, plus counsel on allocation and insurability | Pricing owner with counsel | H-P11, V-07, V-16; Part D-17, §23 |
| **D-P5** | White-label for payroll service providers | (a) offered on agency economics only; (b) not offered; (c) offered on standard economics | White-labelling hides our brand at the Free→File moment, which is the conversion the whole funnel is built around (§18.15). (a) is the position; (c) is rejected unless the channel's volume demonstrably exceeds the brand cost, which only V-05 can show | Pricing owner | V-05 |
| **D-P6** | The proration basis | (a) `calendar_days`; (b) `period_fraction` — half a month for a mid-month joiner regardless of month length; (c) `snapshot_date` — whoever is active on a stated day | (a) is the proposed default and the one the worked arithmetic in §18.19 uses; (b) is simpler to explain and mis-charges across 28-, 30- and 31-day months; (c) is the simplest of all and the easiest to game in both directions. Settled on what the V-16 buyers say they can reconcile, not on what is easiest to implement | Pricing owner | V-16 |
| **D-P7** | Whether the entity's own PTEC counts toward the allowance | (a) PTRC only; (b) PTRC and PTEC; (c) PTRC, with PTEC bundled free | The two are separate registrations (§06.4), so (b) is the literal reading and (a) understates a multi-state tenant's count by up to a factor of two. The criterion is whether the PTEC generates supervised minutes on the same order as the PTRC, which §20 V-26 measures; the card must state the answer either way, because an unstated basis makes every multi-state quote ambiguous | Pricing owner with compliance operations | V-26, H-P13 |

Three further decisions are **not** open and are recorded here so they are not reopened by a deck: there is no seat floor on the File tier, ever (P6, §18.17); payroll computation and artefact generation are never held back for a higher tier (EV-028, §18.4); and no statutory liability is assumed in any tier, at any price, under any contract (K-13, §23).

---

### 18.33 Trigger-event detection — turning the statutory calendar into pipeline

§18.6 asserts that the highest-intent acquisition moments are statutory and that "GTM instruments to detect and target each". That assertion is worth nothing without a specification of which signal detects which trigger, what action follows, and what we are not allowed to do with the signal. This subsection supplies it. It is also where the funnel's central constraint bites: **the money is made at a conversion whose timing the customer controls** (§18.15), so the only lever we hold is being installed and being present at the moment.

| Trigger | Signal we may use | Where the signal lives | Action | Constraint |
| --- | --- | --- | --- | --- |
| **Crossing 20 — EPF turns on** | Our own tenant's census approaching and crossing 20 | The census (§18.19) | Countdown in-product from a configured distance, then the "here is what turns on" conversion flow (T4) | In-product only for the tenant's own data. No outbound campaign built from another tenant's data, ever |
| **The competitor's own cliff at 11** | Public knowledge of the competitor's published gate, plus our own inbound search and content traffic | Marketing, not customer data | Content and campaign aimed at the band, never at a named company's customer list | The claim about the competitor's gate carries its capture date (§21) |
| **A statutory format break** | Our own watcher output — the compliance pipeline's corrigendum and amendment feed (§22) | Rule objects and their publish history | Content the day the change is known; in-product notice to affected tenants; a named-format campaign where the break is public, as Form 138 replacing 24Q is (EV-051) | Never state a break we have not read at the source; the fence for the unreleased Q4 format (EV-046) is disclosed alongside it |
| **A failed or late filing under their current setup** | Only what a prospect tells us, or what their own records show in a parallel run (§18.25) | Prospect-supplied | Position on remediation and evidence, not on their embarrassment | We do not infer another party's compliance status from any external source, and we never state one |
| **The November 2026 ESI regime uncertainty** | Our own reading of the instrument, held as an open item (§06.9, EV-004, §20 V-08) | Rule objects, fenced | Explain what is known, what is unresolved and what we will do either way | A regime whose resolution is unknown is described as unknown. Selling certainty we do not have is the fastest way to lose the compliance-led position |
| **Bureau fee sticker shock** | Prospect-supplied, in the sales conversation or the V-01 instrument | Prospect-supplied | The fixed-versus-variable argument (§18.13), never an attack on the CA (§18.11) | The bureau band is **[Hypothesis]** until V-01 reports; no collateral quotes a bureau price as a fact |
| **A registration added — a new state establishment** | Our own tenant's establishment records | §07, §14 | Offer the registration line before the first obligation falls due (§18.3); refuse if the state dataset is unpublished (GTM-028) | The refusal is honest and immediate, not discovered at the first filing |
| **Headcount crossing a product-surface threshold** — 10, 50, 100, 300 | Our own tenant's establishment worker counts | §06.1, §18.4's derivation table | Surface the obligation that has arrived, with the entitlement already derived | These are **not** price tiers (§18.4) and must never be presented as an upsell |

#### Acceptance criteria

1. Every trigger above is a named event in the funnel instrumentation (GTM-051), emitted whether or not anyone acts on it, so that the conversion rate from each is measurable rather than assumed.
2. In-product triggers fire from the tenant's own data only. There is no cross-tenant profiling, no aggregate that identifies a tenant, and no outbound use of one tenant's data to target another. The AI layer's disclosure and consent machinery (§12) applies unchanged to any model call that touches a trigger.
3. A trigger notice states the obligation and its source, and links to the fence where one applies. A notice that creates urgency without naming what changed is a dark pattern and fails review.
4. Negative case: no trigger notice may assert a legal consequence — a penalty amount, a deadline we have not read at the source, or a statement that the customer is non-compliant. Those are legal claims with a named owner (Part D-20, §23), and most of the underlying figures are parameters with no shipped default (§06, §18.28).
5. Negative case: the countdown to 20 must not degrade the Free product as it approaches (§18.29's dark-pattern rule).

#### Test scenarios

| # | Scenario | Required behaviour |
| --- | --- | --- |
| GTM-TS-49 | Free tenant's census goes 18 → 19 → 20 across three months | Countdown from the configured distance, conversion flow at the crossing, the current month completing on Free (T4), and the event emitted at each step |
| GTM-TS-50 | A tenant adds a Tamil Nadu establishment | Registration line quoted before the first obligation; if the local-body dataset is unpublished, the honest refusal with the waitlist (GTM-028, §18.3) |
| GTM-TS-51 | A format break publishes mid-quarter | Affected tenants notified with the rule version and its effective date; the notice names what we absorbed and what remains fenced |
| GTM-TS-52 | Marketing requests a campaign list of tenants near 20 for outbound calling | Refused at the data layer for tenants that are not ours to market to that way; permitted only as in-product messaging to the tenant's own admins |

---

### 18.34 The multi-registration account, quoted end to end

§18.3's second worked example names the multi-state tenant as where our value is largest. §18.24 shows that it is also where our sticker price is worst. Both are true, and a build team and a sales team both need the whole quote in one place rather than the two halves in two subsections. This is that quote. Our figures are **[Hypothesis]** at the illustrative ₹110 PEPM (H-P2); competitor figures are arithmetic on their published block and overage prices, captured 5 Sep 2026 (EV-022, EV-027, r5/03).

**The account.** 120 employees, three establishments — Karnataka, Maharashtra, Tamil Nadu — one legal entity, EPF and ESI obliged, PT in all three states, LWF where it applies.

#### The registration set, counted

| Registration | Count | Note |
| --- | --- | --- |
| PF establishment code | 1 or 3 | One if the establishments file under a single code; three if each carries its own. The tenant knows; the quote must ask |
| ESI code | 1 or 3 | Same |
| PT registration — PTRC (to deduct) | 3 | One per state (§06.4) |
| PT registration — PTEC (the entity's own) | up to 3 | A separate registration from the PTRC; the card must say whether it counts them (§18.3) |
| TAN | 1 | One deductor |
| **Total** | **9 to 13** | Against an allowance of `included_registrations_per_tenant`, unsized |

#### The monthly invoice

| Line | Arithmetic | Amount ex-GST |
| --- | --- | --- |
| Platform fee | 120 × ₹110 | ₹13,200.00 |
| Multi-registration line | (9 to 13 − `included_registrations_per_tenant`) × `multi_registration_line_price` | Parameter; unsized (H-P13) |
| Subtotal | | ₹13,200.00 + line |
| GST at `gst_rate_saas` (18% as disclosed today) on ₹13,200.00 alone | 13,200 × 0.18 | ₹2,376.00 |
| Total on the platform fee alone | | **₹15,576.00** |

#### What the same 120 employees cost on the published cards

| Vendor and card | Arithmetic | Monthly ex-GST | Effective PEPM |
| --- | --- | --- | --- |
| Zoho Payroll STANDARD (annual) | 1,000 + 95 × 40 | ₹4,800 | ₹40.00 |
| greytHR Essential | 2,495 + 70 × 45 | ₹5,645 | ₹47.04 |
| Qandle FOUNDATION (annual) | 2,450 + 70 × 49 | ₹5,880 | ₹49.00 |
| Kredily Payroll OS | 1,249 + 95 × 50 | ₹5,999 | ₹49.99 |
| Pocket HRMS Standard (annual) | 2,995 + 70 × 60 | ₹7,195 | ₹59.96 |
| Zimyo Basic | 120 × 80 | ₹9,600 | ₹80.00 |
| Keka archived FOUNDATION | 9,999 + 20 × 90 | ₹11,799 | ₹98.33 |
| HROne Basic | 4,950 + 70 × 99 | ₹11,880 | ₹99.00 |
| **Us — File [Hypothesis]** | 120 × 110 | **₹13,200** | **₹110.00** |

At 120 employees we are the most expensive option in the entire set, above even Keka's archived card, and the registration line widens the gap. That is the fact the pitch has to survive, and pretending otherwise inside the company is how a sales team discovers it in front of a prospect.

#### Expressing the premium per statutory event

The premium over the cheapest published suite card — greytHR Essential — is ₹13,200 − ₹5,645 = **₹7,555 a month**, or **₹90,660 a year** ex-GST. Set that against what the tenant owes: §18.3's worksheet counts **56 to 102 dated statutory events a year** for exactly this establishment set (41 central, 14 to 36 state PT, 1 to 25 LWF). The premium is therefore:

- ₹90,660 ÷ 102 events = **₹889 per dated statutory event** at the high end of the event count;
- ₹90,660 ÷ 56 events = **₹1,619 per event** at the low end.

The same arithmetic for the single-state 50-employee account of §18.3: ours ₹5,500/month, greytHR Essential ₹2,495/month — a premium of ₹3,005 a month or **₹36,060 a year**, against 42 to 65 events, which is **₹555 to ₹859 per event**.

Two things this reframing does, and one it must not do. It converts an unanswerable "why are you 2.4× the cheapest card" into a question the buyer can actually price — is carrying this filing to portal acceptance, under a maintained-compliance SLA with a causation record, worth roughly ₹900 to ₹1,600 a filing event to you? — and it is the form the V-07 instrument and the V-16 interviews should test (H-P3). It also exposes the multi-state tenant's real economics honestly: the per-event premium *falls* as the event count rises, which is precisely why the multi-state case is where the argument is strongest even though the sticker gap is largest. What it must not do is become a per-filing price on the card: per-filing pricing is rejected for the three reasons in §18.3, and this is a *framing* of a per-head fee, never a meter. Any collateral that renders it as a rate card has changed the pricing model by accident.

#### Edge cases in this quote

| # | Case | Required behaviour |
| --- | --- | --- |
| GTM-TS-53 | The tenant cannot say whether its establishments share one PF code | The quote asks and does not guess; the registration count is derived from the establishment records once they exist (GTM-004), and the quote is provisional until they do |
| GTM-TS-54 | Tamil Nadu's local-body PT slabs are not captured | Checkout refuses that state's registration with a named reason and a waitlist (GTM-028); the rest of the quote proceeds. Selling it and fencing it afterwards would breach the SLA's first commitment |
| GTM-TS-55 | Maharashtra's return periodicity is reassigned by the department mid-year | The cadence is ingested, never derived (§06.4); the filing calendar changes, the invoice does not. The tenant is told before the first affected due date |
| GTM-TS-56 | The tenant opens a fourth establishment in a state we already serve | The registration line moves pro rata from the month the registration first generates an obligation (§18.3); no retroactive re-rating (P9) |
| GTM-TS-57 | The tenant consolidates two PF codes into one | The line falls at the next period; the filing ledgers for both codes remain intact and unbroken (Part E-10), because a billing simplification may never break a statutory record |

---

### 18.35 What §18 depends on, and what it hands over

Pricing is downstream of almost everything in this document and upstream of two things. Naming both directions keeps the dependencies honest: several requirements here are unbuildable if an upstream object does not exist in the shape assumed, and two downstream sections are unbuildable if this one does not deliver.

#### What this section consumes

| Input | From | Used by | Failure mode if it is not there |
| --- | --- | --- | --- |
| Employment events, assignments, establishment and registration records | §07, §14 | The census (§18.19), the registration count (§18.3) | The census becomes hand-entered, which destroys P6's auditability and every anti-gaming rule |
| The filing ledger and filing state machine, including REJECTED | §08 FR-PAY-711, Part E-10 | Anti-gaming rule B-09, SLA causation (§18.23), the CA console calendar (§18.7) | "A filed person is a billed person" cannot be computed, and no SLA claim can be adjudicated |
| Rule-object versioning and effective dating | §14, §15 | Invoice replay (P9), the parallel run's period-correct rule basis (§18.25) | Replay and retro-recompute correctness both fail, and the SLA's central promise is unsupportable |
| Supervised minutes per filing per registration | §22.7, §20 V-26 | Registration allowance sizing (§18.3) | The allowance and the line stay unsized indefinitely and H-P13 cannot be resolved |
| The four-line COGS stack | §13, EV-088 | Unit economics (§18.14), the allowance, D-P1 | Any margin statement is a margin on one input — the error K-02 retracted |
| State PT and LWF datasets, per state | §06.4, §06.8, §20 V-09 | Checkout refusal (GTM-028), the parallel run's state scope, the multi-state quote (§18.34) | We sell coverage we cannot maintain, which breaks the SLA at its first commitment |
| Attended-submission modes and the written authority | §22, Part D-17 | The SLA scope on the card (GTM-007), H-P15, the console's billing modes (§18.7) | The tier's headline promise is sold before its legal basis is cleared |
| Retention classes and erasure mechanics | §14, EV-054 | The artefact floor (§18.21), `post_closure_retention_days` | Closure either destroys records the employer needs or keeps data with no basis |

#### What this section delivers

| Output | To | Why they need it |
| --- | --- | --- |
| The billable-headcount census definition and the B-01 to B-18 table | §19 | Every per-tenant metric with a headcount denominator uses this definition or reports a different number from the invoice |
| The funnel events and their definitions (GTM-051) | §19 | The funnel is instrumented, not forecast — no external benchmark exists for CAC, cycle length, win rate or free-to-paid conversion in this market (r3/03) |
| The SLA claim lifecycle, causation table and remedy computation | §19, §23 | §19 specifies the compliance SLA as a metric and a commitment; §23 owns the liability language the claim workflow must not exceed |
| The parameter register (§18.28) with owners | §20 | Every unsized commercial value routes to the validation programme with a named owner rather than acquiring a default in code |
| The open decisions register (§18.32) | §20, §01 | The decision summary and the validation programme both need what is chosen, what is fenced and what is still open |
| The channel instrumentation and commission ledger requirements | §16, §19 | Attribution and the offline claim path are product surfaces, not spreadsheets |
| The competitor capture protocol (§18.31) | §21 | The competitive section's claim-clearance rule needs a method that produces clearable captures |

One dependency is worth stating as a risk rather than as a table row. **The registration allowance cannot be sized before §22's time-and-motion capture reports, and the price card cannot be published without the allowance.** That is a hard sequencing constraint between a commercial artefact and an operational measurement, and it is the concrete reason §18.16's standing rule — no PEPM enters a contract before V-01 and V-03 report — has a third precondition that is easy to forget. It is recorded here so that the card is not published on two of three inputs.