import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: { absolute: "Toroidal Transformers & Precision Potentiometers | ETCC India" },
  description:
    "ETCC manufactures precision toroidal transformers, current transformers, and wire wound potentiometers since 1994. Pune, India. Request a quote.",
  alternates: {
    canonical: "https://etccindia.com/",
  },
  openGraph: {
    title: "Toroidal Transformers & Precision Potentiometers | ETCC India",
    description:
      "ETCC manufactures precision toroidal transformers, current transformers, and wire wound potentiometers since 1994. Pune, India. Request a quote.",
    url: "https://etccindia.com/",
    siteName: "ETCC India — Efficient Toroidal Coil Corporation",
    type: "website",
    locale: "en_IN",
  },
};

const siteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://etccindia.com/#organization",
      name: "Efficient Toroidal Coil Corporation",
      alternateName: "ETCC India",
      url: "https://etccindia.com/",
      logo: {
        "@type": "ImageObject",
        url: "https://etccindia.com/assets/etcc-logo.png",
      },
      foundingDate: "1994",
      description:
        "Efficient Toroidal Coil Corporation (ETCC) manufactures custom toroidal transformers, wire wound servo potentiometers, current transformers, and wire wound resistors and rheostats. Established 1994, Pune, India.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Unit No. 11, Electronic Sadan No.-1, MIDC, Bhosari",
        addressLocality: "Pimpri-Chinchwad",
        addressRegion: "Maharashtra",
        postalCode: "411026",
        addressCountry: "IN",
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+91-9822614244",
          contactType: "sales",
          areaServed: "IN",
          availableLanguage: ["English", "Hindi", "Marathi"],
        },
        {
          "@type": "ContactPoint",
          telephone: "+91-2030689099",
          contactType: "customer support",
          areaServed: "IN",
        },
        {
          "@type": "ContactPoint",
          email: "efficient_toroidal@rediffmail.com",
          contactType: "sales",
          areaServed: "IN",
        },
      ],
      employee: {
        "@type": "Person",
        name: "Rajan Naroor",
        jobTitle: "Proprietor",
      },
      knowsAbout: [
        "Toroidal Transformers",
        "Wire Wound Potentiometers",
        "Current Transformers",
        "Wire Wound Resistors",
        "Rheostats",
      ],
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://etccindia.com/#local-business",
      name: "Efficient Toroidal Coil Corporation",
      alternateName: "ETCC India",
      url: "https://etccindia.com/",
      telephone: "+91-9822614244",
      email: "efficient_toroidal@rediffmail.com",
      foundingDate: "1994",
      description:
        "Custom electronic component manufacturer specialising in toroidal transformers, current transformers, wire wound potentiometers, and wire wound resistors for industrial, defence, and medical applications.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Unit No. 11, Electronic Sadan No.-1, MIDC, Bhosari",
        addressLocality: "Pimpri-Chinchwad",
        addressRegion: "Maharashtra",
        postalCode: "411026",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 18.6345,
        longitude: 73.8462,
      },
      priceRange: "Contact for quote",
      parentOrganization: {
        "@id": "https://etccindia.com/#organization",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://etccindia.com/#website",
      url: "https://etccindia.com/",
      name: "ETCC India",
      description:
        "Manufacturer of toroidal transformers, current transformers, potentiometers, and wire wound resistors since 1994.",
      publisher: {
        "@id": "https://etccindia.com/#organization",
      },
      inLanguage: "en-IN",
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }}
      />
      <HomeClient />
    </>
  );
}
