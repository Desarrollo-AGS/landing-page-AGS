import type { Metadata } from "next";
import Image from "next/image";
import { ImageSquare } from "@phosphor-icons/react/dist/ssr";
import { CabeceraPagina } from "@/components/ui/CabeceraPagina";
import { Contenedor } from "@/components/ui/Contenedor";
import { Revelar } from "@/components/ui/Revelar";
import { ContactoBloque } from "@/components/home/ContactoBloque";
import { iniciativas } from "@/content/comunidad";
import { metadatosDe } from "@/lib/seo";
import { diccionario } from "@/content/i18n";
import { IDIOMA_POR_DEFECTO, esIdioma } from "@/lib/idioma";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const idioma = esIdioma(lang) ? lang : IDIOMA_POR_DEFECTO;
  const seo = diccionario(idioma).seo.paginas["/comunidad"];
  return metadatosDe({ ...seo, ruta: "/comunidad", lang: idioma });
}

/**
 * F-08 · Comunidad.
 *
 * Bloque repetible: para sumar una iniciativa basta agregar un objeto a
 * `content/comunidad.ts`. La composición alterna el lado de la imagen, así que
 * dos iniciativas no se leen como dos filas idénticas.
 *
 * Una iniciativa SIN fotografías se renderiza igual, con una reserva declarada.
 * Es el caso del colegio AIS: sus imágenes involucran a menores y no se
 * publican sin autorización escrita.
 */
export default async function PaginaComunidad({ params }: Props) {
  const { lang } = await params;
  const idioma = esIdioma(lang) ? lang : IDIOMA_POR_DEFECTO;
  const t = diccionario(idioma);

  return (
    <>
      <CabeceraPagina
        titulo={t.paginas.comunidad.titulo}
        bajada={t.paginas.comunidad.bajada}
        migas={[{ label: t.paginas.migas["/comunidad"] }]}
        lang={idioma}
      />

      <section className="bg-white py-16 sm:py-20">
        <Contenedor>
          <ul className="space-y-16 sm:space-y-24">
            {iniciativas.map((ini, i) => {
              const imagenALaDerecha = i % 2 === 0;
              const texto = t.comunidad[ini.slug];

              return (
                <Revelar
                  as="li"
                  key={ini.slug}
                  className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
                >
                  <div className={imagenALaDerecha ? "lg:order-2" : ""}>
                    {ini.imagenes.length > 0 ? (
                      <div className="chamfer relative aspect-[4/3] overflow-hidden bg-steel-100">
                        <Image
                          src={ini.imagenes[0].src}
                          alt={texto?.imagenAlt ?? ini.imagenes[0].alt}
                          fill
                          sizes="(min-width: 1024px) 50vw, 100vw"
                          loading="lazy"
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="chamfer flex aspect-[4/3] flex-col items-center justify-center gap-3 border border-dashed border-steel-300 bg-steel-50 px-8 text-center">
                        <ImageSquare
                          size={24}
                          weight="light"
                          aria-hidden="true"
                          className="text-steel-400"
                        />
                        <p className="measure text-[0.8125rem] leading-relaxed text-steel-500">
                          {ini.pendiente}
                        </p>
                      </div>
                    )}
                  </div>

                  <div>
                    <p className="eyebrow text-orange-ink">{texto?.bajada ?? ini.bajada}</p>
                    <h2 className="mt-3 text-d4 text-steel-900 sm:text-d3">
                      {texto?.titulo ?? ini.titulo}
                    </h2>
                    <p className="measure mt-5 text-[1.0625rem] leading-relaxed text-steel-700">
                      {texto?.descripcion ?? ini.descripcion}
                    </p>
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
