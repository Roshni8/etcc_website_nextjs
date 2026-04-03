import type { Metadata } from "next";
import Link from "next/link";
import Layout from "@/components/layout/Layout";
import { siteUrl } from "@/lib/constants";

export const metadata: Metadata = {
  title: {
    absolute: "Projects & OEM Partnerships | ETCC India",
  },
  description:
    "ETCC India supplies custom toroidal transformers, CTs, potentiometers, and resistors for defence, aerospace, industrial, and medical OEM programmes. Discuss your project requirements.",
  alternates: {
    canonical: siteUrl("/projects"),
  },
  openGraph: {
    title: "Projects & OEM Partnerships | ETCC India",
    description:
      "Custom electromagnetic components for defence, industrial, and medical OEMs. Pune manufacturing since 1994.",
    url: siteUrl("/projects"),
    siteName: "ETCC India — Efficient Toroidal Coil Corporation",
    type: "website",
    locale: "en_IN",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "ETCC India OEM manufacturing" }],
  },
};

export default function ProjectsPage() {
  return (
    <Layout>
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6">
          <h1 className="font-heading text-3xl tracking-tight md:text-4xl">
            Projects
          </h1>
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
            <p className="text-foreground">
              We work with engineering teams that need repeatable, documented components
              for long product lifecycles — including defence, aerospace, industrial
              automation, medical devices, and high-end audio.
            </p>
            <p>
              Engagements typically cover custom electrical ratings, mechanical outlines,
              environmental qualification, and production continuity. We do not publish
              confidential customer programmes on the web; reach out with your
              specification or drawing set to scope feasibility and lead time.
            </p>
          </div>
          <ul className="mt-8 list-disc space-y-2 pl-5 text-sm text-foreground md:text-base">
            <li>Custom toroidal transformers and current transformers</li>
            <li>Precision wire wound potentiometers and linear motion sensors</li>
            <li>Power resistors and rheostats for control and load applications</li>
          </ul>
          <p className="mt-10 text-sm text-muted-foreground">
            <Link href="/products" className="font-medium text-primary underline-offset-4 hover:underline">
              View product families
            </Link>
            {" · "}
            <Link href="/about-us" className="font-medium text-primary underline-offset-4 hover:underline">
              About ETCC
            </Link>
            {" · "}
            <Link href="/blog" className="font-medium text-primary underline-offset-4 hover:underline">
              Engineering notes
            </Link>
          </p>
        </div>
      </section>
    </Layout>
  );
}
