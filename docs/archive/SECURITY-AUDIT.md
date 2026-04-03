# Security Audit Report — ETCC India Website (Next.js)

**Date**: 2026-03-29
**Scope**: Full codebase security review
**Framework**: Next.js 15.3 (Static Export) + React 19 + Supabase
**Overall Risk**: LOW (Static site with minimal attack surface)

---

## Executive Summary

| Severity | Count |
|----------|-------|
| **Critical** | 1 |
| **High** | 1 |
| **Medium** | 3 |
| **Low** | 3 |
| **Info/Best Practice** | 3 |

The application is a **statically exported** Next.js site with no API routes and no server-side rendering at runtime. This dramatically reduces the attack surface. The one critical finding is **Supabase credentials committed to git history** — these should be rotated immediately.

---

## Findings

### VULN-001: Supabase Credentials Exposed in Git History (Critical)

- **Location**: `.env.local` (committed in `4de90c10` and `1324796a`)
- **Confidence**: HIGH
- **Issue**: The `.env.local` file containing Supabase URL and publishable JWT was committed in the initial project setup. Although `.gitignore` now excludes it, the credentials remain in git history.
- **Impact**: Anyone with repo access can extract the Supabase project URL and anon key from git history. While `NEXT_PUBLIC_` keys are designed for client-side use, exposure in git history means they are permanently compromised if the repo was ever public or shared.
- **Evidence**:
  ```
  git log --all --oneline -- .env.local
  4de90c10 Initial Next.js project setup
  1324796a Initial Next.js project setup
  ```
- **Fix**:
  1. Rotate the Supabase anon key immediately in the Supabase dashboard
  2. Clean git history using `git filter-repo` or BFG Repo-Cleaner
  3. Verify Row-Level Security (RLS) policies are enabled on all Supabase tables

---

### VULN-002: Dependency Vulnerabilities — picomatch & brace-expansion (High)

- **Location**: `node_modules/picomatch`, `node_modules/brace-expansion`
- **Confidence**: HIGH
- **Issue**: `npm audit` reports 2 vulnerabilities:
  - **picomatch** (HIGH): Method injection in POSIX character classes + ReDoS via extglob quantifiers
  - **brace-expansion** (MODERATE): Zero-step sequence causes process hang and memory exhaustion
- **Impact**: ReDoS could cause denial-of-service in build tooling; method injection could cause incorrect glob matching.
- **Fix**: Run `npm audit fix` — fixes are available for both packages.

---

### VULN-003: Missing Content Security Policy (Medium)

- **Location**: `out/_headers`
- **Confidence**: HIGH
- **Issue**: Current CSP only sets `frame-ancestors 'self'` and `frame-src`. No `default-src`, `script-src`, `style-src`, or `img-src` directives are defined.
- **Impact**: Without a comprehensive CSP, the site has no browser-enforced protection against script injection if any XSS vector is introduced in the future.
- **Fix**: Add a comprehensive CSP header:
  ```
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; frame-src https://www.google.com https://maps.google.com; font-src 'self'
  ```

---

### VULN-004: Build Output (`out/`) Tracked in Git (Medium)

- **Location**: `out/` directory
- **Confidence**: HIGH
- **Issue**: The static export `out/` directory is committed to version control. It contains compiled JavaScript bundles with embedded Supabase credentials (the `NEXT_PUBLIC_` env vars are baked into the build).
- **Impact**: Increases credential exposure surface. Build artifacts inflate repo size and can contain stale/inconsistent code.
- **Fix**:
  1. Add `out/` to `.gitignore`
  2. Remove from tracking: `git rm -r --cached out/`
  3. Deploy via CI/CD pipeline instead of committing build output

---

### VULN-005: No Client-Side Rate Limiting on Form Submission (Medium)

- **Location**: `components/QuoteModal.tsx`
- **Confidence**: MEDIUM (depends on Supabase-side configuration)
- **Issue**: The quote request form submits directly to Supabase with no visible rate limiting, debouncing, or CAPTCHA protection.
- **Impact**: An attacker could spam the `quote_submissions` table and trigger excessive `send-quote-notification` edge function invocations, potentially exhausting Supabase quotas.
- **Fix**:
  1. Add client-side debouncing/cooldown after submission
  2. Implement Supabase RLS policies to rate-limit inserts
  3. Consider adding a CAPTCHA (e.g., Cloudflare Turnstile, hCaptcha)

---

### VULN-006: Supabase Session Persistence in localStorage (Low)

- **Location**: `lib/supabase.ts:6-10`
- **Confidence**: MEDIUM (no auth features currently active)
- **Issue**: Supabase client is configured with `persistSession: true`, which stores session tokens in localStorage. localStorage is accessible to any JavaScript on the page.
- **Impact**: If an XSS vulnerability is ever introduced, session tokens could be stolen. Currently low risk since no user authentication is implemented.
- **Fix**: If authentication is added in the future, consider using `httpOnly` cookies via Supabase SSR helpers instead of localStorage.

---

### VULN-007: Missing Additional Security Headers (Low)

- **Location**: `out/_headers`
- **Confidence**: HIGH
- **Issue**: Several recommended security headers are not set:
  - `Permissions-Policy` (restrict browser features like camera, geolocation)
  - `Referrer-Policy` (control referrer information)
  - `X-Content-Type-Options: nosniff` (prevent MIME sniffing)
- **Impact**: Reduced defense-in-depth. These are low-risk for a static site but recommended for production.
- **Fix**: Add to `_headers` or hosting platform configuration:
  ```
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  ```

---

### VULN-008: No Input Validation on Quote Form Fields (Low)

- **Location**: `components/QuoteModal.tsx`
- **Confidence**: MEDIUM
- **Issue**: Form fields rely only on HTML5 validation attributes (`type="email"`, `required`). No server-side or programmatic validation of email format, phone format, or field length limits.
- **Impact**: Malformed or oversized data could be stored in the database. Low risk since data is only used internally.
- **Fix**: Add Zod or similar runtime validation before Supabase insert.

---

## Safe Patterns Verified (No Issues Found)

| Category | Status | Details |
|----------|--------|---------|
| **XSS via dangerouslySetInnerHTML** | SAFE | 10 instances — all use `JSON.stringify()` on static server-defined schema objects. No user input. |
| **innerHTML / outerHTML / document.write** | SAFE | No usage found anywhere in the codebase. |
| **eval / new Function / code execution** | SAFE | No usage found. |
| **setTimeout/setInterval with strings** | SAFE | All use function references, not string arguments. |
| **SQL Injection** | SAFE | No raw SQL. Supabase SDK uses parameterized queries. |
| **Command Injection** | SAFE | No `child_process`, `exec`, `spawn` usage. |
| **SSRF** | SAFE | No user-controlled URLs in fetch/HTTP calls. Static export. |
| **Path Traversal** | SAFE | No file system operations with user input. |
| **Prototype Pollution** | SAFE | No `Object.assign` / `_.merge` with user-controlled objects. |
| **NoSQL Injection** | N/A | Not using NoSQL databases. |
| **API Routes** | N/A | No API routes exist (static export). |
| **Hardcoded Secrets in Source** | SAFE | No API keys, passwords, or private keys in `.ts`/`.tsx` source files. |
| **Dynamic href/src with user input** | SAFE | All links use static paths or hardcoded URLs. |
| **React JSX Auto-escaping** | SAFE | All dynamic content rendered via JSX interpolation `{variable}`. |

---

## Architecture Security Strengths

1. **Static Export** (`output: "export"`) — No server at runtime means no SSRF, no server-side injection, no request handling vulnerabilities
2. **Supabase Backend** — Database operations are abstracted behind SDK with parameterized queries
3. **React Auto-escaping** — JSX automatically escapes interpolated values
4. **TypeScript** — Type safety catches many classes of bugs at compile time
5. **No API Routes** — Zero server-side attack surface in the Next.js layer
6. **Modern Dependencies** — React 19, Next.js 15.3, latest Supabase SDK

---

## Recommended Actions (Priority Order)

| Priority | Action | Effort |
|----------|--------|--------|
| 1 | Rotate Supabase anon key + verify RLS policies | 15 min |
| 2 | Run `npm audit fix` | 1 min |
| 3 | Add `out/` to `.gitignore` and remove from tracking | 5 min |
| 4 | Clean `.env.local` from git history | 10 min |
| 5 | Implement comprehensive CSP headers | 30 min |
| 6 | Add rate limiting / CAPTCHA to quote form | 1-2 hrs |
| 7 | Add additional security headers | 15 min |
| 8 | Add runtime form validation (Zod) | 30 min |

---

## Files Analyzed

All source files in `app/`, `components/`, `lib/`, `hooks/`, plus configuration files (`next.config.ts`, `tailwind.config.ts`, `package.json`, `.gitignore`, `_headers`, `robots.txt`). Build output in `out/` was also examined for credential exposure.
