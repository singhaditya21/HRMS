# [r3] frappe-and-tally-parity

## Verification notes

See the dimension-level verification_notes field above for the full method, upgrades, corrections and trust guidance.

## Key findings (23)

### 1. [high] Frappe HR's entire India-specific payroll logic is three files totalling 549 lines, and India overrides exactly three functions — all HRA and marginal-relief related. There is no India statutory engine. Verified on v16 stable, not just develop.

hrms/regional/india/ contains only setup.py (285 lines), utils.py (221), data/salary_components.json (43) — identical file list on origin/version-16. hrms/hooks.py:310-316 defines regional_overrides = {"India": {...}} with exactly three entries: calculate_annual_eligible_hra_exemption, calculate_hra_exemption_for_period, calculate_tax_with_marginal_relief. salary_slip.py:968-971 decorates apply_regional_deductions with @hrms.allow_regional and gives it a body of `pass` — India does not implement it. (Note: the file is hrms/hooks.py, not hooks.py as previously cited.)

Source: https://github.com/frappe/hrms/tree/version-16/hrms/regional/india

### 2. [high] NEW — the whole Frappe stack is now exhaustively cleared, not just the HR app. ERPNext v16 core has NO India regional module and actively REMOVED payroll; the india-compliance app is GST/vendor-TDS only. No companion app closes the India payroll gap.

erpnext v16 (commit 0b50853, 2026-09-02): erpnext/regional/ contains australia, italy, south_africa, turkey, united_arab_emirates, united_states — no india directory. erpnext/hooks.py regional_overrides has no India key (France, UAE, Saudi Arabia, Italy only). The only 'Professional Tax' and 'Provident Fund' strings in the entire repo are in erpnext/patches/v14_0/remove_hr_and_payroll_modules.py and the v13 changelog. Separately, resilient-tech/india-compliance modules.txt = GST India, Income Tax India, VAT India, Audit Trail; word-boundary greps return ECR 0, ESI 0, 24Q 0, Professional Tax 0, Labour Welfare 0, Salary Slip 0, Form 16 0; its sole 'Payroll' string is the HSN description 'Payroll services'.

Source: https://github.com/frappe/erpnext/tree/version-16/erpnext/regional

### 3. [high] EPF/EPS/EDLI: Frappe has NO computation engine and NO ECR file generation. Tally has both PF computation and the ECR file.

Frappe v16 stable: word-boundary greps return ZERO matches for ECR, EDLI, EPS and UAN. No PF rate constants exist — 12%, 8.33, 3.67 and the 15000 ceiling return nothing outside test arithmetic. India setup.py offers only a Salary Component component_type dropdown (Provident Fund / Additional Provident Fund / Provident Fund Loan / Professional Tax) plus a 'Provident Fund Deductions' report that SUMS whatever the user tagged. Tally: help docs confirm PF Forms 3A, 5, 6A, 10 and 12A, and a dedicated E-Challan Return (ECR) page.

Source: https://help.tallysolutions.com/tally-prime/provident-fund-reports/payroll-e-challan-returns-tally/

### 4. [high] ESI: absent in Frappe as a statutory capability; present in Tally. Frappe's only two ESI references are a code comment and a test fixture.

Frappe v16 stable: grep -Iw 'ESI' returns exactly 2 files. (1) salary_structure_assignment.py:327 — a comment noting formulas 'can reference it (e.g. PF, ESI)'. (2) test_payroll_entry.py:972 — create_salary_component("ESI", ...) as a generic test double. No Rs 21,000 ceiling, no 0.75%/3.25% rates, no ESI returns. Tally documents ESI Forms 3, 5 and 6 plus a monthly employee/employer contribution statement.

Source: https://github.com/frappe/hrms/blob/version-16/hrms/payroll/doctype/payroll_entry/test_payroll_entry.py

### 5. [high] THE '15+ STATES PROFESSIONAL TAX' CLAIM FOR FRAPPE IS FALSE — and TallyPrime does not ship state PT slabs either. BOTH incumbents require hand-entered PT slabs.

Frappe: grep for 'Maharashtra|Karnataka|Tamil Nadu|West Bengal' across the entire v16 tree returns ZERO files — no Indian state name appears anywhere. The 'Professional Tax Deductions' report is a listing query filtering component_type == 'Professional Tax'; it contains no slab logic. Tally: its own PT pay head page instructs the user to enter 'Amount Greater Than', 'Amount Up To', 'Slab Type' and 'Value' for each slab manually, names only Tamil Nadu (for six-monthly periodicity), and ships no built-in state-wise rate table.

Source: https://help.tallysolutions.com/professional-tax-deduction-pay-head-tally/

### 6. [high] THE '14 STATES LABOUR WELFARE FUND' CLAIM FOR FRAPPE IS FALSE — LWF is entirely absent. Tally has no LWF engine either; it is a hand-built pay head, and Tally's own content tells employers to go ask their State Labour Welfare Board.

Frappe v16 stable: word-boundary grep for LWF returns ZERO files; 'Labour Welfare' returns zero. No LWF component, component_type option or report exists. Tally: LWF is absent from the payroll statutory reports archive (which lists PF, Income Tax, ESI, Professional Tax, NPS, Gratuity, Payroll Statutory Summary). Tally's own article states 'There is no central LWF act. Each state sets its own contribution amounts and collection frequency' and 'Employers must confirm current rates with the respective State Labour Welfare Board, as amounts are revised periodically' — no automated lookup is described.

Source: https://tallysolutions.com/accounting/lwf-in-salary-slip-meaning-deduction/

### 7. [high] TDS filing artefacts — Form 24Q, Form 16, Form 12BA, Form 27A — are ALL absent from Frappe and ALL present in Tally. This is the single widest statutory gap. Form 12BB is absent from BOTH.

Frappe v16 stable: word-boundary greps return ZERO files for 24Q, 12BB, 12BA and 27A; 'Form 16' returns zero. Its closest artefact is the 'Income Tax Computation' report (columns: Employee, Employee Name, Department, Designation, Date of Joining, Income Tax Slab, Gross Earnings) — a computation summary, not a Form 16 Part B. Frappe DOES compute TDS via Income Tax Slab / Taxable Salary Slab and supports marginal relief. Tally's income tax reports index lists Form 16, Form 12BA, Form 27A, Form 24Q, E-24Q e-Return, Annexure I, Annexure II, ITR-1, Income Tax Computation, TDS Variance and Challan Reconciliation — but NOT Form 12BB. (Corrects the prior report, which implied Tally produces 12BB.)

Source: https://help.tallysolutions.com/tally-prime/payroll/payroll-income-tax-reports/

### 8. [high] CORRECTED — investment declaration is a NARROWER Frappe advantage than previously claimed. Tally HAS an income tax declaration master with a proof-amount field; what it lacks is employee self-submission and document upload.

Frappe has the full doctype chain: employee_tax_exemption_declaration, _declaration_category, _proof_submission, _proof_submission_detail, _category, _sub_category, employee_other_income (all verified present). India setup.py adds HRA fields to declaration and proof doctypes, and utils.py implements the correct 3-case HRA minimum with rent-date overlap validation. BUT Tally is not empty here: 'Alt+G (Go To) > Alter Master > Income Tax Declarations' covers exemptions, investments, house property, other sources and housing-loan interest, and includes a 'Proof/Eligible Amount' field ('specify the details of the amount associated with the proof submitted by the employee'). It is operator-entered — 'The employee can provide the Exemption and Deduction details to the employer, and these details can be entered in the system' — with no document upload.

Source: https://help.tallysolutions.com/tally-prime/payroll-masters/income-tax-declarations-tally/

### 9. [high] RESOLVED — Gratuity: BOTH products COMPUTE it, not just report it. Tally is not report-only, as previously left open.

Frappe: create_gratuity_rule_for_india() inserts 'Indian Standard Gratuity Rule' with minimum_year_for_gratuity=5, work_experience_calculation_method='Round Off Work Experience', and a slab with fraction_of_applicable_earnings = 15/26 (read directly at setup.py:262-285). Tally: ships a Gratuity Pay Head with slab-based configuration and a 'Use for Gratuity' flag set on Basic Salary and DA pay heads, plus a Gratuity Summary report showing gratuity-eligible salary and total gratuity liability. This closes a prior open question.

Source: https://help.tallysolutions.com/tally-prime/payroll-masters/payroll-create-gratuity-pay-head-tally/

### 10. [high] Leave encashment: Frappe has it as a first-class doctype; TallyPrime's own FAQ states it cannot be calculated in the payroll module, though the manually-computed amount can be carried.

Frappe: hrms/hr/doctype/leave_encashment exists, a 'Leave Encashment' salary component is seeded in regional/india/data/salary_components.json, and salary_slip has update_payment_status_for_gratuity_and_leave_encashment(). Tally FAQ, verified verbatim: 'You cannot calculate the Leave encashment amount using the Payroll module. But you can handle the Leave encashment amount calculated outside of Payroll, and the related effects on PF, ESI, and PT are also managed in the Payroll module.' (The prior report truncated this quote; the second sentence materially softens it.)

Source: https://help.tallysolutions.com/tally-prime/payroll/payroll-faq/

### 11. [high] TallyPrime has NO leave management module — admitted in Tally's own FAQ as future work. Frappe has 16 leave doctypes.

Tally FAQ, verbatim: 'You cannot enter the Leave Opening Balance for all the employees when creating a new Company for Payroll. This will be handled when the Leave Management module is provided as part of the payroll module in TallyPrime future releases.' Frappe v16 ships leave_allocation, leave_application, leave_policy, leave_policy_assignment, leave_policy_detail, leave_ledger_entry, leave_type, leave_period, leave_block_list (+2 children), leave_control_panel, leave_encashment, leave_adjustment, compensatory_leave_request, earned_leave_schedule — 16 doctypes, all verified present.

Source: https://help.tallysolutions.com/tally-prime/payroll/payroll-faq/

### 12. [high] UPGRADED TO HIGH — Arrears and retrospective recomputation DO ship in Frappe HR v16 stable. Previously flagged as possibly develop-only; now confirmed on the release branch.

git ls-tree on origin/version-16 (commit e1481b5, 2026-09-01, tag v16.17.1) returns 13 files under hrms/payroll/doctype/{arrear, payroll_correction, payroll_correction_child}, including arrear.py, arrear.json, test_arrear.py and test_payroll_correction.py. arrear.py implements validate_dates, validate_salary_structure_assignment, calculate_salary_structure_arrears, fetch_existing_salary_components, fetch_existing_payroll_corrections, compute_component_differences, create_additional_salary and create_benefit_ledger_entry. payroll_correction handles LWP reversal. India setup.py adds an 'arrear_component' field to Company. Tally's arrears handling remains unverified.

Source: https://github.com/frappe/hrms/blob/version-16/hrms/payroll/doctype/arrear/arrear.py

### 13. [high] The Labour Codes 50% wages add-back is handled by NEITHER product. Greenfield for both.

Frappe v16 stable: case-insensitive grep for 'labour code', 'wage code', 'code on wages' and 'social security code' across the entire repo returns ZERO matches. There is no wage-definition test, no 50%-of-CTC floor, no basic-wage compliance check. Tally's payroll documentation index carries a 'Updates Supported as per Finance Bill for Payroll' page but no Labour Code wage-definition topic.

Source: https://github.com/frappe/hrms

### 14. [medium] Mobile: Frappe ships a genuine PWA; Tally's 'cloud' is a hosted virtual desktop, not a web app. But the claim that Tally has NO employee self-service is CONTESTED and must not be asserted.

Frappe: frontend/package.json is 'frappe-hr-ui' with @ionic/vue 7.4.3, vite-plugin-pwa 0.20.5, workbox-core/precaching 7.0.0 and firebase 10.8.0; a pwa_notification doctype and a separate roster/ app exist. Tally Cloud Access is documented as a 'Virtual Computer — Your personal cloud-based computer where TallyPrime and your business data reside', reached by browser Web-Client or TPCA Client, requiring a subscription 'from a Tally Partner' — i.e. DaaS. HOWEVER, tallysolutions.com states 'the self-service portal allows employees to submit tax declarations, claim reimbursements and view payslips securely'. I found no corroborating ESS topic in help.tallysolutions.com; a marketing FAQ is not verification, but it is sufficient to retract the hard negative.

Source: https://help.tallysolutions.com/tally-prime/cloud-access/

### 15. [high] Attendance device integration: Frappe exposes a whitelisted check-in ingestion API built for biometric devices; Tally requires manual Attendance Vouchers.

Frappe employee_checkin.py:160 exposes add_log_based_on_employee_field(employee_field_value, timestamp, device_id=None, log_type=None, skip_auto_attendance=0, employee_fieldname='attendance_device_id', latitude=None, longitude=None), with allowed_employee_fieldnames = {'name', 'employee', 'attendance_device_id'} enforced at line 185. This is the endpoint Frappe's separate biometric sync tool targets. Tally documents creating Payroll Units and Attendance Types then recording attendance via an Attendance Voucher — manual entry.

Source: https://github.com/frappe/hrms/blob/version-16/hrms/hr/doctype/employee_checkin/employee_checkin.py

### 16. [high] Shift, roster, overtime, full-and-final, recruitment and performance all exist in Frappe and are absent from Tally payroll.

Verified present in v16: shift_type, shift_assignment, shift_assignment_tool, shift_request, shift_schedule, shift_schedule_assignment, shift_location, overtime_slip, overtime_type, overtime_details, overtime_salary_component, plus a roster/ app. full_and_final_statement, full_and_final_asset, full_and_final_outstanding_statement, employee_separation, exit_interview. job_opening, job_applicant, job_requisition, job_offer, interview, interview_feedback, interview_type, employee_referral, staffing_plan. appraisal, appraisal_cycle, appraisal_template, goal, kra, employee_performance_feedback, skill_assessment. appointment_letter (+template, +content), employee_onboarding, employee_promotion, employee_transfer, employee_grievance, training_program. Tally's payroll documentation index contains none of these categories.

Source: https://github.com/frappe/hrms/tree/version-16/hrms/hr/doctype

### 17. [high] API: both have one but they are architecturally different — Frappe is an HTTP REST API over every doctype; Tally's is XML/JSON-over-HTTP into a running local Tally instance driven by TDL.

Frappe: 221 @frappe.whitelist methods in hrms/ alone (counted directly), atop the framework's generic /api/resource REST layer over all doctypes. Tally: integration is via TDL using XML, JSON, HTTP and ODBC; Tally 'can act as an HTTP Server capable of receiving an XML Request and responding with an XML Response', and via ODBC acts as a client pulling from external databases. The endpoint is the Tally application itself, typically on a LAN machine — deployment-bound rather than cloud-callable. (The prior report's developer-reference URL 404s; this is the working page.)

Source: https://help.tallysolutions.com/integration-capabilities-introduction/

### 18. [high] RESOLVED — TallyPrime concurrent multi-user IS edition-gated, and the incremental cost is material. Silver is single-PC; Gold is multi-user LAN at 3x the price.

Verified directly on Tally's buy page: TallyPrime Silver 'Suitable for businesses that need TallyPrime on a single PC' — Rs 22,500 lifetime, or Rs 750/month, Rs 2,138/3 months, Rs 8,100/12 months. TallyPrime Gold 'Perfect for businesses needing multi-user access on multiple PCs' — Rs 67,500 lifetime, or Rs 2,250/month, Rs 6,413/3 months, Rs 24,300/12 months. All figures +18% GST. Licensing docs add that Gold is 'Designed for businesses that need multiple users working simultaneously on the same data within a LAN network.' This closes a prior open question; note the earlier /pricing/ and /buy-tallyprime/ URLs 404.

Source: https://tallysolutions.com/buy-tally/

### 19. [high] Multi-user access control is a Tally STRENGTH, not a gap — permissions are granular per voucher and per report.

Tally ships two default security levels, 'owner and data entry operator', supports creating additional custom levels ('retain these names or input alternative names of your choice'), and grants access types Full Access, Create, Alter, Display, Print and Preview scoped to vouchers, back-dated vouchers, reports, statutory reports, inventory reports, price lists and account masters. The page itself says nothing about edition gating — that is answered separately by the Silver/Gold licensing above.

Source: https://help.tallysolutions.com/manage-users-in-tallyprime/

### 20. [high] Bank payment output is WEAK IN BOTH: Frappe emits generic on-screen reports, not bank-specific NACH or host-to-host fixed-width files.

bank_remittance.py returns columns Payroll Number, Debit A/C Number, Payment Date, Employee Name, Bank Name, Employee A/C Number, IFSC Code, Currency, Net Salary Amount. salary_payments_via_ecs.py returns Branch, Employee Name, Employee, Gross Pay, Net Pay, Bank, Account No, IFSC and MICR. Both are Frappe query reports exportable only via the framework's generic CSV/Excel export; neither file contains NACH, a bank-specific template, or a fixed-width writer, and no HDFC/ICICI/Axis/SBI format module exists. (Correction: MICR is in the ECS report, not bank_remittance — the prior report merged the two column lists.)

Source: https://github.com/frappe/hrms/blob/version-16/hrms/payroll/report/bank_remittance/bank_remittance.py

### 21. [high] Salary structure and gross-to-net computation is genuinely strong in Frappe — this is the part of the bake-off you will NOT win on features.

salary_slip.py is 2,743 lines implementing formula-evaluated components, statistical components, do_not_include_in_total, employer_contributions as a distinct table, LWP/PPL from leave applications or attendance, half-day and unmarked-day handling, holiday-aware payment days, timesheet and hourly-wage earnings, loan repayment, benefit accrual ledgers, CTC computation, income-tax breakup and YTD taxable-earnings projection. Supporting doctypes verified present: salary_withholding, retention_bonus, employee_incentive, additional_salary, employee_benefit_application, employee_benefit_claim, bulk_salary_structure_assignment.

Source: https://github.com/frappe/hrms/blob/version-16/hrms/payroll/doctype/salary_slip/salary_slip.py

### 22. [high] Multi-company exists in Frappe but multi-STATE payroll does not — there is no state dimension anywhere in the payroll model.

Frappe inherits ERPNext's Company link on Salary Slip, Salary Structure Assignment, Arrear, Payroll Entry and employee_cost_center, so multi-entity works. But no Indian state name appears anywhere in the v16 repo, no state field drives PT or LWF, and no state master exists — so a company running payroll across Maharashtra, Karnataka and Tamil Nadu must hand-build a separate PT component and separate salary structures per state, with nothing enforcing correctness.

Source: https://github.com/frappe/hrms

### 23. [high] Frappe's official documentation contains no India statutory payroll content, corroborating the source-code finding.

docs.frappe.io/hr describes Payroll & Taxation as 'Create salary structures, configure income tax slabs, run standard payroll, accomodate additional salaries and off cycle payments, view income breakup on salary slips' [sic]. Confirmed on fetch: no mention of PF/EPF, ECR, ESI, Professional Tax, Labour Welfare Fund, Form 16, Form 24Q or TDS returns anywhere in the introduction or section index.

Source: https://docs.frappe.io/hr/introduction

## Requirements

- Ship a maintained, versioned statutory rate engine as a first-class data service: EPF (12%, EPS 8.33% capped, EDLI, admin charges, Rs 15,000 ceiling and the voluntary-above-ceiling election), ESI (0.75%/3.25%, Rs 21,000 ceiling, contribution-period freeze rule), state-wise Professional Tax slabs, and state-wise LWF with per-state deduction months. Rates must be dated records, not code constants, so retro rate changes replay correctly.
  - priority: P0 | rationale: This is the whole wedge, and it is now verified against the entire Frappe stack rather than one app: hrms v16, erpnext v16 and india-compliance all ship ZERO statutory rates. Tally makes the user hand-enter PT and LWF slabs. Neither competitor maintains a rate table, so 'we maintain the rates, you don't' is defensible against both simultaneously.
- Generate the actual statutory FILES, byte-exact and portal-accepted: EPFO ECR text file, ESIC monthly contribution file, Form 24Q with Annexures I and II, Form 16 Parts A and B, Form 12BA, Form 27A, and state PT/LWF challans. Validate against portal schemas before download and show the operator a pre-submission error list.
  - priority: P0 | rationale: Frappe generates none of these (zero matches for ECR, 24Q, Form 16, 12BA, 27A on v16 stable). This is the widest gap and the most common reason an SMB keeps Tally alongside any HRMS. Tally already produces all of them, so file-level parity with Tally is table stakes, not differentiation. Form 12BB is absent from both and is a small genuine differentiator.
- Model state as a first-class payroll dimension on the work location, not on the employee record alone, and drive PT, LWF, minimum wages, shops-and-establishments and leave entitlement from it. Support one company running payroll across multiple states in a single cycle.
  - priority: P0 | rationale: Frappe has no state dimension at all — zero Indian state names in the entire v16 codebase — and Tally's PT slabs are per-company manual entry. A 20-200 employee company with two offices is already broken on both incumbents. This is where multi-state buyers churn.
- Build bank-specific salary disbursement file generation with per-bank templates (NACH/H2H fixed-width and CSV for at least HDFC, ICICI, Axis, SBI and Kotak), plus IFSC/account pre-validation and a penny-drop verification hook.
  - priority: P0 | rationale: Both incumbents are weak here identically: Frappe's bank_remittance and salary_payments_via_ecs are generic query reports with IFSC/MICR columns, no bank template and no fixed-width writer. A high-frequency, high-pain monthly task neither product solves — it demos well.
- Implement Labour Codes readiness as an explicit compliance feature: compute the statutory 'wages' definition, detect when basic + DA falls below 50% of total remuneration, show the add-back impact on PF/gratuity/bonus liability, and offer a guided restructure with a dated cutover.
  - priority: P1 | rationale: Verified greenfield — zero references to labour code, wage code, code on wages or social security code in Frappe v16, and nothing in Tally's payroll docs. First-mover advantage on a change every Indian employer must eventually make, and a natural CFO-level conversation opener.
- Treat retrospective recomputation as a core primitive: replay any payroll month with changed inputs (rate change, backdated joining, promotion, LWP reversal, structure revision), auto-generate arrear components, and recompute TDS across the remaining year with a full before/after audit trail.
  - priority: P1 | rationale: DOWNGRADED IN URGENCY BY VERIFICATION: Frappe's Arrear and Payroll Correction doctypes are confirmed shipping in v16 stable, so this is a live competitor strength, not a future one. Arrears remain where SMB payroll actually breaks, but plan to match a working implementation rather than fill a void — and note the gap Frappe still has is retro TDS recomputation tied to a maintained rate table, which it cannot do.
- Ship employee self-service and a mobile app as the default interface: payslip access, Form 16 download, investment declaration with proof-document upload and reviewer workflow, leave and attendance, reimbursements, and push notifications.
  - priority: P1 | rationale: REVISED — do not sell this as 'Tally has no ESS'. That claim is contested: Tally's own site advertises a self-service portal for tax declarations, reimbursements and payslips, and I could not disprove it. The defensible, documented gaps are narrower: Tally's income tax declarations are operator-entered via Gateway of Tally with no document upload, and Tally Cloud Access is a hosted virtual desktop rather than a web app. Frappe already ships a PWA, so this earns parity with Frappe, not advantage.
- Do NOT attempt to out-feature Frappe on core payroll mechanics, leave, shift/roster or HR lifecycle. Reach credible parity on salary structures, gross-to-net, leave policy, shift scheduling, F&F and onboarding, then compete on statutory correctness, filing output, and the fact that someone is accountable for the rates.
  - priority: P1 | rationale: Frappe's salary_slip.py alone is 2,743 lines with LWP-from-attendance, statistical components, employer contributions, benefit accruals and CTC computation, plus 16 leave doctypes and a full HR lifecycle. Feature-matching that is a multi-year distraction; the defensible ground is the statutory layer Frappe deliberately left empty.
- Build a maintained importer from TallyPrime (via its XML/JSON/ODBC interface) and from Frappe HR, covering employee master, pay heads to salary components, YTD figures, PF/ESI/PT/UAN identifiers and opening balances — with a reconciliation report proving YTD tax and statutory totals tie out.
  - priority: P1 | rationale: Both incumbents are the incumbent system of record, so switching cost is the real competitor. Tally exposes XML/HTTP/JSON/ODBC and Frappe has a REST API over every doctype (221 whitelisted methods in hrms alone), so mechanised migration is feasible and removes the main objection. Note Tally's endpoint is a running LAN instance, so the importer needs an on-prem agent.
- Match Frappe's investment declaration and proof model and beat both on document handling: declaration categories and sub-categories, employee-submitted proof UPLOAD with reviewer approval, HRA with the correct 3-case minimum and metro/non-metro split with landlord PAN capture above threshold, other-income declaration, and old vs new regime comparison with marginal relief.
  - priority: P2 | rationale: Frappe implements the declaration chain well, including correct 3-case HRA logic with rent-date overlap validation. Tally is NOT empty here as previously reported — it has an Income Tax Declarations master with a Proof/Eligible Amount field — but it is operator-entered with no file upload. Document upload plus reviewer workflow is the specific, verifiable differentiator; the declaration concept alone is not.
- Provide biometric and attendance-device ingestion as a documented, authenticated public API with an idempotent bulk endpoint and a supported connector for common Indian devices (eSSL, Matrix, ZKTeco), including device health monitoring and duplicate-punch handling.
  - priority: P2 | rationale: Frappe exposes add_log_based_on_employee_field with device_id and attendance_device_id lookup but ships no in-product device management; Tally requires manual Attendance Vouchers. A supported, monitored connector is a modest build with high operational value.
- Expose a genuine multi-tenant REST API with webhooks and role-scoped tokens, and publish the statutory rate table as a queryable versioned endpoint.
  - priority: P2 | rationale: Tally's integration requires a running Tally instance on a LAN machine reached over XML/HTTP or ODBC, which is deployment-bound and awkward for modern SaaS stacks. A hosted API is a structural advantage, and exposing the rate table doubles as marketing that proves the rates are actually maintained.

## Open questions

- What does an Indian Frappe partner actually charge to BUILD and then MAINTAIN the statutory layer (PF/ESI/PT/LWF as formula components, plus ECR/24Q/Form 16 output) on top of Frappe HR? That implementation-plus-maintenance figure, not the zero licence fee, is the real competing price and the number the PRD's pricing section needs. Now sharper given I have Tally's exact prices to compare against: Rs 22,500 Silver / Rs 67,500 Gold lifetime, +18% GST.
- Does any commercial TDL add-on close Tally's LWF or multi-state PT gap, and at what price? Two search attempts found nothing specific. Unresolved and it materially affects the Tally battlecard.
- Does TallyPrime actually ship an employee self-service portal? Tally's marketing asserts one; its help documentation shows only operator-entered declarations and has no ESS topic. Resolve this with a Tally partner or a trial before making any ESS claim in either direction — it is the single most likely thing in this report to be wrong.
- Does Frappe's income tax engine handle the new-vs-old regime election, Section 87A rebate, surcharge slabs and cess correctly? I confirmed Income Tax Slab, Taxable Salary Slab and marginal relief exist but did not execute the ~2,700-line computation path. Note Tally documents an explicit 'New Tax Regime Under Section 115BAC' page, so this may be a Tally strength.
- How do real Frappe HR users in India actually file ECR, 24Q and Form 16 today — a separate tool, a partner customisation, or a CA outside the system? Practitioner forum evidence would quantify the pain this product removes and sharpen the problem statement.
- What is TallyPrime Cloud Access priced at per user? Base TallyPrime pricing is now verified but TPCA is sold only through Tally Partners with no public price, so the effective 'zero incremental cost' assumption that makes Tally the default incumbent is still unquantified for cloud deployments.
- Neither product was executed. All findings are declared and coded capability, not verified correctness at scale — most consequential for the tax computation path and for whether Tally's statutory forms are current with the latest Finance Act.

## Retracted

- RETRACTED (upheld from prior report, re-verified on v16 stable) — 'Frappe HR / ERPNext India Payroll supports Professional Tax for 15+ states'. FALSE. Zero Indian state names appear anywhere in frappe/hrms v16, and ERPNext v16 has no India regional module at all. The 'Professional Tax Deductions' report is a listing query with no slab logic.
- RETRACTED (upheld, re-verified on v16 stable) — 'Frappe HR supports Labour Welfare Fund for 14 states'. FALSE. Word-boundary grep for LWF and 'Labour Welfare' returns zero files across the entire v16 tree. No LWF component, component_type option, rate table or report exists.
- RETRACTED (upheld) — the framing that Frappe HR has India payroll depth comparable to a commercial Indian payroll product. India-specific logic is 549 lines across three files and exactly three hooked functions, all HRA/marginal-relief. Frappe is strong on payroll MECHANICS and HR breadth and effectively empty on Indian STATUTORY COMPLIANCE.
- NEWLY RETRACTED — 'Tally has no employee-facing declaration or proof-upload workflow' and 'Tally has no ESS at all'. Both overstate. Tally HAS an Income Tax Declarations master (Alt+G > Alter Master > Income Tax Declarations) covering exemptions, investments, house property, other sources and housing-loan interest, with an explicit 'Proof/Eligible Amount' field. Separately, tallysolutions.com states 'the self-service portal allows employees to submit tax declarations, claim reimbursements and view payslips securely'. I could not corroborate an ESS portal in the help documentation, so I am not asserting Tally HAS ESS either — the honest status is CONTESTED. Do not put 'Tally has no ESS' in a battlecard. The verifiable Frappe advantages are employee self-submission and proof-document upload.
- NEWLY RETRACTED — the implication that Tally produces Form 12BB. Tally's income tax reports index lists Form 16, 12BA, 27A, 24Q, E-24Q, Annexure I and II, ITR-1 and Income Tax Computation, but NOT Form 12BB. Neither product has 12BB.
- NEWLY RETRACTED — the methodological hedge that 'anything absent on develop is necessarily absent in v16'. That inference is invalid (features can be removed between a stable branch and develop) and is now unnecessary: I fetched origin/version-16 (tag v16.17.1) and re-ran every negative grep directly against the stable branch, with identical results.
- NEWLY RETRACTED — the medium-confidence hedge on Arrear and Payroll Correction. They ARE in v16 stable (13 files on origin/version-16). Upgraded to high confidence; arrears is a current Frappe strength.
- NEWLY RETRACTED — 'Tally may only report a Gratuity Summary rather than compute gratuity'. Tally computes it: a Gratuity Pay Head with slab-based configuration and a 'Use for Gratuity' flag on Basic/DA pay heads feeds a Gratuity Summary showing gratuity liability.
- CORRECTED — citations. 'hooks.py lines 310-316' is actually hrms/hooks.py:310-316 (no hooks.py exists at repo root). The cited developer-reference integration URL returns HTTP 404; the working page is help.tallysolutions.com/integration-capabilities-introduction/. Every Tally statutory-artefact claim was previously sourced to an uncited 'prior sweep' and has now been re-sourced to specific help.tallysolutions.com pages.
- CORRECTED — MICR is a column in the salary_payments_via_ecs report, not bank_remittance; the prior report merged the two reports' column lists. The substantive conclusion (no NACH, no bank-specific template, no fixed-width writer in either) is unchanged.
- CORRECTED — the Tally leave-encashment quote was truncated. The full text continues: 'But you can handle the Leave encashment amount calculated outside of Payroll, and the related effects on PF, ESI, and PT are also managed in the Payroll module.' The gap is real but narrower than the clipped quote implies.
- UPHELD AS NOT VERIFIED — whether any commercial TDL add-on closes Tally's LWF or multi-state PT gap. I made a further genuine attempt and found only generic LWF guidance and manual pay-head instructions, no LWF- or state-PT-specific TDL extension. Weak evidence of absence, not proof. Must be checked with a Tally partner before appearing in a battlecard.
