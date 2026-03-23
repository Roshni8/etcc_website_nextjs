import type { Metadata } from "next";
import PageClient from "./PageClient";

export const metadata: Metadata = {
  title: { absolute: "Current Transformer Manufacturer India | ETCC India" },
  description:
    "Precision LT current transformers, 50A to 2000A primary current with 5A secondary. Metering and protection class accuracy. Pune manufacturer since 1994.",
  alternates: {
    canonical: "https://etccindia.com/current-transformer",
  },
  openGraph: {
    title: "Current Transformer Manufacturer India | ETCC India",
    description:
      "Precision LT current transformers, 50A to 2000A primary current with 5A secondary. Metering and protection class accuracy. Pune manufacturer since 1994.",
    url: "https://etccindia.com/current-transformer",
    siteName: "ETCC India — Efficient Toroidal Coil Corporation",
    type: "website",
    locale: "en_IN",
  },
};

export default function Page() {
  return <PageClient />;
}
