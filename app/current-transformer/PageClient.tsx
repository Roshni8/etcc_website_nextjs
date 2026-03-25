"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import Breadcrumb from "@/components/Breadcrumb";
import SpecificationTable from "@/components/SpecificationTable";
import QuoteModal from "@/components/QuoteModal";

const columns = [
  { key: "model", label: "Model" },
  { key: "ratio", label: "Ratio" },
  { key: "burden", label: "Burden (VA)" },
  { key: "accuracy", label: "Accuracy Class" },
  { key: "current", label: "Primary Current" },
  { key: "application", label: "Application" },
];

const specData = [
  { model: "CT-050", ratio: "50/5A", burden: "5", accuracy: "0.5", current: "50A", application: "Metering" },
  { model: "CT-100", ratio: "100/5A", burden: "10", accuracy: "0.5", current: "100A", application: "Metering" },
  { model: "CT-200", ratio: "200/5A", burden: "15", accuracy: "0.5", current: "200A", application: "Metering" },
  { model: "CT-500", ratio: "500/5A", burden: "15", accuracy: "1.0", current: "500A", application: "Protection" },
  { model: "CT-1000", ratio: "1000/5A", burden: "20", accuracy: "1.0", current: "1000A", application: "Protection" },
  { model: "CT-2000", ratio: "2000/5A", burden: "30", accuracy: "1.0", current: "2000A", application: "Protection" },
];

const customFeatures = [
  "Custom turns ratios for any current range",
  "Metering and protection class accuracy",
  "Window, wound, and bar-type configurations",
  "Split-core designs for retrofit installations",
  "Multiple secondary outputs",
  "High-voltage insulation options",
];

const applicationCards = [
  { title: "Energy Metering", desc: "Precision current measurement for energy billing, revenue metering, and power consumption monitoring in utilities.", image: "/assets/app-industrial.jpg", tags: ["Revenue", "Billing"] },
  { title: "Protective Relaying", desc: "Reliable fault detection for overcurrent, earth fault, and differential protection in substations and switchgear.", image: "/assets/app-defence.jpg", tags: ["Protection", "Relay"] },
  { title: "Power Quality", desc: "Current sensing for harmonic analysis, power factor monitoring, and power quality assessment in industrial plants.", image: "/assets/app-industrial.jpg", tags: ["Harmonics", "PF"] },
  { title: "Industrial Automation", desc: "Motor protection, variable frequency drive feedback, and process control current monitoring in factory automation.", image: "/assets/app-medical.jpg", tags: ["Motors", "VFD"] },
];

const CurrentTransformers = () => {
  const [quoteOpen, setQuoteOpen] = useState(false);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative border-b border-border overflow-hidden">
        <img src="/assets/ct-hero-bg.jpg" alt="" aria-hidden="true" width={1920} height={600} className="absolute inset-0 h-full w-full object-cover opacity-[0.4]" />
        <div className="absolute inset-0 bg-background/40" />
        <div className="main-container py-10 md:py-14 relative z-10">
          <Breadcrumb items={[{ label: "Products", href: "/" }, { label: "Current Transformers" }]} />
          <h1 className="mb-4 font-heading">Current Transformers</h1>
          <p className="max-w-2xl text-muted-foreground">
            ETCC India manufactures precision LT current transformers at our Pune facility, established
            in 1994. Primary current range 50A to 2000A with 5A secondary output, metering accuracy
            class 0.5 and protection class 1.0 per IEC 61869-2 / IS 2705. Window, wound, bar-type,
            and split-core configurations available.
          </p>
        </div>
      </section>

      {/* Product Image */}
      <section className="main-container section">
        <div className="flex justify-center">
          <div className="overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-card flex items-center justify-center max-w-2xl w-full">
            <img src="/assets/current-transformer-range.png" alt="Range of current transformers – window, wound, and toroidal types" width={800} height={420} className="w-full max-h-[420px] object-contain" loading="lazy" />
          </div>
        </div>
      </section>

      {/* Standard Products */}
      <section className="main-container section">
        <div className="mb-8">
          <h2 className="mb-3">Standard Current Transformers</h2>
          <p className="text-muted-foreground">
            Our standard CT range covers 50A to 2000A primary current with 5A secondary output.
          </p>
        </div>
        <SpecificationTable columns={columns} data={specData} caption="Standard current transformer specifications" />
      </section>

      {/* Custom Engineering */}
      <section className="border-t border-border bg-secondary">
        <div className="main-container section">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="mb-3">Custom Engineering</h2>
              <p className="mb-6 text-muted-foreground">
                We design current transformers to meet your specific metering and protection
                requirements. From low-current sensing to high-voltage transmission applications.
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
              <img src="/assets/flexible-current-transformer.png" alt="Flexible current transformer for custom installations" width={600} height={360} className="w-full max-h-[360px] object-contain" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="main-container section">
        <div className="mb-8">
          <h2 className="mb-3">Applications</h2>
          <p className="text-muted-foreground">Our current transformers serve critical roles across power and industrial sectors, designed and tested to IEC 61869-2 and IS 2705 standards.</p>
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

      <QuoteModal open={quoteOpen} onOpenChange={setQuoteOpen} defaultCategory="Current Transformers" />
    </Layout>
  );
};

export default CurrentTransformers;
