# Design Standards -- ETCC India Website

This is the single source of truth for all visual and structural decisions. If you are building a new page, modifying an existing one, or reviewing code, this document tells you exactly what values to use.

**Rule: If a value is not in this document, do not invent one. Ask first, then add it here.**

---

## Table of Contents

1. [Container and Page Layout](#1-container-and-page-layout)
2. [Spacing System](#2-spacing-system)
3. [Typography](#3-typography)
4. [Colors](#4-colors)
5. [Images](#5-images)
6. [Cards](#6-cards)
7. [Buttons](#7-buttons)
8. [Icons](#8-icons)
9. [Borders and Dividers](#9-borders-and-dividers)
10. [Shadows](#10-shadows)
11. [Motion and Animation](#11-motion-and-animation)
12. [Responsive Breakpoints](#12-responsive-breakpoints)
13. [Dark Mode](#13-dark-mode)

---

## 1. Container and Page Layout

Every page uses one container system. No exceptions.

### The Container

```
mx-auto max-w-6xl px-6
```

- **Max content width:** 1152px (`max-w-6xl`)
- **Side padding:** 24px (`px-6`) on all screen sizes
- **Centering:** `mx-auto`

Use this on every section's inner wrapper. The container constrains the content; the section itself can be full-width for background colors or borders.

### Full-Width Exceptions

Some elements intentionally break out of the container for edge-to-edge effects:

- Product carousels (horizontal scroll needs full viewport width)
- Marquee/logo rows (continuous scroll effect)
- Hero background images (full-bleed behind the container)

For these, the outer `<section>` is full-width and the inner content still uses the container for text alignment.

### Page Shell

Every page is wrapped in the `Layout` component, which provides:

```
<Header />        -- sticky, z-50
<main class="flex-1">
  {children}      -- page content
</main>
<Footer />
```

### Section Pattern

A standard content section:

```html
<section class="py-20 md:py-32">          <!-- full-width, vertical padding -->
  <div class="mx-auto max-w-6xl px-6">    <!-- container -->
    <!-- content here -->
  </div>
</section>
```

An alternating-background section (for visual rhythm):

```html
<section class="border-t border-border bg-secondary">
  <div class="mx-auto max-w-6xl px-6 py-20 md:py-32">
    <!-- content here -->
  </div>
</section>
```

---

## 2. Spacing System

All spacing uses Tailwind's default scale. **Only use values from the table below** — do not invent custom pixel values.

### Spacing Scale (the full list we use)

| Name | Tailwind Class | Pixels | When to Use |
|------|---------------|--------|-------------|
| **2xs** | `p-0.5` / `gap-0.5` | 2px | Badge vertical padding |
| **xs** | `p-1` / `gap-1` | 4px | Tight gaps (card title → description) |
| **sm** | `p-2` / `gap-2` | 8px | Icon ↔ text gap, inline spacing, footer links |
| **md** | `p-3` / `gap-3` | 12px | Eyebrow → heading, badge ↔ label |
| **base** | `p-4` / `gap-4` | 16px | Card padding, heading → description, carousel gaps |
| **lg** | `p-5` / `gap-5` | 20px | Rich card padding, application grid gaps |
| **xl** | `p-6` / `gap-6` | 24px | Page side padding (`px-6`), hero h1 → subtitle |
| **2xl** | `p-8` / `gap-8` | 32px | CTA padding, title block → content (tight) |
| **3xl** | `p-10` / `gap-10` | 40px | Footer columns, two-column gaps |
| **4xl** | `p-14` / `gap-14` | 56px | Title block → content below, stat number gaps |
| **5xl** | `p-16` | 64px | Section padding (mobile), footer desktop |
| **6xl** | `p-20` | 80px | Section padding (mobile standard) |
| **7xl** | `p-32` | 128px | Section padding (desktop standard) |

### Between Sections (vertical rhythm)

| Context | Classes | Value (mobile / desktop) |
|---------|---------|--------------------------|
| Standard content section | `py-20 md:py-32` | 80px / 128px |
| Product page section | `py-16 md:py-20` | 64px / 80px |
| Footer | `py-12 md:py-16` | 48px / 64px |
| Section with top border | Add `border-t border-border` | 1px separator |

### Section Title Block

The title block is the heading + optional eyebrow + subtitle at the top of a section.

| Element | Classes | Value |
|---------|---------|-------|
| Eyebrow label above heading | (on the eyebrow) `mb-0`, (on the heading) `mt-3` | 12px gap |
| Heading to subtitle | `mt-4` | 16px |
| Hero h1 to subtitle | `mt-6` | 24px (larger because the h1 is larger) |
| Title block to section content | `mt-14` | 56px |
| Title block to content (tight) | `mt-8` | 32px (when no subtitle) |

### Within Cards

| Element | Classes | Value |
|---------|---------|-------|
| Card internal padding (standard) | `p-4` | 16px |
| Card internal padding (rich/large) | `p-5` | 20px |
| Card title to description | `mt-1` | 4px |
| Card image to text area | `p-0` on image, `p-4` on text | Image is flush, text has padding |

### Grids and Gaps

| Context | Classes | Value |
|---------|---------|-------|
| Carousel cards | `gap-4` | 16px |
| Application card grid | `gap-5` | 20px |
| Two-column layout (image + text) | `gap-10 lg:gap-16` | 40px / 64px |
| Footer column grid | `gap-10` | 40px |
| Stats/number row | `gap-8 md:gap-14` | 32px / 56px |
| Marquee rows | `mb-4` | 16px between rows |
| Footer link items | `gap-2` | 8px |

### Inline Elements

| Context | Classes | Value |
|---------|---------|-------|
| Icon + text (inline, same line) | `gap-2` | 8px |
| Icon + text (badge with label) | `gap-3` | 12px |
| Badge/tag horizontal padding | `px-2.5` | 10px |
| Badge/tag vertical padding | `py-0.5` | 2px |
| CTA buttons side by side | `gap-4` | 16px |

### Dividers and Separators

| Context | Classes | Value |
|---------|---------|-------|
| Between major sections | `border-t border-border` | 1px top |
| Header/nav separator (vertical) | `h-5 w-px bg-stone-200` | 20px tall, 1px wide |
| List item separator | `border-b border-border` | 1px bottom per row |
| Footer bottom bar | `mt-10 border-t border-stone-200 pt-6` | 40px above, 1px line, 24px below |

---

## 3. Typography

### Font Families

| Role | Font | CSS Variable | Tailwind Class |
|------|------|-------------|----------------|
| Body and UI | Inter | `var(--font-sans)` | default (no class needed) |
| Page titles (h1 only) | Cooper Lt BT | `var(--font-heading)` | `font-heading` |

Inter is loaded via `next/font/google` with `display: swap` (no layout shift). Cooper is a local font loaded via `@font-face` with Georgia as fallback.

### Font Size Scale (the full list we use)

| Name | Tailwind Class | Pixels | Line Height | When to Use |
|------|---------------|--------|-------------|-------------|
| **2xs** | `text-[10px]` | 10px | 1.4 | Tiny labels, category tags |
| **xs** | `text-[11px]` | 11px | 1.4 | Captions, client product names |
| **sm** | `text-xs` | 12px | 1.5 | Tags, badges, small meta text |
| **base-sm** | `text-sm` | 14px | 1.5 | Nav links, footer text, form labels |
| **base** | `text-base` | 16px | 1.5 | Body text (default everywhere) |
| **lg** | `text-lg` | 18px | 1.75 | Subtitles, intro paragraphs |
| **xl** | `text-xl` | 20px | 1.75 | Large subtitles |
| **2xl** | `text-2xl` | 24px | 1.33 | — |
| **3xl** | `text-3xl` | 30px | 1.33 | Stats numbers (mobile) |
| **4xl** | `text-4xl` | 36px | 1.2 | Section h2 (mobile) |
| **5xl** | `text-5xl` | 48px | 1.1 | Hero h1 (mobile) |
| **6xl** | `text-6xl` | 60px | 1.1 | — |
| **7xl** | `text-7xl` | 72px | 1.1 | Hero h1 (desktop) |

### Heading Scale

| Level | Font | Weight | Size | Tailwind Classes | Use When |
|-------|------|--------|------|-----------------|----------|
| Hero h1 | Inter | 700 | 3rem / 4.5rem | `text-5xl md:text-7xl font-bold tracking-tighter` | Homepage hero only |
| Page h1 | Cooper | 600 | clamp(2rem, 4vw, 3rem) | `font-heading` (size from globals.css) | Product pages, About Us |
| Section h2 | Inter | 700 | 2.25rem / 3rem | `text-4xl md:text-5xl font-bold tracking-tighter` | Major section headings |
| Sub-section h2 | Inter | 600 | clamp(1.75rem, 3vw, 2.25rem) | (default from globals.css) | Product page content sections |
| Card title h3 | Inter | 600 | 1rem | `text-base font-semibold` | Card headings, list items |
| Small heading h4 | Inter | 600 | 0.875rem | `text-sm font-semibold` | Footer columns, sidebar labels |

### Body Text

| Role | Weight | Size | Tailwind Classes |
|------|--------|------|-----------------|
| Body (default) | 400 | 1rem (16px) | default |
| Body emphasis | 500 | 1rem | `font-medium` |
| Body strong | 600 | 1rem | `font-semibold` |
| Subtitle / intro | 400 | 1.125rem | `text-lg text-muted-foreground` |
| Large subtitle | 400 | 1.25rem | `text-xl text-muted-foreground` |
| Small text | 400 | 0.875rem | `text-sm` |
| Caption / label | 600 | 0.6875rem | `text-[11px] font-semibold uppercase tracking-wider` |
| Tag / badge text | 500 | 0.75rem | `text-xs font-medium` |
| Tiny label | 500 | 0.625rem | `text-[10px] font-medium` |

### Heading Rules

1. Every page has exactly **one h1**. On the homepage it is the hero headline. On product pages it is the product name.
2. **h2** is used for major sections within a page ("Our Products", "Applications", "Custom Engineering").
3. **h3** is used for items within a section (individual product cards, application cards).
4. **Never skip levels.** Do not go from h1 to h3. If a section has an h2, its sub-items use h3.
5. **Eyebrow labels** above headings are `<p>` tags, not heading tags. They are decorative, not structural.

---

## 4. Colors

### Rule: Always Use Semantic Tokens

Never use raw color values in components. No `text-stone-500`, no `#1a365d`, no `rgba(0,0,0,0.08)` inline. Always use the semantic token that describes the **purpose**, not the **appearance**.

### Color Palette at a Glance

These are the actual colors behind each token. The "≈ Tailwind" column tells you the closest standard Tailwind color so you can visualize it without opening a browser.

**Brand Blues (custom ETCC colors):**

| Token | Tailwind Class | ≈ Tailwind Color | What It Looks Like |
|-------|---------------|-------------------|-------------------|
| Brand blue | `bg-primary` / `text-primary` | **blue-700** | Main ETCC blue — buttons, links, active states |
| Brand blue light | `bg-etcc-primary-light` | **blue-500** | Lighter blue — accents, tints, selected states |
| Brand blue dark | `bg-etcc-primary-dark` | **blue-900** | Dark blue — hover states, emphasis |

**Neutrals (warm stone palette):**

| Token | Tailwind Class | ≈ Tailwind Color | What It Looks Like |
|-------|---------------|-------------------|-------------------|
| Page background | `bg-background` | **stone-50** | Very light warm gray — page body |
| Primary text | `text-foreground` | **stone-900** | Near-black — headings, nav, important text |
| Secondary text | `text-muted-foreground` | **stone-500** | Mid-gray — descriptions, subtitles |
| White surface | `bg-card` | **white** | Pure white — cards, dropdowns, modals |
| Alternate bg | `bg-secondary` | **stone-100** | Slightly darker gray — zebra sections |
| Borders | `border-border` | **stone-200** | Light gray — all borders and dividers |

**Semantic (purpose-based):**

| Token | Tailwind Class | ≈ Tailwind Color | Use When |
|-------|---------------|-------------------|----------|
| Primary | `bg-primary` / `text-primary` | **blue-700** | CTAs, links, active states |
| Primary text on blue | `text-primary-foreground` | **white** | Text on blue buttons |
| Destructive | `bg-destructive` / `text-destructive` | **red-500** | Error messages, delete actions |
| Accent | `bg-accent` | **blue-500** | Highlighted elements |
| Muted | `bg-muted` | **stone-100** | Subtle backgrounds |
| Focus ring | `ring-ring` | **blue-700** | Focus indicators |

**Dark Mode (auto-applied when `<html class="dark">`):**

In dark mode, colors flip — backgrounds go dark, text goes light, brand blue gets lighter for readability.

| Token | Light ≈ | Dark ≈ |
|-------|---------|--------|
| background | stone-50 | stone-900 |
| foreground | stone-900 | stone-50 |
| card | white | stone-850 |
| muted-foreground | stone-500 | stone-400 |
| border | stone-200 | stone-700 |
| primary | blue-700 | blue-500 |

### Where Raw Colors Are Acceptable

- **SVG illustrations** (like the India flag in the footer) — self-contained graphics, not UI tokens.
- **Client brand colors** in the customers section — each client has a unique brand color. These are data, not design tokens.
- **Third-party embeds** (Google Maps iframe) — we do not control their styling.

Everything else must use semantic tokens.

---

## 5. Images

### File Format and Size Rules

| Rule | Detail |
|------|--------|
| **Maximum file size** | 200KB for any image displayed on screen. Current product photos are 4-7MB -- these MUST be compressed before production. |
| **Preferred format** | WebP for photographs (80-90% smaller than JPEG at same quality). JPEG as fallback. |
| **SVG** | For logos, icons, and illustrations. SVGs scale perfectly and are tiny. |
| **PNG** | Only for images that require transparency and are not suitable as SVG. |
| **No uncompressed originals** | Never commit a 5MB photo to the repo. Compress first, then commit. |

**Current state warning:** The repo has 61 JPGs, many at 4-7MB each. The largest is `toroidal-single.jpg` at 7.0MB. These need to be compressed to under 200KB each (or replaced with WebP). This is the single biggest performance problem on the site.

### Image Dimensions by Context

Always set `width` and `height` attributes on `<img>` tags. This prevents layout shift (CLS).

| Context | Width | Height | Object Fit | Notes |
|---------|-------|--------|-----------|-------|
| Hero background | 1920 | 600 | `object-cover` | Full-bleed behind content |
| Product showcase (large) | 800 | 420 | `object-contain` | Main product image in content |
| Product showcase (medium) | 600 | 360 | `object-contain` | Secondary product images |
| Application card image | 400 | 192 | `object-cover` | Thumbnails in grid cards |
| Carousel product card | 300 | 195 | `object-cover` | Homepage carousel |
| Client logo | 56 | 56 | `object-contain` | Customer section avatars |
| Header logo | 154 | 44 | implicit | SVG, height-constrained |
| Footer logo | 196 | 56 | implicit | SVG, height-constrained |
| About page gallery | -- | 192 (h-48) | `object-cover` | Exhibition photos |

### Loading Strategy

| Position on Page | `loading` Attribute | `fetchPriority` | Why |
|-----------------|--------------------|--------------------|-----|
| Hero/above the fold | omit (defaults to eager) | `"high"` | This is what the user sees first. Load it immediately. |
| Below the fold | `"lazy"` | omit | Don't load until the user scrolls near it. Saves bandwidth. |
| Background/decorative | `"lazy"` | omit | Not critical content. |

### Alt Text Rules

| Image Type | Alt Text | Example |
|-----------|----------|---------|
| Product photo | Describe what the product is and key visual detail | `"Range of current transformers -- window, wound, and toroidal types"` |
| Decorative background | Empty alt + aria-hidden | `alt="" aria-hidden="true"` |
| Company logo | Company name + "Logo" | `"ETCC Logo"` |
| Person/team photo | Describe who and context | `"ETCC founder at exhibition booth"` |
| Client logo | Client company name | `"HAL"` or `"Tata Motors"` |
| Icon (used as decoration) | Empty alt or aria-hidden | `alt=""` |
| Icon (conveys meaning) | Describe the meaning | `"Email"`, `"Phone"` |

### Image Checklist (for every `<img>` tag)

- [ ] `width` and `height` attributes set (prevents CLS)
- [ ] `alt` text is descriptive (or empty + aria-hidden for decorative)
- [ ] `loading="lazy"` for below-fold images
- [ ] File size under 200KB
- [ ] Format is WebP (photos) or SVG (logos/icons)
- [ ] `object-fit` is appropriate (`cover` for fills, `contain` for product shots)

---

## 6. Cards

### Standard Product Card (carousel)

```
Width:      300px fixed
Image:      300 x 195px, object-cover, rounded-t-2xl
Padding:    p-4 (16px) on text area
Border:     border border-border
Radius:     rounded-2xl (16px)
Background: bg-card
Hover:      hover:shadow-lg
Title:      text-base font-semibold text-foreground
Subtitle:   mt-1 text-sm text-muted-foreground
```

### Application Card (product page grids)

```
Image:      full width, h-48 (192px), object-cover
Padding:    p-5 (20px) on text area
Border:     border border-border
Radius:     rounded-xl (12px)
Background: bg-card
Title:      text-base font-semibold text-foreground
Subtitle:   mt-1.5 text-sm text-muted-foreground
Tags:       rounded-full bg-background/90 px-2 py-0.5 text-xs
```

### Client Card (customer marquee)

```
Width:      192px (w-48)
Padding:    p-5 (20px), centered content
Border:     border border-border
Radius:     rounded-xl (12px)
Background: bg-card
Avatar:     h-14 w-14 rounded-xl
Name:       text-sm font-medium text-foreground
Product:    mt-0.5 text-[11px] text-muted-foreground
```

### Card Rules

1. All cards use `border border-border` -- never a heavier border or custom color.
2. Card backgrounds are always `bg-card` (white in light mode).
3. Card border radius is `rounded-xl` (12px) or `rounded-2xl` (16px) -- never `rounded-lg` or `rounded-md` for cards.
4. Hover effect is either `hover:shadow-lg` (elevation) or `hover:shadow-md` (subtle). Never both, never a color change on the card itself.
5. Images inside cards are flush to the top edge (no padding on the image area).

---

## 7. Buttons

### Primary CTA (hero, major actions)

```
Classes:    h-12 px-8 text-sm font-medium rounded-full
Background: bg-primary (or ShimmerButton component)
Text:       text-primary-foreground (white)
Hover:      bg-primary-dark
Icon:       ml-2 h-4 w-4 (trailing arrow)
```

### Secondary CTA (alongside primary)

```
Classes:    h-12 px-8 text-sm font-medium rounded-full
Background: bg-background
Border:     border border-border
Text:       text-foreground
Hover:      hover:bg-secondary
Icon:       ml-2 h-4 w-4 (trailing arrow)
```

### Header CTA (compact)

```
Classes:    px-4 py-1.5 text-sm font-medium rounded-full
Background: bg-stone-900 (dark pill)
Text:       text-white
Hover:      hover:bg-stone-800
```

### Navigation Link

```
Classes:    px-3 py-1.5 text-sm font-medium rounded-md
Text:       text-muted-foreground
Hover:      hover:text-foreground
Active:     text-foreground
```

### Button Rules

1. CTAs are always `rounded-full` (pill shape). Never `rounded-md` or `rounded-lg` for buttons.
2. Primary and secondary CTAs have the same height (`h-12`) so they align when side by side.
3. If a button has a trailing icon, use `ml-2 h-4 w-4`.
4. Interactive feedback: `active:scale-[0.97]` for a subtle press effect. Transition: `150ms ease`.

---

## 8. Icons

All icons come from the `lucide-react` library.

### Icon Sizes

| Context | Size | Classes |
|---------|------|---------|
| Inline with body text | 16px | `h-4 w-4` |
| In a button (trailing) | 16px | `h-4 w-4 ml-2` |
| Navigation chevron | 14px | `h-3.5 w-3.5` |
| Standalone (contact, features) | 20px | `h-5 w-5` |
| Large feature icon | 24px | `h-6 w-6` |

### Icon Colors

- Icons next to text inherit the text color, or use `text-muted-foreground` for secondary.
- Icons inside colored badges use the badge text color.
- Never use a raw color on an icon. Use `text-primary`, `text-foreground`, or `text-muted-foreground`.

### Icon + Text Alignment

- Icon and text on the same line: `flex items-center gap-2`.
- Icon at the top of a text block (like an address): `flex items-start gap-2` with `mt-0.5` on the icon to optically align with the first line of text.
- Stacked (icon above text): `flex flex-col items-center gap-3`.

---

## 9. Borders and Dividers

### Standard Border

```
border border-border
```

One pixel, uses the `--border` token. Used on cards, inputs, section separators.

### Section Separator

```
border-t border-border
```

Horizontal line between major page sections.

### Divider Inside Lists

```
border-b border-border
```

Between list/table rows. The first item optionally gets `first:border-t`.

### Vertical Separator

```
h-5 w-px bg-border
```

Used in the header between nav links and the CTA button.

### Border Rules

1. Always use `border-border` for the color. Never `border-stone-200` or `border-gray-300`.
2. Borders are always 1px (the default). Never use `border-2` or thicker.
3. For focus states, use `ring` utilities: `focus-visible:ring-2 ring-ring ring-offset-2`.

---

## 10. Shadows

Defined as CSS custom properties and mapped to Tailwind classes.

| Token | Tailwind Class | Use When |
|-------|---------------|----------|
| `--shadow-sm` | `shadow-card` | Default card elevation |
| `--shadow-md` | `shadow-card-hover` | Card hover state |
| `--shadow-lg` | `shadow-lg` | Dropdowns, popovers |
| `--shadow-xl` | `shadow-xl` | Modals, hero elements |

### Shadow Rules

1. Cards at rest: `shadow-card` or no shadow (border only).
2. Cards on hover: `shadow-card-hover` or `shadow-lg`.
3. Dropdowns and floating elements: `shadow-lg`.
4. Modals: `shadow-xl`.
5. Never combine a shadow with a heavy border. Use one or the other for elevation.

---

## 11. Motion and Animation

### Transition Tokens

| Token | Duration | Use When |
|-------|----------|----------|
| `--transition-fast` | 150ms | Hover color changes, button press |
| `--transition-normal` | 200ms | Dropdown open/close, tooltip |
| `--transition-slow` | 300ms | Page-level transitions, modal |

Easing: `cubic-bezier(0.4, 0, 0.2, 1)` for all (Tailwind default ease).

### Entrance Animations

| Animation | Classes | Use When |
|-----------|---------|----------|
| Fade in + slide up | `animate-fade-in-up` | Section titles, hero content |
| Fade in | `animate-fade-in` | Stats, secondary elements |
| Staggered delay | `animation-delay-100` through `animation-delay-400` | Sequential reveal of related items |

### Interaction Animations

| Effect | Classes | Use When |
|--------|---------|----------|
| Hover scale on image | `transition-transform duration-500 group-hover:scale-105` | Card images |
| Button press | `active:scale-[0.97]` | All clickable buttons |
| Chevron rotation | `transition-transform duration-200 rotate-180` | Dropdown toggle |

### Animation Rules

1. Entrance animations play once (`forwards` fill mode). They trigger on scroll via `whileInView` (Framer Motion) or CSS `animate-fade-in-up`.
2. Never animate layout properties (width, height, top, left). Only animate `opacity` and `transform` for performance.
3. Respect `prefers-reduced-motion`. Heavy animations should be disabled for users who request it.
4. Auto-scrolling carousels pause on hover and resume after 5 seconds of inactivity.

---

## 12. Responsive Breakpoints

We use Tailwind's default breakpoints. Mobile-first: write the mobile style first, then add overrides.

| Breakpoint | Min Width | Prefix | What Changes |
|-----------|-----------|--------|-------------|
| Default | 0px | (none) | Mobile layout: single column, compact spacing |
| sm | 640px | `sm:` | Two-column grids start, footer wraps less |
| md | 768px | `md:` | Section padding increases, font sizes scale up |
| lg | 1024px | `lg:` | Full desktop layout: multi-column grids, mega-menu visible, mobile nav hidden |
| xl | 1280px | `xl:` | Rarely used -- content is already max-width capped |

### Responsive Rules

1. **Navigation:** Mobile hamburger below `lg:`. Full nav bar at `lg:` and above.
2. **Section padding:** `py-20 md:py-32` -- tighter on mobile, spacious on desktop.
3. **Grids:** Default to `grid-cols-1`, expand at `sm:grid-cols-2`, `lg:grid-cols-3` or `lg:grid-cols-4`.
4. **Font sizes:** Hero h1 scales from `text-5xl` to `md:text-7xl`. Section h2 scales from `text-4xl` to `md:text-5xl`. Body text does not scale.
5. **Container:** `max-w-6xl` does not change. The `px-6` padding is constant. Content simply reflows within the available width.

---

## 13. Dark Mode

Dark mode is implemented via the `.dark` class on `<html>`. All semantic tokens have dark mode overrides in `globals.css`.

### Current State

Dark mode tokens are defined but the site does not currently expose a toggle to users. The primary target is light mode.

### Rules for Dark Mode Compatibility

1. Always use semantic tokens (`text-foreground`, `bg-background`, `border-border`) -- they automatically switch in dark mode.
2. Never use `text-white` or `text-black` for content text. Use `text-foreground` and `text-card-foreground`.
3. Images with white backgrounds may look jarring in dark mode. Use `rounded-xl` and a subtle border to contain them.
4. Test any new component in both modes before shipping.

---

## Quick Reference Card

Copy this to your desk or pin it in your editor:

```
CONTAINER:    mx-auto max-w-6xl px-6
SECTION:      py-20 md:py-32
HEADING GAP:  mt-4 (to subtitle), mt-14 (to content)
CARD:         p-4, border border-border, rounded-2xl
GRID:         gap-5 (cards), gap-10 (two-col)
ICON + TEXT:  gap-2 (8px)
CTA HEIGHT:   h-12 px-8 rounded-full
FONT H1:     font-heading (Cooper) on product pages
FONT H2:     text-4xl md:text-5xl font-bold tracking-tighter
COLORS:       text-foreground, text-muted-foreground, bg-primary
IMAGES:       width + height always, loading="lazy" below fold, max 200KB
BORDERS:      border-border only, 1px only
```
