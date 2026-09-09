import type { Metadata } from "next";
import { CabeceraPagina } from "@/components/ui/CabeceraPagina";
import { Contenedor } from "@/components/ui/Contenedor";
import { FichaCaso, formatearCifra } from "@/components/ui/FichaCaso";
import { Revelar } from "@/components/ui/Revelar";
import { ContactoBloque } from "@/components/home/ContactoBloque";
import { casos, totales } from "@/content/casos";
import { metadatosDe } from "@/lib/seo";

export const metadata: Metadata = metadatosDe({
  titulo: "Casos de éxito: proyectos ejecutados",
  descripcion: `${totales.proyectos} proyectos ejecutados para ${totales.clientes} clientes en minería y energía: plantas fotovoltaicas, líneas eléctricas y levantamientos topográficos en Chile.`,
  ruta: "/casos",
});

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
export default function PaginaCasos() {
  const porServicio = casos.reduce<Record<string, typeof casos>>((acc, c) => {
    (acc[c.servicioSlug] ??= []).push(c);
    return acc;
  }, {});

  const grupos = [
    { slug: "inspecciones-fotovoltaicas", titulo: "Termografía en plantas fotovoltaicas" },
    {
      slug: "topografia-aerofotogrametria",
      titulo: "Topografía, aerofotogrametría y modelamiento 3D",
    },
    { slug: "inspeccion-lineas-electricas", titulo: "Inspección de líneas eléctricas" },
  ].filter((g) => porServicio[g.slug]?.length);

  return (
    <>
      <CabeceraPagina
        titulo="Proyectos ya ejecutados"
        bajada="Plantas, ubicaciones y superficies medidas. Las cifras son las publicadas por cada proyecto."
        migas={[{ label: "Casos de éxito" }]}
      />

      <section className="border-b border-steel-100 bg-white py-10">
        <Contenedor>
          <dl className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {[
              { k: "Proyectos", v: String(totales.proyectos) },
              { k: "Clientes", v: String(totales.clientes) },
              { k: "MW inspeccionados", v: formatearCifra(totales.mw) },
              { k: "Hectáreas levantadas", v: formatearCifra(totales.hectareas) },
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
                  {porServicio[g.slug].length} proyectos
                </span>
              </div>
            </Revelar>

            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {porServicio[g.slug].map((c, i) => (
                <Revelar as="li" key={c.slug} delay={(i % 3) * 0.06} className="h-full h-full">
                  <FichaCaso caso={c} />
                </Revelar>
              ))}
            </ul>
          </Contenedor>
        </section>
      ))}

      <ContactoBloque />
    </>
  );
}
