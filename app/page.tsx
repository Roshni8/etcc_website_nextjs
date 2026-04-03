import type { Metadata } from "next";
import HomeClient from "./HomeClient";
import { SITE_URL, siteUrl } from "@/lib/constants";

export const metadata: Metadata = {
  title: { absolute: "Toroidal Transformers, Potentiometer & CT Manufacturer | ETCC India" },
  description:
    "ETCC India manufactures toroidal transformers (10VA–15kVA), current transformers, wire wound potentiometers & resistors. Defence-proven. Pune facility.",
  alternates: {
    canonical: siteUrl("/"),
  },
  openGraph: {
    title: "Toroidal Transformers, Potentiometer & CT Manufacturer | ETCC India",
    description:
      "ETCC India manufactures toroidal transformers (10VA–15kVA), current transformers, wire wound potentiometers & resistors. Defence-proven. Pune facility.",
    url: siteUrl("/"),
    siteName: "ETCC India — Efficient Toroidal Coil Corporation",
    type: "website",
    locale: "en_IN",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "ETCC India — Toroidal Transformers & Precision Electronic Components" }],
  },
};

const siteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Efficient Toroidal Coil Corporation",
      alternateName: "ETCC India",
      url: siteUrl("/"),
      logo: {
        "@type": "ImageObject",
        url: siteUrl("/assets/etcc-logo.svg"),
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
      "@id": `${SITE_URL}/#local-business`,
      name: "Efficient Toroidal Coil Corporation",
      alternateName: "ETCC India",
      url: siteUrl("/"),
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
        "@id": `${SITE_URL}/#organization`,
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: siteUrl("/"),
      name: "ETCC India",
      description:
        "Manufacturer of toroidal transformers, current transformers, potentiometers, and wire wound resistors since 1994.",
      publisher: {
        "@id": `${SITE_URL}/#organization`,
      },
      inLanguage: "en-IN",
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE_URL}/#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteUrl("/"),
        },
      ],
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
