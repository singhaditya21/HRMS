export const meta = {
  name: 'hrms-prd-editorial',
  description: 'Consistency/editorial pass across all 20 PRD sections (preserve substance + placeholders)',
  phases: [{ title: 'Editorial' }],
}

const REPO = '/Users/adityasingh/PersonalWork/HRMS'
const SECT = `${REPO}/prd_build/sections`

// Canonical section map — the single source of truth for cross-references.
const MAP = [
  ['01', 'exec-summary', 'Executive Summary & Vision'],
  ['02', 'evidence-ledger', 'Evidence Register & Confidence Methodology'],
  ['03', 'personas-jtbd', 'Personas, Jobs-to-be-Done & User Segments'],
  ['04', 'problem-market', 'Problem Statement & Market Sizing'],
  ['05', 'scope-phasing', 'Scope Decision, Non-Committal Bands & Phasing'],
  ['06', 'statutory-spine', 'The Statutory Compliance Spine'],
  ['07', 'fr-core-hr', 'Functional Requirements — Core HR System of Record'],
  ['08', 'fr-payroll', 'Functional Requirements — Payroll & Statutory Filing Engine'],
  ['09', 'fr-attendance', 'Functional Requirements — Attendance, Leave & Deskless'],
  ['10', 'fr-talent', 'Functional Requirements — Talent (Recruiting & Performance)'],
  ['11', 'fr-benefits', 'Functional Requirements — Benefits Attach'],
  ['12', 'ai-layer', 'AI Architecture — Assistant, Agents & Use Cases'],
  ['13', 'ai-economics', 'AI Unit Economics & Provider Abstraction'],
  ['14', 'data-model', 'Data Model, Entities & Retention'],
  ['15', 'architecture', 'System Architecture & Multi-Tenancy'],
  ['16', 'integrations-api', 'Integrations & External Interfaces'],
  ['17', 'nfr', 'Non-Functional Requirements — Security, DPDP, Scale'],
  ['18', 'pricing-gtm', 'Pricing Architecture, GTM & Channel'],
  ['19', 'metrics', 'Success Metrics & Instrumentation'],
  ['20', 'nongoals-validation-risk', 'Non-Goals, Validation Plan & Risk Register'],
]

const MAP_TEXT = MAP.map(([n, , t]) => `  §${n} — ${t}`).join('\n')

const SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['key', 'lines', 'changes'],
  properties: {
    key: { type: 'string' },
    lines: { type: 'integer' },
    changes: { type: 'string' },
  },
}

log(`Editorial/consistency pass across ${MAP.length} sections.`)

const results = await parallel(MAP.map(([n, key, title]) => () => agent(
  `You are the CONSISTENCY EDITOR for the "Filing-First HRMS" PRD. You are editing ONE section IN PLACE. This is a light editorial pass, NOT a rewrite.\n\n` +
  `CANONICAL SECTION MAP (the ONLY correct section numbers/titles — fix any cross-reference that disagrees):\n${MAP_TEXT}\n\n` +
  `YOUR SECTION: §${n} "${title}"  ->  file: ${SECT}/${key}.md\n\n` +
  `Also read ${REPO}/PRD.md (original Draft 1) for canonical Verified facts (e.g. denominator 7,66,254 employers; greytHR ~4.4% share; ₹52/₹126 PEPM; the Nov-2026 EPF cliff; TDS Form 138 breaking change).\n\n` +
  `MAKE ONLY THESE EDITS:\n` +
  `1. Fix every cross-reference to another section so it cites the correct §number and matches the canonical title/topic (e.g. payroll is §8, attendance §9, AI economics §13, metrics §19, validation/risk §20).\n` +
  `2. Correct any statutory or market figure that contradicts PRD.md's Verified facts or another section; if two figures genuinely differ and you cannot tell which is right, mark the claim **[Hypothesis]** with a note rather than picking silently.\n` +
  `3. Remove only clearly duplicated boilerplate that belongs in another section; replace with a one-line cross-reference. Do NOT cut substantive, section-specific content.\n` +
  `4. Ensure the section still begins with exactly "## ${n}. ${title}" as its top heading.\n` +
  `5. PRESERVE every <!-- DIAGRAM: key --> placeholder exactly, every GFM table, and every [Verified]/[Hypothesis]/[Killed] marker. Do not shorten the section meaningfully — it should stay within ~10% of its current length.\n\n` +
  `Overwrite ${SECT}/${key}.md with the corrected version. Return {key, lines (final line count), changes (2-4 sentence summary of what you fixed)}.`,
  { label: `edit:${key}`, phase: 'Editorial', agentType: 'general-purpose', schema: SCHEMA }
)))

return { edited: results.filter(Boolean) }
