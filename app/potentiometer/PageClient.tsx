"use client";

import { useState } from "react";
import { ArrowRight, Waves, Thermometer, Ruler, Target, ShieldCheck, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import Breadcrumb from "@/components/Breadcrumb";
import SpecificationTable from "@/components/SpecificationTable";
import QuoteModal from "@/components/QuoteModal";

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

const customCards = [
  { title: "Resistance & Tolerance", desc: "Custom resistance values from 20Ω to 100KΩ with precision tolerances down to ±0.01%. Special taper profiles including linear, logarithmic, and custom functions.", icon: Target },
  { title: "Shaft & Mounting", desc: "Various shaft types and lengths. Panel mount, PCB mount, servo flange, and custom mounting configurations to suit any enclosure.", icon: Ruler },
  { title: "Multi-Gang & Multi-Turn", desc: "Ganged potentiometers with matched tracking. Multi-turn precision units for fine adjustment in instrumentation and calibration.", icon: Settings },
  { title: "Thermal & Environmental", desc: "Extended temperature range designs from −55°C to +200°C. Sealed and tropicalised options for harsh and high-humidity environments.", icon: Thermometer },
  { title: "Linearity & Resolution", desc: "High-linearity servo potentiometers with independent linearity down to ±0.05%. Ultra-fine resolution depending on resistance value.", icon: Waves },
  { title: "Ruggedised & Protected", desc: "Shock and vibration rated units with potting and encapsulation. Waterproof configurations for demanding military and industrial applications.", icon: ShieldCheck },
];

const productImages = [
  { src: "/assets/servo-potentiometer.png", alt: "Servo Potentiometer – precision position feedback", label: "Servo Potentiometer" },
  { src: "/assets/12-watt-potentiometer.png", alt: "12 Watt Wire Wound Potentiometer", label: "12W Potentiometer" },
  { src: "/assets/1-watt-potentiometer.png", alt: "1 Watt Wire Wound Potentiometer", label: "1W Potentiometer" },
  { src: "/assets/ganged-potentiometer.png", alt: "Ganged multi-gang potentiometer assembly", label: "Ganged Potentiometer" },
  { src: "/assets/linear-potentiometer.png", alt: "Linear motion potentiometer ETC/SL/50", label: "Linear Potentiometer" },
];

const applicationCards = [
  { title: "Servo Control", desc: "Precision position feedback for servo motors, actuators, robotics, and closed-loop control systems.", image: "/assets/app-defence.jpg", tags: ["Feedback", "Position"] },
  { title: "Instrumentation", desc: "High-accuracy measurement and calibration for test equipment, laboratory instruments, and data acquisition.", image: "/assets/app-medical.jpg", tags: ["Precision", "Calibration"] },
  { title: "Industrial Controls", desc: "Reliable signal generation for PLCs, process control, factory automation, and motor drive systems.", image: "/assets/app-industrial.jpg", tags: ["Automation", "PLC"] },
  { title: "Defence & Aerospace", desc: "MIL-spec potentiometers for weapon systems, radar positioning, flight controls, and avionics equipment.", image: "/assets/app-audio.jpg", tags: ["MIL-STD", "Avionics"] },
];

const Potentiometers = () => {
  const [quoteOpen, setQuoteOpen] = useState(false);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative border-b border-border overflow-hidden">
        <img src="/assets/potentiometer-hero-bg.jpg" alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-[0.4]" />
        <div className="absolute inset-0 bg-background/40" />
        <div className="main-container py-10 md:py-14 relative z-10">
          <Breadcrumb items={[{ label: "Products", href: "/" }, { label: "Wire Wound Potentiometers" }]} />
          <h1 className="mb-4 font-heading">Wire Wound Potentiometers</h1>
          <p className="max-w-2xl text-muted-foreground">
            Precision wire wound potentiometers for industrial, instrumentation, servo, and defence
            applications. Available in servo, linear, ganged, and custom configurations.
          </p>
        </div>
      </section>

      {/* Product Image Gallery */}
      <section className="main-container section">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {productImages.map((img) => (
            <div key={img.label} className="overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-card flex flex-col items-center justify-center">
              <img src={img.src} alt={img.alt} className="w-full max-h-[280px] object-contain mb-4" loading="lazy" />
              <p className="text-sm font-medium text-foreground">{img.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Servo Potentiometer Specifications */}
      <section className="main-container section">
        <div className="mb-8">
          <h2 className="mb-3">Standard Servo Potentiometers</h2>
          <p className="text-muted-foreground">
            Our standard range of servo potentiometers for position feedback in servo systems,
            robotics, and precision instrumentation.
          </p>
        </div>
        <SpecificationTable columns={servoColumns} data={servoData} caption="Standard servo potentiometer specifications" collapsedRows={8} />
      </section>

      {/* Custom Solutions */}
      <section className="border-t border-border bg-secondary">
        <div className="main-container section">
          <div className="mb-8">
            <h2 className="mb-3">Custom Potentiometer Solutions</h2>
            <p className="text-muted-foreground">
              We manufacture potentiometers to your exact requirements. Our engineering team
              specializes in precision resistance components for demanding applications.
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
              All designs account for resistance tolerance, linearity, environmental rating, and
              mechanical constraints. Contact us with your requirements.
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
          <p className="text-muted-foreground">Our wire wound potentiometers serve critical roles across diverse industries.</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {applicationCards.map((app) => (
            <div key={app.title} className="group overflow-hidden rounded-xl border border-border bg-card">
              <div className="relative h-48 overflow-hidden">
                <img src={app.image} alt={app.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
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

      <QuoteModal open={quoteOpen} onOpenChange={setQuoteOpen} defaultCategory="Potentiometers" />
    </Layout>
  );
};

export default Potentiometers;
