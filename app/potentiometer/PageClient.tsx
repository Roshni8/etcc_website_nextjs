"use client";

import { useState } from "react";
import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, Waves, Thermometer, Ruler, Target, ShieldCheck, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import SpecificationTable from "@/components/SpecificationTable";
import QuoteModal from "@/components/QuoteModal";
import { DotPattern } from "@/components/ui/dot-pattern";
import { ImageLightbox } from "@/components/image-lightbox";
import { useImageTuner, TunerToggle, TunerOverlay } from "@/components/dev/ImageTuner";

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

function potImageExifClass(_respectExif: boolean): string {
  // return _respectExif ? "[image-orientation:from-image]" : "[image-orientation:none]";
  return "";
}

/** Page product photos — order matches tuner indices & lightbox navigation */
const potentiometerGalleryImages = [
  "/assets/servo-section-02.png",
  "/assets/servo-section-03.png",
  "/assets/servo-standard-single.png",
  "/assets/products-potentiometer.png",
  "/assets/ganged-potentiometer.png",
];

/** Default framing — indices align with gallery / tuner (image 5 unchanged) */
const potImageFraming: { pos: string; scale: number }[] = [
  { pos: "53% 61%", scale: 1.65 },
  { pos: "49% 63%", scale: 1.5 },
  { pos: "55% 80%", scale: 1.25 },
  { pos: "50% 50%", scale: 0.95 },
  { pos: "50% 50%", scale: 1 },
];

/* ════════════════════════════════════════════
   DATA — SERVO POTENTIOMETERS SPEC TABLE
   ════════════════════════════════════════════ */

const servoColumns = [
  { key: "spec", label: "Specification" },
  { key: "etc_se_37", label: "ETC/SE/37" },
  { key: "etc_se_50", label: "ETC/SE/50.5" },
  { key: "etc_se_64", label: "ETC/SE/64" },
  { key: "etc_se_76", label: "ETC/SE/76" },
];

const servoData = [
  { spec: "A (mm)", etc_se_37: "37", etc_se_50: "50.5", etc_se_64: "64", etc_se_76: "76" },
  { spec: "B (mm)", etc_se_37: "20", etc_se_50: "28", etc_se_64: "28", etc_se_76: "28" },
  { spec: "C (mm)", etc_se_37: "25", etc_se_50: "25", etc_se_64: "25", etc_se_76: "25" },
  { spec: "D (mm)", etc_se_37: "6", etc_se_50: "6.35", etc_se_64: "6.35", etc_se_76: "6.35" },
  { spec: "Resistance Value", etc_se_37: "20Ω–10KΩ", etc_se_50: "30Ω–50KΩ", etc_se_64: "50Ω–68KΩ", etc_se_76: "100Ω–100KΩ" },
  { spec: "Tolerance", etc_se_37: "5%", etc_se_50: "5%", etc_se_64: "5%", etc_se_76: "5%" },
  { spec: "Linearity (IND)", etc_se_37: "2%", etc_se_50: "1%", etc_se_64: "0.5%", etc_se_76: "0.5%" },
  { spec: "Resolution", etc_se_37: "0.3%–0.03%", etc_se_50: "Same", etc_se_64: "Same", etc_se_76: "Same" },
  { spec: "Power Rating", etc_se_37: "2W", etc_se_50: "4W", etc_se_64: "6W", etc_se_76: "7W" },
  { spec: "Mechanical Angle", etc_se_37: "360°", etc_se_50: "360°", etc_se_64: "360°", etc_se_76: "360°" },
  { spec: "Electrical Angle", etc_se_37: "355° ± 3°", etc_se_50: "355° ± 2°", etc_se_64: "355° ± 2°", etc_se_76: "355° ± 2°" },
  { spec: "Dielectric Strength", etc_se_37: "1000 V RMS", etc_se_50: "1000 V RMS", etc_se_64: "1000 V RMS", etc_se_76: "1000 V RMS" },
  { spec: "Rotational Life", etc_se_37: "2 × 10⁵ cycles", etc_se_50: "2 × 10⁵ cycles", etc_se_64: "2 × 10⁵ cycles", etc_se_76: "2 × 10⁵ cycles" },
  { spec: "Running Torque", etc_se_37: "25 grams", etc_se_50: "25 grams", etc_se_64: "25 grams", etc_se_76: "25 grams" },
  { spec: "Operational Temp.", etc_se_37: "−55°C to +125°C", etc_se_50: "−55°C to +125°C", etc_se_64: "−55°C to +125°C", etc_se_76: "−55°C to +125°C" },
];

/* ════════════════════════════════════════════
   DATA — CUSTOMIZATION FEATURES
   ════════════════════════════════════════════ */

const customCards: {
  title: string;
  desc: string;
  icon: LucideIcon;
  tone: { bg: string; icon: string };
}[] = [
  {
    title: "Resistance & Tolerance",
    desc: "Custom resistance values from 20Ω to 100KΩ with precision tolerances down to ±0.01%. Special taper profiles including linear, logarithmic, and custom functions.",
    icon: Target,
    tone: { bg: "bg-pink-100 dark:bg-pink-950/30", icon: "text-pink-600 dark:text-pink-400" },
  },
  {
    title: "Shaft & Mounting",
    desc: "Various shaft types and lengths. Panel mount, PCB mount, servo flange, and custom mounting configurations to suit any enclosure.",
    icon: Ruler,
    tone: { bg: "bg-emerald-100 dark:bg-emerald-950/30", icon: "text-emerald-700 dark:text-emerald-400" },
  },
  {
    title: "Multi-Gang & Multi-Turn",
    desc: "Ganged potentiometers with matched tracking. Multi-turn precision units for fine adjustment in instrumentation and calibration.",
    icon: Settings,
    tone: { bg: "bg-blue-100 dark:bg-blue-950/30", icon: "text-blue-600 dark:text-blue-400" },
  },
  {
    title: "Thermal & Environmental",
    desc: "Extended temperature range designs from −55°C to +200°C. Sealed and tropicalised options for harsh and high-humidity environments.",
    icon: Thermometer,
    tone: { bg: "bg-amber-100 dark:bg-amber-950/30", icon: "text-amber-700 dark:text-amber-400" },
  },
  {
    title: "Linearity & Resolution",
    desc: "High-linearity servo potentiometers with independent linearity down to ±0.05%. Ultra-fine resolution depending on resistance value.",
    icon: Waves,
    tone: { bg: "bg-violet-100 dark:bg-violet-950/30", icon: "text-violet-700 dark:text-violet-400" },
  },
  {
    title: "Ruggedised & Protected",
    desc: "Shock and vibration rated units with potting and encapsulation. Waterproof configurations for demanding military and industrial applications.",
    icon: ShieldCheck,
    tone: { bg: "bg-cyan-100 dark:bg-cyan-950/30", icon: "text-cyan-700 dark:text-cyan-400" },
  },
];

/* ════════════════════════════════════════════
   DATA — STANDARD POTENTIOMETER RANGE TABLE
   ════════════════════════════════════════════ */

const standardPotColumns = [
  { key: "model", label: "Model" },
  { key: "type", label: "Type" },
  { key: "resistance", label: "Resistance Range" },
  { key: "power", label: "Power" },
  { key: "linearity", label: "Linearity" },
  { key: "rotation", label: "Rotation" },
];

const standardPotData = [
  { model: "ETC/P/12", type: "Standard — Wire Wound", resistance: "10Ω – 10kΩ", power: "1W", linearity: "±5%", rotation: "300°" },
  { model: "ETC/P/25", type: "Standard — Wire Wound", resistance: "10Ω – 50kΩ", power: "2W", linearity: "±3%", rotation: "300°" },
  { model: "ETC/P/50", type: "Standard — Wire Wound", resistance: "50Ω – 100kΩ", power: "4W", linearity: "±2%", rotation: "300°" },
  { model: "ETC/GP/25", type: "Ganged — Dual Section", resistance: "100Ω – 50kΩ", power: "2W per section", linearity: "±1%", rotation: "360°" },
  { model: "ETC/GP/50", type: "Ganged — Triple Section", resistance: "100Ω – 100kΩ", power: "3W per section", linearity: "±1%", rotation: "360°" },
];

/* ════════════════════════════════════════════
   PAGE COMPONENT
   ════════════════════════════════════════════ */

const Potentiometers = () => {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);
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
              Precision Control Components
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tighter text-foreground md:text-6xl animate-fade-in-up animation-delay-100">
              Wire Wound Servo
              <br />
              Potentiometers
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground animate-fade-in-up animation-delay-200">
              Precision wire wound potentiometers for industrial,
              instrumentation, servo, and defence applications. Available in
              servo, ganged, and custom configurations — manufactured at our
              Pune facility since 1994.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 1 — SERVO POTENTIOMETERS (2 images)
         ═══════════════════════════════════════ */}
      <section id="servo">
        <SectionSeparator label="Servo Potentiometers" />
        <div className="mx-auto max-w-6xl px-6 pb-16 md:pb-20">
          <div className="grid gap-10 lg:grid-cols-[1fr,1.05fr] lg:items-start">
            <motion.div {...fadeUp} className="lg:sticky lg:top-24 lg:self-start">
              <h2 className="mb-4 text-3xl font-bold tracking-tighter text-foreground md:text-4xl">
                Servo Potentiometers
              </h2>
              <p className="mb-5 text-base leading-relaxed text-muted-foreground">
                Precision wire-wound servo potentiometers for angular position
                feedback in closed-loop control systems. Available as single-turn
                and multi-turn configurations with linearity down to ±0.5%.
                Built to defence and aerospace standards with sealed,
                vibration-rated housings for critical applications.
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Single & Multi Turn",
                  "±0.5% Linearity",
                  "Defence Rated",
                  "Ganged Options",
                  "−55°C to +125°C",
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

            <div className="flex flex-col gap-3">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.45, delay: 0, ease: [0.23, 1, 0.32, 1] }}
              >
                <button
                  type="button"
                  className="relative flex h-48 w-full cursor-pointer items-center justify-center overflow-hidden rounded-2xl border border-border bg-white p-3 text-left transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:h-52"
                  onClick={() => setLightbox("/assets/servo-section-02.png")}
                  aria-label="View full screen: ETCC servo and standard potentiometer lineup"
                >
                  <TunerOverlay
                    index={0}
                    initialPos={potImageFraming[0].pos}
                    initialScale={potImageFraming[0].scale}
                    enabled={tuner.enabled}
                    onUpdate={tuner.handleUpdate}
                  />
                  <img
                    src="/assets/servo-section-02.png"
                    alt="ETCC wire-wound servo and standard potentiometers — product lineup on white"
                    className={`relative z-10 max-h-full w-full object-contain object-center ${potImageExifClass(true)}`}
                    style={tuner.getStyle(0, potImageFraming[0].pos, potImageFraming[0].scale)}
                    loading="lazy"
                  />
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.45, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
              >
                <button
                  type="button"
                  className="relative flex h-48 w-full cursor-pointer items-center justify-center overflow-hidden rounded-2xl border border-border bg-white p-3 text-left transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:h-52"
                  onClick={() => setLightbox("/assets/servo-section-03.png")}
                  aria-label="View full screen: ETCC ETC/SE servo potentiometer range"
                >
                  <TunerOverlay
                    index={1}
                    initialPos={potImageFraming[1].pos}
                    initialScale={potImageFraming[1].scale}
                    enabled={tuner.enabled}
                    onUpdate={tuner.handleUpdate}
                  />
                  <img
                    src="/assets/servo-section-03.png"
                    alt="ETCC ETC/SE servo potentiometer range — multiple sizes and configurations"
                    className={`relative z-10 max-h-full w-full object-contain object-center ${potImageExifClass(true)}`}
                    style={tuner.getStyle(1, potImageFraming[1].pos, potImageFraming[1].scale)}
                    loading="lazy"
                  />
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 2 — SERVO SPECS + SINGLE IMAGE + CUSTOMIZATION
         ═══════════════════════════════════════ */}
      <section id="specifications">
        <SectionSeparator label="Specifications" />
        <div className="mx-auto max-w-6xl px-6 pb-16 md:pb-20">
          <div className="grid gap-10 md:grid-cols-5 md:items-start">
            {/* Spec table — 3 cols */}
            <motion.div {...fadeUp} className="md:col-span-3">
              <h2 className="mb-3 text-3xl font-bold tracking-tighter text-foreground md:text-4xl">
                Standard Servo Potentiometers
              </h2>
              <p className="mb-5 text-base leading-relaxed text-muted-foreground">
                Our standard range of servo potentiometers for position feedback
                in servo systems, robotics, and precision instrumentation.
              </p>

              <SpecificationTable
                columns={servoColumns}
                data={servoData}
                caption="Standard servo potentiometer specifications"
                collapsedRows={8}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
              className="relative flex md:col-span-2"
            >
              <button
                type="button"
                className="relative mx-auto flex w-full max-w-md flex-1 cursor-pointer items-center justify-center overflow-hidden rounded-2xl border border-border bg-white p-6 text-left transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:mx-0 md:ml-auto"
                onClick={() => setLightbox("/assets/servo-standard-single.png")}
                aria-label="View full screen: ETC/SE 50.5 single-turn servo potentiometer"
              >
                <TunerOverlay
                  index={2}
                  initialPos={potImageFraming[2].pos}
                  initialScale={potImageFraming[2].scale}
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
                  src="/assets/servo-standard-single.png"
                  alt="ETC/SE 50.5 single-turn wire-wound servo potentiometer — 5 kΩ, ±5% tolerance, ±1% linearity"
                  className={`relative z-10 w-full object-contain ${potImageExifClass(true)}`}
                  style={tuner.getStyle(2, potImageFraming[2].pos, potImageFraming[2].scale)}
                  loading="lazy"
                />
              </button>
            </motion.div>
          </div>

          {/* Customization CTA card — matching linear pot page style */}
          <motion.div {...fadeUp} className="mt-12 w-full">
            <div className="relative overflow-hidden rounded-2xl bg-white shadow-card dark:shadow-card">
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 z-20 rounded-2xl shiny-conic-border"
              />
              <div className="relative z-10 rounded-[calc(1rem-1.5px)] bg-white px-5 py-6 md:px-7 md:py-7 m-[1.5px]">
                <div className="relative max-w-full">
                  <h3 className="text-2xl font-bold tracking-tighter text-slate-900 md:text-3xl">
                    Need a custom servo potentiometer?
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
                    We customise Mechanical Angle (MA) and Electrical Angle (EA)
                    to your exact requirements. Whether you need a non-standard
                    rotation range, a specific dead-band configuration, or
                    matched MA/EA for your servo loop — our engineering team
                    builds to your drawing.
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
                    Special executions are available including custom resistance
                    tapers, ganged multi-section assemblies, extended temperature
                    ratings, and ruggedised housings for defence and aerospace.
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
          SECTION 3 — STANDARD POTENTIOMETER RANGE
         ═══════════════════════════════════════ */}
      <section id="standard-range">
        <SectionSeparator label="Standard Potentiometer Range" />
        <div className="mx-auto max-w-6xl px-6 pb-16 md:pb-20">
          <div className="grid gap-10 md:grid-cols-2 md:items-start">
            {/* Table left */}
            <motion.div {...fadeUp}>
              <h2 className="mb-3 text-3xl font-bold tracking-tighter text-foreground md:text-4xl">
                Standard Potentiometer Range
              </h2>
              <p className="mb-5 text-base leading-relaxed text-muted-foreground">
                Standard and ganged wire wound potentiometers — available in
                single-section and multi-section configurations. All units use
                precision wire wound elements on ceramic or anodised formers.
              </p>

              <SpecificationTable
                columns={standardPotColumns}
                data={standardPotData}
                caption="ETCC standard and ganged potentiometer range"
              />
            </motion.div>

            {/* Images right — 3 product images */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
              className="flex flex-col gap-4"
            >
              <button
                type="button"
                className="relative flex min-h-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-2xl border border-border bg-card p-6 text-left transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                onClick={() => setLightbox("/assets/products-potentiometer.png")}
                aria-label="View full screen: ETCC standard wire wound potentiometers"
              >
                <TunerOverlay
                  index={3}
                  initialPos={potImageFraming[3].pos}
                  initialScale={potImageFraming[3].scale}
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
                  src="/assets/products-potentiometer.png"
                  alt="ETCC standard wire wound potentiometers — 3 models"
                  className={`relative z-10 w-full max-h-48 object-contain mix-blend-multiply ${potImageExifClass(true)}`}
                  style={tuner.getStyle(3, potImageFraming[3].pos, potImageFraming[3].scale)}
                  loading="lazy"
                />
              </button>
              <button
                type="button"
                className="relative flex min-h-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-2xl border border-border bg-card p-6 text-left transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                onClick={() => setLightbox("/assets/ganged-potentiometer.png")}
                aria-label="View full screen: ETCC ganged potentiometer assembly"
              >
                <TunerOverlay
                  index={4}
                  initialPos={potImageFraming[4].pos}
                  initialScale={potImageFraming[4].scale}
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
                  src="/assets/ganged-potentiometer.png"
                  alt="ETCC ganged dual-section potentiometer assembly"
                  className={`relative z-10 w-full max-h-48 object-contain mix-blend-multiply ${potImageExifClass(true)}`}
                  style={tuner.getStyle(4, potImageFraming[4].pos, potImageFraming[4].scale)}
                  loading="lazy"
                />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CUSTOM SOLUTIONS
         ═══════════════════════════════════════ */}
      <section id="custom">
        <SectionSeparator label="Custom Solutions" />
        <div className="mx-auto max-w-6xl px-6 pb-16 md:pb-20">
          <motion.div {...fadeUp}>
            <h2 className="mb-4 text-3xl font-bold tracking-tighter text-foreground md:text-4xl">
              Custom Potentiometer Solutions
            </h2>
            <p className="mb-10 max-w-3xl text-base leading-relaxed text-muted-foreground">
              We manufacture potentiometers to your exact requirements. Our
              engineering team specialises in precision resistance components
              for demanding applications.
            </p>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {customCards.map((card, i) => {
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
              Request a Quote
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      {lightbox && (
        <ImageLightbox
          src={lightbox}
          images={potentiometerGalleryImages}
          onClose={() => setLightbox(null)}
          onNavigate={(src) => setLightbox(src)}
        />
      )}

      <QuoteModal
        open={quoteOpen}
        onOpenChange={setQuoteOpen}
        defaultCategory="Potentiometers"
      />
    </Layout>
  );
};

export default Potentiometers;
