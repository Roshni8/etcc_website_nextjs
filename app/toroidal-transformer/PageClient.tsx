"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  Zap,
  Activity,
  Plug,
  GitFork,
  Thermometer,
  Cable,
  Box,
  Lock,
  ShieldCheck,
  Target,
  Paintbrush,
  Wrench,
  Flame,
  Layers,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import SpecificationTable from "@/components/SpecificationTable";
import QuoteModal from "@/components/QuoteModal";
import { useImageTuner, TunerToggle, TunerOverlay } from "@/components/dev/ImageTuner";
import { DotPattern } from "@/components/ui/dot-pattern";

/* ════════════════════════════════════════════
   DATA
   ════════════════════════════════════════════ */

const customisationRows: { icon: LucideIcon; param: string; detail: string }[] = [
  { icon: Zap, param: "Power Rating", detail: "10VA to 3000VA" },
  { icon: Activity, param: "Frequency", detail: "50Hz, 60Hz, 400Hz, 1kHz–10kHz" },
  { icon: Plug, param: "Primary Voltage", detail: "Any voltage — single or multiple primaries" },
  { icon: GitFork, param: "Secondary Windings", detail: "Single, dual, centre-tapped, or up to 12+ multi-tap outputs" },
  { icon: Layers, param: "Core Material", detail: "CRGO (Cold Rolled Grain Oriented) silicon steel, ferrite core, nanocrystalline" },
  { icon: Thermometer, param: "Insulation Class", detail: "Class F (155°C) through Class H (180°C), up to 200°C" },
  { icon: Flame, param: "Thermal Protection", detail: "Thermal fuse (one-time cutoff) or thermal switch (resettable over-temperature protection)" },
  { icon: Cable, param: "Termination", detail: "Flying leads, PCB pins, screw terminals, bolt mount" },
  { icon: Box, param: "Form Factor", detail: "Standard toroidal, PCB mount, open frame" },
  { icon: Lock, param: "Enclosure", detail: "Open wound, varnish impregnated, epoxy potted, IP-rated" },
  { icon: ShieldCheck, param: "Electrostatic Shield", detail: "Available between primary and secondary" },
  { icon: Target, param: "Regulation", detail: "Down to 1% voltage regulation" },
  { icon: Paintbrush, param: "Lead Colours & Length", detail: "Custom colour-coding and lengths to your harness spec" },
  { icon: Wrench, param: "Prototypes", detail: "Small quantities accepted — no minimum run required" },
];

const standardSpecRows = [
  { spec: "Power Range", value: "10VA – 3000VA" },
  { spec: "Input Voltage", value: "230V AC (50/60Hz) standard" },
  { spec: "Output Voltage", value: "Multiple standard secondaries available" },
  { spec: "Insulation Class", value: "Class F (155°C)" },
  { spec: "Regulation", value: "±5% voltage regulation" },
  { spec: "Lead Type", value: "Colour-coded flying leads" },
  { spec: "Label", value: "Full winding spec printed on body" },
];

const specColumns = [
  { key: "va_nominal", label: "VA (Nominal)" },
  { key: "va_max", label: "VA (Maximum)" },
  { key: "magnetic_path", label: "Magnetic Path (cm)" },
  { key: "size", label: "Approx Size OD × Height (mm)" },
  { key: "primary_volt", label: "Primary Voltage" },
];

const specData = [
  { va_nominal: "10", va_max: "17", magnetic_path: "14.14", size: "65 × 25", primary_volt: "0–230V AC" },
  { va_nominal: "15", va_max: "22", magnetic_path: "14.14", size: "65 × 30", primary_volt: "0–230V AC" },
  { va_nominal: "25", va_max: "31", magnetic_path: "15.71", size: "70 × 30", primary_volt: "0–230V AC" },
  { va_nominal: "30", va_max: "38", magnetic_path: "16.49", size: "75 × 30", primary_volt: "0–230V AC" },
  { va_nominal: "50", va_max: "62", magnetic_path: "18.85", size: "90 × 32", primary_volt: "0–230V AC" },
  { va_nominal: "75", va_max: "85", magnetic_path: "19.63", size: "90 × 38", primary_volt: "0–230V AC" },
  { va_nominal: "90", va_max: "103", magnetic_path: "19.63", size: "90 × 45", primary_volt: "0–230V AC" },
  { va_nominal: "150", va_max: "170", magnetic_path: "21.99", size: "100 × 50", primary_volt: "0–230V AC" },
  { va_nominal: "200", va_max: "232", magnetic_path: "24.35", size: "110 × 50", primary_volt: "0–230V AC" },
  { va_nominal: "250", va_max: "280", magnetic_path: "25.13", size: "115 × 58", primary_volt: "0–230V AC" },
  { va_nominal: "300", va_max: "355", magnetic_path: "25.92", size: "117 × 60", primary_volt: "0–230V AC" },
  { va_nominal: "350", va_max: "394", magnetic_path: "26.07", size: "125 × 60", primary_volt: "0–230V AC" },
  { va_nominal: "400", va_max: "434", magnetic_path: "27.49", size: "130 × 60", primary_volt: "0–230V AC" },
  { va_nominal: "500", va_max: "556", magnetic_path: "29.85", size: "140 × 65", primary_volt: "0–230V AC" },
  { va_nominal: "600", va_max: "644", magnetic_path: "31.42", size: "145 × 65", primary_volt: "0–230V AC" },
  { va_nominal: "750", va_max: "806", magnetic_path: "33.77", size: "160 × 65", primary_volt: "0–230V AC" },
  { va_nominal: "900", va_max: "1028", magnetic_path: "35.34", size: "165 × 70", primary_volt: "0–230V AC" },
  { va_nominal: "1000", va_max: "1281", magnetic_path: "36.92", size: "175 × 75", primary_volt: "0–230V AC" },
  { va_nominal: "1200", va_max: "1281", magnetic_path: "36.92", size: "175 × 75", primary_volt: "0–230V AC" },
  { va_nominal: "1400", va_max: "1476", magnetic_path: "40.85", size: "200 × 70", primary_volt: "0–230V AC" },
  { va_nominal: "1650", va_max: "1761", magnetic_path: "42.41", size: "205 × 75", primary_volt: "0–230V AC" },
  { va_nominal: "2100", va_max: "2230", magnetic_path: "42.41", size: "215 × 90", primary_volt: "0–230V AC" },
  { va_nominal: "2400", va_max: "2518", magnetic_path: "43.99", size: "220 × 90", primary_volt: "0–230V AC" },
  { va_nominal: "3000", va_max: "3128", magnetic_path: "46.34", size: "235 × 95", primary_volt: "0–230V AC" },
];

const ctaFeatures = [
  { title: "400Hz Aerospace Grade", desc: "Built to 400Hz military power specifications for airborne instruments, radar, and defence electronics." },
  { title: "Nanocrystalline Core", desc: "Advanced nanocrystalline core option for high-frequency, low-loss applications up to 10kHz." },
  { title: "Electrostatic Shielding", desc: "Copper foil shield between primary and secondary for EMI suppression and noise isolation." },
  { title: "50Hz to 10kHz Range", desc: "Standard 50/60Hz power to high-frequency 10kHz designs — all wound and tested in-house." },
  { title: "Multi-Tap Windings", desc: "Single, dual, centre-tapped, or up to 12+ configurable secondary outputs per unit." },
  { title: "Thermal Protection", desc: "Integrated thermal fuse or resettable thermal switch for reliable over-temperature cutoff." },
];

/* All gallery images for lightbox navigation */
const galleryImages = [
  "/assets/custom-transformer-assorted.jpg",
  "/assets/custom-transformer-group.jpg",
  "/assets/custom-transformer-single.jpg",
  "/assets/custom-transformer-400hz.jpg",
  "/assets/custom-transformer-range.jpg",
  "/assets/custom-transformer-pcb.jpg",
  "/assets/toroidal-range.jpg",
  "/assets/toroidal-single.jpg",
  "/assets/toroidal-transformer-standard.png",
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

      {/* Prev button */}
      {hasPrev && (
        <button
          onClick={(e) => { e.stopPropagation(); goPrev(); }}
          className="absolute left-3 top-1/2 z-[210] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 sm:left-6"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      )}

      {/* Next button */}
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

      {/* Image counter */}
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
   Editorial dotted-line divider with full-width
   hairline and content-area circular dots.
   ════════════════════════════════════════════ */

interface SectionSeparatorProps {
  label: string;
}

const SectionSeparator = ({ label }: SectionSeparatorProps) => (
  <div className="overflow-hidden">
    <div className="h-16" />
    <div className="relative mx-auto max-w-6xl px-6">
      <div className="relative h-[2px]">
        {/* Left solid line — viewport edge → content edge */}
        <div
          className="absolute top-0 h-px"
          style={{
            left: "calc(50% - 50vw)",
            width: "calc(50vw - 50% - 6px)",
            backgroundColor: "hsl(var(--foreground) / 0.08)",
          }}
        />
        {/* Centre — circular dots across content area */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[2px]"
          style={{
            backgroundImage:
              "repeating-radial-gradient(circle, hsl(var(--foreground) / 0.6) 0px, hsl(var(--foreground) / 0.6) 1px, transparent 1px, transparent 6px)",
            backgroundSize: "6px 100%",
          }}
        />
        {/* Right solid line — content edge → viewport edge */}
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
    <div className="h-16" />
  </div>
);

/* ════════════════════════════════════════════
   PAGE COMPONENT
   ════════════════════════════════════════════ */

const ToroidalTransformers = () => {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const tuner = useImageTuner();

  return (
    <Layout>
      {/* Dev-only image tuner toggle */}
      <TunerToggle enabled={tuner.enabled} onToggle={tuner.toggle} />

      {/* ═══════════════════════════════════════
          SECTION 1 — HERO
         ═══════════════════════════════════════ */}
      <section className="relative overflow-hidden py-20 md:py-32">
        {/* Dot pattern background */}
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
              Custom Transformers
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tighter text-foreground md:text-6xl animate-fade-in-up animation-delay-100">
              Toroidal Power Transformers
              <br />
              — 50Hz to 10kHz
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground animate-fade-in-up animation-delay-200">
              Precision-wound toroidal transformers built to your exact
              specification — including defence-grade 400Hz designs for aerospace
              and military applications. Manufactured in Pune since 1994.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 2 — CUSTOM TRANSFORMERS
          Text left + Bento grid right
         ═══════════════════════════════════════ */}
      <section id="custom">
        <SectionSeparator label="Defence & Aerospace" />

        <div className="mx-auto max-w-6xl px-6 pb-16 md:pb-20">
          <div className="grid gap-10 lg:grid-cols-[1fr,1.4fr] lg:items-start">
            {/* ── LEFT: Text ── */}
            <motion.div {...fadeUp} className="lg:sticky lg:top-24 lg:self-start">
              <h2 className="mb-4 text-3xl font-bold tracking-tighter text-foreground md:text-4xl">
                Defence &amp; Aerospace Grade
              </h2>
              <p className="mb-5 text-base leading-relaxed text-muted-foreground">
                Built to 400Hz military power specifications. Used in airborne
                instruments, radar systems, and defence electronics where size,
                weight, and thermal performance are critical. Every unit wound
                and tested in-house.
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "400Hz",
                  "MIL-spec winding",
                  "Lightweight core",
                  "Custom numbered taps",
                  "Prototype to production",
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

            {/* ── RIGHT: Bento Grid ── */}
            <div
              className="grid gap-2 sm:grid-cols-3"
              style={{
                gridTemplateRows: "200px 180px 180px",
              }}
            >
              {/* C7 — tall left (row 1–2, col 1); horizontal on mobile */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.45, delay: 0, ease: [0.23, 1, 0.32, 1] }}
                className="relative overflow-hidden rounded-2xl border border-border bg-card col-span-full sm:col-span-1 sm:row-span-2"
              >
                <TunerOverlay index={0} initialPos="37% 84%" initialScale={0.80} enabled={tuner.enabled} onUpdate={tuner.handleUpdate} />
                <div
                  className="absolute inset-0 sm:inset-[-25%] flex items-center justify-center sm:[rotate:270deg]"
                >
                  <img
                    src="/assets/custom-transformer-assorted.jpg"
                    alt="Assorted custom transformers — PCB mount, potted, and open-wound"
                    className="w-full h-full object-cover mix-blend-multiply cursor-pointer"
                    style={tuner.getStyle(0, "37% 84%", 0.80)}
                    onClick={() => setLightbox("/assets/custom-transformer-assorted.jpg")}
                  />
                </div>
              </motion.div>

              {/* C1 — wide top (row 1, col 2–3) */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.45, delay: 0.08, ease: [0.23, 1, 0.32, 1] }}
                className="relative overflow-hidden rounded-2xl border border-border bg-card sm:col-span-2"
              >
                <TunerOverlay index={1} initialPos="49% 95%" initialScale={1.05} enabled={tuner.enabled} onUpdate={tuner.handleUpdate} />
                <img
                  src="/assets/custom-transformer-group.jpg"
                  alt="Full range of ETCC custom transformers — defence, PCB, and toroidal"
                  className="w-full h-full object-cover mix-blend-multiply cursor-pointer"
                  style={tuner.getStyle(1, "49% 95%", 1.05)}
                  onClick={() => setLightbox("/assets/custom-transformer-group.jpg")}
                />
              </motion.div>

              {/* C5 — small middle (row 2, col 2) */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.45, delay: 0.16, ease: [0.23, 1, 0.32, 1] }}
                className="relative overflow-hidden rounded-2xl border border-border bg-card"
              >
                <TunerOverlay index={2} initialPos="49% 68%" initialScale={1.15} enabled={tuner.enabled} onUpdate={tuner.handleUpdate} />
                <img
                  src="/assets/custom-transformer-single.jpg"
                  alt="Single potted toroidal transformer with flying leads"
                  className="w-full h-full object-cover mix-blend-multiply cursor-pointer"
                  style={tuner.getStyle(2, "49% 68%", 1.15)}
                  onClick={() => setLightbox("/assets/custom-transformer-single.jpg")}
                />
              </motion.div>

              {/* C3 — tall right (row 2–3, col 3) */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.45, delay: 0.24, ease: [0.23, 1, 0.32, 1] }}
                className="relative overflow-hidden rounded-2xl border border-border bg-card sm:row-span-2"
              >
                <TunerOverlay index={3} initialPos="44% 61%" initialScale={0.85} enabled={tuner.enabled} onUpdate={tuner.handleUpdate} />
                <img
                  src="/assets/custom-transformer-400hz.jpg"
                  alt="400Hz defence transformer with numbered tap terminals"
                  className="w-full h-full object-cover mix-blend-multiply cursor-pointer"
                  style={tuner.getStyle(3, "44% 61%", 0.85)}
                  onClick={() => setLightbox("/assets/custom-transformer-400hz.jpg")}
                />
              </motion.div>

              {/* C6 — bottom left (row 3, col 1) */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.45, delay: 0.32, ease: [0.23, 1, 0.32, 1] }}
                className="relative overflow-hidden rounded-2xl border border-border bg-card"
              >
                <TunerOverlay index={4} initialPos="55% 70%" initialScale={0.90} enabled={tuner.enabled} onUpdate={tuner.handleUpdate} />
                <img
                  src="/assets/custom-transformer-range.jpg"
                  alt="Three toroidal transformers — small, medium, and large"
                  className="w-full h-full object-cover mix-blend-multiply cursor-pointer"
                  style={tuner.getStyle(4, "55% 70%", 0.90)}
                  onClick={() => setLightbox("/assets/custom-transformer-range.jpg")}
                />
              </motion.div>

              {/* C4 — bottom middle (row 3, col 2) */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.45, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
                className="relative overflow-hidden rounded-2xl border border-border bg-card"
              >
                <TunerOverlay index={5} initialPos="50% 55%" initialScale={1.40} enabled={tuner.enabled} onUpdate={tuner.handleUpdate} />
                <img
                  src="/assets/custom-transformer-pcb.jpg"
                  alt="PCB mount toroidal transformer with through-hole pins"
                  className="w-full h-full object-cover mix-blend-multiply cursor-pointer"
                  style={tuner.getStyle(5, "50% 55%", 1.40)}
                  onClick={() => setLightbox("/assets/custom-transformer-pcb.jpg")}
                />
              </motion.div>
            </div>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION — CUSTOM TRANSFORMER TABLE / SPECS
         ═══════════════════════════════════════ */}
      <section>
        <SectionSeparator label="Custom transformer" />
        <div className="mx-auto max-w-6xl px-6 pb-16 md:pb-20">
          {/* Title + subtext + CTA */}
          <motion.div {...fadeUp}>
            <h2 className="mb-4 text-3xl font-bold tracking-tighter text-foreground md:text-4xl">
              Every unit built to your specification
            </h2>
            <p className="max-w-3xl text-base leading-relaxed text-muted-foreground">
              We manufacture custom toroidal transformers from 10VA to 3000VA
              with configurable frequency, voltage, winding, insulation, and
              termination options, including single, dual, centre-tapped, and
              multiple secondary outputs.
            </p>
            <Button
              onClick={() => setQuoteOpen(true)}
              className="mt-6 h-12 rounded-full bg-foreground px-8 text-sm font-medium text-background hover:bg-foreground/90"
            >
              Request a Quote
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>

          {/* Features grid: 3 left cards | DotPattern + image | 3 right cards */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            className="mt-12 md:mt-14"
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_minmax(280px,340px)_1fr] md:grid-rows-3 md:gap-4">
              {/* Centre — DotPattern grid + transformer image (first on mobile) */}
              <div className="relative flex items-center justify-center md:col-start-2 md:row-start-1 md:row-span-3 overflow-hidden py-8">
                <DotPattern
                  width={12}
                  height={12}
                  cr={0.5}
                  className="text-neutral-400/40 dark:text-neutral-500/30 [mask-image:radial-gradient(ellipse_at_center,white_60%,transparent_90%)]"
                />
                <img
                  src="/assets/toroidal-transformer-standard.png"
                  alt="ETCC standard toroidal transformer — 0-230V AC primary, colour-coded leads"
                  className="relative z-10 h-[280px] md:h-[364px] w-auto object-cover cursor-pointer"
                  style={{ objectPosition: "center 55%", mixBlendMode: "multiply" }}
                  onClick={() => setLightbox("/assets/toroidal-transformer-standard.png")}
                />
              </div>

              {/* Left col — 3 cards */}
              <div className="flex flex-col items-start border border-border rounded-lg p-3 md:col-start-1 md:row-start-1">
                <p className="text-sm font-semibold text-foreground mb-2">{ctaFeatures[0].title}</p>
                <p className="text-sm leading-relaxed text-muted-foreground">{ctaFeatures[0].desc}</p>
              </div>
              <div className="flex flex-col items-start border border-border rounded-lg p-3 md:col-start-1 md:row-start-2">
                <p className="text-sm font-semibold text-foreground mb-2">{ctaFeatures[1].title}</p>
                <p className="text-sm leading-relaxed text-muted-foreground">{ctaFeatures[1].desc}</p>
              </div>
              <div className="flex flex-col items-start border border-border rounded-lg p-3 md:col-start-1 md:row-start-3">
                <p className="text-sm font-semibold text-foreground mb-2">{ctaFeatures[2].title}</p>
                <p className="text-sm leading-relaxed text-muted-foreground">{ctaFeatures[2].desc}</p>
              </div>

              {/* Right col — 3 cards */}
              <div className="flex flex-col items-start border border-border rounded-lg p-3 md:col-start-3 md:row-start-1">
                <p className="text-sm font-semibold text-foreground mb-2">{ctaFeatures[3].title}</p>
                <p className="text-sm leading-relaxed text-muted-foreground">{ctaFeatures[3].desc}</p>
              </div>
              <div className="flex flex-col items-start border border-border rounded-lg p-3 md:col-start-3 md:row-start-2">
                <p className="text-sm font-semibold text-foreground mb-2">{ctaFeatures[4].title}</p>
                <p className="text-sm leading-relaxed text-muted-foreground">{ctaFeatures[4].desc}</p>
              </div>
              <div className="flex flex-col items-start border border-border rounded-lg p-3 md:col-start-3 md:row-start-3">
                <p className="text-sm font-semibold text-foreground mb-2">{ctaFeatures[5].title}</p>
                <p className="text-sm leading-relaxed text-muted-foreground">{ctaFeatures[5].desc}</p>
              </div>
            </div>
          </motion.div>

          {/* Customisation table — directly below grid */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            className="mt-14 overflow-hidden rounded-2xl border border-border bg-card"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-secondary">
                    <th className="px-4 py-3 text-left text-xs font-semibold text-foreground">
                      Parameter
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-foreground">
                      What we can do
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {customisationRows.map((row, i) => {
                    const Icon = row.icon;
                    return (
                      <tr
                        key={row.param}
                        className={`border-b border-border last:border-0 ${
                          i % 2 === 0 ? "bg-card" : "bg-secondary/50"
                        }`}
                      >
                        <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap">
                          <span className="inline-flex items-center gap-2">
                            <Icon className="h-4 w-4 text-muted-foreground shrink-0" />
                            {row.param}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-foreground">
                          {row.detail}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 4 — STANDARD TRANSFORMERS
         ═══════════════════════════════════════ */}
      <section>
        <SectionSeparator label="Standard Range" />
        <div className="mx-auto max-w-6xl px-6 pb-16 md:pb-20">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            {/* Text left */}
            <motion.div {...fadeUp}>
              <h2 className="mb-3 text-3xl font-bold tracking-tighter text-foreground md:text-4xl">
                Standard Toroidal Transformers
              </h2>
              <p className="mb-5 text-base leading-relaxed text-muted-foreground">
                For applications where a proven design is sufficient, our
                standard range covers the most common power and voltage
                configurations. All units carry ETCC labelling with full winding
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
                    {standardSpecRows.map((row, i) => (
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

            {/* Image right — clickable for lightbox */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
              className="overflow-hidden rounded-2xl border border-border bg-card flex items-center justify-center p-4 cursor-pointer"
              onClick={() => setLightbox("/assets/toroidal-range.jpg")}
            >
              <img
                src="/assets/toroidal-range.jpg"
                alt="Standard toroidal transformer range by ETCC India"
                className="w-full max-h-[380px] object-contain mix-blend-multiply"
              />
            </motion.div>
          </div>

          {/* ── Full specifications table ── */}
          <motion.div {...fadeUp} className="mt-14">
            <h3 className="mb-4 text-2xl font-semibold tracking-tight text-foreground">
              Standard Specifications — 24 Models
            </h3>
            <p className="mb-6 text-sm leading-relaxed text-muted-foreground max-w-2xl">
              All units manufactured with 0–230V AC primary winding and tested
              to IEC 61558 / IS 2026. Custom secondary voltages and tapping
              configurations available on request.
            </p>
            <SpecificationTable
              columns={specColumns}
              data={specData}
              caption="Standard toroidal transformer specifications — ETCC India"
              collapsedRows={8}
            />
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
        defaultCategory="Toroidal Transformers"
      />
    </Layout>
  );
};

export default ToroidalTransformers;
