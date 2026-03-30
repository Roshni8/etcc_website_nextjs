# Review Checklist — ETCC India Website

Actionable checks for each of the 8 review categories. For each item: what to check, how to verify, and what a pass/fail looks like.

---

## 1. Design System Compliance

| # | Check | How to Verify | Pass | Fail |
|---|-------|--------------|------|------|
| 1.1 | Container pattern | Grep for `max-w-` in changed files | `mx-auto max-w-6xl px-6` | Any other max-width or ad-hoc padding |
| 1.2 | Semantic color tokens | Grep for raw colors: `text-stone-`, `text-gray-`, `bg-blue-`, `#`, `rgb(`, `hsl(` | No raw colors in JSX | Raw color values found |
| 1.3 | Spacing from scale | Check padding/margin classes against globals.css section 4 | All values exist in the scale | Custom values like `p-7`, `mt-[37px]` |
| 1.4 | Typography — h1 font | Check h1 elements use `font-heading` or default from globals.css | Cooper on h1 only | Inter on h1, or Cooper on h2+ |
| 1.5 | Heading hierarchy | Count h1 tags per page; check for skipped levels | One h1, sequential levels | Multiple h1s or h1→h3 skip |
| 1.6 | Section spacing | Check section wrappers for vertical padding | `py-20 md:py-32` or documented variant | Missing or non-standard padding |
| 1.7 | Card consistency | Compare card classes to design-standards.md section 6 | Matches documented pattern | Custom card styles |

---

## 2. Performance

| # | Check | How to Verify | Pass | Fail |
|---|-------|--------------|------|------|
| 2.1 | Image dimensions | Every `<img>` / `<Image>` has `width` and `height` | All images have both | Missing width or height |
| 2.2 | Lazy loading | Below-fold images have `loading="lazy"` | Correct loading strategy | Above-fold lazy or below-fold eager |
| 2.3 | Image file size | Check file sizes of new/modified images in `public/assets/` | Under 200KB | Over 200KB (especially 4MB+ JPGs) |
| 2.4 | Image format | Check format of new images | WebP for photos, SVG for logos/icons | Uncompressed JPEG or PNG photos |
| 2.5 | Client directive | Check `"use client"` is necessary in each file that has it | Only files using useState/useEffect/onClick/animations | Static content with unnecessary "use client" |
| 2.6 | Dynamic imports | Heavy components (modals, carousels) use `dynamic()` | Large interactive components are code-split | Heavy components imported statically |
| 2.7 | Bundle impact | No large library imports in server components | Clean server component imports | Importing animation/UI libraries in server code |

---

## 3. SEO and Content Quality

| # | Check | How to Verify | Pass | Fail |
|---|-------|--------------|------|------|
| 3.1 | Metadata export | Read `page.tsx` for `export const metadata` | Has title, description, canonical, openGraph | Missing or incomplete metadata |
| 3.2 | Unique titles | Compare title with other pages | Unique across all pages | Duplicated title |
| 3.3 | JSON-LD present | Search for `application/ld+json` in page | Organization + BreadcrumbList minimum | Missing structured data |
| 3.4 | Product schema | Product pages have Product JSON-LD | Includes name, description, manufacturer | Missing on product pages |
| 3.5 | One h1 per page | Count h1 elements in full page render | Exactly one h1 | Zero or multiple h1s |
| 3.6 | Technical content | Read visible text for specifics | VA ratings, accuracy classes, temp ranges, certifications | Only generic marketing phrases |
| 3.7 | Sitemap sync | Compare pages in `app/` to entries in `public/sitemap.xml` | All public pages listed | Pages missing from sitemap |
| 3.8 | Canonical URL | Check `alternates.canonical` matches actual URL | Correct full URL | Missing, wrong, or relative URL |

---

## 4. Architecture and Code Structure

| # | Check | How to Verify | Pass | Fail |
|---|-------|--------------|------|------|
| 4.1 | Server-first | Check if "use client" is needed | Only client components that use browser APIs | Static content marked as client |
| 4.2 | Metadata location | Metadata exported from `page.tsx` (server) | Metadata in server component | Metadata in client component |
| 4.3 | Single responsibility | Read component — can you describe it in one sentence? | Yes — clear single purpose | Does multiple unrelated things |
| 4.4 | Data separation | Product data in objects, not inline | Data at top of file or in data file | Specs, features embedded in JSX |
| 4.5 | Static export compat | No dynamic server features | No `generateStaticParams`, no server actions, no API routes | Uses features incompatible with `output: "export"` |
| 4.6 | Import organization | Imports grouped: external → internal → types | Clean import sections | Mixed/random import order |

---

## 5. Accessibility

| # | Check | How to Verify | Pass | Fail |
|---|-------|--------------|------|------|
| 5.1 | Semantic elements | Check for `<div onClick>` patterns | Uses `<button>`, `<a>`, `<nav>`, `<main>` | Clickable divs or spans |
| 5.2 | Alt text | Every `<img>` has meaningful alt or `alt="" aria-hidden="true"` | Present and descriptive | Missing or generic ("image") |
| 5.3 | Icon buttons | Icon-only buttons have `aria-label` | All icon buttons labeled | Missing labels |
| 5.4 | Focus management | Modals, drawers: focus trapped and returned | Focus enters on open, returns on close | No focus management |
| 5.5 | Contrast | Text on background meets 4.5:1 | Semantic tokens ensure this | Low-contrast custom colors |
| 5.6 | Keyboard nav | Tab through interactive elements | All reachable and operable | Unreachable or broken tab order |

---

## 6. Security

| # | Check | How to Verify | Pass | Fail |
|---|-------|--------------|------|------|
| 6.1 | No exposed secrets | Grep for API keys, passwords, internal URLs in client code | No secrets in client bundle | Hardcoded credentials |
| 6.2 | dangerouslySetInnerHTML | Search for `dangerouslySetInnerHTML` | Not used, or only with sanitized content | User-controlled input in innerHTML |
| 6.3 | Security headers | Check `_headers` or Netlify/Vercel config | HSTS, X-Content-Type-Options, X-Frame-Options set | Missing security headers |
| 6.4 | iframe CSP | Google Maps or third-party iframes have CSP frame-src | Allowed in policy | No CSP or overly permissive |

For deep security review, use the dedicated [security-review skill](../../.agents/skills/security-review/SKILL.md).

---

## 7. Error Handling

| # | Check | How to Verify | Pass | Fail |
|---|-------|--------------|------|------|
| 7.1 | 404 page | Check `app/not-found.tsx` exists and is styled | Branded page with nav to products | Missing or unstyled |
| 7.2 | Error boundary | Check `app/error.tsx` exists | Catches errors, offers retry | Missing |
| 7.3 | Global fallback | Check `app/global-error.tsx` exists | Renders without depending on layout CSS | Missing |
| 7.4 | Loading states | Async content has skeleton/spinner | Visible loading indicator | Blank space while loading |
| 7.5 | Image fallback | Images that fail don't leave blank space | Fallback or hidden on error | Empty holes in layout |

---

## 8. Maintainability

| # | Check | How to Verify | Pass | Fail |
|---|-------|--------------|------|------|
| 8.1 | No magic numbers | Grep for hardcoded strings (phone, address, company name) | All in constants/data files | Inline strings in JSX |
| 8.2 | Unused code | Check for unused imports, dead components | None found | Commented-out code, unused imports |
| 8.3 | File naming | Files use kebab-case, components use PascalCase | Consistent naming | Mixed conventions |
| 8.4 | TypeScript safety | No `any` types, proper interfaces defined | Strict types | `any` or missing types |
| 8.5 | DRY | Same pattern not duplicated across files | Shared via components or utilities | Copy-pasted blocks in multiple files |
| 8.6 | Readable structure | Component file understandable in 30 seconds | Clear data → render flow | Tangled logic and presentation |
