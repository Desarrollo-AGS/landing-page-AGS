"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Enlace as Link } from "@/components/ui/Enlace";
import { ArrowUpRight, Check, SquaresFour } from "@phosphor-icons/react/dist/ssr";
import { Contenedor } from "@/components/ui/Contenedor";
import { Revelar } from "@/components/ui/Revelar";
import { servicios, type Industria } from "@/content/servicios";
import { diccionario } from "@/content/i18n";
import type { Idioma } from "@/lib/idioma";

/**
 * Listado de servicios de `/servicios`.
 *
 * CADA SERVICIO CON SU PROPIA FOTOGRAFÍA
 * --------------------------------------
 * El índice era tipográfico y la página abría con una sola foto para las siete
 * fichas. Eso tenía su razón —no había material por servicio, y repetir una
 * toma de limpieza de fachada en todas habría mostrado como propia una
 * operación que no correspondía—, pero desde que cada servicio tiene su imagen
 * la foto única sobraba: ahora cada tarjeta muestra la suya.
 *
 * FILTRO POR INDUSTRIA
 * --------------------
 * Siete servicios en una grilla se leen de corrido; lo que no se lee es cuáles
 * sirven para MI operación. El filtro responde esa pregunta, y por eso es lo
 * único interactivo de la página y la única razón por la que este bloque es
 * cliente: el resto de `/servicios` se sigue renderizando en el servidor.
 *
 * Las industrias no están escritas acá: salen de los propios servicios, en el
 * orden en que aparecen. Un servicio nuevo con una industria nueva agrega su
 * filtro solo.
 */
export function ListadoServicios({ lang }: { lang: Idioma }) {
  const t = diccionario(lang);
  const [filtro, setFiltro] = useState<Industria | null>(null);

  const industrias = useMemo(() => {
    const vistas = new Set<Industria>();
    for (const s of servicios) for (const i of s.industrias) vistas.add(i);
    return [...vistas];
  }, []);

  const visibles = filtro ? servicios.filter((s) => s.industrias.includes(filtro)) : servicios;

  return (
    <section className="bg-steel-50 py-14 sm:py-20">
      <Contenedor>
        {/* ---------- Filtros ---------- */}
        <div
          role="group"
          aria-label={t.paginas.servicios.filtrarPor}
          className="flex flex-wrap gap-2"
        >
          <Chip activo={filtro === null} onClick={() => setFiltro(null)}>
            <SquaresFour size={15} weight="bold" aria-hidden="true" />
            {t.paginas.servicios.todos}
          </Chip>
          {industrias.map((ind) => (
            <Chip key={ind} activo={filtro === ind} onClick={() => setFiltro(ind)}>
              {t.industrias[ind]}
            </Chip>
          ))}
        </div>

        {/* ---------- Recuento ---------- */}
        <div className="mt-7 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-steel-200 pb-4 text-[0.8125rem] text-steel-500">
          {/* `aria-live`: con el filtro manejado por botones, el recuento es lo
              único que avisa a un lector de pantalla de que la lista cambió. */}
          <p className="num" aria-live="polite">
            {(visibles.length === 1
              ? t.paginas.servicios.contadorUno
              : t.paginas.servicios.contador
            ).replace("{n}", String(visibles.length).padStart(2, "0"))}
          </p>
          <p className="flex items-center gap-2">
            <SquaresFour size={14} aria-hidden="true" className="text-steel-400" />
            {t.paginas.servicios.porSector}
          </p>
        </div>

        {/* ---------- Tarjetas ---------- */}
        {visibles.length ? (
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibles.map((s, i) => {
              const texto = t.servicios[s.slug];
              return (
                <Revelar as="li" key={s.slug} delay={Math.min(i, 5) * 0.05} className="h-full">
                  <Link
                    href={`/servicios/${s.slug}`}
                    className="group flex h-full flex-col border border-steel-200 bg-white transition-[border-color,box-shadow] duration-200 hover:border-steel-400 hover:shadow-e2"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-steel-100">
                      <Image
                        src={s.imagen}
                        alt={texto.imagenAlt}
                        fill
                        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                        className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.03]"
                        style={{ objectPosition: s.imagenEncuadre ?? "center" }}
                      />
                      {/* El número y las industrias van SOBRE la foto, y las
                          fotos son de terreno a pleno sol: sin este velo en los
                          dos bordes, el texto blanco desaparece en las claras. */}
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-b from-steel-950/45 via-transparent to-steel-950/65"
                      />
                      <span className="num absolute left-4 top-3.5 text-[0.75rem] font-semibold tracking-[0.04em] text-white/90">
                        / {String(i + 1).padStart(2, "0")}
                      </span>
                      <ul className="absolute bottom-3.5 left-4 right-4 flex flex-wrap gap-1.5">
                        {s.industrias.map((ind) => (
                          <li
                            key={ind}
                            className="border border-white/25 bg-steel-950/45 px-2 py-0.5 text-[0.6875rem] font-medium text-white backdrop-blur-[2px]"
                          >
                            {t.industrias[ind]}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-1 flex-col p-6 sm:p-7">
                      <h2 className="text-xl font-semibold leading-snug tracking-[-0.018em] text-steel-900">
                        {texto.titulo}
                      </h2>
                      <p className="mt-3 text-[0.9375rem] leading-relaxed text-steel-600">
                        {texto.resumen}
                      </p>

                      <ul className="mt-5 flex-1 space-y-2.5">
                        {texto.entregables.slice(0, 2).map((e) => (
                          <li
                            key={e}
                            className="flex gap-2.5 text-[0.875rem] leading-relaxed text-steel-500"
                          >
                            <Check
                              size={14}
                              weight="bold"
                              aria-hidden="true"
                              className="mt-1 shrink-0 text-orange"
                            />
                            {e}
                          </li>
                        ))}
                      </ul>

                      <span className="mt-6 flex items-center justify-between gap-4 border-t border-steel-100 pt-4 text-sm font-semibold text-steel-900">
                        {t.paginas.servicios.conocerServicio}
                        <ArrowUpRight
                          size={16}
                          weight="bold"
                          aria-hidden="true"
                          className="shrink-0 text-orange transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </span>
                    </div>
                  </Link>
                </Revelar>
              );
            })}
          </ul>
        ) : (
          <p className="mt-10 text-[0.9375rem] text-steel-500">
            {t.paginas.servicios.sinResultados}
          </p>
        )}
      </Contenedor>
    </section>
  );
}

/**
 * Pastilla de filtro. Es un `<button>` con `aria-pressed` y no un enlace: no
 * cambia de página ni de URL, solo acota la lista que ya está abajo.
 */
function Chip({
  activo,
  onClick,
  children,
}: {
  activo: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={activo}
      className={`inline-flex items-center gap-2 rounded-xs px-4 py-2 text-[0.875rem] font-medium transition-colors duration-200 ${
        activo
          ? "bg-steel-900 text-white"
          : "border border-steel-200 bg-white text-steel-700 hover:border-steel-400 hover:text-steel-900"
      }`}
    >
      {children}
    </button>
  );
}
