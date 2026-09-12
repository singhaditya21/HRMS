## 21. Competitive Landscape & Parity

This section is the PRD's canonical competitive record. It holds the corrected Frappe/Tally parity table, the rate-card evidence behind the priced-vendor comparison and the 50-seat floor, Keka in full, the freemium paywall, the finding that no vendor claims to submit a filing, packaging, the AI claim-posture comparison, the enterprise adjacency, the competitive-response scenarios, and the rule that governs every competitor claim that leaves the building. Other sections draw on it and do not restate it: §04.4 keeps only what sizing and the wedge depend on; §18.11 and §18.12 turn this evidence into battle cards and a list-price comparison; §12 and §13 own AI governance and AI cost; §16.2 and §16.7 own the importers; §22 owns the attended-filing operation; §23 owns the law. Where another section states a competitor fact differently, this section's capture record governs the fact, and the other section's owner governs what is done with it.

Three things are true of every line below. They are what make the section usable in a hostile review.

1. **Nothing was executed.** No competitor product was installed, trialled or run in any research round. Every capability statement is *declared capability* — read from a vendor page, product documentation or a source repository — never *observed behaviour*. Where a row says "absent", it means absent from the artefact that was read, on the date it was read (r3/01, r5/03).
2. **Every fact carries a capture.** Pricing and packaging captures are dated 4–5 September 2026 unless a row says otherwise (r1/08, r5/03). The Frappe HR and ERPNext source trees were read at v16 stable, tag v16.17.1 (r3/01). TallyPrime was read from its own help documentation, FAQ and buy page (r3/01, r5/01). Keka's withdrawn card is an archived capture of Keka's own page dated 1 August 2024 (EV-022). Round-one and round-two captures that no later round re-checked carry the §02.3 discount — treat them as roughly 70–75% reliable — and are tagged with their round wherever they appear.
3. **No row is a sales claim until it clears §21.12.** A fact that is safe to build on is not automatically safe to say to a prospect. The clearance rule in §21.12 is the gate, which is why this section is written as "the artefact read shows" rather than "the competitor cannot".

### 21.1 Scope, vocabulary and the evidence posture

#### Five groups that earlier drafts conflated

Earlier drafts used "the incumbent" for three different things. That confusion produced two errors this revision reverses (K-01, K-23). This section uses five terms and keeps them apart.

| Term | Members | What the term is for | Source |
| --- | --- | --- | --- |
| **The two incumbents** | TallyPrime (with the CA who operates it) and greytHR | Who holds each *job* the beachhead buyer already pays to have done: Tally the accounting and statutory-artefact job, greytHR the HRMS job | K-23; EV-032; EV-091 |
| **The zero-price parity comparators** | Frappe HR v16 and TallyPrime | The bake-off a prospect with a free or sunk-cost alternative actually runs. The corrected parity table (§21.3) is written against these two | EV-031; EV-032 |
| **The six-vendor priced set** | greytHR, Qandle, Pocket HRMS, Zimyo, HROne, Keka | The published-card SaaS field at the beachhead. The seat-floor finding and the common-point price table are scoped to exactly these six | EV-026; EV-027 |
| **The freemium players** | Kredily; Zoho Payroll and Zoho People | Where computation is priced at zero and outputs are charged | EV-029 |
| **Enterprise adjacency** | Ramco and ZingHR, with Darwinbox and PeopleStrong as enterprise suites | Vendors kept out of the competitive set because they sell into enterprise procurement, not into the beachhead | EV-033 |

Tally appears in two rows on purpose: it is an incumbent for the job it does and a parity comparator in the bake-off. greytHR appears in two rows for the mirror reason.

**The sentence "multi-state PT and LWF is greenfield in both incumbents" (K-01) is about the parity comparators, Frappe and Tally.** It is not a statement about greytHR, whose payroll page says "PT with all state-specific rules built-in" (r5/03, captured 5 Sep 2026); nor about Zoho Payroll, whose free tier lists "Statewise PT, LWF" (r2/01); nor about Keka, whose entry tier lists pre-built "PF, ESI, LWF, TDS" statutory reports (r5/03). Against those three the state layer is *claimed parity*. Our differentiation there is maintenance under contract, jurisdiction resolved on the work location, and attended submission — not presence. §21.3 sets out what "greenfield" does and does not license. Sections that write "both incumbents" in this context mean Frappe and Tally, and should say so.

#### The competitive set register

One row per entity the research examined. "Executed" is "No" throughout: no product was run.

| Entity | Class | In the set? | Why | Evidence held | Captured | Executed |
| --- | --- | --- | --- | --- | --- | --- |
| TallyPrime | Incumbent (job 1); parity comparator | In | Owns the statutory-artefact job; payroll ships inside the licence (EV-032) | Help docs and FAQ; buy page; five TDL catalogues | r3, r5 (Sep 2026) | No |
| greytHR | Incumbent (job 2); priced set | In | Claims "30,000+ companies" (EV-091); full published card (EV-027) | Pricing, payroll, partner and press pages | r1 (4 Sep 2026), r3, r5 (5 Sep 2026) | No |
| Frappe HR v16 | Parity comparator | In | Free open-source alternative with genuinely strong gross-to-net (EV-031) | Source trees (hrms v16.17.1, erpnext v16, india-compliance); docs; product and pricing pages | r2, r3 (Sep 2026) | No |
| Kredily | Freemium | In | ₹0 computation at unlimited headcount; outputs charged (EV-029) | Pricing page | r1 (4 Sep 2026), r2, r3 | No |
| Zoho Payroll, Zoho People | Freemium | In | ₹0 to 10 employees (Payroll) and 5 users (People); the credible commercial floor (r2/01) | Pricing pages, pricing JSON, dated changelog | r1 (4 Sep 2026), r2 | No |
| Keka | Priced set | In | Best-capitalised pure-play in the band (§04.4); live card suppressed (EV-021) | Raw HTML with comment scan, archive, terms of service, AI page | r1 (4 Sep 2026), r5 (5 Sep 2026) | No |
| Qandle (MYND) | Priced set; nearest occupant of the filing corner | In | Four-tier card recovered from its own pricing config file (r5/03); inside a payroll-outsourcing group since April 2025 (EV-034) | Pricing config file; rendered page | r5 | No |
| Pocket HRMS | Priced set | In | Published card with a hard 50-employee floor (r5/03) | Pricing page | r1, r5 | No |
| Zimyo | Priced set | In | Per-user card with "Minimum billing for 50 Users" (r5/03) | Rendered page (returns HTTP 403 to a non-browser fetch) | r1, r5 | No |
| HROne | Priced set | In | Published block card; an unpriced programme for companies under 50 (r5/03) | Pricing page | r1, r5 | No |
| factoHR | Beachhead-adjacent | Watch | Published card including a free tier to 20 employees (r1/08); filed revenue in §04.4 | Pricing page | r1 (4 Sep 2026) — not re-checked since | No |
| RazorpayX Payroll | Beachhead-adjacent, fintech parent | Watch | Flat plan to 20 employees; mid plan capped at 100 (r1/08) | Pricing page | r1 (4 Sep 2026) | No |
| 247HRM | Beachhead-adjacent | Watch | Base block for 50; usage-billed AI credits from a prepaid wallet (r1/08) | Pricing page | r1 (4 Sep 2026) | No |
| sumHR | Fintech-owned HRMS | Watch | Per-user tiers billed annually (r1/01; r1/08); owned by the neobank Jupiter (r2/02) | Pricing page; trade press | r1, r2 | No |
| MYND Integrated Solutions | Services layer, owns Qandle | Watch | The only bundle pairing self-serve HRMS with an outsourced filing operation — unpriced, demo-sold (EV-030, EV-034) | Acquirer announcement; trade press | r5 | No |
| Ramco | Enterprise adjacency | Out | Enterprise multi-country payroll; no published price (EV-033, EV-092) | Audited annual report FY2025-26 | r5 | No |
| ZingHR | Enterprise adjacency | Out | Titled "Enterprise HCM"; no price; its pricing URL returns 404 (r5/03) | Homepage | r5 | No |
| Darwinbox, PeopleStrong | Enterprise suites | Out at launch | No public price (r1/08); enterprise is closed to a new entrant for roughly three years (§05.2) | Pricing-URL status checks; filings | r1 | No |
| HONO | Enterprise, agentic positioning | Out at launch | Positions as a "headless HRMS"; enterprise logo list (r2/07) | Homepage; aggregator record | r2 | No |
| CAs and payroll bureaus | Services layer | Not a competitor — channel and price anchor | The budget line the product redirects (§18.7) | Indicative fee band, unvalidated (§20 V-01) | r2 | n/a |
| Aparajitha / Simpliance | Services layer (compliance operations) | Partner or acquisition candidate, not a competitor | 1,500+ staff across 25 states; software includes a payroll/remittance product; no AI claim anywhere on its site (r2/07) | Company site; acquisition release | r2 | No |
| TeamLease, Quess | Staffing majors | Not product competitors | TeamLease impaired its HR-technology subsidiary by ₹6.4 Cr in FY26 (r2/07) | Audited results | r2 | n/a |
| Odoo | ERP with an HR module | Out | India is not an official Odoo payroll localisation; four third-party India payroll modules (r2/01) | Documentation; app store | r2 | No |
| Alight | — | Removed | Sold its payroll business (§20.4) | — | — | — |
| Ascent HR | — | Not defunct | An earlier exit inference rested on a mistyped domain (§20.4) | — | — | — |

The register is not claimed to be complete. Round five found that greytHR — the largest vendor by claimed customer count — had been missing from the mid-market pricing dimension's prior round, and reached it only because a competitor's FAQ named it (r5/03); round one's market dimension had separately captured greytHR's card on 4 September 2026 (r1/08). A vendor can be present in one research dimension and absent from another, so the completeness question is asked per dimension. A vendor set is re-swept before any comparative claim is made (§21.13), and "is anyone missing?" is a standing question on that sweep.

#### How a vendor enters and leaves the competitive set

Membership is not a judgement re-made each time someone writes a deck. It is a dated state with entry criteria, and it moves under events, because two of this section's load-bearing findings — the seat floor and the submission null — are scoped to *the six-vendor priced set* and change meaning the moment that set changes. Round five is the worked instance: adding greytHR moved the finding from five of five to six of six and refuted a price-floor claim in the same step (r5/03).

**Entry criteria for the priced set.** All four must hold: the vendor sells HR or payroll software directly to employers; it serves the 20–200 band on its own pages; it publishes a rate card, or publishes a floor from which a card can be read; and payroll is inside a tier it prices. A vendor meeting the first two but not the last two is `beachhead_adjacent` and watched. A vendor selling an outsourced operation rather than software is `services_layer`, whatever it also licenses.

| From | Event | Guard | Side effect | Who may trigger |
| --- | --- | --- | --- | --- |
| not in the record | A vendor is named by a prospect, a competitor's own page, a partner or a sweep | A capture of the vendor's own pages exists | Row created with `dimensions_searched` naming only the dimension that found it | Research |
| `beachhead_adjacent` | The vendor publishes a rate card carrying payroll | Captured from the vendor's own page | Moves to `priced_set`; **EV-026 and EV-027 are re-scoped**; every claim citing "six of six" or the price table returns to WITHDRAWN pending recomputation | Research, with the founder informed |
| `priced_set` | The vendor withdraws its published card | Two captures, before and after | Stays in the set with `plan_status` `archived_withdrawn` on its price points and a live floor row if one exists — Keka's case; the set does not shrink because a card was withdrawn | Research |
| `priced_set` | The vendor exits the band, is acquired into an enterprise motion, or stops selling payroll | Evidence, not inference | Moves class with the date; findings keep their historical scope and are not retro-fitted | Research |
| `out_of_set` | Enterprise adjacency starts publishing a card for the band | Captured | Re-entry follows the same four criteria; §05.10's graduation band is unaffected | Research |
| any | An acquisition | The acquirer's own announcement or a filing | `ownership` updated with the date; the class is re-tested, since an acquisition can move a vendor from `priced_set` to `services_layer` in effect — Qandle inside MYND is the case to watch (CRS-07) | Research |
| any | A dimension sweep finds the vendor was never searched in that dimension | — | `dimensions_searched` updated; any claim scoped to that dimension's set is re-validated | Research |

**Requirements.**

| ID | Requirement | Acceptance criterion |
| --- | --- | --- |
| CLR-43 | Every set-scoped finding names its set and its capture date, and is recomputed whenever the set changes. "Six of six" is a statement about a membership list on a date | Given a change to `priced_set` membership, when the register is validated, then every claim citing the set's cardinality is WITHDRAWN until recomputed |
| CLR-44 | A vendor is added or reclassified only on a capture of that vendor's own artefacts. A prospect's or competitor's description of a vendor may trigger a search and may never create or move a row | Given a reclassification whose only evidence is a third-party mention, when it is submitted, then it is refused and a capture is queued instead |

#### Evidence classes and what each can support

| Evidence class | Used for | Strength | Known failure mode | Example in this section |
| --- | --- | --- | --- | --- |
| Source repository, stable branch | Frappe HR / ERPNext capability | Strongest evidence of *absence* inside the trees read; silent about artefacts outside them | A product page may describe an artefact outside the trees read | EV-031; the Frappe product-page item in §21.3 |
| Vendor product documentation | TallyPrime capability | Strong for documented features; weak for undocumented ones and for currency against the latest Finance Act | Search-engine summaries misquote the page — a summary claims Tally lets you "choose the state and slab" for PT; Tally's own page says the opposite (r5/01) | EV-032 |
| Vendor page, raw fetch with a comment-node scan | Suppressed prices and suppressed features | The only method that sees commented-out content | A rendered read cannot see it | EV-021; EV-028 |
| Vendor page, rendered read | Client-rendered prices | Needed where the page injects prices with JavaScript | A raw fetch shows empty spans | Qandle, Zimyo (r5/03) |
| Vendor pricing config file | JavaScript-injected prices | The strongest price source where it exists | Unrendered config values are not published prices and must not be quoted (r5/03) | Qandle (r5/03) |
| Archive snapshot of the vendor's own page | Withdrawn cards and deleted terms | Frozen and historical | Not a current price | EV-022; the deleted Keka FAQ (EV-025) |
| Vendor terms of service | Renewal, refund, lock-in | Contractual text | Clause numbering drifts between versions | EV-025 |
| Filed financials | Scale | Audited or ROC-filed | Filing lag; segment aggregation | EV-033; EV-092 |
| Vendor marketing claims — counts, AI, launch dates | Positioning only | Weakest | Internally inconsistent on the same day | EV-091; Keka's 12,500+ against 10,000+ (r5/03) |
| Another vendor's comparison page | Never | — | Disagrees with the named vendor's own page | Pocket HRMS's pricing FAQ gives greytHR's minimum paid plan as ₹3,495 a month; greytHR's own page shows ₹2,495 (r1/08; r5/03) |

The capture method for every row follows §02.5's dual-capture rule. This section adds one competitive-specific requirement: a row's *executed* status is recorded as a field, not implied. The two values are **declared capability** (pages, documentation or source read) and **observed in product** (executed, with the build or tenant date). No row in this revision is observed.

#### What this revision reverses or kills in the competitive record

| v0.3 statement | Status | Replacement | Evidence |
| --- | --- | --- | --- |
| "Frappe HR is free and open-source with PT across 15+ states and LWF across 14" — and the conclusion that multi-state PT/LWF is not a differentiator | **[Reversed]** (K-01) | The Frappe source trees read contain no Indian state name, no PT slab table and no LWF logic; TallyPrime has no state PT slab table and no LWF engine. Multi-state PT and LWF is greenfield in both parity comparators | EV-031; EV-032; EV-K12 |
| "TallyPrime is the real incumbent, statutorily complete at ₹0 incremental" | **[Reversed]** (K-23) | Two incumbents, two jobs. Tally ships the central artefacts but not the state layer, leave or encashment; its payroll *adoption* is unknown | EV-032; EV-K34 |
| "Keka's INR tiers are TLS-blocked and unverified; treat every Keka pricing claim as provisional" | **[Reversed]** (K-10) | Obtained: commented-out live rates, the archived card, the live small-business floor. The block was one fetch tool's failure, not the site's | EV-021–EV-025; EV-K21 |
| "Keka is the competitor that matters for the beachhead" | **[Reversed]** | greytHR holds the HRMS job (K-23). Keka is the top of the price band and the published-price opening | EV-024; EV-027; EV-091 |
| "greytHR = 34,000 customers / 4.4% share ceiling", undated | **[Reversed]** (K-16) | greytHR currently claims "30,000+ companies"; its own pages have shown several counts on one day. Every share figure carries a capture date | EV-091; EV-016; EV-K27 |
| "Keka renewal rates run below list" | **[Killed]** (K-17) | Keka's terms of service, clause 15: renewal fees "subject to an increase" | EV-025; EV-K28 |
| "The effective price ceiling at 50 employees is roughly ₹45–50 PEPM" | **[Reversed]** (K-09) | Two anchors: a value floor near ₹50 PEPM and a mid-market clearing band of ₹80–200 PEPM | EV-027; EV-006; EV-K20 |
| The "Payroll Plus ₹5,999" Tally add-on as evidence of an ecosystem fix | **[Killed]** (K-20) | Sold on a lookalike domain; five TDL catalogues show no payroll, PT or LWF add-on | EV-032; EV-K31 |
| "Every quote-only vendor spot-checked — greytHR, Keka, Darwinbox, PeopleStrong" | **[Reversed]** | greytHR, Qandle, Pocket HRMS, Zimyo and HROne publish full cards; Keka suppresses; the enterprise suites publish nothing | EV-027; r1/08 |
| Any implication that competitors bill actual headcount from employee one | **[Killed]** (K-25) | Six of six priced vendors bill a 50-employee minimum block on their published cards (Keka's archived block: 100) | EV-026; EV-K36 |
| "Tally is statutorily complete but has no filing service, no employee app" | **[Reversed]** in part | Tally ESS is *contested* — its marketing site describes a self-service portal; its help documentation has no ESS topic. Assert nothing either way | EV-032 (unresolved cell) |
| "Nobody has shipped HR AI at scale in India" | **[Reversed]** in part | greytHR presents NAVOS as generally available on every paid plan since 3 June 2026 and Zoho logs Zia in a dated changelog — claim posture, not tested. The monetisation half survives: no one in the set charges for it | EV-090; r1/04 |

Three research-round readings are also superseded here, although no earlier PRD draft adopted them as conclusions: "Qandle is the price floor of the entire set" (greytHR undercuts it on monthly billing — r5/03); "Frappe's India Payroll covers PT, LWF, ECR and ESI returns", read from a Frappe product page in round two and not reproduced in the source trees read in round three (§21.3); and round two's reading of the strings "Form 130" and "Form 138" on Zoho's India pages as CMS corruption — under the Income-tax Act 2025 mapping they are the successor numbers of Form 16 and Form 24Q (EV-050), so Zoho's copy is simply in the new vocabulary.

### 21.2 Two incumbents, two jobs

The beachhead buyer is already paying to have two different jobs done, and different vendors hold them (K-23). Round three surfaced the split and did not reconcile it: the parity work was a Frappe-versus-Tally bake-off while the vertical and channel work called greytHR "the volume incumbent at this band" (r3 critic). They are different fights. They need different displacement arguments, different migration tooling, different battle cards and a different channel posture, and this subsection states each.

**Job 1 — accounting and the statutory artefacts: TallyPrime plus the CA who runs it.** TallyPrime ships the central statutory artefacts inside the licence — PF Forms 3A/5/6A/10/12A and the ECR, ESI Forms 3/5/6, a PT statement, Form 16 (now Form 130 — EV-050), the 24Q (now Form 138) annexures, Form 12BA (now 123), Form 27A, NPS and gratuity — but no state PT slab table, no LWF engine, no leave module and no leave-encashment calculation (EV-032). Once the licence is paid the payroll module costs nothing extra: TallyPrime Silver is ₹22,500 as a lifetime licence or ₹750 a month and runs on a single PC; Gold, which adds multi-user access over a LAN, is ₹67,500 lifetime or ₹2,250 a month, both plus 18% GST (r3/01, Tally's buy page). The CA carries submission and the relationship. Tally's integration surface is XML or JSON over HTTP into a *running local instance*, or ODBC — a LAN endpoint, not a cloud API — which is why the Tally importer needs a file path or a local connector (r3/01; §16.2). **What is not known is adoption:** how many Tally businesses actually run Tally *payroll*, as distinct from owning the capability, is the open question §20 V-02 exists to answer (EV-032).

**Job 2 — the HRMS: greytHR.** greytHR claims "30,000+ companies" (captured September 2026, EV-091) — about 3.9% of the 7,66,254 contributing establishments, the dated share ceiling §04 works from (EV-016). The ratio divides a vendor's count of *companies* by a count of *contributing establishments*, a unit mismatch that travels with the figure (§02.15). It publishes a full card — Essential ₹2,495 a month including 50 employees plus ₹45 per additional employee (EV-027) — and states that "every plan includes complete payroll, leave management, and employee self-service" (EV-028; r5/03). Its statutory language is generation only: ECR generation, ESI challans, Form 24Q generation "with automatic FVU validation", Form 16 generation; the words "filing", "TRACES" and "EPFO" do not appear on its payroll page (EV-030; r5/03). Its assistant NAVOS is "included in every plan" (EV-090). Two distribution assets matter more than any feature. Its Alliance Partner track is overwhelmingly banks and payment networks — ICICI Bank, HSBC, IDFC First Bank, AU Small Finance Bank, Bank of Baroda, Kotak Mahindra Bank, Visa and Mastercard, alongside AWS, Google, Zoho, Jio and Godrej Nirmaan — a channel no other vendor in the set displays (r3/03). And it runs a Payroll Service Provider landing page, "greytHR for PSPs: Multi-Client Payroll Management", which calls greytHR "the trusted Payroll Partner for 1000+ Payroll Service Providers" and lists multi-client tooling (r1/08). Round three re-read the same page and classed it as a demo-capture page rather than a programme page with published terms; no CA-specific programme page was found (r3/03). The later reading governs: this section treats the PSP offer as a page and its tooling, not as a programme whose terms are known. Its pricing FAQ states no cancellation fee or lock-in on any plan (r1/08). Its operating company filed FY25 revenue of ₹125.22 Cr, up 29% — the input to the ~₹52 realised-PEPM point (EV-006) — and its profitability is not public (r2/09). Its own pages carry more than one customer count, including "around 20,000+ paying businesses in India and GCC countries" on its About page, which is why every greytHR count travels with its capture date (r2/09; EV-016; K-16).

**Beneath both — the spreadsheet and the CA.** For some share of the band the working status quo is a spreadsheet for payroll, Tally for accounts and a CA for the portals. That share is unknown and is the same measurement as Tally payroll adoption (§20 V-02). If adoption proves low, the displacement target in job 1 is the spreadsheet, not Tally payroll, and the importer and channel priorities shift toward greytHR (§01 validation table).

<!-- DIAGRAM: competitive-landscape-two-jobs -->

#### The two jobs compared

| Dimension | Job 1 — TallyPrime + CA | Job 2 — greytHR | Consequence for us |
| --- | --- | --- | --- |
| What the buyer is paying for | Books of account, the statutory artefacts and someone to put them on the portals | An HR system of record with payroll, leave and self-service | We sell the filing carried to portal acceptance into both, from different doors |
| What the incumbent holds | The accounting relationship and the CA's monthly routine | The employee record, leave history and the employee's login | Job 1: attach, keep Tally for accounts. Job 2: migrate the system of record |
| Price the buyer sees for payroll | ₹0 incremental once the licence is sunk (r3/01) | ₹2,495 a month for up to 50 employees on Essential (EV-027) | Job 1: we are an added cost justified by work removed. Job 2: we must beat a 50-seat block on structure (§21.4) |
| Who submits the return | The CA, on portals, under the employer's credentials | The customer — greytHR publishes generation language only (EV-030) | Attended, assisted submission is new in both (K-13; §22) |
| State PT and LWF | PT slabs hand-entered per pay head; LWF not a statutory pay type (EV-032; r5/01) | "PT with all state-specific rules built-in" (r5/03) — a claim, not tested | Job 1: coverage is the argument. Job 2: maintenance under contract, work-location scoping and submission are the argument, never coverage |
| Leave and attendance | No leave module; attendance by manual voucher (EV-032) | Included; attendance is the first upsell from Essential to Growth (r1/08) | Job 1: leave-to-payroll is a real gap. Job 2: parity |
| Employee surface | Contested — assert nothing (EV-032) | Self-service on every plan (EV-028) | Job 1: do not claim. Job 2: parity |
| AI | None in the evidence | NAVOS in every plan (EV-090) | AI is parity at best in job 2 (§21.9) |
| Distribution | Four-grade partner channel; its public locator listed 1,257 partners; a separate CA Community (r3/03) | Bank alliances and a PSP landing page with multi-client tooling (r3/03; r1/08) | Job 1: never sell against the partner's licence revenue (§18.8). Job 2: compete directly |
| Switching cost | YTD inside Tally and the CA's habits | HR history, YTD and the employee's app | Both: mid-year YTD tie-out is the gate (§18.9) |
| Migration path | Tally importer — first in the importer set (§16.2, §16.7) | A greytHR export importer is named in §16.7, sequenced after Tally among the named-source importers | Sequence open: CQ-12 (§21.14) |
| Never say | "Switch off Tally" — kills the partner channel (§18.8) | "greytHR can't do multi-state PT" — its page claims it does | Both enforced by §21.12 |

#### Which job we take, by the prospect's current stack

A decision table for the first sales conversation. It names the job displaced, the argument, the migration path and what is conceded. Every competitor fact in a cell is subject to §21.12 before it is said aloud.

| # | Prospect's current stack | Job we take | Lead argument | Migration path | What we concede |
| --- | --- | --- | --- | --- | --- |
| 1 | TallyPrime with payroll enabled, CA submits, single state | Payroll inside job 1 | Leave-to-payroll (PAR-24), attended submission with status visibility; the state layer as the firm grows. Nothing is said about Tally's employee surface while that cell is open (CLR-15) | Tally importer (§16.2) | Central-artefact parity; Tally stays the book of record |
| 2 | TallyPrime for accounts, payroll on a spreadsheet, CA submits | The spreadsheet | One record from attendance to the filed return; attended submission; the CA armed, not replaced | Spreadsheet importer (§18.9) | The CA's advisory relationship |
| 3 | TallyPrime, establishments in two or more states | Payroll inside job 1 | Multi-state PT and LWF, which Tally does not ship (EV-032), maintained under contract | Tally importer | Tally's granular multi-user permissions (r3/01) |
| 4 | greytHR Essential, 20–49 employees | Job 2 | No seat floor — the firm pays for 50 (EV-026, EV-027); attended submission (EV-030). Never "cheaper" without the headcount-specific computation (§04.4 AC-17) | greytHR importer (§16.7) | Artefact generation, FVU validation and AI are parity |
| 5 | greytHR, 50–200 employees, several states or entities | Job 2 | Maintained multi-state rules, the registration model and attended submission; the registration allowance is priced openly (§18.3) | greytHR importer (§16.7) | Sticker price: greytHR Essential at ₹49.90 PEPM is the value floor (EV-027) |
| 6 | Kredily or Zoho Payroll free, approaching 20 employees | The free tier | The EPF moment: outputs and attended submission arrive when the filing surface jumps (§18.2 P1, P2) | Kredily / Zoho importer (§18.9) | Computation is free there and parity here |
| 7 | Frappe HR self-hosted or partner-run | Parity comparator | The statutory layer and its maintenance under contract; attended submission | Frappe importer (§18.9) | Gross-to-net — the bake-off will not be won there (EV-031) |
| 8 | Keka | Priced set | A published, all-in card with no seat floor; attended submission | None named | Suite breadth |
| 9 | CA or bureau only, no software | Services layer | A fixed monthly price and visibility the retainer never gave; the CA keeps the relationship (§18.7) | CA console (§18.7) | The CA's standing with the employer |

### 21.3 The corrected Frappe / Tally parity table

This is the bake-off a prospect with a free or sunk-cost alternative runs. It has one conclusion that must never be lost: **the bake-off will not be won on gross-to-net.** Frappe HR's salary engine is genuinely strong (EV-031), and a feature-by-feature pitch on calculation loses to something free. What the table shows instead is that the *statutory* layer — the rate tables, the state dimension, the artefacts, the maintenance obligation and the submission — is where the two parity comparators diverge from each other and from us.

**[Reversed]** (K-01). Earlier drafts said Frappe ships PT for 15+ states and LWF for 14, and concluded that multi-state PT and LWF was table stakes. The source says otherwise. Frappe HR v16's entire India payroll layer is three files and 549 lines — `setup.py` (285), `utils.py` (221) and `data/salary_components.json` (43) — and India overrides exactly three functions, two for HRA exemption and one for marginal relief; the regional-deductions hook has an empty default body and India does not override it. No Indian state name appears anywhere in the v16 tree. ERPNext v16 has no India regional module and removed payroll; the `india-compliance` app covers GST, income-tax (vendor TDS), VAT and audit trail only (EV-031; r3/01). TallyPrime, for its part, has no state PT slab table and no LWF engine (EV-032). Multi-state PT and LWF is therefore **greenfield in both parity comparators** and a genuine differentiator against them.

#### What Frappe's India layer does contain

A parity reading that lists only absences overstates the gap. The three files are not empty, and the bake-off concedes what they do.

| Artefact in the India layer | What it does | Source |
| --- | --- | --- |
| Three regional overrides in the hooks file | Annual eligible HRA exemption; HRA exemption for a period; tax with marginal relief | r3/01 |
| `utils.py` | The three-case HRA minimum, with rent-date overlap validation | r3/01 |
| `setup.py` — component types | Adds "Provident Fund", "Additional Provident Fund", "Provident Fund Loan" and "Professional Tax" as salary-component types a user tags; no rates attach to them | r3/01 |
| `setup.py` — declaration fields | Adds HRA fields to the tax-exemption declaration and proof-submission doctypes | r3/01 |
| `setup.py` — gratuity | Creates an "Indian Standard Gratuity Rule": a five-year minimum, rounded work experience, a 15/26 slab | r3/01 |
| `salary_components.json` | Seeds components, including Leave Encashment | r3/01 |
| Two reports | "Provident Fund Deductions" sums whatever was tagged PF; "Professional Tax Deductions" lists what was tagged PT | r3/01 |
| Outside the India layer | Income-tax slabs and taxable-salary slabs in the generic payroll module; the full gross-to-net engine; arrears and payroll correction | r3/01 |

Read together: Frappe gives an Indian employer a strong salary engine, HRA-exemption and marginal-relief logic (read in code, not executed), a gratuity rule and labelled buckets for PF and PT. What the employer must still supply is every statutory rate, every state slab, every return file and the maintenance of all of it (PAR-09 to PAR-23).

#### The full table

Columns: what the Frappe HR v16 source trees show (r3/01, read at tag v16.17.1); what TallyPrime's documentation shows (r3/01, r5/01); our v1 position; and the class the row puts us in. Form names carry both vocabularies (EV-050).

| # | Capability | Frappe HR v16 — source read | TallyPrime — documentation read | Our v1 position | Class |
| --- | --- | --- | --- | --- | --- |
| PAR-01 | Salary structure and gross-to-net | Genuinely strong: `salary_slip.py` is 2,743 lines — formula and statistical components, an employer-contributions table, LWP/PPL from leave or attendance, holiday-aware payment days, timesheet earnings, loans, benefit accruals, CTC and a YTD tax projection | Pay heads and salary structures; six enumerated statutory pay types — PF, ESI, NPS Tier-I, NPS Tier-II, PT, Income Tax (r5/01) | Credible parity (§08.2) | **Concede** — never the axis of the pitch (EV-031) |
| PAR-02 | Arrears and retrospective recomputation | Ships in v16 stable: `arrear`, `payroll_correction` and child doctypes, 13 files, with LWP reversal | Not established in the documentation read | Retro as a diff against the rule version in force for the period (§08.5) | Parity with Frappe; Tally not assessed |
| PAR-03 | The s.2(y) 50% wage add-back | No reference to "labour code", "wage code", "code on wages" or "social security code" anywhere in the repository | No Labour Code wage-definition topic in the payroll documentation index | Dual wage base with bounded fixed-point evaluation (§06.10, §08) | **Differentiator vs both** — we are not aware of either implementing it, as of September 2026 |
| PAR-04 | Gratuity | Computes it: an "Indian Standard Gratuity Rule" with a five-year minimum and a 15/26 slab | Computes it: a slab-based gratuity pay head and a Gratuity Summary of liability | Accrual and settlement (§06.6, §08.9) | Parity |
| PAR-05 | Leave encashment | A first-class doctype, a seeded component and payment-status handling | Its FAQ: the amount "cannot" be calculated in the payroll module, but an amount calculated outside payroll can be carried, with its PF, ESI and PT effects handled (quote both sentences — §21.12) | Computed from the leave ledger (§09.7) | Differentiator vs Tally; parity with Frappe |
| PAR-06 | Investment declaration and proof | The full declaration and proof-submission doctype chain; the three-case HRA minimum with rent-date overlap validation | An Income Tax Declarations master with a "Proof/Eligible Amount" field — operator-entered, no document upload | Form 124 (ex-12BB) workflow with proof upload and a reviewer (§07.5) | Parity with Frappe; narrow differentiator vs Tally (self-submission and upload) |
| PAR-07 | Income-tax computation — regime election, rebate, surcharge, cess | Income Tax Slab, Taxable Salary Slab and marginal relief exist; the computation path was not executed | Documents an explicit Section 115BAC new-tax-regime page — paraphrased, not quoted: no verbatim title is held in the evidence (r3/01) | §08.3, on both vocabularies (EV-050) | **Unresolved cell** — Frappe correctness (EV-032) |
| PAR-08 | NPS | Not assessed | NPS Tier-I and Tier-II statutory pay types and NPS reports | §11.8 | Parity with Tally; Frappe not assessed |
| PAR-09 | EPF computation — rates, wage ceiling, EPS split | No rate constants; PF exists only as a component type a user tags; the "Provident Fund Deductions" report sums whatever was tagged | PF computation through the PF statutory pay type | Engine with effective-dated rates (§06.2) | Differentiator vs Frappe; parity with Tally |
| PAR-10 | The ECR file | Zero matches for ECR, EDLI, EPS or UAN | A dedicated E-Challan Return page | The 11-field `#~#` generator — buildable (EV-035) | Differentiator vs Frappe; parity with Tally |
| PAR-11 | PF Forms 3A, 5, 6A, 10, 12A | None | Ships them (EV-032) | Migration-grade register equivalents per §08.13 | Differentiator vs Frappe; parity with Tally |
| PAR-12 | EPF return lifecycle — Regular, Supplementary, Revised; the chronological ledger | None | Not in the documentation read — the lifecycle lives on the portal | Filing ledger with the return types and the M−4 rule (EV-036–EV-038; §08) | Differentiator vs Frappe; Tally not assessed |
| PAR-13 | ESI computation | Absent as a capability: two references in the tree, a code comment and a test fixture | ESI statutory pay type; a monthly contribution statement | Engine (§06.3) | Differentiator vs Frappe; parity with Tally |
| PAR-14 | ESI Forms 3, 5, 6 and the monthly return | None | Ships them (EV-032) | ESIC template; the post-22-Nov-2026 regime is fenced (§05, §06) | Differentiator vs Frappe; parity with Tally |
| PAR-15 | **State PT slab table** | No Indian state name in the tree; PT is a component type; the "Professional Tax Deductions" report is a listing with no slab logic | Slabs hand-entered per pay head ("Amount Greater Than", "Amount Up To", "Value"); no state dropdown, no shipped slab data (r5/01) | Gazette-sourced per-state dataset — PT schedules verified at state primary source for Maharashtra and Odisha, Karnataka's effect only (instrument unretrieved); every other state, Telangana's slab included, unverified (EV-014, EV-015; §20 V-09) | **Differentiator vs both** (K-01) — and a build dependency |
| PAR-16 | PT statement and return | None | A PT statement (EV-032) | State PT returns carried to portal acceptance (§22) | Differentiator vs Frappe; statement parity with Tally |
| PAR-17 | **LWF** | Zero matches for LWF or "Labour Welfare" | Not among the six statutory pay types; absent from the statutory reports archive; Tally's own article tells employers to confirm rates with the State Labour Welfare Board (medium confidence — an inference from an enumerated list, r5/01) | Per-state LWF engine with periodicity (§06.8) | **Differentiator vs both** (K-01) |
| PAR-18 | **State as a payroll dimension** | Multi-company exists; no state dimension anywhere in the payroll model | PT slabs are per-company manual entry; no state dimension documented | Jurisdiction resolved on the work location — state, sphere and Code-regime commencement date (§14) | **Differentiator vs both** |
| PAR-19 | Quarterly TDS return — 24Q, now Form 138 | Zero matches for 24Q | Form 24Q, E-24Q e-Return, Annexures I and II (EV-032) | Form 138 Q1–Q3 on RPU 1.2 + FVU 1.2; Q4 fenced (EV-046, EV-051, EV-052) | Differentiator vs Frappe; parity with Tally **subject to the currency cell** |
| PAR-20 | Annual certificate — Form 16, now Form 130 | None; the nearest artefact is an "Income Tax Computation" report | Form 16 (EV-032) | Data preparation for TRACES issue — Form 130 is valid only if TRACES-generated (EV-048); Part B fenced (EV-046) | Differentiator vs Frappe; parity with Tally subject to the currency cell |
| PAR-21 | Form 12BA, now Form 123 | None | Ships it (EV-032) | §08.8 | Differentiator vs Frappe; parity with Tally |
| PAR-22 | Form 27A | None | Ships it (EV-032) | §08.8; the 2025-Act successor of Form 27A is not mapped in our evidence (EV-050) — CQ-20, routed to §20 | Differentiator vs Frappe; parity with Tally; mapping open |
| PAR-23 | Form 12BB, now Form 124, as a produced output | None | Not in the income-tax reports index | Form 124 declaration output (§07.5) | Small differentiator vs both (r3/01) |
| PAR-24 | Leave management | Sixteen leave doctypes | No leave module; its FAQ defers it to "future releases" | §09.7 | Differentiator vs Tally; parity with Frappe |
| PAR-25 | Attendance device ingestion | A whitelisted check-in API with device and employee-field lookup; no in-product device management | Manual Attendance Vouchers | ADMS/WDMS push receiver (§09.3) | Differentiator vs Tally; narrow vs Frappe |
| PAR-26 | Code-era registers — Wages Forms I, IV, IX; OSH Forms XIII, XIV, XV, XVI, XIX, XX; SS Form XXII (EV-053) | Not assessed | Not assessed | One canonical set, form numbers configurable per state; Form IX with per-day IN and OUT (EV-053, EV-055; §09.10) | **Unassessed** — claim nothing about either |
| PAR-27 | Shift, roster, overtime | Present — shift, roster and overtime doctypes and a roster app | Absent from the payroll documentation index | §09.4, §09.6 | Differentiator vs Tally; parity with Frappe |
| PAR-28 | Full-and-final settlement | Present | Absent | §08.9 | Differentiator vs Tally; parity with Frappe |
| PAR-29 | Recruitment and performance | Present — job openings, applicants, interviews, appraisals, goals, KRAs | Absent | v2 metered recruiting; performance deferred (§10) | Concede vs Frappe in v1 |
| PAR-30 | Employee self-service and mobile | A progressive web app (Ionic/Vue) with push notifications | **Contested**: the marketing site describes a self-service portal for declarations, reimbursements and payslips; the help documentation has no ESS topic; Tally Cloud Access is a hosted virtual desktop sold through partners | ESS and mobile (§07.5) | Parity with Frappe; **unresolved cell** for Tally |
| PAR-31 | Concurrent users and permissions | Framework roles — not assessed in depth | Silver single-PC; multi-user only at Gold, 3× the price; granular security levels per voucher and report — a genuine Tally strength (r3/01) | Permissions matrix with maker-checker (§07.6) | Tally strength on granularity; licence-gated concurrency |
| PAR-32 | Multi-company and registrations | A Company link on slips, structures and payroll entries | Separate Tally companies (§16.2) | Group → legal entity → registration → establishment, with a per-registration filing ledger (§14) | Parity on entity; differentiator on the registration ledger |
| PAR-33 | API | REST over every doctype; 221 whitelisted methods in the HR app alone | XML/JSON over HTTP into a running local instance; ODBC | Hosted API and webhooks (§16.11) | Parity with Frappe; structural advantage vs Tally (cloud-callable) |
| PAR-34 | Bank salary payment files | Generic query reports (bank remittance; salary via ECS with IFSC and MICR) exported as CSV/Excel; no bank template, no fixed-width writer | Not established in the documentation read | Per-bank versioned templates (§16.3) | Differentiator vs Frappe; Tally not assessed |
| PAR-35 | Licence and hosting cost | AGPL-3.0; Frappe Cloud priced per site, not per user — from ₹410, ₹1,800 or ₹5,400 a month (r2/01); implementation labour is the real cost and is unquantified | Silver ₹22,500 / Gold ₹67,500 lifetime, plus 18% GST (r3/01) | Published per-head card (§18) | **Concede** on licence price |
| PAR-36 | Statutory maintenance obligation | None contractual — open source | Ships Finance-Bill payroll updates (an "Updates Supported as per Finance Bill for Payroll" page — r3/01), not a per-tenant SLA | Maintained under a compliance SLA with a capped remedy (§18.3, §22) | **Differentiator vs both** — as a contract, not a feature |
| PAR-37 | Submission on the portal | None | Generates the artefacts; submission stays with the employer or its CA | Portal-accepted artefact plus attended, assisted submission under written authority (K-13; §22) | **Differentiator vs both**; legality under counsel review (§23) |

#### The eight rows that decide a bake-off

Most prospects will not read thirty-seven rows. These eight decide the evaluation, and they reduce to three patterns: Frappe absent and Tally present on the central artefacts; both absent on the state layer and the add-back; Frappe present and Tally absent on leave, encashment, shift and settlement.

| Row | Capability | Frappe HR v16 | TallyPrime | What the row lets us say after §21.12 clearance |
| --- | --- | --- | --- | --- |
| PAR-10 | ECR file | Absent in the source read | Present | Frappe: the source trees read contain no ECR generator. Tally: parity |
| PAR-13/14 | ESI | Absent in the source read | Present | As above |
| PAR-15 | State PT slab table | Absent in the source read | Hand-entered, no shipped table | We ship and maintain per-state slabs; both require the user to supply them |
| PAR-17 | LWF | Absent in the source read | Not a statutory pay type | As above |
| PAR-19 | Quarterly TDS return | Absent in the source read | Present, currency unresolved | Frappe: no 24Q/138 generator in the trees read. Tally: parity; format currency not asserted |
| PAR-20 | Annual certificate | Absent in the source read | Present, currency unresolved | As above; Form 130 is TRACES-generated for everyone (EV-048) |
| PAR-18 | State as a payroll dimension | Absent | Absent | One company, many states, one cycle — on the work location |
| PAR-03 | s.2(y) add-back | Absent | Absent | "We are not aware of either implementing it, as of September 2026" — never "they cannot" |

#### The four cells deliberately left unresolved

These four are unresolved in the evidence (EV-032), and the table stays honest only if they stay visibly open. Each carries the method that would close it, who closes it, what changes either way, and what may be said in the meantime.

| Cell | Why it is open | Method to close | Owner | If resolved one way | If resolved the other | Until closed, say |
| --- | --- | --- | --- | --- | --- | --- |
| **TallyPrime employee self-service** | Tally's marketing site describes a self-service portal; its help documentation has no ESS topic (r3/01) — the round-three researcher named this "the single most likely thing in this report to be wrong" | A partner demonstration or a trial licence, captured with date and build | Research / GTM | Present: our employee-surface argument against Tally narrows to mobile, deskless attendance and attended submission | Absent: the employee surface becomes a documented Tally gap — still said only as "observed in product" once executed | Nothing about Tally ESS in either direction |
| **Frappe income-tax engine correctness** | The doctypes exist; the computation path was never executed (r3/01) | Execute the §06.14 golden vectors on a Frappe v16 instance and record outputs | Statutory engineering | Correct: TDS computation is parity, and the bake-off moves entirely to the statutory artefacts | Incorrect on named cases: a demonstrable row — said only as "observed in product, executed on <date>, build <tag>" | Concede computation |
| **Tally forms' currency with the latest Finance Act** | The documentation lists 24Q and Form 16 in the 1961-Act vocabulary; whether Tally ships Form 138 on RPU/FVU 1.2 for Tax Year 2026-27 is not established (r3/01; EV-050, EV-052) | Read Tally's release notes; confirm on a current build | Research | Current: artefact parity holds | Not current: the SLA's format-break coverage (§18.3) is a live differentiator for Tax Year 2026-27 | Nothing about Tally's form currency |
| **A commercial add-on closing the PT/LWF gap** | Five public TDL catalogues show none; the in-product TallyShop browser needs a licensed install and has never been searched (r5/01) | Browse TallyShop from a licensed install; verify any named product directly | Research | Exists: the moat is maintained multi-state content under SLA, not the absence of a feature | None: unchanged | "We are not aware of any, as of September 2026" |

#### What "greenfield" licenses — and what it does not

K-01's reversal is about Frappe and Tally. It says nothing about the SaaS field, where state PT and LWF are *claimed*. This table keeps the two apart; every cell outside the first two columns is a page claim, not a tested capability.

| Capability | Frappe HR v16 (source) | TallyPrime (docs) | greytHR (page claim) | Zoho Payroll (page claim) | Keka (page claim) | Our basis for differentiation |
| --- | --- | --- | --- | --- | --- | --- |
| State PT slabs | None | Hand-entered | "PT with all state-specific rules built-in" (r5/03) | "Statewise PT" in the free tier (r2/01) | Not in the captured entry-tier text | Coverage vs Frappe and Tally; maintenance, work-location scoping and attended submission vs the SaaS field |
| LWF | None | Not a statutory pay type | Not in the captured payroll-page text | "LWF" in the free tier (r2/01) | Pre-built LWF reports (r5/03) | As above |
| State as a work-location dimension | None | None documented | Not assessed | Not assessed | Not assessed | Architectural (§14) — claim only against Frappe and Tally |
| s.2(y) add-back | None | None documented | Not assessed | Not assessed | Not assessed | "We are not aware of any vendor in the set implementing it", dated |
| Submission on the portal | None | CA | Generation language only (EV-030) | Generates; the customer files (§18.12) | Pre-built reports (EV-030) | Attended, assisted submission (K-13) |
| Maintenance under a per-tenant SLA | None | Updates shipped, no SLA | Not assessed | Not assessed | Not assessed | The SLA is the product (§18.3) |

#### Provenance notes the table depends on

- **The Frappe product page and the source trees disagree, and the disagreement is recorded, not resolved.** A round-two rendered read of Frappe's "India Payroll Version 16" product page captured copy describing PT across 15+ states, LWF across 14 states, ECR and ESI returns and state LWF filings (r2/01) — **[Killed]** as a basis for any conclusion here. Round three read the `hrms` v16 stable tree, the `erpnext` v16 tree and the `india-compliance` app and found none of it; it reports that no companion app closes the gap (r3/01), and Frappe's own documentation has no India statutory content (r3/01). This PRD builds on the source reading (EV-031). What the product page describes — an artefact outside the three trees read, or copy ahead of code — is open (CQ-05). Two consequences: the product decision does not depend on the answer, because the state layer is built and maintained either way; and no external statement may go beyond "the Frappe HR v16, ERPNext v16 and india-compliance source trees, read in September 2026, contain no state PT slab table or LWF logic", and none may say Frappe's page is wrong (§21.12, CLR-02).
- **The Tally PT contamination trap is live.** A search-engine summary reproduced in two rounds says Tally lets the user "choose the state and slab" for PT and attributes it to the Tally help page that says the opposite (r5/01). Any re-check of PAR-15 goes to help.tallysolutions.com, never to a search summary.
- **Quote Tally's leave-encashment FAQ in full.** An earlier round truncated it to its first sentence. The second sentence — that an amount calculated outside payroll can be carried, with its PF, ESI and PT effects managed — materially narrows the gap, and the counsel review listed "TallyPrime cannot calculate leave encashment" among the flat negative assertions it flagged for disparagement exposure (r3/01; r5 counsel review). PAR-05 is stated with both sentences or not at all.
- **The table is written in both form vocabularies** (EV-050). Round three's parity table used the 1961-Act names only (r3 critic). A reader searching "Form 16" or "Form 130", "24Q" or "Form 138" must find the same row.
- **Frappe's arrears capability was upgraded, not assumed.** Arrears and payroll correction were confirmed on the v16 stable branch, not inferred from the development branch (r3/01). The same discipline applies to every "present" cell: read on the release branch the customer would install.

#### The re-verification recipe

EV-031 is re-verified on each Frappe major release and EV-032 on each TallyPrime release. The recipe below is what "re-verify" means, so that the next reader reproduces the reading instead of re-interpreting it. Frappe checks run on the stable branch, with word-boundary searches; Tally checks read the vendor's own help page, never a search summary.

| Rows | Frappe HR check — stable branch | TallyPrime check — help.tallysolutions.com | Result in September 2026 |
| --- | --- | --- | --- |
| PAR-15, PAR-18 | Search the whole tree for Indian state names (for example Maharashtra, Karnataka, Tamil Nadu, West Bengal); inspect the "Professional Tax Deductions" report for slab logic | The Professional Tax deduction pay-head page: are slabs entered by hand, is there a state selector, is slab data shipped? | Zero state names; the report is a listing. Tally: manual slabs, no state selector, no shipped data (r3/01; r5/01) |
| PAR-17 | Search for "LWF" and "Labour Welfare" | The enumerated statutory pay types; the payroll statutory-reports index | Zero matches. Tally: LWF absent from both lists (r3/01; r5/01) |
| PAR-09, PAR-10, PAR-12 | Search for ECR, EDLI, EPS and UAN; look for PF rate constants and the wage ceiling outside tests | The E-Challan Return page; the PF reports pages | Zero matches and no constants. Tally: ECR page and PF Forms present (r3/01) |
| PAR-13, PAR-14 | Search for "ESI"; classify each hit | The ESI reports pages | Two hits — a code comment and a test fixture. Tally: ESI Forms 3, 5, 6 present (r3/01) |
| PAR-19 to PAR-23 | Search for 24Q, 12BB, 12BA, 27A and "Form 16"; repeat with the 2025-Act names 138, 124, 123, 130 (EV-050) | The income-tax reports index; release notes for Form 138 and RPU/FVU 1.2 | Zero matches in the 1961-Act names; the 2025-Act search is owed. Tally: 24Q, Form 16, 12BA and 27A listed; 12BB not listed; currency open (r3/01) |
| PAR-03 | Search for "labour code", "wage code", "code on wages", "social security code" | The payroll documentation index for a wage-definition topic | Zero matches; no topic (r3/01) |
| PAR-01, PAR-02 | Confirm the salary-slip engine and the arrear and payroll-correction doctypes exist on the stable tag | — | Present at tag v16.17.1 (r3/01) |
| India layer as a whole | Count the files and lines under the India regional folder; list the functions India overrides in the hooks file | — | Three files, 549 lines, three overrides (EV-031) |
| Companion apps | Check ERPNext's regional folder for India and its overrides; list the india-compliance app's modules | — | No India module in ERPNext v16; india-compliance covers GST, income tax (vendor TDS), VAT and audit trail (r3/01) |
| PAR-05, PAR-24, PAR-30 | Confirm the leave and leave-encashment doctypes and the PWA front end | The payroll FAQ (leave encashment, leave module); cloud access; any ESS topic | Frappe present. Tally: the two FAQ statements as quoted; no ESS topic; cloud access is a hosted desktop (r3/01) |

A new Frappe or TallyPrime release that changes any "Result" cell updates the parity table, re-opens the affected CLR claims (CLR-11), and is recorded as a new capture in §21.13. The 2025-Act vocabulary search in the Frappe tree was not run in round three; it is owed on the next re-read.

#### The parity row as data — fields, states and the re-verification transition

The table above is maintained, not written once: two comparators ship releases, four cells are open, and every row feeds a claim that must be withdrawable. It is therefore specified as data. The store is internal (§21.16 holds the full record model); this subsection defines the row itself, the rules that keep a cell honest, and what happens to a row when a comparator ships.

| Field | Type | Allowed values | Rule |
| --- | --- | --- | --- |
| `par_id` | identifier | `PAR-01` … | Immutable. A retired row keeps its ID; IDs are never reused |
| `capability` | text | — | Named in both form vocabularies where a form is involved (EV-050) — a reader searching "24Q" or "Form 138" must reach the same row |
| `frappe_finding` | enum | `present`, `absent_in_artefact_read`, `hand_entered`, `contested`, `not_assessed` | `absent_in_artefact_read` is the only permitted absence value; it names the tree and tag read |
| `tally_finding` | enum | as above | `hand_entered` exists because TallyPrime's PT slabs are entered per pay head (EV-032) — neither "present" nor "absent" describes it |
| `frappe_capture_id` / `tally_capture_id` | foreign key | a capture in §21.13 | A cell with no capture cannot be published, internally or externally |
| `our_v1_position` | text with a §-reference | — | Points at the owning section; this section never specifies our behaviour |
| `row_class` | enum | `concede`, `parity`, `differentiator`, `unresolved`, `unassessed` | Derived from the two findings by the decision table below, never authored directly |
| `say_until_closed` | text | — | Mandatory when `row_class` is `unresolved` or `unassessed`; it is what the artefact may say in the meantime, which for the four open cells is nothing |
| `staleness` | enum | `current`, `stale_release`, `stale_capture` | Set by the transition table below; a stale cell blocks its row's claims without deleting them |

##### The class decision table

`row_class` is a function of the two findings. The combinations below are the ones the table produces today; the rule is exhaustive, so a combination not listed resolves by the same logic and is recorded when it first occurs.

| Frappe finding | Tally finding | `row_class` | Example | Cleared sentence shape (still subject to §21.12) |
| --- | --- | --- | --- | --- |
| `present` | `present` | `parity` | PAR-04 gratuity | No competitor sentence — the row is not sold |
| `present` | `absent_in_artefact_read` | `differentiator` vs Tally only | PAR-24 leave, PAR-27 shift, PAR-28 settlement | "TallyPrime's payroll documentation, read <date>, has no leave module" |
| `absent_in_artefact_read` | `present` | `differentiator` vs Frappe only | PAR-10 ECR, PAR-11 PF forms, PAR-14 ESI forms | "The Frappe HR v16 source trees read contain no ECR generator" |
| `absent_in_artefact_read` | `absent_in_artefact_read` | `differentiator` vs both | PAR-03 the s.2(y) add-back, PAR-18 state as a dimension | "We are not aware of either implementing it, as of September 2026" |
| `absent_in_artefact_read` | `hand_entered` | `differentiator` vs both, on maintenance not presence | PAR-15 state PT slabs | "Both require the employer to supply the slabs. We ship and maintain them per state" |
| any | `contested` | `unresolved` | PAR-30 Tally ESS | Nothing, in either direction (CLR-15, CLR-19) |
| `not_assessed` | `not_assessed` | `unassessed` | PAR-26 the Code-era registers | Nothing about either comparator |
| `not_assessed` | `present` | `parity` with Tally, Frappe silent | PAR-08 NPS | Name only the comparator that was read |
| `present` | `not_assessed` | `parity` with Frappe, Tally silent | PAR-02 arrears and payroll correction | Name only the comparator that was read |

Two constraints the table enforces that prose has repeatedly lost. A `differentiator` class never licenses the word "cannot" — the sentence shape is fixed by CLR-03 and scoped to the artefact read. And a row may be a differentiator against Frappe and Tally while being **parity against the SaaS field**: the "what greenfield licenses" table earlier in this subsection is the second lookup, and both are consulted before any claim (K-01).

##### The re-verification transition table

| From | Event | Guard | Side effect | Who may trigger |
| --- | --- | --- | --- | --- |
| `current` | Frappe major release detected | The release is on the stable branch a customer would install | Every Frappe cell sourced from the prior tag → `stale_release`; the §21.3 recipe is queued | Watch (§21.11) |
| `current` | TallyPrime release detected | Release notes published | Every Tally cell → `stale_release`; the help-page recipe is queued, never a search summary | Watch |
| `stale_release` | Recipe run, result unchanged | The same searches on the new tag return the same result | Cells → `current` with a new capture; claims keep their wording and gain a new capture date | Research |
| `stale_release` | Recipe run, result changed | New capture attached | Cell finding updated; `row_class` recomputed; every claim on the row → WITHDRAWN (CLR-11); §21.13 gains a capture row | Research |
| `current` | Capture passes `competitor_claim_max_capture_age_days` | — | Cell → `stale_capture`; external use blocked, internal use permitted with the age shown | Automatic |
| `unresolved` | The closing method in "the four cells" table is executed | The execution record exists (CLR-14) | Cell moves to a finding value; `row_class` recomputed; `say_until_closed` cleared | Research or statutory engineering |
| any | A named TDL product for PT or LWF appears (CRS-08) | The product itself is verified — never a rumour, never a re-run of the catalogue sweep | PAR-15 and PAR-17 Tally cells re-opened | Research |
| any | We execute a comparator ourselves | CLR-14's execution record complete | The cell's posture moves from `declared` to `observed_in_product`; the wording still passes CLR-02 and CLR-03 | Research |

##### Requirements

| ID | Requirement | Acceptance criterion |
| --- | --- | --- |
| CLR-17 | Every parity cell carries a finding from the enum and a capture ID. A cell with a free-text finding or no capture cannot be published in any artefact, internal or external | Given a parity row with a cell whose `frappe_capture_id` is empty, when the row is rendered for any audience, then the cell renders as "not assessed" and any claim referencing it is refused |
| CLR-18 | `row_class` is computed from the two findings. It is never set by hand, and a row whose class was overridden is rejected at review | Given a row whose stored class differs from the class the decision table computes, when the register is validated, then the row fails validation and names both values |
| CLR-19 | A cell whose finding is `contested` or `not_assessed` blocks every external claim on that row, in both directions. CLR-15's four cells are the instances of this rule, not the whole of it | Given a draft asserting a capability on a row with a contested cell, when it is submitted for clearance, then it fails with the cell named |
| CLR-20 | A comparator release makes every cell sourced from the prior release stale within `parity_row_reverify_grace_days`; claims on stale cells are blocked until the recipe is re-run | Given a detected TallyPrime release and a Tally-sourced claim, when the grace period elapses without a re-run, then the claim's export is blocked and the row appears on the research queue |
| CLR-21 | A "present" cell is read on the release branch a customer would install, never on a development branch | Given a cell sourced from a development branch, when it is validated, then it is rejected with the branch named |

#### The Tally add-on ecosystem

**[Killed]** (K-20): the "Payroll Plus ₹5,999" add-on is sold on a lookalike domain, its detail page returns 404, and even its own copy claims no state PT or LWF capability (r5/01; EV-K31). It is not evidence of anything.

Five independent public catalogues show no payroll, PT or LWF add-on: Tally's official TallyShop (sixteen categories, none for payroll), an authorised 5-Star partner's list of about 300 TDLs (cosmetic payroll-adjacent items only), a 200+ add-on catalogue, a third-party TDL store whose site search for "payroll" returns nothing, and a nine-category add-on catalogue (r5/01; EV-032). Observed add-on prices are low — TallyShop lists at ₹354; one catalogue runs ₹1,180 to ₹3,540; the TDL store's products run ₹999 to ₹4,999 observed, with struck-through list prices to ₹6,999 (r5/01). The "₹18,000" once quoted is the ceiling of a price-filter control, not a product price (r5/01).

The inference that matters: a partner could build a PT or LWF TDL cheaply. The moat against Tally is therefore **maintained multi-state regulatory content under contract**, not the absence of a competing feature. The re-check trigger is specific: if a competitor, partner or prospect names a TDL product for PT or LWF, that product is captured and verified directly; the ecosystem sweep is not re-run on a rumour (r5/01).

#### Cost of the parity comparators, as the buyer sees it

- **Frappe HR:** licence ₹0 under AGPL-3.0; Frappe Cloud priced per site, not per user — at 100 employees the cheapest site plan works out to about ₹4 per employee per month and the server plan to ₹18 (r2/01, arithmetic on ₹410 and ₹1,800). Whether the India payroll layer installs on the cheapest plan was not established (r2/01). The real competing price is implementation and statutory maintenance by a partner, and it is unquantified (CQ-06).
- **TallyPrime:** the payroll module is ₹0 incremental once the licence is paid; the licence itself is ₹22,500 (Silver, single PC) or ₹67,500 (Gold, multi-user) lifetime, plus GST (r3/01). Tally Cloud Access is sold through partners with no public price (r3/01).

In both cases the buyer's comparison is not our price against theirs — it is our price against *their price plus the work they still do by hand*: the slabs they enter, the LWF they compute, the returns their CA submits and the Finance-Act changes nobody is contracted to absorb. That is the frame §18.1 prices against.

#### Running the bake-off — the protocol we offer a prospect

A prospect comparing us with Frappe or Tally should run the comparison on its own establishments and states, and we should make that easy, because the statutory rows are where it is decided. The protocol splits the work cleanly: we run our product; the prospect checks the alternative. We never operate a competitor's product on a prospect's behalf and report its results, and anything we do execute ourselves is recorded under CLR-14 before it is repeated.

| Step | What the prospect brings | What we run on our product | What the prospect checks on the alternative | Evidence we keep |
| --- | --- | --- | --- | --- |
| B1 | Its establishments, their states, and its registrations — PF code, ESI code, PT registration per state, TAN | The registration model, per establishment (§14) | Where the alternative records state and registration (PAR-18, PAR-32) | The setup record |
| B2 | Last month's inputs for a representative slice of employees | A full run: gross-to-net and both wage bases (§06.10) | Its gross-to-net — expect parity (PAR-01) | Run output stamped with rule versions |
| B3 | — | The ECR text file, validated against the 11-field layout (EV-035) | Whether an ECR file is produced (PAR-10) | The file and its validation report |
| B4 | An establishment in a PT state | PT from the maintained slab table, with the rule object's citation and capture date; the PT return artefact | Where the alternative's PT slabs come from — shipped or typed in (PAR-15) | The rule object as applied |
| B5 | An establishment in an LWF state, in a deduction month | LWF on the state's periodicity (§06.8) | Whether LWF is computed at all (PAR-17) | The rule object as applied |
| B6 | Quarter-to-date TDS data | Form 138 for Q1–Q3, validated on the notified FVU version (EV-051, EV-052) | Whether a Form 138 file is produced, and on which RPU/FVU version (PAR-19; the currency cell) | The file and the FVU output |
| B7 | A back-dated revision | Retro as a diff against the period's rule version; PF liability dated from the disbursal date (§08.5) | Its arrears handling — Frappe ships arrears (PAR-02) | The before-and-after diff |
| B8 | A component mix that trips the 50% add-back | The add-back, shown per employee (§06.10) | Whether the add-back is computed (PAR-03) | The worked calculation |
| B9 | — | The attended-submission walkthrough: what our operator does, what the prospect approves, what the audit entry records (§22) | Who submits today (PAR-37) | The walkthrough record |
| B10 | — | The maintenance commitment: SLA terms and the rule-change log (§18.3) | Who is contracted to absorb the next change (PAR-36) | The SLA document |

Two limits keep the protocol honest. **B4 and B5 run only in states whose dataset is verified at the state's own primary source** — today that is PT in Maharashtra and Odisha, with Karnataka's PT effect verified but its amending instrument unretrieved (EV-014); Telangana's slab is not verified (only its employer-registration wording was — EV-014), and no state's LWF dataset is verified (EV-015). In any other state, and for Karnataka until the instrument is retrieved, the bake-off shows the rule object and its verification status, not a number (§20 V-09). And **the prospect's findings about the alternative are the prospect's**: they are never recorded by us as "observed in product", and never repeated to another prospect without clearing §21.12. If a prospect reports parity on a statutory row, we do not dispute it; the conversation moves to maintenance, submission and the SLA (§20.8 R-7).

### 21.4 The six-vendor priced set and the 50-seat floor

This subsection is the evidence form of the priced comparison: the rate cards as captured, the arithmetic that turns them into effective per-employee prices, the structural models behind the arithmetic, and the exact scope of the seat-floor finding. §18.12 is the commercial form of the same data and must stay consistent with it.

#### The rate-card register

As captured from each vendor's own page, ex-GST, per month. "Entry plan" is the lowest paid tier that carries payroll (EV-028).

| Vendor | Entry plan | Billing basis | Base price | Seats in the base | Per additional employee | Higher tiers | Billing and trial | Capture method | Captured |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| greytHR | Essential | Base plus overage | ₹2,495 | 50 | ₹45 | Growth ₹4,495 + ₹85; Premium custom, marketed as "~30% savings vs Growth plan" | Monthly; 7-day trial; no free plan | Rendered read and raw fetch | 4 Sep 2026 (r1); 5 Sep 2026 (r5) |
| Qandle | FOUNDATION | Flat per-employee with a 50-seat minimum (base = 50 × rate) | ₹2,950 monthly / ₹2,450 annual | 50 | ₹59 monthly / ₹49 annual | REGULAR ₹4,950 + ₹99 / ₹3,950 + ₹79; PLUS ₹6,200 + ₹124 / ₹4,950 + ₹99; PREMIUM ₹8,000 + ₹160 / ₹6,450 + ₹129; ENTERPRISE by quote for 1,000+ | Monthly or annual — "Save upto 25 %" advertised; the implied saving is 16.9–20.2%; "Free Trial", length not stated | Vendor pricing config file, confirmed by a rendered read | 5 Sep 2026 (r5) |
| Pocket HRMS | Standard | Approximately flat per-employee with a 50-seat minimum | ₹2,995 (billed annually) | 50 | ₹60 | Professional ₹4,495 + ₹90; Premium by quote with a 100-employee minimum | Annual; "free demo"; trial length not stated | Raw fetch | 4 Sep 2026 (r1); 5 Sep 2026 (r5) |
| Zimyo | Basic | Per user, "Minimum billing for 50 Users" | ₹80 per user | 50 minimum | ₹80 | Standard ₹160; Enterprise ₹240 per user | 14-day trial, no card | Rendered read (the site returns HTTP 403 to a non-browser fetch) | 4 Sep 2026 (r1); 5 Sep 2026 (r5) |
| HROne | Basic | Flat per-employee with a 50-seat minimum (base = 50 × ₹99) | ₹4,950 | 50 | ₹99 | Professional ₹6,500 + ₹130; Enterprise by quote "For 50+ Team"; a startup programme "less than 50 Employees" with no published price | Trial or demo; no trial length on the pricing page | Raw fetch | 4 Sep 2026 (r1); 5 Sep 2026 (r5) |
| Keka | FOUNDATION | Archived: base plus overage. Live: no price on the pricing page | Archived ₹9,999; live small-companies floor "from ₹6,999" | Archived 100; the live floor's block is unknown | ₹90 — present on the live pricing page only inside an HTML comment | Archived STRENGTH ₹12,999 + ₹120; GROWTH ₹15,999 + ₹150; Hiring ₹1,500 and ₹2,500 per recruiter | Plan "Free Trial" links lead to a demo-request form; terms auto-renew | Raw fetch with comment scan; Wayback archive of Keka's own page; terms of service | 5 Sep 2026 (r5); archive 1 Aug 2024 |

(Sources: EV-021–EV-027 and the rate cards read in r5/03; round-one captures in r1/08 agree with round five on every figure both rounds read.)

#### Effective per-employee price by headcount

The 20- and 50-employee columns are the registered figures (EV-027). The other columns are arithmetic on the same verified block prices, assuming the published overage applies linearly above the block — no page says otherwise, and none says so either. The formula column is the definition; any headcount can be recomputed from it.

| Vendor and plan | Effective PEPM for *n* employees | 20 | 25 | 30 | 40 | 50 | 75 | 100 | Model |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Qandle FOUNDATION, annual | ₹2,450 ÷ *n* up to 50; then ₹49 | 122.50 | 98.00 | 81.67 | 61.25 | 49.00 | 49.00 | 49.00 | Flat with minimum |
| Qandle FOUNDATION, monthly | ₹2,950 ÷ *n* up to 50; then ₹59 | 147.50 | 118.00 | 98.33 | 73.75 | 59.00 | 59.00 | 59.00 | Flat with minimum |
| greytHR Essential | ₹2,495 ÷ *n* up to 50; then (₹2,495 + ₹45 × (*n* − 50)) ÷ *n* | 124.75 | 99.80 | 83.17 | 62.38 | 49.90 | 48.27 | 47.45 | Base plus overage — tends toward ₹45 |
| Pocket HRMS Standard | ₹2,995 ÷ *n* up to 50; then (₹2,995 + ₹60 × (*n* − 50)) ÷ *n* | 149.75 | 119.80 | 99.83 | 74.88 | 59.90 | 59.93 | 59.95 | Approximately flat with minimum |
| Zimyo Basic | ₹80 × max(*n*, 50) ÷ *n* | 200.00 | 160.00 | 133.33 | 100.00 | 80.00 | 80.00 | 80.00 | Flat with minimum |
| HROne Basic | ₹4,950 ÷ *n* up to 50; then ₹99 | 247.50 | 198.00 | 165.00 | 123.75 | 99.00 | 99.00 | 99.00 | Flat with minimum |
| Keka FOUNDATION, archived card | ₹9,999 ÷ *n* up to 100; then (₹9,999 + ₹90 × (*n* − 100)) ÷ *n* | 499.95 | 399.96 | 333.30 | 249.98 | 199.98 | 133.32 | 99.99 | Base plus overage — tends toward ₹90 |
| Keka, live small-companies floor | ₹6,999 ÷ *n* while the floor's block covers *n* | 349.95 | — | — | — | 139.98 | — | — | Block size unknown (₹6,999 ÷ ₹90 = 77.8 matches no round number — r5/03) |

(All figures ₹ per employee per month, ex-GST, entry tier, list price. Realised prices are unmeasured for every vendor — §20 V-03.)

<!-- DIAGRAM: competitive-landscape-seat-floor -->

Three readings follow from the arithmetic, and none of them needs a number we do not have:

1. **Below 50 the model inverts.** At 20 employees the six charge ₹122.50 to ₹349.95 per employee — exactly two and a half times each vendor's own 50-employee rate, because the block does not shrink with the firm — and the buyer pays for seats it does not have (EV-026, EV-027). In annual terms a 20-person firm pays ₹29,400 (Qandle, annual billing) to ₹83,988 (Keka's live floor) a year for the entry tier. The 20–50 sub-band is structurally overcharged, which is the basis for §04's beachhead argument and §18.2 P6.
2. **Two structural models hide inside "base plus per-employee".** For Qandle, HROne, Zimyo and — to within ₹5 — Pocket HRMS, the base is exactly 50 times the per-employee rate, so these are flat per-employee prices with a 50-seat minimum and the effective price stops falling at 50. For greytHR (₹2,495 against 50 × ₹45 = ₹2,250) and Keka's archived card (₹9,999 against 100 × ₹90 = ₹9,000) the base exceeds the seats it covers, so the effective price keeps falling with headcount toward the marginal rate (r1/08). Only the second group rewards growth, which matters for the taper above 200 (§18.2 P4).
3. **Above 50 the band is served cheaply.** At 100 employees greytHR Essential is ₹47.45 and Qandle's annual card ₹49.00. The 50–200 sub-band is over-served by cheap product; the argument there is attended submission and maintained rules, never price (§04.4).

#### Worked example — a firm growing from 20 to 60 employees

Annual list cost of each vendor's entry tier as one firm grows, ex-GST. Arithmetic on the verified block prices; the 60-employee figures assume the published overage applies linearly above the block.

| Vendor and plan | Annual at 20 | Annual at 35 | Annual at 60 | PEPM at 35 | PEPM at 60 |
| --- | --- | --- | --- | --- | --- |
| Qandle FOUNDATION, annual billing | ₹29,400 | ₹29,400 | ₹35,280 | ₹70.00 | ₹49.00 |
| greytHR Essential | ₹29,940 | ₹29,940 | ₹35,340 | ₹71.29 | ₹49.08 |
| Pocket HRMS Standard | ₹35,940 | ₹35,940 | ₹43,140 | ₹85.57 | ₹59.92 |
| Zimyo Basic | ₹48,000 | ₹48,000 | ₹57,600 | ₹114.29 | ₹80.00 |
| HROne Basic | ₹59,400 | ₹59,400 | ₹71,280 | ₹141.43 | ₹99.00 |
| Keka FOUNDATION, archived card | ₹1,19,988 | ₹1,19,988 | ₹1,19,988 | ₹285.69 | ₹166.65 |
| Keka, live floor | ₹83,988 | Block unknown | Block unknown | — | — |

The firm's bill does not move between 20 and 50 employees on any of the six: the first thirty hires after the 20th are already paid for. The overcharge is front-loaded into the smallest, most price-sensitive stage — which is also the stage at which EPF switches on at 20 and the firm is most likely to re-evaluate its software (§18.2 P1, P2). That coincidence is what makes the structural wedge strongest exactly where our conversion happens. The wedge is per head, not per bill: against the two value-floor blocks (greytHR ₹2,495, Qandle ₹2,450 annual) a no-floor card anywhere in the ₹80–150 hypothesis is the smaller invoice only up to roughly 16–31 employees, and above that the block is cheaper in absolute rupees even though its effective PEPM is higher — which is why §04.4 AC-17 bars an unqualified "cheaper". Our own figures cannot be put in this table: our price is a **[Hypothesis]** until §20 V-01 and V-03 report, and a comparison against it is made only from our published card (§18.12; CLR-05).

#### The dead-seat cost — what the block charges for people the firm does not employ

The effective-PEPM table says the 20–50 band is overcharged. This one says by how much, in rupees, in a form a buyer recognises: the part of the monthly bill that buys seats the firm does not occupy, priced at the vendor's own published marginal rate.

**Definition.** `dead_seat_cost(n) = entry_bill(n) − n × marginal_rate`, where both terms come from the same published card. For a flat-with-minimum card (base = block × marginal rate) this reduces to `marginal_rate × (block − n)`. For a base-plus-overage card it is larger, because the base already exceeds the seats it covers. The metric is defined only inside the block; above the block it is zero by construction.

| Vendor and entry plan | Bill at 20 employees | 20 employees at the vendor's own marginal rate | Dead-seat cost per month | Per year | Share of the bill |
| --- | --- | --- | --- | --- | --- |
| Qandle FOUNDATION, annual | ₹2,450 | 20 × ₹49 = ₹980 | ₹1,470 | ₹17,640 | 60.0% |
| greytHR Essential | ₹2,495 | 20 × ₹45 = ₹900 | ₹1,595 | ₹19,140 | 63.9% |
| Qandle FOUNDATION, monthly | ₹2,950 | 20 × ₹59 = ₹1,180 | ₹1,770 | ₹21,240 | 60.0% |
| Pocket HRMS Standard | ₹2,995 | 20 × ₹60 = ₹1,200 | ₹1,795 | ₹21,540 | 59.9% |
| Zimyo Basic | ₹4,000 | 20 × ₹80 = ₹1,600 | ₹2,400 | ₹28,800 | 60.0% |
| HROne Basic | ₹4,950 | 20 × ₹99 = ₹1,980 | ₹2,970 | ₹35,640 | 60.0% |
| Keka, live small-companies floor | ₹6,999 | 20 × ₹90 = ₹1,800 | ₹5,199 | ₹62,388 | 74.3% |
| Keka FOUNDATION, archived card | ₹9,999 | 20 × ₹90 = ₹1,800 | ₹8,199 | ₹98,388 | 82.0% |

(Arithmetic on the cards in the rate-card register, ex-GST. The Keka live-floor row assumes 20 employees lie inside the unknown block, the same assumption the effective-PEPM table makes; if the block proves smaller than 20 the row is void — CQ-01.)

Three readings, one of them structural:

1. **The 60% is not a coincidence.** For any flat-with-minimum card the dead-seat share at headcount *n* is `(block − n) ÷ block`, independent of the rate: 60.0% at 20 employees against a 50-seat block, 30.0% at 35, 0% at 50. Four of the six sit exactly on it (Pocket HRMS at 59.9% because its base is ₹5 below 50 × ₹60). The overcharge is a property of the *block*, not of any vendor's price level — which is why a price cut does not fix it and a structural change does (CRS-10 versus CRS-11).
2. **The two base-plus-overage cards charge more than the block explains.** greytHR at 63.9% and Keka's archived card at 82.0% exceed the structural share because their bases exceed block × marginal rate by ₹245 and ₹999 respectively. The same property that makes those cards *reward* growth above the block (§21.4's second reading) makes them *penalise* the small firm hardest below it.
3. **The number a 20-person buyer can check.** Every figure in the table is two multiplications on the vendor's own published card. It is the cleanest form of the wedge — and, per CLR-05 and §04.4 AC-17, it is a statement about the competitor's card, never a "we are cheaper" claim, until our own card is published.

#### The crossover arithmetic behind a "cheaper" claim

§04.4 AC-17 bars an unqualified "cheaper" because whether it is true depends on headcount. This is the arithmetic behind that bar, so the bound is checkable rather than asserted. **Our price is a [Hypothesis]** — §18.3 decides where it sits between the two anchors, and §20 V-01 and V-03 have not reported — so the table is computed across the ₹80–150 planning band and is unusable externally until our card exists.

A no-floor card at rate *r* bills `r × n`. The competitor's entry card bills its base while *n* is inside the block. The crossover is `n* = base ÷ r`: below it the no-floor card is the smaller monthly invoice, above it the block is, even though the block's *effective PEPM* is still the higher of the two.

| Competitor entry card | Base | At ₹80 | At ₹100 | At ₹120 | At ₹150 |
| --- | --- | --- | --- | --- | --- |
| Qandle FOUNDATION, annual | ₹2,450 | 30 | 24 | 20 | 16 |
| greytHR Essential | ₹2,495 | 31 | 24 | 20 | 16 |
| Qandle FOUNDATION, monthly | ₹2,950 | 36 | 29 | 24 | 19 |
| Pocket HRMS Standard | ₹2,995 | 37 | 29 | 24 | 19 |
| Zimyo Basic | ₹4,000 | 49 | 39 | 33 | 26 |
| HROne Basic | ₹4,950 | every headcount on this card | 49 | 41 | 32 |
| Keka FOUNDATION, archived card | ₹9,999 (block 100) | every headcount on this card | 99 | 83 | 66 |
| Keka, live small-companies floor | ₹6,999 | refused — block unknown (CQ-01) | refused | refused | refused |

(Each cell is the last headcount at which a no-floor card at that rate is the smaller monthly invoice, ex-GST, entry tier, like billing cadence on both sides. Worked instance: against greytHR at ₹150, 16 employees cost ₹2,400 against ₹2,495, and 17 cost ₹2,550 against the same ₹2,495.)

Two cells are worth reading twice, because both break the naive formula. **HROne at ₹80**: `4,950 ÷ 80 = 61.9` would name a crossover at 61 employees, a headcount that card never bills at ₹4,950 — above 50 it bills ₹99 a head, which still exceeds ₹80, so a no-floor card at ₹80 is the smaller invoice at every headcount on that card. **Keka's archived card at ₹120**: ours is smaller to 83 employees, larger from 84, and *stays* larger above the 100-seat block, where Keka's marginal ₹90 undercuts ₹120 — the gap widens rather than closing. Both cases say the same thing about method: the crossover is computed on the whole domain of the card, block and overage, never on the block alone (§21.17).

The 16–31 span §21.4 quotes is the greytHR column read across the band: ₹2,495 ÷ ₹150 = 16.6 and ₹2,495 ÷ ₹80 = 31.2. It is a statement about one vendor's base against a hypothetical rate of ours, and it may not be generalised to "the market" (CLR-06).

#### Billing cadence — what Qandle's "save upto 25%" actually is

A card's headline saving is a claim on the card, and the comparison engine uses the arithmetic, not the headline. Qandle advertises "Save upto 25 %" and its own config carries a discount value of 25; the implied saving computed from the two published cards is lower on every tier, and identical for a tier's base and its marginal rate.

| Qandle tier | Monthly base + marginal | Annual base + marginal | Implied saving on the base | Implied saving on the marginal rate |
| --- | --- | --- | --- | --- |
| FOUNDATION | ₹2,950 + ₹59 | ₹2,450 + ₹49 | ₹500 ÷ ₹2,950 = 16.9% | ₹10 ÷ ₹59 = 16.9% |
| REGULAR | ₹4,950 + ₹99 | ₹3,950 + ₹79 | ₹1,000 ÷ ₹4,950 = 20.2% | ₹20 ÷ ₹99 = 20.2% |
| PLUS | ₹6,200 + ₹124 | ₹4,950 + ₹99 | ₹1,250 ÷ ₹6,200 = 20.2% | ₹25 ÷ ₹124 = 20.2% |
| PREMIUM | ₹8,000 + ₹160 | ₹6,450 + ₹129 | ₹1,550 ÷ ₹8,000 = 19.4% | ₹31 ÷ ₹160 = 19.4% |

At 50 employees the FOUNDATION saving is ₹6,000 a year (₹35,400 against ₹29,400). The entry tier — the one a 20–50 firm buys — carries the *smallest* discount of the four, so the advertised ceiling is furthest from the price the beachhead actually pays. That is a finding about arithmetic on two published cards, and it is said, if at all, in exactly that form: never as "Qandle's discount claim is wrong" (CLR-02).

Cadence across the field is uneven and is a normalisation, not a detail:

| Vendor | Cadences published | Difference | Consequence for a comparison |
| --- | --- | --- | --- |
| Qandle | Monthly and annual | 16.9–20.2% by tier | State which card is quoted; never mix |
| Pocket HRMS | Annual only ("per month, billed annually") | — | Cannot be compared with a monthly card at all |
| greytHR | Monthly | None in the evidence | A monthly card is the like-for-like partner for Qandle's monthly card, where greytHR's ₹2,495 undercuts ₹2,950 |
| Zimyo, HROne, Keka | One published cadence each in the evidence | — | Quote as captured |
| Zoho Payroll (outside the six) | ₹1,000 annual / ₹1,250 monthly | 20.0% | The per-entity licence multiplies whichever is quoted |
| Zoho People (outside the six) | ₹48 annual / ₹60 monthly | 20.0% | As above |
| factoHR (outside the six) | Quarterly | — | A third cadence; re-capture owed (CQ-15) |

The single most common way a competitive price table becomes wrong is a cadence mismatch, and the field supplies three cadences. The engine refuses the comparison rather than converting silently (§21.17).

#### GST and the all-in number a buyer signs

Published prices in the register are ex-GST, 18% is added at invoice, and disclosure of that is uneven: Zoho Payroll, RazorpayX and 247HRM say so on the page; greytHR, HROne, factoHR, Kredily and Zimyo do not (r1/08). A comparison that adds GST to one side and not the other is wrong by 18%, which is larger than the gap between several of these cards.

| Vendor and entry plan | Annual at 20 employees, ex-GST | Plus 18% | Annual at 50 employees, ex-GST | Plus 18% |
| --- | --- | --- | --- | --- |
| Qandle FOUNDATION, annual | ₹29,400 | ₹34,692 | ₹29,400 | ₹34,692 |
| greytHR Essential | ₹29,940 | ₹35,329.20 | ₹29,940 | ₹35,329.20 |
| Pocket HRMS Standard | ₹35,940 | ₹42,409.20 | ₹35,940 | ₹42,409.20 |
| Zimyo Basic | ₹48,000 | ₹56,640 | ₹48,000 | ₹56,640 |
| HROne Basic | ₹59,400 | ₹70,092 | ₹59,400 | ₹70,092 |
| Keka, live floor | ₹83,988 | ₹99,105.84 | ₹83,988 | ₹99,105.84 |
| Keka FOUNDATION, archived card | ₹1,19,988 | ₹1,41,585.84 | ₹1,19,988 | ₹1,41,585.84 |

(The 20- and 50-employee columns are identical because the block does not shrink — the same fact the dead-seat table prices. The Keka live-floor rows carry its unknown block; the archived card is labelled archived wherever it appears.)

Whether a given buyer ultimately bears the GST or recovers it depends on that buyer's own tax position, which this PRD does not state and no seller-side artefact should assert. The rule that follows is narrow and mechanical: **publish ex-GST on both sides, or add 18% to both sides, and say which was done** (CLR-05).

#### Can a 30-person buyer evaluate each vendor without a call?

The price card is only half of evaluability. The other half is whether a buyer who will not sit through a demo can find the number that applies to them, start, and see the terms (§04.4 AC-14).

| Question | greytHR | Qandle | Pocket HRMS | Zimyo | HROne | Keka |
| --- | --- | --- | --- | --- | --- | --- |
| Is a price visible on the site? | Yes | Yes — rendered by JavaScript | Yes | Yes — browser only | Yes | Not on the pricing page; a floor on the small-companies page |
| Can the buyer see what 30 employees cost? | Only as the 50-employee base; the slider starts at 10 | Only as the 50-employee base | Only as the 50-employee base | Only as the 50-user minimum | Only as the 50-user base | No |
| Can the buyer start without sales? | 7-day trial | "Free Trial", length not stated | "free demo"; no trial length on the pricing page | 14-day trial, no card | Trial or demo; no trial length on the pricing page | No — the trial links lead to a demo-request form |
| Can the buyer buy without a call? | No — the pricing page routes to a trial, sales or a demo (r3/03) | Not in the evidence | Not in the evidence | Not in the evidence | Not in the evidence | No (r3/03) |
| Is a setup fee stated? | None advertised | Not in the evidence | Disclosed during the sales discussion | Not in the evidence | None, except possibly for enterprise | Contradictory and unquantified |
| Are lock-in or renewal terms stated? | "No cancellation fee or lock-in period" | Not in the evidence | Not in the evidence | Not in the evidence | "Zero contractual lock-in", two months' notice | Terms: auto-renewal, renewal "subject to an increase" |

(Sources: r5/03; r1/08; r3/03; EV-021–EV-025. Zoho Payroll, outside the six, is the one vendor in the evidence that publishes payment methods for self-serve purchase — r3/03.)

#### The two anchors, restated from the same table

**[Reversed]** (K-09): there is no single price ceiling. The table produces two anchors at 50 employees — a **value floor near ₹50 PEPM** (Qandle ₹49.00 annual, greytHR ₹49.90; Pocket HRMS at ₹59.90 just above it) and a **mid-market clearing band of ₹80–200 PEPM** (Zimyo ₹80.00, HROne ₹99.00, Keka ₹139.98 on its live floor or ₹199.98 on the archived card) (EV-027, EV-006). The earlier ₹80–150 planning anchor survives inside the band. Where our own price sits between the anchors, and why, is §18.3's decision, not this section's.

#### What the 50-seat floor means for each vendor

EV-026 is exact about its scope — six of six *priced* vendors, on their *published* cards — and it has to be used exactly. The table records what "floor" means for each, including the routes that sell below it without a published price.

| Vendor | The floor as published | Routes below the floor | Source |
| --- | --- | --- | --- |
| greytHR | Base price includes 50 employees on Essential and Growth | The pricing slider starts at 10 employees and the feature table says "Number of Employees: Unlimited", so it will quote below 50 — but the base price still buys 50. A "FLEXIBLE START" single-module motion is gated behind sales with no published price | r5/03 |
| Qandle | "upto 50 employees" base block on all four tiers | None published | r5/03 |
| Pocket HRMS | FAQ: "a minimum requirement of at least 50 employees"; Premium "Minimum Subscription- 100+ Employees" | None published | r5/03 |
| Zimyo | "Minimum billing for 50 Users" on every plan | None published | r5/03 |
| HROne | "For 50 Users" base blocks | A startup programme "For Startups (less than 50 Employees)" with no published price | r5/03 |
| Keka | Archived: "(Upto 100 Employees)" | The live small-companies floor of ₹6,999 covers an unknown block | EV-022; EV-023 |

Outside the six the field uses other structures, and none of them is covered by EV-026. They matter because they bound what our own "no seat floor" claim may say (§21.12, CLR-06).

| Vendor | Structure | Source |
| --- | --- | --- |
| Zoho Payroll | Free to 10 employees; Standard ₹1,000 a month (annual billing) including 25 employees, then ₹40 each; a separate payroll licence is required for each legal entity | r2/01; r1/08 |
| Kredily | Free Forever at unlimited headcount, marketed with "no per-seat minimum"; Payroll OS ₹1,249 a month up to 25 employees, then ₹50 each | r2/01; r3/03 |
| Zoho People | Free to 5 users; per user from ₹48 a month on annual billing — core HR, not payroll; People Plus requires at least 5 paid users | r2/01 |
| RazorpayX Payroll | PRIME ₹2,499 a month flat, maximum 20 employees; ELITE ₹5,499 (shown discounted from a ₹8,499 list) for 50 then ₹150 each, maximum 100; above 100 by quote | r1/08 — round one only |
| factoHR | Free to 20 employees (employee data, letters, payslip generation); Core ₹4,999 up to 50 then ₹69, billed quarterly | r1/08 — round one only |
| 247HRM | Professional ₹8,999 base for 50 employees | r1/08 — round one only |
| sumHR | Per user, billed annually: Startup ₹49, Basic ₹69, Advanced ₹119 a month (₹119 is the ₹1,428-a-year figure quoted in r1/08); a one-time setup fee based on employee count; Enterprise from 250 employees; any minimum was not captured | r1/01; r1/08 — round one only |

The honest statement of the finding is therefore narrower than "nobody bills from employee one": **none of the six vendors in the priced set bills below a 50-employee block on its published card, and Keka's archived block was 100** (EV-026). Per-user and per-employee structures exist elsewhere — Zoho People, sumHR — and Kredily markets its free tier as having no per-seat minimum. Our wedge is billing actual headcount from the first paid employee on a *payroll-and-filing* product with a published card (§18.2 P6); the claim is made against the six, dated, and never extended to "the market".

One consistency point for §18: the round-one capture shows factoHR with a free tier to 20 employees (r1/08). §18.4 now records it — the gate position at the EPF line is not unique, and what is ours is the combination at that line (full statutory computation and artefact generation below it, attended submission and the SLA above it), since factoHR's free scope is employee data, letters and payslips. The capture predates the later rounds and was not re-checked; it is routed for re-capture (CQ-15) before either §18.4's statement or this one is used externally.

#### Commercial terms beyond the sticker price

The price table is list price. What a buyer actually signs includes setup fees, lock-in, renewal and refund terms, and GST. The evidence on each:

| Vendor | Setup or implementation fee | Lock-in and cancellation | Renewal | Refunds and other terms | Source |
| --- | --- | --- | --- | --- | --- |
| greytHR | None advertised | "There is no cancellation fee or lock-in period on any of our plans" | Not in the evidence | Unused annual credit is non-refundable on early exit | r1/08 |
| Qandle | Not in the evidence; advisory add-ons (HR Advisory, Payroll Advisory, Compliance Assistance) carry no published price | Not in the evidence | Not in the evidence | — | r5/03 |
| Pocket HRMS | "A nominal one-time implementation fee", disclosed during the sales discussion, varying with company size, customisation and data-migration complexity | Not in the evidence | Not in the evidence | — | r5/03 |
| Zimyo | Not in the evidence | Not in the evidence | Not in the evidence | 14-day trial without a card | r5/03 |
| HROne | None, except a possible implementation cost for enterprise clients | "Zero contractual lock-in"; two months' prior notice before exit | Not in the evidence | — | r5/03; r1/08 |
| Keka | Contradictory on two live pages; unquantified on both (EV-025) | The August 2024 "no lock-in" FAQ has been deleted | Clause 15: auto-renews for equal terms unless 30 days' notice; renewal fees "subject to an increase"; downgrades may be re-priced | Clause 3: fees non-refundable whether or not the platform is used; 1% a month late interest | EV-025; r5/03 |
| Zoho People (outside the six) | "Jumpstart" onboarding ₹50,000 to ₹1,60,000 by edition | Monthly or annual at a flat 20% difference | Not in the evidence | Premium support ₹5,750 a month | r1/08 |
| Kredily (outside the six) | None advertised | Not in the evidence | Not in the evidence | — | r1/08 |

Three things distort a naive side-by-side, over and above the GST treatment specified earlier in this subsection, and the first is the one a model gets wrong. **The unquantified fee is the larger exposure, not the disclosed one.** Zoho's ₹50,000–₹1,60,000 Jumpstart is large and budgetable; Keka's "nominal setup fee" and Pocket HRMS's sales-disclosed fee are neither, and a year-one comparison that carries Zoho's number and omits theirs understates the two cards that refuse to publish. The engine's treatment is a refusal, not an estimate: a year-one total for a vendor whose setup fee is unquantified is emitted as `R-STATUS` with the fee named as unpublished (§21.17), never as a licence figure silently standing in for the total. **Renewal risk is asymmetric across the set.** Only Keka's terms are captured in clause form, and they price the renewal upward (EV-025); for the other five "not in the evidence" means no terms-of-service artefact was captured at all — the capture log holds one (CAP-05, Keka) — not that no renewal term exists. Any comparison says it in that form, and the missing captures are queued on the same re-sweep as CQ-24's multi-entity terms. **Purchase path:** a trial is not a self-serve purchase. greytHR, Keka and Kredily route to a trial, a free plan, sales or a demo; Zoho Payroll is the exception that publishes payment methods (r3/03). Published, quantified, all-in pricing that can be bought without a call is a wedge in its own right, and §18.13 sets our terms.

### 21.5 Keka in full

Keka gets its own subsection for five reasons, and being "the competitor that matters" is not one of them — that framing is **[Reversed]** (§21.1); greytHR holds the HRMS job (K-23). Its filed FY25 revenue, ₹133.86 Cr, sits beside greytHR's ₹125.22 Cr (r2/09; §04.4) — stated as filed figures, not as a ranking (CLR-08). Its own archived page describes it as "Loved by companies with 20 - 20,000 employees", which is our band (r5/03). It sits at the top of the priced set's price range (EV-027). It has withdrawn its price card globally, which is the opening for a published-price competitor (EV-024). And its published AI governance commitments set the table stakes the whole field will be measured against (EV-090).

#### The pricing evidence chain

| # | Finding | Method | Evidence | Captured |
| --- | --- | --- | --- | --- |
| K1 | The India pricing page carries no live price. The raw page (318,005 bytes) holds 60 HTML comments, exactly three of which contain a rupee symbol — ₹90, ₹120 and ₹150 "per additional employee", in FOUNDATION, STRENGTH, GROWTH order by byte offset. With comments stripped, the page contains zero rupee characters | Raw fetch with a comment-node scan | EV-021 | 5 Sep 2026 (r5); the same three spans in a 4 Sep 2026 raw fetch (r1/08) |
| K2 | A rendered read cannot see those prices. The earlier "TLS-blocked" premise was one fetch tool's failure; a plain fetch retrieves every Keka page with HTTP 200 | Method correction | EV-K21; r5/03 | r5 |
| K3 | The withdrawn card: FOUNDATION ₹9,999 a month for up to 100 employees plus ₹90 per additional; STRENGTH ₹12,999 + ₹120; GROWTH ₹15,999 + ₹150. Hiring priced per recruiter: PRO ₹1,500 and ADVANCED ₹2,500 a month | Wayback snapshot of Keka's own page | EV-022 | 1 Aug 2024; corroborated twice in 2026 by third parties, used as corroboration only (r5/03) |
| K4 | The live small-business page publishes a floor: "starts at ₹90 per employee/ month" and "starting at ₹6,999 per month"; its FAQ adds "no setup fees or hidden add-on costs". The word "minimum" does not appear | Raw fetch | EV-023; r5/03 | 5 Sep 2026 |
| K5 | The suppression is global. The US and UAE pricing pages each carry exactly three commented-out price spans and no live figure. Withdrawn US card $9 / $16 / $22 per employee per month (pure per-employee, not block plus overage); UAE $4 / $5 / $6 per additional employee | Raw fetch | EV-024 | 5 Sep 2026 |
| K6 | The per-plan "Free Trial" links lead to a page titled "Sign up for free demo", with no pricing, no plan selector and no seat field | Rendered read | r5/03 | 5 Sep 2026 |
| K7 | The live pricing page carries region toggles (India; USA and European Union; Asia Pacific and GCC) and product toggles (HRMS and Payroll; Hiring; Projects and TimeSheets) — the likeliest reason earlier rendered readings disagreed | Saved-page read | r5/01 | r5 |

<!-- DIAGRAM: competitive-landscape-keka-evidence -->

**What the chain supports:** a dual anchor — the withdrawn card as Keka's own historical list price, and the live small-business floor as its current published entry point — and the reading that Keka moved, company-wide and on every locale at once, to a sales-qualified motion (EV-024). **What it does not support:** the block the ₹6,999 floor buys (₹6,999 ÷ ₹90 = 77.8, which matches no round number); whether India is moving to pure per-employee pricing as the withdrawn US card was; and the date of the suppression, which is bracketed between September 2024 and October 2025 and not pinned — because it was global, one resolvable snapshot on any locale would date it (r5/03). The "₹99 Keka price" that circulated in earlier drafts appears in none of Keka's own captures and stays out of every model and deck (§18.3; §20.4).

#### Terms that hardened between August 2024 and September 2026

| Source | What it says | What it means for a buyer | Evidence |
| --- | --- | --- | --- |
| Pricing-page FAQ | "Yes, a nominal setup fee applies" — for guided payroll configuration, data import, validating past salary records and customisation | A setup fee exists and is not quantified | EV-025 |
| Small-companies page, same day | "no setup fees, surprise add-ons, features locked behind an upsell" | The two live pages contradict each other | EV-025 |
| Terms of service, clause 15 ("Term") | Auto-renews for successive equal terms unless 30 days' written notice; "Upon any renewal, the recurring fees shall be subject to an increase"; a downgrade "may be subject to re-pricing ... regardless of prior Term pricing" | Renewal price risk sits with the customer. **[Killed]** "Keka renewal rates run below list" (K-17) | EV-025; EV-K28 |
| Terms of service, clause 3 | Fees "non-refundable whether or not the Keka Platform is actively being used"; pricing revised on a change of region; overage billed; late payment at 1% a month or the highest lawful rate, whichever is lower | Prepaid fees are sunk | r5/03 |
| Terms of service, clause 5 | No customisations for individual customers | Configuration only | r5/03 |
| Terms of service, clauses 1.7 and 1.8 | "Keka Service Credits" held in a "Keka Wallet", defined as a semi-closed prepaid instrument | A prepaid-wallet construct in the contract | r5/03 |
| August 2024 pricing FAQ (archived) | "You can cancel your Keka account at any time with no fees and there is no lock-in period" | That answer is gone; the current pricing FAQ has three items and none is about lock-in | EV-025 |

The reading is narrow and dated: between the August 2024 archive and the September 2026 capture, Keka's published terms moved from no lock-in towards auto-renewal with non-refundable fees and an upward renewal clause (r5/03). It is a statement about Keka's published documents, not about any customer's negotiated contract.

#### Features suppressed the same way as the prices

The comment mechanism hides features as well as prices (r5/03; EV-028). "Direct Salary Payout" — "disburse salaries directly from Keka Wallet, with a single click", already marked "(additional charges applicable)" in 2024 — sits inside a 477-character HTML comment in the live FOUNDATION block, in the same position where it was live in August 2024. "Timesheets on Mobile App", "Smart Resource Allocation" and a 3,101-character "CLIENT PORTAL (Coming Soon)" section are commented out too. The method warning belongs in the capture discipline: a plain text search finds "Direct Salary Payout" on both the 2024 and the 2026 page and would conclude that nothing changed; the comment boundary is the only discriminating test (r5/03). The product reading is that in-product salary disbursement is being repositioned, which is one more reason to treat payout as a distinct build-or-partner decision rather than an assumed entry-tier capability (§16.3).

#### AI posture — waitlisted, with the most explicit governance commitments in the set

**[Verified — claim posture, not tested]** (EV-090). On 5 September 2026 "Join the waitlist" appeared exactly twice on Keka's AI page and "COMING SOON" three times — beside Payroll, Performance and Employee engagement. Hiring, HRIS, Onboarding, AI helpdesk and Time and attendance carried no badge; the footer's "Live demo available. Start using Keka AI now!" sits directly above a "Join the waitlist" button (r5/03). Round one recorded three delivery surfaces — embedded AI, a copilot inside the web app, and the "Keka MCP Server" for Claude, ChatGPT and other external assistants — all behind the same waitlist, and an AI helpdesk further along with a free-trial call to action (r1/04, round one). The governance commitments, read verbatim: a source citation on every answer — "No citation means no answer"; "No silent writes — Every action requires an explicit human confirmation"; multi-entity awareness by default; role-based access on every AI call; "Your data never trains external models" (r5/03). §12 matches or beats each of these; none is a differentiator for us, and external-assistant access is an expected feature, not a moat (§12.7). The honest caveat stands: a waitlist may mean Keka is more candid, not further behind (r5/03).

#### Scale claims

Keka's pricing and small-companies pages said "12,500+" on 5 September 2026; its sign-up page — reached from the pricing page's own plan links — said "10,000+" on the same day (r5/03). The two are not a time series and no growth reading may be drawn from them. Filed revenue is the only scale figure used for Keka (§04.4).

#### The sales motion behind the suppressed card

Keka's hiring corroborates the sales-qualified reading of EV-024. It advertises business-development roles for the Indian SMB market and the mid-market separately from enterprise account executives — a split motion rather than a full-cycle one — and runs a sales-development-to-account-executive outbound model that it is exporting to the US (r3/03; the India split is medium confidence). Its reseller programme pays partners on the first twelve months of a client's billing and on renewal, and Keka's own team co-sells a new reseller's first five deals (r3/03). A company that routes every price through a conversation and staffs for it is unlikely to answer a 30-person buyer's question about cost on a web page; that is the evaluability gap §21.4 records, and on this evidence it reads as a deliberate motion rather than an oversight — an inference, not a finding.

#### Intake specification for a sales-sourced price

Two of the open Keka items — the block behind the ₹6,999 floor (CQ-01) and the setup fee (CQ-02) — have only one method: a sales quote. Round five reached the end of the published trail deliberately, following Keka's own plan links into a demo-request form with no pricing, no plan selector and no seat field (r5/03). A quote is therefore a distinct evidence class, weaker than a published page in specific ways, and it needs an intake specification before anyone obtains one — otherwise the first quote that arrives becomes "Keka's price" in a deck.

**What a quote is and is not.** A published card is the vendor's standing offer to everyone, captured from its own page. A quote is one seller's offer, to one buyer, on one day, at one headcount, possibly discounted, possibly non-representative, and possibly withdrawn. It can settle a *structural* question — does a block exist, and how many seats does it hold — far better than it settles a *price level* question.

| Field the intake must record | Why | Failure if omitted |
| --- | --- | --- |
| Vendor, plan name and the exact date | The quote is a point observation | It gets read as the current list price |
| Headcount, entity count and states quoted for | Every figure in §21.4 is headcount-dependent | The figure cannot be placed on any curve |
| Billing cadence, tax treatment, term length | Cadence and GST are the two commonest comparison errors | An 18% or 20% error (§21.4) |
| Base, block seats, marginal rate, setup fee, discount applied, expiry of the quote | The structural fields are what CQ-01 actually asks for | The structural answer is lost inside a single total |
| Who requested it, under what identity, and what was disclosed | Integrity of the evidence and of us | Unusable evidence and a reputational exposure |
| The artefact itself — the email, PDF or portal quote | §02.5 dual capture | Nothing to re-read |
| Whether the seller stated it as list or as a discount from list | Separates the two questions above | A discounted quote becomes the list anchor |

**Requirements.**

| ID | Requirement | Acceptance criterion |
| --- | --- | --- |
| CLR-22 | A sales-sourced price is recorded as evidence class `sales_quote` with every field in the table above. It may answer a structural question (does a block exist, how large is it, does a setup fee exist) and may never be published as the vendor's price | Given a quote intake missing headcount or cadence, when it is submitted, then it is rejected and no claim may cite it |
| CLR-23 | Evidence is never obtained by misrepresentation. A quote is requested under our own identity, with no false company, false headcount or concealed purpose. Whether a vendor's terms permit a competitor to request a quote, and whether a trial account may be opened for evaluation, are counsel questions routed to §23; until they are cleared, no trial-account capture is taken | Given any capture whose intake record shows a concealed or false identity, when it is validated, then it is rejected, the claim is retired, and the incident is recorded |
| CLR-24 | Where a quote and a published card disagree, the published card governs every list-price statement and the quote is carried only as "a quote obtained on <date> at <headcount>". Neither is described as the other being wrong (CLR-02) | Given an artefact quoting a competitor price, when its source is a quote, then the sentence carries the date and headcount and the word "quote" |

**What CQ-01's answer changes, either way.** If the block is confirmed, the Keka rows in the effective-price table, the dead-seat row and the four refused crossover cells all become computable, and Keka joins the six-vendor structural finding on its live card rather than only on its archived one. If Keka has moved India to pure per-employee pricing — the shape of its withdrawn US card (EV-024) — then the 20-employee overcharge against Keka disappears, CRS-03 is realised, and the seat-floor claim narrows from six of six to five of six on live cards, which is a change to EV-026's scope and is registered as such rather than quietly restated.

#### What Keka's position opens for us, and what it does not

| Keka's move | What it opens | What we must do to use it | Never say |
| --- | --- | --- | --- |
| Price withdrawn on every locale (EV-024) | A buyer who will not sit through a demo cannot evaluate Keka | Publish a per-head card with a headcount slider (§18.2 P3) | Keka's withdrawn ₹9,999 card as a current price — it is archived (EV-022) |
| Live floor of ₹6,999 a month (EV-023) | ₹349.95 per employee at 20 employees (EV-027) | Bill actual headcount from the first paid employee (§18.2 P6) | Any block size behind the floor — it is unknown |
| Setup fee confirmed and denied on the same day (EV-025) | The buyer cannot budget year one | Default ₹0 setup, stated on the card (§18.13) | Any rupee figure for Keka's setup fee — the ranges on comparison blogs trace to no primary source (r5/03) |
| Renewal "subject to an increase" (EV-025) | Renewal risk the buyer carries | Publish our own renewal and price-change terms (§18.10) | "Keka renewals run below list" — **[Killed]** (K-17) |
| AI behind a waitlist (EV-090) | Nothing durable — governance parity is table stakes | Match the five commitments (§12) | "Keka has no AI" |
| Direct Salary Payout commented out (EV-028) | Payout is not a settled entry-tier expectation | File-first bank payout templates (§16.3) | "Keka cannot pay salaries" |

The open Keka items — the floor's block size, the setup-fee amount, the suppression date, per-employee migration in India, current Hiring and project-module prices, and AI general availability — are CQ-01 to CQ-04 in §21.14. None blocks the build; each changes what sales may say.

### 21.6 The freemium paywall — computation free, outputs charged

**[Verified]** Both freemium players give away computation and charge for outputs — bank payout files, PF/ESI challans, the annual tax certificate, Form 12BB/124 (EV-029). The paywall is empirically located: it is where two vendors with every incentive to find willingness-to-pay have independently put it. It is consistent with how Indian employers already buy this work: the ICAI recommended fee schedule read in round two carries no payroll-processing line item (EV-017) — but that schedule is pre-GST, a February 2020 revision was not retrieved, and the negative is therefore unverified for the current revision (§02.2 G15). It is corroboration, not a second finding, and it is not used outside the PRD until the revision is read.

#### Where each vendor draws the line

EV-029's list is the union across two vendors. The line sits in a different place for each, and a sales statement that ignores the difference is wrong.

| Vendor | Free tier | First paid tier | What the paywall holds back | Source |
| --- | --- | --- | --- | --- |
| Kredily | "Free Forever", ₹0, unlimited employees: payroll, HR, attendance and leave; PF, ESI, PT and TDS statutory *calculation*; self-service and mobile app. Limits: 250 MB storage, one leave/attendance rule, one salary structure | Payroll OS ₹1,249 a month up to 25 employees, then ₹50 each | Salary payouts ("ICICI Bank & NEFT"); PF/ESI challans; Form 12BB and Form 16. Professional (₹1,749 + ₹70) adds selfie/GPS attendance and expense workflows; Enterprise adds exit settlements and multi-company | r2/01; r3/03; r1/08 |
| Zoho Payroll | ₹0 up to 10 employees: automatic payroll calculation and payslips; "Online salary payments through HSBC"; "Compliance - Income Tax, EPF, ESI, Statewise PT, LWF"; automatic TDS worksheet; reimbursement-proof and investment-proof approval; self-service portal; 40+ reports | Standard ₹1,000 a month on annual billing (₹1,250 monthly) including 25 employees, then ₹40 (₹50) each | Statutory form generation — "Form 130 generation with digital signature", "Form 138, TDS challan recording"; the product page adds Form 12BB and e-signature. A separate licence per legal entity | r2/01; r1/08 |
| Zoho People | ₹0 up to 5 users | Essential HR ₹48 per user a month on annual billing (₹60 monthly), with the Zia AI bot included | Higher HR modules by tier; People Plus bundles from ₹192 per user with a 5-user minimum | r2/01 |
| factoHR | ₹0 up to 20 employees: employee data, letter generation, payslip generation | Core ₹4,999 a month up to 50, then ₹69 | Not established beyond the tier names | r1/08 — round one only |

Three precision points follow, and each is enforced by §21.12:

- **Zoho's free tier includes two things Kredily charges for:** salary payouts through HSBC and the investment-proof approval workflow (r2/01). "The freemium players charge for bank payouts" is true of Kredily and false of Zoho's HSBC route. The claim-safe form is "both give computation away and charge for statutory outputs; which outputs differ by vendor". For the same reason, the declaration-and-proof *workflow* is free on Zoho's free tier, while the Form 12BB *output* is behind Kredily's paywall; §07.5's treatment of Zoho should be read against this table.
- **Zoho's copy is in the new tax vocabulary.** Round two read "Form 130" and "Form 138" on Zoho's India pages as CMS corruption (r2/01). Under the Income-tax Act 2025 mapping they are the successors of Form 16 and Form 24Q (EV-050); the reading is superseded. Two cautions travel with it: Form 130 is valid only when TRACES-generated (EV-048), and the Form 138 Q4 format is unreleased (EV-046). What Zoho's "Form 130 generation" does in the product is not established, and nothing is said about it beyond its page wording (CQ-09).
- **Zoho prices per legal entity.** "You will have to purchase separate payroll licenses for each legal entity" (r1/08). A competitor already charges on an entity unit, not only on headcount — evidence that the market will accept a registration-shaped line like ours (§18.3), and a hidden multiplier in any headline comparison with Zoho for a multi-entity group.

#### The two gate shapes

Zoho gates all three of its India free tiers on a *size* proxy — 5 users (People), 10 employees (Payroll), and ₹25 lakh of annual revenue for Zoho Books — so a customer converts by growing, not by discovering a missing feature (r2/01). Kredily gates on *features* — unlimited headcount, but one salary structure and 250 MB of storage — so there is no conversion trigger at all (r2/01). §18.2 P1 copies Zoho's shape and sets our gate at the EPF line. Zoho's gates also create cliffs — ₹0 to ₹1,000 a month between the 10th and 11th employee; ₹0 to ₹48 a user between the 5th and 6th user — which §18.2 P2 treats as the attack surface and refuses to reproduce (r2/01).

#### The freemium cards run the same block structure, at 25 seats instead of 50

The paid tiers behind the two free tiers are not a different commercial species. Run through the §21.17 classification test they fall into the same model as the priced set, with a smaller block — which is what makes the freemium boundary a *gate design* question rather than a price question.

| Card | Base | Block × marginal | Difference | Model |
| --- | --- | --- | --- | --- |
| Zoho Payroll Standard, annual billing | ₹1,000 | 25 × ₹40 = ₹1,000 | ₹0 | `flat_with_minimum`, block 25 |
| Zoho Payroll Standard, monthly billing | ₹1,250 | 25 × ₹50 = ₹1,250 | ₹0 | `flat_with_minimum`, block 25 |
| Kredily Payroll OS | ₹1,249 | 25 × ₹50 = ₹1,250 | −₹1 | `flat_with_minimum` inside tolerance, block 25 |
| Kredily Professional | ₹1,749 | 25 × ₹70 = ₹1,750 | −₹1 | `flat_with_minimum` inside tolerance, block 25 |
| Zoho People Essential HR | No base — ₹48 per user annual, ₹60 monthly | — | — | `per_employee_no_block`; People Plus carries a five-paid-user minimum |

The 50-seat block is therefore a property of **the priced set**, not of Indian HR SaaS: the two freemium vendors block at 25, and one card in the evidence has no block at all. EV-026's scope survives exactly as written, and the wider statement it is often mistaken for does not (CLR-06).

**The cliff, in rupees.** Zoho's free tier stops at 10 employees and Standard's block starts at 25, so the eleventh hire moves a firm from ₹0 to ₹1,000 a month with no intermediate step (r2/01).

| Headcount on Zoho Payroll | Monthly bill | Effective PEPM | Dead-seat cost | Dead-seat share |
| --- | --- | --- | --- | --- |
| 10 | ₹0 | ₹0 | — | — |
| 11 | ₹1,000 | ₹90.91 | ₹1,000 − 11 × ₹40 = ₹560 | 56.0% |
| 20 | ₹1,000 | ₹50.00 | ₹1,000 − 20 × ₹40 = ₹200 | 20.0% |
| 25 | ₹1,000 | ₹40.00 | ₹0 | 0% |
| 26 | ₹1,000 + ₹40 = ₹1,040 | ₹40.00 | ₹0 | 0% |

Three readings the gate design depends on. The **marginal cost of one hire at the boundary is the whole base** — ₹1,000 for the eleventh employee, which is the cliff §18.2 P2 refuses to reproduce. The **dead-seat share follows the same `(block − n) ÷ block` rule** as the 50-seat cards, at 56.0% for an eleven-person firm — the structure is identical, only the block is smaller. And because Zoho's block ends at 25 while the priced set's begins at 50, **the 25-to-50 stretch is the one headcount range where the freemium paid tiers are structurally cheaper per head than every card in the priced set** — at 40 employees Zoho Standard bills ₹1,600 against ₹2,450 to ₹4,950 on the five priced cards whose blocks are published, and against Keka's ₹6,999 floor — which is where the argument has to be submission, maintenance and the SLA rather than price (§21.6's boundary table), and where the per-legal-entity multiplier (§21.17 W-1) is the one structural counterweight in the evidence.

#### Why Zoho is the credible commercial floor

Kredily and Frappe set the nominal floor at ₹0; Zoho sets the credible commercial one. It is the only actor in the evidence with an installed base across accounting and payroll, suite pull-through, a demonstrated pattern of indefinite India free tiers, and an AI bot at the bottom of its paid ladder — so dropping its India HR price is, for Zoho, a transfer between its own products (r2/01). That is an inference from pricing behaviour, not from financials: Zoho's revenue and profitability are not in the evidence, and Kredily's funding figures are aggregator-reported only, so neither is used here (r2/01). The consequence is written into the scenarios: assume Zoho widens its free gates, and do not build a plan that needs it not to (§21.11, CRS-01).

#### What the paywall means for our boundary

The freemium players draw the line between computation and outputs. Our Free tier gives away computation *and* artefact generation (§18.4), and holds back only what neither freemium player sells at any price: attended, assisted submission under written authority, and the compliance SLA (K-13; §18.3). Our line therefore sits one stage further along the filing chain than theirs (§21.7). Against Zoho, calculation and the declaration workflow are parity — **[Killed]** as differentiators in earlier drafts and not revived here (§04.5 claim ledger).

The boundary, stage by stage. Cells for the freemium players are their page claims; cells for us are §18.4's packaging decision, and a dash means §18.4 does not settle the point.

| Stage | Kredily free | Kredily Payroll OS | Zoho Payroll free | Zoho Payroll Standard | Our Free | Our File |
| --- | --- | --- | --- | --- | --- | --- |
| Statutory computation — PF, ESI, PT, TDS | Yes | Yes | Yes, with LWF | Yes | Yes | Yes |
| Investment-proof workflow | Not in the evidence | Not in the evidence | Yes — proof approval | Yes | — | — |
| Salary payout | No | Yes — ICICI Bank and NEFT | Yes — through HSBC | Yes | — | — |
| Statutory artefacts — challans, forms, returns | No | PF/ESI challans; Form 12BB and Form 16 | No | Form generation with digital signature; TDS challan recording | Generated; the customer submits | Generated and carried to portal acceptance |
| Attended, assisted submission | No | No | No | No | No | Yes, under written authority (§22) |
| Compliance SLA with a capped remedy | No | No | No | No | No | Yes (§18.3) |

(Sources: r2/01; r3/03; r1/08; §18.4. Zoho Payroll's tiers are read as cumulative, as its page lists each tier's features as increments on the one below — r2/01.)

### 21.7 No vendor submits a filing — the finding, its scope and its limits

**[Verified]** No vendor in the six-vendor priced set claims to submit any statutory filing. greytHR — the most compliance-forward of them — publishes only generation language, and MYND/Qandle is the only bundle that pairs self-serve HRMS with an outsourced filing operation, unpriced and demo-sold (EV-030). Round five treated this as the weakest null in the prior round and attacked it by adding the vendor most likely to falsify it; the null survived and was upgraded (r5/03).

<!-- DIAGRAM: competitive-landscape-filing-depth -->

#### What was read, and what it shows

| Vendor | Language on the pages read | Stage reached (§21.7 diagram) | Source |
| --- | --- | --- | --- |
| greytHR | "PF calculations with ECR generation"; "ESI computations and challans"; "PT with all state-specific rules built-in"; "Comprehensive TDS (IT) calculations and eTDS returns"; "One-click Form 24Q generation with automatic FVU validation"; "Digitally signed Form 16 and 12BA generation". "Filing", "e-fil", "TRACES" and "EPFO" appear zero times on the payroll page | Generate and validate | r5/03; EV-030 |
| Keka | Pre-built "PF, ESI, LWF, TDS and other mandatory statutory reports" in the entry tier | Generate | r5/03 |
| Qandle | The nearest offer is an unpriced "Compliance Assistance" advisory add-on | Advisory, unpriced | r5/03 |
| MYND / Qandle | An outsourced filing operation inside a finance-and-accounting and HR outsourcing group; unpriced, sold by demo | Services | EV-030; EV-034 |
| Pocket HRMS, Zimyo, HROne | No submission claim on the pages read | Generate | EV-030 |
| TallyPrime | Generates the artefacts; submission stays with the employer or its CA | Generate | EV-032 |
| Zoho Payroll | Form generation with digital signature and TDS challan recording in the paid tier; the customer files | Generate | r2/01; §18.12 |
| Kredily | Challans and certificates behind the paywall | Generate | EV-029 |
| Frappe HR v16 | No Indian statutory artefact in the source trees read | Compute | EV-031 |

#### What the finding does not cover

1. **Documentation and live tenants.** Round five searched pricing, payroll and feature surfaces, not product documentation or a trial account. The absence of a published submission claim is strong evidence of *positioning*, not proof of absent *capability* (EV-030). Whether any India HRMS actually submits is "the load-bearing unknown" and is settled only by documentation or a tenant (r5/03; CQ-07).
2. **The services layer.** CAs and payroll bureaus submit returns today; MYND runs an outsourced filing operation; Aparajitha's 1,500+ staff across 25 states deliver compliance services that include payroll compliance (r2/07); staffing majors sell compliance services. They are the budget line we redirect (§18.7), not SaaS features we out-build. Their economics are a warning as much as a benchmark: TeamLease's "Other HR Services" segment — regulatory compliance, training, a job portal, EdTech and SaaS compliance — returned a ₹2.62 Cr segment result on ₹196.52 Cr of revenue in FY25, a 1.33% margin (r2/07). Filing done by people is a services business at services margins, which is why supervised filing is the dominant and unsized line in our own cost stack and why its automation target is a build requirement (EV-088; §13, §22).
3. **The portals themselves.** Every statutory surface is an attended portal — EPFO's interactive login with a CAPTCHA; the TDS return, where the employer runs the FVU utility and uploads; ESIC's template upload; state PT across separate portals — so no vendor can "submit" through an API that does not exist (K-13; EV-035–EV-038). The deliverable that follows is a portal-accepted artefact plus attended, assisted submission under written authority to act, with the employer's and deductor's statutory liability non-delegable throughout (K-13). Whether our operator may act on those portals under employer credentials is under counsel review (§23), and the operation itself is §22's.

#### Who does the submission step today, filing by filing

The table below reads each competitor's position onto the portals themselves. Where a vendor publishes generation language only, "the customer" is an inference from that language (EV-030), not an observed fact.

| Filing | What the submission step involves | TallyPrime + CA | greytHR | Zoho Payroll (paid) | Kredily (paid) | MYND / Qandle | Us |
| --- | --- | --- | --- | --- | --- | --- | --- |
| EPF ECR | EPFO interactive login with a CAPTCHA; upload, validate, approve, generate the challan with its TRRN, pay (EV-036) | The CA | The customer | The customer | The customer | Outsourced operation, unpriced | Attended, assisted, under written authority (§22) |
| ESI contribution | ESIC template upload (K-13) | The CA | The customer | The customer | The customer | Outsourced operation | As above |
| State PT | Separate state portals (K-13) | The CA | The customer | The customer | The customer | Outsourced operation | As above, per state |
| TDS return — Form 138 | The deductor runs the FVU utility and uploads (K-13) | The CA | The customer, after greytHR's FVU validation | The customer | The customer | Outsourced operation | As above; Q1–Q3 only while Q4 is fenced (EV-046) |
| Annual certificate — Form 130 | Generated by TRACES only (EV-048) | Via TRACES | Via TRACES | Via TRACES | Via TRACES | Not in the evidence | Data prepared for TRACES; Part B fenced (EV-046) |

The last row is the reason no vendor — us included — can issue a valid annual certificate outside TRACES, and why our own copy says "prepared for TRACES issue", never "generated" (EV-048).

#### The filing-depth ladder as a placement model

"Stage reached" in the table above is an ordered enum, not an adjective, and the whole finding depends on placing vendors on it consistently. The ladder, the evidence that places a vendor on each rung, and the rules that stop a placement drifting are specified here; the diagram above illustrates them.

| Stage | Name | What the stage means | Evidence that places a vendor here | Verbs that indicate it |
| --- | --- | --- | --- | --- |
| S0 | Compute | Statutory amounts are calculated inside payroll | A page or documentation describing PF, ESI, PT, LWF or TDS computation | calculate, compute, deduct |
| S1 | Generate | A statutory artefact is produced — an ECR text file, a challan, a return file, a certificate input | A page naming the artefact | generate, produce, export, download |
| S2 | Validate | The artefact is run through the statutory validator before hand-off | A page naming the validator — greytHR's "automatic FVU validation" is the only instance in the evidence | validate, FVU, check |
| S3 | Assisted preparation | A person employed by or contracted to the vendor participates in preparing the submission | An advisory or outsourced-service offer — Qandle's "Compliance Assistance", MYND's operation | advisory, assistance, outsourced, managed |
| S4 | Attended submission | A person acts on the statutory portal under the employer's written authority, with the employer's approval recorded | An execution record under §22 and a written authority — no vendor in the evidence is placed here | file, submit, upload on your behalf |
| S5 | Acceptance carried | The submission is carried to portal acceptance and the acceptance artefact — TRRN, receipt, token — is captured back into the record | S4's evidence plus the acceptance artefact in the filing ledger | accepted, acknowledged |

**Placement rules.** Five, and each exists because a round of research got one of them wrong somewhere.

1. **Place a vendor at the highest stage its artefact *claims*, never higher.** The stage records positioning, not capability (EV-030). A vendor that submits but does not say so is mis-placed by this model, and that is the known and stated limit of the finding.
2. **Never place a vendor lower than it claims because we doubt the claim.** Doubt is recorded as an open question (CQ-07), not as a downgrade.
3. **The verb is the test.** greytHR's payroll page was placed at S2 because every verb on it is calculate, generate or validate, and because "filing", "e-fil", "TRACES" and "EPFO" return zero hits — a null that was tested, not assumed (r5/03).
4. **The services layer is placed on the same ladder but flagged as a service, not a product.** MYND sits at S3–S4 as an operation; a CA sits at S4 for its own clients. Neither is a SaaS feature, and a comparison that mixes the two axes produces the "nobody else files" error CLR-06 bars.
5. **Our own placement is the deliverable, not an aspiration.** Until §22 has executed a filing cycle and counsel has cleared the four Part D-17 questions, our external placement is stated as the deliverable — a portal-accepted artefact plus attended, assisted submission under written authority, with the employer's liability non-delegable (K-13) — and never as "we file".

**Transitions.** A vendor's placement is a claim like any other and moves under the same discipline.

| From | Event | Guard | Side effect |
| --- | --- | --- | --- |
| S2 | Submission or filing language appears on a watched page | The change is captured, not inferred from a summary | Vendor moves to S4-claimed; CRS-06 moves to TRIGGERED; EV-030's null is recorded as broken for that vendor, and the finding is re-scoped rather than dropped |
| S3 | A priced filing add-on appears on a published card | The price is on the vendor's own card | Vendor moves to S3-priced; CRS-07 moves to TRIGGERED |
| any | Documentation or a tenant contradicts the page (CQ-07) | The reading has an execution record (CLR-14) and any trial-account question is cleared (CLR-23) | Placement is re-stated with posture `observed_in_product`; every claim on the old placement is withdrawn |
| S4-claimed | The language is withdrawn from the page | Two captures, before and after | Placement returns to its evidenced stage; the earlier claim is archived with its capture, never deleted |

**Requirements.**

| ID | Requirement | Acceptance criterion |
| --- | --- | --- |
| CLR-25 | Every vendor in the submission comparison carries a stage, the capture that placed it there, and the verb list found on the artefact read. A vendor with no stage evidence is recorded as "not assessed", never as S0 | Given a vendor with no captured payroll surface, when the submission table is rendered, then the vendor appears as "not assessed" and is excluded from any count of vendors at a stage |
| CLR-26 | A claim about the submission finding names the set, the surfaces read and the date, and states the documentation-and-tenant limit in the same artefact — never in a footnote elsewhere | Given a draft claiming the submission finding without the limit sentence, when it is submitted for clearance, then it fails CLR-06 and CLR-03 |

#### Saying it safely

| Say | Never say | Why |
| --- | --- | --- |
| "No vendor in our six-vendor priced set claims, on its pricing, payroll or feature pages as read in September 2026, to submit a statutory return" | "No one else files" / "We are the only product that files" | The services layer files; documentation and tenants were not read (EV-030) |
| "We carry the return through attended, assisted submission under your written authority; the statutory liability stays with you" | "We file for you" / "We take on your liability" | **[Killed]** (K-13); the liability is non-delegable. Usable only once counsel has cleared attended filing — the four Part D-17 questions (§23; §20.8 R-32) |
| "greytHR's payroll page describes ECR generation and Form 24Q generation with FVU validation" | "greytHR can't file" | A capability claim about a product we did not run |
| "MYND/Qandle pairs an HRMS with an outsourced filing operation, sold by demo" | Any price or scope for MYND's filing operation | Unpriced and demo-sold (EV-030) |

The corner this finding opens is **thin, not empty** (§04.4). MYND's operation sits next to it, and a priced vendor adding submission, or MYND pricing and self-serving its operation, would occupy it; both are scenarios in §21.11 (CRS-06, CRS-07), with observable triggers in the capture schedule (§21.13).

### 21.8 Packaging — payroll sits in the entry tier everywhere

**[Verified]** Payroll sits in the entry tier for every vendor that publishes tiers; what is gated upward is performance, recruitment, engagement, analytics and workflow (EV-028). Payroll therefore cannot be an upsell in our packaging either, and §18.4 does not make it one.

| Vendor | Entry tier contains | Gated upward or sold as an add-on | Published add-on prices | Source |
| --- | --- | --- | --- | --- |
| greytHR | Essential: payroll, leave, core HR; "Every plan includes complete payroll, leave management, and employee self-service"; NAVOS included | Attendance and shift management move from Essential to Growth; performance is an add-on (free in Premium) | Performance ₹35–45 per user a month; Timesheets ₹35; Expense ₹35; GPS Live Tracking ₹140 per user a month; Recruit ₹2,500 per recruiter a month; Alumni Portal ₹20. Unpriced: GeoMark+, Visage, SSO/API, multi-company, manpower planning | r5/03; r1/04; r1/08 |
| Keka | FOUNDATION: payroll automation, statutory compliance, accounting integration, loans and salary advances, expense management, employee tax management, gratuity management | Hiring is a separate product; "Direct Salary Payout" commented out of the live entry block | Archived Hiring PRO ₹1,500 and ADVANCED ₹2,500 per recruiter a month | r5/03; EV-022; EV-028 |
| HROne | Basic includes payroll | Recruitment, performance and engagement are Enterprise-only; add-ons include payroll outsourcing, WhatsApp and Teams bots, business intelligence and workforce planning | None published in the evidence | r5/03; r1/08 |
| Qandle | FOUNDATION's core-HR block includes payroll | Strategic HR and analytics by tier; HR Advisory, Payroll Advisory and Compliance Assistance as unpriced add-ons | Remote Screen Tracking ₹50 per employee a month — identical on monthly and annual billing in India, unlike every other country Qandle prices | r5/03 |
| Pocket HRMS | Standard includes payroll processing | Higher tiers | None published in the evidence | r5/03 |
| Zimyo | Basic ₹80 per user | Standard and Enterprise tiers | Recruit ₹4,000 per recruiter a month; HR Analytics ₹20,000 per licence a month; Timesheet, Learn and Trip Management ₹40 per user a month each | r5/03 |
| Zoho People (outside the six) | Essential HR: onboarding and offboarding, employee database, documents, leave, reports, Zia AI bot | Higher HR modules by tier | Recruit ₹3,000 per recruiter a month; LMS ₹86 per user; engagement ₹30 per user; API access ₹37,500 a month | r2/01; r1/08 |

Five packaging readings, each with the section that acts on it:

1. **Payroll is never an upsell.** Computation and artefact generation sit in our Free tier; attended submission and the SLA sit in File, the first paid tier; no payroll capability is held back for Scale (§18.4).
2. **The market already accepts non-headcount units.** Recruiting is priced per recruiter by greytHR, Zimyo, Zoho People and Keka's archived card; location tracking per tracked user, at ₹140 against greytHR's ₹45 marginal seat — 3.1 times (r5/03). §18.5 prices recruiting and location as separable add-ons on that evidence. Location tracking carries a legal question the evidence has not answered: the counsel review noted that geolocation receives none of the proportionality analysis applied to biometrics (r5 counsel review). Pricing it is §18's decision; whether and how it may be offered is §23's.
3. **Attendance is greytHR's first upsell, and it is in our Free tier.** greytHR moves attendance and shift management from Essential to Growth (r1/08); our Free tier includes attendance because a Form IX-compliant time record feeds the filing (§18.4; EV-055). That is a packaging contrast that may be stated, dated, after §21.12 clearance.
4. **Implementation fees are the hidden line.** Zoho is the only vendor in the evidence publishing hard numbers — Zoho People "Jumpstart" one-time onboarding at ₹50,000 (Essential), ₹80,000 (Professional), ₹1,20,000 (Premium) and ₹1,60,000 (Enterprise), read from Zoho's own pricing JSON. On the Professional edition the ₹80,000 sits against ₹1,15,200 of year-one licence value for a 100-seat customer — roughly 70% (r1/08, arithmetic on Zoho's published figures; the ratio is edition- and seat-specific and is never generalised). Keka's fee is confirmed and unquantified (EV-025); Pocket HRMS discloses one during the sales conversation; HROne charges one only to enterprise clients; greytHR, factoHR and Kredily advertise none; 247HRM includes managed implementation (r1/08). §18.13 defaults ours to ₹0 because migration is acquisition infrastructure (§18.9).
5. **Salary payout is bank-specific across the field.** Kredily's paid payout is "ICICI Bank & NEFT" (r3/03); Zoho's free payout runs "through HSBC" (r2/01); Keka has commented its wallet-based payout out of the live entry block (EV-028). None is bank-neutral in the evidence. §16.3's per-bank, versioned, file-first templates are the neutral alternative, and the bank-side maker-checker stays with the customer.

#### The units this market actually prices in

Our cost line scales per registration while our revenue scales per employee (EV-088), so §18.3 needs to know which billing units this market has already accepted. The evidence answers that narrowly, and the negative half of the answer is the important half.

| Unit | Who prices in it | Observed prices | What it tells §18.3 |
| --- | --- | --- | --- |
| Per employee or per user | All six of the priced set, above their blocks | ₹45 to ₹150 marginal | The default unit; nothing to prove |
| Per employee block of 50 or 100 | All six | ₹2,450 to ₹9,999 | Accepted, and the thing we are refusing (§18.2 P6) |
| Per recruiter | greytHR ₹2,500; Zimyo ₹4,000; Zoho People ₹3,000; Keka archived ₹1,500 and ₹2,500 | — | A non-headcount unit the market accepts without friction, for a function with its own user population |
| Per tracked user | greytHR GPS Live Tracking ₹140 | 3.11× its own ₹45 marginal seat | A capability-scoped premium is accepted; the legal question on location is §23's, and pricing does not settle it |
| Per licence, flat | Zimyo HR Analytics ₹20,000; Zoho People API access ₹37,500 | — | Flat module pricing exists at the top of cards, not at the entry tier |
| **Per legal entity** | Zoho Payroll — "separate payroll licenses for each legal entity" | The whole card, multiplied | **The only structural precedent for a per-registration line**, and the one to point at |
| Per state or per statutory registration | **Nobody in the evidence** | — | Our registration allowance has no market precedent to lean on. It is justified from the cost structure (EV-088), priced openly on the card (§18.3), and never described as what others do |
| Metered usage | 247HRM alone — AI credits and WhatsApp messages from a prepaid wallet (r1/08, round one) | — | Metering exists at the edge of the market; our WhatsApp cost line sits in the same shape (EV-088) |
| One-time implementation | Zoho ₹50,000–₹1,60,000 by edition; Pocket HRMS and Keka unquantified | — | A hidden year-one line §18.13 defaults to ₹0 |

The reading for §18.3 is two-sided. A non-headcount line is not exotic — four distinct non-headcount units are already sold in this market. But **no vendor in the evidence prices a state or a statutory registration**, so the line cannot be introduced as a market convention; it is introduced as our cost structure made visible, with the legal-entity precedent as the nearest analogue. Anything stronger fails CLR-06, because it would generalise from one vendor's entity licence to "the market".

### 21.9 AI posture — a comparison of claims, not capabilities

**[Verified — claim posture, not tested]** greytHR's NAVOS "included in every plan" is the only packaging-level AI commitment in the priced set; Keka's AI is waitlisted; Keka publishes AI governance commitments and a "Keka MCP Server" that become table stakes to match (EV-090). Nothing in this subsection was tested inside a product. "Shipped" means "presented as available".

| Vendor | What is claimed | Availability as labelled | Packaging | Governance claimed | Evidence and date |
| --- | --- | --- | --- | --- | --- |
| greytHR | NAVOS, an agentic assistant across payroll, core HR, leave and attendance, performance and recruitment; homepage: "No AI add-on fees" | "Available across all paid greytHR plans ... requires no additional setup or purchase"; launched 3 June 2026 | Included in Essential, Growth and Premium — the only packaging-level commitment | Respects existing roles and permissions | Press release and pricing page (r1/04; r5/03) |
| Keka | Keka AI — embedded AI, a copilot, an MCP server for external assistants | Waitlist; Payroll, Performance and Employee engagement "COMING SOON"; the AI helpdesk offers a trial | Keka AI is not itemised in any pricing tier; the only AI items in its tiers were two recruiting features (r1/04) | Citation on every answer; no silent writes; multi-entity awareness; role-based access on every call; no training of external models | AI page, raw fetch (r5/03; r1/04) |
| Zoho People | "Zia AI bot" in the Essential HR tier; twelve named Zia functions; dated changelog entries in May and July 2026 | No beta or early-access tags; dated changelog entries — second only to a packaging commitment on the ladder below | Bundled from the entry paid tier (₹48); no AI-credit metering published | Role-based retrieval; a choice of Zoho's own LLM in Zoho data centres or bring-your-own-key third-party models — the only model-choice option in the set | Pricing page, Zia page, changelog (r1/04; r2/01) |
| HROne | "One AI Suite", voice-led for employees; on payroll, anomaly detection only | Presented as live; the April 2025 launch date traces to the vendor alone | Not itemised on the pricing page | Not in the evidence | Vendor blog and wire (r1/04) |
| Zimyo | AI agents marketed on the vendor's own pages; no payroll-statutory capability named | Presented as available — no waitlist, beta or early-access label on the pages read | Not itemised on the pricing page; the priced add-ons are Recruit, HR Analytics, Timesheet, Learn and Trip Management, none of them AI | Not in the evidence | Marketing pages (r5/03, 5 Sep 2026) |
| Pocket HRMS | AI agents marketed on the vendor's own pages | Presented as available; no label | Not itemised on the pricing page | Not in the evidence | Marketing pages (r5/03, 5 Sep 2026) |
| Qandle (MYND) | AI agents marketed on the vendor's own pages | Presented as available; no label | Not itemised in the four-tier card; the priced add-on in the card is Remote Screen Tracking, which is not AI | Not in the evidence | Marketing pages (r5/03, 5 Sep 2026) |
| 247HRM | "11 AI features, live" | Presented as live | The only usage-metered model in the evidence — AI credits and WhatsApp messages billed from a prepaid wallet | Not in the evidence | Pricing page (r1/08, round one) |
| Darwinbox (enterprise) | Cortex, an AI-native platform; an MCP server announced September 2025 | Cortex early access since 4 August 2026; its two named design partners are not India-headquartered; MCP availability not stated | No public price | Identity and permissions preserved | Newsroom and analyst note (r1/04) |
| PeopleStrong, ZingHR (enterprise) | Multiple named agents | No dates, no availability labels | No public price | Inline source citations (PeopleStrong's ER agent) | Product pages (r1/04) |
| Frappe HR, Kredily | No AI claims found | — | — | — | r2/01 |
| Aparajitha / Simpliance | No reference to AI, machine learning or algorithmic decision-making anywhere on the site — a verified negative | — | — | — | r2/07 |

AI claims in this market come in six strengths, and a claim is only as strong as its class. The ladder orders claims, not capability — nothing on it was tested.

| Evidence class for an AI claim | What it establishes | Example |
| --- | --- | --- |
| A packaging commitment on a published price card | That the vendor has committed commercially to including it | greytHR's "NAVOS included" on every plan (EV-090) |
| A dated public changelog entry | That the vendor recorded it as shipped on a date | Zoho People's May and July 2026 entries (r1/04) |
| A press release with an explicit availability statement | A dated claim of availability | greytHR's NAVOS release of 3 June 2026 (r1/04) |
| A product page with no dates or availability labels | Presence in marketing only | HROne, PeopleStrong, ZingHR (r1/04) |
| Early access | Not generally available | Darwinbox Cortex (r1/04) |
| A waitlist | Not generally available | Keka AI (EV-090) |

Four structural findings survive across the set, all from round one's verified reading (r1/04):

- **Payroll is the least-shipped AI surface.** Keka marks payroll AI "COMING SOON"; NAVOS claims it can initiate payroll processes without claiming statutory reasoning; HROne lists anomaly detection; Zoho's 2026 changelog entries are about onboarding, files, learning and analytics. On the pages read in round one, no vendor in the set publishes AI capability specifically for PF, ESI, PT, LWF, TDS or the Labour Codes — we are not aware of any, as of September 2026.
- **Every AI outcome metric is vendor-claimed.** Figures exist — Keka's AI helpdesk page claims classification accuracy "above 85%" against the customer's own ticket history; PeopleStrong's ER agent page claims resolution and ticket-reduction percentages — but on the pages read none carries an evaluation methodology, a sample size or third-party verification (r1/04).
- **Governance language has converged.** Role-based access, source citation and audit logging are claimed by nearly every vendor; only Keka's "no silent writes" and "no citation means no answer" are distinctive phrasings, and they describe an unreleased product.
- **Agent naming has converged** on "<Function> Agent"; neither naming nor agent count differentiates.

A fifth reading is round five's, and it inverts the ladder against intuition: the vendor that publishes the most explicit governance commitments is the one whose AI is least available, while Zimyo, HROne, Pocket HRMS and Qandle present AI agents as generally available with no governance language captured at all and no waitlist, beta or early-access label on the pages read (r5/03, 5 Sep 2026). Two rules follow and both are already in the register. A vendor placed at `product_page_only` is placed there because no stronger class was found for it, never because its product is judged weaker — the ladder orders evidence, not capability (CLR-27). And the absence of governance language is a reading about the pages read, not a statement that a vendor lacks controls; it may never be said about a named vendor in any external artefact (CLR-07, CLR-03). The honest summary of the whole dimension is that a waitlist may mean a vendor is more candid rather than further behind (r5/03).

What this means for us, and what it does not:

- **AI cannot be the revenue line.** The market price of HR AI is zero (§13.1). Inference is the smallest of four cost lines and the earlier inference-margin claim is withdrawn (K-02; EV-088); the metered AI SKUs carry a kill criterion (§18.5; §20 V-07).
- **Governance parity is table stakes.** §12 matches Keka's five commitments and adds the structural controls the market does not publish — the redaction chokepoint and the per-employee AI disclosure record. Those controls are described to customers as what the product does, never as a comparison with a named vendor's internals.
- **[Hypothesis]** The one AI position no vendor in the evidence occupies is statutory reasoning that cites the rule version and its capture — an answer about a PT slab or an ECR rejection grounded in the effective-dated rule object (§14) rather than in a policy document. Kill/validate: extend §20 V-07's instrument to ask which assistant capability buyers would pay for or prefer; if statutory reasoning is not preferred over a general HR assistant, it stays a product feature and is never a positioning claim.

#### Placing an AI claim, and what to do when a vendor contradicts itself

The six-strength ladder above orders claims. Placing a claim on it needs rules, because the evidence on this dimension contradicts itself more often than on any other — including within a single vendor page on a single day.

| Rule | Statement | Worked instance |
| --- | --- | --- |
| Highest class present governs | A vendor's placement is the strongest evidence class found for that vendor, not the average of its pages | greytHR is placed at "packaging commitment" because its price card carries NAVOS in every tier, even though its other surfaces are ordinary marketing |
| A contradiction within one vendor's own artefacts is recorded, never resolved by preference | Both readings are kept with their capture; neither becomes a claim | Keka's AI page carries "Live demo available. Start using Keka AI now!" directly above a "Join the waitlist" button, captured the same day (r5/03) |
| A badge is not a date | "COMING SOON" and "early access" place a vendor *below* generally available; they never support a statement about when something will ship | Keka's Payroll, Performance and Employee engagement badges (EV-090); Darwinbox Cortex early access (r1/04) |
| Counts and names are not evidence | Number of agents, agent naming and "AI-native" positioning place a vendor nowhere on the ladder | Agent naming has converged across the set (r1/04) |
| A vendor-claimed outcome figure is never repeated | Accuracy, resolution and ticket-reduction percentages on vendor pages carry no methodology, sample or third-party verification | Keka's helpdesk accuracy claim; PeopleStrong's ER agent figures (r1/04) |
| Absence of an AI claim is a reading about a page, not about a company | The only exception is a verified negative recorded as such | Aparajitha's site carries no AI, machine-learning or algorithmic-decision reference anywhere — recorded as a verified negative (r2/07) |

**Requirements.**

| ID | Requirement | Acceptance criterion |
| --- | --- | --- |
| CLR-27 | Every AI row carries its evidence class from the ladder, the capture date and the posture label "claim posture, not tested". A row without a class is not rendered | Given an AI comparison row with no ladder class, when the table is rendered, then the row is omitted and the omission is logged for re-capture |
| CLR-28 | No artefact states or implies a competitor's shipping date, roadmap or readiness from a badge, a waitlist or an early-access label; and no artefact repeats a vendor-claimed AI outcome figure | Given a draft containing a competitor's AI availability date, or a copied accuracy percentage, when it is submitted for clearance, then it fails CLR-07 with the source named |

Two consequences for the rest of this PRD. §12 builds governance parity to the five published commitments because they are table stakes, and describes those controls as what our product does — never as a comparison with a named vendor's internals (CLR-07). And §13 keeps AI on the cost side: nothing in the ladder changes the revenue plan, which is why CRS-04 is the one scenario with no §20.8 risk row.

### 21.10 Enterprise adjacency and the services layer

#### Enterprise adjacency — outside the set, and why

| Vendor | What the evidence shows | Why it is outside the competitive set | Where it re-enters | Source |
| --- | --- | --- | --- | --- |
| Ramco | HR & Payroll business-unit revenue ₹2,976.15 Mn in FY2025-26, up 30.8%; India revenue across *all* business units ₹1,329.96 Mn; the standalone Indian entity's India-geography revenue ₹1,127.51 Mn. A single Ind AS 108 operating segment, so India HR revenue is not separable. 500+ payroll customers globally and 18 new enterprise customers in the year; "15–20 country go-lives per quarter" (quote the range) | Enterprise multi-country payroll; no published price; "Let's Talk" calls to action | A calibration row for sizing (§04.4); an expansion-band and v3 competitor (§05.10) | EV-033; EV-092; r5/03 |
| ZingHR | Titled "Enterprise HCM for the End of Transactional HR"; no rupee character on its homepage; its pricing URL returns 404; claims 1,200+ enterprises; an AI brand, GHROWTH | Enterprise, sold by vertical, no price | §04.4's filed-revenue scoreboard; the 1,000+ band (§05.10) | EV-033; r5/03 |
| Darwinbox | No public price (pricing URLs return 404); majority of revenue from outside India as of March 2025; targets companies of 3,000+ employees; Cortex in early access | Enterprise procurement is closed to a new entrant for about three years (§05.2) | The 1,000+ band and v3 | r1/08; r1/04 — round one |
| PeopleStrong | No public price; enterprise; a controlling stake reported acquired by Goldman Sachs' alternatives arm in April 2025 | As above | As above | r1/08 — round one |
| HONO | "The world's first headless HRMS - run your people operations on a single conversation"; named agents; an enterprise logo list; aggregator-reported revenue band only | Enterprise; occupies the agentic narrative, not our band | Watch — AI positioning only | r2/07 |

Enterprise adjacency is not ignored; it is sequenced. These vendors set the documentary bar — certifications, references, residency — that §05.2 says a new entrant cannot clear for roughly three years, and they are the competitors when a tenant graduates past 1,000 employees (§05.10). None of their figures is used in a beachhead comparison.

#### MYND and Qandle — the nearest occupant of the filing corner

MYND Integrated Solutions acquired Qandle in April 2025; MYND's own announcement is dated 17 April 2025 and Qandle's site footer now reads "Copyright@ 2026 MYND" (EV-034; r5/03). MYND describes itself as a finance-and-accounting and HR outsourcing provider (r5/03). The result is the only bundle in the evidence that pairs a self-serve HRMS with an outsourced filing operation — and the operation is unpriced and sold by demo (EV-030). Qandle's own card shows the join: its advisory add-ons, including "Compliance Assistance" and "Payroll Advisory" (which describes outsourced verification of proofs and "complete payroll processing"), carry no published price (r5/03).

Three observable changes would move MYND from adjacency into the corner, and each is a capture trigger (§21.13): a priced filing or compliance add-on on Qandle's published card; MYND marketing a filing service to employers of 20–200; or Qandle's config file acquiring values for the advisory add-ons that then render on the page. Unrendered config values do not count — the file already holds some that never render, and they must not be quoted as prices (r5/03).

#### The services layer — channel, benchmark, partner

| Actor | What it does today | How we treat it | Source |
| --- | --- | --- | --- |
| CAs and payroll bureaus | Prepare and submit returns for employers; the monthly retainer is the budget line | A channel and a price anchor, never a target to displace (§18.7); indicative fee band unvalidated (§20 V-01) | r2/05; §18.1 |
| MYND | Outsourced payroll and compliance operations, now with Qandle | Watch — see above | EV-034 |
| Aparajitha / Simpliance | A compliance organisation with 1,500+ staff, 1,700+ clients and presence in 25 states, fused with Simpliance's software (labour-law compliance, regulatory compliance management, vendor compliance, audit, and a payroll/remittance product); SOC 2 Type 2 and ISO/IEC 27001:2022; no AI claim anywhere on its site. It bought 76% of Simpliance at an enterprise value of ₹120 crore — dated 2022 on the release's own internal evidence | Partner or acquisition candidate, not a competitor. The open question that decides a partnership is whether Simpliance exposes a usable API (CQ-14) | r2/07 |
| TeamLease | Staffing and compliance services; its HCM business manages over 3.5 lakh monthly employee records; it impaired its own HR-technology subsidiary by ₹6.4 crore in FY26 | Evidence, not a competitor: distribution, capital and compliance depth did not suffice to build HR software; and compliance services run at low single-digit segment margins (§21.7) | r2/07 |

#### Competitors in the channel — who else courts the CA and the partner

Our go-to-market leans on the CA and partner channel (§18.7, §18.8), and so do most competitors. The CA console is **not** an unmatched wedge: Kredily runs a dedicated CA programme on a multi-company console, and greytHR runs multi-client tooling for payroll service providers. What remains distinct is what the console *does* — carry filings to portal acceptance under the client's written authority — not that a console exists.

| Vendor | Channel programmes | Multi-client console for CAs or PSPs | Commission published? | Source |
| --- | --- | --- | --- | --- |
| Kredily | Two separate accountant-side programmes: a Partner Program for payroll service providers, with white-label; a CA Program for chartered accountants managing compliance for their client book | Yes — "Run payroll for every client, from one dashboard": one login across clients, per-client roles, a compliance command centre tracking PF, ESI, PT and TDS across all clients "with Form 16 & 24Q generated", a role-gated AI copilot, delivery under the practice's brand | No — clients land on the free plan and monetise when they need payouts, challans or Form 16 | r3/03 |
| greytHR | Reseller and Alliance tracks (the alliance track mostly banks and card networks); a Payroll Service Provider landing page claiming "1000+ Payroll Service Providers", which round three classed as a demo-capture page, not a programme page; a login-gated partner portal whose partner types could not be read | Yes — PSP tooling with single-click logins across client accounts, centralised control, audit trails, role-based access and MFA | No | r3/03; r1/08 |
| Keka | Reseller, Referral, Integration and Solution tracks; the programme is titled for HR and payroll consultants | Not in the evidence | No — resellers are paid on the first 12 months of billing and on renewal; Keka co-sells a new reseller's first five deals | r3/03; r1/08 |
| Zimyo | Two referral tiers; recruits freelancers, HR professionals, payroll specialists, tax consultants and financial advisors by name | Not in the evidence | Yes — "upto 20%" and "upto 30%" by monthly referrals, the only Indian HRMS vendor found publishing a rate | r3/03 |
| Zoho | Affiliate programme; Consulting Partner and reseller tracks; a Payroll Partnership Program | Not in the evidence | Affiliate only — 15% for the first 12 months at the standard tier, rising to 18% and 20%; consulting and reseller margins unpublished | r3/03; r1/08 |
| factoHR | Six partner categories, including CA/tax consultants and Tally/CRM/ERP resellers | Not in the evidence | No | r3/03 |
| HROne | Alliance Partner and Business Partner tracks | Not in the evidence | No | r3/03 |
| TallyPrime | Four partner grades; the public locator listed 1,257 partners; a separate CA Community | Not applicable — the CA works inside each client's Tally | No margins or terms published | r3/03 |
| Darwinbox | Technology and marketplace partnering only | Not in the evidence | No | r3/03 |

Three consequences. First, **the CA channel is contested, and one competitor already reaches it on a zero-price land model** — Kredily's CA programme puts every client on the free plan and monetises on outputs, which is exactly where a CA's clients cross from calculation into filing. Our console competes on the stage Kredily's does not reach: attended submission with the employer's approval inside it (§21.7). Second, **none of the programmes read publishes the economics that would tell us what a CA expects**, except Zimyo's referral percentages and Zoho's affiliate rates (r3/03); §20 V-05 exists to find out, and no figure here is a benchmark for our own terms. Third, **greytHR's bank alliances are a channel we cannot match and should not try to** — the response is bank-neutral payout files and partnership, not a rival alliance programme (CRS-05). The review-marketplace channel has also consolidated: G2 acquired Capterra, GetApp and Software Advice, closing on 5 February 2026 (r3/03) — one counterparty where there were four, which §18 prices as a channel, not this section.

#### Also outside the set

- **Odoo** is not a price floor for Indian payroll: India is not an official Odoo payroll localisation, and Indian payroll on Odoo means one of four third-party modules from single publishers across different Odoo versions, sold for one-time fees, with no statutory-maintenance obligation (r2/01). For a buyer that is a compliance liability, not a cheap substitute — and a migration source if one appears.
- **Rippling** is scaling in India as an engineering presence, not as a domestic HRMS go-to-market (r1/08 — round one).
- **Employer-of-record providers** solve a different problem — employing people in India on a foreign company's behalf — and are out of scope.

### 21.11 Competitive-response scenarios

The field will not hold still, and the moment a competitor moves is the wrong moment to decide what to do about it. Each scenario below has an observable trigger that a named person can watch for, the evidence that makes it plausible, what it breaks and what survives, a pre-agreed response, and what we will not do. Probabilities are deliberately not assigned — the evidence supports plausibility, not likelihood, and an invented percentage would be the fabricated precision this PRD exists to avoid. Each scenario's §20.8 risk row is given in its heading; the reconciliation with §20 is the table at the end of this subsection.

#### CRS-01 — Zoho widens its free gates (§20.8 R-1)

| Element | Content |
| --- | --- |
| Trigger | Zoho Payroll's pricing page raises its free ceiling above 10 employees, or its Standard tier's included seats above 25; or Zoho People raises its free cap above 5 users |
| Why plausible | Zoho already runs three size-gated India free tiers — Payroll to 10 employees, People to 5 users, and Books below ₹25 lakh of revenue, indefinitely — bundles AI from its ₹48 tier, and sells a suite bundle; dropping HR prices is a transfer between its own products (r2/01 — an inference from pricing behaviour) |
| What it breaks | The bottom of the beachhead gets zero-priced computation *and* Zoho's free declaration and HSBC-payout features; the "structurally overcharged 20–50" argument no longer applies against Zoho, though it still applies against the six; the paid band re-centres on 50–200 (§04.4) |
| What survives | Attended submission and the SLA, which Zoho does not sell; the CA console; maintained multi-state rules; the registration model priced openly (§18.3) — Zoho licenses payroll per legal entity (r1/08), so an honest multi-entity comparison counts Zoho's licences, not its headline; the Zoho importer as a switching path |
| Pre-agreed response | Move the commercial floor to 50 (§18.10, H-P8); lean on attended submission and the CA console (§20.8 R-1); keep our Free tier generous and gated at the EPF line |
| We will not | Follow Zoho to ₹0 on the File tier; claim feature advantage over Zoho on computation — **[Killed]** as a differentiator (§04.5) |
| Owner | GTM |

#### CRS-02 — Zoho adds submission or a compliance guarantee (§20.8 R-35)

| Element | Content |
| --- | --- |
| Trigger | Zoho Payroll's pages add submission, e-filing or an SLA or remedy term; its payroll partner programme markets filing as a service |
| Why plausible | Zoho already occupies artefact generation — form generation with a digital signature and TDS challan recording at ₹1,000 a month (r2/01) — and publishes a payroll partner programme (r1/08). Submission is one stage further along the same chain (§21.7) |
| What it breaks | Attended submission stops being unmatched against Zoho, the one actor in the evidence with an installed base across accounting and payroll (§21.6); the argument against Zoho narrows to maintenance quality and the channel |
| What survives | The CA console; maintained multi-state rules under a per-tenant SLA; a registration allowance priced openly on the card (§18.3) against Zoho's per-entity licences (r1/08); deskless attendance and the Form IX time model (§09) |
| Pre-agreed response | Compete on measured execution — the on-time accepted filing metric and its published definition (§19.1) — and on CA-channel depth; bring forward the SLA evidence pack |
| We will not | Claim Zoho's submission is inferior without an executed, dated comparison that has cleared §21.12 |
| Owner | Founder / GTM |

#### CRS-03 — Keka re-publishes a price, cuts it, or moves India to per-employee pricing (§20.8 R-9)

| Element | Content |
| --- | --- |
| Trigger | The commented-out spans on Keka's pricing page become live; its small-companies floor changes; an India card appears in the per-employee shape of its withdrawn US card |
| Why plausible | The withdrawn US card was pure per-employee (EV-024); the live small-business page already quotes "₹90 per employee/month" (EV-023); whether India is migrating is open (r5/03) |
| What it breaks | "Keka does not publish a price" stops being true; if the new card has no block, the 20-employee overcharge against Keka disappears |
| What survives | Attended submission; maintained multi-state rules; published renewal and setup terms of our own (§18.13); the 50-seat floor argument against the other five |
| Pre-agreed response | Re-capture within the capture window; re-run the §21.4 tables; withdraw any collateral built on Keka's opacity (CLR-11); keep the argument on structure and submission |
| We will not | Chase Keka's level; quote the archived card as current |
| Owner | Research, then GTM |

#### CRS-04 — Keka AI, or payroll AI anywhere in the set, becomes generally available

| Element | Content |
| --- | --- |
| Trigger | "Join the waitlist" disappears from Keka's AI page; the "COMING SOON" badge leaves Payroll; any vendor publishes AI for PF, ESI, PT, LWF or TDS |
| Why plausible | Keka has published its surfaces and governance commitments already (EV-090); payroll AI is the least-shipped surface in the set (r1/04) |
| What it breaks | Nothing in the revenue plan — AI is cost, not the revenue line (§13.1). The claim-posture table (§21.9) changes |
| What survives | Everything — no wedge rests on AI presence |
| Pre-agreed response | Re-capture; re-confirm governance parity (§12); if a vendor ships statutory AI, test the §21.9 hypothesis against it before any positioning |
| We will not | Position on AI presence or agent count |
| Owner | Product |

#### CRS-05 — A fintech subsidises an HRMS to win the payroll-to-bank flow (§20.8 R-6)

| Element | Content |
| --- | --- |
| Trigger | A neobank, card issuer or payments company acquires an HRMS or launches a zero-priced payroll product with salary payout as the funnel; or a bank bundles an HRMS free with salary accounts |
| Why plausible | Jupiter acquired sumHR to source salary accounts — the deal date is unsettled in the evidence: round two gives February 2023, while round one read the February 2023 report as describing an acquisition "last year", i.e. 2022 (r2/02; r1/01), and CQ-19 carries it; a consideration of ₹7.5 crore for 100% is reported second-hand from reporting on Jupiter's FY23 filings and is not confirmed against MCA (r2/02 — low confidence). RazorpayX Payroll sits inside a payments company (r1/08). greytHR's alliance partners are mostly banks and card networks (r3/03). Zaggle, whose platform fees are about 2% of its gross revenue, is buying software businesses for their margin (r2/02) |
| What it breaks | Price as an argument at the bottom of the band; bank-bundled payout convenience |
| What survives | Attended submission, maintained rules, multi-state coverage, the switching cost of a filing-critical system, and bank-neutral payout files (§16.3) |
| Pre-agreed response | Defend on submission, the SLA and switching cost; stay bank-neutral and partner with banks on payout rather than compete for the account; treat the precedent's cheap valuation as an option on partnership, not a plan (r2/02) |
| We will not | Offer a free HRMS monetised on interchange or float (§18.17) |
| Owner | Founder |

#### CRS-06 — greytHR, or another priced vendor, adds submission (§20.8 R-36)

| Element | Content |
| --- | --- |
| Trigger | greytHR's payroll page adds submission or filing language; its Payroll Service Provider page markets filing to employers; any of the six adds a filing SKU |
| Why plausible | greytHR is the most compliance-forward of the six — Form 24Q generation with FVU validation (EV-030) — and already has PSP multi-client tooling and bank alliances (r1/08; r3/03) |
| What it breaks | EV-030's null: attended submission is no longer unmatched in the priced set |
| What survives | No seat floor (greytHR's base buys 50); maintained multi-state rules under contract; published all-in terms. The CA console survives only where it out-performs greytHR's existing PSP tooling — to be earned, not assumed (§21.10) |
| Pre-agreed response | The wedge narrows to execution quality, no seat floor and CA-channel depth — the "single falsifiable risk" §04.4 names. Publish measured on-time acceptance (§19.1) as the proof |
| We will not | Dispute the competitor's submission capability without an executed, dated comparison |
| Owner | GTM |

#### CRS-07 — MYND prices and self-serves its filing operation for 20–200 (§20.8 R-37)

| Element | Content |
| --- | --- |
| Trigger | A priced filing or compliance add-on appears on Qandle's published card; MYND markets a filing service to employers of 20–200 |
| Why plausible | MYND owns Qandle and runs payroll and compliance outsourcing (EV-034); Qandle already lists "Compliance Assistance" and "Payroll Advisory" as unpriced add-ons (r5/03) |
| What it breaks | The corner is occupied by a bundle, not a service beside an HRMS |
| What survives | No seat floor (Qandle's base buys 50); a product-led submission workflow with the employer's approval inside it, against an outsourced service; maintained multi-state rules; the CA console |
| Pre-agreed response | As CRS-06 |
| We will not | Characterise MYND's service quality |
| Owner | GTM |

#### CRS-08 — The Tally ecosystem closes the PT/LWF gap (§20.8 R-38)

| Element | Content |
| --- | --- |
| Trigger | A named TDL add-on for state PT or LWF; or a TallyPrime release note adding a state slab table or an LWF engine |
| Why plausible | Add-ons are cheap to build and sell — observed prices run from ₹354 to ₹4,999 (r5/01) |
| What it breaks | PAR-15 and PAR-17 become parity against Tally |
| What survives | Maintained content under SLA; attended submission; leave-to-payroll; multi-user access without a Gold licence; the employee surface only if the open Tally ESS cell closes as a gap (CLR-15) |
| Pre-agreed response | Verify the named product directly — never re-run the sweep on a rumour (r5/01); move the Tally conversation to maintenance and submission; keep "attach, never replace" |
| We will not | Sell against the partner's licence revenue (§18.8) |
| Owner | Research, then GTM |

#### CRS-09 — Frappe, or a Frappe partner app, ships the Indian statutory layer (§20.8 R-7)

| Element | Content |
| --- | --- |
| Trigger | A Frappe HR release, a marketplace app or the resolution of CQ-05 shows state PT, LWF, ECR or 24Q/138 logic in code |
| Why plausible | Frappe's own product page already describes such a layer (r2/01 — unreconciled with the source trees, §21.3); it has a partner channel (vendor-reported) and a low-burn funding history that puts it under no pressure to raise prices (r2/01) |
| What it breaks | PAR-10, PAR-15, PAR-17 and PAR-19 move to parity against Frappe at a ₹0 licence |
| What survives | The maintenance obligation under contract, attended submission and a support SLA — the things an open-source project does not contract to provide (§20.8 R-7) |
| Pre-agreed response | Re-read the release branch the customer would install; the bake-off moves entirely to maintenance, submission and the SLA |
| We will not | Claim "more complete India compliance" (§20.8 R-7) |
| Owner | Research, then GTM |

#### CRS-10 — A priced vendor drops its 50-seat block (§20.8 R-39)

| Element | Content |
| --- | --- |
| Trigger | Any of the six changes its base block, or publishes a price for a sub-50 route — HROne's startup programme or greytHR's FLEXIBLE START |
| Why plausible | Both routes already exist unpriced (r5/03); greytHR's slider already quotes from 10 employees (r5/03) |
| What it breaks | The no-seat-floor wedge against that vendor (§18.2 P6) |
| What survives | A published, all-in card; attended submission; maintained multi-state rules |
| Pre-agreed response | Re-capture; withdraw seat-floor claims for that vendor inside the withdrawal window (CLR-11); watch H-P14 (§18.16) for whether 20–50 stays winnable |
| We will not | Keep using the claim after the card changes |
| Owner | Research, then GTM |

#### CRS-11 — greytHR cuts its price or widens the seats its base includes (§20.8 R-40)

| Element | Content |
| --- | --- |
| Trigger | greytHR Essential's base falls below ₹2,495 a month, its per-employee rate below ₹45, or its base covers more than 50 employees |
| Why plausible | greytHR already sets the value floor at 50 employees with Qandle (EV-027), already quotes below 50 on its slider (r5/03), and holds a bank-alliance and PSP channel that lowers its acquisition cost (r3/03; r1/08) |
| What it breaks | The value-floor anchor moves down, and the distance between the floor and our target inside the clearing band widens (§18.3) |
| What survives | Attended submission, maintained multi-state rules and the SLA; the no-seat-floor wedge unless the base shrinks below 50 (then CRS-10 applies) |
| Pre-agreed response | Re-run §21.4; revisit where our price sits between the anchors only on realised-price evidence (§20 V-03), never on a competitor's list move alone |
| We will not | Match a list-price cut; describe a greytHR price change as a sign of distress |
| Owner | GTM |

#### CRS-12 — A vendor publishes a free tier that reaches 20 employees or more (§20.8 R-41)

| Element | Content |
| --- | --- |
| Trigger | Any vendor's published card offers a free tier with statutory computation at 20 employees or above |
| Why plausible | factoHR published a free tier to 20 employees in the round-one capture (r1/08); Zoho's free payroll tier stops at 10 and could widen (CRS-01) |
| What it breaks | Our Free-to-File boundary at the EPF line is no longer the only free boundary there; conversion at 20 meets a free alternative |
| What survives | Attended submission and the SLA — nobody in the evidence gives either away; maintained multi-state rules. A free tier with a CA console already exists (Kredily, §21.10), so the console is not a survivor on its own |
| Pre-agreed response | Keep File's value on submission and the SLA; do not move our gate below the EPF line; re-capture factoHR's tier (CQ-15) and, if its scope has widened to statutory computation, re-state §18.4's "combination at the line" claim against it |
| We will not | Extend our Free tier to include attended submission |
| Owner | GTM |

#### CRS-13 — An accounting incumbent outside the Tally ecosystem bundles payroll

| Element | Content |
| --- | --- |
| Trigger | A payroll module, or a partner add-on with statutory artefacts, appears in an Indian SMB accounting or ERP ecosystem we have not searched — Busy, Marg, SAP Business One or Microsoft Dynamics |
| Why plausible | The gap is recorded, not hypothetical: HR add-ons for these four were never researched in any round (r2/01), and Busy and Marg have deep Indian SMB accounting penetration. The job-1 argument (§21.2) is built on one accounting incumbent because one is all that was read |
| What it breaks | "Two incumbents, two jobs" would need a third occupant of job 1, and the Tally-shaped displacement argument would not transfer unchanged |
| What survives | The state layer maintained under contract; attended submission; leave-to-payroll; the registration model. None of them is a Tally-specific wedge |
| Pre-agreed response | Run the CQ-16 desk sweep now rather than after a move, under §02.5, and treat any bundled payroll as both a competitor row and an importer source (§16.7) |
| We will not | Extend "both incumbents" language, or any parity statement, to a vendor nobody has searched |
| Owner | Research |
| §20.8 row | None yet — routed to §20 for registration with CQ-16 |

#### CRS-14 — A compliance-services firm productises filing for the 20–200 band

| Element | Content |
| --- | --- |
| Trigger | A compliance-services organisation publishes a priced, self-serve filing or payroll-compliance product for employers of 20–200 |
| Why plausible | Aparajitha/Simpliance already has 1,500+ staff across 25 states, 1,700+ clients, a payroll and remittance product inside its software line, SOC 2 Type 2 and ISO/IEC 27001:2022 — and no AI claim anywhere on its site (r2/07). It holds the operational depth that §22 has to build |
| What it breaks | The services layer stops being only a channel and a partner; the filing corner is occupied by an operator with more compliance staff than we will have |
| What survives | A product-led workflow with the employer's approval inside it; the multi-state rule set as maintained data rather than as staff knowledge; no seat floor; the published card. TeamLease is the counter-evidence on the other direction — distribution, capital and compliance depth did not produce HR software, and it impaired its own HR-technology subsidiary by ₹6.4 Cr in FY26 (r2/07) |
| Pre-agreed response | Open the partnership conversation on its merits rather than waiting — CQ-14 asks whether Simpliance exposes a usable API, which is the question that decides partner-or-competitor |
| We will not | Characterise a services firm's quality, margins or staffing in any external artefact (CLR-08) |
| Owner | Founder |
| §20.8 row | None yet — routed to §20 for registration with CQ-14 |

#### The wedge register

The matrix below has seven columns, §21.19's outcome taxonomy has sixteen factors, and §21.15 lists what each finding commits other sections to. All three read from this register: one row per wedge, with the evidence it rests on, the section that owns it, and the single observable that would kill it.

| Wedge | What it is | Evidence it rests on | Owning section | What kills it |
| --- | --- | --- | --- | --- |
| No seat floor | Billing actual headcount from the first paid employee on a payroll-and-filing product with a published card | EV-026; EV-027 | §18.2 P6 | Any of the six publishing a sub-50 price (CRS-10), which kills it against that vendor only |
| Published all-in card | A price, terms and setup position a 30-person buyer can read without a call | EV-021; EV-024; EV-025 | §18.13 | Keka re-publishing (CRS-03); a competitor publishing all-in terms |
| Attended, assisted submission | The return carried to portal acceptance under written authority, liability non-delegable | EV-030; K-13 | §22 | Any vendor adding submission (CRS-02, CRS-06, CRS-07); or counsel declining the Part D-17 questions, which kills it for us rather than for them |
| Maintained multi-state PT and LWF | Gazette-sourced per-state datasets maintained under contract | EV-031; EV-032; EV-015 | §06, §14, §22 | Frappe shipping the layer (CRS-09); a Tally add-on (CRS-08) — both narrow it to maintenance rather than removing it |
| The registration model | Group, entity, registration, establishment with a per-registration filing ledger and an openly priced allowance | EV-088 | §14, §18.3 | Nothing in the evidence; the risk is our own pricing, not a competitor's move |
| CA and partner console | Multi-client working with attended submission inside it | r3/03; r1/08 | §18.7 | Already contested — Kredily's CA programme and greytHR's PSP tooling are multi-client consoles; only the submission it carries is distinct |
| Importers with a YTD tie-out | Migration as acquisition infrastructure, with tie-out criteria and tolerances | §16.7 | §16 | A competitor publishing tie-out criteria of its own; nothing in the evidence does |
| Format-break coverage under an SLA | A per-tenant contractual commitment to absorb statutory format changes with a capped remedy | PAR-36; EV-046; EV-051; EV-052 | §18.3 | A competitor offering a compliance guarantee (CRS-02) |

Two properties of the register are the point of keeping it. Every wedge names **one observable** that would kill it, so a review is a set of lookups rather than an argument; and two of the eight are already **contested or conditional** on the day they are written — the CA console, and attended submission pending counsel. A wedge list that contained no such entries would be a marketing document.

#### Which wedges survive which move

The matrix reads across: for each scenario, whether each of our wedges holds, narrows, or is lost against the vendor that moved. "Lost" is always *against that vendor*, never against the field.

| Scenario | No seat floor | Published all-in card | Attended submission | Multi-state PT/LWF maintained | CA console | Importers | Format-break coverage (SLA) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| CRS-01 Zoho widens free gates | Narrows | Holds | Holds | Holds | Holds | Holds | Holds |
| CRS-02 Zoho adds submission | Holds | Holds | Narrows | Holds on maintenance | Holds | Holds | Narrows if it adds a guarantee |
| CRS-03 Keka re-prices | Narrows vs Keka | Narrows vs Keka | Holds | Holds | Holds | Holds | Holds |
| CRS-04 AI goes GA | Holds | Holds | Holds | Holds | Holds | Holds | Holds |
| CRS-05 Fintech subsidy | Narrows | Narrows | Holds | Holds | Holds | Holds | Holds |
| CRS-06 greytHR submits | Holds | Holds | Lost vs greytHR | Holds on maintenance | Narrows — greytHR already has PSP tooling | Holds | Holds unless it adds one |
| CRS-07 MYND self-serves | Holds | Holds | Narrows | Holds | Holds | Holds | Holds |
| CRS-08 Tally TDL closes PT/LWF | Holds | Holds | Holds | Narrows vs Tally | Holds | Holds | Holds |
| CRS-09 Frappe ships the layer | Holds | Holds | Holds | Lost vs Frappe on coverage | Holds | Holds | Holds |
| CRS-10 Seat block dropped | Lost vs that vendor | Holds | Holds | Holds | Holds | Holds | Holds |
| CRS-11 greytHR cuts price | Holds, unless the base shrinks | Holds | Holds | Holds | Holds | Holds | Holds |
| CRS-12 Free tier reaches 20 | Narrows | Holds | Holds | Holds | Holds | Holds | Holds |
| CRS-13 Accounting incumbent bundles payroll | Holds | Holds | Holds | Holds | Holds | Narrows — a new importer source | Holds |
| CRS-14 Compliance-services firm productises filing | Holds | Holds | Narrows | Holds | Holds | Holds | Narrows if it contracts to a remedy |

CRS-11 leaves every wedge standing and still matters, because it moves the value floor that §18.3 positions against; price level is not a wedge, but it is the frame the wedges are sold inside.

The CA-console column reads "Holds" against the vendor that moves, not against the field: Kredily's CA programme and greytHR's PSP tooling are already multi-client consoles (§21.10), so the console is a contested surface whose distinct part is the attended submission it carries.

Two readings. First, **attended submission is the most robust wedge** — only a competitor adding submission touches it — and the CA console is robust only to the extent that it carries submission; as a multi-client dashboard it is matched today (r3/03; r1/08). Second, **the dangerous case is a combination, not a single move**: one vendor that publishes a per-head card with no floor (CRS-10) *and* adds submission (CRS-06 or CRS-07) occupies the target corner outright, and the wedge collapses to execution quality alone. That combination is a whole-thesis review trigger under §20.11.

#### Watching for the triggers

The triggers are only useful if something watches them. The competitive watch is an operating capability of the research function, specified here so that it can be staffed and audited:

| Signal | Source watched | Detection method | Why this method |
| --- | --- | --- | --- |
| Price or feature change on a comment-suppressing page (Keka) | Pricing, small-companies, US and UAE pricing pages | Hash the raw page twice — with and without HTML comments — and alert on either change | Keka's material changes happen inside comments; a rendered or comment-stripped hash would miss them (EV-021, EV-028) |
| Price change on a JS-injected page (Qandle) | The vendor's pricing config file | Hash the config file; confirm by a rendered read | Raw HTML shows empty spans (r5/03) |
| Price change on a rendered page (Zimyo, Zoho) | Pricing page and, for Zoho, the pricing JSON | Rendered read; JSON hash | The page returns 403 to a non-browser fetch (Zimyo) or injects prices client-side (Zoho) |
| Terms change | Keka terms of service; pricing FAQs | Clause-level diff | Renewal and refund terms moved once already (EV-025) |
| Submission language | Payroll pages of the six, Zoho and Kredily | Term search for filing, submission, e-filing, TRACES, EPFO and SLA terms | EV-030 was established by the absence of these terms |
| AI availability | AI pages and changelogs | Waitlist and badge detection; changelog entries | EV-090 is a claim-posture record |
| Frappe statutory layer | Frappe HR and ERPNext release tags; the Frappe product page; the app marketplace | Re-run the §21.3 greps on each stable release | EV-031's re-verify trigger is each Frappe major release |
| Tally state layer | TallyPrime release notes; named TDL products | Read on each release; verify any named add-on | EV-032's re-verify trigger is each TallyPrime release |
| Acquisitions and fintech moves | Trade press and acquirer announcements | Manual watch | CRS-05 and CRS-07 turn on corporate events |

Every alert is triaged by the research owner within `competitive_alert_triage_days`, and any cleared claim it touches enters the withdrawal path (CLR-11). Both parameters are unsized and routed to §20 with the other §21 parameters (§21.14).

<!-- DIAGRAM: competitive-landscape-watch-pipeline -->

#### The scenario record — fields, states and review discipline

Fourteen scenarios, each with a trigger somebody must watch, are an operating commitment. The record below is what makes them auditable: a scenario that cannot be detected is not a scenario, and a scenario that fires without anything happening is a defect in the trigger, not in the field.

| Field | Rule |
| --- | --- |
| `crs_id` | Immutable; retired scenarios keep their ID |
| `trigger` | Must name an artefact and an observable change on it. A trigger phrased as a market condition ("competition intensifies") is rejected |
| `watch_signal_ref` | The §21.11 watch row that would detect it. A scenario with no watch row is incomplete and cannot be approved |
| `why_plausible` | Evidence with its round and capture. Plausibility, never probability — no percentage is assigned anywhere in this section |
| `breaks` / `survives` | Written against the wedge list, so the matrix can be recomputed rather than re-argued |
| `response` / `will_not` | Pre-agreed, with the owning section for each action |
| `owner` | A function; §20 assigns the person |
| `risk_row` | The §20.8 row, or "routed for registration" with the routing date |
| `state` | The enum below |

| From | Event | Guard | Side effect | Who may trigger |
| --- | --- | --- | --- | --- |
| `WATCHED` | The watch signal fires | The alert is triaged as material within `competitive_alert_triage_days` | State → `TRIGGERED`; a capture is taken; the owner is notified | Research |
| `TRIGGERED` | The change is confirmed on the vendor's own artefact | Two captures, before and after, both retained | State → `CONFIRMED`; every claim resting on the old capture → WITHDRAWN; the §20.8 row is updated with the date | Research |
| `TRIGGERED` | The change does not reproduce | A second capture shows the original state | State → `WATCHED`; the alert is recorded as a false positive and the detection method is reviewed | Research |
| `CONFIRMED` | The pre-agreed response is executed | The response's owning sections have acted | State → `RESPONDED`; the wedge matrix row is recomputed and any wedge marked "Lost" is removed from collateral | Owner |
| `RESPONDED` | The position is stable on the next cadence sweep | — | State → `CLOSED`; the scenario stays in the register as history | Owner |
| any | The scenario's premise is falsified — the vendor exits, the product is withdrawn, the evidence is killed | Recorded with evidence | State → `RETIRED`, with the reason. Never deleted | Research |
| `CONFIRMED` | A second scenario for the same vendor is also `CONFIRMED` | The pair is CRS-10 with CRS-06 or CRS-07 | The §20.11 whole-thesis review trigger fires — the combination, not either move, is the dangerous case | Founder |

**Requirements.**

| ID | Requirement | Acceptance criterion |
| --- | --- | --- |
| CLR-29 | Every scenario names an artefact-level trigger and a watch row that would detect it. A scenario without both is not approved and does not appear in the matrix | Given a scenario with no `watch_signal_ref`, when the register is validated, then it fails validation and the scenario is excluded from the wedge matrix |
| CLR-30 | No scenario, risk row or external artefact assigns a probability, likelihood or percentage to a competitor's move. Plausibility is evidenced; likelihood is not claimed | Given any scenario text containing a percentage or a likelihood word, when it is reviewed, then it is rejected with the phrase quoted |

#### Routing to the §20 risk register

Every scenario except CRS-04 now has a §20.8 risk row: four pre-dated this section and were updated from it, and seven were registered from it (R-35 to R-41). §20 owns the register; this table is the hand-off and its reconciliation. Where a §20 row's wording and this section's differ, the scenario here governs the competitor fact and §20 governs the risk rating.

| Scenario | §20.8 row | Status of the hand-off |
| --- | --- | --- |
| CRS-01 Zoho widens its free gates | R-1 | Updated in §20: the per-entity licence point is in the response, and the residual notes that the CA console survives against Zoho only — Kredily and greytHR both run multi-client consoles (§21.10) |
| CRS-02 Zoho adds submission or a guarantee | R-35 | Registered. Open: R-35's residual describes Zoho as "the best-capitalised software competitor"; Zoho's financials are not in the evidence (§21.6), so that wording is routed back to §20 for removal (CLR-08) |
| CRS-03 Keka re-prices or moves to per-employee pricing | R-9 | Updated in §20: re-keyed off the completed V-06 capture (EV-021–EV-025) |
| CRS-04 AI goes generally available | None | Watch item only — no wedge depends on it |
| CRS-05 Fintech subsidy | R-6 | Updated in §20: the ₹7.5 crore consideration is marked second-hand and unconfirmed (r2/02; CQ-19). Open: the deal date (CQ-19) |
| CRS-06 greytHR or another priced vendor adds submission | R-36 | Registered — it removes EV-030's null |
| CRS-07 MYND self-serves its filing operation | R-37 | Registered |
| CRS-08 The Tally ecosystem closes the PT/LWF gap | R-38 | Registered, with the verify-the-named-product trigger (r5/01) |
| CRS-09 Frappe ships the statutory layer | R-7 | Updated in §20: the trigger is tied to CQ-05 and a release-branch re-read |
| CRS-10 A priced vendor drops its 50-seat block | R-39 | Registered, linked to H-P14 (§18.16) |
| CRS-11 greytHR cuts its price | R-40 | Registered |
| CRS-12 A free tier reaches 20 employees | R-41 | Registered, linked to CQ-15 |
| CRS-13 An accounting incumbent outside the Tally ecosystem bundles payroll | None yet | Routed to §20 for registration with CQ-16 — the four ecosystems were never searched |
| CRS-14 A compliance-services firm productises filing | None yet | Routed to §20 for registration with CQ-14 |
| CRS-10 with CRS-06 or CRS-07 for one vendor | R-39 with R-36 or R-37 | Registered in §20.11 as a whole-thesis review trigger |

### 21.12 The competitor-claim clearance rule

This is the canonical statement of the rule that §01, §02.5, §04.4 and §18 each cite. **No competitor claim leaves the building without legal clearance, a dated capture of its source, and a note of whether the competitor's product was executed or only its pages, documentation or code were read** (r5 synthesis, item 18(c); r5 counsel review; §01 standing rule). The rest of this subsection makes that sentence operable.

**How legal clearance is operated.** Counsel clears at two levels, and no claim reaches a reader without one of them. First, counsel clears, once and in writing, a **phrasing template** for each claim class in the table below — the label, the scoping words and the never-say list for that class — and re-clears it whenever the template changes. Second, a named claim owner clears each *instance* against its class's counsel-cleared template. An instance that fits no cleared template, and every instance in a class the table marks "counsel", goes to counsel individually. Until counsel has cleared a class's template, every claim in that class goes to counsel individually. The template mechanism is an operating proposal of this PRD, not counsel's; whether it satisfies the clearance counsel asked for is itself a §23 item.

**Why it exists.** Round five's counsel review found flat negative assertions about named competitors framed for sales use — that a vendor's compliance calendar was wrong, that "the incumbents' own published compliance data is wrong", that TallyPrime "cannot calculate leave encashment" — sitting a few rows from the admission that neither product had been run. It identified disparagement exposure in that pattern, citing the Trade Marks Act 1999 s.29(8) read with s.30(1) and ASCI's comparative-advertising provisions for collateral (r5 counsel review). Whether and how comparative claims may be used at all is §23's analysis; statutory basis under counsel review. This section's job is to make sure no claim reaches that question uncaptured, unscoped or unowned.

**What "leaving the building" means.** Any artefact seen by someone outside the company: the website and price card, decks, battle cards, sales emails and call scripts, proposals and RFP responses, contracts and order forms, partner enablement for CAs and Tally partners, analyst and press briefings, support macros, and social posts. Extracts of this PRD shared outside the company are external artefacts — the counsel review called the PRD itself "the artefact most likely to be forwarded" (r5 counsel review).

#### The rules

| ID | Rule | Why | How a reviewer checks it |
| --- | --- | --- | --- |
| CLR-01 | Every competitor claim has a register entry: vendor, statement, claim class, evidence class, capture date, capture method, executed-or-declared label, evidence reference (EV-ID or research file), owner, expiry | Without the entry the claim cannot be re-verified or withdrawn | The artefact cites a register ID; the entry has no empty field |
| CLR-02 | Never assert that a competitor's page, documentation, data or product is "wrong", "false", "misleading" or "non-compliant". Describe what our product does and cite dated evidence | §04.4 AC-13; the disparagement exposure above | Search for the listed words next to a vendor name |
| CLR-03 | A negative claim is scoped to the artefact read ("the source trees read contain no …") or written as "we are not aware of any … as of <date>". Never "cannot", "does not support" or "has no" | Absence was read, not proven; unprovable negatives are a §23 item | Every negative claim names its artefact or its date |
| CLR-04 | Quote a vendor's own qualifier in full; never truncate it | The truncated Tally leave-encashment FAQ is the worked failure (§21.3) | Quotes match the capture verbatim, including the following sentence where it qualifies |
| CLR-05 | Prices come only from the vendor's own page — raw, rendered, and its config file where prices are injected — or, labelled "archived", from an archive of that page. State the normalisation: headcount, tier, billing cadence, ex-GST, list not realised. Never take a price from another vendor's comparison page. A claim that we are "cheaper" computes both monthly bills at the stated headcount from the dated cards and is made only where ours is lower (§04.4 AC-17) | Pocket HRMS's FAQ gives greytHR's entry price as ₹3,495 against greytHR's own ₹2,495 (r1/08; r5/03); list is not realised (§20 V-03) | The price cites its normalisation and capture; no third-party source |
| CLR-06 | Scope every claim to the set it was measured on. The seat-floor finding and the submission null are statements about the six-vendor priced set. Never generalise to "the market", "no one", "only us" or "first" | Per-user and per-employee structures exist outside the six (§21.4); the services layer files (§21.7) | No universal quantifier without a named set |
| CLR-07 | AI claims are claim posture only. Never state a competitor's AI capability or its absence as fact; never position on AI presence | EV-090 is claim posture, not tested | AI statements carry "as presented on <page>, <date>" |
| CLR-08 | Financial facts are filed figures with entity and period only — no evaluative adjectives ("barely", "burning", "loss-making giant") | The counsel review flagged characterisations of named private companies' financials (r5 counsel review) | Adjectives next to a financial figure are removed |
| CLR-09 | Customer counts appear only as "claims", with the capture date, and never as a share figure without that date | K-16; counts are inconsistent on the same vendor's own pages (EV-091; r5/03) | Count, "claims" and date travel together |
| CLR-10 | A claim is used externally only if its capture is younger than `competitor_claim_max_capture_age_days`, and it is re-captured before its first external use | Captures decay; pages change | The capture date is inside the window on the day of use |
| CLR-11 | When a source changes or a capture expires, the claim is withdrawn or re-cleared within `competitor_claim_withdrawal_window_days`, everywhere it appears | One register entry, many artefacts | The register lists every artefact carrying the claim |
| CLR-12 | Tally claims are framed as complementary — the layer we add, never "switch off Tally" | Channel conflict with Tally partners (§18.8) | Tally copy passes the §18.8 channel check |
| CLR-13 | Every claim carries legal clearance — through its class's counsel-cleared template or individually. Any claim that a competitor's output is legally deficient, and any comparative advertisement, is cleared by counsel individually before use | Legal claims are product surface with a named owner (§23) | Counsel's clearance is recorded on the entry |
| CLR-14 | An "observed in product" claim needs an execution record — build or tenant, date, steps, the person who ran it and the captured output — and still passes CLR-02 and CLR-03 | Executed evidence is stronger, not exempt | The record is attached to the entry |
| CLR-15 | The four unresolved cells (§21.3) are never stated in either direction until closed | EV-032 | No artefact asserts Tally ESS, Tally form currency, Frappe tax correctness or a Tally PT/LWF add-on |
| CLR-16 | Killed and banned figures never appear — the ~₹99 "Keka price", "Keka renews below list", the ₹45–50 ceiling, Frappe's state coverage | §20.4; EV-K20, EV-K28 | The §20.4 list is run against the artefact |

CLR-01 to CLR-16 govern what may be said. **CLR-17 onward extend the same numbering to the record the rules run on**, and are stated where they bite rather than gathered here: CLR-17 to CLR-21 with the parity row (§21.3), CLR-22 to CLR-24 with sales-sourced prices (§21.5), CLR-25 and CLR-26 with filing-depth placement (§21.7), CLR-27 and CLR-28 with AI claims (§21.9), CLR-29 and CLR-30 with the scenario record (§21.11), CLR-31 to CLR-36 with the competitive record itself (§21.16), CLR-37 to CLR-42 with the price-comparison engine (§21.17), CLR-43 and CLR-44 with set membership (§21.1), CLR-45 and CLR-46 with field reports (§21.13), and CLR-47 to CLR-49 with deal evidence (§21.19). They are one register, one numbering and one audit: a reviewer sampling published claims checks all forty-nine, not the first sixteen.

#### Claim classes

| Class | Example | Allowed evidence | Label it must carry | Clearance | Re-capture trigger |
| --- | --- | --- | --- | --- | --- |
| Price | "greytHR Essential is ₹2,495 a month including 50 employees" | The vendor's own page | "List price, ex-GST, captured <date>" | Claim owner, on the counsel-cleared template | Any change on the page; the capture window |
| Price structure | "None of the six vendors in our priced set bills below a 50-employee block on its published card" | The six rate cards | "Published cards, captured <date>" | Claim owner, on the counsel-cleared template | Any rate-card change among the six |
| Capability present | "TallyPrime ships Form 24Q annexures" | Product documentation | "Per TallyPrime documentation, read <date>" | Claim owner, on the counsel-cleared template | Each TallyPrime release |
| Capability absent | "The Frappe HR v16 source trees read contain no ECR generator" | Source repository | "Source read at tag <tag>, <date>" | Counsel, per instance | Each Frappe major release |
| Commercial terms | "Keka's terms of service, clause 15, say renewal fees are subject to an increase" | The vendor's terms | "Clause <n>, captured <date>" | Counsel, per instance | Any change to the terms |
| AI | "greytHR includes NAVOS in every plan" | Pricing or product page | "Claim posture, not tested, <date>" | Claim owner, on the counsel-cleared template | The capture window |
| Financial | A vendor's filed revenue | MCA/ROC filing or audited report | "Filed, <entity>, <period>" | Claim owner, on the counsel-cleared template | The next filing |
| Legal-comparative | "Vendor X's calendar shows the wrong due date" | — | Not permitted | — | — |

#### Worked examples

| Draft statement | Verdict | Cleared form |
| --- | --- | --- |
| "Frappe has no PT." | Fails CLR-03 | "The Frappe HR v16, ERPNext v16 and india-compliance source trees, read in September 2026, contain no state PT slab table. We ship and maintain one per state." |
| "Frappe's website is wrong about its state coverage." | Fails CLR-02 | Not said, in any form |
| "Tally can't calculate leave encashment." | Fails CLR-04 | "TallyPrime's FAQ says the leave-encashment amount cannot be calculated in its payroll module, and that an amount calculated outside payroll can be carried, with its PF, ESI and PT effects managed. We compute it from the leave ledger." |
| "Nobody else files your returns." | Fails CLR-06 | "No vendor in our six-vendor priced set claims, on its pages as read in September 2026, to submit a statutory return. We carry yours through attended, assisted submission under your written authority; the liability stays with you." — the second sentence only after counsel clears attended filing (§23) |
| "We're cheaper than greytHR." | Fails CLR-05 and §04.4 AC-17 — whether it is true depends on our unpublished card and the headcount; on §04.4's arithmetic a no-floor card anywhere in the ₹80–150 hypothesis undercuts greytHR's block only up to roughly 16–31 employees | "At 20 employees, greytHR's published Essential card (captured <date>) bills a base of ₹2,495 a month covering 50 employees; we bill your actual headcount." — usable only with our own card published |
| "Keka renews below list." | **[Killed]** (K-17) | Not said |
| "Keka has no AI." | Fails CLR-07 | Omit; if asked: "Keka's AI page showed a waitlist when we captured it on <date>." |
| "Zoho charges for salary payouts." | False for Zoho's HSBC route (r2/01) | "Zoho Payroll's free tier lists salary payments through HSBC; its statutory form generation is in the paid tier (captured <date>)." |
| "No HRMS bills from employee one." | Fails CLR-06 | "None of the six vendors in our priced set bills below a 50-employee block on its published card." |
| "greytHR has 34,000 customers." | **[Killed]** (K-16) — superseded and undated | "greytHR claims 30,000+ companies (captured <date>)." |
| "Keka is loss-making and burning cash." | Fails CLR-08 | Filed figures with entity and period, or omit |
| "Tally has no employee self-service." | Fails CLR-15 | Not said until the cell is closed |
| "Keka's price is ₹99 per employee." | Banned (§20.4) | Not said |
| "Keka's plans start at ₹6,999 for up to 78 employees." | Fails CLR-05 and CLR-22 — the block is unknown, and ₹6,999 ÷ ₹90 = 77.8 matches no round number | "Keka's small-companies page states 'from ₹6,999 per month' and 'starts at ₹90 per employee/month' (captured <date>). The number of employees ₹6,999 covers is not published." |
| "Qandle gives 25% off for annual billing." | Fails CLR-05 — the saving computed from the two published cards is 16.9% on the entry tier | "Qandle advertises 'Save upto 25 %'; on its published FOUNDATION cards the annual saving computes to 16.9% — ₹2,950 against ₹2,450, captured <date>." |
| "greytHR is ₹49.90 a head and we are cheaper." | Fails CLR-05 twice — a per-employee figure quoted without its headcount, and our card is unpublished | "greytHR Essential's published card bills ₹2,495 a month including 50 employees, monthly billing, ex-GST (captured <date>)." |
| "Tally's statutory forms are out of date." | Fails CLR-02 and CLR-15 — the currency cell is open | Not said, in any form |
| "Their AI ships next quarter." | Fails CLR-28 — a badge is not a date | Not said; if asked, the badge is described with its capture date |
| "We tested their product on a trial account." | Fails CLR-23 until counsel resolves the trial-account question (CQ-21) | Not said, and no such capture is taken |

#### The §18.11 battle cards, traced to their evidence

Every battle card in §18.11 rests on competitor facts held here. None may be used until each fact it carries has a register entry (CLR-01) and has cleared.

| §18.11 card | Competitor facts the response uses | Evidence | Claim classes | Open point before use |
| --- | --- | --- | --- | --- |
| "Kredily is free forever." | Free at unlimited headcount; payouts, PF/ESI challans, Form 12BB/124 and Form 16/130 are paid | EV-029; CAP-17 | Price; capability present | None beyond clearance |
| "Zoho does all this for ~₹2,000." | Zoho Payroll at 50 employees is about ₹2,000 a month at list (₹1,000 including 25, plus 25 × ₹40); calculation parity | r2/01; CAP-15 | Price | State the normalisation (annual billing, ex-GST) and, for multi-entity groups, the per-entity licence (CLR-05) |
| "Frappe is free and open-source." | Gross-to-net genuinely strong; statutory artefacts absent from the trees read | EV-031; CAP-18 | Capability present; capability absent | Negative claims need counsel (claim-class table); CQ-05 must be noted internally |
| "We already own Tally." | Tally ships the central artefacts; no state PT slab table, no LWF engine, no leave module | EV-032; CAP-21 | Capability present; capability absent | Frame as complementary (CLR-12); the currency cell stays silent (CLR-15) |
| "Keka starts at ₹90." | The small-companies floor; no live price on the pricing page; ₹349.95 effective at 20 employees | EV-021; EV-023; EV-027 | Price | State that the block behind ₹6,999 is unknown (CQ-01) |
| "Our CA already handles all this." | None — no competitor fact | — | — | — |

<!-- DIAGRAM: competitive-landscape-claim-clearance -->

#### The claim register — lifecycle

The register is the single place a claim is created, cleared, used and withdrawn. It is an internal operating record, not a product feature. Each entry moves through five states.

| From | Event | Guard | Side effect | Who may trigger |
| --- | --- | --- | --- | --- |
| — | Draft | Statement, vendor and intended artefact recorded | Entry created in DRAFT | Any author |
| DRAFT | Captured | Capture meets §02.5 and CLR-05; executed-or-declared label set | Evidence attached; state CAPTURED | Research |
| CAPTURED | Cleared | CLR-02 to CLR-09 and CLR-12 to CLR-16 pass; the instance fits a counsel-cleared template for its class, or counsel's individual clearance is recorded (always for CLR-13 and counsel-per-instance classes) | Expiry computed from `competitor_claim_max_capture_age_days`; state CLEARED | Named claim owner against a counsel-cleared template; counsel for everything else |
| CLEARED | Published | Capture still inside its window on the day of use | Artefact linked to the entry; state PUBLISHED | Author, with the owner's clearance on record |
| PUBLISHED | Source changed or expired | A watch alert (§21.11) or the expiry date | Every linked artefact flagged; state WITHDRAWN until re-cleared | Research, or automatically on expiry |
| WITHDRAWN | Re-cleared | Fresh capture; the rules re-run; the class template is still counsel-cleared, or counsel re-clears the instance | State CLEARED; artefacts may be re-published | Named claim owner, or counsel as on first clearance |

A claim is never deleted — a withdrawn claim and the reason it was withdrawn are kept, for the same reason the PRD keeps its [Killed] rows: so the claim cannot quietly return.

<!-- DIAGRAM: competitive-landscape-claim-register-states -->

Two states in the diagram are not in the table above and are added here because the register needs them to be honest. **REJECTED** records a statement that could not be captured or could not be phrased safely — kept so the same sentence is not re-drafted next quarter by someone who does not know it failed. **RETIRED** absorbs both rejected claims and claims whose underlying finding has been superseded or killed, which is where a withdrawn claim goes when no fresh capture can restore it. Neither state permits deletion: the register's value is that a killed claim leaves a trace, exactly as the [Killed] rows of this PRD do.

#### Who does what

The rule names roles, not people; §20 and the org plan (§22) assign the people. One person may hold two roles except where the table says otherwise — the same dual-control logic §02.5 applies to grading.

| Role | Responsibility | May not |
| --- | --- | --- |
| Author | Drafts the claim for a named artefact; links the artefact to the register entry | Clear their own claim |
| Capture researcher | Captures the source under §02.5 and CLR-05; sets the executed-or-declared label; runs the §21.11 watch | Clear a claim they captured |
| Claim owner | A named individual per claim class who applies CLR-02 to CLR-16 and clears or rejects instances against the class's counsel-cleared template | Clear an instance that fits no cleared template, or any counsel-per-instance class |
| Counsel | Clears the phrasing template for every claim class; clears individually every CLR-13 claim, every capability-absent and commercial-terms claim, and every instance outside a template; owns the comparative-advertising question (§23) | — |
| Auditor | Runs the periodic sample (`competitor_claim_audit_sample_size`) and reports gaps | Audit claims they authored or cleared |

#### Acceptance tests for the rule

- **Given** a battle-card row whose capture is older than `competitor_claim_max_capture_age_days`, **when** it is exported for a customer conversation, **then** the export is blocked and the row is routed for re-capture.
- **Given** a watch alert on a vendor page (§21.11), **when** it is triaged as a material change, **then** every published artefact carrying an affected claim is flagged within the withdrawal window, and the claim returns to WITHDRAWN.
- **Given** a draft containing "only", "no one", "first" or "the market" next to a competitor fact, **when** it is submitted for clearance, **then** it fails CLR-06 until the set is named.
- **Given** a comparative price, **when** it lacks headcount, tier, billing cadence, GST treatment or the list-versus-realised label, **then** it fails CLR-05.
- **Given** a claim in a class whose phrasing template counsel has not cleared, **when** a claim owner attempts to clear it, **then** the clearance is refused and the claim is routed to counsel individually.
- **Given** a periodic audit, **when** `competitor_claim_audit_sample_size` published claims are sampled, **then** each has a complete register entry and a capture inside its window.
- **Given** a parity row with a contested or unassessed cell, **when** an artefact asserts that capability in either direction, **then** clearance fails and names the cell (CLR-19).
- **Given** a competitor price whose source is a sales quote, **when** it is published without the word "quote", its date and its headcount, **then** it fails CLR-24.
- **Given** a scenario with no watch row, **when** the register is validated, **then** it is excluded from the wedge matrix until a detection method exists (CLR-29).
- **Given** a price comparison the engine refuses — unknown block, cadence mismatch, unit mismatch — **when** the artefact is rendered, **then** the refusal reason appears in the cell and no figure is shown anywhere for it (CLR-40).
- **Given** a competitor fact learned in a deal, **when** it appears in an external artefact without an independent capture, **then** publication is blocked (CLR-49).

### 21.13 Capture log and re-verification schedule

The capture log is the audit trail behind every competitor fact in this section. Each row names the artefact, the method that read it, the round and date, and what forces a re-read. "Declared" means pages, documentation or source read; no row is "observed in product".

| ID | What was captured | Vendor | Evidence | Artefact handle | Method | Captured | Status | Re-verify trigger |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| CAP-01 | Live pricing page — three commented price spans, zero live prices | Keka | EV-021 | keka.com/pricing | Raw fetch with comment-node scan | 5 Sep 2026 (r5); 4 Sep 2026 (r1) | Declared | Any change, hashed with and without comments |
| CAP-02 | Withdrawn India card and Hiring prices | Keka | EV-022 | Wayback snapshot of keka.com/pricing, 1 Aug 2024 | Archive, parsed | r5 | Declared, frozen | None — historical |
| CAP-03 | Small-business floor and FAQ | Keka | EV-023 | keka.com/small-companies | Raw fetch | 5 Sep 2026 | Declared | Any change |
| CAP-04 | US and UAE suppression and withdrawn cards | Keka | EV-024 | keka.com/us/pricing; keka.com/ae/pricing | Raw fetch | 5 Sep 2026 | Declared | Any change |
| CAP-05 | Setup-fee contradiction; terms clauses 1.7, 1.8, 3, 5, 15; deleted FAQ | Keka | EV-025 | keka.com/pricing; /small-companies; /terms-of-services; 2024 archive | Raw fetch; archive | 5 Sep 2026 | Declared | Any change to the terms or FAQ |
| CAP-06 | Suppressed feature blocks, including Direct Salary Payout | Keka | EV-028 | keka.com/pricing | Raw fetch with comment-boundary test | 5 Sep 2026 | Declared | Any change |
| CAP-07 | AI waitlist, badges, surfaces and governance commitments | Keka | EV-090 | keka.com/keka-ai | Raw fetch | 5 Sep 2026 (r5); Sep 2026 (r1) | Claim posture | Waitlist or badge change |
| CAP-08 | Rate card, add-on prices, NAVOS inclusion, customer claim | greytHR | EV-027; EV-090; EV-091 | greythr.com/pricing | Rendered read and raw fetch | 4 Sep 2026 (r1); 5 Sep 2026 (r5) | Declared | Any rate-card change; carry the customer-count date on every use |
| CAP-09 | Payroll-page statutory language | greytHR | EV-030 | greythr.com/payroll-software | Rendered read; term search | 5 Sep 2026 | Declared | Biannual; any change |
| CAP-10 | Alliance partner track; PSP landing page (a demo-capture page, r3/03) | greytHR | r3/03; r1/08 | Alliance-partner page data; PSP page | Raw page-data JSON | r3; 4 Sep 2026 (r1) | Declared | Biannual |
| CAP-11 | Four-tier card, monthly and annual; Remote Screen Tracking; unpriced advisory add-ons | Qandle | EV-027 | Qandle's pricing config script and transparent-pricing page | Config file, confirmed by a rendered read | 5 Sep 2026 | Declared | Config-file hash change |
| CAP-12 | Rate card, 50-employee minimum, implementation-fee FAQ | Pocket HRMS | EV-026; EV-027 | pockethrms.com/pricing | Raw fetch | 4 Sep 2026 (r1); 5 Sep 2026 (r5) | Declared | Any change |
| CAP-13 | Rate card, minimum billing, trial | Zimyo | EV-026; EV-027 | zimyo.com/pricing | Rendered read (HTTP 403 to non-browser fetch) | 4 Sep 2026 (r1); 5 Sep 2026 (r5) | Declared | Any change |
| CAP-14 | Rate card, lock-in and setup FAQ, startup programme | HROne | EV-026; EV-027 | hrone.cloud/pricing | Raw fetch | 4 Sep 2026 (r1); 5 Sep 2026 (r5) | Declared | Any change |
| CAP-15 | Payroll tiers, free-tier features, per-entity licensing | Zoho Payroll | EV-029; r2/01; r1/08 | zoho.com/in/payroll/pricing | Rendered read and raw fetch | 4 Sep 2026 (r1); r2 | Declared | Any change to the free ceiling or included seats (CRS-01) |
| CAP-16 | People tiers, free cap, Zia inclusion, implementation fees | Zoho People | r2/01; r1/08 | zoho.com/people/zohopeople-pricing.html; Zoho's pricing JSON | Rendered read; JSON | r2; 4 Sep 2026 (r1) | Declared | Any change |
| CAP-17 | Free and paid tiers and their paywall | Kredily | EV-029 | kredily.com/pricing | Raw fetch | 4 Sep 2026 (r1); r2; r3 | Declared | Any change |
| CAP-18 | India payroll layer, state names, statutory artefacts | Frappe HR / ERPNext | EV-031 | frappe/hrms at version-16 (tag v16.17.1); frappe/erpnext version-16; resilient-tech/india-compliance | Source read and word-boundary search | r3 (Sep 2026) | Declared | Each Frappe major release |
| CAP-19 | "India Payroll Version 16" product page | Frappe | r2/01 | frappe.io/hr/india-payroll | Rendered read | r2 | Declared; unreconciled (CQ-05) | Before any use; on CQ-05 |
| CAP-20 | Cloud hosting prices, per site | Frappe | r2/01 | frappe.io/hr/pricing | Rendered read | r2 | Declared | Before any use |
| CAP-21 | PT pay head, statutory pay types, statutory reports, income-tax reports, FAQ, ECR, declarations, cloud access, integration | TallyPrime | EV-032 | help.tallysolutions.com (named pages) | Documentation read — never a search summary | r3; r5 | Declared | Each TallyPrime release |
| CAP-22 | Silver and Gold prices | TallyPrime | r3/01 | tallysolutions.com/buy-tally | Page read | r3 | Declared | Any change |
| CAP-23 | Five TDL catalogues — no payroll, PT or LWF add-on | Tally ecosystem | EV-032 | TallyShop; a 5-Star partner list; three independent catalogues | Catalogue read; site search | r5 | Declared, null | A named product (CRS-08) |
| CAP-24 | HR & Payroll and India revenue; single operating segment | Ramco | EV-033; EV-092 | Audited annual report FY2025-26 | PDF text extraction | r5 | Declared | Next annual report |
| CAP-25 | No price; enterprise positioning | ZingHR | EV-033 | zinghr.com | Raw fetch; pricing URL status | r5 | Declared | Biannual |
| CAP-26 | Acquisition of Qandle; Qandle footer | MYND / Qandle | EV-034 | MYND announcement dated 17 Apr 2025; trade press; qandle.com | Page read | r5 | Declared, event | None — frozen; watch CRS-07 |
| CAP-27 | Rate cards outside the six — factoHR, RazorpayX Payroll, 247HRM, sumHR | Various | r1/08 | Vendor pricing pages | Raw fetch | 4 Sep 2026 (r1) only | Declared, round one | Re-capture before any use (CQ-15, CQ-17) |
| CAP-28 | AI posture — NAVOS, Zia, One AI, Cortex, others | Various | EV-090; r1/04 | Press releases, changelogs, product pages | Page read | Sep 2026 (r1) | Claim posture | Biannual; CRS-04 |

**Schedule.** Three kinds of re-read, in order of precedence. A **forced re-read** happens before any first external use of a claim (CLR-10) and on any watch alert (§21.11). An **event re-read** happens on the triggers in the register — each Frappe major release (EV-031), each TallyPrime release (EV-032), each vendor rate-card change (EV-026, EV-027). A **cadence re-read** sweeps the whole set every `competitive_recapture_cadence_days`, with the EV register's biannual floor for EV-027, EV-030 and EV-090, and asks the standing completeness question — "which vendor has never been searched?" — that found greytHR missing from the mid-market dimension in round five (r5/03).

**Method rules for competitive captures,** on top of §02.5's dual capture: record the fetch tool and network with the capture, because rounds one to four mistook one tool's TLS failure for a site property (EV-K21); treat a page that shows different prices to two captures as a finding, not a tie to break (§02.5); never quote unrendered config values as prices (r5/03); and for any vendor whose material changes happen in HTML comments, keep the comment-included raw page as the evidential copy.

#### Known failure modes of competitive research, and the control for each

Every control in this section exists because something went wrong in a research round and was caught. Assembling them makes the method auditable and tells the next capture operator what to expect. Each row names where it bit, what detected it, and the rule that now prevents it.

| # | Failure mode | Where it bit | What detected it | The control now | Rule |
| --- | --- | --- | --- | --- | --- |
| M-01 | A tool failure read as a property of the site | "keka.com is TLS-blocked, so its prices are unverifiable" — rounds one to four | A plain fetch returned HTTP 200 on every Keka page (r5/03) | Record the fetch tool and the network with every capture; a claim about a site's reachability needs two tools | §21.13 method rules; EV-K21 |
| M-02 | A rendered read missing comment-suppressed content | Keka's entire rate card, invisible to a browser | A raw fetch with a comment-node scan found three price spans (EV-021) | Comment-bearing artefacts are captured raw, with both hashes | CLR-05 |
| M-03 | A raw fetch missing JavaScript-injected content | Qandle's whole card — raw HTML shows empty spans | A rendered read, then the vendor's own config file (r5/03) | JS-injected prices are read from the vendor's config file and confirmed by rendering | CLR-05 |
| M-04 | A fabricated verbatim quote from a summarising fetch tool | Qandle's "`__/mo`" placeholder, which appears zero times in the page | Re-derivation against the retrieved page (r5/03) | Every verbatim quote is re-derived from the retained evidence copy; a quote that cannot be reproduced is struck, not softened | §02.5; CLR-04 |
| M-05 | A search-engine summary contradicting the vendor's own page | "Tally lets you choose the state and slab for PT" — the help page says the opposite | Reading the help page itself (r5/01) | Documentation is read at the vendor's own help domain; a search summary is never a capture | CLR-05; §21.3 |
| M-06 | A truncated quote reversing the meaning | TallyPrime's leave-encashment FAQ, cut after its first sentence | The second sentence, read in full (r3/01) | Quote the qualifier in the same breath or not at all | CLR-04 |
| M-07 | A competitor-cited price used as fact | Pocket HRMS gives greytHR's entry price as ₹3,495; greytHR publishes ₹2,495 | Reading greytHR's own page (r1/08; r5/03) | Prices come only from the vendor's own page, its config file or an archive of that page | CLR-05 |
| M-08 | A plain string search across a comment boundary | "Direct Salary Payout" present on both the 2024 and 2026 Keka pages — and commented out on one | The comment-boundary test (r5/03) | A string search is not a capture method for comment-bearing artefacts; the boundary test is | CLR-05; EV-028 |
| M-09 | A vendor missing from one research dimension | greytHR — the largest by claimed customer count — absent from the mid-market pricing dimension until round five | A competitor's own FAQ named it (r5/03) | Completeness is asked per dimension, and "which vendor has never been searched?" is a standing question on every sweep | §21.1; §21.13 |
| M-10 | Marketing counts read as a time series | Keka's 10,000+ and 12,500+, live on the same day | Reading the sign-up page the pricing page links to (r5/03) | A count travels with "claims" and its capture date, and never becomes a growth reading | CLR-09; K-16 |
| M-11 | Unrendered configuration values quoted as prices | Qandle's config holds module values and an unused string that never render | Comparing the config against the rendered page (r5/03) | Such values are stored with the status `unrendered_config_value` and are barred from every computation and quote | CLR-37 |
| M-12 | A round-one capture carried forward untouched | factoHR, RazorpayX Payroll, 247HRM and sumHR — captured 4 September 2026 and never re-checked | The round tag on the capture | Every capture carries its round; a round-one-only capture is re-captured before first external use | CQ-15, CQ-17; §02.3 |
| M-13 | A prior round's conclusion adopted without re-derivation | "Frappe ships PT for 15+ states and LWF for 14", taken from a product page | The source trees, read at a stable tag (EV-031) | The source read governs; the unreconciled product-page reading is recorded as an open question, not silently dropped | K-01; CQ-05 |

The pattern across thirteen rows is one lesson: **the method fails in opposite directions on different vendors**, so no single capture method is trusted anywhere. Rendering hides Keka's card; raw fetch hides Qandle's. That is why the record stores a method per artefact type rather than a house style (§21.16).

#### Capture staleness and the precedence of re-reads

| Capture state | May this PRD rely on it? | May an external artefact? | Required action |
| --- | --- | --- | --- |
| Inside `competitor_claim_max_capture_age_days`, no alert | Yes | Yes, once cleared | None |
| Past the age window, no known change | Yes, with the age shown beside the figure | No — export blocked, not warned | Re-capture before use |
| `stale_release` — a comparator has shipped since the read | Yes, flagged, for rows the release cannot touch | No, for every row the release could touch | Run the §21.3 recipe inside `parity_row_reverify_grace_days` |
| Superseded by a newer capture of the same artefact | No — the newer capture governs | Newer only | Keep both; the older one is history, not evidence |
| Frozen archive snapshot | Yes, as history | Yes, labelled archived with its snapshot date | Never re-captured; never presented as current |
| Round-one only, never re-checked | Yes, with the §02.3 reliability discount and the round tag | No | Re-capture (CQ-15, CQ-17) |
| Contradicted by a second capture the same day | Yes, as a finding — both readings are kept | No | Record the contradiction; do not pick a winner |
| Sales quote | Yes, for the structural question it answers | Only as "a quote obtained on <date> at <headcount>" | CLR-22 to CLR-24 |

Precedence when two of these apply at once: a **forced** re-read (first external use, or a watch alert) outranks an **event** re-read (a release or a card change), which outranks the **cadence** sweep. A capture may therefore be taken three times in a quarter for different reasons, and each is a separate row in the log — the log records reads, not opinions about whether a read was necessary.

#### Field reports — intake for competitor facts heard rather than read

Most competitor facts reach a company through a sales call, not a research sweep: a prospect repeats a quote, a partner mentions a feature, a lost deal cites a capability. Today that traffic has no path into the record, which means it either evaporates or leaks into a deck unverified. Both are failures. A field report is a **trigger for a capture, never a claim**, and this is the intake that keeps it that way.

| Field | Rule |
| --- | --- |
| `reporter`, `date`, `context` | Who heard it, when, and in what conversation |
| `vendor_key` | The vendor named; if the vendor is not in the record, a row is created as `out_of_set` pending a capture (CLR-44) |
| `verbatim_as_heard` | What was said, as close to verbatim as the reporter can give, marked as reported speech |
| `class` | `price_quote`, `capability`, `terms`, `service_experience`, `roadmap`, `other` |
| `checkable_against` | The artefact that would confirm or refute it — a pricing page, a help page, a repository, a terms document. A report with no checkable artefact is recorded and closed as uncheckable |
| `status` | `received`, `capture_queued`, `confirmed`, `refuted`, `uncheckable` |
| `resulting_capture_id` | Populated when a capture is taken |

**Rules that make the intake safe.**

1. **A field report never becomes a claim.** It may raise an alert, queue a capture or open a question. The claim, if any, rests on the capture that follows, with that capture's date and method — never on the report.
2. **A rumour does not re-run a sweep.** If a prospect names a Tally add-on for PT or LWF, that named product is verified directly; the five-catalogue sweep is not repeated on an unnamed report (r5/01, CRS-08). The same rule applies to "someone said vendor X files for them" — the trigger is the artefact, not the anecdote.
3. **Service-experience reports are recorded and never repeated.** A prospect's account of a competitor's support, implementation or outage is stored for our own product learning and is barred from every external artefact — it is the fastest route to the disparagement exposure counsel flagged (CLR-02, CLR-08).
4. **A price heard in the field is not a quote.** Only an intake meeting CLR-22, with the artefact attached, is evidence. A remembered number is `uncheckable` unless the prospect shares the document.
5. **Refuted reports are kept.** The same claim will be heard again; the record should already know it was checked and refuted, and on what date.

| ID | Requirement | Acceptance criterion |
| --- | --- | --- |
| CLR-45 | A field report may trigger a capture, an alert or an open question, and may never be cited as evidence for a claim | Given a claim whose `evidence_ref` points at a field report, when it is validated, then it fails and the capture it needs is queued |
| CLR-46 | Service-experience reports about a named competitor are stored internally and are excluded from every external artefact by class, not by review judgement | Given an export of competitor material, when it contains a `service_experience` field report, then the export is blocked |

### 21.14 Open competitive questions and the parameters routed to §20

None of these blocks the v1 build. Each changes what sales may say, the priority of an importer, or the size of a wedge. Methods are desk work or sales conversations unless stated; the owner column names a function, and §20 assigns people, cost and elapsed time. §20 registers CQ-01 to CQ-20 as V-28 (CQ-08 as V-02; CQ-12 and CQ-14 as build and partnership decisions), and the parameters below in §20.13. **CQ-21 to CQ-24 are new with this revision** and are routed the same way, with CQ-21 also entering §23's counsel register — it gates the trial-account and quote-seeking methods that three of the earlier questions assume.

| ID | Question | Why it matters | Method | Owner | What changes with the answer | §20 routing |
| --- | --- | --- | --- | --- | --- | --- |
| CQ-01 | What employee block does Keka's live ₹6,999 floor buy? | Precision of every Keka comparison at small headcounts | A sales quote — the plan links lead to a demo form (r5/03) | GTM | The Keka row of §21.4 | Commercial validation |
| CQ-02 | What is Keka's setup or implementation fee? | The all-in comparison | A sales quote | GTM | §21.5 terms table | Commercial validation |
| CQ-03 | When did Keka suppress its prices? | Dates the move to a sales-qualified motion | Archive snapshots on any locale — the change was global (r5/03) | Research | The Keka evidence timeline | Desk, now |
| CQ-04 | Is Keka moving India to per-employee pricing; are its AI surfaces generally available; what are its current Hiring and project-module prices? | CRS-03, CRS-04 | Watch captures; a demo | Research / GTM | §21.5; the §21.11 matrix | Desk and commercial |
| CQ-05 | What does Frappe's "India Payroll Version 16" product page describe — an artefact outside the three trees read, or copy ahead of code? | The only open item on K-01's evidence; decides CRS-09 | Follow the page's install path; search the app marketplace; read any named repository at its stable tag | Research | If code exists, PAR-10/15/17/19 move toward parity against Frappe and the pitch becomes maintenance and submission | Desk, now |
| CQ-06 | What does a Frappe partner charge to build and then maintain the Indian statutory layer? | That, not the ₹0 licence, is the real competing price (r3/01) | Partner interviews | GTM | The Frappe row of §18.1 | Commercial validation |
| CQ-07 | Does any India HRMS actually submit returns, or do all stop at generation? | Decides whether attended submission is unmatched in product or only in positioning (r5/03) | Product documentation and trial tenants for greytHR, Zoho Payroll and Keka | Research | EV-030's scope; CRS-06 | Desk and trial, now |
| CQ-08 | What share of Tally businesses run Tally payroll? | Which job-1 displacement argument and importer lead | §20 V-02 | GTM | §21.2 decision table; importer priority | Existing — V-02 |
| CQ-09 | What does Zoho Payroll's "Form 130 generation" do in the product, and how does per-entity licensing change a multi-entity comparison? | The Zoho parity line; CRS-02 | Zoho documentation; a trial | Research | §21.6 | Desk |
| CQ-10 | The four unresolved cells — Tally ESS; Frappe's income-tax engine; Tally's form currency; a Tally PT/LWF add-on | EV-032 | As set out in §21.3 | Research / statutory engineering | The parity table's four cells | Desk and trial |
| CQ-11 | What does greytHR's "FLEXIBLE START" cost, and does it break the 50-seat floor? | CRS-10 against the HRMS-job incumbent | A sales conversation | GTM | §21.4 floor table | Commercial validation |
| CQ-12 | Where does the greytHR importer sit in the named-source sequence? | §16.7 now names a greytHR export importer and sequences it after Tally; §01 shifts priority toward greytHR if Tally payroll adoption is low | Decide after CQ-08 | Product | §16.7 importer sequence | Build planning |
| CQ-13 | Are the mid-market vendors' AI features generally available in product? | §21.9 is claim posture only | Trial tenants | Research | §21.9 | Desk and trial |
| CQ-14 | Does Simpliance expose a usable API for a third-party HRMS? | Decides whether Aparajitha is a partner (r2/07) | Partner conversation | Founder | §21.10 services table | Partnership |
| CQ-15 | Does factoHR still publish a free tier to 20 employees, and what does it include? | §18.4 and CRS-12 rest on a round-one capture that no later round re-checked | Re-capture | Research | §18.4's combination-at-the-line wording; the §21.4 wider-field table; CRS-12 | Desk, now |
| CQ-16 | Is the vendor set complete? HR add-ons for SAP Business One, Microsoft Dynamics, Busy and Marg were never researched (r2/01) | Busy and Marg have deep Indian SMB accounting penetration; a bundled payroll module would change the job-1 picture | A desk sweep under §02.5 | Research | §21.1 register; §21.2 | Desk, now |
| CQ-17 | Current cards for RazorpayX Payroll, sumHR and 247HRM, and sumHR's minimum | Round-one captures only | Re-capture | Research | §21.4 wider-field table | Desk |
| CQ-18 | Kredily's free-to-paid conversion and financial position | Whether ₹0 is a durable anchor or a temporary land-grab (r2/01) | MCA filings | Research | §21.6 | Desk |
| CQ-19 | Jupiter's consideration for sumHR, the deal date (2022 or February 2023 — r1/01 and r2/02 disagree), and whether the salary-account attach worked | Calibrates CRS-05 (r2/02) | MCA filings; trade press | Research | CRS-05 | Desk |
| CQ-20 | What is the Income-tax Act 2025 successor of Form 27A, if any? | PAR-22 cannot be written in both vocabularies until it is known; the CBDT mapping held in evidence does not list it (EV-050) | Read the CBDT form mapping and the Form 138 file specification; the corrigendum check under §02.4 | Research / statutory engineering | PAR-22's form name; §08.8's artefact label | Desk, now |
| CQ-21 | Do the vendors' terms permit a competitor to open a trial account or request a quote, and what is counsel's position on evidence obtained that way? | CQ-07, CQ-10 and CQ-13 all propose trial tenants and CQ-01 and CQ-02 propose quotes; none of those methods exists until this is answered | Read each vendor's terms; counsel opinion | Counsel, with Research | Whether the trial-and-quote method is available at all; if it is not, the submission null keeps its documentation-and-tenant limit permanently | §23 counsel register; §20 desk |
| CQ-22 | Does greytHR publish an annual billing cadence, and at what discount? | The most-used comparison in this section sets greytHR's monthly card against Qandle's annual card, which is a cadence mismatch (§21.17 N2) | Re-capture the pricing page including any cadence toggle | Research | The value-floor anchor and every greytHR crossover cell | Desk, now |
| CQ-23 | What do the 2025-Act vocabulary searches return in the Frappe HR v16 tree — 138, 130, 124, 123? | Round three searched only the 1961-Act names, and PAR-19 to PAR-23 rest on that single-vocabulary search (EV-050) | Re-run the §21.3 recipe with the successor form numbers | Research | The Frappe cells of PAR-19 to PAR-23; nothing if the result is unchanged | Desk, now |
| CQ-24 | What do the six priced vendors charge for an additional legal entity, registration or state? | Our dominant cost line scales per registration while revenue scales per employee (EV-088), and only Zoho's per-entity licence is in the evidence | Re-capture the six cards and their FAQs for multi-entity terms | Research | §18.3's registration allowance; the §21.17 W-1 comparison | Desk |

#### Parameters this section introduces

Every parameter is unsized. None may be given a value in this document; §20 sizes each and records who set it and why.

| Parameter | Governs | Used in |
| --- | --- | --- |
| `competitor_claim_max_capture_age_days` | The oldest capture a claim may rely on when it is used externally | CLR-10; claim-register lifecycle |
| `competitor_claim_withdrawal_window_days` | How quickly a claim is withdrawn everywhere after its source changes or its capture expires | CLR-11; claim-register lifecycle |
| `competitive_recapture_cadence_days` | The whole-set re-sweep interval, subject to the EV register's biannual floor | §21.13 schedule |
| `competitive_alert_triage_days` | How quickly a watch alert is triaged | §21.11 watch |
| `competitor_claim_audit_sample_size` | How many published claims a periodic audit samples | §21.12 acceptance tests |
| `parity_row_reverify_grace_days` | How long a parity cell may stand after a comparator release before claims resting on it are blocked | CLR-20; the §21.3 transition table |
| `sales_quote_max_age_days` | The oldest sales-sourced price a structural statement may rest on | CLR-22; §21.5 |
| `price_model_classification_tolerance_inr` | The rupee tolerance inside which a base counts as equal to block seats × marginal rate | §21.17 model classification |
| `price_comparison_default_headcounts` | The headcount set every published comparison is computed at, so two artefacts never quote different points | §21.17 output contract |
| `competitive_fixture_refresh_days` | How often the golden capture corpus is refreshed against the live artefacts | §21.18 |
| `claim_register_retention_years` | How long withdrawn, rejected and retired register entries are kept | §21.16 record rules |
| `competitive_outcome_min_n_for_reranking` | The number of closed opportunities required before deal evidence re-ranks the wedges | §21.19 wedge review |
| `field_report_capture_queue_days` | How quickly a checkable field report becomes a queued capture | CLR-45; §21.13 |

#### Owners for the §21 parameters

§20 sizes each parameter; this table says who owns the number, because an unowned parameter is how a control quietly becomes a default.

| Parameter | Owner | Why that owner |
| --- | --- | --- |
| `competitor_claim_max_capture_age_days` | GTM, with counsel's concurrence | It bounds what may be said outside the company |
| `competitor_claim_withdrawal_window_days` | GTM | It is a commitment about pulling live collateral |
| `competitive_recapture_cadence_days` | Research | It sizes the capture workload |
| `competitive_alert_triage_days` | Research | It sizes the watch |
| `competitor_claim_audit_sample_size` | Auditor role (§21.12), reporting to the founder | The auditor must not be the claim owner |
| `parity_row_reverify_grace_days` | Research | It follows comparator release cadence |
| `sales_quote_max_age_days` | GTM | Quotes are obtained by GTM |
| `price_model_classification_tolerance_inr` | Research | It is a property of the evidence, not of the pitch |
| `price_comparison_default_headcounts` | GTM | It is what a published comparison shows |
| `competitive_fixture_refresh_days` | Research | It keeps the test corpus honest |
| `claim_register_retention_years` | Counsel | Retention of a legal-clearance record is a counsel question |
| `competitive_outcome_min_n_for_reranking` | Founder | Re-ranking the wedges is a positioning decision, not a research one |
| `field_report_capture_queue_days` | Research | It sizes the intake queue |

### 21.15 What this section commits other sections to

A competitive record is only useful if it changes what gets built and said. Each finding below has an owning section and a concrete consequence there; this section states the finding and its evidence, the owning section states the requirement. Where the owning section's current text and the finding diverge, the divergence is listed as open rather than silently resolved.

| §21 finding | Owning section | What it requires there | Evidence | Status |
| --- | --- | --- | --- | --- |
| Multi-state PT and LWF is greenfield in both parity comparators (PAR-15, PAR-17) | §06, §14, §22 | The gazette-sourced per-state dataset and the pipeline that maintains it; jurisdiction on the work location | EV-031; EV-032; EV-015 | Consistent |
| State PT or LWF is *claimed* by greytHR (PT), Zoho Payroll (PT and LWF) and Keka (LWF reports) | §01, §04, §18 | "Greenfield" used only about Frappe and Tally; the SaaS-field argument is maintenance, scoping and submission | r5/03; r2/01 | Open — several sections write "both incumbents" without naming them |
| The bake-off will not be won on gross-to-net | §08 | Credible parity on salary mechanics, not investment beyond it | EV-031 | Consistent |
| The central artefact set is parity with Tally | §08 | File-level parity is table stakes, not differentiation | EV-032 | Consistent |
| No seat floor — scoped to the six-vendor priced set | §18.2 P6 | Claim wording per CLR-06 | EV-026 | Consistent |
| factoHR's round-one free tier to 20 employees | §18.4 | State that the EPF-line gate is not unique and claim only the combination at that line | r1/08 | Consistent — §18.4 records it; re-capture owed (CQ-15) |
| No vendor in the six claims to submit | §19, §22 | The attended-filing operation and a published, measured on-time acceptance metric | EV-030 | Consistent |
| Filing done by people runs at services margins | §13, §22 | The supervised-minutes automation target | EV-088; r2/07 | Consistent |
| Keka's five AI governance commitments are table stakes | §12 | Match all five | EV-090 | Consistent |
| Salary payout is bank-specific across the field; Keka suppressed its wallet payout | §16.3 | File-first, bank-neutral payout templates | EV-028; r3/03; r2/01 | Consistent |
| Zoho licenses payroll per legal entity | §18.3 | Evidence that a registration-shaped price line is market-acceptable | r1/08 | Consistent |
| The HRMS-job incumbent needs a migration path | §16.7 | A greytHR export importer, with its place in the sequence revisited after §20 V-02 | K-23 | Consistent — named in §16.7; sequence open (CQ-12) |
| Payroll sits in every entry tier | §18.4 | Payroll never an upsell | EV-028 | Consistent |
| Implementation fees are the hidden line | §18.13 | ₹0 setup by default | r1/08; EV-025 | Consistent |
| Zoho's free tier includes the investment-proof workflow and HSBC payouts | §07.5 | Read Zoho's position against §21.6 before calling the declaration workflow a paid output across the freemium players | r2/01; EV-029 | Open |
| Every competitor claim clears §21.12 | §01, §02.5, §04.4, §18, §23 | One rule, one register | r5 counsel review | Consistent |
| Location tracking is monetisable, and legally unexamined | §18.5, §23 | A proportionality view before the add-on is offered | r5/03; r5 counsel review | Open |
| The CA console is contested — Kredily's CA programme and greytHR's PSP tooling are multi-client consoles | §18.7, §20.8 | Position the console on the submission it carries, not on its existence; R-1's "Zoho does not sell" is true only of Zoho | r3/03; r1/08 | Open |
| The competitive record is data, not a document | §18.12, §02.5 | Every derived comparison table is generated from the register's price points, never hand-maintained (CLR-32) | §21.16; §21.17 | New |
| The price engine refuses rather than estimates | §18.12 | A refused cell carries its reason code and its open question in the cell, never a blank (CLR-40) | §21.17 | New |
| No vendor in the evidence prices a state or a statutory registration | §18.3 | The registration allowance is justified from our cost structure with Zoho's per-entity licence as the nearest analogue, and never as a market convention | r1/08; EV-088 | New |
| Deal evidence never becomes a competitor claim | §19, §20 | §19 defines any metric computed from competitive-outcome rows; §20 owns realised price (V-03); this section owns the taxonomy | §21.19 | New |
| The trial-account and quote-seeking method is legally unresolved | §20, §23 | CQ-07, CQ-10 and CQ-13 cannot proceed until CQ-21 is answered; until then the submission null keeps its documentation-and-tenant limit | CLR-23 | Open |
| Two scenarios have no §20.8 risk row yet | §20.8 | CRS-13 and CRS-14 routed for registration with CQ-16 and CQ-14 | §21.11 | Open |

### 21.16 The competitive record as data

§21.15 closes the outward-facing argument. This subsection and the three that follow are the operating specification behind it: the record that holds every fact above, the engine that computes every price in §21.4, and the tests that prove both. They are written for the team that builds and runs the register, and they are the reason the section's claims can be withdrawn in a day rather than hunted through a drive.

**Scope, and what this is not.** The competitive record is an **internal operating store**. It holds no employee, candidate or tenant data, it is not part of the product, and none of it belongs in the product data model — §14 owns that, and the two must not be merged because their retention, access and erasure rules are different. The runbooks that operate the compliance function are §22's; this store is the research function's. What it does hold is public artefacts we have read, our readings of them, and the claims we have built on those readings.

**Why a record and not a document.** Five properties are impossible in prose and cheap in data: a claim that **expires** on a date; a source change that **fans out** to every artefact carrying an affected claim; completeness asked **per research dimension** rather than per vendor; **re-verification triggers** that fire on a release rather than on a memory; and an **audit** that samples published claims and checks each has a complete entry. Every one of those is a rule in §21.12 that cannot be enforced against a document.

<!-- DIAGRAM: competitive-landscape-record-erd -->

#### VENDOR

One row per entity the research has examined, in the set or out of it. The §21.1 register is this table rendered.

| Field | Type | Rule |
| --- | --- | --- |
| `vendor_key` | slug, primary key | Immutable and never reused. Survives acquisition and rename — Qandle keeps its key under MYND ownership (EV-034) |
| `display_name` | text | As the vendor writes it today |
| `class_set` | set of enum | A vendor may hold two classes. TallyPrime is `incumbent` and `parity_comparator`; greytHR is `incumbent` and `priced_set` |
| `primary_class` | enum | The class that governs which findings are scoped to it. EV-026 and EV-027 are scoped to `priced_set` members only |
| `in_competitive_set` | boolean | False for enterprise adjacency and the services layer; a false row still carries evidence and is still watched |
| `why` | text | The reason for the class, with its evidence — an entity is never in or out by assertion |
| `dimensions_searched` | set | Which research dimensions have searched for this vendor. greytHR was present in the market dimension and absent from the mid-market pricing dimension in the same round (r1/08; r5/03), which is why completeness is a per-dimension property |
| `ownership` | text with date | Recorded when it changes the reading — Qandle inside MYND from 17 April 2025; sumHR inside Jupiter, with the deal date unsettled (CQ-19) |
| `watch_owner` | role | The person accountable for this vendor's alerts |

**Rules.** A class change is an event, not an edit: it is recorded with its evidence and it re-opens every claim scoped to the old class. Adding a vendor to `priced_set` re-scopes EV-026 and EV-027 and forces both tables to be recomputed — which is exactly what adding greytHR did in round five, strengthening the seat-floor finding from five of five to six of six and refuting "Qandle is the price floor" in the same move.

#### ARTEFACT

One row per readable thing a vendor publishes or ships. The artefact, not the vendor, carries the capture method — because the method is a property of how that artefact is built.

| Field | Type | Rule |
| --- | --- | --- |
| `artefact_id` | identifier | — |
| `vendor_key` | foreign key | — |
| `handle` | text | A URL, a repository at a tag, an archive snapshot URL with its date, or a document title with its publication date |
| `artefact_type` | enum | `pricing_page`, `product_page`, `docs_page`, `terms`, `faq`, `repo_tree`, `config_file`, `archive_snapshot`, `filing_pdf`, `press_release`, `changelog`, `catalogue`, `sales_quote` |
| `locale` | text | Keka's suppression was established as global only because India, US and UAE pages are three artefacts, not one (EV-024) |
| `requires_render` | boolean | True where prices are injected client-side |
| `comment_bearing` | boolean | True where material content lives in HTML comments — the Keka pricing pages |
| `blocks_nonbrowser_fetch` | boolean | True for Zimyo, which returns HTTP 403 to a non-browser fetch |
| `price_source_of_record` | boolean | True for the one artefact that governs a vendor's prices — Qandle's config file, not its rendered page |
| `login_required` | boolean | If true, no capture is taken until CLR-23's counsel question is cleared |
| `default_method` | enum | The capture method this artefact type requires, so an operator cannot pick the wrong one by habit |

**Rules.** An artefact whose `comment_bearing` flag is true is captured raw with a comment-node scan and stored with both hashes; an artefact whose `requires_render` flag is true is captured rendered *and*, where a config file exists, from the config file. The two flags are not mutually exclusive and neither implies the other — the field pair exists because the two failure modes are opposite (M-02, M-03).

#### CAPTURE

One row per read. A capture is never overwritten; a new read is a new row.

| Field | Type | Rule |
| --- | --- | --- |
| `capture_id` | identifier | — |
| `artefact_id` | foreign key | — |
| `method` | enum | `raw_fetch`, `raw_fetch_comment_scan`, `rendered_read`, `config_file_read`, `archive_fetch`, `source_read`, `pdf_extract`, `catalogue_read`, `term_search`, `sales_quote_intake`. A search-engine summary is not a value and cannot be entered |
| `tool`, `network` | text | Mandatory. The one control that would have prevented four rounds of "Keka is TLS-blocked" (M-01) |
| `captured_at` | date | — |
| `round` | text | `r1`…`r5` or a later capture cycle. Drives the §02.3 reliability discount |
| `bytes` | integer | Recorded for raw fetches; a large change in size is itself a signal |
| `hash_with_comments`, `hash_without_comments` | hash | Both mandatory for comment-bearing artefacts; the pair is what the watch diffs |
| `posture` | enum | `declared`, `observed_in_product`, `claim_posture`, `frozen`. No capture in this revision is `observed_in_product` |
| `operator` | person | The capture researcher; may not clear claims from their own capture |
| `evidence_copy_ref` | pointer | The retained copy. For comment-bearing artefacts the retained copy is the comment-included raw page |
| `verbatim_quotes` | list | Each quote stored with its byte offset or clause number where the artefact supports one, so it can be re-derived (M-04) |
| `contradicts` | list of capture IDs | Same-day contradictions are a finding, recorded on both rows, never resolved by preference |

#### PRICE_POINT

One row per published price, per plan, per cadence. A four-tier card on two cadences is eight rows.

| Field | Type | Rule |
| --- | --- | --- |
| `price_id` | identifier | — |
| `vendor_key`, `plan_name`, `tier_rank` | — | `tier_rank` orders tiers so "entry tier" is computed, not asserted (EV-028) |
| `model` | enum | `flat_with_minimum`, `base_plus_overage`, `per_user_min_billing`, `per_employee_no_block`, `free_to_n`, `block_unknown`, `quote_only`. Classified by the test in §21.17, never by the vendor's own words |
| `base_amount_inr`, `block_seats`, `marginal_rate_inr` | integer | Null is a meaningful value: Keka's live floor has a base and a marginal rate and a null block, which is why it computes at 20 employees and refuses at 35 |
| `unit` | enum | `employee`, `user`, `recruiter`, `licence`, `tracked_user`. A per-recruiter or per-licence add-on is never folded into a per-employee comparison |
| `cadence` | enum | `monthly`, `annual`, `quarterly`. Three cadences exist in the field (§21.4) |
| `tax_treatment` | enum | `ex_gst`, `incl_gst`, `unstated`. `unstated` is the common case and must be carried, not assumed |
| `entity_scope` | enum | `tenant` or `per_legal_entity`. Zoho Payroll is `per_legal_entity`; the field exists because that multiplies the bill (§21.6) |
| `plan_status` | enum | `live`, `archived_withdrawn`, `suppressed_in_comment`, `unrendered_config_value`, `quote_only` |
| `capture_id` | foreign key | — |

**Rules.** `unrendered_config_value` rows are stored — because knowing they exist is what stops someone "discovering" them later — and are barred from every computation and every quote. `suppressed_in_comment` rows are usable as a dated finding about the page, never as a current price. `archived_withdrawn` rows carry their snapshot date into every rendering.

#### CLAIM, CLAIM_USE and CLAIM_CLASS

`CLAIM` holds the fields CLR-01 lists, plus `state`, `expires_on`, `template_ref` and `posture_label`. Two additions the rule implies but does not spell out:

| Field | Type | Rule |
| --- | --- | --- |
| `scope_set` | text | The named set the claim is measured on — "the six-vendor priced set", "Frappe HR v16 and TallyPrime". A claim with an empty `scope_set` cannot reach CLEARED (CLR-06) |
| `never_say` | list | The specific sentences this claim's evidence does *not* support, carried with the claim so the boundary travels with it |

`CLAIM_USE` is the fan-out table: one row per (claim, our artefact) pair, with the publication date and a status of `live`, `flagged` or `pulled`. Without it, CLR-11's withdrawal window is a wish — there is no way to know which battle card, which price page and which proposal carried the claim.

`CLAIM_CLASS` holds the eight classes in §21.12 with their allowed evidence, mandatory label, clearance route and re-capture trigger, and points at a `COUNSEL_TEMPLATE` row where one has been cleared. A class with no cleared template forces every instance to counsel — the register enforces this by refusing a claim-owner clearance where `template_ref` is null.

#### WATCH_SIGNAL and ALERT

`WATCH_SIGNAL` is one row per (artefact, detection method) pair, with the cadence and the owner; `ALERT` is one row per firing, with the diff summary, the triage state and the triage timestamp. The §21.11 watch table is this pair rendered. Two rules: an alert is never closed without a triage state and a reason, and an alert triaged as `immaterial` still stores its diff — because "immaterial" judgements are what the audit samples.

#### Enumerations, gathered

Every enum in the record, in one place, so that a reviewer can check a rendering against the allowed values rather than against a memory of the prose.

| Enum | Values |
| --- | --- |
| Vendor class | `incumbent`, `parity_comparator`, `priced_set`, `freemium`, `beachhead_adjacent`, `fintech_owned`, `enterprise_adjacency`, `services_layer`, `out_of_set` |
| Artefact type | `pricing_page`, `product_page`, `docs_page`, `terms`, `faq`, `repo_tree`, `config_file`, `archive_snapshot`, `filing_pdf`, `press_release`, `changelog`, `catalogue`, `sales_quote` |
| Capture method | `raw_fetch`, `raw_fetch_comment_scan`, `rendered_read`, `config_file_read`, `archive_fetch`, `source_read`, `pdf_extract`, `catalogue_read`, `term_search`, `sales_quote_intake` |
| Capture posture | `declared`, `observed_in_product`, `claim_posture`, `frozen` |
| Price model | `flat_with_minimum`, `base_plus_overage`, `per_user_min_billing`, `per_employee_no_block`, `free_to_n`, `block_unknown`, `quote_only` |
| Plan status | `live`, `archived_withdrawn`, `suppressed_in_comment`, `unrendered_config_value`, `quote_only` |
| Parity finding | `present`, `absent_in_artefact_read`, `hand_entered`, `contested`, `not_assessed` |
| Parity row class | `concede`, `parity`, `differentiator`, `unresolved`, `unassessed` |
| Filing-depth stage | `S0_compute`, `S1_generate`, `S2_validate`, `S3_assisted`, `S4_attended`, `S5_acceptance_carried`, `not_assessed` |
| AI evidence class | `packaging_commitment`, `dated_changelog`, `press_release_with_availability`, `product_page_only`, `early_access`, `waitlist`, `none_found` |
| Claim state | `DRAFT`, `CAPTURED`, `COUNSEL`, `CLEARED`, `PUBLISHED`, `WITHDRAWN`, `REJECTED`, `RETIRED` |
| Claim use status | `live`, `flagged`, `pulled` |
| Scenario state | `WATCHED`, `TRIGGERED`, `CONFIRMED`, `RESPONDED`, `CLOSED`, `RETIRED` |
| Alert triage | `new`, `material`, `immaterial`, `actioned` |

#### Referential integrity

| Rule | Enforcement |
| --- | --- |
| Every `PRICE_POINT`, `PARITY_CELL` and `CLAIM` names a `CAPTURE` | Insert fails without it |
| Every `CAPTURE` names an `ARTEFACT`, a method, a tool and a network | Insert fails without them |
| A `CLAIM` may not reach `CLEARED` with an empty `scope_set`, `posture_label` or `evidence_ref` | Transition refused |
| A `CLAIM` may not reach `PUBLISHED` if its capture is outside the age window | Transition refused; export blocked, not warned |
| A `CAPTURE` may not be deleted or edited | Append-only; corrections are new captures with a `supersedes` pointer |
| A `CLAIM` may not be deleted | `RETIRED` is the terminal state; entry and reason are kept for `claim_register_retention_years` |
| A capture operator may not clear a claim resting on their own capture | Role separation, as §02.5 applies to grading |
| An `ALERT` may not close without a triage state, a reason and a timestamp | Close refused |

#### What is never stored

| Never stored | Why |
| --- | --- |
| Material behind a competitor's login, paywall or NDA | CLR-23 is unresolved, and the evidence would be unusable even if obtained |
| Anything obtained under a false identity or a concealed purpose | CLR-23 — the claim is retired and the incident recorded |
| Personal data about a competitor's employees | Nothing in this record needs it; §23 governs personal data |
| A credential for any competitor system | There is no lawful use for one here; the credential vault in §22 is for our customers' portal credentials under written authority and is a different system entirely |
| A search-engine summary as a capture | M-05 |
| An inference presented as a capture | An inference is a claim with an evidence reference, never a capture row |

#### Worked example — one fact, traced end to end

The most-used fact in the section, through every table, including its withdrawal.

| Step | Row created | Content |
| --- | --- | --- |
| 1 | `VENDOR` | `greythr`, classes `incumbent` and `priced_set`, primary `priced_set`, in set, watch owner Research |
| 2 | `ARTEFACT` | greytHR pricing page; type `pricing_page`; `requires_render` true; `comment_bearing` false; default method `rendered_read` plus a raw fetch |
| 3 | `CAPTURE` | Rendered read and raw fetch, 5 September 2026, round r5, posture `declared`, operator named, evidence copy retained; a second capture on 4 September 2026 from round one agrees |
| 4 | `PRICE_POINT` | `greythr / Essential`, model `base_plus_overage` (base ₹2,495 against 50 × ₹45 = ₹2,250), block 50, marginal ₹45, unit `employee`, cadence `monthly`, tax `unstated`, entity scope `tenant`, status `live` |
| 5 | `CLAIM` | "greytHR Essential is ₹2,495 a month including 50 employees"; class `price`; scope set "the six-vendor priced set"; label "list price, ex-GST, captured 5 Sep 2026"; posture `declared`; state `CLEARED` against the counsel-cleared price template; expiry computed |
| 6 | `CLAIM_USE` | Three rows — the §18.11 battle card, the §18.12 comparison, one proposal template — each `live` with its publication date |
| 7 | `WATCH_SIGNAL` | greytHR pricing page, rendered-read hash, cadence set, owner Research |
| 8 | `ALERT` | The hash changes. Triaged `material` inside the triage window; a new capture is taken |
| 9 | Fan-out | The `PRICE_POINT` is superseded by a new row; the `CLAIM` returns to `WITHDRAWN`; all three `CLAIM_USE` rows go to `flagged`, and to `pulled` if not re-cleared inside the withdrawal window |
| 10 | Recompute | §21.4's effective-price, dead-seat, crossover and GST tables are recomputed from the new row — they are outputs of the record, not hand-maintained tables (§21.17) |

Step 10 is the point of the whole subsection. Six tables in §21.4 and one in §18.12 are derived from a handful of `PRICE_POINT` rows; maintained by hand they drift apart within one capture cycle, and the drift is invisible until a prospect finds it.

#### Edge cases the record must handle

| Case | Handling |
| --- | --- |
| A vendor holds two classes | `class_set` is a set; findings are scoped to `primary_class` unless a finding names another class explicitly |
| A vendor is acquired | `vendor_key` is immutable; `ownership` records the acquirer and date; claims are re-read for anything the ownership changes (EV-034) |
| One page publishes two cadences | Two `PRICE_POINT` rows sharing a capture; a comparison that mixes them is refused (§21.17) |
| A page publishes two counts of its own customers on one day | Both stored, `contradicts` set on each; neither may be claimed (M-10) |
| A withdrawn card and a live floor coexist | Two rows, statuses `archived_withdrawn` and `live`; every rendering carries the status word |
| A repository, not a page | `artefact_type` `repo_tree`, handle `owner/repo at tag`, method `source_read`; the tag is part of the handle, so a re-read at a new tag is a new artefact-capture pair |
| A catalogue sweep that finds nothing | A capture with a null result is still a capture — CAP-23's five-catalogue null is evidence, and is re-run only on a named product, never on a rumour |
| A vendor page that returns 403 to a non-browser fetch | `blocks_nonbrowser_fetch` true; the raw-fetch method is unavailable and the record says so, instead of an operator concluding the site is down |
| A statutory or vendor URL that dies | The handle keeps the dead URL and gains the live one; older printed URLs going dead is a known pattern (EV-045) |
| Two captures of the same artefact on the same day disagree | Both kept; `contradicts` set; the disagreement is the finding |

#### Requirements

| ID | Requirement | Acceptance criterion |
| --- | --- | --- |
| CLR-31 | The competitive record is append-only for captures. A correction is a new capture with a `supersedes` pointer, never an edit | Given an attempt to edit a stored capture, when it is submitted, then it is refused and a new capture row is offered |
| CLR-32 | Every derived table in §21.4, §21.6, §21.8 and §18.12 is generated from `PRICE_POINT` rows. A hand-edited figure in a derived table is a defect | Given a derived table whose value differs from the engine's output for the same inputs, when the register is validated, then the table fails validation and names both values |
| CLR-33 | Completeness is recorded per research dimension. A vendor absent from a dimension is a visible gap, not an omission | Given a comparative claim scoped to a set, when any member of that set has never been searched in the claim's dimension, then clearance fails and names the gap |
| CLR-34 | An artefact's capture method is determined by its type and flags, not by the operator's preference; a capture taken by a method the artefact's flags forbid is rejected | Given a rendered-only capture of a comment-bearing artefact, when it is submitted, then it is rejected with M-02 named |
| CLR-35 | No claim may cite an inference as its evidence. An inference is stored as a claim with its own evidence reference and is labelled as an inference wherever it appears | Given a claim whose `evidence_ref` points at another claim rather than a capture, when it is validated, then it fails |
| CLR-36 | Role separation holds inside the record: capture, clearance and audit are three roles, and the same person may not perform two of them on one claim | Given a claim whose capture operator and clearing owner are the same person, when it is submitted for publication, then it is refused |

### 21.17 The price-comparison engine

Every price figure in §21.4 — effective PEPM by headcount, the growth example, the dead-seat table, the crossover table, the cadence table, the GST table — and §18.12's comparison are computed from the same handful of `PRICE_POINT` rows by the same function. This subsection specifies that function, because a comparison that cannot be recomputed cannot be corrected when a card changes, and because most of the ways a competitive price table goes wrong are mechanical and therefore preventable.

**What it is for.** Three consumers: this section's tables, §18.12's published comparison, and a sales answer to "what would we pay against X". **What it is not:** it is not a customer-facing calculator — whether one is published is §18's decision — and it computes list prices only. Realised prices are unmeasured for every vendor (§20 V-03), and no output of this engine is a realised price.

#### Inputs

| Input | Source | Rule |
| --- | --- | --- |
| `price_point` | The record (§21.16) | Must be `live` or `archived_withdrawn`; `unrendered_config_value` and `quote_only` are refused |
| `n` — headcount | The caller | An integer of employees, not users, unless the comparison is explicitly per user on both sides |
| `cadence` | The caller | Must match on both sides of a comparison |
| `tax_basis` | The caller | `ex_gst` on both sides, or `plus_18` on both sides |
| `entity_count`, `headcount_by_entity` | The caller | Required whenever either side is `per_legal_entity` |
| `as_of` | The caller | The date whose captures are used; an as-of date outside a capture's age window flags the output as internal-only |

#### The normalisation contract

Seven normalisations, each with the error it prevents. A comparison that skips any of them is refused, not adjusted silently.

| # | Normalisation | Error it prevents | Magnitude of the error |
| --- | --- | --- | --- |
| N1 | Unit — employee, user, recruiter, licence, tracked user | Folding a per-recruiter or per-licence add-on into a per-employee figure | Unbounded — there is no ratio in the evidence to convert them |
| N2 | Cadence — monthly against monthly, annual against annual | Comparing greytHR's monthly card with Qandle's annual card | 16.9–20.2% on Qandle; 20.0% on Zoho |
| N3 | Tax basis | GST added to one side only | 18% |
| N4 | Tier — entry tier against entry tier, computed from `tier_rank` | Comparing our entry tier with a competitor's mid tier | Up to 3× within one vendor's own card |
| N5 | Block semantics — "base includes 50" against "minimum billing for 50 users" | Treating a per-user minimum as a base price, or the reverse | Changes the model and therefore every figure above the block |
| N6 | Entity scope | A single-licence read of a per-legal-entity vendor | Multiplies with the entity count — 16.7% in the worked example below |
| N7 | List, not realised; and the capture date on both sides | Comparing a September 2026 card with a 2024 archive | Keka's archived card is ₹3,000 a month above its live floor |

<!-- DIAGRAM: competitive-landscape-price-normalisation -->

#### Classifying a card into a model

The model is computed from the card, never taken from the vendor's own description. The test is one subtraction: `base_amount − (block_seats × marginal_rate)`.

| Vendor and plan | Base | Block × marginal | Difference | Model |
| --- | --- | --- | --- | --- |
| Qandle FOUNDATION, monthly | ₹2,950 | 50 × ₹59 = ₹2,950 | ₹0 | `flat_with_minimum` |
| Qandle FOUNDATION, annual | ₹2,450 | 50 × ₹49 = ₹2,450 | ₹0 | `flat_with_minimum` |
| Qandle REGULAR / PLUS / PREMIUM, both cadences | ₹4,950 / ₹6,200 / ₹8,000 monthly; ₹3,950 / ₹4,950 / ₹6,450 annual | 50 × ₹99 / ₹124 / ₹160; 50 × ₹79 / ₹99 / ₹129 | ₹0 on all six | `flat_with_minimum` |
| HROne Basic | ₹4,950 | 50 × ₹99 = ₹4,950 | ₹0 | `flat_with_minimum` |
| HROne Professional | ₹6,500 | 50 × ₹130 = ₹6,500 | ₹0 | `flat_with_minimum` |
| Pocket HRMS Standard | ₹2,995 | 50 × ₹60 = ₹3,000 | −₹5 | `flat_with_minimum`, inside tolerance |
| Pocket HRMS Professional | ₹4,495 | 50 × ₹90 = ₹4,500 | −₹5 | `flat_with_minimum`, inside tolerance |
| Zimyo Basic / Standard / Enterprise | No base published — ₹80 / ₹160 / ₹240 per user with "Minimum billing for 50 Users" | Implied ₹4,000 / ₹8,000 / ₹12,000 | — | `per_user_min_billing` |
| greytHR Essential | ₹2,495 | 50 × ₹45 = ₹2,250 | +₹245 | `base_plus_overage` |
| greytHR Growth | ₹4,495 | 50 × ₹85 = ₹4,250 | +₹245 | `base_plus_overage` |
| Keka FOUNDATION / STRENGTH / GROWTH, archived | ₹9,999 / ₹12,999 / ₹15,999 | 100 × ₹90 / ₹120 / ₹150 = ₹9,000 / ₹12,000 / ₹15,000 | +₹999 on all three | `base_plus_overage` |
| Keka, live small-companies floor | ₹6,999 | Block unknown | Not computable | `block_unknown` |

Two regularities fall out of the subtraction and are worth recording because they are the kind of thing a vendor changes deliberately: greytHR's base exceeds its block value by exactly ₹245 on both published tiers, and Keka's archived card by exactly ₹999 on all three. A future card that keeps the pattern is a re-price; one that breaks it is a re-structure, and the second is the one that matters (CRS-10, CRS-11).

#### Formulae

| Model | Monthly bill at headcount *n* | Effective PEPM | Domain note |
| --- | --- | --- | --- |
| `flat_with_minimum` | `rate × max(n, block)` | `rate × max(n, block) ÷ n` | PEPM stops falling at the block and is flat above it |
| `per_user_min_billing` | Identical arithmetic, unit = user | As above | Comparable to a per-employee card only when users and employees are the same population — state the assumption or refuse |
| `base_plus_overage` | `base + marginal × max(0, n − block)` | `(base + marginal × max(0, n − block)) ÷ n` | PEPM keeps falling toward the marginal rate; it never reaches it |
| `free_to_n` | `0` while `n ≤ ceiling`, then the paid model | Piecewise | The cliff at the boundary is part of the output, not a footnote |
| `block_unknown` | Refused above the last headcount known to be inside the block | Refused | The floor and the marginal rate may still be quoted as captured |
| `quote_only` | Refused | Refused | Only a `sales_quote` intake can populate it (CLR-22) |

#### Output contract

Every computation emits the same record, and every rendered figure carries it. A table that shows a number without this envelope is not an engine output.

| Field | Content |
| --- | --- |
| `monthly_bill_inr`, `annual_bill_inr` | Integer rupees |
| `effective_pepm_inr` | Two decimal places |
| `dead_seat_cost_inr`, `dead_seat_share_pct` | Zero above the block; share to one decimal place |
| `model`, `formula_used` | The model name and the arithmetic as applied |
| `inputs_echo` | `n`, cadence, tax basis, entity count |
| `capture_ref`, `captured_at` | The capture behind the price point |
| `labels` | "list price, ex-GST" and, where applicable, "archived <date>", "cadence mismatch", "internal only" |
| `refusal` | Null, or a refusal code and its reason string |

**Rounding and precision.** Compute in paise as integers; divide last. Effective PEPM is presented to two decimal places, matching the registered figures (₹49.90, ₹139.98, ₹349.95); annual totals to the rupee; percentages to one decimal place. **No competitor's base or marginal rate is ever rounded** — ₹2,995 is not ₹3,000, which is the whole reason Pocket HRMS classifies as flat-with-minimum only inside a stated tolerance. Where an engine output disagrees with a registered figure in EV-027, the engine is wrong and the register governs until the disagreement is explained.

#### Refusals — the negative cases

| Code | Condition | Reason shown in place of a figure | Instance |
| --- | --- | --- | --- |
| `R-BLOCK-UNKNOWN` | The card's block is not published | "The block this floor buys is not published" | Keka's ₹6,999 floor above 20 employees (CQ-01) |
| `R-CADENCE` | Cadences differ across the comparison | "Monthly and annual cards are not comparable" | greytHR monthly against Qandle annual |
| `R-UNIT` | Units differ and no evidenced ratio exists | "Per-recruiter and per-licence prices are not per-employee prices" | Recruit at ₹2,500 or ₹4,000 per recruiter; HR Analytics at ₹20,000 per licence |
| `R-TAX` | Tax basis differs or is unstated on one side only | "GST treatment differs across the two cards" | Zimyo and HROne do not state it; Zoho does |
| `R-TIER` | Tier ranks differ | "Entry tier compared with a higher tier" | Any comparison against Growth, Professional or Standard |
| `R-STATUS` | The price point is `unrendered_config_value` | "Not a published price" | Qandle's unrendered module values (M-11) |
| `R-ARCHIVED-AS-LIVE` | An archived card is requested without its label | "Archived card, snapshot <date>" | Keka's ₹9,999 card |
| `R-EXPIRED` | The capture is outside the age window and the output is for external use | "Capture expired — re-capture before use" | Any round-one-only card (CQ-15, CQ-17) |
| `R-ENTITY` | One side is `per_legal_entity` and no entity split was supplied | "Per-entity licensing requires the entity split" | Zoho Payroll for a multi-entity group |
| `R-OURS-UNPUBLISHED` | The comparison includes our own price and our card is not published | "Our price is a hypothesis until §18.3 decides and §20 V-01 reports" | Every crossover cell today |

A refusal is rendered in place of the figure, in the same cell. It is never blank, never a dash and never quietly dropped — a missing cell reads as an oversight, and a stated refusal reads as a finding, which is what it is.

#### Worked example W-1 — a multi-entity group against a per-entity licence

A 60-person firm, two legal entities (45 and 15 employees), three states, comparing Zoho Payroll Standard at ₹1,000 a month on annual billing including 25 employees, then ₹40 each (r2/01; r1/08).

| Step | Arithmetic | Result |
| --- | --- | --- |
| The naive single-licence read | ₹1,000 + (60 − 25) × ₹40 | ₹2,400 a month |
| Entity A, 45 employees | ₹1,000 + (45 − 25) × ₹40 = ₹1,000 + ₹800 | ₹1,800 a month |
| Entity B, 15 employees | ₹1,000 + ₹0 — 15 is inside the included 25 | ₹1,000 a month |
| The actual bill | ₹1,800 + ₹1,000 | **₹2,800 a month, ₹33,600 a year** |
| The error in the naive read | ₹400 ÷ ₹2,400 | **16.7% understated** |
| Dead seats in entity B | (25 − 15) × ₹40 | ₹400 a month — the same structure as the 50-seat block, at a smaller scale |

Two readings. The entity multiplier is invisible on the headline price and is disclosed only in Zoho's own wording that a separate payroll licence is required for each legal entity (r1/08) — so N6 is the normalisation most likely to be skipped, and the one that decides a multi-entity comparison. And the three states cost nothing extra on Zoho's card as read: **nothing in the evidence prices a state**, so the registration-shaped line is ours to justify (EV-088, §18.3), not a market practice to point at. The only priced non-headcount unit in the evidence is the legal entity.

#### Worked example W-2 — the cadence trap, and where the value floor actually sits

The most-repeated comparison in this section is greytHR against Qandle at the value floor. Done carelessly it is also the clearest instance of N2.

| Comparison | Arithmetic | Result |
| --- | --- | --- |
| The mismatched pair, at 50 employees | greytHR monthly ₹2,495 against Qandle **annual** ₹2,450 | Qandle cheaper by ₹45 — and the two cards are not comparable |
| Like for like, monthly, at 50 | ₹2,495 against ₹2,950 | greytHR cheaper by ₹455 |
| Like for like, monthly, at 100 | ₹2,495 + 50 × ₹45 = ₹4,745 against 100 × ₹59 = ₹5,900 | greytHR cheaper by ₹1,155 |
| Against Qandle's annual card, at 100 | ₹4,745 against 100 × ₹49 = ₹4,900 | greytHR cheaper by ₹155 — flagged `cadence mismatch` |
| The crossover against the annual card | `2,495 + 45(n − 50) = 49n` → `4n = 245` → `n = 61.25` | Qandle's annual card is the lower bill from 1 to 61 employees, by at most ₹45 a month; greytHR is lower from 62 |

Checked at the boundary: at 61 employees greytHR bills ₹2,990 against Qandle's ₹2,989; at 62, ₹3,035 against ₹3,038. The "₹45 a month" that separates the two anchors at exactly 50 employees is the largest gap between them anywhere on the curve, and it inverts 12 employees later. Any statement that one of them is "the price floor" is true only at a stated headcount and cadence — which is why round five's refutation of "Qandle is the price floor of the entire set" is scoped to monthly billing and to 50 employees (r5/03). The engine computes the mismatched pair for internal planning with a `cadence mismatch` label and refuses to emit it for publication.

#### Worked example W-3 — an add-on that cannot be normalised

greytHR's GPS Live Tracking is ₹140 per user a month against its ₹45 marginal seat — 3.11 times the price of the seat it rides on (r5/03). That ratio is computable because both are per-user prices on the same card. Three neighbouring figures are not:

| Add-on | Unit | Why it cannot be expressed per employee |
| --- | --- | --- |
| Recruit — greytHR ₹2,500, Zimyo ₹4,000, Zoho People ₹3,000, Keka archived ₹1,500 and ₹2,500 | Per recruiter per month | The recruiter-to-employee ratio is not in the evidence, and inventing one is the fabricated precision this PRD exists to avoid. §18.5 prices recruiting on the unit the market uses |
| Zimyo HR Analytics ₹20,000 | Per licence per month | No denominator at all |
| Zoho People API access ₹37,500 | Per month, flat | No denominator at all |
| Qandle Remote Screen Tracking ₹50 | Per employee per month, identical monthly and annual in India | Computable — and the only add-on in the set priced identically on both cadences, which is itself a capture worth keeping |

The rule the table enforces: an add-on is compared on the unit it is sold in, or not compared. Add-ons are also excluded from every entry-tier comparison (N4), because a card's entry price is not an all-in price and neither is ours.

#### Worked example W-4 — a refusal, in full

A prospect asks what Keka would cost at 35 employees. The engine's output:

| Field | Value |
| --- | --- |
| `refusal` | `R-BLOCK-UNKNOWN` |
| Reason | "Keka's live small-companies page states 'from ₹6,999 per month' and 'starts at ₹90 per employee/month'. The number of employees the ₹6,999 covers is not published. ₹6,999 ÷ ₹90 = 77.8, which matches no round number." |
| What may still be shown | The two captured figures with their capture date; the archived card labelled archived; the note that the block is unpublished |
| What may not | Any bill, PEPM or comparison at 35 employees |
| Routed to | CQ-01, method: a sales quote under CLR-22 |

The same refusal applies at 25, 35 and 49 employees and does **not** apply at 20 — §21.4's table computes the 20-employee figure because 20 is assumed inside the block on the same basis EV-027 registers it, and that assumption is stated in the table rather than buried in the engine.

#### Regression vectors

The registered figures are the oracle. Any engine change is run against these before it is used anywhere.

| # | Vendor and plan | *n* | Expected monthly bill | Expected PEPM | Source of truth |
| --- | --- | --- | --- | --- | --- |
| RV-01 | Qandle FOUNDATION, annual | 20 | ₹2,450 | ₹122.50 | EV-027 registered |
| RV-02 | greytHR Essential | 20 | ₹2,495 | ₹124.75 | EV-027 registered |
| RV-03 | Pocket HRMS Standard | 20 | ₹2,995 | ₹149.75 | EV-027 registered |
| RV-04 | Zimyo Basic | 20 | ₹4,000 | ₹200.00 | EV-027 registered |
| RV-05 | HROne Basic | 20 | ₹4,950 | ₹247.50 | EV-027 registered |
| RV-06 | Keka, live floor | 20 | ₹6,999 | ₹349.95 | EV-027 registered |
| RV-07 | Qandle FOUNDATION, annual | 50 | ₹2,450 | ₹49.00 | EV-027 registered |
| RV-08 | Qandle FOUNDATION, monthly | 50 | ₹2,950 | ₹59.00 | EV-027 registered |
| RV-09 | greytHR Essential | 50 | ₹2,495 | ₹49.90 | EV-027 registered |
| RV-10 | Pocket HRMS Standard | 50 | ₹2,995 | ₹59.90 | EV-027 registered |
| RV-11 | Zimyo Basic | 50 | ₹4,000 | ₹80.00 | EV-027 registered |
| RV-12 | HROne Basic | 50 | ₹4,950 | ₹99.00 | EV-027 registered |
| RV-13 | Keka, live floor | 50 | ₹6,999 | ₹139.98 | EV-027 registered |
| RV-14 | Keka FOUNDATION, archived | 50 | ₹9,999 | ₹199.98 | EV-027 registered |
| RV-15 | greytHR Essential | 100 | ₹4,745 | ₹47.45 | §21.4 arithmetic |
| RV-16 | Pocket HRMS Standard | 100 | ₹5,995 | ₹59.95 | §21.4 arithmetic |
| RV-17 | Keka FOUNDATION, archived | 100 | ₹9,999 | ₹99.99 | §21.4 arithmetic |
| RV-18 | greytHR Essential | 60 | ₹2,945 | ₹49.08 | §21.4 growth example |
| RV-19 | Qandle FOUNDATION, annual | 60 | ₹2,940 | ₹49.00 | §21.4 growth example |
| RV-20 | Zimyo Basic | 60 | ₹4,800 | ₹80.00 | §21.4 growth example |

| # | Negative vector | Expected |
| --- | --- | --- |
| RV-21 | Keka live floor at 35 | `R-BLOCK-UNKNOWN` |
| RV-22 | greytHR monthly against Qandle annual, for publication | `R-CADENCE` |
| RV-23 | Zimyo per-user card against a per-employee card with no stated assumption | `R-UNIT` |
| RV-24 | Zoho Payroll for a two-entity group with no entity split | `R-ENTITY` |
| RV-25 | Qandle's unrendered module values | `R-STATUS` |
| RV-26 | Keka's archived card rendered without its label | `R-ARCHIVED-AS-LIVE` |
| RV-27 | Any cell containing our own price, for external use | `R-OURS-UNPUBLISHED` |
| RV-28 | factoHR's round-one card, for external use | `R-EXPIRED` |

#### Requirements

| ID | Requirement | Acceptance criterion |
| --- | --- | --- |
| CLR-37 | A price point with status `unrendered_config_value` or `quote_only` is never an engine input | Given such a row, when a computation is requested, then it returns `R-STATUS` and no figure is produced anywhere |
| CLR-38 | The model is classified by the subtraction test against `price_model_classification_tolerance_inr`, never taken from the vendor's description of its own card | Given a card whose page says "per employee" but whose base exceeds block × marginal rate, when it is classified, then it is `base_plus_overage` and the difference is recorded |
| CLR-39 | Every emitted figure carries its formula, inputs, capture reference and labels. A figure rendered without them fails review | Given a table cell with a price and no capture date, when the artefact is reviewed, then it fails CLR-05 |
| CLR-40 | A refusal is rendered in the cell with its reason and its routing question; it is never a blank, a dash or a silently dropped row | Given a comparison containing a refused cell, when it is rendered, then the reason string and the open question appear in that cell |
| CLR-41 | The engine computes on the whole domain of a card — inside the block and above it — and any crossover statement names the headcount and the domain it was computed on | Given a crossover claim derived only from the block, when it is validated, then it fails and names the overage arithmetic it ignored |
| CLR-42 | Engine outputs are reconciled against the registered EV-027 figures before any release of the engine or any republication of a derived table; a disagreement blocks the release | Given an engine change whose output differs from a registered figure, when the regression vectors are run, then the release is blocked and both values are reported |

### 21.18 Verification — the golden capture corpus and the test scenarios

A record and an engine that nobody tests decay into a document with a database behind it. This subsection specifies the fixtures the tests run against, the tests themselves, and the audit that samples what actually left the building. The fixtures are not synthetic: each is a capture already taken, retained precisely because it is the case that broke a method once.

#### The golden capture corpus

Each fixture is a retained evidence copy with an expected result. A change to the capture pipeline, the price engine or the claim register is run against all of them before release, and each is re-checked against its live artefact every `competitive_fixture_refresh_days` — a fixture that no longer matches its live source is a signal about the vendor, not a broken test.

| Fixture | What it holds | What it proves | Failure mode it guards |
| --- | --- | --- | --- |
| F-01 | Keka's India pricing page, raw, 318,005 bytes: 60 HTML comments, exactly three containing a rupee symbol, zero rupee characters after comments are stripped | Comment-node scanning finds prices a rendered read cannot see; the "no live price" null is testable rather than asserted | M-02 |
| F-02 | The same page against Keka's 1 August 2024 archive: "Direct Salary Payout" outside a comment in 2024, inside a 477-character comment in 2026 | A plain string search finds the phrase on both and concludes wrongly; the comment boundary is the discriminating test | M-08 |
| F-03 | Keka's US and UAE pricing pages: three commented spans each, zero live figures, withdrawn cards $9/$16/$22 and $4/$5/$6 | Locale pages are separate artefacts, and the suppression finding is global rather than an India tactic | Locale conflation |
| F-04 | Qandle's pricing config file: eight tier values, Remote Screen Tracking at 50 monthly and 50 annual, plus module values and an unused string that never render | The config file is the price source of record where prices are injected; unrendered values are stored and barred | M-03, M-11 |
| F-05 | Zimyo's pricing page and its HTTP 403 to a non-browser fetch | A 403 is a property of the artefact, recorded as a flag — not an outage, and not a reason to drop the vendor | M-01 |
| F-06 | greytHR's payroll page: generation verbs present; "filing", "e-fil", "TRACES" and "EPFO" at zero occurrences | The term-search null that places greytHR at stage S2 and carries EV-030 | Null asserted without a test |
| F-07 | greytHR's pricing page: ₹2,495, 50 included, ₹45 additional, NAVOS included in every tier | The regression oracle for RV-02, RV-09, RV-15 and for the packaging-commitment AI class | Hand-edited derived tables |
| F-08 | The Frappe HR v16 tree at tag v16.17.1: three India files, 549 lines, three overrides, zero Indian state names, exactly two ESI hits — a code comment and a test fixture | Word-boundary searching plus hit classification; an unclassified hit count is not a finding | M-13 |
| F-09 | TallyPrime's PT pay-head help page, beside the search-engine summary that says the opposite | Documentation is read at the vendor's own help domain; a summary is not a capture | M-05 |
| F-10 | Pocket HRMS's pricing FAQ giving greytHR's entry price as ₹3,495, beside greytHR's own ₹2,495 | A competitor-cited price is not a price | M-07 |
| F-11 | Keka's pricing page and its sign-up page, same day: "12,500+" and "10,000+" | Two counts on one day are a contradiction to record, not a time series | M-10 |
| F-12 | TallyPrime's leave-encashment FAQ, both sentences | Quoting the first sentence alone reverses the meaning and was flagged for disparagement exposure | M-06 |
| F-13 | The five TDL catalogue captures, all null for payroll, PT and LWF | A null sweep is evidence and is re-run only on a named product, never on a rumour | Re-running a sweep on hearsay |

#### Test scenarios — capture integrity

| ID | Given | When | Then |
| --- | --- | --- | --- |
| T-01 | A comment-bearing artefact (F-01) | A capture is submitted with method `rendered_read` only | The capture is rejected, naming M-02, and the raw comment-scan method is required |
| T-02 | F-01 and F-02 | The watch computes both hashes | A change inside a comment raises an alert even though the comment-stripped hash is unchanged |
| T-03 | F-04 | A raw fetch of the rendered page is submitted as the price source | It is accepted as a capture but rejected as a price source; the config file is required |
| T-04 | F-03 | A claim is drafted that Keka's price suppression is global | It must cite all three locale artefacts and their captures, or be scoped to the one locale read |
| T-05 | F-05 | A non-browser fetch returns 403 | The artefact's `blocks_nonbrowser_fetch` flag is set, the capture is retried rendered, and no claim about availability is created |
| T-06 | Any artefact | A capture is submitted without `tool` or `network` | It is rejected, naming M-01 |
| T-07 | F-09 | A capture whose source is a search-engine result page is submitted | It is rejected — `search_summary` is not a value of the method enum |
| T-08 | A verbatim quote in a capture | The quote cannot be reproduced from the retained evidence copy | The quote is struck, the claim resting on it is withdrawn, and the capture is flagged for re-read (M-04) |
| T-09 | Two captures of one artefact on the same day with different content | Both are stored | `contradicts` is set on each, no claim may cite either, and the contradiction is reported as a finding |
| T-10 | An artefact marked `login_required` | A capture is attempted | It is refused until CLR-23's counsel question is resolved, and the refusal is logged against CQ-21 |

#### Test scenarios — the price engine

| ID | Given | When | Then |
| --- | --- | --- | --- |
| T-11 | The regression vectors RV-01 to RV-20 | The engine is changed | Every vector reproduces its registered or published figure, or the release is blocked (CLR-42) |
| T-12 | Keka's live floor | A bill at 35 employees is requested | `R-BLOCK-UNKNOWN` with its reason string and CQ-01, rendered in the cell |
| T-13 | greytHR monthly and Qandle annual | A published comparison is requested | `R-CADENCE`; the same pair computed for internal planning carries the `cadence mismatch` label |
| T-14 | Zoho Payroll and a two-entity group | A bill is requested without `headcount_by_entity` | `R-ENTITY`; with the split 45/15 supplied, the output is ₹2,800 a month and the naive ₹2,400 is reported as 16.7% understated |
| T-15 | Pocket HRMS Standard | The model is classified | `flat_with_minimum`, with the −₹5 difference recorded, provided the tolerance parameter permits it; otherwise `base_plus_overage` with the difference shown |
| T-16 | greytHR Essential | The model is classified | `base_plus_overage`, difference +₹245 — never `flat_with_minimum`, whatever the page says |
| T-17 | An add-on priced per recruiter | A per-employee comparison is requested | `R-UNIT`; no ratio is invented |
| T-18 | Any comparison including our own price | It is requested for external use | `R-OURS-UNPUBLISHED` until §18.3 publishes a card |
| T-19 | A crossover claim | It was computed only inside the block | Validation fails, naming the overage arithmetic — the HROne-at-₹80 case, where the inside-block formula names a headcount that card never bills |
| T-20 | A derived table in §21.4 | Its stored value differs from the engine's output | The table fails validation and both values are reported (CLR-32) |

#### Test scenarios — claims, parity and scenarios

| ID | Given | When | Then |
| --- | --- | --- | --- |
| T-21 | A claim whose capture is outside the age window | It is exported for a customer conversation | The export is blocked — not warned — and the claim is routed for re-capture (CLR-10) |
| T-22 | A published claim and a material watch alert on its source | Triage completes | Every `CLAIM_USE` row is flagged inside the withdrawal window, and any row not re-cleared moves to `pulled` (CLR-11) |
| T-23 | A draft containing "only", "no one", "first" or "the market" beside a competitor fact | It is submitted for clearance | It fails CLR-06 until the set is named |
| T-24 | A parity row with a `contested` cell | An artefact asserts that capability in either direction | Clearance fails, naming the cell (CLR-19) |
| T-25 | A detected TallyPrime release | `parity_row_reverify_grace_days` elapses with no re-run | Every Tally-sourced claim is blocked for export and the rows appear on the research queue (CLR-20) |
| T-26 | A scenario with no `watch_signal_ref` | The register is validated | The scenario fails validation and is excluded from the wedge matrix (CLR-29) |
| T-27 | A scenario whose trigger fires and does not reproduce on a second capture | Triage completes | The scenario returns to `WATCHED`, the alert is recorded as a false positive, and the detection method is reviewed |
| T-28 | An AI row with no ladder class or no posture label | The comparison is rendered | The row is omitted and the omission is logged for re-capture (CLR-27) |
| T-29 | A claim whose capture operator and clearing owner are the same person | Publication is requested | It is refused (CLR-36) |
| T-30 | A sales-sourced price with no headcount or cadence | Intake is submitted | It is rejected and no claim may cite it (CLR-22) |
| T-31 | A price claim sourced from a competitor's comparison page | It is submitted for clearance | It fails CLR-05, with F-10 as the worked instance |
| T-32 | Any artefact leaving the building | The §20.4 banned-figure list is run against it | A hit blocks publication — the ~₹99 Keka price, "Keka renews below list", the ₹45–50 ceiling, Frappe's state coverage (CLR-16) |

#### The audit

The tests prove the machinery. The audit proves the machinery was used.

| Element | Specification |
| --- | --- |
| Population | Every `CLAIM_USE` row with status `live` — the claims actually in front of people, not the register's total |
| Sample | `competitor_claim_audit_sample_size`, drawn at random, stratified so that every claim class with at least one live row is represented |
| Checked per sampled claim | A complete register entry (CLR-01); a capture inside its window; the posture label present; the scope set named; the clearance route recorded and, where the class requires it, counsel's individual clearance; the artefact's wording matching the cleared wording |
| Failure handling | Any failure returns the claim to `WITHDRAWN` and triggers a full sweep of that claim class, not only the sampled row |
| Independence | The auditor may not have authored or cleared any claim in the sample; the role separation is the same one §02.5 applies to evidence grading |
| Reported to | The founder, with the §20 owner of the affected validation item |

#### What is deliberately not tested

- **Competitor products.** Nothing in this corpus executes a competitor's software. Every fixture is a page, a document, a repository or a file. The four unresolved cells and CQ-07 stay open until CLR-23's counsel question and an execution record change that (CLR-14, CQ-21).
- **Whether a competitor's claim is true.** The record tests our reading of what a vendor published, never the accuracy of the vendor's own statement. Asserting a competitor is wrong is barred outright (CLR-02).
- **Realised prices.** Everything here is list. What anyone actually pays — ours or a competitor's — is §20 V-03, and no test in this subsection can substitute for it.
- **Our own price.** It is a [Hypothesis] until §18.3 decides and §20 V-01 and V-03 report; the engine refuses to publish any comparison containing it (RV-27).

#### Readiness

The record, the engine and this corpus are a prerequisite for the **first external competitive artefact** — the first battle card, comparison page or proposal that names a competitor — and not for the v1 build. The sequencing consequence for §05 is narrow and specific: the engineering work is small, the dependency is on the first GTM artefact rather than on any release gate, and a competitive claim made before the register exists cannot be withdrawn when a card changes, which is the failure this whole subsection is built to prevent.

### 21.19 Competitive feedback — what deals tell the record, and what they cannot

Every fact in this section was read from an artefact. None of it observes how a competitor behaves when a deal is live: what it discounts, what it concedes, what it says about us, which of our wedges a buyer actually weighs. That evidence exists only in deals — and it is the weakest class in the whole record, because it arrives as hearsay from an interested party, in numbers too small to generalise, filtered through a seller's memory. It is therefore specified as a separate class, with its own rules, feeding the wedge review and §20's validation items, and feeding the claim register **not at all**.

#### The competitive-outcome record

One row per closed opportunity in which a competitor was named. Created by the seller, reviewed by the research owner.

| Field | Rule |
| --- | --- |
| `opportunity_ref`, `closed_on` | — |
| `headcount`, `states`, `legal_entities`, `registrations` | The four dimensions that decide which of our wedges could even apply; a loss at 12 employees says nothing about the 20–50 argument |
| `current_stack` | Mapped to the §21.2 decision table's nine rows, so outcomes aggregate against the job we were taking |
| `competitors_named` | `vendor_key` values; free text is not permitted, so a named vendor either exists in the record or forces a row and a capture (CLR-44) |
| `competitor_evidence` | Any artefact the prospect shared — a quote, a proposal, a card. Attached, or the field is empty; a remembered figure is not evidence (CLR-45) |
| `outcome` | `won`, `lost`, `no_decision`, `lost_to_status_quo` — the fourth is separate because losing to a spreadsheet and a CA is not losing to a vendor |
| `decisive_factor` | Exactly one value from the closed taxonomy below |
| `contributing_factors` | Zero or more from the same taxonomy |
| `reviewed_by` | The research owner, who checks that the factor matches what the notes actually say |

#### The decisive-factor taxonomy

Closed, and deliberately built from this section's wedge list so that outcomes and the §21.11 matrix speak the same language.

| Code | Factor | Which finding it tests |
| --- | --- | --- |
| WF-01 | Price structure — the seat floor, billing actual headcount | EV-026; §18.2 P6 |
| WF-02 | Evaluability — a published, all-in card the buyer could read without a call | EV-024; §21.4 |
| WF-03 | Attended, assisted submission | EV-030; K-13 |
| WF-04 | Maintained multi-state PT and LWF | EV-031; EV-032 |
| WF-05 | The registration and multi-entity model | EV-088; §18.3 |
| WF-06 | The CA or partner channel | §21.10 — contested, not unmatched |
| WF-07 | Migration — the importer and the YTD tie-out | §16.7 |
| WF-08 | The compliance SLA and format-break coverage | PAR-36 |
| WF-09 | Leave-to-payroll and encashment (job 1) | PAR-05, PAR-24 |
| WF-10 | The employee surface — self-service, mobile, deskless | PAR-30 |
| WF-11 | AI | EV-090 — expected to decide nothing |
| WF-12 | Suite breadth — performance, recruiting, engagement | PAR-29 |
| WF-13 | Security and certification documentation | §17 |
| WF-14 | Price level, not structure | EV-027's two anchors |
| WF-15 | Incumbent inertia or the CA relationship | §21.2's job 1 |
| WF-16 | **Something not on this list** | The health metric of this whole section |

WF-16 is the row that matters most. A competitive record built from artefacts predicts which factors will decide deals; every WF-16 is a prediction that failed. Its frequency, not its content, is the measure — a rising WF-16 count means the record is reading the wrong surfaces, which is a research finding and a §20 item, not a sales problem.

#### What deal evidence may and may not do

| May | May not |
| --- | --- |
| Re-rank the wedges for emphasis, once the count passes `competitive_outcome_min_n_for_reranking` | Become a competitor capability claim — a prospect saying "greytHR told us they file" is a trigger for a capture of greytHR's own pages, nothing more |
| Trigger a capture, an alert or a new open question | Become a price claim; only a documented quote meeting CLR-22, with the artefact attached, can do that |
| Supply a documented realised-price observation to §20 V-03, where the prospect shares the document | Support any extrapolation from one observation to a vendor's realised pricing |
| Move a scenario to `TRIGGERED` where the evidence is an artefact the prospect shared | Be repeated outside the company in any form, including anonymised — a customer's account of a competitor compounds the consent question and the disparagement exposure (CLR-02, CLR-08) |
| Re-open a parity cell, where the prospect ran the bake-off themselves | Be recorded as "observed in product" — the prospect's findings are the prospect's (§21.3) |

#### The wedge review

At each review the factor counts are read against the §21.11 matrix, and three readings are acted on:

1. **A wedge that never appears as decisive or contributing** is a candidate for demotion in the collateral, not for louder collateral. The wedge stays in the matrix — it may still be what stops a competitor's move — but it stops leading.
2. **A wedge lost repeatedly to one vendor** is the early signal of a scenario that has already happened without the watch catching it. It forces a re-capture of that vendor's surfaces before the next cadence sweep, and, if the surfaces confirm it, the matching scenario moves to `CONFIRMED`.
3. **A rising WF-16 count** re-opens the completeness question per dimension (CLR-33) and routes to §20 as a research item.

Ownership boundaries: **§19 owns the metric definitions** — numerator, denominator, source table, target, date — for anything computed from these rows; **§20 owns V-03**, the realised-price question these rows can only contribute to; this section owns the taxonomy, the evidence rules and the review.

| ID | Requirement | Acceptance criterion |
| --- | --- | --- |
| CLR-47 | Deal evidence never enters the claim register. It may create captures, alerts, questions and scenario transitions | Given a claim whose evidence reference is a competitive-outcome row, when it is validated, then it fails and the capture it needs is queued |
| CLR-48 | `decisive_factor` is a single value from the closed taxonomy; a new factor is recorded as WF-16 and forces a review before the taxonomy is extended | Given an outcome row with a free-text decisive factor, when it is submitted, then it is rejected and WF-16 is offered |
| CLR-49 | A competitor fact learned in a deal is never repeated outside the company, in any form, including anonymised, unless it has been independently captured and cleared as a claim | Given an external artefact citing a deal-sourced competitor fact, when it is reviewed, then it is blocked until the independent capture exists |

