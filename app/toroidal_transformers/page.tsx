import type { Metadata } from "next";
import PageClient from "./PageClient";

export const metadata: Metadata = {
  title: "Toroidal Transformer Manufacturer India | ETCC",
  description:
    "Custom toroidal power transformers 10VA to 3000VA. Low noise, compact design for industrial, audio, medical and defence applications. Manufacturer since 1994, Pune.",
  alternates: {
    canonical: "https://etccindia.com/toroidal_transformers",
  },
  openGraph: {
    title: "Toroidal Transformer Manufacturer India | ETCC",
    description:
      "Custom toroidal power transformers 10VA to 3000VA. Low noise, compact design for industrial, audio, medical and defence applications. Manufacturer since 1994, Pune.",
    url: "https://etccindia.com/toroidal_transformers",
    siteName: "ETCC India — Efficient Toroidal Coil Corporation",
    type: "website",
    locale: "en_IN",
  },
};

export default function Page() {
  return <PageClient />;
}
