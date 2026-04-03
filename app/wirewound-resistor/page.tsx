import type { Metadata } from "next";
import PageClient from "./PageClient";
import { siteUrl } from "@/lib/constants";

export const metadata: Metadata = {
  title: { absolute: "Wire Wound Resistors & Rheostats 5W–500W | ETCC India" },
  description:
    "High wattage wire wound resistors and rheostats for power electronics, motor control & industrial loads. 5W to 500W. Pune manufacturer since 1994.",
  alternates: {
    canonical: siteUrl("/wirewound-resistor"),
  },
  openGraph: {
    title: "Wire Wound Resistors & Rheostats 5W–500W | ETCC India",
    description:
      "High wattage wire wound resistors and rheostats for power electronics, motor control & industrial loads. 5W to 500W. Pune manufacturer since 1994.",
    url: siteUrl("/wirewound-resistor"),
    siteName: "ETCC India — Efficient Toroidal Coil Corporation",
    type: "website",
    locale: "en_IN",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "ETCC India wire wound resistors" }],
  },
};

export default function Page() {
  return <PageClient />;
}
