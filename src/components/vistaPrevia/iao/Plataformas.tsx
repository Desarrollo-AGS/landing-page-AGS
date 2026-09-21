import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Contenedor } from "@/components/ui/Contenedor";
import { plataformas } from "@/content/brochureIao";

/**
 * 04 (continuación) · Plataformas.
 *
 * Solo las funcionalidades que declara el brochure 2026. No se dibuja ninguna
 * interfaz: las capturas reales siguen pendientes de entrega (ver MarcoCaptura)
 * y una maqueta inventada se leería como el producto.
 */
export function Plataformas() {
  return (
    <section aria-labelledby="iao-plataformas" className="relative bg-steel-900 pb-24 sm:pb-32">
      <Contenedor>
        <div className="grid gap-12 border-t border-white/10 pt-14 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,2fr)] lg:gap-16 lg:pt-20">
          <div data-revelar>
            <p className="eyebrow text-steel-400">Plataformas AGS</p>
            <h3
              id="iao-plataformas"
              className="mt-4 max-w-[16ch] font-display text-d4 text-white sm:text-d3"
            >
              El dato, ubicado sobre el activo real.
            </h3>
          </div>

          <div className="grid gap-12 sm:grid-cols-2 sm:gap-10">
            {plataformas.map((p) => (
              <article key={p.slug} data-revelar className="border-l border-white/10 pl-6 sm:pl-8">
                <p className="eyebrow text-orange">{p.rol}</p>
                <h4 className="mt-3 font-display text-[clamp(2rem,3.4vw,3rem)] font-bold leading-none tracking-[-0.03em] text-white">
                  {p.nombre}
                </h4>
                <p className="mt-5 text-[1.0625rem] leading-relaxed text-steel-200">{p.resumen}</p>

                <ul className="mt-6 space-y-3">
                  {p.funcionalidades.map((f) => (
                    <li key={f} className="flex gap-3 text-[0.9375rem] leading-relaxed text-steel-400">
                      <span aria-hidden="true" className="mt-[0.7em] h-px w-4 shrink-0 bg-orange" />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
                  <Link
                    href={`/software/${p.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-white underline-offset-4 hover:underline"
                  >
                    Ver ficha
                    <ArrowRight size={13} weight="bold" aria-hidden="true" />
                  </Link>
                  <a
                    href={p.sitio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-steel-400 underline-offset-4 hover:text-white hover:underline"
                  >
                    {p.sitio.replace(/^https?:\/\/(www\.)?/, "")}
                    <ArrowUpRight size={13} weight="bold" aria-hidden="true" />
                    <span className="sr-only">(se abre en una pestaña nueva)</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Contenedor>
    </section>
  );
}
