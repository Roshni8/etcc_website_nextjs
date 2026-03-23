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
    <footer className="border-t border-stone-800 bg-stone-900 text-stone-50">
      <div className="main-container section">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <img src="/assets/etcc-logo.png" alt="ETCC Logo" className="h-12 w-auto brightness-0 invert" />
            </Link>
            <p className="text-sm leading-relaxed opacity-70">
              Efficient Toroidal Coil Corporation — Custom electromagnetic component manufacturer since 1994. Precision-engineered transformers and potentiometers made in Pune, India.
            </p>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h4 className="text-base font-semibold text-stone-50">Products</h4>
            <nav className="flex flex-col gap-2.5" aria-label="Product links">
              {productLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm opacity-70 transition-opacity hover:opacity-100"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-base font-semibold text-stone-50">Company</h4>
            <nav className="flex flex-col gap-2.5" aria-label="Company links">
              <Link href="/" className="text-sm opacity-70 transition-opacity hover:opacity-100">
                Home
              </Link>
              <Link href="/about-us" className="text-sm opacity-70 transition-opacity hover:opacity-100">
                About Us
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-base font-semibold text-stone-50">Contact</h4>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:efficient_toroidal@rediffmail.com"
                className="flex items-center gap-2 text-sm opacity-70 transition-opacity hover:opacity-100"
              >
                <Mail className="h-4 w-4 flex-shrink-0" />
                efficient_toroidal@rediffmail.com
              </a>
              <a
                href="tel:+919822614244"
                className="flex items-center gap-2 text-sm opacity-70 transition-opacity hover:opacity-100"
              >
                <Phone className="h-4 w-4 flex-shrink-0" />
                +91-9822614244
              </a>
              <div className="flex items-start gap-2 text-sm opacity-70">
                <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <span>Unit No. 11, Electronic Sadan 1, MIDC, Bhosari, Pune 411026</span>
              </div>
            </div>
          </div>
        </div>

        <hr className="my-8 border-stone-800" />

        <div className="flex flex-col items-center justify-between gap-4 text-sm sm:flex-row">
          <p className="opacity-60">© {new Date().getFullYear()} Efficient Toroidal Coil Corporation. All rights reserved.</p>
          <p className="opacity-70 inline-flex items-center gap-1">
            Made with <span className="text-red-400">❤️</span> in
            <svg className="h-4 w-5 inline-block" viewBox="0 0 900 600" aria-label="India">
              <rect width="900" height="200" fill="#FF9933" />
              <rect y="200" width="900" height="200" fill="#FFFFFF" />
              <rect y="400" width="900" height="200" fill="#138808" />
              <circle cx="450" cy="300" r="60" fill="none" stroke="#000080" strokeWidth="4" />
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
