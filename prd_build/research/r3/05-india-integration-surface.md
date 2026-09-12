# [r3] india-integration-surface

## Verification notes

WHAT I DID: Re-fetched every load-bearing source in the original report from its primary URL, plus curl/openssl checks where a claim was about DNS, redirects or TLS. Roughly 40 fetches. I did not take the original report's word for anything it quoted.

WHAT SURVIVED (trust these): all four Zoho Payroll direct-deposit facts (ICICI relationship-manager document verification and possible processing fee, CIB "Pending on Me" approval, Axis 6:45 PM cut-off, NEFT default, 30-day expiry, 5 OTP attempts, maker-checker); the Zoho bank list incl. HSBC and "Download Bank Advice"; RazorpayX partner-bank list and the full POST /v1/payouts field spec incl. X-Payout-Idempotency; Razorpay Basic Auth + live-key OTP; Zoho Books and Zoho Expense base URLs, OAuth header and rate limits; the Zoho Books /journals operation set; QuickBooks India withdrawal dates; Entra SCIM requirements incl. the gallery-only schema-discovery restriction; Okta 429 backoff with max 10 attempts and the OIN publication requirement; Google custom SAML and the 75-group cap; Google Admin SDK endpoints; WhatsApp per-message pricing and India INR migration; Teams connector deprecation incl. 28 KB and 4-req/sec; Maharashtra PT services and the 15 Sep / 15 Oct 2026 PTRC dates; HDFC developer portal being retail/lending-only; HDFC ENet pages being marketing-only; BUSY, Zaggle, Pluxee and Fyle all having no readable public API surface; Gupshup's "$0.001, WhatsApp fee at actuals".

WHAT I RETRACTED OR CORRECTED — six items, two of them serious:

1. SERIOUS: The report claimed TallyPrime's XML envelope tags and listening port are NOT published and wrote a P1 requirement forbidding estimation from documentation. That is wrong. help.tallysolutions.com/xml-integration/ publishes ENVELOPE/HEADER/BODY/TALLYMESSAGE/VOUCHER, the HEADER children, and port 9000 with the F1 > Settings > Advanced Configuration enablement path. The report was over-cautious in a way that would have cost the team a spike it does not need. Corrected, and the spike narrowed to the voucher/ledger schema only.

2. SERIOUS: The report missed the single biggest live change in this dimension. EPFO launched a REVAMPED ECR applicable from wage month September 2025 that separates return filing from payment generation, adds Regular/Supplementary/Revised return types, makes an approved return non-cancellable, enforces sequential month-by-month filing, auto-computes Section 7Q interest and Section 14B damages, invalidates unpaid challans created under the old system, and adds hard EPS validations. The report's proposed EPFO lifecycle state machine is wrong against this. Sourced from EPFO's own FAQ PDF (linked from epfo.gov.in/revamped-ecr/, page last updated 3 September 2026).

3. The report asserted www.kotak.com redirects to kotak.bank.in and www.sbi.co.in redirects to sbi.bank.in. Both false today: kotak.com 301s to www.kotak.com/en.html, sbi.co.in 301s to sbi.co.in/redirect/ (200). kotak.bank.in and sbi.bank.in exist and serve, but the legacy hosts do not point at them. HDFC and ICICI redirects and the Axis certificate claim all verified. Claim narrowed.

4. The report said Tally Connected Banking covers payment initiation for ICICI, Axis, SBI and Kotak. Tally's doc gives payments for Axis, SBI and Kotak only; ICICI is balance and statement.

5. Slack was declared unverifiable. Retracted — api.slack.com is still blocked by the SSL-inspecting proxy here, but Slack moved its docs to docs.slack.dev, which is reachable, and the Web API is now verified.

6. TDS/e-TDS was declared unverifiable. Retracted — the whole Form 24Q chain is documented on Zoho Payroll's own help pages and is now a verified finding.

DOWNGRADED: the EPFO ECR 11-field / "#~#" specification. EPFO's own file-structure PDFs are now 404 on BOTH epfindia.gov.in and epfo.gov.in — the domain migration took the entire legacy document tree with it. EPFO's revamped-ECR FAQ confirms only that the ".txt format / layout remains the same". The field list now rests on secondary sources and on search-engine snippets of EPFO PDFs that no longer resolve, and at least one description says ECR carries a HEADER line, contradicting the report's "no header row". Do not write the generator from this spec without obtaining the current file structure from a live employer portal login. Also downgraded: Cashfree's base URLs and the "IP whitelisting mandatory for production" phrasing (neither re-confirmed from a Cashfree page in this pass), and Cashfree's auth header list (it is X-Client-Id + X-Client-Secret, with X-Cf-Signature as the RSA alternative — the report omitted X-Client-Secret and invented the operation name "Get Batch Transfer Status V2"; the published name is "Get Transfer Status V2").

UNVERIFIED NUMBER I WOULD NOT SHIP: the report's "deadline of the 15th of the following month" for EPF. Widely believed and probably right, but I did not verify it against an EPFO primary source in this pass and EPFO's revamped-ECR FAQ does not state it. Moved to an open question.

DID THE DIMENSION ANSWER ITS QUESTION? Substantially yes — it covers banks, GL, IdP, statutory, messaging and expense, and its strongest move (using Zoho Payroll's per-bank help pages as evidence about what banks actually require) is genuinely good research. Two structural weaknesses: it declared "unverifiable" twice where the source had simply moved host (Tally deep docs, Slack), which is a research failure dressed as epistemic caution; and it padded the requirements list with restatements (several P0/P1 items are the same abstraction expressed three times). I have merged those.

HOW MUCH TO TRUST THIS: high for the fintech rails, the Zoho/Google/Microsoft/Okta API surfaces, and the competitive read on how Indian payroll products actually handle disbursement and filing. Medium for the government surfaces — EPFO's revamped-ECR behaviour is now well sourced, but the ECR file spec itself and everything about ESIC's upload format must be re-derived from a live portal before anyone writes code. Do not size ESIC or state PT work from this document.

## Key findings (40)

### 1. [high] Bank salary disbursement for the 20-200 employee segment is not an API integration — it is a bank-brokered partner arrangement requiring the employer to already hold a corporate current account at that specific bank, plus manual document verification through the bank's relationship manager and an in-portal approval step.

Zoho Payroll's ICICI direct deposit doc: prerequisites are "A corporate current account with ICICI Bank", an active paid Zoho Finance subscription and MFA. The employer enters their "CIB Portal Login ID" or "CorporateID.UserID", then must "contact your ICICI Bank representative or relationship manager to complete the document verification", and "ICICI Bank may charge a processing fee for the document verification process." Activation requires approving inside the ICICI CIB Portal under "Pending on Me" > "Connected Banking Approvals".

Source: https://www.zoho.com/in/payroll/help/employer/direct-deposit/direct-deposit-icici.html

### 2. [high] Bank direct-deposit integrations carry ongoing operational fragility that must be designed for: a 30-day session expiry, a 5-attempt OTP lockout, and a same-day payment cut-off.

Zoho Payroll Axis Bank doc, verbatim: "The cut-off time to initiate payment is 6:45 PM. If you initiate payment within this cut-off time, salaries are processed on the same day." / "The default payment mode for payments initiated from Zoho Payroll using the Axis Bank integration is NEFT." / "For security reasons, the Axis Bank integration expires every 30 days. Reauthenticate the integration to continue processing salary payments." / "You have 5 attempts to enter the correct OTP. If you exceed this limit, the integration can become inactive and must be set up again."

Source: https://www.zoho.com/in/payroll/help/employer/direct-deposit/direct-deposit-axis-bank.html

### 3. [high] Maker-checker authorisation inside the bank's own portal is the norm and cannot be bypassed by the HRMS — payment initiated from the HRMS still lands in a bank-side approval queue when the corporate has approval workflows enabled.

ICICI doc: when initiating payments an OTP is "sent to your registered mobile number", and if approval workflows are configured in the CIB portal, transactions require separate portal approval before processing. Axis doc: multi-user setups require that "the user who connects Axis Bank from Zoho Payroll must have maker privileges in the bank portal", with an approver authorising in the bank portal.

Source: https://www.zoho.com/in/payroll/help/employer/direct-deposit/direct-deposit-icici.html

### 4. [high] A mature India payroll product ships BOTH a direct bank integration for a small set of banks AND a downloadable bank advice file as the universal fallback. The file is the floor; the integration is the upsell.

Zoho Payroll supports direct deposit for ICICI, YES Bank, HSBC, Axis Bank and Zoho Payments-Payouts. For everyone else, after pay run approval: "Click Download Bank Advice to download the bank advice, which helps you manually transfer the salaries to your employees' bank accounts."

Source: https://www.zoho.com/in/payroll/help/employer/pay-runs/

### 5. [high] TallyPrime Connected Banking shows that Axis, SBI, Kotak and ICICI expose a partner-brokered machine channel — but payment INITIATION is only Axis, SBI and Kotak; ICICI is balance and statement only. Access is gated on the software vendor's partner programme and the customer's active TSS subscription, not a public API key.

Tally help: Connected Banking is available for "Axis Bank, State Bank of India, Kotak Mahindra Bank, and ICICI Bank"; balance and statements are supported for all four; online payments are listed for Axis, SBI and Kotak, and ICICI is not listed for payments. Prerequisites: "TallyPrime Release 6.0 or later", "Valid Tally Software Subscription (TSS)", a Tally.NET ID as "the registered e-mail address under your license", and a "Valid 10-digit mobile number to link with your Tally.NET ID and receive OTP".

Source: https://help.tallysolutions.com/tally-prime/connected-banking/

### 6. [high] Axis Bank runs a self-serve developer portal with a sandbox-to-production path, but the corporate payment API described there is generic — no bulk or salary payment API is surfaced.

apiportal.axis.bank.in: three-step flow "Register Yourself, Select the Api for your app and begin" > "Use sandbox to experiment & develop; test your development" > "Apply for production access and go live". Four product categories: Payment ("Allow Corporate to transfer money to their own account, third party"), Deposits, Collections, Credit Card. No bulk-payment or payroll API is named. The certificate at the legacy apiportal.axisbank.com is CN=apiportal.axis.bank.in with a valid chain (openssl verify return code 0).

Source: https://apiportal.axis.bank.in/

### 7. [high] HDFC Bank's public developer portal is retail and lending oriented — no bulk salary or corporate payment API is surfaced there — and ENet, its corporate channel, is documented publicly only as marketing copy.

developer.hdfc.bank.in lists categories "Accounts & Deposits, Building Blocks, Cards, Loans, Payments and collections" and named APIs DCEMI-PG Journey, Fintech Offer availability API and Customer Identification. Onboarding is self-serve: "Enter your details, get verified and receive instantly the API keys you need." No bulk payment, ENet, payroll or salary disbursement API appears. Separately, the HDFC wholesale-banking ENet page carries only the positioning line "Powerful Payment & Collection Management Solutions" and no file specification, host-to-host detail, maker-checker detail or API statement. developer.hdfcbank.com 301-redirects to developer.hdfc.bank.in (verified by curl).

Source: https://developer.hdfc.bank.in/

### 8. [high] RazorpayX Payouts is not a bank-agnostic rail: it requires a current account at one of a named set of partner banks, which materially limits who can adopt it without switching banks.

Razorpay docs name the partner banks for Current Account payouts as IDFC First Bank, RBL, ICICI Bank, Yes Bank, Axis Bank and Slice. Modes and limits: IMPS "Upto Rs 5 lakh (per transaction)" processed "immediately on all days, 24x7"; NEFT "Above Rs 1 (per transaction)" processed within 2 hours on working days in bank-specific windows (2:00am-6:00pm IDFC/RBL; 1:00am-6:45pm ICICI/Yes); RTGS "Above Rs 2 lakh (per transaction)" within 30 minutes on working days in bank-specific windows; UPI "Upto Rs 1 lakh (per transaction)" 24x7, available only for RBL and Yes Bank current accounts. A "Payout Composite API" allows initiating payouts directly to mobile numbers.

Source: https://razorpay.com/docs/x/payouts/

### 9. [high] The RazorpayX payout API is concrete and buildable: POST /v1/payouts, HTTP Basic auth, a required idempotency header, and IP allowlisting.

"POST https://api.razorpay.com/v1/payouts". Required: account_number, fund_account_id, amount (paise, minimum 100), currency INR, mode (case-sensitive NEFT/RTGS/IMPS), purpose (one of refund, cashback, payout, salary, utility bill, vendor bill). Required header X-Payout-Idempotency. Optional queue_if_low_balance, reference_id (max 40 chars), narration (max 30 chars, a-z A-Z 0-9 and space only), notes (up to 15 key-value pairs, 256 chars each). "Ensure you allowlist IPs and pass the idempotency key to make a successful payout." Auth: "All Razorpay APIs are authenticated using Basic Auth" with key id and key secret; RazorpayX live payouts require KYC activation, and "When generating API keys in Live mode, you must enter the OTP sent to you."

Source: https://razorpay.com/docs/api/x/payouts/create/bank-account/

### 10. [high] Cashfree Payouts offers three parallel channels — API, dashboard, and Excel bulk upload — which maps well onto an HRMS serving both API-first and file-first customers.

Cashfree docs: "Flexible integration: Easy-to-integrate APIs with comprehensive SDKs", a dashboard for "Web-based payout management with approval workflows", and "Excel uploads to suit your operational needs". Payout methods: "IMPS, NEFT, UPI, Mastercard (MoneySend), Visa (Visa Direct), and digital wallets (Amazon Pay and Paytm)." RTGS is not listed as a supported channel on this page.

Source: https://www.cashfree.com/docs/payouts

### 11. [high] Cashfree's published V2 payout operations are: Standard Transfer V2, Batch Transfer V2, Get Transfer Status V2, Validate Payout V2, Process Validated Payout V2, and Create/Get/Remove Beneficiary V2. Auth uses X-Client-Id and X-Client-Secret, with X-Cf-Signature as an RSA-signature alternative.

Cashfree Payouts API reference overview lists exactly these operations, plus Cashgram, Card Payouts, Validate/Process Payout V1 and V1.2, One Escrow and Webhooks V2. Auth headers referenced: X-Client-Id, X-Client-Secret, X-Cf-Signature. NOTE: there is no operation named "Get Batch Transfer Status V2" on this page; batch status is not separately named there.

Source: https://www.cashfree.com/docs/api-reference/payouts/overview

### 12. [high] Cashfree production access is gated on IP allowlisting (max 25 addresses, IPv4 only) or a single RSA public key used to sign a client-id-plus-timestamp payload. This constrains hosting architecture and rules out rotating egress.

Cashfree IP-whitelist doc: "You can whitelist a maximum of 25 IP addresses." / "No, we only support API requests from IPv4 at the moment." Alternative for non-static-IP environments: generate a public key, RSA-encrypt clientId plus current UNIX timestamp separated by a period, and "Pass this signature in the header X-CF-Signature"; "You can generate only 1 public key at a time." The doc frames these as preventing "anonymous or unknown disbursement requests" but does not itself state that whitelisting is mandatory for production.

Source: https://www.cashfree.com/docs/help/payouts/ip-whitelist.md

### 13. [high] Some Indian banks have moved to .bank.in domains and legacy hosts 301-redirect, but this is NOT uniform — Kotak and SBI legacy hosts do not redirect to their .bank.in equivalents. Do not hardcode either set.

Verified live by curl today: developer.hdfcbank.com 301 > developer.hdfc.bank.in; www.icicibank.com 301 > www.icici.bank.in. But www.kotak.com 301 > www.kotak.com/en.html (NOT kotak.bank.in), and www.sbi.co.in 301 > sbi.co.in/redirect/ returning 200 (NOT sbi.bank.in). kotak.bank.in and sbi.bank.in both resolve and serve independently. apiportal.axisbank.com presents CN=apiportal.axis.bank.in with a valid chain. This corrects the original report, which asserted Kotak and SBI redirects that do not exist.

Source: https://www.icici.bank.in/

### 14. [high] Tally's XML integration surface IS publicly documented, including the envelope tag names and the default listening port. The original report was wrong to withhold these.

help.tallysolutions.com/xml-integration/ publishes: nested <ENVELOPE> containing <HEADER> and <BODY>; header elements <VERSION>, <TALLYREQUEST> (Import, Export, Execute), <TYPE> (DATA, COLLECTION, OBJECT, FUNCTION, ACTION), <ID>, <STATUS> (1=success, 0=failure); body elements <DESC> with <STATICVARIABLES>/<FETCHLIST>, <DATA>, and <TALLYMESSAGE> wrapping entity records such as <VOUCHER>. "TallyPrime's XML gateway operates on port 9000 by default", enabled via F1 (Help) > Settings > Advanced Configuration > enable HTTP Server, with external applications posting XML to http://<Tally-IP>:9000. A separate JSON integration page documents headers content-type/version/tallyrequest/type/id but does not state a port or whether it is internet-reachable.

Source: https://help.tallysolutions.com/xml-integration/

### 15. [high] Tally is the dominant India SMB GL target but runs on the customer's own machine or LAN — a cloud HRMS cannot reach it without a local connector or the customer exposing the Tally HTTP gateway.

The documented mechanism is an HTTP server inside the TallyPrime process listening on port 9000, addressed as http://<Tally-IP>:9000, plus ODBC and TDL. Tally's integration overview describes XML and JSON exchange, "ODBC Connections: Real-time reporting with Excel, Power BI", and TallyPrime acting as both server (third parties push/pull) and client (Tally sends GET/POST to external services). None of this is a hosted, internet-addressable endpoint.

Source: https://help.tallysolutions.com/developer-reference/integrate-with-tallyprime/

### 16. [high] Zoho Books is the cleanest cloud GL integration in India: OAuth 2.0, a full journals endpoint set, and an India data centre — but with tight rate limits that force batched posting.

Base URLs https://www.zohoapis.com/books/v3 and India https://www.zohoapis.in/books/v3. Header "Authorization: Zoho-oauthtoken [access_token]". Journals: POST /journals, GET /journals, GET/PUT/DELETE /journals/{journal_id}, POST /journals/{id}/status/publish, /approve, /reverse, /submit, /reject, plus bulk submit/approve/publish/delete and /recurringjournals. Rate limits: "100 requests per minute per organization"; daily 1,000 Free / 2,000 Standard / 5,000 Professional / 10,000 Premium-Elite-Ultimate; concurrency 5 (Free) or 10 (Paid, soft limit); HTTP 429 on breach.

Source: https://www.zoho.com/books/api/v3/introduction/

### 17. [high] QuickBooks is dead in India — it must not appear in the PRD's integration list.

Intuit India page: "New sign-ups to QuickBooks ended July 2022." / "QuickBooks subscribers retained access to the product through 30 April 2023." / "As of 1 July 2023, there is no longer access to QuickBooks products in India." / "This applies to all subscriptions and services for QuickBooks Online, QuickBooks Online Accountant, the QuickBooks mobile app, and QuickBooks Time."

Source: https://quickbooks.intuit.com/in/

### 18. [medium] BUSY publishes no public API or developer documentation; its integration story is data migration, not programmatic posting.

busy.in surfaces no API, developer portal, SDK, webhook or endpoint documentation. The only integration-adjacent content is a webinar title: "Seamlessly migrate your masters and transactions from Excel, Tally or Marg to BUSY Magic with minimal effort".

Source: https://busy.in/

### 19. [high] Microsoft Entra ID provisioning requires a SCIM 2.0 endpoint with specific, testable behaviours — a well-specified engineering task with no external gatekeeper unless you want gallery listing.

Microsoft: "An endpoint must be SCIM 2.0-compatible to integrate with the Microsoft Entra provisioning service." Requirements: /Users and /Groups endpoints; "Accept a single bearer token for authentication and authorization of Microsoft Entra ID to your application"; "users are retrieved with their id and queried with their username and externalId, and groups are queried with displayName"; groups must have uniqueness on displayName; PATCH with JSON Patch add/replace; soft delete via active=false with the user still returned. Mappings: loginName > userName > userPrincipalName; IsSoftDeleted > active; objectId > externalId. Gallery publication is listed as optional, but "Schema discovery is the sole method to add more attributes to the schema of an existing gallery SCIM application. Schema discovery isn't currently supported on custom non-gallery SCIM application."

Source: https://learn.microsoft.com/en-us/entra/identity/app-provisioning/use-scim-to-provision-users-and-groups

### 20. [high] Okta consumes the same SCIM 2.0 server, so one implementation serves both Entra and Okta; the incremental cost is OIN submission, an external review gate. Okta handles 429s gracefully, which relaxes rate-limit design on the inbound side.

Okta requires CRUD over REST/JSON for user and group resources and documents both SCIM 2.0 and 1.1. "For your customers to use your SCIM provisioning integration with Okta, you need to publish it through the Okta Integration Network." On rate limits, Okta "automatically detects this response and attempts to restore normal provisioning operations without requiring manual intervention", doubling the previous wait time each retry, with a maximum of 10 attempts before permanent task failure.

Source: https://developer.okta.com/docs/concepts/scim/

### 21. [high] Google Workspace SSO for a non-catalogue app is a custom SAML app configured by the customer's admin — no vendor-side listing needed — but group mapping is capped at 75 groups.

"Google offers preintegrated SSO with over 200 popular cloud apps"; for others, admins set up a custom SAML app. Google supplies SSO URL, Entity ID and Certificate; the SP supplies ACS URL ("It must start with https://"), Entity ID and optional Start URL. Group mapping: "Add additional groups as needed (maximum of 75 groups)." The page says nothing about automated user provisioning to third-party apps.

Source: https://knowledge.workspace.google.com/admin/apps/set-up-your-own-custom-saml-app

### 22. [high] Google Workspace's Admin SDK Directory API is the practical route for importing an employee roster at onboarding, independent of SSO.

Base https://admin.googleapis.com/admin/directory/v1. POST /users (create), GET /users/{userKey}, GET /users (list), PUT /users/{userKey}, DELETE /users/{userKey}, POST /users/{userKey}/undelete. "A user deleted in the last 20 days must meet certain conditions before the user's account can be restored." userKey accepts primary email, unique user id, or an alias — but undelete accepts ONLY the unique user id. Read-only scope https://www.googleapis.com/auth/admin.directory.user.readonly.

Source: https://developers.google.com/workspace/admin/directory/v1/guides/manage-users

### 23. [high] EPFO replaced its ECR system with a REVAMPED / RE-ENGINEERED ECR applicable from wage month September 2025. This changes the filing lifecycle an HRMS must model, and the original research missed it entirely.

EPFO FAQ on Revamped ECR, verbatim: "The 'Revamped ECR' (also called Re-Engineered ECR) is a redesigned version of EPFO's Electronic Challan-cum-Return (ECR) system, applicable from the wage month of September 2025." Key features: "Segregation of return filing and payment generation (i.e. submit the return first, then generate challan and make payment)"; system-based validations; "Automatic calculation of interest (under Section 7Q) and damages (under Section 14B)"; "Provision for revised return under specified conditions"; "The format of the ECR file (.txt layout) remains unchanged." Three return types: Regular, Supplementary, Revised. "Once a return is approved in the system, it cannot be canceled; corrections must be through Revised Return." Downward revision allowed only if payment against that UAN has not been made; upward revision allowed even after payment. Sequential filing is enforced: "employers must file monthly ECRs strictly in chronological order... without skipping any month." Old unpaid challans are void: "If a challan is created earlier, but payment process was not completed, such challan shall not remain valid in the revamped system." NIL returns go through a "Direct Challan Entry" facility. A four-month initial relaxation of validations applies during transition.

Source: https://www.epfo.gov.in/revamped-ecr/

### 24. [high] The revamped EPFO workflow is: upload .txt > system validates and flags errors > employer approves the return > a Due Deposit Balance Summary is generated > employer generates a challan with a TRRN > employer pays via net banking > employer downloads receipt/challan. There is still no API.

EPFO FAQ, verbatim: "Employer uploads the ECR file (.txt format) in the employer portal." / "System validates data. Errors are flagged; employer must correct and reupload." / "After validation, employer approves the return. At approval, a Due Deposit Balance Summary is generated (shows the amounts due: contributions, interest, damages, admin/inspection charges)." / "Employer then generates a challan with a TRRN (Temporary Return Reference Number)." / "Employer makes the payment (net banking, etc.) using the TRRN." / "After payment, employer can download the receipt / challan copy from the portal." Multiple challans per return are permitted. No API or bulk machine interface is mentioned anywhere in the FAQ.

Source: https://www.epfo.gov.in/revamped-ecr/

### 25. [high] The revamped ECR enforces statutory eligibility rules the payroll engine must replicate before upload, or filings will be rejected at the portal.

EPFO FAQ validations: "Flagging ineligible EPS contributions (e.g. employees whose wages exceed Rs 15,000 per month and who joined after 1 September 2014)"; "Restricting pension contributions beyond age 58 (unless employer flags for deferred pension)"; "Validating UAN, member details, wage entries, contribution etc., and rejecting invalid rows before approval"; "Contribution is calculated at the rate of either statutory or higher rate only, but not below the statutory rate." Also: contributions can only be remitted for the period between a valid date of joining and date of leaving; if a date of exit is already recorded, later contributions require correcting the exit date "through a joint declaration submitted by the employer and employee."

Source: https://www.epfo.gov.in/revamped-ecr/

### 26. [medium] The exact ECR .txt field specification could NOT be obtained from any EPFO primary source in this pass. EPFO's domain migration to epfo.gov.in has 404'd its entire legacy document tree, including the ECR file-structure PDF.

Verified by curl: www.epfindia.gov.in/site_docs/PDFs/OnlineECR_PDFs/ECR_ForEmployers_FileStructure.pdf 301s to epfo.gov.in and then 404s; the same for EPFOUnifiedPortal/FAQs_ECR2.0.pdf, Introduction_ECR2.0.pdf, and /site_en/View_file_formate.php. EPFO's revamped-ECR FAQ confirms only "the .txt format / layout of the ECR remains the same under the revamped system" and "Employers will still upload the same schema." The widely-cited 11-field, "#~#"-delimited layout (UAN, Member Name, Gross Wages, EPF Wages, EPS Wages, EDLI Wages, EPF employee contribution, EPS contribution, EPF-EPS employer difference, NCP Days, Refund of Advances) is corroborated by multiple practitioner sources and by search-engine snippets of the now-dead EPFO PDFs, but at least one description states ECR carries a HEADER line plus DETAIL lines, contradicting the "no header row" assertion.

Source: https://www.epfo.gov.in/revamped-ecr/

### 27. [high] EPFO's employer portal requires interactive login with a CAPTCHA — a hard blocker for unattended automation.

unifiedportal-emp.epfindia.gov.in presents an "Establishment Sign In" form with a CAPTCHA image served from /epfo/no-auth/captcha/createCaptcha. Announcements on the page: "The ECR format has been revised and it will be UAN based without the erstwhile member id" and "Online payments through Multi banking introduced." No API, bulk upload interface, or machine-to-machine connectivity is mentioned.

Source: https://unifiedportal-emp.epfindia.gov.in/epfo/

### 28. [high] The Form 24Q / TDS chain is now verified, and it is NOT an API: the payroll system produces a text file, the employer runs a Java desktop utility (FVU) against it plus a CSI file from the income tax portal, and the employer personally uploads the resulting .fvu.

Zoho Payroll's Form 24Q help page: Zoho Payroll creates "a standardised text file that complies with the Income Tax Department's requirements". The employer then downloads the Challan Status Inquiry (CSI) file from the Income Tax Department's portal; must "download the FVU to validate the text file" from the Protean Tinpan website and feed both the text file and the CSI file into this Java-based utility; then "Log in to Income Tax Department's portal" and "Upload the .fvu file that was generated". Zoho does not file on the employer's behalf. This retracts the original report's claim that the e-TDS chain was unverifiable.

Source: https://www.zoho.com/in/payroll/help/employer/taxes-and-forms/form-24q.html

### 29. [low] The income tax e-filing portal does surface an "API Specifications" section under e-Return Intermediaries — a lead worth chasing, but not evidence that TDS statements can be filed by API.

incometax.gov.in home page references "API Specifications" under an "e-Return Intermediaries" section, and separately notes "TDS/TCS Correction Statements" for Tax Year 2026-27 will be "enabled shortly". The specifications themselves are not on the home page, and the direct help path incometax.gov.in/iec/foportal/help/e-return-intermediaries returns 404. ERI schemes historically cover income tax returns, not TDS statements.

Source: https://www.incometax.gov.in/iec/foportal/

### 30. [high] ESIC's employer portal and monthly contribution flow are located and confirmed to exist, but esic.gov.in serves an incomplete TLS chain — an environment hazard that will break naive HTTP clients and any automation built against it.

openssl against esic.gov.in returns subject CN=*.esic.gov.in with "Verify return code: 21 (unable to verify the first certificate)"; WebFetch fails on chain validation while curl -k succeeds. The esic.gov.in home page links the employer login at portal.esic.gov.in/EmployerPortal/ESICInsurancePortal/Portal_Loginnew.aspx, and a monthly contribution e-challan flow at portal.esic.gov.in/ESICInsurance1/RevenueOne/MonthlyContribution/eChallan.aspx, plus downloadChallanPrint.aspx. No API, file specification, or bulk machine interface is published.

Source: https://esic.gov.in/

### 31. [low] ESIC monthly contribution is submitted as an Excel template upload (not a delimited text file), with roughly six columns. This is corroborated but NOT confirmed from an ESIC primary source.

Multiple practitioner sources describe downloading a sample MC template from the ESIC portal and populating: 10-digit IP number, IP name, number of days, total monthly wages, reason for zero wages, and last working day; days must be whole numbers with fractions rounded up. Attempts to fetch the template itself (esic.in and portal.esic.gov.in paths for App_Themes/Help/MC_Template1.xls) both returned 404, so the column list and order are unconfirmed against ESIC.

Source: https://esic.gov.in/

### 32. [high] Maharashtra Professional Tax (PTRC/PTEC) is a web-portal service with no documented API. State PT is N separate manual portals, one per state, not one integration.

mahagst.gov.in lists "e-Return PT", "e-Refund", "View/Verify e-Payment", "e-Track Status", "PTEC OTPT Payment" and "e-Payment - PTRC-Return / PTEC". No API is mentioned anywhere. The Important Updates table shows monthly PTRC due dates of 15 September 2026 and 15 October 2026, with the caveat "Please check VAT/PT notification for latest updates."

Source: https://www.mahagst.gov.in/en

### 33. [high] WhatsApp Business moved to per-message pricing on 1 July 2025, and India WABAs face a hard cutoff: migrate to INR billing by 31 December 2026 or Meta stops delivering messages from 1 January 2027.

Meta pricing docs: "Effective July 1, 2025, Meta charges on a per-message basis." Categories marketing, utility, authentication; "All marketing template messages are charged", while "utility templates delivered within an open customer service window are free". "Non-template messages can only be sent within an open customer service window" (24 hours from the user's last message). Click-to-WhatsApp ads and page CTAs open "a 72-hour" free entry point window. India: "Billing localization launched on January 1, 2026 for partners and directly-integrated clients whose Sold-To country is India", with migration to INR required by "December 31, 2026 to avoid disruptions, since as of January 1, 2027 Meta will no longer deliver the messages of non-INR WABAs."

Source: https://developers.facebook.com/docs/whatsapp/pricing

### 34. [high] The economically important WhatsApp design decision for an HRMS is that Utility templates and free-form messages are FREE inside the 24-hour customer service window — an employee-initiated conversational HR bot costs materially less than push notifications.

Meta pricing: "utility templates delivered within an open customer service window are free"; non-template messages are permitted only within an open customer service window and are not charged there. Marketing templates are always charged.

Source: https://developers.facebook.com/docs/whatsapp/pricing

### 35. [medium] BSPs add their own per-message fee on top of Meta's charge and handle WABA onboarding and template approval, so WhatsApp unit economics are Meta rate plus BSP margin.

Gupshup advertises "Fixed Gupshup per message fee - as low as $0.001" with the footnote "*WhatsApp fee at actuals" and "No hidden fees, no subscription fees, no volume commitment." Services include WABA setup and management, template handling, and BSP licence access via Gupshup's own licence or a One Direct dedicated partner licence. The page does not state explicitly how Meta's fee is billed alongside the $0.001; the asterisk implies pass-through at cost.

Source: https://www.gupshup.ai/channels/self-serve/whatsapp

### 36. [high] Do NOT build Teams notifications on Office 365 / M365 incoming webhook connectors — Microsoft is retiring them and will block new connector creation. The supported paths are Power Automate Workflows webhooks or a Teams app with a proactive bot.

Microsoft Learn, verbatim: "Microsoft 365 Connectors (previously called Office 365 Connectors) are nearing deprecation, and the creation of new Microsoft 365 Connectors will soon be blocked." Replacement is the Workflows app with the "When a Teams webhook request is received" trigger; ISVs are told to "Create a Power Automate connector" or "Update your Teams app" to enable proactive messages. Constraints: "The message size limit is 28 KB." / "If more than four requests are made in a second, the client connection is throttled." Limitation: "Workflows can become orphan flows in the absence of an owner if no co-owners assigned."

Source: https://learn.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/add-incoming-webhook

### 37. [high] Slack's API surface IS verifiable — the original report's 'unverified' status was a stale-host problem, not a real gap. Slack docs now live at docs.slack.dev.

docs.slack.dev lists Web API, Events API, Slack Status API, Admin API, SCIM API, Audit Logs API, and the deprecated legacy RTM API. Web API methods are "in the form https://slack.com/api/METHOD_FAMILY.method", authenticated with a bearer token via OAuth 2.0 sent in the Authorization header; chat.postMessage is documented. api.slack.com remains unreachable from this environment (SSL-inspecting proxy; curl returns 503), which is what produced the original 'unverified' finding.

Source: https://docs.slack.dev/apis/

### 38. [high] Zoho Expense offers a full OAuth 2.0 REST API with an India data centre and shares Zoho Books' rate-limit envelope — the lowest-friction expense integration for an India-first HRMS.

India base URL https://www.zohoapis.in/expense/; header "Authorization: Zoho-oauthtoken [token]"; "The Url parameter organization_id along with the organization ID should be sent in with every API request." Rate limits: "100 requests per minute per organization"; daily 1,000 Free / 2,000 Standard / 10,000 Premium-Enterprise; concurrency 5 (Free) or 10 (Paid, soft limit); HTTP 429 on breach.

Source: https://www.zoho.com/expense/api/v1/introduction/

### 39. [high] Fyle, Happay, Zaggle and Pluxee cannot be scoped from public documentation — all four are BD conversations before they are engineering tickets.

docs.fylehq.com serves only an empty Stoplight workspace shell ("Like what you see? Create your own free Stoplight workspace"); fyle.readme.io returns 401; www.fylehq.com/api returns 404. Zaggle's site describes Cards & Payments, Employee Benefits, Travel & Expenses, Business Recurring Expenses, Procure To Pay, Tax Solutions and Channel Partner Rewards, with no developer resources or technical integration documentation. Pluxee India describes meal and employee benefits and a rewards suite, stating "11,000+ clients across public & private sector", "3.5+ million consumers" and "1,00,000+ meal merchant acceptance points", with no API, developer portal, HRMS integration or bulk onboarding interface mentioned.

Source: https://www.zaggle.in/

### 40. [high] Which identity provider Indian 20-200 employee companies actually use was NOT established. Do not assert Google Workspace vs Microsoft 365 share in the PRD.

No survey, job-posting corpus, or vendor disclosure covering India mid-market IdP share was retrieved in either research pass. This remains a customer-discovery question, not a desk-research one.

Source: https://knowledge.workspace.google.com/admin/apps/set-up-your-own-custom-saml-app

## Requirements

- Ship a bank advice / salary upload file generator as the P0 disbursement mechanism, with a per-bank format registry keyed on bank + account type + format version. Cover at minimum ICICI, HDFC (ENet), Axis, SBI, Kotak plus a generic NEFT/RTGS CSV. Every format must be a data-driven, versioned template so a bank spec change is a config change, not a release.
  - priority: P0 | rationale: Zoho Payroll integrates directly with only four banks plus its own rail and offers Download Bank Advice for everyone else. No Indian bank publishes its salary file column spec on its public site — HDFC's ENet pages are marketing copy only — so specs must be capturable per customer without an engineering change.
- Build the payout layer as a Disbursement Provider interface with three concrete implementations from day one: file export, fintech rail, and direct bank connected-banking. Payroll must never call a bank or rail SDK directly.
  - priority: P0 | rationale: Each rail has incompatible auth (Basic + idempotency header vs client-id/secret + optional RSA signature vs bank OTP session), incompatible batch semantics, and different failure modes. The set of rails will change; the payroll engine must not.
- Integrate one fintech payout rail end-to-end for launch. Recommend Cashfree Payouts as primary (self-serve, sandbox, API + dashboard + Excel upload, Batch Transfer V2) with RazorpayX as the second implementation.
  - priority: P0 | rationale: RazorpayX requires the customer to hold a current account at IDFC First, RBL, ICICI, Yes, Axis or Slice. Cashfree imposes no equivalent partner-bank constraint and natively exposes the same three channels the HRMS needs to expose (API, dashboard, Excel).
- Provision static egress IPs for the payout service and document them. Cashfree caps allowlists at 25 IPv4 addresses with no IPv6 support; RazorpayX docs instruct allowlisting. Do not run payout calls from an environment with rotating egress.
  - priority: P0 | rationale: This is an infrastructure constraint that invalidates naive serverless or edge deployment for the payout path and must be in the architecture from the start, not discovered at integration time. Cashfree's single-RSA-public-key alternative is the only escape hatch and permits only one key at a time.
- Make every payout call idempotent with a caller-generated UUID persisted before the request, and make the pay run's disbursement state machine crash-safe and replayable. Support RazorpayX's X-Payout-Idempotency header natively.
  - priority: P0 | rationale: X-Payout-Idempotency is a required header on POST /v1/payouts. Duplicate salary credits are the worst failure mode in payroll and are effectively unrecoverable commercially.
- Model bank-side maker-checker explicitly. After the HRMS initiates a payment, the run enters a 'pending bank approval' state resolved by polling status, never by treating an API 200 as settlement. Surface to the HR admin exactly which human must approve in which bank portal.
  - priority: P0 | rationale: ICICI requires separate CIB portal approval when approval workflows are configured; Axis multi-user setups require an approver to authorise in the bank portal. A product that reports 'paid' on API acknowledgement will be wrong for most corporates.
- Build connection-health monitoring for bank integrations with proactive re-auth prompts: track token and session expiry, warn before lapse, and hard-block a pay run whose bank connection is stale rather than failing at disbursement time. Never auto-retry OTP entry.
  - priority: P0 | rationale: Zoho's Axis integration "expires every 30 days" and allows only 5 OTP attempts before going inactive and requiring full re-setup. A monthly-cadence product with a 30-day-expiring connection fails on payday unless expiry is managed ahead of time, and a retry loop would burn the OTP budget.
- Encode bank cut-off times, payment-mode eligibility and per-mode caps as data, not code: NEFT/RTGS/IMPS/UPI eligibility and limits per rail, and same-day cut-offs per bank. Warn the admin before they schedule a run that cannot land on the intended value date.
  - priority: P1 | rationale: Verified published limits vary by rail and by partner bank: RazorpayX IMPS up to Rs 5 lakh 24x7, RTGS above Rs 2 lakh, UPI up to Rs 1 lakh and only on RBL and Yes Bank current accounts, with NEFT and RTGS processing windows differing per partner bank; Zoho's Axis integration cuts off at 6:45 PM for same-day. Cashfree does not list RTGS at all.
- Build bank-account validation into employee onboarding and into the pre-pay-run preflight, not at disbursement time.
  - priority: P1 | rationale: Cashfree publishes Validate Payout V2 and Process Validated Payout V2 for exactly this. Catching a wrong IFSC or account number mid-run, after other employees have been paid, produces a partial-payroll incident.
- Treat direct bank connected-banking integrations (ICICI CIB, Axis, SBI, Kotak) as a post-launch BD track with a named owner, not an engineering backlog item. Budget lead time for the bank's partner onboarding, for customer-side document verification via a relationship manager, and for bank processing fees charged to the customer.
  - priority: P1 | rationale: ICICI's flow requires the customer to complete document verification with their relationship manager and states ICICI may charge a processing fee; Tally's Connected Banking is gated on Tally's own partner programme plus an active TSS subscription. These timelines belong to the bank, not to us.
- Build the GL posting layer as a journal-entry abstraction with three output modes: native API push, file export, and on-prem connector. Do not model it as 'an accounting API integration'.
  - priority: P0 | rationale: Zoho Books has a clean cloud API with a full /journals operation set; Tally's documented gateway is an HTTP server on port 9000 inside the customer's own TallyPrime process; BUSY publishes no API at all. One abstraction, three delivery mechanisms.
- Ship Zoho Books as the first GL integration: OAuth 2.0 against the India data centre (https://www.zohoapis.in/books/v3), posting one consolidated payroll journal per pay run to /journals, with organization scoping. Batch all writes and implement 429 backoff; offer a per-department or per-cost-centre split as an option, never one API call per employee.
  - priority: P0 | rationale: It is the only India-relevant cloud GL with documented, self-serve, OAuth-based journal creation, and Zoho's customers are a migration target. Rate limits force the batching: 100 requests per minute per organization and as few as 1,000 requests per day on the free plan, with 5-10 concurrent calls — per-employee posting for a 200-person company would breach the daily cap.
- For Tally, ship a small installable Windows connector (or a documented gateway configuration) that pulls the journal from the HRMS and posts it into TallyPrime over the local XML gateway, rather than expecting the HRMS to reach Tally over the internet.
  - priority: P1 | rationale: Tally's documented mechanism is an HTTP server inside the TallyPrime process listening on port 9000 by default, addressed as http://<Tally-IP>:9000 and enabled through F1 > Settings > Advanced Configuration. That is a LAN endpoint on the customer's machine, not a hosted API.
- Estimate the Tally connector from Tally's published XML integration documentation (ENVELOPE/HEADER/BODY/TALLYMESSAGE/VOUCHER, port 9000). Scope a short spike only for the payroll voucher and ledger master schema — the field names and attribute values for a payroll journal — not for the transport.
  - priority: P2 | rationale: Corrects the prior research. The envelope structure, header elements (VERSION, TALLYREQUEST, TYPE, ID, STATUS), body elements and default port ARE published by Tally; only the specific voucher/ledger payload for a payroll journal needs hands-on confirmation.
- Remove QuickBooks from the integration roadmap entirely — PRD, marketing, and connector directory.
  - priority: P0 | rationale: Intuit withdrew all QuickBooks products from India: no access as of 1 July 2023, covering QuickBooks Online, QuickBooks Online Accountant, the mobile app and QuickBooks Time.
- Implement a single SCIM 2.0 server (/Users and /Groups, single bearer token, filter by userName and externalId, group uniqueness on displayName, JSON Patch add/replace/remove, soft delete via active=false with the user still returned) serving both Microsoft Entra ID and Okta, plus SAML 2.0 SP support (IdP- and SP-initiated) for Entra, Okta and Google Workspace custom SAML apps.
  - priority: P1 | rationale: Entra and Okta both consume standard SCIM 2.0 with near-identical requirements; Google Workspace supports custom SAML apps for any SP without vendor listing. One protocol implementation unlocks all three and none of it requires a partner relationship to ship.
- Implement the /Schemas discovery endpoint alongside /Users and /Groups even though it is not needed for a custom app, and treat marketplace listing (Entra application gallery, Okta OIN) as a separate GTM workstream with third-party review lead time.
  - priority: P2 | rationale: Microsoft states schema discovery "is the sole method to add more attributes to the schema of an existing gallery SCIM application" and "isn't currently supported on custom non-gallery SCIM application" — so the endpoint only pays off once listed, but retrofitting it after listing is worse. Okta requires OIN publication for customers to find the integration.
- Support Google Workspace Admin SDK Directory API as an employee-roster IMPORT source during onboarding (read-only scope, list users by domain with pagination), separate from SSO.
  - priority: P2 | rationale: For a 20-200 employee India company the Google Workspace directory is often the only existing structured employee list. This converts multi-hour CSV onboarding into a one-click import, which is an activation lever.
- Architect statutory filing as an attended browser-automation service with a human in the loop, NOT as an API integration. Assume every filing surface (EPFO, ESIC, TDS, state PT) is a portal with credentials, CAPTCHA, and often OTP.
  - priority: P0 | rationale: EPFO's employer portal serves a CAPTCHA on the establishment sign-in and documents no API or bulk machine interface; Maharashtra PT is a web form portal with no API; ESIC publishes no machine interface. A CAPTCHA on login makes fully unattended automation impossible by design.
- Model the EPFO lifecycle against the REVAMPED ECR (wage month September 2025 onwards), not the legacy flow: upload .txt > system validation with error correction and reupload > employer approves return > Due Deposit Balance Summary generated > challan generated with TRRN > payment > receipt download. Store the TRRN and the Due Deposit Balance Summary as compliance artefacts.
  - priority: P0 | rationale: EPFO's own FAQ specifies this flow and explicitly separates return filing from payment generation. Without capturing TRRN and payment state the product cannot tell an employer whether they are compliant, and a state machine built on the pre-September-2025 flow will be wrong.
- Model the three revamped-ECR return types (Regular, Supplementary, Revised) as first-class objects, enforce sequential month-by-month filing, and make an approved return immutable in the product — corrections only via a Revised Return, with downward revision permitted only while payment against that UAN is outstanding.
  - priority: P0 | rationale: EPFO: "Once a return is approved in the system, it cannot be canceled"; employers "must file monthly ECRs strictly in chronological order... without skipping any month"; downward revision is allowed only if payment against that UAN for the wage month has not been made, while upward revision is allowed after payment. A product that lets HR edit and re-file freely will desync from the portal.
- Replicate the revamped ECR's eligibility validations in the payroll engine and block upload on failure: EPS ineligibility for members earning above Rs 15,000 who joined on or after 1 September 2014; no EPS contribution beyond age 58 unless flagged for deferred pension; contribution at statutory rate or higher but never below; contributions only within a valid date of joining and date of leaving; mandatory prompt marking of exit dates.
  - priority: P0 | rationale: These are the exact checks EPFO now enforces at the portal. Catching them client-side turns a rejected filing and a joint-declaration correction into a pre-payroll warning. EPFO's own guidance says to mark exits before moving to the next month's return, because unmarked exits block future filings.
- Ship the EPFO ECR .txt generator, but derive the current field specification from a live employer portal session or a currently-hosted EPFO document before writing it. Do not code against the 11-field '#~#' layout as received.
  - priority: P0 | rationale: EPFO confirms the .txt layout is unchanged under the revamped system, but its own file-structure PDFs now 404 after the epfindia.gov.in to epfo.gov.in migration. The 11-field, '#~#'-delimited spec rests on secondary sources, and the 'no header row' detail is contradicted by at least one description. The portal rejects files whose column order or delimiter is wrong, so this must be right.
- Design credential handling for portal automation up front: per-establishment encrypted credential vault, explicit customer consent and authority-to-act, a full audit trail of every automated portal action, and an operator-visible 'what we did on your behalf' log. Get legal review before shipping.
  - priority: P0 | rationale: Filing-as-a-service means holding employer EPFO, ESIC, PT and income-tax-portal credentials and acting as the employer on a government site. This is the highest-risk surface in the product and cannot be retrofitted.
- Ship Form 24Q as a text-file generator plus guided handoff: produce the standardised text file, walk the employer through downloading the CSI file from the income tax portal, running the Protean/TIN FVU (a Java desktop utility) to produce the .fvu, and uploading it themselves. Do not promise automated TDS filing.
  - priority: P0 | rationale: This is exactly what the market leader does — Zoho Payroll generates the text file and the employer performs FVU validation and portal upload. The FVU being a Java desktop utility means any attempt to automate it needs a job runner on a machine with a JRE, not a web call.
- Before committing to 'filing as a service' in the PRD, run a verification spike on ESIC monthly contribution and the top 5 state PT portals by employee coverage, documenting per portal: login mechanism, CAPTCHA presence, exact file format and column order, and whether a DSC or EVC is required. Include a TLS-hardening step for ESIC.
  - priority: P0 | rationale: ESIC's file format could not be confirmed from any ESIC source; its template URLs 404 and esic.gov.in serves an incomplete certificate chain (openssl verify code 21), which will break standard HTTP clients. Scoping RPA across N portals without per-portal facts is how a filing commitment blows up.
- Scope state Professional Tax as N separate portal automations, priced and sequenced by the employee headcount each state covers — not as one 'PT integration' line item.
  - priority: P1 | rationale: PT is state-administered. Maharashtra alone exposes distinct PTRC and PTEC flows with separate e-return and e-payment paths, monthly PTRC due dates (15 September 2026 and 15 October 2026 currently published), and no API. Each additional state is incremental work with its own maintenance burden.
- Build the WhatsApp channel via a BSP and design the messaging model around employee-initiated conversations: answer employee queries inside the 24-hour service window with free-form and Utility messages, and reserve paid template pushes for a small set of high-value events (payslip ready, leave approved, document expiry).
  - priority: P1 | rationale: Meta charges per template message delivered since 1 July 2025, but Utility templates and free-form messages inside an open customer service window are free. A conversational, employee-pull design is structurally cheaper than a notification-push design at the same utility.
- Track WhatsApp per-message cost per customer as a first-class COGS line with a per-tenant message budget and alerting, and complete INR billing migration for the WABA before 31 December 2026.
  - priority: P1 | rationale: WhatsApp is variable COGS (Meta rate plus BSP margin — Gupshup quotes 'as low as $0.001' plus 'WhatsApp fee at actuals') attached to a fixed-price SaaS subscription. Meta states that from 1 January 2027 it will no longer deliver messages of non-INR WABAs, so the migration is a service-continuity deadline, not a billing preference.
- Implement Microsoft Teams notifications as a Teams app with proactive bot messaging, or via the Workflows (Power Automate) 'When a Teams webhook request is received' trigger. Do NOT build on Office 365 / M365 incoming webhook connectors.
  - priority: P2 | rationale: Microsoft states M365 Connectors are "nearing deprecation" and that creation of new ones "will soon be blocked". Workflows-based webhooks are owner-bound and "can become orphan flows in the absence of an owner" — a real risk in an HR product where the creator may be the departing HR admin. Design around the 28 KB message limit and the four-requests-per-second throttle.
- Keep templated transactional email as the guaranteed-available notification channel behind a Notification Channel abstraction; WhatsApp, Slack and Teams are pluggable channels above it with per-tenant, per-event routing.
  - priority: P1 | rationale: WhatsApp carries approval gates and per-message cost, Teams carries a deprecation migration, and Slack requires app distribution work. Email is the only channel with none of those and must be the fallback for every notification type.
- Publish an outbound webhook plus REST API for the HRMS itself (employees, org, leave, attendance, payroll summaries) as the escape hatch for every integration not on the roadmap — Happay, Fyle, Zaggle, Pluxee, Marg, BUSY, SAP Business One, Dynamics, NetSuite.
  - priority: P1 | rationale: Fyle's docs are gated or empty, Happay was unreachable, and Zaggle, Pluxee and BUSY publish no integration documentation at all. A public API converts an unbounded set of unscopeable partner integrations into a documented self-service surface.
- Ship Zoho Expense as the first expense integration (OAuth 2.0, https://www.zohoapis.in/expense/, organization_id on every request, sync users out and approved reimbursements back into the pay run) and treat Happay, Fyle, Zaggle and Pluxee as BD-first, engineering-second.
  - priority: P2 | rationale: Zoho Expense is the only expense or benefits vendor in this dimension with fully public, self-serve API documentation and an India data centre. For the others no honest engineering estimate is possible yet.
- Maintain an internal integration registry recording, per integration: mechanism (API / file / portal automation), auth model, whether onboarding is self-serve or gated on a third party, expiry and rotation behaviour, and a named owner. Gate roadmap commitments on the 'gated on a third party' flag.
  - priority: P1 | rationale: Every hard dependency here — bank partner programmes, WhatsApp BSP and template approval, Entra gallery and Okta OIN review, benefits-card providers, government portals — has a timeline outside the team's control and is the most likely source of a missed launch date.
- Resolve Indian bank and government hostnames at runtime and follow redirects; do not hardcode either legacy or .bank.in hostnames, and pin no assumptions about which form a given bank uses. Ensure the HTTP client tolerates or explicitly handles incomplete certificate chains on government hosts, with the exception logged and scoped to named hosts.
  - priority: P2 | rationale: Migration is uneven and live: hdfcbank.com and icicibank.com 301 to .bank.in, but kotak.com and sbi.co.in do NOT redirect to their .bank.in equivalents even though those hosts exist. Separately, epfindia.gov.in now 301s to epfo.gov.in with the entire legacy document tree 404'd, and esic.gov.in serves an incomplete chain. Anything written against fixed hostnames breaks on redirect, 404, or certificate validation.

## Open questions

- ECR .txt field specification: what is the CURRENT authoritative field list, order, delimiter and header convention under the revamped ECR? EPFO confirms the layout is unchanged but its own file-structure PDFs are 404 on both epfindia.gov.in and epfo.gov.in after the domain migration. Obtain it from a live employer portal session or the revamped-ECR User Manual (linked as User-Manual-ReECR_v3.0.pdf) before writing the generator.
- EPF remittance due date: the '15th of the following month' figure was NOT verified against an EPFO primary source in either research pass, and EPFO's revamped-ECR FAQ does not state it. Confirm from the EPF Scheme or a current EPFO circular before putting a deadline in the product.
- Revamped ECR transition: the FAQ describes a four-month 'initial relaxation of validations' for filing regular returns for a subset of active members. When does that window close, and what breaks for customers onboarding after it? This affects launch-window support load directly.
- ESIC monthly contribution: what is the exact template — column names and order, .xls vs .csv, whether a text upload alternative exists, whether employer login carries a CAPTCHA, and whether a DSC is required? The template URLs 404 and esic.gov.in serves an incomplete TLS chain, so nothing was confirmed from ESIC itself.
- Does the income tax e-filing portal's 'API Specifications' under e-Return Intermediaries cover TDS statements (Form 24Q), or only income tax returns? This single answer determines whether TDS filing-as-a-service is RPA or API. The direct help path 404s; the specifications page must be found on the portal itself.
- Is a DSC or EVC mandatory to upload a .fvu for Form 24Q on the income tax portal, and does the FVU's Java requirement mean a headless job runner is viable or that a supervised desktop session is unavoidable?
- Does TallyPrime's JSON integration surface (and the API Explorer Tool) expose anything the legacy XML gateway on port 9000 does not, and is it ever cloud-reachable rather than LAN-only? The JSON help page documents headers and body shape but states no port or reachability model.
- HDFC ENet: what is the exact salary payment file column specification, is there a documented host-to-host or SFTP option for mid-market corporates, and what is the authorisation model? Confirmed again that HDFC's public pages carry only marketing copy — this needs a customer or an HDFC relationship manager.
- SBI CINB and Kotak corporate banking: what salary upload file formats do they accept, and is there any partner or API route beyond the Tally Connected Banking arrangement? Note Tally lists ICICI for balance and statement only, not payments — so ICICI's connected-banking payment capability via partners needs separate confirmation.
- ICICI Connected Banking: what is the partner enrolment process for a new software vendor, the commercial arrangement, and the typical lead time? Zoho's help pages document the customer-side flow but say nothing about the vendor-side partner programme.
- What do RazorpayX and Cashfree actually charge per payout at 20-200 employee volumes, and does that cost sit with the HRMS or pass through to the employer? Neither publishes payout pricing on the pages fetched. This determines whether the fintech rail is a feature or a margin problem.
- Do any of the fintech rails or banks support a scheduled or future-dated bulk salary payout with a cancellation window, and can payouts be reversed before settlement? This governs whether the product can offer an 'undo' on a mistaken pay run.
- Does Google Workspace support outbound automated user provisioning into a third-party app (the SCIM-equivalent push direction), on which editions, and does it require catalogue listing? Still unresolved — the dedicated knowledge page 404s and support.google.com/a/answer/6300771 now redirects to the knowledge site root.
- Slack app distribution: what does org-wide installation and admin approval require for an HRMS app, and what are the Web API rate-limit tiers for chat.postMessage at 200-employee notification volumes? The API families are now verified at docs.slack.dev, but distribution and rate-limit specifics were not.
- What identity provider do Indian 20-200 employee companies actually use? No credible source exists in desk research. Answer from customer discovery.
- Fyle, Happay, Zaggle and Pluxee: is there any partner-only API, SFTP, or bulk file interface for employee sync, approved-expense pull, or card loading — or is it entirely manual portal work by the employer's HR team? All four publish nothing.

## Retracted

- RETRACTED (serious): that TallyPrime's XML envelope tag names and listening port are not published by Tally and must not be stated. They ARE published at help.tallysolutions.com/xml-integration/ — ENVELOPE/HEADER/BODY/TALLYMESSAGE/VOUCHER, the header elements VERSION/TALLYREQUEST/TYPE/ID/STATUS, and port 9000 by default with the F1 > Settings > Advanced Configuration enablement path. The prior report's refusal to state these, and its P1 requirement forbidding estimation from documentation, were wrong and would have cost the team an unnecessary spike.
- RETRACTED (serious omission): the prior report's EPFO lifecycle. EPFO introduced a revamped / re-engineered ECR applicable from wage month September 2025 that separates return filing from payment generation, adds Regular/Supplementary/Revised return types, makes approved returns non-cancellable, enforces sequential filing, auto-computes Section 7Q interest and Section 14B damages, and voids unpaid challans created under the old system. Any EPFO state machine built on the pre-September-2025 flow is wrong.
- RETRACTED: that www.kotak.com 301-redirects to www.kotak.bank.in and www.sbi.co.in 301-redirects to sbi.bank.in. Verified false today: kotak.com 301s to www.kotak.com/en.html and sbi.co.in 301s to sbi.co.in/redirect/ (200). Both .bank.in hosts exist and serve independently, but the legacy hosts do not point at them. The HDFC, ICICI and Axis-certificate parts of the claim hold.
- RETRACTED: that Tally Connected Banking covers payment initiation for all four of ICICI, Axis, SBI and Kotak. Tally's documentation supports balance and statements for all four but lists online payments for Axis, SBI and Kotak only — ICICI is not listed for payments.
- RETRACTED: that Slack's API surface could not be verified. api.slack.com is still blocked by this environment's SSL-inspecting proxy, but Slack's documentation moved to docs.slack.dev, which is reachable. Web API, Events API, Admin API, SCIM API and Audit Logs API are all confirmed, with methods at https://slack.com/api/METHOD_FAMILY.method under OAuth 2.0 bearer tokens.
- RETRACTED: that the TRACES / e-TDS / FVU chain could not be verified. The full Form 24Q chain is documented on Zoho Payroll's own help pages: payroll generates a standardised text file, the employer downloads a CSI file from the income tax portal, runs the Java-based FVU from Protean Tinpan against both, and uploads the resulting .fvu to the income tax portal themselves.
- RETRACTED: the claim that Zoho Payroll's help centre does not address statutory filing. Zoho publishes a dedicated Form 24Q help page describing exactly what it generates and what the employer must do. The correct claim is narrower: Zoho generates files, the employer files.
- CORRECTED: Cashfree's authentication headers are X-Client-Id and X-Client-Secret, with X-Cf-Signature as the RSA-signature alternative — the prior report omitted X-Client-Secret. The operation name 'Get Batch Transfer Status V2' does not appear in Cashfree's published API reference; the published names are Standard Transfer V2, Batch Transfer V2, Get Transfer Status V2, Validate Payout V2, Process Validated Payout V2 and Create/Get/Remove Beneficiary V2.
- CORRECTED: 'IP whitelisting is mandatory for production but optional for sandbox' is not stated in Cashfree's IP-whitelist documentation as fetched. The doc gives the 25-address and IPv4-only limits and the RSA alternative but does not itself assert production mandatoriness. Treat mandatoriness as likely but unconfirmed.
- CORRECTED: RazorpayX NEFT is not simply 'above Rs 1 during working hours' — it is processed within 2 hours on working days inside bank-specific windows (2:00am-6:00pm for IDFC/RBL, 1:00am-6:45pm for ICICI/Yes Bank), and RTGS windows likewise differ per partner bank.
- CORRECTED: the WhatsApp India billing deadline. Localization launched 1 January 2026 and migration must complete by 31 December 2026 because "as of January 1, 2027 Meta will no longer deliver the messages of non-INR WABAs" — the 1 January 2027 delivery cutoff is the load-bearing date, not the 31 December migration date.
- DOWNGRADED from high to medium: the EPFO ECR 11-field / '#~#' specification. EPFO's own file-structure PDFs are now 404 on both epfindia.gov.in and epfo.gov.in; EPFO confirms only that the .txt layout is unchanged. The 'no header row' detail is contradicted by at least one description of ECR as carrying a HEADER line plus DETAIL lines.
- DOWNGRADED to low: the ESIC monthly contribution Excel template columns. Corroborated by practitioner sources only; the template files themselves 404 at both esic.in and portal.esic.gov.in.
- REMOVED: the claim that 'NEO by Axis Bank is named as the transaction banking solution' on the Axis API portal. Not present in the portal content fetched.
- NOT CLAIMED and deliberately withheld: that the income tax portal's e-Return Intermediary API specifications cover TDS statements. The reference exists on the portal home page but the specifications themselves were not readable, and ERI schemes historically cover income tax returns rather than TDS statements. Recorded as a low-confidence lead and an open question.
