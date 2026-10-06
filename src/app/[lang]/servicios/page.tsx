import type { Metadata } from "next";
import Image from "next/image";
import { Enlace as Link } from "@/components/ui/Enlace";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { CabeceraPagina } from "@/components/ui/CabeceraPagina";
import { Contenedor } from "@/components/ui/Contenedor";
import { Revelar } from "@/components/ui/Revelar";
import { ContactoBloque } from "@/components/home/ContactoBloque";
import { servicios } from "@/content/servicios";
import { metadatosDe } from "@/lib/seo";
import { diccionario } from "@/content/i18n";
import { IDIOMA_POR_DEFECTO, esIdioma } from "@/lib/idioma";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const idioma = esIdioma(lang) ? lang : IDIOMA_POR_DEFECTO;
  const seo = diccionario(idioma).seo.paginas["/servicios"];
  return metadatosDe({ ...seo, ruta: "/servicios", lang: idioma });
}

export default async function PaginaServicios({ params }: Props) {
  const { lang } = await params;
  const idioma = esIdioma(lang) ? lang : IDIOMA_POR_DEFECTO;
  const t = diccionario(idioma);

  return (
    <>
      <CabeceraPagina
        titulo={t.paginas.servicios.titulo}
        bajada={t.paginas.servicios.bajada}
        migas={[{ label: t.paginas.migas["/servicios"] }]}
        lang={idioma}
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
                alt={t.servicios["inspeccion-instalaciones-industriales"].imagenAlt}
                fill
                priority
                sizes="(min-width: 1320px) 1320px, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 text-[0.8125rem] text-steel-500">
              {t.paginas.servicios.pieFoto}
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
                        {t.industrias[ind]}
                      </li>
                    ))}
                  </ul>

                  <h2 className="mt-5 text-xl font-semibold leading-snug tracking-[-0.018em] text-steel-900">
                    {t.servicios[s.slug].titulo}
                  </h2>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-steel-600">
                    {t.servicios[s.slug].resumen}
                  </p>

                  <ul className="mt-6 flex-1 space-y-2.5">
                    {t.servicios[s.slug].entregables.slice(0, 2).map((e) => (
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
                    {t.paginas.servicios.verDetalle}
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

      <ContactoBloque lang={idioma} />
    </>
  );
}
