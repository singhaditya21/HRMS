export const meta = {
  name: 'prd-finalize-v1',
  description: 'Finalise the HRMS PRD: 23 sections x (correct -> verify -> deepen -> verify) against the corrections ledger',
  phases: [
    { title: 'Correct', detail: 'apply kill list, architecture fixes and verified facts; author the 3 new sections' },
    { title: 'Verify', detail: 'adversarial check of corrections, fix in place' },
    { title: 'Deepen', detail: 'specification depth to the line target' },
    { title: 'Final check', detail: 'fabrication hunt, IDs, refs, diagrams, fix in place' },
  ],
}

const ROOT = '/Users/adityasingh/PersonalWork/HRMS/prd_build'
const LEDGER = `${ROOT}/LEDGER.md`
const VALIDATE = `node ${ROOT}/tools/validate_mmd.mjs`

const SECTIONS = [
  { n: '01', key: 'exec-summary', title: 'Executive Summary & Vision', target: 1000 },
  { n: '02', key: 'evidence-ledger', title: 'Evidence Register & Confidence Methodology', target: 2400 },
  { n: '03', key: 'personas-jtbd', title: 'Personas, Jobs-to-be-Done & User Segments', target: 2200 },
  { n: '04', key: 'problem-market', title: 'Problem Statement & Market Sizing', target: 1900 },
  { n: '05', key: 'scope-phasing', title: 'Scope Decision, Non-Committal Bands & Phasing', target: 2600 },
  { n: '06', key: 'statutory-spine', title: 'The Statutory Compliance Spine', target: 3200 },
  { n: '07', key: 'fr-core-hr', title: 'Functional Requirements — Core HR System of Record', target: 2300 },
  { n: '08', key: 'fr-payroll', title: 'Functional Requirements — Payroll & Statutory Filing Engine', target: 3600 },
  { n: '09', key: 'fr-attendance', title: 'Functional Requirements — Attendance, Leave & Deskless', target: 3000 },
  { n: '10', key: 'fr-talent', title: 'Functional Requirements — Talent (Recruiting & Performance)', target: 2700 },
  { n: '11', key: 'fr-benefits', title: 'Functional Requirements — Benefits Attach', target: 2100 },
  { n: '12', key: 'ai-layer', title: 'AI Architecture — Assistant, Agents & Use Cases', target: 2500 },
  { n: '13', key: 'ai-economics', title: 'AI Unit Economics & Provider Abstraction', target: 1700 },
  { n: '14', key: 'data-model', title: 'Data Model, Entities & Retention', target: 2900 },
  { n: '15', key: 'architecture', title: 'System Architecture & Multi-Tenancy', target: 2300 },
  { n: '16', key: 'integrations-api', title: 'Integrations & External Interfaces', target: 2500 },
  { n: '17', key: 'nfr', title: 'Non-Functional Requirements — Security, DPDP, Scale', target: 2500 },
  { n: '18', key: 'pricing-gtm', title: 'Pricing Architecture, GTM & Channel', target: 1900 },
  { n: '19', key: 'metrics', title: 'Success Metrics & Instrumentation', target: 1700 },
  { n: '20', key: 'nongoals-validation-risk', title: 'Non-Goals, Validation Plan & Risk Register', target: 2000 },
  { n: '21', key: 'competitive-landscape', title: 'Competitive Landscape & Parity', target: 2200, isNew: true },
  { n: '22', key: 'compliance-operations', title: 'Compliance Operations — Attended Filing & the Compliance Data Pipeline', target: 2400, isNew: true },
  { n: '23', key: 'legal-regulatory', title: 'Legal & Regulatory Compliance', target: 2700, isNew: true },
]

const RESULT = {
  type: 'object',
  properties: {
    section: { type: 'string' },
    stage: { type: 'string' },
    lines_before: { type: 'number' },
    lines_after: { type: 'number' },
    k_items_fixed: { type: 'array', items: { type: 'string' } },
    ev_ids_cited: { type: 'array', items: { type: 'string' } },
    diagrams_created: { type: 'array', items: { type: 'string' } },
    diagrams_validation: { type: 'string', description: 'last line of validator output, e.g. "7/7 passed"' },
    problems_fixed: { type: 'array', items: { type: 'string' } },
    open_issues: { type: 'array', items: { type: 'string' } },
    summary: { type: 'string' },
  },
  required: ['section', 'stage', 'lines_after', 'summary'],
}

const common = (s) => `You are finalising §${s.n} "${s.title}" of the Filing-First HRMS PRD — an AI-native HR and payroll product for Indian employers of 20–200 people. Today is 11 September 2026.

FILES
- Corrections ledger — READ IT IN FULL FIRST, it overrides the current text: ${LEDGER}
- Your section file (the ONLY section file you may edit): ${ROOT}/sections/${s.key}.md
- Diagrams: ${ROOT}/diagrams/<key>.mmd, embedded in sections via <!-- DIAGRAM: key --> on its own line. You may create diagrams whose key starts with "${s.key}-" and edit diagrams referenced only by your section. Never edit the shared diagrams listed in LEDGER Part F.
- Research with full citations: ${ROOT}/research/r1 … r5 (later rounds win). Read the files your brief's EV entries name whenever you need detail.
- Validate diagrams: ${VALIDATE} <file.mmd> [more files]  — must end "N/N passed".
- Other sections (read-only, for consistency): ${ROOT}/sections/*.md

Your brief is the §${s.n} row of LEDGER Part F. Follow LEDGER Parts A–E throughout.

HARD RULES: edit only your own section file and your own diagrams; use targeted edits and insertions, never rewrite the file wholesale; never invent a number, rate, section/rule/form number, date, price, file field or competitor feature — if the ledger and research do not give it, make it a named configurable parameter and route it to §20; follow LEDGER Part D for anything legal; keep the section's existing requirement-ID format and continue numbering from its current maximum.

Return the structured summary (section "${s.n}"). Keep it short — the work is in the file, not the summary.`

const stage1 = (s) => s.isNew
  ? `${common(s)}

STAGE 1 of 4 — AUTHOR THE NEW SECTION.
The file does not exist yet. Create ${ROOT}/sections/${s.key}.md starting with the exact heading line:
## ${s.n}. ${s.title}
Write the complete section as specified in your LEDGER Part F brief, grounded entirely in LEDGER Parts B–E and the research files, citing EV-ids. Use ### ${s.n}.1, ### ${s.n}.2 … subsections. Aim for roughly 60% of the ${s.target}-line target in this stage — stage 3 deepens it. Include at least 3 diagrams (keys "${s.key}-…"), validated. Where this section overlaps an existing one, write the canonical treatment here and keep it consistent with that section; do not edit the other file.`
  : `${common(s)}

STAGE 1 of 4 — CORRECTNESS.
1. Search your section for EVERY wrong claim in LEDGER Part B (not only the K-items your brief lists) and fix each one where it appears — replace the wrong content, don't merely append a correction. Where the PRD previously concluded something now reversed, mark it [Reversed] with a one-line reason.
2. Apply the LEDGER Part E architecture corrections your brief lists.
3. Integrate the Part C facts your brief names, cited by EV-id, where they belong.
4. Fix any cross-reference that is unpadded or points at an earlier draft's numbering.
5. Do NOT expand for length in this stage — correctness only.
Validate every diagram you touched.`

const stage2 = (s) => `${common(s)}

STAGE 2 of 4 — ADVERSARIAL CHECK OF STAGE 1, THEN FIX.
Assume stage 1 missed things. Re-read LEDGER Parts A–E. Then:
1. For every Part B item, search the whole section file for the wrong claim (search several phrasings, numbers and names). Anything still present: fix it.
2. Check every number, citation, section/rule/form number and date in the file against the ledger or the research file it would come from. Anything that traces to neither: correct it, or turn it into a named configurable parameter routed to §20.
3. Check Part D compliance sentence by sentence for anything legal.
4. Validate every diagram your section references (grep the <!-- DIAGRAM: --> keys) and fix failures in diagrams you own.
5. ${s.isNew ? 'Confirm the file starts with the exact heading "## ' + s.n + '. ' + s.title + '" and covers every element of the brief.' : 'Confirm no correct content was lost in stage 1.'}
Fix problems directly in the file. List what you fixed.`

const stage3 = (s) => `${common(s)}

STAGE 3 of 4 — SPECIFICATION DEPTH TO THE TARGET.
Bring the section to AT LEAST ${s.target} lines (check with: wc -l ${ROOT}/sections/${s.key}.md) by adding the "Add / deepen" content in your LEDGER Part F brief, written as specification a build team can use: requirements with acceptance criteria, data definitions, decision tables, state/transition tables, worked examples with real rupee arithmetic drawn only from ledger figures, edge cases, negative cases, test scenarios, and diagrams.
- Add at least 3 new diagrams (keys "${s.key}-…", validated), placed next to the text they illustrate.
- Insert new subsections in logical positions; keep ### numbering consistent.
- NO padding, NO repetition, NO restating other sections' content (cross-reference them instead), NO filler lists. A reviewer will delete padding and you will have wasted the effort.
- NO new facts beyond the ledger and research. Where a specification needs a value you do not have, define it as a named configurable parameter with its owner and route it to §20.
- Never delete existing correct content. Never rewrite the file wholesale.
Before finishing, record the list of ### headings and the line count.`

const stage4 = (s) => `${common(s)}

STAGE 4 of 4 — FINAL CHECK, THEN FIX.
Review everything added in stage 3 with hostility:
1. Fabricated precision: every number, rupee amount, percentage, date, section/rule/form number, file field and competitor statement must trace to the ledger or research, or be clearly a named configurable parameter. Fix or remove anything that doesn't.
2. Padding and repetition: delete filler, restated material and duplicated tables. If this drops the section below ${s.target} lines, add genuine specification to replace it — never keep padding.
3. IDs: requirement IDs unique within the section and in the section's format; EV-ids cited exist in LEDGER Part C or the existing register.
4. Cross-references: §NN / §NN.M zero-padded, pointing to the right section of THIS PRD (01–23).
5. Diagrams: run the validator on every diagram your section references — all must pass.
6. Headings: the section starts with "## ${s.n}. ${s.title}" (or its existing H2), and subsections are consistently numbered.
7. Part D: nothing legal asserted beyond what Part D allows.
Fix everything directly. Report final line count and validator result.`

phase('Correct')
log('23 sections through correct -> verify -> deepen -> final check')

const results = await pipeline(
  SECTIONS,
  (s) => agent(stage1(s), { label: `§${s.n} correct`, phase: 'Correct', schema: RESULT }),
  (r, s) => agent(stage2(s), { label: `§${s.n} verify`, phase: 'Verify', schema: RESULT, effort: 'high' }).then((v) => ({ s1: r, s2: v })),
  (acc, s) => agent(stage3(s), { label: `§${s.n} deepen`, phase: 'Deepen', schema: RESULT }).then((v) => ({ ...acc, s3: v })),
  (acc, s) => agent(stage4(s), { label: `§${s.n} final`, phase: 'Final check', schema: RESULT, effort: 'high' }).then((v) => ({ ...acc, s4: v })),
)

const table = SECTIONS.map((s, i) => {
  const r = results[i]
  if (!r) return { section: s.n, key: s.key, status: 'FAILED' }
  return {
    section: s.n, key: s.key, target: s.target,
    lines_final: r.s4 ? r.s4.lines_after : (r.s3 ? r.s3.lines_after : null),
    validation: r.s4 ? r.s4.diagrams_validation : null,
    k_fixed: [...new Set([...(r.s1?.k_items_fixed || []), ...(r.s2?.k_items_fixed || []), ...(r.s4?.k_items_fixed || [])])],
    diagrams_new: [...new Set([...(r.s1?.diagrams_created || []), ...(r.s3?.diagrams_created || []), ...(r.s4?.diagrams_created || [])])].length,
    open_issues: [...(r.s2?.open_issues || []), ...(r.s4?.open_issues || [])],
    final_summary: r.s4?.summary || r.s3?.summary || '',
  }
})
const failed = table.filter((t) => t.status === 'FAILED').map((t) => t.section)
if (failed.length) log(`WARNING: sections failed and need a rerun: ${failed.join(', ')}`)
return { table, failed }
