# [r3] gtm-channel-mechanics

## Verification notes

SCOPE OF THIS PASS: I independently re-fetched every load-bearing numeric and feature claim in the report. Method was direct curl with browser headers plus rendered fetches, and the Indeed-backed job tool for the two job postings. 41 of 47 original findings survived unchanged or strengthened. Four were materially corrected, two were retracted or downgraded to n=1, and one was upgraded from medium to high.

WHAT I CORRECTED (material errors in the original):

1. factoHR partner categories — WRONG AND UNDERSTATED. The report asserted the "Who Can be a Partner?" list is "exactly those three categories". It is six: HR & Payroll/Labour Law Consultant, Tally/CRM/ERP Reseller, CA/Tax Consultant, IT Hardware/Biometric Reseller, IT Consultant, IT Solution Vendor. The report dropped "CA/Tax Consultant" — the single most relevant entry to its own CA-channel thesis — and two IT categories. Corrected.

2. Zoho Payroll India plan names — WRONG. The report called the tiers "Standard / Premium / Elite". The live page reads STANDARD / PROFESSIONAL / PREMIUM. The report also presented the prices as flat "per org/month" and omitted the included-employee blocks: Standard includes 25 employees, Professional and Premium include 50. The 20% annual-prepay discount and the overage figures (Rs 50/40, Rs 75/60, Rs 100/80) are confirmed exactly. Corrected; the 20% conclusion survives.

3. The full-cycle-rep claim — RETRACTED AS A GENERALIZATION. The posting content is verbatim accurate (I pulled the full JD: "Pay: Rs 25,000.00 - Rs 50,000.00 per month", 2-5 years, the six KPIs, the buyer list, "Develop channel partners, consultants, and referral networks"). But it is n=1 from Global Infocloud Pvt. Ltd. — a small IT-services firm selling GIC Folks as a side product, listed on Indeed under recruiter "Earthen Connect India Pvt Ltd", not "GIC Folks" as the report's company attribution implied. More damaging: it is contradicted for the market leader. A search of Keka's live India openings returns a SPLIT motion — "Business Development Executive - SMB Market (India Market)" (Hyderabad), "Business Development Executive - Mid Market" (Delhi) and "Account Executive - Enterprise (India Market)" (Delhi) as separate roles. So "the on-the-ground motion is a FULL-CYCLE inside sales rep, not a split SDR/AE model" is false as a market statement. The rep-cost figure is one small vendor's band, not a market anchor, and the open question that said "rep cost is now anchored" has been corrected.

4. Demo-to-conversion KPI — downgraded from high to medium. Verbatim accurate but from the same single small-vendor JD. It is one company's KPI sheet, not an established market convention.

WHAT I UPGRADED:

- G2 Digital Markets. The report held this at medium. It is high. digitalmarkets.gartner.com now 301s to app.g2digitalmarkets.com/login, and the acquisition of Capterra, Software Advice and GetApp from Gartner was announced by press release and closed 5 February 2026. New material detail the report missed: G2 stated the combination enables "a new pay-per-lead offering" — directly relevant to the marketplace-channel requirement.
- greytHR pricing (Rs 2,495 / Rs 4,495, 50 included, Rs 45 / Rs 85 overage, 7-day trial, ~30% savings label) — independently re-verified on a second fetch. Medium to high.
- Tally 1,257 partners — the same count returned on an independent fetch, so it is stable rather than a one-off render. Still a displayed directory count, not an audited network size.

WHAT I ADDED AS A CORRECTION, NOT PADDING:

- Zoho's affiliate program carries a $25,000 maximum commission per transaction. The report quoted the tier table in detail but omitted this cap. It changes the commission-engine requirement, so I folded it into that finding and requirement.
- Kredily's Payroll OS salary payout is specifically "ICICI Bank & NEFT", not bank-neutral. This strengthens rather than weakens the bank-agnostic-payout requirement.

KEKA'S INR PRICES — GENUINE ATTEMPT, PARTIAL RESULT. I re-fetched keka.com/pricing successfully (HTTP 200, 318KB) and did NOT get the UAE variant the report hit; the title was "Pricing | Keka HR". Plan names FOUNDATION / STRENGTH / GROWTH confirmed. The setup-fee FAQ is confirmed verbatim, character for character. No Rs 6,999 or Rs 9,999 price exists anywhere in the served HTML, so the prior round's renewal-vs-list finding remains unverified and must not be built on. New evidence: the page contains three HTML-COMMENTED-OUT price spans — "₹90 per additional employee" (Foundation), "₹120" (Strength), "₹150" (Growth) — inside `<!-- -->` next to the signup links. These are disabled legacy markup, NOT current published prices, and I am deliberately not reporting them as prices. They do independently corroborate that Keka's architecture is base-plus-per-additional-employee, matching greytHR.

GREYTHR CA PROGRAM — GENUINE ATTEMPT, STILL UNKNOWN, ONE NEW LEAD. /chartered-accountants/ and /partners/ca-partner/ both 404. But a search surfaced partners.greythr.com/s/become-a-partner-today — a Salesforce Experience Cloud partner portal the original sweep never found. It renders only a "CSS Error" shell to fetchers, so its partner-type taxonomy is login-gated. A formal partner portal exists; whether it contains a CA track is still unknown. The PSP page is confirmed exactly, including the hubspot_form_code "PSP_PAGE_SCHEDULE_DEMO_FORM" in its page-data JSON.

FORM NUMBERS AND FILE FORMATS — CHECKED SPECIFICALLY, ALL CLEAN. Every statutory artefact named is real and correctly named: PF ECR (EPFO Electronic Challan cum Return), Form 24Q (quarterly TDS return for salaries), Form 16 (TDS certificate), Form 12BB (employee investment declaration to employer). No invented API names and no invented file formats appear anywhere in the report. One pedantic note: Form 12BB flows employee-to-employer rather than being a filing output, but Kredily's own page does say it "generates" it, so the report's usage tracks the vendor's.

SOURCING WEAKNESS THE PRD AUTHOR MUST KNOW: both job-posting URLs in the original are to.indeed.com short links that resolve to indeed.com/uie/clk tracking URLs carrying "from=mcp-claude-jobsearch" and return HTTP 403 to anyone else. They are session-scoped and not citable. I re-verified both postings' content through the job tool, so the quotes are sound, but nobody can independently open those URLs.

DID THE DIMENSION ANSWER ITS QUESTION? Mostly yes, with one honest gap it declares rather than hides. Channel STRUCTURE is genuinely well evidenced from vendor-primary sources: who the partner archetypes are, what tracks exist, what the two vendors that publish commissions actually pay, what marketplace packages cost, and where the freemium paywall sits. Channel ECONOMICS is almost entirely absent — no CAC, no cycle length, no win rate, no free-to-paid conversion, no marketplace CPL. The report does not pad around this; it puts the gaps in open_questions instead of inventing low-confidence estimates, which is the right call. The one place it overreached is the sales-motion section, where it generalized a market-wide claim from a single small-vendor job ad — that is now retracted.

TRUST GUIDANCE: treat the vendor-primary pricing and partner-program findings as solid and directly usable — they were re-fetched and quoted verbatim. Treat everything sourced from job postings as anecdote, not market fact. Treat the Keka renewal-pricing claim as unverified and do not build a pricing argument on it. Treat all vendor scale claims (Techjockey, HROne, Darwinbox) as marketing.

## Key findings (46)

### 1. [high] SoftwareSuggest publishes an actual vendor rate card in INR — the only Indian software marketplace found doing so. Basic Rs 3,00,000 / 6 months; Gold Rs 6,50,000 / 6 months; Platinum Rs 10,00,000 / 12 months.

RE-VERIFIED this pass. Live INR pricing table. PPC Credit Rs 75,000 (Basic), Rs 1,50,000 (Gold), Rs 2,50,000 (Platinum); Lead Credit Rs 1,50,000 (Gold), Rs 2,50,000 (Platinum), none in Basic. Footnote 'CPC & CPL will be defined at the time of sign-up.'

Source: https://www.softwaresuggest.com/pricing

### 2. [high] The marketplace channel is a prepaid-package model, not pay-per-lead. The vendor buys a 6- or 12-month engagement; PPC and lead credits draw down inside it, and per-click and per-lead rates are negotiated at signup, never published.

RE-VERIFIED. Rate card structures spend as rupee 'PPC Credit' and 'Lead Credit' allowances inside a fixed term, with the explicit signup footnote. The separate Price Estimator lists six services — Pay Per Click, Sponsorships, Premium Listing, Branded Content Solutions, Marketing Qualified Leads, Product/Service Review — and shows no rate for any of them, requiring category selection and 'Get Quote!'.

Source: https://www.softwaresuggest.com/price-estimator

### 3. [high] Paid marketplace tiers include influence over ranking artefacts: 'Consultation on Leader Matrix' is Platinum-only; 'Mention in Published Research Report' is Gold/Platinum-only.

RE-VERIFIED. Feature comparison table shows Consultation on Leader Matrix unavailable for Basic and Gold, available for Platinum. Footnote '# Available on already published reports.'

Source: https://www.softwaresuggest.com/pricing

### 4. [high] Techjockey operates free-listing-plus-paid-inventory AND a transactional e-commerce layer — buyers purchase software through Techjockey's own checkout. It is part lead-gen marketplace, part reseller, unlike Capterra.

RE-VERIFIED. Seller hub shows repeated 'List for Free' CTAs and states: 'Interested buyers can get your software directly through our platform with secure checkout & payment options.'

Source: https://esellerhub.techjockey.com/

### 5. [high] Techjockey publishes no vendor rate card anywhere on its public site; vendor-facing pages are absent from its sitemap and all pricing routes to a sales conversation.

RE-VERIFIED this pass. techjockey.com/sitemap.xml is an index of 13 sub-sitemaps — categories, products, comparison, alternatives, reviews, questions, blog, subcategories, brands, video, category-questions, product-questions, industries — plus the homepage. A case-insensitive grep for vendor|seller|partner across the sitemap returns ZERO matches. The eSellerHub page publishes no pricing.

Source: https://www.techjockey.com/sitemap.xml

### 6. [low] Techjockey's self-reported scale (treat as marketing, not fact): 5 lakh+ buyers per month, 15,000+ software listed, 350+ categories, 20 lakh+ customers, 40% CXOs & VPs among visitors.

Claims stated on the eSellerHub vendor landing page and re-confirmed this pass. No third-party verification found. The '40% CXOs & VPs' figure is an additional self-reported claim.

Source: https://esellerhub.techjockey.com/

### 7. [high] Capterra, GetApp and Software Advice are no longer Gartner properties — G2 acquired all three from Gartner and the deal closed 5 February 2026. The review-marketplace channel is now ONE counterparty, not several. G2 has stated it will launch a pay-per-lead offering off the combined dataset.

UPGRADED from medium to high this pass on two independent legs. (1) digitalmarkets.gartner.com now 301-redirects to https://app.g2digitalmarkets.com/login (HTTP 200). (2) The acquisition was announced by PRNewswire release 'G2 to Acquire Capterra, Software Advice, and GetApp from Gartner' and closed 5 Feb 2026; coverage cites ~6M reviews, 200M+ annual buyers, 10,000+ vendors, ~2,000 categories, and an intent to enable 'a new pay-per-lead offering'.

Source: https://www.prnewswire.com/news-releases/g2-to-acquire-capterra-software-advice-and-getapp-from-gartner-302673901.html

### 8. [high] Capterra/GetApp/G2 publish no vendor pricing publicly and block automated access. No CPC, CPL, minimum budget or listing fee is disclosed.

RE-VERIFIED. capterra.com/vendors/ returns HTTP 403 to direct fetch. A rendered fetch of the vendor page yields only an unquantified 'flexible lead generation program' with no pricing of any kind.

Source: https://www.capterra.com/vendors/

### 9. [high] Zoho's affiliate program is the only fully quantified channel program found in this market: 15% commission on every qualified sale for the first 12 months, 90-day cookie, $100 wallet credit to the referred customer.

RE-VERIFIED verbatim. Program Overview block: '15% — Commission on every qualified sale for the first 12 months'; '90 Days cookie life'; '$100 — Your referrals get wallet credits to try Zoho'.

Source: https://www.zoho.com/affiliate/

### 10. [high] Zoho's affiliate tiering is volume-graduated on two alternative axes with a one-time deal-size kicker AND a per-transaction cap the prior report missed: Standard 15%, Super 18%, Elite 20%; thresholds revenue up to $5,000 OR up to 20 new paid customers (T1), $5,001-$15,000 OR 21-50 (T2), $15,001+ OR 51+ (T3); plus an additional 5% one-time bonus at invoice values of $5,000 / $10,000 / $15,000 by tier; commission is capped at a maximum of $25,000 per single transaction.

RE-VERIFIED. Zoho Affiliate Tiers table confirms all percentages, revenue bands, customer counts and deal-size thresholds as previously reported. CORRECTION ADDED THIS PASS: the page also states a maximum single-deal commission limit of $25,000, which the original report omitted and which changes the commission-engine requirement.

Source: https://www.zoho.com/affiliate/

### 11. [high] Zoho's affiliate program specifies operational service levels and non-cash incentives a competing program must match: support SLA 48h / 36h / 24h by tier with live chat to key account managers at T2/T3, a 60-day stickiness period at all tiers, a 6-month tier re-evaluation window, and a complimentary 180-day Zoho One licence at T2/T3.

RE-VERIFIED. Tier table confirms '48 hrs SLA' / '36 hrs SLA, Live chat with KAMs' / '24 hrs SLA, Live chat with KAMs'; 'Stickiness period 60 days' across all three; 'Complimentary Zoho One licence (180 days)' for Super and Elite; evaluation window every 6 months.

Source: https://www.zoho.com/affiliate/

### 12. [high] Zoho enforces channel-conflict exclusivity: an active Consulting Partner cannot be an Affiliate and vice versa, though Consulting Partners may simultaneously join the Marketplace program and the programs of Zoho subsidiaries.

RE-VERIFIED verbatim: 'An active Zoho Consulting Partner cannot sign up as a Zoho Affiliate. Likewise, an active Zoho Affiliate cannot become a Zoho Consulting Partner.'

Source: https://www.zoho.com/partners/consulting-partnership.html

### 13. [high] Zoho publishes no margin or commission figures for its Consulting Partner or Value-Added Reseller tracks — only qualitative 'high profit margins'. The quantified 15-20% is the affiliate track only.

RE-VERIFIED on both pages this pass. Reseller page carries only: 'Competitive product pricing, high profit margins, and a steady stream of recurring revenue.' No percentages on either page.

Source: https://www.zoho.com/partners/resellers.html

### 14. [high] Zoho's Consulting Partner eligibility bar is a usable template for partner qualification: valid business registration and a representative website, demonstrated experience selling and implementing similar SaaS, a dedicated in-house sales AND technical team for the vendor's product, and an established regional customer base with proven demand-generation ability. Evaluated by a partner recruitment manager, then Partner Agreement, then onboarding with joint objectives. Free to join.

RE-VERIFIED. All four eligibility criteria and the 5-step process confirmed. FAQ: 'No, the Partner Program at Zoho is free to join.'

Source: https://www.zoho.com/partners/consulting-partnership.html

### 15. [high] Zimyo publishes commission percentages — the only Indian HRMS vendor found doing so. Two tiers: Catalyst up to 20% and Momentum up to 30%, graduated by successful referrals per month (1-3 vs 3+), recurring, free to join.

RE-VERIFIED. Plan comparison table confirms Catalyst 'upto 20%' and Momentum 'upto 30%' against 'Number of Successful Referrals (per month)' of 1-3 and 3+. FAQ: 'There are no costs involved in becoming a partner... without any upfront investment.'

Source: https://www.zimyo.com/partners/partner-with-us/

### 16. [high] Zimyo explicitly recruits the accountant-adjacent channel by name: freelancers, HR professionals, payroll specialists, tax consultants and financial advisors.

RE-VERIFIED. 'Who can be a partner' names exactly those five categories, including 'Tax Consultants' and 'Financial Advisors'.

Source: https://www.zimyo.com/partners/partner-with-us/

### 17. [high] Keka pays resellers on the first 12 months of the client's billing AND on renewal, but publishes no percentage; it also runs Referral, Integration and Solution tracks.

RE-VERIFIED verbatim from raw HTML this pass: 'When the closures start rolling in, you get paid for first 12 months of your client's billing & on the renewal too*' — asterisk unexplained. No commission rate appears anywhere on the page.

Source: https://www.keka.com/partners/reseller-partners

### 18. [high] Keka's reseller enablement includes co-selling the first deals: after approval the partner receives a sales training schedule and Keka's team assists with the first five sales.

RE-VERIFIED verbatim from raw HTML: 'Once approved, you will receive a sales training schedule and our team will assist you in making the first 5 sales.'

Source: https://www.keka.com/partners/reseller-partners

### 19. [medium] Keka's partner signup form segments the market by customer size (5-50, 51-100, 101-500, 501-1500, 1501-3000, above 3000) and offers partnership types HR services/Consulting, Integration, Reseller, Referral, Implementation, Solution.

NOT RE-VERIFIED this pass — the form is a separate gated page I did not re-open. Carried from the original sweep at reduced confidence. The four public partner tracks and the reseller payment terms ARE independently confirmed; these form-field buckets are not.

Source: https://www.keka.com/partner-program

### 20. [high] greytHR runs exactly two public partner tracks — Reseller and Alliance — and its named reseller network is a long tail of small regional Indian IT and consulting firms, the same profile as a Tally channel.

RE-VERIFIED structurally. Both pages resolve; /partners/ returns 200. The underlying Gatsby page-data JSON carries partnerTypeCode RESELLER_PARTNER and ALLIANCE_PARTNER entries scoped to country /india/ (26 ALLIANCE_PARTNER occurrences in the alliance payload). The ~28 named reseller firms were enumerated in the prior sweep and the data structure is confirmed intact.

Source: https://www.greythr.com/partners/reseller-partner/

### 21. [high] greytHR's Alliance Partner track is overwhelmingly BANKS and payment networks — a distribution channel no other vendor in this set displays. Named: ICICI Bank, HSBC, IDFC First Bank, AU Small Finance Bank, Bank of Baroda, Kotak Mahindra Bank, Visa, Mastercard, plus AWS, Google, Zoho, Jio and Godrej Nirmaan.

RE-VERIFIED this pass by re-fetching https://www.greythr.com/page-data/partners/alliance-partner/page-data.json (HTTP 200). Every one of the 14 named entities is present in the payload, the 'financialPartners' collection key is present, and ALLIANCE_PARTNER appears 26 times. This is the single strongest-sourced finding in the report.

Source: https://www.greythr.com/partners/alliance-partner/

### 22. [high] greytHR publishes no commission, margin or tier figures for either partner track — only qualitative benefit language.

RE-VERIFIED. The page-data payloads carry partner names, type codes and country only; a grep for 'commission' across the alliance payload returns nothing. No numeric terms appear on the public pages.

Source: https://www.greythr.com/partners/

### 23. [medium] greytHR productises the outsourced-payroll channel with a Payroll Service Providers landing page, but no CA-specific program page exists at any constructible public URL. A login-gated Salesforce partner portal does exist at partners.greythr.com — a lead the prior sweep missed.

RE-VERIFIED AND ADVANCED. The PSP page-data JSON confirms name 'PSP', slug 'payroll-service-providers', configuration hubspot_form_code 'PSP_PAGE_SCHEDULE_DEMO_FORM', and SEO title 'Cloud-based HRMS for Payroll Service Providers - greytHR' — a demo-capture page, not a program page. /chartered-accountants/ and /partners/ca-partner/ both return 404. NEW: partners.greythr.com/s/become-a-partner-today exists but is a Salesforce Experience Cloud portal that renders only a 'CSS Error' shell to fetchers, so its partner-type taxonomy is behind login. The CA question is still open.

Source: https://www.greythr.com/payroll-service-providers/

### 24. [high] HROne runs two named tracks — Alliance Partner (marketplace listing and visibility) and Business Partner (revenue) — pitched as requiring no investment, with 'Incentives to ensure recurring revenue'. No percentages published.

RE-VERIFIED. Both track names confirmed. 'Do it all without any investment or product enhancements'; Alliance pitch cites '1500+ corporates' and '200+ touch points' (self-reported). No commission rates disclosed; terms are provided at enrolment.

Source: https://hrone.cloud/partners/

### 25. [high] CORRECTED — factoHR's 'Who Can be a Partner?' list has SIX categories, not three: (1) HR & Payroll/Labour Law Consultant, (2) Tally/CRM/ERP Reseller, (3) CA/Tax Consultant, (4) IT Hardware/Biometric Reseller, (5) IT Consultant, (6) IT Solution Vendor. Enquiry-form partnership types: Referral, Integration, Sales, Other. No percentages published.

RE-VERIFIED AND CORRECTED this pass. The prior report claimed 'exactly those three categories' and omitted CA/Tax Consultant, IT Consultant and IT Solution Vendor. The omission of 'CA/Tax Consultant' materially understated the evidence for the accountant channel — factoHR names it explicitly alongside Zimyo.

Source: https://factohr.com/partner-with-us/

### 26. [high] Darwinbox's partner content is technology/marketplace-oriented, not a reseller program. It publishes reach claims but no partner types, commissions, tiers or requirements.

RE-VERIFIED. explore.darwinbox.com/darwinbox-partner-with-us states 'Generate demand for your solutions by unlocking the opportunity to reach over 1 million employees across 500+ clients and 55+ countries', emphasises co-marketing and API integrations, and defines no partner categories, tiers, commissions or eligibility requirements. Reach figures are self-reported.

Source: https://explore.darwinbox.com/darwinbox-partner-with-us

### 27. [high] Kredily runs TWO explicitly separate accountant-side programs and documents the distinction: a Partner Program for payroll service providers (with white-label), and a CA Program for chartered accountants managing compliance for their client book. Both sit on the same multi-company platform.

RE-VERIFIED verbatim: 'The CA Program is tailored to chartered accountants managing compliance for their client book; the Partner Program is for payroll service providers running payroll operations at scale with white-label options.' The PSP page confirms 'white-label and co-branding options so clients experience the service under your brand.' Separate pages exist at /partners/ and /ca/.

Source: https://kredily.com/partners/

### 28. [high] The CA-channel product surface is concrete: a multi-company dashboard with one login across the client book, per-client role separation, cross-client compliance flags, PF/ESI/state-wise PT/TDS tracked across all clients, Form 16 and Form 24Q generated in required formats, co-branding to the practice, a role-gated AI Copilot and a full audit trail.

RE-VERIFIED. The /ca/ page exists with headings 'For Chartered Accountants', 'Run payroll for every client, from one dashboard', 'Everything your practice needs, in one console'. Confirmed features: 'Multi-company dashboard' ('Switch between every client from one login'), 'Compliance command-center' ('PF, ESI, Professional Tax and TDS tracked across all clients, with Form 16 & 24Q generated'), an 'AI Copilot' that 'answers payroll and compliance questions within your role's access', and delivery 'under your practice's brand'. All form numbers named are real and correctly named.

Source: https://kredily.com/ca/

### 29. [high] Kredily's CA-channel economics are land-free-then-upgrade, not commission-led: clients onboard on the Free Forever plan at zero cost, and monetisation occurs when a client needs bank payouts, challans or Form 16. Commission terms are not published.

RE-VERIFIED. CA page offers the free model as 'Payroll, HR, attendance & leave for unlimited employees, no per-seat minimum', with paid features gated above it. The page contains no commission structure, revenue share or partner compensation terms; program terms are deferred to the partnerships team.

Source: https://kredily.com/ca/

### 30. [high] Tally's channel is structured in four grades and is by far the deepest SMB distribution network available: 3-Star and 5-Star Certified Partners, Associate Partners (licence delivery and TSS renewal only), and GVLA Partners for government and very large accounts. Tally also runs a distinct CA Community.

RE-VERIFIED. 3-Star described as addressing 'basic activities in the accounting, inventory, banking & compliance domain'; 5-Star as 'veterans in the Tally business' handling complex requirements; Associate Partners as geographically distributed and focused on licence delivery and renewals; GVLA as government and very large accounts. A 'CA Community' link to community.tallysolutions.com is present.

Source: https://tallysolutions.com/partners/

### 31. [high] Tally's public partner locator displayed 1,257 partners, with per-partner 'Partner Since' year, star grade, review count and named contact with phone and email.

RE-VERIFIED on an independent fetch this pass — 'Results 1-9 of 1257' returned again, so the count is stable rather than a one-off render. Per-partner records confirmed to carry name, rating, Partner Since year, review count, contact person, email, phone, address and 3-Star/5-Star badge. CAVEAT RETAINED: this is a displayed result count from the default unfiltered India query, not an audited network size.

Source: https://tallysolutions.com/partner-with-us/

### 32. [high] Tally publishes no partner margins, commission rates or programme joining terms on its public site.

RE-VERIFIED. The partner pages describe grades and provide a locator and enquiry route only. No commission rates or profit margins are disclosed anywhere.

Source: https://tallysolutions.com/partners/

### 33. [high] Zoho Payroll India's free tier caps at 10 employees — structurally below the 20-200 target band — but is otherwise substantially complete, including online salary payments through HSBC, Income Tax/EPF/ESI/state-wise PT/LWF compliance, automatic TDS worksheet, salary revision and arrears, LOP and LOP reversal, employee self-service and 40+ reports.

RE-VERIFIED verbatim this pass, including the specific HSBC claim the original report made. The FREE plan bullet list reads: automatic payroll calculation; automatic payslip generation; 'Online salary payments through HSBC'; 'Compliance - Income Tax, EPF, ESI, Statewise PT, LWF'; automatic TDS worksheet; pre-defined salary components; payslip templates; salary revision and arrears; LOP and LOP reversal; employee self-service portal; reimbursement proof approval; proof of investments approval; 40+ built-in payroll reports; integrations with Zoho Books, People and Expense. Cap confirmed at 'upto 10 employees'.

Source: https://www.zoho.com/in/payroll/pricing/

### 34. [high] CORRECTED — the annual-versus-monthly incentive norm is a clean 20%, but the plan names and structure differ from the prior report. Zoho Payroll India tiers are STANDARD, PROFESSIONAL and PREMIUM (not 'Standard/Premium/Elite'). Standard Rs 1,250/month vs Rs 1,000 annual, including 25 employees; Professional Rs 3,750 vs Rs 3,000, including 50; Premium Rs 5,000 vs Rs 4,000, including 50. The same 20% applies to overage: Rs 50 vs 40, Rs 75 vs 60, Rs 100 vs 80 per additional employee. All prices exclusive of GST.

RE-VERIFIED AND CORRECTED. The prior report named the third and fourth tiers 'Premium' and 'Elite'; the live page reads PROFESSIONAL and PREMIUM. It also presented the prices as flat per-org fees and omitted the included-employee blocks, which changes what the price buys. The 20% discount on both base and overage across all three paid tiers is confirmed exactly, as is the footnote 'Price exclusive of GST'.

Source: https://www.zoho.com/in/payroll/pricing/

### 35. [high] Kredily's freemium structure is the aggressive end of the market: Free Forever at Rs 0/month for UNLIMITED employees with no card and no per-seat minimum; Payroll OS Rs 1,249/month covering up to 25 employees then Rs 50/employee; Professional Rs 1,749/month up to 25 then Rs 70/employee; Enterprise custom.

RE-VERIFIED. All four plan names and both price points confirmed on the live pricing page, along with 'Payroll, HR, attendance & leave free for unlimited employees — no credit card, no per-seat minimum'. NOTE ADDED THIS PASS: Payroll OS salary payouts are specified as 'Salary payouts — ICICI Bank & NEFT', i.e. bank-specific rather than bank-neutral.

Source: https://kredily.com/pricing/

### 36. [high] Both freemium players gate at the same place: the statutory OUTPUTS, not the computation. Kredily computes PF/ESI/PT/TDS on the free plan but withholds bank payout files, PF/ESI challans, Form 12BB and Form 16 until Payroll OS. This is the natural monetisation boundary for an Indian payroll product.

RE-VERIFIED. Free Forever inclusions confirmed as employee records, web clock-in attendance, statutory calculations (PF/ESI/PT/TDS), mobile app and one leave/attendance rule. Confirmed exclusions from free: bank salary payouts, compliance forms (12BB, Form 16), analytics, selfie/GPS attendance. NOTE: the framing that this is 'the natural monetisation boundary' is an inference, not a Kredily statement — the gating itself is fact.

Source: https://kredily.com/pricing/

### 37. [medium] Self-serve purchase is NOT the norm even among freemium vendors at this price point. greytHR, Keka and Kredily pricing pages route only to free trial / free plan / 'Talk to Sales' / 'Book a Demo'. Zoho Payroll is the exception and publishes payment methods.

RE-VERIFIED for Zoho verbatim: 'We accept payments via Visa, MasterCard, and American Express. We also accept PayPal and wire transfer for the yearly plan.' The CTA census on the other three vendors is carried from the prior sweep and was not re-enumerated button-by-button this pass, hence medium.

Source: https://www.zoho.com/in/payroll/pricing/

### 38. [high] Setup / implementation fees are a real and admitted norm in this market, but the amount is never published. Keka states plainly that a setup fee applies and describes exactly what it buys.

RE-VERIFIED VERBATIM from raw HTML this pass: 'Is there a setup or implementation fee? Yes, a nominal setup fee applies to cover Keka's comprehensive onboarding process. This includes guided configuration of payroll, importing employee data, validating past salary records, and customizing features to suit your needs.' No amount is given anywhere on the page.

Source: https://www.keka.com/pricing

### 39. [high] Keka's published INR prices remain unobtainable and the prior round's renewal-rate finding (Rs 6,999 vs Rs 9,999 list for Foundation) is STILL unverified after a second independent attempt. Plan names FOUNDATION / STRENGTH / GROWTH are confirmed; no current INR price is served in the HTML.

SECOND ATTEMPT THIS PASS, different result from the prior sweep. My fetch reached the India page (HTTP 200, 318KB, title 'Pricing | Keka HR' — NOT the UAE variant the prior sweep hit), so geo-routing was not the obstacle. No '6999' string exists in the source; the only '9999' strings are CSS values. The page does contain three HTML-COMMENTED-OUT price spans — '₹90 per additional employee' (Foundation), '₹120' (Strength), '₹150' (Growth) — inside <!-- --> next to the signup links. These are DISABLED LEGACY MARKUP and must not be cited as current prices, but they do independently corroborate that Keka's architecture is base-plus-per-additional-employee, matching greytHR.

Source: https://www.keka.com/pricing

### 40. [high] greytHR's published architecture is base-fee-plus-overage with a large included block, and it markets an explicit ~30% bundle discount at the top tier: Essential Rs 2,495/month including 50 employees then Rs 45/employee; Growth Rs 4,495/month including 50 employees then Rs 85/employee; Premium custom, marketed '~30% savings Vs Growth plan'. 7-day free trial, no permanent free plan. Add-ons Rs 20/user/month to Rs 2,500/recruiter/month.

UPGRADED from medium to high — independently re-fetched this pass and every figure reproduced: both base prices, the 50-employee inclusion on both plans, both overage rates, '7-day free trial — no commitments, no upfront cost', the '~30% savings Vs Growth plan' label on Premium, and the add-on band from Alumni Portal at Rs 20/user/month to Recruit at Rs 2,500/recruiter/month.

Source: https://www.greythr.com/pricing/

### 41. [high] Zoho funds end-customer acquisition through the channel: the referred customer receives a $100 wallet credit at every affiliate tier. This is a channel-funded trial subsidy, distinct from the partner's own commission.

RE-VERIFIED. '$100 — Your referrals get wallet credits to try Zoho' in the program overview, with end-customer credits of $100 appearing across all three tiers in the comparison table.

Source: https://www.zoho.com/affiliate/

### 42. [high] Keka runs a two-stage SDR-to-AE outbound motion and is exporting it: an open Senior Manager - Sales Development (US) role based in Bengaluru owns a US BDR team, outbound pipeline targets, and multi-channel cold call / email / LinkedIn prospecting, partnering with AEs, Marketing and RevOps.

RE-VERIFIED verbatim this pass by pulling the full job description (Keka HR Payroll Software, Bengaluru, posted 27 Aug 2026). Confirmed lines: 'Own team targets for qualified meetings, opportunities, and pipeline contribution'; 'Drive multi-channel prospecting through cold calling, email, and LinkedIn'; 'Track funnel metrics and continuously improve connect, meeting, and conversion rates'; 'Partner with Account Executives on ICP, target accounts, qualification, and opportunity handoffs'; 8-12 years required; tools Salesforce/HubSpot, Outreach, Salesloft, Apollo, LinkedIn Sales Navigator. The prior report's additional claim of a Dubai BDR role was NOT verified and is dropped. SOURCING CAVEAT: the URL is a session-scoped tracking redirect that returns HTTP 403 to third parties and is not independently citable.

Source: https://to.indeed.com/aajgrdkzwnzh

### 43. [medium] Keka runs a SPLIT sales motion in the Indian market too, not a full-cycle one — it advertises Business Development Executive roles for SMB Market (India) and Mid Market separately from Account Executive - Enterprise (India Market). This contradicts the prior report's claim that Indian SMB HRMS is sold by full-cycle reps.

NEW THIS PASS, and the basis for retracting the prior full-cycle claim. A search of Keka's current openings returns 'Business Development Executive - SMB Market (India Market)' (Hyderabad, 10 Aug 2026), 'Business Development Executive - Mid Market' (Delhi, 27 Jul 2026) and 'Accounts Executive - Enterprise (India Market)' (Delhi, 11 Jun 2026) as distinct roles. The market leader separates prospecting from closing in the India SMB segment.

Source: https://to.indeed.com/aag49qrqvdgq

### 44. [medium] SINGLE DATA POINT, NOT A MARKET NORM — one small Indian HRMS vendor advertises a full-cycle inside sales role at Rs 25,000-50,000/month fixed plus incentives, 2-5 years' experience, whose remit spans prospecting, demos, closing, onboarding handoff AND 'Develop channel partners, consultants, and referral networks'. Its named KPIs include 'Product Demo-to-Conversion Ratio'.

RE-VERIFIED verbatim by pulling the full JD. Employer is Global Infocloud Pvt. Ltd. (product 'GIC Folks'), listed on Indeed under recruiter 'Earthen Connect India Pvt Ltd', Pune/Remote, posted 20 Jun 2026. Confirmed: 'Pay: ₹25,000.00 - ₹50,000.00 per month'; the six KPIs exactly as reported; 'Manage the complete sales cycle from lead generation to deal closure'; 'Develop channel partners, consultants, and referral networks'. DOWNGRADED because this is n=1 from a small IT-services firm selling an HRMS side-product, the prior report mis-attributed the employer, and Keka's split-role hiring contradicts the generalization drawn from it. Use as colour, not as a cost or motion benchmark.

Source: https://to.indeed.com/aasw96dvxk9m

### 45. [high] The buyer committee in Indian SMB HRMS spans HR, finance and the founder — finance is a first-class buyer, not a rubber stamp.

CONFIRMED ON TWO INDEPENDENT SOURCES this pass, which is why it survives at high confidence while the other job-posting claims did not. (1) The Global Infocloud JD: 'conduct product demonstrations with HR Heads, CXOs, Founders, Finance Managers, and Decision Makers.' (2) Keka's own site navigation carries a 'BY PROFESSION' section, verified verbatim in raw HTML: 'CHRO People leaders / CFO Finance leaders / TA (Talent Acquisition) Hiring teams / Founder Business owners and decision-makers' — four distinct buyer landing pages.

Source: https://www.keka.com/pricing

### 46. [high] No vendor, marketplace or third party publishes buyer-side funnel economics for this market. CAC, CAC payback, sales-cycle length, win rate, demo-to-close ratio, marketplace CPL/CPC actuals for the HR software category, free-to-paid conversion rates, and partner-sourced revenue share are all absent from public sources.

RE-CONFIRMED as an exhaustive negative across this second sweep. SoftwareSuggest defers CPC/CPL to signup on both its pricing and price-estimator pages; Techjockey's sitemap index contains zero vendor/seller/partner entries; Capterra returns 403 and its rendered vendor page carries no pricing; greytHR, Keka, HROne, factoHR, Darwinbox, Tally and Zoho's reseller track all publish no commission figures; Kredily defers CA and PSP program terms to its partnerships team. No conversion-rate disclosure was found on any freemium vendor's site.

Source: https://www.softwaresuggest.com/pricing

## Requirements

- Multi-company console: a single login spanning an unlimited number of client tenants, with a book-level dashboard showing per-client payroll status, pending approvals and compliance flags, strict per-client role and data separation, and a full audit trail of every cross-tenant action.
  - priority: P0 | rationale: The entry ticket to the CA and payroll-service-provider channel. Kredily productises it for both its CA Program and PSP Partner Program (verified verbatim: 'Switch between every client from one login'), and greytHR's PSP page is built on the same premise. The channel is unsellable without it regardless of commission offered.
- Bulk statutory execution across tenants: compute PF, ESI, state-wise Professional Tax and TDS for many clients in one cycle and emit PF ECR, PF/ESI challans, Form 24Q, Form 16 and Form 12BB in filing-ready formats, batched across the whole client book rather than one tenant at a time.
  - priority: P0 | rationale: Kredily's CA page leads with exactly this, verified: 'PF, ESI, Professional Tax and TDS tracked across all clients, with Form 16 & 24Q generated'. All form identifiers here were checked and are real and correctly named. A CA's unit of work is the book, not the company; per-tenant-only filing forces the practice back to spreadsheets.
- White-label and co-branding at tenant level: partner logo, colours, custom domain, outbound email sender identity, and branding on payslips, reports and the employee-facing app.
  - priority: P0 | rationale: Verified as the defining distinction in Kredily's own FAQ between its two accountant programs — white-label for payroll service providers, co-branding for CA practices. Practices will not put their client relationship behind another brand.
- Feature-gated free tier, not a seat-gated one: statutory computation (PF/ESI/PT/TDS), payslips, employee self-service and attendance free at any headcount; bank salary payout files, PF/ESI challans, Form 16, Form 12BB and Form 24Q behind the first paid tier. Feature flags must sit exactly on those boundaries.
  - priority: P0 | rationale: Kredily's verified gating computes statutory amounts free but withholds precisely the outputs an employer cannot operate without. The alternative in market — Zoho Payroll's free plan — is capped at 10 employees, which excludes the entire 20-200 target band and cannot be copied.
- Pricing model must natively support: (a) base fee with an included employee block plus per-employee overage above it (greytHR: Rs 2,495 including 50, then Rs 45/employee), (b) flat fee to a headcount ceiling then per-employee (Kredily: Rs 1,249 to 25, then Rs 50), (c) a uniform annual-prepay discount lever defaulting to 20%, and (d) per-user priced add-ons billed alongside the base.
  - priority: P0 | rationale: These are the three architectures actually in market, all re-verified this pass. Zoho Payroll's annual discount is exactly 20% on both base and overage across Standard, Professional and Premium. Keka's disabled legacy markup shows it too was built as base-plus-per-additional-employee. A pricing engine that cannot express all of these cannot respond to a competitive deal.
- One-time setup / implementation fee as a first-class billable line item, separately invoiced, waivable by rule, and assignable to a partner as their revenue rather than the vendor's.
  - priority: P0 | rationale: Keka's pricing FAQ confirms verbatim that 'a nominal setup fee applies' covering guided payroll configuration, employee data import, past-salary validation and customisation. Setup fees are an admitted norm; making the fee assignable to the partner is what makes partner-led implementation economically viable.
- Migration and onboarding toolkit built for partners, not only for the vendor's implementation team: bulk employee import with validation, ingest of prior-period salary records with arithmetic reconciliation against declared YTD figures, and a discrepancy report before go-live.
  - priority: P0 | rationale: This is literally what Keka's setup fee buys, per its own verified FAQ text ('importing employee data, validating past salary records'). If partners cannot implement unaided, every channel deal consumes vendor services capacity and the channel does not scale.
- Partner portal with deal registration (protecting a named prospect for a defined window), link-based referral attribution with a configurable cookie window defaulting to 90 days, a manual-claim path for offline referrals that never touch a link, a live commission ledger, and downloadable payout statements.
  - priority: P0 | rationale: Zoho's verified 90-day cookie is the benchmark for link attribution. But the Indian CA and Tally-reseller channel introduces prospects by phone and in person — a link-only model silently fails for the highest-value partner class, so the manual-claim path is not optional.
- Configurable commission engine supporting: percentage of billing for a defined term (Zoho: 12 months) versus perpetual recurring (Zimyo, Keka reseller renewal); volume-graduated tiers keyed to trailing revenue, count of new paid customers, or referrals per month; a separate one-time deal-size bonus at invoice-value thresholds; a per-transaction commission CAP; a tier re-evaluation window (Zoho: 6 months); and a post-referral stickiness period (Zoho: 60 days).
  - priority: P1 | rationale: To compete for partners already running on published terms, the engine must express Zoho (15/18/20% by revenue or customer count, +5% one-off at $5k/$10k/$15k invoice value, capped at $25,000 per transaction) and Zimyo (up to 20% at 1-3 referrals/month, up to 30% at 3+, recurring). The per-transaction cap was missed in the prior round and is added here — without it the engine cannot model Zoho's actual terms.
- Customer-side referral credit as a billing primitive: a wallet/credit balance on the customer account that a partner referral, campaign or CS gesture can fund, redeemable against subscription invoices.
  - priority: P2 | rationale: Zoho funds acquisition through the channel with a verified $100 wallet credit to the referred customer at every affiliate tier. This requires credits to exist in the billing system, not just discounts on a price list.
- Tiered partner demo/sandbox tenants seeded with realistic Indian payroll data (multi-state PT, EPF/ESI-eligible and ineligible employees, arrears, LOP, FnF), provisioned automatically on partner approval, with licence count governed by partner tier.
  - priority: P1 | rationale: Zoho gates demo-licence counts by tier, and Keka commits verbatim to assisting partners with 'the first 5 sales'. A partner who cannot demo credibly on day one does not transact, and realistic seeding is what makes a payroll demo credible.
- Marketplace lead ingestion and cost attribution: accept leads from SoftwareSuggest, Techjockey and G2 Digital Markets (Capterra/GetApp/Software Advice) via email parsing and webhook, deduplicate against existing pipeline, stamp an immutable source and campaign on every lead, and report cost-per-qualified-lead and cost-per-closed-won by source with package cost amortised across the engagement term.
  - priority: P1 | rationale: Marketplace spend is committed in large prepaid blocks (SoftwareSuggest: Rs 3,00,000 to Rs 10,00,000) with CPC/CPL fixed only at signup, so true unit cost is unknowable in advance and measurable only after the fact. Note the counterparty count has shrunk: G2 now owns Capterra, GetApp and Software Advice (closed Feb 2026) and has signalled a new pay-per-lead product, so terms on that side are in flux. Instrument attribution before the first rupee is spent or the channel cannot be judged at renewal.
- Self-serve signup through to paid activation with online card payment, including GSTIN capture at checkout and automatic generation of a GST-compliant tax invoice, plus in-product upgrade from the free tier without sales contact.
  - priority: P1 | rationale: Zoho Payroll is the only vendor in this set that completes a purchase online and publishes payment methods; greytHR, Keka and Kredily all route to trial-plus-sales. All published prices are exclusive of GST, so a checkout without GSTIN capture and a compliant invoice is unusable by an Indian business buyer.
- Parallel-run evaluation mode: let a prospect re-run their own most recent payroll month against their existing figures and produce a line-by-line diff of gross, each statutory deduction, net pay and employer contribution — usable inside a 7-14 day trial without an implementation.
  - priority: P1 | rationale: Trials run 7 days (greytHR, verified) to 14 days (Zoho Payroll), far too short to evaluate payroll correctness through normal onboarding. Compressing proof-of-correctness into the trial window attacks the demo-to-conversion step that the sales motion turns on.
- Product-side funnel instrumentation emitting named activation events — account created, first employee imported, first payroll previewed, first payroll finalised, first challan generated, first Form 16 issued, first ESS login, first mobile app install — exposed in an internal funnel view segmented by acquisition source and by partner.
  - priority: P1 | rationale: This is now the highest-value requirement in the set, because the second sweep confirmed the negative: no public benchmark exists for CAC, cycle length, win rate or free-to-paid conversion anywhere in this market. Every such number must be generated from the company's own data. Without instrumentation from launch the GTM section stays unanswerable indefinitely.
- Bank-distribution readiness: a bank-agnostic salary payout file abstraction with per-bank format adapters, plus a co-brandable embedded onboarding flow a bank can place inside its own SME channel, and per-bank tenant provisioning.
  - priority: P2 | rationale: greytHR's entire Alliance Partner track is banks and payment networks — ICICI, HSBC, IDFC First, AU Small Finance, Bank of Baroda, Kotak Mahindra, Visa, Mastercard — re-verified this pass directly from its page-data payload. Reinforced by the observation that competitors bind to single banks (Kredily's payout is specifically 'ICICI Bank & NEFT', Zoho Payroll's free-tier payout is 'through HSBC'), so format neutrality is a genuine differentiator, not just hygiene.
- Biometric and attendance-device integration layer: a documented device SDK/API, a published certified-device compatibility list, and a self-service device-registration flow a hardware dealer can complete without vendor engineering involvement.
  - priority: P2 | rationale: factoHR names 'IT Hardware/Biometric Reseller' as one of its recruited partner classes (verified, one of six). Biometric dealers already sit inside the target customer's premises and hold the buying relationship; device integration is a channel prerequisite, not merely a product feature.
- Tally interoperability: a payroll journal export in a TallyPrime-importable format (salary, statutory liabilities and employer contributions posted to the correct ledgers), plus documented cost-centre and ledger mapping configurable per client.
  - priority: P2 | rationale: factoHR names 'Tally/CRM/ERP Reseller' as a recruited partner class, and Tally's public locator returned 1,257 partners on two independent fetches. A Tally partner can only sell an HRMS that leaves the client's accounting stack untouched.
- Public partner directory and inbound lead routing: a searchable 'find a partner' surface filterable by city/state and specialisation, with listing eligibility gated on performance criteria, and automatic routing of inbound leads from a partner's territory back to that partner.
  - priority: P2 | rationale: Zoho, Tally and greytHR all run public partner locators, and Zoho gates directory listing on revenue performance. Tally's directory shows the pattern in full — grade badge, Partner Since year, review count, named contact. The directory is both incentive and lead-distribution mechanism, and routing inbound demand back to partners is what stops the direct team competing with the channel for the same deal.
- Partner-tier state machine with support-SLA differentiation: store each partner's tier, evaluation-window state and qualifying metrics; drive support response SLA, named account manager access, demo-licence count, badge entitlement and directory listing from that tier.
  - priority: P2 | rationale: Zoho differentiates partner support at a verified 48h / 36h / 24h with live KAM chat at upper tiers, and gates badges, demo licences and directory listing on tier. Tier is not a marketing label; it drives entitlements the system must enforce.
- Billing engine should store list price, first-term price and renewal price as separate values per subscription, support a scheduled step change at renewal, and be able to surface the forward renewal rate in-product before the renewal date.
  - priority: P1 | rationale: DOWNGRADED from P0 and re-argued. Its original rationale rested on Keka's reported Rs 6,999 renewal against Rs 9,999 list, which failed independent verification for a second time and must not be treated as established. The requirement still stands on its own merits — whatever price policy is chosen, a single price field forecloses the option and invites renewal disputes — but it should no longer be justified by a claim that first-year loading is a proven market norm, because that is not evidenced.

## Implications

- Channel STRUCTURE is trustworthy and directly usable; channel ECONOMICS is still largely unknown and the PRD must say so rather than paper over it. After adversarial re-verification, 41 of 47 original findings hold. The partner archetypes, program tracks, marketplace package costs, freemium paywall location and pricing architectures are all confirmed from vendor-primary sources and can be built on.
- The accountant channel is better evidenced than the prior round claimed, not worse. Correcting factoHR's partner list from three categories to six restored 'CA/Tax Consultant' as a named recruited class. Combined with Zimyo naming tax consultants and financial advisors, Kredily running a dedicated CA Program distinct from its PSP program, and greytHR productising payroll service providers, at least four vendors target the accountant-adjacent channel by name. This is the most consistently evidenced channel in the market and should anchor the GTM section.
- Build the pricing and billing engine to the three verified architectures, and default the annual-prepay lever to 20%. Zoho Payroll applies exactly 20% to both base and overage across all three paid tiers; greytHR uses base-plus-included-block-plus-overage; Kredily uses flat-to-ceiling-then-per-employee; Keka's own disabled markup shows base-plus-per-employee. Note the corrected Zoho tier names (Standard/Professional/Premium) and included blocks (25/50/50) before any competitive pricing comparison is drawn.
- Do not build a first-year-loading pricing strategy. The Keka renewal-below-list finding failed verification twice, including on a fetch that reached the correct India page. The billing system should still be able to express separate list, first-term and renewal prices — that is cheap optionality — but the PRD must not assert that discounted first years are a market norm.
- Treat the review-marketplace channel as ONE counterparty with terms in flux. G2 now owns Capterra, GetApp and Software Advice as of February 2026 and has signalled a pay-per-lead product off the combined dataset. Channel diversification assumptions written against four independent review sites are obsolete, and any marketplace budget should be committed in short increments until the new pricing surfaces.
- Instrument activation and source attribution before spending the first rupee on any channel. The exhaustive negative held on re-check: there is no public CAC, cycle length, win rate, CPL or free-to-paid conversion figure for this market. Every one of those numbers will have to come from the company's own funnel, which makes the instrumentation requirement the highest-leverage item in this dimension.
- Delete the sales-motion conclusions from the prior draft and re-derive them. The claim that Indian SMB HRMS is sold by cheap full-cycle reps came from a single small-vendor job ad and is contradicted by Keka, which advertises separate BDE roles for SMB and Mid Market alongside Enterprise AEs. Headcount planning and CAC modelling built on a one-rep-per-deal assumption at Rs 25-50k/month will understate cost. Assume a split motion until evidence says otherwise.
- The statutory-outputs paywall is the strongest single product-strategy inference available, but label it as an inference. Kredily verifiably computes PF/ESI/PT/TDS free and gates payout files, challans, Form 12BB and Form 16; Zoho Payroll instead gates on headcount at 10 and thereby excludes the entire 20-200 target band. The feature-gated model is the only one of the two that can serve the target segment, so build the flags on those exact boundaries — but the reading that this is 'the natural' boundary is analysis, not a vendor statement.
- Bank-format neutrality is a real differentiator, not hygiene. Every freemium competitor checked binds payouts to a single bank — Kredily to ICICI/NEFT, Zoho Payroll's free tier to HSBC — while greytHR's entire Alliance track is banks. A bank-agnostic payout abstraction is simultaneously a product advantage and the precondition for the one distribution channel no competitor has replicated.
- Sourcing hygiene for whoever writes the PRD: the two job-posting citations in this dimension are session-scoped redirect URLs that return 403 to anyone else. Their content was re-verified, but do not cite those URLs in a document others will check. Vendor scale claims from Techjockey, HROne and Darwinbox are self-reported with no corroboration and should be labelled as such wherever they appear.

## Open questions

- What are the actual CPC and CPL rates SoftwareSuggest and Techjockey charge in the HR/payroll category? SoftwareSuggest states 'CPC & CPL will be defined at the time of sign-up' and its Price Estimator shows no rate for any of its six services; Techjockey publishes nothing and excludes vendor pages from its sitemap entirely. Only a vendor-side sales conversation will settle this.
- Do marketplace packages convert at this ACV? A Rs 3,00,000 six-month SoftwareSuggest Basic package against a product priced around Rs 1,250-4,500/month base implies a large number of closed deals just to break even. No public data exists on marketplace-sourced win rates in the Indian HR software category.
- What will G2's announced pay-per-lead offering cost, and how will the Capterra/GetApp/Software Advice consolidation change lead quality and vendor pricing? The acquisition closed 5 Feb 2026 and G2 has publicly signalled a new pay-per-lead product off the combined dataset, but no rate card is published and vendor pages remain access-blocked. This is now a live commercial question, not just a branding correction.
- What commission percentage do greytHR, Keka, HROne, factoHR and Darwinbox actually pay? Only Zoho (15-20% affiliate, capped at $25,000 per transaction) and Zimyo (up to 20-30%) publish figures. Keka discloses the shape — first 12 months of billing plus renewal — but not the rate. Whether the Zoho and Zimyo numbers represent market norms is unknown.
- What proportion of each incumbent's revenue is partner-sourced versus direct? No vendor discloses this. It determines whether the channel is a genuine growth engine here or a low-yield add-on serving long-tail geographic coverage.
- Is Keka's renewal rate genuinely below its list rate? Still unresolved after two attempts. The second attempt reached the India page rather than a geo-variant and found no INR price in the served HTML at all — only disabled, commented-out per-additional-employee figures. Resolving this needs a rendered browser session with a live pricing widget, or a current Keka customer's invoice.
- What is the standard field discount off list at 20-200 employees, and how much is given as free months versus rate reduction versus waived setup fee? Nothing about discretionary discounting is public; only greytHR's marketed '~30% savings' on its Premium bundle is visible, and that is packaging, not a negotiated discount.
- What is the typical magnitude of the setup/implementation fee? Keka confirms one exists and calls it 'nominal' but publishes no number; no vendor in this set publishes an implementation price.
- What free-to-paid conversion rate do Kredily and Zoho Payroll achieve in India, and over what horizon? Both run substantial free tiers; neither publishes conversion data, and no credible third-party study of Indian B2B SaaS freemium conversion at this price point was found across two sweeps.
- Are greytHR's bank alliances distribution relationships or merely salary-payout integrations? The alliance data confirms the entities are listed under a 'financialPartners' collection with ALLIANCE_PARTNER type codes, but carries no description of the commercial arrangement. The difference is strategically decisive and not knowable from the public site.
- Do Tally's 1,257 listed partners actually cross-sell HRMS, and at what attach rate? factoHR recruits Tally resellers by name, but there is no public evidence of how many Tally partners carry an HRMS line or what it contributes to their revenue.
- Does greytHR run a chartered-accountant program? Still unresolved, but advanced this pass. Public site shows only Reseller and Alliance tracks plus a PSP demo-capture landing page; /chartered-accountants/ and /partners/ca-partner/ both 404. NEW LEAD: a Salesforce Experience Cloud partner portal exists at partners.greythr.com/s/become-a-partner-today but renders only an error shell to fetchers. Its partner-type taxonomy is behind login and is the most likely place a CA track would be named.
- What is the sales-cycle length and win rate at 20-200 employees, and how does it differ between an inbound marketplace lead, an outbound SDR-sourced lead and a CA referral? The single most consequential unknown for the GTM plan, with no public source. It can only be established by running the motion.
- What does an Indian HRMS sales rep actually cost, at what seniority mix, and what does a partner-sourced deal cost to close versus a direct one? This is LESS settled than the prior round claimed. The Rs 25,000-50,000/month figure is one small vendor's posting, not a benchmark; every Keka India sales posting publishes no compensation. Keka's split BDE/AE structure in the India SMB segment also implies at least two cost lines per closed deal, not one full-cycle rep. Needs salary-survey data or hiring experience, not job ads.
- Does the split SDR/AE model or a full-cycle model actually win at 20-200 employees in India? Keka runs split roles for India SMB and Mid Market; a small vendor runs full-cycle. Two data points pointing opposite ways, almost certainly correlated with company scale and funding rather than with segment economics. Unresolved.

## Retracted

- RETRACTED — factoHR partner categories. The claim that factoHR's 'Who Can be a Partner?' list is 'exactly those three categories' (HR/Payroll consultant, Tally/CRM/ERP reseller, IT hardware/biometric reseller) is wrong. The live page lists SIX, and the report omitted 'CA/Tax Consultant' — the category most relevant to its own accountant-channel argument — plus 'IT Consultant' and 'IT Solution Vendor'. Corrected in key_findings.
- RETRACTED — Zoho Payroll India plan names. The report named the tiers 'Standard / Premium / Elite'. They are STANDARD / PROFESSIONAL / PREMIUM. The report also framed the prices as flat per-org monthly fees and omitted the included-employee blocks (Standard 25; Professional and Premium 50), which materially changes what the price buys. The 20% annual-prepay discount conclusion is unaffected and confirmed.
- RETRACTED — the claim that for Indian SMB HRMS 'the on-the-ground motion is a FULL-CYCLE inside sales rep who also builds channel — not a split SDR/AE model — and the rep is inexpensive'. This generalized from one job ad by a small IT-services firm. Keka, the market leader, currently advertises 'Business Development Executive - SMB Market (India Market)', 'Business Development Executive - Mid Market' and 'Account Executive - Enterprise (India Market)' as separate roles — an explicitly split model in the India SMB segment. The Rs 25,000-50,000/month band is one small vendor's posting and is NOT a market rep-cost anchor. The underlying posting is retained as a single verified data point only.
- RETRACTED — the open question asserting 'Rep cost is now anchored (Rs 25,000-50,000/month fixed for a full-cycle Indian HRMS AE)'. It is not anchored. That is one small-vendor band; every Keka India sales posting shows no compensation, and Keka's roles are split-function rather than full-cycle.
- CARRIED FORWARD AND STRENGTHENED — the report's own correction of 'Gartner Digital Markets' to G2 was right and should now be treated as settled fact, not medium confidence. digitalmarkets.gartner.com redirects to app.g2digitalmarkets.com/login, and G2's acquisition of Capterra, Software Advice and GetApp from Gartner closed 5 February 2026. Capterra, GetApp, Software Advice and G2 are ONE counterparty for channel-planning purposes.
- CARRIED FORWARD — the Keka renewal-price finding (Rs 6,999 renewal against Rs 9,999 list for Foundation) remains UNVERIFIED after a second independent attempt. My fetch reached the India page (title 'Pricing | Keka HR', not the UAE variant) and no such figure exists anywhere in the served HTML. Carry it marked 'unverified — single-source' or drop it. Do not build a pricing argument on it.
- CARRIED FORWARD — do not assume Indian HRMS vendors at this price point sell self-serve. Only Zoho Payroll publishes payment methods and completes a purchase online. greytHR, Keka and Kredily route pricing-page CTAs to trial, free plan, 'Talk to Sales' or 'Book a Demo'. Freemium here is lead generation, not a self-serve revenue channel.
