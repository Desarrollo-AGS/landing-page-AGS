import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { casosDestacados, totales } from "@/content/casos";
import { Contenedor } from "@/components/ui/Contenedor";
import { FichaCaso, formatearCifra } from "@/components/ui/FichaCaso";
import { BotonEnlace } from "@/components/ui/Boton";
import { Encabezado, Lineas } from "@/components/vistaPrevia/iao/Tipografia";

/**
 * 05 · Proyectos ya ejecutados.
 *
 * Las cifras siguen calculándose desde la cartera publicada en `content/casos`,
 * no escritas a mano, igual que en el bloque actual.
 *
 * QUÉ CAMBIA
 * ----------
 * Las seis fichas dejan de ser una grilla y pasan a ser una PISTA HORIZONTAL:
 * con el capítulo fijado, el scroll vertical desplaza los proyectos de lado.
 * Es el recurso de "Casos reales" del brochure, con las fichas del inicio.
 *
 * Las cifras conservan `data-dron-haz` y `data-cifra`: el dron las escanea
 * mientras cuentan, que es el paso que ya te gustaba del inicio actual.
 *
 * La grilla sigue existiendo bajo 1024px y con movimiento reducido: la pista
 * solo se arma cuando `animaciones.ts` marca la raíz (ver `.ini-casos`).
 */
export function Casos() {
  return (
    <section
      id="capitulo-05"
      data-capitulo="05"
      data-dron-escena="casos"
      aria-labelledby="ini-casos"
      className="bg-steel-950 py-20 sm:py-24 lg:py-28"
    >
      <Contenedor>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[36rem]">
            <Encabezado numero="05" nombre="La prueba" />
            <h2 id="ini-casos" className="mt-5 text-d3 text-white sm:text-d2">
              <Lineas lineas={["Proyectos ya ejecutados"]} />
            </h2>
            <p className="mt-5 text-[1.0625rem] leading-relaxed text-steel-400">
              La franja de logos genera confianza a primera vista. Esto es lo que hay detrás:
              plantas, ubicaciones y superficies medidas.
            </p>
          </div>

          <dl
            data-dron-haz
            className="grid shrink-0 grid-cols-3 gap-x-5 gap-y-2 border-l-2 border-orange pl-5 sm:gap-x-10 sm:pl-6"
          >
            {[
              { k: "Proyectos", v: String(totales.proyectos), n: totales.proyectos },
              { k: "MW inspeccionados", v: formatearCifra(totales.mw), n: totales.mw },
              { k: "Hectáreas", v: formatearCifra(totales.hectareas), n: totales.hectareas },
            ].map(({ k, v, n }) => (
              <div key={k}>
                <dd
                  data-cifra={n}
                  className="num text-[1.5rem] font-semibold leading-none tracking-[-0.028em] text-white sm:text-[2rem]"
                >
                  {v}
                </dd>
                <dt className="mt-2 text-xs leading-snug text-steel-500">{k}</dt>
              </div>
            ))}
          </dl>
        </div>
      </Contenedor>

      {/* ---------- Pista de proyectos ---------- */}
      <div data-casos-marco className="ini-casos relative mt-14">
        {/* Barra de avance del recorrido. Solo con la pista armada. */}
        <Contenedor
          aria-hidden="true"
          className="iao-solo-escritorio mb-8 flex items-center gap-4 max-lg:!hidden"
        >
          <div className="relative h-px flex-1 bg-white/15">
            <span data-casos-barra className="absolute inset-0 origin-left scale-x-0 bg-orange" />
          </div>
          <p className="num shrink-0 text-[0.8125rem] font-semibold tracking-[0.06em]">
            <span data-casos-actual className="text-white">
              01
            </span>
            <span className="text-steel-600">
              {" "}
              / {String(casosDestacados.length).padStart(2, "0")}
            </span>
          </p>
        </Contenedor>

        <ul data-casos-pista className="ini-casos__pista">
          {casosDestacados.map((caso, i) => (
            <li key={caso.slug} data-caso className="ini-caso">
              <div className="ini-caso__interior relative">
                <span
                  aria-hidden="true"
                  data-caso-numero
                  className="iao-numero-contorno pointer-events-none absolute -top-10 right-0 hidden font-display text-[10rem] font-bold leading-none lg:block"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="relative">
                  <FichaCaso caso={caso} tono="oscuro" />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <Contenedor className="mt-10">
        <BotonEnlace href="/casos" variante="linea-clara" tamano="lg">
          Ver los {totales.proyectos} proyectos
          <ArrowRight size={15} weight="bold" aria-hidden="true" />
        </BotonEnlace>
      </Contenedor>
    </section>
  );
}
