## 20. Non-Goals, Validation Plan & Risk Register

This is the document's control section. Everything before it argues for building something; this section is where the document argues, with equal force, against building the wrong things — and where it fixes in place the specific mistakes that must never re-enter a model, a deck, a contract or a board slide. It exists because the research that produced this PRD retracted roughly ninety claims across its first two adversarial sweeps (the Draft 1 count; the round-two critic's own tally is roughly sixty — §02.3), and **every one of those retractions moved in the same direction — smaller, later, more contested, already occupied** (§02.3). A one-directional error pattern is not noise to be cleaned up once; it is a standing bias that will keep producing optimistic non-goals violations, optimistic TAM, and optimistic pricing unless something structural stops it. These four registers are that structure. **[Reversed] in part:** rounds three to five found that round two's own corrections overshot on *competitor* claims — multi-state PT/LWF was killed on a Frappe claim that is false at source (EV-K12), a single-figure price ceiling was too low (EV-K20), and Keka's pricing was obtainable all along (EV-K21). The bias is directional for business-case claims; for competitor-capability and competitor-price claims it has no safe direction, and the rule is to re-check at source (§02.3).

They are deliberately shaped so a reader can *act* on them without re-reading the whole PRD:

1. **Non-goals & anti-recommendations (§20.1–§20.3)** — what we are declining to build, and the smart-sounding strategies we are actively arguing against, each carrying the evidence that killed it so nobody resurrects it in Q3.
2. **The Killed list (§20.4–§20.5)** — the numbers and named strategic conclusions that are *permanently banned*. If one of these appears in a model, the model is wrong on its face, no further review needed.
3. **Validation plan (§20.6–§20.7, with the sizing register in §20.13)** — every **[Hypothesis]** in this document mapped to a named method, an owner, a cost, a timeline, and a gate with an explicit kill criterion, split into build-blocking desk work that starts now and commercial validation that gates money, plus the falsification protocol for each; and every named parameter the PRD routes here, with its sizing route and owner.
4. **Risk register (§20.8–§20.12)** — each risk expressed as an *observable trigger* and a *pre-agreed response*, not a severity score nobody acts on, plus the statutory edge cases that are themselves filing-failure triggers, and the standing decision rules that prevent the class of mistake in the first place.

The organising discipline throughout: **a non-goal, a banned number, or a risk response is only useful if it is falsifiable and pre-committed.** "Be careful about pricing" is not a control. "If a mystery-shopped CA bureau quotes under ₹2,000/month for 50 employees, our ₹80–150 PEPM target — which sits inside the ₹80–200 mid-market clearing band, above a value floor near ₹50 (EV-027) — is dead and the pricing section is rebuilt" is a control. This section is written entirely in the second register.

<!-- DIAGRAM: control-section-map -->

---

### 20.1 Non-Goals — what we are deliberately not building

A non-goal is a thing we *could* build, that a reasonable person would expect us to build, and that we are choosing not to — with the reason attached. These are not "later" items (those live in the phasing roadmap, §05); they are **structural declines** that shape hiring, gross margin, channel and the kind of company this is. The distinction matters: a "later" item can be pulled forward if the market shifts; a non-goal cannot, without re-litigating the evidence in the right-hand column.

| # | Non-goal | Status | Evidence that kills it | What we do instead |
| --- | --- | --- | --- | --- |
| NG-1 | **Manufacture or resell attendance hardware** (biometric terminals, face/RFID devices) | **[Killed]** | Devices sell for ₹4,000–25,000 one-time and are already installed at the customer. No recurring margin, no moat, and direct channel conflict with the eSSL/ZKTeco dealer networks that could otherwise distribute *us* (Source: review-site price guide re-checked in r2/04 — not a vendor price list, so only the ₹4,000–25,000 envelope is usable, never a model price). eSSL already names six HRMS vendors as integration partners on its own site (r2/04, 2026 capture; site read, not executed). | Build the ADMS/WDMS push receiver in v1 (§09) and treat device vendors as partners; publish a model-level compatibility matrix. |
| NG-2 | **Free HRMS monetised on interchange / card float** (the Zaggle model) | **[Killed]** | Zaggle earns 5.3% of net revenue from software; ~95% is money movement, at a 9.9% whole-company adjusted EBITDA margin on gross revenue (~₹39/user/month) and ~10% ROE, having returned 67% of program-fee revenue as incentives and cashback — an upper bound, because the same line also funds its Propel rewards business (Source: Zaggle FY26 filed accounts and deck, r2/02). Winning here means an incentive war against a listed incumbent with 19 bank partners and 50mn cards, funded off our own balance sheet. | Build the FBP/wallet *data model* in v1 (§11); model attach revenue as a separate line that is never blended with software PEPM; defer the monetisation. |
| NG-3 | **A premium / surcharged AI SKU** | **[Killed]** | Seven independent vendors price HR AI at zero — greytHR NAVOS "included in every plan" (3 Jun 2026; claim posture, not tested in product — EV-090), Zoho Zia inside the entry paid tier, Oracle/Microsoft/Workday/15Five/Culture Amp all bundled (Source: vendor pricing pages, 2026, as tallied by the r2 critic; claim posture, not tested). A surcharge reads as a surcharge on an expected feature. | Bundle the assistant into the base plan; monetise only where the unit of value is legibly incremental — recruiting per requisition/hire, bulk document generation, per-admin analyst copilot (§12, §13, §18.5). |
| NG-4 | **"Cache everything" as an inference-cost default** | **[Killed]** | On Gemini's hourly cache-storage pricing, a 50k-token per-tenant policy cache held continuously on Flash-Lite costs ~₹34.47 per employee-month at a 100-employee tenant against ₹0.27 for paying full input price with no cache at all — more than 100× the uncached cost, and ~230× that tenant's entire modelled inference bill of ₹0.15 (Source: Gemini API pricing, Sep 2026, via r2/03). The rupee figures ride on the placeholder token estimate (EV-008); the storage-versus-input ratio is what kills the default. | Caching is a per-provider, per-tenant-size policy decision made by the router (§13), never a global default. |
| NG-5 | **A paid-only product below 10 employees** | **[Killed]** | Kredily is free forever at unlimited headcount *with* PF/ESI/PT/TDS calculation; Zoho Payroll is ₹0 to 10 employees; Zoho People ₹0 to 5 users (Source: vendor pricing pages, 2026 captures; pages read, not executed). The freemium convention gives away *computation* and charges for *outputs* — bank payout files, PF/ESI challans, the annual tax certificate, Form 124 (ex-12BB) (EV-029). Marginal price for computation in this band is zero and Zoho, the one capitalised actor among them, set it there. | Serve 10–20 free as an acquisition funnel (§05); make revenue turn on the 20–200 band where EPF obligation and budget overlap. |
| NG-6 | **Self-hosting / dedicated GPUs to cut inference cost** | **[Verified]** | Serverless beats a dedicated H100 by ~74× at realistic utilisation for our workload shape (Source: cloud GPU vs serverless pricing model, §13). Self-hosting is a cost *increase* until utilisation is implausibly high. | Serverless-first, multi-backend router. Offer self-host only as a *priced compliance SKU* for named regulated accounts that contractually require it — never as a cost play. |
| NG-7 | **Scraping any candidate database** (Resdex, LinkedIn, foundit) | **[Verified]** | The only working Resdex extraction piggybacks a live authenticated session, outside the access Info Edge licenses — it licenses database search only through its own ATS (Source: Info Edge/Zwayam terms; Naukri FAQ, 2026, r2/08). That is contractual exposure for us *and* for the customer; any statutory exposure was not researched in this corpus (counsel, §23). | Ship "bring your own job-board contract" (§10): multi-post to Naukri/LinkedIn/foundit/apna/Indeed with application ingest and dedup, inbound only. Forbid scraping explicitly in architecture and in sales collateral. |
| NG-8 | **Any statutory or monetary figure generated by an LLM** | **[Verified]** | A wrong payroll number is a legal problem, not a UX problem. PF computations, PT slabs, TDS, gratuity and leave balances resolve deterministically; the model explains, routes and drafts — it never calculates (§12). | Rules-first, LLM-last. Every statutory number is produced by versioned, effective-dated deterministic code with an audit trail (§06, §14). |
| NG-9 | **Building an in-house passive candidate graph** to rival Naukri Resdex | **[Verified]** | Resdex is "over 50 million profiles" behind an unlicensable wall; we found no developer API, self-serve key or partner documentation as of 2026 (Source: Naukri FAQ and a search for a developer portal, r2/08; pages read, not executed). Rebuilding it is a decade-long data-acquisition business, not an HRMS feature. | Inbound recruiting only; do the *documented* LinkedIn partner integration properly and early — it is the one large passive graph with a certifiable path. |
| NG-10 | **EOR / PEO (employer-of-record) as a v1 line** | **[Hypothesis]** | The EOR comparators in round-one research were fabricated or stale ($400 Multiplier is not in its own source; the corrected 2022 figure of $300 carries a provenance defect and is not usable either — §20.4, EV-K06). EOR is a legal-entity and money-movement business with a different licensing surface and a different competitive set (Deel, Multiplier, Remote). **Kill/keep:** revisit only if ≥20% of the buyers interviewed in the commercial validation programme (V-03, V-07) name multi-country hiring as a top-3 requirement — a pre-registered decision threshold, not a market estimate; otherwise permanently declined. | Support foreign-national employees inside a single Indian entity in v1; do not take on the employer-of-record liability. |
| NG-11 | **Salary-linked lending / earned-wage access / BNPL** on our balance sheet | **[Hypothesis]** | This is a lending business with credit risk and float requirements orthogonal to attended statutory filing, and a regulatory licensing surface this corpus did not research (counsel, §23); the attach-profit evidence (NG-2) already shows money-movement margins are thin. **Kill/keep:** only as a *referral* line to a licensed partner, never principal, and only after the FBP data model proves attach demand (a signed referral term sheet with ≥1 licensed NBFC before any build). | Build the data hooks (salary, tenure, attendance) that a lending *partner* would consume; keep the credit risk off our books. |
| NG-12 | **A proprietary employee chat/social channel** competing with WhatsApp and the deskless worker's own phone | **[Verified]** | Nine in ten non-users live in a phone-owning household — worker identity ≠ device identity — and a new WhatsApp business portfolio reaches only 250 unique users per rolling 24h, so push must be worker-initiated (Source: Comprehensive Annual Modular Survey 2023 via dataforindia, and Meta's messaging-limit documentation — both re-verified in r2/04; §09). Fighting for a proprietary channel wastes the one channel workers already use. | Meet the worker on WhatsApp and on shared-device kiosk flows; terminal integration carries frontline attendance, not a bespoke app. |
| NG-13 | **Full mobile-device management (MDM) / endpoint management** | **[Hypothesis]** | This is a distinct security-product category (Scalefusion, Hexnode, Intune) with its own buyer and compliance surface; it is not what an HR/payroll buyer is choosing between. **Kill/keep:** revisit only if enterprise-band RFPs (deferred segment, §05) require it as a *scored* line item in ≥3 tenders; otherwise declined. | Integrate with the customer's existing MDM for device trust signals; do not build one. |
| NG-14 | **Global / multi-geography payroll at launch** | **[Verified]** | The entire thesis is India statutory depth as the unit of delivery (§01, §06); building and maintaining that depth in *one* country — including the multi-state PT/LWF layer that neither Frappe v16 (EV-031) nor TallyPrime (EV-032) ships — is already a multi-year effort whose compliance-curation cost scales per state maintained (EV-088; sized in §22). A second country halves the compliance team's focus for a market we cannot yet size. | India-only through the beachhead and expansion phases; treat "all three segments" as vision, not "all geographies" (§05). |
| NG-15 | **Consumer / D2C financial products** (personal tax filing, individual investment) off the employee base | **[Hypothesis]** | Cross-selling consumer fintech to the employee is a different regulatory and CAC surface; the employer is the buyer and the payer. **Kill/keep:** the employee surface stays an engagement and deflection asset (§12), not a monetisation channel, unless a partner economics test clears a 3× LTV:CAC bar on a live cohort. | Own the employee surface for retention and self-service deflection; do not turn the payslip into a storefront. |
| NG-16 | **Owning the assistant runtime** (betting differentiation on our chat UI) | **[Verified]** | Darwinbox announced Cortex on 4 Aug 2026 — early access with design partners, not GA — with Microsoft Teams, Copilot, Slack and Glean as its named delivery surfaces (vendor newsroom read, not executed; r1/04, r2/03); Keka advertises a "Keka MCP Server" (EV-090); we are not aware of any evidence, as of September 2026, that an MCP server has changed a buying decision, and MCP adoption stats are banned (§20.4). If enterprise buyers converge on Copilot/Glean, our assistant collapses to a data source. | Own the *data and the tools the assistant calls*, expose a three-way-split MCP server (read / approval-gated write / admin), and let the buyer bring their assistant (§12, §15). |
| NG-17 | **Feature-parity positioning against Tally** | **[Verified]** | TallyPrime ships the statutory *artefacts* at ₹0 incremental — PF Forms 3A/5/6A/10/12A + ECR, ESI 3/5/6, PT statement, Form 16 (now Form 130), 24Q annexures (now Form 138), 12BA (now 123), 27A, NPS, gratuity (EV-032; product docs read, not executed). It is **not** statutorily complete: no state PT slab table (slabs hand-entered), no LWF engine, no leave module, cannot calculate leave encashment (its own FAQ), manual attendance vouchers only, multi-user only at Gold (EV-032). **[Reversed]** — earlier text called it "statutorily complete". A parity pitch on the artefacts still loses: Tally owns accounting and the statutory artefacts; greytHR owns the HRMS job (EV-K34). | Win on what Tally's documentation shows it does not do: multi-state PT/LWF as maintained data (greenfield in both incumbents, EV-031/032), leave and a Form IX-compliant time model, attended assisted submission of a portal-accepted artefact (no vendor claims to submit, EV-030), a CA console, and *maintained* statutory updates under SLA (§18, §21). Tally employee self-service is an unresolved cell (EV-032) — never claim it absent. |
| NG-18 | **Sizing device-integration effort or claiming an integration success rate** from the retracted 85–98% figure | **[Killed]** | The "85–98% success / 1-in-7 devices won't integrate" number was marketing from the vendor selling the integration fix; round one applied a range floor as a mixed-fleet average (Source: retracted vendor marketing, §09). | Treat device-integration effort as *currently unsized*; run a hardware spike (V-10/V-11) before committing a roadmap estimate; buy the paid connector for the long tail (~$345 one-time / $588/yr). |
| NG-19 | **A full accounting / GST ledger** (competing with Tally/Zoho Books as the books of account) | **[Verified]** | Tally *is* the accounting incumbent in this segment and is ₹0 incremental for payroll on top of books already owned (EV-032; its payroll *adoption*, as distinct from capability, is unknown — V-02); rebuilding the general ledger is a second product against a long-established incumbent, and it inverts NG-17 by inviting exactly the parity fight we decline. | Post payroll journal entries *out* to Tally/Zoho Books/Busy via export and API (§16); own the payroll sub-ledger and the statutory registers, not the trial balance. |
| NG-20 | **An in-house Aadhaar e-KYC / eSign / video-KYC stack — or any Aadhaar verification performed on a tenant's behalf** | **[Verified]** | Aadhaar authentication is permission-gated (s.4(4), r4/04; s.57 was omitted in 2019, EV-071). A multi-tenant "we verify Aadhaar for your employees" feature **cannot be built**: no entity may perform offline verification on behalf of another (AOVR reg 16A(2)) and e-KYC licence keys may not be shared (reg 15(2)) (EV-070). Registering as an OVSE would bar the same legal entity from storing Aadhaar numbers at all (s.8A(4)(b), EV-069 — corporate-structure question, counsel, §23). The eSign provider regime was not researched in this corpus. | Hold Aadhaar only as an opaque token over a separate, separately-encrypted store (Part E-6; §07, §14), Aadhaar optional everywhere (§07); integrate a third-party eSign provider for appointment letters, EPF declaration/nomination forms and consent artefacts, with the provider's licensing basis confirmed before build (§16, §23). |
| NG-21 | **Becoming a payroll-disbursement / money-movement principal** (holding client funds, sponsoring the bank rail) | **[Verified]** | Holding client payroll funds brings float and settlement risk onto the holder's balance sheet and raises a payments-regulation question — whether any framework applies, and which one to which disbursement model, was not researched in this corpus (counsel required, §23). The attach-margin evidence (NG-2, ~10% ROE) shows money movement is thin-margin next to the ~95% gross margin Zaggle states for pure software (Source: Zaggle FY26 accounts and DICE-acquisition call, r2/02) — a margin this product cannot assume, because its dominant cost line, supervised filing, is unsized (EV-088). | Generate the bank advice file / NEFT-IMPS-RTGS payout instruction and integrate RazorpayX / bank host-to-host as a *rail we drive, not a rail we own* (§16); never take custody of client payroll funds. |
| NG-22 | **A standalone LMS or a standalone OKR/engagement-survey product** | **[Hypothesis]** | These are separate SaaS categories with their own incumbents (Darwinbox/PeopleStrong bundle them; Culture Amp, 15Five, Leapsome sell them standalone) and the buyer is often a different one (L&D, People-Ops) than our filing buyer. **Kill/keep:** ship only the thin performance/goal surface justified by the talent wedge (§10); revisit a deeper LMS/OKR build only if ≥30% of renewed accounts name it as a top-3 retention driver in the first-cohort renewal survey. | Keep performance lightweight and integration-friendly; do not open a second product front while the statutory depth is still being built (§05, §22). |
| NG-23 | **An on-premise / perpetual-licence deployment of the core product** (the Tally-style shrink-wrap model) | **[Verified]** | The product's value *is* the maintained-compliance SLA — a permanent stream of statutory updates the customer cannot self-apply (§19 SLA specification; §22 compliance data pipeline); a perpetual on-prem licence structurally severs that stream and reproduces Tally's ₹0-incremental trap on our own cost base. | Cloud multi-tenant by default; the only on-prem/single-tenant offering is the *priced compliance SKU* for contractually-residency-gated regulated accounts (NG-6, §15), never a mass-market licence. |
| NG-24 | **Rendering a legal opinion, or any statutory interpretation presented as advice** — "you are covered by ESI", "this termination is lawful", "this slab applies to you" | **[Verified]** | Customer-facing legal claims are product surface with a named owner and require clearance before they ship (§23); this PRD alone carries roughly twenty questions its own authors are barred from answering without counsel (§23 counsel register). Advice is also the one output that cannot be reconciled: a wrong number is caught by a rejected file, a wrong opinion is caught by a notice years later, and the employer's and deductor's statutory liability is non-delegable in either case (EV-K24). | State what the rule *says*, with its citation and capture date, and route interpretation to the tenant's own adviser. The assistant explains, drafts and routes; it never advises and never sets a statutory or monetary number (NG-8, §12). Every statutory statement carries its source (§20.12 rule 1). |
| NG-25 | **Indemnifying a customer's statutory penalty, interest or damages** — "we pay your PF interest if we are late" | **[Verified]** | Interest under s.7Q is mandatory and auto-calculated by EPFO, and damages under s.14B may be deposited later at the employer's option (EV-039) — both attach to the employer by construction, and the statutory liability is non-delegable (EV-K24). An indemnity would convert a service-level promise into an open-ended insurance product whose insurability is itself an unanswered question (Part D-17, V-29). | The compliance SLA is a *service-level* remedy with a stated cap (`sla_remedy_cap_months`, §19), bounded by fees and cleared on its wording by counsel (§23). The remedy compensates for our failure to deliver the artefact and the attended session; it never stands in for the employer's own liability (§22). |
| NG-26 | **Tenant-authored statutory rule objects** — letting a customer or an implementation partner type in a PT slab, a wage ceiling or a contribution rate | **[Verified]** | A rule object is only trustworthy because it carries an identity, a jurisdiction scope, an effective range, a citation with a capture date, an author, a reviewer and a publish state (§14); a tenant-typed slab carries none of them and cannot be regression-tested against the golden corpus (§22). TallyPrime is the cautionary case in the market: its PT slabs are hand-entered because it ships no state slab table (EV-032) — precisely the gap this product exists to close. | Tenants configure **policy** parameters (the LOP day-rate convention, FBP component choices, approval routing) and never statutory rule objects. A tenant who believes a shipped slab is wrong raises it through the §22 compliance data pipeline, which is the only route by which a statutory value changes — with the gazette, the reviewer and the staged publish attached. |
| NG-27 | **Attended submission inside a free tier** | **[Verified]** | Supervised filing is the dominant cost line and scales per registration × state × filing type, while revenue scales per employee (EV-088) — a free tier carrying submission gives away the largest cost against zero revenue. It also inverts the market's own empirically-located paywall: both freemium players give away *computation* and charge for *outputs* (EV-029). | The free tier carries computation and self-service artefacts; submission is the paid line (§18). R-41's pre-agreed response already forbids extending the free tier to attended submission when a competitor's free tier widens. |
| NG-28 | **Unattended or robotic submission on statutory portals** — an RPA bot logging in on the employer's credentials on a schedule | **[Verified]** | Every statutory surface is an attended portal — EPFO with an interactive login and CAPTCHA, TDS where the *employer* runs the FVU utility and uploads, ESIC template upload, state PT across N manual portals (EV-K24) — and the four Part D-17 questions about operating under employer credentials are open (V-25). An unattended bot converts four unanswered legal questions into a standing, unsupervised exposure and removes the one control that makes attended filing defensible: a named human, in a time-boxed session, on a logged instruction the customer approved. | Every session is attended, time-boxed, logged, and hand-backable to the employer mid-flight, with a "what we did on your behalf" record (§22). Automation is applied to *preparing* the artefact and *validating* it before upload, never to the act of submission. |

#### Non-goals that are timing-gated, not permanent

Three declines are conditional on the phasing roadmap (§05) and carry an explicit re-open gate rather than a kill:

| Deferred build | Re-open gate |
| --- | --- |
| **Enterprise (2,000+) as a launch segment** | Documentary, not technical: ISO 27001:2022 held ≥12 months, a reference implementation at a ≥30,000-employee institution, and a buyer who has written GFR Rule 173(i)/170(i) startup relaxations *into the bidding document* (Source: GFR 2017; SBI/Indian Bank HRMS RFPs, §01). Start ISO 27001 at month zero regardless — the seasoning clock cannot be bought later. |
| **Public-sector / BFSI-regulated accounts** | Sectoral gates are contractual and entity-specific, not turnover-gated. RBI Outsourcing of IT Services Directions: localisation, audit by the entity and by RBI, sub-contractor consent and regulator inspection — **materiality-gated**, determined entity by entity (EV-087, **[Verified — mirror]**: pull the Directions from the primary source before customer use; **[Reversed]** — earlier text said "no turnover threshold", EV-K33). Whether the arrangement is material for a given RBI entity is counsel's question, never ours to assert (§23). SEBI: in-India residence and processing, with the MeitY-empanelled-infrastructure rule reaching PaaS/SaaS providers (EV-085). IRDAI: **no** localisation in its cyber guidelines — localisation applies only to policy records — but managed payroll can fall inside its outsourcing definition (EV-086). Re-open only when three interchangeable in-India-inference backends exist and the contractual audit, access and inspection terms can be offered — deterministic replay supports evidence production for such inspections but does not discharge them (EV-K32) (§13, §15, §17). |
| **Metered AI monetisation SKUs** | Only after willingness-to-pay validation (V-07) shows non-zero willingness for a *specific* agent; otherwise the assistant stays fully bundled (§20.6). |

#### The non-goal record — fields, and the protocol for re-opening one

A non-goal decays into a slogan the moment its evidence is separated from it. Six months after a decline, what survives in the organisation is "we don't do hardware" — not *why*, not *what would have to change*, and not *who is allowed to change it*. The register is therefore specified as a record with mandatory fields, and re-opening one is a defined transition with a named approver, not a conversation in a planning meeting.

| Field | Type | Rule |
| --- | --- | --- |
| `id` | `NG-<n>` | Immutable. A retired non-goal keeps its id and is marked retired; ids are never reused, so a deck citing NG-9 always means the same decline. |
| `statement` | One sentence, in the negative | Must name the *thing a reasonable person would expect us to build*. "We will be focused" is not a non-goal; "we will not manufacture or resell attendance hardware" is. |
| `status` | `[Verified]` · `[Killed]` · `[Hypothesis]` · `[Reversed]` | `[Hypothesis]` here means *the decline itself rests on an unvalidated premise* and therefore carries a kill/keep clause with a pre-registered threshold (NG-10, NG-11, NG-13, NG-15, NG-22). |
| `evidence` | One or more EV ids, or a dated source with its capture mode | A competitor-derived decline states whether the product was **executed** or only its **documentation or repository read** (§20.12 rule 1). A decline resting on no evidence at all is a preference, and belongs in §05 phasing, not here. |
| `instead` | The positive commitment | Every decline names what we do in its place. A non-goal with an empty `instead` field is a gap in the product, not a decision. |
| `permanence` | `structural` · `timing-gated` | `structural` declines shape hiring, gross margin, channel and company shape; `timing-gated` declines carry an explicit re-open gate (the three in the table above) and live alongside §05's phasing rather than replacing it. |
| `reopen_gate` | Required when `permanence = timing-gated`, else null | A condition an observer could confirm — a signed term sheet, a scored RFP line item, a documentary certification held for a stated period — never "when the market is ready". |
| `reopen_approver` | Named role | Founder for anything that changes company shape (NG-2, NG-11, NG-14, NG-21, NG-23); Product for scope declines; Legal jointly for NG-20, NG-24, NG-25 and NG-28, because each rests on a question routed to counsel. |
| `last_reviewed` | Date | Reviewed on the same cadence as the risk watchlist (`risk_review_cadence_days`, §20.13). A non-goal whose evidence row has been re-captured since its last review is re-read before it is relied on again (§20.17). |

**The re-open protocol.** A non-goal is re-opened only by the sequence below, and the sequence is the point: it forces the *evidence* to move before the *decision* moves, which is the opposite of how declines are usually reversed.

1. **Name the evidence that changed.** Not an opinion, not a prospect's request — a specific EV row re-captured and found different, a new primary source, or a pre-registered validation that reported. A request from a large prospect is a *reason to run a validation*, never a reason to re-open a decline.
2. **Re-derive the decline against the new evidence.** Write out what the original reasoning would now conclude. Where the original reasoning relied on arithmetic — NG-2's margin ratios, NG-4's cache multiple, AR-14's per-life figure — the arithmetic is redone with the new inputs and shown.
3. **Check it against the standing rules.** A re-open that requires a banned number (§20.4), an unqualified figure from the qualifier table, or an unsourced competitor capability claim fails here and stops.
4. **Price the second front.** State what the re-open costs in statutory-team and engineering attention while the compliance depth is still being built — the cost AR-11 and NG-22 both turn on.
5. **Named approver signs, with the reasoning recorded.** The record's `status` moves to `[Reversed]` with a one-line reason carried wherever the non-goal appears, exactly as the three reversals already in this section do.

**Decision table — may a non-goal be re-opened?**

| Evidence changed | Re-open gate satisfied | Arithmetic re-derived | Approver | Verdict |
| --- | --- | --- | --- | --- |
| No | — | — | — | **No.** Restate the existing record and close the conversation. |
| Yes — a prospect asked | — | — | — | **No.** Raise a validation item instead (§20.6); a request is a hypothesis, not evidence. |
| Yes — EV row re-captured and changed | `permanence = structural` | Yes | Named | **Conditional.** Approver may reverse; the record moves to `[Reversed]` with its reason. |
| Yes — EV row re-captured and changed | `timing-gated`, gate **not** met | Yes | Named | **No.** The gate is the decision; meeting the evidence bar without meeting the gate changes nothing. |
| Yes — validation reported | `timing-gated`, gate met | Yes | Named | **Yes.** Re-open, and move the item into §05 phasing with a build sequence. |
| Yes | Any | No | Any | **Blocked.** Re-derive the arithmetic first — every reversal in this section moved a number, not a mood. |

**Worked example — how AR-3 was re-opened, and what it cost to be wrong.** The multi-state PT/LWF decline is the only reversal in this section that ran the full protocol, and it is the template. The evidence that changed was a *source re-read*, not a market signal: Frappe HR v16's India payroll is three files and 549 lines overriding three functions, with no Indian state name, no PT slab table and no LWF anywhere in the tree (EV-031). The re-derivation was arithmetic in the weakest sense and decisive in the strongest — the claim under test was "PT across 15+ states and LWF across 14", and the observed count in the repository is **zero states and zero LWF rules**, a gap that no interpretation closes. The second front was already priced, because the differentiator sits inside work the compliance data pipeline must do anyway (§22). What the episode cost is the part worth remembering: a decline held for two rounds on a single unverified competitor claim, which in turn killed the one capability that is greenfield in *both* incumbents (EV-031, EV-032). That is why `evidence` must record capture mode — "release material read" and "repository read" are not the same fact, and the difference between them was the whole error.
<!-- DIAGRAM: non-goal-boundary -->

---

### 20.2 Anti-recommendations — smart-sounding strategies we argue against

These differ from non-goals in kind. A non-goal is a product we won't build; an anti-recommendation is a *strategy a competent person would propose in a planning meeting* — and that the evidence says is a trap. Each is stated as the plausible pitch, then the counter.

**AR-1 — "The 20–50 band is a competitive vacuum; walk in and take it."**
This was in an earlier draft and is **[Killed]**. Zoho Payroll serves 25 at ₹1,000/month, HivePayroll at ₹1,499, RazorpayX at ₹2,499 (up to 20 employees), and Kredily computes free while charging for the outputs (Source: vendor pricing pages, 2026 captures, r2/05 — pages read, not executed; EV-029). Meanwhile six of six priced HRMS vendors impose a 50-employee minimum billing block (EV-026), so a 20-person firm pays for 50 — greytHR at 20 employees is ₹124.75 PEPM effective (EV-027). The band is *not empty*: it is served by cheap payroll-only product, structurally overcharged by the priced HRMS set, and under-served by product that delivers a portal-accepted artefact and completes attended submission (EV-030). The wedge is quality-of-delivery (is the portal-accepted return submitted, on time, under a maintained SLA, with the employer's liability staying with the employer) plus no seat floor (§18), not availability. Never say "vacuum" in a deck.

**AR-2 — "Ship an MCP server and own the AI-integration moat."**
We are not aware of any evidence, as of September 2026, that an MCP server has moved a buying decision, and the adoption statistics that made this case in round one are unverifiable and banned (§20.4). MCP is table stakes and a *data-ownership* play, not a moat in itself. Build it (§12) because owning the tools the assistant calls is defensible; do not forecast revenue against it.

**AR-3 — "Multi-state PT and LWF coverage is our differentiator."**
**[Reversed] — withdrawn as an anti-recommendation; multi-state PT and LWF *is* a genuine differentiator.** The earlier kill rested on "Frappe HR India Payroll v16 ships PT across 15+ states and LWF across 14, free", which is false at source: Frappe v16's entire India payroll is three files, 549 lines, overriding three functions (HRA exemption ×2, marginal relief); no Indian state name appears anywhere in the tree, and there is no ECR, EDLI, EPS, UAN, LWF, 24Q/Form 138, 12BB/Form 124, 12BA/Form 123 or 27A (EV-031; repository read, not executed). ERPNext v16 removed payroll and `india-compliance` is GST/vendor-TDS only (EV-031). TallyPrime has no state PT slab table (slabs hand-entered) and no LWF engine (EV-032; product docs read). Multi-state PT/LWF is greenfield in both incumbents. Two cautions survive: Frappe's gross-to-net salary structure is genuinely strong, so **the bake-off will not be won on gross-to-net** (EV-031); and the differentiator exists only once the gazette-sourced state dataset exists (V-09) — today only the Maharashtra and Odisha PT schedules have been read at state primary source, plus Karnataka's effect on the state PT portal with its amending instrument unretrieved (EV-014); every other state, and every LWF figure, is undone (EV-015). **[Reversed]** — earlier text said "only Telangana PT is verified"; only Telangana's employer-registration wording was ever verified, not its slab (EV-014). Any customer-facing use of this comparison clears the competitor-claim rule first (§21).

**AR-4 — "Free investment-declaration and proof-of-investment workflow is our P0 differentiator."**
**[Killed]**. Zoho Payroll's ₹0 tier (up to 10 employees) already includes proof-of-investment and reimbursement-proof approval (Source: Zoho Payroll pricing page, captured 2026, r2/01; page read, not executed), and the freemium convention is to give workflow and computation away and charge for outputs (EV-029). Against Zoho these are table stakes. Our differentiation is attended filing — a portal-accepted artefact plus assisted submission under written authority to act, which no vendor in the six-vendor set claims to offer (EV-030) — under a maintained-compliance SLA, not FBP UX.

**AR-5 — "Price AI on top; Indian ARPU is too thin to fund it otherwise."**
The premise misplaces the cost. Inference is the *smallest* of four cost-of-goods lines — inference, WhatsApp per-message, supervised filing, compliance curation — and the dominant line is supervised filing, which scales per registration × state × filing type while revenue scales per employee, and is unsized (EV-088, §13). The earlier "₹0.15–3.27 PEPM against ₹50–150 ARPU, a 93–99% inference gross margin" is **[Reversed]** and withdrawn: it measured one line of four, against an ARPU band that contradicted the price ceiling the same draft stated (r5 CFO review); prices now follow the two-anchor structure (EV-027). What survives is the 52.7× model-choice spread, a ratio and FX-invariant (EV-089); the PEPM absolutes are placeholders (EV-008) — **killed if V-04 shows realised tokens ≥5× the estimate, which would break free bundling at the low end**. And the price of HR AI is already zero (NG-3). AI is COGS and an acquisition weapon, not a revenue line.

**AR-6 — "Give the HRMS away and make it back on interchange like the neobanks."**
See NG-2. This is the wrong side of every ratio versus a listed incumbent. The fintech-subsidised-HRMS precedent (Jupiter acquired sumHR to source salary accounts) reportedly valued the *software asset* at about ₹7.5 Cr for 100% — a second-hand figure from reporting on Jupiter's FY23 filings, low confidence and not confirmed against MCA (r2/02; CQ-19 in §21.14). If it holds, an HRMS is cheap for an acquirer to zero-price, which is a risk to defend against (§20.8, R-6), not a model to copy.

**AR-7 — "Build the November-2026 pitch around statutory chaos — be the guide through the uncertainty."**
**[Killed]** as framing. The four Labour Codes came into force 21 Nov 2025 and final Central Rules under all four were notified 8 May 2026 (Source: MoLE gazette, 8 May 2026). The story is *not* "guide through chaos"; it is "build against a settled spec, and maintain it as states notify unevenly." The urgency is the ESI-side transitional gap (§20.8, R-2), not general uncertainty.

**AR-8 — "Self-host the models for regulated buyers to cut cost and win on price."**
Two errors compounded. Self-hosting *raises* cost at realistic utilisation (NG-6), and residency-gated buyers are not price-sensitive on inference — they are contract-gated on data location and right-to-audit (§13). Offer self-host as a priced compliance SKU, never as a discount.

**AR-9 — "Target the ~41,000 named accounts in the 200–999 band as the revenue base."**
The number does not survive: EPFO Appendix-2(v) shows 173,250 *registered* establishments above 200 accounts against 41,881 *contributing* above 200 employees — a 4.1× gap depending on which you pick (Source: EPFO Annual Report Appendix-2(v), FY2023-24). Any base built on this must state registered-vs-contributing explicitly; the registered figure is banned as a target (§20.4).

**AR-10 — "Sarvam / an INR-native model removes our FX and residency problems."**
Sarvam's hosting is unverified across both sweeps and must not be relied on until captured (Source: unverified, flagged §13). It is a *hedge to validate* (V-13), not a foundation to assume. Provider abstraction (three interchangeable backends, residency selectable per tenant) is the real answer; a single named INR provider is not.

**AR-11 — "Structure the company as a fast feature-velocity software startup."**
The uncomfortable implication of the maintenance economics (§13.1, §18, §22): building and holding statutory depth that neither incumbent maintains — Frappe has no India statutory engine (EV-031) and Tally no state PT slab table or LWF engine (EV-032) — plus the supervised-filing and compliance-curation lines that dominate the cost stack (EV-088), is a permanent compliance-engineering and filing operation with a standing statutory team. The company's shape is a *compliance-maintenance operation with a software surface*, not a feature-velocity startup. Hiring the wrong shape is a strategic error, not an ops detail (§20.8, R-10).

**AR-15 — "Raise a large seed and outspend incumbents on paid acquisition."**
The computation floor is zero — Zoho (up to 10 employees), Kredily (computation free, outputs paid — EV-029) and self-hosted Frappe — and Zoho, the one capitalised actor among them, already defends it; paid CAC into a market whose free tier converts on a *size proxy* is spending to fill a funnel Zoho is already paying to fill (§18). Keka's filed FY24 accounts show employee-benefit cost at 137% of operating revenue (Source: Entrackr on the FY24 filings, re-read in r2/09; §04) — spending ahead of revenue is already present in this field and is not a moat (filed figures only, per the §21.12 financial-claim rule). Spend the raise on statutory depth and the maintained-SLA (the thing free products cannot copy), not on ads against free.

**AR-16 — "White-label the platform to banks/insurers as their SME HR offering."**
Superficially attractive channel leverage; in practice, wherever the arrangement is material for the bank — a materiality test made entity by entity, not a turnover threshold (EV-087; **[Reversed]** — earlier text said "no turnover threshold", EV-K33) — it drags in the full RBI outsourcing surface (audit *by the bank and by RBI*, localisation, sub-contractor consent, regulator inspection, exit clauses — §15, §17), on a deal shape (per-partner customisation) that fractures the multi-tenant product. **[Hypothesis]** — revisit only after a live reference bank writes the startup relaxation into its own procurement and the residency matrix (V-13) clears; otherwise it is enterprise procurement wearing a channel costume.

**AR-17 — "Lead the sales deck with 'AI-native'."**
Seven vendors price HR AI at zero and the two loudest Indian AI stories are unshipped — Darwinbox Cortex is early access with design partners, not GA (announced 4 Aug 2026), and Keka AI is waitlisted (EV-090; vendor pages read, not executed). Leading with AI concedes the frame to a feature the buyer already expects for free and cannot evaluate. Lead with the filing SLA and the maintained-compliance guarantee; let AI be the reason the product is fast and cheap to run, not the headline.

**AR-19 — "Publish the risk register and the open legal questions as a trust artefact — buyers reward candour."**
**[Killed]** as an external artefact, kept as an internal one. This section names unresolved legal questions the company is explicitly barred from answering without counsel — whether employees hold DPDP access and correction rights against an employer relying on s.7(i), whether an employer entering Aadhaar into EPFO or ESIC portals is a requesting entity, whether the SPDI Rules survive the omission of IT Act s.43A, whether attended operation under employer credentials is permitted by each portal's terms (Part D; §23). Published, each becomes a representation: a customer-facing legal claim is product surface with a named owner and requires clearance (Part D-20), and an unresolved question stated to a buyer is read as a position, not as candour. The correct external artefact is the *evidence*: the measured on-time accepted-filing metric with its published definition (§19), the dated source behind every compliance statement (§20.12 rule 1), and the SLA's own terms. Candour about method, never about open exposure.

**AR-20 — "Buy the multi-state PT and LWF dataset from an aggregator and skip V-09."**
**[Killed]**. Aggregator data on state PT and LWF is materially disputed, and at least one widely-cited 2026 table reproduces a superseded structure (V-09). Buying it does not transfer the risk — it launders it, because the purchased row arrives without a gazette URL, a capture date or a corrigendum check, and therefore cannot become a rule object at all (§14, §20.12 rule 1). The failure is also asymmetric in the worst direction: the differentiator this dataset creates is greenfield precisely because neither incumbent maintains it (EV-031, EV-032), so the first customer-visible error lands on the one capability we sell. Aggregator tables have exactly one permitted use — flagging a discrepancy to chase to the gazette (§20.12 rule 1). The dataset is desk work with an owner and an elapsed time (V-09), not a purchase.

**AR-21 — "Subcontract the filing operation to an existing bureau and white-label it — skip building compliance ops."**
**[Hypothesis]**, and argued against. Three things do not move when the work is subcontracted. The employer's and deductor's statutory liability stays non-delegable (EV-K24), so the customer's exposure is unchanged and our SLA still has to stand behind someone else's execution. The dominant COGS line does not shrink — supervised filing still scales per registration × state × filing type (EV-088) — it only becomes *unmeasurable*, which destroys V-26 and with it the automation target the whole cost thesis depends on. And the four open Part D-17 questions apply to the subcontractor's operation as much as to ours, now one contractual step further from the evidence. One version survives scrutiny: a bureau as an **overflow capacity partner** on our runbooks, our credential vault and our audit log, timed by the same instrumentation. That is capacity, not outsourcing, and it is the only form in which it may be proposed.

**AR-22 — "The competitor list prices are captured now (EV-027) — set our price off them and stop waiting for V-03."**
**[Killed]** as a pricing method. The six-vendor table is a *list* structure and it is genuinely verified: a value floor near ₹50 PEPM and a mid-market clearing band of ₹80–200 at 50 employees (EV-027). What it does not contain is a single realised transaction. The two realised data points in the corpus — ₹52 and ₹126 PEPM — are both biased downward because platform users exceed billed seats, and they are a shape, not a level (EV-027). Keka's own posture is the warning: three commented-out price spans in the raw HTML, a withdrawn card, two live pages that contradict each other on setup fees, and renewal fees "subject to an increase" under ToS clause 15 (EV-021, EV-022, EV-025). A list price from a vendor moving to a sales-qualified motion is the *opening* of a negotiation, not its outcome. Our own price is set on realised-price evidence (V-03) and measured cost (V-26), and never on a competitor's list move alone (R-40, §20.13).

---

### 20.3 Anti-recommendations for the go-to-market and channel

**AR-12 — "The CA is our channel; design the whole GTM around them."**
This is the single most consequential GTM claim in the document and **no CA has been asked a single question** (§18 channel reasoning is entirely **[Hypothesis]**). Designing *for* the CA as a user is correct product instinct; forecasting revenue on the CA channel before V-05 is fiction. If CAs read us as disintermediation, the channel inverts into an opponent (§20.8, R-14).

**AR-13 — "The Tally-partner channel is a distribution shortcut."**
Equally unvalidated. It rests on the assumption that a meaningful share of Tally's ~2.5m businesses enable the payroll module — and that figure is Tally's own "2.5+ million businesses **worldwide**" claim, not an India count, with its own homepage carrying 2.7M+ (r2/05; §18.8). The enablement share is a number we do not have (V-02). There are two incumbents with two jobs: Tally owns accounting and the statutory artefacts; greytHR owns the HRMS job; Tally payroll *adoption*, as distinct from capability, is unknown (EV-032; **[Reversed]** — earlier text treated "Tally is the incumbent" as singular, EV-K34). At ~5% payroll enablement, Tally's payroll job is marginal and the Tally channel shrinks to an accounting-export play; at ~40% Tally payroll is the dominant displacement target and the channel leads. No forecast may depend on the Tally channel until V-02 reports.

**AR-14 — "Group health / benefits attach is a ₹10,000–25,000-per-life upsell."**
**[Killed]**. IRDAI puts India's commercial group health market at ₹61,435 Cr across 275mn lives — ₹2,233 per life per year, not ₹10,000–25,000 (Source: IRDAI Annual Report, group health segment). Overstated by an order of magnitude.

**AR-18 — "Sell to the CFO on cost savings versus the bureau."**
Tempting, but the buyer's stated pain is not cost — the bureau at ₹3,000–15,000/month is affordable — it is *implementation friction and filing anxiety* (the leading churn cause in the market, §20.8 R-28). A cost pitch invites a race the ₹0 incumbents win. Sell the CFO on *risk removed* (a portal-accepted filing completed on time through attended submission, under SLA, with an audit trail — the employer's statutory liability itself stays non-delegable, §22) and the HR admin on *hours returned*; leave "cheaper than a CA" out of the deck (§18).

---

### 20.4 The Killed list — numbers permanently banned from every model and deck

If any figure below appears in a financial model, a pitch deck, a website claim, or a contract, the artefact is wrong on its face and must be corrected before it goes further. This is a *hard* list: these are not "use with caution" numbers, they are numbers proven false or structurally contaminated. Each carries the reason so it is not re-derived by someone who never saw the retraction.

| Banned figure | Where it came from | Why it is banned |
| --- | --- | --- |
| **6 crore MSMEs as TAM** | Udyam 5.31 Cr registrations | Not employers with payroll obligations. Inflates the addressable base by ~two orders of magnitude (Source: Udyam portal vs EPFO contributing establishments). |
| **$23.32bn → $38.36bn "India HR-tech market"** | Widely circulated in Indian press | Almost certainly a *global* figure mislabelled as India, with no attribution. Use the bottom-up model on the EPFO denominator instead (§04). |
| **24,18,266 registered establishments as the addressable base** | EPFO registered count | Use *contributing* (7,66,254 as on 31.03.2024). Registered overstates by ~3.2× — two-thirds of codes are dormant (Source: EPFO, 31.03.2024). |
| **173,250 registered / "~41,000 named accounts 200–999" as target base** | EPFO Appendix-2(v) | Registered vs contributing gap is 4.1× (173,250 registered vs 41,881 contributing above 200). Never ship the registered figure as a target (Source: EPFO Appendix-2(v)). |
| **₹12,250 Cr @ 10% CAGR ceiling** | Round-one sensitivity table | Overstated by 12.3%; the correct 10% CAGR ceiling is ₹10,905 Cr (Source: recomputed §04 model). |
| **₹37,500/year CA fee** | ICAI recommended fee schedule | Pre-GST, carries Wealth Tax heads, ≥9 years stale, and had a pricing recommendation resting on it. ICAI's schedule has *no payroll-processing line item at all* (Source: ICAI recommended fee schedule, full-text search). |
| **$400 Multiplier EOR price** | Round-one competitive note | Fabricated — not present in its own cited source. The corrected 2022 figure of $300 carries a provenance defect and is banned too (EV-K06). |
| **₹161 PEPM Zaggle "money movement per employee"** | Round-one attach model | Contaminated denominator — Zaggle's user count includes channel partners and customers-of-customers (Source: Zaggle filings, denominator analysis). |
| **₹150–500 PEPM attach @ 1.5–5% take rate** | Round-one attach model | Take rate borrowed from a different company; both numerator and rate unsupported (§11). |
| **₹10,000–25,000 group health per life per year** | Vendor claims | IRDAI figure is ₹2,233 per life per year across 275mn lives (Source: IRDAI Annual Report). Overstated ~order of magnitude. |
| **85–98% device integration success** | Vendor selling the integration fix | Marketing, not measurement; round one used a range floor as a mixed-fleet average. Device effort is currently unsized (§09, V-10/V-11). |
| **MCP adoption statistics** | Round-one AI-moat argument | Unverifiable; we are not aware of any evidence, as of September 2026, that an MCP server changed a buying decision (§12). |
| **₹83.3 / USD** | Round-one INR conversions | Wrong by 13.4%. Use ₹94.43 (4 Sep 2026) and model FX at 90/95/100 as a strategic input (EV-089; Source: TradingEconomics, corroborated by Wise, r2/03). |
| **~₹99 as "Keka's price point"** | Widely cited | Provenance never resolved, and it matches none of Keka's own published figures (EV-021–EV-023) — never attribute it to Keka. **The Keka price ban itself is lifted — [Reversed]:** Keka's pricing was obtainable all along; the "TLS-blocked" premise was one fetch tool's failure, not the site's (EV-K21). Use Keka's own figures with their qualifiers (table below). |
| **Any Peoplebox funding figure** | Tracxn | Its own Tracxn record self-contradicts on the same page (Source: Tracxn, self-contradictory). |
| **"Employees' Compensation is a blanket sub-10 liability"** | Round one | The Second Schedule limits it largely to hazardous and mechanical occupations (Source: Code on Social Security, Second Schedule). |
| **"40+ mandatory health check-up, general"** | Round one | Confined by the notified Rules to docks, mines and construction, in permissive language (Source: OSH Code Central Rules, 8 May 2026). |
| **"Meta begins charging for WhatsApp service messages in India, 1 Oct 2026"** | Round one | False — that change applies to nine *other* markets, not India (Source: Meta BSP pricing notice, 2026). |
| **52.7× model-cost spread as an absolute per-employee cost** | §13 | The *ratio* is load-bearing (survives FX, EV-089). The *absolute* ₹0.15–3.27 PEPM figures derive from an unvalidated 23,675-in / 2,045-out token estimate — placeholders until V-04 (EV-008, §13). |
| **"Frappe HR ships PT across 15+ states and LWF across 14, free"** | Earlier rounds, citing Frappe v16 release material | False at source: no Indian state name, PT slab table or LWF anywhere in the Frappe v16 tree (EV-031, EV-K12). The conclusion it drove — "multi-state PT/LWF is not a differentiator" — is **[Reversed]** (AR-3, §20.5): multi-state PT/LWF is greenfield in both incumbents (EV-031, EV-032). |
| **"93–99% inference gross margin"** / "bundling AI free never threatens margin" | Round-two AI economics (r2/03) | **[Killed]** — withdrawn (EV-K13). Inference is the smallest of four COGS lines; supervised filing dominates and is unsized (EV-088). Quote the four-line stack and the 52.7× ratio instead (§13.1). |
| **Any single-figure PEPM price ceiling** (e.g. "₹45–50 PEPM at 50 employees") | Earlier pricing draft — one vendor (greytHR ₹2,495 ÷ 50) generalised (r5) | Killed (EV-K20). The structure has two anchors: a value floor near ₹50 PEPM (Qandle, greytHR at 50 employees) and a mid-market clearing band of ₹80–200 (Zimyo, HROne, Keka) (EV-027). Our ₹80–150 target sits inside the band and is **[Hypothesis]** (§18). |
| **"144 OT hours per quarter" as a verified cap, or as a blocking rule** | Secondary summaries only | Never confirmed against gazette text; may sit in the OSH rules rather than the Wages rules (EV-012, EV-K15). **[Hypothesis]** — the product may warn on it, never block; validation V-17. |
| **greytHR "34,000 customers" as a fixed figure** | Earlier capture | **[Killed]** as a fixed figure: greytHR currently claims "30,000+ companies" (EV-091, EV-K27). Any share figure built on a vendor count carries its capture date (qualifier table below). |
| **"Payroll Plus ₹5,999" Tally payroll add-on** | Earlier Tally add-on reading | Sold on a lookalike domain; unusable as evidence. A search of five TDL add-on catalogues found **no** payroll, PT or LWF add-on (EV-032, EV-K31). |


**How a ban is lifted.** Bans are permanent by default and lifted by protocol, not by fatigue. Three steps, and the Keka lift is the only one this document has run. (1) **Show that the reason for the ban has failed**, not that the figure has become convenient — Keka's ban rested on the premise that the price was unobtainable, and a raw fetch with a comment-node scan disproved the premise directly (EV-K21). (2) **Replace the ban with the correct figures and their qualifiers**, so the register loses a row and gains the arithmetic that supersedes it — in this case three commented-out spans, an archived block card, a live floor, and the PEPM arithmetic at a stated headcount (EV-021 to EV-023, EV-027). (3) **State the scope of the lift explicitly** — which figures the lift covers and which stay banned; "~₹99 as Keka's price point" stays banned (the §20.4 row above, with the arithmetic under *Worked arithmetic*). A lift recorded without step 3 quietly re-admits everything the ban was protecting against.
#### Entities to remove from the competitive set

| Entity | Correction |
| --- | --- |
| **Alight** | Sold its payroll business to H.I.G. Capital in July 2024; now positions solely around benefits administration. Remove from the payroll competitive set (Source: H.I.G. Capital transaction, Jul 2024). |
| **Ascent HR** | Wrongly inferred to have exited on a DNS lookup of a *mistyped* domain. It trades normally. Do not list as defunct (Source: corrected domain check). |

#### Numbers that are correct but routinely misread — use these, with the qualifier attached

These are not banned; they are *load-bearing but easy to strip of their qualifier*. Ship them only with the qualifier, or they become the next banned figure.

| Figure | The qualifier that must travel with it |
| --- | --- |
| **7,66,254 contributing establishments (31.03.2024)** | This is *contributing*, not registered; it is the denominator, and it must always be labelled as such (§04, standing rule §20.12). |
| **greytHR "30,000+ companies" ≈ 3.9% of contributing establishments** | Capture-dated (Sep 2026, EV-091; an earlier capture read 34,000, giving 4.4% — EV-K27). It is a *ceiling on any share assumption*, computed against contributing establishments — not a beachhead we can assume to reach (EV-016, §04). |
| **₹52 / ₹126 PEPM** | Two realised data points (greytHR SMB, PeopleStrong enterprise), both biased *downward* because platform users exceed billed seats — a shape, not a level, not validated, and not the list anchors (EV-027) (§18, V-03). |
| **Keka: ₹90 / ₹120 / ₹150 per additional employee; ₹9,999 / ₹12,999 / ₹15,999 per month up to 100; "from ₹6,999 per month"; ₹139.98 or ₹199.98 PEPM at 50** | Say which card. The per-employee spans are commented out of the live pricing page's raw HTML (capture 5 Sep 2026, EV-021); the block prices are the withdrawn Aug 2024 card (EV-022); ₹6,999 is the live small-business floor (EV-023); the 50-employee PEPM is arithmetic on one of them (EV-027). The setup fee is unquantified and contradicted across two live pages; renewal fees are "subject to an increase" (ToS clause 15) — never say Keka renews below list (EV-025, EV-K28). Realised price is unknown (V-03). |

**Twin figures — the correct number and the banned one it is mistaken for.** Most re-entries of a banned figure are not acts of carelessness about the ban; they are confusions between two numbers that describe almost the same thing. The pairs below are the ones that have actually been confused, with the question that separates them.

| Use this | Not this | The question that separates them |
| --- | --- | --- |
| 7,66,254 **contributing** establishments (31.03.2024) | 24,18,266 registered establishments | Is this a code that files, or a code that exists? Two-thirds are dormant |
| 41,881 contributing above 200 employees | 173,250 registered above 200 accounts | Same question, one band up — and the 4.14× gap is where a model hides a 4× error |
| ₹10,905 Cr at a 10% CAGR | ₹12,250 Cr | Was the ceiling recomputed, or carried from the round-one table? |
| ₹2,233 per life per year | ₹10,000–25,000 per life | Is this the regulator's whole-market arithmetic, or a vendor's per-policy claim? |
| ₹94.43/USD (4 Sep 2026) | ₹83.3/USD | Which capture date? A 13.4% error compounds through every USD-denominated line |
| The 52.7× spread | ₹0.15–3.27 PEPM | Is it a ratio or an absolute? Ratios survive FX and token-estimate errors; absolutes do not |
| ₹139.98 PEPM at 50 (live ₹6,999 floor) | ~₹99 "Keka's price point" | Which card, and is it live or archived? ₹199.98 is the archived card's arithmetic at the same headcount |
| greytHR "30,000+ companies", capture-dated | 34,000 customers | Which capture, and does the share figure carry its date? |
| ₹49.90 PEPM list at 50 | ₹124.75 effective PEPM at 20 | Is this the published rate or the rate after the 50-seat block? The multiplier is 50 ÷ N |
| The value floor near ₹50 and the band ₹80–200 | A single-figure ceiling | Is this two anchors or one? One vendor generalised is how the ceiling was set too low |

#### Worked arithmetic — why several of these are not close calls

The banned numbers are not "slightly optimistic"; several are wrong by one to two orders of magnitude, and the arithmetic is worth showing once so the correction is memorable and never re-litigated.

- **6 crore MSMEs vs the real denominator.** Udyam has 5.31 Cr registrations. EPFO shows **7,66,254 contributing establishments** as on 31.03.2024. Using Udyam as the employer denominator overstates the payroll-obligated base by 5,31,00,000 ÷ 7,66,254 ≈ **69×**. Even against the (also-wrong) *registered* EPFO figure of 24,18,266, Udyam still overstates ~22×. There is no reading of "MSME count" that makes it a payroll TAM.
- **Registered vs contributing establishments.** 24,18,266 registered ÷ 7,66,254 contributing = **3.16×**. Two-thirds of registered PF codes are dormant. Any TAM, share claim, or "named accounts" target built on registered codes is inflated ~3× before any other error compounds.
- **The 200+ band gap.** 173,250 registered establishments above 200 accounts vs 41,881 contributing above 200 employees = **4.14×**. The "~41,000 named accounts" target quietly used the *contributing* figure while the surrounding sizing used *registered* — mixing the two inside one model is how a 4× error hides in plain sight.
- **The CAGR ceiling overstatement.** The round-one 10% CAGR ceiling was ₹12,250 Cr; the recomputed figure is ₹10,905 Cr. Overstatement = (12,250 − 10,905) ÷ 10,905 = **12.3%**. Small next to the others, but it sat at the *top* of a sensitivity table — the number a reader anchors on — so it flattered the entire range.
- **Group health per life.** IRDAI: ₹61,435 Cr ÷ 275mn lives = **₹2,233 per life per year**. Vendor claims of ₹10,000–25,000 overstate by **4.5×–11×**. An attach model built on the vendor figure would show 4–11× the real revenue per life.
- **The Zaggle attach denominator.** The ₹161 PEPM "money movement per employee" divided Zaggle's money movement by a user count that *includes channel partners and customers-of-customers* — inflating the denominator's relevance while the numerator measured whole-company flows, not per-employee HRMS value. Both ends are contaminated; the number is unrecoverable, not adjustable.

The pattern across all six is the one §02.3 warns about: each error made the market look **bigger, richer, or closer** than it is. None of these six went the other way. That is the signature of the generator's optimism bias, and it is why surviving *business-case* hypotheses — market size, denominator, timing, our own price — carry a downward haircut by default. **[Reversed] in part:** the haircut has no safe direction for competitor-capability and competitor-price claims, where rounds three to five found round two's pessimistic corrections partly wrong (EV-K12, EV-K20, EV-K21); those are re-checked at source instead (§02.3).

**Three further pieces of arithmetic — the ones that *lift* a ban, or explain why a ban is narrower than it looks.** The six above all point one way. These three do not, and they are shown because a register that only ever subtracts teaches people to distrust it.

- **The FX error, and why one figure survived it.** The round-one conversion rate was ₹83.30/USD against the ₹94.43 captured on 4 Sep 2026 (EV-089): (94.43 − 83.30) ÷ 83.30 = **13.4%**, so every USD-denominated cost in round one was understated by that much. But the 52.7× model-choice spread is a **ratio of two costs converted at the same rate**, so the rate cancels: 52.7× at ₹83.30, 52.7× at ₹94.43, and 52.7× at the ₹100 stress case in §13. This is the exact reason the register bans the *absolute* ₹0.15–3.27 PEPM figures (placeholders on an unvalidated token estimate, EV-008) while keeping the ratio as load-bearing evidence. The test for whether a number survives an input error is mechanical: does the erroneous input appear on both sides of the expression?
- **Why Keka is unbanned but "~₹99" is not.** The ban was lifted because the evidence was obtainable all along — a raw fetch reads three commented-out price spans a rendered read cannot see (EV-021, EV-K21). What replaced it is arithmetic with a stated card: the live small-business floor of ₹6,999/month gives ₹6,999 ÷ 50 = **₹139.98 PEPM** at 50 employees, and the withdrawn August 2024 FOUNDATION block of ₹9,999 up to 100 gives ₹9,999 ÷ 50 = **₹199.98 PEPM** (EV-022, EV-023, EV-027). Both sit inside the ₹80–200 mid-market band, the second at its top edge. The widely-cited "~₹99 Keka price point" matches none of Keka's own published figures — not ₹90, ₹120 or ₹150 per additional employee, not ₹6,999, not ₹9,999 — which is why the *vendor* is unbanned and the *figure* stays banned. Unbanning a source is not unbanning every number ever attributed to it.
- **The seat floor is a multiplier, not a price.** Six of six priced competitors impose a 50-employee minimum billing block (EV-026), so below 50 the effective rate is the list rate scaled by 50 ÷ N. greytHR's ₹49.90 base buys 50 seats for ₹2,495/month; at 20 employees that is ₹2,495 ÷ 20 = **₹124.75 PEPM**, or ₹124.75 × 20 × 12 = **₹29,940 ACV** (EV-027). Qandle's ₹49.00 gives ₹2,450 ÷ 20 = **₹122.50**; Keka's ₹6,999 floor gives ₹6,999 ÷ 20 = **₹349.95** (EV-027). The multiplier is exactly 50 ÷ N — **2.5×** at 20 employees, 1.67× at 30, 1.25× at 40, and 1.0× at 50 and above. Nothing here is banned; it is recorded because it is the one piece of competitive arithmetic where the *published* figures and the *effective* figures diverge by a factor a reader can compute, and quoting the published one at a sub-50 headcount is how a correct number becomes a wrong claim.
- **The Frappe claim is not an overstatement — it is a different claim.** The other bans have a multiple attached: 69×, 3.16×, 4.14×, 12.3%, 4.5–11×. "Frappe HR ships PT across 15+ states and LWF across 14" has none, because the observed count in the v16 tree is **zero states and zero LWF rules**, across three files and 549 lines overriding three functions (EV-031). A ratio against zero is undefined, and that is the finding: this was not an optimistic reading of a real capability, it was a claim about a codebase that does not contain it. Bans of this shape cannot be repaired by a haircut, and they are the reason competitor-capability claims carry no safe correction direction (§20.12 rule 5).

<!-- DIAGRAM: nongoals-validation-risk-retraction-direction -->

#### The banned-number register as a shipped control

Standing rule 6 (§20.12) states that a banned number appearing anywhere invalidates the artefact until removed, and that this is a fail-closed check rather than a review comment. A rule of that shape is only real if someone can execute it on a Friday afternoon against a forty-slide deck without re-reading this PRD. The register is therefore specified as a machine-readable artefact with a defined record, defined match semantics, a defined scan scope and a test corpus — the same treatment a statutory validator gets (§08 error taxonomy), for the same reason: the cost of a miss is external.

**The banned-figure record.**

| Field | Type | Rule |
| --- | --- | --- |
| `id` | `BN-<n>` | One per row of the §20.4 table. Immutable; a lifted ban is marked lifted and keeps its id (the Keka ban, EV-K21, is the worked case). |
| `canonical_value` | Number, range, or a claim string | Ranges are stored as ranges, because the midpoint of a banned range is banned (the ₹10,000–25,000 per-life claim and "about ₹17,500" are the same error). |
| `variants` | List | Every representation the same figure can take: Indian and Western digit grouping, unit words versus digits, currency symbol versus `Rs` versus `INR`, percentage forms, and the figure with no separators at all — chart axes and CSV exports are where the last one hides. |
| `derived_forms` | Rule, not a list | A figure computed *from* a banned base is banned even when the banned number never appears. A market size derived from Udyam registrations is banned whatever its own value is. |
| `reason` | One sentence | Why it is false or structurally contaminated — carried so it is not re-derived by someone who never saw the retraction. |
| `replacement` | The correct figure, with its qualifier | Every ban names what to say instead, or says explicitly that the figure is unrecoverable rather than adjustable (the Zaggle attach denominator is the only one of that class). |
| `evidence` | EV id or dated source | The row that kills it. A ban with no evidence is an opinion and does not belong in a fail-closed check. |
| `status` | `banned` · `lifted` · `qualifier-required` | `qualifier-required` covers the four figures in the qualifier table: correct, load-bearing, and dangerous only when stripped. |
| `scope` | Artefact classes | Held as `banned_number_scan_artefact_classes` (§20.13) — financial models, decks, website and marketplace copy, contracts and SLAs, RFP and security-questionnaire answers, investor updates, sales email templates, and code fixtures and seed data. |

**Match semantics.** Three kinds of match, because exact-string matching would catch the least dangerous case and miss the other two.

1. **Exact.** The canonical value or any registered variant appears. Verdict: fail, unless the occurrence is inside a correction context (§20.4, §20.5, the §02 evidence register, or an artefact explicitly teaching the ban), in which case the ban must be stated in the same breath.
2. **Near-miss.** The figure sits within `banned_number_near_miss_tolerance_pct` of a banned value (§20.13; owner decision, set before the first external artefact ships). Verdict: not an automatic fail, but the author must name the primary source and its date and show the derivation. Near-misses are how a banned figure returns after a round of rewording — ₹12,000 Cr is not ₹12,250 Cr, and it is also not ₹10,905 Cr.
3. **Derived.** The figure's derivation chain touches a banned base, a banned rate or a banned denominator. Verdict: fail on the chain, not on the value. This is the only match type that needs the author's working rather than the artefact's text, which is why every model carries its derivation.

**Test corpus.** The scan is accepted when it returns the expected verdict on every row below. Each row is a fragment as it would appear in a real artefact; none is a hypothetical number, and each cites the register row it exercises.

| # | Fragment under test | Expected | Why |
| --- | --- | --- | --- |
| TC-01 | "Addressable base: 5.31 Cr Udyam registrations" | **FAIL** | Banned base; MSME registrations are not employers with payroll obligations. |
| TC-02 | "6,00,00,000 MSMEs in India" | **FAIL** | Indian-grouping variant of the banned 6 crore figure. |
| TC-03 | "60 million small businesses" | **FAIL** | Unit-translated variant of the same figure. |
| TC-04 | "24,18,266 registered establishments" | **FAIL** | Banned as an addressable base; use contributing. |
| TC-05 | "2,418,266 establishments" | **FAIL** | Western-grouping variant of the same banned figure. |
| TC-06 | "7,66,254 establishments" | **FAIL** | The figure is correct; the artefact violates standing rule 7 by not saying *contributing*. A correct number with a stripped qualifier is the next banned figure. |
| TC-07 | "7,66,254 **contributing** establishments as on 31.03.2024" | **PASS** | Qualifier travels with the figure. |
| TC-08 | "₹12,250 Cr at a 10% CAGR" | **FAIL** | Overstated by 12.3%; banned. |
| TC-09 | "₹10,905 Cr at a 10% CAGR (recomputed, §04)" | **PASS** | The replacement figure with its source. |
| TC-10 | "roughly ₹12,000 Cr at a 10% CAGR" | **NEAR-MISS** | Within tolerance of a banned value; author must show the derivation or the fragment fails. |
| TC-11 | "about ₹17,500 per life per year" | **FAIL** | Midpoint of the banned ₹10,000–25,000 range — the same error wearing a different number. |
| TC-12 | "₹2,233 per life per year (IRDAI: ₹61,435 Cr ÷ 275mn lives)" | **PASS** | Replacement figure with its derivation. |
| TC-13 | "at ₹83.3 to the dollar" | **FAIL** | Banned conversion rate; understates every USD cost by 13.4%. |
| TC-14 | "USD/INR ₹94.43 (4 Sep 2026), stressed at 90/95/100" | **PASS** | Captured rate with its date and the stress range. |
| TC-15 | "a 52.7× spread between model choices on an identical workload" | **PASS** | A ratio, FX-invariant, load-bearing (EV-089). |
| TC-16 | "inference costs ₹0.15–3.27 per employee-month" | **FAIL** | Absolute placeholders presented as fact; standing rule 4. |
| TC-17 | "₹0.15–3.27 PEPM **[Hypothesis]** — placeholder on an unvalidated token estimate, pending V-04 (EV-008)" | **PASS** | Labelled, with its validation id and its evidence. |
| TC-18 | "93% gross margin on inference" | **FAIL** | Withdrawn claim; inference is the smallest of four COGS lines (EV-088). |
| TC-19 | "Keka charges around ₹99 per employee per month" | **FAIL** | Matches none of Keka's own published figures; the figure stays banned although the vendor does not. |
| TC-20 | "Keka's live small-companies page: from ₹6,999/month — ₹139.98 PEPM at 50 employees (EV-023, EV-027; capture 5 Sep 2026)" | **PASS** | Says which card, carries the capture date, states the arithmetic. |
| TC-21 | "Frappe HR ships professional tax for 15+ states out of the box" | **FAIL** | False at source: zero Indian state names in the v16 tree (EV-031). |
| TC-22 | "greytHR has 34,000 customers" | **FAIL** | Superseded capture; the current claim is "30,000+ companies" and any share figure carries its capture date (EV-091). |
| TC-23 | "the statutory cap is 144 overtime hours per quarter, so the roster is blocked" | **FAIL** | Twice: an unverified figure stated as law, and a blocking rule the product may never ship (K-04). |
| TC-24 | "warns at `ot_quarterly_ceiling_hours` **[Hypothesis]**, never blocks (V-17)" | **PASS** | Parameterised, labelled, warn-only. |
| TC-25 | "Tally's Payroll Plus add-on at ₹5,999" | **FAIL** | Sold on a lookalike domain; unusable as evidence (EV-032). |
| TC-26 | A chart axis labelled `2418266` | **FAIL** | Separator-free numeral form; the variant that survives a text search of the slide body. |
| TC-27 | "our price ceiling is ₹45–50 PEPM at 50 employees" | **FAIL** | Single-figure ceiling generalised from one vendor (EV-K20). |
| TC-28 | "a value floor near ₹50 and a clearing band of ₹80–200 (EV-027); our ₹80–150 target is **[Hypothesis]** pending V-03" | **PASS** | Two-anchor structure with the hypothesis labelled. |
| TC-29 | "$400 per seat for EOR" / "$300 per seat (2022)" | **FAIL** | Both banned — the first fabricated, the second carrying a provenance defect. |
| TC-30 | "85% of attendance devices integrate successfully" | **FAIL** | Vendor marketing from the party selling the integration fix; device effort is currently unsized. |

**Negative cases — where a banned figure may legitimately appear.** Three, and only three: inside §20.4 and §20.5 themselves; inside §02's evidence register as the killed row; and inside a deliberately-failing test fixture whose expected verdict is FAIL. In each case the ban must be stated in the same artefact — a banned figure quoted without its ban is not teaching, it is reintroducing. An archived artefact is not a fourth case: superseded decks are marked superseded and withdrawn from circulation rather than exempted, because the failure mode is a slide extracted from an old deck into a new one.

**The control's own failure mode.** An artefact can pass every check above and still be wrong, in exactly two ways, and both are on the reviewer rather than the scanner. The first is a stripped qualifier on a figure the register calls correct (TC-06 is the canonical case, and the qualifier table in §20.4 lists all four). The second is a *new* optimistic figure the register has never seen — the generator that produced roughly ninety one-directional errors is still capable of producing the ninety-first, and a scanner only knows what has already been caught. The register is a floor, not a ceiling, which is why standing rules 1, 4, 5 and 7 apply to every number whether or not it is listed here, and why §20.16's integrity checks run against the registers themselves rather than only against artefacts.

<!-- DIAGRAM: nongoals-validation-risk-banned-number-gate -->

---

### 20.5 Killed strategic conclusions — claims, not numbers

Round one produced a confident narrative that round two largely dismantled; **28 named strategic conclusions were killed outright.** Rounds three to five then reversed one of those kills (multi-state PT/LWF, below) and killed or reversed further conclusions this PRD had carried (the last five rows, plus the appointment-letter correction inside the sub-20 row; the corrections-ledger kills are registered at EV-K12–EV-K36 in §02, and the Telangana reversal sits inside EV-014). The numeric casualties are in §20.4. The *conclusions* below are banned as reasoning, because each was believed, acted on in a draft, and disproven — and each will otherwise be re-derived by anyone who re-runs the optimistic generator.

| Killed conclusion | What replaced it |
| --- | --- |
| "AI-first is the price story / revenue thesis." | AI is COGS and an acquisition weapon; maintained, attended statutory filing is the revenue thesis (§18 monetisation; priced in §13). |
| "The 20–50 band is a competitive vacuum." | Served by cheap payroll-only product, structurally overcharged by the 50-seat floor of every priced HRMS vendor (EV-026), under-served by product that delivers a portal-accepted artefact and completes attended submission under the employer's written authority (AR-1). |
| "The Labour Code rules are still draft, therefore urgent." | Rules notified 8 May 2026; build against a settled spec (AR-7). |
| "The November 2026 EPF cliff removes 12% PF." | EPF re-notified 12% retrospectively via S.O. 3582(E); EPF side has a named successor (Scheme 2026). *ESI side remains unresolved* (§20.8 R-2). This was reversed by a corrigendum round one missed. |
| "Sub-20 companies have no obligation worth software." | TDS on salary (s.392, ex-s.192), the POSH Internal Committee (EV-056) and minimum wages bind regardless of headcount; ESI, gratuity, maternity benefit and the prescribed-format appointment letter bind from ten (§06.1). **[Reversed]** — earlier text put the appointment letter "from employee one"; OSH Code s.6(1)(f) attaches it to an establishment of 10+ workers, in a state-prescribed form (EV-057, EV-K29). |
| "Free investment-declaration workflow is our P0 differentiator." | Zoho's free tier already has it (AR-4). |
| ~~"Multi-state PT/LWF is a differentiator."~~ **[Reversed] — the kill was wrong; the conclusion stands.** | The kill rested on "Frappe v16 ships PT across 15+ states and LWF across 14", false at source (EV-031); TallyPrime has no state PT slab table and no LWF engine (EV-032). Multi-state PT/LWF is greenfield in both incumbents (AR-3), contingent on the gazette-sourced dataset (V-09). |
| "Residency is a general-market differentiator." | It is a *segment-specific procurement gate* for regulated buyers, not a broad differentiator (§13, §17). |
| "An MCP server is a defensible moat." | We are not aware of any evidence, as of September 2026, that it moved a decision; own data and tools, not the assistant (NG-16, AR-2). |
| "India HR-tech is a $23–38bn market." | Real India HRMS software spend is ₹2,100–3,900 Cr (§04). |
| "Ship recruiting with Resdex-class candidate search." | Inbound only; Resdex is unlicensable (NG-9). |
| "Attendance is an edge feature." | ADMS/WDMS push receiver is the best-evidenced call in the corpus and a deal-gate in mid-market (§09). |
| "Bundling AI free never threatens margin — inference is 93–99% gross margin." | **[Killed]** — withdrawn: inference is the smallest of four COGS lines; supervised filing dominates and is unsized (EV-088, EV-K13; AR-5). |
| "We file for you" — filing-as-a-service implying automated submission. | Every statutory surface is an attended portal; the deliverable is a portal-accepted artefact plus attended, assisted submission under written authority to act; the employer's and deductor's liability is non-delegable; legality under counsel review (EV-030, EV-035–EV-038, EV-K24; §22, §23). |
| "Tally is the incumbent." | Two incumbents, two jobs: Tally owns accounting and the statutory artefacts, greytHR the HRMS job; Tally payroll adoption is unknown (EV-032, EV-K34; V-02). |
| "Telangana PT is the one state slab already verified." | **[Reversed]** — only Telangana's employer-registration wording was verified. The states read at primary source are Maharashtra and Odisha, with Karnataka's effect read on the state portal (EV-014); Telangana's slab sits in the undone dataset (EV-015, V-09). |
| "DPDP s.7(i) means no employee consent is needed" (as current law). | Not in force until on or about 13 May 2027; today SPDI r.5(1) requires written consent before collecting biometric or financial data; on commencement s.7(i) disapplies consent and notice for employment purposes only, not the s.8 duties (EV-058, EV-060, EV-K14; §23). |

**Standing rule on this table:** any medium- or low-confidence *business-case* conclusion surviving in this document came from the same generator that produced roughly ninety one-directional errors in rounds one and two (the Draft 1 count; the round-two critic's tally is roughly sixty, §02.3), and must be haircut downward accordingly; competitor-capability and competitor-price conclusions have no safe haircut direction and are re-checked at source (§02.3). The Killed list is not exhaustive of the bias — it is the part we caught.

---

### 20.6 Validation plan — what must be answered before funding

Five rounds of desk research (r1–r5) answered much of what desk research can — and round five showed that one item earlier graded desk-impossible (Keka pricing) was a fetch-tool failure, not a property of the source (EV-K21). The commercial questions below cannot be answered from a desk; the statutory, portal and counsel ones (V-08, V-09, V-17–V-25, V-27) can, and start now — the split table after the main table assigns every item to its track. **Funding or headcount decisions must gate on this programme, not on this document.** Every **[Hypothesis]** in the PRD appears here with a named method, an owner, an estimated cost and timeline, a **before-funding gate**, and an explicit kill criterion. A hypothesis without a kill criterion is not a hypothesis; it is a wish.

| # | Question (hypothesis under test) | Method | Owner | Cost / time | Gate | Kill criterion |
| --- | --- | --- | --- | --- | --- | --- |
| **V-01** | What does a CA/bureau actually charge to run monthly payroll for 20, 50, 100 people, across Class A and Class B cities? | Mystery-shop 6–8 CAs/bureaus across two city tiers; capture quotes, inclusions, filing scope | Founder / GTM | ₹0–50k · 3–4 wk | The entire pricing model (§18) | If the real all-in price with filing is under ₹2,000/month at 50 employees, our ₹80–150 PEPM target collapses and pricing is rebuilt (the list anchors — value floor near ₹50, band ₹80–200 — are verified, EV-027; our realised price is not) |
| **V-02** | What share of Tally's ~2.5m businesses actually *enable* the payroll module? (The base is Tally's own "2.5+ million businesses worldwide" claim, not an India count — r2/05) | 15–25 Tally-partner interviews + a buyer survey | GTM | ₹0–1L · 4–6 wk | How large Tally's payroll job is — two incumbents, two jobs: Tally owns accounting and the statutory artefacts, greytHR the HRMS job (EV-032, EV-K34) — and the Tally-import wedge (§16, §18) | At ~5% enablement Tally's payroll job is marginal and the Tally channel shrinks to accounting export; at ~40% Tally payroll is the dominant displacement target and positioning is rebuilt around it |
| **V-03** | Realised ARPU vs list price, and the discounting behaviour behind it | Buyer + reseller interviews; won-deal figures from any accessible source | Founder | ₹0 · 4–8 wk | Every margin conclusion in §13 and the pricing target in §18 | If realised is 30–40% below list, every line of the four-line COGS stack takes a larger share of revenue (EV-088) and the ₹80–150 target re-bases toward the ~₹50 value floor (EV-027) |
| **V-04** | Real tokens-per-query for HR agents against real policy corpora | Instrument a prototype on a representative policy corpus before committing any price | Eng | 2–3 eng-wk (prototype only — allowed under the PRD-only constraint as an explicit de-risk) | All *absolute* AI cost figures (§13) | If actual is 5× the estimate, bundling AI free stops working at the low end |
| **V-05** | Will CAs act as a channel, and on what economics? | 20–30 practising-CA interviews across both city tiers | Founder / GTM | ₹0 · 6–8 wk | The primary GTM motion (§18) | If CAs see us as disintermediation, the channel inverts into an opponent |
| **V-06** | Keka + the mid-market tier (ZingHR, Zimyo, HROne, Qandle, Pocket HRMS, Ramco): INR tiers, seat minimums, AI posture | **Closed 5 Sep 2026.** Raw fetch with comment-node scan, rendered read, and the vendor's own pricing config where prices are JS-injected (r5). **[Reversed]** — the earlier "different network / TLS-blocked" method rested on one tool's failure (EV-K21) | Research | Spent | §04 competitive sizing, §18 positioning, §21 | Result: Keka captured (EV-021–EV-025); six-vendor PEPM table (EV-027); 50-seat floor in six of six (EV-026); payroll in the entry tier (EV-028); AI posture as claim-posture only (EV-090); ZingHR publishes no price and Ramco/ZingHR are enterprise adjacency (EV-033). Residuals: seat count inside Keka's ₹6,999 block and its setup fee (EV-025); realised prices → V-03 |
| **V-07** | Will Indian buyers pay anything for HR AI, and for which agent? | Van Westendorp or conjoint, 30–40 buyers across 20–200 and 200–1,000 | GTM | ₹1–3L · 6–10 wk | §18.5 metered-AI monetisation | If willingness is genuinely zero everywhere, drop the metered AI SKUs entirely and keep AI fully bundled |
| **V-08** | What does the ESI regime become on/after 22 November 2026? | Primary-source watch on ESIC + MoLE notifications; check for corrigenda | Statutory | ₹0 · continuous | Payroll-engine correctness (§06, §08) | **Time-critical.** No answer by ~1 Nov 2026 = escalate to R-2 contingency |
| **V-09** | Gazette-sourced PT + LWF dataset for *every* state (levy y/n, slabs, gender variants, periodicity, registration, filing frequency, effective dates) | Primary-source compilation from state gazettes and state-department schedules. Done so far: Maharashtra and Odisha PT read verbatim; Karnataka's effect read on the state portal, instrument DPAL 08 SHASANA 2025 not retrieved; Odisha's "last month" undefined and a reported repeal ordinance unconfirmed (EV-014; §06.13). Not done: every other PT state (Telangana's slab included) and every LWF state (EV-015) | Statutory | ₹1–2L · 6–10 wk | Multi-state payroll correctness (§06, §08) — and the multi-state differentiator itself, greenfield in both incumbents (EV-031, EV-032) | Build dependency, not a go/no-go — but aggregator data is materially disputed and cannot be shipped; at least one widely-cited 2026 table reproduces a superseded structure |
| **V-10** | Realistic device-integration effort and mixed-fleet failure rate (replaces the banned 85–98%) | Hardware spike against a representative eSSL/ZKTeco fleet incl. pre-ADMS firmware | Eng | 2–4 eng-wk | Attendance roadmap sizing (§09) | If a material share of the target fleet needs the paid connector, budget the connector ($345 one-time / $588/yr) rather than in-house |
| **V-11** | Does the ADMS/WDMS outbound push path work with no middleware/static IP/port-forward across the target fleet? | Bench test the HTTP-POST punch-packet receiver against eSSL + ZKTeco | Eng | 1–2 eng-wk | The best-evidenced architectural call in the corpus (§09) | If outbound push fails on common firmware, the frontline attendance thesis needs middleware and the effort estimate changes |
| **V-12** | Meta/WhatsApp India per-message rate card — BSP aggregators disagree (marketing ₹0.8631 vs ₹0.95; utility ₹0.1150 vs ₹0.15), so the marketing-to-utility multiple is a 6.3–7.5× range, not a number; Meta publishes no India numerics in HTML (r2/04) | Download the actual rate card before committing any per-worker price | GTM | ₹0 · 1 wk | Any per-worker WhatsApp cost model (§09, §12) | If utility+marketing per-message cost exceeds the frontline PEPM headroom, redesign for worker-initiated only |
| **V-13** | Per-provider residency + in-country-inference matrix (data-at-rest vs inference are different guarantees) | Vendor-doc capture + written confirmation from OpenAI/Bedrock, Anthropic, Vertex, Sarvam | Eng / Legal | ₹0 · 2–3 wk | Regulated-segment eligibility (§13, §15, §17) | If fewer than three backends offer in-India inference *and* data-at-rest, regulated segments stay deferred longer |
| **V-14** | Realised inference cost per employee-month end-to-end (router + cache policy + rate limits live) | Instrument v1 with full token/cache/cost attribution per tenant/user/agent/model | Eng | Built into v1 | The inference line of the four-line COGS stack (EV-088, §13.1); the 93–99% margin claim is withdrawn (EV-K13) | If realised inference cost exceeds ~5% of ARPU at the low end, re-tier or degrade the bundled assistant |
| **V-15** | Does mid-year cutover actually carry YTD/TDS/certificate continuity without manual repair? | Dry-run migration on a design partner's real Tally + prior-payroll export, cut over at a mid-year month, tie out YTD taxable salary, TDS deducted and statutory contribution totals against the incumbent's — the inputs to Form 138 Annexure II and Form 130 (Parts A, B and C; TRACES-generated only — EV-047, EV-048) | Product / Eng | 2–3 wk + 1 partner | The migration surface (§16) and the churn thesis (R-28) | If a clean cutover needs material manual repair on the first real dataset, migration is a services cost, not a product — re-scope §16 and the onboarding model |
| **V-16** | What does "the filing completed on time" mean operationally, and what is the bureau's current baseline miss-rate? | Codify statutory due dates per filing type; interview 10–15 buyers on their bureau's actual late/rejected-filing incidence | Statutory / GTM | ₹0 · 3–4 wk | The SLA that *is* the product (§18, R-29) | If buyers report near-zero filing pain with their current bureau, the filing-SLA wedge is weaker than the thesis assumes and positioning is re-examined |
| **V-17** | Does a quarterly overtime-hours cap exist in the notified Central Rules, in which rule-set (Wages or OSH), and at what value? "144 OT hours per quarter" comes from secondary summaries only (EV-012, EV-K15) | Read the Code on Wages and OSH (Central) Rules gazette text of 8 May 2026 with a corrigendum check; then each target state's rules | Statutory | ₹0 (desk) · 1 wk | OT warnings in attendance and payroll (§09.6, §08) — the product warns, never blocks | If neither notified rule-set contains the cap, the 144 figure is deleted from every warning; if one does, it stays warn-only as an effective-dated, per-state parameter — it never becomes a block |
| **V-18** | Which Income-tax Rules 2026 provision grants the ₹200-per-meal tax-free perquisite, and are its conditions exactly as carried — meals during working hours at office/factory premises, or non-transferable vouchers usable only at eating outlets (EV-019, EV-K30)? | Read the Income-tax Rules 2026 text and the CBDT form/rule mapping, with a corrigendum check | Statutory | ₹0 (desk) · 1 wk | The meal component in the FBP wallet and the perquisite engine (§08, §11); any customer-facing citation | Until read, no rule number is cited and the figure stays **[Hypothesis]**; if the text's conditions differ from those carried, the engine constraints change before any tenant can enable the component |
| **V-19** | When do the Form 138 Q4 regular and correction formats publish — the dependency that also blocks Form 130 Part B generation (EV-046)? | Watch Protean's regular and correction download pages keyed on the Q4 anchors, never the client-side "Updated As On" footer; re-check on every statutory-watch cycle with a corrigendum check | Statutory / Eng | Desk, no spend · continuous until release | Unfencing the Q4 generator and Form 130 Part B generation (§05 fenced list; §08) | Not a go/no-go — the fence holds until release. No Q4 anchor at `form138_q4_escalation_date` = R-4's response fires |
| **V-20** | The Income-tax Act 2025 / Rules 2026 reads the engine needs before Tax Year 2026-27 TDS runs: the r.218 deposit dates; Tax Year 2026-27 slabs and rebate; the 2025-Act equivalents of 1961-Act provisions still cited (listed in §06.13); the Form 122 / 123 / 124 guidance notes | Read the Act and Rules text and the CBDT guidance notes with a corrigendum check; record both vocabularies (EV-050) | Statutory | Desk, no spend · before the first Tax Year 2026-27 TDS computation ships | TDS computation, the deposit calendar and the declaration and perquisite screens (§06.5, §08, §11) | A provision not located stays a parameter with no shipped default and a dated "unconfirmed" label; nothing is inferred from 1961-Act numbering |
| **V-21** | The Code-era labour mappings still open in §06.13: legacy ESI and EPF citations; the gratuity payable-ceiling notification under CoSS s.53(3); Code on Wages s.26 bonus ceilings, central and per state; the counting unit per statute; fixed-term gratuity at one year; the "4 years + 240 days" reading; the apprentice exclusion; handbook-level thresholds re-read against the 8 May 2026 Rules | Read the four Codes, their Central Rules and each target state's rules, with a corrigendum check | Statutory | Desk, no spend · per item, before the rule it drives is published through the §22 compliance data pipeline | Step-function alerts, gratuity and bonus computation (§06.1, §06.6, §06.7, §08) | An item not located stays a parameter with no default, and a computation resting on it routes to operator review, never auto-approval — e.g., a gratuity claim at exactly 4 years 240 days (§06.6) |
| **V-22** | Are successors to EPS 1995 and EDLI 1976 notified when the one-year saving lapses (~21.11.2026; EV-002)? Research names EPF Scheme 2026 as the EPF successor but no EPS or EDLI successor (§06.13) | Primary-source watch on EPFO and MoLE notifications alongside V-08, with a corrigendum check | Statutory | Desk, no spend · continuous, V-08's cadence | The EPS/EDLI split on every ECR line (§06.2, §08) | Joined to R-2: no successor located as the saving lapses = freeze to the last valid instrument with a dated banner and escalate; never guess a successor rate |
| **V-23** | The EPFO and ESIC portal facts no public document gives: ECR line terminator and encoding (`ecr.line_terminator`, `ecr.encoding`); the ECR error-file schema; the arrear-return layout (EV-043); EPFO sign-in controls; ESIC template columns, file type and DSC requirement (§06.13, §16, §22) | Capture inside an attended session on a design partner's registration under written authority (§22) — from a portal-accepted upload and from a real rejection | Statutory / Ops | Desk plus one partner session per portal · before the error-file importer or the arrear flow is specified | ECR generator encoding, the error-file importer, the fenced arrear flow, the ESIC runbook (§08, §16, §22) | Until captured, the arrear flow stays fenced (EV-043) and the error-file importer is not built; the generator carries the captured values as parameters, never assumed ones |
| **V-24** | What does EPF Scheme 2026 para 25 (Aadhaar, seeded bank account, PAN, UAN) actually say? It is reported only from a secondary reproduction (§06.13) | Read the gazette text of G.S.R. 525(E), 29.06.2026 | Statutory, then Legal | Desk, no spend · before the EPF onboarding flow is specified | The Aadhaar-optional behaviour on EPF flows (Part E-11; §07) | If the text makes Aadhaar a scheme requirement, the counsel question re-opens (§23); the exclude-and-flag default and the no-hard-block rule stand either way (Part D-10) |
| **V-25** | Attended-filing legality — the four Part D-17 questions: acting on government portals under employer credentials; whether each portal's terms of use permit third-party credential use; whether filing a TDS statement for a deductor engages the e-Return Intermediary route; handling the authorised signatory's personal DSC — plus liability allocation and insurability | A written counsel opinion per question, logged in the §23 counsel register; each portal's terms captured with URL and date | Legal (counsel) | Counsel fees, unsized · before attended submission launches on any portal | The attended-submission launch (§05 fenced list; §22) — statutory basis under counsel review | A portal counsel cannot clear ships artefact-only, with an employer-operated submission runbook; the deliverable never becomes "we file for you" (EV-K24). See R-32 |
| **V-26** | Supervised minutes per filing type, per registration, per mode — the dominant and unsized COGS line (EV-088; §22) | Time-and-motion capture on the first attended cycles, per portal and filing type, with exception rates and operator loaded cost | Ops / Finance | Built into the first attended cycles | Sizing `max_supervised_minutes_per_filing_cycle` and `target_supervised_cogs_share` (§13, §18, §22) and the registration cap or multi-registration line (§18) | If supervised cost per registration cycle exceeds what the registration cap or multi-registration line recovers at realised price (V-03), §20.11's unit-economics kill condition is reviewed |
| **V-27** | DPDP commencement and the consent-regime switch: whether the non-gazetted January 2026 proposal to compress to twelve months is gazetted, and for whom (EV-058); whether the SPDI Rules survive the omission of IT Act s.43A (Part D-12) | e-Gazette watch with a corrigendum check; pull G.S.R. 843(E) from the primary source, since it is mirror-sourced (EV-058); counsel opinion on survival (§23) | Legal | Desk, no spend; counsel fees unsized · continuous until ~May 2027 | The dual consent regime (Part E-6; §07, §14) and R-22 | A gazetted compression = R-22 fires. The dual-regime machinery must already be live, so nothing is built on the assumption that "on or about 13 May 2027" holds |
| **V-28** | The competitive open questions routed from §21.14 (CQ-01–CQ-20) | Desk and trial: CQ-03, CQ-05, CQ-07, CQ-09, CQ-10, CQ-13, CQ-15, CQ-16, CQ-17, CQ-18, CQ-19, CQ-20 (the Income-tax Act 2025 successor of Form 27A, if any — not in the CBDT mapping held, EV-050). Commercial (a sales quote or interview): CQ-01, CQ-02, CQ-04, CQ-06, CQ-11. CQ-08 is V-02; CQ-12 and CQ-14 are build and partnership decisions | Research (desk); GTM (commercial) | Desk items no spend; commercial items ride on the V-01 / V-03 conversations · CQ-05 first | What sales may say, importer priority and wedge size (§18, §21) — none blocks the v1 build | Per CQ, the "what changes" column of §21.14. CQ-05 is the only open item on EV-K12's evidence; if it shows statutory code, R-7's frame changes and the §21 parity rows move |
| **V-29** | Is the attended-filing operation **insurable**, on what terms, and at what exclusions? Part D-17 names liability allocation and insurability alongside the four legality questions, and V-25 answers only the legality half | Broker submissions describing the operation exactly as §22 specifies it — attended sessions on employer credentials under written authority, artefact-plus-assistance, non-delegable employer liability — and a read of the exclusions in each quotation returned | Founder / Finance, with Legal | Broker and counsel fees, unsized · elapsed set by the owner at pre-registration (§20.15) | The liability allocation behind the compliance SLA (§19) and the attended-submission launch pricing (§22) | If the operation is uninsurable at any premium, or every quotation excludes the acts that constitute attended submission, the SLA remedy cap is set on the balance sheet's tolerance rather than on cover — and NG-25 (no penalty indemnity) hardens from a decline into a constraint |
| **V-30** | How many statutory **registrations, states and legal entities** does a real 20–200 employer carry? Revenue scales per employee and the dominant cost scales per registration (EV-088), so the distribution of registrations per tenant is the single input that decides whether a per-employee price can carry a per-registration cost | Count registrations, work states and legal entities for every design partner and every buyer interviewed under V-01, V-03 and V-16 — a field added to those interview scripts rather than a separate study; corroborate against the establishment counts each tenant's own EPFO and ESIC logins expose during V-23 sessions | GTM, with Ops | No incremental spend — rides on the V-01 / V-03 / V-16 conversations · reports with them | `included_registrations_per_tenant` and `multi_registration_line_price` (§18, §20.13); the pricing-unit versus cost-unit mismatch worked in §13 | Not a go/no-go. If the distribution has a long tail — a material share of 20–200 employers carrying registrations far above the median — a flat per-employee price cannot stand and the registration line stops being optional. If the distribution is tight, the cap is a simple guard rail |
| **V-31** | Does the **50-employee minimum billing block bind in a negotiated deal**, or is it waived below 50? EV-026 is a finding about six published cards; whether a sales team honours it against a 20-person prospect is a different question, and it is the one the no-seat-floor wedge rests on | Request a written quote at 20 employees from two or three of the six priced vendors through their own published request path, capturing the quote verbatim with its date; cross-read against the unpriced sub-50 routes already noted (HROne's startup programme, greytHR's FLEXIBLE START) | GTM | No incremental spend · runs alongside V-01 | The no-seat-floor wedge (§18) and R-39's trigger | If floors are routinely waived on request, the wedge is a *list-structure* wedge rather than a price wedge and must be sold as billing transparency, not as a saving; if quotes come back at the block, the ₹124.75 and ₹349.95 effective PEPMs at 20 employees (EV-027) are real prices a buyer has been offered |
| **V-32** | Will an employer's **authorised signatory actually sign a written authority to act** on its statutory portals — and what must the wording contain for a CFO or a director to sign it? V-25 asks whether the route is lawful; this asks whether the buyer will execute it | Put the draft authority in front of the buyer during the V-01 and V-16 interviews and in the first design-partner onboarding; record refusals and the reason, and record every clause the signatory asks to change | Founder / GTM, with Legal | No incremental spend · rides on the commercial track and the first onboardings | Whether attended submission is operable at all in the beachhead, independently of whether it is lawful (§22) | If signatories will not execute an authority in any wording counsel can clear, attended submission has no commercial path in this segment and the product ships artefact-only — the same outcome as an adverse V-25, reached from the other side. Treat a pattern of refusals as a §20.11 review trigger, not a sales-training problem |
| **V-33** | What **remedy** does a buyer regard as meaningful under a compliance SLA, and does the remedy change willingness to pay? The SLA is the product (§19, R-10), and its remedy cap is currently a named parameter with no evidence behind it | Ask it inside the V-01 and V-16 interviews as a forced choice between remedy shapes at the same price, then re-ask at a higher price with the stronger remedy; never lead with a remedy we have not cleared with counsel (§23) | GTM, with Legal | No incremental spend · rides on the commercial track | `sla_remedy_cap_months` (§19, §20.13) and the pricing work at Gate 1 | Not a go/no-go. If no remedy shape moves willingness to pay, the SLA is bought as *assurance* rather than as *insurance*, the cap is set at the lowest defensible level, and the marketing emphasis moves to the measured on-time metric (§19) rather than to the remedy |
| **V-34** | Does a 20–200 buyer **distinguish a portal-accepted artefact from a completed submission**, and pay differently for the two? The wedge rests on a distinction that is obvious to us and may be invisible to the buyer — and both halves of it are things no vendor in the six-vendor set offers to do (EV-030) | Present both descriptions side by side inside the V-01 and V-16 interviews, in the buyer's own language and without naming which is ours; ask which they believe they buy today, which they would pay more for, and by how much | GTM | No incremental spend · rides on the commercial track | How the wedge is priced and positioned (§18, §21), and what sales may lead with | If buyers cannot distinguish the two, or will not pay differently, attended submission is an **operational** advantage rather than a pricing one: it reduces our support cost and the customer's failure rate, and §18 re-bases on maintenance quality, the measured on-time metric and no seat floor instead. It is never over-claimed to close the gap (EV-K24) |

#### Build-blocking desk work vs commercial validation

The table above mixes two kinds of work that must not wait on each other. **Desk work** needs no customer and no field budget; much of it blocks a specific build item and starts now. **Commercial validation** needs buyers, CAs or partners, gates money, and blocks no line of code. **Spikes** need a prototype or a live cycle and sit between the two. The split below assigns each item to one track and names what it blocks.

| Track | Item | What it blocks | Starts | Owner |
| --- | --- | --- | --- | --- |
| Desk — build-blocking | V-08 | ESI computation and filing for every period after the saving lapses (R-2) | Now; weekly from October 2026 | Statutory |
| Desk — build-blocking | V-09 | Every state's PT and LWF rules beyond Maharashtra, Odisha and Karnataka's effect; the multi-state differentiator | Now | Statutory |
| Desk — build-blocking | V-17 | The OT warning value (warn-only either way) | Now | Statutory |
| Desk — build-blocking | V-18 | The meal component and any rule-number citation | Now | Statutory |
| Desk — build-blocking | V-19 | The Q4 generator and Form 130 Part B (fenced) | Now; continuous | Statutory / Eng |
| Desk — build-blocking | V-20 | The Tax Year 2026-27 TDS run and deposit calendar | Now | Statutory |
| Desk — build-blocking | V-21 | Gratuity, bonus and step-function alerts resting on unmapped provisions | Now | Statutory |
| Desk — build-blocking | V-22 | The EPS/EDLI split after the saving lapses | Now; with V-08 | Statutory |
| Desk — build-blocking | V-23 | The arrear flow (fenced), the error-file importer, ECR encoding | On the first design-partner session | Statutory / Ops |
| Desk — build-blocking | V-24 | The EPF onboarding flow's Aadhaar handling | Now | Statutory / Legal |
| Desk — build-blocking (counsel) | V-25 | Attended submission, per portal | Now | Legal |
| Desk — watch | V-27 | Nothing new — it confirms the dual consent regime is timed right | Now; continuous | Legal |
| Desk — watch | V-12, V-13 | Any per-worker WhatsApp price; regulated-segment eligibility | Now | GTM; Eng / Legal |
| Desk and commercial | V-28 | Sales claims and importer priority; never the v1 build | Now (desk CQs) | Research; GTM |
| Spike | V-04, V-10, V-11, V-15 | Absolute AI cost; device roadmap; the ADMS path; migration as product or service | On founder sign-off (PRD-only constraint) | Eng / Product |
| Spike — live | V-14, V-26 | Inference and supervised-filing cost lines, and the prices sized on them | First paying cycles | Eng; Ops / Finance |
| Commercial | V-01, V-02, V-03, V-05, V-16 | Gate 1: pricing, channel, the SLA wedge — funding, not code | When interviews are scheduled | Founder / GTM |
| Commercial | V-07 | Metered AI SKUs only | After Gate 1 | GTM |
| Desk — build-blocking (counsel) | V-29 | The liability allocation behind the SLA and the attended-submission launch pricing; nothing in the engine | Now, with V-25 | Founder / Finance |
| Commercial — rides on Gate 1 | V-30, V-31, V-32, V-33, V-34 | The registration line, the no-seat-floor claim, the authority-to-act flow and the SLA remedy cap — all pricing and packaging, no code | With the V-01 / V-03 / V-16 interviews | GTM |
| Closed | V-06 | — (closed 5 Sep 2026) | — | Research |

**Rule:** a desk item marked build-blocking is on the build's critical path, not the funding path. A slipped desk item is escalated through §05's fenced list (the blocked item stays fenced), never waived to keep a release date; a slipped commercial item delays money and headcount, never code already justified by desk evidence.

#### Field-research protocols — enough specificity that the study cannot be argued into the answer someone wanted

**V-01 mystery-shop protocol.** Contact 6–8 practising CAs/bureaus (4 in a Class A metro — Mumbai/Bengaluru/Delhi; 4 in a Class B city — Indore/Coimbatore/Jaipur) posing as a real 20/50/100-employee employer. Ask a *fixed script*: monthly fee at each headcount; whether the fee **includes filing** (ECR generation + upload, ESI challan, PT return, quarterly 24Q/Form 138) or only computation; setup/onboarding fee; who is liable for a late or rejected filing; per-payslip vs flat pricing; treatment of arrears/mid-year joiners. Record the quote *verbatim with date and city tier*. A single credible ₹1,500/month all-in-with-filing quote at 50 employees is enough to fire the kill criterion — this is falsification, not averaging.

**V-05 CA-channel interview guide.** For 20–30 practising CAs across both tiers, the load-bearing questions are not "would you use a tool" (everyone says yes) but: *how many payroll clients do you carry today; what do you charge them; what fraction of the work is filing vs advisory; would a product that produces the portal-accepted return and completes attended submission for your clients — with the employer's liability staying with the employer — grow your practice or replace your fee; would you resell it, refer it, or resent it?* The kill criterion (R-14) fires if a majority read a filing product as **disintermediation** rather than leverage. Capture the *reason*, not just a yes/no, because the pre-agreed response (reposition the CA console as practice-leverage) depends on which specific fear surfaced.

**The common interview core.** Seven commercial items — V-01, V-03, V-16, V-30, V-32, V-33 and V-34 — run against overlapping populations, and running them as seven separate studies would burn the same goodwill seven times while producing results that cannot be cross-tabulated. They therefore share one instrument with a fixed core, asked in the same order, before any item-specific questions.

1. **What do you run payroll on today, and who does the filing?** Establishes the incumbent and whether the respondent is the buyer, the operator or both.
2. **How many statutory registrations do you hold, in how many states, across how many legal entities?** The V-30 field, asked early while the respondent is describing structure rather than opinions.
3. **What do you pay, all-in, per month — and what is included?** The V-01 and V-03 core. Inclusions are asked as a list to be confirmed, not as an open question, because "filing" means different things to different bureaus.
4. **When did a filing last go late or get rejected, and what happened?** The V-16 core. Asked as a recall question about a specific event, never as "do you have filing problems".
5. **Who would sign an authority for a third party to act on your statutory portal logins, and what would they need to see in it?** The V-32 core, asked before any product is described so the answer is about the organisation rather than about us.
6. **If a supplier promised a filing outcome and missed, what would make the promise meaningful to you?** The V-33 core, asked open before any remedy shape is offered.
7. **Here are two descriptions of a service. Which do you believe you buy today, and would you pay differently for them?** The V-34 core, with the two descriptions read verbatim and neither identified as ours.

The ordering is deliberate: structural facts first, prices second, a recalled incident third, and the three questions that could be led by our own framing last. Item-specific questions follow the core, and the core is never reordered to suit an item — a comparable core across a small sample is worth more than a perfectly tailored instrument used once.

**V-09 dataset field spec.** For every state/UT, the row is not "PT: yes/no." It is: levy applies (y/n); slab table with effective dates; **gender variant** (some states carry a different women's slab); **periodicity** (monthly / half-yearly / annual); the **February special instalment** where it exists (e.g., Maharashtra's ₹200×11 + ₹300 in February, per §06.4); registration requirement and threshold; return frequency and **statutory due date**; the corresponding LWF levy, employee/employer split, and contribution periodicity (monthly / half-yearly / annual). Each field carries its gazette URL and date. Aggregator data is banned as a *source*; it may only flag a discrepancy to chase to the gazette (§20.12 rule 1).

**V-04 / V-14 instrumentation schema.** The token profile must be captured *per agent, per query class, per policy-corpus size* — input tokens, output tokens, cache-read tokens, cache-write tokens, model, latency, and the INR cost at the live FX. The pass threshold (measured within 2× of the 23,675-in / 2,045-out estimate) is meaningless without the corpus size stated, because tokens scale with the policy document injected. V-14 extends the same schema to production with per-tenant/user attribution so R-24 (per-user cost blowout) and R-9 (margin) are observable, not inferred.

#### Acceptance criteria — what "passing" concretely means

A validation is only useful if "pass" and "fail" are decidable before the data arrives. The kill criteria above define failure; these define the *pass* threshold and the artefact each validation must produce, so a result cannot be argued into whichever conclusion the reader preferred. The numeric cut-offs in both tables (a ₹2,000 or ₹2,500 bureau quote, "≥60% of CAs", "within 2×", "≤5% of ARPU", "≥80% of the fleet") are **decision thresholds this PRD proposes, not evidence or market estimates**; each owner confirms or resets its threshold and files it before collection starts (Pre-registration, below), and none may be quoted as a fact about the market.

| # | Passing result (green) | Ambiguous (amber → widen sample) | Artefact produced |
| --- | --- | --- | --- |
| V-01 | ≥6 of 8 bureaus quote ≥₹2,500/month all-in at 50 employees, with filing included | Quotes straddle ₹2,000 with wide variance by city tier | A quote table: city tier × headcount × price × filing scope, with names and dates |
| V-02 | A convergent partner estimate of payroll-module enablement within a ±10pp band | Partner estimates disagree by >20pp | An enablement estimate with N, method, and dispersion |
| V-03 | Realised ARPU within 15% of list across ≥10 data points | Realised 15–30% below list | A list-vs-realised table with discount drivers |
| V-04 | Measured tokens/query within 2× of the 23,675-in / 2,045-out estimate | 2–5× the estimate | An instrumented per-agent token profile on a real policy corpus |
| V-05 | ≥60% of interviewed CAs describe a workable referral/reseller economics | Split or conditional interest | A CA-channel economics memo with quoted terms |
| V-06 | **Passed 5 Sep 2026:** prices for six of six priced vendors captured with dates; AI posture captured as claim-posture only | — (closed) | The EV-021–EV-028 and EV-090 rows in §02 and the price table in §21 |
| V-07 | A non-zero, agent-specific willingness-to-pay with a defensible price point | Willingness positive but below metering cost | A Van Westendorp/conjoint report by segment and agent |
| V-08 | ESIC successor scheme identified with gazette + date + corrigendum check | Draft only, no notified successor | A dated statutory memo with the source chain |
| V-09 | All states' PT + LWF fields gazette-verified with effective dates | Aggregator-only for any state (disputed) | The state PT/LWF dataset, per-field sourced |
| V-10/11 | Outbound push works with no middleware on ≥80% of the target fleet; the rest served by the paid connector | 50–80% needs firmware-specific work | A device-compatibility matrix + a sized effort estimate |
| V-12 | A downloaded Meta INR rate card that fixes the per-message rates the BSP aggregators disagree on, ex-GST and ex-BSP markup | BSPs still disagree after download | The actual per-message INR rate card |
| V-13 | ≥3 backends confirmed for in-India inference *and* data-at-rest | Only 2 qualify | A per-provider residency matrix (both guarantees) |
| V-14 | Realised inference cost ≤5% of ARPU at the low-end tenant | 5–10% of ARPU | Live per-tenant/user/agent/model cost attribution |
| V-15 | A mid-year cutover ties out YTD taxable salary, TDS deducted and statutory contribution totals to ₹0 variance against the incumbent with no manual repair | Reconciles within a small, scripted tolerance | A reconciliation report + a documented cutover runbook |
| V-16 | A per-filing-type due-date matrix + a buyer-reported baseline miss-rate the SLA can beat | Buyers report low but non-zero filing pain | A statutory filing calendar + a baseline-miss memo |
| V-17 | The cap located (or shown absent) in the notified Wages/OSH Central Rules text, with rule number, value and corrigendum check | Found only in a state rule, or central text ambiguous | A dated statutory memo; the warn-only OT parameter set per state |
| V-18 | The rule provision and its conditions read from the Income-tax Rules 2026 text | Rule located but conditions worded differently from the engine constraints | A dated memo with the provision, its conditions, and any change to the engine constraints |
| V-19 | Q4 regular and correction anchors live on Protean's pages, with the layout captured and a golden file built from it | Regular published, correction not (or the reverse) | A dated capture of both formats; the unfenced Q4 generator's test file |
| V-20 | Each listed provision located in the 2025 Act or 2026 Rules text, with section or rule number and corrigendum check | Located but worded differently from the carried 1961-Act rule | A dual-vocabulary mapping memo; updated parameters with dated sources |
| V-21 | Each listed mapping located at Code or Central Rules level, and per target state where the state sphere applies | Central text located, state text not | A per-item statutory memo; parameters set with sphere and source |
| V-22 | Successor instruments (or an extended saving) identified with gazette, date and corrigendum check | A draft or announcement only | A dated statutory memo; the EPS/EDLI parameters effective-dated |
| V-23 | Every listed portal fact captured from a live session, with the artefact that proves it (accepted upload, rejection file, template) | Captured on one registration only | A dated portal-facts sheet per portal, feeding §22's runbooks |
| V-24 | Para 25 read verbatim from the gazette | Only a later amendment located | A dated memo; the counsel question closed or re-opened |
| V-25 | A written opinion per question naming a lawful route, per portal | An opinion conditional on terms the portal has not published | The §23 counsel-register entries; the per-portal launch decision |
| V-26 | Measured supervised minutes per filing type and registration over the first attended cycles, with exception rates | Too few cycles for a stable figure | A per-portal minutes table that sizes the §22 parameters |
| V-27 | Every gazette notification touching DPDP commencement captured within the watch cycle | A proposal reported but not gazetted | The dated watch log; counsel's survival opinion |
| V-28 | Each desk CQ closed with a dated capture under §21.13; each commercial CQ with a dated quote | A capture that contradicts another capture | Updated §21.14 rows and §21.13 capture entries |
| V-29 | At least one quotation that does not exclude the acts constituting attended submission, with the premium and the exclusions stated | Cover offered but conditional on controls not yet built | A broker-quotation summary: insurer, premium, exclusions, required controls |
| V-30 | A registration-per-tenant distribution across ≥10 employers, with the count of states and legal entities beside it | Fewer than 10 employers, or self-reported counts that contradict the portal logins | A registration-distribution table by headcount band, with the median and the tail |
| V-31 | Written quotes at 20 employees from ≥2 of the six, captured verbatim and dated | One vendor quotes below the block informally, with nothing in writing | Dated quote captures feeding §21's price table and R-39's trigger |
| V-32 | The draft authority executed by ≥1 design partner's authorised signatory, with the clauses changed recorded | Signed only after edits counsel has not yet cleared | The executed authority plus a redline log of every clause a signatory contested |
| V-33 | A consistent remedy preference across ≥10 buyers, with its effect on stated willingness to pay | Preference stated but unchanged by price | A remedy-preference memo feeding `sla_remedy_cap_months` |
| V-34 | A consistent buyer reading across ≥10 interviews, with a stated price difference or a stated indifference | Buyers split, or distinguish the two only after being taught the difference | A memo on how the distinction is perceived and priced, in buyers' own words |

#### The validation record — field definitions

Every row of the table above is the summary of a record. The record is what the owner actually files, what a reviewer audits, and what §20.16's integrity checks run against. Fields marked *sealed* cannot change after collection starts; changing one produces a new record with a new id, not an edit.

| Field | Type | Sealed | Rule |
| --- | --- | --- | --- |
| `id` | `V-<n>` | Yes | Immutable. A re-run after a contradicting capture gets a new id and cites the old one; a closed validation is never quietly re-opened under its original number. |
| `hypothesis` | One sentence, falsifiable | Yes | Stated so that a specific observation would refute it. "Buyers value compliance" is not a hypothesis; "a bureau's all-in monthly fee with filing at 50 employees is at or above ₹2,500" is. |
| `method` | Procedure, with the instrument | Yes | Names the script, the sampling frame and the capture mode. Desk items name the document to be read; field items name the interview guide; spikes name what is instrumented and at what granularity. |
| `owner` | Named role | No | May be reassigned; the reassignment is logged. Exactly one owner — a shared owner is an unowned item. |
| `track` | `desk` · `desk-watch` · `desk-counsel` · `spike` · `spike-live` · `commercial` | No | Decides whether the item blocks code or blocks money (§20.6 split table). |
| `cost` | Range, or "no incremental spend" | No | Field spend, counsel or broker fees, or engineering weeks. "Unsized" is permitted only where the cost genuinely depends on an external party's quotation (V-25, V-29). |
| `elapsed` | Range, or "set at pre-registration" | No | Some items have no meaningful elapsed time because they are watches that close on an external event (V-08, V-19, V-22, V-27). |
| `gate` | Gate id, or "continuous" | Yes | The decision the item gates. An item that gates no decision is research, not validation, and does not belong in this table. |
| `pass_threshold` | Decidable condition | Yes | From the acceptance-criteria table. Must be decidable *before* the data arrives. |
| `amber_band` | Decidable condition | Yes | The region where the correct action is to widen the sample under the same threshold — never to re-argue the threshold. |
| `kill_criterion` | Decidable condition | Yes | What would falsify the hypothesis. An item without one is a wish (§20.6). |
| `artefact` | Named deliverable | Yes | The thing that exists at the end: a quote table, a dated statutory memo, a device-compatibility matrix, a reconciliation report, a counsel-register entry. |
| `blocks` | List of build items, fences or parameters | No | What cannot proceed until this closes — the §05 fenced item, the §20.13 parameter, or the risk that stays live. |
| `retires` | List of risk ids | No | Which register rows in §20.8 close or drop a severity band when this passes. Empty is a legitimate value. |
| `evidence_in` | EV ids | No | The evidence the item is testing, extending or re-checking. |
| `status` | Lifecycle state | No | Per the transition table below. |
| `result` | Free text plus the artefact reference | No | Written once at REPORTED, and never rewritten — a later contradicting capture opens a new record. |

#### Validation lifecycle — states, transitions and who may trigger them

The state machine matters for one reason: it puts a wall between *pre-registration* and *collection*, so a threshold can only move while nobody knows which way the data will fall. Everything else in the lifecycle is bookkeeping around that wall.

| Event | From → To | Guard | Side effect | Who may trigger |
| --- | --- | --- | --- | --- |
| `file` | DRAFTED → PRE_REGISTERED | Every sealed field is non-empty and the gate exists | Record sealed; dossier opened (§20.15) | Item owner |
| `amend_threshold` | PRE_REGISTERED → PRE_REGISTERED | No datum captured and no interview held | New version of the record with the reason logged; prior version retained | Item owner, counter-signed by the gate owner |
| `start` | PRE_REGISTERED → IN_COLLECTION | Record sealed | Collection start timestamped; thresholds frozen from this instant | Item owner |
| `block` | IN_COLLECTION → BLOCKED | A named dependency is unavailable — design partner, counsel, portal access, spike sign-off | Anything in `blocks` stays fenced (§05); the blocking dependency is named in the dossier | Item owner |
| `unblock` | BLOCKED → IN_COLLECTION | The named dependency is resolved | Elapsed clock resumes; the pause is recorded | Item owner |
| `escalate` | BLOCKED → ESCALATED | Blocked past the date of the gate it feeds | Gate owner informed; the gate cannot clear on this item | Gate owner |
| `report` | IN_COLLECTION → REPORTED | The artefact named in the record exists and is filed | Result written once; the dossier closes to new data | Item owner |
| `close_pass` | REPORTED → CLOSED_PASS | Result clears the pre-registered pass threshold | `blocks` released; `retires` risks re-stated; gate credited | Gate owner |
| `close_amber` | REPORTED → CLOSED_AMBER | Result falls in the amber band | Sample-widening plan filed under the same thresholds | Gate owner |
| `close_fail` | REPORTED → CLOSED_FAIL | Result meets the kill criterion | The pre-agreed response fires without further argument; dependent fences hold | Gate owner |
| `widen` | CLOSED_AMBER → IN_COLLECTION | Thresholds unchanged from the original record | Sample extended; the extension and its reason logged | Item owner |
| `reopen` | CLOSED_PASS / CLOSED_FAIL → REOPENED | A later capture contradicts the closed result, or the source is re-read and found different | A **new** record is filed; the old one keeps its result and its date | Item owner or Research lead |
| `supersede` | CLOSED_PASS → SUPERSEDED | The instrument, page or product the result rested on has been replaced | Every artefact quoting the result is re-scanned (§20.4 control) | Research lead |
| `withdraw` | DRAFTED → WITHDRAWN | The decision the item fed no longer exists | Logged with the decision that was dropped | Gate owner |
| `thesis_review` | CLOSED_FAIL / ESCALATED → THESIS_REVIEW | The item is named in a §20.11 kill condition, or its gate cannot clear in time | §20.11 is worked against the four conditions before further spend | Founder |

Two transitions deserve their names said out loud. `amend_threshold` exists so that a badly-written threshold can be fixed honestly, and its guard is the entire control: once one interview has happened, the threshold is frozen whatever anyone learns. And `close_fail` has no approval step beyond the gate owner recording it, because the response was agreed when the record was filed — the register exists precisely so that the moment of the result is not the moment of the argument.

<!-- DIAGRAM: nongoals-validation-risk-validation-lifecycle -->

#### What each validation releases — fences, risks and parameters

The table in §20.6 gives each item's gate and kill criterion. This view gives the other direction: what is physically held up while the item is open. It is the view a build lead needs, because a fence released late costs a release, and a fence released early ships a guess.

| # | Fences or build items it releases | Risks it retires or de-fangs | Parameters it sizes |
| --- | --- | --- | --- |
| V-01 | None — no code waits on it | R-9 (realised pricing), and half of the first §20.11 kill condition | The pricing target's evidence base (§18) |
| V-02 | None | R-14 fallback path; part of the third kill condition | — |
| V-03 | None | R-9 | `multi_registration_line_price` calibration (§18) |
| V-04 | None — the assistant ships bundled either way | R-24 in part; AR-5's placeholder caveat | `tenant_token_budget_pct_of_arpu` |
| V-05 | None | R-14 | — |
| V-07 | The metered-AI SKUs (§18.5) — the only build item gated on willingness to pay | NG-3's timing-gated re-open | `recruiting_price_per_requisition` in part |
| V-08 | ESI computation and filing for every period after the saving lapses | R-2 | `esi_continuance_rule` and the ESI rate set |
| V-09 | Every state beyond Maharashtra, Odisha and Karnataka's effect | R-5 in part; AR-3's contingency | The whole `pt.<state>.*` and `lwf.<state>.*` family |
| V-10 / V-11 | The frontline attendance roadmap estimate | R-19 | Device connector budget (§09) |
| V-12 | Any per-worker WhatsApp price | R-20 | — |
| V-13 | Regulated-segment eligibility | R-23 | — |
| V-14 | Nothing — it measures what is already shipped | R-9, R-24 | `gateway.budget_hard_ceiling` |
| V-15 | Mid-year cutover as a sellable motion | R-28, R-31 | `migration.tieout_tolerance.<head>` |
| V-16 | None | R-29's baseline; the first kill condition | The SLA's measured definition (§19) |
| V-17 | The OT warning value — warn-only either way | K-04's standing correction | `ot_quarterly_ceiling_hours` |
| V-18 | The meal component in the FBP wallet | The K-19 engine constraints | `meal_perq_limit`, `meals_per_working_day`, `meal_delivery_mode` |
| V-19 | The Form 138 Q4 generator and Form 130 Part B | R-4 | `form138_q4_escalation_date` |
| V-20 | The Tax Year 2026-27 TDS run and the deposit calendar | R-30 in part | The `tds.*` and `tax.*` families |
| V-21 | Gratuity, bonus and step-function alerts resting on unmapped provisions | R-30 in part | `gratuity.payable_ceiling`, `bonus.*`, the counting-unit fields |
| V-22 | The EPS and EDLI split on every ECR line | R-2 | The EPS/EDLI rate set |
| V-23 | The arrear flow, the error-file importer, ECR encoding | R-30 in part | `ecr.line_terminator`, `ecr.encoding`, `esic.*` |
| V-24 | The EPF onboarding flow's Aadhaar handling | R-34 | — |
| V-25 | Attended submission, per portal | R-32 | — |
| V-26 | Nothing — it measures the first attended cycles | R-10's sizing; the fourth kill condition | `max_supervised_minutes_per_filing_cycle`, `target_supervised_cogs_share`, `supervised_cost_per_registration_cycle` |
| V-27 | Nothing — the dual consent regime is built either way | R-22 | — |
| V-28 | Importer priority and what sales may say | R-7 (via CQ-05) | — |
| V-29 | Nothing — but it sets the ceiling the SLA can promise | R-32's residual | `sla_remedy_cap_months` in part |
| V-30 | Nothing | The fourth kill condition's denominator | `included_registrations_per_tenant`, `multi_registration_line_price` |
| V-31 | Nothing | R-39's trigger calibration | — |
| V-32 | Attended submission's commercial path, independently of V-25 | R-32 from the buyer side | — |
| V-33 | Nothing | R-29's remedy design | `sla_remedy_cap_months` |
| V-34 | Nothing — the capability ships either way | The pricing half of §20.11's second condition | The positioning of the wedge in §18 |

Read down the first column and the split in §20.6 becomes visible as a fact rather than a policy: **every fence in the build is released by a desk item or a spike, and not one is released by a commercial item.** The commercial track decides how much money is committed and on what forecast; it does not hold up a single line of code. That is the whole argument for running the two tracks concurrently, and against the instinct to wait for buyer interviews before reading a gazette.
#### Validation methodology notes

- **Desk-first ordering.** V-06 (mid-market sweep) closed on 5 Sep 2026. V-08, V-09 and V-17–V-24 (statutory and portal) and V-25, V-27 (counsel) require no field work and unblock the largest downstream sections; run them first while field interviews (V-01/V-02/V-03/V-05) are being scheduled. Of these, V-08 and V-22 are dated by the saving's lapse (~21.11.2026) and V-19 by the Q4 due date (31 May 2027, EV-049).
- **Prototype exception.** V-04, V-10, V-11, V-14 and V-15 require code; V-23 and V-26 require a live attended session on a design partner's registration. This is the *one* place the PRD-only constraint is explicitly relaxed, because these questions cannot be answered any other way — and each is scoped as a throwaway spike, not product. Founder sign-off required before any spike (per the standing project constraint).
- **Corrigendum discipline.** Every statutory validation (V-08, V-09, V-13, V-16, V-17–V-22, V-24, V-27) must include the "check for a corrigendum" step. Two careful rounds reached *opposite* conclusions on the November-2026 EPF cliff because one read a notification without checking whether a corrigendum had amended it. This is non-negotiable (§02).
- **Sample honesty.** Field-interview N is small (6–30). Treat these as *directional falsification*, not statistical estimation: they are powerful for killing a hypothesis (one credible ₹1,500/month bureau quote at 50 employees damages the pricing target) and weak for confirming one. Do not report an interview mean as a market number.
- **Pre-registration.** Write the kill criterion and pass threshold *before* collecting data for each validation, and file them. A threshold moved after the data arrives is not a threshold; it is a rationalisation, and it re-imports the optimism bias this whole section exists to stop.


#### Questions deliberately not validated

Three classes are excluded from the programme, and saying so prevents the recurring suggestion that they be added.

| Class | Examples | Why not |
| --- | --- | --- |
| **Settled by evidence already in hand** | Whether the Labour Code rules are notified; whether the ECR file is buildable; whether payroll sits in competitors' entry tiers; whether a 50-seat block exists on published cards | Each is `[Verified]` at primary source. Re-validating a settled fact spends the programme's scarcest input — elapsed time — on the questions least likely to change a decision |
| **Not answerable by us, at any budget** | Whether the first Indian algorithmic-hiring case comes out one way or the other; when CBDT publishes the Q4 formats; whether the ESI successor is notified before the saving lapses | No method exists. These are watches and residuals (§20.17, §20.29), not validations — and calling them validations would create the impression that someone is working on closing them |
| **Answered by building, not by studying** | Whether our engine computes a boundary case correctly; whether the redaction chokepoint holds; whether tenant isolation holds | These are tests and controls, with their own acceptance criteria in §20.9, §20.16 and the owning sections. A study of a thing we control is a slower, weaker version of a test of it |

The line between the second and third classes is the one to watch. "Will the portal accept this file" looks like the second class and belongs to the third — it is answered by uploading one, which is what V-23 does. "Will CBDT publish by May" looks like the third and belongs to the second.
#### Method failure modes — how each kind of validation goes wrong

Kill criteria protect against reading a result wrongly. They do not protect against *collecting* it wrongly, and each of the six method classes in this programme fails in its own characteristic way. Naming the failure per class is what lets a reviewer ask the right question about a result, rather than the generic one.

**Mystery shop (V-01, V-31).** *Bias:* the quote is shaped by the buyer the shopper appears to be — a caller who sounds like a large employer gets a large employer's price, and one who sounds price-sensitive gets an anchor. *Failure:* the script drifts across calls, so the eight quotes are not comparable and the variance is method noise read as market spread. *Control:* a fixed script, the same headcounts in the same order, and the filing-scope question asked identically every time — it is the scope, not the price, that makes two quotes comparable at all.

**Practitioner interview (V-02, V-03, V-05, V-16, V-30, V-32, V-33).** *Bias:* acquiescence. Asked "would you use a tool that did X", almost everyone says yes, which is why V-05's guide deliberately asks about the respondent's own economics instead. *Failure:* the interviewer's own hypothesis leaks into the question, and the transcript records agreement with a premise rather than information. *Control:* ask about what the respondent already does and charges, not about what they would do; capture the *reason* behind a yes or no, because the pre-agreed responses depend on which specific fear or incentive surfaced.

**Primary-source read (V-08, V-09, V-17, V-18, V-20, V-21, V-22, V-24).** *Bias:* the reader finds what the secondary summary told them to look for. *Failure:* the two that this corpus has already suffered — a notification read without checking for a corrigendum, which inverted a conclusion between two careful rounds; and an aggregator table reproducing a superseded structure, which looks identical to a current one. *Control:* the corrigendum check is a mandatory step, not a nicety; the gazette is the source and the aggregator is at most a pointer; and every read records the instrument, the URL, the capture date and the check date, so the next reader can tell what was actually looked at.

**Portal capture (V-23, and the portal half of V-19).** *Bias:* one registration's behaviour is taken for the portal's behaviour. *Failure:* a fact captured from a single successful upload is really a fact about that establishment's configuration; and watching a page's client-side "Updated As On" footer instead of its anchors reports a change that did not happen, or misses one that did. *Control:* capture from *both* an accepted upload and a real rejection, record which registration it came from, and re-capture on any portal release. The acceptance criterion for V-23 already says "captured on one registration only" is amber, not green.

**Instrumentation (V-04, V-14, V-26).** *Bias:* the measurement is taken on a workload chosen to be measurable. *Failure:* tokens are counted without recording the policy-corpus size, which makes the number unusable — the whole point of the V-04 schema is that tokens scale with the document injected, so a token count with no corpus size attached cannot be compared to anything, including itself next month. *Control:* per agent, per query class, per corpus size, with input, output, cache-read and cache-write counted separately and the INR cost taken at the live FX. V-26 carries the same discipline into supervised minutes: per portal, per filing type, per registration, with exception rates separated from the happy path.

**Spike (V-10, V-11, V-15).** *Bias:* the spike is run by the person who designed the approach, on the hardware or dataset most likely to work. *Failure:* a green spike on a clean fleet or a tidy dataset, followed by a red first customer. *Control:* the sampling frame is written into the pre-registration — "including pre-ADMS firmware" for V-10, "a design partner's real Tally and prior-payroll export" for V-15 — and a spike run on anything easier than that frame reports as amber, whatever its result.

Across all six, the same meta-control applies: the artefact named in the pre-registration must be the thing that actually exists at the end. A study that produces a conclusion but not its artefact has, by definition, not been checked by anyone.

---

### 20.7 Before-funding gate structure

Not every validation gates the same decision. Grouping them prevents the failure mode where a fundable insight waits on an irrelevant field study, and the opposite failure where money is committed before a cheap desk task that would have killed the plan.

| Gate | What it authorises | Must clear first | Rationale |
| --- | --- | --- | --- |
| **Gate 0 — Desk complete** | Rewriting §04 sizing and §18/§21 positioning with confidence; shipping OT warnings and the meal perquisite on read rule text; running Tax Year 2026-27 TDS on read rule text | V-06 (closed 5 Sep 2026), V-08, V-09, V-17, V-18, V-20, V-21, V-24; the desk CQs in V-28 | Zero-cost, no field work, unblocks the most sections. V-06 closed without breaking the competitive frame: Keka's list sits inside the ₹80–200 band — ₹139.98 or ₹199.98 PEPM at 50 employees, depending on the card — not below it (EV-027). How large Tally's payroll job is waits for V-02 in Gate 1 (EV-K34). |
| **Gate 1 — Pricing & channel viable** | A defensible pricing model and a decision on the CA/Tally channel; the basis for a seed raise | V-01, V-02, V-03, V-05, V-16 | Our pricing target (§18) and the primary GTM motion (§18) are both currently 100% hypothesis — the list anchors are verified (EV-027), our realised price is not — and the SLA wedge (V-16) underwrites both. No revenue forecast is fundable until these clear. |
| **Gate 2 — Unit economics & buildability** | Committing to the AI-bundled architecture and the frontline roadmap; scaling headcount | V-04, V-07, V-10, V-11, V-13, V-15, V-26 | These decide whether AI can be free at the low end, whether any AI SKU is monetisable, whether frontline attendance is buildable on the assumed path, whether migration is a product or a services cost (R-31), and what the dominant cost line actually costs (EV-088). |
| **Launch gate — Attended submission** | Operating attended, assisted submission on a given portal for paying tenants | V-25 for that portal; V-23 for that portal's runbook | Not a funding gate, and independent of Gates 0–2: it opens per portal, and a closed portal ships artefact-only (R-32; §05 fenced list; §22). |
| **Continuous — Statutory watch** | Nothing new; *prevents* shipping a wrong number | V-08, V-09, V-19, V-22, V-27 ongoing; V-14 and V-26 in-product | Statutory correctness has no "done" state; it is the operating model, not a gate that clears (§22 compliance data pipeline). |

**Rule:** a funding or headcount decision that skips a lower-numbered gate is out of order. Seed capital may be raised at Gate 1; scaling the statutory + engineering team beyond a founding core waits for Gate 2. Enterprise-segment spend waits for the documentary gate in §20.1 regardless of any Gate.

#### Gate specifications — entry, exit, evidence pack and the partial-pass rule

A gate that is only a list of item ids gets cleared by assertion. Each gate below therefore states what must exist *as an artefact* before it can be declared clear, who signs, what the signature unlocks, and — the clause that actually gets used — what happens when most of the items pass and one does not.

**Gate 0 — Desk complete.**
- *Entry:* the desk and desk-watch items are pre-registered and started. No customer, no field budget, no spike sign-off is needed to enter.
- *Exit:* every item in V-06, V-08, V-09, V-17, V-18, V-20, V-21, V-24 and the desk CQs of V-28 is CLOSED_PASS or has an explicit, dated "located and worded differently" memo whose consequence has been applied to the affected parameter.
- *Evidence pack:* one dated statutory memo per item, each naming the instrument, its gazette or portal URL, the capture date and the corrigendum-check date; the state PT and LWF dataset with per-field sourcing; the dual-vocabulary mapping memo from V-20; the §02 evidence rows any capture changed.
- *Signature:* Statutory owner, counter-signed by the Founder. Counsel signs only the items routed to counsel.
- *Unlocks:* rewriting §04 sizing and the §18 and §21 positioning with confidence; shipping OT warnings and the meal perquisite on read rule text; running Tax Year 2026-27 TDS on read rule text.
- *Stays locked:* everything on the §05 fenced list whose blocker is external — the Q4 generator and Form 130 Part B (V-19), the ECR arrear flow (V-23), attended submission (V-25).

**Gate 1 — Pricing and channel viable.**
- *Entry:* Gate 0 cleared, and the V-01, V-02, V-03, V-05 and V-16 interview scripts pre-registered with their thresholds filed.
- *Exit:* each of the five closes PASS or the pre-agreed response to its FAIL has been executed and its consequence written into §18 — a FAIL is not a bar to clearing the gate, it is a bar to clearing it *while still carrying the forecast the FAIL killed*.
- *Evidence pack:* the V-01 quote table with names, city tiers, headcounts and filing scope; the V-02 enablement estimate with N, method and dispersion; the V-03 list-versus-realised table with discount drivers; the V-05 CA-channel economics memo with quoted terms; the V-16 due-date matrix and baseline-miss memo; and, riding on the same conversations, the V-30 registration distribution, the V-31 quote captures, the V-32 redline log and the V-33 remedy memo.
- *Signature:* Founder, on the record, with the revenue model attached in the version the gate cleared.
- *Unlocks:* a defensible pricing model, a decision on the CA and Tally channels, and the basis for a seed raise.
- *Stays locked:* scaling the statutory and engineering team beyond a founding core; any metered AI SKU; enterprise-segment spend, which waits on the documentary gate in §20.1 regardless.

**Gate 2 — Unit economics and buildability.**
- *Entry:* Gate 1 cleared and the spikes signed off under the prototype exception.
- *Exit:* V-04, V-07, V-10, V-11, V-13, V-15 and V-26 closed, with V-15's reconciliation report showing the tie-out actually achieved rather than the tolerance hoped for.
- *Evidence pack:* the instrumented token profile against a stated corpus size; the willingness-to-pay report by segment and agent; the device-compatibility matrix with a sized effort estimate; the per-provider residency matrix covering inference *and* data-at-rest as separate guarantees; the migration reconciliation report and cutover runbook; the per-portal supervised-minutes table.
- *Signature:* Founder and the engineering owner jointly, because this gate commits an architecture as well as a spend.
- *Unlocks:* committing to the AI-bundled architecture and the frontline roadmap; scaling headcount.
- *Stays locked:* selling a mid-year cutover the importer has not tied out (R-31); any regulated-segment commitment that needs three in-India backends if V-13 found fewer.

**Launch gate — Attended submission, opened per portal.**
- *Entry:* V-25's written opinion for that portal is in the counsel register, and V-23's portal-facts sheet for the same portal is captured from a live session.
- *Exit:* the runbook for that portal exists in §22 with its credential-vault controls, its "what we did on your behalf" record, and its hand-back path; the written authority to act has been executed by at least one tenant on that portal (V-32).
- *Evidence pack:* the counsel opinion; the portal terms captured with URL and date; the portal-facts sheet; the executed authority; the dry-run session log.
- *Signature:* Founder and Legal, per portal, never as a blanket clearance.
- *Unlocks:* attended, assisted submission on that portal for paying tenants — and nothing on any other portal.
- *Stays locked:* every uncleared portal ships a portal-accepted artefact plus an employer-operated submission runbook. The wording never drifts to "we file for you" (EV-K24).

**Continuous — Statutory watch.** Not a gate and it never clears. V-08, V-09, V-19, V-22 and V-27 run on a cadence, and V-14 and V-26 run in-product. Its only "exit" is the operating model described in §22: a watcher keyed to corrigenda and amendments, two-person review, a golden-case regression corpus and a staged publish.

**The partial-pass rule.** Gates are cleared by decision, not by arithmetic, but the decision is constrained.

| All items reported? | Any CLOSED_FAIL? | Any ESCALATED? | Amber items | Verdict |
| --- | --- | --- | --- | --- |
| No | — | — | — | **Blocked.** A gate cannot clear on items that have not reported; an unreported item is not an implied pass. |
| Yes | No | No | None | **Clear.** Sign and record the artefacts. |
| Yes | No | No | One or more | **Conditional.** May clear, but the amber item's sample-widening plan is filed first and the clearance expires at `gate_conditional_clearance_expiry_days` unless the item closes. |
| Yes | Yes | No | Any | **Conditional, and only after the response fired.** The gate may clear once the pre-agreed response to that FAIL has been executed and the artefacts the FAIL invalidated have been rewritten. Clearing while the old forecast still circulates is the failure R-17 describes. |
| Yes | Any | Yes | Any | **Blocked** for any decision that depends on the escalated item; other decisions at the same gate may proceed if the gate owner records which item each rests on. |
| Yes | Named in a §20.11 kill condition | — | — | **Thesis review** before any further spend, whatever the rest of the gate shows. |

**What a gate signature actually commits.** It commits the signer to the *version of the artefacts attached*, not to a conclusion. If a later capture supersedes an artefact in the pack — a re-captured price card, a gazette corrigendum, a portal terms change — the gate is not re-run, but every decision taken on that artefact is re-examined and the §20.4 scan is re-run across what has already shipped (§20.17). Gates are checkpoints in a moving stream, not certificates.

**What happens if a gate never clears.** Gates can fail to clear for two different reasons, and they have different treatments. A gate blocked because its items keep reporting FAIL has **told us something**: the plan resting on it is wrong, and the correct move is §20.11's review rather than another round of the same studies. A gate blocked because its items never report — a design partner that does not materialise, counsel's queue, an interview schedule that will not fill — has told us nothing, and the correct move is to name the blocking dependency as the problem rather than the gate. The distinction matters because the two failures feel identical from inside and require opposite responses: the first is information, the second is logistics. Where a gate is blocked on logistics past the point where the decision it authorises can wait, the decision is taken *without* the gate and is recorded as such, with the evidence that was and was not available — which is worse than clearing the gate honestly and better than pretending it cleared.

**What a gate never authorises.** No gate authorises a statutory claim, a customer-facing legal statement, or a competitor comparison. Those clear through §23 and §21 respectively, on their own terms, whatever any gate has cleared. A gate authorises spend and scope; it has never been a substitute for a citation.
<!-- DIAGRAM: validation-gate-flow -->

---

### 20.8 Risk register — observable triggers and pre-agreed responses

Each risk is expressed as an *observable trigger* (something a specific person can watch for) and a *pre-agreed response* (a decision already made, so the moment of the trigger is not the moment of the argument). Severity is captured as likelihood × impact only to order the table; the response, not the score, is the deliverable. Owner and residual exposure are named so accountability is not diffuse.

#### The risk record — fields, and the lifecycle a risk moves through

| Field | Type | Rule |
| --- | --- | --- |
| `id` | `R-<n>` | Immutable, never reused. A retired risk keeps its id so an old board pack still resolves. |
| `statement` | One sentence | Names the *event*, not the anxiety. "Competition" is not a risk; "a priced vendor drops its 50-seat block" is. |
| `class` | market · statutory · operating · technical · data-protection · migration · control-system | Only to group the table. The class carries no severity and drives no decision. |
| `trigger` | An observable | Something a specific person could see happen. A trigger that cannot be located in a page, a report, a telemetry series, a date or a person's inbox is not a trigger (see the UNOBSERVABLE state below). |
| `watcher` | Named role | Who would see it first. Distinct from `owner`: the watcher notices, the owner decides. |
| `detection` | Mechanism class | Per the observability table below — scheduled date, page watch, instrument watch, validation report, in-product telemetry, field signal, or internal process observation. |
| `cadence` | Interval or "on event" | How often the watch actually runs. Held against `risk_review_cadence_days` for the watchlist six (§20.10, §20.13). |
| `response` | Pre-agreed decision | Written before the trigger fires. A response that says "assess and decide" is not pre-agreed and fails review. |
| `owner` | Named role | One. The person who executes the response without seeking a fresh mandate. |
| `residual` | Low · Med · High, with a sentence | What is still exposed *after* the response. The sentence carries the meaning; the band only sorts the table. |
| `retired_by` | V id, or null | The validation whose PASS closes this risk. A risk with no retiring validation and no expiry is permanent and is reviewed on cadence forever. |
| `evidence` | EV ids or dated sources | What makes the risk real rather than imagined. |
| `escalation` | Named role | Who is told when the response does not hold. |
| `last_reviewed` | Date | Stamped even when nothing happened — "no trigger observed" is a result and is recorded as one. |

The lifecycle below exists so that noticing, deciding and closing are separable acts with separate owners. Its one non-obvious state is UNOBSERVABLE, which catches the most common defect in a risk register: a row everyone agrees with and nobody could ever act on.

| Event | From → To | Guard | Side effect | Who may trigger |
| --- | --- | --- | --- | --- |
| `admit` | — → WATCHING | Trigger, watcher, cadence, response, owner and residual are all present | Row enters the register and the cadence review | Owner, accepted by the Founder |
| `review` | WATCHING → WATCHING | The cadence interval has elapsed | `last_reviewed` stamped, with "no trigger observed" recorded explicitly | Watcher |
| `mark_unobservable` | WATCHING → UNOBSERVABLE | The cadence review cannot name where the trigger would be seen | The row is quarantined — it may not be cited as a managed risk while unobservable | Watcher or Founder |
| `rewrite` | UNOBSERVABLE → WATCHING | The trigger is restated as something a named person watches, on a named surface | New trigger text logged against the old | Owner |
| `fire` | WATCHING → TRIGGERED | The named observable is observed by the named watcher | Owner notified with the observation and its evidence attached | Watcher |
| `dismiss` | TRIGGERED → FALSE_POSITIVE | The observation is confirmed not to be the trigger | Trigger wording tightened so the same observation does not fire it twice | Owner |
| `respond` | TRIGGERED → RESPONDING | The pre-agreed response exists and the owner is available | Start time logged; the response executes without re-litigation | Owner |
| `escalate` | RESPONDING → ESCALATED | The response does not hold, or the owner cannot act alone | Escalation role engaged; the reason recorded | Owner |
| `mitigate` | RESPONDING / ESCALATED → MITIGATED | The response has completed | Residual re-stated in the register — the old residual is not assumed to still apply | Owner |
| `resume` | MITIGATED → WATCHING | The trigger can recur | Cadence resumes | Owner |
| `retire` | WATCHING / MITIGATED → RETIRED | `retired_by` closed PASS, or the condition creating the risk no longer exists | The releasing evidence is cited in the row | Owner, accepted by the Founder |
| `revive` | RETIRED → WATCHING | A later capture shows the condition has returned | Row re-enters the cadence with its history intact | Watcher |
| `thesis_review` | ESCALATED → THESIS_REVIEW | The risk is named in a §20.11 kill condition | §20.11 is worked before further spend | Founder |

<!-- DIAGRAM: nongoals-validation-risk-risk-lifecycle -->

#### Trigger observability — how each class of trigger is actually seen

Every row in this register claims someone will notice something. That claim is the register's weakest point, so the detection mechanisms are specified here by class, with the failure mode of each — because a watch that cannot fail is a watch nobody has thought about.

**1. Scheduled date.** The trigger is a date already known: the 1 January 2027 Gemini price change (R-12), the 31 December 2026 WhatsApp INR-billing deadline (R-42), the ~21 November 2026 lapse of the ESI saving (R-2), the ISO 27001 start at month zero (R-16), and `form138_q4_escalation_date` (R-4). *Mechanism:* a dated entry in the compliance calendar with a lead time long enough to act, not merely to notice. *Failure mode:* the date arrives and the alert is acknowledged rather than acted on — which is why R-16's entry is a silent trigger, nothing happens on the day you should have started. *Control:* each scheduled trigger names the action due at the lead date, not at the date itself.

**2. Named-page watch.** A specific URL whose change is the trigger: competitor pricing and product pages (R-1, R-35, R-36, R-37, R-38, R-39, R-40, R-41), Protean's regular and correction download pages (R-4), the e-Gazette (R-22). *Mechanism:* a scheduled fetch of the page, compared on the anchors and the content that matters — **never on a client-side "Updated As On" footer**, which R-4 already calls out, and never on a rendered read alone, since Keka's live prices exist only as HTML comments (EV-021). *Failure mode:* the vendor moves the claim to a page not on the watch list, or replaces text with an image. *Control:* a term search across the vendor's site on the recapture cadence, not only a diff of the known page (§21.11).

**3. Statutory-instrument watch.** The trigger is a new or amended instrument (R-2, R-3, R-5, R-22). *Mechanism:* the §22 compliance data pipeline's watcher, keyed to **corrigenda and amendments to instruments already implemented**, not only to new notifications. *Failure mode:* the one this corpus actually suffered — a notification read correctly and a corrigendum missed, which inverted the November-2026 EPF position between two careful rounds. *Control:* every implemented rule carries its gazette URL, its capture date and its last-corrigendum-check date, and the check date is what the cadence review looks at.

**4. Validation report.** The trigger is a pre-registered validation closing FAIL or AMBER (R-9, R-14, R-19, R-20, R-23, R-31, R-34). *Mechanism:* the lifecycle above — `close_fail` notifies the risk owner as a side effect. *Failure mode:* the validation is closed informally without a record, so the risk never learns that its trigger fired. *Control:* §20.16's integrity check C-06 reconciles every risk whose trigger is a validation against that validation's state.

**5. In-product telemetry and reconciliation.** The trigger is a number the product itself produces (R-15, R-24, R-27, R-29, R-30, R-33). *Mechanism:* the reconciliation checks specified in §08 and §19, per-tenant and per-user cost attribution (§13), cross-tenant access tests (§15), and the migration reconciliation report (§16). *Failure mode:* the check exists but nobody owns its output, so a divergence is logged and not read. *Control:* each telemetry trigger names a threshold *and* a recipient; an alert with no named recipient is quarantined as UNOBSERVABLE.

**6. Field signal.** The trigger is something a named human hears (R-6, R-7, R-8, R-18, R-25). *Mechanism:* a standing question in deal reviews and support triage — what did the prospect compare us against, what did they ask for that we do not have, what did they assume we could do. *Failure mode:* signal arrives as anecdote and is argued about rather than recorded; or worse, a rep repeats an uncleared competitor claim and the signal becomes the incident. *Control:* field signals are logged verbatim with the date and the account, and any comparison that follows clears the competitor-claim rule (§21) before it leaves the room.

**7. Internal process observation.** The trigger is something about our own behaviour (R-10, R-11, R-16, R-17, R-21, R-32, and the control-system risks below). *Mechanism:* the cadence review itself, plus §20.16's integrity checks, which are the only mechanism in the list that watches the watchers. *Failure mode:* the organisation grades its own homework at the moment it is least able to — under deadline, before a raise. *Control:* the integrity checks are mechanical and their results are recorded whether or not anyone likes them; a failed check is a finding, not a discussion.
#### Market & competitive risks

| ID | Risk | Observable trigger | Pre-agreed response | Owner | Residual |
| --- | --- | --- | --- | --- | --- |
| R-1 | **Zoho widens its free gates** above 10 employees (Payroll) or 5 users (People) — §21 CRS-01 | Zoho Payroll's pricing page raises its free ceiling above 10 employees or its Standard tier's included seats above 25; or Zoho People raises its free cap above 5 users (§21 CRS-01) | Beachhead revenue floor moves up immediately; re-anchor on 50–200 and lean harder on attended, assisted filing (a portal-accepted artefact plus submission under written authority — which no vendor in the six-vendor set claims to offer, EV-030) and the CA console; Zoho's published pages offer no submission as of the 2026 captures (§05, §18, §21.11 CRS-01, §22). Count Zoho's per-legal-entity payroll licences in any multi-entity comparison rather than its headline (r1/08). Never follow Zoho to ₹0 on the filing tier | GTM | Med — erodes the 20–50 sub-band but not the 50–200 core. The CA console is a survivor against Zoho only: Kredily's CA programme and greytHR's PSP tooling already run multi-client consoles, so against the field the console holds only as far as it carries attended submission (§21.10) |
| R-6 | **Fintech-subsidised HRMS** zero-priced (Jupiter/sumHR precedent) | A neobank/card issuer acquires an HRMS and zero-prices it | The precedent reportedly valued the software asset at ~₹7.5 Cr — second-hand and unconfirmed against MCA (r2/02; §21 CQ-19) — so plan as though an acquirer can zero-price an HRMS cheaply. Defend on attended filing under SLA, switching cost and bank-neutral payout files; partner with banks on payout rather than compete for the account (§11 attach reasoning; §21 CRS-05) | Founder | Med |
| R-7 | **Frappe v16 bake-off lost on the wrong axis** — a prospect runs a gross-to-net comparison and finds parity | A named prospect reports gross-to-net parity in an eval, or a rep pitches gross-to-net superiority; or — the trigger that changes the frame — §21 CQ-05 resolves to show Frappe's "India Payroll Version 16" page describes code outside the three trees read, or a Frappe release or marketplace app ships state PT, LWF, ECR or Form 138 logic (§21 CRS-09), confirmed by a re-read of the release branch the customer would install | Expected, not a surprise: Frappe's gross-to-net salary structure is genuinely strong and the bake-off will not be won there (EV-031). Compete on what its v16 source tree does not contain — ECR, ESI, state PT slabs, LWF, Form 138/130, 123 (ex-12BA), 27A (EV-031; repository read, not executed) — plus maintained updates, attended filing and a support SLA — the things an open-source project does not contract to provide (§18, §21). If the CQ-05 / CRS-09 trigger fires, re-read the release branch and move the bake-off entirely to maintenance, submission and the SLA; never claim "more complete India compliance". Every comparison clears the competitor-claim rule; never assert that a competitor's published data "is wrong" (§21) | GTM | Low if positioning holds; High if a rep ever claims gross-to-net superiority or an uncleared comparison |
| R-8 | **Enterprise assistant convergence** on Copilot/Glean | Prospects ask for MCP access rather than our assistant | Already the planned posture: own the data and the tools, not the assistant. Ship the three-way-split MCP server (§12, §15) | Product | Low |
| R-9 | **Mid-market realised pricing lands far below list** — list prices are now captured (EV-021–EV-027); realised prices are not | V-03 shows realised PEPM at the beachhead below the ₹80 lower edge of the mid-market band, converging on the ~₹50 value floor (EV-027) | Re-tier immediately; our ₹80–150 target is a hypothesis inside the band, not a floor (§18). May bring forward Gate-1 pricing rework. Re-keyed: the earlier trigger (V-06 capturing Keka) fired on 5 Sep 2026 without breaking the frame — Keka's list sits inside the ₹80–200 band, at ₹139.98 or ₹199.98 PEPM at 50 depending on the card (EV-021–EV-027) | GTM | Med |
| R-35 | **Zoho adds submission or a compliance guarantee** — §21 CRS-02 | Zoho Payroll's pages add submission, e-filing, or an SLA or remedy term; its payroll partner programme markets filing as a service | Compete on measured execution — the on-time accepted-filing metric and its published definition (§19) — and on CA-channel depth; bring forward the SLA evidence pack. Never claim Zoho's submission is inferior without an executed, dated comparison cleared under §21.12 | Founder / GTM | Med — attended submission stops being unmatched against the best-capitalised software competitor; the argument narrows to maintenance quality and the channel |
| R-36 | **greytHR, or another priced vendor in the six, adds submission** — §21 CRS-06 | greytHR's payroll page adds submission or filing language; its Payroll Service Provider programme markets filing to employers; any of the six adds a filing SKU (watched by term search, §21.11) | The wedge narrows to execution quality, no seat floor and CA-channel depth; publish measured on-time acceptance (§19) as the proof. Do not dispute a competitor's submission capability without an executed, dated comparison | GTM | High against that vendor — it removes EV-030's null; the no-seat-floor wedge survives (greytHR's base buys 50, EV-026) |
| R-37 | **MYND prices and self-serves its filing operation for 20–200** — §21 CRS-07 | A priced filing or compliance add-on appears on Qandle's published card; MYND markets a filing service to employers of 20–200 (EV-034) | As R-36; position a product-led submission workflow with the employer's approval inside it against an outsourced service; never characterise MYND's service quality | GTM | Med — the corner is occupied by a bundle, not a service beside an HRMS |
| R-38 | **The Tally ecosystem closes the PT/LWF gap** — §21 CRS-08 | A named TDL add-on for state PT or LWF, or a TallyPrime release note adding a state slab table or an LWF engine | Verify the named product directly — never re-run the sweep on a rumour (r5/01); move the Tally conversation to maintained content under SLA, attended submission and leave-to-payroll; keep "attach, never replace" (§18) | Research, then GTM | Med — multi-state PT/LWF narrows to parity against Tally; maintenance under contract survives |
| R-39 | **A priced vendor drops its 50-seat block** — §21 CRS-10 | Any of the six changes its base block, or publishes a price for a sub-50 route (HROne's startup programme, greytHR's FLEXIBLE START — both unpriced today, r5/03) | Re-capture; withdraw seat-floor claims for that vendor inside `competitor_claim_withdrawal_window_days` (§21 CLR-11); watch H-P14 (§18.16) for whether 20–50 stays winnable | Research, then GTM | Med — the no-seat-floor wedge is lost against that vendor only. **Combined with R-36 or R-37 for the same vendor, it is a §20.11 whole-thesis review trigger** |
| R-40 | **greytHR cuts its price or widens the seats its base includes** — §21 CRS-11 | greytHR Essential's base falls below ₹2,495 a month, its per-employee rate below ₹45, or its base covers more than 50 employees (EV-027; §21.4) | Re-run the §21.4 tables; revisit where our price sits between the anchors only on realised-price evidence (V-03), never on a competitor's list move alone; never describe the change as distress | GTM | Low–Med — every wedge stands, but the value-floor anchor our price is sold against moves down (§18) |
| R-41 | **A vendor publishes a free tier reaching 20 employees or more, with statutory computation** — §21 CRS-12 | Any vendor's published card offers such a tier; factoHR published one to 20 employees in the round-one capture, unconfirmed since (r1/08; §21 CQ-15) | Keep the filing tier's value on attended submission and the SLA; do not move our free gate below the EPF line; do not extend the free tier to include attended submission | GTM | Med — conversion at 20 meets a free alternative; attended submission and the SLA survive |

#### Statutory & compliance risks (the highest-consequence class — a wrong number here is a legal liability, not a bug)

| ID | Risk | Observable trigger | Pre-agreed response | Owner | Residual |
| --- | --- | --- | --- | --- | --- |
| R-2 | **ESI regime unresolved at the 22 Nov 2026 cliff** | ~21 Nov 2026 passes with no ESIC successor scheme notified, or a corrigendum amends the position (V-08) | Pre-built contingency: freeze ESI computation to the last-valid saved scheme with a dated banner; block ESI *filing* until the successor is confirmed rather than file against a lapsed rule; escalate to statutory counsel. Do not guess | Statutory | **High — time-critical.** The EPF side has a named successor (Scheme 2026); the ESI side does not |
| R-3 | **A corrigendum silently inverts a statutory position** (as it did for the Nov-2026 EPF cliff) | The statutory watcher flags an amendment to an already-implemented instrument | The watcher must catch *amendments, not just new instruments*; every implemented rule carries its gazette URL + date + last-corrigendum-check date; compute the delta for affected periods against the corrected rule version as a diff, never a mutation of a filed period, and route PF corrections through the Supplementary or Revised return only where EV-037 permits (a Revised return needs no payment initiated; an approved return can never be cancelled, EV-036) (§08, §14 effective-dating) | Statutory | Med — mitigated only if the watcher is amendment-keyed |
| R-4 | **The Form 138 (ex-24Q) Q4 regular and correction formats are unreleased** ("Expected to be released soon", no link — re-checked Sep 2026, EV-046) | The Protean regular and correction download pages still carry no Q4 anchor at a checkpoint the statutory owner sets as a named parameter (`form138_q4_escalation_date`) ahead of the Q4 due date of 31 May 2027 and the Form 130 date of 15 June 2027 (EV-049; r5/02) — watched on the page's anchors, never its client-side "Updated As On" footer | Ship Q1–Q3 against RPU/FVU 1.2 for Tax Year 2026-27 onward, routing by period to the dual stack (EV-051, EV-052); fence the Q4 generator and Form 130 Part B generation (EV-046). Q4 carries Annexure II *and* Annexure III (EV-047); Form 130 has Parts A, B and C and is valid only if TRACES-generated (EV-048). Do not hard-code a guessed layout. **Slippage:** if the formats publish too close to 31 May 2027 for the generator to be built and regression-tested against a golden file (V-19), tell every affected tenant in writing, before the escalation date, that its Q4 statement and Tax Year 2026-27 certificate depend on the CBDT release and on the tenant's own deductor obligations, which stay with it (§22); ship the Q4 generator only after it passes the FVU of the matching stack (EV-052), and treat any CBDT due-date extension as a rule-store change, not an assumption | Eng / Statutory | Med — external dependency on CBDT; the Tax Year 2026-27 annual certificate is blocked until release |
| R-32 | **Attended filing is not cleared by counsel at launch** — the four Part D-17 legality questions, enumerated once at V-25, plus liability allocation and insurability (V-29) | V-25 opinions not delivered by the attended-submission launch gate (§20.7), or adverse for a portal; a portal changes its terms of use or adds a control that blocks third-party operation | Attended submission opens per portal only when counsel clears it (§20.7 launch gate); an uncleared portal ships as a portal-accepted artefact plus an employer-operated submission runbook. The employer's and deductor's statutory liability stays non-delegable in every case (§22); the wording never drifts to "we file for you" (EV-K24). Statutory basis under counsel review (§23) | Founder / Legal | High — the most robust wedge (§21.11) rests on it; the fallback preserves the artefact, not the differentiator |
| R-34 | **Aadhaar-optional collides with filing acceptance** (Part E-11) | An employee declines Aadhaar and an EPF or ESI filing needs a seeded member; or V-24 finds EPF Scheme 2026 para 25 requires Aadhaar | Default: exclude-and-flag with operator and employee notices, never block payroll; the alternatives are listed in §07; the final choice is counsel's (§23). No configuration ships that makes Aadhaar a condition of employment, payroll or any benefit (Part D-10) | Product / Legal | Med — a member can drop out of a return until resolved, which is visible and correctable, never silent |
| R-5 | **Uneven state-rule notification** under the four Codes | A multi-state customer hits conflicting state and central positions | Effective-dated rules *per state* from v1 — the data model assumes divergence rather than treating it as an exception (§06, §14). PT/LWF dataset (V-09) is the build dependency | Statutory | Med — structural, mitigated by design |
| R-15 | **The 50% wage add-back is mis-implemented**, creating two wrong wage bases | Any reconciliation shows PF/gratuity base diverging from the add-back rule, or an arrears run recomputes against today's rule instead of the period's | Two concurrent wage computations per employee/period; the wage-definition rule is versioned, effective-dated and retrospectively recomputable with an audit trail; "or such other per cent as may be notified" makes 50% a variable, not a constant (§06, §08) | Eng / Statutory | High if wrong — this is "the hardest single calculation in the build" |
| R-30 | **Statutory edge cases mis-handled** at contribution-period and ceiling boundaries (see §20.9) | Any ECR/ESI/PT/TDS file is rejected or reconciles wrong at a boundary event (wage crossing a ceiling mid-period, mid-year joiner, arrears) | The engine must encode the boundary *rules*, not just the rates; §20.9 lists the specific ones as acceptance criteria; each is a deterministic rule with a test case, never LLM-set (NG-8, §08) | Eng / Statutory | High — these are the everyday failure modes that break a real filing |

#### Operating-model & organisational risks

| ID | Risk | Observable trigger | Pre-agreed response | Owner | Residual |
| --- | --- | --- | --- | --- | --- |
| R-10 | **Statutory-maintenance and filing capacity is under-resourced** — supervised filing (per registration × state × filing type) and compliance curation (per state maintained) are the two largest, still-unsized COGS lines (EV-088) | Release cadence slips on annual Budget/wage-ceiling/PT/LWF updates; a customer files late because we shipped a stale rule | Structure the company as a compliance-maintenance operation with a permanent statutory team; the maintained-compliance SLA is the product, so its capacity is not a cost centre to trim (§13.1, §18, §22, AR-11) | Founder | High — this is a company-shape decision, not a staffing tweak |
| R-11 | **Key-person statutory knowledge** concentrated in one head | Only one person can verify a gazette interpretation or a corrigendum | Every implemented rule carries its source, date and reasoning in the versioned rule store (§14) so knowledge lives in the system, not a person; cross-train a second statutory reviewer before the first paying customer | Founder | Med |
| R-16 | **ISO 27001 seasoning clock not started** — enterprise foreclosed for an extra year | Month 6 arrives with no ISO 27001:2022 in progress | Start ISO 27001 at month zero even with no customer asking; acquisition is 3–6 months and the seasoning clock adds 12, so it must be in hand by ~month 6 to be useful at month 18. "The cheapest year you will ever buy" and unbuyable later (§01, §20.1) | Founder | High if missed — cannot be recovered by spending more |
| R-17 | **Funding committed before validation** — building on a hypothesis | A raise or a headcount plan cites a §18 number that has not cleared its gate (§20.7) | The gate structure is the control: Gate 0 → Gate 1 → Gate 2 in order; no forecast may cite a **[Hypothesis]** figure as if verified | Founder | The whole plan's residual risk concentrates here |

#### Technical & vendor-dependency risks

| ID | Risk | Observable trigger | Pre-agreed response | Owner | Residual |
| --- | --- | --- | --- | --- | --- |
| R-12 | **Gemini 3.x Flash doubles** (scheduled 1 Jan 2027, EV-089) | The scheduled date — already known | Already the *base* case in §13, not a downside (EV-089). Router re-points affected task classes without a deploy (per-task cost ceilings, ≥3 interchangeable backends) | Eng | Low — priced in |
| R-13 | **Rupee depreciation** against USD-priced inference | USD/INR breaches ₹100 | Shift task classes to INR-denominated providers; FX modelled at 90/95/100; validate Sarvam residency/hosting (V-13) rather than assume it (§13) | Eng | Low–Med |
| R-14 | **CA channel inverts into an opponent** | V-05 interviews show CAs read us as disintermediation | Reposition the CA console as *leverage for the CA's practice* (multi-client switching, per-client compliance calendar, one-click Form 138/PT export, read-only audit) rather than a replacement; if the channel still inverts, fall back to direct + Tally-partner (contingent on V-02) (§18) | GTM | Med — this is the single most consequential unvalidated GTM bet |
| R-18 | **Naukri/Info Edge dependency** blocks recruiting expectations | A prospect expects Resdex-class search inside our ATS | Ship inbound-only recruiting as the stated scope from v1; forbid scraping in architecture and collateral; do the documented LinkedIn partner path early (§10, NG-9) | Product | Low if scoped honestly; High if oversold |
| R-19 | **Device integration harder than assumed** (effort currently unsized) | V-10/V-11 spikes show common firmware failing the outbound push path | Buy the paid connector for the failing long tail ($345 one-time / $588/yr) rather than build; do not commit a roadmap estimate before the spike (§09, NG-18) | Eng | Med |
| R-20 | **WhatsApp per-message cost exceeds frontline headroom** | V-12 rate-card download shows utility+marketing cost above the frontline PEPM margin | Redesign frontline for worker-initiated flows and shared-device kiosks; do not build employer-push onboarding for large sites (250-users/24h cap) (§09) | GTM | Med |
| R-24 | **Per-user consumption blows past per-employee ARPU** — an HRMS is priced per employee but consumed per user | Any user's monthly inference cost exceeds the ARPU for that seat | Per-tenant *and* per-user rate limits are P0; budget, meter and degrade gracefully — even Microsoft hard-disables agents at 125% of prepaid capacity (§13). One heavy user cannot be allowed to erase the tenant's margin | Eng | Med |
| R-25 | **Recruiting cost priced flat while it scales with hiring velocity** | A recruiting-heavy tenant (15%/month hiring, 50 CVs per hire, 10,000 tokens per CV) costs ~15× a steady-state tenant (3%, 40 CVs, 3,000 tokens) for résumé screening alone on identical PEPM — an FX-invariant ratio (r2/03); the rupee absolutes are placeholders like every other inference figure (EV-008) | Meter recruiting *separately* — per requisition/hire — because its cost does not track headcount; greytHR already concedes this by pricing Recruit per recruiter (§10, §13) | Product | Med |
| R-26 | **Prompt injection / abuse against approval-gated write tools** | An assistant action attempts an unauthorised or unaudited write (e.g., a payroll change) | Write tools are idempotent, ACL-inheriting and approval-gated by design; no statutory/monetary value is ever model-set (NG-8); per-tenant admin controls can disable specific tools per assistant (§12, §15). Log every escalation | Eng / Security | Med |
| R-42 | **WhatsApp delivery stops on the INR-billing deadline** — a WhatsApp Business account must migrate to INR billing by 31 Dec 2026 or delivery stops on 1 Jan 2027 (EV-088) | Any WABA we operate is not migrated by the BSP's confirmation date ahead of 31 Dec 2026 | Migrate every account and hold the BSP's written confirmation; keep the kiosk and in-app paths able to carry every worker flow, so a WhatsApp outage degrades a channel rather than attendance or payslip access (§09, §12) | GTM / Ops | Low if done in 2026; High on 1 Jan 2027 if not — a dated, avoidable failure |

#### Data-protection & security risks

| ID | Risk | Observable trigger | Pre-agreed response | Owner | Residual |
| --- | --- | --- | --- | --- | --- |
| R-21 | **CERT-In obligations missed** — they bind from day one, not at enterprise scale | First security incident, or an audit, with no CERT-In PoC named or logs not retained in India | Name a CERT-In point of contact *before the first paying customer*; retain 180 days of ICT logs within Indian jurisdiction; sync clocks to NIC/NPL NTP; treat attacks on AI/ML systems as a reportable incident class with 6-hour reporting (CERT-In Directions 28.04.2022, EV-062; §17) | Eng / Legal | High if missed — it is days of work now, a painful migration and a reporting failure later |
| R-22 | **The consent regime switches, or switches early** — SPDI written consent binds today; DPDP's substantive provisions, s.7(i) included, commence on or about 13 May 2027 (EV-058, **[Verified — mirror]** for G.S.R. 843(E): pull it from the primary source before customer use — V-27) | A gazetted notification advancing that date (the January 2026 proposal to compress to twelve months is non-gazetted, its scope unresolved, EV-058); or counsel's answer on whether the SPDI Rules survive DPDP s.44(2)'s omission of IT Act s.43A (Part D-12) | Run both consent regimes concurrently across the switch (§07, §14): capture SPDI r.5(1) written consent before collecting biometric or financial data today (EV-060) — built regardless of whether the duty sits with the employer or with us, which is under counsel review (Part D-4); consent is a versioned first-class entity, never backfilled. **[Reversed]** — earlier text treated s.7(i) as currently removing consent friction; it is not in force, and when it commences it disapplies consent and notice for employment purposes only, never the s.8 duties (EV-058). Whether employees hold ss.11–12 rights against s.7(i) processing is counsel's question in both directions (Part D-1; §23) | Legal | Low–Med |
| R-23 | **Single-cloud / single-model residency lock-in** blocks a regulated deal | A regulated prospect requires in-India inference *and* data-at-rest and only one backend qualifies | Provider abstraction is P0 for exactly this reason: ≥3 interchangeable backends, residency selectable per tenant — one piece of work serving both cost (router) and residency (§13, §15). Validate the matrix (V-13) rather than trust a vendor claim | Eng | Med |
| R-27 | **Tenant data isolation breach** in a multi-tenant statutory system | Any cross-tenant read/write is detected, or an assistant tool returns another tenant's data | Isolation is P0 in the architecture (§15); assistant read tools inherit tenant ACLs; test cross-tenant access as a standing security check. A single leak of one employer's payroll data is existential for a compliance product | Eng / Security | High if it occurs |
| R-33 | **Migrated employees arrive without consent artefacts** — consent cannot be backfilled, yet mid-year migration of an existing employer is a core commercial requirement (Part E-12; r5 engineer and synthesis reviews) | A migration's reconciliation report lists employees with no captured consent for a purpose that needs one — above all the SPDI written-consent set (biometric and financial information, EV-060) | Run the migration onboarding consent flow (§07): capture in the name and with the notice text §07 specifies, separating the SPDI written-consent set from everything else; biometric enrolment for a non-responder does not start and the non-biometric attendance path applies (§09); nothing in the non-responder path blocks payroll (Part D-10). Who owes the written-consent duty is under counsel review (Part D-4) | Product / Legal | Med — every migration carries it; bounded by the flow, not by assuming consent |

#### Migration & churn risks

| ID | Risk | Observable trigger | Pre-agreed response | Owner | Residual |
| --- | --- | --- | --- | --- | --- |
| R-28 | **Mid-year cutover friction drives churn** — the most-cited churn trigger in the market | Onboarding stalls on opening balances, YTD earnings, TDS-already-deducted, previous-employer income, UAN/ESI-IP continuity, or certificate continuity across two systems (surfaced by V-15) | Treat migration as a *first-class product surface, not a services task*: Tally import is P0, and importers from Zoho/Kredily/Frappe are acquisition infrastructure budgeted as such (§16, §18). Ship mid-year cutover flows that carry YTD and certificate continuity | Product | High — implementation friction is the market's leading churn cause |
| R-29 | **Filing-SLA miss on a live customer** — the failure that ends credibility fastest | Any customer's ECR/ESI/PT/Form 138 is late or rejected because of our engine or our maintenance | The maintained-compliance SLA *is* the product (R-10); a filing miss triggers root-cause into whichever guardrail failed (R-3 corrigendum, R-15 add-back, R-4 format, R-30 edge case) and a customer-facing remediation under the compliance SLA's remedy terms (§19), because "the filing is the unit of delivery" (§01, §18) — the employer's and deductor's statutory liability itself remains non-delegable (§22, §23) | Statutory / Support | High — low frequency, existential impact |
| R-31 | **Migration seasonality — an April-only go-live.** Without provable YTD tie-out on tax and statutory totals, mid-year switching is impossible and every deal waits for the start of the Tax Year: a one-in-twelve sales window that on its own can sink the business plan (r5 CFO review and synthesis) | V-15 fails its pass threshold; or the pipeline shows won deals deferring go-live to April because the cutover cannot tie out; or a live migration needs manual YTD repair | Make V-15 a Gate 2 condition (§20.7) and ship the importers with YTD tie-out criteria and per-head tolerances (`migration.tieout_tolerance.<head>`, §16); until tie-out is proven on a real dataset, forecast only April go-lives and size the revenue plan to one window a year; never sell a mid-year cutover the importer has not tied out | Product / Founder | High — it gates the sales calendar, not one deal |

#### Control-system risks — the ways this section stops working

The registers above manage risks to the plan. These manage risks to the registers. They belong here rather than in an appendix because the plan's single largest structural weakness is not any one of R-1 to R-42 — it is that the discipline holding them decays quietly, under deadline, in exactly the conditions that make it necessary.

| ID | Risk | Observable trigger | Pre-agreed response | Owner | Residual |
| --- | --- | --- | --- | --- | --- |
| R-43 | **Threshold drift** — a pass threshold or kill criterion is moved after the data starts arriving, converting a falsification into a confirmation | A validation record shows an `amend_threshold` version dated at or after its collection start, or a reported result sits just inside a threshold that was edited during the study | The result is void, not adjusted: the record closes WITHDRAWN, a new record is filed with a new id and the original threshold, and the study re-runs on a fresh sample. The gate it fed does not clear on the voided record. Repeat occurrences move threshold-setting to a counter-signature by the gate owner for every item, not only for amendments | Founder | Med — the control is procedural and the temptation peaks exactly when a raise is close (R-17) |
| R-44 | **A banned figure re-enters through someone else's artefact** — an agency deck, an investor's own model, a marketplace listing, a press summary, a partner's co-marketing page | The §20.4 scan fires on an artefact we did not author but do circulate, or a third party publishes one of our figures with its qualifier stripped | Correct at source before the artefact circulates further; where it is a third party's own page, request the correction in writing and stop citing the page until it is made. Every externally-produced artefact enters the same scan as an internally-produced one — `banned_number_scan_artefact_classes` includes agency, investor and partner material for this reason. Never treat "they wrote it, not us" as a defence: the figure travels with our name on it | Research lead | Med — bounded by the scan, unbounded in reach once published |
| R-45 | **Evidence staleness** — a `[Verified]` capture ages past its recapture cadence and is quoted as current | A capture date on a load-bearing row is older than `statutory_evidence_recheck_cadence_days`, or older than the biannual floor the §21.13 register sets for EV-027, EV-030 and EV-090 | Re-capture before the next external use, not after; until re-captured the figure may be used only with its capture date attached in the same sentence. A row that cannot be re-captured (a withdrawn page, a removed card) moves to archived status and is quoted only as an archived capture — the treatment EV-022 already carries | Research lead | Med — the competitive rows decay fastest, and EV-030's null is the one whose expiry would matter most |
| R-46 | **An orphan parameter ships a value** — a name routed to §20.13 acquires a number somewhere in the product with no dated source and no recorded owner decision | §20.13's acceptance check (b) fails: a configuration or rule-store entry carries a value whose provenance field is empty; or a parameter appears in a section that §20.13 does not list in any family | Fail closed: the value is removed and the computation resting on it routes to operator review rather than auto-approval, which is already the rule for an unlocated statutory mapping (V-21). The parameter joins a family row with its route before it may take a value again | Statutory / Eng | High if it reaches a statutory computation — it is indistinguishable from a correct value until a filing rejects |
| R-47 | **No design partner, so the three live-session validations cannot start** — V-15, V-23 and V-26 each need a real registration, a real prior-payroll dataset or a real filing cycle, and none can be simulated | `design_partner_authority_milestone` passes with no signed written authority and no usable dataset in hand | The three items move to BLOCKED and the build items they release stay fenced — the ECR arrear flow, the error-file importer, the migration tie-out claim and the supervised-minutes sizing. Do not substitute synthetic data for a portal fact or a tie-out: a synthetic ECR proves the generator runs, not that the portal accepts it. Escalate to the Founder as a sequencing problem, since a design partner is also the only route to the first attended cycle | Founder / Product | High — it is the single dependency that three different fences share |
| R-48 | **Counsel bandwidth serialises the plan** — Part D routes roughly twenty questions to counsel, V-25 needs an opinion *per portal*, and V-27 needs a survival opinion on the SPDI Rules, all against an unsized retainer (`counsel_retainer_monthly`) | The counsel register (§23) shows questions queued longer than the gate they feed allows, or a portal's launch gate waiting only on an opinion | Sequence the register by what it unblocks, not by what is most interesting: the four Part D-17 attended-filing questions and the Aadhaar questions that gate onboarding come before the questions that only shape wording. Where a question is not answerable in time, the affected surface ships in its fenced form — artefact-only submission, no customer-facing statement, exclude-and-flag on Aadhaar — and the fence is what is communicated, never an assumption | Founder / Legal | Med — the fences are already specified, so the cost is scope and timing rather than correctness |
| R-49 | **A kill condition resolves against the thesis and the plan continues anyway** — §20.11's own stated failure mode: the instinct will be to iterate past a clear falsification | Any §20.11 condition resolves against the thesis and a spend, hire or forecast is approved afterwards without a recorded thesis review | The Founder records the review against all four conditions before the next commitment, and the record states plainly which condition resolved against the thesis and what is being done instead. This is the one risk whose response is a written artefact rather than an action, because the failure is a decision that was never made explicitly | Founder | The residual of this row is the residual of the whole document — §20.11 exists to be used, and a register that is never invoked is indistinguishable from one that is never true |
| R-50 | **A mirror-sourced fact reaches a customer artefact without the primary being pulled** — EV-058 (G.S.R. 843(E)) and EV-087 (the RBI Directions) are both `[Verified — mirror]` | A contract, security-questionnaire answer, RFP response or website claim cites either without a primary-source pull recorded | Pull the primary before the artefact ships, and record the pull. Until then the statement is made in the product's internal language only. A mirror is adequate to *build* against and inadequate to *represent* — the distinction the marker exists to carry | Legal / Research lead | Med — the risk is a wrong commencement date or a wrong obligation quoted to a regulated buyer |
| R-51 | **A new capture contradicts a `[Verified]` row and the contradiction is not registered** — the failure that produced the Frappe reversal, arriving from the other direction | Two dated captures of the same fact disagree, and the later one is used while the earlier remains in the register | Register the contradiction first, resolve it second: file the re-open, keep both captures with their dates and capture modes, and re-derive every conclusion that rested on the superseded one — the AR-3 protocol. Never silently overwrite a row; the audit trail of what we believed and when is the only defence against re-deriving the original error | Research lead | Med — mitigated only if contradiction is treated as a finding rather than as housekeeping |
| R-52 | **The register goes stale** — rows stop being reviewed, `last_reviewed` dates drift, and the section becomes documentation of a discipline rather than the discipline | More than one cadence interval passes with no `last_reviewed` stamp on the watchlist six, or §20.16's integrity checks are not run for a full quarter | Run the integrity checks before anything else and publish the results as they are. A stale register is not fixed by rewriting it; it is fixed by running one cadence honestly, including the rows that turn out to have fired unnoticed. If the cadence cannot be sustained, cut the register to what genuinely will be reviewed and mark the rest retired with a reason — an honest short register beats a complete one nobody reads | Founder | Med — and it is the risk most likely to be realised, because nothing external ever forces it |

#### Product-control risks — where a designed control fails in operation

Five controls specified elsewhere in this PRD are load-bearing enough that their *failure* needs a register row here, with an observable trigger and a pre-agreed response. The mechanisms are not restated; only what we watch for and what we do.

| ID | Risk | Observable trigger | Pre-agreed response | Owner | Residual |
| --- | --- | --- | --- | --- | --- |
| R-53 | **An attended session deviates from the approved instruction** — an operator takes an action on the customer's portal that the customer did not approve | The session log contains an action with no matching approved instruction, or a session runs past `ops.max_session_minutes` without a hand-back | Hand back to the employer immediately, disclose the action to the customer in the "what we did on your behalf" record rather than in a summary, and suspend that credential pending review. An action outside the instruction is treated as an incident, not as initiative — the entire legal posture of attended filing is that a named human did a named thing the customer asked for (§22) | Ops | Med — bounded by the log, and only if the log is reviewed rather than merely written |
| R-54 | **A sub-processor is added without the per-tenant consent gate firing** — including a model vendor, which is the case that matters most | A vendor appears in the processing stack with no gate record against the tenants it touches; or a regulated tenant's stack changes while its AI features are off by default | Stop the rollout for affected tenants rather than seek consent retrospectively — consent cannot be backfilled (Part E-12, R-33). Silently adding an LLM vendor can put a bank customer in breach of *its own* obligations, which are materiality-gated entity by entity (EV-087), so the default for RBI, SEBI and IRDAI tenants stays off (§12) | Eng / Legal | High for a regulated tenant — the breach is theirs, caused by us |
| R-55 | **An AI output reaches a hiring, appraisal, promotion, PIP or termination decision with no recorded named confirmer** | Any such decision record lacks a confirmer name and timestamp, or the reconstruct-this-decision snapshot cannot be produced for it | The decision is not actionable until the confirmer record exists; the snapshot is a **snapshot, never a recompute** (§10). This is sold and built as defensibility — the RPwD s.90 due-diligence defence — and never as a legal mandate (Part D-18) | Product / Eng | High — it is the one control whose absence is only discovered when it is needed in a dispute |
| R-56 | **An identifier passes the redaction chokepoint** — Aadhaar, PAN, bank account or IFSC, or a biometric template, reaching an outbound model call | The chokepoint's own logs record a default-deny class leaving, or a call path is found that does not traverse the chokepoint structurally | Treat as a security incident with the CERT-In six-hour clock running from awareness (EV-062), not as a bug; close the structural gap in the call graph rather than adding a filter at the call site, because the control is structural by design (Part E-7); re-verify every other call path before resuming | Eng / Security | High — Aadhaar exposure carries a criminal surface this PRD builds against as though it holds (EV-067) |
| R-57 | **A device-side erasure is partially acknowledged and the exception state is not used** — biometric templates removed from some terminals and not others | The two-phase erasure's retry queue holds a device past its retry budget with no admin attestation of decommission or loss recorded | Use the documented exception state rather than marking the erasure complete: an attestation is a record, an assumption is a gap. Until attested, the erasure is incomplete and is reported as incomplete (Part E-6; §09) | Ops / Eng | Med — bounded, provided "mostly erased" is never allowed to close the task |


**What Low, Medium and High mean in the residual column.** The bands only sort the table, and the sentence beside each carries the meaning — but the bands still need definitions, because an undefined band drifts toward whatever the writer felt that week. **High** means the exposure survives the response substantially intact, or the failure would be discovered only when it is too late to act — R-2, R-16, R-27, R-29, R-32, R-46 and R-55 are the shape. **Medium** means the response bounds the exposure but does not remove it, and the remaining loss is recoverable at a cost. **Low** means the response leaves little beyond execution risk, usually because the event was anticipated and priced — R-12 is the clean case, a scheduled price change that is already the base case rather than a downside. Two disciplines apply. A residual is **re-stated after the response fires**, never assumed to be unchanged, because the whole point of responding is that the exposure afterwards is different. And no row's band is a score to be summed: adding the register's bands produces a number that means nothing and invites the comfortable conclusion that the total is manageable.
#### Risks deliberately not in this register

A register that admits everything reviews nothing (AP-12). Three classes are excluded on purpose, and the exclusions are stated so that their absence reads as a decision rather than an oversight.

- **Generic company risks with no product-specific trigger** — competition in the abstract, hiring difficulty, macroeconomic conditions, a co-founder leaving. They are real and they are not manageable by this instrument: none has an observable trigger that a named watcher could act on, so each would enter as UNOBSERVABLE and sit there.
- **Risks whose mechanism another section owns** — the design of bitemporality, engine purity, the incident pipeline, the credential vault, the compliance data pipeline. What appears here is the *operational failure* of those controls (R-15, R-27, R-53, R-54, R-56, R-57) with a trigger and a response, never their design, per §20.25.
- **Risks that are actually non-goals** — "we might get dragged into money movement", "we might end up building an LMS". A pull toward a declined product is managed by the decline and its re-open protocol (§20.1), not by a risk row, because the response is already written and it is "no".

One genuine exclusion is worth stating separately: **there is no row for a competitor building what we build**. Not because it is unlikely, but because the register manages competitor *moves* that change our position — submission (R-35, R-36, R-37), seat floors (R-39), price (R-40), free tiers (R-41), the Tally gap (R-38) — and each of those is observable on a published page. "Someone builds a better product" is not observable until it is a price, a page or a card, at which point it is already one of the rows above.
<!-- DIAGRAM: risk-register-heatmap -->

---

### 20.9 Statutory edge cases — each is itself a filing-failure trigger

R-30 is not one risk; it is a class. In a filing-first product the everyday failure mode is not an outage — it is a **correctly-running engine that produces a wrong number at a boundary event**, which reconciles wrong and rejects at upload. These are the specific boundaries the payroll engine (§08) must encode as deterministic, effective-dated rules with test cases, and they double as acceptance criteria for V-08/V-09 and the correctness of §06, which is the canonical statement of each rule (§06.2–§06.8, §06.14 test vectors). None is LLM-computed (NG-8). Each carries a worked example so "handled correctly" is decidable.

| Edge case | Rule the engine must encode | Worked example | Failure if mis-handled |
| --- | --- | --- | --- |
| **PF wage ceiling + EPS cap split** | EPF statutory wage ceiling ₹15,000/month, re-fixed under CoSS s.2(89) by S.O. 2702(E) of 29.05.2026 — a notified variable; employer 12% split as EPS 8.33% *capped at the ceiling* (= ₹1,250) with the remainder to EPF; EDLI 0.5%, employer-only; the EPF administrative charge (0.50% per EPFO circulars) is not re-verified (Source: §06.2; r1/06; ECR golden fixture 1,800 / 1,250 / 550 at ₹15,000, EV-035). A member who joined on or after 1 Sep 2014 with wages above ₹15,000 is not an EPS member — shown as a flag before filing, not a portal rejection (EV-040). | Basic+DA = ₹25,000, employer contributing on actual, EPS member: employer 12% = ₹3,000; EPS = **₹1,250 (capped, not ₹2,083)**; EPF = ₹1,750. Employee 12% = ₹3,000 (or ₹1,800 if restricted to ceiling). | Applying 8.33% of ₹25,000 (₹2,083) to EPS over-allocates pension on the return. Which ECR checks reject rather than flag is only partly published — the age-58 EPS rule is the one hard block (EV-040) — so the product's own pre-upload validator must catch it. |
| **ESI contribution-period continuation** | ESI: employee 0.75%, employer 3.25%, wage ceiling ₹21,000 (₹25,000 for persons with disability). Two contribution periods: 1 Apr–30 Sep and 1 Oct–31 Mar. If wages *cross* ₹21,000 mid-period, ESI continues on full wages **until the end of that contribution period**, then stops (Source: esic.gov.in coverage and contribution pages, r1/06; §06.3). ESI subordinate law is saved only until ~21 Nov 2026 and the Code-era rule numbers are unmapped (§06.9, §06.13) — every value here is re-confirmed under V-08. | Wage rises from ₹20,000 to ₹22,000 in August: ESI continues to be deducted on ₹22,000 through 30 September, then ceases from October. | Stopping ESI the month wages cross ₹21,000 under-deducts and creates an ESIC contribution mismatch for the period. |
| **Gratuity eligibility & 4-year-240-day rule** | (15/26) × last-drawn monthly wages × completed years, service *in excess of* six months counting as a year; "wages" is the CoSS s.2(88) base with the 50% add-back (§06.10); the ceiling is "such amount as may be notified" (CoSS s.53(3)) — the familiar ₹20 lakh is a legacy of the repealed Payment of Gratuity Act, carried as a configurable parameter; continuous service is day-counted, 240 days actually worked in a year (CoSS s.54); the 5-year condition does not apply on death, disablement or fixed-term expiry, which are paid pro rata (CoSS s.53) (Source: §06.6; r1/06). "4 years + 240 days = 5" rests on legacy-Act High Court rulings and is **[Hypothesis]** under the Code (§06.6). | Wages ₹40,000, 4 years 8 months, *if* the 240-day reading controls in that jurisdiction: 40,000 × 15/26 × 5 = **₹1,15,385**. | Denying gratuity at "4 years 8 months" on a naive completed-years count is wrong where the 240-day reading controls; auto-approving it where it does not is also wrong — route a claim at the edge to the jurisdiction check (§06.6). |
| **Statutory bonus eligibility & calculation base** | Minimum bonus 8.33% of wages earned or ₹100, whichever is higher; maximum 20%; the calculation-base ceiling and the eligibility ceiling are set by notification of the appropriate Government, so they can diverge by state (Code on Wages s.26). The ₹21,000 eligibility and ₹7,000-or-minimum-wage base are legacy Payment of Bonus Act values with no Code-era notification located — configurable parameters until notified (Source: §06.7, §06.13; r1/06). | Employee earning ₹18,000/month, min wage ₹9,500: bonus base = ₹9,500 (>₹7,000); at 8.33% annual = 9,500 × 12 × 8.33% = **₹9,496**. | Computing bonus on full ₹18,000 or ignoring the min-wage floor mis-states the liability both ways. |
| **PT work-state, not registration-state** | PT is levied by the *state of work location*, on that state's slab, periodicity and special instalment — not the entity's HQ/registration state (Source: state PT Acts; V-09 dataset). | Employee on a Maharashtra-registered entity working in Karnataka: deduct **Karnataka PT** on the Karnataka slab; a male Maharashtra-based colleague earning above ₹10,000 pays ₹200 × 11 + ₹300 in February (the ₹2,500 annual cap, Art. 276(2); slab per §06.4). | Applying one state's slab company-wide mis-deducts PT for every out-of-state worker and mis-files each state return. |
| **TDS s.392 (ex-s.192) regime & average-rate on mid-year joiner** | The new regime applies unless the employee elects the old one (r1/06; the 2025-Act provision is unmapped, §06.13); s.392 deducts at the *average rate* over projected annual income; a mid-year joiner's prior-employer income is taken on Form 122 (ex-12B) to avoid under-deduction (Source: Income-tax Act 2025 s.392; forms and sections per EV-050 — both vocabularies accepted). | Joins in October; without Form 122 the engine annualises only the current salary and under-deducts; with prior income declared it recomputes the average rate on total projected income. | Ignoring prior-employer income under-deducts TDS, surfacing as a demand at Form 130 issuance. |
| **LOP / calendar-day proration** | Loss-of-pay proration basis (calendar days vs fixed 30-day vs pay-for-actual-attendance) must be tenant-configurable, applied consistently, and correct across a 28/29/30/31-day month (Source: tenant policy; the day-rate conventions are specified in §08.2). | 2 days LOP in February (28 days) on ₹28,000: calendar-day basis = 28,000 × 2/28 = ₹2,000; a hard-coded /30 gives ₹1,867 — a silent ₹133 error every February. | An inconsistent divisor produces month-to-month pay drift and disputes; February is the tell. |
| **UAN / Aadhaar-seed & member-ID continuity on ECR** | The ECR line carries UAN and "Member Name as per UAN" (EV-035); Aadhaar seeding is reported as a filing precondition (r1/06, medium) while EV-040 lists the age-58 EPS rule as the only hard block — which checks reject is to be confirmed on the portal (§06.13). Since 1 Aug 2025 UANs are reported to be generated by the employee through Aadhaar face authentication in UMANG — a single EPFO circular of 30.07.2025 that the r4 critic flags as thin evidence, with no post-November-2025 EPFO guidance retrieved (r4/04; r4 critic). Aadhaar stays optional: an unseeded member is **excluded and flagged with operator and employee notices, never a payroll block** (Part E-11; §07; final choice to counsel, §23). Correcting a wrongly recorded date of exit needs a joint employer–employee declaration and can stall the month (EV-041). | A joiner's UAN name differs from EPFO records by an initial → the line fails until corrected; not a payroll-math error but a filing-blocker. | Un-reconciled UANs silently drop members from the ECR, under-remitting PF and breaking member continuity; a hard "no Aadhaar, no payroll" gate is never an acceptable fix (Part D-10). |
| **Maternity & crèche thresholds** | Maternity benefit is CoSS Chapter VI, applying to every shop or establishment with 10 or more employees "on any day of the preceding twelve months" — it latches; 26 weeks' benefit at 80 days' qualifying service (r3/04 — reported, not yet read at the Code text); any reduced entitlement for later children is a configurable parameter pending the Code text; crèche at 50 employees "or such number as may be prescribed" (CoSS s.67(1)) — configurable per statute (Source: §06.1; r1/06). | A firm that had 10 employees on any day of the preceding twelve months stays inside Chapter VI after dipping to 9 — the gate must not switch off; crossing 50 turns on the crèche obligation. | A benefit gate that does not latch under-serves an entitled employee — a compliance and reputational exposure. |
| **The correction window closes at payment initiation** | A Revised return needs an approved Regular, no other return in process and **no payment initiated**, and it overwrites prior data; an approved return can never be cancelled (EV-036, EV-037). Downward correction is therefore possible only before payment initiation, which is why the verification gate sits immediately before `PAYMENT_INITIATED` and not after `APPROVED` (Part E-1; §08 transition table). | A member is filed at EPF wages of ₹20,000 when the correct figure is the ceiling-restricted ₹15,000. At ₹15,000 the golden fixture is employer 12% = ₹1,800, EPS capped at ₹1,250, EPF ₹550 (EV-035). At ₹20,000 the line carries employer 12% = ₹2,400, EPS still ₹1,250, EPF ₹1,150 — and employee 12% = ₹2,400 against ₹1,800. Caught before payment initiation, a Revised return overwrites it. Caught after, the **₹600 employer and ₹600 employee over-remittance on that one member** can no longer be corrected downward through the file at all. | Placing the verification gate after payment initiation makes every over-statement permanent and pushes the remedy off the portal entirely — a path this PRD does not specify because no layout for it is published (EV-043; routed to V-23). |
| **Supplementary is for absent members, not for top-ups** | A Supplementary return may be filed repeatedly against an approved Regular, but may contain **only members absent from all prior returns for that month** (EV-037). A member already present whose wages were understated is a Revised-return case, with the no-payment-initiated guard above. | Three joiners are missed in September's Regular and one existing member is filed ₹3,000 short. The Supplementary carries exactly the three joiners. The understated member cannot ride along — if payment has been initiated, that member's correction has no in-file route at all. | Filing a top-up as Supplementary either rejects or creates a duplicate member line for the month, and the second outcome is worse because it reconciles wrong rather than failing loudly. |
| **Chronological filing and the four-month relaxation** | Returns file in strict month order; a Regular for month M is permitted only if returns for all active members of month M−4 have been filed (EV-038). A skipped month blocks every later month, which is why the filing ledger is per establishment, unbroken, and refuses silent abandonment (Part E-10). | A tenant migrating in September 2026 wants September filed first. The gate is **May 2026** — M−4 — for all active members. If the outgoing provider left May unfiled, September cannot be filed until May is, and the migration's first visible act is a blocked return. | A mid-year migration that does not reconstruct the filing history silently inherits a gap, and the gap surfaces on the 15th of the first month we are accountable for (R-29). |
| **Interest is added by the portal, damages are not** | Interest under s.7Q is **mandatory and auto-calculated**; damages under s.14B may be deposited later at the employer's option (EV-039). The amount due at challan time is therefore not the amount the payroll run computed. | A late deposit produces a Due Deposit Balance Summary carrying interest the payroll totals do not contain. The bank advice built from payroll totals under-funds the challan by exactly the interest figure, and the payment fails or part-pays. | Treating the payroll total as the payable amount is a cash-flow failure, not a computation failure — and it fails at the moment least recoverable, with the return approved and the due date passing. |
| **A wrongly recorded date of exit is an offline dependency** | Correcting a date of exit requires a **joint declaration by employer and employee** (EV-041). Contributions are permitted only between a valid date of joining and date of leaving, and the age-58 EPS rule is the one hard system block (EV-040). | An employee marked as exited in July actually left in August. August's return cannot carry that member until the joint declaration is processed — and because filing is chronological (EV-038), a stalled August puts September at risk too. | A single HR data-entry error becomes a multi-month filing block with a dependency on a former employee's cooperation. The product's job is to surface it at data-entry time, not at upload time. |
| **A NIL month is not an empty file** | NIL months use **no file at all**; administrative and inspection charges are paid through Direct Challan Entry, which is enabled only when there are no active members (EV-042). | An establishment's last member exits in October. November has no ECR — not an ECR with zero lines — and the admin and inspection charges route through Direct Challan Entry instead. | Generating an empty ECR for a NIL month is not the compliant path, and it also breaks the unbroken-ledger expectation: the ledger must record "NIL, by Direct Challan Entry" as a filed state, not as a gap (Part E-10). |
| **A part payment uses a different file, with a different field count** | The part-payment contribution file is **six fields**, `#~#`-separated: UAN, MEMBER_NAME, EPF_CONTRIBUTION, EPS_CONTRIBUTION, EPF_EPS_DIFF_CONTRIBUTION, REFUND_OF_ADVANCES (EV-044) — against the ECR's eleven fields in their own fixed order (EV-035). | An operator selects part payment and the generator emits an eleven-field line. The delimiter is right, the encoding is right, and the file is wrong. | Reusing the ECR writer for a part payment is the classic shared-code defect: it passes every test that checks the delimiter and none that checks the contract. The two writers must not share a field list. |
| **Arrears attach to the disbursal date, and have no published layout** | PF liability on arrears dates from the **disbursal date**, not the wage month (Part E-9), and it is surfaced when the arrears batch is approved. The arrear return uses a separate "File Arrear Return" flow whose layout is **not published** (EV-043) — so no arrear file format is specified in this PRD, and the flow stays fenced pending V-23. | An arrears batch approved in October covers April to September wages. The PF liability attaches to **October's** disbursal and is surfaced at batch approval, before anyone builds a payment file. | Attributing arrears PF back to the original wage months would require re-opening returns that are approved and can never be cancelled (EV-036) — the correction is a diff on a later period, never a mutation of a filed one (Part E-1). |
| **The Form 138 challan sub-heading remap is breaking** | The challan sub-heading codes are remapped: 301→A, 302→B, **303 removed**, 304→C (EV-051). The file is ASCII `.txt`, `^`-delimited, every record CRLF-terminated, record types FH / BH / CD / DD, file type `SL1`. Token No. becomes "Return Receipt Number" and TAN Registration No. is deleted. | A generator carrying the legacy mapping emits `301` on every challan record of a Tax Year 2026-27 file. Nothing about the line looks wrong — the delimiter, the record type and the field count are all correct. | A single remapped code invalidates every record that carries it, and the remap is invisible to any test written against the old format. Code 303 is the sharper case: it has no successor, so a record that needs it has no valid representation and must be caught before generation. |
| **The RPU/FVU stack routes on the period, not on today** | RPU 1.2 with FVU 1.2 applies from Tax Year 2026-27 onward; RPU 6.0 with FVU 9.5 applies to FY 2010-11 through FY 2025-26; **mixing versions causes rejection** (EV-052). | A correction statement for FY 2024-25 is prepared in November 2026. Routed by today's date it goes to the new stack and rejects; routed by the statement's own period it goes to RPU 6.0 / FVU 9.5 and validates. | Every correction filing for a legacy period is a candidate for this failure, and corrections are exactly the filings made under time pressure after a rejection. The router keys on the period, and the period alone. |
| **Two vocabularies, one stored value** | Forms and sections carry both namings — 130←16, 138←24Q, 124←12BB, 123←12BA, 122←12B/12BAA; s.392←s.192, s.397(3)(b)←s.200(3) — and "Financial Year" becomes "Tax Year", with a six-digit file field (**202627** for Tax Year 2026-27) and an assessment-year field of 202728 or later (EV-050). | A screen labelled "Tax Year 2026-27" writes `202627` into the file. The same screen must resolve a user searching "FY 2026-27", "24Q", "Form 16" and "12BB", because historical periods keep the old forms and practitioners still use the old names. | Accepting only one vocabulary breaks either the file or the user. Accepting both in the UI while storing two different values breaks reconciliation — one stored value, two labels, is the only safe shape. |
| **EPS closure at age 58 is the one hard block** | Only the age-58 EPS rule is a hard system block; "joined after 1 Sep 2014 with wages above ₹15,000" is a **flag shown before filing, not a rejection**; contributions are permitted only between a valid date of joining and date of leaving, and the rate must be statutory or higher (EV-040). | A member turns 58 mid-month. Whether the birthday month itself carries an EPS contribution is held as `epf.eps_closure_boundary_inclusive` (§20.13) — a named parameter, not a guess, because the portal's treatment of the boundary is a captured fact rather than an inferred one (V-23). | Coding a flag as a block rejects valid returns; coding the block as a flag produces a portal rejection on the 15th. The pre-upload validator must distinguish the two classes explicitly, and the distinction is only partly published — which is itself the reason the validator exists. |

**Standing acceptance rule for §20.9:** each row must ship with (a) a deterministic, effective-dated rule in the versioned rule store (§14), (b) at least one boundary test case with the worked figure above, and (c) a reconciliation check that fires R-30 if the produced number diverges from the rule. The exact slabs and ceilings are inputs to V-08/V-09 and are effective-dated because "or such other amount as may be notified" applies to almost all of them — treat every ceiling as a variable, not a constant (§06).


**The edge-case list is not exhaustive, and is not meant to be.** It holds the boundaries this corpus has verified well enough to specify. A new one is admitted through DT-7 — it needs a rule, a worked example and a named failure mode before it becomes a row, and it needs a boundary test and a reconciliation check before C-21 will pass on it. The ones most likely to arrive next are the ones V-23 will produce, because portal behaviour is the category where the published record is thinnest and a real rejection teaches more than any document available to us.
**Boundary test matrix.** Check C-21 requires three artefacts per edge case — a rule in the versioned store, a boundary test, and a reconciliation check. This is the test half, stated as the specific input that must exist in the golden corpus. A corpus that contains only the happy path for any of these rows fails C-21 whatever its coverage percentage says.

| Test | Edge case | The boundary input the corpus must contain | What fires on divergence | Risk |
| --- | --- | --- | --- | --- |
| BT-01 | PF ceiling and EPS cap split | A member at exactly the ₹15,000 ceiling (expected 1,800 / 1,250 / 550) and one above it on actual wages | ECR pre-upload validator, and the challan-to-payroll reconciliation | R-30 |
| BT-02 | EPS non-membership flag | A member joining on or after 1 Sep 2014 above the ceiling — must produce a **flag**, not a rejection | Pre-upload validator's flag-versus-block classification | R-30 |
| BT-03 | EPS closure at 58 | A member whose 58th birthday falls inside the wage month, exercising `epf.eps_closure_boundary_inclusive` | Portal-rejection replay against the captured behaviour (V-23) | R-30 |
| BT-04 | ESI contribution-period continuation | Wages crossing ₹21,000 in August, with September and October both in the corpus | ESI contribution reconciliation across the period boundary | R-30 |
| BT-05 | Gratuity at the 4-year-240-day edge | Exactly 4 years 240 days, in a jurisdiction where the reading is contested | Route-to-operator-review check — never auto-approval | R-30 |
| BT-06 | Statutory bonus base | An employee above the eligibility ceiling and one where the minimum wage exceeds the calculation base | Bonus liability reconciliation | R-30 |
| BT-07 | PT on work state | An employee on an entity registered in one state, working in another, in a month carrying a special instalment | Per-state PT return totals against the payroll register | R-5, R-30 |
| BT-08 | Mid-year joiner without prior income | A joiner in October, with and without the prior-employer declaration | Projected-annual-income recomputation check | R-30 |
| BT-09 | LOP proration in February | Two days' LOP in a 28-day month, run under each of the three named day-rate conventions | Month-over-month net-pay drift check | R-30 |
| BT-10 | UAN name mismatch | A member whose UAN name differs by an initial | Pre-upload validator, and the member-count reconciliation between payroll and ECR | R-30, R-34 |
| BT-11 | Maternity gate latching | An establishment dipping to 9 employees after having had 10 on a day in the preceding twelve months | Benefit-gate latch check | R-30 |
| BT-12 | Correction before payment initiation | An over-stated member corrected before, and after, payment initiation | Filing-state machine guard on the Revised return | R-3, R-30 |
| BT-13 | Supplementary membership constraint | A Supplementary containing a member already present in the Regular | Return-type composition check | R-30 |
| BT-14 | Chronological gap | A Regular for month M with month M−4 unfiled for an active member | Filing-ledger continuity check (Part E-10) | R-31, R-29 |
| BT-15 | Interest at challan time | A late deposit where the Due Deposit Balance Summary exceeds the payroll total | Payment-file-to-challan reconciliation | R-29 |
| BT-16 | Exit-date correction dependency | A member whose recorded exit date precedes the actual one, blocking the following month | Filing-ledger block surfaced at data entry, not at upload | R-29, R-30 |
| BT-17 | NIL month | An establishment with no active members in the wage month | Ledger state "NIL, by Direct Challan Entry" — not a gap, not an empty file | R-30 |
| BT-18 | Part-payment file shape | A part payment generated where the ECR writer would produce eleven fields | Field-count assertion per file type, with no shared field list | R-30 |
| BT-19 | Arrears on the disbursal date | An arrears batch approved in a later month than the wage months it covers | Arrears-liability attribution check at batch approval | R-30 |
| BT-20 | Challan sub-heading remap | Records requiring each of the remapped codes, including one that would have used the removed code | Form 138 generation-time code validation | R-4, R-30 |
| BT-21 | RPU/FVU stack routing | A correction statement for a legacy period prepared in the current Tax Year | Stack-selection assertion keyed on the statement's period | R-4, R-30 |
| BT-22 | Dual vocabulary | A file written with the six-digit Tax Year field, and searches issued in both vocabularies | File-field assertion plus a search-resolution test | R-30 |

A note on what this matrix is not. It is not a test plan — §08 owns the generator's tests and §06 the rule statements. It is the **acceptance link** between an edge case that would cause a filing failure and the artefacts that prove the edge case is handled, so that C-21 can be run mechanically and R-30 can be closed on evidence rather than on confidence.

#### The filing calendar — what "on time" means, per filing type

R-29 ("filing-SLA miss") and V-16 ("what does on-time mean") are only actionable against concrete statutory due dates. The canonical calendar is §06.11; this is the SLA-relevant cut of it, and the SLA is measured against it; each date is a scheduled trigger in the compliance calendar, and a slip against any of them is an R-29 event. Dates marked **needs V-09** are state-variable and cannot be shipped until the PT/LWF dataset is gazette-verified.

| Filing | Statutory due date | Source cue | Notes |
| --- | --- | --- | --- |
| **PF ECR return + payment** | Within fifteen days of the close of the month (the **15th**) | EPF Scheme 2026 (G.S.R. 525(E), 29.06.2026; r1/06) | Return and payment are separate steps — upload → validate → approve → challan with TRRN → pay — and an approved return can never be cancelled (EV-036); interest is mandatory and auto-calculated (EV-039); months file in strict chronological order, so a skipped month blocks later ones (EV-038). A failed ECR line (R-30 UAN row) that pushes the return past the 15th is a late filing. **[Reversed]** — earlier text called payment and return "a single monthly event". |
| **ESI contribution** | The **15th** of the following month | ESI subordinate law, saved only to ~21 Nov 2026 (§06.9) | Monthly. **needs V-08** for every period after the cliff — the successor instrument is unresolved. |
| **TDS deposit (s.392, ex-s.192)** | **7th** of the following month; **30 April** for March — values carried from the 1962 Rules r.30 | Income-tax Rules 2026 r.218 prescribes the dates for Tax Year 2026-27 onward; its text is not yet read (r5/02; §06.13) | Deposit is monthly even though the statement is quarterly. The r.218 read is an open desk item (§06.13) routed to this validation programme. |
| **TDS statement (Form 138, ex-24Q)** | Q1 **31 July**, Q2 **31 October**, Q3 **31 January**; Q4 **31 May** of the year following the Tax Year | Rule 219, Income-tax Rules 2026 (EV-049); 1962 r.31A for FY 2025-26 and earlier | Q4 regular and correction formats are unreleased (EV-046) — Q4 fenced (R-4); files route by period to the dual RPU/FVU stack (EV-052). |
| **Form 130 (ex-Form 16)** | **15 June** of the year following the Tax Year | r.215, Income-tax Rules 2026; s.395(4) (r5/02) | Valid only if TRACES-generated; Parts A, B and C (EV-048). For Tax Year 2026-27 it is blocked until the Q4 Form 138 Annexure II format lands (EV-046, R-4). |
| **Professional Tax return** | State-variable, per registration — held as parameter `pt.<state>.due_day`, and none is captured: earlier drafts' per-state due days are carried, not re-captured, and not shipped (§06.11, §06.13). Maharashtra assigns PTRC return periodicity per registration each financial year, so it is ingested from MAHAGST, never derived (r1/06); Odisha returns are annual and online only (r2) | State PT Acts | **needs V-09** — per-state due dates are a build dependency, not shippable from aggregators. |
| **Labour Welfare Fund** | State-variable — parameters `lwf.<state>.periodicity` and `lwf.<state>.due`; Karnataka's annual cycle due 15 January is the only state periodicity verified (§06.8, §06.11); secondary sources describe half-yearly cycles elsewhere, unverified | State LWF Acts | **needs V-09** — periodicity, amount and split differ by state; no rate or split is verified from a government source. |

Missing or approximate dates here are not a licence to guess: an unverified due date is treated as **needs V-09/V-08** and blocks the affected filing rather than shipping a hard-coded guess (§20.12 rule 8, R-4 discipline).

---

### 20.10 Risk watchlist — the six to review every operating cadence

Most of the register is monitored passively (a page-change alert, a scheduled date, a validation report). Six lines warrant an explicit line in every board/ops review because they are simultaneously *high-consequence* and *time-sensitive*, and because their triggers can pass silently:

1. **R-2 — ESI cliff (22 Nov 2026).** Time-boxed; a missed successor scheme breaks payroll correctness for every ESI-liable tenant. Review weekly from October 2026.
2. **R-16 — ISO 27001 seasoning clock.** Silent trigger (nothing happens on the day you *should* have started); unrecoverable if missed. Confirm "started" at month zero.
3. **R-10 — statutory-maintenance capacity.** A company-shape decision that, if made wrong, is expensive to reverse and shows up only as slipped compliance updates months later.
4. **R-3 / R-15 / R-30 — corrigendum miss, the 50% add-back, and boundary edge cases.** The three most likely sources of a *wrong statutory number shipped to a customer*, which is the failure mode that ends the company's credibility fastest.
5. **R-17 — funding ahead of validation.** The meta-risk: it is what converts every unvalidated **[Hypothesis]** into a committed liability. The gate structure (§20.7) exists specifically to hold this line.
6. **R-31 / R-32 — migration seasonality and attended-filing legality.** The two risks the round-five reviews found missing from the register (r5 synthesis). One decides how many months a year we can sell; the other decides whether the most robust wedge can be operated at all. Review until V-15 passes and V-25 has cleared every portal in the launch set.

#### The cadence review script — what each watchlist line must report

"Review every operating cadence" decays into "someone mentioned it" unless the reporting format is fixed. The interval itself is `risk_review_cadence_days` (§20.13, owner decision), tightened to weekly for R-2 from October 2026 by its own entry. Each line reports the same five things, in the same order, and a line that cannot fill the second column is treated as UNOBSERVABLE rather than as clear.

| Watchlist line | What is reported, every cadence | The artefact behind it | What "no change" looks like | Escalates to |
| --- | --- | --- | --- | --- |
| **R-2 — ESI cliff** | The date of the most recent ESIC and MoLE notification check, and whether a corrigendum check was included | The V-08 watch log with dated entries | "Checked on <date>, no successor scheme notified, no corrigendum" — never silence | Founder, weekly from October 2026 |
| **R-16 — ISO 27001 seasoning** | Started yes or no, and the date started | The engagement record | After "started", the report is the certification milestone reached — the clock cannot be restarted, only run | Founder |
| **R-10 — statutory-maintenance capacity** | Releases due against releases shipped in the period, and any rule that shipped stale | The §22 publish log | "N due, N shipped, zero stale" | Founder |
| **R-3 / R-15 / R-30 — wrong number shipped** | Corrigendum checks completed; add-back reconciliation result; count of boundary-test failures | The reconciliation reports from §08 and §19 | Zero divergences, with the checks named so "zero" means "run and passed", not "not run" | Statutory owner |
| **R-17 — funding ahead of validation** | Whether any commitment in the period cited a `[Hypothesis]` figure, and which gate it belonged to | The gate records and the model version | "No commitment cited an unvalidated figure" | Founder |
| **R-31 / R-32 — migration seasonality and attended-filing legality** | V-15's state, and V-25's state per portal in the launch set | The reconciliation report and the §23 counsel register | "V-15 open, no mid-year cutover sold; V-25 open on portals X and Y, both shipping artefact-only" | Founder / Legal |

Two things the review may not do. It may not **re-argue a pre-agreed response** — if the trigger fired, the response executes and the review records that it did; a response that needs re-deciding at the moment of firing was never pre-agreed and the row is defective (§20.16, check C-08). And it may not **close a line on absence of evidence** — "we have not heard anything" closes nothing, because five of the six lines have triggers that pass silently. Each needs a positive statement that the watch ran.

---

### 20.11 The whole-thesis kill conditions

The registers above manage risks *inside* the plan. This clause names the conditions under which the plan itself is wrong — the point at which the honest move is to stop, not to iterate. Naming them now, while nothing is sunk, is the cheapest insurance in the document.

The filing-first thesis is falsified — and the build should stop or fundamentally re-scope — if **any** of the following resolves against it after Gate 0/Gate 1:

- **The filing is not a felt pain.** V-16 shows buyers experience near-zero late/rejected-filing incidence with their current bureau *and* V-01 shows the bureau bundles filing at a price below our floor. Then "the filing is the unit of delivery" is a thesis about a problem the market does not have.
- **The floor is genuinely zero at the beachhead, submission included.** A capitalised incumbent begins offering attended submission of ECR/ESI/PT under an SLA-like guarantee at or near the ~₹50 value floor (EV-027) across 20–200. As of the 5 Sep 2026 capture no vendor in the six-vendor set claims to submit anything, and the only bundle pairing self-serve HRMS with an outsourced filing operation (MYND/Qandle) is unpriced and demo-sold (EV-030, EV-034) — so the trigger is a published, priced submission offer. Then there is no defensible price for the one thing we sell.
- **Every channel is closed.** V-05 shows CAs read us as disintermediation *and* V-02 shows Tally payroll-module enablement is negligible *and* no direct self-serve motion converts. Then the beachhead is unreachable, not merely contested.
- **The unit economics do not close.** The four-line COGS stack — above all supervised-filing minutes per registration × state × filing type, the dominant and still-unsized line (EV-088, sized in §22), with inference measured by V-04/V-14 — exceeds the realised price (V-03) *and* neither a registration cap nor a multi-registration line (§18) recovers it. Then attended filing cannot be funded on Indian ARPU.

One further condition is a **review trigger** rather than a kill: a single priced vendor that both publishes a per-head card with no seat floor (R-39) *and* adds submission (R-36 or R-37) occupies the target corner outright, and the wedge against that vendor collapses to execution quality alone (§21.11). On that combination the thesis is re-examined against the four conditions above before any further spend.

No single amber result triggers this; the thesis dies only when a *combination* removes both the problem and the way to be paid for solving it. The point of writing it down is that, under the generator's known optimism bias (§02), the natural instinct will be to iterate past a clear falsification. This clause is pre-commitment against that instinct.

#### The arithmetic behind each kill condition

A kill condition that cannot be evaluated on the day the data lands is decoration. Each is worked below in the units the validations actually report, using only figures this document has verified.

**Condition 1 — the filing is not a felt pain.** Two readings, both required. V-16 reports a buyer-observed baseline miss-rate with the current bureau; V-01 reports all-in monthly quotes with filing scope stated. The price half is decidable by division: our value floor reference is **~₹50 PEPM (EV-027)**, which at 50 employees is ₹50 × 50 = **₹2,500/month** — the same figure V-01's pass threshold uses, and not a coincidence. A bureau quoting **₹2,000/month all-in with filing** is charging ₹2,000 ÷ 50 = **₹40.00 PEPM**; at **₹1,500** it is **₹30.00 PEPM**. Against the ₹80–150 target band, which at 50 employees is ₹4,000–₹7,500/month, a ₹1,500 all-in quote is **20% to 37.5%** of what we intend to charge for the same statutory outcome. One credible quote of that shape does not close the condition on its own — the pain half still has to fail — but it makes the pricing section unshippable regardless (R-9).

**Condition 2 — the floor is genuinely zero at the beachhead, submission included.** The trigger is deliberately narrow: a **published, priced** attended-submission offer at or near the ~₹50 value floor, across the 20–200 band. Three facts set the baseline it would have to break. No vendor in the six-vendor set claims to submit any filing, and greytHR — the most compliance-forward of them — publishes only generation language (EV-030). The one bundle pairing self-serve HRMS with an outsourced filing operation, MYND/Qandle, is unpriced and demo-sold (EV-034). And payroll already sits in the *entry* tier for every vendor that publishes tiers (EV-028), so a competitor adding submission has nowhere upward to hide its cost. A demo claim, a roadmap slide or an unpriced service page does not fire this condition; a published card does. R-35, R-36 and R-37 are its early-warning rows, and each of them narrows the wedge without killing the thesis.

**Condition 3 — every channel is closed.** A three-way AND, and it is an AND for a reason: each channel failing alone has a pre-agreed response (R-14 for CAs, AR-13's contingency for Tally, a direct motion for both). What has no response is all three failing together, because at that point the beachhead is unreachable rather than contested. V-05's kill criterion is qualitative — a majority of interviewed CAs reading a filing product as disintermediation — and V-02's is a band: at roughly 5% payroll-module enablement the Tally channel shrinks to an accounting-export play, at roughly 40% it leads (both are pre-registered decision bands, not market estimates).

**Condition 4 — the unit economics do not close.** This is the only condition expressed as an inequality, because it is the only one where both sides are measured rather than observed. The form is:

> realised ARPU × employees  <  (supervised filing cost × registrations × filing types × cycles) + inference + WhatsApp + the tenant's share of compliance curation

with **revenue on the left scaling per employee and the dominant term on the right scaling per registration** (EV-088). Two validations supply the right-hand side — V-26 measures supervised minutes per filing type per registration, V-30 counts registrations, states and legal entities per tenant — and V-03 supplies the left. The sensitivity is worth stating plainly: if V-03 reports realised prices 30–40% below list, our ₹80–150 target re-bases to **₹56.00–₹105.00** at a 30% discount and **₹48.00–₹90.00** at 40%, so the low edge lands at or below the ~₹50 value floor (EV-027). At ₹48 PEPM a 60-person tenant produces ₹48 × 60 = **₹2,880/month**, and that same tenant may carry one registration or six — which is precisely why V-30 exists and why the condition cannot be evaluated from headcount alone. The condition fires only when the inequality holds **and** neither `included_registrations_per_tenant` nor `multi_registration_line_price` recovers it (§18, §20.13); a pricing structure that recovers the cost is not a falsification, it is the intended answer.

#### What "stop or fundamentally re-scope" means in practice

The clause is easier to write than to obey, so its consequences are named here rather than left to the moment. In order: (1) the Founder records the review against all four conditions, stating which resolved against the thesis and on what evidence; (2) no further spend, hire or forecast is committed until that record exists — this is R-49's whole content; (3) the desk-track outputs are **kept**, because a gazette-sourced state PT and LWF dataset, a read of the Income-tax Rules 2026, and a portal-facts sheet retain their value under any re-scope; (4) the fenced items stay fenced rather than being shipped to salvage a release; and (5) if the re-scope survives, it re-enters at Gate 0 with its own pre-registered validations, not at the gate the original plan had reached. The asymmetry in (3) is the reason the desk track runs first and free: a thesis can be wrong while the evidence it produced stays true.

<!-- DIAGRAM: nongoals-validation-risk-kill-condition-logic -->

---

### 20.12 Standing decision rules (the guardrails behind the registers)

The registers above catch specific mistakes. These rules prevent whole *classes* of mistake, and they apply to everyone who touches a model, a deck, a contract or the codebase. They are the operational form of the evidence-discipline argued in §02.

1. **No compliance or competitive claim ships to a website, deck or contract without a gazette, notified-rule, filing or regulator citation captured with URL and date.** No exceptions, including for claims that "everyone knows." A competitor claim also states whether the product was executed or only its documentation or repository read, and clears the competitor-claim rule (§21); a customer-facing legal claim has a named owner and clearance (§23).
2. **"Check for a corrigendum" is a mandatory step** in every statutory verification, not a nicety. The single most important statutory conclusion in this plan was reversed by a corrigendum one round missed.
3. **No statutory or monetary figure is ever LLM-generated.** Deterministic code produces every number; the model explains and drafts (NG-8, §12).
4. **No `[Hypothesis]` figure enters a financial model as if verified.** If it must appear, it is labelled and carries its kill criterion and its validation ID (V-nn).
5. **Any surviving medium/low-confidence business-case claim is haircut downward** on the presumption of the generator's measured optimism bias (§02.3). The burden of proof is on the optimistic reading. Competitor-capability and competitor-price claims have no safe direction — re-check them at source before relying on them either way (**[Reversed]** in part: EV-K12, EV-K20, EV-K21).
6. **A banned number (§20.4) appearing anywhere invalidates the artefact** until removed — it is a fail-closed check, not a review comment.
7. **Registered-vs-contributing must be stated** wherever an EPFO establishment count appears; the default is *contributing*.
8. **Every statutory ceiling, rate and slab is treated as a variable, not a constant** — effective-dated in the rule store, because "or such other amount/per cent as may be notified" applies to almost all of them (§20.9, §06, §14).
9. **A validation's kill criterion and pass threshold are pre-registered before data collection** (§20.6); a threshold moved after the data arrives re-imports the optimism bias this section exists to stop.
10. **Funding and headcount gate on the validation programme (§20.7), not on this document.** This PRD is the map; the programme is the territory.

#### How each standing rule fails, and what catches it

A standing rule is only as good as the mechanism that notices it has been broken. Every rule above can be violated by a well-meaning person under time pressure, and in most cases the violation is invisible at the moment it happens. This table pairs each rule with its characteristic silent failure and the control that catches it.

| Rule | How it fails silently | What catches it | Who notices |
| --- | --- | --- | --- |
| 1 — citation with URL and date | A claim inherited from an earlier internal document, whose own source nobody has opened | The scan's citation branch; C-20 for mirror-sourced rows | Research lead, per release |
| 2 — corrigendum check | A notification read correctly and completely, and amended afterwards | The watcher being amendment-keyed; the last-corrigendum-check date on every implemented rule | Statutory, each cadence |
| 3 — no LLM-generated statutory or monetary figure | A model's output pasted into a spreadsheet that later becomes a rule-store value | C-14's provenance requirement; the rule object's author field | Statutory, per release |
| 4 — no `[Hypothesis]` figure in a model as if verified | The label is dropped when a slide is copied into a new deck | C-01 and the scan; TC-16 and TC-17 exercise both readings | Research lead, per release |
| 5 — haircut medium and low confidence business-case claims | The haircut is applied once and the un-haircut figure survives in a spreadsheet cell | The model carrying its derivation, so the haircut is visible as an operation | Founder, at each gate |
| 6 — a banned number invalidates the artefact | The artefact has already circulated when the figure is noticed | R-44's response — correct at source and inform, rather than wait | Research lead, on discovery |
| 7 — registered versus contributing stated | A correct figure quoted without its qualifier (TC-06) | The scan's EPFO branch; C-12 | Research lead, per release |
| 8 — every ceiling, rate and slab is a variable | A value hard-coded in a computation "just for now" because the parameter has no source yet | C-14 plus DT-2 — a parameter with no executed route may not take a value at all | Eng / Statutory, per release |
| 9 — thresholds pre-registered | A threshold "clarified" mid-study in a way that happens to fit the data | C-02 and C-03; R-43 voids the result | Gate owner, on report |
| 10 — funding gates on the programme | A commitment made on a figure whose gate has not cleared, justified by momentum | P-5's playbook; the gate records | Founder, each cadence |

**Worked example — the single corrigendum this plan is built around.** The most important statutory conclusion in the plan was reversed by a corrigendum that one research round missed: two careful rounds reached *opposite* conclusions on the November-2026 EPF position, and the difference was not diligence in reading the notification but whether anyone asked what had happened to it since. Trace the rule failures. Rule 1 held — the notification was cited with a source. Rule 2 failed — no corrigendum check. Rule 5 could not help, because this was not an optimism error; the reading was simply stale. What would have caught it is exactly what rule 2 now requires and what §22's watcher is keyed to: **amendments to instruments already implemented**, not only new instruments. The cost of the miss, had it survived into product, would have been a wrong contribution rate applied to every EPF-liable tenant for the affected periods, corrected afterwards as a diff against approved returns that can never be cancelled (EV-036). That is the shape of a rule-2 failure: not a wrong argument, a correct argument about a superseded text.

---

### 20.13 Parameters routed to §20 — the sizing register

Across the PRD, every value the evidence does not give is a **named configurable parameter** routed here rather than a guessed number (Part A rule 2). This register is where each family is sized: by which route, by whom, and on what evidence. It holds no values — a value enters the rule store or the configuration only through its route, with the source, the date and the person who set it recorded, the same way a rule object records its citation and reviewer (§14, §22).

| Family | Parameters (as named in their sections) | Introduced in | Sizing route | Owner | Rule for setting it |
| --- | --- | --- | --- | --- | --- |
| State PT and LWF reference values | `pt.<state>.slabs`, `pt.<state>.due_day`, `pt.<state>.transfer_month_rule`, `pt.arrears_treatment`; `lwf.<state>.employee`, `lwf.<state>.employer`, `lwf.<state>.periodicity`, `lwf.<state>.due`, `lwf.<state>.wage_threshold`, `lwf.<state>.transfer_month_rule` | §06, §07, §14, §15, §19 | V-09 (desk) | Statutory | Gazette or state-department source with URL, date and corrigendum check; aggregator tables only flag a discrepancy (§20.12 rule 1). No state ships until its row is sourced |
| Central labour reference values | The gratuity payable ceiling (named `gratuity.payable_ceiling`, `gratuity.ceiling`, `gratuity_ceiling` and `gratuity_payment_ceiling` across sections — one value, and never the same field as `tax.gratuity_exemption_ceiling`); `epf.damages_scale`, `esi.damages_scale`, `epf.eps_closure_boundary_inclusive`, `epf.admin_charge.minimum`, `epf_continuance_rule`, `esi_continuance_rule`, `epf_registration_window`, `iw_contribution_base_rule`, `iw_country_agreement_status`; the maternity parameters (`maternity_entitlement_weeks`, `maternity_qualifying_days` and their variants); `bonus.set_on_off_years`, `bonus.annual_return_form`; `min_wage.vda_revision_dates`; `ot_quarterly_ceiling_hours`; the attendance-side maternity and nursing-break parameters (`ml_*`, `nursing_break_*`, `maternity.esi_displacement_rule`); the apprentice and add-back parameters (`apprentice_excluded_from_counts`, `apprentice_engagement_band`, `apprentice_stipend_floor`, `addback.employer_pf_in_test`, `esi.entry_on_wage_drop`) | §06, §07, §08, §09, §10, §11, §14 | V-08, V-17, V-21, V-22 (desk) | Statutory | Code or Central Rules text, then per-state rules where the state sphere applies (EV-057); sphere and source recorded per value. `ot_quarterly_ceiling_hours` is warn-only whatever V-17 finds |
| Tax reference values | `tds.standard_deduction.<regime>`, `tax.gratuity_exemption_ceiling`, `tds.late_fee_per_day`, `tds.late_fee_cap`, `tds.penalty.certificate_delay`, `tds.rounding_method`, `no_pan_tds_floor`, `tds.inoperative_pan_rule`; `meal_perq_limit`, `meals_per_working_day`, `meal_delivery_mode`, `gift_voucher_limit`, `gift_threshold_mode`; `perq.meal_per_meal_cap`, `perq.gift_voucher_annual_cap`; `tax.lta_block`, `lta_entitled_class_rule`, `new_regime_exempt`; `retiral_cap_includes_eps`, `retiral_cap_arrear_attribution`; `tax.hra_landlord_pan_threshold`; `tds.penalty.statement_default`; `leave_encashment_exemption_cap` | §06, §07, §08, §10, §11, §18 | V-18, V-20 (desk); counsel where a customer statement follows | Statutory; Legal for `tds.inoperative_pan_rule` | Income-tax Act 2025 / Rules 2026 text in both vocabularies (EV-050). `tds.inoperative_pan_rule` ships dark until counsel clears it (§06.13) |
| Portal facts | `ecr.line_terminator`, `ecr.encoding`, `esic.*`, `esic_mc_template_version`, `epfo.sign_in_otp`, `it.fvu_upload_signature`, `portal.lockout_policy` | §05, §16, §22 | V-23 (live session) | Statutory / Ops | Captured from an accepted upload or a real rejection on a live registration, dated; re-captured on any portal release |
| Compliance-operations sizing | `max_supervised_minutes_per_filing_cycle`, `target_supervised_cogs_share`, `operator_productive_minutes_per_month`, `operator_loaded_cost_monthly`, `analyst_productive_hours_per_year`, `counsel_retainer_monthly`, `supervised_cost_per_registration_cycle`, and the §22 cost-model inputs (`m_prep`, `m_session`, `m_exception`, `p_exception`, `n_sessions`, `r_review`, `h_*`) | §05, §13, §18, §22 | V-26 (measured), then an owner decision | Ops / Finance | Measured first, targeted second: a target is set only after the first attended cycles are timed, and it becomes the automation target the build brief works to (EV-088) |
| Compliance-operations controls | `ops.otp_wait_minutes`, `ops.instruction_wait_minutes`, `ops.max_session_minutes`, `ops.handback_cutoff_minutes_before_due`, `ops.min_lead_minutes_for_mode_c`; `vault.credential_freshness_days`, `vault.rotation_reminder_days`, `vault.break_glass_minutes`, `vault.shred_after_revocation_hours`, `vault.suspend_after_failed_validations`; `rule.freeze_window_hours`, `rule.publish_lead_days`, `watch.cadence` | §22 | Owner decision, revisited on the first quarter's observations (§22) | Ops; Security for `vault.*` | Set conservatively before launch; each change is logged with its reason, like a rule change |
| Pricing and commercial | `included_registrations_per_tenant`, `multi_registration_line_price`, `recruiting_price_per_requisition`, `sla_remedy_cap_months`, `annual_prepay_discount_pct`, `beachhead_sub20_share`, `thesis_min_cohort_tenants`, `smb_logo_retention_benchmark` | §04, §13, §18, §19 | V-01, V-03, V-07, V-26 (commercial and measured) | Founder / GTM | Our own billing-tax values (`gst_rate_saas`, `inbound_tds_rate`, `inbound_tds_threshold`, `einvoice_turnover_threshold`, `einvoice_reporting_window_days`, `card_emandate_afa_exempt_ceiling`, §18) are statutory and follow the desk route with Finance as owner. Commercial values are never set from a competitor's list move alone (R-40); set on realised-price and measured-cost evidence, and `sla_remedy_cap_months` only with counsel on the SLA wording (§19, §23) |
| AI cost and governance | `tenant_token_budget_pct_of_arpu`, `gateway.budget_hard_ceiling`, `a5_cost_per_admin_month`, `loaded_cost_per_human_query`, `llm_log_retention_days` | §12, §13, §15, §19 | V-04, V-14 (measured); counsel for `llm_log_retention_days` (§23) | Eng; Legal | Budgets from measured tokens at live FX (EV-089); the log-retention period is not stated in this PRD beyond the CERT-In 180-day in-India floor (EV-062) |
| Engine numerics | `fixed_point.max_iterations`, `fixed_point.tolerance`, `epf.rounding_method`, `wages.deduction_overflow_method` | §08, §15 | Engineering test evidence against the §06.14 golden vectors | Eng / Statutory | A setting is accepted only when every golden vector passes with it; rounding follows any statutory rounding rule before engineering preference |
| Retention | `retention.*`, `retention.state.<state>.<form>`, `statutory_window_days` | §14, §17 | Counsel (Part D-11) | Legal | Only EV-054's central-sphere figures are stated in this PRD; every other period is counsel's, per state |
| Migration | `migration.tieout_tolerance.<head>` | §16 | V-15 (spike on a real dataset) | Product | Set per head from the first real cutover; a tolerance wider than the tie-out needs for Form 138 and Form 130 inputs fails V-15 (R-31) |
| Competitive-claim governance | `competitor_claim_max_capture_age_days`, `competitor_claim_withdrawal_window_days`, `competitive_recapture_cadence_days`, `competitive_alert_triage_days`, `competitor_claim_audit_sample_size` | §21 | Owner decision before the first external claim | Research lead, with counsel | The recapture cadence may not be looser than the EV register's biannual floor for EV-027, EV-030 and EV-090 (§21.13) |
| This section | `form138_q4_escalation_date`; `risk_review_cadence_days`; `gate_conditional_clearance_expiry_days`; `banned_number_near_miss_tolerance_pct`; `banned_number_scan_artefact_classes`; `statutory_evidence_recheck_cadence_days`; `validation_dossier_retention_years`; `design_partner_authority_milestone` | §20 (R-4, V-19, R-43–R-47, R-52, §20.4, §20.10, §20.15, §20.17) | Owner decision, except `validation_dossier_retention_years`, which is counsel's alongside the §14 retention classes | Statutory for the two statutory-watch values; Founder for the cadence, gate-expiry and design-partner values; Research lead for the two scan values; Legal for dossier retention | Set conservatively before the control they govern is first relied on, each recorded with its reasoning. `form138_q4_escalation_date` is set far enough ahead of 31 May 2027 (EV-049) to build, FVU-test and notify tenants in writing. Each is recorded with the name of the person who chose it, for the reason given under the sub-table below |

**Acceptance for the register.** A reviewer can check it mechanically: (a) every parameter another section routes to §20 belongs to exactly one family row here — the names listed are the principal members, and a new parameter joins a family, with its route, when it is introduced; (b) no parameter carries a value in any section of this PRD without a dated source or a recorded owner decision; (c) the four spellings of the gratuity payable ceiling resolve to one stored value; (d) no parameter whose route is counsel is set by anyone else. A parameter that fails (a) is an orphan in the same sense as an unregistered **[Hypothesis]** (§02).

#### The parameter record, and the lifecycle a value moves through

| Field | Content | Rule |
| --- | --- | --- |
| `name` | The parameter as it is spelled in the section that introduced it | One canonical spelling. Where a section introduced an alias, the aliases are recorded here and resolve to one stored value — the gratuity payable ceiling is the standing example, with four spellings and one value (C-15) |
| `family` | One of the rows in the table above | Exactly one. Membership of two families is how a parameter acquires two routes and then two values |
| `introduced_in` | Section id | Where a build team will find what it means |
| `route` | Desk read · portal capture · measured cycle · counsel opinion · owner decision | The route is the evidence. A value obtained by any other means has no provenance and fails C-14 |
| `owner` | Named role | The role that may set it. For counsel-routed parameters, nobody else may (C-16) |
| `sphere` | Central · state · tenant · ours | Statutory parameters carry the sphere, because a central value and a state value are different facts with different sources (EV-057) |
| `effective_range` | Dates | Every statutory ceiling, rate and slab is effective-dated, because "or such other amount as may be notified" applies to almost all of them (standing rule 8) |
| `value` | Absent until SET | A parameter in this PRD holds a name, a route and an owner — never a value |
| `source` | URL, instrument, capture date, corrigendum-check date — or the owner decision and its reasoning | Whichever the route requires |
| `state` | Per the lifecycle below | The state, not the value, is what the integrity checks read |

The lifecycle has two states worth naming explicitly. **BLOCKED** is what happens when a route cannot run — no design partner for a portal capture (R-47), no counsel opinion in the queue (R-48) — and its consequence is that the build item needing the value is fenced in §05 rather than shipped on a guess. **DARK** is the state for a value that is built but not enabled pending counsel, which is already the specified treatment for `tds.inoperative_pan_rule`. Both exist so that "we do not know this yet" has a representation in the system rather than only in a document.

<!-- DIAGRAM: nongoals-validation-risk-parameter-lifecycle -->

#### Parameters this section itself introduces

The register above records where other sections' parameters are sized. §20's own controls need a small number of values that this PRD does not supply, and they are named here on the same terms as everything else.

| Parameter | What it governs | Route | Owner |
| --- | --- | --- | --- |
| `form138_q4_escalation_date` | The checkpoint ahead of 31 May 2027 at which R-4's slippage response fires and tenants are notified in writing | Owner decision, set far enough ahead to build, FVU-test and notify | Statutory |
| `risk_review_cadence_days` | The interval at which §20.10's six watchlist lines report, tightened to weekly for R-2 from October 2026 by that row | Owner decision | Founder |
| `gate_conditional_clearance_expiry_days` | How long a gate cleared on an amber item stands before the item must close | Owner decision | Founder |
| `banned_number_near_miss_tolerance_pct` | The band inside which a figure is treated as a near-miss of a banned value and the author must show the derivation | Owner decision, set before the first external artefact | Research lead |
| `banned_number_scan_artefact_classes` | The artefact classes the fail-closed scan runs against, including agency, investor and partner material (R-44) | Owner decision | Research lead |
| `statutory_evidence_recheck_cadence_days` | How often the statutory rows in §20.17 are re-checked, independently of the competitive recapture cadence in §21 | Owner decision | Statutory |
| `validation_dossier_retention_years` | How long a closed validation's dossier is kept, interacting with §14's retention classes | Counsel, with the §14 retention design | Legal |
| `design_partner_authority_milestone` | The date by which a signed written authority and a usable dataset must exist, or R-47 fires and three validations move to BLOCKED | Owner decision | Founder |

None of these is a statutory value and none is set from evidence, which is exactly why each is recorded with an owner: a control parameter chosen by nobody in particular is chosen by whoever is under the most pressure.

#### Worked traces — three parameters from name to value

**`ot_quarterly_ceiling_hours` — a desk route.** NAMED in §09 and §06 when the overtime warning needed a value. ROUTED to the central labour reference family, owner Statutory, route V-17's desk read of the notified Central Rules of 8 May 2026 with a corrigendum check. IN_SIZING while the read runs. Two outcomes and one invariant: if the cap is located, the parameter goes SET with its rule number, value, sphere and effective range, then PUBLISHED through the §22 pipeline; if it is absent from both notified rule-sets, the figure is deleted from every warning and the parameter is WITHDRAWN. The invariant is that in **both** cases the product warns and never blocks — the warn-only rule came from K-04 and is not contingent on what the read finds. State recorded per state where the state sphere applies.

**`ecr.line_terminator` — a portal-capture route.** NAMED in §16 and §22 because no public document gives it. ROUTED to the portal-facts family, owner Statutory and Ops, route V-23 — captured inside an attended session on a design partner's registration, from a portal-accepted upload and from a real rejection. BLOCKED until a design partner exists, which is precisely the dependency R-47 watches and `design_partner_authority_milestone` dates. While BLOCKED, the ECR generator carries the value as a parameter rather than an assumption, and the arrear flow that depends on the same session stays FENCED (EV-043). On capture: SET with the date and the registration it came from, PUBLISHED, and re-captured on any portal release. This is the cleanest example of why the sizing register holds no values — a plausible guess here would pass every internal test and fail at the portal.

**`sla_remedy_cap_months` — a composite route with a counsel gate.** NAMED in §19, where the compliance SLA is specified. ROUTED to the pricing and commercial family, owner Founder and GTM, but its route is three inputs rather than one: V-33 for what remedy a buyer regards as meaningful, V-29 for what the operation can be insured for and on what exclusions, and counsel on the SLA's wording (§23). IN_SIZING until all three report; DARK is not available to it, because an SLA cannot ship half-enabled. It moves to SET only with counsel's sign-off, and DT-2's fifth row means nobody else may set it. The constraint that bounds it from below is NG-25: whatever the cap, it is a service-level remedy and never an indemnity for the employer's own statutory penalty, interest or damages — that liability is non-delegable (EV-K24) and the parameter cannot be used to imply otherwise.

---

### 20.14 Validation economics — what the programme costs, and what a week of slip costs

The validation plan is the only part of this document that spends money before a line of product exists, so it is worth knowing exactly how much, on what, and what is bought. The answer is unusual enough to be worth stating up front: **the part of the programme that unblocks the build is almost free, and the part that costs money unblocks nothing but the decision to spend more.**

**Cash.** Only four items carry a cash estimate; every other item is either zero-spend desk work, engineering time, or dependent on an external party's quotation.

| Item | Cash | Track |
| --- | --- | --- |
| V-01 bureau mystery shop | ₹0–50,000 | Commercial |
| V-02 Tally-partner enablement | ₹0–1,00,000 | Commercial |
| V-07 willingness to pay | ₹1,00,000–3,00,000 | Commercial |
| V-09 state PT and LWF dataset | ₹1,00,000–2,00,000 | Desk, build-blocking |
| V-25, V-27, V-29 | Counsel and broker fees, unsized (`counsel_retainer_monthly`) | Desk, counsel |
| Everything else | ₹0 incremental | Desk, spike, or rides on another item's conversations |

The totals are worth writing out because their ratio is the argument. **Commercial track:** ₹0 + ₹0 + ₹1,00,000 = **₹1,00,000** at the low end, and ₹50,000 + ₹1,00,000 + ₹3,00,000 = **₹4,50,000** at the high end. **Desk track:** **₹1,00,000 to ₹2,00,000**, all of it V-09, plus unsized counsel fees. **Whole programme:** ₹2,00,000 to ₹6,50,000 in cash, excluding counsel. Against that, the desk track alone releases every fence in §05 that is within our control, and the commercial track releases none (§20.6's release matrix). Any sequencing that delays the desk work to fund the field work has the ratio backwards.

**Engineering time.** Four spikes are sized in engineering weeks and two are built into product rather than run separately.

| Item | Engineering effort | Note |
| --- | --- | --- |
| V-11 ADMS/WDMS push bench test | 1–2 eng-weeks | The best-evidenced architectural call in the corpus; also the cheapest to test |
| V-04 token profile | 2–3 eng-weeks | Prototype only, under the PRD-only constraint's explicit exception |
| V-15 mid-year cutover dry run | 2–3 weeks plus one design partner | The partner, not the weeks, is the scarce input (R-47) |
| V-10 device fleet spike | 2–4 eng-weeks | Needs representative hardware including pre-ADMS firmware |
| V-14, V-26 | Built into v1 and into the first attended cycles | Not separable effort; they are instrumentation, not studies |

That is **7 to 12 engineering weeks** of spike work in total, every week of it requiring founder sign-off under the standing project constraint. The ordering inside it is not arbitrary: V-11 is cheapest and most load-bearing, so it runs first, and a V-11 failure changes V-10's scope before V-10 is started.

**Elapsed time, and what actually binds each gate.** The binding constraint differs by gate, and only one of the three is bound by our own effort.

| Gate | Binding item | Bound by | Consequence |
| --- | --- | --- | --- |
| Gate 0 | V-09 at 6–10 weeks for effort; **V-08 and V-22 for time** | An external date — the ~21 November 2026 lapse of the ESI saving — not by how fast anyone reads | Gate 0's clearance cannot be pulled forward by working harder. It can only be *prepared for*, which is what R-2's pre-built contingency is: freeze, banner, block ESI filing, escalate |
| Gate 1 | V-03 at 4–8 weeks and V-05 at 6–8 weeks, run concurrently | Interview scheduling, which is not estimated anywhere in this plan and is the real variance | **6–8 weeks of fieldwork** plus an unestimated scheduling lead. Treat the lead as the risk, not the interviews |
| Gate 2 | V-07 at 6–10 weeks, which cannot sensibly start before Gate 1 | Sequence, not effort | Roughly **12–18 weeks cumulative** from programme start, if the spikes run in parallel underneath |
| Launch gate | V-25, per portal | Counsel's queue (R-48) | Opens portal by portal; an uncleared portal ships artefact-only rather than waiting |

**The cost of a week of slip, by track.** This is the table that makes the split in §20.6 operational rather than rhetorical.

| What slips | Immediate cost of one week | Recoverable? |
| --- | --- | --- |
| A build-blocking desk item (V-09, V-17, V-18, V-20, V-21, V-23, V-24) | One week of a fenced build item; the fence holds and nothing ships on a guess | Yes — the work is elapsed-bounded and free |
| A dated desk watch (V-08, V-22) | Nothing, until the date; after the date, ESI correctness for every ESI-liable tenant | **No** — the date does not move, which is why R-2 is reviewed weekly from October 2026 |
| V-19 (Form 138 Q4 watch) | Nothing, until `form138_q4_escalation_date`; after it, the Q4 statement and the Tax Year 2026-27 certificate for every affected tenant | Partly — the fence holds, but the tenant notice must go out *before* the escalation date, not after |
| A commercial item | One week of a funding decision. No code, no fence, no customer | Yes |
| A counsel item (V-25, V-27, V-29) | One week of attended submission on that portal; the artefact-only fallback keeps shipping | Yes, portal by portal |
| A spike | One week of a roadmap estimate, not of a roadmap | Yes |
| A live-cycle item (V-23, V-26) | One filing cycle of measurement — and these only occur monthly | Partly — a missed cycle is a month, not a week |

Two consequences follow directly. First, **slipping a commercial item is cheap and slipping a dated desk item is not**, which inverts the usual instinct that customer work is urgent and reading is not. Second, the items that cannot be recovered by spending more — the ESI cliff, the ISO 27001 seasoning clock (R-16), and the Q4 tenant notice — are exactly the ones with no cash line in the table above. The programme's real currency is calendar, and its scarcest inputs are a design partner (R-47) and counsel's queue (R-48), neither of which is bought by increasing the budget.

<!-- DIAGRAM: nongoals-validation-risk-programme-critical-path -->

---

### 20.15 Pre-registration protocol and the validation dossier

Standing rule 9 says a validation's kill criterion and pass threshold are written before data collection and filed. This subsection is that rule made operable: the form, who signs it, what cannot change afterwards, and what the closed item leaves behind. It exists because the bias this document is built against does not announce itself as dishonesty — it arrives as a reasonable-sounding reinterpretation, three weeks in, by someone who has seen the first four data points.

**The pre-registration form.** One page per validation, filed before the first datum.

| Field | Content | Changeable after `start`? |
| --- | --- | --- |
| Validation id and title | `V-<n>` and the question in one line | No |
| Hypothesis | Stated so a specific observation would refute it | No |
| Instrument | The literal script, guide or query — attached, not described | No |
| Sampling frame | Who or what is eligible, how many, and how selected | No |
| Pass threshold | The decidable green condition | No |
| Amber band | The decidable widen-the-sample condition | No |
| Kill criterion | The decidable red condition | No |
| Artefact | What will exist at the end | No |
| Decision gated | Gate id, and the specific decision inside it | No |
| Owner and counter-signatory | The item owner, and the gate owner who counter-signs | Reassignable, logged |
| Filed date, collection start date | Two separate dates — the gap between them is where amendments are legal | No |
| Known conflicts | Anything that would make the owner prefer one result (a forecast already circulated, a hire already planned) | Appendable |

The **Known conflicts** field is the one most likely to be skipped and the one that most often explains a later dispute. It costs a sentence and it makes the reader of the result aware of what the collector wanted.

**Immutability.** The record is append-only. An amendment before collection creates a new version with its reason attached and the prior version retained. After collection starts, the sealed fields cannot change at all — an owner who believes a threshold is wrong must close the record WITHDRAWN and file a new one with a new id, which is deliberately more expensive than living with an imperfect threshold. R-43 watches for exactly this and voids results that breach it.

**The dossier at close.** Every closed validation leaves the same package, because a result nobody can audit is a result that will be re-argued at the next inconvenient moment.

1. The pre-registration record, in all its versions.
2. The raw captures — quotes verbatim with name, city tier and date; gazette PDFs or URLs with capture dates and corrigendum-check dates; instrumentation exports; session logs.
3. The artefact named in the record.
4. The result statement, written once, referencing the artefact.
5. The state transition record: who closed it, as what, on which date.
6. The downstream edits made because of it — the §02 evidence rows changed, the §20.4 register rows changed, the fences released, the parameters set, the risks retired.
7. Any contradiction found against an existing `[Verified]` row, registered per R-51 before it was resolved.

Retention is `validation_dossier_retention_years` (§20.13, Legal), and the reason to name it as a parameter rather than pick a number is that it interacts with the retention classes in §14 and with counsel's view on what a regulated buyer's due diligence may reach.

**The ten-minute audit.** A reviewer checks a closed validation by asking six questions in order, and stops at the first failure: (1) Is there a pre-registration record, and is its filed date before the collection start date? (2) Are the sealed fields identical between the filed version and the closed record? (3) Does the artefact named in the record exist? (4) Does the result statement decide the item against the *pre-registered* threshold, in the threshold's own units? (5) Were the downstream edits actually made — is there a changed line in §02, §05, §18 or §20.13 to point at? (6) If the result contradicts anything previously `[Verified]`, was the contradiction registered before it was resolved? A validation that survives all six is citable in a model, a deck or a board pack. One that fails any of them is research, and is labelled as such.

**Worked example — V-01's pre-registration, written out.** This is the form filled in, and it is included because "pre-register your threshold" is abstract until someone sees one.

- **Id and title:** V-01 — what does a CA or bureau actually charge to run monthly payroll, and does the fee include filing?
- **Hypothesis:** at 50 employees, a practising CA or bureau's all-in monthly fee *including* ECR generation and upload, ESI challan, PT return and the quarterly TDS statement is at or above ₹2,500.
- **Instrument:** the fixed script in §20.6 — monthly fee at 20, 50 and 100; whether the fee includes filing or only computation; setup or onboarding fee; who is liable for a late or rejected filing; per-payslip versus flat pricing; treatment of arrears and mid-year joiners.
- **Sampling frame:** 6–8 practising CAs or bureaus, four in a Class A metro and four in a Class B city, approached as a real employer of that size.
- **Pass threshold:** ≥6 of 8 quote ≥₹2,500/month all-in at 50 employees with filing included.
- **Amber band:** quotes straddle ₹2,000 with wide variance by city tier.
- **Kill criterion:** a credible all-in-with-filing quote under ₹2,000/month at 50 employees — a single one is enough, because this is falsification, not averaging.
- **Artefact:** a quote table of city tier × headcount × price × filing scope, with names and dates.
- **Decision gated:** Gate 1 — the pricing model in §18, and the first §20.11 kill condition's price half.
- **Known conflicts:** the ₹80–150 PEPM target already appears in §18 as a `[Hypothesis]`, and a low quote invalidates it. The owner of V-01 is also the owner of §18.

Note what the threshold does *not* say. It does not say "most bureaus are expensive"; it converts the question into ₹2,500 at a stated headcount with a stated scope, which is ₹50.00 PEPM — the same value floor the six-vendor table independently produces (EV-027). When two different methods land on the same number, the threshold is doing real work rather than encoding a preference.
---

### 20.16 Register integrity — the checks that run against this section itself

Every control in §20.1–§20.15 watches something outside itself. These twenty-three watch the controls. They are written to be executed mechanically against the PRD, the validation dossiers and the rule store — a reviewer with the files and an afternoon can run all of them — because a register whose own condition is never tested becomes documentation of a discipline rather than the discipline (R-52).

| # | Check | Runs against | Pass condition | A failure means | Owner | Cadence |
| --- | --- | --- | --- | --- | --- | --- |
| C-01 | Every `[Hypothesis]` marker in the PRD resolves to a validation id | The whole PRD | Zero unregistered hypotheses | A claim is being carried with no plan to test it — the orphan condition §02 names | Research lead | Each PRD version |
| C-02 | Every validation has a pre-registration record filed *before* its collection start date | Validation dossiers | Filed date strictly earlier than start date | R-43: the threshold could have been set knowing the data | Gate owner | On each `report` |
| C-03 | Sealed fields are identical between the filed and closed versions | Validation dossiers | Byte-identical on the sealed set | The result is void and the item re-runs | Gate owner | On each `close_*` |
| C-04 | Gate membership agrees in both directions — every item names its gate, every gate lists that item | §20.6, §20.7 | Two lists reconcile exactly | An item is gating a decision nobody knows about, or a gate is waiting on nothing | Founder | Each PRD version |
| C-05 | Every closed validation's downstream edits exist | §02, §05, §18, §20.4, §20.13 | A changed line can be pointed at for each | The result was recorded and not applied — the most common quiet failure | Research lead | On each `close_*` |
| C-06 | Every risk whose detection class is "validation report" reconciles to that validation's state | §20.8, dossiers | No risk still WATCHING whose validation closed FAIL | A trigger fired and nobody was told | Risk owner | Each cadence |
| C-07 | Every risk row has a trigger, watcher, cadence, response, owner and residual | §20.8 | No empty cells | The row is decoration | Founder | Each cadence |
| C-08 | No pre-agreed response contains a deferral verb — "assess", "review and decide", "consider our options" | §20.8 | Zero matches | The response was never agreed, only postponed | Founder | Each cadence |
| C-09 | Every watchlist line carries a `last_reviewed` date within one cadence interval | §20.10 | All six current | R-52: the register is going stale | Founder | Each cadence |
| C-10 | Every banned-figure row has evidence, a reason and either a replacement or an explicit "unrecoverable" | §20.4 | No incomplete rows | A ban nobody can defend gets quietly ignored | Research lead | Each PRD version |
| C-11 | The scan ran on every artefact class in `banned_number_scan_artefact_classes` before external release | Release log | A scan record per released artefact | Standing rule 6 is not fail-closed in practice | Research lead | Per release |
| C-12 | Every figure in the §20.4 qualifier table appears only with its qualifier | Released artefacts | Zero stripped occurrences | TC-06's failure — a correct number becoming a wrong claim | Research lead | Per release |
| C-13 | Every parameter another section routes to §20 belongs to exactly one family row in §20.13 | Whole PRD, §20.13 | No orphans, no duplicates across families | A parameter with no sizing route will acquire a guessed value (R-46) | Statutory | Each PRD version |
| C-14 | No parameter carries a value anywhere without a dated source or a recorded owner decision | Rule store, configuration | Every value has provenance | R-46, and it is undetectable downstream until a filing rejects | Statutory / Eng | Each release |
| C-15 | The four spellings of the gratuity payable ceiling resolve to one stored value | Rule store | One value, four aliases | Two ceilings drift apart and two employees get different answers | Statutory | Each release |
| C-16 | No parameter whose route is counsel has been set by anyone else | §20.13, rule store | Zero exceptions | A legal determination has been made by an engineer | Legal | Each release |
| C-17 | Every non-goal has a populated `instead`, and every timing-gated one a `reopen_gate` | §20.1 | No empty fields | A decline with no alternative is a product gap wearing a decision's clothes | Product | Each PRD version |
| C-18 | Every `[Reversed]` marker carries its one-line reason at each place the reversed claim appears | Whole PRD | No bare reversals | The old claim is re-imported from an older draft within one quarter | Research lead | Each PRD version |
| C-19 | Every EV row §20 depends on is within its recapture cadence | §20.17 | No overdue captures | R-45: a stale capture is being quoted as current | Research lead | Each cadence |
| C-20 | Every mirror-sourced EV row cited in a customer-facing artefact has a recorded primary-source pull | Released artefacts | One pull record per citation | R-50 | Legal | Per release |
| C-21 | Every §20.9 edge case has a rule in the versioned store, a boundary test case, and a reconciliation check | Rule store, test suite | Three artefacts per row | R-30 becomes undetectable — the engine runs correctly and produces a wrong number | Eng / Statutory | Each release |
| C-22 | Every §20.11 kill condition maps to at least one validation whose result could decide it | §20.6, §20.11 | Four conditions, all decidable | A kill condition nobody can evaluate is a comfort, not a control | Founder | Each PRD version |
| C-23 | No section other than §20 defines a banned figure, a kill criterion or a whole-thesis condition | Whole PRD | Single source | Two registers drift and the looser one gets cited | Research lead | Each PRD version |

**How a failure is handled.** A failed check is recorded as a finding with its date, and it is fixed rather than explained. Three of them fail *closed* — C-11, C-14 and C-16 stop a release rather than raising a ticket — because each is the last control before something leaves the building or reaches a payroll computation. The rest raise a finding with a named owner. The results are published as they are: the whole point of C-09 and C-23 is that they are most likely to fail in the week when nobody wants to run them.

**What the checks cost.** Worth stating, because an unaffordable control is an unrun control. Sixteen of the twenty-three are text or structure comparisons a reviewer runs against the PRD and the dossiers in a single sitting; five run against the rule store and the release log as part of a release; two — C-09 and C-19 — are date comparisons. None needs tooling that does not already exist for the §22 pipeline, and none needs a person who is not already in the loop. Set that against the thing they are protecting: a single wrong statutory number reaching a customer is a filing failure, a remediation, an SLA event and a credibility loss that no amount of subsequent diligence recovers (R-29). The asymmetry is the argument, and it is the same asymmetry that justifies the desk track running first and free.

---

### 20.17 Evidence dependency register — which rows the controls actually rest on

Every register in this section is downstream of specific evidence. When a capture changes, the question is not "is this interesting" but "which of our rows just became wrong". This table answers it in advance. It is also the input to check C-19 and to risk R-45.

| Evidence | What in §20 rests on it | What would invalidate it | Rows that change | Recapture |
| --- | --- | --- | --- | --- |
| EV-008 | The placeholder status of every absolute AI cost figure | V-04 measuring real tokens against a stated corpus | §20.4's placeholder ban, AR-5, V-14's threshold | On V-04 closing |
| EV-012 | The `[Hypothesis]` status of the 144-hour OT figure | V-17 locating or excluding the cap in notified rule text | §20.4's ban row, V-17, `ot_quarterly_ceiling_hours` | On V-17 closing |
| EV-014 | Which state PT schedules are primary-sourced — Maharashtra, Odisha, Karnataka's effect | Retrieving the unretrieved Karnataka instrument, or a repeal taking effect | AR-3's contingency, V-09's scope | Continuous, with V-09 |
| EV-015 | That every other PT state and every LWF figure is undone | Any state's gazette being read at source | V-09's remaining scope, R-5 | Continuous |
| EV-021 | Keka's commented-out per-employee spans | The page being re-authored, or the comments removed | §20.4's qualifier row, §21's price table | Biannual floor (§21.13) |
| EV-022 | The archived FOUNDATION/STRENGTH/GROWTH block card | Nothing — it is archived by definition and quoted as archived | §20.4's qualifier row | Never; archived status is permanent |
| EV-023 | The ₹6,999 live small-business floor, and ₹139.98 PEPM at 50 | A change to the live small-companies page | §20.4's arithmetic, Gate 0's note, R-9's re-key | Biannual floor |
| EV-025 | That Keka never renews below list, and that the setup fee is unquantified | A ToS revision, or either live page quantifying the fee | §20.4's qualifier row, K-17's correction | Biannual floor |
| EV-026 | The 50-seat block in six of six | Any vendor publishing a sub-50 route with a price | R-39, V-31, the seat-floor arithmetic in §20.4 | Biannual floor |
| EV-027 | The two-anchor price structure — floor near ₹50, band ₹80–200 | Any of the six re-pricing its entry tier | V-01's threshold, V-03's kill, R-9, R-40, §20.11 conditions 1 and 4 | Biannual floor |
| EV-028 | That payroll sits in the entry tier everywhere | A vendor moving payroll upward in its tiering | §20.11 condition 2's reasoning, NG-3 | Biannual floor |
| EV-029 | The empirically-located freemium paywall — computation free, outputs paid | Zoho or Kredily moving the line | NG-5, NG-27, AR-4, R-1, R-41 | Biannual floor |
| EV-030 | That no vendor claims to submit any filing | Any of the six adding submission language | R-35, R-36, R-37, §20.11 condition 2, AR-1, AR-4 | Biannual floor — the most consequential null in the document |
| EV-031 | That Frappe v16 has no India statutory engine | A Frappe release or marketplace app shipping state PT, LWF, ECR or Form 138 logic | AR-3, R-7, NG-14, §20.4's Frappe ban, §20.5's reversal | On CQ-05 closing, then per release branch |
| EV-032 | That TallyPrime has no state PT slab table and no LWF engine | A TallyPrime release note or a named TDL add-on | NG-17, NG-19, NG-26, R-38, AR-13 | On a named product appearing — never on a rumour |
| EV-033 / EV-034 | Keeping Ramco and ZingHR out of the competitive set; MYND owning Qandle | A published mid-market price from either, or a MYND filing SKU | R-37, §20.11 condition 2 | Annual |
| EV-035 | The ECR layout, the `#~#` delimiter and the 1,800 / 1,250 / 550 fixture | An EPFO layout change surviving the re-engineered ECR's stability | §20.9's first, correction-window and part-payment rows | On any EPFO release |
| EV-036 | That an approved return can never be cancelled | A portal change permitting cancellation | §20.9's correction-window and arrears rows, R-3's response | On any EPFO release |
| EV-037 | The three return types and their guards | A change to the Revised-return payment guard | §20.9's correction-window and Supplementary rows; the verification-gate placement | On any EPFO release |
| EV-038 | Strict chronology and the four-month relaxation | A change to the relaxation window | §20.9's chronology row, R-31's migration reasoning | On any EPFO release |
| EV-039 | Mandatory auto-calculated 7Q interest, optional-later 14B damages | A change to either treatment | §20.9's interest row, NG-25 | On any EPFO release |
| EV-041 / EV-042 / EV-043 / EV-044 | The exit-date, NIL-month, arrear-fence and part-payment rows | A published arrear layout, above all | §20.9's corresponding rows; V-23's scope; §05's fence | On V-23 capture |
| EV-046 | That the Form 138 Q4 formats are unreleased | Publication of either format | R-4, V-19, `form138_q4_escalation_date`, §05's fence | Every watch cycle |
| EV-047 / EV-048 | Q4 carrying Annexures II and III; Form 130's three parts and TRACES-only validity | A CBDT change to either | R-4's response, §20.9's calendar rows | On CBDT release |
| EV-049 | The Form 138 quarterly due dates and Rule 219 | A due-date extension | The filing calendar, R-4's escalation date | On CBDT notification |
| EV-050 | The dual vocabulary and the six-digit Tax Year field | A CBDT mapping revision | §20.9's vocabulary row, V-20 | On CBDT release |
| EV-051 / EV-052 | The challan sub-heading remap and the dual RPU/FVU stack | A new RPU or FVU version | §20.9's remap and stack rows | On every Protean release |
| EV-054 | That only central-sphere retention periods are stated | Counsel's state-period opinions | `retention.*` routing in §20.13, Part D-11 | On counsel opinion |
| EV-045 | That EPFO's site moved to www.epfo.gov.in, that older printed manual URLs are dead, and that VPF and International Workers stay in ECR scope | A further domain or portal reorganisation | Every watch URL in the statutory watch; V-23's capture targets | On any EPFO release |
| EV-070 | That a multi-tenant Aadhaar verification feature cannot be built — no offline verification on another's behalf, no e-KYC licence-key sharing | A regulatory change to AOVR reg 15(2) or 16A(2) | NG-20, and the Aadhaar-optional behaviour in R-34 | On UIDAI regulation changes |
| EV-057 | The threshold set, including the 10-worker appointment-letter line | A state prescribing a different form or threshold | §20.5's sub-20 reversal row | On state rules |
| EV-053 / EV-055 | That Form IX requires per-day IN and OUT timestamps, so a present-or-absent attendance model is non-compliant, and that form numbers are configurable per state | A state prescribing different forms or a different grid | The attendance-side edge cases feeding §20.9; V-09's state scope | On state rules |
| EV-056 | That the POSH Internal Committee binds *every* employer, and that the ten-worker line is the Local Committee provision | A change to s.4(1) or s.6(1) | §20.5's sub-20 conclusion row | On statutory watch |
| EV-079 | RPwD s.90's due-diligence escape, which is the positioning anchor for the discrimination controls | A judicial reading narrowing the defence | R-55's framing; the must-not-sell sentence in §23 | On case law, and on any customer-facing claim |
| EV-084 | That we are not aware of any Indian case law on algorithmic hiring, as of September 2026 | The first decided case | §20.29's residual row; R-55's residual | Continuous |
| EV-058 | DPDP commencement on or about 13 May 2027, mirror-sourced | Gazetted compression, or the primary pull differing from the mirror | R-22, V-27, R-50 | Continuous until ~May 2027 |
| EV-060 / EV-062 | Today's SPDI written-consent duty and the six-hour CERT-In clock | DPDP s.44(2) taking effect; a CERT-In direction revision | R-21, R-22, R-33 | Continuous |
| EV-087 | RBI materiality-gating, mirror-sourced | A primary pull differing, or a Directions amendment | AR-16, the enterprise re-open gate, R-50 | Before any regulated-buyer statement |
| EV-088 | The four-line COGS stack and the per-registration cost scaling | V-26 and V-30 sizing the dominant line | AR-5, AR-21, NG-27, §20.11 condition 4, R-10 | On V-26 closing |
| EV-089 | The 52.7× ratio, ₹94.43 FX, and the 1 Jan 2027 Gemini change | An FX move past the modelled range; a provider re-pricing | §20.4's FX row and ratio row, R-12, R-13 | Quarterly |
| EV-090 | AI posture as claim-posture, not tested product | Any of the claims being tested in product | NG-3, AR-17, R-8 | Biannual floor |
| EV-091 | greytHR's "30,000+ companies", capture-dated | A new vendor claim | §20.4's ban row and qualifier row | Biannual floor |

<!-- DIAGRAM: nongoals-validation-risk-evidence-dependency -->
---

### 20.18 Risk rehearsals — the ten tabletops to run before the first paying customer

A pre-agreed response is a hypothesis about our own behaviour, and it is the only hypothesis in this document with no validation item attached. These rehearsals are that validation. Each is a ninety-minute exercise against a scenario built only from facts this PRD has verified; each has a pass condition that is about *the register*, not about the scenario. The point is never to solve the scenario in the room — it is to discover which register row turns out to be unusable when someone actually tries to follow it.

**TT-1 — A corrigendum inverts an implemented position, three days before the 15th.**
- *Entry condition:* the ECR generator is live for at least one tenant and the rule store holds an implemented instrument.
- *In the room:* Statutory owner, engineering owner, support lead, Founder.
- *Script:* an amendment to an already-implemented instrument is published on the 12th. It changes a value that has already been used in a computed, approved-but-unpaid return for the current month.
- *Expected path:* R-3 fires from the amendment-keyed watcher, not from a new-instrument feed. The delta is computed for affected periods against the corrected rule version as a **diff**, never as a mutation of a filed period. The correction routes through a Revised return only if payment has not been initiated (EV-037); if it has, the correction is a later-period diff. §22's staged publish and two-person review run at speed but not skipped.
- *Pass condition:* the room can name, without opening the PRD, which return type applies and why the payment-initiation state decides it. Failure here is the finding — it means EV-037's guard has not reached the people who will act on it.
- *Artefact:* a timed log of the decision path, and any register row rewritten as a result.
- *What it is really testing:* whether "the watcher is amendment-keyed" is true in the tooling, or true only in the document.

**TT-2 — 21 November 2026 arrives with no ESIC successor scheme.**
- *Entry condition:* run this one before October 2026, not after — the rehearsal is worthless once the date is close.
- *In the room:* Statutory owner, Founder, support lead.
- *Script:* the saving lapses. V-08's watch log shows checks completed and no successor notified, no corrigendum.
- *Expected path:* R-2's pre-built contingency — freeze ESI computation to the last valid saved scheme with a dated banner; **block ESI filing** rather than file against a lapsed rule; escalate to statutory counsel. V-22's EPS and EDLI question rides alongside.
- *Pass condition:* the banner text exists already, the block is a switch rather than a code change, and support knows what to tell a customer whose ESI filing is blocked. If the banner has to be written in the room, the contingency was not pre-built.
- *Artefact:* the banner copy, the customer-communication template, and the list of tenants affected.
- *What it is really testing:* whether "freeze and block" survives contact with a customer who wants to file anyway.

**TT-3 — An ECR return rejects at upload, on the 15th, for a live tenant.**
- *Entry condition:* one attended cycle has run.
- *In the room:* Ops operator, statutory owner, engineering owner, support.
- *Script:* the file uploads and the portal rejects it. The rejection concerns a member whose UAN name differs from EPFO records by an initial.
- *Expected path:* R-30 first — this is a boundary case, not an outage. The pre-upload validator should have caught it, so the first question is why it did not. R-29 fires only if the return then misses the due date. The correction is a data fix and a re-upload, and the ledger records the attempt, the rejection and the resolution rather than only the eventual success.
- *Pass condition:* the room distinguishes R-30 from R-29 correctly, and nobody proposes editing the filed record to make the history tidy.
- *Artefact:* the rejection file itself, captured — it is also a V-23 input, since the error-file schema is not publicly documented.
- *What it is really testing:* whether a rejection is treated as evidence to capture or as an embarrassment to clear.

**TT-4 — A security incident touches an AI call path, and the clock is six hours.**
- *Entry condition:* the redaction chokepoint and LLM logging are live.
- *In the room:* engineering owner, security owner, Legal, Founder.
- *Script:* anomalous behaviour is detected on an inference pipeline — the AI/ML incident class CERT-In's Annexure I contemplates.
- *Expected path:* R-21's obligations bind from day one: the named CERT-In point of contact reports within **six hours of becoming aware**, the 180 days of ICT logs are retained within Indian jurisdiction, and clocks are NTP-synced so the timeline is defensible. R-26's controls are checked. The DPDP breach-notification regime is *not* in force and is not invoked (K-05, K-07).
- *Pass condition:* the room knows who the point of contact is by name and can start the clock without looking it up. A six-hour clock that begins with "who do we call" has already lost an hour.
- *Artefact:* the incident timeline with the awareness timestamp explicitly marked.
- *What it is really testing:* that nobody in the room reaches for a 72-hour clock (K-07).

**TT-5 — A competitor publishes a priced attended-submission offer at the value floor.**
- *Entry condition:* any time after Gate 0.
- *In the room:* Founder, GTM, research lead.
- *Script:* one of the six publishes a card that includes submission, at or near ~₹50 PEPM, for the 20–200 band.
- *Expected path:* R-35, R-36 or R-37 fires by vendor. The observation is captured with its date and its capture mode before any response. §20.11's second kill condition is then evaluated against the *published, priced* test — not against a demo claim or a roadmap slide. If the same vendor has also dropped its seat floor (R-39), the combination is a review trigger and the four conditions are worked before further spend.
- *Pass condition:* the room reaches the §20.11 evaluation rather than a positioning discussion, and nobody asserts the competitor's submission is inferior without an executed, dated comparison (§21).
- *Artefact:* the dated capture; the §20.11 review record if the condition fires.
- *What it is really testing:* whether the thesis review can be convened by evidence rather than by crisis.

**TT-6 — A kill condition resolves against the thesis.**
- *Entry condition:* after Gate 1 reports.
- *In the room:* Founder alone first, then the team.
- *Script:* V-16 reports near-zero filing pain and V-01 reports a credible ₹1,500/month all-in-with-filing quote at 50 employees — ₹30.00 PEPM against a ₹80–150 target that is ₹4,000–₹7,500/month at the same headcount.
- *Expected path:* §20.11's first condition has resolved against the thesis. The response is the recorded review, the halt on further commitment, the retention of the desk-track outputs, the holding of the fences, and re-entry at Gate 0 if a re-scope survives.
- *Pass condition:* the review record gets written in the rehearsal. R-49 exists because this is the response most likely to be skipped, and a rehearsal that ends in "we'd probably want more data" has found the defect it was looking for.
- *Artefact:* a written review against all four conditions, in the format it would take for real.
- *What it is really testing:* whether the organisation can say the words out loud while nothing is at stake.

**TT-7 — A banned figure is found in an investor deck that has already circulated.**
- *Entry condition:* any external artefact exists.
- *In the room:* Founder, research lead.
- *Script:* a slide reads "addressable base: 5.31 Cr Udyam registrations", in a deck sent to four recipients last week.
- *Expected path:* R-44. The scan catches it — or, worse for us, a recipient does. Correct at source; re-issue with the corrected denominator stated as **contributing** establishments; tell the recipients rather than hoping. The overstatement is ~69×, which is not a rounding difference anyone will forgive as a typo.
- *Pass condition:* the room's default is to re-issue and inform, not to wait and see whether it comes up.
- *Artefact:* the corrected artefact and the note sent.
- *What it is really testing:* whether standing rule 6 is genuinely fail-closed once an artefact has left the building.

**TT-8 — A design partner's authorised signatory refuses the written authority, mid-onboarding.**
- *Entry condition:* before the first attended cycle.
- *In the room:* Founder, Legal, Product, Ops.
- *Script:* the signatory will not execute an authority to act on the employer's EPFO credentials, citing internal policy on credential sharing.
- *Expected path:* V-32 records the refusal and the reason verbatim — this is data, not an objection to overcome. The tenant ships artefact-only with an employer-operated submission runbook, which is the same fallback an adverse V-25 produces. R-47 fires if this is the only partner, because V-15, V-23 and V-26 all depend on one.
- *Pass condition:* nobody offers a workaround that puts credentials outside the vault or a session outside the log (NG-28), and the refusal is filed as a V-32 datum rather than treated as a lost deal.
- *Artefact:* the verbatim refusal and the redline of the clause objected to.
- *What it is really testing:* that the commercial path for attended filing is validated from the buyer's side, not assumed from the legal side.


**TT-9 — A published rule turns out to be wrong, and must be rolled back mid-cycle.**
- *Entry condition:* the §22 pipeline has published at least one rule to production.
- *In the room:* Statutory owner, engineering owner, Ops, support.
- *Script:* a rule published three days ago fails a golden case discovered during a tenant's payroll run. Two tenants have already processed against it.
- *Expected path:* the parameter moves to ROLLED_BACK and re-enters IN_SIZING rather than being edited in place (§20.13's lifecycle); the two affected runs are recomputed as diffs against the corrected rule version for the affected periods; the golden case that caught it is added to the regression corpus, and the one that should have caught it earlier is identified (C-21); if a return has been approved, EV-036 and EV-037 decide the correction route.
- *Pass condition:* nobody proposes editing the published value in place to avoid the rollback, and the room can say which tenants processed against it without asking engineering to query production.
- *Artefact:* the rollback record, the recomputation diff, and the new golden case.
- *What it is really testing:* whether effective-dating is real in the store, or whether "the current value" is the only value the system can express.

**TT-10 — An employee exercises Aadhaar optionality mid-cycle, and a filing needs a seeded member.**
- *Entry condition:* one EPF filing cycle has run.
- *In the room:* Product, Ops, Legal, support.
- *Script:* an employee declines Aadhaar. The month's ECR is being prepared and that member cannot be seeded.
- *Expected path:* R-34's default — **exclude-and-flag with operator and employee notices, never block payroll**. Payroll runs and pays in full; the member is excluded from the return with both notices issued; the exclusion is visible and correctable, not silent. No configuration is offered that makes Aadhaar a condition of employment, payroll or any benefit (Part D-10), and the final choice on the behaviour is counsel's (§23).
- *Pass condition:* nobody in the room proposes a hard block "just for this tenant", and support can explain the exclusion to both the employer and the employee without asserting a legal position.
- *Artefact:* the operator notice, the employee notice, and the ledger entry showing the exclusion against the month.
- *What it is really testing:* that "Aadhaar is optional everywhere" survives the first month it is inconvenient — and that the member's exclusion is treated as a state to resolve, not as an error to hide.
**Scheduling and what a rehearsal produces.** TT-2 runs before October 2026 because its value expires. TT-1, TT-3, TT-4, TT-8 and TT-10 run before the first paying customer. TT-9 runs as soon as the first rule has been published to production. TT-5, TT-6 and TT-7 run once each, whenever their preconditions exist, and are re-run only if the register rows they exercise change. Every rehearsal produces the same two outputs: a timed log, and a list of register rows that turned out to be unusable as written — which is the actual deliverable. A tabletop that changes nothing in the register either found a genuinely healthy row or was not run honestly, and the difference is visible in whether anyone had to look something up.
---

### 20.19 Decision tables — the registers at the moment they are used

The registers are written to be read once and applied many times. These eight tables are the applying. Each collapses a recurring question into conditions and a verdict, so the answer does not depend on who is in the room or how late in the quarter it is.

**DT-1 — A new open question has appeared. Which track does it belong to, and what does it block?**

| Needs a customer, CA or partner? | Blocks a build item? | Needs counsel? | Needs code or a live cycle? | Track | Gate | Owner |
| --- | --- | --- | --- | --- | --- | --- |
| No | Yes | No | No | **Desk — build-blocking** | Gate 0 | Statutory |
| No | No | No | No | **Desk — watch** | Continuous | Statutory or Research |
| No | Yes or No | Yes | No | **Desk — counsel** | Launch gate, or none | Legal |
| No | Yes | No | Yes | **Spike** | Gate 2 | Eng / Product |
| No | No | No | Yes, and only in production | **Spike — live** | Gate 2, measured after | Eng or Ops |
| Yes | No | No | No | **Commercial** | Gate 1 | Founder / GTM |
| Yes | Yes | Any | Any | **Split it.** A question that both blocks code and needs a buyer is two questions wearing one id | Both | Both |

The last row is the one that matters. A merged question inherits the slowest track, which is how a gazette read ends up waiting on an interview schedule.

**DT-2 — May this parameter take a value?**

| In a §20.13 family? | Its route executed? | Dated source or recorded owner decision? | Counsel route, and counsel signed? | Verdict |
| --- | --- | --- | --- | --- |
| No | — | — | — | **No.** It is an orphan (C-13). Assign it to a family with a route first. |
| Yes | No | — | — | **No.** The route is the evidence; skipping it produces R-46's undetectable wrong value. |
| Yes | Yes | No | — | **No.** A value without provenance fails C-14 and stops the release. |
| Yes | Yes | Yes | Route is not counsel | **Yes.** Set it, record who set it and on what. |
| Yes | Yes | Yes | Route is counsel, not signed | **No.** C-16. An engineer has otherwise just made a legal determination. |
| Yes | Yes | Yes | Route is counsel, signed | **Yes**, with the opinion referenced in the rule store entry. |
| Yes | Yes | Yes, but the source is an aggregator | — | **No.** Aggregator data may flag a discrepancy to chase to the gazette, and nothing else (§20.12 rule 1). |

**DT-3 — A validation reported, and the result is neither the pass threshold nor the kill criterion.**

| Result location | Sample exhausted? | Gate date near? | Action |
| --- | --- | --- | --- |
| Inside the amber band | No | No | **Widen the sample** under the same thresholds. File the widening plan; do not touch the threshold. |
| Inside the amber band | Yes | No | Close AMBER. The gate may clear conditionally, expiring at `gate_conditional_clearance_expiry_days`. |
| Inside the amber band | Yes | Yes | Close AMBER and clear the gate conditionally **with the decision narrowed** — take only the decisions that hold under both the amber and the red reading. |
| Outside every band — the question turned out to be the wrong question | — | — | Close WITHDRAWN, file a new record with the right question, and say plainly in the dossier that the original hypothesis was mis-specified. This is a legitimate outcome and it is not a failure of the item. |
| Result contradicts an existing `[Verified]` row | — | — | **Register the contradiction first** (R-51), then resolve it. Both captures survive with their dates and capture modes. |

**DT-4 — A competitor observation has arrived. What changes?**

| Observation | Source quality | What changes |
| --- | --- | --- |
| A published price on the vendor's own page | Captured with URL, date and capture mode | The §21 price table and any §20 row citing it; re-run the §20.4 scan across live artefacts if a quoted figure moved |
| A published *capability* on the vendor's own page | Documentation read, product not executed | The parity row, labelled "documentation read". Nothing customer-facing until the claim clears §21's rule |
| A claim in vendor marketing or a press piece | Secondary | Nothing. It may open a CQ; it may not change a register row |
| A rumour, a rep's report, or a prospect's statement | Field signal | Nothing directly. Log it verbatim with date and account; verify the named product before any sweep is re-run |
| A capability observed in an executed trial | Product executed, dated | The parity row, and any non-goal or anti-recommendation resting on its absence — this is the only source class that can reverse a `[Verified]` negative |
| Any of the above, where our register says the opposite | Any | R-51 applies before anything else: register the contradiction, keep both captures |

**DT-5 — A filing failed. Which register row owns it?**

| Symptom | Owning row | First question |
| --- | --- | --- |
| The file rejected at upload on a boundary condition — a ceiling, a period edge, a member state | **R-30** | Why did the pre-upload validator not catch it? |
| The computed number diverges from the rule for the period | **R-15** if it is the wage add-back; **R-30** otherwise | Was the rule version for the period used, or today's? |
| The rule we implemented was amended and we did not notice | **R-3** | Is the watcher keyed to amendments, or only to new instruments? |
| The format changed and our generator did not | **R-4** for Form 138; the §22 pipeline otherwise | Was the release watched on the page's anchors, or on its footer? |
| The return was correct and late | **R-29** | Which upstream failure consumed the time — and was the tenant told before the due date? |
| A member silently dropped out of the return | **R-30**, UAN row, and **R-34** if the cause is an exercised Aadhaar option | Was the exclusion flagged to the operator and the employee, as Part E-11 requires? |
| The portal changed and the runbook no longer works | **R-32** | Do the portal's terms still permit attended operation? |

Routing matters because each row has a different pre-agreed response, and the most expensive mistake is to treat an R-3 as an R-30 — one is a data fix, the other means every affected period is wrong.

**DT-6 — May this statement about the law appear in a customer-facing artefact?**

| Statement type | Precondition | Verdict |
| --- | --- | --- |
| What a gazette or notified rule says, quoted with its citation and capture date | Standing rule 1 satisfied | **Yes** |
| The same, where the underlying row is `[Verified — mirror]` | Primary source pulled and the pull recorded | **Yes** after the pull; **No** before it (R-50) |
| An interpretation of what a rule means for that customer | — | **No.** NG-24. Route to the customer's own adviser |
| Anything on the Part D list | — | **No** without counsel; say "statutory basis under counsel review" and route to §23 |
| A claim that our controls are legally mandated | — | **No.** They are sold as defensibility, never as a mandate (Part D-18) |
| A claim that a competitor's published data is wrong | — | **No**, as a sales claim, in any form |
| An unprovable negative | — | Only as "we are not aware of any … as of September 2026" |

**DT-7 — Something new has turned up. Which register does it belong in, if any?**

| It is… | Test | Register | Id family |
| --- | --- | --- | --- |
| A thing we could build and are declining | Would a reasonable person expect us to build it, and can we state what we do instead? | §20.1 non-goals | `NG-` |
| A strategy someone would propose in a planning meeting, that the evidence contradicts | Can it be written as a plausible pitch followed by a counter with evidence? | §20.2 or §20.3 | `AR-` |
| A number proven false or structurally contaminated | Does it have a reason, evidence, and a replacement or an explicit "unrecoverable"? | §20.4 | Table row |
| A conclusion we previously held and no longer do | Was it believed, acted on in a draft, and disproven? | §20.5 | Table row |
| A question whose answer changes a decision | Does it have a method, an owner, a gate and a kill criterion? | §20.6 | `V-` |
| An event that would change our position, that someone could observe | Is there a named surface where a named person would see it? | §20.8 | `R-` |
| A boundary at which the engine would produce a wrong number | Does it have a rule, a worked example and a failure mode? | §20.9 | Edge case row |
| A value the evidence does not give | Does it have a family, a route and an owner? | §20.13 | Parameter |
| A recurring judgement call | Can it be written as conditions and a verdict? | §20.19 | `DT-` |
| A capability another section specifies | — | **Not here.** §20.25's boundary applies — route it to the owning section | — |
| An opinion, a preference or a worry with no trigger | — | **Nowhere.** It is UNOBSERVABLE by construction and admitting it degrades the cadence (AP-12) | — |
| A fact | — | **§02.** Only §02 registers evidence rows; this section cites them | `EV-` |

The last three rows carry the value. Most things that arrive wanting to be in a risk register are either another section's design decision, a fact, or an anxiety — and each has a right home that is not this one.

**DT-8 — May a fenced item ship?**

| The blocking fact | Its state | Verdict |
| --- | --- | --- |
| An external publication (Form 138 Q4 formats, an arrear layout) | Unpublished | **No.** The fence holds; the tenant notice goes out before the escalation date instead |
| An external publication | Published, generator built, not yet regression-tested against a golden file | **No.** It ships after it passes the FVU of the matching stack, not before |
| A portal fact | Captured on one registration only | **Partially** — ship the path that fact supports, keep the rest fenced, and say which is which |
| A counsel opinion | Not delivered | **No** for the attended path; **yes** for the artefact-only path with an employer-operated runbook |
| A counsel opinion | Delivered and adverse for that portal | **Artefact-only, permanently for that portal**, until the portal's terms or counsel's answer change |
| A statutory value | Located but worded differently from the carried assumption | **Yes**, after the engine constraint is changed to match the text — never by carrying the old constraint with the new citation |
| A statutory value | Not located | **No** value ships; the computation routes to operator review rather than auto-approval |
| Any of the above | A release date is at risk | **No.** A slipped desk item is escalated through §05's fenced list, never waived to keep a date (AP-09) |
---

### 20.20 Response playbooks for the watchlist six

The register's "pre-agreed response" column is one sentence because the table has to stay readable. These are those sentences expanded into what someone would actually do, in order, in the hour the trigger fires. Only the six watchlist lines get a playbook; the other rows are managed by the response text plus the decision tables above.

**P-1 — R-2, the ESI regime at the 22 November 2026 cliff.**
1. *Confirm the trigger properly:* the watch log shows a check on or after the lapse date, including a corrigendum check, with no successor scheme notified. Absence of news is not the trigger; a completed check with a null result is.
2. *Freeze:* ESI computation pins to the last valid saved scheme, effective-dated, with a dated banner on every affected screen and payslip artefact.
3. *Block ESI filing* rather than file against a lapsed rule. This is the step that will be argued about, and it is pre-agreed precisely for that reason.
4. *Tell every ESI-liable tenant in writing*, before its next filing date, what is frozen and what is blocked — and that the employer's own liability is unchanged.
5. *Escalate to statutory counsel* with the watch log attached.
6. *Decision owner:* Statutory, escalating to Founder. *Closure:* a successor instrument located with gazette, date and corrigendum check (V-08), or an extended saving.
7. *Never:* guess a successor rate, carry the lapsed one silently, or file "provisionally". V-22's EPS and EDLI question rides on the same log.

**P-2 — R-16, the ISO 27001 seasoning clock.**
1. *The trigger is silent* — nothing happens on the day you should have started. The cadence report answers "started: yes or no, and on what date", and nothing else counts.
2. *If not started:* start it in the same week, with no customer asking and no revenue attached. Acquisition runs 3–6 months and the seasoning clock adds twelve, so it must be in hand by around month six to matter at month eighteen.
3. *Decision owner:* Founder. There is no delegation of this one, because every reason to defer it is a good reason and the aggregate of good reasons is the failure.
4. *Closure:* certification held, and thereafter the report is the milestone reached.
5. *Never:* treat it as an enterprise-segment cost to be deferred until the enterprise segment is in scope. The whole point is that the year cannot be bought later.

**P-3 — R-10, statutory-maintenance and filing capacity.**
1. *Trigger:* release cadence slips on a statutory update, or a customer files late because a stale rule shipped.
2. *Immediate:* identify whether the slip was capacity, review throughput or watcher coverage — three different failures with three different fixes, and only the first is a hiring question.
3. *Short term:* the stale rule is corrected through the §22 pipeline with two-person review, and the affected periods are recomputed as diffs.
4. *Structural:* re-state the company-shape decision explicitly. The maintained-compliance SLA is the product, so its capacity is not a cost centre to trim (AR-11) — and the two largest COGS lines, supervised filing and compliance curation, remain unsized until V-26 and the §22 sizing report.
5. *Decision owner:* Founder. *Closure:* none — this is a permanent line reviewed on cadence.
6. *Never:* absorb a capacity slip by widening the fence quietly. A fenced item is communicated; a silently narrowed scope is not.

**P-4 — R-3, R-15 and R-30, the three routes to a wrong number reaching a customer.**
1. *Trigger:* a corrigendum found late, an add-back reconciliation divergence, or a boundary test failing — DT-5 routes the symptom to the right one.
2. *First:* stop the affected artefact from being generated further. A wrong payslip generated twice is two disputes.
3. *Then:* compute the delta for affected periods against the corrected rule version, as a **diff on a later period**, never as a mutation of a filed one — and check whether the PF route is Supplementary, Revised or neither, per EV-036 and EV-037's payment-initiation guard.
4. *Then:* tell the affected tenants what was wrong, for which periods, and what is being done — before they find it in a reconciliation.
5. *Root-cause into the guardrail that failed*, and add the boundary test that would have caught it to the golden corpus (C-21).
6. *Decision owner:* Statutory with engineering. *Closure:* the test exists and passes, and the register row records the date.
7. *Never:* correct the number without correcting the rule version, which leaves the next period wrong in the same way.

**P-5 — R-17, funding or headcount ahead of validation.**
1. *Trigger:* a raise, a hire or a forecast cites a figure that has not cleared its gate.
2. *Immediate:* identify the figure and its validation id. If it has no validation id, C-01 has already failed and that is the finding.
3. *Then:* either the figure is removed from the artefact, or the artefact carries it labelled `[Hypothesis]` with its kill criterion and validation id attached. There is no third option, and the label is not a footnote — it travels in the same sentence.
4. *Decision owner:* Founder, because this risk is only ever realised by the Founder.
5. *Closure:* none — reviewed every cadence until the relevant gates have cleared.
6. *Never:* rely on the reader's sophistication. "Everyone knows the pricing is indicative" is precisely how an indicative number becomes a commitment.

**P-6 — R-31 and R-32, migration seasonality and attended-filing legality.**
1. *Triggers, separately:* V-15 failing its tie-out, or deals deferring go-live to April; and V-25 undelivered or adverse for a portal, or a portal changing its terms of use.
2. *For R-31:* forecast only April go-lives and size the revenue plan to one window a year until tie-out is proven on a real dataset. Ship the importers with per-head tolerances (`migration.tieout_tolerance.<head>`). Never sell a mid-year cutover the importer has not tied out — the cost of that promise is a manual repair on someone's YTD tax position.
3. *For R-32:* the portal ships artefact-only with an employer-operated submission runbook, and the customer is told which portals are attended and which are not. The wording never drifts toward "we file for you", and the employer's and deductor's liability is stated as non-delegable in the same breath.
4. *Decision owner:* Product and Founder for R-31; Founder and Legal for R-32, per portal.
5. *Closure:* V-15 passing; V-25 cleared for every portal in the launch set.
6. *Never:* open attended submission on a portal because the adjacent portal cleared. Clearance is per portal, per opinion.

---

### 20.21 Worked traces — three results, followed to the last edit

A register is judged by what happens after a result arrives. These three traces follow one green, one red and one ambiguous result through every consequence, in the order the consequences occur. **The results themselves are illustrations of the mechanism, not findings** — none of these validations has reported.

**Trace A — a desk item closes green: V-17, the overtime cap.**
- *Pre-registration:* hypothesis — a quarterly overtime-hours ceiling exists in the notified Central Rules of 8 May 2026, in either the Wages or the OSH rule-set, at a stated value. Pass threshold — the provision located (or shown absent) with its rule number, value and corrigendum check. Kill — neither notified rule-set contains it.
- *Result (illustrative):* located in one rule-set, with a rule number and a value, corrigendum check clean.
- *State:* IN_COLLECTION → REPORTED → CLOSED_PASS, closed by the Statutory owner as gate owner for Gate 0.
- *Consequences, in order:* (1) `ot_quarterly_ceiling_hours` moves from a routed name to a set value with its source and date, through DT-2's fourth row; (2) the §20.4 ban on "144 OT hours per quarter" **stays**, because the ban is on the unverified figure and its use as a blocking rule — a located value replaces it rather than vindicating it, and the register row is amended to say so; (3) EV-012's marker moves from `[Hypothesis]` in §02; (4) the attendance and payroll warning ships, **warn-only**, per K-04 — a located cap does not become a block, because "the product may warn, never block" was never contingent on the figure's uncertainty; (5) C-01 no longer counts this hypothesis; (6) the dossier carries the dated statutory memo.
- *The instructive part:* a green result on a desk item changes a parameter and a marker, and changes no decision. That is what build-blocking means — it releases a fence, it does not move the plan.

**Trace B — a commercial item closes red: V-01, the bureau price.**
- *Pre-registration:* as written out in §20.15.
- *Result (illustrative):* two of eight bureaus quote ₹1,500/month all-in at 50 employees with ECR upload, ESI challan, PT return and the quarterly TDS statement included, both captured verbatim with names, city tier and date.
- *State:* REPORTED → CLOSED_FAIL, by the Gate 1 owner. One credible quote is sufficient — the sampling frame is explicitly falsification, not averaging, so "only two of eight" is not a defence.
- *Consequences, in order:* (1) the arithmetic is written down — ₹1,500 ÷ 50 = **₹30.00 PEPM**, against a ₹80–150 target that is ₹4,000–₹7,500/month at the same headcount, so the quote is 20% to 37.5% of it; (2) R-9 fires, and its pre-agreed response — re-tier immediately — executes without a fresh mandate; (3) §18's pricing model is rewritten before Gate 1 can clear, because a gate may not clear while carrying the forecast the failure killed; (4) §20.11's first kill condition is evaluated: the price half has resolved against the thesis, so the decision now turns on V-16's pain half, and the review is convened rather than deferred (R-49); (5) the quote table enters the dossier and the §02 register as dated evidence, because it is now the best evidence in the document about what this market pays; (6) nothing is fenced and no code stops — the commercial track releases no build items, and that remains true when it fails.
- *The instructive part:* the machinery converts a two-quote finding into a rewritten section and a convened review, with no step at which anyone decides whether the finding is important enough.

**Trace C — a watch item goes ambiguous under a deadline: V-19, the Form 138 Q4 formats.**
- *Pre-registration:* hypothesis — the Q4 regular and correction formats publish in time to build and regression-test a generator before the Q4 due date of 31 May 2027. Pass — both anchors live on Protean's pages with the layout captured and a golden file built. Amber — one published and not the other. Kill — none; the fence holds until release.
- *Result (illustrative):* the regular format publishes; the correction format does not; `form138_q4_escalation_date` is approaching.
- *State:* IN_COLLECTION → REPORTED → CLOSED_AMBER, then `widen` back to IN_COLLECTION for the correction format, under the same thresholds.
- *Consequences, in order:* (1) the regular generator is built and validated against the FVU of the matching stack — RPU 1.2 with FVU 1.2 for Tax Year 2026-27, never mixed with the legacy stack (EV-052); (2) the correction path stays fenced, and §05's fenced list is updated to say *which half* is fenced rather than carrying "Q4" as one item; (3) R-4's slippage clause fires on the escalation date regardless of the partial release: every affected tenant is told **in writing, before that date**, that its Q4 statement and its Tax Year 2026-27 certificate depend on the CBDT release and on its own deductor obligations, which stay with it; (4) Form 130 Part B generation remains blocked, because the dependency CBDT states is the Q4 Annexure II, and a partial release does not clear it (EV-046, EV-047); (5) the capture dates are recorded against EV-046 in §20.17, which is what stops the half-release being remembered as a full one.
- *The instructive part:* amber under a deadline does not become green by proximity to the deadline. The fence narrows to exactly what is still unknown, the tenant notice goes out on schedule, and the escalation date does the work the optimism would otherwise do.
---

### 20.22 Control-system test scenarios

The banned-number scan has a test corpus (§20.4). The rest of the control system does not, and it is the part most likely to fail quietly. These scenarios are written as given-when-then so they can be walked by a reviewer against the actual dossiers, register and rule store — most of them take under a minute each, and the whole set is an afternoon.

| # | Given | When | Then |
| --- | --- | --- | --- |
| TS-01 | A validation with a pass threshold and no kill criterion | It is filed | Filing is rejected — the record is incomplete, and an item without a kill criterion is a wish |
| TS-02 | A validation whose pre-registration filed date equals its collection start date | C-02 runs | Finding raised: the wall between pre-registration and collection has no width, and the threshold cannot be shown to predate the data |
| TS-03 | A pre-registered threshold, and two interviews completed | The owner attempts `amend_threshold` | Transition refused by its guard; the only route is WITHDRAWN plus a new record with a new id |
| TS-04 | A result that clears a threshold edited during collection | C-03 runs | Result voided, item re-runs, gate does not clear on it (R-43) |
| TS-05 | A risk row whose `response` reads "assess impact and decide" | C-08 runs | Finding raised: the response is a deferral, not a decision |
| TS-06 | A risk row with no named watcher | The cadence review runs | Row moves to UNOBSERVABLE and is quarantined — it may not be cited as a managed risk until rewritten |
| TS-07 | A validation closed FAIL whose linked risk is still WATCHING | C-06 runs | Finding raised: a trigger fired and the owner was never told |
| TS-08 | A gate with one item unreported and the rest passed | The gate owner attempts to clear it | Blocked. An unreported item is not an implied pass |
| TS-09 | A gate with one CLOSED_FAIL, whose response has not executed | The gate owner attempts to clear it | Blocked until the response has fired and the artefacts the failure invalidated have been rewritten |
| TS-10 | A gate cleared conditionally on an amber item, and the expiry has passed | Any decision cites that gate | The clearance has lapsed; the decision needs the item closed |
| TS-11 | A deck containing "24,18,266 establishments" | The scan runs | FAIL, exact match, no correction context |
| TS-12 | The same figure inside §20.4's own ban row | The scan runs | PASS — a correction context with the ban stated in the same artefact |
| TS-13 | A model citing "7,66,254 establishments" with no qualifier | The scan runs | FAIL under standing rule 7, although the figure is correct (TC-06) |
| TS-14 | A chart whose axis label is `2418266` | The scan runs | FAIL — the separator-free variant, which a body-text search would miss |
| TS-15 | A TAM derived from Udyam registrations, where no banned figure appears in the text | The scan runs with the derivation attached | FAIL on the derivation chain, not on the value |
| TS-16 | A rule-store entry with a value and an empty provenance field | C-14 runs before release | Release blocked; the value is removed and the computation routes to operator review |
| TS-17 | A parameter on the counsel route, set by an engineer | C-16 runs | Release blocked (DT-2, fifth row) |
| TS-18 | A parameter name appearing in a section but in no §20.13 family | C-13 runs | Finding raised: an orphan that will acquire a guessed value |
| TS-19 | Two rule-store entries for the gratuity payable ceiling under different spellings | C-15 runs | Finding raised: two employees can get two answers |
| TS-20 | A security-questionnaire answer citing G.S.R. 843(E) with no primary pull recorded | C-20 runs | Blocked until the primary is pulled (R-50) — the mirror is adequate to build against, not to represent |
| TS-21 | An EV row whose capture date is older than its recapture cadence, quoted in a live deck | C-19 runs | Re-capture before the next external use; until then the capture date travels in the same sentence |
| TS-22 | A §20.9 edge case with a rule and a test but no reconciliation check | C-21 runs | Finding raised: a divergence would run correctly and silently |
| TS-23 | A non-goal with an empty `instead` field | C-17 runs | Finding raised: it is a product gap, not a decision |
| TS-24 | A `[Reversed]` marker with no reason at one of the places the old claim appears | C-18 runs | Finding raised: the old claim will be re-imported from an older draft |
| TS-25 | A new open question that both blocks a build item and needs buyer input | DT-1 is applied | Split into two ids on two tracks; the gazette read does not inherit the interview schedule |
| TS-26 | A competitor capability reported by a sales rep | DT-4 is applied | Nothing changes in any register; the report is logged verbatim and the named product is verified directly |
| TS-27 | A competitor capability observed in an executed, dated trial that contradicts a `[Verified]` negative | DT-4 and R-51 are applied | The contradiction is registered first, both captures survive, then the parity row moves |
| TS-28 | A rejected ECR upload on a ceiling boundary | DT-5 is applied | Routed to R-30, and the first question asked is why the pre-upload validator missed it — not whether to re-upload |
| TS-29 | An amended instrument we had already implemented | DT-5 is applied | Routed to R-3, and every affected period is examined — the failure most often mis-routed as a one-off data fix |
| TS-30 | A customer-facing sentence interpreting a rule for that customer | DT-6 is applied | Refused under NG-24; routed to the customer's own adviser |
| TS-31 | A customer-facing sentence claiming our controls are legally mandated | DT-6 is applied | Refused under Part D-18; sold as defensibility instead |
| TS-32 | A validation reporting outside both the pass threshold and the kill criterion, with the sample exhausted and the gate date near | DT-3 is applied | Close AMBER and clear the gate with the decision narrowed to what holds under both readings |
| TS-33 | A watchlist line with no `last_reviewed` stamp for two cadence intervals | C-09 runs | R-52 fires: the register is going stale, and the fix is one honest cadence, not a rewrite |
| TS-34 | An attended session log containing an action with no matching approved instruction | The session review runs | R-53 fires: hand back, disclose to the customer, suspend the credential |
| TS-35 | A §20.11 condition resolved against the thesis, and a hire approved the following week | R-49's trigger is checked | Finding raised at the highest level available — the review record must exist before the commitment, not after |
| TS-36 | The integrity checks not run for a full quarter | C-09 and C-23 run late | The results are published as they are, including the rows that turn out to have fired unnoticed |
| TS-37 | An integrity check disabled or skipped to unblock a release | The release log is read | Finding raised at the level above the person who skipped it. Three checks — C-11, C-14, C-16 — fail closed precisely because they are the ones a deadline argues against |
| TS-38 | A fenced item shipped "partially" to hold a release date | DT-8 is applied | Refused unless the row of DT-8 that permits a partial ship applies, and then only with the shipped and fenced halves named to the customer (AP-09) |
| TS-39 | A tabletop completed with no register row changed | The rehearsal output is read | Ask whether anyone had to look something up. A rehearsal that changed nothing either found a healthy row or was not run honestly, and the difference is visible in that one answer |
| TS-40 | A threshold in §20.28 with no recorded confirmation, and collection already begun | The pre-registration record is read | The threshold is unowned. It will be re-argued after the data arrives, which is AP-02 arriving by omission rather than by edit |
---

### 20.23 Negative cases — the twenty-two ways these registers fail in practice

Every control in this section can be complied with in form and defeated in substance. These are the specific ways, written so that a reviewer can recognise one in progress rather than in hindsight. None is hypothetical in kind: each is a known failure mode of exactly this sort of register, and several have already occurred in the research that produced this document.

| # | Anti-pattern | What it looks like | Control that should catch it | Remedy |
| --- | --- | --- | --- | --- |
| AP-01 | **The register as documentation** | Rows exist, nobody has stamped a review date in two cadences | C-09, R-52 | Run one cadence honestly, including the rows that fired unnoticed. Do not rewrite the register to make the gap disappear |
| AP-02 | **Threshold laundering** | A threshold "clarified" three weeks into collection, in the direction the early data points | C-02, C-03, R-43 | The result is void, not adjusted. New record, new id, original threshold |
| AP-03 | **The qualifier drop** | "7,66,254 establishments" — correct, and missing the word *contributing* | Scan's EPFO branch, C-12, TC-06 | Restore the qualifier in the same sentence, not in a footnote |
| AP-04 | **"Directionally correct"** | A banned figure defended as approximately right because the argument does not turn on it | Standing rule 6, fail-closed | A ban is not a tolerance. The figure comes out; if the argument survives, it survives without it |
| AP-05 | **Evidence by repetition** | A claim believed because it appears in three sections, all of which cite each other | C-01, the EV register's single-source discipline | Trace to the primary or mark it unverified. Internal cross-citation is not corroboration |
| AP-06 | **The prospect as evidence** | A large prospect's request re-opens a non-goal without any evidence changing | §20.1's re-open protocol, step 1 | Raise a validation item. A request is a hypothesis |
| AP-07 | **Averaging a falsification sample** | "Only two of eight quoted below the floor, so on average we are fine" | V-01's kill criterion wording, and the sample-honesty note | Small-N field work is falsification, not estimation. One credible contrary datum fires the criterion |
| AP-08 | **The haircut applied in the wrong direction** | A competitor-capability claim discounted "to be safe", producing a second error | Standing rule 5's `[Reversed]` clause | Competitor capability and price claims have no safe direction. Re-check at source, both ways |
| AP-09 | **Fence creep** | A fenced item ships "partially" to hold a release date | §20.6's escalation rule, the split table's discipline | A slipped desk item is escalated through §05's fenced list, never waived to keep a date |
| AP-10 | **Gate credit** | A gate cleared while one item has not reported, on the reasoning that it is going well | Partial-pass rule, row 1; TS-08 | An unreported item is not an implied pass |
| AP-11 | **Response re-litigation** | The trigger fires and the room reopens the decision the register already made | C-08, the cadence review's second prohibition | Execute the response and record that it was executed. If the response is genuinely wrong, change the row *afterwards* |
| AP-12 | **Risk inflation** | Rows added until the cadence review cannot finish, so nothing is reviewed | C-07, C-09 | An honest short register beats a complete one nobody reads. Retire rows with a reason rather than carrying them |
| AP-13 | **Risk deflation** | A row retired because it has not fired, rather than because its condition has gone | The `retire` guard — a closed validation or a vanished condition | Absence of a trigger is not evidence the trigger cannot occur |
| AP-14 | **Parameter squatting** | A value set "temporarily" to unblock a build, with the intention of sourcing it later | C-14, DT-2, R-46 | Fail closed. The computation routes to operator review rather than running on an unsourced value |
| AP-15 | **Mirror citation** | A mirror-sourced fact quoted in a contract or a security questionnaire | C-20, R-50 | Pull the primary and record the pull. A mirror builds; it does not represent |
| AP-16 | **The single-registration generalisation** | A portal fact captured once and treated as the portal's behaviour | V-23's amber criterion | Capture from an accepted upload *and* a real rejection, and record which registration |
| AP-17 | **Corrigendum amnesia** | The watcher monitors new instruments and not amendments to implemented ones | Standing rule 2, R-3's response | Key the watcher to amendments. This is the failure that reversed the plan's most important statutory conclusion |
| AP-18 | **Validation shopping** | Running the study most likely to pass first, to build momentum before a raise | The gate ordering, and the pre-registration record's Known conflicts field | Desk-first ordering exists for evidence reasons, not for comfort. Sequence on what is blocked, not on what will look good |
| AP-19 | **The artefact-free result** | A conclusion circulated with no quote table, memo, matrix or report behind it | The ten-minute audit, question 3 | No artefact, no citation. It is research, and it is labelled as such |
| AP-20 | **Silent overwrite** | A `[Verified]` row replaced by a newer capture with no record of the contradiction | R-51 | Register the contradiction first. Both captures survive with dates and capture modes |
| AP-21 | **Scope substitution** | The study answers an easier adjacent question — "do buyers care about compliance" instead of "what does a bureau charge with filing included" | The sealed `hypothesis` and `instrument` fields | Close WITHDRAWN and re-file. A study that answers a different question has not answered this one |
| AP-22 | **The uncleared comparison** | A rep makes a competitor comparison in a live deal that no capture supports | §21's competitor-claim rule, R-7's residual | Withdraw the claim to the customer, and never assert that a competitor's published data is wrong as a sales claim |

The common structure across all twenty-two is worth naming: **each substitutes a cheaper act for the expensive one the control demands** — an average for a falsification, a cross-reference for a source, a footnote for a qualifier, a temporary value for a sourced one, a re-argument for an execution. The controls are not hard to understand; they are hard to keep paying for, and that is what they are designed to test.

---

### 20.24 The evidence-grade ladder — what each grade permits

This section's registers, §02's evidence ledger and §21's competitor rules all depend on a shared idea that is nowhere written down as a rule: **what a claim is allowed to be used for depends on how it was obtained.** Stated explicitly, it removes most of the arguments about whether something "counts".

| Grade | What it means | Build on it | Internal document | Customer-facing deck | Website or marketplace | Contract, SLA or RFP answer |
| --- | --- | --- | --- | --- | --- | --- |
| **Unverified** | Asserted somewhere, traced to nothing | No | Yes, labelled unverified | No | No | No |
| **Secondary** | A summary, aggregator or press report of a primary source | No, for statutory values | Yes, as a pointer to chase | No | No | No |
| **[Verified — mirror]** | Primary text read through a mirror of the gazette or directions | Yes | Yes | Only after a recorded primary pull | Only after a recorded primary pull | Only after a recorded primary pull |
| **[Verified] — documentation read** | A competitor's own documentation or repository read, product not executed | Yes | Yes | Yes, stating "documentation read" | Yes, stating it, and cleared under §21 | Only with the capture date and the capture mode stated |
| **[Verified] — product executed** | The product was run and the behaviour observed, dated | Yes | Yes | Yes, dated | Yes, dated and cleared | Yes, dated |
| **[Verified] — primary source** | Gazette, notified rule, filing, regulator publication, or the vendor's own page captured with URL and date | Yes | Yes | Yes | Yes | Yes |
| **Archived** | A capture of something since withdrawn — the Keka August 2024 card is the standing example | Yes, as history | Yes | Yes, as *archived*, never as current | Yes, as archived | Rarely, and only as archived with its date |
| **[Hypothesis]** | Our own proposition under test | Only behind a fence or a parameter | Yes, with its V id and kill criterion | Yes, labelled, with the kill criterion | No | No |
| **[Killed] / [Reversed]** | Disproven, or retracted by this document | No | Yes, as the correction | Only when teaching the correction | No | No |

Three rules govern movement on this ladder. **Grades never rise by repetition** — a secondary claim cited three times is still secondary, which is AP-05. **A grade is a property of the capture, not of the claim**, so the same fact can hold two grades from two captures, and the higher-graded capture is the one that may be used while both are recorded (R-51). And **nothing may cross into the last two columns without the artefact that proves its grade**: a URL with a capture date, a session log, an executed trial record, or a primary-source pull. C-19, C-20 and the §20.4 scan are the mechanisms; this table is the policy they enforce.

Two placements are worth explaining, because both look stricter than necessary. `[Verified — mirror]` cannot reach a customer artefact without a primary pull even though the mirror is, in all likelihood, accurate — the two rows carrying this grade are a commencement notification and a set of outsourcing directions, and both would be quoted to exactly the buyer least able to tolerate an error (R-50). And `[Hypothesis]` may appear in a customer deck, labelled, but never on a website or in a contract — the difference is that a deck is delivered by a person who can answer a question about it, and the other two are not.
---

### 20.25 What this section does not control

A control section attracts work that does not belong to it, and the result is two registers of the same thing drifting apart — which check C-23 exists to prevent. This is the boundary, stated once.

| Concern | Owned by | What §20 holds instead |
| --- | --- | --- |
| The evidence register itself — EV rows, their markers, provenance and the `[Reversed]` register | §02 | Which EV rows this section's registers depend on, and what invalidates each (§20.17) |
| The measured error-rate and round-by-round provenance of the research | §02 | The consequence: the haircut rule, and its `[Reversed]` exception for competitor claims (§20.12 rule 5) |
| The build sequence, the fenced list and release entry and exit criteria | §05 | Which validation releases which fence (§20.6's release matrix) |
| The canonical statement of every statutory rule, threshold and register | §06 | The boundary cases that are filing-failure triggers, and their acceptance link (§20.9) |
| The payroll engine, the ECR and Form 138 generators, and the error taxonomy | §08 | The edge cases the engine must encode, and the tests that prove it did |
| The compliance SLA's own definition, remedy terms and metrics | §19 | The validation that sizes the remedy (V-33), the risk of missing it (R-29), and the non-goal that bounds it (NG-25) |
| Competitor claim clearance, the recapture cadence and the capture register | §21 | The anti-recommendations resting on competitor evidence, and DT-4's routing of an observation |
| The attended-filing runbooks, the credential vault and the compliance data pipeline | §22 | The risks those controls fail (R-32, R-53), and the validation that sizes their cost (V-26) |
| Legal analysis, the counsel register and every Part D question | §23 | The routing — which validation or parameter waits on counsel, and what ships fenced meanwhile |
| Pricing structure, the two anchors, packaging and channel strategy | §18 | The bans on the numbers that would distort it, and the validations that gate it |
| Architecture, bitemporality, engine purity and the incident pipeline | §14, §15, §17 | Risk rows for their operational failure (R-15, R-27, R-54, R-56), never their design |

The rule behind the table: **§20 holds the decisions about what we will not do, what we do not yet know, and what we will do when something happens.** Everything else belongs to the section that specifies the mechanism. Where this section describes a mechanism at all — the banned-number scan, the pre-registration record, the integrity checks — it is because the mechanism exists only here and nowhere else in the document.

---

### 20.26 Change control for the registers

These registers will change. The question is whether they change the way the evidence changed — traceably, with the reason attached — or the way memory changes. This is the protocol, and it is deliberately close to the one §14 applies to a rule object, because the failure mode is identical: a value that is right today, silently replaced, with no record of what it used to be or why anyone believed it.

**What may change, and who may change it.**

| Register | Add a row | Change a row's substance | Retire a row | Never |
| --- | --- | --- | --- | --- |
| §20.1 non-goals | Product, accepted by the Founder | Only through the re-open protocol | Founder, with the reversal recorded and reasoned | Delete the row. A reversed non-goal is marked `[Reversed]`, not removed |
| §20.2 / §20.3 anti-recommendations | Anyone, accepted by the Founder | Re-derive the arithmetic first | Founder | Soften the counter without changing the evidence |
| §20.4 banned numbers | Research lead | Only to add variants, tighten the reason, or record a lift | Research lead, and only by recording it as lifted with the evidence — the Keka ban is the worked case | Remove a row so the register looks shorter |
| §20.5 killed conclusions | Research lead | Only via a `[Reversed]` marker with a one-line reason at every occurrence | Never retired; reversal is the only exit | Re-import from an older draft |
| §20.6 validations | Item owner, per DT-1 | Sealed fields cannot change after collection starts | Gate owner, as WITHDRAWN with the dropped decision named | Close informally without a record |
| §20.8 risks | Owner, accepted by the Founder | Owner, with the prior trigger or response retained | Owner and Founder, citing the releasing evidence | Retire because it has not fired |
| §20.9 edge cases | Statutory or Eng | Statutory, with the test updated in the same change | Only if the underlying rule ceases to exist | Change the rule without changing the test |
| §20.13 parameters | The section that introduces the parameter | Route or owner may change, logged | When the parameter is withdrawn | Set a value inside this PRD |

**How a row changes.** Four steps, in order, and the order is the control. (1) **Name the evidence that moved** — an EV row re-captured, a validation reported, a counsel opinion delivered, a corrigendum found. (2) **Write the new row beside the old one**, so a reader sees both. (3) **Trace forward:** every other row, section, parameter and shipped artefact that cited the old one — §20.17 is the map for evidence-driven changes, and the §20.4 scan is re-run across live artefacts if a quoted figure moved. (4) **Mark it** — `[Reversed]` for a conclusion this document previously stated, with a one-line reason carried at every place the old claim appears (C-18). A change that skips step 3 is how a corrected register coexists with an uncorrected deck.

**When a correction arrives from outside this section.** A ledger-level correction — the kind that reverses a claim across the whole document — lands here as several changes at once, and they are made together or not at all: the banned-number row, the killed-conclusion row, the anti-recommendation, the non-goal that rested on it, the risk row whose trigger referenced it, and the validation whose scope it changes. The multi-state PT and LWF reversal touched five of those six simultaneously, and the reason it is coherent in this version is that they moved together. A correction applied to three of five places is worse than one applied to none, because it produces a document that contradicts itself and invites the reader to pick.

**Versioning.** Every register row carries the PRD version in which it last changed substance, and the change log for this section records, per version: the rows added, the rows whose substance changed, the rows retired or reversed, and the evidence that moved each. The log is what makes check C-18 runnable and what stops the most common failure of a long-lived register — a row that is right, that nobody can explain, and that therefore gets quietly ignored the first time it is inconvenient.

**What a reader may assume about an unchanged row.** Nothing, beyond its last-reviewed date. An unchanged row is not a re-confirmed row; the cadence stamp and the recapture cadence in §20.17 are the only statements this section makes about currency. This is why C-19 exists and why R-45 is a register row rather than a footnote: the most dangerous claim in any long document is a true one that has quietly stopped being true.

---

### 20.27 How each reader uses this section

Six audiences read this section for six different reasons, and the most common misuse is a reader treating it as a summary of the PRD rather than as the place where the PRD's uncertainty is held.

**The Founder or the board.** Read §20.11 first — the whole-thesis kill conditions — then §20.7's gate structure, then the six watchlist lines. Everything else is supporting detail. The one thing to check, every cadence, is whether any commitment made since the last review cited a figure whose gate had not cleared (R-17, P-5). The section is not a status report; the only status it carries is which gates have cleared and which validations have reported.

**The statutory owner.** Read §20.9 and its boundary test matrix, then the desk track in §20.6, then §20.17's statutory rows. This section's demand on this role is specific and unusual: it is not to be right, it is to be **checkable** — every value carrying its instrument, URL, capture date and corrigendum-check date, so that the next person can tell what was actually read.

**The build lead.** Read the release matrix in §20.6 and nothing else, first. It answers the only question a build lead needs from this section: which fences exist, and what releases each. The second read is §20.9 and its test matrix, which is where this section becomes acceptance criteria. Note the finding in §20.6: no fence is released by a commercial item, so no build work waits on an interview.

**GTM.** Read §20.4's qualifier table before quoting any figure, then §20.2 and §20.3, then DT-4 and DT-6. The two rules that matter most in a live deal are that a competitor comparison needs a dated capture and a stated capture mode, and that no statement about the law leaves the room as advice (NG-24). A figure that is correct and stripped of its qualifier is the failure most likely to originate here (TC-06, AP-03).

**Counsel.** Read §20.25's boundary, then every row routed to Legal — V-25, V-27, V-29, the counsel-routed parameters in §20.13, and the Part D register in §23. What this section asks for is sequencing: the opinions are ordered by what they unblock, and an unanswered question has a specified fenced behaviour so that the absence of an opinion is never itself a decision (R-48).

**A new joiner.** Read §20.4 and §20.5 before anything else in the PRD. They are the fastest route to understanding what this document has already been wrong about, which is more useful than any statement of what it currently believes. Then read §20.12's ten standing rules, which are the working method. Everything else can be read when it becomes relevant.


**Who owns what, and who may sign what.** Ownership in this section is deliberately singular — a shared owner is an unowned row — and signing authority is narrower than ownership, because the two most common governance failures are a decision nobody owned and a decision signed by whoever was available.

| Role | Owns | May sign | May never |
| --- | --- | --- | --- |
| Founder | The gate structure, the watchlist cadence, the thesis review, every company-shape risk and decline | Gate 0, 1 and 2; the launch gate jointly with Legal; a `[Reversed]` marker on a non-goal | Set a counsel-routed parameter, or clear a gate on an unreported item |
| Statutory | The desk track, the edge cases, the rule-store provenance, the statutory watches | Gate 0's evidence pack; a statutory parameter with its source | Set a value with no dated source, or ship a computation on an unlocated provision |
| Research lead | The banned-number register and its scan, the evidence dependency map, the capture discipline | A ban, a lift, a recapture | Remove a row to shorten the register, or grade a claim up by repetition |
| Engineering | The spikes, the instrumentation, the engine numerics, the structural controls | Gate 2 jointly with the Founder; an engine-numeric parameter against the golden vectors | Set a statutory or counsel-routed parameter |
| GTM | The commercial track, the field instruments, the competitor observation intake | A commercial validation's result; a quote capture | Make a competitor comparison without a dated capture and a stated capture mode |
| Ops | The attended sessions, the portal captures, the supervised-minutes measurement | A portal-facts sheet; a session log | Act outside an approved instruction, or close an erasure as complete without an attestation |
| Legal | The counsel register, the routed questions, the representation control | The launch gate jointly with the Founder; a counsel-routed parameter; a customer-facing legal statement | Let an unanswered question become an implied answer |
| Product | The scope declines, the migration surface, the AI-decision controls | A non-goal's `instead`; a scope decline | Re-open a decline on a prospect's request rather than on evidence |
**The one instruction common to all six.** If you find yourself explaining why a rule in §20.12 does not apply to your particular case, that is the case it was written for.
---

### 20.28 The decision thresholds this section proposes

The acceptance criteria in §20.6 already carry the warning that their numeric cut-offs are **decision thresholds this PRD proposes, not evidence or market estimates**. This is the full list, in one place, so that the distinction cannot be lost by reading one table without the other. Each row names who must confirm or reset it before collection begins, and what a reset would mean — because a threshold someone quietly disagrees with is a threshold that will be argued about after the data arrives, which is exactly AP-02.

| Threshold | Where | What it decides | Basis | Confirms before collection |
| --- | --- | --- | --- | --- |
| ₹2,500/month all-in at 50 employees | V-01 pass | Whether the bureau price supports our pricing | **Derived** — ₹50 PEPM × 50 employees, from the verified value floor (EV-027) | Founder / GTM |
| Quotes straddling ₹2,000 | V-01 amber | Whether to widen the sample | Proposed | Founder / GTM |
| Under ₹2,000/month, one credible quote | V-01 kill | Fires the pricing rebuild and half of §20.11's first condition | Proposed — deliberately set as a single-observation trigger | Founder / GTM |
| ≥6 of 8 bureaus | V-01 pass count | What "the market is at or above the floor" means | Proposed | Founder / GTM |
| ±10pp convergence / >20pp dispersion | V-02 pass and amber | Whether partner estimates are usable | Proposed | GTM |
| ~5% versus ~40% payroll enablement | V-02 gate | Whether the Tally channel leads or shrinks to accounting export | Proposed decision bands, not estimates | GTM |
| Within 15% of list / 15–30% / 30–40% below | V-03 pass, amber, kill | Whether realised pricing supports the target band | Proposed | Founder |
| Within 2× / 2–5× / ≥5× the token estimate | V-04 pass, amber, kill | Whether bundling AI free holds at the low end | Proposed, against a placeholder estimate (EV-008) | Eng |
| ≥60% of CAs describing workable economics | V-05 pass | Whether the CA channel is real | Proposed | Founder / GTM |
| A majority reading us as disintermediation | V-05 kill | Fires R-14 | Proposed | Founder / GTM |
| ≥3 in-India backends, for inference *and* data-at-rest | V-13 pass | Regulated-segment eligibility | Proposed — the number is an architectural choice about provider abstraction | Eng / Legal |
| ≤5% of ARPU / 5–10% | V-14 pass and amber | Whether realised inference cost is sustainable | Proposed | Eng |
| ≥80% of the target fleet / 50–80% | V-10, V-11 pass and amber | Whether the frontline path needs middleware | Proposed | Eng |
| ₹0 variance on YTD taxable salary, TDS deducted and statutory totals | V-15 pass | Whether mid-year cutover is a product or a service | **Derived** — these are the inputs to Form 138 Annexure II and Form 130 (EV-047, EV-048), where a variance is a wrong certificate | Product / Eng |
| ≥10 data points, ≥10 employers, ≥2 vendors, ≥1 signatory, ≥10 buyers | V-03, V-30, V-31, V-32, V-33 | Minimum evidence for each commercial item | Proposed — and small by design, because these are falsification samples | GTM |
| ≥20% of interviewed buyers naming multi-country hiring top-3 | NG-10 re-open | Whether EOR is revisited | Proposed | Founder |
| ≥3 scored tenders requiring MDM | NG-13 re-open | Whether MDM is revisited | Proposed | Product |
| ≥30% of renewed accounts naming LMS or OKR top-3 | NG-22 re-open | Whether a second product front opens | Proposed | Product |
| 3× LTV:CAC on a live cohort | NG-15 re-open | Whether the employee surface is monetised | Proposed | Founder |
| ≥1 signed referral term sheet with a licensed NBFC | NG-11 re-open | Whether lending is revisited, as referral only | Proposed | Founder |
| ISO 27001:2022 held ≥12 months, plus a ≥30,000-employee reference implementation | Enterprise re-open gate | Whether the enterprise segment opens | **Documentary**, from §01's procurement reasoning | Founder |
| `banned_number_near_miss_tolerance_pct` | §20.4 scan | When a figure counts as a near-miss | Unset — an owner decision recorded in §20.13 | Research lead |

**What a reset looks like, done properly.** An owner who believes a threshold is wrong resets it *before* collection, files the reset with its reasoning, and the new threshold is the one the result is judged against. An owner who leaves a threshold they disagree with in place, and then argues about it after the data arrives, has produced a result nobody can use. The cost of the first is a paragraph; the cost of the second is the study.

---

### 20.29 Residual exposure — what remains when every control works

Every response in the register has a residual column, and the honest aggregate of those columns is not zero. This is what is still carried after the whole machine runs as designed, stated because a control section that implies otherwise is the most dangerous artefact in the document.

| Residual exposure | Why it is irreducible | Who carries it | What reduces it over time |
| --- | --- | --- | --- |
| The Form 138 Q4 formats publish when CBDT publishes them | An external dependency with no lever on our side (EV-046) | Every tenant's Tax Year 2026-27 certificate | Nothing we do. Only the written tenant notice before the escalation date limits the harm (R-4) |
| The ESI regime after ~21 November 2026 | The successor is notified or it is not (V-08, V-22) | Every ESI-liable tenant | The pre-built freeze-and-block contingency converts a correctness failure into a visible, communicated block (R-2) |
| Counsel's answers, and their timing | Roughly twenty routed questions against an unsized retainer (R-48) | The attended-submission wedge, and several customer-facing statements | Sequencing by what each unblocks, and a specified fenced behaviour for every unanswered question |
| The employer's and deductor's statutory liability | Non-delegable by construction (EV-K24) | The customer, always | Nothing — and this is by design. The product reduces the *chance* of a failure, never the ownership of it |
| Portal behaviour that is only partly published | Which ECR checks reject rather than flag is not fully documented; only the age-58 EPS rule is a confirmed hard block (EV-040) | Every monthly filing | Accumulated V-23 captures from accepted uploads and real rejections, one registration and one cycle at a time |
| State-sphere retention periods, forms and thresholds | Only central-sphere periods are stated here; the rest is counsel's, per state (EV-054, Part D-11) | Multi-state tenants | The state-by-state work in V-09 and the counsel register |
| Whether the Aadhaar criminal chain holds | Unresolved, and the instruction is to build as though it holds while stating nothing about whether it does (EV-067) | Us, and our officers | Nothing available to us. The mitigation is the architecture — token store, no image column, optionality everywhere |
| DPDP's commencement date, and the compression proposal | Non-gazetted, scope unresolved (EV-058) | The consent machinery's timing | Running both consent regimes concurrently, so the date stops mattering (R-22) |
| Whether an HR SaaS is an "intermediary" | A counsel question with no settled answer (EV-074, Part D-13) | Any synthetically-generated-content obligation | Counsel, and the narrow scope of the 2026 Rules' regime |
| The supervised-filing cost line | Unsized until measured over real cycles (EV-088) | The entire unit-economics case | V-26, and only V-26. No amount of modelling substitutes for the first attended cycles |
| The design-partner and first-cycle dependency | Three validations need a real registration, a real dataset or a real cycle, and none can be simulated | The timing of four fences | A second design partner — the only real mitigation for R-47 |
| Algorithmic-hiring case law in India | We are not aware of any, as of September 2026; the first case will be one of first impression (EV-084) | Any AI-influenced hiring decision | Nothing. The controls are built as the RPwD s.90 due-diligence defence, and never sold as a legal mandate |
| The generator's optimism bias | It produced roughly ninety one-directional errors and is still running | Every claim in this document that has not been re-checked at source | The standing rules, the registers, and the measured error rate in §02 — which lower the rate and do not remove it |
| The ISO 27001 seasoning clock, once missed | Twelve months of seasoning cannot be bought later at any price, and acquisition is a further 3–6 months | The enterprise segment's timing | Nothing, after the fact. Only starting at month zero prevents it (R-16) |
| The WhatsApp channel's commercial terms | Per-message pricing is Meta's, the INR-billing migration is a Meta deadline, and the India rate card is not published in HTML (EV-088, V-12) | Every worker-facing flow that uses the channel | Keeping the kiosk and in-app paths able to carry every worker flow, so an outage or a price move degrades a channel rather than attendance or payslip access (R-42) |

The two rows at the bottom are the uncomfortable ones. The last says plainly that the discipline in this section reduces a known error rate rather than eliminating it, and that unrechecked early claims remain the least reliable content in the document. The second-to-last says that on the question most likely to attract a first-of-its-kind legal challenge, there is no precedent to reason from and no control that creates one. Both are stated because a residual nobody has written down is a residual somebody will later claim was hidden.

---

### 20.30 What this section cannot close

Five things this section depends on are outside its own control, and none of them is a validation item because none can be answered by collecting data.

1. **Interview scheduling lead.** Gate 1's critical path is 6–8 weeks of fieldwork plus an unestimated scheduling lead, and the lead — not the interviews — is the variance. It is not estimated anywhere in this plan, and the honest treatment is to report it as it accrues rather than to forecast it. *Owner:* Founder / GTM.
2. **Counsel's queue.** R-48 manages the consequence and cannot change the cause. The retainer is `counsel_retainer_monthly` and is unsized; the sequencing rule is the only lever. *Owner:* Founder / Legal.
3. **Whether the cadence is sustained.** R-52 names the risk and C-09 detects it, but nothing external forces a review to happen. This is the single control in the document with no backstop. *Owner:* Founder.
4. **Whether owners confirm their thresholds.** §20.28 lists twenty-two thresholds, most of them proposed rather than derived. A threshold nobody confirmed is a threshold nobody owns, and it will be re-argued at the worst moment. *Owner:* each named confirmer.
5. **Whether the registers are read at the moment of decision.** Every control here assumes someone consults it before acting. The decision tables in §20.19 and the reader's guide in §20.27 are the mitigation; there is no detection mechanism for a decision taken without opening the document.

Naming these is not a disclaimer. Items 3, 4 and 5 are the ones most likely to be realised, they are all free to fix, and none of them will announce itself.

---

### 20.31 Acceptance criteria for this section

A reviewer can decide whether §20 is doing its job without reading the rest of the PRD. These are the conditions, and each is checkable against the section as it stands.

| # | Criterion | How it is checked |
| --- | --- | --- |
| AC-1 | Every non-goal carries evidence, a positive `instead`, and either permanence or a re-open gate | C-17, plus a read of §20.1 |
| AC-2 | Every banned figure carries its reason, its evidence and either a replacement or an explicit "unrecoverable" | C-10 |
| AC-3 | Every `[Hypothesis]` in the PRD resolves to a validation id in §20.6 | C-01 |
| AC-4 | Every validation has an owner, a method, a cost or an explicit "no incremental spend", an elapsed estimate or an explicit "set at pre-registration", a gate, a pass threshold, an amber band and a kill criterion | A read of §20.6 and the acceptance table |
| AC-5 | Every validation is assigned to exactly one track, and the split states what it blocks | The split table, and DT-1 |
| AC-6 | Every risk has an observable trigger, a named watcher, a cadence, a pre-agreed response with no deferral verb, an owner and a residual | C-06, C-07, C-08 |
| AC-7 | Every §20.9 edge case has a rule, a boundary test input and a reconciliation check | C-21, against the boundary test matrix |
| AC-8 | Every parameter routed here belongs to exactly one family with a route and an owner, and holds no value | C-13, and a read of §20.13 |
| AC-9 | Every kill condition in §20.11 is decidable by at least one validation's result | C-22 |
| AC-10 | Every `[Reversed]` marker carries its one-line reason wherever the reversed claim appears | C-18 |
| AC-11 | No banned figure appears outside a correction context, and no qualifier-required figure appears stripped | The §20.4 scan, with the test corpus |
| AC-12 | No number in this section is stated that the ledger and research do not supply, and every derived figure shows its arithmetic | A read: every rupee figure here is either cited to an EV row or derived in the open from one |

The twelfth is the one worth checking hardest, because it is the criterion this entire section exists to enforce on everyone else.

---

### 20.32 Glossary of the control vocabulary

These terms are used precisely in this section and loosely everywhere else. The definitions are here so that a build team, a reviewer and a board member mean the same thing by them.

| Term | Means, in this document |
| --- | --- |
| **Non-goal** | A thing we could build, that a reasonable person expects us to build, and that we decline — with the evidence and a positive alternative attached. Not a "later" item; those are in §05 |
| **Anti-recommendation** | A strategy a competent person would propose, that the evidence says is a trap. Stated as the plausible pitch, then the counter |
| **Banned figure** | A number proven false or structurally contaminated. Its appearance invalidates the artefact; it is a fail-closed check, not a review comment |
| **Qualifier-required** | A figure that is correct and becomes wrong when its qualifier is stripped — the four rows in §20.4's qualifier table |
| **Near-miss** | A figure within `banned_number_near_miss_tolerance_pct` of a banned value. Not an automatic failure; the author must show the derivation |
| **Derived form** | A figure computed from a banned base, rate or denominator. Banned on the chain, even when the banned number never appears |
| **Pass threshold** | The pre-registered condition under which a validation is green. Decidable before the data arrives |
| **Amber band** | The pre-registered condition under which the correct action is to widen the sample under the same threshold — never to re-argue it |
| **Kill criterion** | The pre-registered observation that would falsify the hypothesis. An item without one is a wish |
| **Pre-registration** | The sealed record filed before collection starts. The wall between setting a threshold and seeing the data |
| **Dossier** | Everything a closed validation leaves behind: the record in all versions, the raw captures, the artefact, the result, the transition, the downstream edits |
| **Gate** | A decision checkpoint with entry criteria, exit criteria, an evidence pack and a signature. Gates authorise spend and scope, not correctness |
| **Fence** | A build item that may not ship because a specific external fact is unavailable. Fences are communicated, never quietly narrowed |
| **Trigger** | An observable — something a specific named person could see happen. A risk without one is an anxiety |
| **Watcher** | The role that notices a trigger. Distinct from the owner, who decides |
| **Pre-agreed response** | The decision taken in advance, so the moment of the trigger is not the moment of the argument |
| **Residual** | What remains exposed after the response has fired. The sentence carries the meaning; the band only sorts the table |
| **Capture mode** | How a fact was obtained — product executed, documentation read, repository read, primary source, mirror. A property of the capture, not of the claim. In practice: "release material read" and "repository read" are different facts, and the difference between them was the whole of the multi-state PT/LWF error |
| **Evidence grade** | The rung a capture occupies on §20.24's ladder, and therefore what the claim may be used for. Grades never rise by repetition, and a fact may hold two grades from two captures |
| **Integrity check** | A mechanical test run against the registers themselves. Three of the twenty-three fail closed and stop a release |
| **Tabletop** | A rehearsal of a pre-agreed response against a scenario built only from verified facts. Its deliverable is the list of register rows that turned out to be unusable |
| **Thesis review** | The §20.11 exercise: the four kill conditions worked in writing before any further spend. Convened by evidence, not by crisis |
| **Fail closed** | A check that stops the artefact or the release rather than raising a comment. Three of the twenty-three integrity checks, and the banned-number scan, work this way |
| **Escalation date** | A named parameter set far enough ahead of an external deadline that the response — usually a written customer notice — can still be executed. `form138_q4_escalation_date` is the worked case |
| **Register census** | The count of what each register holds, kept so that a proposed cadence can be checked against what there is to review |
| **Build-blocking** | A desk item on the build's critical path rather than the funding path. A slip is escalated through §05's fenced list, never waived to keep a release date |
| **Orphan** | A hypothesis with no validation id, or a parameter in no §20.13 family. Both acquire values or beliefs that nobody chose |
---

### 20.33 Sequencing — the order the programme runs in, and why each choice is the way round it is

§20.14 gives what the programme costs and §20.7 gives what each gate authorises. Neither gives the order, and the order is where most of the avoidable loss lives: a programme that runs the same items in the wrong sequence spends the same money, takes longer, and learns the expensive things last. Each step below carries the reason it sits where it does, and — more usefully — what it would be wrong to start in its place.

| Step | What starts | Why here | What it would be wrong to start first |
| --- | --- | --- | --- |
| 1 | **V-11**, the ADMS/WDMS bench test | Cheapest spike in the programme at 1–2 engineering weeks, and it is the best-evidenced architectural call in the corpus. A failure changes V-10's scope before V-10 is scoped | V-10. Running the fleet spike first means sizing a device roadmap against an outbound-push assumption that has not been tested |
| 2 | **V-17, V-18** — the one-week statutory reads | One week each, zero spend, and each releases a specific shipping behaviour: the OT warning value and the meal component | V-20 and V-21. They are larger reads, and starting with them delays two cheap releases by weeks |
| 3 | **V-09**, the state PT and LWF compilation | 6–10 weeks and the longest desk item. It must start immediately or it becomes the binding constraint on Gate 0 by arithmetic alone | Anything that displaces it. Every week V-09 waits is a week Gate 0 waits |
| 4 | **V-08 and V-22**, the ESI and EPS/EDLI watches | Bound by an external date, not by effort. They start now because the watch log must already exist when ~21 November 2026 arrives — a watch started late cannot produce a history | Nothing displaces a dated watch; it costs nothing to run and cannot be compressed later |
| 5 | **V-25**, the attended-filing counsel questions | Counsel's queue is a serialising resource (R-48), and V-25 is the one counsel item that gates a launch rather than a wording | Asking counsel the wording questions first. They are cheaper to answer and they unblock nothing |
| 6 | **V-20, V-21**, the larger statutory reads | Now that the cheap reads are closed and V-09 is running, these fill the desk capacity behind them | — |
| 7 | **V-01, V-16** scheduling begins | Both are 3–4 weeks of work and an unestimated scheduling lead. Scheduling starts early precisely because the lead is the variance, not the interviews | Running them before the common interview core exists, which produces six studies that cannot be cross-tabulated |
| 8 | **Design-partner search**, against `design_partner_authority_milestone` | Three validations — V-15, V-23, V-26 — and four fences depend on one relationship (R-47). It is the highest-leverage non-technical task in the programme | Assuming the first customer will also be the design partner. The roles have different requirements and different timing |
| 9 | **V-03, V-05** | The two longest commercial items, run concurrently with V-01 and V-16 against the shared core | Running them sequentially. They share a population, and sequential execution doubles the elapsed time for no gain in sample quality |
| 10 | **V-23**, the portal captures | Starts on the first design-partner session, not before. It cannot be simulated and it cannot be hurried | Building the error-file importer on an assumed schema, which is the failure the fence exists to prevent |
| 11 | **V-04**, the token profile | After V-11 and V-17/V-18, because it is a prototype spike competing for the same sign-off and it gates nothing that is shipping | Before the statutory reads. It sizes a cost line, not a correctness line |
| 12 | **V-15**, the migration dry run | Needs the design partner's real dataset, so it follows step 8 and runs alongside V-23 on the same relationship | Selling a mid-year cutover before it, which is R-31's failure exactly |
| 13 | **Gate 1** convenes | When V-01, V-02, V-03, V-05 and V-16 have reported — including the items riding on their conversations | Convening on four of five and treating the fifth as an implied pass (TS-08) |
| 14 | **V-07**, willingness to pay | After Gate 1, because it only gates the metered AI SKUs and those decisions sit behind pricing | Before Gate 1. It is the most expensive single item in the programme and it gates the least |
| 15 | **V-26**, supervised minutes | On the first attended cycles, which cannot exist before V-25 clears a portal and a partner has signed an authority | Estimating supervised cost instead of measuring it, which destroys the one number the unit-economics case turns on |
| 16 | **Gate 2** convenes | When the spikes and V-07 have reported and V-26 has enough cycles for a stable figure | Scaling the team on Gate 1's clearance, which authorises a raise and not a headcount plan |

Two ordering principles are doing all the work here. **Dated items start first regardless of importance**, because their cost is not effort but the passage of a date — V-08, V-22, the ISO 27001 clock (R-16) and the WhatsApp INR migration (R-42) all belong to this class, and all of them are free to start and impossible to recover. And **the cheapest item that changes another item's scope runs before it** — V-11 before V-10, the one-week reads before the multi-week ones, the interview core before the interviews. Neither principle is about importance, which is why both are easy to violate.

---

### 20.34 Register census

What this section holds, counted, so that a reviewer can tell at a glance whether the cadence being proposed is achievable and whether anything has silently stopped being maintained (R-52, AP-12).

| Register | Ids | Count | Owner | Reviewed |
| --- | --- | --- | --- | --- |
| Non-goals | NG-1 … NG-28 | 28 structural declines, five of them `[Hypothesis]` with a pre-registered kill/keep threshold (NG-10, NG-11, NG-13, NG-15, NG-22), plus three timing-gated deferrals carrying re-open gates and no NG id | Product, Founder for company-shape declines | On the risk cadence, and on any re-open request |
| Anti-recommendations | AR-1 … AR-22 | 22 | Founder | On the risk cadence |
| Banned figures | §20.4 table | 25, plus 4 qualifier-required figures and 2 entities removed from the competitive set | Research lead | Every PRD version, and every external release |
| Killed conclusions | §20.5 table | 17 | Research lead | Every PRD version |
| Validations | V-01 … V-34 | 34, of which one is closed (V-06) | Item owners, gate owners for closure | On report, and on the cadence for the watches |
| Risks | R-1 … R-57 | 57, of which nine (R-2, R-3, R-10, R-15, R-16, R-17, R-30, R-31, R-32) sit on the six watchlist lines | Row owners | On the risk cadence; weekly for R-2 from October 2026 |
| Statutory edge cases | §20.9 table | 21, with 22 boundary tests | Statutory and Eng | Every release |
| Integrity checks | C-01 … C-23 | 23, of which three fail closed | Named per check | Per release or per cadence, as stated |
| Banned-number test corpus | TC-01 … TC-30 | 30 | Research lead | When the register changes |
| Control-system test scenarios | TS-01 … TS-40 | 40 | Founder | Quarterly, or when a control changes |
| Anti-patterns | AP-01 … AP-22 | 22 | Founder | Read, not reviewed — they are recognition aids |
| Decision tables | DT-1 … DT-8 | 8, including the intake router and the fence-release test | Founder | When a register they route to changes |
| Response playbooks | P-1 … P-6 | 6, one per watchlist line | Row owners | After any tabletop that changes a row |
| Tabletops | TT-1 … TT-10 | 10 | Founder | Per their scheduling rule |
| Parameter families | §20.13 table | 13 families | Family owners | Every release, via C-13 and C-14 |
| Evidence dependencies | §20.17 table | 42 rows, each naming what would invalidate the evidence and which rows change | Research lead | On the recapture cadence stated per row |
| Evidence-grade ladder | §20.24 table | 9 grades × 5 permitted uses | Research lead | When a grade's permitted uses change |
| Decision thresholds | §20.28 table | 22 — 18 proposed, 2 derived, 1 documentary, 1 unset pending an owner decision | Named confirmer per row | Once, before collection begins on the item it governs |
| Section acceptance criteria | AC-1 … AC-12 | 12 | Reviewer | Every PRD version |

**Coverage cross-check.** Three things this section was required to cover, checked against the rows that cover them. The five risk areas this document was directed to add are present as R-31 (migration seasonality and the April-only go-live), R-32 (attended-filing legality), R-4 (Form 138 Q4 slippage, with its escalation-date parameter), R-22 with V-27 (the DPDP compression proposal), and R-1 with R-41 (Zoho gate widening). The four whole-thesis kill conditions each map to at least one validation whose result decides them — V-16 and V-01 for the first, the R-35/R-36/R-37 watch for the second, V-05 and V-02 for the third, V-26, V-30 and V-03 for the fourth — which is check C-22. And every Part D item that this section touches is routed rather than answered: V-25 for the attended-filing four, V-27 for DPDP and SPDI survival, V-24 for the EPF Aadhaar question, the counsel-routed parameters in §20.13, and NG-24's standing decline against answering any of them ourselves.

**What the census is for.** The nineteen registers above hold **441 rows** between them — 469 counting the twenty-two boundary tests, the four qualifier-required figures and the two entities removed from the competitive set. That many rows cannot all be reviewed on the same cadence, and pretending otherwise is how a register dies. The cadence in §20.10 covers six lines. The integrity checks cover the structure. Everything else is reviewed when the evidence behind it moves — which is what §20.17 maps, and why that map, rather than a calendar, is the maintenance instrument for this section.
---

### 20.35 One month of the control system, end to end

The registers are described separately and used together. This is a single filing month with all of them running, written as the sequence a real calendar would produce, so that the interfaces between them are visible. Every event in it is drawn from a register row in this section; none is a prediction.

**Day 1–3, the cadence review.** The six watchlist lines report in the §20.10 format. R-2's line records a dated ESIC and MoLE check including a corrigendum check, with a null result — recorded as a positive statement that the watch ran, not as silence. R-16 reports the ISO 27001 milestone reached. R-10 reports releases due against releases shipped, and any rule that shipped stale. R-3, R-15 and R-30 report corrigendum checks completed, the add-back reconciliation result, and the boundary-test failure count. R-17 reports whether any commitment in the period cited a `[Hypothesis]` figure. R-31 and R-32 report V-15's state and V-25's state per portal. Nothing is closed on absence of evidence.

**Day 4, a statutory change lands.** The §22 watcher, keyed to amendments as well as new instruments, flags a corrigendum to an implemented rule. R-3 fires. The parameter it touches moves SUPERSEDED → IN_SIZING (§20.13's lifecycle), is re-sized under its existing route with the new source and date, and re-enters the staged publish with two-person review. The delta for affected periods is computed as a diff against the corrected rule version, never as a mutation of a filed period. Because one affected return is approved but unpaid, EV-037's guard permits a Revised return; had payment been initiated, the correction would have been a later-period diff instead. Check C-14 confirms the new value carries provenance before it can be published.

**Day 7, an outbound artefact.** A deck goes out. The §20.4 scan runs across it: one slide carries a correct EPFO establishment count with the word *contributing* missing, which fails under standing rule 7 — TC-06's exact shape — and is corrected before release. A second slide carries an inference cost figure, which passes only because it is labelled `[Hypothesis]` with its validation id and its kill criterion in the same sentence. C-11 records that the scan ran; C-12 records that no qualifier-required figure shipped stripped.

**Day 9, a validation reports.** A desk item closes. The gate owner runs the ten-minute audit from §20.15: pre-registration filed before collection start, sealed fields identical, artefact exists, result decided in the threshold's own units, downstream edits made, no unregistered contradiction. It closes PASS. The parameter it sized moves ROUTED → IN_SIZING → SET → PUBLISHED; the fence it released is lifted in §05; the risk it retires is re-stated with its new residual rather than assumed to be unchanged; C-05 confirms there is a changed line to point at.

**Day 12, a competitor moves.** The named-page watch reports a change on a vendor's pricing page. DT-4 routes it: a published price on the vendor's own page, captured with URL, date and capture mode, changes the §21 price table and any §20 row citing it — and because a quoted figure moved, the §20.4 scan is re-run across live artefacts. R-40's trigger is checked and R-39's is not met. No claim about the competitor leaves the room without a dated capture and a stated capture mode.

**Day 14, the verification gate.** The month's ECR is prepared. The pre-upload validator runs the boundary corpus: a member at the ceiling producing 1,800 / 1,250 / 550, a post-2014 joiner above the ceiling producing a **flag** rather than a rejection, a member turning 58 inside the wage month exercising the captured closure boundary, and a UAN name mismatch caught before upload rather than at it. The gate sits immediately before payment initiation, because after that point downward correction has no in-file route (EV-036, EV-037).

**Day 15, the filing.** Upload, validate, return statement, approve, Due Deposit Balance Summary, challan with TRRN, pay, receipt. The payment file is built from the Summary and not from the payroll totals, because interest under s.7Q is added by the portal and the payroll run does not contain it. The ledger records the month as filed, per establishment, unbroken — and the month's state, not merely its success, because a NIL month and a rejected-then-corrected month are different histories.

**Day 18, an attended session is reviewed.** The session log is read, not merely written. Every action reconciles to an approved instruction; had one not, R-53 would fire — hand back, disclose in the "what we did on your behalf" record, suspend the credential. V-26's time-and-motion capture for the cycle is filed: minutes per filing type per registration, with exception rates separated from the happy path, feeding the parameters that size the dominant COGS line.

**Day 25, a decision is taken.** A commitment is proposed that cites a pricing figure. P-5 runs: the figure is identified, its validation id is found, its gate has not cleared — so the figure is either removed or carried labelled with its kill criterion, in the same sentence. There is no third option, and the artefact is corrected before it circulates.

**What the month demonstrates.** Nine interfaces, and not one of them required a judgement about whether the register applied. That is the entire design intent: the expensive decisions — which return type, which correction path, whether a figure may ship, whether a gate clears, whether a session was in bounds — were all made in advance, in writing, by people who did not yet know which way the month would go.
**Section status.** The non-goals and the Killed list are **[Verified]** or **[Killed]** — they rest on primary sources and disproven claims and are safe to enforce. Several earlier entries are **[Reversed]** in this version and must not be re-imported from older drafts — most consequentially the multi-state PT/LWF kill (AR-3, §20.5), the Keka price ban (§20.4) and the 93–99% inference-margin claim (AR-5); each **[Reversed]** marker carries its one-line reason where it appears. The statutory edge cases (§20.9) are **[Verified]** as *rules that must be encoded*, but their exact slabs/ceilings are inputs to V-08/V-09 and are effective-dated by design. The validation plan is a *plan*, not a result: nothing in §18 (pricing/channel) or the AI monetisation reasoning is validated, and this section's entire purpose is to make that visible and to gate the money on closing it. The desk items (V-17–V-25, V-27) are the part of the plan that can close now, and several block specific build items rather than money (§20.6 split). The sizing register (§20.13) holds names, routes and owners, never values. The risk register's responses are pre-agreed *intentions*; several (R-10, R-14, R-16, R-17, R-31, R-32) are company-shape decisions the reader must consciously ratify, not defaults the document can make on their behalf.

**Status of the material added in this version.** §20.14–§20.35 add no new facts: every figure in them is either cited to an evidence row or derived in the open from one, and every value the specification needed and did not have is a named parameter in §20.13 with a route and an owner. The registers they specify — the validation record and its lifecycle, the risk record and its lifecycle, the banned-number scan and its test corpus, the integrity checks, the evidence dependency map, the rehearsals and the decision tables — are **[Hypothesis]** in exactly one respect: they are propositions about our own behaviour, and the only thing that tests them is running them. The tabletops in §20.18 are the nearest thing to a validation of that, and §20.30 names the five dependencies that no control here can close. A reader should treat the machinery as specified and unproven, in the same way this document treats everything else it has not yet run.
