import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { servicios } from "@/content/servicios";
import { productos } from "@/content/software";
import { getNoticias } from "@/content/noticias";

/**
 * Sitemap generado, no escrito a mano: se arma desde los mismos arreglos que
 * renderizan las páginas, así que no puede quedar desincronizado ni listar una
 * ruta que ya no existe.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const hoy = new Date();
  const noticias = await getNoticias();

  const fijas: MetadataRoute.Sitemap = (
    [
      { url: `${site.url}/`, priority: 1, changeFrequency: "monthly" },
      { url: `${site.url}/servicios`, priority: 0.9, changeFrequency: "monthly" },
      { url: `${site.url}/casos`, priority: 0.9, changeFrequency: "monthly" },
      { url: `${site.url}/software`, priority: 0.8, changeFrequency: "monthly" },
      { url: `${site.url}/nosotros`, priority: 0.8, changeFrequency: "yearly" },
      {
        url: `${site.url}/nosotros/certificaciones`,
        priority: 0.7,
        changeFrequency: "monthly",
      },
      { url: `${site.url}/comunidad`, priority: 0.6, changeFrequency: "yearly" },
      { url: `${site.url}/noticias`, priority: 0.7, changeFrequency: "weekly" },
      { url: `${site.url}/contacto`, priority: 0.9, changeFrequency: "yearly" },
    ] satisfies MetadataRoute.Sitemap
  ).map((e) => ({ ...e, lastModified: hoy }));

  return [
    ...fijas,
    ...servicios.map((s) => ({
      url: `${site.url}/servicios/${s.slug}`,
      lastModified: hoy,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...productos.map((p) => ({
      url: `${site.url}/software/${p.slug}`,
      lastModified: hoy,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...noticias.map((n) => ({
      url: `${site.url}/noticias/${n.slug}`,
      lastModified: new Date(n.fecha),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
