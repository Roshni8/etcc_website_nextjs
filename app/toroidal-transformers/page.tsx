import type { Metadata } from "next";
import PageClient from "./PageClient";

export const metadata: Metadata = {
  title: { absolute: "Toroidal Transformer Manufacturer India | ETCC India" },
  description:
    "Custom toroidal power transformers 10VA to 3000VA. Low noise, compact design for industrial, audio, medical and defence applications. Manufacturer since 1994, Pune.",
  alternates: {
    canonical: "https://etccindia.com/toroidal-transformers",
  },
  openGraph: {
    title: "Toroidal Transformer Manufacturer India | ETCC India",
    description:
      "Custom toroidal power transformers 10VA to 3000VA. Low noise, compact design for industrial, audio, medical and defence applications. Manufacturer since 1994, Pune.",
    url: "https://etccindia.com/toroidal-transformers",
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
    { "@type": "ListItem", position: 2, name: "Toroidal Transformers", item: "https://etccindia.com/toroidal-transformers" },
  ],
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Toroidal Transformer",
  description:
    "Custom toroidal power transformers from 10 VA to 3000 VA with 0\u2013230V AC primary voltage. Low electromagnetic interference, compact design, higher efficiency than laminated EI-core types. Available for industrial, audio, medical, and defence applications.",
  url: "https://etccindia.com/toroidal-transformers",
  image: [
    "https://etccindia.com/assets/toroidal-custom.png",
    "https://etccindia.com/assets/toroidal-assorted.png",
  ],
  brand: { "@type": "Brand", name: "ETCC India" },
  manufacturer: { "@id": "https://etccindia.com/#organization" },
  category: "Electronic Components > Transformers > Toroidal Transformers",
  additionalProperty: [
    { "@type": "PropertyValue", name: "Power Range", value: "10 VA to 3000 VA" },
    { "@type": "PropertyValue", name: "Primary Voltage", value: "0\u2013230V AC" },
    { "@type": "PropertyValue", name: "Frequency Range", value: "50 Hz to 10 kHz" },
    { "@type": "PropertyValue", name: "Max Operating Temperature", value: "200\u00b0C" },
  ],
  offers: {
    "@type": "Offer",
    url: "https://etccindia.com/toroidal-transformers",
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
