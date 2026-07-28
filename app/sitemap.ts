import type { MetadataRoute } from "next";
import { casosExito } from "@/data/casosExito";
import { servicios } from "@/data/servicios";
import { siteConfig } from "@/lib/metadata";

/**
 * Generado dinámicamente desde servicios.ts y casosExito.ts (ticket 6.3) — agregar
 * un servicio o caso de éxito nuevo a esos archivos lo suma automáticamente aquí,
 * sin tocar este archivo. Sin `lastModified`: no hay timestamps reales de última
 * edición por contenido (no hay CMS detrás), no se inventa una fecha.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/nosotros`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteConfig.url}/cotizar`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const servicioRoutes: MetadataRoute.Sitemap = servicios.map((servicio) => ({
    url: `${siteConfig.url}/servicios/${servicio.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const casoExitoRoutes: MetadataRoute.Sitemap = casosExito.map((caso) => ({
    url: `${siteConfig.url}/casos-exito/${caso.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...servicioRoutes, ...casoExitoRoutes];
}
