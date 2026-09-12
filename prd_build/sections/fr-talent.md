## 10. Functional Requirements — Talent (Recruiting & Performance)

Talent is the **wedge, not the spine**. The spine is the statutory filing (§06, §08); recruiting and performance are the modules that widen the surface a customer sees every week and that create the *records* the payroll engine later consumes — a new hire's UAN, a revised CTC from an appraisal, an appointment letter in the state-prescribed form. This section specifies those modules as numbered functional requirements, and it does two things the rest of the PRD demands of it:

1. **It respects the zero anchor for AI (§12, §18.5) — and the market's paywall for talent modules.** The market price of talent *AI* is zero: 15Five includes its AI features in its $11 Perform tier and Culture Amp includes AI Coach in every band (pricing pages read, not executed; research round r2 — r2/07, which records no capture date, so re-capture before any external use), and greytHR's NAVOS assistant is "included in every plan" (claim posture, not tested — EV-090). **[Verified]** The talent *modules* are not free: every tiered Indian vendor gates performance and recruitment upward (EV-028), and greytHR sells its Performance Management System as a ₹35–45/user/month add-on from its Growth tier and Recruit at ₹2,500/recruiter/month (pricing page captured 4 Sep 2026, read not executed — research r1/01, r1/08). **[Reversed]** Earlier drafts said performance must be bundled because the market prices it at zero; EV-028 shows the market charges for it. Performance still carries no per-unit meter here, for a different reason — talent add-ons are the market's most predictable source of bill shock, and removing that shock is a wedge (research r1/01) — and which plan tier carries it is §18's decision. Recruiting is monetised only where the unit of value is legibly incremental — **per requisition or per hire, metered separately from PEPM** because recruiting cost does not track headcount (§13). Every FR below carries a monetisation marker, and the deferred ones are consolidated in §10.12.
2. **It respects the hard external dependency.** A new entrant can build recruiting in India, but *inbound only*: Info Edge owns the passive-candidate graph (Resdex), has published no path for a third-party ATS to search it that we are aware of as of September 2026, and markets in-ATS Resdex search as exclusive to its own ATS (§10.1; §16). This is not a footnote — it is the single fact that shapes the entire recruiting architecture, so it leads the section (§10.1) before any FR is written.

<!-- DIAGRAM: talent-module-map -->

### 10.0 Scope, phasing, and how to read these FRs

Talent does **not** ship in v1. v1 is the statutory beachhead (§05). But one talent surface is a v1 dependency and cannot wait: **onboarding handoff** (§10.8), because it issues the appointment letter — which OSH Code s.6(1)(f) requires of an establishment of ten or more workers, in the form the appropriate Government prescribes (EV-057; §06.1) **[Verified — central-sphere text]** — and because the onboarding step is what creates UAN/ESI-IP continuity that the payroll engine needs. **[Reversed]** Earlier drafts called the letter a statutory artefact "from employee one" in a single notified format; the duty attaches at ten workers and the form is state-sphere. So the phasing is:

| Phase | Talent scope | Rationale |
| --- | --- | --- |
| **v1** | Onboarding handoff only (§10.8), as the terminal step of the core-HR record-creation flow | Statutory: appointment letter (state-prescribed form, establishments of 10+ workers), UAN linkage and ESI IP registration, the EPF and ESI joining declarations and nominations, previous-employer income for TDS (Form 122, ex-12B). Not "recruiting" — it is record creation the payroll engine already needs. |
| **v1.5** | Recruiting: requisitions, job-board multi-post, candidate pipeline/ATS core, offer management | The talent wedge proper. Ships once the beachhead payroll is stable and the onboarding handoff exists to receive hires. Metered/deferred monetisation. |
| **v2** | Performance: goals/KRAs, review cycles, calibration, increment/promotion → payroll feedback loop; recruiting depth (referrals, BGV, interview kits) | No per-unit meter; tier placement per §18 (point 1 above). The increment→CTC→effective-dated-retro loop (§10.10) is the reason performance is genuinely valuable *to a payroll product* and not just table stakes. |

**How these phases map onto §05's release plan.** §05 phases the product as v1 (releases R1, R2, R3), v2 and Vision; "v1.5" is this section's label, not a §05 phase. The mapping: **v1** here is the onboarding set inside §05's R1 (Form 122 intake is register row A-10 and the appointment letter row A-19, both R1); **v1.5** is recruiting "bring your own job-board contract", which §05.5 lists as item 19 (P1) and so ships no earlier than R2, after the statutory R1 list; the recruiting *price* stays at zero until §05's v2 turns on metered SKUs (item 25), which is why FR-T-X01 counts events "while the price may still be zero"; **v2** here is performance, §05.5 item 26 (v2). Where this section and §05 disagree on timing, §05 governs.

<!-- DIAGRAM: talent-phasing-lane -->

**FR identifier scheme.** Talent FRs are numbered `FR-T-<area><nn>`:

| Prefix | Area |
| --- | --- |
| `FR-T-R` | Recruiting (requisitions, distribution, pipeline, offer, sourcing) |
| `FR-T-O` | Onboarding handoff |
| `FR-T-P` | Performance (goals, reviews, feedback, calibration) |
| `FR-T-X` | Cross-cutting (metering, consent, audit, AI rails) |
| `FR-T-D` | Discrimination defensibility — AI-influenced decisions, protected-attribute bar, EOP, records and complaint workflows (§10.13b; three-digit IDs, `FR-T-D###`) |

**Column legend used in every FR table below:**

- **Pri** — `P0` (module cannot ship without it), `P1` (module is materially incomplete without it), `P2` (fast-follow). Pri is **module-relative**: §05 reserves "P0" at product level for the R1 release list, and of the FRs here only the v1 onboarding set (FR-T-O01–O07, O10) falls inside R1. A `P0` on a v1.5 or v2 FR means "the module's release cannot ship without it", never an R1 commitment.
- **Phase** — `v1` / `v1.5` / `v2` per the table above.
- **Money** — `Bundled` (no per-unit meter; included in whichever plan tier §18 assigns — onboarding sits in the entry tier with payroll, EV-028), `Metered` (billed per requisition/hire/seat — see §10.12), `Free-acq` (deliberately free as acquisition infrastructure), `—` (not a billable surface).
- **Conf** — `[Verified]` / `[Hypothesis]` / `[Killed]` per the standing rule (§02). Hypotheses carry a kill/validation criterion.

**On Hypotheses:** every FR marked `[Hypothesis]` carries a kill/validation criterion. Where the criterion is load-bearing it is stated inline in the FR's section; the rest are consolidated in the **Hypothesis ledger (§10.16)** so no `[Hypothesis]` marker in this section is orphaned. Two kinds of Hypothesis appear: *demand* hypotheses (does the beachhead want this feature — default-safe response is "defer, don't build ahead of demand") and *mechanism* hypotheses (does a compliant technical/legal path exist — default-safe response is "don't build until a gazette/portal citation confirms it"). The ledger tags which is which.

Acceptance criteria are written as **Given / When / Then** and appear either inline in the FR row or, for the load-bearing flows, as a dedicated block. §10.13 consolidates the cross-cutting acceptance criteria that no single FR owns. Every value this section does not state — because neither the evidence register nor the research gives it — is a backticked named configuration parameter, and §10.17 registers each one with its §20 route, owner and behaviour while unset.

---

### 10.1 Recruiting — the external-dependency map (the constraint that writes the architecture)

Before a single recruiting FR, state the wall plainly, because it determines which FRs are even buildable.

<!-- DIAGRAM: recruiting-integration-topology -->

**[Verified]** Info Edge owns the passive-candidate graph, and we are not aware of any published licensing path for it as of September 2026. Resdex — the resume-database *search* product recruiters actually buy — is available inside an ATS **only through Info Edge's own ATS (Zwayam), which markets this as an exclusive** ("The only platform with in-built Naukri RESDEX" — zwayam.com, re-fetched in research round r2, r2/08 finding 4). That is the incumbent's own marketing, not a statement of licensing terms: strong evidence, not proof, that no third party can licence Resdex, so one business-development conversation with Info Edge precedes roadmap freeze (§20). What a third-party ATS gets against a customer's own Naukri contract is **job posting plus application sync — never database search**, corroborated across four independent ATS vendors including Keka (r2/08 finding 5). All vendor pages in this paragraph were read, not executed, and round r2 records no capture date for them, so each is re-captured with a date before any external use (§21). We found no Naukri developer API, self-serve key or partner documentation, and are not aware of any as of September 2026: its recruiter support corpus has no API, integration or developer folder, and its "ATS integration" page is a 2015 image stub (r2/08 findings 6–7).

**[Verified]** Right-size the moat, do not inflate it. Naukri's "118M" is an investor metric for *total resumes ever* (118 million as of 30 June 2026); Resdex, the product recruiters buy, is described by Naukri's own FAQ as **"over 50 million profiles"** (EV-020; r2/08 findings 1–2). Do not quote 118M in any collateral.

**[Verified]** LinkedIn is the exception — the one large passive graph with a documented, certifiable partner path: **Recruiter System Connect (RSC)**, **Apply Connect**, CRM Connect and the **Job Posting API**, all on LinkedIn's Middleware Platform (Microsoft Learn documentation dated 1 April 2026, read not executed — r2/08 finding 16). Four conditions travel with it: approval by LinkedIn and a signed API agreement with data restrictions; the customer holding a Recruiter licence; LinkedIn's sequencing rule that the Job Posting integration is built before RSC; and per-module certification demoed to LinkedIn. Profile data enters the ATS by recruiter-initiated one-click export, never bulk search. This is the integration to do properly and early, with the approval and certification time on the v1.5 plan.

**[Verified]** Scraping is forbidden, in architecture and in collateral. The only working Resdex extraction found copies an authenticated request out of a live Resdex session (a third-party scraper listing with five monthly users — r2/08 finding 18); it is legal exposure for us *and* for the customer (§16; §23). No FR below may be satisfied by scraping any candidate database.

**The consequence for the product**, restated as a design invariant that governs §10.2–§10.7:

> We build a **bring-your-own-contract, inbound-only ATS**. The customer holds the Naukri / LinkedIn / foundit / apna / Indeed contracts; we fan a requisition *out* to those boards and ingest applications *back*, deduplicating across sources. We never resell, proxy, or search a third party's candidate database. Outbound sourcing beyond LinkedIn RSC is out of scope until a licensed path exists.

**[Hypothesis]** The India board mix a 20–200 employer actually uses splits by collar: **Naukri + LinkedIn + foundit + Indeed** for white-collar/desk roles; **apna + WorkIndia + Indeed** for blue/grey-collar and frontline roles (which matters directly for the deskless segment in §09). *Kill/validate:* a board-usage question added to the §20 buyer research (V-07 already samples 30–40 buyers across 20–200 and 200–1,000; §10.15 T-1); if fewer than 3 boards are used by the median beachhead employer, cut the multi-post connector matrix to the top 2 and treat the rest as CSV/email fallback.

---

### 10.1a The talent data model (so the FRs below are unambiguous)

The FRs reference a small set of entities; naming them once prevents the ambiguity that produces re-keying and broken handoffs. The load-bearing property is that a **person** moves through three lifecycle states — candidate, pre-boarding (accepted offer), employee — without losing identity or history, while the processing basis for each state is recorded per data-protection regime: the SPDI Rules 2011 today, DPDP from on or about 13 May 2027 (§10.13; EV-058, EV-060).

| Entity | Owns | Key relationships | Lifecycle-critical field | Temporal class (§14.6.1a) |
| --- | --- | --- | --- | --- |
| **Requisition** | Role, openings, band, wage-band structure, approval state | 1→N Applications; 1→1 Offer per fill | `openings_remaining`, `statutory_crossing_flag` (FR-T-R06) | R — append-only; an edit is a new version with actor and reason |
| **Candidate (person)** | PII, resume, source(s), consent record | N→N Applications (one person, many roles); dedup key = email+phone (FR-T-R12) | `consent`, `retention_horizon` (FR-T-X02/X03) | Personal fields encrypted under the person's subject key; erased by crypto-shredding at the FR-T-X03 horizon unless a `RetentionHold` applies |
| **Application** | A candidate's pursuit of one requisition; pipeline stage; scorecards | Candidate→Requisition edge | `stage`, `source_board`, `dedup_group_id` | R — stage moves and submitted scorecards are append-only (FR-T-R20, FR-T-R32); personal fields fall with the candidate's subject key |
| **Offer** | CTC structure (two wage bases), letter version, e-sign, approval | Application→Offer→Pre-boarding record | `wage_base_addback_resolved` (FR-T-R51) | R — each revision is a new version that re-runs FR-T-R51; the rendered letter is an E-class `Document` |
| **Pre-boarding record** | Provisional employee carrying CTC forward | Offer→Onboarding case | `becomes_employee_on` (joining date) | R until commit; the CTC it carries becomes a B-class `CompensationAssignment` at FR-T-O10 |
| **Onboarding case** | Statutory doc checklist, UAN/ESI-IP, appointment letter | Pre-boarding→Employee (register commit) | `uan_linked_or_generated`, `register_committed` | R for the checklist; uploaded proofs and the rendered appointment letter are E-class `Document`s; statutory identifiers are B-class (§07) |
| **Employee** | The system-of-record record the payroll engine runs | Onboarding→Employee; Employee→Reviews | `processing_basis` per regime, with its consent artefact where one is required (FR-T-X06) | Per §14: assignments and statutory attributes B, consent records E |
| **Goal/KRA, Review, Increment** | Performance artefacts and the CTC-revision outcome | Employee→Review→Increment→effective-dated CTC change | `effective_date` (FR-T-P15/P16) | Goal versions and calibration moves R (FR-T-P05, FR-T-P13); the increment lands as a B-class `CompensationAssignment` row |
| **Decision snapshot** | Criteria, model version and configuration, driving features, confirmer, reason — written at decision time (FR-T-D002) | Application or Review→Snapshot, 1→N | `snapshot_written_at`, `hold_id` | R — never recomputed; personal fields under the subject key, so erasure leaves the FR-T-X03 tombstone; a `RetentionHold` blocks erasure (§23 FR-LEG-026) |
| **Consent record** | Purpose, data classes, regime, notice version, whose artefact it is (§07 FR-CHR-100) | Candidate or Employee→Consent, 1→N | `regime`, `withdrawn_at` | E — versions forward; never rewritten at the ~May 2027 regime switch (Part E-6) |

Nothing talent-side is bitemporal except what payroll already makes bitemporal: the CTC that an offer or increment produces enters the B-class salary-structure and assignment rows the engine replays (§14.6.1a); every other talent record is either an append-only record of fact or erasable. That is what lets FR-T-X03 honour a candidate erasure without breaking any replayed payroll figure.

The single rule that keeps this from decaying into two disconnected products: **the same person entity persists from first application through payslip N**, so source-of-hire, BGV, offer structure, and appraisal history are all queryable against one identity. A recruiting product bolted on later, with its own candidate table, cannot do the appraisal→payroll arrears loop (§10.10) or the candidate→employee processing-basis record (FR-T-X06). Build the shared identity from v1.5.

---

### 10.2 FRs — Requisitions & requisition management

A requisition is the atomic unit that recruiting is metered on (§10.12), so it is modelled first and precisely.

| ID | Requirement | Pri | Phase | Money | Conf |
| --- | --- | --- | --- | --- | --- |
| **FR-T-R01** | Create a requisition with: title, department/cost-centre, location(s), band, headcount (N openings), employment type (full-time / fixed-term / apprentice / contractor), target CTC range broken into the two wage bases (§10.7), hiring manager, recruiter, and a required approval chain. | P0 | v1.5 | Metered | [Verified] |
| **FR-T-R02** | Multi-opening requisitions: one requisition with N openings tracks N independent fills; closing the Nth opening closes the requisition. Metering counts the **requisition**, not the openings, unless a per-hire plan is active (§10.12). | P1 | v1.5 | Metered | [Verified] |
| **FR-T-R03** | Requisition approval workflow: configurable serial/parallel approvers (e.g. hiring manager → finance → CXO), with SLA timers, delegation, and full audit trail. Approval is a precondition to job-board distribution (FR-T-R10). | P1 | v1.5 | Bundled | [Hypothesis] |
| **FR-T-R04** | Budget/headcount guardrail: a requisition cannot be *approved* if it pushes an approved-headcount counter for the cost-centre over its ceiling, unless an over-hire is explicitly authorised and logged. | P2 | v2 | Bundled | [Hypothesis] |
| **FR-T-R05** | Requisition templates and cloning: save a role as a template (JD, screening questions, interview kit, wage-band structure) and clone it, so repeat hiring (e.g. sales reps, plant operators) is one click. | P2 | v2 | Bundled | [Verified] |
| **FR-T-R06** | Requisition-to-vacancy statutory tag: flag whether a fill moves the hiring establishment across a threshold in the §06.1 table — 10 (ESI — 20 for the central-sphere-extended establishment classes — gratuity, maternity benefit and the appointment letter, as four separate rows, each with its own counting unit and latch); 20 (EPF; the Grievance Redressal Committee, counted in workers); 50 (contract labour, crèche); 100 (canteen; a Works Committee only where the appropriate Government orders one); 300 (standing orders, retrenchment approval) — counted per establishment in each statute's own counting unit (EV-057), and surface the crossing to the founder/HR before the offer (ties to §03, §05). | P1 | v1.5 | Bundled | [Verified] |
| **FR-T-R07** | **Employment-type statutory classification** locked at requisition create, so the offer builder (§10.7) and onboarding (§10.8) inherit the correct statutory treatment: *permanent/regular* (PF/ESI/gratuity as normal); *fixed-term* (PF/ESI as regular **and pro-rata gratuity** — CoSS s.53 removes the five-year condition on fixed-term expiry and mandates pro-rata payment, **[Verified]**; the one-year qualifying service is a rules-level reading from two professional-services sources, not the Code's own text, **[Hypothesis]** until confirmed against the Social Security (Central) Rules 2026 — §06.6, §06.13; research r1/06, r3/04); *apprentice* (Apprentices Act stipend; the exclusion from PF/ESI/gratuity and from those headcount counts is carried from legacy citations with no Code-era basis located, **[Hypothesis]** — §06.1, §06.13); *contractor* (**not on payroll** — principal-employer contract-labour obligations under the OSH Code and CoSS (§06.1), not an employee record). The classification itself, and the fact that each type carries different statutory treatment, is what this FR requires; the two hypothesised consequences are parameters (`fte_gratuity_qualifying_service`, `apprentice_excluded_from_counts`), effective-dated, set only when §06.13 closes. | P1 | v1.5 | Bundled | [Verified] |

**Acceptance — FR-T-R06 (the statutory-crossing nudge, the one talent FR that earns its keep against the spine):**

```gherkin
Given an establishment with 19 employees counted for EPF (§06.1 counting unit)
And an open requisition for that establishment with 1 remaining opening
When the recruiter moves a candidate to "Offer accepted"
Then the product surfaces a banner: "This hire takes you to 20 employees — EPF obligation turns on"
And it links to the establishment's EPF-coverage task in the §06.1 obligation profile
And the crossing is recorded with effective date = joining date, not offer date
```

**[Verified — central-sphere text]** thresholds per §06.1 (EV-057). For most 20–200 private employers the State is the appropriate Government, so the operative values are per-state configuration.

**Edge case — who actually counts toward a threshold (FR-T-R06 × FR-T-R07).** The statutory-crossing nudge is only correct if headcount is counted by *statutory profile*, not raw seats. A fill that adds an **apprentice** engaged under the Apprentices Act 1961 is carried in §06.1 as not moving the EPF-20 or ESI-10 counter (legacy citations Apprentices Act s.18 and EPF Act s.2(f)) — but that exclusion is **[Hypothesis]** until §06.13 confirms a Code-era basis, and §06.1's kill criterion forbids dropping anyone from a count before then. A **contractor** engaged through a vendor is not on the tenant's own register, though the tenant carries principal-employer liability for the contractor's PF/ESI contributions (CoSS ss.17, 31 — §06.1, **[Verified]**); whether contractor-supplied workers also count toward the principal employer's own threshold is open (§06.1, **[Hypothesis]**). A **fixed-term employee**, by contrast, *does* count like a regular employee (FR-T-R07). So FR-T-R06's counter is defined per establishment and per statute's counting unit (§06.1), and FR-T-R07's classification is the input that decides which heads those are.

Until the apprentice exclusion is confirmed, the counter behaves conservatively: `apprentice_excluded_from_counts` defaults to *false*, so an apprentice hire that would cross a line raises the banner with the qualifier "crossing depends on the apprentice exclusion — unconfirmed (§06.13)" rather than staying silent. The asymmetry is deliberate: a false alarm costs the founder a minute; a missed crossing costs an un-registered establishment. The exact headcount-inclusion rule per state is effective-dated (state rules under the Codes notify unevenly — §20 risk register).

| Hire | EPF-20 counter | ESI-10 counter | Banner text if the hire crosses a line |
| --- | --- | --- | --- |
| Permanent employee | +1 | +1 | "Crosses {line} — {obligation} turns on from the joining date" |
| Fixed-term employee | +1 | +1 | Same as permanent |
| Apprentice (Apprentices Act) | +1 while `apprentice_excluded_from_counts` = false | +1 while false | Same text, plus "depends on the apprentice exclusion — unconfirmed (§06.13)" |
| Company-designated "trainee" who is not a statutory apprentice | +1 | +1 | Same as permanent (§06.1: such trainees count) |
| Contractor-supplied worker | Not on the tenant's register; principal-employer contribution liability tracked (§06.1) | As EPF | "Principal-employer liability — whether this worker counts toward your own threshold is unconfirmed (§06.1)" |

**Edge case — the talent-law lines the same counter feeds (FR-T-R06 × §10.13b).** The statutory-crossing nudge also watches the lines that switch on the §10.13b duties, each in its own counting unit (§23.10.2): RPwD Rule 3(2), the written-response duty, at **twenty or more persons** (EV-076); the full Rule 8(3) EOP content and the Rule 9(1) record at **twenty or more employees** (EV-077; research r5/05 findings 6–7); the HIV and AIDS Act Complaints Officer at **100 or more persons in any capacity, 20 or more in healthcare** (EV-082); and POSH, where the Internal Committee binds every employer and fewer than ten **workers** only changes the complaint route to the Local Committee (EV-056). Crossing twenty persons enables the Rule 3(2) case type (FR-T-D008); crossing twenty employees raises tasks to upgrade the EOP (FR-T-D006) and open the Rule 9(1) record (FR-T-D007) — and because persons, employees and workers are different counts, the same tenant can cross one of these lines on a day it does not cross another. **[Verified]** on the lines and units (EV-056, EV-076, EV-077, EV-082); whether a given contractor or apprentice counts toward each is the same open question as above.

**Edge case — the apprentice cap and stipend floor.** A requisition typed *apprentice* should also carry the notified apprentice-stipend minimum (a named parameter, `apprentice_stipend_floor`) and the establishment's apprentice-engagement band (a named parameter, `apprentice_engagement_band`) — neither value is captured in the research rounds, so both are sourced from the Apprentices Act and its rules through §20 desk validation before any value ships — because a plant-heavy beachhead employer that over-engages apprentices to dodge PF is running a real compliance risk the requisition stage is the cheapest place to flag. **[Hypothesis]** on surfacing the band cap in v1.5 — *kill/validate:* if beachhead interviews (§20) show apprentice hiring is negligible in the 20–200 desk-role segment, drop the band-cap check and keep only the stipend-floor default; retain the classification (FR-T-R07) regardless because the payroll treatment differs.

---

### 10.3 FRs — Job-board distribution / multi-post (bring-your-own-contract)

This is the FR set that operationalises the §10.1 invariant. It is deliberately narrow: **post out, ingest in, dedup — never search.**

| ID | Requirement | Pri | Phase | Money | Conf |
| --- | --- | --- | --- | --- | --- |
| **FR-T-R10** | Multi-post a single requisition to the customer's *own* contracts on Naukri, LinkedIn, foundit, apna, and Indeed from one screen, mapping our requisition fields to each board's posting schema. The posting path is captured for LinkedIn (Job Posting API) and Naukri (post plus application sync against the customer's contract, as four third-party ATSs do — r2/08); for foundit, apna and Indeed no posting or ingest path is captured in r1–r5, so each connector ships only after a dated capture of that board's employer integration terms (§20), and until then that board runs through the FR-T-R15 fallback. | P0 | v1.5 | Metered | [Verified] |
| **FR-T-R11** | Application ingest: pull applicants back from each board (via API where one exists — LinkedIn Apply Connect; via authorised email/inbox parsing where none does — Naukri) into the pipeline (§10.4), with source attribution per candidate. | P0 | v1.5 | Metered | [Verified] |
| **FR-T-R12** | **Cross-source dedup:** when the same candidate arrives from two boards (e.g. Naukri + LinkedIn), collapse to one candidate record, preserving all source touchpoints, using email + phone (E.164, +91 normalised) as the primary match key and name+DOB as a secondary signal. | P0 | v1.5 | Bundled | [Verified] |
| **FR-T-R13** | LinkedIn RSC / Apply Connect / Job Posting API integration built to LinkedIn's certified partner path — the one large passive graph with a documented, legitimate integration (§10.1). | P1 | v1.5 | Metered | [Verified] |
| **FR-T-R14** | Naukri handling *without* a public API: job posting + application sync only, against the customer's contract; **explicitly no Resdex/database search**, and the UI must state this limit so the customer is not surprised. | P0 | v1.5 | Metered | [Verified] |
| **FR-T-R15** | CSV/email fallback board connector: any board without an integration can still be used via a structured email-forward + CSV-import path, so "bring your own contract" degrades gracefully to any board. | P2 | v2 | Free-acq | [Hypothesis] |
| **FR-T-R16** | Career-site / hosted job page: a tenant-branded public jobs page and per-requisition apply link, with consent capture at point of application built for both data-protection regimes, using counsel-cleared notice text (FR-T-X02; §23). | P1 | v1.5 | Free-acq | [Verified] |
| **FR-T-R17** | Employee referral portal: an employee submits a referral against an open requisition; referral is tracked through to hire for referral-bonus payout via payroll (ties to §08 earnings). | P2 | v2 | Bundled | [Hypothesis] |
| **FR-T-R18** | **No-scrape enforcement:** architecture forbids, and the codebase contains no path for, authenticated-session scraping of any candidate database; sales collateral states the prohibition (§16). | P0 | v1.5 | — | [Verified] |

**Worked example — the dedup that makes multi-post usable.** A beachhead employer posts a "Field Sales Executive, Pune" requisition to Naukri and apna. Candidate *Rahul Deshmukh* applies on both (common for blue/grey-collar candidates who spray applications). Without FR-T-R12 the recruiter sees two Rahuls, schedules two calls, and looks incompetent. With it, one record shows "Applied via Naukri (12 Sep) and apna (13 Sep)," and source attribution later tells the customer *which board actually converts* — the input to whether renewing the apna contract is worth it. This is the quiet reason inbound-only can still be a good product: **the value is in the funnel intelligence, not in owning the graph.**

<!-- DIAGRAM: requisition-to-hire-pipeline -->

**Design note — ingest fragility, and why parsing is never authoritative (FR-T-R11).** The ingest paths are not equal in reliability, and the architecture must treat them accordingly. LinkedIn's **Apply Connect** delivers structured applications via a certified API — high fidelity. Naukri, with no public API we are aware of (§10.1), is ingested by parsing the customer's own application-notification inbox — inherently fragile: email formats change without notice, fields arrive as free text, and a parser silently drifts. So FR-T-R11 must (a) attribute every ingested candidate to its source path, (b) surface parse-confidence and flag low-confidence records for human review rather than dropping them, and (c) never let a parsed field populate a statutory field (PAN, UAN, DOB) without human verification — the same rules-first/LLM-last invariant that governs FR-T-R22 résumé parsing (§13). The failure mode to design against is not "parsing is imperfect" (it always is) but "an imperfect parse silently became payroll truth."

**Acceptance — FR-T-R13 (LinkedIn certified-partner path):**

```gherkin
Given the tenant holds its own LinkedIn Recruiter/Jobs contract
And our LinkedIn partner approval, signed API agreement and module certification are in place
When a requisition is posted to LinkedIn and applications flow back
Then posting uses the Job Posting API and ingest uses Apply Connect / RSC per LinkedIn's certified partner path
And no RSC capability is enabled for a tenant before the Job Posting integration is certified (LinkedIn's sequencing rule)
And profile data from RSC enters only by recruiter-initiated export, never by bulk search
And no candidate data is obtained by scraping or by proxying LinkedIn search
And source attribution records "LinkedIn (Apply Connect)" distinct from other boards for FR-T-R12 dedup and FR-T-X05 analytics
```

---

### 10.4 FRs — Candidate pipeline / ATS core

| ID | Requirement | Pri | Phase | Money | Conf |
| --- | --- | --- | --- | --- | --- |
| **FR-T-R20** | Configurable pipeline stages per requisition (default: Applied → Screened → Interview → Offer → Hired → Onboarding; plus Rejected / Withdrawn / On-hold as terminal or holding states), with drag-or-click stage moves and a full stage-change audit trail. | P0 | v1.5 | Bundled | [Verified] |
| **FR-T-R21** | Candidate profile: contact, resume (parsed to structured fields), source, current/expected CTC, notice period in days (a real pipeline variable in India, because the joining date waits on the notice the candidate must serve), location/relocation, and a timeline of every touchpoint. | P0 | v1.5 | Bundled | [Verified] |
| **FR-T-R22** | Resume parsing to structured fields (name, contact, skills, experience, education) with human-correctable output. Parsing is an AI cost-of-goods task (§13), rules-checked, never authoritative for any statutory field; every model call runs under the FR-T-X11 rails (Aadhaar, PAN and bank details denied by default at the §12 chokepoint), and parsed output never feeds a barred attribute into scoring (FR-T-D004). | P1 | v1.5 | Bundled | [Verified] |
| **FR-T-R23** | Screening questions / knockout criteria per requisition (e.g. "Do you hold a valid commercial driving licence?"), auto-flagging or auto-rejecting on hard knockouts with candidate notification. Knockouts are deterministic rules the candidate answers, validated against the protected-attribute bar and sex-criterion check (FR-T-D004); no model output may auto-reject (FR-T-D001). | P1 | v1.5 | Bundled | [Hypothesis] |
| **FR-T-R24** | Bulk actions: bulk reject-with-template-email, bulk move, bulk tag — because a high-volume requisition (frontline and blue/grey-collar roles especially) can draw more applicants than one-by-one handling absorbs; applicant volume per requisition is not measured in our research, so the bulk-action batch size is a named parameter (`bulk_action_max_batch`), sized from v1.5 ingest data. | P1 | v1.5 | Bundled | [Verified] |
| **FR-T-R25** | Candidate communications: templated email + WhatsApp, respecting the frontline reach ceiling — a newly created WhatsApp business portfolio may send business-initiated messages to only **250 unique users per rolling 24 hours** (r2/04 finding 23; §09), so bulk candidate WhatsApp must queue and rate-limit, not blast. Each WhatsApp message is also a billed cost line (per message since 1 July 2025; conversations the candidate initiates are free inside the 24-hour window — EV-088), so candidate-initiated threads are the preferred channel. | P1 | v1.5 | Bundled | [Verified] |
| **FR-T-R26** | Talent pool / silver-medallist bank: rejected-but-good candidates parked for future requisitions, subject to the retention and re-consent rules of FR-T-X02/FR-T-X03 — **not** a substitute for licensed database search. | P2 | v2 | Bundled | [Verified] |
| **FR-T-R27** | Recruiter/hiring-manager collaboration: shared candidate notes, @mentions, and hiring-manager review actions (advance/reject with reason) without giving the hiring manager full ATS access. | P2 | v2 | Bundled | [Hypothesis] |
| **FR-T-R28** | Structured **rejection-reason taxonomy** (e.g. skills gap, CTC mismatch, notice-period too long, failed knockout, candidate withdrew) captured on every reject — the raw material for source-of-hire quality analytics (FR-T-X05) and for a defensible, non-discriminatory audit trail. | P2 | v2 | Bundled | [Hypothesis] |
| **FR-T-R29** | Duplicate-application guard within a single requisition: a candidate who re-applies to the same open requisition is merged into their existing application, not created anew (distinct from cross-source dedup, FR-T-R12). | P2 | v1.5 | Bundled | [Verified] |

**[Verified]** The 250-unique-users/24h ceiling is Meta's messaging limit for a newly created business portfolio, rising through 2,000 / 10,000 / 100,000 / unlimited as the portfolio scales, and it applies only to business-initiated messages outside the service window (Meta documentation re-fetched in research r2/04, finding 23) — the same constraint that reshapes frontline onboarding (§09). It applies to candidates as much as employees. The WhatsApp Business Account must also move to INR billing by 31 December 2026 or delivery stops on 1 January 2027 (EV-088), a tenant-level dependency the notification layer (FR-T-X07) surfaces.

**Edge case — dedup false positives on shared contacts (FR-T-R12 × FR-T-R21).** The naive dedup key (email + phone) misfires in exactly the Indian segment where multi-post matters most. Blue/grey-collar candidates frequently **share a phone number** (a household or PCO number) or reuse a **generic email created by a cyber-café operator**, so two genuinely different people can collide on the primary key; conversely one person may apply with a personal number on apna and a spouse's number on Naukri, defeating the match. So FR-T-R12's merge must be **suggest-then-confirm above a confidence threshold**, not silent: a high-confidence match (email *and* phone *and* name align) auto-merges; a partial match (phone only, names differ) is surfaced as a *suspected duplicate* for recruiter confirmation, never auto-collapsed. The cost of a wrong auto-merge is a real candidate silently disappearing into another person's record — worse than the two-Rahuls problem FR-T-R12 solves. **[Hypothesis]** on the exact threshold — *kill/validate:* tune against real ingest data in early v1.5 tenants; if shared-contact collisions are rare in the actual beachhead board mix, raise the auto-merge aggressiveness; if common, bias toward suggest-only.

**Acceptance — FR-T-R12 (cross-source dedup, confidence-gated):**

```gherkin
Given two applications ingested from different boards
When email AND phone (E.164, +91-normalised) AND name all match
Then the records auto-merge into one candidate, preserving both source touchpoints and timestamps
When only phone matches but names differ materially
Then the pair is flagged as a suspected duplicate for recruiter confirmation
And neither record is auto-collapsed until confirmed
And no candidate history is lost on any merge (merges are reversible / audited)
```

---

### 10.5 FRs — Interview scheduling & evaluation

| ID | Requirement | Pri | Phase | Money | Conf |
| --- | --- | --- | --- | --- | --- |
| **FR-T-R30** | Interview scheduling with calendar integration (Google / Microsoft 365), interviewer availability, and candidate self-scheduling links; timezone-aware but India-default (IST). | P1 | v1.5 | Bundled | [Verified] |
| **FR-T-R31** | Structured interview kits / scorecards per stage: competency questions and a rating rubric, so evaluation is comparable across interviewers (reduces the unstructured-gut-feel bias common in SMB hiring). | P2 | v2 | Bundled | [Hypothesis] |
| **FR-T-R32** | Interview feedback capture: each interviewer submits a scorecard; aggregate view shows all feedback before an advance/reject decision; feedback is immutable once submitted (audit). | P1 | v1.5 | Bundled | [Verified] |
| **FR-T-R33** | Video-interview link support (embed a Meet/Teams/Zoom link on the interview event) — integration, not a first-party video product. | P2 | v2 | — | [Verified] |
| **FR-T-R34** | Panel interviews: schedule multiple interviewers against one slot; each submits an independent scorecard (FR-T-R32); no interviewer sees another's rating before submitting (anti-anchoring). | P2 | v2 | Bundled | [Hypothesis] |
| **FR-T-R35** | Interviewer availability + load view so recruiters do not overbook a small number of senior engineers — a bottleneck at 20–200 firms where the same few senior people interview everyone. | P2 | v2 | Bundled | [Hypothesis] |
| **FR-T-R36** | Reschedule / no-show handling: candidate- or interviewer-initiated reschedule with a captured reason; auto-nudge on missed slot; a candidate no-show is recorded (feeding the funnel analytics of FR-T-X05 and the reneg signal of FR-T-R55), and a repeat-no-show flag surfaces to the recruiter — because every no-show spends the small senior-interviewer pool. How often candidates no-show in the beachhead is not measured in our research; the repeat-no-show threshold is a named parameter (`no_show_repeat_threshold`) and the rate itself is a §20 measurement. | P2 | v2 | Bundled | [Hypothesis] |

**India note on FR-T-R30/R35.** In the beachhead, the interviewers *are* the senior team, and interview load is a genuine constraint on hiring velocity, not an afterthought. Scheduling that respects interviewer load is worth more here than fancy rubrics; hence R35 (load view) ranks alongside R31 (kits) despite being simpler.

**Worked example — the anti-anchoring panel that survives a bias challenge (FR-T-R32/R34).** A 40-person firm runs a 3-person panel for a lead-engineer role. Two interviewers submit "strong hire" scorecards; the third, submitting last, can see the first two and rates "hire" — quietly anchored upward. FR-T-R34 forbids this: no interviewer sees another's rating until their own is submitted, and FR-T-R32 makes each scorecard immutable once submitted. The aggregate view then shows three *independent* judgements, which is what makes the hire/no-hire decision defensible if a rejected candidate later alleges discriminatory treatment. That exposure is live today and does not wait for DPDP: RPwD s.3(3) is actor-neutral and reverses the onus (EV-075), and Code on Wages s.3(2)(ii) bars sex discrimination in recruitment at any size (EV-081; whether the Code's exclusion of managerial and administrative staff narrows this for senior hiring is a counsel question — §23.10.2); DPDP, when it commences, adds no right to explanation or human review (EV-066). India has no general private-sector anti-discrimination statute for caste, religion, age or sexual orientation (EV-084, a negative finding dated September 2026), so coverage is characteristic-by-characteristic (§10.13b). The value is not the rubric aesthetics; it is a contestable, auditable decision trail.

**Acceptance — FR-T-R32/R34 (independent scorecards):**

```gherkin
Given a panel of N interviewers scheduled against one candidate stage
When interviewer i opens the scorecard screen
Then no other interviewer's rating or written feedback is visible to i until i submits
And once i submits, i's scorecard is immutable (edits create an audited new version, never overwrite)
And the advance/reject decision screen shows all N scorecards only after all are submitted or the stage is force-closed with a reason
```

---

### 10.6 FRs — Sourcing & background verification (India-specific)

Sourcing beyond inbound is constrained (§10.1); BGV, by contrast, is an India-specific surface reachable through ordinary vendor contracts.

| ID | Requirement | Pri | Phase | Money | Conf |
| --- | --- | --- | --- | --- | --- |
| **FR-T-R40** | Background-verification orchestration via third-party BGV vendors (candidates for diligence: AuthBridge, IDfy, SpringVerify, OnGrid — none of their APIs or terms is captured in r1–r5): trigger education, employment, address, and criminal/court-record checks against a candidate, track status, and store the report against the candidate/employee record as an E-class `Document` (§14.6.1a). **No Aadhaar number leaves the product for a BGV check:** the §07 token store is excluded from every sub-processor (FR-CHR-099(e)), and the product never performs offline verification on a customer's behalf (EV-070). A vendor that runs an Aadhaar-based check does so as its own act, under its own registration and the consent the candidate gives it — AuthBridge, for one, appears on UIDAI's registered-OVSE list as on 30.06.2026, though which of its product lines uses that registration is not established (research r4/04). | P2 | v2 | Metered | [Hypothesis] |
| **FR-T-R41** | **DigiLocker document pull** with candidate consent: fetch issuer-verified education certificates and PAN from DigiLocker for onboarding, reducing forgery risk and manual collection. **Never Aadhaar:** a multi-tenant product may not perform Aadhaar offline verification or share an e-KYC licence key on a customer's behalf (EV-070); an Aadhaar number enters only the §07 token store, and only if the joiner chooses (FR-CHR-099, FR-CHR-101). The partner-API path itself is not captured in research r1–r5 (§10.6 note below). | P2 | v2 | Metered | [Hypothesis] |
| **FR-T-R42** | **UAN-based prior-employment signal:** with candidate consent, a candidate's UAN service history (via the EPFO member passbook the candidate authorises) corroborates claimed prior employers and dates — a uniquely-Indian, statutory-grade employment check. **Consent-gated; never scraped; read-only.** | P2 | v2 | Metered | [Hypothesis] |
| **FR-T-R43** | **BGV consent + adverse-action workflow:** capture explicit candidate authorisation *before* any check is triggered (today, SPDI written consent wherever the check collects sensitive personal data such as financial information — SPDI r.3 and r.5(1), EV-060; DPDP itself creates no sensitive category, EV-059; consent is also the default-safe basis once DPDP commences on or about 13 May 2027, because whether s.7(i) reaches background verification is a counsel question — §23), and enforce a documented adverse-action step — surface the discrepancy to the candidate, allow a response window, and require a recorded reason — *before* a candidate is rejected on BGV grounds. The check result is never silently decisive. | P2 | v2 | Bundled | [Verified] |

**India-specific BGV notes.** We are not aware of any **unified criminal-records database** open to private employers as of September 2026; "criminal/court-record" verification runs jurisdiction-by-jurisdiction (district-court and police-station level, keyed to the candidate's declared addresses), so a court check is only as good as the address history it runs against — which is why address verification and the employment timeline are prerequisites, not parallel checks (BGV-vendor methodology as described by AuthBridge/IDfy; not captured in research r1–r5 — **[Hypothesis]**, confirm in vendor diligence). Two India-specific signals the beachhead genuinely cares about: **employment gaps** (unexplained months that the UAN history in FR-T-R42 can corroborate or contradict) and **dual/overlapping employment** — concurrent PF contributions under one UAN from two establishments in the same month is a moonlighting signal (how much beachhead employers weigh it is not measured in our research — a §20 interview question, not a claim). Both are read-only, consent-gated inferences on the candidate's own UAN passbook, never an employer-side database query.

**[Hypothesis]** on FR-T-R42's mechanism: EPFO exposes member service history to the *member*; the product surfaces it only via candidate-authorised sharing, not any employer-side lookup. *Kill/validate:* confirm a compliant candidate-consent flow exists (EPFO member portal export or Account Aggregator-style consent) before building; if no compliant path exists, drop FR-T-R42 and fall back to FR-T-R40 employment checks. This is a *bet*, flagged as such — do not put it in collateral until the consent path is verified with a gazette/portal citation.

**Worked example — the fabricated experience letter caught by the UAN.** A candidate for a ₹9L accounts role submits an experience letter claiming three years at a Pune firm. FR-T-R40 employment verification is slow (the ex-employer is unresponsive, common with small firms). With candidate consent, FR-T-R42 pulls the UAN passbook: it shows PF contributions from that establishment for only **seven months**, not three years, and a six-month gap the candidate did not declare. FR-T-R43 then governs what happens next: the discrepancy is surfaced to the candidate with a response window (perhaps the ex-employer under-reported PF — itself informative), a reason is recorded, and only then may the recruiter reject. This is a uniquely Indian check, and it is also why FR-T-R43's adverse-action gate matters: a UAN discrepancy can have an innocent explanation, and rejecting silently on it is both unfair and legally exposed.

**Acceptance — FR-T-R42/R43 (consent-gated check + adverse action):**

```gherkin
Given a candidate at the BGV stage
When a UAN-history or any BGV check is triggered
Then explicit candidate authorisation for THIS check type must exist and be logged first (no consent -> no check)
And the check is read-only against the candidate-authorised source (never an employer-side lookup or scrape)
Given a check returns a discrepancy that could drive rejection
Then the discrepancy is surfaced to the candidate with a response window
And a rejection on BGV grounds requires a recorded reason from the recruiter after that window
And the full sequence (consent, result, candidate response, decision) is retained as an immutable audit trail
```

**[Hypothesis]** DigiLocker partner integration and the BGV vendors' APIs (IDfy, AuthBridge) are assumed to be documented integration paths, but neither is captured in research r1–r5; each needs a dated capture of the vendor or MeitY documentation before build (§20). Whether the beachhead will pay for BGV as a metered pass-through (FR-T-R40/R41's monetisation) is a separate [Hypothesis] — see §10.15 T-5 and §10.16.

---

### 10.7 FRs — Offer management (where recruiting meets the payroll spine)

Offers are where the talent module stops being a CRM and starts being a *payroll* product, because the CTC structured in the offer is the same structure the engine will run. This is the highest-leverage integration point in the whole talent section.

<!-- DIAGRAM: offer-ctc-to-payroll-wage-base -->

| ID | Requirement | Pri | Phase | Money | Conf |
| --- | --- | --- | --- | --- | --- |
| **FR-T-R50** | Offer builder that constructs a CTC from a component structure (Basic, HRA, special allowance, employer PF, gratuity accrual, variable/bonus, FBP components) and shows gross, net-in-hand, and total CTC. | P0 | v1.5 | Metered | [Verified] |
| **FR-T-R51** | **50%-add-back validation at offer time:** the offer builder computes the two wage bases (§06) and warns if the excluded heads (HRA, conveyance, commission, etc. — §06.10) exceed one-half of all remuneration (a notified variable, not a constant — §06.10), because that excess is *deemed wages* and re-bases PF/gratuity. An offer must not be issued with a structure that silently understates the statutory wage base. | P0 | v1.5 | Bundled | [Verified] |
| **FR-T-R52** | Offer approval workflow (recruiter → hiring manager → finance/CXO) with the same audit/SLA machinery as requisition approval (FR-T-R03). | P1 | v1.5 | Bundled | [Verified] |
| **FR-T-R53** | Offer-letter generation in a maintained template, mergeable with the CTC structure and statutory annexures; e-signature capture; versioned so a revised offer supersedes cleanly with history. | P1 | v1.5 | Bundled | [Verified] |
| **FR-T-R54** | Offer acceptance → **pre-boarding record**: on acceptance, create a provisional employee record (not yet on payroll) that carries the CTC structure forward into onboarding (§10.8) without re-keying. | P0 | v1.5 | Bundled | [Verified] |
| **FR-T-R55** | Notice-period / joining-date tracking with a configurable "likely to renege" nudge, and requisition auto-reopen if a candidate reneges. Offer-decline and no-join rates are widely reported as a pain in Indian hiring but are not measured in our research, so the nudge ships only once joined-versus-reneged data exists (§10.16). | P2 | v2 | Bundled | [Hypothesis] |
| **FR-T-R56** | **Joining bonus / retention / notice-buyout clawback terms** modelled in the offer and carried to payroll as a recoverable advance with a clawback schedule (e.g. joining bonus repayable if the employee exits within 12 months), so the offer promise and the payroll recovery are one structured object, not a side letter the engine cannot see. | P2 | v2 | Bundled | [Hypothesis] |

**Edge case — the revised offer must re-run the add-back (FR-T-R51 × FR-T-R53).** A candidate negotiates; the recruiter bumps total CTC and, to keep net-in-hand attractive, loads the increase entirely into HRA and conveyance. This can *newly* trip the 50% add-back that the original structure passed (loading a special allowance would not — it is not an excluded head, §06.10). FR-T-R53's versioning must therefore re-invoke FR-T-R51 on every revision — a revised offer is not a text edit, it is a fresh statutory-wage-base computation. The superseding offer version carries its own corrected PF/gratuity base, and only that version flows to the pre-boarding record (FR-T-R54).

**Edge case — the "net take-home" offer and gross-up.** Blue/grey-collar and some sales offers in India are negotiated on *in-hand* rather than CTC. If the offer is expressed net, the builder must gross up to a CTC that yields the promised net after PF, PT, ESI and TDS — and that gross-up itself changes the wage bases, so it iterates with FR-T-R51 as a bounded fixed-point evaluation (the same `fixed_point.max_iterations` and `fixed_point.tolerance` parameters — FR-PAY-211, §15) rather than running once; a net target the engine cannot reach within the bound is reported to the recruiter, never silently rounded. The persisted offer is always the gross CTC structure (the engine runs gross); the net figure is a display target, never the stored basis. **[Hypothesis]** on how common net-offers are in the beachhead — *kill/validate:* if §20 interviews show net-offer negotiation is rare in the 50–200 desk segment, keep gross-up as a calculator convenience, not a first-class offer type.

**Worked example — the offer that would have been non-compliant.** A hiring manager builds a ₹10,00,000 annual offer (cash remuneration; employer PF is set aside here and brought into the test in the table below; gratuity accrual is outside the test — §06.10) as Basic ₹3,00,000 + HRA ₹3,00,000 + conveyance ₹1,00,000 + sales commission ₹2,00,000 + special allowance ₹1,00,000, deliberately keeping Basic low to minimise PF. FR-T-R51 computes: excluded heads (HRA + conveyance + commission) = ₹6,00,000 = 60% of ₹10,00,000. Half is ₹5,00,000, so the ₹1,00,000 excess is deemed wages, and the add-back base is Basic ₹3,00,000 + special allowance ₹1,00,000 + ₹1,00,000 = ₹5,00,000 — not the ₹3,00,000 the manager intended. **[Reversed]** An earlier version of this example treated the special allowance as excludable and still mis-stated the test (₹4,50,000 of excluded pay against a ₹5,00,000 half-way line does not trip it); a special allowance is not an excluded head (§06.10). The builder shows the corrected base and the true employer PF cost (subject to the PF wage ceiling or the employer's opt-in — §06.2) **before** the offer goes out, so the offer letter and the eventual payslip agree. Without this, the offer promises a net-in-hand the payroll engine later contradicts, and the payroll operator (§03) inherits the dispute on payslip one. **[Verified]** on the mechanism per Code on Wages s.2(y) / Code on Social Security s.2(88) (§06.10).

**The same example with the employer's PF contribution in the test — and why it can become a fixed point.** The example above sets employer PF aside, as §08.12 Example G does. §06.10 lists the employer's PF or pension contribution as head (c) of the nine excluded heads, but the proviso speaks of payments made by the employer *to the employee*, and whether a contribution paid into a fund enters E (and "all remuneration" R) is a reading our evidence does not settle. So the offer builder does not assume it: the wage-definition rule payload (§06.10) carries a named switch, `addback.employer_pf_in_test`, set by the rule author with its citation, routed to §20 desk validation and counsel (§23). Gratuity accrual is head (j), outside the test either way (§08.12). With the switch **off**, the answer is the ₹5,00,000 above. With it **on**:

| Case | Employer PF (annual) | R | E | Half of R | Deemed excess | Add-back base | Passes to converge |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Employer PF at the statutory ceiling (12% of ₹15,000 × 12 — §06.2) | ₹21,600 | ₹10,21,600 | ₹6,21,600 | ₹5,10,800 | ₹1,10,800 | ₹5,10,800 | 1 — the base (≈ ₹42,567 a month) stays above the ₹15,000 ceiling, so employer PF does not move |
| Employer opts to contribute on actual wages (§06.2) | 12% of the add-back base W | ₹10,00,000 + 0.12W | ₹6,00,000 + 0.12W | — | — | W = ₹5,00,000 + 0.06W ⇒ **₹5,31,914.89** | Iterates: ₹5,00,000 → ₹5,30,000 → ₹5,31,800 → ₹5,31,908 → ₹5,31,914.48 → … |

Whenever the add-back triggers, the base equals half of R (the non-excluded pay plus the excess over half of R is exactly R/2), which is why both rows land on R/2. In the second row employer PF depends on the base and the base depends on employer PF — the add-back re-bases a component that feeds its own test. The offer builder therefore calls the engine's bounded fixed-point node (FR-PAY-211), never a single-pass formula: it iterates until successive bases differ by less than `fixed_point.tolerance` or stops at `fixed_point.max_iterations`, and a structure that has not converged blocks "Issue offer" with the node and last two iterates named (the §08 AC-211.3 behaviour). Each pass here shrinks the change by a factor of 0.06, so convergence to the paisa takes a handful of passes; statutory rounding applies once, after convergence (FR-PAY-209). The converged employer PF is ₹63,829.79 a year against ₹60,000 on the single-pass answer — the gap the offer letter and payslip one would otherwise disagree on. **[Verified]** arithmetic; **[Hypothesis]** whether head (c) enters the test at all (the switch above). Either way the fixed-point node is required, because gross-up (next edge case) and a balance-figure gratuity accrual (§08.12 Example G) loop regardless.

**Acceptance — FR-T-R51:**

```gherkin
Given an offer with all remuneration R and excluded-head sum E (heads (a)–(i), §06.10)
And gratuity accrual (head (j)) is in neither R nor E, and the employer's PF contribution (head (c)) is in both only if the rule payload's addback.employer_pf_in_test is on
And the add-back threshold t in force on the offer's effective date (0.5 today — a notified variable)
When E > t * R
Then the offer builder deems (E - t*R) as wages
And recomputes the PF/gratuity wage base upward accordingly
And where a component of R or E depends on the base, evaluates the base as a bounded fixed point until successive bases differ by less than fixed_point.tolerance
And refuses to issue the offer if fixed_point.max_iterations is reached without convergence
And blocks "Issue offer" until the recruiter acknowledges the corrected base
And the corrected structure is the one persisted to the pre-boarding record (FR-T-R54)
```

**Edge case — FBP components at offer time and the tax-perquisite windows.** The offer builder's FBP section (FR-T-R50) is where flexible benefit choices — meal card, fuel/LTA, telephone, books & periodicals — are structured, and it must carry the *current* tax-free perquisite limits, because a wrongly-set limit becomes a taxable-perquisite error on the first payslip. Effective **1 April 2026** the Income-tax Rules 2026 raised the tax-free meal perquisite from ₹50 to **₹200 per meal** and the gift/voucher threshold from ₹5,000 to **₹15,000 per tax year**, and the meal exemption is reported as available under the new regime as well (EV-019; research r2/02). **[Hypothesis]** — the figures concur across two dated secondary reads and a counsel spot-check, but the gazette text has not been read; the rule provision and its conditions are §20 V-18, so the limits ship as effective-dated parameters (`perq.meal_per_meal_cap`, `perq.gift_voucher_annual_cap`), re-versioned if V-18 finds a difference. **The ₹200 figure is conditional, and the conditions are engine constraints, not help text:** the meal must be provided during working hours at the office or factory premises, or through non-transferable vouchers usable only at eating outlets; a cash meal allowance is taxable. Without the conditions the perquisite is taxable, payslips under-deduct, and the demand plus interest lands on the employer. The ~3.8× wallet expansion is a ratio computed on a two-meals-a-day, 22-working-day convention — the ratio holds, the rupee level does not (research r2/02). Two further consequences the builder must encode: (a) these limits are **effective-dated**, not constants — an offer dated before 1 April 2026 uses the old limits — consistent with the engine's effective-dating requirement (§06); (b) FBP components are part of all remuneration in the **50% add-back (FR-T-R51)** test, and any FBP component that falls in an excluded head (for example an amenity under head (b) or a special-expense reimbursement under head (e)) also enters E — which head each FBP component falls in is classified in the §08 component catalogue, never assumed by the offer builder — so loading FBP to reduce Basic can itself trip the add-back. The FBP data model this offer surface writes into is the same one §11 (benefits-attach) says to build in v1 and defer monetising — the offer builder is its first writer.

**Edge case — e-signature for the offer and appointment letter (FR-T-R53, FR-T-O06).** The product supports electronic execution of offers and appointment letters and stores the signed artefact with its audit trail. Aadhaar-based **eSign** is performed by a licensed eSign service provider; the product never performs Aadhaar authentication itself (EV-070). Two limits to encode, not paper over: (a) the IT Act excludes certain instruments from electronic execution, so a maintained exclusion list prevents the product from ever e-signing a document that requires a wet signature; (b) eSign is a metered third-party cost, so the bulk-document quota logic (§10.12) applies. **[Hypothesis]** — the electronic-signature position (IT Act 2000 s.5 and its Schedules) is not re-verified in research r1–r5, and whether each state-prescribed appointment-letter form may be executed electronically is a counsel question (§23 CR-37); the appointment letter itself is FR-T-O06's state-prescribed artefact.

**Edge case — the CTC-vs-take-home gap the offer must show honestly (FR-T-R50).** Indian "CTC" bundles employer-side costs the employee never receives in hand: employer PF (12% of PF wages), gratuity accrual (conventionally **4.81%** of the gratuity wage base — 15/26 of a month's wages per year of service, divided by 12; the formula is CoSS s.53, §06.6), employer ESI where applicable, and sometimes a notional insurance or variable figure. A headline ₹10,00,000 CTC can therefore yield a monthly net-in-hand well below the ₹83,333 a naïve candidate expects, and discovering that on payslip one is a new-joiner grievance and a plausible reneg trigger (how often it drives a renege is not measured in our research — FR-T-R55). The builder must display **three distinct figures — total CTC, gross, and estimated monthly net-in-hand** — and label employer PF/gratuity explicitly as *employer cost, not employee income*. This is not cosmetic honesty: the offer letter (FR-T-R53) and the first payslip (§08) must reconcile to the rupee, or the product has recreated the exact offer-vs-payslip mismatch it sells against (§01). **[Verified]** on the components (employer PF 12% — §06.2; gratuity formula — CoSS s.53, ex-Payment of Gratuity Act s.4, §06.6). The 4.81% is an accrual convention derived from the formula, not a statutory rate.

**Edge case — variable pay and the offer that is not a payroll promise.** A large slice of Indian offers (sales, senior desk roles) carry a **variable/performance component** — a share of CTC that varies by role and is not sized in our research — that is *conditional*, paid quarterly or annually against targets, and is neither guaranteed nor part of monthly net-in-hand. The builder must model variable pay as a distinct, clearly-conditional line (not folded into gross monthly), because (a) it changes the monthly net-in-hand display materially, (b) its treatment in the 50% add-back (FR-T-R51) depends on its statutory head — commission is an excluded head (§06.10), while every other variable component is classified in the §08 component catalogue, never assumed by the offer builder — and (c) the eventual payout runs through the performance-variable path (FR-T-P17), never the statutory-bonus path. An offer that shows a variable component as if it were guaranteed monthly pay is the same dishonesty as the CTC-illusion above, one layer up.

---

### 10.8 Onboarding handoff — the bridge (v1 dependency)

This is the only talent surface in v1, because it produces statutory records. Its job is a **clean handoff from "hired" to "employee on the payroll register"** with zero re-keying and full UAN/ESI-IP continuity. It is where recruiting hands off to core HR/payroll (§07, §08) — and, for migrated customers, where mid-year cutover data lands (§16).

<!-- DIAGRAM: onboarding-handoff-sequence -->

| ID | Requirement | Pri | Phase | Money | Conf |
| --- | --- | --- | --- | --- | --- |
| **FR-T-O01** | Convert a pre-boarding record (FR-T-R54) or a directly-added hire into an onboarding case with a checklist of statutory + operational tasks, without re-entering CTC, personal, or contact data. | P0 | v1 | Bundled | [Verified] |
| **FR-T-O02** | Collect and validate statutory joining documents: PAN, bank (name/IFSC/account, penny-drop verified), photo, and address proof. Bank details are financial information — sensitive under SPDI r.3, so written consent is captured before collection (EV-060; §07 FR-CHR-100); DPDP itself creates no sensitive category (EV-059). **Aadhaar only if the joiner chooses to provide it**, written only to the §07 token store and never a precondition to register commit (FR-CHR-099, FR-CHR-101). | P0 | v1 | Bundled | [Verified] |
| **FR-T-O03** | The **EPF joining declaration** (including any existing UAN), the **EPF nomination** and the **ESI joining declaration** collected digitally and mapped to the payroll engine's statutory registers (§07 FR-CHR-044, FR-CHR-045a). Form identifiers are read per scheme version from `epf.form_catalogue` (§06.2) and `esi.form_catalogue`, never hard-coded: the legacy names — EPF Form 11 and Form 2 under the 1952 Scheme, ESI Form 1 — are carried, not re-captured, the forms under EPF Scheme 2026 are not captured, and the ESI regime after 22 Nov 2026 is unresolved (§20 V-08). | P0 | v1 | Bundled | [Verified] |
| **FR-T-O04** | **Previous-employer income (Form 122, ex-Form 12B, or a declaration)** and current-year TDS-already-deducted capture, so the new employer's salary TDS u/s 392 (ex-s.192) computes on full-year income rather than on this employer's months alone. The previous-employment block is a first-class field set of four items — income after exemptions, income tax already deducted, professional tax, and EPF from each prior employer (the field set Zoho Payroll's IT-declaration help page documents — read not executed, round r3 records no capture date; research r3/02 finding 21 — used here as a field list, not as a competitor claim) — held per prior employer, so a joiner with two earlier employers in the same Tax Year is two rows, not a summed figure. Both vocabularies are accepted in labels, search and imports (EV-050). | P0 | v1 | Bundled | [Verified] |
| **FR-T-O05** | Investment-declaration capture (Form 124, ex-Form 12BB — EV-050; Chapter VI-A, HRA, home-loan in the 1961-Act vocabulary practitioners still use) at onboarding so the first payslip uses the right regime and TDS, not a default. | P1 | v1 | Bundled | [Verified] |
| **FR-T-O06** | **Appointment letter in the state-prescribed form** generated and issued as part of onboarding for every joiner of an establishment of ten or more workers (OSH Code s.6(1)(f) — EV-057; counting unit per §06.1), from a template configured per state; below the threshold the same letter is issued as good practice, not as a statutory artefact. **[Reversed]** Earlier drafts said the letter was due "from employee one" in one notified format. | P0 | v1 | Bundled | [Verified] |
| **FR-T-O07** | **UAN handling:** link an existing UAN (from the EPF joining declaration, FR-T-O03); for a joiner with none, route them to UAN allotment and activation through Aadhaar face authentication in the UMANG app — since 1 August 2025 the only route, save for International Workers and citizens of Nepal and Bhutan, for whom the employer still generates the UAN as an attended portal task (EPFO circular of 30.07.2025 — research r4/04, finding 7; §22). Track Aadhaar-seeding status without making Aadhaar a gate (FR-CHR-005, FR-CHR-101). **ESI IP** registration for ESI-eligible joiners is an attended ESIC-portal task (§22). Both portal tasks are the employer's: the product prepares them, and our operators act on them only as attended, assisted filing under the employer's written authority to act, whose legality is under counsel review (§22; §23). Continuity is a hard requirement for migrated employees (no duplicate UANs). | P0 | v1 | Bundled | [Verified] |
| **FR-T-O08** | Onboarding task assignment + status: IT/asset, seating, manager intro, policy acknowledgements — the operational (non-statutory) checklist, so onboarding is one surface not two. | P2 | v1.5 | Bundled | [Hypothesis] |
| **FR-T-O09** | Employee self-service onboarding: the joiner completes their own documents/declarations via the employee app before day one, respecting shared-device and low-bandwidth frontline constraints (§09). | P1 | v1.5 | Bundled | [Verified] |
| **FR-T-O10** | Onboarding → payroll register commit: on completion, the employee is added to the active register with effective joining date, and appears in the next ECR/ESI/PT computation for the correct period. | P0 | v1 | Bundled | [Verified] |

**Why onboarding is v1 and the rest of talent is not.** Every FR in §10.8 produces a record the *statutory engine* consumes: the EPF joining declaration decides the joiner's ECR line, the ESI declaration and IP number decide the ESI contribution line, Form 122 (ex-12B) feeds TDS, and the appointment letter is a statutory artefact for every establishment of ten or more workers. A payroll product that cannot onboard a joiner correctly cannot file correctly. Recruiting and performance, by contrast, can be absent from v1 without breaking a single filing. That asymmetry is the phasing rule.

**Acceptance — FR-T-O07 (UAN continuity, the migration-critical one):**

```gherkin
Given a new joiner who declares an existing UAN in the EPF joining declaration
When onboarding is committed
Then the product links the existing UAN to the employee record
And does NOT request or generate a new UAN (no duplicate)
And the first ECR generated for this employee carries the linked UAN
Given a new joiner with no existing UAN in an establishment covered for EPF (§06.1)
Then the joiner is routed to UMANG face-authentication UAN allotment and the case waits for the declared UAN
And an employer-side UAN task is created only for an International Worker or a citizen of Nepal or Bhutan
And an ESI IP registration task (an attended ESIC-portal action) is created if the joiner is ESI-eligible
And an absent or unseeded Aadhaar never blocks the register commit (FR-CHR-101 exclude-and-flag)
Given a joiner with no existing UAN who declines to provide Aadhaar, so cannot use UMANG face authentication
When onboarding is committed
Then the register commit proceeds and the joiner is paid from the first run
And the joiner's line is left out of each ECR while no UAN exists, recorded on the FR-CHR-101 exception register with an operator task and an employee notice saying what was excluded, why and how to fix it
And once a UAN is declared, the product prepares a Supplementary return for each affected wage month (EV-037) showing the system-computed s.7Q interest (EV-039)
And whether the employee share is deducted while the line is excluded follows the counsel-set FR-CHR-101 default, never a product assumption (§23)
```

**[Verified]** appointment-letter duty per OSH Code s.6(1)(f) (EV-057); EPF under the Employees' Provident Funds Scheme 2026, with the 12% rate re-notified for it by S.O. 3582(E) of 01.07.2026 (research r2/10; §06.9); UAN allotment by the employee through UMANG face authentication since 1 August 2025 (EPFO HO circular of 30.07.2025, read from an archived copy of EPFO's own PDF — research r4/04, finding 7; the round-four critic flags it as single-sourced, so pull it from the primary source before customer use). Note the §06 caveat: **the ESI regime after 22 Nov 2026 is unresolved** (§20 V-08, R-2) — FR-T-O03/O07 ESI paths must be effective-dated so they can switch to the successor scheme without a re-build.

**Acceptance — FR-T-O06 (state-prescribed appointment letter at ten or more workers):**

```gherkin
Given a new joiner (fresh hire or migrated employee) in an establishment of 10 or more workers (§06.1 counting unit)
When onboarding is completed
Then an appointment letter is generated in the form configured for that establishment's state, populated from the record (no re-keying)
And if no state form is configured, the letter is generated from the central template and flagged "state form unverified" to the operator
And it is issued and stored against the employee under its §14.7 retention class, whose period is a counsel-set parameter (no statutory period beyond EV-054's central-sphere register figures is stated in this PRD)
And a migrated employee with no appointment letter on file is surfaced as a review task, not as an asserted breach (back-issuance: counsel, §23 CR-37)
```

**Edge case — the migrated employee with no appointment letter on file.** A firm migrating mid-year has employees who joined before the Codes commenced on 21 Nov 2025 and never received a letter in any prescribed form. Whether the OSH Code requires a letter for employees appointed before commencement is not settled in our research, so onboarding-as-migration (§10.8) distinguishes "issue on hire" from "existing workforce without a letter" and surfaces the latter as a counsel-routed review task (§23 CR-37) — never as an asserted statutory breach, and never by silently skipping it. **[Reversed]** Earlier drafts asserted a from-employee-one mandate with a required one-time back-issuance; the duty attaches at ten workers (EV-057) and the back-issuance requirement is unverified.

**Worked example — the mid-year cutover joiner, where onboarding and migration are the same surface.** A 60-person firm migrates to us in September (mid-Tax Year). Its 60 existing employees enter through the *same* onboarding pipeline (§10.8) as a fresh hire, but each carries opening balances a new hire does not: YTD earnings, TDS already deducted by the same employer earlier in the year (not Form 122, ex-12B — same employer, different system), leave balances, gratuity accrual clock, and — critically — an **existing UAN and ESI IP that must be linked, never regenerated** (FR-T-O07). If onboarding regenerates a UAN for a migrated employee, the ECR breaks and the EPFO passbook forks. So FR-T-O07's "link existing UAN" path is not only a new-joiner nicety — it is the mechanism that makes mid-year migration (§16; §05 v1 exit criterion 5) work without a reconciliation break in the annual TDS certificate. Onboarding and migration share one code path; the difference is whether opening balances are zero.

**Edge case — probation confirmation.** A joiner on probation is on the payroll register from day one (FR-T-O10) but their *confirmation* is a performance event (a lightweight probation review, FR-T-P10 cycle type) that may carry a CTC revision on confirmation. The confirmation review therefore feeds the same effective-dated CTC path as an appraisal increment (FR-T-P15) — so probation confirmation is modelled as a performance cycle type, not a separate onboarding step, and its increment (if any) runs through FR-T-P16 arrears logic if confirmation is back-dated.

**Edge case — the ESI-eligibility decision at joining, and the contribution-period lock (FR-T-O07).** ESI applies to employees drawing wages up to **₹21,000/month** (₹25,000 for persons with disability) (Source: ESIC coverage page, limit effective 01.01.2017, fetched September 2026 — research r1/06; §06.3). Onboarding must make this eligibility call at joining because it decides whether an ESI IP registration is raised at all. Two India-specific traps the onboarding→payroll handoff must get right:

- **Mid-period wage crossing.** ESI runs on two fixed **contribution periods** — 1 April–30 September and 1 October–31 March (research r1/06; §06.3). If an employee is ESI-covered at the start of a contribution period and their wages *cross* ₹21,000 mid-period (e.g. an appraisal increment from FR-T-P15), they **remain covered and contributions continue until the end of that contribution period** — coverage does not stop the month the ceiling is breached. So the effective-dated CTC change (FR-T-P16) must not silently drop ESI mid-period; the register keeps contributing to period-end, then re-evaluates. Getting this wrong under-remits ESI and breaks the return.
- **Joining above the ceiling.** A joiner already above ₹21,000 is **not** ESI-eligible, so FR-T-O07 raises no IP registration. If a *later* structure change (rare) brings them under, when coverage begins is not captured in our research — §06.3 verifies only the exit rule — so the entry timing is a named parameter (`esi.entry_on_wage_drop`: from the month of the change, or from the next contribution-period boundary), with no shipped default, routed to §20 alongside V-08. It is the first-entry counterpart of §06.3's `esi.reentry_timing` (an employee back under the ceiling after an exit) and is resolved in the same read; if the statute treats the two alike, the two parameters collapse to one. The eligibility rule must therefore be effective-dated and period-aware, consistent with the §06 caveat that the **entire ESI regime after 22 Nov 2026 is unresolved (§20 V-08, R-2)** — so this ceiling and the period logic are configuration, not hard-coded constants. **[Verified]** on the current ₹21,000 ceiling and contribution-period mechanics; **[Hypothesis]** on the successor regime's ceiling — *kill/validate:* watch ESIC/MoLE notifications before 22 Nov 2026 (§20 V-08); do not hard-code ₹21,000.

**Worked example — the mid-month joiner's first ECR (FR-T-O10).** A joiner starts on **18 September** at ₹40,000/month gross. The register-commit step (FR-T-O10) must place them on the September run with a **prorated** first-month wage under the tenant's configured day-rate convention (§08) — 13 of 30 days on a calendar-day basis, and the first EPF ECR generated for September carries the prorated EPF wage against the **full, linked or newly allotted UAN** (FR-T-O07), not a proxy. The ECR file itself has no date-of-joining field — its eleven fields run from UAN to Refund of Advance (EV-035) — but EPFO accepts contributions only between the member's valid date of joining and date of leaving (EV-040), so an 18 September joining date recorded wrongly on the member's UAN record gets the September line rejected. **[Reversed]** An earlier version of this example placed a "date of joining" field inside the ECR. So the onboarding→register handoff must pass three things atomically to the engine: the effective joining date, the prorated first-period wage basis, and the correct UAN/IP identity. Getting proration right but joining-date wrong (or vice versa) is a rejected filing, which is the failure this module exists to prevent. This is why FR-T-O10 is P0 and v1: it is the exact seam where a talent action becomes a statutory filing input.

**Edge case — the tax-regime election at onboarding, and why the default is now the trap (FR-T-O05).** Since FY2023-24 the **new tax regime has been the default** unless the employee communicates a preference in writing (s.115BAC(6) in 1961-Act numbering — research r1/06 finding 40; §02); an employee must *affirmatively opt for the old regime* to claim HRA exemption, Chapter VI-A deductions (80C/80D/etc.) and home-loan interest. From Tax Year 2026-27 salary TDS falls under s.392 of the Income-tax Act 2025 (ex-s.192 — EV-050); the 2025-Act location of the default-regime rule is not in our mapping and is routed to §20. Onboarding must capture the regime election *before the first payslip*, because the employer deducts salary TDS on the declared regime from month one — a joiner who assumed the old regime but never elected it sees inflated TDS on payslip one, yet another first-month grievance the product exists to prevent. Two rules the handoff must encode: (a) if no election is made, the engine applies the new regime and *surfaces* that the employee left deductions unclaimed (rather than silently defaulting); (b) whether an employee may change the regime intimation mid-year for TDS purposes is unconfirmed in our research, so the engine supports an effective-dated recompute for the balance of the Tax Year behind a tenant policy flag — and because salary TDS averages the year's tax across remaining months on a **cumulative** basis, any such change is a recompute, not a clean-slate reset. This ties directly to the effective-dating requirement of the engine (§06) and to the Form 130 (ex-Form 16) reconciliation at year-end. **[Verified]** the s.392/s.192 mapping (EV-050) and the new-regime default in 1961-Act numbering — the latter read through vendor compliance content, not re-verified against a CBDT circular (r1/06 finding 40), so it rides on the same §20 desk check as the mid-year question below; **[Hypothesis]** on a mid-year change of the intimation — *kill/validate:* confirm the TDS-side rule against the current CBDT employer circular in §20 desk validation before enabling the policy flag.

**Acceptance — FR-T-O05 (tax-regime election at onboarding):**

```gherkin
Given a new joiner at onboarding who makes no tax-regime election
When the first payslip's salary TDS (s.392, ex-s.192) is computed
Then the engine applies the default new regime
And it records and surfaces that no old-regime deductions were claimed (not a silent default)
Given the tenant's policy flag permits a mid-year change and the same employee later elects the old regime within the same Tax Year
Then TDS for the remaining months is recomputed on a cumulative full-year basis, not reset month-by-month
And the regime election and its effective date are stored on the employee record for the Form 130 reconciliation
```

---

### 10.9 FRs — Performance: goals / KRAs / OKRs

Performance is v2 and carries **no per-unit meter** (§10.0 point 1; tier placement per §18). It earns its place in a *payroll* product for exactly one reason: the appraisal outcome becomes a revised CTC that must flow, effective-dated, into the engine (§10.10). Design the whole module backwards from that loop.

<!-- DIAGRAM: goal-to-increment-trace -->

| ID | Requirement | Pri | Phase | Money | Conf |
| --- | --- | --- | --- | --- | --- |
| **FR-T-P01** | Goal/KRA definition: set individual goals with metric, target, weight, and period; support the KRA/KPI vocabulary Indian firms actually use, not only OKR framing. | P1 | v2 | Bundled | [Verified] |
| **FR-T-P02** | Goal cascade/alignment: link individual goals to team/company objectives so a review can show line-of-sight; optional (many beachhead firms will not use it). | P2 | v2 | Bundled | [Hypothesis] |
| **FR-T-P03** | Goal progress updates and check-ins during the cycle, with a lightweight update UI usable from the employee app. | P2 | v2 | Bundled | [Hypothesis] |
| **FR-T-P04** | Weighted goal scoring that rolls up to a goal-component of the final rating, with the weighting scheme visible to the employee. | P1 | v2 | Bundled | [Verified] |
| **FR-T-P05** | **Goal versioning & mid-cycle change control:** a goal edited mid-cycle (target moved, weight changed, goal added/dropped) creates an audited new version with a reason and, where configured, an approver; the review scores against the goal version *in force for the period*, never a silently-changed target. | P1 | v2 | Bundled | [Verified] |

**Worked example — the mid-year joiner's pro-rata goals.** An employee joins on 1 October, half-way through an April–March cycle. Their goals are set for the six-month in-service window, not the full year, and FR-T-P05 records that window so the review does not penalise them against annual targets they were never set. When the increment outcome (FR-T-P15) is computed, the eligibility band can be prorated or the cycle can mark them "not yet due" — a configuration choice, but one the data model must support, because forcing a six-month employee onto a full-year curve produces a rating the employee can fairly contest. This is the goals-side mirror of the mid-year onboarding case (§10.8): the person entity is continuous, but the *period* they are measured over is not.

**Edge case — the moved goalpost (why FR-T-P05 exists).** A manager, mid-cycle, quietly raises a report's sales target from ₹80L to ₹1.2Cr, then rates them "below expectations" at review for missing ₹1.2Cr. Without versioning this is invisible and indefensible; with FR-T-P05 the review shows the target was ₹80L for the first eight months of the twelve-month cycle and ₹1.2Cr for the last four, and the score is computed against the version in force per period. This is the same integrity principle as effective-dated payroll rules (§10.10, §06) applied to performance data: *what was true when* is auditable, not overwritten. It is also what makes a rating survive a contested exit.

**Acceptance — FR-T-P05 (goal versioning):**

```gherkin
Given an active goal with target T1 and weight W1 in force from the cycle start
When the manager edits the goal to target T2 mid-cycle on date D
Then a new goal version (T2) is created effective D, with a captured reason and, if configured, an approval
And the prior version (T1) is retained, not overwritten
And the review's goal score is computed against the version in force for each sub-period, not only the latest
```

**Acceptance — the pro-rata mid-year joiner (FR-T-P01 × FR-T-P10 × FR-T-P18):**

```gherkin
Given an employee who joined on 1 October, mid-way through an annual (Apr–Mar) cycle
When goals are set and the FY-end review runs
Then goals are scored against the joiner's actual in-service window (Oct–Mar), not the full year
And the increment-eligibility band (FR-T-P18) is prorated or marked "not yet due" per tenant config
And the review record stores the measurement window so a contested rating shows the period actually assessed
```

**Edge case — the beachhead firm where half the workforce has no KRAs.** A 60-person manufacturer has 20 desk staff (who have goals) and 40 plant operators (who do not — their "performance" is attendance, output/piece-rate, quality-rejection rate and safety, not OKRs or KRAs). Forcing a goal-based review on operators is the wrong model and will simply not be used. So the module must support **metric-driven review populations** — a cycle whose scored inputs are operational KPIs sourced from attendance/production (§09) rather than manager-set goals — as distinct from **goal-driven populations** (desk staff on FR-T-P01 KRAs), and a tenant must be able to run one cycle for one population and none for the other (FR-T-P10 population scoping). This matters because the beachhead is not uniformly white-collar and the deskless segment is explicitly in scope (§09); a performance module that only speaks OKR is a desk-worker tool. **[Hypothesis]** on whether beachhead firms run *any* structured performance process for operators — *kill/validate:* if §20 interviews show operator performance is handled entirely through attendance/output in payroll (§09) and never a review cycle, keep FR-T-P10's population scoping but do not build operator-specific review templates ahead of demand (a demand hypothesis; default-safe is defer).

---

### 10.10 FRs — Performance: review cycles, calibration & the payroll feedback loop

<!-- DIAGRAM: performance-review-cycle -->

| ID | Requirement | Pri | Phase | Money | Conf |
| --- | --- | --- | --- | --- | --- |
| **FR-T-P10** | Configurable appraisal cycle: annual / half-yearly / quarterly / probation-confirmation, with defined windows, populations, and reviewers. | P1 | v2 | Bundled | [Verified] |
| **FR-T-P11** | Review form builder: goal score + competency ratings + qualitative sections, with self-appraisal, manager appraisal, and optional skip-level/reviewer stages. | P1 | v2 | Bundled | [Verified] |
| **FR-T-P12** | 360°/multi-rater feedback (peer, direct-report, manager) as an optional cycle type. | P2 | v2 | Bundled | [Hypothesis] |
| **FR-T-P13** | **Calibration / normalisation:** support bell-curve or grid-based rating calibration across a population, with a calibration UI for managers/HR — including the ability to run a cycle *without* forced distribution, because bell-curving is contested and many firms reject it. | P1 | v2 | Bundled | [Verified] |
| **FR-T-P14** | 9-box grid (performance × potential) for talent review and succession input. | P2 | v2 | Bundled | [Hypothesis] |
| **FR-T-P15** | **Increment / promotion outcome → CTC revision:** a completed appraisal produces a revised CTC (increment %, promotion band change) that generates an **increment/promotion letter** and pushes an **effective-dated CTC change** into the payroll engine. | P0 | v2 | Bundled | [Verified] |
| **FR-T-P16** | **Effective-dated retro/arrears from appraisal:** if the increment's effective date precedes the run date (common — appraisals effective 1 April but processed in June), the engine computes arrears against the *rule and structure versions in force for each intervening period*, with an audit trail (ties to §06 effective-dating requirement). | P0 | v2 | Bundled | [Verified] |
| **FR-T-P17** | Variable-pay / performance-bonus payout driven by rating, kept **distinct from statutory bonus** under Code on Wages s.26 (8.33%–20%; eligibility and calculation ceilings set by the appropriate Government — §06.7) — the two must never be conflated in the payslip or the register. | P1 | v2 | Bundled | [Verified] |
| **FR-T-P18** | Rating scale configuration (e.g. 1–5, 1–4, or descriptive bands) per tenant, with a fixed mapping from final rating to increment/promotion eligibility bands, so the review→increment step (FR-T-P15) is deterministic and auditable, not a manager's free choice. | P2 | v2 | Bundled | [Hypothesis] |

**Worked example — the calibration that must survive an audit.** A 120-person firm runs its FY26 cycle and applies a forced bell curve: 10% "outstanding," 20% "exceeds," 60% "meets," 10% "below." A manager rates all six of their reports "exceeds"; calibration (FR-T-P13) forces two down to "meets." The two down-rated employees will each get a smaller increment — a decision that is contestable and, if challenged, must be defensible. So calibration must record **who moved a rating, from what, to what, and why**, immutably. This is also why FR-T-P13 *must* offer a no-forced-distribution mode: bell-curving is contested and many firms reject it, and forcing it on a tenant that rejects it loses the deal. The product's opinion is "support both, default to neither." Where an AI output informs a rating or a calibration move, the move also carries a named confirmer and a decision snapshot (FR-T-D005).

**Acceptance — FR-T-P13 (calibration audit trail):**

```gherkin
Given a calibration session over a population with a chosen distribution mode (forced curve OR no forced distribution)
When a calibrator changes an employee's rating from R_old to R_new
Then the change records the actor, timestamp, R_old, R_new, and a required reason
And the pre-calibration rating is retained alongside the post-calibration rating (never overwritten)
And the employee's final increment eligibility (FR-T-P18) is derived from the post-calibration rating
And the full before/after distribution and every individual move are exportable for an audit or a contested-exit review
```

**Worked example — the appraisal that becomes an arrears run.** An employee is rated in the FY-end cycle; HR calibrates; the outcome is a 9% increment **effective 1 April 2026**, but the cycle only closes and is approved on **10 June 2026**. FR-T-P15 revises the CTC effective 1 April; FR-T-P16 detects that April and May have already been paid at the old CTC and computes two months of arrears — and it does so against the *statutory rule versions in force in April and May* (PF ceiling, PT slab, the 50% add-back version), not June's, because arrears recompute against the period's rules (§06). The June payslip shows current-month salary + April/May arrears as named lines, PF/TDS recomputed correctly. **This is the entire reason performance belongs in this product and not in a standalone tool** — a standalone performance app cannot run a compliant arrears computation; a payroll engine can, if performance feeds it structured, effective-dated outcomes.

**Acceptance — FR-T-P15 / FR-T-P16:**

```gherkin
Given a completed, approved appraisal with increment effective date D_eff
And the current payroll run date D_run where D_run > D_eff
And periods P1..Pn between D_eff and D_run already paid at the prior CTC
When the increment is committed to payroll
Then a new effective-dated CTC record starts at D_eff
And arrears for P1..Pn are computed as (new - old) per period
And each period's arrears use the statutory rule version in force in THAT period
And PF, PT, ESI and TDS on arrears are recomputed and shown as named lines
And an increment/promotion letter is generated and issued to the employee
```

**[Verified]** effective-dating/retro-recompute is a stated non-negotiable engine property (§06.10); statutory-vs-performance-bonus distinction (§06.7). Bonus ceilings: see the FR-T-P17 example below.

**Worked example — the two bonuses that must not be conflated (FR-T-P17).** A 120-person firm pays two things a payslip can carelessly merge into one "Bonus" line, and they are governed by entirely different rules:

1. **Statutory bonus** under Code on Wages s.26, which subsumed the Payment of Bonus Act 1965 — an *obligation*, not a reward. The Code fixes the band — at least 8.33% of wages earned (or ₹100, if higher) for an employee with at least 30 days' work in the accounting year, at most 20%, depending on allocable surplus — and delegates the eligibility and calculation ceilings to the appropriate Government (§06.7). The familiar **₹21,000/month** eligibility ceiling and **₹7,000-or-minimum-wage** calculation ceiling are legacy 2015-amendment figures; no re-notification under s.26 has been located, so they drive only a provisional, labelled computation until the tenant's state ceiling is confirmed (§06.7, §20). **[Reversed]** Earlier drafts marked these ceilings [Verified] under the Payment of Bonus Act as if it were current law. This is a payroll-engine computation, tied to allocable surplus and to the ceilings — it is **not** performance-driven, and a high performer above the eligibility ceiling is simply *ineligible*.
2. **Performance/variable pay** driven by the appraisal rating (FR-T-P17) — a *reward*, discretionary, uncapped, and entirely a management decision.

The rule the payslip and the statutory records must enforce: these appear as **two distinct named lines**; the statutory bonus flows into the bonus records and whatever annual return the period's regime requires (`bonus.annual_return_form` — legacy Form D; the Code-era return is unconfirmed, §06.7), and the performance bonus does not. Under the provisional legacy ceilings, an engineer rated "outstanding" on ₹1,20,000/month wages gets a large *variable payout* and **zero statutory bonus** (above the eligibility ceiling); a ₹18,000/month operator rated "meets" gets a small variable payout *and* a statutory bonus computed on the calculation ceiling (the notified amount or the minimum wage, whichever is higher). Merging them understates the statutory bonus liability in the annual return — a filing error, which is the whole thing this product exists to prevent (§01). **[Verified]** the s.26 band and base structure (§06.7); **[Hypothesis]** the Code-era ceilings and annual return — *kill/validate:* per §06.7, confirm the tenant state's notified ceilings before any post-21.11.2025 accounting year's bonus is paid.

**Acceptance — FR-T-P17 (bonus separation):**

```gherkin
Given an employee with monthly wages W and an appraisal-driven variable payout V
And the eligibility ceiling E_max and calculation ceiling C in force for the tenant's state and accounting year (§06.7)
When the payslip and registers are generated
Then statutory bonus is computed only if W <= E_max
And, if eligible, on a base of min(W, max(C, applicable minimum wage)) at the employer's declared rate in [8.33%, 20%]
And statutory bonus and performance variable V appear as two distinct named lines
And only the statutory bonus posts to the bonus records and the configured annual return
And the two are never summed into a single "Bonus" figure anywhere in the payslip or register
And where E_max or C is a legacy value awaiting confirmation, the computation is labelled provisional
```

---

### 10.11 FRs — Continuous feedback & 1:1s

| ID | Requirement | Pri | Phase | Money | Conf |
| --- | --- | --- | --- | --- | --- |
| **FR-T-P20** | Lightweight continuous feedback (praise/constructive), attachable to goals; visible in the next review. | P2 | v2 | Bundled | [Hypothesis] |
| **FR-T-P21** | 1:1 meeting notes and shared agendas between manager and report. | P2 | v2 | Bundled | [Hypothesis] |
| **FR-T-P22** | Pulse/engagement surveys (anonymous, aggregated) — explicitly a fast-follow, not a differentiator: engagement is the core product of specialists such as Culture Amp and 15Five (pricing pages read in research r2/07, not executed). | P2 | v2 | Bundled | [Verified] |

**[Hypothesis]** for the whole of §10.11: beachhead employers (20–200) may not use continuous-feedback tooling at all — it is mid-market/enterprise behaviour. *Kill/validate:* if §20 interviews show <20% of 50–200 firms want it, defer §10.11 entirely and keep only the review cycle (§10.10). Do not build ahead of demand here; with no per-unit meter on performance (§10.12), no direct revenue line recovers the build cost.

---

### 10.12 Monetisation — deferred items, consolidated, and the metering model

Per §12 and §18.5, the price of talent AI is zero, so **nothing in talent is a premium AI SKU**. What *is* monetisable is recruiting on a unit that is legibly incremental and that does not track headcount. Résumé-screening inference alone spans ~15× between a steady-state tenant (3%/month hiring, 40 CVs per hire, 3,000 tokens per CV) and a recruiting-heavy one (15%/month, 50 CVs, 10,000 tokens) on identical PEPM (research r2/03; the ratio is FX-invariant, the rupee absolutes are placeholders — §13). And incumbents already price recruiting *per recruiter*, not per employee: greytHR Recruit at ₹2,500/recruiter/month (pricing page captured 4 Sep 2026, read not executed — research r1/01, r1/08) and Keka's archived Hiring card at ₹1,500/₹2,500 per recruiter per month (EV-022).

| Surface | Monetisation | Why deferred / how metered | Conf |
| --- | --- | --- | --- |
| **Recruiting module (requisitions, ATS, multi-post)** | **Metered — per requisition or per hire, separate line from PEPM** | Cost scales with hiring velocity, not headcount: résumé screening alone spans ~15× across otherwise identical tenants (r2/03). Never blend into PEPM. Meter the requisition (FR-T-R01/R02) or the hire, per the plan; the price stays zero until §05's v2 turns on metered SKUs (§05.5 item 25), and its value is the §20.13 pricing parameter `recruiting_price_per_requisition` (a per-hire price, if T-2 chooses that unit, joins the same family). | [Verified] cost driver; [Hypothesis] buyer acceptance of either unit — §10.15 T-2 |
| **Job-board multi-post / ingest** | Metered (rolls into recruiting) | Board fees sit on the customer's own contracts (bring-your-own-contract, §10.1); our cost per post and per ingested application is processing and parsing inference (§13) — real, attributable (FR-T-X01) and unsized. | [Hypothesis] — cost unsized until FR-T-X01 data exists |
| **BGV / DigiLocker / UAN checks** | **Metered — per check, pass-through + margin** | Direct third-party vendor cost per check; a natural per-transaction charge, not a subscription. | [Hypothesis] |
| **Bulk document generation (offer/appointment/increment letters at volume)** | Metered above a bundled quota | Named in §18.5 as a legitimate incremental-value monetisation. Bundle a fair-use quota; meter overage. | [Hypothesis] — shares §18.5's kill criterion, §20 V-07 |
| **HR-analyst copilot (talent analytics: funnel, source-of-hire, review insights)** | **Metered — per admin seat** | Named in §18.5. Per-admin-seat, not per-employee: an HRMS is priced per employee but consumed per user (§13). | [Hypothesis] — shares §18.5's kill criterion, §20 V-07 |
| **Performance module (goals, reviews, calibration, feedback)** | **No per-unit meter; tier placement per §18** | **[Reversed]** rationale: the market does not give performance away — every tiered vendor gates it upward (EV-028; greytHR's PMS is a ₹35–45/user/month add-on). Keeping it free of a per-unit meter is a bill-shock wedge (research r1/01), not a response to a zero market price. | [Hypothesis] — tier placement is validated with §18's pricing work (§20) |
| **Onboarding handoff** | **Bundled (in payroll base)** | It produces statutory records; charging for it would be charging to be compliant. | [Verified] |
| **Talent AI assistant (JD drafting, resume summarisation, review-text drafting)** | **Bundled (cost-of-goods)** | AI is architecture, not the revenue line (§12). Never a paid SKU. | [Verified] |

**FR-T-X — metering & attribution (cross-cutting, P0 for the module):**

| ID | Requirement | Pri | Phase | Money | Conf |
| --- | --- | --- | --- | --- | --- |
| **FR-T-X01** | **Per-tenant recruiting metering built from day one of v1.5:** count requisitions, hires, posts, ingested applications, BGV checks, bulk docs, and copilot-seat usage, attributable per tenant/user/agent/model — *while the price may still be zero* (§13: retrofitting attribution after pricing exists is far harder than building it before). | P0 | v1.5 | — | [Verified] |
| **FR-T-X04** | Per-tenant and per-user rate limits + budget/degrade on all AI-backed talent features (resume parsing, JD/review drafting), because an HRMS is priced per employee but consumed per user (§13). | P0 | v1.5 | — | [Verified] |
| **FR-T-X05** | Recruiting cost dashboard for the tenant: source-of-hire, cost-per-hire, board ROI — the funnel intelligence that makes inbound-only worth paying for (§10.3 worked example). | P1 | v2 | Metered | [Hypothesis] |

**[Verified]** metering-from-v1 and rate-limit rationale are stated P0 requirements in §13 (Source: §13 AI unit economics, this PRD).

---

### 10.13 Cross-cutting acceptance criteria & candidate data protection (the criteria no single FR owns)

Recruiting has a data-protection wrinkle the rest of the HRMS does not: **candidates are not employees**, and two regimes govern their data across the life of this product.

<!-- DIAGRAM: candidate-lawful-basis-lifecycle -->

**[Reversed]** Earlier drafts stated, as current law, that DPDP s.7(i) lets an employer process employee data without consent and that only candidates need it. DPDP's substantive provisions, s.7(i) included, commence only on or about 13 May 2027 (EV-058). **Today** the SPDI Rules 2011 require consent in writing before sensitive personal data is collected — financial information (such as bank details) and biometric information among it — from candidates *and* employees (r.3, r.5(1); EV-060); DPDP itself creates no sensitive category (EV-059). When s.7(i) commences it disapplies consent and notice for employment purposes only, and the s.8 duties still apply (EV-058). Whether "for the purposes of employment" reaches recruitment-stage candidates and background verification is a counsel question (research r4/01; §23 CR-25), so the recruiting module captures candidate consent under both regimes and never relies on s.7(i) for a candidate. Who owes the SPDI written-consent duty is also with counsel; the product captures consent either way (§07 FR-CHR-100; §23).

| ID | Requirement | Pri | Phase | Money | Conf |
| --- | --- | --- | --- | --- | --- |
| **FR-T-X02** | **Candidate consent capture at point of application** (career site, board ingest), naming purpose (recruitment for this/related roles) and retention period; consent is logged and revocable. Each consent is a versioned record (§07 FR-CHR-100) stating whose artefact it is and which regime it serves; where sensitive personal data is collected (bank details at offer, financial checks at BGV) the SPDI written consent is captured before collection (SPDI r.3 and r.5(1) — EV-060; DPDP itself has no sensitive category — EV-059), using the counsel-cleared notice text for that regime (§23). | P0 | v1.5 | — | [Verified] |
| **FR-T-X03** | **Candidate data retention + erasure:** auto-purge or re-consent rejected-candidate data at the stated retention horizon; honour erasure requests; talent-pool retention (FR-T-R26) requires explicit extended consent. The horizon is a tenant-configured parameter (`candidate_retention_horizon`) whose value is set only on counsel sign-off — neither an immediate purge nor a one-year suppression is hard-coded (§23). Erasure is by crypto-shredding the candidate's subject key or by tombstone (§14.6.1a); a record under a `RetentionHold` (§14; §23 FR-LEG-026) is not erased, and the requester is told it is held. After erasure, any view or reconstruction (FR-T-D002) returns a tombstone — that a record existed, its class, and when and on what basis it was erased — never the content. | P0 | v1.5 | — | [Verified] |
| **FR-T-X06** | On candidate → employee conversion (onboarding commit), the product records the processing basis per regime for each data class. Today (SPDI) the written consents captured as a candidate or at onboarding carry forward and nothing shifts to a no-consent basis; from on or about 13 May 2027 (DPDP), employment-purpose processing may rely on s.7(i) while the consent artefacts stay on file (EV-058, EV-060). The audit trail shows *which basis under which regime* governed the data at each point. | P1 | v1.5 | — | [Hypothesis] |

**Consolidated Given/When/Then acceptance across the talent module:**

```gherkin
# Inbound-only invariant (§10.1)
Given any recruiting feature
When it sources or enriches a candidate
Then it uses only inbound applications, the customer's own board contracts, or LinkedIn's certified partner APIs
And it never searches, proxies, or scrapes a third-party candidate database

# Dedup (FR-T-R12)
Given the same person applies via two connected boards
When both applications are ingested
Then the pipeline shows exactly one candidate record with both source touchpoints

# Candidate consent (FR-T-X02/X03)
Given a candidate applies via the career site
Then consent (purpose + retention) is captured and logged before the record is usable
And on reaching the retention horizon without hire, the record is purged or re-consented, unless a RetentionHold applies (the horizon exists only once counsel sets candidate_retention_horizon — §10.17)

# Offer-to-onboarding continuity (FR-T-R54 -> FR-T-O01)
Given an accepted offer
When onboarding begins
Then CTC structure, personal, and contact data carry forward with zero re-keying

# Appraisal-to-payroll loop (FR-T-P15/P16)
Given an approved increment effective before the run date
Then payroll produces effective-dated arrears computed on each period's own statutory rule version

# Metering (FR-T-X01)
Given any billable recruiting event (requisition, hire, post, BGV check, bulk doc, copilot seat)
Then it is counted and attributed per tenant/user even while its price is zero

# AI-influenced decisions (FR-T-D001, FR-T-D002, FR-T-X11)
Given a candidate rejection at a stage where an AI output was shown to or used by the decider
Then the rejection records a named confirmer, a timestamp and a reason before it commits
And a decision snapshot is written at that moment and is never recomputed
```

---

### 10.13a Notifications, SLAs & the assistant surface (cross-cutting)

Talent is notification-heavy, and every notification is a cost surface (§13) and a frontline-reach constraint (§10.4). These FRs govern the plumbing shared by recruiting, onboarding, and performance.

| ID | Requirement | Pri | Phase | Money | Conf |
| --- | --- | --- | --- | --- | --- |
| **FR-T-X07** | Multi-channel notifications (in-app, email, WhatsApp) for stage moves, interview invites, offer status, onboarding tasks, review deadlines — with per-tenant channel config and the WhatsApp 250/24h rate-limit + queue (FR-T-R25); per-message WhatsApp cost attributed per tenant for FR-T-X01, and a tenant-level warning, with automatic fallback to email and in-app, if the tenant's WhatsApp Business Account has not moved to INR billing ahead of the 31 December 2026 deadline after which delivery stops (EV-088). | P1 | v1.5 | Bundled | [Verified] |
| **FR-T-X08** | SLA timers on approval steps (requisition FR-T-R03, offer FR-T-R52) and on candidate-response windows, with escalation on breach and a dashboard of breached SLAs. | P2 | v2 | Bundled | [Hypothesis] |
| **FR-T-X09** | Talent AI assistant (bundled, cost-of-goods): JD drafting from a requisition, résumé summarisation (FR-T-R22), review-text drafting, and interview-question suggestions — **rules-checked, never authoritative for any statutory or monetary field** (§13 rules-first/LLM-last), and never generating a CTC number, a PF figure, or a rating; runs under the FR-T-X11 rails. | P2 | v2 | Bundled | [Verified] |
| **FR-T-X10** | Every AI-drafted artefact (JD, summary, review text) is clearly marked as draft-for-human-edit and is logged for the per-tenant token/cost attribution required by FR-T-X01 and in the per-person AI disclosure record (FR-T-X11). | P1 | v1.5 | — | [Verified] |
| **FR-T-X11** | **AI safety rails on every talent AI call site** (FR-T-R11 where a model parses, FR-T-R22, FR-T-X09): (a) every outbound model call passes the §12 redaction/tokenisation chokepoint — Aadhaar, PAN, bank account/IFSC and biometric templates denied by default, enforced structurally in the call graph; (b) prompt and completion logs stay in India (log residency — §15, §17), a product decision that also keeps them inside CERT-In's separate requirement to hold 180 days of ICT logs within Indian jurisdiction (EV-062); (c) a per-tenant kill switch and per-feature opt-out, with every talent AI feature **default off** for RBI-, SEBI- and IRDAI-regulated tenants, because silently adding a model vendor can breach a regulated customer's own outsourcing obligations (EV-087); (d) the §12 sub-processor-change gate, wired to per-tenant consent; (e) a per-person AI disclosure record — candidate or employee — written at every call site; (f) a named human confirmer for any output feeding a hiring, appraisal, promotion, PIP or termination decision (FR-T-D001, FR-T-D005). | P0 | v1.5 | — | [Verified] |

**[Verified]** the rules-first / LLM-last invariant and per-tenant cost attribution are P0 platform decisions (§13). Applied to talent: the assistant may *draft* an offer letter's prose but the CTC numbers inside it come only from the deterministic offer builder (FR-T-R50/R51); the assistant may *summarise* a résumé but the parsed statutory fields (PAN, UAN) are human-verified (FR-T-R22, FR-T-O02).

---

### 10.13b Discrimination defensibility — AI-influenced decisions and complaint workflows (FR-T-D)

Recruiting and performance are where an Indian employer's discrimination exposure concentrates, and AI assistance makes that exposure harder to answer, not easier. The legal position these FRs are built on, and the limit on how they may be sold:

- **The duties run characteristic by characteristic; there is no general statute.** RPwD s.3(3) is actor-neutral and reverses the onus: an exclusion is discrimination unless shown to be "a proportionate means of achieving a legitimate aim" (EV-075). RPwD s.20 binds Government establishments only and is not the private-sector hook (EV-075). The Transgender Persons Act 2019 binds every establishment with no size threshold (EV-080); Code on Wages s.3(2)(ii) bars sex discrimination in recruitment at any size (EV-081), subject to a counsel question on whether the Code's exclusion of managerial and administrative staff narrows it for senior hiring (§23.10.2); the HIV and AIDS Act 2017 prohibition binds every employer, with a Complaints Officer at 100+ persons (20+ in healthcare) (EV-082). India has no general private-sector anti-discrimination statute for caste, religion, age or sexual orientation in employment (EV-084, dated September 2026); the SC/ST (Prevention of Atrocities) Act's economic-boycott offence is criminal, and whether an algorithmic rejection could be charged under it is untested and would need proof of imposition, not adverse effect alone — so it is never a product driver on its own (research r5/05 finding 33; §23.10.2).
- **The twenty-person line lands on the ICP floor.** Under RPwD Rule 3(2), a private establishment of twenty or more persons that receives a disability-discrimination complaint must initiate action or tell the complainant *in writing* how the act was a proportionate means of achieving a legitimate aim; the Commissioner disposes of a complaint within 60 days (30 in exceptional cases) (EV-076). No employer can write that letter about a decision no human made and no system can reconstruct.
- **No AI-specific rule we are aware of, and no case law yet.** We are not aware of any Indian statute or rule specific to AI in hiring as of September 2026, and DPDP has no right against automated decisions, to explanation or to human review (EV-066). We are not aware of any Indian case law on algorithmic hiring as of September 2026; the first case will be a matter of first impression (EV-084). MeitY's voluntary AI Governance Guidelines map "discrimination in hiring decisions using AI recruitment tools" to RPwD, the Transgender Persons Act, the Code on Wages and the SC/ST (PoA) Act — an illustrative table — and contemplate hardening voluntary measures into mandatory baselines (EV-073). Indirect discrimination turns on effect, not intent, and no quantitative threshold has been laid down (*Nitisha* — a State-employer case that reaches private employers only by analogy through RPwD s.3(3); EV-083).
- **Positioning: defensibility, never mandate.** RPwD s.90 deems the company and every person in charge guilty, with an express escape for anyone who proves he "had exercised all due diligence" (EV-079). These FRs are how a founder or HR head evidences that diligence. Saying they are legally required is false and checkable (FR-T-D012; §23).

| ID | Requirement | Pri | Phase | Money | Conf |
| --- | --- | --- | --- | --- | --- |
| **FR-T-D001** | **Named human confirmer on every AI-influenced rejection.** A rejection or knock-out at any stage where an AI output (parse, summary, suggested question, ranking) was shown to or used by the decider records a named human confirmer, a timestamp and a free-text reason; without all three the rejection cannot commit. No model output auto-rejects, and no AI shortlist is final. Rationale (defensibility, not a legal mandate — FR-T-D012): at twenty or more persons, a disability-discrimination complaint obliges a written, reasoned response (Rule 3(2) — EV-076), and no employer can write one about a decision no named human made. The control runs for every tenant regardless of size. | P0 | v1.5 | — | [Verified] |
| **FR-T-D002** | **"Reconstruct this decision."** For any candidate decision, produce the criteria applied, the model version and configuration in force, the features that drove any score, the confirmer and the recorded reason — from a snapshot written at decision time, never recomputed, so it survives retraining and configuration changes. It is the evidence for a Rule 3(2) response (FR-T-D008) and for production of records, whose failure is punishable under RPwD s.93 at up to ₹25,000 per offence plus up to ₹1,000 per day of continued failure (EV-079). The snapshot's retention basis, and its interplay with candidate erasure (FR-T-X03) once DPDP commences, go to counsel (§23 CR-39). Opening a complaint case or receiving notice of proceedings places the case's snapshots under a `RetentionHold` that no erasure request or retention expiry releases (§23 FR-LEG-026); an erased snapshot reconstructs only as the FR-T-X03 tombstone, and the reconstruction says so rather than presenting a partial record as complete. | P0 | v1.5 | — | [Verified] |
| **FR-T-D003** | **Adverse-impact monitoring** on shortlist and stage pass-rates (and rating and promotion distributions under FR-T-D005) as a standing employer report, computed only from attributes a candidate or employee has voluntarily self-declared for monitoring, under a separate consent record for that purpose (FR-CHR-100), and never from inferred attributes. Data collected for reasonable accommodation or the Rule 9(1) record (FR-T-D004, FR-T-D007) is not repurposed for it, and HIV status is never collected for it. Results are shown only in aggregate and are suppressed for any cell smaller than a named parameter, `adverse_impact_min_cell_size`, because at 20–200 employees a small cell identifies a person; the value is an owner decision with counsel (§10.17). **No quantitative threshold is committed or presented as a legal line** — no four-fifths or other ratio test — because *Nitisha* declined to lay one down and held that the absence of statistical evidence cannot alone defeat a claim (EV-083). | P1 | v2 | Bundled | [Verified] |
| **FR-T-D004** | **Structural bar on protected attributes.** HIV status, disability status, gender identity, caste and pregnancy/maternity status are never ingested as, or inferred into, a scoring feature, model input, knock-out rule or ranking signal; scoring services have no read path to them. Disability data is collected only for reasonable accommodation and the Rule 9(1) record (FR-T-D007), in a walled store — the CCPD template (EV-077) asks the EOP to state that disability information will not prejudice an application (research r5/05). An accommodation record never carries a charge to the person: RPwD Rule 3(4) bars an establishment from compelling a person with disability to pay any part of the cost of reasonable accommodation (research r5/05 finding 3), so no cost-recovery or payroll deduction may be linked to one. HIV testing is never a pre-requisite for employment (HIV Act s.3(l) — research r5/05). A sex-based criterion in a requisition, knock-out or score is blocked unless the tenant records the statutory prohibition or restriction on women's employment it relies on (Code on Wages s.3(2)(ii) — EV-081). | P0 | v1.5 | — | [Verified] |
| **FR-T-D005** | **The same controls for performance and exit decisions.** Any AI output that feeds an appraisal rating, a calibration move, an increment or promotion recommendation, a PIP or a termination recommendation carries a named confirmer and timestamp (the FR-T-D001 pattern), a reconstruction snapshot (FR-T-D002) and adverse-impact monitoring (FR-T-D003). The CCPD template's reach into performance evaluation is permissive ("could"), so this is defensibility, not compliance (EV-077; research r5/05). On promotion specifically, the product does not rely on RPwD s.20, which binds Government establishments (EV-075; EV-K22); research notes that s.20(3) — no promotion denied merely on the ground of disability — is the one sub-section of s.20 worded without the "Government establishment" qualifier (r5/05 finding 1), and whether it reaches a private employer is a counsel question (§23). The controls apply the same way whatever the answer. | P0 | v2 | — | [Verified] |
| **FR-T-D006** | **Equal Opportunity Policy generator.** Every establishment must publish an EOP (RPwD s.21, Rule 8(1)); content per Rules 8(3)(a)–(e) at twenty or more employees — including the *manner of selection*, filled from the tenant's live AI and confirmer configuration so the published policy cannot drift from what the system does (§23 FR-LEG-022), and a liaison officer for recruitment of persons with disabilities — and the facilities-and-amenities variant of Rule 8(4) below twenty; structured to the CCPD template of 5 November 2024; published on the website or at the premises (Rule 8(2)). Registration under s.21(2) is a document-preparation and correspondence workflow: there is no portal and no prescribed form for private establishments (EV-077). | P1 | v1.5 | Bundled | [Verified] |
| **FR-T-D007** | **Disability employment record** holding exactly the five Rule 9(1) particulars — number of persons with disabilities employed and the date from which each is employed; name, gender and address; nature of disability; nature of work rendered; kind of facilities provided — with an export for production on demand. Rule 9(1) applies to the establishments within Rule 8(3), which for a private employer means **twenty or more employees**; production on demand under Rule 9(2) binds every establishment, so below twenty the product keeps the record available but labels it "not prescribed at this size" (research r5/05 finding 7; §23.10.2). **Never Form III** — Rule 14 prescribes it for Government establishments only, and private establishments have no prescribed format (EV-078). Failure to produce is the s.93 exposure (EV-079). | P1 | v1.5 | Bundled | [Verified] |
| **FR-T-D008** | **RPwD Rule 3(2) complaint workflow.** For a private establishment of twenty or more persons, a disability-discrimination complaint opens a case with exactly two exits — initiate action under the Act, or issue a written reasoned response on how the act was a proportionate means of achieving a legitimate aim — assembled from FR-T-D002 snapshots. The case tracks the Commissioner's 60-day disposal clock (30 days in exceptional cases) (EV-076); the employer's internal response target is a named parameter (`rpwd_response_target_days`), because no employer-side deadline is in our evidence. Intake is the single statute-routing intake of §23 FR-LEG-025, so a tenant below twenty persons sees no Rule 3(2) case type and a complaint engaging two statutes opens linked cases. | P1 | v1.5 | Bundled | [Verified] |
| **FR-T-D009** | **Transgender Persons Act complaint officer and EOP** for every establishment, with no size threshold: designation of a complaint officer (s.11, Rule 13(1)), complaint intake, and the Rule 13 clocks as configurable parameters with these defaults — designation within 30 days (`tg.designation_days`), enquiry within 15 days of a complaint (`tg.enquiry_days`), action within a further 15 days (`tg.action_days`), grievance resolution within 30 days (`tg.resolution_days`); and the Rule 12 equal opportunity policy for transgender persons, published on the website or at conspicuous places and covering infrastructure (including unisex toilets), applicability of service conditions, confidentiality of gender identity and complaint-officer details (EV-080; Rules 12–13 from a legal-database reproduction of G.S.R. 592(E) dated 25 September 2020, consistent with the Supreme Court's summary in *Jane Kaushik* — research r5/05 findings 27–28; pull from the primary source before customer use, and never quote rule text in customer copy until then). *Jane Kaushik* directed the States and Union Territories to ensure every establishment designates a complaint officer (direction 199(iv) — research r5/05 finding 27; the case is EV-083). The Act's s.18 does not criminalise employment discrimination; the remedy runs through the complaint officer, Rule 13 and writ proceedings (r5/05 finding 25) — so no copy threatens a criminal penalty. That reading is of the Act as it stands: the 2026 Amendment is reported to add new offences, including one relating to employment exploitation, whose text research has not verified (r5/05 finding 25), so the s.18 position is re-read when the Amendment commences. EOP and onboarding copy that turns on the protected-class definition carries a version flag for the 2026 Amendment, which commences only on separate notification and narrows the class (EV-080; §23 CR-40). | P1 | v1.5 | Bundled | [Verified — mirror] |
| **FR-T-D010** | **HIV and AIDS Act workflows.** Complaints Officer designation and intake for establishments of 100 or more persons (20 or more in healthcare); for every employer, a documented-justification pack that must exist before any termination of a protected person — the independent healthcare provider's written assessment and the employer's written statement of hardship — because without them the Act presumes against the employer (EV-082; research r5/05). The s.3 prohibition is enforced by a State-appointed Ombudsman, and failure to comply with an Ombudsman's order is punishable with a fine of up to ₹10,000 plus up to ₹5,000 for each day it continues (s.38 — r5/05 finding 31), so the workflow tracks any Ombudsman order as a case with its own compliance date. | P2 | v2 | Bundled | [Verified] |
| **FR-T-D011** | **POSH Internal Committee record.** Every employer constitutes an Internal Committee (POSH Act s.4(1)); the ten-worker line is s.6(1)'s route to the district Local Committee where no IC exists, not an exemption (EV-056). The product holds the IC constitution order and membership and a complaint intake that routes to the IC; a tenant below ten workers is shown the Local Committee route instead (§23 FR-LEG-025). POSH is a harassment statute, not a hiring-discrimination duty (research r5/05). The IC's further duties — including any annual report — are not re-verified in research, so no feature beyond the record and intake is built until they are (§23 CR-49). | P1 | v1.5 | Bundled | [Verified] |
| **FR-T-D012** | **Claims control.** No product copy, sales collateral or in-app text describes an FR-T-D control as legally required, or cites a foreign decision or a not-yet-in-force DPDP provision as current Indian law; customer-facing legal statements about these controls are product surface with a named owner and require clearance (§23). The sanctioned framing is the s.90 due-diligence defence (EV-079). | P0 | v1.5 | — | [Verified] |

The twelve FRs above state the controls. The rest of §10.13b specifies them to build depth:
what "AI-influenced" means and how the product knows, the data definitions behind the
confirmer and the snapshot, the state machines that commit a decision and run a complaint
case, the measurement spec for adverse impact, the EOP generator's clause map, and the
negative cases the system must refuse. Nothing here restates §23.10, which owns the legal
analysis; §10.13b owns the machinery.

#### 10.13b.1 What "AI-influenced" means — the taint model

FR-T-D001 turns on the phrase "AI output was shown to or used by the decider". That phrase has
to be a computable predicate, not a judgement call made after a complaint arrives, because the
question "was this decision AI-influenced?" is asked years later by someone assembling a Rule
3(2) response and it must be answered from records written at the time (EV-076).

**Definition — influence.** A person decision is *AI-influenced* when, at or before the moment
it commits, at least one AI output about that person, for that requisition or cycle, was either
(a) rendered on a surface the decider could see, (b) used to order, filter or group the set the
decider acted on, or (c) written into a field the decider relied on. Influence is recorded as a
fact at render time, not inferred at decision time.

**The four influence classes.** Each class is a value of `DecisionInfluence.class`.

| Class | What happened | Recorded when | Example call site |
| --- | --- | --- | --- |
| `SHOWN` | An AI artefact about this person was rendered to this user in this context | At render, by the surface that rendered it | Résumé summary in the candidate card (FR-T-R22); JD-derived question suggestions in the scorecard (FR-T-X09) |
| `ORDERED` | An AI output determined the order, grouping or filtering of the list the decider acted from | At list materialisation | A ranked shortlist view; a "best-match first" sort on a requisition's applicant list |
| `FIELD` | An AI output populated a structured field that a rule, knock-out or human read | At field write | Parsed years-of-experience used by a screening rule (FR-T-R23); parsed qualification used in a knock-out |
| `NONE` | No AI artefact was rendered, ordered or written for this person in this context | Default; the absence of any of the above | A recruiter rejects from an unsorted list with no summary rendered |

**Taint rules.** These are the propagation rules the decision record implements. They are
deliberately over-inclusive: a decision wrongly marked AI-influenced costs one extra confirmer
click, and a decision wrongly marked clean costs the tenant the one record it needs (FR-T-D002).

| # | Rule | Rationale |
| --- | --- | --- |
| TR-1 | Influence attaches to the triple *(person, requisition-or-cycle, stage)*, not to the session or the user | A second recruiter who never saw the summary still acts on a tainted pipeline position |
| TR-2 | Influence is sticky forward through stages within the same requisition: once `SHOWN`, `ORDERED` or `FIELD` is recorded at stage *k*, every later decision on that person in that requisition is AI-influenced | The summary that shaped the screen still shapes the interview panel's frame |
| TR-3 | Influence does not propagate backwards in time, and does not propagate to a different requisition unless the artefact is re-rendered there | A talent-pool record re-surfacing later is a fresh context with its own render events |
| TR-4 | Disabling an AI feature does not clear taint already recorded | The record describes what happened, not what is configured now |
| TR-5 | A bulk action inherits the union of the influence classes of every person in the batch | Bulk reject on a ranked list is the highest-risk single action in the module |
| TR-6 | Purely administrative transitions with no adverse effect on the person — scheduling, reminders, document requests, a stage move that neither advances nor ends candidature — carry the taint but do not invoke the confirmer gate | The gate guards *adverse* decisions; taint is still needed for FR-T-D003 populations |
| TR-7 | An AI artefact rendered to the *candidate* rather than the decider — a chatbot reply, a status explanation — is recorded but does not taint the employer's decision unless it also reached a decider surface | Two different disclosure surfaces (FR-T-X10 and §12) |
| TR-8 | Where the product cannot determine whether an artefact was rendered — a degraded client, a lost telemetry write — influence resolves to `SHOWN` | Fail toward the control, never away from it |

<!-- DIAGRAM: fr-talent-ai-influence-taint -->

**The decision surface inventory.** Every place a talent AI feature can reach a person decision,
with the control that applies. A call site absent from this table may not render an AI artefact
on a decision surface; adding one is a change to this table and to the EOP's manner-of-selection
clause (FR-LEG-022).

| Call site | AI feature | Artefact | Decisions it can touch | Class | Controls |
| --- | --- | --- | --- | --- | --- |
| Applicant list | Ranking or match sort | Order of the list | Screen-out, shortlist, bulk reject | `ORDERED` | D001, D002, D003, D013 |
| Candidate card | Résumé summarisation (FR-T-R22) | Prose summary | Screen-out, interview invite | `SHOWN` | D001, D002, D010 where applicable, D013 |
| Résumé parse | Field extraction (FR-T-R22) | Structured fields | Knock-out rules (FR-T-R23), eligibility | `FIELD` | D001, D002, D019, human verification of statutory fields |
| Scorecard | Question suggestions (FR-T-X09) | Suggested questions | Interview outcome | `SHOWN` | D001, D002 |
| Requisition editor | JD drafting (FR-T-X09) | JD prose | The criteria themselves | `SHOWN` at the requisition, not the person | D019, D020, EOP clause (D024) |
| Review form | Review-text drafting (FR-T-X09) | Prose | Rating, calibration | `SHOWN` | D005, D001 pattern, D002 |
| Calibration board | Any AI-derived distribution hint | Order or flag | Calibration move, increment, promotion | `ORDERED` | D005, D030 |
| Assistant chat | Free-form answer referencing a person | Prose | Any of the above | `SHOWN` | D001, D002, §12 chokepoint |

**Acceptance — the taint model:**

```gherkin
Given a recruiter opens a requisition's applicant list sorted by an AI match score
When the list renders
Then an influence record of class ORDERED is written for every person in the rendered page
And each record carries the model binding id, the surface, the user and the render timestamp

Given a recruiter rejects a candidate at the screen stage on Monday with a summary rendered
And the tenant disables résumé summarisation on Tuesday
When the same candidate is rejected at a later stage of the same requisition on Wednesday
Then the Wednesday decision is still AI-influenced by TR-2 and TR-4
And the confirmer gate applies to it

Given telemetry for a render event is missing
When a decision is committed for that person and context
Then influence resolves to SHOWN under TR-8
And the decision record states that the class was resolved by the fail-toward-control rule
```

**Negative cases.**

| Attempt | Expected behaviour |
| --- | --- |
| A surface renders an AI artefact without writing an influence record | The render is refused. No AI artefact reaches a decision surface through a path that cannot record it (FR-T-D013 AC2) |
| An integration reads the ranked list through the API and rejects candidates outside the UI | The API decision endpoint requires the same confirmer payload; without it the call is rejected with a reason code, not silently accepted |
| A user asks the assistant to "reject everyone below the cut line" | Refused: no AI output commits an adverse decision (FR-T-X09, §12.5). The assistant may open the filtered list for a human to act on, which records `ORDERED` |
| Taint is cleared by re-importing the candidate as a new record | Dedup (FR-T-R12) links the records; influence follows the person entity, and the reconstruction shows the merge |

| ID | Requirement | Pri | Phase | Money | Conf |
| --- | --- | --- | --- | --- | --- |
| **FR-T-D013** | **Influence record at render.** Every AI artefact rendered, ordered or written on a talent decision surface writes a `DecisionInfluence` record carrying the person, the context (requisition or cycle and stage), the class (`SHOWN` / `ORDERED` / `FIELD`), the model binding id (FR-T-D031), the surface, the acting user and the timestamp. Taint propagates by rules TR-1 to TR-8. | P0 | v1.5 | — | [Verified] |
| **FR-T-D031** | **Talent model binding register.** Every talent AI call site resolves to a *binding* — an identifier, the model and version it calls, the prompt-template version, the configuration hash (thresholds, allow-list version, retrieval scope) and an effective date range. Bindings are append-only; a change creates a new binding. Snapshots (FR-T-D002) reference the binding id and copy the values that fit, so a reconstruction survives the model being retired. | P0 | v1.5 | — | [Verified] |

---

#### 10.13b.2 Data definitions — decision, influence, snapshot

Three entities carry the whole of FR-T-D001 and FR-T-D002. They are specified here at field
level because a partially populated decision record is worthless in exactly the situation it
exists for. §14 owns the physical model and the retention classes; this is the logical contract.

**Entity `TalentDecision`** — one row per adverse or advancing decision about a person in a
context. Written inside the same transaction as the state change it records.

| Field | Type | Null | Source | Mutable | Notes |
| --- | --- | --- | --- | --- | --- |
| `decision_id` | opaque id | no | system | no | Primary key; quoted in any reconstruction pack |
| `tenant_id` | opaque id | no | session | no | |
| `subject_ref` | person ref | no | context | no | Candidate or employee entity; survives dedup merges (FR-T-R12) |
| `context_type` | enum | no | caller | no | `REQUISITION`, `REVIEW_CYCLE`, `PIP`, `EXIT` |
| `context_ref` | opaque id | no | caller | no | |
| `stage` | string | no | pipeline config | no | Stage key as configured at decision time (FR-T-R20), copied by value |
| `decision_type` | enum | no | caller | no | `ADVANCE`, `REJECT`, `KNOCKOUT`, `HOLD`, `RATING`, `CALIBRATION_MOVE`, `INCREMENT_RECO`, `PROMOTION_RECO`, `PIP_START`, `TERMINATION_RECO` |
| `adverse` | boolean | no | derived from `decision_type` | no | Drives the confirmer gate; the mapping is in §10.13b.3 |
| `influence_class` | enum | no | derived per TR-1 to TR-8 | no | `NONE` where no influence record exists |
| `confirmer_user_ref` | user ref | yes | gate | no | Required when `adverse` and `influence_class` is not `NONE` |
| `confirmer_display_name` | string | yes | gate | no | Copied by value at commit so a deleted user does not blank the record |
| `confirmed_at` | timestamp with zone | yes | gate | no | The confirmer's own action time, not the batch write time |
| `reason_code` | enum | yes | FR-T-R28 taxonomy | no | Optional structured reason where the taxonomy is configured |
| `reason_text` | free text | yes | gate | no | Required when `adverse` and `influence_class` is not `NONE` |
| `snapshot_ref` | opaque id | yes | snapshot writer | no | Required whenever `influence_class` is not `NONE` |
| `committed_at` | timestamp with zone | no | system | no | |
| `committed_by` | user or service ref | no | session | no | May differ from the confirmer only on the batch path (FR-T-D015) |
| `reversal_of` | decision id | yes | caller | no | Set on a reversing decision; the original is never edited |
| `retention_class` | enum | no | §14 | no | See §10.13b.4 for the hold interplay |

**Entity `DecisionInfluence`** — one row per render, order or field-write event. Many rows may
precede one decision; the decision's `influence_class` is the strongest class among them.

| Field | Type | Null | Notes |
| --- | --- | --- | --- |
| `influence_id` | opaque id | no | |
| `subject_ref`, `context_type`, `context_ref`, `stage` | as above | no | Keys the taint triple of TR-1 |
| `class` | enum | no | `SHOWN`, `ORDERED`, `FIELD` |
| `binding_id` | opaque id | no | FR-T-D031 |
| `surface` | enum | no | The call site, from the §10.13b.1 inventory |
| `artefact_digest` | hash | no | Digest of the rendered artefact, not the artefact; the artefact itself lives with the draft record (FR-T-X10) |
| `rendered_to_user_ref` | user ref | yes | Null for `FIELD` writes with no human render |
| `rendered_at` | timestamp with zone | no | |
| `resolution` | enum | no | `OBSERVED` or `ASSUMED` — `ASSUMED` records a TR-8 resolution |

**Entity `DecisionSnapshot`** — the reconstruction payload, composed once, never recomputed.
Its five required blocks answer the five questions a Rule 3(2) response asks: what was applied,
what system produced the output, what drove it, who decided, and why.

| Block | Contents | Captured |
| --- | --- | --- |
| `criteria` | The requisition's published criteria, the screening and knock-out rules as configured, the scorecard definition, the stage's advance conditions | By value |
| `model_binding` | Binding id, model and version, prompt-template version, configuration hash, allow-list version, effective range | By value |
| `attribution` | The features that drove any score, with their values as used and the score produced; where a feature is derived, the derivation name and its input field names | By value |
| `confirmation` | Confirmer display name and user ref, `confirmed_at`, reason code and text, the surface the confirmation was made on, and whether the confirmer was a delegate | By value |
| `context` | Stage, pipeline version, requisition version, tenant AI configuration in force, kill-switch state, the tenant's threshold facts and counting units at the time (§10.13b.9) | By value |
| `inputs_digest` | Digest of the candidate record fields the decision read, listed by field name with their digests — never the values | By value for the digest, by reference for anything erasable |

**Worked example — a committed snapshot (illustrative payload; the candidate is fictional and
no value here is evidence of anything):**

```json
{
  "snapshot_id": "dsnap_8f2a…",
  "decision_id": "dec_41c9…",
  "written_at": "2027-02-11T14:22:09+05:30",
  "criteria": {
    "requisition_version": 3,
    "must_have": ["field service experience", "two-wheeler licence"],
    "knockouts": [{"rule": "R-17", "field": "licence_two_wheeler", "op": "is_true"}],
    "stage_advance": "two panel scores at or above 3 of 5"
  },
  "model_binding": {
    "binding_id": "bind_resume_summary_v7",
    "model": "<vendor and version as bound>",
    "prompt_template_version": "pt_14",
    "config_hash": "c0a1…",
    "feature_allowlist_version": "fal_5"
  },
  "attribution": {
    "score": null,
    "features_used": [
      {"name": "years_experience_parsed", "value": 2, "source": "FIELD write, binding bind_resume_parse_v4"},
      {"name": "licence_two_wheeler", "value": false, "source": "application form"}
    ],
    "knockout_fired": "R-17"
  },
  "confirmation": {
    "confirmer": "A. Rao (user_2291)",
    "confirmed_at": "2027-02-11T14:22:04+05:30",
    "reason_code": "MISSING_MUST_HAVE",
    "reason_text": "No two-wheeler licence; the role is 80% field visits.",
    "surface": "candidate_card",
    "delegate": false
  },
  "context": {
    "influence_class": "SHOWN",
    "ai_features_enabled": ["resume_summary", "resume_parse"],
    "kill_switch": "off",
    "headcount_facts": {"persons": 64, "employees": 61, "workers": 58, "as_of": "2027-02-01"}
  },
  "inputs_digest": {
    "candidate.resume_file": "sha256:9d1b…",
    "candidate.application_answers": "sha256:44e0…"
  }
}
```

Two things about that payload are load-bearing. First, `attribution.features_used` names the
knock-out that fired and the parsed field it read — which is what lets a reviewer see that a
*parse error* on a document, not a judgement about the person, ended the candidature. Second,
`context.headcount_facts` is copied by value, because whether Rule 3(2) applied to this tenant
on this day is a fact about that day (EV-076) and the tenant's headcount changes.

---

#### 10.13b.3 The confirmer gate — states, transitions and who may trigger them

The gate is the enforcement point for FR-T-D001. It is specified as a state machine because the
failure this control exists to prevent — a rejection that commits with no named human against it
— is a race and a retry problem, not a UI problem. Presented as a transition table per the PRD's
convention for machines (§08 uses the same shape for the payroll month).

**Which decisions the gate guards.** `adverse` is derived, never set by the caller.

| `decision_type` | `adverse` | Gate applies when influence is not NONE | Notes |
| --- | --- | --- | --- |
| `REJECT` | yes | yes | Includes rejection at any stage and after offer |
| `KNOCKOUT` | yes | yes | An automated knock-out is *proposed*, never committed, while influence is not NONE (FR-T-D014 AC3) |
| `HOLD` | no | no | Non-adverse; taint recorded for FR-T-D003 populations |
| `ADVANCE` | no | no | Recorded; no gate |
| `RATING`, `CALIBRATION_MOVE` | yes | yes | §10.10; FR-T-D005 |
| `INCREMENT_RECO`, `PROMOTION_RECO` | yes where the outcome is below the employee's current band or declines a recommendation | yes | The comparison is to the band in force, not to peers |
| `PIP_START`, `TERMINATION_RECO` | yes | yes | Also invokes §10.13b.10's packs |

**States.**

| State | Meaning |
| --- | --- |
| `PROPOSED` | A decision exists as an intent — from a UI action, a knock-out rule, a bulk selection or an API call — and has not changed anything |
| `GATE_PENDING` | The decision is adverse and influenced; the gate is waiting for a named confirmer, a timestamp and a reason |
| `SNAPSHOT_PENDING` | Confirmation is complete; the snapshot is being composed inside the commit transaction |
| `COMMITTED` | The state change and the decision record are durable together |
| `ABANDONED` | The proposal lapsed or was withdrawn before commit; nothing changed for the person |
| `REVERSED` | A later decision reversed this one; this record is untouched and the reversal points at it |

**Transition table.**

| # | From → To | Event | Guard | Side effect | Who may trigger |
| --- | --- | --- | --- | --- | --- |
| G1 | — → `PROPOSED` | Decision intent raised | Actor has the decide permission on the requisition or cycle (§07 permissions matrix) | Influence class resolved per TR-1 to TR-8 | Recruiter, hiring manager, reviewer, API client, rules engine |
| G2 | `PROPOSED` → `COMMITTED` | Commit | `adverse` is false, or `influence_class` is `NONE` | Decision record written; no snapshot required unless the tenant has opted into snapshot-always | Same as G1 |
| G3 | `PROPOSED` → `GATE_PENDING` | Commit attempted | `adverse` is true and `influence_class` is not `NONE` | The surface asks for confirmer, reason; nothing changes for the person | System |
| G4 | `GATE_PENDING` → `SNAPSHOT_PENDING` | Confirmation submitted | Confirmer is a named natural person with an active authenticated session, holds the decide permission, and is not the tenant's service account; reason text is non-empty after trimming | `confirmer_*`, `confirmed_at`, `reason_*` captured | The confirmer, in person |
| G5 | `GATE_PENDING` → `ABANDONED` | Withdrawn, or the proposal ages past the session limit | — | Nothing changes for the person; the abandonment is logged with the proposer | Proposer, or system on expiry |
| G6 | `SNAPSHOT_PENDING` → `COMMITTED` | Snapshot composed | Every required block of §10.13b.2 is present | State change and decision record commit atomically; candidate notification queued | System |
| G7 | `SNAPSHOT_PENDING` → `GATE_PENDING` | Snapshot composition fails | — | The commit is rolled back; the user is told the decision cannot be recorded and why (FR-T-D017) | System |
| G8 | `COMMITTED` → `REVERSED` | A reversing decision commits | The reversing decision passes the gate in its own right | A new decision record with `reversal_of` set; the original is immutable | Recruiter or hiring manager with the reverse permission |
| G9 | `COMMITTED` → `COMMITTED` | Reason corrected | Within the tenant's correction window, by the original confirmer | An amendment record is appended; the original reason text stays readable in the reconstruction | The original confirmer |

<!-- DIAGRAM: fr-talent-confirmer-gate-states -->

**Who may be a confirmer.** A confirmer is a named natural person. The gate refuses: a service
account or integration principal; a shared login whose credential is marked shared in §07; the
user who is the subject of the decision; and an automation acting on a schedule. A delegate is
allowed where the tenant has configured delegation, and the delegation is recorded in the
snapshot's `confirmation.delegate` flag with the delegating user — because "the hiring manager's
assistant clicked it" is a fact a reviewer needs, not a detail to hide.

**Bulk.** Bulk rejection is where this control is most likely to be defeated in practice, so
FR-T-D015 constrains it rather than banning it: a bulk adverse action on an influenced set
requires either a per-person reason or a single common reason plus an explicit acknowledgement
that names the count and the requisition, the batch is capped by `bulk_action_max_batch`
(§10.17), and one decision record with its own snapshot is written per person — never one record
for the batch. The confirmer is the human who acknowledged, and `committed_by` may be the batch
runner; this is the only case where the two differ.

**Acceptance — the gate:**

```gherkin
Given a candidate whose card showed an AI résumé summary
When a recruiter clicks Reject and submits without a reason
Then the decision stays in GATE_PENDING
And nothing about the candidate's stage or status has changed
And no rejection notification has been queued

Given a knock-out rule fires on a field an AI parse populated
When the rule engine proposes a KNOCKOUT
Then the candidate is flagged for human decision, not rejected
And the pipeline shows the proposed knock-out with the field and the parsed value

Given a confirmer submits a reason of three spaces
Then the gate rejects the confirmation as empty and the decision stays in GATE_PENDING

Given a bulk reject of 40 candidates from an AI-ordered list
When the recruiter supplies one common reason and acknowledges the count and requisition
Then 40 decision records and 40 snapshots are written
And each names the same confirmer and the same reason text
And the influence class on each is the union rule TR-5

Given a service account calls the decision API with decision_type REJECT and influence SHOWN
And supplies its own principal as the confirmer
Then the call is rejected with reason code CONFIRMER_NOT_NATURAL_PERSON
And the failure is logged against the integration, not the candidate
```

| ID | Requirement | Pri | Phase | Money | Conf |
| --- | --- | --- | --- | --- | --- |
| **FR-T-D014** | **Confirmer identity and separation.** A confirmer is a named natural person with an active authenticated session and the decide permission (§07); service accounts, integration principals, shared logins, schedulers and the decision's own subject are refused with a reason code. Delegation is permitted where configured and is recorded with the delegating user. AC1: refusals are logged against the actor, never as a candidate event. AC2: the confirmer's display name is copied by value into the decision record. AC3: a rule-engine knock-out on an influenced candidate proposes, and a human commits. | P0 | v1.5 | — | [Verified] |
| **FR-T-D015** | **Bulk adverse actions.** A bulk adverse action on an influenced set writes one decision record and one snapshot per person, requires a per-person reason or a common reason with an explicit count-and-context acknowledgement, and is capped by `bulk_action_max_batch`. `committed_by` may be the batch runner; the confirmer is always the acknowledging human. | P0 | v1.5 | — | [Verified] |
| **FR-T-D017** | **Snapshot-completeness commit gate.** A decision whose snapshot cannot be composed does not commit. The user is shown which block failed; the attempt is logged; the person's state is unchanged. There is no configuration that permits committing an influenced adverse decision without a snapshot. | P0 | v1.5 | — | [Verified] |
| **FR-T-D030** | **Discrimination-control configuration log.** Every change to the controls in §10.13b — AI features enabled per stage, the feature allow-list version, the kill switch, delegation settings, `adverse_impact_min_cell_size`, complaint-officer designations — is append-only with actor, timestamp and previous value, and is the source for the snapshot's `context` block, the EOP's manner-of-selection clause (FR-LEG-022) and the §23 dossier (FR-LEG-021). | P1 | v1.5 | — | [Verified] |

---

#### 10.13b.4 The snapshot — composition, immutability and what survives erasure

FR-T-D002's whole value is in the words "never recomputed". Three drifts make a recomputed
reconstruction worthless, and each has happened to somebody: the model was retrained or
re-pointed, so the score no longer reproduces; the tenant's configuration changed, so the
criteria no longer match; the candidate record was corrected, so the inputs no longer match.

**Composition rules.**

| # | Rule | Consequence |
| --- | --- | --- |
| S-1 | The snapshot is composed inside the commit transaction, before the state change becomes visible | No decision exists without its snapshot (FR-T-D017) |
| S-2 | Everything in the `criteria`, `model_binding`, `confirmation` and `context` blocks is copied by value | A deleted requisition version, a retired model binding or a deactivated user does not blank the record |
| S-3 | Personal data is referenced or digested, never duplicated, except the confirmer's display name and the reason text | Erasure of the person's record does not require rewriting snapshots, and a snapshot is not a second copy of a candidate file |
| S-4 | The snapshot is append-only and hash-chained per tenant; each snapshot carries the digest of the previous one | Tamper evidence, and a verification report that can be produced on demand (FR-T-D016) |
| S-5 | An amendment (G9) appends; nothing is edited in place | The original reason text is always readable |
| S-6 | Snapshots are not model training inputs, and are excluded from any evaluation corpus that leaves the tenant | §12's rails; avoids a decision record becoming a feature |

<!-- DIAGRAM: fr-talent-snapshot-composition -->

**What a reconstruction returns after an erasure.** This is the interaction FR-T-X03 and
FR-T-D002 share, and it has no single correct answer that this PRD may assert, because the
retention basis for a decision record after a candidate exercises erasure is a counsel question
(§23 CR-39, Part D-9). What the product does is make the three possible answers explicit and
configurable, defaulting to the one that neither destroys evidence nor invents it.

| Case | Erasure requested | Hold in force (FR-LEG-026) | Reconstruction returns | Configurable |
| --- | --- | --- | --- | --- |
| E-1 | No | No | Full snapshot | — |
| E-2 | Yes | Yes | Full snapshot; the requester is told the data is held for proceedings and nothing is erased | No — the hold wins |
| E-3 | Yes | No | Default: the personal fields resolve to the FR-T-X03 tombstone; the non-personal shell — criteria, binding, attribution feature *names*, confirmer, reason, timestamps — remains, and the pack says on its face that the subject's data was erased on a date | Yes, per `decision_record_erasure_mode` |
| E-4 | Yes | No, and the tenant has selected full erasure | The whole snapshot is crypto-shredded with the subject key; reconstruction returns only the tombstone and the erasure date | Yes |
| E-5 | Consent withdrawn, no erasure request | No | As E-1 until the retention horizon; the withdrawal is itself recorded | — |

`decision_record_erasure_mode` is a named parameter with Legal as owner (§10.17). Until counsel
sets it, the product behaves as E-3 and no tenant may select E-4, because E-4 is the only option
that destroys the evidence a Rule 3(2) response is assembled from, and choosing it should be a
decision someone takes advisedly.

**Worked example — what drift would have done.** A candidate rejected on 11 February 2027 by the
knock-out in §10.13b.2 complains on 3 May 2027. Between those dates the tenant edited requisition
criteria twice, the parse binding moved from `bind_resume_parse_v4` to `v6`, and the candidate
corrected the licence field on their own profile. A recomputed reconstruction in May would show a
candidate who *does* hold the licence, screened against criteria that no longer contain the
knock-out, by a model version that never saw the file — an answer that is wrong in every element
and, worse, looks like a fabricated justification. The snapshot returns the February facts,
including that the parse read `licence_two_wheeler = false` from a document the candidate has
since corrected. That distinction — a parse error, promptly evidenced — is a defensible answer;
the recomputed version is not an answer at all.

| ID | Requirement | Pri | Phase | Money | Conf |
| --- | --- | --- | --- | --- | --- |
| **FR-T-D016** | **Snapshot integrity.** Snapshots are append-only and hash-chained per tenant; a verification report re-computes the chain and reports any break with the affected range. Breaks are an incident class, not a support ticket (§17). AC1: no interface updates or deletes a snapshot except the erasure paths of §10.13b.4. AC2: the verification report is exportable and states the range verified. | P1 | v1.5 | — | [Verified] |
| **FR-T-D018** | **Reconstruction pack.** For one decision, or for every decision in a named set, produce a pack containing the snapshot rendered as readable text, the influence records, the decision record, the configuration in force and the chain-verification result. The pack states on its face that it is a record of controls, never that any legal standard is met (FR-T-D012). Export is permissioned, logged with actor and purpose, and watermarked with tenant, date and pack id. | P1 | v1.5 | Bundled | [Verified] |
| **FR-T-D032** | **Decision-record retention and holds.** Decision records, influence records and snapshots carry a retention class distinct from the candidate record's (§14), and the erasure matrix of §10.13b.4 governs their interaction with FR-T-X03 and FR-LEG-026. `decision_record_erasure_mode` defaults to E-3 and cannot be set to E-4 until counsel has answered CR-39. | P0 | v1.5 | — | [Hypothesis] |

---

#### 10.13b.5 The protected-attribute bar — where it is enforced, and how it is tested

FR-T-D004 is a structural bar, which means it is enforced by the absence of a read path, not by
a policy document or a prompt instruction. A deny-list in a prompt is defeated by paraphrase; a
scoring service with no credential for the accommodation store is not.

**Classification and permitted use.** The lawful purposes below are product design decisions
about what the data is *for*; the legal footing for each is §23.10 and, for the RPwD record,
EV-077 and EV-078.

| Attribute | May be collected for | Store | Readable by | Never |
| --- | --- | --- | --- | --- |
| Disability status and nature of disability | Reasonable accommodation; the Rule 9(1) record; voluntary self-declaration for monitoring, separately consented | Accommodation store (walled) and, separately, the declaration store | Accommodation reviewer role; the Rule 9(1) record generator; the aggregate report builder | Scoring, ranking, knock-outs, ordering, prompts, any recruiter-visible candidate card field |
| Gender identity, including transgender status | Employee self-declaration for records the tenant is required to keep; complaint handling (FR-T-D009) | Identity store with confidentiality flag (Rules 12–13, EV-080) | The complaint officer; the employee themselves | Scoring, ranking, knock-outs, prompts; disclosure to a hiring manager |
| HIV status | Nothing in recruiting. Complaint and Ombudsman handling only, where the person has themselves disclosed (FR-T-D010) | Complaint store | The Complaints Officer | Collection as a condition of employment; testing as a pre-requisite (HIV Act s.3(l)); any scoring path; the adverse-impact declaration set |
| Caste | Nothing in recruiting or performance | — | — | Any collection on a talent surface in v1.5; any scoring path |
| Pregnancy and maternity status | Leave and benefit administration only (§11, §09) | Benefits and leave stores | Payroll and leave roles | Any talent read path; any scoring path; any exit or PIP decision surface |
| Sex or gender | Statutory registers (§06, Form I), the Rule 9(1) record's gender particular, statutory reporting | Core HR (§07) | Statutory generators | A recruitment criterion, knock-out or score, unless the tenant records the prohibiting or restricting law it relies on (EV-081; FR-LEG-024) |

**Four enforcement layers.** Each is independently testable; the bar is not satisfied by any one
of them alone.

| Layer | Mechanism | Test |
| --- | --- | --- |
| Schema | The candidate scoring store has no column for any barred attribute; the accommodation and declaration stores are separate schemas with their own keys | Schema diff test in CI fails the build if a barred attribute name appears in a scoring-store migration |
| Credential | Scoring and ranking services hold no credential that can read the accommodation, declaration, identity-confidentiality or complaint stores | An integration test runs each scoring service against those stores and asserts authorisation failure |
| Feature pipeline | Features come from a versioned **allow-list**, never a deny-list; a feature not on the list cannot be computed or served (FR-T-D019) | A test adds an unlisted feature and asserts the pipeline refuses to materialise it |
| Model call | The §12 chokepoint tokenises or denies by default, and the prompt assembler builds only from allow-listed fields (FR-T-X11) | Red-team prompts asking the model to infer a barred attribute are part of the §12.13 golden set; the expected behaviour is refusal, and an inference that appears in a completion is an incident |

**The proxy problem, without a number.** A feature that is not itself a protected attribute can
still carry one. This PRD does not publish a list of "proxy features", because such a list
asserts empirical relationships it has no evidence for, and because *Nitisha* declined to lay
down quantitative thresholds (EV-083). What it specifies instead is a **review trigger**: adding a
feature to the allow-list, or changing a binding in a way that changes which features drive a
score, opens a documented review that records the job-relatedness argument for the feature, the
alternatives considered, and the reviewer — the structure the CCPD template asks an EOP to be
able to show for selection criteria (EV-077; research r5/05 finding 14) and the structure
*Nitisha* describes when it asks whether a criterion is necessary for successful job performance
and whether a less discriminatory alternative exists (EV-083). The review's output is text, held
with the allow-list version, and it appears in the reconstruction pack whenever a score from that
version is reconstructed.

**Negative cases.**

| Attempt | Expected behaviour | Reason code |
| --- | --- | --- |
| A tenant adds a custom candidate field named for a barred attribute and uses it in a knock-out | The field may be created for a lawful purpose but is refused as a rule input; the rule builder does not list it | `FIELD_BARRED_FROM_SCORING` |
| A recruiter pastes a candidate's disability disclosure into the free-text reason on a rejection | The reason is stored as written — it is evidence — and the surface warns that the disclosure now sits in a decision record and is visible in a reconstruction pack; the event is flagged to the tenant's control owner | `REASON_CONTAINS_DECLARED_ATTRIBUTE` |
| A requisition is published with a sex-based criterion and no cited law | Publication is blocked (FR-LEG-024 AC1) | `SEX_CRITERION_WITHOUT_BASIS` |
| An assistant prompt asks the model to "guess whether this candidate has a disability" | Refused at the §12 chokepoint and logged as an AI-safety event | `PROHIBITED_INFERENCE_REQUEST` |
| A CSV import carries a column of caste values into candidate records | The import maps it to no field, reports the column as rejected, and does not store the values | `IMPORT_COLUMN_REFUSED` |
| A scoring service is granted read access to the accommodation store during an incident | The credential test fails in CI and in the production configuration audit; the grant is an incident, not a configuration | `WALL_BREACH` |

| ID | Requirement | Pri | Phase | Money | Conf |
| --- | --- | --- | --- | --- | --- |
| **FR-T-D019** | **Feature allow-list.** Every feature usable by a scoring, ranking or knock-out path comes from a versioned allow-list; an unlisted feature cannot be computed, served or referenced by a rule. The allow-list version is copied into every snapshot. AC1: adding a feature requires the FR-T-D020 review to be recorded first. AC2: removing a feature does not alter snapshots that reference the old version. | P0 | v1.5 | — | [Verified] |
| **FR-T-D020** | **Feature and binding review.** Adding an allow-list feature, or changing a binding such that the features driving a score change, opens a review recording the job-relatedness argument, the alternatives considered, the reviewer and the date. The review text is held with the allow-list version and surfaces in reconstruction packs and in the §23 dossier. Cadence for re-reviewing unchanged features is `proxy_review_cadence` (§10.17). No quantitative test is defined or implied. | P1 | v2 | — | [Hypothesis] |

---

#### 10.13b.6 The accommodation wall and the Rule 9(1) record

Disability data is the hardest case in the bar, because the product has to hold it for two
legitimate purposes while guaranteeing it never reaches a fifth decision. The wall is a data
boundary with its own lifecycle, not a permission checkbox.

**Accommodation request lifecycle.**

| State | Entered when | Who acts | Exit |
| --- | --- | --- | --- |
| `REQUESTED` | A candidate or employee asks for an adjustment, through the career site, the portal or a recruiter recording a request | Accommodation reviewer | `IN_ASSESSMENT` or `WITHDRAWN` |
| `IN_ASSESSMENT` | The reviewer opens it | Accommodation reviewer, with whoever they consult | `PROVIDED`, `ALTERNATIVE_OFFERED`, `DECLINED` |
| `PROVIDED` | The adjustment is in place | — | `CLOSED` |
| `ALTERNATIVE_OFFERED` | A different adjustment is proposed and the person is told why | Person responds | `PROVIDED`, `DECLINED`, `WITHDRAWN` |
| `DECLINED` | The employer declines; a written reason is mandatory to leave this state open | Reviewer | Feeds the Rule 3(2) case type if a complaint follows (FR-T-D008) |
| `WITHDRAWN` | The person withdraws | — | `CLOSED` |
| `CLOSED` | Terminal | — | — |

Three constraints ride on that lifecycle. First, **no cost may be passed to the person**: RPwD
Rule 3(4) bars an establishment from compelling a person with disability to pay any part of the
cost of a reasonable accommodation (research r5/05 finding 3), so an accommodation record cannot
be linked to a payroll deduction, a recoverable advance or an FBP debit — the product refuses the
link at the point the component is created and states the reason (§08, §11). Second, the request
and its outcome are **invisible to the deciding surfaces**: a hiring manager sees that an
interview needs a scribe or an accessible room, as a logistics attribute of the interview, and
does not see the request, the diagnosis or the assessment. Third, a declined accommodation with
no written reason cannot be closed, because the written reason is the only thing that answers a
Rule 3(2) letter about it (EV-076).

**Access matrix — who can read what.**

| Role | Accommodation store | Declaration store (D021) | Rule 9(1) record | Identity confidentiality store | Decision snapshots |
| --- | --- | --- | --- | --- | --- |
| Recruiter | No | No | No | No | Own decisions only |
| Hiring manager | Logistics attributes of their own interviews only | No | No | No | Own decisions only |
| Accommodation reviewer | Yes | No | Contributes the facilities particular | No | No |
| Complaint officer (per statute) | On an open case, scoped to the case subject | No | No | Yes, for cases under the Transgender Persons Act | On an open case |
| HR admin | No | No | Yes | No | Yes, tenant-wide |
| Scoring and ranking services | No | No | No | No | Write-only, through the snapshot writer |
| Support and operations staff | No | No | No | No | No, except under §22's break-glass with its log |

**The Rule 9(1) record — field spec.** Exactly the five particulars, each with a defined
provenance, so the record is produced from live data rather than maintained by hand (EV-078).

| # | Particular (Rule 9(1)) | Field | Provenance | Notes |
| --- | --- | --- | --- | --- |
| 1 | Number of persons with disabilities employed, and the date from which each is employed | `count`, `employed_from` per person | Assignment start date (§07) filtered by declaration | The count is derived, never keyed |
| 2 | Name, gender and address | `name`, `gender`, `address` | Core HR (§07) | Address is the address of record on the report date; the report states the date |
| 3 | Nature of disability | `disability_nature` | Accommodation or declaration store | Free text as declared; never normalised into a code the scoring layer could read |
| 4 | Nature of work rendered | `work_nature` | Designation and job description on the assignment | |
| 5 | Kind of facilities provided | `facilities` | Accommodation records in `PROVIDED` | One line per provided adjustment, with its date |

The record generator is bound by three rules: **never Form III** — Rule 14 prescribes that form
for Government establishments, and private establishments have no prescribed format (EV-078); at
fewer than twenty employees the record is still produced and is labelled "not prescribed at this
size" rather than hidden, because production on demand under Rule 9(2) is addressed to every
establishment (EV-078; research r5/05 finding 7); and the export is a dated artefact with the
tenant's headcount facts on it, because the size question decides what was prescribed on that day.

**Acceptance — the wall and the record:**

```gherkin
Given an employee has an accommodation record with a provided adjustment
When the Rule 9(1) record is generated
Then the facilities particular lists that adjustment with its date
And the record carries the generation date and the employee-count fact used

Given a tenant with 18 employees generates the Rule 9(1) record
Then the record is produced and labelled "not prescribed at this size"
And the label cites Rule 9(2) production on demand, not an exemption

Given a payroll component is created and linked to an accommodation record
Then creation is refused with a reason naming RPwD Rule 3(4)
And no deduction, advance or FBP debit can reference an accommodation record

Given a hiring manager opens an interview that needs a scribe
Then they see the logistics requirement for the interview
And they cannot see the accommodation request, its assessment or any diagnosis

Given an accommodation is declined with no written reason
Then the request cannot be closed
And the open request is listed in the control owner's queue
```

| ID | Requirement | Pri | Phase | Money | Conf |
| --- | --- | --- | --- | --- | --- |
| **FR-T-D028** | **Accommodation request lifecycle.** The states and exits above, with a mandatory written reason to close a declined request, logistics-only exposure to deciding roles, and a hard refusal of any link between an accommodation record and a payroll deduction, recoverable advance or FBP debit (RPwD Rule 3(4)). Target response time is `accommodation_response_target_days`, a tenant policy value (§10.17). | P1 | v1.5 | Bundled | [Verified] |

---

#### 10.13b.7 Adverse-impact monitoring — a measurement spec with no threshold

FR-T-D003 has to be specified precisely *because* it commits to no threshold. A report with no
line to cross is only useful if its populations, denominators and suppression are unambiguous;
otherwise the tenant's reviewer is reading noise and the record of review proves nothing.

**Where the declared data comes from.** Monitoring runs only on attributes a person has
volunteered for that purpose, under a consent record whose stated purpose is monitoring and
nothing else (FR-CHR-100; FR-T-D021). "Prefer not to say" is a first-class stored value, not a
null, because the proportion choosing it is itself information about the instrument. Declarations
are never inferred, never derived from a name, photograph, college or address, and never taken
from the accommodation store, the Rule 9(1) record or any complaint file. HIV status is never in
the declaration set at all (HIV Act s.3(l) and the collection bar in §10.13b.5).

**Unit and population definitions.** Ambiguity here is the usual reason two people read the same
report differently.

| Term | Definition |
| --- | --- |
| Decision population | Every person with a committed decision of the named `decision_type` in the window, in the named scope, who has a declaration for the attribute being reported |
| Scope | One requisition, a requisition family (same template), a department, or the tenant; never "all tenants" |
| Window | A closed date range on `committed_at`; open-ended windows are not offered because they make two runs incomparable |
| Stage pass | A committed `ADVANCE` out of stage *k* within the window |
| Stage denominator | Everyone who entered stage *k* within the window and reached a committed terminal decision for that stage by the window's end; people still in flight are excluded and counted separately as in-flight |
| Rating distribution | Post-calibration final ratings (§10.10) in the cycle, by declared attribute |
| Promotion rate | Committed `PROMOTION_RECO` with a positive outcome over the eligible population defined by the cycle |

**Metric table.**

| Metric | Numerator | Denominator | Source | Unit |
| --- | --- | --- | --- | --- |
| Stage pass-rate | Committed advances out of stage *k* | Stage denominator for *k* | `TalentDecision` | Person |
| Shortlist rate | Persons reaching the first interview stage | Applications with a terminal screening decision | `TalentDecision` | Person |
| Offer rate | Offers extended | Persons reaching the final interview stage | `TalentDecision` + offer records | Person |
| Knock-out incidence | Committed knock-outs | Applications screened | `TalentDecision` | Person |
| Rating distribution | Count at each final rating | Reviewed population | Review cycle (§10.10) | Person |
| Promotion rate | Positive promotion outcomes | Eligible population | Review cycle | Person |
| In-flight share | Persons without a terminal decision at window end | Stage entrants | `TalentDecision` | Person |

**Suppression.** At 20–200 employees a single cell can identify a person, which is why
`adverse_impact_min_cell_size` exists and why the report does not render until it is set
(§10.17). Suppression is two-stage: primary suppression hides any cell below the minimum, and
**complementary suppression** hides the next-smallest cell in the same row and column so that a
suppressed value cannot be recovered by subtracting from a visible total. Totals are shown only
where at least two cells survive. Percentages are rendered only where the denominator is at or
above the minimum, and never to more than whole numbers, because a decimal on a denominator of
nine invites a false reading.

**Worked example — suppression arithmetic (counts are illustrative and are not evidence of
anything about any employer).** A tenant runs stage pass-rate by declared disability status for
one requisition family over a quarter, with `adverse_impact_min_cell_size` set to 5.

| Declared group | Entered screen | Advanced | Terminal reject | In flight |
| --- | --- | --- | --- | --- |
| Declared no disability | 84 | 21 | 60 | 3 |
| Declared a disability | 7 | 1 | 6 | 0 |
| Prefer not to say | 12 | 4 | 8 | 0 |
| No declaration | 41 | 9 | 30 | 2 |

The "declared a disability" row has cells of 7, 1 and 6. Primary suppression hides the 1 and the
6 (both below 5) and, because 7 minus a hidden pair is recoverable if only one is hidden, the row
renders as: entrants 7, advanced suppressed, rejected suppressed. Complementary suppression then
hides the smallest remaining cell in the *advanced* column — the 4 in "prefer not to say" — because
21 + 9 + 4 against a visible column total would reconstruct the suppressed 1 exactly. What the
reviewer sees is: two rows with rates, two rows suppressed, and a statement of how many people
were suppressed in total. That is the honest output at this size, and the report says so rather
than filling the gap with a percentage computed on one person.

**What the report must never do.**

| Prohibited | Why |
| --- | --- |
| Show a pass/fail, a red/amber/green, a "bias detected" banner, or any four-fifths style ratio presented as a line | *Nitisha* declined to lay down a quantitative threshold, and the absence of statistical evidence cannot alone defeat a claim (EV-083); a product-invented line would be quoted back as if it were one |
| Compute on inferred attributes | FR-T-D003; inference is itself the harm the control exists to catch |
| Rank tenants, benchmark across tenants, or show a peer comparison | We have no evidence base for a benchmark, and a benchmark becomes an implied standard |
| Render a cell below the minimum, or a percentage on a suppressed denominator | Re-identification at 20–200 heads |
| Auto-generate a conclusion or an action | The disposition is the employer's, recorded by a named human (FR-T-D023) |
| Present an observation as a legal finding | FR-T-D012 |

**The disposition loop — the part that becomes evidence.** An observation with no recorded
response is worse than no observation, because it shows the employer saw something and did
nothing. So each observation has a lifecycle: `OBSERVED` (the run flags a gap the reviewer asked
to be flagged, by the reviewer's own configured rule of thumb — never a product-set line) →
`UNDER_REVIEW` (a named person opens it) → `DISPOSED` with one of: *no action, with reasons*; *criteria
changed*; *process changed*; *escalated to counsel*. The disposition, its author and its date join
the §23 dossier (FR-LEG-021). A reviewer's own rule of thumb is stored as tenant configuration
and appears in the report header so a later reader knows what triggered the flag.

**Acceptance — monitoring:**

```gherkin
Given adverse_impact_min_cell_size is unset
When a user opens the adverse-impact report
Then the report does not render
And the screen states that the minimum cell size is an owner decision pending counsel input

Given a stage table where one group's advanced count is below the minimum
When the report renders
Then that cell and the next-smallest cell in the same column are suppressed
And the report states how many people were suppressed

Given a candidate has not declared an attribute
Then they appear only in the "no declaration" row
And no model or heuristic assigns them to a group

Given an observation is flagged by the tenant's configured rule of thumb
When the tenant's own review period passes with no disposition recorded
Then the observation appears in the control owner's queue as open
And nothing about it is auto-resolved
```

| ID | Requirement | Pri | Phase | Money | Conf |
| --- | --- | --- | --- | --- | --- |
| **FR-T-D021** | **Self-declaration for monitoring.** A separate, optional declaration surface for candidates and employees, with its own consent record naming monitoring as the purpose, a first-class "prefer not to say" value, free withdrawal, and no read path from any scoring, ranking or recruiter surface. Declarations are never inferred and never sourced from the accommodation store, the Rule 9(1) record or a complaint file. | P1 | v2 | Bundled | [Verified] |
| **FR-T-D022** | **Suppression.** Primary and complementary suppression at `adverse_impact_min_cell_size`, totals only where two or more cells survive, whole-number percentages only, and an explicit count of suppressed people on every output. The report does not render while the parameter is unset. | P1 | v2 | Bundled | [Verified] |
| **FR-T-D023** | **Observation disposition.** Every flagged observation carries a lifecycle to a recorded disposition by a named person, with the tenant's own flagging rule shown in the report header. Open observations age into the control owner's queue. No disposition is generated by the product. | P1 | v2 | Bundled | [Verified] |

---

#### 10.13b.8 The EOP generator — clause map, lifecycle and the registration correspondence

RPwD s.21 with Rule 8 is the one duty in this set that produces a **document the employer
publishes**, which makes it the one place where a generator can drift from the system's actual
behaviour and be quoted against the employer. The generator is therefore bound to live
configuration (FR-LEG-022), not to a template the tenant edits once and forgets.

**Clause map.** Left column is the source requirement; right columns say what the generator emits
and what makes it stale.

| Source | Applies to | Generated block | Filled from | Staleness trigger |
| --- | --- | --- | --- | --- |
| Rule 8(1) | Every establishment | The policy itself exists and is published | — | Establishment created with no EOP |
| Rule 8(2) | Every establishment | Publication record: website URL, or an attestation of display at the premises with date and location | Publication evidence (FR-T-D025) | URL unreachable on the periodic check; premises attestation older than `eop_review_cadence_months` |
| Rule 8(3)(c) — manner of selection | Twenty or more employees | Which AI features are enabled at which recruiting stages; that a named human confirms every AI-influenced adverse decision; the accommodation route into the process | FR-T-D030 configuration log | Any change to talent AI configuration or the confirmer settings |
| Rule 8(3)(e) — liaison officer | Twenty or more employees | Named liaison officer for the recruitment of persons with disabilities, with contact | Tenant designation record | Designee leaves or the designation is cleared |
| Rule 8(3) remaining clauses (a), (b), (d) | Twenty or more employees | Emitted from the CCPD template structure with tenant-supplied content; the generator marks any clause the tenant has not completed | Tenant input | Any unfilled clause blocks publication as complete |
| Rule 8(4) | Fewer than twenty employees | Facilities and amenities provided for persons with disabilities | Accommodation records in `PROVIDED`, plus tenant input | Crossing twenty employees (FR-T-D026) |
| CCPD template para III(a) | Guidance | Recruitment accommodations offered: accessible advertisement formats, scribe, interpreter, screen readers, a person with disability on the selection committee | Tenant configuration of which are offered | Change in offered accommodations |
| CCPD template para III(b) | Guidance | That qualification standards, employment tests and other selection criteria reflect aptitude, skills and job-relevant factors; and that disability information will not prejudice an application | FR-T-D019 allow-list and FR-T-D020 reviews, summarised without disclosing the feature list | New allow-list version |
| CCPD template paras V(a), V(c) | Guidance, permissive | Career-progression and performance-evaluation measures | Tenant input; the generator notes the template's permissive wording | Tenant edit |

The template's guidance clauses are emitted as guidance and labelled as such: the CCPD document
is what the Commissioner's office works from when registering a policy (EV-077; research r5/05
findings 14–15), and the product never describes template language as a statutory requirement
(FR-T-D012). The template contains no reference to AI, algorithms or automated decision-making
(research r5/05 finding 16), so the manner-of-selection block is the product's own construction,
written to be truthful about what the system does — not a claim that any rule requires it.

**Version lifecycle.**

| State | Meaning | Exit |
| --- | --- | --- |
| `DRAFT` | Generated or edited, not approved | `APPROVED` on named approval; `DISCARDED` |
| `APPROVED` | Approved by a named person with a date | `PUBLISHED` on publication evidence being recorded |
| `PUBLISHED` | Live, with evidence: URL or premises attestation | `STALE` on any trigger in the clause map; `SUPERSEDED` when a newer version publishes |
| `STALE` | Published but the configuration it describes has changed | `DRAFT` for the next version; stays published until replaced, and the staleness is shown to the tenant, never hidden |
| `SUPERSEDED` | Replaced by a later published version | Terminal; retained with its publication and registration history |

<!-- DIAGRAM: fr-talent-eop-lifecycle -->

**Registration correspondence.** s.21(2) requires a copy to be registered with the Chief or State
Commissioner; there is no portal and no prescribed form for private establishments, and the CCPD's
own 2024 letter shows a correspondence-based proposal-and-resubmission process with a postal
address, a telephone number and an email address (EV-077; research r5/05 finding 43). The product
therefore models registration as a correspondence tracker, not an integration: prepare the pack →
record dispatch with channel, date and reference → record acknowledgement or a request for
resubmission → record the outcome. The tracker never displays a registration status the tenant has
no artefact for, and the phrase "registered" appears only against a recorded acknowledgement. This
is also why attended filing's rules (§22) do not reach here: there is no portal session to attend.

**Edge cases.**

| Case | Behaviour |
| --- | --- |
| A tenant with two legal entities and four establishments | The EOP is an establishment-level artefact; the generator produces one per establishment, sharing tenant-level content, because the duty attaches to the establishment (§06, §14 hierarchy) |
| The tenant crosses twenty employees mid-year | FR-T-D026 raises a task to upgrade the Rule 8(4) content to the full Rule 8(3) set, dated at the crossing, with the counting unit shown (*employees* for Rule 8(3), *persons* for Rule 3(2) — EV-076, EV-077) |
| The tenant falls below twenty | The published version stays published; no downgrade is generated and no clause is removed, because removing content published earlier is a change a person might rely on |
| Website is the published channel and the URL 404s | The publication evidence check marks the version `STALE` with the reason, and the tenant is prompted; the product does not silently re-publish |
| Regional language | The published policy may be authored in any language the tenant chooses; the generator emits the structure and the tenant supplies translated content, with the language recorded in the publication evidence |

| ID | Requirement | Pri | Phase | Money | Conf |
| --- | --- | --- | --- | --- | --- |
| **FR-T-D024** | **EOP version lifecycle.** The states above, with staleness triggers bound to the clause map, an unfilled-clause block on publication, and retention of every superseded version with its publication and registration history. AC1: a configuration change that affects the manner-of-selection clause marks the current version `STALE` within one run of the periodic check. AC2: staleness is displayed, never auto-corrected by silently editing a published document. | P1 | v1.5 | Bundled | [Verified] |
| **FR-T-D025** | **Publication and registration evidence.** Publication is recorded as a URL with a periodic reachability check, or as a dated premises attestation naming the location and the attester. Registration under s.21(2) is a correspondence tracker — prepare, dispatch, acknowledge or resubmit, outcome — with no portal, no prescribed form, and no status shown without an artefact (EV-077). | P1 | v1.5 | Bundled | [Verified] |
| **FR-T-D026** | **Threshold-crossing tasks for the talent-law lines.** Crossing a line in either direction raises a dated task naming the line, its counting unit and the duty it switches: twenty *employees* for the Rule 8(3) EOP content and the Rule 9(1) record (EV-077, EV-078); twenty *persons* for the Rule 3(2) written-response case type (EV-076); one hundred *persons in any capacity*, or twenty in healthcare, for the HIV Act Complaints Officer (EV-082); ten *workers* for the POSH Local Committee route (EV-056). Crossings are dated at the event that caused them and are recorded in the tenant's threshold-fact history, which snapshots read (§10.13b.2). | P1 | v1.5 | Bundled | [Verified] |

---

#### 10.13b.9 The complaint case machine — routing, clocks and the written response

One intake, many statutes (§23 FR-LEG-025). The routing decision is made from the tenant's
threshold facts *with their counting units*, because the same tenant can be above one line and
below another on the same day (§23.10.2).

**Routing decision table.** Inputs are the complaint's subject-matter tags and the tenant's
threshold facts on the complaint's receipt date. A complaint matching two rows opens two linked
cases, each with its own clock and owner.

| # | Complaint concerns | Threshold fact required | Case type opened | Clock set | Owner |
| --- | --- | --- | --- | --- | --- |
| C-1 | Discrimination on the ground of disability | Twenty or more **persons** | `RPWD_R3_2` | Commissioner's 60-day disposal, 30 in exceptional cases (EV-076); internal target `rpwd_response_target_days` | Establishment head or their named delegate |
| C-2 | Discrimination on the ground of disability | Fewer than twenty persons | `TENANT_POLICY` | Tenant policy only | Tenant's own owner |
| C-3 | Discrimination against a transgender person in employment | None — every establishment (EV-080) | `TG_COMPLAINT` | `tg.enquiry_days`, `tg.action_days`, `tg.resolution_days` (§10.17, mirror-sourced defaults) | Designated complaint officer (s.11, Rule 13(1)) |
| C-4 | HIV-related discrimination | s.3 binds every employer; the Complaints Officer chapter at 100 or more persons in any capacity, 20 or more in healthcare (EV-082) | `HIV_COMPLAINT` | Any Ombudsman order's own compliance date | Complaints Officer where designated; otherwise the tenant's owner |
| C-5 | Sexual harassment | IC at every employer; fewer than ten **workers** routes to the district Local Committee (EV-056) | `POSH_COMPLAINT` or `POSH_LC_ROUTE` | IC process (not specified here — §23 CR-49) | Internal Committee |
| C-6 | Sex discrimination in recruitment or in wages for same or similar work | None (EV-081) | `WAGES_S3` | Tenant policy; a dispute on "same or similar work" goes to the notified authority (§23 FR-LEG-024) | Tenant's owner |
| C-7 | Maternity-related dismissal or variation of service conditions | None | `MATERNITY_S68` | Sixty-day appeal window to the competent authority (research r5/05 finding 22) | Tenant's owner |
| C-8 | Anything not matching the above | — | `TENANT_POLICY` | Tenant policy | Tenant's owner |

Below-threshold routing is explicit rather than silent: a nineteen-person tenant receiving a
disability complaint sees a `TENANT_POLICY` case and a note that the Rule 3(2) written-response
duty attaches at twenty persons — not an assurance that nothing applies, because s.3(3) has no
threshold (EV-075) and the complainant's other routes are unaffected.

**Case states and transitions.**

| # | From → To | Event | Guard | Side effect | Who |
| --- | --- | --- | --- | --- | --- |
| K1 | — → `RECEIVED` | Complaint arrives through intake, email drop or a recorded verbal complaint | — | Retention hold placed on the subject's decision snapshots and related records (FR-LEG-026); acknowledgement issued if the statute's process provides for one | Intake |
| K2 | `RECEIVED` → `ROUTED` | Routing evaluated | Threshold facts resolved as at the receipt date | Case type set, clocks started, owner assigned; linked cases created for multi-statute complaints | System |
| K3 | `ROUTED` → `EVIDENCE_ASSEMBLED` | Owner requests the pack | Owner holds the case permission | Reconstruction packs for the decisions in scope (FR-T-D018), accommodation history, configuration log extract | Case owner |
| K4 | `EVIDENCE_ASSEMBLED` → `ACTION_INITIATED` | Owner elects to initiate action under the Act | — | The action and its date are recorded; the written-response path is closed for this case | Case owner |
| K5 | `EVIDENCE_ASSEMBLED` → `RESPONSE_DRAFTED` | Owner elects the written reasoned response | Only for `RPWD_R3_2` | Draft assembled by FR-T-D027; never sent automatically | Case owner |
| K6 | `RESPONSE_DRAFTED` → `RESPONSE_ISSUED` | A named person approves and issues | Approval by a human with the issue permission; dispatch channel and date recorded | Response text, approver and dispatch evidence stored with the case | Establishment head or delegate |
| K7 | any → `ESCALATED_EXTERNAL` | Notice of proceedings before a Commissioner, Ombudsman, Local Committee or court | — | Hold reaffirmed and widened to the proceeding's scope; external reference recorded | Case owner |
| K8 | `RESPONSE_ISSUED` or `ACTION_INITIATED` → `CLOSED` | Owner closes with an outcome | An outcome and a closing note exist | Clocks stopped with their elapsed values retained; hold *not* released by closure | Case owner |
| K9 | `CLOSED` → `REOPENED` | Further complaint or direction on the same facts | — | New clock instance; the prior record is untouched | Case owner |
| K10 | any → any | Clock breach | A clock passes its limit | The case is flagged, the owner and the tenant's control owner are notified; nothing is auto-decided | System |

<!-- DIAGRAM: fr-talent-complaint-case-states -->

**Clock register.** Every clock names its source, so no employer is shown a deadline this product
invented.

| Clock | Source | Starts | Limit | On breach | Configurable |
| --- | --- | --- | --- | --- | --- |
| Commissioner disposal | RPwD Rule 3(3) (EV-076) | Receipt of the complaint by the Commissioner, where known | 60 days, 30 in exceptional cases | Displayed as elapsed; it is the Commissioner's clock, not the employer's, and the product says so | No |
| Internal response target | Tenant policy | Case `ROUTED` | `rpwd_response_target_days` | Owner queue | Yes; unset by default, and the case then shows only the Commissioner's clock |
| TG designation | Rules 2020, Rule 13(1) (mirror; EV-080) | Establishment creation | `tg.designation_days`, default 30 | Task raised | Yes |
| TG enquiry | Rule 13 (mirror) | Complaint receipt | `tg.enquiry_days`, default 15 | Owner queue | Yes |
| TG action | Rule 13 (mirror) | Enquiry completion | `tg.action_days`, default 15 | Owner queue | Yes |
| TG grievance resolution | Rule 13 (mirror) | Grievance receipt | `tg.resolution_days`, default 30 | Owner queue | Yes |
| Ombudsman order compliance | The order itself (HIV Act; EV-082) | Order recorded | As stated in the order | Owner queue, with the s.38 daily-fine exposure noted in the case (research r5/05 finding 31) | Per order |
| Maternity appeal window | CoSS s.68(2) (research r5/05 finding 22) | Employer's decision | 60 days | Displayed as the employee's window, not an employer deadline | No |

The mirror-sourced clocks carry their provenance into the UI: Rules 12–13 were read from a legal
database reproduction of G.S.R. 592(E) rather than the gazette (EV-080; FR-T-D009), so the case
screen labels those four values "pull from the primary source before customer use" and no
customer-facing copy quotes the rule text until that pull is done.

**The Rule 3(2) response assembler.** The output is a draft letter with five parts, each sourced,
and it is never dispatched by the system: (1) what decision is complained of, identified by
decision id and date; (2) the criteria in force at that time, from the snapshot's `criteria`
block; (3) what actually happened, from `attribution` and `confirmation` — including, where
relevant, that a named human confirmed the decision and the reason they recorded; (4) the aim the
employer says the criterion served and why the means were proportionate — **tenant-authored text,
never generated**, because this is the employer's own justification and a drafted one would be
both useless and dangerous; (5) what the employer is doing next, if anything. The assembler
refuses to produce a draft where the snapshot is missing or erased, and says so — a truthful "we
cannot reconstruct this decision" is a better artefact than a plausible reconstruction (FR-T-D002).

| ID | Requirement | Pri | Phase | Money | Conf |
| --- | --- | --- | --- | --- | --- |
| **FR-T-D027** | **Rule 3(2) response assembler.** Assembles parts 1, 2, 3 and 5 from records written at the time and leaves part 4 — the proportionality argument — to tenant-authored text; produces nothing where the snapshot is missing or erased, and states that instead; never dispatches. Issuing requires a named approver, a channel and a date, all stored with the case. AC1: no generated sentence asserts that a legal standard is met. AC2: the draft names every decision id it covers. | P1 | v1.5 | Bundled | [Verified] |
| **FR-T-D029** | **Protected-termination guards.** A termination or PIP decision surface for a person the tenant has recorded as within the HIV Act's protection requires the two documents the Act's proviso turns on — an independent healthcare provider's written assessment and the employer's written statement of hardship — to be attached before the decision can commit, because their absence raises a presumption against the employer (EV-082). A termination or variation of service conditions during maternity absence is blocked and requires a named override with a recorded reason routed to the tenant's owner (CoSS s.68; research r5/05 finding 22). Both guards record their own decision snapshot. AC1: neither guard asserts a legal conclusion; both state what is missing. AC2: an override is never available to a service account. | P2 | v2 | Bundled | [Verified] |

---

#### 10.13b.10 Performance, PIP and exit — the same controls, different surfaces

FR-T-D005 says the controls apply to performance and exit decisions. This is what that means at
each surface, so the review cycle of §10.10 and the controls here do not have to be reconciled by
a reader.

| Surface (§10.9–§10.11) | AI artefact that can appear | Decision type | Gate | Snapshot blocks that matter | Monitoring metric |
| --- | --- | --- | --- | --- | --- |
| Review form drafting (FR-T-P11) | Drafted review prose (FR-T-X09) | `RATING` | Yes, once influence is not `NONE` | `criteria` = the form definition and the rating scale in force; `attribution` = which drafted text was retained | Rating distribution |
| Calibration board (FR-T-P13) | Any AI-derived ordering or flag | `CALIBRATION_MOVE` | Yes | `criteria` = the distribution mode in force, forced-curve or none; `confirmation` = the calibrator | Rating distribution before and after calibration |
| Rating-to-band mapping (FR-T-P18) | None — deterministic | `INCREMENT_RECO` | Only where an AI artefact influenced the rating that fed it (TR-2) | `criteria` = the mapping version | Promotion and increment rates |
| Promotion recommendation (FR-T-P15) | Ordering or summary | `PROMOTION_RECO` | Yes | Full | Promotion rate |
| PIP initiation | Drafted PIP text or a flagged list | `PIP_START` | Yes | Full, plus the guards of FR-T-D029 | PIP incidence by declared group |
| Termination recommendation | Any | `TERMINATION_RECO` | Yes | Full, plus FR-T-D029 | Exit rate by declared group |

Two notes a build team needs. First, calibration is the highest-value surface for this control set
and the easiest to get wrong: §10.10 already requires every calibration move to record actor,
from, to and reason immutably, so FR-T-D005 adds the confirmer identity rules (FR-T-D014) and the
snapshot, not a second log. Second, the increment path is where a talent decision becomes money:
an increment that flows to payroll carries its decision id into the effective-dated CTC change
(§10.10, FR-T-P15/P16), so a later question about an appraisal outcome resolves to the same
snapshot as the appraisal itself, and no one has to reconcile two records. On promotion, the
product relies on no RPwD provision at all: s.20 binds Government establishments (EV-075; EV-K22),
and whether s.20(3) — the one sub-section without the "Government establishment" qualifier —
reaches a private employer is a counsel question (§23). The controls are identical either way,
which is the point of building them as defensibility rather than as compliance.

---

#### 10.13b.11 Worked example — one complaint, end to end, with the exposure arithmetic

A single trace through the machinery, with dates, so the acceptance criteria above have a shape.
Every rupee figure is taken from the ledger; the dates, counts and the employer are illustrative.

**The tenant.** A 64-person services firm on one establishment. Threshold facts on 1 February
2027: 64 persons, 61 employees, 58 workers. It is therefore above the twenty-person line for Rule
3(2) (EV-076), above the twenty-employee line for the Rule 8(3) EOP content and the Rule 9(1)
record (EV-077, EV-078), below the hundred-person line for the HIV Act Complaints Officer
(EV-082), and above the ten-worker line, so its Internal Committee is its own (EV-056).

**11 February 2027 — the decision.** A candidate is rejected at screen. The card had shown an AI
résumé summary, so influence resolves to `SHOWN` (TR-1); the decision is `REJECT`, so `adverse`
is true; the gate applies (G3). The recruiter confirms with reason code `MISSING_MUST_HAVE` and
the text recorded in §10.13b.2's payload. The snapshot commits with the decision (G6). Elapsed
cost to the recruiter: one reason field.

**3 May 2027 — the complaint.** The candidate writes to the establishment head alleging
disability discrimination: the licence requirement, they say, was applied without considering an
adjustment. Intake records it (K1); a retention hold lands on the snapshot immediately
(FR-LEG-026), which matters because the candidate's own record is otherwise eligible for the
retention horizon in a few weeks (FR-T-X03). Routing (K2) reads the threshold facts *as at 3 May*
— 64 persons — and opens `RPWD_R3_2` per row C-1, with the Commissioner's 60-day disposal clock
displayed as the Commissioner's, not the employer's (EV-076).

**5 May 2027 — evidence.** The case owner pulls the reconstruction pack (K3, FR-T-D018). It
returns: the February criteria including knock-out R-17; binding `bind_resume_parse_v4`; the
parsed value `licence_two_wheeler = false`; the named confirmer, timestamp and reason; and the
configuration in force, showing which AI features were enabled. The chain verification passes.
The pack also shows what is *not* there: no accommodation request was made, and the candidate was
not asked about adjustments at application — which is a finding about the process, and the reason
the CCPD template's recruitment-accommodation list matters at the application surface, not only
at interview (EV-077; research r5/05 finding 14).

**12 May 2027 — the response.** The owner elects the written reasoned response (K5). The
assembler produces parts 1, 2, 3 and 5; the establishment head writes part 4 themselves. The
letter issues on 12 May with the approver, channel and date recorded (K6). Nine days elapsed,
against an internal target the tenant has not set — so the case shows only the statutory clock,
which is the Commissioner's.

**The counterfactual, and the arithmetic.** Suppose instead the firm had no snapshot: no record of
what criteria applied, which model version ran, or who decided. Two consequences follow, and only
the second is quantifiable from the ledger.

First, the unquantifiable one: the employer cannot write the Rule 3(2)(b) letter at all, because
there is nothing to write it from. Its only remaining exit is Rule 3(2)(a) — initiate action under
the Act — which is a different and worse posture to be in.

Second, the records exposure. RPwD s.93 punishes failure to produce a book, account, document,
statement, information or particulars one is duty-bound to produce with a fine that may extend to
**₹25,000 in respect of each offence**, and in case of continued failure or refusal, a further
fine that may extend to **₹1,000 for each day** of continued failure (EV-079). Take one demand
that the firm cannot answer, and a continued failure of 45 days while it reconstructs by hand:

```
  base, one offence                     ₹25,000
  continued failure, 45 days × ₹1,000   ₹45,000
  ------------------------------------- -------
  exposure on one demand                ₹70,000
```

If the Commissioner's demand is treated as three distinct failures — the Rule 9(1) record, the
selection criteria, and the decision particulars — the base multiplies before the daily element is
counted: 3 × ₹25,000 = **₹75,000**, plus the same ₹45,000 daily accrual, for **₹1,20,000**. That
per-offence multiplication is why the product's answer to "produce the record" is a single pack
covering the set (FR-T-D018), not three separate manual exercises.

For orientation on magnitude only — these are price anchors, not a business case, and the
comparison says nothing about any customer's own numbers: EV-027 records greytHR at twenty
employees as ₹124.75 per employee per month, an annual contract value of ₹29,940. The single-demand
exposure above is roughly 2.3 times that ACV; the three-demand figure is roughly four times it.
On the recruiting side, EV-022's archived Keka card prices Hiring ADVANCED at ₹2,500 per recruiter
per month, so two recruiters for a year is ₹60,000 — less than the single-demand exposure. The
point is not that the controls pay for themselves; it is that the exposure this module's records
address is the same order of magnitude as the software spend it sits inside, which is unusual for
a compliance feature and is the reason FR-T-D002 is P0 rather than a v2 nicety.

**Two adjacent exposures, for completeness.** Under the HIV and AIDS Act, failure to comply with
an Ombudsman's order attracts a fine of up to ₹10,000 plus up to ₹5,000 for each day the failure
continues (EV-082; research r5/05 finding 31) — twenty days of continued failure is ₹10,000 +
20 × ₹5,000 = **₹1,10,000**. Under RPwD s.89, a first contravention of the Act or its rules is
punishable with a fine that may extend to ₹10,000, and a subsequent contravention with a fine of
not less than ₹50,000 extending to ₹5,00,000 (research r5/05 finding 10) — which is why the
records penalty, not the general one, is the figure this section builds against for a 20–200
employer. And *Jane Kaushik* ordered ₹50,000 each against three State respondents and a separate
₹50,000 against the private unaided school (EV-083): the private-employer remedy in the only
directly on-point Supreme Court judgment is a compensation order, and both halves of that remedy
are always stated together (§23.10.3).

**What the example does not establish.** It does not show that the controls satisfy any legal
standard, that a snapshot would be accepted as sufficient evidence, or that any of these penalties
would in fact be imposed on these facts. Nobody may say so (FR-T-D012).

---

#### 10.13b.12 Negative and adversarial cases — what the system refuses

The controls are worth what they are worth under pressure from a hurried user, an integrator, or a
tenant who wants the numbers to look better. Each row is a test.

| # | Pressure | Surface | Required behaviour | Reason code |
| --- | --- | --- | --- | --- |
| N-1 | "Turn off the confirmer requirement for high-volume hiring" | Tenant settings | There is no such setting. The gate is not configurable off; only the AI features that create influence can be turned off (which is the honest lever) | — |
| N-2 | Integrator posts rejections in bulk through the API with a single confirmer string | API | Confirmer must resolve to a live user principal with the decide permission; a free string is refused | `CONFIRMER_NOT_RESOLVABLE` |
| N-3 | Tenant asks for the adverse-impact report to show a four-fifths ratio | Report | Refused; the report has no threshold surface, and support does not add one by configuration | `THRESHOLD_NOT_OFFERED` |
| N-4 | Tenant asks to hide the "prefer not to say" row because it "looks bad" | Report | Refused; the row is part of the instrument's own quality signal | `SUPPRESSION_RULES_FIXED` |
| N-5 | Tenant asks to infer gender from first names to fill the monitoring gap | Report and pipeline | Refused; inference is barred by FR-T-D003 and FR-T-D021, and no vendor or model may be configured to do it | `PROHIBITED_INFERENCE_REQUEST` |
| N-6 | Support is asked to edit a reason text after a complaint arrives | Back office | Refused; only G9's amendment path exists, only for the original confirmer, only inside the correction window, and it appends | `SNAPSHOT_IMMUTABLE` |
| N-7 | Tenant asks to delete decision records for a period "to reduce clutter" | Retention settings | Refused while any hold is in force; otherwise governed by the retention class and the erasure matrix, never by a bulk delete button | `RETENTION_CLASS_GOVERNED` |
| N-8 | Sales asks for a claim that the product "makes AI hiring compliant in India" | Collateral | Refused by FR-T-D012 and §23 FR-LEG-023; the sanctioned framing is the s.90 due-diligence defence (EV-079) | `CLAIM_NOT_CLEARED` |
| N-9 | Tenant asks to publish the EOP with the manner-of-selection clause edited to say no AI is used, while AI features are on | EOP generator | The clause is generated from live configuration; a manual edit that contradicts it is refused, and the tenant is offered the honest alternative of turning the features off (FR-LEG-022) | `EOP_CLAUSE_CONTRADICTS_CONFIG` |
| N-10 | Tenant asks for the disability record in Form III "because the CCPD template mentions Rule 14" | Rule 9(1) record | Refused; Rule 14 prescribes Form III for Government establishments, and the template's reference is a known drafting gap (EV-078; research r5/05 finding 8). The five particulars are produced in the product's own format | `FORM_III_NOT_APPLICABLE` |
| N-11 | A model completion volunteers an inference about a candidate's disability | Assistant | Treated as an AI-safety incident under §12 and §17's AI/ML incident class, not as a content quality bug | `PROHIBITED_INFERENCE_OUTPUT` |
| N-12 | A tenant configures a knock-out on "no employment gaps" | Rule builder | Permitted only through the FR-T-D020 review, which records the job-relatedness argument; the product neither blocks it as a proxy nor stays silent | `REVIEW_REQUIRED` |
| N-13 | Two tenants ask to compare their pass-rates | Report | Refused; no cross-tenant benchmark exists (§10.13b.7) | `NO_BENCHMARK` |
| N-14 | An erasure request arrives for a candidate whose decision is in an open complaint case | Privacy console | The hold wins: nothing held is erased, and the requester is told the data is held for proceedings (E-2; FR-LEG-026) | `RETENTION_HOLD` |

---

#### 10.13b.13 Test scenarios and the regression corpus

The FR-T-D set is the part of §10 most likely to pass a demo and fail in production, because its
failures are silent: a decision commits, nothing looks wrong, and the gap appears two years later
when someone asks for the record. So the tests are specified here, not left to a test plan, and
the ones marked **must-not-regress** are part of the release gate for any talent build (§05).

**Gate and decision-record suite.**

```gherkin
# T-D-01 must-not-regress
Given any adverse decision type on an influenced person
When the decision is committed through any surface - UI, API, bulk runner, rule engine
Then a decision record, an influence record and a snapshot exist
And the three are written in one transaction with the state change

# T-D-02 must-not-regress
Given a snapshot block cannot be composed because the requisition version was hard-deleted
When commit is attempted
Then the commit fails, the person's state is unchanged, and the user is told which block failed

# T-D-03
Given a confirmer's user account is deactivated after the decision
When the reconstruction pack is produced
Then the confirmer's display name still renders from the copied value

# T-D-04
Given a decision is reversed
Then a new decision record exists with reversal_of set
And the original record and snapshot are byte-identical to their pre-reversal state

# T-D-05
Given the correction window is open and the original confirmer amends the reason
Then the reconstruction shows both the original and the amended text with their timestamps

# T-D-06 must-not-regress
Given the snapshot chain has a break introduced by a restore from backup
When the verification report runs
Then it names the affected range and the break is raised as an incident, not a support ticket
```

**Taint suite.**

```gherkin
# T-D-10
Given the applicant list is rendered unsorted with no AI artefacts
When a recruiter rejects a candidate
Then influence_class is NONE and the gate does not apply
And the decision record still exists with its reason if the tenant requires one by policy

# T-D-11 must-not-regress
Given an AI summary was rendered at screen stage
When the candidate is rejected three stages later by a different user
Then the later decision is AI-influenced by TR-2
And the snapshot's context block names the earlier render

# T-D-12
Given a candidate record is merged by dedup with a second application
Then influence records from both source records resolve against the surviving person entity
And the reconstruction shows the merge with its date

# T-D-13
Given the client fails to report a render event
When a decision is committed for that person and context
Then influence resolves to SHOWN with resolution ASSUMED
```

**Bar and wall suite.**

```gherkin
# T-D-20 must-not-regress
Given any scoring or ranking service
When it attempts to read the accommodation, declaration, identity-confidentiality or complaint store
Then the read fails on authorisation, not on a filter

# T-D-21 must-not-regress
Given a migration adds a barred attribute column to a scoring-store table
When CI runs
Then the build fails with the column and table named

# T-D-22
Given a rule builder session
Then no barred attribute or accommodation-derived field appears in the field picker
And a rule referencing one by id is rejected at save

# T-D-23
Given a requisition carries a sex-based criterion with no cited law
When publication is attempted
Then publication is blocked and the citation field is required

# T-D-24
Given an accommodation record exists
When a payroll component or recoverable advance is created referencing it
Then creation is refused with the RPwD Rule 3(4) reason
```

**Monitoring suite.**

```gherkin
# T-D-30 must-not-regress
Given adverse_impact_min_cell_size is set to 5
And a column contains cells 21, 1, 4 and 9 with a visible total
When the report renders
Then the 1 and the 4 are both suppressed
And the total is shown only if at least two cells survive in that column

# T-D-31
Given a person has withdrawn their monitoring declaration
When the next report runs
Then that person is counted in the no-declaration row from the withdrawal date forward
And prior published reports are not retrospectively altered

# T-D-32
Given an observation has been open for longer than the tenant's review period
Then it appears in the control owner's queue
And no disposition, conclusion or action is generated by the product
```

**EOP and complaint suite.**

```gherkin
# T-D-40 must-not-regress
Given a published EOP whose manner-of-selection clause describes the AI configuration
When a talent AI feature is enabled or disabled
Then the published version is marked STALE within one periodic check
And the tenant is prompted to approve and publish a new version

# T-D-41
Given a tenant crosses from 19 to 20 employees on a joining date
Then a dated task is raised naming the twenty-employee line, its counting unit and the Rule 8(3) and Rule 9(1) duties
And the tenant's threshold-fact history records the crossing at the joining date

# T-D-42 must-not-regress
Given a disability-discrimination complaint at a tenant with 64 persons
When intake records it
Then an RPWD_R3_2 case opens, a retention hold is placed on the subject's snapshots
And the Commissioner's 60-day clock is displayed as the Commissioner's, with 30 days in exceptional cases noted

# T-D-43
Given a complaint alleging both disability discrimination and sexual harassment
Then two linked cases open, each with its own owner and clock
And closing one does not close the other

# T-D-44
Given the snapshot for a complained-of decision was erased before the hold
When the response assembler runs
Then it produces no draft and states that the decision cannot be reconstructed and why

# T-D-45
Given a tenant of 19 persons receives a disability complaint
Then a TENANT_POLICY case opens
And the screen states that the Rule 3(2) written-response duty attaches at twenty persons, without asserting that nothing else applies
```

**The regression corpus.** §12.13 owns golden sets for AI behaviour; this corpus is different and
belongs to talent: a fixed set of recorded decisions — one per row of the §10.13b.1 surface
inventory, one per adverse `decision_type`, one per erasure case E-1 to E-5, and one per routing
row C-1 to C-8 — each with its expected reconstruction pack. A build that changes the snapshot
schema must reproduce every historical pack from the stored payloads, because a schema migration
that silently drops a block is indistinguishable from the failure this whole subsection exists to
prevent.

---

#### 10.13b.14 Coverage matrix — control, evidence, acceptance, and what is still open

| Control | FRs | Evidence relied on | Acceptance in | Open item |
| --- | --- | --- | --- | --- |
| Named confirmer on AI-influenced adverse decisions | D001, D013, D014, D015, D031 | EV-076 (why a human must be nameable), EV-079 (s.90) | §10.13b.1, §10.13b.3 | None; mechanism is fully specified |
| Reconstruct this decision | D002, D016, D017, D018, D030, D032 | EV-079 (s.93 production penalty) | §10.13b.2, §10.13b.4 | Retention basis after erasure — §23 CR-39, Part D-9 |
| Adverse-impact monitoring without a threshold | D003, D021, D022, D023 | EV-083 (*Nitisha* declined a quantitative threshold) | §10.13b.7 | `adverse_impact_min_cell_size` — owner decision with counsel |
| Structural bar on protected attributes | D004, D019, D020 | EV-081 (sex in recruitment), EV-082 (HIV), EV-080 (gender identity), EV-077 (CCPD on selection criteria) | §10.13b.5 | Whether the Code on Wages' managerial exclusion narrows s.3 for senior hiring — §23 CR-38 |
| Disability data walled for accommodation and the record | D004, D007, D028 | EV-078 (Rule 9(1) particulars, Form III scope), r5/05 finding 3 (Rule 3(4)) | §10.13b.6 | None |
| EOP generator | D006, D024, D025, D026 | EV-077 (Rule 8 split at twenty, CCPD template, no portal) | §10.13b.8 | Whether the Union's *Jane Kaushik* model policy has issued — §23 LW-07 |
| Rule 3(2) written response | D008, D027 | EV-076 (the duty and the 60-day disposal clock) | §10.13b.9 | `rpwd_response_target_days` — tenant policy, counsel input |
| Complaint-officer workflows | D009, D010, D011 | EV-080, EV-082, EV-056, EV-083 | §10.13b.9 | Transgender Rules 12–13 are mirror-sourced (EV-080); POSH IC further duties — §23 CR-49; the 2026 Amendment's commencement — §23 CR-40 |
| Performance and exit parity | D005, D029 | EV-077 (CCPD para V, permissive), EV-082 (HIV proviso), r5/05 finding 22 (CoSS s.68) | §10.13b.10 | Whether RPwD s.20(3) reaches private employers — §23 |
| Claims control | D012 | EV-079, EV-066, EV-084 | §10.13b.12 N-8; §23 FR-LEG-023 | None; enforcement is §23's |
| Officer designations and case confidentiality | D033, D034 | EV-056 (IC at every employer), EV-080 (Rule 13(1) designation, Rule 12 confidentiality), EV-082 (Complaints Officer line), EV-083 (*Jane Kaushik* direction 199(iv)) | §10.13b.17 | Whether a vacancy carries a statutory consequence — not stated; §23 |
| Migration honesty | D035 | — (a product rule, not an evidence claim) | §10.13b.19 | None |
| Administrative endings are decisions | D036 | EV-076 (a written response presupposes a nameable decider) | §10.13b.24 | `standing_confirmation_review_months` — product decision |

**Phasing.** Every FR-T-D control is v1.5 except the eight the next paragraph names, and the v1.5
set divides into two halves of fourteen. The **decision-record machinery** — D001, D002, D013,
D014, D015, D016, D017, D018, D019, D030, D031, D032, D035, D036 — is the load-bearing half, and
all of it except the reconstruction pack (D018) is a write path: if the records are not being
written from the first AI-influenced decision, they cannot be back-filled (§10.13b.19), and the
module ships with a hole where its evidence should be. The **duty surfaces** — D004, D006, D007, D008,
D009, D011, D012, D024, D025, D026, D027, D028, D033, D034 — are v1.5 as well, because each
attaches to the establishment from the day it crosses its line, not to the recruiting module. The
v2 set is exactly eight: D003, D005 (performance surfaces that do not exist until v2), D010, D020,
D021, D022, D023 and D029 — each either downstream of a module that arrives later or dependent on
a parameter that counsel has not set. Nothing in the v2 set is a prerequisite for the v1.5 set,
and nothing in the v1.5 set waits on an open question: this is deliberate, and it is why the open
items above sit on parameters and copy rather than on whether to write a record.

---

#### 10.13b.15 Roles, permissions and the control owner

§07 owns the permissions matrix; this subsection names the roles the FR-T-D controls add to it
and the two places where maker and checker must be different people. Roles are per establishment,
because every duty in this set attaches to an establishment (§10.13b.8) and a group with four
establishments has four sets of officers.

| Role | Grants | Withheld | Maker-checker |
| --- | --- | --- | --- |
| **Control owner** | Sees the open-item queues for every control in §10.13b: open observations, stale EOPs, missing designations, breached clocks, unresolved wall-breach alerts. Configures the tenant's flagging rule of thumb and review periods | Cannot decide a person decision in that capacity; cannot read the accommodation store | Is the checker for changes to `adverse_impact_min_cell_size` and to delegation settings |
| **Accommodation reviewer** | The accommodation store and lifecycle; contributes the facilities particular to the Rule 9(1) record | No recruiting decision permission on the same requisitions, so an accommodation cannot be traded against an outcome | Declining an accommodation requires a written reason and is visible to the control owner |
| **Disability-record keeper** | The Rule 9(1) record and its export | No scoring, no accommodation assessment | Export is logged with actor and purpose |
| **Complaint officer — Transgender Persons Act** | `TG_COMPLAINT` cases; the identity-confidentiality store for case subjects | Nothing else; the confidentiality obligation is the reason this role is narrow (Rule 12, EV-080) | Designation itself is a record with a date (FR-T-D009) |
| **Complaints Officer — HIV and AIDS Act** | `HIV_COMPLAINT` cases and any Ombudsman order | Nothing else | Designation required at the statutory line; the role exists below it if the tenant designates voluntarily |
| **Internal Committee member** | `POSH_COMPLAINT` cases | Nothing else | IC constitution order held as a record (FR-T-D011) |
| **Establishment head or delegate** | Elects the Rule 3(2) exit; approves and issues the written response | — | The approver of a response may not be the confirmer of the decision complained of, where the tenant has more than one eligible approver |
| **Recruiter / hiring manager** | Propose and confirm decisions per §07 | No access to any wall store; own decisions only in reconstruction | The gate itself is the control, not a second approver |

Two notes. First, the establishment-head exception is written as "where the tenant has more than
one eligible approver", because at twenty-five people the founder may be both the confirmer and
the only person who can sign the letter, and a rule that cannot be satisfied is a rule that gets
switched off. What the product does in that case is record that the approver and the confirmer
were the same person — a fact a reader can weigh — rather than block the response. Second, none of
these roles is a licence surface: they are free, because charging for the role that keeps the
record would be the kind of packaging this PRD spends §18 arguing against.

**Acceptance — roles:**

```gherkin
Given a user holds the accommodation reviewer role for an establishment
When they open a requisition in that establishment
Then they have no decide permission on its candidates

Given a tenant with one eligible approver
When the establishment head approves a Rule 3(2) response for a decision they themselves confirmed
Then the response issues
And the case records that the approver and the confirmer were the same person

Given a control owner changes adverse_impact_min_cell_size
Then the change requires a second named approver and is written to the FR-T-D030 log
```

---

#### 10.13b.16 Candidate-facing disclosure and the accessibility of the recruiting surfaces

Two obligations of a different kind sit on the candidate side: telling people that AI is being
used on their application, and making the process itself usable by a candidate who needs an
adjustment. Neither is a legal mandate this PRD asserts — DPDP's Chapter III, when it commences,
creates no right against automated decisions, to an explanation or to human review (EV-066), and we
are not aware of any other Indian provision that does as of September 2026; the CCPD template is
guidance shaping what the Commissioner's office will register (EV-077) — and both are product
decisions taken for defensibility and because the alternative is indefensible in a demo.

**The disclosure record.** Part E-7 requires a per-person AI disclosure record at every call site;
§12 owns the mechanism, and these are the talent call sites and what each discloses.

| Call site | Disclosed to | When | Content | Record written |
| --- | --- | --- | --- | --- |
| Career site application (FR-T-R16) | Candidate | Before submission, alongside the consent capture (FR-T-X02) | That applications may be summarised or parsed by an AI system, that a named human decides, and that the candidate may ask for the decision to be reviewed by a human | Disclosure version, timestamp, candidate ref |
| Board-ingested application (FR-T-R11) | Candidate | At first contact from the employer | The same content, in the first message | As above |
| Interview scheduling | Candidate | With the invitation | That an accommodation may be requested and how | As above |
| Employee review cycle (§10.10) | Employee | At cycle open | Which AI assistance is in use in the cycle and that ratings are human decisions | Disclosure version, timestamp, employee ref |
| Assistant surfaces | Employee or candidate | On the surface | §12's standing disclosure | §12 |

The disclosure text is versioned, and the version in force is copied into the snapshot's `context`
block, so a later question about what the candidate was told is answered from the record rather
than from the current website. The product does not promise an explanation of a score, because it
cannot always give one and a promise it breaks is worse than no promise; it promises a named human
and a reason, which are things it can always produce (FR-T-D001).

**Accessibility of the recruiting surfaces.** The CCPD template's recruitment-accommodation list
(para III(a)) names accessible advertisement formats, a scribe, an interpreter, screen readers,
and the inclusion of a person with disability as an expert on the selection committee (EV-077;
research r5/05 finding 14). Each maps to a product surface:

| Template item | Product behaviour | Where |
| --- | --- | --- |
| Advertisement in an accessible format | The career site and the generated JD render to a screen-reader-usable structure; the JD generator does not emit images of text; postings carry the tenant's accessibility statement where configured | FR-T-R16, FR-T-X09 |
| Scribe, interpreter | An accommodation request type available from the application surface, not only after an offer; scheduling carries the requirement to the interview as a logistics attribute (§10.13b.6) | FR-T-D028, FR-T-R30 |
| Screen readers | Applicant-facing surfaces meet the tenant-visible accessibility conformance target named in §17; talent adds no exception to it | §17 |
| A person with disability on the selection committee | Panel composition (FR-T-R34) can record that a panel member is serving in this capacity, by their own declaration; the product never infers it and never requires the disclosure | FR-T-R34, FR-T-D021 |

**Edge cases.**

| Case | Behaviour |
| --- | --- |
| A candidate asks for a human review of a rejection | The request is recorded against the decision and routed to the establishment's queue. The product makes no promise about the outcome, and records the response given |
| A candidate asks what the AI "score" was | The reconstruction pack is an employer artefact, not a candidate one. What the candidate receives is decided by the tenant; the product's default is the reason text the confirmer recorded, and nothing derived from `attribution` |
| A candidate requests an adjustment at application, and the requisition is later cancelled | The accommodation request closes as `WITHDRAWN` with the cancellation recorded; the request does not follow the person to another requisition without their action |
| The tenant disables all talent AI | The disclosure is not shown for the disabled call sites; the disclosure records already written stay, because they record what a person was told at the time |

---

#### 10.13b.17 Officer designations and confidentiality — the record spec

Three statutes require a designated person; *Jane Kaushik* directed the States and Union
Territories to ensure that every establishment designates a complaint officer under the
Transgender Persons Act (direction 199(iv); EV-083, research r5/05 finding 27). The product holds
each designation as a first-class record, because "we had an officer" is a claim that needs a date
on it.

**Designation record fields.**

| Field | Notes |
| --- | --- |
| `statute` | `RPWD_LIAISON` (Rule 8(3)(e)), `TG_COMPLAINT_OFFICER` (s.11, Rule 13(1)), `HIV_COMPLAINTS_OFFICER` (s.21), `POSH_IC` (s.4(1), with member roles) |
| `establishment_ref` | Designations are per establishment |
| `person_ref`, `display_name`, `contact` | Contact is what is published where the statute or rule requires publication |
| `designated_on`, `designated_by`, `order_ref` | The POSH IC is constituted by an order in writing (s.4(1)); the order is attached |
| `ends_on`, `end_reason` | A vacancy is a state, not an absence of a record |
| `published_where` | For the designations that appear in a published policy (Rule 12 for transgender persons; the EOP for the liaison officer) |

**Vacancy behaviour.** When a designation ends with no successor, the product raises a dated task,
shows the establishment as having a vacancy, and keeps the intake open — complaints continue to be
received and are routed to the establishment head until a successor is designated. It does not
refuse intake, and it does not assert a consequence of the vacancy, because the consequences differ
by statute and none of them is ours to state (§23).

**Confidentiality.** The Transgender Persons Rules require confidentiality of gender identity in
the equal-opportunity policy's terms (Rule 12, mirror-sourced — EV-080), and a complaint under any
of these statutes is in the most sensitive category the product holds. So: case files are visible
only to the case owner, the designated officer for that statute and the establishment head;
tenant-wide roles including HR admin see the existence of a case and its clock, not its contents;
support and operations staff have no access at all except through §22's break-glass path with its
own log and notification; and export of a case file is permissioned, logged and watermarked like a
reconstruction pack (FR-T-D018).

**What the product does not build.** No annual POSH return, no IC report format, and no
Commissioner-facing submission beyond the EOP correspondence tracker — because those duties are
not re-verified in research (§23 CR-49) and a half-right statutory artefact is worse than none
(the standing rule of §06). The intake, the designation record and the case machine are built; the
outputs wait for verified formats.

| ID | Requirement | Pri | Phase | Money | Conf |
| --- | --- | --- | --- | --- | --- |
| **FR-T-D033** | **Officer designation records.** Per-establishment designation records for the RPwD liaison officer, the Transgender Persons Act complaint officer, the HIV Act Complaints Officer and the POSH Internal Committee, with designation and end dates, the constituting order where one exists, publication location, and vacancy tasks. Intake stays open during a vacancy and routes to the establishment head. AC1: no designation is inferred from a job title. AC2: the EOP's liaison-officer clause and the transgender policy's officer details render from these records (FR-T-D006, FR-T-D009). | P1 | v1.5 | Bundled | [Verified] |
| **FR-T-D034** | **Case confidentiality.** Case contents are visible only to the case owner, the designated officer for that statute and the establishment head; other roles see existence and clocks only; support access is break-glass with notification (§22); export is permissioned, logged and watermarked. AC1: a tenant-wide admin export never includes case contents. AC2: every break-glass access notifies the tenant's control owner within the §22 window. | P1 | v1.5 | — | [Verified] |

---

#### 10.13b.18 Reason-code registry

Every refusal in §10.13b returns a code, because a refusal a user cannot name is a refusal support
cannot explain and an integrator cannot handle. The registry is versioned with the API (§16) and
each code states what the caller should do instead. No code carries a legal characterisation.

| Code | Raised at | Meaning | Caller's next step |
| --- | --- | --- | --- |
| `CONFIRMER_REQUIRED` | Gate G3 | Adverse decision on an influenced person with no confirmation payload | Supply confirmer, timestamp and reason through an interactive session |
| `CONFIRMER_NOT_NATURAL_PERSON` | Gate G4 | Service account, integration principal or scheduler offered as confirmer | A human must confirm |
| `CONFIRMER_NOT_RESOLVABLE` | API | Confirmer does not resolve to a live user principal | Use a user token, not a string |
| `CONFIRMER_LACKS_PERMISSION` | Gate G4 | Confirmer lacks decide permission on this context | Route to someone who holds it |
| `CONFIRMER_IS_SUBJECT` | Gate G4 | The confirmer is the subject of the decision | Route to another decider |
| `REASON_EMPTY` | Gate G4 | Reason text empty after trimming | Supply a reason |
| `SNAPSHOT_INCOMPLETE` | Gate G7 | A required snapshot block could not be composed | Retry; if it persists, the named block is a defect, not a user error |
| `SNAPSHOT_IMMUTABLE` | Any edit path | Attempt to alter a committed snapshot | Use the G9 amendment path if eligible |
| `FIELD_BARRED_FROM_SCORING` | Rule builder, pipeline | A barred attribute or accommodation-derived field was referenced by a scoring path | Remove the reference; the field remains available for its lawful purpose |
| `SEX_CRITERION_WITHOUT_BASIS` | Requisition publish | A sex-based criterion with no cited prohibiting or restricting law | Record the law, or remove the criterion |
| `PROHIBITED_INFERENCE_REQUEST` | Chokepoint | A prompt asks the model to infer a barred attribute | Not available by configuration |
| `PROHIBITED_INFERENCE_OUTPUT` | Chokepoint, egress | A completion volunteers an inference about a barred attribute | Handled as an AI-safety incident (§12, §17) |
| `IMPORT_COLUMN_REFUSED` | Import | A source column maps to a barred attribute | The column is reported and discarded; the rest of the import proceeds |
| `WALL_BREACH` | Configuration audit, CI | A scoring path holds or gains a credential for a walled store | Incident; the grant is revoked and reported |
| `THRESHOLD_NOT_OFFERED` | Report | A quantitative adverse-impact threshold was requested | Not available; the tenant's own flagging rule of thumb is the configurable surface |
| `SUPPRESSION_RULES_FIXED` | Report | A request to alter suppression or hide a row | Not available |
| `NO_BENCHMARK` | Report | Cross-tenant comparison requested | Not available |
| `RETENTION_HOLD` | Privacy console | Erasure touching held data | Nothing held is erased; the hold's case is named |
| `RETENTION_CLASS_GOVERNED` | Retention settings | Bulk delete of decision records requested | Retention runs by class and the erasure matrix only |
| `EOP_CLAUSE_CONTRADICTS_CONFIG` | EOP editor | A manual edit contradicts live configuration | Change the configuration, or accept the generated clause |
| `EOP_CLAUSE_INCOMPLETE` | EOP publish | A required Rule 8(3) clause is unfilled | Complete the clause |
| `FORM_III_NOT_APPLICABLE` | Rule 9(1) export | Form III requested | The five particulars are produced in the product's format (EV-078) |
| `DESIGNATION_MISSING` | Case routing | A statute's case type opened with no designated officer | The case routes to the establishment head and a designation task is raised |
| `CLAIM_NOT_CLEARED` | Content surfaces | Uncleared legal claim about a control | §23 clearance (FR-LEG-023) |
| `REVIEW_REQUIRED` | Allow-list, binding change | A feature or binding change needs the FR-T-D020 review | Record the review |
| `ACCOMMODATION_COST_LINK_REFUSED` | Payroll component creation | A component references an accommodation record | Not available (RPwD Rule 3(4)) |

---

#### 10.13b.19 Migration, backfill and the temptation to fabricate

Most tenants arrive with hiring history in a spreadsheet or another ATS, and a founder's first
question about this module is whether it can produce the record for *last year's* decisions. It
cannot, and the product says so plainly. This subsection specifies that refusal so it is not
quietly re-litigated during an implementation.

| Case | Behaviour | Why |
| --- | --- | --- |
| Historical candidates and decisions imported from another ATS | Imported decisions are marked `provenance = IMPORTED` with the source system and import date; they carry no snapshot, no confirmer and no influence class | There is no record of who decided or what they saw; a manufactured one is a false record in exactly the file a complaint would reach |
| A reconstruction is requested for an imported decision | The pack returns the imported fields, states that the decision predates the product's records and names the source system and import date | A truthful gap beats a plausible reconstruction (§10.13b.9's assembler rule) |
| A tenant asks to have confirmers assigned retrospectively to imported decisions | Refused; the only writable field is a note recording the tenant's own statement of who decided, attributed to the person making the statement and dated at the statement | The record then says what it is — a later assertion, not a contemporaneous one |
| An in-flight requisition is migrated mid-pipeline | Decisions from the cut-over date forward carry full records; the requisition's reconstruction pack shows the cut-over date and which decisions precede it | The boundary is a fact worth recording |
| A tenant migrates its EOP from another system | The EOP is imported as a `PUBLISHED` version with its publication evidence if the tenant has any, and marked `STALE` immediately if its manner-of-selection clause cannot be reconciled with live configuration | The generator never claims a document it did not produce is consistent with the system |
| Historical complaint cases | Imported as closed cases with their dates and outcomes as supplied; clocks are not retro-computed | A clock computed after the fact would imply a breach or compliance the product cannot evidence |

The onboarding flow states the position once, in the tenant's own words: records start when the
product starts. That sentence is also why the v1.5 phasing of the write-path FRs matters
(§10.13b.14) — a tenant that runs six months of AI-assisted hiring before the records are switched
on has six months of the same gap as a migrated tenant.

| ID | Requirement | Pri | Phase | Money | Conf |
| --- | --- | --- | --- | --- | --- |
| **FR-T-D035** | **Imported-decision provenance.** Decisions arriving by import or migration carry `provenance = IMPORTED` with the source system and date, no snapshot, no confirmer and no influence class; reconstruction returns the imported fields with an explicit statement that the decision predates the product's records. Retrospective assignment of confirmers is refused; a tenant statement about who decided is stored as a dated, attributed note, never as a decision record field. | P1 | v1.5 | — | [Verified] |

---

#### 10.13b.20 Control-health metrics (definitions here, targets in §19)

§19 owns metric targets and the metric tree; these are the definitions §19 consumes, stated here
because they are computed off this subsection's entities and nowhere else. Every one is a
numerator over a denominator with a source table; none has a target in this section.

| Metric | Numerator | Denominator | Source | Read as |
| --- | --- | --- | --- | --- |
| Snapshot coverage | Adverse influenced decisions with a complete snapshot | All adverse influenced decisions | `TalentDecision` | A value below 100% is a defect, not a KPI — FR-T-D017 makes the gap impossible by design, so any shortfall means a write path bypassed the gate |
| Gate friction | Decisions abandoned at `GATE_PENDING` | Decisions entering `GATE_PENDING` | `TalentDecision` state log | High abandonment may mean the control is being routed around; investigate the surface, not the user |
| Reason quality (manual sample) | Reasons a reviewer judges to identify the criterion applied | Sampled reasons | Sampling job | A quality signal, never enforced by a model — a model judging the adequacy of a human's reason is the inversion this section exists to prevent |
| Reconstruction latency | Packs produced within the tenant's stated need | Packs requested | Export log | Matters because s.93's daily element accrues while an employer cannot produce (EV-079) |
| Chain integrity | Verified snapshot ranges with no break | Verified ranges | Verification report | Any break is an incident (FR-T-D016) |
| EOP freshness | Establishments whose published EOP is not `STALE` | Establishments | EOP versions | Staleness is expected after a configuration change; the metric measures how long it persists |
| Designation completeness | Establishments with a live designation for each applicable statute | Establishment × applicable statute pairs | Designation records | Applicability is computed from threshold facts with their counting units (FR-T-D026) |
| Clock breaches | Cases past a clock limit | Open cases with that clock | Complaint cases | The Commissioner's clock is reported separately, and is never described as the employer's deadline |
| Open observations ageing | Observations open past the tenant's review period | Observations raised | Adverse-impact observations | The disposition loop is the evidence; an ageing queue is the failure mode |

Two metrics are deliberately absent. There is no "bias score" and no aggregate fairness index:
both would be a quantitative threshold by another name, and *Nitisha* declined to lay one down
(EV-083). And there is no metric of complaint *outcomes* — how many complaints were resolved in
the employer's favour — because a product that measured that would be optimising the wrong thing.

---

#### 10.13b.21 The production packet — answering a demand for records

RPwD Rule 9(2) addresses production on demand to every establishment, and the Commissioners hold
civil-court powers of discovery and production, with proceedings before them treated as judicial
proceedings (research r5/05 findings 7, 13). The penalty for being unable to produce is s.93's
per-offence fine with its daily accrual (EV-079). The product's answer is one assembled packet,
not a scramble through screens, and its composition is specified so that what leaves a tenant is
predictable.

**Packet contents, by demand type.**

| Demand | Assembled from | Excluded | Cover states |
| --- | --- | --- | --- |
| The Rule 9(1) record | FR-T-D007 generator, as at the demand date | Accommodation assessments, diagnoses, complaint files | The generation date, the employee-count fact used, and that no format is prescribed for private establishments (EV-078) |
| Selection criteria for a named requisition | Requisition versions, screening and knock-out rules, scorecard definitions, the EOP version in force | Other candidates' records | The versions in force and their dates |
| Particulars of a named decision | Reconstruction pack (FR-T-D018) | Other candidates, unrelated fields of the subject's record | Chain verification result; any erasure that has occurred, with its date |
| The equal opportunity policy | The published version and its publication evidence; registration correspondence if any | Drafts and superseded versions unless asked for | Publication channel and date; registration status only where an artefact exists (FR-T-D025) |
| Officer designations | Designation records with dates and any constituting order | Case contents | Vacancy periods, if any |
| Accommodation history for a named person | That person's accommodation records and outcomes | Other people; the decision snapshots unless separately demanded | Whether any accommodation was declined and that the written reason is included |

**Rules the assembler follows.**

| # | Rule | Reason |
| --- | --- | --- |
| P-1 | Third-party personal data is excluded by construction — a packet about one person never carries another candidate's record, and an aggregate never carries a cell below the suppression minimum | The demand is about the employer's compliance, not about other people |
| P-2 | Every packet carries an index, the tenant and establishment, the demand reference if supplied, the assembly date, and the id of every record it contains | So the same packet can be re-produced identically later |
| P-3 | Nothing in a packet is generated prose about the law, and no cover sheet asserts compliance | FR-T-D012 |
| P-4 | A gap is stated as a gap, with the reason — imported decision, erased snapshot, record not kept at that size | A packet that silently omits is worse than one that discloses |
| P-5 | Assembly, export and delivery are logged with actor, purpose and destination; the packet is watermarked with tenant, date and packet id | The log is itself evidence of the production |
| P-6 | A packet assembled for a case is stored with the case and inherits its retention hold | The case file must be reproducible |

**Acceptance — production:**

```gherkin
Given a demand for the particulars of a named decision
When the packet is assembled
Then it contains the reconstruction pack, the chain verification result and the index
And it contains no other candidate's data
And its cover names every gap with the reason for it

Given a demand at a tenant that kept no Rule 9(1) record because it was below twenty employees
When the packet is assembled
Then it contains the record as produced now, the threshold-fact history showing the tenant's size over the period
And the cover states which periods the record was not prescribed for, without asserting an exemption
```

---

#### 10.13b.22 Worked example — a performance decision and a PIP

The hiring trace in §10.13b.11 is the common case; the performance side is where the controls meet
money and exit, and where the interaction with §10.10 needs to be concrete. Dates and people are
illustrative; the rupee figures are the ledger's.

**Cycle open, 1 April 2027.** An annual cycle opens for 61 employees. AI review-text drafting
(FR-T-X09) is enabled for managers. At cycle open, every employee receives the §10.13b.16
disclosure that drafting assistance is in use and that ratings are human decisions; the disclosure
version is recorded.

**20 April — a drafted review.** A manager drafts a review for an employee using the assistant,
edits it, and submits. The draft is marked AI-drafted (FR-T-X10) and an influence record of class
`SHOWN` is written against the employee for this cycle (TR-1). The rating itself is the manager's.
Because the rating is a `RATING` decision on an influenced person, the gate applies: the manager
supplies the reason, and a snapshot captures the form definition, the rating scale in force, the
retained drafted text and the confirmer.

**8 May — calibration.** In the calibration session (FR-T-P13) the employee is moved down one
band. §10.10 already requires the move to record actor, from, to and reason immutably; FR-T-D005
adds that the mover is a named confirmer under FR-T-D014 and that a snapshot records the
distribution mode in force — forced curve or none — because "the curve made us" is either true and
evidenced or not said. The calibration snapshot references the rating snapshot rather than copying
it.

**15 May — the increment.** The final rating maps through FR-T-P18 to an increment band. The
mapping is deterministic, so no new influence arises; but TR-2 makes the increment decision
AI-influenced through the rating that fed it, and the increment decision therefore carries its own
confirmer and snapshot. The resulting effective-dated CTC change carries the decision id into
payroll (§10.10, FR-T-P15/P16), so a question asked in 2029 about this increment resolves to this
snapshot and not to a reconstruction of the appraisal from current data.

**2 June — a PIP.** The same employee is placed on a PIP. `PIP_START` is adverse and influenced:
gate, reason, snapshot. Two guards run before commit (FR-T-D029). The employee is not recorded as
within the HIV Act's protection, so that guard is inert. The maternity guard checks whether the
employee is on maternity absence; they are not, so it is inert as well. Had either been live, the
commit would have required the documents or the named override, and the guard's own snapshot would
record which.

**What the records are worth if this becomes a complaint.** If the employee complains of
disability discrimination and the tenant is above twenty persons, the Rule 3(2) exit opens
(EV-076). The evidence pack is four linked snapshots — review, calibration, increment, PIP — each
with a named confirmer, each with the criteria in force at the time. The employer still has to
write the proportionality argument itself (part 4 of §10.13b.9's assembler); what it does not have
to do is reconstruct from memory what the rating scale was in April, whether the curve was on in
May, or who moved the band.

**And if the records do not exist.** The exposure arithmetic is the same shape as §10.13b.11's:
s.93's fine may extend to ₹25,000 in respect of each offence, with a further fine up to ₹1,000 for
each day of continued failure (EV-079). Four demands the employer cannot answer — the criteria, the
calibration basis, the increment basis and the PIP basis — is 4 × ₹25,000 = **₹1,00,000** before
any daily accrual; thirty days of continued failure adds 30 × ₹1,000 = ₹30,000, for **₹1,30,000**.
Against EV-027's ₹29,940 annual contract value for greytHR at twenty employees, that is more than
four years of software spend arising from one cycle's missing records. As in §10.13b.11, this is
an illustration of magnitude from ledger figures and is neither a prediction nor a legal opinion
(FR-T-D012).

---

#### 10.13b.23 Failure modes and operational edge cases

The controls are write paths inside a transactional system with retries, mobile clients, multiple
time zones and an assistant that can be asked anything. These are the failure modes a build team
will meet, with the required behaviour for each. Every row is a test case in the §10.13b.13
corpus.

| # | Failure mode | Required behaviour |
| --- | --- | --- |
| F-1 | The decision commits but the snapshot write fails after the state change | Impossible by construction: the snapshot is composed and written inside the same transaction (S-1). If a deployment breaks that atomicity, the break is an incident of the same class as a chain break (FR-T-D016) |
| F-2 | A client retries a decision submission after a network timeout | The decision endpoint is idempotent on a caller-supplied key; a retry returns the original decision id and writes no second record or snapshot |
| F-3 | Two recruiters confirm the same proposed decision concurrently | The first confirmation wins; the second returns the committed decision and is recorded as a duplicate attempt with its actor, so the record shows both people acted |
| F-4 | A confirmer's session expires between opening the dialogue and submitting | The confirmation is refused; re-authentication is required; the proposal remains in `GATE_PENDING` |
| F-5 | The confirmer's device clock is wrong | `confirmed_at` is the server's time; the client's claimed time is stored alongside it only when it differs beyond a tolerance, and the difference is shown in the reconstruction |
| F-6 | A decision is taken by a user in a different time zone from the establishment | Timestamps are stored with zone; the pack renders both the recorded zone and the establishment's, because a complaint about a date needs the establishment's day |
| F-7 | A bulk run partially fails at person 23 of 40 | The 22 committed decisions stand with their snapshots; the remainder are reported as not committed with their reason; no partial-batch record is written for anyone |
| F-8 | The model service is unavailable when a list would otherwise be ranked | The list renders unranked and no influence record is written; the surface says the ranking is unavailable rather than showing a stale order |
| F-9 | A model binding is retired while a proposal is open | The open proposal's snapshot still captures the binding it ran under, copied by value (S-2); a new proposal uses the new binding |
| F-10 | The tenant's kill switch is thrown mid-session | Surfaces stop rendering AI artefacts immediately; influence already recorded stands (TR-4); in-flight proposals keep the gate |
| F-11 | A candidate is merged into another record after decisions exist on both | Both decision histories resolve to the surviving entity, ordered by their own timestamps; the merge is an event in the reconstruction |
| F-12 | A requisition is deleted by a tenant admin | Requisition deletion is refused where committed decisions reference it; archival is offered instead, because S-2's copies protect the snapshot but the pack's cross-references should still resolve |
| F-13 | The reconstruction pack is requested for 4,000 decisions at once | The export runs asynchronously with a job record; the job's completion, actor and purpose are logged; partial packs are not delivered |
| F-14 | A tenant is in the middle of a complaint case when its subscription lapses | Case data and snapshots remain under the hold and are exportable by the tenant; §17's data-return terms govern, and no retention hold is released by billing state |
| F-15 | An establishment is closed or merged into another | Designations, EOP versions and cases stay attached to the original establishment with its closure date; new duties follow the surviving establishment's own threshold facts |
| F-16 | A tenant restores an old configuration from a backup | The configuration log (FR-T-D030) records the restore as a change with actor and time; snapshots continue to reflect what was in force at each decision, not what the backup says |
| F-17 | Two establishments share a hiring manager who confirms decisions in both | Decisions carry their own establishment context; the manager's permissions are per establishment (§10.13b.15) |
| F-18 | An observation's underlying declarations change after a report is published | Published reports are immutable artefacts with their run date; the next run reflects the change; no report is silently re-rendered |
| F-19 | A complaint arrives about a decision whose candidate record was purged at the retention horizon before any hold existed | The case opens; the pack returns the non-personal shell per E-3 and states the purge date; the assembler produces no draft that implies more is known (FR-T-D027) |
| F-20 | The assistant is asked to summarise "why we rejected everyone from this college" | The query is answered only from committed reasons and decision records, never by re-inferring; if the reasons do not support an answer, the assistant says so rather than generalising |

**Three of these deserve a note.** F-2's idempotency key is not an optimisation: without it a
flaky mobile connection produces two decision records for one human act, and a reviewer later sees
what looks like a repeated rejection. F-12's refusal to delete a referenced requisition is the one
place where this subsection constrains an unrelated admin action, and it is justified by the same
reasoning as S-2 — the pack must resolve years later. And F-19 is the case that argues hardest for
setting `candidate_retention_horizon` deliberately rather than defensively (§10.17): a short
horizon protects candidates and destroys the employer's ability to answer for itself, and that
trade-off is a counsel and owner decision, not a default someone picks in a sprint.

---

#### 10.13b.24 Administrative events that end candidature

The gate guards `REJECT`. The quiet risk is the set of events that end a person's candidature
without anyone pressing Reject: the stale-candidate auto-archive, the cancelled requisition, the
lapsed offer, the pipeline bulk-close at quarter end. Each is administratively reasonable and each
produces, from the candidate's side, exactly the experience of a rejection. This decision table
says which are decisions.

| Event | Ends candidature | Decision type written | Gate | Notes |
| --- | --- | --- | --- | --- |
| Recruiter presses Reject | Yes | `REJECT` | Yes when influenced | The base case |
| Knock-out rule fires | Yes | `KNOCKOUT` proposed, committed by a human when influenced | Yes | FR-T-D014 AC3 |
| Candidate withdraws | Yes | `HOLD` closed as candidate-withdrawn; no adverse decision | No | The person acted, not the employer; the record says so |
| Requisition cancelled or closed unfilled | Yes, for everyone in flight | `REJECT` with `reason_code = REQUISITION_CLOSED`, one per person | No confirmer per person; the cancelling user is the confirmer for the set, named once, and the reason is the cancellation | An honest bulk with a single true reason; the snapshot records the cancellation event id |
| Requisition filled, others in flight | Yes | `REJECT` with `reason_code = POSITION_FILLED`, one per person | As above, confirmed by the closing user | The most common silent ending in practice |
| Stale-candidate auto-archive after N days of no activity | Yes in effect | `REJECT` with `reason_code = LAPSED_NO_ACTIVITY` | The archive job cannot be the confirmer: the tenant must either set the job to *propose* and have a human close the batch, or accept that archiving is a rejection and name the recruiter who owns the requisition as confirmer at configuration time, recorded once with the setting | The one place the product allows a standing, pre-recorded confirmation, and it is recorded as standing, never as a click that did not happen |
| Candidate does not respond to an interview invitation | No, until the employer acts | None until an explicit decision | — | A non-response is not a decision |
| Offer lapses on its expiry date | Yes | `REJECT` with `reason_code = OFFER_LAPSED` | No | The lapse is a term of the offer; the date and the term are in the record |
| Offer withdrawn by the employer | Yes | `REJECT` with `reason_code = OFFER_WITHDRAWN` | Yes when influenced | Post-offer withdrawal is the most consequential rejection in the module and is treated as such |
| Candidate moved to talent pool instead of rejected | No | `HOLD` | No | Requires the extended consent of FR-T-R26 |
| Duplicate application merged | No | None | — | Dedup is not a decision (FR-T-R12) |

**The standing-confirmation rule.** The auto-archive row is the only place in §10.13b where a
confirmation may be recorded ahead of the decision. It is allowed because the alternative —
pretending a batch job is a person, or leaving thousands of candidates in a permanent limbo — is
worse, and it is constrained: the standing confirmation is a configuration record with a named
person, a date and a reason text that is used verbatim on every decision it covers; it expires on
`standing_confirmation_review_months` and must be renewed; it cannot be set by a service account;
and every decision it covers is marked `confirmation.standing = true` in the snapshot, so no
reader mistakes it for a contemporaneous act. A tenant that prefers not to use it sets the archive
job to propose-only, which is the default.

**Acceptance — administrative endings:**

```gherkin
Given a requisition with 30 candidates in flight
When a recruiter closes it as filled
Then 30 REJECT decisions are written with reason POSITION_FILLED
And each snapshot records the closing user, the closure event and the same reason text
And each candidate's notification follows the tenant's configured template

Given the stale-candidate archive job runs in propose-only mode
Then no candidature ends until a human closes the proposed batch

Given a tenant has configured a standing confirmation for the archive job
When the job archives a candidate
Then the decision records the standing confirmer, the configuration date and standing = true
And when the configuration passes its review period the job reverts to propose-only
```

| ID | Requirement | Pri | Phase | Money | Conf |
| --- | --- | --- | --- | --- | --- |
| **FR-T-D036** | **Administrative endings are decisions.** Every event in the table above that ends candidature writes a decision record per person with a true reason code; requisition closure and offer lapse name the acting user or the offer term; the stale-candidate archive is propose-only by default and may run on a standing confirmation only under the constraints of §10.13b.24, marked `standing = true` in every snapshot it covers and expiring on `standing_confirmation_review_months`. AC1: no path ends candidature without a decision record. AC2: a standing confirmation cannot be created by a service account or without a named person. | P1 | v1.5 | — | [Verified] |

---

#### 10.13b.25 The configuration surface

What a tenant may change, who may change it, and what changing it does elsewhere. This table is
the contract between §10.13b and §07's permissions, and it is the source the EOP's
manner-of-selection clause reads (FR-LEG-022).

| Setting | Values | Default | Who may change | Checker | Side effects |
| --- | --- | --- | --- | --- | --- |
| Talent AI features, per feature per stage | On / off | **Off** for tenants flagged RBI-, SEBI- or IRDAI-regulated (Part E-7); off elsewhere until enabled | Tenant admin | Control owner for regulated tenants | Marks the EOP `STALE`; logged (FR-T-D030); changes which surfaces write influence records |
| Tenant AI kill switch | Armed / thrown | Armed | Tenant admin or the product's incident process (§12, §17) | — | Immediate stop of AI rendering; influence already recorded stands |
| Confirmer delegation | Allowed / not allowed, with delegate list | Not allowed | Tenant admin | Control owner | Delegation recorded in every affected snapshot |
| `bulk_action_max_batch` | Integer | Set by Product before launch with its reason (§10.17) | Product | — | Caps bulk adverse actions |
| Stale-candidate archive | Propose-only / standing confirmation | Propose-only | Tenant admin | Control owner for standing confirmation | §10.13b.24 |
| `adverse_impact_min_cell_size` | Integer | Unset | Control owner | Second named approver | Report does not render while unset |
| Tenant flagging rule of thumb for observations | Tenant text | Unset | Control owner | — | Shown in the report header |
| `rpwd_response_target_days` | Integer | Unset | Legal owner (§10.17) | — | Adds an internal clock alongside the Commissioner's |
| `tg.*` clocks | Integers | 30 / 15 / 15 / 30, mirror-sourced and labelled | Legal owner | — | Case clocks; labels stay until the gazette pull |
| `decision_record_erasure_mode` | E-3 / E-4 | E-3; E-4 unavailable pending CR-39 | Legal owner | — | Governs what a reconstruction returns after erasure |
| `candidate_retention_horizon` | Duration | Unset (Part D-9) | Legal owner | — | Purge and re-consent behaviour (FR-T-X03) |
| Accommodation offerings published in the EOP | Set of the CCPD para III(a) items the tenant offers | Unset | Tenant admin | — | EOP content; career-site copy |
| Officer designations | Person per statute per establishment | Unset | Tenant admin | — | Case routing; EOP and transgender-policy clauses; vacancy tasks |

Three settings are deliberately absent from this surface, and their absence is the specification:
there is no setting that disables the confirmer gate (N-1), none that adds a quantitative
adverse-impact threshold (N-3), and none that grants a scoring path a credential for a walled
store — that grant is the `WALL_BREACH` incident of §10.13b.5, not a configuration anyone can
make. A support engineer asked to "just turn it off for this customer" has nothing to turn.

**Sectoral default.** Talent AI is default-off for RBI-, SEBI- and IRDAI-regulated tenants because
adding a model vendor to the processing chain can put such a customer in breach of its own
obligations before anyone asks (EV-085, EV-086, EV-087; Part E-7). Turning it on is a tenant
decision routed through the sub-processor consent gate of §12, recorded in the configuration log,
and reflected in the EOP's manner-of-selection clause like any other change.

**Acceptance — configuration:**

```gherkin
Given a tenant flagged as RBI-, SEBI- or IRDAI-regulated is provisioned
Then every talent AI feature is off
And enabling one requires the §12 sub-processor consent gate to have been passed for the model vendor in use

Given a tenant admin enables résumé summarisation at the screen stage
Then the change is written to the FR-T-D030 log with actor, time and previous value
And the published EOP is marked STALE at the next periodic check
And decisions taken from that moment begin writing SHOWN influence records

Given support is asked to disable the confirmer gate for one tenant
Then no such setting exists in any console, configuration file or feature flag
And the request is answered by offering to disable the AI features that create influence

Given the kill switch is thrown during an active recruiting session
Then AI artefacts stop rendering immediately
And proposals already at GATE_PENDING still require confirmation to commit
And influence recorded before the switch is unchanged
```

---

#### 10.13b.26 What §10.13b does not decide

Four things this subsection deliberately leaves open, each with where it goes and what the product
does meanwhile. None of them blocks the v1.5 write paths (§10.13b.14).

| Open item | Routed to | Behaviour meanwhile |
| --- | --- | --- |
| The retention basis for decision records and snapshots once a candidate exercises erasure, and whether E-4 may ever be offered | §23 CR-39; Part D-9 | E-3 is the behaviour; E-4 cannot be selected |
| `adverse_impact_min_cell_size` — the re-identification judgement at 20–200 heads | Control owner with counsel (§10.17) | The report does not render |
| Whether any employer-side response period applies under RPwD Rule 3(2), as distinct from the Commissioner's disposal clock | Legal owner; §23 | Only the Commissioner's clock is shown, described as the Commissioner's |
| The gazette text of the Transgender Persons Rules 12–13, currently mirror-sourced (EV-080) | Statutory owner; a primary-source pull | Mirror defaults run, labelled; no customer copy quotes the rule text |

**And three things it does not claim.** It does not claim that the controls satisfy any statute,
that a snapshot would be accepted as adequate evidence by any forum, or that any penalty arithmetic
in §10.13b.11 or §10.13b.22 predicts an outcome. The arithmetic illustrates magnitude from ledger
figures; the controls are sold as the RPwD s.90 due-diligence record and nothing more (EV-079;
FR-T-D012; §23 FR-LEG-023).

**New validation items this subsection raises for §20.** Three, each with a kill criterion, added
to the §10.15 table: whether a 20–200 employer will complete a reason field on every AI-influenced
rejection at volume (T-7); whether self-declaration for monitoring gets enough uptake at this size
for FR-T-D003 to produce anything but suppressed cells (T-8); and whether the EOP and complaint
workflows are wanted as product at all, or are work a customer's CA or counsel already does (T-9).

---

#### 10.13b.27 Intake channels and complaint hygiene

A complaint workflow is only as good as the door people actually use, and at 20–200 employees the
door is usually an email to a founder or a message to an HR lead — not a portal. The intake
therefore accepts what arrives and normalises it, rather than requiring a form nobody fills in.

| Channel | How it arrives | Normalisation | Constraints |
| --- | --- | --- | --- |
| Portal form | Candidate or employee submits | Structured from the start | The only channel that can be made anonymous by configuration |
| Monitored mailbox | Tenant designates an address; mail is ingested as a case with the message attached | Subject and body become the complaint text; the sender becomes the complainant unless they say otherwise | Ingestion is per tenant and is opt-in; the mailbox contents are case data from the moment of ingest |
| Recorded verbal complaint | An officer or the establishment head records what was said, with the date and who recorded it | Marked `recorded_verbal` with the recorder named | Never presented as the complainant's own words; the complainant may correct it |
| Forwarded from another workflow | An accommodation declined (§10.13b.6) or an exit interview escalates | Links to the source record | The link is bidirectional so neither record is read without the other |
| WhatsApp or in-app message | Only where the tenant has enabled it | Converted to a case with the thread attached | Subject to the WhatsApp constraints of §10.13a and the cost attribution of FR-T-X01 |

**Hygiene rules.**

| # | Rule | Reason |
| --- | --- | --- |
| I-1 | The receipt date is the date the complaint reached the employer, not the date it was keyed | Every clock in §10.13b.9 runs from receipt, and a data-entry delay must not shorten a clock on paper |
| I-2 | Routing reads the tenant's threshold facts as at the receipt date, not today's | Whether Rule 3(2) applied is a fact about that day (EV-076) |
| I-3 | Anonymous complaints are accepted where the tenant enables them, and the case records that no complainant is identified | A written response under Rule 3(2)(b) presupposes someone to inform; where there is no one, the case records that and the employer's chosen action stands in its place |
| I-4 | A duplicate of an existing complaint links rather than opens a second case, and the link is visible | Two cases on one grievance produce two clocks and two answers |
| I-5 | Intake never asks for, and never stores in the case header, any attribute barred from scoring beyond what the complainant themselves states | The complaint text is the complainant's; the header is the employer's |
| I-6 | Every case carries the decision ids it concerns, resolved at intake or added by the owner | Without them the reconstruction pack cannot be scoped, and s.93's daily element runs while someone searches (EV-079) |
| I-7 | Acknowledgement text per statute is tenant-configured from a template and is never generated prose about the law | FR-T-D012 |

**Acceptance — intake:**

```gherkin
Given a complaint received by email on 3 May and keyed on 7 May
When the case is created
Then the receipt date is 3 May
And every clock runs from 3 May

Given a tenant crossed from 19 to 21 persons on 1 June
And a complaint is received on 28 May and keyed on 4 June
Then routing uses the 28 May threshold facts
And the case type is TENANT_POLICY, with the twenty-person line noted

Given an anonymous complaint is enabled and received
Then the case opens with no complainant identity
And the written-response exit is available but marked as having no addressee
```

---

#### 10.13b.28 The decision endpoint — contract sketch

§16 owns the public API surface and its versioning; this is the one contract §10.13b constrains,
because an integrator who can commit a decision without the confirmer payload defeats FR-T-D001
from outside the UI. The shape is stated here and registered in §16's catalogue.

**Request** — `POST /talent/decisions`, with an idempotency key header (F-2).

| Field | Required | Notes |
| --- | --- | --- |
| `subject_ref`, `context_type`, `context_ref`, `stage` | Yes | Identifies the taint triple |
| `decision_type` | Yes | From the §10.13b.2 enumeration; `adverse` is derived server-side and may not be supplied |
| `confirmation.confirmer_token` | Conditional | A user-scoped token, not a user id string, required when the server resolves influence to other than `NONE` and the decision is adverse |
| `confirmation.reason_text`, `reason_code` | Conditional | Text required with a confirmation; code optional unless the tenant's taxonomy is mandatory (FR-T-R28) |
| `client_observed_at` | No | Stored only when it differs from server time beyond tolerance (F-5) |

**Response** — the committed decision id, the resolved influence class, the snapshot id, and the
chain position. A caller cannot request "commit without snapshot"; there is no such parameter.

**Errors** — the reason-code registry of §10.13b.18, returned as a stable code plus a human
message. `CONFIRMER_REQUIRED` is returned *before* any state change, and the response includes what
the caller must supply.

**Events** — `decision.committed`, `decision.reversed`, `case.opened`, `case.clock_breached`,
`eop.version_stale`, `observation.opened` are the webhook events §16 publishes from this
subsection. `decision.committed` carries ids and classes, never reason text or snapshot contents,
because a webhook endpoint is not a permissioned surface.

**Rate and scope.** The endpoint is scoped to a requisition or cycle by the caller's grant; a
token that can commit decisions across a whole tenant is not issued, because the blast radius of a
compromised integration on this endpoint is the module's entire evidentiary record.

---

#### 10.13b.29 Retention classes for the control records

§14 owns retention classes and the bitemporality scoping (Part E-2); these are the classes the
§10.13b entities fall into and why, stated here because the erasure matrix of §10.13b.4 is
meaningless without them.

| Entity | Class | Base behaviour | Hold interaction | Erasure mechanism |
| --- | --- | --- | --- | --- |
| `TalentDecision` | Evidentiary record | Retained on its own class, not the candidate's; the class is set by counsel (CR-39) | Hold suspends every expiry | Per the E-matrix; personal fields resolve to tombstone under E-3 |
| `DecisionInfluence` | Evidentiary record | Same class as the decision it precedes | As above | Class erasure with the decision |
| `DecisionSnapshot` | Evidentiary record, append-only, hash-chained | As above | As above; a held snapshot is never erased | Crypto-shred by subject key only under E-4, which is unavailable pending CR-39 |
| Accommodation records | Employment record | Retained per §14's employment classes | Held when a case references them | Erasable under §14's mechanism, never while held |
| Declaration records (monitoring) | Consent-bound | Deleted on withdrawal, with published reports unaffected (T-D-31) | Not evidence of a decision; no hold unless a case references them | Delete with the consent artefact |
| Rule 9(1) record | Generated artefact | Regenerated on demand; generated copies retained with their dates | Held when produced into a case or a demand | The underlying data governs; a produced packet is held with its case |
| EOP versions and publication evidence | Published artefact | Retained indefinitely by default, because a superseded policy is evidence of what was published then | Held with any case that cites them | Not erasable on a subject request — they contain no subject data |
| Complaint cases | Evidentiary record with confidentiality | Retained per §14; contents restricted per §10.13b.17 | Held from opening (K1) until released on recorded counsel instruction | Only by the §14 mechanism, after release |
| Reconstruction and production packets | Derived artefact | Retained with the case or the export log | Inherit the case's hold (P-6) | Deleted with their parent |

Two classes are explicitly *not* bitemporal in the Part E-2 sense: influence records and snapshots
are append-only facts about a moment, not attributes whose history is replayed. Replay of a
decision is a read of its snapshot, never a recomputation from a rule set (§10.13b.4), which is why
this module adds no load to the engine's temporal machinery (§15).

**Acceptance — retention classes:**

```gherkin
Given a candidate record reaches candidate_retention_horizon with no hold
When retention runs
Then the candidate record is purged or re-consented per FR-T-X03
And the decision records and snapshots follow their own evidentiary class, not the candidate's

Given a complaint case is closed with an outcome
When retention runs
Then nothing under the case's hold is erased
And the hold releases only on a recorded release naming the counsel instruction (§23 FR-LEG-026)

Given an employee withdraws a monitoring declaration
Then the declaration is deleted with its consent artefact
And previously published adverse-impact reports are unchanged, with their run dates intact
```

---

#### 10.13b.30 Snapshot-block completeness matrix

FR-T-D017 refuses a commit whose snapshot is incomplete, which requires "complete" to be defined
per decision type rather than as a single schema. Required blocks are per §10.13b.2; a block
marked optional is omitted with a recorded reason, never with a null.

| `decision_type` | `criteria` | `model_binding` | `attribution` | `confirmation` | `context` | `inputs_digest` | Additional |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `REJECT` (influenced) | Required | Required | Required where a score or parsed field was involved; otherwise the influencing artefact's digest | Required | Required | Required | — |
| `REJECT` (`REQUISITION_CLOSED`, `POSITION_FILLED`) | Required | Optional — recorded as none where no artefact influenced the closure | Optional | Required, naming the closing user once for the set | Required | Optional | The closure event id |
| `REJECT` (`LAPSED_NO_ACTIVITY`) | Required | Optional | Optional | Required, with `standing` true or false | Required | Optional | The archive configuration id and its review date |
| `REJECT` (`OFFER_LAPSED`) | Required | Optional | Optional | Optional — the lapse is a term, and the term text is captured instead | Required | Optional | The offer id and the expiry term as written |
| `REJECT` (`OFFER_WITHDRAWN`) | Required | Required where influenced | Required where influenced | Required | Required | Required | The offer id and its state history |
| `KNOCKOUT` | Required, including the rule as configured | Required where a parsed field fed the rule | Required — the rule id, the field and the value it read | Required when influenced | Required | Required | — |
| `RATING` | Required — form definition and scale | Required where drafting assistance was used | Required — which drafted text was retained | Required | Required | Optional | Cycle id |
| `CALIBRATION_MOVE` | Required — distribution mode in force | Required where influenced | Required where influenced | Required | Required | Optional | Reference to the rating snapshot, from-band and to-band |
| `INCREMENT_RECO`, `PROMOTION_RECO` | Required — mapping version in force | Inherited reference where influence is by TR-2 | Optional | Required | Required | Optional | Reference to the rating snapshot; the resulting effective-dated change id |
| `PIP_START`, `TERMINATION_RECO` | Required | Required where influenced | Required where influenced | Required | Required | Required | Guard results per FR-T-D029, including which guards were inert and why |
| `ADVANCE`, `HOLD` | Required | Optional | Optional | Optional | Required | Optional | Written for population completeness in FR-T-D003, not as evidence of an adverse act |

Two consequences worth naming. A decision whose `attribution` is "no artefact influenced this"
records that assertion explicitly, so a later reader can tell the difference between *nothing
influenced it* and *nobody wrote it down*. And the inherited-reference row for increments is how
the module avoids copying an entire appraisal into a second snapshot: the increment's snapshot
points at the rating's, and the reconstruction pack resolves the chain and says it did.

---

#### 10.13b.31 Section interfaces — what §10.13b consumes and publishes

A build team touching this subsection will cross nine other sections. This is the boundary list,
so nothing here is re-specified there and nothing there is re-argued here.

| Direction | Counterpart | Interface |
| --- | --- | --- |
| Consumes | §07 Core HR | Person and assignment entities; the permissions matrix the roles of §10.13b.15 extend; the versioned consent entity (FR-CHR-100) that FR-T-X02 and FR-T-D021 write against; establishment and entity hierarchy for per-establishment duties |
| Consumes | §12 AI layer | The redaction and tokenisation chokepoint every model call passes; the per-tenant kill switch; the sub-processor consent gate; the draft lifecycle that marks AI output as draft-for-human-edit; the golden-set and red-team methodology that tests the inference prohibitions |
| Consumes | §14 Data model | Retention classes, `RetentionHold`, the erasure mechanisms, and the rule-object schema the criteria blocks reference |
| Consumes | §06 Statutory spine | Threshold facts with their counting units and the establishment obligation profile the crossing tasks read (FR-T-D026) |
| Publishes | §08 Payroll | The decision id carried by an effective-dated CTC change from an increment (FR-T-P15), so a payroll question resolves to the appraisal snapshot |
| Publishes | §16 Integrations | The decision endpoint contract, its error codes and its webhook events (§10.13b.28) |
| Publishes | §19 Metrics | The control-health metric definitions of §10.13b.20 |
| Publishes | §22 Compliance operations | Break-glass access rules for case data; nothing in §10.13b is an attended-filing surface, because none of these duties has a portal (§10.13b.8) |
| Publishes | §23 Legal | Evidence for the due-diligence dossier (FR-LEG-021), the live configuration the EOP clause reads (FR-LEG-022), and the case types the single intake routes (FR-LEG-025) |
| Bounded by | §23 Legal | Every legal characterisation, every counsel question, and the claims that may be made (FR-LEG-023). §10.13b states no law of its own |

---

### 10.13c Consolidated FR index (traceability)

Every talent FR, its phase, priority, monetisation, and the primary section that owns its acceptance criteria — so downstream (test plan, roadmap, pricing) can trace each requirement without re-reading the prose.

| FR | Title (short) | Pri | Phase | Money |
| --- | --- | --- | --- | --- |
| FR-T-R01 | Create requisition | P0 | v1.5 | Metered |
| FR-T-R02 | Multi-opening requisitions | P1 | v1.5 | Metered |
| FR-T-R03 | Requisition approval workflow | P1 | v1.5 | Bundled |
| FR-T-R04 | Budget/headcount guardrail | P2 | v2 | Bundled |
| FR-T-R05 | Requisition templates/cloning | P2 | v2 | Bundled |
| FR-T-R06 | Statutory-crossing nudge | P1 | v1.5 | Bundled |
| FR-T-R07 | Employment-type statutory classification | P1 | v1.5 | Bundled |
| FR-T-R10 | Job-board multi-post | P0 | v1.5 | Metered |
| FR-T-R11 | Application ingest | P0 | v1.5 | Metered |
| FR-T-R12 | Cross-source dedup | P0 | v1.5 | Bundled |
| FR-T-R13 | LinkedIn RSC/Apply/Job-Post API | P1 | v1.5 | Metered |
| FR-T-R14 | Naukri post+sync (no search) | P0 | v1.5 | Metered |
| FR-T-R15 | CSV/email board fallback | P2 | v2 | Free-acq |
| FR-T-R16 | Career site + consent capture | P1 | v1.5 | Free-acq |
| FR-T-R17 | Employee referral portal | P2 | v2 | Bundled |
| FR-T-R18 | No-scrape enforcement | P0 | v1.5 | — |
| FR-T-R20 | Pipeline stages | P0 | v1.5 | Bundled |
| FR-T-R21 | Candidate profile | P0 | v1.5 | Bundled |
| FR-T-R22 | Résumé parsing | P1 | v1.5 | Bundled |
| FR-T-R23 | Screening/knockouts | P1 | v1.5 | Bundled |
| FR-T-R24 | Bulk actions | P1 | v1.5 | Bundled |
| FR-T-R25 | Candidate comms (WA rate-limited) | P1 | v1.5 | Bundled |
| FR-T-R26 | Talent pool | P2 | v2 | Bundled |
| FR-T-R27 | Recruiter/HM collaboration | P2 | v2 | Bundled |
| FR-T-R28 | Rejection-reason taxonomy | P2 | v2 | Bundled |
| FR-T-R29 | Same-req duplicate guard | P2 | v1.5 | Bundled |
| FR-T-R30 | Interview scheduling | P1 | v1.5 | Bundled |
| FR-T-R31 | Interview kits/scorecards | P2 | v2 | Bundled |
| FR-T-R32 | Interview feedback capture | P1 | v1.5 | Bundled |
| FR-T-R33 | Video-interview link | P2 | v2 | — |
| FR-T-R34 | Panel interviews | P2 | v2 | Bundled |
| FR-T-R35 | Interviewer load view | P2 | v2 | Bundled |
| FR-T-R36 | Reschedule / no-show handling | P2 | v2 | Bundled |
| FR-T-R40 | BGV orchestration | P2 | v2 | Metered |
| FR-T-R41 | DigiLocker document pull | P2 | v2 | Metered |
| FR-T-R42 | UAN prior-employment signal | P2 | v2 | Metered |
| FR-T-R43 | BGV consent + adverse-action | P2 | v2 | Bundled |
| FR-T-R50 | Offer builder | P0 | v1.5 | Metered |
| FR-T-R51 | 50%-add-back offer validation | P0 | v1.5 | Bundled |
| FR-T-R52 | Offer approval workflow | P1 | v1.5 | Bundled |
| FR-T-R53 | Offer-letter generation + e-sign | P1 | v1.5 | Bundled |
| FR-T-R54 | Acceptance → pre-boarding record | P0 | v1.5 | Bundled |
| FR-T-R55 | Notice-period/reneg tracking | P2 | v2 | Bundled |
| FR-T-R56 | Joining-bonus/notice-buyout clawback | P2 | v2 | Bundled |
| FR-T-O01 | Onboarding case (no re-key) | P0 | v1 | Bundled |
| FR-T-O02 | Statutory joining docs | P0 | v1 | Bundled |
| FR-T-O03 | EPF/ESI joining declarations + nomination | P0 | v1 | Bundled |
| FR-T-O04 | Previous-employer income (Form 122, ex-12B) | P0 | v1 | Bundled |
| FR-T-O05 | Investment declaration | P1 | v1 | Bundled |
| FR-T-O06 | State-prescribed appointment letter (10+ workers) | P0 | v1 | Bundled |
| FR-T-O07 | UAN link / UMANG routing + ESI IP | P0 | v1 | Bundled |
| FR-T-O08 | Operational onboarding tasks | P2 | v1.5 | Bundled |
| FR-T-O09 | Employee self-service onboarding | P1 | v1.5 | Bundled |
| FR-T-O10 | Commit to payroll register | P0 | v1 | Bundled |
| FR-T-P01 | Goal/KRA definition | P1 | v2 | Bundled |
| FR-T-P02 | Goal cascade/alignment | P2 | v2 | Bundled |
| FR-T-P03 | Goal progress/check-ins | P2 | v2 | Bundled |
| FR-T-P04 | Weighted goal scoring | P1 | v2 | Bundled |
| FR-T-P05 | Goal versioning / mid-cycle change control | P1 | v2 | Bundled |
| FR-T-P10 | Appraisal cycle config | P1 | v2 | Bundled |
| FR-T-P11 | Review form builder | P1 | v2 | Bundled |
| FR-T-P12 | 360°/multi-rater | P2 | v2 | Bundled |
| FR-T-P13 | Calibration (forced + none) | P1 | v2 | Bundled |
| FR-T-P14 | 9-box grid | P2 | v2 | Bundled |
| FR-T-P15 | Increment → CTC revision | P0 | v2 | Bundled |
| FR-T-P16 | Effective-dated arrears | P0 | v2 | Bundled |
| FR-T-P17 | Perf bonus ≠ statutory bonus | P1 | v2 | Bundled |
| FR-T-P18 | Rating scale config | P2 | v2 | Bundled |
| FR-T-P20 | Continuous feedback | P2 | v2 | Bundled |
| FR-T-P21 | 1:1 notes/agendas | P2 | v2 | Bundled |
| FR-T-P22 | Pulse/engagement surveys | P2 | v2 | Bundled |
| FR-T-X01 | Recruiting metering from day 1 | P0 | v1.5 | — |
| FR-T-X02 | Candidate consent capture | P0 | v1.5 | — |
| FR-T-X03 | Candidate retention/erasure | P0 | v1.5 | — |
| FR-T-X04 | Rate limits/budget on AI | P0 | v1.5 | — |
| FR-T-X05 | Recruiting cost dashboard | P1 | v2 | Metered |
| FR-T-X06 | Per-regime processing-basis record | P1 | v1.5 | — |
| FR-T-X07 | Multi-channel notifications | P1 | v1.5 | Bundled |
| FR-T-X08 | SLA timers/escalation | P2 | v2 | Bundled |
| FR-T-X09 | Talent AI assistant (bundled) | P2 | v2 | Bundled |
| FR-T-X10 | AI-draft marking + cost log | P1 | v1.5 | — |
| FR-T-X11 | Talent AI safety rails | P0 | v1.5 | — |
| FR-T-D001 | Named confirmer on AI-influenced rejection | P0 | v1.5 | — |
| FR-T-D002 | Reconstruct-this-decision snapshot | P0 | v1.5 | — |
| FR-T-D003 | Adverse-impact monitoring (no threshold) | P1 | v2 | Bundled |
| FR-T-D004 | Protected-attribute structural bar | P0 | v1.5 | — |
| FR-T-D005 | Same controls for performance/exit | P0 | v2 | — |
| FR-T-D006 | EOP generator (Rules 8(3)/8(4)) | P1 | v1.5 | Bundled |
| FR-T-D007 | Rule 9(1) disability record | P1 | v1.5 | Bundled |
| FR-T-D008 | Rule 3(2) complaint workflow | P1 | v1.5 | Bundled |
| FR-T-D009 | Transgender Act complaint officer | P1 | v1.5 | Bundled |
| FR-T-D010 | HIV/AIDS Act workflows | P2 | v2 | Bundled |
| FR-T-D011 | POSH IC record | P1 | v1.5 | Bundled |
| FR-T-D012 | Claims control | P0 | v1.5 | — |
| FR-T-D013 | Influence record at render | P0 | v1.5 | — |
| FR-T-D014 | Confirmer identity and separation | P0 | v1.5 | — |
| FR-T-D015 | Bulk adverse actions | P0 | v1.5 | — |
| FR-T-D016 | Snapshot integrity (hash chain) | P1 | v1.5 | — |
| FR-T-D017 | Snapshot-completeness commit gate | P0 | v1.5 | — |
| FR-T-D018 | Reconstruction pack | P1 | v1.5 | Bundled |
| FR-T-D019 | Feature allow-list | P0 | v1.5 | — |
| FR-T-D020 | Feature and binding review | P1 | v2 | — |
| FR-T-D021 | Self-declaration for monitoring | P1 | v2 | Bundled |
| FR-T-D022 | Suppression in adverse-impact outputs | P1 | v2 | Bundled |
| FR-T-D023 | Observation disposition loop | P1 | v2 | Bundled |
| FR-T-D024 | EOP version lifecycle | P1 | v1.5 | Bundled |
| FR-T-D025 | EOP publication and registration evidence | P1 | v1.5 | Bundled |
| FR-T-D026 | Threshold-crossing tasks (talent-law lines) | P1 | v1.5 | Bundled |
| FR-T-D027 | Rule 3(2) response assembler | P1 | v1.5 | Bundled |
| FR-T-D028 | Accommodation request lifecycle | P1 | v1.5 | Bundled |
| FR-T-D029 | Protected-termination guards | P2 | v2 | Bundled |
| FR-T-D030 | Discrimination-control configuration log | P1 | v1.5 | — |
| FR-T-D031 | Talent model binding register | P0 | v1.5 | — |
| FR-T-D032 | Decision-record retention and holds | P0 | v1.5 | — |
| FR-T-D033 | Officer designation records | P1 | v1.5 | Bundled |
| FR-T-D034 | Case confidentiality | P1 | v1.5 | — |
| FR-T-D035 | Imported-decision provenance | P1 | v1.5 | — |
| FR-T-D036 | Administrative endings are decisions | P1 | v1.5 | — |

**Count:** 118 FRs — 37 P0, 49 P1, 32 P2; 8 v1, 64 v1.5, 46 v2. The **v1** set is exactly the onboarding-handoff statutory core (8 FRs: FR-T-O01–O07 and O10); the operational onboarding tasks (O08) and self-service onboarding (O09) are v1.5, as are the cross-cutting metering/consent/dedup dependencies (FR-T-X01–X04, X02/X03, X06) and the AI rails and decision controls (FR-T-X11, FR-T-D001/D002/D004/D012) that must exist before v1.5 recruiting turns on. Note the shape: **every P0 is either onboarding (statutory), the metering/consent/dedup/offer-integrity plumbing, or a control on AI-influenced decisions** — nothing "recruiting-feature-shiny" is P0, which is the phasing thesis made concrete. (Verify: the 118-row index above and the detailed FR spec tables in §10.2–§10.13b carry identical Pri/Phase/Money values — this index is generated to mirror them, not to diverge.)

---

### 10.14 Non-goals for talent (recorded so they are not resurrected)

| **[No]** | What | Why |
| --- | --- | --- |
| **[No]** | **Reselling / proxying Resdex or any candidate-database search** | We are not aware of any published licensing path for third-party ATSs as of September 2026, and Info Edge markets in-ATS Resdex search as exclusive to its own ATS; the only extraction path found is scraping, which is legal exposure (§10.1, §16). Build inbound-only. |
| **[No]** | **Any scraping of Naukri, LinkedIn, or other candidate databases** | Explicitly forbidden in architecture and collateral (§16); FR-T-R18 enforces. |
| **[No]** | **A premium AI SKU for talent** (JD-writer, résumé-AI, review-AI as paid add-ons) | Seven vendors price HR AI at zero (§12); a surcharge on an expected feature reads as a surcharge. Bundle it. |
| **[No]** | **A per-unit meter on performance management** | Not because the market gives it away — it does not; every tiered vendor gates performance upward (EV-028) — but because talent add-ons are the market's most predictable bill shock and removing it is the wedge (§10.0). Tier placement is §18's decision. |
| **[No]** | **Marketing the FR-T-D controls as legally required** | False and checkable: we are not aware of any Indian AI-specific hiring rule as of September 2026, and DPDP has no right to explanation (EV-066, EV-084). Sell defensibility — the RPwD s.90 due-diligence defence (EV-079; FR-T-D012). |
| **[No]** | **A first-party video-interview product** | Integrate Meet/Teams/Zoom (FR-T-R33); building video is scope with no moat. |
| **[No]** | **Building talent before the beachhead payroll is stable** | Talent is the wedge, not the spine (§05). Only onboarding handoff (§10.8) is v1, and only because it produces statutory records. |
| **[No]** | **Job-distribution to boards the customer has no contract with** | We are bring-your-own-contract (§10.3). We do not resell board access. |

---

### 10.15 Open questions & validation hooks (feeds §20)

These gate build decisions in §10 and must be answered from the field, not this document.

| # | Question | Gates | Kill/validate criterion |
| --- | --- | --- | --- |
| T-1 | How many, and which, job boards does the median 20–200 employer actually pay for? | The FR-T-R10 connector matrix breadth | If < 3 boards used by the median, cut the connector matrix to the top 2 + CSV fallback (FR-T-R15). |
| T-2 | Is recruiting metered *per requisition* or *per hire* acceptable to buyers, and at what price? | The entire recruiting monetisation model (§10.12) | If neither unit is acceptable and buyers expect recruiting bundled free, treat recruiting as pure acquisition and drop metering (keep FR-T-X01 attribution regardless). |
| T-3 | Does a compliant candidate-consent path exist for the UAN prior-employment check (FR-T-R42)? | Whether FR-T-R42 is built at all | If no gazette/portal-cited consent path exists, drop FR-T-R42; keep FR-T-R40 vendor checks only. |
| T-4 | Do beachhead firms want continuous feedback / pulse (§10.11), or only annual reviews? | §10.11 build | If < 20% want it, defer §10.11 entirely; ship review cycle (§10.10) only. |
| T-5 | Will HR admins accept BGV/DigiLocker as a metered pass-through, and which vendor? | §10.6 monetisation and vendor choice | If BGV is expected free/bundled, keep orchestration but zero-rate it as acquisition. |
| T-6 | Is bell-curve calibration (FR-T-P13) demanded, rejected, or both across the beachhead? | The calibration UI investment | Ship both forced-distribution and no-distribution modes regardless (already specified); this question only prioritises which is default. |
| T-7 | Will a recruiter at a 20–200 firm complete a reason field on every AI-influenced adverse decision at real volume, or will they route around the gate? | The surface design of FR-T-D001, and whether ranking (`ORDERED` influence) is offered at all in v1.5 | Measure gate friction (§10.13b.20) in the first ten tenants. If abandonment at `GATE_PENDING` is material, fix the surface — never the control; if it persists, ship recruiting without AI ranking and keep parse and summary only, which lowers the taint surface without removing the record. |
| T-8 | Does voluntary self-declaration for monitoring get enough uptake at 20–200 heads for FR-T-D003 to produce anything but suppressed cells? | Whether the adverse-impact report ships in v2 at all | If declarations at the median tenant leave every cell below `adverse_impact_min_cell_size`, do not ship a report that is all suppression: keep the declaration surface and the disposition loop, and defer the report until a tenant has a population that can support it. |
| T-9 | Are the EOP and complaint workflows (FR-T-D006 to FR-T-D011) wanted as product, or is this work a customer's CA, consultant or counsel already does? | The v1.5 build of the EOP generator and the case machine | If the beachhead already buys this as a service, keep the records — designations, EOP versions, cases, clocks — and drop the document generation, which is the expensive half. The records are what the snapshots and the §23 dossier need either way. |

**Standing rule reminder (§02):** no talent competitive or statutory claim (board APIs, Resdex profile counts, candidate data-protection obligations under SPDI and DPDP, Code on Wages bonus ceilings, the state-prescribed appointment-letter form, any discrimination-law statement) ships to a website, deck, or contract without a gazette / notified-rule / vendor-page citation captured with URL and date, and a corrigendum check; legal statements additionally need counsel clearance (§23). The ESI-regime uncertainty after 22 Nov 2026 (§06.3, §20 V-08) directly affects FR-T-O03/O07 and must be effective-dated, not hard-coded.

---

### 10.16 Hypothesis ledger (every [Hypothesis] FR, with its kill/validate criterion)

Per §10.0, no `[Hypothesis]` marker in this section is orphaned. The load-bearing ones are argued inline in their sections and in §10.15; this ledger consolidates the remainder so each is traceable. **Type:** `D` = demand hypothesis (does the beachhead want it — default-safe = defer, don't build ahead of demand); `M` = mechanism hypothesis (does a compliant technical/legal path exist — default-safe = don't build until a citation confirms it). Where a §10.15 open question already gates the FR, it is cross-referenced rather than restated.

| FR | Type | Hypothesis | Kill / validate criterion |
| --- | --- | --- | --- |
| FR-T-R03 | D | A 20–200 firm wants a configurable multi-step requisition approval chain | Ship single-approver as default; keep the chain optional. Validate in §20: if the median beachhead uses ≤1 approver, do not build parallel/serial routing depth. |
| FR-T-R04 | D | Finance-owned headcount budgets exist to guardrail against | Build only if beachhead firms maintain a headcount-budget object per cost-centre; if budgets are informal, defer — a guardrail with no ceiling to check is dead code. |
| FR-T-R15 | D/M | A board the customer uses will lack an API/ingest connector | Gated by §10.15 T-1. Build the CSV/email fallback only if a used board has no connector; if the top 2 boards cover the median employer, defer. Until foundit, apna and Indeed each have a captured posting and ingest path (FR-T-R10), the fallback is how those boards are served at all — so if any of them is in the median employer's mix, the fallback is not deferrable. |
| FR-T-R17 | D | Referral hiring is a meaningful channel for the beachhead | Validate in §20: if referrals are <15% of hires at 50–200 firms, defer the portal; the payroll-payout hook (§08) is trivial to add later. |
| FR-T-R23 | D | Knockout/screening questions earn their build for beachhead volumes | Keep for high-applicant blue/grey-collar reqs (volume per requisition measured from v1.5 ingest data — FR-T-R24); if beachhead desk roles draw low volumes, ship simple flagging, not auto-reject. Knock-outs stay deterministic candidate-answered rules either way (FR-T-D001, FR-T-D004). |
| FR-T-R27 | D | Hiring managers will engage inside the ATS | If HMs delegate entirely to recruiters (common at 20–200), defer collaboration depth; keep a single advance/reject email action. |
| FR-T-R28 | D | Structured rejection reasons are used, not skipped | Build alongside FR-T-X05 analytics — the taxonomy is only worth capturing if the funnel dashboard consumes it. Defer if X05 defers. |
| FR-T-R31 | D | Structured interview kits are wanted over gut-feel hiring | §10.5 India note: ranked *below* interviewer-load (R35). Validate demand; if beachhead prefers speed to rubric, keep kits optional. |
| FR-T-R34 | D | Panel interviews with independent scorecards are run at this size | Mechanism specified (acceptance in §10.5). Demand: build if panels are common; else the anti-anchoring rule still applies to sequential single interviews. |
| FR-T-R35 | D | Interviewer load is a real hiring-velocity bottleneck | §10.5 argues yes (the senior team *is* the interviewer pool). Validate: if scheduling conflicts are rare, downgrade to a simple availability view. |
| FR-T-R36 | D | No-show/reschedule rates justify dedicated handling | Low build cost; likely keep. Validate against measured no-show rate in §20; if negligible, fold into generic stage-move logging. |
| FR-T-R40 | D | Buyers accept BGV as a metered pass-through, and which vendor | Gated by §10.15 T-5. If BGV is expected free/bundled, keep orchestration but zero-rate it as acquisition. |
| FR-T-R41 | D/M | Buyers pay for DigiLocker document pull as a metered check, over a partner-API path that exists | The API path is itself uncaptured in research (§10.6) — confirm with a dated capture before build; Aadhaar is excluded regardless (EV-070). Monetisation gated by §10.15 T-5; zero-rate if expected bundled. |
| FR-T-R42 | M | A compliant candidate-consent path to UAN service history exists | Inline kill criterion (§10.6) + §10.15 T-3. Drop if no gazette/portal-cited consent path exists; fall back to FR-T-R40 employment checks. |
| FR-T-R55 | D | Reneg/no-join rates justify a prediction nudge | Reneg rates are reported as a pain but unmeasured in our research; the *nudge model* needs joined-vs-reneged data to be non-arbitrary. Ship auto-reopen first; gate the predictive nudge on having data. |
| FR-T-R56 | D | Joining bonuses / notice-buyouts with clawback are common enough to model | If rare in the 50–200 desk segment, keep clawback as a manual recoverable-advance entry, not a first-class offer object. Validate in §20. |
| FR-T-P02 | D | Beachhead firms cascade goals to company/team objectives | Many will not. Ship goals flat; make cascade optional. Defer default-on until mid-market expansion (200+). |
| FR-T-P03 | D | Mid-cycle goal check-ins are used | Tied to §10.15 T-4 (continuous vs annual). Defer if firms run annual-only reviews. |
| FR-T-P12 | D | 360°/multi-rater feedback is wanted at 20–200 | Mid-market behaviour. Optional cycle type; defer default until §20 shows demand. |
| FR-T-P14 | D | 9-box talent review is used by the beachhead | Enterprise/succession behaviour. Defer until 200+ expansion; the data model (perf × potential) is cheap to reserve. |
| FR-T-P18 | M/D | A fixed rating→increment-band mapping makes review→CTC deterministic | Mechanism is sound and required for auditable FR-T-P15. Build with P15; the hypothesis is only whether tenants want the mapping fixed vs advisory — default to advisory-with-override. |
| FR-T-P20 | D | Continuous feedback tooling is used by 20–200 firms | §10.11 whole-section kill: if §20 shows <20% of 50–200 firms want it, defer §10.11 entirely. |
| FR-T-P21 | D | 1:1 notes/agendas are wanted | Same §10.11 kill as P20. Defer with the rest of continuous-feedback if demand is <20%. |
| FR-T-O08 | D | Customers want operational (non-statutory) onboarding tasks in one surface | Low risk, high "single surface" value. Build if it prevents a second tool; the *statutory* onboarding (§10.8) ships regardless. |
| FR-T-X05 | D | Recruiting cost/funnel analytics is worth paying for (metered) | Gated by §10.15 T-2 monetisation. Value is argued in §10.3 (source-of-hire is the reason inbound-only works). Build with recruiting; meter per §10.12. |
| FR-T-X06 | M | The per-regime processing-basis record at conversion is legally sound as designed | Validate with counsel (§23) before v1.5 recruiting GA — including whether s.7(i) reaches candidates and whether SPDI consent must be re-taken at conversion; low build cost, keep. Never assume an automatic shift to a no-consent basis. |
| FR-T-X08 | D | Approval/response SLA timers matter to buyers | Defer to v2. Build if §20 buyers cite slow approvals as a pain; the audit trail (FR-T-R03/R52) exists regardless. |
| FR-T-D020 | M | A documented job-relatedness review on each allow-list feature is the right control for proxy risk, absent any Indian guidance | No quantitative test exists to validate it against. Validate the *cadence* only: if `proxy_review_cadence` produces reviews nobody reads, cut to review-on-change and keep the on-change review, which is the load-bearing half. Never replace it with a numeric proxy test (§10.13b.5). |
| FR-T-D032 | M | Decision records and snapshots may be retained on their own evidentiary class after a candidate's erasure request, with the non-personal shell surviving | Counsel question CR-39 (§23). Until answered, E-3 is the behaviour and E-4 is unavailable; if counsel says the shell must go too, the module keeps the gate and loses the reconstruction for erased subjects, and §10.13b.9's assembler already states that case truthfully. |

**How to read this ledger against the build plan.** Every FR here is P1 or P2 and nearly all are v2 — i.e. *none of the phasing-critical v1/v1.5 P0 work rests on an unvalidated hypothesis*. The v1 onboarding set (§10.8) and the v1.5 P0 plumbing (dedup, offer-integrity, metering, consent, AI-decision controls) are all `[Verified]`. That is deliberate: hypotheses are permitted to gate *fast-follow* scope, never the statutory spine or the money/consent plumbing that must be right from day one (§08, §10.13).

---

### 10.17 Talent parameter register (routes to §20.13)

Every value this section declines to state is a named parameter. §20.13 holds the sizing register and requires every parameter a section routes there to join exactly one family, with its route, when it is introduced; this table is that joining for §10. It holds no values except the four Transgender Persons Rules defaults, which come from a mirror-sourced reading (FR-T-D009) and are overridable. A parameter with no value blocks only the feature that reads it, never the module.

| Parameter | Read by | §20.13 family | Route to a value | Owner | Behaviour while unset |
| --- | --- | --- | --- | --- | --- |
| `apprentice_excluded_from_counts` | FR-T-R06, FR-T-R07 | Central labour reference values | V-21 (the apprentice exclusion, §06.13) | Statutory | Defaults to *false*: apprentices count, and a crossing banner carries the "unconfirmed" qualifier |
| `apprentice_stipend_floor`, `apprentice_engagement_band` | FR-T-R07 (apprentice requisitions) | Central labour reference values | Apprentices Act and rules, desk read | Statutory | No floor or band check runs; the requisition shows "not configured" |
| `fte_gratuity_qualifying_service` | FR-T-R07, offer builder gratuity line | Central labour reference values | V-21 (fixed-term gratuity at one year, §06.6, §06.13) | Statutory | The offer shows the pro-rata rule with the qualifying-service condition flagged "unconfirmed"; any gratuity computation resting on it routes to operator review (V-21's rule) |
| `addback.employer_pf_in_test` | FR-T-R51 | Central labour reference values | Desk read plus counsel (§06.10; §23) | Statutory, then Legal | Neither reading is assumed: the offer shows both add-back bases side by side, labelled provisional, and the recruiter acknowledges the higher one |
| `esi.entry_on_wage_drop` | FR-T-O07 | Central labour reference values | V-08, with §06.3's `esi.reentry_timing` | Statutory | No automatic ESI entry on a wage drop; an operator task is raised instead |
| `epf.form_catalogue` (owned by §06.2), `esi.form_catalogue` | FR-T-O03, FR-T-O07 | Central labour reference values | §06.13 desk read of the EPF Scheme 2026 forms (V-21); V-08 for the ESI regime | Statutory | The legacy form names are shown, labelled "legacy name, not re-captured"; capture of the declarations themselves never waits on the identifier |
| `bonus.annual_return_form` | FR-T-P17 | Central labour reference values | V-21 (Code on Wages s.26, §06.7) | Statutory | Statutory bonus is computed and labelled provisional; no return artefact is generated |
| `perq.meal_per_meal_cap`, `perq.gift_voucher_annual_cap` | Offer builder FBP section (FR-T-R50) | Tax reference values | V-18 | Statutory | Current EV-019 figures apply as effective-dated values with their conditions enforced, marked [Hypothesis] until V-18 closes |
| `fixed_point.max_iterations`, `fixed_point.tolerance` | FR-T-R51 (employer-PF loop, net gross-up) | Engine numerics | §06.14 golden vectors | Eng / Statutory | The offer builder uses the engine's accepted setting (§08 FR-PAY-211); no talent-specific override exists, and until a setting is accepted the employer-PF loop and net gross-up are unavailable in the offer builder |
| `recruiting_price_per_requisition` | §10.12 recruiting meter | Pricing and commercial | V-07 and §10.15 T-2 | Founder / GTM | Zero: events are counted (FR-T-X01), nothing is billed |
| `candidate_retention_horizon` | FR-T-X03, FR-T-R26 | Retention (`retention.*`) | Counsel (Part D-9, D-11) | Legal | No automatic purge or suppression runs (Part D-9); erasure requests and consent withdrawals are still honoured under FR-T-X03 |
| `bulk_action_max_batch` | FR-T-R24 | Owner decision (product configuration) | Sized from v1.5 ingest volumes | Product | A conservative batch limit set by Product before launch, logged with its reason |
| `no_show_repeat_threshold` | FR-T-R36 | Owner decision (product configuration) | §20 measurement of the beachhead no-show rate | Product | The repeat-no-show flag is off; no-shows are still recorded |
| `adverse_impact_min_cell_size` | FR-T-D003, FR-T-D005 | Owner decision, with counsel | Counsel on re-identification risk at 20–200 heads (§23) | Product + Legal | The adverse-impact report does not render |
| `decision_record_erasure_mode` | FR-T-D002, FR-T-D032, FR-T-X03 | Retention (`retention.*`) | Counsel (§23 CR-39; Part D-9) | Legal | Mode E-3: the non-personal shell of an erased decision survives and the pack says the subject's data was erased; mode E-4 cannot be selected by anyone |
| `proxy_review_cadence` | FR-T-D020 | Owner decision (product configuration) | Product, with counsel input on what a review should record | Product + Legal | Reviews run on change only; no periodic re-review is scheduled, and the report of unreviewed features stays empty rather than implying coverage |
| `accommodation_response_target_days` | FR-T-D028 | Owner decision (product configuration) | Tenant policy | Product | The accommodation queue shows age with no target line; no breach state exists |
| `eop_review_cadence_months` | FR-T-D024, FR-T-D025 | Owner decision (product configuration) | Product | Product | Premises-display attestations never age into staleness; configuration-change triggers still fire |
| `standing_confirmation_review_months` | FR-T-D036 | Owner decision (product configuration) | Product | Product | A standing confirmation for the stale-candidate archive cannot be created, so the archive stays propose-only |
| `rpwd_response_target_days` | FR-T-D008 | Owner decision, with counsel | Tenant policy; counsel on whether any employer-side period applies (§23) | Legal | The case shows the Commissioner's 60-day clock (EV-076) and no internal target |
| `tg.designation_days`, `tg.enquiry_days`, `tg.action_days`, `tg.resolution_days` | FR-T-D009 | Central labour reference values | Gazette text of G.S.R. 592(E), replacing the mirror reading (r5/05 finding 28) | Statutory | Mirror-sourced defaults 30 / 15 / 15 / 30 days apply and are labelled "pending primary source" |

Three families in this table — "Owner decision (product configuration)", "Owner decision, with counsel", and the talent use of "Retention" — are not yet rows of §20.13's register; §20 adds them when it next revises the register, and until then this table is their record. Two statutory values in this section are deliberately not parameters here because their owning sections already carry them: the add-back threshold (0.5 today, a notified variable in the §06.10 rule payload) and the ESI wage ceiling (§06.3, effective-dated and never hard-coded — §10.8).

**Acceptance — the register:**

```gherkin
Given any backticked configuration parameter that appears in §10 (entity field names in §10.1a are not parameters)
Then it appears in this table with a family, a route, an owner and its behaviour while unset
And no section-§10 feature ships reading a value that has neither a dated source nor a recorded owner decision
And a parameter whose route is counsel is set by no one other than the named Legal owner
```
