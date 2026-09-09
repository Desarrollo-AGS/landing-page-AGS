import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { CabeceraPagina } from "@/components/ui/CabeceraPagina";
import { Contenedor } from "@/components/ui/Contenedor";
import { Revelar } from "@/components/ui/Revelar";
import { MarcoCaptura } from "@/components/ui/MarcoCaptura";
import { ContactoBloque } from "@/components/home/ContactoBloque";
import { productos } from "@/content/software";
import { getServicio } from "@/content/servicios";
import { metadatosDe } from "@/lib/seo";

export const metadata: Metadata = metadatosDe({
  titulo: "Software: SmartField y SmartLayout",
  descripcion:
    "Las plataformas sobre las que AGS entrega el dato de cada campaña: SmartField para inspección georreferenciada y SmartLayout para levantamiento y planificación.",
  ruta: "/software",
});

/**
 * F-07 · Índice de software.
 *
 * El encuadre lo fija el brief y no se negocia: AGS no vende software suelto.
 * Vende el servicio con drones y la plataforma que lo acompaña, desde la
 * captura hasta la entrega del dato. Por eso la página abre explicando la
 * cadena completa y cada ficha declara a qué servicio se engancha, en vez de
 * presentar dos productos independientes con sus propias funcionalidades.
 */
export default function PaginaSoftware() {
  return (
    <>
      <CabeceraPagina
        titulo="La plataforma es parte del servicio"
        bajada="El vuelo captura. La plataforma es donde ese dato queda ubicado sobre el activo real y disponible para el equipo que tiene que actuar."
        migas={[{ label: "Software" }]}
      />

      {/* Cadena captura → proceso → entrega. Tres pasos con su verbo, sin
          numeración de etapas: el paso ES la etiqueta. */}
      <section className="bg-white py-16 sm:py-20">
        <Contenedor>
          <ul className="grid gap-px overflow-hidden border border-steel-200 bg-steel-200 sm:grid-cols-3">
            {[
              {
                titulo: "Capturar",
                texto:
                  "El dron levanta imagen térmica, visual o nube de puntos sobre la instalación, en horas.",
              },
              {
                titulo: "Procesar",
                texto:
                  "El material se procesa con software de análisis y lo revisa un especialista del servicio.",
              },
              {
                titulo: "Entregar",
                texto:
                  "El resultado queda en la plataforma, ubicado sobre el activo y listo para trabajar.",
              },
            ].map((p, i) => (
              <Revelar
                as="li"
                key={p.titulo}
                delay={i * 0.07}
                className="h-full bg-white p-7 sm:p-8"
              >
                <h2 className="text-lg font-semibold text-steel-900">{p.titulo}</h2>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-steel-600">
                  {p.texto}
                </p>
              </Revelar>
            ))}
          </ul>
        </Contenedor>
      </section>

      <section className="bg-steel-50 py-16 sm:py-20">
        <Contenedor>
          <ul className="grid gap-6 lg:grid-cols-2">
            {productos.map((p, i) => {
              const enganche = p.servicios
                .map((s) => getServicio(s)?.tituloCorto)
                .filter(Boolean);

              return (
                <Revelar
                  as="li"
                  key={p.slug}
                  delay={i * 0.08}
                  className="h-full flex h-full flex-col border border-steel-200 bg-white p-7 sm:p-9"
                >
                  <MarcoCaptura src={p.captura} alt={p.capturaAlt} nombre={p.nombre} />

                  <h2 className="mt-8 text-d4 text-steel-900">{p.nombre}</h2>
                  <p className="mt-4 text-[1.0625rem] leading-relaxed text-steel-700">
                    {p.resuelve}
                  </p>
                  <p className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-steel-600">
                    {p.descripcion}
                  </p>

                  <p className="mt-7 border-t border-steel-100 pt-5 text-[0.8125rem] leading-relaxed text-steel-500">
                    Se engancha a <span className="text-steel-700">{enganche.join(" y ")}</span>
                    .
                  </p>

                  <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
                    <Link
                      href={`/software/${p.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange-ink underline-offset-4 hover:underline"
                    >
                      Ver ficha
                      <ArrowRight size={14} weight="bold" aria-hidden="true" />
                    </Link>
                    <a
                      href={p.sitio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-steel-600 underline-offset-4 hover:text-steel-900 hover:underline"
                    >
                      Ir al sitio de {p.nombre}
                      <ArrowUpRight size={14} weight="bold" aria-hidden="true" />
                    </a>
                  </div>
                </Revelar>
              );
            })}
          </ul>
        </Contenedor>
      </section>

      <ContactoBloque />
    </>
  );
}
