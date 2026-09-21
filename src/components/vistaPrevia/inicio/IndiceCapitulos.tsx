"use client";

import { useEffect, useState } from "react";

/**
 * Índice de capítulos, fijo al costado izquierdo.
 *
 * Es el mismo recurso del brochure: da la sensación de recorrido, no de página
 * larga. Acá va en tono claro, porque el inicio alterna fondos y el rail tiene
 * que leerse igual sobre blanco que sobre steel-950 (de ahí `mix-blend`).
 *
 * Solo desde 1280px: bajo ese ancho no hay canaleta libre y se montaría sobre
 * el contenido. No es navegación (no reemplaza al navbar), así que es
 * `aria-hidden`: para un lector de pantalla los capítulos ya son secciones con
 * su propio encabezado.
 */

export const capitulos = [
  { n: "00", nombre: "Inicio" },
  { n: "01", nombre: "Clientes" },
  { n: "02", nombre: "Servicios" },
  { n: "03", nombre: "Faena" },
  { n: "04", nombre: "Nosotros" },
  { n: "05", nombre: "Casos" },
  { n: "06", nombre: "Software" },
] as const;

export function IndiceCapitulos() {
  const [activo, setActivo] = useState("00");

  useEffect(() => {
    const secciones = Array.from(document.querySelectorAll<HTMLElement>("[data-capitulo]"));
    if (!secciones.length) return;

    // Se marca el capítulo que cruza la mitad de la ventana. Un
    // IntersectionObserver con varios umbrales sería más ruidoso: en capítulos
    // fijados el que "entra" y el que "sale" se solapan por el espaciador.
    const alScrollear = () => {
      const linea = window.innerHeight * 0.5;
      let actual = secciones[0];
      for (const s of secciones) if (s.getBoundingClientRect().top <= linea) actual = s;
      setActivo(actual.dataset.capitulo ?? "00");
    };

    alScrollear();
    window.addEventListener("scroll", alScrollear, { passive: true });
    window.addEventListener("resize", alScrollear);
    return () => {
      window.removeEventListener("scroll", alScrollear);
      window.removeEventListener("resize", alScrollear);
    };
  }, []);

  return (
    <nav
      aria-hidden="true"
      className="ini-indice pointer-events-none fixed left-5 top-1/2 z-30 hidden -translate-y-1/2 xl:block"
    >
      <ol className="flex flex-col gap-3">
        {capitulos.map((c) => {
          const esActivo = c.n === activo;
          return (
            <li key={c.n} className="flex items-center gap-2.5">
              <span
                className={`block h-px transition-all duration-500 ${
                  esActivo ? "w-6 bg-orange" : "w-3 bg-current opacity-30"
                }`}
              />
              <span
                className={`num text-[0.6875rem] tracking-[0.08em] transition-opacity duration-500 ${
                  esActivo ? "opacity-100" : "opacity-35"
                }`}
              >
                {c.n}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
