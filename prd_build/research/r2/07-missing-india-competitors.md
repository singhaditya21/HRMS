# [r2] missing-india-competitors

## Verification notes

SCOPE OF THIS PASS: I re-fetched every load-bearing number in the report against the URL it cited — 4 Tracxn records fully re-read (HONO, Akrivia, Xoxoday, Vantage Circle) plus 4 more (Peoplebox, inFeedo, Advantage Club, Mesh, Truein), 8 vendor pricing pages, the BDO alert, the Aparajitha release, the TechCrunch piece, the Skuad/Payoneer page, and the TeamLease PDF, which I downloaded and text-extracted locally with pdftotext rather than trusting the prior agent's transcription.

WHAT SURVIVED (the report is more honest than its hedging suggests). The single highest-stakes source checks out exactly. The TeamLease FY26 filing is real and every figure quoted from it is verbatim-correct: consolidated Labour Codes impact Rs 5.68 Cr and standalone Rs 2.74 Cr (notes 3(a)), the Rs 6.4 Cr impairment against TeamLease HRTech Private Limited (note 3(b)), Total income from operations 11,790.67 / 11,155.87, and segment revenues 10,879.59 / 669.38 / 241.70 (FY25 196.52). Its growth arithmetic is right: 11,790.67/11,155.87 = +5.69%; Quess 153.05/149.67 = +2.26%. Critically, Tracxn IS publicly fetchable — I read every cited record and each one matched the report's numbers, including the Peoplebox internal contradiction ($1.6M total vs a listed $7,743,026 seed), which is genuinely present on Tracxn and not an invention. The Peoplebox, Mesh, 15Five, Truein-India, Skuad, Culture Amp, inFeedo and Vantage Circle price quotes are verbatim-accurate. The three declared blocks are reproducible: akriviahcm.com does serve an SSL-inspection interstitial from 148.72.1.74, complyhr.io does fail DNS, and xoxoday.com/pricing still returned 429 on my retry (empuls.io also refused connection). The report's source discipline was real.

WHAT I RETRACTED. One outright fabricated price. The report asserts Multiplier's EOR at "$400 per employee/month" and builds a headline finding on it ("India EOR pricing spans a 4x range"). The cited TechCrunch article says $300 per employee per month, $40 per freelancer, $20 own-entity. The $400 appears to be contamination from the $400M valuation in the same sentence. Corrected: the spread is $99 to $300, roughly 3x, and it compares a 2026 price to a 2022 one.

Two arithmetic claims failed recomputation. "TeamLease is roughly 100x the revenue of any India HR SaaS vendor in this set" is false: against Xoxoday (Rs 500-1,000 Cr) it is 12-24x, and against Vantage Circle and Advantage Club (Rs 100-500 Cr) 24-118x. It only reaches 100x against the smallest vendors. And "Xoxoday is 5x Advantage Club's revenue band" is band-floor arithmetic (500/100); on midpoints it is 2.5x, and the true multiple is indeterminate. The 9x funding multiple ($101M/$11M) is correct.

Four smaller corrections: GetLatka's $21.1M Akrivia figure is self-declared on that page as "an estimation" with no management interview, so the report's "irreconcilable, neither verified, both reported" framing gives it undue parity — it is a modelled estimate against an analyst band, not a genuine source conflict (GetLatka also says 192 staff vs Tracxn's 222). Truein's $2.25/$3.50 tier is the International rate, not GCC as the report labels it. Vantage Circle has 20 investors on Tracxn, not 21. HONO's homepage reads "The world's first headless HRMS — run your people operations on a single conversation"; the report's "World's First Headless, Zero-UI AI HRMS" is not the on-page string, though the substance holds and every logo it named was present.

One "unknown" I resolved against the report. Leapsome does market AI: the pricing page describes "AI Agents" doing meeting summaries, prompt-driven workflow creation, policy Q&A and automated review drafts. The report's "ai_capabilities: unknown" is now wrong. Its EUR 199 caution was right to keep, though: a second read still returns 199 with EUR, but the "per user" attribution is almost certainly a parse artifact — EUR 199 per user per month would be 12x 15Five's top tier, which is not credible for this category. Treat 199 as a probable platform floor, not a seat price.

DID THE DIMENSION ANSWER ITS QUESTION? Only partly, and this is the report's largest structural failure. For a dimension named "missing-india-competitors" it spends three of its thirteen profiles on 15Five, Culture Amp and Leapsome — vendors it concedes in its own text are not India competitors — while omitting Keka, the best-capitalised India HRMS pure-play in the market: Hyderabad, $57M Series A from WestBridge (November 2022, reported as the largest SaaS Series A in India), Rs 78 Cr FY24 revenue, payroll for 1.5M+ employees monthly. Keka is better funded than every India vendor the report does profile (HONO $10.6M, inFeedo $20M, Mesh $16M, Advantage Club $11M, Truein $2.5M, Peoplebox $1.6M, Akrivia $0) and larger by revenue than HONO's own band. Missing it in this specific dimension is a material gap, and I have added it. Ramco Systems (listed, Chennai, global payroll, "Chia" AI assistant) is a likely second omission that I confirmed exists but did not size. The mid-market India tier (ZingHR, Zimyo, HROne, Qandle) was not swept at all.

ONE FINDING THE REPORT MISSED, IN ITS OWN BEST SOURCE. It calls Other HR Services TeamLease's "fastest-growing segment" (true: +23.0%) but never opens the segment-results line. In FY26 that line reads as a parenthesised — i.e. negative — value against Rs 2.62 Cr in FY25. The FY25 column reconciles exactly (98.96+41.35+2.62=142.93, the stated total), so the FY25 figure is solid: Rs 2.62 Cr of segment result on Rs 196.52 Cr of revenue is a 1.33% margin. The FY26 value I can only read through degraded OCR of a scanned filing and it is in tension with the press release's "EBITDA grew 22%" (different line — segment result is post-D&A), so I state it at low confidence. Either way the defensible point stands and cuts against the report's framing: India regulatory-compliance-plus-HR-services revenue grows fast at roughly 1% margin. Note also that the press release contradicts itself on this segment — the highlights say Revenue and EBITDA "each grew 23%" while the HR Services section says "23% and 22% respectively". The report faithfully reproduced both; that inconsistency belongs to TeamLease, not to the report.

HOW MUCH SHOULD A PRD AUTHOR TRUST THIS? The filing-sourced and vendor-pricing-sourced findings are strong enough to build on — I re-derived them from primaries. The Tracxn-sourced revenue bands, headcounts and funding totals are accurately transcribed but remain analyst estimates on an aggregator whose HQ fields track holding-company domicile (it puts Vantage Circle in Plano, Advantage Club in San Francisco, Mesh in San Jose, all India-operated); do not quote a Tracxn revenue band as a fact about a rival. Every vendor scale claim (HONO's 1.8M users, inFeedo's 330+ CHROs, Advantage Club's 16M users, Truein's 500+ customers) is unaudited marketing and is labelled as such below. The competitive-set composition should be treated as incomplete until the Keka/Ramco/mid-market tier is swept.

## Key findings (35)

### 1. [high] India's four Labour Codes became legally effective on 21 November 2025, and the compliance cost is already landing in audited P&Ls — this is a live regulatory event, not a forthcoming one.

VERIFIED BY LOCAL TEXT EXTRACTION OF THE FILING. Consolidated note: 'Effective November 21, 2025, The Government of India has consolidated multiple existing labour legislations into a unified framework comprising four Labour Codes collectively referred to as the New Labour Codes. The Group has assessed and disclosed the incremental impact ... which has resulted in increase in gratuity and leave liability by Rs. 5.68 Crores and the same has been recognized as an exceptional item during the quarter ended December 31, 2025 and year ended March 31, 2026.' The standalone note carries the identical language at Rs. 2.74 Crores. The exceptional-items line shows (5.68) for FY26 against nil in FY25, and the press release footnotes '* Excludes one-time exceptional item relating to labour code implementation: Rs 5.68 crore.' Both notes add that for billable employees the cost is 'contractually recoverable from customers' — so a staffing firm can pass it through; a product company cannot.

Source: https://group.teamlease.com/wp-content/uploads/2026/05/TeamLeaseAuditedFinancialResultsQ4FY26.pdf

### 2. [high] The Labour Codes are only PARTIALLY in force — central and state rules were still unnotified, creating a dual-compliance environment where legacy statutes persist alongside the Codes.

VERIFIED VERBATIM against the BDO alert. Industrial Relations Code and OSHWC Code 'fully notified'; Code on Wages and Code on Social Security 'partially notified'. 'The final rules under the Labour Codes by the Central and State Governments are still to be notified, but are expected to follow shortly.' 'Employers may therefore experience a dual compliance environment where legacy State legislation continues to apply until superseded.' Gig aggregators 'may be required to contribute 1-2% of annual turnover, capped at 5% of total payments to platform workers.' 'Fixed-term employment is formally recognised, entitling such employees to gratuity after one year of continuous service.' The prior report's own caveat stands: the widely-repeated '1 April 2026 final rules' timeline is NOT verified and must not be relied on.

Source: https://www.bdo.in/en-gb/insights/alerts-updates/alert-implementation-of-labour-codes-key-provisions-notified-effective-21-november-2025

### 3. [high] CORRECTED — TeamLease is 12-24x the revenue of the largest India HR-software vendor in this set, not 'roughly 100x any of them'. The original multiple was arithmetically false.

RECOMPUTED. TeamLease FY26 total income from operations = Rs 11,790.67 Cr (FY25 Rs 11,155.87 Cr), verified in the audited segment table. Against Xoxoday's Rs 500-1,000 Cr band that is 11.8x to 23.6x. Against Vantage Circle and Advantage Club (both Rs 100-500 Cr) it is 23.6x to 118x. Only against HONO (Rs 50-100 Cr) does it reach 118-236x. The report's '100x of any India HR SaaS vendor in this set' is therefore false for at least three of the vendors it profiles. The correct framing: Indian staffing is two orders of magnitude larger than Indian HR software at the small end and one order at the large end.

Source: https://group.teamlease.com/wp-content/uploads/2026/05/TeamLeaseAuditedFinancialResultsQ4FY26.pdf

### 4. [low] NEW — India's regulatory-compliance-plus-HR-services revenue grows fast but at roughly 1% margin. The report cited this segment's 23% growth and never opened its profitability line.

TeamLease audited segment table. Other HR Services ('Comprises of Regulatory Compliance, Training, Job Portal, Education Technology and SAAS based compliance') revenue FY26 Rs 241.70 Cr vs FY25 Rs 196.52 Cr = +23.0%, confirming the press release's growth claim. But the segment RESULTS line shows FY25 Rs 2.62 Cr — a 1.33% segment margin. That FY25 figure is reliable because the FY25 column reconciles exactly to its stated total (98.96 + 41.35 + 2.62 = 142.93). The FY26 value renders through OCR of a scanned page as a parenthesised (negative) figure, which would mean the segment result went backwards while revenue grew 23%; I flag this as unconfirmed because OCR quality is poor and because the press release separately claims segment EBITDA grew 22% (a pre-D&A line, so not strictly contradictory). Note the press release contradicts itself here — highlights say Revenue and EBITDA 'each grew 23%', the segment section says '23% and 22% respectively'.

Source: https://group.teamlease.com/wp-content/uploads/2026/05/TeamLeaseAuditedFinancialResultsQ4FY26.pdf

### 5. [high] TeamLease wrote down its HR technology subsidiary in FY26 — direct evidence that a staffing major with distribution, capital and compliance depth still failed to build HR software.

VERIFIED VERBATIM. Note 3(b): 'Based on the management's assessment of future projections and profitability, the Company has created a impairment allowance of Rs. 6.4 crores towards investment in TeamLease HRTech Private Limited, a subsidiary and the same has been recognised as an exceptional item during the quarter and year ended March 31, 2026.' The impairment appears on the standalone exceptional-items line as (6.42). Separately the press release states 'HCM business now manages over 3.5 lakh monthly employee records' — the operational payroll-records business runs at scale even as the software subsidiary is impaired.

Source: https://group.teamlease.com/wp-content/uploads/2026/05/TeamLeaseAuditedFinancialResultsQ4FY26.pdf

### 6. [medium] NEW AND MATERIAL — Keka is missing from the competitive set entirely, and it is the best-capitalised India HRMS pure-play in the market. Its omission is the largest gap in this dimension.

Keka raised $57M in Series A from WestBridge Capital, announced November 2022 and widely reported as the largest Series A in Indian SaaS history. Hyderabad-headquartered, founded by Vijay Yalamanchili (2014 per Wikipedia; Keka's own post says 2016 — disputed). Wikipedia, citing sources, gives FY24 revenue of Rs 78 Cr (~$9.3M) with losses up 2.8x. Keka's own release claims payroll for 'more than 1.5 million employees every month' and 5,500 customers by 2021. That funding exceeds every India vendor the report profiled (HONO $10.6M, inFeedo $20M, Mesh $16M, Advantage Club $11M, Truein $2.5M, Peoplebox $1.6M, Akrivia $0), and Rs 78 Cr FY24 sits at or above HONO's entire Rs 50-100 Cr band. keka.com/pricing could not be read (TLS chain failure through the same inspection proxy that blocks Akrivia), so Keka's price card is a live gap.

Source: https://www.business-standard.com/article/companies/hr-tech-start-up-keka-raises-57-mn-in-series-a-funding-by-westbridge-122110900778_1.html

### 7. [high] HONO occupies the exact positioning slot an 'AI-first HRMS for India' PRD would claim, with named-agent branding rather than generic AI branding — but the exact tagline the report quoted is not the on-page string.

VERIFIED WITH ONE CORRECTION. hono.ai homepage reads 'Enterprise HR, finally invisible. The world's first headless HRMS - run your people operations on a single conversation.' The report's 'The World's First Headless, Zero-UI AI HRMS' is not the homepage text; 'Zero-UI' was not found. Substance confirmed: named agents ERA and ARASMAS ('predicts absenteeism and fills attendance gaps automatically'), Smart Hiring as '12 AI agents that screen, rank, schedule and onboard', payroll branded 'Zero Touch Payroll'. Scale claims confirmed as displayed: 300+ Global Enterprises, 1.8M+ Users, 50+ Countries, 25+ countries for payroll — all unaudited vendor marketing. Every logo the report named was present (Accor, OCS Group, Holiday Inn, Eveready, ITC Group, DHL, Toyota Boshoku, Tata Hitachi), alongside ~50 others including Spencers Retail, Kajaria, Lodha Group, G4S, Hinduja Group. The report's secondary claim that earlier press named IndiGo and HDFC Bank is NOT verified — neither appears on the current site.

Source: https://hono.ai/

### 8. [medium] HONO's financial reality is far smaller than its marketing scale claims — Rs 50-100 Cr revenue band on a 635-person team, funded by $10.6M lifetime across 5 rounds, last disclosed round July 2024 with the amount redacted.

Tracxn record re-read directly and matches the report exactly: total funding $10.6M across 5 rounds; latest round Angel, 26 Jul 2024, amount redacted as '$*****'; first funding 13 Jun 2019; founded 2008; HQ Gurugram; 635 employees as of 31 May 2026; revenue band Rs 50-100 Cr as of 31 Mar 2025. Tracxn redacts valuation and several round amounts behind a signup wall, so the $10.6M total is a floor on disclosed rounds, not a proven lifetime total. The 5M-users-by-FY23 target versus 1.8M claimed today is a 2.8x shortfall — the report's 'roughly 3x' is fair, but the target is sourced to 2022 trade press I did not re-read.

Source: https://tracxn.com/d/companies/hono/__qIc5TgjNqRn058FEUrvVsVOMG1rwidN5vO0BAMmfvTM

### 9. [medium] Akrivia HCM is unfunded and its headcount is shrinking — it has raised zero venture capital while competing against Darwinbox and PeopleStrong.

Tracxn record re-read and matches exactly: 'Unfunded', no rounds, no investors; founded 2018; HQ Visakhapatnam; founders Rahul Varma Kalidindi (CEO) and Kalidindi Raghu; 222 employees as of 31 Aug 2025, a 16.0% year-over-year decrease from Aug 2024; revenue band Rs 10-50 Cr as of 31 Mar 2025; top competitors listed as Workday, PeopleStrong, Kronos, Deel, greytHR. The website block is real and reproducible — akriviahcm.com returns an SSL-inspection interstitial from 148.72.1.74 on a fresh attempt, so no Akrivia primary source exists in this research.

Source: https://tracxn.com/d/companies/akrivia-hcm/__-noj3tY2XTb-jBjQfhQJDWgksq8G5QNxYbILWB0cw2w

### 10. [medium] CORRECTED — Akrivia's revenue is not a genuine two-source dispute. The competing $21.1M figure is a self-declared algorithmic estimate, and the analyst band should be preferred.

I fetched the GetLatka page the prior report declined to open. It shows '$21.1M' revenue and '192 employees' for 2025, and states explicitly: 'We have not recorded a podcast or interview with the company's management, therefore this data is an estimation.' That removes the parity the report granted it. Tracxn's Rs 10-50 Cr (as of 31 Mar 2025) is an analyst band; GetLatka's ~Rs 185 Cr (at ~Rs 88/USD) is a model output with no management input, and its own headcount (192) disagrees with Tracxn's (222) for roughly the same period. Neither is a filing. Resolution still requires MCA/Tofler filings for the operating entity ('Akrivia Automation Pvt Ltd' per a G2 slug), but the working assumption should be the Rs 10-50 Cr band, not a mid-point between the two.

Source: https://getlatka.com/companies/akriviahcm.com

### 11. [low] Akrivia targets the 1,000+ employee enterprise segment with a 20+ module suite and publishes no pricing.

Techjockey reseller listing (unchanged from the prior pass, not re-fetched): 'Price Available on Request'; 'Organizations with 1,000+ employees'; 'medium to large enterprises across various industries such as manufacturing, retail, healthcare, and BFSI'; 20+ modules / 100+ features; 'Over 100 enterprises in India and the GCC region'. This is a reseller page, not a vendor primary — treat the module and customer counts as marketing.

Source: https://www.techjockey.com/detail/akrivia-hcm-software

### 12. [low] POSITIONING CLAIM, UNVERIFIED — Akrivia runs competitive-displacement content against Darwinbox and PeopleStrong. Only the existence of the pages is evidenced; nothing in them is used or usable as fact.

Search surfaced akriviahcm.com/blog/darwinbox-alternatives-india-2026 and /blog/peoplestrong-alternatives-india-2026 as live URLs. The pages were deliberately not fetched by the prior agent and not by me — a vendor's own comparison blog is a positioning artefact, never evidence about a rival. Because the domain is blocked by the SSL interstitial, even the pages' existence rests on search-result metadata rather than a successful fetch. Downgraded from medium to low accordingly.

Source: https://akriviahcm.com/blog/darwinbox-alternatives-india-2026

### 13. [medium] inFeedo owns the conversational-HR-AI brand among Indian enterprises but converts it into very little revenue — enterprise-grade logo list against an under-Rs-10-Cr revenue band.

Tracxn re-read and matches: $20M total across 7 rounds; latest round Series A, 15 Mar 2022; founded 2016; founders Tanmaya Jain (CEO), Palash Jain (COO), Varun Puri (CPO); investors Y Combinator, LetsVenture, Bling Capital plus 36 more including Tiger Global and Tracxn Labs; 142 employees as of 31 Jul 2026; revenue 'Less than Rs 10 Cr' as of 31 Mar 2025; top competitors Medallia, Qualtrics, Culture Amp, WorkJam, Lattice; ranked 69th of 838 in employee experience. The homepage logo list and engagement statistics (330+ CHROs, 1.3M employees analysed, 98% AI-answered) are unaudited vendor marketing and were not re-verified in this pass. Mar 2022 to Sep 2026 is 4.5 years without a disclosed round — arithmetic confirmed.

Source: https://tracxn.com/d/companies/infeedo-ai/__eFa9NdpR0na4B8XC0X_GxGTi1mpR6vXOKXkmMrgh4Fo

### 14. [high] inFeedo publishes no pricing at all — journey-based bundles with quote-only access.

VERIFIED. infeedo.ai/pricing publishes no per-employee rate, no currency and no minimum. Tier 'Starter' plus two further journey tiers; every CTA is 'Get a Quote' or 'Talk to Sales'.

Source: https://www.infeedo.ai/pricing

### 15. [high] Peoplebox publishes granular per-module per-employee pricing that sets a hard price ceiling for any India performance/engagement module: $2-8 per employee per month.

VERIFIED VERBATIM, all billed annually: Performance Management '$8/emp/month'; Individual Development Plans '$3/emp/month'; Engagement '$2/emp/month'; 360 degree '$8/emp/month'; Compensation '$5/emp/month'. Nova is the sole custom-priced item: 'Pricing depends on your hiring needs, resume and interview volume. Connect with our team for a tailored demo and quote.'

Source: https://www.peoplebox.ai/pricing/

### 16. [medium] Peoplebox has repositioned from OKR/performance to AI recruiting while running on a 34-person team and sub-Rs-10-Cr revenue.

Tracxn re-read and matches: founded 2019, Bengaluru; founders Abhinav Chugh (CEO) and Alagu Muthuraman; investors Y Combinator, Nexus Venture Partners and one more; 34 employees as of 28 Feb 2025; revenue '0 - Rs 10 Cr' as of 31 Mar 2025; Tracxn now describes it as 'Provider of AI-powered talent management platform'. The homepage repositioning claims ('Human-Like AI for Hiring and Managing Talent', 'Screen thousands of resumes in minutes') are vendor marketing and were not re-fetched this pass. Note the headcount is as of Feb 2025 — 19 months stale, the stalest datapoint in the set.

Source: https://tracxn.com/d/companies/peoplebox/__kaEHeg3fuSqV8jSZSG0LdIsKRiHSbZPGWa-YvnGp4M8

### 17. [high] CONFIRMED AS A REAL SOURCE DEFECT — Peoplebox funding is unusable. The Tracxn record contradicts itself on the page.

I specifically tested this. Tracxn states total funding '$1.6M in 2 rounds' while listing an individual seed round of $7,743,026 dated 13 Oct 2019 (plus a second 2022 seed rendering as $7,999). The first listed round alone exceeds the stated total by ~5x. The prior report's refusal to assert a figure was correct and is upheld. No Peoplebox funding number should enter a PRD.

Source: https://tracxn.com/d/companies/peoplebox/__kaEHeg3fuSqV8jSZSG0LdIsKRiHSbZPGWa-YvnGp4M8

### 18. [medium] Mesh is not India-headquartered despite Indian founders and an Indian operating entity, and its published pricing carries a $6,000 annual floor that excludes the India mid-market.

VERIFIED ON BOTH SIDES. mesh.ai/pricing: Foundations '$4/person/month', Growth '$8/person/month', Excellence '$12/person/month', with 'Minimum 1-year commitment with $6,000 billing with all subscriptions'. Tracxn: founded 2020; HQ San Jose, United States; India entity 'PEOPLE MESH PRIVATE LIMITED' (CIN U72900HR2020PTC086697 — a Haryana registration, not Karnataka); founders Saurabh Nangia (CEO), Rahul Singh, Gaurav Chaubey; $16M across 3 rounds (Seed Aug 2020, Seed Mar 2021, Series A 13 Apr 2022); investors Y Combinator, RTP Global, Emles, Neeraj Arora plus 11 more; 128 employees as of 31 Jul 2026; revenue band Rs 10-50 Cr as of 31 Mar 2025; top competitors Workboard, Arcade, Profit. The report's assertion that Workboard 'has raised $140M' carries no source and I did not verify it — do not reuse that figure.

Source: https://tracxn.com/d/companies/mesh-ai/__SjAKCFoVnJxmieTDi-hxyNiDJObvuG1_WiQR1GDjuIk

### 19. [high] 15Five publishes a full per-seat price card and prices AI agents INSIDE the standard tier rather than as a premium add-on.

VERIFIED VERBATIM, all billed annually: Engage '$4 per user per month'; Perform '$11 per user per month' (marked Most Popular); Total Platform '$16 per user per month'. Add-ons: Kona Meeting Assistant '$2 per employee per month'; Kona Coach '$19 per manager per month'; Compensation base '$9 per user per month', with salary benchmarking '$11 per user per month'; Manager Products Content '$49 per manager per month'; Coaching '$399 per credit' (1-on-1 = 1 credit, group = 5). Confirmed that AMAYA, AI-Assisted Reviews, 15Five Agents and Focus Briefs are included in the Perform and Total Platform tiers at no additional charge.

Source: https://www.15five.com/pricing/

### 20. [high] Culture Amp publishes no prices, segments purely by headcount band, and bundles AI Coach into every tier including the smallest.

VERIFIED VERBATIM: 'Pricing depends on the number of employees, product chosen, and service tier. All Culture Amp products are billed on an annual basis.' Bands: under 200, 200-999, 1000+. 'Every plan includes: AI Coach' heads the feature list and applies across all three bands. Same 'AI is table stakes, not a surcharge' pattern as 15Five.

Source: https://www.cultureamp.com/pricing

### 21. [low] CORRECTED — Leapsome does market AI agents; the report's 'no AI claims / unknown' is wrong. Its per-user price remains genuinely unresolved.

Second fetch of leapsome.com/pricing resolves the AI question against the report: the page describes 'AI Agents' providing meeting summaries, workflow creation by prompt, policy question answering and automated review drafts. Firm facts confirmed: EUR base currency with USD/GBP options, minimum contract term 1 year, no setup fee, modular across HRIS/Recruiting/Reviews/Surveys/Goals/Learning/Compensation/Time Tracking, 'Multi-module & volume discounts available', customer success gated at EUR 6,000+ annual contract value. On price: the figure 199 with EUR is confirmed present, but the 'per user per month' attribution returned by extraction is almost certainly a parse artifact — EUR 199 per seat per month would be over 12x 15Five's top published tier and is not credible for this category. Treat 199 as a probable platform/entry floor. Per-user price NOT asserted.

Source: https://www.leapsome.com/pricing

### 22. [high] Truein publishes true rupee-denominated pricing for blue-collar attendance on a fixed annual platform fee plus a very low per-head rate — a completely different price architecture from per-seat HRMS.

VERIFIED VERBATIM for India, with one label correction. India (INR, annual): Time Capture 'Rs 250/user/year + Rs 69,000 base/year'; Advanced 'Rs 350/user/year + Rs 69,000 base/year'; add-ons Live Tracking Rs 200/user/year and Leave Management Rs 60/user/year. US (USD): $0.58 and $0.75/user/month, or $1 and $1.25/user/month + $40/month base. CORRECTION: the $2.25 and $3.50/user/month tier is the INTERNATIONAL rate on the page, not the GCC rate as the report labelled it; GCC mirrors the US structure. Note the India economics: Rs 250/user/year is roughly Rs 21/user/month, so at 200 workers the Rs 69,000 platform fee is over half the bill — this is a fixed-fee-dominant model at small scale, not a per-head one.

Source: https://truein.com/pricing/

### 23. [medium] Truein is a 27-person, $2.5M-funded company punching above its weight in the contingent/site-based workforce niche.

Tracxn re-read and matches: founded 2017, Pune; founder Ankit Tanna; $2.5M across 5 rounds; latest Seed 1 Jun 2023 with amount redacted; investors Story Ventures, Upekkha plus 15 more; 27 employees as of 31 Aug 2025; revenue under Rs 10 Cr as of 31 Mar 2025; top competitors WorkJam, SIMPRO, Parsable; described as 'AI-based contingent workforce management platform'. Jun 2023 to Sep 2026 is 3.25 years without new disclosed capital — confirmed. The site's 500+ customers / 500,000+ users / 10,000+ locations / 25 countries and the logo list (Compass Group, OCS, Air India, Adani, Tata Projects, CBRE, Knight Frank, Lenskart) are unaudited vendor marketing, not re-verified this pass.

Source: https://tracxn.com/d/companies/truein/__BD1vGi0JidPvWd-PbuDQ2QdInFs1pDh4wHGk2aNAB1I

### 24. [medium] The India statutory-compliance layer has already consolidated: Aparajitha bought 76% of Simpliance at an enterprise value of Rs 120 crore, creating a combined services-plus-SaaS entity.

VERIFIED VERBATIM: 'a strategic 76% equity stake in Simpliance Technologies Private Limited'; 'The deal is valued at an Enterprise Value of INR 120 crores, on a cash and debt free basis'; Aparajitha 'over 1,500 employees on its rolls and presence in 25 Indian States' with 'over 1,700 clients'; Simpliance '~120 clients'. DATE RESOLVED IN FAVOUR OF 2022: the page renders '11/09/2024', but the release text states this was the second acquisition within four months following the purchase of Comply India Tech Services assets 'in June 2022'. June 2022 plus four months lands in October 2022, matching Crunchbase's 2022-10-06. The 2024 stamp is best read as a page republish date, not the deal date.

Source: https://www.aparajitha.com/media-press-releases/aparajitha-simpliance-join-hands-to-create-the-countrys-largest-regulatory-compliance-organization/

### 25. [high] Aparajitha sells a full software stack alongside services — including payroll processing — and makes no AI claims whatsoever. This is the single most exploitable gap in the India competitive set.

VERIFIED, INCLUDING THE NEGATIVE. Software: Simpliance Classic (automated labour law compliance), REMO (regulatory compliance management), Vendor (vendor compliance), Audit (bespoke audit management), Remit (payroll/remittance). Services: compliance risk audit, establishment, payroll compliance, factory, vendor, mines, flexi staffing, payroll, EHS, and Labour Codes Consulting as a named line. Certifications SOC 2 Type 2, ISO/IEC 27001:2022, ISO 9001:2015. On AI, verified explicitly: no reference to artificial intelligence, machine learning or algorithmic decision-making appears anywhere on the page; the strongest language is 'knowledge-driven, tech-enabled', which is not an AI claim.

Source: https://www.aparajitha.com/

### 26. [medium] Quess Corp is larger than TeamLease but growing far slower, and its growth decelerated sharply in FY26.

Revenue verified and arithmetic recomputed: FY26 153.05B INR at +2.26%; FY25 149.67B INR at +9.29%. 153.05/149.67 = 1.0226, confirming +2.26% — growth fell by roughly three quarters year on year. The report's characterisation of Quess's segments ('Digital Platform', 'Gig Workforce Platform', no licensable standalone HRMS) rests on the Quess IR page, which I did NOT re-fetch this pass; treat the segment description as unverified while the revenue figures are solid.

Source: https://stockanalysis.com/quote/nse/QUESS/revenue/

### 27. [high] RETRACTED AND REPLACED — India EOR pricing spans roughly 3x, not 4x. Multiplier's EOR price is $300, not $400; the report's figure is not in its own cited source.

The report asserts 'Multiplier reported at $400' and builds a '4x range' on it. I fetched the cited TechCrunch article: it quotes '$300 per employee per month' for the EOR solution, '$40 per freelancer per month', and '$20 per employee a month' for payroll on an existing local entity. The $400 appears to be contamination from the '$400 million' valuation in the same sentence. CORRECTED RANGE: Wisemonk $99 (review-site, June 2026) to Skuad $199 (vendor primary, current) to Multiplier $300 (press, March 2022) — about 3x, and the top of that range is a four-year-old figure that should not be compared like-for-like with 2026 prices. Skuad's figures are the only current vendor-primary EOR prices in this set and are verified verbatim: EOR 'Starting from $199 per employee/month', AOR 'Starting from $99 per contractor/month', CMS 'Starting from $19 per contractor/month'.

Source: https://techcrunch.com/2022/03/15/remote-work-platform-multiplier-raises-60m-series-b-at-400m-valuation

### 28. [high] Skuad has been absorbed by Payoneer — the India-origin EOR exit path ran to a payments company, not to an HR company.

VERIFIED. skuad.io/pricing renders under Payoneer branding ('Payoneer WFM black logo', 'Payoneer Workforce Management' throughout) and the footer identifies 'Skuad Pte Limited (a Payoneer group company)' alongside 'Skuad Netherlands B.V.' and 'The Currency Cloud Limited' — Currencycloud being another Visa/payments-side entity, reinforcing that the acquirer's centre of gravity is payments infrastructure.

Source: https://www.skuad.io/pricing

### 29. [low] Wisemonk is bootstrapped, tiny and India-specialised — but every figure here comes from a single affiliate-style review site and none is vendor-primary.

The anywherer.com review (June 2026) states: founded 2020; HQ Bengaluru; legal entity 'Storypeach Technologies Private Limited'; 'self-funded and bootstrapped: it has not raised external venture capital'; 11-50 employees; 300+ customers across 30+ countries; EOR '$99 per employee per month' scaling to $399; contractor '$19 per contractor per month'; flat fee with no percentage-of-salary component; PF (12%) and ESI included in the base fee. The same review's assertion that global EOR platforms 'typically charge $499 to $699 per employee per month for India' is that site's own claim and is contradicted by Skuad's published $199 — DO NOT reuse the $499-$699 figure. Wisemonk's own pricing page timed out on the prior pass and I did not obtain a vendor primary. Confidence lowered from medium to low: a single review site, unverified, is not a basis for a pricing floor.

Source: https://www.anywherer.com/wisemonk-review/

### 30. [medium] Xoxoday is by revenue the largest India-origin company in this set and raised a Series C in January 2026 — but the 'larger than every India HR SaaS vendor' framing needs care, and its pricing remains unobtainable.

Tracxn re-read and matches exactly: founded 2012, Bengaluru; total funding $101M across 6 rounds; latest round Series C on 14 Jan 2026, amount undisclosed; 8 institutional and 11 angel investors including Mahindra, Giift, Apis Partners; 349 employees as of 31 May 2026; revenue band Rs 500-1,000 Cr as of 31 Mar 2025; 'got acquired by Giift on Mar 14, 2022'; 5 acquisitions of its own including Amara (28 May 2026), Blue Bulb (2018) and BookMyInterest (2016); ranked 4th of 1,655 competitors. CAUTION: Xoxoday is a rewards/payouts business whose revenue includes reward value flow-through, so its band is not comparable like-for-like with SaaS subscription revenue. PRICING STILL UNKNOWN after genuine retry — xoxoday.com/pricing returned HTTP 429 again and empuls.io refused the connection (ECONNREFUSED). Empuls per-employee pricing remains a real, open gap.

Source: https://tracxn.com/d/companies/xoxoday/__kuXmBm7dx7uiki2C53huUPVp4Gsri8HvFrjuAVGWURI

### 31. [medium] Vantage Circle reached a Rs 100-500 crore revenue band on essentially no venture capital — $350K total — making rewards and recognition the most capital-efficient India HR software category in this set.

Tracxn re-read and matches with one correction: total funding $350K across 3 rounds; 20 angel investors (the report said 21); 306 employees as of 31 Jul 2026; revenue band Rs 100-500 Cr as of 31 Mar 2024; Tracxn lists HQ as Plano, United States (holding-company domicile — the business is India-operated) and founding year 2011 against the company's own about-us claim of 2010. IMPORTANT STALENESS: the revenue band is as of 31 Mar 2024, a full year older than every other band in this set, so the capital-efficiency comparison is not like-for-like on date.

Source: https://tracxn.com/d/companies/vantage-circle/__uCZL53dBmCYj9fDfyQFJLPxsndmmFjkjeRX1S8ufomg

### 32. [high] Vantage Circle does not publish pricing and sells in bundles, not per-seat.

VERIFIED VERBATIM: 'Pricing is custom and based on your organization size, selected products, and required integrations.' Three bundles: Grow (Recognition + Perks), Transform (adds Wellness), Scale (adds Feedback plus enterprise capabilities). No per-seat rate, no currency, no minimum disclosed. CTA is 'Book a demo and our team will provide a tailored quote'.

Source: https://www.vantagecircle.com/pricing/

### 33. [medium] Advantage Club reached a Rs 100-500 crore revenue band on $11M raised and has expanded into incentive compensation and sales commission — payroll-adjacent territory.

Tracxn re-read and matches: founded 2016; HQ San Francisco (holding domicile; India-operated); founders Sourabh Deorah (CEO), Smiti Deorah (COO), Udit Gupta, Sankalp Khanna; $11M across 6 rounds; most recent Series A 2 Dec 2024; 37 institutional plus 34 angel investors (= the 71 the report cited); 315 employees as of 31 Jul 2026; revenue band Rs 100-500 Cr as of 31 Mar 2025; ranked 7th of 748; top competitors Medallia, Qualtrics, Culture Amp. CORRECTION TO THE REPORT'S COMPARISON: 'Xoxoday is 5x its revenue band' is band-floor arithmetic (500/100); on band midpoints it is 2.5x and the true multiple is indeterminate. The 9x funding multiple ($101M/$11M) is correct. Site claims (16M+ users, 1,200+ clients, $300M+ rewards distributed, and the BCG/Tata Steel/HCLTech/PwC logo list) are unaudited vendor marketing, not re-verified this pass.

Source: https://tracxn.com/d/companies/advantageclubai/__gIGHosOrHeh2oTv9YrDGeIQgHWiSvp3bP_Pzjr_Z_RM

### 34. [medium] Multiplier's last verified round is a $60M Series B at a $400M valuation from March 2022, taking total funding to $77.2M. Nothing more recent was found, and no current pricing exists in this research.

TechCrunch, 15 March 2022, verified: '$60 million Series B' at '$400 million' valuation, total funding '$77.2 million', co-led by Tiger Global and Sequoia Capital India, founded 2020, Singapore-headquartered with substantial India operations, operating in 'more than 150 countries' with clients including Amazon and ServiceNow. No 2023-2026 round surfaced. usemultiplier.com returned HTTP 403 on every path including its own funding press page, so nothing is verified against vendor primary and CURRENT MULTIPLIER PRICING IS UNKNOWN — the 2022 figures must not be presented as today's prices.

Source: https://techcrunch.com/2022/03/15/remote-work-platform-multiplier-raises-60m-series-b-at-400m-valuation

### 35. [medium] ComplyHR could not be verified as an operating company and should be dropped from the competitive set until a legal name is supplied.

CONFIRMED ON RETRY. complyhr.io fails at DNS resolution (getaddrinfo ENOTFOUND www.complyhr.io) on a fresh independent attempt. No evidence of the company was found from any source in either sweep. This is a genuine non-finding, correctly reported.

Source: https://www.complyhr.io/

## Implications

- Do not use the Multiplier EOR price at any figure. The $400 in the prior report is fabricated, the correct 2022 source figure is $300, and current pricing is unobtainable because the vendor's site returns 403. Skuad's $199 is the only current vendor-primary EOR price in this research and is the only one safe to quote.
- Do not quote any Tracxn revenue band as a fact about a competitor. Every band was transcribed accurately, but they are analyst estimates with inconsistent as-of dates (Vantage Circle's is a full year staler than the rest) and Tracxn's HQ fields track holding-company domicile, not operating reality. Use them for relative sizing only, with the as-of date attached.
- Never quote a Peoplebox funding figure. Its Tracxn record is self-contradictory on the page — $1.6M stated total against a listed $7,743,026 seed — and no filing resolves it.
- Size the competitive set against Keka before finalising positioning. It is the best-capitalised India HRMS pure-play ($57M WestBridge Series A, Rs 78 Cr FY24 revenue, payroll for 1.5M+ employees monthly) and was entirely absent from the prior analysis. Its pricing and AI posture are both unverified and are the highest-value open research items here.
- Treat the India competitive set as incomplete rather than surveyed. Three of thirteen original profiles were non-India vendors, and the mid-market India tier (ZingHR, Zimyo, HROne, Qandle) plus listed Ramco Systems were never swept.
- Assume AI is table stakes and price it inside the base tier. Both transparent anchors bundle it; a premium AI SKU will read as a surcharge on an expected feature.
- Model the compliance business at low single-digit margins, not software margins. TeamLease's regulatory-compliance-and-SaaS segment grew 23% while returning a 1.33% segment margin in FY25 — fast growth in this category is not the same as attractive economics, and the pass-through mechanism it relies on (recovering statutory cost from customers for billable employees) is not available to a product company.
- HONO is the direct positioning threat and should be assumed to hold the agentic narrative already, but it is beatable on capital: $10.6M lifetime with no growth round since a redacted angel round in July 2024, against a Rs 50-100 Cr revenue band on 635 people.
- Every vendor scale claim in this research (HONO 1.8M users, inFeedo 330+ CHROs, Advantage Club 16M users, Truein 500+ customers, Akrivia 100+ enterprises) is unaudited marketing. None should appear in a PRD as a market fact.
- If biometric attendance is in scope, the DPDP exposure that Truein's marketing does not address is an open compliance question that must be answered in the PRD rather than inherited from the incumbent's silence.

## Opportunities

- The Aparajitha finding is the strongest verified opportunity in the set, and it was verified as an explicit negative: India's largest labour-compliance organisation — 1,500+ staff across 25 states, owner of the Simpliance software suite including a payroll processing product, SOC 2 Type 2 and ISO 27001 certified — makes no AI, machine-learning or algorithmic claim anywhere on its site. The deepest statutory dataset in India sits behind zero intelligence layer.
- The Labour Codes are a live, quantified, dual-compliance event, not a forecast. A listed company has already booked Rs 5.68 crore against them and central and state rules are still unnotified, so every employer is running legacy statutes and the Codes simultaneously with no settled timeline. A product that maintains both regimes concurrently and tracks state-by-state notification is addressing a documented, currently-unmet need.
- AI is being priced as included, not as a surcharge, by both transparent Western anchors — 15Five bundles AMAYA and its Agents into the $11 Perform tier, Culture Amp includes AI Coach in every band including under-200. Any India pricing model that charges a premium for AI is fighting an established market expectation.
- Verified per-employee price ceilings now exist for every adjacent module: performance $8, 360 $8, compensation $5, IDPs $3, engagement $2 (Peoplebox); performance tiers at $4/$8/$12 (Mesh). These are hard anchors for what an India suite can charge per module, and Mesh's $6,000 annual floor is what prices global point solutions out of the India mid-market entirely.
- Truein proves an India-native price architecture works where per-seat USD does not: Rs 250-350 per user per year plus a Rs 69,000 fixed platform fee, with deactivated users not charged. For contract labour at Rs ~21 per head per month, this is a fundamentally different commercial model from per-seat HRMS and is the pattern to copy for blue-collar coverage.
- The rewards and recognition adjacency is the most capital-efficient category in India HR software and the weakest on AI — Vantage Circle reached a Rs 100-500 Cr band on $350K raised with no named agent, and Advantage Club reached the same band on $11M with only surface-level AI naming. High revenue, high daily engagement, no AI depth.
- Verified attendance for contract labour is upstream of payroll and is a genuinely differentiated data asset that a 27-person company (Truein) holds. Whoever owns verified presence owns the payroll input, and the incumbent is small enough to partner with or acquire rather than out-build.
- TeamLease's Rs 6.4 crore impairment of its own HR technology subsidiary is direct filed evidence that distribution, capital and compliance depth are not sufficient to build HR software — useful both as a build-versus-partner argument and as evidence that the incumbent services players are unlikely to produce a credible software rival.

## Open questions

- What are Keka's published INR price tiers, minimum seat counts and AI feature set? keka.com is unreachable through this network's TLS inspection and this is now the single highest-value gap in the competitive set.
- What is Empuls's per-employee price? Two independent attempts failed (xoxoday.com/pricing HTTP 429 on five total attempts across both sweeps; empuls.io ECONNREFUSED). Xoxoday is the largest India-origin vendor here and its price point is entirely unknown.
- Does Simpliance expose a usable API for third-party HRMS integration? This is the decisive question for any partnership with Aparajitha and cannot be answered from public pages.
- What is Akrivia's actual revenue? Both available figures are estimates (Tracxn's Rs 10-50 Cr band; GetLatka's self-declared $21.1M estimation). Resolution requires MCA/Tofler filings for the operating entity, reportedly 'Akrivia Automation Pvt Ltd'.
- What is Multiplier's 2026 EOR pricing, and has it raised since March 2022? The vendor site returns 403 on every path including its own funding press page.
- What is Leapsome's actual per-user price, and what does the EUR 199 figure denominate — a seat price, a platform floor, or an entry bundle? Two reads have failed to resolve the unit.
- Did TeamLease's Other HR Services segment result actually turn negative in FY26? The scanned filing's OCR renders a parenthesised value against Rs 2.62 Cr in FY25, but the press release separately claims segment EBITDA grew 22% (a pre-D&A line). A clean copy of the segment table from the BSE/NSE filing would settle it, and the answer materially changes how attractive the India compliance category looks.
- Should Ramco Systems be in the competitive set? It is India-headquartered, listed, sells global payroll and HCM and ships an AI assistant called 'Chia' — confirmed to exist but never sized in this research.
- What does the India mid-market HRMS tier look like? ZingHR, Zimyo, HROne and Qandle were not examined at all, and that is where an India-native price point would actually be contested.
- Is Wisemonk's $99 EOR price real? It rests entirely on one affiliate-style review site, and the same source's claim that global platforms charge $499-$699 for India is already contradicted by Skuad's published $199 — which casts doubt on the $99 too.

## Retracted

- RETRACTED — 'Multiplier reported at $400' per employee per month for EOR, and the derived claim that 'India EOR pricing spans a 4x range'. The cited TechCrunch article says $300 per employee per month. The $400 is not in the source and appears to be contamination from the $400M valuation named in the same sentence. Corrected range is $99-$300, roughly 3x, and it compares 2026 prices to a 2022 figure.
- RETRACTED — 'TeamLease is roughly 100x the revenue of any India HR SaaS vendor in this set.' Recomputed from the audited filing: Rs 11,790.67 Cr against Xoxoday's Rs 500-1,000 Cr band is 11.8x-23.6x, and against Vantage Circle and Advantage Club (Rs 100-500 Cr) is 23.6x-118x. The 100x multiple holds only against the smallest vendors, not 'any' of them.
- RETRACTED — 'Xoxoday ... 5x its [Advantage Club's] revenue band.' This is band-floor arithmetic (500/100). On band midpoints the ratio is 2.5x and the true multiple is indeterminate from banded data. The companion claim of 9x funding ($101M vs $11M) is correct and stands.
- RETRACTED as framing — the presentation of Akrivia's revenue as an irreconcilable two-source dispute with 'neither verified'. The GetLatka page states on its face that the $21.1M figure is 'an estimation' with no management interview, and its headcount (192) also disagrees with Tracxn (222). It is a model output, not a co-equal source; the Rs 10-50 Cr analyst band should be the working assumption.
- RETRACTED — Truein's '$2.25 and $3.50/user/month' described as GCC pricing. The pricing page shows these as the International rates; GCC mirrors the US structure.
- RETRACTED — Leapsome 'ai_capabilities: unknown — no AI claims were captured'. Leapsome markets 'AI Agents' across the platform (meeting summaries, prompt-driven workflow creation, policy Q&A, automated review drafts). The absence claim was wrong.
- RETRACTED — HONO's tagline quoted as 'The World's First Headless, Zero-UI AI HRMS'. The homepage reads 'Enterprise HR, finally invisible. The world's first headless HRMS - run your people operations on a single conversation.' 'Zero-UI' was not found on the page. The substance of the positioning claim stands; the quotation does not.
- RETRACTED — Vantage Circle '21 investors'. Tracxn shows 20 angel investors.
- DOWNGRADED to positioning claim, unverified — the assertion that earlier press named IndiGo, Spencer's Retail and HDFC Bank as HONO customers. Only Spencers Retail appears on the current site; IndiGo and HDFC Bank are unverified.
- DOWNGRADED to unsourced — 'Workboard, which has raised $140M'. No source was given and the figure was not verified. Do not reuse.
- DOWNGRADED from medium to low — the entire Wisemonk profile and the '$499 to $699' figure for global EOR platforms in India. All of it rests on one affiliate-style review site with no vendor-primary corroboration, and the $499-$699 claim is contradicted by Skuad's published $199.
- DOWNGRADED from medium to low — Akrivia's competitive-displacement blog pages. Because akriviahcm.com is unreachable, even the existence of those pages rests on search-result metadata rather than a successful fetch.
- NOT RETRACTED, clarified — the report's odd 'each grew 23%' and '22% respectively' phrasing for TeamLease HR Services. Both figures appear in the source: the highlights section says 'each grew 23%' while the HR Services section says '23% and 22% respectively'. The inconsistency belongs to TeamLease's press release, not to the report.

## Competitors

### Keka (ADDED — omitted entirely by the original report)
- **segment**: India SMB-to-mid-market and increasingly enterprise HRMS and payroll; Hyderabad, with offices in Singapore and Seattle
- **positioning**: CLASSIFICATION: DIRECT COMPETITOR, and the most conspicuous omission in the original set. Keka is the best-capitalised India HRMS pure-play in the market and was left out while three non-India vendors (15Five, Culture Amp, Leapsome) were profiled. Founded by Vijay Yalamanchili; positions on employee-experience-led, automation-driven HRMS rather than on compliance depth.
- **pricing**: unknown — keka.com/pricing could not be read (TLS chain verification failure through the same inspection proxy that blocks Akrivia). Keka is known to publish INR per-employee-per-month tiers with a monthly minimum, so this is a high-value gap worth one manual check from an unproxied network.
- **ai_capabilities**: unassessed — no Keka page could be fetched in this sweep. Do not assume absence.
- **strengths**: $57M Series A from WestBridge Capital (Nov 2022), reported as the largest Series A in Indian SaaS history — more capital than every other India vendor in this set combined at the small end; Claims payroll for more than 1.5 million employees monthly and 5,500+ customers as of 2021 — genuine India distribution at mid-market scale; Rs 78 Cr FY24 revenue sits at or above HONO's entire Rs 50-100 Cr band, on a product-led rather than services-led motion; Hyderabad cost base with a Singapore and Seattle presence for international expansion
- **weaknesses**: Losses reportedly increased 2.8x in FY24 against Rs 78 Cr revenue — growth is being bought; No disclosed round since the 2022 Series A, so the $57M has been funding four years of burn; Founding year is disputed (2014 per Wikipedia, 2016 per Keka's own release), a minor signal that public data on the company is loosely maintained; Pricing and AI posture both unverified in this research — a real blind spot for any PRD positioning against it

### HONO (hono.ai)
- **segment**: India + MENA + SEA enterprise HRMS; listed conglomerates and large domestic enterprises
- **positioning**: CLASSIFICATION: DIRECT COMPETITOR — the most direct one in this set. HONO has already claimed the agentic-AI narrative slot an AI-first India HRMS would want. Verified homepage tagline: 'Enterprise HR, finally invisible. The world's first headless HRMS - run your people operations on a single conversation.' (The original report's 'World's First Headless, Zero-UI AI HRMS' is not the on-page string.) Full suite with agentic AI layered on the core rather than bolted beside it.
- **pricing**: unknown — no pricing published anywhere on the site
- **ai_capabilities**: Named agents rather than generic AI copy, all verified on the homepage: 'ERA' as the agentic AI layer for HR; 'ARASMAS' which 'predicts absenteeism and fills attendance gaps automatically'; Smart Hiring as '12 AI agents that screen, rank, schedule and onboard'; payroll branded 'Zero Touch Payroll'. Chat-first conversational HRMS.
- **strengths**: Owns the agentic/headless narrative in India; naming individual agents (ERA, ARASMAS) is stickier than generic AI claims; Verified enterprise logo wall of roughly 50 names including Accor, DHL, ITC Group, Toyota Boshoku, Tata Hitachi, Eveready, Holiday Inn, G4S, Hinduja Group, Kajaria, Lodha Group, Spencers Retail; Claimed multi-country payroll across 25+ countries and operations in 50+ — a genuine MENA/SEA footprint; Founded 2008, so the underlying HRMS is 18 years mature; the AI layer sits on a tested core; 635 employees as of May 2026 — real enterprise implementation capacity
- **weaknesses**: Financially thin for the claims: Rs 50-100 Cr band on 635 people, and $10.6M raised lifetime across 5 rounds; Last disclosed round was an angel round in July 2024 with the amount redacted; no growth-stage capital visible, and Tracxn redacts enough that $10.6M is a floor rather than a proven total; Publicly missed its own stated 5M-users-by-FY23 target; site claims 1.8M today, a 2.8x shortfall (the target itself is sourced to 2022 trade press not re-verified); No published pricing, so no price defensibility and a slow sales-led motion; Every scale claim (1.8M users, 300+ enterprises) is unaudited vendor marketing with no third-party corroboration; The report's claim that earlier press named IndiGo and HDFC Bank as customers is unverified — neither appears on the current site

### Akrivia HCM
- **segment**: India, GCC and SEA enterprise HCM; stated target is organisations with 1,000+ employees in manufacturing, retail, healthcare and BFSI
- **positioning**: CLASSIFICATION: DIRECT COMPETITOR, and the clearest proof-point that a bootstrapped India enterprise HCM can win enterprise logos — but note that ALL Akrivia detail here is secondary. Its own site is unreachable (SSL-inspection interstitial from 148.72.1.74, reproduced on a fresh attempt), so nothing is vendor-primary.
- **pricing**: unknown — 'Price Available on Request' per a reseller listing; no per-employee rate published anywhere reachable
- **ai_capabilities**: UNASSESSED, NOT ABSENT. Search snippets reference 'Akrivia CoPilot, AI Agents, and AI Insights' but no Akrivia page could be read at any path in either sweep. Do not treat Akrivia as an AI laggard on this evidence.
- **strengths**: Unfunded since founding in 2018 — zero VC raised, so no burn pressure and no forced discounting; Claimed 100+ enterprise customers across India, GCC and SEA (reseller-sourced, unverified); Full-suite breadth (20+ modules claimed) on a bootstrapped cost base; Visakhapatnam headquarters gives an engineering cost base well below Bengaluru/Hyderabad rivals; Tracxn lists it against Workday, PeopleStrong, Kronos, Deel and greytHR — it is being categorised as a genuine HCM, not an engagement point tool
- **weaknesses**: Headcount fell 16.0% year-on-year to 222 as of Aug 2025 — a contraction signal; Revenue unresolved but the balance of evidence favours the low end: Tracxn's Rs 10-50 Cr band is an analyst estimate, while the competing $21.1M GetLatka figure is explicitly self-declared as 'an estimation' with no management input, and disagrees with Tracxn on headcount too (192 vs 222); No published pricing and no AI narrative reaching the market — it is losing the positioning race to HONO regardless of what it has built; Unfunded means it cannot fund a genuine agentic rebuild if the category shifts; Its website is unreachable through at least one common enterprise network path — a direct commercial liability, and reproducibly so

### inFeedo (Amber)
- **segment**: Large Indian and SEA enterprises; sold to CHROs in BFSI, IT, automotive, FMCG, media and healthcare
- **positioning**: CLASSIFICATION: ACQUISITION TARGET first, competitor second. inFeedo owns the conversational-HR-AI brand in Indian enterprises but has not converted it into revenue — $20M raised across 7 rounds since 2016, 142 people, and a revenue band under Rs 10 Cr as of FY25. Sells Amber (conversational engagement agent) and Lens ('AI People Scientist').
- **pricing**: unknown, verified — three journey bundles (Starter plus two) with no per-employee price, no currency and no minimum; every CTA is 'Get a Quote' or 'Talk to Sales'
- **ai_capabilities**: Positions as an agentic AI platform for predictive intelligence, HR automation and communication from onboarding to exit. Homepage claims (98% of queries AI-answered, 90% survey response) are vendor marketing, not re-verified in this pass.
- **strengths**: The strongest enterprise logo list of any India HR AI company in this set (Sony, Lenovo, Axis, EY, Tata, ICICI, Indian Oil, Maruti Suzuki, Samsung, Airtel, Genpact) — though this is vendor-marketing, unverified; Y Combinator, Tiger Global, LetsVenture and Bling Capital backing gives a credible cap table for an acquirer; 'Amber' has genuine category-defining brand equity in India — CHROs name the product, not the company
- **weaknesses**: Revenue band under Rs 10 Cr despite the claimed 330+ enterprise customers — implies very low ACV and weak monetisation of the conversational layer; No disclosed round since Series A in March 2022 — 4.5 years without visible new capital; 142 people against $20M raised suggests runway squeeze rather than growth investment; Point solution: it listens and answers but does not hold the system of record, so it is always a line item vulnerable to bundling; Tracxn categorises it against Medallia, Qualtrics, Culture Amp and Lattice — the survey/experience framing, which is the lowest-value slot available

### Peoplebox
- **segment**: Mid-market and enterprise talent management; Bengaluru-HQ but selling substantially into US/global buyers
- **positioning**: CLASSIFICATION: COMPETITOR in the AI-recruiting lane, and a cautionary case. Repositioned from performance/OKR to AI hiring, led by Nova, its AI interviewer. Tellingly, the legacy performance suite is the part with published prices while Nova is quote-only — a clear signal about where margin now lives.
- **pricing**: Published and verified verbatim, per employee per month billed annually: Performance Management $8; Individual Development Plans $3; Engagement $2; 360 degree $8; Compensation $5. Nova is custom-priced: 'depends on your hiring needs, resume and interview volume'.
- **ai_capabilities**: Nova, an AI teammate doing resume screening, AI interviews, pre-screening calls, live coding rounds and proctoring, plus AI-generated development areas and 360 insights in the legacy suite. Homepage claims not re-verified this pass.
- **strengths**: Rare pricing transparency — a full per-module price card that wins bottom-up mid-market deals; Y Combinator and Nexus Venture Partners backing; Moved early into AI interviewing, where budget is actually being released in 2026
- **weaknesses**: 34 employees (as of Feb 2025 — the stalest headcount in this set) and revenue under Rs 10 Cr; FUNDING IS UNUSABLE: Tracxn states $1.6M across 2 rounds while listing a single seed of $7,743,026; the record contradicts itself and no figure should be quoted; The pivot is itself the tell — the performance/OKR business did not sustain, so the team moved to recruiting; Its $8/employee/month performance price is a hard ceiling on what any India entrant can charge for equivalent functionality; Tracxn now reads it as an engagement vendor (Medallia, Qualtrics, Culture Amp, Lattice), not a hiring platform

### Mesh
- **segment**: Mid-to-large organisations globally; India-founded and India-staffed with a US holding structure
- **positioning**: CLASSIFICATION: COMPETITOR in performance only, and not India-headquartered despite Indian founders. Markets as an AI-native performance management platform and deliberately refuses the HRIS framing — it sells performance enablement, not a system of record.
- **pricing**: Published and verified: Foundations $4/person/month, Growth $8, Excellence $12, with 'Minimum 1-year commitment with $6,000 billing with all subscriptions'.
- **ai_capabilities**: 'Maven' as the named AI, tiered across the price card as Maven Assistant (entry), Maven Nudges and Maven Coach (higher tiers) — AI as the upgrade path, which is a deliberate monetisation design.
- **strengths**: Clean AI-native positioning with a named assistant tiered across the price card; $16M raised including Y Combinator and RTP Global; 128 employees as of Jul 2026; Mixed US and Asia logo base spanning Dana, Grant Thornton, InfoEdge, Zeta Services, Amartha, Pipefy; Explicitly refuses to compete as an HRIS, keeping it easy to sell alongside an incumbent HRMS
- **weaknesses**: Not an India company commercially — HQ San Jose, US-facing GTM; the India entity (People Mesh Private Limited, a Haryana registration) books only Rs 10-50 Cr; No funding since Series A in April 2022; The $6,000 annual floor prices it out of the Indian SME and mid-market entirely; Point solution with no payroll, attendance or statutory surface — displaceable by a suite that is merely adequate at performance; Tracxn benchmarks it against Workboard, Arcade and Profit. NOTE: the original report's claim that Workboard 'has raised $140M' is unsourced and was not verified — do not reuse it

### 15Five
- **segment**: US mid-market performance and engagement; minimal India presence
- **positioning**: CLASSIFICATION: PRICE ANCHOR, NOT AN INDIA COMPETITOR. Included only because it is the most transparent per-seat price card in the category and because of how it prices AI — inside the standard tier, not above it. Its presence in a 'missing India competitors' sweep is scope drift.
- **pricing**: Verified verbatim, per user per month billed annually: Engage $4; Perform $11 (Most Popular); Total Platform $16. Add-ons: Kona Meeting Assistant $2/employee/month; Kona Coach $19/manager/month; Compensation base $9/user/month, with salary benchmarking $11; Manager Products Content $49/manager/month; Coaching $399/credit.
- **ai_capabilities**: AMAYA, 15Five Agents, AI-Assisted Reviews and Focus Briefs — verified as included in the Perform and Total Platform tiers at no additional charge, not sold as a premium AI SKU.
- **strengths**: Fully transparent pricing across every SKU including AI; Bundles AI agents into the mainstream tier, setting a market expectation that AI is included rather than surcharged; Mature manager-enablement content and coaching business layered on the software
- **weaknesses**: No meaningful India go-to-market, no INR pricing, no statutory compliance surface; $11-16 per user per month is far above Indian mid-market willingness to pay; Performance and engagement only — no payroll, attendance or compliance

### Culture Amp
- **segment**: Global employee experience; segmented by headcount bands under 200, 200-999, and 1000+
- **positioning**: CLASSIFICATION: PACKAGING REFERENCE, NOT AN INDIA COMPETITOR — again scope drift for this dimension. Useful mainly because it appears repeatedly as a Tracxn-listed competitor for Vantage Circle, Advantage Club, inFeedo and Peoplebox, which reveals how analysts are categorising the Indian engagement vendors.
- **pricing**: unknown, verified — 'Pricing depends on the number of employees, product chosen, and service tier. All Culture Amp products are billed on an annual basis.'
- **ai_capabilities**: 'AI Coach' verified as included in every plan including the smallest band — the same 'AI is table stakes, not a surcharge' pattern as 15Five.
- **strengths**: Category brand leadership in employee experience globally; People-science credibility and benchmarking data as a moat; AI Coach in all tiers removes AI as a competitive differentiator for challengers
- **weaknesses**: No published pricing, so every deal is sales-led and slow; No India statutory, payroll or attendance capability whatsoever; Priced and packaged for Western buyers

### Leapsome
- **segment**: European mid-market people enablement; modular HRIS plus performance, surveys, goals, learning, compensation, time tracking
- **positioning**: CLASSIFICATION: WEAK/PERIPHERAL for India — arguably should not occupy a slot in this dimension at all. Berlin-origin modular platform with a genuine HRIS module, so nominally suite-capable, but no India statutory surface and EUR-denominated.
- **pricing**: Partially unknown. Confirmed: EUR base currency (USD/GBP available), 1-year minimum term, no setup fee, multi-module and volume discounts, customer success gated at EUR 6,000+ annual contract value. The figure 199 is confirmed present with EUR but its unit is not — a 'per user per month' reading is almost certainly a parse artifact, since EUR 199/seat/month would be over 12x 15Five's top tier. Treat as a probable platform floor. Per-user price NOT asserted.
- **ai_capabilities**: CORRECTED FROM 'UNKNOWN'. Leapsome does market 'AI Agents' across the platform — meeting summaries, workflow creation by prompt, policy question answering, and automated review drafts. The original report's claim of no AI is wrong.
- **strengths**: Modular architecture including an HRIS module, so it can land small and expand; Established European mid-market brand with a broad module set; AI agents already shipped across the suite, not a roadmap promise
- **weaknesses**: No India payroll, no statutory compliance, EUR-denominated; EUR 6,000 threshold for customer success excludes the India mid-market; Pricing opacity — even the pricing page does not yield a reliable per-user number

### Vantage Circle
- **segment**: India-origin, global enterprise rewards, recognition, perks and wellness
- **positioning**: CLASSIFICATION: PARTNER, and a WEDGE-FROM-ADJACENCY THREAT if it moves toward core HR. Rewards and recognition is frequently the first HR SaaS an Indian mid-market company buys, and Vantage Circle sits in that slot on almost no capital.
- **pricing**: unknown, verified — 'Pricing is custom and based on your organization size, selected products, and required integrations.' Three bundles: Grow (Recognition + Perks), Transform (adds Wellness), Scale (adds Feedback plus enterprise capabilities). No per-seat rate, currency or minimum published.
- **ai_capabilities**: Thin. 'AI-powered recognition framework' and 'AI-powered solutions' with no named agent and no agentic claim — the weakest AI story of any vendor here relative to its revenue.
- **strengths**: Extraordinary capital efficiency: Rs 100-500 Cr revenue band on $350K raised across 3 angel rounds from 20 investors; Claimed 700+ global corporate clients, 3.2M+ users, 100+ countries (vendor marketing, unverified); Owns the employee-facing app and the rewards wallet — daily engagement an HRMS rarely achieves; Module breadth already spans recognition, perks, wellness, surveys and swags — one module from HR adjacency
- **weaknesses**: Essentially no AI capability despite the scale — wide open to an AI-native recognition challenger; No published pricing, so it competes on relationship rather than product-led growth; Founding year disputed (2010 own site vs 2011 Tracxn); Tracxn's Plano US HQ obscures the India operating reality; Its revenue band is as of 31 Mar 2024 — a full year staler than every other vendor here, so the capital-efficiency comparison is not date-matched

### Xoxoday (Empuls, Plum, Compass, Loyalife, Loopr)
- **segment**: India-origin, global rewards, incentives, loyalty and payouts; enterprise and mid-market
- **positioning**: CLASSIFICATION: WEDGE-FROM-ADJACENCY THREAT and PARTNER — the largest India-origin company in this set by reported revenue, though the band includes reward value flow-through and is not comparable like-for-like with SaaS subscription revenue. Not an HRMS, but Empuls plus Compass put it one acquisition from the engagement and compensation layer.
- **pricing**: unknown after genuine retry — xoxoday.com/pricing returned HTTP 429 again this pass and empuls.io refused the connection (ECONNREFUSED). Empuls per-employee pricing is a real, open gap.
- **ai_capabilities**: unknown — no product page could be fetched in either sweep. No AI claims asserted.
- **strengths**: Rs 500-1,000 Cr revenue band as of FY25 — the largest in this set, though inflated by rewards pass-through; $101M raised across 6 rounds with a Series C closed 14 January 2026 — actively capitalised right now, unlike almost every other vendor here; Corporate parent Giift plus Mahindra and Apis Partners give balance-sheet reach; Serial acquirer — 5 acquisitions including Amara (May 2026), Blue Bulb and BookMyInterest — it buys into adjacencies rather than building; Five-product portfolio spanning HR, sales and customer loyalty diversifies away from HR budget cycles
- **weaknesses**: Acquired by Giift in March 2022, so strategic direction is set by a loyalty/payments parent, not HR product logic; No verified AI narrative — product pages unreadable, and nothing in search suggested an agentic story; Rewards and payouts economics are gross-margin-thin relative to pure SaaS, so the revenue band overstates comparable scale; Split attention across HR, sales incentives and customer loyalty means HR is not the priority

### Advantage Club (advantageclub.ai)
- **segment**: Enterprise employee experience across financial services, IT, BPO, manufacturing and hospitality; distributed workforces
- **positioning**: CLASSIFICATION: WEDGE-FROM-ADJACENCY THREAT — the most aggressive of the three rewards players in moving toward HR core, having added Incentive Compensation Management, Sales Commission, Meal Card and Flexible Benefits to a recognition base. Incentive comp and flexible benefits are payroll-adjacent.
- **pricing**: unknown — no pricing disclosed on the site
- **ai_capabilities**: Brands itself an AI-powered employee experience platform but the substantiating claims are surface-level ('AI-Driven Health & Wellness', 'AI-Powered Insights', 'AI-Powered Loyalty Nudges'). No named agent, no agentic architecture claim. Not re-verified this pass.
- **strengths**: Rs 100-500 Cr revenue band on only $11M raised, with a Series A as recently as December 2024; Strong enterprise logos claimed (BCG, Concentrix, Tech Mahindra, Tata Steel, HCLTech, PwC, Bajaj Allianz) — vendor marketing, unverified; Product creep into incentive compensation and flexible benefits gives a credible path into comp and payroll adjacency; Y Combinator and Axilor Ventures backing, 71 investors in total (37 institutional, 34 angel)
- **weaknesses**: The '.ai' rebrand is not backed by substantive AI capability — naming, not architecture; No published pricing; Tracxn lists HQ as San Francisco while the operating centre of gravity is India — governance and GTM are split; Competes head-on with Xoxoday (9x its funding; revenue one band higher, though the '5x' multiple in the original report was band-floor arithmetic and is not defensible) and with Vantage Circle in a crowded category

### Truein
- **segment**: Contractual, hourly and multi-site staff — construction, facility management, logistics, manpower staffing, retail, manufacturing
- **positioning**: CLASSIFICATION: ACQUISITION TARGET or PARTNER, and a WEDGE-FROM-ADJACENCY THREAT into blue-collar HR. Solves face-based attendance for exactly the workforce an India HRMS finds hardest to serve: contract labour with no corporate email, no laptop and poor site connectivity. 27 people and $2.5M funded — cheap to acquire, hard to rebuild.
- **pricing**: Fully published and rupee-native, billed annually. India: Time Capture Rs 250/user/year + Rs 69,000/year base; Advanced Rs 350/user/year + Rs 69,000/year base; add-ons Live Tracking Rs 200/user/year, Leave Management Rs 60/user/year. US: $0.58 and $0.75/user/month, or $1 and $1.25/user/month + $40/month base. CORRECTED: the $2.25 and $3.50/user/month tier is the INTERNATIONAL rate, not GCC as the original report stated; GCC mirrors the US structure. Note the shape: at Rs 250/user/year (~Rs 21/month), a 200-worker site pays more in platform fee than per-head — this is fixed-fee-dominant at small scale.
- **ai_capabilities**: 'Truein AI' as an intelligence layer: 'AI Time Guard' (clock-in anomaly and location-fraud detection), 'AI Analytics', and 'AI Manager Assist' explicitly marked 'Coming Soon'. Core face recognition plus geofencing addresses buddy punching.
- **strengths**: The only vendor in this set with a genuinely differentiated data asset: verified face-based presence for contract labour; Claimed 500+ customers, 500,000+ users, 10,000+ locations across 25 countries on a 27-person team (vendor marketing, unverified) — remarkable efficiency if true; Blue-chip site-operations logos claimed: Compass Group, OCS, Air India, Adani, Tata Projects, CBRE, Knight Frank, Lenskart; Fully transparent INR pricing built for Indian reality — annual per-head rates plus a fixed platform fee, not USD per-seat; Works offline at poorly-connected sites, a hard engineering problem most HRMS vendors have not solved; Attendance is upstream of payroll, so whoever owns verified contract-labour attendance controls the payroll input
- **weaknesses**: Tiny: 27 employees, revenue under Rs 10 Cr, $2.5M raised with the last round June 2023 — 3.25 years without new capital; The most interesting AI feature (AI Manager Assist) is still 'Coming Soon' — the AI layer is partly aspirational; Single-point solution: attendance only, no payroll, statutory or core HR; Face recognition carries biometric-data exposure under India's DPDP regime that the marketing does not address; Tracxn benchmarks it against WorkJam, SIMPRO and Parsable — all better funded

### Aparajitha Corporate Services (including Simpliance)
- **segment**: India labour, employment and industrial plus EHS statutory compliance for large enterprises and factories across 25 states
- **positioning**: CLASSIFICATION: PARTNER or ACQUISITION TARGET — emphatically NOT a competitor to build against. Aparajitha owns the ground truth of Indian labour compliance: 1,500+ staff physically filing, auditing and liaising with labour departments in 25 states, now fused with Simpliance's SaaS. This is the entity that owns the Labour Codes narrative in practice rather than in marketing.
- **pricing**: unknown — services and enterprise SaaS, quote-based; no pricing published
- **ai_capabilities**: NONE — verified explicitly as a negative. No reference to AI, machine learning or algorithmic decision-making appears anywhere on the site; the strongest language is 'knowledge-driven, tech-enabled'. The organisation with the deepest statutory data and the strongest compliance brand in India has no AI story at all.
- **strengths**: Physical compliance operations at national scale: 1,500+ employees, 1,700+ clients, 25 Indian states — a moat that cannot be built with software; Owns the software too: Simpliance Classic, REMO, Vendor, Audit, and Remit (payroll/remittance processing); Bought 76% of Simpliance at Rs 120 crore enterprise value and separately acquired Comply India Tech Services assets — a consolidator; Enterprise-grade trust posture: SOC 2 Type 2, ISO/IEC 27001:2022, ISO 9001:2015; Labour Codes Consulting is already a named service line — it monetises regulatory change directly
- **weaknesses**: Zero AI capability and no AI positioning — vulnerable to being reframed as the back end of someone else's intelligent product; Services-heavy revenue mix means low gross margins and headcount-linked scaling; Whether Simpliance exposes a usable API for third-party HRMS integration is unknown and is the decisive question for any partnership; Deal date remains ambiguous (page stamped 11/09/2024; release text implies 2022; Crunchbase says 2022-10-06) — the 2022 reading is the internally consistent one

### TeamLease Services (NSE: TEAMLEASE)
- **segment**: India general and specialised staffing, regulatory compliance, training, job portal, EdTech and SaaS-based compliance
- **positioning**: CLASSIFICATION: NOT A PRODUCT COMPETITOR, but the most valuable evidentiary source in this entire dimension. Its audited FY26 filing is the only primary document here, and it supplies both the Labour Codes cost proof and the clearest cautionary tale about staffing majors building HR software.
- **pricing**: n/a — services and staffing, not a licensable HRMS
- **ai_capabilities**: No AI claims examined; not relevant to its classification
- **strengths**: Rs 11,790.67 Cr FY26 total income from operations, +5.69% — one to two orders of magnitude above every India HR software vendor here; Other HR Services (regulatory compliance, training, job portal, EdTech, SaaS compliance) grew 23.0% to Rs 241.70 Cr — the fastest-growing segment on revenue; HCM business manages over 3.5 lakh monthly employee records — payroll operations at genuine scale; ~3.4 lakh associates and trainees, 4,000+ employers, 109 new enterprise logos in Q4 alone
- **weaknesses**: Impaired its own HR technology subsidiary by Rs 6.4 crore in FY26 on management's assessment of future projections and profitability — a staffing major with distribution, capital and compliance depth still failed to build HR software; The fast-growing compliance/HR-services segment is barely profitable: FY25 segment result was Rs 2.62 Cr on Rs 196.52 Cr revenue, a 1.33% margin, and the FY26 segment-result line appears to have gone backwards (low confidence, degraded OCR of a scanned filing); Absorbed a Rs 5.68 Cr Labour Codes exceptional item, though it notes the cost is contractually recoverable from customers for billable employees — a pass-through option a product company does not have; Overall EBITDA margin of 1.34% — this is a volume services business, not a software P&L

### Quess Corp (NSE: QUESS)
- **segment**: India staffing, IT solutions, recruitment, GCC services, global mobility, digital and gig workforce platforms
- **positioning**: CLASSIFICATION: NOT A PRODUCT COMPETITOR. Larger than TeamLease but growing far slower, and operates 'Digital Platform' and 'Gig Workforce Platform' assets rather than a licensable HRMS.
- **pricing**: n/a
- **ai_capabilities**: not assessed
- **strengths**: FY26 revenue 153.05B INR — the largest workforce-services P&L in this set; Breadth across staffing, IT solutions, GCC and global mobility
- **weaknesses**: Growth decelerated sharply: +2.26% in FY26 against +9.29% in FY25, a drop of roughly three quarters; No evidence it sells payroll, compliance or HR software as standalone licensable products — but note the segment description rests on the Quess IR page, which was NOT re-verified in this pass; only the revenue figures are confirmed

### Skuad (a Payoneer group company)
- **segment**: India-origin EOR, contractor management and multi-country payroll
- **positioning**: CLASSIFICATION: EOR PRICE ANCHOR and an exit-path data point. The India-origin EOR exit ran to a payments company, not an HR company — Skuad now trades entirely under Payoneer Workforce Management branding.
- **pricing**: Published and verified verbatim: EOR 'Starting from $199 per employee/month'; AOR 'Starting from $99 per contractor/month'; Contractor Management System 'Starting from $19 per contractor/month'. These are the only current vendor-primary EOR prices in this research.
- **ai_capabilities**: not assessed
- **strengths**: Payoneer's balance sheet and payments rails behind it; payroll processed in 70+ currencies; Clear published EOR price card, rare in this category
- **weaknesses**: Strategic direction now set by a payments parent, as the footer confirms ('Skuad Pte Limited (a Payoneer group company)', alongside Skuad Netherlands B.V. and The Currency Cloud Limited); At $199 it is roughly 2x the India specialist price point

### Wisemonk
- **segment**: India-specialist EOR and contractor payments for foreign companies hiring in India
- **positioning**: CLASSIFICATION: PROOF-POINT, but on thin evidence. Presented as proof that India EOR/payroll compliance can be productised profitably without venture capital. IMPORTANT: every fact here comes from a single affiliate-style review site; no Wisemonk vendor-primary page was ever read.
- **pricing**: EOR from '$99 per employee per month' scaling to $399; contractor payments '$19 per contractor per month'; flat fee with no percentage-of-salary component; PF (12%) and ESI stated as included. All from the review site, not the vendor. The same review's claim that global EOR platforms charge $499-$699 for India is contradicted by Skuad's published $199 and should NOT be reused.
- **ai_capabilities**: unknown — no AI claims captured from any source
- **strengths**: Reportedly self-funded and bootstrapped with 300+ customers across 30+ countries on 11-50 staff; India specialisation with 2-day onboarding claimed versus 5-7 days for global alternatives; At $99 it undercuts Skuad's $199 by half, if the figure holds
- **weaknesses**: Single-source risk: one review site, June 2026, with affiliate characteristics — nothing vendor-primary or filed; Its own pricing page timed out in the prior sweep and was not obtained; 11-50 employees means minimal capacity to serve enterprise volume; Confidence downgraded from medium to low in this pass — do not build a pricing floor on this

### Multiplier
- **segment**: Global EOR and multi-country payroll; Singapore-headquartered with substantial India operations
- **positioning**: CLASSIFICATION: EOR COMPETITOR, but effectively a 2022 snapshot. Nothing current could be verified — usemultiplier.com returned HTTP 403 on every path including its own funding press page.
- **pricing**: CORRECTED AND STALE. The 2022 TechCrunch figures are $300 per employee per month for EOR, $40 per freelancer, $20 per employee on an existing local entity. The original report's '$400' EOR figure does not appear in its own cited source and has been retracted — it appears to be contamination from the $400M valuation. CURRENT 2026 PRICING IS UNKNOWN.
- **ai_capabilities**: unknown
- **strengths**: $60M Series B at a $400M valuation co-led by Tiger Global and Sequoia Capital India, total funding $77.2M as of March 2022; Operating in more than 150 countries with clients including Amazon and ServiceNow (2022 claims)
- **weaknesses**: No round found since March 2022 — four and a half years of silence; Site returns 403 on every path, so nothing is verified against vendor primary; Every figure attributed to it is four years old and must not be presented as current

### Randstad India
- **segment**: Staffing, recruitment, payroll services, managed services, executive search
- **positioning**: CLASSIFICATION: SERVICES BUYER, NOT A SOFTWARE COMPETITOR. Carried over from the original report and NOT re-verified in this pass — treat as unconfirmed.
- **pricing**: unknown; India-specific revenue is not publicly disclosed
- **ai_capabilities**: No AI claims reported on the site; not re-verified
- **strengths**: National staffing footprint across Bengaluru, Chennai, Hyderabad, Kolkata, Mumbai and New Delhi; Global parent brand and enterprise relationships
- **weaknesses**: No proprietary HR platform reported; the only named technology is 'My Randstad', a candidate portal; A potential channel or acquirer rather than a product rival; NOT RE-VERIFIED in this fact-check — the lowest-evidence entry in the set
