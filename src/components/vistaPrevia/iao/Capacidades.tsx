import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Contenedor } from "@/components/ui/Contenedor";
import { capacidades } from "@/content/brochureIao";
import { MediaCapacidad } from "./MediaCapacidad";
import { Encabezado, Lineas } from "./Tipografia";

/**
 * 03 · Lo que hacemos.
 *
 * Composición editorial, no grilla de tarjetas: un índice numerado a la
 * derecha y, en escritorio, un panel fijo a la izquierda donde la imagen de
 * cada capacidad entra con un corte vertical al llegar a su fila.
 *
 * En móvil cada capacidad lleva su imagen arriba del texto. El panel de
 * escritorio y la imagen de móvil son dos nodos distintos, pero la imagen
 * oculta con `display: none` no se descarga (`loading="lazy"`).
 */
export function Capacidades() {
  return (
    <section
      id="capitulo-03"
      data-capitulo="03"
      data-dron-escena="capacidades"
      aria-labelledby="iao-capacidades"
      className="relative border-t border-white/[0.06] bg-steel-950 py-24 sm:py-32"
    >
      <Contenedor>
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end lg:gap-20">
          <div>
            <Encabezado numero="03" nombre="Lo que hacemos" />
            <h2
              id="iao-capacidades"
              data-revelar-lineas
              className="mt-6 font-display text-[clamp(2.4rem,5.4vw,5rem)] font-bold uppercase leading-[0.92] tracking-[-0.035em] text-white"
            >
              <Lineas lineas={["Tecnología aérea", "aplicada en faena."]} />
            </h2>
          </div>
          <p data-revelar className="max-w-[30rem] text-lg leading-relaxed text-steel-400">
            Operación en terreno y entrega de datos procesados en plataformas digitales
            especializadas.
          </p>
        </div>

        <div className="mt-16 grid lg:mt-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
          {/* ---------- Panel fijo (escritorio) ---------- */}
          <div className="hidden lg:block">
            <div
              data-capacidades-panel
              className="chamfer sticky top-[calc(68px+8svh)] h-[calc(100svh-68px-16svh)] min-h-[26rem] overflow-hidden bg-steel-900"
            >
              {capacidades.map((c, i) => (
                <div
                  key={c.numero}
                  data-capacidad-media
                  className="absolute inset-0"
                  style={{ zIndex: i === 0 ? 1 : 0 }}
                >
                  <MediaCapacidad media={c.media} conVideo />
                </div>
              ))}
            </div>
          </div>

          {/* ---------- Índice ---------- */}
          <ol className="min-w-0">
            {capacidades.map((c) => (
              <li
                key={c.numero}
                data-capacidad
                className="border-t border-white/10 py-12 lg:flex lg:min-h-[68svh] lg:flex-col lg:justify-center lg:py-16"
              >
                <div className="chamfer relative mb-8 aspect-[4/3] overflow-hidden lg:hidden">
                  <MediaCapacidad media={c.media} />
                </div>

                <p className="num text-[0.8125rem] font-semibold text-orange">{c.numero}</p>
                {/* "INFRAESTRUCTURA" es una sola palabra de 15 letras: el tamaño
                    está medido para que quepa en la columna de 320 a 1920px. */}
                <h3 className="mt-3 font-display text-[clamp(1.75rem,8.6vw,3.5rem)] font-bold uppercase leading-[0.92] tracking-[-0.035em] text-white lg:text-[clamp(2.4rem,3.6vw,4rem)]">
                  {c.nombre}
                </h3>
                <p className="mt-5 max-w-[30rem] text-lg leading-relaxed text-steel-300">
                  {c.detalle}
                </p>

                {c.enlaces.length ? (
                  <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
                    {c.enlaces.map((e) => (
                      <li key={e.href}>
                        <Link
                          href={e.href}
                          className="group inline-flex items-center gap-1.5 text-sm font-semibold text-orange underline-offset-4 hover:underline"
                        >
                          {e.label}
                          <ArrowRight
                            size={13}
                            weight="bold"
                            aria-hidden="true"
                            className="transition-transform duration-200 group-hover:translate-x-0.5"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </Contenedor>
    </section>
  );
}
