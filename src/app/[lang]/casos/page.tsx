import type { Metadata } from "next";
import { CabeceraPagina } from "@/components/ui/CabeceraPagina";
import { Contenedor } from "@/components/ui/Contenedor";
import { FichaCaso } from "@/components/ui/FichaCaso";
import { MarquesinaClientes } from "@/components/ui/MarquesinaClientes";
import { Revelar } from "@/components/ui/Revelar";
import { ContactoBloque } from "@/components/home/ContactoBloque";
import { casos } from "@/content/casos";
import { metadatosDe } from "@/lib/seo";
import { diccionario } from "@/content/i18n";
import { IDIOMA_POR_DEFECTO, esIdioma } from "@/lib/idioma";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const idioma = esIdioma(lang) ? lang : IDIOMA_POR_DEFECTO;
  const seo = diccionario(idioma).seo.paginas["/casos"];
  return metadatosDe({ ...seo, ruta: "/casos", lang: idioma });
}

/**
 * F-10b · Grilla ampliada de casos de éxito.
 *
 * Los proyectos van agrupados por servicio en vez de en una lista corrida de
 * fichas iguales: quien entra acá está evaluando una operación concreta, no
 * leyendo el catálogo completo.
 *
 * SIN RECUENTOS. Ni la fila de cifras de arriba ni el "{n} proyectos" al lado
 * de cada grupo: contaban lo que hay publicado en el sitio, que no es lo mismo
 * que lo que AGS ha hecho, y bajaban cada vez que se despublicaba un caso.
 */
export default async function PaginaCasos({ params }: Props) {
  const { lang } = await params;
  const idioma = esIdioma(lang) ? lang : IDIOMA_POR_DEFECTO;
  const t = diccionario(idioma);

  const porServicio = casos.reduce<Record<string, typeof casos>>((acc, c) => {
    (acc[c.servicioSlug] ??= []).push(c);
    return acc;
  }, {});

  // El orden de los grupos lo fija esta lista, no el diccionario: es una
  // decisión de presentación, no texto. El título de cada uno sí se traduce.
  const grupos = [
    "inspecciones-fotovoltaicas",
    "topografia-aerofotogrametria",
    "inspeccion-lineas-electricas",
  ]
    .filter((slug) => porServicio[slug]?.length)
    .map((slug) => ({ slug, titulo: t.paginas.casos.grupos[slug] }));

  return (
    <>
      <CabeceraPagina
        titulo={t.paginas.casos.titulo}
        bajada={t.paginas.casos.bajada}
        migas={[{ label: t.paginas.migas["/casos"] }]}
        lang={idioma}
      />

      {/* La misma franja de logos del inicio. Antes acá iba una fila de cifras
          —proyectos, clientes, MW, hectáreas—, que contaba lo publicado en el
          sitio y no la trayectoria de AGS. Los logos dicen lo mismo sin poner
          un número que envejece con cada caso que se agrega. */}
      <section className="border-b border-steel-100 bg-white py-12 sm:py-14">
        <Contenedor>
          <h2 className="eyebrow text-steel-500">{t.paginas.casos.confian}</h2>
        </Contenedor>
        <MarquesinaClientes className="mt-8" />
      </section>

      {grupos.map((g, indice) => (
        <section
          key={g.slug}
          className={
            indice % 2 === 0 ? "bg-white py-16 sm:py-20" : "bg-steel-50 py-16 sm:py-20"
          }
        >
          <Contenedor>
            <Revelar>
              <h2 className="text-d4 text-steel-900 sm:text-d3">{g.titulo}</h2>
            </Revelar>

            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {porServicio[g.slug].map((c, i) => (
                <Revelar as="li" key={c.slug} delay={(i % 3) * 0.06} className="h-full h-full">
                  <FichaCaso caso={c} lang={idioma} />
                </Revelar>
              ))}
            </ul>
          </Contenedor>
        </section>
      ))}

      <ContactoBloque lang={idioma} />
    </>
  );
}
