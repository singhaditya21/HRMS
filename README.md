# Filing-First HRMS

An AI-native HR and payroll system for Indian employers of 20–200 people, where the statutory **filing** — not the payslip — is the unit of delivery.

## Status

**Product definition stage.** The repository holds the product requirements document; there is no application code yet, by design.

## The PRD

[`PRD.md`](PRD.md) is the canonical document. Every version is committed and tagged (`v0.1` … `v1.0`).

| Part | Sections |
|---|---|
| Why and for whom | §01 Executive summary · §02 Evidence register · §03 Personas · §04 Problem & market · §05 Scope & phasing |
| The statutory core | §06 Statutory compliance spine |
| What the product does | §07–§11 Functional requirements (core HR, payroll & filing, attendance, talent, benefits) |
| How it is built | §12–§13 AI layer & economics · §14 Data model · §15 Architecture · §16 Integrations · §17 NFRs |
| How it is sold and measured | §18 Pricing & GTM · §19 Metrics |
| What could go wrong | §20 Non-goals, validation plan & risk register |
| Reference | §21 Competitive landscape · §22 Compliance operations · §23 Legal & regulatory |

Claims carry confidence markers — **[Verified]**, **[Hypothesis]**, **[Killed]**, **[Reversed]** — and evidence IDs registered in §02. Nothing in the PRD is legal advice; items that need counsel are logged in §23.

## How the PRD is built

`PRD.md` is assembled from per-section sources in `prd_build/` (not committed): `sections/*.md`, Mermaid diagrams in `diagrams/*.mmd`, and `assemble.py`. Edit the sources, then rebuild:

```bash
python3 prd_build/assemble.py v1.0 2026-09-11
```

```bash
node prd_build/tools/validate_mmd.mjs prd_build/diagrams
```

```bash
python3 prd_build/tools/check_prd.py
```

The validator parses every diagram with Mermaid 11.12.0 and also lints for `;` inside state and sequence labels, which Mermaid accepts silently but renders as a stray transition. The checker verifies that every `§` reference resolves, every cited evidence ID is registered, and no requirement ID is defined twice.
