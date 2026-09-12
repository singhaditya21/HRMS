export const meta = {
  name: 'hrms-prd-diagrams-2',
  description: 'Generate the remaining section-specific PRD diagrams as GitHub-renderable Mermaid',
  phases: [{ title: 'Diagrams2' }],
}

const REPO = '/Users/adityasingh/PersonalWork/HRMS'
const SECT = `${REPO}/prd_build/sections`
const DIAG = `${REPO}/prd_build/diagrams`

let items = args
if (typeof items === 'string') { try { items = JSON.parse(items) } catch (e) { items = [] } }
if (!Array.isArray(items)) items = []

const SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['key', 'path', 'diagramType'],
  properties: {
    key: { type: 'string' },
    path: { type: 'string' },
    diagramType: { type: 'string' },
  },
}

log(`Generating ${items.length} section-specific Mermaid diagrams.`)

const results = await parallel(items.map((it) => () => agent(
  `You are creating one diagram for the "Filing-First HRMS" PRD (an India-first HR/payroll product; the statutory FILING is the unit of delivery).\n\n` +
  `DIAGRAM KEY: ${it.key}\n` +
  `It is referenced by a placeholder "<!-- DIAGRAM: ${it.key} -->" inside the section file:\n  ${SECT}/${it.section}.md\n\n` +
  `STEPS:\n` +
  `1. Read ${SECT}/${it.section}.md and locate the placeholder(s) for "${it.key}". Read the surrounding subsection to understand exactly what the diagram must convey.\n` +
  `2. Design a Mermaid diagram that captures that content faithfully and specifically (use the real entities, states, steps, or Indian statutory specifics from the section — not a generic placeholder).\n` +
  `3. Choose a diagram type that GitHub renders natively: flowchart/graph, sequenceDiagram, stateDiagram-v2, erDiagram, gantt, timeline, or mindmap. Do NOT use experimental types (xychart, quadrantChart, sankey) — for a histogram/scoreboard/heatmap/catalogue, represent it as a labeled flowchart or table-like graph instead.\n` +
  `4. Keep labels concise; escape problematic characters; ensure it PARSES. Output the diagram body ONLY — no \\\`\\\`\\\` fences, no prose.\n` +
  `5. Write the diagram to ${DIAG}/${it.key}.mmd and return the manifest entry.`,
  { label: `diag2:${it.key}`, phase: 'Diagrams2', agentType: 'general-purpose', schema: SCHEMA }
)))

return { generated: results.filter(Boolean), count: results.filter(Boolean).length }
