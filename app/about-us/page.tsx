import type { Metadata } from "next";
import AboutClient from "./AboutClient";
import { siteUrl } from "@/lib/constants";

export const metadata: Metadata = {
  title: {
    absolute:
      "About ETCC India — Precision Electronic Component Manufacturer Since 1994 | Pune",
  },
  description:
    "Efficient Toroidal Coil Corporation (ETCC), established 1994 in MIDC Bhosari, Pune. ISO-compliant manufacturer of toroidal transformers, wire-wound potentiometers, current transformers, and resistors for defence, aerospace, and industrial OEMs across India.",
  alternates: {
    canonical: siteUrl("/about-us"),
  },
  openGraph: {
    title:
      "About ETCC India — Precision Electronic Component Manufacturer Since 1994",
    description:
      "Efficient Toroidal Coil Corporation (ETCC), established 1994 in MIDC Bhosari, Pune. Manufacturer of toroidal transformers, wire-wound potentiometers, current transformers, and resistors for defence, aerospace, and industrial OEMs.",
    url: siteUrl("/about-us"),
    siteName: "ETCC India — Efficient Toroidal Coil Corporation",
    type: "website",
    locale: "en_IN",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "About ETCC India" }],
  },
};

export default function Page() {
  return <AboutClient />;
}
