# [r4] ai-data-protection-intersection

## Verification notes

NOT LEGAL ADVICE. This is an adversarial citation check by a non-lawyer against primary gazette texts. It verifies that provisions exist and say what was claimed; it does not opine on how they apply to your facts.

METHOD. I downloaded and full-text-searched the primary instruments rather than relying on commentary. Where the prior round flagged a mirror-hosting caveat, I re-fetched from official hosts with a browser user-agent and compared MD5 hashes.

PROVENANCE CAVEATS REMOVED (the prior round's biggest self-reported weakness was unnecessary):
- DPDP Act: egazette.gov.in/WriteReadData/2023/248045.pdf and meity.gov.in both serve a byte-identical PDF (md5 cf08dd3279553320b8a4f875317352f6). Gazette No. 25, 11 Aug 2023, CG-DL-E-12082023-248045.
- Commencement notification G.S.R. 843(E): egazette.gov.in/WriteReadData/2025/267647.pdf is byte-identical to the dpdpa.com mirror (md5 90b5867813ac1ffbebe66397fbc6340d). No. 757, CG-DL-E-14112025-267647, F.No. AA-11038/1/2025-CL&ES, Ajit Kumar Jt. Secy.
- DPDP Rules G.S.R. 846(E): egazette.gov.in/WriteReadData/2025/267650.pdf.
The prior claim that indiacode/meity were unreachable was an artifact of the fetch tool's user-agent, not of the hosts. All three instruments are directly citable to .gov.in.

VERIFIED VERBATIM (I confirmed the exact quoted words): commencement notification clauses (a)-(c) including its own spacing typo "section 6,sections 7 to 10"; DPDP Rules r.1(2)-(4), r.6(1)(a)/(e)/(f), r.7(1) and r.7(2), r.13(1)-(5), r.15; DPDP Act s.6(9), s.7(i), s.8(1)/(2)/(3)/(5)/(6), s.10(1) with all six factors, s.11(1)(a)-(b), s.16(1)-(2), s.27(1)(d), s.44(2)(a) and (c), Schedule items 1-7 with all amounts; SPDI Rules r.3(ii)/(vi), r.5(2)/(3)(c)/(4)/(5), r.6(1)/(4), r.7, r.8(2)/(4); CERT-In directions (ii) and (iv) and Annexure I items (xviii) and (xx); IT Rules 2021 r.2(1)(wa) and r.3(3)(a)(ii)/(b) as inserted by G.S.R. 120(E); Aadhaar Act s.29(1)-(4), s.30, s.37; RBI Master Direction paras 16(n)/(o)/(p)/(r), footnote 4, Chapter IX para 21(b)/(c). No fabricated section number was found. Every provision cited exists and says substantially what was claimed.

RETRACTED (2 substantive):
1. The unqualified claim that DPDP s.11(1)(b) gives an employee a right to be told which AI vendors saw her data. The s.11(1) chapeau limits the right to a fiduciary "to whom she has previously given consent, including consent as referred to in clause (a) of section 7". Most HR processing rests on the s.7(i) employment legitimate use, which is neither consent nor s.7(a). On the face of the text the access right may not attach to employment processing at all. Rule 14(2) reinforces the consent linkage. This was the prior round's headline "most under-appreciated right"; it is now a genuinely open question. The same defect affects s.12 (correction), which carries an identical consent gate.
2. The claim that SPDI r.5 (purpose limitation) and r.6(4) (no onward disclosure) are obligations binding the HR SaaS. The MeitY Press Note of 24 Aug 2011 clarifies that a body corporate providing services relating to SPDI under contractual obligation with a legal entity located in or outside India is not subject to Rules 5 and 6. An HR SaaS processing employee data under contract with the employer is squarely inside that carve-out. Those rules bind the employer, which collects from the employee directly. r.7 (transfer) and r.8 (security) are NOT within the carve-out and do still apply.

CORRECTED (4 smaller):
3. Aadhaar s.29(4) was quoted as verbatim but truncated: the section ends "...shall be published, displayed or posted publicly, except for the purposes as may be specified by regulations." The exception was dropped.
4. "'sensitive' appears zero times in the DPDP Act" is true for that exact word, but "sensitivity" appears once, at s.10(1)(a), as an SDF-notification factor. The conclusion (no special category of data) is unaffected.
5. Aadhaar s.37 is scoped to identity information "collected in the course of enrolment or authentication". An HRMS holding an Aadhaar number handed over directly by an employee for PF/Form 16 is arguably outside it. The three-year criminal exposure was stated more broadly than the text supports.
6. SPDI r.8(4) deemed compliance requires the standard to have been "certified or audited... by entities through independent auditor, duly approved by the Central Government" — an ISO 27001 certificate alone does not trigger it.

STRENGTHENED: s.44(2) also omits IT Act s.87(2)(ob) — the rule-making power under which the SPDI Rules were made — which reinforces rather than merely assumes that the 2011 regime falls away on 13 May 2027.

OPEN QUESTIONS I CLOSED: (a) no country notified under s.16(1) as of mid-2026, now corroborated externally rather than only inferred; (b) FREE-AI remains advisory, and the live pipeline item is RBI's Draft Guidance on Model Risk Management, 2026 (released 24 June 2026, comments closed 24 July 2026, still draft) — this is new and materially relevant to BFSI go-to-market. Attempted and failed: the SEBI cloud circular's substantive text (NSDL mirror 404'd); it stays open.

TWO WARNINGS ABOUT SECONDARY SOURCES, both of which vindicate working from statute:
- MeitY's own India AI Governance Guidelines describe the DPDP Act as imposing "data minimisation", "safeguards against misuse of sensitive data", and empowering the Board to investigate "AI-driven profiling". None of those exist in the statute (profiling: 0 occurrences; sensitive: 0; no standalone minimisation principle). Official commentary is unreliable here.
- Several commentaries state the Feb 2026 SGI regime covers AI-generated text. The gazette definition is expressly limited to "audio, visual or audio-visual information". The prior round read this correctly and the commentary is wrong.

HOW MUCH TO TRUST THIS. The statutory spine — commencement dates, what is and is not in force, the absence of an automated-decision right, the negative-list transfer mechanism, penalty amounts, CERT-In duties, the SGI scoping — is now verified against gazette text on official hosts and can be relied on for PRD planning. The two retracted items were both load-bearing for P0 requirements and should be reworked before anything is represented to a customer. Every "inference"-labelled item remains one person's reading of text, not settled law: there is no Data Protection Board jurisprudence, no DPDP guidance, and no case law, because the substantive Act is not yet in force. Anything customer-facing, contractual, or BFSI-related needs Indian counsel.

## Key findings (28)

### 1. [high — verified on an official .gov.in host. The prior round's provenance caveat is withdrawn as unnecessary.|law_requires] TIMING GATE CONFIRMED — as of September 2026 almost none of the DPDP Act's substantive obligations are in force. Sections 3 to 17 (every Data Fiduciary obligation, every Data Principal right, the SDF regime in s.10, the cross-border provision s.16) commence 13 May 2027. Only Board machinery, definitions and rule-making powers are live today.

**Provision:** DPDP Act 2023, s.1(2); commencement notification G.S.R. 843(E) dated 13.11.2025

> eighteen months from the date of publication of this gazette, on which the provision of sections 3 to 5, sub-sections (1) to (8) and (10) of section 6,sections 7 to 10, sections 11 to 17, section 27 except clause (d) of sub-section (1) of the said section, sections 28 to 34, 36, 37 and sub-section (2) of section 44 of the said Act shall come into force.

Verified verbatim against the gazette copy at egazette.gov.in/WriteReadData/2025/267647.pdf, which is byte-identical (md5 90b5867813ac1ffbebe66397fbc6340d) to the mirror the prior round relied on. Clause (a) commences on publication: s.1(2), s.2, ss.18-26, ss.35, 38-43, s.44(1) and (3). Clause (b) at one year: s.6(9) and s.27(1)(d). Clause (c) at eighteen months: ss.3-5, s.6(1)-(8) and (10), ss.7-10, ss.11-17, s.27 except (1)(d), ss.28-34, 36, 37, s.44(2). Internal coherence re-checked: s.6(9) is verified as the Consent Manager registration duty and s.27(1)(d) as the Board's function on breach of a Consent Manager's registration conditions, matching Rules r.1(3) which commences r.4 at one year.

Source: https://egazette.gov.in/WriteReadData/2025/267647.pdf

### 2. [high — verified on an official .gov.in host; rule numbering checked against the full heading list rather than assumed|law_requires] DPDP Rules 2025 mirror the same gate: r.6 (security safeguards), r.7 (breach intimation), r.13 (SDF obligations incl. algorithmic due diligence) and r.15 (cross-border transfer) all commence 13 May 2027. Only rules 1, 2 and 17-21 are in force today; rule 4 (Consent Manager) at one year.

**Provision:** DPDP Rules 2025, r.1(2)-(4); notified vide G.S.R. 846(E) dated 13.11.2025

> Rules 3, 5 to 16, 22 and 23 shall come into force eighteen months after the date of publication of this Gazette.

Verified verbatim from egazette.gov.in/WriteReadData/2025/267650.pdf. Rule numbering independently confirmed by reading every rule heading in the notified text — this mattered, because the January 2025 draft numbered SDF obligations as r.12 and cross-border as r.14. In the final Rules the sequence is r.13 SDF, r.14 rights of Data Principals, r.15 transfer. The prior round's numbering is correct for the final instrument.

Source: https://egazette.gov.in/WriteReadData/2025/267650.pdf

### 3. [high — this remains the single most consequential finding in the dimension and it survives adversarial checking intact|law_requires] CONSEQUENCE OF THE GATE — the operative Indian data-protection law for this product TODAY is IT Act s.43A plus the SPDI Rules 2011, which are not repealed. The omitting provision is DPDP s.44(2), which sits in the eighteen-month tranche. Only s.44(1) and (3) commenced in Nov 2025.

**Provision:** DPDP Act 2023, s.44(2)(a) and (c), read with G.S.R. 843(E) clauses (a) and (c)

> (2) The Information Technology Act, 2000 shall be amended in the following manner, namely:— (a) section 43A shall be omitted; ... (c) in section 87, in sub-section (2), clause (ob) shall be omitted.

s.44(2) verified verbatim. Note a point the prior round did not make, which strengthens the conclusion: s.44(2) omits BOTH s.43A (clause (a)) AND s.87(2)(ob) (clause (c)) — the latter being the rule-making power under which the SPDI Rules were made. So the enabling power and the parent section fall away together on 13 May 2027, rather than leaving orphaned rules. Cross-checked against G.S.R. 843(E) clause (a), which commences only 'sub-sections (1) and (3) of section 44'.

Source: https://egazette.gov.in/WriteReadData/2023/248045.pdf

### 4. [high|law_requires] CROSS-BORDER IS A NEGATIVE LIST, NOT AN ALLOWLIST. s.16(1) empowers Government to restrict transfer to notified countries; transfer is otherwise permitted by default. There is no adequacy assessment, no SCC regime and no transfer-impact-assessment requirement in the Act. s.16(2) preserves higher sectoral restrictions.

**Provision:** DPDP Act 2023, s.16(1) and s.16(2)

> The Central Government may, by notification, restrict the transfer of personal data by a Data Fiduciary for processing to such country or territory outside India as may be so notified.

Both sub-sections verified verbatim against the gazette text. s.16(2) is the hook through which RBI/SEBI/IRDAI requirements survive.

Source: https://egazette.gov.in/WriteReadData/2023/248045.pdf

### 5. [high on the text; the reading of its scope as foreign-State-access-oriented remains INFERENCE|law_requires] DPDP Rule 15 adds a second, narrower cross-border layer aimed at foreign-State access rather than commercial export generally.

**Provision:** DPDP Rules 2025, r.15

> Any personal data processed by a Data Fiduciary under the Act may be transferred outside the territory of India subject to the restriction that the Data Fiduciary shall meet such requirements as the Central Government may, by general or special order, specify in respect of making such personal data available to any foreign State, or to any person or entity under the control of or any agency of such a State.

Verified verbatim. Its operative object is 'making such personal data available to any foreign State, or to any person or entity under the control of or any agency of such a State'. No general or special order has issued, and none can operate before 13 May 2027.

Source: https://egazette.gov.in/WriteReadData/2025/267650.pdf

### 6. [high on the legal architecture; medium-high on 'no notification exists' — upgraded from the prior round by external corroboration, but a negative remains weaker than a positive citation|inference] APPLIED TO A US-HOSTED LLM API: under DPDP as it will stand on 13 May 2027, sending employee data to a US LLM API is lawful without any transfer mechanism, unless the US is notified under s.16(1) or an order issues under r.15. No country has been notified.

**Provision:** DPDP Act s.16(1); DPDP Rules r.15

Derived from s.16(1), r.15 and the commencement notification. The prior round rated the 'no notification exists' limb medium because it reasoned from commencement rather than searching. I corroborated it independently: multiple 2026 practitioner sources state that as of mid-2026 no country or territory has been notified under s.16. That is consistent with the structural point that s.16 is not yet in force.

### 7. [high on the text. Provenance still MEDIUM — I could not locate a live .gov.in copy of G.S.R. 313(E); the PDF used carries authentic gazette headers and the correct file number. Re-verify against a .gov.in copy before quoting to a customer's counsel.|law_requires] IN FORCE TODAY, SPDI Rule 7 restricts the same transfer, and it applies to the SaaS. For biometric and financial information, transfer abroad is permitted only to a recipient ensuring the same level of protection AND only where necessary for a lawful contract or where the individual consented.

**Provision:** SPDI Rules 2011, r.7 read with r.3(ii) and r.3(vi); G.S.R. 313(E) dated 11 April 2011

> A body corporate or any person on its behalf may transfer sensitive personal data or information including any information, to any other body corporate or a person in India, or located in any other country, that ensures the same level of data protection that is adhered to by the body corporate as provided for under these Rules. The transfer may be allowed only if it is necessary for the performance of the lawful contract between the body corporate or any person on its behalf and provider of information or where such person has consented to data transfer.

r.7 verified verbatim, as are r.3(ii) 'financial information such as Bank account or credit card or debit card or other payment instrument details' and r.3(vi) 'Biometric information'. Importantly, r.7 is NOT within the 2011 outsourcing carve-out (see the correction below), which reaches only rules 5 and 6. So unlike r.5 and r.6, r.7 does bind an HR SaaS handling this data.

Source: https://www.dataguidance.com/sites/default/files/in098en.pdf

### 8. [high on the rule text; MEDIUM on the carve-out, because a press note is an executive clarification rather than a statutory instrument and its legal weight is itself contestable. Counsel question.|law_requires] CORRECTED — SPDI r.5 (purpose limitation) and r.6(4) (no onward disclosure) bind the EMPLOYER, not the HR SaaS. The MeitY Press Note of 24 August 2011 clarifies that a body corporate providing SPDI-related services under contractual obligation with a legal entity located within or outside India is not subject to Rules 5 and 6. An HR SaaS processing employee data under contract with the employer sits inside that carve-out.

**Provision:** SPDI Rules 2011, r.5 and r.6, read with MeitY Press Note dated 24.08.2011

> The third party receiving the sensitive personal data or information from body corporate or any person on its behalf under sub-rule (1) shall not disclose it further.

Rule text verified verbatim: r.6(4) 'The third party receiving the sensitive personal data or information from body corporate or any person on its behalf under sub-rule (1) shall not disclose it further'; r.5(5) 'The information collected shall be used for the purpose for which it has been collected'; r.5(3)(c) requires disclosure of 'the intended recipients of the information' at collection. The carve-out is documented consistently across practitioner sources describing the 24 Aug 2011 press note. The prior round presented r.5 and r.6(4) as directly usable hooks binding the product; as to the SaaS that is wrong. They remain live obligations on the employer-customer, and remain usable as CONTRACT terms against an LLM vendor — just not as statutory duties owed by the SaaS.

Source: https://www.dataguidance.com/sites/default/files/in098en.pdf

### 9. [high on the quoted text; the reading of the verb list as excluding inference remains INFERENCE and is exactly the kind of point counsel should settle|law_requires] SDF ALGORITHMIC DUE DILIGENCE CONFIRMED — DPDP Rules r.13(3) requires an SDF to 'observe due diligence to verify' that technical measures including algorithmic software are 'not likely to pose a risk to the rights of Data Principals'. It is an obligation of process, not outcome, and the Rules define neither method nor standard.

**Provision:** DPDP Rules 2025, r.13(3)

> A Significant Data Fiduciary shall observe due diligence to verify that technical measures including algorithmic software adopted by it for hosting, display, uploading, modification, publishing, transmission, storage, updating or sharing of personal data processed by it are not likely to pose a risk to the rights of Data Principals.

Verified verbatim. I independently re-ran the term search: 'algorithmic' appears exactly once in the entire Rules (r.13(3)) and 'algorithm' zero times in the Act. The scoping verb list — hosting, display, uploading, modification, publishing, transmission, storage, updating or sharing — is confirmed and does NOT include analysis, inference, scoring, profiling or decision-making.

Source: https://egazette.gov.in/WriteReadData/2025/267650.pdf

### 10. [high — r.13(4) is a latent localisation switch that could later strand a US-hosted AI feature for SDF customers|law_requires] The rest of r.13 matters as much as r.13(3): r.13(1) annual DPIA and audit; r.13(2) report of significant observations to the Board; r.13(4) a conditional localisation trigger for personal data and its traffic data.

**Provision:** DPDP Rules 2025, r.13(1), (2), (4), (5)

> A Significant Data Fiduciary shall undertake measures to ensure that personal data specified by the Central Government, on the basis of the recommendations of a committee constituted by it, is processed subject to the restriction that the personal data and the traffic data pertaining to its flow is not transferred outside the territory of India.

All sub-rules verified verbatim. r.13(5) defines the committee as one which 'shall include officials from the Ministry of Electronics and Technology' (the gazette omits 'Information' — a typo in the official text). No specification has been made under r.13(4); the rule is not in force.

Source: https://egazette.gov.in/WriteReadData/2025/267650.pdf

### 11. [high on the statutory mechanism; MEDIUM on the conclusion that the SaaS can never be an SDF, because the SaaS is a Data Fiduciary in its own right for processing it self-determines — notably using customer employee data to improve its own models. That remains a genuine counsel question.|law_requires] WHO IS THE SDF — SDF status arises only by Central Government notification under s.10(1). No SDF has been or can be notified before 13 May 2027, since s.10 is in the eighteen-month tranche. An employer of 20-200 people will essentially never be notified.

**Provision:** DPDP Act 2023, s.10(1); definitions at s.2

> The Central Government may notify any Data Fiduciary or class of Data Fiduciaries as Significant Data Fiduciary, on the basis of an assessment of such relevant factors as it may determine, including—

s.10(1) verified verbatim with all six factors: volume and sensitivity of personal data processed; risk to the rights of Data Principal; potential impact on sovereignty and integrity of India; risk to electoral democracy; security of the State; public order. G.S.R. 843(E) clause (c) includes 'sections 7 to 10'. s.2 definitions of Data Fiduciary ('determines the purpose and means') and Data Processor ('processes personal data on behalf of a Data Fiduciary') confirmed.

Source: https://egazette.gov.in/WriteReadData/2023/248045.pdf

### 12. [high — this is a verified negative, not an unverified absence, and it is the largest India-versus-Europe divergence for an AI-first HR product|law_requires] NO RIGHT AGAINST AUTOMATED DECISION-MAKING EXISTS IN INDIAN DATA-PROTECTION LAW. No GDPR Article 22 analogue, no right to an explanation, no right to human review, no right to object to profiling. Chapter III contains exactly four rights: access (s.11), correction and erasure (s.12), grievance redressal (s.13), nomination (s.14).

**Provision:** DPDP Act 2023, Chapter III (ss.11-15); verified negative across the Act and DPDP Rules 2025

Independently re-verified by full-text search of both gazette instruments, not taken on trust. DPDP Act: 'profiling' 0, 'automated decision' 0, 'biometric' 0, 'artificial intelligence' 0, 'algorithm' 0; 'automated' 3, all definitional (s.2(b) 'automated', s.2(h) 'data', s.2(x) 'processing'). DPDP Rules: 'profiling' 0, 'sensitive' 0, 'biometric' 0, 'artificial intelligence' 0, 'algorithmic' 1 (r.13(3) only). One refinement to the prior round: 'sensitive' is 0 but 'sensitivity' appears once, at s.10(1)(a), as an SDF-notification factor — which does not create a data category. I also read Chapter III end-to-end: it spans ss.11-15, being four rights plus s.15 duties of the Data Principal. There is no fifth right.

Source: https://egazette.gov.in/WriteReadData/2023/248045.pdf

### 13. [high that the consent gate exists in the text; UNRESOLVED whether it excludes s.7(i) employment processing. Build the disclosure capability anyway on commercial and SPDI r.5(3)(c) grounds, but do not tell customers the Act compels it.|inference] RETRACTED AS STATED — s.11(1)(b) does NOT clearly give an employee a right to be told which AI vendors saw her data. The right is consent-gated, and most HR processing will not rest on consent.

**Provision:** DPDP Act 2023, s.11(1) chapeau and s.11(1)(b); s.12(1); DPDP Rules r.14(2)

> the identities of all other Data Fiduciaries and Data Processors with whom the personal data has been shared by such Data Fiduciary, along with a description of the personal data so shared

The s.11(1) chapeau reads: 'The Data Principal shall have the right to obtain from the Data Fiduciary to whom she has previously given consent, including consent as referred to in clause (a) of section 7 (hereinafter referred to as the said Data Fiduciary), for processing of personal data...'. Employment processing will typically rest on s.7(i), which is a legitimate use but is neither consent nor s.7(a) (voluntary provision). On the face of the text the access right does not attach to s.7(i) processing at all. Rules r.14(2) reinforces this: 'she may make a request to the Data Fiduciary to whom she has previously given consent for processing of her personal data'. The identical gate appears in s.12(1) for correction and erasure. The prior round called this 'the most under-appreciated AI-relevant right in the Act and a build requirement' — that overstates it.

Source: https://egazette.gov.in/WriteReadData/2023/248045.pdf

### 14. [high on the text; the characterisation of s.8(3) as the operative AI-quality hook is INFERENCE|law_requires] The nearest Indian analogue to an ADM safeguard is s.8(3) — a data-QUALITY duty on the fiduciary, not a right of the individual. It confers no explanation or human-review entitlement, and unlike ss.11-12 it is NOT consent-gated, so it does reach s.7(i) employment processing.

**Provision:** DPDP Act 2023, s.8(3)

> Where personal data processed by a Data Fiduciary is likely to be— (a) used to make a decision that affects the Data Principal; or (b) disclosed to another Data Fiduciary, the Data Fiduciary processing such personal data shall ensure its completeness, accuracy and consistency.

Verified verbatim. Its trigger — data 'likely to be used to make a decision that affects the Data Principal' — covers appraisal scoring, attrition prediction and shortlisting. Note this finding survives the s.11/s.12 retraction and becomes relatively more important because of it: s.8(3) is an unconditional duty on the fiduciary, whereas the correction right in s.12 that the prior round paired with it carries the consent gate.

Source: https://egazette.gov.in/WriteReadData/2023/248045.pdf

### 15. [high — counterintuitive and worth stating explicitly, since customers and their counsel will assume otherwise by analogy to GDPR Art 9|law_requires] DPDP HAS NO SPECIAL CATEGORY OF DATA AT ALL. Aadhaar, PAN, salary, bank details and face templates are all simply 'personal data', attracting identical obligations to a work email address. Biometric templates lose their special status on 13 May 2027 when the SPDI Rules fall away with s.43A.

**Provision:** DPDP Act 2023 (absence of any sensitive-data category); SPDI Rules 2011 r.3(ii), r.3(vi); DPDP Act s.44(2)(a)

'sensitive' and 'biometric' each occur zero times in the Act and zero times in the Rules (only 'sensitivity' once, as an SDF factor). Until 13 May 2027 SPDI r.3(vi) classifies 'Biometric information' and r.3(ii) bank and payment instrument details as sensitive personal data or information. After that date no Indian data-protection statute treats a face template differently from any other personal data.

Source: https://egazette.gov.in/WriteReadData/2023/248045.pdf

### 16. [high on the quotes and on the voluntary status|common_practice] NO BINDING INDIAN REGULATION GOVERNS AI IN HIRING OR PERFORMANCE MANAGEMENT. The India AI Governance Guidelines (MeitY, November 2025) are expressly voluntary and expressly recommend against a separate AI law.

**Provision:** India AI Governance Guidelines, MeitY, November 2025 (non-statutory)

> at this stage, a separate law to regulate AI is not needed given the current assessment of risks

All quotes verified verbatim in the official 3,151-line PIB-hosted document: 'Existing laws (for e.g. on information technology, data protection, consumer protection and statutory civil and criminal codes, etc.), can be used to govern AI applications. Therefore, at this stage, a separate law to regulate AI is not needed given the current assessment of risks'; 'While not legally binding, they support norms development, create accountability, and inform future regulatory choices'; the employment-harm example; and the acknowledged DPDP-AI tension 'whether the principles of collection and purpose limitation are compatible with how modern AI systems operate'. CAUTION worth recording: the same document describes the DPDP Act as imposing 'data minimisation', 'safeguards against misuse of sensitive data' and empowering the Board to investigate 'AI-driven profiling' — none of which appear in the statute. Treat the Guidelines as policy signalling, not as a statement of law.

Source: https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/nov/doc2025115685601.pdf

### 17. [high on the text and the text-versus-AV scoping. MEDIUM on the product being out of scope, since it depends on the product generating no AV content and on whether an HR SaaS is an 'intermediary' under IT Act s.2(1)(w) — both counsel questions.|law_requires] THE ONE BINDING AI-SPECIFIC INSTRUMENT IN INDIA IS THE IT AMENDMENT RULES 2026 — and it does not reach a text-generating HR product. 'Synthetically generated information' covers only audio, visual or audio-visual information, and a proviso carves out routine document, presentation and training-material generation.

**Provision:** IT (Intermediary Guidelines and Digital Media Ethics Code) Rules 2021, r.2(1)(wa) and r.3(3), as amended by G.S.R. 120(E) dated 10.02.2026

> ‘synthetically generated information’ means audio, visual or audio-visual information which is artificially or algorithmically created, generated, modified or altered using a computer resource

Verified verbatim from MeitY's own consolidated rules PDF (updated as on 10.02.2026), which records the insertion 'Ins. by G.S.R. 120(E), dated 10.02.2026' against r.2(1)(wa). The definition is expressly limited to 'audio, visual or audio-visual information'. Proviso (b) excludes information arising from 'the routine or good-faith creation, preparation, formatting, presentation or design of documents, presentations, portable document format (PDF) files, educational or training materials, research outputs'. The labelling and provenance duty in r.3(3)(a)(ii) and the non-removal duty in r.3(3)(b) attach only where 'an intermediary offers a computer resource which may enable, permit, or facilitate the creation... of information as synthetically generated information'. Commencement 20 Feb 2026 confirmed via secondary sources. NOTE: several commentaries assert the regime covers AI-generated text; that is contradicted by the gazette definition.

Source: https://www.meity.gov.in/static/uploads/2026/02/550681ab908f8afb135b0ad42816a1c9.pdf

### 18. [high — retrieved directly from the CERT-In domain|law_requires] CERT-In AI REPORTING CONFIRMED VERBATIM. Attacks on AI/ML systems are Annexure I item (xx); cloud systems are item (xviii); direction (ii) sets the 6-hour clock. In force now.

**Provision:** CERT-In Directions No. 20(3)/2022-CERT-In dated 28.04.2022, direction (ii) and Annexure I items (xviii) and (xx); issued under IT Act 2000 s.70B(6)

> xx. Attacks or malicious/ suspicious activities affecting systems/ servers/software/ applications related to Artificial Intelligence and Machine Learning

Retrieved directly from cert-in.org.in and verified word for word. Direction (ii): 'Any service provider, intermediary, data centre, body corporate and Government organisation shall mandatorily report cyber incidents as mentioned in Annexure I to CERT-In within 6 hours of noticing such incidents or being brought to notice about such incidents.' Annexure I is stated to be per Rule 12(1)(a) of the CERT-In Rules 2013 and runs to twenty items; item (xviii) is the cloud item and (xx) the AI/ML item, both confirmed as quoted.

Source: https://www.cert-in.org.in/PDF/CERT-In_Directions_70B_28.04.2022.pdf

### 19. [high on the text. That LLM prompt/completion logs are 'ICT systems' logs is INFERENCE — well grounded but not expressly stated, and worth counsel confirmation given the localisation consequence.|law_requires] CERT-In ALSO IMPOSES A LOG DATA-RESIDENCY CONSTRAINT THAT DIRECTLY HITS AN AI LAYER: all ICT system logs must be retained for a rolling 180 days AND maintained within Indian jurisdiction. In force now.

**Provision:** CERT-In Directions 28.04.2022, direction (iv)

> maintain them securely for a rolling period of 180 days and the same shall be maintained within the Indian jurisdiction

Direction (iv) verified verbatim: 'All service providers, intermediaries, data centres, body corporate and Government organisations shall mandatorily enable logs of all their ICT systems and maintain them securely for a rolling period of 180 days and the same shall be maintained within the Indian jurisdiction. These should be provided to CERT-In along with reporting of any incident or when ordered / directed by CERT-In.'

Source: https://www.cert-in.org.in/PDF/CERT-In_Directions_70B_28.04.2022.pdf

### 20. [high|law_requires] TWO SEPARATE BREACH CLOCKS WILL RUN FROM 13 MAY 2027. CERT-In: 6 hours. DPDP Rule 7: 'without delay' to affected Data Principals and to the Board, then a detailed six-element report within 72 hours. Cumulative, different regulators, different formats. There is no materiality threshold.

**Provision:** DPDP Rules 2025, r.7(1) and r.7(2); DPDP Act s.8(6); CERT-In Directions direction (ii)

> within seventy-two hours of becoming aware of the breach, or within such longer period as the Board may allow on a request made in writing in this behalf

r.7(1) and r.7(2) verified verbatim, including the five content elements owed to the Data Principal and the six owed to the Board, and the 72-hour deadline with its extension proviso 'or within such longer period as the Board may allow on a request made in writing in this behalf'. The absence of any materiality or risk threshold is confirmed by reading the rule in full.

Source: https://egazette.gov.in/WriteReadData/2025/267650.pdf

### 21. [high — the breadth of the unqualified s.7(i) employment ground is itself a significant finding: it is permissive, not narrow|law_requires] PII MINIMISATION — no Indian provision expressly requires redaction before sending data to a model. DPDP has no standalone data-minimisation principle. Minimisation enters only through the scope of consent in s.6(1), which does not govern s.7 legitimate uses at all.

**Provision:** DPDP Act 2023, s.6(1); s.7(i); s.4; s.8(7)

> (i) for the purposes of employment or those related to safeguarding the employer from loss or liability, such as prevention of corporate espionage, maintenance of confidentiality of trade secrets, intellectual property, classified information or provision of any service or benefit sought by a Data Principal who is an employee.

s.6(1) verified: consent 'shall be ... limited to such personal data as is necessary for such specified purpose'. s.7(i) verified verbatim and contains NO necessity qualifier in its own words. The outer limits on s.7(i) processing are s.4(1) lawful purpose and the s.8(7) erasure duty. Note that MeitY's AI Guidelines assert the DPDP Act contains 'data minimisation'; the statutory text does not bear that out, and the statute governs.

Source: https://egazette.gov.in/WriteReadData/2023/248045.pdf

### 22. [high on the text. The step from 'masking is a named example' to 'therefore redact before an external model call' is INFERENCE, but it is the best-grounded route available.|law_requires] THE STRONGEST LEGAL HOOK FOR PRE-MODEL REDACTION IS THE SECURITY RULE. DPDP Rule 6(1)(a) names masking, obfuscation and tokenisation as examples of the minimum required security measures.

**Provision:** DPDP Rules 2025, r.6(1)(a), (e), (f); penalty via DPDP Act Schedule item 1

> appropriate data security measures, such as securing of personal data through encryption, obfuscation, masking or the use of virtual tokens mapped to that personal data

r.6(1)(a) verified verbatim, as are r.6(1)(e) (retain logs and personal data for one year) and r.6(1)(f) (contractual security provision with the Data Processor). Breach of the s.8(5) security obligation carries the Act's largest penalty (Schedule item 1).

Source: https://egazette.gov.in/WriteReadData/2025/267650.pdf

### 23. [high on the amounts. Which item a breach of r.13(3) falls under — item 4 (Rs 150 cr) or item 7 (Rs 50 cr) — is unresolved on the text and remains a counsel question.|law_requires] PENALTY EXPOSURE VERIFIED — up to Rs 250 crore for breach of the security-safeguards obligation (s.8(5)); Rs 200 crore for breach-notification (s.8(6)); Rs 200 crore for children's obligations (s.9); Rs 150 crore for SDF obligations (s.10); Rs 50 crore residual. All penalties fall on the Data Fiduciary — the employer — not on the SaaS.

**Provision:** DPDP Act 2023, The Schedule [See section 33(1)], items 1-7

> May extend to two hundred and fifty crore rupees.

The Schedule '[See section 33 (1)]' read verbatim from the gazette, items 1 through 7, and every amount confirmed. Item 5 (Rs 10,000 for breach of Data Principal duties under s.15) and item 6 (voluntary undertakings under s.32) complete the table.

Source: https://egazette.gov.in/WriteReadData/2023/248045.pdf

### 24. [high — commercially this means the AI-governance burden reaches the product through the DPA, making the DPA template a first-class PRD artefact|law_requires] AN HR SaaS AS DATA PROCESSOR HAS NO DIRECT STATUTORY OBLIGATIONS UNDER THE DPDP ACT. Every duty in Chapter II attaches to the Data Fiduciary. The processor's exposure is entirely contractual, flowed down via s.8(1), s.8(2) and Rule 6(1)(f).

**Provision:** DPDP Act 2023, s.8(1), s.8(2), s.8(7)(b); DPDP Rules 2025, r.6(1)(f)

> A Data Fiduciary shall, irrespective of any agreement to the contrary or failure of a Data Principal to carry out the duties provided under this Act, be responsible for complying with the provisions of this Act and the rules made thereunder in respect of any processing undertaken by it or on its behalf by a Data Processor.

s.8(1) and s.8(2) verified verbatim. s.8(2): 'A Data Fiduciary may engage, appoint, use or otherwise involve a Data Processor to process personal data on its behalf for any activity related to offering of goods or services to Data Principals only under a valid contract.' No provision in the Act or Rules imposes a penalty on, or a direct duty upon, a Data Processor — confirmed by reading the Schedule, which keys every item to a Data Fiduciary obligation.

Source: https://egazette.gov.in/WriteReadData/2023/248045.pdf

### 25. [high on the quoted text and circular identifiers. Provenance MEDIUM — rbidocs.rbi.org.in refused direct PDF access, so this is a mirror carrying the authentic RBI header. MEDIUM on applicability: whether HR/payroll SaaS is 'material' IT outsourcing is an RE-by-RE determination.|law_requires] RBI SUB-CONTRACTING CONSENT CONFIRMED — para 16(r) requires the outsourcing agreement to contain clauses requiring the RE's prior approval or consent before the service provider uses sub-contractors. Adding an LLM provider to an HRMS serving a bank or NBFC requires that customer's prior consent.

**Provision:** RBI Master Direction on Outsourcing of Information Technology Services, para 16(r), read with footnote 4

> clauses requiring prior approval/ consent of the RE for use of sub-contractors by the service provider for all or part of an outsourced activity

Verified verbatim from the Master Direction PDF bearing the header 'RBI/2023-24/102, DoS.CO.CSITEG/SEC.1/31.01.015/2023-24, April 10, 2023' and the addressee list (Scheduled Commercial Banks excluding RRBs; Local Area Banks; Small Finance Banks; Payments Banks; Primary (Urban) Co-operative Banks; NBFCs; Credit Information Companies; All India Financial Institutions). Footnote 4 confirmed verbatim: 'Sub-contractor in this Master Direction refers only to those providing material / significant IT services to the TPSP specific to the material IT Services arrangement that the RE has entered into with the TPSP.'

Source: https://fidcindia.org.in/wp-content/uploads/2023/04/RBI-OUTSOURCING-OF-IT-SERVICES-10-04-23.pdf

### 26. [high on text. The commercial observation that frontier-model vendors will not grant Indian-regulator inspection rights is INFERENCE from market practice, not researched.|law_requires] THE HARDER RBI CONSTRAINT IS REGULATOR INSPECTION RIGHTS OVER THE SUB-CONTRACTOR — para 16(o) requires clauses letting RBI access the RE's data stored or processed by the service provider AND its sub-contractors, and Chapter IX extends audit rights to foreign-based providers.

**Provision:** RBI Master Direction on Outsourcing of IT Services, paras 16(n), 16(o), 16(p); para 21(b)-(c)

> recognising the authority of regulators to perform inspection of the service provider and any of its sub-contractors

Verified verbatim: para 16(o) 'recognising the authority of regulators to perform inspection of the service provider and any of its sub-contractors. Adding clauses to allow RBI or person(s) authorised by it to access the RE's IT infrastructure, applications, data, documents, and other necessary information given to, stored or processed by the service provider and/ or its sub-contractors...'; para 16(n) right to seek information about third parties in the supply chain; para 16(p) 'including clauses making the service provider contractually liable for the performance and risk management practices of its sub-contractors'. Chapter heading confirmed as para 21 'Additional requirements for Cross-Border Outsourcing', with 21(b) 'arrangements shall only be entered into with parties operating in jurisdictions upholding confidentiality clauses and agreements' and 21(c) 'The right of the RE and the RBI to direct and conduct audit or inspection of the service provider based in a foreign jurisdiction shall be ensured.'

Source: https://fidcindia.org.in/wp-content/uploads/2023/04/RBI-OUTSOURCING-OF-IT-SERVICES-10-04-23.pdf

### 27. [MEDIUM — I confirmed existence, date, consultation window and draft status from several independent sources but did not open the draft. Do not rely on my characterisation of its contents for a BFSI launch decision; retrieve the draft.|common_practice] NEW — RBI's Draft Guidance on Regulatory Principles for Model Risk Management, 2026 is the live pipeline item for AI in BFSI. Released 24 June 2026, comments closed 24 July 2026, still a DRAFT as of September 2026. FREE-AI (August 2025) remains an advisory committee report and has not been converted into a binding instrument.

**Provision:** RBI Draft Guidance on Regulatory Principles for Model Risk Management, 2026 (draft, not in force); FREE-AI Committee Report, August 2025 (non-binding)

This fills the prior round's own open question about binding RBI AI instruments between Aug 2025 and Sep 2026. The answer is that none has issued. The draft MRM guidance covers all models used by REs including third-party models and those employing AI/ML, and proposes board-level governance, risk-based model classification, model lifecycle management, explainability and human oversight for AI-driven decisions, third-party model governance, and customer disclosure where AI influences financial outcomes. If finalised in that form it would convert several items this report currently marks 'not legally required' into hard requirements for BFSI customers.

### 28. [high on the quoted text as now corrected. MEDIUM on application to an HRMS, which turns on the 'requesting entity' question left to counsel.|law_requires] AADHAAR — the sharing restrictions are narrower than commonly assumed and mostly bind 'requesting entities' and 'offline verification-seeking entities'. s.29(4) prohibits publishing, displaying or posting an Aadhaar number publicly, subject to an exception. s.37 criminalises unauthorised disclosure with up to three years' imprisonment, but is scoped to enrolment/authentication data.

**Provision:** Aadhaar Act 2016, s.29(1)-(4), s.30, s.37

> Whoever, intentionally discloses, transmits, copies or otherwise disseminates any identity information collected in the course of enrolment or authentication to any person not authorised under this Act or regulations made thereunder or in contravention of any agreement or arrangement entered into pursuant to the provisions of this Act, shall be punishable with imprisonment for a term which may extend to three years

All verified verbatim from the UIDAI-hosted Act as amended. s.29(1) absolutely bars sharing 'core biometric information' — which does NOT cover a face template captured by a third-party attendance device, since that is not collected under the Aadhaar Act. TWO CORRECTIONS to the prior round: (a) s.29(4) ends '...shall be published, displayed or posted publicly, except for the purposes as may be specified by regulations' — the prior round quoted it as verbatim while dropping that exception; (b) s.37 reaches identity information 'collected in the course of enrolment or authentication', so an HRMS holding an Aadhaar number supplied directly by an employee for PF/Form 16 is arguably outside it. s.30 verified, including its cross-reference to 'clause (iii) of the Explanation to section 43A of the Information Technology Act, 2000'.

Source: https://uidai.gov.in/images/Aadhaar_Act_2016_as_amended.pdf

## Product requirements

- Build a redaction/tokenisation gateway that every outbound model call passes through. Default-deny Aadhaar number, PAN, bank account and IFSC, and raw biometric templates; substitute reversible tokens mapped server-side in India. Make the field allowlist per-tenant configurable and auditable.
  - priority: P0 | driven_by: DPDP Rules r.6(1)(a), which names 'obfuscation, masking or the use of virtual tokens mapped to that personal data' as a minimum security measure (from 13 May 2027); SPDI r.7 transfer conditions, which bind the SaaS today and are NOT within the 2011 outsourcing carve-out; Aadhaar Act s.29(4)
- Retain LLM interaction logs (prompt metadata, model, tenant, employee reference, outcome) for 180 days minimum in Indian-hosted storage, and access logs on personal data for one year. Do not let the AI subsystem be the one component whose logs sit only in a US region.
  - priority: P0 — in force today and the most commonly missed constraint on AI features | driven_by: CERT-In Directions 28.04.2022 direction (iv) — 180 days, 'within the Indian jurisdiction', in force now; DPDP Rules r.6(1)(e) — one year, from 13 May 2027
- Add an AI/ML incident class to the incident-response runbook with a 6-hour clock to CERT-In, distinct from the general security path. Trigger on prompt injection, model or data poisoning, adversarial input, model extraction, and unauthorised access to the inference pipeline or vector store. Designate and register a CERT-In Point of Contact.
  - priority: P0 — in force now | driven_by: CERT-In Directions direction (ii) and Annexure I item (xx) for AI/ML, item (xviii) for the cloud layer; direction (iii) Point of Contact
- Never send biometric face templates or raw face images off-shore, and never to a general-purpose LLM. Keep face matching on-device or in-region. Treat the template as write-once, compare-only, with no export path.
  - priority: P0 | driven_by: SPDI r.3(vi) plus r.7, in force now and applicable to the SaaS; after 13 May 2027 the residual drivers are DPDP Rules r.6(1)(a) and customer contract, since DPDP itself has no special biometric category
- Contractually bind every LLM vendor to: no training on customer data, no onward disclosure, zero or bounded retention, deletion on instruction, and a named processing location. Note the shift in rationale: the no-onward-disclosure term is a contractual and commercial requirement plus a flow-down of the employer's own SPDI r.6(4) duty — it is NOT a statutory duty owed by the SaaS itself.
  - priority: P0 | driven_by: SPDI r.7 'ensures the same level of data protection' (binds the SaaS today); SPDI r.6(4) as an obligation of the employer-customer that must be flowed down; DPDP s.8(2) valid contract and Rules r.6(1)(f) from 13 May 2027
- Write the customer-facing legal position around the correct allocation: the employer is the Data Fiduciary and bears the statutory penalties (up to Rs 250 crore for a security-safeguards breach); the SaaS is a Data Processor with no direct statutory duty under the DPDP Act. Negotiate the DPA, indemnity and liability cap with that asymmetry understood rather than assumed away.
  - priority: P0 — commercial, not engineering | driven_by: DPDP Act s.8(1), s.8(2), s.2 definitions; The Schedule items 1, 2, 4, 7
- Add a per-tenant AI kill switch and per-feature opt-out, defaulting to OFF for tenants flagged as RBI/SEBI/IRDAI-regulated. Do not enable a new AI sub-processor for a regulated tenant without recorded prior written consent from that customer.
  - priority: P0 for any regulated-sector go-to-market | driven_by: RBI Master Direction para 16(r) — prior approval/consent of the RE for use of sub-contractors; DPDP s.16(2) preserving higher sectoral restrictions
- Publish a sub-processor register with a change-notification commitment (recommend 30 days' notice with a right to object), and treat adding or swapping an LLM vendor as a notifiable sub-processor change rather than a silent infrastructure change.
  - priority: P0 | driven_by: RBI MD paras 16(n), 16(r); SPDI r.5(3)(c) 'intended recipients of the information' as an obligation of the employer that the SaaS must enable; standard enterprise DPA practice
- REPRIORITISED — ship a per-employee AI disclosure record: for every model call touching an employee's data, persist vendor identity, model, timestamp, purpose and the categories of fields sent, exportable per employee. Build it, but on commercial and enablement grounds, NOT because the Act compels it. The prior round justified this as a DPDP s.11(1)(b) obligation; that right is consent-gated and probably does not reach s.7(i) employment processing. Do not represent it to customers as a statutory access-request requirement without counsel sign-off.
  - priority: P1 — downgraded from P0. Still architectural and still expensive to retrofit, so instrument call sites early, but it is not the legal blocker it was described as. | driven_by: Enterprise procurement and DPA expectations; SPDI r.5(3)(c) as an employer obligation the SaaS must enable; DPDP s.11(1)(b) ONLY where processing actually rests on consent
- Build breach notification for two clocks and two recipients: CERT-In at 6 hours, and from 13 May 2027 the Data Protection Board 'without delay' plus a six-element detailed report at 72 hours, plus 'without delay' intimation to each affected employee carrying the five elements in r.7(1)(a)-(e). There is no materiality threshold — every personal data breach is reportable.
  - priority: P1 — build the DPDP path ahead of May 2027 | driven_by: CERT-In direction (ii); DPDP Rules r.7(1) and r.7(2); DPDP Act s.8(6)
- For regulated-sector customers, be able to offer an in-India, in-VPC or self-hosted inference option. RBI para 16(o) and para 21(c) require inspection and audit rights extending to sub-contractors including those in foreign jurisdictions — terms most frontier-model vendors will not grant.
  - priority: P1 — likely determines whether the AI layer is sellable to BFSI at all | driven_by: RBI MD paras 16(o), 16(p), 21(b)-(c)
- Expose an inspect-and-correct path for any employee-visible AI-derived attribute (attrition risk, performance score, skill inference). Anchor this on s.8(3), which is an unconditional duty on the fiduciary, rather than on the s.12 correction right, which carries the same consent gate as s.11 and may not reach employment processing.
  - priority: P1 | driven_by: DPDP Act s.8(3) — completeness, accuracy and consistency where data is likely to be used to make a decision affecting the Data Principal; s.12 only where processing rests on consent
- Enforce human-in-the-loop and record the human decision-maker for any AI output feeding hiring, appraisal, promotion, PIP or termination. This is NOT presently required by Indian law — it is a defensibility and enterprise-sales control. Do not represent it to customers as a legal requirement. Watch RBI's draft Model Risk Management guidance, which proposes explainability and human oversight for AI-driven decisions and would make this mandatory for BFSI customers if finalised.
  - priority: P1 | driven_by: Not legally required in India (no GDPR Art 22 analogue — verified negative). Driven by DPDP s.8(3), the voluntary India AI Governance Guidelines, customer procurement expectations, and the RBI draft MRM guidance as a forward signal
- Obtain ISO/IEC 27001 certification with annual independent audit. Note a correction: under SPDI r.8(4) the deemed-compliance route requires certification or audit 'by entities through independent auditor, duly approved by the Central Government' — an ISO 27001 certificate from any auditor does not by itself trigger the deeming provision. Check the auditor's approval status.
  - priority: P1 | driven_by: SPDI Rules r.8(2) and r.8(4) — IS/ISO/IEC 27001 named, audit 'at least once a year or as and when the body corporate ... undertake significant upgradation of its process and computer resource'
- Produce and maintain an AI model inventory with, per model: purpose, input fields, vendor, hosting region, retention, and a documented bias/risk review. This is the evidence r.13(3) due diligence will require and what enterprise security questionnaires already ask for.
  - priority: P2 for the 20-200 segment; P1 if selling upmarket or to a BFSI customer | driven_by: DPDP Rules r.13(3) and r.13(1) annual DPIA (SDF only, from 13 May 2027); India AI Governance Guidelines (voluntary); RBI draft MRM guidance (BFSI, if finalised)
- Do not build synthetic audio, video, or avatar generation (AI onboarding videos, voice cloning for announcements) without legal review. Text generation is squarely outside the SGI regime; audio-visual generation is not.
  - priority: P2 — a scoping guardrail rather than a build item | driven_by: IT Rules 2021 r.2(1)(wa) as inserted by G.S.R. 120(E) dated 10.02.2026, and the labelling/provenance duties in r.3(3)(a)(ii) and r.3(3)(b)
- Do not build a cross-border transfer mechanism (SCC equivalents, transfer impact assessments, adequacy mapping) for DPDP purposes. India uses a negative list that is empty and not yet in force. Budget that effort into SPDI r.7 conditions and sectoral-outsourcing controls, which are the constraints that actually bind today.
  - priority: P1 — a de-scoping decision that saves real effort and prevents over-engineering to a GDPR mental model | driven_by: DPDP Act s.16(1) negative-list mechanism; DPDP Rules r.15; contrast with SPDI r.7 and RBI Chapter IX which do bind

## Needs counsel

- PRIORITY — Do the DPDP access and correction rights (s.11, s.12) reach employment processing at all? Both open with the right applying to a Data Fiduciary 'to whom she has previously given consent, including consent as referred to in clause (a) of section 7'. Most HR processing will rest on the s.7(i) employment legitimate use, which is neither consent nor s.7(a). Rules r.14(2) reinforces the consent linkage. If the gate is read literally, a large part of the assumed employee-rights surface for an HR product simply does not exist, and the AI sub-processor disclosure feature loses its statutory driver. This is now the single most consequential unresolved question in the dimension.
- PRIORITY — Does the MeitY Press Note of 24 August 2011 validly exempt an HR SaaS from SPDI Rules 5 and 6 as a body corporate providing services under contractual obligation with a legal entity? If it does, the product's live statutory duties today reduce to r.7 (transfer) and r.8 (security). If it does not — a press note is an executive clarification, not a statutory instrument, and its legal weight is contestable — then r.5 purpose limitation and r.6 disclosure control bind the product directly and the compliance posture changes materially.
- Is a multi-tenant HR/payroll SaaS a 'Data Processor' throughout, or does it become a Data Fiduciary in its own right for processing it self-determines — choosing to route data to an LLM, selecting the vendor, using aggregate data for product or model improvement? This drives whether the SDF regime, the DPIA duty and r.13(3) can ever attach to the product itself, and it is unresolved on the face of the s.2 definitions.
- Does r.13(3)'s verb list — 'hosting, display, uploading, modification, publishing, transmission, storage, updating or sharing' — reach algorithmic inference, scoring and ranking, or only data-handling operations? The list omits analysis, inference, profiling and decision-making. A narrow reading would put candidate-scoring models largely outside r.13(3). No guidance or Board decision exists.
- Which Schedule item applies to a breach of DPDP Rule 13(3): item 4 (up to Rs 150 crore, as an additional obligation of an SDF under s.10) or item 7 (up to Rs 50 crore, residual)? A threefold penalty difference turns on this and the text does not resolve it.
- Is an HR/payroll SaaS an 'intermediary' under IT Act s.2(1)(w)? If yes, the IT Rules 2021 due-diligence obligations attach, and the 2026 SGI amendments become directly relevant the moment any audio-visual generation feature ships.
- Does an employer, or its HRMS vendor, holding an Aadhaar number collected directly from an employee for PF/ESI/Form 16 purposes become a 'requesting entity' or 'offline verification-seeking entity' under the Aadhaar Act, attracting s.29(3)? Note that s.37's criminal exposure is textually scoped to identity information 'collected in the course of enrolment or authentication', which may place directly-collected numbers outside it. Also unresolved: whether the Aadhaar (Sharing of Information) Regulations 2016 impose masking or storage-prohibition duties on such a holder.
- When IT Act s.43A is omitted on 13 May 2027, what happens to Aadhaar Act s.30, which deems Aadhaar biometric information to be 'sensitive personal data or information' as defined 'in clause (iii) of the Explanation to section 43A'? The cross-reference will point at a repealed provision. Whether s.30 is saved by General Clauses Act s.8 or rendered inoperative is a genuine statutory-interpretation question with direct consequences for biometric attendance.
- Is HR/payroll SaaS 'Outsourcing of IT Services' within the RBI Master Direction for a given regulated entity, and is it 'material'? Footnote 4 scopes sub-contractor duties to those providing material/significant IT services. The para 16(r) consent duty and the para 16(o) inspection duty only bite if the arrangement is material. This is an RE-by-RE determination that will recur in every BFSI sales cycle.
- Between 13 November 2025 and 13 May 2027 the DPDP substantive obligations are not in force while the SPDI Rules still are. What is the correct compliance posture and customer-facing representation during this interregnum, and does building to the future DPDP standard early create adverse consequences such as representations that outrun the law?
- Whether Indian anti-discrimination law reaches AI-assisted hiring by a private employer. Constitutional Articles 14/15/16 bind the State, not private employers; the Rights of Persons with Disabilities Act 2016 and certain other statutes may create private-sector duties. Not researched in either round, and no claim is made about it — but it is the substantive legal risk in AI-assisted shortlisting and the gap remains unfilled.
- Should the product build now to RBI's Draft Guidance on Regulatory Principles for Model Risk Management, 2026 (explainability, human oversight for AI-driven decisions, third-party model governance, customer disclosure)? It is a draft whose consultation closed 24 July 2026 and it is not binding, but if finalised it converts several 'not legally required' items into BFSI requirements. Counsel should read the draft and advise on the likelihood and shape of the final instrument before BFSI go-to-market.

## Open questions

- What does the SEBI Framework for Adoption of Cloud Services by SEBI Regulated Entities (Circular SEBI/HO/ITD/ITD_VAPT/P/CIR/2023/033, 06 March 2023) actually require on data residency and cloud sub-contracting? I made a genuine retrieval attempt this round and failed — the NSDL-hosted mirror returned 404. Multiple secondary sources consistently state that storage and processing of data including logs must sit in MeitY-empanelled CSP data centres holding valid STQC audit status, and that the framework sets nine security principles with a 12-month transition for REs already on cloud. I am NOT asserting those as verified. If true, the MeitY-empanelment requirement would be a harder constraint on a US-hosted LLM for SEBI-regulated customers than anything in DPDP. Retrieve the circular before any capital-markets go-to-market.
- What do the IRDAI Information and Cyber Security Guidelines 2023 and the IRDAI outsourcing regulations require on third-party AI and offshore processing? Not researched in either round. A document exists at irdai.gov.in and should be read before any insurer go-to-market.
- Has any general or special order issued under DPDP Rule 15, and has any Central Government committee under r.13(5) specified data subject to the r.13(4) localisation restriction? Both are latent switches that could strand a US-hosted AI feature for SDF customers. Neither can operate before 13 May 2027.
- Do the Aadhaar (Sharing of Information) Regulations 2016 impose an Aadhaar-masking obligation on entities that merely store Aadhaar numbers, as distinct from requesting entities? Not resolved in either round; it bears directly on the redaction gateway's default-deny list.
- Confirmatory check nearer launch: has any country or territory been notified under DPDP s.16(1)? Structurally none can have been, since s.16 commences 13 May 2027, and secondary sources confirm none as of mid-2026. Worth one Gazette check before making a customer-facing representation.
- Was the final text of RBI's Model Risk Management guidance issued after the 24 July 2026 consultation close, and in what form? As of this research round it remained a draft. This should be re-checked immediately before any BFSI launch decision, since it is the most likely source of binding AI obligations for regulated-entity customers.

## Retracted

- RETRACTED — 'S.11(1)(b) creates a sub-processor disclosure right that directly exposes the AI stack... From 13 May 2027 the employer must be able to answer which AI vendors saw my data', described as 'the most under-appreciated AI-relevant right in the Act and a build requirement, not a policy one'. The s.11(1) chapeau limits the right to a Data Fiduciary 'to whom she has previously given consent, including consent as referred to in clause (a) of section 7'. Employment processing under s.7(i) is neither. The quoted text of s.11(1)(b) is accurate; the unqualified application to employee data is not. Reframed as consent-conditional and moved to counsel questions; the associated P0 product requirement is downgraded to P1 with a commercial rather than statutory rationale.
- RETRACTED — the claim that SPDI Rule 5 purpose limitation and Rule 6(4) 'shall not disclose it further' are obligations binding the HR SaaS, and that r.6(4) is 'a directly usable contractual hook' arising as a live statutory requirement on the product. The MeitY Press Note of 24 August 2011 exempts a body corporate providing SPDI-related services under contractual obligation with a legal entity located in or outside India from Rules 5 and 6. The rule text quoted was accurate and these rules do bind the employer-customer; they do not bind the SaaS as an outsourced processor. SPDI r.7 and r.8 are unaffected and continue to bind the SaaS.
- RETRACTED AS UNNECESSARY — the provenance caveats attached to the DPDP Act, the DPDP Rules 2025 and the commencement notification G.S.R. 843(E), which stated that indiacode.nic.in returns 403 and meity.gov.in serves a JS shell, and recommended a confirmatory pull from egazette.gov.in before external use. All three instruments were retrieved this round directly from egazette.gov.in and meity.gov.in and are byte-identical to the mirrors used previously. These citations are safe to use externally as .gov.in sources.
- CORRECTED — the Aadhaar Act s.29(4) 'operative_text' was presented as verbatim but omitted the closing exception. The full provision ends: '...shall be published, displayed or posted publicly, except for the purposes as may be specified by regulations.'
- CORRECTED — 'sensitive: 0 occurrences in the DPDP Act' is true for that exact word, but 'sensitivity' appears once, at s.10(1)(a), as a factor in assessing whether to notify a Significant Data Fiduciary. The conclusion that DPDP creates no special category of data is unaffected.
- CORRECTED — the Aadhaar s.37 exposure was stated more broadly than the text supports. s.37 reaches identity information 'collected in the course of enrolment or authentication'; an Aadhaar number handed directly to an employer by an employee may fall outside it.
- CORRECTED — the ISO 27001 product requirement. SPDI r.8(4) confers deemed compliance only where the standard has been 'certified or audited on a regular basis by entities through independent auditor, duly approved by the Central Government'. Certification alone does not trigger the deeming provision.
