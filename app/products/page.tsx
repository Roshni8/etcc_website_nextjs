import type { Metadata } from "next";
import Link from "next/link";
import Layout from "@/components/layout/Layout";
import { productNavSections } from "@/lib/product-nav";
import { siteUrl } from "@/lib/constants";

export const metadata: Metadata = {
  title: {
    absolute: "Products — Toroidal Transformers, CTs, Potentiometers & Resistors | ETCC India",
  },
  description:
    "Browse ETCC India product families: toroidal and current transformers, linear and servo potentiometers, wire wound resistors, and rheostats. Custom manufacturing since 1994, Pune.",
  alternates: {
    canonical: siteUrl("/products"),
  },
  openGraph: {
    title: "Products — Toroidal Transformers, CTs, Potentiometers & Resistors | ETCC India",
    description:
      "Browse ETCC India product families: transformers, potentiometers, resistors, and rheostats. Pune manufacturer since 1994.",
    url: siteUrl("/products"),
    siteName: "ETCC India — Efficient Toroidal Coil Corporation",
    type: "website",
    locale: "en_IN",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "ETCC India product range" }],
  },
};

export default function ProductsHubPage() {
  return (
    <Layout>
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <h1 className="font-heading text-3xl tracking-tight md:text-4xl">
            Products
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            Efficient Toroidal Coil Corporation builds custom electromagnetic components
            for industrial, defence, medical, and audio OEMs. Select a product family for
            specifications and applications.
          </p>

          <div className="mt-12 grid gap-12 md:grid-cols-3">
            {productNavSections.map((section) => (
              <div key={section.label}>
                <h2 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {section.label}
                </h2>
                <ul className="mt-4 space-y-4">
                  {section.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="group block rounded-lg border border-border bg-card p-4 transition-shadow hover:shadow-card-hover"
                      >
                        <span className="font-semibold text-foreground group-hover:text-primary">
                          {item.title}
                        </span>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {item.subtitle}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="mt-14 text-sm text-muted-foreground">
            Need a custom rating or mechanical outline?{" "}
            <Link
              href="/about-us"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Contact us
            </Link>{" "}
            from the header quote form or the About page.
          </p>
        </div>
      </section>
    </Layout>
  );
}
