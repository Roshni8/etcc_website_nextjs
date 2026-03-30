"use client";

import { motion } from "motion/react";

const programmes = [
  { platform: "Tejas LCA Fighter", component: "Toroidal Transformer" },
  { platform: "Su-30MKI Fighter", component: "Toroidal Transformer" },
  { platform: "AN-32 Transport Aircraft", component: "Toroidal Transformer" },
  { platform: "BrahMos Missile", component: "Potentiometer Element" },
  { platform: "Arjun Main Battle Tank", component: "Toroidal Transformer" },
  { platform: "Naval Submarine", component: "Toroidal Transformer" },
  { platform: "K-28 Naval Aircraft", component: "Toroidal Transformer" },
  { platform: "HCON Aircraft", component: "Potentiometer" },
];

/* ── Plane silhouettes ── */
const PlaneBackground = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
    <svg viewBox="0 0 320 160" className="absolute -right-10 top-12 w-64 rotate-[-8deg] opacity-[0.045] md:w-80" fill="currentColor">
      <path d="M10 80 L120 60 L160 10 L170 55 L300 40 L180 70 L310 95 L180 85 L170 110 L160 75 L120 90 Z" />
    </svg>
    <svg viewBox="0 0 320 160" className="absolute -left-6 top-1/2 w-56 opacity-[0.04] md:w-72" fill="currentColor" style={{ transform: "scaleX(-1) translateY(-50%) rotate(5deg)" }}>
      <path d="M10 80 L120 60 L160 10 L170 55 L300 40 L180 70 L310 95 L180 85 L170 110 L160 75 L120 90 Z" />
    </svg>
    <svg viewBox="0 0 320 160" className="absolute bottom-16 right-20 w-40 rotate-[-15deg] opacity-[0.035] md:w-52" fill="currentColor">
      <path d="M10 80 L120 60 L160 10 L170 55 L300 40 L180 70 L310 95 L180 85 L170 110 L160 75 L120 90 Z" />
    </svg>
  </div>
);

const DefenceSection = () => {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      <PlaneBackground />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="text-center"
        >
          <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Defence &amp; Aerospace
          </p>
          <h2 className="mt-3 text-4xl font-bold tracking-tighter text-foreground md:text-5xl">
            Supplied to India&rsquo;s frontline
            <br className="hidden md:block" />
            defence programmes
          </h2>
        </motion.div>

        {/* Featured card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="mt-14 grid grid-cols-1 overflow-hidden rounded-2xl border border-border bg-card lg:grid-cols-2"
        >
          <div className="flex flex-col justify-center p-8 md:p-10 lg:p-12">
            <h3 className="text-2xl font-semibold leading-snug text-foreground md:text-3xl">
              Precision-engineered transformers, potentiometers, and current
              transformers powering India&rsquo;s critical defence platforms.
            </h3>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Deployed across fighter jets, battle tanks, naval vessels, and
              missile systems — qualified to military specifications and built
              for mission-critical reliability.
            </p>
          </div>
          <div className="relative min-h-[280px] lg:min-h-0">
            <img
              src="/assets/defence-bg.jpg"
              alt="Indian defence platforms — Su-30MKI, BrahMos missile, Arjun MBT, naval warship"
              className="h-full w-full object-cover"
              loading="lazy"
              width={640}
              height={400}
            />
          </div>
        </motion.div>

        {/* Programme cards — just name + component, no descriptions, no logos */}
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {programmes.map((prog, i) => (
            <motion.div
              key={prog.platform}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.45,
                delay: i * 0.08,
                ease: [0.23, 1, 0.32, 1],
              }}
              className="rounded-2xl border border-border bg-card px-5 py-5"
            >
              <p className="text-[15px] font-semibold text-foreground">
                {prog.platform}
              </p>
              <p className="mt-1.5 text-[13px] text-muted-foreground">
                {prog.component}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DefenceSection;
