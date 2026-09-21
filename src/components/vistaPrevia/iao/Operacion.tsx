import { Contenedor } from "@/components/ui/Contenedor";
import { pasos } from "@/content/brochureIao";
import { Encabezado, Lineas } from "./Tipografia";

/**
 * 02 · La operación.
 *
 * El dron es el protagonista: con el capítulo fijado, el scroll lo lleva por
 * las cuatro etapas del riel. En Capturar despliega el sensor sobre la etapa;
 * en las otras avanza y se detiene sobre cada una.
 *
 * Escritorio: las cuatro etapas en fila, la activa encendida.
 * Móvil: una etapa por pantalla, con el dron sobre el texto.
 * Movimiento reducido: las cuatro etapas en grilla, todas visibles.
 */
export function Operacion() {
  return (
    <section
      id="capitulo-02"
      data-capitulo="02"
      data-dron-escena="operacion"
      aria-labelledby="iao-operacion"
      className="iao-fijado relative overflow-hidden bg-steel-950 py-24 sm:py-32"
    >
      <div aria-hidden="true" className="iao-reticula absolute inset-0 opacity-70" />

      <Contenedor className="iao-operacion__contenido relative">
        <div className="flex items-start justify-between gap-8">
          <div>
            <Encabezado numero="02" nombre="La operación" />
            <h2
              id="iao-operacion"
              data-revelar-lineas
              className="mt-6 font-display text-[clamp(2.1rem,4.4vw,4rem)] font-bold uppercase leading-[0.94] tracking-[-0.03em] text-white"
            >
              <Lineas lineas={["De la captura", "a la decisión."]} />
            </h2>
          </div>

          {/* Solo desde 640px: en móvil le quitaba ancho al titular y lo partía
              en cuatro líneas. Ahí el avance lo muestra la barra del riel. */}
          <p
            aria-hidden="true"
            className="iao-solo-movimiento num hidden shrink-0 pt-1 text-right max-sm:!hidden"
          >
            <span className="eyebrow block text-steel-500">Etapa</span>
            <span className="mt-2 block font-display text-3xl font-semibold text-white">
              <span data-operacion-etapa>01</span>
              <span className="text-steel-600"> / {String(pasos.length).padStart(2, "0")}</span>
            </span>
          </p>
        </div>

        <div className="iao-operacion__riel mt-16">
          <div aria-hidden="true" className="relative h-px bg-white/15">
            <span
              data-operacion-barra
              className="absolute inset-0 origin-left bg-orange"
            />
          </div>

          <ol className="iao-pasos grid gap-x-8 gap-y-12 pt-8 sm:grid-cols-2 lg:grid-cols-4">
            {pasos.map((p, i) => (
              <li key={p.verbo} data-paso className="iao-paso relative">
                <span
                  aria-hidden="true"
                  className="absolute -top-8 left-0 hidden size-[7px] -translate-y-1/2 bg-orange lg:block"
                />
                <p className="num text-[0.8125rem] font-semibold text-orange">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3
                  {...(i === 0 ? { "data-dron-haz": "" } : {})}
                  className="mt-3 inline-block font-display text-[clamp(2.25rem,3.9vw,3.75rem)] font-bold uppercase leading-none tracking-[-0.03em] text-white"
                >
                  {p.verbo}
                </h3>
                <p className="mt-4 max-w-[21rem] text-[0.9375rem] leading-relaxed text-steel-400">
                  {p.detalle}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Contenedor>
    </section>
  );
}
