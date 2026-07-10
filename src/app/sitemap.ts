import type { MetadataRoute } from "next";

const SITE_URL = "https://realtykingspr.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/herencias`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/chat`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ];
}
