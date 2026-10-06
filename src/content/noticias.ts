import { IDIOMA_POR_DEFECTO, LOCALE_INTL, type Idioma } from "@/lib/idioma";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

/**
 * NOTICIAS — F-09. Sin CMS, por decisión del brief (3.2): archivos markdown en
 * el repo, renderizados en build.
 *
 * Agregar una noticia = crear un archivo en `content/noticias/` y desplegar.
 * Nada más. Ni base de datos, ni panel, ni autenticación.
 *
 * IDIOMA
 * ------
 * `<slug>.md` es la versión en español y es la que define que la noticia
 * existe. `<slug>.en.md` es su traducción, OPCIONAL: si está, `/en/noticias/`
 * la usa y el sitemap publica las dos URLs; si no está, la versión inglesa
 * cae al español antes que a una página vacía, y el sitemap lista solo el
 * original para no ofrecerle a Google dos URLs con el mismo texto.
 *
 * La traducción solo necesita declarar lo que cambia: lo que no traiga
 * (portada, galería, fuente, fecha) se toma del archivo en español, que es
 * donde viven los datos que no son texto.
 */

const DIR = path.join(process.cwd(), "content", "noticias");

export interface FotoNoticia {
  src: string;
  alt: string;
}

export interface FuenteNoticia {
  /** Dónde se publicó el original: "LinkedIn", "El Mercurio de Antofagasta". */
  medio: string;
  url: string;
  /** Quién lo publicó, si no fue AGS. */
  autor?: string;
}

export interface Noticia {
  slug: string;
  titulo: string;
  fecha: string;
  resumen: string;
  portada: string | null;
  portadaAlt: string;
  autor?: string;
  /**
   * Fotos que acompañan la nota. Cuando hay más de una se arma un mosaico; la
   * portada sola se muestra a lo ancho, como siempre.
   */
  galeria: FotoNoticia[];
  /** La publicación original, cuando la noticia se originó fuera del sitio. */
  fuente?: FuenteNoticia;
  contenidoHtml: string;
  /** true si esta noticia tiene traducción propia al idioma pedido. */
  traducida: boolean;
}

type FrontMatter = {
  titulo?: string;
  fecha?: string;
  resumen?: string;
  portada?: string;
  portadaAlt?: string;
  autor?: string;
  galeria?: FotoNoticia[];
  fuente?: FuenteNoticia;
};

/** `<slug>.en.md` y similares: traducciones, no noticias por derecho propio. */
const SUFIJO_IDIOMA = /\.[a-z]{2}\.md$/;

function leerArchivos(): string[] {
  // El índice tiene que comportarse bien con CERO noticias, no reventar: si la
  // carpeta todavía no existe en un clon nuevo, se devuelve lista vacía.
  if (!fs.existsSync(DIR)) return [];
  // Los archivos que empiezan con "_" son plantillas y documentación, no
  // noticias publicables: quedan fuera del índice y del sitemap.
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_") && !SUFIJO_IDIOMA.test(f));
}

const rutaDeArchivo = (slug: string, lang: Idioma) =>
  path.join(DIR, lang === IDIOMA_POR_DEFECTO ? `${slug}.md` : `${slug}.${lang}.md`);

async function parsear(slug: string, lang: Idioma): Promise<Noticia> {
  const base = matter(fs.readFileSync(rutaDeArchivo(slug, IDIOMA_POR_DEFECTO), "utf8"));
  const rutaTraducida = rutaDeArchivo(slug, lang);
  const hayTraduccion = lang !== IDIOMA_POR_DEFECTO && fs.existsSync(rutaTraducida);
  const elegido = hayTraduccion ? matter(fs.readFileSync(rutaTraducida, "utf8")) : base;

  // La traducción declara solo lo que cambia; el resto sale del original.
  const fm = { ...(base.data as FrontMatter), ...(elegido.data as FrontMatter) };
  const procesado = await remark().use(html).process(elegido.content);
  const portada = fm.portada ?? null;

  return {
    slug,
    titulo: fm.titulo ?? slug,
    fecha: fm.fecha ?? "1970-01-01",
    resumen: fm.resumen ?? "",
    portada,
    portadaAlt: fm.portadaAlt ?? "",
    autor: fm.autor,
    // Sin galería declarada, la portada ES la galería: así la página no tiene
    // que distinguir dos casos para mostrar una sola foto.
    galeria: fm.galeria ?? (portada ? [{ src: portada, alt: fm.portadaAlt ?? "" }] : []),
    fuente: fm.fuente,
    contenidoHtml: procesado.toString(),
    traducida: lang === IDIOMA_POR_DEFECTO || hayTraduccion,
  };
}

/** Orden cronológico inverso: la más reciente primero. */
export async function getNoticias(lang: Idioma = IDIOMA_POR_DEFECTO): Promise<Noticia[]> {
  const todas = await Promise.all(
    leerArchivos().map((f) => parsear(f.replace(/\.md$/, ""), lang)),
  );
  return todas.sort((a, b) => b.fecha.localeCompare(a.fecha));
}

export async function getNoticia(
  slug: string,
  lang: Idioma = IDIOMA_POR_DEFECTO,
): Promise<Noticia | undefined> {
  if (!fs.existsSync(rutaDeArchivo(slug, IDIOMA_POR_DEFECTO))) return undefined;
  return parsear(slug, lang);
}

export async function getSlugsNoticias(): Promise<string[]> {
  return leerArchivos().map((f) => f.replace(/\.md$/, ""));
}

/** Los slugs que tienen traducción propia al idioma dado. Lo usa el sitemap. */
export async function getSlugsTraducidos(lang: Idioma): Promise<string[]> {
  if (lang === IDIOMA_POR_DEFECTO) return getSlugsNoticias();
  return (await getSlugsNoticias()).filter((slug) => fs.existsSync(rutaDeArchivo(slug, lang)));
}

/** Formato largo de fecha, en el idioma activo. */
export function formatearFecha(iso: string, lang: Idioma = IDIOMA_POR_DEFECTO): string {
  const [a, m, d] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat(LOCALE_INTL[lang], {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(a, (m ?? 1) - 1, d ?? 1)));
}
