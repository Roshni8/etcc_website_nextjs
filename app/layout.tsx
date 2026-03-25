import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "Toroidal Transformers & Precision Potentiometers | ETCC India",
  description:
    "ETCC manufactures precision toroidal transformers, current transformers, and wire wound potentiometers since 1994. Pune, India. Request a quote.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    siteName: "ETCC India — Efficient Toroidal Coil Corporation",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "https://etccindia.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ETCC India — Toroidal Transformers & Precision Electronic Components",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
  other: {
    "theme-color": "#1a6dbf",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
