import { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/lib/blog";
import { SITE_URL } from "@/lib/constants";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const productLastMod = new Date("2026-04-03");

  const pages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: productLastMod },
    { url: `${SITE_URL}/products`, lastModified: productLastMod },
    { url: `${SITE_URL}/projects`, lastModified: productLastMod },
    { url: `${SITE_URL}/toroidal-transformer`, lastModified: productLastMod },
    { url: `${SITE_URL}/current-transformer`, lastModified: productLastMod },
    { url: `${SITE_URL}/linear-potentiometer`, lastModified: productLastMod },
    { url: `${SITE_URL}/potentiometer`, lastModified: productLastMod },
    { url: `${SITE_URL}/wirewound-resistor`, lastModified: productLastMod },
    { url: `${SITE_URL}/rheostat`, lastModified: productLastMod },
    { url: `${SITE_URL}/about-us`, lastModified: new Date("2026-04-03") },
    { url: `${SITE_URL}/blog`, lastModified: new Date("2026-04-03") },
  ];

  for (const post of BLOG_POSTS) {
    pages.push({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.dateISO),
    });
  }

  return pages;
}
