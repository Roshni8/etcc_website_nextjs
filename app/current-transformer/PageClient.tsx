"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  X,
  Gauge,
  Radio,
  Factory,
  Sun,
  Building2,
  ShieldCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import QuoteModal from "@/components/QuoteModal";
import { useImageTuner, TunerToggle, TunerOverlay } from "@/components/dev/ImageTuner";
import { DotPattern } from "@/components/ui/dot-pattern";

/* ════════════════════════════════════════════
   DATA — STANDARD WOUND CTs
   ════════════════════════════════════════════ */

const standardSummaryRows = [
  { spec: "Primary Current", value: "50mA – 2000A" },
  { spec: "Secondary Current", value: "5mA – 5A" },
  { spec: "Accuracy Class", value: "0.5 (metering) / 1.0 (protection)" },
  { spec: "Burden Range", value: "0.25 VA – 50VA" },
  { spec: "Insulation Level", value: "0.72kV (standard), up to 3.6kV" },
  { spec: "Configuration", value: "Window (ring-type) & wound primary" },
  { spec: "Standards", value: "IEC 61869-2 / IS 2705" },
];

/* ════════════════════════════════════════════
   DATA — FLEXIBLE CTs (Rogowski Coils)
   ════════════════════════════════════════════ */

const flexSummaryRows = [
  { spec: "Measuring Range", value: "10A – 80,000A" },
  { spec: "Output Signal", value: "Integrator-ready mV output" },
  { spec: "Accuracy", value: "±1.0% across full range" },
  { spec: "Coil Type", value: "Flexible Rogowski coil, split-open design" },
  { spec: "Installation", value: "Clip-around — no circuit interruption" },
  { spec: "Applications", value: "Retrofit, large busbars, irregular conductors" },
  { spec: "Standards", value: "IEC 61869-10" },
];

/* ════════════════════════════════════════════
   DATA — APPLICATION FEATURES
   ════════════════════════════════════════════ */

const applicationFeatures: { icon: LucideIcon; title: string; desc: string; tone: { bg: string; icon: string } }[] = [
  { icon: Gauge, title: "Energy Metering", desc: "Revenue-grade current sensing for utility billing, energy auditing, and consumption monitoring in commercial and industrial installations.", tone: { bg: "bg-pink-100 dark:bg-pink-950/30", icon: "text-pink-600 dark:text-pink-400" } },
  { icon: ShieldCheck, title: "Protective Relaying", desc: "Overcurrent, earth fault, and differential protection in substations, switchgear panels, and distribution boards.", tone: { bg: "bg-blue-100 dark:bg-blue-950/30", icon: "text-blue-600 dark:text-blue-400" } },
  { icon: Radio, title: "Power Quality", desc: "Harmonic analysis, power factor correction, and real-time power quality monitoring in industrial plants and data centres.", tone: { bg: "bg-amber-100 dark:bg-amber-950/30", icon: "text-amber-700 dark:text-amber-400" } },
  { icon: Factory, title: "Motor Protection", desc: "Overload detection, locked rotor protection, and variable frequency drive feedback for electric motors in factory automation.", tone: { bg: "bg-emerald-100 dark:bg-emerald-950/30", icon: "text-emerald-700 dark:text-emerald-400" } },
  { icon: Sun, title: "Renewable Energy", desc: "Solar inverter monitoring, wind turbine generator protection, and grid-tie current metering for renewable energy installations.", tone: { bg: "bg-violet-100 dark:bg-violet-950/30", icon: "text-violet-700 dark:text-violet-400" } },
  { icon: Building2, title: "Building Management", desc: "Circuit-level sub-metering for individual floors, tenants, or equipment groups in commercial buildings and campuses.", tone: { bg: "bg-cyan-100 dark:bg-cyan-950/30", icon: "text-cyan-700 dark:text-cyan-400" } },
];

/* ════════════════════════════════════════════
   GALLERY — all images for lightbox
   ════════════════════════════════════════════ */

const galleryImages = [
  "/CT/standard/ct-01.jpg",
  "/CT/standard/ct-02.jpg",
  "/CT/standard/ct-03.jpg",
  "/CT/standard/ct-04.jpg",
];

/* ════════════════════════════════════════════
   LIGHTBOX — with prev/next, arrow keys, swipe
   ════════════════════════════════════════════ */

const Lightbox = ({
  src,
  images,
  onClose,
  onNavigate,
}: {
  src: string;
  images: string[];
  onClose: () => void;
  onNavigate: (src: string) => void;
}) => {
  const [visible, setVisible] = useState(false);
  const touchStart = useRef<number | null>(null);
  const currentIndex = images.indexOf(src);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < images.length - 1;

  const close = useCallback(() => {
    setVisible(false);
    setTimeout(onClose, 200);
  }, [onClose]);

  const goPrev = useCallback(() => {
    if (hasPrev) onNavigate(images[currentIndex - 1]);
  }, [hasPrev, currentIndex, images, onNavigate]);

  const goNext = useCallback(() => {
    if (hasNext) onNavigate(images[currentIndex + 1]);
  }, [hasNext, currentIndex, images, onNavigate]);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [close, goPrev, goNext]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(diff) > 60) {
      if (diff > 0) goPrev();
      else goNext();
    }
    touchStart.current = null;
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8"
      onClick={close}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        backgroundColor: visible ? "rgba(0,0,0,0.92)" : "rgba(0,0,0,0)",
        backdropFilter: "blur(8px)",
        transition: "background-color 200ms ease",
      }}
    >
      <button
        onClick={(e) => { e.stopPropagation(); close(); }}
        className="absolute right-4 top-4 z-[210] flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 active:bg-white/30 sm:right-6 sm:top-6"
        aria-label="Close"
        style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
      >
        <X className="h-5 w-5" />
      </button>

      {hasPrev && (
        <button
          onClick={(e) => { e.stopPropagation(); goPrev(); }}
          className="absolute left-3 top-1/2 z-[210] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 sm:left-6"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      )}

      {hasNext && (
        <button
          onClick={(e) => { e.stopPropagation(); goNext(); }}
          className="absolute right-3 top-1/2 z-[210] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 sm:right-6"
          aria-label="Next image"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      )}

      <img
        src={src}
        alt=""
        className="max-h-[85vh] max-w-full object-contain sm:max-h-[90vh] sm:max-w-[90vw]"
        onClick={(e) => e.stopPropagation()}
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "scale(1)" : "scale(0.95)",
          transition: "opacity 200ms ease, transform 200ms ease",
        }}
      />

      <p
        className="absolute bottom-6 left-0 right-0 text-center text-xs text-white/50"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 300ms ease 500ms",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
        }}
      >
        {currentIndex + 1} / {images.length}
        <span className="ml-3 sm:hidden">Swipe to navigate</span>
      </p>
    </div>
  );
};

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

interface SectionSeparatorProps {
  label: string;
}

const SectionSeparator = ({ label }: SectionSeparatorProps) => (
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
   PAGE COMPONENT
   ════════════════════════════════════════════ */

const CurrentTransformers = () => {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const tuner = useImageTuner();

  return (
    <Layout>
      <TunerToggle enabled={tuner.enabled} onToggle={tuner.toggle} />

      {/* ═══════════════════════════════════════
          SECTION 1 — HERO
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
              Metering &amp; Protection
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tighter text-foreground md:text-6xl animate-fade-in-up animation-delay-100">
              Current Transformers
              <br />
              — 50A to 5000A
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground animate-fade-in-up animation-delay-200">
              Precision LT current transformers for energy metering and
              protective relaying — available as standard wound ring-type CTs
              and flexible Rogowski coils. Manufactured in Pune since 1994,
              tested to IEC 61869-2 and IS 2705.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 2 — STANDARD WOUND CTs
          Text left + Bento grid right
         ═══════════════════════════════════════ */}
      <section id="standard">
        <SectionSeparator label="Standard Wound CTs" />

        <div className="mx-auto max-w-6xl px-6 pb-16 md:pb-20">
          <div className="grid gap-10 lg:grid-cols-[1fr,1.4fr] lg:items-start">
            {/* LEFT: Text */}
            <motion.div {...fadeUp} className="lg:sticky lg:top-24 lg:self-start">
              <h2 className="mb-4 text-3xl font-bold tracking-tighter text-foreground md:text-4xl">
                Wound Current Transformers
              </h2>
              <p className="mb-5 text-base leading-relaxed text-muted-foreground">
                Our standard wound CTs use precision-wound CRGO silicon steel
                toroidal cores for accurate current measurement and reliable
                fault detection. Available in window (ring-type) and wound
                primary configurations, covering 50A to 2000A primary current
                with 5A secondary output. Each unit is individually tested for
                ratio accuracy, burden performance, and insulation integrity.
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Metering Class 0.5",
                  "Protection Class 1.0",
                  "Window & Wound",
                  "5A Secondary",
                  "IEC 61869-2",
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

            {/* RIGHT: Bento Grid */}
            <div
              className="grid gap-2 sm:grid-cols-3"
              style={{ gridTemplateRows: "220px 200px" }}
            >
              {/* Tall left (row 1–2, col 1) */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.45, delay: 0, ease: [0.23, 1, 0.32, 1] }}
                className="relative overflow-hidden rounded-2xl border border-border bg-card sm:row-span-2"
              >
                <TunerOverlay index={0} initialPos="50% 50%" initialScale={0.8} enabled={tuner.enabled} onUpdate={tuner.handleUpdate} />
                <img
                  src="/CT/standard/ct-01.jpg"
                  alt="Wound current transformer — ETCC India"
                  className="w-full h-full object-cover mix-blend-multiply cursor-pointer"
                  style={tuner.getStyle(0, "50% 50%", 0.8)}
                  onClick={() => setLightbox("/CT/standard/ct-01.jpg")}
                />
              </motion.div>

              {/* Wide top (row 1, col 2–3) */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.45, delay: 0.08, ease: [0.23, 1, 0.32, 1] }}
                className="relative overflow-hidden rounded-2xl border border-border bg-card sm:col-span-2"
              >
                <TunerOverlay index={1} initialPos="50% 60%" initialScale={1.05} enabled={tuner.enabled} onUpdate={tuner.handleUpdate} />
                <img
                  src="/CT/standard/ct-02.jpg"
                  alt="Current transformer assortment — standard and flexible CTs"
                  className="w-full h-full object-cover mix-blend-multiply cursor-pointer"
                  style={tuner.getStyle(1, "50% 60%", 1.05)}
                  onClick={() => setLightbox("/CT/standard/ct-02.jpg")}
                />
              </motion.div>

              {/* Small middle (row 2, col 2) */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.45, delay: 0.16, ease: [0.23, 1, 0.32, 1] }}
                className="relative overflow-hidden rounded-2xl border border-border bg-card"
              >
                <TunerOverlay index={2} initialPos="43% 55%" initialScale={0.8} enabled={tuner.enabled} onUpdate={tuner.handleUpdate} />
                <img
                  src="/CT/standard/ct-03.jpg"
                  alt="Flexible current transformer (Rogowski coil) — ETCC India"
                  className="w-full h-full object-cover mix-blend-multiply cursor-pointer"
                  style={tuner.getStyle(2, "43% 55%", 0.8)}
                  onClick={() => setLightbox("/CT/standard/ct-03.jpg")}
                />
              </motion.div>

              {/* Tall right (row 2, col 3) */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.45, delay: 0.24, ease: [0.23, 1, 0.32, 1] }}
                className="relative overflow-hidden rounded-2xl border border-border bg-card"
              >
                <TunerOverlay index={3} initialPos="50% 50%" initialScale={0.85} enabled={tuner.enabled} onUpdate={tuner.handleUpdate} />
                <img
                  src="/CT/standard/ct-04.jpg"
                  alt="Current transformer range — stacked units"
                  className="w-full h-full object-cover mix-blend-multiply cursor-pointer"
                  style={tuner.getStyle(3, "50% 50%", 0.85)}
                  onClick={() => setLightbox("/CT/standard/ct-04.jpg")}
                />
              </motion.div>

            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 3 — STANDARD RANGE + SPECS
         ═══════════════════════════════════════ */}
      <section id="standard-range">
        <SectionSeparator label="Standard Range" />
        <div className="mx-auto max-w-6xl px-6 pb-16 md:pb-20">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            {/* Text left */}
            <motion.div {...fadeUp}>
              <h2 className="mb-3 text-3xl font-bold tracking-tighter text-foreground md:text-4xl">
                Standard Wound CT Range
              </h2>
              <p className="mb-5 text-base leading-relaxed text-muted-foreground">
                Our standard range covers the most common current ratios from
                50/5A to 2000/5A. Metering class 0.5 accuracy for revenue-grade
                measurement, and protection class 1.0 for relay circuits.
                All units carry ETCC labelling with full ratio and burden
                specifications.
              </p>

              <div className="overflow-hidden rounded-xl border border-border bg-card">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-secondary">
                      <th className="px-4 py-2.5 text-left text-xs font-semibold text-foreground">
                        Specification
                      </th>
                      <th className="px-4 py-2.5 text-left text-xs font-semibold text-foreground">
                        Value
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {standardSummaryRows.map((row, i) => (
                      <tr
                        key={row.spec}
                        className={`border-b border-border last:border-0 ${
                          i % 2 === 0 ? "bg-card" : "bg-secondary/50"
                        }`}
                      >
                        <td className="px-4 py-2.5 font-medium text-foreground whitespace-nowrap">
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
              className="relative overflow-hidden rounded-2xl border border-border bg-card flex items-center justify-center p-4"
            >
              <DotPattern
                width={12}
                height={12}
                cr={0.5}
                className="text-neutral-400/40 dark:text-neutral-500/30 [mask-image:radial-gradient(ellipse_at_center,white_60%,transparent_90%)]"
              />
              <img
                src="/CT/standard/current-transformer-range.jpg"
                alt="ETCC standard wound current transformer range — 50A to 2000A primary current"
                className="relative z-10 w-full max-h-[380px] object-contain mix-blend-multiply cursor-pointer"
                onClick={() => setLightbox("/CT/standard/current-transformer-range.jpg")}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 4 — FLEXIBLE CTs (Rogowski Coils)
         ═══════════════════════════════════════ */}
      <section id="flexible">
        <SectionSeparator label="Flexible Current Transformers" />
        <div className="mx-auto max-w-6xl px-6 pb-16 md:pb-20">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            {/* Image left */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="relative overflow-hidden rounded-2xl border border-border bg-card flex items-center justify-center p-4"
            >
              <DotPattern
                width={12}
                height={12}
                cr={0.5}
                className="text-neutral-400/40 dark:text-neutral-500/30 [mask-image:radial-gradient(ellipse_at_center,white_60%,transparent_90%)]"
              />
              <img
                src="/CT/flexible/flexible-current-transformer.jpg"
                alt="Flexible Rogowski coil current transformer — clip-around design for retrofit installation without circuit interruption"
                className="relative z-10 w-full max-h-[380px] object-contain mix-blend-multiply cursor-pointer"
                onClick={() => setLightbox("/CT/flexible/flexible-current-transformer.jpg")}
              />
            </motion.div>

            {/* Text right */}
            <motion.div {...fadeUp}>
              <h2 className="mb-3 text-3xl font-bold tracking-tighter text-foreground md:text-4xl">
                Flexible CTs &amp; Rogowski Coils
              </h2>
              <p className="mb-5 text-base leading-relaxed text-muted-foreground">
                Our flexible current transformers use Rogowski coil technology —
                a split-open, clip-around design that installs without
                interrupting the circuit. Ideal for retrofit metering on large
                busbars, irregular conductor shapes, and tight panel spaces
                where rigid CTs cannot fit. Covers 10A to 5000A with ±1.0%
                accuracy across the full measuring range.
              </p>

              <div className="overflow-hidden rounded-xl border border-border bg-card">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-secondary">
                      <th className="px-4 py-2.5 text-left text-xs font-semibold text-foreground">
                        Specification
                      </th>
                      <th className="px-4 py-2.5 text-left text-xs font-semibold text-foreground">
                        Value
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {flexSummaryRows.map((row, i) => (
                      <tr
                        key={row.spec}
                        className={`border-b border-border last:border-0 ${
                          i % 2 === 0 ? "bg-card" : "bg-secondary/50"
                        }`}
                      >
                        <td className="px-4 py-2.5 font-medium text-foreground whitespace-nowrap">
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

              <div className="mt-5 flex flex-wrap gap-2">
                {[
                  "Rogowski Coil",
                  "Split-Core",
                  "Clip-Around",
                  "No Circuit Break",
                  "IEC 61869-10",
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
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 5 — APPLICATIONS
         ═══════════════════════════════════════ */}
      <section id="applications">
        <SectionSeparator label="CT Applications &amp; Industries" />
        <div className="mx-auto max-w-6xl px-6 pb-16 md:pb-20">
          <motion.div {...fadeUp}>
            <h2 className="mb-4 text-3xl font-bold tracking-tighter text-foreground md:text-4xl">
              Where Our CTs Are Used
            </h2>
            <p className="mb-10 max-w-3xl text-base leading-relaxed text-muted-foreground">
              ETCC current transformers serve critical measurement and
              protection roles across power distribution, industrial automation,
              renewable energy, and building management — designed and tested to
              IEC 61869-2 and IS 2705.
            </p>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {applicationFeatures.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
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
                  <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg ${feature.tone.bg}`}>
                    <Icon className={`h-5 w-5 ${feature.tone.icon}`} />
                  </div>
                  <p className="mb-2 text-sm font-semibold text-foreground">
                    {feature.title}
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {feature.desc}
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

      {/* ── Lightbox ── */}
      {lightbox && (
        <Lightbox
          src={lightbox}
          images={galleryImages}
          onClose={() => setLightbox(null)}
          onNavigate={(src) => setLightbox(src)}
        />
      )}

      <QuoteModal
        open={quoteOpen}
        onOpenChange={setQuoteOpen}
        defaultCategory="Current Transformers"
      />
    </Layout>
  );
};

export default CurrentTransformers;
