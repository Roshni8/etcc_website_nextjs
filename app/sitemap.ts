import { MetadataRoute } from "next";

export const dynamic = "force-static";

const BASE_URL = "https://etccindia.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date("2026-03-23"),
    },
    {
      url: `${BASE_URL}/toroidal-transformers`,
      lastModified: new Date("2026-03-23"),
    },
    {
      url: `${BASE_URL}/potentiometer`,
      lastModified: new Date("2026-03-23"),
    },
    {
      url: `${BASE_URL}/current-transformer`,
      lastModified: new Date("2026-03-23"),
    },
    {
      url: `${BASE_URL}/wirewound-resistors`,
      lastModified: new Date("2026-03-23"),
    },
    {
      url: `${BASE_URL}/about-us`,
      lastModified: new Date("2026-03-23"),
    },
  ];
}
