import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Contenedor } from "@/components/ui/Contenedor";
import { Revelar } from "@/components/ui/Revelar";
import { MarcoCaptura } from "@/components/ui/MarcoCaptura";
import { productos } from "@/content/software";
import { getServicio } from "@/content/servicios";

/**
 * F-07 · Software en el home.
 *
 * Framing obligatorio: la plataforma no se presenta como un producto que se
 * vende aparte. Cada ficha dice qué resuelve y a qué servicio se engancha, que
 * es exactamente lo que pide el brief. No hay planes, precios ni "prueba
 * gratis" en ninguna parte.
 */
export function SoftwareBloque() {
  return (
    <section className="bg-steel-50 py-20 sm:py-24 lg:py-28">
      <Contenedor>
        <Revelar>
          <div className="max-w-[42rem]">
            <span className="rule-accent mb-6" aria-hidden="true" />
            <h2 className="text-d3 text-steel-900 sm:text-d2">
              El vuelo termina donde empieza el dato
            </h2>
            <p className="mt-5 text-[1.0625rem] leading-relaxed text-steel-600">
              Nuestras plataformas son la parte del servicio que queda después del vuelo: donde
              el hallazgo se ubica sobre el activo real y el equipo de mantenimiento trabaja
              sobre él.
            </p>
          </div>
        </Revelar>

        <ul className="mt-14 grid gap-4 lg:grid-cols-2">
          {productos.map((p, i) => {
            const enganche = p.servicios
              .map((s) => getServicio(s)?.tituloCorto)
              .filter(Boolean);

            return (
              <Revelar as="li" key={p.slug} delay={i * 0.08} className="h-full h-full">
                <Link
                  href={`/software/${p.slug}`}
                  className="group flex h-full flex-col border border-steel-200 bg-white p-6 transition-[border-color,box-shadow] duration-200 hover:border-steel-400 hover:shadow-e2 sm:p-8"
                >
                  <MarcoCaptura src={p.captura} alt={p.capturaAlt} nombre={p.nombre} />

                  <h3 className="mt-7 text-2xl font-semibold tracking-[-0.02em] text-steel-900">
                    {p.nombre}
                  </h3>
                  <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-steel-600">
                    {p.resuelve}
                  </p>

                  <p className="mt-6 border-t border-steel-100 pt-5 text-[0.8125rem] leading-relaxed text-steel-500">
                    Se engancha a <span className="text-steel-700">{enganche.join(" y ")}</span>
                    .
                  </p>

                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-orange-ink">
                    Ver la plataforma
                    <ArrowRight
                      size={14}
                      weight="bold"
                      aria-hidden="true"
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              </Revelar>
            );
          })}
        </ul>
      </Contenedor>
    </section>
  );
}
