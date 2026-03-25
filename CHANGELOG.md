# SEO Fixes Changelog — March 2026

All changes from the SEO audit (initial score: 42/100). Organised by priority.

---

## Critical Fixes

### C-2: Title tag duplication
**File:** `app/layout.tsx`
**What changed:** Removed `title.template` from root layout metadata. Each page now uses `title: { absolute: "..." }` so titles render exactly as written — no more doubled "| ETCC India" suffix.
**Test:** View page source on every page. Each `<title>` should appear once with no repeated brand suffix.

### C-3: Sitemap generating underscore URLs
**Files:** Deleted `app/sitemap.ts`, created `public/sitemap.xml`
**What changed:** The dynamic sitemap generator was producing `toroidal_transformers` instead of `toroidal-transformers` in the static export. Replaced with a hand-written static XML sitemap with correct hyphenated URLs.
**Test:** Visit `https://etccindia.com/sitemap.xml` — all 6 URLs should use hyphens, not underscores. No trailing slash on homepage.

### C-4: Malformed phone number on About page
**File:** `app/about-us/page.tsx` (within `PageClient`)
**What changed:** Fixed `tel:+91330620988` to `tel:+912030620988` and display text to `020-30620988`.
**Test:** Click the phone number on the About Us page — it should dial the correct number.

### C-5: Broken Google Maps embed
**File:** `app/about-us/page.tsx` (within `PageClient`)
**What changed:** Replaced placeholder coordinates with a search-based embed URL pointing to "Electronic Sadan No 1, MIDC, Bhosari, Pimpri-Chinchwad, Pune 411026". No API key required.
**Test:** About Us page should show an embedded Google Map centred on the ETCC factory location.

---

## High Priority Fixes

### H-1: Breadcrumb component was empty
**File:** `components/Breadcrumb.tsx`
**What changed:** The component accepted props but rendered an empty `<nav>`. Implemented the full render loop with Home icon, ChevronRight separators, and linked items.
**Test:** Every product page and About Us should show a working breadcrumb trail below the hero. Links should navigate correctly.

### H-2: No JSON-LD structured data
**Files:** `app/page.tsx`, `app/toroidal-transformers/page.tsx`, `app/potentiometer/page.tsx`, `app/current-transformer/page.tsx`, `app/wirewound-resistors/page.tsx`, `app/about-us/page.tsx`
**What changed:** Added JSON-LD `<script>` tags to every server-component page:
- Homepage: Organization + LocalBusiness + WebSite `@graph`
- Product pages: Product schema + BreadcrumbList schema (each with specs, offers, brand)
- About Us: BreadcrumbList schema
**Test:** Paste each page URL into [Google Rich Results Test](https://search.google.com/test/rich-results) — Product, LocalBusiness, Organization, and BreadcrumbList should all validate without errors.

### H-3 + H-7: Logo was 528KB PNG + NAP inconsistency
**Files:** `components/layout/Header.tsx`, `components/layout/Footer.tsx`
**What changed:**
- Switched `etcc-logo.png` to `etcc-logo.svg` in both header and footer (with explicit width/height)
- Standardised address to "Unit No. 11, Electronic Sadan No.-1, MIDC, Bhosari, Pimpri-Chinchwad, Pune 411026" everywhere
- Added second phone number `+91-20-30689099` in footer
**Test:** Logo should render correctly (SVG). Footer address and phone numbers should match the About Us page exactly.

### H-4 + M-3: Homepage H1 changed per carousel slide + QuoteModal bundle bloat
**File:** `app/HomeClient.tsx`
**What changed:**
- Replaced the carousel-driven `<h1>` with a static H1: "Precision Electromagnetic Components — ETCC India"
- Product-specific title now shows as a `<p>` below H1
- Lazy-loaded QuoteModal with `dynamic(() => import(...), { ssr: false })` — saves ~130KB gzip on initial load
- Added `fetchPriority="high"` and width/height to the first hero slide image
**Test:** Inspect the homepage — only one `<h1>` should exist, and it should not change when the carousel advances. The quote modal should still open when clicking "Request a Quote".

### H-5 + H-6 + H-9: Missing favicon, OG image, preconnect
**File:** `app/layout.tsx`
**What changed:**
- Added `icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" }` metadata
- Added OpenGraph image metadata (1200x630)
- Added Twitter card metadata
- Added `theme-color` meta tag
- Changed `lang="en"` to `lang="en-IN"` on `<html>`
- Added `<link rel="preconnect">` for Google Fonts
**Test:** Check view-source for `<link rel="icon">`, `<meta property="og:image">`, and `lang="en-IN"`. **You still need to create the actual image files:** `public/favicon.ico`, `public/apple-touch-icon.png`, and `public/og-image.jpg`.

---

## Medium Priority Fixes

### M-7/M-8: Product page content + images
**Files:** All 4 `PageClient.tsx` files in `app/toroidal-transformers/`, `app/potentiometer/`, `app/current-transformer/`, `app/wirewound-resistors/`
**What changed:**
- **Entity-establishing hero paragraphs:** Each page now names ETCC India, Pune, 1994 founding, and key product specs in the opening paragraph (critical for E-E-A-T and AI citation)
- **IEC/IS standard references:** Added relevant standards (IEC 61558, IS 2026, IEC 61869-2, IS 2705, JSS 50432, IS 12063) to product descriptions
- **Wrong application images fixed:** "Defence & Aerospace" cards were showing `app-audio.jpg`, "Power Quality" was showing `app-audio.jpg`, etc. All now use contextually correct images
- **Width/height on all `<img>` tags:** Every image now has explicit `width` and `height` attributes to prevent CLS (Cumulative Layout Shift)
- **Su-30MKI/Tejas LCA reference:** Added defence programme credentials to the toroidal transformers Applications section
**Test:** Visit each product page. Check that:
1. The hero paragraph mentions "ETCC India" and "Pune"
2. Application card images match their titles (defence card shows defence image, not audio)
3. No layout shift when images load (inspect with Chrome DevTools Lighthouse)

### About Us page rewrite
**File:** `app/about-us/page.tsx` (PageClient)
**What changed:**
- Rewrote "Our Story" section with specific factual content (DRDO, BHEL, Su-30MKI, Tejas LCA, testing procedures)
- Filled empty Proprietor section with Mr. Rajan Naroor leadership card
- Standardised address format (M.I.D.C. to MIDC)
**Test:** Read through the About Us page — content should be factually accurate and specific to ETCC.

---

## New Files Created

### `public/sitemap.xml`
Static XML sitemap with all 6 pages using correct hyphenated URLs.

### `public/llms.txt`
AI crawler guidance file — describes the business, products, contact info, and page structure for LLM crawlers.
**Test:** Visit `https://etccindia.com/llms.txt` — should render as plain text.

### `public/_headers`
Cloudflare Pages security headers file — adds HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy, and CSP.
**Test:** After deploying, check response headers with `curl -I https://etccindia.com` — all security headers should be present.

### `public/robots.txt` (updated)
Added named AI crawler directives (GPTBot, ClaudeBot, PerplexityBot, Amazonbot, etc.) all with `Allow: /`.
**Test:** Visit `https://etccindia.com/robots.txt` — should list each bot with Allow directives.

---

## Still Needs Your Action

These items require assets or decisions that can't be generated from code alone:

| Item | What you need to do |
|------|---------------------|
| **favicon.ico** | Generate a 32x32 `.ico` from your logo SVG and place at `public/favicon.ico` |
| **apple-touch-icon.png** | Generate a 180x180 PNG from your logo and place at `public/apple-touch-icon.png` |
| **og-image.jpg** | Create a 1200x630 branded image and place at `public/og-image.jpg` |
| **Hero images as WebP** | Convert `toroidal-hero-bg.jpg`, `potentiometer-hero-bg.jpg`, etc. to WebP for smaller file sizes |
| **Verify Google Maps pin** | Check the About Us map embed shows the correct factory location |
| **Build & deploy** | Run `npm run build` and deploy to Cloudflare Pages, then verify all pages render correctly |
| **Rich Results Test** | Paste each URL into Google's Rich Results Test to validate schema markup |
| **Submit sitemap** | In Google Search Console, submit `https://etccindia.com/sitemap.xml` |

---

## Files Modified (Summary)

| File | Changes |
|------|---------|
| `app/layout.tsx` | lang, title, favicon, OG, twitter, theme-color, preconnect |
| `app/page.tsx` | Organization + LocalBusiness + WebSite JSON-LD |
| `app/HomeClient.tsx` | Static H1, lazy QuoteModal, hero image fetchPriority + dimensions |
| `app/toroidal-transformers/page.tsx` | Product + BreadcrumbList JSON-LD |
| `app/toroidal-transformers/PageClient.tsx` | Entity paragraph, standards, image dimensions, defence text |
| `app/potentiometer/page.tsx` | Product + BreadcrumbList JSON-LD |
| `app/potentiometer/PageClient.tsx` | Entity paragraph, standards, image fixes + dimensions |
| `app/current-transformer/page.tsx` | Product + BreadcrumbList JSON-LD |
| `app/current-transformer/PageClient.tsx` | Entity paragraph, standards, image fixes + dimensions |
| `app/wirewound-resistors/page.tsx` | Product + BreadcrumbList JSON-LD |
| `app/wirewound-resistors/PageClient.tsx` | Entity paragraph, standards, image fixes + dimensions |
| `app/about-us/page.tsx` | Phone fix, maps fix, content rewrite, BreadcrumbList JSON-LD |
| `components/Breadcrumb.tsx` | Implemented render loop |
| `components/layout/Header.tsx` | SVG logo, lazy QuoteModal |
| `components/layout/Footer.tsx` | SVG logo, NAP standardisation, second phone |
| `public/sitemap.xml` | New — static sitemap |
| `public/llms.txt` | New — AI crawler guidance |
| `public/_headers` | New — Cloudflare security headers |
| `public/robots.txt` | Updated — AI crawler directives |
| `app/sitemap.ts` | Deleted — replaced by static XML |
