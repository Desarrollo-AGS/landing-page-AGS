"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CODIGO_IDIOMA,
  IDIOMAS,
  NOMBRE_IDIOMA,
  idiomaDeRuta,
  rutaDe,
  sinPrefijo,
} from "@/lib/idioma";

/**
 * Selector de idioma.
 *
 * SIN BANDERAS NI EMOJIS, a propósito: una bandera designa un país, no un
 * idioma. El inglés no es de ninguna bandera en particular y el español se
 * habla en veinte países; además los emojis se renderizan distinto en cada
 * sistema y no se leen bien en un lector de pantalla. Dos siglas bastan.
 *
 * Cada idioma es un ENLACE REAL a la misma página en el otro idioma, no un
 * botón que cambia el texto: así se puede abrir en otra pestaña, compartir y,
 * sobre todo, Google puede seguirlo e indexar las dos versiones.
 *
 * El idioma actual no es un enlace: es un `span` marcado con `aria-current`.
 * Un enlace a la página en la que ya estás es ruido para quien navega con
 * teclado o lector de pantalla.
 */
export function SelectorIdioma({ className = "" }: { className?: string }) {
  const pathname = usePathname() ?? "/";
  const actual = idiomaDeRuta(pathname);
  const base = sinPrefijo(pathname);

  return (
    <div className={`flex items-center ${className}`}>
      {IDIOMAS.map((lang, i) => (
        <span key={lang} className="flex items-center">
          {i > 0 ? (
            <span aria-hidden="true" className="px-1.5 text-steel-500">
              /
            </span>
          ) : null}

          {lang === actual ? (
            <span
              aria-current="true"
              className="text-[0.8125rem] font-semibold tracking-[0.04em] text-white"
            >
              {CODIGO_IDIOMA[lang]}
            </span>
          ) : (
            <Link
              href={rutaDe(lang, base)}
              hrefLang={lang}
              // El nombre accesible dice el idioma completo: "EN" a secas no se
              // entiende leído en voz alta.
              aria-label={`Ver esta página en ${NOMBRE_IDIOMA[lang]}`}
              className="text-[0.8125rem] font-medium tracking-[0.04em] transition-colors duration-200 hover:text-white"
            >
              {CODIGO_IDIOMA[lang]}
            </Link>
          )}
        </span>
      ))}
    </div>
  );
}
