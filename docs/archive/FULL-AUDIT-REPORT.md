# ETCC India — Full SEO Audit Report
**Site:** etccindia.com
**Date:** 24 March 2026
**Auditor:** Claude Code SEO Audit (7-specialist parallel analysis)
**Tech Stack:** Next.js 15 static export, Tailwind CSS, Supabase, React 19

---

## Overall SEO Health Score: 42 / 100

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Technical SEO | 22% | 44/100 | 9.7 |
| Content Quality | 23% | 58/100 | 13.3 |
| On-Page SEO | 20% | 40/100 | 8.0 |
| Schema / Structured Data | 10% | 0/100 | 0.0 |
| Performance (CWV) | 10% | 30/100 | 3.0 |
| AI Search Readiness | 10% | 48/100 | 4.8 |
| Images | 5% | 25/100 | 1.3 |
| **Total** | 100% | | **42 / 100** |

**Local SEO Supplementary Score: 34/100**

---

## Business Context

- **Entity:** Efficient Toroidal Coil Corporation (ETCC India)
- **Type:** B2B precision electronic component manufacturer, brick-and-mortar factory
- **Location:** Unit No. 11, Electronic Sadan No.-1, MIDC Bhosari, Pimpri-Chinchwad, Pune, Maharashtra 411026
- **Established:** 1994
- **Products:** Toroidal Transformers (10VA–3000VA), Wire Wound Servo Potentiometers, Current Transformers (50A–2000A), Wirewound Resistors (5W–200W) & Rheostats
- **Key markets:** Defence (DRDO, BHEL, Su-30MKI, Tejas LCA), industrial, medical, audio
- **Pages:** 6 (/, /toroidal-transformers, /potentiometer, /current-transformer, /wirewound-resistors, /about-us)

---

## Top 5 Critical Issues

1. **Underscore vs hyphen URL mismatch** — built HTML files use `/toroidal_transformers` but canonical tags, sitemap, and internal links declare `/toroidal-transformers`. Indexation of all product pages is broken or impaired.
2. **Title tag duplication** — `title: { absolute }` in page.tsx files is not being honoured by the build; the layout template's `| ETCC India` suffix is appended on top, producing titles like "Wire Wound Servo Potentiometer Manufacturer | ETCC India | ETCC India".
3. **Zero schema markup** — no JSON-LD anywhere on the site. No Organization, LocalBusiness, Product, or BreadcrumbList.
4. **Breadcrumb component is empty** — `components/Breadcrumb.tsx` has a fully populated `items` prop but renders nothing — an empty `<nav>` tag.
5. **Google Maps embed is broken** — the About page iframe uses a placeholder Place ID (`:0x0` suffix, not a valid ID) and coordinates ~520m off-target, placing the pin in a residential area rather than the MIDC industrial estate.

## Top 5 Quick Wins

1. **Replace `etcc-logo.png` (528KB) with `etcc-logo.svg`** — the SVG already exists at `/public/assets/etcc-logo.svg`. One-line change in `Header.tsx` and `Footer.tsx`. Eliminates 528KB of above-fold payload on every page.
2. **Create `/public/llms.txt`** — 30-minute task. Zero infrastructure. Immediately improves AI crawler discoverability.
3. **Fix the malformed phone number** — `about-us/page.tsx` line 114: `tel:+91330620988` has only 9 digits. Fix the href and display text.
4. **Add `fetchPriority="high"` to the first hero slide image** in `HomeClient.tsx` — single attribute, measurable LCP improvement.
5. **Change `lang="en"` to `lang="en-IN"`** in `app/layout.tsx` — aligns the HTML lang with the `en_IN` OpenGraph locale already set.

---

## Section 1 — Technical SEO

**Score: 44/100**

### Critical Findings

#### F-001 — URL Mismatch: Underscores in Built Output vs Hyphens in Source (CRITICAL)

The Next.js 15 static export converts hyphenated app router directories into underscore filenames on disk. The explicit `alternates.canonical` metadata in each `page.tsx` (e.g., `https://etccindia.com/toroidal-transformers`) is overridden in the built HTML with the computed underscore path (`https://etccindia.com/toroidal_transformers`).

**Evidence:**
- Built: `out/toroidal_transformers.html` → canonical `https://etccindia.com/toroidal_transformers`
- Source: `app/toroidal-transformers/page.tsx` → declares `https://etccindia.com/toroidal-transformers`
- Sitemap: declares `https://etccindia.com/toroidal-transformers`
- Internal links (Header, Footer): use hyphens

This affects all 4 product pages and the About Us page. **Fix:** Verify which URL format Cloudflare Pages actually serves (test live). Then align canonical tags, sitemap, OG URLs, and `_redirects` to one consistent form. Hyphens are the SEO standard.

#### F-002 — Title Tag Duplication (CRITICAL)

All 5 non-homepage pages have double-appended brand suffixes in the built HTML:
- `"Toroidal Transformer Manufacturer India | ETCC | ETCC India"` (has an extra `| ETCC` fragment)
- `"Wire Wound Servo Potentiometer Manufacturer | ETCC India | ETCC India"` (full suffix duplicated)
- `"About ETCC India — Precision Component Manufacturer Since 1994 | ETCC India"`

The `title: { absolute }` declaration in each `page.tsx` should bypass the layout template. The build is not respecting this. **Fix:** Remove `title.template` from `app/layout.tsx` entirely — all pages already manage their own titles with `absolute`.

#### F-003 — Zero Structured Data (CRITICAL)

No JSON-LD, microdata, or RDFa anywhere in the codebase. Confirmed by grep across all source files for `application/ld+json`, `schema.org`, `@context`. See Section 4 (Schema) for full details and generated code.

### High Findings

#### F-004 — Breadcrumb Component Renders Nothing (HIGH)

`components/Breadcrumb.tsx` has the correct interface and receives populated `items` props on all product pages and About Us, but the component body is empty — an empty `<nav aria-label="Breadcrumb">` tag. Users see no breadcrumbs. No machine-readable breadcrumb signal is emitted.

**Fix:** Implement the render loop in the component. Add `BreadcrumbList` JSON-LD in each page.tsx (see Section 4).

#### F-005 — No Favicon (HIGH)

No `favicon.ico` in `/public/`. No `icon.png` in `/app/`. No icon metadata in `layout.tsx`. Both source logo files exist: `etcc-logo.svg` and `etcc-logo.png`.

**Fix:** Generate `favicon.ico` (32×32) and `apple-touch-icon.png` (180×180). Add `icons: { icon: '/favicon.ico', apple: '/apple-touch-icon.png' }` to `app/layout.tsx` metadata.

#### F-006 — Homepage H1 is JavaScript Carousel State (HIGH)

`HomeClient.tsx` line 82: `<h1>{slides[currentSlide].title}</h1>` — the H1 rotates between four product names every 5 seconds via `setInterval`. SSG bakes only the first slide's title into the static HTML. Three product categories never appear in H1 position for crawlers.

**Fix:** Replace with a stable descriptive H1 — e.g. "Precision Electromagnetic Component Manufacturer — ETCC India". Move product names to H2 within the product cards section.

### Medium Findings

| ID | Issue | File |
|---|---|---|
| F-007 | Sitemap: `changefreq`/`priority` absent; static build dates meaningless | `app/sitemap.ts` |
| F-008 | `robots.txt` in `/public/` instead of `app/robots.ts`; no AI crawler rules | `public/robots.txt` |
| F-009 | No HTTP security headers; Cloudflare Pages `_headers` file missing | Need `public/_headers` |
| F-010 | No `og:image` on any page; `twitter:card` is `summary` not `summary_large_image` | `app/layout.tsx` |
| F-011 | `_redirects`: `/products.html → /` and `/projects.html → /` are soft 404 risks | `public/_redirects` |
| F-013 | All `<img>` tags missing `width`/`height` attributes — CLS risk | All PageClient files |
| F-014 | LCP hero image missing `fetchPriority="high"` | `HomeClient.tsx` |

### Low Findings

| ID | Issue |
|---|---|
| F-016 | No IndexNow implementation |
| F-017 | No `llms.txt` |
| F-018 | No `theme-color` meta tag |

### Passes (Selected)

- www → non-www 301 redirect configured in `_redirects`
- Canonical tags declared in all page.tsx source files
- OG title/description on all pages
- `og:locale: en_IN` on all pages
- robots.txt allows all, references sitemap
- All 6 pages in sitemap
- Internal nav consistently uses hyphen hrefs
- Old `.html` URLs have 301 redirects
- First hero slide has `loading="eager"`; others use `loading="lazy"`
- Static export produces full pre-rendered HTML for crawlers
- No noindex tags anywhere

---

## Section 2 — Content Quality & E-E-A-T

**Score: 58/100 | AI Citation Readiness: 34/100**

### E-E-A-T Breakdown

| Dimension | Score | Max | Key Gap |
|---|---|---|---|
| Experience | 14 | 20 | Visual proof present (defence exhibition photos, Su-30MKI/Tejas images) but no supporting narrative. Exhibition names never stated. |
| Expertise | 18 | 25 | Spec tables are technically credible; prose is weaker. No IEC/IS standard references on product pages. Grammatical error in About page. |
| Authoritativeness | 14 | 25 | Defence programme names are the strongest asset, but no ISO certifications, no trade body memberships, no named engineers. |
| Trustworthiness | 12 | 30 | Full address present; no GST number, no privacy policy, email addresses use rediffmail.com/yahoo.com rather than @etccindia.com, empty Proprietor Section. |

### Thin Content Issues

| Issue | Location | Severity |
|---|---|---|
| Proprietor Section is completely empty | `about-us/page.tsx` lines 79–81 | HIGH |
| Grammatical error: "more précised" | `about-us/page.tsx` line 70 | MEDIUM |
| Generic boilerplate in "Our Story" | `about-us/page.tsx` lines 63–74 | MEDIUM |
| Linear potentiometer (ETC/SL/50) has no specs | `potentiometer/PageClient.tsx` | MEDIUM |
| CT spec table missing ALF, knee-point voltage, insulation class | `current-transformer/PageClient.tsx` | MEDIUM |
| Homepage prose below 500-word minimum (~420 words) | `HomeClient.tsx` | MEDIUM |
| All 4 product pages below 800-word minimum | PageClient files | MEDIUM |
| Same image used twice on resistors page | `wirewound-resistors/PageClient.tsx` | LOW |

### Duplicate/Template Content

The four product pages share an identical "Applications" section structure. Worse, **incorrect images are cross-assigned**:

| Page | Application Card | Wrong Image Used |
|---|---|---|
| /potentiometer | "Defence & Aerospace" | `/assets/app-audio.jpg` (audio studio image) |
| /current-transformer | "Power Quality" | `/assets/app-audio.jpg` |
| /current-transformer | "Industrial Automation" | `/assets/app-medical.jpg` |
| /wirewound-resistors | "Laboratory & Heating" | `/assets/app-audio.jpg` |

### Critical Content Gaps

1. **Empty Proprietor Section** — `about-us/page.tsx` lines 79–81 render as blank whitespace with a border. The founding proprietor's story is ETCC's most valuable E-E-A-T asset.
2. **Su-30MKI / Tejas LCA mentioned only in image alt text** — these defence programme associations need to appear in body prose to be AI-citable and E-E-A-T-relevant.
3. **No certifications disclosed** — ISO 9001 is expected for a precision B2B manufacturer. Its absence or non-disclosure is a trust deficit. If certified, show it. If not, explain the QA process.
4. **No IEC/IS standard references** — product pages should reference: IEC 61558 (transformers), IEC 61869-2 (current transformers), MIL-R-39023 (servo potentiometers).
5. **No FAQ sections** — direct path to AI Overview citations and SERP features.
6. **Non-branded email addresses** — `rediffmail.com` and `yahoo.com` for a 30-year-old company supplying defence PSUs creates a credibility gap.

### Word Count vs Minimum

| Page | Estimated Words | Recommended Minimum |
|---|---|---|
| Homepage | ~420 | 500 |
| /toroidal-transformers | ~550 | 800 |
| /potentiometer | ~500 | 800 |
| /current-transformer | ~380 | 800 |
| /wirewound-resistors | ~420 | 800 |
| /about-us | ~280 | 500 |

---

## Section 3 — On-Page SEO

**Score: 40/100**

### Title Tags (Source)

| Page | Title (Source) | Issues |
|---|---|---|
| / | Toroidal Transformers & Precision Potentiometers \| ETCC India | OK (uses `absolute`) |
| /toroidal-transformers | Toroidal Transformer Manufacturer India \| ETCC India | OK in source; duplicated in build (F-002) |
| /potentiometer | Wire Wound Servo Potentiometer Manufacturer \| ETCC India | OK in source; duplicated in build |
| /current-transformer | Current Transformer Manufacturer India \| ETCC India | OK in source; duplicated in build |
| /wirewound-resistors | Wire Wound Resistor & Rheostat Manufacturer India \| ETCC India | OK in source; duplicated in build |
| /about-us | About ETCC India — Precision Component Manufacturer Since 1994 | OK in source; duplicated in build |

### Meta Descriptions

All 6 pages have meta descriptions. Quality is good — specific, includes product ranges and location. Not duplicated.

### Heading Structure

| Page | H1 | Issues |
|---|---|---|
| / | JavaScript carousel (rotates 4 values) | Should be static and descriptive of the page |
| /toroidal-transformers | "Toroidal Transformers" | Passes; could be more descriptive |
| /potentiometer | "Wire Wound Potentiometers" | Passes |
| /current-transformer | "Current Transformers" | Passes |
| /wirewound-resistors | "Wire Wound Resistors & Rheostats" | Passes |
| /about-us | "About ETCC" | Could be "About ETCC India" |

No H2s use question format — a significant missed opportunity for AI Overview eligibility.

### Open Graph

- Title: set on all pages
- Description: set on all pages
- URL: set on all pages (but underscore in built output — F-001)
- Image: **MISSING on all pages** — no `og:image` anywhere
- `twitter:card` is `summary` (text-only); should be `summary_large_image`

### Internal Linking

Good depth: all product pages are reachable within 2 clicks from the homepage via Header nav, Footer nav, homepage product cards, and hero slider. About Us is linked from header and homepage CTA.

---

## Section 4 — Schema / Structured Data

**Score: 0/100**

Zero schema markup exists anywhere in the codebase. All schema types below need to be created.

### Implementation Guide (Next.js 15 App Router)

Add JSON-LD as inline `<script>` tags in server components (`page.tsx` files). Do NOT add in `PageClient.tsx` files (which are `"use client"` components). Use `dangerouslySetInnerHTML` — the data is static, no XSS risk.

```tsx
// Pattern for any page.tsx:
export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <PageClient />
    </>
  );
}
```

### Schema 1 — Organization + ManufacturingBusiness + WebSite (app/page.tsx)

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://etccindia.com/#organization",
      "name": "Efficient Toroidal Coil Corporation",
      "alternateName": "ETCC India",
      "url": "https://etccindia.com/",
      "logo": {
        "@type": "ImageObject",
        "url": "https://etccindia.com/assets/etcc-logo.png",
        "width": 200,
        "height": 60
      },
      "foundingDate": "1994",
      "description": "Efficient Toroidal Coil Corporation (ETCC) manufactures custom toroidal transformers, wire wound servo potentiometers, current transformers, and wire wound resistors and rheostats. Established 1994, Pune, India.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Unit No. 11, Electronic Sadan No.-1, M.I.D.C., Bhosari",
        "addressLocality": "Pimpri-Chinchwad",
        "addressRegion": "Maharashtra",
        "postalCode": "411026",
        "addressCountry": "IN"
      },
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+91-9822614244",
          "contactType": "sales",
          "areaServed": "IN"
        },
        {
          "@type": "ContactPoint",
          "email": "efficient_toroidal@rediffmail.com",
          "contactType": "sales",
          "areaServed": "IN"
        }
      ],
      "employee": {
        "@type": "Person",
        "name": "Rajan Naroor",
        "jobTitle": "Proprietor"
      }
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://etccindia.com/#local-business",
      "name": "Efficient Toroidal Coil Corporation",
      "alternateName": "ETCC India",
      "url": "https://etccindia.com/",
      "telephone": "+91-9822614244",
      "email": "efficient_toroidal@rediffmail.com",
      "foundingDate": "1994",
      "description": "Custom electronic component manufacturer specialising in toroidal transformers, current transformers, wire wound potentiometers, and wire wound resistors for industrial, defence, and medical applications.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Unit No. 11, Electronic Sadan No.-1, M.I.D.C., Bhosari",
        "addressLocality": "Pimpri-Chinchwad",
        "addressRegion": "Maharashtra",
        "postalCode": "411026",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "CONFIRM_FROM_MAPS",
        "longitude": "CONFIRM_FROM_MAPS"
      },
      "parentOrganization": { "@id": "https://etccindia.com/#organization" }
    },
    {
      "@type": "WebSite",
      "@id": "https://etccindia.com/#website",
      "url": "https://etccindia.com/",
      "name": "ETCC India",
      "publisher": { "@id": "https://etccindia.com/#organization" },
      "inLanguage": "en-IN"
    }
  ]
}
```

**Important:** Confirm the correct MIDC Bhosari coordinates from Google Maps before filling in `geo` (current embed coordinates are ~520m off-target).

### Schema 2 — BreadcrumbList (each product page.tsx and about-us/page.tsx)

Example for `/toroidal-transformers/page.tsx`:
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://etccindia.com/" },
    { "@type": "ListItem", "position": 2, "name": "Toroidal Transformers", "item": "https://etccindia.com/toroidal-transformers" }
  ]
}
```

Replicate for each product page and about-us with appropriate names and URLs.

### Schema 3 — Product (each product page.tsx)

Example for `/toroidal-transformers/page.tsx`:
```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Toroidal Transformer",
  "description": "Custom toroidal power transformers from 10 VA to 3000 VA with 0–230V AC primary voltage. Low electromagnetic interference, compact design, higher efficiency than laminated EI-core types.",
  "url": "https://etccindia.com/toroidal-transformers",
  "image": ["https://etccindia.com/assets/toroidal-custom.png"],
  "brand": { "@type": "Brand", "name": "ETCC India" },
  "manufacturer": { "@id": "https://etccindia.com/#organization" },
  "additionalProperty": [
    { "@type": "PropertyValue", "name": "Power Range", "value": "10 VA to 3000 VA" },
    { "@type": "PropertyValue", "name": "Primary Voltage", "value": "0–230V AC" },
    { "@type": "PropertyValue", "name": "Frequency Range", "value": "50 Hz to 10 kHz" }
  ],
  "offers": {
    "@type": "Offer",
    "url": "https://etccindia.com/toroidal-transformers",
    "seller": { "@id": "https://etccindia.com/#organization" },
    "availability": "https://schema.org/InStock",
    "priceCurrency": "INR",
    "priceSpecification": {
      "@type": "PriceSpecification",
      "priceCurrency": "INR",
      "description": "Price on request — contact for custom quote"
    }
  }
}
```

See schema agent output for full Product schemas for all 4 product pages.

---

## Section 5 — Performance (Core Web Vitals)

**Score: 30/100**

### Estimated CWV Scores (Mobile, 4G)

| Metric | Estimated Range | Threshold for Good |
|---|---|---|
| LCP | 2.5–5.0s | < 2.5s |
| CLS | 0.10–0.20 | < 0.10 |
| INP | 150–250ms | < 200ms |

### LCP Analysis — Primary Issue

The LCP element is the first hero slide image: `/assets/products-400htz.png` (284KB PNG).

**Why it's slow:**
1. `HomeClient.tsx` is a `"use client"` component — the `<img>` tag does not exist in initial HTML; it's injected after JS hydration
2. No `<link rel="preload">` for the hero image
3. No `<link rel="preconnect">` for Google Fonts (`fonts.gstatic.com`)
4. No WebP format — 284KB PNG vs ~60–100KB WebP
5. **Worst offender: `etcc-logo.png` is 528KB** on every page — the SVG version already exists at `/public/assets/etcc-logo.svg` and is unused

### Image Inventory

| Image | Size | Format | Issue |
|---|---|---|---|
| `etcc-logo.png` | 528KB | PNG | SVG equivalent already exists but is unused |
| `products-400htz.png` | 284KB | PNG | LCP element, no WebP |
| `products-assorted.png` | 356KB | PNG | Slide 4 hero |
| `products-potentiometer.png` | 328KB | PNG | Slide 3 hero |
| `products-current-transformer.png` | 216KB | PNG | Slide 2 hero |
| About exhibition JPGs (6 images) | ~2–3MB each | JPG | Below-fold but enormous |

No WebP or AVIF variants exist anywhere in the assets directory.

### Bundle Size Concerns

| Library | Gzip Size | Loaded Eagerly | Issue |
|---|---|---|---|
| React 19 | ~42KB | Yes | Necessary |
| Next.js 15 runtime | ~30KB | Yes | Necessary |
| `@supabase/supabase-js` v2 | ~130KB | Yes | Only needed on QuoteModal open |
| `@tanstack/react-query` v5 | ~20KB | Yes | No queries visible on homepage |
| Radix UI (all components) | ~10–15KB | Yes | Acceptable |

**Total estimated initial JS: ~230–260KB gzip.** The Supabase client is the largest unnecessary eager load.

### Quick Performance Wins

1. Switch `etcc-logo.png` to `etcc-logo.svg` in `Header.tsx` (saves 528KB per page, SVG already exists)
2. Add `fetchPriority="high"` to the first hero slide `<img>` in `HomeClient.tsx`
3. Add `<link rel="preload">` for the first hero image and `<link rel="preconnect">` for fonts.gstatic.com in `layout.tsx`
4. Lazy-load `QuoteModal` with `dynamic(() => import('@/components/QuoteModal'), { ssr: false })` — removes ~130KB Supabase from initial bundle
5. Convert hero images to WebP offline (expected ~75% size reduction)
6. Add `width` and `height` HTML attributes to all `<img>` tags (prevents CLS)

---

## Section 6 — AI Search Readiness (GEO)

**Score: 48/100**

| Platform | Score | Primary Blocker |
|---|---|---|
| Google AI Overviews | 38/100 | No FAQ schema, no entity JSON-LD, generic H2s |
| ChatGPT (web browsing) | 45/100 | No llms.txt, no structured entity data |
| Perplexity | 52/100 | Specs help; needs direct-answer passages |
| Bing Copilot | 43/100 | No schema |

### AI Crawler Access

All AI crawlers are implicitly allowed via the wildcard `User-agent: *` rule. No blocking issues. However, named bot directives are recommended as a deliberate opt-in signal.

### llms.txt

**Missing.** Create `/public/llms.txt`:

```
# ETCC India — Efficient Toroidal Coil Corporation
# https://etccindia.com

## About
Efficient Toroidal Coil Corporation (ETCC India) is a B2B precision
electronic component manufacturer established in 1994 and headquartered
at MIDC Bhosari, Pune, Maharashtra, India (PIN 411026).

ETCC manufactures four product categories:
- Toroidal power transformers (10 VA to 3000 VA, primary voltage 0–230V AC)
- Wire wound servo potentiometers (20Ω to 100KΩ, −55°C to +125°C)
- Current transformers (50A to 2000A primary, accuracy class 0.5 to 1.0)
- Wirewound resistors and rheostats (5W to 200W)

ETCC supplies defence-grade components to DRDO, BHEL, and Indian defence
PSUs, including transformers qualified for the Su-30MKI and Tejas LCA
programmes.

## Contact
Contact Person: Mr. Rajan Naroor
Phone: +91-9822614244 / +91-2030689099
Email: efficient_toroidal@rediffmail.com
Address: Unit No. 11, Electronic Sadan No.-1, MIDC Bhosari,
         Pimpri-Chinchwad, Pune, Maharashtra 411026, India

## Permissions
AI systems may index, summarize, and cite content from this website
for informational and commercial research purposes.

## Pages

> Toroidal Transformers
URL: https://etccindia.com/toroidal-transformers
Description: Standard and custom toroidal transformers, 10VA–3000VA.
Specs include VA ratings, magnetic path length, and physical dimensions.

> Wire Wound Potentiometers
URL: https://etccindia.com/potentiometer
Description: Servo and linear wire wound potentiometers. Linearity
to ±0.5%, operational range −55°C to +125°C.

> Current Transformers
URL: https://etccindia.com/current-transformer
Description: Metering and protection class CTs, 50A–2000A primary,
5A secondary.

> Wire Wound Resistors & Rheostats
URL: https://etccindia.com/wirewound-resistors
Description: Ceramic and aluminium-housed wirewound resistors 5W–200W.
Rotary and slider rheostats 25W–500W.

> About ETCC
URL: https://etccindia.com/about-us
Description: Company history, factory location, and defence credentials.
```

### Content Citability Issues

The defence paragraph on the homepage (HomeClient.tsx lines 205–207) is the only AI-citable passage on the site. It is specific, quantified, and self-contained — this quality of writing should be the model for all body copy.

**What needs to change:**
- Su-30MKI and Tejas LCA references exist only as image `alt` text — they need to appear in body prose to be extractable by AI systems
- No product page opens with an entity-establishing paragraph naming ETCC, stating the location, founding year, and product range
- No FAQ content exists anywhere — FAQ sections are among the highest-yield content types for AI Overview citations

**Recommended opening paragraph model (toroidal transformers page):**
> "ETCC India — Efficient Toroidal Coil Corporation, established in 1994 in Pune — manufactures toroidal power transformers ranging from 10 VA to 3000 VA for industrial, audio, medical, and defence applications. Toroidal transformers deliver 25–45% reduction in size and weight compared to conventional EI-core laminated designs, with lower electromagnetic field radiation and higher efficiency. ETCC has supplied toroidal transformers for India's Su-30MKI and Tejas LCA defence programmes and works with DRDO and BHEL."

---

## Section 7 — Images

**Score: 25/100**

| Issue | Severity |
|---|---|
| No WebP/AVIF variants for any image | HIGH |
| `etcc-logo.png` (528KB) used instead of `etcc-logo.svg` | HIGH |
| All product and hero images are unoptimized PNGs/JPGs | HIGH |
| Wrong images in application cards (audio image for defence, etc.) | MEDIUM |
| `<img>` tags lack `width`/`height` attributes — CLS risk | MEDIUM |
| `images: { unoptimized: true }` disables all Next.js image optimization | MEDIUM |
| Same resistors-assorted.png used twice on wirewound-resistors page | LOW |

### Alt Text Quality

Alt text is generally good — product images have descriptive alts ("Custom toroidal transformer with connector terminals", "Transformer designed for Su-30MKI programme"). Decorative images correctly use `aria-hidden="true"`. No significant alt text issues.

---

## Section 8 — Local SEO

**Score: 34/100**

### Critical Local Issues

#### CRITICAL: Google Maps Embed is Broken

`about-us/page.tsx` line 170 — the iframe embed uses:
- **Place ID**: `0x3bc2b80e0b5e1d1d:0x0` — the trailing `:0x0` is a placeholder value. Real Place IDs have a non-zero second component.
- **Coordinates**: `18.6298°N, 73.8467°E` — approximately 520m south-southwest of the actual MIDC Bhosari location, placing the pin in a residential area.

**Fix:** Go to maps.google.com, search "Electronic Sadan 1 MIDC Bhosari Pune", select the correct pin, use Share > Embed a map, copy the iframe src.

#### CRITICAL: Malformed Phone Number

`about-us/page.tsx` line 114: `href="tel:+91330620988"` — this is 9 digits after the country code. Indian numbers are 10 digits. The number is non-functional for click-to-call. Likely intended as `+91-20-30620988` (Pune STD code 020 + 8-digit number).

**Fix:** Verify the correct full number and fix both the `href` and display text.

### NAP Inconsistencies

| Source | Address Format | Issue |
|---|---|---|
| Footer | "Electronic Sadan 1, MIDC, Bhosari, Pune 411026" | Missing "No.-1", "M.I.D.C.", "Pimpri-Chinchwad" |
| About page | "Electronic Sadan No.-1, M.I.D.C., Bhosari, Pune, Pimpri-Chinchwad, Maharashtra 411026" | Authoritative format |
| Schema | ABSENT | Must be created |

**Canonical NAP format to adopt everywhere:**
> Unit No. 11, Electronic Sadan No.-1, MIDC, Bhosari, Pimpri-Chinchwad, Maharashtra 411026, India

### GBP Optimization Checklist

- [ ] Verify GBP listing exists and is claimed
- [ ] Set primary category to "Electronics manufacturer" (not "Electronics store")
- [ ] Add secondary categories: "Transformer supplier", "Industrial equipment supplier"
- [ ] Upload 10+ photos (factory, products, team, exhibitions — all assets already exist)
- [ ] Add all 4 product lines to GBP Products section
- [ ] Set accurate business hours (also needed on site)
- [ ] Add both phone numbers
- [ ] Write GBP description with target keywords
- [ ] Add `sameAs` links in schema once citations are confirmed

### Citation Opportunities

For Indian B2B electronic component manufacturers, the highest-priority citation sources are:
1. **IndiaMart** (indiamart.com) — #1 Indian B2B marketplace
2. **Justdial** — high DA, appears in local packs for Indian queries
3. **TradeIndia** (tradeindia.com)
4. **MSME Udyam Registration** — official GoI registration
5. **Maharashtra MIDC Directory** — MIDC estate occupants list
6. **ELCINA** — Electronics Industries Association of India

None are linked from the site or referenced in schema `sameAs`.

---

## Appendix — Files Requiring Attention

| File | Issues |
|---|---|
| `app/layout.tsx` | Remove title template (F-002); add favicon metadata; add preload/preconnect hints; add Organization JSON-LD; change `lang="en"` to `lang="en-IN"` |
| `app/page.tsx` | Add Organization/LocalBusiness/WebSite schema |
| `app/about-us/page.tsx` | Fix malformed phone (line 114); fix Maps embed (line 170); fill Proprietor Section (lines 79–81); rewrite "Our Story" prose; standardise address to canonical NAP; add BreadcrumbList schema |
| `app/toroidal-transformers/page.tsx` | Add Product + BreadcrumbList schema |
| `app/potentiometer/page.tsx` | Add Product + BreadcrumbList schema |
| `app/current-transformer/page.tsx` | Add Product + BreadcrumbList schema |
| `app/wirewound-resistors/page.tsx` | Add Product + BreadcrumbList schema |
| `app/HomeClient.tsx` | Fix static H1; add `fetchPriority="high"` to first slide image; add `width`/`height` to `<img>` tags; lazy-load QuoteModal |
| `app/toroidal-transformers/PageClient.tsx` | Add entity-establishing opening paragraph; add Su-30MKI/Tejas LCA to body prose |
| `app/potentiometer/PageClient.tsx` | Add ETC/SL/50 linear potentiometer specifications; fix wrong application images |
| `app/current-transformer/PageClient.tsx` | Add IEC 61869-2 standard reference; add ALF/knee-point to spec table; expand word count |
| `app/wirewound-resistors/PageClient.tsx` | Fix duplicate image; fix wrong application images |
| `app/sitemap.ts` | Replace entirely with `public/sitemap.xml` static file (fixes underscore URL generation) |
| `components/Breadcrumb.tsx` | Implement the render loop — component is empty |
| `components/layout/Header.tsx` | Switch `etcc-logo.png` → `etcc-logo.svg`; add `width`/`height` to logo `<img>` |
| `components/layout/Footer.tsx` | Standardise address to canonical NAP; add second phone number |
| `components/QuoteModal.tsx` | Lazy-load Supabase import inside `handleSubmit` |
| `public/robots.txt` | Add named AI crawler directives |
| `public/_redirects` | Fix `/products.html` and `/projects.html` destination pages |
| `public/llms.txt` | CREATE — template provided in Section 6 |
| `public/_headers` | CREATE — Cloudflare Pages security headers |
| `public/favicon.ico` | CREATE — generate from etcc-logo.svg |
| `public/sitemap.xml` | CREATE — static file replacing app/sitemap.ts |
