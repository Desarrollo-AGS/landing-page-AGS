import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Contenedor } from "@/components/ui/Contenedor";
import { servicios } from "@/content/servicios";
import { Encabezado, Lineas } from "@/components/vistaPrevia/iao/Tipografia";

/**
 * 02 · Los siete servicios. El capítulo fijado principal.
 *
 * QUÉ CAMBIA RESPECTO DEL ÍNDICE ACTUAL
 * -------------------------------------
 * Hoy es una lista larga con la columna izquierda `sticky`: se recorre. Acá el
 * capítulo se FIJA y el scroll pasa a ser su línea de tiempo: los siete
 * servicios se relevan de a uno, con el riel de avance y el contador 01/07.
 * Es el mismo recurso que "La operación" del brochure, con el contenido del
 * inicio y sobre fondo claro.
 *
 * El texto y los datos son exactamente los de `ServiciosIndice`: mismo titular,
 * mismo párrafo, misma fotografía con su pie, y por cada servicio su título, su
 * primer entregable y sus industrias.
 *
 * La foto lleva `data-dron-haz`: es el objetivo del sensor mientras el dron
 * sobrevuela la columna izquierda, que es el aire que este layout le reserva.
 */
export function Servicios() {
  return (
    <section
      id="capitulo-02"
      data-capitulo="02"
      data-dron-escena="servicios"
      aria-labelledby="ini-servicios"
      className="iao-fijado-escritorio relative overflow-hidden bg-white py-20 sm:py-24"
    >
      <Contenedor className="ini-capitulo__contenido relative">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] lg:gap-16">
          {/* ---------- Columna izquierda: titular, foto y contador ---------- */}
          <div className="flex flex-col">
            <Encabezado numero="02" nombre="Los servicios" tono="claro" />

            <h2
              id="ini-servicios"
              data-servicios-titulo
              className="mt-5 text-d3 text-steel-900 sm:text-d2"
            >
              <Lineas lineas={["Siete operaciones, un mismo", "criterio: nadie sube"]} />
            </h2>

            <p className="measure mt-5 text-[1.0625rem] leading-relaxed text-steel-600">
              Cada servicio reemplaza una tarea que hoy se hace con andamio, canasto o corte de
              producción. La captura toma horas y la instalación sigue funcionando.
            </p>

            {/* Ancho acotado a propósito: a ancho completo la figura medía ~400px
                de alto y la columna entera no cabía en el capítulo fijado, que
                deja el contenido pegado al navbar y al video de abajo. */}
            <figure className="mt-9 hidden w-full max-w-[26rem] lg:block">
              <div
                data-servicios-foto
                data-dron-haz
                className="chamfer relative aspect-[4/3] overflow-hidden bg-steel-100"
              >
                <Image
                  src="/images/fotogrametria_terreno_2d.jpg"
                  alt="Ortomosaico de un levantamiento aerofotogramétrico, con grilla de coordenadas UTM, curvas de nivel, puntos de control en terreno y el polígono del área levantada"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  loading="lazy"
                  // La imagen es cuadrada y el marco 4:3: se centra para que el
                  // recorte caiga en el encabezado y la leyenda, no en el terreno.
                  className="object-cover object-center"
                />
              </div>
              <figcaption className="mt-3 text-[0.8125rem] leading-relaxed text-steel-500">
                Ortomosaico georreferenciado: el entregable del levantamiento.
              </figcaption>
            </figure>
          </div>

          {/* ---------- Columna derecha: los servicios relevándose ---------- */}
          <div className="flex flex-col">
            {/* Riel de avance: solo aparece cuando el capítulo está fijado. */}
            <div
              aria-hidden="true"
              className="iao-solo-escritorio mb-8 flex items-center gap-4 max-lg:!hidden"
            >
              <div className="relative h-px flex-1 bg-steel-200">
                <span data-servicios-barra className="absolute inset-0 origin-left bg-orange" />
              </div>
              <p className="num shrink-0 text-[0.8125rem] font-semibold tracking-[0.06em]">
                <span data-servicios-etapa className="text-steel-900">
                  01
                </span>
                <span className="text-steel-400">
                  {" "}
                  / {String(servicios.length).padStart(2, "0")}
                </span>
              </p>
            </div>

            <ul className="ini-servicios border-t border-steel-200 lg:border-t-0">
              {servicios.map((s, i) => (
                <li
                  key={s.slug}
                  data-servicio
                  className="ini-servicio border-b border-steel-100 lg:border-b-0"
                >
                  <Link
                    href={`/servicios/${s.slug}`}
                    className="group flex items-start justify-between gap-6 py-6 transition-[padding,background-color] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-steel-50 sm:hover:pl-4 lg:py-0"
                  >
                    <div>
                      <p className="num text-[0.75rem] font-semibold text-orange">
                        {String(i + 1).padStart(2, "0")}
                      </p>
                      <h3 className="mt-2 text-[1.1875rem] font-semibold leading-snug tracking-[-0.018em] text-steel-900 lg:text-[1.75rem] lg:tracking-[-0.025em]">
                        {s.titulo}
                      </h3>
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
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Contenedor>
    </section>
  );
}
