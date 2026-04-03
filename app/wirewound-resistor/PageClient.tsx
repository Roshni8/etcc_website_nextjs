"use client";

import { useState } from "react";
import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Gauge,
  Activity,
  Zap,
  FlaskConical,
  Target,
  LayoutGrid,
  Thermometer,
  Droplets,
  Waves,
  Box,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import SpecificationTable from "@/components/SpecificationTable";
import QuoteModal from "@/components/QuoteModal";
import { DotPattern } from "@/components/ui/dot-pattern";
import { ImageLightbox } from "@/components/image-lightbox";

/* ════════════════════════════════════════════
   MOTION
   ════════════════════════════════════════════ */

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" as const },
  transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] as const },
};

/* ════════════════════════════════════════════
   SECTION SEPARATOR
   ════════════════════════════════════════════ */

const SectionSeparator = ({ label }: { label: string }) => (
  <div className="overflow-hidden">
    <div className="h-10 md:h-14" />
    <div className="relative mx-auto max-w-6xl px-6">
      <div className="relative h-[2px]">
        <div
          className="absolute top-0 h-px"
          style={{
            left: "calc(50% - 50vw)",
            width: "calc(50vw - 50% - 6px)",
            backgroundColor: "hsl(var(--foreground) / 0.08)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[2px]"
          style={{
            backgroundImage:
              "repeating-radial-gradient(circle, hsl(var(--foreground) / 0.6) 0px, hsl(var(--foreground) / 0.6) 1px, transparent 1px, transparent 6px)",
            backgroundSize: "6px 100%",
          }}
        />
        <div
          className="absolute top-0 h-px"
          style={{
            right: "calc(50% - 50vw)",
            width: "calc(50vw - 50% - 6px)",
            backgroundColor: "hsl(var(--foreground) / 0.08)",
          }}
        />
      </div>
      <p className="pt-4 text-sm font-normal tracking-wide text-foreground">{label}</p>
    </div>
    <div className="h-10 md:h-14" />
  </div>
);

function splitHeroTitle(title: string): { line1: string; line2: string | null } {
  const parts = title.split(/\s+—\s+/);
  if (parts.length >= 2) {
    return { line1: parts[0]!, line2: parts.slice(1).join(" — ") };
  }
  return { line1: title, line2: null };
}

/* ════════════════════════════════════════════
   DATA — SPEC TABLES
   ════════════════════════════════════════════ */

const resistorColumns = [
  { key: "model", label: "Model" },
  { key: "resistance", label: "Resistance Range" },
  { key: "power", label: "Power Rating" },
  { key: "tolerance", label: "Tolerance" },
  { key: "construction", label: "Construction" },
];

const resistorData = [
  { model: "WWR-5", resistance: "0.1Ω – 5kΩ", power: "5W", tolerance: "±5%", construction: "Ceramic tube" },
  { model: "WWR-10", resistance: "0.1Ω – 10kΩ", power: "10W", tolerance: "±5%", construction: "Ceramic tube" },
  { model: "WWR-25", resistance: "0.5Ω – 25kΩ", power: "25W", tolerance: "±5%", construction: "Ceramic tube" },
  { model: "WWR-50", resistance: "1Ω – 50kΩ", power: "50W", tolerance: "±5%", construction: "Ceramic body" },
  { model: "WWR-100", resistance: "1Ω – 100kΩ", power: "100W", tolerance: "±5%", construction: "Aluminum housed" },
  { model: "WWR-200", resistance: "5Ω – 50kΩ", power: "200W", tolerance: "±10%", construction: "Aluminum housed" },
];

const rheostatColumns = [
  { key: "model", label: "Model" },
  { key: "resistance", label: "Resistance" },
  { key: "current", label: "Max Current" },
  { key: "power", label: "Power" },
  { key: "type", label: "Type" },
];

const rheostatData = [
  { model: "RH-25", resistance: "1Ω – 1kΩ", current: "5A", power: "25W", type: "Rotary" },
  { model: "RH-50", resistance: "1Ω – 2.5kΩ", current: "7A", power: "50W", type: "Rotary" },
  { model: "RH-100", resistance: "5Ω – 5kΩ", current: "10A", power: "100W", type: "Rotary" },
  { model: "RH-300", resistance: "10Ω – 10kΩ", current: "15A", power: "300W", type: "Slider" },
  { model: "RH-500", resistance: "10Ω – 5kΩ", current: "25A", power: "500W", type: "Slider" },
];

const customCapabilityCards: {
  title: string;
  desc: string;
  icon: LucideIcon;
  tone: { bg: string; icon: string };
}[] = [
  {
    title: "Resistance & power",
    desc: "Custom resistance values and power ratings from low-watt precision to high-power load banks.",
    icon: Target,
    tone: { bg: "bg-pink-100 dark:bg-pink-950/30", icon: "text-pink-600 dark:text-pink-400" },
  },
  {
    title: "Mounting & terminals",
    desc: "Chassis, panel, and PCB mounting with terminal layouts matched to your enclosure and harness.",
    icon: LayoutGrid,
    tone: { bg: "bg-emerald-100 dark:bg-emerald-950/30", icon: "text-emerald-700 dark:text-emerald-400" },
  },
  {
    title: "Temperature & wire",
    desc: "High-temperature wire options and coatings rated for demanding thermal environments.",
    icon: Thermometer,
    tone: { bg: "bg-amber-100 dark:bg-amber-950/30", icon: "text-amber-700 dark:text-amber-400" },
  },
  {
    title: "Coatings",
    desc: "Vitreous enamel or silicone coating for insulation durability and environmental protection.",
    icon: Droplets,
    tone: { bg: "bg-blue-100 dark:bg-blue-950/30", icon: "text-blue-600 dark:text-blue-400" },
  },
  {
    title: "Non-inductive",
    desc: "Non-inductive winding available where low inductance is critical in switching and snubber circuits.",
    icon: Waves,
    tone: { bg: "bg-violet-100 dark:bg-violet-950/30", icon: "text-violet-700 dark:text-violet-400" },
  },
  {
    title: "Enclosures",
    desc: "Custom enclosures and terminal configurations for OEM integration and field service access.",
    icon: Box,
    tone: { bg: "bg-cyan-100 dark:bg-cyan-950/30", icon: "text-cyan-700 dark:text-cyan-400" },
  },
];

const applications: {
  title: string;
  desc: string;
  icon: LucideIcon;
  tone: { bg: string; icon: string };
}[] = [
  {
    title: "Motor speed control",
    desc: "Variable resistance for DC motor regulation, speed control, and rheostat-driven drive systems.",
    icon: Gauge,
    tone: { bg: "bg-pink-100 dark:bg-pink-950/30", icon: "text-pink-600 dark:text-pink-400" },
  },
  {
    title: "Load testing",
    desc: "Resistive loads for generator, UPS, and power supply test benches and commissioning.",
    icon: Activity,
    tone: { bg: "bg-emerald-100 dark:bg-emerald-950/30", icon: "text-emerald-700 dark:text-emerald-400" },
  },
  {
    title: "Power electronics",
    desc: "Snubber, braking, and discharge resistors for converters, drives, and DC bus management.",
    icon: Zap,
    tone: { bg: "bg-blue-100 dark:bg-blue-950/30", icon: "text-blue-600 dark:text-blue-400" },
  },
  {
    title: "Laboratory & heating",
    desc: "Adjustable standards, calibration loads, and industrial heating elements where stable power dissipation matters.",
    icon: FlaskConical,
    tone: { bg: "bg-violet-100 dark:bg-violet-950/30", icon: "text-violet-700 dark:text-violet-400" },
  },
];

const resistorGalleryImages = ["/assets/resistors-range.jpg"];

const DEFAULT_QUOTE_CATEGORY = "Wire Wound Resistors & Rheostats";
const DEFAULT_HERO_TITLE = "Wire Wound Resistors & Rheostats — 5W to 500W";
const DEFAULT_HERO_INTRO =
  "ETCC India manufactures high-power wire wound resistors from 5W to 200W and rheostats from 25W to 500W at our Pune facility, established in 1994. Ceramic-tube, ceramic-body, and aluminium-housed constructions for power electronics, motor control, load testing, and industrial applications.";
const DEFAULT_HERO_EYEBROW = "Power resistive components";

interface WirewoundPageClientProps {
  quoteDefaultCategory?: string;
  heroTitle?: string;
  heroIntro?: string;
  heroEyebrow?: string;
}

const WirewoundResistors = ({
  quoteDefaultCategory = DEFAULT_QUOTE_CATEGORY,
  heroTitle = DEFAULT_HERO_TITLE,
  heroIntro = DEFAULT_HERO_INTRO,
  heroEyebrow = DEFAULT_HERO_EYEBROW,
}: WirewoundPageClientProps) => {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const { line1, line2 } = splitHeroTitle(heroTitle);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle, #d6d3d1 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-center text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground animate-fade-in-up">
              {heroEyebrow}
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tighter text-foreground md:text-6xl animate-fade-in-up animation-delay-100">
              {line1}
              {line2 ? (
                <>
                  <br />
                  <span className="text-muted-foreground">{line2}</span>
                </>
              ) : null}
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground animate-fade-in-up animation-delay-200">
              {heroIntro}
            </p>
          </div>
        </div>
      </section>

      {/* Product overview */}
      <section id="overview">
        <SectionSeparator label="Product range" />
        <div className="mx-auto max-w-6xl px-6 pb-16 md:pb-20">
          <div className="grid gap-10 lg:grid-cols-[1fr,1.05fr] lg:items-start">
            <motion.div {...fadeUp} className="lg:sticky lg:top-24 lg:self-start">
              <h2 className="mb-4 text-3xl font-bold tracking-tighter text-foreground md:text-4xl">
                Wire wound resistors &amp; rheostats
              </h2>
              <p className="mb-5 text-base leading-relaxed text-muted-foreground">
                Precision wire wound elements on ceramic tube, ceramic body, and aluminium-housed formers — from
                5W fixed resistors through 500W variable rheostats. Built for continuous duty in power electronics,
                motor control, and industrial test equipment, with testing aligned to IS 12063.
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "5W – 200W resistors",
                  "25W – 500W rheostats",
                  "Ceramic & aluminium",
                  "Custom values",
                  "Pune since 1994",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border px-3 py-1 text-xs font-medium text-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
            >
              <button
                type="button"
                className="relative flex min-h-[280px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-2xl border border-border bg-card p-6 text-left transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:min-h-[320px]"
                onClick={() => setLightbox("/assets/resistors-range.jpg")}
                aria-label="View full screen: wire wound resistors and rheostats range"
              >
                <DotPattern
                  width={12}
                  height={12}
                  cr={0.5}
                  className="text-neutral-400/40 dark:text-neutral-500/30 [mask-image:radial-gradient(ellipse_at_center,white_60%,transparent_90%)]"
                />
                <img
                  src="/assets/resistors-range.jpg"
                  alt="Assorted wire wound resistors and rheostats — ETCC India product range"
                  width={800}
                  height={420}
                  className="relative z-10 w-full max-h-[400px] object-contain mix-blend-multiply"
                  loading="lazy"
                />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Wire wound resistors table */}
      <section id="resistors">
        <SectionSeparator label="Wire wound resistors" />
        <div className="mx-auto max-w-6xl px-6 pb-16 md:pb-20">
          <div className="grid gap-10 md:grid-cols-5 md:items-start">
            <motion.div {...fadeUp} className="md:col-span-3">
              <h2 className="mb-3 text-3xl font-bold tracking-tighter text-foreground md:text-4xl">
                Fixed wire wound resistors
              </h2>
              <p className="mb-5 text-base leading-relaxed text-muted-foreground">
                Precision wire wound resistors from 5W to 200W in ceramic tube, ceramic body, and aluminium-housed
                constructions for snubbers, braking, ballast, and general power dissipation.
              </p>
              <SpecificationTable
                columns={resistorColumns}
                data={resistorData}
                caption="Wire wound resistor specifications"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.12, ease: [0.23, 1, 0.32, 1] }}
              className="md:col-span-2"
            >
              <button
                type="button"
                className="relative flex min-h-[240px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                onClick={() => setLightbox("/assets/resistors-range.jpg")}
                aria-label="View full screen: wire wound resistor construction detail"
              >
                <DotPattern
                  width={12}
                  height={12}
                  cr={0.5}
                  className="text-neutral-400/40 dark:text-neutral-500/30 [mask-image:radial-gradient(ellipse_at_center,white_60%,transparent_90%)]"
                />
                <img
                  src="/assets/resistors-range.jpg"
                  alt="Wire wound resistor types — ceramic tube, ceramic body, and aluminium housed"
                  width={600}
                  height={360}
                  className="relative z-10 w-full max-h-[280px] object-contain mix-blend-multiply"
                  loading="lazy"
                />
              </button>
            </motion.div>
          </div>

          <motion.div {...fadeUp} className="mt-12 w-full">
            <div className="relative overflow-hidden rounded-2xl bg-white shadow-card dark:shadow-card">
              <span aria-hidden className="pointer-events-none absolute inset-0 z-20 rounded-2xl shiny-conic-border" />
              <div className="relative z-10 m-[1.5px] rounded-[calc(1rem-1.5px)] bg-white px-5 py-6 md:px-7 md:py-7">
                <h3 className="text-2xl font-bold tracking-tighter text-slate-900 md:text-3xl">
                  Need a custom resistor or rheostat?
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
                  Share your resistance value, power rating, mounting style, and environmental limits — we build to
                  drawing for OEM programmes, retrofit panels, and one-off engineering prototypes.
                </p>
                <div className="mt-6">
                  <Button
                    type="button"
                    onClick={() => setQuoteOpen(true)}
                    className="h-11 rounded-full bg-foreground px-7 text-sm font-medium text-background hover:bg-foreground/90"
                  >
                    Share your specification
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Rheostats */}
      <section id="rheostats">
        <SectionSeparator label="Rheostats" />
        <div className="mx-auto max-w-6xl px-6 pb-16 md:pb-20">
          <div className="grid gap-10 md:grid-cols-5 md:items-start">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="order-2 md:order-1 md:col-span-2"
            >
              <button
                type="button"
                className="relative flex min-h-[240px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                onClick={() => setLightbox("/assets/resistors-range.jpg")}
                aria-label="View full screen: rotary and slider rheostats"
              >
                <DotPattern
                  width={12}
                  height={12}
                  cr={0.5}
                  className="text-neutral-400/40 dark:text-neutral-500/30 [mask-image:radial-gradient(ellipse_at_center,white_60%,transparent_90%)]"
                />
                <img
                  src="/assets/resistors-range.jpg"
                  alt="Rotary and slider wire wound rheostats — ETCC India"
                  width={600}
                  height={360}
                  className="relative z-10 w-full max-h-[280px] object-contain mix-blend-multiply"
                  loading="lazy"
                />
              </button>
            </motion.div>

            <motion.div {...fadeUp} className="order-1 md:order-2 md:col-span-3">
              <h2 className="mb-3 text-3xl font-bold tracking-tighter text-foreground md:text-4xl">Rheostats</h2>
              <p className="mb-5 text-base leading-relaxed text-muted-foreground">
                Variable wire wound resistors for current control, motor speed regulation, and laboratory use. Rotary
                and slider types with chassis-friendly mounting.
              </p>
              <SpecificationTable columns={rheostatColumns} data={rheostatData} caption="Rheostat specifications" />
              <div className="mt-5 flex flex-wrap gap-2">
                {["Rotary", "Slider", "25W – 500W", "Panel & chassis"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border px-3 py-1 text-xs font-medium text-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Custom engineering */}
      <section id="custom">
        <SectionSeparator label="Custom engineering" />
        <div className="mx-auto max-w-6xl px-6 pb-16 md:pb-20">
          <motion.div {...fadeUp}>
            <h2 className="mb-4 text-3xl font-bold tracking-tighter text-foreground md:text-4xl">
              Custom resistor engineering
            </h2>
            <p className="mb-10 max-w-3xl text-base leading-relaxed text-muted-foreground">
              We manufacture wire wound resistors and rheostats to your specific requirements — from low-value
              precision elements to high-power load banks and matched sets for production lines.
            </p>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {customCapabilityCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.45,
                    delay: i * 0.06,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                  className="flex flex-col items-start rounded-xl border border-border bg-card p-5"
                >
                  <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg ${card.tone.bg}`}>
                    <Icon className={`h-5 w-5 ${card.tone.icon}`} strokeWidth={1.5} aria-hidden />
                  </div>
                  <h3 className="mb-2 text-sm font-semibold text-foreground">{card.title}</h3>
                  <p className="flex-1 text-sm leading-relaxed text-muted-foreground">{card.desc}</p>
                </motion.div>
              );
            })}
          </div>

          <motion.div {...fadeUp} className="mt-10 flex justify-center">
            <Button
              onClick={() => setQuoteOpen(true)}
              className="h-12 rounded-full bg-foreground px-8 text-sm font-medium text-background hover:bg-foreground/90"
            >
              Request a quote
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Applications */}
      <section id="applications">
        <SectionSeparator label="Applications" />
        <div className="mx-auto max-w-6xl px-6 pb-16 md:pb-20">
          <motion.div {...fadeUp}>
            <h2 className="mb-4 text-3xl font-bold tracking-tighter text-foreground md:text-4xl">
              Where our resistors are used
            </h2>
            <p className="mb-10 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Wire wound resistors and rheostats from ETCC serve power electronics, industrial drives, test equipment,
              and heating applications — manufactured and tested to demanding electrical and mechanical standards.
            </p>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {applications.map((app, i) => {
              const Icon = app.icon;
              return (
                <motion.div
                  key={app.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.45,
                    delay: i * 0.06,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                  className="flex flex-col items-start rounded-xl border border-border bg-card p-5"
                >
                  <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg ${app.tone.bg}`}>
                    <Icon className={`h-5 w-5 ${app.tone.icon}`} strokeWidth={1.5} aria-hidden />
                  </div>
                  <h3 className="mb-2 text-sm font-semibold text-foreground">{app.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{app.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {lightbox && (
        <ImageLightbox
          src={lightbox}
          images={resistorGalleryImages}
          onClose={() => setLightbox(null)}
          onNavigate={(src) => setLightbox(src)}
        />
      )}

      <QuoteModal open={quoteOpen} onOpenChange={setQuoteOpen} defaultCategory={quoteDefaultCategory} />
    </Layout>
  );
};

export default WirewoundResistors;
