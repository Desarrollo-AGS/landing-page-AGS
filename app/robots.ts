import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/metadata";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // No son páginas de contenido — no afecta la indexación completa del sitio.
      disallow: "/api/",
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
