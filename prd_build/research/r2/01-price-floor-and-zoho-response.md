# [r2] price-floor-and-zoho-response

## Verification notes

METHOD: I re-verified every load-bearing number against primary sources, and crucially I did what the prior round said was impossible — I drove a RENDERING BROWSER (not HTTP fetch) against Zoho's client-side-injected pricing pages. That resolved four of the report's twelve open questions and falsified two of its three headline strategic recommendations.

WHAT I RESOLVED THAT THE REPORT LEFT UNKNOWN:
1. Zoho People India pricing, now PRIMARY-VERIFIED (rendered DOM, INR): Free ₹0 (forever free up to 5 users), Essential HR ₹48, Professional ₹96, Premium ₹144, Enterprise ₹192 — all "/user/month billed annually", local taxes/GST additional, 500+ users by quote. Monthly-billing equivalents decoded from the page's own data-price attributes: ₹60/₹120/₹180/₹240 (exactly 20% annual saving on every tier).
2. Zoho People free-tier cap = 5 users. The "53 users" the report flagged as an artifact was indeed an artifact; the real figure is 5.
3. Zia's tier gate = ESSENTIAL HR, the LOWEST paid tier (₹48/user/month). Extracted from the expanded feature matrix DOM, where "Zia AI bot" sits in the Essential HR feature block.
4. Zoho PeoplePlus India pricing: Premium ₹192, Enterprise ₹350 /user/month billed annually, minimum 5 users, and "AI agent" is a named key feature of the ENTRY (Premium) tier.

TWO HEADLINE RECOMMENDATIONS FALSIFIED — the PRD author must not act on the original versions:
A. "AI is an open flank / the un-followable axis / clearest whitespace." FALSE as stated. Zoho ships an AI bot in its cheapest paid HR tier at ₹48/user/month and an "AI agent" in every PeoplePlus tier. Zoho has a bundled-AI answer at a low price point. The claim survives only against Frappe and Kredily.
B. "Own the filing layer — the one capability the entire ₹0 floor does not give away." FALSE for Zoho, the actor that matters most. Zoho Payroll's ₹0 tier (≤10 employees) already includes "Proof of investments approval", "Reimbursement proof approval", "Automatic TDS worksheet", "Compliance - Income Tax, EPF, ESI, Statewise PT, LWF" AND "Online salary payments through HSBC" — i.e. both the declaration/proof workflow and money movement that the report claimed were universally paywalled. The ₹1,000/mo Standard tier adds statutory form generation with digital signature and TDS challan recording. The filing-layer opportunity is real against Frappe and Kredily ONLY.

ARITHMETIC: I recomputed every model. The report's own arithmetic is CORRECT where I could check it (Zoho Payroll Standard at 100 employees = (1000+75×40)/100 = ₹40; Frappe ₹410/100 = ₹4.10; ₹1,800/100 = ₹18). One derived comparison is WRONG: "Odoo is 4-8x Zoho People" — against the now-verified ₹48-192 band, Odoo Standard is 3.0x-12.1x (promo) or 3.8x-15.1x (list). Retracted and restated.

FABRICATED-PRECISION / CITATION FAILURES FOUND:
- Odoo India pricing was MISREAD. The report gave "Standard Rs 580-760/user/month yearly (Rs 725-950 monthly)" and "Custom Rs 890-1,140 yearly (Rs 1,150-1,420 monthly)". The page actually shows a promo-vs-strikethrough-list structure, not a range: Standard ₹580 annual promo (list ₹725), ₹950 monthly; Custom ₹890 annual promo (list ₹1,140), ₹1,420 monthly. The figures 760 and 1,150 do not appear on the page. Corrected.
- The Frappe "₹10 crore (~$1.35M) Rainmatter" figure was cited to the Zerodha z-connect announcement, and THAT PAGE CONTAINS NO AMOUNT. The number is real but comes from press coverage (Inc42, The News Minute, BW Disrupt), not the cited URL. Re-sourced; confidence held at medium.
- Kredily's $3.05M remains aggregator-only (Tracxn/Crunchbase/Dealroom), not filings. The $750K Fosun RZ Capital seed is independently corroborated by press. Held at medium; MCA verification still open.
- Kredily's "25,000+ companies / 10,00,000+ employees / ₹1,000+ Cr payroll" are vendor self-reported marketing. Downgraded to positioning claim, unverified.
- Frappe's "8.7K GitHub stars / 20,000 developers / 180 partners" are Frappe's own self-reported figures (GitHub still unreachable). Labelled vendor self-report, not independent fact. I also could not reproduce the report's customer list exactly — I saw Zerodha, IFTAS, Selco, Jiva, Lifelong, Vikram Tea, RTCamp; "HighFlyer" and "Anther Technologies" did not appear in my extraction.

CLAIMS THAT SURVIVED VERIFICATION UNCHANGED: Zoho Payroll India free ≤10 employees and all four paid tiers with overage rates (exact match); Zoho Books ₹25 lakh revenue-gated free plan and all five paid tiers; Frappe Cloud ₹410/₹1,800/₹5,400 and AGPL-3.0/"not per user"; Kredily's four plans and paywall boundary; Odoo's payroll localization list with India absent; all four Odoo third-party India payroll modules with exact publishers, prices and versions (exact match).

FRAPPE FILING GAP — CONFIRMED BUT NARROWED. Exact term search on the rendered page confirms "Form 16", "24Q", "gratuity", "challan", "declaration" and "proof" are all ABSENT, and confirms PT across 15+ states, LWF across 14 states, Version 16. But the report understated Frappe: the page DOES claim "ECR, ESI returns, and state LWF filings" — so Frappe has a filing story for EPF/ESI/LWF. The genuine gap is the INCOME-TAX YEAR-END layer (Form 16, Form 24Q, 12BB declarations/proofs) plus gratuity. Also, the literal string "TDS" does not appear on that page; the report's "TDS with surcharge and marginal relief" should read "income-tax surcharge and marginal relief", which is present verbatim.

ODD ARTIFACT, FLAGGED NOT RESOLVED: Zoho's India pages consistently render "Form 130" and "Form 138" as real text nodes (verified in raw innerHTML — no hidden elements, no truncation) on both the pricing and product pages, alongside a correctly-rendered "Form 12BB". These are not real Indian statutory forms and are almost certainly Zoho CMS corruption of "Form 16" and "Form 24Q", but I will not assert that. What IS assertable regardless of the digits: Zoho Payroll Standard includes statutory form generation with digital signature and TDS challan recording.

DID THE DIMENSION ANSWER ITS QUESTION? The "price-floor" half: yes, well, and its arithmetic holds. The "Zoho-response" half: it PARTLY DODGED. It declined to assert Zoho's actual HR pricing (the central input to any Zoho-response analysis) and substituted an SEO-sourced range, then built an Odoo comparison and a ₹150 threshold on top of that unverified range. That gap is now closed with primary data. It also found zero evidence of Zoho's stated strategic intent — that remains genuinely open.

HOW MUCH SHOULD A PRD AUTHOR TRUST THIS? The pricing tables are now solid — trust the numbers. Do NOT carry over the original AI-whitespace or filing-layer-whitespace conclusions; both were built on missing Zoho data and are corrected below. Treat every funding figure as directional only.

## Key findings (24)

### 1. [high] Zoho People India pricing, PRIMARY-VERIFIED in a rendering browser: Free ₹0 (forever free up to 5 users), Essential HR ₹48, Professional ₹96, Premium ₹144, Enterprise ₹192 — per user per month billed annually, exclusive of GST. Monthly billing is ₹60/₹120/₹180/₹240.

Rendered DOM of the India pricing page: 'Explore our FREE edition, forever free for up to 5 users.' and plan blocks reading 'ESSENTIAL HR ₹48 /user/month billed annually', '₹96', '₹144', '₹192'. Monthly figures decoded from each plan's own data-price attribute (Essential HR monthly index = 60, annual = 48), giving exactly 20% annual saving on all four tiers. Footer: 'Local taxes (VAT, GST, etc.) will be charged in addition to the prices mentioned.' 'Have more than 500 users? Ask for a price quote'. This SUPERSEDES the prior round's secondary ₹96-165 range and confirms itforsme.in while falsifying goforfiling.com.

Source: https://www.zoho.com/people/zohopeople-pricing.html

### 2. [high] The entry price for a real Zoho HR product is ₹48/user/month, not ₹96. The prior round's floor analysis was anchored one full tier too high, understating Zoho's aggression by 2x at the entry point.

Essential HR at ₹48/user/month billed annually includes onboarding/offboarding, employee database, document management, time-off management, HR reports and Zia AI bot. At 100 employees that is ₹4,800/month for core HR. The report's assumed ₹96 floor was the Professional tier, one step up.

Source: https://www.zoho.com/people/zohopeople-pricing.html

### 3. [high] FALSIFIES THE REPORT'S AI THESIS — Zia AI is bundled into Zoho People's LOWEST PAID TIER at ₹48/user/month, and PeoplePlus names 'AI agent' as a key feature of its entry tier. AI is not open whitespace against Zoho.

Expanded feature matrix DOM: the ESSENTIAL HR product block's feature list is ['Onboarding and offboarding','Employee database management','Document management','Time-off management (Leave)','HR reports','Zia AI bot']. Tiers are cumulative (each higher block lists only incremental features), so Zia AI bot is present from ₹48/user/month upward. Separately, the PeoplePlus pricing page lists 'AI agent' as the first key feature of Premium (₹192), its entry tier. The prior round recorded this as UNKNOWN and then built a headline recommendation on the assumption it was whitespace.

Source: https://www.zoho.com/people/zohopeople-pricing.html

### 4. [high] Zoho PeoplePlus India bundle pricing, PRIMARY-VERIFIED: Premium ₹192 and Enterprise ₹350 per user per month billed annually, minimum 5 users in a paid account. This is the all-in bundle number the product must be positioned against.

Rendered pricing page: 'Premium ₹192 /user/month billed annually — Simplified core HR management for fast-growing organizations' and 'Most Popular Enterprise ₹350 /user/month billed annually'. FAQ: 'You should have a minimum of 5 users in a paid Zoho People Plus account.' Premium's key features begin with 'AI agent'. Resolves the prior round's open question on PeoplePlus pricing.

Source: https://www.zoho.com/peopleplus/pricing.html

### 5. [high] FALSIFIES THE REPORT'S FILING-LAYER THESIS FOR ZOHO — Zoho Payroll's ₹0 free tier ALREADY includes the investment-declaration/proof workflow and bank salary payouts, both of which the prior round identified as the universal paywall boundary and a P0 differentiator.

Free plan (₹0, up to 10 employees) feature list read from the rendered pricing page: 'Automatic payroll calculation', 'Automatic payslip generation', 'Online salary payments through HSBC', 'Compliance - Income Tax, EPF, ESI, Statewise PT, LWF', 'Automatic TDS worksheet', 'Reimbursement proof approval', 'Proof of investments approval', 'Employee self-service portal', '40+ built-in payroll reports'. Money movement and proof-submission are therefore INSIDE Zoho's free tier, not behind it.

Source: https://www.zoho.com/in/payroll/pricing/

### 6. [medium] Zoho Payroll's ₹1,000/month Standard tier already occupies the statutory form-generation and challan layer. The filing-layer differentiation is available against Frappe and Kredily but NOT against Zoho.

Standard tier (₹1,250 monthly / ₹1,000 annual) incremental features include 'Form 130 generation with digital signature' and 'Form 138, TDS challan recording'. The product page adds 'Form 12BB', 'e-signature capability built-in', 'auto-generated statutory and tax reports' and coverage 'across 28 states'. CAVEAT: 'Form 130' and 'Form 138' are verified as literal text nodes in the raw innerHTML on two separate Zoho pages, are not real Indian statutory forms, and are most likely CMS corruption of Form 16 and Form 24Q — I do not assert that mapping. The assertable substance is that form generation with digital signature and TDS challan recording ship at ₹1,000/month.

Source: https://www.zoho.com/in/payroll/pricing/

### 7. [high] CONFIRMED UNCHANGED — Zoho Payroll India has a permanent FREE plan at ₹0 for up to 10 employees. The competitive-response scenario is not hypothetical, it is partially executed.

Independently re-verified this session via both HTTP fetch and rendering browser: 'FREE', '₹0', 'Free forever', 'upto 10 employees', 'Democratized payroll technology for startups and small businesses to run basic payroll'. Prices exclusive of GST.

Source: https://www.zoho.com/in/payroll/pricing/

### 8. [high] CONFIRMED UNCHANGED — Zoho Payroll India paid tiers (ex-GST): Standard ₹1,000/mo annual (₹1,250 monthly) including 25 employees + ₹40/₹50 per additional; Professional ₹3,000/₹3,750 including 50 + ₹60/₹75; Premium ₹4,000/₹5,000 including 50 + ₹80/₹100.

Exact match on re-fetch. Arithmetic recomputed and correct: a 100-employee firm on Standard annual pays (1,000 + 75×40)/100 = ₹40 per employee per month. The base-plus-overage structure means effective per-employee payroll cost FALLS with headcount.

Source: https://www.zoho.com/in/payroll/pricing/

### 9. [high] CONFIRMED UNCHANGED — Zoho has a documented precedent for pricing at zero in India to attack an incumbent: Zoho Books India has a ₹0 Free plan gated on annual revenue below ₹25 lakh, indefinitely.

Re-verified verbatim: 'As long as your revenue for the financial year does not exceed the threshold of 25 lakhs, Zoho Books's Free Plan is available indefinitely.' Paid tiers re-verified: Standard ₹899 monthly / ₹749 annual, Professional ₹1,799/₹1,499, Premium ₹3,599/₹2,999, Elite ₹5,999/₹4,999, Ultimate ₹9,599/₹7,999 per organization per month, exclusive of local taxes.

Source: https://www.zoho.com/in/books/pricing/

### 10. [high] CONFIRMED UNCHANGED — Frappe HR sets the true structural price floor: software is free and open-source (AGPL-3.0), and managed hosting is priced per-SITE not per-user, from ₹410/month.

Re-verified: Sites '$5 onwards /mo' / '₹410 onwards /mo'; Servers '$20 onwards /mo' / '₹1,800 onwards /mo'; Premium Servers '$125 onwards /mo' / '₹5,400 onwards /mo'. Explicit: 'pay only for what you use, and not per user!' and '100% Free and Open Source', 'AGPL-3.0 licensed'. Arithmetic recomputed: at 100 employees, ₹410/mo = ₹4.10 per employee; ₹1,800/mo = ₹18.00 per employee.

Source: https://frappe.io/hr/pricing

### 11. [high] CONFIRMED AND STRENGTHENED — Frappe HR's India Payroll is a separate open-source extension at Version 16 with genuinely deep state-level statutory coverage: Professional Tax across 15+ states, Labour Welfare Fund across 14 states, ESI with the raised disability wage ceiling, EPF including voluntary top-ups, plus income-tax surcharge with marginal relief and a tax-regime comparator.

Exact-string verification against the rendered page: 'Professional Tax across 15+ states with their individual slabs. You set the work state, and it deducts the right amount on every salary slip.'; 'India Payroll handles Labour Welfare Fund across 14 states on whatever schedule each one keeps'; 'ESI, with the ceilings built in'; 'Surcharge with marginal relief... India Payroll calculates surcharge and marginal relief according to rules'; 'A tax regime comparator, built in'. Page title confirms 'India Payroll Version 16'. CORRECTION to the prior round: the literal string 'TDS' does NOT appear on this page — the coverage is described as income-tax surcharge and marginal relief.

Source: https://frappe.io/hr/india-payroll

### 12. [high] CORRECTED AND NARROWED — Frappe HR India Payroll's gap is specifically the INCOME-TAX YEAR-END layer plus gratuity, not filing generally. It DOES claim EPF/ESI/LWF return generation, which the prior round missed.

Exact term search on the rendered page: 'Form 16' ABSENT, '24Q' ABSENT, 'gratuity' ABSENT, 'challan' ABSENT, 'declaration' ABSENT, 'proof' ABSENT. But the page DOES state 'India Payroll gives you EPF, ESIC, and LWF registers in one click, formatted for EPFO' and 'ECR, ESI returns, and state LWF filings, no manually editing reports.' So the PF/ESI/LWF filing story exists; what is missing is Form 16, Form 24Q, employee tax declaration and proof-submission workflow, and gratuity. The absence is meaningful because the page is otherwise exhaustive.

Source: https://frappe.io/hr/india-payroll

### 13. [high] CONFIRMED UNCHANGED — Kredily's Free Forever plan is genuinely uncapped on headcount and includes statutory CALCULATION for PF, ESI, PT and TDS.

Re-verified: 'Free Forever ₹0/month' with 'Unlimited employees', covering 'Payroll, HR, attendance & leave', 'PF / ESI / PT / TDS statutory calculation', 'Employee self-service & mobile app'. Constraints re-confirmed: 250 MB storage, one customizable leave/attendance rule, one salary structure.

Source: https://kredily.com/pricing

### 14. [high] CONFIRMED UNCHANGED — Kredily's paywall is drawn precisely at the compliance-artifact and money-movement boundary. Free gives the calculation; you pay for the filing output and the payout.

Re-verified: Payroll OS ₹1,249/mo up to 25 employees then ₹50/employee, adding 'Salary payouts — ICICI Bank & NEFT' and 'PF / ESI challans, Form 12BB & Form 16'. Professional ₹1,749/mo up to 25 then ₹70/employee, adding 'Selfie / GPS attendance & penalty rules' and 'Expense workflows & unlimited storage'. Enterprise adds 'Exit settlements' and 'Multi-company support'. NOTE: unlike Frappe, Kredily's boundary is a commercial choice, and unlike Zoho, Kredily does NOT give payouts or Form 16 away free.

Source: https://kredily.com/pricing

### 15. [medium] Kredily rests on a thin capital base of roughly $3.05M total raised, making it a monetisation-pressured freemium play rather than a capital-backed price war. AGGREGATOR-SOURCED, not filings.

Tracxn/Crunchbase/Dealroom profiles report $3.05M total across 10 rounds from ~112 investors. The seed is independently corroborated by press: ~$750K (₹5.23 crore) led by Fosun RZ Capital, with Delhivery co-founder Mohit Tandon and ex-Zenefits VP Engineering Avinash Anand participating. Operating entity PeopleProsper Technologies Pvt Ltd, founded 2017 by Devendra Khandegar. NO MCA/Tofler filing was retrieved — treat as directional only.

Source: https://www.crunchbase.com/organization/kredily

### 16. [medium] Frappe Technologies is structurally low-burn: bootstrapped from 2008, taking one round of ₹10 crore (~$1.35M) from Zerodha's Rainmatter in November 2020. RE-SOURCED — the URL the prior round cited contains no amount.

The Zerodha z-connect announcement confirms Rainmatter as investor and November 2020 as the date and describes ERPNext as 'fully bootstrapped', but states NO figure. The ₹10 crore / $1.35M figure comes from press coverage (Inc42 'Zerodha-Backed Rainmatter Invests INR 10 Cr In ERPNext', The News Minute, BW Disrupt). Founded 2008 by Rushabh Mehta. The implication holds: free IS Frappe's distribution model, not a funded land-grab.

Source: https://inc42.com/buzz/zerodha-backed-rainmatter-invests-inr-10-cr-in-erpnext/

### 17. [medium] Frappe has real production adoption in India including Zerodha as a marquee reference. Channel-scale figures are VENDOR SELF-REPORTED and were not independently verifiable.

The Frappe HR page displays Zerodha, IFTAS, Selco, Jiva, Lifelong, Vikram Tea and RTCamp, and claims 'over 20,000 developers and 180 partners' plus '8.7K stars' and '#10 Product of the Day on Product Hunt'. Zerodha is corroborated as a genuine relationship by the Rainmatter investment. GitHub remained unreachable this session (SSL-inspection interception), so stars, licence and repo activity are Frappe's own numbers. I could not reproduce the prior round's 'HighFlyer' and 'Anther Technologies' references.

Source: https://frappe.io/hr

### 18. [high] CONFIRMED UNCHANGED — Odoo is not a price-floor setter in Indian HR. India is not an official Odoo Payroll localization, so the free tier cannot run compliant Indian payroll.

Odoo 18 Payroll documentation lists official localizations as 'Australia, Belgium, Egypt, Hong Kong, Jordan, United Arab Emirates, Employment Hero Payroll'. India is absent. Docs stress that installing the correct country-specific localization is critical because it configures local rules, regulations and taxes.

Source: https://www.odoo.com/documentation/18.0/applications/hr/payroll.html

### 19. [high] CORRECTED — Odoo India pricing is a promo-versus-list structure, not a range. Standard ₹580/user/month annual promo (list ₹725), ₹950 monthly. Custom ₹890 annual promo (list ₹1,140), ₹1,420 monthly. One App Free = ₹0, one app, unlimited users.

Rendered India pricing page shows discounted annual rates with list prices struck through above them, and the discount applies 'for 12 months, for initial users ordered'. The prior round's figures of ₹760 and ₹1,150 DO NOT APPEAR on the page and appear to be an artifact of reading the strikethrough pair as a range.

Source: https://www.odoo.com/pricing

### 20. [high] CORRECTED ARITHMETIC — Odoo Standard is 3.0x-12.1x Zoho People per user (promo) or 3.8x-15.1x (list), not the '4-8x' previously stated. The direction of the conclusion is unchanged and in fact strengthened.

Recomputed against the now-verified Zoho People band of ₹48-192: 580/192 = 3.0x, 580/48 = 12.1x; at list, 725/192 = 3.8x, 725/48 = 15.1x; on monthly billing 950/48 = 19.8x. The prior '4-8x' was derived from an unverified ₹96-165 secondary range and is retracted.

Source: https://www.odoo.com/pricing

### 21. [high] CONFIRMED UNCHANGED — Indian payroll on Odoo is a fragmented third-party module market with one-time licence fees, not a maintained localisation.

Exact match on re-fetch, 4 results total: 'Indian Payroll' by Aspire Softserv Pvt. Ltd ($521.82, v17.0); 'Indian Payroll Management' by OdooBuilders ($149.12, v19.0); 'Payroll India - Statutory Salary, PF, ESI, PT & TDS' by Arun A George ($78.54, v19.0); 'Valperf Payroll System - India (PT, EPF, ESIC & Income Tax)' by valperf.com ($109.03, v19.0). Version fragmentation across 17.0/19.0 with single-author publishers indicates no continuity guarantee for annual statutory change.

Source: https://apps.odoo.com/apps/modules/browse?search=Indian+Payroll

### 22. [high] SYNTHESIS (arithmetic re-verified) — The India SMB price floor is ₹0 nominal and roughly ₹4-40 per employee per month for a hosted, statutorily-compliant system at 100 employees. The COMMERCIAL band for a full HR product now runs ₹48-350 per user per month, wider at both ends than previously modelled.

Recomputed from primary pricing: Frappe Cloud shared site ₹410/mo = ₹4.10/employee at 100 headcount; Frappe Server ₹1,800/mo = ₹18.00; Zoho Payroll Standard annual = ₹40.00 at 100; Zoho Payroll free ≤10 employees = ₹0; Kredily Free Forever = ₹0 at unlimited headcount. Commercial band: Zoho People ₹48 (Essential HR) to ₹192 (Enterprise), PeoplePlus ₹192-350. At 100 employees, Zoho People Professional + Payroll Standard = (96×100 + 4,000)/100 = ₹136/employee/month all-in.

Source: https://www.zoho.com/people/zohopeople-pricing.html

### 23. [high] SYNTHESIS — Kredily and Frappe set the NOMINAL floor (₹0), but Zoho sets the CREDIBLE COMMERCIAL floor: it is the only actor with installed base, suite pull-through, a demonstrated pattern of indefinite India free tiers, AND a bundled AI answer at the bottom of its paid ladder.

Zoho's two India free tiers are both gated on a SIZE proxy (Books: revenue <₹25 lakh; Payroll: headcount ≤10) rather than on time or crippled features — a land-and-expand shape that converts as the customer grows. Combined with PeoplePlus bundling Payroll into the HR suite at ₹192/user/month and Zia shipping from ₹48, the marginal cost to Zoho of dropping India HR pricing is a transfer between its own SKUs. Strengthened relative to the prior round, which lacked the price and AI data.

Source: https://www.zoho.com/peopleplus/pricing.html

### 24. [high] SYNTHESIS — The headcount-gated free tier is the most dangerous structure in this market and both Zoho and Kredily already use it. A new entrant charging from employee #1 is priced above the market floor exactly where acquisition is cheapest.

Zoho Payroll: free to 10 employees, then ₹1,000/mo for up to 25 — a cliff, not a ramp, and the free tier includes statutory compliance, TDS worksheets, proof-of-investment approval and HSBC salary payouts. Kredily: free at unlimited headcount with PF/ESI/PT/TDS calculation, monetising on challans/Form 16/payouts instead. Zoho People additionally offers a 5-user free edition. Three different gates, same effect: the 1-25 employee band has multiple ₹0 options with real statutory capability behind them.

Source: https://www.zoho.com/in/payroll/pricing/

## Implications

- PRICE ANCHOR, CORRECTED DOWNWARD. The India SMB band has a ₹0 option with real statutory calculation (Kredily at unlimited headcount; Zoho Payroll at ≤10 employees; Zoho People at ≤5 users), a ₹4-18/employee/month option (Frappe Cloud, per-site), and a ₹48/user/month entry point for a real commercial HR product (Zoho People Essential HR, WITH an AI bot included). The prior round anchored on ₹96 and was one full tier too high. Any pricing above roughly ₹150/employee/month needs a written answer to 'why not Kredily free', 'why not Frappe self-hosted' and 'why not Zoho Essential HR at ₹48'.
- THE FILING-LAYER DIFFERENTIATION IS HALF AS BIG AS THE PRIOR ROUND CLAIMED — SCOPE IT ACCORDINGLY. It is real against Frappe (no Form 16, Form 24Q, gratuity, challans, declarations or proofs anywhere on its India Payroll page) and against Kredily (challans, Form 12BB and Form 16 all paywalled at ₹1,249/mo). It is NOT real against Zoho: Zoho Payroll's ₹0 tier already includes proof-of-investment approval, reimbursement-proof approval, automatic TDS worksheets and HSBC salary payouts, and its ₹1,000/mo tier adds statutory form generation with digital signature plus TDS challan recording. Build the filing layer as table stakes to reach parity with Zoho, and market it as a differentiator only against the open-source and free-tier alternatives.
- DO NOT BUILD THE STRATEGY ON AI WHITESPACE. Zia AI bot ships in Zoho People's cheapest paid tier at ₹48/user/month and 'AI agent' is a named entry-tier feature of PeoplePlus. The prior round recorded Zia's tier as unknown and then recommended AI as 'the one axis on which the ₹0 alternatives cannot follow' — Zoho already followed, at the bottom of its ladder. AI remains a genuine gap for Frappe and Kredily only. Differentiation must be on AI QUALITY and specific outcomes versus a bundled bot, not on AI presence, and the PRD should name the Zia capabilities it intends to beat.
- ASSUME ZOHO GOES TO ZERO IN THE 1-25 BAND — IT ALREADY HAS, TWICE OVER. Zoho Payroll India is ₹0 up to 10 employees, Zoho People is ₹0 up to 5 users, and Zoho Books is ₹0 below ₹25 lakh revenue. The question is not whether Zoho will price near zero but when it widens the existing gates. Do not build a business case whose viability depends on revenue from companies under 25 employees; treat that band as acquisition and model payback from expansion.
- PRICE ON A SIZE GATE, NOT A FEATURE GATE. All three Zoho India free tiers are gated on a size proxy (users ≤5, headcount ≤10, revenue <₹25L) rather than crippled features or a time limit. That shape converts automatically as the customer grows. Kredily's opposite choice — unlimited headcount but 250 MB storage and one salary structure — makes its free tier unusable and its conversion coercive. Copy Zoho's gate shape.
- DESIGN A CONTINUOUS PRICE CURVE — THE CLIFFS ARE THE ATTACK SURFACE. Zoho Payroll jumps from ₹0 at 10 employees to ₹1,000/mo at 11; Zoho People jumps from ₹0 at 5 users to ₹48/user at 6. Those discontinuities are concrete wedges at the exact moment of forced re-evaluation. Do not reproduce them.
- PER-EMPLOYEE PRICING IS STRUCTURALLY EXPOSED AT SCALE. Frappe charges per SITE (₹410/mo flat), so its cost per employee falls toward zero as headcount rises while any per-employee SaaS model rises linearly. Zoho Payroll's base-plus-overage structure has the same taper (₹40/employee at 100). Above roughly 200-300 employees a flat per-employee price loses on spreadsheet comparison to both. Cap or taper per-employee pricing at higher headcounts.
- BENCHMARK COMPLIANCE CLAIMS AGAINST FRAPPE V16 SPECIFICALLY, STATE BY STATE. Frappe HR India Payroll v16 covers PT across 15+ states with individual slabs, LWF across 14 states on each state's schedule, ESI with the raised disability wage ceiling, EPF with voluntary top-ups, income-tax surcharge with marginal relief, a tax-regime comparator, and one-click EPF/ESIC/LWF registers plus ECR and ESI returns. A free product ships all of that. Any claim of 'more complete India compliance' will be falsified in a bake-off unless it is benchmarked against v16 explicitly.
- MULTI-STATE PT AND LWF ARE TABLE STAKES, NOT DIFFERENTIATORS. Scope 15+ state PT slabs and 14-state LWF schedules as baseline with no differentiation credit, and reallocate the differentiation budget to the income-tax year-end layer, gratuity, and AI quality.
- DISCOUNT ODOO AND THE ERP ADD-ON PATH AS A PRICING THREAT, BUT NOTE THE CORRECTED MULTIPLE. Odoo Standard is 3-15x Zoho People per user in India (not the 4-8x previously stated) and India has no official Odoo Payroll localization; its India payroll market is 4 unmaintained third-party modules at one-time fees of $78-$522. ERP-adjacent HR is a compliance liability for buyers, not a cheap substitute.
- THE COMPETITIVE-INTEL PROCESS MUST USE A RENDERING BROWSER — THIS ROUND PROVES IT. Zoho's per-user prices exist only in client-side-injected DOM and its India pricing URLs are inconsistently routed. Two prior rounds produced contradictory reports because of this; a rendering browser resolved every figure in minutes. Mandate a headless-browser price capture with recorded URL and render date before the next pricing review.
- BUDGET FOR MIGRATION-IN FROM FREE, NOT JUST GREENFIELD. With Kredily claiming a large free base, Zoho holding an installed India SMB base across Books and Payroll, and Frappe running a 180-partner channel, the realistic acquisition motion is displacing an incumbent system that already holds payroll history. Importers for Kredily, Zoho Payroll and Frappe HR data, plus mid-year joiner handling with prior-employer YTD, are acquisition infrastructure — scope them P0/P1.

## Opportunities

- Own the INCOME-TAX YEAR-END layer specifically — Form 16 (Part A/B), Form 24Q quarterly eTDS, gratuity, and the 12BB declaration-and-proof workflow — as a wedge against Frappe (documented absent) and Kredily (paywalled at ₹1,249/mo). Note this reaches parity with, not advantage over, Zoho, which ships proof approval free and form generation with digital signature at ₹1,000/mo.
- Attack Zoho's discontinuities with a continuous ramp: the 5-user Zoho People free cliff, the 10-employee Zoho Payroll free cliff, and the 25-employee Standard cliff each force a re-evaluation with a concrete arithmetic grievance the buyer can feel.
- Compete on AI QUALITY against a known, named baseline rather than on AI presence. Zia is a bundled bot at ₹48/user/month; the opportunity is demonstrating outcomes a bundled bot cannot deliver, and it is a genuine greenfield only against Frappe and Kredily, which have no AI at all.
- Sell against Frappe on statutory MAINTENANCE liability rather than features: with Frappe, the buyer or their partner owns every annual Budget change, wage-ceiling revision and state PT slab update. A guaranteed-compliance SLA is a real, priceable product against a free alternative whose feature depth you cannot beat cheaply.
- Displace unmaintained Odoo third-party India payroll modules: four single-author modules fragmented across Odoo 17/19 with no statutory-maintenance obligation represent a captive, compliance-anxious base.
- Target the Frappe partner channel (180 partners, vendor-claimed) as a distribution route — partners implementing free software monetise on services and may resell a compliance or AI layer.
- Exploit Zoho's pricing opacity and data-quality defects in the sales motion: its per-user India prices are invisible without a rendering browser, its India pricing URLs are inconsistent, and its own India pages currently render statutory form names as the non-existent 'Form 130' and 'Form 138'. Transparent, published, all-in INR per-employee pricing with correct form names is a low-cost trust differentiator on a compliance product.
- Multi-state, multi-entity complexity as a mid-market wedge: free tiers break hardest here — Kredily allows one salary structure and one leave/attendance rule, and Zoho's free payroll caps at 10 employees — while Frappe requires technical capacity to configure it.

## Open questions

- Does Zoho Payroll's Standard tier genuinely generate Form 16 and Form 24Q? Zoho's own pages render 'Form 130 generation with digital signature' and 'Form 138, TDS challan recording' as literal text nodes on both the pricing and product pages, alongside a correctly-rendered 'Form 12BB'. These are not real Indian statutory forms. Needs confirmation from Zoho Payroll help documentation or a trial account before being used in any competitive claim — it determines the exact parity line on the filing layer.
- Is Zia metered (credits/requests) or unlimited within Essential HR at ₹48/user/month, and what can it actually do? Tier placement is now confirmed but capability depth and metering are not. This determines how hard the AI differentiation has to work.
- What is the actual capability delta between Zoho People Premium (₹144) plus Zoho Payroll Standard, versus PeoplePlus Premium (₹192)? The blended People+Payroll figure at 100 employees is ₹136/employee/month versus ₹192 for the bundle, but the bundle adds Recruit and Cliq. The right comparison basket for positioning is unresolved.
- Does Zoho People enforce a 5-user minimum on paid plans? A 'Minimum users' row exists in the comparison matrix but its per-tier values could not be extracted; the 5-user minimum is confirmed only for PeoplePlus. Minor but affects the true entry cost.
- Is Frappe HR's India Payroll extension installable on Frappe Cloud's ₹410 shared Sites plan, or does it require the ₹1,800 Servers plan? This swings the true floor from ₹4.10 to ₹18.00 per employee per month at 100 headcount. GitHub was unreachable this session (SSL-inspection interception), so the repo, licence and install requirements were not directly verified.
- Does Frappe HR India Payroll genuinely lack Form 16/24Q/gratuity, or are they present in the codebase but unmarketed? The absence is now confirmed by exact-string search on the rendered page, but needs confirmation against the v16 release notes and the repository before being used as a competitive claim.
- What is the actual implementation/TCO cost of a Frappe HR India Payroll deployment via a partner? Licence is ₹0 and hosting is ₹410+, but if partner implementation is ₹2-5 lakh the effective floor for a non-technical SMB is far above the headline and the threat is overstated. This is the single largest unquantified variable in the floor analysis.
- Kredily's financial position: MCA/Tofler filings for PeopleProsper Technologies Pvt Ltd were not retrieved. The $3.05M is aggregator-sourced. Whether the free-forever tier is sustainable or about to be gated harder depends on this.
- How many of Kredily's claimed companies are free versus paying, and what is its free-to-paid conversion rate? Determines whether ₹0 is a durable anchor or a temporary land-grab. Its traction claims are unverified vendor marketing.
- HR add-ons for SAP Business One, Microsoft Dynamics, Busy and Marg were not investigated. Busy and Marg have deep Indian SMB accounting penetration and any bundled HR/payroll module would materially change the floor analysis in the accounting-software-led segment. This remains a genuine coverage gap, not a null result.
- Has Zoho publicly stated strategic intent on India HR pricing (Sridhar Vembu commentary, press)? Zoho's capital position is inferred from observable pricing behaviour and its known absence of external investors, not from any financial statement. No revenue or profitability figure was verified.
- Do Zoho's rendered INR prices vary by detected geography? The figures here were captured from a non-India IP but served in INR from the India edition. Prices should be re-confirmed from an India IP before use in a business case.

## Retracted

- RETRACTED AND REPLACED — 'Zoho People's India per-employee price could not be verified from any primary source; secondary sources give a ₹96-165 range.' Now primary-verified in a rendering browser: Essential HR ₹48, Professional ₹96, Premium ₹144, Enterprise ₹192 per user per month billed annually (₹60/₹120/₹180/₹240 monthly), ex-GST. The ₹96-165 range was wrong at both ends: it missed the ₹48 entry tier entirely and its ₹165 upper bound (goforfiling.com) does not correspond to any real tier. itforsme.in's ₹96/₹144 was correct.
- RETRACTED — 'AI IS AN OPEN FLANK, NOT A CROWDED ONE... the free/cheap floor-setters have no AI answer whatsoever, so AI is the one axis on which the ₹0 alternatives cannot follow.' Zoho ships Zia AI bot in Essential HR at ₹48/user/month, its cheapest paid tier, and 'AI agent' in PeoplePlus Premium, its entry bundle tier. The claim survives only against Frappe and Kredily, both of which genuinely have no AI. The prior round recorded Zia's tier as UNKNOWN and then built a headline recommendation assuming the answer.
- RETRACTED — 'Own the year-end and filing layer... the one capability the entire ₹0 floor does not give away' and the associated claim that Kredily's paywall and Frappe's gap mark the same universal boundary. Zoho Payroll's ₹0 tier includes 'Proof of investments approval', 'Reimbursement proof approval', 'Automatic TDS worksheet' and 'Online salary payments through HSBC' — both the declaration/proof workflow and money movement. Zoho's ₹1,000/mo tier adds form generation with digital signature and TDS challan recording. The boundary is Kredily's and Frappe's, not the market's.
- RETRACTED — Zoho People free tier user cap recorded as unknown, with 'forever free for up to 53 users' flagged as a probable artifact. Correctly flagged; now resolved. The verified string is 'Explore our FREE edition, forever free for up to 5 users.' The cap is 5.
- RETRACTED AND CORRECTED — Odoo India pricing stated as 'Standard Rs 580-760/user/month yearly (Rs 725-950 monthly); Custom Rs 890-1,140/user/month yearly (Rs 1,150-1,420 monthly).' This misread a promo-versus-strikethrough-list layout as a range. Verified: Standard ₹580 annual promo, list ₹725, ₹950 monthly; Custom ₹890 annual promo, list ₹1,140, ₹1,420 monthly. The figures ₹760 and ₹1,150 do not appear on the page.
- RETRACTED — 'Odoo Standard is roughly 4-8x Zoho People.' Recomputed against the verified ₹48-192 band: 3.0x-12.1x at promo pricing, 3.8x-15.1x at list. The conclusion (Odoo is not a price floor) is unchanged and strengthened, but the multiple was derived from an unverified secondary range.
- CORRECTED SOURCING — the Frappe '₹10 crore (~$1.35M) Rainmatter' figure was cited to https://zerodha.com/z-connect/rainmatter/announcing-the-investment-in-erpnext. That page confirms the investor and the November 2020 date and describes ERPNext as 'fully bootstrapped' but STATES NO AMOUNT. The figure is corroborated by press (Inc42, The News Minute, BW Disrupt) and is retained at medium confidence with the source corrected. A specific number attributed to a page that does not contain it is exactly the fabricated-precision failure mode.
- CORRECTED — the evidence for Frappe's filing gap stated that 'Registers that are ready to file' exist for EPF/ESIC/LWF while implying the filing layer is absent generally. Exact-string verification confirms Form 16, 24Q, gratuity, challan, declaration and proof are all absent, BUT the page also claims 'ECR, ESI returns, and state LWF filings'. The gap is the income-tax year-end layer plus gratuity, not filing as a whole. Additionally, the literal string 'TDS' does not appear on that page — the correct phrasing is 'income-tax surcharge and marginal relief', which is verbatim present.
- DOWNGRADED TO POSITIONING CLAIM, UNVERIFIED — Kredily's '25,000+ companies, 10,00,000+ employees, ₹1,000+ Cr payroll processed'. These are vendor self-reported marketing figures with no independent corroboration and should not appear in a business case as market evidence.
- DOWNGRADED TO VENDOR SELF-REPORT — Frappe's '8.7K GitHub stars', 'over 20,000 developers and 180 partners' and AGPL-3.0 licence. All come from Frappe's own marketing pages; github.com/frappe/hrms remained unreachable this session due to SSL-inspection interception. I also could not reproduce the prior round's customer references 'HighFlyer' and 'Anther Technologies' — my extraction returned Zerodha, IFTAS, Selco, Jiva, Lifelong, Vikram Tea and RTCamp.
- HELD AT MEDIUM, NOT UPGRADED — Kredily's $3.05M total funding. Corroborated across Tracxn, Crunchbase and Dealroom, with the ~$750K Fosun RZ Capital seed independently corroborated by press, but no MCA filing was retrieved. Aggregator consensus is not filing-grade fact.
- NOT ASSERTED — that 'Form 130' and 'Form 138' on Zoho's India pages mean Form 16 and Form 24Q. The strings were verified as genuine single text nodes in raw innerHTML on two independent Zoho pages, with no hidden elements or truncation. They are not real Indian statutory forms and are most plausibly CMS corruption, but I will not assert the mapping without confirmation from Zoho documentation or a trial account.
- NOT ASSERTED — any Zoho revenue, profitability or cash-position figure. The 'capital-unconstrained' characterisation remains an inference from observable pricing behaviour (three indefinite India free tiers, suite bundling, AI bundled at the bottom tier) and Zoho's known absence of external investors, not from any verified financial statement.
- NOT ASSERTED — that no HR add-ons exist for SAP Business One, Dynamics, Busy or Marg. Not researched to conclusion; its absence from findings is a coverage gap, not a negative finding. The prior round's finding asserting 'no credible evidence was found' has been removed rather than restated, because it cited an unrelated Odoo URL as its source.

## Competitors

### Zoho (Zoho People + Zoho Payroll + PeoplePlus + Zoho One)
- **segment**: SMB to mid-market, India-native suite incumbent
- **positioning**: Suite pull-through. HR is a hook into a 50+ app bundle, not a standalone margin centre. Free tiers gated on customer SIZE (revenue/headcount/user count) so they convert automatically as customers grow. AI is bundled from the cheapest paid tier rather than sold as a premium upsell.
- **pricing**: ALL FIGURES NOW PRIMARY-VERIFIED IN A RENDERING BROWSER. Zoho People India (ex-GST, /user/month): Free ₹0 up to 5 users; Essential HR ₹48 annual / ₹60 monthly; Professional ₹96/₹120; Premium ₹144/₹180; Enterprise ₹192/₹240; 500+ users by quote; exactly 20% annual saving. Zoho PeoplePlus India: Premium ₹192, Enterprise ₹350 /user/month annual, minimum 5 users. Zoho Payroll India (ex-GST): FREE ₹0 up to 10 employees; Standard ₹1,000/mo annual (₹1,250 monthly) incl. 25 employees + ₹40/₹50 per additional; Professional ₹3,000/₹3,750 incl. 50 + ₹60/₹75; Premium ₹4,000/₹5,000 incl. 50 + ₹80/₹100. Zoho Books India: FREE below ₹25 lakh annual revenue; paid ₹749-₹7,999/org/month annual. Blended: People Professional + Payroll Standard at 100 employees = ₹136/employee/month.
- **ai_capabilities**: RESOLVED — Zia AI bot ships in ESSENTIAL HR, the lowest paid Zoho People tier at ₹48/user/month, and cascades upward. PeoplePlus names 'AI agent' as the first key feature of its entry Premium tier (₹192). Zoho therefore has a bundled-AI answer at the bottom of its price ladder, not a premium-tier upsell. The product page positions Zia as privacy-focused and embedded across the product.
- **strengths**: Already executing the zero-price strategy in India in two categories (Books vs Tally; Payroll ≤10 employees), with a 5-user free HR edition on top; Free payroll tier is unusually complete: statutory compliance across Income Tax/EPF/ESI/state PT/LWF, automatic TDS worksheet, proof-of-investment and reimbursement-proof approval, AND bank salary payouts via HSBC; AI bundled from ₹48/user/month, neutralising AI-as-differentiator arguments at the low end; Statutory form generation with digital signature and TDS challan recording from ₹1,000/month, occupying the filing layer cheaply; Suite bundling makes HR margin loss an internal transfer; no external investors and no exit clock; Base-plus-overage payroll pricing means effective per-employee cost falls with headcount (₹40 at 100 employees)
- **weaknesses**: Severe pricing opacity: all per-user prices are injected client-side and invisible to HTTP fetch, and India pricing URLs are inconsistently routed — genuine friction for buyers comparing options; Zoho's own India pages render statutory form names as 'Form 130' and 'Form 138', which are not real Indian forms — a live data-quality defect on a compliance product's pricing page; Hard cliffs at 5 users (People free), 10 employees (Payroll free) and 25 employees (Payroll Standard) that a continuous price ramp can attack; Two overlapping HR SKUs (People vs PeoplePlus) with different tier names and a 5-user minimum create buyer confusion about the real all-in price; Breadth-over-depth suite reputation; HR is one of 50+ apps

### Frappe HR / ERPNext (Frappe Technologies)
- **segment**: Open-source; SMB to mid-market with technical capacity, plus partner-led implementations
- **positioning**: '100% Free and Open Source', explicitly anti-per-user: 'pay only for what you use, and not per user!'. India Payroll ships as a separate open-source extension app, currently Version 16.
- **pricing**: Software ₹0 (AGPL-3.0, self-hostable). Frappe Cloud hosting: Sites ₹410+/mo (~$5), Servers ₹1,800+/mo (~$20), Premium Servers ₹5,400+/mo (~$125). No per-user or per-employee charge. Effective cost at 100 employees: ₹4.10-₹18.00 per employee per month. Implementation is the real cost and is priced separately.
- **ai_capabilities**: None found. Exhaustive review of the HR and India Payroll pages surfaced no AI claims whatsoever. This remains a genuine gap for Frappe.
- **strengths**: Structurally cannot be undercut on licence price — it is zero, under AGPL-3.0; Per-site not per-employee pricing means cost per employee falls toward zero at scale, inverting every SaaS competitor's model; India Payroll statutory depth is genuinely strong and verbatim-verified: PT across 15+ states with individual slabs, LWF across 14 states on each state's schedule, ESI with the raised disability wage ceiling, EPF including voluntary top-ups, income-tax surcharge with marginal relief, and a built-in tax-regime comparator; Filing story is better than the prior round credited: one-click EPF/ESIC/LWF registers formatted for EPFO, plus ECR, ESI returns and state LWF filings; Bootstrapped 12 years then a single ₹10 crore round — low burn, no pressure to raise prices; Real Indian production references including Zerodha, corroborated by the Rainmatter investment
- **weaknesses**: Income-tax year-end layer is absent: Form 16, Form 24Q, gratuity, challans, and tax declaration/proof-submission workflows do not appear anywhere on an otherwise exhaustive India Payroll page; India Payroll is a separate extension app, not core — integration and upgrade risk across versions; Requires technical capacity or a paid partner; true TCO is implementation labour, and that cost is unquantified; No AI capability of any kind; Channel and traction figures (8.7K GitHub stars, 20,000 developers, 180 partners) are vendor self-reported and could not be independently verified this session

### Kredily (PeopleProsper Technologies Pvt Ltd)
- **segment**: India SMB / micro-SMB, free-forever freemium
- **positioning**: Deliberately India-only, built for PF, ESI, state PT and TDS rather than as a localised module of a global product. Free forever at unlimited headcount.
- **pricing**: Free Forever ₹0, UNLIMITED employees (250 MB storage, 1 leave/attendance rule, 1 salary structure). Payroll OS ₹1,249/mo up to 25 employees then ₹50/employee. Professional ₹1,749/mo up to 25 then ₹70/employee. Enterprise custom. Attendance add-ons at ₹50/user/month each.
- **ai_capabilities**: None evidenced. Add-ons are attendance-hardware and tracking oriented (selfie, GPS, KredEYE), not AI.
- **strengths**: Most aggressive headcount gate in the market: unlimited employees free WITH real PF/ESI/PT/TDS statutory calculation; India-only focus is a genuine differentiator against global products' shallow localisation; Sets the psychological anchor at ₹0 for the entire SMB band
- **weaknesses**: Capital-thin at roughly $3.05M raised (aggregator-sourced) — cannot sustain a subsidy war against Zoho; Free tier is crippled at exactly the point of value: challans, Form 16, Form 12BB and bank payouts are all paid, and Zoho now gives payouts and proof-approval away free at ≤10 employees; 250 MB storage and a single salary structure make the free tier unusable for any structurally complex employer; Monetisation pressure is high relative to the free-user base; gating is likely to tighten; No AI story at all; Traction claims (25,000+ companies, 10,00,000+ employees, ₹1,000+ Cr payroll processed) are vendor self-reported marketing, not independently verified

### Odoo (India)
- **segment**: SMB/mid-market ERP; HR as a module
- **positioning**: All-apps-for-one-price ERP suite. NOT a credible India payroll player — India is not an official payroll localization.
- **pricing**: CORRECTED: promo-versus-list structure, not a range. One App Free ₹0, one app, unlimited users. Standard ₹580/user/month annual promo (list ₹725), ₹950 monthly. Custom ₹890 annual promo (list ₹1,140), ₹1,420 monthly; promo applies for 12 months on initial users ordered. Third-party India payroll modules carry separate one-time fees of $78.54-$521.82.
- **ai_capabilities**: Not evidenced in the India HR/payroll context in the pages reviewed.
- **strengths**: Strong ERP breadth if the buyer wants one system of record; One App Free is a genuine ₹0 entry point for HR-lite (Employees only); Large global partner ecosystem
- **weaknesses**: India is NOT an official Odoo Payroll localization — the free tier cannot run compliant Indian payroll; Only 4 third-party India payroll modules exist, all single-vendor, fragmented across Odoo 17/19, with no statutory-maintenance guarantee; Per-user pricing is 3-15x Zoho People depending on tier, making it economically irrelevant as a price floor; 'One App Free' cannot span Employees + Payroll, so any real HR deployment lands on paid Standard/Custom; Third-party module purchase creates an annual compliance-drift liability the buyer owns
