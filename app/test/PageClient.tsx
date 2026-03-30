"use client";

import { useState } from "react";
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
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import SpecificationTable from "@/components/SpecificationTable";
import QuoteModal from "@/components/QuoteModal";

/* ════════════════════════════════════════════
   DATA
   ════════════════════════════════════════════ */

const customisationRows: { icon: LucideIcon; param: string; detail: string }[] = [
  { icon: Zap, param: "Power Rating", detail: "10VA to 3000VA" },
  { icon: Activity, param: "Frequency", detail: "50Hz, 60Hz, 400Hz, 1kHz–10kHz" },
  { icon: Plug, param: "Primary Voltage", detail: "Any voltage — single or multiple primaries" },
  { icon: GitFork, param: "Secondary Windings", detail: "Single, dual, centre-tapped, or up to 12+ multi-tap outputs" },
  { icon: Thermometer, param: "Insulation Class", detail: "Class A (105°C) through Class H (180°C), up to 200°C" },
  { icon: Cable, param: "Termination", detail: "Flying leads, PCB pins, screw terminals, bolt mount" },
  { icon: Box, param: "Form Factor", detail: "Standard toroidal, PCB mount, open frame" },
  { icon: Lock, param: "Enclosure", detail: "Open wound, varnish impregnated, epoxy potted, IP-rated" },
  { icon: ShieldCheck, param: "Electrostatic Shield", detail: "Available between primary and secondary" },
  { icon: Target, param: "Accuracy", detail: "Down to 0.1% regulation" },
  { icon: Paintbrush, param: "Lead Colours & Length", detail: "Custom colour-coding and lengths to your harness spec" },
  { icon: Wrench, param: "Prototypes", detail: "Small quantities accepted — no minimum run required" },
];

const standardSpecRows = [
  { spec: "Power Range", value: "10VA – 3000VA" },
  { spec: "Input Voltage", value: "230V AC (50/60Hz) standard" },
  { spec: "Output Voltage", value: "Multiple standard secondaries available" },
  { spec: "Insulation Class", value: "Class A (105°C)" },
  { spec: "Accuracy", value: "±5% regulation" },
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

/* ════════════════════════════════════════════
   PAGE COMPONENT
   ════════════════════════════════════════════ */

const TestPage = () => {
  const [quoteOpen, setQuoteOpen] = useState(false);

  return (
    <Layout>
      {/* ═══════════════════════════════════════
          SECTION 1 — HERO (with background image)
         ═══════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        {/* Background image — faded */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.04]"
          style={{ backgroundImage: "url(/assets/custom-transformer-group.jpg)" }}
        />
        <div className="relative main-container pt-16 pb-12 md:pt-24 md:pb-16">
          <div className="mx-auto max-w-3xl text-center">
            <h1
              className="mb-5 leading-[1.1]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Custom Toroidal Transformers
            </h1>
            <p className="mb-8 text-base leading-relaxed text-muted-foreground">
              Precision-wound toroidal transformers built to your exact
              specification — including defence-grade 400Hz designs for aerospace
              and military applications. Manufactured in Pune since 1994.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button
                className="bg-foreground text-background hover:bg-foreground/90 h-10 px-5 text-sm font-medium rounded-lg border-foreground"
                onClick={() => {
                  document
                    .getElementById("custom")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Explore Custom Transformers
              </Button>
              <Button
                onClick={() => setQuoteOpen(true)}
                className="bg-foreground text-background hover:bg-foreground/90 h-10 px-5 text-sm font-medium rounded-lg"
              >
                Request a Quote
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 2 — CUSTOM TRANSFORMERS
          Text left + Bento grid right
         ═══════════════════════════════════════ */}
      <section id="custom" className="border-t border-border">
        <div className="main-container section">
          <div className="grid gap-10 lg:grid-cols-[1fr,1.4fr] lg:items-start">
            {/* ── LEFT: Text ── */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <p className="mb-2 text-[10px] font-medium tracking-widest text-muted-foreground uppercase">
                Custom Transformers
              </p>
              <h2
                style={{ fontFamily: "var(--font-heading)" }}
                className="mb-4"
              >
                Defence &amp; Aerospace Grade
              </h2>
              <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
                Built to 400Hz military power specifications. Used in airborne
                instruments, radar systems, and defence electronics where size,
                weight, and thermal performance are critical. Every unit wound
                and tested in-house.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
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
              <Button
                onClick={() => setQuoteOpen(true)}
                className="bg-foreground text-background hover:bg-foreground/90 h-10 px-5 text-sm font-medium rounded-lg"
              >
                Request a Quote
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            {/* ── RIGHT: Bento Grid ── */}
            <div
              className="grid gap-2"
              style={{
                gridTemplateColumns: "1fr 1fr 1fr",
                gridTemplateRows: "200px 180px 180px",
              }}
            >
              {/* C7 — tall left (row 1–2, col 1): products clustered in center */}
              <div
                className="overflow-hidden rounded-lg border border-border bg-card"
                style={{ gridColumn: "1", gridRow: "1 / 3" }}
              >
                <img
                  src="/assets/custom-transformer-assorted.jpg"
                  alt="Assorted custom transformers — PCB mount, potted, and open-wound"
                  className="w-full h-full object-cover mix-blend-multiply"
                  style={{ objectPosition: "50% 50%", transform: "scale(1.6)" }}
                />
              </div>

              {/* C1 — wide top (row 1, col 2–3): products along bottom half */}
              <div
                className="overflow-hidden rounded-lg border border-border bg-card"
                style={{ gridColumn: "2 / 4", gridRow: "1" }}
              >
                <img
                  src="/assets/custom-transformer-group.jpg"
                  alt="Full range of ETCC custom transformers — defence, PCB, and toroidal"
                  className="w-full h-full object-cover mix-blend-multiply"
                  style={{ objectPosition: "50% 70%", transform: "scale(1.4)" }}
                />
              </div>

              {/* C5 — small middle (row 2, col 2): product in right third */}
              <div
                className="overflow-hidden rounded-lg border border-border bg-card"
                style={{ gridColumn: "2", gridRow: "2" }}
              >
                <img
                  src="/assets/custom-transformer-single.jpg"
                  alt="Single potted toroidal transformer with flying leads"
                  className="w-full h-full object-cover mix-blend-multiply"
                  style={{ objectPosition: "70% 45%", transform: "scale(1.8)" }}
                />
              </div>

              {/* C3 — tall right (row 2–3, col 3): product centered in lower half */}
              <div
                className="overflow-hidden rounded-lg border border-border bg-card"
                style={{ gridColumn: "3", gridRow: "2 / 4" }}
              >
                <img
                  src="/assets/custom-transformer-400hz.jpg"
                  alt="400Hz defence transformer with numbered tap terminals"
                  className="w-full h-full object-cover mix-blend-multiply"
                  style={{ objectPosition: "50% 60%", transform: "scale(1.4)" }}
                />
              </div>

              {/* C6 — bottom left (row 3, col 1): 3 toroids in triangle center */}
              <div
                className="overflow-hidden rounded-lg border border-border bg-card"
                style={{ gridColumn: "1", gridRow: "3" }}
              >
                <img
                  src="/assets/custom-transformer-range.jpg"
                  alt="Three toroidal transformers — small, medium, and large"
                  className="w-full h-full object-cover mix-blend-multiply"
                  style={{ objectPosition: "50% 55%", transform: "scale(1.5)" }}
                />
              </div>

              {/* C4 — bottom middle (row 3, col 2): PCB mount in lower center */}
              <div
                className="overflow-hidden rounded-lg border border-border bg-card"
                style={{ gridColumn: "2", gridRow: "3" }}
              >
                <img
                  src="/assets/custom-transformer-pcb.jpg"
                  alt="PCB mount toroidal transformer with through-hole pins"
                  className="w-full h-full object-cover mix-blend-multiply"
                  style={{ objectPosition: "50% 55%", transform: "scale(1.5)" }}
                />
              </div>
            </div>
          </div>

          {/* ── BOTTOM: Horizontal card ── */}
          <div className="mt-8 rounded-xl border border-border bg-card p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-5">
            {/* Simple toroidal SVG icon */}
            <div className="shrink-0">
              <svg
                width="64"
                height="64"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-muted-foreground"
              >
                <circle cx="32" cy="32" r="26" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="32" cy="32" r="11" stroke="currentColor" strokeWidth="1.5" />
                <path d="M32 6 C33 6, 34 8, 34 10" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                <path d="M52 18 C53 19, 54 21, 53 23" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                <path d="M58 32 C58 34, 56 35, 54 35" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                <path d="M52 46 C51 48, 49 49, 47 48" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                <path d="M32 58 C30 58, 29 56, 29 54" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                <path d="M12 46 C11 44, 10 42, 11 40" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                <path d="M6 32 C6 30, 8 29, 10 29" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                <path d="M12 18 C13 16, 15 15, 17 16" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                <line x1="20" y1="12" x2="14" y2="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="44" y1="12" x2="50" y2="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <h3
                style={{ fontFamily: "var(--font-heading)" }}
                className="mb-1.5 text-lg"
              >
                Every unit built to your specification
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground max-w-2xl">
                Share your voltage, current, mounting, and environmental
                requirements. We design and manufacture from scratch —
                prototype quantities welcome, no minimum run required.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 3 — CUSTOMISATION TABLE
         ═══════════════════════════════════════ */}
      <section className="border-t border-border bg-secondary/50">
        <div className="main-container section">
          <div className="mb-8 max-w-2xl">
            <h2
              style={{ fontFamily: "var(--font-heading)" }}
              className="mb-3"
            >
              Customize as per your needs and application
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              We don&rsquo;t adapt your requirements to fit a standard product.
              We build the transformer around your specification.
            </p>
          </div>

          <div className="overflow-hidden rounded-xl border border-border bg-card">
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
                        <td className="px-4 py-3 text-muted-foreground">
                          {row.detail}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 4 — STANDARD TRANSFORMERS
         ═══════════════════════════════════════ */}
      <section className="border-t border-border">
        <div className="main-container section">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            {/* Text left */}
            <div>
              <h2
                style={{ fontFamily: "var(--font-heading)" }}
                className="mb-3"
              >
                Standard Toroidal Transformers
              </h2>
              <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
                For applications where a proven design is sufficient, our
                standard range covers the most common power and voltage
                configurations. All units carry ETCC labelling with full winding
                specifications.
              </p>

              <div className="overflow-hidden rounded-lg border border-border bg-card">
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
                        <td className="px-4 py-2.5 text-muted-foreground">
                          {row.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Image right */}
            <div className="overflow-hidden rounded-xl border border-border bg-card flex items-center justify-center p-4">
              <img
                src="/assets/toroidal-range.jpg"
                alt="Standard toroidal transformer range by ETCC India"
                className="w-full max-h-[380px] object-contain mix-blend-multiply"
              />
            </div>
          </div>

          {/* ── Full specifications table ── */}
          <div className="mt-10">
            <h3
              style={{ fontFamily: "var(--font-heading)" }}
              className="mb-4"
            >
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
          </div>
        </div>
      </section>

      <QuoteModal
        open={quoteOpen}
        onOpenChange={setQuoteOpen}
        defaultCategory="Toroidal Transformers"
      />
    </Layout>
  );
};

export default TestPage;
