import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { BotonEnlace } from "@/components/ui/Boton";
import { Contenedor } from "@/components/ui/Contenedor";
import { cifrasDeCaso } from "@/components/ui/FichaCaso";
import { casosNarrativa, industriaDeCaso } from "@/content/brochureIao";
import { totales } from "@/content/casos";
import { Encabezado, Lineas } from "./Tipografia";

/**
 * 05 · Casos reales.
 *
 * Cada caso es una doble página de revista. En escritorio el marco se fija y
 * el scroll lo recorre en horizontal, un caso por vez, para que se sienta como
 * pasar de una operación a otra. En móvil los casos van uno bajo otro.
 *
 * Los proyectos no tienen fotografía propia en el material entregado por AGS,
 * así que la jerarquía la llevan las cifras publicadas, en display grande.
 * No se ilustra un caso con la foto de otra faena.
 */
export function CasosReales() {
  const total = casosNarrativa.length;

  return (
    <section
      id="capitulo-05"
      data-capitulo="05"
      data-dron-escena="casos"
      aria-labelledby="iao-casos"
      className="relative bg-steel-950 pt-24 sm:pt-32"
    >
      <Contenedor>
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end lg:gap-20">
          <div>
            <Encabezado numero="05" nombre="Casos reales" />
            <h2
              id="iao-casos"
              data-revelar-lineas
              className="mt-6 font-display text-[clamp(2.4rem,5.4vw,5rem)] font-bold uppercase leading-[0.92] tracking-[-0.035em] text-white"
            >
              <Lineas lineas={["Operaciones", "ejecutadas."]} />
            </h2>
          </div>
          <p data-revelar className="max-w-[30rem] text-lg leading-relaxed text-steel-400">
            Plantas, líneas y levantamientos en el norte de Chile. Las cifras son las publicadas por
            cada proyecto.
          </p>
        </div>
      </Contenedor>

      <div data-casos-marco className="iao-casos relative mt-14 border-t border-white/10 lg:mt-20">
        <ol data-casos-pista className="iao-casos__pista">
          {casosNarrativa.map((caso, i) => {
            const numero = String(i + 1).padStart(2, "0");
            return (
              <li key={caso.slug} data-caso className="iao-caso relative border-b border-white/10">
                <Contenedor className="iao-caso__interior">
                  <article className="relative grid w-full gap-10 py-14 sm:py-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-16 lg:py-0">
                    <span
                      aria-hidden="true"
                      data-caso-numero
                      className="iao-numero-contorno num pointer-events-none absolute -top-6 right-0 font-display text-[clamp(8rem,20vw,19rem)] font-bold leading-none tracking-[-0.06em] select-none lg:-top-10"
                    >
                      {numero}
                    </span>

                    <div className="relative">
                      <p className="eyebrow flex items-center gap-3 text-orange">
                        Caso {numero}
                        <span className="h-px w-8 bg-white/20" aria-hidden="true" />
                        <span className="text-steel-400">{industriaDeCaso(caso)}</span>
                      </p>
                      <p className="mt-8 text-[0.9375rem] font-semibold text-steel-300">
                        {caso.cliente}
                      </p>
                      <h3 className="mt-2 font-display text-[clamp(2.25rem,4.6vw,4.5rem)] font-bold leading-[0.95] tracking-[-0.03em] text-white">
                        {caso.planta}
                      </h3>
                      <p className="mt-4 text-[0.9375rem] text-steel-400">{caso.ubicacion}</p>
                      <p className="mt-8 max-w-[28rem] text-[1.0625rem] leading-relaxed text-steel-300">
                        {caso.nota}
                      </p>
                    </div>

                    <div className="relative flex flex-col justify-end">
                      <p className="eyebrow text-steel-500">Resultado</p>
                      <dl className="mt-5 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-white/10 pt-6">
                        {cifrasDeCaso(caso).map((c) => (
                          <div key={c.unidad} className="flex flex-col-reverse">
                            <dt className="mt-3 text-[0.875rem] leading-snug text-steel-400">{c.unidad}</dt>
                            <dd className="num font-display text-[clamp(2.75rem,5.4vw,5.25rem)] font-bold leading-[0.9] tracking-[-0.045em] text-white">
                              {c.valor}
                            </dd>
                          </div>
                        ))}
                      </dl>
                      <p className="eyebrow mt-8 text-steel-300">{caso.servicio}</p>
                    </div>
                  </article>
                </Contenedor>
              </li>
            );
          })}

          <li className="iao-caso iao-caso--cierre relative">
            <Contenedor className="iao-caso__interior">
              <div className="py-14 sm:py-16 lg:py-0">
                <p className="max-w-[18ch] font-display text-[clamp(1.75rem,3vw,2.75rem)] font-bold leading-[1.05] tracking-[-0.025em] text-white">
                  {total} de {totales.proyectos} proyectos publicados.
                </p>
                <BotonEnlace href="/casos" variante="linea-clara" tamano="lg" className="mt-8">
                  Ver todos los proyectos
                  <ArrowRight size={15} weight="bold" aria-hidden="true" />
                </BotonEnlace>
              </div>
            </Contenedor>
          </li>
        </ol>

        {/* Avance del recorrido horizontal. Solo tiene sentido con el marco fijado. */}
        <div
          aria-hidden="true"
          className="iao-solo-escritorio pointer-events-none absolute inset-x-0 bottom-0"
        >
          <Contenedor className="flex items-center gap-5 pb-6">
            <span className="num eyebrow text-steel-400">
              Caso <span data-casos-actual className="text-white">01</span> /{" "}
              {String(total).padStart(2, "0")}
            </span>
            <span className="relative h-px flex-1 bg-white/10">
              <span data-casos-barra className="absolute inset-0 origin-left scale-x-0 bg-orange" />
            </span>
          </Contenedor>
        </div>
      </div>
    </section>
  );
}
