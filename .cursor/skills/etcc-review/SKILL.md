---
name: etcc-review
description: >
  Technical review for the ETCC India website across 8 quality categories: design system compliance,
  performance, SEO, architecture, accessibility, security, error handling, and maintainability.
  Produces structured findings with educational explanations. Use when user says "review",
  "test code", "check changes", "technical review", "code review", "design review",
  "check my work", or "what needs fixing".
---

# ETCC Technical Review

Review code changes against 8 quality categories. Every finding includes a plain-language
explanation so the reviewer (who is learning development) understands *why* it matters.

## Workflow

### 1. Detect Scope

Determine what to review:

- If the user points to specific files → review those files.
- If the user says "review my changes" → run `git diff` to find changed files.
- If the user says "review this page" → find the page's `page.tsx` and `PageClient.tsx`.

### 2. Load References

Read these project files before flagging any issue:

- `docs/design-standards.md` — exact spacing, color, typography, image values
- `docs/testing-goals.md` — what each category means and what "good" looks like
- `references/review-checklist.md` — actionable checklist per category
- `app/globals.css` — CSS tokens, spacing scale, font scale

### 3. Review

Run through each category from the checklist. Only flag issues **relevant to the files in scope**.
Do not review categories that don't apply (e.g., skip SEO checks on a utility component).

### 4. Output Report

Use this exact format:

```markdown
## Review: [File or Feature Name]

**Scope:** [which files were reviewed]
**Categories checked:** [list of applicable categories]

### Findings

#### [CRITICAL-001] [Short title]
- **File:** `path/to/file.tsx:42`
- **Category:** Design System / Performance / SEO / etc.
- **Issue:** What is wrong.
- **Why this matters:** Plain-language explanation a non-developer can understand.
- **Fix:**
  ```tsx
  // Before
  <div className="text-stone-500">...</div>

  // After
  <div className="text-muted-foreground">...</div>
  ```

#### [WARNING-001] [Short title]
...same structure...

#### [SUGGESTION-001] [Short title]
...same structure...

### Summary

| Severity | Count |
|----------|-------|
| CRITICAL | X |
| WARNING | Y |
| SUGGESTION | Z |

### What to Fix First
1. All CRITICAL items (must fix before merging)
2. WARNING items (should fix — impacts quality)
3. SUGGESTION items (nice to have — improves long-term health)
```

## Severity Definitions

| Level | Criteria | Action |
|-------|----------|--------|
| **CRITICAL** | Broken functionality, security hole, SEO regression, missing metadata | Must fix before merging |
| **WARNING** | Performance issue, accessibility gap, design system violation, best-practice miss | Should fix — impacts quality |
| **SUGGESTION** | Code style, minor optimization, architectural refinement, DRY opportunity | Nice to have |

## Category Quick Reference

### 1. Design System Compliance
- Container: `mx-auto max-w-6xl px-6`
- Colors: semantic tokens only (`bg-primary`, not `bg-blue-700`)
- Spacing: only values from the scale in globals.css
- Typography: Cooper for h1, Inter for all else
- One h1 per page, no skipped heading levels

### 2. Performance
- Images: `width` + `height` on every `<img>`, max 200KB, WebP preferred
- Above-fold: eager load + `fetchPriority="high"`; below-fold: `loading="lazy"`
- Heavy client components: use `dynamic()` import
- No unnecessary `"use client"` directives

### 3. SEO and Content
- `metadata` export with unique title, description, canonical, openGraph
- JSON-LD: Organization + BreadcrumbList minimum; Product for product pages
- Technical specifics in content (VA ratings, accuracy classes, temp ranges)
- Sitemap in sync with actual pages

### 4. Architecture
- Server Components by default; `"use client"` only when needed
- Metadata and JSON-LD in server-side `page.tsx`
- Single responsibility per component
- Data objects separated from JSX

### 5. Accessibility
- Semantic HTML (`<button>`, `<nav>`, `<main>`)
- Keyboard navigation for all interactive elements
- `aria-label` on icon-only buttons
- 4.5:1 contrast minimum
- Descriptive alt text on content images

### 6. Security
- No secrets in client code (API keys, credentials)
- Review any `dangerouslySetInnerHTML` for XSS risk
- Security headers set in `_headers` or hosting config
- Cross-reference with `.agents/skills/security-review/` for deep security review

### 7. Error Handling
- Styled 404 page exists (`app/not-found.tsx`)
- Page-level error boundaries (`app/error.tsx`)
- Global fallback (`app/global-error.tsx`)
- Loading states for async content
- Images that fail don't leave blank holes

### 8. Maintainability
- No magic numbers — config values in one place
- No unused imports, components, or dependencies
- Product data separated from presentation
- Consistent file naming (kebab-case files, PascalCase components)
- TypeScript strict — no `any`

## Educational Mode

This is a learning project. For every finding, the "Why this matters" section must:

- Explain the concept in 1-2 sentences a non-developer would understand
- Connect to a real-world impact (ranking, speed, user trust, maintenance cost)
- Avoid jargon without definition

Example:
> **Why this matters:** When you use a raw color like `text-stone-500` instead of
> `text-muted-foreground`, the color is hardcoded. If you later change the brand palette,
> you'd need to find and update every instance. Semantic tokens mean you change it once
> in `globals.css` and the entire site updates automatically.

## Additional Resources

- For detailed review criteria per category, see [review-checklist.md](references/review-checklist.md)
- For exact design values, see [design-standards.md](../../docs/design-standards.md)
- For testing goals explained in plain language, see [testing-goals.md](../../docs/testing-goals.md)
- For deep security review, use the [security-review skill](../../.agents/skills/security-review/SKILL.md)
