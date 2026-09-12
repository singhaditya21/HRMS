# [r2] recruiting-and-the-candidate-graph

## Verification notes

METHOD: I re-downloaded the Info Edge Q1FY27 presentation myself (HTTP 200, 2,348,886 bytes, 38pp) rather than trust the prior extraction, re-extracted with pdftotext -layout, and checked every attributed figure line-by-line. I re-fetched Zwayam, Manatal, Ceipal, LinkedIn RSC, LinkedIn about-us, Naukri Freshdesk, the Apify actor and jobspipe.dev. Where WebFetch timed out or 403'd I retried with curl and a browser user agent, which succeeded on five pages the prior round recorded as unreachable.

WHAT SURVIVED: every Info Edge figure, exactly. The full 13-quarter resume series (91 to 118), 859k/25k/997k daily metrics, the FY24-Q1FY27 freshness series, billings 23,743mn/5,527mn, revenue 22,559mn/6,118mn, PBT 12,772mn/3,564mn, 58.3% and +576bps, 60.8% ex-Job Hai, 146k customers and Rs 146k realization with the full FY22-26 series, deferred revenue 12,259mn/11,450mn, AI-Rex 4,000+/400+/3.7x, Talent Pulse 600+, PremiumX 1,800+, the B2C block, and subsidiary note 5 verbatim. The Q1FY27 sector-growth figures are verbatim from slide 9. All external quotes verified verbatim, including the Freshdesk folder counts (8/21/16/4/49/2) and the Apify actor's $24.00/1,000 CVs and 85 users/5 monthly. Arithmetic recomputed and correct throughout: 9.0M resumes/yr, 0.73% touched daily, +69% freshness, 56.6% margin, 250bps Job Hai dilution, 570-553=17cr. The central thesis is correct and I added a fourth corroboration (Keka).

WHAT I CHANGED. Three substantive errors: (1) the "recruitment consultants are the largest buyer type" claim is false on the report's own data — they rank third of four; this drove a beachhead recommendation, now redirected to GCCs at 31% growth; (2) the report missed that Zwayam+DoSelect are loss-making — derived from the incl/excl disclosure, ~Rs 17cr quarterly revenue at roughly -Rs 3.5cr PBT, robust across the rounding band, which materially softens the "Info Edge already won every layer" framing; (3) the report conflated 118M total resumes with the sellable Resdex index, which Naukri's own FAQ sizes at "over 50 million". I also fixed a margin-denominator conflation, an overstated Apify requirement, and an internal contradiction in the pricing advice — the prior draft simultaneously said "price against a credit pack" and "price as an HRMS uplift"; Keka's published Rs 90/120/150 per-employee-per-month tiers settle it in favour of the latter.

RESOLVED OPEN QUESTIONS (seven): the Naukri ATS-integration page is a 2015 image stub; Naukri Talent Cloud is a bundling/SSO layer with explicitly unchanged pricing and per-property Resdex; the DPDP Act contains no Article 22 equivalent (verified against the gazette text — "automated" appears three times, all definitional); DPDP s.3(c)(ii) verified verbatim; the Eightfold case is real, January 2026, FCRA-based; foundit is alive across nine markets; Keka pricing retrieved.

RETRACTED: the Axios citation (network-blocked, unverifiable), and the Sense/India claim (invalid absence-of-evidence inference).

HOW MUCH TO TRUST THIS: the Info Edge spine is filing-grade and I would build on it without further checking. The access finding — inbound posting open, outbound Resdex closed — is now quadruple-sourced and safe to plan against, with the caveat that the exclusivity claim is the incumbent's own marketing and deserves one BD conversation before roadmap freeze. The DPDP conclusions are verified against the bare statute and are the most improved part of the report, but I am not a lawyer. Treat all vendor scale claims (apna, Talview, InCruiter, HackerRank/HackerEarth/iMocha) as positioning, not fact. The Zwayam loss-making figure is my own derivation, sound but bundling DoSelect. Resdex pricing, TurboHire and LinkedIn's India member count remain genuinely unknown after real attempts — do not let anyone fill those with estimates.

## Key findings (26)

### 1. [high] Naukri held 118 million resumes as of 30 June 2026, up from 91M at Q1FY24 — ~9M net adds per year. VERIFIED against the filing, but this is the investor-relations 'resumes on Naukri' metric and must NOT be read as the size of the sellable searchable database (see next finding).

Info Edge Q1FY27 data sheet, 'Number of resumes on Naukri (in millions)', full 13-quarter series re-extracted by me: Q1FY27 118, Q4FY26 115, Q3FY26 113, Q2FY26 111, Q1FY26 108, Q4FY25 106, Q3FY25 104, Q2FY25 103, Q1FY25 100, Q4FY24 98, Q3FY24 96, Q2FY24 94, Q1FY24 91. Slide 10: '118 Mn Resume Database', note 1 'As of June 30, 2026'. (118-91)/3 = 9.0M/yr.

Source: https://www.infoedge.in/pdfs/corporatePresentations_pdfs/Info-Edge-Aug26-Presentation.pdf

### 2. [medium] CORRECTION the original report missed: Resdex — the database recruiters actually buy — is described by Naukri's OWN recruiter FAQ as 'over 50 million profiles', not 118M. The report conflated total registered resumes with the searchable/sellable index. The moat is real but roughly half the advertised size.

recruiterfaq.naukri.com (Naukri-primary, retrieved by me via curl, HTTP 200): 'Resdex is the largest database of Jobseekers in India – with over 50 million profiles from various industries, functions, locations and experience levels.' Appears twice on the page. The 118M figure appears only in investor materials under the label 'Number of resumes on Naukri'. The two metrics count different things; the FAQ figure is undated and stated as a floor ('over'), so treat 50M as a lower bound, not a precise current count.

Source: https://recruiterfaq.naukri.com/category/resdex-database/how-to-use-resdex-basic-features/

### 3. [high] Freshness, not size, is the compounding metric: profiles-modified-daily grew +69% in three years while resumes-added-daily stayed flat. Only ~0.73% of the 118M profiles are touched on any given day.

Q1FY27: 859k profiles modified daily, 25k resumes added daily, 997k average resume searches daily (slide 10). Modified-daily: FY24 509k, FY25 585k, FY26 713k, Q1FY27 859k (859/509 = +69%). Added-daily flat: FY24 24k, FY25 22k, FY26 23k. 859k/118M = 0.73%. All re-verified. Caveat: 'profiles modified daily' is as much a measure of jobseeker churn in a hot labour market as of vendor-created freshness — the causal framing is editorial, the numbers are filing-grade.

Source: https://www.infoedge.in/pdfs/corporatePresentations_pdfs/Info-Edge-Aug26-Presentation.pdf

### 4. [high] Resdex search inside an ATS is available only through Info Edge's own ATS. Zwayam markets this as an exclusive. This is the single load-bearing access finding and it verified verbatim.

zwayam.com/zwayam-hire, re-fetched: 'The only platform with in-built Naukri RESDEX', plus 'Search profiles on RESDEX inside Zwayam', 'Search, filter, and engage with candidates - directly within Zwayam', 'Move profiles to hiring pipeline in 1-click', 'Trusted by 350+ Enterprises'. Zwayam is 100% Info Edge per Q1FY27 deck note 5 (verbatim): 'Aisle, Zwayam and DoSelect are 100% wholly-owned subsidiaries and are part of our operating business.' IMPORTANT EPISTEMIC LIMIT: this is a self-serving marketing claim by the incumbent's own subsidiary, not a Naukri statement of licensing terms. It is strong evidence, not proof, that no third party can license Resdex.

Source: https://www.zwayam.com/zwayam-hire

### 5. [high] What a third-party ATS gets from Naukri is job posting plus application sync against the CUSTOMER's own Naukri contract — never database search. Now corroborated across FOUR independent vendors, including one the original report left blank.

Manatal (re-fetched): posts job ads from Manatal to Naukri via its 'My Own Contracts' feature, 'allowing organizations to utilize their existing job posting agreements with Naukri'; no Resdex/database mention. Ceipal (re-fetched): 'post your job once and have it seen by thousands', real-time application alerts into the ATS; no Resdex mention. NEW — Keka (keka.com/pricing, which I retrieved successfully at HTTP 200 after the prior round recorded a TLS failure): 'Integrate with leading job boards, such as LinkedIn, Naukri, and more, to publish jobs across multiple platforms with a single click.' Publishing only. Keka is the closest structural comparable to the product being scoped (India HRMS with a hiring module), which makes it the most informative of the four.

Source: https://www.keka.com/pricing

### 6. [high] Naukri publishes no developer API, no self-serve key and no partner documentation. Its own 100-article recruiter support corpus contains no API, integration or developer folder.

naukricom.freshdesk.com/support/solutions/161086, re-fetched: exactly six folders with exactly the counts the report claimed — Account Management (8), Resume Database RESDEX (21), Job Posting (16), Browse Resumes (4), Response Management Tool eApps (49), Firewall Settings (2). No API, developer, ATS-integration or partner folder. The Resdex FAQ corpus likewise contains zero occurrences of 'API' or 'integration'. Secondary: jobspipe.dev (verified real, by Dvir Atias, founder of JobsPipe, dated 31 July 2026): 'Naukri does not offer a public API. There is no page where a developer can register, get a key and query job postings.' Note two limits on that source — it is a commercial job-data vendor with an interest in the framing, and its claim is scoped to job POSTINGS, not to Resdex.

Source: https://naukricom.freshdesk.com/support/solutions/161086

### 7. [high] RESOLVED OPEN QUESTION — the report treated recruiterzone.naukri.com/ats-integration/ as a real page whose terms were unknown after four failed fetches. I retrieved it. It is a 2015 WordPress image-attachment stub, not a partner page. It commits to nothing.

Retrieved via curl, HTTP 200, 35,074 bytes. Full page content: title 'ATS integration | Recruiter Zone', heading 'ATS integration', date 'March 8, 2015', the line 'Full resolution (225 × 225)', and a 'Leave a Reply' comment form. It is the attachment page for a 225x225 pixel image posted in 2015. The surrounding blog's category list is Career Site Manager / Career Tool / eApps - Response Manager / How to use Naukri / Job Posting — no API or integration category. This strengthens rather than weakens the no-public-integration-program conclusion.

Source: https://recruiterzone.naukri.com/ats-integration/

### 8. [high] MATERIAL CORRECTION — the report's claim that recruitment consultants are 'the single largest buyer type' at 26.4% is FALSE on the report's own evidence. They rank third of four categories in FY26 and third in Q1FY27.

Info Edge FY26 billing distribution, Recruitment India B2B: Other Sectors 29.2% > Tech/IT Services/BPM 27.1% > Recruitment Consultants 26.4% > GCCs 17.3%. Q1FY27: Other 27.6% > Tech 25.3% > Recruitment Consultants 23.7% > GCCs 23.4%. The deck also states the true concentration: 'Direct contribution from IT Services (incl. IT services and GCC IT Services companies) is ~25%' and 'Overall contribution from IT Services incl. Direct and through Consultants on a pro-rata basis would be 30-35%.' IT services, not staffing, is the dominant end-buyer. The error was repeated three times in the original (key finding, opportunities, implications).

Source: https://www.infoedge.in/pdfs/corporatePresentations_pdfs/Info-Edge-Aug26-Presentation.pdf

### 9. [high] MATERIAL FINDING THE REPORT MISSED — Zwayam and DoSelect are sub-scale and LOSS-MAKING. Together they contribute ~Rs 17cr of quarterly revenue (~3% of recruitment) at roughly -Rs 3.5cr PBT. Info Edge has integrated forward in product terms but has not monetised the ATS layer at all.

Derived from two disclosures on Q1FY27 slide 9. Recruitment excluding Zwayam/DoSelect: revenue Rs 611.8cr (6,118mn), operating PBT Rs 356.4cr (3,564mn), margin 58.3%. Recruitment INCLUDING them: 'billings of Rs 570cr, revenue of Rs 629cr and operating PBT margins of 56.1%'. So implied PBT including = 629 x 0.561 = Rs 352.9cr. Delta revenue = 629 - 611.8 = Rs 17.2cr; delta PBT = 352.9 - 356.4 = -Rs 3.5cr. Sensitivity across the rounding band (56.05-56.15% on revenue 628.5-629.5) gives delta PBT of -Rs 3.2cr to -Rs 3.9cr — robustly negative. Billings delta corroborates: 570 - 553 = Rs 17cr. Annualised, Zwayam+DoSelect are roughly Rs 69cr revenue at about -20% margin.

Source: https://www.infoedge.in/pdfs/corporatePresentations_pdfs/Info-Edge-Aug26-Presentation.pdf

### 10. [high] Info Edge has nonetheless built out every recruiting layer in product terms — ATS, assessments, agentic sourcing, voice screening, talent intelligence, passive discovery and candidate-side AI. All product metrics verified exactly.

Q1FY27 deck: AI-Rex (multi-agent sourcing, reach-out agent over WhatsApp/mailers/notifications/app, on-product screening agent, learning agent) shows '4,000+ Enterprise Customers Onboarded', '400+ Paid Clients', '3.7x Increase in hiring mandate between Feb and June 2026' (note: as of June 2026), and 'Sourcing & screening time reduced from 10-15 days → Few hours'. Slide 9 adds: 'AI-Rex paid customers grew to 400+, while Talent Pulse paid customers grew to 600+.' Talent Pulse: 600+ paid customers (salary intelligence at 7 levels of granularity, talent planning, competitor benchmarking). PremiumX: '1,800+ Enterprise Customers Using PremiumX', note 'for the month of June 2026'. Naukri 360 + Naukri FastForward: 294k paid users. Read alongside the previous finding: the reach is real, the revenue is not.

Source: https://www.infoedge.in/pdfs/corporatePresentations_pdfs/Info-Edge-Aug26-Presentation.pdf

### 11. [high] RESOLVED OPEN QUESTION — Naukri Talent Cloud is a bundling and single-sign-on layer over Info Edge's properties, explicitly with NO pricing change. Critically, 'Resdex' is not one database: Naukri, iimjobs and hirist each have a separate Resdex requiring a separate subscription.

recruiterzone.naukri.com (Naukri-primary, retrieved by me): Talent Cloud 'brings powerful recruitment products like Naukri, iimjobs, hirist, Ambition Box, DoSelect, Naukri expert assist, Zwayam, Naukri Campus, and Employer Branding Edge under one umbrella.' Features: SSO across subscribed platforms; one-click job posting Naukri to iimjobs/hirist; 'Cross-platform talent discovery from Naukri Resdex to iimjobs / hirist Resdex' where 'You'll need access to the iimjobs/hirist database to view these profiles'; DoSelect assessments dispatched from the Naukri Response Manager. On pricing, verbatim: 'The pricing of individual platforms will continue to apply. There is no change in the pricing structure due to Naukri Talent Cloud.' And: 'you can subscribe to individual talent solutions'. This also corroborates that eApps/Response Manager is the incumbent's built-in ATS-substitute layer.

Source: https://recruiterzone.naukri.com/introducing-naukri-talent-cloud-one-stop-solution-talent-decoded/

### 12. [high] The economics being defended: the recruitment segment earns a 56.6% pre-tax margin ON REVENUE. The original report's phrasing '~57% pre-tax margin on ~Rs 2,374cr of annual billings' mixes the denominators — on billings the margin is 53.8%.

Info Edge FY26: Recruitment billings Rs 23,743mn, revenue Rs 22,559mn, segment PBT Rs 12,772mn. 12,772/22,559 = 56.6% (on revenue); 12,772/23,743 = 53.8% (on billings). Q1FY27: billings Rs 5,527mn (+17.5% YoY, from Rs 4,703mn), revenue Rs 6,118mn, operating PBT Rs 3,564mn, margin 58.3%, +576bps YoY — all confirmed on slide 9 as Rs 553cr / Rs 612cr / Rs 356cr / 58.3% / 576Bps. Recruitment standalone excluding Job Hai at 60.8%, implying ~250bps of Job Hai dilution (arithmetic correct, and the deck itself attributes the gap to Job Hai).

Source: https://www.infoedge.in/pdfs/corporatePresentations_pdfs/Info-Edge-Aug26-Presentation.pdf

### 13. [high] Indian employers commit ~Rs 1.46 lakh/year to Naukri on average, prepaid, and that figure is FALLING as Naukri goes down-market — which is Info Edge's own stated explanation, not an inference.

Info Edge slide 17, 'Recruitment India B2B business': billed customers FY22 100k, FY23 113k, FY24 116k, FY25 128k, FY26 146k; average realization per customer FY22 Rs 130k, FY23 152k, FY24 149k, FY25 152k, FY26 146k. Deck's own caption, verbatim: 'Customer growth of ~14% was driven by deeper Tier-2/3 penetration and higher SMB client additions, resulting in marginally lower average realization.' Note 425 confirms scope: 'The above figures are for Recruitment India B2B business. Realization is calculated based on billings within the respective period' — so this is a subset of the Rs 23,743mn total (146k x Rs 146k = Rs 21,316mn; the balance is NaukriGulf, Job Hai and other). Deferred sales revenue for Recruitment: Rs 12,259mn at FY26 end, Rs 11,450mn at Q1FY27.

Source: https://www.infoedge.in/pdfs/corporatePresentations_pdfs/Info-Edge-Aug26-Presentation.pdf

### 14. [high] GCCs are the fastest-growing buyer segment at 31% YoY while recruitment consultants have stalled at 1% — the clearest segment signal in the filing.

Info Edge Q1FY27 slide 9, verbatim: 'Sector growth YoY: Tech, IT, & BPM: 15%, Recruitment Consultants: 1%, Other Sectors: 12%, GCCs 31%.' GCC share of billings jumped from 16.7% in Q1FY26 to 23.4% in Q1FY27, the single largest mix shift in the series. GCC sub-split for FY26: GCC-IT Services 6.5%, GCC-Others 6.5%, GCC-Tech 3.0%, GCC-BPM 1.3%.

Source: https://www.infoedge.in/pdfs/corporatePresentations_pdfs/Info-Edge-Aug26-Presentation.pdf

### 15. [high] Info Edge is monetising the candidate side hard, closing the flanking route of bootstrapping a rival graph from jobseekers.

Q1FY27 slide 9 verbatim: 'Candidate Services Business (B2C) billings grew 35%, with paid conversion improving from 1.2% to 2.6% and online mix increasing from 27% to 54% in last 18 months. The business also operated at a healthy PBT margin of 63%.' Slide 15 (note: 'for the month of June 2026'): 2.7 Lac AI-powered resumes downloaded monthly, 1.3 Lac AI-powered mock interviews completed monthly, 2.6% paid penetration, 54% online mix. Products named: Agent Neo ('Agentic AI-led job discovery with real-time alerts and optional auto-apply'), Naukri 360 resume builder and mock interviews, Naukri TopTier, Naukri Minis.

Source: https://www.infoedge.in/pdfs/corporatePresentations_pdfs/Info-Edge-Aug26-Presentation.pdf

### 16. [high] LinkedIn is the opposite regime and the one large passive graph a new entrant can legitimately reach: documented, versioned, certifiable partner APIs — gated on partner approval, a signed data-restriction agreement, and the customer holding a Recruiter licence. Every quote verified.

Microsoft Learn LTS docs, RSC page (ms.date and updated_at both 2026-04-01, defaultMoniker li-lts-2026-04). Verbatim: 'The use of these APIs is restricted to those developers approved by LinkedIn. Please reach out to your LinkedIn Relationship Manager or Business Development contact as you will need to meet certain criteria and sign an API agreement with data restrictions in order to use this integration.' Non-partners 'complete the LinkedIn Talent Solutions Partner Request Form' (business.linkedin.com/talent-solutions/ats-partners/partner-application). Sequencing constraint verbatim: 'Before developing with RSC, you need to develop an application with Job Posting first.' Five named Development Modules; a Certification section with per-module test cases 'demoed in your certification meetings'; Postman collections and sample apps. Profile data enters the ATS by recruiter-initiated One-Click Export, not bulk search. NEW detail: RSC is built on LinkedIn's 'Middleware Platform', and a public business page lists which ATS partners are already supported.

Source: https://learn.microsoft.com/en-us/linkedin/talent/recruiter-system-connect

### 17. [high] LinkedIn's disclosed scale sets the ceiling on the alternative graph, but no India member count is published.

news.linkedin.com/about-us, re-fetched: '1.3B Members'; Asia Pacific 410M+ (region described as spanning 'India, China, and Japan through Southeast Asia and Oceania'); EMEA 430M+; North America 290M+; South & Central America 226M+ (the report omitted this one); '$19.8B Annual revenue', 12% YoY growth (10% in constant currency), Q4 FY26. No India-specific member count anywhere on the page; news.linkedin.com/about-us/statistics returns HTTP 404. India remains unquantified.

Source: https://news.linkedin.com/about-us

### 18. [medium] The only working technical route into Resdex for a non-partner is session-replay scraping off a live seat — ToS-risky, minuscule, and not a product foundation. One detail in the original was overstated.

Apify actor 'Naukri Resdex CV Scraper', re-fetched: priced 'from $24.00 / 1,000 cvs'; '85 total users, 5 monthly users'; '100.0% runs succeeded'. CORRECTION: the listing states the requirement as an 'Active Resdex session' — it does not say 'an active, paid Naukri Resdex subscription' as the original report asserted. The mechanism is copying an authenticated request out of the browser, not an API. 5 monthly active users is the operative number: this is not a market, and it converts a data gap into legal exposure.

Source: https://apify.com/accomplished_bongo/naukri-resdex-cv-scraper-scrape-upto-50k-candidates

### 19. [high] RESOLVED OPEN QUESTION, AND THE REPORT'S RETRACTION WAS RIGHT — the DPDP Act 2023 contains NO GDPR Article 22 equivalent. There is no automated-decision, profiling, explanation or human-review right anywhere in the Act or the 2025 Rules. The vendor-blog claim about 'Section 8' was fabricated.

I downloaded the DPDP Act 2023 gazette text (egazette.gov.in/WriteReadData/2023/248045.pdf, identical file also served from meity.gov.in) and searched it. The word 'automated' appears exactly three times, all definitional: s.2(b) ''automated' means any digital process capable of operating automatically'; the phrase 'human beings or by automated means'; and s.2(x) ''processing' ... means a wholly or partly automated operation'. Zero occurrences of 'profiling', 'human review', 'logic involved' or 'solely'. Section 8 is headed 'General obligations of Data Fiduciary' and imposes no automated-decision explanation duty. I separately searched the notified DPDP Rules 2025 (G.S.R. 846(E), Gazette No. 760, 13 November 2025): zero occurrences of any of those terms in the English text.

Source: https://egazette.gov.in/WriteReadData/2023/248045.pdf

### 20. [high] NEW AND PRD-RELEVANT — most substantive DPDP Rules obligations do not commence until roughly May 2027, which sets the real compliance runway.

DPDP Rules 2025, rule 1, verbatim: 'Rules 1, 2 and 17 to 21 shall come into force on the date of their publication in the Official Gazette. Rule 4 shall come into force one year after the date of publication of this Gazette.' and rules 3, 5 to 16, 22 and 23 come into force eighteen months after publication. Published 13 November 2025, so: rule 4 from ~13 Nov 2026, and the substantive body (consent notice, security safeguards, breach handling, retention/erasure) from ~13 May 2027. The Rules also impose a minimum one-year retention of personal data and processing logs for purposes specified in the Seventh Schedule, which cuts AGAINST aggressive candidate-data deletion.

Source: https://egazette.gov.in/WriteReadData/2023/248045.pdf

### 21. [medium] RESOLVED OPEN QUESTION — DPDP s.3(c)(ii) does exempt publicly-available personal data, but on its face it will NOT cover resumes sitting behind Naukri's paywall. Verified verbatim; the application is a question for counsel.

DPDP Act 2023, s.3(c), verbatim: the Act shall 'not apply to— (i) personal data processed by an individual for any personal or domestic purpose; and (ii) personal data that is made or caused to be made publicly available by— (A) the Data Principal to whom such personal data relates; or (B) any other person who is under an obligation under any law for the time being in force in India to make such personal data publicly available.' Illustration: 'X, an individual, while blogging her views, has publicly made available her personal data on social media. In such case, the provisions of this Act shall not apply.' A resume uploaded to Naukri is disclosed to Naukri under its terms and shown only to paying recruiters — not 'made publicly available' by the Data Principal. A fully public web profile is the closer case. I am not a lawyer and this reading is not advice.

Source: https://egazette.gov.in/WriteReadData/2023/248045.pdf

### 22. [medium] RESOLVED AND CORRECTED OPEN QUESTION — the Eightfold lawsuit is real, but it is January 2026 (not '~Oct 2025'), and the legal theory is consumer-reporting law (FCRA), not scraping. This is the most directly relevant live precedent for AI candidate scoring and the report under-weighted it.

HR Dive, 'Eightfold AI sued for alleged covert candidate ranking': a proposed class action filed in the State Superior Court of California alleging Eightfold's software 'collected personal information from unverified third-party sources, such as social media profiles, location data, internet and device activity, cookies and others' and ranked candidates on 'likelihood of success'. The claim is that these AI-generated evaluations are consumer reports and 'failed to comply with rules for consumer reports set out in the Fair Credit Reporting Act and state law. This includes disclosure of a report being created, access to the report and the ability to dispute the report.' Complaint quote: 'There is no AI-exemption to these laws.' Jenny Yang (Outten & Golden partner, former EEOC Chair) is quoted for plaintiffs. Reported as Kistler et al. v. Eightfold AI Inc., filed 20 January 2026 in Contra Costa County Superior Court, and covered by Jones Walker, Epstein Becker Green, Amundsen Davis, CDF Labor Law and the National Law Review. Eightfold denies scraping, stating its platform 'operates on data submitted by candidates to our customers or provided by our customers'. The case name/date/county come from secondary coverage rather than a docket I read; the legal theory and allegations are confirmed in trade press.

Source: https://www.hrdive.com/news/eightfold-ai-lawsuit-job-candidate-consumer-reports/810332/

### 23. [medium] RESOLVED OPEN QUESTION — foundit is unambiguously operating. The retracted bankruptcy claim is definitively wrong. But its scale claims remain unverified and its footprint is 9 markets, not the 18 the report repeated.

foundit.in/employer retrieved at HTTP 200 (curl with browser UA; the prior round's 403 was a UA block). Live site, footer '© 2026 foundit | All rights Reserved', employer navigation includes 'Job Posting', 'Access Resume Database', 'Join mRecruiters', 'Buy Online'; contacts info@foundit.in, +91 80 6985 7811, toll-free 1800-419-6666. Country selector lists exactly nine markets: India, Gulf, Hong Kong, Singapore, Philippines, Thailand, Malaysia, Indonesia, Vietnam. No database size, revenue or customer count is published; the '70M jobseekers across 18 countries' figure the report carried came from Tracxn and I could not corroborate it.

Source: https://www.foundit.in/employer

### 24. [high] RESOLVED OPEN QUESTION — Keka, the closest structural comparable, publishes real per-employee-per-month pricing. This, not Naukri's credit packs, is the pricing benchmark for an HRMS recruiting module.

keka.com/pricing retrieved at HTTP 200 (the prior round recorded a TLS verification failure twice; it resolves fine with a browser UA). India pricing, three tiers, all quoted 'per additional employee': FOUNDATION Rs 90, STRENGTH Rs 120, GROWTH Rs 150. A region toggle offers India / USA & European Union / Asia Pacific & GCC countries. The hiring module bundles ATS, preboarding, hiring analytics, job-board publishing (LinkedIn, Naukri), and third-party assessment integrations named as 'Mettl Mercer and HackerEarth'.

Source: https://www.keka.com/pricing

### 25. [medium] Blue/grey-collar is a genuinely separate, unconcentrated graph. apna's claims verified as claims; Info Edge's own blue-collar bet dilutes margin.

apna.co homepage, re-fetched, verbatim: 'Discover 50 lakh+ career opportunities'; 'Trusted by 1000+ enterprises and 7 lakh+ MSMEs for hiring'; 'Join the community of 5 crore satisfied job seekers'; 'Find the best candidate from 5 crore+ active job seekers!'. These are unaudited vendor marketing figures with no filing-grade corroboration and should be treated as order-of-magnitude only. No API or ATS integration is mentioned anywhere on the site. Info Edge Q1FY27: 'Recruitment business standalone (excluding Job Hai) continued its high-margin trajectory at 60.8%' versus 58.3% including it — ~250bps of dilution.

Source: https://apna.co/

### 26. [medium] AI interviewing is commoditised, but the evidence is vendor marketing throughout and should be read as positioning, not verified deployment.

Talview homepage re-fetched and its stat block confirmed: '20M+ Candidates Assessed and Proctored', '250K+ Happy Recruiters and Exam Administrators', plus a 'Countries Reached' tile whose number is JS-rendered; products Alvy (AI Proctor, 'World's First Patented Agentic AI Proctoring') and Ivy (AI Interviewer). Naukri's AI-Rex voice screening agent is the only filing-grade datapoint in this set (4,000+ enterprises onboarded, 400+ paid). Zwayam markets 'AI-led first interview and structured feedback summaries' across '350+ Enterprises'. InCruiter and Hyreo market comparable stacks. CAVEATS: every non-Info-Edge number here is an unaudited homepage claim; customer logos are company-level and do not establish use of the AI-interview SKU; and contrary to the original report, Talview does publish a 'Pricing' nav item, so 'none publish pricing' is not established.

Source: https://www.talview.com/

## Implications

- ANSWER TO THE DIRECT QUESTION: Yes, a new entrant can build a recruiting module that sources candidates in India — but inbound only. Passive-database sourcing IS a moat and Info Edge owns it. The strongest evidence remains Info Edge's own: Zwayam, its wholly-owned ATS, advertises 'The only platform with in-built Naukri RESDEX'. Treat that as a well-supported working assumption rather than proven fact — it is the incumbent's own marketing, not a Naukri statement of licensing terms — but plan as if Resdex search will never be available to you, and let nothing in the roadmap depend on it.
- Right-size the moat you are conceding. Naukri's 118M is an investor metric for total resumes on the platform; Naukri's own recruiter FAQ describes Resdex, the product recruiters actually buy, as 'over 50 million profiles'. Do not quote 118M internally as the thing you must replicate — the sellable index is roughly half that, and the real defensibility is freshness (859k profiles modified daily, up 69% in three years) rather than raw count.
- Ship 'bring your own job-board contract' as table stakes in v1: multi-post to Naukri, LinkedIn, foundit, apna and Indeed from one requisition, with application ingest and dedup. Four independent vendors confirm this pattern works with no data licence — and Keka, the closest comparable, already ships it. Do NOT market it as 'Naukri integration' in language implying database access.
- Do not scope a Naukri integration as an engineering ticket. There is no public API, no developer portal and no self-serve key; Naukri's own 100-article recruiter corpus has six folders and none is about APIs or integration; and the URL that looks like an ATS-integration page (recruiterzone.naukri.com/ats-integration/) is a 2015 WordPress image-attachment stub that commits to nothing. Route it through BD as a commercial negotiation, budget calendar-quarters, and ship something valuable with zero Naukri connectivity in the meantime.
- Do the LinkedIn partner integration properly and early — it is the one large passive graph with a documented, certifiable path. Respect the sequencing: RSC requires the Job Posting API first, everything now runs on the Middleware Platform, and the customer must hold Recruiter Corporate or RPS. Budget for partner approval, a signed data-restriction agreement and formal certification demos, not just code. Note the payoff is recruiter-initiated One-Click Export, not bulk search.
- Explicitly forbid scraping in architecture and in sales collateral. The only working Resdex extraction piggybacks a live authenticated session (Apify actor, $24/1,000 CVs) and has 5 monthly active users — it is not a market, it is legal exposure for you and your customer. The Eightfold class action shows how fast an aggregation story becomes litigation.
- Make the employer's OWN candidate graph the product's core object, not a byproduct. Applicant history, silver medallists, referrals, alumni, agency submissions and internal-mobility candidates should be first-class, deduplicated, consented, searchable and re-engageable. This is the only candidate graph you can own and the only one that compounds with tenure.
- Position the module as the offer-to-Day-1 spine — but know this seam is contested, not empty. Naukri and Zwayam have no payroll or statutory onboarding, so the strategic logic holds. However Keka already ships preboarding with automated offer rollout, BGV and document collection, so differentiate on depth (offer-drop prediction, UAN/PF/ESIC enrolment, first-payroll continuity) rather than on the category itself.
- PRICE PER EMPLOYEE PER MONTH, NOT AS A CREDIT PACK. The prior draft's advice to 'price against an annual prepaid credit model' was wrong and self-contradictory. The credit pack is the JOB BOARD's model; your competitor set is HRMS suites. Keka publishes Rs 90 / Rs 120 / Rs 150 per employee per month for its India tiers with hiring included — that is the benchmark. Naukri's Rs 1.46 lakh average annual spend is useful only as budget CONTEXT: it tells you procurement already has committed board spend, so sell your module as an uplift on the HRMS subscription, not as a replacement for the board invoice.
- Target GCCs, not staffing firms — and correct the segment read that drove the prior recommendation. Recruitment consultants are NOT the largest Naukri buyer type: in FY26 they are 26.4% versus Tech/IT/BPM at 27.1% and Other Sectors at 29.2%, ranking third of four. They also grew just 1% YoY in Q1FY27 while GCCs grew 31% and rose from 16.7% to 23.4% of billings. GCCs are the fast-growing, compliance-heavy, under-served beachhead. Consultants remain the segment where your sourcing gap hurts most, so if the HRMS is employer-only, scope them out and say so.
- Do not lead with 'AI interviewer'. Info Edge already ships agentic sourcing plus voice screening (AI-Rex: 4,000+ enterprises onboarded, 400+ paid, 3.7x mandate growth) and several India vendors sell AI interviewing. Assume parity is expected and free; differentiate on auditability, structured human review and candidate experience.
- Buy the assessment layer, but vet neutrality: DoSelect is 100% Info Edge-owned and is wired directly into the Naukri Response Manager, so an 'independent' assessment partner may be a competitor's asset. HackerRank, HackerEarth, iMocha, Mettl Mercer and Talview are all integration-friendly and Keka's published integration list proves the pattern. Negotiate wholesale terms before designing the workflow around any one of them.
- Treat blue/grey-collar as a separate product decision, not a configuration. The sourcing graph, the interaction model (WhatsApp, vernacular, voice, walk-in) and the unit economics all differ, and Job Hai dilutes even Info Edge's margins by ~250bps. Serving both from one recruiting module will serve neither well.
- Build DPDP posture in from v1, but build it on the statute rather than on vendor blogs. VERIFIED: the DPDP Act 2023 contains NO GDPR Article 22 equivalent — no automated-decision, profiling, explanation or human-review right exists in the Act or the 2025 Rules. So Indian law does not currently compel a human-review step on automated rejections. Build it anyway, because the Eightfold FCRA theory reaches any customer hiring into the US and because GCC procurement will ask. Two real statutory constraints to design to: the substantive Rules commence around May 2027 (rule 4 around November 2026), and the Rules require retaining certain personal data and processing logs for a minimum of one year — which cuts against aggressive candidate-data deletion, so do not promise immediate erasure.
- Do not assume public-profile aggregation is exempt. DPDP s.3(c)(ii) exempts data 'made or caused to be made publicly available by the Data Principal', but a resume behind Naukri's recruiter paywall was disclosed to Naukri under its terms, not made public by the candidate. Get counsel before any roadmap item depends on that exemption; this reading is verified against the bare Act but is not legal advice.

## Opportunities

- The moat is on PASSIVE DATABASE SEARCH, not on pipeline. Job posting plus application ingest runs on the customer's own board contract and is now confirmed across four independent vendors — Manatal ('My Own Contracts'), Ceipal, and most tellingly Keka, an India HRMS whose hiring module publishes to Naukri and LinkedIn in one click. A new entrant reaches full parity on inbound applicant flow on day one; it simply cannot sell outbound Resdex sourcing.
- The employer's OWN candidate graph is unowned and compounding: past applicants, silver medallists, referrals, alumni, agency submissions, internal-mobility candidates. Naukri cannot hold this (it is the employer's data), Zwayam holds it thinly, and an HRMS holds it structurally because it already has the employee record. It is the only candidate graph a new entrant can own, and it improves with tenure while Resdex access never does.
- Offer-to-Day-1 continuity is the seam Info Edge cannot cross — but it is already contested, not empty. Naukri and Zwayam have no payroll, attendance, statutory onboarding or UAN/PF/ESIC enrolment. However Keka already ships preboarding with automated offer rollout, background checks and document collection, so this is a race against India HRMS incumbents rather than an unoccupied gap.
- The incumbent has NOT monetised the ATS layer. Zwayam and DoSelect together generate roughly Rs 17cr of quarterly revenue at roughly -Rs 3.5cr PBT — about 3% of recruitment billings, loss-making. Info Edge's product reach is formidable and its ATS commercial execution is not. The threat to price against is Resdex-plus-eApps bundled into a board contract, not Zwayam winning ATS deals.
- GCC recruiting is the fastest-moving buyer segment by a wide margin — 31% YoY growth in Q1FY27 versus 15% for Tech/IT/BPM, 12% for other sectors and 1% for recruitment consultants, with GCC share of billings jumping from 16.7% to 23.4% in a single year. GCCs are compliance- and reporting-driven and under-served by consultant-oriented staffing ATSs. This is the credible beachhead, and it is a stronger one than the original report argued because it corrected for the consultant-segment stall rather than the consultant segment's size.
- Blue/grey collar is a separate, unconcentrated graph (apna's claimed 50M+, WorkIndia, Job Hai — and Job Hai dilutes Info Edge's own margin ~250bps, so the incumbent is not winning it). Sourcing dependency there is plural rather than monopolistic, and the workflow is WhatsApp/vernacular/walk-in rather than resume-search.
- Assessment and interview infrastructure is buyable and already plugs into India HRMS hiring modules — Keka's published integrations name Mettl Mercer and HackerEarth. Recruiting AI can be assembled rather than built, but partner neutrality must be checked case by case since DoSelect is Info Edge-owned.
- Auditable, defensible AI hiring is the one genuinely unclaimed position, and the Eightfold litigation makes it concrete rather than speculative. The live legal theory is that AI candidate scoring produces a 'consumer report' triggering FCRA disclosure, access and dispute rights — 'There is no AI-exemption to these laws.' No India AI-interview vendor reviewed publishes a bias-audit method, model card or documented human-review path. For a product selling to GCCs and US-headquartered enterprises, this exposure is inherited regardless of Indian law.
- India's DPDP timeline is a genuine window, not a constraint. The substantive DPDP Rules 2025 obligations do not commence until roughly May 2027 (eighteen months from the 13 November 2025 notification), and rule 4 lands around November 2026. Building consent, retention and audit primitives now is cheap and lands ahead of enforcement; retrofitting them into a populated candidate database later is not.

## Open questions

- What is Resdex INR list pricing — pack sizes, validity, CV view/download quotas, sub-user limits, anti-export clauses? I retried and naukri.com/recruit/buy-resume-database-access-packages now returns HTTP 200 rather than 403, but it is a JS-rendered SPA that serves only a title to automated fetch. Needs a browser session or a BD conversation. This is the single most useful unknown remaining for pricing strategy.
- Is there ANY commercial Resdex read API available to a non-Info-Edge ATS at any price? Zwayam's exclusivity claim implies no, and the total absence of API documentation across Naukri's recruiter FAQ, its Freshdesk corpus and its blog corroborates it — but no Naukri-side statement of terms exists. Worth one direct BD conversation with Info Edge before roadmap freeze.
- TurboHire positioning, pricing and Naukri integration status — turbohire.co returned HTTP 403 across five attempts spanning two rounds and multiple user agents. This is a bot/WAF block, so draw no inference from it. Needs a browser session.
- LinkedIn's India member count is not published — news.linkedin.com/about-us gives only APAC 410M+, and /about-us/statistics returns 404. Without it, the reachable Indian LinkedIn graph cannot be sized against Naukri's ~50M Resdex profiles.
- Mercer|Mettl and SHL India positioning and pricing remain unassessed — mettl.com is blocked by an SSL-inspection gateway on this network. Mettl matters more than the prior round realised, because Keka names 'Mettl Mercer' as a shipped assessment integration.
- Campus hiring is a separate India stack (Superset, Naukri Campus) with its own candidate graph via college placement cells. joinsuperset.com is blocked by the same gateway. Naukri Campus is confirmed as a Talent Cloud component. If campus is in scope, this layer is unexamined.
- Is there India-specific, dated, credible evidence on candidate reaction to AI interviews (completion rates, drop-off, complaint volume)? Nothing verifiable surfaced in either round. The Axios piece the prior draft cited could not be reached at all (network SSL-inspection block), so it has been retracted rather than carried.
- What are Zwayam's actual standalone revenue and customer economics? The Rs 17cr quarterly revenue and roughly -Rs 3.5cr PBT are MY derivation from Info Edge's incl/excl disclosure, and they bundle DoSelect. The split between the two, and Zwayam's ATS win rate against independent vendors, are not disclosed.
- Does Naukri's eApps/Response Manager subscription pricing make it a de facto ATS competitor at the SMB end? It has 49 support articles (the largest folder by far), a free cut-down tier bundled with job posting, and a paid full tier — but no published price.
- What is the current status and schedule of Kistler v. Eightfold AI? I verified the allegations and the FCRA/consumer-report theory through trade press and multiple law-firm commentaries, but did not read the docket. Whether the consumer-report theory survives a demurrer is the thing that determines how much it should shape the roadmap.
- Does Sense still operate in India post-Skillate? The prior draft's 'de-emphasised India' claim was an absence-of-evidence inference and has been retracted. The only concrete datum is that sensehq.com/skillate now returns 404. Actual India entity, headcount and customers remain unknown.
- foundit's financial and ownership status — confirmed operating (live site, © 2026, nine markets, resume-database product), but no verified database size, revenue, or current Quess ownership position. The widely repeated '70M jobseekers across 18 countries' is uncorroborated and contradicted by the site's own nine-market selector.

## Retracted

- 'Staffing firms and recruitment consultants are the single largest buyer type of the Indian candidate graph at 26.4% of Naukri B2B billings' — FALSE on the report's own evidence. In FY26 Other Sectors is 29.2% and Tech/IT Services/BPM is 27.1%, both larger; recruitment consultants rank third of four. In Q1FY27 they rank third again (23.7% vs Other 27.6% and Tech 25.3%). The deck further states IT Services is ~25% directly and 30-35% including pro-rata flow through consultants — IT services is the dominant end-buyer. This error appeared three times in the prior draft (key finding, opportunities, implications) and each instance has been corrected.
- 'Candidate trust in AI-mediated hiring is measurably eroding in credible press' sourced to Axios, 21 Aug 2026 — RETRACTED as unverifiable. axios.com is blocked at the network layer by an SSL-inspection gateway (confirmed: HTTP 200 returning an 'SSL Inspection' interstitial, not the article). I could not confirm the article exists at that URL or date. The claim was US-centric, added nothing India-specific, and the prior draft itself conceded no India evidence exists — so it is dropped rather than carried at low confidence.
- 'Sense appears to have de-emphasised India: its homepage surfaces no Skillate brand, no India presence, no India customers and no Naukri integration' — RETRACTED as an invalid absence-of-evidence inference. A US company's homepage not naming India is not evidence of an India retreat; homepages are GTM-targeted by default. The only concrete datum I could establish is that sensehq.com/skillate now returns HTTP 404. Moved to open questions.
- 'Naukri does maintain a public-facing ATS-integration page... Treat the page's existence as established and its terms as unknown' — RETRACTED and replaced. I retrieved the page (HTTP 200, 35,074 bytes). It is a 2015 WordPress image-attachment stub for a 225x225 image, dated March 8, 2015, with a comment form. It is not a product or partner page and commits to nothing. Characterising it as a 'public-facing ATS-integration page' overstated it.
- 'The Eightfold candidate-data-scraping lawsuit (surfaced only via a LinkedIn post, ~Oct 2025)' — CORRECTED, not retracted. The case is real but the prior framing was wrong on both date and legal theory. It is a proposed class action filed January 2026 in California Superior Court (reported as Kistler et al. v. Eightfold AI Inc., 20 January 2026, Contra Costa County), and the core theory is Fair Credit Reporting Act / California ICRAA consumer-reporting liability for AI candidate scoring — not scraping per se. Eightfold denies scraping. Now carried as a verified finding.
- 'foundit filed for bankruptcy in June 2025' — remains retracted, and now definitively disproven: foundit.in/employer is live at HTTP 200 with a '© 2026 foundit' footer and an active employer product across nine markets. The prior round's inability to reach the site was a user-agent block, not a signal.
- 'Section 8 of the DPDP Act requires organisations to explain the factors material to an automated decision' and 'DPDP 2023 mandates a right to human review of automated rejects' — remain retracted, and now definitively disproven against the bare statute. In the DPDP Act 2023 gazette text the word 'automated' appears exactly three times, all in definitions (s.2(b), the phrase 'human beings or by automated means', and s.2(x)); 'profiling', 'human review' and 'logic involved' appear zero times. Section 8 is 'General obligations of Data Fiduciary'. The notified DPDP Rules 2025 contain zero occurrences of any of these terms. There is no GDPR Article 22 equivalent in Indian law. The prior draft was right to distrust the vendor blogs.
- 'The Apify actor requires an active, PAID Naukri Resdex subscription' — corrected. The listing states the requirement as an 'Active Resdex session'. The stronger 'paid subscription' wording was the prior draft's inference, not the page's text.
- '~57% pre-tax margin on ~Rs 2,374cr of annual billings' — denominators conflated. The 56.6% margin is PBT on REVENUE (12,772/22,559). On billings it is 53.8% (12,772/23,743). The underlying figures were all correct; only the framing is fixed.
- 'Naukri held 118 million resumes... that no new entrant can replicate' used as the size of the sourcing moat — qualified rather than retracted. 118M is the investor metric for total resumes on Naukri. Naukri's own recruiter FAQ sizes Resdex, the sellable searchable index, at 'over 50 million profiles'. The two are not interchangeable and the report previously treated them as one.
- 'foundit claims 70M jobseekers across 18 countries' — downgraded to unverified. It was sourced to Tracxn, and foundit's own country selector lists nine markets. No number is asserted here.
- 'None of the AI-interview and assessment vendors publish pricing' — not established. Talview's site carries a Pricing nav item. The narrower true statement is that no price figures were obtained for any of them.
- Hyreo scale metrics — remain excluded. The homepage renders them as placeholder zeros. No numbers inferred.
- Info Edge's stale /Businesses/Recruitment web page figures (46 million registered jobseekers, 61,000 corporate customers) — remain excluded. All Info Edge operating and financial figures here come from the Q1FY27 (August 2026) presentation and data sheet, which I re-downloaded and re-extracted independently.

## Competitors

### Info Edge (India) Ltd / Naukri
- **segment**: Job board + resume database + forward-integrated recruiting stack
- **positioning**: Owns the Indian white-collar candidate graph and sells every layer above it: Resdex (search), Zwayam (ATS), DoSelect (assessments), AI-Rex (agentic sourcing + voice screening), Talent Pulse (talent intelligence), PremiumX (passive discovery), Naukri 360 / Agent Neo (candidate side), all bundled under Naukri Talent Cloud with SSO. Listed on NSE/BSE.
- **pricing**: Annual prepaid credit packs, not per-seat SaaS. FY26 average realization Rs 146k per Recruitment-India-B2B customer per year across 146,000 billed customers, DECLINING from Rs 152k in FY25 on tier-2/3 and SMB mix. Rs 12,259mn recruitment deferred revenue at FY26 end. Naukri Talent Cloud explicitly does not change pricing: 'The pricing of individual platforms will continue to apply.' Resdex list pricing still unknown — the pricing page is a JS-rendered SPA that returns only a title to automated fetch.
- **ai_capabilities**: AI-Rex multi-agent sourcing (AI-learned mandate, recommended pool, reach-out agent over WhatsApp/mailers/notifications/app, on-product screening agent, learning agent): 4,000+ enterprises onboarded, 400+ paid, 3.7x mandate growth Feb-Jun 2026, sourcing+screening 10-15 days to hours. Talent Pulse 600+ paid. PremiumX 1,800+ enterprises. Candidate-side: 2.7 lakh AI resumes and 1.3 lakh AI mock interviews monthly (June 2026). Talent Cloud AI: search keyword suggestions, AI candidate recommendations and AI profile tags (both enterprise-only), similar-CV look-alike pipelines.
- **strengths**: 118M resumes on Naukri growing ~9M/yr, with ~50M+ in the sellable Resdex index; 859k profiles modified daily and 997k resume searches daily — freshness up 69% in three years while adds stayed flat; 146k paying B2B customers and a 56.6% segment PBT margin that funds unlimited product investment; Owns the ATS (Zwayam) and assessment engine (DoSelect) outright and bundles them via Talent Cloud SSO; Controls the candidate side too (B2C billings +35%, paid conversion 1.2% to 2.6%, 63% PBT margin), closing the flanking route; eApps/Response Manager gives every job-posting customer a built-in response workflow that substitutes for a light ATS
- **weaknesses**: No payroll, attendance, leave, statutory onboarding or core HR — zero offer-to-Day-1 continuity; Has NOT monetised the ATS layer: Zwayam+DoSelect are ~Rs 17cr quarterly revenue at roughly -Rs 3.5cr PBT, i.e. sub-scale and loss-making; ARPU falling (Rs 152k FY25 to Rs 146k FY26) on its own stated tier-2/3 and SMB push; credit packs are disliked by SMBs; Recruitment consultants (26.4% of FY26 billings) grew only 1% YoY in Q1FY27 — a large buyer base has stalled; Job Hai (blue-collar) dilutes margin ~250bps; No public API, developer portal or partner program; its own 'ATS integration' URL is a 2015 image stub, and its 100-article recruiter corpus has no API folder; Resdex is fragmented across properties — Naukri, iimjobs and hirist each need separate database subscriptions

### Zwayam (Info Edge, 100% subsidiary)
- **segment**: Enterprise ATS / hiring platform
- **positioning**: Markets itself as the only ATS with native Resdex: 'The only platform with in-built Naukri RESDEX'. 1-click publish to Naukri, Hirist, Indeed, iimJobs, LinkedIn. Now listed as a component of Naukri Talent Cloud.
- **pricing**: unknown — no pricing disclosed on the site
- **ai_capabilities**: AI-generated JDs, AI ranking of applications, automated screening calls, AI-led first interview with structured feedback summaries, AI sourcing from internal talent pools. Claims 'save up to 30 hours/week' on manual screening.
- **strengths**: Exclusive in-product Resdex search and import — the one genuinely non-replicable feature in the Indian ATS market; 'Trusted by 350+ Enterprises'; logos Persistent, Flipkart, Cyient, Coforge, Sony, Microland, Kia, Samsung, BAGIC, CRISIL, Kohler, Hyundai, Digitide; Distribution via Naukri's 146k-customer B2B sales motion and Talent Cloud SSO
- **weaknesses**: Sub-scale and loss-making: Zwayam+DoSelect together are ~Rs 17cr of quarterly revenue (~3% of recruitment billings) at roughly -Rs 3.5cr PBT, derived from the Q1FY27 disclosure of Rs 629cr revenue at 56.1% margin including them versus Rs 612cr at 58.3% excluding; Info Edge does not report Zwayam separately — the only visibility is the incl/excl delta; Standalone ATS with no HRMS adjacency — no payroll, attendance or statutory onboarding; No published pricing and no self-serve motion; The exclusivity claim is the vendor's own marketing, never corroborated by a Naukri statement of licensing terms

### LinkedIn Talent Solutions (Microsoft)
- **segment**: Global professional graph + Recruiter seat + partner API program
- **positioning**: The only large passive candidate graph reachable by a third-party ATS through a documented, certifiable partner program.
- **pricing**: Not published. Recruiter Corporate / Recruiter Professional Services licences are prerequisites for real-time in-ATS profile data.
- **ai_capabilities**: Not enumerated on the developer hub; Recruiter-side AI is sold within the seat, not exposed to partners.
- **strengths**: Versioned public docs on Microsoft Learn (monikers through li-lts-2026-04, page updated 2026-04-01), Postman collections, sample apps, formal per-module certification test cases; Four API families: Recruiter System Connect, CRM Connect, Apply Connect, Job Posting API, all now on the Middleware Platform; Public partner application form — a genuinely walkable path for a new entrant, and a public list of already-certified ATS partners; 1.3B members globally; APAC 410M+; $19.8B annual revenue growing 12% YoY (Q4 FY26)
- **weaknesses**: Approval-gated: 'restricted to those developers approved by LinkedIn' plus a signed API agreement with data restrictions; Customer must hold a Recruiter Corporate/RPS licence for the valuable real-time features; Data flows in via recruiter-initiated One-Click Export — no bulk search, no database licence; RSC requires the Job Posting API to be implemented first — a long, sequenced integration runway before any payoff; No India member count disclosed anywhere; the /about-us/statistics page 404s. Weak in Indian tier-2/3 and non-tech roles where Naukri dominates

### Keka (Keka Hire)
- **segment**: India HRMS with an integrated hiring module — the closest structural comparable to the product being scoped
- **positioning**: Full-suite India HRMS (core HR, payroll, attendance, performance, PSA) with hiring, preboarding and hiring analytics bundled in. Sells per employee per month, self-serve, with published prices.
- **pricing**: India tiers, per additional employee: FOUNDATION Rs 90, STRENGTH Rs 120, GROWTH Rs 150. Separate price books for USA & European Union and for Asia Pacific & GCC countries. Free trial offered.
- **ai_capabilities**: Automation of repetitive hiring tasks to reduce time-to-hire; AI capabilities not separately itemised on the pricing page.
- **strengths**: Publishes transparent per-employee-per-month pricing — the realistic benchmark an HRMS recruiting module competes against, not Naukri's credit packs; Already ships the offer-to-Day-1 spine the report identifies as the seam: preboarding with automated offer rollout, background checks, document collection and pre-joining tasks; Job-board publishing to LinkedIn and Naukri in a single click, plus assessment integrations named as Mettl Mercer and HackerEarth; Proves the whole 'HRMS + recruiting module' thesis is already executed by an incumbent India vendor
- **weaknesses**: Naukri connectivity is publishing only — no Resdex, same ceiling as every third party; Hiring is one module inside a broad suite rather than a depth play; sourcing is not a differentiator; No candidate-graph asset of its own

### apna
- **segment**: Blue/grey collar and entry-level white collar marketplace
- **positioning**: Positions as India's leading job platform for MSME and high-volume frontline hiring.
- **pricing**: unknown — no employer pricing published
- **ai_capabilities**: unknown — not surfaced on the homepage
- **strengths**: Claims '5 crore+' (50M+) active job seekers and '50 lakh+' opportunities; Claims '7 lakh+' MSMEs and '1000+ enterprises' hiring; A structurally different graph from Resdex: volume, vernacular, WhatsApp-native, walk-in
- **weaknesses**: Every figure is unaudited vendor marketing with no filing-grade corroboration — treat as order-of-magnitude only; No API or ATS integration mentioned anywhere publicly; Does not serve mid/senior white-collar hiring, the core HRMS buyer's need

### foundit (formerly Monster India)
- **segment**: Job board + resume database, APAC/Middle East
- **positioning**: Quess Corp acquired Monster's APAC & ME business in 2018 and rebranded to foundit in 2022. Confirmed operating as of 2026 with a live employer product including resume-database access.
- **pricing**: unknown
- **ai_capabilities**: unknown
- **strengths**: Confirmed live and trading: site footer '© 2026 foundit', employer nav offers Job Posting, Access Resume Database, mRecruiters and Buy Online; Operates nine markets: India, Gulf, Hong Kong, Singapore, Philippines, Thailand, Malaysia, Indonesia, Vietnam; The most credible second white-collar resume database in India
- **weaknesses**: No published database size, revenue, customer count or ownership update — the widely repeated '70M jobseekers across 18 countries' is uncorroborated aggregator data and the site itself shows nine markets; No API or ATS-integration program disclosed; Distant second to Naukri in Indian white-collar share

### Ceipal
- **segment**: Staffing/IT-services ATS + workforce management
- **positioning**: Multi-board distribution ATS for staffing firms with an explicit Naukri integration page.
- **pricing**: unknown
- **ai_capabilities**: Not detailed on the Naukri integration page
- **strengths**: Documented Naukri integration: single post distributed to Naukri and sister sites, real-time application sync into the ATS; Targets the recruitment-consultant segment (26.4% of FY26 Naukri B2B billings)
- **weaknesses**: Naukri integration is posting plus response only — Resdex is not mentioned anywhere on the page; Serves a Naukri buyer segment that grew just 1% YoY in Q1FY27

### Manatal
- **segment**: Horizontal ATS with bring-your-own-contract job board integrations
- **positioning**: Posts to Naukri via its 'My Own Contracts' feature against the customer's existing board agreement.
- **pricing**: unknown — not examined this round
- **ai_capabilities**: unknown — not examined this round
- **strengths**: Cleanest published articulation of the legitimate integration pattern: the customer's own Naukri contract, used for posting; No data licence required, so the pattern is copyable on day one
- **weaknesses**: Posting only; no Resdex, no database search; No India-specific positioning

### Zoho Recruit
- **segment**: Horizontal ATS (India HQ, global GTM)
- **positioning**: Free / Standard / Enterprise self-serve ATS with 'Premium Job Boards' bundled from Standard up.
- **pricing**: Plan tiers published (Free: 1 active job; Standard: 10 active jobs per recruiter licence; Enterprise: 20 active jobs per recruiter licence); currency toggle offers USD/INR/EUR/GBP. Actual figures did not render to automated fetch and were not re-verified this round.
- **ai_capabilities**: AI Candidate Matching at Enterprise tier.
- **strengths**: Self-serve, price-transparent, India-headquartered; Bundled into Zoho One — strong SMB distribution
- **weaknesses**: No mention of Naukri on the pricing page — its 'Premium Job Boards' bundle is not India-anchored; Generic ATS, not India-recruiting-specific

### Talview
- **segment**: AI interviewing, assessments and proctoring
- **positioning**: 'Ivy: AI Interviewer' and 'Alvy: AI Proctor', the latter marketed as 'World's First Patented Agentic AI Proctoring'. India operations (Bengaluru).
- **pricing**: Not retrieved, but the site does carry a Pricing nav item — contrary to the prior round's 'demo-gated' characterisation.
- **ai_capabilities**: AI interviewer, agentic AI proctoring, automated/live/record-and-review proctoring, face and voice authentication, deepfake and proxy-candidate detection, secure browser, phone screening.
- **strengths**: Claims 20M+ candidates assessed and proctored and 250K+ recruiters/exam administrators; Anti-proxy and anti-deepfake positioning is a real and rising India-specific pain point; Multi-language site (EN/ES/FR/DE) and an integrations program
- **weaknesses**: Point solution — no ATS or HRMS; must sit inside someone else's workflow; All scale figures are unaudited homepage claims; Superlative marketing ('World's First Patented') is unsubstantiated

### InCruiter
- **segment**: Interview-as-a-service + AI interviewing (Bengaluru)
- **positioning**: Human interviewer marketplace plus an AI interview stack with an inbuilt ATS.
- **pricing**: unknown — not re-verified this round
- **ai_capabilities**: IncBot (one-way conversational AI video interview), IncScreen (conversational AI phone screening), IncProctor, JD-to-CV matching.
- **strengths**: A human interviewer panel is genuinely hard to copy and is the scarce input in Indian tech hiring; Bundles ATS + AI interview + human interviewers in one India-priced stack
- **weaknesses**: All scale and impact claims are vendor marketing, not re-verified in this round; treat 4,500+ interviewers and 600+ clients as positioning claims; No sourcing or candidate-graph asset — fully dependent on someone else's pipeline

### Hyreo
- **segment**: Candidate experience / recruiting engagement layer
- **positioning**: 'Humanized AI agents' for recruitment ops across Teams, email, SMS, WhatsApp and voice.
- **pricing**: unknown
- **ai_capabilities**: Conversational agents, pre-screening, scheduling, hire-ability prediction, joining-propensity analysis.
- **strengths**: Joining-propensity and offer-drop prediction addresses a real India-specific pain point that an HRMS is structurally better placed to solve; Markets large India IT-services logos
- **weaknesses**: Homepage scale metrics render as placeholder zeros — no verifiable numbers exist publicly; No ATS integrations named, no pricing; Thin engagement layer that a full ATS or HRMS can absorb

### HackerRank / HackerEarth / iMocha (technical and skills assessment)
- **segment**: Assessment and technical interviewing — grouped because the buy-versus-build conclusion is identical for all three
- **positioning**: Developer skills platforms (HackerRank 'Chakra' AI pre-screening; HackerEarth AI screener, AI interviewer and FaceCode live coding) and, for iMocha, a repositioning from assessments to skills-and-work intelligence.
- **pricing**: None published on their homepages.
- **ai_capabilities**: AI pre-screening interviews, AI screeners, live collaborative coding, and for iMocha AI-driven skills inference and taxonomy.
- **strengths**: Integration-friendly and plural — the assessment layer can be bought rather than built; Owned developer communities (HackerRank 26M+, HackerEarth 10M+) are small but real candidate graphs; Keka's published integration list (Mettl Mercer, HackerEarth) proves these plug into India HRMS hiring modules today
- **weaknesses**: Tech-only, so irrelevant to most Indian hiring volume; iMocha's named integrations are HCM suites, not ATSs; All community and customer figures are unaudited vendor claims; Partner neutrality cannot be assumed across the category — DoSelect, a credible peer, is 100% Info Edge-owned

### Sense (incl. acquired Skillate)
- **segment**: Recruiting automation / CRM for staffing
- **positioning**: US staffing-first AI recruiting automation. Acquired Indian AI-matching vendor Skillate. Current India go-to-market posture is UNKNOWN — the prior report's claim that India was de-emphasised was an absence-of-evidence inference and has been retracted.
- **pricing**: unknown
- **ai_capabilities**: AI Recruiter, Voice AI, chatbot screening, candidate matching and scoring, mass texting/SMS/WhatsApp, scheduling, referrals, database cleanup.
- **strengths**: Deep staffing workflow depth and a broad automation suite; WhatsApp support suggests some emerging-market fitness
- **weaknesses**: The Skillate brand appears retired — sensehq.com/skillate returns HTTP 404 — but this alone does not establish an India retreat; No India customers, India entity or Naukri integration surfaced in what I could retrieve; equally, no evidence of absence was established

### TurboHire
- **segment**: India AI recruitment automation / ATS
- **positioning**: unknown — turbohire.co, www.turbohire.co and /pricing all returned HTTP 403 across five attempts spanning two rounds and multiple user agents. This is a WAF/bot block, so no inference should be drawn from it in either direction.
- **pricing**: unknown
- **ai_capabilities**: unknown
