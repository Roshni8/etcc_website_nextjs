import type { Metadata } from "next";
import PageClient from "./PageClient";

export const metadata: Metadata = {
  title: { absolute: "Wire Wound Resistor & Rheostat Manufacturer India | ETCC India" },
  description:
    "High wattage wire wound resistors 5W to 200W and rheostats 25W to 500W. For power electronics, motor control, and industrial loads. ETCC Pune manufacturer since 1994.",
  alternates: {
    canonical: "https://etccindia.com/wirewound-resistors",
  },
  openGraph: {
    title: "Wire Wound Resistor & Rheostat Manufacturer India | ETCC India",
    description:
      "High wattage wire wound resistors 5W to 200W and rheostats 25W to 500W. For power electronics, motor control, and industrial loads. ETCC Pune manufacturer since 1994.",
    url: "https://etccindia.com/wirewound-resistors",
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
    { "@type": "ListItem", position: 2, name: "Wire Wound Resistors & Rheostats", item: "https://etccindia.com/wirewound-resistors" },
  ],
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Wire Wound Resistors and Rheostats",
  description:
    "High-power wire wound resistors from 5W to 200W in ceramic-tube and aluminium-housed constructions. Wirewound rheostats 25W to 500W in rotary and slider configurations. For power electronics, motor control, and industrial loads.",
  url: "https://etccindia.com/wirewound-resistors",
  image: ["https://etccindia.com/assets/resistors-assorted.png"],
  brand: { "@type": "Brand", name: "ETCC India" },
  manufacturer: { "@id": "https://etccindia.com/#organization" },
  category: "Electronic Components > Resistors > Wire Wound",
  additionalProperty: [
    { "@type": "PropertyValue", name: "Resistor Power Range", value: "5W to 200W" },
    { "@type": "PropertyValue", name: "Resistance Range", value: "0.1\u03a9 to 100k\u03a9" },
    { "@type": "PropertyValue", name: "Resistor Tolerance", value: "\u00b15% to \u00b110%" },
    { "@type": "PropertyValue", name: "Rheostat Power Range", value: "25W to 500W" },
    { "@type": "PropertyValue", name: "Rheostat Max Current", value: "5A to 25A" },
    { "@type": "PropertyValue", name: "Construction", value: "Ceramic tube, Ceramic body, Aluminium housed" },
  ],
  offers: {
    "@type": "Offer",
    url: "https://etccindia.com/wirewound-resistors",
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
