/**
 * Idiomas del sitio.
 *
 * EL ESPAÑOL NO LLEVA PREFIJO
 * ---------------------------
 * `/casos` es español y `/en/casos` es inglés. El español se queda en la raíz a
 * propósito: sus URLs ya están indexadas y además las redirecciones del sitio
 * WordPress anterior (ver `next.config.ts`) apuntan ahí. Moverlo a `/es/`
 * habría obligado a redirigir todo el sitio y a reconstruir ese posicionamiento
 * desde cero.
 *
 * Internamente SÍ existe el segmento `/es/...`: el middleware reescribe las
 * rutas sin prefijo hacia él, sin que cambie la URL que ve el visitante. Por eso
 * las páginas pueden vivir todas bajo `app/[lang]/` y generarse estáticas en los
 * dos idiomas.
 */

export const IDIOMAS = ["es", "en", "zh"] as const;
export type Idioma = (typeof IDIOMAS)[number];

export const IDIOMA_POR_DEFECTO: Idioma = "es";

/** Etiqueta del selector. Sin banderas: una bandera es un país, no un idioma. */
export const NOMBRE_IDIOMA: Record<Idioma, string> = {
  es: "Español",
  en: "English",
  zh: "繁體中文",
};

/**
 * Sigla del selector. El chino va en su propia escritura y no como "ZH": quien
 * lo busca reconoce 繁中 de un vistazo y no tiene por qué saber el código ISO.
 */
export const CODIGO_IDIOMA: Record<Idioma, string> = { es: "ES", en: "EN", zh: "繁中" };

/**
 * `lang` del documento y `hreflang` del sitemap.
 *
 * El chino va como `zh-Hant`, con el subtag de ESCRITURA y no de país. Es la
 * etiqueta que Google documenta para distinguir tradicional de simplificado:
 * `zh` a secas no dice cuál de las dos es, y `zh-TW` la ata a Taiwán y deja
 * fuera a Hong Kong y Macao, que leen la misma escritura.
 */
export const ETIQUETA_HTML: Record<Idioma, string> = { es: "es-CL", en: "en", zh: "zh-Hant" };

/**
 * `og:locale` NO acepta subtag de escritura: su formato es idioma_PAÍS. Para
 * tradicional, el valor que entienden las plataformas es `zh_TW`.
 */
export const LOCALE_OG: Record<Idioma, string> = { es: "es_CL", en: "en_US", zh: "zh_TW" };

export function esIdioma(valor: string): valor is Idioma {
  return (IDIOMAS as readonly string[]).includes(valor);
}

/**
 * Ruta pública de un camino interno en un idioma dado.
 * `ruta` siempre viene sin prefijo: "/", "/casos", "/servicios/x".
 */
export function rutaDe(lang: Idioma, ruta: string): string {
  const limpia = ruta === "/" ? "" : ruta;
  return lang === IDIOMA_POR_DEFECTO ? limpia || "/" : `/${lang}${limpia}`;
}

/**
 * Quita el prefijo de idioma de una ruta. "/en/casos" -> "/casos"
 *
 * Quita también el del idioma por defecto ("/es/casos"): esa es la forma
 * INTERNA que produce el rewrite, y según el contexto el router puede
 * entregarla. Aceptar las dos evita que el selector arme rutas como "/en/es/x".
 */
export function sinPrefijo(pathname: string): string {
  for (const lang of IDIOMAS) {
    if (pathname === `/${lang}`) return "/";
    if (pathname.startsWith(`/${lang}/`)) return pathname.slice(lang.length + 1);
  }
  return pathname;
}

/** Idioma al que corresponde una ruta pública. */
export function idiomaDeRuta(pathname: string): Idioma {
  for (const lang of IDIOMAS) {
    if (lang === IDIOMA_POR_DEFECTO) continue;
    if (pathname === `/${lang}` || pathname.startsWith(`/${lang}/`)) return lang;
  }
  return IDIOMA_POR_DEFECTO;
}

/**
 * Locale para `Intl`. Importa: en español las cifras se separan con punto
 * (1.179) y en inglés con coma (1,179). Formatear todo en es-CL dejaría los
 * números de la versión inglesa con la puntuación equivocada.
 */
export const LOCALE_INTL: Record<Idioma, string> = {
  es: "es-CL",
  en: "en-US",
  zh: "zh-Hant-TW",
};
