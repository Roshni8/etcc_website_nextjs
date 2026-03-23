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

export default function Page() {
  return <HomeClient />;
}
