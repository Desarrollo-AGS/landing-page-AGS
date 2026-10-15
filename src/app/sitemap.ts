import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { servicios } from "@/content/servicios";
import { productos } from "@/content/software";
import { getNoticias, getSlugsTraducidos } from "@/content/noticias";
import { ETIQUETA_HTML, IDIOMAS, IDIOMA_POR_DEFECTO, type Idioma, rutaDe } from "@/lib/idioma";

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
  { ruta: "/nosotros", priority: 0.8, changeFrequency: "yearly" },
  { ruta: "/nosotros/brochure", priority: 0.8, changeFrequency: "monthly" },
  { ruta: "/nosotros/certificaciones", priority: 0.7, changeFrequency: "monthly" },
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

/** La misma ruta en todos los idiomas, cada una apuntando a las demás. */
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
  // Una nota se publica en otro idioma SOLO si tiene traducción propia, y cada
  // idioma se mira por separado: una nota puede estar traducida al inglés y no
  // al chino. Listar una URL traducida que en realidad sirve el texto español
  // sería ofrecerle a Google dos direcciones con el mismo contenido.
  const traducidas = new Map<Idioma, Set<string>>(
    await Promise.all(
      IDIOMAS.filter((l) => l !== IDIOMA_POR_DEFECTO).map(
        async (l) => [l, new Set(await getSlugsTraducidos(l))] as const,
      ),
    ),
  );

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
        // Sin fecha propia, la del build: es lo que hay, y mentirle al sitemap
        // con una fecha inventada no mejora nada.
        lastModified: n.fecha ? new Date(n.fecha) : hoy,
        changeFrequency: "yearly" as const,
        priority: 0.6,
      };
      const idiomas = IDIOMAS.filter(
        (l) => l === IDIOMA_POR_DEFECTO || traducidas.get(l)?.has(n.slug),
      );
      return idiomas.map((l) => ({
        url: `${site.url}${rutaDe(l, ruta)}`,
        // Los alternates de una nota listan solo los idiomas en que de verdad
        // existe, no los tres por defecto.
        alternates: {
          languages: Object.fromEntries(
            idiomas.map((o) => [ETIQUETA_HTML[o], `${site.url}${rutaDe(o, ruta)}`]),
          ),
        },
        ...entrada,
        priority:
          l === IDIOMA_POR_DEFECTO ? entrada.priority : Math.round(entrada.priority * 90) / 100,
      }));
    }),
  ];
}
