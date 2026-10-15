import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { CabeceraPagina } from "@/components/ui/CabeceraPagina";
import { Migas } from "@/components/ui/Migas";
import { BotonEnlace } from "@/components/ui/Boton";
import { VistaDispositivos } from "@/components/software/VistaDispositivos";
import { Contenedor } from "@/components/ui/Contenedor";
import { Revelar } from "@/components/ui/Revelar";
import { MarcoCaptura } from "@/components/ui/MarcoCaptura";
import { ContactoBloque } from "@/components/home/ContactoBloque";
import { getProducto, productos } from "@/content/software";
import { metadatosDe } from "@/lib/seo";
import { diccionario } from "@/content/i18n";
import { IDIOMA_POR_DEFECTO, esIdioma } from "@/lib/idioma";

type Props = { params: Promise<{ lang: string; slug: string }> };

export function generateStaticParams() {
  return productos.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const p = getProducto(slug);
  if (!p) return {};
  const idioma = esIdioma(lang) ? lang : IDIOMA_POR_DEFECTO;
  const t = diccionario(idioma);
  return metadatosDe({
    titulo: t.seo.softwareTitulo.replace("{producto}", p.nombre),
    descripcion: t.software[slug].resuelve,
    ruta: `/software/${p.slug}`,
    lang: idioma,
    imagen: p.captura,
  });
}

export default async function PaginaProducto({ params }: Props) {
  const { lang, slug } = await params;
  const producto = getProducto(slug);
  if (!producto) notFound();
  const idioma = esIdioma(lang) ? lang : IDIOMA_POR_DEFECTO;
  const t = diccionario(idioma);
  const texto = t.software[slug];

  return (
    <>
      {producto.dispositivos && texto.dispositivos ? (
        /* ---------------------------------------------------------------- *
         * Portada de plataforma.
         *
         * Reemplaza a `CabeceraPagina` en vez de sumarse a ella: el nombre y
         * la frase de entrada son los mismos, y repetirlos arriba dejaría dos
         * encabezados. Conserva lo que esa cabecera aporta —fondo navy, migas,
         * filete naranja, el mismo h1— y le suma la columna de dispositivos.
         * ---------------------------------------------------------------- */
        <section className="bg-steel-900 pt-14 pb-16 sm:pt-16 sm:pb-20">
          <Contenedor>
            <Migas items={[{ label: producto.nombre }]} lang={idioma} className="mb-9" />

            <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1fr)] lg:gap-16">
              <Revelar>
                <span className="rule-accent mb-6" aria-hidden="true" />
                <h1 className="text-d3 text-white sm:text-d2">{producto.nombre}</h1>

                <p className="measure mt-5 text-[1.125rem] font-semibold leading-snug text-white">
                  {texto.resuelve}
                </p>
                <p className="measure mt-5 text-[1.0625rem] leading-relaxed text-steel-400">
                  {texto.descripcion}
                </p>

                {texto.claves?.length ? (
                  <ol className="mt-9 border-t border-white/10">
                    {texto.claves.map((c, i) => (
                      <li
                        key={c}
                        className="flex items-baseline gap-4 border-b border-white/10 py-3.5"
                      >
                        <span
                          aria-hidden="true"
                          className="num text-[0.75rem] font-semibold text-orange"
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[0.9375rem] leading-snug text-steel-200">
                          {c}
                        </span>
                      </li>
                    ))}
                  </ol>
                ) : null}

                <BotonEnlace href={producto.sitio} externo tamano="lg" className="mt-9">
                  {t.paginas.software.irAlSitio.replace("{producto}", producto.nombre)}
                  <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
                </BotonEnlace>
              </Revelar>

              <Revelar delay={0.08}>
                <VistaDispositivos
                  dispositivos={producto.dispositivos}
                  textos={texto.dispositivos}
                />
              </Revelar>
            </div>
          </Contenedor>
        </section>
      ) : (
        <>
          <CabeceraPagina
            titulo={producto.nombre}
            bajada={texto.resuelve}
            migas={[{ label: producto.nombre }]}
            lang={idioma}
          />

          <section className="bg-white py-16 sm:py-20">
            <Contenedor>
              <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:gap-16">
                <Revelar>
                  <MarcoCaptura
                    src={producto.captura}
                    alt={texto.capturaAlt}
                    nombre={producto.nombre}
                  />
                </Revelar>

                <Revelar delay={0.08}>
                  <p className="text-[1.0625rem] leading-relaxed text-steel-700">
                    {texto.descripcion}
                  </p>

                  <a
                    href={producto.sitio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-9 inline-flex items-center gap-1.5 text-[0.9375rem] font-semibold text-orange-ink underline-offset-4 hover:underline"
                  >
                    {t.paginas.software.irAlSitio.replace("{producto}", producto.nombre)}
                    <ArrowUpRight size={15} weight="bold" aria-hidden="true" />
                  </a>
                </Revelar>
              </div>
            </Contenedor>
          </section>
        </>
      )}

      <ContactoBloque lang={idioma} />
    </>
  );
}
