"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Contenedor } from "@/components/ui/Contenedor";
import { MarcoCaptura } from "@/components/ui/MarcoCaptura";
import { getServicio } from "@/content/servicios";
import { Encabezado, Lineas } from "@/components/vistaPrevia/iao/Tipografia";
import { plataformas } from "./plataformas";

/**
 * 06 · El vuelo termina donde empieza el dato.
 *
 * CARRUSEL EN PERSPECTIVA, NO GRILLA
 * ----------------------------------
 * La grilla de dos columnas no escala: en cuanto haya más plataformas se
 * convierte en una lista larga y ninguna manda. Acá las tarjetas se apilan en
 * profundidad —la activa al frente, las vecinas girando hacia atrás— y se pasa
 * de una a otra con las flechas. Agregar una cuarta no cambia nada del layout.
 *
 * EL DESPLAZAMIENTO ES CIRCULAR
 * -----------------------------
 * El desfase de cada tarjeta se normaliza a la mitad de la lista, así que la
 * última empalma con la primera y las flechas nunca quedan sin efecto.
 *
 * LAS TRANSFORMACIONES VIVEN EN CSS
 * ---------------------------------
 * Acá solo se escriben `--off` y `--abs` (el desfase y su valor absoluto). El
 * `transform` está en globals.css y SOLO se aplica con `[data-movimiento]`,
 * que marca `animaciones.ts`. Así, con movimiento reducido o sin JS, las
 * tarjetas caen a una grilla legible en vez de quedarse apiladas y giradas:
 * un `transform` en línea le habría ganado a esa regla.
 */
export function Software() {
  const [activa, setActiva] = useState(0);
  const total = plataformas.length;
  const stageRef = useRef<HTMLDivElement>(null);

  const mover = useCallback(
    (paso: number) => setActiva((i) => (i + paso + total) % total),
    [total],
  );

  // Flechas del teclado cuando el carrusel tiene el foco: es un control, y
  // depender solo del ratón dejaría fuera la navegación por teclado.
  useEffect(() => {
    const nodo = stageRef.current;
    if (!nodo) return;
    const alPulsar = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") mover(-1);
      else if (e.key === "ArrowRight") mover(1);
      else return;
      e.preventDefault();
    };
    nodo.addEventListener("keydown", alPulsar);
    return () => nodo.removeEventListener("keydown", alPulsar);
  }, [mover]);

  return (
    <section
      id="capitulo-06"
      data-capitulo="06"
      aria-labelledby="ini-software"
      className="relative overflow-hidden bg-steel-50 py-20 sm:py-24 lg:py-28"
    >
      <Contenedor>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[42rem]">
            <Encabezado numero="06" nombre="Del vuelo al dato" tono="claro" />
            <h2 id="ini-software" className="mt-5 text-d3 text-steel-900 sm:text-d2">
              <Lineas lineas={["El vuelo termina", "donde empieza el dato"]} />
            </h2>
            <p className="mt-5 text-[1.0625rem] leading-relaxed text-steel-600">
              Nuestras plataformas son la parte del servicio que queda después del vuelo: donde
              el hallazgo se ubica sobre el activo real y el equipo de mantenimiento trabaja
              sobre él.
            </p>
          </div>

          {/* Controles. Mismo lenguaje de contador que los demás capítulos. */}
          <div
            data-carrusel-controles
            className="ini-carrusel__controles flex shrink-0 items-center gap-5"
          >
            <p className="num text-[0.8125rem] font-semibold tracking-[0.06em]">
              <span className="text-steel-900">{String(activa + 1).padStart(2, "0")}</span>
              <span className="text-steel-400"> / {String(total).padStart(2, "0")}</span>
            </p>
          </div>
        </div>
      </Contenedor>

      <div
        ref={stageRef}
        data-carrusel
        tabIndex={-1}
        className="ini-carrusel relative mt-14 focus:outline-none"
      >
        {plataformas.map((p, i) => {
          // Desfase circular: la última empalma con la primera.
          let off = i - activa;
          if (off > total / 2) off -= total;
          if (off < -total / 2) off += total;
          const abs = Math.abs(off);
          const esActiva = off === 0;
          const enganche = p.servicios
            .map((s) => getServicio(s)?.tituloCorto)
            .filter(Boolean);

          return (
            <article
              key={p.slug}
              data-plataforma
              data-activa={esActiva ? "true" : undefined}
              aria-hidden={abs > 1 ? true : undefined}
              style={{ "--off": off, "--abs": abs } as React.CSSProperties}
              className="ini-carrusel__tarjeta flex flex-col border border-steel-200 bg-white p-6 sm:p-8"
            >
              <MarcoCaptura src={p.captura} alt={p.capturaAlt} nombre={p.nombre} />

              <h3 className="mt-7 text-2xl font-semibold tracking-[-0.02em] text-steel-900">
                {p.nombre}
              </h3>
              <p
                className={`mt-3 flex-1 text-[0.9375rem] leading-relaxed ${
                  p.pendiente ? "italic text-steel-400" : "text-steel-600"
                }`}
              >
                {p.resuelve}
              </p>

              {enganche.length ? (
                <p className="mt-6 border-t border-steel-100 pt-5 text-[0.8125rem] leading-relaxed text-steel-500">
                  Se engancha a <span className="text-steel-700">{enganche.join(" y ")}</span>.
                </p>
              ) : (
                <p className="mt-6 border-t border-steel-100 pt-5 text-[0.8125rem] leading-relaxed text-steel-400">
                  Servicios asociados pendientes de definición.
                </p>
              )}

              {/* Sin ficha publicada no se enlaza a ninguna parte: un enlace a
                  una página inexistente es peor que no tenerlo. */}
              {p.ficha ? (
                <Link
                  href={p.ficha}
                  // Las tarjetas del costado salen del orden de tabulación:
                  // están recortadas y girando, y no se pueden leer.
                  tabIndex={esActiva ? undefined : -1}
                  className="group mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-orange-ink"
                >
                  Ver la plataforma
                  <ArrowRight
                    size={14}
                    weight="bold"
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </Link>
              ) : (
                <p className="mt-5 text-sm font-semibold text-steel-400">Ficha en preparación</p>
              )}
            </article>
          );
        })}

        {/* Flanqueando las tarjetas, no en el encabezado: con el carrusel
            centrado en la ventana, unas flechas arriba de la sección quedan
            fuera de cuadro justo cuando se quieren usar. */}
        <button
          type="button"
          data-carrusel-prev
          onClick={() => mover(-1)}
          aria-label="Ver la plataforma anterior"
          className="ini-carrusel__flecha ini-carrusel__flecha--izq"
        >
          <ArrowLeft size={16} weight="bold" aria-hidden="true" />
        </button>
        <button
          type="button"
          data-carrusel-next
          onClick={() => mover(1)}
          aria-label="Ver la plataforma siguiente"
          className="ini-carrusel__flecha ini-carrusel__flecha--der"
        >
          <ArrowRight size={16} weight="bold" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
