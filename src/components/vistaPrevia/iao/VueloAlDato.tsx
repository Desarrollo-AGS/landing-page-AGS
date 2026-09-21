import type { CSSProperties } from "react";
import { Contenedor } from "@/components/ui/Contenedor";
import { capasDato, flujo } from "@/content/brochureIao";
import { Encabezado, Lineas } from "./Tipografia";

/**
 * 04 · Del vuelo al dato. El capítulo que explica qué hace AGS además de volar.
 *
 * Con el capítulo fijado, una sola línea atraviesa las seis etapas y las va
 * encendiendo. El dron vuelve, despliega el sensor sobre "Captura" y, a medida
 * que el dato sube, se aleja y aparecen las capas: ortomosaico, nube de puntos
 * y hallazgos. Las capas son un diagrama, no una interfaz: no muestran datos,
 * nombran los entregables reales de cada servicio.
 *
 * En móvil la línea corre en vertical y se dibuja con el scroll.
 */
export function VueloAlDato() {
  return (
    <section
      id="capitulo-04"
      data-capitulo="04"
      data-dron-escena="vuelo"
      aria-labelledby="iao-vuelo"
      className="iao-fijado-escritorio relative overflow-hidden bg-steel-900 pt-24 pb-16 sm:pt-32"
    >
      <div aria-hidden="true" className="iao-reticula absolute inset-0 opacity-60" />

      <Contenedor className="iao-vuelo__contenido relative">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-start">
          <div>
            <Encabezado numero="04" nombre="Del vuelo al dato" />
            <h2
              id="iao-vuelo"
              data-vuelo-titulo
              className="mt-6 font-display text-[clamp(2.8rem,7vw,6.5rem)] font-bold uppercase leading-[0.88] tracking-[-0.04em] text-white"
            >
              <Lineas lineas={["Del vuelo", <span key="dato" className="text-orange">al dato.</span>]} />
            </h2>
            <p
              data-revelar
              className="mt-7 max-w-[30rem] text-[1.0625rem] leading-relaxed text-steel-300"
            >
              Nuestras plataformas transforman los datos capturados en campo en decisiones
              operacionales precisas, trazables y disponibles en menos de 24 horas hábiles.
            </p>
          </div>

          <div aria-hidden="true" className="iao-capas relative hidden lg:block">
            {capasDato.map((capa, i) => (
              <div
                key={capa}
                data-capa
                className="absolute inset-0"
                style={{ "--i": i } as CSSProperties}
              >
                <span className="iao-capa" {...(i === capasDato.length - 1 ? { "data-hallazgos": "" } : {})} />
                <span className="iao-capa__rotulo eyebrow text-steel-300">{capa}</span>
              </div>
            ))}
          </div>
        </div>

        <ol data-flujo className="iao-flujo relative mt-14 grid lg:grid-cols-6 lg:gap-6">
          <span aria-hidden="true" data-flujo-linea className="iao-flujo__linea" />
          {flujo.map((f, i) => (
            <li
              key={f.etapa}
              data-flujo-nodo
              className="relative pb-9 pl-9 last:pb-0 lg:pb-0 lg:pl-0 lg:pt-8"
            >
              <span aria-hidden="true" className="iao-flujo__punto" />
              <p className="num text-[0.75rem] text-steel-500">{String(i + 1).padStart(2, "0")}</p>
              <h3
                {...(i === 1 ? { "data-dron-haz": "" } : {})}
                className="mt-1.5 inline-block font-display text-lg font-semibold uppercase tracking-[0.02em] text-white"
              >
                {f.etapa}
              </h3>
              <p className="mt-2 max-w-[20rem] text-[0.875rem] leading-relaxed text-steel-400">
                {f.detalle}
              </p>
            </li>
          ))}
        </ol>
      </Contenedor>
    </section>
  );
}
