/**
 * Google Maps place link for Efficient Toroidal Coil Corporation (factory).
 */
export const GOOGLE_MAPS_FACTORY_URL =
  "https://www.google.com/maps/place/Efficient+Toroidal+Coil+Corporation/@18.6218956,73.8342366,17z/data=!3m1!4b1!4m6!3m5!1s0x3bc2c78c00000001:0x144932a74353bc0c!8m2!3d18.6218956!4d73.8368115!16s%2Fg%2F1tdhk8qj";

/** Production site origin — canonical URLs, sitemap, structured data. */
export const SITE_URL = "https://etccindia.com" as const;

/** Absolute URL for a path (leading slash required on `pathname`). */
export function siteUrl(pathname: string): string {
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${SITE_URL}${path}`;
}
