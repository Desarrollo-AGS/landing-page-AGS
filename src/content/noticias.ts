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
 */

const DIR = path.join(process.cwd(), "content", "noticias");

export interface Noticia {
  slug: string;
  titulo: string;
  fecha: string;
  resumen: string;
  portada: string | null;
  portadaAlt: string;
  autor?: string;
  contenidoHtml: string;
}

type FrontMatter = {
  titulo?: string;
  fecha?: string;
  resumen?: string;
  portada?: string;
  portadaAlt?: string;
  autor?: string;
};

function leerArchivos(): string[] {
  // El índice tiene que comportarse bien con CERO noticias, no reventar: si la
  // carpeta todavía no existe en un clon nuevo, se devuelve lista vacía.
  if (!fs.existsSync(DIR)) return [];
  // Los archivos que empiezan con "_" son plantillas y documentación, no
  // noticias publicables: quedan fuera del índice y del sitemap.
  return fs.readdirSync(DIR).filter((f) => f.endsWith(".md") && !f.startsWith("_"));
}

async function parsear(archivo: string): Promise<Noticia> {
  const crudo = fs.readFileSync(path.join(DIR, archivo), "utf8");
  const { data, content } = matter(crudo);
  const fm = data as FrontMatter;
  const procesado = await remark().use(html).process(content);

  return {
    slug: archivo.replace(/\.md$/, ""),
    titulo: fm.titulo ?? archivo.replace(/\.md$/, ""),
    fecha: fm.fecha ?? "1970-01-01",
    resumen: fm.resumen ?? "",
    portada: fm.portada ?? null,
    portadaAlt: fm.portadaAlt ?? "",
    autor: fm.autor,
    contenidoHtml: procesado.toString(),
  };
}

/** Orden cronológico inverso: la más reciente primero. */
export async function getNoticias(): Promise<Noticia[]> {
  const todas = await Promise.all(leerArchivos().map(parsear));
  return todas.sort((a, b) => b.fecha.localeCompare(a.fecha));
}

export async function getNoticia(slug: string): Promise<Noticia | undefined> {
  const archivo = `${slug}.md`;
  if (!fs.existsSync(path.join(DIR, archivo))) return undefined;
  return parsear(archivo);
}

export async function getSlugsNoticias(): Promise<string[]> {
  return leerArchivos().map((f) => f.replace(/\.md$/, ""));
}

/** Formato largo en español, para tarjetas y cabecera de artículo. */
export function formatearFecha(iso: string): string {
  const [a, m, d] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat("es-CL", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(a, (m ?? 1) - 1, d ?? 1)));
}
