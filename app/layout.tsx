import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: {
    default: "Toroidal Transformers & Precision Potentiometers | ETCC India",
    template: "%s | ETCC India",
  },
  description:
    "ETCC manufactures precision toroidal transformers, current transformers, and wire wound potentiometers since 1994. Pune, India. Request a quote.",
  openGraph: {
    siteName: "ETCC India — Efficient Toroidal Coil Corporation",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
