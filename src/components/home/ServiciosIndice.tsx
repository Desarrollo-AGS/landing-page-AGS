import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Contenedor } from "@/components/ui/Contenedor";
import { Revelar } from "@/components/ui/Revelar";
import { servicios } from "@/content/servicios";

/**
 * Servicios en el home: índice partido, con la columna izquierda fija.
 *
 * POR QUÉ NO SON SIETE TARJETAS CON FOTO
 * --------------------------------------
 * De las fotografías reales que hay hoy, todas corresponden a la misma
 * operación de limpieza de fachada. Poner esa foto bajo el título "Inspección
 * de líneas eléctricas" o "Topografía" haría que el sitio muestre como propia
 * una faena que no es la del servicio. Repetir la misma imagen siete veces
 * tampoco resuelve nada: se nota, y se ve descuidado.
 *
 * Así que el índice es tipográfico y la sección se ancla en UNA fotografía
 * real, con un pie que dice exactamente qué se está viendo. Cuando AGS entregue
 * material por servicio, cada ficha de detalle ya tiene su imagen propia y esta
 * sección puede sumar miniaturas sin cambiar de estructura.
 *
 * La columna izquierda es `sticky`: mientras se recorren las siete filas, el
 * título y la foto se quedan a la vista, que es lo que mantiene el contexto en
 * una lista larga.
 */
export function ServiciosIndice() {
  return (
    <section id="servicios" className="bg-white py-20 sm:py-24 lg:py-28">
      <Contenedor>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-20">
          {/* ---------- Columna fija ---------- */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Revelar>
              <span className="rule-accent mb-6" aria-hidden="true" />
              <h2 className="text-d3 text-steel-900 sm:text-d2">
                Siete operaciones, un mismo criterio: nadie sube
              </h2>
              <p className="measure mt-5 text-[1.0625rem] leading-relaxed text-steel-600">
                Cada servicio reemplaza una tarea que hoy se hace con andamio, canasto o corte
                de producción. La captura toma horas y la instalación sigue funcionando.
              </p>

              <figure className="mt-10 hidden lg:block">
                <div className="chamfer relative aspect-[4/3] overflow-hidden bg-steel-100">
                  <Image
                    src="/images/dron-fachada.webp"
                    alt="Dron de AGS aplicando agua a presión sobre la fachada de una planta industrial, con la línea de proceso operando debajo"
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    loading="lazy"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-3 text-[0.8125rem] leading-relaxed text-steel-500">
                  Limpieza de fachada en faena activa, Región de Antofagasta.
                </figcaption>
              </figure>
            </Revelar>
          </div>

          {/* ---------- Índice ---------- */}
          <div>
            <ul className="border-t border-steel-200">
              {servicios.map((s, i) => (
                <Revelar
                  as="li"
                  key={s.slug}
                  delay={Math.min(i, 4) * 0.05}
                  className="border-b border-steel-100"
                >
                  <Link
                    href={`/servicios/${s.slug}`}
                    className="group flex items-start justify-between gap-6 py-6 transition-[padding,background-color] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-steel-50 sm:hover:pl-4"
                  >
                    <div>
                      <h3 className="text-[1.1875rem] font-semibold leading-snug tracking-[-0.018em] text-steel-900">
                        {s.titulo}
                      </h3>
                      {/* Primer entregable en vez de `resumen`: el lema de tres
                          palabras ("Rápido. Preciso. Seguro.") se repite en tres
                          servicios y en una lista se leería como un error. */}
                      <p className="measure mt-2 text-[0.9375rem] leading-relaxed text-steel-600">
                        {s.entregables[0]}
                      </p>
                      <ul className="mt-3.5 flex flex-wrap gap-2">
                        {s.industrias.map((ind) => (
                          <li
                            key={ind}
                            className="border border-steel-200 px-2 py-0.5 text-[0.6875rem] font-medium tracking-[0.04em] text-steel-500"
                          >
                            {ind}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <ArrowRight
                      size={18}
                      weight="bold"
                      aria-hidden="true"
                      className="mt-1.5 shrink-0 text-steel-300 transition-[color,transform] duration-200 group-hover:translate-x-1 group-hover:text-orange"
                    />
                  </Link>
                </Revelar>
              ))}
            </ul>
          </div>
        </div>
      </Contenedor>
    </section>
  );
}
