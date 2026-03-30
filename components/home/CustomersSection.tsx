"use client";

import { motion } from "motion/react";
import { Marquee } from "@/components/ui/marquee";

/* ════════════════════════════════════════════
   CLIENT DATA
   ════════════════════════════════════════════ */

interface Client {
  name: string;
  initials: string;
  product: string;
  color: string;
  logo?: string;
}

const governmentClients: Client[] = [
  { name: "Indian Air Force", initials: "IAF", product: "400 Hz Transformer", color: "#1a365d" },
  { name: "Indian Navy", initials: "IN", product: "400 Hz Transformer", color: "#1e3a5f" },
  { name: "HAL", initials: "HAL", product: "400 Hz Transformer — Tejas LCA", color: "#2d3748", logo: "/assets/clients/HAL.png" },
  { name: "BEL", initials: "BEL", product: "High-Frequency Transformer", color: "#1a365d" },
  { name: "DRDO", initials: "DRDO", product: "All Transformers", color: "#2d3748" },
  { name: "SITAR", initials: "SIT", product: "All Transformers", color: "#374151" },
  { name: "BHEL", initials: "BHEL", product: "Wound Electronic Components", color: "#1e40af", logo: "/assets/clients/BHEL.png" },
  { name: "ECIL", initials: "ECIL", product: "Wound Electronic Components", color: "#3730a3", logo: "/assets/clients/ECIL.png" },
  { name: "MSEB", initials: "MSEB", product: "Linear Motion Potentiometer", color: "#c2410c" },
  { name: "CWPRS", initials: "CW", product: "Toroidal Transformer", color: "#0e7490", logo: "/assets/clients/CWPRS.png" },
  { name: "KSEB", initials: "KSEB", product: "Power Potentiometer", color: "#b91c1c", logo: "/assets/clients/KSEB.png" },
];

const commercialClients: Client[] = [
  { name: "Tata Motors", initials: "TM", product: "Servo Potentiometer", color: "#1e293b", logo: "/assets/clients/tata.jpg" },
  { name: "Tata Power", initials: "TP", product: "400 Hz Transformer", color: "#0f172a", logo: "/assets/clients/tata.jpg" },
  { name: "Crompton Greaves", initials: "CG", product: "Wound Electronic Components", color: "#3f3f46" },
  { name: "Forbes Marshall", initials: "FM", product: "Slide Wire Potentiometer", color: "#78350f", logo: "/assets/clients/Forbes.jpeg" },
  { name: "Kirloskar Copland", initials: "KC", product: "Toroidal Transformer", color: "#164e63", logo: "/assets/clients/Kirloskar.svg" },
  { name: "Aplab", initials: "AP", product: "Current Transformer", color: "#134e4a" },
  { name: "Labindia", initials: "LI", product: "Toroidal Transformer", color: "#713f12", logo: "/assets/clients/labindia.avif" },
  { name: "Scope T&M", initials: "ST", product: "Toroidal Transformer", color: "#44403c", logo: "/assets/clients/SCOPE-T&M.jpg" },
  { name: "EON Infotech", initials: "EI", product: "All Transformers", color: "#4c1d95" },
  { name: "Century Cement", initials: "CC", product: "Servo Potentiometer", color: "#0f172a" },
  { name: "Wonder Cement", initials: "WC", product: "Servo Potentiometer", color: "#134e4a" },
  { name: "Chettinad Cement", initials: "CC", product: "Servo Potentiometer", color: "#44403c" },
  { name: "Trinetra Cement", initials: "TC", product: "Servo Potentiometer", color: "#1e3a5f" },
  { name: "Shivam Cement", initials: "SC", product: "Servo Potentiometer", color: "#164e63" },
  { name: "Vasavdatta Cement", initials: "VC", product: "Servo Potentiometer", color: "#14532d" },
  { name: "Amrit Cement", initials: "AC", product: "Servo Potentiometer", color: "#3f3f46" },
  { name: "Sree Jayajyoti", initials: "SJ", product: "Servo Potentiometer", color: "#7c2d12" },
  { name: "Ghorahi Cement", initials: "GC", product: "Servo Potentiometer", color: "#4a5568" },
  { name: "Seshasayee Paper", initials: "SP", product: "Linear Motion Potentiometer", color: "#14532d" },
  { name: "Jayaswals Neco", initials: "JN", product: "High Wattage Resistor", color: "#581c87" },
  { name: "Indian Card Clothing", initials: "IC", product: "Servo Potentiometer", color: "#831843" },
  { name: "Supertech", initials: "ST", product: "Toroidal Transformer", color: "#9f1239" },
  { name: "Artech Welders", initials: "AW", product: "Toroidal Transformer", color: "#1a1a2e" },
  { name: "Nishko Instruments", initials: "NI", product: "Toroidal Transformer", color: "#16213e" },
  { name: "Memory Electronics", initials: "ME", product: "400 Hz Transformer", color: "#0d3b66" },
  { name: "Senergy Intellution", initials: "SI", product: "400 Hz Transformer", color: "#2d3436" },
  { name: "United Technomech", initials: "UT", product: "Wound Electronic Components", color: "#4a5568" },
];

/* ════════════════════════════════════════════
   CLIENT CARD
   ════════════════════════════════════════════ */

const ClientCard = ({ client }: { client: Client }) => (
  <div className="group flex w-48 flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-md">
    {client.logo ? (
      <div className="flex h-14 w-14 items-center justify-center rounded-xl overflow-hidden transition-transform group-hover:scale-105">
        <img src={client.logo} alt={client.name} className="h-full w-full object-contain" />
      </div>
    ) : (
      <div
        className="flex h-14 w-14 items-center justify-center rounded-xl text-white font-semibold text-base transition-transform group-hover:scale-105"
        style={{ backgroundColor: client.color }}
      >
        {client.initials}
      </div>
    )}
    <div className="text-center">
      <p className="text-sm font-medium text-foreground leading-tight">
        {client.name}
      </p>
      <p className="mt-0.5 text-[11px] text-muted-foreground leading-tight">
        {client.product}
      </p>
    </div>
  </div>
);

/* ════════════════════════════════════════════
   SECTION
   ════════════════════════════════════════════ */

const CustomersSection = () => {
  return (
    <section className="border-t border-border py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
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
            ETCC proudly serves over 500 customers across India. A
            representative selection of key accounts.
          </p>
        </motion.div>
      </div>

      {/* Two marquee rows — full width */}
      <div className="relative mt-14">
        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-16 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-16 bg-gradient-to-l from-background to-transparent" />

        {/* Row 1 — defence & government, scrolls left */}
        <Marquee pauseOnHover className="mb-4 [--duration:45s]">
          {governmentClients.map((client) => (
            <ClientCard key={`r1-${client.name}`} client={client} />
          ))}
        </Marquee>

        {/* Row 2 — commercial, scrolls right */}
        <Marquee pauseOnHover reverse className="[--duration:45s]">
          {commercialClients.map((client) => (
            <ClientCard key={`r2-${client.name}`} client={client} />
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default CustomersSection;
