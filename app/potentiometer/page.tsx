import type { Metadata } from "next";
import PageClient from "./PageClient";
import { siteUrl } from "@/lib/constants";

export const metadata: Metadata = {
  title: { absolute: "Wire Wound Potentiometers — Servo, Ganged, Multi-Turn | ETCC India" },
  description:
    "Precision wire wound servo potentiometers, 20Ω–100KΩ, ±0.05% linearity, −55°C to +125°C. Defence & industrial. Pune manufacturer.",
  alternates: {
    canonical: siteUrl("/potentiometer"),
  },
  openGraph: {
    title: "Wire Wound Potentiometers — Servo, Ganged, Multi-Turn | ETCC India",
    description:
      "Precision wire wound servo potentiometers, 20Ω–100KΩ, ±0.05% linearity, −55°C to +125°C. Defence & industrial. Pune manufacturer.",
    url: siteUrl("/potentiometer"),
    siteName: "ETCC India — Efficient Toroidal Coil Corporation",
    type: "website",
    locale: "en_IN",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "ETCC India wire wound potentiometers" }],
  },
};

export default function Page() {
  return <PageClient />;
}
