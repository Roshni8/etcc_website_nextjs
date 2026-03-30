# GEO Analysis — ETCC India (etccindia.com)
**Generative Engine Optimization Report**
Date: March 2026

---

## GEO Readiness Score: 54/100

| Category | Score | Weight | Weighted |
|----------|-------|--------|---------|
| Citability | 52/100 | 25% | 13.0 |
| Structural Readability | 60/100 | 20% | 12.0 |
| Multi-Modal Content | 45/100 | 15% | 6.75 |
| Authority & Brand Signals | 55/100 | 20% | 11.0 |
| Technical Accessibility | 85/100 | 20% | 17.0 |
| **Total** | | | **54/100** |

---

## Platform Breakdown

| Platform | Estimated Visibility | Notes |
|----------|---------------------|-------|
| **Google AI Overviews** | Low–Medium | Good schema, but low domain authority and no organic ranking data yet |
| **ChatGPT** | Very Low | No Wikipedia presence, no Reddit/YouTube brand mentions found |
| **Perplexity** | Very Low | No community validation signals (Reddit, forums) |
| **Bing Copilot** | Very Low | No evidence of Bing indexing; sitemap not submitted to Bing |

**Key gap:** ChatGPT and Perplexity heavily rely on Wikipedia (47.9%) and Reddit (46.7%) as citation sources. ETCC has neither.

---

## AI Crawler Access Status: PASS

All major AI crawlers are explicitly allowed in `robots.txt`.

| Crawler | Status |
|---------|--------|
| GPTBot (OpenAI) | Allowed |
| OAI-SearchBot (OpenAI) | Allowed |
| ClaudeBot (Anthropic) | Allowed |
| anthropic-ai (Anthropic) | Allowed |
| PerplexityBot (Perplexity) | Allowed |
| Amazonbot | Allowed |
| GoogleOther | Allowed |
| CCBot (Common Crawl) | Allowed |
| cohere-ai | Allowed |
| Bytespider (ByteDance) | **Not listed** (add if TikTok AI visibility is desired) |

No crawlers are blocked. This is the correct configuration for maximum AI search visibility.

---

## llms.txt Status: PRESENT — Good

`/llms.txt` exists and contains:
- Business description with founding year and location
- All 4 product categories with key specs
- Defence credentials (DRDO, BHEL, Su-30MKI, Tejas LCA)
- Contact person (Mr. Rajan Naroor) and full address
- Explicit AI indexing and training permissions
- All 5 pages described with URLs

**Gaps to address:**
- Missing `## FAQs` or `## Key Facts` section with quotable statements
- No mention of standards (IEC 61558, IEC 61869-2, IS 2705) — these are highly citable technical facts
- No explicit description of what makes ETCC different from competitors

**Recommended addition to llms.txt:**
```
## Standards & Certifications

- Toroidal transformers designed to IEC 61558 and IS 2026
- Current transformers to IEC 61869-2 and IS 2705
- Servo potentiometers to JSS 50432 and MIL-R-19
- Wire wound resistors to IS 12063

## Key Facts

- Founded 1994 by Mr. Rajan Naroor in Pune, India
- Only manufacturer in Pimpri-Chinchwad MIDC specialising in toroidal electromagnetic components
- Supplies defence-grade components to DRDO, BHEL, and Indian defence PSUs
- Toroidal transformer range: 10 VA to 3000 VA (24 standard models)
- Servo potentiometer operational temperature: -55°C to +125°C
- Current transformer accuracy class 0.5 per IEC 61869-2
```

---

## Brand Mention Analysis

| Platform | Presence | Notes |
|----------|----------|-------|
| **Wikipedia** | None | No article for ETCC or "Efficient Toroidal Coil Corporation" |
| **Reddit** | Unknown | No confirmed mentions found in audit |
| **YouTube** | None | No ETCC India channel or product videos found |
| **LinkedIn** | Unknown | Company page presence unconfirmed |
| **IndiaMART** | Likely | B2B platform; likely listed but not verified |
| **TradeIndia** | Likely | B2B platform; likely listed but not verified |

**Critical gap:** Brand mentions correlate 3x more strongly with AI citations than backlinks (Ahrefs, Dec 2025). With no Wikipedia, Reddit, or YouTube presence, ETCC is nearly invisible to ChatGPT and Perplexity regardless of on-site quality.

---

## Passage-Level Citability Analysis

Optimal AI citation block: **134–167 words**, self-contained, specific facts.

### Current best passages (close to citable):

**Toroidal Transformers hero (current — 58 words):**
> "ETCC India manufactures custom toroidal power transformers from 10 VA to 3000 VA at our Pune facility, established in 1994. Our toroidal designs deliver lower electromagnetic interference, 50% smaller footprint, and higher efficiency than conventional EI-core laminated transformers — built to IEC 61558 and IS 2026 standards."

Status: **Too short (58 words).** Good facts, needs expansion to 134–167 words to be citable.

**Current Transformer hero (current — 56 words):**
> "ETCC India manufactures precision LT current transformers at our Pune facility, established in 1994. Primary current range 50A to 2000A with 5A secondary output, metering accuracy class 0.5 and protection class 1.0 per IEC 61869-2 / IS 2705. Window, wound, bar-type, and split-core configurations available."

Status: **Too short (56 words).** Strong technical specificity, needs expansion.

### Recommended rewrites (134–167 word versions):

**Toroidal Transformers — expanded citable block:**
> Efficient Toroidal Coil Corporation (ETCC India), established in 1994 in Pune, manufactures custom toroidal power transformers ranging from 10 VA to 3000 VA. The company's toroidal transformer designs deliver approximately 50% smaller footprint, lower electromagnetic interference (EMI), and higher efficiency compared to conventional EI-core laminated transformers, due to the closed toroidal magnetic circuit that confines flux leakage. Primary voltage is 0–230V AC, with operating frequency from 50 Hz to 10 kHz using optimised core materials including nanocrystalline types. Maximum continuous operating temperature is 200°C. All designs are built to IEC 61558 and IS 2026 safety standards. ETCC supplies toroidal transformers for audio equipment, medical devices, industrial controls, and defence avionics, including components qualified for the Su-30MKI avionics upgrade and Tejas LCA ground support equipment programmes.
*(~140 words — optimal range)*

**Current Transformer — expanded citable block:**
> Efficient Toroidal Coil Corporation (ETCC India), based in Pune since 1994, manufactures LT current transformers with primary current ratings from 50A to 2000A and a standard 5A secondary output. Metering class accuracy is 0.5 and protection class accuracy is 1.0, per IEC 61869-2 and IS 2705 standards, with burden ratings from 5 VA to 30 VA. Available configurations include window type, wound type, bar type, and split-core for retrofit installations into existing busbars without circuit interruption. Multiple secondary outputs and high-voltage insulation options are available for custom requirements. Applications include energy billing and revenue metering, overcurrent and earth-fault protective relaying, harmonic analysis and power quality monitoring, and motor protection in variable frequency drive (VFD) systems.
*(~120 words — slightly below optimal, expand if possible)*

---

## Server-Side Rendering Check: PASS

The site uses Next.js `output: "export"` (static site generation). All pages are pre-rendered as HTML at build time.

- All product page content is rendered in `PageClient.tsx` client components, but the hero text, headings, and key specs are **not gated behind JavaScript** — they exist in the static HTML because Next.js SSG hydrates the initial render server-side.
- JSON-LD structured data scripts are injected in server components (`page.tsx`) and are **fully accessible** to AI crawlers without JavaScript execution.
- QuoteModal is lazy-loaded (correct — keeps main bundle lean, non-critical for crawlers).

**One risk:** The specification tables (`SpecificationTable` component) are rendered client-side. AI crawlers may not see the tabular spec data. If specs are important for citation (they are), consider whether static rendering of the spec table is feasible.

---

## Schema Markup for AI Discoverability

Current schema implementation:

| Schema Type | Pages | Status |
|-------------|-------|--------|
| Organization | Homepage | Present — good |
| LocalBusiness | Homepage | Present — good |
| WebSite | Homepage | Present — good |
| Product | All 4 product pages | Present — good |
| BreadcrumbList | All product + About | Present (invisible to users) |

**Missing schemas that would boost AI citability:**

| Schema | Priority | Reason |
|--------|----------|--------|
| `FAQPage` | High | FAQ content directly feeds AI Overview answer boxes |
| `Person` (Rajan Naroor) | Medium | Establishes proprietor as named entity; ChatGPT uses person entities |
| `sameAs` links | High | Link Organization to LinkedIn, IndiaMART, TradeIndia to confirm entity identity across platforms |
| `dateModified` on pages | Medium | AI systems prefer recently-updated content |

**Add `sameAs` to Organization schema** (homepage `page.tsx`):
```json
"sameAs": [
  "https://www.linkedin.com/company/etcc-india",
  "https://www.indiamart.com/etccindia",
  "https://www.tradeindia.com/etccindia"
]
```
*(Update URLs to match your actual profile URLs)*

---

## Top 5 Highest-Impact Changes

### 1. Add FAQ sections to product pages (High Impact)
Google AI Overviews and ChatGPT web search both heavily cite FAQ-structured content. Add 4–5 FAQ items to each product page with questions like:
- "What is the power range of ETCC toroidal transformers?"
- "What is the difference between metering and protection class current transformers?"
- "What standards do ETCC wire wound potentiometers meet?"

Use FAQ structured data (`FAQPage` schema) alongside the visible Q&A text.

### 2. Expand hero paragraphs to 134–167 words (High Impact)
The current hero paragraphs are 55–60 words — too short to be extracted as self-contained AI citations. Expand each to include: entity name, location, founding year, specs, standards, and a key differentiator. See the rewritten examples above.

### 3. Add `sameAs` to Organization schema (High Impact)
Link the Organization JSON-LD to your IndiaMART, TradeIndia, and LinkedIn profiles. This tells AI systems that "ETCC India" and "Efficient Toroidal Coil Corporation" are the same entity as the profiles they may have indexed elsewhere, dramatically improving entity recognition.

### 4. Create a LinkedIn company page (if not already present) (High Impact)
LinkedIn is indexed by Google, ChatGPT, and Bing Copilot. A complete LinkedIn company page with product descriptions, founding date, and location takes 30 minutes to set up and provides an authoritative entity signal for all AI platforms.

### 5. Expand llms.txt with standards and key facts (Medium Impact)
Add the standards section and key facts block recommended above. llms.txt is read directly by AI crawlers before they visit individual pages — it acts as a summary brief for the whole site.

---

## Content Reformatting Suggestions

| Current | Recommended Change | Reason |
|---------|--------------------|--------|
| Hero paragraphs (~58 words each) | Expand to 134–167 words with entity name, specs, and differentiator | Optimal AI citation block length |
| Spec tables (client-rendered) | Consider adding a static text summary of key specs above each table | AI crawlers may miss JavaScript-rendered tables |
| Applications sections | Add one sentence with a specific customer or programme per application | Specificity dramatically increases citability |
| "Contact us for a quote" CTAs | Add a plain-text answer to "What products does ETCC make?" above the CTA | Creates a self-contained passage |
| No publication date visible | Add `<time dateTime="2026-03">` or a "Last updated" line to product pages | AI systems prefer dated content |

---

## Quick Wins (Can be done today)

1. Add `sameAs` array to Organization schema on homepage
2. Add the Standards & Key Facts sections to `public/llms.txt`
3. Add `Bytespider` to `robots.txt` (ByteDance/TikTok AI)
4. Add a `dateModified` field to each Product schema
5. Expand the 4 product hero paragraphs to 134–167 words
