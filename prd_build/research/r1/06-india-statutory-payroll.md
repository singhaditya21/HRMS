# [r1] india-statutory-payroll

## Verification notes

SCOPE AND METHOD. This was an adversarial re-verification pass, not a supportive one. I re-fetched primary gazette PDFs (Code on Wages 2019, Code on Social Security 2020 as-on-21-Nov-2025, DPDP Rules 2025), extracted their text locally, and grep-verified the exact quoted provisions rather than trusting the original report's transcriptions. I also re-fetched the live ESIC, EPFO, incometax.gov.in, Odisha CT&GST and aggregator pages. IMPORTANT LIMITATION: the session's WebSearch budget (200/200) was exhausted before I issued a single search, so every check was a direct URL fetch. That constrained what I could disprove — several items I would have chased with search are marked low rather than retracted, and I say so explicitly below.

WHAT WAS VERIFIED VERBATIM AGAINST PRIMARY SOURCES (unchanged or upgraded): Code on Wages s.14, s.16, s.17(1)-(4), s.18(3)-(5), s.26, s.8(4), s.9. Code on Social Security s.2(88) both provisos and the 15%-in-kind Explanation, s.2(89), s.53, s.54, s.55, s.64-s.67, First Schedule, s.164. DPDP Rules 1, 6, 7, 8, 13(4), 15 and the Third Schedule, from the gazette PDF I downloaded and parsed. ESIC coverage/contribution/wages pages. EPFO EPS/EDLI/EPF-Scheme pages and the full circulars index. incometax.gov.in AY 2026-27 slab, rebate and surcharge tables, plus live portal announcements. EY's 21 Nov 2025 alert (PDF text-extracted, S.O. numbers recovered). KPMG Flash Alerts 2026-127 and 2026-153 (both re-fetched; 2026-153 yielded gazette numbers S.O. 2698(E) and S.O. 2701(E) that the original report lacked).

FOUR SUBSTANTIVE ADDITIONS, all primary-verified, none padding: (1) CoSS s.164(2)(b) keeps the EPF/EPS/EDLI Schemes and ESI rules alive for one year from 21 Nov 2025 — this is the statutory reason both regimes appear in official material and it dates the hard cutover to ~21 Nov 2026. The original report flagged the symptom and missed the cause. (2) First Schedule: EPF applies at 20+ employees, gratuity at 10+ for shops/establishments — core applicability logic the report omitted entirely. (3) The Income Tax portal still says TDS/TCS correction statements for Tax Year 2026-27 'will be enabled shortly' as of 1 Sep 2026. (4) ESIC's own site is written entirely against the repealed ESI Act 1948 and its coverage page was last reviewed 2025-04-04 with statistics as on 31 March 2023 — the regulator's primary material is itself stale.

MATERIAL CORRECTIONS MADE: The DPDP Rule 8(2) 48-hour pre-erasure notice was presented as a general obligation; the gazette shows Rule 8(1)-(2) bind only Third Schedule classes (large e-commerce, online gaming, social media), not employers. The creche 'threshold conflict' was overstated — both instruments say 50; the real issue is that CoSS s.67 makes the number prescribable. The medical bonus was misquoted ('such higher amount as may be prescribed' vs the actual 'such amount as may be notified') and its conditionality on free pre/post-natal care was omitted. Minimum-wage revision is 'ordinarily' at intervals not exceeding five years, not an unqualified requirement. The F&F two-working-day rule does not override other laws (s.17(4)). EPF Scheme 2026 commences on publication (29 June 2026), not 1 July. The report's caveat about the incometax.gov.in Downloads page not listing TDS forms was a bad inference — that page never carried Form 16/24Q under the 1961 Act either.

THE MAIN FAILURE MODE FOUND WAS FABRICATED-LOOKING PRECISION IN VENDOR CONTENT, exactly as briefed. The TDS section/form renumbering block was the worst offender: I re-fetched the cited ClearTax page and it supports only s.392/393/394 and Forms 130/131/133/138, with no CBDT notification cited. The remaining mappings the report attributed to it (115BAC→202, Form 26AS→168, 12BB→124, 12B→127, 80C→123, 80D→126, 80E→129, 80G→127) are not on that page, and the list contains an internal collision — 127 assigned to both Form 12B and section 80G. Retracted. The perquisite-valuation and 8-city HRA block likewise cites no notification or rule; retracted.

WHAT I COULD NOT SETTLE, AND WHERE I DELIBERATELY DID NOT OVERREACH: The Odisha PT repeal is the biggest downgrade. The state's own PT page, fetched September 2026, still presents the 2000 Act as fully operative with live rates and monthly deduction duties and carries no repeal notice; both cited outlets were unreachable. I downgraded it to low rather than retracting, because a government site lagging a four-month-old ordinance is entirely normal — but nobody should remove Odisha from a PT table on this evidence. Karnataka PT could not be reached at all (404 and DNS failure across three primary URLs), so I kept the 'sources materially disagree' finding, which I verified by inspection, while refusing to endorse either rate table.

TRUST LEVEL. High for everything sourced to the three gazette PDFs and the ESIC/EPFO/incometax.gov.in live pages — those I read directly. Medium for the KPMG and EY analyst alerts, which I re-fetched and which cite gazette numbers but which I could not check against the gazettes themselves. Low for professional tax rates, labour welfare fund amounts, TDS renumbering, POSH portal obligations and anything else resting on aggregator or vendor content — and I would not ship code against any of those without a state gazette or CBDT notification in hand. Roughly 60 percent of the report's load-bearing content is now anchored to text I personally read in a primary source; the remainder is explicitly marked as assumption.

## Key findings (65)

### 1. [high] REGIME CHANGE: all four Labour Codes came into force nationwide on 21 November 2025 via four gazette notifications, replacing 29 central labour laws. IMPORTANT CORRECTION to the original framing: this is not a clean cutover. The government's own release confirmed that relevant provisions of the existing labour laws remain in force during a transition period, so an India payroll engine must run BOTH models concurrently rather than treat the pre-2025 model as simply obsolete.

EY Alert PDF re-fetched and text-extracted directly (verified verbatim): 'The Government of India has made effective all the following 4 Labour Codes starting 21 November 2025... These codes will replace 29 existing central labour laws and are applicable across the country.' Footnote 2 of the same PDF gives the notifications as 'S.O. 5319(E); S.O. 5320(E); S.O. 5322(E) and S.O. 5321(E)'; footnote 1 cites PIB PRID 2192463. The same alert states: 'to ease the transition, the release confirms that the relevant provisions of existing labour laws will remain in force during the transition period' and 'While the Codes are now in force nationwide, supporting rules under both central and state jurisdictions are still to be notified.'

Source: https://www.ey.com/content/dam/ey-unified-site/ey-com/en-in/alerts-hub/2025/11/new-labour-codes-implemented-across-the-country-effective-21-november-2025.pdf

### 2. [high] THE SINGLE MOST USEFUL DATE IN THIS DIMENSION, AND THE ONE THE ORIGINAL REPORT MISSED: Code on Social Security s.164(2)(b) keeps the EPF Scheme 1952, EDLI Scheme 1976, EPS 1995 and all rules/regulations/schemes under the ESI Act 1948 in force, to the extent not inconsistent with the Code, for ONE YEAR from commencement — i.e. until on or about 21 November 2026. This is the statutory basis for the parallel-regime problem, and it dates the hard cutover.

Gazette text of the Code on Social Security 2020 (consolidated '[As on the 21th November, 2025]' version), s.164(2)(b), extracted verbatim from the PDF: 'the Employees' Provident Funds Scheme, 1952, the Employees' Deposit Linked Insurance Scheme, 1976, the Employees' Pension Scheme, 1995 and the Tribunal (Procedure) Rules, 1997 framed or made under the Employees' Provident Funds and Miscellaneous Provisions Act, 1952 (19 of 1952) and the rules, regulations and schemes made or framed under the Employees' State Insurance Act, 1948 (34 of 1948), shall remain in force, to the extent they are not inconsistent with the provisions of this Code for a period of one year from the date of commencement of this Code'. s.164(1) repeals nine enactments including the ESI Act 1948, the EPF & MP Act 1952, the Maternity Benefit Act 1961 and the Payment of Gratuity Act 1972. Also relevant: s.163 bars 'removal of difficulties' orders after two years from commencement.

Source: https://www.indiacode.nic.in/bitstream/123456789/16823/1/aA2020-36.pdf

### 3. [high] Final Central Rules under all four Labour Codes were notified on 8 May 2026: Code on Wages (Central) Rules 2026, Social Security (Central) Rules 2026, Industrial Relations (Central) Rules 2026, OSHWC (Central) Rules 2026. Verified detail beyond the original report: the wage conversion formula is daily rate divided by 8 for hourly and multiplied by 26 for monthly, and the re-skilling fund contribution is 15 days' last drawn wages payable within 10 days of retrenchment.

KPMG GMS Flash Alert 2026-127 re-fetched (published 22 May 2026), quoting the rules: 'Where a daily wage is fixed, it shall be divided by eight to determine the hourly rate and multiplied by 26 to determine the monthly rate'; 'does not exceed 48 hours per week'; 'overtime wages at twice the regular rate'; 'No worker shall be allowed to work overtime exceeding 144 hours in any quarter of a year'; creche 'Every establishment with 50 or more employees'; grievance committees at '20 or more workers'; works committees at '100 or more workers'; contract worker 'Annual wage increment of at least two per cent'; re-skilling fund 'an amount equal to 15 days of last drawn wages' within 10 days of retrenchment. The 15-days re-skilling figure is independently corroborated by the EY alert of 21 Nov 2025.

Source: https://kpmg.com/xx/en/our-insights/gms-flash-alert/2026/flash-alert-2026-127.html

### 4. [medium] Draft Central Rules were published 30 December 2025 with 30-day (IR Code) and 45-day (other three codes) comment windows; the finals landed roughly four months later and are titled '(Central) Rules, 2026' against drafts titled '(Central) Rules, 2025'. Anything built against the December 2025 drafts is stale.

KPMG GMS Flash Alert 2026-007. Not independently re-verified in this pass (the earlier alert was not re-fetched), but consistent with the confirmed 8 May 2026 final-notification date in Flash Alert 2026-127, which was re-fetched and verified.

Source: https://kpmg.com/xx/en/our-insights/gms-flash-alert/2026/flash-alert-2026-007.html

### 5. [high] THE UNIFORM 'WAGES' DEFINITION WITH THE 50% PROVISO IS THE HARDEST SINGLE CALCULATION IN THE BUILD. Identical text in Code on Wages s.2(y) and Code on Social Security s.2(88): if excluded components exceed one-half of all remuneration, the excess is deemed wages and added back. It re-bases PF, gratuity, bonus, leave encashment, overtime and maternity benefit simultaneously.

VERIFIED VERBATIM against the gazette PDF text of the Code on Social Security 2020, s.2(88): 'Provided that for calculating the wages under this clause, if payments made by the employer to the employee under sub-clauses (a) to (i) exceeds one-half, or such other per cent. as may be notified by the Central Government, of the all remuneration calculated under this clause, the amount which exceeds such one-half, or the per cent. so notified, shall be deemed as remuneration and shall be accordingly added in wages under this clause'. Explanation confirmed verbatim: remuneration in kind 'which does not exceed fifteen per cent. of the total wages payable to him, shall be deemed to form part of the wages'.

Source: https://www.indiacode.nic.in/bitstream/123456789/16823/1/aA2020-36.pdf

### 6. [high] The 50% rule defines TWO DIFFERENT wage bases for different purposes within the same payslip. The add-back base excludes conveyance/HRA/award-settlement/overtime, but the equal-pay and payment-of-wages base includes them. A payroll engine needs at least two concurrent 'wages' computations per employee per period.

VERIFIED VERBATIM against the gazette PDF, Code on Social Security s.2(88) second proviso: 'Provided further that for the purpose of equal wages to all genders and for the purpose of payment of wages, the emoluments specified in sub-clauses (d), (f), (g) and (h) shall be taken for computation of wage.'

Source: https://www.indiacode.nic.in/bitstream/123456789/16823/1/aA2020-36.pdf

### 7. [high] Full-and-final settlement must be paid within TWO WORKING DAYS of removal, dismissal, retrenchment or resignation. CAVEAT ADDED ON VERIFICATION: s.17(3) lets the appropriate Government set a different time limit, AND s.17(4) expressly preserves any time limit in any other law in force — so state Shops & Establishments timelines are not overridden and the engine must resolve per-state.

VERIFIED VERBATIM against the Code on Wages 2019 gazette PDF, s.17(2): '...the wages payable to him shall be paid within two working days of his removal, dismissal, retrenchment or, as the case may be, his resignation.' s.17(3): 'the appropriate Government may, provide any other time limit for payment of wages where it considers reasonable'. s.17(4): 'Nothing contained in sub-section (1) or sub-section (2) shall affect any time limit for payment of wages provided in any other law for the time being in force.'

Source: https://egazette.gov.in/WriteReadData/2019/210356.pdf

### 8. [high] Wage payment timing under Code on Wages s.17(1): daily — end of shift; weekly — last working day before the weekly holiday; fortnightly — before end of the second day after the fortnight; monthly — before the expiry of the 7th day of the succeeding month. Wage period must not exceed one month (s.16).

Code on Wages 2019 gazette PDF, ss.16 and 17(1). s.16 verified verbatim in this pass: 'The employer shall fix the wage period for employees either as daily or weekly or fortnightly or monthly subject to the condition that no wage period in respect of any [employee shall be more than a month]'.

Source: https://egazette.gov.in/WriteReadData/2019/210356.pdf

### 9. [high] Total deductions from wages in any wage period are capped at 50% of wages; any excess must be recovered in a prescribed manner. The engine must enforce the cap across the whole deduction stack and carry forward the overflow. Where the employer deducts but fails to deposit, the employee is not held responsible.

VERIFIED VERBATIM against the Code on Wages 2019 gazette PDF, s.18(3)-(5): 'the total amount of deductions which may be made under sub-section (2) in any wage period from the wages of an employee shall not exceed fifty per cent. of such wages. (4) Where the total deductions authorised under sub-section (2) exceed fifty per cent. of the wages, the excess may be recovered in such manner, as may be prescribed. (5) Where any deduction is made by the employer from the wages of an employee under this section but not deposited... such employee shall not be held responsible for such default of the employer.'

Source: https://egazette.gov.in/WriteReadData/2019/210356.pdf

### 10. [high] Overtime must be paid at not less than TWICE the normal rate of wages (Code on Wages s.14).

VERIFIED VERBATIM against the Code on Wages 2019 gazette PDF, s.14: '...for every hour or for part of an hour so worked in excess, at the overtime rate which shall not be less than twice the normal rate of wages.'

Source: https://egazette.gov.in/WriteReadData/2019/210356.pdf

### 11. [high] EPF APPLICABILITY THRESHOLD (missing from the original report, verified here): under the Code on Social Security First Schedule, Chapter III (Employees' Provident Fund) applies to 'Every establishment in which twenty or more employees are employed' — 20, not 10. Gratuity (Chapter V) applies to every factory, mine, oilfield, plantation, port and railway company, plus every shop or establishment with ten or more employees on any day of the preceding twelve months.

VERIFIED VERBATIM from the Code on Social Security 2020 gazette PDF, First Schedule [See sections 1(4), (8) and 152(1)]: 'III | Employees' Provident Fund | Every establishment in which twenty or more employees are employed.' and 'V | Gratuity | (a) every factory, mine, oilfield, plantation, port and railway company; and (b) every shop or establishment in which ten or more employees are employed, or were employed, on any day of the preceding twelve months'. s.1(5) additionally allows voluntary application of Chapter III by agreement between employer and a majority of employees, notified by the Central PF Commissioner — a per-establishment override the engine must carry.

Source: https://www.indiacode.nic.in/bitstream/123456789/16823/1/aA2020-36.pdf

### 12. [medium] EPF: a wholly NEW Employees' Provident Funds Scheme, 2026 was notified vide G.S.R. 525(E) dated 29 June 2026 under s.15(1)(a) of the Code on Social Security. CORRECTION to the original report: the scheme text says it comes into force 'on the date of its publication in the Official Gazette', i.e. 29 June 2026 — the widely reported '1 July 2026' commencement is secondary reporting, not the scheme text.

Reproduced gazette text: 'G.S.R. 525(E).— In exercise of the powers conferred by clause (a) of sub-section (1) of section 15 of the Code on Social Security (36 of 2020)... the Central Government, hereby makes the following Scheme', dated 29 June 2026; 'It shall come into force on the date of its publication in the Official Gazette.' NOTE ON STALENESS OF OFFICIAL MATERIAL: EPFO's own website, fetched September 2026, still titles its legal-framework page 'EPF Scheme 1952' and describes the 1952 Scheme as the operative instrument — consistent with the one-year survival window in CoSS s.164(2)(b).

Source: https://taxguru.in/corporate-law/employees-provident-funds-scheme-2026.html

### 13. [high] EPF wage ceiling remains Rs 15,000/month, re-fixed under the new statutory basis by gazette S.O. 2702(E) dated 29 May 2026 under s.2(89) of the Code on Social Security. It was NOT raised to Rs 21,000 or Rs 25,000.

KPMG GMS Flash Alert 2026-153 re-fetched and verified (published 17 June 2026): 'GoI has notified INR15,000 per month as the wage ceiling for the purpose of Employees' Provident Fund', gazette 'S.O. 2702(E)' dated 29 May 2026. The statutory hook is confirmed verbatim in the Code text: s.2(89) 'wage ceiling means such amount of wages as may be notified by the Central Government, for the purposes of becoming a member under Chapter III and Chapter IV' — note this single definition serves BOTH EPF and ESI membership.

Source: https://kpmg.com/xx/en/our-insights/gms-flash-alert/2026/flash-alert-2026-153.html

### 14. [high] EPF contribution mechanics (unchanged in rate): employee 12% and employer 12% of wages; employer share splits 8.33% to EPS (capped at the wage ceiling) and 3.67% to EPF; Central Government adds 1.16% to EPS; EDLI 0.5% employer-only.

VERIFIED against EPFO primary pages fetched September 2026. EPF Scheme page: 'Both employee and employer contribute 12% of basic wages + dearness allowance... Employer's share is split between EPF, Employees' Pension Scheme (EPS), and Employees' Deposit Linked Insurance (EDLI).' EPS page: 'Employers contribute 8.33% of wages and the Central Government contributes 1.16% (subject to wage ceiling) towards the Pension Fund.' EDLI page: 'Employers contribute 0.5% of wages, with no deduction from employees' and FAQ 'An employer also pays 0.5% of Pay in EDLI Scheme.' The 0.50% EPF administrative charge and nil EDLI administrative charge derive from EPFO circulars of 22/03/2017 and 29/05/2018 and were NOT re-verified in this pass — see open questions.

Source: https://www.epfo.gov.in/pension-scheme-eps/

### 15. [medium] EPF membership rule: only employees drawing wages up to Rs 15,000 are mandatorily members; once a member, membership continues even if pay exceeds the ceiling, with contribution restricted to the ceiling unless a joint higher-wage option is exercised. DOWNGRADED: the specific detail that the para 26(6) option must be submitted within 6 months of joining could NOT be re-confirmed — EPFO has redesigned the cited page and the quoted text is no longer present.

EPFO EPF Scheme page as it stands September 2026 says only: 'Employees below Rs 15,000 per month (mandatory)... Voluntary coverage for higher salaried employees' and 'Contributions are mandatory for salaries up to Rs 15,000, with voluntary option for higher wages.' The longer passage quoted in the original report ('...alone eligible to become a member... The option has to be submitted to the EPF office within 6 months of joining of such member') is from the superseded EPFO site design and was not located on the live page.

Source: https://www.epfo.gov.in/epf-scheme/

### 16. [high] EPFO replaced its ECR (Electronic Challan-cum-Return) system for wage month September 2025 onwards — a live integration break independent of the Labour Codes.

VERIFIED against the EPFO circulars listing fetched September 2026, which yields the circular number the original report lacked: 'Launch of the revamped Electronic Challan-cum-Return (ECR) for wage month September - 2025 onwards Circular No. Compliance/ECR Revamp/2025/12997 dated 26/09/2025'; and 'Release of FAQs on the Revamped Electronic Challan-cum-Return (ECR) System No. Compliance (V.6)/e-office-704368/2025/13202 dated 08/10/2025'. EPFO's site navigation also now carries a dedicated 'Revamped ECR' item under Employer Services.

Source: https://www.epfo.gov.in/circulars/

### 17. [high] Aadhaar-seeded UAN is a hard precondition for filing ECR — no Aadhaar seeding, no return. The engine must carry identity-verification state per employee as a payroll blocker.

VERIFIED against the EPFO circulars listing fetched September 2026, showing the full extension history and its termination: 'Mandatory seeding of Aadhaar Number with UAN for filing of ECR' (05/11/2021); 'extension upto 31-03-2024' (18/04/2023); 'Extension upto 30/06/2024' (05/06/2024); and 'Discontinuation of Extension of Timeline for mandatory Aadhaar Seeding with UAN for filing of ECR in respect of establishments in the NER and certain class of establishments beyond 31.10.2025' (Compliance, 01/12/2025). Related: 'Seeding/Correction Aadhaar in Universal Account Number (UAN)' WSU/MemberProfile/E-710137/2025-26/26 dated 13/08/2025.

Source: https://www.epfo.gov.in/circulars/

### 18. [medium] EPF remittance and return deadlines: contributions payable within 15 days of the close of each month; late-filing fee Rs 500 per day capped at the administrative charges payable for that month; EPF Scheme 2026 para 25 mandates Aadhaar, Aadhaar-seeded bank account, PAN and UAN.

Reproduced EPF Scheme 2026 gazette text: 'a late fee of five hundred rupees per day for delay in filing any return required to be filed under this Scheme', capped at the month's administrative charges; employers must remit 'within fifteen days of the close of every month'. The 15-day remittance rule is independently corroborated on EPFO's own EDLI page: 'Employers must remit contributions within 15 days of the close of every month by bank draft, cheque, cash, or electronic transfer.' The specific form numbers (Form VI/Form VII) cited in the original report were not confirmed and have been dropped.

Source: https://taxguru.in/corporate-law/employees-provident-funds-scheme-2026.html

### 19. [high] Delayed EPF payment attracts simple interest at 12% per annum under the Code on Social Security, notified by gazette S.O. 2698(E) dated 29 May 2026 and deemed in force from 21 November 2025 — replacing the old s.7Q/s.14B structure. EPFO's own live EDLI page still describes the legacy 1%-per-month damages regime, so both regimes appear in current official material.

UPGRADED ON VERIFICATION. KPMG GMS Flash Alert 2026-153 re-fetched, quoting the notification: 'Employers shall be liable to pay simple interest at the rate of 12 percent per annum on any amount under the Code from the date on which such amount has become due till the date of its actual payment' and 'The above interest notification shall be deemed to have come into force on 21 November 2025', gazette 'S.O. 2698(E)' dated 29 May 2026. The contradiction is confirmed live: EPFO's EDLI page fetched September 2026 still states 'If an employer defaults on contributions, damages are charged at 1% of arrears per month (or part thereof).' CoSS s.164(2)(b) explains why both texts coexist.

Source: https://kpmg.com/xx/en/our-insights/gms-flash-alert/2026/flash-alert-2026-153.html

### 20. [medium] Inspection charges for exempted (own-trust) establishments under the new EPF framework, per gazette S.O. 2701(E) dated 29 May 2026: EPF Scheme 0.35% of wages, minimum Rs 8,750; EDLI Scheme 0.005% of wages, minimum Rs 1,250.

KPMG GMS Flash Alert 2026-153, re-fetched and verified, which also supplies the gazette number the original report omitted (S.O. 2701(E), 29 May 2026). Single analyst source; not seen in the gazette itself.

Source: https://kpmg.com/xx/en/our-insights/gms-flash-alert/2026/flash-alert-2026-153.html

### 21. [low] EPF wage ceiling increase is under active pressure but NOT notified. The Supreme Court directed the Centre and EPFO to decide on revision within four months (reported January 2026). Treat any figure above Rs 15,000 as unnotified. The only notification located (S.O. 2702(E), 29 May 2026) fixes the ceiling at Rs 15,000.

newsonair.gov.in (6 January 2026): 'Supreme Court directs Centre, EPFO to decide on revision of EPF's wage ceiling within four months'. The specific figures previously carried (Rs 21,000; Rs 25,000 effective 1 April 2027) rested on low-quality domains and have been retracted — see retracted_claims. Note the four-month direction reported in January 2026 would have expired around May 2026, and the government's actual response in that window was to re-fix the ceiling at Rs 15,000.

Source: https://www.newsonair.gov.in/supreme-court-directs-centre-epfo-to-decide-on-revision-of-epfs-wage-ceiling-within-four-months/

### 22. [high] ESI contribution rates: employee 0.75%, employer 3.25% of wages, unchanged since 01.07.2019. Employees on a daily average wage up to Rs 176 are exempt from the employee share, but the employer still pays its 3.25% for them.

VERIFIED VERBATIM from esic.gov.in/contribution fetched September 2026: 'Currently, the employee's contribution rate (w.e.f. 01.07.2019) is 0.75% of the wages and that of employer's is 3.25% of the wages paid/payable in respect of the employees in every wage period. Employees in receipt of a daily average wage upto Rs.176/- are exempted from payment of contribution. Employers will however contribute their own share in respect of these employees.' Contribution due 'within 15 days of the last day of the Calendar month in which the contributions fall due.'

Source: https://www.esic.gov.in/contribution

### 23. [high] ESI wage ceiling is Rs 21,000/month, and Rs 25,000/month for Persons with Disability, effective 01.01.2017.

VERIFIED VERBATIM from esic.gov.in/coverage fetched September 2026: 'The existing wage limit for coverage under the Act, effective from 01.01.2017, is Rs.21,000/- per month (Rs.25,000/- per month in the case of Persons with Disability).'

Source: https://www.esic.gov.in/coverage

### 24. [high] ESI coverage is geographically partial, not national: notified in 668 districts across 36 States/UTs — 565 fully notified and 103 partially notified (headquarters areas and prominent industrial centres only) — and 'yet to be notified in 135 districts'. Applicability depends on the employee's work LOCATION at district (sometimes sub-district) granularity. STALENESS FLAG ADDED: the page carries 'Last updated / Reviewed : 2025-04-04', so the district counts are at best an April 2025 snapshot.

VERIFIED VERBATIM from esic.gov.in/coverage fetched September 2026: 'The ESI Scheme is now notified 668 Districts in 36 States and Union Territories, which include 565 fully notified districts and 103 partially notified districts... The Scheme is yet to be notified in 135 districts. The status of notification District wise is annexed.' The same page's headline coverage statistics are labelled 'Coverage Position (As on 31st March 2023)'.

Source: https://www.esic.gov.in/coverage

### 25. [high] ESI headcount threshold differs by appropriate Government: 10+ persons for non-seasonal factories and for state-extended establishments (shops, hotels, restaurants, cinemas, road transport, newspapers, private medical/educational institutions, municipal contract/casual employees); 20+ persons for Central-sphere extended establishments (insurance business, NBFCs, port trusts, airport authorities, warehousing). Under the Code on Social Security First Schedule, Chapter IV applies at 10+ persons other than a seasonal factory, plus a single-employee trigger for notified hazardous/life-threatening occupations.

VERIFIED VERBATIM from esic.gov.in/coverage for the 10-vs-20 split. VERIFIED VERBATIM from the Code on Social Security gazette PDF, First Schedule: 'IV | Employees' State Insurance Corporation | Every establishment in which ten or more persons are employed other than a seasonal factory: Provided that Chapter IV shall also be applicable to an establishment, which carries on such hazardous or life threatening occupation as notified by the Central Government, in which even a single employee is employed'. A further proviso (missed in the original report) defers contribution liability: 'the contribution from the employers and employees of an establishment shall be payable under section 29 on and from the date on which any benefits under Chapter IV... are provided by the Corporation to the employees of the establishment and such date shall be notified by the Central Government' — so ESI liability is switched on per establishment by notification, not by headcount alone.

Source: https://www.esic.gov.in/coverage

### 26. [high] ESI runs on two six-month contribution periods (1 April–30 September, 1 October–31 March) with corresponding benefit periods (1 January–30 June, 1 July–31 December). An employee crossing the ceiling mid-period keeps contributing to the END of that contribution period — a stateful, period-scoped rule, not a per-month test.

VERIFIED from esic.gov.in/contribution fetched September 2026, which publishes the contribution-period / cash-benefit-period table as described.

Source: https://www.esic.gov.in/contribution

### 27. [high] ESI's 'wages' under s.2(22) is a large body of item-by-item, case-law-driven rules that does NOT match the Labour Codes wage definition, and ESIC maintains different bases for coverage and for contribution. One of the densest rules-engine surfaces in the build. IMPORTANT STALENESS CAVEAT ADDED: ESIC's wages page is written entirely against the ESI Act 1948, which s.164(1) of the Code has repealed, and survives only under the one-year saving in s.164(2)(b).

VERIFIED from esic.gov.in/wages fetched September 2026, which enumerates components with individual treatments and cites the repealed Act by name, e.g. 'the subsistence allowance is part of wage as defined under Sec.2(22) of the ESI Act and consequently on the amount of subsistence allowance paid to the suspended employee, contribution is payable', citing RD, ESIC v. Popular Automobiles, Civil Appeal No.3850 of 1993, judgment dated 29.9.97; and 'Washing Allowance: ...this amount does not amount to wages.' The coverage page likewise cites 'Section 1(3) of ESI Act, 1948'.

Source: https://www.esic.gov.in/wages

### 28. [medium] PROFESSIONAL TAX IS THE LARGEST COMBINATORIAL COMPLEXITY DRIVER AND THE LEAST RELIABLY DOCUMENTED. Roughly 19–20 states/UTs levy it, subject to a constitutional cap of Rs 2,500 per person per year under Article 276(2). States commonly reported as NOT levying it: Delhi, Uttar Pradesh, Rajasthan, Haryana, Punjab and Uttarakhand.

Aggregator compilations only. The cited source (indpayroll, dated 20 March 2026) was re-fetched and states verbatim: 'Delhi, Uttar Pradesh, Rajasthan, Haryana, Punjab, and Uttarakhand do not levy professional tax.' It cites Article 276 of the Constitution but, on inspection, cites NO state gazette notification for any rate it publishes. No primary state source was reachable in this pass. Treat the non-levying list as directionally reliable and every rate as unverified.

Source: https://www.indpayroll.com/blog/professional-tax-slab-rates-by-state-in-india-2026-complete-guide

### 29. [medium] PT slab data is MATERIALLY DISPUTED between reputable secondary sources, and at least one widely cited 2026 aggregator table appears to reproduce a superseded structure. This is the strongest argument in the dimension for sourcing PT from state gazettes rather than any aggregator, and for treating PT rates as a per-state data-acquisition problem rather than a coding problem.

Directly verified by inspection in this pass. indpayroll's March 2026 table publishes Karnataka as a three-band structure (nil up to Rs 15,000; Rs 150 for Rs 15,001–25,000; Rs 200 above Rs 25,000), which matches Karnataka's PRE-2023 structure, while other 2026 compilations report a two-band structure (nil below Rs 25,000; flat Rs 200 above). The same indpayroll page publishes Maharashtra with NO gender-based threshold, directly contradicting the widely reported women's exemption. Attempts to reach Karnataka primary sources during this verification failed: ctax.karnataka.gov.in returned 404 and gst.kar.nic.in/pt.kar.nic.in failed DNS resolution.

Source: https://www.indpayroll.com/blog/professional-tax-slab-rates-by-state-in-india-2026-complete-guide

### 30. [medium] PT varies on multiple independent axes, which is why it cannot be modelled as a single slab table: (1) whether the state levies at all; (2) number and boundaries of slabs; (3) gender-based slabs in some states; (4) periodicity — monthly, half-yearly or annual; (5) a February top-up quirk in Maharashtra (Rs 300 instead of Rs 200) to hit the Rs 2,500 cap exactly; (6) two separate registrations, PTRC (employer, deducting) and PTEC (entity and each director); (7) per-dealer filing frequency assigned annually by the state department. Axis 7 is the only one confirmed against a government source.

Axis 5 verified on the aggregator: indpayroll publishes Maharashtra as 'Above 10,000 → 200 (300 in Feb)' and explains 'February PT is Rs. 300 to reach the annual cap of Rs. 2,500.' Axis 7 verified on a government source: MAHAGST (Government of Maharashtra) publishes a dealer-specific determination each financial year — 'PTRC return filing periodicity for F.Y.-2026-27 is now available in "Whats New" section' — so filing frequency is a per-registration value that must be re-fetched every financial year. CORRECTION: the gender axis (Maharashtra women exempt to Rs 25,000/month) is NOT supported by the source the original report cited for it; that page explicitly shows no gender threshold. The gender axis is real in the sense that multiple other compilations report it, but it is unverified against the Maharashtra PT Act.

Source: https://www.mahagst.gov.in/en

### 31. [low] Odisha professional tax may have been repealed with retrospective effect from 1 April 2026, but this is NOT CONFIRMED and the state's own tax administration does not reflect it. DOWNGRADED FROM MEDIUM TO LOW. Do not remove Odisha from a PT rules table on this evidence alone.

ADVERSE VERIFICATION RESULT. The Odisha Commissionerate of CT & GST professional tax page (odishatax.gov.in/professional_tax.php), fetched September 2026, still describes 'The Odisha State Tax on Professions, Trades, Callings and Employments Act 2000' as operative, still instructs that 'Business entities in Odisha are required to deduct Professional Tax from the monthly salary from their employee at the applicable rates and deposit the same... every month', still publishes a rate table, and still describes annual Form V / Form XII return filing. It carries no repeal notice. The state's PT notifications page (opt_notification.php) rendered an empty table. The cited SCC Online article was unreachable across repeated attempts (connection timeouts), and the second cited outlet was blocked. The March 2026 aggregator pre-dates the alleged 21 April 2026 ordinance and lists Odisha as levying. A further structural risk: an Ordinance lapses unless replaced by an Act of the state legislature, so even if notified in April 2026 its survival to September 2026 is a separate question.

Source: https://www.scconline.com/blog/post/2026/04/23/odisha-repeals-levy-of-professional-tax-effective-from-1-april-2026/

### 32. [high] INCOME TAX REGIME CHANGE: the Income-tax Act, 2025 replaced the Income-tax Act, 1961 with effect from 1 April 2026, and as of September 2026 BOTH Acts are operationally live in parallel — the 1961 Act for periods through FY 2025-26 and the 2025 Act from Tax Year 2026-27 onwards. A payroll engine must run both simultaneously.

VERIFIED against incometax.gov.in (Income Tax Department e-filing portal) fetched September 2026: the portal enables 'seamless payments... under the existing Income-tax Act, 1961 for dues up to FY 2025-26, as well as under the Income-tax Act, 2025 for Tax Year 2026-27 onwards—all from a single interface.' The same portal simultaneously advertises 'ITR-1, ITR-2, ITR-3, ITR-4, ITR-5, ITR-6 and ITR-7 for AY 2026-27 are available for filing', i.e. AY terminology for the 1961 Act and Tax Year terminology for the 2025 Act coexist on one government portal.

Source: https://www.incometax.gov.in/iec/foportal/

### 33. [high] NEW, VERIFIED, AND OPERATIONALLY IMPORTANT: as of 1 September 2026 the Income Tax Department's own portal still states that 'Filing of TDS/TCS Correction Statements pertaining to Tax Year 2026-27 will be enabled shortly.' The correction pipeline for the new Act was not live five months into the tax year. Any product promising end-to-end TDS correction under the 2025 Act should be treated as promising something the government had not yet shipped.

incometax.gov.in e-filing portal announcements, fetched September 2026, verbatim: 'Filing of TDS/TCS Correction Statements pertaining to Tax Year 2026-27 will be enabled shortly.' The most recent dated announcement on the same page is 'Date: 01 Sep 2026 — CBDT has issued Notification No. 114/2026...', establishing the page was current at fetch time.

Source: https://www.incometax.gov.in/iec/foportal/

### 34. [medium] The Income-tax Act 2025 replaces the Previous Year / Assessment Year pair with a single 'Tax Year'. Every date-keyed structure in a payroll data model that assumes PY/AY has to change — and must continue to support AY for 1961-Act periods.

Corroborated directly on the government portal rather than only on vendor pages: incometax.gov.in uses 'Tax Year 2026-27' for Income-tax Act 2025 obligations and 'AY 2026-27' for Income-tax Act 1961 return filing, on the same page, at the same time.

Source: https://www.incometax.gov.in/iec/foportal/

### 35. [low] SALARY TDS SECTIONS AND FORMS ARE RENUMBERED UNDER THE INCOME-TAX ACT 2025. The mapping that survives verification is limited to: salary TDS under s.392; non-salary resident/non-resident TDS under s.393; TCS under s.394; Form 138 replacing Form 24Q; Form 130 replacing Form 16; Form 131 replacing Form 16A; Form 133 replacing Form 27D. HEAVILY CAVEATED: the only source located is uncited vendor content, no CBDT notification was found, and no government page reachable in this pass shows any renumbered form.

ClearTax TDS/TCS article re-fetched and inspected. It supports the s.392/393/394 and Form 130/131/133/138 mappings but cites NO CBDT notification, circular, or Act text for any of them. CORRECTION TO THE ORIGINAL REPORT'S CAVEAT: the original inferred doubt from the incometax.gov.in Downloads page not listing TDS forms; that page lists only audit and remittance forms (3CA-3CD, 3CB-3CD, 10B, 10BB, 15CA, 15CB, 29B, 3CEB) and never carried Form 16/24Q even under the 1961 Act — those live on TRACES and the RPU — so its silence is not evidence either way. The real problem is simply that no primary source could be reached. Treat this mapping as a build assumption to be confirmed against the Act text before implementation, not as established fact.

Source: https://cleartax.in/s/tds-and-tcs-changes-from-april-2026

### 36. [low] POSITIONING CLAIM, UNVERIFIED: a vendor source asserts the TDS return file format itself changes and that 'Every FVU code has been reassigned', requiring TDS software to be rebuilt before the first Tax Year 2026-27 quarterly return. Plausible as a consequence of a new Act, but no source, notification, or Protean/TRACES documentation supports it.

ClearTax TDS/TCS article, re-fetched: 'Every FVU code has been reassigned. Update your ERP and TDS software before filing the first quarterly return for Tax Year 2026-27.' On inspection the page provides no source, documentation, or notification for this. It is marketing content for the vendor's own compliance software. The only genuine corroborating signal is indirect: the government portal confirms TDS/TCS correction statements for Tax Year 2026-27 were still not enabled as of 1 September 2026.

Source: https://cleartax.in/s/tds-and-tcs-changes-from-april-2026

### 37. [high] New regime slab rates for AY 2026-27: nil to Rs 4,00,000; 5% Rs 4–8 lakh; 10% Rs 8–12 lakh; 15% Rs 12–16 lakh; 20% Rs 16–20 lakh; 25% Rs 20–24 lakh; 30% above Rs 24 lakh. Rebate up to Rs 60,000 where taxable income does not exceed Rs 12,00,000. The claim that these continue unchanged into FY 2026-27 rests on secondary reporting only.

VERIFIED against the Income Tax Department portal's own AY 2026-27 slab tables, re-fetched in this pass, which publish exactly these bands and 'Rebate u/s 87A — New Regime: Rs 60,000 (taxable income ≤ Rs 12,00,000)'. Note the primary source states the new regime's basic exemption is Rs 4,00,000 for all age bands including 60-80 and 80+, i.e. the senior-citizen differential exists only in the old regime — a per-employee conditional the engine must respect.

Source: https://www.incometax.gov.in/iec/foportal/help/individual/return-applicable-1

### 38. [high] The OLD regime survives and must still be computed, WITH age-banded exemption limits: under 60 — nil to Rs 2,50,000; 60-80 — nil to Rs 3,00,000; 80+ — nil to Rs 5,00,000; then 5%/20%/30% bands; rebate up to Rs 12,500 where taxable income does not exceed Rs 5,00,000.

VERIFIED against the Income Tax Department portal's AY 2026-27 slab tables, re-fetched in this pass. The original report stated only the under-60 table; the age bands are an addition confirmed from the same primary source.

Source: https://www.incometax.gov.in/iec/foportal/help/individual/return-applicable-1

### 39. [high] Surcharge differs BETWEEN regimes at the top end: identical at 10% (Rs 50 lakh–1 crore), 15% (Rs 1–2 crore) and 25% (Rs 2–5 crore), but above Rs 5 crore the old regime charges 37% while the new regime caps at 25%. Health and education cess is 4% on tax plus surcharge in both. Regime election changes the marginal rate at the top, not just deductions.

VERIFIED against the Income Tax Department portal surcharge table for AY 2026-27, re-fetched in this pass: 'Above Rs 5 crores — New Regime 25%, Old Regime 37%'; cess '4% on the combined amount of income tax plus surcharge (both regimes)'.

Source: https://www.incometax.gov.in/iec/foportal/help/individual/return-applicable-1

### 40. [medium] Regime election mechanics: the new regime is the DEFAULT. If an employee does not communicate a preference in writing, the employer must compute TDS under the new regime. Salaried taxpayers without business income may switch year to year, so the election is an annual, auditable, per-employee artefact.

Competitor/vendor compliance content only; not re-verified against a CBDT circular in this pass. The underlying rule (default new regime since FY 2023-24 under s.115BAC(6)) is long-established and uncontroversial; what is unverified is the corresponding section number under the Income-tax Act 2025 — the previously asserted '115BAC → s.202' mapping has been retracted for lack of any source.

Source: https://www.keka.com/tds-on-salary

### 41. [medium] TDS default consequences: interest at 1% per month for failure to deduct, 1.5% per month where deducted but not deposited, and a late filing fee of Rs 200 per day for the quarterly return. These are carry-forwards of long-established rates rather than new 2026 figures.

ClearTax TDS/TCS content; not verified against a primary source in this pass. Retained at medium because the figures match the long-standing rates under the 1961 Act (s.201(1A) and s.234E) and no source suggests they changed.

Source: https://cleartax.in/s/tds-and-tcs-changes-from-april-2026

### 42. [high] GRATUITY — THE CEILING IS NOW UNFIXED IN STATUTE. Code on Social Security s.53(3) states only that gratuity 'shall not exceed such amount as may be notified by the Central Government'. The familiar Rs 20 lakh cap is a legacy of the repealed Payment of Gratuity Act and requires a notification under the Code. No such notification was located.

VERIFIED VERBATIM from the Code on Social Security 2020 gazette PDF, s.53(3): 'The amount of gratuity payable to an employee shall not exceed such amount as may be notified by the Central Government.' s.164(1) confirms the Payment of Gratuity Act 1972 is among the nine repealed enactments. Note s.53(5): 'Nothing in this section shall affect the right of an employee to receive better terms of gratuity under any award or agreement or contract with the employer' — and s.53(6) sets out forfeiture on damage/loss and on riotous or disorderly conduct, both of which the engine must model.

Source: https://www.indiacode.nic.in/bitstream/123456789/16823/1/aA2020-36.pdf

### 43. [high] Gratuity computation rules (s.53): payable after 5 years continuous service on superannuation, retirement/resignation, death/disablement, or expiry of a fixed-term contract; the 5-year requirement does NOT apply on death, disablement or fixed-term expiry; 15 days' wages per completed year, part in excess of six months counting as a full year; monthly-rated employees use monthly wage divided by 26; seasonal establishments 7 days per season; fixed-term and deceased employees paid pro rata; working journalists get a 3-year threshold. Payable within 30 days, after which simple interest runs.

Code on Social Security 2020 gazette PDF, ss.53(1)-(2) with provisos and s.56(3)-(4). The pro-rata rule was verified verbatim in this pass: 'on fixed term employment or a deceased employee, the employer shall pay gratuity on pro rata basis.' Also verified: s.53(4) on computing gratuity for an employee re-employed on reduced wages after disablement — pre-disablement and post-disablement periods use different wage bases.

Source: https://www.indiacode.nic.in/bitstream/123456789/16823/1/aA2020-36.pdf

### 44. [high] 'Continuous service' for gratuity is a day-counting computation, not a calendar computation: 240 days actually worked in a year (190 for underground mine workers or establishments working under six days a week), or 120 days in six months (95 for the same categories). Counted days include lay-off, paid earned leave, temporary disablement from employment injury, and maternity leave up to 26 weeks. Seasonal establishments use a 75%-of-operating-days test.

VERIFIED VERBATIM from the Code on Social Security 2020 gazette PDF, s.54, including '(iv) in the case of a female, she has been on maternity leave; so, however, that the total period of such maternity leave does not exceed twenty-six weeks' and '(C) where an employee, employed in a seasonal establishment, is not in continuous service... he shall be deemed to be in continuous service... if he has actually worked for not less than seventy-five per cent. of the number of days on which the establishment was in operation'. Related: s.55 requires nomination from each employee who has completed one year of service.

Source: https://www.indiacode.nic.in/bitstream/123456789/16823/1/aA2020-36.pdf

### 45. [high] Fixed-term employees qualify for gratuity after ONE year of service, with service periods exceeding six months rounded up as an additional year. UPGRADED: now corroborated by two independent professional-services sources rather than one.

KPMG GMS Flash Alert 2026-127 on the 8 May 2026 Central Rules, re-fetched: fixed-term employees are eligible 'if they render service under the contract for at least one year.' Independently corroborated by the EY alert of 21 November 2025: fixed-term workers are 'entitled to gratuity after one year of service on termination and all other statutory benefits available to a permanent workman, proportionately according to the period of service rendered'. The Code itself (s.53) only removes the five-year requirement for fixed-term expiry and mandates pro-rata payment, so the one-year rule is a rules-level gloss — but a doubly-sourced one.

Source: https://kpmg.com/xx/en/our-insights/gms-flash-alert/2026/flash-alert-2026-127.html

### 46. [high] BONUS THRESHOLDS ARE NOW DELEGATED TO 'THE APPROPRIATE GOVERNMENT' — eligibility and calculation ceilings can legally diverge STATE BY STATE where they were previously uniform central figures. Minimum bonus is 8.33% of wages earned or Rs 100, whichever is higher, for any employee with at least 30 days' work in the accounting year; maximum 20%.

VERIFIED VERBATIM from the Code on Wages 2019 gazette PDF, s.26: '...an annual minimum bonus calculated at the rate of eight and one-third per cent. of the wages earned by the employee or one hundred rupees, whichever is higher whether or not the employer has any allocable surplus during the previous accounting year. (2) For the purpose of calculation of the bonus where the wages of the employee exceeds such amount per mensem, as determined by notification by the appropriate Government, the bonus payable... shall be calculated as if his wage were such amount, so determined by the appropriate Government or the minimum wage fixed by the appropriate Government, whichever is higher. (3) ...subject to a maximum of twenty per cent. of such wages.'

Source: https://egazette.gov.in/WriteReadData/2019/210356.pdf

### 47. [medium] The legacy bonus figures a payroll engine currently hardcodes — Rs 21,000 eligibility and Rs 7,000-or-minimum-wage calculation ceiling — come from the Payment of Bonus (Amendment) Act 2015, now subsumed by the Code on Wages. Whether these have been re-notified under s.26 of the Code, centrally or state-wise, could not be established.

Trilegal/ELA note on the Payment of Bonus (Amendment) Act 2015 for the legacy figures. No notification under Code on Wages s.26 was located in either the original research or this verification pass. This remains a genuine gap, not a resolved fact.

Source: https://www.ela.law/firms/trilegal/articles/the-payment-of-bonus-amendment-act-2015

### 48. [low] UNRESOLVED: bonus payment and return timing. Legacy practice is payment in cash within 8 months of the close of the accounting year and an annual Form D return, but sources conflict on whether the deadline is within 30 days of expiry of the bonus payment period or 1 February each year, and the Form D obligation under the Central Rules 2026 was not confirmed.

Competitor compliance blogs only; sources conflict with each other. Not verified in this pass. Do not hardcode either deadline.

Source: https://www.greythr.com/blog/payment-of-bonus-act-applicability-calculation-eligibility/

### 49. [medium] MINIMUM WAGES ARE A DATA-MAINTENANCE BURDEN MORE THAN A LOGIC BURDEN. India's system defines nearly 2,000 job types for unskilled workers and over 400 categories of employment, across four skill tiers (unskilled, semi-skilled, skilled, highly skilled), further split by state, zone/area (Central government uses Areas A/B/C) and industry. The cross-product runs to tens of thousands of rate cells maintained per state.

India Briefing minimum wage guide, re-fetched (last updated 26 June 2026), verbatim: 'India uses a complex method of setting minimum wages that defines nearly 2,000 different types of jobs for unskilled workers and over 400 categories of employment' and 'Workers in India are categorised as unskilled, semi-skilled, skilled, and highly skilled'. Single analyst source; the figures are widely repeated but no Ministry of Labour primary source was located.

Source: https://www.india-briefing.com/news/guide-minimum-wage-india-19406.html/

### 50. [medium] Minimum wages are re-indexed TWICE A YEAR via Variable Dearness Allowance, effective 1 April and 1 October, linked to CPI for Industrial Workers; the April 2026 revision moved wages by 11.28 CPI points. A payroll engine needs a scheduled twice-yearly ingest pipeline per state. DOWNGRADED from high to medium: single secondary source, no Ministry of Labour notification located.

India Briefing, re-fetched and verified verbatim: 'India's Central Government periodically revises the VDA, effective 1 April and 1 October each year, based on movements in the Consumer Price Index' and 'The latest revision, effective 1 April 2026, reflects an increase of 11.28 CPI points, resulting in an upward adjustment in minimum wages'. The twice-yearly cadence is well established; the specific 11.28 figure rests on this one source.

Source: https://www.india-briefing.com/news/guide-minimum-wage-india-19406.html/

### 51. [medium] The NATIONAL FLOOR WAGE under Code on Wages s.9 appears still NOT to have been notified, so it does not yet bind states. This is a pending change that will ripple across every state's minimum wage table when it lands. EVIDENCE CORRECTED: the specific sentence previously attributed to India Briefing could not be located on the current version of that page.

Code on Wages 2019 s.9 VERIFIED VERBATIM from the gazette PDF: 'The Central Government shall fix floor wage taking into account minimum living standards of a worker in such manner as may be prescribed: Provided that different floor wage may be fixed for different geographical areas' and s.9(2) 'The minimum rates of wages fixed by the appropriate Government under section 6 shall not be less than the floor wage and if the minimum rates... fixed... earlier is more than the floor wage, then, the appropriate Government shall not reduce such minimum rates'. On re-fetch (26 June 2026 version), India Briefing describes only 'the concept of a floor wage to be set by the central government' and does not state that it has or has not been notified. The 'not notified' status is therefore an inference from the absence of any located notification, not a sourced assertion. Legacy advisory figures of Rs 176/day and Rs 178/day are both in circulation and neither was verified.

Source: https://egazette.gov.in/WriteReadData/2019/210356.pdf

### 52. [medium] The Code on Wages requires review or revision of minimum wages ORDINARILY at intervals not exceeding five years, and extends minimum-wage entitlement universally rather than only to listed 'scheduled employments' — removing the scheduled-employment gate that older payroll systems use to decide applicability.

VERIFIED VERBATIM from the Code on Wages 2019 gazette PDF, s.8(4): 'The appropriate Government shall review or revise minimum rates of wages ordinarily at an interval not exceeding five years.' NOTE the word 'ordinarily', which the original report omitted — it is a softer obligation than 'requires'. The universal-application point is from PIB/analyst coverage of the 21 November 2025 commencement and India Briefing, and was not independently re-verified.

Source: https://egazette.gov.in/WriteReadData/2019/210356.pdf

### 53. [medium] LABOUR WELFARE FUND is enacted in roughly 16 states/UTs, contributions are FLAT RUPEE AMOUNTS rather than percentages (Haryana being the commonly cited exception), and periodicity varies between monthly, half-yearly and annual by state. THE SPECIFIC RUPEE AMOUNTS AND DUE DATES ARE UNVERIFIED AND DEMONSTRABLY DISPUTED between sources even for major states — Karnataka is variously reported as Rs 20/Rs 40 and Rs 50/Rs 100 annually; Maharashtra as Rs 25/Rs 75 half-yearly and as Rs 6-12/Rs 18-36 depending on wage band. Source LWF from state welfare boards, not aggregators.

Aggregated vendor compilations only. No state welfare board primary source was reached in this pass, and no independent confirmation of any specific amount was obtained. DOWNGRADED from high to medium: the original report rated the existence of the dispute 'high' while sourcing every underlying number to a single competitor blog. The safe, useful, and defensible finding is the structural one (flat amounts, state-varying periodicity, unreliable secondary data), not any particular figure.

Source: https://www.myndsolution.com/a-complete-guide-to-the-labour-welfare-fund-state-wise-rates-due-dates-and-technology-solutions/

### 54. [high] SHOPS & ESTABLISHMENTS ACTS ARE NOT SUPERSEDED BY THE LABOUR CODES. State S&E laws continue alongside the Codes, creating overlapping and potentially conflicting obligations on working hours, leave and related matters. Multi-state employers must comply with both sets in each jurisdiction.

VERIFIED VERBATIM from the EY Alert PDF text-extracted in this pass: 'Certain provisions overlap with existing state-specific Shops and Establishments laws, which are not superseded by the labour codes, potentially leading to conflicts, especially concerning working hours, leave, and related issues. Organizations operating in multiple states may have to ensure compliance with both sets of laws in each jurisdiction.' Reinforced by the verified Code on Wages s.17(4) preserving payment time limits in other laws. The same alert notes states may enable flexible arrangements — Haryana and Odisha included four-day-week options in their draft rules.

Source: https://www.ey.com/content/dam/ey-unified-site/ey-com/en-in/alerts-hub/2025/11/new-labour-codes-implemented-across-the-country-effective-21-november-2025.pdf

### 55. [high] MATERNITY BENEFIT is Chapter VI of the Code on Social Security, applying to factories, mines and plantations plus every shop or establishment with 10 or more employees on any day of the preceding twelve months. Medical bonus is Rs 3,500 — CORRECTED: the Code says 'or such amount as may be notified by the Central Government' (not 'such higher amount as may be prescribed'), and it is payable ONLY 'if no pre-natal confinement and post-natal care is provided for by the employer free of charge', a condition the original report omitted.

VERIFIED VERBATIM from the Code on Social Security 2020 gazette PDF. First Schedule, Chapter VI: '(a) to every establishment being a factory, mine or plantation including any such establishment belonging to Government; and (b) to every shop or establishment in which ten or more employees are employed, or were employed, on any day of the preceding twelve months'. s.64: 'Every woman entitled to maternity benefit under this Chapter shall also be entitled to receive from her employer a medical bonus of three thousand five hundred rupees or such amount as may be notified by the Central Government, if no pre-natal confinement and post-natal care is provided for by the employer free of charge.' Also verified: s.65 gives six weeks' leave for miscarriage/MTP and two weeks after tubectomy; s.66 gives two nursing breaks until the child is fifteen months old.

Source: https://www.indiacode.nic.in/bitstream/123456789/16823/1/aA2020-36.pdf

### 56. [medium] CRECHE OBLIGATION — REFRAMED AFTER VERIFICATION. The original 'threshold conflict' claim overstated the problem: both the Code on Social Security and the OSHWC Central Rules 2026 use 50 employees. The real engineering issue is that CoSS s.67 makes the number itself prescribable ('fifty employees or such number of employees as may be prescribed'), applies only to establishments already within Chapter VI (10+ employees), and sits alongside a separate OSHWC obligation with its own applicability test and employee definition. Model the threshold as configurable per statute, not as a hardcoded 50.

VERIFIED VERBATIM from the Code on Social Security 2020 gazette PDF, s.67(1): 'Every establishment to which this Chapter applies, in which fifty employees or such number of employees as may be prescribed by the Central Government, are employed shall have the facility of creche within such distance as may be prescribed... Provided that the employer shall allow four visits a day to the creche by the woman, which shall also include the intervals of rest allowed to her'. A second proviso permits pooled or common creche facilities. KPMG's summary of the 8 May 2026 OSHWC Central Rules independently lists 'Crèche facilities for establishments with 50 or more employees'.

Source: https://www.indiacode.nic.in/bitstream/123456789/16823/1/aA2020-36.pdf

### 57. [medium] POSH ACT 2013 IS NOT SUBSUMED BY THE LABOUR CODES — it remains a standalone statute. Internal Committee mandatory at 10 or more employees; annual report under s.21 read with Rule 14 to the employer and the District Officer; separate disclosure in the Companies Act board report.

The nine enactments repealed by the Code on Social Security (verified verbatim from the gazette in this pass) do not include the POSH Act 2013, and the 29 laws subsumed across the four Codes likewise do not. The SHe-Box portal (Ministry of Women and Child Development) confirms the operative statute. Not further verified in this pass.

Source: https://shebox.wcd.gov.in/

### 58. [low] SHe-Box (shebox.wcd.gov.in) is a live Government of India portal requiring hierarchical employer registration — head office nodal officers register first, are verified by District Nodal Officers, then subordinate offices are added. Vendor claims that SHe-Box upload of the POSH annual report became mandatory from 2025, with an April 30 deadline and specified penalties, are UNCORROBORATED by any government source.

SHe-Box portal content confirms the nodal-officer registration hierarchy. The portal states no 2025 or 2026 operational deadlines. Vendor claims of a mandatory SHe-Box filing requirement, penalties up to Rs 50,000 with licence cancellation on repeat, and Rs 3,00,000 / Rs 1,00,000 Companies Act penalties, remain unsupported. Not re-verified in this pass.

Source: https://shebox.wcd.gov.in/

### 59. [medium] POSH REPORTING-PERIOD AMBIGUITY: the statute frames the annual report by CALENDAR year (s.21 'in each calendar year'), while compliance practice and vendor guidance describe a FINANCIAL year deadline of 30 April. An HRMS should make the reporting period configurable rather than hardcode either.

POSH Act s.21 calendar-year framing versus uniform vendor guidance describing filing within 30 days of financial year end. Not re-verified in this pass; retained because the design implication (configurability) holds regardless of which framing is correct.

Source: https://www.keka.com/compliance/forms/annual-posh-compliance-report

### 60. [high] DPDP RULES 2025: notified as G.S.R. 846(E), gazette dated 13 November 2025, by the Ministry of Electronics and Information Technology under s.40(1) and (2) of the DPDP Act 2023, following draft rules G.S.R. 02(E) published 3 January 2025 with a 45-day comment window.

VERIFIED DIRECTLY AGAINST THE GAZETTE PDF, downloaded and text-extracted in this pass. Header: 'MINISTRY OF ELECTRONICS AND INFORMATION TECHNOLOGY, NOTIFICATION, New Delhi, 13 November 2025, G.S.R. 846(E)'. Recitals verified verbatim in English: 'the draft of the Digital Personal Data Protection Rules, 2025... was published under notification number G.S.R. 02(E) dated the 3rd January, 2025... inviting objections and suggestions... before the expiry of the period of forty-five days'; 'Now, therefore in exercise of powers conferred by sub-sections (1) and (2) of section 40 of the Digital Personal Data Protection Act, 2023 (22 of 2023), the Central Government hereby makes the following rules'. The one-day discrepancy with PIB's 14 November framing reflects e-publication date, not a different instrument.

Source: https://www.meity.gov.in/static/uploads/2025/11/53450e6e5dc0bfa85ebd78686cadad39.pdf

### 61. [high] DPDP PHASED COMMENCEMENT IS THE KEY DATE FOR AN HRMS ROADMAP: Rules 1, 2 and 17–21 in force from publication (13 Nov 2025); Rule 4 (Consent Manager registration) one year after publication (13 Nov 2026); Rules 3, 5–16, 22 and 23 EIGHTEEN MONTHS after publication (13 May 2027). All substantive obligations — notice, security safeguards, breach notification, erasure, data principal rights, Significant Data Fiduciary duties, cross-border — bite on 13 May 2027.

VERIFIED VERBATIM IN ENGLISH from the gazette PDF, Rule 1: '(2) Rules 1, 2 and 17 to 21 shall come into force on the date of their publication in the Official Gazette. (3) Rule 4 shall come into force one year after the date of publication of this Gazette. (4) Rules 3, 5 to 16, 22 and 23 shall come into force eighteen months after the date of publication of this Gazette.' The original report read this from the Hindi text; it is now confirmed from the English.

Source: https://www.meity.gov.in/static/uploads/2025/11/53450e6e5dc0bfa85ebd78686cadad39.pdf

### 62. [high] DPDP Rule 6 sets a minimum security baseline directly buildable as product requirements: encryption/obfuscation/masking/virtual tokens; access control over computer resources; access logging with monitoring and review; backups for continued processing; RETENTION OF LOGS AND PERSONAL DATA FOR ONE YEAR for detection/investigation/remediation; contractual security clauses with every Data Processor. This applies to every Data Fiduciary.

VERIFIED VERBATIM from the gazette PDF, Rule 6(1)(a)-(f), including '(e) for enabling the detection of unauthorised access, its investigation, remediation to prevent recurrence and continued processing in the event of such a compromise, retain such logs and personal data for a period of one year, unless compliance with any law for the time being in force requires otherwise' and '(f) appropriate provision in the contract entered into between such Data Fiduciary and such a Data Processor, wherever applicable, for taking reasonable security safeguards'.

Source: https://www.meity.gov.in/static/uploads/2025/11/53450e6e5dc0bfa85ebd78686cadad39.pdf

### 63. [high] DPDP Rule 7 breach notification is DUAL-TRACK and tight: notify each affected Data Principal 'without delay' with a five-element content set, AND notify the Data Protection Board 'without delay' with an initial description, followed by a detailed six-element report WITHIN 72 HOURS (extendable only on written request to the Board). An HRMS holding salary, bank and Aadhaar data must produce both from system state.

VERIFIED VERBATIM from the gazette PDF, Rule 7(1) (five elements: description including nature, extent and timing; consequences relevant to her; mitigation measures implemented; safety measures she may take; business contact information) and Rule 7(2)(a) 'without delay, a description of the breach, including its nature, extent, timing and location of occurrence and the likely impact' and 7(2)(b) 'within seventy-two hours of becoming aware of the breach, or within such longer period as the Board may allow on a request made in writing in this behalf' with six specified items including 'any findings regarding the person who caused the breach' and 'a report regarding the intimations given to affected Data Principals'.

Source: https://www.meity.gov.in/static/uploads/2025/11/53450e6e5dc0bfa85ebd78686cadad39.pdf

### 64. [high] DPDP RETENTION — MATERIALLY CORRECTED. Rule 8(3) imposes a general MINIMUM ONE-YEAR retention of personal data, associated traffic data and processing logs for Seventh Schedule purposes, after which erasure is required unless another law requires longer; it opens 'Without prejudice to sub-rules (1) and (2)' and applies to any Data Fiduciary. BUT Rule 8(1) and the 48-hour pre-erasure notice in Rule 8(2) apply ONLY to the classes in the Third Schedule — large e-commerce entities, online gaming intermediaries and social media intermediaries above user thresholds. An HRMS/employer is NOT in that class, so the original report's framing of a general 48-hour notice obligation is wrong.

VERIFIED VERBATIM from the gazette PDF. Rule 8(1): 'A Data Fiduciary, who is of such class and is processing personal data for such corresponding purposes as are specified in Third Schedule, shall erase such personal data...'. Rule 8(2): 'At least forty-eight hours before completion of the time period for erasure of personal data under this rule, the Data Fiduciary shall inform the Data Principal...'. Rule 8(3): 'Without prejudice to sub-rules (1) and (2), a Data Fiduciary shall retain... for a minimum period of one year from the date of such processing, for the purposes as specified in the Seventh Schedule'. Third Schedule '[See rule 8(1)]' lists only: e-commerce entity with not less than two crore registered users in India; online gaming intermediary with not less than fifty lakh registered users; and (per the same schedule) social media intermediary above threshold. The general one-year retention duty survives independently via Rule 6(1)(e), which is not class-limited.

Source: https://www.meity.gov.in/static/uploads/2025/11/53450e6e5dc0bfa85ebd78686cadad39.pdf

### 65. [high] DATA LOCALISATION UNDER DPDP IS CONDITIONAL AND NARROW, NOT A BLANKET REQUIREMENT. Rule 15 permits transfer of personal data outside India subject only to requirements the Central Government may specify regarding making data available to a foreign State or its agencies. Rule 13(4) is the only true localisation hook, and it binds only Significant Data Fiduciaries in respect of data the Central Government specifies on a committee's recommendation. No such specification has been made.

VERIFIED VERBATIM from the gazette PDF. Rule 15: 'Any personal data processed by a Data Fiduciary under the Act may be transferred outside the territory of India subject to the restriction that the Data Fiduciary shall meet such requirements as the Central Government may, by general or special order, specify in respect of making such personal data available to any foreign State, or to any person or entity under the control of or any agency of such a State.' Rule 13(4): 'A Significant Data Fiduciary shall undertake measures to ensure that personal data specified by the Central Government, on the basis of the recommendations of a committee constituted by it, is processed subject to the restriction that the personal data and the traffic data pertaining to its flow is not transferred outside the territory of India.' Rule 13(5) defines the committee as including MeitY officials.

Source: https://www.meity.gov.in/static/uploads/2025/11/53450e6e5dc0bfa85ebd78686cadad39.pdf

## Opportunities

- The parallel-regime window is the product wedge, and it now has a hard date: CoSS s.164(2)(b) keeps the old EPF/EPS/EDLI/ESI instruments alive only until ~21 November 2026, while the Income-tax Act 1961 and 2025 run side by side for years. A payroll engine that can execute two statutory models concurrently, keyed by period, and show which one produced each number, solves a problem incumbents built on single-model assumptions cannot retrofit cheaply.
- Statutory data as a maintained feed, not as code. The verified pattern across PT, LWF and minimum wages is that the logic is simple and the DATA is the moat: twice-yearly VDA re-indexing, per-registration PTRC filing frequency reassigned annually by Maharashtra, tens of thousands of minimum-wage rate cells, and aggregator tables that demonstrably disagree with each other and with state gazettes. A versioned, gazette-cited, per-state rules feed with effective dates is defensible in a way that a hardcoded slab table is not.
- The two-concurrent-wage-bases requirement from the s.2(88)/s.2(y) provisos is a genuine correctness differentiator. Most engines compute one 'wages' figure per period; the Code demands at least two, because the 50% add-back base excludes conveyance/HRA/award/overtime while the equal-pay and payment-of-wages base includes them. Getting this visibly right is a demonstrable audit advantage.
- Identity state as a payroll blocker. Aadhaar-seeded UAN is now a hard precondition for filing ECR, and EPF Scheme 2026 para 25 requires Aadhaar, Aadhaar-seeded bank account, PAN and UAN. Surfacing per-employee identity readiness as a pre-run gate, rather than as an HR data-quality report, prevents a whole class of month-end filing failures.
- DPDP Rule 6 is a buildable product spec with a fixed deadline of 13 May 2027: encryption/masking, access control, access logging with review, backups, one-year log-and-data retention, and Data Processor security clauses. An HRMS that ships these as verifiable controls, plus Rule 7's dual-track 72-hour breach reporting generated from system state, is selling a dated compliance obligation rather than a vague security posture. Note the narrow scope of the actual localisation hook (Rule 13(4), Significant Data Fiduciaries, nothing specified yet) — overclaiming a blanket localisation requirement would be a false differentiator.
- Two-working-day full-and-final settlement is a real-time constraint that monthly-cycle F&F architectures structurally fail, and s.17(4) means state Shops and Establishments timelines still apply on top. An off-cycle settlement engine with per-state timeline resolution addresses a compliance gap that is easy to demonstrate and hard to bolt on.

## Open questions

- Did the Odisha professional tax repeal actually take effect, and did the April 2026 Ordinance survive as an Act? The state's own PT page still shows the 2000 Act as live with no repeal notice as of September 2026. Resolve against the Odisha Gazette or the Finance Department before changing any PT rules table.
- What are Karnataka's current PT slabs? Two credible-looking 2026 compilations publish incompatible tables (a three-band structure with a Rs 150 tier vs a two-band nil-below-Rs-25,000 / flat-Rs-200 structure). All three Karnataka primary URLs failed (404 and DNS). Needs the Karnataka Commercial Taxes gazette.
- Has the Central Government notified the gratuity ceiling under Code on Social Security s.53(3)? Until it does, the Rs 20 lakh figure has no statutory basis under the Code, and the ceiling is formally open-ended. This is a live financial-exposure question, not a formatting one.
- Have the bonus eligibility and calculation ceilings been notified under Code on Wages s.26, centrally or by any state? The Code delegates both to 'the appropriate Government'. If no notification exists, it is unclear what threshold legally applies right now.
- What are the actual Income-tax Act 2025 section numbers for salary TDS, the concessional regime, and the deduction provisions, and what are the new form numbers? No primary source was reachable (incometaxindia.gov.in returns 403 via Akamai; indiacode has no working bitstream for the Act). This should be resolved from the Act text before any TDS module is specified.
- Did the TDS e-filing file format and FVU codes actually change for Tax Year 2026-27? The only claim is uncited vendor marketing. Check Protean/TRACES RPU and FVU release notes.
- Were EPF administrative charges (currently 0.50% of pay, EDLI nil) re-notified in the 29 May 2026 S.O. 2696(E)-2702(E) series? KPMG's summary covers the wage ceiling, interest and inspection charges but not administrative charges, and the underlying rate rests on 2017-2018 circulars issued under a now-repealed Act.
- Does the para 26(6) joint higher-wage option still carry a six-month submission window? EPFO has redesigned its site and the passage previously relied on is no longer present.
- What happens on or about 21 November 2026, when the one-year saving in CoSS s.164(2)(b) expires and the EPF Scheme 1952, EPS 1995, EDLI 1976 and the ESI Act rules cease to have effect? This is the single most consequential unresolved date in the dimension.
- What are the actual state Labour Welfare Fund contribution amounts and due dates? Every figure in circulation traces to aggregators that contradict each other. Needs per-state welfare board sourcing.

## Retracted

- PERQUISITE VALUATION THRESHOLDS RAISED FOR FY 2026-27 (children's education Rs 100 to Rs 3,000/child/month; hostel Rs 300 to Rs 9,000; free meals Rs 50 to Rs 200/meal; car below 1.6L Rs 1,800 to Rs 5,000 plus driver Rs 900 to Rs 3,000; car above 1.6L Rs 2,400 to Rs 7,000 plus driver Rs 3,000). RETRACTED. I re-fetched the sole cited source (ClearTax) and confirmed it presents this table with NO CBDT notification number, no gazette reference, and no rule citation, and the page carries no visible publication date. A 30-fold increase in a statutory perquisite value would be a major, heavily-reported change; none was locatable. Fabricated-looking precision with zero legal anchor is the exact failure mode this pass was hunting.
- HRA 50% CONCESSION EXTENDED FROM 4 TO 8 CITIES (adding Bengaluru, Pune, Hyderabad, Ahmedabad), with employers required to collect landlord relationship disclosures. RETRACTED. The cited page asserts 'The income tax rules, 2026 has extended the 50% HRA exemption to include Bengaluru, Pune, Hyderabad, and Ahmedabad' but cites no notification or rule number. This would materially change exemption computation for millions of salaried taxpayers and has been a rumoured proposal for years without enactment. No primary confirmation was obtainable. Do not build against it.
- TDS SECTION AND FORM MAPPINGS: 115BAC to s.202; Form 26AS to Form 168; Form 12BB to Form 124; Form 12B to Form 127; 80C to 123; 80D to 126; 80E to 129; 80G to 127. RETRACTED as a set. The cited ClearTax page, on re-fetch, contains none of these mappings — it covers only s.392/393/394 and Forms 130/131/133/138. The list is also internally inconsistent: the number 127 is assigned to both Form 12B and section 80G, which cannot both be right. No CBDT notification or Act text confirming any of them was reachable. The surviving, still-low-confidence subset has been retained as a separate caveated finding.
- EPF WAGE CEILING PROPOSALS: 'Finance Ministry approved Rs 25,000 with effect around 1 April 2027' and 'other coverage discusses Rs 21,000'. RETRACTED as specific figures. These rested on thepeoplesboard.com, indiapolicyhub.in, karmamgmt.com and kb.bizproutx.com — none of which is a credible source for a Finance Ministry decision, and no gazette notification exists. The verified position (ceiling re-fixed at Rs 15,000 by S.O. 2702(E) on 29 May 2026, with Supreme Court pressure to reconsider) is retained without the invented numbers and dates.
- SHe-BOX POSH FILING OBLIGATIONS: mandatory annual-report upload from 2025, an April 30 deadline, penalties up to Rs 50,000 with licence cancellation on repeat, and Rs 3,00,000 / Rs 1,00,000 Companies Act penalties for board-report omissions. RETRACTED as asserted facts. The original report already noted these were uncorroborated by the SHe-Box portal itself; carrying them forward as content invites them being re-quoted as established. The portal's registration hierarchy is retained as a finding; the deadlines and penalty amounts are not.
- EPF RETURN FORM NUMBERS 'Form VII' (ECR) and 'Form VI' (ownership return) under EPF Scheme 2026. RETRACTED as specifics. The reproduced scheme text I could verify covers the 15-day remittance rule and the Rs 500/day late fee capped at monthly administrative charges, but does not confirm these form numbers, and no EPFO source shows them. The deadlines are retained; the form numbers are dropped.
- The assertion that Maharashtra's gender-based professional tax slabs are evidenced by the cited aggregator. RETRACTED as an evidence attribution. On re-fetch, indpayroll explicitly shows NO gender threshold for Maharashtra. The gender axis is retained in the PT-complexity finding as a widely-reported but unverified feature; the false citation is removed.
