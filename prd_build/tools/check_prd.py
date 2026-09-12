#!/usr/bin/env python3
"""Whole-document checks for the assembled PRD.md. Run after assemble.py.

Checks: size and figures; every § cross-reference resolves; every cited EV-id is
registered in §02; no requirement ID is defined twice; kill-list residue; diagram
placeholders all resolve. Exit 0 when there are no hard failures.
"""
import re, sys, os, collections

REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))  # repo root, derived from this file
PRD = os.path.join(REPO, "PRD.md")
SECT = os.path.join(REPO, "prd_build", "sections")
DIAG = os.path.join(REPO, "prd_build", "diagrams")

doc = open(PRD, encoding="utf-8").read()
lines = doc.split("\n")
hard, soft = [], []

# --- 1. size -------------------------------------------------------------
n_lines = len(lines)
n_fig = len(re.findall(r"^\*\*Figure \d+\.", doc, re.M))
n_mmd = doc.count("```mermaid")
print(f"lines={n_lines:,}  figures={n_fig}  mermaid_blocks={n_mmd}")

# --- 2. § cross-references ----------------------------------------------
h2 = {m.group(1) for m in re.finditer(r"^## (\d{2})\. ", doc, re.M)}
h3 = {(int(a), int(b)) for a, b in re.findall(r"^### (\d{1,2})\.(\d+)\b", doc, re.M)}
styles = collections.Counter("padded" if len(a) == 2 else "unpadded" for a in re.findall(r"^### (\d{1,2})\.\d+\b", doc, re.M))
bad_sec, bad_sub, unpadded = collections.Counter(), collections.Counter(), collections.Counter()
for m in re.finditer(r"§\s?(\d{1,2})((?:\.\d+)*)", doc):
    top, sub = m.group(1), m.group(2)
    if len(top) == 1:
        unpadded[f"§{top}{sub}"] += 1
    top2 = top.zfill(2)
    if top2 not in h2:
        bad_sec[f"§{top}{sub}"] += 1
    elif sub:
        first = sub.split(".")[1]
        if (int(top2), int(first)) not in h3:
            bad_sub[f"§{top2}.{first}"] += 1
if bad_sec:
    hard.append(f"§ refs to non-existent sections: {dict(bad_sec.most_common(15))}")
if bad_sub:
    soft.append(f"§ refs to non-existent subsections ({sum(bad_sub.values())}): {dict(bad_sub.most_common(15))}")
if len(styles) > 1:
    soft.append(f"mixed subsection heading styles: {dict(styles)} — normalise to '### NN.M'")
if unpadded:
    soft.append(f"unpadded § refs ({sum(unpadded.values())}): {dict(unpadded.most_common(10))}")

# --- 3. EV ids --------------------------------------------------------------
registered = set(re.findall(r"^\|\s*\**(EV-K?\d{2,3})\**\s*\|", doc, re.M))
cited = collections.Counter(re.findall(r"\bEV-K?\d{1,3}\b", doc))
undefined = {k: v for k, v in cited.items() if k not in registered}
malformed = {k: v for k, v in cited.items() if re.fullmatch(r"EV-\d", k)}
print(f"EV registered={len(registered)}  EV cited (distinct)={len(cited)}")
if undefined:
    hard.append(f"EV-ids cited but not registered in §02 ({len(undefined)}): {sorted(undefined)[:30]}")
if malformed:
    soft.append(f"malformed EV-ids: {malformed}")

# --- 4. requirement IDs defined twice -------------------------------------
defs = collections.Counter()
for ln in lines:
    m = re.match(r"^\s*(?:\|\s*)?\*\*((?:FR|NFR)-[A-Z]+(?:-[A-Z]+)?-?\d+(?:-[A-Za-z]+)?)(?=\*\*|\s|\b)", ln)
    if m:
        defs[m.group(1)] += 1
dupes = {k: v for k, v in defs.items() if v > 1}
print(f"requirement IDs defined={len(defs)}")
if dupes:
    hard.append(f"requirement IDs defined more than once ({len(dupes)}): {dict(list(dupes.items())[:20])}")

# --- 5. kill-list residue (review each hit; [Killed]/[Reversed] framing is fine) ---
KILL = {
    "K-01 Frappe PT/LWF coverage": r"[Ff]rappe[^\n]{0,120}(15\+ states|across 14|14 states)",
    "K-02 93-99% margin": r"93\s*[–-]\s*99\s*%",
    "K-04 144 OT as verified": r"144 (OT|overtime)[^\n]{0,80}\[Verified\]|\[Verified\][^\n]{0,80}144 (OT|overtime)",
    "K-05 Board fines Nov 2026": r"(fine|penalt)[^\n]{0,40}(November|Nov) 2026",
    "K-07 72-hour Indian clock": r"72[- ]hour[^\n]{0,80}(India|CERT)",
    "K-11 RPwD s.20 private": r"(RPwD|Rights of Persons)[^\n]{0,60}s\.\s?20\b",
    "K-13 we file for you": r"we file (it )?for you|file on (your|the customer'?s) behalf automatically",
    "K-16 34,000 undated": r"34,000\+? (customers|companies)",
    "K-17 renewal below list": r"renewal[^\n]{0,40}(below|lower than) list",
    "K-09 single price ceiling": r"₹\s?45\s*[–-]\s*50",
    "K-23 Tally sole incumbent": r"Tally is the (true |real |only )?incumbent",
    "EV-035 delimiter length": r"(four|4)[- ]char[a-z]*[^\n]{0,40}#~#|#~#[^\n]{0,40}(four|4)[- ]char",
    "EV-058 date precision": r"(?<!about )(?<!~)\b14 May 2027",
}
for name, rx in KILL.items():
    hits = [(i + 1, l.strip()) for i, l in enumerate(lines) if re.search(rx, l)]
    flagged = [h for h in hits if not re.search(r"\[(Killed|Reversed)\]|Killed|Reversed|false|FALSE|wrong|withdrawn", h[1])]
    if flagged:
        soft.append(f"{name}: {len(flagged)} unframed hit(s) e.g. L{flagged[0][0]}: {flagged[0][1][:140]}")

# --- 6. placeholders -------------------------------------------------------
ALIAS = {}
_asm = open(os.path.join(REPO, "prd_build", "assemble.py"), encoding="utf-8").read()
_m = re.search(r"ALIAS = \{(.*?)\}", _asm, re.S)
if _m:
    ALIAS = dict(re.findall(r'"([a-z0-9-]+)":\s*"([a-z0-9-]+)"', _m.group(1)))
missing = []
for f in sorted(os.listdir(SECT)):
    if not f.endswith(".md"):
        continue
    for key in re.findall(r"<!-- DIAGRAM: ([a-z0-9-]+) -->", open(os.path.join(SECT, f), encoding="utf-8").read()):
        key = ALIAS.get(key, key)
        if not (os.path.exists(os.path.join(DIAG, key + ".mmd")) or os.path.exists(os.path.join(REPO, "images", key + ".svg"))):
            missing.append(f"{f}:{key}")
if missing:
    soft.append(f"diagram placeholders with no asset (dropped at assembly): {missing[:20]}")

print()
for h in hard:
    print("HARD  " + h)
for s in soft:
    print("SOFT  " + s)
print(f"\n{len(hard)} hard, {len(soft)} soft")
sys.exit(1 if hard else 0)
