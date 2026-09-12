## 02. Evidence Register & Confidence Methodology

This section is the reader's manual for everything that follows. Every subsequent section carries inline confidence markers — **[Verified]**, **[Hypothesis]**, **[Killed]**, with **[Reversed]** and **[Verified — mirror]** as qualifiers (§02.2) — and those markers only mean something if the grading behind them is disciplined, auditable, and honest about its own failure rate. This section defines that discipline: how a claim earns a marker, why the whole register must be *discounted downward* rather than read at face value, and the one non-negotiable capture step (checking for a corrigendum) that separates this document from the version of it that reached the opposite conclusion on the single most important statutory question in the plan.

The core message is uncomfortable and load-bearing: **the first two research rounds retracted roughly ninety claims (the Draft 1 count; the round-two critic's own tally is roughly sixty, §02.3), and every one of those retractions moved in the same direction — smaller, later, more contested, already occupied.** That was not random error being cleaned up. It was a *measured optimism bias* in the generator that produced the corpus, this section included. Rounds three to five then re-verified against source and found two further things: round two had itself over-corrected in places (§02.3), and roughly 13 findings per research dimension died on source re-verification, so any early claim not yet re-checked is roughly 70–75% reliable — in either direction (r3 critic). The methodology below exists to make both findings visible on the page and to force them into the arithmetic, so that a reader — a founder deciding on headcount, an investor deciding on a cheque, a statutory engineer deciding what to hard-code — knows exactly how much to trust each line, and discounts accordingly.

This is not methodology for methodology's sake. In a filing-first HRMS the PRD's statutory claims become *executing code that produces the legal instruments the employer files* — portal-accepted artefacts, submitted through attended, assisted filing under the employer's written authority, with the statutory liability staying with the employer (EV-030, EV-035–EV-038; §22; attended-filing legality under counsel review, §23). The distance between "a claim in a PRD" and "a number in a filed Form 138" is three engineering steps, not thirty: a graded claim becomes a versioned rule-store row (§02.10), the row feeds a deterministic computation, the computation emits a conformance-tested return. The confidence marker is the load-bearing wall between those two things, and this section is its structural spec.

<!-- DIAGRAM: claim-to-filed-instrument-distance -->

### 02.1 Why an HRMS PRD needs an evidence register at all

Most product PRDs do not carry provenance. This one must, for three reasons specific to a filing-first HRMS in India.

**First, the cost of a wrong statutory claim is legal, not cosmetic.** In a generic SaaS PRD, a mis-stated market number produces a bad slide. Here, a mis-stated PF wage base, PT slab, or TDS annexure layout produces an incorrect statutory filing, filed under the customer's own credentials and digital signature, with penalty and interest exposure that lands on the customer and reputational exposure that lands on us. The whole product thesis — that *the filing, not the payslip, is the unit of delivery* (see §01) — means the product's output is a legal instrument. A PRD that feeds that engine cannot treat "probably correct" and "verified against the gazette" as the same thing. The confidence marker is the difference between "safe to hard-code into the payroll engine" and "must be validated before a single rupee is computed against it."

The exposure is not hypothetical, and it is worth pricing so the discipline is not read as fussiness:

| Wrong statutory claim, hard-coded | Statutory consequence to the customer | Approx. source cue |
| --- | --- | --- |
| PF wage base understated (e.g. add-back omitted) | Interest is mandatory and auto-calculated on the return (EV-039) — simple interest at 12% p.a. under the Code per S.O. 2698(E), 29.05.2026, deemed from 21.11.2025 (read via secondary summary, r1); damages are separately assessable and their current rate is not captured at primary source (EPFO's own page still shows the legacy regime, r1) — parameter `epf.damages_scale`, no shipped default (§20.13) | (Source: EPFO revamped-ECR circular; S.O. 2698(E)) |
| TDS under-deducted (wrong 24Q/138 computation) | Interest at 1% per month from the date tax was deductible to the date it is deducted, and 1.5% per month from deduction to payment — Income-tax Act 2025 s.398(3)(a), read from the Act text in round five (r5/04 finding 32). The rates match s.201(1A) of the 1961 Act (r1/06), but the CBDT mapping captured in this PRD covers four sections only (EV-050), so "s.398(3)(a) replaces s.201(1A)" is not stated as a mapping — `tax.section_map.interest_short_deduction` is routed to §20.13 | (Source: Income-tax Act 2025 s.398(3)(a)) |
| Late/incorrect ECR | An approved return can never be cancelled (EV-036); a downward correction is possible only before payment initiation (EV-037); a skipped month blocks every later month (EV-038); UAN mismatch cascades to member grievances | (Source: EPFO revamped-ECR circular and FAQ) |
| Wrong state PT slab / periodicity | Penalty + interest per the levying state's PT Act — per-state parameters `pt.<state>.interest_rate` and `pt.<state>.late_fee`, no shipped default (§06.4; routed to §20.13 with the state PT family) | (Source: e.g. Karnataka PT Act; Maharashtra PT Act — per-jurisdiction) |
| Late or invalid Form 130 (ex-Form 16) | A certificate not generated from TRACES is invalid (EV-048), and Part B cannot be generated until the Form 138 Q4 format is released (EV-046). The late-issuance penalty's section and amount under the 2025 Act are not captured in this PRD's evidence — parameter `tds.penalty.certificate_delay`, no shipped default (§20.13) | (Source: EV-046, EV-048) |

Every one of these is a fine the customer pays because the engine trusted an ungraded number. That is the whole argument for the register in one table.

**Second, this market punishes optimism specifically.** The retractions were not evenly distributed across topics — they clustered on exactly the claims a founder wants to be true: the market is bigger, the competitive band is emptier, the price floor is higher, the AI feature is a differentiator, enterprise is reachable at launch. Each of those is a claim that makes the business look better, and each was cut down. A register that does not grade confidence lets those flattering claims re-enter a deck at full strength six months from now, stripped of the caveat that killed them. The **[Killed]** marker exists precisely to prevent that resurrection.

**Third, the statutory ground is moving under the product.** The four Labour Codes came into force 21 November 2025 — the Social Security and Wages commencements partial, not whole-Code (r5/04) — with Central Rules notified 8 May 2026; the EPF Act 1952 is repealed with a one-year savings window expiring on or about 21 November 2026; the TDS return format is mid-migration from Form 24Q to Form 138 with the Q4 layout still unreleased as re-checked in September 2026 (EV-046); and DPDP's substantive provisions commence only on or about 13 May 2027 (EV-058) (all per §06 and §23, Source: CoSS 2020 s.164(2)(b); MoLE Central Rules notification 08.05.2026; CBDT/Protean RPU-FVU releases). A claim that is **[Verified]** today can be silently invalidated by a notification next quarter. The register is therefore not a one-time grading exercise — it is a *standing surveillance obligation*, and §02.6 defines the re-verification cadence that keeps it live.

 **[Verified]** — The register is a build dependency, not documentation hygiene

The versioned, effective-dated, retrospectively-recomputable wage-definition rule required by §06 (the 50% add-back under Code on Wages s.2(y) / Code on Social Security s.2(88)) cannot be built without a provenance trail: an arrears or retro run must recompute against the *rule version in force for the period being corrected*, and that version's authority is a specific gazette notification with a specific effective date (Source: Code on Wages 2019 s.2(y); CoSS 2020 s.2(88)). The evidence register's capture schema (§02.7) is the upstream source of that rule-version metadata. Provenance discipline in the PRD and effective-dating in the engine are the same discipline applied at two altitudes.

The corollary, stated once so it governs the whole document: **the register's row schema and the rule-store's row schema are deliberately isomorphic.** A register row keyed by (authority, jurisdiction, instrument, effective-date-range, corrigendum-status) is exactly the metadata a rule-store row needs to answer "which version of this rule was in force on the payslip date I am recomputing?" Building the register carelessly means building the rule store carelessly, one layer down.

### 02.2 The three-marker grading system

Every claim in this PRD carries exactly one of three markers. The markers are mutually exclusive and collectively exhaustive: a claim is either safe to build on, a bet with a named way to settle it, or a corpse recorded so it stays buried. There is no unmarked claim; an unmarked assertion is a defect and should be treated as **[Hypothesis]** by default until graded.

A deliberate design choice, stated up front: **there is no fourth "medium confidence" marker.** Analyst rating scales fail precisely because "medium" is where motivated reasoning parks the claims it does not want to test. The three-marker system forces a binary at the point of use — either a claim can reach a contract/hard-code (Verified) or it cannot (Hypothesis) — and pushes all the nuance into the *kill criterion* and the *haircut*, where it is actionable, rather than into a rating adjective, where it is decorative.

Two qualifiers ride on the three grades without becoming a fourth. **[Reversed]** marks a *conclusion* this PRD previously stated and now retracts, with a one-line reason; the claim underneath it gets a [Killed] row (e.g. multi-state PT/LWF, §02.3, EV-K12). **[Verified — mirror]** marks a finding that meets every Verified test except that the instrument was read from a third-party mirror; it must be pulled from the primary source before customer use (EV-058, EV-087). Neither qualifier changes what the grade licenses inside the build; both change what may be said outside it.

#### [Verified] — primary source, survived hostile re-check

A claim earns **[Verified]** only when it meets *all* of the following:

1. It rests on a **primary source** — a gazette notification, a notified rule, a government statistic from the issuing body, a filed financial statement (MCA/ROC), a regulator directive, a source repository or product documentation (for declared capability), or a vendor's own published page captured by both raw fetch and rendered read (§02.5). Not an aggregator, not analyst commentary, not a secondary summary, not a "widely-cited" table.
2. The source was **captured with URL and date** per §02.5, so a re-verifier can return to the exact artefact.
3. It **survived a hostile re-check** — a second, adversarial pass that actively tried to falsify it, including the corrigendum check of §02.4.
4. Where the source is a statute or rule, its **effective date and amendment status** were confirmed, not assumed.

**What [Verified] licenses:** the claim may be stated on a website, in a deck, or in a contract; it may be hard-coded into the engine; it may anchor a downstream decision. It is "safe to build on and safe to say out loud" — with three limits. A **[Verified — mirror]** claim must first be pulled from the primary source. A customer-facing legal or compliance claim is product surface with a named owner and needs counsel clearance (§23). A competitor claim needs clearance, a dated capture and a note of whether the product was executed or only its documentation read (§21).

**What [Verified] does not license:** permanence. A verified statutory claim carries a re-verification date (§02.6). Verified-as-of-a-date is the actual guarantee.

Worked example — a claim that earns it:

> "EPFO shows 24,18,266 registered establishments against 7,66,254 contributing as on 31.03.2024" **[Verified]** — sourced to EPFO's own published annual statistics, captured with URL and date, cross-checked against the members figure (7.37 Cr contributing UANs) for internal consistency, and used deliberately to *reject* the larger registered-establishment denominator (Source: EPFO Annual Report / provisional statistics, as-on 31.03.2024). The verification survived because it was the conservative reading, not the flattering one. Note the tell: the flattering number (24.18 lakh) and the verified number (7.66 lakh) were *both in the same source*. Verification here was not "find a number" — it was "pick the honest one from a source that offered both."

Acceptance test for **[Verified]** (all must pass, else downgrade):

- A re-verifier given only the register row can re-open the exact artefact and see the same figure.
- The instrument's publication date, effective date, and amendment status are all recorded and distinct where they differ.
- A corrigendum/amendment search was run and its result (found / none-found, with date) is recorded.
- The number chosen is the conservative reading where the source offers a range or a rival figure.

#### [Hypothesis] — plausible, unvalidated, carries a mandatory kill criterion

A claim is **[Hypothesis]** when it is reasoned from verified inputs or inferred from supply-side data, is not yet contradicted, but is *not itself evidence*. The defining discipline: **every [Hypothesis] must carry a named kill-or-validation criterion** — a specific, observable test that would settle it, and a specific consequence if it fails. A hypothesis without a kill criterion is not a hypothesis; it is an opinion wearing a marker, and it is a defect.

The kill criterion has three required parts:

| Part | Requirement | Example (our ₹80–150 PEPM target, EV-006) |
| --- | --- | --- |
| **Method** | The concrete action that produces the settling evidence | Mystery-shop 6–8 CAs/bureaus for 20/50/100-employee monthly payroll across two city tiers (§20 V-01) |
| **Threshold** | The numeric or categorical line that flips the verdict | Real bureau price under ₹2,000/month |
| **Consequence** | What in the PRD breaks, and what replaces it, if the threshold is crossed | The ₹80–150 target collapses; re-anchor on the bureau's actual realised price. (Competitor *list* prices are not the hypothesis — they are [Verified], EV-027; the hypothesis is what *we* realise.) |

Every **[Hypothesis]** in this PRD is registered in the §20 validation plan with these three parts filled in. A hypothesis that appears inline but not in §20 is an orphan and must be reconciled.

**A good kill criterion is falsifiable, cheap, and pre-committed.** "Talk to some customers" is not a kill criterion; "mystery-shop 6–8 bureaus; if the median monthly quote for 50 employees is under ₹2,000, the ₹80–150 target is dead and pricing re-anchors on realised bureau price" is. The test is: *could this hypothesis actually lose?* If no realistic evidence would flip it, it is faith, not a hypothesis, and it must be re-worded until a loss condition exists.

**What [Hypothesis] licenses:** planning, sequencing, and prototyping *around* the claim, explicitly flagged. It may shape architecture (build the FBP data model even though attach monetisation is unvalidated). It may inform a range.

**What [Hypothesis] forbids:** entering a financial model, a customer-facing claim, or a contract. The pricing architecture (§18) is marked hypothesis in full and states plainly: "No number here may enter a financial model until the quote programme in §20 reports."

Worked example — a claim that stays [Hypothesis] and why it cannot be promoted:

> "A disciplined six-agent AI architecture costs ₹0.15–3.27 per employee per month" **[Hypothesis]** — the *ratio* underneath it (52.7× cheapest-to-dearest model spread) is **[Verified]** because it is a quotient of two published USD price cards and survived the FX correction that killed ₹83.3/USD (EV-007, EV-089; USD/INR ₹94.43 Sep 2026). But the *absolute* rupee figure rests on an engineering estimate of 23,675 input / 2,045 output tokens per employee-month with no empirical basis. Kill criterion (§20 V-04): instrument a real prototype against a real policy corpus; if measured tokens run 5× the estimate, free-bundled AI breaks at the low end and the metered-SKU line in §13 has to carry more weight. Same topic, two markers — because ratio and absolute have different provenance strength (§02.5). Note what this test cannot settle: inference is the *smallest* of four COGS lines, and the dominant one — supervised filing, per registration × state × filing type — is unsized (EV-088). No gross-margin figure follows from the token count alone (EV-K13).

#### [Killed] — was believed, now disproven, recorded so it stays dead

A claim is **[Killed]** when it was previously asserted (in this project's own research or in the market's common knowledge) and has since been *actively disproven* by a primary source or by exposing a fatal defect in its provenance. The kill is recorded deliberately, with the reason, because the single greatest risk to a research corpus that ran two sweeps is a dead claim clawing its way back into a later deck once the memory of why it died has faded.

A **[Killed]** entry must record:

1. **The dead claim, stated plainly** — the exact figure or assertion.
2. **The kill reason** — the primary source or the provenance defect that disproved it.
3. **The replacement, if any** — the correct value now in force, or an explicit "no replacement; this quantity is currently unsized."

Worked examples from the corpus (each already in §04/§20):

- "6 crore MSMEs as TAM" **[Killed]** — Udyam's 5.31 crore registrations are not employers with payroll obligations; using them as a denominator overstates the market by two orders of magnitude (Source: Udyam Registration portal statistics). Replacement: 7,66,254 contributing EPFO establishments.
- "₹83.3/USD" **[Killed]** — wrong by 13.4%. Replacement: ₹94.43 (Sep 2026), with FX treated as a strategic input at ₹90/95/100 (Source: RBI reference rate, Sep 2026).
- "85–98% device integration success" **[Killed]** — marketing from the vendor selling the integration fix, and round one applied the *floor* of a range as a mixed-fleet average. Replacement: **none** — device integration effort is currently unsized and needs a hardware spike. (This is the honest kill: not every dead claim has a live successor.)
- "$400 Multiplier EOR price" **[Killed]** — fabricated; not present in its own cited source. Replacement: the correct 2022 figure is $300, but the number is banned regardless because the provenance defect is disqualifying, not the value.

**Why "[Killed]" and not silent deletion:** deleting a dead claim leaves no immune memory. Six months later the same flattering number is re-derived by someone who never saw the kill, and it re-enters the model. The §20 "Numbers permanently banned from every model and deck" table is the enforcement surface for this — it is a killed-claims blocklist, and a claim on it is contraband regardless of who re-proposes it or how confidently.

A subtle but important kill class: **the value can be right and the claim still killed.** The $300 Multiplier figure, the "correct" replacement for the fabricated $400, is itself banned — because a number whose provenance was fabricated once cannot be laundered clean by finding a plausible substitute. The kill attaches to the *provenance failure*, not only to the digits. This is why the blocklist is keyed by claim, not by value: it prevents "but the real number is X" from re-opening a settled kill.

<!-- DIAGRAM: three-marker-decision-tree -->

#### The grading decision procedure

A claim is graded by walking this procedure in order. The first stop that applies wins.

1. **Was it previously believed and is now disproven by a primary source or a fatal provenance defect?** → **[Killed]**. Record claim, reason, replacement.
2. **Does it rest on a captured primary source that survived a hostile re-check including the corrigendum step?** → **[Verified]**. Record source, URL, date, re-verification date.
3. **Is it plausible, uncontradicted, but not itself primary-source evidence?** → **[Hypothesis]**. It cannot ship without a §20 kill criterion. Attach one or downgrade to a flagged open question.
4. **None of the above (bare assertion, aggregator-only, provenance unknown)?** → **Defect.** Treat as **[Hypothesis]** with the kill criterion "capture a primary source or delete," and flag for grading before the section is considered complete.

#### Composite claims inherit the weakest input's marker

Most claims worth writing down are not atomic; they are built from other claims. The market-size figure is a verified denominator times a modelled multiplier; the AI-cost figure is a verified ratio times an estimated token count. The grading rule for these is strict and non-obvious:

> **A composite claim can never be graded higher than its weakest load-bearing input.** A [Verified] input multiplied by a [Hypothesis] input yields a [Hypothesis] output — and the output must name *which* input is the weak one.

This is why "real India HRMS spend ₹2,100–3,900 Cr" is recorded as **[Verified] (inputs) + modelled (gross-up)**, not simply Verified: the ₹1,374 Cr aggregate of eleven filed statements is Verified (Source: 11 MCA/ROC filings by CIN), but the gross-up multiplier for unfiled and foreign vendors is a modelling assumption. The honest marker exposes the seam. A reader who wants a contract-safe number uses ₹1,374 Cr; a reader who wants a market-size *estimate* uses the range but knows the top of it is the softest part. Collapsing the two into one "₹2,100–3,900 Cr [Verified]" would launder a modelling assumption into a fact — exactly the failure the register exists to catch.

The mechanical consequence for the register: a composite claim's row lists *every* load-bearing input claim ID, and a tooling check can flag any composite whose marker exceeds `min(marker of its inputs)`.

#### The grading decision table — grade, qualifier and sub-state

The four stops above settle the grade. They do not settle the qualifier, and the qualifier is what decides where a claim may be used (§02.14). This table is the complete mapping the register applies, and each row is a condition set a grader can test from the capture record alone. Rows G1–G4 and G18–G20 settle the grade, first match wins. Rows G5–G17 add qualifiers to a [Verified] grade and are all applied, so one row can carry several — EV-018 rests on a mirror-read commencement notification *and* describes a provision not yet in force.

| # | Conditions (all hold) | Grade | Qualifier or sub-state written to the row | Rows that sit here |
| --- | --- | --- | --- | --- |
| G1 | Previously carried by this PRD or its research; now contradicted by a primary source, or its provenance is fatally defective | [Killed] | Kill row; every conclusion drawn from it gets a [Reversed] register entry | EV-K01–EV-K36 |
| G2 | The authoritative instrument does not yet exist | Ungraded | open | EV-004 |
| G3 | A capture was attempted and failed, and the failing tool is recorded | Ungraded | blocked — leaves only by re-capture with a different method | EV-009 until round five |
| G4 | Scoped capture work not yet done | Ungraded | undone | EV-015 |
| G5 | Primary instrument read from a third-party copy; every other Verified test passes | [Verified] | mirror | EV-058, EV-087, and the eight rows the host audit found read on a third-party host (EV-056, EV-057, EV-076, EV-077, EV-078, EV-080, EV-082, EV-083 — §02.7); EV-018 inherits it because its commencement date rests on EV-058 |
| G6 | Instrument read, but no live copy on the issuing body's own host located | [Verified] | provenance caveat | EV-060 |
| G7 | Instrument read; the provision is enacted but not in force | [Verified] | not in force — a claim about the text, never about a present duty | EV-063, EV-064 |
| G8 | The claim is a negative that cannot be proved | [Verified] | negative, dated — stated only as "we are not aware of any … as of <month year>" | EV-065, EV-072, EV-084 |
| G9 | The vendor's own statement about its product; the product was not exercised | [Verified] | claim posture — licenses "the vendor states", never "the product does" | EV-090 |
| G10 | Capability read from source code or product documentation; the product was not executed | [Verified] | declared capability | EV-031, EV-032 |
| G11 | The vendor's own page captured from an archive; the page is withdrawn | [Verified] | archived — a historical price, frozen | EV-022 |
| G12 | Central-sphere instrument read; the state-sphere position unread | [Verified] | central sphere — each state is a separate claim | EV-053, EV-054, EV-057 |
| G13 | A self-claim that has moved between captures | [Verified] | dated — every use carries the capture date | EV-016, EV-091 |
| G14 | The effect is read on a government portal and reconciles arithmetically; the amending instrument is not retrieved | [Verified] as to effect | instrument owed — the rate may be used, the instrument may not be cited | EV-014 (Karnataka) |
| G15 | Read against a document that a later revision has superseded; the revision is unread | [Verified] as to the document read | superseded revision unread — the claim may not be stated about the current revision | EV-017 |
| G16 | Primary instrument at the issuing host; hostile re-check passed; corrigendum search recorded, or not applicable to the source class (statistic, filing, vendor page) | [Verified] | — | EV-001, EV-002, EV-003, EV-010 |
| G17 | As G16, but the corrigendum search is not yet recorded | [Verified] | corrigendum owed — the rule version built on it cannot publish until the pipeline records the search (§02.10) | Every row whose *Corrig.-checked* column reads "owed" |
| G18 | The figure is read only through a secondary summary of an instrument whose identity is confirmed | [Hypothesis] | kill criterion is "read the instrument" | EV-012 (cap), EV-019 |
| G19 | Reasoned from Verified inputs, or an engineering estimate, or a modelled multiplier | [Hypothesis] | kill criterion with method, threshold and consequence | EV-005 (gross-up), EV-006, EV-008 |
| G20 | Bare assertion, aggregator-only, or provenance unknown | Defect, treated as [Hypothesis] | kill criterion "capture a primary source or delete" | — |

**What never reaches [Verified], whatever else is true.** The grader tests these before G5–G17 can apply:

- A competitor's statement of another vendor's price or capability — Pocket HRMS gives greytHR's entry price as ₹3,495 against greytHR's published ₹2,495 (§02.5; r5/03).
- An aggregator, review-site or practitioner table, including for a statutory rate (§02.4 topography).
- A later-round reading that omits an amending instrument the earlier round cited — the round-five S.O. 5319(E) reading (§02.4; conflict rule C3, §02.16).
- A vendor compliance calendar, vendor wiki page or portal banner offered as the rule. At most it is a lead, and at most [Hypothesis] when corroborated: round three found one vendor's Karnataka PT calendar wrong on both the due date and the filing authority (r3/02).
- A single-method capture of a vendor page (§02.5).
- A derived figure whose derivation does not name each input row and the basis chosen — which card, which billing term, which headcount (§02.15).
- A row graded and re-checked by the same identity (§02.5).
- A negative worded "there is no …". It is rewritten in G8 form before it is graded (Part D-16; §23.1.4).

**AC-EVR-08 · Qualifiers are written, not remembered.** *Given* a capture whose instrument copy was not fetched from the issuing body's host, *when* a grader proposes [Verified], *then* the register writes the `mirror` qualifier, opens an entry in the mirror-sourced register (§02.7) and refuses an unqualified [Verified].

**AC-EVR-09 · Dual capture before a vendor row is Verified.** *Given* a `vendor_page` capture whose methods lack either a raw fetch with a comment-node scan or a rendered read — or lack the vendor's config file where prices are script-injected — *when* [Verified] is proposed, *then* the proposal is refused and the missing method is named (§02.5).

**AC-EVR-10 · Negatives are dated.** *Given* a claim of absence — a law, a case, a designation — *when* it is graded, *then* it is stored only as "we are not aware of any … as of <month year>" with a re-check owner and date, and a "there is no …" wording fails the grade.

#### Negatives, bounded and unbounded — how the register grades an absence

G8 governs a negative that cannot be proved. Most absences in this register can be proved, because what was searched is finite: one instrument read whole, one source tree, one set of catalogues, one page element on one date. Treating every absence as unprovable would bury some of the strongest findings in the register — the Frappe and Tally parity rows are absences — under the weakest wording. Treating every absence as provable is how "there is no …" reaches a customer. The register therefore classifies an absence by what was searched before it grades it, and AC-EVR-10 applies to the unbounded class only.

<!-- DIAGRAM: evidence-ledger-negative-claim-classes -->

| Class | What was searched | Rows that sit here | The capture must record | Wording licensed | Dies when |
| --- | --- | --- | --- | --- | --- |
| **N1 · instrument-bounded** | One instrument, read in full | EV-059 (DPDP s.2(t): no sensitive category); EV-066 (Chapter III: exactly four rights, none against automated decisions); EV-086 (IRDAI ICS Guidelines 2023: no localisation, MeitY or STQC requirement) | The whole text read, not a matched clause; the search terms run over the full extraction — for EV-086, a case-insensitive search for localis, localiz, data residency, MeitY and STQC across all 175 pages (r5/01 finding 19); the amendment search on that instrument | "The instrument contains no X", naming the instrument and its version | An amendment to that instrument (L15) |
| **N2 · corpus-bounded** | A finite corpus, enumerated | EV-031 (the Frappe HR version-16 tree: word-boundary searches for ECR, EDLI, EPS and UAN return zero, with ERPNext version-16 and the india-compliance app searched the same way — r3/01 findings 1–3); EV-032 (five TDL catalogues show no payroll, PT or LWF add-on — r5/01 finding 27); EV-043 (all 1,869 PDFs on EPFO's circulars index — r5/02 finding 17); EV-030 (six vendors' marketing and product surfaces, not documentation or a live tenant — r5/03 finding 32) | Corpus identity and snapshot — repository and branch or commit, catalogue names, index URL and item count; the terms and the match rule; what was deliberately not searched | "No X was found in <corpus> as of <snapshot or date>", with the corpus in the sentence | A new snapshot shows X — a new release, a new catalogue entry — by L15 on the row and a new row by L1 |
| **N3 · state-bounded** | The state of one element on one date | EV-046 (Protean's Form 138 Q4 regular anchor points nowhere and the correction anchor's link is empty — r5/02 findings 19–20) | The element, its value and the capture date — never a date the page renders for itself (capture failure CF2, §02.5) | "As re-checked on <date>, X is not released" | The element changes, by L15 on the event (TS-19) |
| **N4 · unbounded** | All law, all judgments, all designations | EV-065 (as to SDF designation), EV-072 (a law requiring biometric attendance), EV-084 (algorithmic-hiring case law) | A dated search log with sources, queries and coverage. EV-084's search ran on one third-party case-law index (r5/05 finding 34); that coverage limit is recorded with it | Only "we are not aware of any X, as of <month year>" (G8; Part D-16) | A law, judgment or designation is found (L11) |

Three consequences follow for the build and for copy.

1. **N2 is where competitor claims live, and its corpus names the product and version.** "Frappe HR v16 contains no state PT slab table" is an N2 sentence; "Frappe does not support multi-state PT" is not, because it names no version, and it is the shape of claim a new release falsifies without anyone noticing. The §21.3 parity table carries its corpus for the same reason.
2. **A bounded negative can be stronger than a positive.** EV-086's null is a full-text search of the whole instrument with its terms recorded, and EV-043's is an enumeration of an entire index. Both are graded [Verified] without a `negative_dated` qualifier, because the space searched is closed.
3. **The class is fixed by the search, not by the topic.** "The IRDAI ICS Guidelines 2023 contain no localisation requirement" is N1 (EV-086). "No Indian regulator requires localisation of HR data" would be N4, and it is not a claim this register holds — both localisation absolutes are killed (EV-K19).

Edge cases the classification must survive, each drawn from this corpus:

| Situation | Case | What the register does |
| --- | --- | --- |
| An N2 corpus gets a new snapshot and X is still absent | A later Frappe release searched again with no state PT table found | The row is re-dated to the new snapshot by L13; it is not a new claim |
| An N1 instrument is amended in provisions the search did not touch | An amendment to the IRDAI Guidelines outside their data-location text | The search is re-run on the amended text before L13; a search on the superseded text does not carry over |
| The N3 element disappears rather than changes | EPFO's printed manual URLs died with the domain move (EV-045) | The capture is `blocked_fetch`, not "released" and not "still unreleased"; the task stays open (RT4) |
| The N4 search surface refuses the fetch | Round four could not fetch meity.gov.in and indiacode.nic.in programmatically, so no amendment between November 2025 and September 2026 could be excluded (r4 critic) | The search is recorded as blocked with its tool; the negative keeps its last good date and is never re-dated on a blocked search |
| A bounded search covers one of several places the fact could live | EV-086 covers the ICS Guidelines; policy-record localisation sits in the 2015 Records Regulations | The row names the instrument searched and the one found elsewhere; the absence is never widened to the regulator |

**AC-EVR-31 · A negative names its search.** *Given* a claim of absence proposed for [Verified], *when* its capture holds no search-space record — the instrument, the corpus with its snapshot, or the element with its date — *then* it is classed N4 and can be stored only in the "we are not aware of any … as of" form.

**AC-EVR-32 · A bounded negative carries its bound outside the PRD.** *Given* an N2 or N3 row cited on any surface outside this PRD, *when* the sentence does not name the corpus and its snapshot, or the element and its date, *then* the release gate blocks it (lint L-23).

#### Qualifier compatibility — which qualifiers a row may carry, and what clears each

A qualifier is written by the register from the capture record (AC-EVR-08), so the store needs a rule for which qualifiers are legal on which claim classes (§02.12), which require another, and which event removes each. Without it a grader could attach `archived` to a statute or `central_sphere` to a vendor page, and the usage matrix (§02.14) would then license the wrong surface.

| Qualifier | Permitted on | Requires | Excludes | Cleared by | Example |
| --- | --- | --- | --- | --- | --- |
| `mirror` | Statutory, file-format, portal-behaviour and legal classes | An open `MirrorPull` | — | L9, on a primary fetch that matches (§02.20) | EV-058; EV-018 by inheritance; the host-audit rows |
| `provenance_caveat` | As `mirror` | An open `MirrorPull` listing the hosts searched | — | L9, once a copy on a primary host is located | EV-060 |
| `not_in_force` | Statutory and legal classes | A commencement rule object (§23 FR-LEG-008) | — | L10 at commencement | EV-063, EV-064; EV-018's text component |
| `negative_dated` | `legal_negative`, or the negative component of a statutory row | An N4 search log (AC-EVR-31) | — | Never cleared; re-dated at each search, or L11 | EV-065 (component), EV-072, EV-084 |
| `claim_posture` | `competitor_capability` | A capture of the vendor's own statement | `declared_capability` on the same component | L12, on an executed test | EV-090 |
| `declared_capability` | `competitor_capability` | A repository tag or documentation URL, dated | `claim_posture` on the same component | L12 | EV-031, EV-032 |
| `archived` | `competitor_price`, `market_figure` | An `archive_snapshot` of the vendor's own page | `dated` — an archived figure is frozen, not moving | Never — it is historical | EV-022 |
| `dated` | `competitor_price`, `competitor_capability`, `market_figure` | Captures that differ over time, or an `on_use` trigger | `archived` | Never — every use carries the date | EV-016, EV-091 |
| `central_sphere` | Statutory classes | `sphere = central` | — | Never — a state-sphere reading is a separate row | EV-053, EV-054, EV-057 |
| `as_to_effect` | `statutory_rate`, `statutory_deadline` | `instrument_owed` | — | The instrument is retrieved and its corrigendum search recorded (TS-18) | EV-014 (Karnataka) |
| `instrument_owed` | Statutory classes | `as_to_effect`, or `mirror` where the copy read was a summary rather than the instrument | — | As `as_to_effect` | EV-014; EV-057 |
| `superseded_revision_unread` | Any class | The superseding revision's identity | Use as a rule source (§02.10) | The current revision is read | EV-017 |
| `corrigendum_owed` | Statutory and file-format classes | `corrigendum_search.status = owed` | — | The search recorded as `found` or `none_found` (§02.20) | Every row marked "owed" |
| `by_reference` | Any class | `detail_at` or `extends` pointing at live rows | — | Never — the row stays a pointer | EV-009 |

**AC-EVR-33 · Illegal qualifier sets are refused on write.** *Given* a row of class `competitor_price`, *when* a grader writes `central_sphere` or `not_in_force`, *then* the write is refused; and *given* a row carrying `as_to_effect` without `instrument_owed`, or `archived` together with `dated`, *then* it fails lint L-24.

### 02.3 The one-directional retraction finding

This is the most important methodological result in the document, and it changes how every other line should be read.

#### What was measured

Five research rounds (r1–r5) have run against this market. The first produced a confident, coherent narrative. The second, run adversarially against the first, dismantled much of it: **28 named strategic conclusions were killed outright**, and **roughly ninety individual claims were retracted across the first two rounds** (38 agents, ~5.6M tokens, with a bias-check pass on every dimension — Source: Draft 1 provenance line, §01). The count itself is soft: the round-two critic tallied "roughly sixty" retractions across the six dimensions it received, one of them truncated (r2 critic). The register carries ~90 as the Draft 1 figure and ~60 as the critic's tally, unreconciled; neither the direction finding below nor the coin-flip arithmetic depends on which is right. The round-one-to-two retractions were then examined not one at a time but *as a distribution* — and the distribution is the finding. Rounds three to five re-verified earlier claims against source (repository code, portal help files, gazettes, raw vendor HTML); what they found is recorded after the table, because it changes how the finding may be applied.

#### The direction of every round-one-to-two retraction

Every round-one-to-two retraction moved the same way. Sorted by the axis of the error (round-five qualifications and the one reversal are marked in the rows):

| Retraction axis | The optimistic claim that died | The corrected direction |
| --- | --- | --- |
| **Market size** | India HR-tech TAM $23.32bn → $38.36bn | A global figure mislabelled as India; real spend ₹2,100–3,900 Cr (**[Verified]** inputs + modelled gross-up, EV-005) — smaller |
| **Denominator** | 6 crore MSMEs; 24.18 lakh registered establishments | 7.66 lakh *contributing* establishments — smaller |
| **Beachhead emptiness** | 20–50 is a "competitive vacuum" | Over-served by cheap product (Zoho, Kredily, HivePayroll, RazorpayX) — more contested. *Qualified in round five:* every priced vendor bills a 50-employee minimum block (EV-026), so the 20–50 band is over-served at ₹0 but structurally overcharged at list |
| **Price floor** | A paid product has room at the low end | Floor is ₹0, defended by capitalised incumbents — lower. *Qualified in round five:* the ₹0 floor covers computation only — freemium vendors charge for outputs (EV-029) — and the priced mid-market clears ₹80–200 PEPM at 50 employees (EV-027) |
| **AI as revenue** | AI is a monetisable differentiator | Seven vendors price HR AI at zero — already occupied |
| **Differentiators** | Multi-state PT/LWF; investment-declaration workflow | Investment-declaration: shipped free by Zoho — already occupied. Multi-state PT/LWF: "shipped free by Frappe" — **[Reversed]** in round three: Frappe v16 contains no Indian state name, PT slab table or LWF engine, and TallyPrime has neither a state PT slab table nor an LWF engine (EV-031, EV-032, EV-K12). It is a genuine differentiator |
| **Enterprise reachability** | Enterprise is a launch segment | Arithmetically closed ~3 years by RFP incumbency scoring — later |
| **Timing** | "Rules still draft, therefore urgent" | Rules settled 8 May 2026 — the window already moved |

Eight independent axes; eight moves in the same direction. If the errors were random noise in a careful process, they would scatter — some claims too pessimistic, some too optimistic, roughly balanced. They did not scatter. **The process had a systematic bias toward the answer the founder wanted to hear.**

A useful way to feel the force of this: treat each axis as a coin flip between "error was optimistic" and "error was pessimistic." Under random error, eight independent flips landing the same way has probability (1/2)^8 ≈ 0.4%. The one-directional outcome is roughly a 1-in-250 event *if* the process were unbiased. It is not a 1-in-250 fluke; it is evidence the process was not unbiased. Drop the Differentiators axis, half of which was later reversed, and seven same-direction flips is still (1/2)^7 ≈ 0.8% — the round-one optimism finding survives.

**[Reversed] in part — "every retraction moved the same way" does not hold for the corpus as a whole.** It holds for rounds one to two. Rounds three to five re-verified against source and found that round two's corrections had themselves overshot in places: multi-state PT/LWF was killed on a Frappe claim that is false at source (EV-K12); an earlier single-figure price ceiling of ₹45–50 PEPM was too low — the verified band sits higher (EV-K20, EV-027); Keka's pricing, graded unobtainable, was obtainable all along (EV-K21); and the 20–50 band turned out structurally overcharged by a 50-seat floor (EV-026). Other late-round kills continued the original direction — the inference-margin claim (EV-K13), the day-one DPDP consent reading (EV-K14), "we file for you" (EV-K24). The measured quantity that survives every round is the error *rate*: round three killed 12, 13, 14 and 15 findings across the four dimensions that reported a count, and round four 7, 8, 11 and 7 (r3, r4 critics). On that rate, any round-one or round-two claim not yet re-checked at source is roughly **70–75% reliable, in either direction** (r3 critic) — a planning prior with stated limits, set out with the round-by-round provenance in §02.7.

<!-- DIAGRAM: retraction-direction-histogram -->

#### Why the direction matters more than the count

Ninety retractions is a large number, but the count alone could be read as "the second sweep was thorough." The *direction* forecloses that comforting reading. A one-directional error signature is the statistical signature of motivated reasoning, not of sloppiness. And it has a corollary that is the actual operative rule of this document:

 **[Verified]** — The surviving medium- and low-confidence claims came from the same biased generator

Every claim still sitting at **[Hypothesis]** or at a soft **[Verified]** was produced by the identical process that generated ninety one-directional mistakes. There is no reason to believe the biased generator suddenly became unbiased on the claims that happened to survive. The survivors are not a clean residue; they are the un-audited remainder of a process with a known lean. **Business-case claims — market size, denominator, timing, enterprise reachability, AI revenue, our own price — should be discounted in the same direction as the retractions: assume the real number is smaller, the real timeline later, the real price lower.** The r3–r5 critics and synthesis reverse none of the round-two kills in those classes.

The discount does **not** have a safe direction for competitor-capability and competitor-price claims. There, round two's pessimistic corrections were themselves partly wrong (EV-K12, EV-K20, EV-K21): the rule is to re-check at source — repository, product documentation, raw and rendered vendor page — before relying on the claim either way, and to treat an unrechecked early claim as roughly 70–75% reliable.

This is the instruction a reader should carry into every other section. When §18 offers our ₹80–150 PEPM target **[Hypothesis]**, the base case is not the midpoint — it is the low end, bounded below by the verified value floor near ₹50 PEPM (EV-027). When any section offers a range for a business-case quantity, the honest planning value is the pessimistic end of it until a §20 validation says otherwise.

#### The confidence haircut schedule

To make the discount operational rather than rhetorical, the reader should apply the following haircut when a marked claim feeds a plan or model. These are planning discipline, not measured error bars — but they encode the direction of the known bias and force it into the arithmetic.

| Marker | Feeds a customer claim / contract / hard-code? | Feeds a financial model? | Planning haircut to apply |
| --- | --- | --- | --- |
| **[Verified]**, re-verification date in future | Yes | Yes | None — but carry the re-verify date |
| **[Verified]**, re-verification overdue | No | No | Treat as [Hypothesis] until re-checked |
| **[Hypothesis]** with a live §20 kill criterion | No | No | Use the pessimistic end of any range; assume the flattering direction is wrong |
| **[Hypothesis]** with no kill criterion (defect) | No | No | Do not use; escalate to grading |
| Any round-one or round-two claim not yet re-checked at source | No | No | Roughly 70–75% reliable in either direction (§02.3); re-check before use |
| **[Killed]** | Never | Never | Contraband — on the §20 blocklist |

The asymmetry is deliberate. Nothing at Hypothesis reaches a contract or a financial model — that boundary is absolute, and it is why §18 (pricing, channel and migration) is gated behind the §20 programme in its entirety.

**Worked haircut.** Price is a two-anchor structure, not a single figure (EV-K20): a value floor near ₹50 PEPM set by Qandle and greytHR at 50 employees, and a mid-market clearing band of ₹80–200 PEPM sustained by Zimyo, HROne and Keka (EV-027, **[Verified]** as list prices). Our ₹80–150 target sits inside the band and is **[Hypothesis]** (EV-006). A naive plan takes the ₹115 midpoint of the target. The haircut schedule forbids the midpoint twice over: first because Hypothesis cannot enter a financial model at all, and second because *if* it informs a range for architecture sizing, the direction-of-bias rule pins the planning value to the ₹80 floor of the band, with the verified ~₹50 value floor as the stress case. The gap between the naive ₹115 and ₹80 is a 30% revenue swing on the same evidence; to the ~₹50 floor it is 57%. That swing is the cost of skipping the haircut, and it is exactly the size of error that sinks a seed plan.

#### The confidence census — reading the portfolio, not the line

<!-- DIAGRAM: confidence-census-distribution -->

The one-directional finding is a statement about a *distribution*, so the register must be readable as a distribution and not only claim-by-claim. The census below is the marker breakdown of the full register (§02.7 — 92 live rows EV-001…EV-092 and 36 killed rows EV-K01…EV-K36), together with the corpus-level counts the whole document rests on. Two live rows carry split markers (EV-005, EV-012) and are counted once under each marker, so the live column sums to 94. It is the portfolio view a reader should hold before trusting any single line.

| Marker / state | Count in the register | What it means for planning |
| --- | --- | --- |
| **[Verified]**, live | 87 — 15 from EV-001…EV-020 (EV-001/002/003/007/009/010/011/013/014/016/017/018/020, plus EV-005 inputs and EV-012's 2× rate) and all 72 of EV-021…EV-092 | Contract- and hard-code-safe *as of capture date*; each carries a re-verify trigger. Sub-states that restrict use: 12 mirror or provenance-caveat rows — EV-018, EV-058, EV-060 and EV-087, and the eight the host audit found read on a third-party host (EV-056, EV-057, EV-076, EV-077, EV-078, EV-080, EV-082, EV-083; §02.7) — pull from the primary source before customer use, 3 carrying a not-yet-in-force component (EV-063, EV-064, and EV-018's s.7(i) text — worked grading E), 1 claim posture only (EV-090), 2 declared capability (EV-031, EV-032), 1 archived (EV-022), 2 dated self-claims (EV-016, EV-091), 3 central sphere only (EV-053, EV-054, EV-057), 3 rows carrying a dated negative stated as "we are not aware of any" (EV-065 as to designation, EV-072, EV-084), 1 with its amending instrument unretrieved (EV-014, Karnataka), 1 read against a revision since superseded (EV-017) |
| **[Hypothesis]**, with kill criterion | 5 (EV-005 gross-up, EV-006 our price, EV-008 AI absolute, EV-012 144-hour OT cap, EV-019 meal/gift perquisite figures) | Architecture-shaping only; barred from every financial model until §20 reports |
| **Ungraded (blocked)** | 0 — EV-009 was resolved by re-capture (EV-021–EV-027); its blocked grading is [Reversed] | The state is kept: a claim that cannot be captured must still record *which tool failed* (§02.8 grading B) |
| **Ungraded (open)** | 1 (EV-004 ESI after the ~21.11.2026 savings expiry) | Authoritative instrument does not yet exist; forces a fail-safe, not a default (§02.8) |
| **Ungraded (undone)** | 1 (EV-015 state PT/LWF dataset) | Known build-dependency work, not a blocker; PT verified at state primary source only for Maharashtra and Odisha, with Karnataka's effect verified (EV-014); no LWF figure verifiable from any government source (r2); greenfield in both incumbents (EV-031, EV-032) |
| **[Killed]** | 36 (EV-K01…EV-K36) | EV-K01–EV-K11 from the early rounds, on the §20 blocklist; EV-K12–EV-K36 one per corrections-ledger kill item |

Corpus-level counts sit above the register and govern the reading of every unmarked survivor: **28 named strategic conclusions killed** and **~90 individual claims retracted** across rounds one and two (Source: Draft 1 provenance line, §01); then roughly 13 findings per dimension killed on source re-verification in round three and 33 across four dimensions in round four (r3, r4 critics). The census makes three things operative:

1. **Kills outnumber live Hypotheses by roughly 7:1.** A reader who treats the surviving Hypotheses as "probably fine" is ignoring a base rate: in this corpus, claims died far more often than they survived. Most kills moved the flattering claim down; a minority (EV-K12, EV-K20, EV-K21) corrected an earlier over-correction. The census is the base rate made visible.
2. **Ungraded is a first-class column, not a rounding error.** Two live rows are Ungraded (open / undone). A register that folded these into Hypothesis would report 7 Hypotheses where there are 5 — inflating apparent knowledge by hiding the holes. The census refuses that laundering.
3. **The Verified majority is dated, not eternal.** Every Verified row carries a re-verify trigger, and several have *dated* forced re-checks that can flip them by operation of the calendar — EV-002 (EPF/ESI savings expiry ~21 Nov 2026), EV-046 (Form 138 Q4 format), EV-058/EV-060 (DPDP commencement on or about 13 May 2027), EV-088 (WhatsApp INR billing by 31 Dec 2026). A census taken after 21 Nov 2026 will not look like this one — which is the point of §02.6.

The lint that keeps the census honest: **the count of inline markers in the prose must reconcile to the count of register rows.** An inline **[Verified]** with no EV-row, or an EV-row with no inline appearance, is an orphan and a defect (the same reconciliation the §20↔EV-K crosswalk enforces for kills, §02.7).

#### Scheduled movements in the census

The census moves on known dates as well as on findings. Each date below is already a re-verify trigger (§02.6); this table adds which census cells the trigger can move, so a planner reading the census before a date knows which counts are about to change and in which direction they can go.

| Date | Rows that can move | Transitions possible | Census cells affected |
| --- | --- | --- | --- |
| ~21 November 2026 | EV-004; EV-002 | EV-004 by L3 to [Verified] or [Hypothesis] if a successor is notified, otherwise it stays Ungraded (open) and the fail-safe holds; EV-002 by L13 (held) or L15 (a further corrigendum) | Ungraded (open) 1 → 0, or unchanged |
| 31 December 2026 and 1 January 2027 | EV-088 (WhatsApp INR billing); EV-089 (the scheduled Gemini price change) | L13 on each if the event lands as captured; the EV-008 absolutes re-derive (§02.20 derivations) | None if both hold as captured |
| On or about 13 May 2027 | EV-063, EV-064; EV-018; EV-061; EV-060; EV-058 | L10 on EV-063 and EV-064 as they commence; EV-018's clock clause resolves; EV-061 ("s.43A compensation is live today") is falsified by DPDP s.44(2) omitting s.43A and dies by L15, with a new row for the post-omission position; EV-060's survival is a counsel question (Part D-12), so its transition waits on the counsel register rather than on the date | Not in force 3 → 0; one kill added; the caveat count moves only on counsel's answer |
| Before 31 May 2027, on Protean's release | EV-046 (and EV-011) | L15 by event when the Q4 anchors carry artefacts (TS-19) | [Verified] count unchanged; the replacement enters at the next ledger revision |
| On the Transgender Persons Amendment's commencement notification | EV-080 | L13 with the version flag switched; no grade change | None |

Two of the five dates are expected to add a kill without anyone having made an error — EV-061 on the DPDP commencement and EV-046 on Protean's release — which is the Verified → Killed transition working as designed (§02.6).

#### Census arithmetic — how a transition moves the counts

The census is not a tally someone keeps. It is a **fold over the grading-event log**: the count at any knowledge time is what you get by replaying every event recorded at or before it (§02.21, `census`). That makes each transition of §02.6 a defined delta, and it makes a hand-adjusted count a defect — the failure mode being an editor who kills a claim in the prose, forgets the census, and leaves a document whose portfolio view is one row more confident than its own register.

Two counting conventions have to be fixed first, because they are the two places a reader can mis-add the table:

- **The series count and the grade count are different quantities.** "92 live rows; 36 kill rows" (§02.21) counts *identifiers* — the EV-### series and the EV-K## series. "[Verified] 87; [Hypothesis] 5" counts *grades*, over marker components. Killing a live row moves it between grade cells; it never removes its identifier, because ER1 makes identity permanent and the trace in §02.6 needs the dead rule version queryable for retrospective runs.
- **Grade cells sum over components, not rows.** EV-005 and EV-012 each carry two differently-graded components, so the grade cells sum to 94 against 92 identifiers. A census that summed to 92 would have silently picked one component per row — which is exactly the collapse the split-marker rule exists to prevent (§02.2).

| Transition (§02.6) | Grade cells | Qualifier and state cells | Series counts | Notes |
| --- | --- | --- | --- | --- |
| L1 | — | — | — | The claim has no row yet; an `IdRequest` opens. Nothing enters the census until a ledger revision registers it |
| L2 | [Hypothesis] +1 | Ungraded −1 in its sub-state | — | — |
| L3 | [Verified] or [Hypothesis] +1 | Ungraded (open) −1 | — | The EV-004 branch; if no successor is notified, no cell moves at all |
| L4 | [Verified] +1 | Ungraded (blocked) −1 | — | [Reversed] register +1 where a conclusion rested on the block |
| L5 | +1 per jurisdiction registered | Ungraded (undone) −1 only when the parent's scope is exhausted | live +n | The delta lands at the ledger revision that registers the rows, not at the capture that justified them |
| L6 | [Hypothesis] −1, [Verified] +1 | — | — | — |
| L7, L11, L15 | the row's grade cell −1, [Killed] +1 | qualifiers travel with the row | series unchanged | A killed row keeps its EV-### identity; the EV-K series grows only when a revision assigns a kill ID for a *new* dead claim |
| L8, L13, L17 | — | — | — | A refinement, a held re-verify and a refused resurrection move nothing |
| L9 | — | mirror or provenance caveat −1, and −1 again for each row inheriting it | — | Closing EV-058's pull moves the cell by two, because EV-018 inherits it |
| L10 | — | not in force −1 | — | Three components sit here today (§02.3 census) |
| L12 | — | claim posture or declared capability −1, observed +1 | — | No grade cell moves |
| L14 | — | — | — | **Staleness is not a grade.** It is a daily report and a planning demotion (AC-EVR-11); a census that moved on it would misreport enforcement |
| L16 | the weaker component's cell +1 | components +1 | — | The stronger component keeps the cell the whole row held |
| L18 | — | — | — | [Reversed] register +1 |
| L19 | — | the qualifier's cell +1 | — | The host audit was eight L19 events at once: mirror and caveat 4 → 12 |
| Ledger revision | +1 per new row, in its graded cell | as each row's qualifiers require | live or kill +n | The only transition that changes a series count upward |

Five invariants follow, and each is checkable against the event log alone:

- **CN1 · The census is computed.** No cell is ever written directly. `census(as_of)` replays the log; a printed census that the log does not reproduce fails the seed check (AC-EVR-46).
- **CN2 · Grade cells sum over differently-graded components.** Their total equals the count of differently-graded components (94), never the identifier count (92). A component that differs only in its qualifiers — EV-014's three states, EV-018's three — adds a qualifier cell and never a grade cell (CN5).
- **CN3 · Operational states are not grades.** Stale, overdue, owed-search, open-pull and backlog-band are reported in §02.18's health measures, never in the census. Mixing them would let a bookkeeping lapse read as a downgrade.
- **CN4 · Identifiers only ever increase.** Killing, splitting or reversing a row never reduces the series count; a shrinking series is a deletion, which the permissions table forbids outright (§02.21).
- **CN5 · Grade and qualifier cells move independently.** L12 and L19 move a qualifier with no grade change; L6 moves a grade with no qualifier change. A tool that derives one from the other will misreport both.

**Worked census delta — the EV-012 split.** Take the register counted immediately before the L16 event that split EV-012 into a rate and a cap, with every other row held constant, and immediately after it:

| Cell | Before | After | Why |
| --- | --- | --- | --- |
| Marker components | 93 | 94 | The split creates a second component (CN2) |
| [Verified] | 87 | 87 | Unchanged: the row's Verified appearance moves from the whole row to its `rate` component |
| [Hypothesis] | 4 | 5 | The `cap` component enters at [Hypothesis] with V-17 as its kill criterion |
| [Killed] | 35 | 36 | EV-K15 records the over-grade — the kill is of the *grading*, not of the 2× rate |
| Row grade (ER4) | Verified | Hypothesis | The row as a whole now reads at its weakest component, which is why a whole-row citation of EV-012 fails L-16 |

Note what did *not* move: no rule version's `enforcement_mode` changed on the rate rows, and no payroll run changed, because nothing ever blocked on the cap (§02.21 worked event). A census delta and an engine effect are different things, and the register is the only place that says which is which.

**AC-EVR-47 · The census reproduces from its events.** *Given* the grading-event log at knowledge time T, *when* `census(as_of = T)` is computed, *then* every cell equals the value printed for that version of this section, the grade cells sum to the component count and not the identifier count, and no cell was written by hand; a mismatch names the events that cannot be reconciled (TS-66, TS-67).

### 02.4 The corrigendum standing rule

This is the procedural finding that the two sweeps paid for the hard way, and it is elevated to a **non-negotiable capture step** because its absence produced the single largest verified error in the entire corpus: two readings in the first two rounds reached *opposite conclusions* on the November 2026 EPF cliff — and a round-five reading reproduced the wrong one.

#### The rule

> **No compliance or competitive claim ships to a website, deck, or contract without a gazette, notified-rule, filing, or regulator citation captured with URL and date — and no statutory claim is [Verified] until it has been checked for an amending corrigendum.** "Check for a corrigendum" is a mandatory step in verification, not a nicety.

#### Why — the worked failure

The EPF Act 1952 is repealed with effect from 21 November 2025. Code on Social Security s.164(2)(b) saves the EPF Scheme 1952, EDLI 1976, EPS 1995, and the ESI rules and schemes for one year, expiring on or about 21 November 2026 (Source: Code on Social Security, 2020, s.164(2)(b) — see §06). The successor on the EPF side is the Employees' Provident Funds Scheme, 2026, with 12% re-notified retrospectively to 21.11.2025 by **S.O. 3582(E)** of 01.07.2026 (Source: MoLE gazette S.O. 3582(E), r2).

Round one read the commencement notification and concluded one thing. A round-two research report read what looked like the same notification and concluded the *opposite* — no cliff, EPF Act still live. Round two's verifier reconciled them and exposed the trap:

 **[Verified]** — The indiacode.nic.in footnote reproduces a superseded enumeration

The Code on Social Security was commenced by **S.O. 5319(E)** of 21.11.2025, whose original enumeration left out item 3 of s.164(1) (the EPF Act repeal) and clause (b) of s.164(2) (the one-year savings sunset). **Corrigendum S.O. 5936(E)** of 19.12.2025 substituted the entries at Sl. Nos. 2, 3, 7 and 8, bringing both into force from 21.11.2025 except slices already in force since 2023 (r2). indiacode.nic.in's bare-Act footnote still reproduces the *uncorrected* S.O. 5319(E) enumeration. Verifying against indiacode — or against the original gazette PDF alone — reproduces the exact error, because the corrigendum lives in a *separate* gazette instrument and does not propagate back into the footnote of the document it amends (Source: indiacode.nic.in consolidated bare-Act view vs egazette.gov.in S.O. 5936(E), CG-DL-E-20122025-268694, r2). One reading checked the base instrument and stopped; the other found the corrigendum. The claim flipped entirely on whether the verifier took one extra step. **[Reversed]:** earlier versions of this section named S.O. 3582(E) as the corrigendum; it is the separate retrospective 12% re-notification (r2).

**The trap sprang again in round five.** A round-five registers study read S.O. 5319(E) verbatim, did not cite S.O. 5936(E), and concluded at medium confidence that s.164(2)(b) was never commenced — so no one-year sunset, ESI regulations surviving under s.164(2)(a), and the EPF Act 1952 unrepealed (r5/04). That reading rests on the uncorrected enumeration and is **not adopted**: this PRD keeps the cliff. It is also the case where the usual rule that a later research round supersedes an earlier one must not be applied mechanically — a later reading that omits the amending instrument is not a later reading of the law. A definitive read of S.O. 5936(E) together with S.O. 2060(E) is owed under §20 V-08 before the ~21.11.2026 date.

The general failure mode this exposes: **a source can be primary, correctly cited, captured with URL and date — and still wrong, because it has been amended by an instrument that does not appear on its face.** Primary-source discipline alone is insufficient. Amendment-tracking discipline is the missing half.

#### The full cliff timeline, as a verifier must hold it

The trap is easier to avoid once the sequence of instruments is laid out, because the corrigendum is only detectable if you know which dates should *not* line up:

| Date | Event | Instrument | The tell |
| --- | --- | --- | --- |
| 21 Nov 2025 | Labour Codes in force | Four commencement notifications, S.O. 5319(E)–5322(E) | The Social Security and Wages commencements are partial, not whole-Code (r5) |
| 21 Nov 2025 | Original enumeration omits s.164(1) item 3 and s.164(2)(b) | **S.O. 5319(E)** | Still shown in the indiacode footnote — the stale artefact |
| 21 Nov 2025 | 12% rate *effective* from here | (backdated by S.O. 3582(E)) | Effective date precedes publication — the retrospective tell |
| 19 Dec 2025 | Corrigendum substitutes Sl. Nos. 2, 3, 7, 8: EPF Act repeal and the one-year savings clause in force from 21.11.2025 | **S.O. 5936(E)** | Published four weeks after the base, operative from the base date — the corrigendum tell |
| 08 May 2026 | Central Rules under all four Codes notified | MoLE Central Rules | "Rules are settled," not draft — kills the urgency framing |
| 1 Jul 2026 | 12% re-notified for Scheme 2026 | **S.O. 3582(E)** | Publication date ≠ effective date (21.11.2025) |
| ~21 Nov 2026 | One-year EPF/ESI savings window expires | CoSS s.164(2)(b) | EPF has a successor (Scheme 2026); **ESI does not yet** |

The two dates that must differ — effective (21.11.2025) and publication (19.12.2025 for the corrigendum; 01.07.2026 for the re-notification) — are the amendment fingerprint. A verifier who records only one date cannot even represent the trap, let alone catch it. This is why the capture schema (§02.5) demands publication, effective, *and* amendment dates as separate fields.

#### The amendment classes a verifier must check

A statutory claim is not **[Verified]** until the verifier has searched for each of these against the base instrument:

| Amendment class | What it does | Where it hides |
| --- | --- | --- |
| **Corrigendum** | Corrects an error in a published notification | Separate gazette instrument, often days/weeks later (S.O. 5936(E) followed S.O. 5319(E) by four weeks); does not update the original's text on aggregator sites |
| **Amendment notification** | Substantively changes a provision | Separate S.O./G.S.R. number; the base rule's hosted text may not reflect it |
| **Retrospective re-notification** | Re-issues a provision with a backdated effective date | e.g., S.O. 3582(E) re-notifying 12% to 21.11.2025 — the effective date differs from the publication date |
| **Superseding schedule** | Replaces a slab/schedule wholesale | State PT tables especially; at least one widely-cited 2026 PT table reproduces a superseded structure |
| **Savings/sunset clause** | Time-limits an instrument's survival | The 21 Nov 2026 one-year EPF/ESI savings window — a claim true today expires by operation of a clause |
| **State divergence** | A state rule under a central Code departs from the central position | State rules under the Codes are rolling out unevenly; the multi-state customer hits both at once |

#### The corollary for the product, not just the PRD

This rule is also a product requirement, stated in §13.13 (the A6 watcher's corrigendum classifier) and owned operationally by the compliance data pipeline in §22: the statutory-change watcher **must catch amendments, not just new instruments.** A watcher keyed only to new notifications would have missed the corrigendum that inverted the entire November 2026 analysis. The evidence methodology and the product's compliance-surveillance engine share the same failure mode and therefore the same rule. Concretely, the watcher's ingestion must index gazette entries by the *base instrument number they cite* (so corrigendum S.O. 5936(E) surfaces on the S.O. 5319(E) record), not only by their own number — the same reverse-citation index a diligent human verifier builds by hand.

<!-- DIAGRAM: corrigendum-verification-flow -->

#### The verifier's checklist for any statutory claim

1. Locate the **base instrument** — the notification/rule/section, in the official gazette or the issuing body's own publication.
2. Record **instrument number, publication date, effective date** (these three can differ).
3. Search the gazette index for a **corrigendum** citing the base instrument's number.
4. Search for a later **amendment or superseding** instrument on the same subject.
5. Confirm any **savings/sunset clause** and its expiry.
6. For a rule under the Codes, check whether the **applicable state** has notified a divergent rule; grade central and state as separate claims.
7. Cross-check against a *second independent* rendering of the same rule where one exists — never trust a single aggregator footnote.
8. Only then apply **[Verified]**, and set a re-verification date (§02.6).

#### The corrigendum-search recipe — how the extra step is actually run

"Check for a corrigendum" is only a real step if the verifier knows the mechanical search that surfaces one. On egazette.gov.in a corrigendum is a *separate* dated publication that names the base instrument in its text but carries its own S.O./G.S.R. number and its own ministry/date, so it will never appear by re-opening the base PDF. The concrete search, using the S.O. 5319(E) → S.O. 5936(E) case as the worked pattern:

1. **Fix the base handle.** Record the base instrument's exact number, issuing ministry (here MoLE), and publication date. This is the string every amendment will cite.
2. **Search the gazette index by ministry + date window, not by instrument number.** The e-Gazette search does not reliably resolve "find everything that amends S.O. X"; it resolves "MoLE notifications published between date A and date B." Set the window to the base date through the present, and scan the *later* entries for a title referencing the same scheme/section — or, as round two did, sweep gazette IDs across the window.
3. **Read the operative line for the two dates that must differ.** A corrigendum (S.O. 5936(E)) reads "for the entry against Sl. No. X, read …" and operates from the base instrument's date though published later; a retrospective re-notification (S.O. 3582(E)) states an effective date (21.11.2025) that precedes its own publication date. That mismatch is the fingerprint; if the two dates coincide, it is a plain new notification, not a backdated correction.
4. **Never treat the consolidated aggregator view as the search surface.** indiacode.nic.in and vendor "bare Act" pages consolidate the base text and lag the corrigendum — running the search there reproduces the S.O. 5319(E) footnote error (§02.4). The search is run against the *chronological gazette stream*, and the consolidated view is used only after, to confirm it has caught up.
5. **Record the result either way.** "Corrigendum found: S.O. 5936(E), publ. 19.12.2025, operative from 21.11.2025" and "corrigendum search run [date]; none found" are *both* valid capture-record entries (§02.5). A blank corrigendum field is an incomplete verification, not a clean one.

This recipe is also the specification for the watcher's ingestion (§13.13, §22): index each gazette entry by the base instrument it *cites*, run the same ministry-plus-date-window scan continuously, and raise a re-verify task on any entry whose effective date precedes its publication date. The human recipe and the machine watcher are the same five steps at two speeds.

#### Where India's statutory sources actually live — a verifier's topography

The corrigendum rule is only actionable if the verifier knows *which* portal each authority publishes to, and the trap peculiar to each. India has no single canonical statutory database; the authoritative instrument for a payroll rule can sit on any of a dozen portals, and the aggregators that stitch them together are exactly where the errors enter. The following is the ground truth a statutory engineer must internalise before grading anything to **[Verified]**.

| Authority / rule domain | Authoritative source | Trap the verifier must know |
| --- | --- | --- |
| **Central Acts, Codes, S.O./G.S.R. notifications** | The Gazette of India (egazette.gov.in) — the *published* PDF is authoritative | The e-Gazette carries the corrigendum as a *separate* dated entry; it does not amend the original PDF in place. indiacode.nic.in's consolidated bare-Act view lags and, as with S.O. 5319(E), can reproduce a superseded enumeration in a footnote. Never grade Verified from indiacode alone. |
| **EPF (Scheme 2026, EPS, EDLI, rates)** | EPFO Unified Portal circulars + the enabling gazette S.O.; the portal Help File for the ECR layout (EV-035) | EPFO circulars implement gazette notifications and can *precede or lag* them; the retrospective 12% re-notification (S.O. 3582(E)) shows publication date ≠ effective date. Grade against the gazette, use the circular for operational detail only. EPFO moved from epfindia.gov.in to www.epfo.gov.in, so older printed manual URLs are dead (EV-045). |
| **ESI (rates, wage ceiling, schemes)** | ESIC notifications + MoLE gazette | The ESI regime after the ~21-Nov-2026 savings expiry is *unresolved* (EV-004) — there is currently no authoritative successor instrument to grade, so every ESI-after-savings-expiry claim is Ungraded/open by construction, not Hypothesis. |
| **Professional Tax (state)** | Each state's own Finance/Commercial-Taxes department or gazette — and in Tamil Nadu and Kerala a *local body*, not a state tax department (r2). Roughly 16–20 levying states/UTs, each independent (r1 gives 19–20, r2 reports give ~16–17 and "roughly 20"; the count itself is unverified) | There is no central PT source. Slab base (monthly salary vs annual income), slabs, gender variants, periodicity and effective dates differ per state and change at state budgets. Aggregator PT tables are materially disputed: a March 2026 aggregator table publishes Karnataka's pre-2023 three-band structure (r1). Verified at state primary source: Maharashtra and Odisha, plus Karnataka's effect with its amending instrument unretrieved (EV-014). No "state X does not levy PT" negative has been verified for any jurisdiction (r2). Neither Frappe nor TallyPrime ships a state PT slab table (EV-031, EV-032). |
| **Labour Welfare Fund (state)** | State LWF board notifications (roughly 16 levying states/UTs — r1; the count itself is unverified) | Contribution amounts, employer/employee split, and monthly / half-yearly / annual periodicity are per-state and revised by board circular, not always gazetted prominently. LWF sits entirely outside the four Labour Codes, and no LWF rate or employer/employee split was verifiable from a government source in any state (r2) — every LWF table in circulation is aggregator-sourced. **[Reversed]:** the earlier claim that Frappe HR implements LWF across 14 states is false at source (EV-031), and TallyPrime has no LWF engine (EV-032) — the dataset is greenfield in both incumbents, which makes it both the differentiator and an unpaid build cost. |
| **TDS / 24Q → Form 138, Form 16 → Form 130** | Income Tax Dept / CBDT notifications (Form 138 under Rule 219, Income-tax Rules 2026 — EV-049); TRACES + Protean (NSDL) for file formats (RPU/FVU) | The record *layout* is a breaking change published as versioned RPU/FVU releases, separate from the enabling notification (EV-051), and two version stacks run side by side by period (EV-052). the Q1–Q3 v1.2 workbook is dated only by the `22072026` in its own filename — a filename, not a stated release date — and the downloads page labels it 1.2 while the workbook's own version string reads 1.1, so a version is pinned by the downloaded artefact and never by the page's label (r5/02; §02.7 host audit). The Q4 regular format was still unreleased when re-checked in September 2026, so Form 130 Part B generation is **fenced** until that layout lands (EV-046) — and Form 130 itself is TRACES-generated only (EV-048). Old and new form and section vocabularies must both be accepted (EV-050) (§06). |
| **Gratuity, maternity, minimum wages, overtime, registers** | The four Labour Codes + Central Rules (notified 8 May 2026) + *state* rules | State rules under the Codes are rolling out unevenly. A central position and a state position can conflict; the multi-state customer hits both. Grade the central rule and the applicable state rule as *separate* claims with separate effective dates. |
| **Company financials (competitor revenue)** | MCA21 / ROC filed statements (by CIN) | Filing lag is up to ~18 months; "latest filed" is not "current." Startup entities may file abridged accounts. The ₹1,374 Cr aggregate is Verified per-filing; the gross-up is modelled. |
| **Vendor pricing / AI posture** | The vendor's own page — raw-HTML fetch *and* rendered read, the vendor's pricing config file where prices are JS-injected, and the archive (Wayback) of the vendor's own page for withdrawn cards | Raw fetch and rendering fail in opposite directions: Keka's rate card survives only in HTML comments a rendered read cannot see, while Qandle's is injected by JavaScript a raw fetch cannot see (EV-021; r5). A competitor's statement of another vendor's price is never primary (Pocket HRMS states greytHR's entry price as ₹3,495 against greytHR's published ₹2,495 — r5). Review-site and aggregator pricing is never primary. AI posture is claim posture until tested (EV-090). |

The operational consequence: a single payroll run for a 100-person multi-state employer touches instruments from *at least* six of these authorities, each with its own portal, its own corrigendum surface, and its own effective-date clock. The evidence register must therefore key claims by (authority, jurisdiction, effective-date-range), not by topic — because "the PF rate" and "the Karnataka PT slab" and "the Maharashtra LWF split" are three independently-amendable facts that happen to land on the same payslip. This is the same multi-jurisdiction versioning the engine needs (§06), which is why the register's schema and the rule-store's schema are deliberately isomorphic.

<!-- DIAGRAM: statutory-source-topography-map -->

### 02.5 Source-capture discipline

A claim's marker is only as trustworthy as the ability to return to its source. The capture discipline exists so that any claim can be independently re-verified by someone who was not in the room when it was graded — an incoming statutory engineer, an investor's diligence team, or the same author six months later after the source page has changed.

#### The capture record

Every **[Verified]** claim, and every source underpinning a **[Hypothesis]**, has a capture record with these fields:

| Field | Requirement | Why it matters |
| --- | --- | --- |
| **Claim ID** | Stable identifier, referenced inline | Lets the engine's rule-version metadata point back at the authority |
| **Source type** | gazette / notified-rule / govt-statistic / filed-financial / regulator-directive / vendor-page | Determines whether it can reach [Verified] at all |
| **Instrument identity** | S.O./G.S.R. number, or MCA CIN + filing period, or URL | The unambiguous handle |
| **URL** | Exact, deep-linked | Not a homepage; the artefact |
| **Capture date** | When the source was read | Statutory sources drift; the date bounds the guarantee |
| **Effective / publication / amendment dates** | All that apply, separately | Publication ≠ effective ≠ amended (see §02.4) |
| **Capture method** | raw-HTML fetch with comment-node scan / rendered read / vendor config file / archive snapshot / PDF hash / text extract — record every method run | Raw fetch and rendering fail in opposite directions (EV-021; r5); a single method can hide the finding |
| **Network vantage and tool** | The network *and the fetch tool* the capture ran from | A failed capture is attributed to the tool before it is attributed to the site — the "TLS block" of rounds one to four was one tool's failure (r5) |
| **Re-verification date** | When it must be re-checked | Makes [Verified] a dated guarantee, not a permanent one |
| **Corrigendum-checked** | boolean + date + result | The §02.4 step, recorded explicitly |
| **Grader / re-checker** | Two distinct identities for [Verified] | Enforces the dual-control rule (§02.5, governance) |

#### The dual-capture requirement (replaces the rendering-browser rule)

**[Reversed]** — the rendering-browser rule. Rounds one to four treated the mid-market vendor pages (Keka, ZingHR, Zimyo, HROne, Qandle, Pocket HRMS, Ramco) as TLS-blocked to non-browser fetchers, and made a rendering-browser capture the only route to [Verified]. Round five reversed both halves. Plain curl retrieves every Keka page cleanly — the earlier failure was specific to one fetch tool, not to the site — and a rendered read *cannot* see Keka's prices, which survive only as three HTML comments in the raw page (EV-021). Qandle fails the other way: its prices are empty spans filled by JavaScript from a country-keyed config, so a raw fetch shows nothing (r5). The mid-market set is now captured (EV-021–EV-027; ZingHR publishes no price, EV-033).

The rule that replaces it: **a vendor claim reaches [Verified] only after** (1) a raw-HTML fetch with a comment-node scan; (2) a rendered read; (3) where prices are JS-injected, a read of the vendor's own pricing config file — the strongest source available; and (4) monthly/annual toggles clicked, never inferred from DOM order (r5). A summary, a cached snippet, an aggregator's restatement or another competitor's comparison page never qualifies. A claim that could not be captured this way is not "probably true"; it is *unverified*, and any section resting on it must say so.

**When the host refuses one method.** zimyo.com returns HTTP 403 to a raw fetch, so its rate card was captured by a rendered read with programmatic extraction only (r5/03 finding 21). A refusal is not a failed capture of the price. The capture records the refused method with its tool and status code; the visible figures may reach [Verified] on the method that worked; and the question the refused method would have answered — here, whether the page carries commented-out prices of the kind Keka's does — is written to the row as open, not assumed answered. EV-027's Zimyo figures stand on that basis.

Two companion rules, both earned in round five: **never take a competitor's price from another competitor's page** (Pocket HRMS states greytHR's entry price as ₹3,495 against greytHR's published ₹2,495 — r5); and **no competitor claim leaves the building without clearance, a dated capture, and a note of whether the product was executed or only its documentation read** (§21). The Frappe and Tally rows are declared capability from source code and product documentation (EV-031, EV-032), not executed behaviour.

**[Reversed]** — "capture from a different network." The §20 V-06 prescription to re-run the capture from another network rested on the tool-specific failure above. The *network vantage and tool* field stays in the capture record because it lets a failure be attributed correctly, and if the same page yields different content from two captures, neither is Verified until the discrepancy is explained — a page that shows different prices to different visitors is itself a finding.

#### Provenance rules by source class

- **Statutory (gazette / notified rule):** primary instrument + corrigendum check + effective-date confirmation. Nothing less reaches [Verified]. A gazette read from a third-party mirror is **[Verified — mirror]** and must be pulled from the primary source before customer use (EV-058, EV-087). An aggregator PT table is never sufficient — "aggregator PT data is materially disputed" (§20), which is why PT is verified only where a state's own schedule was read (Maharashtra, Odisha; Karnataka's effect, EV-014) and a full state-wise PT/LWF dataset is flagged as undone build-dependency work (EV-015).
- **Market/financial (MCA/ROC filings):** the filed statement itself, with entity name and filing period. The ₹1,374 Cr aggregate across eleven filed HRMS entities is [Verified] because each line traces to a filing; the gross-up to ₹2,100–3,900 Cr is explicitly a modelled estimate on top of verified inputs, and is marked as such (Source: 11 MCA/ROC filings by CIN).
- **Competitive (vendor pages):** dual capture of the vendor's own page (raw + rendered, config file where JS-injected, archive for withdrawn cards), with a capture date. Third-party "review site" pricing is not a primary source. A vendor's *list* price is not its *realised* price — the two greytHR/PeopleStrong realised PEPM points (₹52, ₹126) are derived from filed revenue over claimed scale, and are marked as biased downward because platform users exceed billed seats.
- **Which host is primary.** A statutory instrument is read on a primary host when that host is the Gazette of India, the issuing authority's own site, or the site of the ministry or regulator that administers the instrument — MoLE for the Codes, MeitY for DPDP, UIDAI for the Aadhaar regulations, EPFO for its circulars. A copy anywhere else is a third-party copy, even on a .gov.in domain: a legal database, a research organisation's copy, another department's upload of the instrument. A ministry's handbook or press release about an instrument is a summary, not a copy, and supports only what G14 allows. indiacode.nic.in is a government host for an Act's text but never the only check of its amendment state (§02.4). The host audit in §02.7 applies this rule to every row EV-021–EV-092.
- **Analyst figures:** treated as **suspect by default.** Every published analyst figure for India HR-tech was retracted or downgraded across rounds one and two; the most-circulated one ($23.32bn→$38.36bn) carries no attribution and is almost certainly a mislabelled global number. Analyst numbers may appear only to be *killed*, never to support a [Verified] claim.

#### Internal-consistency cross-checks

Capture is necessary but not sufficient; a captured number can still be wrong if its denominator or scope is contaminated. The discipline requires a consistency cross-check before [Verified]:

- **Denominator hygiene:** always distinguish registered vs contributing (EPFO), total resumes vs the buyable product (Naukri's 118M investor metric vs Resdex's ~50M profiles), platform users vs billed seats (why the ₹52 and ₹126 realised-PEPM points are biased *downward*), whole-company users vs the subset you are pricing (Zaggle's ₹161 "per user" was contaminated because its user count includes channel partners and customers-of-customers). A claim that silently mixes these is a defect even if each number is individually sourced.
- **Ratio-vs-absolute separation:** a ratio derived from two same-unit prices survives input corrections that an absolute does not. The 52.7× cheapest-to-dearest model spread is [Verified] because it is a ratio of two USD prices — it survived even the FX correction. The absolute per-employee inference cost (₹0.15–3.27) is [Hypothesis] because it rests on an un-instrumented token estimate. Same topic, two different markers, because ratio and absolute have different provenance strength.
- **Order-of-magnitude sanity:** before a number reaches [Verified], check it against an independent quantity that constrains it. IRDAI's commercial group-health market at ₹61,435 Cr across 275mn lives implies ₹2,233 per life per year (Source: IRDAI) — which is how the vendor claim of ₹10,000–25,000 per life a year was caught as an order-of-magnitude overstatement. A number that violates an independent constraint is a defect regardless of its own citation.

#### Six capture failures the research tools introduced — and the field that catches each

Round five found several earlier findings wrong not because a source was misread but because a tool stood between the analyst and the source and reported something the source does not say. In every case the primary source was cited, so "cite the primary source" did not catch it. Each case is caught by a specific field or check on the capture record (§02.12).

| # | Failure | Case (research) | What the tool reported | What the source says | Field or check that catches it |
| --- | --- | --- | --- | --- | --- |
| CF1 | Fabricated precision | The ECR delimiter (r5/02 finding 1); Form I's field count (r5/04 finding 16) | "The literal 4-character delimiter" and 34 fields — both wrong | `#~#` is three characters; Form I has 36 numbered fields | `literal_check` — a counted or literal property (a delimiter, a field or column count) is verified by counting in the stored bytes or the rendered image, and the count is recorded with its locator |
| CF2 | Fabricated freshness | Protean's "Updated As On" footer (r5/02, its second retraction) | The footer's date, read as proof that the Q4 status was current that day | The footer is written by client-side script from the visitor's own clock; the only hard-coded date on the page is a commented-out one from 2024 | `freshness_basis` — a claim that something is current rests on the capture date of a re-check of the element itself (the Q4 anchors), never on a date the page prints about itself |
| CF3 | Fabricated verbatim | Qandle's pricing page (r5/03 finding 16) | Verbatim quotes of `__/mo` template placeholders | The placeholder string appears zero times; the price spans are empty and filled by script from a config file | `quote_locator` — every verbatim quote relied on carries a locator into the stored bytes (byte offset, page and line, or image region) and is reproduced from them; a quote with no locator is not evidence |
| CF4 | Search-summary contamination | TallyPrime PT (r5/01 finding 30) | A search summary saying TallyPrime lets the user choose the state and slab, attributed to Tally's own help page | The same help page shows slabs entered by hand (EV-032) | `source_class = secondary_summary` for anything a search engine or summarising tool returns, whatever page it names; a claim whose only capture is such a summary is a G20 defect |
| CF5 | Reading in isolation | SEBI's cloud FAQ (r5/01 findings 2, 8) | A retraction of the MeitY-empanelment constraint, on the strength of FAQ Q51 | Q47 and Q50, two questions earlier, impose it on providers of PaaS and SaaS via clause 2(ii) of the circular; Q51 describes providers with their own data centres | `scope_read` — the capture records whether the whole instrument, or which parts of it, were read; a grade or a retraction resting on one clause of a partly read instrument waits until the neighbouring provisions are read (worked grading H) |
| CF6 | Unreconciled config source | Qandle's pricing config file (r5/03 finding 17) | Config keys named for the annual term | The "Year" keys feed the monthly card: the rendered page and the page's own data attributes give monthly ₹2,950 + ₹59 and annual ₹2,450 + ₹49 | A `vendor_config_file` capture is reconciled against a `rendered_read` of the same page before either supports [Verified], and config values that never render are never quoted as prices (r5/03) |

The pattern matches §02.3: in every case the tool's output was more convenient than the source — more precise, fresher, more quotable, more complete. The fields above are how the capture record resists it. For statutory sources the same traps are registered against each watch source in §22 FR-RULE-004; these fields hold the result on the capture itself, for every class.

**AC-EVR-34 · A verbatim quote reproduces from its bytes.** *Given* a capture whose claim relies on a verbatim quote, *when* the quote is re-extracted at its `quote_locator` from the archived bytes, *then* it matches character for character; a quote that does not reproduce, or has no locator, fails the grade (lint L-26).

**AC-EVR-35 · Currency rests on a re-check, not on the page's own date.** *Given* a row claiming that something is current or not yet released (EV-046), *when* its `freshness_basis` is a date the page renders for itself, *then* the grade is refused and a re-check of the watched element is required (lint L-27).

#### Grading governance — who grades, and the conflict of interest

The one-directional finding (§02.3) has a governance consequence that is easy to miss: **the generator cannot grade its own output.** A process with a measured optimism lean, asked to grade its own confidence, will grade optimistically. The register therefore imposes two rules:

1. **Dual control for [Verified].** The identity that first asserted a claim and the identity that re-checks it must differ; the capture record carries both. This is the register-level version of the round-one/round-two split that produced the finding in the first place. A single author grading their own claim to Verified is a defect regardless of the evidence quality.
2. **Adversarial re-check, not confirmatory review.** The re-checker's mandate is to *break* the claim (§02.9), not to confirm it. A re-check that finds nothing wrong and cannot demonstrate it actively tried to falsify the claim is not a completed re-check — it is an unreviewed claim wearing a review stamp.

The lightweight metric that keeps this honest is the **re-check retraction rate**: the fraction of re-checked claims that get downgraded or killed. A sweep whose re-checks retract nothing is a warning sign in a corpus with a known optimism bias, not a clean bill of health. The baselines are ~90 claims retracted across rounds one and two and roughly 13 findings per dimension in round three (r3 critic); any future sweep whose rate collapses toward zero should be assumed under-adversarial until proven otherwise.

### 02.6 Confidence is a lifecycle, not a stamp

A marker is a snapshot with an expiry, not a permanent property. The register defines a state machine, and claims move through it.

<!-- DIAGRAM: confidence-lifecycle-state-machine -->

**States and transitions:**

- **Ungraded → Hypothesis:** default on entry. A new assertion is a hypothesis until it earns better or worse.
- **Hypothesis → Verified:** a primary source is captured and survives hostile re-check including the corrigendum step.
- **Hypothesis → Killed:** the §20 kill criterion fires against it, or a primary source contradicts it.
- **Hypothesis → Hypothesis (refined):** the range tightens or the kill criterion is re-specified, but it remains unvalidated.
- **Verified → Killed:** an amendment, corrigendum, or superseding instrument invalidates a previously-verified statutory claim. This is the November-2026-cliff transition, and it is *expected*, not exceptional, in a moving statutory environment.
- **Verified → Verified (re-verified):** the re-verification date arrives, the source is re-checked, still holds, new re-verify date set.
- **Verified → Hypothesis (auto-demote):** the re-verification date passes without a re-check. Stale verification is not verification; the claim reverts to Hypothesis for planning purposes until re-checked.
- **Killed → (terminal):** a killed claim does not revive. If new evidence resurrects the underlying quantity, it enters as a *new* claim with a *new* ID and its own grading — it does not reclaim the old marker. The old kill stays on the §20 blocklist as a record of why the previous version died.

The one transition worth dwelling on is **Verified → Killed**, because it is the one that feels like a failure and is not. The EPF cliff is the canonical case: a claim about the EPF Act 1952 that was correctly Verified in early 2025 is *correctly Killed* by the 21 Nov 2025 repeal. Nothing about the original grading was wrong; the world changed. A register that treats this transition as an embarrassment will resist recording it and will drift out of date. A register that treats it as routine — which it is, in a market whose governing Act was repealed mid-research — stays live. This is why the re-verification cadence below is a first-class obligation, not a maintenance chore.

#### Worked lifecycle trace — the EPF Act 1952 claim, Verified → Killed → new claim

Because Verified → Killed is the transition most likely to be mishandled, here it is traced end to end on a single claim, showing that a *correctly* graded Verified claim can die without any grading error:

1. **Early 2025 — [Verified].** "EPF contributions are governed by the Employees' Provident Funds & Miscellaneous Provisions Act, 1952." Primary source: the Act itself, captured, effective, no corrigendum outstanding. Correctly Verified.
2. **21 Nov 2025 — the world changes.** The four Labour Codes commence; the EPF Act 1952 is repealed (Source: S.O. 5319(E) as corrected by corrigendum S.O. 5936(E) — the base notification alone omits the repeal, §02.4). The Verified claim is now false as a statement of *current* law — but it was never wrong *as of its capture date*. This is the auto-demote trigger firing on a real amendment, not on staleness.
3. **Transition — [Verified] → [Killed].** The claim is killed with reason ("repealed 21.11.2025") and a replacement pointer, not silently edited. Crucially, it is *not* deleted: a period being recomputed in an arrears run *before* 21.11.2025 still resolves against the 1952 regime, which the savings clause (CoSS s.164(2)(b)) preserves for one year (EV-002). The dead claim's rule version must remain queryable for retrospective runs — a killed statutory rule is archived, not erased, exactly because effective-dating means old periods still need old rules.
4. **New claim, new ID — [Verified].** "EPF is governed by the Employees' Provident Funds Scheme, 2026; 12% re-notified retrospectively to 21.11.2025 by S.O. 3582(E)" enters as EV-003, a *fresh* claim with its own grading and its own corrigendum check — it does not inherit the old claim's marker. This is the killed→terminal rule in action: the quantity is resurrected only as a new, independently-graded row.

The lesson the trace makes concrete: **retrospective recomputability and the Killed marker are the same requirement seen twice.** A killed statutory rule cannot be deleted, because a payslip dated before the kill still needs it. The register's refusal to erase kills (§02.6) and the engine's obligation to recompute against period-correct rule versions (§02.10) are one discipline — which is why the register schema and the rule-store schema are isomorphic (§02.1).

#### The lifecycle as a transition table

The state list above describes the machine; this table specifies it, in the ledger's convention for every state machine in this PRD (event · guard · side effect · who may trigger — Part E-1). The qualifiers of §02.2 are sub-states of [Verified]. A transition that changes only a qualifier is still a transition, and is logged as a grading event (§02.12).

| # | From → To | Event | Guard | Side effect | Who may trigger |
| --- | --- | --- | --- | --- | --- |
| L1 | *(none)* → Ungraded | A claim appears in a section or research file with no register row | — | A row is requested from the next ledger revision; the inline use fails lint L-05 until graded (§02.13) | Any author |
| L2 | Ungraded → [Hypothesis] | Grading finds no captured primary source | Method, threshold and consequence written; a §20 V-item exists or is requested | Haircut applies (§02.3); the row is barred from models and contracts (§02.14) | Grader |
| L3 | Ungraded (open) → [Verified] or [Hypothesis] | The authoritative instrument is notified | Captured at the issuing host; corrigendum search recorded | The fail-safe stands down only when the §22 pipeline publishes the dependent rule versions (§02.8) | A re-checker other than the grader |
| L4 | Ungraded (blocked) → [Verified] | Re-capture by a different method succeeds | The failing tool is recorded; the new methods are listed in the capture record | The blocked grading gets a [Reversed] entry where a conclusion rested on it (EV-009; [Reversed] register row 5) | Grader, then re-checker |
| L5 | Ungraded (undone) → one row per jurisdiction | One jurisdiction's source is captured | Each jurisdiction graded as its own claim | The parent row's scope narrows; the new rows take IDs from a ledger revision (§02.12) | Grader |
| L6 | [Hypothesis] → [Verified] | A primary source is captured and survives a hostile re-check | Grader ≠ re-checker; every §02.2 acceptance test passes | The §20 V-item closes with its result; the haircut lifts | Re-checker |
| L7 | [Hypothesis] → [Killed] | The kill criterion fires, or a primary source contradicts | The firing evidence is attached | Kill row; a §20.4 banned-list entry if the claim is a figure; a [Reversed] entry for every conclusion drawn from it | Re-checker |
| L8 | [Hypothesis] → [Hypothesis] | The range tightens or the criterion is re-specified | A pre-registered threshold is not moved after its data arrives (§20.12 rule 9) | The kill criterion is versioned, never overwritten | Grader |
| L9 | [Verified — mirror] or caveat → [Verified] | The instrument is fetched from its issuing host | Both hashes recorded; on a mismatch every difference is listed and the row re-graded against the primary text | The mirror-register entry closes; the customer-facing bar lifts, subject to §23 clearance | Re-checker |
| L10 | [Verified — not in force] → [Verified] | The provision commences | The commencement instrument is captured with its corrigendum search | Dependent rule versions arm on the commencement rule object (§23 FR-LEG-008); dependent §23 claim entries are re-cleared (FR-LEG-001 AC2) | Re-checker |
| L11 | [Verified — negative, dated] → [Killed] | A law, judgment or designation is found | Primary source captured | Kill row; every "we are not aware of any" use is re-worded | Re-checker |
| L12 | [Verified — claim posture] or declared capability → [Verified], observed | The product is executed and the behaviour observed | A test record with the product version and date | The qualifier changes; the competitor claim is re-cleared (§21) | Research lead |
| L13 | [Verified] → [Verified] | A re-verify trigger fires and the source still holds | Re-checker ≠ the row's previous grader | New re-verify date; the capture record gains an entry | Re-checker |
| L14 | [Verified] → stale | The re-verify date passes with no re-check | — (automatic) | Planning and representation uses demote to [Hypothesis] treatment (§02.3); a priority re-verify task opens; **no published rule version changes** (AC-EVR-11) | System |
| L15 | [Verified] → [Killed] | An amendment, corrigendum, superseding instrument, repeal or event falsifies the claim | The new instrument or event captured with its effective date | Kill row with a replacement pointer; the old rule version is archived, never erased (the trace above); the replacement quantity takes a new ID | Re-checker |
| L16 | [Verified] → split | A re-check finds one component unsupported | The supported component re-verified on its own | The row splits into components (EV-012); a kill row records the over-grade (EV-K15) | Re-checker |
| L17 | [Killed] → [Killed] | Anyone re-proposes the claim | — | Refused and logged; a genuinely new quantity enters by L1 with a new ID | System (lint L-08) |
| L18 | Conclusion → [Reversed] | A kill or re-grade removes a conclusion's support | Every owning section identified | A [Reversed] register row; each owning section carries the inline marker with a one-line reason | Section owner |
| L19 | [Verified] → [Verified], newly qualified | An audit of existing captures finds a restricting condition — a non-primary host, a summary read as the instrument, a superseded revision | The finding cites the capture and the research reference it rests on | The qualifier is written with its co-requisites (§02.2 compatibility table) and, for `mirror`, a `MirrorPull` opens; dependent §23 entries move to `suspended`; citing rule versions receive the RO6 flag through a DETECTED change request, and no enforcement changes | Re-checker |

<!-- DIAGRAM: evidence-ledger-claim-transition-model -->

**AC-EVR-11 · Staleness demotes planning, never enforcement.** *Given* EV-003 backs a published `pf_rate` version and its re-verify date has passed without a re-check, *when* the register applies L14, *then* the rule version's `evidence_status` and `enforcement_mode` are unchanged (§14.6.1b), a priority re-verify task opens in the §22 pipeline as a DETECTED change request (§22 FR-RULE-003 R1), and every financial-model or customer-facing use of EV-003 is blocked until the re-check records a result (§02.14). The opposite design — a stale date silently turning a statutory deduction into a warning — would convert a bookkeeping lapse into under-deducted PF across every tenant.

**AC-EVR-12 · A killed claim does not return under a new name.** *Given* EV-K12, *when* a draft row, section sentence or deck line states that an incumbent ships multi-state PT or LWF without citing a new capture, *then* lint L-08 rejects it. A genuinely new quantity — a later Frappe release that adds state PT slabs — enters only by L1, with its own capture and a new ID.

**AC-EVR-13 · A mirror closes on a hash.** *Given* EV-058's mirror entry, *when* the e-Gazette copy of G.S.R. 843(E) is fetched, *then* the register records both hashes. On a match L9 fires and the qualifier clears for EV-058 and for EV-018, which rests on it; the 13-versus-14 May question stays open, because it turns on the gazette stamps and signatures, not on the text (§23.1.4). On a mismatch every citation of EV-058 and EV-018 is flagged for re-grading before any further use.

**AC-EVR-14 · Transitions are attributable.** *Given* any transition from L2 to L19 other than L14 and L17, *when* it is written, *then* the grading event records the actor, the second actor where the guard requires one, the evidence capture IDs and the reason; a transition missing any of them is refused.

#### Re-verification cadence

| Claim class | Re-verify trigger | Rationale |
| --- | --- | --- |
| **Statutory (Codes, PF/ESI/PT/TDS/gratuity/LWF)** | On every relevant notification; hard floor quarterly; forced re-check before 21 Nov 2026 for the EPF/ESI savings expiry | The ground moves; the ESI successor regime is *unresolved* and time-critical |
| **Union Budget–sensitive (wage ceilings, perquisite thresholds, slabs)** | Annually at Budget, plus any mid-year Finance Act change | The 1 Apr 2026 meal-perquisite move (₹50→₹200 per meal, with its conditions — EV-019) is the pattern |
| **State PT / LWF** | On each state's Finance Act / budget; LWF by board circular, periodicity per state | Roughly 16–20 PT and 16 LWF jurisdictions (r1, r2; counts unverified) each on their own clock; no central trigger exists. Maharashtra's PT return periodicity is assigned per registration each year and must be ingested, never derived (r2) |
| **Data protection (DPDP, SPDI, CERT-In, Aadhaar)** | On any MeitY/UIDAI/CERT-In instrument; forced at DPDP commencement | DPDP substantive provisions commence on or about 13 May 2027 (EV-058); the SPDI regime's survival after s.43A is omitted is a counsel question (EV-060) |
| **Competitive (vendor pricing, AI posture)** | On any observed pricing-page change; else biannually; every use carries its capture date | Zoho gate-widening is a named risk trigger in §20; greytHR's customer count moved between captures (EV-091) |
| **Market (filed revenues)** | On next annual filing | MCA filings are annual; up to ~18-month lag means "latest filed" ≠ "current" |
| **AI cost (model prices, FX, messaging)** | On any provider price change; FX monthly | Gemini 3.x Flash 2× is *scheduled* 1 Jan 2027 (EV-089); WhatsApp INR-billing migration deadline 31 Dec 2026 (EV-088) — known, dated re-verifies |

An overdue re-verification automatically demotes a **[Verified]** claim to **[Hypothesis]** for planning purposes (see the haircut schedule, §02.3) until it is re-checked. Stale verification is not verification.

The dated triggers deserve to be pulled out of the table, because they are calendar events, not conditions to watch for:

- **~21 November 2026** — EPF/ESI one-year savings window expires. EPF has a successor (Scheme 2026); ESI does not yet. Forced re-check; payroll-engine ESI path is at risk until resolved (§20 V-08).
- **31 December 2026** — WhatsApp Business accounts must move to INR billing or Meta stops delivery from 1 January 2027 (EV-088).
- **1 January 2027** — Gemini 3.x Flash price 2×, scheduled (EV-089). Treated as the *base* case in §13, not a downside.
- **On or about 13 May 2027** — DPDP's substantive provisions commence (EV-058); s.44(2) omits IT Act s.43A, the parent of the SPDI Rules (EV-060). Whether the Rules survive that omission is a counsel question (Part D-12; §23), so both consent regimes must run concurrently across the boundary (§07, §23).
- **31 May 2027** — Form 138 Q4 for Tax Year 2026-27 is due (EV-049). Its regular file format was still unreleased when re-checked in September 2026, and the missing Q4 Annexure II blocks Form 130 Part B (EV-046). Fenced until the format lands; re-check at every Protean release.

Two of these five affect payroll or filing correctness directly (ESI, Form 138 Q4) and one changes the consent regime the product runs under (DPDP). None is speculative. A register that does not carry them as dated re-verify triggers is not tracking the risks that actually move the product.

#### Worked re-verification event — what firing a trigger actually does

A cadence is only real if firing it has a written procedure. Trace the ~21 Nov 2026 EPF/ESI trigger, the most consequential dated re-check in the register:

1. **T minus `register.reverify_arm_lead_days` — the trigger arms.** The register raises the EV-002/EV-004 re-verify task automatically from its dated field, at a lead time that is a named parameter with no shipped default (§02.18; routed to §20.13), and never later than the §20 V-08 escalation point of ~1 Nov 2026; no human has to remember. The task is assigned to a re-checker *other than* the original grader (dual control, §02.5).
2. **Re-run the §02.4 checklist against both sides.** EPF side: confirm Scheme 2026 and the S.O. 3582(E) 12% re-notification still stand, re-read corrigendum S.O. 5936(E) with S.O. 2060(E) to close the round-five conflict (§02.4), and search for any *further* corrigendum since capture. ESI side: search ESIC and MoLE for a successor instrument to the saved 1948-regime rules.
3. **Branch on the ESI result.** *If a successor is notified:* EV-004 transitions Ungraded → Verified (or Hypothesis pending effective-date confirmation), the ESI rule-store rows are versioned with the new effective date, and the fail-safe (§02.8) is stood down. *If none is notified by the expiry:* EV-004 stays Ungraded, the engine holds on the saved-regime rules while the savings clause is live, and the hard-blocking alert (§02.8) fires — the engine refuses to *generate an ESI filing artefact* against an assumed structure.
4. **Record the outcome either way and re-arm.** "Re-checked [date]; ESI successor found/none; next re-verify [date]" is written to the capture record. A trigger that fires and finds nothing still updates the record — silence is a recorded state, not an omission.

The point: **a dated trigger is a state transition with a runbook, not a calendar reminder.** The same four steps apply to the 1 Jan 2027 Gemini re-check (re-point the router, no filing risk) and the Q4 Form 138 layout (block the export until the layout lands, EV-046). Two of the dated triggers touch filing correctness, so the runbook — not goodwill — is what keeps the engine from handing the customer a guess to file.

### 02.7 The evidence register format

The register is the machine-readable spine behind the inline markers. Every marked claim in the PRD has a register row. The inline marker is the human-facing summary; the register row is the auditable record. The register below is complete for this version: EV-001–EV-020 (rounds one and two, corrected in place where the corrections ledger required it), EV-021–EV-092 (rounds three to five), and the kill rows EV-K01–EV-K36. Other sections cite these IDs; no other section mints one.

| ID | Claim (abridged) | Marker | Source class | Instrument / URL handle | Captured | Corrig.-checked | Re-verify | Kill criterion (if Hypothesis) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| EV-001 | 7,66,254 contributing EPFO establishments FY23-24 | Verified | govt-statistic | EPFO annual stats, as-on 31.03.2024 | ✓ | n/a | on next EPFO release | — |
| EV-002 | EPF Act 1952 repealed 21.11.2025; one-year savings to ~21.11.2026 | Verified | statute | CoSS 2020 s.164(2)(b) | ✓ | ✓ (corrigendum S.O. 5936(E) of 19.12.2025 found; S.O. 5319(E) footnote flagged; round-five reading of the uncorrected enumeration not adopted, §02.4) | forced before 21.11.2026 | — |
| EV-003 | 12% PF re-notified retrospectively to 21.11.2025 | Verified | notified-rule | S.O. 3582(E) | ✓ | ✓ | on any PF-rate notification | — |
| EV-004 | ESI regime after the ~21.11.2026 savings expiry | Ungraded (open) | regulator | ESIC / MoLE — none yet | — | pending | continuous watch | Primary-source watch on ESIC/MoLE with a corrigendum check; if no successor is notified by ~1 Nov 2026, escalate to the §20 R-2 contingency — the payroll-engine ESI path is at risk (§20 V-08) |
| EV-005 | Real India HRMS spend ₹2,100–3,900 Cr | Verified (inputs) + modelled (gross-up) | filed-financial | 11 MCA/ROC filings, ₹1,374 Cr aggregate | ✓ | n/a | annual filings | Gross-up multiplier is modelled; not for contract use |
| EV-006 | Two-anchor price structure: value floor near ₹50 PEPM (Qandle, greytHR at 50 employees) and mid-market clearing band ₹80–200 PEPM (Zimyo, HROne, Keka) per EV-027; our ₹80–150 target sits inside the band. Replaces any single-figure ceiling (EV-K20) | Hypothesis (our realised price; the list anchors are Verified) | inference on Verified list prices | EV-027 list prices; greytHR ₹52 + PeopleStrong ₹126 realised | ✓ (inputs) | n/a | on §20 report | Mystery-shop 6–8 CAs/bureaus; if real bureau price <₹2,000/mo the target collapses (§20 V-01); if realised runs 30–40% below list, re-base (§20 V-03) |
| EV-007 | 52.7× cheapest-to-dearest model cost spread | Verified | vendor-page | Provider price cards (ratio) | ✓ | n/a | on any provider price change | — |
| EV-008 | ₹0.15–3.27 per-employee inference cost — placeholders; inference is the smallest of four COGS lines (EV-088) | Hypothesis | inference | 23,675/2,045 token estimate | — | n/a | on prototype instrumentation | Instrument a real prototype; if actual is 5× estimate, free-bundled AI breaks at the low end (§20 V-04) |
| EV-009 | Beachhead vendor pricing (Keka, Qandle, greytHR, Pocket HRMS, Zimyo, HROne) — captured, see EV-021–EV-027; ZingHR publishes no price (EV-033). The earlier "Ungraded (blocked)" grading and its TLS premise are **[Reversed]**: the failure was one tool's, not the site's (r5) | Verified (by reference) | vendor-page | EV-021–EV-027, EV-033 | ✓ 5 Sep 2026 (r5) | n/a | on any vendor pricing-page change | — |
| EV-010 | 50% wages add-back; base excludes conveyance/HRA/OT | Verified | statute | Code on Wages s.2(y); CoSS s.2(88) | ✓ | ✓ ("or such % as notified" = standing variable) | on any add-back % notification | — |
| EV-011 | Form 138 replaces 24Q; 301–312→A–K, 303 deleted; Q4 layout not yet published (detail: EV-046–EV-052) | Verified | notified-rule | CBDT / Protean RPU-FVU v1.2 (22.07.2026) | ✓ | ✓ | on next RPU/FVU release; before Q4 | — |
| EV-012 | Overtime at not less than twice the normal rate of wages — Verified. "144 OT hours per quarter" cap — reported by secondary summaries only, never confirmed against gazette text, may sit in the OSH rules rather than the Wages rules; the earlier Verified grading of the cap is **[Reversed]** (EV-K15). Product may warn on the cap, never block | Verified (2× rate) + Hypothesis (144-hour cap) | statute (2×: Code on Wages s.14, read verbatim against the gazette PDF — r1; MoLE handbook — r3); secondary summary (cap: KPMG flash alert, r2) | Code on Wages 2019 s.14 (rate); Central Rules under the Codes, 08.05.2026 (cap — text unread) | ✓ (2×) / ✗ (cap) | owed (cap) | on state-rule notification | Read the Wages and OSH Central Rules gazette text for the cap; until read, warn-only (§09, §20 V-17) |
| EV-013 | ADMS/WDMS outbound push is the dominant device path (eSSL, ZKTeco) | Verified | vendor-page + corroboration | 4 independent sources, captured | ✓ | n/a | biannual | — |
| EV-014 | State PT schedules read at state primary source: **Maharashtra** (monthly salary base; from 1.4.2023 men nil to ₹7,500, ₹175 from ₹7,500 to ₹10,000, above ₹10,000 ₹2,500 a year as ₹200 × 11 + ₹300 in February; women nil to ₹25,000, then the same split) and **Odisha** (annual income base; ₹200 × 11 + ₹300 in "the last month", month undefined) verbatim; **Karnataka** effect (₹200 at ₹25,000 or above, ₹300 in February, no gender variant) read on the state PT portal, amending notification DPAL 08 SHASANA 2025 of 15.04.2025 not retrieved. The earlier grading "Telangana PT slab — the only state Verified" is **[Reversed]**: only Telangana's employer-registration wording was ever verified, not its slab (r2) | Verified (MH, OD; KA effect) | notified-rule / state-department schedule | MSTD Schedule I rate PDF (as on 31.03.2025); odishatax.gov.in PT page; ptax.karnataka.gov.in | r2 | owed (KA instrument unretrieved; none recorded for MH, OD) | each state's budget; forced for KA when the instrument is retrieved | — |
| EV-015 | State-wise PT/LWF dataset: every levying state/UT beyond EV-014 — Telangana's slab included — and all LWF states/UTs (counts unverified: ~16–20 PT, ~16 LWF — r1, r2); no LWF figure verifiable from a government source in any state (r2); greenfield in both incumbents (EV-031, EV-032) | Ungraded (undone) | notified-rule | per-state gazettes / state-department schedules — not yet captured | ✗ | pending | per-state budget | Capture each state's gazette schedule + periodicity; aggregator tables never sufficient (§20 V-09) |
| EV-016 | greytHR's current claim of "30,000+ companies" (EV-091) ≈ 3.9% of 7,66,254 contributing establishments = a share ceiling; the earlier 34,000 capture gave 4.4%, and greytHR's own pages have shown 20,000–34,000 (r1). The argument survives either figure; the number must carry its capture date | Verified, dated | vendor-claim ÷ govt-denominator | greytHR public claim (Sep 2026) ÷ EV-001 | ✓ Sep 2026 | n/a | on each capture; on next EPFO release | — |
| EV-017 | ICAI recommended fee schedule has no payroll-processing line item — true of the schedule read, which is pre-GST; a superseding February 2020 revision exists and its text was not retrieved (r2/05), so the negative is unverified for the current revision (§02.2 G15) | Verified — as to the superseded schedule read | regulator-directive | ICAI fee schedule, full-text search (r2/05) | r2 | n/a | fired — the revision exists; retrieve it and repeat the search (§02.18) | — |
| EV-018 | DPDP s.7(i) (employment-purpose legitimate use) is **not in force** until on or about 13 May 2027 (EV-058). Today the SPDI Rules 2011 require consent in writing before collecting sensitive personal data, which includes biometric and financial information (EV-060); who owes that duty — employer or SaaS — is a counsel question, so consent capture is built either way (Part D-4). When s.7(i) commences it disapplies consent and notice for employment purposes only; it does not disapply the s.8 duties. The earlier reading "no employee consent needed", stated as current law, is **[Reversed]** (EV-K14) | Verified — mirror (commencement read via EV-058) | statute + notified-rule | DPDP Act s.7(i); G.S.R. 843(E) (mirror — pull from egazette before customer use); G.S.R. 313(E) | ✓ | owed | forced at ~13 May 2027; on any commencement-compression notification | — |
| EV-019 | Meal perquisite ₹50→₹200 per meal; gift/voucher threshold ₹5,000→₹15,000 per year, eff. 01.04.2026. Tax-free only for meals during working hours at office or factory premises, or non-transferable vouchers usable only at eating outlets; without these conditions the perquisite is taxable, payslips under-deduct, and the demand plus interest lands on the employer. The conditions are engine constraints (§08, §11) | Hypothesis (figures concur across two dated secondary sources and a counsel spot-check; gazette text not read — r2, r5) | notified-rule (secondary read) | Income-tax Rules 2026, notified by G.S.R. 198(E) of 20.03.2026 (instrument identity confirmed, r2); perquisite figures via KPMG flash alert and Taxmann — the specific rule number is routed to §20 V-18 | ✓ (secondary) | owed | annually at Budget | Read the notified Income-tax Rules 2026 text; if the per-meal cap, the conditions or new-regime availability differ, re-version the perquisite rule (§20 V-18) |
| EV-020 | Naukri 118M = investor metric; Resdex ≈ 50M profiles (buyable product) | Verified | vendor-page | Naukri FAQ / investor deck | ✓ | n/a | biannual | — |
| EV-K01 | 6 crore MSMEs as TAM | Killed | — | Udyam 5.31 Cr registrations | — | — | — | Banned (§20); replaced by EV-001 |
| EV-K02 | ₹83.3/USD | Killed | — | — | — | — | — | Banned (§20); replaced by ₹94.43 |
| EV-K03 | 85–98% device integration success | Killed | — | Vendor marketing | — | — | — | Banned (§20); no replacement — unsized |
| EV-K04 | $23.32bn→$38.36bn India HR-tech TAM | Killed | — | unattributed; mislabelled global figure | — | — | — | Banned (§20); replaced by EV-005 |
| EV-K05 | ₹37,500/yr CA fee | Killed | — | ICAI schedule, pre-GST, ≥9 yrs stale | — | — | — | Banned (§20); a pricing rec rested on it |
| EV-K06 | $400 Multiplier EOR | Killed | — | fabricated; absent from cited source | — | — | — | Banned (§20); $300 correct but also banned (provenance) |
| EV-K07 | ₹161 PEPM Zaggle attach | Killed | — | contaminated denominator + borrowed take rate | — | — | — | Banned (§20); model software & attach as separate lines |
| EV-K08 | MCP adoption stats | Killed | — | unverifiable | — | — | — | Banned (§20); no evidence an MCP server moved a deal |
| EV-K09 | Any Peoplebox funding figure | Killed | — | Tracxn record self-contradicts | — | — | — | Banned (§20) |
| EV-K10 | ~41,000 named accounts in 200–999 band as a target | Killed | — | EPFO Appendix-2(v): 173,250 registered vs 41,881 contributing >200 | — | — | — | Denominator failure (registered vs contributing); pick contributing |
| EV-K11 | ₹12,250 Cr 10%-CAGR sensitivity ceiling | Killed | — | correct figure ₹10,905 Cr | — | — | — | Overstated by 12.3%; use ₹10,905 Cr |

#### Rows EV-021–EV-092 (rounds three to five)

Same columns as above. The *Captured* column carries the research round (r1–r5) the capture came from, and a date where the capture record states one. Round three to five research does not log corrigendum searches, so every statutory row reads **owed** in that column: the §02.4 search is an open acceptance-test item (§02.2 G17). A rule version built on such a row cannot leave drafting until the compliance pipeline records the search (§22 AC-RULE-002.3); the recorded search clears the register's "owed" at the same time (§02.10), and every published version then holds a watch subscription on its base instrument (§22 FR-RULE-005). **[Reversed]:** an earlier version of this note let the rule version publish before the search was recorded — it contradicted §22's gate.

*Competition and pricing (research: r5/03, r3/01, r5/01)*

| ID | Claim (abridged) | Marker | Source class | Instrument / URL handle | Captured | Corrig.-checked | Re-verify | Kill criterion (if Hypothesis) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| EV-021 | Keka pricing page shows no live prices; exactly three commented-out spans remain in raw HTML — ₹90 / ₹120 / ₹150 per additional employee (FOUNDATION / STRENGTH / GROWTH). A rendered read cannot see them; a raw fetch can | Verified | vendor-page (raw HTML) | keka.com/pricing — raw fetch, comment-node scan | 5 Sep 2026 (r5) | n/a | on any Keka pricing-page change | — |
| EV-022 | Keka withdrawn list card: FOUNDATION ₹9,999/month up to 100 employees + ₹90 per additional; STRENGTH ₹12,999 + ₹120; GROWTH ₹15,999 + ₹150; Hiring PRO ₹1,500 and ADVANCED ₹2,500 per recruiter per month | Verified — archived | vendor-page (archive) | Keka's own page, Wayback 1 Aug 2024; corroborated twice in 2026 | r5 | n/a | historical — frozen | — |
| EV-023 | Keka small-companies page: "from ₹6,999 per month" and "starts at ₹90 per employee/month" | Verified | vendor-page | keka.com/small-companies | r5 | n/a | on page change | — |
| EV-024 | Keka's price suppression is global: US and UAE pages use the same comment mechanism (withdrawn US card $9 / $16 / $22 PEPM; UAE $4 / $5 / $6) — a company-wide move to a sales-qualified motion | Verified | vendor-page (raw HTML) | keka.com/us/pricing; keka.com/ae/pricing | r5 | n/a | on page change | — |
| EV-025 | Two live Keka pages contradict each other on setup fees ("a nominal setup fee applies" vs "no setup fees"), neither quantified; ToS clause 15: renewal fees "subject to an increase"; the Aug 2024 no-lock-in FAQ is deleted | Verified | vendor-page + vendor terms | keka.com/pricing; /small-companies; /terms-of-services | r5 | n/a | on ToS or page change | — |
| EV-026 | Six of six priced competitors impose a 50-employee minimum billing block (Keka historically 100); a 20-person company cannot buy 20 seats from any of them | Verified | vendor-page | six vendors' rate cards | r5 | n/a | on any rate-card change | — |
| EV-027 | Entry-tier PEPM at 50 employees: Qandle ₹49.00 annual / ₹59.00 monthly; greytHR ₹49.90; Pocket HRMS ₹59.90 annual; Zimyo ₹80.00; HROne ₹99.00; Keka ₹139.98 (₹6,999 floor) or ₹199.98 (archived card). At 20: Qandle ₹122.50 … Keka ₹349.95; greytHR ₹124.75 = ₹29,940 ACV. PEPM is arithmetic on verified block prices | Verified | vendor-page + vendor config file | six vendors' pages; Qandle pricing config | r5 | n/a | biannual; on any rate-card change | — |
| EV-028 | Payroll sits in the entry tier for every vendor that publishes tiers; performance, recruitment, engagement, analytics and workflow are gated upward. Keka has commented "Direct Salary Payout" out of its live entry block | Verified | vendor-page | vendor tier pages; keka.com raw HTML | r5 | n/a | on tier change | — |
| EV-029 | Freemium players (Kredily, Zoho) give away computation and charge for outputs — bank payout files, PF/ESI challans, the annual tax certificate, Form 12BB/124 | Verified | vendor-page | Kredily and Zoho pricing pages | r2 (r2/01); Zoho's page re-read in r3 (r3/03) — not re-captured in r5 (host audit, below) | n/a | on pricing change; re-capture before external use (§02.18) | — |
| EV-030 | No vendor in the six-vendor set claims to submit any filing; greytHR publishes only generation language; MYND/Qandle is the only bundle pairing self-serve HRMS with an outsourced filing operation — unpriced, demo-sold. (Marketing and product surfaces searched, not documentation or a live tenant) | Verified | vendor-page | six vendors' payroll pages | r5 | n/a | biannual | — |
| EV-031 | Frappe HR v16 India payroll = 3 files, 549 lines, 3 regional overrides (HRA exemption ×2, marginal relief); zero Indian state names in the tree; zero ECR/EDLI/EPS/UAN/LWF/24Q/12BB/12BA/27A matches. Gross-to-net is genuinely strong. ERPNext v16 has no India regional module and removed payroll; `india-compliance` is GST/vendor-TDS only | Verified — source repository | source repository | Frappe HR / ERPNext v16 stable trees | r3 | n/a | on each Frappe major release | — |
| EV-032 | TallyPrime ships PF Forms 3A/5/6A/10/12A + ECR, ESI 3/5/6, PT statement, Form 16, 24Q annexures, 12BA, 27A, NPS, gratuity — but no state PT slab table, no LWF engine, no leave module, cannot calculate leave encashment, manual attendance vouchers only; Silver single-PC, multi-user at Gold (3× price); no payroll, PT or LWF add-on in five TDL catalogues. Four cells unresolved: Tally ESS; Frappe income-tax engine correctness; Tally forms' currency with the latest Finance Act; any commercial add-on closing the PT/LWF gap | Verified — product docs | product documentation | TallyPrime help and FAQ; five TDL catalogues | r3, r5 | n/a | on each TallyPrime release | — |
| EV-033 | Ramco FY2025-26 HR & Payroll revenue ₹2,976.15 Mn (+30.8%), single Ind AS 108 segment so India HR revenue is not separable; ZingHR publishes no price. Both are enterprise adjacency, outside the competitive set | Verified | filed-financial + vendor-page | Ramco audited annual report FY2025-26; zinghr.com | r5 | n/a | on next annual report | — |
| EV-034 | Qandle was acquired by MYND Integrated Solutions in April 2025 — now a platform inside a payroll-outsourcing group | Verified | acquirer announcement + trade press | MYND dated announcement | r5 | n/a | event — frozen | — |

*Statutory — EPF/ECR (research: r5/02)*

| ID | Claim (abridged) | Marker | Source class | Instrument / URL handle | Captured | Corrig.-checked | Re-verify | Kill criterion (if Hypothesis) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| EV-035 | ECR text file: `#~#` delimiter (three characters), no header row, 11 fields in order — UAN, Member Name as per UAN, Gross Wages, EPF Wages, EPS Wages, EDLI Wages, Employee PF Contribution, Employer EPS Contribution, Employer PF Contribution, NCP Days, Refund of Advance. Wage Month, Return Type, Contribution Rate and Remark are portal controls, not file content; no filename pattern mandated; the re-engineered ECR (beta, from wage month Sep 2025) did not change the layout. The generator is buildable | Verified | regulator-directive | EPFO portal ECR Help File; revamped-ECR circular | r5 | owed | on any EPFO ECR circular | — |
| EV-036 | Return submission is separated from payment: upload → validate → return statement → approve/reject → Due Deposit Balance Summary → challan with TRRN → pay → receipt. An approved return can never be cancelled; multiple challans are permitted | Verified | regulator-directive | EPFO revamped-ECR circular and FAQ | r3, r5 | owed | on ECR circular | — |
| EV-037 | Three return types: Regular; Supplementary (needs an approved Regular, repeatable, only members absent from all prior returns for that month); Revised (needs an approved Regular, no other return in process, no payment initiated, overwrites prior data) ⇒ the verification gate belongs immediately before payment initiation | Verified | regulator-directive | EPFO revamped-ECR circular and FAQ | r5 | owed | on ECR circular | — |
| EV-038 | Strict month-wise chronological filing with a four-month transitional relaxation: a Regular return for month M is allowed only if returns for all active members of M−4 are filed; a skipped month blocks later months | Verified | regulator-directive | EPFO revamped ECR | r5 | owed | on ECR circular | — |
| EV-039 | Interest under s.7Q is mandatory and auto-calculated; damages under s.14B may be deposited later at the employer's option | Verified | regulator-directive | EPFO revamped-ECR circular para 3(iii)–(iv); FAQ | r5 | owed | on ECR circular | — |
| EV-040 | Only the age-58 EPS rule is a hard system block; "joined after 1 Sep 2014 with wages above ₹15,000" is a pre-filing flag, not a rejection; contributions only between valid date of joining and date of leaving; rate statutory or higher | Verified | regulator-directive | EPFO revamped ECR | r5 | owed | on ECR circular | — |
| EV-041 | Correcting a wrongly recorded date of exit needs a joint declaration by employer and employee — an offline dependency that can block a month's filing | Verified | regulator-directive | EPFO | r5 | owed | on EPFO circular | — |
| EV-042 | NIL months use no file; admin/inspection charges are paid via Direct Challan Entry, enabled only when there are no active members | Verified | regulator-directive | EPFO | r5 | owed | on EPFO circular | — |
| EV-043 | Arrears use a separate "File Arrear Return" flow; no arrear file layout is published — fence it | Verified | regulator-directive | EPFO | r5 | owed | on any EPFO layout publication | — |
| EV-044 | Part-payment contribution file: 6 `#~#`-separated fields — UAN, MEMBER_NAME, EPF_CONTRIBUTION, EPS_CONTRIBUTION, EPF_EPS_DIFF_CONTRIBUTION, REFUND_OF_ADVANCES | Verified | regulator-directive | EPFO | r5 | owed | on EPFO circular | — |
| EV-045 | EPFO's site moved from epfindia.gov.in to www.epfo.gov.in; older printed manual URLs are dead. VPF and International Workers remain in ECR scope | Verified | regulator-directive | www.epfo.gov.in | r5 | n/a | on site change | — |

*Statutory — TDS and the Income-tax Act 2025 (research: r5/02)*

| ID | Claim (abridged) | Marker | Source class | Instrument / URL handle | Captured | Corrig.-checked | Re-verify | Kill criterion (if Hypothesis) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| EV-046 | Form 138 Q4 regular file format not released ("Expected to be released soon", no link); Q4 correction format unavailable; the missing Q4 Annexure II blocks the annual salary certificate (CBDT states the dependency). Fence the Q4 generator and Form 130 Part B generation | Verified, re-checked Sep 2026 | regulator (Protean / CBDT downloads) | Protean regular-downloads page | Sep 2026 (r5) | owed | at every Protean release; forced before Q4 of Tax Year 2026-27 | — |
| EV-047 | Form 138 has three annexures: I (all quarters); II (salary summary, Q4 only); III (pension and interest for specified senior citizens, Q4 only) | Verified | notified-rule | Income-tax Rules 2026; Protean | r5 | owed | on RPU/FVU release | — |
| EV-048 | Form 130 (ex-Form 16) has Parts A, B and C and remains TRACES-generated only — a certificate not generated from TRACES is invalid | Verified | regulator-directive | CBDT / TRACES | r5 | owed | on CBDT notification | — |
| EV-049 | Form 138 is governed by Rule 219, Income-tax Rules 2026; due dates Q1 31 July, Q2 31 October, Q3 31 January, Q4 31 May of the year following the Tax Year | Verified | notified-rule | Income-tax Rules 2026 r.219 | r5 | owed | annually at Budget | — |
| EV-050 | CBDT mapping: 130←16, 131←16A, 133←27D, 137←24G, 138←24Q, 140←26Q, 143←27EQ, 144←27Q; 12BB→124, 12BA→123, 12B/12BAA→122; s.192→s.392, s.194P→s.393(1), s.200(3)→s.397(3)(b), s.197→s.395(1). "Financial Year" becomes "Tax Year"; six-digit field (202627); assessment-year field ≥ 202728. The product accepts both vocabularies in search, imports, labels and help | Verified — CBDT official mapping | regulator-directive | CBDT form and section mapping | r5 | owed | on CBDT notification | — |
| EV-051 | Form 138 file: ASCII `.txt`, `^`-delimited variable-width fields, CRLF-terminated records, record types FH / BH / CD / DD, file type `SL1`; breaking challan sub-heading remap (301→A, 302→B, 303 removed, 304→C …); Token No. becomes "Return Receipt Number"; TAN Registration No. deleted; the form auto-populates from the deductor's TRACES profile | Verified | regulator (Protean file format) | Protean RPU 1.2 file-format note | r5 | owed | on RPU/FVU release | — |
| EV-052 | Dual FVU stack: RPU 1.2 + FVU 1.2 for Tax Year 2026-27 onward; RPU 6.0 + FVU 9.5 for FY 2010-11 to FY 2025-26; mixing versions causes rejection | Verified | regulator (Protean) | Protean downloads page | r5 | owed | on RPU/FVU release | — |

*Statutory — registers, thresholds, POSH (research: r5/04, r3/04)*

| ID | Claim (abridged) | Marker | Source class | Instrument / URL handle | Captured | Corrig.-checked | Re-verify | Kill criterion (if Hypothesis) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| EV-053 | Six employer registers plus a wage slip across three rule-sets: Wages Rules 2026 r.51(1) Forms I, IV, IX + Form V wage slip; OSH Forms XIII, XIV, XV, XIX, XX + Form XVI; SS r.53(1)(a) Form XXII. Non-duplication provisions (OSH r.72(3), SS r.53(1)(a) proviso) mean one canonical set; form numbers configurable per state | Verified — central sphere | notified-rule | Wages, OSH and SS Central Rules 2026 | r5 | owed | on each state's rules | — |
| EV-054 | Retention: Wages r.51(4) "five years after the date of last entry"; OSH r.72(1)(vii) and SS r.53(1)(e) "five calendar years from the date of last entry"; OSH r.76(2) bars destruction unless transferred to a new register; OSH r.72(4) and SS r.53(3) three-kilometre location constraint; IR r.47(1) electronic maintenance compulsory, r.47(2) no period; SS maternity Schedule para 11(a)(2) "in ink" vs r.53(1)(b). State-sphere periods unknown — counsel | Verified — central sphere | notified-rule | Wages, OSH, SS and IR Central Rules 2026 | r5 | owed | on each state's rules | — |
| EV-055 | Form IX is a monthly grid requiring per-day IN and OUT timestamps with a signature row — a present/absent or day-total model is non-compliant. Form I has 36 numbered fields including specimen signature or thumb impression | Verified | notified-rule | Wages Central Rules 2026, Forms I and IX | r5 | owed | on state rules | — |
| EV-056 | POSH Act s.4(1): every employer constitutes an Internal Committee. The ten-worker line is s.6(1) — the Local Committee where no IC exists because the employer has fewer than ten workers. Not an exemption | Verified — mirror (Act text read on a third-party legal database; host audit, below) | statute | POSH Act 2013 ss.4(1), 6(1) — pull from a primary host before customer use | r5 | owed | on amendment | — |
| EV-057 | Thresholds: ESI 10; EPF 20 (scheduled-employments limitation removed); OSHWC factory >20 with power / 40 without; Grievance Redressal Committee 20 or more workers (IR Code s.4); contract labour 50+ (raised from 20); crèche 50; canteen 100; standing orders 300; retrenchment/closure approval 300 (raised from 100); appointment letter at "establishment" (10+ workers, state-prescribed form). Counting unit and sphere are schema fields | Verified — central sphere; mirror (read through MoLE's Compliance Handbook and a PRS copy of the OSH Code; the Code sections at a primary host are owed — host audit, below) | statute + notified-rule | four Labour Codes + Central Rules 2026 | r3 (r3/04); the r5 corrections came from reviews (C5) | owed | on state rules or amendment | — |

*Data protection, Aadhaar, biometrics, CERT-In (research: r4)*

| ID | Claim (abridged) | Marker | Source class | Instrument / URL handle | Captured | Corrig.-checked | Re-verify | Kill criterion (if Hypothesis) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| EV-058 | DPDP commencement per G.S.R. 843(E) (13.11.2025): ss.3–17, 27–34, 44(2) and Rules 3, 5–16, 22, 23 commence on or about 13 May 2027 (13 vs 14 May unresolved). The twelve-month tranche commences only s.6(9) and s.27(1)(d) — Consent Manager registration. A January 2026 compression proposal is non-gazetted, scope unresolved | Verified — mirror for G.S.R. 843(E) | notified-rule (mirror copy) | G.S.R. 843(E) — pull from egazette before customer use | r4, r5 | owed | forced at ~13 May 2027; on any compression notification | — |
| EV-059 | DPDP creates no special or sensitive category of personal data (s.2(t)) — and the SPDI Rules 2011, live today, do classify biometric and financial information as sensitive (EV-060). Both halves are always stated together | Verified | statute | DPDP Act 2023 | r4 | owed (amendment search on the Act — §02.18) | on amendment | — |
| EV-060 | SPDI Rules 2011 (G.S.R. 313(E), 11.04.2011) under IT Act s.43A: r.3 lists biometric and financial information as sensitive; r.5(1) consent in writing before collection; r.7 restricts cross-border transfer; r.8 names IS/ISO/IEC 27001. Live until DPDP s.44(2) omits s.43A (~May 2027); survival thereafter is a counsel question | Verified — provenance caveat (no live .gov.in copy located) | notified-rule | G.S.R. 313(E) | r4 | owed | forced at ~May 2027 | — |
| EV-061 | IT Act s.43A compensation is live today and has no statutory cap | Verified | statute | IT Act 2000 s.43A | r4 | owed | at DPDP s.44(2) commencement | — |
| EV-062 | CERT-In Directions No. 20(3)/2022-CERT-In (28.04.2022, IT Act s.70B(6)): report incidents within six hours; 180 days of ICT logs within India; NIC/NPL NTP sync; Annexure I covers IoT (xiii), cloud (xviii) and attacks on AI/ML systems (xx). Applies from day one | Verified — CERT-In domain | regulator-directive | CERT-In Directions 28.04.2022 | r4 | owed | on any CERT-In direction | — |
| EV-063 | DPDP breach notification (not in force): no materiality threshold; every breach to the Board and to every affected data principal (r.7) | Verified — not in force | notified-rule | DPDP Rules 2025 r.7 | r4 | owed | at ~13 May 2027 | — |
| EV-064 | DPDP r.6(1)(a) names encryption, obfuscation, masking and virtual tokens; r.6(1)(c) requires logging able to detect unauthorised access (not in force) | Verified — not in force | notified-rule | DPDP Rules 2025 r.6 | r4 | owed | at ~13 May 2027 | — |
| EV-065 | Significant Data Fiduciary status arises only by s.10(1) notification; no threshold triggers it; s.10 is not in force; we are not aware of any designation as of September 2026 | Verified (s.10 read); negative, dated Sep 2026 as to designation | statute | DPDP Act s.10 | r4 | owed (amendment search, s.10 component) | on any s.10 notification; biannual designation search | — |
| EV-066 | DPDP Chapter III has exactly four rights — access (s.11), correction and erasure (s.12), grievance (s.13), nomination (s.14); no right against automated decisions, to explanation or to human review; whether ss.11–12 reach s.7(i) processing is a counsel question | Verified | statute | DPDP Act ss.11–14 | r4 | owed (amendment search on the Act) | on amendment | — |
| EV-067 | Aadhaar Act s.38: imprisonment up to ten years and a fine of not less than ₹10 lakh; s.43 reaches company officers personally, with a due-diligence defence. Whether the chain Sharing Regs 5–6 → reg 7 → s.38(g) holds is unresolved — build as though it holds; state nothing about whether it does | Verified | statute | Aadhaar Act 2016 ss.38, 43 | r4 | owed | on amendment | — |
| EV-068 | Aadhaar (Sharing of Information) Regulations 2016: reg 5 basis for a non-requesting employer to collect and store an Aadhaar number; reg 6(2) security, 6(3) redaction before publication, 6(4) encrypted transmission (a legal requirement), 6(5) retention ceiling tied to purpose; reg 7 deems contravention a s.29(2) violation | Verified | notified-rule | Aadhaar Sharing Regulations 2016 | r4 | owed | on UIDAI regulation | — |
| EV-069 | Aadhaar s.8A(4)(b): a registered OVSE may not collect, use or store an Aadhaar number — storing numbers and holding OVSE registration cannot coexist in one legal entity (route to counsel before acting) | Verified | statute | Aadhaar Act s.8A(4)(b) | r4 | owed | on amendment | — |
| EV-070 | AOVR 2021 reg 16A(2): no offline verification on behalf of another entity; reg 15(2): no e-KYC licence-key sharing ⇒ a multi-tenant "we verify Aadhaar for your employees" feature cannot be built; reg 4A(4): Virtual ID may not be stored | Verified | notified-rule | Aadhaar (Authentication and Offline Verification) Regulations 2021 | r4 | owed | on UIDAI regulation | — |
| EV-071 | Aadhaar s.57 omitted by the 2019 Amendment. An employer-terminal face template is not "core biometric information" (s.2(j)) and was not collected under the Act — but a photograph is "biometric information" under s.2(g) | Verified | statute | Aadhaar Act ss.2(g), 2(j) | r4 | owed | on amendment | — |
| EV-072 | We are not aware of any Indian law that requires biometric attendance, as of September 2026 (an unprovable negative, so stated only in this dated form — §23); OSH Code s.33(a) requires an attendance record and is device-neutral | Verified — negative, dated Sep 2026 (s.33(a) read) | statute | OSH Code 2020 s.33(a) | r4, r5 | owed | on state rules; biannual search | — |
| EV-073 | India AI Governance Guidelines (MeitY, Nov 2025): voluntary, non-statutory; recommend against a separate AI law; Annexure 4 maps "discrimination in hiring decisions using AI recruitment tools" to RPwD 2016, Transgender Persons 2019, Code on Wages 2019 and SC/ST (PoA) 1989 (marked illustrative); contemplates "mandatory baseline requirements" | Verified | government publication | MeitY Guidelines, Nov 2025 | r4, r5 | n/a | on MeitY revision | — |
| EV-074 | IT (Intermediary) Amendment Rules 2026 (G.S.R. 120(E), 10.02.2026): the synthetically-generated-information regime covers only audio, visual or audio-visual content, with a carve-out for routine document, presentation and training-material generation. Whether an HR SaaS is an "intermediary" is a counsel question | Verified | notified-rule | G.S.R. 120(E) | r4 | owed | on amendment | — |

*Employment discrimination (research: r5/05)*

| ID | Claim (abridged) | Marker | Source class | Instrument / URL handle | Captured | Corrig.-checked | Re-verify | Kill criterion (if Hypothesis) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| EV-075 | RPwD 2016 s.3(3): actor-neutral horizontal duty that reverses the onus — discrimination unless shown to be "a proportionate means of achieving a legitimate aim". s.20 binds Government establishments only | Verified | statute | RPwD Act 2016 ss.3(3), 20 | r5 | owed (amendment search on the Act; partial search recorded — §02.20) | on amendment | — |
| EV-076 | RPwD Rule 3(2): an establishment of twenty or more persons, on a disability-discrimination complaint, must initiate action or inform the complainant in writing how the act was a proportionate means; Rule 3(3): Commissioner disposes within 60 days (30 in exceptional cases) | Verified — mirror (the 2017 Rules read from government-hosted reproductions of the gazette, not the issuing host; host audit, below) | notified-rule | RPwD Rules r.3 — pull from a primary host before customer use | r5 | owed (partial search recorded — §02.20) | on amendment | — |
| EV-077 | RPwD s.21: an Equal Opportunity Policy for every establishment; content split at twenty by Rules 8(3)/8(4); CCPD template of 5 November 2024; s.21(2) registration has no portal or prescribed form for private establishments | Verified — mirror as to Rules 8(3)/8(4) (host audit, below); s.21 and the CCPD template read on government hosts | statute + notified-rule | RPwD s.21; Rules 8(3)/8(4); CCPD template | r5 | owed (partial search recorded — §02.20) | on CCPD revision | — |
| EV-078 | RPwD s.22 + Rule 9: records with production on demand; Rule 9(1) prescribes five particulars; Form III is for Government establishments only (Rule 14) | Verified — mirror as to Rules 9 and 14 (host audit, below) | statute + notified-rule | RPwD s.22; Rules 9, 14 | r5 | owed (partial search recorded — §02.20) | on amendment | — |
| EV-079 | RPwD s.90: the company and every person in charge are deemed guilty, with an escape for anyone who proves "he had exercised all due diligence"; "company" includes firms and associations. s.93: failure to produce records — up to ₹25,000 per offence plus ₹1,000 per day of continued failure | Verified | statute | RPwD ss.90, 93 | r5 | owed (amendment search on the Act; partial search recorded — §02.20) | on amendment | — |
| EV-080 | Transgender Persons (Protection of Rights) Act 2019 ss.3, 9, 10, 11 + Rules 12–13: no size threshold; designated complaint officer; prescribed timelines. The 2026 Amendment (assent 30 March 2026) commences only on separate notification; it leaves employer duties unchanged but narrows the protected class (substituted s.2(k) with a proviso) and omits s.4(2) — onboarding/EOP copy needs a version flag | Verified — mirror as to the 2019 Act and the 2020 Rules (read on a third-party legal database); the 2026 Amendment read at egazette.gov.in (host audit, below) | statute + notified-rule | Transgender Persons Act 2019, Rules; Amendment Act 2026 | r5 | owed | on the Amendment's commencement notification | — |
| EV-081 | Code on Wages s.3(2)(ii): no discrimination in recruitment on grounds of sex — no threshold; the only statute reaching recruitment on grounds of sex | Verified | statute | Code on Wages 2019 s.3(2)(ii) | r5 | owed (amendment search on the Code) | on amendment | — |
| EV-082 | HIV and AIDS Act 2017 s.3(a): documented-justification duty with an express presumption against the employer; Complaints Officer at 100+ (20+ in healthcare) | Verified — mirror (Act text read on a third-party legal database; host audit, below) | statute | HIV and AIDS Act 2017 — pull from a primary host before customer use | r5 | owed (amendment search on the Act) | on amendment | — |
| EV-083 | *Jane Kaushik* (2025 INSC 1248): respondents 1–3 (State actors) each ordered to pay ₹50,000; respondent 4, a private unaided school, separately ₹50,000; route "Indirect Horizontal Application by the Means of the 2019 Act". *Nitisha v. Union of India*: indirect discrimination; no quantitative threshold; absence of statistical evidence cannot alone defeat a claim (State employer — private employers only by analogy via RPwD s.3(3)) | Verified — mirror (judgment texts read on a third-party legal database; host audit, below) | case law | 2025 INSC 1248; *Nitisha v. Union of India* — pull from the court's own host before any quotation is used outside the PRD | r5 | n/a | on any later judgment | — |
| EV-084 | We are not aware of any Indian case law on algorithmic hiring; the first case will be a matter of first impression. India has no general private-sector anti-discrimination statute covering caste, religion, age or sexual orientation in employment; Articles 14/15/16 bind the State | Verified — negative, dated Sep 2026 | case-law search + statute | — | Sep 2026 (r5) | n/a | biannual case-law search | — |

*Sectoral regulators (research: r5/01, r4/02)*

| ID | Claim (abridged) | Marker | Source class | Instrument / URL handle | Captured | Corrig.-checked | Re-verify | Kill criterion (if Hypothesis) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| EV-085 | SEBI cloud framework SEBI/HO/ITD/ITD_VAPT/P/CIR/2023/033 (06.03.2023): data must reside and be processed within India (with a copy-in-India limb); FAQ Q47/Q50 impose the MeitY-empanelled-infrastructure rule on PaaS/SaaS providers via clause 2(ii); Principle 7(iv) audit and search-and-seizure rights over the CSP and sub-contractors; Principle 7(x) lists exactly 20 mandatory contract terms. CSCRF (Aug 2024) covers a wider population; ISO 27001 mandatory under CSCRF only for MIIs and Qualified REs | Verified | regulator-directive | SEBI circular 2023/033 + FAQ; CSCRF | r5 | owed | on any SEBI circular | — |
| EV-086 | IRDAI Information and Cyber Security Guidelines 2023: no localisation, MeitY or STQC requirement. Localisation only for policy records (Maintenance of Insurance Records Regs 2015, reg 3(7)). PPI Regs 2024 reg 2(14) captures managed payroll, not a self-service licence; reg 53 regulator-access undertaking reaching sub-contractors; offshore outsourcing needs permission | Verified | regulator-directive | IRDAI guidelines and regulations | r5 | owed | on any IRDAI circular | — |
| EV-087 | RBI Outsourcing of IT Services Directions (effective 1 October 2023): data localisation, right to audit including by RBI, sub-contractor consent (para 16(r)) and regulator inspection (para 16(o)) — materiality-gated, entity by entity. Silently adding an LLM vendor can put a bank customer in breach of its own obligations | Verified — mirror | regulator-directive (mirror copy) | RBI Directions — pull from rbi.org.in before customer use | r4, r5 | owed | on any RBI direction | — |

*AI economics and market (research: r2/03, r5/00)*

| ID | Claim (abridged) | Marker | Source class | Instrument / URL handle | Captured | Corrig.-checked | Re-verify | Kill criterion (if Hypothesis) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| EV-088 | COGS stack has four lines: inference (per employee/query — the smallest); WhatsApp (per message since 1 Jul 2025; employee-initiated conversations free inside the 24-hour window; WABA must move to INR billing by 31 Dec 2026 or delivery stops 1 Jan 2027); supervised filing (per registration × state × filing type — the dominant line, unsized); compliance curation (per state maintained — unsized). Revenue scales per employee; the dominant cost per registration | Verified structure / unsized lines | vendor-page + cost-structure analysis | Meta pricing notices; r2/03 and r5 cost analysis | r2, r5 | n/a | forced 31 Dec 2026 (WABA); on any Meta rate change | Lines 3–4 unsized — no margin figure may be stated until §13 and §22 size them |
| EV-089 | Model-choice spread 52.7× on identical workload (FX-invariant; extends EV-007); USD/INR ~₹94.43 (Sep 2026); Gemini 3.x Flash doubles on 1 Jan 2027 (base case, not downside) | Verified | vendor-page + reference rate | provider price cards; RBI reference rate | Sep 2026 (r2, r5) | n/a | on any provider price change; FX monthly; forced 1 Jan 2027 | — |
| EV-090 | greytHR NAVOS "included in every plan" (the only packaging-level AI commitment); Keka AI waitlisted; Keka publishes AI governance commitments (citation on every answer, no silent writes without confirmation, multi-entity policy awareness, RBAC on every AI call, no training external models on customer data) and a "Keka MCP Server" — table stakes to match | Verified — claim posture, not tested | vendor-page | greythr.com; keka.com/keka-ai | r5 | n/a | biannual | — |
| EV-091 | greytHR currently claims "30,000+ companies" (earlier captures: 34,000). Date any share figure | Verified, dated | vendor-claim | greythr.com | Sep 2026 (r1, r5) | n/a | on each use — carry the capture date | — |
| EV-092 | Ramco India revenue (all business units) ₹1,329.96 Mn; standalone Indian entity India geography ₹1,127.51 Mn | Verified | filed-financial | Ramco audited annual report FY2025-26 | r5 | n/a | on next annual report | — |

#### Kill rows EV-K12–EV-K36 (one per corrections-ledger kill item)

Each row kills a claim that the previous version of this PRD carried. The ledger item it discharges is shown in brackets. Where the killed claim had driven a conclusion, the conclusion is marked **[Reversed]** where it appears in this section.

| ID | Claim (abridged) | Marker | Source class | Instrument / URL handle | Captured | Corrig.-checked | Re-verify | Kill criterion (if Hypothesis) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| EV-K12 | [K-01] "Frappe HR ships PT across 15+ states and LWF across 14, free" ⇒ multi-state PT/LWF is not a differentiator | Killed; conclusion [Reversed] | — | Frappe v16 source tree (EV-031); TallyPrime docs (EV-032) | — | — | — | Multi-state PT/LWF is greenfield in both incumbents — a genuine differentiator; on the §20.4 banned list |
| EV-K13 | [K-02] "Inference is 93–99% gross margin; bundling AI free never threatens margin" | Killed | — | EV-088 | — | — | — | Withdrawn. Inference is the smallest of four COGS lines; supervised filing dominates and is unsized. Keep the 52.7× ratio (EV-089); PEPM absolutes are placeholders (EV-008) |
| EV-K14 | [K-03] "DPDP s.7(i): no employee consent needed", stated as current law | Killed; EV-018 [Reversed] | — | EV-058, EV-060 | — | — | — | Not in force until on or about 13 May 2027; today SPDI r.5(1) written consent for sensitive data; on commencement s.7(i) disapplies consent and notice only, not s.8 |
| EV-K15 | [K-04] "144 OT hours per quarter cap" graded Verified | Killed (as Verified) | — | secondary summaries only; gazette text never read (r3 critic) | — | — | — | Re-graded [Hypothesis] inside EV-012; warn, never block (§09, §20) |
| EV-K16 | [K-05] "The Data Protection Board can fine from November 2026" | Killed | — | EV-058 | — | — | — | The November 2026 tranche commences only Consent Manager registration (s.6(9), s.27(1)(d)); an HR SaaS is not a Consent Manager |
| EV-K17 | [K-06] "DPDP has sensitive categories like GDPR" — or "so biometrics are lightly regulated" | Killed (both halves) | — | EV-059, EV-060 | — | — | — | DPDP has none (s.2(t)); SPDI r.3 classifies biometric and financial data as sensitive. State both halves together; never write "sensitive under DPDP" |
| EV-K18 | [K-07] Any 72-hour breach clock presented as the Indian obligation | Killed | — | EV-062 | — | — | — | Six hours (CERT-In Directions, 28.04.2022); DPDP timelines not in force (EV-063) |
| EV-K19 | [K-08] "India mandates data localisation" — or "India has no localisation requirement" | Killed (both) | — | EV-060, EV-062, EV-085–EV-087 | — | — | — | DPDP uses a negative list (empty, not in force); live: CERT-In 180-day in-India logs, SPDI r.7, sectoral RBI/SEBI/IRDAI rules |
| EV-K20 | [K-09] Any single-figure price ceiling (e.g. the earlier "₹45–50 PEPM at 50 employees" — r5) | Killed | — | EV-027 | — | — | — | Two anchors: value floor near ₹50 PEPM; mid-market clearing band ₹80–200 PEPM; our ₹80–150 target inside it (EV-006) |
| EV-K21 | [K-10] "Keka pricing unobtainable" and the Keka price ban; "keka.com is TLS-blocked to non-browser fetchers" | Killed; EV-009 grading [Reversed] | — | EV-021–EV-025; r5 (plain curl retrieves every page; the failure was tool-specific) | — | — | — | Keka pricing registered at EV-021–EV-025; lift the ban (§20) |
| EV-K22 | [K-11] RPwD s.20 as a private-sector duty | Killed | — | EV-075 | — | — | — | s.20 binds Government establishments only; the horizontal duty is s.3(3) |
| EV-K23 | [K-12] "Private entities cannot hold Aadhaar photocopies" | Killed | — | r4 Aadhaar: the May 2022 UIDAI advisory was withdrawn within 48 hours | — | — | — | Never cite it as law; expect it in customer security reviews |
| EV-K24 | [K-13] "We file for you" / filing-as-a-service implying automated submission | Killed | — | EV-030, EV-035–EV-038 | — | — | — | Portal-accepted artefact plus attended, assisted filing under written authority to act; the employer's and deductor's liability is non-delegable; legality under counsel review (§22, §23) |
| EV-K25 | [K-14] "The Supreme Court upheld mandatory biometric attendance (October 2025)" | Killed | — | r4 biometric | — | — | — | The order turned on employees not opposing it and decided nothing about privacy — not authority |
| EV-K26 | [K-15] A 2026 decision holding biometric attendance unlawful even with consent, cited as Indian | Killed | — | r4 biometric: Turkish KVKK 2026/921 | — | — | — | No force in India; name the jurisdiction of any foreign decision in the same sentence |
| EV-K27 | [K-16] greytHR "34,000 customers" as a fixed figure | Killed | — | EV-091 | — | — | — | "30,000+ companies" (current claim); every share figure carries its capture date (EV-016) |
| EV-K28 | [K-17] "Keka renewal rates run below list" | Killed | — | EV-025 (ToS clause 15) | — | — | — | Renewal fees are "subject to an increase" |
| EV-K29 | [K-18] Prescribed-format appointment letter "from employee one / no threshold" | Killed | — | EV-057 | — | — | — | OSH Code s.6(1)(f) attaches to an "establishment" (10+ workers); the form is state-prescribed |
| EV-K30 | [K-19] ₹200 tax-free meal perquisite stated without conditions | Killed | — | r2 benefits; r5 synthesis | — | — | — | Conditions carried as engine constraints (EV-019); rule citation routed to §20 |
| EV-K31 | [K-20] "Payroll Plus ₹5,999" Tally add-on as evidence | Killed | — | EV-032 | — | — | — | Sold on a lookalike domain; no payroll, PT or LWF add-on in five TDL catalogues |
| EV-K32 | [K-21] "Replay satisfies RBI's right-to-audit by construction" | Killed | — | r5 counsel | — | — | — | Deterministic replay supports evidence production for RBI inspections; it does not discharge the contractual audit, access and inspection obligations |
| EV-K33 | [K-22] RBI outsourcing obligations "with no turnover threshold" | Killed | — | EV-087 | — | — | — | Materiality-gated, determined entity by entity |
| EV-K34 | [K-23] "Tally is the incumbent" (singular) | Killed | — | EV-032; r3 critic | — | — | — | Two incumbents, two jobs: Tally owns accounting and the statutory artefacts, greytHR the HRMS job; Tally payroll adoption unknown (§20 V-02) |
| EV-K35 | [K-24] "Every attribute is bitemporal" / universal never-forget replay | Killed | — | r5 engineer | — | — | — | Bitemporality scoped by entity class; erasable classes exist (§14, §15) |
| EV-K36 | [K-25] Any implication that competitors bill actual headcount from employee one | Killed | — | EV-026 | — | — | — | Six of six priced competitors impose a 50-employee minimum block (Keka's was 100) |

Three things the register makes visible. First, a single topic can host multiple markers (EV-007 verified, EV-008 hypothesis; EV-012 split between a verified rate and a hypothesised cap) because provenance strength differs inside one topic. Second, the register carries its own gaps honestly: EV-004 and EV-015 are recorded as *open/undone*, not omitted, and EV-009 shows the reverse path — a blocked row resolved by re-capture rather than re-badged. A register that hides its holes is worse than useless — it launders unknowns into apparent knowledge. Third, the kills now fall into three classes: EV-K01–EV-K11 from the early rounds, all on the §20 banned list (crosswalk below); EV-K12–EV-K36, one per corrections-ledger item, several of which reverse a conclusion this section itself drew; and within the latter, three (EV-K12, EV-K20, EV-K21) that kill an earlier *over-correction* rather than an optimistic claim. All are recorded so none can quietly re-enter a later deck.

#### The banned-number crosswalk (§20 ↔ EV-K)

The §20 "Numbers permanently banned from every model and deck" table and the EV-K rows above are meant to be kept in lockstep. This crosswalk is the reconciliation surface — if a banned number has no EV-K row, or a banned-class EV-K row has no §20 entry, the register is out of sync and that is a defect. The crosswalk below is the reconciled position for this version; the open gaps are listed after it rather than hidden.

| §20 banned figure | EV-K ID | Kill reason (one line) | Replacement |
| --- | --- | --- | --- |
| 6 crore MSMEs as TAM | EV-K01 | Not employers with payroll obligations; overstates by ~2 orders | 7,66,254 contributing EPFO establishments (EV-001) |
| ₹83.3/USD | EV-K02 | Wrong by 13.4% | ₹94.43; FX as strategic input at 90/95/100 (EV-089) |
| 85–98% device success | EV-K03 | Vendor marketing; floor of a range used as fleet average | None — unsized; needs a hardware spike |
| $23.32bn→$38.36bn TAM | EV-K04 | Unattributed; mislabelled global figure | ₹2,100–3,900 Cr bottom-up (EV-005) |
| ₹37,500/yr CA fee | EV-K05 | ICAI schedule pre-GST, ≥9 yrs stale, wrong tax heads | ICAI has no payroll-processing line at all (§18) |
| $400 Multiplier EOR | EV-K06 | Fabricated; absent from cited source | $300 correct but banned (provenance defect) |
| ₹161 PEPM Zaggle attach | EV-K07 | Contaminated denominator; borrowed take rate | Model software & attach as two never-blended lines |
| MCP adoption stats | EV-K08 | Unverifiable; no deal-impact evidence | Own the data and tools, not the assistant (§12) |
| Any Peoplebox funding figure | EV-K09 | Tracxn record self-contradicts on one page | None |
| 173,250 registered / "~41,000 named accounts 200–999" | EV-K10 | Registered vs contributing (4.14×) | 41,881 contributing establishments above 200 |
| ₹12,250 Cr at 10% CAGR | EV-K11 | Overstated by 12.3% | ₹10,905 Cr |
| "Frappe ships PT across 15+ states / LWF across 14" | EV-K12 | Killed — false at source: no state name, PT slab table or LWF engine in Frappe v16 | Multi-state PT/LWF is greenfield in both incumbents (EV-031, EV-032) |
| "93–99% inference gross margin" / "bundling AI free never threatens margin" | EV-K13 | Killed — computed on inference alone, the smallest of four COGS lines | The four-line COGS stack and the 52.7× ratio (EV-088, EV-089); no margin figure until the unsized lines are sized |
| "144 OT hours per quarter" as a verified cap or a blocking rule | EV-K15 | Secondary summaries only; gazette text never read | [Hypothesis] component of EV-012; warn, never block (§20 V-17) |
| Any single-figure PEPM price ceiling (e.g. "₹45–50 PEPM at 50 employees") | EV-K20 | Killed — one vendor's block price generalised (r5) | Two anchors: value floor near ₹50 PEPM; clearing band ₹80–200 PEPM (EV-027) |
| greytHR "34,000 customers" as a fixed figure | EV-K27 | Killed as a fixed figure — a self-claim that moved between captures | "30,000+ companies", capture-dated (EV-091) |
| "Payroll Plus ₹5,999" Tally payroll add-on | EV-K31 | Sold on a lookalike domain | None — no payroll, PT or LWF add-on in five TDL catalogues (EV-032) |

The other nineteen kill rows (EV-K14, EV-K16–EV-K19, EV-K21–EV-K26, EV-K28–EV-K30, EV-K32–EV-K36) kill *claims*, not figures, so they carry no §20.4 banned-number entry; the release-gate guard matches them on their claim key (L-08, ER6), and the conclusions they reverse are enforced through §20.5 and §23's banned-claim lint. EV-K28 also travels as a qualifier in §20.4's "correct but routinely misread" table (Keka renews "subject to an increase").

**Lifted:** the Keka price ban. Keka's pricing is registered at EV-021–EV-025 and the ban is killed by EV-K21; §20 removes it. **Open reconciliation gaps:** eight §20 banned entries carry no EV-K row — 24,18,266 registered establishments as the base; ₹150–500 PEPM attach at 1.5–5%; ₹10,000–25,000 group health per life; the ~₹99 "Keka price point" (its provenance is still unresolved and it is not one of Keka's own published figures, EV-021–EV-023); "Employees' Compensation is a blanket sub-10 liability"; "40+ mandatory health check-up, general"; "Meta charges for India WhatsApp service messages from 1 Oct 2026"; and the 52.7× ratio restated as an absolute per-employee cost (the absolute is EV-008, a Hypothesis, not a kill). This section may add only the kill IDs the corrections ledger assigns, so these eight stay recorded by their §20 row until the next ledger revision assigns IDs (§20).

Two entity-level corrections belong with the kills even though they are not numbers: **Alight** must be removed from the competitive set (it sold its payroll business to H.I.G. Capital in July 2024 and now positions solely around benefits administration), and **Ascent HR** was wrongly inferred to have exited on a DNS lookup of a mistyped domain — it trades normally (Source: §20). These are recorded here so the correction cannot be lost between sections.

#### The [Reversed] register

A kill row records a dead *claim*. This register records the *conclusions* this PRD drew from such claims and has since retracted — the class of error a kill row alone does not show, because the conclusion can outlive the claim in a slide, a positioning line or an architecture decision. Every row names the evidence that reversed it and the sections that own the corrected position; each owning section carries its own inline **[Reversed]** marker with a one-line reason. A reversal is never silent: the earlier statement stays readable, marked, in the section that made it.

| # | Conclusion this PRD previously drew | Corrected position | Evidence | Owning sections |
| --- | --- | --- | --- | --- |
| 1 | Multi-state PT and LWF is not a differentiator — Frappe HR ships PT across 15+ states and LWF across 14, free (false at source) | Greenfield in both incumbents, so a genuine differentiator — once the gazette-sourced state dataset exists (EV-015, §20 V-09) | EV-031, EV-032, EV-K12 | §01, §06, §13, §15, §20, §21 |
| 2 | Inference runs at a 93–99% gross margin, so bundling AI free never threatens margin (withdrawn) | Withdrawn: inference is the smallest of four COGS lines; supervised filing is the dominant line and is unsized. The 52.7× ratio survives; the PEPM absolutes are placeholders | EV-088, EV-089, EV-008, EV-K13 | §01, §13, §20 |
| 3 | No employee consent is needed for employment processing (DPDP s.7(i)), stated as current law | s.7(i) is not in force until on or about 13 May 2027; today SPDI r.5(1) requires written consent before collecting biometric or financial information; on commencement s.7(i) disapplies consent and notice only, not the s.8 duties | EV-018, EV-058, EV-060, EV-K14 | §02.7, §07, §09, §12, §15, §23 |
| 4 | The 144-hour-per-quarter overtime cap is [Verified] and may block | [Hypothesis], secondary summaries only; warn, never block | EV-012, EV-K15, §20 V-17 | §02.7, §09, §20 |
| 5 | Keka's pricing is unobtainable (the Keka price ban); the mid-market vendor pages are TLS-blocked; EV-009 is Ungraded (blocked) | Captured by raw fetch, rendered read and archive; the block was one fetch tool's failure; ban lifted | EV-021–EV-025, EV-009, EV-K21 | §01, §02.5, §02.8, §18, §20, §21 |
| 6 | The effective price ceiling at 50 employees is a single figure (₹45–50 PEPM) — withdrawn | Two anchors: value floor near ₹50 PEPM; mid-market clearing band ₹80–200 PEPM; our ₹80–150 target inside the band | EV-027, EV-006, EV-K20 | §02.3, §18, §21 |
| 7 | RBI outsourcing obligations apply with no turnover threshold | Materiality-gated, determined entity by entity | EV-087, EV-K33 | §13, §17, §20 |
| 8 | Tally is the incumbent (withdrawn) | Two incumbents, two jobs: Tally owns accounting and the statutory artefacts; greytHR owns the HRMS job; Tally payroll adoption unknown | EV-032, EV-K34, §20 V-02 | §01, §04, §20, §21 |
| 9 | Deterministic replay satisfies RBI's right to audit by construction | Replay supports evidence production for inspections; it does not discharge the contractual audit, access and inspection obligations | EV-K32 | §15 |
| 10 | Every retraction in the corpus moved in the optimistic direction | True of rounds one to two only; rounds three to five found round-two corrections that overshot (rows 1, 5, 6) | r3 critic; EV-K12, EV-K20, EV-K21 | §02.3 |
| 11 | A rendering-browser capture is the only route to [Verified] for a vendor page | Dual capture — raw fetch with comment scan, rendered read, the vendor's config file where prices are JS-injected, the archive for withdrawn cards | EV-021; r5 | §02.5 |
| 12 | A failed vendor capture should be re-run "from a different network" | The failure was tool-specific; network vantage and tool stay in the capture record only so a failure can be attributed | EV-K21 | §02.5, §20 V-06 |
| 13 | S.O. 3582(E) is the corrigendum that restored the November 2026 cliff | The corrigendum is S.O. 5936(E) of 19.12.2025; S.O. 3582(E) of 01.07.2026 is the separate retrospective 12% re-notification | r2 | §02.4 |
| 14 | Telangana's PT slab is verified — the only state that is | Only Telangana's employer-registration wording was verified. Maharashtra and Odisha schedules are verified at state primary source; Karnataka's effect is verified with its instrument unretrieved | EV-014, EV-015; r2 | §02.7, §06.4 |
| 15 | The mid-market competitive picture is "unverified until the sweep runs", and the TLS-blocked vendor list is a fact of the research process | Captured as dated list prices and claim posture — not realised price, not tested capability | EV-021–EV-034 | §02.22, §02.24 |
| 16 | PF returns become irreversible at ECR submission | The re-engineered ECR separates return from payment and adds Revised and Supplementary returns; downward correction is possible only before payment initiation, so the verification gate sits immediately before PAYMENT_INITIATED | EV-036, EV-037; r3 | §06, §08 |
| 17 | The register's mirror-sourced rows are EV-018, EV-058, EV-060 and EV-087 (withdrawn) | Twelve: a host audit of the research files' own source lines found eight more rows read, for at least one instrument, only on a third-party host | The source lines of r5/05 and r3/04; the §02.5 host rule; Part A-1 | §02.2, §02.3, §02.7 |
| 18 | EV-029 was captured in round five (withdrawn) | Round two, with Zoho's page re-read in round three; the Kredily half carries the ~70–75% prior | r2/01; r3/03 | §02.7, §02.18 |
| 19 | A statute row's corrigendum column may read "n/a" (withdrawn) | For an Act the amendment search is owed; "n/a" is reserved for statistics, filings, vendor pages, repositories, judgments and government publications | G16; §02.20 CS5 | §02.7 |

Three patterns in the register are worth naming. Rows 1, 5, 6 and 14 reversed a *pessimistic* conclusion — the over-correction class that drove the §02.3 qualification. Rows 2, 3, 4, 7, 9 and 16 reversed a conclusion that made the product or its legal position look simpler than it is. And rows 10–13, 15 and 17–19 are reversals of this section's own methodology statements — rows 17–19 found in this version by the host audit: the register applies to its author.

#### The mirror-sourced register — and instruments read only at second hand

**[Verified — mirror]** is reserved for a finding that meets every Verified test except that the instrument was read from a third-party copy. It licenses the build; it does not license a customer-facing statement until the instrument is pulled from its primary host (§02.2). The same discipline extends to instruments whose *effect* is established but whose *text* was read only through a secondary source or a reference in another instrument; those are listed below the mirror rows because they fail the same test for a different reason.

| Row | Instrument | How it was read | Primary host to pull from | Barred until pulled | Status and trigger |
| --- | --- | --- | --- | --- | --- |
| EV-058 (and EV-018, which rests on it) | G.S.R. 843(E), dated 13.11.2025 — DPDP staged commencement | Third-party mirror; a round-four study reports the egazette.gov.in copy of gazette CG-DL-E-14112025-267647 to be byte-identical to the mirror by MD5 hash (r4), but round five still treats the finding as mirror-sourced (r5) | egazette.gov.in | Any customer-facing commencement date, DPA clause or "DPDP-ready" statement | Keep **[Verified — mirror]** until this register's own capture record logs a primary fetch with a hash; the notification date (13.11.2025) and the gazette-ID date (14.11.2025) differ, and whether commencement falls on the 13th or the 14th of May stays unresolved |
| EV-087 | RBI Outsourcing of IT Services Directions (effective 1 October 2023) | Mirror carrying the RBI header — the RBI document host refused direct PDF access (r4) | rbi.org.in | Any contract clause, sub-processor-consent language or residency commitment offered to an RBI-regulated customer | Pull before the first RBI-regulated prospect's security review; the materiality question is a counsel item (§23) |
| EV-060 | SPDI Rules 2011, G.S.R. 313(E) of 11.04.2011 | Provenance caveat: no live .gov.in copy located (r4) | egazette.gov.in or the MeitY host | Consent-notice text citing r.3 or r.5(1); any customer statement on cross-border transfer under r.7 | Pull before consent-notice copy ships (§07, §09); survival after s.43A is omitted is a counsel question (§23) |
| — (EV-002 context) | S.O. 2060(E) of 3 May 2023 — the 2023 commencement slices the corrigendum carves out | Gazette PDF not located; text corroborated by two independent secondaries agreeing verbatim and by the structure of corrigendum S.O. 5936(E) (r2) | egazette.gov.in | Nothing today — the cliff reading does not rest on its text alone | Owed under §20 V-08, read together with S.O. 5936(E), before ~21.11.2026 |
| EV-014 (Karnataka February element) | DPAL 08 SHASANA 2025 of 15.04.2025 | Effect read on the state PT portal and corroborated by several sources; the instrument itself was not retrieved (r2) | Karnataka DPAL | A citation of the instrument (the rate itself may be used — its effect is verified) | Retrieve; then run the corrigendum search (§02.4) |
| EV-012 (cap) | The "144 OT hours per quarter" provision | Secondary summary only (r2) | Wages and OSH Central Rules gazette text | Any blocking rule; any customer statement that a cap exists | §20 V-17 |
| EV-019 | The Income-tax Rules 2026 provision for the ₹200-per-meal perquisite and its conditions | Instrument identity confirmed (G.S.R. 198(E), 20.03.2026); the perquisite rule text read through secondary sources only (r2) | CBDT / egazette.gov.in | A rule-number citation anywhere in the product | §20 V-18 |
| — (context for §02.1) | S.O. 2698(E) of 29.05.2026 — 12% simple interest on delayed EPF amounts, deemed from 21.11.2025 | Read through a professional-services flash alert quoting the notification (r1) | egazette.gov.in | Any customer-facing statement of the interest regime | Read before the interest calculation is published as a rule-store row |
| EV-056 | POSH Act 2013, ss.4(1) and 6(1) | Full text read on a third-party legal database (r5/05 finding 32) | egazette.gov.in, or indiacode.nic.in for the text with the amendment search run separately (§02.5 host rule) | Customer-facing statements of the Internal Committee duty or of the Local Committee line (§06.1) | Host audit, this version; pull before §06.1's POSH copy reaches a customer |
| EV-057 | The Code sections carrying the central-sphere thresholds — among them IR Code s.4 and the OSH Code thresholds | Through MoLE's Compliance Handbook, a government summary (r3/04 findings 10, 13, 14, 16), and a PRS copy of the OSH Code (finding 9); the counting-unit and appointment-letter corrections came from round-five reviews (C5) | egazette.gov.in or indiacode.nic.in, section by section | Threshold statements shown to a tenant as law, including step-function alerts that cite a section | Host audit, this version; read each section before a threshold alert cites it (§06.1) |
| EV-076, EV-077, EV-078 | RPwD Rules 2017, Rules 3, 8, 9 and 14 | "The original 15 June 2017 gazette as reproduced on two independent government sites", one of them a Goa state department's upload (r5/05 findings 3, 6–8 and the note to finding 41) — two agreeing copies, neither on the issuer's host | egazette.gov.in or the issuing department's host | The RPwD Rule 3(2) written-response scaffold and the EOP generator's legal text (FR-LEG-002); any positioning line resting on Rule 3(2) (§10, §23) | Host audit, this version; pull before those templates are cleared. The comparison is textual where the primary PDF is a different rendering (§02.20, MP6) |
| EV-080 | Transgender Persons (Protection of Rights) Act 2019 and Rules 2020 | Act text on a third-party legal database (r5/05 findings 23, 25); the Rules' gazette identity (G.S.R. 592(E), 25.09.2020) taken from a judgment's text (finding 28). The 2026 Amendment was read at egazette.gov.in (finding 24) and needs no pull | egazette.gov.in | Complaint-officer workflow legal text and EOP copy | Host audit, this version; pull with the version-flag work the Amendment already requires |
| EV-082 | HIV and AIDS (Prevention and Control) Act 2017 | Third-party legal database (r5/05 findings 30, 31) | egazette.gov.in or indiacode.nic.in | Complaints Officer workflow text and any documented-justification copy (§10) | Host audit, this version; pull before that text is cleared |
| EV-083 | *Jane Kaushik* (2025 INSC 1248); *Nitisha v. Union of India* | Judgment texts on a third-party legal database (r5/05 findings 26, 27, 37, 38) | The court's own judgment host | Any quotation of either judgment outside this PRD | Host audit, this version; pull before a quotation is cleared |

The Central Rules under the four Codes illustrate how a row leaves this table. Round two could not render the gazette for the 8 May 2026 notification and rested its date on several professional-services sources (r2); round five then read the Wages, Social Security, OSH and Industrial Relations Central Rules first-hand (r5). Those rules now support Verified rows (EV-053–EV-055, EV-057) — the row left the second-hand state by a primary read, not by the passage of time.

#### Provenance by round — what each research round did, killed and got wrong

The register's rows come from five research rounds. The table reads the rounds as a sequence of adversarial passes, because the direction and the rate of their corrections are what §02.3 turns into planning discipline. Counts are as reported by each round's own critic or synthesis; where a round published no count, none is invented.

| Round | Shape | What it established or killed | Reported retraction count | What it got wrong, and which later round caught it |
| --- | --- | --- | --- | --- |
| **r1** | First sweep; eight dimensions — SMB and mid-market, AI in HR, global reference products, incumbent AI roadmaps, enterprise, statutory payroll, buyer pain, GTM and pricing | Vendor price cards and a statutory-payroll dimension its critic called build-grade; its own retraction log removed, among others, an FY 2026-27 perquisite table, a set of Income-tax Act 2025 section and form mappings, and unsourced EPF wage-ceiling proposals (r1) | Per dimension where reported (one AI dimension retracted 18) | Its critic found three structural gaps — no demand-side research, AI never costed, scope never interrogated (r1 critic). Its market narrative (TAM, the 20–50 "vacuum", a paid floor, AI as revenue) died in round two |
| **r2** | Adversarial sweep against r1; ten dimensions | Decision-grade denominator (7,66,254 contributing establishments, EV-001), the statutory step function, the ₹0 floor, the 52.7× ratio; kills EV-K01–EV-K11; its own verifier retracted a round-two report's "no November 2026 cliff" by finding corrigendum S.O. 5936(E) (§02.4) | ~60 across six dimensions (r2 critic); ~90 across rounds one and two (Draft 1 provenance line) | Its pessimistic corrections overshot in places: the Frappe PT/LWF kill (round three), the ECR irreversibility line (round three), Keka "unobtainable" (round five). Its critic's shorthand "only Telangana was verified" was carried into this PRD as a verified Telangana slab, when the dimension had verified only the employer-registration wording (row 14 above) |
| **r3** | Five dimensions — Frappe and Tally parity, the HR-ops month and personas, GTM channel mechanics, vertical workflow deltas, the integration surface; no architecture dimension was delivered (r3 critic) | Frappe v16 and TallyPrime parity from source code and product documentation (EV-031, EV-032); the central-sphere versus state-sphere correction; the re-engineered ECR's Revised and Supplementary returns | 12, 13, 14 and 15 across the four dimensions that reported a count — roughly 54 (r3 critic) | Its dimensions disagreed on whether to code against the 11-field ECR layout; its critic sided with caution; round five found the layout unchanged and the generator buildable (EV-035). Parts of it were written in the pre-2025-Act form vocabulary (resolved by EV-050) |
| **r4** | Four dimensions — DPDP employer and processor duties, the AI–data-protection intersection, biometric attendance, the Aadhaar regime | The commencement analysis: almost nothing in DPDP binds today; the live obligations are CERT-In and the SPDI Rules (EV-058–EV-074). The Turkish-decision landmine (EV-K26) and the non-authority of the October 2025 order (EV-K25) | 7, 8, 11 and 7 — 33 (r4 critic) | Its four dimensions were not reconciled with each other — the DPDP r.8(3) retention floor and processor penalty exposure were stated at high confidence in one dimension and flagged as counsel questions in another (r4 critic); both are counsel items (§23). Anti-discrimination law, SEBI and IRDAI were not researched; round five closed them |
| **r5** | Five research files (SEBI, IRDAI and Tally TDL; the ECR and TDS file formats; Keka and the mid-market tier; statutory retention and registers; AI hiring and discrimination law), three reviews (CFO, counsel, engineer) and a synthesis | Principally EV-021–EV-030, EV-033–EV-057 and EV-075–EV-087; kills including EV-K13, EV-K20–EV-K22, EV-K24, EV-K28, EV-K31, EV-K32, EV-K35, EV-K36; the correction that an earlier retraction of SEBI's FAQ on PaaS/SaaS providers was wrong (EV-085) | Thirteen in the retention-and-registers study (r5/04); others not tallied | The registers study read S.O. 5319(E) without S.O. 5936(E) and concluded there is no one-year sunset — not adopted (§02.4). The rule "later round wins" is applied to readings of the law, not to readings that omit an amending instrument |

**The measured error-rate note.** The one quantity that survives every round is the rate at which findings die when someone re-opens the source: round three killed roughly 13 per reporting dimension and round four roughly 8. From that count the round-three critic judged that any round-one or round-two finding not yet re-checked should be treated as roughly **70–75% reliable** (r3 critic). Three limits govern its use. First, it is the critic's judgement from a kill count; the per-dimension finding totals that would turn it into a computed rate are not published, so it is a planning prior, not a measurement. Second, it is **symmetric**: rows 1, 5, 6 and 14 of the [Reversed] register are early claims that were wrong in the pessimistic direction. Third, it applies to *unrechecked* claims only; a row re-verified at source in rounds three to five carries its own grade and capture date and is not discounted again. The operative use is therefore narrow and mechanical: a register row whose *Captured* column shows only r1 or r2 and no later re-check is treated as roughly 70–75% reliable wherever it feeds a decision, and is queued for re-check before it reaches a contract or the engine (haircut schedule, §02.3).

**Worked arithmetic on the prior.** Eight of EV-001–EV-020 carry the prior (the table below), and the host audit adds EV-029's Kredily half — nine components in all. At 70–75% reliability each, the expected number wrong in some load-bearing respect is 9 × 0.25 = 2.25 to 9 × 0.30 = 2.7: two or three, in unknown directions. The prior does not say which, which is why each is queued for re-check rather than discounted in place. Where one decision rests on several unrechecked rows, the chance that all of them hold falls quickly if their errors are independent: 0.70 × 0.70 = 0.49 to 0.75 × 0.75 = 0.5625 for two rows, and 0.343 to 0.422 for three. Independence is an assumption — rows from one research dimension can share an error — so these figures illustrate why a one-way door may not rest on unrechecked rows (§02.17). They are not probabilities to quote.

#### Round of origin and last source contact — EV-001 to EV-020

The error-rate note can be applied only if each row says which round last touched its source. EV-021–EV-092 carry their round in the *Captured* column. The table below supplies the same field for EV-001–EV-020, from the research files. It answers the review finding that no marker carried a round number, which made the discount unusable at exactly the points where one-way-door decisions sit (r5 review-engineer; §02.17). "Re-checked at source in r3–r5" means a later round went back to the source itself — a later review citing the row does not count.

| Row | Round of origin (research file) | Last source contact | Re-checked at source in r3–r5 | Reliability prior | Next action |
| --- | --- | --- | --- | --- | --- |
| EV-001 | r2 — r2/09 grepped the text-extracted EPFO Annual Report 2023-24; the r2/05 verification pass re-read it | r2 | No | Applies mechanically. The row is a verbatim read of a government statistic that reconciles with the members total (7,37,39,204 ÷ 7,66,254 = 96.23 employees per establishment) | Re-read at the next EPFO annual report — already the row's trigger |
| EV-002 | r1 (r1/06); r2 (r2/10 found corrigendum S.O. 5936(E)) | r5 — r5/04 read S.O. 5319(E) without the corrigendum; not adopted (§02.4) | Contested, not cleared | Applies, on top of a forced dated re-check | §20 V-08: read S.O. 5936(E) with S.O. 2060(E) before ~21.11.2026 |
| EV-003 | r2 (r2/10) | r2 | No | Applies | Re-read S.O. 3582(E) at the issuing host with a corrigendum search; it backs the published `pf_rate` rows (§14.6.2) |
| EV-004 | — | — | — | Not applicable: no instrument exists | §20 V-08 watch |
| EV-005 | r2 (r2/09: eleven filings totalling ₹1,374.12 Cr; the gross-up assumes the eleven are 35–65% of spend) | r2 | No | Applies to the inputs; the gross-up is modelled whatever its round | Re-pull the filings at the next annual cycle; the range never enters a contract (§02.14) |
| EV-006 | An r2 hypothesis (the ₹50–150 ARPU band, r2 critic) re-anchored on r5 list prices (EV-027) | r5 for the anchors | The anchors yes; the hypothesis cannot be settled at a desk | Not applicable — [Hypothesis] | §20 V-01, V-03 |
| EV-007 | r2 (r2/03 recomputed every USD figure; spread 52.7×) | Carried forward by EV-089 | Through EV-089 | Cite EV-089 | Re-derive on any provider price change |
| EV-008 | r2 (r2/03: the 23,675 / 2,045 token estimate) | r2 | No | Not applicable — [Hypothesis] | §20 V-04, V-14 |
| EV-009 | By reference to EV-021–EV-027 (r5) | r5 | Yes | Does not apply | — |
| EV-010 | r1 (r1/06); r2 (r2/05 read CoSS s.2(88) from the gazette PDF; r2/10 recomputed MoLE FAQ Q7) | r3 (r3/04 read the MoLE Handbook annexure) | Yes — a government handbook, not the gazette | Does not apply | Re-read on any add-back notification |
| EV-011 | r2 (r2/10: RPU/FVU version strings; the FY 2026-27 correction block on Protean's page) | r5 — detail now in EV-046–EV-052 | Yes | Does not apply; cite EV-046–EV-052 for detail | Every Protean release (§02.18) |
| EV-012 | Rate: r1 (read against the gazette PDF). Cap: r1/06 and r2/04, both through KPMG GMS Flash Alert 2026-127 | Rate r3 (MoLE handbook); cap r2 | Rate yes; cap no | Rate: does not apply. Cap: not applicable — [Hypothesis] | §20 V-17 |
| EV-013 | r2 (r2/04: four independent sources, which its verifier called the dimension's best work) | r2 | No | Applies | The §20 V-11 bench test is the re-check |
| EV-014 | r2 (r2/10) | r2 | No | Applies | Retrieve DPAL 08 SHASANA 2025 and run the corrigendum search (§20 V-09) |
| EV-015 | r1, r2 | — | — | Not applicable — Ungraded (undone) | §20 V-09 |
| EV-016 | r1 (34,000); r5 (30,000+) | The September 2026 capture | Yes | Does not apply; the date travels with the figure | Re-capture on each use (EV-091) |
| EV-017 | r2 (r2/05 extracted the ICAI PDF and searched its full text) | r2 | No | Applies — and the document read is pre-GST, with a February 2020 revision unread (§02.2 G15) | Retrieve the revision and repeat the search before the negative is used outside the PRD |
| EV-018 | r4 (r4/01); r5 (synthesis) | r5 | Yes, through EV-058 and EV-060 | Does not apply; the mirror and caveat qualifiers do | Pull G.S.R. 843(E) and G.S.R. 313(E) from their primary hosts (mirror register, above) |
| EV-019 | r1 (r1/06); r2 (r2/02; r2/10 confirmed G.S.R. 198(E)) | r5 — a counsel spot-check, not a read of the rule text | Spot-check only | Not applicable — [Hypothesis] | §20 V-18 |
| EV-020 | r2 (r2/08 verified the 118M figure against the filing, and Resdex's "over 50 million" against Naukri's FAQ) | r2 | No | Applies | Re-read at the next investor presentation |

Eight rows carry the prior: EV-001, EV-002, EV-003, EV-005 (inputs), EV-013, EV-014, EV-017 and EV-020. Five of them feed a build or positioning decision today — EV-002 and EV-003 the EPF rule rows, EV-014 the Maharashtra, Odisha and Karnataka PT rows, EV-013 the ADMS receiver committed to v1, and EV-017 the filing-not-payslip positioning in §04, §18 and §19 — so they sit in the re-check backlog's upper bands (§02.18), EV-002 in the first. The other three feed plans only and sit in its last band.

#### Research references and host audit — EV-021 to EV-092

The *Captured* column gives a round; a re-checker needs the finding and the host the source was read on. This table supplies both for every row EV-021–EV-092, from the research files' own finding numbers and source lines, and applies the §02.5 host rule to each. With the table above it seeds `Capture.research_ref` and `Capture.host_is_primary` for the whole register (§02.21).

The audit changed three things, each corrected in the rows above rather than noted here only. **Host:** eight rows were read, for at least one instrument they rest on, only on a third-party host — or, for EV-057, through a ministry summary and a third-party copy — namely EV-056, EV-057, EV-076, EV-077, EV-078, EV-080, EV-082 and EV-083, and they now carry `mirror` under Part A-1, alongside EV-058, EV-060 and EV-087, which the ledger had already flagged. **Round:** EV-029's capture was recorded as round five; its sources were read in round two (r2/01) and Zoho's page again in round three (r3/03), and round five did not re-capture them. **Search:** seven statute rows (EV-059, EV-065, EV-066, EV-075, EV-079, EV-081, EV-082) read "n/a" in the corrigendum column, which G16 reserves for statistics, filings and vendor pages; for an Act the amendment search is owed, and they now say so.

| Row | Research file · findings | Host the source was read on | Primary host? | Effect on the row |
| --- | --- | --- | --- | --- |
| EV-021 | r5/03 · 1, 2 | keka.com/pricing, raw fetch by plain curl (HTTP 200, 318,005 bytes) | Yes — the vendor's own page | — |
| EV-022 | r5/03 · 4, 5 | The Wayback snapshot of Keka's own page (1 Aug 2024); two 2026 third-party corroborations | Yes — the archive of the vendor's page; the corroborations are leads | `archived` |
| EV-023 | r5/03 · 6 | keka.com/small-companies | Yes | — |
| EV-024 | r5/03 · 3 | keka.com/us/pricing and /ae/pricing | Yes | — |
| EV-025 | r5/03 · 7, 8, 9 | Keka's pricing FAQ, small-companies page and terms of service | Yes | — |
| EV-026 | r5/03 · 29 | Six vendors' own pricing pages | Yes | — |
| EV-027 | r5/03 · 30, with 14, 17, 21, 22, 23 | Six vendors' pages; Qandle's pricing config file; zimyo.com by rendered read only (HTTP 403 to a raw fetch) | Yes | Zimyo's comment-node question open (§02.5) |
| EV-028 | r5/03 · 31, 11 | Vendors' tier pages; Keka's raw HTML, where "Direct Salary Payout" sits inside a 477-character comment | Yes | — |
| EV-029 | r2/01 · 5, 6, 13, 14; r3/03 (Zoho plan names) | Kredily's and Zoho's pricing pages | Yes | Last source contact r2 for Kredily and r3 for Zoho: the ~70–75% prior applies to the Kredily half; re-capture owed (§02.18) |
| EV-030 | r5/03 · 32 | Six vendors' marketing and product pages | Yes | N2 negative; documentation and live tenants not searched |
| EV-031 | r3/01 · 1, 2, 3, 5, 6, 7, 21, 22, 23 | The frappe/hrms version-16 tree; ERPNext version-16 at commit 0b50853 (2 September 2026); the india-compliance modules list | Yes — the vendors' own repositories | `declared_capability`; N2 negative |
| EV-032 | r3/01 · 3–11, 18; r5/01 · 25–30 | help.tallysolutions.com; five TDL catalogues | Yes for TallyPrime's documentation; the catalogues are the searched corpus | `declared_capability`; N2 for the add-on null |
| EV-033 | r5/03 · 24, 25, 26 | Ramco's audited annual report, re-extracted from the PDF; zinghr.com (no rupee figures; /pricing returns 404) | Yes | — |
| EV-034 | r5/03 · 20 | MYND's dated announcement; Qandle's own product surface | Yes | — |
| EV-035 | r5/02 · 1–5 | EPFO User Manual ReECR v3.0 and the portal Help File; the revamped-ECR circular of 26.09.2025 and FAQ, image-only scans read as images | Yes — EPFO-operated hosts | `corrigendum_owed`; second transcriber owed (§22 FR-RULE-007) |
| EV-036 | r5/02 · 8 | Revamped-ECR circular and FAQ | Yes | — |
| EV-037 | r5/02 · 9 | As EV-036 | Yes | — |
| EV-038 | r5/02 · 10 | Three EPFO documents | Yes | — |
| EV-039 | r5/02 · 7 | Circular para 3(iii)–(iv); FAQ | Yes | — |
| EV-040 | r5/02 · 11, 12 | Circular; FAQ | Yes | — |
| EV-041 | r5/02 · 13 | FAQ | Yes | — |
| EV-042 | r5/02 · 16 | FAQ and manual | Yes | — |
| EV-043 | r5/02 · 17 | www.epfo.gov.in/circulars/, all 1,869 PDFs enumerated; the revamped-ECR page; portal help paths (redirect to login or 404) | Yes | N2 negative |
| EV-044 | r5/02 · 6 | The contribution help file reproduced in the manual, read at 1,400 dpi | Yes | — |
| EV-045 | r5/02 · 18, 14 | www.epfo.gov.in | Yes | — |
| EV-046 | r5/02 · 19, 20, 21, 36 | Protean's regular and correction download pages (static HTML); CBDT's guidance | Yes | N3 negative |
| EV-047 | r5/02 · 22 | CBDT guidance note | Yes | — |
| EV-048 | r5/02 · 23, 24 | CBDT and TRACES | Yes | — |
| EV-049 | r5/02 · 25; r5/04 · 31 | CBDT Guidance Note on Form 138; Income-tax Rules 2026 r.219(4) at egazette.gov.in | Yes | — |
| EV-050 | r5/02 · 26–29 | CBDT's mapping on incometaxindia.gov.in, reached with a complete browser header set | Yes | — |
| EV-051 | r5/02 · 30, 32, 33 | Protean's RPU 1.2 file-format note; the Q1–Q3 sample file parsed byte by byte | Yes | — |
| EV-052 | r5/02 · 34, 35 | Protean's downloads page | Yes | The page labels the format "Version 1.2" and the workbook says 1.1 (finding 35): versions pinned by the artefact |
| EV-053 | r5/04 · 6, 7 | Wages, OSH and SS Central Rules at egazette.gov.in | Yes | — |
| EV-054 | r5/04 · 3, 4, 5, 9–12 | Central Rules at egazette.gov.in | Yes | — |
| EV-055 | r5/04 · 15, 16 | Wages Central Rules Forms I and IX at egazette.gov.in | Yes | — |
| EV-056 | r5/05 · 32 | POSH Act text on a third-party legal database | **No** | `mirror` added |
| EV-057 | r3/04 · 9, 10, 13, 14, 16; r5 synthesis item 20 and counsel review (reviews, C5) | MoLE's Compliance Handbook on labour.gov.in (a summary); a PRS copy of the OSH Code | **No** — a summary and a third-party copy | `mirror` and `instrument_owed` added |
| EV-058 | r4/01 · 1 and its verification note; r4/02 · 1 | A third-party mirror (r4/01); an egazette.gov.in copy reported byte-identical by MD5 (r4/02) | Treated as mirror, as the ledger grades it | Unchanged: this register's own re-checker owes the primary fetch (AC-EVR-13) |
| EV-059 | r4/01 · 17; r4/02 · 15; r4/03 · 1 | DPDP Act at egazette.gov.in and meity.gov.in, reported byte-identical (r4/02) | Yes | Amendment search owed |
| EV-060 | r4/01 · 16; r4/02 · 7, 8; r4/03 · 3, 4 | Copies of G.S.R. 313(E) on wipo.int and dataguidance.com | No | `provenance_caveat` (unchanged) |
| EV-061 | r4 critic; r4/03 · 19 | IT Act on indiacode.nic.in | Yes — a government host | Amendment search owed; falsified on DPDP s.44(2) commencement (§02.3 scheduled movements) |
| EV-062 | r4/01 · 18; r4/02 · 18, 19; r4/03 · 13 | cert-in.org.in | Yes | — |
| EV-063 | r4/01 · 9; r4/02 · 20 | DPDP Rules at meity.gov.in and egazette.gov.in | Yes | `not_in_force` |
| EV-064 | r4/01 · 8; r4/02 · 22 | As EV-063 | Yes | `not_in_force` |
| EV-065 | r4/01 · 12; r4/02 · 11 | DPDP Act; meity.gov.in | Yes | N4 as to designation |
| EV-066 | r4/01 · 5; r4/02 · 12, 13; r4/03 · 17 | DPDP Act at egazette.gov.in | Yes | N1 negative for Chapter III |
| EV-067 | r4/04 · 19 | Aadhaar Act as amended, uidai.gov.in | Yes | Counsel item D-8 |
| EV-068 | r4/04 · 2, 11, 12 | Sharing Regulations, uidai.gov.in | Yes | — |
| EV-069 | r4/04 · 3 | uidai.gov.in | Yes | — |
| EV-070 | r4/04 · 4 | AOVR 2021, uidai.gov.in | Yes | — |
| EV-071 | r4/04 · 1, 21; r4/03 · 7 | uidai.gov.in | Yes | — |
| EV-072 | r4/03 · 18; r5/04 · 14 | The OSH Code on labour.gov.in | Yes — the administering ministry | N4 negative |
| EV-073 | r4/02 · 16; r5/05 · 35, 36 | The Guidelines on static.pib.gov.in | Yes — the Government's own publication | — |
| EV-074 | r4/02 · 17 | meity.gov.in | Yes | — |
| EV-075 | r5/05 · 1, 2 | RPwD Act on indiacode.nic.in | Yes — a government host | Amendment search owed; one candidate amending Act excluded (§02.20) |
| EV-076 | r5/05 · 3 | Government-hosted reproductions of the 2017 Rules, not the issuer's host | **No** | `mirror` added |
| EV-077 | r5/05 · 5, 6, 14, 43 | Act on indiacode.nic.in; Rules as EV-076; the CCPD template on the CCPD's government-hosted site | Partly | `mirror` added as to Rules 8(3) and 8(4) |
| EV-078 | r5/05 · 7, 8 | Act on indiacode.nic.in; Rules 9 and 14 as EV-076 | Partly | `mirror` added as to the Rules |
| EV-079 | r5/05 · 10, 11, 12 | Act on indiacode.nic.in; a 2023 gazette instrument at egazette.gov.in (finding 10) | Yes | Amendment search owed |
| EV-080 | r5/05 · 23, 24, 25, 28 | 2019 Act on a third-party legal database; the 2026 Amendment at egazette.gov.in; the 2020 Rules identified through a judgment's text | Partly | `mirror` added as to the Act and the Rules |
| EV-081 | r5/05 · 18 | Code on Wages on labour.gov.in | Yes — the administering ministry | Amendment search owed |
| EV-082 | r5/05 · 30, 31 | HIV and AIDS Act on a third-party legal database | **No** | `mirror` added |
| EV-083 | r5/05 · 26, 27, 37, 38 | Judgment texts on a third-party legal database | **No** | `mirror` added |
| EV-084 | r5/05 · 34, 39 | A search of one third-party case-law index | Not applicable — a search, not an instrument | N4; the single-index coverage is recorded |
| EV-085 | r5/01 · 1–8, 16 | SEBI's circular, FAQ and CSCRF PDFs from sebi.gov.in | Yes | — |
| EV-086 | r5/01 · 18, 19, 21–24 | IRDAI's own document server | Yes | N1 negative |
| EV-087 | r4/02 · 25 | A copy carrying the RBI header; the RBI document host refused direct access | No | `mirror` (unchanged) |
| EV-088 | r2/04 · 20; r5 CFO review; r5 synthesis items 6, 7 | Meta's developer documentation for the WhatsApp dates; the cost structure is analysis | Yes for the Meta dates | Lines 3–4 unsized |
| EV-089 | r2/03 · 1, 4 and its recomputed spread | Provider price cards; the reference rate | Yes | — |
| EV-090 | r5/03 · 12, 13, 33 | keka.com/keka-ai; greytHR's pricing page | Yes | `claim_posture` |
| EV-091 | r5/03 · 14; r1/08 for the earlier 34,000 capture | greythr.com | Yes | `dated` |
| EV-092 | r5/03 · 27 | Ramco's audited annual report | Yes | — |

EV-001–EV-020 were checked against the sources the round-of-origin table records: EV-002 and EV-003 were read at egazette.gov.in and EV-014's three states on their own tax departments' sites (r2/10 findings 1, 12 and 18–20). None of those rows rests only on a third-party host beyond EV-018, which inherits EV-058's qualifier, and EV-012's cap and EV-019, both already [Hypothesis] because they were read through secondary sources.

Two limits on the table. It records where the research *says* it read each source; the register's own re-checker has not repeated those fetches, so a "Yes" is a lead for the capture record, not a capture. And a mirror read found here does not change what the build may do with a row — mirror rows enforce in the engine, flagged (§02.14) — only what may be said outside the PRD before the pull closes.

**AC-EVR-36 · Every row names its research reference and its host.** *Given* any live row, *when* the register is linted, *then* it has a `research_ref` (round, file, finding) and each of its captures is classed primary or not under the §02.5 host rule; a row whose only capture of an instrument is on a non-primary host and which carries neither `mirror` nor `provenance_caveat` fails lint L-25.

#### The host audit, as the register writes it

The audit is eight L19 transitions (§02.6), each written as a grading event with its evidence. None changes what the build may do — mirror rows enforce in the engine, flagged — and each holds a named piece of customer-facing text until its pull closes.

| Row | Qualifier written | Evidence | Held until the pull closes | Pull |
| --- | --- | --- | --- | --- |
| EV-056 | `mirror` | r5/05 finding 32 | Customer-facing POSH statements (§06.1) | The POSH Act at a primary host |
| EV-057 | `mirror`, `instrument_owed` | r3/04 findings 9, 10, 13, 14, 16 | Any threshold alert or statement that cites a Code section to a tenant; the obligation itself still displays | Each Code section behind the thresholds |
| EV-076 | `mirror` | r5/05 finding 3 | The RPwD Rule 3(2) response scaffold (FR-LEG-002) | One pull of the 2017 Rules, shared with EV-077 and EV-078 |
| EV-077 | `mirror` as to Rules 8(3) and 8(4) | r5/05 findings 6, 14 | The EOP generator's legal text | Shared, as above |
| EV-078 | `mirror` as to Rules 9 and 14 | r5/05 findings 7, 8 | Records-register copy that cites the Rules | Shared, as above |
| EV-080 | `mirror` as to the 2019 Act and 2020 Rules | r5/05 findings 23, 25, 28 | Complaint-officer workflow text and EOP copy | The Act and the Rules at egazette.gov.in |
| EV-082 | `mirror` | r5/05 findings 30, 31 | Complaints Officer workflow text | The Act at a primary host |
| EV-083 | `mirror` | r5/05 findings 26, 27, 37, 38 | Any quotation of either judgment | The court's own copies |

Each event suspends the dependent §23 entries under FR-LEG-001 AC2 and opens one `MirrorPull` per instrument, so the eight events open five pulls. The cheapest to close first is the shared RPwD pull, because three rows and two templates wait on one document.

### 02.8 Worked gradings, end to end

The methodology is abstract until traced against real claims. Nine are walked here — a statutory rate, a competitive price, an AI cost, a market size, a statute not yet in force, a file format that moved between rounds, an unprovable negative, a regulator's constraint whose retraction was itself wrong, and a file sample mistaken for a rule — because each fails in a *different* way (an off-face amendment, a capture method that hid the source, a ratio-vs-absolute-vs-margin split, a gross-up seam, a true text on the wrong clock, a conflict between two dimensions of one round, a search that cannot end, a clause read in isolation, one case taken for the rule) and the register has to catch every failure shape, not just one.

#### Worked grading A — a statutory claim (Karnataka PT)

The claim: **"An employer running payroll for 60 people in Bengaluru must deduct Karnataka Professional Tax of ₹200/month from every employee earning above the top slab threshold, and file a monthly PT return."**

**Step 1 — Grading procedure (§02.2), stop 1: is it a previously-believed, now-disproven claim?** No prior kill row exists for Karnataka PT. Proceed — but note that the claim as worded is exactly what a flat-rate engine would encode, and the steps below break it.

**Step 2 — Locate the base instrument (§02.4).** The authority is *state*, not central: the Karnataka Tax on Professions, Trades, Callings and Employments Act 1976 (Act 35 of 1976, as amended by Act 14 of 2023), administered by the Commercial Taxes department with the Act itself published by the state's Law Department (DPAL) — not the Gazette of India, not indiacode (r2). Record the instrument number, the schedule's effective date and the notified slab, and note that the operative rates are also shown on the department's own PT portal, which is a second primary rendering (§02.4 checklist step 7).

**Step 3 — The traps fire immediately.** Four distinct facts hide inside this one claim, each independently amendable, and round-two verification hit all four (r2, r1):
- *The slab amount and threshold.* The base slab — ₹200 a month at a monthly salary of ₹25,000 or above, nil below — is confirmed in the consolidated Act as amended by Act 14 of 2023. A March 2026 aggregator table still publishes a three-band structure (nil to ₹15,000; ₹150 from ₹15,001 to ₹25,000; ₹200 above) that matches Karnataka's *pre-2023* schedule (r1). This is the "at least one widely-cited 2026 PT table reproduces a superseded structure" trap (§20). **The aggregator cannot earn [Verified].**
- *The annual true-up.* "₹200 a month" is wrong for one month in twelve. Notification DPAL 08 SHASANA 2025 of 15.04.2025, effective 01.04.2025, requires ₹300 in February, making ₹2,500 a year. The decisive check is arithmetic: ₹200 × 12 = ₹2,400 cannot produce the stated ₹2,500 annual liability, and ₹200 × 11 + ₹300 does, exactly (r2). An engine encoding the claim as worded under-deducts ₹100 per employee per year.
- *The filing periodicity.* The claim says "monthly". Karnataka's return frequency is **not verified** (§06.4); assuming monthly because "PT is usually monthly" is an ungraded inference. In Maharashtra the periodicity is assigned per registration each year and must be ingested from the department, never derived (r2) — which is why periodicity is its own fact, not an attribute of the slab. Round three did read Karnataka's monthly Form 5A as due within 20 days of the month's end, filed through e-PRERANA with the Commercial Taxes Department — but from a vendor wiki page and three secondary sources, not a department notification, and its own open questions note the date "can be revised by notification" (r3/02). By §02.2 G18 that is [Hypothesis], which is why the Karnataka due-date row is `warn_only` (§14.6.1b).
- *The gender variant.* Karnataka's schedule carries none; Maharashtra's does (women nil to ₹25,000 against men's ₹7,500 floor — EV-014). Karnataka's exact schedule had to be read, not assumed from a neighbouring state.

**Step 4 — Corrigendum and amendment check (§02.4).** The amendment check is where the grading stalls. The February element rests on a notification that was *not retrieved*: its reference and date are corroborated by several independent sources and its effect is shown on the state PT portal, but the DPAL site returned an error and the instrument text was never read (r2). Whether the top-up was made by amending Act or by executive notification is itself open (r2). A corrigendum search against an instrument nobody has read cannot be run. Separately, confirm the effective-date range that applies to the *payroll period being run*: a run for a pay period before 01.04.2025 resolves against the no-top-up version (§02.10).

**Step 5 — Grade, with the seam shown.** The base slab earns **[Verified]** against the consolidated Act. The February top-up is **[Verified] as to effect** — it is shown on a state government portal and reconciles arithmetically — with the instrument retrieval and its corrigendum search recorded as **owed** (EV-014). The periodicity stays **Ungraded** (EV-015). The composite claim as worded — "₹200/month, monthly return" — is therefore not [Verified] at all: it is wrong on the top-up and unsupported on the periodicity. §06.4 carries Karnataka on exactly this split. The re-verification triggers are the next Karnataka budget and the retrieval of DPAL 08 SHASANA 2025.

**Step 6 — Produce the build artifact (§02.10).** The verified slab becomes a versioned, effective-dated row in the PT rule store keyed by (Karnataka, effective-date-range), modelled as an annual ₹2,500 cap with a February true-up rather than a flat monthly amount. It carries a golden-file fixture (employee at ₹40,000 a month: ₹200 for eleven months, ₹300 in February, ₹2,500 a year — §06.4) and a killed-value regression guard asserting the pre-2023 three-band schedule never re-emerges for a post-2023 period. The return export ships only once the periodicity is captured; until then it is a named parameter, `pt.KA.filing_frequency` (the §14.6.1b spelling), with no shipped default (§20 V-09).

The lesson: **one payslip line ("PT ₹200") is not one claim — it is four independently-amendable state facts, each requiring its own capture and its own effective-date clock** — and the claim as a founder would write it was wrong on one of them and unsupported on another. A methodology that grades "Karnataka PT" as a single Verified/Hypothesis stamp is already wrong. Multiply this by roughly 16–20 PT-levying states/UTs and roughly 16 LWF states/UTs (r1, r2; the counts themselves are unverified) and the register's per-(authority, jurisdiction, effective-date) keying (§02.4) stops being pedantry and becomes the only schema that can survive an audit. This is also why the full state-wise PT/LWF dataset is flagged as *undone build-dependency work* in §20 (V-09): PT is verified at state primary source only for Maharashtra and Odisha, with Karnataka's effect verified and its instrument owed (EV-014), and no LWF figure is verifiable from a government source in any state (r2). The per-state grading cost is real and unpaid, and neither incumbent has paid it either: Frappe v16 carries no state PT slab table or LWF engine and TallyPrime has neither (EV-031, EV-032).

Sizing that unpaid cost concretely: **~16–20 PT jurisdictions × (slab schedule + true-up + periodicity + gender variant) + ~16 LWF jurisdictions × (contribution amount + split + periodicity) ≈ 64–80 + 48 = ~112–128 independently-gradable statutory facts**, each demanding a captured state source and a corrigendum check, before the multi-state payroll engine is correct nationwide. Of these, fewer than ten are verified — the slab and true-up schedules of Maharashtra and Odisha (Odisha's top-up month undefined), Maharashtra's gender variant, and Karnataka's slab and true-up effect (EV-014); everything else is Ungraded (EV-015). This is not a research nicety deferred — it is the single largest gradable-but-ungraded block in the register, and every one of these facts must clear the §02.4 checklist independently. Framing "state-wise PT/LWF" as one line item hides two orders of magnitude of grading work and is exactly the kind of composite-as-atomic error the register exists to prevent (§02.2).

#### Worked grading B — a competitive claim that moved from Ungraded (blocked) to Verified (Keka pricing)

The claim: **"Keka's price for a 50-employee company is ₹X per employee per month."**

**Step 1 — Grading procedure, stop 2: is there a captured primary source?** The acceptable primary sources are Keka's own live pages and the archive of Keka's own pages. Aggregator and review-site prices are excluded by rule, and so is any competitor's statement of Keka's price (§02.5).

**Step 2 — The capture that failed.** Rounds one to four could not capture keka.com and graded the claim **Ungraded (blocked)** (EV-009), withholding the number rather than borrowing an aggregator's. That grading was procedurally right on the evidence then held — and its premise was wrong: the failure was specific to one fetch tool, not to the site (r5). **[Reversed]** (EV-K21).

**Step 3 — The capture that worked (round five, 5 Sep 2026).** A raw fetch of keka.com/pricing contains zero live rupee figures once comments are stripped, and exactly three commented-out price spans — ₹90 / ₹120 / ₹150 per additional employee (EV-021). A rendered read cannot see them. The archived card on Keka's own page (Wayback 1 Aug 2024, corroborated twice in 2026) supplies the block prices — ₹9,999 / ₹12,999 / ₹15,999 per month up to 100 employees (EV-022) — and the live small-companies page supplies "from ₹6,999 per month" and "starts at ₹90 per employee/month" (EV-023).

**Step 4 — Grade, with the seams shown.** Each list anchor is **[Verified]** under its own capture class (live raw HTML, archive, live page). The per-employee figure at 50 employees — ₹139.98 on the live ₹6,999 floor or ₹199.98 on the archived card (EV-027) — is arithmetic on those block prices; it inherits their grade but must say which card it uses. What stays open: the seat count inside the ₹6,999 block (Keka's signup path is a demo form with no seat field — r5), the setup fee (two live Keka pages contradict each other and neither quantifies it, EV-025), and the realised price (§20 V-03).

**The lesson:** the "Ungraded (blocked)" state was the right state for a claim we could not capture, and it did its job — it kept an aggregator number out of the register for four rounds. But the block was a method failure, not a property of the source. A blocked grading must record the tool that failed, and a re-capture by a different method is owed before "blocked" is treated as stable. The Keka case is also where the rendering-browser rule died (§02.5): rendering hides Keka's rate card; raw fetch hides Qandle's.

#### Worked grading C — a claim that splits into three markers (AI unit cost)

The claim, as an earlier draft stated it (its margin clause is Killed in Step 4): **"The AI architecture costs ₹0.15–3.27 per employee per month, a 93–99% gross margin on inference."**

**Step 1 — Decompose (§02.2, composite rule).** The claim is a product of two inputs: the *model-cost ratio* (52.7× cheapest-to-dearest) and an *absolute token count* per employee-month (23,675 in / 2,045 out).

**Step 2 — Grade each input.**
- The ratio (EV-007, EV-089) rests on two published USD price cards — same unit, captured — and *survived the FX correction that killed ₹83.3/USD*, because a ratio of two USD prices is invariant to the USD/INR rate. It earns **[Verified]**.
- The token count (EV-008) is an engineering estimate with no empirical basis. It earns **[Hypothesis]**, kill criterion: instrument a real prototype against a real policy corpus; if measured tokens run 5× the estimate, free-bundled AI breaks at the low end (§20 V-04).

**Step 3 — Grade the composite (weakest-input rule).** The rupee-denominated absolute inherits the Hypothesis marker of its weakest input. So: *state the 52.7× ratio as fact; state the ₹0.15–3.27 absolutes as placeholders pending prototype instrumentation.*

**Step 4 — Grade the margin clause.** "93–99% gross margin" is **[Killed]** (EV-K13). It was computed against inference alone — the smallest of the four COGS lines — while the dominant line, supervised filing, scales per registration × state × filing type and is unsized, as is compliance curation per state (EV-088). No margin figure may be stated until §13 and §22 size those lines. Three markers, one sentence: a Verified ratio, a Hypothesis absolute, a Killed margin.

**The lesson:** the composite-claim rule (§02.2) is not academic — it is what stops a Verified ratio from lending its credibility to an unmeasured absolute, and an unmeasured absolute from lending *its* credibility to a margin computed on the wrong cost line. Without it, "52.7× spread [Verified]" would silently upgrade "₹0.15–3.27 [Verified]," and a seed-stage margin model would rest on an un-instrumented token guess wearing a borrowed Verified stamp — and on the cheapest line in the cost stack.

#### Worked grading D — a market-size claim where the gross-up must not launder (India HRMS spend)

The claim: **"Real annual India HRMS software spend is ₹2,100–3,900 Cr."**

**Step 1 — Decompose (§02.2, composite rule).** The figure is a *verified aggregate* times a *modelled gross-up*: ₹1,374 Cr of filed revenue across eleven identified HRMS entities, grossed up for unfiled and foreign vendors to reach the range.

**Step 2 — Grade the verified floor.** Each of the eleven revenue lines traces to an MCA/ROC filing keyed by CIN (Keka ₹133.86 Cr FY25, ZingHR ₹150 Cr FY25, PeopleStrong ₹301.99 Cr FY25, Akrivia ₹30.67 Cr FY24, factoHR ₹25.76 Cr FY25, and six more — Source: 11 MCA/ROC filings by CIN, §04). The **₹1,374 Cr aggregate is [Verified]**, subject to one recorded trap: *filing lag is up to ~18 months, so "latest filed" is not "current"* — a FY24 filing understates a fast-growing FY26 vendor. The consistency cross-check (§02.5) is the greytHR sanity anchor: its current claim of 30,000+ companies ≈ 3.9% of 7.66 lakh contributing establishments (4.4% on the earlier 34,000 capture — EV-016, EV-091), a share ceiling that bounds any bottom-up re-derivation and must be quoted with its capture date.

**Step 3 — Grade the gross-up.** The multiplier from ₹1,374 Cr to the ₹2,100–3,900 Cr range is a *modelling assumption* about unfiled and foreign-vendor share — not a filing, not a statistic. It earns **modelled**, never [Verified].

**Step 4 — Grade the composite (weakest-input rule).** The output is recorded as **[Verified] (inputs) + modelled (gross-up)** (EV-005), not "[Verified] ₹2,100–3,900 Cr." A contract-safe reader uses the ₹1,374 Cr floor; a market-size reader uses the range but knows its top is the softest part. Collapsing the two would launder a modelling assumption into a fact — and the top of the range is exactly where the one-directional bias (§02.3) says the number was most likely overstated.

**The lesson:** the market/financial source class fails differently from the statutory and competitive ones — it fails by *silent gross-up laundering*, where a defensible verified floor lends its credibility to an indefensible modelled ceiling under one blended marker. This is the same defect as the AI-cost split (grading C), but where C splits ratio-from-absolute, D splits verified-aggregate-from-modelled-multiplier. Both are caught only because the composite rule forces the seam onto the page.

#### Worked grading E — a true text on the wrong clock (DPDP s.7(i))

The claim, as an earlier draft listed it under "what binds from day one": **"Employers do not need employee consent to process employee data for employment purposes (DPDP s.7(i))."**

**Step 1 — Stop 1: previously believed, now disproven?** As a statement of current law, yes. It is killed as EV-K14, and its conclusion is [Reversed] (register row 3). The grading does not stop there, because three true claims sit inside the dead one and each is needed by the build.

**Step 2 — Decompose by time.** (a) *The text:* s.7(i) is a lawful ground for processing for employment purposes; it disapplies consent and notice, not the s.8 duties (EV-018). (b) *The clock:* substantive DPDP provisions, s.7 included, commence on or about 13 May 2027 under G.S.R. 843(E) (EV-058). (c) *Today's regime:* the SPDI Rules 2011 require consent in writing before sensitive personal data — biometric and financial information included — is collected (r.5(1), EV-060). A fourth question — who owes that written-consent duty, the employer or the SaaS — is Part D-4 and is not graded at all.

**Step 3 — Grade each part.** (a) is [Verified — not in force] (G7). (b) is [Verified — mirror] (G5): the notification was read from a third-party copy, and whether the date is the 13th or the 14th turns on gazette stamps that differ from the notification date (§23.1.4). (c) is [Verified — provenance caveat] (G6): no live copy of G.S.R. 313(E) was located on a government host (r4). Three qualifiers on one topic, each closing a different use.

**Step 4 — What each part licenses.** The build runs both consent regimes concurrently across the boundary (Part E-6; §07, §14), and the switch is rule data — `dpdp_commencement_date` and `consent_regime_switch_date` in the compliance pipeline, arming on the earlier reading (§23 FR-LEG-008). No customer statement uses (a) without (b) in the same sentence (§23.1.5 B1). None uses (b) or (c) until the mirror and caveat pulls close (§02.14).

**Step 5 — Re-verify triggers.** Forced on or about 13 May 2027; on any gazetted compression of the eighteen-month tranche (§20 V-27); on counsel's answer to whether the SPDI Rules survive the omission of IT Act s.43A (Part D-12).

**The lesson:** a statute has a text and a clock, and the register grades them as separate claims. A true text on the wrong clock is the most quotable error a legal document can make (r5 review-counsel), and it is invisible to a grader who asks only "is this what the Act says?"

#### Worked grading F — a file format that moved from "do not build" to "build" (the ECR layout)

The claim: **"The ECR return is a plain-text file with eleven `#~#`-delimited fields per member line and no header row."**

**Step 1 — What round three held.** Two dimensions of round three stated the layout with opposite P0 instructions: one required the eleven-field headerless file; the other forbade coding against the layout as received. The round's critic sided with caution — the first dimension's own confidence was medium, no post-revamp primary specification had been read, and EPFO's file-structure PDFs returned 404 after the domain move (r3 critic; EV-045). Round three's own verifier had also caught an earlier draft reading a header line off the superseded ECR 1.0 specification (r3/02).

**Step 2 — Conflict rule.** Two dimensions of one round disagreeing is conflict rule C4 (§02.16): neither governs, the claim sits at the lower grade, and any build it drives is fenced. The ECR generator was fenced on exactly that basis.

**Step 3 — The primary read.** Round five read the portal's ECR help file and the revamped-ECR circular and FAQ — image-only scans, transcribed — and enumerated all 1,869 PDFs on EPFO's circulars index to confirm that no arrear-return layout is published (r5/02). The layout survived the September 2025 re-engineering unchanged: eleven fields in a fixed order; wage month, return type, contribution rate and remark are portal controls, not file content; no filename pattern is mandated (EV-035).

**Step 4 — Grade, with the seams shown.** The field order, delimiter and header rule are [Verified], corrigendum owed (G17). Not graded at all: the line terminator and encoding, which no public document gives — parameters `ecr.line_terminator` and `ecr.encoding`, captured from a live accepted upload (§20 V-23). Separately fenced: the arrear return, whose layout is not published (EV-043).

**Step 5 — What it licenses.** The generator is buildable, and §05 unfences it. Its file-format version cannot leave drafting until the corrigendum search is recorded (§22 AC-RULE-002.3). "Portal-accepted" is not said to a customer until an accepted upload is on record (§22).

**The lesson:** a format claim moved from "do not build" to "build" with no change in the world — only a change in what had been read. Round three's fence was right on the evidence it held, and the claim it fenced turned out true, which is the same shape as EV-009's blocked grading (worked grading B). The register records the move as a grading event with its round, never as a silent edit, so the round-three instruction cannot resurface in a later draft.

#### Worked grading G — a negative that cannot be proved (algorithmic-hiring case law)

The claim: **"There is no Indian case law on algorithmic hiring."**

**Step 1 — Classify.** A claim of absence that no search can prove: G8. It is rewritten before grading as "we are not aware of any Indian case law on algorithmic hiring, as of September 2026" (EV-084; Part D-16).

**Step 2 — What the evidence is.** A dated search record (r5/05), not a source. Its strength is its date and its coverage, and both are recorded.

**Step 3 — What it licenses.** A planning statement: the first case will be a matter of first impression, so no defensibility control can be calibrated to a precedent, and adverse-impact monitoring commits to no quantitative threshold (EV-083; §10). It licenses no customer assurance. Positioning stays on the RPwD s.90 due-diligence defence (EV-079), never on "no legal risk".

**Step 4 — Re-verify and kill.** A biannual case-law search. Any judgment on point fires L11: a kill row, every use re-worded, and the §10 discrimination requirements re-examined against the holding.

**The widest negative in the register sits in no row.** Round four could not prove that no amendment was gazetted between November 2025 and September 2026, because meity.gov.in and indiacode.nic.in refused programmatic fetch; every statutory date in this PRD rests on that unproven negative (r4 critic). No single search can discharge it. The standing re-check is the watcher's subscription on every base instrument a published rule cites (§22 FR-RULE-005), which is why that subscription is mandatory rather than a convenience.

**The lesson:** a negative is graded on its search, not its conclusion, and it carries a date because the conclusion decays. EV-065 ("we are not aware of any Significant Data Fiduciary designation, as of September 2026") and EV-072 ("we are not aware of any Indian law that requires biometric attendance, as of September 2026") take the same form, and are never shortened to "there is no …" even in a parenthesis.

#### Worked grading H — a retraction that was itself wrong (SEBI FAQ Q47 and Q50), beside two neighbours graded differently

The claim, as an earlier reading left it: **"SEBI's cloud framework does not require an HR SaaS running on a public cloud to use MeitY-empanelled infrastructure."** It arrived as a retraction: the requirement had been reported from secondary sources, and a reading of SEBI's FAQ withdrew it (r5/01, which calls it the prior reading's headline retraction).

**Step 1 — What the retraction read.** FAQ Q51, which describes the empanelment route for providers with their own data centres, read on its own (r5/01 finding 8). The instrument was primary and correctly cited, and the retraction was graded on it.

**Step 2 — What it did not read.** Q47 and Q50, two questions earlier in the same FAQ, require a regulated entity to ensure its cloud service provider uses only MeitY-empanelled infrastructure, and Q50 points at clause 2(ii) of the circular — the clause for selecting providers of PaaS and SaaS services in India (r5/01 finding 2). A SaaS vendor riding a public cloud falls in that lane; Q51 describes the other. This is capture failure CF5 (§02.5): one answer read, the instrument not.

**Step 3 — Grade.** The retraction is displaced under conflict rule C2: a later reading went back to the same source with a stronger method — the whole FAQ, with the circular's clause — and the requirement is restored as part of EV-085 [Verified], with the two lanes in its text. The restoration is a grading event that names the reading it displaces, so the retraction cannot resurface from an older draft.

**Step 4 — The neighbours.** Two sectoral rows sit beside EV-085 and are graded differently, for different reasons:
- **EV-086 (IRDAI)** is an N1 negative: a case-insensitive search of the full 175-page extraction of the ICS Guidelines 2023 for localis, localiz, data residency, MeitY and STQC returns nothing (r5/01 finding 19). It is [Verified] with no `negative_dated` qualifier, because the instrument was read whole — and it says nothing about IRDAI's other instruments. Localisation of policy records sits in the Maintenance of Insurance Records Regulations 2015, which is why the row names both.
- **EV-087 (RBI)** carries `mirror`: the RBI document host refused direct access and the text was read from a copy carrying the RBI header (r4/02 finding 25). Whether a given bank's arrangement is material outsourcing is a counsel question (Part D-14), which the register records and does not grade (C4).

**Step 5 — What each licenses.** EV-085 licenses the SEBI profile in the build (§17) and, once cleared, a statement to a SEBI-regulated prospect that names the lane. EV-086 licenses "the IRDAI ICS Guidelines 2023 contain no localisation requirement" and nothing wider. EV-087 licenses the RBI profile in the build and no contract clause until the pull closes (§02.7 mirror register).

**The lesson:** a retraction is a claim and is graded like one. The reading that withdrew the constraint cited a primary instrument correctly and still got it wrong, because it read one answer rather than the instrument. Of the three overlays, one is a wrongly removed constraint, one a provable absence and one a mirror-read obligation whose reach is a legal question — three shapes that a single "sectoral: verified" stamp would have hidden.

#### Worked grading I — a file sample is one case, not a rule (EPS at the wage ceiling)

The claim, as an engineer might write it from the ECR Help File: **"Employer EPS is 8.33% of EPS wages rounded to the nearest rupee — EPFO's own sample shows 1,250 on ₹15,000."**

**Step 1 — What the source contains.** The Help File reproduces two member lines, each with ₹15,000 in all four wage fields and contributions of 1,800 (employee PF), 1,250 (employer EPS) and 550 (employer PF) (r5/02 finding 3; EV-035). The part-payment help file carries a line with the same three amounts (r5/02 finding 6; EV-044). The research checked the arithmetic as self-consistent: 12% of ₹15,000 is ₹1,800, and 1,800 − 1,250 = 550.

**Step 2 — What the arithmetic shows.** 8.33% × ₹15,000 = ₹1,249.50, and the sample carries 1,250. One input cannot distinguish rounding half up, rounding up, or a cap stated as a whole-rupee amount — all three give 1,250 here. §06.2 states the cap as ₹1,250, citing EPFO's EPF and EPS scheme pages read in round one; no register row carries that figure, and the round-one reading has not been re-checked at source.

**Step 3 — Grade, as three claims.**
- (a) For that input, the file contains 1,250 — [Verified], a golden fixture under EV-035.
- (b) The EPS cap is ₹1,250 — cited to a round-one reading with no row. An ID request is opened (§02.20, IDR-03), and the ~70–75% prior applies until the page is re-read.
- (c) The rounding rule for other wage levels — not in the evidence: `epf.rounding_method`, no shipped default (§20.13).

**Step 4 — What each licenses.** (a) is a regression test: the generator reproduces the Help File lines byte for byte (§06.14 TV16). (b) may drive the engine's cap once its row exists and publishes (§02.10), stored as the published amount — never recomputed as 8.33% of the ceiling and rounded, because the two agree at ₹15,000 only by construction of the sample. (c) resolves every other case: at EPS wages of ₹14,999, 8.33% gives ₹1,249.4167, which is 1,249 under rounding half up and 1,250 under rounding up. Which of those the file must carry is exactly what the evidence does not say.

**The lesson:** a fixture proves the engine against one case; it does not supply the rule. Reading a rounding convention off one sample line is the file-format form of the composite error in §02.2 — one verified observation lending its grade to an inferred general rule.

#### The statutory edge cases the register must survive

The worked gradings show the *procedure*. This catalogue shows *why the procedure has to be that fussy* — a set of concrete Indian payroll edge cases where a single ungraded assumption produces a wrong filing. Each is a reason the register keys by (authority, jurisdiction, effective-date-range) rather than by topic, and each is a golden-file test the rule store owes (§02.10). None of these values may be hard-coded from this catalogue — it is illustrative of the shape of the traps; each must be independently graded per §02.4 before it reaches the engine.

| Statutory edge case | The trap for a naive engine | Register / effective-dating consequence |
| --- | --- | --- |
| **EPF ₹15,000 statutory wage ceiling vs voluntary higher-wage PF** | Employer may compute PF on the ₹15,000 ceiling *or* on actual wages; the choice is per-employer, sometimes per-employee, and interacts with the 50% add-back (EV-010). An engine that assumes one policy mis-states every affected payslip. | Ceiling value, the add-back %, and the employer's election are three separate versioned facts; the ceiling itself is a notifiable variable — re-fixed at ₹15,000 under CoSS s.2(89) by S.O. 2702(E) of 29.05.2026, and not raised to either figure circulating in low-quality commentary (r1) (Source: EPF Scheme framework / CoSS 2020) |
| **International Workers — different EPS and onboarding rules** | International Workers who joined after September 2014 with wages above ₹15,000 are not EPS members (r5), yet remain in ECR scope (EV-045), and the employer-side UAN route survives for them after 1 August 2025 while the ordinary route became employee-driven (r4). Applying the domestic defaults to an IW mis-allocates EPS. | Employee-class flag drives which rule version applies (Source: EPFO revamped-ECR FAQ; EPFO UAN circular) |
| **EPS 8.33% / 3.67% split within the 12%** | Of the employer's 12%, 8.33% routes to EPS, capped at the wage ceiling, and 3.67% to EPF (r1/06, r2/05); on the ₹15,000 ceiling 8.33% computes to ₹1,249.50, while EPFO's own Help File sample line carries 1,250 for that input — one case, not a rounding rule (worked grading I); the rounding convention for any other wage level is not captured in this PRD's evidence (`epf.rounding_method`, §20.13). An engine that treats the employer 12% as monolithic mis-allocates EPS. | The split, the EPS cap base, and the 12% headline are separate rows; S.O. 3582(E) re-notified the 12%, not necessarily the split (Source: EPS 1995 / S.O. 3582(E)) |
| **ESI ₹21,000 wage ceiling + mid-period crossing** | An employee crossing ₹21,000 mid-contribution-period *continues* to be covered until the period-end, not from the crossing date. A naive "stop at ₹21,000" rule drops contributions the statute still requires. | Contribution-period boundaries (Apr–Sep, Oct–Mar) are engine constants that themselves must be graded; the ESI regime after the ~21.11.2026 savings expiry is Ungraded (EV-004) (Source: ESI Act / ESIC) |
| **PT annual cap with a final-month true-up (Maharashtra, Karnataka, Odisha)** | Above the top threshold, Maharashtra and Karnataka collect ₹200/month for 11 months and ₹300 in February, and Odisha ₹200 × 11 + ₹300 in "the last month" (month undefined), each reaching ₹2,500/year; Maharashtra and Karnataka test monthly salary, Odisha tests annual income (EV-014, r2). An engine applying ₹200 flat under-deducts ₹100 per employee per year in all three. | The deduction is an annual cap with a true-up month, and the slab base (monthly vs annual) is a per-state parameter; Odisha's top-up month stays an open parameter, `pt.OD.true_up_month` (routed to §20.13 with the state PT family), until the department defines it (Source: MSTD Schedule I; odishatax.gov.in; ptax.karnataka.gov.in — r2) |
| **PT gender variants** | Maharashtra carries a live women's threshold (nil up to ₹25,000 against ₹7,500 for men, from 1.4.2023); Karnataka carries none (EV-014). Assuming a neighbouring state's structure mis-deducts. | Each state's schedule read in full; never inferred from a neighbour (§02.8 grading A) |
| **Gratuity — eligibility by employee class, day-counted service, an unfixed ceiling** | Eligibility is five years of continuous service for permanent staff but one year for fixed-term employees, payable at 15 days' wages per completed year within 30 days (r3); "continuous service" is day-counted — 240 days actually worked in a year, 190 for specified categories (r1). The familiar ₹20 lakh ceiling is a legacy of the repealed Payment of Gratuity Act: CoSS s.53(3) leaves the ceiling to notification, and none was located (r1). An engine hard-coding "5 years exactly" and the legacy cap mis-states accrual. | Eligibility rule by class, day-count rule, formula and ceiling are separate versioned facts; the ceiling is an open parameter until notified (Source: CoSS 2020 ss.53, 55, 56; MoLE handbook) |
| **TDS old vs new regime default** | The new regime is the default unless the employee communicates a preference in writing (s.115BAC(6) in 1961-Act numbering; the 2025-Act section is unmapped — r1); surcharge slabs and marginal relief change the deduction. An engine defaulting to the old regime over-deducts for most employees. | Regime election is a per-employee, per-year versioned input; surcharge/marginal-relief tables are effective-dated; both section vocabularies are accepted (EV-050) |
| **LWF periodicity divergence** | LWF periodicity is monthly, half-yearly or annual by state, contributions are mostly flat rupee amounts, and splits differ; rupee amounts and due dates are disputed between sources even for major states (r1). A single "annual LWF" assumption files wrong across the levying states. | Roughly 16 LWF jurisdictions (r1; count unverified), each with its own periodicity and split row; no incumbent ships an LWF engine to copy (EV-031, EV-032) (Source: per-state LWF board notifications) |
| **Statutory bonus floor and calculation ceiling** | Bonus is payable at a minimum of 8.33% of wages or ₹100, whichever is higher, up to 20% (r1); the legacy ₹21,000 eligibility and ₹7,000-or-minimum-wage calculation ceilings came from the 2015 Payment of Bonus amendment, and whether they have been re-notified under the Code on Wages could not be established — the thresholds are now delegated to the appropriate Government, so they can diverge by state (r1). An engine that uses actual wages as the bonus base over-pays; one that uses the eligibility ceiling as the base mis-computes. | Eligibility ceiling, calculation ceiling, min-bonus % and max-bonus % are four separate versioned facts, each potentially state-specific; the two ceilings are open parameters until re-notification is confirmed (§20) (Source: Code on Wages 2019) |
| **Leave-encashment exemption cap** | The tax exemption on leave encashment at separation is capped by a notifiable ceiling. Its current value, effective date, aggregation rule (per employer or across employers) and 2025-Act section are not captured in this PRD's evidence — a named parameter, `leave_encashment_exemption_cap`, routed to §20.13 with the tax reference values. TallyPrime cannot calculate leave encashment at all (EV-032). | Exemption cap is a versioned parameter; if the rule aggregates across employers, the engine needs a cross-employer input it cannot assume it holds |
| **Salary-arrears relief (Form 10E, renumbered Form 39)** | When the add-back or a retro run pushes arrears into the current year, the employee may claim relief via Form 10E — Form 39 under the Income-tax Act 2025 (r5) — against being taxed at a higher slab on income relating to earlier years. A payroll engine that computes TDS on arrears without surfacing that path over-deducts. The CBDT form list gives Form 39 as the claim for relief under s.157(1) of the 2025 Act (r5/02); the rule that prescribes the computation is not captured in this PRD's evidence (§20). | Relief computation depends on *prior-year* slabs — i.e. the effective-dated tax tables for those years must remain queryable (the same retrospective-recomputability requirement as EV-010) |
| **Contract labour — principal-employer PF/ESI liability** | Under the Code on Social Security the principal employer pays PF for contract workers and recovers it from the contractor (s.17), and pays both ESI contributions for every employee "whether directly employed by him or by or through a contractor" — unconditionally (s.31(1)) (r2). The OSH Code threshold for contract labour is now 50 (EV-057). An HRMS scoped only to on-roll headcount silently drops a population the customer is statutorily liable for. | Worker-class flag (on-roll vs contract) drives coverage; contractor-compliance status is an external input the engine must be able to represent, not assume compliant (Source: CoSS 2020 ss.17, 31; OSH Code 2020) |

The through-line: **not one of these is expressible as a single global constant.** Every row is a (jurisdiction × effective-date × employee-class) tuple, which is precisely the register's key. An engineer who reads "PF is 12%" as one fact will ship an engine that is wrong for International Workers, wrong on the EPS split, wrong when the add-back bites, and wrong the day the 12% is re-notified. The register's fussiness is not bureaucratic; it is the minimum resolution at which Indian payroll is actually correct.

#### Handling the Ungraded state — the ESI fail-safe

EV-004 (the ESI regime after the savings window expires on or about 21 Nov 2026) is the register's hardest entry: it is not Verified, not Hypothesis, and not Killed — it is **Ungraded because the authoritative instrument does not yet exist** (Source: no successor ESIC/MoLE notification as of research date). This state needs its own product posture, because "we don't know the rule yet" cannot mean "guess."

The rule: **an Ungraded statutory dependency that gates a filing forces a fail-safe, not a default.** For ESI after the savings-window expiry, that means the engine must be able to (a) continue computing under the saved 1948-regime rules for as long as the savings clause is in force, (b) surface a hard-blocking alert as 21 Nov 2026 approaches with no successor notified, and (c) refuse to *generate an ESI filing artefact* against an assumed successor structure rather than emit a plausible-but-ungraded one. This is the same discipline as the Q4 Form 138 layout (EV-046) and the unpublished ECR arrear layout (EV-043): where the authoritative artefact does not exist, the correct engineering behaviour is to *block the filing and say so*, never to synthesise a format. A filing-first product's credibility rests on never handing the employer a guess to file.

### 02.9 How the second sweep was made adversarial

The one-directional finding (§02.3) is only trustworthy if the second sweep was genuinely capable of overturning the first, rather than politely confirming it. A confirmation-seeking second pass would have found ninety *supporting* citations, not ninety retractions. The design choices that made it adversarial are recorded here so the same discipline governs future re-verification rounds.

- **Falsification mandate, not verification mandate.** Round two agents were tasked to *break* round-one claims — to find the primary source that contradicts, the denominator that is contaminated, the corrigendum that amends — rather than to find support. The scoreboard that mattered was retractions produced, not citations gathered. A sweep rewarded for confirmations manufactures confirmations.
- **Fresh primary-source contact, not citation inheritance.** Round two was forbidden from inheriting round one's sources; it re-fetched the gazette, re-pulled the MCA filing, re-captured the vendor page. This is exactly how the S.O. 5319(E) → S.O. 5936(E) inversion surfaced: a fresh fetch found the corrigendum the inherited citation had never checked for.
- **Denominator and scope interrogation.** Every quantitative claim was re-examined for a contaminated base — registered vs contributing, total resumes vs buyable product, platform users vs billed seats, one company's take rate borrowed for another. Several kills (the ₹161 Zaggle attach, the ~41,000 named-accounts target) are pure denominator failures that survive only if nobody asks "count of *what*, exactly?"
- **Bias-check pass on every dimension.** After grading, the *distribution* of retractions was examined as a dataset — which is how the one-directional signature became visible at all. No single retraction reveals a bias; ninety of them pointing the same way does. This meta-pass is a permanent step, not a one-time exercise: any future sweep that produces a lopsided retraction distribution has re-detected a lean and must discount for it — in whichever direction it points, because rounds three to five showed that a correction can itself overshoot (§02.3).

The rule this establishes for all future re-verification: **a re-check that finds nothing wrong has probably not been run adversarially.** In a corpus with a measured optimism bias, a clean re-verification is itself a warning sign until the reviewer can show they actively tried to break the claim and failed. This is the operational meaning of the re-check retraction rate in §02.5 governance: not "how many mistakes did we make" but "how hard did we actually try to find them."

#### Which technique caught which kill

The §02.3 table sorts the round-one-to-two retractions by *direction* (all optimistic). This one sorts kills from every round by *the adversarial technique that caught them* — because the technique is what a future sweep must reproduce. A retraction is only repeatable if you know which discipline surfaced it.

| Adversarial technique | Representative kill it caught | Why the technique was decisive |
| --- | --- | --- |
| **Corrigendum / fresh-fetch** | "There is no November 2026 EPF cliff" (a round-two report; round five repeated it, §02.4) | Inherited citations never re-check for amendments; only a fresh fetch found corrigendum S.O. 5936(E) behind the stale S.O. 5319(E) footnote (Source: egazette vs indiacode, r2) |
| **Denominator interrogation** | 6-crore MSME TAM (EV-K01); ₹161 Zaggle attach (EV-K07); ~41,000 named-accounts target (EV-K10) | "Count of *what*?" exposed registered≠contributing, whole-company users≠billed seats, borrowed take rates (Source: Udyam; Zaggle FY26; EPFO Appendix-2(v)) |
| **Attribution audit** | $23.32bn→$38.36bn TAM (EV-K04); $400 Multiplier EOR (EV-K06) | The figure carried no attribution / was absent from its own cited source — a provenance defect independent of the value |
| **Ratio-vs-absolute split** | ₹83.3/USD (EV-K02) and the AI absolute cost (EV-008) | The FX correction killed every absolute that trusted ₹83.3 but left the 52.7× ratio standing — the split localised the damage |
| **Order-of-magnitude constraint** | Group-health ₹10,000–25,000/life claim | IRDAI's ₹61,435 Cr / 275mn lives = ₹2,233/life bounded the claim an order of magnitude below the vendor number (Source: IRDAI) |
| **Dual capture — raw fetch, render, vendor config (round five)** | "Keka pricing unobtainable" (EV-K21) | Rendering hides Keka's HTML-comment rate card; raw fetch hides Qandle's JS-injected one. Running both, plus the vendor's config file, captured what four rounds had graded "blocked" — and showed the block was one tool's failure. It replaces the earlier "rendering-browser capture attempt", whose conclusion that the failure *was* the finding is **[Reversed]** (§02.5) |
| **Source-code and product-documentation inspection (round three)** | Killed: "Frappe ships PT across 15+ states / LWF across 14" (EV-K12) | A word-boundary search of the Frappe v16 stable tree returned no Indian state name and no LWF component; TallyPrime's own documentation shows hand-entered PT slabs and no LWF engine (EV-031, EV-032). Marketing pages had said otherwise |
| **Freshness / entity-status check** | Alight in the competitive set; Ascent HR "exited" | Alight sold payroll to H.I.G. (Jul 2024); the Ascent exit was a mistyped-domain DNS artefact — both caught by re-checking entity status against a primary source |

The operational instruction for the watcher (§13.13, §22) and every future sweep: **these eight techniques are the re-verification toolkit, not a one-time list.** A sweep that runs only "find a supporting citation" reproduces none of them and will re-earn the optimism bias by omission.

<!-- DIAGRAM: adversarial-sweep-scoreboard -->

### 02.10 From marker to build artifact

The confidence markers are not merely editorial — they map onto specific engineering artifacts, because the whole point of a filing-first HRMS is that the PRD's statutory claims become executing code that produces the legal instruments the employer files (attended, assisted, under written authority — §22). The mapping below is what keeps provenance intact from gazette to filed return.

| Marker | Engineering artifact it produces | Guarantee it must carry |
| --- | --- | --- |
| **[Verified]** statutory rule | A **versioned, effective-dated rule** in the rule store (PF rate, PT slab, LWF split, TDS layout), with a golden-file test fixture derived from the primary source | Retrospective recomputability: an arrears/retro run resolves against the rule version in force *for the corrected period*, not today's version (§06 add-back requirement) |
| **[Verified]** file format | A **conformance-tested export** (ECR, ESI challan, PT return, Form 138) validated against the authority's own validator (FVU/RPU for TDS) | Byte-level layout conformance; a format change (24Q→138) is a new artifact version, not an edit |
| **[Hypothesis]** | A **feature flag or config parameter**, defaulted conservatively, never a hard-coded assumption | Must be re-pointable without a deploy once §20 validates it; e.g., the model router's per-task cost ceilings are config, not code |
| **[Killed]** | A **test that asserts the dead value never reappears** — a regression guard against the banned figure | The §20 blocklist becomes an assertion suite: no model output may emit a killed figure |

#### Acceptance criteria for the register as a build artifact

Because the register is a build dependency (§02.1), it carries testable acceptance criteria of its own. These are stated Given/When/Then so they can be lifted directly into the rule-store test suite when build begins (per the "PRD only until told" constraint, these are specifications, not code). Each carries an `AC-EVR-##` identifier; the criteria added in §02.2, §02.5–§02.7 and §02.10–§02.21 continue the sequence, and §02.24 indexes them all.

1. **AC-EVR-01 · Effective-date resolution.** *Given* a PT slab that changed mid-year in Karnataka, *when* the engine recomputes a June payslip in September, *then* it resolves against the June-effective rule version, not the September one — and the audit trail names the rule version used.
2. **AC-EVR-02 · Retrospective recomputability.** *Given* an arrears run for a period before the 50% add-back was last re-notified, *when* the run executes, *then* the add-back percentage applied is the one in force for the corrected period (EV-010), because "or such other per cent as may be notified" makes the threshold a version, not a constant.
3. **AC-EVR-03 · Corrigendum propagation.** *Given* a corrigendum is issued against a base instrument already in the rule store, *when* the statutory watcher ingests it, *then* it attaches to the base instrument's record via reverse-citation index (§02.4) and raises a re-verify task — it does not silently create an unrelated new rule.
4. **AC-EVR-04 · Killed-value regression guard.** *Given* the §20 blocklist, *when* any model output, quote, or export is generated, *then* no banned figure (every §20.4 entry, including those crosswalked to EV-K01–EV-K13, EV-K15, EV-K20, EV-K27 and EV-K31) may appear; a banned value in output fails the build.
5. **AC-EVR-05 · No model-generated statutory number.** *Given* a payroll or filing computation, *when* it executes, *then* every statutory/monetary figure resolves deterministically from a Verified rule; the LLM may explain and draft but never calculate (§12).
6. **AC-EVR-06 · Format-version conformance.** *Given* a Form 138 export, *when* it is generated, *then* it validates against the RPU/FVU version for the *period* being filed — RPU 1.2 + FVU 1.2 from Tax Year 2026-27, RPU 6.0 + FVU 9.5 for FY 2010-11 to FY 2025-26, chosen by period, never by today's date (EV-011, EV-052); a Q4 export is *blocked* until the Q4 layout lands, rather than emitted against an assumed structure (EV-046).
7. **AC-EVR-07 · Composite-marker integrity.** *Given* a composite claim, *when* the register is linted, *then* no composite carries a marker stronger than the minimum of its load-bearing inputs (§02.2).

Two consequences follow directly. First, **no statutory or monetary figure may be model-generated** — a [Verified] rule resolves deterministically in the engine; the LLM explains and drafts but never calculates (§12). The confidence marker is the enforcement boundary: anything that must be [Verified] to be safe cannot be produced by a generator that only ever earns [Hypothesis]. Second, the "50% or such other per cent as may be notified" clause in Code on Wages s.2(y) means even the add-back threshold is a *variable*, not a constant — so the rule store must version it, and the register must carry the notification that would change it as a standing re-verification trigger. Provenance in the PRD and effective-dating in the engine are, once more, the same discipline at two altitudes.

<!-- DIAGRAM: evidence-to-build-provenance-chain -->

#### The register-to-rule-object contract

The rule object (§14.6.1b) carries three field groups whose values come from this register: `evidence_status`, `enforcement_mode` and the citation. The compliance pipeline fills them (§22.8.2); this table fixes what each register state allows it to write. The rule object has three evidence values and the register has more states, so each extra register state becomes a constraint on publication rather than a new field value.

| Register state of the row a version rests on | `evidence_status` | `enforcement_mode` | May the version publish? | Constraint the version carries |
| --- | --- | --- | --- | --- |
| [Verified], corrigendum search recorded | `[Verified]` | `enforce` | Yes | A watch subscription on its base instrument (§22 FR-RULE-005) |
| [Verified], corrigendum owed | `[Verified]` | `enforce` | Not until the pipeline records the search (§22 AC-RULE-002.3) | That recorded search clears the register's "owed" too — one search, discharged in both places |
| [Verified — mirror] or provenance caveat | `[Verified — mirror]` | `enforce` | Yes, flagged | An open pull-from-primary task; never quoted in customer-facing copy until it closes (§14.6.1b RO6; §22 AC-RULE-002.2) |
| [Verified — not in force] | `[Verified]` | `enforce`, from commencement only | Yes, with `effective_from` at commencement | Where commencement is "on or about", the date is itself a commencement rule object that arms on the earlier reading (§23 FR-LEG-008); nothing enforces before it |
| [Verified — central sphere] | `[Verified]` | `enforce` | Yes, with `applies_to_sphere = central` | A state-sphere work location resolves nothing from it (§14.6.3) |
| [Verified] as to effect, instrument owed | `[Verified]` | `enforce` | Yes | The citation names the portal capture and leaves the instrument field open; the version is re-drafted when the instrument is retrieved (EV-014) |
| [Verified] as to a superseded revision | — | — | Not a rule source | The current revision is read first (EV-017) |
| Declared capability, claim posture, archived, dated self-claim | — | — | Not a rule source | Competitive and market rows never become rule versions |
| [Verified — negative, dated] | — | — | Not a rule source | A negative cannot be enforced; it can only remove a configuration — EV-072, with Part D-10's bar on hard-block configurations, is why no biometric-only attendance setting ships (§23) |
| [Hypothesis] | `[Hypothesis]` | `warn_only` | Yes, as a warning | Never blocks a run (§14.6.1b RO5); the §20 V-item is linked on the version |
| Ungraded (open) | — | — | No | Fail-safe: the dependent artefact is blocked (§02.8; EV-004) |
| Ungraded (undone) | — | — | No | The jurisdiction ships no row until its source is captured (§20 V-09) |
| [Killed] | — | — | No | A regression guard asserts the dead value never resolves (AC-EVR-04) |
| No row yet — the fact is cited to a research file (identifier rule 1) | — | — | No: the version stays in DRAFTING | An ID request is open (§02.20); once the row is registered, publication follows this table for the row's state (lint L-28) |

#### Fences and the rows that hold them

§05.18 registers twelve fences, each with a clear condition. Seen from the register, every clear condition is a grading event on a row — and five of the twelve rest on facts that have no row yet (F-02, F-05, F-09, F-10, F-12), with a sixth (F-08) resting on a counsel answer the register does not grade. A release therefore needs an ID request as well as a capture wherever the fact is new. The register event below is necessary for release and never sufficient: the version that lifts the fence publishes through the §22 pipeline (AC-RULE-006.1).

| Fence (§05.18) | Row that holds it | Register event the release needs | ID request needed? |
| --- | --- | --- | --- |
| F-01 Form 138 Q4 formats | EV-046 (N3), with EV-047 and EV-048 | L15 on EV-046 when the Q4 anchors carry artefacts; a replacement row at the next ledger revision (TS-19) | Yes — the released format is a new fact |
| F-02 Tax Year 2026-27 correction filing on the portal | None — r1/06 finding 33; r3/05 | A capture of the portal function enabled | Yes (IDR-08) |
| F-03 ECR arrear layout | EV-043 (N2) | L15 on EV-043 when the layout is captured inside an attended session (§20 V-23) | Yes — the layout is a new fact |
| F-04 ESI after the saving lapses | EV-004 (Ungraded, open); EV-002 | L3 on EV-004 | No — EV-004 exists |
| F-05 ESIC monthly contribution template | None — r3/05, low confidence | A capture from the portal with a design partner | Yes (IDR-09) |
| F-06[state] PT | EV-014 (Maharashtra, Odisha, Karnataka's effect); EV-015 (undone) | L5 on EV-015 for the state — one new row per jurisdiction | Yes, per state |
| F-07[state] LWF | EV-015 | L5 per state; a sourced "no levy" is itself a row — an N1 negative on that state's instrument | Yes, per state |
| F-08[portal] Mode C | None — the counsel register (Part D-17; §23) | None: a counsel answer is recorded, not graded (C4) | No |
| F-09 Code-era bonus return and ceilings | None — §06.7 | A capture of the notified form and ceilings | Yes, once captured |
| F-10 TDS deposit dates under r.218 | None — the rule text is unread; EV-050 covers vocabulary only | A capture of r.218's text | Yes, once captured |
| F-11[state] state-sphere forms | EV-053 and EV-057, central sphere only | A state-sphere row per state; the central rows never release it (G12) | Yes, per state |
| F-12 Form 123 layout | None — EV-050 maps 12BA to 123 but gives no layout | A capture of the form text and CBDT's guidance | Yes, once captured |

The operational consequence is that a fence can wait on a ledger revision after its source has been captured. `register.id_request_sla_days` bounds that wait (§02.18); F-10, which §05.18 calls the cheapest fence on the list, is the one where an unbounded wait would be most conspicuous.

**AC-EVR-37 · A fence names its row or its request.** *Given* a fence in §05.18 whose clear condition has fired, *when* the dependent version is proposed for publication, *then* the register holds either a grading event on the named row or an ID request in state Registered for the new fact; with neither, the version cannot leave DRAFTING (lint L-28).

#### Register events and the registers downstream

The register is upstream of three other registers: the compliance data pipeline (§22.8), the legal-claim register (§23 FR-LEG-001) and the banned-numbers list (§20.4). A change to a row is therefore an event with named consumers, not an edit. Each event is emitted by the grading event that caused it (§02.12) and carries the row ID, the old and new state, and the evidence.

| Register event | §22 compliance pipeline | §23 legal-claim register | §20 | Owning sections |
| --- | --- | --- | --- | --- |
| Downgrade or split (L14, L16) | A DETECTED change request against every version citing the row (FR-RULE-003 R1); for L14 no version changes (AC-EVR-11) | Dependent entries move to `suspended` (FR-LEG-001 AC2) | The V-item opens or re-opens | Inline markers re-checked |
| Kill (L7, L11, L15) | Citing versions superseded through the publish path, never edited (FR-RULE-003 R12, R13) | Dependent entries withdrawn | A banned-list entry if the claim is a figure (§20.4) | A [Reversed] entry wherever a conclusion falls (L18) |
| Upgrade (L3, L4, L6, L10, L12) | Drafting may begin; nothing changes until review and certification | Entries may be proposed for clearance | The V-item closes with its result | Markers updated where cited |
| Qualifier cleared (L9) | The pull-from-primary task closes on dependent versions (§22 AC-RULE-002.2) | Customer-facing use may now be cleared | — | — |
| Qualifier added (L19) | A DETECTED change request adds the RO6 flag to citing versions; enforcement unchanged | Dependent entries move to `suspended` until re-cleared (FR-LEG-001 AC2) | — | Inline markers gain the qualifier where cited (identifier rule 8) |
| Re-verify held (L13) | The watch subscription is re-confirmed | No change | — | No change |
| New row from a ledger revision | Citable in drafts | Citable in entries | The banned-number crosswalk is re-run (§02.7) | Citations may begin |

<!-- DIAGRAM: evidence-ledger-register-event-fanout -->

**AC-EVR-15 · One event, every consumer, acknowledged.** *Given* a grading event that splits EV-012 and re-grades its cap component [Hypothesis] (L16), *when* the event is written, *then* every rule version citing EV-012 for the cap receives a DETECTED change request that forces `warn_only`, every §23 entry citing the cap is suspended, and §20 V-17 is linked; each consumer's acknowledgement is logged, and a consumer that has not acknowledged within `register.event_ack_hours` raises an alert (§02.18).

**AC-EVR-16 · The register state bounds the rule object.** *Given* a draft rule version whose citation names a register row, *when* its `evidence_status` or `enforcement_mode` is set, *then* any value stronger than the contract table allows for that row's state is refused — for example `enforce` on a version resting on EV-012's cap, or `[Verified]` without the mirror flag on a version resting on EV-087.

**AC-EVR-17 · Not-in-force rows arm on their clock.** *Given* a rule version built on a [Verified — not in force] row, *when* a run resolves it for a date before the value of its commencement rule object (§23 FR-LEG-008), *then* it does not resolve; and *when* that value changes through a reviewed data load, *then* resolution follows the new value with no deploy.

### 02.11 Markers and the phasing of scope

The product vision spans SMB, mid-market and enterprise with the full module suite; v1 is the 20–200 beachhead (§01). The confidence markers do real work in keeping that phasing honest, because the temptation in a full-platform vision is to let a Hypothesis about a *later* phase justify building for it *now*. The rule that prevents this:

> **A [Hypothesis] may shape v1 architecture only where the cost of being wrong is a config change, never a rebuild — and it may never move a phase earlier than the evidence supports.**

Three concrete applications of the rule to the phasing:

- **Enterprise stays deferred because the evidence, not the ambition, sets the phase.** The finding that Indian enterprise procurement is "arithmetically closed ~3 years by RFP incumbency scoring" is **[Verified]** against real tenders (SBI's 30,000-employee prior-implementation floor and a scoring matrix that gates 90 of 150 marks on such references; Indian Bank's three-years-in-operation floor, which its startup relaxation shortens from five years but does not remove, and its requirement that a qualifying certification be held for at least one year before the RFP is published — r2, §01). No Hypothesis about enterprise reachability may pull that segment into v1. The one enterprise action that *is* taken at month zero — starting ISO 27001 — is justified precisely because its lead time (acquisition of roughly 3–6 months plus the RFP's own one-year holding requirement — r2/06) means deferring the *decision* forecloses the *option*. The one-year holding requirement is the tender's own text; the 3–6-month acquisition estimate rests only on compliance-consultancy pages (r2/06), so it is the soft half of the clock. That is a Verified constraint driving an early action, not a Hypothesis driving early scope.
- **Attach/benefits: build the data model in v1, defer the monetisation to a later phase.** The FBP data model, wallet config, proof-of-spend and endorsement history are built in v1 because retrofitting them into a shipped payroll engine is expensive (§11) — a Verified architecture-shaping call. The attach *revenue* is Hypothesis-marked and banned from any model (EV-K07), so it does not enter v1's business case or pricing. Same feature area, two phases, split by marker.
- **AI is v1 architecture and cost-of-goods, not a v1 revenue line.** The 52.7× cost ratio (EV-007, EV-089, Verified) justifies building the model router in v1; the ₹0.15–3.27 absolute (EV-008, Hypothesis) and the metered-AI-SKU revenue (Hypothesis, §13) do not enter v1's forecast. The zero-price finding across seven vendors (Verified, §12) and greytHR's "included in every plan" packaging (EV-090) keep AI in the cost column across every phase — and inference is the smallest of the four cost lines; the dominant one, supervised filing per registration, is still unsized (EV-088).

The general shape: **Verified constraints can move scope earlier or defer it; Hypotheses can shape architecture within a phase but cannot promote a phase.** This is the phasing discipline expressed in the register's own vocabulary, and it is why the roadmap (§01, §05) phases the vision rather than implying it all ships at once.

### 02.12 The register as a data product — entities, fields and identifiers

§02.7 prints the register as tables a reader can scan. This subsection specifies it as data a tool can check: the entities, their fields and the invariants that make the lint in §02.13 possible. The schema runs parallel to the rule object (§14.6.1b) — instrument, capture, citation, reviewer, state — because a rule version's authority is traced back through a register row (§02.1). It specifies the register's own store and tooling, not tenant data.

<!-- DIAGRAM: evidence-ledger-register-entity-model -->

#### Entities

| Entity | One record per | Key | Relationships |
| --- | --- | --- | --- |
| `Claim` | Register row — EV-### live, EV-K## killed | `claim_id` | 1..n `Capture` (none for Ungraded or Killed rows); 0..n `MarkerComponent`; 0..1 `Derivation`; 1..n `ReverifyTrigger` when [Verified]; 0..n `Citation` |
| `MarkerComponent` | Separately graded or separately qualified part of a row | (`claim_id`, `component_key`) | EV-005 (inputs, gross-up); EV-012 (rate, cap); EV-014 (Maharashtra, Odisha, Karnataka) |
| `Capture` | One read of one source with one set of methods | `capture_id` | Belongs to one `Claim`; reads one `Instrument` |
| `Instrument` | An authority's artefact — notification, rule, circular, file-format release, filed statement, judgment, vendor page, repository tag | `instrument_id` | 0..n `AmendmentLink` in each direction |
| `AmendmentLink` | One relation between two instruments | (`from_instrument`, `to_instrument`, `link_type`) | Feeds the corrigendum search and the watcher's reverse-citation index (§02.4; §22 FR-RULE-005) |
| `Derivation` | One arithmetic derivation of a figure | `derivation_id` | Inputs are `Claim` components (§02.15) |
| `GradingEvent` | One lifecycle transition, L1–L19 | `event_id` | Emits the register events of §02.10 |
| `KillRecord` | One kill | `claim_id` (EV-K##) | Crosswalk to a §20.4 entry; 0..n `Reversal` |
| `Reversal` | One retracted conclusion | `reversal_no` | Cites 1..n `Claim`; names its owning sections |
| `MirrorPull` | One instrument read at second hand | (`claim_id`, `instrument_id`) | Closed by a `Capture` from the primary host |
| `ReverifyTrigger` | One condition that forces a re-check | `trigger_id` | Spawns `ReverifyTask` records |
| `ReverifyTask` | One firing of a trigger | `task_id` | Ends in a `GradingEvent` (L13–L16) or a recorded outcome |
| `Citation` | One use of an ID in the PRD or a governed artefact | (`artefact`, `anchor`, `claim_id`) | Generated by scanning, never hand-kept (ER9) |
| `KillGuard` | One guard per kill row, and one per §20.4 entry that has no kill row | `guard_id` | 1 `KillRecord` or 1 `BannedEntry`; at least two fixtures (§02.19) |
| `BannedEntry` | One §20.4 entry, mirrored read-only from §20 | `banned_entry_id` | 0..1 `KillRecord`; its `crosswalk_status` is `matched` or `open_gap` |
| `IdRequest` | One fact waiting for a row | `request_id` | Ends in a new `Claim`, a `MarkerComponent` of an existing row, or a recorded decline (§02.20) |
| `RegisterEvent` | One change emitted to consumers | `event_id` | 1 `GradingEvent`; one acknowledgement per consumer (§02.21) |

#### `Claim`

| Field | Type | Required | Constraint |
| --- | --- | --- | --- |
| `claim_id` | string | Yes | `EV-` plus three digits for a live row; `EV-K` plus two digits for a kill. Immutable, never reused, assigned only by a ledger revision (identifier rules, below) |
| `claim_text` | text | Yes | The abridged claim as §02.7 prints it, naming its jurisdiction and period where it has them |
| `claim_class` | enum | Yes | One of the claim classes below; sets the defaults for capture, re-verify and owner |
| `grade` | enum: `Verified`, `Hypothesis`, `Killed`, `Ungraded` | Yes | For a row with components, the weakest component's grade (ER4) |
| `qualifiers` | set of enum | No | `mirror`, `provenance_caveat`, `not_in_force`, `negative_dated`, `claim_posture`, `declared_capability`, `archived`, `central_sphere`, `dated`, `as_to_effect`, `instrument_owed`, `superseded_revision_unread`, `corrigendum_owed`, `by_reference` — combinations per §02.2 G5–G17 |
| `ungraded_state` | enum: `open`, `blocked`, `undone` | When Ungraded | `blocked` requires `failed_tool` |
| `failed_tool` | text | When blocked | The tool and vantage that failed (§02.5) |
| `jurisdiction` | enum or text | Statutory classes | `Central`, a state or UT, a local body, or `n/a` |
| `sphere` | enum: `central`, `state`, `n/a` | Statutory classes | EV-057's schema-field rule |
| `effective_from`, `effective_to` | date | Statutory classes | Closed-open; `effective_to` is null while in force |
| `date_precision` | enum: `exact`, `on_or_about` | Whenever a date is stated | `on_or_about` forbids a single-date rendering anywhere (§23.1.4; lint L-21) |
| `rounds_of_origin` | set of `r1`–`r5` | Yes | From the research file each capture names |
| `last_source_contact` | `r1`–`r5`, or a date | Yes | `r1` or `r2` with no later re-check means the reliability prior applies (§02.7) |
| `kill_criterion` | object: `method`, `threshold`, `consequence`, `validation_id` | When Hypothesis | All four present; `validation_id` is a §20 V-item (ER3) |
| `extends`, `detail_at`, `dated_by` | `claim_id` references | No | EV-089 extends EV-007; EV-011's detail is at EV-046–EV-052; EV-016's figure is dated by EV-091 |
| `counsel_items` | list of Part D item numbers | No | EV-067 → D-8; EV-060 → D-4, D-12; EV-087 → D-14 |
| `owner_role` | enum | Yes | From the claim class; a role, never a named person (§23.1.6) |

#### `Capture`

| Field | Type | Required | Constraint |
| --- | --- | --- | --- |
| `capture_id` | string | Yes | Immutable |
| `source_class` | enum | Yes | `gazette`, `notified_rule`, `govt_statistic`, `filed_financial`, `regulator_directive`, `government_publication`, `case_law`, `source_repository`, `product_documentation`, `vendor_page`, `vendor_terms`, `vendor_config`, `archive_snapshot`, `secondary_summary`, `aggregator`. The last two never support [Verified] (§02.2) |
| `instrument_id` | reference | Yes | — |
| `url` | text | Yes | The artefact's deep link, never a home page |
| `capture_date` | date | Yes | — |
| `methods` | set of enum | Yes | `raw_fetch_comment_scan`, `rendered_read`, `vendor_config_file`, `archive_snapshot`, `pdf_text_extract`, `image_transcription`, `toggle_click`. A `vendor_page` needs the first two, plus `vendor_config_file` where prices are script-injected (§02.5); `image_transcription` needs a second transcriber (§22 FR-RULE-007) |
| `tool_and_vantage` | text | Yes | So that a failure is attributed to the tool before the site (§02.5) |
| `host_is_primary` | boolean | Yes | `false` puts `mirror` or `provenance_caveat` on the claim (ER2) |
| `archive_hash` | text | Statutory and vendor classes | Hash of the fetched bytes; the mirror pull compares hashes (AC-EVR-13) |
| `corrigendum_search` | object: `status`, `date`, `result` | Statutory classes | `status` is one of `found`, `none_found`, `owed`, `not_applicable`; blank is invalid (§02.4 recipe, step 5; lint L-17) |
| `research_ref` | object: `round`, `file`, `finding` | Yes | e.g. r5/04 finding 32; seeded from §02.7's two provenance tables |
| `scope_read` | enum: `whole`, `parts` with a list | Yes for statutory and regulator classes | A grade or retraction resting on `parts` waits until the neighbouring provisions are read (CF5, §02.5) |
| `quote_locator` | list of locators | When a verbatim quote is relied on | Byte offset, page and line, or image region in the archived bytes; the quote must reproduce from it (AC-EVR-34) |
| `literal_check` | object: `property`, `count`, `locator` | When a counted or literal property is relied on | Counted in the stored bytes or rendered image — a delimiter's length, a form's field count (CF1) |
| `freshness_basis` | enum: `recheck_of_element`, `page_rendered_date` | When the claim is that something is current or not yet released | `page_rendered_date` fails the grade (AC-EVR-35) |
| `refused_methods` | list of `method`, `tool`, `status` | When a host refused a method | The question the refused method would have answered is recorded as open (§02.5, the Zimyo case) |
| `grader`, `rechecker` | role identities | Yes for [Verified] | `rechecker ≠ grader` (§02.5; lint L-18) |

#### `Instrument` and `AmendmentLink`

| Field | Type | Constraint |
| --- | --- | --- |
| `instrument_id` | text | The authority's own handle — "S.O. 5936(E)", "G.S.R. 843(E)", "RPU 1.2", a CIN with a filing period, a repository tag |
| `issuer` | text | Ministry, regulator, court or vendor |
| `instrument_type` | enum | `act`, `code`, `so`, `gsr`, `rule`, `circular`, `faq`, `direction`, `file_format_release`, `filed_statement`, `judgment`, `vendor_page`, `vendor_terms`, `repository_tag` |
| `publication_date`, `effective_date` | date | Stored separately, equal only when the instrument says so (§02.4) |
| `gazette_id` | text | e.g. CG-DL-E-20122025-268694 |
| `primary_host` | text | Where a mirror pull must fetch from |
| `force_status` | enum | `in_force`, `not_in_force`, `partly_in_force`, `repealed`, `saved_until` — the last with a date and its precision |
| `link_type` (on `AmendmentLink`) | enum | `corrigendum_of`, `amends`, `supersedes`, `retrospectively_renotifies`, `commences`, `saves`, `carves_out` |
| `detected_by` (on `AmendmentLink`) | enum | `watcher`, `human_search` |

The November 2026 cliff, as the store holds it — the lineage a verifier needs and the watcher indexes (§02.4):

| From | Link | To | Published | Effective |
| --- | --- | --- | --- | --- |
| S.O. 5936(E) | `corrigendum_of` | S.O. 5319(E) — Sl. Nos. 2, 3, 7 and 8 | 19.12.2025 | 21.11.2025 |
| S.O. 5936(E) | `carves_out` | S.O. 2060(E) items (vi) and (vii) — slices of s.164 already in force | 19.12.2025 | 03.05.2023 |
| CoSS s.164(2)(b) | `saves` | EPF Scheme 1952, EDLI 1976, EPS 1995 and the ESI rules and schemes, for one year | — | 21.11.2025 |
| S.O. 3582(E) | `retrospectively_renotifies` | The 12% rate under EPF Scheme 2026 | 01.07.2026 | 21.11.2025 |

#### Worked capture records — four rows, field by field

The schema is easier to hold against real captures. The four below are chosen because each exercises a different part of it: a vendor page whose evidence is hidden from a browser, a regulator file format read from image-only scans, a notification read from a mirror, and a repository searched for an absence. Every value is taken from the research file named; where the research did not record a required field, the record says so, because that gap is what the seed must handle (§02.21).

| Field | EV-021 — Keka's commented prices | EV-035 — the ECR layout | EV-058 — DPDP commencement | EV-031 — Frappe's India payroll |
| --- | --- | --- | --- | --- |
| `source_class` | `vendor_page` | `regulator_directive` | `notified_rule` | `source_repository` |
| `instrument_id` | keka.com/pricing, live page | EPFO User Manual ReECR v3.0 with the portal Help File; circular Compliance/ECR Revamp/2025/12997 of 26.09.2025; revamped-ECR FAQ | G.S.R. 843(E), 13.11.2025; gazette CG-DL-E-14112025-267647, No. 757 | frappe/hrms version-16 (hrms/regional/india: setup.py 285 lines, utils.py 221, data/salary_components.json 43); ERPNext version-16 at commit 0b50853 |
| `capture_date` | 5 September 2026 | Round five; the research gives no day — recorded as a gap | Round four | Round three; the ERPNext commit is dated 2 September 2026 |
| `methods` | `raw_fetch_comment_scan`: 60 HTML comments, exactly three containing a rupee symbol, zero rupee characters once comments are stripped; `rendered_read`: no price visible | `pdf_text_extract` of the manual's text layer; `image_transcription` of the circular and FAQ (image-only scans, 13 pages) and of the Help File screenshot rendered at 900 dpi | Read of the PDF; round four's second study re-fetched from egazette.gov.in with a browser user-agent | Repository read; word-boundary searches for ECR, EDLI, EPS and UAN, among other terms |
| `tool_and_vantage` | Plain curl, HTTP 200, 318,005 bytes; the earlier failure attributed to one fetch tool (r5/03 finding 2) | Not recorded beyond the method — a gap | A browser user-agent for the egazette fetch (r4/02) | Not recorded — a gap the store would refuse for a new capture |
| `host_is_primary` | `true` — the vendor's own page | `true` — EPFO-operated hosts | `false` on the ledger's grading | `true` — the vendor's own repository |
| `archive_hash` | Recorded at capture; not reproduced in this PRD | SHA-256 recorded in r5/02 for the circular, the manual and the FAQ (prefixes a02b4ae7, 3667e099, ed7922cf) | MD5 90b5867813ac1ffbebe66397fbc6340d, reported by r4/02 for both the egazette copy and the mirror | The commit identifier stands in for a hash |
| `corrigendum_search` | `not_applicable` | `owed` | `owed` | `not_applicable` |
| `quote_locator` / `literal_check` | Byte offsets: FOUNDATION at 137,365 with ₹90 at 137,757; STRENGTH 151,895 → ₹120 at 152,281; GROWTH 160,947 → ₹150 at 161,345 | Delimiter counted as three bytes — #, tilde, # — at 900 dpi; ten delimiters and eleven values per sample line | — | Search terms and zero-match counts, per term |
| `scope_read` | `whole` page | `whole` manual; all 13 scan pages of the circular and FAQ | `whole` notification | `whole` tree of each named branch |
| `rechecker` | Not recorded — seeded `legacy_incomplete` (§02.21) | Second transcriber owed (§22 FR-RULE-007) | This register's re-checker owes the primary fetch (AC-EVR-13) | Not recorded — seeded `legacy_incomplete` |
| Grade it supports | [Verified] | [Verified], corrigendum owed | [Verified — mirror] | [Verified — declared capability]; N2 negative |
| `research_ref` | r5/03 findings 1–2 | r5/02 findings 1–5 | r4/01 finding 1 and verification note; r4/02 finding 1 | r3/01 findings 1–3 |

Three things the records show that the tables above do not. EV-021's evidence is a set of byte offsets, not a screenshot — a rendered capture of the same page would be a picture of nothing. EV-035's image transcription has one transcriber, so the grade stands on a capture that the §22 two-transcriber rule would not yet accept for a new format version. EV-058 holds a hash match in the research that this register has not yet logged under its own re-checker, which is why a finding that looks closed stays `mirror` (§02.7 mirror register).

#### `Derivation`, `KillRecord`, `Reversal` and `MirrorPull`

| Entity | Field | Constraint |
| --- | --- | --- |
| `Derivation` | `formula` | Human-readable and machine-evaluable; re-evaluation reproduces `output_value` exactly (AC-EVR-23) |
| | `inputs` | Each input names a `claim_id`, the component, the value used and the basis chosen — card, billing term, headcount, date |
| | `output_grade` | Computed as the weakest input's grade, with every input qualifier; never typed (ER4) |
| | `rounding` | Display method and places; full precision is kept |
| `KillRecord` | `dead_claim` | Stated in words as it was believed — never only as a value |
| | `kill_reason` | The disproving rows, or the provenance defect |
| | `replacement` | A `claim_id`, or the literal "none — unsized" |
| | `ledger_item` | The corrections-ledger item it discharges (K-##), where there is one |
| | `blocklist_key` | The claim key the §20.4 guard matches (ER6) |
| | `crosswalk_status` | `matched` for the seventeen kills with a §20.4 entry, or `claim_only` for the nineteen that kill a claim rather than a figure. The eight §20.4 entries with no kill row are held as `BannedEntry` records with `open_gap` (§02.7, §02.19) |
| `Reversal` | `prior_conclusion`, `corrected_position` | Both kept; the earlier statement stays readable, marked, where it was made |
| | `direction` | `over_correction` (rows 1, 5, 6, 14), `simplification` (rows 2, 3, 4, 7, 9, 16) or `methodology` (rows 10–13, 15, 17–19) |
| | `owning_sections` | Each carries the inline [Reversed] marker (lint L-20) |
| `MirrorPull` | `barred_uses` | The surfaces closed until the pull (§02.14) |
| | `status` | `open`, `pulled_match`, `pulled_differs` |
| | `mirror_hash`, `primary_hash` | Both recorded when the pull closes |

#### `ReverifyTrigger` and `ReverifyTask`

| Field | Type | Constraint |
| --- | --- | --- |
| `trigger_type` | enum | `dated` (a calendar date), `event` (a watch key — a notification, a Protean release, a page change), `periodic` (an interval), `on_use` (every citation re-captures — EV-091) |
| `due_date`, `event_key` or `interval` | by type | A `dated` trigger whose date is "on or about" arms on the earlier reading |
| `arm_lead_days` | integer | `register.reverify_arm_lead_days` (§02.18) |
| `owner_role` | enum | Statutory, Legal, Research, GTM, Engineering or Finance |
| `runbook` | reference | Every `dated` trigger has one (ER7), in the four-step shape of §02.6's worked event |
| `assignee` (task) | role identity | Never the row's last grader |
| `outcome` (task) | enum | `held`, `changed`, `killed`, `no_successor`, `blocked_fetch` — a `blocked_fetch` records the tool and keeps the task open; it never closes it |

#### Claim classes and their defaults

| `claim_class` | Weakest source that can support [Verified] | Capture methods required | Default re-verify trigger | Qualifiers it typically carries | Owner role |
| --- | --- | --- | --- | --- | --- |
| `statutory_rate` — rate, slab, ceiling, threshold | Gazette or notified rule at the issuing host | PDF text extract with hash; corrigendum search | Event on any notification touching the instrument; a quarterly floor (§02.6) | `central_sphere`, `corrigendum_owed` | Statutory |
| `statutory_deadline` | Notified rule or regulator directive | As above | Annually at the Budget; event on circulars | — | Statutory |
| `file_format` | The authority's own format release or help file | Download pinned by the artefact's own version string, not the page's label (§22 FR-RULE-004) | Event on each release | `corrigendum_owed` | Statutory, with Engineering |
| `portal_behaviour` | Regulator FAQ, manual or circular; a live-session capture | Image transcription by two people where the source is a scan | Event on a portal release | — | Statutory, with Operations |
| `legal_interpretation` | The statute's text; the interpretation itself needs counsel | — | The counsel register (§23) | — | Legal |
| `legal_negative` | A dated search record | Search log with sources and dates | Biannual (EV-072, EV-084) | `negative_dated` | Legal, with Research |
| `competitor_price` | The vendor's own page, or its archived copy | Dual capture; config file where script-injected; billing toggles clicked | Event on a page change; `competitive_recapture_cadence_days` (§21) | `archived`, `dated` | Research |
| `competitor_capability` | Source repository or product documentation (declared); an executed product (observed) | Repository tag or documentation URL; a test record | Event on each major release | `declared_capability`, `claim_posture` | Research |
| `market_figure` | Government statistic or filed financial statement | PDF extract with hash | Event on the next release or filing | `dated` | Research, with Finance |
| `cost_input` | The provider's price card; a reference rate | Page capture | Event on any price change; FX monthly (§02.6) | — | Engineering, with Finance |
| `derived_figure` | Inherits its inputs | A `Derivation` record | The earliest input trigger | Inherited | The owner of the weakest input |
| `research_process` | The research files themselves | Round, file and finding reference | Each new round | — | Research lead |
| `procurement_term` — a buyer's tender or RFP clause | The tender document as the buyer published it | PDF with hash | Each new tender from the buyer | `dated` | Research, with Finance — the class IDR-02 registers under (§02.20) |

#### Invariants

- **ER1 · Identity is permanent.** A `claim_id` is never edited, deleted or reused. A killed quantity that returns enters as a new row with a new ID (L15, L17).
- **ER2 · [Verified] has two identities and a primary read.** Every [Verified] row has at least one `Capture` with `rechecker ≠ grader`; where no capture has `host_is_primary = true`, the row carries `mirror` or `provenance_caveat` and an open `MirrorPull`.
- **ER3 · [Hypothesis] carries its exit.** Every [Hypothesis] row or component has all four `kill_criterion` fields and a §20 V-item.
- **ER4 · Nothing is stronger than its weakest input.** A row's `grade` is its weakest component's; a `Derivation`'s `output_grade` is computed, never typed (§02.2 composite rule).
- **ER5 · The amendment fingerprint is stored.** Every `corrigendum_of` and `retrospectively_renotifies` link records an effective date earlier than its publication date. A capture of a base instrument that has such a link must cite it, or the grade is refused.
- **ER6 · Kills are keyed by claim, not by value.** `blocklist_key` is a claim key; a guard that matches a bare number is non-conformant (§02.15, the collision case).
- **ER7 · Every [Verified] row has a trigger, and every dated trigger has a runbook.**
- **ER8 · Only §02 mints rows.** A table row in any other section that begins with an EV ID is a defect (lint L-03).
- **ER9 · Citations are generated.** The `Citation` set is rebuilt by scanning the PRD and the governed artefacts; no hand-kept list is authoritative.

#### Identifier rules — how IDs are assigned, split and cited

1. **Who assigns.** Only a corrections-ledger revision assigns EV IDs. This section registers them and no other section mints one (Part A-3). A fact that needs a row and has none is cited to its research file — "r5/02 finding 28" — and requested at the next revision, never given a provisional EV number.
2. **Format.** Live rows are `EV-` plus three digits (EV-001); kills are `EV-K` plus two digits (EV-K12). A short form — `EV-` followed by one or two digits — is a defect and is normalised to three digits wherever it is found (lint L-02).
3. **Order carries grouping, not precedence.** EV-021–EV-092 follow the ledger's grouping by subject, not their capture dates. Tools sort by number.
4. **Extension, detail and dating.** A later row that carries an earlier row's claim further links to it — EV-089 extends EV-007; EV-046–EV-052 give EV-011's detail; EV-091 dates EV-016's figure. A citation uses the most specific live row: EV-089 for the model spread, EV-046 for the Q4 fence.
5. **Components.** A row whose parts are graded differently (EV-005, EV-012) or qualified differently (EV-014, whose Karnataka part is "as to effect") is cited with the part named — "EV-012 (2× rate)", "EV-012 (cap)". A citation of the whole row takes the weakest part's marker (ER4; lint L-16).
6. **Kill IDs are cited only as kills.** An EV-K ID appears only where the text frames the claim as dead — a kill list, a [Reversed] note, a lesson. Citing a kill row in support of anything is a defect.
7. **Terminal means terminal.** A killed row is never re-graded. An event that later makes the dead claim true — a vendor ships the feature a kill denied — enters as a new row with its own capture (ER1).
8. **Qualifiers travel with the ID.** Outside this PRD, a citation of a mirror, caveat, not-in-force, dated or as-to-effect row carries its qualifier in the same sentence — "(EV-058, read from a third-party copy; pull before use)".

**AC-EVR-18 · IDs are minted in one place.** *Given* the assembled PRD, *when* the register lint runs, *then* every EV ID cited anywhere resolves to a row in §02.7, no section other than §02 contains a table row beginning with an EV ID, and no ID is registered twice.

**AC-EVR-19 · The fingerprint is enforced on write.** *Given* a new `AmendmentLink` of type `corrigendum_of` whose effective date is not earlier than its publication date, *when* it is written, *then* it is refused as mis-typed; and *given* a capture of S.O. 5319(E) that does not cite S.O. 5936(E), *when* a grade is proposed on it, *then* the grade is refused (ER5).

#### The ledger revision — what one contains, and what it may not do

Identifier rule 1 puts ID assignment in one place: a corrections-ledger revision. Everything downstream depends on that being a real, bounded procedure rather than a habit — `register.id_request_sla_days` bounds a fence's wait on one (§02.10), the backlog is re-sorted at one (§02.18), and the seed's counts are a statement about one (§02.21). This is its specification.

<!-- DIAGRAM: evidence-ledger-ledger-revision-states -->

| # | From → To | Event | Guard | Side effect | Who may trigger |
| --- | --- | --- | --- | --- | --- |
| LR1 | *(none)* → Collecting | The previous revision reconciles | — | Open `IdRequest` records accumulate against it (IR1) | Ledger owner |
| LR2 | Collecting → Drafted | Intake is frozen and IDs are proposed | Every proposed row has a capture, or is a kill row with its reason and replacement | Proposed IDs are reserved, not published; nothing may cite them yet | Ledger owner |
| LR3 | Drafted → Collecting | A proposed row is sent back | Its capture is incomplete, its class is wrong, or IR3 shows it is an existing component | The reserved ID is released and never re-used for a different fact (ER1) | Grader or re-checker |
| LR4 | Drafted → Reviewed | Each new row is graded | Grader ≠ re-checker on every [Verified] row (ER2); every [Hypothesis] row carries all four kill-criterion fields and a §20 V-item (ER3) | — | Re-checker |
| LR5 | Reviewed → Published | The revision issues with its number and date | — | Identity becomes permanent; citations may be re-pointed (IR7) | Ledger owner |
| LR6 | Published → Reconciled | The post-conditions below all pass | Each one recorded, not asserted | The revision is complete | System, confirmed by the ledger owner |
| LR7 | Reconciled → Collecting | A post-condition fails | The failing item is named | That item alone returns to intake; the published IDs stand | System |

**What a revision may contain.** New live rows; new kill rows; a component split of an existing row (L16); a merge decision that re-points citations at an existing row or component (IR3); a decline that removes a research-file citation from the PRD (IR5); and the qualifier and grade changes that the intake produced since the last revision. Nothing else.

**What a revision may never do.** Six prohibitions, each of which would break something specific downstream:

| Prohibited | Why | What breaks if it happens |
| --- | --- | --- |
| Edit or re-use a published `claim_id` | ER1 | Every external citation of that ID silently changes meaning, including ones already in a customer's hands |
| Renumber rows to close a gap left by a decline | ER1; identifier rule 3 | Order carries grouping, not precedence; renumbering invalidates every `Citation` and every rule version's citation |
| Re-grade a kill row | L17; identifier rule 7 | The blocklist stops being terminal, and a dead claim returns by administrative act rather than by evidence |
| Register a row with no capture and no kill reason | ER2, ER3 | A row that looks graded but cannot be re-opened by a re-verifier — the failure §02.5 exists to prevent |
| Change a `BannedEntry`'s text | §20 owns it (TS-58) | The crosswalk stops being a reconciliation of two independently maintained lists and becomes one list copied twice |
| Publish while a post-condition is unrecorded | LR6 | The census, the crosswalk, the guards and the backlog drift out of agreement with the register they describe |

**Post-conditions — the recorded checklist of LR6.** Each is a query with an expected answer, not a judgement:

| # | Post-condition | Query | Fails when |
| --- | --- | --- | --- |
| PC1 | The census is re-counted and reconciles to the event log | `census(as_of = publication)` | Any cell differs (AC-EVR-47) |
| PC2 | The banned-number crosswalk is re-run | `crosswalk` | A new §20.4 entry has no guard, or a banned-class kill row has no §20.4 entry (L-15) |
| PC3 | A `KillGuard` exists for every new kill row and every new `BannedEntry`, with both fixtures | `guard` self-test | A guard blocks its own look-alike, or has none (L-29, AC-EVR-39) |
| PC4 | The backlog is re-sorted by the ordering rule | `backlog` | An item in a higher band sits below one in a lower band (AC-EVR-29) |
| PC5 | The one-way-door table is re-checked against the new rows | `dependents` on each door's rows | A door now rests on a row whose last source contact is r1 or r2 (AC-EVR-28) |
| PC6 | Every open `IdRequest` is assigned, merged or declined | `backlog`, ID-request band | A request passes `register.id_request_sla_days` untriaged (L-30) |
| PC7 | Inline markers reconcile to the register | assembly lint | An orphan marker or an uncited row (L-19, L-22) |

**In-flight work across a revision.** A rule version drafted against a research-file citation may keep drafting while its request is open; it may not leave DRAFTING (L-28). On LR5 the citation is re-pointed to the new ID and the version proceeds under the §02.10 contract for that row's state — which may still refuse it, because registration is not a grade. A fence that waits on a request (five of §05.18's twelve) clears on the *rule version's* publication, never on the revision itself.

**Worked revision — the one that produced this version of the register.** Its shape is the reference case: it registered EV-021–EV-092 as live rows and EV-K12–EV-K36 as kill rows, one per corrections-ledger item; it split EV-012 and corrected EV-018 in place rather than minting replacements, because both claims already had identifiers and only their grading changed; it recorded nineteen [Reversed] entries, three of which (rows 17–19) came from the revision's own host audit rather than from new research; it left seventeen ID requests open, eight of them the §20.4 entries with no kill row; and it wrote 44 guards. Two post-conditions returned failures that were recorded rather than fixed: EV-005's gross-up component names no V-item, and most seeded rows carry no re-checker identity. Both load as `legacy_incomplete` (§02.21) — which is PC1 and PC6 doing their job, because the alternative is a revision that reports clean by leaving its gaps unstated.

**AC-EVR-48 · A revision reconciles before it closes.** *Given* a published ledger revision, *when* LR6 runs, *then* PC1–PC7 each record a result; a revision whose post-conditions are unrecorded stays Published and never reaches Reconciled, and the daily lint reports it with the failing item named (TS-68, TS-69).

### 02.13 Register conformance — lint rules and test scenarios

The lint is how §02.12's invariants and §02.2's grading rules stop being advice. Each rule says what it checks, where it runs and whether it blocks. *Assembly* is the build of this PRD from its section files; *register write* is any change to a row; *publish* is the §22 pipeline's gate; *release* is any artefact that leaves the company or reaches a customer. Phrase-level legal rules — a foreign decision without its jurisdiction, "sensitive under DPDP", a section number withheld, a negative worded as a certainty — are §23's banned-claim lint (FR-LEG-003) and are not repeated here. This lint supplies FR-LEG-003 with the row state each phrase is tested against. The PRD's assembly check already enforces L-01 as a hard failure and reports L-02 and L-07; the rest are specified here for the register store and the release gate.

| # | Check | Runs at | Severity | Fix |
| --- | --- | --- | --- | --- |
| L-01 | An EV ID is cited but not registered in §02.7 | Assembly | Block | Register it through a ledger revision, or cite the research file instead |
| L-02 | An EV ID in a short form (`EV-` with one or two digits) | Assembly | Warn | Normalise to three digits |
| L-03 | A table row in a section other than §02 begins with an EV ID | Assembly | Block | Move it to §02 through a ledger revision (ER8) |
| L-04 | An inline [Verified] on a sentence whose cited row, or cited component, is [Hypothesis], [Killed] or Ungraded | Assembly; release | Block | Correct the marker, or cite the component that is Verified |
| L-05 | An inline [Hypothesis] whose row has no V-item, or a load-bearing claim with no marker and no row | Assembly | Block | Attach the kill criterion and V-item (ER3), or grade the claim |
| L-06 | A composite or derived figure carries a marker stronger than its weakest input | Register write; assembly | Block | Recompute `output_grade` (ER4) |
| L-07 | A killed claim's wording appears without kill framing on the same line | Assembly | Warn | Frame it — "[Killed]", "[Reversed]", "false", "withdrawn" — or remove it |
| L-08 | A killed claim, or a §20.4 banned figure, appears in a model, deck, contract or export | Release | Block — fail-closed (§20.12 rule 6) | Remove it. The match is on the claim key and its context, never a bare value (ER6; §02.15) |
| L-09 | A row qualified `mirror` or `provenance_caveat` is cited on a customer-facing surface | Release | Block | Close the mirror pull first (L9) |
| L-10 | A row qualified `not_in_force` is cited with present-tense duty wording | Assembly: warn; release: block | As shown | State the commencement in the same sentence (§23.1.3) |
| L-11 | A competitor row is cited outside the PRD without its capture date and the executed-or-read note | Release | Block | Add both, and clear under §21 |
| L-12 | A derived figure has no `Derivation` naming its inputs and basis | Assembly: warn; release: block | As shown | Write the derivation (§02.15) |
| L-13 | A row's re-verify date has passed | Daily | Report; planning uses demote (L14) | Run the re-check; no rule version changes (AC-EVR-11) |
| L-14 | A row whose last source contact is r1 or r2, not re-checked, feeds a financial model or a contract | Release | Block | Re-check at source first (§02.7) |
| L-15 | A §20.4 banned entry has no kill row, or a banned-class kill row has no §20.4 entry | Assembly | Warn on the eight known gaps (§02.7); block on any new gap | Request IDs at the next ledger revision |
| L-16 | A row with components is cited as a whole under its stronger marker | Assembly; release | Block | Name the component (identifier rule 5) |
| L-17 | A statutory capture's corrigendum field is blank | Register write | Block | Record `found`, `none_found`, `owed` or `not_applicable` |
| L-18 | A [Verified] row's grader and re-checker are the same identity | Register write | Block | Assign a re-checker |
| L-19 | A register row is cited nowhere | Assembly | Warn | Cite it, or record why it is kept |
| L-20 | An inline [Reversed] with no [Reversed]-register row, or a register row whose owning sections lack the inline marker | Assembly | Warn | Add the missing half |
| L-21 | A date with `date_precision = on_or_about` is rendered as a single date | Assembly: warn; release: block | As shown | Write "on or about" (§23.1.4) |
| L-22 | Inline markers do not reconcile to the census (§02.3) | Assembly | Warn | Resolve the orphan — a marker with no row, or a row with no inline appearance |
| L-23 | An N2 or N3 negative is cited outside the PRD without its corpus and snapshot, or its element and date, in the sentence | Release | Block | Name the bound (AC-EVR-32) |
| L-24 | A qualifier set the compatibility table forbids, or a qualifier without its co-requisite | Register write | Block | Correct the set (AC-EVR-33) |
| L-25 | A row whose only capture of an instrument is on a non-primary host carries neither `mirror` nor `provenance_caveat` | Register write; assembly | Block | Add the qualifier and open a `MirrorPull` (AC-EVR-36) |
| L-26 | A verbatim quote is relied on without a `quote_locator`, or a counted or literal property without a `literal_check` | Register write | Block | Record the locator or the count (AC-EVR-34) |
| L-27 | A claim that something is current rests on a `page_rendered_date` | Register write | Block | Re-check the watched element (AC-EVR-35) |
| L-28 | A rule version cites a fact with no register row and is proposed past DRAFTING | Publish | Block | Complete the ID request (§02.10 contract; §02.20) |
| L-29 | A `KillGuard` lacks a blocked fixture or a permitted look-alike fixture | Lint self-test | Block | Add both (AC-EVR-39) |
| L-30 | A re-verify task, mirror pull or ID request is past its band deadline or SLA | Daily | Report and escalate | Work the item (§02.20) |
| L-31 | A release decision used a register answer older than the row's last grading event | Release | Block — fail closed | Re-query (§02.21) |

**AC-EVR-20 · Every rule has a pass case and a fail case.** *Given* each lint rule L-01 to L-31, *when* the lint's own tests run, *then* at least one fixture passes it and at least one fails it, so a rule that silently stops matching is caught — the same discipline FR-LEG-003 AC2 applies to the banned-claim patterns.

#### Test scenarios

Each scenario is a fixture the lint and the register store must pass. Positive and negative cases are paired wherever a rule could over-match.

| # | Given | When | Then |
| --- | --- | --- | --- |
| TS-01 | A section other than §02 adds a table row minting the next unassigned EV number for a new EPFO fact | Assembly runs | L-03 blocks; the fact is cited to its research file and requested at the next ledger revision |
| TS-02 | §09 writes "[Verified] overtime at not less than twice the ordinary rate (EV-012, 2× rate)" | Assembly runs | Passes — the cited component is Verified |
| TS-03 | A deck writes "[Verified] a 144-hour quarterly overtime cap (EV-012)" | Release runs | L-04 and L-16 block; the cap component is [Hypothesis] (EV-K15) |
| TS-04 | A proposal says "DPDP commences on 13 May 2027 (EV-058)" | Release runs | L-09 blocks (mirror) and L-21 blocks (a single date for an on-or-about date) |
| TS-05 | An internal §21 table shows ₹99.99 per employee at 100 employees on Keka's archived FOUNDATION card, with a derivation citing EV-022 | Assembly runs | Passes — a derived historical figure with its basis (§02.15) |
| TS-06 | A pricing page says "Keka charges about ₹99 per employee" | Release runs | L-08 blocks — the §20.4 "~₹99 Keka price point" claim, matched on claim and context |
| TS-07 | A financial model uses ₹115 PEPM, the midpoint of our ₹80–150 target | Release runs | Blocked — EV-006 is [Hypothesis] (§02.14); any architecture-sizing use is pinned to ₹80 (§02.3) |
| TS-08 | A security-questionnaire answer says replay "satisfies RBI's right to audit" | Release runs | L-08 blocks (EV-K32) |
| TS-09 | A draft rule version sets ESI rates for periods after 21 November 2026, citing EV-004 | Publish runs | Refused — an Ungraded (open) row backs no version (§02.10 contract) |
| TS-10 | EV-003's re-verify date passes unchecked | L-13 runs | Planning and external uses of EV-003 demote; the `pf_rate` version keeps enforcing; a DETECTED change request opens (AC-EVR-11) |
| TS-11 | The e-Gazette copy of G.S.R. 843(E) is fetched and its hash matches the mirror's | The mirror pull closes | L9 fires for EV-058, and EV-018 inherits it; "on or about" stays (AC-EVR-13) |
| TS-12 | The same fetch returns a copy whose hash differs | The mirror pull closes | Status `pulled_differs`; every citation of EV-058 and EV-018 is flagged, and both rows are re-graded against the primary text |
| TS-13 | A new research round reads S.O. 5319(E) and concludes there is no one-year sunset, without citing S.O. 5936(E) | It is proposed as a re-grade of EV-002 | Refused under conflict rule C3 and ER5; recorded as not adopted (§02.16) |
| TS-14 | Two dimensions of one round give opposite P0 instructions for one file format | Both are proposed | Neither is adopted; the claim sits at the lower grade and the generator stays fenced until a primary read (C4; worked grading F) |
| TS-15 | A vendor page shows different prices in two captures made with two tools | Grading runs | Neither capture supports [Verified] until the difference is explained, and the discrepancy is itself recorded (§02.5) |
| TS-16 | A deck quotes greytHR's share of contributing establishments with no capture date | Release runs | L-11 blocks; the underlying figure moved between captures (EV-016, EV-091) |
| TS-17 | A new state PT slab is proposed from an aggregator table | Register write runs | Graded a defect (G20); no rule version may cite it (§02.10 contract) |
| TS-18 | DPAL 08 SHASANA 2025 is retrieved and its corrigendum search recorded | Grading runs | EV-014's Karnataka component loses `instrument_owed`; the Karnataka `pt_slab` version is re-drafted with the instrument cited |
| TS-19 | Protean's Form 138 Q4 regular anchor goes live | The watch key fires | EV-046 is killed by the event (L15) and its replacement enters at the next ledger revision; the fenced generator unblocks only when the §22 pipeline publishes the format version, never on the watcher's hit alone (§22 AC-RULE-006.1) |
| TS-20 | ICAI's February 2020 revision is retrieved and contains a payroll-processing line | Grading runs | EV-017 is killed (L15); the citation set lists every external use to withdraw |
| TS-21 | A deck states "India HRMS spend is ₹2,100–3,900 Cr [Verified]" | Release runs | L-06 blocks; EV-005's gross-up is modelled |
| TS-22 | One analyst grades and re-checks the same row | Register write runs | L-18 blocks |
| TS-23 | A kill criterion's threshold is changed after its study reports | Register write runs | Refused (L8's guard; §20.12 rule 9) |
| TS-24 | A battlecard cites EV-027's price table with no capture date | Release runs | L-11 blocks until the capture date and the capture class are added |
| TS-25 | A contract annex relies on ADMS push (EV-013) as a guaranteed device path | Release runs | L-14 blocks — last source contact r2, not re-checked; §20 V-11 is the re-check |
| TS-26 | Customer copy reads "we are not aware of any Indian law requiring biometric attendance, as of September 2026 (EV-072)" | Release runs | Passes the register checks; phrase clearance is FR-LEG-003's and FR-LEG-001's |
| TS-27 | A statutory row is written with its corrigendum status blank | Register write runs | L-17 blocks |
| TS-28 | An inline [Reversed] appears in a section with no matching register row | Assembly runs | L-20 warns |
| TS-29 | A battle card says "Frappe HR v16 contains no state PT slab table (source tree read, round three; EV-031)" | Release runs | Passes — an N2 negative with its corpus named |
| TS-30 | A battle card says "Frappe does not support multi-state PT" | Release runs | L-23 blocks — no version or snapshot, the shape a new release falsifies unnoticed |
| TS-31 | A proposal says "the IRDAI ICS Guidelines 2023 contain no localisation requirement (EV-086)" | Release runs | Passes — an N1 negative naming its instrument |
| TS-32 | A proposal says "IRDAI imposes no localisation on insurers' data" | Release runs | Blocked by the EV-K19 guard; EV-086 itself names policy-record localisation under the 2015 Regulations |
| TS-33 | A grader writes `central_sphere` on EV-027 | Register write runs | L-24 refuses — a statutory qualifier on a competitor-price row |
| TS-34 | EV-014's Karnataka component loses `instrument_owed` but keeps `as_to_effect` | Register write runs | L-24 refuses |
| TS-35 | A new capture of the HIV and AIDS Act from a legal database is proposed for [Verified] without a qualifier | Register write runs | L-25 refuses; `mirror` is written and a `MirrorPull` opens |
| TS-36 | A capture quotes Qandle's page as showing `__/mo` placeholders, with no locator | Register write runs | L-26 refuses; with a locator that does not reproduce from the bytes, AC-EVR-34 refuses (CF3) |
| TS-37 | A re-check records EV-046 as "current as of today" on the strength of Protean's footer date | Register write runs | L-27 refuses (CF2); the Q4 anchors are re-checked instead |
| TS-38 | A draft version of the TDS deposit-date rows cites r.218 through a research reference and is moved to IN_REVIEW | Publish runs | L-28 blocks — no row exists (F-10) |
| TS-39 | The same version after the ID request reaches Registered with the row graded [Verified], corrigendum search recorded | Publish runs | Passes the register's gate; the §22 review proceeds |
| TS-40 | A deck says "Qandle's entry tier is ₹49.00 per employee at 50 employees on annual billing (EV-027, captured 5 September 2026)" | Release runs | Passes the EV-K20 guard — a named vendor's list price with its basis, not a ceiling |
| TS-41 | A deck says "the market will not pay more than ₹49 per employee" | Release runs | The EV-K20 guard blocks — a single-figure ceiling, whatever the digits |
| TS-42 | A security answer says "TallyPrime ships a PT statement (EV-032, product documentation)" | Release runs | Passes the EV-K12 guard — true, and not a slab table |
| TS-43 | A sales email says "Tally handles your state PT slabs" | Release runs | The EV-K12 guard blocks; EV-032 records hand-entered slabs |
| TS-44 | Consent copy says "under DPDP s.7(i) no consent is needed" | Release runs | The EV-K14 guard blocks; the same provision with its commencement and today's SPDI r.5(1) duty in the sentence passes the guard and still needs FR-LEG-001 clearance |
| TS-45 | Site copy repeats the Killed claim "we file for you" | Release runs | The EV-K24 guard blocks; "a portal-accepted artefact and attended, assisted submission under your written authority" passes the guard, and whether it may be offered on a given portal is F-08's (§05.18) |
| TS-46 | The EV-060 pull fails three times on different tools and the band deadline passes | Daily lint runs | The pull stays Open and is reported (MP5); the row keeps its grade and its caveat |
| TS-47 | EV-076's Rules are fetched from the Gazette and the text differs from the government-hosted reproduction | The pull closes | PulledDiffers (MP7): every difference listed, every citation of EV-076–EV-078 flagged, Rule 3(2) copy held |
| TS-48 | An ID request is opened for a fact that is already EV-044's content | Triage runs | Merged (IR3); citations re-pointed to EV-044 |
| TS-49 | The register store is unreachable during a release and during a payroll run | Both run | The release is blocked (fail closed); the payroll run completes against published rule versions |
| TS-50 | An auditor asks what backed a rule version published at T citing EV-003, after EV-003 went stale | `row(EV-003, as_of = T)` runs | Returns the state at T, not today's (AC-EVR-44) |
| TS-51 | The seed loads and the store's [Verified] count is 86 | Seed validation runs | The load fails, naming the row whose grade differs from §02.7 (AC-EVR-46) |
| TS-52 | An attach model uses ₹10,000–25,000 per life for group health | Release runs | The `BannedEntry` guard blocks, though no kill row exists (§02.19) |
| TS-53 | The host audit finds EV-082's only capture of the Act on a legal database | L19 is written | `mirror` added and a `MirrorPull` opened; the Complaints Officer text is held; no rule version changes enforcement |
| TS-54 | A grader proposes plain [Verified] on a legal-database read because the research file labels it [high] | Register write runs | Refused under C8; `mirror` is written |
| TS-55 | The SEBI security note's localisation sentence (§02.21 worked gate run) | Release runs | Blocked by the EV-K19 guard; the rewritten sentence passes the guard and waits on searches 9 and 15 |
| TS-56 | The loader parses EV-018 | Seed runs | Three components carrying `not_in_force`, `mirror` and `provenance_caveat`; the row counted once in each census cell |
| TS-57 | An entry is added to §20.4 with no guard | Assembly runs | Fails (AC-EVR-40) |
| TS-58 | An editor changes a `BannedEntry`'s text in the register store | Register write runs | Refused — §20 owns the text, and the store syncs from §20.4 |
| TS-59 | The loader meets EV-005's gross-up component, which names no §20 V-item | Seed runs | The component loads `legacy_incomplete` and is reported under ER3; the census still counts it [Hypothesis] |
| TS-60 | A Gazette PDF of the RPwD Rules is fetched whose bytes differ from the reproduction but whose text matches | The pull closes | PulledMatch by textual comparison, recorded as textual (MP6); L9 on EV-076–EV-078 |
| TS-61 | A new Frappe release is searched and still contains no state PT slab table | Intake runs | CI9: L13 re-dates EV-031's N2 negative to the new snapshot; no new row |
| TS-62 | Protean's Q4 page moves and the anchor cannot be found | Intake runs | `blocked_fetch` (RT4); EV-046 is neither released nor re-dated |
| TS-63 | A search summary claims TallyPrime now ships state PT slabs | Intake runs | CI16: refused as evidence and logged as a lead; the EV-K12 guard still blocks any sentence built on it |
| TS-64 | A capture from a later round reads S.O. 5319(E) without S.O. 5936(E) | Intake runs | CI15: refused under C3 and logged as not adopted against EV-002 |
| TS-65 | A new capture shows a kill row's claim is now true — a TDL catalogue lists a PT-slab add-on | Intake runs | CI14: the kill stays terminal; the new fact enters by an ID request (IR1) with its own capture, and the §21 parity row re-opens |
| TS-66 | A census cell is edited to match a section's prose after a kill was written into the text | `census` is recomputed | AC-EVR-47 fails, naming the events that do not reconcile; the prose, not the census, is corrected |
| TS-67 | A tool reports the grade cells summing to 92, the identifier count | Seed validation runs | Fails under CN2 — the sum is over 94 marker components; the tool has silently picked one component per split row |
| TS-68 | A ledger revision publishes its IDs with the crosswalk re-run but the guard self-test unrecorded | LR6 runs | The revision stays Published and never reaches Reconciled; the daily lint names PC3 (AC-EVR-48) |
| TS-69 | A revision renumbers three rows to close the gap left by a declined request | Register write runs | Refused under ER1 and identifier rule 3 — a gap in the series is not a defect; renumbering invalidates every existing citation |
| TS-70 | A deck says "Keka cut its price 30% since 2024" | Release runs | The stored DR1 refusal is returned with its reason and unblocking condition; L-11 blocks separately for the missing capture date (AC-EVR-49) |
| TS-71 | The same 30% figure is proposed again with no new capture of the live card | `basis` is queried | Refused against the stored refusal record, not re-argued |
| TS-72 | A financial model carries ₹17,964 a year as greytHR's overcharge on a 20-person employer | Release runs | Blocked twice — the output is modelled (§02.14 financial-model column) and the sentence asserts a counterfactual as the vendor's conduct (§21 clearance) |
| TS-73 | A battle card says "a 20-person employer pays ₹2,495 a month, the same as a 50-person employer, because the block is 50 (EV-026, EV-027, captured 5 September 2026)" | Release runs | Passes the register checks — two verified inputs, no counterfactual, capture date in the sentence; §21 clearance still applies |
| TS-74 | A sixth round delivers findings with no tool or vantage recorded for any capture | Intake runs | Each loads `legacy_incomplete`; none may be re-graded upward or have a qualifier cleared until a new capture fills the gap (AC-EVR-50) |
| TS-75 | A sixth round reports zero retractions across every dimension | The round closes | Findings load; the round is flagged under §02.9 and `register.min_retraction_rate_alert` fires; its findings carry the displaced rows' prior, not a fresh one |
| TS-76 | A draft `eps_rate` version stores 1,250 as a constant, citing EV-035's sample line | Publish runs | Refused — the sample line is one case, not a rule; IDR-03 holds the cap value until the scheme page is read at source (§02.20 worked request) |
| TS-77 | A golden-file fixture for an ECR line asserts the employer's ₹1,800 total and not the EPS and EPF fields separately | The fixture is reviewed | Rejected — a convention that leaves the total right and the split wrong reconciles at the challan and misallocates at the member (§02.15 derivation 9) |

### 02.14 Usage licences — what each register state permits, and where

§02.2 says what [Verified] licenses and forbids; §02.3's haircut schedule says what reaches a model; §23.1.3 is the ladder for statements about law. This matrix is the single table the release gate reads — one row per register state, one column per surface — and it covers every claim class, not only legal ones. "Cleared" means FR-LEG-001 clearance for a legal or compliance statement and the §21 clearance for a competitor statement. Outside this PRD, every cited row carries its ID and capture date.

| Register state | Engine: enforce | Engine: warn, or a config default | PRD prose and internal planning | Financial model | Customer-facing copy, assistant answers, contracts | External excerpt of this PRD (FR-LEG-004) |
| --- | --- | --- | --- | --- | --- | --- |
| [Verified], re-verify in date | Yes, through a published rule version | Yes | Yes | Yes | Yes, cleared and cited | Yes |
| [Verified], corrigendum owed | After the pipeline records the search (§02.10) | Yes | Yes | Yes | Not for a statutory statement until the search is recorded (§23.1.3 requires its date) | Yes, with the open item named |
| [Verified — mirror] or provenance caveat | Yes, flagged (§14.6.1b RO6) | Yes | Yes | Yes | No, until the pull closes (L9) | No, until the pull closes |
| [Verified — not in force] | From commencement only (§23 FR-LEG-008) | Pre-staged | Yes, with the commencement in the sentence | Yes, dated | Only with the commencement in the same sentence; never "compliant" (§23.1.3) | As customer-facing |
| [Verified — central sphere] | Central-sphere work locations only | Yes | Yes, labelled | Yes | Only with the sphere stated | As customer-facing |
| [Verified — negative, dated] | Never — a negative only removes a configuration | — | Yes, dated | — | Only in the "we are not aware of any … as of" form, cleared | As customer-facing |
| [Verified], bounded negative (N1–N3, §02.2) | Never as a positive rule; it may remove a configuration or hold a fence | — | Yes, with its bound | Yes, as an input with its bound | Only with its instrument, corpus and snapshot, or element and date, in the sentence (L-23), cleared | As customer-facing |
| [Verified — claim posture] or declared capability | Not a rule source | — | Yes, as "the vendor states" or "the documentation shows" | Yes, as a competitive input | Only as "the vendor states", dated and cleared (§21) | As customer-facing |
| [Verified — archived] | Not a rule source | — | Yes, as a historical price | As a historical point only, never a current price | Only as a withdrawn price with its archive date | As customer-facing |
| [Verified — dated] self-claim | Not a rule source | — | Yes, with its date | Yes, with its date | Yes, with its date, cleared | Yes, with its date |
| [Verified] as to effect, instrument owed | Yes | Yes | Yes | Yes | The rate yes; the instrument never cited | The rate yes; no instrument citation |
| [Verified] as to a superseded revision | Not a rule source | — | Yes, naming the revision read | No | No, until the current revision is read | No |
| [Verified], re-verify overdue | Unchanged (AC-EVR-11) | Unchanged | Yes, flagged stale | No | No | No |
| Any row last touched in r1 or r2 and not re-checked | As its grade allows | As its grade allows | Yes, with the ~70–75% prior | No | No | No — re-verify it or strip it |
| [Hypothesis] with a live kill criterion | Never | Yes (§14.6.1b RO5) | Yes, with its kill criterion | No | No | Only as a labelled hypothesis with its V-item |
| Ungraded — open, blocked or undone | No; the fail-safe applies | No | Yes, as an open item | No | No | Only as an open item |
| [Killed] | Never; a regression guard | Never | Only framed as dead | Never | Never | Never |
| A derived figure | As its weakest input | As its weakest input | As its weakest input, with its derivation | As its weakest input | As its weakest input, with its basis named | As its weakest input |

**Why the external column is stricter than the customer column in one row.** An external excerpt may not carry a round-one or round-two row that has not been re-checked, even where the row's grade would allow it. FR-LEG-004 keeps the ~70–75% prior internal and bars it as a global disclaimer, because a reliability discount printed over an unspecified subset is not a defence to a statement a reader relied on, and it is quotable in diligence (r5 review-counsel). The register's answer is mechanical: the release gate lists every such row in the excerpt, and each is re-checked at source or removed.

#### Worked example — an external excerpt of the market-sizing argument

An investor asks for §04's sizing page. The release gate walks each row the page cites:

| Row | State | Gate decision | Why |
| --- | --- | --- | --- |
| EV-001 — 7,66,254 contributing establishments | [Verified]; last contact r2 | Re-check first | Round-two row not re-checked. Cheap: re-read the EPFO annual report table |
| EV-005 — ₹2,100–3,900 Cr real spend | Inputs [Verified], r2; gross-up modelled | Ship ₹1,374 Cr as the verified floor after the filings are re-pulled; ship the range only labelled "modelled", with its 35–65% share assumption stated | Weakest-input rule; the top of the range is its softest part (worked grading D) |
| EV-016 / EV-091 — greytHR share | [Verified — dated] | Ship with the capture date and the unit mismatch stated (§02.15) | A moving self-claim |
| EV-006 — our ₹80–150 target | [Hypothesis] | Ship only as a labelled hypothesis with §20 V-01 and V-03 | Barred from models; allowed as a labelled open question |
| EV-K01, EV-K04 — the 6 crore and $23.32bn figures | [Killed] | Strip; if the page explains why they are wrong, frame them as dead | Contraband on every surface |

The excerpt that leaves carries no paragraph discounting the whole document. It carries one re-checked denominator, one labelled model, one dated share and one labelled hypothesis.

**AC-EVR-21 · The release gate reads the matrix.** *Given* an artefact bound for a surface in the matrix, *when* it cites a row, *then* the gate evaluates the row's current state against that surface's column; a "No" blocks release and names the row, and a "with …" condition is checked in the same sentence as the citation.

**AC-EVR-22 · External excerpts carry no global discount.** *Given* an excerpt built under FR-LEG-004, *when* it contains a row last touched in r1 or r2 and not re-checked, *then* the build fails until each such row is re-checked at source or removed; a paragraph discounting the document as a whole does not satisfy the gate.

### 02.15 Derived figures — arithmetic provenance

Much of what this PRD quotes is not read from a source but computed from what was read: a per-employee price is a block price divided by a headcount, a share is a vendor's claim over a government count, an error is one figure over another. A derived figure is only as good as its inputs, and it can fail in ways no input fails — by choosing the wrong input, the wrong basis or the wrong denominator. The `Derivation` record (§02.12) exists so the choice is written down where a re-checker can see it.

#### The rules

1. **The grade is computed.** A derived figure takes the weakest grade and every qualifier of its inputs (ER4). Arithmetic on an archived card is archived; arithmetic on a dated self-claim is dated.
2. **The basis is named.** Where an input has alternatives — the live floor or the archived card, annual or monthly billing, the billed block or the actual headcount — the derivation names the one used. A figure quoted without it fails L-12.
3. **The denominator is stated in words.** Registered or contributing; billed seats or users; filed entities or the whole market (§02.5 denominator hygiene).
4. **Precision is kept; display is rounded.** The record keeps full precision and computes on it; a displayed figure states its rounding. No statutory rounding rule is borrowed for a commercial figure, or the reverse.
5. **Any input change re-derives.** A new capture of any input re-evaluates every derivation that uses it; an output that changes becomes a new version, with the old one kept.
6. **Arithmetic explains nothing about intent.** A derived figure that happens to equal a banned or disputed number says nothing about where that number came from.

#### Worked derivation 1 — the seat floor at 20 and 50 employees

Every priced vendor in the set bills a 50-employee minimum block (EV-026; Keka's archived card, 100), so the effective price per actual employee below the block is the block price divided by the headcount. Round five computed these from verified block prices and labelled them as its own arithmetic (r5/03 finding 30; EV-027). The derivation records make the basis and denominator explicit:

| Vendor and tier | Block price and terms (r5/03) | Per employee at 50 | Per employee at 20 | Basis the derivation must name |
| --- | --- | --- | --- | --- |
| Qandle FOUNDATION | ₹2,450 a month billed annually, up to 50; ₹49 per additional | ₹49.00 | ₹122.50 | Annual billing (monthly billing is ₹2,950 + ₹59) |
| greytHR Essential | ₹2,495 a month including 50; ₹45 per additional | ₹49.90 | ₹124.75 | — |
| Pocket HRMS Standard | ₹2,995 a month billed annually for 50; ₹60 per additional | ₹59.90 | ₹149.75 | Annual billing |
| Zimyo Basic | ₹80 per user a month, minimum billing 50 users | ₹80.00 | ₹200.00 | The minimum-billing term implies a ₹4,000 floor |
| HROne Basic | ₹4,950 a month for 50 users; ₹99 per additional | ₹99.00 | ₹247.50 | — |
| Keka, live | "from ₹6,999 per month" (EV-023); seat count inside the block unknown | ₹139.98 | ₹349.95 | Live floor, and the assumption that it covers the headcount |
| Keka FOUNDATION, archived | ₹9,999 a month up to 100; ₹90 per additional (EV-022) | ₹199.98 | — | Archived card, withdrawn — historical only |

The derivation for greytHR at 20 employees, as the store holds it: formula `block_price ÷ headcount`; inputs — greytHR Essential block ₹2,495 (EV-027, captured 5 September 2026), 50-seat minimum (EV-026), headcount 20 (the scenario); arithmetic ₹2,495 ÷ 20 = ₹124.75; annual cost ₹2,495 × 12 = ₹29,940 (EV-027's ACV); output grade [Verified], dated 5 September 2026; denominator — employees on the customer's payroll, not seats bought.

Two seams the table exposes. Keka's live-floor figures are conditional: the signup path is a demo form with no seat field, and ₹6,999 ÷ ₹90 = 77.8, which matches no round block size (r5/03). The arithmetic is exact, and its applicability rests on an unknown, so a customer-facing statement uses "from ₹6,999 per month" (EV-023) rather than a per-employee figure. And the at-20 column is the structural point the pricing sections carry (§18, §21): below the block, every vendor's effective price is at least 2.5 times its at-50 figure, because 50 ÷ 20 = 2.5.

#### Worked derivation 2 — the Keka archived card above its block, and the collision case

On the archived FOUNDATION card (EV-022) the effective price above the 100-employee block is `(₹9,999 + (headcount − 100) × ₹90) ÷ headcount`:

| Headcount | Monthly price | Per employee | Grade |
| --- | --- | --- | --- |
| 100 | ₹9,999 | ₹99.99 | [Verified — archived]: historical |
| 150 | ₹9,999 + 50 × ₹90 = ₹14,499 | ₹96.66 | [Verified — archived]: historical |

§20.4 bans a "~₹99 Keka price point" whose provenance is unresolved and which is not one of Keka's own published figures (§02.7). The ₹99.99 above is a different claim: a historical derivation on a withdrawn card, with its basis named. A guard keyed on the value would block the legitimate derivation and could pass a reworded version of the banned claim ("Keka costs about a hundred rupees an employee"); a guard keyed on the claim passes the first and blocks the second (ER6; TS-05, TS-06). Nothing here explains where the banned figure came from, and the register does not speculate (rule 6).

#### Worked derivation 3 — a share whose units do not match

greytHR's current claim of "30,000+ companies" (EV-091) over 7,66,254 contributing EPFO establishments (EV-001) gives 30,000 ÷ 7,66,254 = 3.9%; the earlier 34,000 capture gives 4.4% (EV-016). The derivation records three things a reader would otherwise lose. The numerator counts companies and the denominator counts contributing establishments, so the result is a ceiling on greytHR's share of establishments, not an estimate of it. "30,000+" is the floor of the vendor's claim, so the result is the floor of the ceiling. And the denominator is the contributing count, not the registered count, which is about 3.2 times larger (24,18,266 ÷ 7,66,254 = 3.16) and would shrink every share by the same factor — the registered count as a base is banned (§20.4).

The same care applies to vendor-to-vendor ratios. greytHR's 30,000+ is 2.4 times Keka's "12,500+" on keka.com/pricing, or 3.0 times Keka's "10,000+" on keka.com/signup — two figures Keka displayed on the same day (r5/03). A ratio of two unaudited self-claims is itself claim posture, and its derivation names the page it used.

#### Worked derivation 4 — the FX correction and a rounding trap

The kill of ₹83.3 per US dollar (EV-K02) is an arithmetic fact about every figure converted from a US-dollar price. At the corrected ₹94.43 (EV-089), a price of P dollars is ₹94.43 × P; at the killed rate it was ₹83.3 × P. The killed figure is 83.3 ÷ 94.43 = 88.2% of the corrected one, 11.8% too low; the kill row's "wrong by 13.4%" is the same error measured from the killed rate (94.43 ÷ 83.3 = 1.134). A ratio of two dollar prices, P₁ ÷ P₂, is identical at both rates — which is why the 52.7× spread survived the correction and every absolute did not (EV-007).

Rule 4 has a live example in the same numbers. On round two's workload estimate (the EV-008 token counts), the dearest and cheapest models cost $0.3982 and $0.00755 (r2/03): 0.3982 ÷ 0.00755 = 52.74. Converted at ₹94.43 they display as ₹37.60 and ₹0.71, and dividing the displays gives 52.96. The difference is rounding in the cheaper figure, not information; a derivation that computes on displayed values reports a spread the evidence does not support.

#### Worked derivation 5 — a gross-up whose correction moved upward

EV-005's range is `filed base ÷ assumed share of spend`. Round two's verifier removed an invalid derate on one vendor and added three newly resolved filers, moving the filed base from ₹968.51 Cr to ₹1,374.12 Cr (r2/09). At the assumed 35–65% share the range became ₹1,374.12 ÷ 0.65 = ₹2,114 Cr to ₹1,374.12 ÷ 0.35 = ₹3,926 Cr, up from ₹1,490–2,767 Cr on the old base; at a 25% share the same arithmetic gives ₹5,496 Cr. Two things follow for the record. The share band — a modelling assumption — sets the top of the range more than any filing does, so the output is modelled whatever the inputs' grade (worked grading D). And this correction moved a figure *up*, for a sound reason: the direction finding of §02.3 is about round-one claims retracted in round two, not about every correction, and a correction is graded on its evidence, never on its direction (§02.16).

#### Worked derivation 6 — a comparison the record refuses

The arithmetic that looks most useful in a competitive deck is the one this register will not write. Keka's live small-companies page gives "from ₹6,999 per month" (EV-023); its withdrawn card gave FOUNDATION at ₹9,999 a month up to 100 employees (EV-022). The obvious derivation is a price cut: `(₹9,999 − ₹6,999) ÷ ₹9,999 = 30.0%`. The arithmetic is exact and the output is refused, for three reasons the record states rather than leaves to the reader:

| Test | Result |
| --- | --- |
| Do the inputs share a basis? | No. The archived figure covers a stated 100-employee block; the live floor's seat coverage is unknown, and ₹6,999 ÷ ₹90 = 77.8 matches no round block size (r5/03; derivation 1). The two prices are not prices of the same thing |
| Are the qualifiers compatible? | No. `archived` excludes `dated` (§02.2 compatibility): one input is frozen at its archive date, the other moves with the page. An output cannot be both |
| What does the sentence assert? | A change in a named competitor's pricing over time — a competitor claim needing §21 clearance, a capture date and the executed-or-read note (L-11), none of which the arithmetic supplies |

The record therefore holds `status = Refused`, `reason = basis mismatch: block size unknown on the live input`, and the unblocking condition: a capture of the live card stating the seats its floor includes. What may be said meanwhile is the pair of captures themselves — "from ₹6,999 per month, captured 5 September 2026" beside "₹9,999 up to 100 employees on the withdrawn card, archived 1 August 2024" — which is two dated facts and no inference. A refusal is recorded, not omitted, so that the next person to want the 30% figure finds the reason instead of the gap.

#### Worked derivation 7 — an input's rounding bounds the output, and a segment that will not split

Ramco's FY2025-26 HR & Payroll revenue is ₹2,976.15 Mn, up 30.8% (EV-033). The prior year inverts from those two figures: `₹2,976.15 Mn ÷ 1.308 = ₹2,275.34 Mn`, and the increment `₹2,976.15 − ₹2,275.34 = ₹700.81 Mn` checks back at `700.81 ÷ 2,275.34 = 30.8%`.

Rule 4 then bites in the direction people forget. The *input* is rounded: "30.8%" stands for anything from 30.75% to 30.85%, so the inverted prior year is only known to `₹2,976.15 ÷ 1.3085 = ₹2,274.5 Mn` through `₹2,976.15 ÷ 1.3075 = ₹2,276.1 Mn` — a band about ₹1.6 Mn wide. The record keeps the point estimate at full precision and *displays* the band, because a figure quoted as ₹2,275.34 Mn claims a precision the growth rate never carried. Precision is kept, display is rounded — and where an input is itself a rounded figure, the display is a band, not a decimal.

The refusal on the same subject is more important than the derivation. EV-092 gives Ramco's India revenue across all business units as ₹1,329.96 Mn and the standalone Indian entity's India-geography revenue as ₹1,127.51 Mn. Two arithmetic operations are available and only one is legitimate:

| Proposed figure | Arithmetic | Verdict |
| --- | --- | --- |
| The standalone entity's India-geography revenue against India revenue across all business units | `₹1,127.51 ÷ ₹1,329.96 = 84.8%` | Written, with both scopes spelled out in the same sentence (rule 3), and labelled a comparison of two disclosures rather than a share: the register does not assert that a standalone-entity figure and an all-business-unit figure rest on the same consolidation basis, and the row does not say so |
| "Ramco's India HR & Payroll revenue" as a share of the HR & Payroll line | `₹1,329.96 ÷ ₹2,976.15 = 44.7%` | **Refused.** The numerator is all business units in India; the denominator is one business line worldwide. EV-033 records a single Ind AS 108 segment, so India HR revenue is *not separable* — the quotient is a number that looks like a share and is not one |

The unblocking condition is a segment disclosure that separates the HR line by geography; until one exists, Ramco stays a calibration row rather than a comparable (EV-033, EV-092). This is the denominator-hygiene rule (§02.5) applied to a filed financial statement, where the contamination is scope rather than population.

#### Worked derivation 8 — the seat-floor gap, and why its output is modelled

The at-20 column of derivation 1 states what a 20-person employer *pays*. The figure a positioning argument wants is what that employer pays *above* what the same vendor's own unit rate would imply — and that figure is modelled, because no vendor offers the unit rate below its block (EV-026). greytHR Essential, at ₹2,495 a month including 50 seats, worked two ways:

| Basis chosen | Counterfactual monthly charge for 20 employees | Gap per month | Gap per year |
| --- | --- | --- | --- |
| The at-50 unit rate derived from the block — ₹49.90 (EV-027) | `20 × ₹49.90 = ₹998` | `₹2,495 − ₹998 = ₹1,497` | `₹1,497 × 12 = ₹17,964` |
| The vendor's own stated additional-seat rate — ₹45 (EV-027) | `20 × ₹45 = ₹900` | `₹2,495 − ₹900 = ₹1,595` | `₹1,595 × 12 = ₹19,140` |

Two defensible bases, ₹1,176 a year apart, from one set of verified inputs. That spread is the whole reason rule 2 exists: a derivation quoted without its basis is not a weaker fact, it is an ambiguous one. The record names the basis, and the annual figure reconciles to the row it came from — `₹2,495 × 12 = ₹29,940`, EV-027's ACV, less `₹998 × 12 = ₹11,976`, gives the same ₹17,964.

The grade is the part that matters. The block price and the seat floor are [Verified]; the unit rate applied below the block is an assumption the vendor does not make, so ER4 computes the output as modelled. What follows:

- It may size the wedge for architecture and roadmap purposes — a billing engine that charges actual headcount from employee one must exist in v1 or not at all — and §18 owns whatever pricing conclusion is drawn from it.
- It may not enter a financial model (§02.14), and it may not be stated as a fact about the vendor. "greytHR overcharges a 20-person company by ₹17,964 a year" asserts a counterfactual as the vendor's conduct; the licensed sentence is "a 20-person employer pays ₹2,495 a month, the same as a 50-person employer, because the block is 50 (EV-026, EV-027, captured 5 September 2026)" — which needs no counterfactual at all and is the stronger claim.

#### Worked derivation 9 — half a rupee in a return that must foot

At the ₹15,000 wage ceiling the employer's 12% splits 8.33% to EPS and 3.67% to EPF (§02.8 edge cases): `₹15,000 × 8.33% = ₹1,249.50` and `₹15,000 × 3.67% = ₹550.50`, which sum to `₹1,800.00 = ₹15,000 × 12%`. EPFO's own Help File sample line carries 1,250 for that input — one case, not a rounding rule (worked grading I). Take the sample at face value and the 3.67% leg becomes `₹1,800 − ₹1,250 = ₹550`.

The derivation's output is not a rounding convention — the register has no row for one, and `epf.rounding_method` has no shipped default (§20.13). Its output is an exposure, and the exposure is shaped in a way that matters:

| Quantity | Value | Note |
| --- | --- | --- |
| Difference on the EPS field, per member at or above the ceiling | `₹1,250.00 − ₹1,249.50 = ₹0.50` a month | Applies to members at or above the ceiling, not to every employee |
| The same difference on the EPF field | `₹550.00 − ₹550.50 = −₹0.50` a month | Equal and opposite |
| Effect on the employer's 12% total | `₹0.00` | The rupee moves *between* two fields of one return |
| At 100 such members | `₹50` a month, `₹600` a year | The band this product sells into runs to 200 |

The reason this is a derivation and not a footnote: the ECR carries EPS Wages, Employer EPS Contribution and Employer PF Contribution as separate fields of an eleven-field line (EV-035), and an approved return can never be cancelled (EV-036). A convention that leaves the *total* right and the *split* wrong produces a return that reconciles at the challan and misallocates at the member, which is the class of error the member discovers years later at a pension claim. It is also why IDR-03 blocks publication of the cap value rather than being carried as a comment: the engine must either resolve ₹1,249.50 from the percentage or resolve ₹1,250 from a captured rule, and it may not store 1,250 as a constant on the strength of a sample line (§02.20 worked request, step 5).

#### Refusal cases — derivations the register declines to write

Each row below is a figure someone will ask for. The record holds the refusal with its reason and its unblocking condition, so the ask is answered once rather than re-argued.

| # | Figure asked for | Arithmetic that would produce it | Refusal reason | What would unblock it |
| --- | --- | --- | --- | --- |
| DR1 | Keka's price cut since 2024 | `(9,999 − 6,999) ÷ 9,999 = 30.0%` | Basis mismatch — the live block size is unknown (derivation 6) | A live card stating its included seats |
| DR2 | Ramco's India HR & Payroll revenue | `1,329.96 ÷ 2,976.15 = 44.7%` | Scope mismatch — a single Ind AS 108 segment is not separable by geography (derivation 7) | A segment disclosure splitting the HR line by geography |
| DR3 | A serviceable market from our own price | Our PEPM × 7,66,254 contributing establishments × an assumed headcount | Weakest input is [Hypothesis] (EV-006) and the shape is the one EV-K04 was killed for; the output would read as a TAM | §20 V-01 and V-03 reporting a realised price, and then only as a labelled model |
| DR4 | A vendor's customer count, reconciled | `(12,500 + 10,000) ÷ 2 = 11,250` | Two self-claims on one vendor's pages on one day; C7 keeps both and AC-EVR-27 forbids any value between them | Nothing — an average of two conflicting self-claims is never written |
| DR5 | A blended software-plus-attach PEPM | Software PEPM + attach PEPM | BE-02 and EV-K07: attach is modelled as a separate line and never blended | Nothing at the blend; each line may be modelled on its own |
| DR6 | A gross margin for the AI layer | `(price − inference cost) ÷ price` | EV-K13 and BE-08 — three of the four COGS lines are unsized (EV-088) | Sizing the supervised-filing and curation lines |
| DR7 | The model spread, from rupee displays | `₹37.60 ÷ ₹0.71 = 52.96` | Computation on displayed, rounded values; the supported figure is 52.74 from the USD prices (derivation 4) | Nothing — the ratio is computed on full-precision inputs |
| DR8 | Any vendor share of the market | A vendor claim ÷ 24,18,266 registered establishments | BE-01 — the registered count is banned as a base; the contributing count gives a ceiling, not a share (derivation 3) | Nothing for a share; the ceiling is already written |

**AC-EVR-49 · A refusal is a record, not a silence.** *Given* a derivation proposed and declined, *when* the register is queried by `basis` for that figure, *then* it returns the refusal with its reason and its unblocking condition rather than "not found"; and *when* the same figure is later proposed again with no new capture, *then* it is refused against the stored record (TS-70, TS-71).

#### Edge cases the derivation record must carry

| Situation | Case in this corpus | What the record holds |
| --- | --- | --- |
| The block size is unknown | Keka's ₹6,999 live floor (r5/03) | The coverage assumption as an input; the output conditional on it |
| An input page contradicts itself on one day | Keka's 12,500+ and 10,000+ (r5/03) | The page used; both captures kept |
| A numerator with a "+" | greytHR's "30,000+ companies" | That the result is a floor of the claim |
| Numerator and denominator in different units | Companies over contributing establishments | Both units in words; the result named a ceiling |
| Displayed inputs are rounded | ₹37.60 ÷ ₹0.71 | Computation on full-precision inputs only |
| An input from a withdrawn card | Keka's archived card | The archive date; the output historical |
| A block implied by a minimum-billing term | Zimyo's ₹80 × 50-user minimum | The term that implies it |
| An input share band that is itself an assumption | EV-005's 35–65% | The band as a modelled input; the output modelled |

**AC-EVR-23 · Derived figures reproduce.** *Given* any derived figure in the PRD, *when* its derivation is re-evaluated from the cited rows at full precision, *then* it reproduces the displayed value under the stated rounding; a figure that does not reproduce fails assembly.

**AC-EVR-24 · The basis travels with the figure.** *Given* ₹139.98 or ₹199.98 (EV-027), *when* either is quoted outside the PRD, *then* the card it rests on — the live floor or the archived card — and the capture date appear in the same sentence.

**AC-EVR-25 · Guards match claims.** *Given* the §20.4 "~₹99 Keka price point" entry and fixtures TS-05 and TS-06, *when* the regression guard runs, *then* TS-05 passes and TS-06 blocks.

### 02.16 Conflict rules — when two readings disagree

The corrections ledger settles two conflicts by fiat: where it and the PRD disagree, the ledger wins; where two research rounds disagree, the later round wins (r5 > r4 > r3 > r2 > r1). Applied mechanically, the second rule would have re-imported the single largest error in the corpus (§02.4). The rules below say when "later wins" holds, when it does not, and what the register writes in each case. Each is cited by number elsewhere in this section (C3 in §02.2 and TS-13; C4 in worked grading F and TS-14).

| # | Conflict | Rule | Case in this corpus | What the register writes |
| --- | --- | --- | --- | --- |
| C1 | The corrections ledger against the PRD text or a research file | The ledger wins. The displaced statement stays readable where it was made, marked [Reversed] or framed as killed | The 144-hour cap graded Verified (K-04) and DPDP s.7(i) stated as current law (K-03), both fixed in place in EV-012 and EV-018 | A kill row (EV-K15, EV-K14) and a [Reversed]-register row (rows 3 and 4) |
| C2 | Two rounds read the same source differently | The later round wins *if it went back to the source* with a method at least as strong as the earlier one — a primary read, a re-run capture, a full enumeration. A later round that only cites a secondary summary opens a re-check; it does not displace an earlier primary read | Keka pricing: rounds one to four graded it blocked; round five's raw fetch captured it (EV-021, EV-K21). SEBI FAQ Q47/Q50: an earlier retraction was wrong, and round five's read of the FAQ restored it (EV-085). The arrear ECR: round three reported "a separate arrear ECR with 8 data fields" from search results and flagged it unverified (r3/02); round five enumerated all 1,869 circular PDFs and found no published arrear layout (r5/02, EV-043) | The later reading's capture, and a grading event naming the earlier reading it displaces |
| C3 | A later reading omits an amending instrument that an earlier reading cited | The earlier reading governs until a reading engages the amending instrument. The later one is recorded as *not adopted*, never as a re-grade | Round five read S.O. 5319(E) verbatim without S.O. 5936(E) and concluded there is no one-year sunset (r5/04; §02.4) | EV-002 unchanged; the not-adopted reading logged against it; the definitive read owed under §20 V-08 (ER5 refuses the re-grade, TS-13) |
| C4 | Two dimensions of one round disagree | Neither governs. The claim sits at the lower grade, and any build it drives is fenced until a primary read settles it; where the disagreement is about law, it becomes a counsel item instead of a grade | The ECR layout in round three (worked grading F). The DPDP r.8(3) retention floor and processor penalty exposure, stated at high confidence in one round-four dimension and as counsel questions in another (r4 critic) | For a fact: the lower grade and a fence (TS-14). For law: Part D-3 and D-9 entries in the §23 counsel register, and no grade |
| C5 | A review contradicts a research file or this PRD | A review is a lead, not evidence. It can remove support from a statement — the PRD's own over-statement of legal effect is killed on counsel's reading — but it adds support only through a new capture | Counsel's review killed "replay satisfies RBI's right to audit" (EV-K32); the engineering review killed universal bitemporality (EV-K35). The CFO review found §02's and §16's price anchors inconsistent; round five's rate cards settled which one was wrong (r5 synthesis, item 3) | A kill row where a review removes support; otherwise a re-check task, and the grade moves only on the capture it produces |
| C6 | A correction moves a figure in the flattering direction | Graded on its evidence, never on its direction. Direction is a portfolio statistic (§02.3), not a test applied to one claim | Round two's verifier moved the filed base from ₹968.51 Cr to ₹1,374.12 Cr and the market range up with it (worked derivation 5); round five found greytHR, not Qandle, the floor on monthly billing (r5/03 finding 30) | The correction as an ordinary grading event; no haircut applied to it for being upward |
| C7 | A vendor contradicts itself | Both captures are kept. Any figure used names the page and the date; neither page is "the real one" | Keka shows 12,500+ and 10,000+ customers on two live pages on one day (r5/03); two live Keka pages contradict each other on setup fees (EV-025); greytHR showed 30,000+, 33,000+ and 34,000+ across its own pages on one day (r1/08) | Two captures on one row, and the qualifier `dated` (§02.15 edge cases) |
| C8 | A research file's own confidence label disagrees with the register's rules | The label is a lead. The register grades on the capture — host, method, scope read — whatever the label says | r5/05 labels its POSH, HIV Act and judgment findings [high] while reading them on a third-party legal database; r4/02 labels G.S.R. 843(E) as verified on an official host, while the ledger keeps it mirror | The register's grade and qualifiers; the research label kept in `research_ref` as context |
| C9 | The ledger's grade and the register's qualifier rules point different ways | The ledger wins on the grade (C1). The register writes the qualifiers its rules require — which, for a mirror read, Part A-1 itself mandates | The host audit: the ledger grades EV-056, EV-057, EV-076–EV-078, EV-080, EV-082 and EV-083 [Verified]; the §02.5 host rule adds `mirror` (§02.7) | The ledger's grade with the register's qualifier, written as an L19 event |

Three consequences follow. First, "later round wins" is a rule about *readings of the law and of sources*, not about rounds: C2's method condition and C3's amending-instrument condition are what make it safe. Second, C4 and C5 keep the counsel register and the evidence register apart. A disagreement about what a statute means is never resolved by grading it; it is logged as a Part D item with an owner (§23), and the build proceeds on the machinery both readings require. Third, C8 and C9 keep three authorities distinct — the research file's confidence label, the ledger's grade and the register's capture rules — so that a finding labelled high, graded [Verified] and read on a legal database is still recorded as read on a legal database.

**AC-EVR-26 · A later reading must engage the instrument chain.** *Given* a proposed re-grade whose capture is from a later round than the row's current capture, *when* the base instrument has an `AmendmentLink` that the new capture does not cite, *then* the re-grade is refused under C3, the reading is logged as not adopted against the row, and the row's grade is unchanged.

**AC-EVR-27 · Conflicts are written, not averaged.** *Given* two captures for one row that support different values, *when* neither C2 nor C3 resolves them, *then* the row takes the lower grade with both captures attached; any rule version citing it is held at `warn_only` or fenced (§02.10 contract), and no value between the two is ever written.

### 02.17 One-way doors and the evidence beneath them

The round-five reviews found that the reliability prior could not be applied where it mattered most: no marker said which round a claim came from, so a reader meeting a [Verified] claim under a design decision that cannot be reversed had no way to know whether it carried the discount (r5 review-engineer; r5 synthesis, item 17). §02.7's round-of-origin table supplies the field. This table applies it to the decisions: for each one-way door in this PRD (labelled W1–W10, to keep them distinct from the Part D counsel items), the rows it rests on, when their source was last read, and what a flip in any of them would do.

| # | One-way door (owning sections) | Rows it rests on | Last source contact | ~70–75% prior applies? | If a row flips | Re-check owed |
| --- | --- | --- | --- | --- | --- | --- |
| W1 | Jurisdiction on the work location — state, sphere and Code-regime commencement date — not on the employee (Part E-5; §14, §15) | EV-057 (counting unit and sphere as schema fields); EV-053 (form numbers per state); EV-014, EV-015 (per-state PT) | r5 for EV-053; r3 for EV-057, whose round-five corrections came from reviews; r2 for EV-014 | No for the structural rows. EV-014 carries it, but only its values depend on it | A changed value is a new rule version. The structure fails only if an obligation were found to attach to something other than the work location, and no register row carries such a finding | EV-014: retrieve DPAL 08 SHASANA 2025 (§20 V-09) |
| W2 | The filing generated for a registration over a period, with an unbroken per-establishment filing ledger (Part E-10; §08, §14) | EV-035 (file content); EV-036–EV-038 (lifecycle, return types, chronological filing); EV-043 (arrear layout unpublished) | r5 | No | EV-035's corrigendum search is owed; the line terminator and encoding are unknown (§20 V-23). Neither touches the registration-over-period structure | Corrigendum search before the ECR format version publishes (§22 AC-RULE-002.3) |
| W3 | Bitemporality scoped by entity class, with erasable classes (Part E-2; §14, §15) | EV-K35; EV-054 (central-sphere retention); EV-068 (reg 6(5) retention ceiling); EV-060 (r.5(1) written consent); EV-010 and EV-002 (old rule versions must stay queryable) | r5 for EV-054 and EV-K35; r4 for EV-060 and EV-068; r3 for EV-010; EV-002 contested (C3) | EV-002 is contested rather than discounted; the design keeps old rule versions under either reading | A longer state-sphere retention period is configuration (`retention.state.<state>.<form>`, Part D-11), not a change of class | EV-002 under §20 V-08; state periods from counsel |
| W4 | PF liability on arrears dated from the disbursal date, supplied to the engine as an evaluation-context input (Part E-3, E-9; §08) | No register row. r5/02 records EPFO FAQ Q15's rule that the arrear disbursal date sets the due month; r3/02 reported the same from search results, flagged unverified | r5 | No | A different due-month rule changes an input's meaning, not the engine's purity. The arrear file itself stays fenced (EV-043) | An ID is requested at the next ledger revision (identifier rule 1); until then cite r5/02 |
| W5 | Aadhaar held in a separate, separately encrypted and access-controlled store behind an opaque token (Part E-6; §07, §14) | EV-067, EV-068 (reg 6(2) security, 6(4) encrypted transmission), EV-069, EV-070 | r4 | No | Counsel's answers to Part D-5, D-6, D-8 and D-15 can add obligations to this store; none of the rows supports removing it | Counsel register items (§23) |
| W6 | The biometric template as its own entity, separate from the attendance event, with no image column or bucket (Part E-6; §09, §14) | EV-055 (Form IX per-day IN and OUT); EV-060 (biometric information is sensitive under SPDI r.3); EV-071; EV-072 | r4, r5 | No | EV-072 is a dated negative (L11 on any law found). The attendance record survives template destruction either way | Biannual search under EV-072; Part D-2 and D-10 with counsel |
| W7 | A redaction chokepoint on every outbound model call, with LLM logs kept in India (Part E-7; §12, §15) | EV-062 (180 days of ICT logs within India); EV-060 (r.7 cross-border transfer); EV-085–EV-087 (sectoral overlays) | r4, r5 | No | EV-087 is mirror-read and must be pulled before any RBI-facing commitment; the chokepoint does not depend on the pull | EV-087 mirror pull (§02.7) |
| W8 | Consent as a versioned first-class entity, with two consent regimes running concurrently across the DPDP boundary (Part E-6, E-12; §07) | EV-058 (mirror); EV-060 (provenance caveat); EV-018 (inherits the mirror) | r4, r5 | No | The switch date is rule data arming on the earlier reading (§23 FR-LEG-008), so 13 versus 14 May, or a gazetted compression (§20 V-27), changes data, not structure | EV-058 mirror pull; EV-060 primary host |
| W9 | The six-hour incident pipeline with an AI/ML incident class (Part E-8; §17) | EV-062 (six hours; Annexure I item xx) | r4; the CERT-In six-hour clause was also matched verbatim in round two (r2/06) | No | — | On any CERT-In direction |
| W10 | ISO 27001 started at month zero (§05, §17) | No register row. The one-year certificate-holding requirement is the Indian Bank RFP's own text; the 3–6-month acquisition estimate rests on compliance-consultancy pages only (r2/06). EV-085 limits ISO 27001 as a mandate to MIIs and Qualified REs under CSCRF | r2 | **Yes** — a round-two reading not re-checked at source | If the holding requirement is misread, the month-zero start loses its reason and becomes a spend decision like any other | Re-read the RFP clause and request an ID at the next ledger revision; heads the one-way-door band of the §02.18 backlog |

The pattern is the finding. Nine of the ten doors rest on evidence read at source in rounds three to five — W1's round-two row feeds values, not the structure — and in most of them a flip changes data or adds an obligation rather than reversing the structure. One — W10 — rests on a round-two reading that has not been re-checked, and it is the one door that commits spend at month zero. That is where the reliability prior bites, and why it heads the one-way-door band of the re-check backlog (§02.18) rather than sitting in a global disclaimer.

The host audit (§02.7) touched one door. W1 rests on EV-057, now marked as read through a handbook and a third-party copy. The door stands: the design needs counting unit and sphere as fields whatever the thresholds' values turn out to be, and a mirror read restricts what may be said about a threshold, not the structure that holds it. W8's EV-058 was already mirror-read and already changes data, not structure.

The rule this table enforces: **a one-way door may rest only on rows re-checked at source in rounds three to five, or on rows whose flip changes configuration rather than structure.** A door that meets neither condition is flagged on its decision record until the row is re-checked.

**AC-EVR-28 · One-way doors name their evidence.** *Given* a design decision recorded as a one-way door in any section, *when* the register lint runs, *then* the decision's rows are listed in this table; a door citing a row whose last source contact is r1 or r2 with no later re-check is reported, and that row is placed at the head of the one-way-door band of the §02.18 backlog.

### 02.18 Register operations — the re-check backlog, owners and parameters

The register only stays true if someone works it. This subsection is the operating specification: what is owed, in what order, by whom, and the parameters the register's own tooling needs.

#### The re-check backlog

Ordering rule, in four bands: rows that gate a dated filing, a fail-safe or the publication of a rule version come first; then rows under a one-way door (§02.17); then rows that bar a customer-facing surface; then rows that feed plans only. Within a band, the earliest trigger first.

| Order | Row | What is owed | Blocks until done | Trigger or date | Owner role | Validation item |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | EV-004, EV-002 | Watch ESIC and MoLE for an ESI successor; read S.O. 5936(E) together with S.O. 2060(E) | ESI computation and filing for periods after the savings expiry; the EPF rule rows' re-verify | Before ~21 Nov 2026; escalation at ~1 Nov 2026 | Statutory | §20 V-08 |
| 2 | EV-046 (and EV-011) | Watch Protean's regular and correction downloads at every release | The Form 138 Q4 generator and Form 130 Part B generation | Every Protean release; before the 31 May 2027 Q4 due date (EV-049) | Statutory, with Engineering | §20 V-19 |
| 3 | Statutory rows EV-035–EV-044, EV-046–EV-058, EV-059, EV-060–EV-064, EV-065, EV-066, EV-067–EV-072, EV-074, EV-075, EV-076–EV-078, EV-079, EV-080, EV-081, EV-082, EV-085–EV-087 | The corrigendum or amendment search each row marks "owed" — fifteen searches, one per base instrument (below) | Publication of each dependent rule version (§22 AC-RULE-002.3) | When the §22 pipeline drafts the dependent version; the ECR group first | Statutory or Legal by class | — |
| 4 | IDR-03 (no row) | Re-read EPFO's EPS scheme page for the ₹1,250 cap at source and complete the ID request (worked grading I) | Publication of the EPS-cap value on the `eps_rate` rows (§14.6.2), and so the ECR generator's first publish | Before the ECR format version publishes | Statutory | — |
| 5 | W10 (no row) | Re-read the Indian Bank RFP holding clause; request an ID | The month-zero ISO 27001 spend's stated reason | Before the spend is committed | Research, with Finance | — |
| 6 | EV-058, EV-018 | Fetch G.S.R. 843(E) from egazette.gov.in and compare hashes (AC-EVR-13) | Any customer-facing commencement date, DPA clause or "DPDP-ready" statement | Before the first such statement; forced on or about 13 May 2027 | Legal | §20 V-27 |
| 7 | EV-060 | Locate G.S.R. 313(E) on a government host | Consent-notice text citing r.3 or r.5(1) | Before consent-notice copy ships (§07, §09) | Legal | §20 V-27 |
| 8 | EV-087 | Pull the RBI Directions from rbi.org.in | Any contract clause or residency commitment offered to an RBI-regulated customer | Before the first RBI-regulated prospect's security review | Legal | — |
| 9 | EV-056, EV-057, EV-076, EV-077, EV-078, EV-080, EV-082, EV-083 | Pull each instrument from a primary host and compare (§02.20 mirror pulls); for EV-057, read each Code section behind the thresholds | Customer-facing legal text resting on them — the RPwD Rule 3(2) scaffold and EOP text, POSH and threshold statements, complaint-officer workflows, any quotation of the two judgments | Before the FR-LEG-002 templates or threshold alerts that cite them are cleared | Legal; Statutory for EV-057 | — |
| 10 | EV-029 | Re-capture Kredily's and Zoho's pricing pages by dual capture (§02.5) | Use of the freemium-paywall finding outside the PRD (§21.6) | Before §21's claim is cleared for external use | Research | — |
| 11 | EV-003 | Re-read S.O. 3582(E) at the issuing host with a corrigendum search | Nothing today — the published `pf_rate` version keeps enforcing (AC-EVR-11); planning and customer uses once stale | On any PF-rate notification | Statutory | — |
| 12 | EV-014 | Retrieve DPAL 08 SHASANA 2025; run the corrigendum search | A citation of the Karnataka instrument (the rate itself is usable) | On retrieval; each Karnataka budget | Statutory | §20 V-09 |
| 13 | EV-013 | Bench-test the ADMS push receiver | Any contract annex relying on ADMS push (TS-25) | Before the receiver ships in v1 | Engineering | §20 V-11 |
| 14 | EV-012 (cap), EV-019 | Read the Wages and OSH Central Rules text for the cap; read the Income-tax Rules 2026 text for the perquisite rule | Any blocking OT rule; any rule-number citation for the perquisite | Before either is cited outside the PRD | Statutory | §20 V-17, V-18 |
| 15 | EV-017 | Retrieve ICAI's February 2020 revision and repeat the search | Use of the filing-not-payslip positioning outside the PRD | Fired — the revision is known to exist | Research | — |
| 16 | EV-001, EV-005, EV-020 | Re-read the EPFO annual report table; re-pull the eleven filings; re-read Naukri's investor figures | External excerpts that cite them (AC-EVR-22) | Before any external excerpt; next annual release | Research, with Finance | — |

The backlog is re-sorted at every ledger revision and whenever a trigger fires. An item leaves it only with a recorded outcome — `held`, `changed`, `killed`, `no_successor` — and a `blocked_fetch` outcome keeps it open with the failing tool recorded (§02.12).

#### Discharging the owed searches — one search per base instrument

Backlog item 3 covers 49 rows whose corrigendum or amendment search is owed. A search runs against an instrument, not a row, and one recorded search discharges every row resting on that instrument (CS2, §02.20). Grouped by base instrument the work is fifteen searches, not forty-nine. The order follows what the dependent rule versions block: the ECR group comes first because the generator is buildable now (EV-035) and its format version cannot leave drafting until the search is recorded (§22 AC-RULE-002.3).

| Order | Base instrument | Rows discharged | Search method (the §02.4 recipe, by source class) | What it unblocks |
| --- | --- | --- | --- | --- |
| 1 | EPFO User Manual ReECR v3.0, the portal Help File, the revamped-ECR circular of 26.09.2025 and its FAQ | EV-035–EV-044 (10) | Enumerate the EPFO circulars index after 26.09.2025 for any circular citing the revamp, and re-read the revamped-ECR page's document list — the index is enumerated, never sampled (§22 FR-RULE-004) | The ECR and part-payment format versions; the return-type and chronology rule rows (§06.2, §08) |
| 2 | Protean's regular and correction download pages and the RPU 1.2 file-format note | EV-046, EV-051, EV-052 (3), with EV-011 | The watched anchors and version strings, pinned by the downloaded artefact rather than the page label (r5/02 finding 35) | The Form 138 Q1–Q3 format version; the FVU routing by period |
| 3 | Income-tax Rules 2026 (G.S.R. 198(E), 20.03.2026) — r.219 and the form schedule; CBDT's form and section mapping and guidance notes | EV-047–EV-050 (4), with EV-019's rule text | A gazette window from 20.03.2026 for amendments to the Rules; CBDT notifications on the mapping | The Tax Year 2026-27 calendar rows; the dual-vocabulary resolver's mapping version |
| 4 | Wages, OSH, Social Security and IR Central Rules 2026 of 8 May 2026 | EV-053, EV-054, EV-055 (3) | MoLE's window on e-Gazette from 08.05.2026; each target state's rules as separate claims (G12) | `statutory_register_spec` and the retention rows (§14.6.2) |
| 5 | The Code sections behind the thresholds, the attendance record and recruitment on grounds of sex — OSH, IR and Wages Codes as commenced | EV-057, EV-072, EV-081 (3) | An amendment search on each Code, and the commencement chain S.O. 5319(E)–5322(E) as corrected by S.O. 5936(E) (§02.12 lineage); run with EV-057's pull | `threshold` rows; attendance-record rows |
| 6 | POSH Act 2013 | EV-056 (1) | An amendment search on the Act, run with the primary pull | POSH obligation rows (§06.1) |
| 7 | DPDP Act 2023; G.S.R. 843(E); DPDP Rules 2025 | EV-058, EV-059, EV-063, EV-064, EV-065, EV-066 (6), with EV-018 | MeitY's window on e-Gazette from 13.11.2025, including any gazetted compression (§20 V-27) | The commencement rule objects (§23 FR-LEG-008) |
| 8 | SPDI Rules 2011 (G.S.R. 313(E)) and IT Act 2000 s.43A | EV-060, EV-061 (2) | An amendment search on each; for G.S.R. 313(E), the primary-host location as well | Consent-notice templates (FR-LEG-002) |
| 9 | CERT-In Directions of 28.04.2022 | EV-062 (1) | CERT-In's own directions index | The incident-clock and log-residency rows (§17) |
| 10 | Aadhaar Act as amended; Sharing Regulations 2016; AOVR 2021 | EV-067–EV-071 (5) | UIDAI's gazetted-notifications index, which round four used (r4/04) | The Aadhaar store and design-review rules (FR-LEG-018) |
| 11 | G.S.R. 120(E) of 10.02.2026 | EV-074 (1) | MeitY's window from 10.02.2026 | No rule version — copy only |
| 12 | RPwD Act 2016 and RPwD Rules 2017 | EV-075–EV-079 (5) | Complete the partial search already recorded (below) | The Rule 3(2) scaffold; the EOP generator; the records register |
| 13 | Transgender Persons Act 2019, Rules 2020 and Amendment Act 2026 | EV-080 (1) | The Amendment's commencement notification and any amendment to the Rules | Version-flagged onboarding and EOP copy |
| 14 | HIV and AIDS Act 2017 | EV-082 (1) | An amendment search on the Act, with the primary pull | The Complaints Officer workflow |
| 15 | SEBI circular 2023/033, its FAQ and CSCRF; IRDAI ICS Guidelines 2023 and PPHI Regulations 2024; RBI IT Outsourcing Directions | EV-085, EV-086, EV-087 (3) | Each regulator's own circular index | The sectoral NFR profiles (§17) |

Two of the searches are partly done, and the register records the part done and the part owed rather than rounding either way (CS6, §02.20). For the RPwD Act, round five read the Jan Vishwas Act 2023's own gazette and found its schedule does not touch RPwD. For the RPwD Rules, it read the October 2024 amendment directly (it substitutes rules 17 and 18), took G.S.R. 361(E) of 2 July 2024 from secondary compilations (it inserts paragraphs into rule 15), and did not examine the 2019, 2020 and 2023 amendments individually (r5/05, verification notes and finding 41). Rules 3, 8, 9 and 14 look unamended on that reading; the search stays owed until the unexamined amendments are read.

**AC-EVR-38 · One search, every row.** *Given* a recorded search on a base instrument, *when* it is written, *then* every row whose capture cites that instrument loses `corrigendum_owed` in the same transaction, and every dependent rule version's citation records the same search date; a row left marked owed after its instrument's search is recorded fails the daily lint.

#### Who does what

| Activity | Performed by | Second identity required | Output |
| --- | --- | --- | --- |
| Grade a new or changed row | Grader of the claim class's owner role (§02.12 claim classes) | Re-checker for [Verified] (L-18) | A `GradingEvent` |
| Adversarial re-check | Re-checker — never the row's last grader | — | A capture, or a recorded outcome |
| Assign an EV or EV-K ID | A corrections-ledger revision only (identifier rule 1) | Ledger owner | New rows and the re-run crosswalk |
| Clear a customer-facing use of a legal row | FR-LEG-001 clearance owner (§23) | — | A cleared claim entry |
| Clear a competitor claim | The §21 clearance owner | — | A cleared competitor statement with its capture date |
| Work the backlog | The owner role named on each item | Re-checker on any re-grade | Backlog item closed with an outcome |
| Audit captures against the host rule and the capture fields | A re-checker, at each ledger revision and on any new research round | — | L19 events where a restricting condition is found (§02.7 host audit) |
| Triage and assign ID requests | Ledger owner | Grader and re-checker when the row is written (IR6) | Rows, merged components or recorded declines (§02.20) |
| Write and self-test kill guards | Proposer from the kill's claim class; confirmer per the permissions table (§02.21) | Confirmer | A guard with both fixtures passing (AC-EVR-39) |
| Close a mirror pull | Re-checker | — | L9, or a re-grade after PulledDiffers (§02.20) |

#### Parameters the register's tooling needs

None of these has a value in this PRD; each is routed to §20.13, and a value enters only with its reasoning recorded.

| Parameter | Used in | Rule for setting it | Owner |
| --- | --- | --- | --- |
| `register.reverify_arm_lead_days` | `ReverifyTrigger.arm_lead_days` (§02.12); the worked re-verification event (§02.6) | Long enough that the trigger's runbook completes before its date. A per-trigger override is allowed and recorded; the ESI trigger never arms later than §20 V-08's escalation point | Statutory |
| `register.event_ack_hours` | AC-EVR-15 — the window in which each consumer acknowledges a register event | Set with the §22 pipeline owner so that a kill or a downgrade reaches every citing rule version before the next scheduled payroll run can resolve it | Engineering, with Statutory |
| `competitive_recapture_cadence_days` | The competitor-price claim class (§02.12) | Owned by §21; the register reads it and does not set it | Research |
| `register.task_close_days.<band>` | The band deadlines of re-verify tasks and mirror pulls (§02.20 RT6, MP5; L-30) | Band 1 short enough that a dated filing's runbook completes before its date; later bands longer. Never looser for band 1 than §20 V-08's escalation point allows for EV-004 | Statutory, with Legal |
| `register.fetch_attempts_max` | RT6 and MP5 — how many different-method retries before escalation | Enough to try every method class the capture rule names (§02.5), and no more before a human is told | Research |
| `register.id_request_sla_days` | IR4 — the wait between a fact's capture and its row, which can hold a fence (§02.10) | Short enough that no fence waits on a ledger revision longer than on its source | Ledger owner |
| `register.min_retraction_rate_alert` | The re-check retraction-rate measure (below) | Set from the first sweeps' observed rate; an alert, never a quota, because a rate driven by a target is itself a bias | Research lead |

#### Register health measures

The register reports on itself with the same discipline §19 applies to product metrics: each measure names its numerator, denominator and source. No target below is a number this PRD invents — a target is either structural (zero, where anything else is a defect) or a named parameter.

| Measure | Numerator | Denominator | Source | Target | Owner |
| --- | --- | --- | --- | --- | --- |
| Re-check retraction rate | Re-checks ending in a downgrade, split or kill | Re-checks closed in the period | `GradingEvent` L13–L16 | An alert below `register.min_retraction_rate_alert` — a rate falling toward zero suggests re-checks that are not adversarial (§02.5, §02.9) | Research lead |
| Owed-search exposure | Published rule versions resting on a row still marked `corrigendum_owed` | Published rule versions | `Capture` × rule-version citations | Zero — §22 AC-RULE-002.3 should make any other value impossible | Statutory |
| Open mirror exposure | Rows with an open `MirrorPull` cited in a draft customer-facing artefact | Rows with an open `MirrorPull` | `MirrorPull` × `Citation` | Zero released (L-09 blocks); drafts reported so the pull can be scheduled ahead of them | Legal |
| Unrechecked-early share | Live rows whose last source contact is r1 or r2 | Live rows | `Claim.last_source_contact` | Falls at every research round; never rises | Research lead |
| Backlog age, by band | Items past `register.task_close_days.<band>` | Open items in the band | `ReverifyTask`, `MirrorPull` | Zero in band 1 | The owner role on each item |
| Event acknowledgement lag | Register events acknowledged after `register.event_ack_hours` | Register events emitted | `RegisterEvent` | Zero | Engineering |
| Guard self-test health | Guards whose blocked and permitted fixtures both behave | Guards (44 — §02.19) | `KillGuard` fixtures | All | Legal, with Engineering |
| ID-request wait | Requests past `register.id_request_sla_days` | Open requests | `IdRequest` | Zero among requests that hold a fence | Ledger owner |

#### Operating cadence

- **Daily:** L-13 reports rows whose re-verify date has passed; L14 applies planning demotion with no rule version change (AC-EVR-11).
- **On every trigger:** the four-step runbook of §02.6, with its outcome written to the capture record.
- **Daily, as well:** L-30 reports re-verify tasks, mirror pulls and ID requests past their deadlines (§02.20).
- **At every ledger revision:** new rows registered, the census (§02.3) re-counted, the banned-number crosswalk (§02.7) re-run, the backlog re-sorted, and the §02.17 one-way-door table re-checked against the new rows; open ID requests assigned or declined; a guard written for every new kill row and every new §20.4 entry, and the guard self-tests re-run (§02.19).
- **At every research round:** the error-rate note (§02.7) re-computed from that round's reported kill counts, and conflicts resolved under C1–C9 (§02.16).

**AC-EVR-29 · The backlog is ordered by what it blocks.** *Given* the backlog, *when* a new item is added, *then* it is placed by the ordering rule above; an item in a higher band — a dated filing, a fail-safe or a rule-version publication gate — never sits below an item in a lower one.

**AC-EVR-30 · A fired trigger leaves a record.** *Given* any trigger that fires, *when* its task closes, *then* the capture record gains an entry with the outcome, the date and the re-checker; a task closed without an outcome, or with `blocked_fetch`, fails the daily lint and stays open.

#### Intake from a new research round

The cadence above commits the register to re-compute the error-rate note and resolve conflicts "at every research round". That is only executable if a round's output is loadable, and rounds one to five were not written for a store: most seeded rows carry no re-checker identity, EV-031's repository read records no tool, EV-035's day of capture is absent, and its image transcription has one transcriber where the §22 rule wants two (§02.12 worked capture records). Those gaps are now recorded as `legacy_incomplete` and cost real work — nine components carry the reliability prior for want of a second source contact (§02.7). The contract below is what a sixth round must meet so the cost is not paid again. It binds the *research deliverable*, not the register: the register grades what arrives, and refuses what it cannot grade.

**Per-finding record.** Every finding a round asks the register to act on carries these fields. A finding missing any of them is not refused outright — it is loaded as a lead, which means it can open a re-verify task and can never support a grade.

| Field | Why the register needs it | Effect if absent |
| --- | --- | --- |
| The claim, stated as a sentence with its jurisdiction and period | `Claim.claim_text`; a finding stated as a topic cannot be graded | Lead only |
| Instrument identity and the host fetched | `host_is_primary` decides `mirror` on write (ER2, AC-EVR-36) | Loads with `mirror` assumed, and the row cannot reach a customer surface |
| Capture date, to the day | Bounds the guarantee; an N3 negative is worthless without it | Lead only |
| Methods run, and the tool and vantage of each | Attributes a failure to the tool before the site (§02.5) | Loads `legacy_incomplete`; the row cannot be re-graded upward |
| `scope_read` — whole instrument, or which parts | A retraction resting on one clause of a partly-read instrument waits (CF5) | No grade, and no retraction, may rest on it |
| The corrigendum or amendment search, with its window — or "owed" | CS1 makes a blank field invalid | The row is written `corrigendum_owed` and blocks the dependent version |
| `quote_locator` for every verbatim quote; `literal_check` for every counted property | CF1 and CF3 — the two failure modes a citation to the primary source does not catch | L-26 refuses the write |
| `freshness_basis` for any "current" or "not yet released" claim | CF2 — a page's own rendered date is not evidence | L-27 refuses the write |
| Which existing rows the finding supports, contradicts or has no bearing on | Routes the finding through capture intake (CI1–CI16) rather than leaving it to a reader | Triaged by hand, at the head of the ID-request queue |
| Two identities where the round proposes [Verified] | Dual control (ER2); the generator cannot grade its own output | Proposal refused; the row waits for a re-checker |

**Round-level obligations.** Four, all of which exist because a per-finding contract alone cannot detect a biased round:

1. **A kill count per dimension.** The error-rate note is computed from reported kills (§02.7); a round that reports none supplies nothing to compute, and its findings carry the prior of the round they displace rather than a fresh one.
2. **A statement of what was not searched.** Round four could not fetch two government hosts, so no amendment between November 2025 and September 2026 could be excluded (§02.2 negatives). That sentence is worth more than any finding in the dimension, and it is the sentence a round omits by default.
3. **A reconciliation list.** Each finding named against the rows it touches, so C1–C9 can be applied deliberately instead of discovered later — the host audit found eight mirror-read rows this way, three research rounds after the reads happened.
4. **A declared amendment chain for every statutory reading.** The instrument, plus the corrigendum, amendment and commencement instruments the reading engages. A reading that does not declare one is refused as a re-grade under C3 whatever its round number.

**Refusal cases at the round level.**

| Situation | What the register does |
| --- | --- |
| A round reports no retractions at all | Its findings load; the round is flagged under §02.9 — a clean adversarial sweep is a warning sign, and `register.min_retraction_rate_alert` fires |
| Two of its dimensions disagree | C4: neither governs, the claim sits at the lower grade, and any build it drives is fenced |
| A reading omits an amending instrument an earlier round cited | C3: logged as not adopted; the grade does not move (AC-EVR-26) |
| A finding's only source is a search summary | CI16: refused as evidence, kept as a lead |
| A finding's confidence label exceeds what its capture supports | C8: the register grades the capture; the label is kept as context |

**Worked intake — the round-five registers study.** It read the Wages, Social Security, OSH and Industrial Relations Central Rules first-hand and supplied the register-specification rows EV-053–EV-055 with their form numbers and retention periods; those load as captures and lift the Central Rules out of the second-hand table (§02.7). The same study read S.O. 5319(E) verbatim without S.O. 5936(E) and concluded there is no one-year sunset; that reading is refused as a re-grade of EV-002 under C3 and logged as not adopted, while remaining readable in the research file. Its thirteen reported kills feed the error-rate note. One deliverable, three different intake outcomes — which is why the contract binds findings individually and the round as a whole separately.

**AC-EVR-50 · A round's findings arrive graded or arrive as leads.** *Given* a new research round's deliverable, *when* it is loaded, *then* each finding carrying the per-finding record is routed by capture intake and each finding missing any field is stored as a lead that can open a re-verify task and can support no grade; and *when* the round supplies no kill count, no not-searched statement, no reconciliation list or no amendment chain for a statutory reading, *then* the missing obligation is recorded against the round and reported at the next ledger revision (TS-74, TS-75).

### 02.19 Kill guards — what each kill blocks and what it lets through

AC-EVR-04 requires that no banned figure appear in any output; ER6 keys kills by claim, not value; L-08 matches "on the claim key and its context". This subsection specifies the guard that does the matching: its record, its evaluation order and — the part a value-matching guard gets wrong — the legitimate look-alike each guard must let through. A guard that blocks its look-alike is as defective as one that passes the dead claim, because it teaches authors to route around it. Phrase-level legal patterns stay in §23's banned-claim lint (FR-LEG-003); a guard here supplies the register side — which row is dead, what replaced it, and which neighbouring statement is licensed.

#### The `KillGuard` and `BannedEntry` records

| Field | Record | Constraint |
| --- | --- | --- |
| `guard_id` | `KillGuard` | One per kill row EV-K01–EV-K36, and one per §20.4 entry with no kill row (BE-01 to BE-08, below) — 44 in all |
| `claim_id` or `banned_entry_id` | `KillGuard` | Exactly one of the two |
| `subject` | `KillGuard` | What the dead claim is about — a vendor's capability, a statute's effect, a figure's referent ("Keka's price", "DPDP s.7(i)", "the India HR-tech market") |
| `predicate` | `KillGuard` | What the dead claim asserted of the subject — "ships state PT slabs", "needs no consent today", "is the price ceiling" |
| `value_pattern` | `KillGuard` | Optional; a figure the dead claim carried. Never matched on its own (ER6; KG7) |
| `permitted_condition` | `KillGuard` | What a sentence about the same subject must carry to pass — a named basis, a stated clock, a qualifier, a named corpus |
| `fixtures` | `KillGuard` | At least one blocked sentence and one permitted look-alike (L-29) |
| `surfaces` | `KillGuard` | Every release surface; the model and export surfaces fail closed (§20.12 rule 6) |
| `text`, `claim_id` (nullable), `crosswalk_status` | `BannedEntry` | A read-only mirror of one §20.4 row, owned and changed only in §20. `matched` when a kill row exists; `open_gap` when none does |

#### Evaluation order

<!-- DIAGRAM: evidence-ledger-kill-guard-evaluation -->

| # | Condition | Result |
| --- | --- | --- |
| KG1 | The text sits in a block annotated as quoting a dead claim, and the same line carries kill framing ("[Killed]", "[Reversed]", "false", "withdrawn") | Pass |
| KG2 | An annotated block without kill framing on the line | Block — the annotation alone is not framing |
| KG3 | No guard's subject and predicate match | Pass; the rest of the lint still runs |
| KG4 | Subject and predicate match; the permitted condition holds; the surface's column allows the look-alike's row (§02.14) | Pass |
| KG5 | Subject and predicate match; the permitted condition holds; the surface does not allow the row | Block, naming the row and the column |
| KG6 | Subject and predicate match; the permitted condition fails | Block, naming the kill row and its replacement |
| KG7 | A value pattern matches but no subject and predicate do | Pass — a bare figure is never a kill (TS-05) |

#### The guards

| Row | Record | Blocks — the dead claim's subject and predicate | Lets through — the permitted look-alike | The look-alike rests on |
| --- | --- | --- | --- | --- |
| EV-K01 | Killed | "6 crore MSMEs", or Udyam's count, as a TAM, an employer count or a denominator | Udyam's 5.31 crore registrations named as registrations, beside 7,66,254 contributing establishments as the denominator | EV-001 |
| EV-K02 | Killed | Any conversion at ₹83.3 to the US dollar | The conversion at ₹94.43 with its month; the 13.4% error shown as a kill (§02.15 derivation 4) | EV-089 |
| EV-K03 | Killed | Any device-integration success rate stated as fact | "Device-integration effort is unsized until the hardware spike reports" | §20 V-10 |
| EV-K04 | Killed | $23.32bn or $38.36bn as an India market | The ₹1,374 Cr verified floor, and the ₹2,100–3,900 Cr range labelled modelled | EV-005 |
| EV-K05 | Killed | ₹37,500 a year as a CA's fee | "The ICAI schedule read has no payroll-processing line", with its superseded-revision caveat | EV-017 |
| EV-K06 | Killed | Multiplier's EOR price at $400, or at the $300 correction | Nothing — the figure is banned on provenance | — |
| EV-K07 | Killed | ₹161 PEPM as attach revenue per employee | Attach modelled as a separate, labelled [Hypothesis] line | §11 |
| EV-K08 | Killed | Any MCP adoption statistic | "Keka publishes a Keka MCP Server", dated, as claim posture | EV-090 |
| EV-K09 | Killed | Any Peoplebox funding figure | Nothing | — |
| EV-K10 | Killed | "~41,000 named accounts" built on registered counts, or 173,250 as a target base | 41,881 contributing establishments above 200, labelled contributing | §20.4 |
| EV-K11 | Killed | ₹12,250 Cr as the 10% CAGR ceiling | ₹10,905 Cr | §04 |
| EV-K12 | Killed | Frappe or TallyPrime "ships", "covers" or "supports" state PT slabs or an LWF engine | "TallyPrime ships a PT statement" and "Frappe HR offers a Professional Tax salary-component type" — both true, and neither is a slab table (EV-032; r3/01 finding 3); "Frappe HR v16's gross-to-net is strong" | EV-031, EV-032 |
| EV-K13 | Killed | A gross margin computed on inference alone; "bundling AI free never threatens margin" | The four-line COGS stack; the 52.7× ratio as a ratio | EV-088, EV-089 |
| EV-K14 | Killed | "No consent is needed" for employee data under DPDP s.7(i), in the present tense | The provision with "on or about 13 May 2027" in the sentence, beside today's SPDI r.5(1) written-consent duty | EV-018, EV-058, EV-060 |
| EV-K15 | Killed | A 144-hour quarterly overtime cap stated as verified, or used to block | A warning labelled as resting on an unconfirmed provision | EV-012 (cap); §20 V-17 |
| EV-K16 | Killed | The Data Protection Board fining or enforcing from November 2026 | "The November 2026 tranche commences Consent Manager registration only" | EV-058 |
| EV-K17 | Killed | "Sensitive under DPDP"; "biometrics are lightly regulated" | DPDP has no sensitive category (s.2(t)) and SPDI r.3 classifies biometric and financial information as sensitive — both halves in one sentence | EV-059, EV-060 |
| EV-K18 | Killed | A 72-hour clock presented as India's breach-reporting obligation | "Six hours to CERT-In under its Directions of 28.04.2022", with DPDP's clock stated as not in force | EV-062, EV-063 |
| EV-K19 | Killed | "India mandates data localisation"; "India has no localisation requirement" | The live constraints named: CERT-In's 180 days of logs in India, SPDI r.7, the customer's sectoral regulator | EV-060, EV-062, EV-085–EV-087 |
| EV-K20 | Killed | Any single PEPM figure as the price ceiling or the market's price | A named vendor's list price with its basis — "Qandle ₹49.00 at 50 employees on annual billing" — and the two-anchor structure | EV-027 |
| EV-K21 | Killed | "Keka's pricing is unobtainable"; "keka.com is TLS-blocked" | Keka's figures with the card named (AC-EVR-24) | EV-021–EV-023 |
| EV-K22 | Killed | RPwD s.20 as a private employer's duty | RPwD s.3(3) as the actor-neutral duty | EV-075 |
| EV-K23 | Killed | The May 2022 UIDAI photocopy advisory cited as law | "The advisory was withdrawn within 48 hours" — the cleared security-review answer (FR-LEG-007) | r4/04 finding 22 |
| EV-K24 | Killed | "We file for you", or any wording implying automated submission | "A portal-accepted artefact and attended, assisted submission under the employer's written authority"; whether it is offered on a given portal is F-08's (§05.18) | EV-030, EV-035–EV-038 |
| EV-K25 | Killed | The October 2025 Supreme Court order as authority for mandatory biometric attendance | Nothing as authority; the order may be described only as turning on the employees' non-opposition | r4/03 finding 6 |
| EV-K26 | Killed | The 2026 KVKK decision cited as Indian, or cited without its jurisdiction | "A Turkish decision (KVKK 2026/921), with no force in India" | r4/03 finding 21 |
| EV-K27 | Killed | "34,000 customers" as greytHR's current or fixed figure | "30,000+ companies, captured September 2026"; 34,000 only as an earlier dated capture | EV-091 |
| EV-K28 | Killed | Keka's renewals priced below list | "Renewal fees are subject to an increase (ToS clause 15)" | EV-025 |
| EV-K29 | Killed | A prescribed-format appointment letter "from employee one" | "Attaches to an establishment of 10 or more workers; the form is state-prescribed" | EV-057 |
| EV-K30 | Killed | ₹200 tax-free meals without the conditions | ₹200 with both conditions in the sentence, labelled [Hypothesis] | EV-019 |
| EV-K31 | Killed | "Payroll Plus ₹5,999" as a Tally add-on | "No payroll, PT or LWF add-on in five TDL catalogues" — an N2 negative with its corpus | EV-032 |
| EV-K32 | Killed | Replay "satisfies" RBI's right to audit | "Replay supports evidence production for inspections" | §15 |
| EV-K33 | Killed | RBI outsourcing duties "with no turnover threshold" | "Materiality-gated, determined entity by entity" | EV-087 |
| EV-K34 | Killed | "Tally is the incumbent", singular | "Two incumbents, two jobs" | EV-032 |
| EV-K35 | Killed | "Every attribute is bitemporal"; universal never-forget replay | "Bitemporality is scoped by entity class; erasable classes exist" | §14 |
| EV-K36 | Killed | Competitors billing actual headcount from employee one | "Six of six priced competitors impose a 50-employee minimum block" | EV-026 |
| BE-01 | Banned (§20.4, no kill row) | 24,18,266 registered establishments as a base or denominator | The registered count shown beside the contributing count, labelled registered, with the 3.16× ratio (§02.15 derivation 3) | EV-001 |
| BE-02 | Banned (§20.4, no kill row) | ₹150–500 PEPM attach, or the 1.5–5% take rate, in any model | Attach as a separate, labelled line with its own validation item | §11 |
| BE-03 | Banned (§20.4, no kill row) | ₹10,000–25,000 a year per life as a group-health premium | IRDAI's ₹61,435 Cr over 275mn lives = ₹2,233 per life a year, with its source | §02.5 |
| BE-04 | Banned (§20.4, no kill row) | A ~₹99 figure attributed to Keka as its price | ₹99.99 at 100 employees on the archived FOUNDATION card, with its derivation cited (TS-05) | EV-022 |
| BE-05 | Banned (§20.4, no kill row) | "Employees' Compensation is a blanket sub-10 liability" | The Second Schedule's limitation largely to hazardous and mechanical occupations | §20.4 |
| BE-06 | Banned (§20.4, no kill row) | "40+ mandatory health check-up", stated generally | Confined by the notified Rules to docks, mines and construction, in permissive language | §20.4 |
| BE-07 | Banned (§20.4, no kill row) | Meta charging for India WhatsApp service messages from 1 October 2026 | Per-message pricing since 1 July 2025, employee-initiated conversations free inside the 24-hour window, INR billing by 31 December 2026 | EV-088 |
| BE-08 | Banned (§20.4, no kill row) | The 52.7× spread restated as an absolute per-employee cost | The ratio as a ratio; the ₹0.15–3.27 absolutes labelled placeholders | EV-089, EV-008 |

Two readings of the table matter to anyone writing copy. First, many look-alikes rest on a row the usage matrix restricts — a mirror, a provision not in force, a hypothesis, an archived card — so passing the guard is not the same as being cleared: KG4 and KG5 send the sentence on to the §02.14 column for its surface. Second, the guards with no look-alike (EV-K06, EV-K09, EV-K25) are the kills whose provenance, not their digits, was the defect (§02.2); there is nothing adjacent to say.

**AC-EVR-39 · Every guard proves both halves.** *Given* the 44 guards, *when* the guard self-test runs, *then* each guard blocks its blocked fixture and passes its look-alike fixture on a surface whose column allows the look-alike's row; a guard that blocks its own look-alike, or has no look-alike fixture where the table gives one, fails (L-29).

**AC-EVR-40 · Every banned entry has a guard.** *Given* §20.4's 25 entries and the 36 kill rows, *when* the guard set is built, *then* the 17 matched entries share their kill row's guard, the 19 claim-only kills and the 8 open-gap entries each have their own, and the set holds 44 guards; an entry added to §20.4 without a guard fails assembly.

**AC-EVR-41 · A value alone never blocks.** *Given* a sentence whose only match to a guard is a figure (KG7) — ₹99.99 on the archived card with its derivation — *when* the guard runs, *then* it passes; and *given* the reworded claim "Keka costs about a hundred rupees an employee", *then* BE-04 blocks it, because the subject and predicate match with no figure at all.

### 02.20 The register's sub-machines — transition tables

§02.6 specifies the claim lifecycle. Five records in §02.12 have lifecycles of their own that the tooling must enforce: re-verify tasks, mirror pulls, corrigendum searches, ID requests and derivations. Each is given in this PRD's convention for state machines — event, guard, side effect, who may trigger (Part E-1) — with a diagram as illustration where the shape helps. Every timer is a named parameter with no shipped default (§02.18).

#### Capture intake — which transition a new capture fires

Every sub-machine below is driven by captures arriving. The intake rule decides, from the row's current state and what the new capture shows, which transition fires; the tooling applies it and the re-checker confirms. Each line points at the transition it dispatches to, so the claim lifecycle (§02.6) and the sub-machines stay one system.

<!-- DIAGRAM: evidence-ledger-capture-intake-router -->

Read the router in the order it tests. Two refusals come *before* the row's state is consulted — a capture whose only source is a summarising tool (CI16) and a later reading that omits an amending instrument (CI15) — because both are refusals about the capture itself, and testing them after the state would let a row's current grade decide whether a defective capture is admissible.

| # | Row's current state | New capture | Comparison with the current capture | Transition fired |
| --- | --- | --- | --- | --- |
| CI1 | No row | Any | — | IR1: an ID request; the fact is cited to the capture's research reference |
| CI2 | Ungraded (open) | The authoritative instrument, on a primary host | — | L3 |
| CI3 | Ungraded (blocked) | Any method other than the recorded failure | Succeeds | L4, and a [Reversed] entry where a conclusion rested on the block |
| CI4 | Ungraded (undone) | One jurisdiction's source | — | L5 — a new row per jurisdiction |
| CI5 | [Hypothesis] | A primary source | Supports | L6 |
| CI6 | [Hypothesis] | A primary source | Contradicts | L7 |
| CI7 | Mirror or caveat qualifier | A primary-host copy | Matches, by hash or by text | MP6 → MP8, and L9 |
| CI8 | Mirror or caveat qualifier | A primary-host copy | Differs in text | MP7 → MP9; then L15 or L16 as the difference requires |
| CI9 | [Verified] | The same source, re-checked | Holds | L13 |
| CI10 | [Verified] | An instrument amending or superseding the base | Changes the claim | L15, and CS3 on the base instrument |
| CI11 | [Verified] | The same source | One component no longer supported | L16 |
| CI12 | [Verified] | An audit of the existing capture | A restricting condition found | L19 |
| CI13 | [Verified — negative, dated] | A law, judgment or designation | Found | L11 |
| CI14 | [Killed] | Any | — | Refused and logged (L17); a genuinely new quantity enters by L1 with a new ID |
| CI15 | Any | A later-round capture that omits an amending instrument the row's capture cites | — | Refused under C3; logged as not adopted (AC-EVR-26) |
| CI16 | Any | A capture whose only source is a search summary or summarising tool | — | Refused as evidence (CF4); recorded as a lead against the row |

#### Re-verify tasks

<!-- DIAGRAM: evidence-ledger-reverify-task-lifecycle -->

| # | From → To | Event | Guard | Side effect | Who may trigger |
| --- | --- | --- | --- | --- | --- |
| RT1 | *(none)* → Armed | A `dated` trigger reaches its lead time; an `event` trigger's watch key fires; a `periodic` interval elapses; an `on_use` citation is made | The row is not Killed | Task placed in the band its row's blocking effect sets (§02.18) | System |
| RT2 | Armed → Assigned | Assignment | The assignee is not the row's last grader (L-18) | Owner role notified | Owner-role lead |
| RT3 | Assigned → InProgress | The re-checker opens the source | — | The band clock `register.task_close_days.<band>` runs | Re-checker |
| RT4 | InProgress → BlockedFetch | A fetch fails | Tool, vantage and status recorded (§02.5) | The row keeps its grade; the daily lint reports the task | Re-checker |
| RT5 | BlockedFetch → InProgress | Retry | A method or tool not already recorded as failed | — | Re-checker |
| RT6 | InProgress or BlockedFetch → Escalated | The band deadline passes, or `register.fetch_attempts_max` is reached | — | Owner role alerted; for band 1 the linked §20 V-item owner as well (V-08 for EV-004) | System |
| RT7 | InProgress → OutcomeRecorded | A result | Outcome `held`, `changed`, `killed` or `no_successor`, with its capture IDs | A grading event (L13–L16), or a recorded no-change | Re-checker |
| RT8 | Escalated → InProgress | Reassignment, or a new method supplied | As RT2 | — | Owner-role lead |
| RT9 | OutcomeRecorded → Closed | Consumers acknowledge the register event | Within `register.event_ack_hours` (AC-EVR-15) | Capture-record entry written (AC-EVR-30) | System |
| RT10 | Closed → Armed | The trigger re-arms | The row is still live | Next date or watch key set | System |

The ~21 November 2026 runbook of §02.6 is this machine running band 1: its "no successor notified" branch is RT7 with outcome `no_successor`, which closes the task, re-arms it at the next watch date and leaves the ESI fail-safe up.

#### Mirror pulls

<!-- DIAGRAM: evidence-ledger-mirror-pull-lifecycle -->

| # | From → To | Event | Guard | Side effect | Who may trigger |
| --- | --- | --- | --- | --- | --- |
| MP1 | *(none)* → Open | A capture lands with `host_is_primary = false` | — | The row gains `mirror` or `provenance_caveat` (ER2); its barred uses are listed | System |
| MP2 | Open → FetchAttempted | A fetch from a primary host (§02.5 host rule) | The fetcher is a re-checker | — | Re-checker |
| MP3 | FetchAttempted → HostRefused | The host refuses or returns no document | Tool, headers and status recorded | — | Re-checker |
| MP4 | HostRefused → FetchAttempted | Retry | A different tool or header set — round five reached incometaxindia.gov.in only with a complete browser header set (r5/02) | — | Re-checker |
| MP5 | HostRefused → Open | `register.fetch_attempts_max` reached | — | Reported daily; the row stays qualified | System |
| MP6 | FetchAttempted → PulledMatch | The primary copy matches | Both hashes recorded where the bytes can match (AC-EVR-13); where the primary host serves a different rendering of the same instrument, a textual comparison with every difference listed, and the method recorded as textual | — | Re-checker |
| MP7 | FetchAttempted → PulledDiffers | The copies differ in text | Every difference listed | Every citation of the row flagged (TS-12, TS-47) | Re-checker |
| MP8 | PulledMatch → Closed | L9 on the row and on every row inheriting its qualifier | — | The customer-facing bar lifts, subject to §23 clearance | Re-checker |
| MP9 | PulledDiffers → Regrading | — | — | Dependent rule versions receive DETECTED change requests (§22 FR-RULE-003) | System |
| MP10 | Regrading → Closed | The row re-graded against the primary text | Grader ≠ re-checker | Capture-record entry | Re-checker |

MP6's textual branch matters for the host-audit rows: EV-076–EV-078 were read from government-hosted reproductions of the 2017 gazette, and a Gazette PDF of the same notification need not be byte-identical to them. A hash mismatch between different renderings of one instrument is not a text difference, and the pull records which comparison it made.

#### Corrigendum and amendment searches

<!-- DIAGRAM: evidence-ledger-corrigendum-search-states -->

| # | From → To | Event | Guard | Side effect | Who may trigger |
| --- | --- | --- | --- | --- | --- |
| CS1 | *(none)* → owed | A statutory or file-format capture is written without a search | — | `corrigendum_owed` on the row; dependent versions cannot leave drafting (§22 AC-RULE-002.3) | System |
| CS2 | owed → none_found | A search is run by the source-class method (§02.18) | Method, window and date recorded | `corrigendum_owed` clears on every row resting on the instrument (AC-EVR-38) | Re-checker |
| CS3 | owed → found | An amending instrument is located | The `AmendmentLink` written with both dates (ER5) | Every row resting on the base instrument is re-graded against the amended text | Re-checker |
| CS4 | none_found or found → owed | A new instrument citing the base appears in the watch feed (§22 FR-RULE-005) | — | A re-verify task arms (RT1) | System |
| CS5 | *(none)* → not_applicable | — | Only for statistics, filed financials, vendor pages, repositories, judgments and government publications (G16) | — | Grader |
| CS6 | owed → owed (partial) | A partial search is recorded | What was searched and what was not are both written | The row stays `corrigendum_owed` | Re-checker |

The RPwD search of §02.18 is CS6 in practice: one candidate amending Act excluded for the Act, one amendment read directly and one through secondary compilations for the Rules, three amendments unexamined. A register that recorded it as `none_found` would have promoted a medium-confidence partial search into a clean one.

#### ID requests

<!-- DIAGRAM: evidence-ledger-id-request-lifecycle -->

| # | From → To | Event | Guard | Side effect | Who may trigger |
| --- | --- | --- | --- | --- | --- |
| IR1 | *(none)* → Requested | A fact is cited to its research file because it has no row (identifier rule 1) | The citation names round, file and finding | A rule version resting on the fact may be drafted, never published (§02.10) | Any author |
| IR2 | Requested → Triaged | The ledger owner reviews it | — | Checked against existing rows and components | Ledger owner |
| IR3 | Triaged → Merged | The fact is already a component of a row | — | The component named; citations re-pointed | Ledger owner |
| IR4 | Triaged → Assigned | A ledger revision assigns an EV or EV-K ID | Within `register.id_request_sla_days` of the request | — | Ledger owner |
| IR5 | Triaged → Declined | No load-bearing use remains | — | The research-file citation is removed from the PRD | Ledger owner |
| IR6 | Assigned → Registered | The row is written | Grade, qualifiers and capture complete; grader ≠ re-checker for [Verified] | Census re-counted (§02.18) | Grader, then re-checker |
| IR7 | Registered or Merged → Citable | Citations re-pointed to the ID or component | — | Dependent rule versions may proceed under the §02.10 contract | System |

The requests open in this version:

| Request | Fact | Cited now as | Where it is used | What waits on it |
| --- | --- | --- | --- | --- |
| IDR-01 | EPFO FAQ Q15: the arrear disbursal date sets the due month | r5/02 | W4 (§02.17); PF on arrears (Part E-9; §08) | Nothing until the arrear flow is unfenced (F-03) |
| IDR-02 | The Indian Bank RFP's requirement that a qualifying certification be held for a year before publication | r2/06 | W10; ISO 27001 at month zero (§05, §17) | The month-zero spend's stated reason (backlog item 5) |
| IDR-03 | The EPS cap of ₹1,250 at the ₹15,000 ceiling | §06.2, from EPFO's scheme pages (r1) | The ECR generator; `eps_rate` (§14.6.2) | Publication of the cap value (backlog item 4; worked grading I) |
| IDR-04 | S.O. 2698(E) of 29.05.2026: 12% simple interest on delayed EPF amounts | r1 (a flash alert quoting it) | §02.1; §06.2 | The interest rule row's publication |
| IDR-05 | S.O. 2702(E) of 29.05.2026: the PF wage ceiling re-fixed at ₹15,000 | r1 (a flash alert); §14.6.2 carries it as mirror | `pf_wage_ceiling` | Customer-facing use of the ceiling's citation |
| IDR-06 | Form 39 (ex-10E) as the claim for relief under s.157(1) of the 2025 Act | r5/02 | §02.8 edge cases; arrears (§08) | Copy about the relief path |
| IDR-07 | Karnataka's monthly Form 5A, due within 20 days, filed through e-PRERANA | r3/02 — a vendor wiki page and secondary sources, so [Hypothesis] if registered | `filing_due_date` for Karnataka, warn-only | Nothing — it cannot block |
| IDR-08 | Tax Year 2026-27 correction filing enabled on the e-filing portal | r1/06 finding 33 | F-02 | F-02's release |
| IDR-09 | The ESIC monthly contribution template | r3/05, low confidence | F-05 | F-05's release |
| IDR-10 to IDR-17 | The eight §20.4 entries without a kill row (BE-01 to BE-08) | §20.4 | §02.7 crosswalk; §02.19 guards | Nothing — the BE guards enforce them meanwhile |

**Worked request — IDR-03, the EPS cap, through the machine.**

| Step | Transition | What happens |
| --- | --- | --- |
| 1 | IR1 | Worked grading I cites the cap to §06.2's round-one reading. The request records r1 and the §06.2 anchor; an `eps_rate` version carrying the cap may be drafted, not published |
| 2 | IR2, not IR3 | The ledger owner checks EV-035 and EV-044. Both carry 1,250 only as a value in a sample line; neither states the cap as a rule, so the request is not merged |
| 3 | — | A re-checker re-reads EPFO's EPS scheme page at source (backlog item 4), recording the host, the date, the wording and a `literal_check` on the figure |
| 4 | IR4 | The next ledger revision assigns an ID, within `register.id_request_sla_days` |
| 5 | IR6 | If the page states ₹1,250 as the cap, the row is written [Verified] with its amendment search owed. If it states only the percentage, the row says so, and the cap stays a computed value whose rounding is `epf.rounding_method` — the engine then never stores 1,250 as a constant |
| 6 | IR7 | §06.2's citation is re-pointed to the new ID, and the `eps_rate` version publishes once its search is recorded (§02.10 contract) |

#### Derivations

<!-- DIAGRAM: evidence-ledger-derivation-states -->

The machine has one state the table below does not reach, because nothing transitions *out* of it: **Refused**. A derivation whose inputs do not share a basis, whose units do not match, or whose output would assert something its inputs cannot support never becomes Current — it is written once with its reason and its unblocking condition and is never re-derived silently (§02.15 refusal cases; AC-EVR-49).

| # | From → To | Event | Guard | Side effect | Who may trigger |
| --- | --- | --- | --- | --- | --- |
| DV1 | *(none)* → Current | A derivation is written | Inputs name rows, components, values and basis (§02.15 rule 2) | `output_grade` computed (ER4) | Grader |
| DV2 | Current → Stale | A new capture of any input | — | Every surface citing the output is flagged; release uses block until re-derived | System |
| DV3 | Stale → Current, as a new version | Re-evaluation | The output reproduces under its stated rounding (AC-EVR-23) | The old version kept; a changed output is a new version (§02.15 rule 5) | System, confirmed by the grader |
| DV4 | Current or Stale → Broken | An input is killed | — | The output is withdrawn from every surface and framed as dead where it is discussed | System |
| DV5 | Current → Current | An input's qualifier changes | — | The output's qualifiers are recomputed | System |

If Keka's small-companies page changed "from ₹6,999 per month" (EV-023), DV2 would fire on ₹139.98 and ₹349.95, the live-floor derivations of EV-027. The archived-card derivations — ₹199.98 at 50, ₹99.99 at 100, ₹96.66 at 150 — would not move, because their input is frozen (EV-022, `archived`).

**AC-EVR-42 · A blocked fetch never closes anything.** *Given* a re-verify task or a mirror pull whose last attempt failed, *when* the daily lint runs, *then* the item is open, the row keeps its grade and qualifiers, and the item is reported; no path from BlockedFetch or HostRefused reaches Closed without an outcome.

**AC-EVR-43 · Sub-machine transitions are attributable.** *Given* any transition in RT, MP, CS, IR or DV other than those the system triggers, *when* it is written, *then* it records the actor, the evidence and the reason, and a transition whose guard requires a second identity records both; one missing any of them is refused.

### 02.21 The register's interfaces — queries, events, permissions and the seed

The register is read by the release gate, the §22 pipeline, the §23 claim register and the assembly lint. This subsection fixes what they may ask, what the register emits, who may write what, and how the store is first loaded from this section.

#### Read queries

| Query | Input | Returns | Rule |
| --- | --- | --- | --- |
| `row` | Row ID; knowledge time `as_of` (default now) | Grade, qualifiers, components, captures and triggers as they stood at `as_of` | The register is append-only: its state at T is the fold of grading events recorded at or before T. It holds evidence metadata, not tenant data, so none of the erasable classes of Part E-2 applies to it |
| `licence` | Row ID, component, surface, `as_of` | `allowed`, `allowed_with` and the same-sentence condition, or `refused` with its reason | Evaluates the §02.14 matrix on the row's state; a whole-row query on a row with components returns the weakest component (ER4) |
| `dependents` | Row ID | Rule versions, fences, derivations, legal-claim entries, one-way doors and citations resting on the row | Generated by scanning (ER9). The §02.10 fence table and the §02.17 door table are fixtures the scan must reproduce |
| `basis` | A derived figure's anchor | Its `Derivation` | None found → L-12 |
| `guard` | Text and surface | Pass, or block with the guard and the replacement | The §02.19 evaluation order |
| `backlog` | A band, or none | Open items in §02.18's order | — |
| `census` | `as_of` | The §02.3 counts | Reproduces the census printed in the PRD version current at `as_of` |
| `crosswalk` | — | 17 matched, 19 claim-only, 8 open-gap | Re-run at each ledger revision |

#### Events emitted

The register event table of §02.10 lists which consumers each event reaches. The payload each carries:

| Field | Constraint |
| --- | --- |
| `event_id` | Unique; consumers de-duplicate on it |
| `claim_id`, `component_key` | The row, and the component where the change is to one |
| `grading_event_id` | The transition (L1–L19) that caused it |
| `from_state`, `to_state` | Grade, qualifiers and any Ungraded state, before and after |
| `evidence` | Capture IDs |
| `actor`, `second_actor` | As the transition's guard requires |
| `reason` | Text |
| `emitted_at` | — |
| `consumers` | Each consumer with its `acknowledged_at`, null until it acknowledges |

Delivery is at least once and ordered per row; a consumer that receives an event older than one it has already processed for the same row discards it. An event unacknowledged after `register.event_ack_hours` alerts the row's owner role (AC-EVR-15).

**Worked event — the EV-012 split, as its consumers receive it.** The corrections ledger's K-04 fix is the register's clearest real L16. As an event:

| Field | Value |
| --- | --- |
| `claim_id`, `component_key` | EV-012, `cap` |
| `grading_event_id` | The L16 split of EV-012 into `rate` and `cap` |
| `from_state` | [Verified], the whole row, as the earlier draft graded it |
| `to_state` | `rate`: [Verified]; `cap`: [Hypothesis], corrigendum owed, kill criterion routed to §20 V-17 |
| `evidence` | The rate's gazette read (r1) and handbook re-read (r3); the cap's secondary-summary capture (r2) |
| `reason` | The cap was read through secondary summaries only and its gazette text never read (K-04) |
| `consumers` | The §22 pipeline; the §23 claim register; §20; the owning section, §09 |

What each consumer does with it: the pipeline raises a DETECTED change request on every version citing the cap, which forces `ot_quarterly_ceiling_hours` to `warn_only` (§14.6.1b RO5) and leaves the `ot_rate` versions resting on the rate untouched; §23 suspends any entry citing the cap; §20 links V-17 as the kill criterion; §09 labels its overtime warning as resting on an unconfirmed provision. The register writes the kill row that records the over-grade (EV-K15) and [Reversed] row 4. No payroll run changes, because no run ever blocked on the cap.

#### Outside the payroll run's path

No payroll run, filing generation or statutory computation calls the register. The engine resolves published rule versions (§14.6.3), which carry their own `evidence_status`, `enforcement_mode` and citation; the register decides what may publish and what may be said, never what a run computes. Two consequences follow. An outage of the register store cannot stop a payroll run, and a register change reaches a run only through a newly published rule version. The release gate is built the other way: it fails closed when the register cannot answer, because releasing unchecked copy is the failure the register exists to prevent.

<!-- DIAGRAM: evidence-ledger-release-gate-sequence -->

#### The release gate, by artefact

| Artefact | Checks run | Clearance | Blocks on |
| --- | --- | --- | --- |
| Website and help-centre copy | Kill guards; `licence` per cited row; L-09, L-10, L-11, L-21, L-23 | FR-LEG-001 for legal statements; §21.12 for competitor statements | Any failing check |
| Sales deck or battle card | As website copy, with L-14 for rows last touched in r1 or r2 | §21.12 | Any failing check |
| Contract annex, DPA or SLA | As website copy, with L-14 | FR-LEG-001 and counsel | Any failing check; mirror rows are never cited (L-09) |
| Security-questionnaire answer | Kill guards; cleared answers only (FR-LEG-007) | FR-LEG-001 AC3 | A question with no cleared answer routes to the Legal lead |
| Assistant response template or system prompt | Kill guards; FR-LEG-003 patterns | FR-LEG-005 | Any failing check |
| Financial model | `licence` for the financial-model column; L-14; kill guards | Finance owner | Any [Hypothesis], Ungraded or [Killed] input |
| External excerpt of this PRD | AC-EVR-22; FR-LEG-004 | Founder and Legal lead | Any row last touched in r1 or r2 and not re-checked |
| Rule-version publication | The §02.10 contract; L-28 | §22 two-person review and certification | Any state the contract refuses |

#### Worked gate run — a security note for a SEBI-regulated prospect

A prospect regulated by SEBI asks for a one-page note on where its employees' data will sit and who may inspect it. The draft cites EV-085, EV-087, EV-062 and EV-060, and one sentence reads: "India has no general localisation requirement, so only SEBI's rules apply."

| Step | Check | Result | Why |
| --- | --- | --- | --- |
| 1 | Kill guards | The sentence is blocked | EV-K19: a localisation absolute. The permitted look-alike names the live constraints — CERT-In's 180 days of logs in India (EV-062), SPDI r.7 (EV-060) and the SEBI framework (EV-085) |
| 2 | `licence(EV-085, security answer)` | Refused for now | [Verified] with its corrigendum search owed; a statutory statement to a customer needs the search date (§02.14) |
| 3 | `licence(EV-062, security answer)` | Refused for now | The same state as EV-085 |
| 4 | `licence(EV-060, security answer)` | Refused | `provenance_caveat` — no primary-host copy of G.S.R. 313(E) is located (L-09) |
| 5 | `licence(EV-087, security answer)` | Refused, and the line is removed | `mirror`; and the prospect has described itself as SEBI-regulated, so an RBI line answers a question it did not ask — if it is also RBI-regulated, the line returns only after the pull and the materiality question go to counsel (Part D-14) |
| 6 | Clearance | Not cleared | No FR-LEG-001 entry exists for any of the statements (AC3) |

The note does not ship. What unblocks it is specific: searches 9 and 15 of §02.18 recorded, G.S.R. 313(E) located on a primary host or the SPDI r.7 line dropped, the RBI line removed, the localisation sentence rewritten to the EV-K19 look-alike, and each statement cleared. The run also shows why an owed search is not an internal formality: two of the four statutory rows in a routine security answer were barred by it alone, and the first regulated prospect is what moves those searches to the head of their band (§02.18).

#### Who may write what

| Action | Grader | Re-checker | Ledger owner | Legal lead | Research lead | System |
| --- | --- | --- | --- | --- | --- | --- |
| Propose a grade or re-grade | Yes | — | — | — | — | — |
| Confirm [Verified] | No | Yes, if not the grader | — | — | — | — |
| Write a qualifier | Proposes | Confirms | — | — | — | Writes `mirror` or `provenance_caveat` from `host_is_primary` |
| Assign an EV or EV-K ID | No | No | Yes, by ledger revision | — | — | — |
| Record a corrigendum or amendment search | Yes | Yes | — | Yes, for legal classes | — | — |
| Close a mirror pull | No | Yes | — | — | — | — |
| Write or change a kill guard | Proposes | Confirms | Opens one for each new kill row | Confirms legal-class guards | Confirms competitor guards | — |
| Change a `BannedEntry` | No | No | No | No | No | Syncs from §20.4; §20 owns the text |
| Record a register parameter's value | No | No | Records the value and its reasoning, as set by the owner the §02.18 table names | — | — | — |
| Edit or delete a grading event | Never | Never | Never | Never | Never | Never |

The maker-checker points are three: a grade (grader, then re-checker), a guard (proposer, then confirmer), and the clearing of a qualifier (a re-checker, through L9). None can be completed by one identity.

#### Storage, retention and access for the register itself

- **Append-only.** Grading events, captures and register events are never edited or deleted; a correction is a new event (ER1; the permissions table above).
- **Capture bytes live as long as anything can replay them.** A citation must reproduce from its stored capture (§22 AC-RULE-007.1). Bytes behind a rule version are therefore kept for that version's life, which RO3 makes unbounded; bytes behind a competitor or market row are kept while the row or any derivation cites them.
- **Access logs follow the rule every system follows.** The register store is an ICT system, so its access logs sit under CERT-In's 180 days within India (EV-062; §17).
- **Captured third-party text is evidence, not content.** Vendor pages and legal-database copies are held for re-verification; outside this PRD only short quotations with their citation are used.
- **No tenant data.** The register holds research metadata, not employee or customer records. A personal name that appears in a public instrument — a gazette signatory — is stored as part of the instrument and never indexed as a person.

#### Seeding the store from this section

The store is first loaded from this section's tables, so the loader's mapping is part of the specification.

| Source in this section | Store record and field | Loading rule |
| --- | --- | --- |
| §02.7 row ID | `Claim.claim_id` | As printed; a short form is rejected (L-02) |
| Claim (abridged) | `claim_text` | Verbatim |
| Marker | `grade`, `qualifiers`, `MarkerComponent` | Parsed against the §02.2 G-table: "Verified — mirror" gives Verified with `mirror`; "Verified (inputs) + modelled (gross-up)" gives two components |
| Source class | `claim_class`; `Capture.source_class` | Mapped through the claim-class table (§02.12) |
| Instrument / URL handle | `Instrument.instrument_id`; `Capture.url` | A handle that is a description rather than a URL loads the capture as `legacy_incomplete` |
| Captured | `rounds_of_origin`; `Capture.capture_date` | Round tokens and dates parsed; `research_ref` and `host_is_primary` from the two provenance tables of §02.7 |
| Corrig.-checked | `Capture.corrigendum_search.status` | "owed" to `owed`; "n/a" to `not_applicable` only for the CS5 classes, otherwise a load error |
| Re-verify | `ReverifyTrigger` | "forced before …" to `dated`; "on any …" to `event`; "biannual" to `periodic`; "on each use" to `on_use` |
| Kill criterion | `kill_criterion` | Hypothesis rows only; `validation_id` from the §20 V-item named |
| Kill rows and §02.19 | `KillRecord`; `KillGuard` | One guard per row as printed |
| §20.4 | `BannedEntry` | Read from §20, never from this section |
| [Reversed] register | `Reversal` | `direction` per §02.12 |
| Mirror-sourced register | `MirrorPull`, status `open` | One per instrument row |
| §02.12 cliff lineage | `AmendmentLink` | ER5 checked on load |
| §02.20 open requests | `IdRequest`, status `Requested` | IDR-01 to IDR-17 |

Captures that lack a field the research never recorded — the tool behind EV-031's repository read, the day of EV-035's capture, the re-checker on most seeded rows — load as `legacy_incomplete`. The store accepts that status for seeded rows only; such a row keeps its grade but cannot be re-graded upward, or have a qualifier cleared, until a new capture fills the gap.

Four printed rows show the parser's hard cases:

| Row as printed | Records the loader writes |
| --- | --- |
| EV-005 — "Verified (inputs) + modelled (gross-up)" | `grade = Hypothesis` (the weaker component, ER4); component `inputs` [Verified]; component `gross_up` [Hypothesis]. The row names no §20 V-item for the gross-up, so ER3 fails on load: the component loads `legacy_incomplete` and the gap is reported to §20 (TS-59) |
| EV-012 — "Verified (2× rate) + Hypothesis (144-hour cap)" | `grade = Hypothesis`; component `rate` [Verified] with its corrigendum search recorded; component `cap` [Hypothesis], search owed, `validation_id` = V-17 |
| EV-014 — "Verified (MH, OD; KA effect)" | `grade = Verified`; components `MH` and `OD` [Verified], search owed; component `KA` [Verified] with `as_to_effect` and `instrument_owed` |
| EV-018 — "Verified — mirror (commencement read via EV-058)" | `grade = Verified`; three components per worked grading E — the s.7(i) text with `not_in_force`, the commencement clock with `mirror` inherited from EV-058, today's SPDI duty with `provenance_caveat` inherited from EV-060. The row counts once in each census cell it touches (TS-56) |

The loaded store must reproduce this section's counts before it is used:

| Check | Expected |
| --- | --- |
| Live rows; kill rows | 92; 36 |
| Marker components counted in the census | 94 (EV-005 and EV-012 split) |
| [Verified]; [Hypothesis] | 87; 5 |
| Ungraded open, undone, blocked | 1, 1, 0 |
| Rows carrying `mirror` or `provenance_caveat` | 12 |
| Rows carrying `not_in_force` on any component | 3 |
| Crosswalk | 17 matched, 19 claim-only, 8 open-gap `BannedEntry` records — 25 §20.4 entries |
| Kill guards | 44 |
| [Reversed] register entries | 19 |
| Open ID requests | 17 |

**AC-EVR-44 · As-of answers do not drift.** *Given* a rule version published at T citing EV-003, *when* `row(EV-003, as_of = T)` is queried after a later downgrade, *then* it returns the state at T; the current state is returned only for `as_of = now`.

**AC-EVR-45 · The gate fails closed and the run does not.** *Given* the register store is unavailable, *when* a release is attempted, *then* it is blocked; and *when* a payroll run executes in the same window, *then* it completes against published rule versions without calling the register (TS-49).

**AC-EVR-46 · The seed reproduces the section.** *Given* the store loaded from this section, *when* `census`, `crosswalk` and the guard count are queried at load time, *then* every value equals the table above; any difference fails the load and names the rows responsible (TS-51).

### 02.22 Reading the rest of this document

Concrete instructions for the reader, section by segment, derived from everything above.

1. **Treat the pessimistic end of every business-case range as the base case.** For market size, timing, enterprise reachability, AI revenue and our own price the bias runs toward overstatement, so the midpoint is already optimistic. Where §18 gives our ₹80–150 PEPM target inside the two-anchor structure (EV-006, EV-027), plan on the ₹80 band floor and stress-test at the ~₹50 value floor until §20 V-01/V-03 report. For competitor capability and competitor price, re-check at source instead — the pessimistic default overshot there (§02.3).
2. **Never let a [Hypothesis] cross into a model or a contract.** §18 (pricing, channel and migration in full), §10 (recruiting/channel economics), and the §11 attach-monetisation numbers are hypothesis-marked. They may shape *architecture* — build the FBP data model, the CA console, the Tally importer — but not a *forecast*.
3. **Treat every [Killed] figure as contraband.** The §20 blocklist is not advisory. If a number on it reappears in a later deck, that deck is defective regardless of who wrote it. The banned list includes the 6-crore MSME TAM, the ₹37,500 CA fee, the $400 Multiplier EOR, the ₹161 Zaggle attach, the 85–98% device figure, MCP adoption stats, ₹83.3/USD, any Peoplebox funding figure, the registered-establishment and ₹12,250 Cr figures, the Frappe PT/LWF coverage claim, the 93–99% inference margin, any single-figure price ceiling, the 144-hour cap as verified or blocking, greytHR's 34,000 as a fixed figure and the "Payroll Plus ₹5,999" add-on (EV-K01–EV-K13, EV-K15, EV-K20, EV-K27, EV-K31 and the eight §20.4 entries listed in §02.7 without a kill row). The Keka price ban is lifted (EV-K21).
4. **For any statutory claim you intend to hard-code, re-run the §02.4 checklist yourself.** The corrigendum trap is live: the indiacode footnote still shows the superseded S.O. 5319(E) enumeration. Do not hard-code a PF/ESI/PT/TDS rule from a single hosted source. A mirror-read instrument — EV-058, EV-087 and the eight host-audit rows of §02.7 — may back a rule version only with its RO6 flag and an open pull (§02.14), and nothing resting on it is said to a customer until the pull closes.
5. **Watch the dated cliffs.** The ~21 Nov 2026 EPF/ESI savings expiry (ESI successor unresolved), the 31 Dec 2026 WhatsApp INR-billing deadline, the 1 Jan 2027 Gemini Flash 2× increase, DPDP commencement on or about 13 May 2027, and the 31 May 2027 Form 138 Q4 due date with its format still unreleased are all *dated* re-verification triggers, not speculative risks (§02.6). Two of the five affect payroll or filing correctness directly.
6. **[Reversed] — "unverified until the sweep runs."** The mid-market competitive picture is now captured (EV-021–EV-034) — as dated list prices and claim posture, not realised price or tested capability. Read every competitor row with its capture date and a note of whether the product was executed or only its documentation read, and rely on no competitor-capability claim that has not been re-checked at source (EV-K12 shows why).
7. **Read the [Verified] claims as dated, not eternal.** A verified statutory claim is verified *as of its capture date*, subject to re-verification. In a market where the governing Act was repealed within the research window, "verified" without a date is a category error. A **[Verified — mirror]** claim is not yet customer-safe.
8. **When a claim carries two markers, respect both.** EV-007/EV-008, the market-size EV-005 and the overtime EV-012 are split deliberately. The Verified part is contract-safe; the modelled/Hypothesis part is not. Do not average them into one comfortable stamp.
9. **Read a mirror row as buildable, not sayable.** Twelve rows carry `mirror` or `provenance_caveat`, among them the RPwD Rules, the POSH Act, the HIV and AIDS Act and the two judgments that anchor §10's and §23's discrimination material (§02.7 host audit). Build on them; do not quote them to a customer until the pull closes.
10. **Read an absence with its bound.** "No LWF engine in TallyPrime" means none in the documentation and five catalogues searched; "no localisation requirement" from IRDAI means none in the ICS Guidelines 2023 (§02.2 negatives). An absence quoted without its bound is a different, unregistered claim.

### 02.23 What would make this methodology fail

Stated plainly, so the failure modes are watched rather than discovered:

| Failure mode | How it manifests | Guard |
| --- | --- | --- |
| **Marker inflation** | Convenient claims drift up to [Verified] without surviving hostile re-check | Grading procedure §02.2 walked in order; hostile re-check + dual control (§02.5) required |
| **Orphan hypotheses** | A [Hypothesis] with no §20 kill criterion — an opinion in disguise | Every inline [Hypothesis] must reconcile to a §20 row; orphans are defects |
| **Zombie claims** | A [Killed] figure re-enters via a new author who never saw the kill | §20 blocklist ↔ EV-K crosswalk; kills carry their reason; killed→terminal in the lifecycle |
| **Stale verification** | A [Verified] statutory claim silently invalidated by an amendment | Re-verification cadence §02.6; overdue → auto-demote to Hypothesis |
| **Single-source statutory grading** | [Verified] on one hosted source that has been amended off-face | Corrigendum standing rule §02.4; second-independent-rendering cross-check |
| **Aggregator laundering** | Disputed aggregator data (PT tables) treated as primary | Aggregators never reach [Verified] for statutory claims; PT is verified only where a state's own schedule was read (EV-014), and a March 2026 aggregator table already reproduces Karnataka's pre-2023 slab |
| **Composite inflation** | A Verified input lends its marker to a Hypothesis output | Weakest-input rule §02.2; register lint on `marker ≤ min(inputs)` |
| **Gross-up laundering** | A verified aggregate (₹1,374 Cr) and a modelled multiplier collapse into one blended [Verified] range | Split marker "[Verified] (inputs) + modelled (gross-up)" (EV-005); worked grading D; contract use restricted to the verified floor |
| **Ungraded-as-Hypothesis** | A blocked/open/undone claim (EV-004/EV-015) is quietly re-badged Hypothesis with a plausible number attached | Ungraded is a first-class state (§02.7 census); no number may attach to a blocked claim; a blocked row leaves that state only by re-capture, as EV-009 did — never by re-badging |
| **Self-grading** | The generator grades its own optimistic output to Verified | Dual control (§02.5); adversarial re-check with a tracked retraction rate |
| **Bias amnesia** | Reader takes surviving claims at face value, forgetting the one-directional finding | §02.3 haircut schedule; the "read the pessimistic end" instruction in §02.22 |
| **Over-correction** | A later round's pessimistic correction is taken as final without its own re-check — as "Frappe ships PT/LWF", the ₹45–50 price ceiling and "Keka is unobtainable" were, all three since withdrawn | Corrections are claims too: they carry a marker, a source and a re-check (EV-K12, EV-K20, EV-K21); no safe discount direction for competitor claims (§02.3) |
| **Single-method capture** | A vendor page read only rendered, or only raw, and the missing half treated as absence | Dual-capture rule (§02.5); the capture record lists every method run and the tool used |
| **Mirror promotion** | A mirror-read instrument is quoted to a customer as if primary | **[Verified — mirror]** rows (EV-018, EV-058, EV-087 and the eight host-audit rows) and provenance-caveat rows (EV-060) are pulled from the primary source before customer use; the §02.7 mirror-sourced register names the host, the barred uses and the trigger for each, and the host audit applies the §02.5 host rule to every row so a mirror read cannot hide behind a .gov.in domain |
| **Tool-introduced fabrication** | A capture tool supplies a precision, a date or a quote the source does not contain, and the citation to the primary source makes it look checked | Capture fields `literal_check`, `freshness_basis`, `quote_locator` and `scope_read` (§02.5, CF1–CF6); L-26 and L-27 |
| **Guard over-reach** | A kill guard blocks the true statement next to the dead one, and authors learn to reword around the guard | Every guard carries a permitted look-alike and is self-tested on it (§02.19; AC-EVR-39) |
| **Clean-re-check complacency** | A re-verification round finds nothing and is treated as reassurance | §02.9 rule: a clean adversarial re-check is a warning sign until it can show it tried to break the claim |

If any of these creeps in, the register stops being a truth-tracking instrument and becomes a confidence-laundering one — the exact failure the first sweep exhibited before the second corrected it, and that the second partly repeated in the opposite direction before rounds three to five corrected it.

### 02.24 Section status and standing commitments

This methodology section is itself **[Verified]** as to its own process claims — the ~90 round-one-to-two retractions (~60 on the round-two critic's own tally, §02.3), their one-directional pattern, the 28 killed conclusions, the corrigendum failure and the round-three and round-four retraction counts are facts of the research process recorded in §01, the Draft 1 provenance line and the r3/r4 critics. The "TLS-blocked vendor list" that earlier versions of this paragraph also counted as a process fact is **[Reversed]**: it was one tool's failure (§02.5). The section is **[Hypothesis]** as to whether the haircut schedule and re-verification cadence are *calibrated correctly* — they encode the direction of the known bias and a measured error rate, not a measured magnitude per claim. Its kill criterion was: **if surviving claims prove *better* than their pessimistic reading across a majority of tested claims, the one-directional finding was over-applied and the haircuts should loosen.** That criterion has now partly fired — not through §20 fieldwork but through source re-verification in rounds three to five, which found round two's corrections too pessimistic on competitor capability and competitor price (EV-K12, EV-K20, EV-K21). The haircut is loosened accordingly for those claim classes (§02.3) and stands for business-case claims, where no later round has reversed a kill; the §20 programme remains the test for the rest. Note the symmetry this enforces on the methodology itself: the same falsifiability it demands of every other Hypothesis, it has accepted — and acted on — for its own central discipline.

This version applied the section's rules to its own register and changed it: the host audit (§02.7) added `mirror` to eight rows the ledger had not flagged as mirror-read, corrected one capture round (EV-029) and seven corrigendum entries on statute rows, and each change is recorded as a [Reversed] entry (rows 17–19) and an L19 event rather than as a silent edit. It also found two gaps it could only record: EV-005's gross-up names no §20 V-item, and most seeded rows carry no re-checker identity, so they load as `legacy_incomplete` (§02.21).

Four standing commitments close the section:

1. **No compliance or competitive claim ships without a captured primary source and a corrigendum check** — and a competitor claim additionally needs clearance, a dated capture and a note of whether the product was executed or only its documentation read (§02.5, §21). This is the standing rule from §01, promoted here to the governing rule of the entire document.
2. **[Verified] requires dual control and an adversarial re-check.** The generator cannot grade its own output to Verified; the optimism bias makes self-grading structurally unreliable (§02.5).
3. **The register is maintained, not archived.** Re-verification dates fire, markers move, kills accumulate on the blocklist. A PRD in a market whose governing statute was repealed mid-research cannot treat evidence as a one-time collection. The evidence register is a live surface with the same maintenance obligation as the statutory-change watcher it justifies (§13.13, §22) — and for the same reason: in this market, the amendment you did not check for is the one that inverts your conclusion.
4. **Every capture is audited against the host rule and the capture fields at each ledger revision.** A finding labelled high in a research file, graded [Verified] by the ledger and read on a legal database is recorded as read on a legal database (C8, C9), because the customer's counsel will check the host before the grade.

#### Index of acceptance criteria, lint rules and fixtures

Every testable statement in this section, by where it is specified. The lint rules and fixtures are in §02.13; the criteria are spread through the subsections that motivate them.

| Criteria | Subsection | What they test |
| --- | --- | --- |
| AC-EVR-01 – AC-EVR-07 | §02.10 | Effective-date resolution, retrospective recomputability, corrigendum propagation, the killed-value guard, no model-generated statutory number, format-version conformance, composite-marker integrity |
| AC-EVR-08 – AC-EVR-10 | §02.2 | Qualifiers written by the register, dual capture for vendor rows, dated negatives |
| AC-EVR-11 – AC-EVR-14 | §02.6 | Staleness demotes planning and never enforcement; kills do not return under a new name; mirror pulls close on a hash; transitions are attributable |
| AC-EVR-15 – AC-EVR-17 | §02.10 | Register events reach and are acknowledged by every consumer; the register state bounds the rule object; not-in-force rows arm on their clock |
| AC-EVR-18 – AC-EVR-19 | §02.12 | IDs minted in one place; the amendment fingerprint enforced on write |
| AC-EVR-20 | §02.13 | Every lint rule has a passing and a failing fixture |
| AC-EVR-21 – AC-EVR-22 | §02.14 | The release gate reads the usage matrix; external excerpts carry no global discount |
| AC-EVR-23 – AC-EVR-25 | §02.15 | Derived figures reproduce; the basis travels with the figure; guards match claims, not values |
| AC-EVR-26 – AC-EVR-27 | §02.16 | A later reading must engage the amending-instrument chain; conflicts are written, never averaged |
| AC-EVR-28 | §02.17 | One-way doors name the rows beneath them |
| AC-EVR-29 – AC-EVR-30 | §02.18 | The re-check backlog is ordered by what it blocks; a fired trigger leaves a record |
| AC-EVR-31 – AC-EVR-33 | §02.2 | Negatives name their search and carry their bound outside the PRD; illegal qualifier sets are refused |
| AC-EVR-34 – AC-EVR-35 | §02.5 | Verbatim quotes reproduce from their bytes; currency rests on a re-check, not a page's own date |
| AC-EVR-36 | §02.7 | Every row names its research reference and its host |
| AC-EVR-37 | §02.10 | A fence names its row or its ID request |
| AC-EVR-38 | §02.18 | One recorded search discharges every row resting on its instrument |
| AC-EVR-39 – AC-EVR-41 | §02.19 | Every kill guard proves its blocked and permitted halves; every banned entry has a guard; a value alone never blocks |
| AC-EVR-42 – AC-EVR-43 | §02.20 | A blocked fetch closes nothing; sub-machine transitions are attributable |
| AC-EVR-44 – AC-EVR-46 | §02.21 | As-of answers do not drift; the release gate fails closed while the payroll run does not; the seed reproduces the section |
| AC-EVR-47 | §02.3 | The census reproduces from its grading events, and sums over components |
| AC-EVR-48 | §02.12 | A ledger revision reconciles — census, crosswalk, guards, backlog, doors, requests, markers — before it closes |
| AC-EVR-49 | §02.15 | A refused derivation is stored with its reason and its unblocking condition, and is refused again on re-proposal |
| AC-EVR-50 | §02.18 | A research round's findings arrive graded or arrive as leads; a round's own obligations are recorded |
| L-01 – L-31 | §02.13 | Register lint, by where it runs and whether it blocks |
| TS-01 – TS-77 | §02.13 | Paired pass and fail fixtures for the lint, the guards, the sub-machines, the seed, the ledger revision, the derivation refusals and the register store |
| L19 | §02.6 | The newly-qualified transition the host audit exercised |
| N1 – N4; CF1 – CF6 | §02.2; §02.5 | Negative classes; capture failures and the fields that catch them |
| KG1 – KG7 | §02.19 | Kill-guard evaluation order |
| CI1 – CI16; RT1 – RT10, MP1 – MP10, CS1 – CS6, IR1 – IR7, DV1 – DV5 | §02.20 | Capture intake; transition tables for re-verify tasks, mirror pulls, searches, ID requests and derivations |
| C8 – C9 | §02.16 | Research labels and ledger grades against the register's capture rules |
| CN1 – CN5 | §02.3 | Census arithmetic — what each transition moves, and what is never a grade cell |
| LR1 – LR7; PC1 – PC7 | §02.12 | The ledger revision's states, its prohibitions and its recorded post-conditions |
| DR1 – DR8 | §02.15 | Derivations the register refuses, with the reason and the unblocking condition for each |
