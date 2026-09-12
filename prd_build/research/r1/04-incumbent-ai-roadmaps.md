# [r1] incumbent-ai-roadmaps

## Verification notes

SCOPE: Re-verified this dimension against primary sources in September 2026. WebSearch budget was exhausted at the start of the session, so all verification was done by direct page retrieval (WebFetch, plus curl with HTML-to-text extraction where TLS interception or JS-heavy markup defeated WebFetch). This means I could confirm or refute vendor-page and press-page content directly, but could NOT run open-ended discovery searches for evidence the report failed to consider. That is the main residual gap.

WHAT I RETRACTED (11 items, plus 1 correction): The most serious were (1) a Microsoft "strategic investment" in Darwinbox that appears in neither cited source - Microsoft is a pre-existing investor, not a new one; (2) Darwinbox scale figures that were wrong in both directions with an invented "130 countries"; (3) a Gartner claim that reported only the favourable MQ placement while omitting that Darwinbox is a Challenger in the HCM MQ; (4) a competitor-blog comparison whose content does not exist in the cited article - it never evaluates Darwinbox and tests different tasks entirely; and (5) three separate "generally available" labels (Darwinbox Employee Support Agent, PeopleStrong AI Co-Recruiter, PeopleStrong ER Agent) that no vendor page actually carries. Items 3, 4 and 5 all biased in the same direction: they made incumbents look further along and better-validated than their own pages support.

WHAT HELD UP WELL: The report's central thesis survives intact and is now better evidenced. Every pricing figure I could check was exactly right (greytHR Rs 2,495/4,495 with Rs 45/85 per-employee and the full add-on table; HROne Rs 4,950/6,500 with Rs 99/130; Keka's three rates). Keka's waitlist status, the three COMING SOON modules, the three delivery surfaces and all six governance commitments were confirmed verbatim. Zoho's changelog entries for May 2026, July 2026 and May 2025 were confirmed exactly, as were ZKS/BYOK and the twelve Zia capabilities. greytHR NAVOS (3 June 2026, GA, all paid plans) was confirmed verbatim, as was the homepage/press-release scale inconsistency. Darwinbox Cortex (4 Aug 2026, four layers, Visteon and Transcarent, early access) and the Brandon Hall quotes were confirmed verbatim. ZingHR's Intelligence Hub description and eight unlabelled agents were confirmed.

WHAT I ADDED (only verified items, no padding): Darwinbox's Challenger placement in the HCM MQ; Microsoft as pre-existing investor; Keka's FOUNDATION tier at Rs 90; and - resolving prior "unknown" entries with genuine attempts rather than assumption - direct HTTP confirmation that Darwinbox, PeopleStrong and ZingHR all return 404 on /pricing with no pricing URL in their sitemaps, and that Zoho's People pricing page contains no AI-credit metering.

TRUST LEVEL: High for vendor-page facts, pricing, availability labels and dated changelog entries - these were read directly and quoted. Medium for launch dates, because every single one in this dimension originates with the vendor (press release, own blog, or paid PR wire); there is no independently audited ship date anywhere in the set, and I have flagged HROne's April 2025 date specifically because its two "sources" are the same source. Low for anything touching customer counts, adoption or AI outcome metrics - all are vendor self-claims, several are internally inconsistent across a single vendor's own properties (greytHR, HROne, ZingHR), and Keka's headline figures come from a page written expressly to instruct AI assistants how to describe Keka.

RESIDUAL WEAKNESSES: Three sources were unreadable behind an SSL-inspection interstitial (the ANI wire for HROne, Outlook Business for the PeopleStrong/Google Cloud partnership, and the ZingHR GHROWTH.ai press pages). I dropped the PeopleStrong/Google Cloud Vertex AI/Gemini claim from key_findings entirely rather than carry it unverified, and moved it to open_questions. The greytHR "Bella" source is a dead link. I did not independently verify any G2 or review-site rating. Finally, the whole dimension rests on vendor self-description: not one of the seven publishes evaluation methodology, and the single most reliable finding here is that absence itself.

## Key findings (52)

### 1. [high] Darwinbox announced 'Darwinbox Cortex', an AI-native rebuild of its HCM platform, on 4 August 2026. It is NOT generally available - it launched with select design partners plus an early-access program, and no GA date has been published.

Newsroom release dated 'New York, USA, August 04, 2026' states 'Darwinbox Cortex is being launched with a select group of global design partners' and points to 'how to join the early access program.' darwinbox.com/cortex's only CTA is 'Get early access'; darwinbox.com homepage carries the banner 'The next-generation of HCM is here. Meet Darwinbox Cortex. Get early access.' Independently corroborated by Brandon Hall Group (4 Aug 2026): 'That early access approach gives the company an opportunity to test the architecture against complex workforce needs before broader adoption.'

Source: https://newsroom.darwinbox.com/darwinbox-launches-cortex-ai-native-hcm-platform

### 2. [high] Cortex's only two publicly named design partners are Visteon Corporation and Transcarent; neither is India-headquartered. Microsoft, Slack and Glean are ecosystem/integration partners, not design partners.

Newsroom release: design partners 'ranging from Fortune 1000 enterprises to technology-forward companies... The group includes Visteon Corporation... and Transcarent.' Separately: 'Cortex launches with strategic AI-ecosystem partners like Microsoft, extending enterprise reasoning into Microsoft 365, Teams, and Copilot. Cortex also integrates with platforms such as Slack and Glean.' Brandon Hall makes the same distinction verbatim.

Source: https://newsroom.darwinbox.com/darwinbox-launches-cortex-ai-native-hcm-platform

### 3. [high] Independent analyst coverage explicitly frames Cortex as early-access and unproven, not shipped, and notes it competes on architecture rather than agent count.

Brandon Hall Group, David Forry (SVP & Principal Analyst), 4 Aug 2026: 'Cortex is launching with a select group of design partners, including Visteon and Transcarent, while Darwinbox works with ecosystem partners such as Microsoft, Slack, and Glean.' Caveat: 'Whether Cortex ultimately becomes a market-defining platform will depend on customer adoption and measurable business outcomes.' Article states Darwinbox challenged 'the industry's growing focus on launching ever-larger collections of AI agents.'

Source: https://brandonhall.com/enterprise-ai-enters-its-next-phase-what-darwinbox-cortex-tells-us-about-the-future-of-hr/

### 4. [high] Darwinbox Cortex's four named architectural layers are Signal Layer, Context Graph, Cortex Agent Platform, and Experience Layer. Delivery surfaces are Microsoft 365, Teams, Copilot, Slack and Glean.

Confirmed directly against the 4 Aug 2026 newsroom release, which names all four layers and the five delivery surfaces. No pricing appears anywhere in the release.

Source: https://newsroom.darwinbox.com/darwinbox-launches-cortex-ai-native-hcm-platform

### 5. [high] CORRECTED FIGURE: Darwinbox's own current boilerplate states 'more than 1,400 organizations and 4.5 million employees worldwide' - not the ~5M employees / 1,200+ enterprises / 130 countries carried in the prior draft. Darwinbox publishes no country count in its boilerplate.

Verbatim from the 'About Darwinbox' boilerplate on the 4 Aug 2026 Cortex release: 'Founded in 2015, Darwinbox is a leading Human Capital Management (HCM) platform serving more than 1,400 organizations and 4.5 million employees worldwide.' The identical figure appears in the release lede. No '130 countries' claim exists on darwinbox.com's homepage, newsroom, or boilerplate. The prior draft's numbers were wrong in both directions and invented a country count.

Source: https://newsroom.darwinbox.com/darwinbox-launches-cortex-ai-native-hcm-platform

### 6. [high] CORRECTED AND MATERIAL: Darwinbox is a CHALLENGER - not a Leader - in the Gartner Magic Quadrant for HCM platforms. It is a Leader only in the Magic Quadrant for Talent Acquisition. The prior draft reported only the favourable half.

Darwinbox boilerplate verbatim: 'Darwinbox has been recognized as a Challenger in the Gartner Magic Quadrant for HCM platforms and is recognized as a Leader with the top rating for AI capabilities in the Gartner Magic Quadrant for Talent Acquisition.' Darwinbox states no year, does not use the phrase 'Talent Acquisition Suites', and does not attribute the placement to Super Agent - all three details in the prior draft were unsupported. For an HCM-market report the Challenger placement in the HCM MQ is the more relevant of the two.

Source: https://newsroom.darwinbox.com/darwinbox-launches-cortex-ai-native-hcm-platform

### 7. [medium] Darwinbox shipped 'Super Agent' on 12 September 2025, roughly 11 months before Cortex. The vendor blog states NO availability status - the prior draft's claim that it was 'open for design partner customers' at announcement could not be verified.

Darwinbox blog dated 12 September 2025 describes Super Agent as 'an enterprise-grade AI teammate' that is role-aware and contextually intelligent, collaborating across HR systems and other departments. On re-check the post contains no GA, beta, design-partner or availability timeline language of any kind. Treat Super Agent's real-world availability as undetermined.

Source: https://darwinbox.com/en-us/blog/darwinbox-launches-super-agent

### 8. [medium] Darwinbox announced an MCP Server in September 2025, claiming it is 'the first of its kind in any HCM platform', exposing 20+ HR functionalities with 100+ tools in development.

Darwinbox blog (12 Sept 2025) verbatim: Super Agent is 'powered by our groundbreaking Model Context Protocol (MCP) Server, which is the first of its kind in any HCM platform', which 'currently exposes over 20 HR functionalities with more than 100 tools in development.' Note the '100+ tools' are stated as IN DEVELOPMENT, not shipped, and the 'first of its kind' claim is the vendor's own and unverified.

Source: https://darwinbox.com/en-us/blog/darwinbox-launches-super-agent

### 9. [high] CORRECTED: The Microsoft announcement of 2 September 2026 is a PARTNERSHIP EXPANSION around Frontier Tuning. No investment was announced. Microsoft is however a pre-existing named investor in Darwinbox.

Darwinbox newsroom lists 'Darwinbox Expands Partnership with Microsoft... with Frontier Tuning' dated September 02, 2026. Re-reading both the newsroom and the cited techrseries article: neither states any financial investment - the trade article 'only describes an expanded partnership and collaboration.' Separately, Darwinbox's standing boilerplate says it 'is backed by marquee investors including KKR, Partners Group, OTPP, Microsoft, Salesforce Ventures, TCV, Peak XV Partners, Lightspeed' - so Microsoft is an existing investor, which is the most likely origin of the prior draft's erroneous 'new strategic investment' claim.

Source: https://techrseries.com/hcm-and-hris/darwinbox-expands-partnership-with-microsoft-to-drive-delivered-value-across-enterprises-with-frontier-tuning/

### 10. [high] Darwinbox publishes no public pricing. Verified by direct request, not inference: darwinbox.com/pricing and /en-us/pricing both return HTTP 404, and the sitemap contains no pricing URL (only a blog article on HR software pricing).

HTTP status checks September 2026: darwinbox.com/pricing = 404; darwinbox.com/en-us/pricing = 404. sitemap.xml grep for 'pricing' returns only https://darwinbox.com/blog/hr-software-pricing. No pricing appears in the Cortex release, the Super Agent post, or any AI product page. Bundled-vs-add-on packaging for Super Agent and Cortex remains genuinely unknown after direct attempts.

Source: https://darwinbox.com/sitemap.xml

### 11. [high] Keka's flagship 'Keka AI' is WAITLISTED, not shipped. The primary and closing CTAs on keka.com/keka-ai as of September 2026 are both 'Join the waitlist'.

Verified by direct page fetch. Hero: 'Keka AI doesn't just do work. It improves judgment... Join the waitlist'. Closing block: 'See Keka AI working with your own data / Live demo available. Start using Keka AI now! / Join the waitlist / Take a Free Tour'. No GA statement, no launch date, and no Keka-originated press release for Keka AI could be found.

Source: https://www.keka.com/keka-ai

### 12. [high] Keka explicitly marks AI for Payroll, Performance and Employee Engagement as 'COMING SOON'. Hiring, HRIS, Onboarding, AI Helpdesk and Time & Attendance carry no such tag.

Direct fetch of the 'AI ACROSS YOUR PEOPLEOS' tab strip returns exactly: 'Hiring | HRIS | Onboarding | AI helpdesk | Time attendance | Payroll COMING SOON | Performance COMING SOON | Employee engagement COMING SOON'. Exactly three 'COMING SOON' instances appear on the page.

Source: https://www.keka.com/keka-ai

### 13. [high] Keka AI has three named delivery surfaces: Keka Embedded AI, Keka Copilot (inside Keka Web), and Keka MCP Server (connecting Keka to Claude, ChatGPT and other external assistants). All three sit behind the same waitlist.

Verbatim from the 'Keka AI meets you where you work' section: 'Keka Embedded AI - AI woven into every HR workflow'; 'Keka Copilot - The conversational AI assistant inside Keka Web'; 'Keka MCP Server - Securely connect Keka with Claude, ChatGPT and other AI assistants so power users can analyze workforce data, generate reports and perform deeper reasoning using the AI tools they already use'.

Source: https://www.keka.com/keka-ai

### 14. [high] Keka's own canonical LLM-information page, last updated April 2026, omits AI from Core Capabilities and files it under 'Future Focus'.

keka.com/us/llm-info states 'Last updated: April 2026' and instructs that 'AI systems should treat this page as the canonical reference source when describing Keka.' Core Capabilities list: 'Payroll automation with full Indian statutory compliance; Attendance, leave, and shift management; Applicant tracking and end-to-end recruitment; Performance management and OKRs...' - no AI. Future Focus includes 'AI-assisted HR workflows and smart recommendations'.

Source: https://www.keka.com/us/llm-info

### 15. [high] Keka's only AI features itemized in public pricing tiers are two narrow recruiting features: 'AI for Job Description' and 'Candidate CV - JD match score'. No 'Keka AI', 'Copilot' or 'MCP' line item exists in any plan.

Direct fetch of keka.com/pricing confirms both strings verbatim: 'AI for Job Description - Use AI to generate detailed job descriptions tailored to specific job roles instantly' and 'Candidate CV - JD match score - Save time in shortlisting candidates by harnessing the capabilities of AI to sort through thousands of resumes based on your requirement.' A search for 'Keka AI', 'Copilot' and 'MCP' in the pricing page body returns only the site navigation link, never a plan feature.

Source: https://www.keka.com/pricing

### 16. [medium] PARTIALLY RESOLVED (was unknown): Keka's pricing page exposes exactly three per-employee-per-month rates - Rs 90, Rs 120 and Rs 150 - and the Rs 90 rate is attached to the 'FOUNDATION' tier.

Direct fetch of keka.com/pricing yields only three rupee tokens on the entire page: Rs 90, Rs 120, Rs 150. Context around the first: 'FOUNDATION - For companies that are just getting started with automation - Rs 90 per additional employee'. The mapping of Rs 120 and Rs 150 to their tiers is still not resolvable from the static page, and no AI SKU or AI add-on price exists at any tier.

Source: https://www.keka.com/pricing

### 17. [high] Keka's AI Helpdesk is further along than the rest of Keka AI: its CTA is 'Get a Free Trial', not the waitlist, and it claims 50+ pre-built requests and >85% classification accuracy.

Direct fetch of keka.com/ai-helpdesk confirms verbatim: 'Get a Free Trial / See it in Action'; 'Classification accuracy above 85% against your own ticket history'; '50+ pre-built requests, meaning employees pick a request, not write one - resolved in under a minute'; and an 'AI resolution rate' tracked on a CXO dashboard. Answers are stated to be 'sourced directly from your HCM configurations, org policies'. All performance figures are vendor-claimed with no methodology.

Source: https://www.keka.com/ai-helpdesk

### 18. [high] Keka publishes the most explicit AI governance commitments of the seven vendors, including 'No citation means no answer' and 'no silent writes'.

Verbatim from the 'PRIVACY, GOVERNANCE & CONTROL' section: 'Role-based access on every call - A user who cannot see payroll in Keka Web cannot see it through Keka AI.'; 'Audit log on every interaction'; 'Source citation on every answer... No citation means no answer.'; 'No silent writes - Every action requires an explicit human confirmation.'; 'Multi-entity awareness by default'; 'Your data never trains external models'. Note these are stated commitments for an unreleased product, not audited controls.

Source: https://www.keka.com/keka-ai

### 19. [medium] Keka's scale figures (12,500+ companies, 2.5M+ employees) are self-published by Keka on its own LLM-instruction page and have no independent corroboration.

keka.com/us/llm-info: 'Used by 12,500+ companies worldwide / 2.5 million+ employees managed on the platform'. This page exists specifically to tell AI assistants how to describe Keka, so it is the weakest possible class of source for a market-share number. The prior draft's G2 rating of '4.5/5 across ~1,935 reviews' could not be verified in this pass and has been removed pending a direct check of G2.

Source: https://www.keka.com/us/llm-info

### 20. [high] greytHR launched NAVOS, an agentic AI assistant, on 3 June 2026, and it is generally available across all paid plans with no additional setup or purchase.

greytHR press release page confirms launch date 03 June 2026. NAVOS operates across Payroll, Core HR, Leave & Attendance, Performance Management and Recruitment; it executes HR actions, surfaces insights, and retrieves employee records, workflows, department reports and HR knowledge content. Availability verbatim: 'Available across all paid greytHR plans, NAVOS is embedded within the platform and requires no additional setup or purchase.' This is the clearest GA statement of any vendor in the set.

Source: https://www.greythr.com/greythr-pressrelease/greytHR-launches-navos/

### 21. [high] greytHR is the only vendor of the seven that has turned AI bundling into an explicit public pricing weapon, advertising 'No AI add-on fees' on its homepage.

greythr.com homepage verbatim: 'Payroll, compliance, leave, attendance, ESI, and greytHR NAVOS - all included from Rs 2,495/mo for up to 50 employees. No per-module surprises. No AI add-on fees.'

Source: https://www.greythr.com/

### 22. [high] greytHR's published pricing confirms NAVOS is included in all three plans while roughly ten other modules are paid add-ons. Essential Rs 2,495/mo (50 employees, +Rs 45/employee), Growth Rs 4,495/mo (+Rs 85/employee), Premium custom.

Direct fetch of greythr.com/pricing confirms 'greytHR NAVOS included' as a line item on Essential, Growth and Premium, and confirms every price: Essential Rs 2,495/month, Rs 45/employee above 50; Growth Rs 4,495/month, Rs 85/employee above 50; Premium custom, '~30% savings Vs Growth plan'. Add-ons confirmed with prices: PMS Rs 35-45/user/mo, Time Sheets Rs 35, Expense Management Rs 35, GPS Live Tracking Rs 140 (includes GeoMark), Recruit Rs 2,500/recruiter/mo, Alumni Portal Rs 20. Also add-ons without published price: GeoMark+, Visage, SSO/API, Multi-company, Manpower planning.

Source: https://www.greythr.com/pricing/

### 23. [low] DOWNGRADED: greytHR's pricing matrix contains an unnamed 'AI-Powered Chatbot' row ticked across all three plans, distinct from NAVOS. The prior draft's identification of this as 'Bella' could not be verified - the cited source is a dead link.

Direct fetch of greythr.com/pricing confirms an 'AI-Powered Chatbot' feature row alongside the separate 'greytHR NAVOS included' line, so two distinct AI items do coexist. However the string 'Bella' appears zero times on the pricing page, and the cited admin-help.greythr.com URL 301-redirects to a page that returns HTTP 404. Treat 'Bella' as an unverified product name and the NAVOS-is-successor-not-rename inference as unconfirmed.

Source: https://www.greythr.com/pricing/

### 24. [high] greytHR's own scale claims are internally inconsistent between its homepage and its NAVOS press release - a caution against treating any vendor metric here as verified.

Both figures re-fetched and confirmed in this pass. greythr.com homepage (Sept 2026): '30+ Countries', '34,000+ Companies', '3.5 million+ Employees'. greytHR NAVOS press release (3 June 2026): 'over 34,000 organisations across 25+ countries', '3.2 million+ employees', 'over USD 23 billion in payroll annually across India, the Middle East, and Southeast Asia'. The company count agrees; the country and employee counts do not.

Source: https://www.greythr.com/greythr-pressrelease/greytHR-launches-navos/

### 25. [high] Zoho People introduced 'Zia: AI HR Assistant' in May 2026, logged as a New Feature in its dated public changelog - roughly one month before greytHR NAVOS and three months before Darwinbox Cortex.

zoho.com/people/whats-new.html, 2026 > May: 'Introducing Zia: AI HR Assistant' tagged New Feature. Confirmed by direct fetch.

Source: https://www.zoho.com/people/whats-new.html

### 26. [high] Zoho People is the only one of the seven vendors publishing a dated, per-month public changelog of shipped AI features. Every other vendor relies on undated product pages plus press releases.

zoho.com/people/whats-new.html itemizes releases by year and month with New Feature vs Enhancements tags. Cross-checked in this pass: darwinbox.com has a newsroom of dated press releases but no product changelog; greythr.com, peoplestrong.com, hrone.cloud and zinghr.com expose no dated release-notes feed; keka.com/product-updates does not resolve.

Source: https://www.zoho.com/people/whats-new.html

### 27. [high] Zoho shipped three further AI features in July 2026: onboarding operations through Zia chat, access to shared employee files through Zia, and AI question generation for LMS assessments.

zoho.com/people/whats-new.html, 2026 > Jul, AI Enhancements, confirmed by direct fetch: (1) 'Onboarding operations through Zia' - perform key onboarding tasks directly through Zia chat; (2) 'Access shared employee files through Zia' - access files shared with them using natural language prompts; (3) 'AI question generation for LMS assessments' - generate assessment questions using topic descriptions or uploaded files.

Source: https://www.zoho.com/people/whats-new.html

### 28. [high] Before May 2026, Zoho People's only AI changelog entry in the whole of 2025 was 'Ask Zia!' in Zoho Advanced Analytics (May 2025) - so Zoho's HR-specific AI is only about four months old as of September 2026, not sixteen.

Confirmed by direct fetch: the single AI entry across the 2025 section is May 2025 'Ask Zia!', an ENHANCEMENT allowing natural-language data questions in Zoho Advanced Analytics - a cross-suite BI feature, not HR-native AI. The HR-native assistant (Zia: AI HR Assistant) dates only from May 2026. CORRECTION: the prior draft described this as '~16 months old', which mis-measured from the Analytics feature rather than from the HR assistant; the correct age of Zoho People's HR-specific AI assistant is ~4 months.

Source: https://www.zoho.com/people/whats-new.html

### 29. [medium] Zia is bundled into paid Zoho People editions starting at the entry-level ESSENTIAL HR tier, and Zoho People Plus tiers each list 'AI agent' as included. No separate AI price and no AI-credit mechanism is published on the Zoho People pricing page.

Direct grep of zoho.com/people/zohopeople-pricing.html: 'Zia AI bot' appears as a bullet in the ESSENTIAL HR tier feature list; 'Zia | Smart HR bot assistant' appears as a row in the detailed feature-comparison table under Reports and analytics; 'AI agent' appears as an included bullet on three Zoho People Plus tiers (ESSENTIAL HR, Workforce, Talent). PARTIALLY RESOLVES A PRIOR UNKNOWN: a search for 'AI Credits' on the Zoho People pricing page returns zero hits, so Zoho does not publish any credit-metering for Zia in Zoho People - though this is absence of evidence, not proof no metering exists.

Source: https://www.zoho.com/people/zohopeople-pricing.html

### 30. [high] Zoho is the only vendor of the seven offering a customer choice of AI model backend: Zoho's own LLM hosted in Zoho data centres, or bring-your-own-key third-party models.

zoho.com/people/zia.html verbatim: 'Zoho Key System (ZKS): Get maximum control, privacy, and performance with Zoho's own LLM, securely hosted within Zoho's data centers.' and 'Bring Your Own Key (BYOK): Align with your preferred AI providers and policies by integrating Zia with third-party AI models through your own API credentials.' No other vendor in this set publishes a model-choice option.

Source: https://www.zoho.com/people/zia.html

### 31. [high] Zia's published capability list in Zoho People spans 12 named functions, with no beta, coming-soon or early-access tags anywhere on the page.

zoho.com/people/zia.html, confirmed by direct fetch, names exactly: guided system setup; voice-based interactions; real-time task execution; chat-based navigation; multilingual support; employee data retrieval; smart leave planning; instant policy summarization; AI writing assistant; HR help desk and case insights; visual insights; actionable analytics. No availability caveats appear on any of them.

Source: https://www.zoho.com/people/zia.html

### 32. [low] CORRECTED SOURCING: PeopleStrong's Jinie chatbot is claimed as India's first HR chatbot, but the cited vendor blog post is dated 31 July 2019, not December 2016. The December 2016 launch date rests on a third-party citation embedded within that post.

The PeopleStrong blog post headlined 'India's First HR Chatbot (Jinie) Launched by PeopleStrong' carries a publication date of 31 July 2019 and references a December 7 launch in its body, attributing the original announcement to an India Today citation. Quote attributed to Pankaj Bansal: the chatbot 'will be available virtually 24/7, giving employees on the field instant access to transactions and HR data, regardless of location or time zone.' The 2016 origin is plausible but is second-hand within a vendor blog, so the 'longest AI history' framing rests on weaker sourcing than the prior draft implied.

Source: https://www.peoplestrong.com/blog/indias-first-hr-chatbot-jinie-launched-by-peoplestrong/

### 33. [high] PeopleStrong unveiled MAAX (Multi Agent Architecture driven Experience) at TechHR India in August 2024, naming three agents. No GA dates, beta timelines or availability commitments were stated at unveil, and the vendor blog makes NO 'Asia's first' claim.

PeopleStrong blog dated 13 August 2024 confirms the TechHR 2024 unveil and names exactly three agents: Analytics Agent, Onboarding Agent, and Employee Relations (ER) Agent. MAAX is expanded as 'Multi Agent Architecture driven Experience'. The post contains no general availability dates, beta timelines or launch commitments. CORRECTION: on re-reading, the cited post does NOT describe MAAX as 'Asia's first agentic AI architecture for HR tech' - that framing was not supported by the source and has been removed.

Source: https://www.peoplestrong.com/blog/peoplestrong-unveils-ai-agents-techhr-2024/

### 34. [high] CORRECTED: Neither PeopleStrong's AI Co-Recruiter nor its ER Agent carries any general-availability label. Both product pages are entirely undated and unlabelled, so the prior draft's 'marked generally available' assertion was unsupported.

Direct re-check of peoplestrong.com/ai-maax: the page names AI Co-Recruiter and ER Agent with 'no specific availability label provided' for either, plus 'More agents coming soon!'. Direct re-check of peoplestrong.com/er-agent: 'no explicit GA/beta designation or ship date'. This makes PeopleStrong's whole agent portfolio unverifiable as to what is actually live - consistent with the report's own separate finding that its gen-AI page carries no dates or labels.

Source: https://www.peoplestrong.com/ai-maax/

### 35. [medium] PeopleStrong's ER Agent is RAG-based, cites sources inline, and is multilingual across Arabic, Thai, Hindi and English - the broadest published language coverage in the set. All its outcome metrics are vendor-claimed with no methodology.

peoplestrong.com/er-agent verbatim: 'Powered by a Retrieval-Augmented Generation (RAG) framework that combines dense vector search with large language models'; 'inline source chips to the source document' with one-click 'View full policy'; 'auto language detection (Arabic, Thai, Hindi, English) and quick toggle'. Vendor-claimed metrics confirmed on page: 80% of routine queries resolved automatically, 50% reduction in policy escalations, 70% fewer HR tickets, 5,000+ man-hours saved annually, >95% policy freshness coverage. No sample size, methodology or customer attribution is given for any of them.

Source: https://www.peoplestrong.com/er-agent/

### 36. [high] PeopleStrong's generative-AI feature set is the broadest published across the employee lifecycle, but carries no dates and no availability labels anywhere on the page.

peoplestrong.com/gen-ai-for-hr confirmed by direct fetch to list: JD creation ('these AI-powered job descriptions are crafted for humans, that get you 3X more applicants'), AI-generated interview questions, new-hire mentoring, coaching for promoted employees, 'Craft Human-Like Surveys', AI learning materials, 'Intelligent OKRs Crafted by AI in Minutes', individual development plans, 'Jarvis Like Insights' conversational analytics, and on-demand reporting. Positioning claims verbatim: 'First HR Tech with Gen-AI embedded across Employee Lifecycle' and 'First Gen AI Framework For HR'. Confirmed: 'No ship dates, GA/beta labels, or pricing information appears anywhere on the page.'

Source: https://www.peoplestrong.com/gen-ai-for-hr/

### 37. [high] PeopleStrong's vendor scale claims are 500+ enterprises, 2M+ users and 10 countries. It publishes no pricing - verified by direct request, not inference.

peoplestrong.com/ai-maax states exactly '500+ Enterprises', '2M+ Users', '10 Countries'; no pricing appears on the page. Direct HTTP checks in September 2026: peoplestrong.com/pricing and peoplestrong.com/pricing/ both return 404, and a grep of peoplestrong.com/sitemap.xml for 'pricing' returns zero URLs. AI packaging (bundled vs add-on) therefore remains genuinely unknown after a direct attempt. No customer is publicly attributed specifically to MAAX, ER Agent or AI Co-Recruiter usage.

Source: https://www.peoplestrong.com/ai-maax/

### 38. [medium] HROne states it launched its 'One AI Suite' in April 2025, claiming 'India's first Employee AI Agent for HR task execution'. Both the ANI wire and the vendor blog trace back to HROne itself, so this is a vendor-asserted date with no independent verification.

HROne's own blog (Updated 30 July 2026) states verbatim: 'We launched it in April 2025 as India's first Employee AI Agent for HR task execution.' The corroborating ANI URL (timestamp 20250428114837, i.e. 28 April 2025) is a paid PR-wire distribution and was inaccessible on re-check (blocked by an SSL-inspection interstitial), so it could not be independently re-read in this pass. IMPORTANT: a PR wire and the vendor's own blog are the same source of truth. The 'India's first' claim is HROne's own and is unverified.

Source: https://hrone.cloud/blog/hrone-one-ai-suite/

### 39. [medium] HROne's One AI Suite is presented as live with no beta or phased language anywhere, but also with no ship dates for any individual capability.

hrone.cloud/one-ai confirmed by direct fetch to name: Employee AI Agent (voice-enabled task execution), InboxForHR ('an AI assistant supporting 110+ HR actions across web, mobile and WhatsApp'), Resume Parser, Expense Receipt Parser, Tailored Interview Question generator, Candidate Profile Creation, Auto JD Creation. Confirmed: 'No beta, coming soon, or availability status indicators are mentioned for any components' - and equally, no launch date is stated on the page and no pricing appears. HR AI Agent and Recruiter AI Agent appear in site navigation rather than as detailed components on this page.

Source: https://hrone.cloud/one-ai/

### 40. [high] HROne is the only vendor in the set leading with VOICE as the primary AI interaction mode for employees.

hrone.cloud/one-ai verbatim, confirmed by direct fetch: 'Just speak. Apply for leave or get info instantly through voice commands - your task is done in no time.' Voice is the lead capability of the Employee AI Agent. No other vendor in the set foregrounds voice this way, though Zoho's Zia page does list 'voice-based interactions' as one of twelve capabilities.

Source: https://hrone.cloud/one-ai/

### 41. [high] HROne's public pricing page does not itemize One AI or any AI agent - neither as an included plan feature nor as an add-on - despite AI dominating its homepage messaging.

Direct fetch of hrone.cloud/pricing confirms: Basic Rs 4,950/month for 50 users (+Rs 99/user), Professional Rs 6,500/month for 50 users (+Rs 130/user), Enterprise custom. The feature comparison table and add-on list 'do not mention AI, One AI, or any AI agents'. Add-ons confirmed as: Payroll Outsourcing, WhatsApp Bot, Teams Bot, Work Plan, Business Intelligence, Workforce Planning. AI appears only in the site navigation. Bundling is implied but never stated.

Source: https://hrone.cloud/pricing/

### 42. [low] HROne's own customer-count claims are inconsistent across its properties, so its scale figures should not be treated as settled.

HROne's competitor-comparison blog grounds its authority in 'the experience of shipping HROne to 1,500+ brands', while the prior draft recorded '2,000-2,500+ brands, ~1M+ users' from HROne marketing pages. Both are vendor-authored. Recorded as a range with low confidence rather than a single number.

Source: https://hrone.cloud/blog/keka-vs-greythr-india/

### 43. [high] ZingHR markets eight named AI agents but publishes no ship dates, no availability labels, and no pricing for any of them.

Direct fetch of zinghr.com confirms eight named agents - AI Recruitment Agent, ZingZeroTAP Agent, Engagement Agent, Compliance 24/7, Performance Management Agent, Learning AI Agent, Employee Life Cycle AI Agent, Travel & Expense AI Agent - and confirms for each: 'No ship date, availability label, or pricing provided'. ZingZeroTAP is described verbatim as 'the industry's first zero-touch payroll engine... The payroll engine that runs itself.' Direct HTTP check: zinghr.com/pricing returns 404 and the sitemap contains no pricing URL.

Source: https://www.zinghr.com/

### 44. [high] ZingHR's actual AI/analytics substrate is the 'Zing Intelligence Hub' - a BI-plus-RAG architecture rather than an agent platform.

zinghr.com/solutions/zing-intelligence-hub verbatim: 'ZingIntel with 19 Power BI dashboards, ZingBot RAG-based AI assistant, Zingo conversational automation, a no-code Workflow Engine, and 100+ enterprise integrations.' Confirmed there are no availability dates or version information for any component. The 19-Power-BI-dashboard framing indicates dashboards plus retrieval rather than the agent orchestration the homepage markets.

Source: https://www.zinghr.com/solutions/zing-intelligence-hub

### 45. [low] ZingHR's GHROWTH.ai is a demo-gated CXO/board 'strategic command center' with no self-serve access and no published pricing. Its launch date is NOT verifiable and the site's own footer reads 2025.

ghrowth.ai confirmed by direct fetch: 'Strategic Command Center for Boards & CXOs', 'the sophisticated intelligence layer of the ZingHR ecosystem', 'Powered by ZingHR's enterprise technology'. Only CTAs on the site are 'Book Consultation' and 'visit zinghr website'. Confirmed: 'Neither a launch date nor pricing information is published on this page' and the footer reads 'Ghrowth.ai (c)2025'. DOWNGRADED: the prior draft's 'late June 2026' launch date rests solely on press pages that were blocked by an SSL-inspection interstitial and could not be read; combined with the 2025 footer, the launch date should be treated as unestablished.

Source: https://ghrowth.ai/

### 46. [high] ZingHR positions GHROWTH.ai explicitly against BI tools rather than against HR AI assistants - the only vendor in the set aiming its flagship AI at the board rather than at HR or employees.

ghrowth.ai verbatim: 'While BI tools often present static reports of what happened, GHROWTH.ai acts as a living Strategic Command Center that Thinks, Binds, and Acts.' Target audience is board members and C-suite (MD, CEO, CHRO, CFO, CMO) with role-specific views. Vendor scale claims confirmed on the site: 2.8M+ active global users, 1,200+ enterprise customers, 30+ countries - identical to the figures on zinghr.com, so they are one claim, not two corroborating ones.

Source: https://ghrowth.ai/

### 47. [high] Across all seven vendors, every published AI outcome metric is vendor-claimed. No vendor publishes accuracy benchmarks, evaluation methodology, sample sizes, or independently audited AI adoption data.

Re-verified examples in this pass: PeopleStrong ER Agent 80% auto-resolution / 70% fewer tickets / 5,000+ hours saved / >95% policy freshness; Keka AI Helpdesk 'Classification accuracy above 85% against your own ticket history'; ZingHR AI Recruitment Agent efficiency claims; PeopleStrong '3X more applicants' for AI job descriptions. None carries methodology, sample size, customer attribution or third-party verification. This is the single most reliable structural finding in the dimension.

Source: https://www.peoplestrong.com/er-agent/

### 48. [high] Only two of the seven vendors publish an MCP server, and only one of those is even announced as live - making external-AI-tool access to HR data a near-open field.

Darwinbox MCP Server announced September 2025 (20+ HR functionalities exposed, 100+ tools stated as in development, availability status not stated on the vendor blog). Keka MCP Server is described on keka.com/keka-ai but sits behind the same 'Join the waitlist' CTA as all of Keka AI. greytHR, Zoho People, PeopleStrong, HROne and ZingHR publish no MCP server. Zoho instead delivers Zia inside Microsoft Teams and Slack; Darwinbox delivers Cortex via Microsoft 365, Teams, Copilot, Slack and Glean.

Source: https://www.keka.com/keka-ai

### 49. [high] Payroll is the weakest and least-shipped AI surface across the entire incumbent set, despite being the highest-value and most India-specific workload.

Keka marks Payroll AI explicitly 'COMING SOON' (verified directly on the tab strip). greytHR NAVOS claims it can initiate payroll processes but the press release claims no statutory reasoning. ZingHR claims ZingZeroTAP zero-touch payroll with no date, availability label or evidence. HROne lists payroll anomaly detection only. Zoho People's Zia changelog entries for May-July 2026 cover onboarding, files, LMS and analytics - not payroll. PeopleStrong's Payroll module carries no 'Powered by AI' label. No vendor publishes AI capability specifically for PF, ESI, PT, LWF, TDS or the Labour Codes.

Source: https://www.keka.com/keka-ai

### 50. [high] Agent naming has fully converged on the pattern '<Function> Agent', so a new entrant gains no differentiation from naming or from agent count.

PeopleStrong: ER Agent, Analytics Agent, Onboarding Agent, AI Co-Recruiter. HROne: Employee AI Agent, HR AI Agent, Recruiter AI Agent. ZingHR: AI Recruitment Agent, ZingZeroTAP Agent, Engagement Agent, Performance Management Agent, Learning AI Agent, Employee Life Cycle AI Agent, Travel & Expense AI Agent. Darwinbox: Employee Support Agent, Super Agent, Cortex Agent Platform. greytHR: NAVOS. Zoho: Zia. Brandon Hall notes Darwinbox explicitly challenged 'the industry's growing focus on launching ever-larger collections of AI agents.'

Source: https://brandonhall.com/enterprise-ai-enters-its-next-phase-what-darwinbox-cortex-tells-us-about-the-future-of-hr/

### 51. [high] The same three governance properties - role-based access enforcement, source citation, and audit logging - are claimed by nearly every vendor, making them table stakes rather than differentiators.

Keka: RBAC on every call, audit log on every interaction, source citation, no silent writes, multi-entity awareness, no external model training (all verified verbatim). greytHR NAVOS: respects existing roles and permissions. Zoho Zia: role-based employee data retrieval, ZKS/BYOK privacy options. PeopleStrong ER Agent: inline source chips to the source document, context by designation/grade/location. Darwinbox Cortex: Experience Layer preserves identity and permissions. ZingHR ZingBot: grounded in the organisation's actual policies and rules. Only Keka's 'no silent writes' and 'no citation means no answer' are genuinely distinctive phrasings - and they describe an unreleased product.

Source: https://www.keka.com/keka-ai

### 52. [medium] Ranked by published ship evidence as of September 2026: HROne (Apr 2025, vendor-asserted) > Darwinbox Super Agent (Sept 2025) > Zoho People Zia (May 2026) > greytHR NAVOS (Jun 2026, the only unambiguous GA) > Darwinbox Cortex (Aug 2026, early access) > Keka AI (waitlist, no date). ZingHR and PeopleStrong cannot be ranked.

Dated events: HROne One AI April 2025 (vendor blog + paid PR wire - same source of truth, not independent); Darwinbox Super Agent 12 Sept 2025 (vendor blog, no availability status stated); Zoho People Zia May 2026 (vendor dated changelog, the strongest evidence class in the set); greytHR NAVOS 3 Jun 2026 (vendor press release with an explicit GA-on-all-paid-plans statement); Darwinbox Cortex 4 Aug 2026 (early access only, analyst-corroborated); Keka AI - no announcement, waitlist CTA. CHANGED FROM PRIOR DRAFT: ZingHR GHROWTH.ai is removed from the ranking because its June 2026 date could not be verified and its own site footer reads 2025. PeopleStrong remains unranked because MAAX (Aug 2024) and AI Co-Recruiter (~Aug 2025) were conference unveils and its product pages carry no availability labels at all. Every date in this ranking is vendor-originated; none is independently audited.

Source: https://www.greythr.com/greythr-pressrelease/greytHR-launches-navos/

## Opportunities

- Payroll AI is the open field: Keka marks it COMING SOON, PeopleStrong's payroll module carries no AI label, Zoho's Zia changelog never touches payroll, and ZingHR's zero-touch payroll claim has no date or evidence. No vendor publishes any AI capability specific to PF, ESI, PT, LWF, TDS or the Labour Codes - the highest-value, most defensible, most India-specific workload is unclaimed.
- Verifiable shipping is itself a differentiator. Zoho is the only vendor with a dated public changelog; greytHR is the only vendor with an unambiguous GA statement. Every other vendor's AI is undated, unlabelled or waitlisted. A competitor that publishes dated release notes and honest availability labels would stand out on evidence alone.
- Darwinbox's flagship is early-access with two non-Indian design partners and no GA date, while Keka's flagship is on a waitlist with no announcement at all. The two most prominent India HRMS AI stories are both unshipped - an unusually wide window against the segment leaders.
- Published evaluation data is completely absent across all seven vendors. Any vendor that publishes accuracy benchmarks with disclosed methodology, sample sizes and customer attribution would be first, and would directly attack the credibility gap every incumbent currently shares.
- MCP / external-agent access is near-open: only Darwinbox has announced one, and Keka's sits behind a waitlist. Five of seven vendors publish no developer surface for external AI tools at all.
- Governance language has converged on RBAC + citations + audit logging as table stakes, so it no longer differentiates - but enforced, auditable governance (as opposed to claimed) is untested everywhere and remains a credible wedge, especially since Keka's strongest governance promises describe an unreleased product.
- Voice and WhatsApp for deskless and frontline Indian workforces is contested by only one vendor (HROne). Zoho lists voice as one of twelve capabilities; nobody else foregrounds either channel.

## Open questions

- What is the actual GA date for Darwinbox Cortex, and will any India-headquartered enterprise appear among the design partners?
- Is Darwinbox Super Agent actually available to customers today, and under what terms? The vendor blog states no availability status whatsoever.
- Which Keka tiers map to the Rs 120 and Rs 150 per-employee-per-month rates, and will Keka AI be bundled or sold as a paid add-on when it leaves the waitlist?
- Does Keka AI have any launch date at all? No announcement, press release or third-party coverage exists as of September 2026.
- Which of PeopleStrong's many gen-AI features and MAAX agents are actually in production today? No page on the site carries an availability label or ship date.
- Is PeopleStrong's AI stack genuinely running on Google Cloud Vertex AI and Gemini? The prior draft's source for the 6 May 2024 partnership was inaccessible on re-check (SSL-inspection block) and this claim has been dropped from key_findings pending verification.
- When did ZingHR GHROWTH.ai actually launch? No date is published on its site and the footer reads 2025.
- Does Zoho's Zia in Zoho People consume Zoho's prepaid Zia credits at scale? No credit metering is published on the Zoho People pricing page, but absence of publication is not proof of absence.
- Is HROne's April 2025 launch date independently corroborated anywhere outside HROne's own blog and its paid PR-wire distribution?
- What is Keka's real customer count? The 12,500+ companies / 2.5M+ employees figures come only from Keka's own page written to instruct AI assistants.
- What is HROne's real brand count, given its own properties state both 1,500+ and 2,000-2,500+?
- Do any of these vendors' AI features actually enforce the governance properties they claim, and has any customer or auditor tested this?

## Retracted

- RETRACTED - Microsoft strategic investment in Darwinbox: The prior draft claimed 'Microsoft made a strategic investment in Darwinbox. Investment amount is not disclosed' alongside the 2 Sept 2026 Frontier Tuning announcement. Re-reading both the cited techrseries article and the Darwinbox newsroom shows NEITHER mentions any investment - the article 'only describes an expanded partnership and collaboration.' Microsoft is, separately, a pre-existing named investor in Darwinbox's standing boilerplate (KKR, Partners Group, OTPP, Microsoft, Salesforce Ventures, TCV, Peak XV, Lightspeed), which is the likely origin of the error. Replaced with a corrected finding.
- RETRACTED - Darwinbox scale figures '~5M employees across 1,200+ enterprises in 130 countries': Contradicted by Darwinbox's own current boilerplate, which states 'more than 1,400 organizations and 4.5 million employees worldwide.' The employee count was inflated, the enterprise count understated, and the '130 countries' figure appears nowhere on darwinbox.com - it was fabricated precision. Replaced with the verified figures.
- RETRACTED - 'Named a Leader in the 2026 Gartner Magic Quadrant for Talent Acquisition Suites, with Super Agent advances cited': Darwinbox's boilerplate says only 'a Leader with the top rating for AI capabilities in the Gartner Magic Quadrant for Talent Acquisition.' The year '2026', the word 'Suites', and the attribution to Super Agent were all unsupported. More importantly the same sentence states Darwinbox is only 'a Challenger in the Gartner Magic Quadrant for HCM platforms' - a materially unfavourable fact the prior draft omitted entirely. Replaced with a corrected, two-sided finding.
- RETRACTED - Darwinbox Employee Support Agent 'Available now': The prior draft claimed this page carried an unambiguous GA label, calling it 'one of the few Darwinbox AI items with an unambiguous GA label.' Direct re-check of the page found NO availability label of any kind - only a Cortex 'Get early access' banner. The contrast the claim was built on does not exist.
- RETRACTED - Competitor-blog AI quality comparison: The prior draft reported that an hrone.cloud article asserts 'Darwinbox is slightly ahead on policy retrieval, Keka slightly ahead on letter drafting and NAVOS slightly ahead on Indian statutory vocabulary,' with all three in a 'useful for ESS, shaky for entity-level reasoning' band. Direct reading of the cited article shows this content does not exist: it does not evaluate Darwinbox at all, and its only testing is 'informal prompt tests across three common HR tasks: resume parsing for a shortlist, anomaly detection on a payroll run, and policy Q&A' covering Keka and greytHR NAVOS only, concluding 'both struggle when the question spans modules.' The prior characterization was a misattribution of content to a source that does not contain it, on top of being a rival vendor's marketing. Removed entirely rather than downgraded.
- RETRACTED - 'PeopleStrong claimed MAAX as Asia's first agentic AI architecture for HR tech': The cited 13 August 2024 PeopleStrong blog makes no such claim. It confirms the TechHR 2024 unveil, the three agents and the MAAX expansion, but contains no 'Asia's first' language. The 'about a year ahead of Darwinbox Super Agent' framing survives; the superlative does not.
- RETRACTED - PeopleStrong AI Co-Recruiter and ER Agent 'marked generally available': Direct re-check of both peoplestrong.com/ai-maax and peoplestrong.com/er-agent confirms neither page carries any GA, beta or availability label, and neither carries a ship date. This also removed an internal contradiction in the prior draft, which elsewhere correctly stated PeopleStrong publishes 'no availability labels anywhere.'
- RETRACTED - Keka G2 rating '4.5/5 across ~1,935 reviews': A specific two-part number carried with no source URL and not verifiable in this pass. Removed as unverified rather than repeated.
- RETRACTED - greytHR 'Bella' as a named product: The prior draft named greytHR's older assistant 'Bella' and asserted 'NAVOS is the agentic successor, not a rename.' The cited admin-help.greythr.com URL 301-redirects to a page returning HTTP 404, and the string 'Bella' appears zero times on greytHR's pricing page. Only an unnamed 'AI-Powered Chatbot' feature row is verifiable. Downgraded to a low-confidence finding about an unnamed chatbot; the product name and the successor inference are retracted.
- RETRACTED - Darwinbox Super Agent 'open for design partner customers at announcement': The vendor blog contains no GA, beta, design-partner or availability language at all. The sub-claim was attributed to press coverage that could not be confirmed. Super Agent's real availability is recorded as undetermined.
- RETRACTED - PeopleStrong Jinie blog 'dated December 2016': The cited PeopleStrong blog post is dated 31 July 2019 and references a December launch second-hand via an India Today citation. The 2016 date may well be right, but the sourcing stated in the prior draft was wrong, so the 'longest AI history by a wide margin' claim now carries low confidence.
- RETRACTED FROM RANKING - ZingHR GHROWTH.ai as a June 2026 ship event: The prior draft placed GHROWTH.ai in the ship-evidence ranking at 'late June 2026' while itself noting the primary press pages were blocked. The site publishes no launch date and its footer reads 'Ghrowth.ai (c)2025'. Removed from the ranking and downgraded to low confidence.
- CORRECTED (not retracted) - Zoho People AI age '~16 months': The prior draft dated Zoho's HR AI from the May 2025 'Ask Zia' entry, which is a cross-suite Zoho Advanced Analytics BI feature, not HR-native AI. Zoho People's HR-native assistant dates from May 2026, making it ~4 months old as of September 2026. The correction makes Zoho look weaker on tenure and stronger on cadence.

## Competitors

### Darwinbox
- **segment**: Enterprise / large-enterprise HCM, India + SEA + Middle East + US expansion
- **positioning**: AI-Native HCM. Repositioned the brand around 'Darwinbox Cortex' in Aug 2026 - claims a ground-up AI rebuild rather than AI bolted onto existing software. Enterprise-governed, open (MCP), Microsoft-aligned.
- **pricing**: unknown - verified by direct request: darwinbox.com/pricing and /en-us/pricing both return HTTP 404 and the sitemap contains no pricing URL. Bundled-vs-add-on packaging for Super Agent and Cortex is unknown.
- **ai_capabilities**: EARLY ACCESS ONLY: Darwinbox Cortex (4 Aug 2026) - Signal Layer, Context Graph, Cortex Agent Platform, Experience Layer; delivered via Microsoft 365, Teams, Copilot, Slack, Glean; design partners Visteon and Transcarent. ANNOUNCED, AVAILABILITY UNSTATED: Super Agent (12 Sept 2025) - agentic AI teammate orchestrating multi-step workflows via natural language; Darwinbox MCP Server (vendor-claimed first in any HCM platform; 20+ HR functionalities exposed, 100+ tools stated as IN DEVELOPMENT). LONG-STANDING CONVENTIONAL ML: Darwinbox Sense (voice bot, OCR, facial recognition, predictive analytics). PARTNERSHIP: Microsoft Frontier Tuning (2 Sept 2026) - a partnership expansion, NOT an investment announcement. NOTE: the Employee Support Agent's 'Available now' GA label claimed in the prior draft could not be verified and has been retracted; no Darwinbox AI product carries a verifiable GA label.
- **strengths**: Only vendor with a publicly announced MCP server (Sept 2025) intended to let external agents reach HR data under existing access controls; Deepest big-tech alignment: Microsoft (Frontier Tuning, Copilot, Teams, and a pre-existing investor stake), Slack, Glean; Recognized as a Leader with the top rating for AI capabilities in the Gartner Magic Quadrant for Talent Acquisition (vendor boilerplate; no year stated); Genuine architectural story (Signal Layer / Context Graph) that an independent analyst treats as more than feature-count marketing; 1,400+ organizations and 4.5M employees provide real grounding data (vendor-stated)
- **weaknesses**: Flagship Cortex is early access with only TWO publicly named design partners (Visteon, Transcarent) and no published GA date - a wide open window; Only a CHALLENGER in the Gartner Magic Quadrant for HCM platforms - the MQ most relevant to this market. The prior draft reported only the favourable Talent Acquisition placement; Neither named design partner is India-based, suggesting the India install base is not the pilot cohort; Zero published pricing (verified 404) means buyers cannot compare AI value; Announcement cadence is press-release-driven with no public product changelog - not one Darwinbox AI product carries a verifiable availability label; Repositioning the whole brand to Cortex while Cortex is not GA creates a credibility gap on every product page; No published AI accuracy, evaluation or adoption data

### Keka
- **segment**: Mid-market India (50-2,000+ employees), plus US payroll and Middle East; self-serve, HR-team-first
- **positioning**: PeopleOS - unified people platform. AI positioned as 'AI woven across every workflow' and 'Keka AI doesn't just do work. It improves judgment', but sold as a forthcoming capability rather than a shipped one.
- **pricing**: Three per-employee-per-month rates appear on the pricing page: Rs 90, Rs 120, Rs 150. Rs 90 maps to the FOUNDATION tier; the other two mappings are not resolvable from the static page. No AI SKU, no AI add-on price, and no AI line item in any plan tier except two narrow recruiting features. Keka AI packaging: unknown.
- **ai_capabilities**: WAITLIST (not shipped): 'Keka AI' umbrella with three surfaces - Keka Embedded AI, Keka Copilot (inside Keka Web), Keka MCP Server (connect Keka to Claude/ChatGPT). Modules shown as covered: Hiring, HRIS, Onboarding, AI Helpdesk, Time & Attendance. EXPLICITLY COMING SOON: Payroll AI, Performance AI, Employee Engagement AI. LIKELY SHIPPED: AI Helpdesk (free-trial CTA rather than waitlist; claims 50+ pre-built requests, >85% classification accuracy against your own ticket history, SLA breach prediction, AI resolution rate dashboards). SHIPPED AND PLAN-BUNDLED: 'AI for Job Description' (Hiring tier), 'Candidate CV - JD match score', resume parsing.
- **strengths**: Best-articulated AI governance model in the market: no silent writes, no citation means no answer, RBAC parity with the web app, audit log per interaction, multi-entity awareness, no external model training - though all describe an unreleased product; Strongest India+US dual statutory footprint to ground payroll AI in once it ships; Large mid-market install base (12,500+ companies, 2.5M+ employees - Keka's own self-published figures, not independently verified); MCP server is on the roadmap, matching Darwinbox's architectural bet
- **weaknesses**: Its flagship AI is behind a WAITLIST as of Sept 2026 - the largest gap between market position and shipped AI in the entire set; Payroll, Performance and Engagement AI are explicitly labelled COMING SOON on Keka's own page; Keka's own canonical LLM-info page (April 2026) omits AI from Core Capabilities and files it under 'Future Focus'; No press release, launch date, or third-party coverage of Keka AI exists at all; AI is absent from the pricing page entirely except two recruiting features, so buyers cannot evaluate or budget for it; Mixed signals: AI Helpdesk offers a free trial while the Keka AI page it belongs to offers only a waitlist; Its headline scale figures are published on a page written to instruct AI assistants - the weakest sourcing class for a market number

### greytHR (Greytip Software)
- **segment**: SMB and lower-mid-market India, Middle East, SEA; payroll-and-compliance-led
- **positioning**: 'AI-First Full Suite HRMS'. Competes on AI being included rather than on AI being most advanced.
- **pricing**: Essential Rs 2,495/mo for 50 employees (+Rs 45/employee); Growth Rs 4,495/mo for 50 employees (+Rs 85/employee); Premium custom (~30% savings vs Growth). NAVOS explicitly 'included' on all three tiers. Homepage: 'No AI add-on fees.' Roughly ten other modules are paid add-ons: PMS Rs 35-45/user/mo, Time Sheets Rs 35, Expense Rs 35, GPS Live Tracking Rs 140, Recruit Rs 2,500/recruiter/mo, Alumni Portal Rs 20, plus GeoMark+, Visage, SSO/API and Multi-company without published prices. All figures verified directly.
- **ai_capabilities**: SHIPPED GA (3 June 2026): greytHR NAVOS - agentic AI assistant executing actions across Payroll, Core HR, Leave & Attendance, Performance Management and Recruitment; retrieves employee records, workflows, department reports and HR knowledge; 'Available across all paid greytHR plans... embedded within the platform and requires no additional setup or purchase'. ALSO PRESENT: an unnamed 'AI-Powered Chatbot' feature row ticked on all three plans, distinct from NAVOS. The prior draft identified this as 'Bella'; that name could not be verified (the cited source 404s) and the identification has been downgraded.
- **strengths**: Cleanest AI story to sell: GA, dated (3 Jun 2026), bundled on every paid plan, publicly priced, with 'No AI add-on fees' stated on the homepage - the only unambiguous GA claim in the set; Only vendor that turned AI packaging into an explicit pricing weapon; Very large SMB base (34,000+ organisations, 3.2-3.5M employees, ~USD 23B payroll/yr claimed) gives fast adoption reach; Deep India statutory compliance as the grounding substrate for NAVOS
- **weaknesses**: NAVOS is a single assistant, not an agent platform - no MCP server, no external-agent access, no developer surface; No public product changelog, so post-launch NAVOS progress is invisible; Own scale claims are internally inconsistent: homepage says 3.5M+ employees / 30+ countries, the June 2026 press release says 3.2M+ / 25+ countries; No published AI accuracy, evaluation or adoption evidence; Delivery is in-product only - no Teams, Slack or Copilot surface published, unlike Zoho and Darwinbox; AI arrived late (June 2026) relative to HROne (Apr 2025) and Darwinbox (Sept 2025); Its second AI product is documented only as a generic 'AI-Powered Chatbot' row with a dead help-centre link

### Zoho People (Zia)
- **segment**: SMB to mid-market, global with strong India presence; lowest price point in the set
- **positioning**: 'AI-first HR software.' Zia is the cross-suite Zoho AI brand applied to HR. Privacy-and-choice positioning (own LLM or bring your own model).
- **pricing**: Zia bundled into paid editions starting at the entry-level ESSENTIAL HR tier ('Zia AI bot' bullet); 'Zia - Smart HR bot assistant' appears as a feature-comparison row. Zoho People Plus tiers (Essential HR, Workforce, Talent) each list 'AI agent' as included. No separate AI price is published, and a direct search of the Zoho People pricing page for 'AI Credits' returns zero hits - so no credit metering is published for Zoho People, though this is absence of evidence rather than proof.
- **ai_capabilities**: SHIPPED May 2026: Zia AI HR Assistant - natural-language HR answers, workforce insights, policy and FAQ retrieval, routine actions (approvals, reminders, updates), configuration guidance, chat AND voice, across web, mobile, Microsoft Teams and Slack, with role-based access. SHIPPED July 2026: onboarding operations through Zia chat; shared-file access via natural language; AI question generation for LMS assessments. SHIPPED May 2025: Ask Zia in Zoho Advanced Analytics (a cross-suite BI feature, not HR-native). Model options: ZKS (Zoho's own LLM in Zoho data centres) or BYOK third-party models. Twelve named Zia capabilities on the product page, none carrying beta or coming-soon tags.
- **strengths**: The only vendor publishing a dated, per-month public changelog of shipped AI - the strongest evidence class in the entire set, and verifiable rather than press-release-driven; Only vendor offering customer choice of AI model backend (Zoho ZKS or bring-your-own-key); Zia ships where employees already are: Microsoft Teams and Slack, plus voice, from launch; Bundled into the entry-level paid tier, so AI reaches the paid base immediately; Zoho's cross-suite AI investment amortizes across products no HR-only vendor can match; Aggressive price point makes AI-included a hard combination to undercut
- **weaknesses**: Zoho People's HR-native AI assistant is only ~4 months old as of Sept 2026 (May 2026) - the prior draft's '~16 months' mis-measured from a cross-suite Analytics feature; No agent platform, no MCP server, no developer surface for external agents; Zia is a generic cross-suite brand, not HR-native - India statutory payroll reasoning is not a published Zia capability; Weaker in deep Indian payroll and compliance than greytHR, Keka or HROne, which limits what Zia can be grounded in; No published customer evidence or adoption data for Zia in HR; No published AI usage limits, so cost exposure at scale is undetermined

### PeopleStrong
- **segment**: Enterprise and large-enterprise India + Asia; heavy BFSI, retail, manufacturing, pharma, IT/ITeS
- **positioning**: 'AI-powered HCM suite built for modern, talent-focused enterprises.' Claims firsts: India's first HR chatbot (Jinie), India's first AI Co-Recruiter, 'First Gen AI Framework For HR'.
- **pricing**: unknown - verified by direct request: peoplestrong.com/pricing returns 404 and the sitemap contains no pricing URL. AI bundled-vs-add-on packaging is unknown.
- **ai_capabilities**: LONGEST HISTORY (weakly sourced): Jinie HR chatbot, claimed as India's first, launched around December 2016 - but the vendor blog carrying this claim is dated 31 July 2019 and attributes the date to a third-party citation. UNVEILED Aug 2024 at TechHR India: MAAX (Multi Agent Architecture driven Experience) with Analytics Agent, Onboarding Agent and ER Agent - no GA dates or availability commitments given, and NO 'Asia's first' claim in the cited source. NO AVAILABILITY LABEL ANYWHERE: AI Co-Recruiter (unveiled TechHR India 2025) and ER Agent (RAG-based, dense vector search plus LLM, inline source chips, Arabic/Thai/Hindi/English auto-detection, analytics and CSAT). GEN-AI FEATURES (undated, unlabelled): JD generation ('3X more applicants'), interview questions, new-hire mentoring, coaching, survey generation, learning materials, intelligent OKRs, individual development plans, 'Jarvis Like Insights', on-demand reporting. STATED: 'More agents coming soon!'
- **strengths**: Plausibly the earliest mover in the set, with a chatbot lineage predating the current agent wave by roughly eight years; Broadest published gen-AI surface area across the full employee lifecycle of any vendor in the set; Best multilingual coverage published (Arabic, Thai, Hindi, English) - matters for Middle East and SEA enterprise deals; ER Agent has the most specific published architecture of any non-Darwinbox agent: RAG with dense vector search, inline source chips, one-click view-full-policy; Named enterprise logos across the site support enterprise credibility, even though none is attributed to AI usage
- **weaknesses**: NOT ONE PeopleStrong AI product carries a general-availability label or ship date anywhere on its site - the prior draft's 'marked GA' claims for AI Co-Recruiter and ER Agent were unsupported and have been retracted; Its gen-AI page carries no dates, no GA/beta labels and no versioning - impossible for a buyer to tell what is live; No public pricing at all (verified 404), so AI packaging is opaque; MAAX was unveiled Aug 2024 with no availability commitments and still has no published GA milestone; All outcome metrics (80% auto-resolution, 70% fewer tickets, 5,000+ hours saved, 3X applicants) are vendor-claimed with no methodology or customer attribution; No MCP server, no external-agent access, no developer surface published; Payroll module carries no 'Powered by AI' label, unlike Recruit, Performance, Learning and Career & Skills; No public changelog; Its 'first' claims are self-asserted and at least one ('Asia's first agentic architecture') is not supported by the source previously cited for it

### HROne
- **segment**: SMB to mid-market India; brand count vendor-claimed and inconsistent (1,500+ to 2,500+ across its own properties)
- **positioning**: 'AI-supercharged HRMS.' Sharpest execution-vs-assistance message in the market: 'Still using AI that only assists? Meet One AI - it gets things done.' Voice-first for employees.
- **pricing**: Basic Rs 4,950/month for 50 users (+Rs 99/user); Professional Rs 6,500/month for 50 users (+Rs 130/user); Enterprise custom. AI is NOT itemized anywhere on the pricing page - neither as an included feature row nor as an add-on. Add-ons: Payroll Outsourcing, WhatsApp Bot, Teams Bot, Work Plan, Business Intelligence, Workforce Planning. All verified directly.
- **ai_capabilities**: VENDOR-ASSERTED LAUNCH April 2025: One AI Suite - Employee AI Agent (voice- and chat-driven: leave, reimbursements, helpdesk tickets, policy queries, attendance regularization), HR AI Agent and Recruiter AI Agent (in site navigation), and InboxForHR ('an AI assistant supporting 110+ HR actions across web, mobile and WhatsApp'). Additional AI: resume parser, expense receipt parser, tailored interview question generator, candidate profile auto-creation, auto JD creation, payroll anomaly detection. No beta or phased language anywhere - but equally no ship date on the product page and no pricing.
- **strengths**: Earliest claimed agentic-AI launch in the Indian market (April 2025) - roughly 14 months before greytHR NAVOS, if the vendor's date is accepted; Only vendor leading with VOICE as the primary employee interaction mode, plus regional-language support for field teams; WhatsApp as a first-class channel (110+ actions) fits Indian frontline and deskless workforces better than any competitor's published surface; Transparent, low, published pricing; Positioning is the sharpest in the market: execution over assistance
- **weaknesses**: AI does not appear anywhere in its own pricing page's feature matrix or add-on list - buyers cannot confirm what they get or budget for it; Its April 2025 launch date and 'India's first Employee AI Agent' claim rest entirely on HROne's own blog and a paid PR wire - the same source of truth, not independent corroboration; No MCP server, no external-agent access, no developer surface; No public changelog; the One AI page carries no dated feature ships; Runs an aggressive competitor-comparison blog operation whose published AI 'testing' is explicitly informal, discloses no methodology, and comes with a self-declared conflict of interest; Its own brand-count claims are inconsistent across its properties (1,500+ vs 2,000-2,500+); All outcome metrics are vendor-claimed with no methodology

### ZingHR
- **segment**: Enterprise India + MEA + Southeast Asia; frontline-heavy sectors (retail, FMCG, QSR, manufacturing)
- **positioning**: 'AI-powered Hire-to-ReHire platform' aiming to remove transactional HR. Board/CXO-level intelligence via a separately branded product.
- **pricing**: unknown - verified by direct request: zinghr.com/pricing returns HTTP 404 and the sitemap contains no pricing URL. GHROWTH.ai is consultation-gated with no published pricing.
- **ai_capabilities**: SHIPPED (undated, no availability labels): Zing Intelligence Hub - 'ZingIntel with 19 Power BI dashboards, ZingBot RAG-based AI assistant, Zingo conversational automation, a no-code Workflow Engine, and 100+ enterprise integrations.' MARKETED AGENTS (no dates, no availability labels, no pricing): AI Recruitment Agent, ZingZeroTAP Agent ('the industry's first zero-touch payroll engine'), Engagement Agent, Compliance 24/7, Performance Management Agent, Learning AI Agent, Employee Life Cycle AI Agent, Travel & Expense AI Agent. SEPARATELY BRANDED, DEMO-GATED: GHROWTH.ai - a board/CXO strategic command center sitting above HRMS, ERP, CRM and BI; Thinks / Binds / Acts; AI Strategic Alerts; OKR and KRA cascade. Its launch date is NOT established - press pages were unreadable and the site footer reads 2025.
- **strengths**: Only vendor aiming its flagship AI at the board and CXO rather than at HR or employees - a genuinely differentiated wedge; Publishes the most concrete description of its actual AI substrate (19 named Power BI dashboards plus a RAG assistant) rather than agent branding alone; Frontline-heavy sector focus with multi-country expense and 32-language microlearning claims fits MEA and SEA enterprise deals; Single codebase and single database claim, with 100+ enterprise integrations
- **weaknesses**: Eight marketed AI agents and not one carries a ship date, availability label or price - the widest gap between AI marketing and AI evidence in the set; No public pricing at all (verified 404 plus empty sitemap); Its actual substrate (Power BI dashboards plus RAG chatbot) is materially less advanced than the agent-platform language its homepage uses; GHROWTH.ai's launch date is unestablished and its own footer reads 2025, inconsistent with a 2026 launch narrative; GHROWTH.ai is demo-gated with only 'Book Consultation' as a route in - no self-serve evaluation possible; Its scale figures (2.8M+ users, 1,200+ enterprises, 30+ countries) are the same numbers repeated on two of its own sites, not two independent corroborations; No MCP server, no external-agent access, no developer surface, no changelog
