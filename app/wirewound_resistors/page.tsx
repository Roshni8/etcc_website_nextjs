import type { Metadata } from "next";
import PageClient from "./PageClient";

export const metadata: Metadata = {
  title: "Wire Wound Resistor & Rheostat Manufacturer India | ETCC",
  description:
    "High wattage wire wound resistors 5W to 200W and rheostats 25W to 500W. For power electronics, motor control, and industrial loads. ETCC Pune manufacturer since 1994.",
  alternates: {
    canonical: "https://etccindia.com/wirewound_resistors",
  },
  openGraph: {
    title: "Wire Wound Resistor & Rheostat Manufacturer India | ETCC",
    description:
      "High wattage wire wound resistors 5W to 200W and rheostats 25W to 500W. For power electronics, motor control, and industrial loads. ETCC Pune manufacturer since 1994.",
    url: "https://etccindia.com/wirewound_resistors",
    siteName: "ETCC India — Efficient Toroidal Coil Corporation",
    type: "website",
    locale: "en_IN",
  },
};

export default function Page() {
  return <PageClient />;
}
