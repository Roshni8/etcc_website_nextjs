"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import Breadcrumb from "@/components/Breadcrumb";
import SpecificationTable from "@/components/SpecificationTable";
import QuoteModal from "@/components/QuoteModal";

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

const customFeatures = [
  "Custom resistance values and power ratings",
  "Various mounting options (chassis, panel, PCB)",
  "High-temperature wire options",
  "Vitreous enamel or silicone coating",
  "Non-inductive winding available",
  "Custom enclosures and terminal configurations",
];

const applications = [
  { title: "Motor Speed Control", desc: "Variable resistance for DC motor regulation and speed control systems.", img: "/assets/app-industrial.jpg", tags: ["Rheostats", "Variable"] },
  { title: "Load Testing", desc: "Resistive loads for generator, UPS, and power supply testing.", img: "/assets/app-industrial.jpg", tags: ["High Power", "Load Banks"] },
  { title: "Power Electronics", desc: "Snubber, braking, and discharge resistors for power conversion.", img: "/assets/app-defence.jpg", tags: ["Snubber", "Braking"] },
  { title: "Laboratory & Heating", desc: "Precision adjustable standards and industrial heating elements.", img: "/assets/app-medical.jpg", tags: ["Precision", "Industrial"] },
];

const WirewoundResistors = () => {
  const [quoteOpen, setQuoteOpen] = useState(false);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative border-b border-border">
        <img src="/assets/resistor-hero-bg.jpg" alt="" width={1920} height={600} className="absolute inset-0 h-full w-full object-cover opacity-[0.4]" aria-hidden />
        <div className="absolute inset-0 bg-background/40" />
        <div className="main-container relative z-10 py-10 md:py-14">
          <Breadcrumb items={[{ label: "Products", href: "/" }, { label: "Wire Wound Resistors & Rheostats" }]} />
          <h1 className="mb-4 font-heading">Wire Wound Resistors &amp; Rheostats</h1>
          <p className="max-w-2xl text-muted-foreground">
            ETCC India manufactures high-power wire wound resistors from 5W to 200W and rheostats
            from 25W to 500W at our Pune facility, established in 1994. Ceramic-tube, ceramic-body,
            and aluminium-housed constructions for power electronics, motor control, load testing,
            and industrial applications.
          </p>
        </div>
      </section>

      {/* Product Image */}
      <section className="main-container section">
        <div className="flex justify-center">
          <div className="overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-card flex items-center justify-center max-w-2xl w-full">
            <img src="/assets/resistors-assorted.png" alt="Assorted wire wound resistors and rheostats" width={800} height={420} className="w-full max-h-[420px] object-contain" loading="lazy" />
          </div>
        </div>
      </section>

      {/* Wire Wound Resistors Table */}
      <section className="main-container section">
        <div className="mb-8">
          <h2 className="mb-3">Wire Wound Resistors</h2>
          <p className="text-muted-foreground">
            Precision wire wound resistors from 5W to 200W in ceramic and aluminum-housed constructions.
          </p>
        </div>
        <SpecificationTable columns={resistorColumns} data={resistorData} caption="Wire wound resistor specifications" />
      </section>

      {/* Rheostats Table */}
      <section className="border-t border-border bg-secondary">
        <div className="main-container section">
          <div className="mb-8">
            <h2 className="mb-3">Rheostats</h2>
            <p className="text-muted-foreground">
              Variable wire wound resistors for current control, motor speed regulation, and laboratory use.
            </p>
          </div>
          <SpecificationTable columns={rheostatColumns} data={rheostatData} caption="Rheostat specifications" />
        </div>
      </section>

      {/* Custom Engineering */}
      <section className="main-container section">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="mb-3">Custom Engineering</h2>
            <p className="mb-6 text-muted-foreground">
              We manufacture wire wound resistors and rheostats to your specific requirements.
              Our expertise covers low-value precision resistors to high-power load banks.
            </p>
            <ul className="mb-8 space-y-3">
              {customFeatures.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span className="text-sm text-foreground">{feature}</span>
                </li>
              ))}
            </ul>
            <Button size="lg" onClick={() => setQuoteOpen(true)} className="bg-primary text-primary-foreground hover:bg-primary-dark">
              Request Custom Quote
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-card flex items-center justify-center">
            <img src="/assets/resistors-assorted.png" alt="Custom wire wound resistors range" width={600} height={360} className="w-full max-h-[360px] object-contain" loading="lazy" />
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="border-t border-border bg-secondary">
        <div className="main-container section">
          <div className="mb-8">
            <h2 className="mb-3">Applications</h2>
            <p className="text-muted-foreground">
              Our wire wound resistors and rheostats serve critical roles across demanding industries, manufactured to IS 12063 standards.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {applications.map((app) => (
              <div key={app.title} className="group relative overflow-hidden rounded-2xl border border-border shadow-card">
                <img src={app.img} alt={app.title} width={400} height={192} className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
                <div className="absolute bottom-0 p-4">
                  <div className="mb-2 flex flex-wrap gap-1.5">
                    {app.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-medium text-primary">{tag}</span>
                    ))}
                  </div>
                  <h3 className="text-sm font-semibold text-foreground">{app.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{app.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <QuoteModal open={quoteOpen} onOpenChange={setQuoteOpen} defaultCategory="Wire Wound Resistors & Rheostats" />
    </Layout>
  );
};

export default WirewoundResistors;
