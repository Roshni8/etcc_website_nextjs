import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { BLOG_PAGE, BLOG_POSTS } from "@/lib/blog";
import { SITE_URL, siteUrl } from "@/lib/constants";

export const metadata: Metadata = {
  title: { absolute: "Blog — Engineering Notes | ETCC India" },
  description:
    "Technical articles on toroidal transformers, current transformers, potentiometers, and wire wound resistors — design insights, comparison guides, and manufacturing knowledge from ETCC India.",
  alternates: {
    canonical: siteUrl("/blog"),
  },
  openGraph: {
    title: "Blog — Engineering Notes | ETCC India",
    description:
      "Technical articles on toroidal transformers, current transformers, potentiometers, and wire wound resistors — design insights and manufacturing knowledge.",
    url: siteUrl("/blog"),
    siteName: "ETCC India — Efficient Toroidal Coil Corporation",
    type: "website",
    locale: "en_IN",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "ETCC India engineering blog" }],
  },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "ETCC India Blog",
  url: siteUrl("/blog"),
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: { "@id": `${SITE_URL}/#organization` },
  mainEntity: {
    "@type": "ItemList",
    itemListElement: BLOG_POSTS.map((p, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      url: siteUrl(`/blog/${p.slug}`),
      name: p.title,
    })),
  },
};

function PostCard({ post }: { post: (typeof BLOG_POSTS)[number] }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group grid overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover sm:grid-cols-[16rem_1fr]"
    >
      <div className="relative">
        <div className="h-44 w-full bg-secondary sm:h-full overflow-hidden">
          <img
            src={post.coverImage}
            alt={post.coverAlt}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <div
          className="absolute inset-0 border-r border-border/0 sm:border-border/60"
          aria-hidden="true"
        />
      </div>

      <div className="flex flex-col p-5">
        <h2 className="text-base font-semibold text-card-foreground">
          {post.title}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {post.excerpt}
        </p>
        <div className="mt-4 flex items-center justify-between gap-4">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            {post.dateLabel}
          </p>
          <span className="inline-flex items-center text-sm font-medium text-primary transition-colors group-hover:text-primary-dark">
            Read
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function BlogPage() {
  return (
    <Layout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      <section className="py-20 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-10 lg:grid-cols-5 lg:gap-16">
            <div className="max-w-xl lg:col-span-2">
              <h1 className="font-heading">{BLOG_PAGE.title}</h1>
              <div className="mt-6 space-y-4 text-sm leading-relaxed">
                <p className="text-foreground">{BLOG_PAGE.intro[0]}</p>
                <p className="text-muted-foreground">{BLOG_PAGE.intro[1]}</p>
                <p className="text-muted-foreground">{BLOG_PAGE.intro[2]}</p>
              </div>
            </div>

            <div className="flex flex-col gap-5 lg:col-span-3">
              {BLOG_POSTS.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
