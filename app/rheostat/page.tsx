import type { Metadata } from "next";
import PageClient from "../wirewound-resistor/PageClient";
import { siteUrl } from "@/lib/constants";

export const metadata: Metadata = {
  title: { absolute: "Rheostats 25W–500W | Rotary & Slider | ETCC India" },
  description:
    "Industrial rheostats — rotary and slider types from 25W to 500W. Motor control, load banks, and variable power applications. Manufactured in Pune since 1994.",
  alternates: {
    canonical: siteUrl("/rheostat"),
  },
  openGraph: {
    title: "Rheostats 25W–500W | Rotary & Slider | ETCC India",
    description:
      "Industrial rheostats — rotary and slider types from 25W to 500W. Motor control, load banks, and variable power. Pune manufacturer since 1994.",
    url: siteUrl("/rheostat"),
    siteName: "ETCC India — Efficient Toroidal Coil Corporation",
    type: "website",
    locale: "en_IN",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "ETCC India rheostats" }],
  },
};

const RHEOSTAT_HERO_TITLE = "Rheostats — Rotary & Slider, 25W to 500W";
const RHEOSTAT_HERO_INTRO =
  "ETCC India manufactures rotary and slider rheostats from 25W to 500W at our Pune facility, established in 1994. Chassis and panel mounting for motor speed control, generator and UPS load testing, and industrial variable-resistance applications.";
const RHEOSTAT_HERO_EYEBROW = "Variable resistance control";

export default function Page() {
  return (
    <PageClient
      quoteDefaultCategory="Rheostats"
      heroTitle={RHEOSTAT_HERO_TITLE}
      heroIntro={RHEOSTAT_HERO_INTRO}
      heroEyebrow={RHEOSTAT_HERO_EYEBROW}
    />
  );
}
