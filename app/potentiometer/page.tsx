import type { Metadata } from "next";
import PageClient from "./PageClient";

export const metadata: Metadata = {
  title: "Wire Wound Servo Potentiometer Manufacturer | ETCC India",
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

export default function Page() {
  return <PageClient />;
}
