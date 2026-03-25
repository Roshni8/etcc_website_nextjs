import type { Metadata } from "next";
import PageClient from "./PageClient";

export const metadata: Metadata = {
  title: { absolute: "Current Transformer Manufacturer India | ETCC India" },
  description:
    "Precision LT current transformers, 50A to 2000A primary current with 5A secondary. Metering and protection class accuracy. Pune manufacturer since 1994.",
  alternates: {
    canonical: "https://etccindia.com/current-transformer",
  },
  openGraph: {
    title: "Current Transformer Manufacturer India | ETCC India",
    description:
      "Precision LT current transformers, 50A to 2000A primary current with 5A secondary. Metering and protection class accuracy. Pune manufacturer since 1994.",
    url: "https://etccindia.com/current-transformer",
    siteName: "ETCC India — Efficient Toroidal Coil Corporation",
    type: "website",
    locale: "en_IN",
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
