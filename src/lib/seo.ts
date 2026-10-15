import type { Metadata } from "next";
import { site } from "@/content/site";
import { diccionario } from "@/content/i18n";
import {
  IDIOMA_POR_DEFECTO,
  IDIOMAS,
  LOCALE_OG,
  ETIQUETA_HTML,
  rutaDe,
  type Idioma,
} from "@/lib/idioma";

/**
 * Metadatos por página (criterio transversal de SEO del brief): ninguna página
 * hereda el title ni la description del home.
 *
 * TRES IDIOMAS, UNA PÁGINA
 * ------------------------
 * Cada página existe en español (`/casos`), en inglés (`/en/casos`) y en chino
 * tradicional (`/zh/casos`). Los `hreflang` salen de `IDIOMAS`, así que un
 * idioma nuevo entra sin tocar esta función. Para que
 * no compitan entre ellas en los resultados de búsqueda, cada versión declara:
 *
 *   · su propia CANÓNICA, la suya y no la de la otra;
 *   · `hreflang` a su par, en los dos sentidos, más `x-default` apuntando al
 *     español, que es el idioma del negocio y de las URLs ya indexadas;
 *   · su `og:locale`, para que al compartir el enlace el preview salga en el
 *     idioma de la página.
 *
 * El español no lleva prefijo a propósito: las URLs que Google ya tiene
 * indexadas y las redirecciones del sitio anterior siguen sirviendo.
 */

export const TITULO_BASE =
  "Servicios de drones en Antofagasta para minería, energía y construcción";
export const DESCRIPCION_BASE =
  "AGS Soluciones opera drones industriales en Chile, Perú y Argentina: inspección termográfica de plantas fotovoltaicas, líneas eléctricas, topografía y aerofotogrametría, limpieza de fachadas e inspección de instalaciones.";

/** Imagen de compartido por defecto. Ver nota en `app/opengraph-image.tsx`. */
const OG_POR_DEFECTO = "/opengraph-image";

/**
 * Largo útil de una `meta description`, por idioma.
 *
 * Google no corta por caracteres sino por ANCHO: un ideograma ocupa el doble
 * que una letra latina, así que una descripción china de 160 caracteres se
 * corta por la mitad. De ahí los dos presupuestos.
 */
const LARGO_DESCRIPCION: Record<Idioma, number> = { es: 155, en: 155, zh: 78 };

/** Cortes naturales donde terminar un recorte sin partir una palabra. */
const CORTES = [" ", "，", "、", "。", "；", "："];

/**
 * Recorta una descripción al largo del idioma, retrocediendo hasta el último
 * corte natural para no dejar una palabra —o un ideograma suelto— a medias.
 * Si ya cabe, la devuelve intacta: nada de puntos suspensivos de adorno.
 */
export function recortarDescripcion(texto: string, lang: Idioma): string {
  const max = LARGO_DESCRIPCION[lang];
  if (texto.length <= max) return texto;
  const duro = texto.slice(0, max - 1);
  const corte = Math.max(...CORTES.map((c) => duro.lastIndexOf(c)));
  return `${(corte > max * 0.7 ? duro.slice(0, corte) : duro).trimEnd()}…`;
}

export function metadatosDe({
  titulo,
  descripcion,
  ruta,
  lang = IDIOMA_POR_DEFECTO,
  imagen,
  tipo = "website",
  publicado,
  canonicalPropio = true,
}: {
  titulo: string;
  descripcion: string;
  /** Ruta SIN prefijo de idioma, p. ej. `/casos`. El prefijo lo pone esta función. */
  ruta: string;
  lang?: Idioma;
  imagen?: string | null;
  tipo?: "website" | "article";
  publicado?: string;
  /**
   * `false` cuando esta URL sirve el texto de OTRO idioma —una nota aún sin
   * traducir— y por tanto no debe declararse canónica de sí misma: lo correcto
   * es apuntar al original. Dos URLs con el mismo texto diciendo cada una "yo
   * soy la buena" es exactamente lo que Google trata como duplicado.
   */
  canonicalPropio?: boolean;
}): Metadata {
  const rutaConIdioma = rutaDe(lang, ruta);
  const url = `${site.url}${rutaConIdioma}`;
  const og = imagen ?? OG_POR_DEFECTO;

  // `hreflang` en los dos sentidos: cada versión nombra a todas, incluida a sí
  // misma. Google descarta un par que no se referencia mutuamente.
  const idiomas = Object.fromEntries(
    IDIOMAS.map((l) => [ETIQUETA_HTML[l], `${site.url}${rutaDe(l, ruta)}`]),
  );

  return {
    title: titulo,
    description: descripcion,
    alternates: {
      canonical: canonicalPropio ? rutaConIdioma : rutaDe(IDIOMA_POR_DEFECTO, ruta),
      languages: {
        ...idiomas,
        // Para quien busca desde un idioma que no publicamos: al español, que
        // es el idioma del negocio.
        "x-default": `${site.url}${rutaDe(IDIOMA_POR_DEFECTO, ruta)}`,
      },
    },
    openGraph: {
      title: titulo,
      description: descripcion,
      url,
      siteName: site.nombre,
      locale: LOCALE_OG[lang],
      type: tipo,
      images: [{ url: og, width: 1200, height: 630, alt: titulo }],
      ...(publicado ? { publishedTime: publicado } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: titulo,
      description: descripcion,
      images: [og],
    },
  };
}

/**
 * Datos estructurados de organización, con dirección y teléfono reales. La
 * descripción va en el idioma de la página: el resto (dirección, teléfono,
 * fundación) son datos, no texto, y no cambian.
 */
export function organizacionJsonLdDe(lang: Idioma = IDIOMA_POR_DEFECTO) {
  return { ...organizacionJsonLd, description: diccionario(lang).seo.paginas["/"].descripcion };
}

/** Datos estructurados de organización, con dirección y teléfono reales. */
export const organizacionJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${site.url}/#organizacion`,
  name: site.nombre,
  legalName: site.nombreLargo,
  url: site.url,
  description: DESCRIPCION_BASE,
  foundingDate: String(site.fundacion),
  telephone: site.contacto.telefonoE164,
  email: site.contacto.email,
  image: `${site.url}/brand/ags-logo-color.svg`,
  logo: `${site.url}/brand/ags-logo-color.svg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${site.contacto.direccion.calle}, ${site.contacto.direccion.detalle}`,
    addressLocality: site.contacto.direccion.ciudad,
    addressRegion: site.contacto.direccion.regionLarga,
    addressCountry: site.contacto.direccion.pais,
  },
  areaServed: site.operacion.map((pais) => ({ "@type": "Country", name: pais })),
  sameAs: [site.redes.linkedin, site.redes.instagram],
};
