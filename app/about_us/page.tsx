import type { Metadata } from "next";
import { MapPin, Phone, Mail, Smartphone } from "lucide-react";
import Layout from "@/components/layout/Layout";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "About ETCC India — Precision Component Manufacturer Since 1994",
  description:
    "Efficient Toroidal Coil Corporation (ETCC), established 1994 in Pune. Manufacturer of toroidal transformers, potentiometers and resistors for defence and industry.",
  alternates: {
    canonical: "https://etccindia.com/about_us",
  },
  openGraph: {
    title: "About ETCC India — Precision Component Manufacturer Since 1994",
    description:
      "Efficient Toroidal Coil Corporation (ETCC), established 1994 in Pune. Manufacturer of toroidal transformers, potentiometers and resistors for defence and industry.",
    url: "https://etccindia.com/about_us",
    siteName: "ETCC India — Efficient Toroidal Coil Corporation",
    type: "website",
    locale: "en_IN",
  },
};

const AboutUs = () => {
  return (
    <Layout>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "About Us" }]} />

      {/* Page Header */}
      <section className="relative bg-secondary overflow-hidden">
        <img src="/assets/about-factory-team.jpg" alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-[0.4]" style={{ objectPosition: "center 20%" }} />
        <div className="absolute inset-0 bg-background/40" />
        <div className="main-container py-12 md:py-16 relative z-10">
          <h1 className="mb-4 font-heading">About ETCC</h1>
          <p className="max-w-2xl text-lg text-muted-foreground">Efficient Toroidal Coil Corporation — a trusted name in custom electronic components since 1994.</p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="main-container section-lg">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Image Gallery */}
          <div className="grid grid-cols-2 gap-3 content-start">
            <div className="col-span-2 overflow-hidden rounded-xl">
              <img src="/assets/about-exhibition-army.jpg" alt="ETCC presenting to Indian Army officials" className="h-48 w-full object-cover rounded-xl" />
            </div>
            <div className="overflow-hidden rounded-xl">
              <img src="/assets/about-exhibition-solo.jpg" alt="ETCC founder at exhibition booth" className="h-40 w-full object-cover rounded-xl" />
            </div>
            <div className="overflow-hidden rounded-xl">
              <img src="/assets/about-exhibition-family.jpg" alt="ETCC team at exhibition" className="h-40 w-full object-cover rounded-xl" style={{ objectPosition: "center 30%" }} />
            </div>
            <div className="overflow-hidden rounded-xl">
              <img src="/assets/about-exhibition-airforce.jpg" alt="ETCC presenting to Indian Air Force" className="h-40 w-full object-cover rounded-xl" />
            </div>
            <div className="overflow-hidden rounded-xl">
              <img src="/assets/about-exhibition-demo.jpg" alt="ETCC product demonstration" className="h-40 w-full object-cover rounded-xl" />
            </div>
          </div>

          <div>
            <h2 className="mb-6">Our Story</h2>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              Since its inception in <strong className="text-foreground">1994</strong>, Efficient Toroidal Coil Corporation (ETCC) has been one of the renowned names in the toroidal transformer and wire wound potentiometers industry. We at ETCC take pride in being associated with the industry that transforms the manufacturing landscape.
            </p>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              Our core values and vision is to deliver quality and durable products to our clients. Each and every unit manufactured by our company speaks quality and is subjected to vigorous checks that ensure durability. Our products pass international standards and are appropriate for commercial and personal uses.
            </p>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              With the growing technology, we have evolved to be a better company. We are regularly manufacturing products with our machines making our products more précised. Products are made with extensive care keeping the requirements in the market and also the need of particular product.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our team is highly experienced and technically sound thus they can overcome any given situation. They are capable of inventing new products to help the customers. We believe in satisfying our customers to the core so that we have a long-term professional relationship.
            </p>
          </div>
        </div>
      </section>

      {/* Proprietor Section */}
      <section className="border-y border-border bg-secondary">
      </section>

      {/* Contact & Location */}
      <section className="main-container section-lg">
        <h2 className="mb-8 text-center">Our Location</h2>
        <div className="grid gap-8 lg:grid-cols-5">
          {/* Contact Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <h3 className="mb-4 text-lg">Factory Address</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Unit No. 11, Electronic Sadan No.-1,<br />
                    M.I.D.C., Bhosari, Pune,<br />
                    Pimpri-Chinchwad,<br />
                    Maharashtra 411026, India
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Smartphone className="h-5 w-5 flex-shrink-0 text-primary" />
                  <a href="tel:+919822614244" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                    +91-9822614244
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 flex-shrink-0 text-primary" />
                  <div className="text-sm text-muted-foreground">
                    <a href="tel:+912030689099" className="transition-colors hover:text-primary">
                      +91-2030689099
                    </a>
                    {" / "}
                    <a href="tel:+91330620988" className="transition-colors hover:text-primary">
                      330620988
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 flex-shrink-0 text-primary" />
                  <div className="text-sm text-muted-foreground">
                    <a href="mailto:efficient_toroidal@rediffmail.com" className="transition-colors hover:text-primary">
                      efficient_toroidal@rediffmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 flex-shrink-0 text-primary" />
                  <div className="text-sm text-muted-foreground">
                    <a href="mailto:efficienttoroidal@yahoo.com" className="transition-colors hover:text-primary">
                      efficienttoroidal@yahoo.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <h3 className="mb-3 text-lg">Business Details</h3>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Contact Person</dt>
                  <dd className="font-medium text-foreground">Mr. Rajan Naroor</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Type</dt>
                  <dd className="font-medium text-foreground">Electronic Components</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Industry</dt>
                  <dd className="font-medium text-foreground">Electromagnetic Components</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Location</dt>
                  <dd className="font-medium text-foreground">MIDC Bhosari, Pune</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Since</dt>
                  <dd className="font-medium text-foreground">1994</dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Google Maps Embed */}
          <div className="lg:col-span-3">
            <div className="overflow-hidden rounded-xl border border-border shadow-sm">
              <iframe
                title="ETCC Factory Location — MIDC Bhosari, Pune"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.0!2d73.8467!3d18.6298!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b80e0b5e1d1d%3A0x0!2sElectronic+Sadan+1%2C+MIDC%2C+Bhosari%2C+Pune!5e0!3m2!1sen!2sin!4v1700000000000"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              />
            </div>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              MIDC Bhosari Industrial Area, Pimpri-Chinchwad, Pune
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutUs;
