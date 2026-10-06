import type { Metadata } from "next";
import { CabeceraPagina } from "@/components/ui/CabeceraPagina";
import { Contenedor } from "@/components/ui/Contenedor";
import { FichaCaso, formatearCifra } from "@/components/ui/FichaCaso";
import { Revelar } from "@/components/ui/Revelar";
import { ContactoBloque } from "@/components/home/ContactoBloque";
import { casos, totales } from "@/content/casos";
import { metadatosDe } from "@/lib/seo";
import { diccionario } from "@/content/i18n";
import { IDIOMA_POR_DEFECTO, esIdioma } from "@/lib/idioma";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const idioma = esIdioma(lang) ? lang : IDIOMA_POR_DEFECTO;
  const seo = diccionario(idioma).seo.paginas["/casos"];
  return metadatosDe({
    titulo: seo.titulo,
    descripcion: seo.descripcion
      .replace("{proyectos}", String(totales.proyectos))
      .replace("{clientes}", String(totales.clientes)),
    ruta: "/casos",
    lang: idioma,
  });
}

/**
 * F-10b · Grilla ampliada de casos de éxito.
 *
 * Los proyectos van agrupados por servicio en vez de en una lista corrida de
 * diecinueve fichas iguales: quien entra acá está evaluando una operación
 * concreta, no leyendo el catálogo completo.
 *
 * Las cabeceras de las cifras se calculan sobre el arreglo, no están escritas
 * a mano (ver `totales` en content/casos.ts).
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

      <section className="border-b border-steel-100 bg-white py-10">
        <Contenedor>
          <dl className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {[
              { k: t.paginas.casos.proyectos, v: String(totales.proyectos) },
              { k: t.paginas.casos.clientes, v: String(totales.clientes) },
              { k: t.paginas.casos.mwInspeccionados, v: formatearCifra(totales.mw, idioma) },
              {
                k: t.paginas.casos.hectareasLevantadas,
                v: formatearCifra(totales.hectareas, idioma),
              },
            ].map(({ k, v }) => (
              <div key={k}>
                <dd className="num text-[2.25rem] font-semibold leading-none tracking-[-0.03em] text-steel-900">
                  {v}
                </dd>
                <dt className="mt-2.5 text-[0.8125rem] leading-snug text-steel-500">{k}</dt>
              </div>
            ))}
          </dl>
        </Contenedor>
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
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                <h2 className="text-d4 text-steel-900 sm:text-d3">{g.titulo}</h2>
                <span className="num text-sm text-steel-500">
                  {t.paginas.casos.nProyectos.replace(
                    "{n}",
                    String(porServicio[g.slug].length),
                  )}
                </span>
              </div>
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
