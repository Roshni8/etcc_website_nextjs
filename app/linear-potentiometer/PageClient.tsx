"use client";

import { useState } from "react";
import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Ruler,
  Layers,
  Box,
  Factory,
  Gauge,
  Crosshair,
  Plane,
  Power,
  Microscope,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import QuoteModal from "@/components/QuoteModal";
import { useImageTuner, TunerToggle, TunerOverlay } from "@/components/dev/ImageTuner";
import { DotPattern } from "@/components/ui/dot-pattern";

/* ════════════════════════════════════════════
   MOTION HELPERS
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
      <p className="pt-4 text-sm font-normal tracking-wide text-foreground">
        {label}
      </p>
    </div>
    <div className="h-10 md:h-14" />
  </div>
);

/* ════════════════════════════════════════════
   IMAGE TUNING — same dev workflow as CT / toroidal pages
   · In development, use the floating crosshair toggle to pan/zoom.
   · Copy button exports objectPosition + transform — paste into initialPos / initialScale below.
   ════════════════════════════════════════════ */

function linearImageExifClass(_respectExif: boolean): string {
  // return _respectExif ? "[image-orientation:from-image]" : "[image-orientation:none]";
  return "";
}

/** Image area height matches center (Long-Stroke) card on all breakpoints so titles align */
const PRODUCT_TYPE_CARD_MEDIA_SHELL =
  "relative h-52 shrink-0 overflow-hidden bg-secondary sm:h-48 md:h-56";

/* ════════════════════════════════════════════
   DATA — PRODUCT TYPE CARDS
   ════════════════════════════════════════════ */

const productTypes: {
  title: string;
  desc: string;
  icon: LucideIcon;
  image: string;
  alt: string;
  tunerIndex: number;
  initialPos: string;
  initialScale: number;
  respectExif: boolean;
}[] = [
  {
    title: "Wire-Wound Linear",
    icon: Ruler,
    image: "/assets/linear-potentiometer.png",
    alt: "ETC/SL/50 wire-wound linear potentiometer — 1K ohms",
    tunerIndex: 0,
    initialPos: "50% 50%",
    initialScale: 1.25,
    respectExif: true,
    desc: "Precision helix on a flat substrate for high stability and predictable power distribution along stroke. The core of our ETC/SL range for industrial and defence use.",
  },
  {
    title: "Long-Stroke / Rod-Style",
    icon: Layers,
    image: "/assets/linear-pot-single.jpg",
    alt: "ETC/SL/60 rod-style linear potentiometer with ball-end rod and flying leads",
    tunerIndex: 1,
    initialPos: "65% 95%",
    initialScale: 1.55,
    respectExif: true,
    desc: "Extended travel for hydraulic cylinder feedback, test stands, and structural displacement — rod-type position sensors with ball-end or plain shaft extensions.",
  },
  {
    title: "Compact & Miniature",
    icon: Box,
    image: "/assets/linear-potentiometer-3sizes.jpg",
    alt: "Three sizes of ETCC linear potentiometers — compact to long stroke",
    tunerIndex: 2,
    initialPos: "50% 50%",
    initialScale: 1.35,
    respectExif: true,
    desc: "Short stroke and reduced section height for robotics, aerospace line-replaceable assemblies, and dense control panels requiring miniature linear potentiometers.",
  },

];

/* ════════════════════════════════════════════
   DATA — SPEC COLUMN IMAGES
   ════════════════════════════════════════════ */

const specColumnImages: {
  src: string;
  alt: string;
  tunerIndex: number;
  initialPos: string;
  initialScale: number;
  respectExif: boolean;
}[] = [
  {
    src: "/assets/linear-potentiometer-range.jpg",
    alt:
      "ETCC linear potentiometer full range — ETC/SL series from compact to long-stroke variants",
    tunerIndex: 3,
    initialPos: "69% 64%",
    initialScale: 1.5,
    respectExif: true,
  },
  {
    src: "/assets/linear-potentiometer-3sizes.jpg",
    alt: "Three ETCC linear potentiometers showing compact to long-stroke variants",
    tunerIndex: 4,
    initialPos: "50% 50%",
    initialScale: 1.45,
    respectExif: true,
  },
];

/* ════════════════════════════════════════════
   DATA — TECHNICAL SPECIFICATIONS
   ════════════════════════════════════════════ */

const specRows = [
  {
    spec: "Track technology",
    value: "Wire wound — maximum 18 inch track (series-dependent)",
  },
  {
    spec: "Power dissipation at 20 °C",
    value: "0.5 W per inch of stroke (reference rating)",
  },
  { spec: "Independent linearity", value: "1%" },
  { spec: "Resolution", value: "0.5 to 0.03 (depending on resistance value)" },
  { spec: "Operating temperature", value: "−50 °C to +85 °C" },
  { spec: "Life expectancy at 10 in/s", value: "10⁶ inches travel" },
  { spec: "Maximum operational force", value: "250 g" },
  {
    spec: "Contact resistance",
    value: "Less than 20 Ω in accordance with Def 5123",
  },
  { spec: "Dielectric strength", value: "1000 V RMS" },
  { spec: "Applied voltage — maximum", value: "130 V" },
  { spec: "Temperature coefficient", value: "Less than 120 ppm/°C" },
];

/* ════════════════════════════════════════════
   DATA — APPLICATION CARDS (SEO-optimized)
   ════════════════════════════════════════════ */

const applicationCards: {
  icon: LucideIcon;
  title: string;
  desc: string;
  tone: { bg: string; icon: string };
}[] = [
  {
    icon: Factory,
    title: "Industrial Automation & Motion Control",
    desc: "Linear displacement feedback for CNC machine slides, packaging lines, and XYZ gantry stages. Wire-wound linear potentiometers offer a cost-effective analogue position loop alternative to LVDTs in factory automation systems.",
    tone: { bg: "bg-emerald-100 dark:bg-emerald-950/30", icon: "text-emerald-700 dark:text-emerald-400" },
  },
  {
    icon: Gauge,
    title: "Test & Measurement",
    desc: "Precision slide potentiometers in universal testing machines, fatigue rigs, and calibration jigs where stroke must map to a ratiometric output for data acquisition and metrology instrumentation.",
    tone: { bg: "bg-blue-100 dark:bg-blue-950/30", icon: "text-blue-600 dark:text-blue-400" },
  },
  {
    icon: Crosshair,
    title: "Hydraulic & Actuator Feedback",
    desc: "Rod-style linear position sensors for hydraulic cylinder extension, valve positioning, and electromechanical actuator travel measurement in heavy equipment, construction machinery, and marine steering systems.",
    tone: { bg: "bg-amber-100 dark:bg-amber-950/30", icon: "text-amber-700 dark:text-amber-400" },
  },
  {
    icon: Plane,
    title: "Defence & Aerospace",
    desc: "Ruggedised linear sensors for flight simulator motion consoles, trainer hardware, and ground support equipment meeting military drawing flow-down, Def Stan 5123, and environmental screening requirements.",
    tone: { bg: "bg-pink-100 dark:bg-pink-950/30", icon: "text-pink-600 dark:text-pink-400" },
  },
  {
    icon: Power,
    title: "Power Generation & Utilities",
    desc: "Tap-changer position indication, motorised linkage travel feedback, and legacy analogue interfaces where wire-wound linear potentiometers connect to protection relays and SCADA front-ends in substations and generating stations.",
    tone: { bg: "bg-violet-100 dark:bg-violet-950/30", icon: "text-violet-700 dark:text-violet-400" },
  },
  {
    icon: Microscope,
    title: "Medical & Laboratory Equipment",
    desc: "Patient table drives, analytical instrument positioning, and laboratory automation requiring compact linear potentiometers with smooth mechanical feel and repeatable electrical output for diagnostic imaging and sample handling systems.",
    tone: { bg: "bg-cyan-100 dark:bg-cyan-950/30", icon: "text-cyan-700 dark:text-cyan-400" },
  },
];

/* ════════════════════════════════════════════
   PAGE COMPONENT
   ════════════════════════════════════════════ */

const LinearPotentiometers = () => {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const tuner = useImageTuner();

  return (
    <Layout>
      <TunerToggle enabled={tuner.enabled} onToggle={tuner.toggle} />
      {/* ═══════════════════════════════════════
          HERO
         ═══════════════════════════════════════ */}
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
              Linear Motion Potentiometers
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tighter text-foreground md:text-6xl animate-fade-in-up animation-delay-100">
              Wire-Wound Linear
              <br />
              Position Sensors
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground animate-fade-in-up animation-delay-200">
              A linear potentiometer converts mechanical travel along a straight
              line into a proportional electrical signal. ETCC builds wire-wound
              linear units for instrumentation, motion systems, and defence
              electronics — with resistance graded per inch of stroke,
              measurable linearity, and configurations matched to your mechanical
              package.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          PRODUCT TYPES — Image + Text Cards
         ═══════════════════════════════════════ */}
      <section id="types">
        <SectionSeparator label="Product Range" />
        <div className="mx-auto max-w-6xl px-6 pb-16 md:pb-20">
          <motion.div {...fadeUp}>
            <h2 className="mb-4 text-3xl font-bold tracking-tighter text-foreground md:text-4xl">
              Linear Potentiometer Types
            </h2>
            <p className="mb-10 max-w-3xl text-base leading-relaxed text-muted-foreground">
              From inch-counted wire-wound tracks (ETC/SL series at 1 kΩ per
              inch) through sealed industrial slides — your drawing defines the
              final outline, lead dress, and electrical grading.
            </p>
          </motion.div>

          <div className="grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {productTypes.map((card, i) => {
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
                  className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card"
                >
                  <div className={PRODUCT_TYPE_CARD_MEDIA_SHELL}>
                    <TunerOverlay
                      index={card.tunerIndex}
                      initialPos={card.initialPos}
                      initialScale={card.initialScale}
                      enabled={tuner.enabled}
                      onUpdate={tuner.handleUpdate}
                    />
                    <DotPattern
                      width={12}
                      height={12}
                      cr={0.5}
                      className="text-neutral-400/40 dark:text-neutral-500/30 [mask-image:radial-gradient(ellipse_at_center,white_60%,transparent_90%)]"
                    />
                    <img
                      src={card.image}
                      alt={card.alt}
                      className={`relative z-10 h-full w-full object-contain mix-blend-multiply p-4 transition-transform duration-300 ${linearImageExifClass(card.respectExif)}`}
                      style={tuner.getStyle(
                        card.tunerIndex,
                        card.initialPos,
                        card.initialScale,
                      )}
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-3 flex items-center gap-2">
                      <Icon className="h-5 w-5 text-foreground" strokeWidth={1.5} aria-hidden />
                      <h3 className="text-base font-semibold text-foreground">{card.title}</h3>
                    </div>
                    <p className="flex-1 text-sm leading-relaxed text-muted-foreground">{card.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          TECHNICAL SPECIFICATIONS
         ═══════════════════════════════════════ */}
      <section id="specifications">
        <SectionSeparator label="Specifications" />
        <div className="mx-auto max-w-6xl px-6 pb-16 md:pb-20">
          <div className="grid gap-10 md:grid-cols-5 md:items-start">
            <motion.div {...fadeUp} className="md:col-span-3">
              <h2 className="mb-3 text-3xl font-bold tracking-tighter text-foreground md:text-4xl">
                Technical Specifications
              </h2>
              <p className="mb-5 text-base leading-relaxed text-muted-foreground">
                Typical specifications for our wire-wound linear track series —
                identical to the class of data shown on legacy data sheets for
                ETC/SL linear motion potentiometers. Certify ratings against
                your ordering document before production.
              </p>

              <div className="overflow-hidden rounded-xl border border-border bg-card">
                <table className="w-full table-fixed text-sm">
                  <thead>
                    <tr className="border-b border-border bg-secondary">
                      <th className="w-2/5 px-4 py-2.5 text-left text-xs font-semibold text-foreground">
                        Specification
                      </th>
                      <th className="px-4 py-2.5 text-left text-xs font-semibold text-foreground">
                        Value
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {specRows.map((row, i) => (
                      <tr
                        key={row.spec}
                        className={`border-b border-border last:border-0 ${
                          i % 2 === 0 ? "bg-card" : "bg-secondary/50"
                        }`}
                      >
                        <td className="px-4 py-2.5 font-medium text-foreground">
                          {row.spec}
                        </td>
                        <td className="px-4 py-2.5 text-foreground">
                          {row.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Image right */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
              className="relative flex flex-col gap-4 md:col-span-2"
            >
              {specColumnImages.map((specImg) => (
                <div
                  key={specImg.src}
                  className="relative flex items-center justify-center overflow-hidden rounded-2xl border border-border bg-card p-4"
                >
                  <TunerOverlay
                    index={specImg.tunerIndex}
                    initialPos={specImg.initialPos}
                    initialScale={specImg.initialScale}
                    enabled={tuner.enabled}
                    onUpdate={tuner.handleUpdate}
                  />
                  <DotPattern
                    width={12}
                    height={12}
                    cr={0.5}
                    className="text-neutral-400/40 dark:text-neutral-500/30 [mask-image:radial-gradient(ellipse_at_center,white_60%,transparent_90%)]"
                  />
                  <img
                    src={specImg.src}
                    alt={specImg.alt}
                    className={`relative z-10 w-full max-h-56 object-contain mix-blend-multiply ${linearImageExifClass(specImg.respectExif)}`}
                    style={tuner.getStyle(
                      specImg.tunerIndex,
                      specImg.initialPos,
                      specImg.initialScale,
                    )}
                    loading="lazy"
                  />
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div {...fadeUp} className="mt-12 w-full">
            <div className="relative overflow-hidden rounded-2xl bg-white shadow-card dark:shadow-card">
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 z-20 rounded-2xl shiny-conic-border"
              />
              <div className="relative z-10 rounded-[calc(1rem-1.5px)] bg-white px-5 py-6 md:px-7 md:py-7 m-[1.5px]">
                <div className="relative max-w-full">
                  <h3 className="text-2xl font-bold tracking-tighter text-slate-900 md:text-3xl">
                    Need a custom linear potentiometer for your application?
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
                    We regularly build to customer drawings and duty cycles. Send us your mechanical
                    envelope, stroke, resistance grading, and operating environment — our engineers
                    will review your requirements and respond with a clear, manufacturable approach.
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
                    Special executions are available when your programme needs them, including
                    alternate resistance tapers, connector styles, and environmental sealing.
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
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          APPLICATIONS
         ═══════════════════════════════════════ */}
      <section id="applications">
        <SectionSeparator label="Applications &amp; Industries" />
        <div className="mx-auto max-w-6xl px-6 pb-16 md:pb-20">
          <motion.div {...fadeUp}>
            <h2 className="mb-4 text-3xl font-bold tracking-tighter text-foreground md:text-4xl">
              Applications of Linear Potentiometers
            </h2>
            <p className="mb-10 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Design engineers and procurement teams specify ETCC linear
              potentiometers for analogue position feedback across industrial
              automation, defence, power generation, and precision
              instrumentation — wherever a reliable, cost-effective linear
              displacement sensor is needed.
            </p>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {applicationCards.map((card, i) => {
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
                    <Icon className={`h-5 w-5 ${card.tone.icon}`} />
                  </div>
                  <p className="mb-2 text-sm font-semibold text-foreground">
                    {card.title}
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {card.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <motion.div {...fadeUp} className="mt-10 flex justify-center">
            <Button
              onClick={() => setQuoteOpen(true)}
              className="h-12 rounded-full bg-foreground px-8 text-sm font-medium text-background hover:bg-foreground/90"
            >
              Request a Quote
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      <QuoteModal
        open={quoteOpen}
        onOpenChange={setQuoteOpen}
        defaultCategory="Potentiometers"
      />
    </Layout>
  );
};

export default LinearPotentiometers;
