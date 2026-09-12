// Parse-validate Mermaid files with the same engine GitHub uses (mermaid 11.12.0).
// Usage: node tools/validate_mmd.mjs <file.mmd|dir> [...]   -> exit 0 if all pass, 2 otherwise
import fs from 'fs'; import path from 'path'; import { createRequire } from 'module';
import { JSDOM } from 'jsdom';
const dom = new JSDOM('<!doctype html><html><body></body></html>', { pretendToBeVisual: true });
globalThis.window = dom.window; globalThis.document = dom.window.document;
globalThis.DOMParser = dom.window.DOMParser; globalThis.Element = dom.window.Element; globalThis.HTMLElement = dom.window.HTMLElement;
const m = await import('/Users/adityasingh/.bun/install/cache/mermaid@11.12.0@@@1/dist/mermaid.esm.min.mjs');
const mermaid = m.default; mermaid.initialize({ startOnLoad: false });
const files = [];
for (const a of process.argv.slice(2)) {
  if (fs.statSync(a).isDirectory()) for (const f of fs.readdirSync(a)) { if (f.endsWith('.mmd')) files.push(path.join(a, f)); }
  else files.push(a);
}
let fail = 0;
for (const f of files.sort()) {
  let txt = fs.readFileSync(f, 'utf8').trim().replace(/^```[a-zA-Z]*\n?/, '').replace(/\n?```$/, '');
  // Lint: ';' inside a state/sequence label is parsed as a statement separator and silently
  // splits the label into a stray transition. The parser accepts it, so catch it here.
  const kind = txt.split('\n')[0].trim().split(/\s+/)[0];
  const lint = [];
  if (kind === 'stateDiagram-v2' || kind === 'stateDiagram' || kind === 'sequenceDiagram') {
    txt.split('\n').forEach((ln, i) => {
      const t = ln.trim(); if (!t.includes(':') || t.startsWith('%%')) return;
      const label = t.slice(t.indexOf(':') + 1);
      if (label.includes(';')) lint.push(`line ${i + 1}: ';' in label splits it into a stray statement`);
    });
  }
  if (lint.length) { fail++; console.log('FAIL', path.basename(f), ':: LINT', lint.join(' | ')); continue; }
  try { await mermaid.parse(txt); console.log('PASS', path.basename(f)); }
  catch (e) { fail++; console.log('FAIL', path.basename(f), '::', String(e.message || e).split('\n').slice(0, 3).join(' | ')); }
}
console.log(`\n${files.length - fail}/${files.length} passed`);
process.exit(fail ? 2 : 0);
