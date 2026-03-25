import type { Metadata } from "next";
import { MapPin, Phone, Mail, Smartphone } from "lucide-react";
import Layout from "@/components/layout/Layout";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: { absolute: "About ETCC India — Precision Component Manufacturer Since 1994" },
  description:
    "Efficient Toroidal Coil Corporation (ETCC), established 1994 in Pune. Manufacturer of toroidal transformers, potentiometers and resistors for defence and industry.",
  alternates: {
    canonical: "https://etccindia.com/about-us",
  },
  openGraph: {
    title: "About ETCC India — Precision Component Manufacturer Since 1994",
    description:
      "Efficient Toroidal Coil Corporation (ETCC), established 1994 in Pune. Manufacturer of toroidal transformers, potentiometers and resistors for defence and industry.",
    url: "https://etccindia.com/about-us",
    siteName: "ETCC India — Efficient Toroidal Coil Corporation",
    type: "website",
    locale: "en_IN",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://etccindia.com/" },
    { "@type": "ListItem", position: 2, name: "About Us", item: "https://etccindia.com/about-us" },
  ],
};

const AboutUs = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
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
              Founded in <strong className="text-foreground">1994</strong> at MIDC Bhosari in Pune, Efficient Toroidal Coil Corporation (ETCC) has spent three decades manufacturing precision electromagnetic components for India&apos;s most demanding applications. Our factory produces toroidal transformers from 10 VA to 3000 VA, wire wound servo potentiometers, current transformers rated up to 2000A, and high-power wirewound resistors and rheostats.
            </p>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              ETCC supplies components to defence organisations including DRDO and BHEL, and our toroidal transformers have been qualified for programmes such as the Su-30MKI and Tejas LCA. We also serve industrial automation, medical equipment, audio electronics, and power distribution sectors across India.
            </p>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              Every unit we manufacture undergoes in-house electrical testing — including dielectric strength, insulation resistance, turns ratio, and accuracy class verification. Our toroidal winding equipment allows us to achieve precise layer-wound coils with tight tolerances, and we work directly with customers to design components that meet specific voltage, power, frequency, and environmental requirements.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              From single-unit prototypes to production runs of several thousand pieces, our engineering team handles the full design-to-delivery cycle. We maintain long-term relationships with OEMs, defence PSUs, and industrial customers who rely on consistent quality and responsive technical support.
            </p>
          </div>
        </div>
      </section>

      {/* Proprietor Section */}
      <section className="border-y border-border bg-secondary">
        <div className="main-container section">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6">Leadership</h2>
            <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-foreground mb-1">Mr. Rajan Naroor</h3>
              <p className="text-sm text-primary font-medium mb-4">Founder &amp; Proprietor</p>
              <p className="text-muted-foreground leading-relaxed">
                Mr. Rajan Naroor founded Efficient Toroidal Coil Corporation in 1994 with a focus on precision electromagnetic component manufacturing. With over 30 years of hands-on experience in transformer design, winding technology, and quality assurance, he has built ETCC into a trusted supplier for India&apos;s defence sector and industrial OEMs. Under his leadership, ETCC has delivered components for programmes including the Su-30MKI and Tejas LCA, working closely with organisations such as DRDO and BHEL.
              </p>
            </div>
          </div>
        </div>
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
                    MIDC, Bhosari,<br />
                    Pimpri-Chinchwad, Pune,<br />
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
                    <a href="tel:+912030620988" className="transition-colors hover:text-primary">
                      020-30620988
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
                src="https://www.google.com/maps?q=Electronic+Sadan+No+1,+MIDC,+Bhosari,+Pimpri-Chinchwad,+Pune,+Maharashtra+411026&output=embed"
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
    </>
  );
};

export default AboutUs;
