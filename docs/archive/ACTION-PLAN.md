# ETCC India — SEO Action Plan
**Generated:** 24 March 2026 | **Overall Score:** 42/100
**Target Score:** 75/100 within 3 sprints

---

## Priority Legend

| Priority | Definition | Fix Within |
|---|---|---|
| CRITICAL | Blocks indexing, breaks core functionality, or produces incorrect data | Immediately / before next deploy |
| HIGH | Significantly impacts rankings, trust, or user experience | 1 week |
| MEDIUM | Optimization opportunity with meaningful impact | 1 month |
| LOW | Nice to have, incremental improvement | Backlog |

---

## CRITICAL — Fix Before Next Deploy

### C-1: Fix URL Slug Mismatch (Underscore vs Hyphen)
**Problem:** Next.js 15 static export overrides `alternates.canonical` metadata and generates underscore filenames (`toroidal_transformers.html`) even though source directories use hyphens. Canonical tags, OG URLs, and the sitemap all conflict with each other.

**Action:**
1. Check live site: do `https://etccindia.com/toroidal-transformers` and `https://etccindia.com/toroidal_transformers` both return 200? Which one does Cloudflare serve?
2. If Cloudflare serves underscore URLs: update all `alternates.canonical` and `openGraph.url` in `page.tsx` files to use underscores, update `public/sitemap.xml` (see C-3) to use underscores, add `_redirects` rules from hyphen → underscore. Long-term, configure Cloudflare Pages to rewrite underscore → hyphen for clean URLs.
3. If Cloudflare rewrites to hyphens: the `out/` directory may just be a stale build artifact — rebuild and re-verify the canonical tags in the freshly built HTML.

**Files:** All `app/*/page.tsx`, `public/_redirects`, `public/sitemap.xml`
**Effort:** 2–4 hours

---

### C-2: Fix Title Tag Duplication
**Problem:** `title: { absolute }` in each `page.tsx` is not bypassing the layout template, resulting in titles like "Wire Wound Servo Potentiometer Manufacturer | ETCC India | ETCC India".

**Action:**
1. Run `next build` and grep the built `out/*.html` files for `<title>` tags.
2. If duplication persists: in `app/layout.tsx`, remove the `title.template` property entirely. All pages manage their own full titles via `absolute` — the template is redundant.
3. Verify no page is left without a title after the change.

```ts
// app/layout.tsx — BEFORE
title: {
  default: "Toroidal Transformers & Precision Potentiometers | ETCC India",
  template: "%s | ETCC India",
},

// AFTER
title: "Toroidal Transformers & Precision Potentiometers | ETCC India",
```

**Files:** `app/layout.tsx`
**Effort:** 30 minutes

---

### C-3: Replace Dynamic Sitemap with Static public/sitemap.xml
**Problem:** `app/sitemap.ts` generates underscore URLs in the built `out/sitemap.xml` (e.g., `/toroidal_transformers` instead of `/toroidal-transformers`). A static file in `/public/` bypasses the build transformer entirely.

**Action:**
1. Delete `app/sitemap.ts`
2. Create `public/sitemap.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://etccindia.com</loc>
    <lastmod>2026-03-24</lastmod>
  </url>
  <url>
    <loc>https://etccindia.com/toroidal-transformers</loc>
    <lastmod>2026-03-24</lastmod>
  </url>
  <url>
    <loc>https://etccindia.com/potentiometer</loc>
    <lastmod>2026-03-24</lastmod>
  </url>
  <url>
    <loc>https://etccindia.com/current-transformer</loc>
    <lastmod>2026-03-24</lastmod>
  </url>
  <url>
    <loc>https://etccindia.com/wirewound-resistors</loc>
    <lastmod>2026-03-24</lastmod>
  </url>
  <url>
    <loc>https://etccindia.com/about-us</loc>
    <lastmod>2026-03-24</lastmod>
  </url>
</urlset>
```

Note: Homepage URL has no trailing slash, consistent with `trailingSlash: false`.
**Files:** Delete `app/sitemap.ts`, create `public/sitemap.xml`
**Effort:** 15 minutes

---

### C-4: Fix Malformed Phone Number
**Problem:** `about-us/page.tsx` line 114 — `href="tel:+91330620988"` has 9 digits after the country code. Click-to-call is broken.

**Action:**
1. Verify the correct full number. Likely intended: `+91-20-30620988` (Pune STD: 020).
2. Fix `href` to `tel:+912030620988` and display text to `020-30620988`.

**File:** `app/about-us/page.tsx` line 114
**Effort:** 5 minutes

---

### C-5: Fix Google Maps Embed
**Problem:** The iframe in `about-us/page.tsx` uses a placeholder Place ID (`:0x0` suffix) and coordinates ~520m off-target from the actual MIDC Bhosari factory location.

**Action:**
1. Go to maps.google.com
2. Search: "Electronic Sadan 1 MIDC Bhosari Pune"
3. Find and click on the correct location pin
4. Click Share → Embed a map → Copy iframe code
5. Replace the iframe `src` in `app/about-us/page.tsx` line 170

**File:** `app/about-us/page.tsx` line 170
**Effort:** 10 minutes

---

## HIGH — Fix Within 1 Week

### H-1: Implement Breadcrumb Component
**Problem:** `components/Breadcrumb.tsx` renders an empty `<nav>` — the `items` prop is accepted but never rendered.

**Action:** Implement the render loop in `Breadcrumb.tsx`:

```tsx
const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center gap-2 text-sm text-muted-foreground">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            {index > 0 && <span aria-hidden="true">/</span>}
            {item.href ? (
              <a href={item.href} className="hover:text-foreground transition-colors">
                {item.label}
              </a>
            ) : (
              <span className="text-foreground">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
```

**File:** `components/Breadcrumb.tsx`
**Effort:** 30 minutes

---

### H-2: Add All Schema Markup
**Problem:** Zero JSON-LD schema exists. This is the single largest technical gap.

**Action (in order):**

1. **`app/page.tsx`** — Add Organization + LocalBusiness + WebSite schema (see `FULL-AUDIT-REPORT.md` Section 4 for complete JSON-LD). Remember to first confirm correct MIDC Bhosari GPS coordinates from the Maps embed (C-5).

2. **Each product `page.tsx`** — Add Product + BreadcrumbList schema. See `FULL-AUDIT-REPORT.md` Section 4 for templates.

3. **`app/about-us/page.tsx`** — Add BreadcrumbList schema.

Implementation pattern:
```tsx
export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaObject) }}
      />
      <PageClient />
    </>
  );
}
```

**Files:** `app/page.tsx`, all product `page.tsx` files, `app/about-us/page.tsx`
**Effort:** 3–4 hours

---

### H-3: Switch Logo to SVG (5-Minute Win)
**Problem:** `Header.tsx` and `Footer.tsx` use `etcc-logo.png` (528KB). The SVG already exists at `/public/assets/etcc-logo.svg`.

**Action:**

In `components/layout/Header.tsx` line 32:
```tsx
// Before
<img src="/assets/etcc-logo.png" alt="ETCC Logo" className="h-9 w-auto" />

// After
<img src="/assets/etcc-logo.svg" alt="ETCC Logo" className="h-9 w-auto" width="120" height="36" />
```

In `components/layout/Footer.tsx` line 19:
```tsx
// Before
<img src="/assets/etcc-logo.png" alt="ETCC Logo" className="h-12 w-auto brightness-0 invert" />

// After
<img src="/assets/etcc-logo.svg" alt="ETCC Logo" className="h-12 w-auto brightness-0 invert" width="160" height="48" />
```

**Files:** `components/layout/Header.tsx`, `components/layout/Footer.tsx`
**Effort:** 5 minutes
**Impact:** Removes 528KB from above-fold payload on every page

---

### H-4: Fix Homepage H1
**Problem:** The H1 is a JavaScript carousel that rotates 4 different values — only the first ("Toroidal Transformers") is baked into static HTML.

**Action:** Replace `HomeClient.tsx` line 82:
```tsx
// Before
<h1 className="mb-2 font-heading text-2xl font-bold text-stone-50 md:text-3xl lg:text-4xl">
  {slides[currentSlide].title}
</h1>

// After
<h1 className="mb-2 font-heading text-2xl font-bold text-stone-50 md:text-3xl lg:text-4xl">
  Precision Electromagnetic Component Manufacturer — ETCC India
</h1>
<p className="text-lg text-stone-200">{slides[currentSlide].subtitle}</p>
```

**File:** `app/HomeClient.tsx`
**Effort:** 15 minutes

---

### H-5: Add OG Image to All Pages
**Problem:** No `og:image` or `twitter:image` on any page. All social shares render as text-only cards.

**Action:**
1. Create a default OG image (1200×630px) using the ETCC logo + brand colour background. Save as `public/og-image.jpg`.
2. Add to `app/layout.tsx` metadata:
```ts
openGraph: {
  images: [{ url: 'https://etccindia.com/og-image.jpg', width: 1200, height: 630 }],
},
twitter: { card: 'summary_large_image' },
```
3. Optionally create product-specific OG images using existing product photography for each `page.tsx`.

**Files:** `app/layout.tsx`, optionally all product `page.tsx` files
**Effort:** 1–2 hours

---

### H-6: Add Favicon
**Problem:** No favicon defined. Browsers show a blank tab icon.

**Action:**
1. Generate `favicon.ico` (32×32px) and `apple-touch-icon.png` (180×180px) from `etcc-logo.svg`
2. Place `favicon.ico` in `/public/`
3. Place `apple-touch-icon.png` in `/public/`
4. Add to `app/layout.tsx`:
```ts
icons: {
  icon: '/favicon.ico',
  apple: '/apple-touch-icon.png',
},
```

**Files:** `app/layout.tsx` + new image files
**Effort:** 30 minutes

---

### H-7: Standardise NAP Across Footer and About Page
**Problem:** Footer address abbreviates "Sadan 1" (missing "No.-1"), omits "Pimpri-Chinchwad", and only lists one phone number.

**Action:** Update `components/layout/Footer.tsx`:
```tsx
// Current
<span>Unit No. 11, Electronic Sadan 1, MIDC, Bhosari, Pune 411026</span>

// Replace with (single canonical format)
<span>
  Unit No. 11, Electronic Sadan No.-1, MIDC, Bhosari,<br />
  Pimpri-Chinchwad, Maharashtra 411026, India
</span>
```
Also add the second phone number `+91-2030689099` to the footer.

**File:** `components/layout/Footer.tsx`
**Effort:** 15 minutes

---

### H-8: Fill the Empty Proprietor Section
**Problem:** `about-us/page.tsx` lines 79–81 contain an empty `<section>` that renders as visible whitespace with a border — the most obvious unfinished element on the site.

**Action:** Add Mr. Rajan Naroor's biography, role, years of experience, engineering background, and any advisory or institutional affiliations. Include a photo if available. This is the highest-priority E-E-A-T content investment on the site.

**File:** `app/about-us/page.tsx` lines 79–81
**Effort:** 1–2 hours (content writing + implementation)

---

### H-9: Add LCP Performance Hints
**Problem:** No preload hint for the first hero image; no preconnect for Google Fonts.

**Action:** In `app/layout.tsx`, add to the `<head>`:
```tsx
<head>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
  <link rel="preload" as="image" href="/assets/products-400htz.webp" type="image/webp" />
</head>
```
Also add `fetchPriority="high"` to the first hero slide `<img>` in `HomeClient.tsx` (index === 0 condition).

**Files:** `app/layout.tsx`, `app/HomeClient.tsx`
**Effort:** 30 minutes

---

### H-10: Create llms.txt
**Problem:** No `llms.txt` — AI crawlers have no structured guide to site content.

**Action:** Create `/public/llms.txt` using the template in `FULL-AUDIT-REPORT.md` Section 6.

**File:** Create `public/llms.txt`
**Effort:** 30 minutes

---

## MEDIUM — Fix Within 1 Month

### M-1: Rewrite "Our Story" Prose + Fix Grammatical Error
**Problem:** "précised" is not standard English (line 70). The four body paragraphs are generic boilerplate common to Indian SME sites with zero specificity.

**Action:**
1. Change "more précised" to "more precise" (line 70)
2. Rewrite the four paragraphs to be specific: name the factory, the year milestones, the types of clients, the specific challenges solved. Reference DRDO, BHEL, defence programme work. Match the register of the homepage defence section prose.

**File:** `app/about-us/page.tsx` lines 63–74
**Effort:** 1–2 hours

---

### M-2: Fix Application Section Images
**Problem:** Application cards on product pages use incorrect images (e.g., audio studio image for "Defence & Aerospace" on the potentiometer page).

**Action:** Audit and correct image assignments across all four product `PageClient.tsx` files. Use the existing `/assets/app-defence.jpg`, `/assets/app-audio.jpg`, `/assets/app-medical.jpg`, `/assets/app-industrial.jpg` assets appropriately for each card on each page.

**Files:** All four `PageClient.tsx` files
**Effort:** 1 hour

---

### M-3: Lazy-load Supabase / QuoteModal
**Problem:** `@supabase/supabase-js` (~130KB gzip) is eagerly loaded on every page but is only needed when the user opens the quote modal.

**Action:** In `HomeClient.tsx` and `Header.tsx`, change the QuoteModal import:
```tsx
import dynamic from 'next/dynamic';
const QuoteModal = dynamic(() => import('@/components/QuoteModal'), { ssr: false });
```
This defers the Supabase client load until the modal mounts.

**Files:** `app/HomeClient.tsx`, `components/layout/Header.tsx`
**Effort:** 30 minutes

---

### M-4: Convert Hero Images to WebP
**Problem:** All hero images are unoptimized PNGs (284KB–356KB each). No WebP variants exist.

**Action:**
1. Convert all 4 hero slide images and product page hero images to WebP using `sharp`, `squoosh`, or `cwebp`. Target: ~60–100KB per image (75% reduction).
2. Use `<picture>` elements with WebP source + PNG fallback in `HomeClient.tsx` and each `PageClient.tsx`.
3. Update the `<link rel="preload">` in `layout.tsx` to reference the WebP file.

**Files:** All `PageClient.tsx` and `HomeClient.tsx` files + new WebP assets
**Effort:** 2–3 hours

---

### M-5: Add width/height to All img Tags
**Problem:** No `<img>` tag across the codebase has explicit `width` and `height` HTML attributes. Without these, browsers cannot reserve space before images load, causing CLS.

**Action:** Add `width` and `height` to every `<img>` tag matching the intrinsic image dimensions. Priority order: hero images, logo, above-fold product images, then below-fold images.

**Files:** `HomeClient.tsx`, all `PageClient.tsx` files, `Header.tsx`, `about-us/page.tsx`
**Effort:** 2–3 hours

---

### M-6: Add IEC/IS Standards References to Product Pages
**Problem:** No standards references anywhere on product pages — a key credibility signal for B2B procurement engineers.

**Action:** Add a "Standards & Compliance" note to each product page:
- Transformers: IEC 61558, IS 1865
- Current Transformers: IEC 61869-2, IS 2705
- Potentiometers: MIL-R-39023 (defence-grade servo pots)
- Resistors: IEC 60115-8

**Files:** All four `PageClient.tsx` files
**Effort:** 1 hour

---

### M-7: Add Entity-Establishing Opening Paragraphs
**Problem:** No product page opens with a paragraph that names ETCC, states its location, founding year, and product range — the basic entity-establishment content that AI systems extract for citations.

**Action:** Rewrite the hero `<p>` on each product page to be 100–150 words, self-contained, and factually dense. See the model paragraph in `FULL-AUDIT-REPORT.md` Section 6 for the toroidal transformers page. Apply the same pattern to all four product pages.

**Files:** All four `PageClient.tsx` files
**Effort:** 2 hours

---

### M-8: Move Su-30MKI / Tejas LCA References into Body Text
**Problem:** The most powerful authority signals on the site exist only as image alt text and are invisible to AI citation extraction.

**Action:** Add a "Defence Applications" subsection to `/toroidal-transformers` with 2–3 sentences explicitly naming the Su-30MKI and Tejas LCA programmes in body prose. Reference DRDO and BHEL as named customers.

**File:** `app/toroidal-transformers/PageClient.tsx`
**Effort:** 30 minutes

---

### M-9: Add Security Headers via Cloudflare _headers
**Problem:** No HTTP security headers. Cannot be set via `next.config.ts` in static export mode.

**Action:** Create `public/_headers`:
```
/*
  Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
  X-Content-Type-Options: nosniff
  X-Frame-Options: SAMEORIGIN
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
```
Note: Do NOT add a restrictive CSP without carefully allowing `frame-src https://www.google.com` (for the Maps iframe) and `/_next/` static assets.

**File:** Create `public/_headers`
**Effort:** 30 minutes

---

### M-10: Update robots.txt with Named AI Crawler Directives
**Problem:** All AI crawlers are allowed via wildcard but no explicit rules exist. Also consider migrating to `app/robots.ts` for idiomatic Next.js 15.

**Action:** Replace `public/robots.txt` with:
```
User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Amazonbot
Allow: /

User-agent: CCBot
Allow: /

Sitemap: https://etccindia.com/sitemap.xml
```

**File:** `public/robots.txt`
**Effort:** 10 minutes

---

### M-11: Add Linear Potentiometer Specs
**Problem:** The ETC/SL/50 linear potentiometer appears as a product image and label on the potentiometer page but has zero technical specifications.

**Action:** Add a spec table or spec list for ETC/SL/50 with: resistance range, linearity, power rating, stroke length, body material, and operating temperature.

**File:** `app/potentiometer/PageClient.tsx`
**Effort:** 1 hour (content research + implementation)

---

### M-12: Change lang="en" to lang="en-IN"
**Problem:** HTML lang attribute is `en` but the site targets Indian English. OpenGraph already declares `en_IN`.

**Action:** In `app/layout.tsx` line 28, change `<html lang="en">` to `<html lang="en-IN">`.

**File:** `app/layout.tsx`
**Effort:** 2 minutes

---

## LOW — Backlog

### L-1: Add FAQ Sections to Product Pages
Add 4–6 FAQs per product page (lead time, MOQ, customisation, testing, certifications). Add `FAQPage` JSON-LD schema. High value for AI Overview eligibility and long-tail keyword capture.

### L-2: IndexNow Protocol
Generate an IndexNow key, place `/{key}.txt` in `/public/`, add a post-deploy API ping step. Covers Bing, Yandex, Naver.

### L-3: Add theme-color Meta Tag
`app/layout.tsx`: add `themeColor: '#ffffff'` (or brand primary) to the metadata object.

### L-4: Build Citations on IndiaMart and Justdial
Create or claim listings. Ensure NAP exactly matches the canonical format from H-7. Add the resulting profile URLs to the `sameAs` array in the Organization schema (H-2).

### L-5: Add Case Studies / Defence Applications Page
Create `/defence` or add a "Defence Projects" section to the About page. Cover Su-30MKI, Tejas LCA, DRDO partnerships in detail. This is the single strongest authority-building content investment available.

### L-6: Create a Standalone /contact Page
Currently contact info is embedded in /about-us. A dedicated `/contact` route improves citation building, provides a clean URL for the quote flow, and allows a standalone `ContactPage` schema type.

### L-7: Add Business Hours to Site and Schema
Business hours are absent from both the site and schema. Add to footer and to the LocalBusiness JSON-LD `openingHoursSpecification`.

### L-8: Fix /products.html and /projects.html Redirects
Current `_redirects` sends both to `/`. `/products.html` should redirect to `/` (acceptable — it lists all products) but document the decision. `/projects.html` has no logical destination — redirect to `/about-us` as the closest match.

---

## Sprint Summary

### Sprint 1 — "Stop the Bleeding" (Before Next Deploy)
C-1 through C-5: URL mismatch, title duplication, sitemap fix, malformed phone, broken Maps embed.
**Estimated score after Sprint 1: ~52/100**

### Sprint 2 — "Fix the Foundation" (Week 1)
H-1 through H-10: Breadcrumbs, schema, SVG logo, H1, OG image, favicon, NAP, Proprietor section, LCP hints, llms.txt.
**Estimated score after Sprint 2: ~65/100**

### Sprint 3 — "Build Authority" (Month 1)
M-1 through M-12: Content rewrites, image optimisation, performance, standards refs, entity paragraphs, security headers.
**Estimated score after Sprint 3: ~75/100**

---

## Effort vs Impact Matrix

| Task | Effort | Impact | Priority |
|---|---|---|---|
| Fix malformed phone (C-4) | 5 min | HIGH (broken contact) | CRITICAL |
| Fix Maps embed (C-5) | 10 min | HIGH (trust) | CRITICAL |
| Switch logo PNG → SVG (H-3) | 5 min | HIGH (528KB saved) | HIGH |
| Fix title duplication (C-2) | 30 min | CRITICAL (SERP titles) | CRITICAL |
| Replace sitemap.ts with static XML (C-3) | 15 min | HIGH (correct URLs) | CRITICAL |
| Change lang to en-IN (M-12) | 2 min | LOW | MEDIUM |
| Add llms.txt (H-10) | 30 min | MEDIUM | HIGH |
| Add favicon (H-6) | 30 min | MEDIUM | HIGH |
| Add fetchPriority="high" (H-9) | 15 min | MEDIUM (LCP) | HIGH |
| Implement Breadcrumb component (H-1) | 30 min | HIGH | HIGH |
| Add all schema (H-2) | 3–4 hrs | CRITICAL (rich results) | HIGH |
| Fill Proprietor Section (H-8) | 1–2 hrs | HIGH (E-E-A-T) | HIGH |
| Fix wrong app images (M-2) | 1 hr | MEDIUM | MEDIUM |
| Lazy-load Supabase (M-3) | 30 min | MEDIUM (bundle) | MEDIUM |
| Entity-establishing paragraphs (M-7) | 2 hrs | HIGH (GEO) | MEDIUM |
| Convert images to WebP (M-4) | 2–3 hrs | HIGH (LCP) | MEDIUM |
| Add FAQ sections (L-1) | 4–6 hrs | HIGH (AI Overviews) | LOW |
