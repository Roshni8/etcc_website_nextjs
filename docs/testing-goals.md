# Testing Goals -- ETCC India Website

This document explains **what we test, why we test it, and what success looks like** for every review category. It is written for anyone on the team -- you do not need to be a developer to understand it.

Each category answers four questions:

1. **What is this?** -- A simple explanation of the concept.
2. **Why does it matter?** -- The real-world impact on ranking, speed, users, or revenue.
3. **What are we checking for?** -- High-level goals, not code-level details.
4. **What does "good" look like?** -- The target state we want to reach.

---

## 1. Design System Compliance

### What is this?

A design system is a set of rules that define how the website looks: which colors to use, how much space goes between elements, which fonts at which sizes, how buttons and cards are styled. Think of it as a brand guideline, but for code.

When every page follows the same rules, the site feels professional and cohesive. When pages don't, visitors notice -- even if they can't explain what feels off.

### Why does it matter?

- **Brand trust.** Inconsistent design makes a company look careless. Consistent design signals quality -- which matters when your customers are defence organisations and industrial OEMs.
- **Development speed.** When a developer needs to build a new page, they should open the standards doc and know exactly what padding, color, and font size to use. No guessing, no "let me copy from that other page and hope it matches."
- **Maintenance cost.** If the brand blue is hardcoded in 50 different files, changing it means editing 50 files. If it is defined once as a token, you change it in one place and the entire site updates.

### What are we checking for?

- Every page uses the same container width and side padding.
- Colors come from design tokens (named variables), not raw color codes scattered through the code.
- Headings follow a consistent size hierarchy (h1 is always bigger than h2, h2 is always bigger than h3).
- Spacing between elements follows the documented scale (e.g., 16px between a heading and its description, 56px between a section title and its content).
- Cards, buttons, and other UI components look the same on every page.

### What does "good" look like?

A new developer joins the project, opens `docs/design-standards.md`, builds a new product page, and it looks like it belongs -- without needing to ask anyone what spacing or colors to use. If the brand blue changes, it is updated in one file and propagates everywhere.

---

## 2. Performance and Speed

### What is this?

Performance is how fast the site loads and how quickly it responds when someone interacts with it. Google measures this with three specific metrics called Core Web Vitals:

- **LCP (Largest Contentful Paint):** How quickly the main content of the page appears. For ETCC, this is usually the hero section or the first product image.
- **CLS (Cumulative Layout Shift):** Whether elements jump around while the page loads. If a heading moves down because an image loads above it, that is a layout shift. It frustrates users.
- **INP (Interaction to Next Paint):** When someone clicks a button or taps a menu, how long before the screen responds. Anything over 200ms feels sluggish.

### Why does it matter?

- **Google ranking.** Core Web Vitals are a direct ranking factor. A slow site loses positions to a fast competitor.
- **User experience.** 53% of mobile visitors leave a site that takes more than 3 seconds to load. Every second of delay costs potential enquiries.
- **Conversion.** A visitor who sees the page load instantly is more likely to explore products and submit a quote request.

### What are we checking for?

- Pages load in under 2 seconds on a 4G mobile connection.
- No layout shifts while the page loads -- images have explicit dimensions, fonts don't cause text reflow.
- The most important content (hero text, product images) appears first, not blocked by scripts or animations.
- Heavy components (modals, animations, carousels) are loaded only when needed, not upfront.
- Images are appropriately sized -- not loading a 4MB photo when a 200KB version would look identical on screen.

### What does "good" look like?

Run a Lighthouse audit: Performance score above 90. LCP under 2.5 seconds, CLS under 0.1, INP under 200ms. The page feels instant on a mid-range phone.

---

## 3. SEO and Content Quality

### What is this?

SEO (Search Engine Optimization) is how we make the site visible to people searching for products like ours on Google, Bing, and AI-powered search tools like ChatGPT and Perplexity.

It has two parts:

- **Technical SEO:** Telling search engines what each page is about using metadata, structured data (JSON-LD), sitemaps, and proper HTML structure.
- **Content quality:** Making sure the actual text on the page is genuinely useful to someone researching these products. Google evaluates content on E-E-A-T: Experience, Expertise, Authoritativeness, and Trustworthiness.

### Why does it matter?

- **Visibility.** If someone searches "toroidal transformer manufacturer India" or "wire wound servo potentiometer supplier Pune", ETCC should appear in the top 10 results. Currently, most potential customers find manufacturers through search.
- **AI citations.** Increasingly, people ask ChatGPT or Perplexity for recommendations. Structured data and well-written content make it more likely that AI tools cite ETCC by name.
- **Trust signals.** Mentioning specific defence programmes (Su-30MKI, Tejas LCA), certifications, founding year, and technical specifications builds authority. Generic marketing copy does not.

### What are we checking for?

- Every page has a unique, descriptive title and meta description.
- Structured data (JSON-LD) correctly describes the organisation, products, breadcrumbs, and local business details.
- Content includes specific technical details -- VA ratings, accuracy classes, temperature ranges, material types -- not just marketing buzzwords.
- The site has a sitemap listing all pages, a robots.txt allowing search engines, and an llms.txt for AI crawlers.
- Canonical URLs are set so search engines do not index duplicate pages.
- Headings follow a logical hierarchy (one h1 per page, h2s for sections, h3s for sub-sections).

### What does "good" look like?

Search "toroidal transformer manufacturer India" and ETCC appears on the first page. Ask ChatGPT "who manufactures wire wound potentiometers in Pune" and it mentions ETCC with correct details. Every page has valid structured data (test with Google's Rich Results Test tool).

---

## 4. Architecture and Code Structure

### What is this?

Architecture is how the code is organised -- which pieces are responsible for what, how data flows between them, and where the boundaries are between server-side and client-side code.

In Next.js (the framework this site uses), there is an important distinction:

- **Server Components** run during the build process. Their code never reaches the visitor's browser. They are great for static content, SEO metadata, and fetching data.
- **Client Components** run in the visitor's browser. They handle interactive features: clicks, animations, form inputs, state changes. They add to the JavaScript bundle the visitor downloads.

The goal is to keep as much as possible on the server side (smaller downloads, faster loads) and only use client components where interactivity is genuinely needed.

### Why does it matter?

- **Bundle size.** Every Client Component adds JavaScript that the visitor's browser must download and execute. Unnecessary client code slows the site.
- **Maintainability.** When components have clear, single responsibilities, bugs are easier to find and fixes don't break unrelated features.
- **Scalability.** As the site grows (new product pages, blog posts, landing pages), good architecture means new pages are easy to add without reworking existing code.

### What are we checking for?

- Components follow the single responsibility principle: a product card displays a product, a quote modal handles the quote form, a header handles navigation.
- The `"use client"` directive is only added to components that genuinely need browser APIs (useState, useEffect, onClick, animations).
- Data (product specs, client lists, programme names) is separated from presentation (the JSX that renders it).
- No prop drilling through many layers -- if data needs to reach deep components, appropriate patterns (context, composition) are used.

### What does "good" look like?

You can read a component file and understand what it does in 30 seconds. Adding a new product page means duplicating a template and changing the data, not rewriting layout logic. The JavaScript bundle sent to browsers is as small as possible.

---

## 5. Accessibility

### What is this?

Accessibility (often abbreviated a11y) means the site works for everyone, including people who:

- Use screen readers (software that reads the page aloud for blind or low-vision users).
- Navigate with a keyboard only (no mouse).
- Have low vision and need high-contrast text.
- Have motor impairments that make precise clicking difficult.

### Why does it matter?

- **Legal compliance.** Many countries and industries require digital accessibility. Government and defence clients (DRDO, BHEL, HAL) often have procurement guidelines that include accessibility.
- **SEO benefit.** Accessible sites tend to rank better because they use semantic HTML, proper headings, and descriptive alt text -- all things search engines value.
- **User base.** Approximately 15% of the world's population has some form of disability. An inaccessible site turns away potential customers.

### What are we checking for?

- Every meaningful image has descriptive alt text. Decorative images are marked as such (empty alt or aria-hidden).
- All interactive elements (buttons, links, menus, modals) can be operated with a keyboard alone.
- Text has sufficient contrast against its background (minimum 4.5:1 ratio for normal text).
- Focus is managed correctly: when a modal opens, focus moves to it; when it closes, focus returns to the trigger.
- The page has proper heading hierarchy (no skipping from h1 to h4).

### What does "good" look like?

Navigate the entire site using only the Tab key and Enter. Every button is reachable, every dropdown opens, the quote modal works, and you always know where you are on the page. Run an accessibility audit (Lighthouse or axe) and score above 90.

---

## 6. Security

### What is this?

Security means protecting the site and its visitors from common web attacks. Even a static marketing site can be vulnerable if it loads third-party scripts, embeds iframes, or accepts form input.

Key protections include:

- **HTTPS and HSTS:** Ensuring all traffic is encrypted and browsers always use the secure version.
- **Content Security Policy (CSP):** Telling browsers which scripts, styles, and iframes are allowed to run on the page.
- **X-Frame-Options:** Preventing other sites from embedding your site in a frame (clickjacking protection).
- **Sanitized inputs:** Making sure form data (like the quote request form) cannot inject malicious code.

### Why does it matter?

- **Visitor safety.** If the site is compromised, visitors could be redirected to malicious pages or have their data intercepted.
- **Trust.** Defence and government clients assess supplier websites for basic security hygiene. Missing security headers is a red flag.
- **SEO.** Google flags insecure sites and may reduce their ranking.

### What are we checking for?

- Security headers are set: HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy, CSP.
- No sensitive information (API keys, internal URLs, email credentials) is exposed in client-side JavaScript.
- The Google Maps iframe is loaded with appropriate CSP frame-src rules.
- Any use of `dangerouslySetInnerHTML` (raw HTML injection in React) is reviewed for XSS risk.

### What does "good" look like?

Run a security header check (securityheaders.com) and score A or above. No sensitive data visible in the browser's developer tools. The CSP policy is specific enough to block unexpected scripts but permissive enough to allow Google Maps and fonts.

---

## 7. Error Handling

### What is this?

Error handling is what happens when something goes wrong -- a page doesn't exist, an image fails to load, a component crashes, or the network drops. Instead of showing a blank screen or a cryptic error message, the site should show something helpful and let the visitor continue browsing.

Next.js provides three levels of error handling:

- **not-found.tsx:** Shown when someone visits a URL that doesn't exist (404 page).
- **error.tsx:** Catches errors within a specific page or section and shows a recovery option.
- **global-error.tsx:** The last-resort fallback if the entire application crashes.

### Why does it matter?

- **User retention.** A visitor who hits a broken page leaves. A visitor who sees "This page doesn't exist -- here are our products" might stay and convert.
- **SEO.** Proper 404 responses tell search engines to remove dead links from their index. Broken pages that return 200 status codes create confusion.
- **Professionalism.** A well-designed error page reinforces brand quality. A raw error stack trace says "this company doesn't care about details."

### What are we checking for?

- A styled 404 page exists with navigation back to useful content (homepage, product pages).
- Page-level error boundaries catch component crashes and offer a "try again" option.
- The global error fallback renders something readable even if CSS fails to load.
- Images that fail to load do not leave blank holes in the layout.
- Loading states are shown while async content (carousels, animations) initialises.

### What does "good" look like?

Visit `/this-page-does-not-exist` and see a branded 404 page with links to products. Simulate a component error and see a clean "Something went wrong" message with a retry button. No blank screens or browser-default error pages anywhere on the site.

---

## 8. Maintainability

### What is this?

Maintainability is how easy it is to understand, modify, and extend the codebase six months from now -- whether by you, a new developer, or an AI coding assistant.

It covers:

- **Readability:** Can someone new understand what a file does without extensive context?
- **Organisation:** Are files in logical locations? Is related code grouped together?
- **DRY (Don't Repeat Yourself):** Is the same information defined in one place, or duplicated across files?
- **No dead code:** Are there unused files, imports, or components cluttering the codebase?

### Why does it matter?

- **Speed of changes.** When a client asks for a new product page or a content update, it should take minutes, not hours.
- **Bug prevention.** Duplicated code means bugs get fixed in one copy but not the others. Single-source-of-truth data prevents this.
- **Onboarding.** If you bring on a developer or use AI tools, a clean codebase means they can be productive immediately instead of spending days understanding the structure.
- **Cost.** Messy code compounds over time. Every shortcut today becomes a tax on every future change.

### What are we checking for?

- No magic numbers or hardcoded strings -- configuration values (company name, phone numbers, addresses) live in one place.
- Product data (specs, features, application descriptions) is separated from the JSX templates that render it.
- Files follow a consistent naming convention and are located where you would expect them.
- No unused components, imports, or dependencies in the codebase.
- TypeScript types are defined so the compiler catches errors before they reach production.

### What does "good" look like?

To add a new product page: copy a template, update a data file with specs and descriptions, and the page is ready. To update the company phone number: change it in one config file. To remove a feature: delete one component and its import, nothing else breaks.

---

## How These Categories Work Together

These eight categories are not independent -- they reinforce each other:

- A strong **design system** makes **maintainability** easier (consistent tokens, not scattered values).
- Good **architecture** improves **performance** (server components reduce bundle size) and **SEO** (metadata lives in server components).
- **Accessibility** directly helps **SEO** (semantic HTML, heading hierarchy, alt text).
- **Error handling** supports **performance** (graceful fallbacks prevent full-page crashes) and **user experience** (visitors stay on the site).
- **Security** headers are a **trust signal** that supports the overall brand quality that **design system compliance** establishes visually.

The goal is not perfection in any single category, but a strong baseline across all eight. A site that scores 8/10 in every category will outperform one that scores 10/10 in two categories and 4/10 in the rest.

---

## Review Severity Levels

When Cursor reviews code, each finding is tagged with a severity:

| Level | Meaning | Action Required |
|-------|---------|-----------------|
| **CRITICAL** | Broken functionality, security vulnerability, or SEO regression | Must fix before merging |
| **WARNING** | Performance issue, accessibility gap, or best-practice violation | Should fix -- impacts quality |
| **SUGGESTION** | Code style improvement, minor optimisation, or architectural refinement | Nice to have -- improves long-term health |

---

## What Happens Next

1. **Design Standards Doc** (`docs/design-standards.md`) -- The specific values for every spacing, color, and typography decision.
2. **Component Library Doc** (`docs/components.md`) -- Catalog of every UI component with usage rules.
3. **Cursor Review Rule** (`.cursor/rules/technical-review.mdc`) -- Automated checklist that Cursor applies on every review.
4. **Review Reports** (`.reviews/`) -- Where review findings are saved after each dev -> test cycle.
