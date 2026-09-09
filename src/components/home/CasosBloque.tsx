import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { casosDestacados, totales } from "@/content/casos";
import { Contenedor } from "@/components/ui/Contenedor";
import { FichaCaso, formatearCifra } from "@/components/ui/FichaCaso";
import { Revelar } from "@/components/ui/Revelar";
import { BotonEnlace } from "@/components/ui/Boton";

/**
 * Casos de éxito en el home. Seis proyectos, y el enlace al índice completo.
 *
 * Las cifras del encabezado (proyectos, MW, hectáreas) NO están escritas a
 * mano: se calculan sumando la cartera publicada en `content/casos.ts`. Si se
 * agrega un proyecto, el número se mueve solo y no queda desincronizado con la
 * grilla que tiene justo debajo.
 */
export function CasosBloque() {
  return (
    <section id="casos" className="bg-steel-950 py-20 sm:py-24 lg:py-28">
      <Contenedor>
        <Revelar>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-[36rem]">
              <span className="rule-accent mb-6" aria-hidden="true" />
              <h2 className="text-d3 text-white sm:text-d2">Proyectos ya ejecutados</h2>
              <p className="mt-5 text-[1.0625rem] leading-relaxed text-steel-400">
                La franja de logos genera confianza a primera vista. Esto es lo que hay detrás:
                plantas, ubicaciones y superficies medidas.
              </p>
            </div>

            {/* A 320px, tres columnas con `gap-x-10` y cifras de 2rem no caben
                en los 278px disponibles y empujaban la página al scroll
                horizontal. El paso y el cuerpo suben recién desde 640px. */}
            <dl className="grid shrink-0 grid-cols-3 gap-x-5 gap-y-2 border-l-2 border-orange pl-5 sm:gap-x-10 sm:pl-6">
              {[
                { k: "Proyectos", v: String(totales.proyectos) },
                { k: "MW inspeccionados", v: formatearCifra(totales.mw) },
                { k: "Hectáreas", v: formatearCifra(totales.hectareas) },
              ].map(({ k, v }) => (
                <div key={k}>
                  <dd className="num text-[1.5rem] font-semibold leading-none tracking-[-0.028em] text-white sm:text-[2rem]">
                    {v}
                  </dd>
                  <dt className="mt-2 text-xs leading-snug text-steel-500">{k}</dt>
                </div>
              ))}
            </dl>
          </div>
        </Revelar>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {casosDestacados.map((caso, i) => (
            <Revelar as="li" key={caso.slug} delay={(i % 3) * 0.07} className="h-full h-full">
              <FichaCaso caso={caso} tono="oscuro" />
            </Revelar>
          ))}
        </ul>

        <Revelar className="mt-10">
          <BotonEnlace href="/casos" variante="linea-clara" tamano="lg">
            Ver los {totales.proyectos} proyectos
            <ArrowRight size={15} weight="bold" aria-hidden="true" />
          </BotonEnlace>
        </Revelar>
      </Contenedor>
    </section>
  );
}
