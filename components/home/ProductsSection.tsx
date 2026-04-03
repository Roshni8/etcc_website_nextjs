"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const products = [
  {
    title: "Toroidal Transformers",
    description: "10VA–3000VA, 50Hz to 10kHz",
    image: "/assets/custom-transformer-range.jpg",
    href: "/toroidal-transformers",
  },
  {
    title: "Defence Transformers",
    description: "400Hz aviation-grade, Su-30MKI & Tejas LCA",
    image: "/assets/defence-transformer-400hz.jpg",
    href: "/toroidal-transformers",
  },
  {
    title: "Servo Potentiometers",
    description: "±0.5% linearity, −55°C to +125°C",
    image: "/assets/servo-potentiometer-range.jpg",
    href: "/potentiometer",
  },
  {
    title: "Current Transformers",
    description: "50A–2000A, accuracy class 0.5",
    image: "/assets/current-transformer-range.jpg",
    href: "/current-transformer",
  },
  {
    title: "Wire Wound Resistors",
    description: "5W–200W, ceramic and aluminium housed",
    image: "/assets/resistors-range.jpg",
    href: "/wirewound-resistors",
  },
  {
    title: "Rheostats",
    description: "Rotary and slider types, 25W–500W",
    image: "/assets/slider-rheostat.jpg",
    href: "/wirewound-resistors",
  },
];

const CARD_WIDTH = 316; // 300 + 16 gap
const AUTO_SCROLL_SPEED = 0.5; // px per frame

const ProductCard = ({
  product,
}: {
  product: (typeof products)[number];
}) => (
  <Link
    href={product.href}
    className="group flex w-[300px] shrink-0 flex-col overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-lg"
  >
    <div className="h-[195px] overflow-hidden">
      <img
        src={product.image}
        alt={product.title}
        className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
        width={300}
        height={195}
      />
    </div>
    <div className="p-4">
      <h3 className="text-base font-semibold text-foreground">
        {product.title}
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        {product.description}
      </p>
    </div>
  </Link>
);

const ProductsSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number | null>(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-scroll loop
  const autoScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;

    el.scrollLeft += AUTO_SCROLL_SPEED;

    // Loop back when reaching halfway (we duplicate the content)
    const halfScroll = el.scrollWidth / 2;
    if (el.scrollLeft >= halfScroll) {
      el.scrollLeft -= halfScroll;
    }

    animRef.current = requestAnimationFrame(autoScroll);
  }, []);

  useEffect(() => {
    if (isAutoScrolling) {
      animRef.current = requestAnimationFrame(autoScroll);
    }
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isAutoScrolling, autoScroll]);

  const pauseAutoScroll = useCallback(() => {
    setIsAutoScrolling(false);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    // Resume auto-scroll after 5 seconds of no interaction
    resumeTimerRef.current = setTimeout(() => {
      setIsAutoScrolling(true);
    }, 5000);
  }, []);

  const scroll = useCallback(
    (direction: "left" | "right") => {
      if (!scrollRef.current) return;
      pauseAutoScroll();
      scrollRef.current.scrollBy({
        left: direction === "left" ? -CARD_WIDTH : CARD_WIDTH,
        behavior: "smooth",
      });
    },
    [pauseAutoScroll]
  );

  // Duplicate products for seamless loop
  const duplicatedProducts = [...products, ...products, ...products];

  return (
    <section className="py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold tracking-tighter text-foreground md:text-5xl">
            Our Products
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Engineered for precision. Built for reliability.
          </p>
        </motion.div>
      </div>

      {/* Carousel */}
      <div className="relative mt-14 group/carousel">
        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-r from-background via-background/60 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-l from-background via-background/60 to-transparent" />

        {/* Left chevron */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-card/90 border border-border text-muted-foreground shadow-md opacity-0 group-hover/carousel:opacity-100 transition-all duration-200 hover:bg-card hover:text-foreground hover:scale-105 active:scale-95"
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* Right chevron */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-card/90 border border-border text-muted-foreground shadow-md opacity-0 group-hover/carousel:opacity-100 transition-all duration-200 hover:bg-card hover:text-foreground hover:scale-105 active:scale-95"
          aria-label="Scroll right"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-hidden px-6 py-2"
          onMouseEnter={pauseAutoScroll}
          onMouseLeave={() => {
            if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
            resumeTimerRef.current = setTimeout(() => setIsAutoScrolling(true), 1000);
          }}
        >
          {duplicatedProducts.map((product, i) => (
            <ProductCard key={`${product.title}-${i}`} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
