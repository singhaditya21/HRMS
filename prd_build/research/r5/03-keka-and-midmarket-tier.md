# [r5] keka-and-midmarket-tier

## Verification notes

HOW MUCH TO TRUST THIS: high on numbers, medium on set completeness, and treat every prior-round verbatim quote as suspect until re-checked. I re-derived every price, clause and financial figure from primary sources rather than accepting the prior round's transcription. The good news is that the overwhelming majority survived: Keka's commented-out ₹90/₹120/₹150, the Aug 2024 archived card, the ToS clauses, the Keka AI counts, the Qandle rate card, Zimyo, HROne and Pocket HRMS rate cards, ZingHR's absence of pricing, and — notably — every one of the Ramco annual-report figures including the note numbers, which I re-extracted from the 15MB PDF myself. The bad news is concentrated in two places: fabricated verbatim evidence, and an incomplete vendor set.

WHAT I RETRACTED AND WHY. (1) The Qandle '__/mo' placeholder quote is not in the page; '__' appears zero times. The conclusion it supported is right, but the evidence was invented, almost certainly by a summarising fetch tool rather than by reading the page. This is the single clearest instance of the fabricated-precision failure mode the prior rounds were warned about, and it is a warning that plausible-looking verbatim quotes in these reports are not self-authenticating. (2) The '₹50/mo per employee' mystery was solved and the prior guess refuted: it is the Remote Screen Tracking module, identifiable from the vendor's own config keys and the feature matrix's section headers. (3) '14-day trial' for HROne and Pocket HRMS is on neither page. (4) The claim that Keka's locale hrefs were JS-driven and untestable was wrong — they are plain anchors, and running the test resolved an open question. (5) The Keka customer-count growth story collapses because Keka publishes 10,000+ and 12,500+ on live pages the same day.

THE MOST CONSEQUENTIAL CORRECTION IS AN OMISSION, NOT AN ERROR. greytHR — which claims 30,000+ customers, roughly 2.4x Keka's self-reported figure, and publishes a complete rate card plus the only per-module add-on prices in the set — was absent from all prior rounds. I found it because Pocket HRMS's own comparison FAQ names it. Its inclusion refutes the 'Qandle is the price floor' claim, strengthens the 50-seat-floor finding to six of six, and supplies the best evidence in the whole dimension on statutory filing. A PRD author should assume the vendor set may still be incomplete and should ask specifically what else was never searched for.

I ALSO REVERSED ONE OF MY OWN INTERIM CONCLUSIONS, which is worth flagging as a caution about method. A plain grep showed 'Direct Salary Payout' present on both the current and 2024 Keka pages, which appeared to refute the prior round's claim that Keka dropped it. Checking comment boundaries showed the string sits inside a 477-character HTML comment on the live page and outside one in 2024 — so the prior round's rendered observation was right and my grep was the misleading test. I upgraded rather than retracted that finding, and discovered three further suppressed feature blocks in the process. The general lesson, which I have written into the methodology PRD change: raw fetch and rendering fail in OPPOSITE directions here. Rendering hides Keka's rate card because it lives in comments; raw fetch hides Qandle's because it is JS-injected. Either method used alone produces exactly the contradictions that plagued the prior rounds. For JS-injected pricing, the vendor's own config file is a stronger source than the rendered page, and it is how I recovered all eight Qandle tier prices plus the Remote Screen Tracking answer.

NULL RESULTS I TESTED RATHER THAN ACCEPTED. 'No live prices on keka.com/pricing': confirmed by stripping comments and counting rupee characters (zero). 'No minimum seat count published by Keka': confirmed, 'minimum'/'up to'/'starts at' all return zero on the live page. 'No filing claims': this was the weakest null in the prior round and I deliberately attacked it by adding the vendor most likely to falsify it. greytHR's payroll page is unambiguous — ECR generation, challans, eTDS returns, Form 24Q generation with FVU validation, Form 16 generation — every verb is compute/generate/validate, and 'filing', 'e-fil', 'TRACES' and 'EPFO' appear zero times. That upgrades the null from medium to high while preserving the honest caveat that I searched marketing and product surfaces, not documentation or a live tenant.

WHERE I MADE A GENUINE ATTEMPT AT AN 'UNKNOWN' AND FAILED. The ₹6,999 block size: I followed Keka's own plan CTAs into the signup flow, which turns out to be a demo-request form with no pricing, no plan selector and no seat field — which itself corrected the prior round's characterisation of Keka's 'Free Trial'. That question stays genuinely open.

SOURCE DISCIPLINE. Vendor primary pages, vendor config files, vendor legal terms, the Wayback archive of vendor pages, and one audited annual report I downloaded and extracted locally. I used no competitor blogs, affiliate posts or SEO aggregators as evidence. Techjockey and Pocket HRMS are cited once each as corroboration only, at medium confidence, for figures I had already recovered from Keka's own archived page — and I flag in-line that Pocket HRMS misstates greytHR's entry price (₹3,495 vs the published ₹2,495), which is precisely why competitor-cited pricing must never be primary. Trade press is used only for the MYND/Qandle deal date, where multiple outlets and MYND's own dated announcement agree on 17 April 2025.

CALIBRATION. 'High' means I retrieved the artifact myself this session and can point to the byte offsets, clause numbers or note numbers. 'Medium' is reserved for third-party corroboration, vendor marketing self-claims (customer counts, AI availability, the MYND strategic reading), and inferences I have labelled as such. All effective per-employee costs are my arithmetic on verified block prices and are labelled. No figure, plan name, clause number or feature label in this report was carried forward from the prior round without independent re-verification against the source.

## Key findings (36)

### 1. [high] CONFIRMED INDEPENDENTLY: Keka's India pricing page publishes no live prices, and the prices survive in the page source only as HTML comments — exactly three, one per plan, in FOUNDATION/STRENGTH/GROWTH order.

Re-verified 5 Sep 2026 by plain curl (HTTP 200, 318,005 bytes) — no browser required. Comment scan of the raw HTML: 60 HTML comments, exactly 3 containing a rupee symbol, verbatim '<!-- <span class="price_permonth mt-30 d-block text-center"><span>₹90</span> per additional employee</span> -->' and likewise ₹120 and ₹150. Byte offsets confirm plan order: FOUNDATION@137365 → ₹90@137757; STRENGTH@151895 → ₹120@152281; GROWTH@160947 → ₹150@161345. After stripping comments, the live HTML contains ZERO rupee characters.

Source: https://www.keka.com/pricing

### 2. [high] CORRECTION TO METHOD PREMISE: keka.com is NOT unreachable by non-browser fetching. Plain curl retrieves every Keka page cleanly. The prior round's TLS failure was specific to the WebFetch tool, not to the site. This matters because the commented-out prices are ONLY findable by raw-HTML scanning — a rendered read cannot see them.

curl -sL returned HTTP 200 for /pricing (318KB), /small-companies (268KB), /terms-of-services (215KB), /keka-ai (239KB), /us/pricing (352KB), /ae/pricing (334KB). Every finding below was reproduced from these raw files. The prior report's framing that 'abandoning raw HTTP fetching for a real rendering browser' was the decisive move is backwards for the single most important finding: rendering HIDES the commented prices; raw fetch reveals them.

Source: https://www.keka.com/pricing

### 3. [high] RESOLVES A PRIOR OPEN QUESTION: Keka's price suppression is GLOBAL, not India-specific. The US and UAE pricing pages use the identical commented-out mechanism with zero live prices. Withdrawn US card: $9 / $16 / $22 per employee/month. Withdrawn UAE card: $4 / $5 / $6 per additional employee.

keka.com/us/pricing and keka.com/ae/pricing both return HTTP 200 and both contain exactly 3 commented price spans and zero live currency figures. US verbatim: '<!-- <span class="price d-block mb-10 mt-10 text-center">$9<span class="price_permonth_cur">/month</span></span> <p class="package_description">per employee</p> -->'. Both carry the same FOUNDATION/STRENGTH/GROWTH plan names. The prior round claimed locale hrefs were 'JS-driven and not captured' — they are plain hrefs in the raw HTML. Note the US model is per-employee, not India's block+overage.

Source: https://www.keka.com/us/pricing

### 4. [high] Keka's historical India rate card is confirmed from the Wayback snapshot of Keka's own page dated 1 Aug 2024: FOUNDATION ₹9,999/month (Upto 100 Employees) + ₹90 per additional employee; STRENGTH ₹12,999 + ₹120; GROWTH ₹15,999 + ₹150. Hiring priced separately: PRO ₹1,500/month per recruiter, ADVANCED ₹2,500/month per recruiter.

Archived HTML retrieved and parsed directly. Verbatim markup: '<span class="price d-block mb-10 mt-10 text-center">₹9,999<span class="price_permonth_cur">/month</span></span><p class="package_description">(Upto 100 Employees)</p>'. 'Upto 100 Employees' appears 3 times; signup slugs plan=foundation/strength/growth confirmed; 'Loved by companies with 20 - 20,000 employees' and '150 countries' both present.

Source: https://web.archive.org/web/20240801081338/https://www.keka.com/pricing

### 5. [medium] The archived ₹9,999/100-employee figure is independently corroborated in 2026 by TWO third parties, one of them a direct competitor with an incentive to be accurate about a rival's list price.

Pocket HRMS's own live pricing FAQ, verbatim: 'Keka starts significantly higher at around ₹9,999/month for 100 employees.' Techjockey's Keka listing separately quotes Foundation ₹9,999 / Strength ₹12,999 / Growth ₹15,999 for 100 users monthly. CAVEAT ON THE SAME SOURCE: Pocket HRMS's neighbouring claim that 'greytHR's minimum paid plan starts at ₹3,495/month' is WRONG against greytHR's own live page (₹2,495), so competitor-cited pricing corroborates only loosely and must never be used as a primary figure.

Source: https://www.pockethrms.com/pricing/

### 6. [high] Keka publishes live India pricing on its small-business landing page at a LOWER entry point than the withdrawn card: '₹90 per employee/month' and 'from ₹6,999 per month' for the complete HR stack.

Raw HTML, 5 Sep 2026, five live rupee occurrences, verbatim: 'Starts at ₹90 per employee/ month'; 'Keka gives you the complete HR stack from day one, starting at ₹6,999 per month.'; FAQ 'Keka starts at ₹90 per employee per month, or from ₹6,999 per month for the complete HR stack, with no setup fees or hidden add-on costs.' The word 'minimum' appears zero times on this page, so no seat block is disclosed. ₹6,999 is ₹3,000 below the archived ₹9,999 floor; the ₹90 marginal rate is unchanged.

Source: https://www.keka.com/small-companies

### 7. [high] Two live Keka pages directly contradict each other on setup fees, and neither quantifies one.

keka.com/pricing FAQ verbatim: 'Is there a setup or implementation fee?' — 'Yes, a nominal setup fee applies to cover Keka's comprehensive onboarding process. This includes guided configuration of payroll, importing employee data, validating past salary records, and customizing features to suit your needs.' keka.com/small-companies verbatim: 'Keka's pricing is transparent with no setup fees, surprise add-ons, features locked behind an upsell.' Both retrieved the same day from the same host.

Source: https://www.keka.com/pricing

### 8. [high] Keka's Terms of Service state renewal fees go UP, not down. Verified verbatim, and clause numbering confirmed as clause 15, titled 'Term'.

Clause header verified in context: '15. Term. This Agreement is effective from the date of the SOF. Thereafter, this Agreement shall automatically renew for successive terms of equal duration to the Initial Term ... unless either party provides ... written notice of its intent not to renew at least thirty (30) days prior to the expiration of the then-current Term. Upon any renewal, the recurring fees shall be subject to an increase, the extent of which will be mutually discussed and agreed upon by Keka and the Subscriber. Notwithstanding the foregoing, any downgrade in subscription scope including but not limited to volume, plan, term, or billing cycle may be subject to re-pricing at the time of renewal, regardless of prior Term pricing.' The following clause is '16. Termination for Cause', confirming the number.

Source: https://www.keka.com/terms-of-services

### 9. [high] Keka's cancellation terms HARDENED between Aug 2024 and today. The 2024 pricing FAQ promised no lock-in and no cancellation fee; that FAQ item is gone, and the current ToS makes fees non-refundable with auto-renewal.

Aug 2024 archive, verbatim: 'Do you have a lock-in period or a cancellation fee?' — 'You can cancel your Keka account at any time with no fees and there is no lock-in period. If you should decide to cancel, please understand we're unable to offer prorated refunds.' The current pricing page FAQ has exactly three items (data access, setup fee, policy best practices) and no lock-in question; the two 'lock-in' regex hits on the current page are false positives from 'clock-in'. Current ToS clause 3: 'Fees are non-refundable whether or not the Keka Platform is actively being used.'

Source: https://www.keka.com/terms-of-services

### 10. [high] Other Keka ToS commercial terms verified verbatim: region-based pricing revised on region change; overage billed; 1%/month late interest; no customizations; and a prepaid wallet construct ('Keka Service Credits', 1 credit = 1 currency unit, credited to 'Keka Wallet', defined as a semi-closed prepaid instrument).

Clause 3: 'Pricing is determined based on the region of the Subscriber, its employees and shall be revised in the event of any change in such region... Additional charges will apply for additional purchases or usage in excess of the purchased subscription(s). Late payments are subject to interest at a rate of 1% per month or the highest rate permitted by law, whichever is lower.' Clause 1.7/1.8 define Keka Service Credits and Keka Wallet. Clause 5: 'As a SaaS platform, Keka does not offer customizations for individual customers.'

Source: https://www.keka.com/terms-of-services

### 11. [high] Keka's suppression-by-comment extends BEYOND prices to at least four product features, including the entry tier's salary-disbursement capability. 'Direct Salary Payout' is commented out on the live pricing page while remaining live in the Aug 2024 archive — and it already carried '(additional charges applicable)' in 2024.

The current page's Direct Salary Payout block sits inside a 477-character HTML comment: '<!-- <div class="pricing_package_card"> <div class="pricing_package_header">Direct Salary Payout</div> <div class="pricing_package_body">Finalize payroll and disburse salaries directly from Keka Wallet, with a single click. (additional charges applicable).</div> </div> -->'. It sits in the FOUNDATION block immediately after Statutory Compliance, the same position as in 2024, where it was NOT commented. Three further feature blocks are likewise commented out: 'Timesheets on Mobile App', 'Smart Resource Allocation', and a 3,101-character 'CLIENT PORTAL (Coming Soon)' section. NOTE: a naive grep finds the string on both pages and would wrongly conclude nothing changed; the comment boundary is the discriminating test.

Source: https://www.keka.com/pricing

### 12. [high] Keka AI is still entirely waitlist-gated, with payroll — the capability nearest a compliance claim — explicitly marked COMING SOON alongside Performance and Employee engagement.

Raw HTML, 5 Sep 2026: 'Join the waitlist' appears exactly 2 times; 'COMING SOON' exactly 3 times, adjacent to 'Payroll', 'Performance' and 'Employee engagement' in that order. Unbadged tabs: Hiring, HRIS, Onboarding, AI helpdesk, Time attendance. The footer CTA copy 'See Keka AI working with your own data / Live demo available. Start using Keka AI now!' sits directly above a 'Join the waitlist' button — an internal contradiction on the same page.

Source: https://www.keka.com/keka-ai

### 13. [high] Keka AI's published architecture and governance commitments verified verbatim, including a 'Keka MCP Server' for external assistants.

Verbatim: 'Keka MCP Server — Securely connect Keka with Claude, ChatGPT and other AI assistants so power users can analyze workforce data, generate reports and perform deeper reasoning'; 'Source citation on every answer — Every response references the policy section, the record, or the report behind it. No citation means no answer.'; 'No silent writes — Every action requires an explicit human confirmation.'; 'Multi-entity awareness by default'; 'Your data never trains external models — The query goes to the LLM. The response is generated from your data inside your Keka tenancy.' All behind the same waitlist.

Source: https://www.keka.com/keka-ai

### 14. [high] NEW — MAJOR COVERAGE GAP IN THE PRIOR ROUND: greytHR, one of India's largest SMB HR/payroll vendors, was omitted entirely from the competitive set despite publishing a complete rate card and claiming more customers than Keka. Essential ₹2,495/month (includes 50 employees) + ₹45/employee above 50; Growth ₹4,495/month (includes 50) + ₹85/employee above 50; Premium custom, all modules, '~30% savings vs Growth plan'.

greythr.com/pricing rendered text, verbatim: 'Essential ₹2,495 /month Base price ₹2,495 Included 50 emp Additional cost ₹45/emp'; 'RECOMMENDED Growth ₹4,495 /month Base price ₹4,495 Included 50 emp Additional cost ₹85/emp'; 'Premium Custom All modules included Tailored to you ~30% savings Vs Growth plan'. Page also states 'Used by 30,000+ companies' — 2.4x Keka's self-reported 12,500+ — and 'Experience 7-day free trial — no commitments, no upfront cost.' greytHR was surfaced by Pocket HRMS's own comparison FAQ naming it as the benchmark competitor.

Source: https://www.greythr.com/pricing/

### 15. [high] greytHR publishes per-module add-on prices, which no other vendor in this set does: Performance Management ₹35–₹45/user/month; Timesheets ₹35/user/month; Expense Management ₹35/user/month; GPS Live Tracking ₹140/user/month; Recruit ₹2,500/recruiter/month; Alumni Portal ₹20/user/month. Most are free in Premium.

greytHR pricing page, verbatim per row: 'FREE IN PREMIUM Performance Management System Goals, reviews, appraisals ₹35–₹45 /user/month Available for : Growth'; 'Recruit All-in-one Recruitment solution ₹2500 /recruiter/month Available for : All plans'; 'Alumni Portal Ex-employee engagement portal ₹20 /user/month'. Page also offers a 'FLEXIBLE START — Not ready for the full suite? Begin with just one piece' motion, gated behind 'Talk to Sales Team' with no published price.

Source: https://www.greythr.com/pricing/

### 16. [high] CORRECTED METHOD FINDING — Qandle: the prior round's stated evidence is wrong even though its conclusion is right. Qandle's raw HTML contains NO literal '__/mo' placeholders. It contains EMPTY spans populated by JavaScript from a country-keyed config. Raw fetch therefore shows no prices at all, not placeholder text.

Raw HTML of transparent-pricing.html contains zero '₹', zero '&#8377;', and zero occurrences of '__'. The actual markup is '<span class="currency country-currency"></span> <span><span class="value countryPriceFouYearGreater"></span><small>/mo</small></span> <span class="duration">upto 50 employees</span>'. The string '/mo' appears 46 times with no adjacent digits. The prior round's verbatim quotes '__/mo' and '__ /mo per employee' cannot be reproduced against the page and appear to be an artifact of the summarising fetch tool, not page content.

Source: https://www.qandle.com/transparent-pricing.html

### 17. [high] Qandle's full India rate card recovered from the vendor's OWN pricing config file — a stronger source than rendering — and confirmed identical by rendering the page. Monthly: FOUNDATION ₹2,950 + ₹59; REGULAR ₹4,950 + ₹99; PLUS ₹6,200 + ₹124; PREMIUM ₹8,000 + ₹160. Annual: ₹2,450 + ₹49; ₹3,950 + ₹79; ₹4,950 + ₹99; ₹6,450 + ₹129. All base blocks 'upto 50 employees'. ENTERPRISE is quote-based for 1000+.

qandle.com/js/pricing/custom-neww_dd.js, India object (code:'IN', title:'IND', currencySymbol:'₹'): countryPriceFouYearGreater:'2950', countryPriceFouYear:'59', countryPriceFouMonthGreater:'2450', countryPriceFouMonth:'49', countryPriceRegMonthTotal:'4950', countryPriceRegYearTotal:'3950', countryPricePlusMonthTotal:'6200', countryPricePlusYearTotal:'4950', countryPricePrimMonthTotal:'8000', countryPricePrimYearTotal:'6450', countryPriceDiscount:'25'. Rendered page returned exactly these 24 rupee figures in card order. NOTE Qandle's variable names are internally inverted for the FOUNDATION tier (the 'Year' keys feed the monthly card); the DOM's data-type attributes and the rendered output both confirm monthly=2950/59, yearly=2450/49. Page header 'Save upto 25 %' matches countryPriceDiscount:'25'.

Source: https://www.qandle.com/js/pricing/custom-neww_dd.js

### 18. [high] RESOLVES A PRIOR OPEN QUESTION AND REFUTES ITS GUESS: Qandle's unlabelled '₹50/mo per employee' line is the Remote Screen Tracking module, not managed services or à-la-carte pricing. In India it costs the same monthly or annually — unlike every other country Qandle prices.

The line's config keys are countryPriceRemoteST_monthly:'50' and countryPriceRemoteST_yearly:'50'. Its DOM element is '<li class="remote_lst">' inside the feature-comparison matrix, and the matrix's section headers, extracted from '<li class="module_name">' elements, read: Core HR, Strategic HR, Remote Screen Tracking, Reports & Analytics, Support. 'RemoteST' = Remote Screen Tracking. Other countries discount it annually (7→6, 9→8.1, 2→1.8, 2.50→2.25); India alone is 50→50. The prior round's inference that it was 'likely the MYND-backed managed-services or à-la-carte rate' is refuted.

Source: https://www.qandle.com/transparent-pricing.html

### 19. [high] Qandle's advisory add-ons (HR Advisory, Payroll Advisory, Compliance Assistance) are described but genuinely carry no published price — confirmed, not merely unobserved.

Add-on section verbatim: 'for pricing of Add-On Apps contact us at support@qandle.com'. Descriptions verbatim: 'Payroll Advisory — Optimize tax-compliant pay structures to avoid any breaches, outsource verification of proofs and claims and complete payroll processing'; 'Compliance Assistance — Ensure alignment with the latest statutory compliance applicable, avoid breach of statutory laws, get consulted on compliance/law changes'; 'HR Advisory — Structure the policies most favourable for your organization based on industry best practices'. The config does hold unrendered module values (ShiftPlanner/Timesheet/FieldForceTracking all '0.8', and an unused string 'or INR 3000 pm whichever is higher'), but none of these render on the page, so they are not published prices and must not be quoted as such.

Source: https://www.qandle.com/transparent-pricing.html

### 20. [high] The MYND acquisition of Qandle is confirmed, dated 17 April 2025, and is now visible in Qandle's own product surface.

Qandle site footer verbatim: 'Copyright@ 2026 MYND'. Trade press (People Matters, HRKatha, CIO Bulletin, MYND's own LinkedIn post dated 2025-04-17) confirms the announcement date and carries founder/Group MD Vivek Misra verbatim: 'Qandle is a perfect fit for our vision, complementing our dominance in enterprise payroll and compliance. With this integration, our multi-country payroll customers will benefit from a seamless, unified experience.' MYND is described as a Finance & Accounting and HR outsourcing provider serving 1000+ customers.

Source: https://www.peoplematters.in/news/business/mynds-acquires-qandle-to-elevate-hr-technology-45241

### 21. [high] Zimyo rate card verified exactly: Basic ₹80, Standard ₹160 (Popular), Enterprise ₹240 per user/month, each with '*Minimum billing for 50 Users'. Add-ons: Recruit ₹4,000/recruiter/month; HR Analytics ₹20,000/license/month; Timesheet, Learn (LMS) and Trip Management ₹40/user/month each. 14-day free trial, no credit card.

Rendered page, programmatic extraction: rupee chips exactly ₹80, ₹160, ₹240, ₹4,000, ₹20,000 and three instances of ₹40; the string 'Minimum billing for 50 Users' matched exactly 3 times (once per plan). Trial FAQ verbatim: 'How does the 14 days free trial work?' — 'you sign up, you will have access to a limited features for 14 days. We do not require any payment or credit card info from you.' NOTE: zimyo.com returns HTTP 403 to curl, so this vendor genuinely does require a browser.

Source: https://www.zimyo.com/pricing/

### 22. [high] HROne rate card verified exactly: Basic ₹4,950/month for 50 users + ₹99/month per additional user; Professional ₹6,500/month for 50 users + ₹130/month per additional user; Enterprise quote-based 'For 50+ Team'. Zero contractual lock-in; no setup fee except possible enterprise implementation cost.

Raw HTML, verbatim: 'Basic ₹ 4950 /Month For 50 Users Additional User @ ₹99/Month'; 'Professional ₹ 6500 /Month For 50 Users Additional User @ ₹130/Month'. FAQ verbatim: 'There is zero contractual lock-in...'; 'Are there any setup fees or additional costs apart from the base pricing? No, there's no additional cost apart from the base pricing and charges for the add-ons you choose. However, please note that an implementation cost may apply for enterprise-level clients.' A separate startup programme exists 'For Startups (less than 50 Employees)' with no published price. CORRECTION: the string '14-day' does not appear anywhere on this page — the prior round's '14-day trial' for HROne is unsupported; the page says only 'Get Free Trial'.

Source: https://hrone.cloud/pricing/

### 23. [high] Pocket HRMS rate card verified exactly: Standard ₹2,995/month billed annually for 50 employees + ₹60 per additional; Professional ₹4,495/month billed annually for 50 employees + ₹90 per additional; Premium quote-based with 'Minimum Subscription- 100+ Employees'. Hard 50-employee floor; unquantified one-time implementation fee.

Raw HTML verbatim: 'Standard ₹ 2995 per month, billed annually For 50 employees (₹ 60 per additional employee)'; 'Professional ₹ 4495 per month, billed annually For 50 employees (₹ 90 per additional employee)'; 'Premium Call for Pricing ... Minimum Subscription- 100+ Employees'. FAQ verbatim: 'Yes, there is a minimum requirement of at least 50 employees for using Pocket HRMS.' and 'Yes, a nominal one-time implementation fee applies. Unlike some competitors who surprise you with this later, we disclose it upfront during the sales discussion. The fee varies based on company size, number of customisations, and complexity of data migration.' CORRECTION: '14-day' / '14 day' appear nowhere on this page — the prior round's '14-day trial' for Pocket HRMS is unsupported. The page offers a 'Get Free Trial' button and states 'Pocket HRMS offers a free demo'.

Source: https://www.pockethrms.com/pricing/

### 24. [high] ZingHR publishes no pricing and is an enterprise HCM vendor sold by vertical — confirmed, not a competitor in the 20-200 band.

Raw HTML of zinghr.com: zero rupee characters, zero hrefs matching /pric/i. Page title verbatim: 'ZingHR | Enterprise HCM for the End of Transactional HR'. zinghr.com/pricing returns HTTP 404. Claims '1200+' enterprises; AI brand 'GHROWTH' present.

Source: https://www.zinghr.com/

### 25. [high] Ramco publishes no pricing for its payroll product and is an enterprise multi-country payroll vendor, not an India SMB competitor.

The Ramco Payce product page shows no price, no rate card and no pricing link; CTAs are 'Let's Talk' and 'Take a Tour'. The audited annual report describes the business as helping enterprises standardize multi-country payroll.

Source: https://www.ramco.com/products/payce-payroll-software

### 26. [high] FULLY RE-VERIFIED AGAINST THE FILING: Ramco's FY2025-26 consolidated business-unit revenue is HRP (HR & Payroll) Rs. 2,976.15 Mln / USD 33.93 Mln, up from Rs. 2,275.45 Mln / USD 27.10 Mln (+30.8% in rupees). ERP Rs. 1,633.98 Mln / USD 18.62 Mln. Aviation Rs. 2,399.39 Mln / USD 27.35 Mln. Total Rs. 7,009.52 Mln / USD 79.90 Mln.

I downloaded the 15,028,359-byte PDF from the cited URL and extracted it with pdftotext -layout. Note 20.3 'Business unit wise revenue' in the Notes to Consolidated Financial Statements for the year ended March 31, 2026 reproduces every figure to the decimal. Note number, note title, both years and both currencies check out exactly. This is the rare case in this report where a long chain of precise figures survives adversarial checking intact.

Source: https://www.ramco.com/hubfs/494075/investor-relations/annual-report-2025-26.pdf

### 27. [high] Ramco's entire India business across all three business units was Rs. 1,329.96 Mln / USD 15.16 Mln in FY2025-26 (19.0% of consolidated). India HR-payroll revenue is not disclosed but is bounded above by that figure. A TIGHTER bound is available that the prior round missed: the standalone Indian entity's India-geography revenue was Rs. 1,127.51 Mln.

Consolidated note 20.2 'Geography wise revenue': Americas Rs. 1,380.40 Mln / USD 15.74 Mln; Europe Rs. 380.55 / 4.34; APAC Rs. 3,129.19 / 35.66; India Rs. 1,329.96 / 15.16; Middle East and Africa Rs. 789.42 / 9.00. Standalone note 20.2 gives India Rs. 1,127.51 Mln and standalone note 20.3 gives HRP Rs. 1,447.94 Mln. Note 32 verbatim: 'The Group operates in a single operating segment, being software solutions and services, as defined under Ind AS 108', with BU and geography disclosed only under paragraph 31 — so the two splits are voluntary and NOT cross-tabulated. Both bounds are arithmetic, hence INFERRED.

Source: https://www.ramco.com/hubfs/494075/investor-relations/annual-report-2025-26.pdf

### 28. [high] Ramco's HR & Payroll metrics confirm a pure enterprise motion: 500+ payroll customers globally, 150+ countries, 18 new enterprise customers in FY2025-26, ~70,000 additional employees onboarded, implementations for 25+ customers across 60+ countries.

All verified verbatim in the annual report's HR & Payroll SBU section and MD&A: 'We added 18 enterprise customers across BFSI, healthcare, technology, and services sectors, and expanded existing strategic accounts, collectively onboarding approximately 70,000 additional employees to our platform during the year.' Named wins include a US healthcare enterprise of 25,000+ employees, a global aerospace organization of 7,500+ across 17 countries, and a US construction major with 9,000 employees. MINOR CORRECTION: the report gives BOTH 'Around 20 country go-lives per quarter' and '15-20 country go-lives per quarter' in different sections; quote the range, not the point estimate. The prior round's '~3,900 employees per new logo' is arithmetic that overstates per-logo size because the 70,000 explicitly includes expansion of existing accounts — treat it as an upper bound only.

Source: https://www.ramco.com/hubfs/494075/investor-relations/annual-report-2025-26.pdf

### 29. [high] STRUCTURAL FINDING, NOW STRONGER AT SIX OF SIX VENDORS: every mid-market vendor in this set that publishes a price imposes a 50-employee minimum billing block; Keka's historical block was 100. A 20-employee company cannot buy 20 seats from any of them.

greytHR 'Included 50 emp' (Essential and Growth); Zimyo '*Minimum billing for 50 Users' (all three plans); HROne 'For 50 Users' base blocks; Pocket HRMS 'minimum requirement of at least 50 employees'; Qandle 'upto 50 employees' base blocks on all four tiers; Keka archived '(Upto 100 Employees)'. Adding greytHR strengthens rather than weakens the finding. Caveat: greytHR's pricing slider starts at 10 employees and its feature table says 'Number of Employees: Unlimited', so it will quote below 50 — but the base price still buys 50.

Source: https://www.greythr.com/pricing/

### 30. [high] CORRECTED PRICE TABLE at 50 employees, entry tier, per employee per month: Qandle ₹49.00 (annual) / ₹59.00 (monthly); greytHR ₹49.90; Pocket HRMS ₹59.90 (annual); Zimyo ₹80.00; HROne ₹99.00; Keka ₹139.98 at its ₹6,999 floor or ₹199.98 at the archived ₹9,999 card. At 20 employees: Qandle ₹122.50; greytHR ₹124.75; Pocket HRMS ₹149.75; Zimyo ₹200.00; HROne ₹247.50; Keka ₹349.95.

My arithmetic on independently verified block prices. The prior round's figures are all arithmetically correct; the change is the insertion of greytHR, which lands second-cheapest at 50 seats and second-cheapest at 20. This REFUTES the prior round's claim that 'Qandle is the price floor of the entire set': on MONTHLY billing greytHR (₹2,495) undercuts Qandle (₹2,950); Qandle only takes the floor on annual billing (₹2,450 vs ₹2,495), by ₹45/month. Keka remains the most expensive vendor in the set by 1.4x-2.9x at 50 seats.

Source: https://www.greythr.com/pricing/

### 31. [high] Payroll sits in the ENTRY tier for every vendor in this set that publishes tiers, greytHR included. What is gated upward is performance, recruitment, engagement, analytics and workflow.

greytHR Essential is 'Payroll + Leave + CoreHR' and the page states 'Every plan includes complete payroll, leave management, and employee self-service'; Performance is a paid add-on. Keka FOUNDATION includes Payroll Automation, Statutory Compliance, Accounting Integration, Loans & Salary Advances, Expense Management, Employee Tax Management, Gratuity Management. HROne Basic includes Payroll; Recruitment/Performance/Engagement are Enterprise-only. Qandle FOUNDATION's Core HR block includes Payroll. Pocket HRMS Standard includes smHRt Payroll Processing.

Source: https://www.greythr.com/pricing/

### 32. [high] UPGRADED FROM MEDIUM TO HIGH, AND ON A BROADER BASE: no vendor in this set claims to SUBMIT statutory returns. The category convention is compute → generate the statutory file → the customer files it. greytHR, the most compliance-forward vendor in India and the one most likely to have filing, states generation language explicitly.

greytHR payroll page, verbatim and unambiguous: 'PF calculations with ECR generation', 'ESI computations and challans', 'PT with all state-specific rules built-in', 'Comprehensive TDS (IT) calculations and eTDS returns', 'One-click Form 24Q generation with automatic FVU validation', 'Digitally signed Form 16 and 12BA generation'. Every verb is calculate/generate/validate; none is file/submit/upload. The words 'filing', 'e-fil', 'TRACES' and 'EPFO' appear zero times on that page. Keka FOUNDATION offers 'pre-built PF, ESI, LWF, TDS and other mandatory statutory reports'. Qandle's nearest offer is the unpriced advisory add-on 'Compliance Assistance'. CAVEAT PRESERVED: I searched pricing, payroll and feature surfaces, not product documentation or a trial account, so absence of a published filing claim is strong evidence of positioning but not proof of absent capability.

Source: https://www.greythr.com/payroll-software/

### 33. [medium] AI POSTURE INVERSION HOLDS, but it is a claim-posture comparison only. Keka gates all AI behind a waitlist while Zimyo, HROne, Pocket HRMS and Qandle market generally-available AI agents, and greytHR ships 'greytHR NAVOS' included in every plan.

Keka's two 'Join the waitlist' CTAs and three COMING SOON badges are verified above. greytHR's pricing page lists 'greytHR NAVOS included' in Essential, Growth and Premium — i.e. bundled, not waitlisted. The other vendors' AI claims come from their own marketing pages and none carries a waitlist or beta label. CAVEAT UNCHANGED AND IMPORTANT: none of these was verified inside a product; 'shipped' here means 'presented as available'. Keka may be more honest rather than behind.

Source: https://www.greythr.com/pricing/

### 34. [high] WEAKENED: Keka's customer-count growth narrative does not hold up, because Keka publishes two different counts on live pages today. The prior round's '10,000+ (Oct 2025) → 12,500+ (Sept 2026)' growth reading is not clean evidence.

Live 5 Sep 2026: keka.com/pricing says 'Chosen by 12500+ companies'; keka.com/small-companies says 'Trusted by 12,500+ organizations globally'; but keka.com/signup — reached from the pricing page's own plan CTAs — says 'Trusted by over 10,000+ Organizations' on the same day. The 10,000+ figure is therefore still live, not a superseded 2025 value. For scale comparison, greytHR claims 'Used by 30,000+ companies' and Zimyo '2,500+'. All are unaudited marketing claims.

Source: https://www.keka.com/signup

### 35. [high] CORRECTION: Keka's per-plan 'Free Trial' buttons do not lead to a self-serve trial. All three land on a demo-request page titled 'Sign up for free demo'.

The pricing page's plan CTAs are hrefs to /signup?plan=foundation, ?plan=strength and ?plan=growth with anchor text 'Free Trial' (5 'Free Trial' strings on the page, including hire-pro and hire-advanced). Loading /signup?pricing_package=hrms_payroll_pricing in a browser yields document title 'Sign up for free demo | Keka HR' and a page with no pricing, no plan selection and no seat field. NOTE the plan=foundation/strength/growth slugs are still live today; the prior round attributed them only to the 2024 archive.

Source: https://www.keka.com/signup

### 36. [high] No vendor in this set offers a free tier; all offer time-boxed trials or demos. Verified trial lengths differ from the prior round: Zimyo 14 days (verified), greytHR 7 days (verified), HROne and Pocket HRMS unspecified on their pricing pages, Keka a demo-request form, Qandle 'Free Trial'. ZingHR and Ramco are demo-only.

Zimyo FAQ 'How does the 14 days free trial work?'; greytHR 'Experience 7-day free trial — no commitments, no upfront cost.'; HROne and Pocket HRMS pages contain no '14-day'/'14 day' string at all. Pocket HRMS states explicitly: 'Pocket HRMS offers a free demo to help you understand the platform, features, and pricing structure before making a decision.'

Source: https://www.zimyo.com/pricing/

## PRD changes

- Record the verified dual anchor: withdrawn list card of ₹9,999 / ₹12,999 / ₹15,999 per month for up to 100 employees plus ₹90 / ₹120 / ₹150 per additional employee (Keka's own page, Aug 2024, corroborated in 2026 by both Techjockey and Pocket HRMS's comparison FAQ), AND the live small-business anchor of 'from ₹6,999 per month' / 'starts at ₹90 per employee per month'. State that keka.com/pricing shows no live prices and that the rate card survives in page source only as HTML comments.
  - priority: critical | section: Competitive landscape — Keka
- RETAIN the retraction of 'Keka renewal rates published lower than list'. Keka ToS clause 15 ('Term') states 'Upon any renewal, the recurring fees shall be subject to an increase' and that downgrades may be re-priced 'regardless of prior Term pricing'. Add the hardening story: Keka's Aug 2024 pricing FAQ promised 'no fees and there is no lock-in period'; that FAQ item has been deleted and the current ToS makes fees non-refundable whether or not the platform is used.
  - priority: critical | section: Competitive landscape — Keka
- ADD greytHR to the competitive set — it was missing entirely from the prior round and is the most serious omission in this dimension. Essential ₹2,495/month including 50 employees + ₹45/employee above 50; Growth ₹4,495 + ₹85; Premium custom. It claims 'Used by 30,000+ companies', roughly 2.4x Keka's self-reported 12,500+, and it is the only vendor publishing per-module add-on prices. Any competitive claim written without greytHR in the set is unsafe.
  - priority: critical | section: Competitive landscape — scope
- Keep the revised claim that the band splits at 50 seats, now evidenced at six of six vendors including greytHR. The 50-200 sub-band is over-served by cheap product; the 20-50 sub-band is structurally overcharged by seat floors — at 20 employees effective cost runs ₹122-₹350 per employee per month. This is the real underserved wedge.
  - priority: critical | section: Positioning / differentiation thesis
- Sharpen the 'product that actually files' claim rather than dropping it — the evidence for it is now STRONGER, not weaker. greytHR, India's most compliance-forward SMB vendor, publishes only generation language: 'PF calculations with ECR generation', 'ESI computations and challans', 'One-click Form 24Q generation with automatic FVU validation'. No vendor in the set claims to submit to EPFO/ESIC/TRACES. The differentiator must be filing as an in-product automated submission with a guarantee, versus generate-and-hand-back. Note MYND/Qandle is the one bundle that pairs self-serve HRMS with an outsourced filing operation, but only as an unpriced advisory add-on sold by demo.
  - priority: critical | section: Positioning / differentiation thesis
- Use the corrected table at 50 employees, entry tier, per employee per month: Qandle ₹49.00 (annual) / ₹59.00 (monthly), greytHR ₹49.90, Pocket HRMS ₹59.90 (annual), Zimyo ₹80.00, HROne ₹99.00, Keka ₹139.98 (₹6,999 floor) or ₹199.98 (archived card). Correct the prior claim that Qandle is the floor of the set: greytHR undercuts Qandle on monthly billing (₹2,495 vs ₹2,950); Qandle leads only on annual, by ₹45/month.
  - priority: high | section: Pricing strategy
- Keep 'no seat floor' as the single most defensible structural differentiator — bill actual headcount from employee 1. Every one of the six priced competitors imposes a 50-seat base block (Keka historically 100). This survived adversarial checking against an expanded vendor set.
  - priority: high | section: Pricing strategy
- Add that Keka's price withdrawal is GLOBAL, not an India tactic. The US and UAE pricing pages use the identical comment-suppression mechanism and publish no prices either (withdrawn US card $9/$16/$22 per employee/month; UAE $4/$5/$6 per additional employee). Read this as a company-wide move to a sales-qualified motion, which is itself the opening for a published-price competitor.
  - priority: high | section: Competitive landscape — Keka
- Keep ZingHR and Ramco Systems out of the direct competitive set as 'enterprise adjacency, not competitor'. ZingHR publishes no price, 404s on /pricing, is titled 'Enterprise HCM' and sells by vertical. Ramco publishes no price and added 18 enterprise logos globally in FY26.
  - priority: high | section: Competitive landscape — scope
- Use Ramco's audited FY2025-26 disclosure as a hard calibration point — every figure survived re-extraction from the filing. Global HR & Payroll BU revenue USD 33.93 Mln (Rs. 2,976.15 Mln, +30.8% YoY); ALL-business-unit India revenue only USD 15.16 Mln (Rs. 1,329.96 Mln, 19.0% of consolidated). A tighter bound is available: the standalone Indian entity's India-geography revenue was Rs. 1,127.51 Mln. Flag that Ramco reports a single Ind AS 108 operating segment (note 32), so BU and geography splits are voluntary and not cross-tabulated.
  - priority: high | section: Market sizing — India HR software revenue
- Keep the correction that the leader has not shipped: Keka gates all of Keka AI behind exactly two 'Join the waitlist' CTAs, with Payroll, Performance and Employee engagement all badged COMING SOON. Meanwhile greytHR bundles 'greytHR NAVOS' into every plan and Zimyo/HROne/Pocket HRMS/Qandle market available AI agents. Frame as a narrow, closing window — but label the comparison as claim-posture, not verified capability, since none was tested inside a product.
  - priority: high | section: AI strategy / competitive AI posture
- Match or beat Keka's published AI governance posture, which will become table stakes: source citation on every answer ('No citation means no answer'), no silent writes without explicit human confirmation, multi-entity policy awareness, role-based access on every AI call, and no training of external models on customer data. Keka also advertises a 'Keka MCP Server' for Claude/ChatGPT — treat external-assistant access as an expected feature, not a differentiator.
  - priority: medium | section: AI strategy
- Record the verified same-day contradiction on Keka's own site: keka.com/pricing says 'Yes, a nominal setup fee applies'; keka.com/small-companies says 'no setup fees, surprise add-ons, features locked behind an upsell'. Neither quantifies it. Pocket HRMS confirms an unquantified 'nominal one-time implementation fee' that 'varies based on company size, number of customisations, and complexity of data migration'. HROne alone says no setup fee except possible enterprise implementation cost. Published, quantified, all-in pricing is a credible wedge.
  - priority: medium | section: Competitive landscape — pricing transparency as a wedge
- Add Qandle's verified four-tier card. Monthly: FOUNDATION ₹2,950 + ₹59; REGULAR ₹4,950 + ₹99; PLUS ₹6,200 + ₹124; PREMIUM ₹8,000 + ₹160, all on 'upto 50 employees' blocks, plus quote-based ENTERPRISE for 1000+. Annual: ₹2,450 + ₹49; ₹3,950 + ₹79; ₹4,950 + ₹99; ₹6,450 + ₹129 (advertised 'Save upto 25 %'; actual implied discounts 16.9%-20.2%). Record that the unlabelled ₹50/employee line is the Remote Screen Tracking add-on — NOT managed services, as a prior round guessed.
  - priority: medium | section: Competitive landscape — Qandle
- Replace the prior standing rule with the correct one. Neither raw fetch nor rendering alone is sufficient — they fail in OPPOSITE directions and both are required. Rendering HIDES Keka's rate card (it lives in HTML comments, invisible to a browser); raw fetch HIDES Qandle's rate card (empty spans filled by JS from a country-keyed config file). Best practice, in order: (1) fetch raw HTML and scan comment nodes; (2) render and read; (3) where prices are JS-injected, read the vendor's own pricing config file, which is the strongest source of all; (4) click monthly/annual toggles rather than inferring from DOM order. Also: never quote a competitor's price for a third party — Pocket HRMS misstates greytHR's entry price as ₹3,495 when greytHR publishes ₹2,495.
  - priority: medium | section: Research methodology / evidence standards
- Payroll is in the entry tier for every vendor in the set including greytHR, so it cannot be an upsell in this PRD's packaging either. Competitors gate performance/OKR, recruitment, engagement, advanced analytics and workflow. Note that Keka has commented out 'Direct Salary Payout' from its live FOUNDATION block (it was live in Aug 2024 and already carried '(additional charges applicable)'), alongside three other suppressed feature blocks — evidence that in-product salary disbursement is being repositioned, and a reason to treat payout as a distinct build/partner decision.
  - priority: medium | section: Product scope — entry tier definition
- No vendor offers a free tier. Verified trial lengths: Zimyo 14 days no credit card, greytHR 7 days. HROne and Pocket HRMS publish no trial duration; Keka's per-plan 'Free Trial' buttons actually land on a demo-request form titled 'Sign up for free demo'. A genuine self-serve free tier, or free-below-N-employees, would be structurally unmatched and reinforces the no-seat-floor wedge.
  - priority: low | section: Go-to-market — trial design

## Open questions

- What employee block does Keka's live ₹6,999/month floor buy? I attempted this directly: the small-companies page contains zero instances of 'minimum'/'up to', and all three plan CTAs (/signup?plan=foundation|strength|growth) redirect to a demo-request form with no pricing, no plan selector and no seat field. ₹6,999 ÷ ₹90 = 77.8, matching no round number. Only a sales quote will settle it.
- Exactly when between Sept 2024 and Oct 2025 did Keka comment out its prices? Still bracketed, not pinned. Now worth reframing: since the suppression is simultaneous across India, US and UAE, the change was a single global release, so one resolvable snapshot on any locale would date it.
- What is Keka's actual setup/implementation fee in rupees? Confirmed to exist as policy on /pricing and explicitly denied on /small-companies, with no figure published anywhere reachable.
- THE LOAD-BEARING UNKNOWN, now sharper: does ANY India HRMS actually submit statutory returns, or do all stop at generating the ECR/FVU/challan for the customer to upload? Published evidence now points strongly at generate-and-hand-back across the whole set, including greytHR, whose language is unusually explicit. Settling it definitively still requires product documentation or a trial account — and it is worth doing, because the answer determines whether the PRD's core differentiator exists.
- What does greytHR's 'FLEXIBLE START' single-module motion cost, and does it break the 50-seat floor? It is the only published hint of sub-suite, potentially sub-floor pricing in the set, and it is gated behind 'Talk to Sales Team'.
- Are the mid-market vendors' AI agents genuinely generally available, or is 'shipped' marketing framing? Unresolved and unchanged — all claims come from marketing pages. greytHR's 'NAVOS included' in every published plan tier is the strongest available evidence that anyone has actually shipped, since it is a packaging commitment rather than a claim.
- What are Keka's current Hiring and PSA module prices? The Aug 2024 archive gives Hiring PRO ₹1,500/recruiter/month and ADVANCED ₹2,500/recruiter/month; those tabs now show no prices and the PSA CTAs read 'Talk to us'. For reference, greytHR publishes Recruit at ₹2,500/recruiter/month today.
- How much of Ramco's USD 33.93 Mln HR & Payroll revenue is India versus offshore? Not derivable from the filing — single Ind AS 108 operating segment, no cross-tabulation of BU against geography. Bounded above by USD 15.16 Mln (consolidated India, all BUs) or Rs. 1,127.51 Mln (standalone India geography).
- Does Keka's ₹90/employee/month small-business rate coexist with the block model or replace it? The withdrawn card was block-plus-overage (₹9,999 + ₹90); the withdrawn US card was pure per-employee ($9). Keka may be migrating India to per-employee pricing, which would change the competitive comparison materially.

## Retracted

- Qandle's raw HTML contains literal template placeholders '__/mo' and '__ /mo per employee' — REFUTED as quoted evidence. The string '__' appears zero times in the page. The real mechanism is empty spans ('<span class="value countryPriceFouYearGreater"></span>') populated by JavaScript from a country-keyed config. The METHOD conclusion (raw fetch alone misses Qandle's prices) survives; the verbatim evidence offered for it was fabricated and must not be reused.
- Qandle's unlabelled '₹50/mo per employee' line is 'likely the MYND-backed managed-services or à-la-carte rate' — REFUTED. It is the Remote Screen Tracking module (config keys countryPriceRemoteST_monthly/_yearly; DOM section header 'Remote Screen Tracking'). It is a feature-comparison row, not a separate product offer.
- 'Qandle is the price floor of the entire set' — REFUTED once greytHR is included. greytHR Essential at ₹2,495/month undercuts Qandle's ₹2,950 monthly; Qandle holds the floor only on annual billing (₹2,450), by ₹45/month.
- The competitive set for the 20-200 band is complete — REFUTED. greytHR, which claims 30,000+ customers and publishes a full rate card plus per-module add-on prices, was omitted entirely across all prior rounds. Its omission distorted the price-floor claim and left the strongest available evidence on statutory filing unexamined.
- HROne and Pocket HRMS offer '14-day free trials' — UNSUPPORTED. Neither page contains '14-day' or '14 day' anywhere. Only Zimyo's 14-day trial is verified; greytHR's is 7 days. Keka's 'Free Trial' CTAs land on a demo-request form, not a trial.
- 'Keka's locale-switcher hrefs are JS-driven and were not captured, so price suppression could not be tested outside India' — REFUTED. The hrefs are plain anchors in the raw HTML. The test was run: suppression is global (US and UAE pricing pages both carry commented-out cards and zero live prices).
- 'keka.com is unreachable to non-browser fetching because of a TLS error' — REFUTED as a property of the site. Plain curl retrieves every Keka page at HTTP 200. This was a WebFetch-specific failure, and the framing that a rendering browser was 'the decisive move' is backwards for the central finding, since rendering cannot see commented-out prices at all.
- Keka's growth from '10,000+' to '12,500+ organizations' evidences customer growth — WEAKENED to unusable. Keka publishes BOTH figures on live pages on the same day (12,500+ on /pricing and /small-companies, 10,000+ on /signup). The counts are inconsistent marketing claims, not a time series.
- Any specific rupee figure for Keka's setup fee, and any '~15% annual billing saving' for Keka — REMAIN UNSUPPORTED. Both pages contradict each other on whether a setup fee exists and neither quantifies it. Figures circulating on competitor and affiliate SEO blogs (e.g. a '₹25,000-₹75,000 one-time onboarding' range) trace to no primary source and must not be used.
- Qandle's unrendered config values must not be quoted as published prices — a new caution. The config file contains module values (ShiftPlanner/Timesheet/FieldForceTracking all '0.8') and an unused string 'or INR 3000 pm whichever is higher' that never render on the page. The prior round's claim that add-on prices are unpublished is CORRECT and should stand; do not 'upgrade' it with these config values.
- Ramco's 'around 20 country go-lives per quarter' as a point figure — SOFTENED. The same annual report states '15-20 country go-lives' in two other places. Quote the range. Likewise the '~3,900 employees per new logo' arithmetic is an upper bound only, since the 70,000 explicitly includes expansion of existing accounts.
