import type { Metadata } from "next";
import PageClient from "./PageClient";
import { siteUrl } from "@/lib/constants";

export const metadata: Metadata = {
  title: { absolute: "Current Transformers 50A–5000A | Wound CT & Flexible Rogowski Coil | ETCC India" },
  description:
    "Precision LT current transformers — wound ring-type CTs (50A–2000A, metering class 0.5, protection class 1.0) and flexible Rogowski coils (up to 5000A). Tested to IEC 61869-2 / IS 2705. Pune manufacturer since 1994.",
  alternates: {
    canonical: siteUrl("/current-transformer"),
  },
  openGraph: {
    title: "Current Transformers 50A–5000A | Wound CT & Flexible Rogowski Coil | ETCC India",
    description:
      "Precision LT current transformers — wound ring-type CTs (50A–2000A, metering class 0.5, protection class 1.0) and flexible Rogowski coils (up to 5000A). Tested to IEC 61869-2 / IS 2705. Pune manufacturer since 1994.",
    url: siteUrl("/current-transformer"),
    siteName: "ETCC India — Efficient Toroidal Coil Corporation",
    type: "website",
    locale: "en_IN",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "ETCC India current transformers" }],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://etccindia.com/" },
    { "@type": "ListItem", position: 2, name: "Current Transformers", item: "https://etccindia.com/current-transformer" },
  ],
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Current Transformer",
  description:
    "Precision LT current transformers with primary current range 50A to 2000A and 5A secondary output. Metering accuracy class 0.5 and protection class 1.0 per IEC 61869-2. Window, wound, bar-type, and split-core configurations available.",
  url: "https://etccindia.com/current-transformer",
  image: [
    "https://etccindia.com/assets/current-transformer-range.png",
    "https://etccindia.com/assets/flexible-current-transformer.png",
  ],
  brand: { "@type": "Brand", name: "ETCC India" },
  manufacturer: { "@id": "https://etccindia.com/#organization" },
  category: "Electronic Components > Transformers > Current Transformers",
  additionalProperty: [
    { "@type": "PropertyValue", name: "Primary Current Range", value: "50A to 2000A" },
    { "@type": "PropertyValue", name: "Secondary Current", value: "5A" },
    { "@type": "PropertyValue", name: "Accuracy Class", value: "0.5 (Metering), 1.0 (Protection)" },
    { "@type": "PropertyValue", name: "Burden", value: "5 VA to 30 VA" },
    { "@type": "PropertyValue", name: "Configurations", value: "Window, Wound, Bar-type, Split-core" },
    { "@type": "PropertyValue", name: "Standard", value: "IEC 61869-2 / IS 2705" },
  ],
  offers: {
    "@type": "Offer",
    url: "https://etccindia.com/current-transformer",
    seller: { "@id": "https://etccindia.com/#organization" },
    availability: "https://schema.org/InStock",
    priceCurrency: "INR",
    priceSpecification: {
      "@type": "PriceSpecification",
      priceCurrency: "INR",
      description: "Price on request \u2014 contact for custom quote",
    },
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <PageClient />
    </>
  );
}
