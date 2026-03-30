"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { NumberTicker } from "@/components/ui/number-ticker";

const RetroGrid = dynamic(
  () => import("@/components/ui/retro-grid").then((m) => ({ default: m.RetroGrid })),
  { ssr: false }
);

const stats = [
  { value: 30, suffix: "+", label: "Years" },
  { value: 500, suffix: "+", label: "Clients" },
  { value: 5, suffix: "", label: "Product Lines" },
  { value: 1994, suffix: "", label: "Est." },
];

interface HeroSectionProps {
  onQuoteClick: () => void;
}

const HeroSection = ({ onQuoteClick }: HeroSectionProps) => {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Retro grid background — lazy loaded, not blocking first paint */}
      <RetroGrid angle={65} opacity={0.4} />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center text-center">
          {/* Announcement badge with animated shiny border */}
          <div className="animate-fade-in-up">
            <Link
              href="/about-us"
              className="group relative inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground overflow-hidden"
            >
              {/* Animated conic-gradient border */}
              <span
                className="absolute inset-0 rounded-full"
                style={{
                  padding: "1.5px",
                  background: "conic-gradient(from var(--shiny-angle, 0deg), #e2e8f0, #a78bfa, #f472b6, #38bdf8, #e2e8f0)",
                  WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                  animation: "shiny-border-rotate 6s linear infinite",
                }}
              />
              <span className="absolute inset-[1px] rounded-full bg-white" />
              <span className="relative font-medium">Trusted by Indian Defence &amp; Automotive OEMs</span>
              <ArrowRight className="relative h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Main headline */}
          <h1 className="mt-8 text-5xl font-bold tracking-tighter text-foreground md:text-7xl animate-fade-in-up animation-delay-100">
            Precision Electronic
            <br />
            Components
          </h1>

          {/* Subtitle */}
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl animate-fade-in-up animation-delay-200">
            Manufacturer of toroidal transformers, current transformers, servo
            potentiometers, wire wound resistors, and rheostats. Serving defence,
            industrial, medical, and automotive sectors since 1994.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 animate-fade-in-up animation-delay-300">
            <ShimmerButton
              onClick={onQuoteClick}
              className="h-12 px-8 text-sm font-medium"
            >
              Request a Quote
              <ArrowRight className="ml-2 h-4 w-4" />
            </ShimmerButton>
            <Link
              href="/toroidal-transformers"
              className="inline-flex items-center justify-center rounded-full border border-border bg-background px-8 h-12 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              Explore Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          {/* Animated stats row */}
          <div className="mt-14 flex flex-wrap items-center justify-center gap-8 md:gap-14 animate-fade-in animation-delay-400">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                  <NumberTicker value={stat.value} delay={0.3} />
                  {stat.suffix && (
                    <span className="text-muted-foreground">{stat.suffix}</span>
                  )}
                </p>
                <p className="mt-1 text-xs text-muted-foreground uppercase tracking-widest">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
