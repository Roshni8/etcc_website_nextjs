"use client";

import { motion } from "motion/react";
import { Marquee } from "@/components/ui/marquee";

/* ════════════════════════════════════════════
   CLIENT DATA — per-logo scale tuned to each logo's shape

   scale guide (tell me adjustments like "make HAL bigger"):
     HAL      → wide landscape (174×93)
     BHEL     → nearly square (500×411)
     ECIL     → slightly wide (278×214)
     CWPRS    → slightly wide (982×798)
     KSEB     → wide landscape (948×408)
     Tata     → portrait/tall (284×338)
     Forbes   → square (2048×2048)
     Kirloskar → square SVG (211×198)
     Labindia → avif
     Scope    → landscape (300×200)
   ════════════════════════════════════════════ */

interface Client {
  name: string;
  logo?: string;
  initials?: string;
  /** Tailwind scale class per logo — default "scale-100" */
  zoom?: string;
}

const governmentClients: Client[] = [
  { name: "HAL", logo: "/assets/clients/HAL.png", zoom: "scale-[1.6]" },
  { name: "BHEL", logo: "/assets/clients/BHEL.png", zoom: "scale-[1.1]" },
  { name: "ECIL", logo: "/assets/clients/ECIL.png", zoom: "scale-[1.3]" },
  { name: "CWPRS", logo: "/assets/clients/CWPRS.png", zoom: "scale-[1.2]" },
  { name: "KSEB", logo: "/assets/clients/KSEB.png", zoom: "scale-[1.5]" },
  { name: "Indian Air Force", initials: "IAF" },
  { name: "Indian Navy", initials: "IN" },
  { name: "DRDO", initials: "DRDO" },
  { name: "BEL", initials: "BEL" },
  { name: "SITAR", initials: "SITAR" },
  { name: "MSEB", initials: "MSEB" },
];

const commercialClients: Client[] = [
  { name: "Tata", logo: "/assets/clients/tata.jpg", zoom: "scale-[1.0]" },
  { name: "Forbes Marshall", logo: "/assets/clients/Forbes.jpeg", zoom: "scale-[1.0]" },
  { name: "Kirloskar", logo: "/assets/clients/Kirloskar.svg", zoom: "scale-[1.2]" },
  { name: "Labindia", logo: "/assets/clients/labindia.avif", zoom: "scale-[1.3]" },
  { name: "Scope T&M", logo: "/assets/clients/SCOPE-T&M.jpg", zoom: "scale-[1.4]" },
  { name: "Crompton Greaves", initials: "CG" },
  { name: "Aplab", initials: "APLAB" },
  { name: "EON Infotech", initials: "EON" },
  { name: "Century Cement", initials: "CENTURY" },
  { name: "Seshasayee Paper", initials: "SPB" },
  { name: "Artech Welders", initials: "ARTECH" },
];

/* ════════════════════════════════════════════
   LOGO CARD — mix-blend-mode removes white bg visually
   ════════════════════════════════════════════ */

const LogoCard = ({ client }: { client: Client }) => (
  <div className="flex h-24 w-48 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-stone-100 p-4 dark:bg-stone-800/50">
    {client.logo ? (
      <img
        src={client.logo}
        alt={client.name}
        className={`max-h-14 w-auto max-w-[130px] object-contain mix-blend-multiply grayscale dark:mix-blend-normal dark:invert ${client.zoom || ""}`}
        loading="lazy"
      />
    ) : (
      <span className="text-lg font-bold tracking-tight text-stone-500 dark:text-stone-400">
        {client.initials || client.name}
      </span>
    )}
  </div>
);

/* ════════════════════════════════════════════
   SECTION
   ════════════════════════════════════════════ */

const CustomersSection = () => {
  return (
    <section className="border-t border-border py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold tracking-tighter text-foreground md:text-5xl">
            Our Customers
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Trusted by India&rsquo;s leading defence, government, and industrial
            organisations.
          </p>
        </motion.div>
      </div>

      {/* Marquee rows — full width, auto scroll, no chevrons */}
      <div className="relative mt-14">
        {/* Fade edges */}
        <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

        {/* Row 1 — scrolls left */}
        <Marquee pauseOnHover className="mb-4 [--duration:50s]">
          {governmentClients.map((client) => (
            <LogoCard key={`r1-${client.name}`} client={client} />
          ))}
        </Marquee>

        {/* Row 2 — scrolls right */}
        <Marquee pauseOnHover reverse className="[--duration:50s]">
          {commercialClients.map((client) => (
            <LogoCard key={`r2-${client.name}`} client={client} />
          ))}
        </Marquee>
      </div>

      {/* Footer text */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-10 text-center text-sm text-muted-foreground"
      >
        And 500+ more customers across defence, industrial, and commercial sectors.
      </motion.p>
    </section>
  );
};

export default CustomersSection;
