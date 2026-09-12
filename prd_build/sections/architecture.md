## 15. System Architecture & Multi-Tenancy

This section specifies the **system architecture as a set of components, responsibilities
and data flows** — not code, not a database schema (that is §14), not a service-by-service
API contract (that is §16). It answers four questions the rest of the PRD assumes an answer
to: *how are the parts arranged, how is one customer's data kept apart from another's, how
does a single statutory rule that changes on a gazette date propagate correctly to a payroll
run for a period three months in the past, and where does the data physically sit when a
bank asks.*

Five decisions taken elsewhere in this PRD are load-bearing here and are stated once rather
than re-argued per component:

- **Rules-first, LLM-last (§12/§13, [Verified]).** No statutory or monetary figure is ever
  model-generated. The architecture therefore has a *deterministic core* (the statutory-rules
  engine and payroll engine) and a *probabilistic edge* (the AI orchestrator). They are
  different trust domains with a hard boundary between them, not two layers of one stack.
- **The filing, not the payslip, is the unit of delivery (§01, [Verified]).** The system's
  primary durable artefact is a *filing* — an ECR, an ESI contribution upload, a PT return,
  a Form 138 — delivered as a **portal-accepted artefact plus attended, assisted submission
  under the employer's written authority to act**. Every statutory surface is an attended
  portal with no API today (EPFO interactive login with CAPTCHA; TDS, where the deductor runs
  the FVU and uploads; ESIC template upload; state PT across many manual portals), and the
  employer's and deductor's statutory liability is non-delegable (EV-030, EV-035–038;
  runbooks in §22). Whether an operator may act on those portals under the employer's
  credentials — portal terms of use, the e-Return Intermediary route for TDS, the authorised
  signatory's personal DSC — is under counsel review (Part D-17; §23 CR-17; §20 V-25), so
  the architecture builds the attended path and makes no claim about its legality. Form 130
  is not our artefact: a certificate not generated from TRACES is invalid, so the product
  prepares its data and distributes the TRACES output (EV-048). The
  event/audit backbone (§15.6) is organised around filings, not around pay runs.
- **Effective-dating is permanent, not transitional (§06/§08, [Verified]).** The 50%
  wage-definition add-back is "or such other per cent as may be notified" — a standing
  variable. The rules engine must be effective-dated and retrospectively recomputable
  *forever*, independent of the November 2026 cliff.
- **Residency is a per-tenant, per-provider configuration, not a global build choice
  (§13/§17, [Verified]).** India neither mandates blanket localisation nor leaves data
  location unconstrained. DPDP's cross-border regime is not in force until on or about
  13 May 2027 (EV-058, **[Verified — mirror]**: pull from the primary source before customer
  use). The live constraints are CERT-In's 180 days of ICT logs within
  Indian jurisdiction (EV-062), SPDI r.7's restriction on cross-border transfer of sensitive
  personal data (EV-060), and sectoral rules that reach us through regulated customers:
  SEBI's in-India residence and MeitY-empanelled-infrastructure rule for SaaS providers
  (EV-085), IRDAI localisation for policy records only (EV-086), and RBI's IT-outsourcing
  directions, whose localisation, audit, sub-contractor-consent and inspection clauses are
  **materiality-gated, determined entity by entity — not turnover-gated** (EV-087,
  **[Verified — mirror]**: pull from the primary source before customer use; Source: RBI
  *Master Direction on Outsourcing of Information Technology Services*,
  DoS.CO.CSITEG/SEC.1/31.01.015/2023-24, 10 Apr 2023, effective 1 Oct 2023). **[Reversed]**
  Earlier drafts said these directions bind any SaaS vendor "with no turnover threshold"; they
  attach only where the arrangement is material to the regulated entity. Residency is
  selectable per tenant; the same abstraction serves the AI cost router.
- **Own the data and the tools, not the assistant (§13, [Verified]).** If enterprise buyers
  converge on Copilot/Glean as the assistant, our differentiation collapses to data quality
  and tool design. The architecture exposes an MCP surface over our own tools; it does not
  bet on our chat UI being the one the user opens.

Everything below follows from taking those five seriously.

<!-- DIAGRAM: architecture-overview -->

---

### 15.1 Architecture principles

These are the constraints every component is measured against. They are ranked; where two
conflict, the higher one wins.

| # | Principle | Consequence | Source / status |
| --- | --- | --- | --- |
| 1 | **Correctness of statutory output is a legal property, not a quality metric.** | The deterministic core is separable, independently testable against gazette fixtures, and never depends on the AI edge for a number. A wrong number is statutory exposure, not a bug ticket: paying an employee less than is due is an offence under Code on Wages s.54(1)(a), fine up to ₹50,000 (verified at gazette, r5/05); a late PF remittance carries s.7Q interest that EPFO's system computes and makes mandatory with the contribution (EV-039). | §08 [Verified] |
| 2 | **Effective-dated, retrospectively recomputable rules.** | Every statutory rule is a versioned record with an effective range and a decision-time range; every computation records the rule-set version and the evaluation context it used (§15.4.1); arrears/retro runs recompute against the version *in force for the period*, not today's. | §06 [Verified] |
| 3 | **Tenant isolation is the default; sharing is the exception that must be justified.** | Only two things are deliberately shared across tenants: the statutory-rules engine (a public dataset — the law is the same for everyone) and the stateless compute tier. Everything with tenant data in it is partitioned. | §15.3 |
| 4 | **Residency and provider are configuration, not architecture.** | A provider seam built for at least three interchangeable AI/inference backends and a per-tenant residency flag from v1 — one backend wired at R1, the full residency matrix at GA later (§05.5 items 15 and 29). No component hardcodes a provider or a region. | §13/§17 [Verified] |
| 5 | **Every state-changing action is an event with an actor, a reason and a rule version.** | The audit backbone is not a log added later; it is the write path. Filings, approvals, rule changes and AI-assisted actions all emit immutable events. | §15.6, CERT-In [Verified] |
| 6 | **Cost is attributed from v1 across all four COGS lines, not only inference.** | Inference (per tenant, user, agent, model) is the *smallest* line; the dominant one is supervised filing, which scales per registration × state × filing type, alongside WhatsApp per message and compliance curation per state (EV-088). Metering is plumbed through the request context and the filing workflow, not bolted on; retrofitting attribution after pricing exists is far harder (§13). | §13, EV-088 |
| 7 | **Degrade, never fail silently, on external dependencies.** | Government portals, banks and device fleets are unreliable. Every integration has an explicit fallback and a queue; a portal being down blocks a *submission*, never a *pay run*. | §15.5 |
| 8 | **Build for divergence between states, not uniformity.** | PT, LWF and state rules under the four Codes notify unevenly. The data model assumes per-state variance as the norm, not an exception (§20 risk register). | §06 [Verified] |

---

### 15.2 Service topology — logical components and responsibilities

The system is described as **logical services** (bounded responsibilities with owned data),
not as a physical deployment (pods, instances, regions — that is an implementation choice
constrained by §15.7). A logical service may run as one deployable in v1 and be split later;
the boundaries below are drawn so that split is cheap.

#### 15.2.1 The four tiers

1. **Client tier** — the surfaces a human or machine touches.
2. **Edge / gateway tier** — authentication, tenant resolution, rate limiting, routing.
3. **Service tier** — the deterministic core, the AI orchestrator, and the platform services.
4. **Data & integration tier** — persistence, the event backbone, and the outbound/inbound
   connectors to the outside world.

#### 15.2.2 Client tier

| Client | Primary users | Notes specific to India beachhead |
| --- | --- | --- |
| **Admin web console** | HR/payroll admin, finance | The pay-run and filing cockpit. Must be evaluable self-serve by a 30-person company that will not sit through a demo (§18 pricing shape). |
| **Employee self-service (web + mobile)** | Employees | Investment declarations, proof upload, payslips, Form 130, leave. Must assume *shared devices* — worker identity ≠ device identity (§09 [Verified]). |
| **Deskless / worker surface** | Frontline, factory, field | WhatsApp-first and low-connectivity. Worker-initiated, not employer-push — a new WhatsApp portfolio reaches only 250 unique users / rolling 24h (§09 [Verified]). |
| **Kiosk / device surface** | Shared shop-floor terminals | Receives biometric punches via the ADMS/WDMS push path (§15.5). No app on the device. |
| **CA / bureau console** | External CAs, payroll bureaus | Multi-client switching, per-client compliance calendar, one-click Form 138 and PT export, read-only audit access (§18). A CA is a *first-class tenant-spanning actor*, which shapes the auth model (§15.3.6). |
| **MCP server (machine client)** | External assistants (Copilot, Glean, Claude), our own AI | Read tools (ACL-inheriting), write tools (idempotent, audited, approval-gated), and per-tenant admin controls to disable specific tools per assistant (§12). |

#### 15.2.3 Edge / gateway tier

One logical component, the **API gateway + tenant router**. Responsibilities:

- **Authentication** and session/token validation (OIDC for humans; scoped API keys and
  short-lived tokens for machines and MCP).
- **Tenant resolution** — every inbound request is resolved to exactly one `tenant_id`
  *before* it reaches a service. A CA-console request resolves to a `(ca_org_id, acting_on
  tenant_id)` pair and carries both. This is the single choke point where a request without
  a valid tenant context is rejected — no service trusts an unauthenticated tenant claim.
- **Residency routing** — reads the tenant's residency profile and routes to the correct
  regional data plane and inference backend (§15.7). A tenant pinned to India-only never has
  a request served from a non-India plane.
- **Rate limiting and budget enforcement** — per-tenant *and* per-user, because the product
  is priced per employee but consumed per user; one heavy user can exceed a seat's entire
  ARPU (§13 [Verified]). The gateway meters and degrades gracefully; hard cut-off at a
  configurable ceiling, `gateway.budget_hard_ceiling`, routed to §20 (Microsoft's Copilot
  Studio documentation says agents are disabled at 125% of prepaid capacity — a documented
  precedent, read from vendor documentation in r2/03, Sep 2026, not executed; §13).
- **Request context injection** — stamps `tenant_id`, `actor_id`, `actor_role`,
  `residency_zone`, `request_id`, `cost_context` onto the request so every downstream service
  and the audit backbone see the same identity. This is the plumbing that makes principle 6
  (cost attribution) and principle 5 (audit) work without per-service effort.

#### 15.2.4 Service tier — the deterministic core

These services compute or persist statutory and monetary truth. They never call the AI
orchestrator for a number.

| Service | Responsibility | Owns (data) | Key cross-refs |
| --- | --- | --- | --- |
| **Core-HR service** | System of record: employees, org structure, positions, statutory identifiers (UAN, ESIC IP, PAN, PT enrolment), lifecycle state (§07.3; entities in §14). Aadhaar never enters its tables — only an opaque token referencing a separate, separately-encrypted, separately-access-controlled store (§07, §14). | Employee master, org units, identifiers, documents metadata. | §07 (core-HR FRs) |
| **Statutory-rules engine** | The single source of every rate, slab, ceiling, wage-definition rule, penalty and cadence — effective-dated and per-jurisdiction. Evaluation is a pure function of `(inputs, rule-set version, evaluation context)` with an enumerated context (§15.4.1). Detailed in §15.4. | Rule packs (versioned), effective-date and decision-time ranges. **Shared across tenants** (the law is public). | §06 (the rules themselves) |
| **Payroll engine** | Orchestrates a pay run: gathers inputs, invokes the rules engine per employee per component, produces gross-to-net, the two concurrent wage bases (add-back vs payment-of-wages, §06 [Verified]), arrears and retro. Its calculation graph permits bounded fixed-point nodes (§15.4.7). Deterministic and replayable. | Pay runs, payslips, component results, computation trace, input snapshots. | §08 (payroll FRs) |
| **Filing orchestrator** | Turns a locked pay run + period data into statutory artefacts: the ECR return file and part-payment contribution file (EV-035, EV-044), the ESI contribution upload, PT returns, and Form 138 Q1–Q3 (EV-051; Q4 fenced, EV-046). Runs the filing state machine of §08.8 (FR-PAY-711) — including REJECTED, REVISED and SUPPLEMENTARY states and a post-FILED correction path that is a diff, never a mutation — and a per-establishment filing ledger that refuses a skipped month (FR-PAY-712, EV-038). Submission is attended (§22), never unattended automation. For Form 130 it prepares the data TRACES needs and distributes the TRACES-generated certificate; it never generates the certificate (EV-048). | Filings, filing artefacts, portal acknowledgments, challans and TRRNs, submission attempts, filing ledger. | §08, §16, §22 |
| **Attendance & leave service** | Ingests punches, applies attendance and OT rules resolved for the work location's jurisdiction, maintains leave balances, feeds payroll input. OT is paid at not less than twice the normal rate (Code on Wages s.14, verified at gazette, r1/06); the 8-hour day and 48-hour week are central-sphere rule values that state rules may vary (r3 critic). **[Hypothesis]** A 144-hours-per-quarter OT cap is reported only by secondary summaries and has never been confirmed against gazette text — it may sit in the OSH rules — so the product may *warn* on it and must never *block* (§09.6; validation §20 V-17). | Attendance records (per-day IN/OUT, EV-055), shifts/rosters, leave balances. | §09 |
| **Documents service** | Generates and stores prescribed-format artefacts: the appointment letter where OSH Code s.6(1)(f) applies — an "establishment" of 10 or more workers, in the form the appropriate Government prescribes, so state-sphere (EV-057); the wage slip and the six central-sphere employer registers, kept as one canonical set with form numbers configurable per state (EV-053). Register retention follows each rule's own wording — "five years after the date of last entry" (Wages r.51(4)) or "five calendar years" (OSH r.72(1)(vii), SS r.53(1)(e)), with OSH r.76(2)'s bar on destruction unless transferred — for the central sphere only; state-sphere periods are configuration pending counsel (EV-054; §14, §23). | Document store (object storage + metadata). | §06, §07 |

#### 15.2.5 Service tier — the probabilistic edge

| Service | Responsibility | Trust boundary |
| --- | --- | --- |
| **AI orchestrator** | The assistant, agentic task classes (query, draft, reconcile, file-prep, support), the model router, guardrails and human-in-loop gating (§12). Explains, drafts, routes, reconciles — *never* computes a statutory number. | Reads the deterministic core's outputs; may *propose* actions but every write it triggers goes through the same approval-gated, audited write path a human uses. It has no privileged compute path. Any output feeding hiring, appraisal, promotion, a PIP or termination takes effect only after a recorded named human confirmer (§12.8.3). |
| **Redaction / tokenisation egress gateway** | The *only* workload with network egress to any model provider and the only holder of provider credentials. Default-denies Aadhaar number, PAN, bank account and IFSC, and biometric templates on every outbound call; blocks and surfaces on ambiguity; token map held in India (policy in §12.8.3). | Structural, not a library: direct provider-SDK use elsewhere fails at build time (lint) and at run time (network policy). |
| **Model router** | First-class, P0 (§05.5 item 13): per-task cost ceilings, logged escalation, re-point a task class at a different backend without a deploy; the seam takes ≥3 interchangeable backends with residency selectable per tenant (§13/§17 [Verified]) — one wired at R1, the full matrix at GA (§05.5 items 15, 29). Enforces the per-tenant AI kill switch and per-feature opt-out — **AI off by default for tenants flagged RBI-, SEBI- or IRDAI-regulated** — and the sub-processor-change gate: a tenant's eligible providers are exactly its consented set (§12.8.3; EV-087). | Enforces the residency profile from the request context — a tenant pinned to India-only inference cannot have a task routed to a US-only workspace geo. |
| **Cost/metering service** | Attribution across the four COGS lines (EV-088): inference per tenant/user/agent/model, WhatsApp per message, supervised-filing minutes per registration × state × filing type, and compliance curation per state. Feeds gateway budget enforcement, §13 and pricing (§18). | Read-only consumer of the request context and the filing workflow's events; no business logic. |

#### 15.2.6 Service tier — platform services

| Service | Responsibility |
| --- | --- |
| **Identity & access (IAM)** | Users, roles, RBAC/ABAC, the CA cross-tenant grant model (§15.3.6), machine credentials, MCP tool ACLs, and consent as a versioned first-class entity (§07, §14). **[Reversed]** Earlier drafts said DPDP s.7(i) lets employers process employee data without consent and so removes a consent layer; s.7(i) is not in force until on or about 13 May 2027 (EV-058, **[Verified — mirror]**: pull from the primary source before customer use). Today the SPDI Rules 2011 require consent *in writing* before collecting sensitive personal data, which includes biometric and financial information (r.3, r.5(1); EV-060) — while DPDP itself creates no sensitive category (s.2(t); EV-059). Written-consent capture is therefore built from v1, and who owes that duty, employer or SaaS, is a counsel question (Part D-4; §23 CR-04). When s.7(i) commences it disapplies consent and notice for employment purposes only, not the s.8 duties, so two consent regimes run concurrently across that date. Whether employees hold DPDP access, correction or erasure rights against an employer relying on s.7(i) is under counsel review (Part D-1; §23 CR-01); the erasure path in §15.6.3 is built either way, within statutory-retention overrides. |
| **Notification service** | Email/SMS/WhatsApp/push. Enforces WhatsApp's messaging-tier limit — a new business portfolio reaches 250 unique users per rolling 24 hours, rising through later tiers (r2/04) — and the worker-initiated rule (§09). |
| **Statutory-change watcher** | Monitors EPFO/ESIC/MoLE/state gazettes and CBDT for new instruments **and amendments/corrigenda** — a watcher keyed only to new notifications would have missed the corrigendum that inverted the Nov-2026 analysis (§02 [Verified]). Feeds the rules-engine change pipeline (§15.4.5; authoring and review operations in §22). |
| **Event/audit backbone** | Append-only event log and audit trail (§15.6). |
| **Scheduler / workflow engine** | Drives the monthly cadence: pay-run windows, filing due dates (the filing calendar), retention expiry, device-health polling. |

#### 15.2.7 Trust zones and the call-edge allowlist

Principles 1 and 5 and the Part E-7 rails are only real if they are **structural**: a boundary
that exists as a convention in a design document is a boundary a deadline will cross. The
services of §15.2.2–§15.2.6 are therefore assigned to **trust zones**, and the set of call
edges between zones is an allowlist enforced twice — at build time by a dependency lint, and
at run time by network policy and credential custody. Anything not on the list is denied.

<!-- DIAGRAM: architecture-trust-zones -->

| Zone | Members | What the zone is trusted for | What it may never do |
| --- | --- | --- | --- |
| **Z0 · Untrusted callers** | Browsers, mobile, kiosk terminals, WhatsApp, biometric devices, MCP clients | Nothing. Every claim is re-derived at Z1. | Reach any Z2 service directly; assert its own `tenant_id` |
| **Z1 · Edge** | API gateway + tenant router | Resolving exactly one `tenant_id` and signing the request context (§15.2.3) | Compute a statutory figure; hold a model-provider credential |
| **Z2 · Deterministic core** | Core-HR, payroll engine, filing orchestrator, attendance & leave, documents, statutory-rules engine | Every statutory and monetary figure; every rule-version pin | Call a model provider; accept a tenant claim from a request body |
| **Z3 · Probabilistic edge** | AI orchestrator, model router | Explaining, drafting, routing, reconciling, proposing | Write a statutory or monetary field; resolve a rule version itself; open a socket to a provider |
| **Z4 · Egress** | Redaction / tokenisation gateway | The *only* workload with network egress to a model provider and the only holder of provider credentials (§12.8.5) | Return an untokenised identifier to Z3; write to a Z5 business store |
| **Z5 · Persistence & backbone** | Tenant-partitioned stores, object storage, event/audit backbone | Enforcing the partition below the app (§15.3.3) and the append-only chain | Accept a write whose event cannot be written in the same transaction (§17.5 NFR-SEC-401) |
| **Z6 · Outside** | Model providers, statutory portals, banks, job boards | Nothing | — |

**The allowlist.** Each row is an edge that exists; every other ordered pair of zones is a
build failure.

| From | To | Permitted call | Carried with it | Why the edge exists |
| --- | --- | --- | --- | --- |
| Z0 | Z1 | Any authenticated request | Credential or token only | Single entry point |
| Z1 | Z2 | Domain operations | Signed request context | Normal traffic |
| Z1 | Z3 | Assistant and agent operations | Signed request context, incl. residency zone | The edge is reached the same way, not by a side door |
| Z2 | Z2 | Engine resolution calls (payroll → rules) | Evaluation context (§15.4.1) | Purity is preserved by passing context, not by reading it |
| Z3 | Z2 | **Read** of computed outputs, and *proposals* through the same approval-gated write path a human uses | The proposal, never a figure of its own | Rules-first, LLM-last |
| Z3 | Z4 | Outbound model call | Prompt for tokenisation | Every model call passes the chokepoint |
| Z4 | Z6 | Provider API call | Tokenised payload only | The chokepoint is the border |
| Z2 | Z6 | File-based and attended interactions: bank host-to-host, portal artefacts handed to an operator (§22) | Idempotency key (§15.5.3) | No portal is an API (EV-030, K-13) |
| Z2 → Z5, Z3 → Z5 | Z5 | Writes to their own stores and to the event backbone | Tenant context, event envelope (§15.6.5) | Audit is the write path |

**Enforcement, in three independent layers.** One would be a convention; three make the
boundary survive a deadline.

1. **Build-time dependency lint.** A module in Z2 or Z3 that imports a provider SDK, or a
   module in any zone that imports a Z4-internal package, fails the build. This is the same
   mechanism §12.8.5 relies on for the chokepoint; it is stated here because the *graph*, not
   the library, is what makes it structural.
2. **Run-time network policy.** Egress to a model provider's network range is permitted only
   from the Z4 workload identity. A Z2 or Z3 process attempting it is refused by the platform,
   and the refusal is a security event feeding the incident pipeline (§15.6.6).
3. **Credential custody.** Provider credentials exist only in Z4's secret scope, and portal
   credentials only in the vault §22 specifies. A service outside the owning zone cannot read
   the secret even if it reaches the network.

- **AC-T12 (denied edge fails the build).** A test fixture that adds a provider-SDK import to
  a payroll-engine module fails CI with a named rule violation, not a warning; the same
  fixture added to the AI orchestrator fails identically.
- **AC-T13 (denied edge fails at run time).** With the lint disabled in a test environment, a
  direct provider call from a Z2 or Z3 workload is refused by network policy and raises a
  security event carrying the workload identity and the destination — proving the second
  layer independently of the first.
- **AC-T14 (the edge has no privileged path).** An AI-proposed change to a pay result is
  indistinguishable, at the write path, from a human's: same validation, same approval gate,
  same audit event with the proposing agent and the confirming human both named (§12.5.2).
  A test that submits the AI's proposal with the approval step removed is rejected.

#### 15.2.8 Failure domains and the degradation matrix

Principle 7 — *degrade, never fail silently* — is a claim about blast radius, and blast radius
is a design property that has to be enumerated before it can be tested. The rule that governs
every row below: **an external dependency may delay a submission or a disbursement line; it
may never corrupt or block a computation.** The two exceptions are deliberate and both are
*blocking by design*, because a wrong statutory figure is worse than a late one.

<!-- DIAGRAM: architecture-degradation-modes -->

| Failing dependency | Blast radius | Continues to work | Degraded behaviour | Operator surface |
| --- | --- | --- | --- | --- |
| **Statutory portal unreachable** (EPFO, ESIC, TRACES, state PT) | One filing job per registration | Pay run, payslips, registers, every other filing | Artefact is generated and validated locally; the job waits in the attended queue against its due date (§15.5.5) | "Generated, awaiting portal", with days to due date |
| **Portal rejects the artefact** | One filing | Everything else | Filing moves to REJECTED; the error file is mapped to employee records where the schema is known — the EPFO error-file schema is not public, so the mapper is built from the first real rejection captured on a live registration (§20 V-23) | Rejection with per-employee errors, or the raw error file where mapping is not yet possible |
| **Bank host-to-host down or a beneficiary rejects** | One disbursement line, or one batch | Pay run stays APPROVED/LOCKED; all other beneficiaries paid | Per-beneficiary retry and partial-batch handling; reconciliation queue pairs sent against acknowledged (§15.5.3) | Reconciliation queue with per-beneficiary state |
| **Biometric device offline or clock-drifted** | One device's punches | Every other device; the pay run | Device buffers and replays on reconnect; drift corrected against NTP-synced server time (§15.6.3); a non-biometric path always exists per employee (§09) | Device health list with last-seen and drift |
| **Template-deletion command unacknowledged** | One device, one subject | Everything else | The command stays in the retry queue until acknowledged, or is closed by an admin attestation of decommission or loss — the documented exception state, never a silent success (§09, Part E-6) | Outstanding-erasure list with age |
| **Model provider unavailable or over budget** | AI features only | **Every deterministic figure** — the number path has no AI in it | The feature reports itself unavailable with a stated reason; the router may re-point the task class to another consented backend for that tenant, never to an unconsented one (§12.8.7) | Feature-level unavailability notice |
| **Egress gateway down** | All AI features | Everything else | AI unavailable — this is the intended consequence of making it the only egress path | Same notice |
| **Rules engine returns `NO_RULE_IN_FORCE`** | The pay run for the affected jurisdiction | Other tenants, other states | **Blocks by design** (AC-R5): named reason, never a zero, never the nearest version | Blocking validation naming rule class, state and period |
| **Fixed-point node fails to converge** | One employee in one run | Every other employee | **Blocks by design** at PROCESSED (AC-R7): node, employee and last two iterates named; no intermediate iterate published | Blocking validation on the run |
| **Event backbone write fails** | The originating write | — | **Refuses the write**: no monetary mutation exists without its event, because the two share a transaction (§17.5 NFR-SEC-401) | Error to the actor; the mutation never happened |
| **A pool plane approaches its fairness limit** | Latency for the cohort | Correctness | Fair-share queueing degrades throughput before it degrades isolation; cohort sharding is the planned release valve (§15.3.5) | Capacity alert, not a customer-visible failure |

**Negative cases — behaviours that must not appear.** Each is a failure mode observed in the
class of system this replaces, and each is a test:

- A portal outage silently marking a filing complete, or advancing the filing state machine on
  anything other than a captured portal acknowledgement.
- A missing rule version defaulting to zero deduction — the failure that produces a
  statutorily short payment, which is an offence under Code on Wages s.54(1)(a) with a fine up
  to ₹50,000 (§15.1, principle 1), not a display bug.
- A device outage suppressing an employee's attendance rather than surfacing a gap, which
  would propagate into Form IX's per-day IN/OUT grid (EV-055).
- An AI feature outage producing an empty or partial figure rather than declining — the edge
  never contributes to a number, so it can never *silently* change one.
- A retry that re-submits an artefact under a new idempotency key, which is how one wage month
  becomes two challans against the same members (EPFO permits multiple challans, so the
  double-payment guard is ours — EV-036; §15.5.3).

- **AC-T15 (no cross-domain blast radius).** A fault-injection suite takes each dependency in
  the table down in turn and asserts the "continues to work" column holds: with every
  statutory portal unreachable, a pay run still reaches LOCKED and every payslip renders.
- **AC-T16 (blocking failures block visibly).** The two blocking rows each stop the run with a
  named, machine-readable reason code and publish no figure; a test asserting that a
  `NO_RULE_IN_FORCE` run produces zero payslips and zero filing artefacts passes.

#### 15.2.9 Synchronous and asynchronous boundaries

Where work is placed — inside a request a human is waiting on, or on a queue — is an
architecture decision with two consequences this product cares about disproportionately: a
month-end spike that is predictable rather than emergent (§15.3.5), and a failure surface where
an unreliable dependency cannot hold a person hostage. One rule governs the table:
**no human-facing request waits on a dependency we do not control** — not a portal, not a bank,
not a model provider, not a device.

| Operation | Mode | Why | On timeout or failure |
| --- | --- | --- | --- |
| Rule resolution | **Synchronous**, in-process pure call | No I/O, no clock, no database read inside evaluation (§15.4.1) — there is nothing to wait for | Cannot time out; a failure is one of the enumerated errors (§15.4.8) |
| Event write accompanying a monetary mutation | **Synchronous**, same transaction | The mutation may not exist without its event (§17.5 NFR-SEC-401) | The write is refused; the mutation never happened |
| Pay-run computation | **Asynchronous** job, per-tenant fair-share queue | A 200-employee run is not a request-shaped unit of work, and the month-end spike must be schedulable (§15.3.5) | Retries are safe because computation is pure; progress is visible; no partial publication |
| Payslip and document render | **Asynchronous**, results addressable | Rendering is derivable and re-derivable from retained data (§15.6.2) | Re-render on demand; never a stale cached figure |
| Filing artefact generation and local validation | **Asynchronous** | Follows the locked run, not a click | Failure keeps the filing before ARTEFACT_READY; nothing is queued for an operator |
| Attended portal submission | **Human-paced**, never inside a request | It is a session a person conducts (§22); modelling it as a request would put a portal's availability inside our latency budget | Queue states carry it (§15.5.5) |
| Bank disbursement file and reconciliation | **Asynchronous** | Bank timing is not ours | Per-beneficiary retry (§15.2.8) |
| Device punch ingest | **Asynchronous**, acknowledged on receipt | The terminal needs a fast acknowledgement, not our processing result | Device buffers and replays (§15.5.1) |
| AI assistant call | **Asynchronous** to the deterministic path, streamed to the user | The edge may never sit in a number's critical path (§15.2.7) | Feature degrades; no deterministic output changes |
| MCP write tool | **Synchronous** request that **stages a draft** | The caller gets a deterministic answer — "staged" — without the write having happened (§12.7.1) | Staging failure is returned to the caller; nothing is applied |
| Tenant export, restore, projection rebuild | **Asynchronous**, long-running, progress-reported | Hours-scale work with a verification step before any swap (§15.3.11) | Abort and retry; the live partition was never the work surface |
| Incident candidate creation and paging | **Asynchronous**, but on the shortest path in the system | The six-hour clock starts at awareness (§15.6.6) | A failure here is itself escalated, not retried quietly |

- **AC-T36 (no external dependency inside a human-facing request).** A static check over the
  request-handling paths finds no call to a portal, a bank, a model provider or a device from
  within a synchronous human-facing handler; a fault-injection run with every external
  dependency black-holed keeps every interactive page responsive.

---

### 15.3 Multi-tenancy model

The core tension: the beachhead is 20–200 employees, where a *silo per tenant* (one database
per customer) is operationally unaffordable at the number of tenants required for the unit
economics to work, but a *naive shared pool* (one row-set for everyone, isolation left to
application code) fails on three counts. It is hard to defend as a reasonable security
practice under SPDI r.8, the standard behind IT Act s.43A, whose compensation has no
statutory cap (EV-060, EV-061) — whether a given design meets that standard is for counsel
and the ISO 27001 auditor, not this PRD (§23). It fails regulated customers' due diligence
(EV-085–087). And it makes residency impossible. The model below is a deliberate **bridge**:
shared compute, partitioned data, with an escape hatch to full silo for named regulated
accounts.

<!-- DIAGRAM: multitenancy -->

#### 15.3.1 Isolation strategy by data class

| Data class | Isolation model | Rationale |
| --- | --- | --- |
| **Tenant business data** (employees, pay runs, filings, attendance, documents) | **Pool with enforced partition** — shared schema, mandatory `tenant_id` on every row, row-level isolation enforced at the data tier, not trusted to application code. | Affordable at beachhead tenant counts. We treat enforcement below the app as the precondition for arguing reasonable security under SPDI r.8 today (EV-060) and DPDP r.6 once in force (EV-064); the conclusion itself is for counsel and the auditor (§23). |
| **Statutory-rules engine** (rate/slab/ceiling packs) | **Fully shared, read-only to tenants, versioned centrally.** | The law is identical for every employer in a state. Duplicating it per tenant would fork the compliance surface — the exact opposite of the maintainability goal (operating model: §01, §22). |
| **Documents / artefacts** (payslips, letters, registers, filing PDFs) | **Per-tenant object-storage prefix** with tenant-scoped access keys; residency-pinned bucket/region. | Large binary, retention-bound per retention class (EV-054 central-sphere figures; state periods configurable, §14), residency-sensitive. Rendered documents are an erasable class (§15.6.2). |
| **AI context / policy corpora** (a tenant's HR policy docs the assistant reads) | **Per-tenant partition; never co-mingled in a shared cache.** | Caching economics invert per-tenant (§13 [Killed] "cache everything") *and* co-mingling policy text across tenants is a data-leak class. |
| **Regulated / named-account tenants** | **Silo escape hatch** — dedicated data plane, optionally self-hosted as a priced compliance SKU (§20 non-goal: never self-host *for cost*, only as a priced SKU). | RBI audit, access and inspection rights reaching sub-contractors, where the arrangement is material for that entity (EV-087); SEBI in-India residence and processing with the MeitY-empanelled-infrastructure rule applied to SaaS providers (EV-085); IRDAI's regulator-access undertaking reaching sub-contractors, which attaches where the arrangement is outsourcing — managed payroll, not a self-service licence — and whose localisation covers policy records only (EV-086); buyer RFP terms such as SBI's "all data functions and processing … within the boundaries of India" (r2/06). Some accounts contractually cannot share infrastructure. |

**[Hypothesis]** — Pool-with-partition scales to the beachhead's tenant count on one
regional data plane. *Kill criterion:* if, in load modelling before GA, a single pool plane
cannot hold the projected v1 tenant population within the residency/latency budget without
noisy-neighbour breaching the per-tenant rate SLA, shard the pool by tenant-cohort earlier
than planned (§15.3.5) rather than moving to silo.

#### 15.3.2 The tenant, precisely

A **tenant is the paying customer account and the top isolation boundary** (§14: Tenant →
Group → Employer, 1 : 1 : N; TAN on the legal entity). It holds one or more legal employers
of one owning group, and each employer holds its statutory registrations (an EPF establishment
code, ESIC code(s), PT enrolment(s), TAN). One legal employer with multiple EPF/ESIC codes
across states is *one tenant with multiple statutory registration contexts*, not multiple
tenants — because payroll, TDS (one TAN often spans locations) and the employee master are
shared, but PT/LWF/PF-office routing diverge by state. This is why principle 8 (build for
state divergence) lives inside the tenant, not across tenants. Unrelated employers served
by the same CA or bureau are separate tenants, never co-located in one (§15.3.9).

#### 15.3.3 Tenant context propagation

Every request carries a resolved `tenant_id` from the gateway (§15.2.3). The rule:

- **No service accepts a tenant claim from the request body** — only from the
  gateway-injected, signed context. A payroll-engine call that arrives without a valid
  tenant context is a hard reject, logged as a security event.
- **The data tier enforces the partition**, so a query that forgets its `tenant_id` predicate
  returns nothing rather than another tenant's rows. Isolation does not depend on every
  developer remembering a `WHERE tenant_id = ?`.
- **Async/event consumers re-derive tenant context from the event**, which carries it
  immutably; a background pay-run job cannot "lose" its tenant on the way to the queue.

#### 15.3.4 Shared statutory engine + per-tenant application

The most important multi-tenancy nuance is that the **rules are shared but the *application*
of a rule is per-tenant and effective-dated**. The engine answer to "what is the PT slab for
Karnataka on 2026-08-31" is identical for every tenant; but *which* tenant is liable, at what
enrolment, for which employees, on which wage base, is per-tenant. So:

- The rules engine is a shared, versioned, read-only service.
- Each tenant's payroll run *pins* the rule versions in force for the period and records them
  in the computation trace (§15.4.3). Two tenants running the same period get the same rule
  versions; a tenant re-running a *past* period gets that period's versions, not today's.

#### 15.3.5 Noisy-neighbour and fairness

Because compute is shared:

- **Per-tenant and per-user rate limits are P0** at the gateway (§13 [Verified]). Their values
  are the named parameters `ratelimit.per_tenant` and `ratelimit.per_user` (§15.13): the
  product is priced per employee but consumed per user, so the two limits are set
  independently and neither is derivable from the other.
- **Pay-run and filing jobs are queued per tenant** with fair scheduling, so one 200-employee
  tenant's month-end run cannot starve fifty 30-employee tenants running the same day. The
  month-end concurrency spike is predictable (the filing calendar clusters due dates), so the
  scheduler pre-provisions around known dates rather than reacting.
- **Cohort sharding as the pressure-release valve:** if a single pool plane approaches its
  fairness limit, tenants are sharded into pool cohorts (e.g. by size band or region) *before*
  isolation degrades — the partition model is unchanged, only the number of planes grows.

#### 15.3.6 The CA / bureau cross-tenant actor

A CA or bureau acts *across* many tenants and is the primary GTM channel (§18, [Hypothesis]
— unvalidated, gated by §20 V-05). The auth model must therefore support:

- A **CA-org identity** distinct from any single tenant, with an explicit, revocable,
  per-client **grant**. No implicit access. **In v1 a grant carries read, export and
  read-only audit scopes only**: money-of-record is read-only from the CA console and no
  write to a pay result, filing or challan is possible from it (§14 AC-DM-30; §05.5 item
  20). Prepare and assisted-submission scopes are the v2 extension (§15.9), opened only if
  V-05 validates the channel and counsel answers the attended-filing questions. Assisted
  submission would always run under the employer's written authority to act and leave the
  employer's statutory liability where it is; whether acting on portals under employer
  credentials, portal terms of use, the e-Return Intermediary route and personal DSC
  handling permit it is under counsel review (Part D-17; §22, §23 CR-17).
- **Every CA action carries both identities** in the audit trail: `(ca_org_id acting_as →
  tenant_id, actor_user)`. Every export, view and — from v2 — every filing a CA prepares is
  attributable to a named human at the CA org and the tenant it was for.
- **Scope granularity** matching the filing-denominated work lines in ICAI's recommended
  fee schedule (§04; a stale, pre-GST schedule, usable for the shape of the work and not
  for any price, r2/00): TDS return filing, PT registration/returns, TDS compliance review
  — read-only audit access is a distinct scope from preparation, and preparation from
  assisted submission.

**[Hypothesis]** — Modelling the CA as a first-class cross-tenant actor is worth the auth
complexity. *Kill criterion:* if V-05 (§20) finds CAs see us as
disintermediation and will not act as a channel, the cross-tenant grant model degrades to a
simple per-tenant export, and the CA console becomes a thin reporting view rather than a
filing surface.

#### 15.3.7 Edge cases the tenant + effective-dating model must handle by design

These are the cases that break naive HRMS data models; the architecture is drawn so each is
ordinary, not a special path. They are stated here because they cut across the tenant model
(§15.3), the rules engine (§15.4) and the identity model (§15.2.6).

| Edge case | Why it breaks naive models | How this architecture handles it |
| --- | --- | --- |
| **Mid-month join / exit** | PF/ESI are payable on wages for the days actually paid; a 14-day joiner is not a full-month contributor, and ESI coverage is period-scoped rather than a per-month test. | Payroll engine passes actual paid-days as a typed input; the rules engine prorates per its own versioned rule. The ESI contribution-period rule — an employee crossing the ₹21,000 ceiling mid-period keeps contributing to the end of that contribution period — is a rule attribute, not code (Source: esic.gov.in/contribution, verified r1/06). |
| **Employee with two UANs / duplicate ESIC IP** | A joiner from another employer may carry an unlinked UAN or a second IP number, corrupting the ECR and the continuity of service. | Core-HR treats statutory identifiers as first-class, de-duplicated per employee with a linkage state. The ECR generator excludes an unresolved member from the Regular return and flags it — never filing a wrong member id, never blocking the pay run — and a Supplementary return carries the member once resolved (EV-037). The filing ledger surfaces the exclusion as a future blocker, because a Regular return for month M needs every active member of month M−4 filed (EV-038). |
| **Inter-state transfer within one tenant** | The employee's PT liability, LWF cadence and PF-office routing change mid-year while the employee master and TAN stay the same. | This is exactly why a tenant carries *multiple statutory registration contexts* (§15.3.2). The transfer is a new assignment to an establishment in the other state; jurisdiction — state, sphere, Code-regime commencement date — is resolved from the work location into the evaluation context, never stored on the employee (§14, §15.4.1). Both states' periods coexist in the same tax year's filings. |
| **Loss-of-pay (LOP) and negative arrears** | A recovery in a later month can drive a component negative and re-open a prior filing. | Arrears/retro run supports signed deltas, recorded as a diff against the locked run, never a mutation (§08.4). An ECR can be corrected downward only by a Revised return before payment initiation (EV-037) — which is why the verification gate sits immediately before PAYMENT_INITIATED (§08.4). Once payment is initiated the approved return cannot be cancelled or revised downward (EV-036, EV-037): the diff is held as an operator exception linked to the original in the audit chain (§15.6.1), and the research establishes no recovery route for an over-remittance — an open question routed to §20's validation plan, not a behaviour this PRD specifies. |
| **Employee moves between two tenants served by the same CA** | The CA sees both, but the two employers are distinct legal entities with separate UAN/ECR obligations; data must not co-mingle. | CA dual-identity (§15.3.6) grants scope per tenant; the partition (§15.3.1) keeps the two employee records isolated even though one human CA touches both. |
| **Retro rule change after a filing is acknowledged** | The submitted ECR/return is now wrong against the corrected rule. | Recompute-and-notify pipeline (§15.8.3) enqueues the period; the original filing stays immutable in the audit log. The correction takes only the return type the portal permits (EV-037): Revised (needs an approved Regular and no other return in process; downward only before payment initiation — the circular exempts upward revision while EPFO's FAQ hedges, r5/02), Supplementary (only members absent from all prior returns for that month), or the separate arrear-return flow, whose layout is unpublished, so that generator is fenced (EV-043). |
| **Tax-year boundary in a retro run** | A backdated correction spanning 31 March straddles two income-tax vocabularies and two filing stacks. | The engine resolves a *sequence* of period-versions (§15.4.3). TDS on the arrears is reported against its deductee date of payment: Annexure I carries the TDS deducted during each quarter (EV-047), so the arrears land in the quarter and tax year of payment (§08 AC-210.3), not by re-opening earlier quarters. A correction statement arises only where a filed statement was itself wrong, and routes to that period's RPU/FVU stack (EV-052); the Form 138 Q4 correction format is unpublished (EV-046). Search, labels and imports accept both form vocabularies (EV-050). |

#### 15.3.8 Acceptance criteria for tenant isolation

Isolation failure is a security and regulated-customer liability (EV-060, EV-061, EV-087),
so it is tested as a property, not assumed:

- **AC-T1 (partition-below-app).** A deliberately-planted query that omits its `tenant_id`
  predicate returns zero rows, not another tenant's rows — proven against the enforcement
  mechanism (row-level filtering keyed to the gateway-injected context, §15.3.3), not against
  application code review.
- **AC-T2 (no body-supplied tenant).** A request that carries a `tenant_id` in its body but a
  different one in its signed gateway context is rejected as a security event; the body value
  is never consulted (§15.3.3).
- **AC-T3 (async carries tenant).** A pay-run job pulled off the queue re-derives its tenant
  from the immutable event; a job whose event lacks a valid tenant context dead-letters rather
  than executing against a default.
- **AC-T4 (residency honoured end-to-end).** A tenant pinned India-only never has data at rest,
  a log line, or an inference call served outside India — verified by injecting a probe request
  and asserting no non-India plane or workspace geo was touched (§15.7).
- **AC-T5 (no cross-tenant cache bleed).** Two tenants with identical policy-document text get
  isolated AI-context partitions; a cache key can never resolve across tenants (§15.3.1,
  §13 [Killed] "cache everything").

#### 15.3.9 Decision record — pooled vs siloed, and the bureau / CA multi-client shape

**Status: decided for v1** — option T-C and option B-1 below — with the revisit triggers
listed. Two coupled questions: how tenant data is physically separated (T), and where the
boundary sits when one CA or bureau serves many employers (B).

**Options for physical separation**

| Option | Shape | What it costs | What it buys |
| --- | --- | --- | --- |
| **T-A · Silo per tenant** | A database or data plane per customer | Every schema migration, backup, restore, monitor and month-end capacity plan runs once per tenant; the per-tenant fixed cost lands on a 20-employee account whose revenue scales per employee (EV-088) | The strongest isolation story; per-tenant restore and residency are trivial |
| **T-B · Pool with enforced partition only** | Shared schema; `tenant_id` on every row; isolation enforced at the data tier (§15.3.3) | One fleet to operate; month-end fairness must be engineered (§15.3.5) | Beachhead unit cost; a single rule-pack promotion path |
| **T-C · Bridge (chosen)** | T-B as the default; cohort sharding as the pressure valve (§15.3.5); a silo escape hatch for named regulated accounts, sold as a priced compliance SKU (§15.7.3) | Two deployment shapes to keep on one codebase | T-B's cost for the beachhead, T-A's answer where a contract requires it |

**Criteria, in principle order (§15.1)**

| Criterion | T-A | T-B | T-C |
| --- | --- | --- | --- |
| Isolation between employers (principle 3) | Physical | Enforced below the app; proven by AC-T1–T3 | As T-B, physical for silo accounts |
| Regulated due diligence and residency (EV-085–087) | Meets dedicated-infrastructure terms | Fails where a contract demands dedicated infrastructure | Silo SKU for those accounts only |
| Rules stay one shared, versioned dataset (principles 2–3) | Yes — rules are read-only and shared in every option | Yes | Yes |
| Cost per tenant at beachhead revenue (§13, EV-088) | Fixed cost per tenant | Lowest | Lowest for the pool; the silo is priced, not absorbed |
| Month-end cadence (§15.3.5) | Isolated but capacity-planned N times | One fair-share scheduler | One scheduler per plane |
| CA / bureau multi-client work | A CA spans N planes; every multi-client view is a federation | One plane; grants scope the view | One plane for the pool; silo clients federate |
| Per-tenant restore, export, offboarding | Native | Must be engineered (AC-T6) | Must be engineered for the pool |

**Decision T-C.** The deciding criteria are cost per tenant against a per-employee revenue
line and one fair-share month-end scheduler; the price is that per-tenant restore and
export must be engineered in the pool rather than inherited (AC-T6).

**Options for the bureau / CA shape**

- **B-1 · Client-owned tenants, CA as grantee (chosen).** Each employer is its own tenant;
  the CA or bureau is a CA-org identity holding revocable per-client grants (§15.3.6).
- **B-2 · Bureau-owned tenant.** One tenant per bureau, with its clients' legal employers as
  Employer rows inside it.

| Criterion | B-1 | B-2 |
| --- | --- | --- |
| Distinct legal persons, each with non-delegable statutory liability (EV-030, EV-035–038; §22) | Each client is its own isolation boundary | Unrelated employers sit behind an `employer_id` predicate inside one tenant — application scoping, the failure AC-T1 exists to prevent |
| Consent and notices name the right employer (§07, §14) | Native | Must be engineered per Employer row; who owes the SPDI written-consent duty is a counsel question either way (§23) |
| A client leaves its bureau | Revoke the grant; the data never moved | Extract one Employer's full history, registrations and filing ledger into a new tenant |
| Multi-client calendar and queue | A CA-org projection fed from each granted tenant (below) | A query inside one tenant |
| One bill and one console for the bureau | A payer relationship over several tenants (§18) — a commercial link, not a data link | Native |

**Decision B-1.** B-2 buys query convenience at the cost of the isolation boundary between
unrelated employers, which is the wrong trade for a product whose output is each
employer's statutory filing. §14 carries the same decision: a CA or bureau never pools its
clients' legal entities into one tenant, and holds no write access to money-of-record
(§14 Tenant → Group → Employer; AC-DM-30), with v0.3's "CA-run tenant" marked
**[Reversed]** there.

**How the multi-client view is built under B-1.** A per-CA-org **projection** holds only
calendar metadata — client tenant, registration, filing type, period, due date, filing
state, operator assignment — fed by the filing events (§15.6.1) of each tenant that has
granted that CA org. It never holds an employee-level field. Work on employee data needs a
switch into one tenant's context, resolved at the gateway as the `(ca_org_id, acting_on
tenant_id)` pair (§15.2.3) and audited with both identities. A client on a silo plane
appears in the projection only if its contract permits its filing events to leave its
plane; otherwise the console lists it as "dedicated plane — open in client context".

**Revisit triggers**

| Trigger | Re-opened decision |
| --- | --- |
| §20 V-05 finds bureaus will act as a channel only if the client account is theirs | B-2, and then only with `employer_id` enforced below the app as a second partition key and a per-employer export — decided then, not now |
| Hypothesis A1 fails (§15.10) | Cohort-shard the pool earlier; silo is not the answer to load |
| A targeted regulated buyer's due diligence rejects the pool | Silo SKU for that account (§15.7.3) |
| Per-tenant restore cannot meet §17.14's provisional RPO/RTO (NFR-DR-1401) inside the pool | T-C's pool default |

- **AC-T6 (per-tenant restore and export in the pool).** One tenant can be restored to a
  point in time, and exported in full, without reading or writing any other tenant's rows,
  within §17.14's provisional RPO/RTO (NFR-DR-1401); the restore is proven by a drill against a pool holding
  other tenants' data.
- **AC-T7 (CA projection carries no employee data).** A schema test fails the build if an
  employee-level field is added to the CA-org projection; revoking a grant removes that
  client's rows from the projection and refuses the next context switch into it.
- **AC-T8 (no unrelated employers in one tenant).** Adding a second legal employer to an
  existing tenant requires a recorded common-group declaration by the tenant admin; a CA
  org cannot create an Employer inside a tenant on which it holds only a grant.

#### 15.3.10 Tenant data-plane operations across the lifecycle

§05 owns the tenant lifecycle as a commercial and admission sequence (PROSPECT through
CLOSED). What that sequence *costs the data plane* is an architecture question, and it is the
part that is easy to leave until a customer leaves. Each row below is the set of platform
operations bound to a lifecycle transition, its guard, whether it can be undone, and the event
it emits. The rule running through the table: **every operation that destroys key material or
revokes an authority is irreversible and therefore gated on a recorded human decision.**

<!-- DIAGRAM: architecture-tenant-dataplane-ops -->

| Lifecycle transition (§05) | Data-plane operations | Guard | Reversible? | Event emitted |
| --- | --- | --- | --- | --- |
| Contracted | Create the tenant partition key range; create the residency profile (data-at-rest and inference, §15.7.1); create the object-storage prefix in the profile's region; register the tenant with the fair-share scheduler | A residency profile is mandatory — there is no "unset" default, because an unset value is how a regulated tenant silently lands on the wrong plane | Yes, until the first write | `TENANT.PROVISIONED` with the residency profile |
| Consent run and load | Open the consent store; issue per-subject keys lazily on first write of an erasable-class record (§15.6.2); open the per-establishment filing ledger (EV-038); open the migration/opening-balance staging area (§14.4.10) | The importer refuses records for a subject whose consent state the flow has not resolved; consent cannot be backfilled (Part E-12) | Staging is discardable; issued keys are not re-issued | `TENANT.CONSENT_STORE_OPEN`, `TENANT.LEDGER_OPEN` |
| Live | Steady state: grants and revocations, CA-org projection feeds (§15.3.9), rule-pack promotion, event stream, four-line cost attribution | — | n/a | Ordinary event stream |
| Notice given | Freeze new grants and new CA context switches; build the export bundle; hand back the register set and every filing artefact under its retention class | An export cannot be built while a pay run is between INPUTS_CLOSED and LOCKED — the snapshot would be of a half-computed month | Freeze is reversible if notice is withdrawn | `TENANT.EXPORT_BUILT` with the bundle manifest hash |
| Revoked | Revoke every grant, API credential and MCP token; close the attended-filing queue for the tenant's registrations; shred the tenant's entries in the credential vault (§22) and the Aadhaar token store's tenant scope (§14.4.15) | No open filing job may be in CLAIMED or IN_SESSION (§15.5.5) — an operator holding a live portal session must land or release it first | **No** | `TENANT.AUTHORITIES_REVOKED` listing each revoked authority |
| Retained | Place the partition in retention hold: reads for production-on-request only, no new writes, no erasure while any clock runs (EV-054 central-sphere periods; state periods configurable, §14.7) | A hold may not be lifted by the tenant, only by the retention engine's clock or a recorded legal decision | Hold can be extended, never shortened below a statutory floor | `TENANT.HOLD_SET` with the class and the clock |
| Closed | Purge the partition; destroy remaining key material; keep the tombstone record and the audit hash chain, which never leaves (§15.6.2) | Every retention clock expired **and** no open filing, dispute or hold | **No** | `TENANT.PURGED` with the classes purged and the tombstone reference |

**Why the hash chain survives a purge.** Erasure is crypto-shredding (§15.6.2): destroying the
key removes the ability to read the value, while the ciphertext and the chain stay
verifiable. A purge that broke the chain would destroy the evidence that nothing *else* had
been altered — the opposite of what an inspection needs. The tombstone therefore records the
class, the subject reference, the actor, the reason and the time, and nothing about the value.

- **AC-T17 (no unprofiled tenant).** Provisioning without a residency profile is refused; a
  test that creates a tenant with the field omitted fails, and a migration that would leave an
  existing tenant with a null profile fails the build.
- **AC-T18 (revocation is complete and provable).** After `TENANT.AUTHORITIES_REVOKED`, an
  enumeration of every grant, API credential, MCP token, CA grant and vault entry scoped to
  that tenant returns empty, and a replay of the next CA context switch into it is refused
  (AC-T7). Proven by a drill, not by inspection.

#### 15.3.11 Point-in-time restore and export inside a shared pool

T-C's price (§15.3.9) is that per-tenant restore and export must be *engineered* rather than
inherited from a silo. AC-T6 states the obligation; this is the mechanism. §17.14 owns the
RPO/RTO targets themselves (NFR-DR-1401, provisional until §20's instrumentation replaces
them) — this specifies how a restore is performed without touching another tenant's rows.

**A tenant restore is a logical rebuild, never a plane-wide rollback.** Rolling a shared plane
back to a point in time would silently rewind every other tenant on it — a correctness and a
contractual failure at once. The restore is composed instead:

1. **Select the target time** `t`. It must be expressible as a decision time, because the
   rebuilt state has to be meaningful in the bitemporal model (§14.6): "as the tenant's data
   stood at `t`", not "as we now believe it should have stood".
2. **Seed from the most recent tenant-scoped snapshot at or before `t`.** Snapshots are taken
   per tenant partition, not per plane, so a seed reads only that tenant's bytes.
3. **Replay the tenant's own event stream from the snapshot forward to `t`.** The event-sourced
   components (payroll engine, filing orchestrator, §15.6.2) rebuild exactly; non-event-sourced
   components restore from the snapshot and then apply their audit-logged mutations.
4. **Rebuild into a shadow partition**, verify, then swap. The tenant's live partition is
   never the work surface, so a failed restore costs nothing and a verification failure is
   detectable before anyone sees the result.
5. **Re-derive projections** — the CA-org calendar projection (§15.3.9) and any read model are
   rebuilt from the restored stream rather than restored directly, so a projection can never
   disagree with its source.

**What a restore does *not* resurrect.** This is the interaction that a naive backup design
gets wrong, and it is the reason the erasure mechanism is crypto-shredding rather than row
deletion (§15.6.2, K-24).

| Restored object | State before `t` | What the restore produces | Why |
| --- | --- | --- | --- |
| A bitemporal record (rule, salary structure, assignment, statutory attribute) | Present | Fully restored | Never-forget class |
| An erasable record whose subject key still exists (punch, rendered document) | Present | Fully restored | The key decrypts it |
| An erasable record whose subject key was crypto-shredded **after** `t` | Present at `t` | Ciphertext restores; **fields resolve as ERASED**; the tombstone restores alongside it | The key is gone. A restore must not be a resurrection route around an erasure — that would make erasure a fiction and the backup the leak |
| A pay run whose underlying punches were shredded | Computed | Figures reproduce from the **input snapshot**; provenance links resolve to the tombstone | §15.6.2: a pay run replays from its snapshot, not from raw punches |
| A filing already acknowledged by a portal | FILED | Restored as an immutable record with its acknowledgement | An acknowledged filing is a fact about the outside world; the restore cannot and must not change it |
| An audit event | Present | Restored with its hash chain intact and re-verified end to end | A restore that breaks the chain has destroyed the control it was protecting |

**Worked scenario — restore after a bad import (illustrative).** A tenant's operator runs a
second onboarding import that overwrites current compensation assignments. The tenant asks for
a restore to the moment before the import.

- The import is a bounded set of events on the tenant's stream, so `t` is the timestamp of the
  event immediately preceding the first import event — not an arbitrary wall-clock guess.
- Rebuild into shadow; verify by re-running the last locked pay run and asserting it reproduces
  byte-identically against its pinned rule versions (AC-R1). If it does not, the restore is
  wrong and the swap does not happen.
- Any filing already acknowledged between the import and the restore stays FILED; the restore
  does not un-file it, and any correction that the changed data implies takes only the route
  the portal permits (EV-037; §15.8.3) — for the ECR, a Revised return only while no payment
  has been initiated.
- An employee whose consent was withdrawn and whose erasable records were shredded between the
  import and `t` does **not** reappear: the restore yields ERASED fields and the tombstone.
- The whole operation is one `TENANT.RESTORED` event carrying `t`, the snapshot id, the event
  range replayed and the named human who authorised it.

**The export bundle** is the same machinery pointed at a file rather than a partition, and it
is what makes "a client leaves its bureau" (§15.3.9, B-1) a revocation rather than a
migration. It contains: the employee master and employment history; compensation assignments;
every pay run with its computation trace and pinned rule versions; every filing artefact and
portal acknowledgement; the per-establishment filing ledger; the register set and wage slips
under their retention classes (EV-053, EV-054); consent records with the regime each was
captured under (EV-058, EV-060); and the audit chain with a verification manifest. It does not
contain Aadhaar numbers or biometric templates, which live in separate stores under separate
keys and leave only by their own governed paths (§14.4.15, Part E-6).

- **AC-T19 (restore reads one tenant).** A restore drill executed on a pool plane holding
  other tenants' data reads and writes only the target tenant's partition and object prefix;
  an access audit over the drill shows zero reads of another tenant's rows or objects.
- **AC-T20 (restore is not a resurrection route).** A subject erased after `t` is still erased
  after a restore to `t`: their erasable-class fields resolve as ERASED, the tombstone is
  present, and a search of the restored partition for the subject's plaintext identifiers
  returns nothing.
- **AC-T21 (restore preserves the chain).** Chain verification over the restored audit stream
  passes end to end, and the restored stream's terminal hash matches the pre-restore stream's
  hash at `t`.
- **AC-T22 (export completeness).** An export bundle re-imported into an empty tenant
  reproduces every locked pay run byte-identically against its pinned rule versions, and its
  filing ledger shows the same unbroken month sequence (EV-038); the bundle manifest hash
  recorded at `TENANT.EXPORT_BUILT` matches the delivered bundle.

---

### 15.4 The statutory-rules engine

This is the spine of the product and the component whose design most differentiates it from
a feature-parity clone (§04: win on maintained updates and filing execution, not depth). It
is specified here as a component; the *content* of the rules is §06.

#### 15.4.1 What it is and is not

- **It is** a deterministic, pure evaluation service. Evaluation is a pure function of
  **(inputs, rule-set version, evaluation context)** — no I/O, no clock, no database read
  inside evaluation — returning a typed outcome plus the exact rule versions and clauses
  applied. The **evaluation context** is a closed, enumerated record stored with every run:
  **disbursal date** (planned at approval, replaced by the actual date at disbursal; it sets
  the PF due month for arrears — EPFO FAQ Q15, r5/02 — and the Form 138 date of payment),
  **as-of decision time** (the knowledge cut fixing which rule versions and facts were known;
  replay reuses the original, a recompute takes a new one), **jurisdiction set** (state,
  sphere and Code-regime commencement date, resolved from the work location, never from the
  employee), and **tax-regime election** (the employee's election in force at the decision
  time). The field-level requirement is §08 FR-PAY-210; this is the contract every consumer
  calls through. Same (inputs, rule-set version, context) → same output, forever.
  **[Reversed]** Earlier drafts keyed evaluation on `(rule_class, state, date, inputs)` and
  called that pure; the arrears rule needs the disbursal date, an external and later-known
  event, so the context must be enumerated and injected rather than read.
- **It is not** a calculator that anyone can call ad hoc with hardcoded numbers, and it is not
  where the AI writes rules. A wrong number here is a legal liability, so rule content changes
  go through the certification pipeline (§15.4.5), never a hotfix.

#### 15.4.2 Rule classes (the taxonomy the engine indexes)

| Rule class | Effective-dated? | Per-state? | Notes |
| --- | --- | --- | --- |
| **Wage-definition rule** (the 50% add-back) | Yes | No (central) | Two concurrent wage bases per employee per period; "or such other per cent as may be notified" makes the 50% a variable (§06 [Verified]). The single hardest calculation in the build. |
| **EPF/EPS/EDLI** contribution & ceiling | Yes | No | Build against the Employees' Provident Funds **Scheme 2026** (G.S.R. 525(E), 29 Jun 2026), with 12% re-notified retrospectively to 21.11.2025 by S.O. 3582(E) ([Verified], r2/10). The ₹15,000/month wage ceiling — re-fixed under Code on Social Security s.2(89) by S.O. 2702(E), 29 May 2026 — and the EPS 8.33% split it caps are effective-dated variables; revision is under pressure, and we are not aware of any notified revision as of September 2026 (r1/06). Contribution above the ceiling applies only where the joint higher-wage option is exercised (r1/06, r5/02). EPS 1995 and EDLI 1976 run on the CoSS s.164(2)(b) saving; no successor to either is named in the research, so the EPS/EDLI split after the saving lapses is an open effective-date the engine must accept on notification (§20 V-22). |
| **ESI** contribution & ceiling | Yes | Coverage notified by district, sometimes sub-district, keyed to the work location (r1/06); applies at ten or more persons, extended to notified hazardous occupations at even one employee (CoSS First Schedule, r2/05; EV-057) | Current: ₹21,000/month wage ceiling (₹25,000 for persons with disability), employee 0.75% + employer 3.25% (Source: esic.gov.in coverage and contribution pages, verified r1/06; ESI subordinate legislation saved by CoSS s.164(2)(b) to on or about 21 Nov 2026). The ESI side of the Nov-2026 cliff is **unresolved** — an open effective-date the engine must be able to accept the moment ESIC notifies (§20 V-08). A further First Schedule proviso makes contribution liability begin on a date the Central Government notifies as the date on which Chapter IV benefits are provided to that establishment, so **coverage is switched on per establishment by notification, not by headcount alone** (verified at gazette, r1/06). The engine therefore carries a per-establishment coverage-commencement date as a rule input: an establishment crossing ten persons with no such date resolves to a flagged not-yet-liable state, never to a contribution the employer cannot yet lawfully remit. |
| **Professional Tax** slabs | Yes | **Yes — per state**, gender variants, periodicity, slab base | Verified at primary for Maharashtra (top band ₹200 a month and ₹300 in February; women exempt to ₹25,000/month) and Odisha (slabs on *annual* income); Karnataka's effect (₹200 a month at ₹25,000 or above, ₹300 in February) read on the state PT portal, with the instrument itself not retrieved (§20 V-09); in Tamil Nadu and Kerala PT is a local-body levy (r2/10). Every other state is undone build-dependency work (§20 V-09). PT is constitutionally capped at ₹2,500 per person per year (Art. 276(2), r1/06). The engine models the final-month true-up and a monthly-vs-annual slab base as first-class rule attributes, not special cases. **[Reversed]** Earlier drafts said Frappe ships PT across 15+ states free, making PT parity. Frappe v16's India payroll names no Indian state and has no PT slabs, and TallyPrime's PT slabs are hand-entered (EV-031, EV-032): multi-state PT is greenfield in both incumbents and a genuine differentiator. |
| **Labour Welfare Fund** | Yes | **Yes — per state**, schedule/periodicity | LWF sits outside the four Codes; contributions are flat amounts with state-varying periodicity, and no research round has verified any state's rate or employer/employee split from a government source (r1/06, r2/10). The one verified periodicity is Karnataka's calendar-year cadence with a 15 January due date (r2/10); every other cadence and amount is unverified (§20 V-09). The scheduler (§15.2.6) carries per-state LWF due dates distinct from the monthly payroll cadence. **[Reversed]** Earlier drafts said Frappe ships LWF across 14 states free, so LWF was no differentiator. Frappe v16 has no LWF and TallyPrime has no LWF engine (EV-031, EV-032): greenfield in both. |
| **TDS on salary, s.392 (ex-s.192) → Form 138 (ex-24Q)** | Yes | No | Form 138 replaces 24Q with a breaking layout — challan sub-headings 301–312 → A–K with 303 removed, Annexure I remapped (EV-051) — on RPU/FVU 1.2 for Tax Year 2026-27 onward and RPU 6.0/FVU 9.5 for earlier years, routed by period (EV-052). **The Q4 regular and correction formats are not released** (EV-046), so Q4 output and the Form 130 data it feeds are fenced. Due dates are rule data: Q1 31 Jul, Q2 31 Oct, Q3 31 Jan, Q4 31 May of the year following the Tax Year (Rule 219, Income-tax Rules 2026; EV-049). Form 130 is issued by 15 June (Rule 215, r5/02) and is valid only if generated from TRACES (EV-048). Both vocabularies — old and new form and section numbers, FY and Tax Year — are accepted everywhere (EV-050). |
| **Gratuity** accrual & payout | Yes | No | Applies to every shop or establishment in which ten or more employees are employed **or were employed on any day of the preceding twelve months** (CoSS First Schedule, verified at gazette, r2/05), plus factories, mines and the other listed classes — a look-back test, so this threshold gate is evaluated over a rolling twelve-month window rather than on a point-in-time headcount, and an establishment that drops below ten does not thereby leave the obligation; payable after 5 years' continuous service, a requirement lifted on death, disablement or fixed-term expiry (fixed-term: after one year, r1/06); 15 days' wages per completed year, monthly wage ÷ 26 (Source: Code on Social Security s.53 and First Schedule, verified at gazette, r1/06). **The ceiling is "such amount as may be notified by the Central Government" (s.53(3)), and we are not aware of any such notification as of September 2026** — the familiar ₹20 lakh cap is a legacy of the Payment of Gratuity Act, repealed by s.164(1), and needs a notification under the Code (r1/06). The ceiling is a named parameter, `gratuity.ceiling`, with no default, routed to §20. Under the Code, "wages" for gratuity uses the *add-back* base (§15.4.3), so gratuity accrual is downstream of the wage-definition rule. |
| **Minimum wages** | Yes | **Yes — per state/scheduled employment** | Feeds the equal-pay/payment-of-wages base. |
| **Overtime / hours** | Yes | Per-state rules under Codes | Rate not less than 2× the normal rate (Code on Wages s.14, [Verified]). **[Hypothesis]** A 144-hours-per-quarter cap — secondary summaries only, never confirmed against gazette text; a warn-only rule, never a block (§09.6, §20 V-17). |
| **Headcount-threshold gates** | Yes | Mixed | Obligation gates at the thresholds in §06.1, each carrying its counting unit (worker vs employee) and sphere (central vs state) as fields (EV-057). POSH requires every employer to constitute an Internal Committee; the ten-worker line is the s.6(1) Local Committee, not an exemption (EV-056). A gate carries a third field, its **counting window**: the gratuity and maternity-benefit tests read "employed, or were employed, on any day of the preceding twelve months" rather than a headcount today (CoSS First Schedule, r2/05), so a gate modelled as a single integer against a current headcount silently under-applies both. |

#### 15.4.3 Effective-dating and retrospective recomputation — the mechanism

Every rule is a record with a **`[valid_from, valid_to)` effective-date range**, a
**decision-time range** (when that version was the believed truth), a **version id**, and the
**source citation** (gazette/notification number and date, with capture date). Rules are a
bitemporal, never-erased class (§15.6.2, §14): the engine never mutates a rule in place; a
change is a *new version* with a new range, and the old version stays queryable forever.

<!-- DIAGRAM: effective-dating-timeline -->

A computation follows this contract:

1. The payroll engine asks: *"resolve wage-definition rule for period 2026-07, run-date
   2026-11-15."* The engine returns the version whose effective range contains the
   **period**, not the run-date, as known at the evaluation context's as-of decision time
   (§15.4.1).
2. The result is stamped into the pay run's **computation trace**: for every component of
   every employee, which rule class, which version, which clauses, which inputs, which
   evaluation context, what output.
3. A **retro/arrears run** for that same past period re-resolves the *period's* versions, not
   today's — so an arrears payment in November for July recomputes PF/gratuity against July's
   rule versions (§08 [Verified] requirement), while the PF *due month* for those arrears
   follows the disbursal date, not the wage month, and is surfaced when the arrears batch is
   approved (EPFO FAQ Q15, r5/02; §08 FR-PAY-210). If the July rule was itself later corrected by
   a corrigendum with retrospective effect, the corrected version carries a
   retro-effective flag and the recompute uses it — this is exactly the case the
   change-watcher must not miss (§15.4.5).

**Worked example — the two wage bases on one payslip.** Employee CTC ₹60,000/month with
basic ₹22,000, HRA ₹11,000, conveyance ₹3,000, special allowance ₹24,000. The
wage-definition rule (add-back base) *excludes* HRA and conveyance; if the excluded
components exceed 50% of total remuneration, the excess is added back to "wages" for PF and
gratuity. The engine computes: excluded = ₹14,000 (HRA + conveyance) which is < 50% of
₹60,000, so no add-back — but if special allowance were reclassified as excludable, the
excluded set (₹38,000) would breach half of ₹60,000 (₹30,000), and the ₹8,000 excess would
be added back, re-basing PF wages from ₹22,000 to ₹30,000. **The same payslip
therefore carries a PF wage base and a separate payment-of-wages/equal-pay base (which
*includes* HRA, conveyance, OT), computed concurrently.** The engine returns both; the
payroll engine persists both; the trace records which rule version drew each boundary. This
is the concrete reason effective-dating is a rules-engine property, not a payroll-engine
convenience.

**Worked example — the EPS ceiling interaction inside the add-back.** Same employee, with
the reclassification above pushing PF wages to ₹30,000/month, and assumed to be an EPS
member — one who joined after 1 Sep 2014 with wages above ₹15,000 is not, and EPFO *flags*
(does not reject) EPS contributions for such a member before filing (EV-040), so the engine
reads EPS membership as its own attribute rather than inferring it. By default contributions are
restricted to the ₹15,000 ceiling: employee ₹1,800; employer ₹1,800, split EPS 8.33% =
₹1,250 and EPF ₹550 — the figures in EPFO's own ECR golden fixture (r5/02). Where employer
and employee have exercised the joint higher-wage option, contributions run on the full
₹30,000: employee ₹3,600; employer ₹3,600, of which EPS stays **capped at the ceiling** at
₹1,250 (not 8.33% of ₹30,000) and ₹2,350 goes to EPF. EDLI is 0.5% of wages up to the
ceiling = ₹75 (Source: EPFO scheme pages, r1/06; ceiling per S.O. 2702(E)). The engine must
apply the *ceiling* rule, the *wage-definition* rule and the employee-level higher-wage
election as separate versioned inputs that compose — a naive "12% of a single wages number"
implementation produces a wrong EPS split and mis-files the ECR. The trace records every
rule version and the ceiling that bit.

**Worked example — arrears that cross a rate change.** A promotion backdated from 2026-06
is processed in 2026-11, spanning the (hypothetical) event that the 50% add-back percentage
is re-notified effective 2026-09-01. The arrears run must split the period: June–August
recomputes on the pre-change wage-definition version, September–October on the post-change
version, each against *that month's* EPF ceiling version. Three outputs are keyed to the
**disbursal date** in the evaluation context, not to the wage months: the PF due month for
the arrears (EPFO FAQ Q15, r5/02), filed through EPFO's separate arrear-return flow whose
layout is unpublished, so that generator is fenced (EV-043); the Form 138 deductee date of payment,
which places the TDS on the arrears in Q3's Annexure I (October–December) rather than
re-opening Q1 or Q2 (EV-047; §08 AC-210.3); and the start of any interest exposure (§08 FR-PAY-210). How each state's PT treats
arrears is unverified — a per-state rule attribute, `pt.arrears_treatment`, routed to §20
V-09. The engine resolves a *sequence* of period-versions, not one; the payroll engine emits
one arrears payslip with a per-period version breakdown in the trace. This is the mechanism
§08's "recompute against the version in force for the period" cashes out to.

#### 15.4.4 Rule packs and the "compliance-as-code" data flow

Rules ship as **versioned rule packs** — a pack is a signed, dated bundle of rule versions
for a jurisdiction (e.g. "Karnataka PT, effective 2026-04-01"). Packs are the unit the
statutory team maintains and the unit the certification pipeline tests. This directly serves
the operating-model decision (§01; the compliance data pipeline is specified in §22): the
company is a **compliance-maintenance operation with a permanent statutory team**, and the
rule pack is that team's deliverable — not a code release.

#### 15.4.5 The change pipeline and certification

A rule change flows: **watcher detects → statutory analyst verifies against primary source
(and checks for a corrigendum — non-negotiable, §02 standing rule) → drafts new rule version
with citation → certification test suite runs against gazette-derived fixtures → staged to a
canary tenant cohort → promoted to all tenants for the effective date.**

- **Certification fixtures** are worked examples derived from the gazette/notified rule (and,
  where they exist, the portal's own validation utility — e.g. the EPFO ECR format validator,
  the RPU/FVU for 24Q/Form 138). A rule version cannot promote unless it reproduces the
  fixture outputs exactly.
- **"Check for a corrigendum" is a pipeline gate**, not a nicety — the Nov-2026 inversion
  happened because a notification was read without checking whether a corrigendum had amended
  it (§02 [Verified]). The watcher indexes corrigenda and amendments explicitly, not just new
  instruments.
- **Retrospective changes** (a corrigendum dated back) enter as a new version with a
  retro-effective flag; the pipeline additionally enqueues affected past periods for
  recompute-and-notify, because filings already submitted against the old version may need
  whatever correction the portal permits (§15.8.3).

**[Hypothesis]** — A single certified rule-pack pipeline can keep pace with the recurring
statutory load (annual Budget, wage-ceiling revisions, per-state PT/LWF, uneven Code
rollout). *Kill criterion:* if, in the first two quarters of operation, the median
notification-to-certified-pack latency exceeds the shortest statutory effective-notice window
observed (the lead time state notifications actually give is unmeasured — instrument it from
the watcher, §20), the maintenance model is under-resourced and the statutory-team sizing
(§22) is wrong — escalate before it causes a missed-filing incident.

#### 15.4.6 Acceptance criteria for the rules engine

These are testable and are the gate on the component shipping in v1:

- **AC-R1 (determinism).** For any `(inputs, rule-set version, evaluation context)`, ten
  thousand repeated evaluations return byte-identical outcomes and identical resolved-version
  ids. No wall-clock, no random, no environment input and no field outside the enumerated
  context (§15.4.1) affects the result; an evaluator with clock and database access removed
  produces the same figures.
- **AC-R2 (period-resolution, not run-date).** Given a rule with versions
  `V1 [2026-04-01, 2026-09-01)` and `V2 [2026-09-01, ∞)`, a query for period 2026-07 with
  run-date 2026-11-15 resolves `V1`. A query for period 2026-10 resolves `V2`. Proven by
  fixture, not by inspection.
- **AC-R3 (retro-corrigendum).** A version inserted with `retro_effective=true` and a
  `[valid_from]` in the past supersedes the previously-resolved version for affected periods,
  and re-resolving those periods returns the corrected version plus a flag that a superseding
  correction occurred (so downstream can enqueue the permitted correction, §15.8.3).
- **AC-R4 (gazette fixture parity).** Every shipped rule version reproduces its certification
  fixtures — worked examples derived from the gazette and, where one exists, the portal's own
  validator (EPFO ECR validator, RPU/FVU for Form 138) — to the last paisa. Rounding is a
  versioned rule attribute, not code, applied once after any fixed-point convergence (§08
  FR-PAY-209); where the evidence states no rounding method for a statute, the method is a
  named configurable parameter routed to §20, never a guessed rule.
- **AC-R5 (no silent gap).** A query for a `(state, date)` with no rule version in range
  returns an explicit `NO_RULE_IN_FORCE` error that blocks the pay run with a named reason —
  never a zero, never a fallback to the nearest version. A missing PT slab for a newly added
  state is a visible block, not a silently-skipped deduction.
- **AC-R6 (citation completeness).** Every version carries a resolvable source citation
  (instrument number + date + clause); a version without one cannot promote past the
  certification pipeline (§15.4.5). This enforces the PRD standing rule at the data layer.

#### 15.4.7 The calculation graph: bounded fixed-point nodes

**[Reversed]** Earlier drafts assumed the payroll calculation graph is a DAG evaluated once
in topological order. It is not always: the s.2(y) / CoSS s.2(88) add-back re-bases components that feed its
own 50% test, and a net-of-tax gross-up solves gross pay from a target net while the tax
depends on the gross. The evaluator therefore permits **bounded fixed-point nodes**:

- A fixed-point node is *declared* in the graph with its loop members, a maximum iteration
  count and a tolerance — versioned engine parameters `fixed_point.max_iterations` and
  `fixed_point.tolerance`, not statutory values (§08 FR-PAY-211). Every node outside a
  declared loop evaluates once, in dependency order; an undeclared cycle fails the build.
- The loop iterates from a defined starting iterate until the change falls under the
  tolerance. Each iterate resolves the add-back against the same pinned rule version — rules
  are never re-resolved mid-loop — so convergence is deterministic and replay reproduces it.
- The computation trace records every iterate, the iteration count and the tolerance that
  stopped it; statutory rounding applies once, to the converged values only (FR-PAY-209).
- A node that has not converged at its limit stops the run with a blocking validation naming
  the node, the employee and the last two iterates. No intermediate iterate is published.

**Worked example — the add-back inside a balance-figure CTC.** When CTC closes on a
special-allowance balance figure and carries a gratuity accrual computed on wages as
defined in CoSS s.2(88) (the same 50% add-back as Code on Wages s.2(y); §06.10), the
loop runs: a larger add-back raises wages → raises the accrual → lowers the balance figure →
lowers "all remuneration" → changes the add-back. §08.12 Example G works it to convergence at
iteration 5 (wages ₹48,826.29); a one-pass evaluator must publish a first iterate and either
under-accrues gratuity or breaks the CTC reconciliation. The rules engine supplies the
add-back rule; the payroll engine's graph owns the loop.

- **AC-R7 (bounded fixed point).** Example G reproduces exactly — iteration count and every
  figure — through the production evaluator on repeated runs and on replay; a deliberately
  non-converging loop stops the run at PROCESSED with the blocking validation above and
  publishes no figure.

#### 15.4.8 The resolution contract — request, response, errors and pack pinning

§14.6.3 specifies how a rule row is *stored and selected*; this is the **service contract**
every consumer calls through, and it is where purity is either preserved or quietly lost. The
distinction matters because the two most common ways to break a pure evaluator are to let it
read something (a clock, a flag, a tenant setting) and to let a caller pass something the
contract does not name.

<!-- DIAGRAM: architecture-rule-resolution-contract -->

**Request.** Five fields, all mandatory, nothing optional that changes the answer.

| Field | Type | Meaning | Failure if absent or malformed |
| --- | --- | --- | --- |
| `rule_class` | Enumerated (§15.4.2) | Which taxonomy entry is being resolved | `E-UNKNOWN-RULE-CLASS`, blocking — a typo must never resolve to a neighbouring class |
| `jurisdiction_set` | State + sphere + Code-regime commencement date | Resolved from the **work location**, never from the employee (Part E-5) | `E-JURISDICTION-UNRESOLVED`, blocking, naming the assignment that could not be placed |
| `period` | Wage month, quarter or tax year, typed | The period the rule must have been in force *for* | `E-PERIOD-MALFORMED`, blocking |
| `evaluation_context` | The closed record of §15.4.9 | Disbursal date, as-of decision time, jurisdiction set, tax-regime election | `E-CONTEXT-INCOMPLETE`, blocking, naming the missing field |
| `pack_pin` | Pin handle or explicitly `NONE` | Present for replay and for every iteration of a fixed-point loop; `NONE` only on a first evaluation | A caller that omits the field entirely, rather than stating `NONE`, is rejected — silence must not mean "today" |

**Why `jurisdiction_set` appears twice.** It is both a top-level request field and a field of
the evaluation context (§15.4.9), and that is deliberate rather than redundant: at the top
level it is the resolver's index key, and inside the context it is the record of what the
evaluation actually used. They must be identical, and a mismatch raises
`E-CONTEXT-INCOMPLETE` naming **both** values — because the only way the two can differ is
that a caller resolved against one jurisdiction and evaluated against another, which produces
a figure whose own trace defends a different state. The same reasoning is why `period` is a
top-level field and not a context field: the period is what the resolver is asked *about*,
while the context is what the evaluator was standing in when it asked.

**Response.** The resolver returns the version set and its provenance; it never returns a
number of its own.

| Field | Meaning |
| --- | --- |
| `resolved_versions[]` | One version id per rule the class required, each with its `[valid_from, valid_to)` range and its decision-time range |
| `clauses[]` | The specific clauses applied, so the computation trace records *what* was applied, not only *which version* |
| `citations[]` | Instrument number, date and capture date per version — AC-R6 makes a version without one unpromotable, so this field is never empty |
| `pack_pin` | A handle that reproduces exactly this version set, for replay and for loop iterations |
| `flags[]` | `RETRO_SUPERSEDED` where a retro-effective corrigendum has since superseded the version that was resolved at the original decision time (AC-R3), and the EPFO-style advisory flags that are warnings rather than rejections (EV-040) |

**Error taxonomy.** Every error is blocking; there is no "best effort" resolution, because
the failure mode a fallback produces is a statutory short payment (§15.2.8).

| Code | Raised when | Caller behaviour |
| --- | --- | --- |
| `E-CONTEXT-INCOMPLETE` | Any enumerated context field is missing or internally inconsistent | Stop the run; name the field; no partial evaluation |
| `E-JURISDICTION-UNRESOLVED` | An assignment has no work location, or the location maps to no jurisdiction row | Stop the run; name the employee and assignment |
| `E-NO-RULE-IN-FORCE` | Zero versions cover the period (AC-R5) | Stop the run with a named reason — **never** a zero, never the nearest version |
| `E-OVERLAPPING-VERSIONS` | Two or more versions cover the same period at the same decision time | Stop; quarantine the pack; this is a pack defect, not a tenant problem, so it must page the statutory team and not only the tenant |
| `E-PACK-PIN-UNRESOLVABLE` | A pinned pack version no longer exists | Stop; a pin that cannot be resolved means replay is impossible, which is a data-loss incident, not a recoverable error |
| `E-CITATION-MISSING` | A resolved version carries no citation | Stop; should be unreachable because AC-R6 gates promotion, so raise it as a pipeline defect |

**Pack pinning and caching — the precise boundary.** The resolver's output (a version set) is
derived only from public law and the request; the evaluator's output (a figure) is derived
from tenant data. They therefore cache differently, and conflating them is how a
multi-tenant payroll system leaks:

- **Resolution results are cacheable across tenants**, keyed by
  `(rule_class, jurisdiction_set, period, as-of decision time, pack version)`. This is the
  practical form of §15.3.4: the law is identical for every employer in a state.
- **Evaluation outcomes are never cached across tenants** — they contain tenant inputs. AC-T5
  bars cross-tenant cache resolution for AI context corpora; the same bar applies here, and a
  cache key that could admit an evaluation outcome fails the build.
- **Invalidation is event-driven, not time-driven.** A pack promotion (§15.4.5) invalidates
  every cached resolution whose pack version it supersedes. A time-to-live exists only as a
  safety net; its value is the named parameter `rules.resolver_cache_safety_ttl`, owner
  platform engineering, routed to §20 — it is an operational choice, never a statutory one.
- **Batch resolution** is the normal call shape: a 200-employee run in a two-state tenant
  resolves a handful of distinct `(class, jurisdiction, period)` tuples, not 200 × N calls.
  The batch returns one pack pin for the whole run, which is what makes "the run pinned its
  rule versions" a single verifiable fact in the computation trace rather than a per-employee
  claim.

**Worked example — two states, one period, one run.** A tenant with employees in Maharashtra
and Karnataka resolves `rule_class = professional_tax` for wage month 2027-02.

- The batch produces two resolutions from one request set, each with its own citation. The
  Maharashtra version carries the top band of ₹200 a month with ₹300 in February and the
  exemption for women up to ₹25,000 a month; the Karnataka version carries ₹200 a month at
  ₹25,000 or above with ₹300 in February (§15.4.2; Maharashtra and Odisha verified at primary,
  Karnataka read on the state portal with the instrument itself not retrieved, §20 V-09).
- February is the month the slab changes, so the resolution for 2027-02 differs from the one
  for 2027-01 *within the same tax year* — a per-month resolution, not a per-year one. Across
  a full year at the Maharashtra top band the arithmetic is ₹200 × 11 + ₹300 = **₹2,500**,
  which is exactly the constitutional ceiling on professional tax of ₹2,500 per person per
  year (Article 276(2), r1/06). The engine therefore has no headroom above the slab table: a
  rule version that would take a person past ₹2,500 in a year is a pack defect, and the
  certification fixture for any state's PT pack asserts the annual total against that ceiling.
- A third employee in a state whose PT pack is not yet certified resolves to
  `E-NO-RULE-IN-FORCE`. The run blocks for that employee with the state and period named, and
  the compliance calendar shows the gap rather than a silently-missing deduction (§15.5.4).
  This is the intended behaviour for every uncertified state, and it is why the per-state
  build-out (§20 V-09) is a visible dependency rather than a silent one.

- **AC-R8 (the contract is closed).** A resolution request carrying a field outside the five
  named above is rejected rather than ignored; a request omitting `pack_pin` entirely — as
  distinct from stating `NONE` — is rejected. Proven by contract test.
- **AC-R9 (a pin reproduces a version set forever).** Re-resolving with a stored `pack_pin`
  after any number of later pack promotions returns the identical `resolved_versions[]` and
  `clauses[]`; the only permitted difference is the addition of a `RETRO_SUPERSEDED` flag.
- **AC-R10 (no cross-tenant evaluation cache).** A build-time check fails if any cache key in
  the evaluation path omits the tenant scope; a runtime probe with two tenants submitting
  identical inputs confirms two distinct evaluations and two distinct trace records.

#### 15.4.9 The evaluation context, field by field

Part E-3 makes evaluation a pure function of `(inputs, rule-set version, evaluation context)`
and requires the context to be **enumerated**. Enumeration is the whole point: an open context
is indistinguishable from an impure function, because anything the evaluator can reach becomes
part of the answer without appearing in the record. §08 FR-PAY-210 states the field-level
requirement; this is the architectural contract — where each field comes from, when it
freezes, and what replay does with it.

| Field | Type | Source | Frozen at | Replay behaviour | Failure if absent |
| --- | --- | --- | --- | --- | --- |
| `disbursal_date` | Date | Planned date at approval; replaced by the **actual** date at disbursal (§15.8.2 step 5) | Twice: planned at APPROVED, actual at DISBURSED | Replay reuses the value that was in force for the run being replayed, never today's | Blocking: PF liability on arrears dates from the disbursal date, not the wage month (Part E-9; EPFO FAQ Q15, r5/02), and the Form 138 date of payment places the TDS in a quarter (EV-047) — without it both are guesses |
| `as_of_decision_time` | Timestamp | The knowledge cut: which rule versions and facts were *known* | At the first evaluation of a run | **Replay reuses the original**; a recompute takes a new one. This single distinction is what separates "show me what we did" from "tell me what we should have done" | Blocking: without it a replay silently becomes a recompute |
| `jurisdiction_set` | State + sphere + Code-regime commencement date | Resolved from the work location of the assignment (Part E-5) | At INPUTS_CLOSED for the period, per assignment | Replay reuses the resolved set, including for an employee who has since transferred states | Blocking: `E-JURISDICTION-UNRESOLVED` |
| `tax_regime_election` | Enumerated election | The employee's election in force at the decision time | At the decision time | Replay reuses the election as it stood, not as it now stands | Blocking for any TDS-bearing component |

**Cross-field consistency rules.** Each is checked before evaluation begins, and each failure
is `E-CONTEXT-INCOMPLETE` with the rule named:

1. `disbursal_date` may not precede the start of the period being evaluated for a regular run.
   An arrears run is the deliberate exception — that is exactly the case where the disbursal
   date is later than the wage month, and the whole point of carrying it separately.
2. `as_of_decision_time` ordinarily *precedes* `disbursal_date`, because a run is computed
   before it is paid, so no check may require the reverse — an earlier draft's "knowledge
   cannot be older than the event it describes" would have blocked every ordinary run
   computed at APPROVED against a planned disbursal date. The invariant that does bind is
   narrower and is the one tested: a **replay** may not carry an `as_of_decision_time` other
   than the one the original run recorded. A later knowledge cut is a recompute, and
   accepting it under the name "replay" is the precise failure AC-R12 exists to catch.
3. `jurisdiction_set`'s Code-regime commencement date must be consistent with the period; a
   period before a regime's commencement resolves that regime's rules only if the rule
   version's own range says so, never by inference.
4. A `tax_regime_election` changed after `as_of_decision_time` is invisible to the evaluation.
   This is correct and it is counter-intuitive to users, so the trace records the election it
   used and the payslip explanation names it (§08).

**What the context deliberately excludes, and why.** Each exclusion is a purity guarantee:

| Excluded | Why it must not be in the context |
| --- | --- |
| Wall-clock time | The most common way a "deterministic" engine becomes non-reproducible. `as_of_decision_time` is the only time the evaluator sees. |
| `tenant_id` | The law does not vary by customer. Admitting a tenant into the evaluator would make per-tenant rule divergence *possible*, which is precisely the fork §15.3.4 exists to prevent. |
| Feature flags and rollout cohorts | A figure that depends on a rollout cohort cannot be defended to an inspector. Flags may change which *code path builds the request*; they may never reach the evaluator. |
| The acting user or role | Permissions decide who may trigger an evaluation, never what it returns. |
| Anything read from a database inside evaluation | Inputs are passed, not fetched. An evaluator with database access removed must produce identical figures (AC-R1). |

**Worked example — one input set, four contexts.** The same employee, the same ₹60,000 monthly
structure and the same rule content as §15.4.3, with only the context varying. This is the
table that makes "the context is part of the answer" concrete:

| Context variation | What changes | What does not |
| --- | --- | --- |
| Regular run for 2026-07, disbursed 2026-07-31 | PF due month follows the disbursal date in the ordinary way; the TDS lands in Q2's Annexure I (quarter ending 30 September; EV-047, EV-049) | The gross-to-net figures |
| Arrears for 2026-07 disbursed 2026-11-15 | PF liability on the arrears dates from the **November** disbursal, surfaced when the arrears batch is approved (Part E-9); the TDS lands in Q3's Annexure I and is filed by 31 January (EV-049), rather than re-opening Q2 | The recomputation itself, which still resolves **July's** rule versions (AC-R2) |
| Replay of the July run on 2026-12-01 | Nothing. `as_of_decision_time` is the original, so the original versions and the original figures return | Everything |
| Recompute of July on 2026-12-01 after a retro-effective corrigendum | A new decision time resolves the corrected version; the resolver returns `RETRO_SUPERSEDED`; a diff is produced and the permitted portal correction is prepared (§15.8.3) | The *original* run, which stays immutable in the audit stream |

The fourth row is the one that justifies the design: the system must be able to say both
"here is what we filed and why it was right on the knowledge we had" and "here is what the
corrected rule now implies" — without either statement overwriting the other.

- **AC-R11 (context completeness is enforced, not documented).** Evaluation with any
  enumerated field absent raises `E-CONTEXT-INCOMPLETE` naming the field, and a test that
  removes each field in turn produces four distinct, specific errors — never one generic
  failure.
- **AC-R12 (replay versus recompute).** Replaying a run reproduces its figures and its
  resolved versions exactly; recomputing the same period after a retro-effective pack
  promotion produces different figures **and** leaves the original run's stored trace
  unchanged. Both are asserted in one test, because it is the pair that matters.

#### 15.4.10 Fixed-point node catalogue and convergence behaviour

§15.4.7 establishes that the calculation graph is not always a DAG and that loops are declared,
bounded and traced. This specifies the node registry and the behaviours at the edges of
convergence — the cases that decide whether a fixed-point evaluator is trustworthy or merely
usually right.

<!-- DIAGRAM: architecture-fixed-point-loop -->

**A declared node carries exactly these attributes.** The registry is a versioned engine
artefact, reviewed like a rule pack but *not* a rule pack — these are evaluator parameters,
not statutory values (§08 FR-PAY-211):

| Attribute | Meaning | Notes |
| --- | --- | --- |
| `node_id` | Stable identity used in traces and blocking messages | Appears verbatim in the operator's error |
| `loop_members[]` | The components inside the cycle | Anything outside evaluates once, in dependency order; an *undeclared* cycle fails the build |
| `seed_rule` | How the starting iterate is chosen | Declared, not incidental: an undeclared seed makes the iterate sequence an implementation detail and breaks replay |
| `max_iterations` | `fixed_point.max_iterations` | Engine parameter, versioned, routed to §20 |
| `tolerance` | `fixed_point.tolerance` | Compared on the declared convergence quantity, in the currency's minor unit |
| `oscillation_window` | `fixed_point.oscillation_window` (new; owner payroll engineering, routed to §20) | How many prior iterates are retained to detect a repeating pair |
| `tie_break` | Declared behaviour on oscillation, or `NONE` | With `NONE`, an oscillation is treated as non-convergence and blocks — the safe default |

**The two loop classes known today** (both from §15.4.7 and §08, not new): the
CoSS s.2(88) / Code on Wages s.2(y) add-back re-basing components that feed its own 50% test
when CTC closes on a balance figure with a gratuity accrual; and a net-of-tax gross-up, where
tax depends on the gross being solved for. No third class may be added without a registry
entry and a certification fixture.

**Convergence state table.**

| State | Entered when | Side effect | Who may trigger | Exit |
| --- | --- | --- | --- | --- |
| `SEEDED` | Node reached in dependency order | Starting iterate taken from `seed_rule` | Payroll engine only | → `ITERATING` |
| `ITERATING` | Any pass completes with delta above tolerance | Iterate appended to the trace | Engine | → `ITERATING`, `CONVERGED`, `OSCILLATING` or `LIMIT_REACHED` |
| `CONVERGED` | Delta at or under `tolerance` | Statutory rounding applied **once**, to the converged values only (FR-PAY-209) | Engine | → published |
| `OSCILLATING` | The same iterate pair repeats within `oscillation_window` | Recorded with both iterates | Engine | → `LIMIT_REACHED` when `tie_break` is `NONE` |
| `LIMIT_REACHED` | Iteration count reaches `max_iterations`, or an unresolvable oscillation | Run stops at PROCESSED; node, employee and last two iterates named | Engine | → blocked; only a human may change an input and re-run |

**Why rounding happens once, after convergence.** Rounding inside the loop changes the delta
that the tolerance is measured against, so a node can appear to converge because rounding has
flattened a difference that is still moving. Rounding is a versioned rule attribute (AC-R4),
and it applies to the converged values only. Where the evidence states no rounding method for
a statute, the method is a named configurable parameter routed to §20 — never a guessed rule.

**Worked example — what the loop does and does not move.** Take §08.12's Example G, which
converges at iteration 5 on wages of **₹48,826.29** (§15.4.7). Two downstream consequences,
and the contrast between them is the reason the loop is worth its complexity:

- **Gratuity accrual moves.** The accrual is computed on wages as defined in CoSS s.2(88), so
  every iterate changes it, and a one-pass evaluator publishes the first iterate and
  under-accrues.
- **The statutory PF contribution does not move, unless the higher-wage option is in force.**
  By default contributions are restricted to the ₹15,000 monthly wage ceiling
  (S.O. 2702(E); §15.4.2), so at converged wages of ₹48,826.29 the employee contribution is
  12% of ₹15,000 = **₹1,800**; the employer's ₹1,800 splits EPS 8.33% of ₹15,000 =
  **₹1,250** and EPF **₹550**; EDLI is 0.5% of wages up to the ceiling = **₹75** (§15.4.3,
  r1/06, r5/02). Every iterate of the loop produces the same three figures, because the
  ceiling binds well below the converged wage.
- **The contrast is the specification.** A loop that is allowed to run without the ceiling rule
  composed correctly would produce moving PF figures and a moving ECR line — which would then
  be filed. The rules engine supplies the ceiling rule and the wage-definition rule as
  *separate versioned inputs that compose* (§15.4.3); the payroll engine's graph owns the loop.
  Where the employer and employee have exercised the joint higher-wage option, the ceiling no
  longer binds and the PF figures **do** move with the iterate — which is exactly why the
  option is an employee-level attribute in the evaluation inputs and not an engine setting.

**Test scenarios for the evaluator** (each is a fixture, each has an expected outcome):

| # | Scenario | Expected outcome |
| --- | --- | --- |
| FP-S1 | Example G, production evaluator, ten repeated runs | Identical iterate count and identical figures every time (AC-R7, AC-R1) |
| FP-S2 | Example G replayed from its pack pin after two later pack promotions | Identical result; pinned versions unchanged (AC-R9) |
| FP-S3 | Tolerance boundary: a delta exactly equal to `tolerance` | Converges — the comparison is "at or under", stated so that two implementations cannot differ |
| FP-S4 | Constructed oscillation between two iterates, `tie_break = NONE` | `OSCILLATING` → `LIMIT_REACHED` → run blocked; both iterates in the message |
| FP-S5 | Constructed divergence | `LIMIT_REACHED` at `max_iterations`; no figure published |
| FP-S6 | Undeclared cycle introduced into the graph | **Build failure**, not a runtime block |
| FP-S7 | Rounding forced inside the loop | Fixture fails: converged values must differ from the round-inside result, proving rounding is applied once |
| FP-S8 | Ceiling-bound employee as above | PF ₹1,800 / EPS ₹1,250 / EPF ₹550 / EDLI ₹75 identical at every iterate, while the gratuity accrual moves |

- **AC-R13 (declared loops only).** The build fails on any cycle in the calculation graph that
  has no registry entry; the failure names the participating components.
- **AC-R14 (no iterate escapes).** No intermediate iterate is written to a payslip, a filing
  artefact, an event payload or an API response. A test that inspects every output surface
  during a deliberately slow-converging run finds only the converged values or the block.

#### 15.4.11 The computation trace as a data product

Every acceptance criterion above depends on one artefact, and it is worth specifying in its own
right rather than leaving it as a by-product: the **computation trace**. It is not a log. A log
is operational exhaust with an operational retention; the trace is part of the answer, retained
with the run under the run's own retention class, exported with the tenant (§15.3.11), and read
by people who were not present when it was written.

**What it holds**, per employee, per component, per period:

| Element | Why it is in the trace rather than derivable |
| --- | --- |
| Rule class, resolved version ids and the clauses applied | Derivable only if the resolver is asked the same question with the same decision time — which is precisely what will not be true years later |
| Citations with capture dates | The defence of a figure is the instrument it came from; AC-R6 guarantees the citation exists, the trace is where it is kept next to the figure |
| The inputs used | Distinguishes "the rule changed" from "the input changed" at a glance, which is the first question anyone asks about a differing figure |
| The evaluation context (§15.4.9) | Without it the figure is unreproducible, because the context is part of the function |
| Fixed-point iterates, count and the tolerance that stopped it | The only evidence that convergence happened rather than that a limit was hit (§15.4.10) |
| The rounding applied and where | Rounding is a versioned rule attribute (AC-R4); which version rounded, and once, is checkable only if recorded |
| The output | So the trace stands alone as a record |

**What it must never hold.** Restricted-class values appear as tokens or masked references,
never raw: no Aadhaar number, no biometric material, no plaintext bank account or IFSC. This is
the same rule §17.5 applies to audit payloads, and it is what lets the trace survive the
erasure of the values it points at (§15.6.2).

**Consumers, and one rule that binds all of them.**

| Consumer | Use | Constraint |
| --- | --- | --- |
| The approver at the verification gate | Reconciling the statutory payment to the locked snapshot before payment initiation (§15.5.5) | Reads the trace of the *locked* run, not a fresh computation |
| The CA or bureau under a read-only audit scope | Answering "why is this figure what it is" for a client | Read-only; money-of-record is never writable from the CA console (§15.3.6) |
| An inspection or a dispute | Evidence production | The trace is exported, not recomputed — and replay **supports** evidence production without discharging contractual audit obligations (K-21, §15.6.2) |
| The assistant explaining a payslip line | Natural-language explanation | **Reads the trace; never recomputes.** The edge has no compute path to a statutory figure (§15.2.7, §12.8.1), so an explanation is a rendering of a recorded fact |
| The certification pipeline | Fixture comparison | Compares traces, not just outputs, so a right answer reached through the wrong version is still a failure |

**Write coupling.** The trace is written in the same transaction as the result it explains. A
payroll result without a trace is not a degraded record, it is an unexplainable number, and the
system has no way to produce one.

- **AC-R15 (no result without its trace).** A fault injected between result persistence and
  trace persistence rolls both back; an orphan-result detector run over a full period returns
  zero.
- **AC-R16 (explanation without recomputation).** With the evaluator made unavailable, every
  stored figure can still be explained end to end from its trace — rule versions, clauses,
  citations, context, iterates and rounding. A test that asserts the explanation path issues no
  evaluation call passes.

---

### 15.5 Integration layer

The integration layer is where the system meets an unreliable outside world: government
portals that go down at month-end and admit only attended use, banks with host-to-host
handshakes, a heterogeneous biometric device fleet, and two incumbents doing two jobs —
Tally owns accounting and the statutory artefacts, greytHR owns the HRMS job; Tally payroll
*adoption*, as distinct from capability, is unknown (EV-032; §20 V-02). Principle 7 governs
all of it: **degrade, never fail silently; every integration has an explicit fallback and a
queue.**

<!-- DIAGRAM: architecture-integration-topology -->

#### 15.5.1 Integration classes and contracts

| Integration | Direction | Contract / protocol | Failure mode | Fallback |
| --- | --- | --- | --- | --- |
| **Biometric devices (eSSL, ZKTeco)** | Inbound (device → us) | **ADMS/WDMS push**: terminal HTTP-POSTs punch packets to a tenant-scoped URL. No middleware, no static IP, no port-forwarding — the best-evidenced call in the corpus (§09 [Verified]); bench-tested across the target fleet before GA (§20 V-11). Outbound, the same channel carries template-deletion commands: two-phase, with per-device acknowledgement, a retry queue and a documented exception state for a decommissioned or lost device (§09). | Device offline / firmware quirk / clock drift / deletion unacknowledged | Buffer-and-replay when the device reconnects; an unacknowledged deletion stays in the retry queue until acknowledged or closed by an admin attestation; the legacy port-4370 pull protocol as a last resort for pre-ADMS firmware. Long-tail brands via the paid connector market (~$345 one-time / $588-yr, §09 [Verified]) — do not build in-house for SDK-bound brands. |
| **Tally** | Inbound (import) + outbound (accounting) | Named-source import is **P1**, Tally first, shipping at R2 (§05.5 item 17); every R1 tenant arrives through the P0 Excel/CSV onboarding import with the YTD tie-out validator (§05.5 item 32). Of the two incumbents, Tally holds the accounting and statutory-artefact job (greytHR holds the HRMS job; EV-032), and migration off it is a primary acquisition path (§16.2, §18). | Malformed export / version drift | Guided import with validation and a mapping preview; never a silent partial import. |
| **Banks — salary disbursement** | Outbound | NEFT/host-to-host salary files per bank's format; reconciliation of success/failure per beneficiary. | Beneficiary reject / file reject / bank downtime | Per-beneficiary retry, partial-batch handling, and a reconciliation queue — a bank reject blocks a *disbursement line*, never the pay run. |
| **EPFO (ECR)** | Outbound, **attended** | The 11-field `#~#` ECR return file and the 6-field part-payment file (EV-035, EV-044), uploaded in an interactive, CAPTCHA-gated employer login; upload → validate → return statement → approve → challan with TRRN → pay → receipt, with an approved return never cancellable (EV-036); strict month-wise sequence (EV-038). | Portal down at month-end / validation rejection / skipped month | The *file* is generated and validated locally even if the portal is unreachable; the submission waits in an attended-filing queue with its due date and the cockpit shows "generated, awaiting portal"; a rejection returns the filing to REJECTED with the error file mapped to employee records (§08.8) — the error-file schema is not public, so the mapper is built from the first real rejection captured on a live registration (§20 V-23). |
| **ESIC** | Outbound, **attended** | Contribution template upload + challan. | Portal down / **Nov-2026 regime change unresolved** | Same attended queue; the engine accepts the new ESI effective-date the moment ESIC notifies (§15.4.2). |
| **TRACES / Protean (TDS)** | Outbound, **attended** | Form 138 (ex-24Q) text file (EV-051); the deductor runs the FVU for the period's stack and uploads (EV-052). Form 130 (ex-Form 16) is TRACES-generated only — we prepare its data and distribute it (EV-048). | **Q4 regular and correction formats not released** (EV-046) | Q1–Q3 supported, pinned to the downloaded format artefact rather than Protean's page label, which differs from the workbook's own version (r5/02); Q4 fenced and flagged in the calendar until the format lands. |
| **State PT portals** | Outbound, **attended** | Per-state PT return + payment; cadence varies by state. | Many state portals, most manual | Generate the exact portal-format file or return for attended upload; never claim automated or unattended submission on any statutory portal (§22). |
| **Job boards (Naukri, LinkedIn, foundit, apna, Indeed)** | Outbound (post) + inbound (application sync) | Multi-post from one requisition; application ingest + dedup. **Inbound-only** — Info Edge publishes no path for a third-party ATS to search Resdex and markets in-ATS Resdex search as exclusive to its own ATS (§10; r2/08). | API limits / no published partner API (Naukri) | "Bring your own job-board contract"; **scraping is forbidden** in architecture and sales collateral (§10 [Verified] legal exposure). LinkedIn partner integration done properly and early. |
| **Accounting / HRIS migration** | Inbound | Importers from Zoho Payroll, Kredily, Frappe — **acquisition infrastructure, not integrations** (§18). | Mid-year cutover complexity | Migration is a first-class product surface (§18): opening balances, YTD earnings, TDS-already-deducted, previous-employer income, UAN/IP continuity, leave/gratuity continuity. |

#### 15.5.2 The device compatibility matrix as an architectural artefact

Device integration effort is currently **unsized** — the "85–98% success" figure was
retracted marketing (§09 [Killed]) and needs a hardware spike. Architecturally, the response
is to ship a **public, model-level device compatibility matrix and a self-serve verification
tool** (§09 highest-leverage cheap artefact): a tenant points a device at a test endpoint and
sees whether its punches arrive and parse, *before* a sales call. This turns an unsized risk
into a self-service check and answers a deal-gating question that, as of September 2026, we
are not aware of any incumbent answering publicly.

#### 15.5.3 Idempotency and reconciliation as first-class

Every outbound integration is **idempotent and reconciled**: a resubmitted ECR or salary
file cannot double-file or double-pay — EPFO permits multiple challans per wage month, so the
guard against paying twice for the same employee is ours (EV-036); every submission has a
client-side idempotency key and
a reconciliation record that pairs "what we sent" with "what the portal/bank acknowledged."
This is the same discipline the MCP write tools require (§12: idempotent, audited,
approval-gated) — one mechanism, two consumers.

#### 15.5.4 The compliance calendar is scheduler data, not a static list

Because the filing is the unit of delivery, the due-date calendar is a first-class,
effective-dated dataset the scheduler (§15.2.6) drives — it clusters the month-end
concurrency spike (§15.3.5) and it is the surface the CA console renders per client
(§15.2.2). The recurring statutory cadence, as of September 2026 (each entry a rule datum
subject to the certification pipeline, not a hardcoded constant):

| Filing | Cadence | Statutory due date | Source cue |
| --- | --- | --- | --- |
| **EPF ECR + challan** | Monthly | Within 15 days of the close of the month | EPF Scheme 2026 (G.S.R. 525(E)), corroborated on EPFO's EDLI page (r1/06) |
| **ESI contribution + challan** | Monthly | Within 15 days of the last day of the month | Regulation 31, ESI (General) Regulations 1950 (r3/02); esic.gov.in (r1/06) — a saved instrument, kept alive by CoSS s.164(2)(b) to on or about 21 Nov 2026; its successor is unresolved, so the date is re-certified the moment ESIC notifies (§20 V-08) |
| **PT return + payment** | Per-state (monthly / half-yearly / annual; Maharashtra reassigns filing frequency per registration each year, r1/06) | Varies by state | Respective State PT Acts — [Hypothesis] on every per-state date; *kill:* replace with the gazette-verified all-state dataset (§20 V-09) |
| **LWF deduction + remittance** | Per-state | Karnataka: calendar year, due 15 January — the one verified periodicity (r2/10); all others unverified | State LWF Acts — [Hypothesis] except Karnataka; same kill as PT |
| **TDS payment (challan)** | Monthly | 7th of the following month; TDS deducted in March by 30 April — values carried from the 1962 Rules (r3/02), **[Hypothesis]** for Tax Year 2026-27 onward | Rule 218, Income-tax Rules 2026 prescribes the dates; its text is not yet read (r5/02; §06.13; §20 V-20) |
| **TDS return (Form 138, ex-24Q)** | Quarterly | Q1 31 Jul · Q2 31 Oct · Q3 31 Jan · Q4 31 May of the year following the Tax Year | Rule 219, Income-tax Rules 2026 (EV-049) |
| **Form 130 (ex-Form 16)** — TRACES-generated; we prepare data and distribute (EV-048) | Annual | 15 June of the year following the Tax Year | Rule 215, Income-tax Rules 2026, s.395(4) (r5/02) |
| **Gratuity / LWF / statutory registers refresh** | Event-/period-driven | On separation / period close; register retention per EV-054 (central sphere; state periods configurable) | Code on Social Security; Wages, OSH and SS Central Rules 2026 (EV-053, EV-054) |

The scheduler pre-provisions capacity around the 7th (carried, pending §20 V-20) and 15th
due-date clusters — which days actually peak is measured, not assumed (§20) — and raises a
filing-at-risk alert at the tenant-set lead time `calendar.alert_lead_days` before each due
date (the same parameter as §03 AC-M06.3, not a second one). A
per-state PT/LWF date that the certified dataset does not yet cover surfaces as a *gap in the
calendar*, consistent with AC-R5 — never a silently-missing obligation.

#### 15.5.5 The attended-filing queue as an architectural component

Because no statutory surface is an API (EV-030, K-13), the hand-off from a generated artefact
to a portal is a *queue with a human in it*, and a queue with a human in it is a component
with state, leases, idempotency and failure semantics — not a spreadsheet of tasks. §22 owns
the per-portal runbooks, who acts and under whose credentials; this owns the machinery.

<!-- DIAGRAM: architecture-attended-filing-queue -->

**Job identity.** A filing job's identity is the tuple
`(registration, filing_type, period, return_type)` — for the ECR, `return_type` is Regular,
Supplementary or Revised (EV-037). Its **idempotency key** is derived from that tuple plus the
content hash of the artefact being submitted. Two consequences, and both are the point of the
design:

- **A retry of the same artefact reuses the key**, so a portal timeout followed by a resend
  cannot become two submissions. EPFO permits multiple challans per wage month (EV-036), which
  means the portal will not stop us from paying twice — the guard is ours (§15.5.3).
- **A corrected artefact gets a new key**, because its content hash changed. A Revised return
  is therefore a different job from the Regular it corrects, linked to it, and never a mutation
  of it — the same "diff, never a mutation" rule the filing state machine enforces (§08.8).

**State table.** Event, guard, side effect, and who may trigger — the diagram above is the
illustration, this is the contract.

| From → To | Event | Guard | Side effect | Who may trigger |
| --- | --- | --- | --- | --- |
| ARTEFACT_READY → QUEUED | Job enqueued | Artefact passed local validation against the portal's own rules (EV-040 blocks versus flags; the period's FVU stack, EV-052) | Due date attached from the compliance calendar (§15.5.4) | Filing orchestrator |
| QUEUED → BLOCKED_BY_LEDGER | Ledger interlock | An earlier month for this registration is not FILED | Job held; the ledger surfaces the blocking month | System, automatically |
| BLOCKED_BY_LEDGER → QUEUED | Earlier month closes | The blocking month reached FILED | Job released in due-date order | System |
| QUEUED → CLAIMED | Operator claims | Operator holds authority to act for this employer (§22) | Lease starts, `queue.operator_lease_minutes` | Named operator |
| CLAIMED → QUEUED | Lease expiry or release | — | Lease released; no portal session was opened | Operator or system |
| CLAIMED → IN_SESSION | Session opens | Credential checked out from the vault; MFA/CAPTCHA handled by the operator (§22) | Session recorded with operator, employer and authority reference | Named operator |
| IN_SESSION → AWAITING_PORTAL | Portal unreachable or refusing | — | Backoff per `queue.portal_backoff_schedule`; artefact unchanged; **same idempotency key** | System |
| AWAITING_PORTAL → QUEUED | Backoff elapses | The artefact is unchanged, so the job re-enters the queue rather than being regenerated | Lease released; the **same** idempotency key is carried forward, which is what makes a resumed attempt a retry and not a second submission | System |
| IN_SESSION → AWAITING_APPROVAL | Return statement obtained | The return statement reconciles to the locked snapshot | The **verification gate** is presented to the approver | Operator |
| AWAITING_APPROVAL → IN_SESSION | Approver confirms | Named human approval recorded | Payment may be initiated | Approver (never the operator alone, never an AI) |
| AWAITING_APPROVAL → WITHDRAWN | Approver refuses | Payment **not** initiated | Job withdrawn before the irreversible step | Approver |
| WITHDRAWN → ARTEFACT_READY | Correction | A corrected artefact is generated | New content hash → new idempotency key | Filing orchestrator |
| IN_SESSION → ACKNOWLEDGED | Receipt captured | A portal acknowledgement exists — nothing else advances the state | Artefact, challan/TRRN and receipt archived under their retention class | Operator, with the captured artefact |
| IN_SESSION → REJECTED_AT_PORTAL | Rejection captured | — | Error file stored; mapped to employee records where the schema is known (§20 V-23) | System, on the captured rejection |
| REJECTED_AT_PORTAL → ARTEFACT_READY | Errors corrected | Every mapped error is resolved, or an unmapped error file is dispositioned by a named operator (§20 V-23) — a rejection is never cleared by re-sending the same bytes | A corrected artefact is generated; its content hash changes, so a **new** idempotency key is minted and the rejected attempt stays in the audit chain, linked | Filing orchestrator |
| ACKNOWLEDGED → closed | Ledger month closes | — | Filing state machine advances (§08.8); the ledger's month sequence stays unbroken (EV-038) | System |

**Why the verification gate sits exactly there.** An approved ECR return can never be
cancelled, and a Revised return requires that **no payment has been initiated** (EV-036,
EV-037). Everything before payment initiation is correctable; nothing after it is correctable
downward. The gate is therefore placed at the last reversible moment rather than at the
intuitive one (before upload), and the queue state `AWAITING_APPROVAL` exists solely to make
that placement structural rather than procedural.

**Worked example — one wage month, one registration, three jobs.** An establishment files its
Regular ECR; two members were excluded because their UAN linkage was unresolved (§15.3.7).

1. **Job 1 — Regular.** Key derived from `(EPF establishment code, ECR, 2026-07, Regular)` plus
   the artefact hash. Reaches ACKNOWLEDGED; the ledger records 2026-07 as filed.
2. **Job 2 — Supplementary.** Once the two members resolve, a Supplementary return is
   generated. It is permitted because a Regular for the month is approved and because it
   contains only members absent from every prior return for that month (EV-037) — the guard is
   checked by the generator before the job is enqueued, not discovered at the portal.
3. **Job 3 — a downward correction that does not exist.** A third member was over-stated, and
   payment for the Regular has already been initiated. No Revised return is available
   (EV-037), and the research establishes no recovery route for an over-remittance. The job is
   never created; instead an **operator exception** is raised, linked to the original filing in
   the audit chain (§15.3.7), and the open question is routed to §20's validation plan rather
   than answered here.

- **AC-T23 (no double submission).** Submitting the identical artefact twice, whether by
  operator retry or by system backoff, produces one portal submission and one challan; a test
  that replays a full session including a timeout asserts a single acknowledgement.
- **AC-T24 (the ledger interlock holds).** A job for month M cannot leave QUEUED while an
  earlier month for the same registration is unfiled; the blocking month is named in the
  operator's view. This is the queue's enforcement of the unbroken per-establishment ledger
  (Part E-10, EV-038).
- **AC-T25 (no payment without a named approver).** No transition into payment initiation is
  possible from any actor other than a recorded approver; an attempt by the operator identity,
  or by any AI component, is refused and raised as a security event.

---

### 15.6 Event and audit backbone

The audit backbone is not observability plumbing added at the end; per principle 5 **it is
the write path** for every state-changing action. This is driven by three forces: statutory
proof (a filing must be defensible years later), CERT-In log retention, and the AI trust
boundary (every AI-assisted action must be attributable).

#### 15.6.1 What emits events

Every state change emits an immutable event carrying `tenant_id`, `actor` (human, machine, or
AI-agent, with the CA dual-identity where applicable), `reason`, `rule_versions_applied`
(where statutory), `request_id`, and a hash chain to the prior event for tamper-evidence:

- **Filing lifecycle** — every transition of the §08.8 filing state machine (FR-PAY-711),
  including rejected, revised, supplementary and payment-initiated, plus each attended
  submission step with the acting operator and the employer's authority-to-act reference
  (§22). This is the primary event stream, because the filing is the unit of delivery.
- **Rule changes** — every rule-version promotion, with citation and the certification result.
- **Approvals and human-in-loop gates** — every statutory action a human confirmed, and every
  AI proposal a human accepted or rejected, with the named confirmer (§12).
- **AI calls** — the per-employee AI disclosure record written at every call site that
  touches an employee's data (§12.8.3).
- **Pay-run lifecycle** — every transition of the §08.4 month machine, from OPEN to FILED,
  including the verification gate before PAYMENT_INITIATED.
- **Access and identity** — grants, CA cross-tenant access, MCP tool invocations, consent
  captured and withdrawn.

#### 15.6.2 Event sourcing where correctness demands replay

The **filing orchestrator and payroll engine are event-sourced**: their current state is a
fold over their event history, so any pay run or filing can be *replayed* to reconstruct
exactly how a number was reached, against which rule versions, by whom. This is what makes
"retrospectively recomputable with an audit trail" (§08 [Verified]) a structural property
rather than a reporting feature. Services that do not compute statutory truth (notifications,
attendance capture) use ordinary state with an audit log — event sourcing is applied where it
earns its complexity, not everywhere.

**Replay is scoped by entity class, not universal.** **[Reversed]** Earlier drafts implied
every attribute is bitemporal and every run replays forever. Erasure requirements make that
false — the Aadhaar retention ceiling tied to the consented purpose (reg 6(5), EV-068),
template destruction (§09), consent withdrawal, and DPDP erasure once in force (EV-058).
Bitemporal, never-forget classes are rules, salary structures, assignments and statutory
attributes. Erasable classes are raw punches, rendered documents, biometric templates (in
their own keyspace) and consent artefacts (§14). Erasable records are encrypted under a
per-subject key, so erasure is crypto-shredding: the key is destroyed, the ciphertext and the
hash chain (§15.6.1) stay verifiable, and a tombstone event records the class, the subject
reference, the actor, the reason and the time. What replay returns after an erasure:

- A pay run replays from its **input snapshot** (paid days, OT hours, attendance totals), not
  from raw punches, so its figures reproduce after the punches are shredded and the
  snapshot's provenance link resolves to the tombstone. The per-day IN/OUT record Form IX
  requires (EV-055) is a derived statutory record held under its register retention class
  (EV-054), not an erasable punch.
- A rendered document is re-rendered from retained bitemporal data while its retention class
  still requires the content; otherwise replay returns the tombstone, never a fabricated copy.
- Records in a bitemporal class are erased only when §14.7's deletion engine clears them
  against their retention class; replay then returns structure, rule versions and aggregates
  with the subject's fields marked ERASED, and never re-derives an erased value.

**Replay supports evidence production; it does not discharge audit obligations.**
**[Reversed]** Earlier drafts said the reproducibility guarantee satisfies RBI's right to
audit by construction. Deterministic replay supports evidence production for RBI inspections;
it does not discharge the contractual audit, access and inspection obligations, which remain
contractual and reach sub-contractors (EV-087; §23).

#### 15.6.3 CERT-In and DPDP obligations baked in

The CERT-In directions bind **from day one, not at enterprise scale** (§17 [Verified]); the
DPDP rows are built ahead of their commencement on or about 13 May 2027 (EV-058):

| Obligation | Architectural consequence | Source |
| --- | --- | --- |
| **6-hour incident reporting** for every body corporate | The event backbone feeds the six-hour incident pipeline below; a named CERT-In point of contact (direction (iii), r4/02) before the first paying customer. | Source: CERT-In Directions under s.70B(6) IT Act, No. 20(3)/2022-CERT-In, 28 Apr 2022, direction (ii) (EV-062) [Verified] |
| **180 days of ICT logs retained within Indian jurisdiction** | Log storage is residency-pinned to India regardless of the tenant's inference residency choice; retention is enforced, not best-effort. This includes LLM prompt and completion logs (as tokenised), attribution and disclosure records — that these count as ICT-system logs is well-grounded inference, not stated text, so counsel confirms (§23 CR-23) and we build as if they do (§12.8.3). No log stream may land only in a non-India observability region. | Source: CERT-In Directions, 28 Apr 2022, direction (iv) (EV-062; r4/02) [Verified] |
| **Clock sync to NIC/NPL NTP** | All event timestamps synced to NIC/NPL NTP servers — non-trivial for distributed services and for reconciling device clock drift against server time. | Source: CERT-In Directions, 28 Apr 2022 (EV-062) [Verified] |
| **Attacks on AI/ML systems are a reportable incident class** | Three reportable surfaces feed one pipeline: attendance terminals as IoT devices (Annexure I item (xiii)), the cloud layer (item (xviii)) and the AI edge (item (xx)). The AI orchestrator, egress gateway and router are instrumented from v1 for the four AI/ML sub-classes — prompt injection, poisoning, extraction and inference-pipeline access (§12.8.4). | Source: CERT-In Directions, Annexure I (EV-062) [Verified] |
| **Retention and erasure** | Retention is per retention class and enforced by the backbone: EV-054's central-sphere register figures where they apply, state-sphere periods as configuration pending counsel, and neither an immediate purge nor a fixed one-year suppression hard-coded (§14.7, §23). Erasure uses the class-scoped mechanism of §15.6.2 and honours statutory-retention overrides. DPDP's erasure duty and its retention rules bind only from on or about 13 May 2027; whether r.8(3) sets a universal one-year floor is a counsel question (Part D-9; §23 CR-09). | Source: EV-054, EV-058; DPDP s.8(7), r.8(3) (not in force) |
| **Detection-capable access logging** | Access to personal data is logged so unauthorised access can be *detected*, not merely recorded — a DPDP r.6(1)(c) requirement once in force, built now (§17). | Source: EV-064 (not in force) |

**The six-hour incident pipeline.** A manual process cannot meet six hours from noticing an
incident, so the pipeline is architecture; §17.6 owns the reporting target and runbook, and
§12.8.4 the AI/ML sub-classes.

1. *Detect* — signals from the event backbone, the gateway (tenant-context violations,
   AC-T2), the egress gateway (blocked identifiers, provider-key use outside it), the device
   receiver, cloud-layer alerts, and the AI layer's four AI/ML sub-classes.
2. *Open* — an incident candidate is created automatically with its evidence attached from
   India-resident logs and NTP-synced timestamps, and the on-call owner is paged.
3. *Classify* — the named incident owner decides reportability under §17.6's runbook; no
   detector and no AI component decides it.
4. *Report* — the CERT-In report fields are pre-staged from system state so the named point
   of contact can file inside the six-hour window.
5. *Fan out* — the same incident drives customer notices and, once DPDP commences, its
   separate breach track to the Board and every affected data principal (EV-063, not in
   force today).

#### 15.6.4 Cost attribution rides the event stream

Because every request carries `cost_context` (§15.2.3), every AI action emits an event and
every attended-filing step is an event (§15.6.1), cost attribution across the four COGS lines
(EV-088) is a *consumer of the event stream*, not a parallel accounting system. **[Reversed]**
Earlier drafts treated inference as the margin question; it is the *smallest* of the four
lines. The dominant line is supervised filing, which scales per registration × state × filing
type while revenue scales per employee (EV-088) — so the stream meters supervised-filing
minutes per registration per filing cycle, the input to the automation target and the
registration cap (§13, §18, §22). Inference attribution per tenant/user/agent/model still
feeds gateway budget enforcement (§15.3.5) and the router's cost ceilings; the 52.7×
model-choice spread is a ratio that survives FX (EV-089), while per-employee inference
absolutes remain placeholders (§13). Attribution must be trustworthy from the first paying
customer.

#### 15.6.5 Event delivery semantics and consumer contracts

§17.5 (NFR-SEC-401) owns what an audit record must *contain* and the immutability guarantee.
This owns how events **move**: what is routed on, what ordering is promised, what a consumer
must tolerate, and how the envelope evolves without rewriting history. These are the
properties that decide whether a projection can be trusted, and they are the ones usually left
implicit until two consumers disagree about the same month.

**Routing fields on the envelope.** These are distinct from the audit payload; they exist so
the backbone can deliver, order, deduplicate and place the event, and a consumer reads them
without parsing the payload at all.

| Field | Purpose | Note |
| --- | --- | --- |
| `event_id` | Identity and deduplication | Stable across redelivery |
| `prev_hash` | Tamper-evidence chain (§15.6.1) | Chain is per tenant stream, so one tenant's purge cannot break another's chain |
| `tenant_id` | Partition and isolation | Re-derived by async consumers from here, never from ambient state (§15.3.3) |
| `stream` + `sequence` | Ordering within a stream | Monotonic per stream; gaps are detectable, which is the point |
| `partition_key` | The aggregate the event belongs to — pay run, filing, employee, device | Ordering is promised *within* a partition key, not globally |
| `schema_version` | Envelope and payload contract version | Additive evolution only within a major version |
| `occurred_at` / `recorded_at` | NTP-synced event time and write time (§15.6.3) | Both, because device and portal events arrive late and the difference is evidence |
| `residency_zone` | Where the event may be stored and read | An event may never be routed to a store outside its tenant's profile (AC-T4) |

**Delivery guarantees, stated as what a consumer must tolerate.**

- **At-least-once delivery, never exactly-once.** Exactly-once across a network is a claim, not
  a property; every consumer is therefore idempotent on `event_id`. A consumer that cannot be
  made idempotent is not admitted to the backbone.
- **Ordering within a partition key, not across the stream.** Two events about the same filing
  arrive in order; an event about a filing and one about a device do not. Consumers that need
  a cross-aggregate order derive it from `occurred_at` and say so explicitly.
- **Gap detection is mandatory.** A consumer observing a `sequence` gap that does not close
  within `events.consumer_lag_alert_seconds` (owner platform engineering, routed to §20) raises
  an operational alert rather than proceeding — a silently-skipped filing event is how a filing
  ledger acquires a hole (EV-038).
- **Poison messages dead-letter, they never block the stream and never disappear.** A
  dead-lettered event stays in the tenant's stream with a dead-letter record referencing it; a
  projection rebuilt later includes it once the consumer is fixed.

**Consumer contracts.**

| Consumer | Streams read | Ordering need | On failure | Rebuildable from the stream? |
| --- | --- | --- | --- | --- |
| Payroll engine / filing orchestrator state | Own | Strict per aggregate | Refuse the write (§15.2.8) | Yes — these are the event-sourced components (§15.6.2) |
| CA-org calendar projection (§15.3.9) | Filing events of granted tenants, metadata fields only | Per filing | Dead-letter; projection shows the client as stale rather than wrong | Yes, and rebuilt rather than restored (§15.3.11) |
| Cost/metering (§15.6.4) | AI-call, filing-step, notification events | None | Dead-letter and alert; attribution gaps are visible, never inferred | Yes |
| Incident pipeline (§15.6.6) | Security events, gateway violations, egress blocks, device receiver, AI edge | By `occurred_at` | Escalate — a failure here *is* an incident | n/a |
| Notification service | Approval and filing events | Per recipient | Retry with backoff; never re-send on redelivery, because notifications are idempotent on `event_id` | No — notifications are not replayed on a rebuild |
| Tenant export builder (§15.3.11) | All of one tenant's streams | Strict per aggregate | Abort the bundle; a partial export is worse than none | Yes |

**Schema evolution — three rules, no exceptions.** History is evidence; rewriting it destroys
the property the backbone exists for.

1. **Additive within a major version.** New optional fields only. Consumers ignore unknown
   fields by contract, so an older consumer keeps working.
2. **A breaking change is a new stream version, written alongside.** Both are readable; nothing
   historical is transformed in place.
3. **No back-fill of an existing event, ever** — not to correct a value, not to add a field.
   A correction is a new event that references the old one, which is the same rule the filing
   correction path follows (§08.8) and the same rule the rules engine follows for rule
   versions (§15.4.3). The system has exactly one way of expressing "that was wrong": a later
   record that says so.

- **AC-T26 (idempotent consumers).** Replaying an arbitrary window of events into every
  consumer produces byte-identical projections and no duplicate side effects — no second
  notification, no double-counted cost line, no duplicated calendar row.
- **AC-T27 (a rebuilt projection equals the live one).** The CA-org projection rebuilt from
  scratch matches the live projection exactly; a mismatch fails the build, because a projection
  that can drift from its source cannot be used to decide what has been filed.
- **AC-T28 (no historical rewrite).** A test that attempts to update or delete an event, or to
  back-fill a field on a historical event, fails at the store; chain verification over the
  affected range still passes afterwards.

#### 15.6.6 Incident detection-to-report mechanics

§17.6 owns the reporting obligation and the runbook, and §12.8.4 the four AI/ML sub-classes.
What architecture owns is the part that cannot be improvised inside six hours: **detection
that reaches a named human fast enough, and evidence that is already assembled when they get
there.** The obligation is CERT-In's — report within six hours of becoming aware, maintain 180
days of ICT logs within Indian jurisdiction, sync clocks to NIC/NPL NTP (EV-062) — and it
binds from the first customer, not at enterprise scale.

<!-- DIAGRAM: architecture-incident-clock -->

**The clock starts at awareness, not at tooling.** This is the single most consequential
design statement in the pipeline. "Awareness" can arrive by a detector, by a customer email,
by a provider's status page or by an employee noticing something — so the pipeline's entry
point accepts a manually-opened candidate with the same standing as an automatic one, and the
`occurred_at` of the awareness is recorded separately from the candidate's `recorded_at`
(§15.6.5). A pipeline that can only be entered by a detector systematically under-reports.

**Detector catalogue.** Each row names the source, the signal, and the candidate class it
opens. The classes align with CERT-In's Annexure I surfaces that reach this product: IoT
devices (item xiii), cloud systems (item xviii) and attacks on AI/ML systems (item xx)
(EV-062).

| Detector | Source | Signal | Candidate class |
| --- | --- | --- | --- |
| Tenant-context violation | API gateway | A request whose body tenant differs from its signed context (AC-T2) | Cloud / access |
| Partition probe failure | Data tier | A query without its tenant predicate returning rows (AC-T1 inverted) | Cloud / isolation — the most serious class in a pooled design |
| Provider-credential use outside Z4 | Network policy (§15.2.7) | Egress to a provider from a non-egress workload | Cloud / AI |
| Blocked-identifier attempt | Redaction egress gateway | A default-deny identifier class reaching the chokepoint (§12.8.5) | AI/ML |
| AI/ML sub-class detectors | AI orchestrator, router, egress gateway | Prompt injection, poisoning, extraction, inference-pipeline access (§12.8.4) | AI/ML |
| Device receiver anomalies | ADMS/WDMS receiver | Unexpected packet source, implausible clock drift, unacknowledged deletion backlog | IoT |
| Chain verification failure | Audit backbone | A hash chain that does not verify (§17.5) | Integrity — treated as tampering until shown otherwise |
| Log residency violation | Log plane | An ICT-log stream landing outside India, or an expiry below the floor (AC-T10) | Compliance / cloud |
| Manual entry | Any human | A report from a customer, an employee, an operator or a provider | As classified by the owner |

**State table for the pipeline.** `Event · guard · side effect · who may trigger`, matching the
diagram above.

| From → To | Event | Guard | Side effect | Who may trigger |
| --- | --- | --- | --- | --- |
| — → SIGNAL | Detector fires or a human reports | — | Awareness time recorded | Detector or any human |
| SIGNAL → CANDIDATE | Candidate opened | — | Evidence attached from India-resident logs; on-call paged within `incident.page_target_minutes` (owner security, routed to §20) | System, automatically |
| CANDIDATE → DISMISSED | False positive | A named owner records the reason | Retained as a record — dismissals are evidence about detector quality | Named incident owner |
| CANDIDATE → TRIAGED | Confirmed as a real event | Named owner sets a class | Class recorded | Named incident owner |
| TRIAGED → REPORTABLE | Reportability decision | Decided under §17.6's runbook | Report drafting begins | **Named human only** — no detector, no AI component |
| TRIAGED → NOT_REPORTABLE | Reportability decision | Reasoning and evidence recorded | Closure permitted | Named human only |
| REPORTABLE → REPORT_STAGED | Fields pre-staged | Evidence complete enough to file | Report assembled from system state | System |
| REPORT_STAGED → REPORTED | Filed | Inside the six-hour window from awareness | Filing recorded with the point of contact named (direction (iii), r4/02) | Named CERT-In point of contact |
| REPORTED → FANNED_OUT | Downstream notices | — | Customer notices; the separate DPDP breach track opens **only once DPDP commences** (EV-063, not in force today) | Incident owner |
| FANNED_OUT / NOT_REPORTABLE → CLOSED | Closure | Remediation complete and reasoning recorded | Post-incident record written | Incident owner |

**What "evidence pre-staged" means concretely.** The point of pre-staging is that a human
inside the window spends their time deciding, not querying. From system state alone the
pipeline assembles: the awareness timestamp and the detector that fired, NTP-synced
(§15.6.3); the affected tenants, derived from the `tenant_id` on the events involved; the time
window bounded by the first and last related event; which data classes were *reachable* by the
path involved, taken from the data-classification map (§14.5) rather than from an
investigator's recollection; whether any Aadhaar token store, biometric keyspace or credential
vault entry was in that path (§14.4.15, §22); which log streams hold the relevant lines and
that they are India-resident (§15.7.5); and the current state of the hash chain over the
affected range.

**Worked timeline (illustrative, against the six-hour obligation).** A blocked-identifier
detector fires when a default-deny identifier class reaches the redaction chokepoint from an
unexpected call site.

| Elapsed from awareness | What happens | Who |
| --- | --- | --- |
| T+0 | Egress gateway blocks the call and emits a security event; awareness time recorded | System |
| T+0 to page target | Candidate opened with evidence attached; on-call paged | System |
| Early | Owner confirms it is real, classes it AI/ML, and scopes it: which tenant, which call site, whether anything was transmitted before the block | Named owner |
| Middle | Reportability decided under §17.6's runbook; the decision and its reasoning are recorded whichever way it goes | Named owner |
| Later | Report staged from system state; the named point of contact reviews and files | Point of contact |
| Before T+6h | Filed | Point of contact |
| After | Customer notices; the DPDP track opens only once DPDP commences (EV-063); post-incident record written; the detector's coverage is reviewed | Incident owner |

The window is the constraint the design is built against; the elapsed column is deliberately
relative, because the internal budgets that divide six hours between paging, triage and
staging are an operational target for §17.6 and §20, not a figure this section invents.

**Negative cases.**

- **No automatic reportability.** A detector may open a candidate and may never mark one
  reportable. Auto-reporting would produce both over-reporting and, on a detector bug,
  confident under-reporting.
- **No AI in the decision.** The AI edge may summarise evidence for the owner; it may not set
  a class, decide reportability or draft the filed text unreviewed. Any such output is a draft
  with a named human confirmer, exactly as elsewhere (§12.5).
- **No evidence assembled from outside India.** Every stream feeding a candidate is
  India-resident (§15.7.5); a pipeline that had to reach a non-India observability store for
  its evidence would breach the log-residency requirement in the act of investigating.
- **No silent dismissal.** A dismissal is a record with a named owner and a reason, because
  dismissal rates are how detector quality is measured.

- **AC-T29 (awareness-to-page).** An injected detector signal produces a candidate with its
  evidence bundle attached and a paged on-call owner within `incident.page_target_minutes`,
  measured end to end in a drill, not asserted from component latencies.
- **AC-T30 (only humans classify).** No API path exists by which a detector, a scheduled job
  or an AI component can set REPORTABLE or NOT_REPORTABLE; an attempt is refused and is itself
  a security event.
- **AC-T31 (evidence completeness).** For each detector class, a drill asserts the pre-staged
  bundle contains every field §17.6's report needs from system state, so that the human
  contributes judgement rather than data collection. Missing fields are a pipeline defect
  logged against the detector.
- **AC-T32 (dual clocks do not merge).** Once DPDP commences, the CERT-In six-hour track and
  the DPDP breach track are recorded as two clocks on one incident, each with its own state;
  closing one never closes the other (EV-062, EV-063).

#### 15.6.7 Time, clocks and ordering

Three of this product's obligations are stated in units of time measured across machines we do
not all own: a six-hour reporting clock (EV-062), 180 days of log retention (EV-062), and a
statutory attendance record requiring **per-day IN and OUT timestamps** (Form IX, EV-055). A
system that is casual about clocks cannot satisfy any of them, and the failures are silent.
The time model is therefore stated once, here, and the components inherit it.

| Concern | Rule | Consequence |
| --- | --- | --- |
| **Authority** | Every service clock is synced to NIC/NPL NTP (EV-062) | Cross-service ordering is meaningful; drift is measurable rather than assumed |
| **Storage** | Instants are stored as unambiguous absolute times; the IST rendering is derived at the surface, and §17.5 records both on audit events | Nothing is stored in a form whose meaning depends on the reader's location |
| **Device time versus receipt time** | A punch packet carries the terminal's own timestamp; the receiver records its receipt time and the measured drift (§15.5.1) | Both survive. Correcting drift without keeping the raw device value would destroy the evidence that a correction was needed |
| **Which timestamp is the statutory one** | The corrected, NTP-referenced instant is the one that becomes the Form IX IN/OUT entry; the raw device value stays as provenance | Form IX is a derived statutory record under its register retention class, not a raw punch (§15.6.2) |
| **Period boundaries** | A wage month is a tenant calendar concept resolved against the establishment's configuration, not a by-product of a timezone conversion | A punch late on the last day of a month lands in that month, not the next one, regardless of where the service that received it was running |
| **Late arrival** | Data that arrives after INPUTS_CLOSED does not mutate the frozen snapshot | It flows to the next period, or to a correction run expressed as a diff (§15.8.2 step 4). The snapshot is what makes a pay run replayable after its raw inputs are erased (§15.6.2) |
| **External acknowledgements** | A portal's or bank's timestamp is recorded as *theirs*, alongside ours | Our clock never overrides an acknowledgement's own time. When a due date is in dispute, the portal's record is the one that matters and ours is corroboration |
| **Ordering** | `occurred_at` for reasoning about the world, `stream` + `sequence` for reasoning about our own writes (§15.6.5) | The two are never conflated: a device that was offline for a day produces events with an old `occurred_at` and a current `sequence`, and both readings are correct |

**The case that makes this concrete.** A terminal's clock has drifted, it is offline over a
month boundary, and it replays its buffer on reconnect. The buffered punches carry device
times in the previous month; the receipt time is in the current one; the pay run for the
previous month has already reached LOCKED. The system must: correct the instants against
measured drift, place them in the month their corrected device time belongs to, find that
month's snapshot frozen, and route the difference as a correction run rather than a mutation —
while the Form IX grid for the previous month gains the missing IN/OUT entries under its own
register retention class, because a per-day record with a hole is non-compliant whatever the
pay run did (EV-055). Each of those four behaviours is in a different component; none of them
is optional; and all four are consequences of the rules in the table rather than of a decision
taken at the moment of the outage.

- **AC-T37 (drift is corrected and retained).** For a device with injected clock drift, the
  stored record contains the raw device timestamp, the receipt time, the measured drift and
  the corrected instant; a test that finds only the corrected instant fails.
- **AC-T38 (period placement is not timezone-dependent).** A punch at the last minute of a
  wage month, received by a service running in any region, lands in that wage month; the same
  assertion holds for a buffered punch replayed days later.

---

### 15.7 Deployment, residency and provider abstraction

Residency is the segment-specific procurement gate that cannot be deferred (§17 synthesis:
*a segment-specific gate, not a general-market differentiator*). The architecture treats it
as configuration, delivered by two abstractions that are one piece of work serving two
constraints (§17 [Verified]).

#### 15.7.1 Two residency guarantees, tracked separately

Buyers ask about both and they are different (§17 [Verified]):

- **Data-at-rest residency** — where tenant data physically lives. India-only for regulated
  tenants; the default plane is India regardless. This is a product choice and a
  regulated-customer requirement, not a general Indian localisation mandate: the live legal
  constraints are CERT-In log residency (EV-062), SPDI r.7 for sensitive data (EV-060) and
  the sectoral overlays (EV-085–087); Aadhaar hosting outside India is a counsel question
  (Part D-15; §23 CR-15).
- **In-country inference residency** — where AI inference executes. A different guarantee from
  data-at-rest, and provider-dependent.

The tenant's **residency profile** captures both independently and the gateway + model router
enforce them per request.

#### 15.7.2 The provider matrix (must be maintained, not memorised)

**[Verified]** — Residency is a per-provider matrix, and the specific cells below are as
captured in round two (r2/03, Sep 2026; vendor documentation read, no provider executed)
and must be re-verified per procurement (§13; §20 V-13):

| Provider | Data-at-rest India | In-country inference India |
| --- | --- | --- |
| OpenAI | Yes (India data-at-rest) | Via Bedrock for in-country inference |
| Anthropic | No | No — US-only immutable workspace geo |
| Vertex (Google) | India region available | India region available |
| Sarvam | **Unverified** — must not be relied on until verified; prices natively in INR (FX hedge, §13) | Unverified |

Requirement (§13 [Verified]): **≥3 interchangeable backends with residency selectable per
tenant.** The seam is built for that from v1; one backend is wired at R1 and the full matrix
reaches GA later (§05.5 items 15 and 29). The model router (§15.2.5) is where this is
enforced — a tenant pinned to India-only inference simply cannot be routed to an
out-of-region backend, and the router re-points task classes without a deploy when a
provider changes price (Gemini 3.x Flash doubling on 1 Jan 2027 is the *base case*, EV-089;
§13) or residency posture.

#### 15.7.3 Deployment topology

| Topology | Who | Notes |
| --- | --- | --- |
| **Shared multi-tenant plane, India region** | Default — the whole beachhead | Pool-with-partition (§15.3). Serverless-first: serverless beats a list-priced dedicated H100 by roughly 74× at realistic scale — a derived, low-confidence figure whose throughput input is unsourced (r2/03) — and the direction, not the multiple, is what the decision rests on (§20 non-goal: never self-host *for cost*). |
| **Dedicated data plane, India region** | Named regulated accounts | Silo escape hatch; same code, isolated data + inference. |
| **Self-hosted / customer VPC** | Named regulated accounts only, **as a priced compliance SKU** | Never for cost (§20). A bank for which the arrangement is material (RBI audit and inspection rights, EV-087), a SEBI entity (EV-085) or a buyer RFP such as SBI's can force this contractually; IRDAI's localisation reaches policy records only (EV-086). |

#### 15.7.4 The ISO 27001 seasoning clock is an architecture input

Certification carries a **one-year seasoning clock** on top of roughly 3–6 months'
acquisition — Indian Bank's RFP requires a qualifying certification (ISO 27001:2022 is one of
four it accepts) held for at least one year before RFP publication (r2/06; §17.15, §01
[Verified]).
Consequence for month zero: **start ISO 27001 immediately** even with no customer asking; to
be useful at month 18 it must be in hand by ~month 6. This shapes the architecture now because
the controls it certifies (access logging, encryption-at-rest, incident response, the audit
backbone) must be *designed in from v1*, not retrofitted for the audit. "The cheapest year you
will ever buy" (§17.15).

#### 15.7.5 Log residency topology — every log in India, whatever the inference residency

Inference residency (§15.7.1) is per tenant and may, where the tenant's profile permits,
send a tokenised prompt to a backend outside India. **Logs do not follow the inference.**
CERT-In requires 180 days of ICT logs within Indian jurisdiction for every body corporate
(EV-062, direction (iv)); that LLM prompt and completion logs are ICT-system logs is
well-grounded inference rather than stated text, so counsel confirms (§23 CR-23) and we build as
if they are (§12.8.3). The policy lives in §12.8.3 and §17.6; this is the topology.

<!-- DIAGRAM: architecture-log-residency -->

| Log stream | Written by | Contents | Store | Retention | Readable by |
| --- | --- | --- | --- | --- | --- |
| Gateway access and security events | API gateway | Request context (§15.2.3), authentication outcome, tenant-context violations (AC-T2) | India log plane | At least `logs.ict_retention_days`, never set below 180 (EV-062) | Security on-call, incident owner |
| Audit / event backbone | Every service | §15.6.1 events, hash-chained | India, tenant-partitioned | Per retention class (§14.7), never below the ICT floor for ICT-log content | Tenant admin for its own tenant; auditors under grant |
| LLM prompt and completion log | Egress gateway only, after tokenisation | Tokenised prompt and completion, provider, model, task class, tenant, cost context | India, tenant-partitioned | ICT floor; beyond it `llm_log_retention_days`, routed to §20 and §23 (§12.8.3) | AI operations under break-glass; incident owner |
| Token map | Egress gateway only | Token-to-value pairs, keyed per data subject | India, a separate store under separate keys | Life of the subject key; crypto-shredded on erasure (§15.6.2) | The egress gateway's service identity only |
| AI attribution and disclosure records | Egress gateway and AI orchestrator | The per-employee disclosure record (§12.8.3) | India | Exportable per employee; retention per class (§14.7) | Tenant admin; the employee for their own record |
| Device receiver log | ADMS/WDMS receiver | Packet receipt, device id, clock drift against NTP-synced server time | India log plane | ICT floor | Operations, incident owner |
| Metrics and traces | Every service | Identifiers and measurements, no personal-data field | India, complete | ICT floor | Engineering |

A copy of metrics and traces may go to an observability tool outside India only if the
stream carries no personal-data field and the India copy is complete; for a tenant pinned
India-only nothing leaves India at all (AC-T4). What a model provider itself retains from a
tokenised prompt, and where, is recorded per provider in the sub-processor register
(§12.8.3, §17.7) and re-verified per procurement (§20 V-13); this PRD asserts no provider's
retention setting. Every stream feeds the six-hour incident pipeline (§15.6.3) with
NTP-synced timestamps.

These continue the AC-T series of §15.3.8 and §15.3.9:

- **AC-T9 (LLM logs land in India whatever the inference residency).** For a tenant whose
  profile permits a non-India backend, a probe call's prompt and completion are logged only
  to the India store, in tokenised form; a search of every non-India store and observability
  sink finds neither the log line nor any seeded canary identifier.
- **AC-T10 (the ICT floor is enforced).** Any configuration change or operation that would
  expire or delete an ICT-log stream before `logs.ict_retention_days` is refused and logged
  as a security event; the parameter cannot be saved below 180. Any value above that floor
  is an owner decision routed to §20's sizing register, with counsel, alongside
  `llm_log_retention_days` (§23 CR-11, CR-23).
- **AC-T11 (shredding de-identifies logs without deleting them).** After a subject key is
  crypto-shredded, the LLM log lines that referenced that subject remain present and
  hash-chain-verifiable, and their tokens no longer resolve.

#### 15.7.6 What a regulated buyer's due diligence draws from this architecture

Regulated customers reach this product through *their* obligations, not ours (EV-085–087), and
their due-diligence questionnaires ask for artefacts rather than assurances. This index says
which architectural artefact answers which question and — the more useful half — where
architecture does **not** answer and the question is contractual or legal instead. §17 owns the
sectoral NFR profiles; §23 owns the legal analysis; this is the artefact map.

| What the buyer's obligation makes them ask | Architectural artefact that answers it | Where it is produced |
| --- | --- | --- |
| SEBI: does the data reside and get processed in India, and is the infrastructure MeitY-empanelled for a SaaS provider (EV-085) | The tenant residency profile (§15.7.1), the deployment topology (§15.7.3) and the residency probe record | AC-T4, AC-T9; §15.12.2 residency class |
| SEBI: can SEBI, CERT-In and government agencies exercise audit and search over the provider and its sub-contractors (Principle 7(iv), EV-085) | The sub-processor register and the sub-processor-change gate (§12.8.7), plus replay that **supports evidence production** — and, explicitly, does **not** discharge the obligation (K-21, §15.6.2) | §15.6.2; the contractual half is §23 |
| SEBI: the twenty mandatory contract terms (Principle 7(x), EV-085) | **None — this is a contract surface, not an architecture one.** Naming it here prevents the familiar failure of answering a contractual question with a technical artefact | §23 |
| RBI: localisation, right to audit including by RBI, sub-contractor consent and regulator inspection, **materiality-gated entity by entity, not turnover-gated** (EV-087, K-22) | Residency profile, the silo escape hatch as a priced SKU (§15.7.3), the sub-processor gate wired to per-tenant consent, per-tenant restore and export drill records (AC-T6, AC-T19) | §15.3.9, §15.3.11 |
| RBI: what changes if a sub-processor is added | The gate that makes a tenant's eligible providers exactly its consented set (§15.2.5) — silently adding an LLM vendor can put a bank customer in breach of its own obligations (EV-087) | §12.8.7 |
| IRDAI: the regulator-access undertaking reaching sub-contractors, and permission for offshore outsourcing (reg 53, EV-086) | The same sub-processor register; the residency profile evidences where processing happens | §15.7.5, §17.7 |
| IRDAI: localisation | Nothing to answer at the platform level — IRDAI localisation reaches **policy records** only (EV-086), which this product does not hold | §23 |
| CERT-In: six-hour reporting, 180 days of ICT logs in India, NTP sync (EV-062) | The India log plane with its enforced floor, the incident pipeline and its drill records, NTP-synced timestamps | AC-T10, AC-T26 to AC-T32; §15.6.6 |
| SPDI r.7: cross-border transfer of sensitive personal data (EV-060) | Residency profile plus the segregated identity stores; Aadhaar hosting outside India is a counsel question (Part D-15; §23 CR-15) | §15.7.1, §14.4.15 |
| SPDI r.8 / ISO 27001 as the named standard (EV-060) | The control-evidence set produced continuously (§15.12.2) and the seasoning clock started at month zero (§15.7.4) | §15.7.4 |
| "Show us isolation between your customers" | AC-T1 to AC-T3 results, the partition-below-app mechanism, and the silo SKU where a contract demands dedicated infrastructure | §15.3.1, §15.3.8 |

The pattern across the rows is worth stating plainly: architecture answers **where data is,
who can reach it, and what evidence exists**; it does not answer **what has been contractually
promised**. Conflating the two is the specific error K-21 corrects, and it is why the replay
row above says "supports" rather than "satisfies".

---

### 15.8 End-to-end data flows (worked)

Five flows tie the components together. The first three are the product's core loop — a punch
becoming a payroll input, a pay run becoming filings, and a corrigendum becoming a correction.
The last two are the flows that cross the most boundaries and therefore test the design
hardest: an erasure request, and an inter-state transfer. Each names the human-in-loop gate,
the audit event, and the failure fallback.

#### 15.8.1 A biometric punch → payroll input

*Before any punch.* Biometric enrolment happens only after written consent is captured as
a versioned consent entity — the SPDI Rules treat biometric information as sensitive and
require consent in writing before collection (r.3, r.5(1); EV-060), while DPDP creates no
sensitive category (s.2(t); EV-059); who owes that duty, employer or SaaS, is under counsel
review (Part D-4; §23 CR-04). The consent entity records which regime it was captured under,
because the SPDI and DPDP regimes run concurrently across on or about 13 May 2027 (EV-058);
whether s.7(i) will reach biometric capture at all is untested (Part D-2; §23 CR-02), so the
architecture keeps written capture as the default across that date. The template lives in its own keyspace, separate from the attendance event;
no image column or image bucket exists — enrolment images are deleted after template
extraction (§09, §14). Every employee has a non-biometric attendance path, and no
configuration makes biometric the only one (Part D-10; §23 CR-10; §09).

1. Shop-floor terminal **HTTP-POSTs** a punch packet to its tenant-scoped ADMS/WDMS URL
   (§15.5). No middleware. The attendance event we persist references the employee and the
   time and never a template (packet contract: §09, §16).
2. Gateway resolves the tenant from the URL/credential, injects context, rate-limits.
3. Attendance service **dedups and validates** the punch (clock-drift correction against
   NIC/NPL-synced server time, §15.6.3), maps it to the employee's shift/roster.
4. OT/leave rules for the work location's jurisdiction apply — OT at not less than 2× (Code
   on Wages s.14), central-sphere hour limits where they govern, and the 144-hour quarterly
   figure only as a warn-never-block **[Hypothesis]** (§15.2.4) — resolved via the rules
   engine, effective-dated (§15.4).
5. Result becomes a **payroll input** for the period; an event is emitted.
   **Fallback:** device offline → buffer-and-replay on reconnect; the pay run never blocks on
   a single device.

#### 15.8.2 A monthly pay run → filings (the core loop)

<!-- DIAGRAM: pay-run-to-filing-loop -->

The steps follow the §08.4 month machine (OPEN → INPUTS_CLOSED → PROCESSED → APPROVED →
LOCKED → DISBURSED → PAYMENT_INITIATED → FILED, reversible before LOCKED):

1. **Inputs assembled and closed:** attendance, mid-period changes, investment declarations,
   arrears; the input snapshot freezes at INPUTS_CLOSED.
2. **Payroll engine computes** gross-to-net per employee (PROCESSED), invoking the rules
   engine per component against a complete evaluation context (§15.4.1); fixed-point nodes
   converge (§15.4.7); produces the two concurrent wage bases; stamps rule versions into the
   computation trace (§15.4.3). Deterministic — no AI in the number path.
3. **AI reconcile (optional, edge):** the AI orchestrator flags anomalies vs prior period
   (a component that jumped, a missing declaration) — it *explains and routes*, it does not
   change a number (§12). Human reviews.
4. **Human-in-loop approval gate:** the approver approves (APPROVED) and the run locks
   (LOCKED); after LOCKED, any change is a correction run expressed as a diff, never a
   mutation. Event emitted with actor and reason.
5. **Disbursement** (DISBURSED): bank host-to-host salary file generated; per-beneficiary
   reconciliation; the actual disbursal date replaces the planned one in the evaluation
   context. **Fallback:** partial rejects retried per beneficiary; run stays approved.
6. **Filing orchestrator** turns the locked run + period data into the ECR, the ESI upload,
   PT returns and Form 138 Q1–Q3; validates locally *before* the portal is touched —
   mirroring EPFO's hard blocks and flags (EV-040) and the period's FVU stack (EV-052).
7. **Attended submission** by an operator under the employer's written authority to act
   (§22). For the ECR: upload → validate → return statement → approve; then the
   **verification gate** — every statutory payment reconciles to the locked snapshot — sits
   immediately before payment initiation, because once payment is initiated a downward
   correction is impossible (EV-037); then challan with TRRN → pay (PAYMENT_INITIATED) →
   receipt → FILED (EV-036). Artefacts are archived under their retention class (§14).
   **Fallback:** portal down → the filing waits in the attended queue against its due date;
   the file exists and is valid locally; the cockpit shows "generated, awaiting portal." A
   rejection moves the filing to REJECTED with the error file mapped to employee records
   (§08.8). A portal outage never blocks a pay run — it delays a *submission* (principle 7).
8. **Every step is an event** on the filing stream; the run is replayable end to end within
   the class scoping of §15.6.2.

#### 15.8.3 A retrospective correction (the case that justifies the whole design)

1. A corrigendum lands, dated back, changing (say) the PT slab for a state effective a past
   period. The **watcher catches the corrigendum** (not just new instruments, §15.4.5).
2. Statutory analyst verifies against primary source, drafts a new rule version with a
   **retro-effective flag** and citation; certification fixtures pass; pack promoted.
3. The pipeline **enqueues affected past periods** for recompute. The payroll engine replays
   those periods against the *corrected* version for that period (§15.4.3), producing revised
   numbers and a diff.
4. Where a filing was already submitted against the old version, the filing orchestrator
   prepares only the correction the portal permits, as a diff against the filed artefact,
   never a mutation: a Revised or Supplementary ECR under EV-037's guards, the fenced
   arrear-return flow (EV-043), a Form 138 correction statement where that period's
   correction format exists (EV-046), or the state's own correction route for a PT return —
   per-state and unverified (§20 V-09). Where no permitted correction exists, such as a
   downward ECR change after payment initiation, it becomes an operator exception
   (§15.3.7). Each is flagged in the compliance calendar.
5. Human-in-loop approves the corrections, which are then submitted attended (§22); the
   audit trail links original → corrigendum → recompute → correction.

This flow is the concrete reason effective-dating, event sourcing, the corrigendum-aware
watcher and the certification pipeline all exist. It is also exactly the scenario that
inverted the Nov-2026 analysis when done by hand (§02) — the architecture's job is to make it
mechanical and auditable instead of a research accident.

#### 15.8.4 An employee data request that reaches erasure (worked)

This is the flow that crosses every boundary the section has drawn — the token store, the
biometric keyspace, the device fleet, the register set, the filing record and the audit chain —
and it is the flow where a system that treated bitemporality as universal (K-24) discovers it
cannot comply. §14.7 owns the deletion decision engine and the retention classes; this is the
path across components.

**Standing legal position, unchanged by this flow.** Whether employees hold DPDP access,
correction or erasure rights against an employer relying on s.7(i) is under counsel review and
is dangerous to assert in either direction (Part D-1; §23 CR-01), and DPDP's substantive
provisions do not commence until on or about 13 May 2027 (EV-058, **[Verified — mirror]**:
pull from the primary source before customer use). The architecture therefore builds the
capability now and asserts nothing about the entitlement.

1. **Intake.** The request is captured as a first-class record with the requesting subject, the
   employer it is made to, the request class, and the channel it arrived on (§14.7.3). A
   request that arrives through the assistant is a *draft* record requiring human confirmation
   like every other AI-touched write (§12.5.2).
2. **Identity verification** against the employee record. This is a gate, not a formality: the
   flow's end state destroys key material, and an erasure executed against the wrong subject is
   not recoverable by design.
3. **Classification.** The request is decomposed into the entity classes it touches, because
   the answer differs per class (§15.6.2): bitemporal never-forget classes (rules, salary
   structures, assignments, statutory attributes), erasable classes (raw punches, rendered
   documents, biometric templates, consent artefacts), and the segregated stores (the Aadhaar
   token store, the biometric keyspace).
4. **Retention-class check.** Each class is tested against its retention clock before anything
   is destroyed: the central-sphere register periods — "five years after the date of last
   entry" (Wages r.51(4)), "five calendar years from the date of last entry" (OSH
   r.72(1)(vii), SS r.53(1)(e)), with OSH r.76(2) barring destruction even after five years
   unless the register is transferred (EV-054) — and state-sphere periods as configuration
   pending counsel. Neither an immediate purge nor a fixed one-year suppression is hard-coded,
   because whether DPDP r.8(3) sets a universal one-year floor is a counsel question (Part D-9;
   §23 CR-09).
5. **What cannot be erased, and the honest answer.** A filed artefact and its portal
   acknowledgement are facts about the outside world; a register row inside its retention
   period is a statutory obligation. The response says so, per class, with the reason — rather
   than reporting a completed erasure that did not happen. This is the single most important
   product behaviour in the flow, because the alternative is a system that lies to an employee
   and to an inspector in the same breath.
6. **Execution on the erasable classes.** The subject key is destroyed: ciphertext and the hash
   chain remain verifiable, the values do not resolve, and a tombstone event records the class,
   the subject reference, the actor, the reason and the time (§15.6.2). The Aadhaar token store
   entry and the biometric template are handled in their own stores under their own keys
   (§14.4.15) — the Aadhaar retention ceiling is tied to the consented purpose (reg 6(5),
   EV-068), so a purpose that has ended is itself a trigger, not only a request.
7. **The device fan-out.** Template destruction is not complete when our copy is gone: a
   deletion command goes to every device that holds the template, two-phase, with per-device
   acknowledgement and a retry queue, and an unacknowledged command stays open until it is
   acknowledged or closed by an **admin attestation** of decommission or loss (Part E-6; §09).
   The exception state is documented rather than hidden, because a silent success here is a
   template still sitting on a shop-floor terminal.
8. **Consent artefacts.** The consent record is itself an erasable class, and it records which
   regime it was captured under — the SPDI Rules today require consent in writing before
   collecting biometric or financial information (r.3, r.5(1); EV-060), while DPDP creates no
   sensitive category at all (s.2(t); EV-059) — because two regimes run concurrently across on
   or about 13 May 2027 (EV-058) and a withdrawal has to be interpretable against the regime it
   withdraws from.
9. **What replay returns afterwards.** Pay runs still reproduce from their input snapshots;
   provenance links resolve to tombstones; rendered documents re-render only while their
   retention class still requires the content, and otherwise replay returns the tombstone and
   never a fabricated copy (§15.6.2). This is the concrete meaning of "bitemporality is scoped
   by entity class" (K-24).
10. **Closure.** The subject gets a per-class answer; the audit chain links request → decision →
    tombstones → device acknowledgements; and nothing in the chain itself was erased.

- **AC-T39 (erasure is complete across stores).** After an erasure completes, a sweep across
  the business stores, the object prefix, the Aadhaar token store, the biometric keyspace, the
  LLM log's token map (§15.7.5) and every backup finds no resolvable value for the subject in
  the erased classes, while chain verification over the affected range still passes (AC-T11,
  AC-T21). An outstanding device acknowledgement keeps the request open rather than reporting
  completion.

#### 15.8.5 An inter-state transfer mid-year (worked)

§15.3.7 states why this case breaks naive models in one line. Worked across components, it is
the clearest demonstration that jurisdiction belongs on the work location and not on the
employee (Part E-5), and it surfaces a per-state question the research does not answer.

*Setup.* A tenant with establishments in Maharashtra and Karnataka. One employee, male —
Maharashtra's PT exemption for women up to ₹25,000 a month does not arise — earning above both
states' top bands, transfers from the Maharashtra establishment to the Karnataka one with
effect from 1 October 2026. Tax year 2026-27.

1. **The assignment changes, the employee does not.** A new assignment to the Karnataka
   establishment starts; the old one ends. The employee record, the UAN and the PAN are
   untouched. Nothing about the *person* carries a state.
2. **Jurisdiction re-resolves from the work location** for every period from October onward:
   state, sphere and Code-regime commencement date enter the evaluation context (§15.4.9), and
   the resolver is asked for Karnataka's versions for those periods and Maharashtra's for the
   earlier ones. A run covering both is a *sequence* of resolutions, not one.
3. **PT follows the new state's rule from the transfer month.** April to September at
   Maharashtra's top band of ₹200 a month is ₹1,200. October to March at Karnataka's ₹200 a
   month at ₹25,000 or above, with ₹300 in February, is ₹200 × 5 + ₹300 = ₹1,300. The year's
   total is **₹2,500** — which is exactly the constitutional ceiling of ₹2,500 per person per
   year (Article 276(2), r1/06; §15.4.8).
4. **An open question the arithmetic exposes.** Whether that ceiling binds **per person across
   India** or per person per state is not answered by any research round, and the two readings
   diverge for every mid-year inter-state transfer at the top band. The engine therefore models
   the cap as a rule attribute with its scope as an explicit field rather than assuming either
   reading, surfaces the year-to-date PT total across states to the operator, and the question
   is routed to §20's validation plan alongside the per-state PT build-out (V-09). We are not
   aware of a settled position on it as of September 2026, and this PRD states none.
5. **LWF follows its own cadence, not payroll's.** LWF sits outside the four Codes and its
   periodicity varies by state; Karnataka's calendar-year cadence with a 15 January due date is
   the one verified periodicity, and every other state's amount and cadence is unverified
   (r2/10; §15.4.2). The scheduler therefore carries the transfer as a change in *which*
   LWF obligations exist for this employee, on dates unrelated to the monthly payroll run
   (§15.5.4).
6. **PF continuity, with a filing consequence.** The UAN continues; what changes is the
   establishment the member is reported under. From October the member appears in the Karnataka
   establishment's ECR and disappears from Maharashtra's — and each establishment's filing
   ledger must stay unbroken independently (EV-038; Part E-10). The transfer month is exactly
   where a member goes missing from one return and does not arrive in the other, which is why
   the ledger interlock (§15.5.5, AC-T24) and the exclusion flag (§15.3.7) both exist.
7. **ESI depends on coverage at the new location.** Coverage is notified by district and
   sometimes sub-district (§15.4.2), so a transfer can move an employee into or out of coverage
   independently of anything about their wages — another reason jurisdiction resolves from the
   work location. Where the employee was already contributing and crosses the ₹21,000 ceiling
   mid-period, the contribution-period rule keeps them contributing to the end of that period
   (§15.3.7); that rule is an attribute of the ESI rule version, not code.
8. **TDS is usually untouched, and that asymmetry is the point.** One TAN often spans locations
   (§15.3.2), so Form 138 continues under the same deductor with no transfer event at all. A
   single employee-month therefore produces a *state-scoped* PT and LWF consequence, an
   *establishment-scoped* PF consequence, a *district-scoped* ESI consequence and **no** TDS
   consequence. A data model that hung jurisdiction on the employee would have to express all
   four as exceptions; hanging it on the work location makes all four ordinary.

---

### 15.9 Build sequencing (architecture, mapped to phases)

Per the phasing rule (§05.4: the full suite is the vision, not v1). This orders
*architectural capability*, not features (features are §05.5).

| Phase | Architecture delivered | Rationale |
| --- | --- | --- |
| **v1 (beachhead 20–200)** | Gateway + tenant router; pool-with-partition multi-tenancy (India plane); statutory-rules engine with effective-dating, the enumerated evaluation context, bounded fixed-point evaluation and the certification pipeline; payroll engine (event-sourced) + filing orchestrator with the filing ledger; attended-filing tooling for EPFO/ESIC/TRACES/PT (no portal APIs, §22); ADMS/WDMS push receiver; the Excel/CSV onboarding import with YTD tie-out (R1) and the Tally importer (R2, §05.5 items 17, 32); bank H2H; event/audit backbone with class-scoped erasure; per-tenant point-in-time restore and export in the pool (AC-T6); the India log plane for every log stream, LLM logs included (§15.7.5) + NTP + the six-hour incident pipeline; the redaction egress gateway, kill switch and sub-processor gate; four-line cost attribution; model router on a provider seam built for ≥3 backends (one wired at R1, §05.5 item 15); ISO 27001 controls designed in. | Everything needed to produce a portal-accepted artefact and carry it through attended submission under the employer's written authority (§22), isolate tenants, and stay auditable. Inference is the smallest of four COGS lines; supervised filing is the largest (EV-088, §13). |
| **v2 (expansion 200–2,000)** | Cohort sharding of the pool if pressure warrants (§15.3.5); CA cross-tenant grant model matured — the prepare and assisted-submission scopes, if V-05 and counsel clear them (§15.3.6) — with the calendar-only CA-org projection (§15.3.9, AC-T7); talent integrations (job boards, LinkedIn partner); richer MCP tool surface. | Same product shape, more tenants and larger tenants; CA channel scaled *if* validated (§20 V-05). |
| **Vision (enterprise, benefits, full AI)** | Silo/dedicated + self-host compliance SKU; per-provider residency matrix hardened for regulated procurement (RBI/SEBI/IRDAI overlays, buyer RFP terms); benefits-attach data model activated (built in v1, monetised later, §11). | Enterprise procurement is arithmetically closed for ~3 years (§05.2); the ISO seasoning clock started at month 0 makes month-18 bids possible. |

Four items in the v1 row are enforcement mechanisms rather than features, and they are cheap
at the start and expensive later, which is the only reason they appear in v1 at all: the
trust-zone lint and network policy (§15.2.7), because a call graph is hard to un-tangle once
services exist; the event envelope and its delivery semantics (§15.6.5), because a schema that
consumers already depend on cannot be re-shaped without rewriting history; the attended-filing
queue's idempotency keys (§15.5.5), because retrofitting a duplicate guard after the first
double challan is remediation rather than design; and the conformance schedule (§15.12.2),
because the control-evidence set it produces is what the ISO 27001 audit consumes at month 18
and cannot be back-dated.

---

### 15.10 Open architecture questions and hypotheses

Consistent with the PRD's standing rule that surviving hypotheses carry a kill/validation
criterion:

| # | Hypothesis | Validation method | Kill criterion |
| --- | --- | --- | --- |
| A1 | Pool-with-partition scales to the v1 tenant population on one India plane within residency + per-tenant rate SLA. | Load model against projected tenant count before GA. | If it cannot without breaching the noisy-neighbour SLA, cohort-shard earlier (§15.3.5). |
| A2 | One certified rule-pack pipeline keeps pace with recurring statutory load. | Track notification→certified-pack latency for two quarters. | Median latency > shortest observed statutory effective-notice window → statutory team under-resourced (§22). |
| A3 | The CA-as-cross-tenant-actor auth model is worth its complexity. | §20 V-05 (20–30 CA interviews). | CAs see us as disintermediation → degrade to per-tenant export + reporting view (§15.3.6). |
| A4 | ≥3 residency-selectable inference backends satisfy every regulated procurement we target in v2–vision. | Per-procurement provider-matrix re-verification. | A required buyer mandates in-country inference no listed provider offers → self-host inference SKU moves up the roadmap. |
| A5 | Inference stays the smallest of the four COGS lines at beachhead ARPU; the absolute per-employee inference figures are placeholders (EV-088). | Instrument the prototype (§20 V-04); four-line attribution built in from v1 (V-14). | Actual tokens ≥5× the estimate (§20 V-04) → router cost ceilings tighten and the bundling decision is re-opened (§13). The larger exposure — supervised-filing minutes per registration — is measured separately (§15.6.4, §22). |
| A6 | Device integration effort is affordable in-house for the common fleet (eSSL/ZKTeco ADMS). | Hardware spike (effort currently **unsized**, §09 [Killed] the old figure; §20 V-10). | If mixed-fleet success is materially below what the spike shows viable, lean on the paid connector market for the long tail (§15.5.1). |
| A7 | Client-owned tenants with CA grants (B-1, §15.3.9) meet bureaus' operating needs without a bureau-owned tenant. | §20 V-05 interviews probe who bureaus expect to hold the client account. | Bureaus will act as a channel only if the account is theirs → re-open B-2, with `employer_id` enforced below the app and a per-employer export. |
| A8 | Shadow evaluation against a canary cohort (§15.11.3) catches pack defects before a rule's effective date, without ever publishing a figure from an uncertified pack. | Track defects caught in shadow versus defects caught in production after promotion, per pack, from the first quarter of operation. | If material defects are routinely found only after promotion, shadow evaluation is not doing the work: widen the certification fixture corpus (§15.4.5) rather than widening the canary, because the law cannot be A/B tested. |
| A9 | A synthetic non-production corpus is sufficient to exercise the statutory paths, so no production personal data is needed outside production (§15.11.2). | Track defects reproduced only with production-shaped data, per release. | If a class of statutory defect is systematically unreproducible on synthetic data, the gap is in the corpus generator's coverage of that class — extend the generator; loosening the data rule is not an option, because it would put employee and Restricted-class data into environments without production controls. |

**[Killed]** — reminders that must not re-enter the architecture: "cache everything" as a
default (Gemini's hourly cache storage makes explicit caching strictly worse than none for
tenants below roughly 1,000 employees, and can exceed the tenant's inference bill by 100× or
more — r2/03, §13); self-hosting *for cost* (serverless wins by roughly 74× on a derived,
low-confidence estimate, r2/03, §20); and any claim of
automated or unattended submission on any statutory portal — every one is attended, and the
deliverable is a portal-accepted artefact plus assisted submission (§22).

**[Reversed]** — the old reminder not to treat multi-state PT/LWF as a differentiator, on the
ground that "Frappe ships it free", is withdrawn: Frappe v16 has no state PT slabs or LWF and
TallyPrime has neither a state PT slab table nor an LWF engine (EV-031, EV-032). Multi-state
PT and LWF is greenfield in both incumbents — which is why the per-state rule model in §15.4.2
is a differentiator, not parity.

---

### 15.11 Environments, promotion and non-production data

Three of this section's guarantees — determinism (AC-R1), gazette-fixture parity (AC-R4) and
the residency and erasure properties (AC-T4, AC-T20) — are only as good as the environments
they are exercised in. This subsection specifies the environment topology, the one data rule
that governs it, and the promotion mechanism for a rule pack, which is unusual because **the
law cannot be A/B tested**.

#### 15.11.1 The environment set

| Environment | Purpose | Tenant data | Rule packs | Provider access |
| --- | --- | --- | --- | --- |
| **Development** | Engineering | None. Synthetic only | Full pack history, because packs are public law | Stubbed providers only; no provider credential exists outside Z4's production and staging scopes (§15.2.7) |
| **Continuous integration** | Every commit: contract tests, the dependency lint, gazette fixtures | None | Full pack history | Stubbed |
| **Staging (production-equivalent)** | Release verification, drills, fault injection, load modelling | None. Synthetic at production shape and volume | Full pack history plus candidate packs | Stubbed by default; a provider is reachable only for an explicitly scoped integration test through the real egress gateway |
| **Production** | Customers | Real, tenant-partitioned, residency-pinned | Certified packs only | Through Z4 only |

The pool-versus-silo decision (§15.3.9) applies to staging too: staging runs the pooled shape,
because the properties most worth verifying — partition enforcement, fair-share scheduling,
per-tenant restore inside a pool — do not exist in a single-tenant environment.

#### 15.11.2 One data rule, and why the statutory corpus is exempt from it

**No production personal data leaves production.** Not for debugging, not for a migration
rehearsal, not "just the payroll table". The reason is structural rather than moral: the
controls this section specifies — partition enforcement, the residency profile, the egress
chokepoint, crypto-shredding, detection-capable access logging (EV-064) — exist in production.
A copy in a lower environment is the same data without any of them, which is how an isolated
architecture acquires an unmonitored second copy.

Two consequences the build must absorb:

- **Non-production data is generated, not copied.** A corpus generator produces employees,
  structures, attendance and registrations at production shape: multi-state tenants, mid-month
  joiners and leavers, duplicate and unresolved UANs (§15.3.7), inter-state transfers, LOP and
  negative arrears, tenants at both ends of the 20–200 band. Its coverage is measured against
  the edge-case table of §15.3.7 and the scenarios of §15.12, and a gap in it is a defect in
  the generator, not a reason to reach for real data.
- **Migration rehearsal is a production-side operation.** A customer's own historical data is
  exercised inside their own tenant, under their own controls, through the onboarding import
  and its YTD tie-out validator (§05.5 item 32; §16) — never by shipping an export to staging.

**The statutory fixture corpus is the deliberate exception, and it is exempt because it
contains no personal data at all.** Certification fixtures are worked examples derived from
gazette text and, where one exists, the portal's own validation utility — the EPFO ECR format
validator, the RPU/FVU stack for the period (EV-035, EV-051, EV-052). They are public law
expressed as test vectors. They are versioned alongside rule packs, they ship to every
environment, and AC-R4 makes reproducing them a promotion gate. This is why a rules engine can
be verified thoroughly in CI while the rest of the system cannot: its inputs are not secret.

#### 15.11.3 Promoting a rule pack — shadow evaluation, not a canary split

§15.4.5 stages a certified pack "to a canary tenant cohort" before promoting it. That phrase
needs precision, because the ordinary meaning of a canary — a subset of users getting
different behaviour — is **not available here**. Two employers in the same state on the same
date are subject to the same law; giving one a new PT slab and the other the old one is not a
cautious rollout, it is a wrong filing for somebody.

The canary is therefore a **shadow evaluation**:

1. A certified candidate pack is deployed alongside the pack in force, and marked
   `SHADOW` — the resolver will not return its versions to any production caller.
2. For the canary cohort — `canary.shadow_cohort`, which must span every jurisdiction the pack
   touches or the diff proves nothing — each evaluation runs twice: once against the pack in
   force, which is what is published, and once against the candidate, which is discarded after
   being diffed.
3. Differences are reported per rule class, per jurisdiction, per employee count affected —
   an expected-difference set accompanies the pack, so a *silent* difference (a class nobody
   predicted would move) is the signal worth acting on.
4. On the effective date, the candidate is promoted for **every** tenant at once. Promotion is
   a pack-version event that invalidates the resolver cache (§15.4.8) and is recorded on the
   event backbone with its certification result (§15.6.1).
5. If the diff shows an unexpected class moving, the pack is withdrawn to the statutory team
   rather than promoted late — the effective date is the law's, not ours, so a defective pack
   becomes an escalation and a filing-at-risk alert (§15.5.4), not a quiet delay.

**Rollback is asymmetric, and the asymmetry is the point.** A pack can be withdrawn before its
effective date freely. Afterwards, withdrawing it does not un-file anything already filed under
it: the pack's versions stay in history, figures computed under them keep their pins (AC-R9),
and a correction takes only the route the portal permits (EV-037; §15.8.3). The system's
rollback story for statutory content is therefore *forward* — a new version with a
retro-effective flag (AC-R3) — never a deletion.

- **AC-T33 (no production personal data outside production).** A scanner over every
  non-production store and backup finds no record matching production's tenant identifiers or
  Restricted-class patterns; a deliberately seeded canary value placed in production never
  appears in a lower environment.
- **AC-T34 (shadow packs cannot be published).** A resolver call in any production path
  returns zero versions from a `SHADOW` pack; a test that requests one explicitly is refused,
  and a figure computed under a shadow pack can never reach a payslip, a filing artefact or an
  API response.
- **AC-T35 (promotion is atomic and recorded).** Pack promotion takes effect for every tenant
  in the same operation, invalidates every superseded cached resolution, and emits one event
  carrying the pack version, its citation set and its certification result; a partial
  promotion — some tenants on the new pack, some on the old — is not representable in the
  data model.

---

### 15.12 Architecture conformance scenarios

The acceptance criteria above are stated where they belong, next to the mechanism they
constrain. This subsection turns them into an executable set: the scenarios that prove them,
where each runs, and what artefact each produces. The organising rule is that **an
architectural property that is not exercised on a schedule is an assumption**, and this
section's properties are the ones whose failure is a legal or contractual event rather than a
bug.

#### 15.12.1 Scenarios

| # | Given | When | Then | Proves |
| --- | --- | --- | --- | --- |
| **AS-01** | A pooled plane holding several tenants | A query omitting its `tenant_id` predicate is executed against the enforcement mechanism | Zero rows return — not another tenant's rows | AC-T1 |
| **AS-02** | A signed gateway context for tenant A | A request body claims tenant B | Rejected; security event carrying both values; body never consulted | AC-T2 |
| **AS-03** | A queued pay-run job | Its event's tenant context is stripped | The job dead-letters; it does not execute against a default | AC-T3 |
| **AS-04** | A tenant pinned India-only | A probe request exercises data, logs and an AI call | No non-India plane, store or workspace geo is touched | AC-T4, AC-T9 |
| **AS-05** | Two tenants with byte-identical policy text | Both query the assistant | Two isolated context partitions; no cache key resolves across tenants | AC-T5 |
| **AS-06** | A pool plane with other tenants' data | One tenant is restored to a point in time and exported in full | Restore and export read and write only that tenant; drill completes inside §17.14's provisional RPO/RTO | AC-T6, AC-T19 |
| **AS-07** | A CA-org projection | A schema change adds an employee-level field | Build fails; separately, revoking a grant removes that client's rows and refuses the next context switch | AC-T7, AC-T18 |
| **AS-08** | A payroll-engine module | A provider SDK import is added | CI fails with a named rule violation | AC-T12 |
| **AS-09** | The lint disabled in a test environment | A Z2 workload calls a provider directly | Network policy refuses; security event names workload and destination | AC-T13 |
| **AS-10** | An AI-proposed change to a pay result | It is submitted with the approval step removed | Rejected; with approval, the audit event names both the proposing agent and the confirming human | AC-T14, §12.5 |
| **AS-11** | Every statutory portal unreachable | A full month is run | Pay run reaches LOCKED; every payslip renders; filings sit in the attended queue with their due dates | AC-T15 |
| **AS-12** | A state with no certified PT pack | A run includes an employee in that state | Run blocks with `E-NO-RULE-IN-FORCE` naming state and period; zero payslips, zero artefacts; the calendar shows a gap | AC-R5, AC-T16 |
| **AS-13** | A provisioning request with no residency profile | Tenant creation is attempted | Refused; a migration leaving a null profile fails the build | AC-T17 |
| **AS-14** | A subject erased after time `t` | The tenant is restored to `t` | Fields resolve as ERASED; the tombstone is present; plaintext identifiers are absent; the chain verifies | AC-T20, AC-T21 |
| **AS-15** | A delivered export bundle | It is re-imported into an empty tenant | Every locked pay run reproduces byte-identically against its pins; the filing ledger's month sequence is unbroken; the manifest hash matches | AC-T22 |
| **AS-16** | A filing session that times out after upload | The operator retries and the system backs off | One submission, one challan, one acknowledgement | AC-T23 |
| **AS-17** | A registration with month M−1 unfiled | A job for month M is queued | It cannot leave QUEUED; the blocking month is named | AC-T24, EV-038 |
| **AS-18** | A filing at the verification gate | The operator identity, then an AI component, attempts payment initiation | Both refused and raised as security events; only a recorded approver may proceed | AC-T25 |
| **AS-19** | An arbitrary window of events | It is replayed into every consumer | Byte-identical projections; no duplicate notification, cost line or calendar row | AC-T26 |
| **AS-20** | A live CA-org projection | It is rebuilt from scratch | The rebuild matches the live projection exactly | AC-T27 |
| **AS-21** | A historical event | An update, a delete and a field back-fill are attempted | All three fail at the store; chain verification still passes | AC-T28 |
| **AS-22** | A detector signal injected end to end | The pipeline runs | A candidate opens with its evidence bundle and pages the on-call owner inside `incident.page_target_minutes` | AC-T29 |
| **AS-23** | A detector, a scheduled job and an AI component | Each attempts to set REPORTABLE | All refused; each attempt is itself a security event | AC-T30 |
| **AS-24** | Each detector class in turn | A drill stages a report | Every field §17.6's report needs from system state is present | AC-T31 |
| **AS-25** | An incident open after DPDP commences | The CERT-In track is closed | The DPDP track stays open with its own state | AC-T32 |
| **AS-26** | An ICT-log stream | A configuration change would expire it below 180 days | Refused and logged as a security event; the parameter cannot be saved below the floor | AC-T10, EV-062 |
| **AS-27** | A subject key crypto-shredded | The LLM log lines that referenced it are read | Lines present and chain-verifiable; their tokens no longer resolve | AC-T11 |
| **AS-28** | Production canary values seeded | Every non-production store and backup is scanned | No match anywhere | AC-T33 |
| **AS-29** | A `SHADOW` pack deployed | A production path requests its versions | Zero versions returned; explicit requests refused; no shadow figure reaches any output surface | AC-T34 |
| **AS-30** | A certified pack at its effective date | Promotion runs | Atomic across tenants; caches invalidated; one event with version, citations and certification result; no partial state is representable | AC-T35 |
| **AS-31** | Any `(inputs, rule-set version, evaluation context)` | Ten thousand evaluations, and one evaluator with clock and database access removed | Byte-identical outcomes and identical resolved-version ids throughout | AC-R1 |
| **AS-32** | Versions `V1 [2026-04-01, 2026-09-01)` and `V2 [2026-09-01, ∞)` | Period 2026-07 is queried with run-date 2026-11-15, then period 2026-10 | `V1`, then `V2` — resolved by period, never by run-date | AC-R2 |
| **AS-33** | A retro-effective version inserted with a past `valid_from` | Affected periods are re-resolved | The corrected version returns with `RETRO_SUPERSEDED`, and the downstream correction is enqueued | AC-R3 |
| **AS-34** | Every shipped rule version | Its certification fixtures run | Reproduced to the last paisa, with rounding applied once after convergence | AC-R4, AC-R7 |
| **AS-35** | A rule version with no citation | Promotion is attempted | Blocked by the pipeline | AC-R6 |
| **AS-36** | A resolution request | An undeclared field is added, then `pack_pin` is omitted entirely | Both rejected — silence must not mean "today" | AC-R8 |
| **AS-37** | A stored `pack_pin` | Re-resolution after later promotions | Identical versions and clauses; the only permitted addition is a `RETRO_SUPERSEDED` flag | AC-R9 |
| **AS-38** | Two tenants submitting identical inputs | Both evaluate | Two distinct evaluations and two distinct traces; a cache key omitting tenant scope fails the build | AC-R10 |
| **AS-39** | An evaluation context | Each enumerated field is removed in turn | Four distinct, specific `E-CONTEXT-INCOMPLETE` errors naming the field | AC-R11 |
| **AS-40** | A run and a retro-effective promotion | The run is replayed, then the period is recomputed | Replay reproduces the original exactly; the recompute differs; the original trace is unchanged | AC-R12, AC-R2 |
| **AS-41** | The calculation graph | An undeclared cycle is introduced | Build fails, naming the participating components | AC-R13, FP-S6 |
| **AS-42** | A deliberately slow-converging loop | Every output surface is inspected during the run | Only converged values or the block; no intermediate iterate anywhere | AC-R14, FP-S4, FP-S5 |
| **AS-43** | Every external dependency black-holed | Interactive pages are exercised | Every human-facing request still responds; a static check finds no external call inside a synchronous handler | AC-T36 |
| **AS-44** | A device with injected clock drift, offline across a month boundary | Its buffer replays after the month is LOCKED | Raw device time, receipt time, drift and corrected instant all stored; punches land in the wage month their corrected time belongs to; the difference routes to a correction run, and the Form IX grid gains its IN/OUT entries | AC-T37, AC-T38, EV-055 |
| **AS-45** | A completed erasure with one device acknowledgement outstanding | A sweep runs across every store, backup and the token map | No resolvable value in the erased classes; the chain still verifies; the request stays **open**, not reported complete, until the device acknowledges or an admin attestation closes it | AC-T39 |
| **AS-46** | A persisted payroll result | A fault is injected between result and trace persistence, then the evaluator is made unavailable | Both persist or neither does; every stored figure is still explainable from its trace with no evaluation call issued | AC-R15, AC-R16 |

#### 15.12.2 Where each class runs, and how often

Not every scenario belongs on every commit; a drill that runs on every commit stops being a
drill and becomes a fixture that nobody reads.

| Class | Scenarios | Environment | Cadence | Artefact produced |
| --- | --- | --- | --- | --- |
| **Contract and lint** | AS-08, AS-21, AS-36, AS-38, AS-41, AS-43 (static half) | CI | Every commit | Build result |
| **Determinism and rule fixtures** | AS-31 to AS-35, AS-37, AS-39, AS-40, AS-42, AS-46 | CI, with the gazette fixture corpus (§15.11.2) | Every commit, and again as a promotion gate per pack | Fixture report per pack version, kept with the pack |
| **Isolation** | AS-01 to AS-03, AS-05, AS-07, AS-13 | Staging, pooled shape | Every release | Isolation report |
| **Residency and logs** | AS-04, AS-26, AS-27 | Staging, then a production probe | Every release, and on any residency or provider change | Residency probe record, referenced in regulated-customer due diligence (EV-085–087) |
| **Degradation** | AS-11, AS-12, AS-16, AS-17, AS-43, AS-44 | Staging, fault injection | Every release | Fault-injection report |
| **Approval and write-path integrity** | AS-10, AS-18, AS-23 | Staging | Every release | Control-test record for the ISO 27001 evidence set (§15.7.4) |
| **Restore, export and erasure drills** | AS-06, AS-14, AS-15, AS-45 | Staging with a populated pool | Quarterly, and before any change to the storage or key layer — cadence parameter `restore.drill_cadence_days`, owner platform engineering, routed to §20 | Drill record with timings against §17.14's provisional RPO/RTO |
| **Incident drills** | AS-22, AS-24, AS-25 | Staging, with the production paging path | Quarterly, and after any detector change | Drill record with awareness-to-page and awareness-to-staged timings |
| **Promotion** | AS-29, AS-30 | Staging, then production at an effective date | Per pack | Promotion event (§15.6.1) |
| **Data-rule enforcement** | AS-28 | All non-production environments | Continuous scan | Scan report |

Three of these artefacts do double duty and are worth naming as such: the fixture report is
the rules engine's promotion gate (AC-R4); the residency probe record is the evidence a
regulated buyer's due diligence asks for (§15.7.1); and the control-test records are the
evidence set the ISO 27001 audit consumes, which is why the seasoning clock argues for
producing them from month zero rather than assembling them before an audit (§15.7.4).

---

### 15.13 Named configurable parameters owned by this section

The PRD's standing rule is that a value the ledger and research do not give becomes a named
parameter with an owner, routed to §20 — never a guessed default. These are this section's, in
one place, so that a build team can see what must be decided before GA and a reviewer can see
what has *not* been invented here. A parameter is a configuration value or an operational
target; **no parameter in this table is a statutory value**, and none may be used as one.

| Parameter | Controls | Owner | Bound or floor | Consumed at | Status |
| --- | --- | --- | --- | --- | --- |
| `gateway.budget_hard_ceiling` | The per-tenant/per-user consumption ceiling at which the gateway hard-stops rather than degrades | Product + finance | None stated; a documented vendor precedent exists and is cited as a precedent, not a value (§15.2.3) | Gateway (§15.2.3) | Routed to §20 |
| `logs.ict_retention_days` | ICT-log retention in the India log plane | Security | **Never below 180**, enforced structurally (AC-T10) — the floor is CERT-In's (EV-062) | Log plane (§15.7.5) | Floor fixed; any value above it is an owner decision |
| `llm_log_retention_days` | Retention of tokenised prompt and completion logs beyond the ICT floor | Security + counsel | At least the ICT floor | Egress gateway (§15.7.5, §12.8.3) | Routed to §20 and §23 (CR-11, CR-23) |
| `calendar.alert_lead_days` | How far ahead of a due date a filing-at-risk alert raises | Compliance operations | — | Scheduler (§15.5.4) | The same parameter as §03 AC-M06.3, not a second one |
| `fixed_point.max_iterations` | Iteration ceiling on a declared loop | Payroll engineering | — | Evaluator (§15.4.7, §15.4.10) | Versioned engine parameter, §08 FR-PAY-211 |
| `fixed_point.tolerance` | Convergence tolerance, in the currency's minor unit | Payroll engineering | — | Evaluator (§15.4.7, §15.4.10) | As above |
| `fixed_point.oscillation_window` | How many prior iterates are retained for oscillation detection | Payroll engineering | — | Evaluator (§15.4.10) | **New here**; routed to §20 |
| `rules.resolver_cache_safety_ttl` | Safety-net expiry on cached resolutions; invalidation is event-driven, this is the backstop | Platform engineering | — | Rules engine (§15.4.8) | **New here**; routed to §20 |
| `queue.operator_lease_minutes` | How long an operator's claim on a filing job holds before it returns to the queue | Compliance operations | — | Attended-filing queue (§15.5.5) | **New here**; routed to §20, sized with §22's capacity model |
| `queue.portal_backoff_schedule` | Backoff between attempts when a portal is unreachable | Compliance operations | Must not push a job past its due date without raising a filing-at-risk alert | Attended-filing queue (§15.5.5) | **New here**; routed to §20 |
| `events.consumer_lag_alert_seconds` | How long an unclosed `sequence` gap may persist before an operational alert | Platform engineering | — | Event backbone (§15.6.5) | **New here**; routed to §20 |
| `incident.page_target_minutes` | Awareness-to-page target inside the six-hour window | Security | Must leave the six-hour obligation achievable end to end (EV-062) | Incident pipeline (§15.6.6) | **New here**; routed to §20, with §17.6 owning the runbook |
| `restore.drill_cadence_days` | How often the per-tenant restore and export drill runs | Platform engineering | — | Conformance schedule (§15.12.2) | **New here**; routed to §20 |
| `ratelimit.per_tenant` | The per-tenant request ceiling at the gateway | Platform engineering | Must not make a 200-employee month-end run unachievable inside the tenant's window | Gateway (§15.2.3, §15.3.5) | **New here**; routed to §20 |
| `ratelimit.per_user` | The per-user request ceiling, set independently of the tenant limit | Platform engineering | — | Gateway (§15.2.3, §15.3.5) | **New here**; routed to §20 |
| `canary.shadow_cohort` | Which tenants a candidate rule pack is shadow-evaluated against | Statutory team | Must span the jurisdictions the pack touches, or the diff proves nothing | Rule-pack promotion (§15.11.3) | **New here**; routed to §20 |

Two values referenced by this section are **not** its parameters and are listed only so nobody
looks for them here: `gratuity.ceiling` (a statutory value awaiting a notification under
CoSS s.53(3); §15.4.2, §20) and `pt.arrears_treatment` (a per-state rule attribute; §15.4.3,
§20 V-09). Both are rule data owned by the statutory team, not configuration.

---

### 15.14 Summary — how the pieces enforce the thesis

The architecture is arranged so that the product's two central claims are *structural
properties*, not aspirations:

- **"The filing is the unit of delivery"** is enforced by making the filing orchestrator
  event-sourced and the primary audit stream — the system's durable truth is an acknowledged
  filing, and every other component exists to feed it.
- **"Rules-first, LLM-last"** is enforced by a hard trust boundary: the deterministic core
  computes every statutory number and stamps its rule versions; the AI edge explains, drafts
  and routes through the same audited, approval-gated write path a human uses, with no
  privileged compute path, and every outbound model call passes the redaction egress gateway.

Effective-dating with an enumerated evaluation context, bounded fixed-point evaluation, the
corrigendum-aware certification pipeline, per-tenant partition with a regulated silo escape
hatch, class-scoped replay and erasure, residency-as-configuration with ≥3 interchangeable
backends, India-resident logs feeding a six-hour incident pipeline, and four-line cost
attribution built from v1 — each is one design choice serving a named,
sourced constraint elsewhere in this PRD. None is gold-plating; each has a kill criterion or a
[Verified] source behind it.
