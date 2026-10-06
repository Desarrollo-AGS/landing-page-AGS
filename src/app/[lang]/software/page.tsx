import type { Metadata } from "next";
import { Enlace as Link } from "@/components/ui/Enlace";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { CabeceraPagina } from "@/components/ui/CabeceraPagina";
import { Contenedor } from "@/components/ui/Contenedor";
import { Revelar } from "@/components/ui/Revelar";
import { MarcoCaptura } from "@/components/ui/MarcoCaptura";
import { ContactoBloque } from "@/components/home/ContactoBloque";
import { productos } from "@/content/software";
import { metadatosDe } from "@/lib/seo";
import { diccionario } from "@/content/i18n";
import { IDIOMA_POR_DEFECTO, esIdioma } from "@/lib/idioma";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const idioma = esIdioma(lang) ? lang : IDIOMA_POR_DEFECTO;
  const seo = diccionario(idioma).seo.paginas["/software"];
  return metadatosDe({ ...seo, ruta: "/software", lang: idioma });
}

/**
 * F-07 · Índice de software.
 *
 * El encuadre lo fija el brief y no se negocia: AGS no vende software suelto.
 * Vende el servicio con drones y la plataforma que lo acompaña, desde la
 * captura hasta la entrega del dato. Por eso la página abre explicando la
 * cadena completa y cada ficha declara a qué servicio se engancha, en vez de
 * presentar dos productos independientes con sus propias funcionalidades.
 */
export default async function PaginaSoftware({ params }: Props) {
  const { lang } = await params;
  const idioma = esIdioma(lang) ? lang : IDIOMA_POR_DEFECTO;
  const t = diccionario(idioma);

  return (
    <>
      <CabeceraPagina
        titulo={t.paginas.software.titulo}
        bajada={t.paginas.software.bajada}
        migas={[{ label: t.paginas.migas["/software"] }]}
        lang={idioma}
      />

      {/* Cadena captura → proceso → entrega. Tres pasos con su verbo, sin
          numeración de etapas: el paso ES la etiqueta. */}
      <section className="bg-white py-16 sm:py-20">
        <Contenedor>
          <ul className="grid gap-px overflow-hidden border border-steel-200 bg-steel-200 sm:grid-cols-3">
            {t.paginas.software.pasos.map((p, i) => (
              <Revelar
                as="li"
                key={p.titulo}
                delay={i * 0.07}
                className="h-full bg-white p-7 sm:p-8"
              >
                <h2 className="text-lg font-semibold text-steel-900">{p.titulo}</h2>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-steel-600">
                  {p.detalle}
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
                .map((s) => t.servicios[s]?.tituloCorto)
                .filter(Boolean);

              return (
                <Revelar
                  as="li"
                  key={p.slug}
                  delay={i * 0.08}
                  className="h-full flex h-full flex-col border border-steel-200 bg-white p-7 sm:p-9"
                >
                  <MarcoCaptura
                    src={p.captura}
                    alt={t.software[p.slug].capturaAlt}
                    nombre={p.nombre}
                  />

                  <h2 className="mt-8 text-d4 text-steel-900">{p.nombre}</h2>
                  <p className="mt-4 text-[1.0625rem] leading-relaxed text-steel-700">
                    {t.software[p.slug].resuelve}
                  </p>
                  <p className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-steel-600">
                    {t.software[p.slug].descripcion}
                  </p>

                  <p className="mt-7 border-t border-steel-100 pt-5 text-[0.8125rem] leading-relaxed text-steel-500">
                    {/* La frase se parte por el marcador porque los nombres de
                        servicio van resaltados en medio de ella, y su posición
                        no es la misma en los dos idiomas. */}
                    {t.paginas.software.seEngancha.split("{servicios}")[0]}
                    <span className="text-steel-700">{enganche.join(t.ui.conjuncion)}</span>
                    {t.paginas.software.seEngancha.split("{servicios}")[1]}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
                    <Link
                      href={`/software/${p.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange-ink underline-offset-4 hover:underline"
                    >
                      {t.paginas.software.verFicha}
                      <ArrowRight size={14} weight="bold" aria-hidden="true" />
                    </Link>
                    <a
                      href={p.sitio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-steel-600 underline-offset-4 hover:text-steel-900 hover:underline"
                    >
                      {t.paginas.software.irAlSitio.replace("{producto}", p.nombre)}
                      <ArrowUpRight size={14} weight="bold" aria-hidden="true" />
                    </a>
                  </div>
                </Revelar>
              );
            })}
          </ul>
        </Contenedor>
      </section>

      <ContactoBloque lang={idioma} />
    </>
  );
}
