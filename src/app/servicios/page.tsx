import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { CabeceraPagina } from "@/components/ui/CabeceraPagina";
import { Contenedor } from "@/components/ui/Contenedor";
import { Revelar } from "@/components/ui/Revelar";
import { ContactoBloque } from "@/components/home/ContactoBloque";
import { servicios } from "@/content/servicios";
import { metadatosDe } from "@/lib/seo";

export const metadata: Metadata = metadatosDe({
  titulo: "Servicios con drones para minería, energía y construcción",
  descripcion:
    "Siete operaciones aéreas industriales: inspección termográfica de plantas fotovoltaicas, líneas eléctricas, topografía y aerofotogrametría, limpieza de fachadas, inspección industrial, control de riego en pilas de lixiviación y producción audiovisual.",
  ruta: "/servicios",
});

export default function PaginaServicios() {
  return (
    <>
      <CabeceraPagina
        titulo="Siete operaciones aéreas industriales"
        bajada="Cada una reemplaza una tarea que hoy se hace con andamio, canasto o corte de producción."
        migas={[{ label: "Servicios" }]}
      />

      {/* Una sola fotografía real para toda la página, con pie que dice qué es.
          El resto del índice es tipográfico: no hay material fotográfico por
          servicio todavía, y rellenar siete tarjetas con la misma toma de una
          faena de limpieza mostraría como propia una operación que no
          corresponde. Ver nota en components/home/ServiciosIndice.tsx. */}
      <section className="bg-white pt-12 sm:pt-16">
        <Contenedor>
          <figure>
            <div className="chamfer relative aspect-[21/9] overflow-hidden bg-steel-100">
              <Image
                src="/images/dron-fachada.webp"
                alt="Dron de AGS operando junto a una planta industrial activa, con la línea de proceso en funcionamiento"
                fill
                priority
                sizes="(min-width: 1320px) 1320px, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 text-[0.8125rem] text-steel-500">
              Operación en faena activa, Región de Antofagasta.
            </figcaption>
          </figure>
        </Contenedor>
      </section>

      <section className="bg-white py-14 sm:py-20">
        <Contenedor>
          <ul className="grid gap-px bg-steel-200 md:grid-cols-2">
            {servicios.map((s, i) => (
              <Revelar
                as="li"
                key={s.slug}
                delay={Math.min(i, 4) * 0.05}
                className="h-full h-full bg-white"
              >
                <Link
                  href={`/servicios/${s.slug}`}
                  className="group flex h-full flex-col p-7 transition-colors duration-200 hover:bg-steel-50 sm:p-9"
                >
                  <ul className="flex flex-wrap gap-2">
                    {s.industrias.map((ind) => (
                      <li
                        key={ind}
                        className="border border-steel-200 px-2 py-0.5 text-[0.6875rem] font-medium tracking-[0.04em] text-steel-500"
                      >
                        {ind}
                      </li>
                    ))}
                  </ul>

                  <h2 className="mt-5 text-xl font-semibold leading-snug tracking-[-0.018em] text-steel-900">
                    {s.titulo}
                  </h2>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-steel-600">
                    {s.resumen}
                  </p>

                  <ul className="mt-6 flex-1 space-y-2.5">
                    {s.entregables.slice(0, 2).map((e) => (
                      <li
                        key={e}
                        className="flex gap-3 text-[0.875rem] leading-relaxed text-steel-500"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2.5 h-px w-4 shrink-0 bg-orange"
                        />
                        {e}
                      </li>
                    ))}
                  </ul>

                  <span className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-orange-ink">
                    Ver detalle
                    <ArrowRight
                      size={14}
                      weight="bold"
                      aria-hidden="true"
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              </Revelar>
            ))}
          </ul>
        </Contenedor>
      </section>

      <ContactoBloque />
    </>
  );
}
