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
      url: `${BASE_URL}/toroidal_transformers`,
      lastModified: new Date("2026-03-23"),
    },
    {
      url: `${BASE_URL}/potentiometer`,
      lastModified: new Date("2026-03-23"),
    },
    {
      url: `${BASE_URL}/current_transformer`,
      lastModified: new Date("2026-03-23"),
    },
    {
      url: `${BASE_URL}/wirewound_resistors`,
      lastModified: new Date("2026-03-23"),
    },
    {
      url: `${BASE_URL}/about_us`,
      lastModified: new Date("2026-03-23"),
    },
  ];
}
