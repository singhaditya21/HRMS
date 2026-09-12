export const meta = {
  name: 'hrms-prd-expand',
  description: 'Expand the Filing-First HRMS PRD into a comprehensive Markdown doc with diagrams',
  phases: [
    { title: 'Draft' },
    { title: 'Deepen' },
    { title: 'Diagrams' },
  ],
}

const REPO = '/Users/adityasingh/PersonalWork/HRMS'
const SECT = `${REPO}/prd_build/sections`
const DIAG = `${REPO}/prd_build/diagrams`
const IMG = `${REPO}/images`

const CONTEXT = `
PRODUCT CONTEXT (read these files first for grounding):
- ${REPO}/PRD.md  (the existing "Filing-First HRMS" Draft 1 — build on it, keep its voice, do not contradict its Verified claims)
- ${REPO.replace('/PersonalWork/HRMS','')}/.claude ... (skip)
- Memory: /Users/adityasingh/.claude/projects/-Users-adityasingh-PersonalWork-HRMS/memory/hrms-product-scope.md and hrms-prd-only-until-told.md

KEY FACTS (from the founder's scoping decisions):
- India-first HRMS. Statutory payroll (EPF, ESI, state-wise PT, TDS/24Q, gratuity, LWF) is the CORE product, not an edge case.
- Beachhead: employers of 20-200 employees (50-200 carry revenue). EPF obligation turns on at 20 headcount.
- All three segments are the VISION (SMB, mid-market, enterprise) but v1 is the beachhead. The PRD must phase, not imply it all ships at once.
- Thesis: "the statutory FILING, not the payslip, is the unit of delivery." AI is architecture and cost-of-goods, NOT the revenue line (7 vendors already price HR AI at zero).
- Primary competitors: Darwinbox, Keka, greytHR, Zoho People/Payroll, Kredily, PeopleStrong, ZingHR, HROne.

RULES FOR YOUR WRITING:
- Output GitHub-flavored Markdown. Concrete, India-specific, quantified. NO filler, NO restating the brief, NO marketing fluff.
- Use ### subsections, GFM tables, and short lists. Use inline confidence markers **[Verified]** / **[Hypothesis]** / **[Killed]** where a claim's status matters (Hypotheses must carry a kill/validation criterion).
- Where a diagram belongs, insert a placeholder line exactly: <!-- DIAGRAM: <diagram-key> --> (a later step fills these).
- Every statutory or competitive claim needs a source cue (gazette/notified rule/filing/vendor page) — cite inline like (Source: EPFO notification, <date>) even if approximate; mark unverified ones **[Hypothesis]**.
- Target real depth: roughly 500-900 lines of genuine content for your section. Depth via specifics (edge cases, worked examples, acceptance criteria, Indian statutory detail), never repetition.
`

// ---- Section definitions (order matters for final assembly) ----
const SECTIONS = [
  { n: '01', key: 'exec-summary', title: 'Executive Summary & Vision',
    brief: 'One-page thesis, the two contrarian findings (AI priced to zero; enterprise procurement closed ~3 yrs), product-in-a-sentence, target user, the "filing is the unit of delivery" positioning, how to read this doc, document metadata. DIAGRAM: none or phasing-roadmap teaser.' },
  { n: '02', key: 'evidence-ledger', title: 'Evidence Register & Confidence Methodology',
    brief: 'How claims are graded (Verified/Hypothesis/Killed), the one-directional-retraction bias finding, the corrigendum standing rule, source-capture discipline, how the reader should discount medium/low confidence.' },
  { n: '03', key: 'personas-jtbd', title: 'Personas, Jobs-to-be-Done & User Segments',
    brief: 'Named personas: HR admin/generalist, payroll officer, CA/compliance consultant (channel + user), employee (incl. deskless/frontline), founder/CXO. For each: context, goals, pains, JTBD, success criteria, day-in-the-life. Segment matrix by headcount band. DIAGRAM: personas-map.' },
  { n: '04', key: 'problem-market', title: 'Problem Statement & Market Sizing',
    brief: 'The problem (statutory burden, fragmented tools, bureau spend). TAM/SAM/SOM on a defensible denominator (registered employers by EPF/ESI bands — not inflated), current bureau/CA spend from filed accounts, competitive landscape and where obligation+budget+dissatisfaction overlap. DIAGRAM: competitive-map, market-funnel.' },
  { n: '05', key: 'scope-phasing', title: 'Scope Decision, Non-Committal Bands & Phasing',
    brief: 'Commit/decline table by headcount band with rationale; why enterprise cannot launch; v1 → v2 → vision phasing with entry/exit criteria per phase; module sequencing. DIAGRAM: phasing-roadmap.' },
  { n: '06', key: 'statutory-spine', title: 'The Statutory Compliance Spine',
    brief: 'CONSOLIDATED statutory register: EPF, ESI, state-wise Professional Tax, TDS/24Q (incl. the breaking file-format change), gratuity, LWF, the four Labour Codes and the Nov 2026 cliff. Each: what it is, who it binds, thresholds, filing cadence, penalties, data required, source citation, product implication. DIAGRAM: statutory-step-function, filing-calendar.' },
  { n: '07', key: 'fr-core-hr', title: 'Functional Requirements — Core HR System of Record',
    brief: 'Numbered FRs: employee master, org structure, lifecycle (hire→confirm→transfer→exit), documents, ESS/MSS, workflows/approvals. Each FR: description, acceptance criteria, priority (MoSCoW), phase. DIAGRAM: employee-lifecycle.' },
  { n: '08', key: 'fr-payroll', title: 'Functional Requirements — Payroll & Statutory Filing Engine',
    brief: 'Numbered FRs: comp/CTC structures, statutory computation (EPF/ESI/PT/TDS/gratuity/LWF), pay runs, arrears, reimbursements, payslips, Form 16/24Q, full-and-final, bank/NEFT files, audit trail. Worked calculation examples. Acceptance criteria. DIAGRAM: journey-run-payroll, journey-month-end-filing.' },
  { n: '09', key: 'fr-attendance', title: 'Functional Requirements — Attendance, Leave & Deskless',
    brief: 'Numbered FRs: attendance capture (biometric/geo/mobile/kiosk), shifts/rosters, leave policies, regularization, overtime per notified Rules, frontline/deskless constraints (low-connectivity, shared devices, vernacular). Acceptance criteria. DIAGRAM: attendance-engine.' },
  { n: '10', key: 'fr-talent', title: 'Functional Requirements — Talent (Recruiting & Performance)',
    brief: 'Numbered FRs for the talent wedge: recruiting (pipeline, job boards, the hard external dependency e.g. Naukri/LinkedIn), onboarding handoff, performance (goals/reviews). Mark monetisation-deferred items. Acceptance criteria.' },
  { n: '11', key: 'fr-benefits', title: 'Functional Requirements — Benefits Attach',
    brief: 'Build the benefits data model now, defer monetisation. FRs: benefits enrollment data, insurance/NPS/flexi-benefits attach points, partner integration surface. Why data-model-first. Acceptance criteria.' },
  { n: '12', key: 'ai-layer', title: 'AI Architecture — Assistant, Agents & Use Cases',
    brief: 'AI as architecture: the assistant, agentic task classes (query, draft, reconcile, file-prep), guardrails, human-in-loop for statutory actions, vernacular/deskless AI constraints, MCP/tool posture (own the data+tools, not the assistant). Concrete use cases with acceptance criteria. DIAGRAM: ai-router, ai-use-cases.' },
  { n: '13', key: 'ai-economics', title: 'AI Unit Economics & Provider Abstraction',
    brief: 'Cost model per task class, provider abstraction/router (Gemini Flash, Sarvam INR-native, others), the zero-anchor monetisation strategy, FX sensitivity (USD/INR at 90/95/100), token budgets, how AI stays COGS not price. DIAGRAM: none or cost-model.' },
  { n: '14', key: 'data-model', title: 'Data Model, Entities & Retention',
    brief: 'Core entities and relationships (employer, employee, comp, statutory IDs, pay-run, filing, attendance, document), an ER model, data-classification (PII/sensitive/regulated), retention & deletion policy under DPDP, multi-state effective-dated rule storage. DIAGRAM: data-model-erd.' },
  { n: '15', key: 'architecture', title: 'System Architecture & Multi-Tenancy',
    brief: 'Service topology, multi-tenancy model, statutory-rules engine (effective-dated, per-state), integration layer, event/audit backbone, deployment/residency. Non-code: components, responsibilities, data flows. DIAGRAM: architecture-overview, integration-topology, multitenancy.' },
  { n: '16', key: 'integrations-api', title: 'Integrations & External Interfaces',
    brief: 'Integrations: Tally, banks (NEFT/host-to-host), biometric devices, government portals (EPFO/ESIC/TRACES/PT), accounting, HRIS migration. For each: contract, data exchange, failure modes, fallback. API posture. DIAGRAM: integration-topology (shared).' },
  { n: '17', key: 'nfr', title: 'Non-Functional Requirements — Security, DPDP, Scale',
    brief: 'NFRs: security (authn/z, encryption, audit), DPDP Act + CERT-In obligations, data residency & provider abstraction, availability/SLAs, scale targets, performance, accessibility (WCAG), localization/vernacular, observability, disaster recovery. Each with a measurable target.' },
  { n: '18', key: 'pricing-gtm', title: 'Pricing Architecture, GTM & Channel',
    brief: 'Pricing floor and tiers (why-not-X for each free alternative), packaging, the filing-as-unit pricing, GTM motion, channel (CA/consultant console, Tally ecosystem), migration/switching strategy, land-and-expand. Mark hypotheses with kill criteria. DIAGRAM: pricing-tiers.' },
  { n: '19', key: 'metrics', title: 'Success Metrics & Instrumentation',
    brief: 'North-star metric, activation/retention/expansion KPIs, filing-accuracy and on-time-filing as core quality metrics, AI-cost-per-account, funnel metrics, leading vs lagging, instrumentation plan, targets per phase. DIAGRAM: metrics-tree.' },
  { n: '20', key: 'nongoals-validation-risk', title: 'Non-Goals, Validation Plan & Risk Register',
    brief: 'Non-goals & anti-recommendations; numbers permanently banned from models/decks (the Killed list); validation plan (each Hypothesis → named method, before-funding gate); risk register (risk → observable trigger → pre-agreed response). Tables. DIAGRAM: none.' },
]

// ---- Diagram definitions ----
const DIAGRAMS = [
  { key: 'phasing-roadmap', fmt: 'mermaid', spec: 'Timeline/gantt of v1 (beachhead 20-200, statutory spine + payroll) → v2 (200-2000 expansion, talent) → vision (enterprise, benefits monetisation, full AI). Show entry criteria per phase.' },
  { key: 'personas-map', fmt: 'svg', spec: '2x2 or grid positioning the 5 personas by (influence on purchase) x (daily usage). Clean, labeled, theme-neutral colors.' },
  { key: 'competitive-map', fmt: 'svg', spec: '2x2 positioning: x = statutory-filing depth (shallow→deep), y = price (free→premium). Plot Kredily, Zoho, greytHR, Keka, Darwinbox, PeopleStrong, and "us" in the deep-filing/mid-price quadrant.' },
  { key: 'market-funnel', fmt: 'mermaid', spec: 'Funnel: all registered employers → EPF/ESI-obligated (20+) → 20-200 band → reachable via CA/Tally channel → SOM. Approx numbers as hypotheses.' },
  { key: 'statutory-step-function', fmt: 'mermaid', spec: 'Step chart of compliance obligations turning on by headcount: 10 (PT/TDS), 20 (EPF), 10/20 (ESI by state), gratuity (5yr tenure), showing the "step function is the product spine".' },
  { key: 'filing-calendar', fmt: 'mermaid', spec: 'Monthly/annual statutory filing calendar: EPF ECR (monthly), ESI (monthly), PT (state cadence), TDS 24Q (quarterly), Form 16 (annual), etc. with due dates.' },
  { key: 'employee-lifecycle', fmt: 'mermaid', spec: 'State diagram: applicant → hired → onboarding → confirmed → (transfer/promotion loop) → resigned → FnF → alumni. Statutory touchpoints annotated.' },
  { key: 'journey-run-payroll', fmt: 'mermaid', spec: 'Sequence/flow of a monthly pay run: inputs (attendance, changes) → compute (statutory) → review/approve → payslips → bank file → filings. Human-in-loop gates.' },
  { key: 'journey-month-end-filing', fmt: 'mermaid', spec: 'Flow of month-end/quarter-end statutory filing: data assembly → validation → challan/return generation → portal submission → acknowledgment → audit trail.' },
  { key: 'attendance-engine', fmt: 'mermaid', spec: 'Flowchart: capture sources (biometric/geo/mobile/kiosk) → dedup/validate → shift/roster mapping → OT/leave rules (notified) → payroll input. Deskless low-connectivity path.' },
  { key: 'ai-router', fmt: 'mermaid', spec: 'Flowchart of the AI router: task classes → model selection (Gemini Flash / Sarvam INR / premium) → guardrails → human-in-loop for statutory actions → audit. Provider abstraction.' },
  { key: 'ai-use-cases', fmt: 'mermaid', spec: 'Mindmap/graph of AI use cases grouped by task class (query, draft, reconcile, file-prep, support), each tagged with value and risk level.' },
  { key: 'data-model-erd', fmt: 'mermaid', spec: 'erDiagram: Employer, Employee, CompensationStructure, StatutoryIdentifier, PayRun, Payslip, Filing, AttendanceRecord, LeaveBalance, Document, EffectiveDatedRule. Keys + relationships + cardinality.' },
  { key: 'architecture-overview', fmt: 'mermaid', spec: 'Component diagram: clients (web/mobile/kiosk) → API/gateway → services (core-hr, payroll, attendance, statutory-rules-engine, ai-orchestrator) → data stores → integration layer → external portals/banks. Note residency.' },
  { key: 'integration-topology', fmt: 'mermaid', spec: 'Integration map: platform at center; edges to Tally, banks (NEFT/H2H), biometric devices, EPFO/ESIC/TRACES/PT portals, job boards. Label protocol + failure fallback.' },
  { key: 'multitenancy', fmt: 'mermaid', spec: 'Multi-tenancy model: tenant isolation, shared statutory-rules engine (effective-dated, per-state), per-tenant data partition, residency boundary.' },
  { key: 'pricing-tiers', fmt: 'svg', spec: 'Pricing tier table/columns: Free (funnel <20), Beachhead (20-200 filing-based), Expansion (200-2000), with feature gates and the "why not the free alternative" note. Clean SVG.' },
  { key: 'metrics-tree', fmt: 'mermaid', spec: 'Metric tree: North-star (e.g. on-time statutory filings executed) → activation, retention, filing-accuracy, AI-cost/account, expansion. Leading/lagging tagged.' },
]

const SECTION_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['key', 'path', 'lines', 'summary'],
  properties: {
    key: { type: 'string' },
    path: { type: 'string' },
    lines: { type: 'integer' },
    summary: { type: 'string' },
  },
}

const DIAGRAM_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['key', 'path', 'fmt'],
  properties: {
    key: { type: 'string' },
    path: { type: 'string' },
    fmt: { type: 'string' },
  },
}

log(`Drafting ${SECTIONS.length} sections (draft -> deepen pipeline) and ${DIAGRAMS.length} diagrams.`)

// Sections: draft then deepen, pipelined (no barrier between stages)
const sectionResults = await pipeline(
  SECTIONS,
  (s) => agent(
    `${CONTEXT}\n\nYou are drafting ONE section of the HRMS PRD.\n\nSECTION ${s.n}: ${s.title}\nKEY: ${s.key}\nBRIEF: ${s.brief}\n\nFirst READ ${REPO}/PRD.md and the memory files named above for grounding. Then write this section as a self-contained Markdown fragment. Start with a level-2 heading: "## ${s.n}. ${s.title}". Use ### subsections, GFM tables, inline confidence markers, and <!-- DIAGRAM: key --> placeholders where the brief names diagrams. Aim for 500-900 lines of genuine, India-specific, quantified content. Write the file to ${SECT}/${s.key}.md (overwrite if present). Return the manifest entry.`,
    { label: `draft:${s.key}`, phase: 'Draft', agentType: 'general-purpose', schema: SECTION_SCHEMA }
  ),
  (drafted, s) => agent(
    `${CONTEXT}\n\nYou are the DEEPEN/REVIEW pass for section ${s.n} "${s.title}" of the HRMS PRD.\n\nREAD the current draft at ${SECT}/${s.key}.md. Improve it in place: (1) add depth where thin — concrete Indian statutory specifics, worked examples, edge cases, acceptance criteria; (2) ensure every Hypothesis has a kill/validation criterion and every statutory/competitive claim has a source cue; (3) fix inconsistencies with the existing PRD.md voice and facts; (4) keep or add <!-- DIAGRAM: key --> placeholders; (5) tighten filler. The result should be ~700+ lines of REAL content, no padding. Overwrite ${SECT}/${s.key}.md and return the manifest entry.`,
    { label: `deepen:${s.key}`, phase: 'Deepen', agentType: 'general-purpose', schema: SECTION_SCHEMA }
  ),
)

// Diagrams: parallel
const diagramResults = await parallel(
  DIAGRAMS.map((d) => () => {
    const outPath = d.fmt === 'svg' ? `${IMG}/${d.key}.svg` : `${DIAG}/${d.key}.mmd`
    const instr = d.fmt === 'svg'
      ? `Produce a clean, self-contained SVG (no external refs, no scripts) sized ~900x600, using theme-neutral colors that read on light and dark backgrounds (avoid pure white/black fills; use mid-tones with dark text). Write ONLY the SVG markup to ${outPath}.`
      : `Produce a valid Mermaid diagram (the diagram body only, no \`\`\` fences). Keep labels concise; ensure it parses. Write it to ${outPath}.`
    return agent(
      `${CONTEXT}\n\nCreate the diagram "${d.key}" (${d.fmt}).\nSPEC: ${d.spec}\n\n${instr}\nReturn the manifest entry.`,
      { label: `diagram:${d.key}`, phase: 'Diagrams', agentType: 'general-purpose', schema: DIAGRAM_SCHEMA }
    )
  })
)

return {
  sections: sectionResults.filter(Boolean),
  diagrams: diagramResults.filter(Boolean),
  order: SECTIONS.map((s) => ({ n: s.n, key: s.key, title: s.title })),
  diagramList: DIAGRAMS.map((d) => ({ key: d.key, fmt: d.fmt })),
}
