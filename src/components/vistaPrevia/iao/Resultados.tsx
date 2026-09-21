import { Contenedor } from "@/components/ui/Contenedor";
import { formatearCifra } from "@/components/ui/FichaCaso";
import { metricas } from "@/content/brochureIao";
import { Encabezado, Lineas } from "./Tipografia";

/**
 * 06 · Resultados.
 *
 * Todas las cifras se derivan de `casos.ts` y `site.ts` (ver
 * `content/brochure.ts`). El HTML trae el valor final: el conteo al entrar en
 * pantalla es una capa encima, y sin JavaScript o con movimiento reducido se
 * lee el número real desde el primer momento.
 */
export function Resultados() {
  return (
    <section
      id="capitulo-06"
      data-capitulo="06"
      data-dron-escena="resultados"
      aria-labelledby="iao-resultados"
      className="relative bg-steel-950 py-24 sm:py-32"
    >
      <Contenedor>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Encabezado numero="06" nombre="Resultados" />
            <h2
              id="iao-resultados"
              data-revelar-lineas
              className="mt-6 font-display text-[clamp(2.1rem,4.2vw,3.75rem)] font-bold uppercase leading-[0.94] tracking-[-0.03em] text-white"
            >
              <Lineas lineas={["Lo ejecutado,", "en cifras."]} />
            </h2>
          </div>
          <p data-revelar className="max-w-[24rem] text-[0.9375rem] leading-relaxed text-steel-400">
            Sumadas sobre los proyectos publicados por AGS. Se actualizan con cada proyecto nuevo.
          </p>
        </div>

        <dl className="mt-14 grid grid-cols-2 border-t border-white/10 lg:mt-20 lg:grid-cols-5">
          {metricas.map((m, i) => (
            <div
              key={m.etiqueta}
              data-revelar
              className={`flex flex-col-reverse justify-end border-b border-white/10 py-8 lg:border-b-0 lg:py-12 ${
                i === 0 ? "col-span-2 lg:col-span-1" : ""
              } ${i > 0 ? "lg:border-l lg:pl-6" : "lg:pr-6"} ${i % 2 === 0 && i > 0 ? "border-l pl-5" : ""}`}
            >
              <dt className="mt-4">
                <span className="block text-[0.9375rem] font-medium text-white">{m.etiqueta}</span>
                {m.detalle ? (
                  <span className="mt-1 block text-[0.8125rem] leading-snug text-steel-500">
                    {m.detalle}
                  </span>
                ) : null}
              </dt>
              <dd
                data-cifra={m.valor}
                // Tope de 4.75rem: en cinco columnas de 1320px, "5.194" a más
                // tamaño invade la columna vecina.
                className="num font-display text-[clamp(2.75rem,4.6vw,4.75rem)] font-bold leading-[0.9] tracking-[-0.045em] text-white"
              >
                {formatearCifra(m.valor)}
              </dd>
            </div>
          ))}
        </dl>
      </Contenedor>
    </section>
  );
}
