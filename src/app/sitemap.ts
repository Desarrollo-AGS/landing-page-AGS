import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { servicios } from "@/content/servicios";
import { productos } from "@/content/software";
import { getNoticias, getSlugsTraducidos } from "@/content/noticias";
import { ETIQUETA_HTML, IDIOMAS, IDIOMA_POR_DEFECTO, rutaDe } from "@/lib/idioma";

/**
 * Sitemap generado, no escrito a mano: se arma desde los mismos arreglos que
 * renderizan las páginas, así que no puede quedar desincronizado ni listar una
 * ruta que ya no existe.
 *
 * DOS IDIOMAS
 * -----------
 * Cada ruta aparece una vez por idioma, y cada entrada declara en `alternates`
 * dónde está su par. Es la misma información que el `hreflang` del `<head>`,
 * repetida acá a propósito: Google acepta las dos fuentes y el sitemap es la
 * que lee primero al descubrir una página nueva.
 */

/** Las rutas fijas con su prioridad. Sin prefijo de idioma: lo pone `rutaDe`. */
const FIJAS = [
  { ruta: "/", priority: 1, changeFrequency: "monthly" },
  { ruta: "/servicios", priority: 0.9, changeFrequency: "monthly" },
  { ruta: "/casos", priority: 0.9, changeFrequency: "monthly" },
  { ruta: "/software", priority: 0.8, changeFrequency: "monthly" },
  { ruta: "/nosotros", priority: 0.8, changeFrequency: "yearly" },
  { ruta: "/nosotros/brochure", priority: 0.8, changeFrequency: "monthly" },
  { ruta: "/nosotros/certificaciones", priority: 0.7, changeFrequency: "monthly" },
  { ruta: "/comunidad", priority: 0.6, changeFrequency: "yearly" },
  { ruta: "/noticias", priority: 0.7, changeFrequency: "weekly" },
  { ruta: "/contacto", priority: 0.9, changeFrequency: "yearly" },
] as const satisfies readonly {
  ruta: string;
  priority: number;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
}[];

/** Los idiomas alternativos de una ruta, en el formato que espera el sitemap. */
function alternatesDe(ruta: string) {
  return {
    languages: Object.fromEntries(
      IDIOMAS.map((l) => [ETIQUETA_HTML[l], `${site.url}${rutaDe(l, ruta)}`]),
    ),
  };
}

/** La misma ruta en los dos idiomas, cada una apuntando a la otra. */
function porIdioma(
  ruta: string,
  extra: Omit<MetadataRoute.Sitemap[number], "url" | "alternates">,
): MetadataRoute.Sitemap {
  return IDIOMAS.map((l) => ({
    url: `${site.url}${rutaDe(l, ruta)}`,
    alternates: alternatesDe(ruta),
    // La versión en el idioma del negocio manda: la traducción entra con algo
    // menos de prioridad, no compitiendo de igual a igual con su original.
    ...extra,
    priority:
      extra.priority !== undefined && l !== IDIOMA_POR_DEFECTO
        ? Math.round(extra.priority * 90) / 100
        : extra.priority,
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const hoy = new Date();
  const noticias = await getNoticias();
  // Una nota se publica en inglés solo si tiene traducción propia. Listar la
  // versión inglesa de una nota en español sería ofrecerle a Google dos URLs
  // con el mismo texto.
  const traducidas = new Set(await getSlugsTraducidos("en"));

  return [
    ...FIJAS.flatMap(({ ruta, ...resto }) => porIdioma(ruta, { ...resto, lastModified: hoy })),
    ...servicios.flatMap((s) =>
      porIdioma(`/servicios/${s.slug}`, {
        lastModified: hoy,
        changeFrequency: "monthly",
        priority: 0.8,
      }),
    ),
    ...productos.flatMap((p) =>
      porIdioma(`/software/${p.slug}`, {
        lastModified: hoy,
        changeFrequency: "monthly",
        priority: 0.7,
      }),
    ),
    ...noticias.flatMap((n) => {
      const ruta = `/noticias/${n.slug}`;
      const entrada = {
        lastModified: new Date(n.fecha),
        changeFrequency: "yearly" as const,
        priority: 0.6,
      };
      return traducidas.has(n.slug)
        ? porIdioma(ruta, entrada)
        : [{ url: `${site.url}${rutaDe(IDIOMA_POR_DEFECTO, ruta)}`, ...entrada }];
    }),
  ];
}
