import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

const productLinks = [
  { label: "Toroidal Transformers", href: "/toroidal-transformers" },
  { label: "Potentiometers", href: "/potentiometer" },
  { label: "Current Transformers", href: "/current-transformer" },
  { label: "Wire Wound Resistors", href: "/wirewound-resistors" },
];

const Footer = () => {
  return (
    <footer className="border-t border-stone-200 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        {/* Top: 4-column grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block">
              <img
                src="/assets/etcc-logo-blue.svg"
                alt="ETCC Logo"
                className="h-14 w-auto"
                width="196"
                height="56"
              />
            </Link>
            <p className="text-sm leading-relaxed text-stone-500">
              Custom electromagnetic component manufacturer since 1994.
              Precision-engineered transformers and potentiometers made in Pune,
              India.
            </p>
          </div>

          {/* Products */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-stone-900">Products</h4>
            <nav
              className="flex flex-col gap-2"
              aria-label="Product links"
            >
              {productLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-stone-500 transition-colors hover:text-stone-900"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Company */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-stone-900">Company</h4>
            <nav
              className="flex flex-col gap-2"
              aria-label="Company links"
            >
              <Link
                href="/"
                className="text-sm text-stone-500 transition-colors hover:text-stone-900"
              >
                Home
              </Link>
              <Link
                href="/about-us"
                className="text-sm text-stone-500 transition-colors hover:text-stone-900"
              >
                About Us
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-stone-900">Contact</h4>
            <div className="flex flex-col gap-2.5">
              <a
                href="mailto:efficient_toroidal@rediffmail.com"
                className="flex items-center gap-2 text-sm text-stone-500 transition-colors hover:text-stone-900"
              >
                <Mail className="h-4 w-4 shrink-0 text-stone-400" />
                efficient_toroidal@rediffmail.com
              </a>
              <a
                href="tel:+919822614244"
                className="flex items-center gap-2 text-sm text-stone-500 transition-colors hover:text-stone-900"
              >
                <Phone className="h-4 w-4 shrink-0 text-stone-400" />
                +91-9822614244
              </a>
              <a
                href="tel:+912030689099"
                className="flex items-center gap-2 text-sm text-stone-500 transition-colors hover:text-stone-900"
              >
                <Phone className="h-4 w-4 shrink-0 text-stone-400" />
                +91-20-30689099
              </a>
              <div className="flex items-start gap-2 text-sm text-stone-500">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-stone-400" />
                <span>
                  Unit No. 11, Electronic Sadan No.-1, MIDC, Bhosari,
                  Pimpri-Chinchwad, Pune 411026
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-stone-200 pt-6 text-sm sm:flex-row">
          <p className="text-stone-400">
            &copy; {new Date().getFullYear()} Efficient Toroidal Coil
            Corporation. All rights reserved.
          </p>
          <p className="inline-flex items-center gap-1 text-stone-400">
            Made with{" "}
            <span className="text-red-400">&#10084;&#65039;</span> in
            <svg
              className="ml-0.5 h-3.5 w-5 inline-block"
              viewBox="0 0 900 600"
              aria-label="India"
            >
              <rect width="900" height="200" fill="#FF9933" />
              <rect y="200" width="900" height="200" fill="#FFFFFF" />
              <rect y="400" width="900" height="200" fill="#138808" />
              <circle
                cx="450"
                cy="300"
                r="60"
                fill="none"
                stroke="#000080"
                strokeWidth="4"
              />
              <circle cx="450" cy="300" r="10" fill="#000080" />
              {Array.from({ length: 24 }, (_, i) => {
                const angle = (i * 15 * Math.PI) / 180;
                return (
                  <line
                    key={i}
                    x1={450 + 18 * Math.cos(angle)}
                    y1={300 + 18 * Math.sin(angle)}
                    x2={450 + 55 * Math.cos(angle)}
                    y2={300 + 55 * Math.sin(angle)}
                    stroke="#000080"
                    strokeWidth="2"
                  />
                );
              })}
            </svg>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
