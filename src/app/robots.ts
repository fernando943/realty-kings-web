import type { MetadataRoute } from "next";

const SITE_URL = "https://realty-kings-web.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/gracias"] },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
