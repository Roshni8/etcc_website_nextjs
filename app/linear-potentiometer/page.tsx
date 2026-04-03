import type { Metadata } from "next";
import PageClient from "./PageClient";
import { siteUrl } from "@/lib/constants";

export const metadata: Metadata = {
  title: {
    absolute:
      "Linear Potentiometers — Wire-Wound Position Sensors | ETCC India",
  },
  description:
    "Wire-wound linear potentiometers and linear position sensors: 1 kΩ/in gradient, 1% linearity, −50 °C to +85 °C. Industrial & defence linear slide potentiometers manufactured in Pune since 1994.",
  alternates: {
    canonical: siteUrl("/linear-potentiometer"),
  },
  openGraph: {
    title: "Linear Potentiometers — Wire-Wound Position Sensors | ETCC India",
    description:
      "Wire-wound linear potentiometers and linear position sensors: 1 kΩ/in gradient, 1% linearity, −50 °C to +85 °C. Industrial & defence linear slide potentiometers manufactured in Pune since 1994.",
    url: siteUrl("/linear-potentiometer"),
    siteName: "ETCC India — Efficient Toroidal Coil Corporation",
    type: "website",
    locale: "en_IN",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "ETCC India linear potentiometers" }],
  },
};

export default function Page() {
  return <PageClient />;
}
