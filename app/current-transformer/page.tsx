import type { Metadata } from "next";
import PageClient from "./PageClient";
import { siteUrl } from "@/lib/constants";

export const metadata: Metadata = {
  title: { absolute: "Current Transformers 50A–5000A | Wound CT & Flexible Rogowski Coil | ETCC India" },
  description:
    "Precision LT current transformers — wound ring-type CTs (50A–2000A, metering class 0.5, protection class 1.0) and flexible Rogowski coils (up to 5000A). Tested to IEC 61869-2 / IS 2705. Pune manufacturer since 1994.",
  alternates: {
    canonical: siteUrl("/current-transformer"),
  },
  openGraph: {
    title: "Current Transformers 50A–5000A | Wound CT & Flexible Rogowski Coil | ETCC India",
    description:
      "Precision LT current transformers — wound ring-type CTs (50A–2000A, metering class 0.5, protection class 1.0) and flexible Rogowski coils (up to 5000A). Tested to IEC 61869-2 / IS 2705. Pune manufacturer since 1994.",
    url: siteUrl("/current-transformer"),
    siteName: "ETCC India — Efficient Toroidal Coil Corporation",
    type: "website",
    locale: "en_IN",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "ETCC India current transformers" }],
  },
};

export default function Page() {
  return <PageClient />;
}
