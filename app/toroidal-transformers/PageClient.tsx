"use client";

import { useState } from "react";
import { ArrowRight, Waves, Thermometer, Ruler, Target, ShieldCheck, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import SpecificationTable from "@/components/SpecificationTable";
import QuoteModal from "@/components/QuoteModal";

const columns = [
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

const customCards = [
  { title: "Frequency & Core Design", desc: "Transformers for 50 Hz to 10 kHz with nanocrystalline and optimised core materials. Winding configuration and size tuned for operating frequency and superior efficiency.", icon: Waves },
  { title: "Thermal & Duty Cycle", desc: "Designs with temperature rise limited to 20°C above ambient. Continuous operation at elevated temperatures up to 200°C and short-time duty ratings available.", icon: Thermometer },
  { title: "Mechanical & Mounting", desc: "Custom sizes and form factors including open frame, encapsulated, centre potted, captive inserts, DIN rail, PCB mount, and lifting hook configurations.", icon: Ruler },
  { title: "Regulation & Accuracy", desc: "Precision designs with 1% or 0.1% accuracy for instrumentation, measurement, control, and high-reliability applications.", icon: Target },
  { title: "Ruggedised & Protected", desc: "Shock and vibration rated units with potting, impregnation, and tropicalisation. Waterproof transformers rated for 100% relative humidity and harsh environments.", icon: ShieldCheck },
  { title: "Electrical Specification", desc: "Custom input tolerances, regulation, temperature rise, ambient ratings, physical dimensions, and load & no-load condition parameters.", icon: Settings },
];

const applicationCards = [
  { title: "Audio Equipment", desc: "Low-noise, high-fidelity power supplies for amplifiers, mixing consoles, and professional studio gear.", image: "/assets/app-audio.jpg", tags: ["Hi-Fi", "Studio"] },
  { title: "Medical Devices", desc: "Safe, isolated power for patient monitoring, imaging systems, and diagnostic equipment meeting safety standards.", image: "/assets/app-medical.jpg", tags: ["Safety", "Isolation"] },
  { title: "Industrial Controls", desc: "Reliable power conversion for PLCs, motor drives, factory automation systems, and process control equipment.", image: "/assets/app-industrial.jpg", tags: ["Automation", "PLC"] },
  { title: "Defence & Avionics", desc: "MIL-spec compliant units for airborne electronics, radar, missile guidance systems, and tactical communications.", image: "/assets/app-defence.jpg", tags: ["MIL-STD", "Avionics"] },
];

const ToroidalTransformers = () => {
  const [quoteOpen, setQuoteOpen] = useState(false);

  return (
    <Layout>
      {/* Page Header */}
      <section className="relative border-b border-border overflow-hidden">
        <img src="/assets/toroidal-hero-bg.jpg" alt="" aria-hidden="true" width={1920} height={600} className="absolute inset-0 h-full w-full object-cover opacity-[0.4]" />
        <div className="absolute inset-0 bg-background/40" />
        <div className="main-container py-10 md:py-14 relative z-10">
<h1 className="mb-4 font-heading">Toroidal Transformers</h1>
          <p className="max-w-2xl text-muted-foreground">
            ETCC India manufactures custom toroidal power transformers from 10 VA to 3000 VA at our
            Pune facility, established in 1994. Our toroidal designs deliver lower electromagnetic
            interference, 50% smaller footprint, and higher efficiency than conventional EI-core
            laminated transformers — built to IEC 61558 and IS 2026 standards.
          </p>
        </div>
      </section>

      {/* Product Images */}
      <section className="main-container section">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-card flex items-center justify-center">
            <img src="/assets/toroidal-single.jpg" alt="Custom toroidal transformer with connector terminals" width={600} height={360} className="w-full max-h-[360px] object-contain" />
          </div>
          <div className="overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-card flex items-center justify-center">
            <img src="/assets/toroidal-assorted.jpg" alt="Range of toroidal transformers and electromagnetic components" width={600} height={360} className="w-full max-h-[360px] object-contain" />
          </div>
        </div>
      </section>

      {/* Standard Products */}
      <section className="main-container section">
        <div className="mb-8">
          <h2 className="mb-3">Standard Toroidal Transformers</h2>
          <p className="text-muted-foreground">
            Our standard range covers 10 VA to 3000 VA with 0–230V AC primary voltage. All units are designed and tested to IEC 61558 and IS 2026 safety standards.
          </p>
        </div>
        <SpecificationTable columns={columns} data={specData} caption="Standard toroidal transformer specifications" collapsedRows={8} />
      </section>

      {/* Custom Products */}
      <section className="border-t border-border bg-secondary">
        <div className="main-container section">
          <div className="mb-8">
            <h2 className="mb-3">Custom Transformer Solutions</h2>
            <p className="text-muted-foreground">
              We design and manufacture custom transformers based on your requirements. Our engineering team works closely with customers to develop solutions optimised for electrical performance, mechanical constraints, and thermal conditions.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
            {customCards.map((card) => {
              const Icon = card.icon;
              return (
                <div key={card.title} className="flex flex-col rounded-xl border border-border bg-card p-6">
                  <Icon className="h-6 w-6 text-foreground mb-5" strokeWidth={1.5} />
                  <h3 className="text-base font-semibold text-foreground mb-2">{card.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">{card.desc}</p>
                  <div className="mt-5 w-10 h-px bg-foreground/30" />
                </div>
              );
            })}
          </div>

          <div className="flex-col items-start gap-4 rounded-xl bg-card p-6 border border-border sm:items-end justify-between flex sm:flex-row">
            <p className="max-w-lg text-muted-foreground">
              All designs account for input tolerances, regulation, temperature rise, and physical dimensions. Contact us with your requirements.
            </p>
            <Button onClick={() => setQuoteOpen(true)} className="shrink-0 bg-primary text-primary-foreground hover:bg-primary-dark">
              Request Custom Quote
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="main-container section">
        <div className="mb-8">
          <h2 className="mb-3">Applications</h2>
          <p className="text-muted-foreground">
            Our toroidal transformers serve critical roles across diverse industries. ETCC has supplied
            custom transformers for programmes including the Su-30MKI avionics upgrade and Tejas LCA
            ground support equipment, alongside commercial audio, medical, and industrial applications.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {applicationCards.map((app) => (
            <div key={app.title} className="group overflow-hidden rounded-xl border border-border bg-card">
              <div className="relative h-48 overflow-hidden">
                <img src={app.image} alt={app.title} width={400} height={192} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                <div className="absolute bottom-3 left-3 flex gap-2">
                  {app.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-foreground backdrop-blur-sm">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-base font-semibold text-foreground mb-2">{app.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{app.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <QuoteModal open={quoteOpen} onOpenChange={setQuoteOpen} defaultCategory="Toroidal Transformers" />
    </Layout>
  );
};

export default ToroidalTransformers;
