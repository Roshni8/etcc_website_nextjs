"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import QuoteModal from "@/components/QuoteModal";

const productLinks = [
  { label: "Toroidal Transformers", href: "/toroidal-transformers" },
  { label: "Potentiometers", href: "/potentiometer" },
  { label: "Current Transformers", href: "/current-transformer" },
  { label: "Wire Wound Resistors & Rheostats", href: "/wirewound-resistors" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const pathname = usePathname();

  const isProductPage = productLinks.some((l) => pathname === l.href);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="main-container">
          <div className="flex h-14 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5">
              <img src="/assets/etcc-logo.png" alt="ETCC Logo" className="h-9 w-auto" />
              <span className="hidden sm:block text-xs font-medium text-stone-500 leading-tight max-w-[160px]">
                Efficient Toroidal Coil Corporation
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
              <Link
                href="/"
                className={`rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-stone-100 hover:text-primary ${
                  pathname === "/" ? "bg-stone-100 text-primary" : "text-stone-700"
                }`}
              >
                Home
              </Link>

              {/* Products Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setProductsOpen(true)}
                onMouseLeave={() => setProductsOpen(false)}
              >
                <button
                  className={`flex items-center gap-1 rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-stone-100 hover:text-primary ${
                    isProductPage ? "bg-stone-100 text-primary" : "text-stone-700"
                  }`}
                  aria-expanded={productsOpen}
                  aria-haspopup="true"
                >
                  Products
                  <ChevronDown className={`h-4 w-4 transition-transform ${productsOpen ? "rotate-180" : ""}`} />
                </button>
                {productsOpen && (
                  <div className="absolute left-0 top-full z-50 mt-0 w-64 rounded-lg border border-stone-200 bg-white p-2 shadow-elevated animate-fade-in">
                    {productLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`block rounded-md px-3 py-2.5 text-sm transition-colors hover:bg-stone-100 ${
                          pathname === link.href
                            ? "font-medium text-primary bg-stone-100"
                            : "text-stone-700"
                        }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/about-us"
                className={`rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-stone-100 hover:text-primary ${
                  pathname === "/about-us" ? "bg-stone-100 text-primary" : "text-stone-700"
                }`}
              >
                About Us
              </Link>
            </nav>

            {/* Desktop CTA */}
            <div className="hidden items-center gap-3 lg:flex">
              <Button
                onClick={() => setQuoteOpen(true)}
                className="bg-primary text-primary-foreground hover:bg-primary-dark"
              >
                Get a Quote
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden rounded-md p-2 text-stone-700 hover:bg-stone-100"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileOpen && (
          <div className="border-t border-stone-200 bg-white lg:hidden animate-fade-in">
            <nav className="main-container flex flex-col gap-1 py-4" aria-label="Mobile navigation">
              <Link
                href="/"
                className={`rounded-md px-3 py-2.5 text-sm transition-colors hover:bg-stone-100 ${
                  pathname === "/" ? "font-medium text-primary bg-stone-100" : "text-stone-700"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                Home
              </Link>
              <hr className="my-2 border-stone-200" />
              <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-stone-400">
                Products
              </p>
              {productLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-md px-3 py-2.5 text-sm transition-colors hover:bg-stone-100 ${
                    pathname === link.href
                      ? "font-medium text-primary bg-stone-100"
                      : "text-stone-700"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <hr className="my-2 border-stone-200" />
              <Link
                href="/about-us"
                className={`rounded-md px-3 py-2.5 text-sm transition-colors hover:bg-stone-100 ${
                  pathname === "/about-us" ? "font-medium text-primary bg-stone-100" : "text-stone-700"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                About Us
              </Link>
              <hr className="my-2 border-stone-200" />
              <Button
                onClick={() => {
                  setQuoteOpen(true);
                  setMobileOpen(false);
                }}
                className="mt-2 w-full bg-primary text-primary-foreground hover:bg-primary-dark"
              >
                Get a Quote
              </Button>
            </nav>
          </div>
        )}
      </header>

      <QuoteModal open={quoteOpen} onOpenChange={setQuoteOpen} />
    </>
  );
};

export default Header;
