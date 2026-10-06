import type { Idioma } from "@/lib/idioma";
import type { Diccionario } from "./tipos";
import { es } from "./es";
import { en } from "./en";

const DICCIONARIOS: Record<Idioma, Diccionario> = { es, en };

/** Texto del sitio en un idioma. Es síncrono: son objetos, no una carga. */
export function diccionario(lang: Idioma): Diccionario {
  return DICCIONARIOS[lang];
}

export type { Diccionario } from "./tipos";
