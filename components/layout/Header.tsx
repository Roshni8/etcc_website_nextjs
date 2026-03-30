"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";

const QuoteModal = dynamic(() => import("@/components/QuoteModal"), { ssr: false });

/* ─── Dropdown Data ─── */

interface DropdownItem {
  title: string;
  subtitle: string;
  href: string;
}

interface DropdownSection {
  label: string;
  items: DropdownItem[];
}

const productSections: DropdownSection[] = [
  {
    label: "Transformers",
    items: [
      { title: "Toroidal Transformers", subtitle: "10VA–3000VA, 50Hz to 10kHz", href: "/toroidal-transformers" },
      { title: "Current Transformers", subtitle: "50A–2000A, accuracy class 0.5", href: "/current-transformer" },
    ],
  },
  {
    label: "Potentiometers",
    items: [
      { title: "Linear Potentiometers", subtitle: "Precision slide-wire & linear motion types", href: "/potentiometer" },
      { title: "Servo Potentiometers", subtitle: "±0.5% linearity, −55°C to +125°C", href: "/potentiometer" },
    ],
  },
  {
    label: "Resistive Components",
    items: [
      { title: "Wire Wound Resistors", subtitle: "5W–200W, ceramic & aluminium housed", href: "/wirewound-resistors" },
      { title: "Rheostats", subtitle: "Rotary & slider types, 25W–500W", href: "/wirewound-resistors" },
    ],
  },
];

const allProductLinks = productSections.flatMap((s) => s.items);

/* ─── Nav Items ─── */

const navItems = [
  { label: "Products", hasDropdown: true },
  { label: "Blogs", href: "/about-us" },
  { label: "About Us", href: "/about-us" },
] as const;

/* ─── Header ─── */

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();

  const productsButtonRef = useRef<HTMLButtonElement>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const leaveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openDropdown = useCallback(() => {
    if (leaveTimeoutRef.current) { clearTimeout(leaveTimeoutRef.current); leaveTimeoutRef.current = null; }
    if (dropdownOpen) return;
    hoverTimeoutRef.current = setTimeout(() => setDropdownOpen(true), 100);
  }, [dropdownOpen]);

  const closeDropdown = useCallback(() => {
    if (hoverTimeoutRef.current) { clearTimeout(hoverTimeoutRef.current); hoverTimeoutRef.current = null; }
    leaveTimeoutRef.current = setTimeout(() => setDropdownOpen(false), 250);
  }, []);

  const cancelClose = useCallback(() => {
    if (leaveTimeoutRef.current) { clearTimeout(leaveTimeoutRef.current); leaveTimeoutRef.current = null; }
  }, []);

  useEffect(() => { setDropdownOpen(false); setMobileOpen(false); }, [pathname]);
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") setDropdownOpen(false); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  let itemIndex = 0;

  return (
    <>
      <header
        className="sticky top-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80"
        style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}
      >
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex h-14 items-center justify-between">
            {/* Left: Logo */}
            <Link href="/" className="flex items-center gap-3 shrink-0">
              <img src="/assets/etcc-logo-blue.svg" alt="ETCC Logo" className="h-11 w-auto" width="154" height="44" />
              <span className="hidden sm:block text-[14px] font-medium text-stone-900 leading-tight whitespace-nowrap">
                Efficient Toroidal Coil Corporation
              </span>
            </Link>

            {/* Right: Nav + separator + CTA */}
            <div className="hidden lg:flex items-center gap-1">
              <nav className="flex items-center gap-0.5" aria-label="Main navigation">
                {navItems.map((item) => {
                  const isActive = "href" in item
                    ? pathname === item.href
                    : allProductLinks.some((d) => pathname === d.href);

                  if ("hasDropdown" in item) {
                    return (
                      <div
                        key={item.label}
                        className="relative"
                        onMouseEnter={openDropdown}
                        onMouseLeave={closeDropdown}
                      >
                        <button
                          ref={productsButtonRef}
                          className={`flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors duration-150 ${
                            isActive || dropdownOpen ? "text-stone-700" : "text-stone-500 hover:text-stone-700"
                          }`}
                          aria-expanded={dropdownOpen}
                          aria-haspopup="true"
                        >
                          {item.label}
                          <ChevronDown className={`h-3.5 w-3.5 text-stone-400 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
                        </button>

                        {/* Dropdown — positioned directly under the Products button */}
                        <div
                          className="absolute left-1/2 top-full z-50 pt-2"
                          style={{
                            transform: "translateX(-50%)",
                            pointerEvents: dropdownOpen ? "auto" : "none",
                          }}
                          onMouseEnter={cancelClose}
                          onMouseLeave={closeDropdown}
                        >
                          {/* Hover bridge */}
                          <div className="h-1" />

                          <div
                            style={{
                              width: "700px",
                              opacity: dropdownOpen ? 1 : 0,
                              transform: dropdownOpen ? "scale(1) translateY(0)" : "scale(0.97) translateY(-4px)",
                              transition: "opacity 200ms cubic-bezier(0.16, 1, 0.3, 1), transform 200ms cubic-bezier(0.16, 1, 0.3, 1)",
                            }}
                          >
                            {/* Arrow */}
                            <div
                              className="mx-auto -mb-[5px] h-2.5 w-2.5 rotate-45 bg-white"
                              style={{
                                border: "1px solid rgba(0,0,0,0.08)",
                                borderBottom: "none",
                                borderRight: "none",
                              }}
                            />

                            {/* Panel */}
                            <div
                              className="relative overflow-hidden rounded-2xl bg-white"
                              style={{
                                border: "1px solid rgba(0,0,0,0.08)",
                                boxShadow: "0 8px 30px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.05)",
                              }}
                            >
                              <div className="flex divide-x divide-stone-200/80 p-2">
                                {productSections.map((section) => (
                                  <div key={section.label} className="flex-1 p-2.5">
                                    <p className="px-3 pt-1.5 pb-2 text-[11px] font-semibold uppercase tracking-wider text-stone-400">
                                      {section.label}
                                    </p>
                                    {section.items.map((item) => {
                                      const idx = itemIndex++;
                                      return (
                                        <Link
                                          key={item.href + item.title}
                                          href={item.href}
                                          className="flex flex-col rounded-xl px-3 py-2.5 transition-colors duration-150 hover:bg-stone-100 group"
                                          style={{
                                            opacity: dropdownOpen ? 1 : 0,
                                            transform: dropdownOpen ? "translateY(0)" : "translateY(6px)",
                                            transition: `opacity 200ms ease ${idx * 40}ms, transform 200ms ease ${idx * 40}ms, background-color 150ms ease`,
                                          }}
                                        >
                                          <span className="text-[14px] font-medium text-stone-900 group-hover:text-black">
                                            {item.title}
                                          </span>
                                          <span className="mt-1 text-[12px] text-stone-500 leading-snug">
                                            {item.subtitle}
                                          </span>
                                        </Link>
                                      );
                                    })}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors duration-150 ${
                        isActive ? "text-stone-700" : "text-stone-500 hover:text-stone-700"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="mx-2 h-5 w-px bg-stone-200" />

              <button
                onClick={() => setQuoteOpen(true)}
                className="rounded-full bg-stone-900 px-4 py-1.5 text-sm font-medium text-white hover:bg-stone-800 active:scale-[0.97]"
                style={{ transition: "background-color 150ms ease, transform 160ms ease-out" }}
              >
                Get a Quote
              </button>
            </div>

            {/* Mobile Toggle */}
            <button
              className="lg:hidden rounded-md p-2 text-stone-700 hover:bg-stone-100"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileOpen && (
          <div className="lg:hidden bg-white" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
            <nav className="mx-auto max-w-6xl px-6 py-4 flex flex-col gap-0.5" aria-label="Mobile navigation">
              <Link href="/" className="rounded-md px-3 py-2.5 text-sm font-medium text-stone-600 hover:bg-stone-50" onClick={() => setMobileOpen(false)}>
                Home
              </Link>
              {productSections.map((section) => (
                <div key={section.label}>
                  <p className="px-3 pt-4 pb-1 text-[11px] font-semibold uppercase tracking-wider text-stone-400">{section.label}</p>
                  {section.items.map((link) => (
                    <Link key={link.href + link.title} href={link.href} className="rounded-md px-3 py-2.5 text-sm font-medium text-stone-600 hover:bg-stone-50 block" onClick={() => setMobileOpen(false)}>
                      {link.title}
                    </Link>
                  ))}
                </div>
              ))}
              <div className="my-2 border-t border-stone-100" />
              <Link href="/about-us" className="rounded-md px-3 py-2.5 text-sm font-medium text-stone-600 hover:bg-stone-50" onClick={() => setMobileOpen(false)}>About Us</Link>
              <button onClick={() => { setQuoteOpen(true); setMobileOpen(false); }} className="mt-3 w-full rounded-full py-2.5 text-sm font-medium text-white bg-stone-900 hover:bg-stone-800 transition-colors">
                Get a Quote
              </button>
            </nav>
          </div>
        )}
      </header>

      <QuoteModal open={quoteOpen} onOpenChange={setQuoteOpen} />
    </>
  );
};

export default Header;
