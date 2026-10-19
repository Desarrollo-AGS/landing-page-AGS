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

/**
 * Las rutas fijas. Sin prefijo de idioma: lo pone `rutaDe`.
 *
 * Sin `priority` ni `changefreq`: Google los ignora. Y sin `lastmod`: la única
 * fecha disponible era la del build, que cambia en cada despliegue aunque la
 * página no cambie, y Google deja de confiar en un `lastmod` que siempre dice
 * "hoy". Solo las noticias, que tienen fecha real, lo declaran.
 */
const FIJAS = [
  "/",
  "/servicios",
  "/casos",
  "/nosotros",
  "/nosotros/brochure",
  "/nosotros/certificaciones",
  "/noticias",
  "/contacto",
];

/**
 * Los idiomas alternativos de una ruta, en el formato que espera el sitemap,
 * más `x-default` al español: lo mismo que declara el `<head>` (`metadatosDe`).
 */
function alternatesDe(ruta: string, idiomas: readonly Idioma[] = IDIOMAS) {
  return {
    languages: {
      ...Object.fromEntries(
        idiomas.map((l) => [ETIQUETA_HTML[l], `${site.url}${rutaDe(l, ruta)}`]),
      ),
      "x-default": `${site.url}${rutaDe(IDIOMA_POR_DEFECTO, ruta)}`,
    },
  };
}

/** La misma ruta en todos los idiomas, cada una apuntando a las demás. */
function porIdioma(ruta: string): MetadataRoute.Sitemap {
  return IDIOMAS.map((l) => ({
    url: `${site.url}${rutaDe(l, ruta)}`,
    alternates: alternatesDe(ruta),
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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
    ...FIJAS.flatMap(porIdioma),
    ...servicios.flatMap((s) => porIdioma(`/servicios/${s.slug}`)),
    ...productos.flatMap((p) => porIdioma(`/software/${p.slug}`)),
    ...noticias.flatMap((n) => {
      const ruta = `/noticias/${n.slug}`;
      const idiomas = IDIOMAS.filter(
        (l) => l === IDIOMA_POR_DEFECTO || traducidas.get(l)?.has(n.slug),
      );
      return idiomas.map((l) => ({
        url: `${site.url}${rutaDe(l, ruta)}`,
        // Los alternates de una nota listan solo los idiomas en que de verdad
        // existe, no los tres por defecto.
        alternates: alternatesDe(ruta, idiomas),
        // Sin fecha propia, sin `lastmod`: una fecha inventada no mejora nada.
        ...(n.fecha ? { lastModified: new Date(n.fecha) } : {}),
      }));
    }),
  ];
}
