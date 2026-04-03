"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  Smartphone,
  Award,
  Shield,
  Users,
  Factory,
  Cpu,
  Plane,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import QuoteModal from "@/components/QuoteModal";
import { GOOGLE_MAPS_FACTORY_URL } from "@/lib/constants";
import { useImageTuner, TunerToggle, TunerOverlay } from "@/components/dev/ImageTuner";

/* ════════════════════════════════════════════
   IMAGE — EXIF / ORIENTATION (disabled site-wide)
   ════════════════════════════════════════════ */

function aboutImageExifClass(_respectExif: boolean): string {
  // return _respectExif ? "[image-orientation:from-image]" : "[image-orientation:none]";
  return "";
}

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
   LIGHTBOX
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
   DATA — GALLERY
   · initialPos / initialScale: production crop (tune in dev via ImageTuner, like toroidal page)
   ════════════════════════════════════════════ */

type GalleryImageItem = {
  src: string;
  alt: string;
  label: string;
  initialPos: string;
  initialScale: number;
  respectExif: boolean;
};

const galleryImages: GalleryImageItem[] = [
  {
    src: "/assets/about-exhibition-booth-new.jpg",
    alt: "ETCC team at defence exhibition booth showcasing toroidal transformers, potentiometers, and electronic components",
    label: "Defence Exhibition — Booth",
    initialPos: "50% 50%",
    initialScale: 1,
    respectExif: true,
  },
  {
    src: "/assets/about-exhibition-army.jpg",
    alt: "ETCC founder presenting products to Indian Army officials at defence expo",
    label: "Indian Army Engagement",
    initialPos: "16% 15%",
    initialScale: 1.05,
    respectExif: true,
  },
  {
    src: "/assets/about-exhibition-airforce.jpg",
    alt: "ETCC founder demonstrating components to Indian Air Force officer",
    label: "Indian Air Force Review",
    initialPos: "50% 50%",
    initialScale: 1,
    respectExif: true,
  },
  {
    src: "/assets/about-exhibition-demo.jpg",
    alt: "ETCC product demonstration to Indian Army personnel at defence exhibition",
    label: "Product Demonstration",
    initialPos: "50% 50%",
    initialScale: 1,
    respectExif: true,
  },
  {
    src: "/assets/about-exhibition-solo.jpg",
    alt: "ETCC founder at exhibition booth with full product display",
    label: "Exhibition Display",
    initialPos: "50% 38%",
    initialScale: 1.4,
    respectExif: true,
  },
  {
    src: "/assets/about-factory-team.jpg",
    alt: "ETCC manufacturing team at Unit 11, Electronic Sadan, MIDC Bhosari, Pune factory",
    label: "Factory Team — Pune",
    initialPos: "50% 50%",
    initialScale: 1,
    respectExif: true,
  },
];

/** Images 2/6 and 5/6 in `galleryImages` for the Our Story section. */
const STORY_SECTION_GALLERY_INDEXES = [1, 4] as const;

const allGallerySrcs = galleryImages.map((img) => img.src);

/* ════════════════════════════════════════════
   DATA — CAPABILITY CARDS
   ════════════════════════════════════════════ */

const capabilities: {
  icon: typeof Award;
  title: string;
  desc: string;
  tone: { bg: string; icon: string };
}[] = [
  {
    icon: Shield,
    title: "Defence & Aerospace Qualified",
    desc: "Components supplied for Su-30MKI, Tejas LCA, naval systems, and ground support equipment. Every defence unit undergoes environmental screening, burn-in, and inspection to military drawing flow-down standards.",
    tone: { bg: "bg-blue-100 dark:bg-blue-950/30", icon: "text-blue-600 dark:text-blue-400" },
  },
  {
    icon: Award,
    title: "Quality-First Manufacturing",
    desc: "Each unit is individually tested for ratio accuracy, resistance grading, linearity, and insulation integrity. We maintain full lot traceability from raw material receipt to final dispatch — no sampling shortcuts.",
    tone: { bg: "bg-emerald-100 dark:bg-emerald-950/30", icon: "text-emerald-700 dark:text-emerald-400" },
  },
  {
    icon: Factory,
    title: "In-House Winding & Assembly",
    desc: "Complete vertical integration at our MIDC Bhosari facility — toroidal winding, potentiometer track laying, resistance grading, housing, potting, and final test under one roof for full process control.",
    tone: { bg: "bg-amber-100 dark:bg-amber-950/30", icon: "text-amber-700 dark:text-amber-400" },
  },
  {
    icon: Cpu,
    title: "Custom Engineering",
    desc: "We regularly build to customer drawings and specifications. Share your mechanical envelope, electrical parameters, and operating environment — our engineers will propose a manufacturable, tested solution.",
    tone: { bg: "bg-violet-100 dark:bg-violet-950/30", icon: "text-violet-700 dark:text-violet-400" },
  },
  {
    icon: Users,
    title: "Experienced Technical Team",
    desc: "Our engineering and production team brings over three decades of hands-on expertise in electromagnetic component design, winding technology, and precision resistive element manufacturing.",
    tone: { bg: "bg-pink-100 dark:bg-pink-950/30", icon: "text-pink-600 dark:text-pink-400" },
  },
  {
    icon: Plane,
    title: "Defence Exhibition Presence",
    desc: "Regular exhibitors at national defence and aerospace expos — engaging directly with Indian Army, Air Force, and Navy procurement teams, and OEM design engineers across the defence ecosystem.",
    tone: { bg: "bg-cyan-100 dark:bg-cyan-950/30", icon: "text-cyan-700 dark:text-cyan-400" },
  },
];

/* ════════════════════════════════════════════
   DATA — PRODUCT FAMILIES
   ════════════════════════════════════════════ */

const productFamilies = [
  {
    title: "Toroidal Transformers",
    range: "10 VA – 3000 VA, 50 Hz to 10 kHz",
    desc: "Custom and standard toroidal transformers for power supplies, audio, instrumentation, and 400 Hz defence avionics. CRGO silicon steel and nanocrystalline cores available.",
  },
  {
    title: "Current Transformers",
    range: "50 A – 2000 A, accuracy class 0.5",
    desc: "Wound ring-type CTs for energy metering and protective relaying, plus flexible Rogowski coils for retrofit installation. Tested to IEC 61869-2 and IS 2705.",
  },
  {
    title: "Linear Potentiometers",
    range: "1 kΩ/in gradient, up to 18 in stroke",
    desc: "Wire-wound linear position sensors for industrial automation, defence, and test & measurement. ETC/SL series with ±0.25% linearity and −50 °C to +85 °C operating range.",
  },
  {
    title: "Wire Wound Resistors & Rheostats",
    range: "5 W – 500 W",
    desc: "Ceramic tube, ceramic body, and aluminium-housed resistors for power electronics, motor control, load testing, and industrial heating applications.",
  },
];

/* ════════════════════════════════════════════
   PAGE COMPONENT
   ════════════════════════════════════════════ */

const AboutUs = () => {
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
            backgroundImage:
              "radial-gradient(circle, #d6d3d1 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-center text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground animate-fade-in-up">
              Since 1994 — Pune, India
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tighter text-foreground md:text-6xl animate-fade-in-up animation-delay-100">
              Efficient Toroidal
              <br />
              Coil Corporation
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground animate-fade-in-up animation-delay-200">
              Precision electromagnetic components for defence, aerospace, and
              industrial OEMs — toroidal transformers, current transformers,
              wire-wound potentiometers, and resistors, manufactured and tested
              at our MIDC Bhosari facility since 1994.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          OUR STORY — Text left, two images right
         ═══════════════════════════════════════ */}
      <section id="story">
        <SectionSeparator label="Our Story" />
        <div className="mx-auto max-w-6xl px-6 pb-16 md:pb-20">
          <div className="grid gap-10 lg:grid-cols-[1fr,1.4fr] lg:items-start">
            <motion.div {...fadeUp} className="lg:sticky lg:top-24 lg:self-start">
              <h2 className="mb-4 text-3xl font-bold tracking-tighter text-foreground md:text-4xl">
                Three Decades of Precision Manufacturing
              </h2>
              <p className="mb-4 text-base leading-relaxed text-muted-foreground">
                Founded in <strong className="text-foreground">1994</strong> by
                Mr. Rajan Naroor, Efficient Toroidal Coil Corporation began as a
                specialist toroidal transformer winding shop in Pune's MIDC
                Bhosari industrial belt. What started as a single-product
                operation has grown into a multi-product facility supplying
                precision electromagnetic and resistive components to defence
                establishments, aerospace OEMs, and industrial customers across
                India.
              </p>
              <p className="mb-4 text-base leading-relaxed text-muted-foreground">
                Over three decades, ETCC has expanded into four product families
                — toroidal transformers, current transformers, wire-wound linear
                potentiometers, and power resistors — all manufactured and
                tested under one roof. Our defence-qualified components have been
                supplied for platforms including the Su-30MKI, Tejas LCA, and
                naval electronic systems.
              </p>
              <p className="text-base leading-relaxed text-muted-foreground">
                Every unit we ship is individually tested — not sampled — because
                the applications we serve demand zero-defect performance. Our
                team brings hands-on domain expertise in electromagnetic design,
                winding technology, and precision resistive element
                manufacturing, supported by full lot traceability from raw
                material to dispatch.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  "Est. 1994",
                  "MIDC Bhosari, Pune",
                  "Defence Qualified",
                  "100% Tested",
                  "Custom Builds",
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
              {STORY_SECTION_GALLERY_INDEXES.map((galleryIdx, i) => {
                const img = galleryImages[galleryIdx];
                return (
                  <motion.div
                    key={img.src}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{
                      duration: 0.45,
                      delay: i * 0.08,
                      ease: [0.23, 1, 0.32, 1],
                    }}
                    className="relative aspect-[4/3] w-full cursor-pointer overflow-hidden rounded-2xl border border-border bg-card"
                    onClick={() => setLightbox(img.src)}
                  >
                    <TunerOverlay
                      index={galleryIdx}
                      initialPos={img.initialPos}
                      initialScale={img.initialScale}
                      enabled={tuner.enabled}
                      onUpdate={tuner.handleUpdate}
                    />
                    <img
                      src={img.src}
                      alt={img.alt}
                      className={`h-full w-full cursor-pointer object-cover mix-blend-multiply ${aboutImageExifClass(img.respectExif)}`}
                      style={tuner.getStyle(
                        galleryIdx,
                        img.initialPos,
                        img.initialScale,
                      )}
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          GALLERY — Full width, clickable
         ═══════════════════════════════════════ */}
      <section id="gallery">
        <SectionSeparator label="Gallery" />
        <div className="mx-auto max-w-6xl px-6 pb-16 md:pb-20">
          <motion.div {...fadeUp}>
            <h2 className="mb-4 text-3xl font-bold tracking-tighter text-foreground md:text-4xl">
              Exhibitions & Factory
            </h2>
            <p className="mb-10 max-w-3xl text-base leading-relaxed text-muted-foreground">
              ETCC regularly participates in national defence and aerospace
              exhibitions, engaging directly with procurement teams from the
              Indian Army, Air Force, and Navy.
            </p>
          </motion.div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {galleryImages.map((img, i) => (
              <motion.div
                key={img.src}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.45,
                  delay: i * 0.06,
                  ease: [0.23, 1, 0.32, 1],
                }}
                className="relative cursor-pointer overflow-hidden rounded-2xl border border-border bg-card"
                onClick={() => setLightbox(img.src)}
              >
                <TunerOverlay
                  index={i}
                  initialPos={img.initialPos}
                  initialScale={img.initialScale}
                  enabled={tuner.enabled}
                  onUpdate={tuner.handleUpdate}
                />
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className={`h-full w-full cursor-pointer object-cover mix-blend-multiply ${aboutImageExifClass(img.respectExif)}`}
                    style={tuner.getStyle(i, img.initialPos, img.initialScale)}
                    loading="lazy"
                  />
                </div>
                <div className="px-4 py-3">
                  <p className="text-sm font-medium text-foreground">
                    {img.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CONTACT & LOCATION
         ═══════════════════════════════════════ */}
      <section id="contact">
        <SectionSeparator label="Contact &amp; Location" />
        <div className="mx-auto max-w-6xl px-6 pb-16 md:pb-20">
          <motion.div {...fadeUp}>
            <h2 className="mb-4 text-3xl font-bold tracking-tighter text-foreground md:text-4xl">
              Visit Our Factory
            </h2>
            <p className="mb-10 max-w-3xl text-base leading-relaxed text-muted-foreground">
              Located in Pune's MIDC Bhosari industrial area — one of western
              India's largest electronics manufacturing clusters. We welcome
              customer visits, audits, and technical discussions.
            </p>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-5">
            {/* Contact cards */}
            <motion.div {...fadeUp} className="space-y-4 lg:col-span-2">
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="mb-4 text-base font-semibold text-foreground">
                  Factory Address
                </h3>
                <div className="space-y-4">
                  <a
                    href={GOOGLE_MAPS_FACTORY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open factory address in Google Maps"
                    className="flex items-start gap-3 rounded-md text-sm leading-relaxed text-muted-foreground outline-none transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
                    <span>
                      Unit No. 11, Electronic Sadan No.-1,
                      <br />
                      M.I.D.C., Bhosari, Pune,
                      <br />
                      Pimpri-Chinchwad,
                      <br />
                      Maharashtra 411026, India
                    </span>
                  </a>
                  <div className="flex items-center gap-3">
                    <Smartphone className="h-5 w-5 shrink-0 text-primary" />
                    <a
                      href="tel:+919822614244"
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      +91-9822614244
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 shrink-0 text-primary" />
                    <div className="text-sm text-muted-foreground">
                      <a
                        href="tel:+912030689099"
                        className="transition-colors hover:text-primary"
                      >
                        +91-2030689099
                      </a>
                      {" / "}
                      <a
                        href="tel:+91330620988"
                        className="transition-colors hover:text-primary"
                      >
                        330620988
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 shrink-0 text-primary" />
                    <a
                      href="mailto:efficient_toroidal@rediffmail.com"
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      efficient_toroidal@rediffmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 shrink-0 text-primary" />
                    <a
                      href="mailto:efficienttoroidal@yahoo.com"
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      efficienttoroidal@yahoo.com
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.5,
                delay: 0.15,
                ease: [0.23, 1, 0.32, 1],
              }}
              className="lg:col-span-3"
            >
              <div className="overflow-hidden rounded-xl border border-border">
                <iframe
                  title="ETCC Factory Location — MIDC Bhosari, Pune"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.0!2d73.8467!3d18.6298!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b80e0b5e1d1d%3A0x0!2sElectronic+Sadan+1%2C+MIDC%2C+Bhosari%2C+Pune!5e0!3m2!1sen!2sin!4v1700000000000"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full"
                />
              </div>
              <a
                href={GOOGLE_MAPS_FACTORY_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open factory location in Google Maps"
                className="mt-3 block text-center text-xs text-muted-foreground transition-colors hover:text-primary hover:underline"
              >
                MIDC Bhosari Industrial Area, Pimpri-Chinchwad, Pune
              </a>
            </motion.div>
          </div>

          {/* CTA */}
          <motion.div {...fadeUp} className="mt-12">
            <div className="relative overflow-hidden rounded-2xl bg-white shadow-card dark:shadow-card">
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 z-20 rounded-2xl shiny-conic-border"
              />
              <div className="relative z-10 m-[1.5px] rounded-[calc(1rem-1.5px)] bg-white px-5 py-6 md:px-7 md:py-7">
                <h3 className="text-2xl font-bold tracking-tighter text-slate-900 md:text-3xl">
                  Ready to discuss your requirements?
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
                  Whether you need a standard catalogue item or a fully custom
                  build to your drawing, our engineering team is ready to help.
                  Share your specification — we will respond with a clear,
                  manufacturable approach and a quotation.
                </p>
                <div className="mt-6">
                  <Button
                    type="button"
                    onClick={() => setQuoteOpen(true)}
                    className="h-11 rounded-full bg-foreground px-7 text-sm font-medium text-background hover:bg-foreground/90"
                  >
                    Request a Quote
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <Lightbox
          src={lightbox}
          images={allGallerySrcs}
          onClose={() => setLightbox(null)}
          onNavigate={(src) => setLightbox(src)}
        />
      )}

      <QuoteModal
        open={quoteOpen}
        onOpenChange={setQuoteOpen}
        defaultCategory="General Inquiry"
      />
    </Layout>
  );
};

export default AboutUs;
