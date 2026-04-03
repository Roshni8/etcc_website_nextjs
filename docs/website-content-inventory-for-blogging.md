# ETCC India — Website content inventory for blog / Gemini context

**Generated from the Next.js codebase.** Use this as factual context when drafting blogs. Base URL: `https://etccindia.com`.

**Brand:** Efficient Toroidal Coil Corporation (ETCC India), Pune, established **1994**.

---

## Global defaults (root layout)

| Field | Value |
|--------|--------|
| **Default `<title>` (template fallback)** | Toroidal Transformers & Precision Potentiometers \| ETCC India |
| **Default meta description** | ETCC manufactures precision toroidal transformers, current transformers, and wire wound potentiometers since 1994. Pune, India. Request a quote. |
| **`lang`** | en-IN |
| **Open Graph `siteName`** | ETCC India — Efficient Toroidal Coil Corporation |
| **OG image** | https://etccindia.com/og-image.jpg (1200×630) |
| **Theme colour** | #1a6dbf |

---

## Sitemap vs routes

**In `app/sitemap.ts` today:** `/`, `/toroidal-transformers`, `/linear-potentiometer`, `/current-transformer`, `/wirewound-resistors`, `/about-us`.  
**Not in sitemap but implemented:** `/blog`, `/blog/[slug]`, `/potentiometer`, `/test`.

---

## Product pages overview (six distinct product URLs)

| # | Path | Purpose in codebase |
|---|------|---------------------|
| 1 | `/toroidal-transformers` | Main toroidal / custom transformer page |
| 2 | `/current-transformer` | Wound CTs + flexible Rogowski |
| 3 | `/linear-potentiometer` | Marketing-focused linear potentiometer page (newer layout) |
| 4 | `/potentiometer` | Long-form SEO linear motion potentiometer page (tables, keyword-rich copy) |
| 5 | `/wirewound-resistors` | Resistors + rheostats |
| 6 | `/test` | **Dev / alternate toroidal page** — largely same data as toroidal product page; weaker metadata (no canonical, plain export). Treat as non-production unless you deploy it. |

**Navigation (`Header`):** “Servo Potentiometers” links to `/linear-potentiometer` (same target as “Linear Potentiometers”). There is no separate `/servo-potentiometer` route.

**Home carousel copy** still mentions “Servo Potentiometers ±0.5% linearity, −55°C to +125°C” linking to `/linear-potentiometer` — the linear product pages currently emphasize wire-wound linear specs (−50 °C to +85 °C and linearity 1% or 0.25–0.5% ranges depending on section). Flag for editorial alignment.

---

## 1. Home (`/`)

### Metadata (`app/page.tsx`)

| Field | Value |
|--------|--------|
| **Title (absolute)** | Toroidal Transformers, Potentiometer & CT Manufacturer \| ETCC India |
| **Meta description** | ETCC India manufactures toroidal transformers (10VA–15kVA), current transformers, wire wound potentiometers & resistors. Defence-proven. Pune facility. |
| **Canonical** | https://etccindia.com/ |
| **Open Graph** | Same title/description/url as above |

### JSON-LD (on-page)

- **Organization** name: Efficient Toroidal Coil Corporation; alternateName: ETCC India; foundingDate: 1994; description mentions custom toroidal transformers, wire wound servo potentiometers, CTs, resistors/rheostats.
- **Address:** Unit No. 11, Electronic Sadan No.-1, MIDC, Bhosari, Pimpri-Chinchwad, Maharashtra 411026, India.
- **Contact:** +91-9822614244 (sales), +91-2030689099 (customer support), email efficient_toroidal@rediffmail.com; **Proprietor:** Rajan Naroor.
- **LocalBusiness** description: custom electronic component manufacturer; geo lat/long in schema.
- **WebSite** description: Manufacturer of toroidal transformers, current transformers, potentiometers, and wire wound resistors since 1994.
- **knowsAbout:** Toroidal Transformers, Wire Wound Potentiometers, Current Transformers, Wire Wound Resistors, Rheostats.

### Visible sections (`HomeClient` → section components)

**Hero (`HeroSection`)**

- Badge link to `/about-us`: “Trusted by Indian Defence & Automotive OEMs”
- **H1:** Precision Electromagnetic / Components
- **Subcopy:** Manufacturer of toroidal transformers, current transformers, servo potentiometers, wire wound resistors, and rheostats. Serving defence, industrial, medical, and automotive sectors since 1994.
- CTAs: Request a Quote; Explore Products → `/toroidal-transformers`
- **Stats:** 30+ Years, 500+ Clients, 5 Product Lines, 1994 Est.

**Products carousel (`ProductsSection`)**

- Section title: Our Products — “Engineered for precision. Built for reliability.”
- Cards (title — blurb — link):
  - Toroidal Transformers — 10VA–3000VA, 50Hz to 10kHz — `/toroidal-transformers`
  - Defence Transformers — 400Hz aviation-grade, Su-30MKI & Tejas LCA — `/toroidal-transformers`
  - Servo Potentiometers — ±0.5% linearity, −55°C to +125°C — `/linear-potentiometer`
  - Current Transformers — 50A–2000A, accuracy class 0.5 — `/current-transformer`
  - Wire Wound Resistors — 5W–200W, ceramic and aluminium housed — `/wirewound-resistors`
  - Rheostats — Rotary and slider types, 25W–500W — `/wirewound-resistors`

**Defence (`DefenceSection`)**

- Kicker: Defence & Aerospace
- **H2:** Supplied to India’s defence programmes
- **Copy:** Custom engineered transformers, potentiometers, and current transformers… Over 20 years of manufacturing expertise…
- **Programme list (category — platform — component type):**
  - AIR — Tejas LCA Fighter — Toroidal Transformer
  - AIR — Su-30MKI Fighter — Toroidal Transformer
  - AIR — AN-32 Transport Aircraft — Toroidal Transformer
  - AIR — YCON Aircraft — Potentiometer
  - NAVAL — K-28 Naval Aircraft — Toroidal Transformer
  - LAND — Arjun Main Battle Tank — Toroidal Transformer
  - NAVAL — Naval Submarine — Toroidal Transformer
  - MISSILE — BrahMos Missile (DRDO) — Potentiometer Element

**Customers (`CustomersSection`)**

- **H2:** Our Customers — trusted by defence, government, industrial organisations.
- **Government row (names):** HAL, BHEL, ECIL, CWPRS, KSEB, Indian Air Force, Indian Navy, DRDO, BEL, SITAR, MSEB
- **Commercial row:** Tata, Forbes Marshall, Kirloskar, Labindia, Scope T&M, Crompton Greaves, Aplab, EON Infotech, Century Cement, Seshasayee Paper, Artech Welders
- Footer: “And 500+ more customers…”

---

## 2. Toroidal transformers (`/toroidal-transformers`)

### Metadata

| Field | Value |
|--------|--------|
| **Title** | Toroidal Transformers 50Hz to 10kHz \| Manufacturer India \| ETCC |
| **Description** | Custom toroidal power transformers, 10VA–3000VA , 50Hz to 10kHz. Low noise, Audio, medical, defence & industrial applications. Pune manufacturer since 1994. |
| **Canonical** | https://etccindia.com/toroidal-transformers |

### On-page messaging

- Hero kicker: Custom Transformers
- **H1:** Toroidal Power Transformers — 50Hz to 10kHz
- Hero paragraph: Precision-wound toroidal transformers… defence-grade 400Hz… Pune since 1994.

**Section: Defence & Aerospace**

- **H2:** Defence & Aerospace Grade
- Copy: 400Hz military power, airborne instruments, radar, defence electronics; wound and tested in-house.
- Tags: 400Hz, MIL-spec winding, Lightweight core, Custom numbered taps, Prototype to production

**Section: Custom transformer**

- **H2:** Every unit built to your specification
- Copy: 10VA to 3000VA; frequency, voltage, winding, insulation, termination; single/dual/centre-tapped/multiple secondaries.
- **Feature cards (title — summary):**
  - 400Hz Aerospace Grade — military power specs, airborne/radar/defence
  - Nanocrystalline Core — high-frequency low-loss up to 10kHz
  - Electrostatic Shielding — copper foil, EMI/noise
  - 50Hz to 10kHz Range — 50/60Hz through 10kHz in-house
  - Multi-Tap Windings — up to 12+ secondaries
  - Thermal Protection — thermal fuse or resettable switch

**Customisation table parameters (high level)**

- Power 10VA–3000VA; Frequency 50/60/400Hz, 1kHz–10kHz; Primary any; Secondaries single/dual/CT/12+ taps; Core CRGO/ferrite/nanocrystalline; Insulation Class F–H (up to 200°C); Thermal fuse/switch; Termination: leads, PCB pins, screws, bolt; Form: standard toroidal, PCB, open frame; Enclosure: open, varnish, epoxy, IP; Electrostatic shield; Regulation down to ~1%; Custom lead colours; Prototypes, no MOQ.

**Standard range**

- **H2:** Standard Toroidal Transformers
- Summary table: Power 10VA–3000VA; Input 230V AC 50/60Hz; Multiple secondaries; Class F; Regulation ±5%; Colour-coded leads; Label with full winding spec.
- **H3:** Standard Specifications — 24 Models
- Note: 0–230V AC primary; tested IEC 61558 / IS 2026; custom secondaries on request.
- **Full table:** VA nominal/max, magnetic path (cm), OD×H (mm), primary 0–230V AC — rows from 10VA through 3000VA (see codebase `specData`).

**Quote modal default category:** Toroidal Transformers

---

## 3. Current transformers (`/current-transformer`)

### Metadata

| Field | Value |
|--------|--------|
| **Title** | Current Transformers 50A–5000A \| Wound CT & Flexible Rogowski Coil \| ETCC India |
| **Description** | Precision LT current transformers — wound ring-type CTs (50A–2000A, metering class 0.5, protection class 1.0) and flexible Rogowski coils (up to 5000A). Tested to IEC 61869-2 / IS 2705. Pune manufacturer since 1994. |
| **Canonical** | https://etccindia.com/current-transformer |

### On-page messaging

- Kicker: Metering & Protection
- **H1:** Current Transformers — 50A to 5000A
- Hero: Precision LT CTs for metering and protection — wound ring-type and flexible Rogowski; IEC 61869-2 and IS 2705.

**Wound CTs**

- **H2:** Wound Current Transformers
- Copy: CRGO toroidal cores; window & wound primary; 50A–2000A primary, 5A secondary; tested ratio, burden, insulation.
- Tags: Metering Class 0.5, Protection Class 1.0, Window & Wound, 5A Secondary, IEC 61869-2

**Standard wound CT summary table**

- Primary 50mA–2000A; Secondary 5mA–5A; Accuracy 0.5 metering / 1.0 protection; Burden 0.25–50VA; Insulation 0.72kV standard, up to 3.6kV; Window & wound; Standards IEC 61869-2 / IS 2705

**Flexible CTs / Rogowski**

- **H2:** Flexible CTs & Rogowski Coils
- Copy: split-open clip-around; retrofit, busbars, irregular conductors; **body copy states 10A to 5000A with ±1.0% accuracy**
- **flexSummaryRows in data (differs from hero/meta):** Measuring Range **10A–80,000A**; integrator-ready mV; ±1.0%; flexible Rogowski split-open; clip-around; retrofit/large busbars; IEC 61869-10
- Tags: Rogowski Coil, Split-Core, Clip-Around, No Circuit Break, IEC 61869-10

**Applications grid (title — use case)**

- Energy Metering — revenue metering, auditing, commercial/industrial
- Protective Relaying — overcurrent, earth fault, differential; substations, switchgear, DBs
- Power Quality — harmonics, PFC, monitoring; plants & data centres
- Motor Protection — overload, locked rotor, VFD feedback; automation
- Renewable Energy — solar inverter, wind protection, grid-tie metering
- Building Management — sub-metering floors/tenants/equipment

**Quote modal default category:** Current Transformers

---

## 4. Linear potentiometers (`/linear-potentiometer`)

### Metadata

| Field | Value |
|--------|--------|
| **Title** | Linear Potentiometers — Wire-Wound Position Sensors \| ETCC India |
| **Description** | Wire-wound linear potentiometers and linear position sensors: 1 kΩ/in gradient, 1% linearity, −50 °C to +85 °C. Industrial & defence linear slide potentiometers manufactured in Pune since 1994. |
| **Canonical** | https://etccindia.com/linear-potentiometer |

### On-page messaging

- Kicker: Linear Motion Potentiometers
- **H1:** Wire-Wound Linear / Position Sensors
- Intro: mechanical travel → proportional signal; wire-wound for instrumentation, motion, defence; resistance per inch, linearity, mechanical package.

**Product types (cards)**

- Wire-Wound Linear — ETC/SL range; helix on flat substrate; industrial/defence
- Long-Stroke / Rod-Style — hydraulics, test stands, displacement; ball-end/plain shaft
- Compact & Miniature — robotics, aerospace LRU, dense panels

**Technical specifications table (`specRows`)**

- Track: wire wound, max 18 in (series-dependent)
- Power: 0.5 W per inch @ 20 °C (reference)
- Independent linearity: **1%**
- Resolution: 0.5 to 0.03 (by resistance value)
- Temperature: −50 °C to +85 °C
- Life: 10⁶ inches @ 10 in/s
- Max operational force: 250 g
- Contact resistance: &lt;20 Ω per Def 5123
- Dielectric: 1000 V RMS
- Max applied voltage: 130 V
- Temp coefficient: &lt;120 ppm/°C

**CTA block copy**

- “Need a custom linear potentiometer…?” — send envelope, stroke, grading, environment; special tapers, connectors, sealing.

**Applications cards**

- Industrial Automation & Motion Control
- Test & Measurement
- Hydraulic & Actuator Feedback
- Defence & Aerospace (Def Stan 5123, military flow-down mentioned)
- Power Generation & Utilities
- Medical & Laboratory Equipment

**Quote modal default category:** Potentiometers

---

## 5. Potentiometer / linear motion (`/potentiometer`)

### Metadata

| Field | Value |
|--------|--------|
| **Title** | Linear Motion Potentiometers — Wire-Wound, Motion Sensors \| ETCC India |
| **Description** | Wire-wound linear potentiometers and linear position sensors: stroke-built resistance grading, 1 kΩ/in examples, −50°C to +85°C, industrial & defence. Custom linear slide potentiometers from Pune. |
| **Canonical** | https://etccindia.com/potentiometer |

### Positioning

- Longer SEO-oriented page vs `/linear-potentiometer`: families grid, gallery “Reference hardware”, range + standards tables, applications table.

**Hero (`linearIntro`)**

- Kicker: Linear motion potentiometers
- **Title:** Wire-wound & precision linear position sensing
- Description defines linear pot / slide pot; ETCC wire-wound for instrumentation, motion, defence; grading per inch, linearity, mechanical package.

**Six type cards**

- Wire-wound linear; Conductive plastic & hybrid; Long-stroke / rod-style; Compact & miniature; Sealed & ruggedised; Dual-track & redundant

**Gallery labels**

- Linear range; Housing & shaft options; Stroke families; Single unit

**Range table (`rangeData`) — examples**

- Stroke: commonly up to **18 in (457 mm)** wire-wound
- Gradient: typically **1 kΩ/in**
- Linearity: series examples **±0.5% to ±0.25%**
- Resolution: ~0.5% to finer steps
- Power reference: **~0.5 W per inch @ 20 °C**
- Temperature: **−50 °C to +85 °C** standard industrial
- Max voltage: typical **~130 V**
- Custom: ETC/SL-style or equivalent outline

**Representative standards table (`standardsSpecData`)** — includes Standard resistance gradient 1 kΩ/in, linearity **0.5% – 0.25%**, resolution 0.5 to 0.03, same life/force/contact/dielectric/voltage/temp coefficient as above, **Def 5123** contact note.

**Applications table**

- Industrial automation; Test & measurement; Hydraulics/actuators; Defence/aerospace GSE; Power generation/heavy electrical; Medical/lab; Audio/broadcast

**Footer CTA**

- Request quote: stroke, resistance law, linearity, connector, mounting drawing — build from Pune.

**Quote modal default category:** Potentiometers

---

## 6. Wire wound resistors & rheostats (`/wirewound-resistors`)

### Metadata

| Field | Value |
|--------|--------|
| **Title** | Wire Wound Resistors & Rheostats 5W–500W \| ETCC India |
| **Description** | High wattage wire wound resistors and rheostats for power electronics, motor control & industrial loads. 5W to 500W. Pune manufacturer since 1994. |
| **Canonical** | https://etccindia.com/wirewound-resistors |

### On-page messaging

- **H1:** Wire Wound Resistors & Rheostats — 5W to 500W
- Intro: 5W–200W resistors, 25W–500W rheostats; ceramic-tube, ceramic-body, aluminium; power electronics, motor control, load testing, industrial; Pune since 1994.

**Wire wound resistors table**

| Model | Resistance | Power | Tolerance | Construction |
|-------|------------|-------|-----------|--------------|
| WWR-5 | 0.1Ω–5kΩ | 5W | ±5% | Ceramic tube |
| WWR-10 | 0.1Ω–10kΩ | 10W | ±5% | Ceramic tube |
| WWR-25 | 0.5Ω–25kΩ | 25W | ±5% | Ceramic tube |
| WWR-50 | 1Ω–50kΩ | 50W | ±5% | Ceramic body |
| WWR-100 | 1Ω–100kΩ | 100W | ±5% | Aluminum housed |
| WWR-200 | 5Ω–50kΩ | 200W | ±10% | Aluminum housed |

**Rheostats table**

| Model | Resistance | Max Current | Power | Type |
|-------|------------|-------------|-------|------|
| RH-25 | 1Ω–1kΩ | 5A | 25W | Rotary |
| RH-50 | 1Ω–2.5kΩ | 7A | 50W | Rotary |
| RH-100 | 5Ω–5kΩ | 10A | 100W | Rotary |
| RH-300 | 10Ω–10kΩ | 15A | 300W | Slider |
| RH-500 | 10Ω–5kΩ | 25A | 500W | Slider |

**Custom engineering bullets**

- Custom resistance & power; mounting (chassis, panel, PCB); high-temp wire; vitreous enamel or silicone coating; non-inductive winding; custom enclosures/terminals

**Applications (cards)**

- Motor Speed Control — DC motor regulation
- Load Testing — generator, UPS, PSU testing
- Power Electronics — snubber, braking, discharge
- Laboratory & Heating — adjustable standards, heating elements  
- Intro mentions **IS 12063** standards.

**Quote modal default category:** Wire Wound Resistors & Rheostats

---

## 7. Test page (`/test`) — optional / non-production

### Metadata (minimal)

- **Title:** Custom Toroidal Transformers — ETCC India
- **Description:** Precision-wound custom toroidal transformers from 10VA to 3000VA. Defence-grade 400Hz… Pune since 1994.
- **No** `Metadata` type import / no canonical or OG block in file.

**Content:** Substantially the same structure as `/toroidal-transformers` (customisation rows, standard specs, 24-model table). Gallery image list may omit one asset vs production toroidal page.

---

## About Us (`/about-us`)

### Metadata

| Field | Value |
|--------|--------|
| **Title** | About ETCC India — Precision Component Manufacturer Since 1994 |
| **Description** | Efficient Toroidal Coil Corporation (ETCC), established 1994 in Pune. Manufacturer of toroidal transformers, potentiometers and resistors for defence and industry. |
| **Canonical** | https://etccindia.com/about-us |

### Visible copy

- **H1:** About ETCC — trusted name in custom electronic components since 1994.
- **Our Story:** Since 1994 renowned in toroidal transformer and wire wound potentiometers; quality/durability; international standards; evolved with technology; experienced team; long-term relationships.
- **Location h2:** Our Location
- **Factory address:** Unit No. 11, Electronic Sadan No.-1, M.I.D.C., Bhosari, Pune, Pimpri-Chinchwad, Maharashtra 411026, India
- **Phones:** +91-9822614244; +91-2030689099 / 330620988
- **Emails:** efficient_toroidal@rediffmail.com; efficienttoroidal@yahoo.com
- **Business details:** Contact Mr. Rajan Naroor; Type Electronic Components; Industry Electromagnetic Components; Location MIDC Bhosari; Since 1994

---

## Blog index (`/blog`)

### Metadata

| Field | Value |
|--------|--------|
| **Title** | Blog \| ETCC India |
| **Description** | Notes from ETCC India on transformers, current transformers, potentiometers, and wire wound resistors—design, testing, and manufacturing insights. |
| **Canonical** | https://etccindia.com/blog |

### Index copy (`BLOG_PAGE` in `lib/blog.ts`)

- **H1:** Blog
- Intro paras:
  1. Practical notes — design, reliability, manufacturing behind precision electromagnetic components.
  2. Audience: engineers, procurement, build quality/consistency/performance.
  3. Logbook documenting learning and shipping better hardware.

### JSON-LD

- `CollectionPage` + `ItemList` of post URLs and titles.

---

## Blog posts (`/blog/[slug]`)

**Per-post metadata:** `title` = `{post.title} | ETCC India`; `description` = post `excerpt`; canonical `https://etccindia.com/blog/{slug}`; `og:type` article.

### Post 1: `specing-a-transformer`

- **Title:** Spec’ing a transformer: what matters beyond VA rating
- **Date:** April 2, 2026
- **Excerpt:** Checklist for core type, regulation, temperature rise, insulation, tolerances — lab vs line performance.
- **Sections:** The checklist most teams miss (bullets: input range/frequency, load type, regulation target, thermal limits, insulation/hipot/creepage); What to include in your RFQ (ambient, mounting, efficiency/noise, compliance).

### Post 2: `potentiometers-harsh-environments`

- **Title:** Potentiometers in harsh environments: repeatability over time
- **Date:** March 24, 2026
- **Excerpt:** Linearity vs wiper wear, sealing, mounting; qualification and inspection.
- **Sections:** Linearity vs repeatability; Qualification questions (life test, IP/sealing, mounting, cleaning).

### Post 3: `current-transformers-accuracy-setup`

- **Title:** Current transformers: accuracy classes and real-world setup
- **Date:** February 19, 2026
- **Excerpt:** Accuracy class vs burden, leads, mounting, test method.
- **Sections:** Accuracy class isn’t the full system error; Practical setup tips (short twisted leads, burden match, routing, mounting).

### Post 4: `wire-wound-resistors-derating`

- **Title:** Wire wound resistors: derating, enclosure, and heat paths
- **Date:** January 28, 2026
- **Excerpt:** Wattage vs airflow, mounting, enclosure, long-term drift.
- **Sections:** Wattage depends on heat path; Spec for reality (enclosure temp, chassis vs free air, duty cycle, drift).

**Article JSON-LD:** BlogPosting with organization as author/publisher, logo URL, dates from `dateISO`.

---

## Editorial / data consistency flags (for blog authors)

Resolve in copy or code over time; do not mix ranges in one article without explanation.

1. **Home meta** says toroidal **10VA–15kVA**; toroidal page and nav say **10VA–3000VA**.
2. **Flexible CT:** marketing text and meta emphasize **up to 5000A**; internal `flexSummaryRows` list **10A–80,000A** measuring range.
3. **Linear pot linearity:** `/linear-potentiometer` spec table states **1%**; `/potentiometer` and range copy cite **±0.5% to ±0.25%** depending on series.
4. **Servo pot** carousel claims **±0.5%** and **−55°C to +125°C**; linear product pages centre on **−50°C to +85°C** (extended ranges “available” on `/potentiometer`).
5. **Sitemap** omits `/blog` and `/potentiometer` — consider adding if you want full discovery.
6. **`/test`** duplicates toroidal content; exclude from marketing sitemaps if not public.

---

## Header navigation labels (products dropdown)

- Toroidal Transformers — 10VA–3000VA, 50Hz to 10kHz
- Current Transformers — 50A–2000A, accuracy class 0.5
- Linear Potentiometers — Precision slide-wire & linear motion types → `/linear-potentiometer`
- Servo Potentiometers — ±0.5% linearity, −55°C to +125°C → `/linear-potentiometer`
- Wire Wound Resistors — 5W–200W…
- Rheostats — 25W–500W…

**Main nav:** Products (dropdown), Blogs → `/blog`, About Us → `/about-us`.

---

*End of inventory. Source: Next.js `app/` and `components/home/` as of documentation compile time.*
