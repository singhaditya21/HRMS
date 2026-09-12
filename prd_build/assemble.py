#!/usr/bin/env python3
"""Assemble the Filing-First HRMS PRD from section fragments + diagrams into PRD.md."""
import os, re, sys, glob

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # repo root, derived from this file
SECT = os.path.join(REPO, "prd_build", "sections")
DIAG = os.path.join(REPO, "prd_build", "diagrams")
IMG = os.path.join(REPO, "images")
OUT = os.path.join(REPO, "PRD.md")
if any(a.startswith("-") for a in sys.argv[1:]):
    sys.exit("usage: assemble.py <version> <date>   (no flags; writes PRD.md)")
VERSION = sys.argv[1] if len(sys.argv) > 1 else "v0.2"
DATE = sys.argv[2] if len(sys.argv) > 2 else "2026-09-10"

FINAL = VERSION.startswith("v1")
STATUS = ("Final — build-ready for everything marked [Verified]; commercial hypotheses gated by the §20 validation plan; legal items gated by the §23 counsel register"
          if FINAL else "Draft — for validation (see §20)")
INTRO = ("_Built from five adversarial research rounds (roughly 230 claims retracted along the way) and a corrections ledger that every section was reconciled against. "
         "Every statutory and competitive claim carries an evidence ID registered in §02; every hypothesis carries a validation or kill criterion in §20; every legal point that needs counsel is logged in §23. "
         "Nothing here is legal advice. Figures are GitHub-rendered Mermaid unless noted as SVG._"
         if FINAL else
         "_This document expands the original research draft into a full PRD. Every statutory and competitive claim carries a source cue; every hypothesis carries a validation/kill criterion (consolidated in §20). Figures are GitHub-rendered Mermaid unless noted as SVG._")

# Section order (must match the workflow SECTIONS order)
ORDER = [
    ("01", "exec-summary", "Executive Summary & Vision"),
    ("02", "evidence-ledger", "Evidence Register & Confidence Methodology"),
    ("03", "personas-jtbd", "Personas, Jobs-to-be-Done & User Segments"),
    ("04", "problem-market", "Problem Statement & Market Sizing"),
    ("05", "scope-phasing", "Scope Decision, Non-Committal Bands & Phasing"),
    ("06", "statutory-spine", "The Statutory Compliance Spine"),
    ("07", "fr-core-hr", "Functional Requirements — Core HR System of Record"),
    ("08", "fr-payroll", "Functional Requirements — Payroll & Statutory Filing Engine"),
    ("09", "fr-attendance", "Functional Requirements — Attendance, Leave & Deskless"),
    ("10", "fr-talent", "Functional Requirements — Talent (Recruiting & Performance)"),
    ("11", "fr-benefits", "Functional Requirements — Benefits Attach"),
    ("12", "ai-layer", "AI Architecture — Assistant, Agents & Use Cases"),
    ("13", "ai-economics", "AI Unit Economics & Provider Abstraction"),
    ("14", "data-model", "Data Model, Entities & Retention"),
    ("15", "architecture", "System Architecture & Multi-Tenancy"),
    ("16", "integrations-api", "Integrations & External Interfaces"),
    ("17", "nfr", "Non-Functional Requirements — Security, DPDP, Scale"),
    ("18", "pricing-gtm", "Pricing Architecture, GTM & Channel"),
    ("19", "metrics", "Success Metrics & Instrumentation"),
    ("20", "nongoals-validation-risk", "Non-Goals, Validation Plan & Risk Register"),
    ("21", "competitive-landscape", "Competitive Landscape & Parity"),
    ("22", "compliance-operations", "Compliance Operations — Attended Filing & the Compliance Data Pipeline"),
    ("23", "legal-regulatory", "Legal & Regulatory Compliance"),
]

def slug(t):
    s = t.lower()
    s = s.replace("&", "").replace("—", "-")
    s = re.sub(r"[^a-z0-9 -]", "", s)
    s = re.sub(r"\s+", "-", s).strip("-")
    s = re.sub(r"-+", "-", s)
    return s

figures = []  # (fig_no, title, key)
missing = []
fig_counter = [0]

# Alias keys that reuse an existing diagram rather than a dedicated asset.
ALIAS = {
    "positioning-2x2": "competitive-map",
    "monthly-filing-calendar": "filing-calendar",
    "phasing-roadmap-teaser": "phasing-roadmap",
    "cost-model": "fx-sensitivity",
    "filing-lifecycle-states": "filing-lifecycle-state-machine",
}

def diagram_title(key):
    return key.replace("-", " ").title()

def embed(key):
    key = ALIAS.get(key, key)
    mmd = os.path.join(DIAG, key + ".mmd")
    svg = os.path.join(IMG, key + ".svg")
    fig_counter[0] += 1
    n = fig_counter[0]
    title = diagram_title(key)
    figures.append((n, title, key))
    cap = f"\n\n**Figure {n}. {title}**\n\n"
    if os.path.exists(mmd):
        body = open(mmd, encoding="utf-8").read().strip()
        # strip accidental fences
        body = re.sub(r"^```[a-zA-Z]*\n?", "", body)
        body = re.sub(r"\n?```$", "", body).strip()
        return cap + "```mermaid\n" + body + "\n```\n"
    if os.path.exists(svg):
        return cap + f"![{title}](images/{key}.svg)\n"
    # no asset — drop placeholder, record
    fig_counter[0] -= 1
    figures.pop()
    missing.append(key)
    return ""

PLACE = re.compile(r"[ \t]*<!-- DIAGRAM: ([a-z0-9-]+) -->[ \t]*")

body_parts = []
toc = []
for n, key, title in ORDER:
    path = os.path.join(SECT, key + ".md")
    if not os.path.exists(path):
        sys.stderr.write(f"MISSING SECTION FILE: {key}\n"); continue
    txt = open(path, encoding="utf-8").read().rstrip() + "\n"
    # ensure the section starts with an H2 heading we can anchor
    txt = PLACE.sub(lambda m: embed(m.group(1)), txt)
    toc.append(f"- [{n}. {title}](#{slug(f'{n}. {title}')})")
    body_parts.append(txt.strip() + "\n")

header = f"""# Filing-First HRMS — Product Requirements Document

> **An AI-native HR & payroll system for Indian employers of 20–200, where the statutory _filing_ — not the payslip — is the unit of delivery.**

| | |
|---|---|
| **Version** | {VERSION} |
| **Date** | {DATE} |
| **Status** | {STATUS} |
| **Confidence markers** | **[Verified]** primary-source · **[Hypothesis]** unvalidated, carries kill criterion · **[Killed]** disproven |
| **Sections** | {len(ORDER)} |

{INTRO}

---

## Table of Contents

""" + "\n".join(toc) + "\n\n---\n"

doc = header + "\n" + "\n\n---\n\n".join(body_parts)

# Appendix: list of figures
if figures:
    lof = "\n\n---\n\n## Appendix A — List of Figures\n\n"
    lof += "\n".join(f"{i}. **{t}** (`{k}`)" for i, t, k in figures) + "\n"
    doc += lof

with open(OUT, "w", encoding="utf-8") as f:
    f.write(doc)

nlines = doc.count("\n") + 1
print(f"WROTE {OUT}")
print(f"lines={nlines} sections={len(body_parts)} figures_embedded={len(figures)} missing_assets={len(missing)}")
if missing:
    print("MISSING (placeholder dropped):", ", ".join(sorted(set(missing))))
