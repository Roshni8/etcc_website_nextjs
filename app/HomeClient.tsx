"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Zap, Gauge, Activity, Wrench, ArrowRight, ChevronLeft, ChevronRight, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/ProductCard";

const QuoteModal = dynamic(() => import("@/components/QuoteModal"), { ssr: false });

const slides = [
  {
    image: "/assets/products-400htz.png",
    title: "Toroidal Transformers",
    subtitle: "High-frequency 400 Hz, high-efficiency, fully custom transformers — engineered to your exact specifications.",
    link: "/toroidal-transformers",
  },
  {
    image: "/assets/products-current-transformer.png",
    title: "Current Transformers",
    subtitle: "Precision current measurement transformers for metering, protection, and power quality monitoring.",
    link: "/current-transformer",
  },
  {
    image: "/assets/products-potentiometer.png",
    title: "Potentiometers",
    subtitle: "Wire wound potentiometers for industrial control, servo systems, and precision measurement.",
    link: "/potentiometer",
  },
  {
    image: "/assets/products-assorted.png",
    title: "Wirewound Resistors",
    subtitle: "High-power wire wound resistors and rheostats built for demanding industrial environments.",
    link: "/wirewound-resistors",
  },
];

const Index = () => {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <Layout>
      {/* Hero Slider Section */}
      <section className="relative overflow-hidden bg-stone-900 h-[480px] md:h-[540px]">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <div className="absolute inset-0 bg-stone-900">
              <img
                src={slide.image}
                alt={slide.title}
                className="h-full w-full object-cover object-center"
                loading={index === 0 ? "eager" : "lazy"}
                {...(index === 0 ? { fetchPriority: "high" as const } : {})}
                width={1200}
                height={540}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/30 to-transparent" />
          </div>
        ))}

        {/* Text overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-20 pb-16 md:pb-20">
          <div className="main-container">
            <div className="max-w-xl">
              <h1 className="mb-2 font-heading text-2xl font-bold text-stone-50 md:text-3xl lg:text-4xl">
                Precision Electromagnetic Components — ETCC India
              </h1>
              <p className="mb-1 text-lg font-semibold text-stone-100">
                {slides[currentSlide].title}
              </p>
              <p className="mb-5 text-sm leading-relaxed text-white/80 md:text-base max-w-lg">
                {slides[currentSlide].subtitle}
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  size="default"
                  onClick={() => setQuoteOpen(true)}
                  className="bg-primary text-primary-foreground hover:bg-primary-dark"
                >
                  Get a Quote
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
                <Button
                  size="default"
                  variant="outline"
                  asChild
                  className="border-stone-300/40 text-stone-900 bg-stone-100 hover:bg-stone-200 hover:border-stone-200"
                >
                  <Link href={slides[currentSlide].link}>View Product</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Slider Controls */}
        <div className="absolute bottom-4 left-0 right-0 z-20 main-container flex items-center justify-between">
          <div className="flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentSlide ? "w-8 bg-primary" : "w-3 bg-stone-400 hover:bg-stone-300"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button
              onClick={prevSlide}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-stone-400/30 bg-stone-50/10 text-stone-50 backdrop-blur transition-colors hover:bg-stone-50/20"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={nextSlide}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-stone-400/30 bg-stone-50/10 text-stone-50 backdrop-blur transition-colors hover:bg-stone-50/20"
              aria-label="Next slide"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Product Overview Cards */}
      <section className="section-lg main-container">
        <div className="mb-12 text-center">
          <h2 className="mb-3">Our Product Range</h2>
          <p className="mx-auto max-w-xl text-muted-foreground">
            Four decades of expertise in custom electromagnetic component design and manufacturing.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <ProductCard
            title="Toroidal Transformers"
            description="High-efficiency toroidal transformers with low magnetic field radiation, compact size, and custom voltage ratings."
            href="/toroidal-transformers"
            icon={<Zap className="h-7 w-7" />}
          />
          <ProductCard
            title="Potentiometers"
            description="Precision wire wound potentiometers including servo types for industrial control and measurement applications."
            href="/potentiometer"
            icon={<Gauge className="h-7 w-7" />}
          />
          <ProductCard
            title="Current Transformers"
            description="Accurate current measurement transformers for metering, protection, and power monitoring systems."
            href="/current-transformer"
            icon={<Activity className="h-7 w-7" />}
          />
          <ProductCard
            title="Wire Wound Resistors"
            description="High-power wire wound resistors and rheostats designed for demanding industrial environments."
            href="/wirewound-resistors"
            icon={<Wrench className="h-7 w-7" />}
          />
        </div>
      </section>

      {/* Defence Grade Products Section */}
      <section className="relative section-lg text-stone-50 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/assets/defence-bg.jpg"
            alt=""
            className="h-full w-full object-cover opacity-45"
            loading="lazy"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-stone-900/60" />
        </div>

        <div className="relative z-10 main-container">
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium text-blue-900 backdrop-blur-sm">
                <Shield className="h-4 w-4" />
                Defence & Strategic Applications
              </div>
              <h2 className="mb-4 text-stone-50 text-2xl md:text-3xl font-bold">
                Defence Grade Products
              </h2>
              <p className="mb-6 text-stone-200 leading-relaxed">
                We design and manufacture high-reliability transformers and precision potentiometers for defence and strategic applications, working with organizations such as DRDO, BHEL, and other defence PSUs. Our products are engineered to meet stringent military and industrial standards where performance and reliability are critical.
              </p>
              <p className="mb-8 text-stone-300 text-sm leading-relaxed">
                Our toroidal transformers offer a compact and lightweight form factor, delivering 25–45% size and weight reduction compared to conventional EI-core designs. They feature low electromagnetic emissions, helping meet MIL-STD-461 requirements, and operate quietly — ideal for avionics, UAV systems, radar units, missile guidance, communication equipment, and tactical electronics. Power ratings range from 10 VA to 15 kVA, with voltage capability up to 3 kV and reliable operation across −40°C to +70°C.
              </p>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="overflow-hidden rounded-2xl border border-stone-50/10 shadow-2xl bg-stone-50/5 backdrop-blur-sm p-4 flex items-center justify-center">
                  <img
                    src="/assets/defence-sukoi-tr.png"
                    alt="Transformer designed for Su-30MKI programme"
                    className="w-full h-auto max-h-[280px] object-contain"
                    loading="lazy"
                    width={400}
                    height={280}
                  />
                </div>
                <div className="overflow-hidden rounded-2xl border border-stone-50/10 shadow-2xl bg-stone-50/5 backdrop-blur-sm p-4 flex items-center justify-center">
                  <img
                    src="/assets/defence-tejas-tr.png"
                    alt="Transformer designed for Tejas LCA programme"
                    className="w-full h-auto max-h-[280px] object-contain"
                    loading="lazy"
                    width={400}
                    height={280}
                  />
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 rounded-xl bg-primary p-4 shadow-lg">
                <p className="text-2xl font-bold text-stone-50">20+</p>
                <p className="text-xs text-stone-50/80">Years in Defence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="main-container section-lg">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary-dark to-primary p-8 md:p-16">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-stone-50/5" />
          <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-stone-50/5" />
          <div className="absolute right-10 bottom-10 h-32 w-32 rounded-full bg-stone-50/5" />
          <div className="relative z-10 flex flex-col items-center text-center md:flex-row md:text-left md:justify-between md:gap-8">
            <div className="mb-8 md:mb-0">
              <h2 className="mb-3 text-stone-50">
                Need a Custom Solution?
              </h2>
              <p className="max-w-lg text-stone-50/80">
                Our engineering team works with you to design components that meet your exact specifications. From prototype to production.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                onClick={() => setQuoteOpen(true)}
                className="bg-stone-100 text-stone-900 font-semibold hover:bg-stone-200 shadow-lg"
              >
                Request Custom Quote
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-stone-300/30 text-stone-900 bg-stone-100 hover:bg-stone-200 hover:border-stone-200"
              >
                <Link href="/about-us">Learn About Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <QuoteModal open={quoteOpen} onOpenChange={setQuoteOpen} />
    </Layout>
  );
};

export default Index;
