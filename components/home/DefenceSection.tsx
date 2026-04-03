"use client";

import { motion } from "motion/react";
import { Meteors } from "@/components/ui/meteors";

const programmes = [
  { category: "AIR", platform: "Tejas LCA Fighter", component: "Toroidal Transformer" },
  { category: "AIR", platform: "Su-30MKI Fighter", component: "Toroidal Transformer" },
  { category: "AIR", platform: "AN-32 Transport Aircraft", component: "Toroidal Transformer" },
  { category: "AIR", platform: "YCON Aircraft", component: "Potentiometer" },
  { category: "NAVAL", platform: "K-28 Naval Aircraft", component: "Toroidal Transformer" },
  { category: "LAND", platform: "Arjun Main Battle Tank", component: "Toroidal Transformer" },
  { category: "NAVAL", platform: "Naval Submarine", component: "Toroidal Transformer" },
  { category: "MISSILE", platform: "BrahMos Missile (DRDO)", component: "Potentiometer Element" },
];

/* ── Grid background — larger cells (48px) ── */
const GridBackground = () => (
  <div className="pointer-events-none absolute inset-0" aria-hidden="true">
    <div
      className="absolute inset-0"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
      }}
    />
    {/* Radial fade so grid doesn't feel flat */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
  </div>
);

const NotchTransition = () => (
  <div className="absolute inset-x-0 top-0 z-20" aria-hidden="true">
    <div className="relative mx-auto flex h-16 max-w-[min(700px,calc(100vw-2rem))] -translate-y-px items-start justify-center text-background">
      <svg
        viewBox="0 0 85 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto shrink-0 translate-x-px translate-y-px overflow-visible"
      >
        <rect x="0" y="0" width="85" height="1" fill="currentColor" transform="translate(0, -1)" />
        <path
          d="M50 45C57.3095 56.6952 71.2084 63.9997 85 64V0H0C13.7915 0 26.6905 7.30481 34 19L50 45Z"
          fill="currentColor"
        />
      </svg>
      <div className="relative z-10 h-[calc(100%+1px)] min-w-0 grow border-t border-current bg-current" />
      <svg
        viewBox="0 0 85 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto shrink-0 -translate-x-px translate-y-px -scale-x-100 overflow-visible"
      >
        <rect x="0" y="0" width="85" height="1" fill="currentColor" transform="translate(0, -1)" />
        <path
          d="M50 45C57.3095 56.6952 71.2084 63.9997 85 64V0H0C13.7915 0 26.6905 7.30481 34 19L50 45Z"
          fill="currentColor"
        />
      </svg>
    </div>
  </div>
);

const DefenceSection = () => {
  return (
    <section className="relative bg-zinc-950">
      <NotchTransition />
      <div className="relative overflow-hidden">
        <GridBackground />
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <Meteors number={18} minDuration={3} maxDuration={10} angle={215} />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-6 pt-32 pb-24 md:pt-40 md:pb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="text-center"
          >
            <p className="text-sm font-medium uppercase tracking-widest text-zinc-500">
              Defence &amp; Aerospace
            </p>
            <h2 className="mt-3 text-4xl font-bold tracking-tighter text-white md:text-5xl">
              Supplied to India&rsquo;s
              <br className="hidden md:block" />
              defence programmes
            </h2>
          </motion.div>

          <div className="relative mt-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/80 backdrop-blur-sm"
            >
              <div className="grid grid-cols-1 gap-0 lg:grid-cols-2">
                <div className="flex flex-col justify-center p-8 md:p-10 lg:p-12">
                  <h3 className="text-2xl font-semibold leading-snug text-white md:text-3xl lg:text-[2rem] lg:leading-[1.3]">
                    Custom engineered transformers, potentiometers, and current
                    transformers powering India&rsquo;s critical defence platforms.
                  </h3>
                  <p className="mt-6 text-sm leading-relaxed text-zinc-400 md:text-base">
                    Over 20 years of manufacturing expertise for defence
                    applications, with systems deployed across fighter jets, battle
                    tanks, naval vessels, and missile platforms.
                  </p>
                </div>

                <div className="border-t border-zinc-800 lg:border-l lg:border-t-0">
                  {programmes.map((prog, i) => (
                    <motion.div
                      key={prog.platform}
                      initial={{ opacity: 0, x: 24 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-30px" }}
                      transition={{
                        duration: 0.4,
                        delay: i * 0.1,
                        ease: [0.23, 1, 0.32, 1],
                      }}
                      className={`flex items-center gap-4 px-6 py-3.5 ${
                        i !== programmes.length - 1
                          ? "border-b border-zinc-800"
                          : ""
                      }`}
                    >
                      <span className="shrink-0 rounded bg-zinc-800 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                        {prog.category}
                      </span>
                      <span className="flex-1 text-sm font-medium text-white">
                        {prog.platform}
                      </span>
                      <span className="text-xs text-zinc-400">
                        {prog.component}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DefenceSection;
