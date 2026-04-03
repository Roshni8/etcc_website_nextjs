import type { Metadata } from "next";
import PageClient from "./PageClient";
import { siteUrl } from "@/lib/constants";

export const metadata: Metadata = {
  title: { absolute: "Toroidal Transformers 50Hz to 10kHz | Manufacturer India | ETCC" },
  description:
    "Custom toroidal power transformers, 10VA–3000VA , 50Hz to 10kHz. Low noise, Audio, medical, defence & industrial applications. Pune manufacturer since 1994.",
  alternates: {
    canonical: siteUrl("/toroidal-transformer"),
  },
  openGraph: {
    title: "Toroidal Transformers 50Hz to 10kHz | Manufacturer India | ETCC",
    description:
      "Custom toroidal power transformers, 10VA–3000VA , 50Hz to 10kHz. Low noise, Audio, medical, defence & industrial applications. Pune manufacturer since 1994.",
    url: siteUrl("/toroidal-transformer"),
    siteName: "ETCC India — Efficient Toroidal Coil Corporation",
    type: "website",
    locale: "en_IN",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "ETCC India toroidal transformers" }],
  },
};

export default function Page() {
  return <PageClient />;
}
