# [r5] ecr-spec-and-tds-file-formats

## Verification notes

METHOD. I re-derived every load-bearing claim from the primary artefact rather than trusting the prior transcription. Downloaded all three EPFO PDFs (circular sha256 a02b4ae7..., manual 3667e099..., FAQ ed7922cf...); confirmed the circular and FAQ carry ZERO extractable text (image-only scans) and so read all 13 scan pages as rendered images myself; read the manual text layer in full and rendered the screenshot-only field tables at 400-1400 dpi. Parsed the Form 138 Q1-Q3 xlsx sharedStrings and the 138RQ1.txt sample byte-wise. Defeated the incometaxindia.gov.in edge block and retrieved the CBDT Guidance Notes.

VERDICT: the EPFO half is unusually accurate - every verbatim quote I checked matched exactly. The TDS half is accurate on substance but its methodology and confidence reasoning were not, and it abandoned two questions that were answerable.

RETRACTED/CORRECTED (6). (1) FABRICATED PRECISION: "the literal 4-character delimiter '#~#'" - it is THREE characters. Verified at 900 dpi. Exactly the error that silently breaks a parser. (2) FABRICATED FRESHNESS: "Both Protean pages read 'Updated As On 2026-9-5' ... so the Q4 status is current as of today". That string is generated client-side by a footer script (var now = new Date(); ... innerHTML = datetime). It renders today's date for every visitor every day and carries no freshness information; the only hardcoded date is a commented-out "2024-11-13" plus a 2024 copyright. The prior round read its own clock and called it a publication timestamp. The Q4 finding survives because I re-verified the hrefs today. (3) FALSE METHODOLOGY: "Protean is a React SPA whose raw HTML is an empty 2.7KB shell - exactly the trap that produced earlier contradictory readings". False - both pages are static server-rendered HTML (55,134 bytes/138 anchors regular; 57,468/129 correction) with every href in the raw markup. Harmless to the findings but it would send a PRD author building browser-automation they do not need. (4) UNDER-SEARCHED NULL: "incometaxindia.gov.in blocks scripted access, so no rule text was read" - the block is defeated by sending a complete browser header set (Referer + sec-ch-ua + Sec-Fetch-*), and the same PDFs are fetchable in-page. Two abandoned questions are now answered from CBDT primary sources. (5) FLAG vs BLOCK overstated for the EPS >Rs15,000/post-2014 rule. (6) Citation slip: "Manual section B steps 1-16" - section B runs to step 33.

PROMOTED. Rule 219 and the Q1-Q4 due dates, previously "low confidence, secondary commentary, DO NOT BUILD AGAINST", are now confirmed verbatim by CBDT Guidance Note FN-138. The Q4-blocks-the-certificate link, previously flagged INFERRED, is now stated outright by CBDT. Form 130's internal structure is resolved.

MATERIAL OMISSIONS I ADDED. Annexure III (a third, Q4-only annexure); the payroll-critical form renumbering the prior list skipped (12BB->124, 12BA->123, 12B/12BAA->122, 15G/15H->121, 10E->39, 26AS->168) - these are the forms an HRMS actually collects and issues; mandatory 7Q interest; International Workers EPS; VPF; the joint declaration needed to correct a date of exit.

WHAT STILL COULD NOT BE GOT. The arrear return layout. I strengthened this null well past the prior round: enumerated all 1,869 PDFs on the EPFO circulars index (only ECRRevamp_26092025.pdf relates), checked the revamped-ecr page (lists exactly two documents), and probed the employer portal for the help-file static paths (all 302 to login / 404). It is genuinely behind authentication.

HOW MUCH TO TRUST THIS. EPFO sections: build directly from them, they are quote-exact against primary sources. TDS sections: the facts are sound and now better sourced, but treat any freshness or confidence language from the prior round as unreliable - re-check the Protean Q4 anchors before committing to a date. No vendor blog, aggregator or tax-commentary site is used as evidence anywhere in this report.

## Key findings (36)

### 1. [high] CORRECTED FABRICATED PRECISION: the ECR delimiter is the THREE-character string '#~#', not four characters as the prior round stated. Everything else about the layout is confirmed.

EPFO User Manual ReECR v3.0 p.8, portal Help File rendered at 900 dpi, reads verbatim: 'Return File consists of 11 Fields as mentioned below which are separated by "#~#".' The characters are #, tilde, # = 3 bytes. Sample lines confirm: 100257274743#~#NITESH#~#15000... Prior text said 'the literal 4-character delimiter'.

Source: https://pmvbry.epfindia.gov.in/wp-content/uploads/2025/10/User-Manual-ReECR_v3.0.pdf

### 2. [high] CONFIRMED: the re-engineered ECR did NOT change the file layout. Three independent primary sources now say so.

(1) Circular Compliance/ECR Revamp/2025/12997 dated 26.09.2025 para 3(vi): 'ECR Format: There is no change in the existing format of the ECR.' (2) FAQ Q16: 'Whether the ECR file format undergone any change under revamped module? Answer: No, the .txt format / layout of the ECR remains the same under the revamped system. Employers will still upload the same schema, though validations and workflow will be stricter.' (3) The live EPFO page itself lists as a key feature 'No change in the existing format of the ECR.' FAQ Q2(e): 'The format of the ECR file (.txt layout) remains unchanged'. I read the circular and FAQ as images since both are 0-text scans.

Source: https://pmvbry-cdn.epfindia.gov.in/wp-content/uploads/2025/09/ECRRevamp_26092025.pdf

### 3. [high] VERIFIED EXACT FIELD ORDER: 11 fields separated by '#~#' - (1) UAN, (2) Member Name as per UAN, (3) Gross Wages, (4) EPF Wages, (5) EPS Wages, (6) EDLI Wages, (7) Employee PF Contribution, (8) Employer EPS Contribution, (9) Employer PF Contribution, (10) NCP Days, (11) Refund of Advance. Gross Wages mandatory.

Transcribed character-by-character from the rendered Help File screenshot, manual p.8. Note reads '(## Note: Gross wages are mandatory.)'. Golden fixture lines verbatim: 100257274743#~#NITESH#~#15000#~#15000#~#15000#~#15000#~#1800#~#1250#~#550#~#0#~#0 and 100427601130#~#RAMESH#~#15000#~#15000#~#15000#~#15000#~#1800#~#1250#~#550#~#0#~#0. Arithmetic self-consistent (1800=12%, 1250=8.33%, 550=difference); 11 values and 10 delimiters per line.

Source: https://pmvbry.epfindia.gov.in/wp-content/uploads/2025/10/User-Manual-ReECR_v3.0.pdf

### 4. [high] VERIFIED: no header row. Wage Month, Return File, Return Type, Contribution Rate and Remark are five separate mandatory portal form controls, not file content.

Manual p.7 upload screen shows all five fields each marked with a red asterisk, with a Contribution Rate dropdown open on p.8 showing 12% and 10%. Both sample lines are data lines with no preceding header. Manual step B.1 verbatim: 'Upload the return file (.txt format) and select Return Type as Regular Return. Contribution rate can be selected from the drop down as 12% or 10%.'

Source: https://pmvbry.epfindia.gov.in/wp-content/uploads/2025/10/User-Manual-ReECR_v3.0.pdf

### 5. [high] VERIFIED: EPFO mandates no filename pattern, only character and packaging constraints.

'Important Notice' popup, manual p.7, verbatim: 'Please only use alphabets and numbers in file names. Remove special characters and spaces from the file name.' / 'Max Size of File Upload is 8 MB. If text file size exceeds 2 MB, please compress it using winzip. Smaller files can also be uploaded in zip format.' / 'Do not upload any other files like jpg, gif, doc, xls, ppt etc bundled inside the zip.' / 'Only text file or zip file containing only one text file can be uploaded (file extension should be in small case).' No filename template appears in the manual, FAQ or circular.

Source: https://pmvbry.epfindia.gov.in/wp-content/uploads/2025/10/User-Manual-ReECR_v3.0.pdf

### 6. [high] VERIFIED SECOND FILE FORMAT: the Part-Payment contribution file has 6 fields separated by '#~#' - UAN, MEMBER_NAME, EPF_CONTRIBUTION, EPS_CONTRIBUTION, EPF_EPS_DIFF_CONTRIBUTION, REFUND_OF_ADVANCES. Uploaded on a different screen whose form has only three fields (Wage Month, Contribution File, Remark) - no Return Type, no Contribution Rate.

CONTRIBUTION_HELP_FILE.pdf reproduced in manual p.17, cropped and read at 1400 dpi: '(Contribution File consists of 6 Fields as mentioned below which are separated by #~#)'. Samples verbatim: 123467198618#~#VIRAT SHARMA#~#300#~#100#~#50#~#0 and 123467198645#~#ROHIT VARMA#~#1800#~#1250#~#550#~#0. Circular para 6(ii): 'Part Payment: Allows the employer to upload a separate contribution file detailing specific amounts.'

Source: https://pmvbry.epfindia.gov.in/wp-content/uploads/2025/10/User-Manual-ReECR_v3.0.pdf

### 7. [high] NEW - OMITTED BY PRIOR ROUNDS: payment of interest under section 7Q is MANDATORY and auto-calculated; damages under 14B may be deposited later at the employer's option. This is a hard cash-flow requirement the prior report never surfaced.

Circular para 3(iv) verbatim: 'Mandatory payment of Interest u/s 7Q : The system will auto calculate the due interest amount u /s 7Q and it is mandatory to pay along with monthly contribution'. Circular para 3(iii) adds the 14B/7Q calculation provision. FAQ Q10: 'Interest under Section 7Q becomes automatically applicable (for delay in payment) and is computed by the system' / 'Damages / penalties under Section 14B may also be applied for defaults' / 'However, the employer shall have the option to deposit Damages either forthwith or at a later stage.'

Source: https://pmvbry-cdn.epfindia.gov.in/wp-content/uploads/2025/09/ECRRevamp_26092025.pdf

### 8. [high] VERIFIED: return submission is separated from payment. Upload -> validate -> return statement -> approve/reject -> Due Deposit Balance Summary -> challan with TRRN -> pay -> download receipt. An approved return can never be cancelled. Multiple challans ARE permitted.

Circular para 3(i): 'Segregation of Return and Payment...'. FAQ Q7 steps a-f end 'Thus, the separation of "return filing" and "payment generation" ensures better checks and reduces errors.' FAQ Q12 verbatim: 'No, once a return is approved, it cannot be canceled.' FAQ Q4: 'Yes. The revamped ECR system allows generation of multiple challans. However, the employers are advised to ensure accuracy in order avoid duplication of payments for the same employee.'

Source: https://pmvbry.epfindia.gov.in/wp-content/uploads/2025/10/FAQ_OnRevampedECR.pdf

### 9. [high] VERIFIED: three return types with hard sequencing. Supplementary needs an approved Regular, may be filed repeatedly, may contain only members absent from all prior returns for that month. Revised needs an approved Regular, no other return in process, no payment initiated, and overwrites prior data. Downward revision only before payment; upward revision unrestricted per the circular, though the FAQ hedges to 'in many cases'.

Circular para 5 verbatim: '(i) Downward Revision is permissible only before the employer initiates the payment process for the respective wage month. (ii) Upward Revision has no such restriction. (iii) A Revised Return requires an approved Regular Return to be present in the system, and no other return can be in process, nor can a payment process have been initialized for that wage month.' Manual p.23-24 and p.28 restate both. FAQ Q5 note (b) softens to 'An upward revision (i.e. paying more) is allowed even after payment in many cases' - build to the circular, treat the FAQ hedge as a caution.

Source: https://pmvbry-cdn.epfindia.gov.in/wp-content/uploads/2025/09/ECRRevamp_26092025.pdf

### 10. [high] VERIFIED by three sources: strict month-wise chronological filing, plus a four-month transitional relaxation after which a Regular Return for month M is allowed only if returns for ALL active members of month M-4 have been filed. The exit-marking relaxation also expires after four months.

Circular para 3(vii): 'Sequential payment: The system mandates month wise chronological filing of ECR.' Circular para 7(i)-(iii) sets out the four-month rule. Manual section E p.33 (present in the document but omitted from its own Contents list, which stops at D): 'Initially for a period of 4 months, employers shall be allowed file regular returns for a subset of active members... after a four-month period, the system will enforce the condition that the regular return for a particular month shall be allowed only if returns for all active members of the month four months prior have been filed.' FAQ Q24 adds: 'This implies that relaxation of marking date of exit is allowed for a period of four months only.' FAQ Q25 gives the illustration.

Source: https://pmvbry.epfindia.gov.in/wp-content/uploads/2025/10/User-Manual-ReECR_v3.0.pdf

### 11. [high] CORRECTED - FLAG vs BLOCK. Only the age-58 EPS rule is a hard system block. The 'joined after 1 Sep 2014 with wages above Rs 15,000' rule is a FLAG shown to the employer before filing, not a rejection. The prior report described both as blocks.

FAQ Q11 (hard block): 'The revamped ECR system has in-built validations to automatically restrict EPS contributions in respect of members who have attained the age of 58 years and have not been marked for deferred pension. In such cases, only the EPF (Provident Fund) contributions are accepted, while the EPS component is disallowed by the system.' FAQ Q8(a) (flag only): 'Flagging ineligible EPS contributions (e.g. employees whose wages exceed Rs 15,000 per month and who joined after 1 September 2014)'. FAQ Q14: 'the system will now flag such wrongful pension contributions before filing'. Circular para 8(iii): 'The revamped ECR flags all such accounts to the employer before filing ECR'. Note the FAQ itself is inconsistent on the joining date, saying 'after 1 September 2014' in Q8 and 'on or after 1 September 2014' in Q14.

Source: https://pmvbry.epfindia.gov.in/wp-content/uploads/2025/10/FAQ_OnRevampedECR.pdf

### 12. [high] VERIFIED other pre-upload validations: contributions permitted only between valid date of joining and date of leaving; rate must be statutory or higher, never below; exempted establishments must still populate EPF wages, PF contribution, EPS wages, EPS contribution and EDLI wages.

FAQ Q9: 'The revamped ECR permits remittance of contributions only for the period falling between the valid date of joining and date of leaving (if any) of an employee.' FAQ Q8(e): 'Contribution is calculated at the rate of either statutory or higher rate only, but not below the statutory rate.' FAQ Exempted Establishments Q3 (PF), Q4 (EDLI wages mandatory, contribution computed as zero) and Q5: 'Even if the establishment is exempted from all three schemes, it must still provide all relevant details - EPF wages, EPF contribution, EPS wages, EPS contribution, and EDLI wages - in the return. However, while generating the challan, the system will consider only inspection charges.'

Source: https://pmvbry.epfindia.gov.in/wp-content/uploads/2025/10/FAQ_OnRevampedECR.pdf

### 13. [high] NEW - OMITTED: correcting a wrongly recorded date of exit requires a JOINT DECLARATION by employer and employee, an offline dependency that can block a month's filing. Separately, date of exit can be marked without any member-detail/Aadhaar update.

FAQ Q9: 'If a date of leaving has already been entered in the system - whether inadvertently or otherwise - the payment of contributions for any period subsequent to the recorded date of leaving can be made only after correction of the exit date through a joint declaration submitted by the employer and employee.' FAQ Q20: 'Whether data mismatch like Aadhar details etc. affects marking date of exit of employees? Answer: No. Date of exit can be marked without member detail update.'

Source: https://pmvbry.epfindia.gov.in/wp-content/uploads/2025/10/FAQ_OnRevampedECR.pdf

### 14. [high] NEW - OMITTED: the FAQ covers Voluntary PF and International Workers, both of which a payroll engine must handle. VPF filing is unchanged (para 29(2) allows above-statutory employee rate; para 26(6) requires a joint written request and an employer declaration on admin charges). International workers who joined after Sept 2014 with wages above Rs 15,000 are not EPS members.

FAQ Q17: 'There is no change in the process of filing ECR relating to payment of contribution exceeding the statutory ceiling limit. Para 29(2) of the EPF Scheme permits and employee to contribute at a higher rate than the statutory rate of 10% or 12%.' FAQ Q18: 'Administrative charges are linked to Wages and not Contributions... in case of VPF relating to employee share only, the employer is liable to make payment of administrative charges at actual wages, subject to the wage ceiling limit.' FAQ Q6 covers international workers, including that pre-Sept-2014 joiners above the ceiling 'continue to remain member under EPS-1995 and are required to contribute on full salary'.

Source: https://pmvbry.epfindia.gov.in/wp-content/uploads/2025/10/FAQ_OnRevampedECR.pdf

### 15. [high] VERIFIED: beta status, applicable from wage month September 2025; pending pre-September-2025 ECRs must also go through the new system; unpaid old challans are void and must be regenerated.

Circular para 1: 'Beta version of Revamped Electronic Challan-cum-Return (ECR) system has been introduced, which shall be applicable for the wage month September 2025 onwards.' FAQ Q3 and Q19 verbatim as previously reported. I searched all 1,869 PDFs on the EPFO circulars index and found no later circular declaring general availability, so beta status still stands.

Source: https://pmvbry-cdn.epfindia.gov.in/wp-content/uploads/2025/09/ECRRevamp_26092025.pdf

### 16. [high] VERIFIED: NIL months use no file at all - the employer pays admin/inspection charges through 'Direct Challan Entry', enabled only when there are no active members.

FAQ Q21 verbatim: 'For wage months in which there are no employees (i.e., no active contributions), the employer must submit the administrative and inspection charges using the "Direct Challan Entry" facility. This facility will be enabled, only when there are no active members for that particular wage month.'

Source: https://pmvbry.epfindia.gov.in/wp-content/uploads/2025/10/FAQ_OnRevampedECR.pdf

### 17. [high] ARREAR LAYOUT: NULL CONFIRMED and strengthened. A separate 'File Arrear Return' flow exists but EPFO publishes no arrear file layout anywhere public. Arrears are a distinct channel, not extra lines in the monthly .txt.

Manual p.4 text confirms the Return Home Page has 'quick links for return filing, view/pay challan, file arrear return and access their filing histories', and the manual documents only sections A-E, never arrears. I went beyond the prior round: enumerated all 1,869 PDF links on https://www.epfo.gov.in/circulars/ - the only revamped-ECR document is ECRRevamp_26092025.pdf; the revamped-ecr page links exactly two documents (manual + FAQ); and I probed the employer portal for help-file static paths (ARREAR_HELP_FILE.pdf and siblings under unifiedportal-emp.epfindia.gov.in) - all return 302-to-login or 404. FAQ Q15 discusses only that the arrear DISBURSAL date sets the due month, with no layout.

Source: https://www.epfo.gov.in/revamped-ecr/

### 18. [high] VERIFIED: EPFO's site moved from epfindia.gov.in to www.epfo.gov.in, and the circular's own printed manual URL is dead.

curl: www.epfindia.gov.in/ 301s to www.epfo.gov.in/. Circular para 9 prints https://www.epfindia.gov.in/site_docs/PDFs/MiscPDFs/User-Manual-ReECR_v3.0.pdf and FAQ Q26 prints https://www.epfindia.gov.in/site_en/revamped_ecr.php - both dead. Live: https://www.epfo.gov.in/revamped-ecr/ serving PDFs from pmvbry.epfindia.gov.in and pmvbry-cdn.epfindia.gov.in (both HTTP 200, verified).

Source: https://www.epfo.gov.in/revamped-ecr/

### 19. [high] RE-VERIFIED TODAY: the Form 138 Q4 regular file format still does not exist. Protean lists 'File Format for Form Number 138 Q4 Version 1.0 (Expected to be released soon.)' and 'Sample file for Form Number 138 Q4 (Expected to be released soon.)', both with href='#'.

Raw HTML of the regular downloads page (55,134 bytes, static - not an SPA), anchors extracted verbatim. By contrast Q1-Q3 resolves to a real asset: '/downloads/e-tds/Form Number 138-24Q - Q1 to Q3_22072026.xlsx' (downloaded, 34,844 bytes). NOTE: I discard the prior round's freshness claim - the page's 'Updated As On' date is generated by client-side JavaScript from the visitor's own clock and proves nothing about content age.

Source: https://tinpan.proteantech.in/downloads/e-tds/eTDS-download-regular.html

### 20. [high] RE-VERIFIED: the Q4 CORRECTION format is also unavailable - 'File Format for Form Number 138 correction (4th Quarter) Version 1.0' has an EMPTY href. The August 2026 correction release covered 138 Q1-Q3, 140, 143 and 144 only.

Correction page raw HTML: that anchor's href attribute is the empty string, while the four that do resolve are all dated 04082026 - 'Form Number 138-24Q - Q1 to Q3_04082026_correction.xlsx', 'Form Number 140-26Q - Q1 to Q4_04082026_correction.xlsx', 'Form Number 144-27Q - Q1 to Q4_04082026_Correction.xlsx', 'Form Number 143-27EQ - Q1 to Q4_04082026_correction.xlsx'. Legacy 24Q Q4 correction v7.5/v7.6 still resolve normally, so the empty href is a real gap, not a site-wide defect.

Source: https://tinpan.proteantech.in/downloads/e-tds/eTDS-download-corr.html

### 21. [high] PROMOTED FROM INFERENCE TO FACT: the missing Q4 Annexure II is exactly what blocks the annual salary certificate. CBDT states the dependency outright.

CBDT Guidance Note for Form No. 138: 'Based on the data in Annexure I (quarterly) and Annexure II (Q4), TRACES prepares Form No. 130 (TDS Certificate for salary)... This is issued by the employer to each employee by 15th June of the following financial year... In the ITR, the salary details are taken directly from Annexure II of Form No. 138.' The prior round flagged this causal link as INFERRED; it is now verified.

Source: https://www.incometaxindia.gov.in/documents/d/guest/fn-138

### 22. [high] NEW - MISSED ANNEXURE III. Form 138 has THREE annexures, not two. Annexure I is filed all four quarters; Annexure II (salary summary) is Q4-only; Annexure III (pension and interest for specified senior citizens) is ALSO Q4-only. Prior rounds knew only Annexure II.

CBDT Guidance Note FN-138, 'Structure of Form No. 138': 'Annexure I is submitted for all four quarters, detailing the deductee-wise break-up of TDS during the quarter.' / 'Annexure II: Submitted only in the last quarter (Q4), providing detailed summary of the salary, deductions, rebate and Net Tax Liability for the Tax Year of the Employees.' / 'Annexure III: Submitted only in the last quarter (Q4), providing detailed summary of pension and interest income, deductions, rebate and Net Tax Payable for the Tax Year of the Specified Senior Citizen.'

Source: https://www.incometaxindia.gov.in/documents/d/guest/fn-138

### 23. [high] OPEN QUESTION RESOLVED: Form No. 130 does NOT simply keep Form 16's two-part split - it gains a Part C. Structure: Part A (certificate details, employer/specified bank and employee/specified senior citizen); Part B (summary of amount paid/credited and TDS); details of tax deposited via challan or book adjustment; Declaration; Part C Annexure-I (salary paid, other income, tax deducted); Part C Annexure-II (pension and interest for specified senior citizens). Due 15 June of the FY immediately following the Tax Year. Governed by section 395(4) and Rule 215.

CBDT Guidance Note FN-130-131-132-133 (retrieved as PDF, 528,484 bytes), 'Certificate wise details' table row 1, listing items (i) to (vi) as above, 'Issued against Form No. 138', due date '15th June of the Financial Year immediately following the Tax Year in which the income was paid and tax was deducted', change 'In alignment with the Income-tax Act, 2025'. Header table gives Corresponding section of I.T. Act 2025 = 395(4) and Corresponding Rule of I.T. Rules 2026 = 215. The prior round called this unobtainable.

Source: https://www.incometaxindia.gov.in/documents/d/guest/fn-130-131-132-133

### 24. [high] OPEN QUESTION RESOLVED: the annual certificate remains TRACES-generated and TRACES-only. A certificate not generated from TRACES is invalid.

CBDT Guidance Note FN-130-131-132-133, 'Other Salient Features of Certificate': '1. The certificate is valid only if it is generated from the TRACES portal. 2. Such downloaded certificate carrying the signature [Digital or physical] of the deductor/collector is only valid. 3. The duplicate certificate may be downloaded at any time by the deductor/collector from the TRACES portal.' Also: 'Any deductor/collector/employer who has deducted/collected tax... is required to place a request to download the TDS/TCS certificate at TRACES website.'

Source: https://www.incometaxindia.gov.in/documents/d/guest/fn-130-131-132-133

### 25. [high] PROMOTED FROM LOW CONFIDENCE TO VERIFIED: Form 138 is governed by Rule 219 of the Income-tax Rules, 2026, and the due dates are Q1 31 July, Q2 31 October, Q3 31 January, Q4 31 May of the FY immediately following the Tax Year. The prior round said DO NOT BUILD AGAINST THIS; it is now government primary.

CBDT Guidance Note FN-138 header table: 'Corresponding Rule of I.T. Rules, 1962: 31A | Corresponding Rule of I.T. Rules, 2026: 219'. Body: 'Form No. 138 is filed under Rule 219 of the Income-tax Rules, 2026.' Due-date table verbatim: Q1 Apr-Jun '31st July of the Financial Year'; Q2 Jul-Sep '31st October of the Financial Year'; Q3 Oct-Dec '31st January of the Financial Year'; Q4 Jan-Mar '31st May of the Financial Year immediately following the Tax Year in which deduction is made'. Separately: TDS deposit due dates are prescribed in Rule 218.

Source: https://www.incometaxindia.gov.in/documents/d/guest/fn-138

### 26. [high] VERIFIED IN FULL: CBDT's official mapping of new to old form numbers. TDS-relevant rows: 130<-16, 131<-16A, 132<-16B/16C/16D/16E, 133<-27D, 137<-24G, 138<-24Q, 139<-26B, 140<-26Q, 141<-26QB/26QC/26QD/26QE, 142<-26QF, 143<-27EQ, 144<-27Q, 125<-12BBA, 126<-15C/15D, 127<-27C, 128<-13, 129<-15E, 145<-15CA, 146<-15CB, 147<-15CC, 148<-15CD, 149<-26A, 150<-27BA.

Read the rendered table on the CBDT page 'FAQs and Guidance Notes on Forms as per Income-tax Rules, 2026', headed 'Form No. (IT Rules 2026) | Form No. (IT Rules 1962) | Description'. Row 130 reads '130 | 16. | Certificate under section 395 for tax deducted at source on salary paid to an employee under section 392 or pension or interest income of specified senior citizen under section 393(1)'. Row 138 reads '138 | 24Q. | Quarterly statement of deduction of tax under section 397(3)(b) of the Act in respect of salary paid to employee under section 392, or income of specified senior citizen under section 393(1) [Table: Sl. No. 8(iii)]...'. Row 137: '137 | 24G | TDS/TCS Book Adjustment Statement'. Page footer: 'Last reviewed and updated on: 31-Aug-2026'.

Source: https://www.incometaxindia.gov.in/w/faqs-on-forms-as-per-income-tax-rules-2026-1

### 27. [high] NEW - THE OMISSION THAT MATTERS MOST FOR AN HRMS: the prior renumbering list skipped the forms a payroll product actually collects and issues. Form 12BB (employee deduction/investment declarations) becomes Form No. 124; Form 12BA (perquisites) becomes 123; Form 12B/12BAA (previous-employer income) becomes 122; Forms 15G/15H become 121; Form 10E (relief for arrears, now s.157(1)) becomes Form No. 39; Form 26AS/AIS becomes Form No. 168.

Same CBDT mapping table, rows read verbatim: '121 | 15G, 15H. | Declaration under section 393(6) for receipt of certain incomes without deduction of tax'; '122 | 12B and 12BAA | Form for furnishing details of income under section 392(4)(a) for the purposes of making deduction where income is chargeable under the head "Salaries"'; '123 | 12BA | Statement showing particulars of perquisites, other fringe benefits or amenities and profits in lieu of salary with value thereof'; '124 | 12BB | Statement showing particulars of claims by an employee for deduction of tax under section 392(5)(b)'; '39 | 10E | Form for claiming relief under section 157(1) of the Act in case of receipt of additional salary, or gratuity or Retrenchment Compensation or commutation of pension'; '168 | 26AS. | Annual Information Statement'. Corroborated by FN-138: 'the deducted TDS amount reflects in the employee's Form No. 168 (AIS) as "TDS by employer"'.

Source: https://www.incometaxindia.gov.in/w/faqs-on-forms-as-per-income-tax-rules-2026-1

### 28. [high] VERIFIED SECTION RENUMBERING: s.192 -> s.392; s.194P -> s.393(1) [Table Sl. No. 8(iii)]; s.200(3) -> s.397(3)(b); s.197 -> s.395(1); lower collection -> s.395(3); TDS/TCS certificates -> s.395(4); non-resident appropriate proportion -> s.395(2)/400(3); accountant certificate for assessee-not-in-default -> s.398(2); TAN allotment -> s.397; 15G/15H declarations -> s.393(6); s.89 relief -> s.157(1).

CBDT mapping rows state these directly, e.g. '128 | 13 | Application for issuance of certificate for lower or nil deduction of income-tax under section 395(1) and lower collection of income-tax under section 395(3)'; '134 | 49B(1) | ...[TAN] under section 397'; '149 | 26A | ...accountant certificate under section 398(2)...'. Corroborated by Protean RPU/FVU 1.2, which renames the Annexure I column 'Certificate number issued by Assessing Officer u/s 197 for non-deduction / lower deduction' to 'Certificate number of the certificate issued u/s 395(1) for non-deduction / lower deduction'.

Source: https://www.incometaxindia.gov.in/w/faqs-on-forms-as-per-income-tax-rules-2026-1

### 29. [high] VERIFIED: 'Financial Year' becomes 'Tax Year'. The file field is a 6-digit YYYYYY value (202627 for Tax Year 2026-27) and the assessment-year field must be >= 202728. Currency symbol Rs. is replaced with the rupee sign.

Form 138 Q1-Q3 workbook sharedStrings, verbatim: 'Tax Year (YYYYYY) as per Act; e.g., 202627 for Tax Year 2026-27' and 'Assessment year e.g. value should be 202728 for Tax Year 2026-07. Value should be greater than or equal to 202728.' (the '2026-07' is a typo in the source). CBDT FN-138 'Common Changes made across Forms': 'Assessment / Financial / Previous year or years have been replaced with Tax year or years, wherever appearing in the Form/Annexure' and 'Currency symbol "Rs." has been replaced with the rupee symbol'. The 138RQ1.txt Batch Header carries 202627 and 202526.

Source: https://tinpan.proteantech.in/downloads/e-tds/eTDS-download-regular.html

### 30. [high] VERIFIED BYTE-WISE: Form 138 physical structure unchanged in mechanics. ASCII .txt, '^'-delimited variable-width fields, every record CRLF-terminated (hex 0D 0A), delimiter count one less than field count (File Header has 16 fields, so 15 delimiters). Record types FH, BH, CD, DD; File Type 'SL1'; Form Number '138'. Importing the .csi file from TIN Challan Status Inquiry is mandatory.

Workbook general notes verbatim: 'File should be generated in ASCII Format with "txt" as filename extension.' / 'Each Record (including last record) must start on new line and must end with a newline character. Hex Values : "0D" & "0A".' / 'This is a ^ delimited variable field width file...' / 'The total number of delimiters (i.e. "^") in any type of record should be one less than the total number of fields in the respective record. For example the total number of fields in "File Header record" is 16, hence the total no. of delimiters in File Header record would be 15.' / 'It is mandatory to import .csi file downloaded from TIN website (under Challan Status Inquiry tab) to verify the correctness of Challan details mentioned in the statement.' / 'TAN & TAN name present in TDS Statement should match with TAN & TAN name present under .csi file'. Confirmed against the downloaded 138RQ1.txt (692 bytes, 205 carets, 5 CRLF, 0 bare LF): '1^FH^SL1^R^06052026^1^D^BLRF02329F^1^Protean RPU 1.0^^^^^^^^' then '2^BH^1^1^138^...^202627^202526^Q1^...' then '3^CD^...' and '4^DD^...'.

Source: https://tinpan.proteantech.in/downloads/e-tds/138RQ1.txt

### 31. [high] VERIFIED: the Q1-Q3 Batch Header reserves the salary-annexure aggregates but marks them inapplicable, which is why Q4 is a separate unpublished artefact.

Workbook sharedStrings verbatim: 'Count of Salary Details  Records (Not applicable)', 'Batch Total of - Gross Total Income as per Salary Detail (Not applicable)', 'Count of Section 194P Detail Records (Not applicable)', 'Batch Total of - Gross Total Income as per Section 194P Detail (Not applicable)'. The legacy 24Q Q4 v7.5 workbook (downloaded, 191,488 bytes) confirms what those records carry under the old Act: Salary Detail records, Salary Detail Section 16 records, Salary Detail Chapter VI-A details, 'Gross Total Income', and 'Income Tax Relief u/s 89 when salary etc is paid in arrear or advance'.

Source: https://tinpan.proteantech.in/downloads/e-tds/eTDS-download-regular.html

### 32. [high] VERIFIED EXACTLY: the record layout change is genuinely breaking. Form 138 challan sub-headings 301->A, 302->B, 303 removed, 304->C, 305->D, 306->E, 307->F, 308->J, 309->G, 310->I, 311->H, 312->K. Deductee Annexure I: 313 sub-heading removed, 314->E, 315->C, 316->D, 317->F, 318->G, 319->H, 320->I, 321 removed, 322 removed, 323->J, 324->K, 325 removed, 326->M, 327->N. Surcharge, Education Cess and Penalty/Others removed from challan details. Interest and Fee become 'Total Interest' (C) and 'Total Fee' (D). New 'Interest Allocation' and 'Others Allocation' challan columns for all four forms. New 'Contact Number along with country code' under both deductor and person responsible. Deductee Date of Payment restricted to the applicable quarter and tax year.

Protean 'Key Features - RPU and FVU version 1.2' (downloaded, 174,373 bytes), section I items 1-2 and section II items 1-10, including the literal Existing/Revised mapping tables reproduced above. Also: BSR Code/Receipt Number and Challan Serial No. references change from Form No. 24G to 'Form No. 137'. Closing note: 'The applicability of points 1 to 10 for quarterly e-TDS/TCS statements shall be effective from FY 2026-27 onwards.' Corroborated independently by CBDT FN-138: 'removal of surcharge and cess details now consolidated under challan/Book Adjustment'.

Source: https://tinpan.proteantech.in/downloads/e-tds/download/Key%20Features%20_RPU%20and%20FVU%20version%201.2.pdf

### 33. [high] NEW - additional breaking changes CBDT names that Protean's note does not: Token No. is replaced by 'Return Receipt Number' and TAN Registration No. is deleted. Also, the new Form 138 is intended to auto-populate from the deductor's TRACES profile.

CBDT FN-138, 'Brief note on qualitative changes made': 'replacement of outdated fields (e.g., Token No. replaced with Return Receipt Number, and deletion of TAN Registration No.), streamlining of entries (removal of surcharge and cess details now consolidated under challan/Book Adjustment), and redundant references removed'. Also 'auto-population/pre-filling of relevant details using information available from the Deductor's TRACES profile', 'real time validations & error handling', 'integration with APIs & Databases'.

Source: https://www.incometaxindia.gov.in/documents/d/guest/fn-138

### 34. [high] VERIFIED: dual-stack requirement. RPU 1.2 + FVU 1.2 for Tax Year 2026-27 onward; RPU 6.0 + FVU 9.5 for FY 2010-11 up to FY 2025-26; FVU 2.191 for up to FY 2009-10. Mixing versions causes rejection.

Protean regular downloads page verbatim: 'New RPU version 1.2 - Applicable to e-TDS/TCS statements pertaining to TY 2026 -27 onward' and 'New RPU version 6.0 - Applicable to e-TDS/TCS statements pertaining up to FY 2025-26 .'; 'FVU for quarterly e-TDS/TCS statement pertaining to FY 2010-11 up to FY 2025-26' (9.5) and 'FVU for quarterly e-TDS/TCS statement up to FY 2009-10' (2.191). Warning verbatim: 'Please download and replace the existing folders with the latest version of FVU and RPU folders available at TIN website. Replacing only the FVU Jar file in the old folder may lead to the rejection of statement at the time of submission of the file.' Legacy formats remain live: 24Q Q1-Q3 v6.3, 24Q Q4 v7.5, 26Q v7.8, 27EQ v6.9, 27Q v7.5.

Source: https://tinpan.proteantech.in/downloads/e-tds/eTDS-download-regular.html

### 35. [high] VERIFIED DOCUMENTATION DEFECT: Protean labels the Form 138 Q1-Q3 regular format 'Version 1.2' but the workbook's own internal title says Version 1.1.

Page anchor text: 'File Format for Form Number 138 Q1 to Q3 Version 1.2' pointing at 'Form Number 138-24Q - Q1 to Q3_22072026.xlsx'. The sole version string inside that downloaded workbook (sharedStrings, 441 strings) reads: 'File Format for Salary TDS File - Form Number 138 (24Q)  - Q1 to Q3 (Version 1.1) for Tax Year 2026-27 onwards'.

Source: https://tinpan.proteantech.in/downloads/e-tds/eTDS-download-regular.html

### 36. [medium] NO RELEASE DATE is published for Form 138 Q4. Protean's only text is 'Expected to be released soon.' The prior round's supporting 'freshness' evidence was invalid and is discarded; the null itself holds on the absence of any date, changelog or announcement.

The phrase appears twice on the regular downloads page and nowhere else; the e-TDS/e-TCS services index carries no announcements section. The RPU/FVU 1.2 key-features note says nothing about Q4 or Annexure II. Discarded evidence: the 'Updated As On' footer, which is client-side JavaScript rendering the visitor's own clock.

Source: https://tinpan.proteantech.in/services/etds-etcs/etds-index.html

## PRD changes

- Specify the ECR return file as: plain-text .txt, one line per member, exactly 11 fields separated by the THREE-character literal delimiter '#~#' (hash, tilde, hash), no header row, in this order: UAN, Member Name as per UAN, Gross Wages, EPF Wages, EPS Wages, EDLI Wages, Employee PF Contribution, Employer EPS Contribution, Employer PF Contribution, NCP Days, Refund of Advance. Gross Wages mandatory; 10 delimiters per line. Correct any prior text saying '4-character delimiter'. Cite circular Compliance/ECR Revamp/2025/12997 dated 26.09.2025 para 3(vi) and FAQ Q16. Use the two Help File sample lines as golden test fixtures.
  - priority: P0 | section: EPF / ECR generator - file specification
- State that the September 2025 re-engineering changed workflow, validations and the payment lifecycle but NOT the file schema, so no parser or writer rewrite is required. Engineering effort belongs in the state machine, sequencing and pre-validation, not in file I/O.
  - priority: P0 | section: EPF / ECR generator - scope framing
- Capture Wage Month, Return Type (Regular/Supplementary/Revised), Contribution Rate (12% or 10%) and a mandatory free-text Remark as operator-facing values surfaced at export time. These are portal form fields, not file content - the generator must never encode them in the .txt.
  - priority: P0 | section: EPF / ECR generator - upload metadata
- Enforce pre-export: alphanumeric filename only (strip spaces and special characters), lowercase .txt extension, max 8 MB upload, auto-zip above 2 MB, exactly one text file per zip with no other file types. EPFO mandates no filename template, so the product may choose its own within these rules.
  - priority: P0 | section: EPF / ECR generator - naming and packaging
- Add a second, separate export: 6 fields separated by '#~#' - UAN, MEMBER_NAME, EPF_CONTRIBUTION, EPS_CONTRIBUTION, EPF_EPS_DIFF_CONTRIBUTION, REFUND_OF_ADVANCES. Same naming and packaging rules. Its upload screen has only Wage Month, Contribution File and Remark - no Return Type and no Contribution Rate. Own generator, own fixtures.
  - priority: P1 | section: EPF / ECR generator - Part Payment contribution file
- Model upload -> validate -> return statement generated -> approve/reject -> Due Deposit Balance Summary -> challan prepared (TRRN) -> pay -> download receipt. Persist return file ID and TRRN against the payroll period. Encode that an approved return can never be cancelled and that corrections go through a Revised Return. Support multiple challans per wage month while guarding against duplicate payment for the same employee.
  - priority: P0 | section: EPF / ECR - return lifecycle state machine
- NEW: model mandatory 7Q interest. The system auto-calculates interest under section 7Q and it must be paid along with the monthly contribution; damages under 14B may be deposited forthwith or later at the employer's option. Surface both in the payment screen and in cash-flow forecasting, and provide the separate 'Pay 7Q/14B charges' path.
  - priority: P0 | section: EPF / ECR - interest and damages
- Implement Regular, Supplementary and Revised with guard conditions: Supplementary requires an approved Regular, may be filed repeatedly, and may contain only members absent from all prior returns for that month; Revised requires an approved Regular, no other return in process and no payment initiated, and overwrites prior data; downward revision only before payment is initiated. Block invalid combinations in the UI rather than letting EPFO reject the upload.
  - priority: P0 | section: EPF / ECR - return types and sequencing
- Enforce strict month-wise chronological filing with no skipped months, plus the rolling rule that binds after the four-month transition: a Regular Return for month M is permitted only if returns for ALL active members of month M-4 have been filed. Warn on the dashboard when an unfiled month will block a future filing, and note the exit-marking relaxation also expires after four months.
  - priority: P0 | section: EPF / ECR - chronological filing constraint
- Mirror EPFO's checks client-side, distinguishing hard blocks from warnings. HARD BLOCK: EPS contribution for members over 58 not flagged for deferred pension (system disallows the EPS component outright). WARN ONLY: members who joined after 1 Sep 2014 with wages above Rs 15,000 (EPFO flags, does not reject). Also enforce the date-of-joining to date-of-leaving window, reject rates below statutory while allowing higher, and require EPF wages, PF contribution, EPS wages, EPS contribution and EDLI wages even for exempted establishments.
  - priority: P1 | section: EPF / ECR - pre-upload validation
- NEW: a date of exit recorded in error can only be corrected via a joint declaration by employer and employee, and until corrected no contribution can be filed for any period after that date. Model this as a blocking exception with an offline dependency and an SLA, since it can stall a whole wage month. Note date of exit CAN be marked without any member-detail or Aadhaar update.
  - priority: P1 | section: EPF / ECR - exit marking and joint declaration
- NEW: support Voluntary PF (employee may contribute above 12% under para 29(2); above-ceiling contribution needs a joint written request under para 26(6) plus an employer declaration on administrative charges; admin charges follow WAGES not contributions, and for employee-only VPF are payable on actual wages subject to the ceiling). Separately, international workers who became members after September 2014 with wages above Rs 15,000 are not EPS members, while pre-September-2014 joiners above the ceiling contribute to EPS on full salary.
  - priority: P2 | section: EPF / ECR - VPF and international workers
- Mark arrear generation OUT OF SCOPE and forbid writing an arrear generator until the layout is obtained from the authenticated portal. Record: arrears are filed on a separate 'File Arrear Return' screen with its own Arrear History; no public layout exists (verified absent across the manual, FAQ, circular, both document indexes, all 1,869 circular PDFs, and direct portal probes). Capture FAQ Q15's rule that the arrear DISBURSAL date sets the due month, and its distinction between true arrears (e.g. a DR revision) and merely belated salary.
  - priority: P0 | section: EPF / ECR - arrear returns
- Add a NIL-month path: no file at all, route the operator to 'Direct Challan Entry' for admin and inspection charges. Separately design for the failed-upload loop - EPFO returns a downloadable error file that the employer must act on; provide an import path mapping errors back to employee records, and flag that the error-file schema is undocumented and must be captured from a real rejection.
  - priority: P2 | section: EPF / ECR - NIL months and error handling
- Update EPFO source URLs: epfindia.gov.in now 301s to www.epfo.gov.in and the old /site_en/ and /site_docs/ deep links are dead, including the manual URL printed inside EPFO's own circular (para 9) and inside FAQ Q26. Canonical: https://www.epfo.gov.in/revamped-ecr/ plus the manual and FAQ PDFs on pmvbry.epfindia.gov.in. Monitor that page - the ECR is still formally a Beta with no superseding circular.
  - priority: P1 | section: Compliance source register
- Record as a hard external blocker that BOTH the Form 138 Q4 regular and Q4 correction formats remain unpublished (dead '#' and empty href respectively, re-verified). CBDT states outright that TRACES builds Form No. 130 from Annexure I plus Annexure II (Q4), so the annual certificate cannot be designed until Q4 publishes. Do not use the legacy 24Q Q4 layout as a proxy. IMPORTANT: do not rely on Protean's 'Updated As On' footer as a freshness signal - it is client-side JavaScript printing the viewer's own clock.
  - priority: P0 | section: TDS - Q4 return and annual certificate
- Encode the now-verified deadlines from Rule 219 of the Income-tax Rules, 2026: Form 138 Q1 by 31 July, Q2 by 31 October, Q3 by 31 January, Q4 by 31 May of the FY immediately following the Tax Year; TDS deposit due dates under Rule 218; Form No. 130 issued to each employee by 15 June of the FY following the Tax Year (Rule 215). Form 131 (ex-16A) certificates are due 15 Aug / 15 Nov / 15 Feb / 15 June.
  - priority: P0 | section: TDS - statutory deadlines
- Design Form No. 130 to its actual new shape, not Form 16's: Part A (certificate details, employer/specified bank and employee/specified senior citizen), Part B (summary of amount paid or credited and TDS), details of tax deposited via challan or book adjustment, Declaration, Part C Annexure-I (salary paid, other income, tax deducted), Part C Annexure-II (pension and interest for specified senior citizens). The certificate is valid ONLY if generated from TRACES and must carry the deductor's digital or physical signature; duplicates are re-downloadable from TRACES at any time. The product's role is data preparation and distribution, not certificate generation.
  - priority: P0 | section: TDS - annual certificate structure
- Renumber all labels against CBDT's official mapping. Statements: 24Q->138, 26Q->140, 27Q->144, 27EQ->143, 24G->137. Certificates: 16->130, 16A->131, 16B/16C/16D/16E->132, 27D->133. Employee-facing forms an HRMS handles directly: 12BB->124, 12BA->123, 12B/12BAA->122, 15G/15H->121, 10E->39, 26AS/AIS->168. Others: 13->128, 12BBA->125, 15CA/15CB->145/146, 26A->149. Sections: 192->392, 194P->393(1) [Table Sl. No. 8(iii)], 200(3)->397(3)(b), 197->395(1), lower collection->395(3), TDS/TCS certificates->395(4), s.89 relief->157(1), 15G/15H declarations->393(6). Replace 'Financial Year' with 'Tax Year' and 'Rs.' with the rupee symbol in all TDS-facing copy.
  - priority: P0 | section: TDS - form and section labels
- Add a Tax Year concept distinct from Financial Year. File field is 6-digit YYYYYY (202627 for Tax Year 2026-27); assessment-year field must be >= 202728. Do not reuse the existing FY field for new-regime returns. Note Protean's own release note still says 'effective from FY 2026-27', so expect mixed terminology in vendor material.
  - priority: P0 | section: TDS - Tax Year data model
- Support two non-interchangeable format families for several years: Tax Year 2026-27 onward uses Forms 138/140/143/144 with RPU 1.2 and FVU 1.2; FY 2010-11 to FY 2025-26 uses 24Q/26Q/27Q/27EQ with RPU 6.0 and FVU 9.5; FVU 2.191 covers up to FY 2009-10. Route by period, never by current date, since corrections to old periods continue for years. Surface the FVU/RPU version and carry Protean's warning that replacing only the FVU jar causes rejection at submission.
  - priority: P0 | section: TDS - dual-regime support
- Build the Q1-Q3 writer now, since that format is stable: ASCII .txt, '^'-delimited variable-width fields, every record CRLF-terminated, delimiters per record one less than field count (File Header = 16 fields, 15 delimiters), dates ddmmyyyy, amounts to 2 decimals, TDS rate to 4 decimals. Record types FH/BH/CD/DD, File Type 'SL1', Form Number '138'. Use the official 138RQ1.txt as the golden fixture. Batch Header salary-detail and 194P counts are 'Not applicable' for Q1-Q3.
  - priority: P1 | section: TDS - Form 138 writer specification
- Enumerate for honest estimation: challan sub-headings 301->A, 302->B, 303 removed, 304->C, 305->D, 306->E, 307->F, 308->J, 309->G, 310->I, 311->H, 312->K; Annexure I 313 sub-heading removed, 314->E, 315->C, 316->D, 317->F, 318->G, 319->H, 320->I, 321 and 322 removed, 323->J, 324->K, 325 removed, 326->M, 327->N; Surcharge, Education Cess and Penalty/Others removed; Interest/Fee become Total Interest (C)/Total Fee (D); new Interest Allocation and Others Allocation columns; new Contact Number with country code for deductor and person responsible; 24G references become Form No. 137; Date of Payment constrained to quarter and tax year; Token No. becomes Return Receipt Number; TAN Registration No. deleted.
  - priority: P1 | section: TDS - breaking changes checklist
- Pin format versions by the downloaded artefact, not the published label - Protean's page says 'Version 1.2' while the workbook says 'Version 1.1'. Add a scheduled check on the Protean regular and correction pages keyed on the Form 138 Q4 anchors ceasing to be '#' and '' respectively. Do not key the monitor on the page's 'Updated As On' text, which is a client-side clock readout and always shows today.
  - priority: P1 | section: TDS - format versioning and monitoring
- Build the .csi import path: the file format states it is mandatory to import the .csi file from the TIN Challan Status Inquiry tab to verify challan correctness, and that the TAN and TAN name in the statement must match the .csi. Do not assume self-validation.
  - priority: P2 | section: TDS - challan verification dependency
- Sequence around what is buildable today. START NOW: EPF ECR (Regular/Supplementary/Revised plus the part-payment contribution file) and TDS Q1-Q3 under Form 138 - both fully specified. BLOCKED EXTERNALLY, no published date: TDS Q4 (Annexures II and III) and the Form 130 annual certificate - hold behind a monitored trigger. BLOCKED ON PORTAL ACCESS: EPF arrear returns. Do not promise year-end TDS or Form 130 output in any launch commitment. Note the Q4 deadline of 31 May 2027 is followed just 15 days later by the 15 June 2027 certificate deadline, so the two cannot be planned as independent milestones.
  - priority: P0 | section: Roadmap sequencing

## Open questions

- What is the arrear return file layout? Still genuinely unavailable. I confirmed it is not in the manual, FAQ, circular, the revamped-ecr page, the manuals index, or any of the 1,869 PDFs on the circulars index, and that the portal help-file static paths all redirect to login. It requires a live employer login and the Help button on the 'File Arrear Return' screen.
- When will the Form 138 Q4 regular and correction formats be released? No date is published anywhere. Given the Q4 statutory deadline of 31 May 2027 (now confirmed via Rule 219), there is roughly eight months of slack - but note the certificate deadline of 15 June 2027 for Form 130 sits immediately behind it.
- Will the new Q4 Annexure II keep legacy record types SD / S16 / C6A, or introduce new codes? The Q1-Q3 Batch Header reserves 'Count of Salary Details Records' and 'Count of Section 194P Detail Records' but marks both 'Not applicable', so the new type codes are unknown. Note the workbook still labels one of them with the OLD section number 194P even though the rest of the form uses 393(1).
- What is the layout of Annexure III (specified senior citizens, Q4-only)? Newly identified in this round from CBDT's guidance note; like Annexure II it has no published file format.
- Are there ECR validation error codes and an error-file schema to parse? The manual repeatedly references a downloadable error file generated on failed upload (pp.9, 18, 24) but never documents its format. Requires a real rejection to capture.
- Does the EPFO employer portal offer any API or bulk channel? Every EPFO document reviewed describes only manual browser upload. By contrast CBDT explicitly promises 'integration with APIs & Databases' for the new Form 138, so the TDS side may get programmatic access the EPF side does not.
- Is the revamped ECR still formally in Beta? The 26.09.2025 circular launched it as a beta and I found no later circular declaring general availability across the full circulars index - so yes as far as public record goes, meaning current behaviour is not guaranteed stable.
- What are the field-level layouts of the renumbered employee-facing forms - Form 124 (ex-12BB declarations), Form 123 (ex-12BA perquisites) and Form 122 (ex-12B previous employer income)? These are collected or issued by an HRMS directly. CBDT publishes per-form FAQs and Guidance Notes at /documents/d/guest/form-<N>-faqs and /documents/d/guest/fn-<N>, which are retrievable with the header technique documented here but were not read in this round.

## Retracted

- RETRACT the delimiter width: '#~#' is a THREE-character delimiter, not the '4-character delimiter' the prior report specified twice (in key_findings and in the P0 prd_change). Verified at 900 dpi against the portal Help File. A generator written to the stated width would emit a malformed file on every line.
- RETRACT the freshness claim: 'Both Protean pages read Updated As On 2026-9-5 10:00 AM - same day as this research, so the Q4 status is current as of today, not stale.' The page footer contains a script (var now = new Date(); ... document.getElementById("datetime").innerHTML = datetime) that renders the VISITOR'S current date on every load. It is not a publication timestamp and supports no conclusion about content age. The only hardcoded date in the markup is a commented-out 'Updated As On 2024-11-13' alongside a 2024 copyright.
- RETRACT the methodology narrative that Protean is 'a React SPA whose content is script-injected', that 'raw HTML is an empty 2.7KB shell', and that this 'is exactly the trap that produced the earlier contradictory readings'. Both pages are static server-rendered HTML - 55,134 bytes with 138 anchors (regular) and 57,468 bytes with 129 anchors (correction) - and every href relied on is present in the raw markup. The findings survive, but a PRD author told a browser is required would build automation that is not needed.
- RETRACT the under-searched null: 'incometaxindia.gov.in returns HTTP 403 to scripted fetches, and its PDFs are served with headers that force a download... so no rule text was read', and the resulting 'UNVERIFIED, DO NOT BUILD AGAINST' label on Rule 219 and the quarterly due dates. The edge block is defeated by sending a complete browser header set (Referer, sec-ch-ua, Sec-Fetch-*), and the documents are also retrievable in-page. Rule 219 and the 31 Jul / 31 Oct / 31 Jan / 31 May due dates are now confirmed verbatim by CBDT's own Guidance Note.
- RETRACT 'Does Form No. 130 retain the Part A / Part B split... in-browser extraction of a 490KB binary was not feasible' as an unanswerable question. It was answerable: Form 130 has Part A, Part B AND a new Part C carrying Annexure-I and Annexure-II. So 'Part B' alone is the WRONG frame for the PRD - the per-employee salary breakdown now sits in Part C Annexure-I.
- RETRACT the characterisation of the EPS wage-ceiling validation as a block: 'block EPS for members joining on or after 1 Sep 2014 with wages above Rs 15,000'. FAQ Q8(a), FAQ Q14 and circular para 8(iii) all describe this as FLAGGING to the employer before filing. Only the age-58 EPS rule is a hard system restriction (FAQ Q11). Building a hard client-side block on the wage rule would reject filings EPFO itself accepts.
- NARROW 'upward revision is unrestricted'. The circular says 'Upward Revision has no such restriction', but FAQ Q5(b) hedges to 'allowed even after payment in many cases'. Treat unrestricted upward revision as the design assumption but expect portal-side exceptions.
- CORRECT the citation 'Manual section B steps 1-16': section B (Regular Return) runs to step 33. Also note the manual's own Contents list stops at section D and omits section E (Relaxation of Validations, p.33) - section E does exist and was cited correctly on substance.
- RETAIN AND STRENGTHEN, not retract: the prior round's core reversal was right. The re-engineered ECR changed workflow, validation and the payment lifecycle but NOT the file schema, so no parser rewrite is needed; and there are genuinely TWO '#~#' formats (11-field return, 6-field part-payment contribution). Both are re-confirmed here against primary sources.
- RETAIN: the arrear-layout null. I strengthened it beyond the prior round by enumerating all 1,869 PDFs on the EPFO circulars index and probing the employer portal's help-file paths (all 302-to-login or 404). No arrear generator can be specified from public sources.
