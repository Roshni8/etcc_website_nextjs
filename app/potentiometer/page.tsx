import type { Metadata } from "next";
import PageClient from "./PageClient";

export const metadata: Metadata = {
  title: { absolute: "Wire Wound Servo Potentiometer Manufacturer | ETCC India" },
  description:
    "Precision wire wound servo potentiometers for industrial and defence use. Custom specifications, 2W to 7W, linear, ganged and multi-turn configurations. Manufacturer in Pune.",
  alternates: {
    canonical: "https://etccindia.com/potentiometer",
  },
  openGraph: {
    title: "Wire Wound Servo Potentiometer Manufacturer | ETCC India",
    description:
      "Precision wire wound servo potentiometers for industrial and defence use. Custom specifications, 2W to 7W, linear, ganged and multi-turn configurations. Manufacturer in Pune.",
    url: "https://etccindia.com/potentiometer",
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
    { "@type": "ListItem", position: 2, name: "Wire Wound Potentiometers", item: "https://etccindia.com/potentiometer" },
  ],
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Wire Wound Servo Potentiometer",
  description:
    "Precision wire wound servo potentiometers for industrial, instrumentation, servo, and defence applications. Standard range ETC/SE/37 to ETC/SE/76 with resistance values from 20\u03a9 to 100k\u03a9, power ratings 2W to 7W, and operational temperature \u221255\u00b0C to +125\u00b0C.",
  url: "https://etccindia.com/potentiometer",
  image: [
    "https://etccindia.com/assets/servo-potentiometer.png",
    "https://etccindia.com/assets/ganged-potentiometer.png",
  ],
  brand: { "@type": "Brand", name: "ETCC India" },
  manufacturer: { "@id": "https://etccindia.com/#organization" },
  category: "Electronic Components > Potentiometers > Wire Wound",
  additionalProperty: [
    { "@type": "PropertyValue", name: "Resistance Range", value: "20\u03a9 to 100k\u03a9" },
    { "@type": "PropertyValue", name: "Power Rating", value: "2W to 7W" },
    { "@type": "PropertyValue", name: "Mechanical Angle", value: "360\u00b0" },
    { "@type": "PropertyValue", name: "Electrical Angle", value: "355\u00b0 \u00b1 2\u00b0" },
    { "@type": "PropertyValue", name: "Operating Temperature", value: "\u221255\u00b0C to +125\u00b0C" },
    { "@type": "PropertyValue", name: "Dielectric Strength", value: "1000 V RMS" },
    { "@type": "PropertyValue", name: "Rotational Life", value: "2 \u00d7 10\u2075 cycles" },
  ],
  offers: {
    "@type": "Offer",
    url: "https://etccindia.com/potentiometer",
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
