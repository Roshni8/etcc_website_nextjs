const shimmer =
  "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-muted-foreground/20 before:to-transparent";

/* ── Hero Skeleton ── */
export const HeroSkeleton = () => (
  <section className="py-20 md:py-32">
    <div className="mx-auto max-w-6xl px-6">
      <div className="flex flex-col items-center text-center">
        {/* Badge */}
        <div className={`h-8 w-72 rounded-full bg-muted ${shimmer}`} />
        {/* Headline */}
        <div className={`mt-8 h-16 w-[28rem] max-w-full rounded-lg bg-muted ${shimmer}`} />
        <div className={`mt-3 h-16 w-64 rounded-lg bg-muted ${shimmer}`} />
        {/* Subtitle */}
        <div className={`mt-6 h-5 w-[32rem] max-w-full rounded bg-muted ${shimmer}`} />
        <div className={`mt-2 h-5 w-[26rem] max-w-full rounded bg-muted ${shimmer}`} />
        {/* Buttons */}
        <div className="mt-8 flex gap-4">
          <div className={`h-12 w-44 rounded-full bg-muted ${shimmer}`} />
          <div className={`h-12 w-44 rounded-full bg-muted ${shimmer}`} />
        </div>
        {/* Stats */}
        <div className="mt-14 flex gap-14">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className={`h-9 w-16 rounded bg-muted ${shimmer}`} />
              <div className={`h-3 w-14 rounded bg-muted ${shimmer}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

/* ── Products Skeleton ── */
export const ProductsSkeleton = () => (
  <section className="py-20 md:py-32">
    <div className="mx-auto max-w-6xl px-6 text-center">
      <div className={`mx-auto h-12 w-56 rounded-lg bg-muted ${shimmer}`} />
      <div className={`mx-auto mt-4 h-5 w-80 rounded bg-muted ${shimmer}`} />
    </div>
    <div className="mt-14 flex gap-4 overflow-hidden px-6">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="w-[300px] shrink-0 rounded-2xl border border-stone-100"
        >
          <div className={`h-[195px] rounded-t-2xl bg-muted ${shimmer}`} />
          <div className="p-4 space-y-2">
            <div className={`h-5 w-40 rounded bg-muted ${shimmer}`} />
            <div className={`h-4 w-56 rounded bg-muted ${shimmer}`} />
          </div>
        </div>
      ))}
    </div>
  </section>
);

/* ── Defence Skeleton ── */
export const DefenceSkeleton = () => (
  <section className="py-20 md:py-32">
    <div className="mx-auto max-w-6xl px-6">
      <div className="text-center">
        <div className={`mx-auto h-4 w-36 rounded bg-muted ${shimmer}`} />
        <div className={`mx-auto mt-3 h-12 w-96 max-w-full rounded-lg bg-muted ${shimmer}`} />
        <div className={`mx-auto mt-4 h-5 w-[28rem] max-w-full rounded bg-muted ${shimmer}`} />
      </div>
      <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        <div className={`h-[320px] rounded-2xl bg-muted ${shimmer}`} />
        <div className="flex flex-col gap-0">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between border-b border-stone-100 py-3.5"
            >
              <div className="flex items-center gap-3">
                <div className={`h-6 w-12 rounded-full bg-muted ${shimmer}`} />
                <div className={`h-4 w-36 rounded bg-muted ${shimmer}`} />
              </div>
              <div className={`h-3.5 w-28 rounded bg-muted ${shimmer}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

/* ── Customers Skeleton ── */
export const CustomersSkeleton = () => (
  <section className="border-t border-border py-20 md:py-32">
    <div className="mx-auto max-w-6xl px-6 text-center">
      <div className={`mx-auto h-12 w-52 rounded-lg bg-muted ${shimmer}`} />
      <div className={`mx-auto mt-4 h-5 w-96 max-w-full rounded bg-muted ${shimmer}`} />
    </div>
    <div className="mt-14 space-y-4">
      {[0, 1].map((row) => (
        <div key={row} className="flex gap-4 overflow-hidden px-4">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="flex w-48 shrink-0 flex-col items-center gap-3 rounded-xl border border-stone-100 p-5"
            >
              <div className={`h-14 w-14 rounded-xl bg-muted ${shimmer}`} />
              <div className={`h-4 w-24 rounded bg-muted ${shimmer}`} />
              <div className={`h-3 w-20 rounded bg-muted ${shimmer}`} />
            </div>
          ))}
        </div>
      ))}
    </div>
  </section>
);
