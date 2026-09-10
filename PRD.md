Product Requirements · India

# Filing-First HRMS

An AI-native HR and payroll system for Indian employers of 20–200 people, where **the statutory filing — not the payslip — is the unit of delivery**. AI is architecture and cost of goods, not the revenue line.

**Draft** 1 · 4 Sep 2026 **Evidence** 2 sweeps · 38 agents **Retractions** ~90 across both rounds

Read this first

This document contradicts two premises of its own brief, and says so where it does. The brief asked for an *AI-first* HRMS spanning *SMB through enterprise*. The evidence supports neither as written: seven vendors have already set the market price of HR AI to zero, and Indian enterprise procurement is arithmetically closed to a new entrant for roughly three years. Both findings are argued in place — §1 and §8 — rather than quietly designed around. Everything else follows from taking them seriously.

## Evidence register and confidence ledger

Two research sweeps ran against this market. The first produced a confident narrative that the second largely dismantled — **28 named strategic conclusions were killed outright**, and roughly ninety individual claims were retracted across both rounds. Every retraction moved in the same direction: smaller, later, more contested, already occupied.

That one-directional pattern is itself the most important finding. It means the research process had systematic optimism bias, not random error. **Every claim still sitting at medium or low confidence came from the same generator that produced ninety one-directional mistakes and should be haircut accordingly.**

So this PRD carries provenance inline. Three markers appear throughout:

 **[Verified]** — Primary source, survived hostile re-check

Gazette notification, government statistic, filed financial statement, or a vendor's own page captured in a rendering browser. Safe to build on and safe to say out loud.

 **[Hypothesis]** — Plausible, unvalidated, carries a kill criterion

Reasoning from verified inputs, or inference from supply-side data. Not yet contradicted — but not evidence. Every one of these appears again in §15 with a named validation method.

 **[Killed]** — Was believed, now disproven

Recorded deliberately so it does not get resurrected in a later deck. §14 lists the specific numbers that must never re-enter a model.

### Standing rule

No compliance or competitive claim ships to a website, deck, or contract without a gazette, notified-rule, filing, or regulator citation captured with URL and date. Two independent rounds of careful primary-source work reached *opposite* conclusions on the November 2026 EPF cliff because one read a notification without checking whether a corrigendum had amended it. **"Check for a corrigendum" is a non-negotiable step**, not a nicety.

## Scope decision, and what we are declining

The brief specified SMB, mid-market and enterprise together, with the full module suite. On the evidence, that is not one product and arguably not one company. This section makes the case; the decision remains the reader's.

### Commit: 20–200 employees, with 50–200 carrying revenue

| Band | Verdict | Why |
| --- | --- | --- |
| < 10 | **Decline commercially** | Marginal price is zero and three credible vendors set it there. Kredily is free forever at unlimited headcount *with* PF/ESI/PT/TDS calculation; Zoho Payroll is ₹0 to 10 employees; Zoho People is ₹0 to 5 users. A paid-only product is dead on arrival. |
| 10–20 | **Acquisition only** | Real statutory obligation exists here — but ACV lands at roughly ₹18,000–30,000. Serve it free as a funnel, not as a revenue line. |
| 20–200 | **Beachhead** | EPF turns on at 20. The bureau alternative is a real ₹3,000–15,000/month budget line. Tally and CA channels are live. This is where obligation, budget and dissatisfaction overlap. |
| 200–2,000 | **Expansion** | Reachable from the beachhead with the same product shape. Private-sector only at first. |
| 2,000+ | **Defer, with entry criteria** | Different pricing shape, channel, competitive set and assistant strategy. See below — the gate is documentary, not technical. |

### Why enterprise cannot be a launch segment

This was tested against real tenders rather than assumed.

 **[Verified]** — SBI's HRMS RFP is unwinnable on arithmetic, not merely eligibility

Criterion 7 requires a prior HRMS implementation at an Indian institution of **minimum 30,000 employees**, outside the startup-relaxed range. The harder lock is the Appendix-T scoring matrix — 150 marks weighted toward incumbency.

 **[Verified]** — The startup exemption is a permission for buyers, not an entitlement for bidders

GFR 2017 Rule 173(i) exempts DPIIT-recognised startups from prior experience and turnover, and Rule 170(i) from EMD — but only if *the buyer writes it into the bidding document*. This is the pivotal legal fact of the segment.

Indian Bank's June 2026 HRMS RFP relaxes turnover for startups but leaves a three-year floor in two independent places. Criterion 8 carries no relaxation at all.

 **[Verified]** — Certification carries a seasoning clock on top of acquisition time

Indian Bank requires ISO 27001:2022 (or CMMI L3 / ISO 20000 / ISO 9001) to have been **held for at least one year prior to RFP publication**. Acquiring it the month before a bid is worthless.

Consequence for month zero

Start ISO 27001 immediately, even though no customer is asking. Acquisition takes 3–6 months; the seasoning clock adds twelve. To be useful at month 18 it must be in hand by about month 6. **It is the cheapest year you will ever buy**, and it cannot be bought later at any price.

### The honest restatement of the beachhead

An earlier draft called 20–50 a "competitive vacuum." That is wrong and the PRD must not repeat it. Zoho Payroll serves 25 at ₹1,000/month, HivePayroll 25 at ₹1,499, RazorpayX 20 at ₹2,499, and Kredily serves it free.  **[Hypothesis]**

The defensible version: **the band is over-served by cheap product and under-served by product that actually files.** That moves the wedge from availability to quality-of-delivery — which is a harder claim, and a better one.

## Market sizing, on a denominator that survives audit

Every published analyst figure for India HR tech was retracted or downgraded across both rounds. The most widely circulated number in Indian press — $23.32bn growing to $38.36bn — is almost certainly a *global* figure mislabelled as India, and carries no attribution.  **[Killed]**

What replaces it is a bottom-up model on a government denominator.

7,66,254EPFO-contributing establishments, FY2023-24

7.37 CrContributing members (UANs)

96.2Mean contributing employees per establishment

3.2×Registered PF codes vs contributing — two-thirds dormant

 **[Verified]** — Use contributing, never registered, establishments

EPFO shows 24,18,266 registered establishments against 7,66,254 contributing as on 31.03.2024. Any TAM built on registered codes overstates the addressable base by roughly 3×.

 **[Killed]** — The 6-crore-MSME framing, permanently

Udyam's 5.31 crore registrations are not employers with payroll obligations. Using them as a denominator inflates the market by two orders of magnitude. Banned from every deck.

### Actual current spend, from filed accounts

Eleven Indian HRMS entities have filed revenue totalling **₹1,374 Cr**. Grossing up for unfiled and foreign vendors puts real annual India HRMS software spend at **₹2,100–3,900 Cr** (USD 0.24–0.45bn).  **[Verified]** That is the market as it exists — not as an analyst projects it.

| Vendor | Latest filed revenue | Result | Read |
| --- | --- | --- | --- |
| **Keka** | ₹133.86 Cr FY25 (+55%) | −₹80 Cr FY24 | Best-capitalised pure-play. FY24 staff cost alone was **137% of revenue**. Sits squarely in our beachhead. |
| **ZingHR** | ₹150 Cr FY25 | +₹1 Cr | The only profitable vendor in the set — barely. 0.80% EBITDA margin, 1.21% ROCE. |
| **PeopleStrong** | ₹301.99 Cr FY25 (+10%) | Loss-making | Valued at ₹1,200 Cr — **4.0× revenue**, the only India HRMS transaction multiple recoverable from public sources. |
| **Akrivia** | ₹30.67 Cr FY24 (+20%) | — | Absent from round one entirely. |
| **factoHR** | ₹25.76 Cr FY25 (+12%) | — | Version Systems Pvt Ltd. |

For scale calibration: greytHR's own claimed 34,000 customers represent roughly **4.4%** of the 7.66 lakh contributing establishments. That is what market leadership looks like here — and it is a useful ceiling on any share assumption.  **[Verified]**

Two numbers not to ship

A "~41,000 named accounts in the 200–999 band" target does not survive: EPFO Appendix-2(v) measures 173,250 *registered* establishments above 200 accounts against 41,881 *contributing* above 200 employees — a 4.1× gap depending on which you pick. And the sensitivity table's 10% CAGR ceiling is ₹10,905 Cr, not ₹12,250 Cr; that figure was overstated by 12.3%.

## The statutory step function is the product spine

India's four Labour Codes came into force **21 November 2025**, and final Central Rules under all four were notified **8 May 2026**.  **[Verified]** An earlier draft called the rules "still draft, therefore unsettled, therefore urgent" — that framing was four months stale. The story inverts: this is not "be the guide through chaos," it is **"build against a settled spec."**

Obligations turn on at headcount thresholds. The product's feature gates should mirror them exactly, because the customer's problem changes at precisely these points.

1**From employee one, no threshold:** TDS u/s 192 with quarterly return and annual certificate · Shops & Establishments registration · minimum wages · prescribed-format appointment letter (new since 21 Nov 2025)

10**ESI · gratuity accrual · maternity benefit.** The 10-employee test reads "on any day of the preceding twelve months" — so it latches once crossed.

20**EPF · grievance redressal committee.** Only EPF is genuinely absent below 20.

50**Crèche facility.**

100**Works committee.**

300**Retrenchment and closure approval** — raised from 100 by the new Codes.

This kills the premise that a sub-20 company has no obligation worth software.  **[Killed]** It also corrects two overstatements from round one: Employee's Compensation is *not* a blanket sub-10 liability (the Second Schedule limits it to largely hazardous and mechanical occupations), and the 40+ health check-up is confined by the notified Rules to docks, mines and construction, in permissive language.

### The November 2026 cliff

Time-critical · ~78 days from research date

**The EPF Act 1952 is repealed with effect from 21 November 2025.** Code on Social Security s.164(2)(b) saves the EPF Scheme 1952, EDLI 1976, EPS 1995 and all ESI rules and schemes for *one year* — expiring on or about **21 November 2026**.

The EPF side has a named successor: the **Employees' Provident Funds Scheme, 2026**, with 12% re-notified retrospectively to 21.11.2025 by S.O. 3582(E). Build against Scheme 2026. **The ESI side is unresolved** and needs an answer before the date.

Trap for anyone re-verifying: indiacode.nic.in's bare-Act footnote still reproduces the uncorrected S.O. 5319(E) enumeration. Verifying against indiacode or the original gazette alone reproduces this exact error — which is how round one concluded the opposite.

### The hardest single calculation in the build

 **[Verified]** — The 50% wages add-back

Identical text in Code on Wages s.2(y) and Code on Social Security s.2(88): if excluded components exceed one-half of all remuneration, the excess is deemed wages and added back. This re-bases PF, gratuity and more.

**It creates two different wage bases on the same payslip.** The add-back base excludes conveyance, HRA, award settlements and overtime; the equal-pay and payment-of-wages base includes them. The engine needs at least two concurrent wage computations per employee, per period.

The statute says "or such other per cent as may be notified" — so 50% is a standing variable, not a constant. This is the permanent justification for effective-dating, independent of any transitional argument.

Requirement: the wage-definition rule must be **versioned, effective-dated, and retrospectively recomputable with an audit trail**. Arrears and retro runs must recompute against the rule version in force for the period being corrected, not the version in force today.

### TDS: a breaking file-format change already in flight

 **[Verified]** — Form 138 replaces 24Q, and the record layout is a breaking change

Challan sub-headings 301–312 remap to A–K with 303 deleted. Annexure I 313–327 remaps to C–N with 313, 321, 322 and 325 removed. Surcharge, Education Cess and Penalty/Others are deleted; Interest Allocation and Others Allocation are added. Q1–Q3 v1.2 shipped 22 July 2026; correction-statement structures published 4 August 2026.

**The Q4 regular file format does not exist yet.** That is the annexure feeding Form 130 (ex-Form 16) Part B — so the annual certificate cannot be fully built until it lands.

## The price floor, and a written "why not X" for each free alternative

The single most consequential correction across both rounds: **the floor is zero, and it is defended by well-capitalised incumbents.** Any pricing conversation that does not start here is fiction.

| Alternative | Price | What it already does | Why not it |
| --- | --- | --- | --- |
| **TallyPrime**  
The real incumbent | ₹0 incremental  
₹22,500 Silver perpetual | Statutorily complete: PF Forms 3A/5/6A/10/12A + ECR, ESI 3/5/6, PT statement, Form 16, 24Q with Annexures I–II, 27A, 12BA, NPS, gratuity. Included in the base licence. | **A feature-parity pitch loses.** Win on what Tally structurally cannot do: filing-as-a-service, an employee surface, a mobile app, a CA console, and maintained statutory updates. |
| **Kredily** | ₹0 forever  
unlimited headcount | PF, ESI, PT and TDS calculation in the free tier. | Challans, Form 12BB and Form 16 are paywalled. The filing layer is the real boundary — but only against Kredily and Frappe. |
| **Zoho Payroll** | ₹0 to 10 emp  
₹1,000/mo, 25 incl. | Free tier **already includes** investment-declaration and proof workflow, plus bank salary payouts. | These were named as our P0 differentiator. Against Zoho they are table stakes.  **[Killed]** |
| **Zoho People** | ₹0 to 5 users  
then ₹48/user/mo | **Zia AI ships in the cheapest paid tier at ₹48.** PeoplePlus names an AI agent as an entry-tier feature. | Entry price is ₹48, not ₹96. Round one anchored a full tier too high, understating Zoho's aggression by 2×. |
| **Frappe HR** | ₹0 self-host  
from ₹410/mo cloud | India Payroll v16 ships **PT across 15+ states and LWF across 14**, free and open-source, with one-click EPF/ESIC/LWF registers, ECR and ESI returns. | Kills "multi-state PT and LWF is a differentiator."  **[Killed]** It is a gap against Tally only, and carries zero differentiation credit against the software field. |
| **CA / payroll bureau** | ₹3,000–15,000/mo | Runs the filings, carries the relationship, absorbs the judgement calls. | Not a competitor to displace — a **channel and a price anchor**. See §11. |

Assume Zoho goes to zero in the 1–25 band — it already has, twice over

Zoho Payroll is ₹0 to 10 employees, Zoho People ₹0 to 5 users, Zoho Books ₹0 below ₹25 lakh revenue. All three gate on a *size proxy*, not crippled features or a time limit — a shape that converts automatically as the customer grows. The question is not whether Zoho prices near zero but **when it widens the existing gates**. Do not build a plan that requires it not to.

**Section marked incomplete.** Keka's published INR tiers, seat minimums and AI posture remain unverified — TLS-blocked across both rounds. So do ZingHR, Zimyo, HROne, Qandle, Pocket HRMS and listed Ramco Systems. That is exactly the 20–500 band this PRD targets. No competitive claim about the beachhead is final until that sweep runs.

## Positioning: the filing is the unit of delivery

The buyer does not think in payslips. **ICAI's recommended fee schedule has no payroll-processing line item at all** — full-text search confirms it. What it prices is TDS return filing, PT registration, PT returns and TDS compliance review.  **[Verified]**

So the product's artefacts are filings, and its headline metric is filings completed on time:

-   Generated and filed **ECR**, **ESI challan**, **PT return**, **Form 138** (ex-24Q)
-   Issued **Form 130** (ex-Form 16)
-   Prescribed-format **appointment letter** and **wage slip**
-   The four consolidated **statutory registers**, electronic, five-year retention

State the limit plainly: this is **parity with Zoho** and differentiation only against Frappe, Kredily and Tally. It is a strong position against the actual incumbent — a spreadsheet, Tally, and a CA — and a neutral one against the best-funded software competitor.

 **[Verified]** — An unclaimed adjacency worth noting

Aparajitha/Simpliance — India's largest labour-compliance organisation, owner of a software suite including payroll, SOC 2 and ISO 27001 certified — makes **no AI or ML claim anywhere**. The deepest statutory dataset in the country has no intelligence layer on it.

## Pricing architecture  **[Hypothesis]**

Nothing in this section is validated

No real quote, invoice, won deal or renewal figure exists anywhere in the research. Every competitor number is *list price*, mostly at exactly 50 employees, excluding GST, setup fees and term discounts. Realised ARPU is unmeasured. **No number here may enter a financial model until the quote programme in §15 reports.**

What the evidence does support is *shape*, not level:

 **[Verified]** — Size gate, not feature gate

All three Zoho India free tiers gate on a size proxy rather than crippled features or a time limit. That shape converts automatically as the customer grows. Kredily made the opposite choice — unlimited headcount, features withheld — and has no conversion trigger.

 **[Verified]** — The cliffs are the attack surface

Zoho Payroll jumps ₹0 → ₹1,000/month between 10 and 11 employees. Zoho People jumps ₹0 → ₹48/user between 5 and 6. Those discontinuities are moments of forced re-evaluation. **Design a continuous ramp and do not reproduce them.**

 **[Hypothesis]** — Anchor on ₹80–150 PEPM, from two data points not three

Realised PEPM derived from filed revenue over claimed platform scale: **₹52** (greytHR, SMB) and **₹126** (PeopleStrong, enterprise). Both are biased downward because platform users exceed billed seats. The frequently-cited "₹99 Keka" figure is not usable — its provenance never resolved.

Two further shape decisions: **publish the price card** — every quote-only vendor spot-checked confirms the pattern, and self-serve INR pricing is the only way to be evaluable by a 30-person company that will not sit through a demo. And **taper above 200**, because Frappe's per-site model and Zoho's base-plus-overage both beat flat per-employee at scale.

## AI architecture and unit economics

The premise that Indian ARPU cannot fund AI is **wrong**, but with less headroom than first claimed. A disciplined six-agent architecture costs **₹0.15–3.27 per employee per month** against ₹50–150 ARPU — a 93–99% gross margin on inference.  **[Hypothesis]**

What is load-bearing here, and what is not

The **52.7× spread between the cheapest and dearest credible model on identical workload is load-bearing** — it is a ratio of two USD prices, so it survived every input correction including FX. The *absolute* per-employee figures are not: they derive from an engineering estimate of 23,675 input / 2,045 output tokens per employee-month that has no empirical basis. State the ratio as fact; state the absolutes as placeholders pending prototype instrumentation.

52.7×Spread between cheapest and dearest model, identical workload

₹94.43USD/INR, Sep 2026 — not ₹83.3. Every prior INR figure understated 13.4%

2×Gemini 3.x Flash price increase scheduled 1 Jan 2027

### Architecture requirements

 **[Verified]** — Rules-first, LLM-last — a correctness decision before a cost one

**No statutory or monetary figure may ever be model-generated.** A wrong payroll number is a legal problem, not a UX problem. Leave balances, PF computations, PT slabs and TDS all resolve deterministically; the model explains, routes and drafts — it never calculates.

 **[Verified]** — Model router is P0, not an optimisation

Because model choice *is* the margin decision, routing must be first-class: per-task cost ceilings, logged escalation, and the ability to re-point a task class at a different model without a deploy. At least three interchangeable backends.

 **[Killed]** — "Cache everything" would have caused real damage

Caching economics invert by provider and tenant size. Gemini charges *hourly cache storage*; a 50k-token per-tenant policy cache held continuously on Flash-Lite costs roughly **₹34.47 per employee at a 100-employee tenant, against ₹0.27 for simply paying full input price** — about 100× that tenant's entire inference bill. Caching is a per-provider, per-tenant-size policy, never a default.

 **[Verified]** — Per-tenant and per-user rate limits are P0

An HRMS is priced per employee but consumed per user. One heavy user can exceed the entire ARPU for that seat. Even Microsoft hard-disables agents at 125% of prepaid capacity. Budget, meter and degrade gracefully.

 **[Verified]** — Recruiting cost does not track headcount — meter it separately

A tenant hiring at 15%/month against one hiring at 3%/month is a 15× cost difference on identical PEPM pricing. greytHR already concedes the pattern by pricing Recruit per recruiter rather than per employee.

Model cost in INR with FX sensitivity at ₹90/95/100, and treat Gemini at 2× as the *base* case, not the downside — the increase is scheduled, not speculative.

## AI monetisation and the zero anchor

This is where the brief's framing has to change. **The market price for HR AI is zero**, established across seven independent vendors:

| Vendor | AI posture |
| --- | --- |
| greytHR | NAVOS agentic assistant, launched 3 Jun 2026 — **free on all paid plans** |
| Zoho | Zia in the cheapest paid tier, ₹48/user/month |
| Oracle | Bundled, with a zero-rated Basic tier |
| Microsoft | Zero-rated for Copilot seats |
| Workday | Complimentary allotment |
| 15Five | Bundled into the $11 tier |
| Culture Amp | Bundled into every band |

Meanwhile the two most prominent Indian AI stories are *unshipped*: Darwinbox Cortex is early-access with no GA date and two non-Indian design partners; Keka AI's primary and closing CTAs are both "Join the waitlist."  **[Verified]**

The repositioning

**AI is cost of goods and an acquisition weapon. Payroll accuracy, statutory compliance and filings are the revenue thesis.** An AI-first product is still the right thing to build — the architecture, the deflection economics and the employee experience all depend on it. But it cannot be the price story, because the price of HR AI has already been set to zero by people with more capital than us.

So: bundle the assistant into the base plan. Monetise only where the unit of value is legibly incremental — **recruiting per requisition or per hire** (metered separately, since its cost does not track headcount), **bulk document generation**, and an **HR-analyst copilot per admin seat**.

Build full token, cache and cost attribution per tenant, user, agent and model **from v1, while the price is still zero**. Retrofitting attribution after pricing exists is far harder than building it before.

One caution on defensibility: there is *no evidence* that shipping an MCP server has changed a single buying decision, and the MCP adoption statistics circulating in round one were unverifiable and are banned.  **[Killed]** Darwinbox already ships Cortex into Teams, Copilot, Slack and Glean. If enterprise buyers converge on Copilot as the assistant, the HRMS becomes an MCP data source and AI differentiation collapses to data quality and tool design. **Plan to own the data and the tools the assistant calls**, not the assistant itself.

## Residency, DPDP and provider abstraction

Two findings pulled in opposite directions across the sweeps. The synthesis neither stated: **residency is a segment-specific procurement gate, not a general-market differentiator.**

 **[Verified]** — For regulated buyers it is a hard contractual gate

RBI's Outsourcing of IT Services Directions impose data localisation, right-to-audit including by RBI itself, sub-contracting consent and exit obligations directly on any SaaS vendor serving a regulated entity — **with no turnover threshold**. SBI's RFP requires all data functions and processing within India. IRDAI mandates records in Indian data centres.

 **[Verified]** — AI architecture is therefore foreclosed by regulation, and the decision cannot be deferred

Residency is a **per-provider matrix**, and data-at-rest residency is a different guarantee from in-country inference — buyers ask about both. OpenAI offers India data-at-rest plus Bedrock for in-country inference; Anthropic offers neither, with a US-only immutable workspace geo; Vertex has an India region. Sarvam's hosting is unverified and must not be relied on until it is.

Requirement: **at least three interchangeable backends with residency selectable per tenant.** This is the same abstraction the model router needs for cost, so it is one piece of work serving two constraints.

### DPDP and CERT-In

-   **DPDP s.7(i):** employers do not need employee consent to process employee data for employment purposes. This removes the consent-UX friction GDPR-bound AI-HR products carry — a genuine structural advantage for building AI-first in India.  **[Verified]**
-   **CERT-In binds from day one, not at enterprise scale:** 6-hour incident reporting for every body corporate, 180 days of ICT logs retained *within Indian jurisdiction*, and clock sync to NIC/NPL NTP servers. Days of work now, a painful migration later.
-   **Attacks on AI/ML systems are an explicitly reportable incident class** — item (xx) of twenty. An AI-first product enlarges the reportable surface. Name a CERT-In point of contact before the first paying customer.

## Attendance, devices and the deskless worker

Attendance was in the brief and received zero research in round one. Indian mid-market deals are routinely won or lost on whether you talk to the customer's existing device fleet.

 **[Verified]** — Build the ADMS/WDMS push receiver in v1 — the best-evidenced call in the corpus

The dominant device-to-cloud path in India is outbound: the terminal HTTP-POSTs punch packets to a tenant-scoped URL. **No on-premise middleware, no static IP, no port forwarding.** eSSL and ZKTeco both support it. Architecturally trivial relative to its commercial weight; corroborated across four independent sources and unshaken by hostile re-checking.

 **[Verified]** — The device vendors are partners, not rivals

eSSL's own software is time-office and access-control, not an HRMS — and eSSL markets integration with six named HRMS vendors on its own site.

 **[Verified]** — Partner or buy for the long tail

A paid third-party connector market exists at roughly **$345 one-time to $588/year** — cheap enough that building in-house for SDK-bound brands, pre-ADMS firmware and air-gapped plant networks cannot be justified. The legacy port-4370 protocol is reverse-engineered, not documented, and behaves inconsistently across firmware.

 **[Killed]** — Do not size this work from the retracted failure rate

The "85–98% success, roughly 1 in 7 devices will not integrate" figure was marketing from the vendor selling the integration fix, and round one applied the floor of a range as a mixed-fleet average. **No replacement exists — device integration effort is currently unsized** and needs a hardware spike.

### Frontline constraints that shape the AI design

-   **Worker-initiated, not employer-push.** A new WhatsApp business portfolio can reach only **250 unique users per rolling 24 hours**, so a 5,000-worker site cannot be onboarded to push on day one.  **[Verified]**
-   **Design for shared devices.** Nine in ten non-users live in a phone-owning household — worker identity cannot be assumed to equal device identity. This is precisely why terminal integration is not optional for frontline segments.
-   **Meta's India rate card is unresolved.** BSP sources disagree materially (marketing ₹0.8631 vs ₹0.95; utility ₹0.1150 vs ₹0.15), a 6.3–7.5× range. Download the rate card before committing any per-worker price. A round-one claim that Meta begins charging for service messages in India on 1 Oct 2026 is **false** — that change applies to nine other markets.  **[Killed]**

### The attendance engine, per the notified Rules

8-hour normal day · 48-hour week · overtime at **twice** the regular rate · ceiling of **144 overtime hours per quarter** per worker · four registers in electronic form with five-year retention.  **[Verified]**

Highest-leverage cheap artefact identified

Ship a **public, model-level device compatibility matrix and a self-serve verification tool** before the first enterprise sales call. It neutralises deal-gating risk and no incumbent publishes one. Note also that greytHR prices GPS live tracking at ₹140/user/month against a ₹45 marginal seat rate — 3.1×. Location is monetisable and nobody looked.

## Channel, integrations and migration  **[Hypothesis]**

Migration is **a first-class product surface, not a services task**. Implementation friction is the most-cited churn trigger in the market, and mid-year cutover is where it concentrates: opening balances, YTD earnings and TDS already deducted, previous-employer income, investment declarations mid-cycle, certificate continuity across two systems, EPF UAN and ESI IP continuity, leave balances, gratuity accrual.

-   **Tally data-import path is P0.** It is the incumbent; the import is the wedge.
-   **Importers from Zoho Payroll, Kredily and Frappe are acquisition infrastructure**, not integrations. Budget them as such.
-   **A CA-facing console**: multi-client switching, per-client compliance calendar, one-click Form 138 and PT export, read-only audit access.
-   **MCP server** split three ways: ACL-inheriting read tools, idempotent audited approval-gated write tools, and per-tenant admin controls to disable specific tools per assistant.

Two channel assumptions carrying no evidence at all

"Design for the CA as a user" is the most consequential GTM recommendation in this document and **no CA has been asked a single question**. The Tally-partner channel is equally unvalidated. No revenue forecast may depend on either — or on the MCP server.

### Recruiting has a hard external dependency

 **[Verified]** — Info Edge owns the passive candidate graph, and does not licence it

Resdex search inside an ATS is available **only through Info Edge's own ATS** — Zwayam markets this as an exclusive. What a third-party ATS gets is job posting plus application sync against *the customer's own* Naukri contract, never database search. Corroborated across four independent vendors. Naukri publishes no developer API, no self-serve key and no partner documentation.

Right-size the moat: Naukri's 118M is an investor metric for total resumes. Resdex — the product recruiters actually buy — is described by Naukri's own FAQ as "over 50 million profiles."

**Answer:** a new entrant can build recruiting in India, but *inbound only*. Ship "bring your own job-board contract" as table stakes in v1 — multi-post to Naukri, LinkedIn, foundit, apna and Indeed from one requisition, with application ingest and dedup. Do LinkedIn's partner integration properly and early; it is the one large passive graph with a documented, certifiable path. **Forbid scraping explicitly** in architecture and in sales collateral — the only working Resdex extraction piggybacks a live authenticated session and is legal exposure for us and for the customer.

## Benefits attach: build the data model, defer the monetisation

The question was whether an Indian HRMS is secretly a distribution business. The answer, from the only listed pure-play: **at company level, yes — and that is a reason to stay out, not to go in.**

 **[Verified]** — Zaggle earns 5.3% of net revenue from software. The other ~95% is money movement.

FY26 gross revenue ₹1,852.8 Cr standalone, up 42.2%; PAT ₹132.9 Cr, up 51.9%. Program fees are explicitly interchange plus network incentives plus bank referral fees — **distribution rent on payment rails**, not software and not lending.

**But attach revenue is large while attach profit is not.** Zaggle gives back 67% of program-fee revenue as incentives and cashback; whole-company adjusted EBITDA is 9.9% of gross revenue, roughly ₹39 per user per month.

Reject free-HRMS-monetised-on-interchange

It means winning an incentive war against a listed incumbent with 19 bank partners and 50mn cards, using your own balance sheet for float, at 9–10% margins and 10% ROE — while Zaggle buys software at ~95% gross margin. Wrong side of every ratio.

Two round-one attach figures are **retracted and banned**: the ₹161/user/month "money movement per employee" (contaminated denominator — Zaggle's user count includes channel partners and customers-of-customers) and the "₹150–500 PEPM at a 1.5–5% take rate" band (take rate borrowed from a different company).  **[Killed]** Group health was also overstated by an order of magnitude: IRDAI puts India's commercial group health market at ₹61,435 Cr across 275mn lives — **₹2,233 per life per year**, against vendor claims of ₹10,000–25,000.

**What to do anyway:** build FBP declarations, wallet configuration, proof-of-spend, dependant records and endorsement history in v1. Retrofitting them into a shipped payroll engine is expensive, and they are the option value on the entire attach business. Model software PEPM and attach revenue as **two separate lines that are never blended**.

One dated timing window worth planning around: effective **1 April 2026**, the tax-free meal perquisite rose from ₹50 to ₹200 per meal and the gift/voucher threshold from ₹5,000 to ₹15,000 per year — roughly a 3.8× wallet expansion, available under the new regime.  **[Verified]**

## Statutory maintenance is the operating model

This is the largest unsized cost in the plan, and it has an org-design consequence the PRD must state honestly.

Reaching statutory parity with a free Frappe v16 and a zero-incremental Tally is a multi-year compliance-engineering effort. The recurring load never stops: annual Budget changes, wage-ceiling revisions, state PT slab updates, LWF schedules, and state rules under four Codes rolling out unevenly across states.

The uncomfortable implication

The correct response is to **invert the cost into the product**: sell the guaranteed-compliance SLA as the thing free alternatives cannot offer, because you cannot beat their feature depth cheaply. But that means the company must be structured as **a compliance-maintenance operation with a permanent statutory team — not a feature-velocity software startup.** It shapes hiring, release cadence, gross margin, and the kind of founder the company needs. Decide this deliberately.

The statutory-change watcher is the right product idea, but it must **catch amendments, not just new instruments**. A watcher keyed only to new notifications would have missed the corrigendum that inverted the entire November 2026 analysis.

## Non-goals and anti-recommendations

Each entry carries the evidence that killed it, so nobody resurrects it in a later deck.

 **[No]**

**Hardware.**Devices sell for ₹4,000–25,000 one-time and are already installed. No margin, no moat, and direct channel conflict with the dealer networks that could otherwise distribute for us.

 **[No]**

**Free HRMS monetised on interchange.**9–10% margins against a listed incumbent with 19 bank partners. See §12.

 **[No]**

**Premium AI SKU.**Seven vendors price HR AI at zero. A surcharge reads as a surcharge on an expected feature.

 **[No]**

**Cache-everything default.**Gemini's hourly cache storage makes explicit caching ~100× worse than no caching for sub-1,000-employee tenants.

 **[No]**

**Paid-only product below 10 employees.**Kredily is free forever at unlimited headcount with real statutory calculation.

 **[No]**

**Self-hosting for cost.**Serverless beats dedicated H100 by ~74× at real utilisation. Self-host only as a priced compliance SKU for named regulated accounts.

 **[No]**

**Scraping any candidate database.**Legal exposure for us and for the customer. §11.

### Numbers permanently banned from every model and deck

| Banned figure | Why |
| --- | --- |
| 6 crore MSMEs as TAM | Not employers with payroll obligations. Overstates by two orders of magnitude. |
| ₹37,500/year CA fee | ICAI schedule is pre-GST, carries Wealth Tax heads, at least nine years stale. A pricing recommendation was resting on it. |
| $400 Multiplier EOR | Fabricated — not present in its own cited source. Correct 2022 figure is $300. |
| ₹161 PEPM Zaggle attach | Contaminated denominator and numerator; take rate borrowed from another company. |
| 85–98% device success | Marketing from the vendor selling the integration fix. |
| MCP adoption stats | Unverifiable. No evidence an MCP server has changed a buying decision. |
| ₹83.3/USD | Wrong by 13.4%. Use ₹94.43 and treat FX as a strategic input. |
| Any Peoplebox funding figure | Its own Tracxn record self-contradicts on the same page. |

Also: remove **Alight** from the competitive set — it sold its payroll business to H.I.G. Capital in July 2024 and now positions solely around benefits administration. **Ascent HR** was wrongly inferred to have exited on a DNS lookup of a mistyped domain; it trades normally.

## Validation plan — what must be answered before funding

Two rounds of desk research answered what desk research can. These cannot be. **Gate any funding or headcount decision on this programme, not on this document.**

| # | Question | Method | Gates | Kill criterion |
| --- | --- | --- | --- | --- |
| 1 | **What does a CA or bureau actually charge** to run monthly payroll for 20, 50 and 100 people, in Class A and Class B cities? | Mystery-shop 6–8 CAs and bureaus across two city tiers | The entire pricing model | If the real price is under ₹2,000/month, the ₹80–150 PEPM anchor collapses |
| 2 | **What share of Tally's ~2.5m businesses actually enable the payroll module?** | 15–25 Tally partner interviews + buyer survey | Who the incumbent is | At ~5% Tally is not the incumbent and §4 is rebuilt; at ~40% it is the only one that matters |
| 3 | **Realised ARPU versus list price**, and the discounting behaviour behind it | Buyer and reseller interviews; won-deal figures | Every margin conclusion in §7 | If realised is 30–40% below list, the AI margin envelope compresses materially |
| 4 | **Real tokens-per-query** for HR agents against real policy corpora | Instrument a prototype before committing any price | All absolute AI cost figures | If actual is 5× the estimate, bundling AI free stops working at the low end |
| 5 | **Will CAs act as a channel**, and on what economics? | 20–30 practising CA interviews across both city tiers | The primary GTM motion | If CAs see us as disintermediation, the channel inverts into an opponent |
| 6 | **Keka and the unswept mid-market tier**: ZingHR, Zimyo, HROne, Qandle, Pocket HRMS, Ramco | Rendering-browser capture from a different network | All of §4 | Highest-value remaining desk task — no field work required |
| 7 | **Will Indian buyers pay anything for HR AI**, and for which agent? | Van Westendorp or conjoint, 30–40 buyers across 20–200 and 200–1,000 | §8 monetisation | If willingness is genuinely zero everywhere, drop the metered AI SKUs entirely |
| 8 | **What does the ESI regime become on 22 November 2026?** | Primary-source watch on ESIC and MoLE notifications | Payroll engine correctness | Time-critical — see §3 |

### Also undone, and cheap

A verified, gazette-sourced **Professional Tax and Labour Welfare Fund dataset for every state** — levy yes/no, slabs, gender variants, periodicity, registration, filing frequency, effective dates. Only Telangana was verified across two rounds. Aggregator PT data is materially disputed and at least one widely-cited 2026 table reproduces a superseded structure. This is undone work, not a blocker, and it is a build dependency.

## Risk register — triggers and responses

Each risk carries an observable trigger and a pre-agreed response, rather than a severity rating nobody acts on.

| Risk | Observable trigger | Pre-agreed response |
| --- | --- | --- |
| **Zoho widens its free gates** from 10 to 25 or 50 employees | Zoho Payroll pricing page changes its headcount ceiling | Beachhead floor moves up immediately; re-anchor on 50–200 and lean harder on filing-as-a-service and the CA console, which Zoho does not sell |
| **Gemini 3.x Flash doubles** | Scheduled 1 January 2027 — already known | Already the base case in §7. Router re-points affected task classes without a deploy |
| **Rupee depreciation** against USD-priced inference | USD/INR breaches ₹100 | Shift task classes to INR-denominated providers; Sarvam prices natively in INR. FX sensitivity is modelled at 90/95/100 |
| **Falsification in a Frappe v16 bake-off** | A prospect runs the comparison and finds parity | Never claim "more complete India compliance." Compete on maintained updates, filing execution and support SLA — the things an open-source project cannot contractually offer |
| **Fintech-subsidised HRMS** on the Jupiter/sumHR precedent | A neobank or card issuer acquires an HRMS and zero-prices it | Note the precedent valued the software asset at roughly ₹7.5 Cr — this is cheap for an acquirer. Defend on filing execution and switching cost, not price |
| **Uneven state-rule notification** under the four Codes | Multi-state customers hit conflicting state and central positions | Effective-dated rules per state from v1 — the data model must assume divergence rather than treat it as an exception |
| **Enterprise assistant convergence** on Copilot or Glean | Prospects ask for MCP access rather than our assistant | Already the planned posture: own the data and the tools, not the assistant. §8 |

Draft 1 · 4 September 2026 · Compiled from two adversarial research sweeps (38 agents, ~5.6M tokens) with a bias-check pass on every dimension. Roughly ninety claims were retracted across both rounds; all retractions moved in the same direction, so surviving medium- and low-confidence claims should be discounted accordingly.

Sections 6, 11 and parts of 4 are explicitly hypotheses. No pricing, business case, GTM or attach-revenue number in this document is validated. The programme in §15 is the gate.
