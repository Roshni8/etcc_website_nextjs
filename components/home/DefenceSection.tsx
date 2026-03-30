"use client";

import { motion } from "motion/react";

const programmes = [
  { name: "Tejas LCA Fighter", component: "Toroidal Transformer", category: "Air" },
  { name: "Su-30MKI Fighter", component: "Toroidal Transformer", category: "Air" },
  { name: "AN-32 Transport Aircraft", component: "Toroidal Transformer", category: "Air" },
  { name: "HCON Aircraft", component: "Potentiometer", category: "Air" },
  { name: "K-28 Naval Aircraft", component: "Toroidal Transformer", category: "Naval" },
  { name: "Arjun Main Battle Tank", component: "Toroidal Transformer", category: "Land" },
  { name: "Naval Submarine", component: "Toroidal Transformer", category: "Naval" },
  { name: "BrahMos Missile (DRDO)", component: "Potentiometer Element", category: "Missile" },
];

const DefenceSection = () => {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* SVG silhouette background */}
      <div
        className="pointer-events-none absolute inset-0 text-stone-400 dark:text-stone-600"
        aria-hidden="true"
      >
        <img
          src="/assets/defence-silhouettes.svg"
          alt=""
          className="h-full w-full object-cover opacity-[0.06]"
        />
      </div>

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
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Components qualified, tested, and actively deployed across fighter
            jets, battle tanks, naval vessels, and missile platforms.
          </p>
        </motion.div>

        {/* Two-column: image + list */}
        <div className="mt-14 grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left — defence image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden rounded-2xl"
          >
            <img
              src="/assets/defence-bg.jpg"
              alt="Defence platforms supplied by ETCC — Su-30MKI, Tejas LCA, Arjun MBT, BrahMos missile, naval vessels"
              className="h-auto w-full object-cover"
              loading="lazy"
              width={640}
              height={400}
            />
          </motion.div>

          {/* Right — programme list */}
          <div className="flex flex-col">
            {programmes.map((prog, i) => (
              <motion.div
                key={prog.name}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.07,
                  ease: [0.23, 1, 0.32, 1],
                }}
                className="group flex items-center justify-between border-b border-border py-3.5 first:border-t"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-6 min-w-[3.25rem] items-center justify-center rounded-full bg-stone-100 px-2.5 text-[10px] font-semibold uppercase tracking-wider text-stone-500 transition-colors duration-150 group-hover:bg-stone-200 group-hover:text-stone-700">
                    {prog.category}
                  </span>
                  <span className="text-[15px] font-medium text-foreground transition-colors duration-150 group-hover:text-stone-900">
                    {prog.name}
                  </span>
                </div>
                <span className="text-[13px] text-muted-foreground transition-colors duration-150 group-hover:text-stone-600">
                  {prog.component}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DefenceSection;
