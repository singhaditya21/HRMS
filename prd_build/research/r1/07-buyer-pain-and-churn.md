# [r1] buyer-pain-and-churn

## Verification notes

SCOPE: one adversarial re-verification pass on 4 Sep 2026 using WebFetch plus browser DOM extraction. WebSearch was unavailable (session quota 200/200 exhausted), and G2, Gartner Peer Insights, TrustRadius and Reddit remained inaccessible, so the source base is unchanged from the original pass. Roughly 20 targeted checks were run against vendor primary sites, Google Play India, the Apple iTunes lookup API, Software Advice, SoftwareSuggest and Trustpilot.

WHAT HELD UP (verified exactly, no changes): both status pages — Keka's six Jul-Aug 2026 incidents with exact durations and Payroll at 100% uptime, and greytHR's cluster uptimes of 99.978%-100%; the Darwinbox status-page redirect chain; six of the eleven Google Play figures re-pulled independently (ZingHR 4.6/1.57L/50L+, PeopleStrong 4.8/94.5K/10L+, greytHR 4.5/1.13L/10L+, Darwinbox 4.6/1.16L/10L+, HROne 4.1/6.14K/10L+, Zoho People 4.3/5.61K/1M+) — all matched to the digit; both re-checked iTunes India figures (Keka 4.74/7,082; Darwinbox 4.60/13,718); the Darwinbox 'Sapien Design System' release dated 20 Aug 2026 on Android, independently corroborated by iOS v9.4.5 dated 21 Aug 2026; the greytHR Emmanual J. June 2024 review verbatim including its sub-scores; the greytHR May 2026 instability review verbatim; the greytHR finance-team 'most pathetic Payroll system' quote verbatim; both Zoho People support quotes verbatim; the HROne Trustpilot review verbatim; the SoftwareSuggest 4.7/174 figures; and — on page 4 of 4 — the macOS-compression contamination the report flagged, which my own first-page check had appeared to refute. The original report was more accurate on verifiable specifics than adversarial priors would predict.

WHAT I CHANGED: eleven items are listed in retracted_claims. The substantive corrections are the greytHR incident count (12 → 14), the removal of the SAP SuccessFactors comparative conclusion (contradicted by the report's own rating table), the demotion of the peopleHum 'weaponised lock-in' framing to a low-confidence n=1 allegation, the removal of three stale or unverifiable allegations (PeopleStrong 2018, Pocket HRMS fake reviews, the app-rating-inflation assertion), and the relabelling of Keka's pricing as unverified third-party data after establishing that Keka publishes no prices at all.

WHAT I ADDED (only verified material): a selection-bias caveat carrying the actual base rates (Software Advice greytHR 4.3/297, Zoho People 4.4/359, Keka 4.4/90, peopleHum 4.2/25; Trustpilot greytHR 3.7 with 8% 1-star), which is the single most important de-biasing correction — the original report reads as a catalogue of dysfunction drawn from the negative tail of uniformly well-rated products; greytHR and Zoho People India pricing from vendor primary pages, filling two 'unknown' fields; Keka's previously-missing Google Play rating (4.7, 37K reviews); the finding that Keka and Darwinbox are fully sales-gated on price while greytHR and Zoho publish theirs; and vendor-primary proof for the attendance-packaging grievance at both Zoho (excluded from the free edition) and greytHR (gated to the ₹4,495 Growth tier, with PMS an add-on at every tier). Four 'unknown' ai_capabilities fields were attempted: three are now labelled positioning claims (Keka AI, Darwinbox Cortex/Sense, Zoho 'AI-first'), and greytHR's stays unknown because its NAVOS page would not resolve.

TRUST LEVEL: HIGH for anything I re-verified this pass — quantitative figures, status pages, pricing, the dated Darwinbox incident, and the re-located verbatim quotes. MEDIUM for review-derived findings carried forward but not re-located within budget (marked inline; greytHR alone has 297 reviews across 12 pages, so exhaustive re-verification was not feasible). LOW for the six-year-old peopleHum allegation, the stale Keka trial and cost items, and the consumer-forum finding. The structural weakness that survives cleaning is unfixable with these sources: the report describes failure MODES accurately but says nothing reliable about their FREQUENCY, and no churn or renewal data exists in it. Treat it as a taxonomy of what goes wrong, never as a measure of how often.

## Key findings (54)

### 1. [high] METHOD/COVERAGE CAVEAT (updated after re-verification pass, 4 Sep 2026): this dimension rests on Software Advice/GetApp, SoftwareSuggest, Trustpilot, Google Play (India storefront), the Apple iTunes lookup API, and vendor primary sites. G2, TrustRadius, Gartner Peer Insights and Reddit were NOT accessible in either the original or the verification pass, and WebSearch quota was exhausted in both. There is NO Reddit, LinkedIn, X, YouTube, G2 or Gartner evidence in this dataset. Trustpilot is reachable via server-side fetch but bot-blocks a real browser; Google Play pages truncate under plain fetch and required browser-side DOM extraction.

Verification pass: play.google.com pages returned '[Content truncated due to length...]' under WebFetch and had to be read via browser JS; trustpilot.com returned a 'Verifying your connection...' interstitial in-browser but served content to WebFetch; WebSearch returned 'this session has used its web search budget (200 of 200 WebSearch calls)'.

Source: https://www.g2.com/products/keka/reviews

### 2. [high] SELECTION-BIAS CAVEAT (added in verification): the aggregate ratings for every vendor in this dimension are GOOD, and the pain narrative below is drawn from the negative tail, not the central tendency. Verified base rates: Software Advice — greytHR 4.3/5 (297 reviews), Zoho People 4.4/5 (359), Keka 4.4/5 (90), peopleHum 4.2/5 (25). Trustpilot greytHR 3.7/5 (26 reviews, only 8% 1-star). Google Play India 4.1–4.8 across eleven apps. Any downstream use of these findings must treat them as failure-mode taxonomy, NOT as a measure of how common failure is.

Re-fetched 4 Sep 2026: softwareadvice.com greytHR profile 'Showing 51 - 75 of 297 Reviews', overall 4.3/5; Zoho People 4.4/5 across 359 reviews, most recent Aug 2026; Keka 4.4/5 across 90 reviews ('Showing 76 - 90 of 90 Reviews'); peopleHum 4.2/5 across 25 reviews. Trustpilot greytHR: TrustScore 3.7, 26 reviews, 1-star = 8%.

Source: https://www.softwareadvice.com/hr/greythr-profile/reviews/

### 3. [high] DATA-QUALITY CAVEAT (RE-VERIFIED AND CONFIRMED): Software Advice's 'Keka' profile (90 reviews) is contaminated with reviews of the unrelated macOS file-archiver also called Keka. The contaminated reviews sit on the LAST page (76-90), which is why a first-page check appears to clear the profile. Any aggregate rating for Keka from that source is unreliable.

Page 4 of the Software Advice Keka review list ('Showing 76 - 90 of 90 Reviews'), read via browser 4 Sep 2026, contains a review titled 'Great Compression Software': 'For a basic run-of-the-mill quick archive, I typically just use the MacOS compression tool... Keka handles these special cases like a champ. I wonder if it's possible to replace the standard MacOS compressor with Keka?' Cons field: 'It might be nice to have the ability to make it the "default" compressor in MacOS.' Reviewer 'Doug L' present in page HTML. Pages 1-3 contain no compression references.

Source: https://www.softwareadvice.com/hr/keka-profile/reviews/?page=4

### 4. [high] DATA-QUALITY CAVEAT: SoftwareSuggest (India's largest local review site) skews heavily positive for HRMS vendors — Keka shows 4.7/5 across 174 reviews with 91% likelihood-to-recommend and almost no 1-2 star content. Treat SoftwareSuggest as weak evidence of dissatisfaction; absence of complaints there is not evidence of absence.

Re-verified 4 Sep 2026: SoftwareSuggest Keka page shows 4.7/5 across 174 reviews; Features 4.7, Ease of Use 4.8, Value for Money 4.7, Customer Support 4.7, Likelihood to Recommend 91% — versus Software Advice 4.4/5 on the same product.

Source: https://www.softwaresuggest.com/keka

### 5. [high] CHURN TRIGGER #1 (most frequently recurring theme in the negative reviews sampled — NOT a measured frequency): support-SLA collapse, with tickets aging for months and no dedicated account owner. Buyers state explicitly that this triggers evaluation of alternatives. NOTE: the original report called this 'the single most repeated buyer complaint'; no frequency count was performed, so that superlative has been removed.

RE-VERIFIED VERBATIM 4 Sep 2026 (Software Advice greytHR, page 3, reviews 51-75): 'EJ / Emmanual J. / Verified reviewer / Airlines/ Aviation / 51-200 employees / Used daily for more than 2 years / Reviewed June 2024 / Pathetic Service / 2' — Pros field reads 'Noting as such pathetic service looking to migrate to another platform like keka, bamboo, etc. We are exploring them.' Cons: '1. Lack of technical expertise to handle the escalation 2. Complicated Interface 3. Lot of technical glitches after the latest update 4. Failing to inform the customers about the changes that happened in the portal 5. Unable to customise the things as per our requirements.' Sub-scores: Ease of use 3, Value for money 2, Customer support 3, Functionality 3. (Original report transcribed the Pros field as 'Nothing as such'; the site reads 'Noting as such'.)

Source: https://www.softwareadvice.com/hr/greythr-profile/reviews/?page=3

### 6. [medium] greytHR (SMB/mid-market): buyers report no named CS owner, silent product changes, and payroll errors — a combined trust failure, reported as recently as Aug 2025.

greytHR, Real Estate, 11-50 employees, August 2025, 3/5 (Customer support 2/5): '1. No dedicated CS personnel, you have to raise a query at a common desk email ID, and every time there's someone new addressing the issue. 2. GreytHR makes changes in the functionality of the app anytime without any notification. 3. A lot of errors while running payroll. 4. Many limitations in GreytHR ESS & PMS.' NOTE: this specific review was not re-located within the verification budget (297 reviews across 12 pages); carried forward from the original pass at reduced confidence.

Source: https://www.softwareadvice.com/hr/greythr-profile/reviews/

### 7. [medium] greytHR support latency is reported in months, not days, by mid-market Indian customers.

greytHR aggregated Cons quote on Software Advice: 'Manier times support from the greytHR is is not on time, they can take 4 months of time.' Trustpilot corroboration RE-VERIFIED 4 Sep 2026: HARSHITA CHAURASIYA, 15 February 2025, 1 star, title 'Worst Application Ever Seen' — review confirmed to exist with that date and rating; the visible excerpt reads 'When you ask for some new modifications they say no, it...'. The original report's quoted line about 'Tickets older than 6 months' falls beyond the visible excerpt and was NOT re-confirmed verbatim.

Source: https://www.trustpilot.com/review/greythr.com

### 8. [medium] greytHR: recurring monthly payroll calculation errors and settings that reset between payroll months are reported by mid-market buyers — i.e. the payroll engine itself, not just support, draws complaints.

greytHR, Jibin J., Civil Engineering, 51-200 employees, November 2024: 'monthly challenges that prevent us from achieving complete reliability with the system'; salary-processing calculation errors recur monthly and settings reset between months. Separately, Aviation & Aerospace, 51-200 employees, May 2022, 2/5: 'Error in Arrears calculation... One ticket created year ago but still not resolved... Many things need calculate/work manually and upload to the software'. Not individually re-located in the verification pass.

Source: https://www.softwareadvice.com/hr/greythr-profile/reviews/

### 9. [high] greytHR: finance/accounts stakeholders (not HR) are among the harshest critics of its payroll — a distinct buyer persona whose trust is lost separately from HR's.

RE-VERIFIED VERBATIM 4 Sep 2026 on Software Advice greytHR page 4 (reviews 76-100). The review's Pros field praises the support team, while the Cons field reads: 'As per our Finance team GreytHR is the most pathetic Payroll system anyone can get. they Don't trust on their payroll and settlement process, requesting HR to explain manually, I have face issue's Specially in Employee Settlement process. Sometimes the software does not store information on a timely basis.' Reasons for choosing greytHR: 'It was chosen and decision taken by management.' (Quote confirmed; the original report's industry/date attribution of Transportation, April 2022 was not re-confirmed.)

Source: https://www.softwareadvice.com/hr/greythr-profile/reviews/?page=4

### 10. [medium] greytHR: support agents are reported to lack payroll domain knowledge — a specific escalation-quality complaint (2025).

greytHR, Veena N., Information Technology and Services, 51-200 employees, August 2025: 'Support agents not understanding payroll concerns or lacking knowledge of payroll rules'; 'many support agents not trying to understand the real concern'. Not individually re-located in the verification pass.

Source: https://www.softwareadvice.com/hr/greythr-profile/reviews/

### 11. [high] greytHR: unannounced platform instability/maintenance windows are a live complaint into 2026 — this is the most recent review on the profile.

RE-VERIFIED VERBATIM 4 Sep 2026, and confirmed to be the most recent review on the greytHR Software Advice profile (May 2026). Akshay P.: 'The platform has experienced frequent periods of instability or maintenance, often occurring without any prior notification or follow-up communication, which significantly impacts user trust and operational reliability.'

Source: https://www.softwareadvice.com/hr/greythr-profile/reviews/

### 12. [high] CORRECTED NUMBER: greytHR's public status page shows 14 (not 12) web-app cluster incidents in the trailing 90 days to 4 Sep 2026, longest 19 minutes, cluster uptimes 99.978%–100%. The buyer perception of 'frequent instability' is therefore partly real but small in magnitude — the grievance is about frequency and lack of proactive communication, not sustained downtime.

status.greythr.com re-read 4 Sep 2026. Cluster 1: Jun 12 (6 min), Jul 21 (6 min). Cluster 2: Jul 18 (4), Aug 14 (19), Aug 15 (4). Cluster 3: Jun 07 (6), Jun 10 (12), Jul 19 (7). Cluster 4: none. Cluster 5: Jul 07 (4), Jul 19 (3), Jul 21 (2), Jul 29 (2), Aug 19 (5), Aug 27 (2). Uptimes: C1 99.989%, C2 99.978%, C3 99.980%, C4 100%, C5 99.983%. The original report listed 12 incidents and dated two of them Jun 9 and Jul 8; the page reads Jun 10 and Jul 07 (rolling-window drift).

Source: https://status.greythr.com/

### 13. [high] Keka (SMB/mid-market): the most damaging recent complaint is a sales-to-delivery expectation gap plus an unhonoured refund — a contract/billing grievance, not a feature gap. Dated April 2026, and it is the most recent review on the profile.

RE-VERIFIED 4 Sep 2026: Software Advice confirms the most recent Keka review is April 2026 by Darshan K., 1 star, and that it states 'team confirmed that a refund would be processed for the discontinued/unused module, but till date, no refund has been received'. Full original text: 'During the demo, key software limitations were not clearly communicated, which created a mismatch between expectations and actual functionality. There are major communication gaps—calls are often not answered, and even after raising tickets, there is no proper follow-up.'

Source: https://www.softwareadvice.com/hr/keka-profile/reviews/

### 14. [medium] Keka: implementation projects stalling for 2.5-3 months after full payment, with the vendor's project team dictating meeting times, is a documented SMB failure mode.

Keka, Ashok R., Project Manager, Information Technology, 11-50 employees, September 2024: 'implementation is not completed even after 2 and half months' with 'no response' from support. Software Advice aggregated Cons: 'We have sent multiple request to their project implementation team and support team and no response. When ever they are free they will call us and request to attend the meeting in short notice, the project team will never adjust and come to meeting based on the customer request.' Not individually re-located in the verification pass.

Source: https://www.softwareadvice.com/hr/keka-profile/reviews/

### 15. [low] Keka: an SMB buyer reports writing off ~3 months and Rs. 35,000 on a failed rollout. NOTE: the Rs. 35,000 figure is one reviewer's self-reported number with no corroboration and is now ~3 years old; do not use it as a benchmark for implementation cost or write-off risk.

Keka, Rampawan k., Computer Software, 51-200 employees, December 2023, 1/5 across all four sub-scores, title 'BEWARE DON't Use KEKA, We have wasted time and money': 'we have wasted 3 months and Rs. 35000 on keka'. Cons: 'Failed to work on ground zero, they will say follow our company polices not your policy'. Single unverified self-report; not re-located in the verification pass.

Source: https://www.softwareadvice.com/hr/keka-profile/reviews/

### 16. [medium] Keka: rigidity is the core mid-market functional complaint — processes must be bent to the product, and support's remedy for defects is sometimes to make employees redo work.

Keka, Puneet S., Information Technology and Services, 51-200 employees, May 2023, 3/5 (Value 2, Support 2), title 'Does the bare minimum; inflexible and customer service is poor': 'Lot of the functionality is hard wired; impossible to make any changes. You have to wire your process to fit Keka... some issue with Timesheet module; their solution, ask employees to re-submit all Timesheets for last 2 week.' STALENESS FLAG: May 2023, and Keka shipped a major mobile UI in mid-2026; the rigidity claim was not re-tested against the current product.

Source: https://www.softwareadvice.com/hr/keka-profile/reviews/

### 17. [low] Keka: the advertised free trial was described by a 2021 evaluator as a canned demo with fake data, with onboarding requiring ~25 spreadsheets. STALENESS FLAG: this is a Dec 2021 review and keka.com now presents a 'Free Trial' call-to-action on every pricing tier; the claim was NOT re-tested and may no longer hold.

Keka, Verified Reviewer, Computer Software, 51-200 employees, 'Used weekly for free trial', December 2021, 1/5: 'The free trial is just a demo with fake data. It's not a free trial... Onboarding requires filling 25 sheets even if you are looking to use a subset of features.' Counter-evidence from vendor primary 4 Sep 2026: keka.com/pricing shows a 'Free Trial' button on each of Foundation, Strength and Growth, and the footer links 'Start Free Trial' and 'Take a Free Tour'.

Source: https://www.softwareadvice.com/hr/keka-profile/reviews/

### 18. [medium] Keka: payroll/tax computation accuracy was challenged by an Indian SMB customer for FY2023-24, alongside a claim that support staff do not know the product.

Keka, Soubhangi R., Information Technology and Services, 11-50 employees, February 2025, 4/5 overall but Customer support 2/5: 'The tax computation was wrong when we counted for the financial year 23-24. The support team has very less idea about the product.' Single review; not re-located in the verification pass.

Source: https://www.softwareadvice.com/hr/keka-profile/reviews/

### 19. [medium] Biometric-device integration is a recurring, concrete integration gap for Indian SMB buyers — attendance data fails to sync or lags 2-3 days, which directly corrupts payroll inputs.

Keka, Amar Y., IT Manager, 51-200 employees, 30 June 2025 (SoftwareSuggest): 'Integration with biometrics is limited, and it doesnt work properly sometimes. Also, attendance data doesnt get synchronized.' Keka, varun s., Manager, 201-500 employees, 12 February 2025: 'Biometric log might lag, which gets updated in 2 to 3 days at times, during which you are not able to track the login hours.' Corroborating Google Play review by 'Falcon', 15 September 2022, alleges a biometric integration was promised pre-sale then declared impossible post-payment.

Source: https://www.softwaresuggest.com/keka/reviews

### 20. [medium] CHURN TRIGGER #2: a bad mobile release is a first-order churn risk, not a cosmetic one — in India the mobile app is the attendance-capture device, so app failures convert directly into lost pay (LOP) and mass employee escalation to HR. End users state switching intent explicitly.

greytHR Google Play, SATTA DEEPAN SAHU, 24 August 2026: 'The app takes too much time to open and refresh which results in delay in signing in and sometimes lead to LOPs... it's not an issue which has occurred once but everyday since a year.' Darwinbox Google Play, Roshan Shrikhande, 9 July 2026: 'your app stuck and directly close every time... if this will continue i will make sure my company will go to another platform like workday etc do it asap.' NOTE: these are employee end-users, not buyers; switching intent expressed by an employee is not a purchasing decision.

Source: https://play.google.com/store/apps/details?id=com.greytip.ghress&hl=en_IN

### 21. [high] CONFIRMED AND DATED: Darwinbox shipped a major mobile redesign ('Sapien Design System') on 20 August 2026 (Android) / 21 August 2026 (iOS v9.4.5), and end users report immediate regressions — crashes on launch, forced daily re-login, attendance not registering inside the geofence, blank timesheets, and no way to revert. This is a live, precisely-dated enterprise-segment quality incident and the single most actionable competitive opening in this dimension.

RE-VERIFIED 4 Sep 2026 via browser DOM read of the Google Play India listing: 'Updated on 20 Aug 2026'; What's new: 'The Sapien Design System has officially arrived on mobile! We've refreshed the Darwinbox app to give you a highly intuitive, modern, and seamless experience. • Brand-New Mobile Dashboard...'. iTunes lookup (country=in) independently confirms Darwinbox iOS version 9.4.5 with currentVersionReleaseDate 2026-08-21T05:22:48Z. Reviews: Amit Upadhyaya, 27 Aug 2026 — 'This app is frequently crashing while logging... this stop working after it's latest update. Also forcing us to use new view.' Archies Bhanushali, 25 Aug 2026 — 'App is crashing after new update. automatic sign out observed... new update killed everything.'

Source: https://play.google.com/store/apps/details?id=com.darwinbox.darwinbox&hl=en_IN

### 22. [high] Darwinbox's mobile login uses an in-app WebView for Google sign-in, publicly flagged in Aug 2026 by a technically literate end user as both bad UX and a security anti-pattern.

RE-VERIFIED 4 Sep 2026 — the review text is present on the live Google Play India listing: '...is kind of flow. In 2026, this is both terrible UX and an unnecessary security risk. Please fix it.' Attributed in the original pass to Shriram Bhat, 17 August 2026, full text: 'Darwinbox opens Google login inside an in-app WebView and asks users to enter their Google password there. Google has account pickers, Credential Manager, OAuth and proper browser-based authentication specifically to avoid this kind of flow.'

Source: https://play.google.com/store/apps/details?id=com.darwinbox.darwinbox&hl=en_IN

### 23. [medium] Darwinbox (enterprise): buyer-side complaints centre on navigation depth, custom-report difficulty, cumbersome bulk upload, and inability to backdate goal achievements — admin/analyst friction rather than payroll failure.

Guoyan R., Utilities, 1001-5000 employees, June 2026, 1/5, 'Worse HRIS ever': 'If you like straight forward highway routes to get to your destination Darwinbox is like using all the smaller streets to avoid paying tolls.' Bilal Ahmad T., Real Estate, 201-500 employees, May 2026, 4/5: 'The reporting feature is powerful but not always very intuitive, and creating custom reports can take some time to get right.' Aggregated Cons: 'it is not possible to mark past achievements later'; 'The bulk uploading feature is cumbersome.' Not individually re-located in the verification pass.

Source: https://www.softwareadvice.com/hr/darwinbox-profile/reviews/

### 24. [high] Darwinbox exposes no public status page — status.darwinbox.com redirects to a login and then to the marketing site — so enterprise buyers have no self-serve incident history to diligence. This is a real transparency gap versus Keka and greytHR, both of which publish component-level uptime.

RE-VERIFIED 4 Sep 2026: https://status.darwinbox.com/ returns HTTP 302 to https://status.darwinbox.com/user/login, whose Location header points to https://darwinbox.com/. By contrast status.keka.com and status.greythr.com both render public per-component incident histories without authentication.

Source: https://status.darwinbox.com/

### 25. [high] Zoho People (SMB): the dominant buyer complaint is not price or features but support access — buyers say they cannot get help when it is urgent, despite otherwise liking the product (profile average 4.4/5).

RE-VERIFIED VERBATIM 4 Sep 2026: Ananyaa B., December 2025 — 'Difficult to get assistance from the zoho team. There should be a demo available. Customer support is really bad.' Ajay M., June 2026 — 'Getting a support is bit lengthy process and you will be stuck if you want help in some urgency.' Profile overall 4.4/5 across 359 reviews, most recent review Aug 2026.

Source: https://www.softwareadvice.com/hr/zoho-people-profile/reviews/

### 26. [medium] Zoho People (SMB): configuration complexity — scattered settings, hidden functions, and hard-to-reason-about role/permission and form-level access — is the leading implementation friction reported.

Aggregated Cons: 'Some functions are hidden so i have to spend more time to search and work on them like leave assigning...'; 'User permissions, roles, and form-level access controls can be challenging to understand during initial setup.' Cedric P., Transportation, 2-10 employees, October 2025: setting up automations was 'very confusing at first and overwhelming' for non-technical users.

Source: https://www.softwareadvice.com/hr/zoho-people-profile/reviews/

### 27. [high] UPGRADED WITH VENDOR-PRIMARY PROOF: the buyer grievance that attendance is gated behind a paid Zoho tier is factually correct. Zoho People's free edition is limited to 5 users and three functions — none of them attendance or time tracking.

zoho.com/people/zohopeople-pricing.html read via browser 4 Sep 2026: 'Explore our FREE edition, forever free for up to 5 users. Employee database management / Time-off management (Leave) / Document management'. Paid tiers: ESSENTIAL HR ₹48/user/month billed annually; PROFESSIONAL ₹96; PREMIUM ₹144; ENTERPRISE ₹192. 'Local taxes (VAT, GST, etc.) will be charged in addition to the prices mentioned.' Corroborating buyer quote: 'For individual user this is extra cost at-least the attendance management to should be added to the Free Version.'

Source: https://www.zoho.com/people/zohopeople-pricing.html

### 28. [high] ADDED (verified vendor primary): greytHR gates attendance the same way — advanced attendance, shift management, overtime and geo-fencing sit in the Growth plan (₹4,495/month base), not Essential (₹2,495/month), and Performance Management is an add-on even on Growth. Attendance-and-PMS packaging is therefore a systematic upsell pressure point across the SMB segment, not a vendor-specific quirk.

greythr.com/pricing read via browser 4 Sep 2026: 'Essential — Payroll + Leave + CoreHR Basic — ₹2,495 /month — ₹45/employee above 50'; 'Growth — Everything in Essential + Attendance + Advanced HR — ₹4,495 /month — ₹85/employee above 50 — Advanced attendance & shift management / Overtime, permissions & geo-fencing / Performance Management Sytem (PMS) (add-on)'. This substantiates the recurring buyer complaint that greytHR's PMS and ESS are 'limited' — PMS is not in the box at any published tier.

Source: https://www.greythr.com/pricing/

### 29. [high] Zoho People mobile: check-in/check-out is the most-failed function — 'checked in but not checked out', silent location-permission failures, and check-in hidden behind an admin toggle end users cannot see. Complaints span 2020 through July 2026, i.e. chronic rather than a one-off regression.

Vijendra Singh, 17 July 2026: 'Checkout feature is not working, it is happening after the latest update dated 10-07-2026 done, you checked in but not checking out, if it is not working then your current and next attendance could not be recorded.' A Google user, 3 January 2020: 'Even though you have checked in at your time and then you go to check out, you find yourself not checked in.' Iftiquar Rahman, 18 December 2023: 'Always gives the alert, unable to fetch your location.' App re-verified live 4 Sep 2026 at 4.3 stars / 5.61K reviews / 1M+ downloads, updated 27 Aug 2026.

Source: https://play.google.com/store/apps/details?id=com.zoho.people&hl=en_IN

### 30. [medium] A structural end-user grievance across every Indian HRMS mobile app: vendors deflect configuration complaints back to 'your organization's admin' in public replies, while the employee has no escalation path and the admin often has no visibility. This is an adoption-risk pattern, not a product defect.

Zoho Corporation reply, 13 August 2026: 'please note that these settings are configured by your organization. Kindly contact your organization's administrator or HR department.' Greytip Software reply, 3 August 2026, to an employee whose night shifts were marked absent: 'attendance and regularization depend on your organization's attendance policies and settings, please contact your companies HR/Admin team.'

Source: https://play.google.com/store/apps/details?id=com.zoho.people&hl=en_IN

### 31. [high] HROne (SMB/mid-market) has the lowest Google Play rating of the eleven Indian HRMS apps sampled — 4.1 (6.14K reviews, 10L+ downloads, India storefront, updated 2 Sept 2026) — with complaints concentrated on battery drain, slow/white-screen launches, selfie-attendance loops, and a support posture of 'that's how the app is supposed to work'. NOTE: 'lowest of the set sampled', not lowest in the market.

RE-VERIFIED 4 Sep 2026 via browser DOM read: 'HROne / The Simplest HR software / 4.1 star / 6.14K reviews / 10L+ Downloads / Updated on 2 Sept 2026'. Reviews: Ra ab, 6 March 2026 — 'poor performance and bad support... when a request is put to support, they cooly say "that's how app is supposed to work", take it or leave it!!!' Riyaz Shaikh, 21 July 2026 — 'draining 100% bettery in 3 hours.' MAYUR SANCHETI, 3 July 2026 — 'If the shift time changes then time goes to the previous day... no testing.' The same listing carries a vendor marketing claim, 'HROne is trusted by 1500+ brands like Haier, Canon, Timex, Aviva and more' — vendor self-report, not independently verified.

Source: https://play.google.com/store/apps/details?id=com.hrone.android&hl=en_IN

### 32. [high] HROne: the only Trustpilot review is a 1-star Indian buyer alleging pre-sale false promises followed by post-payment service collapse (July 2025). Sample size is one — this is an anecdote, not a signal, and should not be presented as a rating.

RE-VERIFIED VERBATIM 4 Sep 2026: TrustScore 3.2, total reviews 1, distribution 100% 1-star. SigSigma (IN), 21 July 2025, 1/5, 'Disappointing experience': 'The problems began with false promises made before payment. Once the payment was made, the support and service quality dropped significantly. Despite multiple follow-up emails and complaint tickets, I received no resolution to the issues I faced. Every aspect of their service delivery failed to meet basic expectations.'

Source: https://www.trustpilot.com/review/hrone.cloud

### 33. [high] ZingHR (mid-market/enterprise, frontline-heavy): end-user complaints are dominated by punch-in/punch-out timeouts, GPS mis-location and server errors — the transaction that determines pay is the one that fails. Complaints run 2022 through Aug 2026, against a high headline rating (4.6, 1.57L reviews, 50L+ downloads, updated 20 Aug 2026).

Rating/installs RE-VERIFIED 4 Sep 2026 via browser DOM read: 'ZingHR / 4.6 star / 1.57L reviews / 50L+ Downloads / Updated on 20 Aug 2026'. Reviews: Sujit Y., 28 July 2026 — 'The app frequently has time-out issues, making it difficult to log in, mark attendance, or access important information.' Ramkumar Gurjar, 31 July 2026 — 'punch in and punch out time taking 2 to 3 minutes approx frequently crashing big headache for location detection frequently showing wrong location.' Minakshi Murmu, 19 September 2022 — 'During app updation, punch out time is not added which mark attendance as leave even when you spend full day in office.'

Source: https://play.google.com/store/apps/details?id=com.zinghr.app&hl=en_IN

### 34. [high] PeopleStrong (enterprise/manufacturing/frontline): the highest headline app rating of the set (4.8, 94.5K reviews, 10L+ downloads, updated 26 Aug 2026) coexists with a consistent cluster of shift-logic failures — 8-hour shifts marked Half Day/Absent, shift changes not recognised, comp-off not auto-generated, and forced logouts before punch-in.

Rating RE-VERIFIED 4 Sep 2026 via browser DOM read: 'PeopleStrong / PeopleStrong Technologies Pvt Ltd / 4.8 star / 94.5K reviews / 10L+ Downloads / Updated on 26 Aug 2026'. Reviews: Rohit Thakur, 27 Aug 2026 — 'if people are doing 8 hrs duty then why it is showing Hd or Absent. also if shift change then also showing absent.' RITURAJ PATEL, 18 Aug 2026 — 'If we do extra duty then CO should be automatically generated but it is not generated... The earlier app used to recognize all this.' Mr. Brightside, 17 July 2026 — 'the app stupidly logs out automatically, which causes employees to check in late.'

Source: https://play.google.com/store/apps/details?id=com.peoplestrong.alt.organise&hl=en_IN

### 35. [low] DOWNGRADED: peopleHum — a single 2020 reviewer alleged the vendor leveraged the customer's employee data and sent email threats to force a move to new per-user pricing. The review exists and is quoted accurately, but it is one anonymous review out of 25 on a profile averaging 4.2/5, it is six years old, and no vendor response is visible. It is an unverified allegation and must not be generalised.

RE-VERIFIED 4 Sep 2026: Software Advice peopleHum profile shows 4.2/5 across 25 reviews, most recent review December 2025. The October 2020 review, Luxury Goods & Jewelry, 51-200 employees, 1/5, title 'Unethical company: Wont RECOMMEND!' confirmed present: 'They were too keen to push us to their new user pricing by either leveraging our employee data or by sending email threats.' No vendor response documented. The original report's framing of this as 'the clearest documented example of vendor lock-in being weaponised in the Indian HRMS market' has been retracted as unsupportable extrapolation from n=1.

Source: https://www.softwareadvice.com/hr/peoplehum-profile/reviews/

### 36. [medium] Zimyo (SMB): a buyer describes a 3+ month setup that never completed, with strong sales and weak delivery — the same sell-then-abandon shape as the Keka and HROne complaints. Dated June 2025.

Kinnari S., Accounting, 2-10 employees, June 2025, 1/5 on all four sub-scores, 'Not a good experience': Pros — 'They sell you really well! That's it. We did not have a good experience even after spending and following up with them for over 3months for the set up.' Cons — 'The support is very weak. No personnel attends you promptly.' Single review; not re-located in the verification pass.

Source: https://www.softwareadvice.com/hr/zimyo-profile/reviews/

### 37. [medium] factoHR (SMB/mid-market, manufacturing-heavy): server timeouts at peak punch times and overtime hours not being credited are the sharpest complaints, the latter carrying an accusation of employer-favouring asymmetry.

Sameer, 20 June 2023 (56 found helpful): 'Server connection times out at peak time... Punch in and out takes 10 minutes!!!' LIPIN C, 14 August 2026: 'when working less hours, updating less hours worked, but works above 8 hours not updated over time worked.' Buyer-side: atul m., Automotive, 5001-10000 employees, April 2025, 2/5: 'Customization options can be limited... the reporting features could be more advanced.'

Source: https://play.google.com/store/apps/details?id=com.hrplug.ess&hl=en_IN

### 38. [high] CHURN TRIGGER #3: outgrowing an SMB tool's rigidity. Buyers leave when a process cannot be modelled and the vendor's answer is 'change your process' or 'raise a ticket for every customisation'.

Keka, May 2023: 'You have to wire your process to fit Keka.' greytHR, Sunitha R., IT services, 51-200 employees, July 2025: 'customizations require support tickets'. greytHR, IT services, 11-50 employees, October 2023, 2/5: 'There was one time when we wanted some modification sandwich leave policy but they denied it.' greytHR aggregated con: 'Leave Module... we are not able to configure our accrual calculations in it.' Corroborated verbatim by the re-verified Emmanual J. review (June 2024): 'Unable to customise the things as per our requirements.'

Source: https://www.softwareadvice.com/hr/greythr-profile/reviews/

### 39. [high] CHURN TRIGGER #4: suite consolidation. SMBs move HR onto whichever suite already holds their finance/productivity stack, and greytHR specifically loses accounts to Zoho on this basis. Zoho's ₹48/user/month entry price and forever-free 5-user tier make this the cheapest landing point in the market.

Zoho People 'Reasons for switching' entries: 'we did not have all features to use in greytHR, and we are using ZOHO workplace which easily integrates with HRMS also'; 'Stopped using Quickbooks for general accounting and HR admin so brought data over to Zoho People'; 'I was switching my accounting, thought to bring everything on zoho'. Price context verified vendor-primary 4 Sep 2026 (Essential HR ₹48/user/month billed annually; free edition up to 5 users; 30-day free trial).

Source: https://www.softwareadvice.com/hr/zoho-people-profile/reviews/

### 40. [medium] CHURN TRIGGER #5: legacy Indian HRMS UX intolerance. Darwinbox's documented wins come from replacing older Indian systems whose navigation buyers found unusable — Adrenalin, HRMantra, Quikchex.

Darwinbox 'Reasons for switching' verbatim: Retail, 10,000+ employees, Dec 2022 — 'Adrenalin HRMS was a very un-intuitive software. The navigation was a pain with big tiles are every time we need to scroll to find where the options are.' IT Services, 201-500 employees, Feb 2023 — 'Quikchex was very complicated and not very user friendly.' IT Services, 501-1000 employees, Nov 2020 — 'many of the features that Darwinbox offered were not present in HR Mantra.' STALENESS FLAG: all three switching events are 2020-2023; whether legacy displacement is still the live enterprise motion in 2026 was not re-tested.

Source: https://www.softwareadvice.com/hr/darwinbox-profile/reviews/

### 41. [low] CHURN TRIGGER #6: personnel change. A meaningful share of switches are attributed simply to a new employer or new HR leader rather than product failure — incumbency is weakly defended by the product itself.

Keka, Hospitality, 1001-5000 employees, July 2025, Reasons for switching: 'With new organisation new HRMS takes place.' Darwinbox, Education, 5001-10,000 employees, Jan 2023: 'New job role in a different company.' Darwinbox, another: 'Regulations from company.' NOTE: 'meaningful share' is not quantified — no count was performed across the switching-reason corpus.

Source: https://www.softwareadvice.com/hr/keka-profile/reviews/

### 42. [medium] CHURN TRIGGER #7: price escalation and value-for-money erosion at renewal. Confirmed to exist as a complaint, but it is thinly evidenced relative to support and mobile-reliability triggers.

RE-VERIFIED 4 Sep 2026: Trustpilot greytHR review by Ashok Kumar, 14 April 2026, 1 star, confirmed present — visible excerpt: 'Greytip Software – Very Poor Experience This software has been extremely disappointing. Pricing is...' (the pricing criticism is truncated in the listing view). Zoho People switching reasons include 'Limited customisation capabilities and high cost even while starting'. Zimyo switching reason: 'It was not being fully utilized and had some concerns for billing.' Base-rate context: greytHR's Trustpilot profile is 3.7/5 with only 8% 1-star across 26 reviews.

Source: https://www.trustpilot.com/review/greythr.com

### 43. [high] CHURN TRIGGER #8: churn runs in both directions — buyers also leave newer UX-led tools back toward payroll-reliability-first tools when the newer tool makes payroll errors. greytHR wins some accounts on exactly this basis, which is the single strongest counterweight to the pain narrative above.

greytHR, Murali N., Information Technology, 51-200 employees, May 2025, Reasons for switching to greytHR: 'We shifted to GreytHR due to repeated errors and easy-going approach (not being serious).' Himanshu K., Computer Software, 51-200 employees, March 2025: 'In 2022 when we started using GreytHR, the other packages like zoho and razorpay had limited features. ADP was too complicated.' Consistent with greytHR's 4.3/5 across 297 reviews.

Source: https://www.softwareadvice.com/hr/greythr-profile/reviews/

### 44. [high] Reporting and analytics is a near-universal secondary complaint across every Indian HRMS in this dataset — specifically the absence of a flexible cross-module report builder. No vendor is credited with solving it. NOTE: Keka now markets a 'Custom Reports Builder' in its Growth tier, so this gap may be closing at the top of Keka's range.

Keka, Haley W., HR Manager, 201-500 employees, 07 Aug 2026: 'A more flexible cross-module report builder with simpler drag-and-drop fields would help.' Darwinbox, May 2026: 'The reporting feature is powerful but not always very intuitive.' factoHR, Apr 2025: 'the reporting features could be more advanced.' HROne, Apr 2023: 'Dashboards and reports are not working properly.' greytHR, Apr 2022: 'reporting is very bad, payroll cant be connected with the bank.' Counter-evidence, keka.com/pricing 4 Sep 2026: the GROWTH tier lists 'Custom Reports Builder' under CORE HR.

Source: https://www.softwaresuggest.com/keka/reviews

### 45. [high] Mobile-vs-web feature parity is a systematic gap: buyers repeatedly report the mobile app cannot do things the web can (shift change, appointment-letter acknowledgement, check-in toggles, roster view, PDF download), forcing employees back to desktop.

greytHR, JOHN PETER.A, 9 July 2026: 'Kindly add a "Shift Change" option to this app as well. Currently I have to update my shift change only on the website.' Keka, Aruna Gouda, 18 August 2026: 'Currently, the Appointment Letter Acknowledgement option is not available in the Keka Mobile App. When we ask for a solution, the response is simply, "Currently, we don't have this option."' Zoho People, Abdallah Tarek, 28 June 2026: 'please can you add a Check-in button in it as the only way to do that is through the browser zoho site.' Darwinbox, Suresh D, 1 July 2026: 'I am unable to download PDF files.'

Source: https://play.google.com/store/apps/details?id=com.greytip.ghress&hl=en_IN

### 46. [high] Session/auth management is broken across the category: forced daily re-login, silent auto-logout and OTP delivery failures are reported for greytHR, Darwinbox, Keka, PeopleStrong, ZingHR and Zoho People — and because login gates the punch, it converts into pay disputes.

greytHR, chikku sajan, 21 October 2025 (33 helpful): 'automatic logout issues. Each time we have to log in again.' greytHR, Ankit Roy, 8 March 2024 (130 helpful): 'it always ask you to relogin in every few day! Their send otp at the login time hardly works!' Darwinbox, Nikhil Sharma, 26 August 2026: 'Earlier this app was fine, the login used to expire in 3 months, now it expires daily.' Keka, Dmitry Jani, 6 July 2026: 'Whenever I try to login the OTP just doesn't come through on my number... I urgently needed salary slips because of my ongoing application with bank.' PeopleStrong, Mr. Brightside, 17 July 2026: 'the app stupidly logs out automatically.'

Source: https://play.google.com/store/apps/details?id=com.greytip.ghress&hl=en_IN

### 47. [high] A distinct, growing end-user objection in 2026: employees perceive HRMS mobile apps as surveillance tools because of always-on location, mandatory selfies and battery-optimisation exemptions. This is an adoption risk HR buyers underweight at purchase, and it is reinforced by vendor packaging — greytHR sells 'GPS Live Tracking' and 'GeoMark+' as paid add-ons and Keka sells 'Continuous Location Punching' in its Strength tier.

Keka, Sachin Bhatnagar, 5 August 2026: 'you can't select to use location while the app in use. you can't have battery optimisation enabled. This works more as a surveillance app than an HR app.' HROne, AJIN THAMAS, 25 August 2026: 'doing a Spy job between employees and employer.' Zimyo, Shaibal Ghosh, 5 January 2024 (19 helpful): 'It's asking for too many permissions and wants to track in real-time.' Vendor-primary corroboration 4 Sep 2026: greythr.com/pricing lists 'GeoMark+, Visage (add-ons)' and 'GPS Live Tracking (Add-on)' under Growth; keka.com/pricing lists 'Selfie clock-in', 'Continuous Location Punching' and 'Geo Fencing' under STRENGTH.

Source: https://play.google.com/store/apps/details?id=com.keka.xhr&hl=en_IN

### 48. [high] UI-change aversion is a real retention risk: when Keka and Darwinbox shipped new UIs in mid-2026, entrenched users demanded the old one back and reported losing visibility of upcoming shifts/rosters. Two of the category's three largest mobile footprints re-skinned within one quarter.

Keka, Jatin Madaan, 1 July 2026: 'The old UI was the best, so many things are missing in the new UI.' Keka, himangshu sarma, 1 July 2026: 'Previously, we could view our upcoming shift timing in the app. However, after the latest update, we are no longer able to see the next day's shift schedule.' Darwinbox, SOURABH SINGH, 28 July 2026: 'Previously app was used to show daywise data of your applied leave or attendance in a month which was a very good interface but now it becomes very clumsy.' Darwinbox's redesign is date-confirmed to 20-21 Aug 2026 (see Sapien finding).

Source: https://play.google.com/store/apps/details?id=com.keka.xhr&hl=en_IN

### 49. [high] COMPLETED AND RE-VERIFIED app-store rating snapshot (India storefront, 4 September 2026). Google Play: PeopleStrong 4.8 (94.5K reviews, 10L+ installs, updated 26 Aug 2026); Keka HR 4.7 (37K, 10L+) — the figure the original report could not capture; Zimyo 4.7 (19.7K, 100K+); ZingHR 4.6 (1.57L, 50L+, updated 20 Aug 2026); Darwinbox 4.6 (1.16L, 10L+, updated 20 Aug 2026); Qandle 4.6 (6.51K, 100K+); greytHR 4.5 (1.13L, 10L+, updated 5 Aug 2026); factoHR 4.4 (19.7K, 500K+); Pocket HRMS 2.0 4.4 (679, 50K+); SAP SuccessFactors 4.4 (45.5K, 5M+); Zoho People 4.3 (5.61K, 1M+, updated 27 Aug 2026); HROne 4.1 (6.14K, 10L+, updated 2 Sept 2026). Apple App Store India (iTunes API): Keka HR 4.74 (7,082 ratings, v3.3.13, released 2026-09-01); Darwinbox 4.60 (13,718, v9.4.5, released 2026-08-21); greytHR 4.55 (18,009); ZingHR 4.47 (5,848).

Six Google Play India listings (PeopleStrong, ZingHR, Darwinbox, greytHR, HROne, Zoho People, Keka) re-read via browser DOM extraction on 4 Sep 2026 and matched the original figures exactly; Keka's previously-missing rating captured as '4.7 star / 37K reviews / 10L+ Downloads'. Two iTunes lookups (country=in) re-confirmed Keka averageUserRating 4.74 / userRatingCount 7,082 and Darwinbox 4.60 / 13,718. The remaining four Play figures and two iTunes figures are carried forward unre-verified. CAVEAT: ordering is more informative than absolute values, and no data source was found to test whether in-app rating prompts inflate these.

Source: https://play.google.com/store/apps/details?id=com.keka.xhr&hl=en_IN

### 50. [high] Keka's own status page shows only short, mobile-API-centric incidents in Jul-Aug 2026 and zero payroll incidents — so Keka's buyer complaints are about service, implementation quality and rigidity rather than platform downtime.

RE-VERIFIED VERBATIM 4 Sep 2026: status.keka.com shows Mobile API partial outages 5 Aug (8 min), 10 Aug (3 min), 25 Aug (5 min, India 01); and on 10 Jul in Central India 02 — Dashboard 22 min, Core HR 16 min, Attendance 32 min. Mobile API is the lowest-uptime component at 99.986%; Attendance 99.974%. The Payroll component shows 100% uptime and 'Operational' across the whole window.

Source: https://status.keka.com/

### 51. [high] NEW (verified vendor primary): pricing transparency splits the market cleanly, and this is itself a buyer-friction finding. greytHR and Zoho People publish exact India prices; Keka and Darwinbox publish none. Keka's pricing page lists tier names and feature lists with no prices at all, and Darwinbox has no pricing page. Any third-party Keka or Darwinbox price quote is therefore unverifiable against the vendor.

Read 4 Sep 2026. greythr.com/pricing: Essential ₹2,495/month (50 employees included) + ₹45/employee above 50; Growth ₹4,495/month + ₹85/employee above 50; Premium 'Custom'; '7-day free trial'; banner claims 'ISO 27001 | SOC II TYPE 2 | GDPR READY | 30,000+ COMPANIES'. zoho.com/people/zohopeople-pricing.html: Free (5 users), ₹48 / ₹96 / ₹144 / ₹192 per user/month billed annually, 30-day free trial, 'Have more than 500 users? Ask for a price quote'. keka.com/pricing: tiers FOUNDATION / STRENGTH / GROWTH rendered with feature lists and 'Free Trial' buttons but NO price of any kind — a DOM scan confirmed the page contains no '₹' character; the FAQ 'Is there a setup or implementation fee?' is collapsed and unanswered in the served markup. darwinbox.com/pricing returns 'oops! We couldn't find this page' with a 'Schedule a Demo' CTA.

Source: https://www.greythr.com/pricing/

### 52. [low] DOWNGRADED AND RELABELLED — POSITIONING/THIRD-PARTY CLAIM, UNVERIFIED: a third-party listing quotes Keka at Foundation ₹9,999/month (up to 100 employees), Strength ₹12,999/month, Growth ₹15,999/month. The tier NAMES are confirmed correct against keka.com, but the PRICES cannot be verified because Keka publishes no prices. Do not present these as Keka's pricing.

SoftwareSuggest Keka page, re-read 4 Sep 2026: Foundation ₹9,999 Per Month, Strength ₹12,999 Per Month, Growth ₹15,999 Per Month; the page states 'pricing information was last updated on 30th August 2026' and that a free trial is available. Cross-check against keka.com/pricing the same day: the tier names FOUNDATION, STRENGTH and GROWTH match exactly, but the vendor page contains no prices (no '₹' character present anywhere in the rendered page).

Source: https://www.softwaresuggest.com/keka

### 53. [medium] Competitive-evaluation sets revealed by buyers' own words: Keka buyers cross-shop greytHR, Darwinbox and OrangeHRM; greytHR loses to Keka/BambooHR when support fails; Zoho People wins against greytHR, HRMantra, QuickBooks and Teamwave; Darwinbox wins against Adrenalin, HRMantra and Quikchex; Keka wins against HROne.

The greytHR→Keka/BambooHR path is RE-VERIFIED VERBATIM (Emmanual J., June 2024: 'looking to migrate to another platform like keka, bamboo, etc. We are exploring them'). The remainder come from SoftwareSuggest 'What other products like Keka have you used or evaluated?' answers (greytHR; greytHR + Darwinbox HR; OrangeHRM) and Software Advice switching-reason fields, and were not individually re-located.

Source: https://www.softwareadvice.com/hr/greythr-profile/reviews/?page=3

### 54. [low] Public consumer-complaint forums are NOT a meaningful channel for Indian HRMS grievances — contract and billing disputes surface on review sites and app stores instead.

consumercomplaints.in search for 'greytHR' returned 1 result: a login-access complaint filed against an employer (Devyani International) by an employee, not a billing or contract dispute against the vendor. Not re-tested in the verification pass.

Source: https://www.consumercomplaints.in/?search=greytHR

## Opportunities

- Darwinbox's Sapien redesign is a precisely dated, currently-open wound (Android 20 Aug 2026, iOS 21 Aug 2026) affecting the largest enterprise mobile footprint in India. Competitive displacement messaging aimed at Darwinbox enterprise accounts has a narrow, evidenced window — but verify before acting, because a fix could ship within weeks.
- Attendance capture on mobile is the load-bearing transaction in the Indian market: it gates pay, and every vendor sampled fails at it in some way (geofence false negatives, punch timeouts, checked-in-not-checked-out, selfie crashes, biometric sync lag of 2-3 days). A product that treats offline-tolerant, provably-correct attendance capture as the core promise rather than a module would attack a gap no incumbent has closed.
- Support model, not features, is the most repeated churn trigger in the negative tail. A named account owner with a published response SLA is a cheap differentiator against greytHR's shared-inbox model and Zoho's ticket queue.
- Pricing transparency is a live wedge: greytHR and Zoho publish exact India prices while Keka and Darwinbox publish none. Publishing real prices plus a genuine self-serve trial attacks the exact evaluation friction Keka buyers complain about.
- No vendor is credited with a flexible cross-module report builder; Keka has only just put one in its top tier. Reporting remains the most universal unmet secondary need.
- The surveillance backlash (always-on location, mandatory selfies, battery-optimisation exemptions) is growing among employees while buyers underweight it. An explicitly privacy-minimal attendance design is a differentiator with the end-user population that drives app-store ratings and internal adoption.
- Two-way churn is the important nuance: greytHR wins accounts back from UX-led tools when those tools make payroll errors. Payroll correctness is the retention floor; UX alone does not hold an account.

## Open questions

- No G2, Gartner Peer Insights, TrustRadius or Reddit evidence exists in this dataset across two research passes. The pain taxonomy may be skewed by the two sources that were reachable (Software Advice/Gartner Digital Markets and Google Play).
- No actual churn or renewal-rate data was found for any vendor. Every 'churn trigger' here is inferred from stated switching reasons and expressed intent, not from observed logo loss.
- Keka's and Darwinbox's real India price points remain unknown — both are fully sales-gated. The ₹9,999/12,999/15,999 Keka figures circulating on third-party sites could not be corroborated.
- Were the Darwinbox Sapien regressions fixed after 4 Sep 2026? iOS v9.4.5 shipped 21 Aug; a follow-up check of both stores in 2-4 weeks would establish whether this is a transient release defect or a sustained quality problem.
- What is greytHR NAVOS, and is it an AI product? It is listed as included in all plans but its product page did not resolve.
- Is Darwinbox Cortex generally available or vapourware? It was banner-marketed as 'early access' on 4 Sep 2026.
- Is Keka's free trial now a real self-serve trial? The 2021 'demo with fake data' complaint conflicts with current Free Trial CTAs on every tier; this was not tested by actually signing up.
- Are app-store ratings inflated by in-app rating prompts to captive users? This was asserted in the original report but no evidence for it was found, and it remains untested.
- greytHR reviews from Aug 2025 and Nov 2024, and several Keka reviews, could not be re-located within the verification budget (297 and 90 reviews across paginated listings). They are carried forward at reduced confidence rather than confirmed.

## Retracted

- RETRACTED (wrong number): 'greytHR's status page shows 12 incidents in the 90 days to 4 Sep 2026.' The page shows 14 incidents. Two dates were also wrong (Jun 9 → Jun 10; Jul 8 → Jul 07), consistent with rolling-window drift. Replaced with a corrected finding; the underlying interpretation (frequent but very short outages) survives.
- RETRACTED (unsupportable superlative from n=1): peopleHum characterised as 'the clearest documented example of vendor lock-in being weaponised in the Indian HRMS market.' The review exists and is quoted accurately, but it is a single anonymous 2020 review out of 25 on a profile averaging 4.2/5, six years stale, with no vendor response. Retained only as a low-confidence unverified allegation with the base rate attached.
- RETRACTED (unverifiable accusation): the Pocket HRMS 'fake 5-star reviews added' allegation. There is no method available to verify or falsify review authenticity, the claim rests on one reviewer's assertion, and the original report's supporting observation (clusters of similar 5-star reviews) is not evidence of fraud. The unrelated forced-migration/redirect-loop complaint is dropped too: two reviews of a 679-rating app do not support a market-level finding.
- RETRACTED (stale, non-probative): the PeopleStrong December 2018 review 'Pathetic software and worst implementation team.' Eight years old, single review, and the original report itself conceded it 'may be fixed.' A 2018 implementation complaint cannot inform a 2026 market view.
- RETRACTED (comparative conclusion contradicted by the report's own data): 'SAP SuccessFactors ... evidence that the "safe" enterprise choice has a worse mobile end-user experience than Indian challengers.' The report's own rating snapshot puts SAP SuccessFactors at 4.4 on Google Play — above HROne (4.1), Zoho People (4.3) and factoHR (4.4-equal), and the reviews cited are explicitly global rather than India-filtered. The comparison is unsupported and the whole SAP finding has been dropped as out-of-scope for an India dimension.
- RETRACTED (unmeasured superlative, reframed not removed): 'support-SLA collapse is the single most repeated buyer complaint across Indian HRMS incumbents.' No frequency count was performed over any review corpus. Reframed as 'the most frequently recurring theme in the negative reviews sampled,' with the selection-bias caveat attached.
- RETRACTED AS FACT, RETAINED AS LABELLED THIRD-PARTY DATA: Keka pricing of ₹9,999 / ₹12,999 / ₹15,999 per month. Verification established that keka.com/pricing publishes no prices at all (no '₹' character anywhere on the rendered page), so these figures cannot be corroborated against the vendor. Tier names are confirmed correct; prices are now explicitly flagged 'positioning claim, unverified' at low confidence.
- RETRACTED (unevidenced speculation): 'HRMS app ratings are systematically inflated by in-app rating prompts to a captive user base.' No evidence for this mechanism was found in either pass. Moved to open_questions as an untested hypothesis rather than presented as a caveat of fact.
- DOWNGRADED, NOT RETRACTED: the Keka 'Rs. 35,000 wasted' figure. One reviewer's self-reported, uncorroborated, ~3-year-old number; now flagged low confidence with an explicit warning not to use it as an implementation-cost benchmark.
- DOWNGRADED, NOT RETRACTED: the Keka '25 spreadsheets / free trial is a demo with fake data' finding. December 2021, and keka.com now shows Free Trial CTAs on all three tiers — counter-evidence is recorded inline and confidence cut to low pending an actual trial signup.
- NOTE ON A NEAR-MISS: the report's claim that Software Advice's Keka profile is contaminated with macOS file-archiver reviews initially appeared to be false — a first-page check found nothing. It is CORRECT: the contaminating reviews sit on page 4 of 4 (reviews 76-90). The claim was upgraded to high confidence with a page-specific URL, not retracted.

## Competitors

### greytHR (Greytip Software)
- **segment**: SMB and lower mid-market (largely 11-500 employees), payroll/compliance-first
- **positioning**: Payroll and statutory compliance engine for Indian SMBs; wins on payroll depth and price, defended by the switching cost of payroll history
- **pricing**: VERIFIED vendor primary 4 Sep 2026 (greythr.com/pricing): Essential ₹2,495/month base, 50 employees included, ₹45/employee above 50 (Payroll + Leave + CoreHR Basic). Growth ₹4,495/month base, 50 included, ₹85/employee above 50 (adds advanced attendance, shift management, overtime, geo-fencing). Premium = custom quote, 'all modules included', vendor claims ~30% saving vs Growth + add-ons. 7-day free trial. PMS, Expense, SSO/API, Recruit, Alumni Portal, GPS Live Tracking are add-ons even on Growth.
- **ai_capabilities**: unknown — no AI product could be verified. A module named 'greytHR NAVOS' is listed as included in all plans on the pricing page and appears under 'Product Extend' in site navigation, but its greythr.com/navos/ page did not return content to a server-side fetch, so its capabilities are unverified. Do not describe NAVOS as AI without further checking.
- **strengths**: Deep Indian payroll/statutory compliance is the most-cited reason buyers pick and return to it; Largest install base signal in the dataset: 1.13L Play reviews, 10L+ installs, 297 Software Advice reviews (verified 4 Sep 2026); Aggregate sentiment is solidly positive despite the complaint tail: 4.3/5 Software Advice, 4.5 Google Play, Trustpilot 3.7 with only 8% 1-star; Publishes a public status page with per-cluster uptime — transparency Darwinbox does not match; Publishes exact prices, unlike Keka and Darwinbox; Actively responds to negative app reviews within 1-3 days; Wins accounts back from newer UX-led tools when those tools make payroll errors
- **weaknesses**: No dedicated CS owner: tickets handled by a different person from a shared inbox (Aug 2025, not re-verified); Support latency reported in months; 4-month and 6-month unresolved tickets cited (2025); Support agents reportedly lack payroll domain knowledge (Aug 2025, not re-verified); Recurring monthly payroll calculation errors and settings resetting between months (Nov 2024, not re-verified); Buyers report an inability to customise to their requirements, and customisations require support tickets (RE-VERIFIED verbatim, Jun 2024); Product changes shipped without customer notification; unannounced maintenance windows (RE-VERIFIED, May 2026 — most recent review on profile); 14 short cluster outages in the 90 days to 4 Sep 2026 (longest 19 min) — small in magnitude but frequent, and not proactively communicated; Mobile app chronically slow to open, forced re-login, OTP failures; users attribute LOP to it (Aug 2026); Finance/accounts stakeholders are a distinct dissatisfied persona: 'the most pathetic Payroll system anyone can get' (RE-VERIFIED verbatim); Leave module cannot model custom accrual rules; Performance Management is an add-on at every published tier — substantiating the recurring 'PMS is limited' complaint; Attendance is gated to the ₹4,495 Growth tier, not the ₹2,495 entry tier

### Keka
- **segment**: SMB and mid-market (11-500 employees), IT/services-heavy
- **positioning**: Modern, employee-experience-led HRMS; wins on UI and price against greytHR/HROne
- **pricing**: SALES-GATED. VERIFIED 4 Sep 2026: keka.com/pricing displays tiers FOUNDATION / STRENGTH / GROWTH with full feature lists and 'Free Trial' buttons but NO prices — the rendered page contains no '₹' character, and the 'Is there a setup or implementation fee?' FAQ is collapsed with no answer in the markup. Third-party SoftwareSuggest quotes ₹9,999 / ₹12,999 / ₹15,999 per month (updated 30 Aug 2026) — tier names match the vendor, prices are UNVERIFIED and must not be presented as fact.
- **ai_capabilities**: POSITIONING CLAIM, UNVERIFIED: keka.com navigation and footer list a 'Keka AI' product under its 'PeopleOS' umbrella, alongside a 'Marketplace'. No capability detail was verified and no independent evidence of quality was found.
- **strengths**: UI/UX and ease of use are the dominant reason buyers choose it over greytHR and HROne; Highest Apple App Store India rating in the set: 4.74 across 7,082 ratings (verified via iTunes API, v3.3.13 released 1 Sep 2026); Google Play India 4.7 across 37K reviews, 10L+ installs (newly captured 4 Sep 2026); Public status page with component-level uptime; zero payroll incidents recorded — Payroll shows 100% uptime; Ships a 'Custom Reports Builder' in the Growth tier, addressing the category-wide report-builder gap; Employee self-service and directory well liked
- **weaknesses**: Implementation stalls: 2.5-3 months post-payment with no completion; project team dictates meeting times (Sep 2024); Unhonoured refund commitment for a discontinued module; calls dropped without callback (Apr 2026 — the most recent review on its Software Advice profile); Pre-sale misrepresentation alleged: limitations not disclosed in demo, hidden add-on costs after payment, a promised biometric integration later declared impossible; Hard-wired workflows: 'you have to wire your process to fit Keka'; change requests slow (May 2023 — staleness flagged); Support remedy for defects is sometimes to make employees redo work (e.g. re-submit 2 weeks of timesheets); Wrong tax computation reported for FY2023-24; Biometric attendance sync lags 2-3 days or fails; Mid-2026 UI update lost users' visibility of upcoming shift/roster; entrenched users asked for the old UI back; Mobile app lacks web features (e.g. appointment-letter acknowledgement); Location/selfie punching perceived as surveillance; continuous location punching sits in the paid Strength tier; Publishes no prices, forcing every buyer through sales — friction for self-serve SMB evaluation

### Darwinbox
- **segment**: Mid-market and enterprise (500-10,000+ employees), multi-country
- **positioning**: Enterprise HCM suite displacing legacy Indian systems (Adrenalin, HRMantra, Quikchex) and competing with SAP/Workday
- **pricing**: SALES-GATED, NO PUBLIC PRICING. VERIFIED 4 Sep 2026: darwinbox.com/pricing returns 'oops! We couldn't find this page'; the site's only conversion path is 'Schedule a Demo'. No India price point could be established from any source.
- **ai_capabilities**: POSITIONING CLAIMS, UNVERIFIED: as of 4 Sep 2026 darwinbox.com carries a site-wide banner reading 'The next-generation of HCM is here. Meet Darwinbox Cortex. ✨ Get early access.' Its Google Play listing separately markets 'Darwinbox Sense' GenAI insights and an in-app 'AI Super Agent' for HR/IT/Finance tasks. All vendor self-description; no independent evidence of capability or quality was found, and Cortex is explicitly pre-general-availability.
- **strengths**: Wins enterprise deals on breadth and on legacy-UX displacement — buyers name Adrenalin, HRMantra and Quikchex as what they left (2020-2023 evidence; staleness flagged); Largest enterprise-scale mobile footprint in India in this dataset: 1.16L Play reviews / 10L+ installs, plus 13,718 Apple India ratings (both verified 4 Sep 2026); Highly rated in aggregate: 4.6 Google Play, 4.60 Apple App Store India
- **weaknesses**: LIVE INCIDENT: the 'Sapien' mobile redesign shipped 20 Aug 2026 (Android) / 21 Aug 2026 (iOS v9.4.5) and drew immediate regression reports — launch crashes, forced daily re-login, attendance not registering inside geofence, blank timesheets, no rollback option; Selfie-attendance crash on Samsung/Android 15 (v9.4.2); face-recognition attendance described as unreliable; Google sign-in via in-app WebView — publicly flagged as a security anti-pattern (Aug 2026, re-verified present on the listing); Navigation depth: 'like using all the smaller streets to avoid paying tolls' (Utilities, 1001-5000 employees, Jun 2026, 1/5); Custom report building unintuitive and slow; page-load lags between sections; Bulk upload cumbersome; goals cannot be backdated; No public status page — status.darwinbox.com redirects to a login then to the marketing site, so buyers cannot diligence incident history (re-verified); No public pricing at all; Perceived as pricey versus competitors

### Zoho People
- **segment**: SMB (2-200 employees), price-sensitive, often already on the Zoho suite
- **positioning**: Cheapest credible HRMS; wins by suite gravity from Zoho Workplace/Books/Payroll and against QuickBooks. Vendor now positions the product as 'AI-first HR software'.
- **pricing**: VERIFIED vendor primary 4 Sep 2026 (zoho.com/people/zohopeople-pricing.html, India storefront): FREE edition forever for up to 5 users (employee database, time-off/leave, document management only). Essential HR ₹48/user/month billed annually; Professional ₹96; Premium ₹144; Enterprise ₹192. Local taxes charged in addition. 30-day free trial, no forced contracts. Over 500 users = custom quote.
- **ai_capabilities**: POSITIONING CLAIM, UNVERIFIED: the vendor's own page title reads 'AI-first HR software | HRMS Solution | Zoho People' as of 4 Sep 2026. No specific AI feature was verified and no independent quality evidence was found.
- **strengths**: Suite consolidation is a repeatedly cited switching reason — buyers move HR to Zoho because finance/productivity already is; Cheapest credible entry point in the market at ₹48/user/month, with a genuinely free 5-user tier (verified vendor primary); Real 30-day self-serve free trial with no forced contract — the exact thing Keka is criticised for not offering; Largest review volume in the SMB set and a solid aggregate: 4.4/5 across 359 Software Advice reviews, most recent Aug 2026
- **weaknesses**: Support access is the top complaint: 'Difficult to get assistance from the zoho team. Customer support is really bad' (Dec 2025, re-verified); 'you will be stuck if you want help in some urgency' (Jun 2026, re-verified); Configuration sprawl: hidden functions, settings scattered across menus, role/permission and form-level access hard to reason about; Attendance and time tracking are excluded from the free edition — confirmed against the vendor's own pricing page; Mobile check-in/check-out is the most-failed function, chronic from 2020 to Jul 2026 (checked in but not checked out, silent location failures, long spinners); Lowest Google Play rating of the major SMB suites except HROne: 4.3 across 5.61K reviews; Vendor publicly deflects configuration complaints to 'your organization's administrator'

### HROne
- **segment**: SMB and mid-market
- **positioning**: Positions on simplicity — Play listing tagline 'The Simplest HR software'
- **pricing**: unknown — not checked in either pass
- **ai_capabilities**: unknown
- **strengths**: Substantial installed base: 10L+ Google Play installs (verified 4 Sep 2026); Actively maintained — app updated 2 Sept 2026
- **weaknesses**: Lowest Google Play rating of the eleven Indian HRMS apps sampled: 4.1 across 6.14K reviews; End-user complaints concentrate on battery drain, slow/white-screen launches, selfie-attendance loops and no offline attendance; Support posture reported as dismissive: 'they cooly say "that's how app is supposed to work", take it or leave it!!!' (Mar 2026); Shift-change logic bug: 'If the shift time changes then time goes to the previous day' (Jul 2026); Its only Trustpilot review is 1-star, alleging pre-sale false promises and post-payment service collapse (Jul 2025) — n=1, treat as anecdote; Vendor claim of '1500+ brands' on its Play listing is self-reported and unverified
