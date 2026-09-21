"use client";

import { useEffect, useState } from "react";
import type { Capitulo } from "@/content/brochureIao";

/**
 * Índice de capítulos, al margen izquierdo.
 *
 * Solo desde 1440px: por debajo el margen del contenedor no alcanza y el
 * índice caería sobre el texto. Se oculta al salir de la experiencia (en el
 * formulario de contacto y el footer), donde ya no hay capítulo que marcar.
 *
 * El capítulo activo se detecta con IntersectionObserver sobre una línea en
 * el centro de la ventana: sin listener de scroll y sin trabajo por cuadro.
 */
export function IndiceCapitulos({ capitulos }: { capitulos: Capitulo[] }) {
  const [activo, setActivo] = useState<string | null>(null);

  useEffect(() => {
    const cruzando = new Set<string>();
    const io = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (e.isIntersecting) cruzando.add(e.target.id);
          else cruzando.delete(e.target.id);
        }
        const actual = capitulos.filter((c) => cruzando.has(c.id)).at(-1)?.id ?? null;
        setActivo(actual);
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );

    for (const c of capitulos) {
      const el = document.getElementById(c.id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, [capitulos]);

  // En "Casos reales" la pista horizontal cruza el margen izquierdo de borde a
  // borde, y el índice quedaría encima del texto que pasa. Ahí se aparta.
  const visible = activo !== null && activo !== "capitulo-05";

  return (
    <nav
      aria-label="Capítulos"
      className={`fixed left-6 top-1/2 z-30 hidden -translate-y-1/2 transition-opacity duration-500 min-[1440px]:block ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <ol className="space-y-2.5">
        {capitulos.map((c) => {
          const esActivo = c.id === activo;
          return (
            <li key={c.id}>
              <a
                href={`#${c.id}`}
                aria-current={esActivo ? "location" : undefined}
                className="group flex items-center gap-2.5 py-0.5"
              >
                <span
                  aria-hidden="true"
                  className={`h-px transition-[width,background-color] duration-300 ${
                    esActivo ? "w-5 bg-orange" : "w-2.5 bg-white/25 group-hover:bg-white/60"
                  }`}
                />
                <span
                  className={`num text-[0.6875rem] font-medium transition-colors ${
                    esActivo ? "text-white" : "text-steel-500 group-hover:text-steel-300"
                  }`}
                >
                  {c.numero}
                </span>
                <span className="sr-only">{c.nombre}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
