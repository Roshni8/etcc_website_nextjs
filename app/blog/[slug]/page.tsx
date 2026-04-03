import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { BLOG_POSTS, getBlogPostBySlug } from "@/lib/blog";
import type { ContentBlock } from "@/lib/blog";
import { siteUrl } from "@/lib/constants";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: { absolute: "Blog | ETCC India" },
      robots: { index: false, follow: false },
    };
  }

  return {
    title: { absolute: `${post.title} | ETCC India` },
    description: post.excerpt,
    alternates: {
      canonical: siteUrl(`/blog/${post.slug}`),
    },
    openGraph: {
      title: `${post.title} | ETCC India`,
      description: post.excerpt,
      url: siteUrl(`/blog/${post.slug}`),
      siteName: "ETCC India — Efficient Toroidal Coil Corporation",
      type: "article",
      locale: "en_IN",
      images: [
        {
          url: siteUrl(post.coverImage),
          width: 1200,
          height: 630,
          alt: post.coverAlt,
        },
      ],
    },
  };
}

/* ════════════════════════════════════════════
   CONTENT BLOCK RENDERER
   ════════════════════════════════════════════ */

function BlockRenderer({ block, index }: { block: ContentBlock; index: number }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="blog-body text-foreground/85">{block.text}</p>
      );

    case "h2":
      return (
        <h2 className="mt-12 mb-5 text-[1.65rem] font-bold leading-tight tracking-tight text-foreground md:text-[1.85rem]">
          {block.text}
        </h2>
      );

    case "h3":
      return (
        <h3 className="mt-8 mb-4 text-[1.3rem] font-semibold leading-tight tracking-tight text-foreground md:text-[1.45rem]">
          {block.text}
        </h3>
      );

    case "numbered-list":
      return (
        <ol className="my-5 space-y-3 pl-1">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-4">
              <span className="mt-[3px] flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-stone-200 text-xs font-semibold text-foreground">
                {i + 1}
              </span>
              <span className="blog-body leading-relaxed text-foreground/85">
                {item}
              </span>
            </li>
          ))}
        </ol>
      );

    case "image":
      return (
        <figure className="my-8">
          <div className="overflow-hidden rounded-xl border border-border bg-secondary">
            <img
              src={block.src}
              alt={block.alt}
              className="w-full object-contain"
              loading="lazy"
            />
          </div>
          {block.caption && (
            <figcaption className="mt-3 text-center text-sm italic text-muted-foreground">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    case "table":
      return (
        <div className="my-8 overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-border bg-secondary">
                {block.headers.map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-foreground"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, rowIdx) => (
                <tr
                  key={rowIdx}
                  className={`border-b border-border last:border-0 ${
                    rowIdx % 2 === 0 ? "bg-card" : "bg-secondary/30"
                  }`}
                >
                  {row.map((cell, cellIdx) => (
                    <td
                      key={cellIdx}
                      className={`whitespace-normal px-4 py-3 text-foreground ${
                        cellIdx === 0 ? "font-medium" : ""
                      }`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    default:
      return null;
  }
}

/* ════════════════════════════════════════════
   PAGE COMPONENT
   ════════════════════════════════════════════ */

export default async function BlogReadingPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return (
      <Layout>
        <section className="py-20 md:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <p className="text-sm text-muted-foreground">
              This post doesn&apos;t exist.
            </p>
            <Link
              href="/blog"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-dark"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to blog
            </Link>
          </div>
        </section>
      </Layout>
    );
  }

  const articleUrl = siteUrl(`/blog/${post.slug}`);
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.dateISO,
    dateModified: post.dateISO,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${articleUrl}#webpage`,
      url: articleUrl,
    },
    image: siteUrl(post.coverImage),
    author: {
      "@type": "Organization",
      name: "Efficient Toroidal Coil Corporation",
      url: siteUrl("/"),
    },
    publisher: {
      "@type": "Organization",
      name: "Efficient Toroidal Coil Corporation",
      url: siteUrl("/"),
      logo: {
        "@type": "ImageObject",
        url: siteUrl("/assets/etcc-logo.svg"),
      },
    },
  };

  return (
    <Layout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      {/* ── Header ── */}
      <section className="pt-10 md:pt-16">
        <div className="mx-auto max-w-3xl px-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to blog
          </Link>

          <h1 className="mt-8 text-[2rem] font-bold leading-[1.15] tracking-tighter text-foreground md:text-[2.75rem]">
            {post.title}
          </h1>
          <p className="mt-4 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            {post.dateLabel}
          </p>
        </div>
      </section>

      {/* ── Cover image ── */}
      <section className="mt-10">
        <div className="mx-auto max-w-4xl px-6">
          <div className="overflow-hidden rounded-2xl border border-border bg-secondary shadow-card">
            <img
              src={post.coverImage}
              alt={post.coverAlt}
              className="w-full object-cover"
              style={{ maxHeight: "480px" }}
            />
          </div>
        </div>
      </section>

      {/* ── Article body ── */}
      <section className="pb-20 pt-10 md:pb-32 md:pt-14">
        <div className="mx-auto max-w-3xl px-6">
          <article className="blog-article">
            {/* Lead paragraph */}
            <p className="blog-body leading-relaxed text-muted-foreground">
              {post.excerpt}
            </p>

            <div className="mt-10">
              {post.content.map((block, i) => (
                <BlockRenderer key={i} block={block} index={i} />
              ))}
            </div>
          </article>

          {/* ── Back to blog ── */}
          <div className="mt-16 border-t border-border pt-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary-dark"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to all articles
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
