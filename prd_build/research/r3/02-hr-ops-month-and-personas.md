# [r3] hr-ops-month-and-personas

## Verification notes

WHAT I DID: re-fetched every greytHR admin help article, the greytHR payroll-checklist blog, the greytHR Karnataka calendar, the Zoho IT-declaration / POI / ICICI pages, and Hinote; independently re-pulled one job posting through the Indeed MCP; and ran targeted verification against statute-level and government-adjacent sources for the ECR format, the ECR system revamp, ESI dates, TDS dates, Karnataka PT, and the Income-tax Act 2025 renumbering.

WHAT HELD: the product-feature claims are the strongest part of this report and they survived. Every greytHR capability claim re-checked verbatim — process-multiple-times-until-locked, Quick Process, the attendance-changed banner, LOP auto-population, the F&F wizard field list including the auto-computed 'Shortfall in Notice', the arrears batch model and 'Process New Joinee Arrears', the bank-template output with its named filename/extension fields, and the Form 16 TRACES/eToken assembly. Every Zoho claim re-checked verbatim too, including the ICICI prerequisites, CIB portal OTP approval, the 01:00–18:30 initiation window, the December POI guidance, the lock date, and the true-up month selection. I found the LOP setting's actual name ('Reversal Month Range'). No API, file format, form number or portal capability in this report is invented. The persona evidence is better than expected: I re-pulled the Rhibhus posting cold and every quoted line, the salary band and the qualifications reproduced exactly.

WHAT BROKE — five substantive errors, two of them self-inflicted. (1) The ECR header-line structure was read off the superseded ECR 1.0 spec. (2) Far worse, the whole 'ECR is irreversible' finding and the P0 requirement built on it were obsolete: EPFO re-engineered the ECR system effective September 2025, adding Revised and Supplementary returns and separating filing from payment. The prior sweep was describing a system that had changed a year before the research was done. (3) Karnataka PT was wrong on both date and authority because a vendor calendar was trusted at high confidence over that same vendor's own contradicting page. (4) and (5) Two of the prior sweep's own retractions were themselves wrong — it discarded the true ESI 15th date and the true Form 130 name. Over-caution destroyed correct facts while a stale claim sailed through at high confidence.

THE BIGGEST MISS: the prior sweep treated the Income-tax Act 2025 renumbering as a medium-confidence forward risk that 'may overlap with the earlier statutory sweep'. It is live law, in force since 1 April 2026 — six months before this research was conducted — and it renumbers not just 80C and 80D but every salary TDS form: 16→130, 16A→131, 24Q→138, 12BB→124, 26AS→168, and 12B+12BAA merged into Form 122, the last confirmed on incometaxindia.gov.in itself. A PRD written from the prior version would have used obsolete form numbers throughout.

DID IT ANSWER THE QUESTION: yes, and without padding. The month-shape reconstruction is genuinely useful and the persona work is evidence-backed rather than invented. Two soft spots: the day-of-month calendar is vendor-marketing convention dressed as process knowledge (now demoted to low), and three of five personas rest on single unreplicated postings. No quantitative operational data exists anywhere in either sweep — no close duration, no query volume, no error rate.

HOW MUCH TO TRUST THIS: high for what incumbent products do — that is directly documented and now twice-verified. Medium-high for statutory structure after the corrections above. LOW for anything about timing conventions, effort, or volume. Treat every compliance date and form number as requiring one primary confirmation before it enters a spec, and note the demonstrated reason: this sweep found errors in live documentation from both greytHR and Zoho. The single most important open item is reading the EPFO ReECR user manual first-hand — the P0 requirements around PF filing depend on details I could only reach through secondary sources.

## Key findings (33)

### 1. [high] The Indian monthly payroll run is gated by a named pre-payroll checklist of discrete input tasks that must be closed before processing. greytHR enumerates 18: lock previous payroll, new employee additions, employee separations, confirmation updates, employee data updates, update payment details, salary revisions, update one-time payments, update one-time deductions, update any other salary changes, loans update, stop salary processing, update LOP/LWP, update arrears, update full and final settlements, reimbursement claims, lock IT declaration, download IT declaration.

Re-fetched greytHR's payroll-checklist guide and counted the enumerated items: 18, not the ~16 the prior sweep reported. Post-payroll it names four reconciliation artefacts: Payroll Reconciliation Report, Payment Type Reconciliation Report, JV Differences Report, Headcount Reconciliation Report.

Source: https://www.greythr.com/blog/payroll-checklists-and-reconciliation-tools-step-step-guide-process-accurate-payroll/

### 2. [high] Payroll is re-runnable: the model is process → inspect → fix inputs → reprocess, repeatable any number of times within the month until the payroll month is explicitly LOCKED. A 'Quick Process' escape hatch skips the checklist entirely.

Re-fetched and confirmed verbatim: 'You can process the payroll multiple times in a month by changing the inputs until the payroll is locked.' And: 'On the Payroll Process page, click the Quick Process button' — which processes all salaries without requiring checklist completion. Locking the previous payroll is itself checklist item 1.

Source: https://www.greythr.com/admin/answers/94174307/

### 3. [high] Attendance-to-payroll is a two-way loop, not a one-way feed: when attendance data changes AFTER payroll has been processed the system displays a banner forcing a reprocess decision, and where 'Attendance LOPs' is enabled LOP days are auto-pulled from the Leave and Attendance module.

Re-fetched and confirmed: a banner indicates 'that attendance data has changed' and 'you must reprocess payroll to ensure the LOP days pulled from the Attendance module are up to date.' Also confirmed verbatim: 'If your organization has enabled Attendance LOPs settings, the LOP days are automatically picked from the Leave and Attendance module.' Summary fields confirmed: Total Workdays, LOP Days, Payment Days, Effective Payroll Month.

Source: https://www.greythr.com/admin/answers/121773085/

### 4. [high] LOP reversal is a first-class retroactive operation with an admin-configurable lookback window of 1–12 months, controlled by a named setting: 'Reversal Month Range' under System Settings > Payroll > Payroll Preferences.

Re-fetched and confirmed verbatim: 'LOP Reversal lets you restore previously deducted LOP days to the employee's payable salary' and 'Admins can control the number of months displayed by configuring the Reversal Month Range setting under System Settings > Payroll > Payroll Preferences, with a minimum limit of 1 month and a maximum limit of 12 months.' The prior sweep had the 1–12 range right but not the setting name.

Source: https://www.greythr.com/admin/answers/121773085/

### 5. [high] Attendance cycle and pay cycle are usually DIFFERENT periods (attendance commonly 26th–25th or 25th–24th against a calendar-month pay period), and non-calendar wage periods measurably break three things: automated arrear calculation, income-tax accrual at the FY boundary, and PF/ESI which are computed on calendar months.

Re-fetched Hinote and confirmed verbatim: Payment of Wages Act 1936 — 'No wage-period shall exceed one month'; 'implementing an automated salary arrear calculation...may not be possible'; 'the company may be calculating tax in contravention to Section 15 of the Income Tax' with 'Form 16 issued to employees may present incorrect data'; and 'the PF/ESI amount for a calendar month could be different from the PF/ESI amount payable for the salary month, from 21st to 20th.'

Source: https://www.hinote.in/pay-period-salary-payment/

### 6. [low] There is no single national convention for the per-day rate used to compute LOP — practitioners use salary/30, calendar days in month, or pay-for-actual-attendance — and this is a recurring source of disputes.

CiteHR practitioner threads, readable only via search summary in both sweeps: 'two methods for salary processing: one is payment for actual attendance, and the other is deduction of LOP from the gross. LOP per day is calculated by dividing the salary by 30 days'. Downgraded from medium to low: citehr.com renders client-side and could not be fetched directly in either sweep, so no quote here is first-hand. The underlying point (no single convention) is plausible and consistent with Hinote, but the specific methods list rests on one unverifiable source.

Source: https://www.citehr.com/430332-how-calculate-salary.html

### 7. [high] Full-and-final settlement is modelled as a separate wizard with its own lock. Confirmed fields: separated-employee selection, Resignation Submitted On, Leaving Date, Leaving Reason, Settlement Date, Notice Required checkbox, Notice Period (days) with system-computed 'Shortfall in Notice', Days Worked, leave encashment, Remarks, and an IT-declaration choice. Settlements can be locked/unlocked, edited, deleted and downloaded.

Re-fetched greytHR admin help and confirmed each field name and the six-step wizard structure, including that the system auto-calculates 'Shortfall in Notice' days and that Lock/Unlock is a column on the Final Settlement page.

Source: https://www.greythr.com/admin/answers/88546030/

### 8. [high] Arrears are a batch object, not a line item: retro salary revisions are computed as batches over an 'Arrear Effective From' date, processed per-employee or per-batch, and produce downloadable arrear statements. New-joiner arrears are a distinct code path with its own button.

Re-fetched and confirmed: navigation Payroll > Payroll Inputs > Arrears; 'Step 1: Arrear Effective From'; 'a list of batches appears. Each batch contains the employees whose arrears calculations are complete'; download icon in the Actions column; and verbatim 'You can calculate the arrears for the new employees by clicking the Process New Joinee Arrears button.'

Source: https://www.greythr.com/admin/answers/122441429/

### 9. [high] Salary disbursement is bank-template-driven, not standard: the payroll system emits a per-bank formatted file whose filename and extension are configurable via named fields ('File Name Start', 'File Extension'), with transfer type By Employer Bank or By Employee Bank.

Re-fetched greytHR Bank Transfer help and confirmed the three-step wizard, the Bank Template dropdown, and both configurable output fields by name. The docs still do NOT enumerate supported banks or formats; a 'greytHR PayNow with HSBC' integration is referenced in a related article.

Source: https://www.greythr.com/admin/answers/122326864/

### 10. [high] Bank-integrated disbursement requires a corporate current account, bank-side onboarding with document submission, and an explicit maker-checker approval inside the bank's corporate portal with OTP — the payment cannot be fully automated from the payroll product alone.

Re-fetched Zoho's ICICI integration docs and confirmed every element: 'A corporate current account with ICICI Bank'; MFA required 'except Security Key and Passkey'; contact the ICICI representative to submit documents, after which 'the Account Status will update to Active' (ICICI may charge processing fees); approval via dashboard 'Pending on Me' > 'Connected Banking Approvals' tab, confirmed with the 'One Time Password sent to your registered mobile number'; default mode NEFT; initiation only 'on business days between 01:00 AM and 06:30 PM'; status within 30 minutes; failures can be retried or recorded as paid offline.

Source: https://www.zoho.com/in/payroll/help/employer/direct-deposit/direct-deposit-icici.html

### 11. [medium] Bank integrations are fragile as a strategy: Zoho Payroll's YES Bank rail is closed to new customers while existing users continue, and the ICICI rail has been reworked for bulk payments under RBI compliance requirements.

Confirmed via search of zoho.com help pages: 'Yes Bank is no longer accepting new integration requests' for Zoho Payroll India direct deposit, with existing users able to continue without disconnecting; Zoho also notes YES Bank 'has paused new API Banking registrations for certain business categories'. The direct-deposit KB index (fetched directly) lists an article titled 'What should I know about the updated ICICI Direct Deposit process, including the transition to bulk payment and RBI compliance?' — the title is confirmed first-hand, the article body was not read.

Source: https://www.zoho.com/in/payroll/help/employer/direct-deposit/direct-deposit-yes-bank.html

### 12. [high] EPFO replaced the ECR system with a re-engineered ECR (ReECR) effective the wage month of September 2025, under Circular No. Compliance/ECR Revamp/2025/12997 dated 26.09.2025. Its defining features: return submission is SEPARATED from payment generation (file first, pay only after return approval); three return types exist — Regular, Supplementary (for members missed in the regular return) and Revised (for corrections to filed returns); monthly ECRs must be filed in sequential chronological order; and interest under s.7Q and damages under s.14B are auto-calculated on the platform.

KPMG GMS Flash Alert 2025-209 (fetched) confirms the circular number and date, the September 2025 wage month, the three return types verbatim ('Regular Return: For monthly contributions of active employees', 'Supplementary Return: For employees not included in the initial regular return', 'Revised Return: For correcting previously-filed returns'), and 'Employers must file returns first; payment is initiated only after return approval.' It also states 'Interest under section 7Q of the EPF Act is now calculated and paid through the ECR platform.' Sequential chronological filing and 14B auto-calculation corroborated across EPFO FAQ write-ups. PIB confirms EPFO extended September 2025 ECR filing to 22 October 2025 to let employers adapt. This finding REPLACES the prior sweep's claim that ECR filing is effectively irreversible and correctable only via an arrear ECR.

Source: https://kpmg.com/xx/en/our-insights/gms-flash-alert/flash-alert-2025-209.html

### 13. [medium] Revision under ReECR is asymmetric, and this asymmetry is the real irreversibility line: 'Downward revision is allowed only before payment initiation; upward revision is permitted at any time.' Once a return is approved it cannot be cancelled — corrections go through a Revised Return.

KPMG flash alert (fetched) states the downward/upward asymmetry verbatim. The 'cannot cancel once approved' formulation comes from EPFO FAQ summaries surfaced in search rather than a fetched primary page. This is the correct replacement for the prior sweep's blanket 'cannot be edited or deleted' claim, but the exact boundary conditions should be read off the EPFO ReECR user manual before they enter a spec.

Source: https://kpmg.com/xx/en/our-insights/gms-flash-alert/flash-alert-2025-209.html

### 14. [medium] The ECR is a plain-text delimited file, NOT a spreadsheet: ECR 2.0 is UAN-based with 11 fields per member line separated by #~# (hash-tilde-hash, three characters) — UAN, Member Name, Gross Wages, EPF Wages, EPS Wages, EDLI Wages, EPF Contribution Remitted, EPS Contribution Remitted, EPF-EPS Difference Remitted, NCP Days, Refund of Advances. There is NO header line; the field count was reduced from 25 in ECR 1.0 to 11 in ECR 2.0. Arrear returns use a reduced 8-field structure.

The #~# separator and the 11-field UAN-based structure are corroborated across multiple independent sources including Keka's ECR 2.0 page, an EPFO PDF search summary, and a 2026 filing guide (fetched) that lists the 11 columns in order and confirms '#~# as the delimiter'. The HEADER-line structure the prior sweep asserted belongs to the SUPERSEDED ECR 1.0 spec (ECR_ForEmployers_FileStructure--OLD.pdf, 25 fields) and does not apply. The 8-field arrear structure comes from EPFO FAQ summaries. Still medium: epfindia.gov.in redirects to epfo.gov.in and both 404 on the file-structure PDFs, so the field spec was not read first-hand in either sweep. One third-party site (epfoin.com) claims a '||' delimiter — treat that as an outlier; every other source says #~#.

Source: https://www.epfindia.gov.in/site_docs/PDFs/EPFOUnifiedPortal/Introduction_ECR2.0.pdf

### 15. [medium] Under ReECR the date of DISBURSAL of arrears determines the 'due month' for remittance of PF contributions on those arrears, and therefore the interest and damages exposure on late arrear payment.

EPFO revamped-ECR FAQ write-ups surfaced via search state that a separate ECR for arrears is generated with 8 data fields covering only employees with arrear payments, and that the disbursal date drives the due month. Not read from a primary EPFO page; flagged for verification. Material because it means an arrear batch's PF liability is dated by when it is paid, not by the month it relates to.

Source: https://kpmg.com/xx/en/our-insights/gms-flash-alert/flash-alert-2025-209.html

### 16. [high] ESI contributions are due by the 15th of the month following the wage month under Regulation 31 of the ESI (General) Regulations 1950 — this is a national date, not a state-dependent one. Late payment attracts simple interest at 12% p.a. under Regulation 31-A and damages under Regulation 31-C graded 5% / 10% / 15% / 25% p.a. by length of delay.

Corroborated across multiple independent Indian tax and payroll references citing Regulation 31 by number, with consistent penalty gradations and the note that there is no statutory grace period and the date shifts to the next working day if the 15th is a Sunday or holiday. This REVERSES the prior sweep's retraction, which had wrongly declined to state the date. greytHR's own compliance table recording ESI as 'state-dependent' is simply an error in that vendor's table — the state-dependency belongs to Professional Tax, not ESI.

Source: https://tallysolutions.com/business-guides/esi-return-filing-due-date-process-online-submission-guide/

### 17. [high] TDS on salary is deposited by the 7th of the following month via Challan ITNS 281, with one permanent exception: TDS deducted in MARCH is due 30 April. Quarterly salary TDS returns are due 31 July, 31 October, 31 January and 31 May (Q4). The salary TDS certificate is due 15 June following the tax year.

Corroborated across multiple independent Indian tax references with consistent dates. The March/30-April exception was MISSED by the prior sweep and matters: it is the single largest deviation from the '7th of every month' rule and lands in the same week as the FY-boundary true-up. Note the form NAMES have changed for TY 2026-27 onwards — see the renumbering finding.

Source: https://taxguru.in/income-tax/salary-tds-return-24q-due-date-return-challan.html

### 18. [high] Professional Tax is genuinely per-state in form, authority and date, but the prior sweep's Karnataka date and authority are BOTH wrong. Karnataka monthly PT Form 5A is due within 20 days of the expiry of the month (the 20th), filed online through e-PRERANA with the Commercial Taxes Department — not the 21st, and not the Labour Commissioner.

greytHR's Karnataka compliance calendar (re-fetched) does say '21st' and does name the 'Labour Commissioner'. But greytHR's OWN Form 5A wiki page (fetched) states the due date as 'within 20 days of expiry of the month' and points to e-PRERANA; and independent sources (ClearTax, Aditya Birla Capital, Simpliance) uniformly give the 20th, consistent with the Karnataka Tax on Professions Act. Two errors in a single vendor calendar that the prior sweep elevated to 'high' confidence. The other Karnataka dates in that calendar were re-confirmed as published: LWF Form D 14 Jan, S&E Form U 30 Jan, Minimum Wages Form III 30 Jan, Payment of Wages Form IV 30 Jan, Factories Form 20 31 Jan, Form 21 half-yearly 14 Jul, annual PT Form 5 29 Apr — but given two demonstrated errors in the same table, treat all of them as unverified vendor data.

Source: https://www.greythr.com/wiki/compliances/karnataka-form-5a-monthly-profession-tax-statement/

### 19. [high] India is ALREADY operating under the Income-tax Act, 2025, in force from 1 April 2026 (Tax Year 2026-27). Deduction sections and every salary-TDS form have been renumbered: 80C → Section 123 (₹1,50,000 limit, read with Schedule XV); 80D → Section 126; Form 16 → Form 130; Form 16A → Form 131; Form 24Q → Form 138; Form 12BB → Form 124; Form 26AS → Form 168; and Forms 12B and 12BAA are merged into Form 122 under s.392(4)(a).

Confirmed against multiple independent sources plus the Income Tax Department's own site, which publishes the form as 'Form No 122 (Earlier Form Nos. 12B & 12BAA)' at incometaxindia.gov.in/documents/d/guest/fn-122. Section 123 confirmed as the 80C successor at ₹1,50,000 effective 1 April 2026; Section 126 confirmed as the 80D successor. Form 130 is system-generated from the quarterly Form 138 returns and issued by 15 June following the tax year; the first Form 130 covers TY 2026-27 and is issued in June 2027, while FY 2025-26 was still certified on Form 16. This is not a forward-looking risk as the prior sweep framed it — it is live law as of today.

Source: https://www.incometaxindia.gov.in/documents/d/guest/fn-122

### 20. [high] Vendor documentation is actively wrong on statutory limits during this transition. Zoho Payroll's IT Declaration help page states 'Maximum investment limit under Section 126 (formerly 80D) - Rs. 1,50,000'. The correct Section 126 limits are ₹25,000 (self/spouse/children under 60), ₹25,000 (parents under 60), ₹50,000 where the covered persons are 60 or over, with preventive health check-ups of up to ₹5,000 inside those limits.

Fetched the Zoho page directly and confirmed the ₹1,50,000 figure is genuinely printed against Section 126 — the prior sweep dismissed it as a 'summarisation artifact', which was wrong; it is a real error on a live vendor help page. The correct limits confirmed across independent tax references. ₹1,50,000 is the Section 123 (ex-80C) limit, which Zoho appears to have copied onto the adjacent row. Direct evidence that incumbent product documentation cannot be trusted as a source of statutory truth in the renumbering transition.

Source: https://www.zoho.com/in/payroll/help/it-declaration.html

### 21. [high] The IT declaration form must capture previous-employer income for mid-year joiners as a first-class field set — income after exemptions, income tax already deducted, professional tax, and EPF from prior employers — alongside HRA with landlord PAN mandatory above ₹1,00,000 annual rent.

Re-fetched Zoho's IT Declaration page and confirmed the Previous Employment block captures exactly those four items, and confirmed verbatim: 'Landlord's PAN if the annual rent amount is in excess of ₹1,00,000.' Under the 2025 Act this employee-supplied disclosure is now made on Form 122.

Source: https://www.zoho.com/in/payroll/help/it-declaration.html

### 22. [high] Regime election has a hard timing gate: an employee may switch old/new regime only before the employer runs the FIRST payroll of the financial year while the declaration is unlocked; after that the change can only be made at ITR filing.

Re-fetched and confirmed verbatim: 'If you want to switch tax regimes, you can do so before your employer runs the first payroll for the financial year provided, the IT Declaration is unlocked.'

Source: https://www.zoho.com/in/payroll/help/it-declaration.html

### 23. [high] The investment-declaration season is an employer-configured window with a hard lock date, and the true-up month is an explicit employer choice — the product must let the admin pick which payroll month absorbs the tax correction.

Re-fetched Zoho's employer POI docs and confirmed verbatim: 'Ideally, employees should be allowed to submit their proof of investments from the month of December'; the lock date is set under Settings > Preferences > IT Declaration & POI Submission with 'Select the date on which the POI submission should be locked'; approvals support approve with an actual approved amount, reject with a typed reason, and bulk 'Approve All & Consider for IT'; and the admin must 'Select the month from which the payroll should be processed with the approved amount.'

Source: https://www.zoho.com/in/payroll/help/employer/poi.html

### 24. [high] Salary TDS certificate issuance is a multi-system manual assembly: Part A and Part B are requested and downloaded from the TRACES portal using an authentication code valid for one calendar day plus a request number, uploaded back into the payroll product as ZIP or PDF, merged, digitally signed via a downloadable desktop signer application driving a physical eToken, and finally published to the employee portal or emailed.

Re-fetched greytHR's help article and confirmed each step: 'a unique request number generates. The number helps you to track the status'; the authentication code is 'valid for the same calendar day'; 'Under Upload Form 16 Part A Zip/PDF files, click Upload File'; the greytHR Digital Signer desktop application with eToken, where 'The utility automatically uploads and signs the file'; and distribution via 'Publish to Portal' or 'Email'. One caveat: greytHR's own page describes requesting 'Form 16A' under the TRACES Download tab, which appears to be an error in their documentation, since Form 16A is the non-salary TDS certificate. From TY 2026-27 this certificate is Form 130.

Source: https://www.greythr.com/admin/answers/122043960/

### 25. [high] PERSONA (a) — the HR/payroll operator at 20-200 headcount is a 1-5 year B.Com/M.Com/MBA generalist paid roughly ₹15,000–₹40,000/month who owns the ENTIRE loop end to end: attendance validation, LOP, OT, incentives, arrears, FnF, PF/ESI/PT/TDS computation AND deposit AND filing, salary TDS certificate issuance, MIS, and employee query resolution. Payroll is one of several hats, not a department.

Independently re-verified by pulling the Rhibhus Infosystems posting fresh from the Indeed MCP (Jayanagar, Bengaluru, posted 17 Aug 2026): 'Pay: ₹25,000.00 - ₹30,000.00 per month', 'B.Com / M.Com / MBA (HR/Finance preferred)', '1– 2 years in payroll, compliance, and attendance'. Its scope covers salary components, overtime/incentives/reimbursements, deductions (PF, ESI, PT, TDS, insurance, advances), payslips, F&F, statutory filing of PF/ESI/PT/TDS, statutory registers, MIS and cross-team coordination. Every line the prior sweep quoted from this posting reproduced exactly. The other five postings were not re-pulled in this sweep; the persona rests firmly on this one verified posting plus the prior sweep's set.

Source: https://to.indeed.com/aarbx6mf6qp8

### 26. [high] Attendance arrives from MULTIPLE heterogeneous sources that must be reconciled against each other and with an operations owner BEFORE payroll can start — an ERP/roster system, a client or biometric MIS, and manual inputs.

Re-verified verbatim from the live Rhibhus posting: 'Collect and validate attendance from: Roorides ERP reports; Client MIS / biometric systems; Manual inputs (if any)'; verify 'Working days, weekly offs, holidays; Overtime, shift patterns; Absenteeism and leave records'; 'Resolve discrepancies with Operations prior to payroll processing'. Also confirmed: 'Maintain separate payroll structures for each client', 'Manage variations in Salary structures and compliance applicability', 'Reconcile salary payouts vs client billing', 'Vehicle operating days vs employee attendance', 'Employees paid but not deployed'.

Source: https://to.indeed.com/aarbx6mf6qp8

### 27. [medium] The operator's real toolchain pairs a named HRMS with advanced spreadsheets and an ERP for reconciliation — Excel is a stated hiring requirement alongside the payroll system, not a legacy fallback.

Re-verified from the live Rhibhus posting: 'Advanced Excel / Google Sheets (reconciliation, MIS, control reports)', 'Payroll software knowledge', 'Hands-on experience with ERP systems (Tally or similar preferred)'. Downgraded from high because the specific vendor list the prior sweep attributed to other postings (Keka, RazorpayX Payroll, greytHR, Zoho People, Darwinbox, SAP HCM) was NOT re-verified in this sweep — the Rhibhus posting says only 'Payroll software knowledge' without naming vendors. The Excel-alongside-HRMS point is solid; the specific vendor roster should be re-confirmed before it is used in competitive positioning.

Source: https://to.indeed.com/aarbx6mf6qp8

### 28. [high] PERSONA (b) — the founder/CFO sign-off is a real, documented gate with two distinct acts: approving the payroll register before disbursement, and authorising the money movement in the bank's corporate portal.

Re-verified verbatim from the live Rhibhus posting: 'Prepare client-wise and consolidated payroll sheets'; 'Obtain management approval before disbursement'; 'Coordinate with Accounts for Salary funding'; 'Ensure timely salary credit to employees'; 'Reconcile salary payments with bank records'. The bank-side second act is independently evidenced by the Zoho/ICICI CIB portal OTP approval flow. Note: the further claim that directors carry personal legal accountability came from greytHR's compliance guide, which this sweep has shown to contain errors elsewhere — the sign-off gate is verified, the liability framing is vendor assertion.

Source: https://to.indeed.com/aarbx6mf6qp8

### 29. [high] PERSONA (d) — the employee's jobs-to-be-done are narrow and calendar-driven: read a payslip, choose a tax regime once a year, declare investments, upload proofs against a notified deadline, watch a status, withdraw-and-resubmit while unlocked, and download the annual TDS certificate.

Zoho Payroll employee-portal docs (fetched in prior sweep, and the employer-side POI page re-fetched here corroborates the admin half of every step): employees are notified when the window opens, submit via Investments > Submit Proofs with documents and comments, and can 'withdraw, edit, and resubmit proofs provided your payroll admin has not locked or approved it'. Outcome states documented as matched / declared exceeds proofs / proofs exceed declared / no declaration.

Source: https://www.zoho.com/in/payroll/help/employee/portal-investment-proof.html

### 30. [medium] PERSONA (e) — the frontline/deskless population is administered through a different apparatus: biometric/gate attendance, shift and roster data, overtime, contractor manpower, and separate statutory registers under the Factories Act, Contract Labour Act, Minimum Wages and Payment of Wages Acts.

The Rhibhus transport posting independently confirms the deskless shape in this sweep: shift patterns, overtime, biometric/client MIS attendance, deployment reconciliation, spare driver approval, and compliance with the 'Payment of Wages Act, Minimum Wages Act, Payment of Bonus Act, Gratuity Act' plus 'Maintain statutory registers and documentation'. The manufacturing half (Trusted Aerospace factory-administration posting, Factories Act, contractor licences, Factory Inspectorate) was not re-pulled in this sweep, and the principal-employer liability framing came from the greytHR guide. Downgraded to medium accordingly.

Source: https://to.indeed.com/aarbx6mf6qp8

### 31. [high] Practitioners were still using the pre-2026 form names in mid-2026 job specifications — a live Aug 2026 posting specifies compliance work on 'PT and TDS (Form 24Q, Form 16)' months after those forms became Form 138 and Form 130.

Verbatim from the Rhibhus posting pulled fresh in this sweep, posted 17 August 2026. This is direct evidence that the renumbering has not propagated into practitioner vocabulary, which is a concrete product design constraint rather than a trivia point: search, help content, field labels and support conversations must accept both vocabularies.

Source: https://to.indeed.com/aarbx6mf6qp8

### 32. [low] PERSONA (c) — payroll outsourcing is a service line inside Indian CA firms, sitting alongside assurance, direct/indirect tax and global mobility, delivered by CA/CMA-qualified seniors.

Rests on a single Indeed posting (W S & Associates LLP, Noida) fetched in the prior sweep and not re-verified here. That posting scopes a Senior Accountant role at a firm that lists payroll outsourcing among its services; it does not scope payroll-only responsibilities, and no CA-firm posting that does was found. Downgraded from medium to low: one uncorroborated posting is not evidence of a persona. Treat this persona as a hypothesis requiring primary research, not a finding.

Source: https://to.indeed.com/aaxmyd6zzd8w

### 33. [low] The de-facto monthly calendar for Indian SMBs is roughly: inputs/claims collected through the third week, payroll executed around the 25th, validation ~26th, lock and bank file ~27th, disbursal from the 28th to the 1st.

Two vendor-marketing process write-ups converge on this shape (Kaamwork, fetched in the prior sweep: Data Collection 1st–23rd, Calculation 23rd–27th, Disbursement 28th or last working day). Downgraded from medium to low: no primary, survey or employer-sourced evidence was found in either sweep, and the day-level granularity the prior sweep reported came from search summaries of other vendor pages. This is a plausible convention with no evidentiary base — usable as a narrative device, not as a design input.

Source: https://www.kaam.work/blog/how-payroll-actually-runs-in-india-a-month-by-month-breakdown

## Requirements

- Model the payroll month as an explicit, auditable state machine: OPEN → INPUTS CLOSED (cut-off) → PROCESSED → APPROVED → LOCKED → DISBURSED → FILED, with named owners per transition, reversible transitions before LOCK, and an immutable audit trail after it.
  - priority: P0 | rationale: greytHR's documented model is process-repeatedly-until-locked ('You can process the payroll multiple times in a month by changing the inputs until the payroll is locked'), with locking as the gate for LOP entry, arrears, FnF and reprocessing.
- Make cut-off dates a configurable object per pay group: attendance period (e.g. 26th–25th) separate from pay period (calendar month), plus separate cut-offs for reimbursement claims, variable pay and IT-declaration lock.
  - priority: P0 | rationale: Attendance and pay cycles routinely differ in India, and Hinote documents three concrete breakages from non-calendar wage periods: unautomatable arrears, wrong tax rates at the FY boundary with incorrect certificates, and PF/ESI accrual diverging from remittance because those are computed on calendar months.
- Support at least three explicit LOP day-rate conventions per pay group — fixed 30 days, actual calendar days in month, and pay-for-actual-attendance — and print the convention on the payslip.
  - priority: P1 | rationale: Downgraded from P0: the evidence that all three conventions are in live use is a single community source that could not be fetched directly in either sweep. The requirement is cheap and defensive, but validate the convention list with design partners before treating it as settled.
- Build attendance→payroll as a reconciliation surface, not a feed: ingest from biometric devices, roster/ERP exports, client MIS files and manual entry; show per-employee source-of-record, conflicts and unexplained gaps; require an operations owner to clear exceptions before inputs can close.
  - priority: P0 | rationale: The one job description verified verbatim in this sweep literally describes collecting from ERP + client MIS/biometric + manual inputs and 'Resolve discrepancies with Operations prior to payroll processing'.
- Detect post-processing attendance/leave changes and force an explicit reprocess-or-defer decision, showing exactly which employees' net pay would change and by how much.
  - priority: P0 | rationale: greytHR ships a banner for precisely this case, instructing that 'you must reprocess payroll to ensure the LOP days pulled from the Attendance module are up to date'. Without it the bank file and the attendance record silently diverge.
- Ship a first-class LOP reversal object with a configurable lookback of 1–12 months, carrying its own approval and appearing as a labelled line on the later payslip.
  - priority: P1 | rationale: Confirmed as a distinct greytHR capability governed by a named 'Reversal Month Range' setting with a documented 1-month minimum and 12-month maximum.
- Implement arrears as batches keyed to an effective retro date, recomputing all affected components across the retro period, showing the statutory delta (PF/ESI/PT/TDS) separately from the gross delta, and generating a per-employee arrear statement.
  - priority: P0 | rationale: greytHR models arrears as batches with an 'Arrear Effective From' date, per-batch or per-employee processing and downloadable statements. PF on arrears goes out on a separate reduced-field arrear return.
- Date PF liability on arrears by the DISBURSAL date, not the wage month the arrears relate to, and surface the resulting due month and interest exposure at the moment the arrear batch is approved.
  - priority: P1 | rationale: Under ReECR the arrear disbursal date determines the due month for remittance and therefore the 7Q/14B exposure. Getting this backwards produces a late remittance the operator cannot see coming. Verify the exact rule against the EPFO ReECR manual before building.
- Provide a dedicated new-joiner arrears path that pays a joiner who missed their first cut-off in the following month's run without corrupting their first payslip or their PF wage month.
  - priority: P1 | rationale: greytHR exposes an explicit 'Process New Joinee Arrears' button, indicating this is common enough to warrant its own code path; ReECR's Supplementary Return is the matching statutory artefact.
- Full-and-final settlement as a separate, lockable workflow capturing resignation date, last working day, settlement date, leaving reason, notice required vs served with auto-computed shortfall and recovery, days worked, leave encashment by leave type, loan/advance recovery, remarks and IT-declaration treatment — runnable inside or outside the month's payroll, with edit/delete/download per settlement.
  - priority: P0 | rationale: Field-for-field this is the greytHR F&F wizard as re-verified in this sweep, including the system-computed 'Shortfall in Notice'. FnF appears in every job description reviewed.
- Generate salary disbursement files against per-bank templates with configurable filename and extension, persist each generated file as a retrievable artefact tied to the payroll run, and reconcile returned bank status back onto each employee (success / failure / re-initiated / paid offline).
  - priority: P0 | rationale: greytHR's bank transfer output is template-driven with named 'File Name Start' and 'File Extension' fields and is persisted; Zoho's ICICI flow returns status ~30 minutes after initiation with re-initiate and record-offline paths. 'Reconcile salary payments with bank records' is an explicit job responsibility.
- Treat direct bank integration as optional and always ship the file-plus-portal path as the primary rail; where an integration exists, surface the bank-side maker-checker step as an explicit, trackable stage of the run rather than hiding it, including the bank's own initiation window.
  - priority: P0 | rationale: Zoho's ICICI flow requires a corporate current account, bank-side document onboarding, an in-portal OTP approval, and initiation only on business days between 01:00 and 18:30; its YES Bank rail is closed to new customers. Integrations are neither universal nor durable.
- Build the compliance calendar as versioned, per-state, per-entity DATA (act, form, authority, periodicity, due date, effective-from/to), sourced from statute and portal behaviour rather than from vendor tables, with override capability when an authority extends a date, and with each entry carrying its own provenance.
  - priority: P0 | rationale: This sweep found a leading vendor's state calendar wrong on both the due date (21st vs the statutory 20 days) and the filing authority (Labour Commissioner vs Commercial Taxes Department) for Karnataka PT, and the same vendor's national table recording ESI as 'state-dependent' when it is the 15th under Regulation 31. Copying vendor data ships their errors.
- Support the ReECR return taxonomy natively: Regular, Supplementary (members missed in the regular return) and Revised (corrections to a filed return), with return submission modelled as a separate step from payment generation, and an unbroken sequential monthly filing ledger per establishment that blocks skipping a month.
  - priority: P0 | rationale: EPFO Circular Compliance/ECR Revamp/2025/12997 dated 26.09.2025, effective wage month September 2025, restructured ECR exactly this way: file first, pay only after return approval, with mandatory sequential chronological filing. Any design built on the pre-2025 single-shot ECR model is obsolete.
- Draw the hard verification gate immediately before PAYMENT INITIATION, not before return submission, and warn explicitly that downward revision is impossible after that point while upward revision remains open.
  - priority: P0 | rationale: ReECR permits upward revision at any time but downward revision only before payment initiation. That asymmetry — not return submission — is the true irreversibility boundary for PF, and it is where over-remittance becomes unrecoverable.
- Generate the actual statutory artefacts, not summaries: the ECR as a plain-text UAN-based file with 11 #~#-delimited fields per member line and no header row, the reduced-field arrear return, the ESI contribution file, state PT challans and returns, and the quarterly salary TDS return — each validated against its own schema before the operator opens a government portal.
  - priority: P0 | rationale: The ECR is a delimited text file uploaded to the employer portal; ReECR adds server-side validation of wages and UANs, so upstream validation is what keeps a filing from bouncing. Confirm the current field spec against the EPFO ReECR manual before implementation — the published file-structure PDFs are 404 and the widely-cited header-line structure belongs to the superseded ECR 1.0.
- Add a pre-submission verification gate covering the known error classes: employee in payroll but missing from the return, UAN missing or malformed, wage month mismatch, arrear wages in the regular wages column, ineligible pension contributions, and headcount/total variance vs the previous month.
  - priority: P0 | rationale: ReECR now flags several of these server-side (including ineligible pension contributions), which means catching them client-side is table stakes rather than differentiation — but a bounced or revised return still costs the operator a cycle against a hard 15th deadline.
- Model every form and deduction section as a versioned label bound to a tax year, and accept both vocabularies in search, imports, help content and support: Form 16/130, 16A/131, 24Q/138, 12BB/124, 26AS/168, 12B and 12BAA/122, 80C/123, 80D/126.
  - priority: P0 | rationale: The Income-tax Act 2025 has been in force since 1 April 2026, yet an August 2026 job posting still specifies 'Form 24Q, Form 16'. Historical periods legitimately retain the old forms — FY 2025-26 was certified on Form 16 — so a single global rename is wrong in both directions.
- Run the IT-declaration and proof season as a configurable window: open declarations at FY start, enforce the regime-election gate before the first payroll of the FY, open proof submission around December with an admin-set lock date, support approve at an actual approved amount / reject-with-reason / bulk approve, and let the admin choose the payroll month that absorbs the true-up.
  - priority: P0 | rationale: This is Zoho's documented workflow end to end, including the December opening guidance, the named lock-date preference, and the explicit 'Select the month from which the payroll should be processed with the approved amount.'
- Make previous-employer income a structured, prompted, deadline-tracked input for every mid-year joiner at onboarding, collected on Form 122 (which now merges the former Forms 12B and 12BAA), with an explicit 'not furnished' state that visibly projects the year-end TDS shortfall to both employee and employer.
  - priority: P0 | rationale: Form 122 is the live statutory artefact under s.392(4)(a) of the Income-tax Act 2025, published by the Income Tax Department as replacing Forms 12B and 12BAA, and now also carries other income and TDS/TCS details. The employer cannot verify the disclosure, so the system must at least make the consequence visible early.
- Automate annual TDS certificate assembly: orchestrate the TRACES request and download (handling the one-calendar-day authentication code and the request number), generate the computation part, merge, digitally sign and publish to the employee portal or email — without requiring a hand-driven desktop utility and a physical eToken. Build against the new three-part certificate structure.
  - priority: P1 | rationale: The documented incumbent flow requires a downloaded signer application, administrator install and an eToken. The certificate is simultaneously being reissued as Form 130 with a redesigned three-part structure and a 15 June deadline, so every vendor must touch this code — a rare window to leapfrog rather than match.
- Give the founder/CFO a single approval artefact before disbursement: total payout, headcount and cost variance vs prior month with per-employee explanations of every delta (joiner, exit, LOP, arrear, incentive, tax true-up), total statutory liability due with its due dates, and one-click approve or return-for-correction.
  - priority: P0 | rationale: 'Obtain management approval before disbursement' is an explicit, re-verified job responsibility, and greytHR's own post-payroll step is a comparison against the previous month with named reconciliation reports.
- Give the employee a payslip that explains itself — every deduction traceable to its rule and its input (which days were LOP, which proof was rejected and why, which arrear month a line belongs to) — plus regime comparison, proof status tracking, and self-serve certificate and tax-computation-sheet download.
  - priority: P1 | rationale: Employee query resolution is a named responsibility in the job specs; Zoho's employee portal exposes proof statuses and outcome categories precisely because these drive queries.
- Support a deskless mode: device- and roster-driven attendance capture, shift and overtime rules, and wage-register outputs for the Minimum Wages, Payment of Wages, Bonus and Gratuity Acts.
  - priority: P1 | rationale: The verified transport posting requires exactly this — shift patterns, overtime, biometric and client MIS attendance, deployment reconciliation, and 'Maintain statutory registers and documentation' across those four acts. The contractor/Factories Act extension of this requirement rests on a posting not re-verified in this sweep.
- Support multi-entity and client-wise payroll structures from day one: differing salary structures, differing statutory applicability per client or entity, and cost reconciliation of payroll against client billing or cost centre.
  - priority: P2 | rationale: A verified ₹25-30k/month executive at a small transport operator already maintains 'separate payroll structures for each client', a per-client 'compliance applicability matrix', and reconciles 'salary payouts vs client billing'.
- Ship Excel/CSV import and export at every stage — inputs, register, variance, bank file, statutory returns — and make round-tripping non-lossy.
  - priority: P0 | rationale: 'Advanced Excel / Google Sheets (reconciliation, MIS, control reports)' is a verified hiring requirement alongside payroll software. The operator will reconcile in a spreadsheet whether or not the product wants them to.
- Provide an external-accountant/consultant access mode: scoped multi-client access, a per-client compliance and filing status board, and reviewer comments that do not require an employee licence.
  - priority: P2 | rationale: Kept at P2 but note the evidence is weak — a single CA-firm job posting that does not scope payroll-only work. Validate demand with primary research before building.

## Implications

- The problem statement is not 'payroll calculation is hard' — calculation is commoditised. The problem is INPUT RECONCILIATION AND THE LAST MILE: getting attendance/leave/OT/arrears/FnF inputs correct and closed by a cut-off, then getting money out of a bank and returns onto four government portals. The one job description re-verified in full in this sweep spends the overwhelming majority of its lines on inputs, reconciliation, deposits and filings, and almost none on gross-to-net.
- The month is a state machine with an explicit LOCK, and correctness is achieved by iterating BEFORE the lock rather than by getting it right first time. Design for the iterate-and-diff loop — variance vs last month, per-employee explanation of delta — not for a single clean run.
- The irreversibility line has MOVED, and the prior sweep drew it in the wrong place. EPFO's re-engineered ECR (Sept 2025) separates return filing from payment and adds Revised and Supplementary returns, so a filed PF return is now correctable. The real asymmetry is narrower and sharper: downward revision is possible only BEFORE payment initiation, upward revision at any time, and a bank NEFT cannot be recalled at all. Concentrate verification effort immediately before payment initiation, not before return submission.
- ReECR's mandatory sequential chronological filing is a hard architectural constraint, not a nicety: a skipped or failed month blocks every subsequent month. The product needs an unbroken per-establishment filing ledger and must refuse to let a month be silently abandoned.
- Because EPFO now auto-calculates 7Q interest and 14B damages on its own platform, the product should NOT compute penalties as its own source of truth — it should predict exposure to warn the operator, then reconcile against what EPFO actually assesses.
- Statutory dates, section numbers AND form numbers are DATA, not code — and this is now proven, not projected. The Income-tax Act 2025 has been in force since 1 April 2026: 80C is Section 123, 80D is Section 126, Form 16 is Form 130, 24Q is Form 138, 12BB is Form 124, 26AS is Form 168, and 12B/12BAA are merged into Form 122. Any UI, payslip or certificate label set hardcoded to the old numbering is already wrong.
- Build for BOTH vocabularies simultaneously. A job posting from August 2026 still specifies 'Form 24Q, Form 16'. Search, help content, field labels, imports and support flows must accept old and new names interchangeably, and historical periods legitimately keep the old forms (FY 2025-26 was certified on Form 16).
- Incumbent vendor documentation is demonstrably unreliable as a compliance source during this transition — this sweep found a live Zoho page stating the wrong deduction limit for Section 126, and a greytHR state calendar with both the wrong due date and the wrong filing authority for Karnataka PT. If the product's differentiation is compliance correctness, the compliance data set must be built from statute and portal behaviour and version-controlled, and that is itself a defensible moat.
- The buyer and the user are different people with different anxieties: the operator fears the scramble and the employee queue; the founder holds the bank authorisation and signs off the register. An in-product approval surface must serve both — the operator wants the month closed, the founder wants a provable, auditable number.
- The annual cycle has two hard gates a product can own end-to-end and that no spreadsheet handles well: the regime election (only before the first payroll of the FY, while unlocked) and the December-to-February proof window with an explicitly chosen true-up month. Mid-year joiners concentrate failure across both, and their previous-employer disclosure is now a named statutory artefact — Form 122 — which the employer cannot verify.
- Salary-TDS-certificate issuance as documented is a manual, multi-system, physically-tokened assembly (TRACES download with a one-day-valid auth code, ZIP upload, desktop signer app, eToken). It is an annual, deadline-bound, high-visibility chore and the place where incumbent workflow is most obviously dated — and the certificate is being reissued under a new number and a redesigned three-part structure, which forces every vendor to touch this code anyway.
- Deskless/frontline is not the same product. Attendance arrives from biometric devices, client MIS and paper; wages are shift/OT/deployment-driven. Serving 20-200-person factories, hospitals, retail and transport requires an attendance-ingestion and reconciliation layer, not just an ESS app.
- Excel does not go away — it is a named hiring requirement alongside the payroll system. A product that cannot export, be reconciled against, and re-import at every stage will be worked around rather than adopted.
- Multi-entity / multi-client payroll appears even at small scale: a ₹25-30k/month executive at a small transport operator already runs client-wise payroll structures with per-client compliance applicability. Treat 'one legal entity, one state' as a simplifying assumption a meaningful minority of the target will violate.

## Open questions

- The EPFO ReECR user manual (User-Manual-ReECR_v3.0) and the official revamped-ECR FAQ were identified but not read first-hand — epfindia.gov.in 301-redirects to epfo.gov.in and both 404 on the file-structure and introduction PDFs. The exact ECR field list, the arrear return's reduced field set, the precise revision boundary conditions, and the current ECR version in force as of Sept 2026 all still need a first-hand read of that manual. This is the single highest-value remaining verification task.
- Whether the #~# separator survived the ReECR revamp is unconfirmed. Every source except one outlier says #~#, but all of them may predate or postdate the Sept 2025 revamp inconsistently, and no post-revamp primary spec was read.
- Karnataka PT: the statutory 20-day rule is well corroborated, but whether the state has since notified a different date (the sources note the date 'can be revised by notification') was not checked against a Commercial Taxes Department notification. The other Karnataka form dates rest entirely on a vendor calendar now shown to contain two errors and should all be re-verified.
- Keka and Darwinbox product documentation still could not be read (help.keka.com 403 in the prior sweep). The monthly-cycle reconstruction leans entirely on greytHR and Zoho Payroll. Whether their cut-off, lock and reprocess semantics match is unknown, and the vendor list attributed to job postings in the prior sweep was not re-verified.
- Five of the seven job postings underpinning the personas were not re-pulled in this sweep. Only the Rhibhus posting was independently re-verified, and it verified perfectly — but the founder/CFO, CA-firm and factory-administration personas each rest on evidence that has been read once and not confirmed.
- No quantitative evidence exists for how long the monthly close takes, how many payroll queries a 20-200-person employer fields per month, the error/rerun rate, or the day-of-month timeline. Both sweeps found nothing credible. This is a genuine gap that only primary research will close.
- CiteHR renders client-side and could not be fetched in either sweep; Reddit and LinkedIn remain inaccessible. Practitioner failure evidence is therefore second-hand throughout, which is why the LOP day-rate finding was downgraded to low. A manual pass over practitioner forums would materially strengthen the 'what breaks' section.
- How mid-year joiners' previous-employer PF (UAN transfer, Form 11) interacts with the payroll month is still undocumented — only the tax side is covered, and ReECR's UAN-based validation makes this more consequential than before, since an unlinked UAN now fails server-side validation.
- Which banks' salary file formats incumbents actually support remains unknown despite a direct attempt: greytHR's Bank Transfer documentation exposes a 'Bank Template' dropdown without enumerating its options, and names only an HSBC 'PayNow' integration. The format list appears to be genuinely undocumented publicly.
- Gratuity accrual/provisioning and bonus (Payment of Bonus Act, within 8 months of FY end) appear in compliance checklists but their operational workflow inside the annual cycle was not documented in any source read, and both appear as named responsibilities in the verified job posting.
- Whether Form 130's redesigned three-part structure changes what the employer must supply (versus what TRACES generates) is unverified, and it determines how much of the certificate flow a product can actually automate.

## Retracted

- RETRACTED — the prior sweep's claim that the ECR consists of 'a HEADER line plus one DETAILS line per member'. That structure belongs to the superseded 25-field ECR 1.0 spec. ECR 2.0 is UAN-based, 11 fields, no header line. The prior sweep read the wrong document.
- RETRACTED — the prior sweep's claim that 'ECR filing is effectively irreversible: once uploaded and the challan generated it cannot be edited or deleted, so corrections must be made through a SEPARATE arrear ECR'. EPFO's re-engineered ECR, effective wage month September 2025 under Circular Compliance/ECR Revamp/2025/12997, provides Revised Returns for corrections and Supplementary Returns for missed members, and separates return filing from payment. The correct statement is narrower: downward revision only before payment initiation, upward revision at any time, no cancellation after approval. Any requirement written against the old claim is wrong.
- RETRACTED — 'Karnataka requires monthly PT in Form 5A by the 21st' to the 'Labour Commissioner'. Both are wrong. The statutory position is within 20 days of the expiry of the month, filed through e-PRERANA with the Commercial Taxes Department. greytHR's own Form 5A wiki contradicts greytHR's own compliance calendar; the prior sweep took the calendar at high confidence.
- RETRACTED — the prior sweep's own retraction of the ESI 15th date. That retraction was wrong and is reversed: ESI contributions are due by the 15th of the following month under Regulation 31 of the ESI (General) Regulations 1950, nationally. greytHR's 'state-dependent' table entry is a vendor error.
- RETRACTED — the prior sweep's own retraction of 'Form 16/130'. That retraction was wrong and is reversed: Form 130 is the salary TDS certificate under the Income-tax Act 2025 from Tax Year 2026-27, replacing Form 16. The Kaamwork page was correct and the prior sweep discarded a true fact.
- RETRACTED — the prior sweep's characterisation of Zoho's '₹1,50,000 under Section 126 (formerly 80D)' as 'almost certainly a summarisation artifact'. It is not an artifact; the figure is genuinely printed on the live Zoho help page. The number itself is still wrong — Section 126 limits are ₹25,000 / ₹50,000 with roughly ₹1 lakh aggregate — but it is a vendor documentation error, which is a more useful finding than a fetching artifact.
- CORRECTED — the pre-payroll checklist has 18 enumerated items, not the ~16 stated. Minor, but the prior sweep also omitted 'Update any other salary changes' and split the IT-declaration steps incorrectly.
- CORRECTED — 'TDS to the Income Tax Department by the 7th' is incomplete. TDS deducted in March is due 30 April. The prior sweep missed the one permanent exception, which falls in the same week as the FY-boundary true-up.
- DO NOT USE — the 23rd/25th/26th/27th day-of-month payroll timeline. Downgraded to low confidence. It is a convention asserted by vendor marketing pages with no primary, survey or employer-sourced backing found across two sweeps. It is not a standard and not a statutory requirement.
- DO NOT CITE as current practice — the ESIC due-date extension to 11 June 2020. It is a COVID-era circular and supports only the general point that due dates are circular-driven. Note that the far better contemporary example is EPFO extending September 2025 ECR filing to 22 October 2025 for the ReECR transition, which is recent and directly relevant.
- DOWNGRADED — the CA-firm payroll-outsourcing persona, from medium to low. It rests on one job posting that does not scope payroll-only work. Treat as hypothesis, not finding.
- DOWNGRADED — the LOP day-rate conventions finding, from medium to low. CiteHR could not be fetched directly in either sweep, so no quote supporting it is first-hand.
- INTERNAL INCONSISTENCY in the prior report: verification_notes claimed 'six Indeed postings' then listed seven. Also cited greytHR article 147138436 for IT declaration in the notes while the findings sourced IT declaration entirely to Zoho; that greytHR article was not used in any finding and is not carried forward.
